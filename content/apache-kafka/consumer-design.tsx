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

export default function ConsumerDesign() {
  return (
    <LearnLayout
      title="Consumer Design"
      description="How to build a production-grade Kafka consumer: the full config walkthrough, manual commit-after-processing, idempotent processing, poison-message handling, graceful shutdown, rebalance listeners, and a production-readiness checklist."
      section="Apache Kafka — Module 12"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Consumer Design', href: '/learn/apache-kafka/consumer-design' },
      ]}
      prev={{ title: 'Producer Design', href: '/learn/apache-kafka/producer-design' }}
      next={{ title: 'Kafka Connect', href: '/learn/apache-kafka/kafka-connect' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — From concept to client" />
        <SectionTitle>A Consumer That Just Reads Records Is the Easy 10%</SectionTitle>
        <Para>
          Module 03 established the mechanics: consumers pull records by calling <code>poll()</code>, track
          progress through offsets, and belong to consumer groups that share partition ownership. That
          module also flagged, without fully resolving, the hardest part of consumer design — the separation
          between processing a record and committing its offset, and everything that can go wrong in the gap
          between those two actions.
        </Para>
        <Para>
          This module closes that gap with real, applied code. As in the producer module, we use Python with
          the <code>confluent-kafka</code> client throughout, consistently, so the property names and control
          flow map directly onto whatever client library you actually use in production. A production
          consumer is not a <code>poll()</code> loop with a <code>process()</code> call inside it — it is a
          poll loop plus deliberate answers to five questions: when do I commit, how do I survive reprocessing
          the same record twice, what happens to a record that can never be processed successfully, how do I
          shut down without losing my place, and what do I do the instant a partition is about to be taken
          away from me.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What "production-ready" means for a consumer, concretely:</strong> a crash between
            processing and committing never silently skips a record. Reprocessing the same record twice —
            which at-least-once delivery guarantees will eventually happen — never corrupts downstream state.
            A single malformed record does not permanently stall the partition it lives on. A rebalance does
            not lose or duplicate in-flight work. And shutdown commits the true, current position before the
            process exits, not whatever was committed five seconds ago on the auto-commit timer.
          </Para>
        </HighlightBox>
        <Para>
          Part 06 builds toward a complete <code>OrderEventConsumer</code> class that ties every one of these
          concerns together. Everything before it is groundwork for why that class is shaped the way it is.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The configuration surface" />
        <SectionTitle>Every Property That Actually Matters, and What Its Default Costs You</SectionTitle>
        <Para>
          Consumer configuration has the same shape as producer configuration from the previous module: a
          handful of properties actually determine reliability, and several defaults are tuned for
          convenience rather than production safety.
        </Para>
        <SubTitle>group.id — the identity that makes everything else work</SubTitle>
        <Para>
          Every consumer must belong to a consumer group, identified by <code>group.id</code>. This is not
          optional metadata — it is the key the broker uses to track committed offsets (stored in the
          internal <code>__consumer_offsets</code> topic, per Module 03) and to determine which consumers
          share partition ownership. Two processes with the same <code>group.id</code> reading the same topic
          split the partitions between them. Two processes with different <code>group.id</code> values each
          get an independent, full copy of every partition. Getting this wrong — accidentally sharing a
          <code>group.id</code> between two unrelated services, or accidentally giving every instance of the
          same service a unique one — is one of the most common consumer bugs, and it does not throw an
          error; it just silently produces the wrong fan-out behavior.
        </Para>
        <SubTitle>auto.offset.reset — what happens with no committed offset</SubTitle>
        <Para>
          When a consumer group has no committed offset for a partition — a brand-new group, or a partition
          whose committed offset has aged out of the <code>__consumer_offsets</code> topic's own retention —
          <code>auto.offset.reset</code> decides where to start. <code>earliest</code> starts from the oldest
          retained record; <code>latest</code> (a common client default) starts from the next record produced
          after the consumer connects, skipping everything already in the topic. For a new service backfilling
          historical state, <code>earliest</code> is almost always correct. For a service that only cares
          about events going forward — a live notification service, for instance — <code>latest</code> avoids
          an enormous, unwanted backlog on first startup. This setting only takes effect when there is no
          valid committed offset; it does not override a real committed position.
        </Para>
        <SubTitle>enable.auto.commit — the setting most responsible for silent data loss</SubTitle>
        <Para>
          As Module 03 covered, <code>enable.auto.commit=true</code> (the default in most client libraries)
          commits the latest offset returned by <code>poll()</code> on a fixed timer
          (<code>auto.commit.interval.ms</code>, typically 5 seconds), independent of whether your application
          has actually finished processing those records. This module treats <code>enable.auto.commit=false</code>
          combined with explicit, manual commits after real processing success as the default posture for any
          consumer whose work has a real side effect — writing to a database, calling a payment API, sending a
          notification. Part 03 builds the manual-commit pattern in full.
        </Para>
        <SubTitle>max.poll.records and max.poll.interval.ms — the processing-time budget</SubTitle>
        <Para>
          <code>max.poll.records</code> caps how many records one <code>poll()</code> call returns.
          <code>max.poll.interval.ms</code> is the maximum time allowed between successive <code>poll()</code>
          calls before the group coordinator presumes the consumer is stuck and triggers a rebalance. These
          two settings must be sized together: if processing <code>max.poll.records</code> worth of records at
          your actual per-record processing time can exceed <code>max.poll.interval.ms</code>, you will see
          rebalances under load that have nothing to do with an actual crash.
        </Para>
        <SubTitle>session.timeout.ms — detecting a genuinely dead consumer</SubTitle>
        <Para>
          Separately from the poll-interval mechanism, a background heartbeat thread (in most client
          libraries) pings the group coordinator on <code>heartbeat.interval.ms</code>. If no heartbeat
          arrives within <code>session.timeout.ms</code>, the coordinator presumes the process itself is dead
          — crashed, network-partitioned, or frozen — and triggers a rebalance independent of whatever the
          main thread's <code>poll()</code> timing looks like.
        </Para>
        <SubTitle>isolation.level — visibility into transactional writes</SubTitle>
        <Para>
          If the topics this consumer reads from are written by a transactional producer (covered in the
          message brokers module's exactly-once section), <code>isolation.level=read_committed</code> ensures
          the consumer only sees records from transactions that actually committed, filtering out records from
          transactions that were aborted or are still in flight. The default, <code>read_uncommitted</code>,
          exposes every write regardless of transaction outcome — usually the wrong choice whenever
          transactional producers are anywhere in the pipeline.
        </Para>
        <Table
          headers={['Property', 'What it controls', 'Production-safe default']}
          rows={[
            ['group.id', 'Identity used for offset tracking and partition-sharing between consumers.', 'One stable value per logical service; never shared across unrelated services.'],
            ['auto.offset.reset', 'Where to start reading when no valid committed offset exists.', "'earliest' for services needing full history; 'latest' for forward-only event consumers."],
            ['enable.auto.commit', 'Whether offsets commit on a timer, independent of processing outcome.', 'false for any workflow with real side effects — pair with explicit manual commits.'],
            ['max.poll.records', 'Max records returned per poll() call.', 'Sized so max.poll.records × real per-record processing time stays well under max.poll.interval.ms.'],
            ['max.poll.interval.ms', 'Max time allowed between poll() calls before a rebalance is triggered.', '300000 (5 min) default; raise it, or lower max.poll.records, to match real processing time.'],
            ['session.timeout.ms', 'Max time without a heartbeat before the consumer is presumed dead.', '10-45 seconds depending on client version; tune alongside GC pause expectations for JVM clients.'],
            ['isolation.level', 'Whether uncommitted transactional writes are visible.', "'read_committed' whenever upstream producers use transactions."],
          ]}
        />
        <Callout title="These settings interact — never tune one in isolation" color={K}>
          max.poll.records and max.poll.interval.ms are a pair, not independent knobs — Module 03's rebalance
          timeline shows exactly how tuning one without the other produces a mysterious rebalance under load.
          The same discipline applies here: change the ratio deliberately, and re-verify under realistic
          per-record processing time, not synthetic benchmarks with a no-op process function.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Manual commit-after-processing" />
        <SectionTitle>Commit Only After Work Is Actually, Durably Done</SectionTitle>
        <Para>
          The core reliability pattern for a consumer with real side effects is simple to state and easy to
          get subtly wrong in practice: process a record completely — including any database write, API call,
          or downstream produce — before committing its offset, and never commit an offset for work that has
          not fully and durably succeeded.
        </Para>
        <CodeBox label="manual commit after processing — the baseline pattern">
{`from confluent_kafka import Consumer, KafkaError

consumer = Consumer({
    'bootstrap.servers': 'broker-1:9092,broker-2:9092',
    'group.id': 'order-processing-service',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False,   # we commit manually, only after success
    'max.poll.records': 200,
    'max.poll.interval.ms': 300000,
})
consumer.subscribe(['orders.events'])

try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            logger.error(f"Consumer error: {msg.error()}")
            continue

        try:
            process_order_event(msg)          # the real work — must be durable
            consumer.commit(message=msg, asynchronous=False)
            # commit only happens AFTER process_order_event fully succeeds
        except Exception as exc:
            logger.error(f"Processing failed, offset NOT committed: {exc}")
            # do not commit -- this record will be redelivered on restart
            raise
finally:
    consumer.close()`}
        </CodeBox>
        <Para>
          Committing after every single record, as shown above, is the safest pattern but also the slowest —
          each <code>commit(asynchronous=False)</code> call is itself a synchronous write to the
          <code>__consumer_offsets</code> topic, and doing this per record adds real latency under high
          throughput. In practice, most production consumers commit after each successfully processed
          <em>batch</em> returned by one <code>poll()</code> call, not after each individual record, trading a
          slightly larger reprocessing window on crash for meaningfully better throughput.
        </Para>
        <CodeBox label="batch-level manual commit — the common production pattern">
{`while True:
    batch = consumer.consume(num_messages=200, timeout=1.0)
    if not batch:
        continue

    try:
        for msg in batch:
            if msg.error():
                continue
            process_order_event(msg)   # every record in the batch must succeed

        # commit once, for the whole batch, only after all records succeeded
        consumer.commit(asynchronous=False)
    except Exception as exc:
        logger.error(f"Batch processing failed, offsets NOT committed: {exc}")
        # entire batch will be redelivered from the last committed offset
        raise`}
        </CodeBox>
        <Table
          headers={['Commit granularity', 'Reprocessing window on crash', 'Throughput cost']}
          rows={[
            ['Per record', 'At most one record reprocessed.', 'Highest — one offset-topic write per record.'],
            ['Per batch (per poll() call)', 'Up to one full batch reprocessed.', 'Low — one offset-topic write per batch, amortized across many records.'],
            ['Fixed time interval (e.g. every 5s)', 'Everything processed since the last interval reprocessed.', 'Lowest, but reintroduces some of auto-commit\'s timing risk if not tied to actual processing completion.'],
          ]}
        />
        <Callout title="Batch commits only work if every record in the batch is genuinely idempotent to reprocess" color="#ef4444">
          A per-batch commit means a crash mid-batch redelivers the entire batch, including records that were
          already fully processed before the crash. This is not a flaw to work around — it is the at-least-once
          contract Kafka gives you by design. Part 04 covers the processing-side pattern that makes this safe.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Idempotent processing" />
        <SectionTitle>Reprocessing Will Happen. Design So It Never Corrupts State.</SectionTitle>
        <Para>
          At-least-once delivery is not a bug to be engineered away — it is the fundamental guarantee a
          commit-after-processing consumer provides, and any consumer that commits after doing real work will
          occasionally reprocess a record it already handled. The only durable fix is making the processing
          logic itself idempotent: applying the same record twice produces the same end state as applying it
          once.
        </Para>
        <SubTitle>The wrong instinct: trying to prevent redelivery</SubTitle>
        <Para>
          Engineers new to this problem often try to solve it by committing more aggressively, or by adding
          complex distributed locking to prevent a record from ever being processed twice. Both approaches
          fight the delivery model instead of accepting it. Kafka's own transactional exactly-once guarantees
          (covered in the message brokers module) only apply within a Kafka-to-Kafka pipeline — the moment your
          consumer's side effect is a database write, an external API call, or a notification send, you are
          back to at-least-once semantics at that boundary, and idempotent processing is the only reliable
          answer.
        </Para>
        <SubTitle>Pattern 1 — idempotency keys on the write itself</SubTitle>
        <Para>
          The most robust pattern: every event carries a stable, unique identifier, and every downstream write
          checks or enforces uniqueness on that identifier before applying the write's effect.
        </Para>
        <CodeBox label="idempotent processing via a unique constraint at the database level">
{`def process_order_event(msg):
    event = json.loads(msg.value())
    order_id = event['order_id']
    event_id = event['event_id']  # unique per logical event, assigned at production time

    # rely on a unique constraint on event_id at the database level --
    # a duplicate insert raises an integrity error instead of double-applying
    try:
        db.execute(
            "INSERT INTO order_events (event_id, order_id, status, processed_at) "
            "VALUES (%s, %s, %s, now())",
            (event_id, order_id, event['status']),
        )
    except UniqueConstraintViolation:
        logger.info(f"event_id={event_id} already processed, skipping duplicate")
        return  # not an error -- this is exactly-once processing working as intended`}
        </CodeBox>
        <SubTitle>Pattern 2 — idempotent by construction, using upserts</SubTitle>
        <Para>
          When the event represents a state transition rather than an append-only fact, an upsert keyed on the
          entity ID is naturally idempotent — applying the same "order status = shipped" event twice leaves the
          row in exactly the same state either time, with no special-case duplicate detection required at all.
        </Para>
        <CodeBox label="idempotent by construction — upsert instead of append">
{`def process_order_status_event(msg):
    event = json.loads(msg.value())

    # UPSERT: applying this twice with the same data is a no-op the second time.
    # No explicit duplicate check needed -- idempotency is structural.
    db.execute(
        "INSERT INTO order_status (order_id, status, updated_at) "
        "VALUES (%s, %s, %s) "
        "ON CONFLICT (order_id) DO UPDATE SET "
        "  status = EXCLUDED.status, updated_at = EXCLUDED.updated_at "
        "  WHERE EXCLUDED.updated_at > order_status.updated_at",
        (event['order_id'], event['status'], event['event_timestamp']),
    )
    # the WHERE clause also protects against OUT-OF-ORDER redelivery --
    # an older event replayed after a newer one is a no-op, not a regression`}
        </CodeBox>
        <Table
          headers={['Pattern', 'When to use it', 'What it protects against']}
          rows={[
            ['Unique constraint on event_id', 'Append-only event logs (audit trails, event sourcing).', 'Exact duplicate reprocessing of the same event.'],
            ['Upsert keyed on entity ID', 'State-representing events (current status, current balance).', 'Duplicate AND out-of-order reprocessing, if timestamps are compared in the upsert.'],
            ['Idempotency key on an external API call', 'Side effects outside your own database (payment charges, sending an email).', 'Duplicate external side effects, which are often far more costly than a duplicate database row.'],
          ]}
        />
        <CodeBox label="idempotent external API calls using a client-supplied idempotency key">
{`def process_payment_event(msg):
    event = json.loads(msg.value())

    # many payment APIs (Stripe among them) accept a client-supplied
    # idempotency key; the same key submitted twice returns the original
    # result instead of charging twice
    payment_client.create_charge(
        amount=event['amount_cents'],
        customer_id=event['customer_id'],
        idempotency_key=event['event_id'],  # stable across redeliveries
    )`}
        </CodeBox>
        <Callout title="Idempotency keys must come from the event, never be generated at processing time" color="#00e676">
          Generating a fresh idempotency key each time a record is processed defeats the entire purpose — the
          key must be assigned once, at production time, and carried through the event so that every
          redelivery of the same logical event carries the same key. A key derived from
          <code>datetime.now()</code> or a random UUID generated inside the consumer is not an idempotency key
          at all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Poison messages and the DLQ" />
        <SectionTitle>One Bad Record Should Never Block Every Record Behind It</SectionTitle>
        <Para>
          A poison message is a record that fails processing every time it is attempted — a malformed
          payload, a schema violation, a value the processing logic cannot handle regardless of how many times
          it retries. Because a consumer following Part 03's pattern only advances its committed offset after
          successful processing, a poison message that is retried forever blocks the entire partition: nothing
          after it can be processed until it either succeeds or is explicitly skipped.
        </Para>
        <SubTitle>Retry with a bounded count, then dead-letter</SubTitle>
        <Para>
          The pattern from the message brokers module's dead letter queue coverage applies directly here: retry
          a failing record a small, bounded number of times to absorb genuinely transient failures, then route
          it to a DLQ topic and commit past it, rather than retrying indefinitely or crashing the whole
          consumer.
        </Para>
        <CodeBox label="poison message handling — bounded retry, then route to DLQ">
{`import json
import logging

logger = logging.getLogger(__name__)
MAX_RETRIES = 3

def process_with_dlq(msg, process_fn, dlq_producer, dlq_topic):
    """
    Attempt processing up to MAX_RETRIES times. On exhaustion, write the
    failed record to the DLQ and return normally so the caller commits
    past it -- this is what actually unblocks the partition.
    """
    last_exception = None
    event = json.loads(msg.value())

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            process_fn(event)
            return True  # success -- caller commits normally
        except Exception as exc:
            last_exception = exc
            logger.warning(
                f"Processing failed (attempt {attempt}/{MAX_RETRIES}): "
                f"event_id={event.get('event_id')} error={exc}"
            )

    # retries exhausted -- route to DLQ instead of blocking the partition forever
    dlq_event = {
        'original_event': event,
        'error_message': str(last_exception),
        'error_type': type(last_exception).__name__,
        'retry_count': MAX_RETRIES,
        'source_topic': msg.topic(),
        'source_partition': msg.partition(),
        'source_offset': msg.offset(),
    }
    dlq_producer.produce(
        topic=dlq_topic,
        key=msg.key(),
        value=json.dumps(dlq_event).encode('utf-8'),
    )
    dlq_producer.flush()
    logger.error(f"Event sent to DLQ: event_id={event.get('event_id')}")
    return True  # caller commits -- this record is "handled," just not successfully`}
        </CodeBox>
        <Para>
          The critical design decision is the return value: <code>process_with_dlq</code> returns
          <code>True</code> in both the success case and the exhausted-retries-routed-to-DLQ case. Both are
          "handled" from the offset-commit perspective — the difference between them is tracked in the DLQ and
          in metrics, not in whether the offset advances. Only a genuinely unexpected exception (a bug in the
          DLQ write itself, for instance) should prevent the commit and stop the consumer loop.
        </Para>
        <SubTitle>Distinguishing transient failures from genuinely poison ones</SubTitle>
        <Para>
          Not every failure on the first attempt is a poison message — a downstream database being briefly
          unavailable looks identical, on attempt one, to a record that will never succeed. The bounded retry
          count exists precisely to absorb the transient case without over-engineering a distinction that a
          simple retry-then-dead-letter policy already handles well in practice. Teams that need finer
          distinction typically add a short, exponential backoff between attempts rather than immediate
          retries, so a transient failure has time to actually resolve before the retry budget is exhausted.
        </Para>
        <CodeBox label="adding backoff between retries">
{`import time

for attempt in range(1, MAX_RETRIES + 1):
    try:
        process_fn(event)
        return True
    except Exception as exc:
        last_exception = exc
        if attempt < MAX_RETRIES:
            backoff_seconds = 2 ** attempt  # 2s, 4s, 8s
            logger.warning(f"Retry {attempt} failed, backing off {backoff_seconds}s")
            time.sleep(backoff_seconds)`}
        </CodeBox>
        <Callout title="A sleeping consumer thread is not calling poll() — watch max.poll.interval.ms" color="#ef4444">
          Backoff sleeps happen inside the processing path, between poll() calls, which means they count
          against your max.poll.interval.ms budget just like slow processing does. A retry policy with long
          backoffs multiplied by a large max.poll.records can trip a rebalance for the same reason covered in
          Part 02 — size the two together.
        </Callout>
        <SubTitle>Reading record headers before committing to a deserialization path</SubTitle>
        <Para>
          Mirroring the producer side's use of headers, a consumer can inspect a record's headers cheaply
          before deciding how to deserialize its value — useful during a schema migration when a topic
          temporarily carries two payload versions, or when routing certain records to different handling
          logic based on metadata alone.
        </Para>
        <CodeBox label="using headers to route before committing to full deserialization">
{`def process_order_event(msg):
    headers = dict(msg.headers() or [])
    schema_version = headers.get('schema_version', b'1').decode()

    if schema_version == '1':
        event = parse_legacy_order_event(msg.value())
    else:
        event = parse_order_event_v3(msg.value())

    # trace_id from headers lets this consumer's processing span
    # connect back to the producing service's original trace, without
    # the trace ID needing to live inside the business payload itself
    trace_id = headers.get('trace_id', b'').decode()
    with tracer.start_span('process_order_event', trace_id=trace_id):
        process_with_dlq(msg, event)`}
        </CodeBox>
        <Para>
          This pattern is also what makes a poison-message DLQ record genuinely useful for debugging: if the
          original producer attached a <code>producing_service</code> and <code>trace_id</code> header, the
          DLQ event in Part 05 can carry that context forward automatically, connecting a failed record all
          the way back to the request that originally produced it.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The complete worked example" />
        <SectionTitle>A Production-Grade Order-Events Consumer, Start to Finish</SectionTitle>
        <Para>
          This class combines a manual commit after each successfully processed record, idempotent processing, bounded-retry DLQ routing, and a
          rebalance listener into one consumer you could adapt directly for a real order-processing service.
        </Para>
        <CodeBox label="order_event_consumer.py — configuration and initialization">
{`import json
import logging
import signal
import sys

from confluent_kafka import Consumer, Producer, KafkaError, TopicPartition

logger = logging.getLogger(__name__)
MAX_RETRIES = 3


class OrderEventConsumer:
    """
    Production consumer for order lifecycle events.
    Reliability posture: manual commit after each successfully processed record,
    idempotent database writes, bounded retry with DLQ fallback for
    poison messages, and offset commits on partition revocation so a
    rebalance never silently reprocesses more than necessary.
    """

    def __init__(self, bootstrap_servers: str, topic: str, dlq_topic: str, group_id: str):
        self.topic = topic
        self.dlq_topic = dlq_topic
        self._running = True

        self.consumer = Consumer({
            'bootstrap.servers': bootstrap_servers,
            'group.id': group_id,
            'auto.offset.reset': 'earliest',
            'enable.auto.commit': False,
            'max.poll.records': 200,
            'max.poll.interval.ms': 300000,
            'session.timeout.ms': 20000,
            'isolation.level': 'read_committed',
        })

        self.dlq_producer = Producer({
            'bootstrap.servers': bootstrap_servers,
            'acks': 'all',
            'enable.idempotence': True,
        })

        self.consumer.subscribe(
            [topic],
            on_assign=self._on_partitions_assigned,
            on_revoke=self._on_partitions_revoked,
        )`}
        </CodeBox>
        <CodeBox label="order_event_consumer.py — the rebalance listener">
{`    def _on_partitions_assigned(self, consumer, partitions):
        logger.info(f"Partitions assigned: {[p.partition for p in partitions]}")
        # nothing to do here in the common case -- the consumer will
        # simply resume from the last committed offset for each partition

    def _on_partitions_revoked(self, consumer, partitions):
        """
        Called BEFORE partitions are taken away, whether from a rebalance
        or a clean shutdown. This is the last chance to commit work that
        has already been processed but not yet committed -- skipping this
        means that work gets reprocessed by whichever consumer picks up
        the partition next, even though it already succeeded here.
        """
        logger.info(f"Partitions revoked: {[p.partition for p in partitions]}, committing")
        try:
            consumer.commit(asynchronous=False)
        except Exception as exc:
            # a failed commit here is not fatal to the rebalance, but it
            # does mean the next owner will reprocess more than necessary
            logger.error(f"Commit during partition revocation failed: {exc}")`}
        </CodeBox>
        <CodeBox label="order_event_consumer.py — idempotent processing logic">
{`    def _process_order_event(self, event: dict):
        order_id = event['order_id']
        event_id = event['event_id']

        # upsert keyed on order_id with a newer-timestamp guard --
        # idempotent AND safe against out-of-order redelivery
        db.execute(
            "INSERT INTO order_status (order_id, event_id, status, updated_at) "
            "VALUES (%s, %s, %s, %s) "
            "ON CONFLICT (order_id) DO UPDATE SET "
            "  status = EXCLUDED.status, event_id = EXCLUDED.event_id, "
            "  updated_at = EXCLUDED.updated_at "
            "  WHERE EXCLUDED.updated_at > order_status.updated_at",
            (order_id, event_id, event['status'], event['event_timestamp']),
        )`}
        </CodeBox>
        <CodeBox label="order_event_consumer.py — bounded retry with DLQ fallback">
{`    def _process_with_dlq(self, msg) -> bool:
        event = json.loads(msg.value())
        last_exception = None

        for attempt in range(1, MAX_RETRIES + 1):
            try:
                self._process_order_event(event)
                return True
            except Exception as exc:
                last_exception = exc
                logger.warning(
                    f"Processing failed (attempt {attempt}/{MAX_RETRIES}): "
                    f"event_id={event.get('event_id')} error={exc}"
                )

        dlq_event = {
            'original_event': event,
            'error_message': str(last_exception),
            'error_type': type(last_exception).__name__,
            'retry_count': MAX_RETRIES,
            'source_partition': msg.partition(),
            'source_offset': msg.offset(),
        }
        self.dlq_producer.produce(
            topic=self.dlq_topic,
            key=msg.key(),
            value=json.dumps(dlq_event).encode('utf-8'),
        )
        self.dlq_producer.flush()
        logger.error(f"Routed to DLQ after {MAX_RETRIES} attempts: event_id={event.get('event_id')}")
        return True  # handled -- offset still advances past this record`}
        </CodeBox>
        <CodeBox label="order_event_consumer.py — the main loop and graceful shutdown">
{`    def run(self):
        signal.signal(signal.SIGTERM, self._handle_shutdown_signal)
        signal.signal(signal.SIGINT, self._handle_shutdown_signal)

        try:
            while self._running:
                msg = self.consumer.poll(timeout=1.0)
                if msg is None:
                    continue
                if msg.error():
                    logger.error(f"Consumer error: {msg.error()}")
                    continue

                self._process_with_dlq(msg)
                self.consumer.commit(message=msg, asynchronous=False)
        finally:
            self.close()

    def _handle_shutdown_signal(self, signum, frame):
        logger.info(f"Received signal {signum}, requesting shutdown")
        self._running = False
        # consumer.wakeup() interrupts a blocking poll() call immediately,
        # rather than waiting for its timeout to elapse naturally
        self.consumer.wakeup()

    def close(self):
        logger.info("Shutting down consumer, committing final offsets")
        try:
            self.consumer.commit(asynchronous=False)
        except Exception as exc:
            logger.error(f"Final commit during shutdown failed: {exc}")
        self.dlq_producer.flush(timeout=10)
        self.consumer.close()
        logger.info("Consumer shutdown complete")`}
        </CodeBox>
        <Para>
          Every piece traces back to a named concern from earlier parts: <code>enable.auto.commit=False</code>
          plus explicit <code>commit()</code> calls from Part 03, the upsert-with-timestamp-guard idempotent
          write from Part 04, the bounded-retry-then-DLQ pattern from Part 05, and — new here —
          <code>on_assign</code>/<code>on_revoke</code> callbacks that commit before a partition is taken away,
          plus <code>consumer.wakeup()</code> wired to signal handling so shutdown interrupts a blocking
          <code>poll()</code> immediately instead of waiting out its timeout.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Graceful shutdown in depth" />
        <SectionTitle>consumer.wakeup() and Why a Blocking poll() Needs Interrupting</SectionTitle>
        <Para>
          <code>consumer.poll(timeout=1.0)</code> blocks for up to one second waiting for records. During
          normal operation this is harmless — one second of added shutdown latency is nothing. But a consumer
          in the middle of processing a slow record when a shutdown signal arrives needs a way to interrupt
          that wait cleanly rather than relying on the next timeout to happen to notice a shutdown flag.
          <code>consumer.wakeup()</code>, called from a signal handler, interrupts a blocking <code>poll()</code>
          call immediately by raising an exception inside it, letting the main loop's exit condition be checked
          right away instead of up to a full <code>timeout</code> seconds later.
        </Para>
        <CodeBox label="the full shutdown sequence, in order">
{`# 1. SIGTERM arrives from the orchestrator
# 2. signal handler sets self._running = False
# 3. signal handler calls consumer.wakeup() -- interrupts any blocking poll() now
# 4. main loop's next poll() call raises, or the loop's while condition
#    is checked and exits cleanly
# 5. finally block calls close()
# 6. close() commits the current position with a final synchronous commit
# 7. close() flushes the DLQ producer (in case a DLQ write was still in flight)
# 8. close() calls consumer.close(), which also triggers a final
#    partition-revocation cycle and a LeaveGroup request to the coordinator,
#    letting the group rebalance immediately rather than waiting out
#    session.timeout.ms for a departure the coordinator doesn't yet know about`}
        </CodeBox>
        <Para>
          That last point matters more than it looks: an unclean shutdown — a killed process that never calls
          <code>consumer.close()</code> — leaves the group coordinator waiting out the full
          <code>session.timeout.ms</code> before it notices the consumer is gone and reassigns its partitions.
          A clean shutdown that calls <code>close()</code> sends an explicit departure notice, and the group
          rebalances immediately. For a rolling deploy restarting many consumer instances in sequence, this
          difference is the gap between a smooth deploy and every deploy triggering a
          <code>session.timeout.ms</code>-long stall on each instance.
        </Para>
        <Callout title="Match the flush and commit timeouts to your orchestrator's grace period" color="#ef4444">
          Exactly as with the producer module's shutdown guidance, the final commit and DLQ flush inside
          close() need to complete before the orchestrator's SIGKILL arrives. Keep this sequence fast and
          bounded — it should not itself be doing slow, unbounded work during shutdown.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Rebalance listeners in depth" />
        <SectionTitle>onPartitionsRevoked Is Your Last Chance Before the Work Is Gone</SectionTitle>
        <Para>
          A rebalance listener's <code>on_revoke</code> callback (the naming varies by client library —
          Java's consumer API calls this <code>onPartitionsRevoked</code>) fires before the group coordinator
          actually reassigns a consumer's partitions to someone else. This is the precise moment to commit any
          processed-but-not-yet-committed offsets for the partitions about to be taken away — after this
          callback returns, the new owner of those partitions resumes from whatever was last committed, with
          no further chance for the outgoing consumer to influence that starting point.
        </Para>
        <SubTitle>What happens if you skip the revoke callback</SubTitle>
        <Para>
          Without committing in <code>on_revoke</code>, a consumer relying solely on its normal
          per-batch commit cadence can lose work at exactly the wrong moment: a rebalance triggered mid-batch
          means the current batch's successfully processed records are never committed, because the partition
          is reassigned before the batch's natural commit point is reached. The new owner starts from the
          older committed offset and reprocesses records the previous owner already handled successfully —
          not incorrect under at-least-once semantics and Part 04's idempotency guidance, but unnecessary
          duplicate work that a revoke-time commit avoids entirely.
        </Para>
        <CodeBox label="on_assign and on_revoke together — the complete rebalance contract">
{`def on_partitions_assigned(consumer, partitions):
    logger.info(f"Assigned: {partitions}")
    # optional: pre-warm any per-partition state here, or explicitly
    # seek to a specific offset if this service needs custom starting logic

def on_partitions_revoked(consumer, partitions):
    logger.info(f"Revoking: {partitions}, committing current progress")
    try:
        consumer.commit(asynchronous=False)
    except Exception as exc:
        logger.error(f"Commit during revoke failed, next owner may reprocess more: {exc}")
    # any per-partition in-memory state (batching buffers, local caches)
    # tied to these specific partitions should be flushed or discarded here

consumer.subscribe(
    ['orders.events'],
    on_assign=on_partitions_assigned,
    on_revoke=on_partitions_revoked,
)`}
        </CodeBox>
        <Callout title="Cooperative rebalancing changes which partitions on_revoke actually sees" color="#38bdf8">
          Per Module 03's cooperative rebalancing coverage, with the incremental cooperative protocol,
          on_revoke is called only with the specific partitions actually moving, not the consumer's entire
          assignment — unaffected partitions are never revoked at all. Code that assumes on_revoke always
          receives the full current assignment (a holdover assumption from the older eager protocol) can
          commit or clean up more state than necessary under cooperative rebalancing.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — The production-readiness checklist" />
        <SectionTitle>Is This Consumer Actually Production-Ready?</SectionTitle>
        <Para>
          Run any new consumer — or a pull request adding one — against this checklist before it ships. Every
          item traces to a specific failure mode covered earlier in this module.
        </Para>
        <BulletList
          items={[
            'enable.auto.commit=false is set explicitly for any workflow with a real side effect, paired with deliberate manual commits after processing succeeds.',
            'The commit granularity (per record vs. per batch) is a conscious choice, with the reprocessing-window tradeoff understood by whoever chose it.',
            'Every processing path that writes to a database, calls an external API, or produces to another topic is genuinely idempotent — verified by asking "what happens if this exact record is processed twice."',
            'A bounded retry count exists for processing failures, with a dead letter path for records that exhaust it — no unbounded retry loop that can block a partition forever.',
            'An on_revoke callback commits current progress before partitions are taken away, not just relying on the normal commit cadence to happen to land in time.',
            'Shutdown is wired to real signal handling, calls consumer.wakeup() to interrupt a blocking poll() promptly, and performs a final synchronous commit before consumer.close().',
            'max.poll.records and max.poll.interval.ms are sized together against real, measured per-record processing time, not left at defaults and hoped to work under load.',
            'isolation.level is set to read_committed whenever upstream producers use Kafka transactions.',
            'Consumer lag is monitored per partition, not just as a group-wide total that can hide one badly lagging partition behind many healthy ones.',
            'A DLQ record carries enough context (source partition, source offset, error details) to actually diagnose and potentially replay the failure later.',
          ]}
        />
        <Callout title="Idempotency is the one item you cannot retrofit casually" color="#00e676">
          Every other item on this checklist can be added to an existing consumer without touching its data
          model. Idempotent processing often requires a schema change (a unique constraint, an
          idempotency-key column) or a shift to upsert semantics — design it in from the start rather than
          treating it as an afterthought once duplicates in production force the issue.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Testing consumer reliability" />
        <SectionTitle>Idempotency and Rebalance Safety Are Claims. Test Them.</SectionTitle>
        <Para>
          A consumer's reliability design makes specific, checkable claims: "reprocessing this record twice
          is harmless," "a rebalance mid-batch never loses committed progress," "a poison message never
          blocks the partition forever." Each of these should be verified with a targeted test rather than
          trusted on inspection alone — reliability bugs in consumers are exactly the kind that pass a normal
          functional test suite and only appear under a crash or a rebalance in production.
        </Para>
        <SubTitle>Test 1 — processing the same record twice produces the same end state</SubTitle>
        <Para>
          This is the single highest-value test for any consumer following the idempotent-processing pattern
          from Part 04: feed the exact same record through the processing function twice and assert the
          resulting state is identical to processing it once.
        </Para>
        <CodeBox label="an idempotency test that directly exercises the redelivery scenario">
{`def test_processing_same_event_twice_is_idempotent(test_db):
    event = {
        'order_id': 'order-42',
        'event_id': 'evt-9001',
        'status': 'shipped',
        'event_timestamp': '2026-09-01T10:00:00Z',
    }

    consumer = OrderEventConsumer(
        bootstrap_servers='localhost:9092',
        topic='test.orders.events',
        dlq_topic='test.orders.events.dlq',
        group_id='test-group',
    )

    consumer._process_order_event(event)
    state_after_first = test_db.query(
        "SELECT status, updated_at FROM order_status WHERE order_id = %s",
        ('order-42',),
    )

    consumer._process_order_event(event)  # simulate exact redelivery
    state_after_second = test_db.query(
        "SELECT status, updated_at FROM order_status WHERE order_id = %s",
        ('order-42',),
    )

    assert state_after_first == state_after_second
    row_count = test_db.query(
        "SELECT count(*) FROM order_status WHERE order_id = %s", ('order-42',)
    )
    assert row_count[0][0] == 1  # never a duplicate row`}
        </CodeBox>
        <SubTitle>Test 2 — an out-of-order redelivery does not regress state</SubTitle>
        <Para>
          Beyond exact duplication, verify the timestamp-guard pattern from Part 04 actually rejects a stale
          event replayed after a newer one — a scenario that plain duplicate detection alone would not catch.
        </Para>
        <CodeBox label="verifying the timestamp guard rejects out-of-order redelivery">
{`def test_out_of_order_event_does_not_regress_state(test_db):
    newer_event = {
        'order_id': 'order-42', 'event_id': 'evt-2',
        'status': 'delivered', 'event_timestamp': '2026-09-01T12:00:00Z',
    }
    older_event = {
        'order_id': 'order-42', 'event_id': 'evt-1',
        'status': 'shipped', 'event_timestamp': '2026-09-01T10:00:00Z',
    }

    consumer._process_order_event(newer_event)
    consumer._process_order_event(older_event)  # arrives late, after the newer one

    row = test_db.query(
        "SELECT status FROM order_status WHERE order_id = %s", ('order-42',)
    )
    assert row[0][0] == 'delivered'  # older event must NOT have overwritten this`}
        </CodeBox>
        <SubTitle>Test 3 — on_revoke commits before the partition changes hands</SubTitle>
        <Para>
          Simulate a rebalance mid-batch and confirm the committed offset reflects everything processed
          before the revoke, not just whatever the normal commit cadence had already landed.
        </Para>
        <CodeBox label="verifying the revoke callback actually commits pending progress">
{`def test_on_revoke_commits_pending_progress(kafka_test_cluster):
    consumer = OrderEventConsumer(
        bootstrap_servers=kafka_test_cluster.bootstrap_servers,
        topic='test.orders.events',
        dlq_topic='test.orders.events.dlq',
        group_id='test-group',
    )

    # process some records without hitting a natural batch-commit boundary
    for msg in kafka_test_cluster.produce_and_fetch(count=10):
        consumer._process_order_event(json.loads(msg.value()))
        # deliberately no commit() call here -- simulating mid-batch state

    # simulate the coordinator revoking this consumer's partitions
    partitions = [TopicPartition('test.orders.events', 0)]
    consumer._on_partitions_revoked(consumer.consumer, partitions)

    committed = consumer.consumer.committed(partitions)
    assert committed[0].offset == 10  # revoke-time commit caught the pending work`}
        </CodeBox>
        <SubTitle>Test 4 — a poison message does not block the partition</SubTitle>
        <Para>
          Inject a record guaranteed to fail processing every time, and confirm the consumer routes it to the
          DLQ after the configured retry budget and continues processing everything after it, rather than
          stalling indefinitely.
        </Para>
        <CodeBox label="verifying a poison message is dead-lettered, not blocking">
{`def test_poison_message_routes_to_dlq_and_partition_continues(kafka_test_cluster):
    kafka_test_cluster.produce('test.orders.events', key='bad', value=b'not-valid-json{{{')
    kafka_test_cluster.produce('test.orders.events', key='good', value=json.dumps(
        {'order_id': 'order-99', 'event_id': 'evt-99', 'status': 'created',
         'event_timestamp': '2026-09-01T09:00:00Z'}
    ).encode())

    consumer = OrderEventConsumer(
        bootstrap_servers=kafka_test_cluster.bootstrap_servers,
        topic='test.orders.events',
        dlq_topic='test.orders.events.dlq',
        group_id='test-group-poison',
    )

    # process both records -- the poison one should exhaust retries and
    # route to DLQ, the good one right behind it should still process normally
    # drain_available_records and test_db below are illustrative test-harness helpers —
    # swap in your own test fixtures/consumer polling loop.
    processed = consumer.drain_available_records(timeout=10.0)

    dlq_messages = kafka_test_cluster.consume('test.orders.events.dlq', timeout=5.0)
    assert len(dlq_messages) == 1
    assert b'not-valid-json' in dlq_messages[0].value()

    good_state = test_db.query(
        "SELECT status FROM order_status WHERE order_id = %s", ('order-99',)
    )
    assert good_state[0][0] == 'created'  # confirms the partition was not blocked`}
        </CodeBox>
        <Callout title="Run these against a real, local multi-broker cluster, not mocks" color={K}>
          Mocking the Kafka client for these specific tests defeats their purpose — the behaviors under test
          (rebalance timing, actual commit persistence, DLQ delivery) are exactly the parts a mock would fake
          away. A local Docker-based Kafka cluster in CI, even a single-broker KRaft instance, is worth the
          setup cost for this category of test.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Building Kafka Consumers</SectionTitle>
        {[
          {
            wrong: '"Manual commit means I need to commit after every single record for safety"',
            right: 'Part 03 shows per-batch commits are the common production pattern — they trade a slightly larger reprocessing window on crash for meaningfully better throughput, and are safe as long as the processing itself is idempotent, per Part 04.',
          },
          {
            wrong: '"If I never auto-commit, I never reprocess a record"',
            right: 'Part 03 and Part 04 are explicit that at-least-once delivery, which manual commit-after-processing still provides, guarantees occasional reprocessing on crash or rebalance regardless of commit strategy. The fix is idempotent processing, not chasing a commit strategy that eliminates redelivery entirely — that would require exactly-once semantics scoped narrowly to Kafka-to-Kafka pipelines.',
          },
          {
            wrong: '"A dead letter queue means that record is fully handled and can be forgotten"',
            right: 'Part 05 frames the DLQ as an escape valve that unblocks the partition, not a resolution. An unmonitored, growing DLQ is silent, permanent data loss for whatever business process depended on that record actually being processed.',
          },
          {
            wrong: '"consumer.close() and process exit are basically the same thing"',
            right: 'Part 07 shows consumer.close() sends an explicit LeaveGroup notice that triggers immediate rebalancing, versus an unclean exit that leaves the group coordinator waiting out the full session.timeout.ms before it notices the consumer is gone — a meaningful difference during a rolling deploy restarting many instances.',
          },
          {
            wrong: '"on_revoke always receives every partition the consumer currently owns"',
            right: 'Part 08 notes that under the cooperative incremental rebalancing protocol, which is now the default in most client versions, on_revoke is called only with the specific partitions actually moving — code written assuming the older eager protocol\'s full-revocation behavior can commit or clean up more state than the rebalance actually requires.',
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
            <strong>At Notion:</strong> a document-sync consumer occasionally applies the same edit-event
            twice after a deploy, producing a visibly duplicated change in a document's history. Following
            Part 04, the on-call engineer finds the processing logic does a plain <code>INSERT</code> keyed on
            nothing in particular, rather than an upsert or a unique-constraint check on the event's own ID.
            The fix is exactly the upsert-with-timestamp-guard pattern from Part 04 — no change to the
            deployment or commit strategy required, because the redelivery itself was never the actual bug.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Instacart:</strong> a shopper-assignment consumer group experiences a rebalance during
            every single rolling deploy, and each rebalance takes the full <code>session.timeout.ms</code> to
            resolve, adding visible delay to an otherwise routine deploy. Per Part 07, the team discovers the
            service was never calling <code>consumer.close()</code> on shutdown — the container's SIGTERM
            handler stopped the poll loop but exited before the consumer sent an explicit departure notice to
            the group coordinator. Wiring <code>consumer.wakeup()</code> and a proper <code>close()</code>
            call into the shutdown sequence turns each deploy's rebalance from a multi-second stall into a
            near-instant handoff.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Brex:</strong> a transaction-categorization consumer keeps a single partition's DLQ
            quietly filling up for two weeks before anyone notices, because there was no alert wired to DLQ
            message volume — just a dashboard nobody was actively watching. Per Part 05 and Part 09's
            checklist, the fix is not just draining the backlog; it's adding an alert on DLQ depth so this
            specific gap — "the escape valve is not the same as a resolution" — cannot silently recur.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Explain why "commit after processing" is not, by itself, a complete reliability strategy for a Kafka consumer.',
            a: `Committing after processing, rather than before or on an independent timer, is the right foundation — it avoids the specific auto-commit failure mode from Module 03 where a crash between an early commit and actual work completion silently skips records. But per Part 03 and Part 04, it only prevents skipped work; it does not prevent duplicate work.

If a consumer processes a record successfully, has a real side effect like a database write or an external API call, and then crashes before the commit itself lands — or a rebalance takes the partition away at exactly that moment — the same record gets redelivered to whoever processes that partition next. Commit-after-processing guarantees at-least-once delivery, not exactly-once.

The complete strategy is commit-after-processing plus idempotent processing logic, so that the redelivery Part 03's pattern still allows is harmless when it happens. I'd point to the upsert-with-timestamp-guard pattern from Part 04 as the concrete mechanism — it makes reprocessing the same event, or even an out-of-order one, a no-op rather than a source of corrupted state.`,
          },
          {
            q: 'Q2. How do you handle a message that fails processing every single time you attempt it, without stopping the rest of the partition?',
            a: `This is the poison message problem from Part 05. Because a consumer following the commit-after-processing pattern only advances its offset after success, a message that always fails would block every record behind it indefinitely if retried without bound.

The fix is a bounded retry count — enough attempts to absorb a genuinely transient failure, typically with a short backoff between attempts — followed by routing the message to a dead letter topic once that budget is exhausted, and then committing past it anyway. The DLQ record should carry the original payload, the error details, and the source partition and offset, so an engineer can later diagnose the root cause and, once it's fixed, replay the message back through the original pipeline.

The subtlety I'd flag: the function handling this should return success to the caller in both the "processed cleanly" case and the "exhausted retries, routed to DLQ" case — both are handled from the offset-commit perspective. The distinction between them lives in monitoring and in the DLQ itself, not in whether the partition keeps moving.`,
          },
          {
            q: 'Q3. What is the purpose of an on_revoke / onPartitionsRevoked callback, and what happens if a consumer doesn\'t implement one?',
            a: `Per Part 08, on_revoke fires immediately before the group coordinator reassigns a consumer's partitions to someone else during a rebalance. It is the last opportunity for the outgoing consumer to commit any offsets for work it has already processed but not yet committed through its normal commit cadence.

Without it, a consumer relying solely on periodic or per-batch commits can lose that opportunity at exactly the worst moment — a rebalance triggered mid-batch means the current batch's successfully processed records never get committed, because the partition changes hands before the batch's natural commit point arrives. The new owner then starts from an older committed offset and reprocesses records the previous owner already handled.

This isn't a correctness bug if the processing is idempotent, per Part 04 — but it's unnecessary duplicate work, and at scale, across every rebalance a busy consumer group experiences, that adds up. Implementing on_revoke to do one final synchronous commit closes that gap directly.`,
          },
          {
            q: 'Q4. Why does a consumer need consumer.wakeup() during shutdown instead of just checking a flag at the top of the loop?',
            a: `Because poll() itself blocks for up to its configured timeout waiting for records, per Part 07. If a shutdown signal arrives while the consumer is inside a blocking poll() call, simply setting a flag doesn't help until that call returns on its own — which could be up to the full timeout later, and that delay compounds with whatever other shutdown work needs to happen within the orchestrator's grace period.

consumer.wakeup(), called from the signal handler itself, interrupts a blocking poll() call immediately by raising inside it, so the main loop's exit condition gets checked right away rather than waiting out the timeout. It's a small detail, but it's the difference between a shutdown that reliably completes within a tight grace period and one that occasionally races a SIGKILL, especially under load where the loop might be doing other work between poll() calls too.

I'd also mention that the full shutdown sequence matters: after the loop exits, a final synchronous commit and an explicit consumer.close() call are what let the group coordinator rebalance immediately, rather than waiting out session.timeout.ms for a departure it doesn't yet know happened.`,
          },
          {
            q: 'Q5. Walk me through how you would design idempotent processing for a consumer that updates an order\'s current status in a database.',
            a: `Since the event represents a state transition rather than an append-only fact, per Part 04 I'd reach for an upsert keyed on the order's ID rather than trying to detect and skip duplicates explicitly. An INSERT ... ON CONFLICT DO UPDATE keyed on order_id means processing the exact same status update twice leaves the row in the same final state both times — idempotent by construction, with no separate duplicate-tracking table or check required.

I'd go one step further and add a guard clause inside the update — only apply the new status if the incoming event's timestamp is newer than what's already stored. That protects against a second failure mode beyond plain duplication: out-of-order redelivery, where an older event gets reprocessed after a newer one has already landed, which a naive upsert without the timestamp guard would incorrectly let overwrite the more current state.

For the parts of the pipeline where the side effect is external rather than a database row — say, this event also needs to notify a payment provider — I'd use a stable, event-assigned idempotency key on that external call as well, since a database-level upsert doesn't protect an API call made outside that transaction boundary.`,
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
        <SectionTitle>The Mistakes That Make Kafka Consumers Unreliable in Production</SectionTitle>
        {[
          {
            q: 'Leaving enable.auto.commit=true on a consumer with real side effects',
            a: 'Part 02 and Part 03 both point to this as the single most common source of silent skipped work — the commit timer runs independent of whether your application has actually finished processing.',
          },
          {
            q: 'Writing processing logic that is not idempotent, then treating every duplicate as a surprise',
            a: 'At-least-once delivery guarantees occasional reprocessing regardless of commit strategy, per Part 04. Duplicates are not a bug in Kafka to chase — they are an expected condition the processing logic must be designed to absorb.',
          },
          {
            q: 'Retrying a failing record indefinitely instead of routing to a DLQ after a bounded number of attempts',
            a: 'Part 05 shows this blocks every record behind the poison message on that partition, potentially forever, since the consumer never advances its committed offset past it.',
          },
          {
            q: 'Skipping the on_revoke callback and relying only on normal commit cadence',
            a: 'Part 08 shows this can lose the chance to commit already-processed work right before a rebalance takes the partition away, causing unnecessary reprocessing by the next owner even when the processing itself was idempotent.',
          },
          {
            q: 'Killing the consumer process without calling consumer.close()',
            a: 'Part 07 is explicit that close() sends an explicit departure notice that lets the group rebalance immediately; without it, the coordinator waits out the full session.timeout.ms before reassigning the abandoned partitions.',
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
            error: `Consumer group rebalances repeatedly with logs showing CommitFailedException or a similar "commit cannot be completed" error`,
            cause: 'Per Part 02, this almost always means max.poll.interval.ms was exceeded before the commit call was reached — the consumer was removed from the group mid-processing, and the offset it is trying to commit is for a partition it no longer owns.',
            fix: 'Compare real per-record processing time times max.poll.records against max.poll.interval.ms, exactly as covered for producers\' consumer counterpart in Module 03. Lower max.poll.records, raise max.poll.interval.ms to match realistic processing time, or move slow work off the poll thread.',
          },
          {
            error: `The same order status update appears to apply twice in application logs, but the database ends up in the correct final state either way`,
            cause: 'This is at-least-once delivery working as expected, per Part 04 — a crash or rebalance caused reprocessing of an already-handled record. The database ending up correct means the idempotent upsert pattern is doing its job.',
            fix: 'This is not a bug to fix; it is confirmation the idempotency pattern is correct. If it were instead producing an incorrect final state, that would indicate a missing timestamp guard or unique constraint, not a delivery-layer problem.',
          },
          {
            error: `DLQ topic volume grows steadily over days with no corresponding alert firing`,
            cause: 'Per Part 05 and Part 09, a DLQ with no monitoring wired to its message rate or depth is invisible by design — the whole point of the pattern is to unblock the partition, which it does silently whether or not anyone is watching.',
            fix: 'Add an alert on DLQ message rate or depth as a first-class part of shipping any consumer that uses this pattern, not as a follow-up task — Part 09\'s checklist treats this as a hard requirement, not a nice-to-have.',
          },
          {
            error: `A newly deployed consumer instance in a rolling deploy causes a multi-second processing pause across the whole group`,
            cause: 'Per Part 07, the previous instance of this consumer likely did not call consumer.close() cleanly on shutdown, leaving the group coordinator to wait out the full session.timeout.ms before recognizing the departure and reassigning partitions.',
            fix: 'Wire consumer.wakeup() into signal handling and ensure consumer.close() is reliably called in a finally block, sending an explicit LeaveGroup notice that lets the group rebalance immediately instead of waiting out the timeout.',
          },
          {
            error: `A consumer reading from a topic written by a transactional producer occasionally processes records that later disappear from downstream reporting`,
            cause: 'Per Part 02, isolation.level was left at its default of read_uncommitted, which exposes records from transactions that were later aborted — the consumer processed a write that was never actually meant to be visible.',
            fix: 'Set isolation.level=read_committed on any consumer reading from a topic written by a transactional producer, so only committed transaction results are ever visible to this consumer.',
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
          'group.id, auto.offset.reset, and enable.auto.commit are not boilerplate — each is a deliberate decision about fan-out, replay behavior on first startup, and when work actually counts as done.',
          'Commit-after-processing (per record or per batch) prevents silently skipped work, but it guarantees at-least-once delivery, not exactly-once — idempotent processing is what makes the resulting redelivery harmless.',
          'A bounded retry count followed by a dead letter queue is what stops one poison message from permanently blocking every record behind it on the same partition — and DLQ volume needs its own monitoring, not just its existence.',
          'on_revoke / onPartitionsRevoked is the last chance to commit already-processed work before a rebalance hands a partition to another consumer; skipping it causes unnecessary (though usually harmless, if idempotent) reprocessing.',
          'consumer.wakeup() plus a proper consumer.close() in shutdown lets a consumer interrupt a blocking poll() promptly and notify the group coordinator explicitly, turning a rebalance from a session.timeout.ms-long stall into a near-instant handoff.',
          'max.poll.records and max.poll.interval.ms must be sized together against real, measured per-record processing time — including any retry backoff time — not left at defaults and hoped to work under production load.',
        ]}
      />
    </LearnLayout>
  )
}
