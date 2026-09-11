import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

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
  <div style={{ marginBottom: 24 }}>
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

export default function KafkaInterviewSystemDesign() {
  return (
    <LearnLayout
      title="Kafka Interview and System Design Guide"
      description="The capstone module for the Apache Kafka track: full worked system-design interview questions synthesizing partitioning, delivery semantics, schema design, consumer groups, and monitoring, plus a complete vocabulary cheat sheet, common interview traps, and rapid-fire conceptual Q&A."
      section="Apache Kafka — Module 24"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Kafka Interview and System Design Guide', href: '/learn/apache-kafka/kafka-interview-system-design' },
      ]}
      prev={{ title: 'Testing and Debugging Kafka Systems', href: '/learn/apache-kafka/testing-debugging' }}
    >
      {/* ── Opening ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Capstone Module" />
        <SectionTitle>You Have Learned All 23 Modules. Here Is How It Comes Together.</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>This module is different from the previous 23.</strong> It does not introduce new Kafka
            mechanics. It is a synthesis — a place where partitioning strategy, delivery semantics, schema
            design, consumer group topology, and monitoring all show up together, the way they actually do
            in a real system-design interview or a real production architecture review, instead of one
            concept at a time.
          </Para>
          <Para>
            A Kafka system-design interview almost never asks "what does <code>acks=all</code> do." It asks
            "design a real-time analytics pipeline for a ride-sharing app's driver locations," and expects
            you to arrive at <code>acks=all</code> — and a partitioning key, and a retention policy, and a
            consumer group topology — as the natural consequence of reasoning through requirements, not as a
            memorized fact recited on cue. That is the skill this module builds: taking everything from
            Modules 01 through 23 and using it to reason through a system from a cold start, out loud, the
            way an interviewer actually wants to see it happen.
          </Para>
          <Para>
            Work through the worked examples below the way you would in a real interview — read the prompt,
            pause, sketch your own answer before reading the walkthrough, then compare. The rapid-fire
            section and vocabulary table near the end are for cramming; the worked system-design parts are
            for genuinely practicing the reasoning.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview methodology ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Interview Methodology" />
        <SectionTitle>A Reusable Structure for Any Kafka System-Design Prompt</SectionTitle>
        <Para>
          Every worked example in this module, from Part 01 through Part 09, follows the same five-step
          structure deliberately, because that structure is itself the thing interviewers are evaluating —
          more than any single correct answer. Internalizing this shape means a genuinely unfamiliar prompt on
          interview day is still approachable, because the process for attacking it is the same one practiced
          repeatedly below.
        </Para>
        <Table
          headers={['Step', 'What to actually do', 'Why interviewers weight this step heavily']}
          rows={[
            ['1. Requirements gathering', 'Ask about scale, latency needs, acceptable staleness or loss, and ordering requirements before proposing anything.', 'A design built on assumed requirements that turn out wrong is a design for the wrong problem — interviewers are testing whether you ask, not whether you guess correctly.'],
            ['2. Capacity estimation', 'State assumed numbers explicitly, then apply the formulas from this module\'s capacity-planning reference to get partition count, storage, and throughput figures.', 'A design with no numbers behind it cannot be sanity-checked by anyone, including you — stating rough math is what makes a design falsifiable and therefore credible.'],
            ['3. Topic and partition design', 'Decide topic boundaries, partition keys, and partition counts, and justify the partition key choice specifically in terms of ordering and skew.', 'The partition key decision is the single choice with the most downstream consequences in almost any Kafka design — interviewers listen closely for how it is justified.'],
            ['4. Delivery semantics and durability trade-offs', 'Choose acks, replication factor, and idempotence settings as a deliberate consequence of what the data actually is, not a default.', 'This is where "acks=all is always right" gets tested directly — see this module\'s interview-traps section.'],
            ['5. Trade-offs stated out loud', 'Name what the design gives up, not just what it achieves — a staleness window, an idle-consumer ceiling, an operational cost.', 'A design presented with no acknowledged weaknesses reads as either inexperienced or evasive; naming trade-offs unprompted is a strong, deliberately practiced signal.'],
          ]}
        />
        <Para>
          Notice this structure never starts with "here's the Kafka topology" — it starts with questions.
          Interviewers consistently report that the single most common mistake in a system-design interview,
          Kafka-specific or otherwise, is a candidate leaping straight to an architecture diagram before
          establishing what problem that architecture is actually meant to solve. Every worked example in
          this module opens with requirements gathering for exactly this reason, not as a formality.
        </Para>
        <Callout title="Practice narrating, not just solving" color={K}>
          A correct design reasoned through silently and then announced as a finished answer loses most of
          its interview value. The five-step structure above is meant to be spoken out loud, in order, as you
          work through it — the interviewer is evaluating the reasoning process at least as much as the final
          topic diagram, and a narrated process is the only way they can actually observe it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Worked System Design" />
        <SectionTitle>Design a Real-Time Analytics Pipeline for a Ride-Sharing App's Driver Location Updates</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Before touching Kafka at all, the first thing a strong candidate does is ask clarifying questions,
          because the right architecture depends entirely on the answers. For this prompt: how many active
          drivers send updates, and how often? What does "real-time analytics" actually mean — a live map for
          riders, aggregate metrics for a dashboard, or both? Does the system need the single latest location
          per driver, a full history, or both? What is the acceptable staleness — one second, five seconds,
          thirty? Is exact ordering per driver required, or just eventual correctness?
        </Para>
        <Para>
          Reasonable answers for this exercise: 2 million active drivers during peak, each sending a location
          ping every 4 seconds, so roughly 500,000 events per second at peak. The system needs both a live
          map (latest position per driver, low latency) and rolling aggregate metrics (active drivers per
          city, average speed per zone) for an ops dashboard. Per-driver ordering matters — a rider should
          never see a driver's location jump backward — but cross-driver ordering does not matter at all.
        </Para>
        <SubTitle>Capacity estimation</SubTitle>
        <CodeBox label="back-of-envelope sizing">
{`Peak event rate: 500,000 events/sec
Average event size: ~200 bytes (driver_id, lat, lng, timestamp, speed, heading)
Peak throughput: 500,000 * 200 bytes = ~100 MB/sec

Retention needed: short for raw pings (this is a firehose, not an archive) — 24 hours is plenty,
since the live map only needs recent state and aggregates are computed and stored elsewhere.

Storage for 24h retention (before replication):
100 MB/sec * 86,400 sec = ~8.6 TB/day
With replication factor 3: ~26 TB of disk across the cluster for this one topic

Partition count: one partition can sustain roughly 10-20 MB/sec of writes comfortably on
typical hardware. To handle 100 MB/sec with headroom for peak spikes and future growth:
100 MB/sec / 15 MB/sec per partition ≈ 7, round up generously to 24 partitions
(partition count should also comfortably exceed the largest expected consumer group size,
covered in Part 09 of this module's vocabulary and in the earlier consumer-groups module)`}
        </CodeBox>
        <SubTitle>Topic and partition design</SubTitle>
        <Para>
          One topic, <code>driver.locations.raw</code>, partitioned by <code>driver_id</code>. Keying by
          driver ID is the central decision here: it guarantees every update for a single driver lands on
          the same partition in send order, which is exactly what per-driver ordering requires, per the
          partitioning module's per-key ordering guarantee — without needing a single global partition,
          which would never sustain 500,000 events/second. Partition count of 24 (from the estimation above)
          spreads load across enough brokers while staying comfortably above any realistic consumer group
          size, avoiding the idle-consumer problem covered in the producers-consumers-brokers module.
        </Para>
        <Para>
          A second, separate compacted topic, <code>driver.locations.current</code>, keyed by
          <code>driver_id</code>, holds only the latest position per driver — exactly the log-compaction
          pattern from the message-brokers-queues module. A stream-processing job (Part 02 below reuses this
          exact pattern) consumes the raw topic and continuously writes the latest position per driver into
          this compacted topic, giving any new consumer (a freshly deployed map-rendering service, for
          example) an instant, complete current-state view on startup by reading the compacted topic from
          the beginning, rather than replaying the entire raw firehose.
        </Para>
        <SubTitle>Delivery semantics and durability trade-off</SubTitle>
        <Para>
          This is a case where the correct answer is deliberately <em>not</em> the strongest possible
          durability. A single missed location ping from one driver, four seconds before the next one
          arrives, has essentially no business consequence — the map is stale for four seconds either way.
          <code>acks=1</code> with <code>replication.factor=3</code> is the right trade-off: strong enough
          that a routine broker restart does not lose data, without paying the latency and throughput cost of
          <code>acks=all</code> at 500,000 events/second, where that cost compounds significantly. This is
          exactly the "tolerable loss" row from the durability-vs-availability table in the
          message-brokers-queues module, applied deliberately rather than by default.
        </Para>
        <SubTitle>Consumer group topology and processing</SubTitle>
        <Table
          headers={['Consumer', 'Reads', 'Purpose']}
          rows={[
            ['map-service consumer group', 'driver.locations.current (compacted)', 'Serves the live rider-facing map — always has the latest position per driver, instant startup from compacted state.'],
            ['aggregation stream job', 'driver.locations.raw', 'Kafka Streams windowed aggregation — active drivers per city, average speed per zone, emitted to a driver.metrics.5min topic on a rolling window.'],
            ['cold-storage sink connector', 'driver.locations.raw', 'Kafka Connect sink to object storage for historical/ML training data, independent consumer group, does not affect real-time paths.'],
          ]}
        />
        <Para>
          Three independent consumer groups reading the same raw topic — exactly the pub-sub fan-out pattern
          from the queues-vs-topics module — means the cold-storage pipeline can lag or even go down entirely
          without affecting the live map, and the aggregation job's throughput has zero coupling to how fast
          the map service renders updates.
        </Para>
        <SubTitle>Trade-offs worth stating out loud in an interview</SubTitle>
        <Para>
          Keying by <code>driver_id</code> assumes reasonably even distribution across drivers — true here
          since no single driver dominates traffic, unlike the hot-partition risk called out for
          heavily-skewed keys in the producers-consumers-brokers module. Choosing 24 partitions up front
          means a future repartitioning (an operationally disruptive event, since it changes which partition
          a given key hashes to) is deferred but not eliminated — a strong answer acknowledges this rather
          than treating the partition count as permanent.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Worked System Design" />
        <SectionTitle>Design an Order Processing System for an E-Commerce Platform Using Kafka</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Clarifying questions here matter even more than in Part 01, because order processing touches money
          and inventory — the cost of getting delivery semantics wrong is direct financial loss or a
          double-charged customer, not a four-second-stale map. What must happen when an order is placed —
          payment, inventory deduction, shipping notification, confirmation email? Must these happen exactly
          once, or is at-least-once with idempotent downstream handling acceptable? Can order events for
          different customers be processed out of order relative to each other? Must a single customer's
          orders be processed in the order they were placed?
        </Para>
        <Para>
          Reasonable answers: payment, inventory, and notification are separate downstream systems, each
          consuming the same order event independently. A double-charge or double-shipment is unacceptable —
          each downstream effect must happen effectively once. Cross-customer ordering does not matter; a
          single customer's own orders should process in the order placed.
        </Para>
        <SubTitle>Topic design and the fan-out pattern</SubTitle>
        <Para>
          One topic, <code>orders.placed</code>, keyed by <code>customer_id</code> — guaranteeing per-customer
          ordering exactly as in Part 01, without the cost of a single global partition. Three independent
          consumer groups subscribe to it: <code>payment-service</code>, <code>inventory-service</code>, and
          <code>notification-service</code>. This is the queues-vs-topics module's pub-sub pattern applied
          directly: one event, several independent services, each maintaining its own offset, none blocking
          or affecting the others.
        </Para>
        <CodeBox label="topic and consumer group layout">
{`Topic: orders.placed (key = customer_id, 12 partitions, RF=3)

payment-service group      -> charges the customer, writes to payments.processed
inventory-service group    -> deducts stock, writes to inventory.adjustments
notification-service group -> sends confirmation email, writes to notifications.sent

Each group has its own committed offset in __consumer_offsets.
payment-service falling behind does not slow down notification-service at all.`}
        </CodeBox>
        <SubTitle>Exactly-once handling for the payment path specifically</SubTitle>
        <Para>
          Payment is the one path in this system where "effectively once" needs to be engineered
          deliberately rather than assumed. The producer side uses <code>enable.idempotence=true</code> to
          eliminate broker-level duplicate writes from retries, per the delivery-semantics module. But the
          more important protection is downstream: the payment-service consumer processes each order using
          an idempotency key — a unique, stable <code>order_id</code> — checked against the payment
          processor's own idempotency-key support (a pattern common to Stripe and similar payment APIs) before
          issuing a charge. This closes the gap that idempotent producers alone do not cover: a payment
          service that crashes after successfully charging a card but before committing its Kafka offset will
          be redelivered the same order on restart, and the idempotency key is what prevents that redelivery
          from charging the customer twice.
        </Para>
        <Callout title="Why not just use a Kafka transaction here" color={K}>
          Kafka transactions (covered in the message-brokers-queues module) guarantee atomicity for a
          read-process-write loop entirely within Kafka — consuming from one topic and producing to another
          plus committing the offset, as one atomic unit. They do not, and cannot, extend that atomicity to an
          external side effect like an HTTP call to a payment processor. The idempotency-key pattern above is
          the correct tool specifically because the risky operation crosses a system boundary Kafka does not
          control.
        </Callout>
        <SubTitle>Handling a downstream failure without stopping the whole pipeline</SubTitle>
        <Para>
          If the payment processor is degraded and returning errors, payment-service should not block the
          entire partition indefinitely on retries — that would also block every order behind the failing one
          on the same partition, per the ordering guarantees from the ordering-guarantees module. The dead
          letter queue pattern from the message-brokers-queues module applies directly: after a bounded number
          of retries, the order is written to <code>orders.placed.dlq</code> with full context (original
          topic, partition, offset, and the error), the offset is committed, and processing continues for
          subsequent orders. A separate on-call process monitors the DLQ and replays once the payment
          processor recovers.
        </Para>
        <SubTitle>Monitoring this system</SubTitle>
        <Table
          headers={['Metric', 'What it tells the on-call engineer']}
          rows={[
            ['Consumer lag per group, per partition', 'Whether payment-service specifically is falling behind — the single most important signal for a money-touching consumer.'],
            ['orders.placed.dlq message rate', 'A rising DLQ rate almost always means the payment processor or another downstream dependency is degraded, not a Kafka problem.'],
            ['Under-replicated partitions on orders.placed', 'A shrinking ISR here threatens the acks=all durability guarantee this topic depends on for correctness.'],
            ['End-to-end latency, order placed to confirmation email sent', 'A single number the business actually cares about, cutting across all three consumer groups at once.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Worked System Design" />
        <SectionTitle>Design a Notification Fan-Out System</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          What triggers a notification, and how many channels does a single event fan out to — push, email,
          SMS, in-app? Do different channels have wildly different throughput and latency needs (push is
          typically near-real-time and high volume; SMS is expensive per-message and often rate-limited by a
          third-party provider)? Should a user's notification preferences (opted out of SMS, only wants
          digest email) be enforced before or after the fan-out?
        </Para>
        <Para>
          Reasonable answers: a single upstream event (an order shipped, a price drop on a wishlisted item)
          should be able to trigger zero to several notification channels depending on the user's stored
          preferences. Push needs to be near-instant. SMS is rate-limited by an external provider and must
          never block push or email. Preference filtering should happen once, centrally, not duplicated in
          every channel-specific consumer.
        </Para>
        <SubTitle>Architecture — a central fan-out topic, then per-channel topics</SubTitle>
        <Para>
          A single upstream topic, <code>notification.triggers</code>, receives the raw triggering event.
          One consumer group, <code>preference-filter-service</code>, reads it, looks up the user's stored
          preferences, and produces zero or more filtered, channel-specific events downstream — to
          <code>notification.push</code>, <code>notification.email</code>, and
          <code>notification.sms</code>, three separate topics. Each channel then has its own dedicated
          consumer service with its own scaling and rate-limiting characteristics, completely decoupled from
          the others by the fact that they are separate topics with separate consumer groups.
        </Para>
        <CodeBox label="fan-out topology">
{`notification.triggers (key = user_id)
        |
        v
preference-filter-service (one consumer group)
        |
        +--> notification.push  (key = user_id)  --> push-service   (scales independently, near-real-time)
        +--> notification.email (key = user_id)  --> email-service  (scales independently, batched sends OK)
        +--> notification.sms   (key = user_id)  --> sms-service    (rate-limited by external provider)`}
        </CodeBox>
        <Para>
          This is the same decoupling principle as the message-brokers-queues module's rate-decoupling
          guarantee, applied deliberately across three channels with genuinely different throughput profiles:
          the SMS provider's rate limit can never cause push notifications to back up, because
          <code>notification.sms</code> is a physically separate topic and consumer group from
          <code>notification.push</code> — a slow or throttled SMS consumer only grows lag on its own topic.
        </Para>
        <SubTitle>Why filter once centrally instead of in each channel consumer</SubTitle>
        <Para>
          Putting preference logic in <code>preference-filter-service</code> rather than duplicating it in
          push-service, email-service, and sms-service independently means a change to preference rules ships
          once, and the three channel services stay focused purely on channel-specific delivery mechanics. It
          also means a user who opted out of all channels for a given trigger type simply never produces a
          record to any of the three downstream topics — the channel services never even see the suppressed
          event, rather than each independently deciding to drop it.
        </Para>
        <SubTitle>Delivery semantics per channel</SubTitle>
        <Para>
          Not every channel needs the same guarantee. An occasional duplicate push notification is a mild
          annoyance; an occasional duplicate SMS costs real money per message sent to a third-party provider.
          <code>enable.idempotence=true</code> on the shared producer in <code>preference-filter-service</code>
          is the baseline for all three topics, but sms-service additionally deduplicates at the application
          level using a stable notification ID before calling the SMS provider, exactly the
          consumer-side-idempotency pattern from the delivery-semantics module — because the cost asymmetry
          between channels justifies the extra engineering effort for SMS specifically and not for push.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Worked System Design" />
        <SectionTitle>How Would You Migrate a Legacy Batch ETL Pipeline to a Streaming Kafka Pipeline?</SectionTitle>
        <SubTitle>Requirements gathering — this prompt is about migration risk, not a clean-slate design</SubTitle>
        <Para>
          The critical difference from Parts 01-03: this system already exists and already works, just on a
          nightly batch schedule. The interview is testing whether a candidate defaults to "rip it out and
          replace it" versus a lower-risk incremental migration. Key questions: what does the batch job
          actually do (extract from a source database, transform, load into a warehouse)? Who depends on its
          output, and on what schedule? Is the goal lower latency, or is it actually about reducing load on
          the source database from a nightly full-table scan?
        </Para>
        <Para>
          Reasonable answers: a nightly job extracts all orders from a production Postgres database, joins
          them with customer data, and loads aggregated tables into a warehouse for BI dashboards. The
          nightly full-table extract is now measurably slowing down the production database during the
          extract window, and stakeholders separately want same-day visibility rather than next-day.
        </Para>
        <SubTitle>The migration approach — Change Data Capture, not a rewritten application</SubTitle>
        <Para>
          The right first move is not rewriting the source application to produce Kafka events directly —
          that is a large, risky change to a system that works today. The right first move is Kafka Connect
          with a CDC (Change Data Capture) source connector (Debezium, reading the database's write-ahead
          log) that streams every insert, update, and delete on the <code>orders</code> table into a Kafka
          topic automatically, with zero changes to the application code that writes to Postgres. This is
          exactly the Kafka Connect pattern from the connect-kafka-connect module — using a battle-tested
          connector instead of hand-rolling a custom producer that polls the database.
        </Para>
        <CodeBox label="the migration architecture, phase by phase">
{`Phase 1 (parallel run, zero risk to the existing pipeline):
  Postgres orders table --[Debezium CDC connector]--> orders.changes topic
  Nightly batch job keeps running exactly as before, untouched.
  A new Kafka Streams job consumes orders.changes and populates the SAME
  warehouse tables the batch job populates, into a separate schema for validation.

Phase 2 (validation):
  Compare streaming-populated tables against batch-populated tables nightly.
  Fix discrepancies in the streaming transform logic until they match consistently.

Phase 3 (cutover):
  BI dashboards repointed to the streaming-populated tables.
  Nightly batch job disabled, but its code kept for a rollback window.

Phase 4 (cleanup, weeks later, once confidence is high):
  Batch job and its scheduling infrastructure decommissioned entirely.`}
        </CodeBox>
        <Para>
          Running the streaming pipeline in parallel with the existing batch job for a validation period is
          the single highest-leverage risk-reduction move in this entire migration — it means a bug in the
          new streaming transform logic is caught by comparing against known-good batch output, rather than
          discovered by a stakeholder noticing a wrong number on a dashboard weeks after cutover.
        </Para>
        <SubTitle>Where log compaction fits in this specific migration</SubTitle>
        <Para>
          The CDC topic itself should not be compacted — the batch-to-streaming validation in Phase 2 needs
          the full change history, not just latest state, to reconstruct exactly what the batch job would
          have seen. But a derived topic, <code>orders.current</code>, compacted and keyed by
          <code>order_id</code>, is exactly the right pattern (from the message-brokers-queues module) for any
          downstream consumer that only needs current order state rather than full history — giving new
          consumers an instant materialized view without replaying the entire CDC log from the beginning.
        </Para>
        <SubTitle>Trade-offs to state explicitly</SubTitle>
        <Para>
          CDC shifts load from "a nightly full-table scan on the production database" to "continuous CDC
          read of the write-ahead log," which is far lighter per-unit-time but is now a continuous rather
          than a scheduled load — worth explicitly calling out to whoever owns the source database. It also
          introduces a genuinely new failure mode that did not exist with a nightly batch job: if the CDC
          connector falls behind or the source database's WAL retention is exceeded before the connector
          catches up, a full re-snapshot of the source table may be required — a cost that a nightly full
          extract, by definition, never has to worry about.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Worked System Design" />
        <SectionTitle>Design a Fraud Detection Pipeline for Real-Time Payment Transactions</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          What must the latency budget be from transaction to fraud verdict — is this blocking the
          transaction itself, or an async flag reviewed afterward? Does fraud scoring need only the current
          transaction, or a rolling window of a customer's recent transaction history? What is the cost of a
          false negative (a fraudulent transaction let through) versus a false positive (a legitimate
          transaction blocked or delayed)?
        </Para>
        <Para>
          Reasonable answers: fraud scoring must complete within 200ms and blocks the transaction — this
          makes it latency-critical in a way none of the previous four examples were. Scoring needs a rolling
          window of the customer's transactions over the last 24 hours (velocity checks — too many
          transactions too fast is a strong fraud signal). A false negative is far more costly than a false
          positive here, so the system should be tunable toward slightly more false positives under load.
        </Para>
        <SubTitle>Why this is fundamentally different from Parts 01-04 — a blocking, latency-critical path</SubTitle>
        <Para>
          Every previous example in this module was async — Kafka absorbed the work and something downstream
          eventually caught up. A fraud check that blocks the transaction cannot use Kafka the same way,
          because the caller is waiting on a synchronous answer within 200ms, and Kafka's own end-to-end
          latency (produce, replicate, consume, process) can already eat a meaningful fraction of that budget
          under load. The honest answer in an interview is that Kafka is not the request/response layer here
          — it is the state-building layer underneath a synchronous scoring service.
        </Para>
        <SubTitle>Architecture — Kafka Streams builds a materialized state store, a synchronous API queries it</SubTitle>
        <CodeBox label="separating the synchronous path from the streaming state-building path">
{`transaction.events topic (key = customer_id)
        |
        v
Kafka Streams job: windowed aggregation (24h rolling transaction velocity per customer)
        |
        v
materialized state store (backed by a compacted changelog topic, per the
message-brokers-queues module's compacted-topic pattern) -- queryable via
Kafka Streams Interactive Queries, keyed by customer_id, sub-millisecond reads

Synchronous path (NOT going through Kafka's produce/consume latency at all):
  payment gateway --[HTTP, <200ms budget]--> fraud-scoring-service
                                                   |
                                                   v
                                        queries the materialized state store
                                        directly via interactive queries,
                                        combines with the current transaction,
                                        returns a verdict synchronously`}
        </CodeBox>
        <Para>
          The transaction event is still produced to Kafka (for the Streams job to eventually incorporate it
          into the rolling window, and for downstream audit/analytics consumers), but the fraud verdict
          itself is computed by querying an already-materialized state store directly — not by waiting on a
          fresh round trip through Kafka's produce-replicate-consume path. This is the key insight the
          interviewer is looking for: Kafka Streams' state stores can be queried like a database, decoupling
          "how state gets built" (streaming, asynchronous, eventually consistent by a small margin) from "how
          a synchronous caller reads it" (a fast local or network query against materialized state, not a
          Kafka consume call).
        </Para>
        <Callout title="Acceptable staleness is the trade-off being made explicit" color={K}>
          The materialized state store lags the true, instantaneous transaction count by however long the
          Streams job's processing pipeline takes to catch up — typically well under a second, but not zero.
          For fraud velocity checks, a sub-second staleness window is an acceptable trade-off given the
          business requirement (per the false-negative-versus-false-positive framing above); for a use case
          requiring genuinely instantaneous exact state, this architecture would need explicit justification
          or a different approach entirely.
        </Callout>
        <SubTitle>Monitoring specific to a blocking, latency-critical consumer</SubTitle>
        <Para>
          Beyond the standard consumer-lag and under-replicated-partition monitoring from Part 02, this
          system needs one more critical metric: the Streams job's own processing lag relative to real time,
          because that lag directly determines how stale the velocity data behind every fraud verdict is. A
          growing processing lag here is not just an operational inconvenience — it is a silent, gradual
          degradation of fraud-detection accuracy that would not show up as an obvious outage.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Worked System Design" />
        <SectionTitle>Design a Multi-Region Event Replication Strategy for a Global SaaS Platform</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Does every region need to see every event, or only events relevant to users in that region? Is
          this active-active (writes accepted in multiple regions) or active-passive (one primary region,
          others read-only replicas for disaster recovery)? What is the acceptable data-loss window if the
          primary region fails entirely?
        </Para>
        <Para>
          Reasonable answers: this is a SaaS platform with regional data residency requirements — EU customer
          data must stay associated with an EU cluster for compliance, but a small set of global events
          (product catalog updates, feature flags) need to reach every region. Active-passive per customer
          region, with cross-region replication of only the specifically-designated global topics.
        </Para>
        <SubTitle>Why this is not solved by simply widening replication factor within one cluster</SubTitle>
        <Para>
          A common wrong turn here (also flagged in the interview-traps section below) is reasoning about
          this as "just increase the replication factor." Replication factor, as covered in the
          message-brokers-queues module, replicates a partition across brokers <em>within one cluster</em> for
          durability against a single broker failure. It says nothing about geography — all replicas of a
          Kafka partition are typically within the same cluster, often the same data center or a small set of
          nearby availability zones, because Kafka's own in-sync-replica protocol assumes relatively low
          inter-broker latency. Multi-region replication needs a different mechanism entirely.
        </Para>
        <SubTitle>The mechanism — MirrorMaker 2, not a wider replication factor</SubTitle>
        <Para>
          MirrorMaker 2 (built on Kafka Connect) is the standard tool for cluster-to-cluster replication
          across regions: it runs as a Connect cluster that consumes from a source-region Kafka cluster and
          produces the same records into a destination-region cluster, preserving topic partitioning and
          offsets in a translatable way, and it can be configured for one-directional (active-passive) or
          bidirectional (active-active) replication between named clusters.
        </Para>
        <CodeBox label="the regional topology">
{`EU cluster (primary for EU customers)          US cluster (primary for US customers)
  eu.orders.placed  (EU customer orders)          us.orders.placed  (US customer orders)
  eu.catalog.updates ---[MirrorMaker 2]---------> us.catalog.updates (replicated copy)
  us.catalog.updates <---[MirrorMaker 2]--------- eu.catalog.updates (replicated copy)

  Customer order data stays region-local (compliance requirement) --
  eu.orders.placed is NEVER mirrored to the US cluster.

  Catalog updates ARE global and ARE mirrored bidirectionally, so a
  product change made through either region's admin tooling reaches both.`}
        </CodeBox>
        <Para>
          The deliberate asymmetry here — customer order topics never replicated, catalog topics always
          replicated bidirectionally — is the actual system-design decision an interviewer wants to see
          articulated: not every topic needs the same replication treatment, and conflating "replicate
          everything for disaster recovery" with "replicate this specific topic because multiple regions
          genuinely need it" leads to either a compliance violation or unnecessary cross-region bandwidth
          cost.
        </Para>
        <SubTitle>Disaster recovery for the region-local topics</SubTitle>
        <Para>
          For <code>eu.orders.placed</code> itself, which must stay EU-local for compliance, disaster
          recovery is handled differently — a passive MirrorMaker 2 replication into a second EU
          cluster in a different EU availability zone (still within the compliance boundary), not into the US
          cluster. This gives regional failover without ever violating the data-residency requirement that
          motivated keeping the topic region-local in the first place.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked System Design" />
        <SectionTitle>Design a Reliable Event-Publishing Pattern for a Monolith Migrating to Event-Driven Architecture</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          A common, distinct prompt from a greenfield design: an existing monolithic application writes to
          its own relational database as the source of truth, and now needs to reliably publish an event to
          Kafka every time certain rows change — without a rewrite, and without risking the two writes (the
          database commit and the Kafka publish) getting out of sync with each other. What happens today when
          the application crashes between committing to the database and publishing to Kafka? Is losing an
          event ever acceptable, or publishing a duplicate event, or neither?
        </Para>
        <Para>
          Reasonable answers: the application currently has no event publishing at all — this is a new
          capability being layered on. Losing an event entirely is not acceptable (downstream systems must
          eventually learn about every change); an occasional duplicate event is acceptable as long as
          downstream consumers are idempotent, per the delivery-semantics module's general framing.
        </Para>
        <SubTitle>Why "just call the Kafka producer right after the database commit" is the wrong answer</SubTitle>
        <Para>
          The naive approach — commit to the database, then call <code>producer.send()</code> — has an
          unavoidable gap: if the process crashes, or the Kafka broker is briefly unreachable, exactly between
          those two calls, the database commit has already happened but the event is never published. There
          is no way to retry "the publish that never happened" after a crash, because the application has no
          durable record that a publish was even owed. This is precisely the kind of dual-write consistency
          problem that motivates the transactional outbox pattern.
        </Para>
        <SubTitle>The transactional outbox pattern</SubTitle>
        <Para>
          Instead of writing to the business table and calling Kafka directly, the application writes to the
          business table <em>and</em> an <code>outbox</code> table, in the same local database transaction —
          an operation the database itself guarantees is atomic, with none of Kafka's cross-system
          consistency problem. A separate process then reads unpublished rows from the outbox table and
          publishes them to Kafka, marking them published only after a confirmed send. The database
          transaction's atomicity is what makes this reliable: either both the business row and its
          corresponding outbox row are committed, or neither is — there is never a state where the business
          change happened but no record exists that an event is owed for it.
        </Para>
        <CodeBox label="the outbox pattern, end to end">
{`-- Single atomic database transaction, both writes or neither:
BEGIN;
  UPDATE orders SET status = 'shipped' WHERE id = 4821;
  INSERT INTO outbox (id, topic, key, payload, published)
    VALUES (gen_uuid(), 'orders.status_changed', '4821',
            '{"order_id": 4821, "status": "shipped"}', false);
COMMIT;

-- A separate relay process (often itself a Debezium CDC connector reading
-- the outbox table's own write-ahead log, per Part 04's CDC pattern):
-- reads unpublished outbox rows -> produces to Kafka -> marks published = true
-- If the relay crashes mid-publish, it simply resumes from the last
-- unpublished row on restart -- at worst producing a duplicate, never a loss`}
        </CodeBox>
        <Para>
          Using a CDC connector (as in Part 04) to read the outbox table's own change log, rather than a
          hand-rolled polling process, is the preferred implementation in practice — it reuses a
          battle-tested connector instead of building bespoke polling-and-marking logic, and it naturally
          picks up new outbox rows with low latency by tailing the database's write-ahead log rather than
          polling on an interval.
        </Para>
        <Callout title="This pattern trades a duplicate-event risk for a guaranteed-no-loss guarantee" color={K}>
          If the relay process publishes an event successfully but crashes before marking the outbox row
          published, it will republish the same event after restart — a duplicate, not a loss. This is
          exactly the trade-off the requirements gathering established as acceptable, and it is why every
          downstream consumer of an outbox-published topic must be built idempotently, per the
          delivery-semantics module, rather than assuming each event arrives exactly once.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Worked System Design" />
        <SectionTitle>Design a Centralized Log and Metrics Aggregation Pipeline for a Microservices Platform</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          How many services, and what is the aggregate log volume? Do logs need to be searchable in
          near-real-time by on-call engineers, or is next-hour acceptable? Is sampling acceptable for very
          high-volume debug-level logs, or must every log line be retained? Are metrics (numeric time series)
          handled the same way as logs (free-text events), or do they need a fundamentally different pipeline?
        </Para>
        <Para>
          Reasonable answers: roughly 400 microservices, aggregate log volume peaking around 200,000 lines per
          second across the fleet. On-call engineers need logs searchable within seconds during an incident.
          Debug-level logs can be sampled at high volume; error and warn-level logs must never be dropped.
          Metrics are numeric and high-cardinality and genuinely need a different downstream system
          (a time-series database) than logs do (a search index) — Kafka's job here is to be the reliable,
          decoupling ingestion layer in front of both, not to replace either specialized store.
        </Para>
        <SubTitle>Why this is a strong candidate for Kafka despite looking like "just logging"</SubTitle>
        <Para>
          A naive design has every service write logs directly to the search index (e.g. Elasticsearch).
          This couples every single service's log volume directly to the search index's real-time write
          capacity — a spike in log volume from one misbehaving service, or the search index having a slow
          moment during a reindex, propagates backpressure straight into application code that has nothing to
          do with logging. Kafka's rate-decoupling guarantee, from the message-brokers-queues module, is the
          exact fix: every service writes its logs to Kafka, fast and fire-and-forget, and Kafka absorbs any
          mismatch in rate between log production and the search index's ability to ingest.
        </Para>
        <SubTitle>Topic design — separated by urgency, not by service</SubTitle>
        <Para>
          A common mistake is one topic per microservice, which sounds organized but actually fragments
          partitioning decisions across 400 small topics with no meaningful traffic to justify separate
          partition counts for most of them. The better design groups by <em>urgency and handling
          requirement</em> instead: <code>logs.error</code> (never sampled, never dropped, highest priority
          for the search-index consumer), <code>logs.warn</code>, and <code>logs.debug</code> (aggressively
          sampled at the producer, before it ever reaches Kafka, to keep volume manageable). Each service
          still tags every log line with its own service name as a field in the payload — searchability by
          service is preserved entirely at the search-index layer, without needing per-service topics.
        </Para>
        <CodeBox label="topic design and consumer fan-out for logs and metrics">
{`logs.error   (RF=3, acks=all -- never acceptable to lose an error log during an incident)
logs.warn    (RF=3, acks=1 -- durable enough, latency matters more than absolute durability)
logs.debug   (RF=1, acks=0 -- sampled at 1% by the client library before it is even sent;
              high volume, low individual value, loss is fully acceptable)

metrics.raw  (separate topic entirely -- numeric time-series points, not free text)

Consumer groups:
  search-index-sink (Kafka Connect sink connector) -> reads logs.error, logs.warn, logs.debug
    -> writes into the search index, prioritizing error/warn topics' consumer threads
  metrics-sink (Kafka Connect sink connector) -> reads metrics.raw
    -> writes into the time-series database
  cold-storage-sink -> reads all four topics -> writes to object storage for compliance retention`}
        </CodeBox>
        <Para>
          Differentiating <code>acks</code> and replication factor by topic urgency — full durability for
          errors, relaxed durability for sampled debug logs — is the same deliberate trade-off principle from
          Part 01's driver-location example, applied to a completely different domain: the right Kafka
          durability settings are always a function of what the data actually is, never a single fleet-wide
          default.
        </Para>
        <SubTitle>Using Kafka Connect instead of hand-written sink consumers</SubTitle>
        <Para>
          Both the search-index sink and the metrics sink are exactly the kind of well-understood, generic
          integration the Connect module covers — "read from a Kafka topic, write to a well-known external
          system" — that an existing, maintained sink connector already implements reliably, including its
          own offset management and retry behavior. Hand-writing a custom consumer for either would mean
          re-implementing connector functionality that already exists and is already battle-tested at scale,
          exactly the trap named in this module's interview-traps section.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Worked System Design" />
        <SectionTitle>Design a Streaming ETL Pipeline That Joins Two High-Volume Topics in Real Time</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          A recurring shape of Kafka system-design prompt: enriching one stream with data from another in
          real time rather than batch. Concretely — a media-streaming platform wants to join
          <code>playback.events</code> (a play, pause, or seek, keyed by session ID) with
          <code>content.catalog</code> (metadata about each piece of content — title, genre, runtime) to
          produce an enriched event stream feeding a real-time recommendation model. How often does catalog
          metadata change relative to playback event volume? Must the join be exact, or is a brief staleness
          window on catalog metadata acceptable?
        </Para>
        <Para>
          Reasonable answers: playback events arrive at roughly 300,000/second at peak; catalog metadata
          changes rarely by comparison — a few hundred updates per hour, mostly new content being added. A
          few seconds of staleness on catalog metadata (a just-published title not showing its genre in the
          very first few playback events after publish) is acceptable; playback events themselves must never
          be dropped.
        </Para>
        <SubTitle>Why this is a KStream-KTable join, not a KStream-KStream join</SubTitle>
        <Para>
          The stream-processing-kafka-streams module's distinction between joining two unbounded streams
          versus joining a stream against a continuously updated table applies directly here, and picking the
          wrong one is a common interview misstep. <code>playback.events</code> is naturally a KStream — each
          play/pause/seek is an independent fact, not an update to prior state for that key. <code>content.
          catalog</code> is naturally a KTable — each record is the latest metadata for a given content ID,
          exactly the upsert-per-key semantics a KTable represents, and it is almost certainly already backed
          by a compacted topic for that reason (via CDC from the catalog database, per Part 04's CDC pattern).
          A KStream-KTable join looks up the current value from the table for each incoming stream record —
          exactly the "enrich this event with current reference data" pattern this prompt describes.
        </Para>
        <CodeBox label="the KStream-KTable enrichment join">
{`KStream<String, PlaybackEvent> playbackEvents = builder.stream("playback.events");
KTable<String, ContentMetadata> catalog = builder.table("content.catalog");
// content.catalog is a compacted topic populated by CDC from the catalog database

KStream<String, EnrichedPlaybackEvent> enriched = playbackEvents
    .join(
        catalog,
        (event, metadata) -> new EnrichedPlaybackEvent(event, metadata)
        // NOTE: this requires re-keying playback.events by content_id first if
        // it is currently keyed by session_id -- the join key must match the
        // KTable's key, which is the single most common bug in this pattern
    );

enriched.to("playback.events.enriched");`}
        </CodeBox>
        <Para>
          The comment in the code above names the single most common real bug in this exact pattern: a
          KStream-KTable join requires both sides to share the same key. If <code>playback.events</code> is
          keyed by <code>session_id</code> (a reasonable choice for the raw topic, to keep one session's
          events ordered together) but the join needs to match on <code>content_id</code>, an explicit
          re-keying step (a <code>selectKey</code> or equivalent, which itself triggers a repartition under
          the hood) is required before the join — an easy detail to omit in a whiteboard design and exactly
          the kind of specific, correct detail that separates a strong answer from a surface-level one.
        </Para>
        <SubTitle>Handling the staleness trade-off explicitly</SubTitle>
        <Para>
          Because the KTable side is itself built from a continuously-consumed compacted topic, there is an
          inherent small lag between a catalog update landing in the source database and that update being
          reflected in the KTable a playback event gets joined against — exactly the kind of small, bounded
          staleness the requirements gathering established as acceptable. Stating this trade-off explicitly,
          rather than presenting the join as instantaneous, is the same discipline as Part 05's fraud-scoring
          example: acknowledging a materialized view's staleness window is itself part of a complete design
          answer, not a flaw to gloss over.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — Vocabulary Cheat Sheet ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Reference" />
        <SectionTitle>Kafka Vocabulary Cheat Sheet</SectionTitle>
        <Para>
          A dense, precise reference covering every major term used across the 24-module track — built for
          interview cramming, not first-time learning. If a definition here is unclear, the module it maps to
          covers it in full depth.
        </Para>
        <Table
          headers={['Term', 'Precise definition']}
          rows={[
            ['Broker', 'A single Kafka server process that stores partition logs, serves client reads/writes, and participates in cluster coordination.'],
            ['Cluster', 'A group of brokers working together, sharing cluster metadata and a controller.'],
            ['Topic', 'A named, durable, append-only log of records, divided into one or more partitions.'],
            ['Partition', 'An ordered, immutable sequence of records within a topic; the unit of parallelism and the unit of strict ordering.'],
            ['Offset', 'A record\'s position within its partition — a monotonically increasing integer, unique per partition, never reused.'],
            ['Leader (replica)', 'The one replica of a partition that handles all reads and writes for it at a given time.'],
            ['Follower (replica)', 'A replica that continuously fetches and copies the leader\'s log, ready to become leader if the current leader fails.'],
            ['ISR (In-Sync Replica set)', 'The set of replicas, including the leader, that are currently caught up within the broker\'s configured replication lag tolerance.'],
            ['Replication factor', 'How many total copies of each partition exist across the cluster, on different brokers.'],
            ['min.insync.replicas', 'The minimum ISR size required for a write with acks=all to succeed; below this, the partition refuses writes rather than risk silent data loss.'],
            ['acks', 'Producer setting controlling how many replicas must confirm a write before it is acknowledged: 0 (none), 1 (leader only), all (full ISR).'],
            ['Controller', 'The one broker (or, in KRaft mode, the elected leader of the controller quorum) responsible for cluster-wide decisions like leader election.'],
            ['KRaft', 'Kafka\'s Raft-based consensus mode for cluster metadata and controller election, replacing the older ZooKeeper-based coordination entirely.'],
            ['Consumer group', 'A named set of consumers that share the work of reading a topic; each partition is read by exactly one consumer within the group at a time.'],
            ['Rebalance', 'The process of reassigning partitions among the members of a consumer group, triggered by a member joining, leaving, or being declared dead.'],
            ['Cooperative (incremental) rebalancing', 'A rebalancing protocol that reassigns only the specific partitions that need to move, instead of revoking every partition from every consumer.'],
            ['Static membership', 'Using a stable group.instance.id so a consumer reconnecting quickly (e.g. during a rolling deploy) is recognized as returning, skipping an unnecessary rebalance.'],
            ['Consumer lag', 'The difference between a partition\'s latest offset and a consumer group\'s committed offset — the operational signal for backpressure.'],
            ['Idempotence (producer)', 'A producer feature (enable.idempotence=true) where the broker deduplicates retried writes using a per-producer-session sequence number, eliminating retry-caused duplicates at the broker level.'],
            ['Transaction', 'An atomic group of writes across one or more partitions/topics plus a consumer offset commit, coordinated by a transaction coordinator so all of it succeeds or none of it does.'],
            ['isolation.level (read_committed)', 'A consumer setting that filters out records from aborted or still-in-flight transactions, showing only committed data.'],
            ['Exactly-once semantics', 'The combined guarantee of idempotent producers plus transactions plus read_committed consumers, ensuring a read-process-write loop has no duplicates and no partial results.'],
            ['Retention', 'The policy governing how long records are kept in a topic before being eligible for deletion — time-based, size-based, or both.'],
            ['Log compaction', 'A retention alternative that keeps at least the latest record for every key forever, discarding only older, superseded versions of the same key.'],
            ['Tombstone', 'A record with a null value, used to signal that a key should eventually be fully removed from a compacted topic.'],
            ['Segment', 'A fixed-size chunk of a partition\'s log on disk; only the newest segment (the active segment) is being written to at any time.'],
            ['Schema Registry', 'A separate service that stores and versions record schemas (commonly Avro, Protobuf, or JSON Schema) and enforces compatibility rules between schema versions.'],
            ['Compatibility mode', 'The rule (backward, forward, or full) the Schema Registry enforces when evaluating whether a new schema version is safe relative to existing producers/consumers.'],
            ['Kafka Connect', 'A framework for running reusable source connectors (external system -> Kafka) and sink connectors (Kafka -> external system) without hand-writing custom producers/consumers.'],
            ['Change Data Capture (CDC)', 'A source-connector pattern that streams row-level inserts/updates/deletes from a database\'s own change log (e.g. a write-ahead log) into Kafka.'],
            ['Kafka Streams', 'A client library for building stream-processing applications directly against Kafka, without a separate processing cluster.'],
            ['KStream', 'A Kafka Streams abstraction representing an unbounded stream of individual records — every record is a new, independent event.'],
            ['KTable', 'A Kafka Streams abstraction representing a continuously updated table, backed by a compacted changelog topic — each record is an upsert to the latest state for its key.'],
            ['TopologyTestDriver', 'A test utility that runs a real Kafka Streams topology against simulated, in-process input/output topics with a controllable simulated clock, with no real broker involved.'],
            ['ksqlDB', 'A SQL-based interface for building Kafka Streams-style stream-processing applications using declarative queries instead of client-library code.'],
            ['MirrorMaker 2', 'A Kafka Connect-based tool for replicating topics between separate Kafka clusters, commonly across regions or for disaster recovery.'],
            ['Dead letter queue (DLQ)', 'A separate topic where a consumer routes a record that repeatedly fails processing, so the main partition can keep advancing instead of blocking indefinitely.'],
            ['Testcontainers', 'A library that runs a real, ephemeral broker in a Docker container for the duration of an integration test, then tears it down.'],
            ['bootstrap.servers', 'The producer/consumer config listing one or more brokers used only as an initial entry point to discover full cluster metadata — not a list of every broker.'],
            ['linger.ms', 'How long a producer waits, hoping more records arrive to fill a batch, before sending it — the core producer latency-versus-throughput knob.'],
            ['max.poll.interval.ms', 'The maximum time allowed between consecutive poll() calls before the consumer is presumed dead and its partitions are rebalanced away.'],
            ['session.timeout.ms', 'The maximum time the group coordinator waits without a heartbeat before declaring a consumer dead — distinct from max.poll.interval.ms, which tracks a different failure mode.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Capacity planning quick reference ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Reference" />
        <SectionTitle>Capacity-Planning Formulas You Can Reuse in Any System-Design Interview</SectionTitle>
        <Para>
          Every worked example in this module used the same handful of back-of-envelope calculations. Having
          these ready to apply immediately, rather than deriving them from scratch under interview pressure,
          is worth the memorization — an interviewer consistently rates a candidate who states a number and
          shows the arithmetic higher than one who hand-waves past sizing entirely.
        </Para>
        <CodeBox label="the four formulas that cover almost every Kafka sizing question">
{`1. Peak throughput:
   events/sec * average event size (bytes) = bytes/sec
   (always ask for or estimate BOTH numbers separately — candidates who only
   estimate one and guess the other tend to be off by an order of magnitude)

2. Partition count, from throughput:
   target throughput (MB/sec) / sustainable throughput per partition (~10-20 MB/sec)
   round up generously — partition count is cheap to over-provision up front,
   expensive to change later (changing it reshuffles every key's partition assignment)

3. Storage for a retention window, before replication:
   bytes/sec * retention period (seconds) = raw bytes needed
   THEN multiply by replication factor for actual disk needed across the cluster
   (a common interview mistake: forgetting the replication-factor multiplier entirely)

4. Consumer group parallelism ceiling:
   max useful consumers in one group = partition count
   (a consumer beyond this number sits idle — this is the single most
   commonly misunderstood scaling limit in a Kafka system design, per this
   module's interview-traps section)`}
        </CodeBox>
        <Para>
          Applying these to a fresh, unfamiliar prompt in an interview: state your assumed numbers explicitly
          ("let's say 50,000 events per second, 500 bytes average, that's about 25 MB/sec"), then walk the
          formulas in order rather than jumping straight to a partition count. Interviewers are usually more
          interested in seeing you reason through the chain than in the exact final number, which is why
          stating assumptions out loud before calculating is worth more than a quietly-correct final answer.
        </Para>
        <Table
          headers={['Quantity', 'Typical range to assume if not given', 'Where it showed up in this module']}
          rows={[
            ['Sustainable throughput per partition', '10-20 MB/sec on typical hardware', 'Part 01\'s driver-location partition-count estimate'],
            ['Replication factor for production data', '3, with min.insync.replicas=2', 'Every worked design in this module'],
            ['Retention for a firehose/raw topic', '24 hours to 7 days, unless compliance dictates otherwise', 'Part 01\'s raw location-ping topic'],
            ['Retention for a compacted current-state topic', 'Effectively indefinite — compaction, not time, bounds its size', 'Part 01 and Part 04\'s compacted current-state topics'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Common interview traps ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Interview Traps" />
        <SectionTitle>Wrong Answers Candidates Commonly Give, and Why They're Wrong</SectionTitle>
        {[
          {
            q: '"Just add more partitions for more throughput" — stated as a complete answer with no caveats',
            a: 'This is technically true in isolation but incomplete in a way interviewers specifically probe for. More partitions increases parallelism, but it also means a bigger, more disruptive rebalance any time consumer group membership changes, and — critically — changing partition count on an existing topic changes which partition a given key hashes to, breaking the per-key ordering guarantee for every key whose messages are already in flight or already written. The strong answer states the throughput benefit and immediately names the ordering and rebalance costs, ideally suggesting partition count be set generously up front (as in Part 01\'s capacity estimation) specifically to avoid this later.',
          },
          {
            q: '"Kafka guarantees exactly-once delivery" — stated as a blanket, unqualified claim',
            a: 'Exactly-once semantics in Kafka is real but scoped: it covers a read-process-write loop entirely within Kafka, using idempotent producers, transactions, and read_committed consumers together. It does not extend to a side effect outside Kafka\'s control — an HTTP call to a payment API, a write to an external database not itself participating in the transaction. Part 02\'s payment example exists specifically to test whether a candidate knows where that boundary actually is.',
          },
          {
            q: '"For multi-region replication, just increase the replication factor" — treating replication factor as a geography solution',
            a: 'Replication factor replicates a partition across brokers within one cluster, for durability against a single broker failure — not across regions. Part 06 exists specifically to test this distinction; the correct mechanism for cross-region replication is a separate tool like MirrorMaker 2, running as its own Connect-based replication layer between two distinct clusters.',
          },
          {
            q: '"acks=all is always the right choice for a serious production system" — treating durability as a default rather than a decision',
            a: 'Part 01\'s driver-location example is the direct counter-case: acks=all at 500,000 events/second for data where a single missed ping has no real business consequence is over-engineering that costs real latency and throughput for no corresponding benefit. The strong answer frames every acks decision as a deliberate trade-off tied to the actual cost of losing that specific kind of data, not a rule applied uniformly.',
          },
          {
            q: '"A consumer group with more consumers than partitions will process faster" — misunderstanding partition-to-consumer assignment',
            a: 'A partition is only ever assigned to one consumer within a group at a time. Adding a consumer beyond the partition count adds an idle member that does nothing, not additional parallelism. The fix for more parallelism is more partitions, not more consumers past the partition ceiling — a distinction candidates frequently blur under interview pressure.',
          },
          {
            q: '"Increasing retention period is basically free" — ignoring the storage cost multiplier',
            a: 'Retention period directly multiplies disk usage, and that cost itself gets multiplied again by replication factor — a topic sized for 7-day retention at RF=3 needs three times the raw storage of a single unreplicated copy. Candidates who propose long retention "just in case" without doing the storage math (as modeled in Part 01\'s capacity estimation) miss a cost dimension interviewers specifically expect to see quantified, even roughly.',
          },
          {
            q: '"I\'ll just have the application write to the database and Kafka in the same step" — glossing over the dual-write problem',
            a: 'This is the exact gap Part 07\'s transactional outbox pattern exists to close. A database commit and a separate Kafka publish are not atomic with each other by default — a crash between the two either loses the event entirely or, if the ordering is reversed, publishes an event for a database write that never actually committed. A candidate who proposes this without naming the gap, or without reaching for the outbox pattern (or an equivalent CDC-based approach) to close it, has skipped a detail interviewers specifically listen for in any prompt involving an existing system of record.',
          },
          {
            q: '"A KStream-KStream join and a KStream-KTable join are basically the same thing, just syntax" — collapsing a real semantic difference',
            a: 'Part 09 exists specifically to test this distinction. A KStream-KStream join combines two genuinely unbounded event streams within a bounded time window — both sides are streams of independent facts. A KStream-KTable join looks up the current value from a continuously-updated table for each incoming stream record — one side represents current state, not a stream of independent events. Picking the wrong one for a "enrich this event with current reference data" prompt, rather than recognizing it as a stream-to-table lookup, is a common and easily-probed mistake.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Rapid-fire Interview Prep ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Rapid-Fire Interview Prep" />
        <SectionTitle>8 Quick-Recall Questions — Short, Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the difference between a partition and an offset?',
            a: 'A partition is an ordered, append-only log — one of possibly several that make up a topic. An offset is a specific record\'s position within one partition, a unique, monotonically increasing integer scoped to that partition alone (offset 5 in partition 0 and offset 5 in partition 1 are two unrelated records).',
          },
          {
            q: 'Q2. Why does Kafka only guarantee ordering within a partition, not across an entire topic?',
            a: 'Because partitions are the unit of parallelism — multiple partitions are written and read concurrently, by design, to achieve throughput a single log could never sustain. Guaranteeing order across all of them would require serializing every write through one partition, eliminating the parallelism that is the entire point of having more than one.',
          },
          {
            q: 'Q3. What actually happens during a consumer group rebalance?',
            a: 'The group coordinator broker detects a membership change (a consumer joining, leaving, or missing its session timeout) and recomputes partition assignment across the currently-alive members. Under the older eager protocol every member revokes all partitions and waits for a fresh assignment; under cooperative rebalancing, only the specific partitions that actually need to move are revoked, letting unaffected consumers keep processing throughout.',
          },
          {
            q: 'Q4. What is the practical difference between acks=1 and acks=all?',
            a: 'acks=1 means the write is acknowledged as soon as the partition leader appends it locally, before any follower has replicated it — a leader failure in that window loses the write even though the producer was told it succeeded. acks=all waits for the full configured in-sync replica set to confirm, so the write survives any single broker failure, at the cost of the extra round-trip latency that requires.',
          },
          {
            q: 'Q5. What problem does log compaction solve that time-based retention does not?',
            a: 'Time-based retention eventually deletes everything, including the single most recent, still-relevant value for a key — wrong for data representing current state, like a customer\'s current address. Log compaction instead keeps at least the latest record for every key forever, discarding only older, superseded versions, making the topic function as a durable, replayable changelog of current state.',
          },
          {
            q: 'Q6. What is the difference between a KStream and a KTable in Kafka Streams?',
            a: 'A KStream treats every record as an independent, standalone event — an unbounded stream of facts. A KTable treats each record as an upsert, keyed, representing the latest value for that key at that point in time — a continuously updated table view, backed by a compacted changelog topic under the hood.',
          },
          {
            q: 'Q7. Why is idempotent producer configuration alone not sufficient for exactly-once processing?',
            a: 'Idempotent producers deduplicate retries only within a single producer session, tracked by a Producer ID that is discarded when the producer restarts. A crashed and restarted producer resending the same logical event under a new session is invisible to that mechanism — genuine exactly-once semantics for a read-process-write loop additionally needs transactions and a read_committed consumer, as covered in Module 24\'s Part 02 payment example.',
          },
          {
            q: 'Q8. When would you reach for Kafka Connect instead of writing a custom producer or consumer?',
            a: 'Whenever the integration is a well-understood, generic pattern — pulling from or pushing to a database, object storage, or another common system — that an existing, battle-tested connector already handles, as in Part 04\'s CDC migration example. A custom producer or consumer is worth writing when the logic is genuinely specific to your business domain, not when you\'d just be re-implementing what a connector already does reliably.',
          },
          {
            q: 'Q9. What is the transactional outbox pattern, and what specific problem does it solve?',
            a: 'It solves the dual-write consistency problem: an application that writes to its own database and then separately calls a Kafka producer has an unavoidable gap where a crash between the two leaves the database updated but no event ever published, with no durable record that a publish was even owed. The outbox pattern writes the business row and an outbox row in the same atomic database transaction, then a separate relay process (often a CDC connector) publishes from the outbox table and marks rows published — trading a small, acceptable duplicate-event risk for a guarantee that no event is ever silently lost.',
          },
          {
            q: 'Q10. Why does a KStream-KTable join require both sides to share the same key, and what happens if they don\'t initially match?',
            a: 'A KTable join works by looking up the current value for a given key from the table for each incoming stream record — that lookup is only meaningful if the stream record\'s key matches the table\'s key. If the stream is naturally keyed by something else (a session ID, say, when the table is keyed by content ID), an explicit re-keying step is required before the join, which itself triggers a Kafka Streams repartition under the hood. Forgetting this step is one of the most common real bugs in this exact pattern.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <KeyTakeaways items={[
        'A Kafka system-design interview tests whether partitioning, delivery semantics, schema design, consumer group topology, and monitoring emerge naturally from reasoning through requirements — not whether you can recite a definition on cue.',
        'The same underlying tools recur across very different systems: a keyed topic for per-entity ordering, a compacted topic for current-state materialization, separate consumer groups for independent fan-out, and a DLQ for isolating poison messages — recognize the pattern, then adapt the specifics to the prompt.',
        'Durability and latency settings are deliberate trade-offs tied to the actual cost of losing or delaying a specific kind of data, never a uniform default — acks=1 was the right call for driver locations and acks=all plus idempotency keys was the right call for payments, in the very same module.',
        'Some system boundaries are outside what Kafka itself can guarantee — a transaction cannot make an external HTTP call atomic, and replication factor cannot replicate across regions — knowing exactly where Kafka\'s guarantees end is what separates a strong answer from a memorized one.',
        'This 24-module track went from "what is an event" to designing multi-region, latency-critical, exactly-once systems from scratch — that arc is the actual skill being tested in a senior Kafka interview, and it is now yours to apply.',
      ]} />

      <Divider />

      {/* ── Completion ── */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${K}18, transparent)`,
          border: `1px solid ${K}44`, borderRadius: 14, padding: '32px 36px',
        }}>
          <p style={{
            fontSize: 10, color: K, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: FONT_MONO, fontWeight: 800, margin: '0 0 12px',
          }}>
            🎉 Track Complete — All 24 Modules
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1px',
            color: 'var(--text)', marginBottom: 16, fontFamily: FONT_DISPLAY, lineHeight: 1.2,
          }}>
            You've completed the full Apache Kafka track — events to system design.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 24 }}>
            From your first event, topic, and partition through producers, consumers, brokers, delivery
            semantics, schemas, Kafka Streams, Connect, security, operations, managed cloud platforms,
            testing, and now full system-design synthesis — that is the complete arc of what a working Kafka
            engineer actually needs, end to end. Revisit any module as a reference whenever a real project
            calls for it; the vocabulary table and worked examples in this module are built specifically to
            be reused before your next interview, not read once and forgotten.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/learn/apache-kafka" style={{ background: K, color: '#fff', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              ← Back to the Apache Kafka track overview
            </Link>
            <Link href="/learn" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              Browse other tracks
            </Link>
          </div>
        </div>
      </section>
    </LearnLayout>
  )
}
