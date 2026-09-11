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

export default function ProducerDesign() {
  return (
    <LearnLayout
      title="Producer Design"
      description="How to build a production-grade Kafka producer: the full config walkthrough, sync vs async sends, error handling in delivery callbacks, a worked order-events producer, graceful shutdown, monitoring, and a production-readiness checklist."
      section="Apache Kafka — Module 11"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Producer Design', href: '/learn/apache-kafka/producer-design' },
      ]}
      prev={{ title: 'Serialization and Schema Design', href: '/learn/apache-kafka/schemas-serialization' }}
      next={{ title: 'Consumer Design', href: '/learn/apache-kafka/consumer-design' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — From concept to client" />
        <SectionTitle>You Already Know What a Producer Does. Now Build One That Doesn't Lose Data.</SectionTitle>
        <Para>
          Module 03 covered what a producer is at the mechanical level: it serializes records, discovers
          partition leaders, batches by partition, and waits for whatever acknowledgement <code>acks</code>
          demands. That mental model is necessary but not sufficient. Knowing that <code>acks=all</code>
          exists is different from knowing which fifteen configuration properties you actually need to set,
          in what combination, to ship a producer that survives a broker restart at 2 AM without dropping an
          order event or silently duplicating a payment.
        </Para>
        <Para>
          This module is deliberately applied. Every example below is code you could paste into a real
          service, not pseudocode standing in for a concept. We use Python with the
          <code>confluent-kafka</code> client throughout — its API maps closely to the underlying librdkafka
          C client that most production Kafka clients are built on, so the property names and semantics you
          learn here transfer directly to Java, Go, or any other client library with only syntax changing.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What "production-ready" means for a producer, concretely:</strong> it does not silently
            drop a record on a transient network blip. It does not block your application's request thread
            for hundreds of milliseconds on every single send. It tells you, unambiguously, when a write
            failed instead of leaving a future or callback nobody checked. It shuts down without abandoning
            messages still sitting in its internal buffer. And it exposes metrics that let you notice
            degradation before a customer does.
          </Para>
        </HighlightBox>
        <Para>
          Every section that follows builds toward one thing: a complete, annotated
          <code>OrderEventProducer</code> class in Part 06 that you could genuinely adapt for a real service.
          The config walkthrough, the sync-vs-async discussion, and the error handling patterns are all
          groundwork for understanding why that class is built the way it is.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The configuration surface" />
        <SectionTitle>Every Property That Actually Matters, and What Its Default Costs You</SectionTitle>
        <Para>
          A Kafka producer has dozens of configuration properties. Most teams never touch most of them. A
          much smaller set determines whether your producer is durable, fast, or both — and the defaults for
          several of these are tuned for "works out of the box in a demo," not "safe in production."
        </Para>
        <SubTitle>acks — what counts as a successful write</SubTitle>
        <Para>
          Covered conceptually in Module 03, but worth restating as a config decision you write down
          explicitly rather than inherit from a default. <code>acks=0</code> means fire-and-forget — the
          producer does not even wait for a response. <code>acks=1</code> (a common client default) means the
          partition leader acknowledges after writing to its own local log, before followers have replicated
          it. <code>acks=all</code> means the leader waits for every replica currently in the in-sync replica
          set to confirm. For anything you would be upset to lose — an order, a payment, an inventory
          adjustment — the answer is <code>acks=all</code>, full stop, and the decision is not up for
          per-service debate.
        </Para>
        <SubTitle>enable.idempotence — closing the duplicate-on-retry gap</SubTitle>
        <Para>
          Retries make a producer resilient to transient failures, but naive retries can create duplicates: a
          batch is written successfully, the acknowledgement is lost in the network, the producer retries,
          and the same batch is written a second time. <code>enable.idempotence=true</code> assigns the
          producer a Producer ID and a per-partition sequence number, and the broker discards any retried
          write whose sequence number it has already committed. This defaults to <code>false</code> in older
          client versions and <code>true</code> in current ones — check your client version rather than
          assuming. Setting it explicitly costs nothing and removes an entire category of duplicate-write
          bugs.
        </Para>
        <SubTitle>max.in.flight.requests.per.connection — ordering under retry</SubTitle>
        <Para>
          This controls how many unacknowledged requests can be outstanding to one broker connection at once.
          A higher number lets the producer pipeline more requests without waiting for each to be
          acknowledged, which helps throughput. The danger: if a request is retried while later requests are
          still in flight, and it succeeds after them, records can be written out of the order they were
          sent. With <code>enable.idempotence=true</code>, the broker's sequence-number tracking makes it safe
          to leave this as high as 5 (the common default) without risking reordering. Without idempotence
          enabled, set it to 1 if strict ordering matters, at a real throughput cost.
        </Para>
        <SubTitle>retries, request.timeout.ms, and delivery.timeout.ms — the retry budget</SubTitle>
        <Para>
          <code>retries</code> alone is a poor way to reason about producer resilience, because a fixed retry
          count says nothing about how long you are willing to let a send remain unresolved.
          <code>delivery.timeout.ms</code> is the better mental model: it is the total upper bound, from the
          moment you call <code>send()</code>, on how long the producer will keep retrying before giving up
          and reporting failure to your application. <code>request.timeout.ms</code> bounds a single request
          attempt inside that budget. Set <code>retries</code> high (or effectively unbounded) and let
          <code>delivery.timeout.ms</code> be the actual governing constraint — a common production setting is
          <code>delivery.timeout.ms=120000</code> (two minutes), giving the producer room to survive a broker
          restart or a brief network partition without your application giving up too early.
        </Para>
        <SubTitle>linger.ms, batch.size, compression.type — batching, revisited as config</SubTitle>
        <Para>
          Module 03 explained the mechanics. As config decisions: <code>linger.ms=0</code> is the safest
          default for latency-sensitive request paths (a checkout API waiting on a synchronous confirmation),
          while <code>linger.ms</code> in the 5-20ms range is a near-free throughput win for background
          ingestion where nobody is blocked on an individual record. <code>batch.size</code> (default 16KB in
          many clients) caps how large a single partition's batch can grow before it is sent regardless of
          <code>linger.ms</code> — raising it to 32KB or 64KB alongside a nonzero <code>linger.ms</code> is a
          standard pairing for high-throughput topics. <code>compression.type=lz4</code> or
          <code>zstd</code> is close to a free win for most workloads: modest CPU cost, meaningful reduction
          in both network bytes and broker disk usage.
        </Para>
        <Table
          headers={['Property', 'What it controls', 'Production-safe default']}
          rows={[
            ['acks', 'What acknowledgement counts as a successful write.', "'all' for anything durability-sensitive; '1' only for tolerable-loss telemetry."],
            ['enable.idempotence', 'Whether the broker deduplicates retried writes by sequence number.', 'true — set explicitly, do not rely on client-version defaults.'],
            ['max.in.flight.requests.per.connection', 'How many unacked requests can be outstanding at once.', '5 with idempotence enabled; 1 without it, if ordering matters.'],
            ['retries', 'How many times a failed send is retried.', 'A high value or Integer.MAX_VALUE — let delivery.timeout.ms govern instead.'],
            ['delivery.timeout.ms', 'Total time budget from send() to final success or failure.', '120000 (2 minutes) as a common starting point.'],
            ['request.timeout.ms', 'Time budget for a single request attempt.', '30000, well inside delivery.timeout.ms.'],
            ['linger.ms', 'How long to wait for a batch to fill before sending.', '0 for latency-sensitive paths; 5-20 for background ingestion.'],
            ['batch.size', 'Max bytes per partition batch before it is sent regardless of linger.ms.', '16KB-64KB depending on throughput needs.'],
            ['compression.type', 'Codec used to compress each batch before sending.', "'lz4' or 'zstd' for most workloads."],
          ]}
        />
        <Callout title="Write your config decisions down, do not inherit them" color={K}>
          Every property in this table is a deliberate trade-off, not a universal best value. A producer for
          clickstream telemetry and a producer for payment events should not share the same
          <code>acks</code> setting just because they share a code template. Treat the config block as a
          business decision reviewed alongside the code, not boilerplate copied from the last service.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Sync vs async sends" />
        <SectionTitle>Blocking on Every Send Quietly Destroys Your Throughput</SectionTitle>
        <Para>
          The single most common mistake in producer code written by engineers new to Kafka is calling
          <code>send()</code> and then immediately blocking on its result before sending the next record.
          This is understandable — it feels safe, like each write is confirmed before you move on — but it
          defeats the entire purpose of client-side batching described in Part 02, and the throughput cost is
          not subtle.
        </Para>
        <SubTitle>What blocking on every send actually does</SubTitle>
        <Para>
          When you call <code>.get()</code> or <code>.result()</code> on a send's future immediately after
          sending, you force the producer to wait for that specific record's full round trip — network out,
          broker append, replication if <code>acks=all</code>, acknowledgement back — before your application
          code is allowed to call <code>send()</code> again. The producer's internal batching mechanism can
          never accumulate more than one record per batch, because you never give it the chance: you are
          serializing what should be a pipelined, asynchronous operation into a synchronous one, one record at
          a time.
        </Para>
        <CodeBox label="the throughput-killing pattern — do not do this">
{`from confluent_kafka import Producer

producer = Producer({
    'bootstrap.servers': 'broker-1:9092,broker-2:9092',
    'acks': 'all',
    'enable.idempotence': True,
})

# ANTI-PATTERN: blocking on every single send
for order_event in order_events:
    future = producer.produce(
        topic='orders.events',
        key=order_event['order_id'],
        value=serialize(order_event),
    )
    producer.flush()  # blocks until THIS record is fully acknowledged
    # next iteration cannot start until the flush above returns
    # effective throughput: roughly one record per network round trip`}
        </CodeBox>
        <CodeBox label="measured cost of blocking sends vs batched async sends">
{`# Benchmark: 100,000 order events, single producer, acks=all,
# 3-broker cluster, ~2ms average network round trip

# Pattern A — flush() after every produce() call:
#   100,000 records x ~2ms round trip = ~200,000ms = ~200 seconds
#   effective throughput: ~500 records/second

# Pattern B — async produce() with batching (linger.ms=10, batch.size=32768):
#   100,000 records arrive far faster than network round trips can drain them
#   producer accumulates ~2,000-record batches, sends ~50 requests total
#   50 requests x ~5ms (larger batch, still one round trip) = ~250ms
#   effective throughput: >100,000 records/second

# The difference is not "a bit slower." It is roughly 200x.
# Both patterns use the exact same acks=all durability guarantee.`}
        </CodeBox>
        <SubTitle>The correct pattern — fire asynchronously, handle results in a callback</SubTitle>
        <Para>
          The fix is not to stop checking results — that would trade a throughput problem for a silent data
          loss problem. The fix is to attach a delivery callback that runs asynchronously when the broker
          actually responds, and let your application keep calling <code>produce()</code> in the meantime
          without blocking. The producer's internal batching then works the way it was designed to.
        </Para>
        <CodeBox label="the correct pattern — async send with a delivery callback">
{`from confluent_kafka import Producer
import logging

logger = logging.getLogger(__name__)

producer = Producer({
    'bootstrap.servers': 'broker-1:9092,broker-2:9092',
    'acks': 'all',
    'enable.idempotence': True,
    'linger.ms': 10,
    'batch.size': 32768,
    'compression.type': 'lz4',
})

def delivery_callback(err, msg):
    if err is not None:
        logger.error(
            f"Delivery failed for key={msg.key()} "
            f"topic={msg.topic()} error={err}"
        )
        # decide here: alert, dead-letter, or fail the upstream request
    else:
        logger.debug(
            f"Delivered key={msg.key()} to "
            f"{msg.topic()}[{msg.partition()}]@{msg.offset()}"
        )

for order_event in order_events:
    producer.produce(
        topic='orders.events',
        key=order_event['order_id'],
        value=serialize(order_event),
        on_delivery=delivery_callback,
    )
    # poll(0) services delivery callbacks without blocking the send loop
    producer.poll(0)

# after the loop, drain everything still in flight before moving on
producer.flush(timeout=30)`}
        </CodeBox>
        <Para>
          Two details matter in the pattern above. First, <code>producer.poll(0)</code> inside the loop —
          this is what actually triggers delivery callbacks to run; without periodic <code>poll()</code>
          calls, callbacks queue up and your internal producer buffer can fill, eventually causing
          <code>produce()</code> itself to block or raise <code>BufferError</code>. Second,
          <code>producer.flush()</code> after the loop — this blocks until every outstanding record has been
          delivered or has definitively failed, which is exactly what you want before considering a batch of
          work "done," just not on every individual record.
        </Para>
        <Callout title="When synchronous sends are actually the right call" color="#38bdf8">
          There is one legitimate case for blocking on a send: when a single record's success genuinely gates
          the next step of a synchronous workflow, such as an API endpoint that must return "order confirmed"
          only after the order event is durably written. Even then, block once — on that one record — rather
          than structuring your whole producer loop around per-record blocking.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Error handling in callbacks" />
        <SectionTitle>Not All Producer Errors Deserve the Same Response</SectionTitle>
        <Para>
          A delivery callback receiving an error is not a single category of problem. Some errors mean "the
          producer already retried this transparently and it still failed — something is structurally wrong."
          Others mean "this exact message can never succeed, retrying is pointless." Treating every error the
          same way — logging it and moving on, or worse, silently swallowing it — throws away information you
          need to build a correct response.
        </Para>
        <SubTitle>Retriable vs non-retriable exceptions</SubTitle>
        <Para>
          The producer's own retry mechanism, governed by <code>retries</code> and
          <code>delivery.timeout.ms</code> from Part 02, already handles retriable errors internally — things
          like a leader election in progress, a temporary network blip, or the broker being briefly
          unavailable. By the time an error reaches your delivery callback, the producer has already exhausted
          its internal retry budget for that message. That distinction matters: an error in your callback is
          not "try again" territory for most retriable cases, it is "the built-in retries already failed, now
          what."
        </Para>
        <Table
          headers={['Error category', 'Example', 'What already happened', 'What your callback should do']}
          rows={[
            ['Retriable, exhausted', 'KafkaError._TIMED_OUT after all internal retries', 'Producer retried internally per delivery.timeout.ms and still failed.', 'This points to sustained broker or network trouble, not a bad message — alert on it, consider circuit-breaking new sends.'],
            ['Non-retriable, message-specific', 'MSG_SIZE_TOO_LARGE', 'The broker rejected this message outright; retrying it changes nothing.', 'Log the specific record, route to a dead-letter path if one exists, do not retry the same payload.'],
            ['Non-retriable, config-level', 'UNKNOWN_TOPIC_OR_PARTITION on a topic that does not exist', 'Every message to this topic will fail the same way.', 'This is a deploy-time or config bug — alert loudly, this is not a per-message problem.'],
            ['Serialization failure', 'Exception raised before produce() is even called', 'The message never reached the producer at all.', 'Fix at the source — log the malformed input, do not let it silently vanish from the pipeline.'],
          ]}
        />
        <CodeBox label="a delivery callback that actually distinguishes error categories">
{`from confluent_kafka import KafkaError
import logging

logger = logging.getLogger(__name__)

# Errors where the message itself is permanently unsendable —
# retrying with the same payload will never succeed
NON_RETRIABLE_CODES = {
    KafkaError.MSG_SIZE_TOO_LARGE,
    KafkaError.INVALID_MSG_SIZE,
    KafkaError.TOPIC_AUTHORIZATION_FAILED,
    KafkaError.UNKNOWN_TOPIC_OR_PARTITION,
}

def make_delivery_callback(dlq_producer, dlq_topic):
    def delivery_callback(err, msg):
        if err is None:
            return  # success — nothing to do

        error_code = err.code()

        if error_code in NON_RETRIABLE_CODES:
            logger.error(
                f"Non-retriable delivery failure, routing to DLQ: "
                f"key={msg.key()} error={err}"
            )
            dlq_producer.produce(
                topic=dlq_topic,
                key=msg.key(),
                value=msg.value(),
                headers=[('failure_reason', str(err).encode())],
            )
            dlq_producer.poll(0)
        else:
            # producer already exhausted its own retry budget for this message
            logger.critical(
                f"Retriable error exhausted internal retries — "
                f"likely broker/network instability: key={msg.key()} error={err}"
            )
            # this is an operational alert, not a per-message fix
            emit_metric('producer.delivery_failure.retriable_exhausted')

    return delivery_callback`}
        </CodeBox>
        <Para>
          The dead letter queue pattern here mirrors the one introduced for consumers in the message brokers
          module — the same principle applies on the producer side. A message that can never be sent
          successfully should not silently vanish; it should land somewhere a human can find it, with enough
          context (the failure reason, ideally the original topic it was destined for) to diagnose and
          potentially replay it once the root cause is fixed.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Serialization and keys" />
        <SectionTitle>Serialization Failures Happen Before Kafka Ever Sees the Message</SectionTitle>
        <Para>
          A subtle failure mode: an exception thrown during serialization — a datetime object that isn't
          JSON-serializable, a schema validation failure against a registered Avro schema, a field that is
          <code>None</code> when the schema requires it — happens entirely on the producer's own process,
          before <code>produce()</code> is even called. This kind of failure never reaches a delivery
          callback, because there was never a message to deliver. If your error handling only watches
          delivery callbacks, these failures disappear without a trace.
        </Para>
        <CodeBox label="serialization must be wrapped explicitly — it will not surface through delivery callbacks">
{`import json
from decimal import Decimal

def serialize_order_event(event: dict) -> bytes:
    try:
        return json.dumps(event, default=_json_default).encode('utf-8')
    except (TypeError, ValueError) as exc:
        logger.error(
            f"Serialization failed for order_id={event.get('order_id')}: {exc}"
        )
        emit_metric('producer.serialization_failure')
        raise  # let the caller decide: skip, dead-letter, or fail the request

def _json_default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")`}
        </CodeBox>
        <Para>
          Choosing the partition key deserves the same deliberateness as the config decisions in Part 02.
          Module 04's keying guidance still applies directly here: key by <code>order_id</code> or
          <code>customer_id</code> when per-entity ordering matters to a downstream consumer, and be
          conscious that a highly skewed key distribution — one enormous customer, one dominant tenant —
          creates a hot partition no amount of consumer scaling can fix, because a partition is only ever
          owned by one consumer in a group at a time.
        </Para>
        <SubTitle>Header metadata — carrying context without polluting the payload</SubTitle>
        <Para>
          Kafka records support headers — small key-value pairs attached to a record separately from its key
          and value. This is the right place for cross-cutting metadata that downstream consumers or tracing
          systems need but that does not belong in the business payload itself: a trace ID for distributed
          tracing, a schema version identifier, the name of the producing service, or a content-type hint for
          consumers that need to handle multiple payload formats on the same topic during a migration.
        </Para>
        <CodeBox label="using headers for cross-cutting metadata instead of polluting the payload">
{`producer.produce(
    topic='orders.events',
    key=order_id.encode('utf-8'),
    value=serialize_order_event(event),
    headers=[
        ('trace_id', trace_context.trace_id.encode('utf-8')),
        ('schema_version', b'3'),
        ('producing_service', b'checkout-service'),
    ],
)

# a downstream consumer can inspect headers without deserializing
# the full payload -- useful for routing or filtering before the
# more expensive deserialization step even runs
def route_by_schema_version(msg):
    headers = dict(msg.headers() or [])
    version = headers.get('schema_version', b'1').decode()
    if version == '1':
        return parse_legacy_order_event(msg.value())
    return parse_order_event_v3(msg.value())`}
        </CodeBox>
        <Para>
          Headers are not free — they add bytes to every record and are not compressed as effectively as the
          batch-level value payload in some client implementations — so reserve them for genuinely
          cross-cutting metadata rather than using them as a second place to stash business fields that
          belong in the value itself.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The complete worked example" />
        <SectionTitle>A Production-Grade Order-Events Producer, Start to Finish</SectionTitle>
        <Para>
          Everything above comes together here. This is a complete, self-contained producer class for an
          order-events service — the kind of thing you would find in a real checkout or fulfillment pipeline.
          It handles configuration, serialization, async delivery with categorized error handling, dead
          lettering, and graceful shutdown.
        </Para>
        <CodeBox label="order_event_producer.py — configuration and initialization">
{`import json
import logging
from decimal import Decimal
from typing import Optional

from confluent_kafka import Producer, KafkaError

logger = logging.getLogger(__name__)

NON_RETRIABLE_CODES = {
    KafkaError.MSG_SIZE_TOO_LARGE,
    KafkaError.INVALID_MSG_SIZE,
    KafkaError.TOPIC_AUTHORIZATION_FAILED,
    KafkaError.UNKNOWN_TOPIC_OR_PARTITION,
}


class OrderEventProducer:
    """
    Production producer for order lifecycle events.
    Durability posture: acks=all, idempotent, unbounded retries within
    a two-minute delivery budget. Optimized for throughput via batching,
    not per-record latency -- appropriate for an events stream, not a
    synchronous request/response path.
    """

    def __init__(self, bootstrap_servers: str, topic: str, dlq_topic: str):
        self.topic = topic
        self.dlq_topic = dlq_topic
        self._sent_count = 0
        self._failed_count = 0

        self.producer = Producer({
            'bootstrap.servers': bootstrap_servers,
            'acks': 'all',
            'enable.idempotence': True,
            'max.in.flight.requests.per.connection': 5,
            'retries': 2147483647,
            'delivery.timeout.ms': 120000,
            'request.timeout.ms': 30000,
            'linger.ms': 10,
            'batch.size': 32768,
            'compression.type': 'lz4',
            'client.id': 'order-events-producer',
        })

        # separate producer instance for the DLQ -- keeps DLQ writes
        # from competing with primary-topic batching and simplifies
        # reasoning about each producer's delivery guarantees independently
        self.dlq_producer = Producer({
            'bootstrap.servers': bootstrap_servers,
            'acks': 'all',
            'enable.idempotence': True,
            'client.id': 'order-events-producer-dlq',
        })`}
        </CodeBox>
        <CodeBox label="order_event_producer.py — serialization and the send method">
{`    @staticmethod
    def _json_default(obj):
        if isinstance(obj, Decimal):
            return str(obj)
        raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

    def _serialize(self, event: dict) -> Optional[bytes]:
        try:
            return json.dumps(event, default=self._json_default).encode('utf-8')
        except (TypeError, ValueError) as exc:
            logger.error(
                f"Serialization failed for order_id={event.get('order_id')}: {exc}"
            )
            self._failed_count += 1
            return None

    def send_order_event(self, event: dict) -> bool:
        """
        Queue an order event for async delivery. Returns False immediately
        if the event could not even be serialized -- callers should treat
        that as a hard failure for this specific event, not retry blindly.
        Actual delivery success/failure is reported later via the
        delivery callback, not by this method's return value.
        """
        value = self._serialize(event)
        if value is None:
            return False

        order_id = event.get('order_id', '')

        try:
            self.producer.produce(
                topic=self.topic,
                key=order_id.encode('utf-8') if order_id else None,
                value=value,
                on_delivery=self._delivery_callback,
            )
        except BufferError:
            # local producer queue is full -- this means we are producing
            # faster than the broker can absorb, even with batching.
            # Block briefly to drain, then retry once.
            logger.warning("Producer local queue full, blocking to drain")
            self.producer.poll(1.0)
            self.producer.produce(
                topic=self.topic,
                key=order_id.encode('utf-8') if order_id else None,
                value=value,
                on_delivery=self._delivery_callback,
            )

        # service any callbacks that are ready without blocking the caller
        self.producer.poll(0)
        return True`}
        </CodeBox>
        <CodeBox label="order_event_producer.py — the delivery callback and DLQ routing">
{`    def _delivery_callback(self, err, msg):
        if err is None:
            self._sent_count += 1
            logger.debug(
                f"Delivered order_id={msg.key()} to "
                f"{msg.topic()}[{msg.partition()}]@{msg.offset()}"
            )
            return

        self._failed_count += 1
        error_code = err.code()

        if error_code in NON_RETRIABLE_CODES:
            logger.error(
                f"Non-retriable failure, routing to DLQ: "
                f"key={msg.key()} error={err}"
            )
            self._send_to_dlq(msg, str(err))
        else:
            logger.critical(
                f"Delivery failed after exhausting internal retries "
                f"(likely broker/network instability): "
                f"key={msg.key()} error={err}"
            )
            self._send_to_dlq(msg, str(err))

    def _send_to_dlq(self, msg, failure_reason: str):
        try:
            self.dlq_producer.produce(
                topic=self.dlq_topic,
                key=msg.key(),
                value=msg.value(),
                headers=[
                    ('failure_reason', failure_reason.encode('utf-8')),
                    ('source_topic', self.topic.encode('utf-8')),
                ],
            )
            self.dlq_producer.poll(0)
        except Exception as exc:
            # if even the DLQ write fails, this is the last line of defense --
            # log at the highest severity available, this needs a human now
            logger.critical(
                f"DLQ write itself failed for key={msg.key()}: {exc}"
            )
            emit_metric('producer.dlq_write_failure')`}
        </CodeBox>
        <CodeBox label="order_event_producer.py — graceful shutdown">
{`    def close(self, timeout: float = 30.0):
        """
        Flush every in-flight and buffered message before the process
        exits. Called from a signal handler or application shutdown hook --
        never let the process exit while messages are still buffered
        in the producer's local queue, or they are lost silently.
        """
        logger.info(
            f"Shutting down producer: {self._sent_count} sent, "
            f"{self._failed_count} failed. Flushing remaining messages..."
        )
        remaining = self.producer.flush(timeout=timeout)
        if remaining > 0:
            logger.critical(
                f"{remaining} messages still unflushed after {timeout}s "
                f"timeout -- these are LOST. Investigate broker health."
            )
            emit_metric('producer.shutdown_data_loss', value=remaining)

        self.dlq_producer.flush(timeout=timeout)
        logger.info("Producer shutdown complete.")`}
        </CodeBox>
        <Para>
          Notice what this class does <em>not</em> do: it never blocks the caller of <code>send_order_event</code>
          on a network round trip, it never lets a serialization failure disappear silently, it distinguishes
          "this message can never succeed" from "the broker is having a bad moment" in its error handling, and
          it refuses to let the process exit while messages are still sitting unflushed in memory. Each of
          these is a specific, named failure mode from earlier parts of this module, addressed deliberately
          rather than accidentally.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Graceful shutdown" />
        <SectionTitle>The Last Few Seconds of a Producer's Life Matter Most</SectionTitle>
        <Para>
          A producer that batches records in memory before sending them has, at almost any given moment, some
          amount of unsent data sitting in local buffers waiting for <code>linger.ms</code> to elapse or
          <code>batch.size</code> to fill. If the process exits — a deploy, a crash, an orchestrator killing
          the container — without giving the producer a chance to flush, that buffered data is gone. This is
          not a Kafka bug; it is the direct, unavoidable cost of the batching that makes producers fast in the
          first place, and it is entirely preventable with the right shutdown sequence.
        </Para>
        <SubTitle>Wiring flush() into signal handling</SubTitle>
        <Para>
          The fix is to intercept the signals your orchestrator sends on shutdown (typically
          <code>SIGTERM</code> in a containerized environment, giving you a grace period before
          <code>SIGKILL</code>) and call <code>flush()</code> with a bounded timeout before allowing the
          process to actually exit.
        </Para>
        <CodeBox label="wiring graceful shutdown into a service's signal handling">
{`import signal
import sys

producer = OrderEventProducer(
    bootstrap_servers='broker-1:9092,broker-2:9092',
    topic='orders.events',
    dlq_topic='orders.events.dlq',
)

def handle_shutdown(signum, frame):
    logger.info(f"Received signal {signum}, beginning graceful shutdown")
    producer.close(timeout=25.0)  # leave headroom under the orchestrator's kill timeout
    sys.exit(0)

signal.signal(signal.SIGTERM, handle_shutdown)
signal.signal(signal.SIGINT, handle_shutdown)`}
        </CodeBox>
        <Callout title="Match your flush timeout to your orchestrator's grace period" color="#ef4444">
          If Kubernetes sends SIGTERM and force-kills the pod after a 30-second grace period, a
          <code>flush(timeout=30.0)</code> call races the kill signal and can lose exactly the messages you
          were trying to save. Set the flush timeout comfortably below the orchestrator's grace period — 25
          seconds against a 30-second grace period, for example — so flush has a chance to report an honest
          failure and log it, rather than being killed mid-flush with no record of what was lost.
        </Callout>
        <Para>
          The return value of <code>flush()</code> matters and is frequently ignored: it returns the number of
          messages still outstanding when the timeout was hit. A nonzero return value after your shutdown
          flush is not a warning to log and forget — it is a count of messages that did not make it, and it
          deserves a metric and an alert, not just a log line nobody reads until the postmortem.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Monitoring producer health" />
        <SectionTitle>The Metrics That Tell You a Producer Is Degrading Before It Fails Outright</SectionTitle>
        <Para>
          A producer that is slowly failing does not usually announce itself with a crash. It announces
          itself with rising error rates, growing request latency, and shrinking batch sizes — all visible in
          metrics well before the failure becomes obvious in application logs or customer-facing symptoms.
        </Para>
        <Table
          headers={['Metric', 'What it measures', 'What a bad trend means']}
          rows={[
            ['record-error-rate', 'Errors per second reported through delivery callbacks.', 'Rising errors point to broker instability, a misconfigured topic, or a downstream authorization change — investigate immediately, do not let this normalize.'],
            ['request-latency-avg', 'Average time for a produce request to receive a response.', 'Rising latency often precedes an under-replicated-partition or broker-overload incident; it is frequently the earliest visible signal.'],
            ['batch-size-avg', "Average size of batches actually sent, in bytes.", "A batch size far smaller than batch.size suggests linger.ms is too low for the actual traffic rate, or traffic itself has dropped -- worth distinguishing the two."],
            ['buffer-available-bytes', 'Remaining local producer buffer capacity (bounded by buffer.memory).', 'Approaching zero means the producer is generating records faster than the broker can absorb them -- a leading indicator of BufferError before it happens.'],
            ['record-retry-rate', 'Rate of records being internally retried.', 'A sustained nonzero retry rate, even without ultimate failures, is a sign of network or broker flakiness worth tracking before it escalates to outright failures.'],
          ]}
        />
        <CodeBox label="a minimal metrics-emitting wrapper around the delivery callback">
{`def _delivery_callback(self, err, msg):
    if err is None:
        self._sent_count += 1
        emit_metric('producer.delivery.success')
        return

    self._failed_count += 1
    emit_metric('producer.delivery.failure', tags={'error_code': str(err.code())})

    if err.code() in NON_RETRIABLE_CODES:
        self._send_to_dlq(msg, str(err))
    else:
        emit_metric('producer.delivery.retriable_exhausted')
        self._send_to_dlq(msg, str(err))`}
        </CodeBox>
        <Para>
          Most Kafka client libraries also expose broker-reported statistics through a periodic stats
          callback (<code>statistics.interval.ms</code> in <code>confluent-kafka</code>), which surfaces
          <code>request-latency-avg</code>, <code>batch-size-avg</code>, and similar metrics without you
          having to compute them yourself from raw timings. Wiring that stats callback into whatever metrics
          system your organization uses — StatsD, Prometheus, CloudWatch — is a small amount of setup that
          pays for itself the first time it catches a degrading producer before an on-call page does.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — The production-readiness checklist" />
        <SectionTitle>Is This Producer Actually Production-Ready?</SectionTitle>
        <Para>
          Before shipping a new producer — or reviewing someone else's pull request that adds one — run it
          against this checklist. Every item traces back to a specific failure mode covered earlier in this
          module.
        </Para>
        <BulletList
          items={[
            'acks is set explicitly and matches the actual durability requirement of the data, not copied from an unrelated service.',
            'enable.idempotence=true is set explicitly, not assumed from a client-library default.',
            'delivery.timeout.ms and retries are configured together as a coherent retry budget, not left at whatever the client library ships with.',
            'Every send() call has an attached delivery callback (or equivalent future handling) that is actually checked — no send() with no way to observe failure.',
            'The delivery callback distinguishes retriable-exhausted failures from non-retriable, message-specific failures, and handles each appropriately.',
            'Serialization failures are caught and logged explicitly, since they never reach the delivery callback at all.',
            'A dead letter path exists for messages that fail delivery permanently, with enough context in the DLQ record to diagnose and replay later.',
            'Shutdown calls flush() with a timeout comfortably shorter than the orchestrator\'s kill grace period, and checks the returned count of unflushed messages.',
            'Metrics for error rate, request latency, and batch size are wired into your monitoring system, not just written to logs nobody dashboards.',
            'The producer does not block the calling thread on every individual send under normal operating conditions.',
          ]}
        />
        <Callout title="If you can't answer these from the code, the config is not enough" color="#00e676">
          A producer with perfect configuration values but no delivery callback, no shutdown handling, and no
          metrics is not production-ready — it is a demo that happens to have good settings. Production
          readiness lives in the code paths around the config, not just the config itself.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Testing and load-validating a producer" />
        <SectionTitle>Config Values Are Claims. Testing Is How You Verify Them.</SectionTitle>
        <Para>
          A producer's configuration makes specific, checkable claims: "this producer does not lose data
          under a broker failure," "this producer sustains 100,000 records/second," "this producer's shutdown
          never abandons buffered messages." Every one of these claims should be verified with a test, not
          assumed from reading the config file. This part covers the three tests worth writing for any
          producer before it ships to production.
        </Para>
        <SubTitle>Test 1 — durability under a simulated broker failure</SubTitle>
        <Para>
          Against a local, multi-broker test cluster, kill the current partition leader mid-send and confirm
          the producer either successfully delivers (after failing over to the new leader) or reports a clear
          failure through the delivery callback — never silently drops the record without reporting anything.
        </Para>
        <CodeBox label="a durability test against a local multi-broker cluster">
{`import time
import subprocess

def test_producer_survives_leader_failure(docker_compose_cluster):
    producer = OrderEventProducer(
        bootstrap_servers='localhost:9092,localhost:9093,localhost:9094',
        topic='test.orders.events',
        dlq_topic='test.orders.events.dlq',
    )

    delivered = []
    failed = []

    def tracking_callback(err, msg):
        if err is None:
            delivered.append(msg)
        else:
            failed.append((msg, err))

    # send a batch, then kill the current leader mid-flight
    for i in range(1000):
        producer.producer.produce(
            topic='test.orders.events',
            key=str(i).encode(),
            value=json.dumps({'order_id': str(i)}).encode(),
            on_delivery=tracking_callback,
        )
        if i == 500:
            subprocess.run(['docker', 'kill', 'test-broker-leader'])
        producer.producer.poll(0)

    producer.producer.flush(timeout=60)

    # every record must be accounted for -- either delivered or explicitly
    # reported as failed. Silence is the only unacceptable outcome.
    assert len(delivered) + len(failed) == 1000
    assert len(delivered) >= 500  # everything before the kill should have landed`}
        </CodeBox>
        <SubTitle>Test 2 — throughput under realistic batch settings</SubTitle>
        <Para>
          A load test confirms the batching configuration from Part 02 is actually producing the throughput
          it is meant to. Run it against a realistic message size and volume, not a trivial synthetic payload
          that compresses and batches differently than real traffic.
        </Para>
        <CodeBox label="a throughput benchmark using realistic message shapes">
{`import time

def benchmark_producer_throughput(producer, record_count=200_000):
    start = time.monotonic()
    sent = 0

    def count_callback(err, msg):
        nonlocal sent
        if err is None:
            sent += 1

    for i in range(record_count):
        producer.producer.produce(
            topic='orders.events',
            key=f"order-{i}".encode(),
            value=make_realistic_order_payload(i),  # real field shapes, not {"x": 1}
            on_delivery=count_callback,
        )
        producer.producer.poll(0)

    producer.producer.flush(timeout=60)
    elapsed = time.monotonic() - start

    throughput = sent / elapsed
    print(f"Sent {sent}/{record_count} records in {elapsed:.2f}s "
          f"({throughput:,.0f} records/sec)")
    return throughput`}
        </CodeBox>
        <SubTitle>Test 3 — shutdown does not abandon buffered messages</SubTitle>
        <Para>
          Send a burst of records, then immediately trigger the shutdown sequence, and confirm the flush
          timeout in <code>close()</code> is sufficient to drain everything that was still buffered rather
          than reporting a nonzero unflushed count.
        </Para>
        <CodeBox label="verifying graceful shutdown does not lose buffered records">
{`def test_shutdown_flushes_all_buffered_messages():
    producer = OrderEventProducer(
        bootstrap_servers='localhost:9092',
        topic='test.orders.events',
        dlq_topic='test.orders.events.dlq',
    )

    for i in range(5000):
        producer.send_order_event({'order_id': str(i), 'status': 'created'})
    # deliberately do NOT wait for a natural flush -- simulate a shutdown
    # signal arriving immediately after a burst of sends

    producer.close(timeout=30.0)

    # a correct close() logs and alerts on a nonzero remaining count;
    # this test asserts the common case where the timeout is sufficient
    assert producer._sent_count + producer._failed_count == 5000`}
        </CodeBox>
        <Callout title="Load test against realistic acks and compression settings, not the fastest possible config" color={K}>
          A benchmark run with acks=0 and no compression measures nothing useful about the producer you are
          actually going to run in production. Always load-test with the exact acks, idempotence, and
          compression settings the production config uses — the numbers from a stripped-down "fast" config
          tell you nothing about the system you are shipping.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Building Kafka Producers</SectionTitle>
        {[
          {
            wrong: '"acks=all is slow, so I should use acks=1 unless I really need durability"',
            right: 'Part 02 and Part 03 together show the real throughput lever is batching (linger.ms, batch.size), not acks. A well-batched producer with acks=all comfortably sustains six-figure records-per-second throughput; the durability cost of acks=1 is rarely worth the marginal latency saved once batching is configured correctly.',
          },
          {
            wrong: '"If send() returns without throwing, the message was delivered"',
            right: 'Part 03 is explicit that most client libraries send asynchronously by default — send() returning just means the record was accepted into the local buffer, not that a broker has acknowledged it. Only a delivery callback (or blocking future) confirms actual delivery.',
          },
          {
            wrong: '"enable.idempotence eliminates the need to think about duplicates at all"',
            right: 'Part 02 notes idempotence only deduplicates retries within one producer session, using a Producer ID that is discarded on producer restart. A crashed and restarted producer gets a new Producer ID with no memory of what it already sent — idempotence is not a substitute for downstream idempotent processing.',
          },
          {
            wrong: '"Any error in a delivery callback should trigger an application retry"',
            right: 'Part 04 draws the actual distinction: by the time an error reaches your callback, the producer has already exhausted its own internal retry budget. Blindly retrying at the application level on every callback error just duplicates the producer\'s own retry logic and can make an already-degraded broker worse.',
          },
          {
            wrong: '"Calling flush() once at the very end of the program is the only shutdown step needed"',
            right: 'Part 07 shows this only works if the process is guaranteed to run flush() to completion before being killed. Without wiring flush() into actual signal handling with a bounded timeout under the orchestrator\'s grace period, a fast SIGTERM/SIGKILL cycle skips your cleanup code entirely.',
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
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Affirm:</strong> the payments platform team is reviewing a new producer for
            loan-installment events before it ships. The reviewer's first question, straight from Part 09's
            checklist, is not about business logic at all — it's "show me the delivery callback and the
            shutdown handler." The original PR had neither: <code>send()</code> was called with no callback,
            and there was no signal handling to flush on deploy. Both gaps are the kind that pass every unit
            test and only surface as silent data loss weeks later during a routine rolling deploy.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Instacart:</strong> a batch-ingestion producer for shopper-location pings is
            bottlenecked far below expected throughput. Following Part 03's benchmark numbers, an engineer
            checks the code and finds <code>producer.flush()</code> called after every single
            <code>produce()</code> call — a leftover from an early prototype that nobody removed once real
            traffic arrived. Switching to async sends with a delivery callback and a 10ms
            <code>linger.ms</code> takes throughput from roughly 800 records/second to over 60,000/second with
            no change to the durability guarantee.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Brex:</strong> a transaction-event producer starts throwing <code>BufferError</code>
            during a traffic spike from a large customer's batch upload. Per Part 06's worked example, the
            on-call engineer recognizes this as the local producer buffer filling faster than the broker can
            absorb it — not a broker outage. The immediate fix is the brief-block-and-retry pattern from the
            worked producer class; the longer-term fix, tracked as a follow-up, is raising
            <code>buffer.memory</code> and revisiting partition count on the target topic.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through the difference between a producer that blocks on every send and one that sends asynchronously with callbacks, and why the difference matters at scale.',
            a: `A producer that calls flush() or blocks on a future immediately after every produce() call forces each record through a full network round trip before the next one can even be sent. Per Part 03, this means the producer's internal batching mechanism never gets the chance to accumulate more than roughly one record per request, because the application code itself is the bottleneck preventing batches from forming.

An asynchronous producer calls produce() with a delivery callback attached and moves on immediately to the next record, periodically calling poll(0) to let completed callbacks fire. Records destined for the same partition accumulate into a batch governed by linger.ms and batch.size, and are sent as one request once the batch is ready. The measured difference in the worked example is roughly two orders of magnitude in throughput, using the exact same acks=all durability guarantee in both cases.

The key point I'd make in an interview: this is not a durability-versus-speed trade-off. Both patterns can use identical acks and idempotence settings. The throughput difference comes entirely from whether the application code gets out of the way and lets client-side batching do its job.`,
          },
          {
            q: 'Q2. A delivery callback reports an error. How do you decide what to do next?',
            a: `First, I'd recognize that by the time an error reaches the delivery callback, the producer's own internal retry mechanism — governed by retries and delivery.timeout.ms — has already exhausted its retry budget for that specific message. So the question isn't "should I retry," it's "why did the built-in retries already fail, and what does that tell me."

Per Part 04, I'd categorize the error. If it's something like MSG_SIZE_TOO_LARGE or TOPIC_AUTHORIZATION_FAILED, the message itself can never succeed no matter how many times I retry it — the right move is to route it to a dead letter topic with enough context to diagnose later, and move on. If it's a timeout or a retriable error that still failed after the producer's internal retry budget was exhausted, that's a much more serious operational signal — it usually means sustained broker or network instability, not a bad message, and deserves an alert rather than a per-message fix.

I'd also make sure serialization failures are handled separately entirely, since those happen before produce() is even called and never reach the delivery callback at all — a gap I've seen catch teams off guard.`,
          },
          {
            q: 'Q3. Why does a producer need explicit shutdown handling instead of just letting the process exit?',
            a: `Because of how batching works, per Part 07: at almost any given moment, a producer has some amount of data sitting in a local in-memory buffer, waiting for linger.ms to elapse or batch.size to fill before it's actually sent over the network. If the process exits — whether from a crash, a deploy, or an orchestrator's kill signal — before that buffer is flushed, everything still sitting in it is lost. This isn't a bug; it's the direct, unavoidable cost of the batching that makes the producer fast in the first place.

The fix is wiring flush() into actual signal handling — intercepting SIGTERM in a containerized environment and calling flush() with a bounded timeout before allowing the process to exit — and setting that timeout comfortably below whatever grace period the orchestrator gives before a hard SIGKILL. I'd also check the return value of flush(), since it tells you exactly how many messages were still unflushed when the timeout hit — a nonzero value there is lost data, and it deserves a metric and an alert, not just a log line.`,
          },
          {
            q: 'Q4. What does enable.idempotence actually protect against, and what does it not protect against?',
            a: `Per Part 02, it protects against duplicate writes caused by the producer's own retry mechanism: the broker assigns each producer a Producer ID and tracks a monotonically increasing sequence number per partition, and it silently discards any retried write whose sequence number it has already committed. This closes a real gap — without it, a lost acknowledgement followed by a safe retry can write the same batch twice.

What it does not protect against is a producer process restarting. The Producer ID is tied to that specific producer session; a crashed and restarted producer gets an entirely new Producer ID with no memory of what the previous session already wrote. So if a producer crashes after writing a batch but before confirming that write internally, and comes back up and resends the same logical event, idempotence at the Kafka level does nothing to catch that — you'd need application-level deduplication, typically a unique event ID checked downstream, to close that particular gap. Idempotent producer and idempotent processing are complementary, not substitutes for each other.`,
          },
          {
            q: 'Q5. How would you monitor a fleet of producers to catch degradation before it becomes an outage?',
            a: `Per Part 08, I'd track a small set of metrics per producer rather than just watching for outright failures. record-error-rate is the most direct signal — a rising trend, even without total failure, usually means something changed upstream, whether that's broker instability or an authorization change on the target topic. request-latency-avg tends to be an early warning sign that precedes a more visible incident like under-replicated partitions, since latency degrades before requests start outright failing.

I'd also watch batch-size-avg and buffer-available-bytes together. A batch size far below the configured batch.size can mean linger.ms is mistuned for actual traffic, or it can mean traffic itself has genuinely dropped — those need to be distinguished, not conflated. buffer-available-bytes approaching zero is a leading indicator of BufferError before it actually happens, which gives you time to react rather than just handle the exception reactively.

Practically, I'd wire the client library's periodic stats callback into whatever metrics system the team already uses, rather than hand-rolling timing measurements — most Kafka clients expose these numbers directly if you turn on statistics.interval.ms, and duplicating that instrumentation by hand is unnecessary work.`,
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
        <SectionTitle>The Mistakes That Make Kafka Producers Unreliable in Production</SectionTitle>
        {[
          {
            q: 'Blocking on flush() or a future after every individual produce() call',
            a: 'Part 03 measures this directly: it can cost roughly two orders of magnitude in throughput because it prevents the producer\'s own batching mechanism from ever accumulating more than about one record per request.',
          },
          {
            q: 'Sending records with no delivery callback and no future check at all',
            a: 'A send() call that returns without throwing only means the record entered the local buffer, not that a broker acknowledged it. Without a callback, a real delivery failure is completely invisible to the application.',
          },
          {
            q: 'Treating every delivery callback error the same way',
            a: 'Part 04\'s error table draws a hard line between message-specific, non-retriable failures that should go to a dead letter path, and retriable-but-exhausted failures that indicate real broker or network instability and deserve an operational alert.',
          },
          {
            q: 'Not wiring flush() into actual process shutdown signal handling',
            a: 'A flush() call at the literal end of a script only runs if the process is guaranteed to reach that line before being killed. Without a signal handler with a bounded timeout, a fast kill cycle from an orchestrator skips it entirely — Part 07 covers the correct wiring.',
          },
          {
            q: 'Assuming enable.idempotence removes the need for downstream deduplication',
            a: 'Part 02 is explicit that idempotence only protects against retries within one producer session, scoped to a Producer ID that is discarded on restart — it is not a substitute for idempotent processing further downstream.',
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
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `BufferError: Local: Queue full — raised from produce() under sustained high traffic`,
            cause: 'The producer\'s local in-memory buffer, bounded by buffer.memory, has filled because records are being produced faster than the broker can absorb and acknowledge them — often during a traffic spike or when the broker is briefly slower than usual.',
            fix: 'Handle BufferError explicitly by calling poll() briefly to let in-flight requests drain, then retrying the produce() call, as shown in Part 06\'s worked example. If this happens routinely rather than during spikes, raise buffer.memory or investigate why the broker is absorbing writes slower than expected.',
          },
          {
            error: `Delivery callback repeatedly reports KafkaError._MSG_TIMED_OUT even though the broker appears healthy`,
            cause: 'Per Part 02, this means the producer exhausted its entire delivery.timeout.ms budget without a successful acknowledgement — often because request.timeout.ms times individual attempts too aggressively relative to actual network conditions, or because acks=all is waiting on an in-sync replica set that is not actually catching up.',
            fix: 'Check under-replicated-partitions on the target topic first — a shrunk ISR under acks=all can cause exactly this symptom. If replication is healthy, widen request.timeout.ms and delivery.timeout.ms and re-check whether the timeouts still trip.',
          },
          {
            error: `A downstream consumer receives the same order-created event twice, several minutes apart`,
            cause: 'As Part 02 and the misconceptions section both note, enable.idempotence only deduplicates retries within a single producer session using a Producer ID. If the producer process crashed and restarted between the two sends, the new session has a fresh Producer ID and no memory of the earlier write, so Kafka has no way to know these are duplicates.',
            fix: 'This is not a producer-side config gap to chase further — it needs downstream idempotent processing, typically deduplication keyed on a stable, application-assigned event ID rather than relying on Kafka-level exactly-once guarantees that do not span producer restarts.',
          },
          {
            error: `Producer throughput is far below expected during load testing, with low CPU usage on the producer host`,
            cause: 'Per Part 03, this pattern — low CPU, low throughput — is a strong signal the producer is blocking on network round trips rather than actually doing CPU-bound work, most commonly from calling flush() or blocking on a future after every produce() call instead of batching asynchronously.',
            fix: 'Switch to async produce() with a delivery callback and periodic non-blocking poll(0) calls, and confirm linger.ms is not left at a value too low to let batches form under the traffic rate being tested.',
          },
          {
            error: `Metrics show sent_count and failed_count summing to less than the number of events the application attempted to send`,
            cause: 'Per Part 05, this almost always means some events failed during serialization — before produce() was ever called — and those failures never reached the delivery callback where sent_count and failed_count are tracked, because there was no message for Kafka to report on.',
            fix: 'Wrap the serialization step itself in explicit error handling with its own counter and logging, as shown in Part 05, rather than assuming all failures surface through the delivery callback.',
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
          'acks, enable.idempotence, and a coherent retries/delivery.timeout.ms budget are business decisions about data loss, not performance knobs to copy from another service.',
          'Blocking on every individual send defeats client-side batching and can cost roughly two orders of magnitude in throughput compared to async sends with a delivery callback, using identical durability settings.',
          'A delivery callback error means the producer\'s own internal retries already ran and failed — the job is to categorize the error (message-specific and non-retriable vs. retriable-but-exhausted) and respond accordingly, typically via a dead letter path or an operational alert.',
          'Serialization failures happen before produce() is called and never reach a delivery callback, so they need their own explicit error handling and metrics.',
          'Graceful shutdown means wiring flush() into real signal handling with a timeout under the orchestrator\'s kill grace period, and treating a nonzero unflushed-message count as an incident, not a log line.',
          'enable.idempotence deduplicates retries within one producer session only — it does not survive a producer restart and is not a substitute for downstream idempotent processing.',
        ]}
      />
    </LearnLayout>
  )
}
