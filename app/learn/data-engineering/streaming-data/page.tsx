// app/learn/data-engineering/streaming-data/page.tsx

import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Streaming Data — What It Is and How It Works | Chaduvuko',
  description:
    'Event-driven architecture, producers, consumers, offsets, partitions, consumer groups, delivery semantics, time, and ordering — the complete conceptual foundation before you touch Kafka or Flink.',
}

/* ── Local components (Module 37 style) ─────────────────────────────────── */

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

type ColHeader = { label: string; color?: string }
const Table = ({ headers, rows }: { headers: (string | ColHeader)[]; rows: Record<string, string>[] }) => {
  const hdrs: ColHeader[] = headers.map(h => typeof h === 'string' ? { label: h } : h)
  const keys = hdrs.map((_, i) => String(i))
  return (
    <div style={{ overflowX: 'auto', marginBottom: 28 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            {hdrs.map((h, i) => (
              <th key={i} style={{
                padding: '10px 16px', textAlign: 'left',
                fontSize: 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em',
                textTransform: 'uppercase', color: h.color ?? 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
                background: h.color ? `${h.color}08` : 'var(--bg2)',
                minWidth: i === 0 ? 150 : 160,
              }}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
              {hdrs.map((h, ki) => (
                <td key={ki} style={{
                  padding: '10px 16px',
                  color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                  fontSize: ki === 0 ? 11 : 13.5,
                  fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                  fontWeight: ki === 0 ? 700 : 400,
                  textTransform: ki === 0 ? 'uppercase' : 'none',
                  letterSpacing: ki === 0 ? '.06em' : 'normal',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: ki > 0 && h.color ? `2px solid ${h.color}40` : ki > 0 ? '1px solid var(--border)' : 'none',
                  verticalAlign: 'top', lineHeight: 1.65,
                }}>{row[String(ki)]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function StreamingDataModule() {
  return (
    <LearnLayout
      title="Streaming Data — What It Is and How It Works"
      description="Event-driven architecture, producers, consumers, offsets, partitions, consumer groups, delivery semantics, time, and ordering — the complete conceptual foundation before you touch Kafka or Flink."
      section="Data Engineering · Phase 6"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Real Distinction ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Real Distinction" />
        <SectionTitle>Streaming Is Not Just Fast Batch</SectionTitle>

        <Para>
          The most common misconception in data engineering is that streaming is
          simply batch processing done more frequently — "instead of running every
          hour, we run every second." This is wrong in a way that matters deeply
          when you build real systems. Streaming and batch are fundamentally
          different models with different assumptions about data, time, and failure.
        </Para>

        <Para>
          In batch processing, data has a boundary. There is a start and an end to
          the dataset. You read it, process it, write results, and you are done.
          The dataset is finite. In streaming, the dataset is infinite. There is no
          end. Events keep arriving as long as the system is alive. You process an
          unbounded sequence of events, and your system must produce results
          continuously — not after all the data has arrived, because it never all
          arrives.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Precise definition:</strong> A stream is an ordered, replayable,
            append-only log of events. New events are always appended to the end.
            Nothing is modified or deleted in place. The log can be replayed from
            any point in history. This definition has three consequences that
            affect every design decision you will ever make in streaming systems.
          </Para>
          <Para>
            <strong>Ordered</strong> — within a single partition, events have a
            guaranteed sequence. Event 42 always comes after event 41 for the same
            key. Across partitions, there is no ordering guarantee.
          </Para>
          <Para>
            <strong>Replayable</strong> — consumers can go back to event 1 and
            replay the entire history. This is what makes streaming fundamentally
            different from a queue that discards messages after delivery.
          </Para>
          <Para>
            <strong>Append-only</strong> — a streaming log is immutable. Swiggy's
            order placed event from 3 months ago cannot be modified. You can
            produce a new event saying the order was cancelled, but the original
            event stays exactly as it was.
          </Para>
        </HighlightBox>

        <Table
          headers={['', 'Batch', 'Streaming']}
          rows={[
            { '0': 'Data shape', '1': 'Bounded — has a start and end', '2': 'Unbounded — never ends' },
            { '0': 'When results appear', '1': 'After the full dataset is processed', '2': 'Continuously, as events arrive' },
            { '0': 'Latency', '1': 'Minutes to hours', '2': 'Milliseconds to seconds' },
            { '0': 'State', '1': 'Stateless by default — each run is independent', '2': 'Stateful — must track what happened before' },
            { '0': 'Failure recovery', '1': 'Re-run the entire job from the last checkpoint', '2': 'Resume from the last committed offset' },
            { '0': 'Data model', '1': 'Tables — rows and columns, point-in-time snapshot', '2': 'Events — facts that something happened, immutable' },
            { '0': 'Indian company example', '1': 'Zomato generating daily revenue reports at 2 AM', '2': 'Swiggy tracking live delivery location every 3 seconds' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 02 — What an Event Actually Is ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Events" />
        <SectionTitle>What an Event Actually Is — Anatomy, Immutability, and Design</SectionTitle>

        <Para>
          The word "event" is overloaded in software. In streaming, an event has a
          precise meaning: an immutable record of something that happened, at a
          specific point in time, in the real world. Not something that might happen.
          Not a request for something to happen. Something that already happened and
          cannot be undone.
        </Para>

        <Para>
          Razorpay processes a payment. That payment happened. The event record of
          it cannot be changed — you can't go back and say "actually, the amount
          was ₹500 not ₹499." If there was an error, a new corrective event is
          produced. The original event stays.
        </Para>

        <SubTitle>The anatomy of a well-designed event</SubTitle>

        <CodeBox label="event structure — every field has a reason">
{`{
  // Identity — what is this event, uniquely, forever
  "event_id":   "evt_01HV8K3MNPQR5STUVWXYZ",   // UUID or ULID — globally unique
  "event_type": "order.placed",                   // namespaced: domain.action
  "version":    "2.1",                            // schema version — critical for evolution

  // Time — when did this happen (more on time in Part 06)
  "event_time": "2026-03-20T14:23:11.847Z",       // when the thing happened in the real world
  "produced_at": "2026-03-20T14:23:11.902Z",      // when this event was written to the broker

  // Source — who produced this
  "producer":   "order-service",
  "producer_version": "3.4.1",
  "environment": "production",

  // Routing — how the broker partitions this event
  "partition_key": "customer_C98765",             // same customer's events → same partition

  // Payload — what actually happened
  "data": {
    "order_id":    "ORD-2026-887432",
    "customer_id": "C98765",
    "store_id":    "ST007",
    "items": [
      { "product_id": "P1123", "qty": 2, "price_paise": 34900 },
      { "product_id": "P0034", "qty": 1, "price_paise": 12500 }
    ],
    "total_paise":    82300,
    "payment_method": "upi",
    "delivery_address": {
      "city": "Hyderabad",
      "pincode": "500032"
    }
  },

  // Correlation — for tracing a request across multiple services
  "correlation_id": "req_3GH7K9M",
  "causation_id":   "evt_01HV8K3MNPQR5PREV"      // which event caused this one
}`}
        </CodeBox>

        <Para>
          Every field above has a specific job. <code>event_id</code> makes the
          event deduplicate-able — if the same event is delivered twice (which will
          happen), consumers can detect and discard the duplicate. <code>version</code>
          allows the schema to evolve without breaking existing consumers.
          <code>partition_key</code> is the routing instruction to the broker.
          <code>correlation_id</code> and <code>causation_id</code> are how you trace
          a customer journey across 12 microservices in a distributed system.
        </Para>

        <Callout type="tip">
          The <code>event_type</code> naming convention matters. Use
          <code>domain.noun.past_tense_verb</code> — for example,
          <code>payment.transaction.completed</code>,
          <code>inventory.item.restocked</code>,
          <code>user.account.suspended</code>. Noun first, verb last, past tense.
          Events record what happened, not instructions for what should happen next.
          <code>sendWelcomeEmail</code> is a command. <code>user.registered</code>
          is an event.
        </Callout>

        <SubTitle>Why immutability is the most important property</SubTitle>

        <Para>
          In a relational database, when a customer changes their address, you
          UPDATE the row. The old address is gone. The log is the truth, and the
          truth changed. In a streaming log, when a customer changes their address,
          you APPEND a new event — <code>customer.address.changed</code> — with the
          new address. The old event recording the previous address still exists.
        </Para>

        <Para>
          This seems like a small design choice. It has enormous consequences.
          Because the log is immutable, you can always replay history exactly as it
          happened. You can build a new analytics system today, point it at events
          from 2 years ago, and reconstruct the state of the world at any point in
          time. You can audit exactly what happened and when. You can run a machine
          learning model on historical event sequences. None of this is possible
          if data was mutated in place.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — Request-Driven vs Event-Driven ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Architecture" />
        <SectionTitle>Request-Driven vs Event-Driven — The Fundamental Split</SectionTitle>

        <Para>
          Before you understand producers and consumers, you need to understand
          the two fundamentally different ways systems can communicate. This is
          the most important concept in this module.
        </Para>

        <SubTitle>Request-driven (synchronous)</SubTitle>

        <Para>
          Service A needs something from Service B. A sends a request to B. A
          waits. B processes the request. B sends a response. A continues.
          This is how HTTP/REST APIs work. It is how your pipeline makes a
          database query. It is how most software you have written works.
        </Para>

        <Para>
          The critical property: <strong>A is blocked until B responds.</strong>
          A is also tightly coupled to B — A needs to know B's address, B's
          API contract, and B needs to be running right now. If B is down,
          A's request fails. If B is slow, A is slow.
        </Para>

        <SubTitle>Event-driven (asynchronous)</SubTitle>

        <Para>
          Service A produces an event — "an order was placed" — and writes it
          to the event log. A does not care who reads it. A does not wait for
          anyone to read it. A is done. Separately, Service B reads from the
          event log, processes events, and does its work. Service C also reads
          from the event log and does something completely different with the
          same events.
        </Para>

        <Para>
          The critical property: <strong>A and B are completely decoupled in
          time.</strong> B can be down for 6 hours — events accumulate in the
          log, and when B comes back up, it processes everything it missed.
          B never knew A was the source. A never knew B existed. New services
          can start consuming from the same event log with zero changes to the
          producer.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Real example — Swiggy order placed:</strong> When a customer
            places an order, the order service produces one event:
            <code>order.placed</code>. From that single event, independently
            and simultaneously: the notification service sends a push notification,
            the restaurant service alerts the restaurant, the delivery service
            assigns a rider, the inventory service deducts stock, the analytics
            service updates real-time dashboards, the fraud service checks for
            suspicious patterns, and the loyalty service credits points. None
            of these services called the order service. The order service called
            none of them. They all just read from the same log.
          </Para>
        </HighlightBox>

        <Table
          headers={['', 'Request-driven', 'Event-driven']}
          rows={[
            { '0': 'Coupling', '1': 'Tight — caller must know callee', '2': 'Loose — producer knows nothing about consumers' },
            { '0': 'Timing', '1': 'Synchronous — caller blocks waiting for response', '2': 'Asynchronous — producer continues immediately' },
            { '0': 'Failure impact', '1': 'If B is down, A\'s request fails immediately', '2': 'If B is down, events queue up and B processes on recovery' },
            { '0': 'Fan-out', '1': 'A must explicitly call every service that needs the data', '2': 'Any service can subscribe to the same event with zero changes to producer' },
            { '0': 'Audit trail', '1': 'No inherent history — you must build logging separately', '2': 'The event log is the audit trail — replay to reconstruct any state' },
            { '0': 'Use when', '1': 'You need a real-time response — "does this user exist?", "what is the current balance?"', '2': 'You need to notify multiple systems, process work asynchronously, or build a reliable audit trail' },
          ]}
        />

        <Callout type="info">
          Neither model is always correct. Real systems use both. Swiggy's payment
          service makes a synchronous API call to verify UPI — it needs to know
          immediately whether payment succeeded before confirming the order.
          But once payment succeeds, it produces an event, and everything
          downstream is asynchronous. The boundary between synchronous and
          asynchronous is a design decision you make consciously, not an
          accident of implementation.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Topics, Partitions, Producers, Consumers ───────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Core Mechanics" />
        <SectionTitle>Topics, Partitions, Producers, and Consumers</SectionTitle>

        <Para>
          These four concepts are the physical and logical structure of any
          streaming system. They exist in Kafka, AWS Kinesis, Azure Event Hubs,
          Google Pub/Sub, and Apache Pulsar. The terminology varies slightly
          but the concepts are identical.
        </Para>

        <SubTitle>Topics</SubTitle>

        <Para>
          A topic is a named category of events. <code>orders</code> is a topic.
          <code>payments</code> is a topic. <code>inventory_updates</code> is a
          topic. Think of a topic the way you think of a database table — it is a
          logical grouping of related records. Unlike a database table, a topic
          is append-only and ordered. You don't UPDATE or DELETE records in a topic.
          You only write new events and read existing ones.
        </Para>

        <Para>
          Topic naming matters in production. The standard convention is
          <code>domain.entity.action</code> or simply <code>domain-entity</code>
          for general topics — for example: <code>freshmart.orders</code>,
          <code>freshmart.payments</code>, <code>freshmart.inventory</code>.
          Bad topic names like <code>data</code>, <code>events</code>, or
          <code>test123</code> create operational nightmares when you have
          400 topics and can't find anything.
        </Para>

        <SubTitle>Partitions — why they exist and what they cost you</SubTitle>

        <Para>
          A topic is divided into partitions. A partition is the physical unit
          of storage and parallelism. This is where the complexity lives.
        </Para>

        <Para>
          Why do partitions exist? Because a single machine can only process data
          so fast. If a topic with 1 million events per second lived on a single
          machine, that machine would be the bottleneck. Partitions allow the topic
          to be spread across many machines. Each partition is an independent,
          ordered log living on a specific broker. The topic with 32 partitions
          spread across 8 brokers means each broker handles 4 partitions, and
          32 consumer threads can read from the topic simultaneously.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The critical trade-off:</strong> Ordering is only guaranteed
            within a single partition. Across partitions, there is no ordering
            guarantee whatsoever. If you need all events for customer C98765 to
            arrive in order — which you almost certainly do — then all of C98765's
            events must go to the same partition every time. This is what the
            partition key controls. Hash(partition_key) mod number_of_partitions
            determines which partition an event lands in. Same key, same partition,
            always.
          </Para>
        </HighlightBox>

        <Para>
          The consequence: if your partition key is <code>customer_id</code>, then
          one partition gets all events for customers whose hashed ID maps to that
          partition. If 10% of your traffic comes from one customer (unlikely but
          instructive), 10% of your load goes to one partition — a hot partition.
          Hot partitions are a common production problem that stems from poor
          partition key design.
        </Para>

        <CodeBox label="partition key — choosing the right field">
{`# Good partition key: customer_id
# → All events for one customer arrive in order
# → Even distribution if customer IDs are random
# → Stateful processing per customer is easy — all data for one customer is in one partition

# Good partition key: store_id (for FreshMart)
# → All events from one store arrive in order
# → 10 stores = reasonably even distribution across partitions
# → Aggregations per store can be done locally without shuffling

# Bad partition key: city
# → Hyderabad has 10x the traffic of Tier 2 cities
# → Severe hot partition on the Hyderabad partition
# → No fix without repartitioning

# Bad partition key: event_type
# → 'order.placed' is 100x more frequent than 'order.cancelled'
# → order.placed partition is always hot

# No partition key (round-robin):
# → Perfect even distribution
# → Completely destroys ordering — use only for events with no ordering requirement
#    (example: server metrics, logs where per-server ordering doesn't matter)`}
        </CodeBox>

        <SubTitle>Producers — the contract with the broker</SubTitle>

        <Para>
          A producer is any application that writes events to a topic. An
          order service is a producer. A CDC connector reading your PostgreSQL
          transaction log is a producer. A sensor sending temperature readings
          is a producer. The producer's job is to construct a well-formed event
          and deliver it to the correct topic. That sounds simple. The complexity
          is in the delivery guarantee.
        </Para>

        <Para>
          When a producer sends an event to a broker, three things can happen:
          the broker receives it and acknowledges, the broker receives it but
          acknowledgement is lost in the network, or the broker never receives it.
          In cases 2 and 3, the producer retries. If the broker received the event
          but the acknowledgement was lost, a retry causes a duplicate. This is the
          fundamental source of the "at-least-once delivery" problem. The producer
          configuration that controls this is the <code>acks</code> setting —
          it determines how many brokers must confirm receipt before the producer
          considers the write successful.
        </Para>

        <Table
          headers={[
            'acks setting',
            { label: 'Behaviour', color: '#0078d4' },
            'Durability',
            'Throughput',
          ]}
          rows={[
            {
              '0': 'acks=0',
              '1': 'Producer fires and forgets. Does not wait for any acknowledgement.',
              '2': 'None — event can be lost if broker crashes before writing to disk',
              '3': 'Maximum — no waiting at all',
            },
            {
              '0': 'acks=1',
              '1': 'Wait for the partition leader to acknowledge. Followers may not have the event yet.',
              '2': 'Partial — event survives if leader stays up, lost if leader crashes before replication',
              '3': 'High',
            },
            {
              '0': 'acks=all (or -1)',
              '1': 'Wait for all in-sync replicas to acknowledge. Event is on multiple machines before the producer continues.',
              '2': 'Strong — event survives any single broker failure',
              '3': 'Lower — waiting for multiple machines to confirm',
            },
          ]}
        />

        <Callout type="warning">
          In production financial or order data systems, always use
          <code>acks=all</code>. The throughput cost is acceptable. The data
          loss from <code>acks=0</code> or <code>acks=1</code> is not.
          For metrics, logs, and analytics where losing occasional events
          is tolerable, <code>acks=1</code> is common.
        </Callout>

        <SubTitle>Consumers — reading without destroying</SubTitle>

        <Para>
          A consumer reads events from a topic. Reading from a streaming log
          is non-destructive — the event stays in the log after being read.
          This is fundamentally different from a traditional queue, where
          consuming a message removes it. Because the log is immutable and
          retained, multiple completely independent consumers can read the
          same events at different speeds, at different times, and from
          different points in history.
        </Para>

        <Para>
          PhonePe's fraud detection service reads from the <code>payments</code>
          topic in real time. PhonePe's daily reconciliation job also reads
          from the same <code>payments</code> topic, but in a batch at midnight.
          PhonePe's ML feature store reads from it to build training datasets.
          These three consumers are completely independent — each maintains its
          own position in the log and processes at its own pace.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Offsets ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Offsets" />
        <SectionTitle>Offsets — The Most Important Number in Streaming</SectionTitle>

        <Para>
          An offset is a sequential integer that uniquely identifies an event
          within a partition. Partition 0 starts at offset 0. The first event
          written gets offset 0. The next gets offset 1. The millionth event
          gets offset 999,999. The offset is assigned by the broker, not the
          producer. It is immutable — once assigned, an offset never changes
          and is never reused.
        </Para>

        <Para>
          The offset is how a consumer tracks its position. After processing
          the event at offset 441, the consumer commits offset 442 — meaning
          "I have processed everything up to and including 441, next give me
          442." If the consumer crashes and restarts, it fetches its last
          committed offset and resumes from there. The event at offset 442
          has been sitting in the partition the whole time, waiting.
        </Para>

        <CodeBox label="offset lifecycle — what actually happens">
{`# The offset lifecycle for one consumer reading partition 0:

# Broker partition 0 state:
# offset 0: {"event_type": "order.placed", "order_id": "ORD-001", ...}
# offset 1: {"event_type": "order.placed", "order_id": "ORD-002", ...}
# offset 2: {"event_type": "payment.completed", ...}
# offset 3: {"event_type": "order.placed", "order_id": "ORD-003", ...}
# ...
# offset 441: {"event_type": "order.placed", "order_id": "ORD-442", ...}

# Consumer reads offset 441, processes it (sends to DB, updates cache, etc.)
# Consumer COMMITS offset 442 to the broker

# COMMITTED OFFSET = 442
# This means: "I have processed everything through offset 441"

# Consumer crashes here.
# Consumer restarts.
# Consumer asks broker: "What is my committed offset?"
# Broker says: 442
# Consumer resumes reading from offset 442 — no data lost, no data skipped

# ─── Three offsets to know ───────────────────────────────────────────────────

# LOG-END OFFSET — the offset of the NEXT event that will be written
# (the last written event is log-end-offset minus 1)
# If the last event written is at offset 999, log-end-offset = 1000

# COMMITTED OFFSET — the offset the consumer has told the broker it has processed
# This is what survives crashes

# CURRENT OFFSET — the offset the consumer is currently reading
# May be ahead of committed offset if batch processing before committing

# LAG = LOG-END OFFSET − COMMITTED OFFSET
# A consumer with lag 0 is caught up — processing events as fast as they arrive
# A consumer with lag 500,000 is 500k events behind — it is falling behind the producer
# LAG IS THE KEY OPERATIONAL METRIC for streaming consumers`}
        </CodeBox>

        <SubTitle>Why replay is powerful</SubTitle>

        <Para>
          Because the offset is just a number and events stay in the log until
          the retention period expires (configurable — 7 days is common, some
          systems keep logs indefinitely), a consumer can reset its offset to
          any point in the past and replay history.
        </Para>

        <Para>
          Meesho builds a new real-time recommendation service in March 2026.
          They want to seed it with 90 days of event history. They point the
          consumer's offset to January 1st and let it run. The exact same
          events that drove production decisions in January are now being
          processed by the new service as if they just arrived. No ETL job.
          No data migration. Just a consumer with an offset set to the past.
        </Para>

        <Para>
          Replay is also how you recover from bugs. Your consumer had a bug
          in February that corrupted data for 3 hours. You fix the bug, reset
          the consumer's offset to before the bug window, and replay those
          3 hours of events. The downstream systems get corrected data.
          In a request-driven system, those 3 hours of lost processing are
          gone forever.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Consumer Groups ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Consumer Groups" />
        <SectionTitle>Consumer Groups — Parallelism, Partition Assignment, and Rebalancing</SectionTitle>

        <Para>
          A consumer group is a set of consumers that collectively read a topic
          together, each reading a subset of the partitions. This is how
          horizontal scaling works in streaming — if one consumer cannot keep
          up with the event rate, you add more consumers to the group and the
          load is spread across them.
        </Para>

        <Para>
          The rule is strict: <strong>each partition is assigned to exactly
          one consumer within a group at any moment.</strong> Two consumers
          in the same group never read the same partition simultaneously.
          This guarantees in-order processing per partition — if two consumers
          could read the same partition at the same time, event ordering would
          be violated.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Example — FreshMart order processing group:</strong><br />
            Topic: <code>freshmart.orders</code> — 12 partitions<br />
            Consumer group: <code>order-processor</code> — 4 consumer instances
          </Para>
          <Para>
            Assignment: consumer 1 → partitions 0, 1, 2 | consumer 2 → partitions
            3, 4, 5 | consumer 3 → partitions 6, 7, 8 | consumer 4 → partitions
            9, 10, 11. Each consumer processes 3 partitions. Throughput is 4× what
            a single consumer would achieve.
          </Para>
          <Para>
            Now add a 5th consumer: broker detects new consumer in the group and
            triggers a <strong>rebalance</strong>. Partitions are redistributed.
            During rebalance, all consumers in the group stop processing —
            this is called a stop-the-world rebalance and it is a real operational
            problem in production systems with large consumer groups.
          </Para>
        </HighlightBox>

        <CodeBox label="consumer group — key rules and limits">
{`# Rule 1: partitions are the ceiling on parallelism
# Topic has 12 partitions → max useful consumers in one group = 12
# If you add a 13th consumer, it gets assigned 0 partitions and sits idle
# To increase parallelism beyond 12, you must increase partition count first
# (increasing partition count on a live topic breaks ordering for hashed keys)

# Rule 2: different groups = completely independent reads
# Group "order-processor" reads freshmart.orders for processing
# Group "order-analytics" ALSO reads freshmart.orders for analytics
# They have completely separate committed offsets
# Neither group affects the other — they are invisible to each other

# Group "order-processor" at offset 10,000
# Group "order-analytics" at offset 500     ← it's slow, doesn't matter
# Neither knows the other exists

# Rule 3: consumer group offset lives in the broker (in Kafka: __consumer_offsets topic)
# It is NOT stored in your application
# This is how consumers can crash and restart without losing their position

# Rule 4: unassigned partitions during rebalance
# During a rebalance, ALL consumers in the group stop processing
# Rebalance duration: typically 1-30 seconds depending on group size
# Production implication: large consumer groups have longer rebalance pauses
# Solution: incremental cooperative rebalancing (Kafka 2.4+) — only moves partitions
#           that need to be reassigned, others continue processing`}
        </CodeBox>

        <SubTitle>When the number of consumers equals the number of partitions</SubTitle>

        <Para>
          This is the sweet spot in most designs — one consumer per partition.
          Each consumer owns exactly one partition, maximum parallelism with no
          idle consumers, no hot spots. The common production pattern for a
          critical processing job is: set partition count when you create the
          topic based on expected peak throughput, then deploy exactly that many
          consumer instances. Scale them together.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Delivery Semantics ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Delivery Semantics" />
        <SectionTitle>Delivery Semantics — At-Most-Once, At-Least-Once, Exactly-Once</SectionTitle>

        <Para>
          This is the most important concept in streaming for production systems.
          Every streaming pipeline makes a delivery guarantee — even if you haven't
          thought about it, you've made a choice by default. Understanding these
          three semantics is the difference between a pipeline that looks correct
          in development and one that is actually correct in production.
        </Para>

        <SubTitle>At-most-once — fire and forget</SubTitle>

        <Para>
          The consumer reads an event and immediately commits the offset, before
          processing the event. If the consumer crashes after committing but before
          finishing processing, the event is never processed. When it restarts, it
          picks up at the committed offset — which is already past the event it was
          processing. That event is silently skipped.
        </Para>

        <Para>
          Result: events are processed zero or one times. You will never process
          the same event twice. But you might miss events entirely.
        </Para>

        <Para>
          When to use: application logs, metrics, telemetry — where dropping
          1 in 10,000 events is acceptable and processing every event twice
          would cause bigger problems (double-counting metrics, for example).
        </Para>

        <SubTitle>At-least-once — retry until confirmed</SubTitle>

        <Para>
          The consumer reads an event, processes it, and only then commits the
          offset. If the consumer crashes after processing but before committing,
          it restarts and processes the same event again. The event is processed
          at least once, possibly more than once.
        </Para>

        <Para>
          Result: you will never miss an event. But you might process the same
          event multiple times. This is the default in almost every streaming
          system. The implication: your processing logic must be
          <strong>idempotent</strong> — applying the same event twice must
          produce the same result as applying it once.
        </Para>

        <CodeBox label="idempotent processing — the at-least-once solution">
{`# Non-idempotent (WRONG for at-least-once):
def process_order(event):
    # If this runs twice for the same order, revenue is double-counted
    execute_sql("UPDATE daily_revenue SET total = total + %s WHERE date = %s",
                [event['total_paise'], event['date']])

# Idempotent approach 1: upsert with event_id as unique key
def process_order(event):
    # If this runs twice with the same event_id, the second UPSERT is a no-op
    execute_sql("""
        INSERT INTO processed_orders (event_id, order_id, total_paise, processed_at)
        VALUES (%s, %s, %s, NOW())
        ON CONFLICT (event_id) DO NOTHING
    """, [event['event_id'], event['order_id'], event['total_paise']])

# Idempotent approach 2: check-then-act
def process_order(event):
    already_processed = execute_sql(
        "SELECT 1 FROM processed_events WHERE event_id = %s",
        [event['event_id']]
    ).fetchone()
    if already_processed:
        return  # Already done, skip silently
    # Process and record atomically in a transaction
    with transaction():
        do_processing(event)
        record_event_id(event['event_id'])`}
        </CodeBox>

        <SubTitle>Exactly-once — the holy grail with asterisks</SubTitle>

        <Para>
          Exactly-once means every event is processed exactly once, even in
          the face of crashes, retries, and network failures. This sounds like
          what everyone wants. The reality is more nuanced.
        </Para>

        <Para>
          True exactly-once delivery requires coordination between the consumer,
          the processing logic, and the output system — all in a single atomic
          transaction. Kafka supports exactly-once semantics between Kafka topics
          (a Kafka Streams job reading from one topic and writing to another can
          guarantee exactly-once). But if your output is a PostgreSQL database,
          a Redis cache, and an S3 file simultaneously, you cannot get true
          exactly-once across all three without a distributed transaction — which
          is extremely expensive.
        </Para>

        <Para>
          In practice, most production systems use <strong>at-least-once delivery
          with idempotent consumers</strong>. This is effectively exactly-once
          behaviour at a fraction of the complexity and cost. The event might be
          delivered twice, but because the consumer handles duplicates correctly,
          the effect is exactly once.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Practical rule:</strong> Design for at-least-once delivery.
            Make every consumer idempotent. Test duplicate handling explicitly.
            This gets you exactly-once behaviour without the distributed
            transaction overhead. Reserve true exactly-once for Kafka-to-Kafka
            pipelines where Kafka's transactional API can handle it natively.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 08 — Time ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Time" />
        <SectionTitle>Time in Streaming — Three Clocks, Watermarks, and Late Data</SectionTitle>

        <Para>
          Time is the most subtle and most frequently misunderstood concept
          in streaming. There are three different notions of time in a streaming
          system, and confusing them is the source of incorrect analytics,
          silent data loss, and aggregation bugs that are very hard to debug.
        </Para>

        <Table
          headers={[
            'Time type',
            { label: 'Definition', color: '#7b61ff' },
            'Example',
            'Use for',
          ]}
          rows={[
            {
              '0': 'Event time',
              '1': 'When the thing happened in the real world, recorded in the event payload',
              '2': 'Customer placed the order at 14:23:11 — this is in event_time field',
              '3': 'Business analytics, aggregations that must reflect real-world timing',
            },
            {
              '0': 'Ingestion time',
              '1': 'When the event was written to the broker',
              '2': 'Event arrived at Kafka at 14:23:14 (3 seconds after it happened)',
              '3': 'Debugging pipeline latency — difference from event time shows end-to-end lag',
            },
            {
              '0': 'Processing time',
              '1': 'When the consumer reads and processes the event',
              '2': 'Consumer processed the event at 14:23:19 (8 seconds after it happened)',
              '3': 'Pipeline performance monitoring, SLA tracking',
            },
          ]}
        />

        <Para>
          The gap between event time and processing time is the end-to-end
          latency of your system. In a healthy real-time pipeline, this is
          under 1 second. In a pipeline under heavy load or recovering from
          lag, this can be minutes or hours.
        </Para>

        <SubTitle>The late data problem</SubTitle>

        <Para>
          Mobile apps buffer events when offline. A Meesho customer in a
          low-connectivity area places an order at 11:58 PM. The app can't
          reach the network. The order is stored locally. At 12:03 AM the
          connection recovers and the app sends the event. The event has an
          event time of 11:58 PM but arrives at your streaming system at
          12:03 AM — 5 minutes late.
        </Para>

        <Para>
          Your hourly aggregation job computed the 11 PM–midnight window and
          emitted results at 12:01 AM. That late-arriving order at 11:58 PM
          arrives at 12:03 AM — after the window closed. What do you do?
          Do you discard it? Recompute the window? Update the result? This
          is the late data problem and it has no perfect solution — only
          trade-offs.
        </Para>

        <SubTitle>Watermarks — how streaming systems handle late data</SubTitle>

        <Para>
          A watermark is a declaration that says: "I believe all events with
          event time before T have now arrived. I am safe to close any
          window ending before T." A watermark is an estimate, not a
          guarantee. Events can still arrive after the watermark.
        </Para>

        <Para>
          The watermark moves forward as time progresses, but it lags behind
          the current time by a configurable amount — the allowed lateness.
          A watermark of "current time minus 5 minutes" means: process a
          window as soon as it is 5 minutes in the past, and drop any events
          that arrive more than 5 minutes late. The 5 minutes is a
          business decision: longer allowed lateness = more accurate results
          but higher output latency. Shorter allowed lateness = faster outputs
          but more dropped late events.
        </Para>

        <Callout type="tip">
          For business analytics (revenue, orders, GMV), always aggregate on
          event time, not processing time. A report saying "₹1.2 crore in
          orders between 11 PM and midnight" must use the time the order was
          placed, not the time your pipeline processed it. Using processing
          time for business metrics is one of the most common and least
          obvious bugs in streaming analytics.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Ordering ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Ordering" />
        <SectionTitle>Ordering Guarantees — Why Global Order Is Impossible and What You Can Have Instead</SectionTitle>

        <Para>
          "Are events processed in order?" is one of the first questions asked
          about streaming systems. The honest answer has three parts, and each
          part matters.
        </Para>

        <Para>
          <strong>Within a partition: yes, strict order.</strong> Events in
          partition 0 are always delivered to consumers in the order they were
          written. Offset 100 is always delivered before offset 101. This is
          guaranteed by the broker. If you write events for customer C98765 to
          the same partition every time, you will always process that customer's
          events in order.
        </Para>

        <Para>
          <strong>Across partitions: no ordering guarantee whatsoever.</strong>
          An event written to partition 3 at 14:23:11 may be processed after
          an event written to partition 7 at 14:23:15 — or before, depending on
          which consumer is faster, which network hop was slower, and which
          partition had more lag. If your processing requires knowing that
          "order placed" always comes before "order shipped" for the same
          order, you must ensure both events go to the same partition.
        </Para>

        <Para>
          <strong>Globally across the entire topic: fundamentally impossible
          at scale.</strong> A topic with 32 partitions on 8 machines, receiving
          1 million events per second, cannot maintain a global total order.
          The machines have independent clocks. Network delays are non-deterministic.
          Any system claiming global ordering at that scale is either lying,
          operating at extremely low throughput, or using a consensus protocol
          that serialises every write — which kills your throughput entirely.
        </Para>

        <SubTitle>Designing around ordering constraints</SubTitle>

        <CodeBox label="ordering — practical patterns">
{`# Pattern 1: Same entity → same partition (the standard approach)
# Use entity ID as partition key
# All events for order ORD-001 go to partition hash("ORD-001") % 32
# Processing for ORD-001 is always sequential

event = {
    "partition_key": order_id,   # Guarantees per-order ordering
    "event_type": "order.status_updated",
    "data": { "order_id": order_id, "new_status": "shipped" }
}

# Pattern 2: Sequence numbers for explicit ordering
# Include a monotonically increasing sequence in the event
# Consumer detects gaps and can buffer or alert
event = {
    "partition_key": customer_id,
    "sequence": 4,   # Customer C98765's 4th event
    "event_type": "customer.session.action",
}
# If consumer receives sequence 5 before sequence 4, it knows something is out of order

# Pattern 3: Accept out-of-order, use event time for ordering in the consumer
# Sort events by event_time within the processing window
# Works when "close enough" ordering is acceptable and exact ingestion order is not
# Common in analytics pipelines that aggregate over windows

# What NOT to do: rely on processing time for ordering
# "Process events in the order they arrive at my consumer"
# → fails when consumers fall behind and replay — replay order != original order
# → fails during rebalancing — different partitions resume at different speeds
# → fails when events arrive from multiple geographic producers`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Event-Driven Architecture Patterns ─────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — EDA Patterns" />
        <SectionTitle>Three Event-Driven Architecture Patterns You Will See at Work</SectionTitle>

        <Para>
          Event-driven architecture is not one thing. There are three distinct
          patterns, each with different semantics, different trade-offs, and
          different use cases. Martin Fowler named them. Every senior data
          engineer should be able to identify which pattern is in use and why.
        </Para>

        <SubTitle>Pattern 1 — Event Notification</SubTitle>

        <Para>
          The producer publishes a lightweight notification that something
          happened, containing minimal data. Consumers receive the notification
          and call back to the source system to get the full details they need.
        </Para>

        <CodeBox label="event notification — thin event, fat callback">
{`# Producer publishes a thin notification
{
    "event_type": "payment.completed",
    "payment_id": "PAY-2026-004421",
    "event_time": "2026-03-20T14:23:11Z"
    # No payment details — just the notification
}

# Consumer receives this, then calls back to the payment service:
# GET /payments/PAY-2026-004421
# → returns full payment details including amount, method, parties, etc.

# Advantage: events are tiny — low broker storage, fast transmission
# Advantage: consumers get fresh data on callback — always up to date
# Disadvantage: creates tight coupling through the callback
# Disadvantage: if the payment service is down, consumers can't process the notification
# Use when: consumers need very different subsets of data, source system is authoritative`}
        </CodeBox>

        <SubTitle>Pattern 2 — Event-Carried State Transfer</SubTitle>

        <Para>
          The producer publishes a fat event containing all the data that
          consumers might need. Consumers are fully self-sufficient — they
          do not need to call back to any other system. This is the most
          common pattern in production streaming systems.
        </Para>

        <CodeBox label="event-carried state transfer — fat event, no callback">
{`# Producer publishes a complete event with all relevant data
{
    "event_type": "order.placed",
    "event_id": "evt_01HV8K3M...",
    "event_time": "2026-03-20T14:23:11Z",
    "data": {
        "order_id":        "ORD-2026-887432",
        "customer_id":     "C98765",
        "customer_name":   "Priya Sharma",
        "customer_email":  "priya@example.com",   # included for notification service
        "customer_phone":  "+91 9876543210",       # included for SMS service
        "store_id":        "ST007",
        "store_city":      "Hyderabad",             # included for analytics
        "items":           [...],
        "total_paise":     82300,
        "payment_method":  "upi",
        "delivery_eta_minutes": 28
    }
}

# Notification service: uses customer_email and customer_phone — no callback needed
# Analytics service: uses store_city and total_paise — no callback needed
# Fraud service: uses customer_id, total_paise, payment_method — no callback needed

# Advantage: complete decoupling — consumers work even if source is down
# Advantage: consumers are fast — no network round-trips
# Disadvantage: events are larger — higher broker storage
# Disadvantage: stale data risk — event carries state at the time of writing
# Use when: multiple consumers need data, decoupling resilience is important`}
        </CodeBox>

        <SubTitle>Pattern 3 — Event Sourcing</SubTitle>

        <Para>
          The event log is not just a communication mechanism — it IS the
          database. The current state of any entity is derived by replaying
          all events for that entity from the beginning. There is no separate
          "state" database. The event log is the source of truth.
        </Para>

        <Para>
          An order's current status is not stored in a <code>status</code>
          column in a database. It is derived by replaying: order.placed →
          payment.completed → order.confirmed → fulfillment.started →
          order.shipped → order.delivered. The current status is "delivered"
          because that was the last event.
        </Para>

        <Para>
          This is extremely powerful for audit trails, time travel, and
          rebuilding any projection of state. It is also extremely complex
          operationally. Your event log must be retained forever (not just
          7 days). Query patterns are expensive — "what is order ORD-001's
          current status?" requires replaying potentially thousands of events.
          You mitigate this with snapshots (periodic materialised views of
          current state), but the operational overhead is significant.
          Event sourcing is not a default choice — it is a deliberate
          architectural decision for systems where the full history of
          state changes is a core business requirement.
        </Para>
      </section>

      <Divider />

      {/* ── Part 11 — What This Looks Like at Work ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At a fintech (CRED / Razorpay / PhonePe):</strong> Your
            first streaming task is probably debugging a consumer that is
            showing high lag. You check the consumer group lag metric — one
            partition has 2 million events of backlog while the rest are at
            near-zero. You look at the partition key: it is set to
            <code>payment_method</code>. UPI handles 80% of all transactions
            in India, so the UPI partition is overwhelmed while the others
            are idle. The fix is changing the partition key to
            <code>payment_id</code> for even distribution. You can't change
            partition count without downtime, so this goes into the next
            maintenance window. Understanding this required knowing exactly
            what a partition key does — not just that it exists.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At an e-commerce company (Flipkart / Meesho / Nykaa):</strong>
            The analytics team is reporting that the revenue figures in the
            real-time dashboard don't match the nightly batch report. You
            investigate and discover the real-time stream is aggregating on
            processing time while the batch job uses event time. Orders placed
            just before midnight are appearing in the wrong day in the
            real-time system. Fix: switch the streaming aggregation to use
            <code>event_time</code> with a 5-minute watermark for late arrivals.
            Understanding event time vs processing time is what lets you diagnose
            this in 20 minutes instead of 2 days.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>In a streaming architecture review interview:</strong>
            "Design a real-time order tracking system for 1 million orders per
            day." The interviewer is listening for: topic and partition design
            (what is the partition key and why), delivery semantics (at-least-once
            with idempotent consumers), time handling (event time for SLA
            calculations, processing time for pipeline monitoring), consumer
            group design (how many consumers, what happens during rebalance),
            and late data strategy (mobile apps go offline — how do you handle
            events that arrive 10 minutes late). Every one of these concepts
            is in this module.
          </Para>
        </HighlightBox>
      </section>

      <KeyTakeaways items={[
        'A stream is an ordered, replayable, append-only log of events. These three properties — ordered, replayable, append-only — define every design decision in streaming.',
        'Streaming is not fast batch. Batch has bounded datasets; streaming has unbounded datasets. The processing model, state management, and failure recovery are fundamentally different.',
        'Events are immutable records of something that happened. They are never updated in place. Corrections are new events. This immutability is what makes replay and audit possible.',
        'Partitions are the unit of parallelism and the unit of ordering. Within one partition, ordering is guaranteed. Across partitions, there is no ordering guarantee. Choose your partition key to put related events in the same partition.',
        'An offset is a sequential integer that identifies an event within a partition. Consumers commit offsets to track their position. Replay = reset offset to an earlier point. Lag = log-end-offset minus committed offset.',
        'Each partition is assigned to exactly one consumer in a consumer group at a time. Maximum parallelism equals the number of partitions. Adding more consumers than partitions wastes resources.',
        'At-most-once drops events on crash. At-least-once delivers events at least once — requires idempotent consumers. Exactly-once is the ideal but requires distributed transactions for multi-system outputs; most systems achieve it through at-least-once + idempotency.',
        'There are three clocks: event time (when it happened), ingestion time (when it hit the broker), processing time (when your consumer read it). Always aggregate business metrics on event time. Use watermarks to handle late-arriving events.',
        'Global ordering across a topic is impossible at scale. Design your partition key so that events requiring relative ordering go to the same partition.',
        'Event notification (thin event + callback), event-carried state transfer (fat event, no callback), and event sourcing (log is the database) are three distinct patterns with different coupling, resilience, and complexity trade-offs.',
      ]} />

    </LearnLayout>
  )
}