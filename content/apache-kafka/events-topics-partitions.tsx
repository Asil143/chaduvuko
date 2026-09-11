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
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: FONT_MONO,
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function EventsTopicsPartitions() {
  return (
    <LearnLayout
      title="Events, Topics, and Partitions"
      description="The complete foundation of Kafka's data model: what events are, how topics organize them, how partitions scale them, how records map to partitions, and why ordering is more subtle than beginners expect."
      section="Apache Kafka — Module 02"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Events, Topics, and Partitions', href: '/learn/apache-kafka/events-topics-partitions' },
      ]}
      prev={{ title: 'What is Apache Kafka?', href: '/learn/apache-kafka/what-is-apache-kafka' }}
      next={{ title: 'Producers, Consumers, and Brokers', href: '/learn/apache-kafka/producers-consumers-brokers' }}
    >
      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Kafka's data model" />
        <SectionTitle>Kafka Is Built from Events, Topics, Partitions, and Offsets</SectionTitle>

        <Para>
          Module 01 explained why Kafka exists. This module explains, in real depth, what Kafka is made
          of. Every Kafka system, from a tiny local demo to a multi-region enterprise platform, depends on
          the same data model: events are written to topics, topics are split into partitions, and records
          inside each partition receive offsets. If you understand this model deeply, Kafka becomes
          predictable — you can look at almost any production incident and reason about it from first
          principles. If you only memorize the words, Kafka feels arbitrary and its errors feel like bad
          luck.
        </Para>

        <Para>
          The common beginner mistake is to imagine a topic as one simple list, like an array or a single
          file. That picture is useful for the first five minutes of learning Kafka, but it becomes wrong
          almost immediately once real volume enters the picture. A Kafka topic is not one list. A topic
          is, physically, a set of independent partitions, and each partition is its own ordered log,
          usually stored on a different broker. Kafka guarantees order inside one partition. It makes no
          promise about order across the different partitions that together make up a topic.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The precise model:</strong> A Kafka topic is a named collection of partition logs. A
            partition is an append-only ordered sequence of records, physically stored as a log on disk on
            one broker (plus replicas). Each record has an offset that is unique only inside that
            partition. A record's full, unambiguous location in the cluster is topic + partition + offset
            — not just an offset number by itself.
          </Para>
        </HighlightBox>

        <CodeBox label="the shape of a topic — not one list, but several parallel logs">
{`topic: orders  (created with 3 partitions)

partition 0:
  offset 0 -> OrderPlaced(order_id=100)
  offset 1 -> PaymentAuthorized(order_id=100)
  offset 2 -> ShipmentPrepared(order_id=100)

partition 1:
  offset 0 -> OrderPlaced(order_id=101)
  offset 1 -> OrderCancelled(order_id=101)

partition 2:
  offset 0 -> OrderPlaced(order_id=102)
  offset 1 -> PaymentAuthorized(order_id=102)
  offset 2 -> OrderPlaced(order_id=103)

# Notice: order_id=100's three events are all in partition 0, in order.
# order_id=101's two events are both in partition 1, in order.
# But there is no defined relationship between, say,
# partition 0 offset 2 and partition 2 offset 1 — Kafka does not
# claim to know which one happened first in real-world time.`}
        </CodeBox>

        <Para>
          Everything else in this module — what exactly an event contains, why topics get split this way,
          how a record ends up in one partition versus another, and what retention actually means at the
          partition level — is really just unpacking the consequences of this one picture.
        </Para>

        <Table
          headers={['Layer', 'What it is', 'What it is not']}
          rows={[
            ['Topic', 'A named category of related events — the contract consumers subscribe to.', 'Not itself a single log or a single file — it is an organizing name over partitions.'],
            ['Partition', 'One independent, ordered, append-only log within a topic.', 'Not the same thing as the topic — a topic usually has several of these.'],
            ['Offset', 'A position number for one record within one partition.', 'Not a global, cluster-wide unique message ID by itself.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — What an event actually is" />
        <SectionTitle>An Event Is an Immutable Fact With a Key, a Value, a Timestamp, and Headers</SectionTitle>

        <Para>
          Module 01 introduced the event loosely as &quot;a fact that already happened.&quot; Here is the
          precise, physical shape of a Kafka record, because every downstream design decision — how you
          choose a key, how consumers deduplicate, how ordering works — depends on understanding exactly
          what fields a record carries.
        </Para>

        <SubTitle>Key</SubTitle>
        <Para>
          An optional but usually present field. The key is what Kafka's default partitioner uses to
          decide which partition a record goes into (Part 05 covers this fully). Records with the same key
          are always routed to the same partition, which is how per-entity ordering is achieved. A key is
          typically a business identifier: an order ID, a customer ID, a device ID.
        </Para>

        <SubTitle>Value</SubTitle>
        <Para>
          The actual payload — the business facts the event carries. This is usually JSON, Avro, or
          Protobuf-encoded bytes. Kafka itself does not care what format the value is in; it stores and
          transmits raw bytes. Interpreting those bytes correctly is the producer and consumer's shared
          responsibility, which is why schema contracts matter so much in real systems.
        </Para>

        <SubTitle>Timestamp</SubTitle>
        <Para>
          Every record carries a timestamp, set either by the producer at write time (event time) or by
          the broker at append time (ingestion time), depending on topic configuration. This timestamp is
          distinct from a timestamp field you might also put inside the value's JSON body — Kafka's own
          record timestamp is a first-class part of the record format, used for retention decisions and
          for the time-based index that lets a consumer say &quot;start reading from 3 hours ago.&quot;
        </Para>

        <SubTitle>Headers</SubTitle>
        <Para>
          Optional key-value metadata attached to a record, separate from the value payload — similar in
          spirit to HTTP headers. Commonly used for cross-cutting concerns that shouldn't pollute the
          business payload: a trace ID for distributed tracing, a schema version identifier, the name of
          the producing service, or a content-type marker.
        </Para>

        <CodeBox label="a real Kafka record — all four parts, made concrete">
{`key:       "order-1024"                       (bytes — usually a string or serialized ID)

value:     {                                   (bytes — usually JSON/Avro/Protobuf)
             "event_id": "a2b1022e-8fb5-43a2-86be-8e07c56f1b10",
             "event_type": "OrderPlaced",
             "order_id": "order-1024",
             "customer_id": "customer-88",
             "total_usd": 149.00,
             "currency": "USD"
           }

timestamp: 2026-09-10T18:42:11.203Z            (set by producer or broker, per topic config)

headers:   {
             "trace-id": "9f1c2a-b3e7-44d1",
             "schema-version": "3",
             "producer-service": "checkout-service"
           }

# Kafka stores this whole record at, say, topic=orders, partition=2, offset=88112
# The (topic, partition, offset) triple is how you address this exact record —
# the key and headers do not identify it uniquely by themselves.`}
        </CodeBox>

        <SubTitle>Serialization — what "bytes" actually means in practice</SubTitle>
        <Para>
          It is worth being concrete about how a value actually becomes bytes, since this matters for
          Part 09's design discussion later and for every producer/consumer pair that has to agree on it.
          The three formats you will encounter constantly are JSON (human-readable, flexible, no built-in
          schema enforcement, larger on the wire), Avro (compact binary format with strong schema-evolution
          support, the most common choice in mature Kafka platforms), and Protobuf (compact binary,
          schema-driven, common where the organization already uses gRPC elsewhere). Kafka itself is
          agnostic to all three — it stores and transmits opaque bytes and never inspects the value's
          contents. The producer and every consumer of a topic must independently agree on which format is
          in use and how to interpret it; Kafka provides no enforcement of this by itself; that is what a
          schema registry, covered in a later module, is for.
        </Para>

        <Para>
          The single most important property of an event, underneath all four of these fields, is
          immutability. Once a record is appended to a partition, it is never edited in place. If a
          customer changes their shipping address, you do not go back and mutate the original
          <code>OrderPlaced</code> record — you produce a new event, <code>OrderAddressUpdated</code>,
          with its own key, value, timestamp, and offset. The original record stays exactly as it was
          written, forever (or until retention removes it). This is what makes the log a trustworthy,
          append-only history rather than a mutable snapshot.
        </Para>

        <Callout title="Design rule" color="#38bdf8">
          A good Kafka event should make sense to a future consumer that does not exist yet, and it should
          never need to be corrected in place. If you find yourself wanting to &quot;go back and fix&quot;
          an event, the right move is almost always to produce a new, corrective event — a tombstone, a
          cancellation, or an updated-state event — not to mutate history.
        </Callout>

        <SubTitle>Event versus command — a distinction worth holding onto</SubTitle>
        <Para>
          A useful test for whether something belongs in Kafka as an event: is it phrased as a fact that
          already happened, or as an instruction telling one specific system what to do? <code>OrderPlaced</code>
          is a fact — it describes what happened and lets billing, warehouse, analytics, and fraud each
          decide independently what it means for them. <code>ChargeCustomerNow</code> is a command — it
          only makes sense to one consumer, the billing service, and coupling a Kafka topic to one
          consumer's specific action defeats the entire purpose of publishing a broadly reusable stream of
          facts. This is the same idea Module 01 introduced at a high level; here it becomes a concrete
          filter you can apply to every event you design.
        </Para>

        <Table
          headers={['Event (a fact)', 'Why it works well', 'Command version (weaker)']}
          rows={[
            ['OrderPlaced', 'Billing, warehouse, analytics, and support can each react differently.', 'ChargeCustomerNow'],
            ['PaymentAuthorized', 'A fact about payment state; does not assume who consumes it.', 'SendReceiptEmail'],
            ['ShipmentDispatched', 'Can drive notifications, dashboards, and delivery estimates alike.', 'UpdateTrackingScreen'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What a topic is" />
        <SectionTitle>A Topic Is a Named Stream — a Category of Events, and a Contract</SectionTitle>

        <Para>
          A topic is the name producers write to and consumers read from — the organizing unit above
          partitions. Topic names look like simple strings, but in a real Kafka platform they function as
          contracts between teams. The topic name communicates ownership, domain, data meaning, and
          sometimes environment or privacy level, long before anyone reads a single record from it.
        </Para>

        <Para>
          Poor topic names create real confusion. A topic named <code>data</code> tells a new consumer
          nothing. A topic named <code>orders</code> is better, but still ambiguous — does it contain order
          commands, raw database row changes, business events, or periodic snapshots? A topic named
          <code>commerce.orders.events</code> is much clearer: the domain is commerce, the entity is
          orders, and the content is discrete events (as opposed to, say, full-row change-data-capture
          records).
        </Para>

        <Table
          headers={['Topic style', 'Example', 'When it helps']}
          rows={[
            ['Domain/entity/type', 'commerce.orders.events', 'Large organizations with many teams and domains sharing one cluster.'],
            ['Source-system/entity', 'postgres.public.orders', 'Change-data-capture topics, where the source database and table matter.'],
            ['Environment prefix', 'prod.commerce.orders.events', 'Shared clusters where dev/test/prod naming must be unambiguous.'],
            ['Version suffix', 'commerce.orders.events.v2', 'Major, backward-incompatible contract changes that need a clean break.'],
          ]}
        />

        <SubTitle>A topic is a category of events — one coherent stream, not a dumping ground</SubTitle>
        <Para>
          There is no universal number of topics an organization should have. Too few topics create mixed
          streams where every consumer must inspect each record just to figure out what kind of event it
          even is — defeating the purpose of a clear contract. Too many topics create operational noise:
          access-control complexity, metadata overhead across the cluster, and unclear ownership. A good
          topic represents one coherent category of events with a clear owner and a stable contract — think
          of it as one well-defined table in a database, not as a folder you drop arbitrary files into.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Topic ownership checklist:</strong> every important topic should have an owner, a
            documented purpose, a schema policy, retention settings, a known list of expected producers and
            consumer groups, access controls, and a runbook for what to do when something goes wrong.
            Without this, a Kafka cluster becomes a dumping ground that nobody trusts.
          </Para>
        </HighlightBox>

        <Para>
          A subtle but important consequence of treating a topic as a contract: renaming a topic is not a
          simple find-and-replace the way renaming a variable is. Every producer and every consumer group
          across every team that touches the topic needs to be updated in coordination, or you end up with
          two parallel, diverging topics — an old one that some consumers still read, and a new one that
          others have already switched to. This is exactly why topic-naming conventions, decided early and
          applied consistently, save real coordination pain later — a topic name is closer to a public API
          endpoint than to an internal implementation detail.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Why topics are split into partitions" />
        <SectionTitle>Partitions Exist for One Reason: Parallelism — at the Cost of a Trade-Off</SectionTitle>

        <Para>
          A partition is one ordered log inside a topic, physically stored (with its replicas) on specific
          brokers. Kafka splits topics into partitions for exactly one fundamental reason: parallelism.
          A single log, on a single machine, can only be written to and read from so fast — bounded by that
          one machine's disk and network. Splitting a topic into multiple partitions lets Kafka spread that
          load across multiple brokers for writes, and across multiple consumers for reads, simultaneously.
        </Para>

        <Para>
          Without partitions, one topic would be limited to whatever throughput a single log on a single
          broker can sustain — typically somewhere in the range of 100 MB/second on solid modern hardware,
          depending on record size and disk. And no matter how many consumer instances you deploy, only one
          of them could ever be actively reading that single log at a time within a consumer group, because
          Kafka assigns each partition to exactly one consumer per group. More partitions is literally what
          buys you both more write throughput and more consumer parallelism — there is no other lever.
        </Para>

        <CodeBox label="partition count directly caps consumer parallelism">
{`orders topic with 1 partition, consumer group "billing":
  billing-consumer-1 -> partition 0   (the only active consumer)
  billing-consumer-2 -> IDLE          (nothing to assign it — sits and waits)
  billing-consumer-3 -> IDLE

orders topic with 6 partitions, same consumer group:
  billing-consumer-1 -> partition 0, partition 1
  billing-consumer-2 -> partition 2, partition 3
  billing-consumer-3 -> partition 4, partition 5
  (all three consumers actively working — roughly 3x the throughput of the single-partition case,
   assuming even load across partitions)`}
        </CodeBox>

        <Para>
          It is worth being precise about the unit of scaling here too: partitions scale a topic's
          throughput across brokers because different partitions of the same topic are typically led by
          different brokers, spreading disk and network load. They scale consumer-side throughput because
          Kafka's consumer group protocol assigns each partition to exactly one consumer instance within a
          group at a time — so N partitions can be actively processed by up to N consumer instances
          simultaneously, each handling a disjoint slice of the topic&apos;s total traffic independently.
        </Para>

        <Para>
          The trade-off partitions introduce is the single most important Kafka rule in this whole module:
          <strong> Kafka guarantees ordering within a partition, not across partitions.</strong> If record
          A and record B are written to the same partition, Kafka preserves their relative order absolutely
          — no exceptions, guaranteed by the sequential nature of an append-only log. If record A is in
          partition 0 and record B is in partition 1, Kafka makes no claim whatsoever about which one a
          consumer will see &quot;first,&quot; even if they were produced a millisecond apart in the real
          world.
        </Para>

        <CodeBox label="the ordering boundary, made concrete">
{`orders topic with 2 partitions

partition 0:
  offset 0 -> OrderPlaced(order_id=100)
  offset 1 -> PaymentAuthorized(order_id=100)

partition 1:
  offset 0 -> OrderPlaced(order_id=101)
  offset 1 -> PaymentAuthorized(order_id=101)

Kafka guarantees: within partition 0, OrderPlaced(100) happened before PaymentAuthorized(100).
Kafka guarantees: within partition 1, OrderPlaced(101) happened before PaymentAuthorized(101).
Kafka does NOT guarantee: that partition 0's PaymentAuthorized happened before or after
  partition 1's OrderPlaced, even though they are both "offset 1" and "offset 0" respectively —
  those offset numbers have no relationship to each other across partitions.`}
        </CodeBox>

        <Table
          headers={['Partition count', 'Benefit', 'Cost']}
          rows={[
            ['1 partition', 'Perfect, simple ordering across the whole topic.', 'Hard throughput and parallelism ceiling — one broker, one active consumer per group.'],
            ['A moderate number (matches expected consumer scale)', 'Balanced parallelism, manageable metadata and rebalance cost.', 'Ordering must now be deliberately designed per key/entity, not assumed globally.'],
            ['Very many partitions', 'High theoretical parallelism ceiling.', 'More open files and memory per broker, slower leader elections, longer rebalances, more operational overhead.'],
          ]}
        />

        <Callout title="Tip" color="#22c55e">
          A widely used starting heuristic: pick a partition count based on your target consumer
          parallelism and expected per-partition throughput, not an arbitrary round number. If you expect
          to eventually run 12 consumer instances at peak, fewer than 12 partitions caps you below that
          target no matter how much you scale out consumers later.
        </Callout>

        <SubTitle>Why not just use one partition and accept the throughput ceiling?</SubTitle>
        <Para>
          For a genuinely low-volume topic, this is a completely reasonable choice, and it is worth stating
          plainly rather than treating multiple partitions as automatically correct. A single partition
          gives you the simplest possible mental model — one ordered log, one consumer processing it at a
          time, no cross-partition ordering questions to reason about at all. The moment throughput or
          consumer-parallelism requirements exceed what one partition and one consumer instance can sustain,
          that simplicity has to give way to the trade-off in the table above. The right question is never
          &quot;how many partitions should every topic have,&quot; it is &quot;what does this specific
          topic's traffic and consumer-scaling requirement actually demand.&quot;
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — How records get assigned to partitions" />
        <SectionTitle>Key Hashing, Round-Robin, and Custom Partitioners</SectionTitle>

        <Para>
          Every record a producer sends must end up in exactly one partition. Kafka decides this using a
          partitioner, and understanding the three ways this decision gets made is essential — it directly
          determines whether related events end up ordered relative to each other or scattered randomly.
        </Para>

        <SubTitle>Key hashing (the default, when a key is present)</SubTitle>
        <Para>
          If a record has a key, Kafka's default partitioner hashes that key and uses the hash to
          deterministically choose a partition. Critically, the same key always hashes to the same
          partition (as long as the partition count doesn't change — more on that in Part 06). This is
          exactly what gives you per-entity ordering: every event with <code>key=order-1024</code> lands in
          the same partition, in the order it was produced, regardless of which producer instance sent it
          or when.
        </Para>

        <SubTitle>Round-robin / sticky partitioning (when no key is present)</SubTitle>
        <Para>
          If a record has no key (a null key), Kafka does not guarantee any particular entity's events stay
          together, because there is no entity identifier to hash. Modern Kafka producers use a
          &quot;sticky&quot; strategy by default — batching a run of keyless records onto the same partition
          for a short window to improve batching efficiency, then moving to the next partition — which
          approximates even distribution across partitions over time without any ordering guarantee between
          individual records.
        </Para>

        <SubTitle>Custom partitioner</SubTitle>
        <Para>
          Producers can supply their own partitioning logic — for example, routing all events for a VIP
          customer tier to a dedicated, less-contended partition, or implementing a specific load-balancing
          scheme that the default hash doesn't provide. This is an escape hatch for advanced cases; most
          production topics use the default key-hash behavior.
        </Para>

        <CodeBox label="key hashing — the mechanism, and why the same key always lands in the same place">
{`# Simplified view of the default partitioner's logic:
partition = hash(record.key) % number_of_partitions

# Example: orders topic, 6 partitions
hash("order-1024") % 6  -> always resolves to the same partition number
                            every single time, for every producer instance,
                            as long as partition count stays at 6

# This is why:
key="order-1024" -> OrderPlaced        -> partition 2 (say)
key="order-1024" -> PaymentAuthorized  -> partition 2 (same key, same partition)
key="order-1024" -> ShipmentPrepared   -> partition 2 (same key, same partition)
# All three land in partition 2, in the order they were produced — ordered relative to each other.

key="order-1025" -> OrderPlaced        -> partition 5 (different key, likely different partition)
# order-1025's events are ordered relative to EACH OTHER, but have no defined
# relationship to order-1024's events, because they live in different partitions.`}
        </CodeBox>

        <Callout title="The key question to ask before choosing a key" color="#22c55e">
          Ask: &quot;what entity needs its own events to stay in order?&quot; If the answer is
          &quot;order,&quot; key by <code>order_id</code>. If the answer is &quot;customer,&quot; key by
          <code>customer_id</code>. The key should match the ordering boundary your consumers actually
          need — not whatever field happens to be convenient in the payload.
        </Callout>

        <Table
          headers={['Use case', 'Possible key', 'Why']}
          rows={[
            ['All events for one order must stay in order', 'order_id', 'OrderPlaced, PaymentAuthorized, Shipped, Cancelled all land in one partition, in order.'],
            ['A risk model needs a customer\'s actions processed in sequence', 'customer_id', 'All of one customer\'s actions can be processed strictly in the order they happened.'],
            ['IoT device telemetry', 'device_id', 'Each device\'s own history stays ordered, while thousands of devices spread across partitions.'],
            ['Global click analytics where exact per-user order doesn\'t matter', 'null or session_id', 'Even load distribution matters more here than strict per-user ordering.'],
          ]}
        />

        <SubTitle>Hot partitions — when key choice goes wrong</SubTitle>
        <Para>
          A hot partition happens when one partition receives dramatically more traffic than its siblings,
          almost always because of a low-cardinality key choice. If you key by <code>country</code> in a
          US-heavy application, the partition that <code>"US"</code> hashes to absorbs a disproportionate
          share of all traffic — and adding more partitions to the topic does not fix this, because
          <code>"US"</code> still always hashes to exactly one of them.
        </Para>

        <CodeBox label="bad key choice vs. better key choice">
{`Bad for a global shopping app:
  key = country
  result: "US" traffic may dominate a single partition, no matter the total partition count

Better when order histories just need to be independently ordered:
  key = order_id
  result: many unique, high-cardinality keys spread evenly across partitions

Better when customer-level history must stay ordered:
  key = customer_id
  result: each customer's own events stay ordered; overall load still spreads well
          as long as no single customer dominates total volume`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Partition count: up only, never down" />
        <SectionTitle>Why Partition Count Can Only Increase, Never Safely Decrease</SectionTitle>

        <Para>
          Kafka lets you increase a topic's partition count at any time, but it does not support decreasing
          it — and understanding why exposes exactly how fragile the key-hashing guarantee from Part 05
          really is under a partition-count change.
        </Para>

        <Para>
          Recall the hashing formula: <code>partition = hash(key) % number_of_partitions</code>. The moment
          the partition count changes, that modulo operation produces different results for the same key.
          A key that used to hash to partition 2 out of 6 might now hash to partition 5 out of 8. Every
          guarantee about &quot;this key's events all land in the same partition&quot; is only valid for a
          fixed partition count — change the count, and new events for an existing key can start landing in
          a different partition than that key's older events.
        </Para>

        <CodeBox label="why adding partitions already breaks per-key ordering guarantees for existing keys">
{`# Before: orders topic, 6 partitions
hash("order-1024") % 6 = 2   -> all of order-1024's events go to partition 2

# Topic is repartitioned to 8 partitions (scaling up for more throughput)
hash("order-1024") % 8 = 5   -> NEW events for order-1024 now go to partition 5

# Result: order-1024's OLD events (OrderPlaced, PaymentAuthorized) sit in partition 2.
#         order-1024's NEW events (ShipmentPrepared, going forward) sit in partition 5.
# A consumer reading partition 2 alone no longer sees this order's full history.
# This is true even when INCREASING partition count — it is a known, accepted cost.`}
        </CodeBox>

        <Para>
          Given that even increasing partition count already disrupts per-key ordering for existing keys,
          decreasing it would be strictly worse and is not supported at all by Kafka's tooling — there is no
          safe, built-in way to merge partitions back down while preserving each partition's internal
          order and the records already written to disk. The only way to effectively &quot;shrink&quot;
          partition count is to create an entirely new topic with the smaller count and migrate producers
          and consumers to it deliberately, accepting the same reordering consequences shown above.
        </Para>

        <Callout title="The practical takeaway" color="#ef4444">
          Because of this asymmetry, partition count should be planned conservatively but generously up
          front — based on your real target throughput and consumer parallelism, not the smallest number
          that satisfies today's traffic. It is much cheaper to start with a partition count that has
          headroom than to grow into a repartitioning event later that disrupts key-based ordering for
          every existing key in the topic.
        </Callout>

        <Para>
          It also helps to name the failure mode this asymmetry guards against directly: teams sometimes
          try to &quot;fix&quot; an over-provisioned topic by shrinking partition count to save on broker
          resource usage, discover Kafka&apos;s tooling refuses to do it, and then consider force-deleting
          and recreating the topic instead. That approach discards the entire event history unless it has
          been carefully exported and replayed back in first — a much larger operation than it initially
          sounds like, and exactly why getting partition count right at design time, per Part 04&apos;s
          throughput/parallelism reasoning, is worth the extra planning up front.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — What a partition looks like physically" />
        <SectionTitle>A Partition on Disk: An Append-Only Log, With Offsets as Position Markers</SectionTitle>

        <Para>
          It helps to ground all of this in what a partition actually is on a broker's filesystem, not just
          as an abstract diagram. A partition is stored as a sequence of files on disk — an append-only log
          file, plus an index file that maps offsets to byte positions so a consumer requesting a specific
          offset doesn't have to scan the entire file from the start.
        </Para>

        <CodeBox label="one partition, on a broker's disk">
{`/data/kafka/orders-2/                    <- partition 2 of the orders topic
    00000000000000000000.log             <- raw bytes of sequentially appended records
    00000000000000000000.index           <- sparse offset -> byte-position lookup index
    00000000000000000000.timeindex       <- timestamp -> offset lookup index

# When a consumer asks to start reading from offset 88112:
# 1. broker binary-searches the .index file for the nearest indexed offset <= 88112
# 2. seeks directly to that byte position in the .log file
# 3. scans forward a short distance to the exact offset requested
# This stays fast even with millions of records in the partition, because it never
# needs to scan the whole file from the beginning.`}
        </CodeBox>

        <Para>
          An offset, in this physical picture, is simply the position number of a record within this one
          append-only file (conceptually — in reality large partitions are split into multiple smaller
          segment files, but the logical numbering is continuous). Offset 0 is the very first record ever
          written to this partition. Offset 1 is the next. They increase monotonically and are never
          reused, even after old records are deleted by retention — offset numbers are never recycled.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Full Kafka address:</strong> topic + partition + offset. Saying &quot;offset
            42&quot; on its own is incomplete and ambiguous — there can be a completely unrelated
            &quot;offset 42&quot; in every other partition of every other topic in the cluster. You must
            always know which topic and which partition an offset belongs to.
          </Para>
        </HighlightBox>

        <Para>
          Consumers use offsets as their entire notion of progress. A consumer group that has processed
          through offset 88112 in partition 2 commits that number back to Kafka. If that consumer restarts,
          it resumes from offset 88113 — the next unread record. This is also exactly how replay works:
          resetting a consumer group's committed offset to an earlier number, or to a specific timestamp
          using the <code>.timeindex</code> file, makes the consumer re-read history from that point
          forward, as long as those records are still within the retention window.
        </Para>

        <Table
          headers={['Offset action', 'Meaning', 'Risk']}
          rows={[
            ['Commit after processing', 'The consumer states this record is fully handled.', 'Safe default, as long as processing is idempotent against reprocessing.'],
            ['Commit before processing', 'The consumer marks work done before it actually is.', 'A crash between commit and completion silently skips real work.'],
            ['Reset offset backward', 'The consumer replays older, already-seen records.', 'Correct for recovery/replay, but may duplicate work downstream unless idempotent.'],
            ['Reset offset forward / skip', 'The consumer deliberately or accidentally skips records.', 'Can intentionally skip known-bad data, or accidentally lose unprocessed work.'],
          ]}
        />

        <Para>
          It is worth being precise about one more subtlety here: offsets are tracked separately per
          consumer group, not per consumer or per topic globally. If billing-consumer-group and
          analytics-consumer-group both read the orders topic's partition 2, Kafka tracks two entirely
          independent committed offsets for that one partition — one per group. This is what makes it
          possible for one group to be fully caught up while another is intentionally replaying from the
          beginning, at the same moment, on the same partition, without either affecting the other's
          progress in any way.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Retention, conceptually" />
        <SectionTitle>How Retention Works — A Working Model, Not the Full Internals</SectionTitle>

        <Para>
          Data in a Kafka topic is not kept forever by default. Every partition's log has a retention
          policy that determines when old records become eligible for deletion — typically time-based (for
          example, delete anything older than 7 days) or size-based (cap the partition at a maximum size on
          disk, whichever fills up first). A later module in this track, on retention and compaction, goes
          into the full internals — how deletion actually happens at the segment-file level and what log
          compaction does differently. Here, you need a correct working model, not the complete mechanics.
        </Para>

        <Para>
          The working model is: retention operates on the whole log, deleting the oldest records first, and
          it happens independently of whether any consumer has actually read those records yet. A consumer
          that falls far enough behind can have data age out of retention before it ever gets read — this
          is not a bug, it is the direct, predictable consequence of a time-or-size-bounded log with
          consumers that were too slow to catch up in time.
        </Para>

        <CodeBox label="retention — the working model">
{`orders partition 2, retention = 7 days

# Records older than 7 days become eligible for deletion, oldest first.
# This happens on a schedule, regardless of consumer read progress.

billing-consumer-group:    committed offset far behind -> at risk if lag exceeds 7 days of data
analytics-consumer-group:  caught up, near the latest offset -> not at risk

# If billing-consumer-group's lag ever exceeds what 7 days of retention holds,
# the oldest lagged records are already gone by the time billing tries to read them —
# not delayed, permanently unavailable to that consumer.`}
        </CodeBox>

        <Callout title="Watch out" color="#ef4444">
          Retention is a capacity and a correctness decision at the same time, not just a disk-cleanup
          setting. Set it based on how far behind a consumer is realistically allowed to fall and still
          recover fully, and based on how much replayable history downstream consumers genuinely need — not
          on an arbitrary default left unexamined.
        </Callout>

        <Para>
          One related concept worth naming here, without going deep into it: some topics are configured for
          log compaction instead of (or alongside) time-based retention — retaining only the latest record
          per key forever, rather than deleting by age. That pattern is used for &quot;current state&quot;
          topics, like a changelog of a customer's current address. The full mechanics of compaction — how
          the log cleaner thread works, tombstones, and segment-level cleanup — belong to the dedicated
          retention-and-compaction module later in this track; the model above is everything you need to
          reason correctly about ordinary, time-based retention today.
        </Para>

        <Table
          headers={['Retention style', 'What it keeps', 'Typical use']}
          rows={[
            ['Time-based', 'Everything younger than the configured age (e.g. 7 days).', 'Event streams where recent history matters most — orders, clicks, telemetry.'],
            ['Size-based', 'Everything until the partition hits a configured disk cap.', 'A backstop alongside time-based retention, to protect disk space under traffic spikes.'],
            ['Compaction (preview only)', 'The latest record per key, indefinitely.', '"Current state" changelogs — covered fully in the dedicated compaction module.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Putting it together: three topic designs" />
        <SectionTitle>Three Real Topic Designs, and the Reasoning Behind Each</SectionTitle>

        <SubTitle>Design 1: Order lifecycle events</SubTitle>
        <CodeBox label="order events">
{`topic: commerce.orders.events
partitions: 12
key: order_id
events:
  OrderPlaced
  PaymentAuthorized
  ShipmentPrepared
  ShipmentDispatched
  OrderCancelled

Why:
  Every order's lifecycle stays fully ordered (Part 04, Part 05 — same key, same partition).
  Different orders process independently in parallel across 12 partitions.
  12 chosen with headroom for a consumer group expected to run up to ~10 instances at peak.`}
        </CodeBox>

        <SubTitle>Design 2: Customer activity stream</SubTitle>
        <CodeBox label="customer activity">
{`topic: growth.customer-activity.events
partitions: 24
key: customer_id
events:
  PageViewed
  ProductClicked
  SearchSubmitted
  CartUpdated

Why:
  Personalization consumers need each customer's own activity in order — keyed by customer_id.
  High cardinality of customer_id (millions of distinct values) spreads load evenly —
  no single customer dominates a partition the way "country" would (Part 05's hot-partition warning).`}
        </CodeBox>

        <SubTitle>Design 3: Raw clickstream</SubTitle>
        <CodeBox label="high-volume clickstream">
{`topic: web.clickstream.raw
partitions: 96
key: null (or session_id, depending on whether session-level ordering is needed)
events:
  Click
  PageView
  Impression

Why:
  Very high volume needs many partitions purely for write and read throughput.
  Exact global ordering across all clicks is not realistic or required for this use case —
  keyless/round-robin distribution (Part 05) maximizes even spread across all 96 partitions.`}
        </CodeBox>

        <SubTitle>Design 4: A low-volume, single-partition "current status" topic</SubTitle>
        <CodeBox label="deliberately one partition">
{`topic: ops.feature-flags.changes
partitions: 1
key: flag_name
events:
  FlagEnabled
  FlagDisabled
  FlagRolloutPercentageChanged

Why:
  Volume is tiny (a handful of changes per day, made by engineers, not by end users).
  A strict, globally ordered history of every flag change matters more than throughput —
  one partition trivially gives perfect ordering with no cross-partition reasoning required.
  This is the case from Part 04 where the throughput ceiling of one partition is irrelevant.`}
        </CodeBox>

        <Para>
          These four designs are not a menu to copy from — they are a demonstration of the same reasoning
          process applied to different requirements: identify what needs to stay ordered relative to what,
          estimate real throughput and consumer parallelism needs, and only then choose a key and a
          partition count. A topic design review that cannot answer &quot;why this key, why this partition
          count&quot; in those terms has not actually been designed yet.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview-ready summary" />
        <SectionTitle>Explain This Like a Kafka Engineer</SectionTitle>

        <Para>
          If someone asks you to explain Kafka topics and partitions, answer like this: a topic is a named
          stream of records — a category of events with a defined contract. A topic is physically split
          into one or more partitions for parallelism. Each partition is an independent, ordered,
          append-only log, stored on disk on a broker (and replicated to others). Records inside a
          partition receive monotonically increasing offsets that are never reused. Kafka guarantees
          ordering within a partition, not across a topic's partitions as a whole. Producers use a record's
          key, hashed against the current partition count, to choose which partition a record lands in —
          which is exactly what gives you per-entity ordering, and exactly why partition count can only
          safely increase, never decrease, without disrupting that guarantee for existing keys. Partitions
          are simultaneously the unit of parallelism and the boundary of ordering — that trade-off is the
          single most important idea in this module.
        </Para>

        <Table
          headers={['If someone says...', 'What to actually verify', 'Relevant Part']}
          rows={[
            ['"Kafka guarantees ordering"', 'Ask: ordering of what, relative to what — within a partition, or across the whole topic?', 'Part 04'],
            ['"We keyed by X"', 'Ask: what is the cardinality of X, and does it match the entity that actually needs ordering?', 'Part 05'],
            ['"We just bumped partitions from 8 to 16"', 'Ask: was the impact on existing keys\' partition mapping accounted for?', 'Part 06'],
            ['"The data should still be there"', 'Ask: what is the topic\'s actual retention setting, and has this consumer\'s lag ever exceeded it?', 'Part 08'],
          ]}
        />

        <SubTitle>Checklist before creating a topic</SubTitle>
        <BulletList
          items={[
            'What business facts belong in this topic, and what should NOT be mixed in?',
            'Who owns this topic, and what is its schema/event contract?',
            'What key preserves the ordering that consumers actually need?',
            'How many partitions are needed for expected throughput AND expected consumer parallelism, with headroom?',
            'How long should records be retained, and can consumers realistically stay within that window?',
            'Which teams or applications are expected to read and write this topic?',
            'What metrics and alerts (consumer lag, partition skew) prove this topic is healthy?',
          ]}
        />

        <Para>
          Carry one idea forward into Module 03: everything in this module described the shape of the data
          — events, topics, partitions, offsets, keys. Module 03 describes the mechanics of how producers
          and consumers actually talk to brokers over the network to read and write that data — metadata
          discovery, leader election, acknowledgement settings, and consumer group rebalancing. The data
          model you now understand is the foundation that machinery operates on.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Events, Topics, and Partitions</SectionTitle>

        {[
          {
            wrong: '"A Kafka topic is basically just one big ordered list of events"',
            right: 'Part 01 is explicit that a topic is a named collection of independent partition logs, not one list. Ordering is only guaranteed within a single partition — treating a topic as one list is the single most common source of ordering confusion described in Part 04.',
          },
          {
            wrong: '"More partitions always means better performance, so just set a large number"',
            right: 'Part 04\'s partition-count table shows the actual trade-off: very high partition counts cost more open files and memory per broker, slower leader elections, and longer consumer group rebalances. Part 06 adds that shrinking a partition count later isn\'t safely supported, so an arbitrarily large number up front is not a free choice either.',
          },
          {
            wrong: '"If I add more partitions to a topic, existing keys keep going to the same partition as before"',
            right: 'Part 06 walks through the actual mechanism: partition = hash(key) % partition_count. Changing partition_count changes the result of that formula for existing keys, so a key\'s new events can land in a different partition than its older events — this is a known, accepted cost of repartitioning, not a bug.',
          },
          {
            wrong: '"Kafka deletes a message once every consumer has read it, like a queue"',
            right: 'Part 08 explains that retention operates on time or size, independent of consumer read progress entirely. Records can be deleted whether or not any consumer has read them, and a consumer that falls behind can lose access to unread data once it ages out of retention.',
          },
          {
            wrong: '"Choosing a partition key is a minor implementation detail I can decide later"',
            right: 'Part 05\'s hot-partition discussion and Part 09\'s three topic designs both show that key choice determines both your ordering guarantees and your load distribution across the cluster. A low-cardinality key choice (like country) can silently overload one partition no matter how many partitions the topic has.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>Why This Module Matters on the Job</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At Uber:</strong> you\'re debugging why a trip-pricing consumer occasionally computes
            surge pricing using a stale driver-location record, even though the location service produces
            updates every few seconds. Investigation turns up the real cause: the driver-location topic uses
            a null key with round-robin partitioning, so a single driver\'s successive location updates
            aren\'t guaranteed to land in the same partition, let alone stay ordered relative to each other
            once consumed by different, unsynchronized consumer instances. Fixing it means re-keying the
            topic by <code>driver_id</code> (Part 05) — a repartitioning change the team plans carefully
            because of exactly the existing-key disruption Part 06 describes.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At DoorDash:</strong> the platform team is asked why the orders topic can\'t simply be
            resized from 20 down to 10 partitions to cut broker resource costs after a slow season. You\'re
            the one who has to explain, citing Part 06, that Kafka does not support safely decreasing
            partition count — the same key-hashing formula that spreads load evenly across 20 partitions
            would scramble the mapping for every existing order_id if applied against 10, breaking ordering
            for records already written. The actual recommendation: right-size partition count carefully
            during initial topic design, since shrinking later is not a supported, low-risk operation.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> you\'re asked to design the event topic backing
            a food-delivery app\'s order tracking screen, and specifically asked &quot;how many partitions,
            and what key?&quot; A weak answer picks an arbitrary number like 6 with no key. The strong
            answer, straight from Part 04, Part 05, and Part 09 of this module, reasons out loud: key by
            <code>order_id</code> so each order\'s full lifecycle (placed, confirmed, picked up, delivered)
            stays strictly ordered in one partition; size the partition count for expected peak consumer
            parallelism with headroom, because growing later disrupts existing key-to-partition mappings;
            and explicitly note that cross-order ordering isn\'t needed, so scattering different orders
            across partitions is not only acceptable but exactly the point.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Explain exactly what determines which partition a Kafka record ends up in.',
            a: `If the record has a key, Kafka's default partitioner hashes the key and computes partition = hash(key) % number_of_partitions, which deterministically sends every record with that same key to the same partition, as covered in Part 05. This is the mechanism behind per-entity ordering — all of order-1024's events land in one partition because they all share the key order_id=1024.

If the record has no key (a null key), modern Kafka producers use a sticky/round-robin strategy that spreads records across partitions roughly evenly over time, batching a short run onto one partition at a time for efficiency, with no ordering relationship guaranteed between individual keyless records.

It's also possible to supply a custom partitioner for specialized routing logic, though most production topics rely on the default key-hash behavior. The critical follow-up point I'd make unprompted: this hashing is only stable as long as the partition count doesn't change — Part 06 covers why changing partition count reshuffles where existing keys land for new records.`,
          },
          {
            q: 'Q2. Why can you increase a Kafka topic\'s partition count but not safely decrease it?',
            a: `The partitioning formula is partition = hash(key) % number_of_partitions, from Part 05. The moment number_of_partitions changes — in either direction — the modulo result changes for existing keys, meaning a key's new records can start landing in a different partition than its historical records. This already happens, as an accepted cost, when you increase partition count.

Decreasing would introduce the same problem while also requiring Kafka to somehow merge multiple existing partition logs' historical records back into fewer logs while preserving each partition's internal append order — there's no safe, built-in mechanism to do that, which is why Kafka's tooling doesn't support shrinking partition count at all, per Part 06. The practical implication I'd highlight: because growing has real costs and shrinking isn't supported, partition count should be planned generously up front based on real target throughput and consumer parallelism, not the minimum that satisfies current traffic.`,
          },
          {
            q: 'Q3. What exactly does Kafka guarantee about ordering, and where does that guarantee end?',
            a: `Kafka guarantees strict ordering within a single partition — if two records are written to the same partition, they will always be delivered to a consumer of that partition in the order they were written. This is a hard guarantee backed by the sequential, append-only nature of the log, per Part 01 and Part 04.

That guarantee does not extend across partitions. Two records in different partitions of the same topic have no defined relationship — a consumer reading multiple partitions has no guarantee about which record it will see first, even if one was produced measurably earlier in real time. This is why key choice matters so much: if an entity's events must stay ordered relative to each other, they must share a key, which routes them to the same partition, as covered in Part 05. If global ordering across a whole topic is a hard requirement, the only fully correct answer is a single partition — accepting the throughput and parallelism ceiling that comes with it.`,
          },
          {
            q: 'Q4. A teammate proposes keying a high-traffic topic by "country" to make partition assignment predictable. What would you push back on?',
            a: `I'd flag the hot-partition risk directly, from Part 05. Kafka's default partitioner hashes the key, so every record with key="US" always lands on the exact same partition — no matter how many partitions the topic has. For most consumer applications, traffic distribution across countries is extremely skewed (a large fraction from one or two countries), which means that one partition absorbs a disproportionate share of total volume while others sit comparatively idle.

Adding more partitions doesn't fix this, because "US" still deterministically hashes to exactly one of them — the fix has to be a different key choice, not a different partition count. I'd ask what ordering guarantee is actually needed: if it's genuinely "keep this country's events in order relative to each other" that's a real requirement worth solving differently (maybe a composite key, or accepting some load imbalance as a deliberate trade-off); if country-level ordering isn't actually required, a higher-cardinality key like order_id or customer_id would spread load far more evenly.`,
          },
          {
            q: 'Q5. How does Kafka\'s retention interact with a consumer that has fallen significantly behind?',
            a: `Retention, per Part 08, operates on the whole partition log based on time or size, completely independent of whether any consumer has actually read a given record. If a topic has 7-day time-based retention, records older than 7 days become eligible for deletion regardless of consumer read progress.

If a consumer's lag — the gap between the latest offset and its committed offset — ever exceeds what the retention window holds, the oldest lagged records are already gone by the time that consumer would have gotten to them. This isn't corruption or a bug; it's the direct, predictable consequence of a bounded log combined with a consumer that fell behind further than the retention window allows for. The practical takeaway I'd give: retention should be sized based on the worst-case realistic consumer lag you want to tolerate and still fully recover from, and consumer lag should be actively monitored against that window, not just monitored against zero.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ──────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Expecting total ordering across a multi-partition topic',
            a: 'Part 01 and Part 04 both exist to correct this — Kafka only orders records within one partition. A consumer reading multiple partitions and processing in arrival order is not seeing a globally ordered stream, even though each individual partition is perfectly ordered.',
          },
          {
            q: 'Choosing a partition key before deciding what entity actually needs ordered history',
            a: 'Part 05\'s key question — "what entity needs its own events to stay in order?" — should come before touching any code. Picking a key that\'s merely convenient in the payload, rather than the one that matches the real ordering requirement, produces a topic that looks fine in testing and breaks ordering assumptions in production.',
          },
          {
            q: 'Using low-cardinality keys (country, status, event_type) for high-volume streams',
            a: 'Part 05\'s hot-partition section is explicit: a low-cardinality key concentrates traffic onto a small number of partitions no matter how many total partitions the topic has. High-cardinality identifiers like order_id or customer_id spread load evenly while still preserving the ordering that actually matters.',
          },
          {
            q: 'Increasing partition count without understanding it changes existing keys\' partition mapping',
            a: 'Part 06 walks through exactly why this happens — the hash-modulo formula produces different results once the partition count changes. Repartitioning should be a deliberate, understood decision, not a quick "just add more partitions" response to a throughput problem.',
          },
          {
            q: 'Assuming an offset is a unique, global message ID',
            a: 'Part 07 is explicit that an offset is only meaningful combined with its topic and partition — offset 42 exists independently, and unrelated, in every partition of every topic in the cluster. Treating a bare offset number as a unique identifier anywhere outside its own (topic, partition) is a category error that shows up in logging and debugging code.',
          },
          {
            q: 'Designing an event as an instruction aimed at one specific consumer, instead of a fact any consumer can interpret',
            a: 'Part 02\'s event-versus-command distinction covers this directly — an event like OrderPlaced lets every current and future consumer decide independently what it means to them, while a command like ChargeCustomerNow only makes sense to the one system it names. This mistake usually surfaces months later, when a second team wants the same data and discovers the topic was designed only around the first consumer\'s specific action.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Symptoms You Will Actually Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `A dashboard built by joining events from a multi-partition topic shows "impossible" sequences — a PaymentAuthorized event appearing to arrive before its corresponding OrderPlaced event`,
            cause: 'The two events, despite belonging to the same order, ended up in different partitions — most likely because the producer sent one of them without the order_id key, or with an inconsistent key format (e.g. a string vs. an int representation of the same ID hashing differently). Per Part 04 and Part 05, records in different partitions have no ordering guarantee relative to each other.',
            fix: 'Audit the producer code to confirm every event for the same logical order uses the exact same key value and type on every produce call. Once both events consistently share a key, the default partitioner routes them to the same partition, and Part 04\'s ordering guarantee applies.',
          },
          {
            error: `Consumer lag graphs show one partition climbing steadily while five sibling partitions in the same topic sit near zero`,
            cause: 'A hot partition — the partition key has low cardinality, or one specific key value dominates volume (Part 05\'s hot-partition scenario). Since a partition can only be actively processed by one consumer instance at a time within a group, that one instance is structurally overloaded while its peers, assigned lighter partitions, are underutilized.',
            fix: 'Adding more consumer instances does nothing here, since parallelism is capped by partition count, not consumer count. Diagnose which key(s) are dominating the hot partition, and consider a higher-cardinality or composite key, or explicit load-splitting logic for the dominant entity, per Part 05.',
          },
          {
            error: `After a partition count increase (6 to 10), a consumer processing per-order state reports "missing" earlier events for orders that were active before the change`,
            cause: 'This is expected behavior following a repartition, not data loss. Per Part 06, hash(key) % partition_count changes when partition_count changes — an order\'s pre-change events remain in their original partition (say partition 2 of 6), while its post-change events now hash into a different partition (say partition 7 of 10). A consumer reading only the "new" partition won\'t see the order\'s earlier history.',
            fix: 'This has to be accounted for architecturally before repartitioning — either by draining and fully reprocessing all partitions after a partition count change, or by avoiding repartitioning on topics with active per-key state and instead creating a new topic with the target partition count when a resize is truly needed.',
          },
          {
            error: `A consumer configured to "start from the beginning" for a backfill job finishes almost instantly and processes far fewer records than the team expected, based on known historical volume`,
            cause: 'Retention has already deleted the older records the backfill was expecting to find — per Part 08, retention runs on a time or size basis independent of whether anything has read the data, so "the beginning" of the topic today may be much more recent than the true beginning of the topic\'s history months ago.',
            fix: 'Check the topic\'s actual retention configuration and the earliest available offset\'s timestamp before assuming a backfill can reach further back than it actually can. If deeper history is a real requirement, that data needs to live in a separate durable store (a data lake, a compacted topic, a database) rather than relying on a time/size-bounded topic to hold it indefinitely.',
          },
          {
            error: `Two teams both reading the same topic, in separate consumer groups, report completely different results for "what offset were we at during the incident" during a postmortem`,
            cause: 'This is expected, not a discrepancy to resolve — per Part 07\'s clarification, offsets are committed independently per consumer group. Two different groups reading the same partition legitimately have two different, unrelated committed offsets at any given moment; neither is "more correct" than the other.',
            fix: 'When writing a postmortem or debugging across teams, always qualify offset numbers with both the partition AND the specific consumer group they belong to — "billing-consumer-group was at offset 4021 on partition 2" is a complete, unambiguous statement; "we were at offset 4021" is not.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red,#ff4757)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'A Kafka event is an immutable record with a key, a value, a timestamp, and optional headers. Its unique address in the cluster is topic + partition + offset — not any single one of those fields alone.',
          'A topic is a named stream, physically split into one or more independent, ordered partition logs. Partitions exist for exactly one reason: parallelism for writes and for consumer reads.',
          'Kafka guarantees ordering within a single partition — never across a topic\'s partitions as a whole. This is the single most important rule in the whole module.',
          'Records are routed to partitions by hashing the key (partition = hash(key) % partition_count) when a key is present, or by round-robin distribution when the key is null. Same key, same partition — as long as partition count stays fixed.',
          'Partition count can be increased but not safely decreased, because changing it changes the hash-modulo result for every existing key — plan partition count generously up front rather than resizing later.',
          'Retention deletes old records by time or size, independent of consumer read progress. A consumer that falls behind further than the retention window permanently loses access to the oldest lagged records — this working model is enough for now; full compaction internals come in a later module.',
        ]}
      />
    </LearnLayout>
  )
}
