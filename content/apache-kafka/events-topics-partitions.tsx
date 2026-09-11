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
      description="The complete foundation of Kafka's data model: what events are, how topics organize them, how partitions scale them, and why ordering is more subtle than beginners expect."
      section="Apache Kafka — Module 02"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Events, Topics, and Partitions', href: '/learn/apache-kafka/events-topics-partitions' },
      ]}
      prev={{ title: 'What is Apache Kafka?', href: '/learn/apache-kafka/what-is-apache-kafka' }}
      next={{ title: 'Producers, Consumers, and Brokers', href: '/learn/apache-kafka/producers-consumers-brokers' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Kafka's data model" />
        <SectionTitle>Kafka Is Built from Events, Topics, Partitions, and Offsets</SectionTitle>

        <Para>
          If Module 01 explained why Kafka exists, this module explains what Kafka is made of. Every Kafka
          system, from a tiny local demo to a multi-region enterprise platform, depends on the same data
          model: events are written to topics, topics are split into partitions, and records inside each
          partition receive offsets. If you understand this model deeply, Kafka becomes predictable. If you
          only memorize the words, Kafka feels random.
        </Para>

        <Para>
          The common beginner mistake is to imagine a topic as one simple list. That picture is useful for
          the first five minutes, but it becomes wrong quickly. A Kafka topic is not necessarily one list.
          A topic is usually split into multiple partitions. Each partition is its own ordered log. Kafka
          guarantees order inside a partition, not across every partition in the topic.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The precise model:</strong> A Kafka topic is a named collection of partition logs.
            A partition is an append-only ordered sequence of records. Each record has an offset that is
            unique only inside that partition. A record's full location is topic + partition + offset.
          </Para>
        </HighlightBox>

        <CodeBox label="The shape of a topic">
{`topic: orders

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
  offset 2 -> OrderPlaced(order_id=103)`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Events" />
        <SectionTitle>An Event Is a Fact, Not an Instruction</SectionTitle>

        <Para>
          An event is a record that says something happened. This sounds simple, but it is one of the most
          important design ideas in event-driven systems. A good event does not tell another service what
          to do. It describes a business fact clearly enough that many services can decide what they need
          to do.
        </Para>

        <Table
          headers={['Better event', 'Why it is better', 'Weaker message']}
          rows={[
            ['OrderPlaced', 'A fact. Billing, warehouse, analytics, and support can each react differently.', 'ChargeCustomerNow'],
            ['PaymentAuthorized', 'A fact about payment state. It does not assume who consumes it.', 'SendReceiptEmail'],
            ['ShipmentDispatched', 'A fact that can drive notifications, dashboards, and delivery estimates.', 'UpdateTrackingScreen'],
            ['UserPasswordChanged', 'A security-relevant fact that audit, email, and risk systems may all need.', 'NotifySecurityTeam'],
          ]}
        />

        <Para>
          This distinction matters because Kafka topics often become shared contracts across teams. If the
          checkout team publishes <strong>OrderPlaced</strong>, the event can support use cases the checkout
          team did not know about yet. If the checkout team publishes <strong>SendEmailNow</strong>, the
          message is coupled to one specific consumer action.
        </Para>

        <SubTitle>What belongs inside an event?</SubTitle>
        <Para>
          A useful Kafka event usually includes identity, time, type, and business payload. Identity helps
          consumers deduplicate. Time helps consumers reason about event-time versus processing-time.
          Type helps consumers route and interpret the event. Payload carries the business facts.
        </Para>

        <CodeBox label="A well-shaped event">
{`{
  "event_id": "a2b1022e-8fb5-43a2-86be-8e07c56f1b10",
  "event_type": "OrderPlaced",
  "event_time": "2026-09-10T18:42:11Z",
  "order_id": "order-1024",
  "customer_id": "customer-88",
  "total_usd": 149.00,
  "currency": "USD",
  "source": "checkout-service"
}`}
        </CodeBox>

        <Callout title="Design rule" color="#38bdf8">
          A good Kafka event should make sense to a future consumer that does not exist yet. If the event
          only makes sense to one current consumer, it is probably too coupled.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Topics" />
        <SectionTitle>A Topic Is a Named Stream, But the Name Is a Contract</SectionTitle>

        <Para>
          A topic is the name producers write to and consumers read from. Topic names look like simple
          strings, but in a real Kafka platform they are contracts. The topic name communicates ownership,
          domain, data meaning, environment, and sometimes privacy level.
        </Para>

        <Para>
          Poor topic names create confusion. A topic named <code>data</code> tells consumers nothing. A
          topic named <code>orders</code> is better, but still ambiguous: does it contain order commands,
          order row changes, order events, or order snapshots? A topic named <code>commerce.orders.events</code>
          is clearer. It says the domain is commerce, the entity is orders, and the content is events.
        </Para>

        <Table
          headers={['Topic style', 'Example', 'When it helps']}
          rows={[
            ['Domain/entity/type', 'commerce.orders.events', 'Large organizations with many teams and domains.'],
            ['Source-system/entity', 'postgres.public.orders', 'CDC topics where the source database/table matters.'],
            ['Environment prefix', 'prod.commerce.orders.events', 'Shared clusters where dev/test/prod naming must be explicit.'],
            ['Version suffix', 'commerce.orders.events.v2', 'Major contract changes when compatibility cannot be preserved.'],
          ]}
        />

        <SubTitle>How many topics should you create?</SubTitle>
        <Para>
          There is no universal number. Too few topics create mixed streams where consumers must inspect
          every record to discover what it means. Too many topics create operational noise, ACL complexity,
          metadata overhead, and ownership confusion. A good topic usually represents a coherent stream
          with a clear owner and a stable contract.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Topic ownership checklist:</strong> Every important topic should have an owner, a
            purpose, a schema policy, retention settings, expected producers, expected consumer groups,
            access controls, and a runbook. Without this, Kafka becomes a dumping ground.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Partitions" />
        <SectionTitle>Partitions Are How Kafka Scales — and Where Ordering Gets Tricky</SectionTitle>

        <Para>
          A partition is one ordered log inside a topic. Kafka uses partitions for parallelism. Multiple
          partitions let multiple brokers store a topic, multiple producers write in parallel, and multiple
          consumers in a group read in parallel. Without partitions, one topic would be limited by one log's
          storage and one consumer's processing.
        </Para>

        <Para>
          But partitions introduce the most important Kafka ordering rule:
          <strong> Kafka guarantees ordering within a partition, not across partitions.</strong> If record A
          and record B are in the same partition, Kafka preserves their order. If record A is in partition 0
          and record B is in partition 1, Kafka does not provide a global order between them.
        </Para>

        <CodeBox label="Ordering boundary">
{`orders topic with 2 partitions

partition 0:
  offset 0 -> OrderPlaced(order_id=100)
  offset 1 -> PaymentAuthorized(order_id=100)

partition 1:
  offset 0 -> OrderPlaced(order_id=101)
  offset 1 -> PaymentAuthorized(order_id=101)

Kafka knows order inside partition 0.
Kafka knows order inside partition 1.
Kafka does not claim that partition 0 offset 1 happened before partition 1 offset 1.`}
        </CodeBox>

        <SubTitle>Why not just use one partition for perfect order?</SubTitle>
        <Para>
          You can, but then you limit parallelism. One partition can be read by only one consumer in a
          consumer group at a time. If your topic has one partition, adding ten consumers to the same group
          does not make processing ten times faster. Nine consumers will sit idle. Kafka's scaling model is
          partition-based.
        </Para>

        <Table
          headers={['Partition count', 'Benefit', 'Cost']}
          rows={[
            ['1 partition', 'Simple ordering for the whole topic.', 'Limited parallelism and throughput ceiling.'],
            ['Several partitions', 'Balanced parallelism and manageable metadata.', 'Ordering must be designed per key/entity.'],
            ['Too many partitions', 'More theoretical parallelism.', 'More files, memory, metadata, rebalances, and operational complexity.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Keys" />
        <SectionTitle>Keys Decide Which Partition Usually Receives a Record</SectionTitle>

        <Para>
          A Kafka record can have a key. The key is usually a business identifier such as order ID,
          customer ID, account ID, device ID, store ID, or transaction ID. Kafka's default partitioner uses
          the key to choose a partition. Records with the same key usually go to the same partition, which
          preserves their order relative to each other.
        </Para>

        <Callout title="The key question" color="#22c55e">
          Ask: "What entity needs ordered history?" If the answer is order, use order_id. If the answer is
          customer, use customer_id. If the answer is bank account, use account_id. The key should match
          the ordering requirement.
        </Callout>

        <Table
          headers={['Use case', 'Possible key', 'Why']}
          rows={[
            ['All events for one order must be in order', 'order_id', 'OrderPlaced, PaymentAuthorized, Shipped, Cancelled stay in one partition.'],
            ['Customer risk model needs ordered customer actions', 'customer_id', 'All actions for a customer can be processed in sequence.'],
            ['IoT device telemetry', 'device_id', 'Each device history is ordered while many devices spread across partitions.'],
            ['Global click analytics where exact user order is not needed', 'null or session_id', 'Load distribution may matter more than strict per-user ordering.'],
          ]}
        />

        <SubTitle>Hot partitions</SubTitle>
        <Para>
          A hot partition happens when one partition gets much more traffic than others. Bad key choice is
          a common cause. If you use <code>country</code> as a key and most traffic is from the United
          States, one partition may receive most records. More partitions will not solve the problem if the
          dominant key still maps to one partition.
        </Para>

        <CodeBox label="Bad key vs better key">
{`Bad for a global shopping app:
  key = country
  result = "US" may dominate one partition

Better when order histories are independent:
  key = order_id
  result = many unique keys spread more evenly

Better when customer history must be ordered:
  key = customer_id
  result = each customer's events stay ordered`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Offsets" />
        <SectionTitle>Offsets Are Position Numbers, Not Global Message IDs</SectionTitle>

        <Para>
          Every record in a partition gets an offset. The first record is offset 0, then 1, then 2, and so
          on. Offsets are simple and powerful, but many beginners misunderstand them. An offset is unique
          only inside one partition. There can be an offset 7 in partition 0 and another offset 7 in
          partition 1. They are different records.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Full Kafka address:</strong> topic + partition + offset. Saying "offset 42" is
            incomplete. You must know which topic and partition offset 42 belongs to.
          </Para>
        </HighlightBox>

        <Para>
          Consumers use offsets to remember progress. If a consumer group has processed through offset 100
          in partition 0, it can commit that position. Later, if the consumer restarts, it can resume from
          the next offset. This is why Kafka can support replay: changing the stored offset changes where
          the consumer starts reading.
        </Para>

        <Table
          headers={['Offset action', 'Meaning', 'Risk']}
          rows={[
            ['Commit after processing', 'The consumer says this work is complete.', 'Safe default when processing is idempotent.'],
            ['Commit before processing', 'The consumer may skip work after a crash.', 'Can cause data loss.'],
            ['Reset offset backward', 'The consumer replays older records.', 'May duplicate work unless processing is idempotent.'],
            ['Reset offset forward', 'The consumer skips records.', 'Can intentionally or accidentally lose work.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Design examples" />
        <SectionTitle>Putting It Together: Three Topic Designs</SectionTitle>

        <SubTitle>Design 1: Order lifecycle events</SubTitle>
        <CodeBox label="Order events">
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
  Every order's lifecycle stays ordered.
  Different orders can process in parallel.`}
        </CodeBox>

        <SubTitle>Design 2: Customer activity stream</SubTitle>
        <CodeBox label="Customer activity">
{`topic: growth.customer-activity.events
partitions: 24
key: customer_id
events:
  PageViewed
  ProductClicked
  SearchSubmitted
  CartUpdated

Why:
  Personalization consumers can process each customer history in order.
  Many customers spread across partitions.`}
        </CodeBox>

        <SubTitle>Design 3: Raw clickstream</SubTitle>
        <CodeBox label="High-volume clickstream">
{`topic: web.clickstream.raw
partitions: 96
key: session_id or null depending on ordering needs
events:
  Click
  PageView
  Impression

Why:
  Very high volume needs many partitions.
  Exact global ordering is not realistic or required.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Mistakes and production reality" />
        <SectionTitle>The Mistakes That Break Kafka Systems</SectionTitle>

        <BulletList
          items={[
            'Expecting total ordering across a multi-partition topic.',
            'Choosing a key before deciding what entity needs ordered history.',
            'Using low-cardinality keys such as country, status, or event_type for high-volume streams.',
            'Creating one giant mixed topic for unrelated business events.',
            'Creating hundreds of tiny topics without ownership or retention policies.',
            'Treating offsets as message IDs instead of partition-local positions.',
            'Increasing partition count without understanding how key mapping and consumer parallelism change.',
          ]}
        />

        <Callout title="Production rule" color="#ef4444">
          Topic design is data modeling. Partition design is scalability modeling. Key design is ordering
          modeling. Offset design is recovery modeling. Treat these as architecture decisions, not CLI
          options.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview-ready summary" />
        <SectionTitle>Explain This Like a Kafka Engineer</SectionTitle>

        <Para>
          If someone asks you to explain Kafka topics and partitions, answer like this: A topic is a named
          stream of records. A topic is split into partitions. Each partition is an ordered append-only log.
          Records inside a partition receive monotonically increasing offsets. Kafka guarantees ordering
          within a partition, not across partitions. Producers use keys to choose partitions, and consumers
          track offsets to remember progress. Partitions are the unit of parallelism and scaling, but they
          also define the boundary of ordering.
        </Para>

        <SubTitle>Checklist before creating a topic</SubTitle>
        <BulletList
          items={[
            'What business facts belong in this topic?',
            'Who owns this topic?',
            'What schema or event contract will producers follow?',
            'What key preserves the ordering that matters?',
            'How many partitions are needed for expected throughput and consumer parallelism?',
            'How long should records be retained?',
            'Which teams or applications may read and write this topic?',
            'What metrics and alerts prove this topic is healthy?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'A Kafka topic is a named stream split into one or more partitions.',
          'A partition is an ordered append-only log; ordering is guaranteed only inside a partition.',
          'Offsets are partition-local positions, not global message IDs.',
          'Keys usually decide partition placement and therefore practical ordering.',
          'Topic, partition, key, and offset design determines scalability, ordering, replay, and recovery behavior.',
        ]}
      />
    </LearnLayout>
  )
}
