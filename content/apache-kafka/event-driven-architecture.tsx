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

export default function EventDrivenArchitecture() {
  return (
    <LearnLayout
      title="Event-Driven Architecture"
      description="What event-driven architecture actually means as a system design style, EDA vs request-response trade-offs, notification vs state-transfer events, the outbox pattern, choreography vs orchestration, schema as an API contract, and a worked order-fulfillment example."
      section="Apache Kafka — Module 20"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Event-Driven Architecture', href: '/learn/apache-kafka/event-driven-architecture' },
      ]}
      prev={{ title: 'Disaster Recovery and Multi-Region Kafka', href: '/learn/apache-kafka/disaster-recovery-multi-region' }}
      next={{ title: 'Change Data Capture with Debezium', href: '/learn/apache-kafka/cdc-debezium' }}
    >
      {/* Part 01 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What EDA Actually Means" />
        <SectionTitle>Event-Driven Architecture Is a Communication Style, Not a Kafka Feature</SectionTitle>
        <Para>
          Every module so far has treated Kafka as infrastructure — brokers, partitions, producers, consumers,
          replication. This module steps back and asks a different question: what does it actually mean to
          design a <em>system</em> around Kafka, rather than just point a few services at a cluster? The
          answer is event-driven architecture (EDA) — a system design style where services communicate by
          publishing facts about things that happened, and other services independently react to those facts,
          rather than one service directly calling another and waiting for a response.
        </Para>
        <Para>
          The contrast is with request-response, the style most engineers learn first: Service A calls
          Service B's API, B does some work, and B returns a response that A waits for. In EDA, Service A
          publishes an event — <code>order.placed</code>, <code>payment.charged</code>,
          <code>inventory.reserved</code> — to a topic, and does not know or care which services, if any, are
          listening. Zero, one, or ten services might react. A does not wait for any of them, and A's code
          never changes when a new reactor is added.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Request-response mental model:</strong> "I call you, you do the thing, you tell me the
            result, I continue." The caller knows exactly who handled the request and what happened.
          </Para>
          <Para>
            <strong>Event-driven mental model:</strong> "I announce that something happened. I move on
            immediately. Whoever cares reacts on their own time, in their own way, and I may never know who
            reacted or what they did with it." The publisher has no idea who's listening, and doesn't need to.
          </Para>
        </HighlightBox>
        <Para>
          This is not a Kafka-specific idea — EDA predates Kafka and can be built on many different
          technologies. But Kafka is an unusually good fit for it, because a durable, replayable, multi-
          subscriber topic is exactly the primitive EDA needs: publishers don't need to know who's listening,
          new subscribers can join at any time and even replay history, and the broker itself absorbs the
          timing mismatch between a fast publisher and a slow (or temporarily offline) subscriber — the
          temporal, spatial, and rate decoupling covered in earlier modules is precisely what makes EDA
          practical at scale rather than just a nice diagram.
        </Para>
        <Callout title="EDA is a design decision, made per interaction, not a system-wide switch" color={K}>
          Very few real systems are "fully event-driven" or "fully request-response." A checkout flow might
          use synchronous request-response for the parts a user is actively waiting on (validating a
          discount code) and event-driven communication for everything that happens after the user clicks
          "place order" (inventory, payment, shipping, notifications). This module is about recognizing when
          each style fits, not about treating EDA as universally superior.
        </Callout>
      </section>

      <Divider />

      {/* Part 02 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — EDA vs Request-Response" />
        <SectionTitle>The Real Trade-Offs — Decoupling and Resilience vs Consistency and Debuggability</SectionTitle>
        <Para>
          Choosing EDA over request-response is a genuine trade-off, not a strict upgrade. Understanding both
          sides of the trade is what separates a thoughtful architecture decision from cargo-culting "everything
          should be event-driven" because it sounds more modern.
        </Para>
        <SubTitle>What EDA buys you</SubTitle>
        <BulletList
          items={[
            'Decoupling — the order service does not need to know the notification service, the fraud-detection service, or the analytics pipeline exist. New consumers can be added with zero changes to the producer, exactly as covered for pub-sub topics in earlier modules.',
            'Independent scaling — each consuming service scales based on its own load characteristics, not tied to the producer\'s request volume or any other consumer\'s processing speed.',
            'Resilience to a downstream service being down — if the notification service is deployed, crashed, or being restarted, order placement still succeeds. The event sits durably in the topic and the notification service catches up whenever it comes back, instead of the order API itself failing or timing out because a downstream dependency was unavailable.',
          ]}
        />
        <SubTitle>What it costs you</SubTitle>
        <BulletList
          items={[
            'Eventual consistency — there is a real, non-zero window between "order placed" and "inventory actually reserved" during which the two facts are out of sync. A request-response system that synchronously reserves inventory before confirming the order has no such window, at the cost of the order API now depending on the inventory service being up and fast.',
            'Harder end-to-end debugging and tracing — in request-response, a stack trace or a single trace ID often shows you the whole call chain. In EDA, "why didn\'t the confirmation email send?" can require tracing through several independently-deployed consumers, each polling a topic on its own schedule, with no single synchronous call chain to follow.',
            'No implicit response — the publisher genuinely does not know if a consumer succeeded, failed, or even exists. Any "did this work?" signal has to be built deliberately, usually as another event, not assumed for free the way a request-response caller gets a response by construction.',
          ]}
        />
        <Table
          headers={['Dimension', 'Request-response', 'Event-driven']}
          rows={[
            ['Coupling', 'Caller must know the callee\'s address and API contract directly.', 'Publisher knows only the topic; consumers can be added or removed with no producer changes.'],
            ['Failure isolation', 'A downstream outage propagates back to the caller — often as a timeout or error the caller must handle.', 'A downstream outage delays that consumer\'s processing but does not block the publisher or other consumers.'],
            ['Consistency', 'Strong — the caller knows the result before moving on.', 'Eventual — there is a real window where dependent facts have not caught up yet.'],
            ['Debuggability', 'A request\'s full path is usually traceable through one synchronous call chain.', 'Tracing a business process means following independently-timed consumers across multiple topics; requires deliberate correlation IDs and tracing infrastructure.'],
            ['Best fit', 'A user is actively waiting on the answer (validate a coupon code, check current price).', 'A fact needs to reach several independent, loosely coupled systems, and none of them needs to block the fact from being recorded.'],
          ]}
        />
        <Callout title="The question that actually decides it" color="#22c55e">
          Ask: does the caller need to know the outcome before it can safely proceed, or is the caller just
          announcing that something happened? If the answer is "the caller needs the outcome" — checking a
          discount code is valid before showing a price — that's request-response. If it's "the caller just
          needs to record and move on" — an order was placed, a payment cleared — that's a natural fit for an
          event.
        </Callout>
      </section>

      <Divider />

      {/* Part 03 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Notification vs State Transfer" />
        <SectionTitle>Thin Events vs Fat Events — Two Different Event Payload Shapes</SectionTitle>
        <Para>
          Once a team decides to communicate via events, there's a second design decision that matters just
          as much: how much information does the event itself carry? This is the distinction between event
          notification and event-carried state transfer, and it directly shapes how tightly consumers end up
          coupled to the publisher.
        </Para>
        <SubTitle>Event notification — a thin "something happened, go fetch details" signal</SubTitle>
        <Para>
          An event-notification style event carries the bare minimum: an identifier and a fact. The consumer,
          on receiving it, makes a separate call back to the source service (or its API) to fetch whatever
          additional detail it actually needs.
        </Para>
        <CodeBox label="event notification — thin payload, consumer fetches details separately">
{`{
  "event_type": "order.updated",
  "order_id": "ORD-88213",
  "occurred_at": "2026-09-11T14:22:03Z"
}

# The consumer, on receiving this, calls:
# GET /api/orders/ORD-88213
# to find out WHAT changed -- shipping address? item quantity?
# order status? The event itself doesn't say.`}
        </CodeBox>
        <SubTitle>Event-carried state transfer — a fat event with everything a consumer needs</SubTitle>
        <Para>
          An event-carried-state-transfer style event embeds the full relevant state directly in the event
          payload. The consumer can act on it immediately, with no follow-up call to anyone.
        </Para>
        <CodeBox label="event-carried state transfer — fat payload, self-contained">
{`{
  "event_type": "order.updated",
  "order_id": "ORD-88213",
  "occurred_at": "2026-09-11T14:22:03Z",
  "customer_id": "CUST-4471",
  "status": "shipped",
  "previous_status": "processing",
  "shipping_address": {
    "line1": "482 Market St", "city": "Austin", "state": "TX", "zip": "78701"
  },
  "line_items": [
    { "sku": "SKU-1029", "quantity": 2, "unit_price_cents": 1499 },
    { "sku": "SKU-2201", "quantity": 1, "unit_price_cents": 3999 }
  ],
  "total_cents": 6997
}

# The consumer has everything it needs right here -- no follow-up
# API call to the order service required at all`}
        </CodeBox>
        <Table
          headers={['Style', 'Coupling to the source service', 'Consumer load on source', 'Risk']}
          rows={[
            ['Event notification (thin)', 'Higher — consumer must call back to the source for details, tying its uptime to the source service being reachable.', 'A burst of events causes a burst of follow-up API calls back to the source — can create its own load spike.', 'If the source has since changed again by the time the consumer calls back, the fetched detail may not match the moment the event was about.'],
            ['Event-carried state transfer (fat)', 'Lower — the consumer is self-sufficient once the event arrives, no dependency on the source being reachable afterward.', 'None — no follow-up calls at all.', 'The event schema now carries real payload weight and must stay in sync with what changed at the moment it was emitted; larger events also mean more storage and network cost at scale.'],
          ]}
        />
        <Para>
          Most production systems land somewhere in between rather than at either extreme: include enough
          state in the event that the overwhelmingly common consumer use case never needs a follow-up call
          (the fields a notification service, an analytics pipeline, and a search-index updater all actually
          use), while accepting that a rare consumer with an unusual need might still make an occasional
          direct call back to the source service for something the event genuinely doesn't carry.
        </Para>
        <Callout title="Fat events reduce coupling at runtime but increase coupling in the schema" color={K}>
          A fat event removes the consumer's runtime dependency on the source service being up — which is
          exactly the resilience EDA is supposed to provide. But it moves the coupling into the event schema
          itself: every consumer now depends on that payload shape staying stable. This is exactly why Part 06
          treats event schemas as a serious, org-wide API contract rather than an implementation detail.
        </Callout>
      </section>

      <Divider />

      {/* Part 04 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Outbox Pattern" />
        <SectionTitle>The Dual-Write Problem — And the Outbox Pattern That Solves It</SectionTitle>
        <Para>
          Here is a problem every team building EDA on top of a service with its own database eventually hits.
          A service that processes an order needs to do two things when an order is placed: write the order to
          its own database (so the service itself has a record), and publish an <code>order.placed</code> event
          to Kafka (so other services find out). These are two separate systems — a database and a Kafka
          cluster — with no shared transaction between them. This is the dual-write problem.
        </Para>
        <CodeBox label="the dual-write problem — why writing to two systems is not atomic">
{`def place_order(order):
    db.save(order)                      # write #1: the database
    kafka_producer.send("order.placed", order)  # write #2: Kafka

# What if the process crashes between these two lines?
# -> order is saved to the database, but the event was NEVER published
# -> every downstream service (inventory, notifications, analytics)
#    has no idea this order exists

# What if the database write succeeds but the Kafka send fails
# (broker temporarily unreachable, producer buffer full)?
# -> same outcome: silent, permanent inconsistency between the
#    service's own database and the rest of the event-driven system

# What if you flip the order -- publish the event FIRST, then save to
# the database?
def place_order_flipped(order):
    kafka_producer.send("order.placed", order)  # write #1: Kafka
    db.save(order)                               # write #2: database

# Now a crash between the two lines means downstream services react
# to an order that was never actually saved -- inventory gets
# reserved for an order that doesn't exist in the source of truth`}
        </CodeBox>
        <Para>
          Neither ordering is safe, because a database write and a Kafka publish are not atomic together —
          there is no built-in mechanism spanning both systems that guarantees "both happen, or neither
          happens." The transactional outbox pattern solves this without needing a distributed transaction
          across two different technologies.
        </Para>
        <SubTitle>How the outbox pattern works</SubTitle>
        <Para>
          Instead of writing to the database and publishing to Kafka as two separate operations, the service
          writes to two tables in the <em>same database</em>, inside a single local database transaction — the
          orders table, and an outbox table that records "this event needs to be published." Because both
          writes are in the same database transaction, they are atomic with respect to each other using
          nothing more exotic than the database's own transaction guarantees. A separate process then reads
          new rows from the outbox table and actually publishes them to Kafka.
        </Para>
        <CodeBox label="the outbox pattern — one atomic local transaction, two tables">
{`BEGIN TRANSACTION;

INSERT INTO orders (order_id, customer_id, status, total_cents)
VALUES ('ORD-88213', 'CUST-4471', 'placed', 6997);

INSERT INTO outbox (id, aggregate_type, aggregate_id, event_type, payload, created_at)
VALUES (
  gen_random_uuid(),
  'order',
  'ORD-88213',
  'order.placed',
  '{"order_id":"ORD-88213","customer_id":"CUST-4471","total_cents":6997}',
  now()
);

COMMIT;

# Both rows commit together, or neither does -- this is an ordinary
# ACID transaction inside ONE database, not a distributed transaction
# spanning the database and Kafka. No new coordination technology
# is needed to get this atomicity guarantee.`}
        </CodeBox>
        <Para>
          The remaining question is how rows land in Kafka from the outbox table. A naive approach — a
          background job that polls the outbox table on a timer and publishes new rows — works, but adds
          latency and constant polling load. The far more common production approach is to point Change Data
          Capture (CDC) at the outbox table specifically: a CDC connector like Debezium tails the database's
          own transaction log (the same mechanism covered in the next module) and streams new outbox rows to
          Kafka as they are committed, with very low latency and no polling overhead. This ties the outbox
          pattern directly into CDC — the outbox table becomes a clean, purpose-built source table for exactly
          the events a service intends to publish, rather than CDC-ing the entire orders table and exposing
          every internal column as a public event.
        </Para>
        <Table
          headers={['Approach', 'Atomicity with the DB write', 'Latency', 'Operational cost']}
          rows={[
            ['Naive dual write (DB then Kafka, or Kafka then DB)', 'None — a crash between the two writes causes permanent inconsistency', 'Lowest, when it works', 'Looks simple, but silently loses correctness under real failure conditions'],
            ['Outbox table + polling publisher', 'Full — one local database transaction covers both writes', 'Seconds, bounded by the poll interval', 'Simple to build, but constant polling load and added latency'],
            ['Outbox table + CDC (e.g. Debezium)', 'Full — same local transaction guarantee', 'Sub-second — driven by transaction log tailing, not polling', 'Requires running a CDC connector, but is the standard production pattern — covered in depth next module'],
          ]}
        />
        <Callout title="This is exactly why the next module exists" color={K}>
          The outbox pattern is the design decision; CDC is the mechanism that usually implements its "publish
          to Kafka" half in production. If this pattern feels incomplete without knowing how a tool actually
          tails a database's transaction log reliably, that's the right instinct — the next module, Change Data
          Capture with Debezium, is precisely that mechanism.
        </Callout>
      </section>

      <Divider />

      {/* Part 05 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Choreography vs Orchestration" />
        <SectionTitle>Choreography vs Orchestration — Who's in Charge of a Multi-Step Process</SectionTitle>
        <Para>
          A single event is easy to reason about. The harder design question is a business process made of
          several steps, each potentially handled by a different service — placing an order, reserving
          inventory, charging a payment, creating a shipment. There are two fundamentally different ways to
          coordinate a multi-step process like this in an event-driven system: choreography and orchestration.
        </Para>
        <SubTitle>Choreography — each service reacts to the previous step's event</SubTitle>
        <Para>
          In choreography, there is no central coordinator. Each service knows only its own piece: it
          subscribes to the event that should trigger its work, does that work, and publishes its own event
          when done, which the next service in the chain subscribes to. The overall process emerges from the
          sum of these independent, uncoordinated reactions — no single service knows the whole flow.
        </Para>
        <CodeBox label="choreography — a chain of independent reactions, no central coordinator">
{`order-service:    publishes order.placed
inventory-service: subscribes to order.placed
                   reserves inventory
                   publishes inventory.reserved
payment-service:   subscribes to inventory.reserved
                   charges payment
                   publishes payment.charged
shipping-service:  subscribes to payment.charged
                   creates shipment
                   publishes shipment.created

# No service holds a map of the whole process. Each one only knows:
# "when I see event X, I do my job, then I publish event Y."
# The full order-fulfillment flow only exists implicitly, as the
# sum of these independent reactions.`}
        </CodeBox>
        <SubTitle>Orchestration — a central coordinator drives the process</SubTitle>
        <Para>
          In orchestration, a dedicated coordinator (often called a saga orchestrator) knows the entire
          process explicitly. It issues commands to each service in turn, waits for that step's result, and
          decides what happens next — including how to handle a failure partway through. Services in this
          model react to direct commands from the orchestrator rather than to each other's events.
        </Para>
        <CodeBox label="orchestration — one coordinator explicitly drives every step">
{`order-fulfillment-orchestrator:
  step 1: send reserve_inventory command to inventory-service
          -> wait for inventory.reservation.result event
  step 2: if reserved, send charge_payment command to payment-service
          -> wait for payment.charge.result event
  step 3: if charged, send create_shipment command to shipping-service
          -> wait for shipment.creation.result event
  step 4: if any step fails, issue compensating commands to undo
          whatever already succeeded (covered in Part 06)

# The orchestrator holds the entire process definition in one place.
# Individual services don't need to know what happens before or
# after their own step -- they just respond to commands.`}
        </CodeBox>
        <Table
          headers={['Dimension', 'Choreography', 'Orchestration']}
          rows={[
            ['Where the process logic lives', 'Spread across every participating service — no single place to read the whole flow', 'Centralized in one orchestrator — the whole process is readable in one place'],
            ['Coupling', 'Services are coupled to event names/schemas but not to each other directly — loosest coupling', 'Services are coupled to the orchestrator\'s command contract; the orchestrator is coupled to every service it coordinates'],
            ['Adding a new step', 'Add a new subscriber to an existing event — no changes to existing services', 'Update the orchestrator\'s process definition — existing services usually untouched, but the orchestrator itself changes'],
            ['Debugging a stuck process', 'Harder — must trace through several independently-deployed services\' logs to reconstruct what happened', 'Easier — the orchestrator\'s own state/logs usually show exactly which step the process is stuck on'],
            ['Failure handling for a multi-step process', 'Each service must know how to react to a failure event from any other step it depends on — logic gets scattered', 'Centralized — the orchestrator explicitly defines compensating actions for every step, in one place'],
            ['Best fit', 'A small number of loosely related steps where no single step needs to make process-wide decisions', 'A process with several steps, complex failure/compensation logic, or where visibility into "where are we in the process" matters operationally'],
          ]}
        />
        <Callout title="Choreography scales in participants, orchestration scales in process complexity" color="#22c55e">
          Choreography tends to work well while a process stays simple — a handful of steps, straightforward
          success paths. As the number of steps grows and failure handling gets genuinely complicated (this
          module's Part 07 order-fulfillment example is a good size to notice the tipping point), teams
          increasingly reach for orchestration specifically because centralizing the process logic makes both
          the happy path and the failure/compensation paths far easier to reason about and operate.
        </Callout>
      </section>

      <Divider />

      {/* Part 06 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Schema as an API Contract" />
        <SectionTitle>An Event Schema Is a Public API Contract Between Teams</SectionTitle>
        <Para>
          In request-response systems, most teams instinctively treat a REST or gRPC API's request/response
          shape as a contract — you version it carefully, you don't remove fields without warning, you
          communicate breaking changes ahead of time. Event schemas deserve exactly the same discipline, and
          teams that skip this discipline usually learn why the hard way.
        </Para>
        <Para>
          The reason is structural, not stylistic: once a team publishes an <code>order.placed</code> event
          with a certain schema, every consumer of that topic — inventory, payments, shipping, analytics,
          fraud detection, and any team that adds a new consumer six months from now — has built code that
          depends on that exact shape. Unlike a REST API, where the publisher can see exactly who's calling it
          (every caller has to authenticate and hit a known endpoint), a Kafka topic's publisher generally has
          no visibility into who is consuming it. A breaking schema change doesn't fail loudly at the
          publisher; it silently breaks an unknown number of consumers, possibly ones the publishing team
          doesn't even know exist.
        </Para>
        <CodeBox label="a breaking event schema change and its blast radius">
{`# order.placed schema, version 1:
{ "order_id": "string", "customer_id": "string", "total_cents": "integer" }

# A well-meaning engineer renames total_cents to total_amount_cents
# for clarity, and ships it without checking who consumes this topic

# order.placed schema, version 2 (BREAKING, deployed without warning):
{ "order_id": "string", "customer_id": "string", "total_amount_cents": "integer" }

# Every consumer expecting "total_cents" now either:
# - throws a deserialization/field-access error and stops processing
# - or silently reads total_cents as missing/null and proceeds with
#   wrong data (arguably worse -- a silent correctness bug instead
#   of a loud failure)

# The publishing team may not even know inventory-service,
# fraud-detection-service, and the BI team's nightly export job
# all depend on this exact field name`}
        </CodeBox>
        <Para>
          The fix is the same schema evolution discipline covered for serialization formats elsewhere in this
          track: add new fields as optional with sensible defaults rather than renaming or removing existing
          ones, use a schema registry that enforces compatibility rules (backward, forward, or full
          compatibility) at publish time so an incompatible change is rejected before it ever reaches the
          topic, and treat any genuinely breaking change as a new event type or a new topic version rather
          than a silent mutation of the existing one.
        </Para>
        <Table
          headers={['Practice', 'Why it matters for EDA specifically']}
          rows={[
            ['Schema registry with enforced compatibility mode', 'Rejects an incompatible schema at publish time, before it can silently break an unknown number of downstream consumers across teams.'],
            ['Additive-only changes (new optional fields with defaults)', 'Existing consumers, built against the old schema, keep working unmodified; only consumers that want the new field need to update.'],
            ['Treating a breaking change as a new event type/version', 'Makes the breaking change explicit and opt-in — old consumers keep reading the old event type until they deliberately migrate.'],
            ['Documenting who consumes a topic', 'Without a REST API\'s implicit visibility into callers, a Kafka topic needs deliberate consumer registration or discovery so a schema change can be communicated to everyone actually affected.'],
          ]}
        />
        <Callout title="The org-wide cost of skipping this is proportional to how many teams consume the topic" color="#ef4444">
          A schema break on an internal topic with one consumer is a minor bug. A schema break on a
          widely-consumed topic like <code>order.placed</code> — read by inventory, payments, shipping,
          analytics, and fraud detection — is a simultaneous, multi-team incident, because the publishing team
          has effectively changed a public API without a deprecation window. The more successful and widely
          adopted an event-driven architecture becomes, the more this discipline matters, not less.
        </Callout>
      </section>

      <Divider />

      {/* Part 07 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked Example" />
        <SectionTitle>Designing EDA for Order Fulfillment — A Worked Example</SectionTitle>
        <Para>
          Bringing the whole module together: an order-fulfillment flow is a textbook event-driven design
          problem. The happy path is simple to describe. The value of doing this exercise carefully is in the
          failure paths — specifically, what happens when a step fails after an earlier step has already
          taken an action that needs to be undone.
        </Para>
        <SubTitle>The happy path</SubTitle>
        <CodeBox label="order fulfillment — happy path, chosen as choreography for this walkthrough">
{`1. order-service:      customer places order
                       -> publishes order.placed
2. inventory-service:  subscribes to order.placed
                       reserves the ordered items
                       -> publishes inventory.reserved
3. payment-service:    subscribes to inventory.reserved
                       charges the customer's payment method
                       -> publishes payment.charged
4. shipping-service:   subscribes to payment.charged
                       creates a shipment record, notifies the warehouse
                       -> publishes shipment.created
5. notification-service: subscribes to shipment.created (and, separately,
                       to order.placed for an initial confirmation email)
                       sends the customer a shipping confirmation`}
        </CodeBox>
        <SubTitle>What could go wrong — the payment-fails-after-inventory-reserved case</SubTitle>
        <Para>
          Here is the scenario that makes the design interesting: inventory was successfully reserved (step
          2 above completed and published its event), but the payment charge in step 3 fails — the customer's
          card is declined, or the payment processor times out. Inventory has already been taken out of
          available stock for other customers to buy, but the order this reservation was for is not actually
          going to complete. Left alone, this is a data-correctness bug: reserved inventory with no
          corresponding successful order, quietly reducing available stock forever.
        </Para>
        <Para>
          This is exactly what the saga pattern — and specifically, compensating actions — exists to solve.
          A saga is a sequence of local transactions where each step publishes an event on success, and if any
          step fails, the system runs compensating actions that semantically undo the effects of the steps
          that already succeeded, since there is no cross-service distributed transaction to simply roll back.
        </Para>
        <CodeBox label="order fulfillment — the compensating-action path when payment fails">
{`1. order-service:      order.placed
2. inventory-service:  inventory.reserved   (items removed from available stock)
3. payment-service:    attempts to charge the card -- DECLINED
                       -> publishes payment.failed (NOT payment.charged)

4. inventory-service:  subscribes to payment.failed
                       runs its COMPENSATING ACTION: releases the
                       reservation, returning items to available stock
                       -> publishes inventory.reservation.released

5. order-service:      subscribes to payment.failed
                       updates the order's own status to "payment_failed"
                       (its own local, compensating state change)

6. notification-service: subscribes to payment.failed
                       sends the customer a payment-failed notice,
                       distinct from the earlier order-confirmation email

# Nothing here is a single atomic rollback across services -- there
# is no such mechanism. Instead, EVERY step that has a real-world
# side effect (reserving inventory, charging a card) is paired with
# an explicit compensating action (releasing the reservation,
# refunding a charge) that a service runs in response to a
# downstream failure event.`}
        </CodeBox>
        <SubTitle>Choreography vs orchestration for this specific flow</SubTitle>
        <Para>
          With only four steps and one failure path, choreography (as shown above) is a reasonable choice —
          each service reacts to the relevant event and knows its own compensating action. But notice the
          scattering already starting: inventory-service needs to know about both
          <code>order.placed</code> (do the work) and <code>payment.failed</code> (undo the work), and that
          logic lives entirely inside inventory-service with no single place to see the whole process. Add a
          few more steps — a fraud check, a multi-warehouse routing decision, a partial-shipment path — and
          the number of failure events every service must individually understand grows quickly. This is
          the tipping point from Part 05 where many teams migrate this same flow to an explicit saga
          orchestrator: one service that owns the entire process definition, including every compensating
          action, in one place.
        </Para>
        <Table
          headers={['Failure point', 'What already happened', 'Compensating action needed']}
          rows={[
            ['Payment fails after inventory reserved', 'Inventory removed from available stock', 'Release the inventory reservation back to available stock'],
            ['Shipment creation fails after payment charged', 'Customer was charged, inventory reserved', 'Refund the charge; release the inventory reservation'],
            ['Warehouse rejects the shipment after shipment.created (rare, but real)', 'Charge and reservation both committed, shipment record created', 'Refund the charge; release the reservation; cancel the shipment record; notify the customer of the cancellation'],
          ]}
        />
        <Callout title="Design the compensating action at the same time as the forward action" color={K}>
          The mistake teams make is designing the happy path first and bolting on failure handling later. The
          worked example above only holds together because every service that takes a real action
          (reserving stock, charging a card) was designed from the start with an explicit compensating action
          it can run if a later step in the chain fails — not because Kafka or the saga pattern provides that
          for free.
        </Callout>
      </section>

      <Divider />

      {/* Part 08 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Observability for Event-Driven Systems" />
        <SectionTitle>Tracing a Business Process Across Services That Never Call Each Other Directly</SectionTitle>
        <Para>
          Part 02 named "harder end-to-end debugging" as one of the real costs of EDA, and it's worth treating
          that cost seriously enough to design around, rather than discovering it during an incident. In a
          request-response system, a single trace ID generated at the entry point typically flows through
          every synchronous call in the chain almost for free, because each call directly invokes the next.
          In an event-driven system, there is no such chain — each consumer polls its topic on its own
          schedule, and nothing automatically threads a single identifier through five independently-deployed
          services reacting to five different events, minutes or hours apart.
        </Para>
        <SubTitle>Correlation IDs — the minimum viable fix</SubTitle>
        <Para>
          The baseline practice is to generate a correlation ID (often the same ID as the originating business
          entity, like the order ID, or a dedicated trace ID) at the point the process begins, and propagate
          it through every event in the chain — not as an afterthought, but as a required field on every
          event schema in the flow. Every service that publishes a downstream event copies the correlation ID
          forward unchanged, regardless of what else changes in the payload.
        </Para>
        <CodeBox label="propagating a correlation ID through an event chain">
{`{
  "event_type": "order.placed",
  "correlation_id": "trace-9f2e1a",
  "order_id": "ORD-88213",
  "...": "..."
}

# inventory-service publishes its own event, carrying the SAME
# correlation_id forward, even though the event_type and payload
# are completely different:
{
  "event_type": "inventory.reserved",
  "correlation_id": "trace-9f2e1a",
  "order_id": "ORD-88213",
  "...": "..."
}

# every log line and metric emitted by every service in this chain
# is tagged with correlation_id=trace-9f2e1a, so a single query
# across all services' logs reconstructs the full process timeline`}
        </CodeBox>
        <SubTitle>What to actually monitor across an event-driven flow</SubTitle>
        <Table
          headers={['Signal', 'What it catches']}
          rows={[
            ['End-to-end process latency (correlation-ID-grouped, first event to last event)', 'A process that is technically completing but taking much longer than expected end to end — often invisible if each service only reports its own, individually-fast processing time'],
            ['Per-topic consumer lag for every consumer in the chain', 'Which specific step of the process is currently the bottleneck, without needing to inspect individual traces'],
            ['A count of correlation IDs that started but never reached the final expected event', 'Stuck or abandoned processes — orders that were placed but never shipped, for example — the event-driven equivalent of a request that never got a response'],
            ['Dead-letter-queue depth per topic in the chain', 'A step that is failing outright, and would otherwise sit silently as an order simply not progressing'],
          ]}
        />
        <Para>
          The "started but never finished" signal deserves particular attention, because it's the failure mode
          EDA is uniquely prone to hiding. In request-response, a process that fails partway through usually
          surfaces as an error returned to the original caller. In EDA, if a step fails and nobody is watching
          for it, the process can simply stall — the correlation ID exists in the logs of the steps that did
          run, and nothing points at the fact that the final expected event never showed up.
        </Para>
        <Callout title="Build observability into the event schema from the start, not after the first hard-to-debug incident" color="#38bdf8">
          Adding a correlation_id field to every event in a chain costs nothing to design in from day one and
          is genuinely painful to retrofit across several already-shipped services and their existing
          consumers. Treat it as a required field in the schema conventions for any event that participates in
          a multi-step process, the same way request-response systems treat a trace header as non-negotiable.
        </Callout>
      </section>

      <Divider />

      {/* Part 09 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — When Not to Reach for Events" />
        <SectionTitle>EDA Anti-Patterns — Signs the Event-Driven Answer Is the Wrong One</SectionTitle>
        <Para>
          Every module in this track has built a case for what Kafka and event-driven design do well. It's
          just as important to recognize the shapes of problem where reaching for an event, out of habit
          rather than fit, actively makes a system worse. These are the recurring anti-patterns worth
          watching for.
        </Para>
        <SubTitle>Anti-pattern: using events for something the caller needs an answer to right now</SubTitle>
        <Para>
          If a checkout flow publishes a <code>coupon.validation.requested</code> event and then polls,
          waits, or blocks for a <code>coupon.validation.completed</code> event to come back before it can
          render a price to the user, this is request-response wearing an event-driven costume — with all of
          EDA's added latency and complexity, and none of its actual benefit, since the caller still can't
          proceed until it gets a synchronous-shaped answer. The honest fix is usually a direct, synchronous
          API call for this specific interaction, even inside an otherwise event-driven system.
        </Para>
        <SubTitle>Anti-pattern: chatty, fine-grained events that recreate a call graph</SubTitle>
        <Para>
          Some teams, having adopted EDA, publish an event for every minor internal state change — a
          field-level update event for every single attribute change on an entity — and end up with dozens of
          consumers stitching these fine-grained events back together to reconstruct something that was
          really just one coherent business fact. This recreates the tight coupling EDA was meant to avoid,
          just expressed as event names instead of function calls, while paying the full overhead (schema
          management, topic proliferation, ordering complexity across related events) that coarse,
          well-designed events would have avoided.
        </Para>
        <SubTitle>Anti-pattern: an event as a disguised RPC call to exactly one consumer</SubTitle>
        <Para>
          If a topic genuinely has exactly one consumer, always has, and always will — the publisher and
          consumer are really a tightly coupled pair pretending to be decoupled — some of EDA's overhead
          (schema registry ceremony, replication, retention tuning) may not be buying anything a well-defined,
          versioned direct API call between the two services wouldn't have provided more simply. This is a
          judgment call, not a hard rule — a single-consumer topic today can become a multi-consumer topic
          tomorrow, and building it as an event from the start avoids a later migration. But it's worth
          naming honestly rather than assuming every interaction benefits from being an event by default.
        </Para>
        <Table
          headers={['Anti-pattern', 'What it looks like', 'Better fit']}
          rows={[
            ['Blocking on a response to an event', 'Publisher waits for a downstream event before it can proceed, defeating the point of decoupling', 'A direct, synchronous API call for interactions the caller genuinely can\'t proceed without'],
            ['Field-level, chatty events', 'Dozens of narrow events per entity that consumers must stitch back together', 'Coarser, well-designed events per meaningful business fact (Part 03\'s event design guidance)'],
            ['Single-consumer "event" that\'s really a disguised RPC call', 'One producer, one consumer, tightly coupled in practice despite the topic abstraction', 'Honest evaluation of whether a direct API call would be simpler — or accept the overhead as insurance against future multi-consumer growth'],
          ]}
        />
        <Callout title="EDA is a tool for a specific shape of problem, not a default" color={K}>
          The healthiest event-driven systems are the ones where every event genuinely represents "multiple
          independent parties need to know this happened, and none of them needs to block it." Any event that
          doesn't fit that description is worth a second look — not necessarily removed, but at least
          deliberately chosen rather than defaulted into.
        </Callout>
      </section>

      <Divider />

      {/* Part 10 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Idempotent Consumers Across the Chain" />
        <SectionTitle>Every Consumer in an Event Chain Needs to Assume It Will See an Event More Than Once</SectionTitle>
        <Para>
          Earlier modules established that Kafka's default delivery guarantee is at-least-once — a consumer
          can, under real failure conditions (a crash between processing and committing an offset, a
          rebalance mid-batch), see the same event more than once. In a simple single-consumer pipeline this
          is a known, manageable property. In a multi-step event-driven chain like the order-fulfillment
          example in Part 07, this property compounds: a duplicate delivery at any single step can trigger a
          duplicate side effect that ripples forward into every step after it.
        </Para>
        <CodeBox label="how a duplicate delivery at one step compounds through a chain">
{`# inventory-service receives order.placed TWICE (rebalance mid-processing)
# without idempotency protection:

# first delivery:  reserves 2 units of SKU-4471
#                   publishes inventory.reserved
# second delivery: reserves ANOTHER 2 units of SKU-4471 (duplicate!)
#                   publishes inventory.reserved AGAIN

# payment-service, subscribed to inventory.reserved, now sees TWO
# events for the same order and charges the customer's card TWICE

# shipping-service, subscribed to payment.charged, now creates
# TWO shipment records for one order

# one duplicate delivery at step 1 became a customer double-charge
# and a duplicate shipment by the time it reached step 4`}
        </CodeBox>
        <Para>
          The fix is the same idempotent-consumer discipline covered for single-topic pipelines earlier in
          this track, applied deliberately at every step of a multi-step chain, not just the first one. Each
          service needs a way to recognize "I have already processed this specific event" — commonly by
          tracking a unique event ID (or the correlation ID plus event type) in its own database, checked
          before performing any side effect, so a duplicate delivery is detected and skipped rather than
          reprocessed.
        </Para>
        <CodeBox label="an idempotent consumer step, checked before any side effect runs">
{`def handle_order_placed(event):
    event_id = event["event_id"]

    if already_processed(event_id):
        log.info(f"Skipping duplicate event {event_id}")
        return  # side effect already happened -- do nothing

    with db.transaction():
        reserve_inventory(event["order_id"], event["line_items"])
        mark_processed(event_id)  # recorded in the SAME transaction
        # as the side effect, so a crash between them can't leave
        # the side effect done but unrecorded, or vice versa

    publish("inventory.reserved", {...})`}
        </CodeBox>
        <Table
          headers={['Where idempotency is missing', 'Compounding effect down the chain']}
          rows={[
            ['First step (order-service publishing order.placed)', 'A duplicate order.placed can cause every downstream step to run its full flow twice, from inventory reservation through shipment creation'],
            ['A middle step (payment-service)', 'A duplicate charge is often the most business-visible failure mode — a customer literally billed twice for one order'],
            ['The last step (notification-service)', 'Lowest business risk of the chain, but still a real one — a customer receiving the same shipping confirmation email three times erodes trust in the system\'s reliability'],
          ]}
        />
        <Callout title="Idempotency at every step is what makes at-least-once delivery safe to build a saga on" color="#22c55e">
          At-least-once delivery is not a flaw to work around in EDA — it's the standard, well-understood
          guarantee Kafka provides, and it is entirely workable as long as every consumer in a chain is
          designed with the assumption that any event might arrive more than once. This is a design
          requirement to build in from the start, not a rare edge case to patch after a duplicate-charge
          incident reveals the gap.
        </Callout>
      </section>

      <Divider />

      {/* Part 11 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — EDA vs Event Sourcing" />
        <SectionTitle>Event-Driven Architecture Is Not Event Sourcing — A Common Conflation</SectionTitle>
        <Para>
          These two terms get used almost interchangeably in casual conversation, and conflating them leads
          to real design confusion. They are related but distinct ideas, and it's worth being precise about
          the difference before moving into the next module, which relies on a clear notion of what an event
          represents.
        </Para>
        <Para>
          Event-driven architecture, as this module has covered it, is about how services <em>communicate</em>
          — publishing and reacting to events instead of calling each other directly. It says nothing about
          how any individual service stores its own internal state. A perfectly ordinary service using EDA to
          communicate can still store its current state as a normal mutable row in a relational database,
          updated in place on every change, exactly like a non-event-driven service would.
        </Para>
        <Para>
          Event sourcing is a different, stricter idea about how a service <em>persists its own state</em>:
          instead of storing current state directly, the service stores the full sequence of events that led
          to that state, and derives current state by replaying those events (or a snapshot plus the events
          since it). A service using event sourcing never overwrites its history — every change is an
          immutable, appended fact, and "current state" is a read-time projection of that history rather than
          something stored directly.
        </Para>
        <Table
          headers={['', 'Event-driven architecture', 'Event sourcing']}
          rows={[
            ['What it governs', 'How services communicate with each other', 'How one service persists its own internal state'],
            ['Can exist without the other?', 'Yes — a service can publish and react to events while storing its own state as ordinary mutable rows', 'Yes — a service can use event sourcing internally while still exposing a normal synchronous request-response API externally'],
            ['Typical storage shape', 'Whatever each service chooses — relational tables, key-value stores, anything', 'An append-only event log as the source of truth; current state is derived, not stored directly'],
            ['Relationship to this module\'s Kafka topics', 'Kafka topics are the communication medium between services', 'A Kafka compacted or standard topic can serve as the event store itself, if a service chooses event sourcing internally'],
          ]}
        />
        <Para>
          In practice, the two ideas pair naturally, which is exactly why they get conflated: a service that
          already stores its history as an event log (event sourcing) has a very short path to also publishing
          those same events outward for other services to react to (event-driven architecture) — and Kafka, as
          a durable, replayable log, is a reasonable fit for both roles at once. But a team can absolutely
          adopt one without the other, and assuming they're the same thing leads to over-engineering a simple
          service's internal storage model just because it happens to publish events, or under-designing a
          genuinely event-sourced service's schema evolution because the team is only thinking about it as
          "the events we send to other teams."
        </Para>
        <Callout title="Keep the vocabulary precise when scoping a design" color="#38bdf8">
          If a design conversation says "let's make this service event-driven," ask explicitly whether that
          means "it should publish and react to events to communicate with other services" (EDA) or "it should
          store its own state as an append-only log instead of mutable rows" (event sourcing) — they call for
          different engineering decisions, and a team that assumes they got both by only building one is
          setting up a gap that surfaces later, usually as a surprising limitation in either the communication
          layer or the storage layer.
        </Callout>
      </section>

      <Divider />

      {/* Part 12 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Team Ownership and Topic Governance" />
        <SectionTitle>Who Owns an Event? Organizational Design for a Widely-Shared Topic</SectionTitle>
        <Para>
          Part 06 established that an event schema is effectively a public API contract. That framing has an
          organizational consequence worth spelling out directly: someone has to own that contract the way a
          team owns a public REST API — with a clear point of contact, a defined change process, and
          accountability for the compatibility guarantees consumers are relying on. Without explicit
          ownership, a widely-consumed topic tends to drift toward whichever team touched it most recently
          having de facto, undocumented control over a contract many other teams depend on.
        </Para>
        <Table
          headers={['Governance practice', 'Problem it prevents']}
          rows={[
            ['A named owning team per topic, documented and discoverable', 'A schema change ships without anyone realizing which team\'s approval it should have gone through, or without knowing who to ask when a consumer has a question'],
            ['A registered (even informally) list of known consumers per topic', 'A breaking change catches a downstream team by surprise because the publishing team genuinely didn\'t know they were consuming it — the Chewy scenario from this module\'s story section'],
            ['A deprecation window for any breaking change, communicated ahead of time', 'Consumers are forced into a same-day, unplanned migration instead of a scheduled one, even when the schema registry technically blocked the fully incompatible version'],
            ['A lightweight review step for new topics that look likely to become widely shared', 'A topic that starts as one team\'s internal implementation detail becomes a de facto public contract without anyone having designed it as one from the start'],
          ]}
        />
        <Para>
          None of this requires heavyweight process for every topic — a narrowly-scoped, single-consumer topic
          reasonably gets much lighter governance than <code>order.placed</code>, which several teams across
          the company depend on. The judgment call is recognizing, as a topic's consumer list grows, when it
          has crossed from "an internal implementation detail one team controls" into "a shared contract that
          needs the same discipline a public API would get" — and building the governance in proportionally,
          rather than either over-processing every topic or under-governing the ones that matter most.
        </Para>
        <Callout title="Schema registry enforcement is necessary, but it is not the same as ownership" color="#22c55e">
          A schema registry with enforced compatibility mode, from Part 06, prevents an outright incompatible
          schema from being published — but it says nothing about whether the right people were consulted
          before a compatible-but-still-consequential change shipped, or whether consumers were given any
          notice at all. The technical guardrail and the organizational ownership process solve different
          halves of the same problem, and a mature EDA practice needs both.
        </Callout>
      </section>

      <Divider />

      {/* Misconceptions */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Event-Driven Architecture</SectionTitle>
        {[
          {
            wrong: '"Event-driven architecture is strictly better than request-response and should replace it everywhere"',
            right: 'Part 02 is explicit that this is a trade-off, not an upgrade: EDA buys decoupling and resilience to downstream outages at the real cost of eventual consistency and harder end-to-end debugging. A user actively waiting on an answer — validating a coupon code — is still better served by request-response.',
          },
          {
            wrong: '"Publishing to Kafka after saving to the database (or vice versa) is basically atomic if you\'re careful"',
            right: 'Part 04\'s dual-write walkthrough shows this is never true, no matter the ordering — a crash between the two separate writes to two separate systems always leaves one without the other. The outbox pattern exists specifically because there is no way to make two different systems atomic without a pattern like it.',
          },
          {
            wrong: '"A fat, event-carried-state-transfer event has no downsides compared to a thin notification event"',
            right: 'Part 03\'s comparison table shows the real trade: a fat event removes the consumer\'s runtime dependency on the source service, but it moves that coupling into the event schema itself — every consumer now depends on that specific payload shape staying stable, which is exactly why schema discipline (Part 06) matters even more for fat events.',
          },
          {
            wrong: '"Choreography is always the \'purer\' event-driven choice and orchestration is a compromise"',
            right: 'Part 05 frames these as fitting different situations, not a purity spectrum: choreography keeps coupling lowest for a small number of simple steps, but as failure/compensation logic grows, centralizing it in an orchestrator makes the whole process easier to read, operate, and debug — a deliberate trade-off, not a downgrade.',
          },
          {
            wrong: '"Kafka gives you rollback across services the same way a database transaction rolls back"',
            right: 'Part 07\'s worked example is explicit that there is no such mechanism — a saga does not roll anything back automatically. Every service with a real side effect must be deliberately designed with its own compensating action, published and reacted to like any other event, to semantically undo what it already did.',
          },
          {
            wrong: '"Every interaction in a system benefits from being modeled as an event"',
            right: 'Part 09 is direct about the anti-patterns: an event a caller has to block and wait on is request-response wearing an event-driven costume, dozens of chatty field-level events recreate the coupling EDA is meant to avoid, and a genuinely single-consumer topic may just be a disguised RPC call. EDA fits a specific shape of problem — several independent parties needing to know something happened, none of them blocking it — not every interaction by default.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Story */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Peloton:</strong> the subscription-billing service writes billing records to its own
            Postgres database and needs to notify the content-access service so a member's workout library
            unlocks the moment payment clears. An early version used the naive dual-write from Part 04 — save
            to Postgres, then publish to Kafka — and a deploy-time restart between those two lines left a
            small number of members billed but without content access, discovered only through support
            tickets. The fix was the transactional outbox pattern: billing and an outbox row commit in one
            local Postgres transaction, and a CDC connector tails that outbox table into Kafka, closing the
            gap entirely.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Expedia:</strong> a multi-step booking flow — hold inventory with the airline, charge
            the customer, confirm the booking, issue the e-ticket — started as pure choreography per Part 05,
            with each service reacting to the previous one's event. Once a partial-refund case and an
            airline-side hold-expiration case were added, engineers found themselves updating failure-handling
            logic scattered across four different services for every new edge case. The team migrated to a
            saga orchestrator that owns the entire booking process definition, including every compensating
            action, in one place — exactly the tipping point described in Part 05 and demonstrated in Part 07's
            worked example.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Chewy:</strong> the fulfillment team renames a field in the <code>order.placed</code>
            event schema for internal clarity and ships it without checking who else reads that topic. Within
            the hour, the loyalty-points service, the fraud-detection pipeline, and a BI team's nightly export
            job all start failing or silently computing wrong numbers, because none of them were consulted —
            a Kafka topic doesn't show its publisher who's calling it the way a REST API does. Following Part
            06, the team adopts a schema registry with enforced backward compatibility and a lightweight
            topic-consumer registry, so the next schema change is caught before publish rather than discovered
            by four different teams independently filing incidents.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* Interview Prep */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is event-driven architecture, and when would you choose it over a request-response design?',
            a: `Event-driven architecture is a system design style where services communicate by publishing facts about things that happened and other services independently react to them, rather than one service directly calling another and waiting for a response. The publisher doesn't know or need to know who's listening, and its own success doesn't depend on any consumer being available or fast.

I'd choose it when the publishing service just needs to record and announce a fact and move on — an order was placed, a payment cleared — especially when several independent, loosely coupled systems need to react to that same fact without the publisher needing to know about all of them or coordinate directly with each.

I would not choose it when the caller genuinely needs to know the outcome before it can safely proceed — validating a discount code before showing a price to a user, for example. That's a case where the caller needs a synchronous answer, and event-driven's eventual consistency and harder debugging aren't worth paying for a case where request-response's stronger consistency and simpler tracing actually serve the use case better.`,
          },
          {
            q: 'Q2. Explain the dual-write problem and how the transactional outbox pattern solves it.',
            a: `The dual-write problem happens when a service needs to write to its own database and separately publish an event to Kafka for the same logical action — saving an order and publishing order.placed, for instance. These are two independent systems with no shared transaction spanning both, so a crash, a network blip, or any failure between the two writes leaves them inconsistent: the database has the order but the event was never published, or vice versa if you flip the order.

The outbox pattern solves this without needing a distributed transaction across two different technologies. Instead of writing to the database and Kafka as two separate operations, the service writes to two tables in the same database — the actual data table and an outbox table recording that an event needs to be published — inside one local database transaction. Because both writes are covered by the same ordinary ACID transaction, they're atomic with respect to each other using nothing more than the database's own guarantees.

A separate process then gets rows out of the outbox table into Kafka — either a polling publisher, or more commonly in production, a CDC connector like Debezium tailing the database's transaction log and streaming new outbox rows with low latency and no polling overhead. That CDC-based version is the standard production implementation of this pattern.`,
          },
          {
            q: 'Q3. What\'s the difference between an event-notification style event and an event-carried-state-transfer style event, and what are the trade-offs?',
            a: `Event notification is a thin event — it carries just enough to identify that something happened, like an order ID and an event type, and the consumer makes a separate call back to the source service to fetch whatever detail it actually needs. Event-carried state transfer is a fat event that embeds the full relevant state directly in the payload, so the consumer can act immediately with no follow-up call.

The trade-off is where the coupling ends up. Thin events keep the payload small but tie every consumer's processing to the source service being reachable at the moment it needs the detail — if the source is down, the consumer is stuck. Fat events remove that runtime dependency entirely, but they move the coupling into the schema itself: every consumer now depends on that specific payload shape, which is exactly why schema evolution discipline matters more as events get fatter.

In practice, I'd lean toward including enough state in the event to cover the common consumer use cases without a follow-up call, while accepting that a rare consumer with an unusual need might still call back to the source directly for something the event doesn't carry — rather than trying to make every event either maximally thin or maximally fat.`,
          },
          {
            q: 'Q4. Compare choreography and orchestration for coordinating a multi-step business process, and explain when you\'d reach for each.',
            a: `In choreography, there's no central coordinator — each service subscribes to the event that should trigger its own work, does that work, and publishes its own event for whatever comes next. The overall process is never written down in one place; it emerges from the sum of each service's independent reactions. In orchestration, a dedicated coordinator explicitly knows and drives the entire process, issuing commands to each service and deciding what happens next based on each step's result, including how to handle failures.

Choreography keeps coupling lowest and works well for a small number of straightforward steps — I've used it for simple two- or three-step flows where the failure handling is trivial. As the number of steps grows and failure/compensation logic gets genuinely complex, I've seen that same choreographed flow become hard to reason about, because every service ends up needing to understand failure events from steps it isn't directly involved in, and that logic is scattered with no single place to read the whole process.

At that point I'd migrate to orchestration specifically because centralizing the process definition, including every compensating action, in one place makes both the happy path and the failure paths far easier to operate and debug — at the cost of the orchestrator itself becoming a piece of infrastructure every participating service is now indirectly coupled to.`,
          },
          {
            q: 'Q5. Walk me through designing a saga for an order-fulfillment flow, including what happens when payment fails after inventory has already been reserved.',
            a: `The happy path is a straightforward chain: order placed, inventory reserved, payment charged, shipment created, confirmation sent — each step publishing an event the next step reacts to. The interesting design work is the failure case: if payment fails after inventory-service already reserved stock, that reservation is now stranded — real inventory removed from availability for an order that isn't going to complete.

This is exactly what a saga's compensating actions solve. There's no cross-service rollback mechanism — nothing automatically undoes the reservation. Instead, every step that takes a real side effect has to be designed, from the start, with an explicit compensating action it runs in response to a downstream failure. Here, payment-service publishes payment.failed instead of payment.charged, inventory-service subscribes to payment.failed and runs its compensating action — releasing the reservation back to available stock — and order-service updates its own status and notification-service sends the customer an appropriate message.

The design principle I'd emphasize is: build the compensating action at the same time as the forward action, for every step with a real side effect, rather than designing the happy path first and trying to retrofit failure handling later — that's reliably where the gaps show up in production.`,
          },
          {
            q: 'Q6. How would you prevent a duplicate event delivery at one step of a multi-step event chain from causing a customer to be double-charged?',
            a: `Kafka's default delivery guarantee is at-least-once — under real failure conditions like a crash between processing and committing an offset, or a rebalance mid-batch, a consumer can see the same event more than once. In a multi-step chain, a duplicate at an early step compounds: if inventory-service processes order.placed twice, it can publish inventory.reserved twice, which can cause payment-service to charge the customer twice, and shipping-service to create two shipments.

The fix is idempotent consumers at every step of the chain, not just the first one. Each service tracks a unique event ID (or the combination of correlation ID and event type) and checks whether it's already processed that specific event before performing any side effect — reserving inventory, charging a card — skipping it if so. Critically, the "mark this event as processed" write needs to happen in the same local transaction as the side effect itself, so a crash between them can't leave the side effect done but unrecorded, which would defeat the whole check.

I wouldn't treat this as a rare edge case to patch after an incident — at-least-once delivery is Kafka's standard, well-understood guarantee, and designing every consumer in a saga to assume duplicate delivery from the start is what makes that guarantee safe to build a multi-step business process on.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Common Mistakes */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Mistakes That Undermine Event-Driven Designs</SectionTitle>
        {[
          {
            q: 'Reaching for EDA everywhere, including cases where the caller genuinely needs a synchronous answer',
            a: 'Part 02 is the reference: EDA trades away strong consistency and easy tracing for decoupling and resilience. A user actively waiting on a result — validating a coupon code before showing a price — is a case where request-response\'s stronger consistency and simpler debugging genuinely serve the use case better.',
          },
          {
            q: 'Writing to a service\'s own database and publishing to Kafka as two separate, unguarded operations',
            a: 'Part 04\'s dual-write walkthrough shows this fails no matter the ordering — a crash between the two writes leaves one system without the other. The transactional outbox pattern, usually paired with CDC, is what closes this gap using nothing more than the database\'s own local transaction guarantees.',
          },
          {
            q: 'Renaming or removing fields in a widely-consumed event schema without checking who consumes the topic',
            a: 'Part 06 is explicit that a Kafka topic gives its publisher no visibility into who\'s consuming it, unlike a REST API. A breaking schema change doesn\'t fail loudly at the publisher — it silently breaks an unknown number of downstream consumers, sometimes ones the publishing team doesn\'t know exist.',
          },
          {
            q: 'Designing the happy path for a multi-step saga first and treating compensating actions as an afterthought',
            a: 'Part 07\'s worked example is direct about this: a saga provides no automatic rollback. Every step with a real side effect needs its compensating action designed alongside the forward action from the start, not bolted on after the happy path ships.',
          },
          {
            q: 'Sticking with choreography as a multi-step process\'s failure-handling logic keeps growing more complex',
            a: 'Part 05 names the tipping point directly: as the number of steps and failure/compensation paths grows, choreography scatters that logic across every participating service with no single place to read the whole process, which is exactly when centralizing it in an orchestrator becomes the better trade.',
          },
          {
            q: 'Reaching for an event for an interaction the caller must block on, or publishing dozens of chatty field-level events per entity',
            a: 'Part 09\'s anti-patterns cover both: blocking on a response to an event pays EDA\'s full latency and complexity cost with none of its decoupling benefit, and fine-grained field-level events recreate tight coupling — just expressed as event names instead of function calls — while consumers are left stitching them back together into one coherent fact.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* Error Library */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `A service's database shows an order as saved, but no downstream service ever reacted to it — no inventory reservation, no confirmation email`,
            cause: 'The naive dual-write pattern from Part 04 — the service saved to its own database and then attempted to publish to Kafka as a second, separate step, and the process crashed (or the Kafka publish failed silently) between the two writes.',
            fix: 'Adopt the transactional outbox pattern: write the record and an outbox row in one local database transaction, and use CDC (or, at minimum, a reliable polling publisher) to move outbox rows into Kafka, so the publish is derived from a durably committed database write rather than a separate, unguarded step.',
          },
          {
            error: `Several unrelated consumers of order.placed start throwing deserialization errors or silently computing wrong values at the same time`,
            cause: 'Per Part 06, a producer changed the event schema in a breaking way — typically renaming or removing a field — without checking who consumes the topic. Kafka gives the publisher no visibility into its consumers, so nothing caught this before it shipped.',
            fix: 'Put a schema registry with an enforced backward-compatibility mode in front of the topic so an incompatible schema is rejected at publish time. Maintain a lightweight record of who consumes each widely-used topic, and treat any genuinely breaking change as a new event type or version rather than a silent mutation of the existing one.',
          },
          {
            error: `Inventory counts drift lower over time with no matching pattern of completed orders — available stock appears to vanish`,
            cause: 'A multi-step saga (order -> inventory reserved -> payment -> shipment) has a failure path, such as payment declining, that was never paired with a compensating action to release the inventory reservation. The reservation from the abandoned order permanently reduces available stock.',
            fix: 'Per Part 07, every step with a real side effect in a saga needs an explicit compensating action triggered by the relevant failure event — here, inventory-service needs to subscribe to a payment.failed event and release the reservation, not just to the forward-path events.',
          },
          {
            error: `A downstream consumer processes an event and gets stale or already-changed data when it calls back to the source service for details`,
            cause: 'The event was designed as a thin, event-notification-style event, and by the time the consumer made its follow-up call to fetch details, the source entity had already changed again — a race between the event notification and the consumer\'s later fetch.',
            fix: 'For consumers where this timing sensitivity matters, move toward an event-carried-state-transfer style event that embeds the relevant state at the moment the event was emitted, per Part 03, removing the follow-up call (and the race condition that comes with it) entirely.',
          },
          {
            error: `A business process appears "stuck" — a customer's order shows as placed but never progresses to shipped, and no team can quickly say which step it\'s stuck at`,
            cause: 'The process was implemented as pure choreography across several services, per Part 05, and there is no single place that holds the full process state — diagnosing a stuck order means checking logs and topic offsets across every participating service individually.',
            fix: 'This is the practical cost of choreography at scale, not a bug in any one service. Either build dedicated cross-service tracing with correlation IDs threaded through every event, or migrate the process to an orchestrator whose own state directly shows which step a given order is currently on.',
          },
          {
            error: `A customer reports being charged twice for a single order, and both charges reference the same order ID`,
            cause: 'Per Part 10, a duplicate at-least-once delivery of an upstream event (such as inventory.reserved, caused by a consumer rebalance mid-processing) triggered payment-service to charge the customer\'s card twice, because payment-service had no idempotency check in front of the charge operation.',
            fix: 'Add an idempotency check — keyed on the event\'s unique ID — before any side effect with a real-world consequence, recorded in the same local transaction as the side effect itself. Retrofit this at every step of the chain, not just the step where the duplicate charge happened, since the same gap likely exists elsewhere in the flow.',
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
          'Event-driven architecture is a system design style, not a Kafka feature — services publish facts and react independently instead of calling each other directly and waiting for a response. Kafka is a strong fit for it because a durable, replayable, multi-subscriber topic is exactly the primitive EDA needs.',
          'Every consumer in a multi-step event chain must be idempotent, since Kafka\'s at-least-once delivery means any event can arrive more than once — a duplicate at one step compounds into duplicate side effects, like a double charge, at every step after it.',
          'Event-driven architecture and event sourcing are related but distinct: EDA governs how services communicate, event sourcing governs how one service persists its own state — a team can adopt either without the other.',
          'Not every interaction benefits from being modeled as an event — blocking on a response, chatty field-level events, and genuinely single-consumer topics are signs the event-driven answer may be the wrong one for that specific interaction.',
          'EDA trades stronger decoupling, independent scaling, and resilience to downstream outages for eventual consistency and harder end-to-end debugging. Choose it when a caller just needs to record and move on; keep request-response when a caller genuinely needs the outcome before proceeding safely.',
          'Event notification (thin events) keeps payloads small but ties consumers to calling back to the source service; event-carried state transfer (fat events) removes that runtime dependency but moves coupling into the schema itself, which must then be treated as a real API contract.',
          'A database write and a Kafka publish are never atomic together on their own — the transactional outbox pattern solves this by writing both the data and an "event to publish" row in one local database transaction, then using CDC (or a polling publisher) to move outbox rows into Kafka.',
          'Choreography keeps coupling lowest for simple, few-step processes; orchestration centralizes a process\'s logic — including every compensating action — in one place, which pays off as the number of steps and failure paths grows.',
          'An event schema is a public API contract between teams, often with no visibility into who consumes it, unlike a REST API. Additive-only changes, an enforced-compatibility schema registry, and treating breaking changes as new event types are what keep a widely-consumed topic safe to evolve.',
          'A saga provides no automatic cross-service rollback. Every step with a real side effect — reserving inventory, charging a payment — needs an explicit compensating action designed alongside the forward action, triggered by the relevant failure event, to semantically undo it when a later step fails.',
        ]}
      />
    </LearnLayout>
  )
}
