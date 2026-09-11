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
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'What is Apache Kafka?', href: '/learn/apache-kafka/what-is-apache-kafka' },
      ]}
      next={{ title: 'Events, Topics, and Partitions', href: '/learn/apache-kafka/events-topics-partitions' }}
    >
      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The problem Kafka solves" />
        <SectionTitle>Kafka Is Not &quot;Just a Queue&quot; — It Is a Durable Event Log</SectionTitle>

        <Para>
          Apache Kafka is a distributed event streaming platform. That phrase sounds intimidating, so
          let us translate it carefully, one word at a time, the way you would explain it to a smart
          colleague who has never touched it. <strong>Distributed</strong> means Kafka runs across
          multiple servers instead of one machine — if one machine dies, the system keeps running.
          <strong> Event</strong> means a recorded fact that already happened: an order was placed, a
          payment succeeded, a package shipped, a driver changed location, a user clicked a button.
          <strong> Streaming</strong> means these facts arrive continuously, one at a time, second after
          second, not as one finished file dropped at the end of the day.
        </Para>

        <Para>
          The simplest definition is this: <strong>Kafka is a system for storing ordered streams of
          events so many applications can read those events independently.</strong> Producers write
          events into Kafka. Kafka stores those events durably — on disk, replicated across machines, so
          a single disk failure or server crash does not lose them. Consumers read the events at their
          own speed, whenever they are ready. The same event can be read by billing, analytics,
          notifications, fraud detection, and customer support without the producer sending five
          separate copies to five separate destinations.
        </Para>

        <Callout title="Plain-English version" color="#38bdf8">
          Kafka is like a shared company timeline, or a group chat that nobody can delete messages from.
          Whenever something important happens, an app writes that fact to the timeline. Other teams do
          not need to interrupt the original app or ask it a question. They read the timeline whenever
          they need to react, analyze, audit, or rebuild state — even hours or days later.
        </Callout>

        <Para>
          This is different from traditional request-response systems, which is where most engineers
          start their careers and where most of their intuition comes from. In request-response, one
          service asks another service to do something right now, over the network, and waits for an
          answer. If the other service is slow, that wait is slow. If the other service is down, the
          caller has a problem it must handle immediately — retry, fail, or queue up locally. Kafka
          changes this relationship entirely. A service records what happened and moves on. Other
          services react when they are ready. This separates the act of <em>producing</em> a fact from
          the act of <em>consuming</em> it, and that separation is the single idea underneath almost
          everything else in this module.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Core mental model:</strong> Kafka is an append-only log. New records are added to
            the end. Existing records are not updated in place — they are immutable once written.
            Consumers remember their own position in the log and move forward at their own pace. If
            needed, they can move their position backward and replay old events, as long as Kafka still
            retains those events. Nothing about this model resembles a phone call between two services.
            It resembles a shared, growing history book that anyone can read from any page.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Messages, events, and why request-response breaks" />
        <SectionTitle>What a &quot;Message&quot; Actually Is, and Why Direct Calls Stop Scaling</SectionTitle>

        <Para>
          Before going further, it is worth being precise about a word this whole field overuses:
          <strong> message</strong>. A message, in the broadest sense, is simply a unit of data sent from
          one program to another. An HTTP request is a message. A row inserted into a database and read
          by another process is, functionally, a message. A Kafka <strong>event</strong> is a specific,
          disciplined kind of message: an immutable record of something that already happened, carrying
          enough information that a reader who was not involved in producing it can still make sense of
          it later — possibly much later. Module 02 goes much deeper into the exact shape of an event
          (key, value, timestamp, headers). For now, hold the general idea: an event is a fact, not a
          request, and not a command.
        </Para>

        <Para>
          Now consider why REST-style request-response APIs — the tool most backend engineers reach for
          first — break down once a system needs to notify many independent parts of itself,
          asynchronously, about the same fact. Imagine an online store before Kafka. The checkout service
          handles purchases. After every order, the checkout service must tell the billing service to
          charge the card, the warehouse service to pick items, the email service to send a receipt, the
          analytics system to update dashboards, the fraud system to inspect risk, and the support system
          to show the order to agents. If checkout does this with direct HTTP calls to each of those six
          services, checkout is now coupled to all six of their uptimes, all six of their response times,
          and all six of their API contracts.
        </Para>

        <CodeBox label="the direct-call approach — what actually happens under load">
{`# checkout-service, naive design: 6 direct HTTP calls after every order

def place_order(order):
    save_to_db(order)
    call_billing_api(order)        # what if billing is slow right now?
    call_warehouse_api(order)      # what if warehouse deploys and drops 2% of requests?
    call_email_api(order)          # what if email provider is rate-limiting us?
    call_analytics_api(order)      # what if analytics is down for maintenance?
    call_fraud_api(order)          # what if fraud added a new required field last week?
    call_support_api(order)        # what if support's database is under load?
    return "order placed"          # this response is now only as fast as the SLOWEST of the six calls

# If any ONE of the six is down or slow:
#   - checkout's own response time degrades or times out
#   - checkout must now implement retry logic for six different failure modes
#   - if checkout crashes mid-loop, some services got the update and some did not
#   - adding a 7th interested service means editing and redeploying checkout.py`}
        </CodeBox>

        <Para>
          At first this works. Then the system grows. Analytics goes down for maintenance and checkout's
          retry logic starts eating memory. Email becomes slow during a provider outage and orders start
          timing out. Fraud adds a new required API field and checkout breaks in production the next
          deploy. Warehouse needs its own retry semantics because picking is not idempotent. Support
          wants to replay the last 24 hours of orders after a data corruption bug, and there is no way to
          do that — the HTTP calls already happened and are gone. Suddenly checkout, which should focus
          on one job — placing orders correctly — has become tangled with the failure modes, deploy
          schedules, and API contracts of every downstream system that has ever asked it for data.
        </Para>

        <Table
          headers={['Problem', 'Without Kafka (direct calls)', 'With Kafka']}
          rows={[
            ['Slow consumer', 'The producer may block, time out, or need complex retry/circuit-breaker logic.', 'The producer writes once; the slow consumer catches up from Kafka at its own pace.'],
            ['New consumer', 'Producer code changes to add another outbound call to the new destination.', 'The new consumer reads the existing topic independently — zero producer changes.'],
            ['Consumer outage', 'Events may be lost unless the producer stores and retries them elsewhere.', 'Events stay in Kafka, retained, until the consumer comes back and catches up.'],
            ['Need to replay history', 'You need backups, database dumps, or custom export/reprocessing jobs.', 'Reset the consumer group\'s offset and replay retained events from any point.'],
            ['Many teams need the same data', 'Point-to-point integrations multiply — N producers × M consumers connections.', 'One topic can feed any number of independent consumer groups.'],
          ]}
        />

        <Para>
          Kafka solves this by becoming the shared, asynchronous event backbone between systems.
          Checkout publishes one event — <strong>OrderPlaced</strong> — to one topic. Billing, warehouse,
          email, analytics, fraud, and support each consume <strong>OrderPlaced</strong> independently, on
          their own schedule, using their own logic. Checkout does not need to know who reads the event,
          how many readers there are, or whether they are healthy right now. Consumers do not need
          checkout to resend history if they were briefly offline — Kafka already held it for them. This
          is asynchronous, decoupled, cross-system communication, and it is the specific gap that request-
          response APIs cannot fill at scale.
        </Para>

        <Callout title="Note" color="#22c55e">
          This does not mean REST APIs are obsolete or wrong. A synchronous request-response call is
          still the correct tool when the caller genuinely needs an immediate answer before it can
          proceed — &quot;is this credit card valid right now?&quot; is a request-response question.
          &quot;Six unrelated systems need to eventually know an order happened&quot; is an event-
          broadcasting question. Kafka is built for the second shape of problem, not a replacement for
          the first.
        </Callout>

        <SubTitle>The specific asynchronous, cross-system shape Kafka is built for</SubTitle>
        <Para>
          It is worth naming the pattern precisely, because it is the pattern you will keep encountering
          throughout this track: one producer, an unknown and possibly growing number of independent
          consumers, none of which need to respond synchronously, and none of which should block or slow
          down the producer. Direct calls scale linearly in pain with the number of consumers — every new
          consumer is a new outbound call, a new failure mode, a new piece of coupling in the producer's
          code. An event log scales flat — the producer writes once, no matter how many consumers
          eventually exist, and the producer's code never changes when a new consumer is added.
        </Para>

        <CodeBox label="the same order event, two different consumer counts, same producer code">
{`# Day 1: checkout-service publishes OrderPlaced. Two consumers exist.
producer.send(topic="orders", key=order_id, value=order_placed_event)
# consumers: billing-consumer-group, warehouse-consumer-group

# Month 6: five more teams have joined, all reading the SAME topic.
producer.send(topic="orders", key=order_id, value=order_placed_event)
# consumers now: billing, warehouse, email, analytics, fraud, support, loyalty-points
# checkout-service's code above did not change by a single character.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What a log is, and why Kafka is built on one" />
        <SectionTitle>The Log: A Deceptively Simple Data Structure That Changes Everything</SectionTitle>

        <Para>
          Before Kafka's vocabulary — topic, partition, broker — makes sense, you need to understand the
          single data structure everything is built on: <strong>the log</strong>. Not a log file in the
          &quot;application logging&quot; sense (though that is a related idea), but a log in the
          computer-science sense: an ordered, append-only sequence of records, where every record gets a
          position number, and new records are only ever added to the end.
        </Para>

        <Para>
          This is one of the oldest and simplest ideas in computing — it is the same structure underneath
          a database's write-ahead log, a version control system's commit history, and an accountant's
          ledger. What makes it powerful is what it refuses to do: it never edits history in place, and it
          never removes an entry to make room for a read. Reading from a log does not consume it. This is
          the opposite of, say, popping an item off a stack or dequeuing a task — both of those operations
          destroy the item as part of reading it. A log just accumulates, and different readers can each
          be at a different position within it simultaneously, without interfering with one another.
        </Para>

        <CodeBox label="append-only log — the core mental model">
{`orders partition 0

offset 0  -> OrderPlaced(order_id=100)
offset 1  -> PaymentAuthorized(order_id=100)
offset 2  -> OrderPlaced(order_id=101)
offset 3  -> ShipmentPrepared(order_id=100)
offset 4  -> OrderCancelled(order_id=101)

# Nothing here was ever edited or removed.
# A consumer does not "take" a record out of the log — it just reads it.
# A consumer's only state is a single number: "I have processed through offset 4."
# Three different consumers can each be at a different offset in this same log
# at the same time, and none of them affects what the others see.`}
        </CodeBox>

        <Para>
          Kafka is, at its core, this idea implemented at massive scale, distributed across many machines,
          made durable against hardware failure, and made fast enough to handle millions of records per
          second. Every other Kafka concept you will learn — topics, partitions, offsets, retention,
          compaction, replication — exists to answer one of two questions about this log: how do we split
          it up so it can grow arbitrarily large and be read/written in parallel (that is topics and
          partitions), and how do we keep it durable and available when machines fail (that is
          replication). Module 02 spends its entire length on the first question. This module gives you
          enough of the picture to keep moving.
        </Para>

        <Para>
          It is worth pausing on why sequential appends are so much faster than the alternative, because
          this is not a minor implementation detail — it is the reason Kafka can sustain the throughput
          companies adopt it for. A disk (spinning or SSD) is fastest when it writes to consecutive
          locations, one after another, because the drive never has to jump elsewhere to find the next
          write location. Random writes — updating a record buried in the middle of a file, as a
          traditional database update often does — force exactly that kind of jumping around, which is
          dramatically slower. By restricting itself to append-only writes at the end of the log, Kafka
          sidesteps this problem by construction, not by clever optimization. This is also why Kafka reads
          are fast: consumers read sequentially forward from their offset, the same access pattern the disk
          (and the operating system's page cache, which mirrors recently written data in memory) is
          optimized for.
        </Para>

        <Callout title="Why replay matters — the payoff of the log model" color="#22c55e">
          If the analytics team deploys a bug at 9 AM and produces wrong dashboard numbers until 10 AM,
          with a replayable log they can fix the code and simply replay the retained Kafka events from
          9 AM forward — the exact same events, in the exact same order, re-processed by the corrected
          code. Without a replayable log, the team needs a painful database restore, a manual repair
          script, or has to accept permanently wrong historical data. Replay is not a side feature of
          Kafka. It is the direct consequence of choosing an append-only, non-destructive log as the
          storage model instead of a destructive queue.
        </Callout>

        <SubTitle>The log is not free storage — retention is a deliberate boundary</SubTitle>
        <Para>
          It is tempting, once you see how useful replay is, to assume Kafka simply keeps every event
          forever. It does not, by default. A log that grows without bound eventually exceeds any disk.
          Every topic has a retention policy — commonly measured in days — after which the oldest events
          become eligible for deletion, regardless of whether every consumer has read them yet. This is a
          deliberate trade-off, not a limitation to work around: retention should be set based on how much
          replayable history your consumers genuinely need, and how far behind a consumer is realistically
          allowed to fall before it must fully catch up or restart from scratch. Module 02 covers exactly
          how this works at the partition level; for now, understand that &quot;durable&quot; and
          &quot;permanent&quot; are not the same claim.
        </Para>

        <Table
          headers={['Log property', 'What it buys you', 'What it costs']}
          rows={[
            ['Append-only writes', 'Extremely fast, sequential disk writes — no seeking, no in-place edits.', 'You cannot correct a record in place; corrections must be new events.'],
            ['Non-destructive reads', 'Any number of independent consumers can read the same history.', 'The log keeps growing until retention removes old data — needs disk planning.'],
            ['Offset-based position', 'Simple, cheap consumer state — just one number per partition.', 'Consumers, not the broker, are responsible for tracking and committing progress correctly.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Kafka vs. a traditional queue" />
        <SectionTitle>How Kafka Differs From a Traditional Message Queue</SectionTitle>

        <Para>
          Engineers coming from backend work usually already know a message queue — RabbitMQ, AWS SQS,
          Azure Service Bus. It is natural to assume Kafka is &quot;just another queue with a fancier
          name.&quot; It is not, and the difference is not cosmetic — it changes what kinds of systems you
          can build on top of it.
        </Para>

        <Para>
          A traditional queue is destructive on read. A message is placed in the queue; a worker pulls it
          out; the moment that worker acknowledges it, the message is gone from the queue forever. This is
          exactly the right model for distributing work across a pool of interchangeable workers — a
          queue of &quot;resize this image&quot; jobs, a queue of &quot;send this email&quot; jobs. Each
          job should be done exactly once, by exactly one worker, and then it should disappear. If you
          connect a second, independent worker pool to that same queue expecting it to also see every job,
          it will not — the two pools will simply compete for the same messages, each job going to
          whichever pool happens to grab it first.
        </Para>

        <Para>
          Kafka's topic is a durable, ordered, non-destructive log. Reading does not remove anything.
          Multiple independent consumer groups can each read the entire topic, each maintaining their own
          separate position, without affecting each other at all. This is why Kafka naturally supports
          fan-out — one event reaching many unrelated systems — in a way a plain queue does not, without
          resorting to duplicating the message into N separate queues at write time.
        </Para>

        <Table
          headers={['', 'Traditional queue (RabbitMQ / SQS)', 'Kafka topic']}
          rows={[
            ['Read semantics', 'Destructive — message removed once delivered/acked.', 'Non-destructive — message stays; every subscriber can read it.'],
            ['Fan-out to many independent readers', 'Requires separate queues per consumer, or fan-out exchange config.', 'Native — any number of consumer groups read the same topic independently.'],
            ['Replay / re-read history', 'Not possible — the message is gone after delivery.', 'Yes — reset a consumer group\'s offset and re-read any retained history.'],
            ['Ordering', 'FIFO per queue; broker-dependent guarantees under retries.', 'Strict order within a partition (Module 02 covers this in depth).'],
            ['Typical use', 'Distributing discrete units of work across a worker pool.', 'Broadcasting a fact so many independent systems can each react.'],
            ['Retention after delivery', 'None by design — delivered messages are gone.', 'Configurable — minutes to forever, independent of whether anyone has read it.'],
          ]}
        />

        <Callout title="Tip" color="#22c55e">
          This is not a claim that Kafka is strictly &quot;better.&quot; A traditional queue is often the
          simpler, more correct choice for pure task distribution — send-this-email, resize-this-image,
          charge-this-card-once. Kafka is the better fit when the defining requirement is that an event
          needs to be seen by multiple, independent, evolving sets of consumers, or when replay is a hard
          requirement. Choosing between them is a design decision, not a maturity ladder.
        </Callout>

        <CodeBox label="the same scenario, played out on a queue vs. a Kafka topic">
{`# Scenario: an order is placed. Three teams eventually want to react to it.

## On a traditional queue (destructive read):
producer -> queue "order-jobs"
worker-A pulls the message -> message is now GONE from the queue
worker-B connects later, expecting to also react -> sees nothing, message already taken
# Fix requires either 3 separate queues (fan-out exchange) or redesigning entirely

## On a Kafka topic (non-destructive read):
producer -> topic "orders"
billing-group reads it   -> still in the topic
warehouse-group reads it -> still in the topic, billing-group's read did not remove it
fraud-group joins 6 months later -> resets to offset 0, reads full history, no redesign needed`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Kafka vs. a database" />
        <SectionTitle>How Kafka Differs From a Database</SectionTitle>

        <Para>
          The other comparison beginners reach for is a database. Both store data durably. Both can be
          queried by multiple applications. But they answer fundamentally different questions. A database
          is optimized to answer &quot;what is true right now?&quot; — what is this customer's current
          address, what is this product's current price, what is the current balance of this account. To
          answer that question fast, a database typically overwrites old values with new ones and builds
          indexes over the current state.
        </Para>

        <Para>
          Kafka is optimized to answer a different question: &quot;what happened, in what order?&quot;
          It is a history of facts, not a snapshot of current state. It does not offer arbitrary indexed
          queries — you cannot ask a raw Kafka topic &quot;show me all orders over $500 placed by
          customers in California,&quot; the way you could a SQL database. What Kafka gives you instead is
          a durable, ordered, replayable record of every change that ever happened, which downstream
          systems can consume to build exactly the queryable views they need.
        </Para>

        <Para>
          In practice, most real architectures use both, not one instead of the other. A service writes
          events to Kafka. Multiple downstream systems each consume those events and build their own
          database — a search index, an analytics warehouse, a materialized cache, a fraud-scoring model's
          feature store — each shaped for its own query needs. Kafka carries the facts; databases store
          the queryable current state built from those facts. This pattern even has a name — event sourcing,
          when a system's database of record is itself rebuilt by replaying a Kafka topic from the
          beginning — though that is a deeper topic than this module needs to cover.
        </Para>

        <Table
          headers={['Question', 'Database', 'Kafka']}
          rows={[
            ['What is true right now?', 'This is exactly what a database is built for.', 'Not directly — Kafka holds history, not an indexed current-state snapshot.'],
            ['What happened, and in what order?', 'Possible with audit tables, but not the primary design goal.', 'This is exactly what Kafka is built for.'],
            ['Can I run an arbitrary filtered query?', 'Yes — indexes, joins, WHERE clauses.', 'No — Kafka is sequential read by offset, not a query engine.'],
            ['Can many independent systems replay the full history?', 'Not typically — old row versions are usually gone after an update.', 'Yes, within the retention window — this is a core Kafka capability.'],
          ]}
        />

        <Para>
          A pattern worth naming explicitly, because you will see it repeatedly once you start reading
          real system diagrams: change data capture, or CDC. A CDC connector watches a database's internal
          change log (for example Postgres's write-ahead log) and publishes every row insert, update, and
          delete as a Kafka event, in order, without the application code that owns the database needing
          to change at all. This turns a database's private internal history into a shared, replayable
          Kafka stream that other systems can consume — a very common bridge between the &quot;current
          state&quot; world of databases and the &quot;what happened&quot; world of Kafka. It is not a
          topic this module goes deep on, but recognizing the term will help the rest of this track's later
          data-pipeline material make sense faster.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The core vocabulary" />
        <SectionTitle>Eight Words You Must Own Before Anything Else Makes Sense</SectionTitle>

        <Para>
          The rest of the Kafka track goes deep on each of these individually — events and partitions get
          their own full module (Module 02), producers/consumers/brokers get their own full module
          (Module 03). Here, you need a correct, working definition of each word — not the full depth,
          just enough that the vocabulary stops being a wall of jargon.
        </Para>

        <SubTitle>Event (record)</SubTitle>
        <Para>
          A fact that already happened, written as a key, a value, a timestamp, and optional headers.
          Named in the past tense: <strong>OrderPlaced</strong>, not <strong>PlaceOrder</strong>.
        </Para>

        <SubTitle>Topic</SubTitle>
        <Para>
          A named stream of related events — <code>orders</code>, <code>payments</code>,
          <code>user-clicks</code>. Producers write to a topic; consumers read from a topic. A topic is
          the unit of organization, not the unit of storage — that is the partition.
        </Para>

        <SubTitle>Partition</SubTitle>
        <Para>
          One topic is physically split into one or more partitions, each its own independent ordered log.
          Partitions are how Kafka parallelizes writes and reads across machines. Order is guaranteed
          within a partition, not across the whole topic.
        </Para>

        <SubTitle>Producer</SubTitle>
        <Para>
          An application that writes events to Kafka — a checkout service, a mobile backend, an IoT
          gateway, a database change-data-capture connector.
        </Para>

        <SubTitle>Consumer</SubTitle>
        <Para>
          An application that reads events from Kafka, at its own pace, tracking its own read position.
        </Para>

        <SubTitle>Broker</SubTitle>
        <Para>
          A single Kafka server. A group of brokers working together is a <strong>cluster</strong>. Brokers
          store partition data on disk, serve reads and writes, and replicate data to each other.
        </Para>

        <SubTitle>Offset</SubTitle>
        <Para>
          A position number within one partition — the 0th record, the 1st, the 2nd, and so on. A
          consumer's entire progress state is just &quot;which offset have I processed up to,&quot; per
          partition it reads.
        </Para>

        <SubTitle>Replication</SubTitle>
        <Para>
          Each partition's data is copied to more than one broker, so that if one broker's disk or machine
          fails, the data still exists elsewhere and the partition keeps serving reads and writes.
        </Para>

        <CodeBox label="one simple Kafka story, using all eight words">
{`checkout-service (a producer) produces an event:
  topic: orders
  key: order-1024
  value: {"event_type":"OrderPlaced","order_id":"1024","total_usd":149.00}

the orders topic has 6 partitions, replicated across a 3-broker cluster
kafka appends this event to:
  orders partition 2, offset 88112
  (replicated onto 3 brokers so no single machine failure can lose it)

independent consumers (each its own application) read it at their own pace:
  billing-consumer-group
  warehouse-consumer-group
  analytics-consumer-group
  support-dashboard-consumer-group`}
        </CodeBox>

        <Output>{`# What each consumer group tracks independently, days later:
billing-consumer-group     committed offset: 88112 (has processed this event)
analytics-consumer-group   committed offset: 88050 (still catching up, 62 events behind)
support-dashboard-group    committed offset: 88112 (also caught up, different pace than billing)

# None of these consumer groups affected each other's progress.
# The event at offset 88112 still exists in the log for all of them.`}</Output>

        <Para>
          Notice which of these eight words describe something a producer or consumer application does
          (event, producer, consumer, offset), and which describe something the Kafka cluster itself
          provides (topic, partition, broker, replication). Keeping that split straight helps when you
          are debugging: if something is wrong with which events exist or what they contain, look at the
          producer. If something is wrong with reading progress, look at the consumer. If something is
          wrong with data being available, durable, or fast, look at the broker/partition/replication
          layer. This module's sibling module, Module 03, is organized around exactly that same split.
        </Para>

        <Table
          headers={['Term', 'Who/what it belongs to', 'One-line job']}
          rows={[
            ['Event', 'Written by a producer', 'Carries one immutable fact.'],
            ['Topic', 'Defined on the cluster', 'Names and organizes a category of events.'],
            ['Partition', 'Physically stored on a broker', 'One ordered log; the unit of parallelism.'],
            ['Producer', 'An application', 'Writes events into a topic.'],
            ['Consumer', 'An application', 'Reads events from a topic at its own pace.'],
            ['Broker', 'A Kafka server', 'Stores, serves, and replicates partition data.'],
            ['Offset', 'Tracked per partition, per consumer group', 'Marks read/write position within one partition.'],
            ['Replication', 'Configured on the cluster', 'Copies partition data across brokers for durability.'],
          ]}
        />

        <SubTitle>What each consumer actually does with the same event</SubTitle>
        <Para>
          It is worth spelling out concretely how differently each consumer can react to the exact same
          bytes, because this is the payoff of designing events as facts rather than commands. The billing
          consumer reads <code>OrderPlaced</code> and initiates a charge. The warehouse consumer reads the
          same event and creates a picking task. The analytics consumer reads it and increments a revenue
          counter in a dashboard. The fraud consumer reads it and runs a risk score. None of these four
          consumers call each other, know about each other, or depend on each other&apos;s outcome — each
          one independently decides what the fact <code>OrderPlaced</code> means for its own job. If
          checkout had instead published four separate commands (&quot;ChargeCard&quot;,
          &quot;CreatePickTask&quot;, &quot;LogRevenue&quot;, &quot;RunFraudCheck&quot;), adding a fifth
          consumer later — say, a loyalty-points service — would require checkout to add a fifth explicit
          call. Publishing one fact instead means the fifth consumer just subscribes; checkout&apos;s code
          does not change.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Why companies adopt Kafka" />
        <SectionTitle>Decoupling, Replay, Fan-Out, Durability, Throughput — The Business Case</SectionTitle>

        <Para>
          It is worth being explicit about why real engineering organizations choose to run Kafka — not as
          an abstract technical exercise, but because it solves specific, expensive problems that show up
          once a company has more than a handful of services.
        </Para>

        <SubTitle>Decoupling</SubTitle>
        <Para>
          Teams stop needing to coordinate deploys with every downstream consumer of their data. The
          producer only needs to agree on an event contract, not on every consumer's implementation
          details, uptime, or release schedule.
        </Para>

        <SubTitle>Replay</SubTitle>
        <Para>
          When a downstream bug is discovered, or a brand-new system needs to be backfilled with history,
          replaying retained events is dramatically cheaper and safer than rebuilding from database
          snapshots, backups, or asking every upstream team to re-send data manually.
        </Para>

        <SubTitle>Fan-out</SubTitle>
        <Para>
          One event, written once, can be consumed by an arbitrary number of current and future systems —
          without the producer changing a single line of code when the fifth, sixth, or twentieth consumer
          is added.
        </Para>

        <SubTitle>Durability</SubTitle>
        <Para>
          Replicated, disk-backed storage means an event that has been acknowledged as written will
          survive the loss of any single machine — a guarantee that ad hoc in-memory queues or direct
          network calls simply cannot offer.
        </Para>

        <SubTitle>Throughput</SubTitle>
        <Para>
          Because the log's storage model is sequential appends and sequential reads (explained fully in
          the data-engineering message-broker internals module), a modest Kafka cluster can sustain
          millions of events per second — far beyond what synchronous request-response call chains can
          absorb without falling over.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Senior engineer framing:</strong> Do not ask &quot;should we use Kafka?&quot; in the
            abstract. Ask: what facts are being produced? Who needs them, and how many independent
            consumers are there? How quickly do consumers need the data? In what order does it matter? How
            long must history be retained or replayable? Kafka is the right answer specifically when those
            requirements line up with decoupling, replay, fan-out, durability, and throughput — not simply
            because a system is &quot;distributed&quot; or &quot;real-time.&quot;
          </Para>
        </HighlightBox>

        <Table
          headers={['Reason companies adopt Kafka', 'What breaks without it', 'A concrete example']}
          rows={[
            ['Decoupling', 'Every new consumer requires a producer code change and coordinated deploy.', 'Stripe adding a new fraud-signal consumer without touching the payments service.'],
            ['Replay', 'A downstream bug means permanently wrong data, or a painful manual restore.', 'Netflix reprocessing a day of viewing events after a recommendation-model bug.'],
            ['Fan-out', 'The producer must know and call every consumer directly, one by one.', 'DoorDash\'s order event reaching notifications, fraud, and analytics with one write.'],
            ['Durability', 'A crashed service between "sent" and "received" silently loses data.', 'A payment event surviving a broker machine failure because it was replicated.'],
            ['Throughput', 'A synchronous call chain collapses under peak load instead of absorbing it.', 'Uber\'s location-update stream sustaining millions of events per second at peak.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Where Kafka came from" />
        <SectionTitle>A Short, Real History — LinkedIn, Apache, and the Ecosystem Today</SectionTitle>

        <Para>
          Kafka was created at LinkedIn starting around 2010, by a team that included Jay Kreps, Neha
          Narkhede, and Jun Rao. LinkedIn's problem was exactly the one described in Part 02: dozens of
          internal systems needed the same streams of activity data — page views, profile updates,
          connection events — and the existing point-to-point pipelines and batch ETL jobs had become
          unmanageable, slow to extend, and unreliable for anything approaching real time. The team built
          Kafka specifically to be that shared, durable, replayable backbone, named after the writer Franz
          Kafka (reportedly because Jay Kreps liked his work and wanted a name evocative of a
          &quot;writing-heavy&quot; system).
        </Para>

        <Para>
          LinkedIn open-sourced Kafka in 2011, and it was donated to the Apache Software Foundation, where
          it became a top-level Apache project — this is why it is formally called Apache Kafka, and why
          &quot;Apache Kafka&quot; and &quot;Kafka&quot; refer to the same open-source project. Several of
          its original creators later founded Confluent, a company built around commercial Kafka tooling,
          managed cloud offerings, and enterprise support — but Kafka itself has remained an open,
          community-governed Apache project, not something owned by any single company.
        </Para>

        <Para>
          Today the Kafka ecosystem is broad. You will encounter Kafka in several forms: self-managed open-
          source Kafka running on your own servers or Kubernetes; managed cloud offerings such as Confluent
          Cloud, Amazon MSK (Managed Streaming for Apache Kafka), and equivalents on other clouds, which
          run and operate the brokers for you; and Kafka-API-compatible alternatives such as Redpanda,
          which reimplement the Kafka protocol with a different internal engine. On top of core Kafka sits
          an ecosystem of related tools — Kafka Connect for moving data in and out of Kafka without custom
          code, Kafka Streams and ksqlDB for processing events as they arrive, and Schema Registry for
          enforcing event contracts as they evolve. This track will introduce several of these in later
          modules; for now, know that &quot;Kafka&quot; in a modern job posting usually means this whole
          ecosystem, not only the open-source broker software.
        </Para>

        <Table
          headers={['Term', 'What it actually is']}
          rows={[
            ['Apache Kafka', 'The open-source, Apache-governed event streaming platform itself — the project this track teaches.'],
            ['Confluent', 'A company founded by Kafka\'s original creators; sells managed Kafka cloud service and enterprise tooling built around it.'],
            ['Amazon MSK', 'AWS\'s managed Kafka service — AWS runs and patches the brokers; you use the Kafka API as normal.'],
            ['Redpanda', 'A Kafka-API-compatible streaming platform with a different underlying engine, not built on the original Kafka codebase.'],
            ['Kafka Connect / Streams / ksqlDB', 'Companion tools in the ecosystem for moving data in/out of Kafka and processing it — built on top of core Kafka.'],
          ]}
        />

        <Para>
          One more piece of history worth knowing because it still shapes how you configure Kafka today:
          for its first decade, Kafka depended on Apache ZooKeeper, a separate distributed coordination
          system, to manage cluster metadata and broker leadership elections. Starting with KRaft (Kafka
          Raft), which became production-ready and the default in Kafka 3.x/4.x, Kafka replaced that
          external dependency with a built-in consensus protocol, so a modern Kafka cluster no longer
          requires running ZooKeeper alongside it. If you read older tutorials, blog posts, or job
          postings that mention ZooKeeper, that reflects the pre-KRaft architecture — still valid
          historical context, but not how new Kafka clusters are typically deployed today.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Kafka is not magic" />
        <SectionTitle>What Kafka Does — and What Kafka Does Not Do Automatically</SectionTitle>

        <Table
          headers={['Kafka does', 'Kafka does not automatically do']}
          rows={[
            ['Store event streams durably, replicated across machines', 'Decide what your business events should mean, or design your event contracts'],
            ['Let many independent consumer groups read the same topic', 'Guarantee every external database write happens exactly once end to end'],
            ['Scale reads and writes with partitions', 'Preserve total ordering across all of a topic\'s partitions'],
            ['Replicate data across brokers for durability', 'Remove the need for backups, monitoring, security, and operational runbooks'],
            ['Allow replay while data is retained', 'Keep data forever, unless retention is explicitly configured that way'],
            ['Provide rich client and broker configuration options', 'Choose the right settings for your business risk automatically'],
          ]}
        />

        <Para>
          This distinction matters because Kafka is often marketed and discussed as if it solves every
          real-time or distributed-systems problem by itself. It does not. Kafka is a powerful storage and
          transport layer for event streams. Your applications still need thoughtful schema design,
          idempotent processing logic, deliberate error handling, monitoring and alerting, access control,
          and capacity planning. Kafka gives you the primitives; it does not give you the architecture.
        </Para>

        <Callout title="A common early mistake" color="#ef4444">
          Teams new to Kafka sometimes adopt it because it is the &quot;industry standard&quot; for
          real-time data, without first asking whether their problem actually needs replay, fan-out to
          multiple independent consumers, or the throughput Kafka is built for. If a single synchronous
          API call or a simple background job queue would solve the problem more simply, Kafka adds
          operational cost — brokers to run, partitions to size, consumer lag to monitor — without a
          matching benefit.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Putting it all together" />
        <SectionTitle>The Whole Picture, and When Kafka Is (and Isn&apos;t) the Right Tool</SectionTitle>

        <SubTitle>Kafka is usually a strong fit when:</SubTitle>
        <BulletList
          items={[
            'Multiple systems need the same events independently, now or in the future.',
            'You need replayable history, not only one-time message delivery.',
            'Event volume is high enough that durable streaming infrastructure genuinely matters.',
            'Consumers may be offline, or run slower than producers, and must still catch up safely.',
            'You are building real-time pipelines, change-data-capture flows, event-driven services, or streaming analytics.',
            'Ordering matters per business entity — per order, account, customer, or device — not necessarily globally.',
          ]}
        />

        <SubTitle>Kafka may be the wrong tool when:</SubTitle>
        <BulletList
          items={[
            'You only need a simple background job queue for one small app with one consumer.',
            'You need complex ad hoc querying directly over the data — that is a database\'s job.',
            'Your team cannot yet operate or justify the operational complexity of running or paying for Kafka.',
            'The data is tiny, infrequent, and does not need replay or fan-out.',
            'A normal synchronous database transaction or a direct API call would be simpler and just as reliable.',
          ]}
        />

        <Para>
          A useful way to stress-test the decision: write down, honestly, how many independent consumers
          this data has today, and how many you can genuinely foresee within the next year. If the answer
          is &quot;one, and it's not changing,&quot; a direct call or a simple queue usually wins on
          simplicity. If the answer is &quot;several today, and this is exactly the kind of fact other
          teams will want later,&quot; that is the shape of problem the rest of this Kafka track is built
          to solve.
        </Para>

        <HighlightBox>
          <Para>
            Apache Kafka is a distributed, durable, replayable event log. Applications write facts to
            Kafka. Kafka stores those facts in topics split into partitions, replicated across brokers so
            no single machine failure loses data. Consumers read at their own pace and track offsets.
            Consumer groups let readers scale horizontally. Retention controls how long history remains.
            Keys influence partition placement and ordering. This module gave you a correct, if not
            exhaustive, picture of every one of those pieces — Module 02 goes deep on events, topics, and
            partitions, and Module 03 goes deep on how producers, consumers, and brokers actually talk to
            each other over the network.
          </Para>
        </HighlightBox>

        <Table
          headers={['If someone says...', 'What they likely mean', 'What to check']}
          rows={[
            ['"We use Kafka for messaging"', 'Could mean anything from task queues to full event streaming — very imprecise.', 'Ask: is this destructive-read task distribution, or non-destructive fan-out with replay?'],
            ['"Our service is event-driven"', 'Usually means services react to events rather than direct calls.', 'Ask: are the events facts (OrderPlaced) or disguised commands (ChargeCustomerNow)?'],
            ['"We need real-time data"', 'Often really means "not overnight batch," not literally sub-second.', 'Ask: what actual latency is required, and does the volume justify Kafka\'s operational cost?'],
          ]}
        />

        <SubTitle>Interview-level explanation</SubTitle>
        <Para>
          If someone asks &quot;What is Kafka?&quot; in an interview, answer like this: Kafka is a
          distributed event streaming platform built around an append-only log. Producers write records to
          topics. Topics are split into partitions for scalability and for ordering within each partition.
          Brokers store and replicate partitions across a cluster. Consumers read records using offsets,
          and consumer groups allow parallel processing across partitions. Kafka is used when systems need
          durable, replayable, high-throughput event streams that many independent applications can
          consume — as opposed to a traditional queue, which delivers each message to exactly one
          consumer and then discards it.
        </Para>

        <SubTitle>Non-technical explanation</SubTitle>
        <Para>
          If you need to explain Kafka to a non-technical person, say this: Kafka is a reliable timeline
          for business events. When something important happens, such as an order being placed, Kafka
          records it durably. Other teams can read that record whenever they need it, even much later.
          This keeps systems from constantly calling each other directly and makes it much easier to
          recover if one system is slow or temporarily unavailable — nothing gets lost while it catches
          up.
        </Para>

        <Para>
          Carry three things forward into Module 02: an event is a fact, not an instruction; ordering and
          parallelism live in tension with each other, mediated by partitions; and Kafka is a deliberate
          choice with real operational cost, not a default reach for anything that touches more than one
          service. Module 02 takes the event, topic, and partition vocabulary introduced here and gives
          each one the full depth this introductory module intentionally left for later.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Apache Kafka</SectionTitle>

        {[
          {
            wrong: '"Kafka is basically just a faster message queue"',
            right: 'Part 04 draws the actual line: a traditional queue is destructive on read (one consumer, then gone) while a Kafka topic is a non-destructive, replayable log that many independent consumer groups can each read fully. Speed is not the differentiator — replay and fan-out are.',
          },
          {
            wrong: '"Kafka guarantees events are processed in the order they happened, across the whole topic"',
            right: 'Part 06 and Part 10 are explicit that ordering is only guaranteed within a single partition, not across a topic\'s partitions as a whole. Module 02 goes deep on exactly why partitions exist and what that ordering boundary means in practice.',
          },
          {
            wrong: '"You should default to Kafka whenever you need real-time or event-driven behavior"',
            right: 'Part 09\'s callout is direct about this: adopting Kafka because it is the "industry standard" without checking whether you actually need replay, fan-out to multiple independent consumers, or Kafka-scale throughput adds real operational cost with no matching benefit. Part 10\'s two checklists exist precisely to make this a deliberate decision.',
          },
          {
            wrong: '"Once data is in Kafka, it\'s safely stored forever, like a database backup"',
            right: 'Part 09\'s comparison table is explicit: Kafka does not keep data forever unless retention is configured that way. By default, topics have a retention window, and data older than that window is deleted regardless of whether every consumer has read it.',
          },
          {
            wrong: '"Kafka replaces the need for a database in an event-driven system"',
            right: 'Part 05 explains the actual relationship: Kafka answers "what happened, in what order," while a database answers "what is true right now" with indexed, queryable access. Real systems use both — Kafka carries the facts, downstream databases build the queryable views from them.',
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
            <strong>At Netflix:</strong> you join the team responsible for viewing-activity events —
            every play, pause, and stop across the platform. On your first day, you learn this single
            event stream feeds recommendation models, A/B test analysis, billing/usage tracking, content-
            licensing reporting, and real-time playback quality dashboards — five completely separate
            teams, none of which coordinate deploys with each other or with the playback service that
            produces the events. Your first instinct, from a REST-API background, is to ask &quot;how does
            the playback service know to call all five of those teams?&quot; The answer is that it
            doesn&apos;t — it writes one event to one Kafka topic, and every team reads independently. That
            is Part 02 and Part 07 of this module, not an abstraction — it is literally how the system in
            front of you is built.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At Robinhood:</strong> a trading-activity dashboard is showing numbers that don&apos;t
            match what actually happened yesterday. Your manager asks you to &quot;just re-run
            yesterday&apos;s data through the fixed code.&quot; Coming from a database-only background,
            your instinct is to ask if there\'s a backup to restore from. There isn\'t — and there doesn\'t
            need to be. The trade-execution events are still sitting in Kafka, retained for 14 days
            specifically to support this exact scenario. You reset the consumer group\'s offset to
            midnight yesterday and let it replay. This is Part 03\'s replay guarantee turning into an
            actual afternoon\'s work instead of a multi-day incident.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> you are asked to design a ride-sharing app\'s
            backend — specifically, how the driver-location service should notify the rider\'s app, the
            ETA-calculation service, the surge-pricing service, and the trip-history archive, every time a
            driver\'s location updates. A weak answer reaches for four separate HTTP calls from the
            location service. The strong answer, straight out of Part 02 and Part 06 of this module,
            recognizes that a single fact — DriverLocationUpdated — needs independent fan-out to four
            unrelated, evolving consumers, at very high frequency, and names Kafka specifically because of
            that shape: one producer, many independent consumer groups, no coupling between them.
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
            q: 'Q1. In your own words, what is Apache Kafka, and what specific problem does it solve that a REST API cannot?',
            a: `Kafka is a distributed event streaming platform built around a durable, append-only, replayable log. Producers write events — immutable facts, not commands — and any number of independent consumers can read those events at their own pace, without the producer knowing or caring who is reading.

The specific gap it fills, covered in Part 02, is asynchronous, cross-system fan-out. A REST API is built for synchronous request-response: one caller, one immediate answer, tight coupling to the callee's uptime and response time. Kafka is built for the opposite shape of problem — one fact, many independent, evolving consumers, none of which need to be online or fast at the moment the fact is produced. Trying to solve fan-out with direct REST calls means the producer ends up coupled to every consumer's failure modes and deploy schedule, which is exactly the pain that historically pushed companies like LinkedIn toward building Kafka in the first place, per Part 08.`,
          },
          {
            q: 'Q2. How is Kafka different from a traditional message queue like RabbitMQ or SQS? When would you actually choose the queue instead?',
            a: `The core difference, from Part 04, is what happens when a message is read. A traditional queue is destructive — once a worker takes a message, it's gone, which is exactly right for distributing discrete units of work across a pool of interchangeable workers. A Kafka topic is a non-destructive, durable log — reading doesn't remove anything, and any number of independent consumer groups can each read the full stream at their own pace.

I'd choose a traditional queue when the requirement really is task distribution — send this email once, resize this image once, charge this card once — and there is exactly one logical consumer of each unit of work, with no need to replay history. I'd choose Kafka when multiple independent systems need to see the same event, potentially systems that don't exist yet, or when replaying history is a real requirement, not a nice-to-have.`,
          },
          {
            q: 'Q3. Someone on your team says "Kafka is basically a database for events." Is that accurate? How would you correct or refine it?',
            a: `It's a half-truth I'd refine rather than reject outright. Both Kafka and a database store data durably and serve multiple readers, but they answer different questions, which is the core of Part 05. A database is optimized to answer "what is true right now" — it typically overwrites old state with new state and builds indexes for fast, arbitrary queries. Kafka is optimized to answer "what happened, and in what order" — it's a sequential, replayable history of facts, not an indexed queryable snapshot.

In practice I've seen both used together, not as substitutes: a service publishes events to Kafka, and downstream systems each consume those events to build their own database or index shaped for their own query needs — a search index, a warehouse table, a cache. That pattern, sometimes called event sourcing, is the more accurate way to describe the relationship than calling Kafka "a database."`,
          },
          {
            q: 'Q4. Walk me through why a company like LinkedIn needed to build Kafka instead of using existing tools at the time.',
            a: `Per Part 08, LinkedIn around 2010 had dozens of internal systems that all needed the same streams of activity data — page views, profile updates, connection events. The existing approach was a mix of point-to-point pipelines and batch ETL jobs, and as the number of producers and consumers grew, that approach became unmanageable: every new consumer meant coordinating with the producer, batch jobs meant hours of latency instead of near-real-time, and there was no clean way to replay history when a downstream system needed to rebuild state.

Kafka was purpose-built to be the shared, durable, replayable backbone underneath all of those systems — one place to write a fact once, and let any number of current or future consumers read it independently, at their own pace, with the option to replay. That specific pain — N producers times M consumers becoming an unmanageable web of direct integrations — is the same pain any growing engineering org eventually runs into, which is why Kafka spread well beyond LinkedIn after being open-sourced and donated to the Apache Software Foundation.`,
          },
          {
            q: 'Q5. What are the risks of adopting Kafka for a system that doesn\'t actually need it?',
            a: `The risk is pure operational cost without a matching benefit, which is what Part 09 and Part 10's "when Kafka is the wrong tool" checklist are both about. Running Kafka well means sizing and operating brokers (or paying for a managed service), choosing sensible partition counts, monitoring consumer lag, managing retention and disk usage, and handling schema evolution across producers and consumers — none of that is free, and all of it is unnecessary complexity if the actual requirement is "one producer, one consumer, no replay needed."

I'd push back on defaulting to Kafka just because it's an industry-standard name, and instead ask the questions Part 10 lays out: do multiple independent systems actually need this event, is replay a real requirement, and is the volume high enough that a durable streaming platform is actually solving a real problem rather than adding one. If the honest answers are "no" across the board, a simple queue, or even a direct API call, is very often the more correct engineering decision.`,
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
            q: 'Treating "Kafka" and "message queue" as interchangeable terms',
            a: 'Part 04\'s comparison table exists because this confusion leads directly to design mistakes — assuming a Kafka read removes the message (it doesn\'t), or assuming a plain queue supports replay and independent fan-out (it doesn\'t). Learn the actual distinction before reaching for either.',
          },
          {
            q: 'Assuming Kafka guarantees strict ordering across an entire topic',
            a: 'Part 06 and Part 10 are explicit that ordering is guaranteed within a partition, not across the whole topic. This is one of the single most common production surprises for engineers new to Kafka — Module 02 is dedicated to explaining exactly why this boundary exists and how to design around it.',
          },
          {
            q: 'Reaching for Kafka by default, without checking whether the problem actually needs replay or fan-out',
            a: 'Part 09\'s warning callout and Part 10\'s two checklists cover this directly — adopting Kafka for a single-producer, single-consumer, no-replay-needed use case adds real operational overhead (partition sizing, lag monitoring, schema management) with no corresponding benefit.',
          },
          {
            q: 'Assuming data written to Kafka is retained forever, like a database row',
            a: 'Part 09\'s comparison table is explicit that retention is configurable, not infinite by default. A topic with a 7-day retention window will silently delete older data regardless of whether every consumer has read it — this needs to be a deliberate setting, not an assumption.',
          },
          {
            q: 'Trying to use Kafka as a queryable database instead of pairing it with one',
            a: 'Part 05 makes the distinction explicit: Kafka does not offer indexed, arbitrary queries the way a database does. The correct pattern, used across real production systems, is to consume Kafka events into a database, search index, or cache shaped for the queries you actually need — not to query the raw topic directly.',
          },
          {
            q: 'Assuming Kafka automatically prevents duplicate processing or exactly-once delivery out of the box',
            a: 'Part 09\'s comparison table is direct about this: Kafka does not automatically guarantee every external database write happens exactly once end to end. That requires deliberate producer and consumer design — idempotent producers, careful offset-commit timing, and sometimes transactions — which Module 03 and the data-engineering broker-internals module cover in depth. Treating "we use Kafka" as sufficient exactly-once guarantee on its own is a common and costly assumption.',
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
        <SectionTitle>Confusions and Symptoms You Will Actually Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `"Why doesn't my second consumer group see any of the events the first one already read?" — a new team builds a consumer, subscribes, and sees nothing until new events arrive`,
            cause: 'The new consumer group was created with the default starting offset behavior (often "latest"), which means it begins reading only from events produced after it first connects — it is not reading destructively, but it also isn\'t automatically reading history unless told to.',
            fix: 'Set the consumer group\'s auto.offset.reset to "earliest" before its first run if it needs to read existing history, or explicitly seek to a specific offset/timestamp. This is a configuration choice, not a Kafka limitation — per Part 03 and Part 06, the events are still there; the consumer just needs to be told where to start reading from.',
          },
          {
            error: `A teammate asks "why did my message disappear? I read it in a test script and now it's gone from the topic" after using a client library configured against SQS instead of Kafka in a quick prototype`,
            cause: 'This usually happens when someone prototypes against the wrong kind of system, or misremembers Kafka\'s read semantics from a queue background. Reading from Kafka is non-destructive by design — nothing should "disappear" from a topic just because one consumer read it.',
            fix: 'Verify which system is actually being used, and confirm the consumer\'s offset commit behavior. If events genuinely are missing, check retention settings (Part 09) — they may have simply aged out of the retention window, which is a separate, legitimate reason data can be gone, distinct from the read itself removing it.',
          },
          {
            error: `"Our dashboard shows events from partition 3 arriving out of order relative to partition 1" flagged as a Kafka bug in a bug tracker`,
            cause: 'This is expected behavior, not a bug. Per Part 06 and Part 10, Kafka only guarantees ordering within a single partition. Events across different partitions have no ordering guarantee relative to each other, even if they were produced moments apart.',
            fix: 'This is a design question, not a defect: if true ordering across those entities matters, they need to share a partition (typically by using the same event key), which Module 02 covers in depth. If ordering across partitions genuinely doesn\'t matter for the use case, the "bug" report should be closed as expected behavior with an explanation.',
          },
          {
            error: `A new hire asks "can we just query the orders topic for all orders over $500?" during a sprint planning meeting, expecting Kafka to behave like a SQL table`,
            cause: 'This comes from treating Kafka like a database, which Part 05 addresses directly — Kafka does not provide indexed, filtered, arbitrary queries over its stored events. It only supports sequential reads by offset within a partition.',
            fix: 'Redirect the requirement to the correct tool: consume the orders topic into a database or search index that supports the needed queries (this is the standard pattern, and later Kafka Streams / ksqlDB modules cover doing this processing in a stream-native way), rather than trying to query the raw topic directly.',
          },
          {
            error: `A proof-of-concept using Kafka for a single internal cron job's task queue is flagged in review as "why does this need a whole Kafka cluster?"`,
            cause: 'The reviewer is correctly applying Part 09 and Part 10\'s decision framework — this use case has exactly one producer and one consumer, no replay requirement, and low volume. Kafka\'s operational cost (partition sizing, lag monitoring, a running cluster) has no matching benefit here.',
            fix: 'Replace it with the simplest tool that fits: a plain background job queue, a scheduled task, or even a direct function call, depending on the actual requirement. Reserve Kafka for cases that genuinely need decoupling, replay, or fan-out to multiple independent consumers, per Part 07\'s adoption table.',
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
          'Kafka is a distributed, durable, replayable event log — not merely a message queue with a different name. An event is an immutable fact, and reading it does not remove it.',
          'Direct request-response APIs break down for asynchronous, cross-system fan-out because they couple the producer to every consumer\'s uptime, speed, and deploy schedule. Kafka decouples producers and consumers in time, space, and rate.',
          'Kafka is built on the log: an append-only, ordered, non-destructive data structure. This one design choice is what makes replay, independent fan-out, and durability possible.',
          'A traditional queue (RabbitMQ, SQS) is destructive on read and best for distributing discrete work items. A Kafka topic is non-destructive and best for broadcasting facts to many independent, evolving consumers.',
          'Kafka answers "what happened, in what order" — a database answers "what is true right now." Real systems typically use both together, not one instead of the other.',
          'The core vocabulary — event, topic, partition, producer, consumer, broker, offset, replication — is introduced here at a working level; Module 02 goes deep on events/topics/partitions, and Module 03 goes deep on how producers, consumers, and brokers interact.',
        ]}
      />
    </LearnLayout>
  )
}
