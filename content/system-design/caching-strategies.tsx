import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function CachingStrategies() {
  return (
    <LearnLayout
      title="Caching — Strategies, Invalidation and Redis"
      description="Compare cache-aside, write-through and write-back, choose expiration and eviction policies, and reason about invalidation, stampedes and Redis operations."
      section="System Design — Lesson 05"
      readTime="40 min"
    >
      <Part n={1} label="The cache bargain" title="A Cache Trades Freshness and Complexity for Faster Reuse">
        <P>
          A cache stores a copy of data so a later read can avoid repeating expensive work. It may reduce database load and
          improve response time, but the cached value can become stale, disappear under memory pressure or be unavailable
          during a network failure. A cache is usually not the authoritative source of truth. Start by identifying what is
          expensive to recompute, how often it changes and how stale the product can tolerate it being.
        </P>
        <P>
          A hit returns a cached value; a miss runs the fallback, often a database query, and may populate the cache. Track
          hit rate, miss latency, memory use, evictions, errors and stale-value behaviour. A high hit rate is not automatically
          good if the cached data is incorrect or the cache adds more operational risk than it removes.
        </P>
        <Callout type="info">
          Cache only after you know the source of truth and the freshness contract. A cache that hides an inefficient query
          can delay fixing the actual bottleneck and make production behaviour harder to reason about.
        </Callout>
      </Part>

      <Part n={2} label="Cache-aside" title="Let the Application Load on a Miss">
        <P>
          With cache-aside, the application checks the cache, reads the source on a miss, then stores the result with a
          lifetime. A write usually updates the source and invalidates the relevant key. This is straightforward and lets an
          application cache only the data it needs, but concurrent misses can duplicate source work and a write/invalidation
          race can temporarily restore an older value. Define the order and failure behaviour explicitly.
        </P>
        <Code lang="python" file="cache_aside.py" code={`
products = {"course-42": {"title": "System Design", "published": True}}
cache: dict[str, dict[str, object]] = {}


def read_product(product_id: str) -> dict[str, object] | None:
    if product_id in cache:
        return cache[product_id]
    value = products.get(product_id)
    if value is not None:
        cache[product_id] = value
    return value


def update_product(product_id: str, value: dict[str, object]) -> None:
    products[product_id] = value
    cache.pop(product_id, None)


print(read_product("course-42"))
`} />
        <P>
          This tiny example uses shared Python dictionaries and has no concurrency control, expiration, serialization or network
          failures. Production cache-aside should make the source write authoritative and treat cache invalidation as a
          fallible operation. If invalidation fails, a TTL or versioned key can bound or avoid stale reads; choose based on
          the required consistency, not convenience.
        </P>
        <Callout type="example">
          A public course description may tolerate a short delay before an edit is visible. A payment balance usually needs a
          much stricter correctness contract and may be better served from the authoritative transactional store.
        </Callout>
      </Part>

      <Part n={3} label="Write strategies" title="Choose Where a Write Becomes Durable">
        <P>
          Write-through updates the cache and the backing store as part of the write path, giving readers a warm cache after a
          successful update but coupling write latency to both systems. Write-back (also called write-behind) acknowledges a
          cache write and persists it later; it can absorb bursts, but cache loss before persistence risks losing acknowledged
          data and requires durable buffering and recovery. Write-around writes the source directly and leaves cache population
          to a later read, which can avoid filling the cache with one-off writes.
        </P>
        <Table
          head={['Strategy', 'Write path', 'Main concern']}
          rows={[
            ['Cache-aside', 'Application reads cache, then source on a miss', 'Miss bursts and invalidation races'],
            ['Write-through', 'Update cache and source on each write', 'Write latency and partial failure handling'],
            ['Write-back', 'Cache accepts write; source is updated later', 'Durability, replay and ordering'],
            ['Write-around', 'Write source and do not populate cache immediately', 'First subsequent read still misses'],
          ]}
          caption="Names vary across systems; verify the exact guarantees of the cache and client library you use."
        />
        <P>
          There is no universally best policy. For data that must not be lost, acknowledge success only after durable storage
          confirms it. If two writes can race, decide how ordering is preserved and which value wins. For derived or
          recomputable values, a simpler invalidation-and-rebuild approach may be safer than trying to keep every copy perfectly
          synchronized.
        </P>
      </Part>

      <Part n={4} label="Keys and expiration" title="Make Cache Identity and Lifetime Explicit">
        <P>
          A cache key must include every input that changes the result: entity identifier, locale, permission scope or filter
          where relevant. Keep keys structured and predictable, and avoid raw personal data in key names. A TTL bounds how long
          an entry can remain without refresh; it does not guarantee fresh data until expiry if writes race or the source itself
          is stale. Randomized TTLs can spread expiry load across many similar entries.
        </P>
        <Code lang="python" file="cache_key.py" code={`
import hashlib
import json


def cache_key(resource: str, identity: str, locale: str) -> str:
    parts = {"resource": resource, "identity": identity, "locale": locale}
    canonical = json.dumps(parts, sort_keys=True, separators=(",", ":"))
    digest = hashlib.sha256(canonical.encode("utf-8")).hexdigest()[:16]
    return f"catalog:v1:{digest}"


print(cache_key("course", "course-42", "en-IN"))
`} />
        <P>
          Including a version in the namespace makes an intentional format or policy change easier to roll out: readers can
          move to a new key while old entries expire naturally. It can temporarily use more memory, so plan the transition.
          If a response depends on a learner's permissions, authorization must still be checked; a cache hit must not turn a
          previous permission decision into permanent access.
        </P>
        <Code lang="python" file="ttl_cache.py" code={`
import time

class TtlCache:
    def __init__(self):
        self.entries: dict[str, tuple[float, object]] = {}

    def get(self, key: str) -> object | None:
        entry = self.entries.get(key)
        if entry is None:
            return None
        expires_at, value = entry
        if time.monotonic() >= expires_at:
            self.entries.pop(key, None)
            return None
        return value

    def put(self, key: str, value: object, ttl_seconds: float) -> None:
        if ttl_seconds <= 0:
            raise ValueError("ttl_seconds must be positive")
        self.entries[key] = (time.monotonic() + ttl_seconds, value)


cache = TtlCache()
cache.put("course:42", "published", 60)
print(cache.get("course:42"))
`} />
        <P>
          This in-process demonstration is not Redis and is not shared across multiple application workers. It has no maximum
          size, persistence or locking. A distributed cache brings network timeouts, serialization, access control, memory
          sizing and eviction behaviour that the application must observe and handle.
        </P>
      </Part>

      <Part n={5} label="Eviction and stampedes" title="Plan for Memory Pressure and Popular Misses">
        <P>
          A cache has finite memory. Eviction removes entries according to a configured policy when memory is constrained;
          least-recently-used and least-frequently-used are common ideas, but product implementations differ. TTL expiration
          and eviction solve different problems: one enforces a freshness window, the other reclaims space. Choose a policy
          with workload evidence and watch evictions as well as hit rate.
        </P>
        <P>
          A cache stampede occurs when many requests miss the same popular key at once—often after expiry—and all load the
          source. Mitigations include single-flight request coalescing, a short lock, refreshing before expiry, stale-while-
          revalidate when safe, or adding jitter to expiration. A lock needs an owner token and bounded lease so one crashed
          worker cannot block refresh indefinitely.
        </P>
        <Code lang="python" file="single_flight.py" code={`
from concurrent.futures import Future

in_flight: dict[str, Future[str]] = {}

def get_or_start(key: str, load):
    future = in_flight.get(key)
    if future is None:
        future = Future()
        in_flight[key] = future
        try:
            future.set_result(load())
        except Exception as error:
            future.set_exception(error)
        finally:
            in_flight.pop(key, None)
    return future.result()


def load_course() -> str:
    return "System Design"

print(get_or_start("course:42", load_course))
`} />
        <P>
          The snippet illustrates the idea but is not a thread-safe single-flight implementation: a production version must
          protect the map with synchronization and coordinate across processes if that is required. Do not add a distributed
          lock until the duplicate source work is a measured problem and the failure semantics are understood.
        </P>
        <Callout type="warning">
          Cache failure should have a deliberate fallback. Falling back to the database can preserve correctness but may
          create a thundering herd; fail closed only when the data's safety or privacy requirements demand it.
        </Callout>
      </Part>

      <Part n={6} label="Redis and operations" title="Use a Shared Cache as a Service, Not a Magic Dictionary">
        <P>
          Redis is an in-memory data store commonly used for caching, coordination and other workloads. If you use it as a
          cache, choose simple value shapes, set expiration deliberately and avoid storing large unbounded collections by
          accident. Configure authentication and network access, use TLS where the deployment requires it, and keep sensitive
          data out unless encryption, retention and access controls have been reviewed.
        </P>
        <P>
          The application needs bounded connection and command timeouts, a policy for cache outages, and metrics for latency,
          hit/miss rate, memory, evictions, rejected connections and hot keys. Prevent a slow cache from occupying every
          application worker. A cache cluster or replica changes availability and consistency behaviour; understand the
          selected deployment's failover and persistence guarantees rather than assuming they are universal.
        </P>
        <Code lang="text" code={`
Request --> application --> cache lookup
                               | hit
                               +--------------------------> response
                               |
                               | miss
                               v
                         source database
                               |
                               +--> populate cache --> response

On cache outage: use the documented fallback and protect the source from a miss storm.
`} />
        <P>
          For a small prototype, an in-process cache can be enough. A shared service is appropriate when workers need a common
          view or the source is under measured pressure. Keep the system easy to operate: fewer cache layers and a clear
          invalidation story are often better than a highly clever policy no one can debug.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Caching Mistakes">
        <Mistakes items={[
          { mistake: 'Caching without naming the authoritative source', cause: 'Teams cannot tell whether a value should be repaired from cache or storage.', fix: 'Document which store owns the truth and how a cache entry is rebuilt.' },
          { mistake: 'Assuming TTL means the value is always fresh until expiry', cause: 'Writes, races and upstream replication can make the cached value stale immediately.', fix: 'Define freshness guarantees and invalidate or version keys when needed.' },
          { mistake: 'Using a cache key that omits an identity or filter', cause: 'Different users or requests can receive a response meant for someone else.', fix: 'Include response-varying inputs and re-check authorization on sensitive reads.' },
          { mistake: 'Letting every expired request refill a popular key', cause: 'Concurrent misses multiply work against the source.', fix: 'Measure stampedes and use coalescing, refresh-ahead or jitter with bounded coordination.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Add a Cache to a Course Catalogue">
        <Practice
          title="Design a safe cache policy for catalog and learner data"
          tasks={[
            'Choose one public catalog response and define its key, source of truth and acceptable staleness.',
            'Choose one personalized response and list every request attribute that must affect its cache key.',
            'Select cache-aside, write-through or write-around for an instructor editing a course description and explain why.',
            'Describe what happens when the cache is unavailable and how you prevent the database from being overwhelmed.',
            'Explain how you would detect and mitigate a stampede when a popular course entry expires.',
          ]}
          hint="Separate cache freshness from authorization. A cached response is still subject to the current access policy."
        />
      </Part>

      <KeyTakeaways items={[
        'Caching trades lower repeated work for freshness, memory and operational complexity.',
        'Cache-aside is simple but needs explicit miss, invalidation and concurrent-refresh behaviour.',
        'Write-through, write-back and write-around move durability and latency trade-offs to different parts of the system.',
        'Keys must include every response-varying input; TTL, eviction and invalidation are distinct controls.',
        'Stampedes can overload a source after expiry; coalesce or stagger refreshes when measurements justify it.',
        'Treat Redis as a networked dependency with security, timeouts, capacity and outage policies.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/databases-at-scale"
        label="Lesson 06 · Databases at Scale — Replication, Partitioning and Sharding"
        text="A cache can absorb repeated reads, but the durable data store still has to meet growth and correctness needs. Next, compare database choices and work through replicas, partitioning and shard trade-offs."
      />
    </LearnLayout>
  )
}
