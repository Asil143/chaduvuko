import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function KeysOrderingPartitioning() {
  return (
    <LearnLayout
      title="Keys, Ordering, and Partitioning Strategy"
      description="What a record key actually does, why Kafka's ordering guarantee is strictly per-partition, how to choose a partition key that avoids hot partitions, custom partitioners, and why changing partition count later breaks key-based ordering."
      section="Apache Kafka — Module 07"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Keys, Ordering, and Partitioning Strategy', href: '/learn/apache-kafka/keys-ordering-partitioning' },
      ]}
      prev={{ title: 'Replication, Leaders, and ISR', href: '/learn/apache-kafka/replication-leaders-isr' }}
      next={{ title: 'Retention and Log Compaction', href: '/learn/apache-kafka/retention-compaction' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a key actually does" />
        <SectionTitle>A Record Key Is a Routing Instruction, Not a Label</SectionTitle>
        <Para>
          Every Kafka record has an optional key and a value. Beginners usually treat the key as metadata —
          something you attach to a record the way you'd attach a tag, useful for humans reading logs later.
          That is not what the key is for. The key's real job is to decide which partition the record lands
          on. That single fact — key chooses partition — is the mechanism behind almost everything else in
          this module: per-key ordering, hot partitions, custom partitioners, and the partition-count trap.
        </Para>
        <Para>
          When a producer sends a record with a non-null key, the default partitioner hashes the key and maps
          it onto one of the topic's partitions using <code>hash(key) % partition_count</code>. Because
          hashing a given input always produces the same output, every record with the same key is guaranteed
          to hash to the same partition, every single time, for as long as the partition count stays fixed.
          That is the entire mechanism. There is no coordinator making a routing decision. There is no
          lookup table mapping keys to partitions. It is a pure, deterministic function evaluated independently
          by every producer.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> the key is a label you attach to a record for identification, like
            a primary key in a database row.
          </Para>
          <Para>
            <strong>Production model:</strong> the key is a partitioning input. <code>hash(key) % partition_count</code>
            deterministically routes every record for that key to the same partition, which is what makes
            per-key ordering possible — and what makes partition count a decision you cannot casually revisit.
          </Para>
        </HighlightBox>
        <CodeBox label="the mechanism, worked through">
{`topic: freshcart.orders, partition_count = 4

producer.send(topic="freshcart.orders", key="user_9271", value={...order 1...})
producer.send(topic="freshcart.orders", key="user_9271", value={...order 2...})
producer.send(topic="freshcart.orders", key="user_4410", value={...order 3...})

# default partitioner:
partition = hash("user_9271") % 4   # → always evaluates to the same number, e.g. 2
partition = hash("user_9271") % 4   # → 2 again, same input, same output
partition = hash("user_4410") % 4   # → some other number, e.g. 0 (probably)

# result:
# partition 2: order 1, order 2   (both records for user_9271, in send order)
# partition 0: order 3            (user_4410's record)

# every future record with key="user_9271" also lands on partition 2
# as long as partition_count stays 4 — see Part 06 for what happens if it doesn't`}
        </CodeBox>
        <Para>
          It is worth being precise about "hash" here. Kafka's default partitioner uses a hashing function
          (murmur2 by default, historically) over the serialized key bytes, then takes the result modulo the
          number of partitions. You don't need to know the internals of murmur2 to use Kafka correctly. You
          do need to internalize that the formula depends on two things: the key's bytes, and the current
          partition count. Change either one and the output changes.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Null keys" />
        <SectionTitle>What Happens With No Key: Round-Robin and Sticky Partitioning</SectionTitle>
        <Para>
          Not every record needs a key. If you send a record with <code>key=null</code>, there is nothing to
          hash, so Kafka cannot route it based on key content. Instead, the producer distributes keyless
          records across partitions using a load-balancing strategy so that, over time, every partition gets
          a roughly even share of traffic.
        </Para>
        <Para>
          Older Kafka producer clients did strict round-robin: record 1 to partition 0, record 2 to partition
          1, record 3 to partition 2, and so on, cycling through every partition on every single send. Newer
          producer clients (since Kafka 2.4, the "sticky partitioner") instead stick to one partition for an
          entire batch before switching to the next, because that produces larger, more efficient batches
          without sacrificing even distribution — round-robin at the record level means every batch is tiny,
          since consecutive records rarely land in the same batch.
        </Para>
        <CodeBox label="null key — sticky partitioner behavior">
{`producer.send(topic="freshcart.clicks", key=null, value={...click A...})
producer.send(topic="freshcart.clicks", key=null, value={...click B...})
producer.send(topic="freshcart.clicks", key=null, value={...click C...})
producer.send(topic="freshcart.clicks", key=null, value={...click D...})

# sticky partitioner: picks partition 1, batches A, B, C together into one request
# once that batch is sent (or a new batch is needed), it picks a new partition, say 3
# click D and subsequent keyless records go to partition 3, batched together

# net effect over millions of clicks: partitions get roughly even volume
# but no ordering relationship is implied or preserved between any two keyless records`}
        </CodeBox>
        <Table
          headers={['Key state', 'Partition choice', 'Ordering implication']}
          rows={[
            ['Non-null key', 'hash(key) % partition_count — deterministic, same key always same partition', 'Records sharing a key are strictly ordered relative to each other'],
            ['Null key (default partitioner)', 'Sticky/round-robin load balancing across partitions', 'No ordering relationship between any two records — pure distribution'],
            ['Null key, single partition topic', 'Trivially the only partition', 'Full topic-wide ordering, but zero horizontal scalability'],
          ]}
        />
        <Callout title="When null keys are the right choice" color="#22c55e">
          Use a null key when records are independent events with no natural entity to order by — anonymous
          page-view pings, generic application logs, metrics samples. Forcing a key onto data that has no
          real grouping concept just adds partitioning risk (see Part 04's hot-partition discussion) for no
          ordering benefit.
        </Callout>
        <Para>
          One easy way to check which behavior a topic is actually getting in practice is to look at how
          evenly bytes and message counts spread across partitions during ordinary traffic. A keyed topic with
          a well-chosen, high-cardinality key and a null-keyed topic should both show roughly even
          distribution across partitions — for the keyed topic because the key population is broad, and for
          the null-keyed topic because the load-balancing strategy guarantees it regardless of what the data
          looks like. A skewed distribution on a keyed topic is a signal worth investigating per Part 04; a
          skewed distribution on a genuinely null-keyed topic would point to a producer client bug rather than
          a data problem, since null-key distribution isn't supposed to depend on the data at all.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The ordering guarantee's real scope" />
        <SectionTitle>Kafka Orders Within a Partition — And Nowhere Else</SectionTitle>
        <Para>
          This is the single most commonly misunderstood fact about Kafka, and it deserves to be stated as
          precisely as possible: Kafka guarantees that records within one partition are delivered to
          consumers in the exact order they were written to that partition. Kafka makes <strong>no</strong>
          guarantee whatsoever about the relative order of records that live in different partitions — even
          within the same topic, even if they were produced by the same producer, even if one was sent a
          full second before the other.
        </Para>
        <Para>
          Why this specific scope, and not something broader? Because a partition is a single append-only
          log, written by whichever broker currently leads it, and read sequentially by consumers. There is
          exactly one physical sequence of bytes, so there is exactly one order. Two different partitions are
          two different logs, potentially led by two different brokers, written to independently, with no
          synchronization between them. There is no shared clock or shared sequence number spanning
          partitions — nothing to order them by even if Kafka wanted to.
        </Para>
        <CodeBox label="ordering — what is and isn't guaranteed">
{`topic: freshcart.orders, 4 partitions
key="user_9271" always hashes to partition 2 (per Part 01)

# Producer sends, in this exact order:
send(key="user_9271", value="order A")   # → partition 2, offset 40
send(key="user_4410", value="order B")   # → partition 0, offset 18
send(key="user_9271", value="order C")   # → partition 2, offset 41

# GUARANTEED: within partition 2, order A (offset 40) is seen before order C (offset 41)
#             — consumers of partition 2 will never see C before A

# NOT GUARANTEED: any ordering relationship between order B (partition 0)
#                  and order A or order C (partition 2)
#                  a consumer reading both partitions could see B before A,
#                  between A and C, or after C — all are valid`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> "Kafka preserves the order I sent things in" — treated as a
            topic-wide, or even cluster-wide, promise.
          </Para>
          <Para>
            <strong>Production model:</strong> Kafka preserves send order strictly within one partition. Order
            across partitions is undefined and must not be assumed by any consumer logic. If your business
            logic silently depends on cross-partition order, it will work in testing (single partition, low
            volume) and fail unpredictably in production (many partitions, real concurrency).
          </Para>
        </HighlightBox>
        <Para>
          This is exactly why the key matters so much: the key is the mechanism by which you convert "I need
          these related records in order" into "these related records share a key, therefore they share a
          partition, therefore they are ordered." Ordering in Kafka is not something you get automatically —
          it is something you deliberately engineer by choosing which entity's identifier becomes the key.
        </Para>
        <Callout title="A subtlety worth stating plainly" color="#38bdf8">
          Per-partition ordering is about write order into that partition, which for a single producer
          instance under normal conditions matches send order. It is not automatically preserved if a
          producer retries out of order without idempotence enabled, or if multiple producer instances race
          to write the same key concurrently without any coordination between them. The guarantee is about
          what the log physically contains, not about what your application intended to send.
        </Callout>
        <SubTitle>Retries can silently reorder writes within the same partition</SubTitle>
        <Para>
          There's one more layer to the "what the log physically contains" point that's worth spelling out,
          because it directly connects this module to the producer configuration decisions covered elsewhere
          in this track. By default, a producer can have several requests in flight to the same broker at
          once (<code>max.in.flight.requests.per.connection</code>, default 5). If an earlier batch fails to
          get acknowledged and is retried while a later batch has already been sent, the later batch can be
          written to the partition first — even though both batches were destined for the same partition and
          the earlier one was sent first.
        </Para>
        <CodeBox label="how retries can reorder writes within a single partition">
{`# max.in.flight.requests.per.connection = 5 (default), retries enabled

# Producer sends batch B1 (records for key="user_9271") to partition 2 — no ack yet
# Producer immediately sends batch B2 (also key="user_9271") to partition 2 — no ack yet
# Network hiccup: B1's ack is lost. B2 arrives cleanly and is written at offset 100.
# Producer retries B1. B1 is now written at offset 101 — AFTER B2, even though
# B1 was sent to the broker first.

# Both B1 and B2 are correctly in partition 2 — the partitioning was correct.
# But the WRITE ORDER inside that partition no longer matches SEND order.
# A consumer of partition 2 sees B2's records before B1's records.

# Fix: enable.idempotence=true
# This assigns each batch a sequence number and lets the broker enforce that
# sequence numbers are written in order per partition, even with retries and
# multiple in-flight requests — the broker rejects an out-of-order retry rather
# than silently accepting it out of sequence.`}
        </CodeBox>
        <Para>
          This is why, in practice, per-key ordering guarantees and idempotent producers travel together.
          Choosing a good key gets related records into the same partition; <code>enable.idempotence=true</code>
          is what keeps the broker from letting a network retry scramble the order those records actually land
          in once they're there. Neither one alone is the complete guarantee.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Choosing a good partition key" />
        <SectionTitle>Picking a Key: Even Distribution Versus Per-Entity Ordering</SectionTitle>
        <Para>
          Choosing a partition key is a genuine design decision with real trade-offs, not a checkbox. The two
          things you're usually balancing are: (1) even distribution of load across partitions, so no single
          partition — and therefore no single consumer instance, since one partition is read by at most one
          consumer per group — becomes a bottleneck, and (2) grouping records that must stay ordered relative
          to each other under the same key.
        </Para>
        <Para>
          Good partition keys for real workloads are almost always the identifier of the entity whose events
          must stay in order relative to each other, and which also has enough cardinality (enough distinct
          values, spread roughly evenly) that hashing spreads load well. <code>user_id</code> works well for
          a clickstream or account-activity topic — you usually want one user's events processed in order,
          and you have millions of roughly-equal-volume users. <code>order_id</code> works well for an order
          lifecycle topic — every state transition for one order (placed, paid, packed, shipped, delivered)
          needs to stay in sequence, and orders are numerous and roughly evenly sized.
        </Para>
        <Table
          headers={['Candidate key', 'Distribution quality', 'Ordering value', 'Verdict']}
          rows={[
            ['user_id', 'Good — millions of users, roughly even event volume per user', 'High — per-user event sequence usually matters', 'Strong default for activity/clickstream topics'],
            ['order_id', 'Good — many orders, bounded lifecycle events per order', 'High — order state transitions must not race', 'Strong default for order-lifecycle topics'],
            ['country_code', 'Poor — a handful of distinct values, wildly uneven volume (US/India dwarf small markets)', 'Usually irrelevant — no per-country ordering need', 'Avoid — guarantees hot partitions'],
            ['tenant_id (B2B SaaS)', 'Depends — fine if tenants are similar size, poor if one whale tenant dominates', 'High — per-tenant ordering often required', 'Fine for most tenants, needs a plan for outliers (see below)'],
            ['null (no key)', 'Excellent — sticky partitioner spreads evenly by design', 'None', 'Correct choice when no ordering is needed'],
          ]}
        />
        <SubTitle>The hot partition problem</SubTitle>
        <Para>
          A hot partition happens when your chosen key is skewed — a small number of key values account for a
          disproportionate share of traffic. Because every record for a given key always hashes to the same
          partition, a skewed key doesn't just create uneven load, it concentrates that imbalance permanently
          onto one physical partition, and therefore onto one broker and one consumer instance.
        </Para>
        <CodeBox label="a concrete hot-partition scenario">
{`topic: freshcart.orders, keyed by customer_id, 8 partitions

# Normal customers: a few orders a month each, spread evenly across 8 partitions
# One customer: a large enterprise reseller placing 40% of all order volume through
#               a single automated integration account

# Every one of that reseller's orders hashes to the SAME partition (say, partition 5)
# because they all share customer_id="reseller_882"

# Result:
#   partitions 0,1,2,3,4,6,7 — light, evenly loaded, consumers idle much of the time
#   partition 5              — carrying 40% of total volume alone
#   the single consumer instance assigned to partition 5 cannot keep up
#   consumer lag grows on partition 5 while lag on every other partition sits near zero
#   this is invisible in an AVERAGE lag metric — see Part 07's Error Library entry`}
        </CodeBox>
        <Para>
          The same problem shows up with a single wildly popular product ID in an inventory-events topic, a
          single viral post ID in a social-activity topic, or any workload with a genuine power-law
          distribution of activity per key. There is no purely automatic fix, because the skew is inherent to
          the business data, not a configuration mistake. Common mitigations include salting the hot key (for
          example, appending a random suffix like <code>reseller_882#3</code> so one logical entity's traffic
          spreads across several partitions, at the cost of losing strict per-entity ordering for that
          entity), increasing partition count so the hot key's share of any one partition shrinks somewhat
          (it helps only marginally, since the hot key still lands on exactly one of the now-larger set of
          partitions), or building a composite key that includes a natural sub-dimension of the entity (order
          line ID instead of just order ID, if line-level ordering is sufficient).
        </Para>
        <Callout title="Diagnosing a hot partition in production" color="#ef4444">
          Consumer lag tools report lag per partition, not just a topic-wide total. If you only monitor the
          aggregate, a hot partition can hide behind seven healthy partitions averaging the number down. Alert
          on per-partition lag, and if you see one partition consistently far ahead of the others in lag or
          throughput, suspect key skew before suspecting consumer code.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Custom partitioners" />
        <SectionTitle>When You'd Write a Custom Partitioner</SectionTitle>
        <Para>
          The default partitioner (hash the key, mod the partition count; sticky/round-robin for null keys)
          is correct for the overwhelming majority of topics. A custom partitioner is a deliberate override of
          that logic, and it is worth reaching for only when the default's behavior actively works against a
          specific, well-understood requirement.
        </Para>
        <Para>
          The most common legitimate reasons to write one: explicit routing that has nothing to do with a
          hash at all — for example, sending all records tagged <code>priority=critical</code> to a dedicated
          subset of partitions served by a smaller, faster consumer pool, while routine records use the rest;
          mitigating a known hot key by applying custom salting logic inside the partitioner itself rather
          than in every producer call site; or maintaining compatibility with a partitioning scheme from
          another system during a migration, so that records that were co-located in the old system stay
          co-located in Kafka.
        </Para>
        <CodeBox label="a minimal custom partitioner sketch — priority-based routing">
{`# Reserve partitions 0-1 of an 8-partition topic for critical records,
# spread everything else across partitions 2-7.

class PriorityPartitioner:
    def partition(self, key, value, partition_count, available_partitions):
        if value.get("priority") == "critical":
            # only 2 partitions for the critical lane — small, fast consumer pool
            return hash(key) % 2
        else:
            # remaining 6 partitions for everything else
            return 2 + (hash(key) % (partition_count - 2))

# This is NOT the default behavior — a hash of the key alone would never
# treat two records with the same key differently based on a value field.
# A custom partitioner can inspect the full record, not just the key.`}
        </CodeBox>
        <Callout title="Custom partitioners are an escape hatch, not a default" color="#f97316">
          A custom partitioner adds a piece of routing logic that every engineer touching this topic later
          must understand before they can reason about which partition any given record lands on. Document it
          prominently, and prefer solving the problem with a better key (Part 04) before reaching for custom
          partitioning logic — a good key is simpler to explain, test, and hand off than bespoke routing code.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The partition-count trap" />
        <SectionTitle>Changing Partition Count Breaks the Key-to-Partition Mapping</SectionTitle>
        <Para>
          This is the gotcha that catches teams who understand everything above but haven't connected it to
          operations. The formula is <code>hash(key) % partition_count</code>. Partition count is not a
          constant baked into the hash — it's a live input. If you increase a topic's partition count after
          the topic has been in production, the modulo changes, which means the formula's output changes for
          most keys, which means most keys now map to a <em>different</em> partition than they did before.
        </Para>
        <CodeBox label="what actually happens when you add partitions">
{`# freshcart.orders starts with 4 partitions
hash("user_9271") % 4 = 2    # historically, all of user_9271's records are in partition 2

# ... months of production traffic accumulate in partition 2 for this user ...

# Ops decides the topic needs more throughput and runs:
#   kafka-topics --alter --topic freshcart.orders --partitions 8

hash("user_9271") % 8 = 6    # same key, same hash, DIFFERENT partition — modulo changed

# What this means concretely:
# - All of user_9271's OLD records are still sitting in partition 2 (data is never moved)
# - All of user_9271's NEW records, from this point forward, go to partition 6
# - A consumer that groups by key across the topic's full history now sees the
#   same user's order sequence split across two partitions with no ordering
#   relationship between them
# - This applies to EVERY key whose hash % 4 != hash % 8 — which is most keys`}
        </CodeBox>
        <Para>
          Nothing about this is a bug or a Kafka misbehavior — it's the direct, correct consequence of a
          deterministic formula that includes partition count as an input. But it means that for any topic
          where key-based ordering genuinely matters, partition count is not a knob you can casually turn up
          later "for more throughput." Turning it up silently and permanently breaks the ordering guarantee
          that the whole system was designed around, for every key whose new modulo differs from its old one.
        </Para>
        <Table
          headers={['Scenario', 'Safe to add partitions later?', 'Why']}
          rows={[
            ['Topic uses null keys (no ordering dependency)', 'Yes', 'There was never a key-to-partition mapping to preserve — round-robin/sticky distribution adapts fine'],
            ['Topic is keyed but consumers never rely on per-key order across the resize boundary', 'Usually, with care', 'Old records keep old mapping, new records use new mapping; fine if nothing joins across the boundary'],
            ['Topic is keyed and downstream logic assumes strict per-entity ordering forever (e.g. a state machine)', 'No — plan partition count up front instead', 'Splitting one entity\'s history across two partitions breaks the ordering the state machine depends on'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> partition count is an operational scaling knob, like adding more
            servers to a pool — turn it up whenever throughput needs increase.
          </Para>
          <Para>
            <strong>Production model:</strong> for any topic where key-based ordering matters, partition count
            is a design-time decision, made with headroom, before the topic goes live. Estimate target
            throughput and entity cardinality up front, and size partitions generously rather than relying on
            resizing later.
          </Para>
        </HighlightBox>
        <Callout title="If you must add partitions to an ordering-sensitive topic" color="#ef4444">
          There is no in-place fix that preserves both old and new data's key mapping. The real options are:
          accept a one-time ordering discontinuity at the resize boundary (fine if consumers handle
          per-key state reconciliation anyway); or create a new topic with the target partition count, and
          migrate producers and consumers to it in a coordinated cutover, treating it as a genuine migration
          rather than a live resize. Either way, this is a decision made deliberately with stakeholders, not a
          command run quietly during a capacity crunch.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Putting it together" />
        <SectionTitle>A Worked Design: Partitioning an Order-Events Topic</SectionTitle>
        <Para>
          Walking through a full example ties the previous parts together. Suppose you're designing
          <code>freshcart.orders</code>, a topic carrying every lifecycle event for every order: placed,
          payment_captured, packed, shipped, delivered, cancelled. Multiple consumers care about this topic —
          a fulfillment service, a customer-notification service, and an analytics pipeline.
        </Para>
        <BulletList
          items={[
            'Key choice: order_id. Every event for one order must be processed in the sequence it happened — a "shipped" event must never be seen before "payment_captured" for the same order.',
            'Distribution check: order IDs are high-cardinality and roughly even in volume per order (an order generates a handful of events, not millions) — no single order_id dominates traffic the way one customer or one product might, so this key does not create a hot partition on its own.',
            'Partition count: sized for projected peak throughput with headroom, decided before launch — per Part 06, this cannot be casually revised later without breaking ordering for orders already in flight.',
            'Consumer groups: fulfillment, notifications, and analytics each run their own independent consumer group against this topic, each free to scale up to the partition count without affecting the others.',
            'What is explicitly NOT guaranteed: the relative order between order A\'s events and order B\'s events. Nothing in the system needs that, so this is an acceptable, correct gap — not a bug.',
          ]}
        />
        <Para>
          Notice what this design does not need: a custom partitioner (the default hash-based routing is
          exactly right for order_id), and no null-key traffic (every event genuinely belongs to a specific
          order). The design is almost entirely a consequence of correctly answering "what needs to stay in
          order, and what is that entity's identifier" — which is the question this whole module has been
          building toward.
        </Para>
        <Para>
          It's also worth stress-testing the design against a plausible future change before calling it done:
          what happens if one enterprise customer starts placing an unusually large share of all orders
          through an automated bulk-ordering integration? Because the key is <code>order_id</code>, not
          <code>customer_id</code>, that customer's orders are still spread across every partition — each
          order gets its own hash, so no single partition absorbs that customer's disproportionate volume.
          This is a direct, concrete payoff of choosing the right granularity of key in Part 04: a coarser key
          like <code>customer_id</code> would have made this design fragile against exactly the kind of
          real-world skew that eventually shows up in almost every production system.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Monitoring key-based partitioning in production" />
        <SectionTitle>Watching for Skew Before It Pages You</SectionTitle>
        <Para>
          Everything in Parts 04 and 06 describes problems that develop gradually and are invisible in
          aggregate dashboards. A topic-wide throughput graph, a topic-wide average lag number, and a
          topic-wide disk usage figure can all look perfectly healthy while one partition quietly absorbs a
          disproportionate share of load. Catching this before it becomes an incident means monitoring at the
          partition level, not just the topic level, from the day a keyed topic goes live.
        </Para>
        <Para>
          The three signals worth tracking per partition are: consumer lag, bytes-in rate, and message-rate.
          Any one of these consistently diverging from its siblings — not a brief spike, but a sustained gap —
          is the early warning for key skew described in Part 04. Catching it early, while the skew is
          moderate, gives you room to salt a key or redesign before the affected consumer is visibly falling
          behind in a way customers or downstream teams notice.
        </Para>
        <CodeBox label="a per-partition lag check, not a topic-wide one">
{`# topic-wide average — LOOKS fine, hides the problem
$ kafka-consumer-groups --describe --group billing-group --bootstrap-server broker:9092
# TOPIC             PARTITION  LAG
# freshcart.orders  (avg across 8 partitions): 1,240   ← looks totally reasonable

# same data, per partition — the real picture
# TOPIC             PARTITION  LAG
# freshcart.orders  0          140
# freshcart.orders  1          95
# freshcart.orders  2          9,680   ← one partition carrying nearly all the lag
# freshcart.orders  3          60
# freshcart.orders  4          110
# freshcart.orders  5          130
# freshcart.orders  6          75
# freshcart.orders  7          90

# the average of these eight numbers is ~1,297 — deceptively unremarkable
# alerting on "average lag > threshold" would have caught this late, if at all
# alerting on "max partition lag > threshold" or "stddev across partitions" catches it early`}
        </CodeBox>
        <Table
          headers={['Signal', 'What a healthy topic looks like', 'What skew looks like']}
          rows={[
            ['Per-partition consumer lag', 'Roughly even across partitions, all near zero under normal load', 'One or a few partitions consistently far higher than the rest'],
            ['Per-partition bytes-in rate', 'Roughly proportional across partitions', 'One partition receiving a disproportionate share of total topic bytes'],
            ['Per-partition message rate', 'Roughly even', 'One partition receiving far more messages, even if message sizes are similar'],
            ['Broker-level disk/network on the leader for the hot partition', 'In line with its peer brokers', 'Elevated relative to brokers leading only well-distributed partitions'],
          ]}
        />
        <Callout title="Alert on the shape of the distribution, not just the total" color="#38bdf8">
          A topic-wide sum or average is the wrong metric to alert on for a keyed topic, because the whole
          point of key-based partitioning is that different partitions can have very different loads even
          when everything is working as intended in aggregate. Alert on the maximum single-partition lag, or
          on the spread (max minus min, or standard deviation) across partitions in the same consumer group —
          either catches a hot partition long before a topic-wide average would move enough to trip a naive
          threshold.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Keys and consumer groups together" />
        <SectionTitle>How Partitioning Decisions Interact With Consumer Group Scaling</SectionTitle>
        <Para>
          Everything covered so far is about the producer side — how a key gets a record onto a specific
          partition. It's worth closing the loop on the consumer side, because partitioning decisions
          directly determine the ceiling on how much a consumer group can scale, and a good key choice on the
          producer side can still be undermined by a bad partition-count decision that ignores this ceiling.
        </Para>
        <Para>
          Within one consumer group, each partition is assigned to exactly one consumer instance at a time.
          This means the partition count set at topic-design time is a hard cap on how many consumer
          instances in a single group can ever be simultaneously active and doing useful work. A topic with 6
          partitions cannot usefully run more than 6 consumer instances in one group — a 7th instance sits
          idle, receiving no partitions, no matter how much spare processing capacity it has.
        </Para>
        <CodeBox label="partition count as a hard ceiling on consumer group parallelism">
{`topic: freshcart.orders, 6 partitions
consumer group: fulfillment-group

# 4 consumer instances running:
# fulfillment-1 → partitions 0, 1
# fulfillment-2 → partitions 2, 3
# fulfillment-3 → partitions 4
# fulfillment-4 → partitions 5

# Scale up to 6 instances — perfect 1:1 assignment:
# fulfillment-1 → partition 0
# fulfillment-2 → partition 1
# fulfillment-3 → partition 2
# fulfillment-4 → partition 3
# fulfillment-5 → partition 4
# fulfillment-6 → partition 5

# Scale up to 8 instances — 2 sit completely idle:
# fulfillment-1..6 → one partition each, same as above
# fulfillment-7 → (no partitions assigned) — idle
# fulfillment-8 → (no partitions assigned) — idle

# This ceiling is set by partition count, independent of how good the key
# choice is. A perfectly chosen key with too few partitions still limits
# how far this consumer group can ever scale.`}
        </CodeBox>
        <Para>
          This is the practical reason partition count planning (Part 06) and key choice (Part 04) have to be
          decided together, not separately. Partition count needs enough headroom for peak expected consumer
          parallelism, not just peak expected producer throughput — and because increasing it later breaks
          key-based ordering for existing data, both the throughput requirement and the scaling requirement
          need to be estimated at design time, together.
        </Para>
        <Table
          headers={['Question at design time', 'Why it affects partition count']}
          rows={[
            ['What is peak expected write throughput?', 'One partition has a practical throughput ceiling; too few partitions bottlenecks producers regardless of consumers'],
            ['What is peak expected consumer parallelism?', 'Partition count caps how many consumer instances in one group can be simultaneously active'],
            ['Does this topic need key-based ordering?', 'If yes, partition count cannot be casually increased later (Part 06) — plan generously from the start'],
            ['Are there multiple independent consumer groups?', 'Each group gets its own independent scaling ceiling from the same partition count — size for the group with the highest parallelism need'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Migrating an ordering-sensitive topic safely" />
        <SectionTitle>A Step-by-Step Cutover When Partition Count Must Change</SectionTitle>
        <Para>
          Part 06 established the rule: don't resize an ordering-sensitive topic's partition count in place.
          But eventually a topic really does outgrow its original partition count — traffic grew far past
          what was planned, or a genuinely new consumer parallelism requirement appeared. When that happens,
          the safe path is a deliberate migration, not a live <code>--alter --partitions</code> command. It's
          worth walking through what that migration actually looks like end to end.
        </Para>
        <CodeBox label="a safe migration sequence for an ordering-sensitive topic">
{`# Goal: move freshcart.orders from 8 partitions to 24 partitions
# without breaking per-order-id ordering for orders already in flight

# Step 1 — Create the new topic with the target partition count
kafka-topics --create --topic freshcart.orders.v2 --partitions 24 --replication-factor 3

# Step 2 — Dual-write: update producers to write to BOTH freshcart.orders
#           and freshcart.orders.v2 for some transition window.
#           (Or use a bridging consumer that reads the old topic and
#           republishes to the new one, if producer changes are harder to land.)

# Step 3 — Update consumers one at a time to read from freshcart.orders.v2
#           instead of freshcart.orders. Because dual-writes are happening,
#           each order's NEW events are visible on the new topic in correct
#           per-key order (hash(order_id) % 24 is now stable and consistent
#           for every event written after the cutover began).

# Step 4 — For orders that were already in flight when the migration started,
#           reconcile: any order with pre-cutover events on the OLD topic and
#           post-cutover events on the NEW topic needs application-level logic
#           to treat both as one logical sequence during the transition window.
#           This is the one piece of real complexity in the whole migration —
#           budget time for it rather than treating cutover as instantaneous.

# Step 5 — Once all consumers are confirmed reading from freshcart.orders.v2
#           and the transition window has fully drained (no more in-flight
#           orders that started before cutover), stop dual-writing and
#           decommission freshcart.orders after its retention window passes
#           (so it remains available briefly for any final reconciliation).`}
        </CodeBox>
        <Para>
          Notice that none of this happens inside Kafka's partitioning mechanism — the mechanism itself
          (<code>hash(key) % partition_count</code>) offers no migration path, because a migration path isn't
          what it's designed to do. It's a pure, stateless routing function. Moving safely to a new partition
          count is entirely an application-level exercise in careful dual-writing, phased consumer cutover,
          and explicit handling of the in-flight transition window — which is exactly why avoiding the need
          for this in the first place, by sizing partition count generously up front (Part 06), is so much
          cheaper than doing it.
        </Para>
        <Callout title="This is a project, not a command" color="#ef4444">
          Teams that treat a partition-count increase on an ordering-sensitive topic as a quick operational
          command usually discover the in-flight-entity reconciliation problem only after it's already caused
          incorrect downstream state. Scope it as a proper migration with a named owner, a transition window,
          and an explicit reconciliation plan for entities that straddle the cutover — the same rigor you'd
          apply to any other schema or infrastructure migration that touches production data.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Composite and salted keys" />
        <SectionTitle>Beyond a Single Field: Composite Keys and Deliberate Salting</SectionTitle>
        <Para>
          Not every good partition key is a single existing field copied straight from your data model.
          Sometimes the right key is a composite — a deliberately constructed string combining two pieces of
          information — built specifically to balance the distribution and ordering trade-offs from Part 04.
        </Para>
        <Para>
          A composite key is useful when the natural entity identifier alone would be too coarse (too few
          distinct values, causing skew) or too fine (splitting related records that actually need to stay
          together). For a multi-tenant SaaS platform, keying purely by <code>tenant_id</code> risks a whale
          tenant dominating one partition, per Part 04's table; keying purely by a finer field like
          <code>user_id</code> might scatter one tenant's events across every partition when the business
          actually needs per-tenant event ordering for its audit log. A composite key —
          <code>tenant_id + "-" + shard_bucket</code>, where <code>shard_bucket</code> is a small deterministic
          hash of the user ID — can thread that needle.
        </Para>
        <CodeBox label="a composite key for a large multi-tenant audit-log topic">
{`# Problem: tenant_id alone is too skewed (one huge enterprise tenant dominates)
# Requirement: still need ordering WITHIN a tenant's events, just spread across
#              more than one partition for the largest tenants

def composite_key(tenant_id: str, user_id: str, num_buckets: int = 4) -> str:
    # deterministic sub-bucket within the tenant, based on user_id
    bucket = hash(user_id) % num_buckets
    return f"{tenant_id}#{bucket}"

# Every event for tenant "acme_corp" now lands on one of 4 sub-buckets
# instead of a single partition:
composite_key("acme_corp", "user_501")   # → "acme_corp#2"
composite_key("acme_corp", "user_502")   # → "acme_corp#0"
composite_key("acme_corp", "user_503")   # → "acme_corp#2"  (same bucket as user_501)

# Trade-off being made explicitly:
# - Strict ordering is preserved PER (tenant, bucket) pair, not per tenant overall
# - acme_corp's total load now spreads across up to 4 partitions instead of 1
# - A consumer needing tenant-wide ordering must merge across those 4 buckets
#   explicitly — this key choice moved complexity from "hot partition" to
#   "consumer-side merge", which is the right trade when strict global
#   per-tenant order isn't actually required, just rough per-user order`}
        </CodeBox>
        <Para>
          This is the same salting idea introduced as a hot-partition mitigation in Part 04, made concrete as
          a designed-in key structure rather than a reactive fix. The general lesson: a partition key doesn't
          have to be a single raw field. It can — and for genuinely skewed, high-volume entities, often should
          — be an engineered value that deliberately balances distribution against the specific ordering
          guarantee the use case actually needs, rather than the strongest possible guarantee by default.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Co-partitioning for stream joins" />
        <SectionTitle>Why Stream Processing Joins Depend Entirely on Key and Partition Choices</SectionTitle>
        <Para>
          Everything covered so far treats one topic at a time. A particularly high-stakes application of
          keying and partitioning shows up the moment you try to join two topics together in a stream
          processor like Kafka Streams or ksqlDB — for example, joining <code>freshcart.orders</code> with
          <code>freshcart.customers</code> to enrich every order event with the customer's current tier. A
          stream-stream or stream-table join like this only works correctly, and only works without expensive
          cross-network shuffling, if the two topics are co-partitioned.
        </Para>
        <Para>
          Co-partitioned means: both topics use the same key (the join key — <code>customer_id</code> in this
          example), and both topics have the same partition count. When both conditions hold, partition 0 of
          the orders topic and partition 0 of the customers topic are guaranteed to contain exactly the same
          set of customer IDs (because both were routed by the same <code>hash(customer_id) % partition_count</code>
          formula with the same partition count), so a stream processor can join them locally, partition by
          partition, on the same machine, with no network shuffle required. Break either condition and the
          join either requires an expensive repartitioning step or silently produces wrong results.
        </Para>
        <CodeBox label="co-partitioning — what makes a local join possible">
{`# freshcart.orders    — keyed by customer_id, 12 partitions
# freshcart.customers  — keyed by customer_id, 12 partitions
# SAME key, SAME partition count → co-partitioned

# hash("cust_88213") % 12 = 5   (evaluated identically for both topics)
# → orders for cust_88213 are in orders-partition-5
# → the customer record for cust_88213 is in customers-partition-5
# A stream processor task assigned partition 5 of BOTH topics can join them
# entirely locally — every order it sees has its matching customer record
# sitting in the same local partition, no network call needed.

# Now suppose freshcart.customers only has 6 partitions instead of 12:
# hash("cust_88213") % 6 = 2   ← DIFFERENT partition number than orders' partition 5
# The stream processor task handling orders-partition-5 does NOT have
# cust_88213's customer record locally. The join either fails to find a
# match, or (if the framework handles it) triggers an internal repartitioning
# step — re-keying and rewriting one of the topics through an intermediate
# topic just to make the join possible. That's real infrastructure cost that
# co-partitioning from the start would have avoided entirely.`}
        </CodeBox>
        <Table
          headers={['Condition', 'If satisfied', 'If violated']}
          rows={[
            ['Same join key on both topics', 'Records for one entity are correctly comparable across both topics', 'Framework cannot find matching records at all — join key mismatch'],
            ['Same partition count on both topics', 'hash(key) % count is identical for both, so entity lands on the same partition number in both', 'Same entity lands on different partition numbers per topic — requires repartitioning'],
            ['Both conditions together (co-partitioned)', 'Join executes locally, partition by partition, no network shuffle', 'Framework repartitions one side through an intermediate topic before joining'],
          ]}
        />
        <Callout title="This is why partition count decisions ripple across a whole data platform" color="#38bdf8">
          A topic's partition count isn't just that topic's own scaling decision — if it's ever going to be
          joined against another topic in stream processing, its partition count needs to match that other
          topic's partition count too. This is one more concrete reason Part 06's advice to plan partition
          count generously and deliberately at design time matters beyond just that one topic: changing it
          later can silently break co-partitioning for every join built against it, not just the ordering
          guarantee within the topic itself.
        </Callout>
        <Para>
          In practice, teams that lean heavily on Kafka Streams or ksqlDB joins often standardize on a single
          partition count (or a small number of standard counts) across all topics that participate in joins,
          precisely to keep co-partitioning simple to reason about — rather than tuning each topic's partition
          count independently and then discovering a join needs repartitioning.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Keying decisions from Kafka Connect and CDC sources" />
        <SectionTitle>Where the Key Actually Comes From When Data Enters Kafka Automatically</SectionTitle>
        <Para>
          Everything so far has assumed a producer application deliberately chooses a key. In practice, a
          large share of the records that end up in a Kafka topic never pass through hand-written producer
          code at all — they arrive via Kafka Connect source connectors, most commonly CDC (change data
          capture) connectors like Debezium reading a database's write-ahead log. It's worth being explicit
          about how keying decisions get made in that path, because it's a different mechanism from the
          <code>producer.send(key=..., value=...)</code> calls used throughout this module, even though the
          underlying partitioning formula from Part 01 still applies once a key exists.
        </Para>
        <Para>
          A CDC connector reading a database table almost always keys each record by that table's primary
          key — which is exactly the right default, because it means every change to a given row (insert,
          update, delete) lands on the same partition, giving you per-row ordering for free, matching the
          per-entity ordering pattern from Part 04. This is also precisely the setup that makes a CDC topic a
          natural fit for <code>cleanup.policy=compact</code>, covered in the companion module on retention
          and compaction — a compacted, primary-key-keyed CDC topic converges to a live mirror of the
          source table's current state.
        </Para>
        <CodeBox label="CDC keying — what a Debezium-style connector produces by default">
{`# Source table: customers (primary key: customer_id)

# UPDATE customers SET tier = 'gold' WHERE customer_id = 'cust_88213';

# Connector produces, onto freshcart.customers.cdc:
{
  "key": { "customer_id": "cust_88213" },   # primary key becomes the Kafka record key
  "value": {
    "before": { "customer_id": "cust_88213", "tier": "silver", ... },
    "after":  { "customer_id": "cust_88213", "tier": "gold", ... },
    "op": "u",   # u=update, c=create, d=delete, r=read (snapshot)
    "ts_ms": 1732012345000
  }
}

# hash(customer_id="cust_88213") % partition_count → same partition every time,
# same as any other keyed record from Part 01 — the routing mechanism doesn't
# care whether the key came from application code or a CDC connector.

# A DELETE from the source table typically produces a tombstone-adjacent pair:
# one record with op="d" (so consumers see the deletion event itself), followed
# by a genuine null-value tombstone record for that key — this is what lets a
# CDC topic correctly participate in log compaction's key-removal mechanism.`}
        </CodeBox>
        <Table
          headers={['Source', 'Typical key choice', 'Why']}
          rows={[
            ['CDC connector (Debezium-style) reading a table', "The table's primary key, automatically", 'Guarantees per-row ordering and makes the topic a valid candidate for compaction'],
            ['File/log-line source connector (no natural entity)', 'Often null, or a synthetic key like source-file-offset', 'No natural per-entity ordering requirement — distribution matters more than ordering'],
            ['Application producer, hand-written', "Whatever the developer explicitly sets, per Part 04's guidance", "Must be chosen deliberately — there's no automatic default doing this well for you"],
          ]}
        />
        <Callout title="Sink connectors care about the key too" color="#38bdf8">
          The same key that got a record onto a specific partition on the way in is usually also what a
          downstream sink connector uses to decide how to write that record out — for example, a JDBC sink
          connector typically uses the Kafka record key as the target table's primary/upsert key. A CDC
          pipeline's end-to-end correctness (source row change → Kafka record → downstream table row update)
          depends on that key being preserved and meaningful all the way through, which is one more reason
          "the key routes to a partition" (Part 01) is only half the story — the same key is frequently load-
          bearing well beyond Kafka's own partitioning mechanism.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Verifying key/partition assignment locally" />
        <SectionTitle>Proving the Routing Mechanism Rather Than Trusting It Blindly</SectionTitle>
        <Para>
          Everything in this module describes a deterministic mechanism, which means it's directly testable —
          you don't have to take it on faith that two records with the same key land on the same partition,
          or that a null key spreads load. Before relying on a partitioning strategy in production, it's worth
          actually observing the assignment on a local or test cluster, the same way you'd verify retention
          and compaction behavior rather than only trusting the configuration.
        </Para>
        <CodeBox label="observing partition assignment directly">
{`# Create a small test topic
kafka-topics --create --topic test.partitioning --partitions 4 --replication-factor 1

# Produce a few records with explicit keys, printing the partition each lands on
kafka-console-producer --topic test.partitioning --bootstrap-server localhost:9092 \\
  --property "parse.key=true" --property "key.separator=:"
# type: user_9271:order-A
# type: user_4410:order-B
# type: user_9271:order-C
# (Ctrl+D to exit)

# Consume with partition info visible to confirm the mapping:
kafka-console-consumer --topic test.partitioning --bootstrap-server localhost:9092 \\
  --from-beginning --property print.key=true --property print.partition=true

# Expected output confirms Part 01's mechanism directly:
# Partition:2 user_9271  order-A
# Partition:0 user_4410  order-B
# Partition:2 user_9271  order-C     ← same partition as order-A, same key

# Now repeat with partitions=8 on a NEW topic using the same keys and observe
# that user_9271 very likely lands on a DIFFERENT partition number than it
# did with 4 partitions — a hands-on demonstration of Part 06's partition-
# count trap, safely observed on disposable test data instead of production.`}
        </CodeBox>
        <Para>
          This kind of direct verification is especially worth doing before a partition-count change on any
          topic you're not sure is safe to resize, and before trusting a new custom partitioner's logic (Part
          05) — printing the actual partition assignment for a representative sample of real keys is a fast,
          concrete way to catch a routing bug before it reaches production, rather than discovering it weeks
          later as an ordering anomaly nobody can immediately explain.
        </Para>
        <SubTitle>What "representative" keys means in practice</SubTitle>
        <Para>
          A quick spot-check with two or three convenient test keys is not the same thing as verifying
          distribution. Because a good key's whole value proposition is even spread across the real,
          production-shaped population of key values, a meaningful local test samples real (or realistically
          shaped) key values at real volume — pulling a sample of actual customer IDs or order IDs from a
          staging dataset, if one exists, rather than typing <code>user1</code>, <code>user2</code>,
          <code>user3</code> by hand. A handful of sequential test keys can easily hash to a suspiciously even
          spread purely by coincidence, giving false confidence that a skewed production key population would
          not actually deliver.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Keys and Partitioning</SectionTitle>
        {[
          {
            wrong: '"The key is just metadata attached to a record, like a label"',
            right: 'Part 01 is explicit that the key is a partitioning input, not a label — hash(key) % partition_count is the entire routing mechanism, and it is this mechanism that makes per-key ordering possible in the first place.',
          },
          {
            wrong: '"Kafka preserves the order I sent records in, across the whole topic"',
            right: 'Part 03 states the actual scope precisely: ordering is guaranteed strictly within one partition. Records in different partitions have no guaranteed relative order at all, even from the same producer, even sent a second apart.',
          },
          {
            wrong: '"A null key means records get lost or dropped somewhere"',
            right: 'Part 02 covers what actually happens — a null key just skips hash-based routing and uses round-robin or sticky load balancing instead. Every record is still written and delivered; it simply carries no per-key ordering relationship to other records.',
          },
          {
            wrong: '"Adding more partitions to a topic is a safe way to add throughput any time you need it"',
            right: 'Part 06\'s partition-count trap is the correction: for any topic where key-based ordering matters, changing partition count changes hash(key) % partition_count for most keys, silently splitting a given entity\'s history across two partitions. Partition count must be planned up front, not resized casually.',
          },
          {
            wrong: '"If one partition is lagging, the fix is always to add more consumers"',
            right: 'Part 04\'s hot-partition discussion shows this doesn\'t help when the cause is key skew — one partition can only ever be read by one consumer per group regardless of how many consumers are in the pool. Diagnose per-partition lag and look at key distribution before assuming more consumers will fix it.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real-World Story" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Instacart:</strong> an on-call engineer gets paged for consumer lag on the
            order-tracking pipeline. The dashboard shows total lag climbing, but total lag across 12
            partitions is a misleading number to page on. Breaking it down per partition shows eleven
            partitions sitting at zero and one partition climbing steadily — traced to a grocery-chain
            partner account whose orders all share one <code>account_id</code> key, generating a
            disproportionate share of volume through a single bulk-ordering integration. The fix isn't more
            consumers (partition count caps that at 12 regardless); it's a follow-up project to salt that
            one account's key so its traffic spreads across multiple partitions.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Chime:</strong> a new engineer proposes bumping a transactions topic from 12 to 24
            partitions to "get more throughput" ahead of a marketing push. Before approving, a senior
            engineer asks a pointed question: does anything downstream assume per-account ordering across
            this topic's full history? The answer is yes — a balance-reconciliation service replays the
            entire topic from the beginning after any restart and expects each account's transaction events
            in sequence. The team instead creates a new topic with 24 partitions from day one, migrates
            producers and consumers in a coordinated cutover, and leaves the old topic's data as the
            authoritative pre-cutover history — avoiding a silent, permanent ordering break for live accounts.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "Design an event pipeline for a ride-sharing
            app's trip-status updates." The strong answer keys the topic by <code>trip_id</code>, explains
            that this guarantees per-trip event ordering (requested → matched → started → completed) because
            same key means same partition means same log means one physical order, and explicitly calls out
            that no cross-trip ordering exists or is needed. It also flags the hot-partition risk for a
            power-driver or promotional surge scenario, and states that partition count would be sized with
            headroom at launch rather than adjusted reactively. Every one of those points traces back to a
            Part in this module.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Explain exactly how a Kafka record\'s key determines which partition it goes to.',
            a: `The default partitioner takes the serialized key bytes, runs them through a hash function, and takes the result modulo the topic's partition count — hash(key) % partition_count, as covered in Part 01. Because hashing is deterministic, the same key always produces the same hash, and as long as the partition count doesn't change, that always maps to the same partition.

This is the entire mechanism behind Kafka's per-key ordering guarantee: two records sharing a key are guaranteed to land in the same partition, and since a partition is one physically sequential log, they're guaranteed to be read back in the order they were written.

If the key is null, there's nothing to hash, so the producer instead uses a load-balancing strategy — historically strict round-robin, and in newer clients a sticky partitioner that batches several records onto one partition before rotating, for better batching efficiency at the same even distribution, as I'd detail in Part 02.`,
          },
          {
            q: 'Q2. Does Kafka guarantee message ordering? Be precise.',
            a: `Kafka guarantees ordering strictly within a single partition — records written to one partition are delivered to consumers of that partition in exactly the order they were written. That's it. There is no guarantee whatsoever about the relative order of records in different partitions, even within the same topic, even from the same producer, per Part 03.

This matters because "Kafka preserves order" is the sentence people remember, and they quietly extend it to mean topic-wide order, which is false and causes real bugs — consumer logic that assumes cross-partition arrival order reflects a true sequence will work fine in a single-partition test topic and misbehave unpredictably at production partition counts.

If a use case genuinely needs ordering across records with different natural keys, the two honest options are: key them so the records that must stay ordered relative to each other share a key, or use a single partition and accept the throughput ceiling that comes with it.`,
          },
          {
            q: 'Q3. What is a hot partition, and how would you both diagnose and fix one?',
            a: `A hot partition is a partition receiving disproportionately more traffic than the topic's other partitions, almost always because the chosen key is skewed — a small number of key values (one huge customer, one viral product) account for a large share of total volume, and because a key's hash always maps to the same partition, that imbalance concentrates permanently on one physical partition, per Part 04.

Diagnosis: check consumer lag per partition, not the topic-wide aggregate — an average across many healthy partitions and one hot one can look deceptively fine. A partition with consistently higher lag or throughput than its siblings is the signal. From there, look at which key values are landing on that partition and check for one or a few outlier entities dominating it.

Fixes depend on the cause: salting the hot key (appending a suffix to spread one logical entity's traffic across multiple partitions, at the cost of strict per-entity ordering for that entity), redesigning the key to a finer-grained sub-entity if that still satisfies the ordering requirement, or in some cases accepting the skew and giving that specific partition/consumer more resources. Adding more consumers past the partition count does not help — a partition is owned by exactly one consumer per group regardless of pool size.`,
          },
          {
            q: 'Q4. A team wants to increase a topic\'s partition count from 6 to 12 to handle more load. What do you need to know before approving that?',
            a: `The critical question is whether the topic is keyed and whether anything downstream depends on per-key ordering holding across the topic's full history, per Part 06. The partitioning formula is hash(key) % partition_count — changing the partition count changes the modulo, which changes which partition most keys map to going forward, while all previously-written records for those keys stay put in their original partitions. That silently splits a given entity's history across two partitions with no ordering relationship between the pieces.

If the topic uses null keys, or if consumers never rely on cross-boundary per-key ordering, resizing is low-risk. If a downstream service replays the full topic and expects strict per-entity ordering — a state machine, a reconciliation job, an aggregation that assumes monotonic per-key sequence — resizing in place is a correctness bug waiting to happen, not a scaling operation.

The safe path for an ordering-sensitive topic is to create a new topic with the target partition count from the start and run a coordinated migration, rather than altering partition count on the live topic. This is why partition count should be sized with headroom at design time rather than treated as an easy knob to turn later.`,
          },
          {
            q: 'Q5. When would you write a custom partitioner instead of relying on the default key-hash partitioner?',
            a: `Only when the default's pure hash(key) % partition_count behavior actively works against a specific, well-understood requirement, per Part 05. Legitimate cases include explicit routing that has nothing to do with a hash — like reserving a small subset of partitions for high-priority records served by a dedicated fast consumer pool — built-in salting logic for a known hot key so every producer call site doesn't need to implement that logic itself, or preserving a partitioning scheme inherited from another system during a migration.

I'd be cautious recommending one as a first move, though. A custom partitioner is logic every future engineer has to understand before they can reason about where any given record lands, and it's easy to introduce subtle bugs — the priority-routing example I'd sketch shows a custom partitioner can even route two records with the same key to different partitions based on a value field, which breaks the "same key, same partition" mental model everyone else on the team will assume holds.

In most cases I've seen, a better choice of key (Part 04) solves the underlying problem — uneven load or hot entities — more simply than a custom partitioner would, and it's the option I'd push the team to rule out first.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>
        {[
          {
            q: 'Treating the key as descriptive metadata rather than a routing decision',
            a: 'Part 01 covers the mechanism directly — the key determines the partition via hash(key) % partition_count. Choosing a key without thinking about routing consequences (distribution, ordering, skew) means the partitioning behavior was decided by accident, not by design.',
          },
          {
            q: 'Assuming Kafka preserves order across the whole topic, not just within a partition',
            a: 'Part 03 is the correction every engineer eventually needs: ordering is a strictly per-partition guarantee. Consumer logic that silently assumes cross-partition arrival order reflects true sequence will pass in a single-partition test and fail unpredictably at real partition counts.',
          },
          {
            q: 'Choosing a low-cardinality or skewed key like country_code or plan_tier for a high-volume topic',
            a: 'Part 04\'s table and hot-partition walkthrough show why this concentrates load onto a small number of partitions permanently — every record for a given value always hashes to the same partition, so a skewed key guarantees a skewed load distribution, not just a risk of one.',
          },
          {
            q: 'Bumping partition count on a live, ordering-sensitive topic to relieve throughput pressure',
            a: 'Part 06\'s partition-count trap: this changes the modulo in hash(key) % partition_count for most existing keys, splitting a given entity\'s history across two partitions going forward while old records stay where they were. Plan partition count with headroom up front, or migrate to a new topic deliberately.',
          },
          {
            q: 'Reaching for a custom partitioner before trying a better key',
            a: 'Part 05 frames custom partitioners as an escape hatch, not a default. A better choice of key usually solves distribution and ordering problems more simply and without introducing bespoke routing logic every future engineer has to learn before reasoning about where records land.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Symptoms You Will Hit — And Exactly Why</SectionTitle>
        {[
          {
            error: `One consumer instance in a group is pegged at high CPU and its partition's lag climbs steadily while every other consumer in the group sits nearly idle`,
            cause: 'Almost always a hot partition caused by key skew — one or a few key values dominate the traffic landing on that specific partition, per Part 04. Because a partition is owned by exactly one consumer per group, that one consumer absorbs all of the skewed load regardless of how many idle peers exist in the group.',
            fix: 'Confirm with per-partition lag and throughput metrics, then inspect which key values are concentrated on the hot partition. Salt the hot key, redesign the key to a finer entity if ordering requirements allow it, or accept the skew and size that specific consumer\'s resources accordingly — adding more consumers to the group does not help.',
          },
          {
            error: `After a topic was resized from 6 to 12 partitions, a downstream reconciliation job starts producing inconsistent state for accounts that existed before the resize`,
            cause: 'The resize changed hash(key) % partition_count for most keys, per Part 06. Records for a given account written before the resize are in their original partitions; records written after the resize for the same account are now in different partitions. The reconciliation job assumed a single ordered sequence per account and got two disconnected sequences instead.',
            fix: 'There is no in-place fix that reunifies the split history. Going forward, treat any partition count change on an ordering-sensitive topic as a migration: create a new topic sized correctly and cut producers/consumers over deliberately. For the already-split data, the reconciliation job needs explicit logic to merge per-account state from both the pre- and post-resize partitions by timestamp.',
          },
          {
            error: `Two records that were sent to the topic one second apart, both about the same real-world event, are consumed by an analytics job in the wrong order relative to each other`,
            cause: 'The two records have different keys (or one is null) and landed on different partitions, per Part 03. Kafka never promised any ordering relationship between records in different partitions — the analytics job was implicitly relying on send-time order being preserved topic-wide, which is not a guarantee Kafka makes.',
            fix: 'If true cross-record ordering matters for this pair, they need to share a key so they land in the same partition. If that\'s not feasible because they represent genuinely independent entities, the consumer must explicitly sort by an embedded event timestamp rather than relying on arrival or partition order.',
          },
          {
            error: `A newly written custom partitioner routes two records with the identical key to two different partitions, breaking a downstream assumption that same key always means same partition`,
            cause: 'The custom partitioner inspects fields in the record value (for example, a priority flag) in addition to the key, per Part 05\'s priority-routing example, so two records that share a key but differ in that value field can be routed differently. This is a valid thing for a custom partitioner to do, but it silently breaks the "same key, same partition" assumption that the rest of the team, and any default-partitioner-based tooling, takes for granted.',
            fix: 'Document any custom partitioner prominently at the topic level, and audit every consumer for assumptions that only hold under the default partitioner. If the actual goal is just spreading one hot key\'s load, prefer explicit key salting over a custom partitioner that branches on record content — it keeps the "same key, same partition" invariant intact for every other key in the topic.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'A record key is a partitioning input, not metadata: the default partitioner computes hash(key) % partition_count, so records sharing a key always land in the same partition.',
          'A null key skips hashing entirely and uses round-robin or sticky load balancing instead, distributing records evenly with no ordering relationship implied between them.',
          'Kafka\'s ordering guarantee is strictly per-partition. Records in different partitions have no guaranteed relative order, even from the same producer or the same topic.',
          'A good partition key balances even distribution with per-entity ordering needs — user_id or order_id are strong defaults; low-cardinality or skewed keys create permanent hot partitions.',
          'Custom partitioners are an escape hatch for explicit routing or known-skew mitigation — reach for a better key first, since custom routing logic is harder for a team to reason about.',
          'Changing a topic\'s partition count after launch changes the modulo in the routing formula, silently splitting existing keys\' history across partitions — plan partition count up front for any ordering-sensitive topic.',
        ]}
      />
    </LearnLayout>
  )
}
