import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: FONT_MONO, marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: FONT_DISPLAY, lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800,
    letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px',
    fontFamily: FONT_DISPLAY,
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 26,
  }}>{children}</div>
)

const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{
    background: `${color}0d`, border: `1px solid ${color}33`,
    borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0',
    padding: '18px 22px', margin: '26px 0',
  }}>
    <div style={{
      fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em',
      textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8,
    }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{
      fontSize: 11, fontWeight: 800, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: FONT_MONO,
    }}>{label}</div>
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
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
            <th key={header} style={{
              padding: '11px 16px', textAlign: 'left',
              fontSize: 11, fontWeight: 800, letterSpacing: '.08em',
              textTransform: 'uppercase', color: K, fontFamily: FONT_MONO,
              borderBottom: `2px solid ${K}55`, background: `${K}0d`,
              minWidth: 180,
            }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => (
              <td key={j} style={{
                padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)',
                borderBottom: '1px solid var(--border)', verticalAlign: 'top',
                lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400,
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function WhatIsApacheKafka() {
  return (
    <LearnLayout
      title="What is Apache Kafka?"
      description="A complete beginner-to-advanced explanation of Apache Kafka: events, logs, brokers, topics, partitions, replay, durability, and why Kafka changed modern data systems."
      section="Apache Kafka — Module 01"
      readTime="55 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'What is Apache Kafka?', href: '/learn/apache-kafka/what-is-apache-kafka' },
      ]}
      next={{ title: 'Events, Topics, and Partitions', href: '/learn/apache-kafka/events-topics-partitions' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The problem Kafka solves" />
        <SectionTitle>Kafka Is Not "Just a Queue" — It Is a Durable Event Log</SectionTitle>

        <Para>
          Apache Kafka is a distributed event streaming platform. That phrase sounds intimidating, so
          let us translate it carefully. <strong>Distributed</strong> means Kafka runs across multiple
          servers instead of one machine. <strong>Event</strong> means a recorded fact that already
          happened: an order was placed, a payment succeeded, a package shipped, a driver changed
          location, a user clicked a button. <strong>Streaming</strong> means these facts arrive
          continuously, not as one finished file at the end of the day.
        </Para>

        <Para>
          The simplest definition is this: <strong>Kafka is a system for storing ordered streams of
          events so many applications can read those events independently.</strong> Producers write
          events into Kafka. Kafka stores those events durably. Consumers read the events at their own
          speed. The same event can be read by billing, analytics, notifications, fraud detection, and
          customer support without the producer sending five separate copies.
        </Para>

        <Callout title="Plain-English version" color="#38bdf8">
          Kafka is like a shared company timeline. Whenever something important happens, an app writes
          that fact to the timeline. Other teams do not need to interrupt the original app. They read
          the timeline whenever they need to react, analyze, audit, or rebuild state.
        </Callout>

        <Para>
          This is different from traditional request-response systems. In request-response, one service
          asks another service to do something right now. If the other service is slow or down, the caller
          has a problem. Kafka changes the relationship. A service records what happened. Other services
          react when they can. This separates the act of producing a fact from the act of consuming it.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Core mental model:</strong> Kafka is an append-only log. New records are added to
            the end. Existing records are not updated in place. Consumers remember their position in the
            log and move forward. If needed, they can move their position backward and replay old events,
            as long as Kafka still retains those events.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why companies needed Kafka" />
        <SectionTitle>The Real-World Pain Before Kafka</SectionTitle>

        <Para>
          Imagine an online store before Kafka. The checkout service handles purchases. After every order,
          the checkout service must tell the billing service to charge the card, the warehouse service to
          pick items, the email service to send a receipt, the analytics system to update dashboards, the
          fraud system to inspect risk, and the support system to show the order to agents.
        </Para>

        <Para>
          The naive design is direct communication. Checkout calls billing. Checkout calls warehouse.
          Checkout calls email. Checkout calls analytics. Checkout calls fraud. At first this works.
          Then the system grows. Analytics is down for maintenance. Email is slow. Fraud adds a new API.
          Warehouse needs retries. Support wants historical replay. Suddenly checkout, which should focus
          on placing orders, becomes tangled with every downstream system.
        </Para>

        <Table
          headers={['Problem', 'Without Kafka', 'With Kafka']}
          rows={[
            ['Slow consumer', 'The producer may block, timeout, or add complex retry logic.', 'The producer writes once; the slow consumer catches up from Kafka.'],
            ['New consumer', 'Producer code often changes to send data to another destination.', 'The new consumer reads the existing topic independently.'],
            ['Consumer outage', 'Events may be lost unless the producer stores them somewhere else.', 'Events stay in Kafka until retention removes them.'],
            ['Analytics replay', 'You need backups, database dumps, or custom export jobs.', 'Reset consumer offsets and replay retained events.'],
            ['Many teams need same data', 'Point-to-point integrations multiply quickly.', 'One topic can feed many consumer groups.'],
          ]}
        />

        <Para>
          Kafka solves this by becoming the shared event backbone. Checkout publishes <strong>OrderPlaced</strong>.
          Billing, warehouse, email, analytics, fraud, and support each consume <strong>OrderPlaced</strong>
          in their own way. Checkout does not need to know who reads the event. Consumers do not need
          checkout to resend history. Kafka holds the log between them.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The five Kafka words you must own" />
        <SectionTitle>Events, Topics, Producers, Consumers, and Brokers</SectionTitle>

        <SubTitle>Event</SubTitle>
        <Para>
          An event is a fact. It should usually be named in the past tense because it records something
          that already happened. <strong>OrderPlaced</strong> is an event. <strong>PaymentAuthorized</strong>
          is an event. <strong>SendWelcomeEmail</strong> is not really an event; it is a command telling
          another system what to do.
        </Para>

        <SubTitle>Topic</SubTitle>
        <Para>
          A topic is a named stream of related events. You might have topics named <code>orders</code>,
          <code>payments</code>, <code>shipments</code>, and <code>user-clicks</code>. Producers write
          records to a topic. Consumers read records from a topic.
        </Para>

        <SubTitle>Producer</SubTitle>
        <Para>
          A producer is an application that writes records to Kafka. It might be a checkout service,
          mobile app backend, IoT gateway, database connector, or log collector. Producers choose a topic,
          optionally choose a key, serialize the event into bytes, and send it to Kafka.
        </Para>

        <SubTitle>Consumer</SubTitle>
        <Para>
          A consumer is an application that reads records from Kafka. It might update a database, send an
          email, train a dashboard, detect fraud, or write files into a data lake. Consumers control their
          own pace. Kafka does not force them to read instantly.
        </Para>

        <SubTitle>Broker</SubTitle>
        <Para>
          A broker is a Kafka server. A Kafka cluster is a group of brokers. Brokers store topic data on
          disk, receive writes from producers, serve reads to consumers, replicate partitions, and coordinate
          cluster metadata.
        </Para>

        <CodeBox label="One simple Kafka story">
{`checkout-service produces:
  topic: orders
  key: order-1024
  value: {"event_type":"OrderPlaced","order_id":"1024","total_usd":149.00}

kafka stores:
  orders partition 2, offset 88112

independent consumers read:
  billing-consumer-group
  warehouse-consumer-group
  analytics-consumer-group
  support-dashboard-consumer-group`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Kafka's central idea" />
        <SectionTitle>The Log: The Idea That Makes Kafka Different</SectionTitle>

        <Para>
          The most important idea in Kafka is the log. A log is an ordered sequence of records. New records
          are appended to the end. Each record gets a position number called an offset. Consumers track
          which offset they have read. This sounds simple, but it changes everything.
        </Para>

        <Para>
          In many traditional queues, reading a message removes it. That is useful for work distribution,
          but it is not ideal when many teams need the same event history. Kafka does not delete an event
          just because one consumer read it. Kafka keeps records according to retention settings. That
          allows many consumers to read the same topic independently, and it allows replay.
        </Para>

        <CodeBox label="Append-only log mental model">
{`orders partition 0

offset 0  -> OrderPlaced(order_id=100)
offset 1  -> PaymentAuthorized(order_id=100)
offset 2  -> OrderPlaced(order_id=101)
offset 3  -> ShipmentPrepared(order_id=100)
offset 4  -> OrderCancelled(order_id=101)

A consumer does not remove records.
It remembers: "I have processed through offset 4."`}
        </CodeBox>

        <Callout title="Why replay matters" color="#22c55e">
          If analytics deploys a bug at 9 AM and produces wrong dashboard results until 10 AM, the team can
          fix the code and replay the retained Kafka events from 9 AM. Without a replayable log, they may
          need a painful database restore, manual repair script, or accept bad historical data.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Kafka is not magic" />
        <SectionTitle>What Kafka Does — and What Kafka Does Not Do</SectionTitle>

        <Table
          headers={['Kafka does', 'Kafka does not automatically do']}
          rows={[
            ['Store event streams durably', 'Decide what your business events should mean'],
            ['Let many consumer groups read the same topic', 'Guarantee every external database write happens exactly once'],
            ['Scale reads and writes with partitions', 'Preserve total ordering across all partitions'],
            ['Replicate data across brokers', 'Remove the need for backups, monitoring, security, and runbooks'],
            ['Allow replay while data is retained', 'Keep data forever unless retention is configured that way'],
            ['Provide strong client and broker configuration options', 'Choose the right settings for your business risk automatically'],
          ]}
        />

        <Para>
          This distinction matters because Kafka is often marketed as if it solves every real-time problem
          by itself. It does not. Kafka is a powerful storage and transport layer for event streams. Your
          applications still need schema design, idempotency, error handling, monitoring, security, capacity
          planning, and ownership.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Senior engineer rule:</strong> Do not ask "Should we use Kafka?" first. Ask:
            What facts are being produced? Who needs them? How quickly? In what order? How long must they
            be retained? How much duplication can consumers tolerate? What happens when a consumer is down?
            Kafka is a good answer only when those requirements match Kafka's strengths.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Kafka versus similar tools" />
        <SectionTitle>Kafka vs Queue vs Database vs Pub/Sub</SectionTitle>

        <Para>
          Beginners often ask whether Kafka is a queue, a database, or a pub/sub system. The honest answer
          is that Kafka overlaps with all three, but it is not identical to any one of them.
        </Para>

        <Table
          headers={['Tool type', 'Best mental model', 'Where Kafka differs']}
          rows={[
            ['Traditional queue', 'A work line where each message is handled by one worker.', 'Kafka can act queue-like inside one consumer group, but records remain available for other groups and replay until retention removes them.'],
            ['Database', 'Current state that can be queried and updated.', 'Kafka stores ordered event history, not arbitrary indexed relational queries. You usually build queryable views from Kafka into databases or search systems.'],
            ['Pub/sub system', 'Publish once, deliver to subscribers.', 'Kafka adds durable log storage, offsets, replay, partitions, and retention as first-class concepts.'],
            ['File batch pipeline', 'Move a completed file from one system to another.', 'Kafka handles continuous unbounded streams instead of only bounded files.'],
          ]}
        />

        <Para>
          A useful shortcut is this: use a database when you need to ask "what is the current state?"
          Use Kafka when you need to record "what happened?" and let many systems react to that history.
          Real architectures often use both. Kafka carries events. Databases store queryable views built
          from those events.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — From beginner to architecture" />
        <SectionTitle>A Complete Kafka Flow, End to End</SectionTitle>

        <Para>
          Let us walk through a real order pipeline slowly. A customer clicks "Place Order." The checkout
          service validates the cart and writes to its own database. Then it produces an event to Kafka:
          <strong>OrderPlaced</strong>. That event has a key, usually the order ID or customer ID, and a
          value containing the business facts consumers need.
        </Para>

        <BulletList
          items={[
            'The producer asks Kafka for metadata so it knows which broker leads the target partition.',
            'The producer serializes the event, often as Avro, Protobuf, or JSON.',
            'Kafka appends the record to the selected partition log.',
            'Kafka replicates the record to follower brokers according to the topic replication factor.',
            'The producer receives an acknowledgement based on its acks setting.',
            'Consumers in different consumer groups fetch the event independently.',
            'Each consumer processes the event and commits its offset when it is safe.',
            'Monitoring tracks lag, broker health, producer errors, and consumer failures.',
          ]}
        />

        <CodeBox label="End-to-end event contract example">
{`event_type: OrderPlaced
event_id: 5caa4c66-7f2c-4f7e-9c75-0804a7a7f6d2
event_time: 2026-09-10T18:42:11Z
order_id: order-1024
customer_id: customer-88
total_usd: 149.00
currency: USD
items:
  - sku: keyboard-pro
    quantity: 1
  - sku: mouse-wireless
    quantity: 1`}
        </CodeBox>

        <Para>
          Notice what is not in the event: "send an email", "charge this card", or "update dashboard row 4".
          Those are downstream actions. The Kafka event should be the fact. Consumers decide what to do
          with that fact.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Failure thinking" />
        <SectionTitle>Kafka Makes Failure Manageable, Not Impossible</SectionTitle>

        <Para>
          Kafka exists because failure is normal in distributed systems. Networks fail. Brokers restart.
          Consumers deploy bad code. Downstream databases become slow. Producers retry after timeouts.
          Teams add new event fields. Old consumers still run. Kafka gives you tools to handle these
          realities, but you must still design the behavior.
        </Para>

        <Table
          headers={['Failure', 'Bad design', 'Kafka-aware design']}
          rows={[
            ['Consumer crashes after processing', 'Offset was already committed, so the work may be lost.', 'Commit offsets only after processing is safely complete.'],
            ['Producer timeout', 'Retry blindly and maybe create duplicates downstream.', 'Use idempotent producers and consumer-side idempotency keys.'],
            ['Bad event payload', 'Consumer crashes forever on the same poison record.', 'Validate, retry when appropriate, and route permanent failures to a dead-letter topic.'],
            ['Analytics needs rebuild', 'No event history is available.', 'Set retention based on replay requirements, not only disk cost.'],
            ['Schema changes', 'Old consumers break without warning.', 'Use schema compatibility checks and versioned contracts.'],
          ]}
        />

        <Callout title="The mindset shift" color="#ef4444">
          Kafka is not about pretending failure will not happen. Kafka is about recording enough durable,
          ordered history that systems can recover, retry, replay, and continue without every service being
          tightly coupled to every other service.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — When Kafka is a good fit" />
        <SectionTitle>When You Should Use Kafka — and When You Should Not</SectionTitle>

        <SubTitle>Kafka is usually a strong fit when:</SubTitle>
        <BulletList
          items={[
            'Multiple systems need the same events independently.',
            'You need replayable history, not only one-time message delivery.',
            'Event volume is high enough that durable streaming infrastructure matters.',
            'Consumers may be offline or slower than producers.',
            'You are building real-time pipelines, CDC flows, event-driven services, or streaming analytics.',
            'Ordering matters per business entity, such as per order, account, customer, or device.',
          ]}
        />

        <SubTitle>Kafka may be the wrong tool when:</SubTitle>
        <BulletList
          items={[
            'You only need a simple background job queue for one small app.',
            'You need complex ad hoc querying directly over the data.',
            'Your team cannot operate or pay for the complexity yet.',
            'The data is tiny, infrequent, and does not need replay.',
            'A normal database transaction or direct API call would be simpler and more reliable.',
          ]}
        />

        <Para>
          The goal is not to use Kafka everywhere. The goal is to recognize when a durable event log is the
          cleanest center of gravity for a system. Kafka is excellent when many services need a shared stream
          of facts. It is unnecessary when the problem is a simple synchronous request or a tiny background
          task.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — What you should remember" />
        <SectionTitle>The Whole Picture in One Page</SectionTitle>

        <HighlightBox>
          <Para>
            Apache Kafka is a distributed, durable, replayable event log. Applications write facts to Kafka.
            Kafka stores those facts in topics split into partitions. Brokers store and replicate the data.
            Consumers read at their own pace and track offsets. Consumer groups let readers scale horizontally.
            Retention controls how long history remains. Keys influence partition placement and ordering.
            Schemas define event contracts. Monitoring, security, and capacity planning turn Kafka from a
            demo into production infrastructure.
          </Para>
        </HighlightBox>

        <SubTitle>Interview-level explanation</SubTitle>
        <Para>
          If someone asks "What is Kafka?" in an interview, answer like this: Kafka is a distributed event
          streaming platform built around an append-only log. Producers write records to topics. Topics are
          split into partitions for scalability and ordering within each partition. Brokers store and
          replicate partitions. Consumers read records using offsets, and consumer groups allow parallel
          processing. Kafka is used when systems need durable, replayable, high-throughput event streams
          that many independent applications can consume.
        </Para>

        <SubTitle>Non-technical explanation</SubTitle>
        <Para>
          If you need to explain Kafka to a non-technical person, say this: Kafka is a reliable timeline for
          business events. When something important happens, such as an order being placed, Kafka records it.
          Other teams can read that record whenever they need it. This keeps systems from constantly calling
          each other directly and makes it easier to recover if one system is slow or temporarily unavailable.
        </Para>
      </section>

      <KeyTakeaways
        items={[
          'Kafka is a durable event streaming platform, not merely a queue.',
          'The central Kafka idea is an append-only log that consumers can replay while data is retained.',
          'Producers write events, brokers store them, and consumers read them independently.',
          'Topics organize events; partitions provide scale and ordering boundaries.',
          'Kafka helps decouple systems, but production safety still requires schemas, idempotency, monitoring, security, and capacity planning.',
        ]}
      />
    </LearnLayout>
  )
}
