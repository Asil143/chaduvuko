import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DesignUrlShortener() {
  return (
    <LearnLayout
      title="Case Study — Design a URL Shortener"
      description="Requirements, estimates, ID generation, storage, caching, analytics and scaling for a URL shortener."
      section="System Design — Lesson 12"
      readTime="45 min"
    >
      <Part n={1} label="Requirements" title="Agree on What a Short Link Must Do">
        <P>
          A URL shortener turns a long destination into a compact link and redirects a visitor when that link is opened. Before
          choosing a database or cache, distinguish the required product from tempting extras. We will support link creation,
          redirection, optional expiry, and basic owner-visible usage counts. Custom aliases, bulk imports, and campaign
          attribution can be follow-up features, not hidden assumptions in the first version.
        </P>
        <Table
          head={['Type', 'Requirement', 'Design implication']}
          rows={[
            ['Functional', 'Create a short code for a validated destination.', 'Persist the mapping before returning success.'],
            ['Functional', 'Redirect an active code to its destination.', 'The read path must be low-latency and highly available.'],
            ['Functional', 'Expire or disable a link and show an understandable not-found response.', 'The redirect path must check current lifecycle state.'],
            ['Functional', 'Owner can view aggregate click counts.', 'Collect analytics without blocking every redirect.'],
            ['Quality', 'Links should not be easy to guess at scale.', 'Choose non-sequential or sufficiently unpredictable codes.'],
            ['Quality', 'Creation retries must not make duplicate links unexpectedly.', 'Define idempotency or return a stable result for a client key.'],
          ]}
          caption="Confirm link ownership, deletion, destination restrictions, and analytics detail with the interviewer."
        />
        <Callout type="info">
          State priorities aloud: redirect correctness and availability matter more than perfectly fresh analytics. Ask whether
          expired links should return 404 or a branded page, and whether private links or custom domains are in scope.
        </Callout>
      </Part>

      <Part n={2} label="Estimates" title="Make the Scale Assumptions Visible">
        <P>
          We need estimates to choose storage and cache strategies, not to pretend we know the future. For a worked example,
          assume 10 million new links per day and 100 million redirects per day. Treat these as scenario inputs, not industry
          facts. The average redirect rate is 100,000,000 divided by 86,400, or about 1,160 requests per second. If a busy
          period is several times the average, capacity planning must use that measured peak factor and leave headroom.
        </P>
        <P>
          At 10 million new links per day, five years of retention is 10,000,000 × 365 × 5 = 18.25 billion mappings before
          replicas, indexes, backups, and metadata. If each stored mapping and its indexes consume a few hundred bytes, raw
          storage is measured in terabytes; measure the actual schema rather than multiplying a guessed row size into a
          precise-looking bill. Click events can dwarf the mapping table, so aggregate or sample them according to product
          needs and retention policy.
        </P>
        <Code file="capacity.py" code={`
SECONDS_PER_DAY = 24 * 60 * 60
new_links_per_day = 10_000_000
redirects_per_day = 100_000_000
retention_years = 5

average_redirects_per_second = redirects_per_day / SECONDS_PER_DAY
stored_mappings = new_links_per_day * 365 * retention_years

print(f"average redirects/s: {average_redirects_per_second:.0f}")
print(f"mapping count: {stored_mappings:,}")
print("peak capacity = average rate * observed peak factor")
`} />
        <P>
          Read-heavy traffic suggests caching hot mappings close to redirect workers. Link creation is small compared with
          redirects in this scenario, but codes must remain unique across writers. A distributed deployment also needs regional
          read capacity, health checks, and a plan for what happens if analytics is unavailable.
        </P>
        <Callout type="tip">
          Every estimate is a statement of assumptions. Say what changes if traffic is ten times larger, if links never expire,
          or if a few popular links receive most of the reads.
        </Callout>
      </Part>

      <Part n={3} label="API" title="Define Stable Create and Redirect Contracts">
        <P>
          Keep the API small. An authenticated owner creates a link; a public route resolves it. The create request validates
          scheme and destination policy, then stores a mapping. The redirect route uses a short code, returns a temporary
          redirect when the destination is active, and does not leak private owner data. Decide whether to use 301 or 302
          based on cacheability and whether owners can later change destinations; a temporary redirect is safer when links
          remain editable or analytics needs every request to reach your service.
        </P>
        <Code file="api_contract.py" code={`
from dataclasses import dataclass
from datetime import datetime

@dataclass(frozen=True)
class CreateLinkRequest:
    destination: str
    expires_at: datetime | None = None
    idempotency_key: str | None = None

@dataclass(frozen=True)
class CreateLinkResponse:
    code: str
    short_url: str
    expires_at: datetime | None

@dataclass(frozen=True)
class RedirectResponse:
    status: int
    location: str | None

# POST /v1/links -> CreateLinkResponse, typically 201
# GET /{code} -> 302 with Location, or 404 for missing / expired / disabled
`} />
        <P>
          A service can return validation errors as 400, unauthenticated owner requests as 401, and rate-limited creates as
          429. Use consistent error bodies and request IDs. Treat the destination as untrusted input: allow only supported
          schemes, reject malformed hosts, prevent internal-only destinations where relevant, and avoid turning the product
          into an open redirect service for phishing. Do not fetch a submitted URL unless link-preview functionality is an
          explicit, safely isolated requirement.
        </P>
        <Steps items={[
          'Validate request fields and authorize the owner before allocating a code.',
          'Apply an idempotency policy, then persist the mapping with a uniqueness check.',
          'Return the canonical short URL only after durable creation succeeds.',
          'For a redirect, resolve status and expiry before returning a Location header.',
        ]} />
      </Part>

      <Part n={4} label="Data model" title="Store the Mapping Separately From Click Events">
        <P>
          The mapping is the source of truth. A relational schema works well when ownership, expiry, and transactions are
          important; a key-value store can also fit a direct code-to-destination lookup at high scale. The important access
          pattern is a unique code lookup. Keep analytics append-only or aggregated separately so redirect traffic does not
          synchronously update a contended counter row on every request.
        </P>
        <Code lang="sql" file="schema.sql" code={`
CREATE TABLE short_links (
    code VARCHAR(32) PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    destination TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ,
    disabled_at TIMESTAMPTZ,
    idempotency_key VARCHAR(128),
    CONSTRAINT owner_idempotency_unique UNIQUE (owner_id, idempotency_key)
);

CREATE INDEX short_links_owner_created_idx
    ON short_links (owner_id, created_at DESC);

CREATE TABLE click_events (
    event_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code VARCHAR(32) NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    region VARCHAR(32)
);
CREATE INDEX click_events_code_time_idx ON click_events (code, occurred_at);
`} />
        <P>
          Production schemas should define foreign keys and retention behavior that match the deployment's database. Do not
          store full IP addresses or user-agent strings by default: collect only what analytics needs, protect access, and set
          a retention period. If a click stream is sent to a queue, the queue consumer can update daily aggregates
          asynchronously. A dropped analytics event must not break a user's redirect.
        </P>
        <Callout type="warning">
          The idempotency constraint permits multiple null keys in common SQL engines. Validate the incoming key's length,
          scope it to the owner, and ensure the stored request fingerprint matches before replaying an old response.
        </Callout>
      </Part>

      <Part n={5} label="High-level design" title="Keep Redirects Fast and Analytics Asynchronous">
        <P>
          A CDN or edge worker can absorb popular redirects, while an origin service handles cache misses, lifecycle checks,
          and writes. The database remains authoritative; cache entries need a bounded TTL and explicit invalidation when an
          owner disables or changes a link. Publish click events to a durable queue when available, with a bounded fallback
          policy that prioritizes redirect success over analytics freshness.
        </P>
        <Code lang="text" code={`
Creator / Owner
    | POST /v1/links
    v
API Gateway --> Link Service --> Mapping Store (unique code)
                       |                  |
                       |                  +--> Cache warm / invalidate
                       +--> ID allocator

Visitor -- GET /{code} --> CDN / Edge Cache
                               | cache miss
                               v
                         Redirect Service --> Mapping Cache --> Mapping Store
                               |
                               +--> Event Queue --> Analytics Workers --> Aggregates
`} />
        <P>
          The mapping store and redirect service are separate logical responsibilities; they may initially share a deployment.
          This design lets the team launch as a modular service and split components only when traffic, scaling needs, or
          team ownership justify it. The analytics path is deliberately off the critical redirect response.
        </P>
      </Part>

      <Part n={6} label="Deep dives" title="Codes, Cache Behavior, and Analytics Need Explicit Rules">
        <H3>Generate codes safely</H3>
        <P>
          A base-62 alphabet can encode an integer compactly, but a sequential database ID reveals creation order and may be
          enumerable. One option is to generate random bytes, encode them, and retry on the rare uniqueness collision. Another
          is a coordinated ID allocator followed by a keyed permutation. Choose based on volume, collision handling, and
          whether code unpredictability is a product requirement; never rely on obscurity instead of authorization for private
          destinations.
        </P>
        <Code file="base62.py" code={`
ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
BASE = len(ALPHABET)

def encode_base62(number: int) -> str:
    if number < 0:
        raise ValueError("number must be non-negative")
    if number == 0:
        return ALPHABET[0]
    result = []
    while number:
        number, remainder = divmod(number, BASE)
        result.append(ALPHABET[remainder])
    return "".join(reversed(result))

print(encode_base62(125_000))
`} />
        <P>
          This codec is deterministic: the same integer always produces the same code. It demonstrates encoding, not secure
          random generation. In a multi-writer system, code allocation and insert must agree on uniqueness. A collision should
          trigger a new candidate or an explicit retry, never overwrite another owner's mapping.
        </P>
        <H3>Cache and invalidate</H3>
        <P>
          Cache-aside is easy to explain: check edge or application cache, read the store on a miss, then cache the mapping for
          a bounded time. Expiry should not outlive the link's own expiry. Disable or destination-change operations should
          invalidate the cache; if invalidation fails, short TTLs bound stale behavior. For extremely hot keys, protect the
          store from a cache stampede by coalescing concurrent misses or serving a safe stale value briefly where product
          policy permits.
        </P>
        <Code file="redirect_lookup.py" code={`
from datetime import datetime, timezone

class LinkNotFound(Exception):
    pass

def resolve(link, now: datetime | None = None) -> str:
    now = now or datetime.now(timezone.utc)
    if link is None or link.disabled_at is not None:
        raise LinkNotFound()
    if link.expires_at is not None and link.expires_at <= now:
        raise LinkNotFound()
    return link.destination
`} />
        <P>
          In a real cache value, include a version or status and ensure invalidation uses that version. Do not cache a 404 for
          a long period immediately after a newly created code, because a client may have queried before the write completed.
          Keep analytics event ingestion idempotent by assigning an event ID and deduplicating retries in the consumer.
        </P>
      </Part>

      <Part n={7} label="Bottlenecks and trade-offs" title="Scale the Hot Read Path Without Losing Correctness">
        <Table
          head={['Pressure point', 'Useful response', 'Cost or trade-off']}
          rows={[
            ['Popular code overloads one origin', 'Edge caching, request coalescing, and regional replicas.', 'Invalidation and fresh disable semantics get harder.'],
            ['Mapping storage grows continually', 'Partition by code hash and enforce retention / expiry cleanup.', 'Cross-partition operations and migrations need planning.'],
            ['Analytics writes contend on hot links', 'Append events and aggregate asynchronously.', 'Counts become eventually consistent.'],
            ['Code collision or enumeration', 'Unique constraint, collision retry, and less predictable IDs.', 'Extra bytes or allocation complexity.'],
            ['Regional write races', 'Single-writer allocation or globally unique candidate generation.', 'May add latency or operational coordination.'],
          ]}
        />
        <P>
          A read replica can reduce load but may return a stale mapping after a disable. Use the authoritative write path for
          lifecycle changes and define a maximum stale window. If immediate revocation is required, edge caches must support
          purge or consult a revocation/version mechanism. These are product-level consistency choices, not cache settings
          that can be picked without talking to the owner.
        </P>
        <Bullets items={[
          'Track redirect latency, cache hit rate, database lookup errors, queue lag, and collision retries.',
          'Alert on unusual creation bursts, abuse reports, and destination-policy violations.',
          'Rate-limit link creation separately from public redirects so a write attack does not starve reads.',
          'Use backups and restore tests for mappings; a cache is not a backup.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common URL Shortener Design Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing a database before estimating access patterns', cause: 'The answer focuses on brand names instead of read/write ratio, cardinality, and consistency.', fix: 'State the load assumptions and lookup/query patterns, then explain why the chosen store fits.' },
          { mistake: 'Incrementing one analytics counter in the redirect request', cause: 'A popular link turns one row into a write hotspot and analytics failure slows redirects.', fix: 'Queue click events or shard counters and aggregate asynchronously.' },
          { mistake: 'Using predictable codes as access control', cause: 'A short code is an identifier, not authorization.', fix: 'Use sufficiently unguessable codes for private links and enforce access rules at resolution.' },
          { mistake: 'Ignoring cache invalidation and expiry', cause: 'A stale edge entry may redirect to a changed or disabled destination.', fix: 'Bound TTL by expiry and define purge/version behavior for edits and revocation.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Present the Design Like an Engineer">
        <Practice
          title="Refine the design for a real product constraint"
          tasks={[
            'Recalculate capacity for your own assumptions and show average and peak redirect rates separately.',
            'Choose a code strategy for multi-region writes and explain how a collision is detected and retried.',
            'Add a custom-alias endpoint; define conflict behavior and abuse controls without slowing normal redirects.',
            'Design a cache invalidation plan for link disablement and state the maximum acceptable stale redirect window.',
            'Decide which click fields to retain, how long to retain them, and how analytics remains useful without storing unnecessary personal data.',
          ]}
          hint="Make every estimate and freshness guarantee explicit. The interviewer is evaluating your reasoning, not whether you guessed a particular vendor."
        />
        <KeyTakeaways items={[
          'Requirements and explicit assumptions determine the correct design; a shortener is mostly a read-heavy mapping lookup.',
          'Estimate mapping growth and redirects per second before selecting a storage and cache strategy.',
          'Keep the API, mapping table, and redirect lifecycle clear; make create retries idempotent when required.',
          'Use unique code constraints and a deliberate collision strategy; encoding alone is not secure randomness.',
          'Cache hot links with bounded TTL and a plan for expiry, edits, and revocation.',
          'Move click analytics off the latency-sensitive redirect path and apply privacy-aware retention.',
        ]} />
      </Part>

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/design-chat-notifications"
        label="Lesson 13 · Case Study — Design a Chat and Notification System"
        text="A URL lookup is a read-heavy workload. Next, design a system where ordering, delivery receipts, presence, and push notifications introduce different consistency and fan-out challenges."
      />
    </LearnLayout>
  )
}
