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

export default function DeliverySemantics() {
  return (
    <LearnLayout
      title="Delivery Semantics: At-Most, At-Least, Exactly-Once"
      description="What at-most-once, at-least-once, and exactly-once actually guarantee in Kafka, how the idempotent producer and transactions work mechanically, and how to choose the right semantics for a real workload instead of copying a default."
      section="Apache Kafka — Module 09"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Delivery Semantics: At-Most, At-Least, Exactly-Once', href: '/learn/apache-kafka/delivery-semantics' },
      ]}
      prev={{ title: 'Retention and Log Compaction', href: '/learn/apache-kafka/retention-compaction' }}
      next={{ title: 'Serialization and Schema Design', href: '/learn/apache-kafka/schemas-serialization' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Three promises, precisely defined" />
        <SectionTitle>Delivery Semantics Are Promises About Loss and Duplication, Not About Speed</SectionTitle>
        <Para>
          Every messaging system, Kafka included, has to answer one question honestly: when something goes
          wrong — a network blip, a crashed producer, a consumer that dies mid-processing — what happens to
          the message that was in flight at that moment? The answer is not one universal guarantee. It is a
          choice, made per producer and per consumer, among three distinct delivery semantics. Getting this
          choice right, and understanding exactly what it promises and does not promise, is one of the most
          consequential decisions in any Kafka-based system, because it directly determines whether a bug
          shows up as "we silently lost some data" or "we occasionally double-charged a customer."
        </Para>
        <Para>
          <strong>At-most-once</strong> means a message is delivered zero or one times — never more, but
          sometimes not at all. This is what you get from a fire-and-forget producer: send, and move on
          without confirming. <strong>At-least-once</strong> means a message is delivered one or more times —
          never lost, but sometimes duplicated. This is what you get from a producer that retries until it
          receives an acknowledgement, and a consumer that processes a record before committing its offset.
          <strong> Exactly-once</strong> means a message is delivered — and, more precisely, its effect is
          applied — exactly one time: never lost, never duplicated, from the point of view of whoever is
          observing the result.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> exactly-once is a mode you turn on, like a checkbox, and then
            every message is guaranteed to happen exactly once, everywhere, automatically.
          </Para>
          <Para>
            <strong>Production model:</strong> at-most-once and at-least-once are properties of the transport
            — whether a producer waits for acknowledgement and retries, and whether a consumer commits before
            or after processing. Exactly-once is a much narrower, harder-won guarantee that Kafka provides at
            the transport layer through the idempotent producer and transactions (Part 03 and Part 04), and
            that only becomes true end-to-end exactly-once if the side effect your consumer produces — a
            database write, an API call, a file write — is also made idempotent or transactional. Kafka cannot
            make an external system idempotent on your behalf.
          </Para>
        </HighlightBox>
        <Table
          headers={['Semantic', 'Can a message be lost?', 'Can a message be duplicated?', 'What guarantees it']}
          rows={[
            ['At-most-once', 'Yes', 'No', 'Producer sends without waiting for, or without retrying on, acknowledgement failure.'],
            ['At-least-once', 'No', 'Yes', 'Producer retries until acknowledged; consumer commits offsets only after processing.'],
            ['Exactly-once (effectively-once)', 'No', 'No, as observed', 'Idempotent producer deduplicates retries; transactions make read-process-write atomic; or consumer-side idempotency absorbs any remaining duplicates.'],
          ]}
        />
        <Callout title="Why this module comes after replication" color={K}>
          Delivery semantics sit one layer above the durability guarantees covered in Part 06 of the
          replication module. <code>acks</code> and <code>min.insync.replicas</code> determine whether a
          write that reaches the broker survives a broker failure. This module is about a different question:
          given that the write did or did not reach the broker, what does the producer do about
          acknowledgement and retries, and what does the consumer do about processing and offset commits —
          the layer where loss and duplication actually get introduced or prevented.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — At-most-once and at-least-once, mechanically" />
        <SectionTitle>Both Weaker Semantics Come From the Same Two Knobs</SectionTitle>
        <Para>
          At-most-once and at-least-once are not exotic modes with their own configuration flag. They fall
          directly out of two ordinary decisions: does the producer wait for and retry on a failed
          acknowledgement, and does the consumer commit its offset before or after it finishes processing a
          record. Every Kafka pipeline is implicitly choosing one of these, whether or not the team building
          it thought about it explicitly.
        </Para>
        <SubTitle>At-most-once, on the producer side</SubTitle>
        <Para>
          A producer configured with <code>acks=0</code>, or one that simply does not check the result of
          <code>send()</code> (a pattern already flagged as dangerous in the producers module), does not know
          whether a write actually succeeded. If the network drops the request, or the broker rejects it, the
          message is gone and nothing retries it. This is at-most-once by construction: the message was sent
          zero or one times from the broker's point of view, and the producer has no way to tell which.
        </Para>
        <CodeBox label="at-most-once producer pattern">
{`producer = Producer({'bootstrap.servers': 'broker:9092', 'acks': 0})
producer.send('metrics.pageviews', key=session_id, value=event)
# no callback, no future check
# if this send fails silently, the event is gone -- nobody retries it
# nobody even logs that it happened`}
        </CodeBox>
        <SubTitle>At-most-once, on the consumer side</SubTitle>
        <Para>
          A consumer that commits its offset immediately after <code>poll()</code> returns records — before
          actually processing them — is also at-most-once with respect to that processing. If the consumer
          crashes between the commit and finishing the work, Kafka believes those records are done. On
          restart, the consumer resumes past them. They are never reprocessed, and whatever partial or
          nonexistent work happened before the crash is the final state.
        </Para>
        <CodeBox label="at-most-once consumer pattern — commit before processing">
{`records = consumer.poll(timeout=1.0)
consumer.commit()          # offset advances immediately
for record in records:
    process(record)        # if this crashes here, the record is skipped forever`}
        </CodeBox>
        <SubTitle>At-least-once, on the producer side</SubTitle>
        <Para>
          A producer with <code>acks=all</code> (or <code>acks=1</code>) and <code>retries</code> set to a
          high value will keep resending a batch until it receives a successful acknowledgement or exhausts
          its retry budget. This closes the loss gap, but opens a duplication gap: if the broker actually
          wrote the batch and the acknowledgement was lost on the way back — a dropped response packet, a
          timeout that fires just before the ack arrives — the producer has no way to distinguish "the write
          never happened" from "the write happened but I didn't hear about it," so it retries, and the broker
          ends up with the same logical message written twice.
        </Para>
        <SubTitle>At-least-once, on the consumer side</SubTitle>
        <Para>
          A consumer that processes records first and commits its offset only afterward is at-least-once: if
          it crashes after finishing the work but before the commit lands, the commit never happened, and on
          restart the consumer resumes from the last committed offset — reprocessing records it already
          handled. The work is never skipped, but it can happen more than once.
        </Para>
        <Table
          headers={['Choice', 'Producer side', 'Consumer side']}
          rows={[
            ['At-most-once', 'Fire-and-forget send, no retry on failure.', 'Commit offset before or without regard to processing outcome.'],
            ['At-least-once', 'Retry until acknowledged (acks=1 or acks=all, retries > 0).', 'Commit offset only after processing succeeds.'],
          ]}
        />
        <Callout title="At-least-once is the default most teams actually want" color="#22c55e">
          For the large majority of production Kafka pipelines, at-least-once with idempotent downstream
          handling (Part 05) is the pragmatic default: never losing data is usually non-negotiable, and
          duplicates are a solvable, bounded problem — whereas silent loss under at-most-once is often
          discovered only much later, if at all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The idempotent producer" />
        <SectionTitle>Kafka's Idempotent Producer Deduplicates Retries at the Broker</SectionTitle>
        <Para>
          The retry-induced duplication described in Part 02 has a specific, mechanical fix built directly
          into Kafka: the idempotent producer, enabled with <code>enable.idempotence=true</code> (the default
          in current client versions when not explicitly disabled). It does not prevent retries — retries are
          still necessary for at-least-once delivery. Instead, it makes retries safe by letting the broker
          recognize and discard a retried write it has already committed.
        </Para>
        <SubTitle>Producer ID and per-partition sequence numbers</SubTitle>
        <Para>
          When an idempotent producer initializes, the broker assigns it a unique <strong>Producer ID
          (PID)</strong> for that session. Every batch the producer sends to a given partition carries a
          monotonically increasing sequence number, scoped to that (PID, partition) pair. The partition
          leader keeps track of the last sequence number it successfully wrote for each PID. When a new batch
          arrives, the broker compares its sequence number against what it has already seen: a sequence
          number it already wrote is a retry of an already-committed batch, and the broker discards it
          silently while still returning a success acknowledgement to the producer — which never even learns
          a duplicate was thrown away.
        </Para>
        <CodeBox label="idempotent producer — sequence numbers preventing a duplicate write">
{`# Producer initializes: broker assigns PID = 7042

# Producer sends batch [M1, M2, M3] to orders-partition-2
#   PID=7042, sequence=[301, 302, 303]
# Broker appends M1 M2 M3, records "PID 7042 last wrote seq 303 on partition 2"
# Broker sends ack -- but the ack is lost on the way back (network blip)

# Producer times out waiting for the ack, retries the same batch
#   PID=7042, sequence=[301, 302, 303]  -- identical sequence numbers
# Broker checks: "PID 7042 already wrote sequence 303 on this partition"
# Broker discards the retried batch WITHOUT writing it again
# Broker sends a success ack for the discarded retry

# Partition still contains exactly one copy of M1, M2, M3 -- no duplicate`}
        </CodeBox>
        <Para>
          It is worth being precise about the scope of this guarantee, because it is narrower than it
          sounds. The idempotent producer deduplicates retries <em>within one producer session</em>, against
          <em>one partition</em>. The broker only tracks a small window of recent sequence numbers per (PID,
          partition) — not an unbounded history. And if the producer process itself crashes and restarts, it
          receives a brand-new PID on reconnect; the broker has no way to correlate the new PID with the old
          one, so any message the old producer instance sent but never confirmed before crashing could be
          resent by the new instance as a fresh, undeduplicated write.
        </Para>
        <Table
          headers={['What idempotent producer does', 'What it does NOT do']}
          rows={[
            ['Deduplicates retried batches within one producer session and partition.', 'Deduplicate across a producer restart — a new session gets a new PID.'],
            ['Prevents reordering when combined with in-flight requests (up to 5 safely).', 'Guarantee atomicity across multiple partitions or topics — that requires transactions (Part 04).'],
            ['Requires no application code changes — it is a broker/client protocol feature.', 'Make an external side effect (a database write, an API call) idempotent on your behalf.'],
          ]}
        />
        <Callout title="Idempotent producer is 'exactly-once' only for the write itself" color={K}>
          This is the precise, narrow sense in which Kafka can honestly claim exactly-once at the producer
          level: exactly one copy of a message lands in the partition log, even when the network forces
          retries. It says nothing about what happens after that — whether a consumer processes that message
          exactly once, or whether a downstream database ends up with exactly one row as a result. Those are
          separate problems, covered in Part 04 and Part 05.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Transactions and read-process-write atomicity" />
        <SectionTitle>Transactions Make a Consume-Transform-Produce Cycle Atomic</SectionTitle>
        <Para>
          The idempotent producer solves duplication for a single producer writing to a single partition. A
          very common Kafka pattern is more complex than that: a service reads a record from an input topic,
          transforms it, writes the result to an output topic, and needs its consumer offset on the input
          topic to advance — all as one unit. If the write to the output topic succeeds but the offset commit
          fails, or vice versa, a naive implementation ends up either reprocessing the same input record into
          a duplicate output record, or losing track of what was already processed. Kafka's transactional API
          exists specifically to make this three-part operation atomic: either all three things happen, or
          none of them do.
        </Para>
        <SubTitle>The transactional API, piece by piece</SubTitle>
        <BulletList
          items={[
            'initTransactions() — called once at producer startup, registers the transactional.id and fences off any earlier, possibly-zombie producer instance using the same ID.',
            'beginTransaction() — opens a new transaction before producing any records that belong to it.',
            'send() / produce() — writes records as normal, but they are not visible to read_committed consumers until the transaction commits.',
            'sendOffsetsToTransaction() — includes the consumer offset commit as part of the same transaction, instead of committing it separately through the consumer.',
            'commitTransaction() — atomically makes every write and the offset commit visible together.',
            'abortTransaction() — on any failure, rolls the whole transaction back; none of its writes become visible and the offset does not advance.',
          ]}
        />
        <CodeBox label="a transactional producer configured alongside a read_committed consumer">
{`producer = Producer({
    'bootstrap.servers': 'broker:9092',
    'transactional.id': 'order-enrichment-service-1',  # unique per producer instance
    'enable.idempotence': True,   # transactions require idempotence
})
producer.init_transactions()

consumer = Consumer({
    'bootstrap.servers': 'broker:9092',
    'group.id': 'order-enrichment-group',
    'isolation.level': 'read_committed',  # hide uncommitted/aborted writes
    'enable.auto.commit': False,          # offset commits happen inside the transaction
})
consumer.subscribe(['orders.raw'])`}
        </CodeBox>
        <CodeBox label="the atomic read-process-write loop">
{`while running:
    msg = consumer.poll(timeout=1.0)
    if msg is None:
        continue
    try:
        enriched = enrich(json.loads(msg.value()))

        producer.begin_transaction()
        producer.produce('orders.enriched', value=json.dumps(enriched))

        offsets = [{'topic': msg.topic(), 'partition': msg.partition(),
                    'offset': msg.offset() + 1}]
        producer.send_offsets_to_transaction(offsets, consumer.consumer_group_metadata())

        producer.commit_transaction()
        # the write to orders.enriched AND the offset commit on orders.raw
        # become visible together, atomically -- or neither does

    except Exception as error:
        producer.abort_transaction()
        # offset was not committed -- this record will be re-read and retried
        log_and_alert('transaction aborted', error)`}
        </CodeBox>
        <Para>
          The consumer setting <code>isolation.level=read_committed</code> is the other essential half of
          this guarantee. Without it, a consumer reading <code>orders.enriched</code> would see records from
          transactions that later aborted — partial, thrown-away work becoming visible anyway. With
          <code>read_committed</code>, the broker withholds records belonging to an open or aborted
          transaction until (and unless) that transaction commits; an aborted transaction's writes are never
          exposed to a <code>read_committed</code> consumer at all.
        </Para>
        <Table
          headers={['isolation.level', 'What the consumer sees', 'Typical use']}
          rows={[
            ['read_uncommitted (default in many clients)', 'Every write, including ones from transactions that later abort.', 'Non-transactional pipelines, or pipelines where seeing an eventually-aborted write briefly does not matter.'],
            ['read_committed', 'Only writes from transactions that have actually committed; open or aborted transaction writes are withheld.', 'Any consumer downstream of a transactional producer where correctness depends on not seeing partial work.'],
          ]}
        />
        <Callout title="Transactions add real latency and coordination cost" color="#f59e0b">
          Every commitTransaction() is a coordination round trip through a transaction coordinator broker,
          and read_committed consumers must buffer records until a transaction resolves, adding latency
          relative to read_uncommitted. Transactions are the right tool for correctness-critical
          read-process-write pipelines, not a default to reach for on every topic regardless of whether
          atomicity across a write and an offset commit is actually a requirement.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Why 'exactly-once' really means 'effectively-once'" />
        <SectionTitle>The Guarantee Stops at Kafka's Boundary — Your Side Effects Are Still Your Job</SectionTitle>
        <Para>
          Part 03 and Part 04 describe real, mechanically enforced guarantees: exactly one copy of a message
          lands in a partition despite retries, and a read-process-write cycle across topics is atomic. But
          neither of these makes an arbitrary external side effect exactly-once. If your consumer's job is to
          call a payment API, write a row to a Postgres table, or send an email, Kafka's transactional
          guarantees cover the Kafka-to-Kafka part of the pipeline — they say nothing about whether that
          external call itself happens exactly once.
        </Para>
        <Para>
          This is why practitioners increasingly prefer the term <strong>effectively-once</strong> over
          exactly-once: it is more honest about what is actually guaranteed. The message is delivered exactly
          once as far as Kafka's own bookkeeping is concerned. Whether the effect of processing that message
          happens exactly once in the outside world depends on whether that external system was also made
          idempotent or included in a transaction of its own — something Kafka cannot do for you, because it
          has no visibility into a payment gateway's internal state or a database's transaction log.
        </Para>
        <CodeBox label="where Kafka's exactly-once guarantee ends">
{`Kafka's transactional guarantee covers this boundary:
  [ input topic ] --consume--> [ processing ] --produce--> [ output topic ]
                                                    \\
                                                     -- atomic with --> [ offset commit ]

It does NOT cover this boundary:
  [ output topic ] --consume--> [ processing ] --side effect--> [ external system ]
                                                                  (payment API, DB write, email)

A consumer reading orders.enriched and calling a payment API on each record
can still call that API twice for the same record if it crashes between
the API call succeeding and its own offset commit -- Kafka transactions
covered the FIRST boundary, not this one.`}
        </CodeBox>
        <Callout title="A precise way to state the actual guarantee" color={K}>
          Kafka's idempotent producer and transactions give you exactly-once delivery and processing
          <em> within Kafka's own log and offset bookkeeping</em>. End-to-end exactly-once — covering an
          external side effect — requires either wrapping that side effect in the same transaction (only
          possible if the external system supports two-phase commit with Kafka, which is rare) or making the
          side effect idempotent on the consumer's own terms, covered next in Part 06.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Consumer-side idempotency without transactions" />
        <SectionTitle>When Kafka Transactions Aren't in Play, Make the Side Effect Itself Idempotent</SectionTitle>
        <Para>
          Most consumers writing to something outside Kafka — a relational database, a search index, a
          third-party API — cannot lean on Kafka transactions at all, because the external system is not a
          participant in Kafka's transaction protocol. For these, at-least-once plus consumer-side
          idempotency is the standard, practical way to get effectively-once behavior without needing
          Kafka's transactional machinery.
        </Para>
        <SubTitle>Pattern 1 — dedup by a stable business key</SubTitle>
        <Para>
          If every record carries a natural, stable identifier — an order ID, a payment ID, an idempotency
          key the upstream system generated — the consumer can check whether it has already processed that
          identifier before doing the side effect, and skip it if so. The dedup check itself needs to be
          reliable, which usually means backing it with a database unique constraint or a dedicated
          already-processed table, not an in-memory set that a restart would wipe clean.
        </Para>
        <CodeBox label="dedup by business key using a database unique constraint">
{`CREATE TABLE processed_events (
    event_id TEXT PRIMARY KEY,   -- the business key from the record
    processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- inside the consumer, for each record:
BEGIN;
INSERT INTO processed_events (event_id) VALUES (:event_id)
    ON CONFLICT (event_id) DO NOTHING;
-- if 0 rows were inserted, this event_id was already processed -- skip the side effect
-- if 1 row was inserted, this is genuinely new -- do the side effect, in the same
--   database transaction if the side effect is also a database write
COMMIT;`}
        </CodeBox>
        <SubTitle>Pattern 2 — upsert instead of insert</SubTitle>
        <Para>
          For side effects that write current state rather than append a log of events, an upsert (insert if
          absent, overwrite if present, keyed by the record's natural key) is often naturally idempotent
          without needing an explicit dedup table at all: writing the same inventory-count update twice
          produces the same final row either way, because the second write simply overwrites the first with
          identical data. This only works when the side effect is a pure "set current value" operation, not
          an operation with cumulative effect like "increment the count by this amount" — an increment applied
          twice is not idempotent even as an upsert.
        </Para>
        <CodeBox label="upsert-based idempotency — safe for current-state writes, unsafe for increments">
{`-- SAFE: upsert sets an absolute value, replaying it is harmless
INSERT INTO inventory (sku, quantity_on_hand, updated_at)
VALUES (:sku, :quantity, :event_timestamp)
ON CONFLICT (sku) DO UPDATE
  SET quantity_on_hand = EXCLUDED.quantity_on_hand,
      updated_at = EXCLUDED.updated_at
  WHERE inventory.updated_at < EXCLUDED.updated_at;  -- guard against out-of-order replays too

-- UNSAFE: an increment is not idempotent -- replaying it double-counts
UPDATE inventory SET quantity_on_hand = quantity_on_hand - :quantity_sold
WHERE sku = :sku;
-- if this record is processed twice, the sku loses quantity_sold TWICE`}
        </CodeBox>
        <Table
          headers={['Pattern', 'When it works', 'When it does not']}
          rows={[
            ['Dedup table keyed by business key', 'Any event with a stable, unique identifier; works for both event-log and current-state side effects.', 'No usable stable key exists, or the key is only unique within a short window.'],
            ['Upsert on current state', 'The side effect sets an absolute value (current price, current status, current quantity).', 'The side effect is a relative change (increment, decrement, append) — replays double-apply.'],
            ['Idempotency key sent to an external API', 'The external API explicitly supports an idempotency key parameter (many payment APIs do).', 'The external API has no idempotency concept — a duplicate call is indistinguishable from a new one.'],
          ]}
        />
        <Callout title="Idempotency is a property of the operation, not the intention" color="#ef4444">
          Calling something "idempotent processing" in code comments does not make it so. Before trusting a
          side effect to safely absorb Kafka's at-least-once duplicates, check mechanically: does processing
          the exact same record twice, back to back, produce the same final state as processing it once? If
          the honest answer is no, the duplicate-charge bug in Part 07 is only a matter of time.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked example: the duplicate-charge bug" />
        <SectionTitle>Tracing One Bug Through All Three Semantics</SectionTitle>
        <Para>
          Concrete numbers and a concrete bug make the abstract three-way distinction much easier to reason
          about under pressure. Consider a payments service: a consumer reads <code>payments.authorized</code>
          events and, for each one, calls a downstream billing API to actually charge the customer's card.
        </Para>
        <CodeBox label="the buggy version — no idempotency anywhere in the pipeline">
{`consumer.subscribe(['payments.authorized'])
while running:
    records = consumer.poll(timeout=1.0)
    for record in records:
        charge_customer_card(record.customer_id, record.amount)  # NOT idempotent
    consumer.commit()  # after processing -- at-least-once by construction

# scenario: charge_customer_card() succeeds, but the consumer process
# crashes before consumer.commit() executes
# on restart, the consumer resumes from the LAST COMMITTED offset,
# which is BEFORE this record -- it is re-read and re-processed
# charge_customer_card() is called a second time for the same authorization
# the customer is charged twice`}
        </CodeBox>
        <Para>
          Now trace how each of the three semantics would have handled this exact crash.
        </Para>
        <Table
          headers={['Semantic', 'What happens on this crash', 'Does it prevent the double charge?']}
          rows={[
            ['At-most-once (commit before processing)', 'The offset would have already advanced before the charge call — the crash loses nothing to reprocess, but if the crash had instead happened before the charge call completed, the customer would never be charged at all.', 'Prevents the duplicate, but by risking silent loss instead — not an acceptable trade for a payment.'],
            ['At-least-once, no consumer idempotency (as shown above)', 'The record is reprocessed on restart; charge_customer_card() runs twice.', 'No — this is exactly the bug.'],
            ['At-least-once + idempotency key sent to the billing API', 'The record is reprocessed, but the billing API recognizes the same idempotency key and returns the original charge result without charging again.', 'Yes — the duplicate delivery still happens, but its effect does not.'],
            ['Kafka transactions (offset commit atomic with a Kafka write)', 'Only helps if the side effect is itself a Kafka write in the same transaction — a call to an external billing API is outside the transaction boundary (Part 05) and is not protected by this alone.', 'Not by itself — transactions do not reach an external API call.'],
          ]}
        />
        <Para>
          The fix that actually holds up in production combines two of these: at-least-once delivery (so a
          payment is never silently dropped), plus an idempotency key passed to the billing API, generated
          from a stable field on the event itself — the authorization ID, not a value generated fresh on each
          processing attempt, since a freshly generated key would be different on the retry and defeat the
          whole purpose.
        </Para>
        <CodeBox label="the fixed version — at-least-once delivery, idempotent side effect">
{`for record in records:
    charge_customer_card(
        customer_id=record.customer_id,
        amount=record.amount,
        idempotency_key=record.authorization_id,  # stable across retries and reprocessing
    )
consumer.commit()
# if this crashes before commit, the record is reprocessed --
# but charge_customer_card() with the same idempotency_key is now a safe no-op
# on the billing API's side for the second call`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Choosing the right semantics for a workload" />
        <SectionTitle>The Choice Is a Business Decision, Not a Performance Setting</SectionTitle>
        <Para>
          The right delivery semantics for a given topic depend entirely on what the cost of loss versus the
          cost of duplication actually is for that specific data — the same "business decision, not a
          performance setting" framing the producers module applies to <code>acks</code>. A blanket "always
          use exactly-once" policy wastes latency and coordination overhead on data where a duplicate or an
          occasional dropped record costs nothing. A blanket "always use at-most-once for speed" policy is a
          silent data-loss incident waiting to happen on anything with real consequence.
        </Para>
        <Table
          headers={['Workload', 'Cost of losing a record', 'Cost of a duplicate', 'Recommended semantics']}
          rows={[
            ['Metrics and application logs', 'Low — a gap in a dashboard is rarely investigated individually.', 'Low — an occasional double-counted metric is statistically invisible in aggregate.', 'At-most-once is often acceptable; at-least-once with no dedup is fine too.'],
            ['Clickstream / analytics events', 'Low to moderate — matters in aggregate, not per-event.', 'Low — duplicate events wash out in large-scale analytics.', 'At-least-once, no consumer idempotency required in most cases.'],
            ['Order and inventory state changes', 'High — a lost update corrupts current-state accuracy.', 'Moderate to high — a duplicate can double-decrement stock.', 'At-least-once + consumer-side idempotency (dedup key or upsert pattern from Part 06).'],
            ['Payments and billing', 'Unacceptable — a lost charge is a revenue and trust problem.', 'Unacceptable — a duplicate charge is a direct customer harm and compliance issue.', 'At-least-once + idempotency key on the side effect, or full Kafka transactions where the whole pipeline stays inside Kafka.'],
            ['Multi-topic read-process-write pipelines (Kafka Streams-style)', 'Unacceptable if the pipeline is the system of record.', 'Unacceptable for the same reason.', 'Kafka transactions (Part 04) — the pipeline never leaves Kafka, so transactional exactly-once fully applies.'],
          ]}
        />
        <SubTitle>A short decision process</SubTitle>
        <BulletList
          items={[
            'Does the pipeline stay entirely inside Kafka (consume from one topic, produce to another)? If yes, Kafka transactions give you a real, mechanically enforced exactly-once guarantee — use them.',
            'Does the consumer call an external system with a side effect? If yes, transactions cannot reach it — you need at-least-once delivery plus an idempotent side effect (dedup key, upsert, or an idempotency key on the external API).',
            'Is duplication genuinely harmless for this specific data, evaluated honestly rather than assumed? If yes, plain at-least-once with no dedup logic is simpler and cheaper — do not build idempotency machinery nothing needs.',
            'Is occasional silent loss genuinely acceptable, evaluated with the same honesty? Only then is at-most-once a reasonable, deliberate choice — never a default reached for out of laziness about acknowledgements.',
          ]}
        />
        <Callout title="Idempotent producer should almost always be on regardless" color="#22c55e">
          Unlike the broader semantics choice, enabling <code>enable.idempotence=true</code> on the producer
          has essentially no downside — it prevents a specific, narrow class of duplicate writes at the
          broker with negligible overhead, and it is required for transactions anyway. There is very little
          reason to leave it disabled on any modern producer, regardless of which end-to-end semantics the
          workload ultimately needs.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Observing loss and duplication in production" />
        <SectionTitle>Delivery Semantics Are Only Real If You Can Verify Them</SectionTitle>
        <Para>
          Every semantics choice covered so far is a design-time decision. In production, the only way to
          know whether that design decision is actually holding is to measure it directly — loss and
          duplication are both silent by default, and a pipeline that has been quietly losing or duplicating
          records for weeks will not announce itself unless something is specifically watching for it.
        </Para>
        <SubTitle>Detecting loss</SubTitle>
        <Para>
          The most reliable way to detect loss end to end is a count reconciliation: track how many records a
          producer believes it successfully sent (from delivery callbacks or futures, per the producers
          module's callback-handling guidance) against how many records a consumer, or a downstream sink,
          believes it actually processed, over the same window of time. A persistent, unexplained gap between
          those two counts is the clearest possible signal that at-most-once behavior is happening somewhere
          it should not be — usually an unhandled send failure, a producer using <code>acks=0</code> on data
          that needed stronger durability, or a consumer silently dropping records it fails to parse instead
          of routing them to a dead-letter topic.
        </Para>
        <CodeBox label="a minimal loss-detection reconciliation, conceptually">
{`producer emits a metric: events_sent_total (incremented only inside a
  successful delivery callback, never optimistically before send())

consumer emits a metric: events_processed_total (incremented only after
  a record's side effect has durably succeeded)

alert if:
  events_sent_total(window) - events_processed_total(window) > expected_lag_tolerance
  # a small, bounded gap is normal (in-flight processing lag);
  # a gap that keeps growing, or never closes, points to real loss`}
        </CodeBox>
        <SubTitle>Detecting duplication</SubTitle>
        <Para>
          Duplication is often easier to catch than loss, precisely because at-least-once systems are
          expected to produce some duplicates under specific failure conditions — the question is whether the
          rate is bounded and explainable, or unbounded and silently corrupting downstream state. For a topic
          with a stable business key, counting distinct keys processed versus total records processed over a
          window gives a direct duplication rate; a consumer relying on the dedup or upsert patterns from Part
          06 should also emit a metric specifically for how often the dedup check actually caught something,
          since a dedup path that never fires might mean duplicates genuinely aren't happening, or might mean
          the dedup logic itself is broken and silently letting everything through.
        </Para>
        <Table
          headers={['Signal', 'What it measures', 'What an anomaly suggests']}
          rows={[
            ['sent count vs. processed count gap', 'Records the producer believes succeeded vs. records the consumer believes it finished.', 'A persistent, growing gap suggests loss somewhere between send and durable processing.'],
            ['distinct keys vs. total records ratio', 'How many logically distinct events are hiding behind a larger raw record count.', 'A ratio far from 1:1 where it should be close suggests unexpected duplication.'],
            ['dedup-hit rate', 'How often a consumer\'s own idempotency check actually rejects a repeat.', 'A rate of exactly zero over a long window is suspicious — either duplicates truly never happen (verify independently) or the dedup check is silently broken.'],
            ['dead-letter topic volume', 'Records a consumer could not process and routed aside instead of silently dropping.', 'A rising trend often points to a schema mismatch or an upstream data-quality regression, not a delivery-semantics bug per se — but it is the alternative to silent at-most-once loss.'],
          ]}
        />
        <Callout title="A dead-letter topic is what makes at-least-once honest" color="#38bdf8">
          A consumer that cannot process a record should never simply drop it and move on — that reintroduces
          at-most-once behavior by accident, inside a pipeline that was designed to be at-least-once. Routing
          unprocessable records to a dead-letter topic (with enough context to debug and reprocess them later)
          keeps the delivery guarantee intact while still letting the main pipeline make forward progress past
          a single bad record.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Ordering interacts with delivery semantics" />
        <SectionTitle>A Duplicate or a Retry Can Also Reorder Records If You Are Not Careful</SectionTitle>
        <Para>
          Delivery semantics are usually discussed purely in terms of loss and duplication, but a closely
          related failure mode rides along with retries: reordering. If a producer has more than one request
          in flight to the same partition at once, and an earlier request needs to be retried while a later
          one already succeeded, the retried (earlier) record can land after the (later) one that originally
          succeeded first — even though nothing about acks or idempotence was misconfigured.
        </Para>
        <CodeBox label="reordering from concurrent in-flight requests, without idempotence protecting against it">
{`max.in.flight.requests.per.connection = 5   (default before idempotence became default-on)
enable.idempotence = false

producer sends batch A (records 1-3), batch B (records 4-6) -- both in flight at once
batch A's first attempt times out on the network (but the broker DID receive it)
batch B succeeds immediately, writes records 4-6
batch A is retried, succeeds on retry, writes records 1-3 -- AFTER records 4-6

partition ends up with: [4, 5, 6, 1, 2, 3] instead of [1, 2, 3, 4, 5, 6]
-- this is a reordering bug, not a loss or duplication bug, but it can be
   just as damaging for any consumer relying on per-key event ordering`}
        </CodeBox>
        <Para>
          The idempotent producer (Part 03) closes this gap as a side effect of the same sequence-number
          mechanism that prevents duplication: when idempotence is enabled, the broker also uses those
          sequence numbers to detect and reject out-of-order batches, forcing the producer to resend them in
          the correct order rather than silently accepting a batch that arrived out of sequence. This is one
          of the reasons <code>enable.idempotence=true</code> is now the client default rather than an opt-in
          setting — it fixes both duplication and a class of reordering bugs with the same underlying
          mechanism, at negligible cost.
        </Para>
        <Table
          headers={['Configuration', 'Reordering risk on retry']}
          rows={[
            ['enable.idempotence=false, max.in.flight > 1', 'Real risk — a retried earlier batch can land after a later batch that succeeded first, exactly as shown above.'],
            ['enable.idempotence=false, max.in.flight = 1', 'No reordering, but a much lower ceiling on throughput since only one request can be outstanding to a partition at a time.'],
            ['enable.idempotence=true, max.in.flight up to 5', 'No reordering — the broker enforces correct sequence ordering per (PID, partition), safe at higher concurrency.'],
          ]}
        />
        <Callout title="Ordering, loss, and duplication are three separate properties" color={K}>
          It is worth keeping these three properties mentally distinct even though the same settings often
          affect more than one at once: whether a message can be lost, whether it can be duplicated, and
          whether the order two messages were sent in can be inverted on the way to the log. A pipeline can
          get one right while getting another wrong — the idempotent producer happens to fix both duplication
          and this specific reordering case together, but that is a property of Kafka's specific mechanism,
          not a general rule that any fix for one automatically fixes the others.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Delivery semantics in Kafka Streams and ksqlDB" />
        <SectionTitle>Stream Processing Frameworks Build on the Same Primitives, Not a New Guarantee</SectionTitle>
        <Para>
          Kafka Streams (and stream-processing layers built on top of it, like ksqlDB) advertise
          "exactly-once processing" as a configuration flag —
          <code> processing.guarantee=exactly_once_v2</code> — which can make it sound like a fundamentally
          different, stronger guarantee than anything covered in this module. It is not. Under the hood,
          Kafka Streams' exactly-once mode is implemented using exactly the transactional producer mechanics
          from Part 04: every state update and every output record a stream task produces is wrapped in a
          Kafka transaction, atomic with the consumer offset commit for the input record that triggered it.
        </Para>
        <CodeBox label="what exactly_once_v2 actually wraps in a transaction">
{`processing.guarantee = exactly_once_v2

for each input record consumed by a stream task:
  begin transaction
    update local state store (if the topology is stateful, e.g. an aggregation)
    write the state store's changelog topic update
    produce any output records to downstream topics
    commit the input topic's offset
  commit transaction
  # all of the above becomes visible together, or none of it does --
  # this is Part 04's read-process-write atomicity, applied automatically
  # by the Streams runtime instead of hand-written by application code`}
        </CodeBox>
        <Para>
          The same Part 05 boundary still applies: if a Kafka Streams topology's final step calls out to an
          external system — writes to a database via a custom sink, calls a third-party API inside a
          <code>Processor</code> — that call is not covered by <code>exactly_once_v2</code>'s transactional
          guarantee, for exactly the same reason a hand-written transactional producer's guarantee stops at
          Kafka's boundary. Kafka Connect sink connectors (a common way data leaves a Streams topology) handle
          this with their own connector-specific idempotency strategies, which is a detail worth checking
          per-connector rather than assuming automatically inherits Streams' internal guarantee.
        </Para>
        <Table
          headers={['Configuration', 'What it actually guarantees', 'What it does not reach']}
          rows={[
            ['processing.guarantee=at_least_once (default in older versions)', 'Records are never lost, but reprocessing after a failure can produce duplicate state updates or output records.', 'Any external side effect the topology triggers, same as at-least-once anywhere else.'],
            ['processing.guarantee=exactly_once_v2', 'State store updates, changelog writes, downstream produces, and the input offset commit are all atomic together, using Kafka transactions under the hood.', 'External sinks and side effects outside the Kafka transaction boundary — same limitation as Part 05, just automated for the Kafka-internal part.'],
          ]}
        />
        <Callout title="Framework guarantees are a convenience layer, not a different physics" color={K}>
          It is worth internalizing this pattern generally: any framework or library that advertises
          "exactly-once" on top of Kafka is, underneath, composing the same idempotent-producer and
          transaction primitives covered in Part 03 and Part 04, applied automatically instead of by hand.
          Understanding those primitives directly is what lets you correctly reason about where a framework's
          guarantee actually ends, rather than trusting the label at face value.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Testing delivery semantics before production finds the bug for you" />
        <SectionTitle>Chaos-Style Failure Injection Is the Only Reliable Way to Verify a Semantics Choice</SectionTitle>
        <Para>
          Everything this module has covered so far is a design and a mental model. None of it substitutes
          for actually verifying, before shipping, that a pipeline behaves the way its delivery-semantics
          design claims it does under the specific failure conditions that matter — a producer retry, a
          consumer crash mid-batch, a broker restart during an in-flight transaction. Code review can confirm
          a design intends to be at-least-once with idempotent handling; only forcing the actual failure and
          observing the result confirms it really is.
        </Para>
        <SubTitle>A minimal test matrix worth running before trusting a pipeline's semantics</SubTitle>
        <BulletList
          items={[
            'Kill the consumer process mid-batch, after some records in the current poll() have been processed but before the offset commit — confirm the expected records are reprocessed, and confirm the idempotency mechanism (Part 06) actually prevents a duplicate side effect on replay.',
            'Kill the producer process after a send() call returns but before its delivery callback fires — confirm the application-level retry or restart behavior does not silently drop the in-flight record.',
            'Introduce a network partition between the producer and the current partition leader mid-write, then heal it — confirm the producer\'s retry-and-refresh-metadata behavior (from the producers module) resumes correctly rather than stalling or duplicating.',
            'For a transactional pipeline, kill the producer process between beginTransaction() and commitTransaction() — confirm the transaction is correctly aborted, that read_committed consumers never see the partial writes, and that the input offset was not advanced.',
            'Deliberately replay a batch of already-processed records from an earlier offset — confirm the consumer\'s dedup or upsert logic produces the same final state as processing them once, not a corrupted or doubled one.',
          ]}
        />
        <CodeBox label="a duplicate-replay test, the simplest and highest-value one to automate">
{`# the single most valuable automated test for at-least-once + idempotency:
# process the same batch of records TWICE, back to back, and assert
# the observable end state after the second run is identical to the
# end state after the first run

def test_replay_is_idempotent():
    records = load_fixture_batch("orders_batch_1.json")

    process_batch(records)
    state_after_first_run = snapshot_downstream_state()

    process_batch(records)  # exact same records, simulating a Kafka replay
    state_after_second_run = snapshot_downstream_state()

    assert state_after_first_run == state_after_second_run
    # if this fails, the consumer's idempotency claim is false --
    # better to find out here than from a duplicate-charge incident`}
        </CodeBox>
        <Callout title="This test belongs in CI, not just in a manual chaos-day exercise" color="#22c55e">
          The replay-idempotency test above is cheap enough to run in an ordinary CI pipeline on every change
          to consumer processing logic — it does not require a real Kafka cluster or actual broker failure
          injection, only replaying the same fixture data twice and comparing the resulting state. Reserve
          the heavier chaos-style tests (actual process kills, actual network partitions) for a periodic,
          deliberate exercise against a staging environment, but keep the idempotency assertion itself running
          continuously, since it is exactly the property Part 07's duplicate-charge bug violated.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — A decision checklist to run before shipping a new topic" />
        <SectionTitle>Turning This Module Into a Repeatable Checklist</SectionTitle>
        <Para>
          Every concept in this module ultimately exists to answer one practical question a team faces when
          standing up a new producer or consumer: what should actually be configured, and why. Rather than
          re-deriving the reasoning from scratch each time, it helps to have a short, concrete checklist to
          run through before a new topic's producers and consumers go to production.
        </Para>
        <BulletList
          items={[
            'What is the real cost of losing one record on this topic, stated concretely rather than in the abstract — a support ticket, a wrong dashboard number, a missed payment? This determines whether at-most-once is even on the table (Part 08).',
            'What is the real cost of processing one record twice? If genuinely zero, plain at-least-once with no dedup logic is the right, simplest answer — do not build idempotency machinery a workload does not need.',
            'Is enable.idempotence=true set on every producer for this topic? There is essentially no reason it should not be, regardless of which broader semantics the workload needs (Part 03, Part 08).',
            'Does the consumer\'s side effect leave Kafka entirely (a database write, an external API call)? If so, Kafka transactions cannot reach it, and the plan needs an explicit idempotency mechanism from Part 06 — a dedup key, an upsert, or an idempotency key passed to the external system.',
            'Does the pipeline stay entirely inside Kafka (topic to topic, no external side effect)? If so, Kafka transactions (Part 04) are usually worth their added latency for the correctness they buy.',
            'Is there a dead-letter topic (or equivalent) so an unprocessable record gets set aside instead of silently dropped, which would quietly reintroduce at-most-once behavior into an at-least-once design (Part 09)?',
            'Is there a metric or reconciliation check that would actually surface silent loss or unexpected duplication, rather than relying on nobody noticing (Part 09)?',
            'Has the idempotency claim actually been tested by replaying the same batch of records twice and comparing the resulting state, not just asserted in a design doc (Part 12)?',
          ]}
        />
        <CodeBox label="the checklist as a short pre-launch review template">
{`## Delivery semantics review — <topic-name>

Cost of losing a record:      <concrete description>
Cost of duplicating a record: <concrete description>
Chosen semantics:              [ ] at-most-once  [ ] at-least-once  [ ] transactional exactly-once
enable.idempotence=true?       [ ] yes  [ ] no -- justify:
External side effect present?  [ ] yes -- idempotency mechanism: _______
                                [ ] no  -- entire pipeline stays in Kafka
Dead-letter topic configured?  [ ] yes  [ ] no -- justify:
Loss/duplication monitoring?   [ ] yes, via: _______  [ ] no -- justify:
Idempotency replay-tested?     [ ] yes  [ ] no -- schedule:`}
        </CodeBox>
        <Callout title="A checklist forces the decision to be explicit, not defaulted" color="#22c55e">
          The value of running through this list is not that any single item is complicated on its own — it
          is that skipping the exercise entirely is how teams end up with a topic's delivery semantics decided
          by accident, as whatever the client library's defaults happened to be, rather than as a deliberate
          choice matched to what that specific data actually needs. Five minutes filling in a checklist like
          this before launch is far cheaper than tracing a duplicate-charge incident back to an unexamined
          default months later.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Idempotence and transactions cost something real" />
        <SectionTitle>None of This Is Free — Weigh the Overhead Honestly Against the Guarantee</SectionTitle>
        <Para>
          It would be easy to close this module concluding that idempotent producers and transactions should
          simply always be on, everywhere, since Part 03 already noted idempotence has essentially no
          downside. Idempotence really is close to free. Transactions are a different story, and treating
          them as a costless upgrade over at-least-once leads to teams reaching for them on workloads where
          the overhead is not worth what it buys.
        </Para>
        <SubTitle>Where the overhead actually comes from</SubTitle>
        <Para>
          A transactional producer pays a coordination cost on every <code>commitTransaction()</code> call —
          a round trip to the transaction coordinator broker to record the commit marker, on top of the
          normal write path. A <code>read_committed</code> consumer pays a latency cost too: it must withhold
          records belonging to an open transaction until that transaction resolves, which means a
          slow-committing producer directly adds latency to every downstream consumer waiting on
          <code> read_committed</code> visibility, not just to the producer's own throughput.
        </Para>
        <Table
          headers={['Mechanism', 'Overhead', 'Worth it when']}
          rows={[
            ['Idempotent producer (enable.idempotence=true)', 'Negligible — a small header per batch, a sequence-number check on the broker.', 'Almost always — there is little reason to leave this off on a modern producer.'],
            ['Kafka transactions', 'Real — coordinator round trips per commit, added latency for read_committed consumers waiting on transaction resolution, more moving parts to monitor and reason about on failure.', 'A read-process-write pipeline that stays entirely inside Kafka, where atomicity across the write and the offset commit is a genuine correctness requirement, not just a nice-to-have.'],
            ['Consumer-side dedup table or upsert logic', 'A database write or lookup added to the processing path, plus the ongoing cost of retaining and maintaining the dedup table (Part 06\'s error-library entry on unbounded growth).', 'Any workload with an external side effect where duplication has a real cost — most business-critical pipelines with a side effect outside Kafka.'],
          ]}
        />
        <Para>
          The practical implication is that a pipeline should not reach for full Kafka transactions just
          because it technically could, if the pipeline's real bottleneck to correctness is an external side
          effect that transactions cannot reach anyway (Part 05). In that case, the transactional overhead is
          paid without buying the guarantee that actually matters for the workload — consumer-side
          idempotency on the external call is both cheaper and the thing that actually closes the gap.
        </Para>
        <Callout title="Measure the added latency before committing to transactions at scale" color="#f59e0b">
          Before adopting transactions broadly across a high-throughput pipeline, benchmark the actual latency
          impact under realistic load — the added coordination overhead is usually a fixed cost per
          transaction, which means batching more work into fewer, larger transactions (rather than one
          transaction per individual record) is often the difference between transactions being a rounding
          error and transactions becoming the dominant latency cost in the pipeline.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — A summary table worth keeping close by" />
        <SectionTitle>The Whole Module, Condensed Into One Reference</SectionTitle>
        <Para>
          Every mechanism covered above answers a specific question about what happens to a message under
          failure. It helps to have all of them side by side, as a single reference to check against when a
          new pipeline's requirements are being scoped out, rather than needing to re-read the full module
          each time.
        </Para>
        <Table
          headers={['Question', 'Where it is answered', 'The short answer']}
          rows={[
            ['Can a message be silently lost?', 'Part 01, Part 02', 'Only under at-most-once — a producer that does not retry on failure, or a consumer that commits before processing.'],
            ['Can a message be duplicated?', 'Part 01, Part 02', 'Yes, under at-least-once, unless the duplication\'s effect is absorbed by idempotent handling.'],
            ['How does Kafka prevent a retried write from duplicating?', 'Part 03', 'Producer ID plus per-partition sequence numbers, tracked by the broker, deduplicating within one producer session.'],
            ['How does Kafka make a multi-topic read-process-write cycle atomic?', 'Part 04', 'Transactions — beginTransaction/sendOffsetsToTransaction/commitTransaction, paired with isolation.level=read_committed downstream.'],
            ['Does exactly-once reach an external database or API call?', 'Part 05', 'No — Kafka\'s guarantee stops at Kafka\'s own boundary; the external call needs its own idempotency mechanism.'],
            ['How do you make an external side effect idempotent without transactions?', 'Part 06', 'Dedup by a stable business key, or an upsert that sets an absolute value rather than a relative change.'],
            ['How do you pick the right semantics for a given workload?', 'Part 08', 'Weigh the real cost of loss against the real cost of duplication for that specific data, honestly, not by copying another topic\'s defaults.'],
            ['How do you know loss or duplication is actually happening in production?', 'Part 09', 'Sent-vs-processed count reconciliation, dedup-hit rate, and a dead-letter topic instead of silent drops.'],
            ['Can retries reorder messages even without loss or duplication?', 'Part 10', 'Yes, without idempotence enabled and multiple in-flight requests — idempotent producer fixes this too.'],
            ['Does Kafka Streams\' exactly_once_v2 add a new guarantee?', 'Part 11', 'No — it automates the same transactional mechanics from Part 04, with the same external-boundary limitation from Part 05.'],
            ['How do you verify an idempotency claim is actually true?', 'Part 12', 'Replay the same batch of records twice and assert the resulting state is identical — automate this in CI.'],
          ]}
        />
        <Callout title="Keep this table, forget the rest if you must" color={K}>
          If only one part of this module survives in memory a year from now, this table is the one worth
          keeping — it is the practical index back into everything else, and every row points to the specific
          mechanism, worked example, or failure mode that explains it in full.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Delivery Semantics</SectionTitle>
        {[
          {
            wrong: '"Setting enable.idempotence=true makes my whole pipeline exactly-once"',
            right: 'Part 03 and Part 05 are precise about the scope: the idempotent producer only deduplicates retried writes to a partition within one producer session. It says nothing about consumer processing or external side effects — end-to-end exactly-once needs transactions (Part 04) or consumer-side idempotency (Part 06) as well.',
          },
          {
            wrong: '"Exactly-once means Kafka guarantees my database will never have a duplicate row"',
            right: 'Part 05 draws this line directly: Kafka\'s transactional guarantee covers Kafka\'s own log and offset bookkeeping. Whether an external database write happens exactly once depends on whether that write is made idempotent on its own terms — Kafka has no visibility into a database\'s state.',
          },
          {
            wrong: '"At-least-once always means my consumer will process duplicates, so I always need dedup logic"',
            right: 'Part 08 is explicit that this depends on the workload. At-least-once genuinely does risk duplicates, but for data where a duplicate is harmless — most metrics and analytics events — building dedup machinery is unnecessary cost, not a required step.',
          },
          {
            wrong: '"Kafka transactions make my call to an external payment API atomic with the Kafka write"',
            right: 'Part 04 and Part 07\'s worked example show this is false — a transaction is atomic across participating Kafka topics and offset commits. An external API call sits outside that boundary entirely and needs its own idempotency mechanism, such as an idempotency key.',
          },
          {
            wrong: '"At-most-once is just a faster version of at-least-once, with a small tradeoff"',
            right: 'Part 01 and Part 02 frame this as a fundamentally different promise, not a speed dial: at-most-once can silently lose data with no signal that anything went wrong, which is categorically different from at-least-once\'s bounded, detectable risk of duplication.',
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
            <strong>At Plaid,</strong> a team building a transaction-categorization pipeline discovers during
            a load test that restarting the categorization service mid-run produces a small number of
            duplicate category-assignment writes to their downstream database. The consumer was using
            at-least-once delivery with no consumer-side idempotency — a defensible choice for many
            workloads, but not for one writing financial transaction metadata that other services trust as
            authoritative. The fix is not to chase exactly-once through Kafka transactions, since the actual
            side effect is a database write outside Kafka entirely; it is adding a dedup table keyed on
            transaction ID, per Part 06's Pattern 1, so a reprocessed record becomes a safe no-op instead of a
            duplicate row.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Shopify,</strong> a checkout team designs a strictly Kafka-to-Kafka pipeline: an
            order-validation service reads from <code>orders.submitted</code>, enriches each order with
            inventory and tax data, and writes to <code>orders.validated</code>, which downstream fulfillment
            services consume. Because this entire pipeline never leaves Kafka — no external database write, no
            API call — the team reaches for full Kafka transactions exactly as described in Part 04: the
            enrichment write and the input offset commit happen atomically, and every downstream consumer sets
            <code> isolation.level=read_committed</code>. This is the one case in the whole system where true
            exactly-once, not just effectively-once, is both achievable and worth the added transactional
            latency.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview,</strong> a candidate is asked to design an event pipeline
            for a ride-hailing app's fare-charging flow and says "I'll just turn on exactly-once semantics for
            the whole thing." The interviewer presses: "the charge happens through a third-party payment
            processor's REST API — how does Kafka's exactly-once semantics reach that call?" The strong answer
            recognizes, per Part 05, that it does not — Kafka's transactional guarantee stops at Kafka's own
            boundary, and the actual fix for the fare-charging call is at-least-once delivery combined with an
            idempotency key derived from the ride ID, sent to the payment processor's API, exactly as worked
            through in Part 07.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Define at-most-once, at-least-once, and exactly-once precisely, and explain what mechanism in Kafka produces each one.',
            a: `At-most-once means a message may be delivered zero or one times — never duplicated, but sometimes silently lost. It comes from a producer that doesn't wait for or retry on acknowledgement failure, or a consumer that commits its offset before finishing processing, per Part 02.

At-least-once means a message is delivered one or more times — never lost, but sometimes duplicated. It comes from a producer that retries until acknowledged, combined with a consumer that commits its offset only after processing succeeds.

Exactly-once, more honestly called effectively-once (Part 05), means the message's effect is applied exactly once as observed by whoever consumes the result. Kafka provides this at the transport layer through two mechanisms: the idempotent producer (Part 03), which uses per-partition sequence numbers to let the broker discard a retried write it already committed, and transactions (Part 04), which make a read-process-write cycle across topics atomic using a transaction coordinator and read_committed isolation. Neither mechanism reaches an external side effect outside Kafka — that requires consumer-side idempotency as covered in Part 06.`,
          },
          {
            q: 'Q2. Walk through exactly how Kafka\'s idempotent producer prevents duplicate writes, including its actual limitations.',
            a: `When enable.idempotence=true, the broker assigns the producer a Producer ID (PID) at session start. Every batch the producer sends to a given partition carries a sequence number, monotonically increasing and scoped to that (PID, partition) pair. The partition leader tracks the last sequence number it successfully wrote for each PID; if a new batch's sequence number has already been written, the broker discards it silently and still returns a success acknowledgement — the producer never learns a duplicate was thrown away.

The precision that matters for an interview is the scope of this guarantee. It only deduplicates within one producer session, against one partition, and only within a small window of recent sequence numbers the broker retains — not an unbounded history. If the producer process crashes and restarts, it gets a new PID with no relationship to the old one, so any message sent-but-unconfirmed by the old instance can be resent by the new instance as an undeduplicated write. So idempotent producer solves retry-induced duplication within a live session; it does not solve producer-crash-and-restart duplication on its own.`,
          },
          {
            q: 'Q3. What does a Kafka transaction actually make atomic, and what does the isolation.level=read_committed setting on the consumer accomplish?',
            a: `A Kafka transaction, per Part 04, makes a set of writes across one or more partitions or topics atomic together with a consumer offset commit — typically a read-process-write cycle: consume from topic A, produce a result to topic B, and commit the offset on topic A, all wrapped in beginTransaction()/commitTransaction() with the offset commit going through sendOffsetsToTransaction() rather than the consumer's normal commit path. Either everything in the transaction becomes visible, or none of it does, enforced by a transaction coordinator broker doing something like a two-phase commit across the participating partitions.

isolation.level=read_committed on the consumer is the other required half. Without it, a consumer would see writes from transactions that are still open or that later abort — partial, thrown-away work becoming visible. With read_committed, the broker withholds any record belonging to an uncommitted or aborted transaction from that consumer entirely, so it only ever sees the results of transactions that actually committed. Both halves are required together: a transactional producer with a read_uncommitted consumer downstream defeats the purpose, because that consumer would see uncommitted writes anyway.`,
          },
          {
            q: 'Q4. A teammate says "we enabled Kafka transactions, so our payment processing is now exactly-once." Is that accurate? Why or why not?',
            a: `Not necessarily, and this is exactly the kind of overclaim worth catching, per Part 05 and Part 07. Kafka transactions make Kafka-to-Kafka operations atomic — writes across topics plus an offset commit. If "payment processing" means calling an external payment gateway's REST API, that call sits entirely outside the transaction boundary. Kafka has no way to include a third-party HTTP call in its two-phase commit, so the payment call can still happen twice if the consumer crashes and reprocesses the record, transaction or no transaction.

The accurate claim is narrower: if the payment-processing pipeline's actual work — validating, enriching, computing a final charge amount — happens entirely within Kafka (reading one topic, writing another), transactions make that internal pipeline exactly-once. The moment an external side effect like an actual charge API call is involved, you need a separate mechanism — an idempotency key sent to the payment API, keyed on something stable like the authorization ID, exactly as worked through in Part 07's duplicate-charge example — regardless of whether Kafka transactions are also in use elsewhere in the pipeline.`,
          },
          {
            q: 'Q5. How would you decide, for a new topic, whether it needs at-most-once, at-least-once with idempotency, or full exactly-once via transactions?',
            a: `I'd start from the business cost of loss versus the business cost of duplication for that specific data, per Part 08, rather than defaulting to whatever semantics the last topic used. If losing an occasional record is truly inconsequential — a subset of clickstream or debug telemetry — at-most-once or plain at-least-once without dedup logic is the simplest, cheapest choice, and building idempotency machinery for it would be solving a problem that doesn't exist.

If the data has real consequence when lost — order state, inventory, financial records — loss is off the table, so it's at-least-once at minimum. The next question is whether the pipeline stays entirely inside Kafka. If it consumes from one topic and produces to another with no external side effect, Kafka transactions give a real, mechanically enforced exactly-once guarantee and are usually worth the added coordination latency for that level of correctness. If the pipeline's real work is an external side effect — a database write, an API call — transactions can't reach it, so the answer is at-least-once delivery plus making that specific side effect idempotent: a dedup table keyed on a stable business key, an upsert for current-state writes, or an idempotency key passed to an external API, chosen based on which pattern actually fits the side effect's shape, per Part 06.`,
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
            q: 'Treating enable.idempotence=true as an end-to-end exactly-once guarantee',
            a: 'Part 03 and Part 05 are precise: idempotent producer only deduplicates retries within one producer session against one partition. It says nothing about consumer processing or external side effects, which need transactions or consumer-side idempotency separately.',
          },
          {
            q: 'Assuming Kafka transactions cover a call to an external API or database',
            a: 'Part 04 and Part 07 show this directly: transactions are atomic across Kafka topics and offset commits, not across an external system. A payment API call or database write outside Kafka needs its own idempotency mechanism regardless of whether transactions are used elsewhere in the pipeline.',
          },
          {
            q: 'Building consumer-side dedup logic for data where duplication is genuinely harmless',
            a: 'Part 08 is explicit that this is a cost-benefit decision, not a default. Adding dedup tables and idempotency keys to a clickstream or metrics pipeline where an occasional duplicate is statistically invisible is unnecessary engineering effort solving a non-problem.',
          },
          {
            q: 'Using an increment or decrement as the idempotent operation instead of an upsert',
            a: 'Part 06\'s Pattern 2 is explicit about this distinction: an upsert that sets an absolute value is safe to replay, but an increment or decrement is not — replaying it double-applies the change, which is exactly the trap in the "unsafe" example shown there.',
          },
          {
            q: 'Generating a fresh idempotency key on every processing attempt instead of deriving it from a stable field on the event',
            a: 'Part 07\'s fixed example makes this explicit: an idempotency key must be derived from something stable across retries, like the record\'s own authorization ID, not generated fresh each time a record is reprocessed — a freshly generated key on retry defeats the entire purpose of the idempotency mechanism.',
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
            error: 'OutOfOrderSequenceException raised by the idempotent producer',
            cause: 'Per Part 03, the broker tracks a small window of recent sequence numbers per (PID, partition). If a batch arrives with a sequence number outside that window — often because a much earlier retry finally lands very late, or the producer\'s internal batching state got corrupted — the broker cannot safely determine whether it is a duplicate or a gap, and rejects it rather than guessing.',
            fix: 'This usually indicates the producer needs to be restarted, which issues it a fresh PID and sequence state, or points to a deeper issue with excessively long retry delays relative to max.in.flight.requests.per.connection. Investigate producer-side retry and timeout settings rather than treating this as a transient error to blindly retry past.',
          },
          {
            error: 'ProducerFencedException raised when calling beginTransaction() or commitTransaction()',
            cause: 'Per Part 04, initTransactions() fences off any earlier producer instance using the same transactional.id — this is intentional, to prevent a zombie instance of the same logical producer (for example, a previous deploy that hasn\'t fully shut down) from committing conflicting writes. This exception means a newer instance with the same transactional.id has since taken over.',
            fix: 'This is usually a sign of an overlapping deploy where the old and new instance of a service were briefly both alive with the same transactional.id. The fenced-out instance should shut down cleanly rather than retry — retrying will keep failing, since the fencing is permanent for that producer instance\'s epoch.',
          },
          {
            error: 'A consumer downstream of a transactional producer never sees any records, even though the producer reports successful sends',
            cause: 'The consumer is using isolation.level=read_committed (correctly, per Part 04) but the producer\'s transactions are never actually being committed — perhaps commitTransaction() is failing silently, or the producer code path always hits abortTransaction() due to an unrelated bug. Uncommitted or aborted transaction writes are invisible to read_committed consumers by design.',
            fix: 'Check the producer\'s transaction commit path directly rather than assuming a consumer bug — log every commitTransaction() and abortTransaction() call with its outcome. A read_committed consumer showing zero records is a strong, specific signal to look at producer-side transaction health first.',
          },
          {
            error: 'A dedup table used for consumer-side idempotency grows without bound and starts slowing down lookups',
            cause: 'Part 06\'s Pattern 1 dedup table is often implemented without a retention or archival strategy, on the assumption that "we\'ll deal with cleanup later." Every processed record adds a permanent row, and lookup performance degrades as the table grows into the hundreds of millions of rows.',
            fix: 'Add a retention policy to the dedup table matched to how long a duplicate could realistically arrive — often bounded by the source topic\'s own retention period, since a record older than that can\'t be redelivered from Kafka anyway. Partition or periodically archive old rows rather than letting the table grow unbounded.',
          },
          {
            error: 'A customer is charged twice despite the team believing they had "exactly-once" delivery configured',
            cause: 'Per Part 05 and Part 07, this is almost always the effectively-once boundary being crossed silently: Kafka transactions or idempotent producer were correctly configured for the Kafka-internal part of the pipeline, but the actual charge call to an external payment API had no idempotency key or other dedup mechanism of its own, so a Kafka-level retry or reprocessing event turned into a second real-world charge.',
            fix: 'Audit every external side effect in the pipeline separately from the Kafka configuration — Kafka being configured correctly does not imply the external call is safe to retry. Add an idempotency key derived from a stable event field to every external API call that has a real-world effect, per Part 06 and Part 07\'s worked fix.',
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
          'At-most-once can silently lose data but never duplicates it; at-least-once never loses data but can duplicate it; exactly-once (more honestly, effectively-once) aims for neither, as observed by the consumer.',
          'The idempotent producer (enable.idempotence=true) uses a Producer ID and per-partition sequence numbers to let the broker discard retried writes it already committed — but only within one producer session, against one partition.',
          'Kafka transactions make a read-process-write cycle across topics atomic with the consumer offset commit, using initTransactions/beginTransaction/sendOffsetsToTransaction/commitTransaction, paired with isolation.level=read_committed on downstream consumers.',
          'Kafka\'s exactly-once guarantees stop at Kafka\'s own boundary — an external side effect like a database write or an API call needs its own idempotency mechanism, since Kafka cannot make an outside system idempotent on your behalf.',
          'Consumer-side idempotency without transactions usually means one of two patterns: dedup by a stable business key backed by a unique constraint, or an upsert that sets an absolute value rather than applying a relative change like an increment.',
          'Choosing delivery semantics is a business decision weighing the real cost of loss against the real cost of duplication for that specific data — not a performance setting to copy from another topic without re-evaluating.',
        ]}
      />
    </LearnLayout>
  )
}
