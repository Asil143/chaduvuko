import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Change Data Capture (CDC) — Deep Dive — Data Engineering | Chaduvuko',
  description:
    'CDC from first principles — WAL internals, Debezium architecture, Schema Registry, the Outbox Pattern, event ordering guarantees, schema evolution handling, and operating CDC in production.',
}

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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
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

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
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

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

export default function CDCModule() {
  return (
    <LearnLayout
      title="Change Data Capture (CDC) — Deep Dive"
      description="WAL internals, Debezium architecture, Schema Registry, the Outbox Pattern, event ordering, and operating CDC in production."
      section="Data Engineering — Module 24"
      readTime="70 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — What CDC Actually Is ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What CDC Actually Is" />
        <SectionTitle>CDC From First Principles</SectionTitle>

        <Para>
          Module 23 introduced CDC as one of three ingestion patterns. This module
          goes much deeper — the internal mechanics of the WAL, how Debezium turns
          binary log records into structured events, the Schema Registry contract
          that prevents breaking changes, the Outbox Pattern that solves dual-write
          consistency, event ordering guarantees and their limits, and what it
          actually takes to operate CDC reliably in production.
        </Para>

        <Para>
          CDC is the most powerful and most complex ingestion pattern. It is powerful
          because it captures <em>everything</em> the database does — with no
          polling delay, no missed deletes, and the before-image of every changed
          row available for audit and historical analysis. It is complex because it
          introduces infrastructure (Kafka, Debezium, Schema Registry), operational
          requirements (WAL configuration, replication slot monitoring), and
          correctness challenges (event ordering, at-least-once delivery, schema
          evolution) that query-based ingestion patterns do not have.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Eight topics this module covers in depth
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'WAL internals', desc: 'What the WAL is, how logical replication works, LSN tracking.' },
              { num: '02', name: 'Debezium architecture', desc: 'Connector lifecycle, snapshot modes, event structure.' },
              { num: '03', name: 'Schema Registry', desc: 'Why it exists, Avro schemas, compatibility modes.' },
              { num: '04', name: 'Outbox Pattern', desc: 'Solving dual-write with transactional outbox.' },
              { num: '05', name: 'Event ordering', desc: 'What CDC guarantees and where ordering breaks down.' },
              { num: '06', name: 'Schema evolution', desc: 'How CDC handles DDL changes mid-stream.' },
              { num: '07', name: 'CDC for analytics', desc: 'Landing CDC events in a data lake efficiently.' },
              { num: '08', name: 'Production operations', desc: 'Monitoring, slot lag, failure recovery, scaling.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <TryThis>
          Before reading further, try to answer from Module 23 alone: what does
          CDC capture that a nightly incremental job on <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated_at</code> cannot?
          Keep that answer in mind through Part 06 (ordering) and Part 10&rsquo;s
          Real World case — it&rsquo;s the same gap, seen from two different angles.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — WAL Internals ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — WAL Internals" />
        <SectionTitle>The Write-Ahead Log — What It Is and How CDC Reads It</SectionTitle>

        <Para>
          The Write-Ahead Log is PostgreSQL&rsquo;s durability guarantee. Every change
          to the database is recorded in the WAL <em>before</em> the actual data
          pages are modified. On a crash, PostgreSQL replays the WAL from the last
          checkpoint to recover all committed transactions. The WAL is an ordered,
          append-only, sequential log of every database operation — it is the
          authoritative record of everything the database has done.
        </Para>

        <Para>
          CDC leverages the WAL not for crash recovery but for change streaming.
          Because the WAL already records every INSERT, UPDATE, and DELETE in
          precise order, it is the perfect source for a change stream. The challenge
          is reading it: the WAL is in a binary format designed for internal database
          use, not for external consumption. PostgreSQL&rsquo;s logical replication feature
          solves this by decoding the WAL into a structured, readable format.
        </Para>

        <SubSubTitle>The three WAL levels</SubSubTitle>

        <CodeBox label="Only one WAL level is usable for CDC">{`MINIMAL:
  Records only what is needed for crash recovery.
  Does NOT record enough information for logical decoding. Cannot be used for CDC.
  This is the default in older PostgreSQL versions.

REPLICA:
  Records enough for physical replication (exact byte-for-byte copy).
  Still does NOT record enough for logical decoding. Used for standby
  replicas, not CDC.

LOGICAL:
  Records full before and after images of changed rows. Includes enough
  information for logical decoding — exactly what CDC needs.
  Required for Debezium and any WAL-based CDC tool.
  Slight overhead: larger WAL files due to full row images.
  Setting: wal_level = logical  (requires PostgreSQL restart)

ADDITIONAL SETTINGS REQUIRED FOR CDC:
  max_replication_slots = 10  # how many logical replication consumers allowed
  max_wal_senders = 10        # parallel WAL streaming connections
  wal_sender_timeout = 60000  # ms — close idle WAL sender connections`}</CodeBox>

        <SubSubTitle>Logical decoding and the LSN</SubSubTitle>

        <CodeBox label="How Debezium connects, and the LSN that orders everything">{`HOW LOGICAL DECODING WORKS:
  PostgreSQL exposes two interfaces for logical decoding:
  1. pg_logical_slot_get_changes() — pull-based SQL function
  2. Streaming replication protocol — push-based (what Debezium uses)

  Debezium connects as a logical replication client over the replication
  protocol — exactly like a PostgreSQL standby would connect, but instead
  of applying the WAL to a replica database, it decodes it into events.

LOG SEQUENCE NUMBER (LSN):
  Every WAL record has an LSN — a monotonically increasing 64-bit integer
  representing its position in the WAL stream. Format: 0/1A3F2B8 (hex).
  Used for: tracking how far the consumer has read (confirmed_flush_lsn in
  the replication slot), ordering events (lower LSN = happened earlier),
  and resuming after failure (start reading from last confirmed LSN).

  Viewing current LSN and consumer lag:
    SELECT pg_current_wal_lsn();         -- where we are now
    SELECT pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) AS lag_bytes
    FROM pg_replication_slots
    WHERE slot_name = 'debezium_slot';   -- how far behind the consumer is`}</CodeBox>

        <SubSubTitle>What the WAL actually contains</SubSubTitle>

        <CodeBox label="A SQL statement, and the raw WAL records it produces">{`APPLICATION EXECUTES:
  BEGIN;
  UPDATE orders SET status = 'delivered', delivered_at = NOW()
  WHERE order_id = 9284751;
  COMMIT;

WAL RECORDS WRITTEN (binary, simplified representation):
  Record 1: XLOG_HEAP_UPDATE
    relation:    16423 (orders table OID)
    old_tuple:   [9284751, 'confirmed', NULL]
    new_tuple:   [9284751, 'delivered', '2026-03-17 20:14:32 UTC']
    lsn:         0/1A3F2B8
    xid:         847291             -- transaction ID

  Record 2: XLOG_XACT_COMMIT
    xid:         847291
    commit_time: 2026-03-17 20:14:32.847 UTC
    lsn:         0/1A3F2C4`}</CodeBox>

        <CodeBox label="How logical decoding turns that into a Debezium event">{`1. Debezium reads binary WAL records via the replication protocol
2. Applies the 'pgoutput' logical replication plugin (built into PostgreSQL)
3. pgoutput translates OIDs to table names, type-decodes raw bytes
4. Debezium wraps the decoded event in an envelope, published to Kafka:

{
  "payload": {
    "before": {"order_id": 9284751, "status": "confirmed", "delivered_at": null},
    "after":  {"order_id": 9284751, "status": "delivered",
               "delivered_at": 1710706472000000},  -- microseconds since epoch
    "source": {
      "connector": "postgresql", "name": "freshcart", "db": "freshcart_prod",
      "ts_ms": 1710706472847, "snapshot": "false",
      "sequence": "[\\"0/1A3F2B4\\",\\"0/1A3F2B8\\"]",  -- [lastCommittedLsn, lsn]
      "table": "orders", "txId": 847291, "lsn": 28434104
    },
    "op": "u",             -- u=update, c=create, d=delete, r=read/snapshot
    "ts_ms": 1710706472901  -- when Debezium processed this event
  }
}`}</CodeBox>

        <Output>{`KEY FIELDS FOR DATA ENGINEERS:
op:           the operation type
before:       row values BEFORE the change (null for inserts)
after:        row values AFTER the change (null for deletes)
source.lsn:   position in WAL — use for ordering and dedup
source.txId:  transaction ID — group multi-table ops from same txn
source.ts_ms: event time at source (commit time)
ts_ms:        processing time (when Debezium emitted to Kafka)`}</Output>
      </section>

      <Divider />

      {/* ── Part 03 — Debezium Architecture ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Debezium Architecture" />
        <SectionTitle>Debezium — Architecture and Lifecycle</SectionTitle>

        <Para>
          Debezium is a distributed platform for CDC built on top of Apache Kafka
          Connect. It provides production-ready connectors for PostgreSQL, MySQL,
          MongoDB, SQL Server, Oracle, and others. Understanding how Debezium
          works internally — not just how to configure it — is what lets you
          diagnose problems, tune performance, and design CDC pipelines that
          behave correctly under failure.
        </Para>

        <SubSubTitle>Component architecture</SubSubTitle>

        <CodeBox label="Source DB, Kafka Connect, Kafka, and consumers">{`SOURCE DB          KAFKA CONNECT           KAFKA              CONSUMERS
─────────────────────────────────────────────────────────────────────────
PostgreSQL    ←──  Debezium           →   Topic:             Spark
(primary)          PostgreSQL             freshcart.cdc       Streaming
                   Connector              .public.orders
                   (Kafka Connect         Topic:             Python
Replication  ←──   Worker process)   →   freshcart.cdc      Consumer
Slot                                      .public.customers
                   Schema Registry   →   Topic:             Flink
                   (sidecar)              freshcart.cdc
                                          .public.payments

KAFKA CONNECT:
  - Distributed worker framework that runs connector plugins
  - Scales horizontally — multiple workers share connector load
  - Stores connector offsets (LSN position) in a Kafka topic
    (not in the source database — offset is in _connect-offsets topic)
  - REST API: POST/GET/DELETE connectors, check status, restart

DEBEZIUM POSTGRESQL CONNECTOR:
  - Connects to PostgreSQL as a logical replication client
  - Reads WAL events via streaming replication protocol
  - Decodes binary WAL records using the pgoutput plugin
  - Publishes one Kafka message per database row change
  - Kafka message key: primary key of the changed row (for partition routing)`}</CodeBox>

        <SubSubTitle>Offset storage and the delivery guarantee</SubSubTitle>

        <CodeBox label="Where position is tracked, and why duplicates are possible">{`KAFKA TOPIC NAMING:
  Default pattern: {server.name}.{schema}.{table}
  Example: freshcart.public.orders
  One topic per table (recommended) — allows independent consumer groups.

OFFSET STORAGE:
  Debezium stores its WAL position (LSN) in a Kafka topic, NOT only in the
  source PostgreSQL replication slot. Two records of position exist:
  1. confirmed_flush_lsn in the PostgreSQL replication slot
     (what PostgreSQL knows the consumer has processed)
  2. Kafka Connect offset (internal __connect-offsets topic)
     (what Kafka Connect tracks as the connector's position)
  On restart: Debezium resumes from the Kafka Connect offset, then tells
  the PostgreSQL slot to start streaming from that LSN.

DELIVERY GUARANTEE:
  At-least-once: Debezium commits to Kafka before advancing the replication
  slot. On crash-restart, Debezium may re-emit the last batch of events
  (since the Kafka offset was not yet confirmed). Consumers MUST handle
  duplicates idempotently.`}</CodeBox>

        <SubSubTitle>Connector configuration — the critical parameters</SubSubTitle>

        <CodeBox label="Connection, table selection, and column filtering">{`{
  "name": "freshcart-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",

    // Source database connection:
    "database.hostname":    "postgres-primary.internal",
    "database.port":        "5432",
    "database.user":        "debezium",
    "database.password":    "\${file:/secrets/debezium.properties:db.password}",
    "database.dbname":      "freshcart_prod",
    "database.server.name": "freshcart",    // prefix for Kafka topic names

    // Table selection (include/exclude):
    "table.include.list": "public.orders,public.customers,public.payments",
    // OR exclude system tables:
    "table.exclude.list": "public.schema_migrations,public.sessions",

    // Column filtering (exclude PII from specific tables):
    "column.exclude.list": "public.customers.raw_phone,public.customers.ssn"
    // Excluded columns appear as null in CDC events — use for PII fields
    // that should not flow through Kafka
  }
}`}</CodeBox>

        <Output>{`The "\${file:...}" syntax above is genuine Kafka Connect config-provider
syntax — it resolves the password from a local properties file at runtime,
not a template bug. This is one of the few places in this module where
"\${" is correct as written.`}</Output>

        <SubSubTitle>Snapshot mode, topic naming, and serialization</SubSubTitle>

        <CodeBox label="Logical replication plugin, snapshot, and Schema Registry wiring">{`"plugin.name":        "pgoutput",    // built into PostgreSQL 10+
"slot.name":          "debezium_freshcart",
"publication.name":   "dbz_freshcart_pub",

"snapshot.mode":           "initial",       // initial | never | schema_only | always
"snapshot.isolation.mode": "serializable",  // consistent snapshot

"topic.prefix": "freshcart.cdc",
// Results in topics: freshcart.cdc.public.orders, freshcart.cdc.public.customers

// Use Avro + Schema Registry in production, not raw JSON:
"key.converter":   "io.confluent.kafka.serializers.KafkaAvroSerializer",
"value.converter": "io.confluent.kafka.serializers.KafkaAvroSerializer",
"key.converter.schema.registry.url":   "http://schema-registry:8081",
"value.converter.schema.registry.url": "http://schema-registry:8081"`}</CodeBox>

        <SubSubTitle>Heartbeat and event flattening</SubSubTitle>

        <CodeBox label="Keeping the slot moving, and simplifying the event shape">{`"heartbeat.interval.ms": "30000",  // emit heartbeat every 30 seconds
// Without heartbeat: on low-write tables, the replication slot LSN never
// advances, WAL accumulates, slot lag appears to grow forever. Heartbeat
// emits a WAL record every N ms to advance the confirmed LSN.

"transforms":             "unwrap",
"transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
"transforms.unwrap.add.fields":           "op,table,lsn,source.ts_ms",
"transforms.unwrap.delete.handling.mode": "rewrite",
// ExtractNewRecordState flattens the envelope:
// BEFORE: {before: {...}, after: {...}, op: "u", source: {...}}
// AFTER:  {order_id: 9284751, status: "delivered", __op: "u", __lsn: ...}
// Simpler for consumers, but loses the before image`}</CodeBox>

        <SubSubTitle>Tombstones and type handling</SubSubTitle>

        <CodeBox label="Delete tombstones, and safe decimal/interval serialization">{`"tombstones.on.delete": "true",
// After a DELETE event, Debezium emits a tombstone (null-value message)
// with the same key. Kafka uses tombstones to compact deleted records.
// Consumers must handle null value messages without crashing.

"decimal.handling.mode": "string",
// Options: precise (Avro Decimal), double (lossy), string (safe for all consumers)
// Use "string" unless consumers can handle the Avro Decimal type correctly

"interval.handling.mode": "string"`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Schema Registry ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Schema Registry" />
        <SectionTitle>Schema Registry — Why It Is Non-Negotiable in Production</SectionTitle>

        <Para>
          Schema Registry solves the versioning problem that makes CDC brittle without
          it. When the source table&rsquo;s schema changes — a column is added, a type
          changes, a column is renamed — every Kafka message format changes with it.
          Without Schema Registry, consumers that were written to parse the old
          format crash on the new format. With Schema Registry, schema evolution
          is managed through a central contract, and compatibility rules enforce
          what changes are allowed.
        </Para>

        <SubSubTitle>The producer–registry–consumer contract</SubSubTitle>

        <CodeBox label="How a schema ID gets embedded in every message">{`PRODUCER (Debezium)                    SCHEMA REGISTRY         CONSUMER (Spark/Python)
──────────────────────────────────────────────────────────────────────────────────────
Detects orders table has:
  order_id: INT8, status: VARCHAR, amount: DECIMAL

Registers Avro schema → POST /subjects/freshcart.cdc.public.orders-value/versions
Receives schema_id: 42

Serializes message:                    Stores schema:
[magic_byte=0][schema_id=42][avro..]   ID 42 → Avro schema for orders v1
→ Publishes to Kafka topic

                                                                Consumer reads message:
                                                                Sees [schema_id=42][...]
                                                                Fetches schema 42 from
                                                                registry, deserializes
                                                                → {order_id: 9284751,
                                                                   status: "delivered",
                                                                   amount: 380.00}`}</CodeBox>

        <SubSubTitle>Schema evolution — adding a column</SubSubTitle>

        <CodeBox label="A backward-compatible schema change, and how consumers experience it">{`Source DBA adds: ALTER TABLE orders ADD COLUMN delivery_fee DECIMAL(6,2) DEFAULT 0;

Debezium detects the schema change from the WAL DDL record.
New schema registers as version 2 (schema_id: 43):
  Added field: {"name": "delivery_fee", "type": ["null", "float"], "default": null}

COMPATIBILITY CHECK:
  Registry checks: is schema v2 backward-compatible with v1?
  Rule: adding a field with a default value is backward-compatible. ✓
  Rule: removing a required field is NOT backward-compatible. ✗

CONSUMER BEHAVIOUR:
  Old consumers (schema v1) reading a v2 message: delivery_fee is unknown → ignored ✓
  New consumers (schema v2) reading a v1 message: delivery_fee missing → default null ✓
  Both consumers continue working without redeployment.`}</CodeBox>

        <SubSubTitle>Compatibility modes</SubSubTitle>

        <CodeBox label="Four modes, from permissive to strict">{`BACKWARD (default):
  New schema can read data produced by the previous schema.
  Allows: adding fields with defaults, removing fields without defaults.
  Prevents: adding required fields, changing types.
  Best for: consumers that need to read old messages.

FORWARD:
  Previous schema can read data produced by the new schema.
  Opposite of backward — protects old consumers from new producers.

FULL:
  Both backward and forward. Most restrictive. Only additive changes.
  Best for: strict production environments.

NONE:
  No compatibility checking. Any change allowed. Use only in development.`}</CodeBox>

        <SubSubTitle>Consuming Avro CDC events in Python</SubSubTitle>

        <CodeBox label="AvroConsumer setup and routing by operation type">{`from confluent_kafka.avro import AvroConsumer
from confluent_kafka.avro.serializer import SerializerError

# AvroConsumer handles schema fetching and Avro deserialization automatically:
consumer = AvroConsumer({
    'bootstrap.servers':   'kafka:9092',
    'group.id':            'freshcart-cdc-silver-writer',
    'schema.registry.url': 'http://schema-registry:8081',
    'auto.offset.reset':   'earliest',
    'enable.auto.commit':  False,   # manual commit for at-least-once
})
consumer.subscribe(['freshcart.cdc.public.orders', 'freshcart.cdc.public.payments'])

def process_event(msg) -> None:
    """Process one CDC event with schema-aware deserialization."""
    if msg.value() is None:
        # Tombstone event (after a delete) — value is null, key has the primary key
        key = msg.key()
        handle_tombstone(key['order_id'] if key else None)
        return

    event = msg.value()   # AvroConsumer deserialized using Schema Registry
    op = event.get('__op') or event.get('op')
    if op in ('c', 'r', 'u'):
        upsert_to_silver(event)
    elif op == 'd':
        mark_deleted_in_silver(event.get('order_id'))`}</CodeBox>

        <CodeBox label="The consumer loop — commit only after a successful write">{`while True:
    try:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print(f'Consumer error: {msg.error()}')
            continue

        process_event(msg)
        consumer.commit()   # commit AFTER successful processing

    except SerializerError as e:
        # Schema deserialization failed — schema incompatibility
        print(f'Schema error: {e}')
        # Do NOT commit — message will be redelivered
        # Alert: schema compatibility issue needs investigation`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — The Outbox Pattern ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Outbox Pattern" />
        <SectionTitle>The Outbox Pattern — Reliable Event Publishing Without Dual-Write</SectionTitle>

        <Para>
          The Outbox Pattern is one of the most elegant applications of CDC in
          microservices architecture. It solves a fundamental distributed systems
          problem: how do you atomically update a database <em>and</em> publish
          an event to Kafka, when these are two different systems that cannot
          participate in a single transaction?
        </Para>

        <SubSubTitle>The dual-write problem</SubSubTitle>

        <CodeBox label="Why the naive approach cannot be made safe">{`NAIVE APPROACH (incorrect):
  BEGIN;
  UPDATE payments SET status = 'captured', captured_at = NOW()
  WHERE payment_id = 'pay_xxx';
  COMMIT;                                     -- Step 1: DB write succeeds
  producer.send('payments.captured', event)   -- Step 2: Kafka publish

FAILURE MODES:
  A) DB write succeeds, process crashes before Kafka publish
     → downstream services never notified — inconsistency
  B) Kafka publish succeeds, DB write fails (rolled back)
     → downstream services fulfill an order that was never paid for

TWO-PHASE COMMIT (XA)? Theoretically solves this, but Kafka does not
participate in XA transactions and XA is too slow for high-throughput
production systems — not practical here.`}</CodeBox>

        <SubSubTitle>Step 1-2 — the outbox table and the atomic write</SubSubTitle>

        <CodeBox label="Writing the business update and the event in one transaction">{`-- STEP 1: Create an outbox table (in the application database):
CREATE TABLE outbox_events (
    event_id        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type  VARCHAR(50) NOT NULL,   -- 'order', 'payment', etc.
    aggregate_id    VARCHAR(50) NOT NULL,   -- the entity's ID
    event_type      VARCHAR(100) NOT NULL,  -- 'PaymentCaptured', etc.
    payload         JSONB       NOT NULL,   -- event data
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_outbox_created ON outbox_events(created_at);

-- STEP 2: Application writes to both payments AND outbox atomically:
BEGIN;
UPDATE payments SET status = 'captured', captured_at = NOW()
WHERE payment_id = 'pay_xxx';

INSERT INTO outbox_events (aggregate_type, aggregate_id, event_type, payload)
VALUES (
    'payment', 'pay_xxx', 'PaymentCaptured',
    '{"payment_id": "pay_xxx", "amount": 38000, "currency": "USD",
      "merchant_id": "merch_001", "captured_at": "2026-03-17T20:14:32Z"}'
);
COMMIT;
-- Both succeed or both fail — no inconsistency possible`}</CodeBox>

        <SubSubTitle>Step 3 — Debezium reads the outbox via CDC</SubSubTitle>

        <CodeBox label="The Outbox Event Router transform">{`{
  "transforms": "outbox",
  "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
  "transforms.outbox.table.field.event.id":      "event_id",
  "transforms.outbox.table.field.event.key":     "aggregate_id",
  "transforms.outbox.table.field.event.payload": "payload",
  "transforms.outbox.route.by.field":            "aggregate_type",
  "transforms.outbox.route.topic.replacement":   "outbox.\${routedByValue}"
}
// Routes events to Kafka topics by aggregate_type:
// 'payment' events → Kafka topic: outbox.payment
// 'order' events   → Kafka topic: outbox.order
// The "\${routedByValue}" above is genuine Debezium SMT placeholder syntax —
// not a template bug.`}</CodeBox>

        <SubSubTitle>Steps 4-5, and why this works</SubSubTitle>

        <CodeBox label="Consuming, cleaning up, and the correctness argument">{`STEP 4: Consumers process events from outbox Kafka topics.

STEP 5 (optional): Delete processed outbox rows periodically:
  DELETE FROM outbox_events WHERE created_at < NOW() - INTERVAL '7 days';
  -- Or use a separate cleanup job — the outbox is not an event store,
  -- Kafka is. Outbox rows are only needed until CDC reads them.

WHY THIS WORKS:
  The outbox INSERT is in the same transaction as the business logic update.
  If the transaction commits: both the payment update AND the outbox event
  exist in the DB. If it rolls back: neither exists.
  CDC reads the outbox and publishes to Kafka — CDC provides at-least-once
  delivery. Downstream consumers handle duplicates with idempotency keys
  (event_id). Result: exactly-once business semantics from at-least-once
  delivery + idempotency.`}</CodeBox>

        <Callout type="tip">
          <strong>The Outbox Pattern is the recommended architecture</strong> for
          any microservice that needs to both update state and publish events reliably.
          It eliminates the dual-write problem entirely by making Kafka a downstream
          consumer of the database rather than a co-equal participant in a distributed
          transaction.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Event Ordering Guarantees ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Event Ordering Guarantees" />
        <SectionTitle>Event Ordering — What CDC Guarantees and Where It Breaks Down</SectionTitle>

        <Para>
          Event ordering is one of the most commonly misunderstood aspects of CDC.
          Many engineers assume that because CDC reads the WAL sequentially, all
          events arrive at consumers in the order they happened. This is true
          within a single table partition, but breaks down in specific scenarios
          that cause subtle bugs in CDC consumers.
        </Para>

        <SubSubTitle>What CDC does and does not guarantee</SubSubTitle>

        <CodeBox label="Ordering within a partition, but not across tables or partitions">{`WHAT CDC GUARANTEES:
  Within a single Kafka partition → events are strictly ordered by LSN.
  For a given primary key → all events for that row go to the same partition
  (because Kafka partition key = row's primary key by default).
  Therefore: all changes to order_id = 9284751 are ordered correctly.

WHAT CDC DOES NOT GUARANTEE:

1. ORDERING ACROSS TABLES:
   Event A (orders, LSN 1000) and Event B (customers, LSN 1001) may land in
   different Kafka partitions and be consumed out of order if the consumers
   for those topics run at different speeds. Example: a payment is captured
   (payments topic, LSN 5000) and the order status updated (orders topic,
   LSN 5001) — a consumer reading both topics may process the order update
   first, depending on consumer lag per topic.

2. ORDERING ACROSS KAFKA PARTITIONS:
   A high-write table may have multiple Kafka partitions. Events for
   different primary keys go to different partitions — ordered within each
   partition, but not between them. order_id 9284751 (partition 0) and
   order_id 9284752 (partition 1) events may arrive interleaved in any order.`}</CodeBox>

        <SubSubTitle>Snapshot + stream ordering, and the safe pattern</SubSubTitle>

        <CodeBox label="The window between snapshot completion and stream catch-up">{`3. SNAPSHOT + STREAM ORDERING:
   During initial snapshot, Debezium emits all existing rows as op=r events.
   Streaming changes begin from the snapshot LSN. The snapshot may take
   hours, and the source table is being modified during it — between
   snapshot completion and stream catchup, the consumer sees a mix of
   snapshot rows (as of snapshot start time) and stream changes (from
   snapshot start LSN forward). Upsert semantics reconcile both correctly.

SAFE PATTERN — process one table at a time, in order:
  consumer reads freshcart.cdc.public.orders one partition at a time
  → events for the same order are ordered, downstream safe

UNSAFE PATTERN — join across CDC streams in the consumer:
  consumer reads orders AND payments topics simultaneously, tries to join
  "when payment captured, also update order status" → ordering not
  guaranteed across topics → race condition possible

CORRECT PATTERN for cross-table consistency:
  Let each CDC stream write to its own Silver table independently. Let dbt
  handle the join in a SQL model — SQL joins are order-independent. Never
  implement cross-table joins in the CDC consumer layer.`}</CodeBox>

        <SubSubTitle>Transaction boundaries — atomicity from source to consumer</SubSubTitle>

        <CodeBox label="A single source transaction can split across Kafka topics">{`SOURCE TRANSACTION:
  BEGIN;
  INSERT INTO orders (order_id, status) VALUES (9284753, 'placed');
  INSERT INTO order_items (order_id, product_id, qty) VALUES (9284753, 42, 2);
  COMMIT;                          -- both rows committed atomically

CDC EVENTS (Debezium emits, both sharing txId: 847292):
  {op: "c", table: "orders",      txId: 847292, ...}
  {op: "c", table: "order_items", txId: 847292, ...}
  -- may be on different Kafka topics/partitions`}</CodeBox>

        <CodeBox label="Transaction metadata, and the simpler analytics-friendly approach">{`SOLUTION: enable Debezium's transaction metadata support:
  {"provide.transaction.metadata": "true"}
  Debezium emits BEGIN {txId, event_count} and COMMIT {txId, event_count,
  data_collections} events on a transaction metadata topic. A consumer can
  buffer events until the full transaction is received, then process
  atomically together.

SIMPLER APPROACH for analytics: don't try to preserve transaction
boundaries at the consumer layer. Write each event to its own Silver table
with upsert semantics, and run dbt models that JOIN across Silver tables —
dbt sees a consistent snapshot of all Silver tables at query time. This is
usually sufficient for analytical use cases.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Schema Evolution Handling ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Schema Evolution" />
        <SectionTitle>Schema Evolution — Handling DDL Changes Mid-Stream</SectionTitle>

        <Para>
          The source database schema changes over time. Tables gain new columns,
          columns are renamed, types are widened. CDC pipelines must handle these
          changes gracefully — a schema change that causes Debezium or a consumer
          to crash is an operational incident, not an expected upgrade.
        </Para>

        <SubSubTitle>Scenario 1 — adding a column (backward-compatible)</SubSubTitle>

        <CodeBox label="The safe case, and its consumer + warehouse impact">{`Source: ALTER TABLE orders ADD COLUMN delivery_fee DECIMAL(6,2) DEFAULT 0;

Debezium behaviour:
  - Detects DDL change from WAL, registers a new Avro schema
  - New schema version is backward-compatible — Registry accepts it

Messages BEFORE the DDL: delivery_fee absent, consumers use default null
Messages AFTER the DDL:  delivery_fee present with value

Consumer impact: old consumers (schema v1) see null (backward-compatible) ✓
new consumers (schema v2) see the correct value ✓ — NO crash, NO redeploy.

Data warehouse impact:
  - dbt Silver model needs updating to SELECT delivery_fee
  - ALTER TABLE silver.orders ADD COLUMN delivery_fee DECIMAL(6,2);
  - Or: dbt run --full-refresh silver.orders`}</CodeBox>

        <SubSubTitle>Scenario 2 — renaming a column (breaking)</SubSubTitle>

        <CodeBox label="Why renames break the Registry, and the safe migration path">{`Source: ALTER TABLE orders RENAME COLUMN order_amount TO amount;

Debezium behaviour:
  - Removing "order_amount" WITHOUT a default: NOT backward-compatible!
  - Schema Registry REJECTS this schema if compatibility mode = BACKWARD
  - If blocked: connector pauses, requires manual intervention

SAFE MIGRATION APPROACH (avoid breaking changes):
1. Add the NEW column: ALTER TABLE orders ADD COLUMN amount DECIMAL(10,2);
2. Write to both columns temporarily (application change)
3. Backfill: UPDATE orders SET amount = order_amount WHERE amount IS NULL;
4. Consumer updated to read "amount" column
5. Drop old column: ALTER TABLE orders DROP COLUMN order_amount;
6. Update Debezium schema: new version removes order_amount
This staged migration takes longer but never breaks the pipeline.`}</CodeBox>

        <SubSubTitle>Scenario 3 — changing a column type, and the schema-change event</SubSubTitle>

        <CodeBox label="Widening is safe, narrowing is not; Debezium logs every DDL">{`Source: ALTER TABLE orders ALTER COLUMN status TYPE VARCHAR(50);  -- was VARCHAR(20)

Widening (VARCHAR(20) → VARCHAR(50)) is usually safe — values that were
valid VARCHAR(20) are still valid VARCHAR(50). Debezium emits strings, so
the width change is transparent.

Narrowing (VARCHAR(50) → VARCHAR(20)) is dangerous — existing data may
violate the new constraint. Debezium/Schema Registry may reject this if
truncation is detected.

DEBEZIUM SCHEMA CHANGE EVENT: on every DDL, Debezium emits an event to a
separate topic ({server.name}.schema-changes.{database}) containing the
raw DDL text and the full new column list. Useful for auditing schema
changes and alerting when unexpected DDL occurs.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — CDC for Analytics ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — CDC for Analytics" />
        <SectionTitle>Landing CDC Events in a Data Lake — Efficiently</SectionTitle>

        <Para>
          CDC events arrive as a continuous high-throughput stream. Writing each
          event individually to S3 or a data lake creates a massive small-file
          problem. The standard architecture uses Kafka as a buffer and a
          micro-batch consumer to land batches of events efficiently.
        </Para>

        <SubSubTitle>Why not write each event directly to S3</SubSubTitle>

        <CodeBox label="The small-file math, and the correct architecture">{`PostgreSQL → Debezium → Kafka → [Spark Streaming / Flink] → Delta Lake
                                  (micro-batch consumer)      (Bronze layer)

At 10,000 events/second, writing each event as its own file means 10,000
S3 PUT requests/second, each Parquet file ~1 KB. After 1 hour: 36,000,000
tiny files — unusable for analytics.

CORRECT APPROACH: buffer in Kafka, write batches to Delta Lake on a
micro-batch trigger.`}</CodeBox>

        <SubSubTitle>Reading from Kafka and parsing the Avro payload</SubSubTitle>

        <CodeBox label="Spark Structured Streaming — the read side">{`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, current_timestamp
from pyspark.sql.types import StructType, LongType, StringType

spark = SparkSession.builder \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .getOrCreate()

raw = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "kafka:9092") \\
    .option("subscribe", "freshcart.cdc.public.orders") \\
    .option("startingOffsets", "latest") \\
    .option("maxOffsetsPerTrigger", 500_000) \\
    .load()

orders_schema = StructType() \\
    .add("order_id",   LongType()) \\
    .add("status",     StringType()) \\
    .add("amount",     StringType()) \\  # decimal as string
    .add("updated_at", LongType()) \\    # microseconds epoch
    .add("__op",       StringType()) \\  # operation type
    .add("__lsn",      LongType())       # WAL LSN for ordering

parsed = raw.select(from_json(col("value").cast("string"), orders_schema).alias("e")) \\
    .select("e.*").withColumn("ingested_at", current_timestamp())`}</CodeBox>

        <SubSubTitle>Upserting to Delta Lake and starting the stream</SubSubTitle>

        <CodeBox label="foreachBatch merge, and the 5-minute trigger">{`def upsert_to_delta(batch_df, batch_id):
    from delta.tables import DeltaTable
    if DeltaTable.isDeltaTable(spark, "s3://freshcart-lake/bronze/orders"):
        delta_table = DeltaTable.forPath(spark, "s3://freshcart-lake/bronze/orders")
        delta_table.alias("target").merge(
            batch_df.alias("source"), "target.order_id = source.order_id"
        ).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
    else:
        batch_df.write.format("delta").mode("overwrite") \\
            .partitionBy("date").save("s3://freshcart-lake/bronze/orders")

query = parsed.writeStream \\
    .foreachBatch(upsert_to_delta) \\
    .option("checkpointLocation", "s3://freshcart-lake/checkpoints/orders_cdc") \\
    .trigger(processingTime="5 minutes") \\
    .start()
query.awaitTermination()`}</CodeBox>

        <SubSubTitle>Handling deletes, and keeping files compacted</SubSubTitle>

        <CodeBox label="Three delete strategies, and the OPTIMIZE schedule">{`HANDLING DELETE EVENTS IN THE DATA LAKE:
  Option A — soft-delete flag: store __op/__deleted in Delta Lake, dbt
    Silver filters WHERE __op != 'd'. Preserves full history for audit.
  Option B — hard delete via Delta MERGE DELETE clause:
    .whenMatchedDelete(condition="source.__op = 'd'"). Cleaner, loses history.
  Option C — separate deleted-records table: route deletes to
    bronze.orders_deletes, dbt Silver EXCEPTs those IDs. Keeps both views.

COMPACTION SCHEDULE:
  CDC streams create many small Delta files per 5-minute trigger. Run
  OPTIMIZE daily:
    OPTIMIZE delta.\`s3://freshcart-lake/bronze/orders\`
    WHERE date >= current_date - 7;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Production Operations ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Production Operations" />
        <SectionTitle>Operating CDC in Production — The Full Runbook</SectionTitle>

        <Para>
          CDC is the most operationally demanding ingestion pattern. Query-based
          pipelines are stateless — a failure just means the next run processes
          more rows. CDC has persistent state (replication slots, Kafka offsets,
          consumer group positions) that must be monitored and managed. A CDC
          deployment without a monitoring and runbook plan is a production incident
          waiting to happen.
        </Para>

        <SubSubTitle>PostgreSQL monitoring queries</SubSubTitle>

        <CodeBox label="Replication slot lag — the single most critical metric">{`-- Replication slot lag:
SELECT slot_name, active,
    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) AS lag_bytes,
    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) / 1024 / 1024 AS lag_mb,
    now() - pg_last_xact_replay_timestamp() AS replication_delay
FROM pg_replication_slots;

-- ALERT thresholds:
-- lag_mb > 1024 (1 GB): WARNING — consumer is falling behind
-- lag_mb > 10240 (10 GB): CRITICAL — risk of disk fill, investigate immediately
-- active = false: CRITICAL — slot exists but consumer is disconnected

-- WAL disk usage:
SELECT pg_size_pretty(sum(size)) AS wal_disk_usage FROM pg_ls_waldir();`}</CodeBox>

        <SubSubTitle>Debezium and Kafka Connect monitoring</SubSubTitle>

        <CodeBox label="Checking connector health via the REST API">{`import requests

# Check connector status:
response = requests.get('http://kafka-connect:8083/connectors/freshcart-orders-cdc/status')
status = response.json()
# Expected: {"connector": {"state": "RUNNING"}, "tasks": [{"state": "RUNNING", ...}]}
# Alert if state != "RUNNING"

# Pause/resume connector (for maintenance):
requests.put('http://kafka-connect:8083/connectors/freshcart-orders-cdc/pause')
requests.put('http://kafka-connect:8083/connectors/freshcart-orders-cdc/resume')

# Restart a failed task:
requests.post('http://kafka-connect:8083/connectors/freshcart-orders-cdc/tasks/0/restart')`}</CodeBox>

        <SubSubTitle>Kafka consumer lag monitoring</SubSubTitle>

        <CodeBox label="Per-partition lag, from the CLI and from Python">{`# kafka-consumer-groups.sh --bootstrap-server kafka:9092 \\
#   --describe --group freshcart-cdc-silver-writer
#
# TOPIC                          PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
# freshcart.cdc.public.orders    0          1847291         1847301         10
# freshcart.cdc.public.orders    1          2039847         2039847         0

from confluent_kafka.admin import AdminClient
admin = AdminClient({'bootstrap.servers': 'kafka:9092'})
offsets = admin.list_consumer_group_offsets(['freshcart-cdc-silver-writer'])
# ALERT if any partition lag > 10,000 events or > 5 minutes of events`}</CodeBox>

        <SubSubTitle>An automated health-check script</SubSubTitle>

        <CodeBox label="Combining slot lag and connector state into one alert list">{`import psycopg2, requests

def check_cdc_health(pg_conn_str: str, kafka_connect_url: str) -> list[str]:
    """Check CDC health, return list of alert messages."""
    alerts = []

    with psycopg2.connect(pg_conn_str) as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT slot_name, active,
                       pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn) / 1024 / 1024
                FROM pg_replication_slots
            """)
            for slot_name, active, lag_mb in cur.fetchall():
                if not active:
                    alerts.append(f'CRITICAL: Slot {slot_name} is INACTIVE')
                elif lag_mb and lag_mb > 10240:
                    alerts.append(f'CRITICAL: Slot {slot_name} lag = {lag_mb:.0f} MB')
                elif lag_mb and lag_mb > 1024:
                    alerts.append(f'WARNING: Slot {slot_name} lag = {lag_mb:.0f} MB')

    resp = requests.get(f'{kafka_connect_url}/connectors?expand=status', timeout=10)
    for name, info in resp.json().items():
        state = info['status']['connector']['state']
        if state != 'RUNNING':
            alerts.append(f'CRITICAL: Connector {name} state = {state}')
        for task in info['status']['tasks']:
            if task['state'] != 'RUNNING':
                alerts.append(f'CRITICAL: Connector {name} task {task["id"]} = {task["state"]}')

    return alerts`}</CodeBox>

        <SubSubTitle>Recovery runbook — connector failures and slot lag</SubSubTitle>

        <CodeBox label="Failure 1-2 — connector FAILED, and replication lag growing">{`FAILURE 1: Connector FAILED state
  Likely cause: PostgreSQL connectivity issue, schema change, credential expiry
  Recovery: (1) GET /connectors/{name}/status → error_trace shows the exact
  exception. (2) Fix the root cause. (3) Restart the failed task:
  POST /connectors/{name}/tasks/0/restart. (4) If it keeps failing: DELETE
  and recreate the connector (may require re-snapshot).

FAILURE 2: Replication slot lag growing (consumer slow)
  Risk: if lag grows indefinitely, source disk fills.
  Recovery: (1) identify the bottleneck — consumer or broker slow? Check
  kafka-consumer-groups.sh --describe. (2) if consumer slow: scale up the
  consumer group. (3) if Kafka is the bottleneck: increase topic partitions.
  (4) if unrecoverable and lag > 50 GB with no improvement in 30 min:
  consider dropping the slot (accepts data loss) to protect the source DB.`}</CodeBox>

        <SubSubTitle>Recovery runbook — offset, failover, and schema failures</SubSubTitle>

        <CodeBox label="Failures 3-5 — retention gap, primary failover, breaking schema change">{`FAILURE 3: Consumer offset behind Kafka retention
  Symptom: "Offset 0 is not available, earliest is 48000000" — consumer was
  paused longer than Kafka's retention period.
  Recovery: reset consumer group offset to earliest available, then either
  re-snapshot from current state or reprocess everything (upserts handle it).

FAILURE 4: PostgreSQL primary failover
  Symptom: Debezium loses connection to the old primary.
  Recovery: update database.hostname to the new primary (ideally via a DNS
  alias), restart the connector — it resumes from the last confirmed LSN.
  Note: WAL LSN sequence resets if the replica wasn't fully caught up —
  some events may be replayed or lost; heartbeats help detect this.

FAILURE 5: Schema change breaks the consumer
  Symptom: SerializerError or NullPointerException on new events.
  Recovery: check GET /subjects/{topic}-value/versions/latest. If the
  schema was accepted, update consumer code for the new field. If rejected
  by the Registry (a genuine breaking change), work with the source team
  on a safe staged migration instead.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Change Data Capture</SectionTitle>

        {[
          {
            wrong: '"CDC guarantees events arrive at consumers in the order they happened"',
            right: 'Part 06 draws the line precisely: ordering is guaranteed only within a single Kafka partition for a given primary key — never across tables, never across partitions. This module\'s Interview Prep Q3 walks through exactly this misconception causing an order-cancelled event to be processed before order-delivered.',
          },
          {
            wrong: '"Schema Registry is optional infrastructure — you can add it later once CDC is stable"',
            right: 'Part 04 is explicit that without it, any source schema change silently breaks whatever consumer code was written against the old message shape. This module\'s Error Library shows the version of this failure that happens without a Registry catching it first: consumers crash in production with a confusing deserialization error instead of the connector pausing safely.',
          },
          {
            wrong: '"The Outbox Pattern is over-engineering — just publish to Kafka right after the database write"',
            right: 'Part 05\'s dual-write section shows both failure directions of the naive approach are real and asymmetric in severity — a lost event under-notifies downstream systems, but a phantom event (Kafka says captured, DB rolled back) can cause an order to ship that was never actually paid for.',
          },
          {
            wrong: '"A replication slot is Debezium\'s internal bookkeeping, not something to actively monitor"',
            right: 'Part 09\'s monitoring section and this module\'s Error Library agree: an unmonitored slot doesn\'t just fall behind quietly — the source database itself keeps accumulating WAL until disk fills, which can crash the production database, not merely the CDC pipeline.',
          },
          {
            wrong: '"Since Debezium reads the WAL, before-images are always available for every table automatically"',
            right: 'This module\'s Interview Prep Q2 and Q5 both flag the actual requirement — PostgreSQL only records full before-images when REPLICA IDENTITY FULL is explicitly set on the table; by default only primary-key columns appear in the before image, which is not enough for audit trails or GDPR erasure verification.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 10 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Implementing CDC for GDPR Compliance — The Right Way</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — FreshCart · GDPR Right to Erasure requirement
          </div>

          <Para>
            FreshCart&rsquo;s legal team informs the data engineering team that under GDPR
            (applicable to users in the EU), customers can request deletion of their
            personal data. When a deletion request is processed by the application
            team, the customer row in PostgreSQL is hard-deleted. The data engineering
            team has 30 days to ensure that data is also removed from the analytics
            warehouse and all downstream systems.
          </Para>

          <Para>
            The incremental ingestion pipeline currently running on the customers table
            uses an <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated_at</code> watermark
            and cannot detect hard deletes. Silver and Gold tables in Snowflake still
            contain data for deleted customers. This is a compliance violation.
            <strong> The solution: CDC on the customers table.</strong>
          </Para>

          <SubSubTitle>Step 1-2 — switch to CDC, handle delete events</SubSubTitle>

          <CodeBox label="Decommissioning incremental, and processing the delete">{`STEP 1: Switch customers table ingestion from incremental to CDC.
  Configure Debezium to capture the customers table.
  Create a consumer that writes to bronze.customers (Delta Lake).
  Decommission the incremental Python pipeline.

STEP 2: Handle DELETE events in the consumer:
  def process_customer_event(event: dict) -> None:
      op = event.get('__op') or event.get('op')
      if op == 'd':
          customer_id = event.get('customer_id') or \\
                        (event.get('before') or {}).get('customer_id')
          spark.sql(f"""
              DELETE FROM delta.\`s3://freshcart-lake/bronze/customers\`
              WHERE customer_id = {customer_id}
          """)
          log_erasure(customer_id, reason='gdpr_deletion',
                      erased_at=datetime.now(timezone.utc))
          publish_to_kafka('customer.erasure', {
              'customer_id': customer_id,
              'erased_at':   datetime.now(timezone.utc).isoformat(),
          })
      elif op in ('c', 'u', 'r'):
          upsert_to_bronze(event)`}</CodeBox>

          <SubSubTitle>Step 3-4 — exclude erased customers, cascade to Gold</SubSubTitle>

          <CodeBox label="dbt Silver model respects the erasure log">{`-- models/silver/customers.sql
WITH bronze AS (
    SELECT * FROM {{ ref('bronze_customers') }}
),
erased AS (
    SELECT customer_id FROM {{ ref('erasure_log') }}
    WHERE erased_at >= DATEADD('day', -30, CURRENT_DATE)
)
SELECT b.*
FROM bronze b
LEFT JOIN erased e USING (customer_id)
WHERE e.customer_id IS NULL   -- exclude erased customers

-- STEP 4: cascade to Gold
-- dbt run --select +customers+  (rebuilds all downstream models)`}</CodeBox>

          <SubSubTitle>Step 5-6 — purge Kafka PII, verify compliance</SubSubTitle>

          <CodeBox label="Tombstones for Kafka, and the final verification queries">{`STEP 5: Purge PII from Kafka.
  Kafka retains messages for the configured retention period, and CDC
  events for a deleted customer contain PII in the 'before' field.
  Use Kafka's tombstone mechanism: a null-value message with the same key
  (customer_id) triggers log compaction, removing all older messages with
  that key once compaction runs.

STEP 6: Verify compliance.
  SELECT COUNT(*) FROM silver.customers WHERE customer_id = {deleted_id};
  -- Must return 0
  SELECT COUNT(*) FROM gold.customer_ltv WHERE customer_id = {deleted_id};
  -- Must return 0`}</CodeBox>

          <Output>{`Result: GDPR erasure complete within minutes of the application deletion,
well within the 30-day compliance window.`}</Output>

          <Para>
            This pattern — CDC enabling reliable hard-delete propagation — is one of
            the most common business-driven reasons for adopting CDC beyond
            analytics performance. Incremental ingestion simply cannot support
            right-to-erasure requirements. CDC is the only alternative to full
            periodic reloads for propagating deletions.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Explain the Outbox Pattern. What problem does it solve and how does CDC enable it?',
            a: `The Outbox Pattern solves the dual-write problem in distributed systems: how do you atomically update a database and publish an event to a message broker (like Kafka) when these are two separate systems that cannot participate in a single transaction?

The naive approach — update the database, then publish to Kafka — fails because either step can succeed while the other fails. If the database write succeeds and the service crashes before the Kafka publish, the event is lost. If the Kafka publish succeeds but the database write is rolled back, downstream services act on a fictional event.

The Outbox Pattern eliminates the dual-write by using the database as the single source of truth for both the business update and the event. Within the same database transaction, the application writes to the business table (updating order status to "delivered") AND inserts a row into an outbox table containing the event payload. Both writes happen atomically — either both commit or both roll back. No partial state is possible.

CDC then reads the outbox table via the WAL. When Debezium sees a new row inserted into the outbox table, it publishes it to Kafka. This step is at-least-once delivery — on Debezium restart, the same row might be published twice. Consumers handle this with idempotency keys from the event_id column: if the event was already processed, the duplicate is discarded.

The result is exactly-once business semantics from at-least-once infrastructure: the business operation either happened (and the event was published) or did not happen (and no event exists). CDC is what makes this pattern operational — without CDC continuously watching the outbox table, you would need a polling job, which reintroduces delay and complexity.`,
          },
          {
            q: 'Q2. What is the difference between the before and after images in a CDC event? When would you use each?',
            a: `In a CDC UPDATE event, the before image contains the row's column values before the change, and the after image contains the column values after the change. For INSERT events, there is no before image (the row did not exist). For DELETE events, there is no after image (the row no longer exists).

The after image is what most CDC consumers use. When building an analytics pipeline that maintains a current-state view of a table, you upsert the after image into the destination: these are the new values for this row as of this moment. For deletes, the absence of an after image signals that the row should be removed from the destination.

The before image is valuable in specific contexts. First, audit trails: by recording both before and after images for every update, you build an immutable history of every change — who changed what from what to what, and when. This is valuable for compliance, debugging, and regulatory requirements. Second, detecting what changed: by comparing before and after images, you can determine exactly which fields were modified in each update, enabling more precise downstream logic. Third, undo operations: if a bad update needs to be reversed, the before image contains the values to restore.

In Debezium, the before image is only populated when the table's PostgreSQL replica identity is set to FULL. By default (replica identity DEFAULT), PostgreSQL only records the old values for columns in the primary key. To get the full before image for all columns, run: ALTER TABLE orders REPLICA IDENTITY FULL. This increases WAL volume because every update records all column values twice (before and after), not just the primary key and changed columns. For high-write tables, this trade-off should be deliberate — enable FULL replica identity on tables where the before image is genuinely needed.`,
          },
          {
            q: 'Q3. A CDC pipeline has been running for six months. The team discovers that events for the same order are sometimes processed out of order — an "order cancelled" event is processed before the "order delivered" event even though the delivery happened first in the source. What is causing this?',
            a: `This is a Kafka partition ordering problem combined with the characteristics of how Debezium routes events to partitions.

Within a single Kafka partition, events are strictly ordered by LSN — the WAL sequence number. Events within a partition always arrive in the exact order they were committed to the database. However, across partitions, there is no ordering guarantee.

For events related to a single order to process out of order, they must have landed in different partitions. This can happen for two reasons.

First, if the Kafka topic for orders has more than one partition and the partition key is not the order_id, then two updates to the same order may go to different partitions. By default Debezium uses the table's primary key as the Kafka message key, which Kafka uses for partition routing (consistent hashing). If order_id is the primary key, all events for the same order_id should always go to the same partition, preserving order for that order.

Second, and more likely: the updates to the same logical order came from different source tables. For example, the order status table and the order_deliveries table are separate tables in Kafka — different topics with different partitions. A consumer that reads both topics can process events from different topics interleaved in any order.

The fix is to ensure events for the same order that need to be processed in order are published to the same Kafka partition. If both events are in the same table, verify the partition key is order_id. If they are from different tables, use a transactional envelope — buffer events by transaction ID and only process when the complete transaction is received. For analytics use cases, the simpler fix is to stop trying to maintain order in the CDC consumer and instead let dbt handle the join across Silver tables using SQL, which is order-independent.`,
          },
          {
            q: 'Q4. How does Schema Registry prevent CDC consumers from breaking when the source table schema changes?',
            a: `Schema Registry acts as a central contract between Debezium (the producer) and all consumers. Every schema version is registered before any messages using that schema are published to Kafka.

When Debezium detects a schema change from the WAL DDL events, it attempts to register the new schema version with the Schema Registry. The Registry evaluates whether the proposed change is compatible with previous versions according to the configured compatibility mode. With BACKWARD compatibility, the new schema must be readable by code written to parse the old schema — this means new fields must have default values so old consumers can safely ignore them.

If the change is compatible, the Registry accepts the new schema and assigns it a new schema ID. Debezium begins embedding this new schema ID in messages. Consumers that request schema 42 (old) continue working for old messages. When they encounter a message with schema ID 43 (new), they fetch the new schema from the Registry and use it to deserialize. With a backward-compatible change like adding a column with a default, the old deserialization code works with the new schema without modification.

If the change is incompatible — removing a column without a default, narrowing a type, renaming a field — the Registry rejects it. Debezium's connector enters a FAILED state and stops publishing events rather than silently breaking consumers. This is the correct behavior: it surfaces the breaking change immediately rather than allowing consumers to crash later with confusing deserialization errors.

The practical operational requirement is that any source schema change must be coordinated with the CDC team before it is deployed. A DBA who runs ALTER TABLE orders DROP COLUMN promo_code without notice will cause the CDC connector to fail if Schema Registry rejects the new schema. The fix is to make this a deliberate migration: deprecate the column with a DEFAULT null before dropping it, allowing Schema Registry to register the change as backward-compatible.`,
          },
          {
            q: 'Q5. You need to implement GDPR right-to-erasure for customer data. Customer rows are hard-deleted from the PostgreSQL source. How would you design a CDC-based pipeline to propagate these deletions to the analytics warehouse within the compliance window?',
            a: `Hard-deletes are invisible to query-based incremental ingestion — a deleted row produces no result in a WHERE updated_at > checkpoint query. CDC is the correct solution because it reads DELETE operations directly from the WAL.

The pipeline design has four components.

First, the Debezium connector for the customers table captures DELETE events. Each DELETE event contains the before image — the full row values of the deleted customer — and op: "d". Critically, the PostgreSQL customers table must have REPLICA IDENTITY FULL set to ensure the before image contains all columns, not just the primary key.

Second, the CDC consumer processes delete events explicitly. When it sees op: "d", it extracts the customer_id from the before image, writes a DELETE statement to the Bronze layer Delta table (DELETE FROM bronze.customers WHERE customer_id = deleted_id), and records the deletion in an erasure log table with the timestamp. The erasure log is the audit trail for compliance — it proves the deletion was processed.

Third, the dbt Silver model references the erasure log and excludes deleted customers using a LEFT JOIN or EXCEPT clause. Running dbt run --select +customers+ rebuilds all downstream models using the updated Silver model, removing the deleted customer from all Gold tables and aggregations.

Fourth, Kafka tombstones are published to remove the customer's CDC event history from Kafka. A null-value message with the customer_id as the key triggers log compaction, removing all earlier messages for that key from the topic. This ensures the deleted customer's PII does not persist in Kafka beyond its retention period.

The entire pipeline from application deletion to warehouse erasure completes in minutes, well within the 30-day GDPR compliance window. The erasure log provides the audit evidence that the deletion was propagated.`,
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Joining across two CDC topics directly inside the consumer to enforce business logic ordering',
            a: 'Part 06 is explicit that ordering is only guaranteed within a single Kafka partition for one primary key — never across topics. The correct pattern, used throughout this module, is to let each stream write to its own Silver table and let dbt do the cross-table join in SQL, which is naturally order-independent.',
          },
          {
            q: 'Assuming the before image is always populated for every UPDATE and DELETE event',
            a: 'Interview Prep Q2 and Q5 both flag the actual PostgreSQL default: without REPLICA IDENTITY FULL explicitly set on the table, only primary-key columns appear in the before image. Any audit trail or GDPR erasure verification that depends on the full before image needs this set deliberately, table by table.',
          },
          {
            q: 'Writing plain INSERT statements in a CDC consumer instead of an upsert',
            a: 'Part 03 is explicit that Debezium is at-least-once delivery — a connector restart can and will re-emit already-published events. This module\'s Error Library shows exactly what that produces with plain INSERT: duplicate rows with the same order_id and different statuses after a restart.',
          },
          {
            q: 'Treating a growing replication slot lag as a Kafka-side problem only',
            a: 'Part 09\'s monitoring section and this module\'s Error Library both make the same point: the WAL that an unconsumed slot retains lives on the SOURCE PostgreSQL server, not in Kafka — so unresolved lag risks filling the production database\'s own disk, not just delaying the pipeline.',
          },
          {
            q: 'Deploying a source schema change (renaming or dropping a column) without coordinating with the CDC team first',
            a: 'Part 07\'s Scenario 2 and Interview Prep Q4 both show the same failure: an uncoordinated breaking change gets rejected by Schema Registry, and the connector pauses in production until someone intervenes. The staged migration (add new column, backfill, migrate consumers, then drop the old column) is what keeps that change from ever becoming an incident.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Debezium connector FAILED: ERROR: logical replication slot "debezium_freshcart" does not exist — after PostgreSQL primary failover`,
            cause: 'During a PostgreSQL primary failover, the promoted replica did not have the replication slot from the old primary. Replication slots are not automatically replicated to standbys in standard PostgreSQL — they exist only on the node where they were created. When the old primary failed and a replica was promoted, the slot was not on the new primary.',
            fix: 'Configure the PostgreSQL cluster to use pg_failover_slots extension, which synchronises replication slots to standby servers before promotion. Alternatively, use a DNS alias (postgres-primary.internal) for Debezium to connect to, and after failover, create a new replication slot on the new primary and restart Debezium with a fresh snapshot. If some WAL events were lost during failover, determine the data loss window from the failover timestamp and backfill that window from an application backup or by running a targeted incremental extraction.',
          },
          {
            error: `Kafka consumer error: org.apache.kafka.common.errors.SerializationException — Error deserializing key/value for partition freshcart.cdc.public.orders-0 — Schema not found`,
            cause: 'The consumer is attempting to deserialize a message using a schema ID that does not exist in the Schema Registry. Most common causes: the Schema Registry was reset or its data was deleted, the consumer is pointing to a different Schema Registry than the producer, or a message was published before the schema was properly registered in the Registry.',
            fix: 'Verify the consumer and producer are configured with the same Schema Registry URL. Check if the schema ID referenced in the failing message exists: GET http://schema-registry:8081/schemas/ids/{schema_id}. If the schema does not exist, it was either deleted from the Registry or the consumer is reading from a different environment\'s topic. Re-register the schema by restarting the Debezium connector with snapshot.mode=schema_only — it will re-register all table schemas. If the schema was intentionally deleted, reset consumer offset to after the last message using the deleted schema.',
          },
          {
            error: `Delta Lake pipeline: concurrent write conflict — TransactionConflictException when multiple CDC consumers write to the same Delta table`,
            cause: 'Two Spark Streaming jobs or micro-batch triggers are writing to the same Delta table simultaneously. Delta Lake supports concurrent reads and writes but serialises write transactions — if two writers attempt to commit at the same time, one succeeds and the other fails with a TransactionConflictException and must retry.',
            fix: 'Ensure only one streaming job writes to each Delta table at a time. Use a single Spark Structured Streaming job that reads from all relevant Kafka topics and writes to the corresponding Delta table. If multiple teams need to write to the same table, coordinate write schedules or use Delta Lake\'s optimistic concurrency — the retrying writer will re-read the current state and re-attempt. Also configure delta.dataSkippingNumIndexedCols appropriately to reduce conflict scope.',
          },
          {
            error: `PostgreSQL error: could not write to file "pg_wal/000000010000000100000000": No space left on device — source database disk full due to replication slot lag`,
            cause: 'The Debezium consumer has been stopped or is too slow to consume WAL events. PostgreSQL\'s replication slot retains WAL segments until the consumer confirms it has read them. With the consumer not advancing the confirmed_flush_lsn, PostgreSQL accumulated days or weeks of WAL on the source server\'s disk until it was full.',
            fix: 'Emergency: immediately drop the replication slot to allow PostgreSQL to clean up WAL and free disk space: SELECT pg_drop_replication_slot(\'debezium_freshcart\'). This accepts data loss — accept it to prevent a complete database outage. Once disk pressure is resolved, create a new slot and restart Debezium with a fresh snapshot. Long-term: set up monitoring on pg_replication_slots lag with alerts at 1 GB and 10 GB thresholds. Add heartbeats to the connector. Consider setting a max_slot_wal_keep_size in postgresql.conf to limit how much WAL a slot can retain.',
          },
          {
            error: `CDC consumer produces duplicate rows in Silver table — the same order_id appears twice with different statuses after a Debezium connector restart`,
            cause: 'Debezium provides at-least-once delivery. On connector restart, it re-reads WAL events from the last confirmed replication slot LSN and re-publishes events that were already published to Kafka but whose Kafka offset was not yet confirmed before the restart. The consumer processed these duplicate events and inserted them with plain INSERT rather than upsert, creating duplicate rows.',
            fix: 'Replace plain INSERT with upsert: INSERT ... ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status WHERE silver.orders.updated_at < EXCLUDED.updated_at. Ensure a UNIQUE constraint exists on order_id. Clean up existing duplicates: DELETE FROM silver.orders WHERE ctid NOT IN (SELECT MIN(ctid) FROM silver.orders GROUP BY order_id). Add a Kafka message deduplication step using the source.lsn field as an idempotency key — if a message with the same LSN was already processed, skip it.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
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

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'CDC reads the database WAL (Write-Ahead Log) — the database\'s own durability record. Every INSERT, UPDATE, and DELETE committed to PostgreSQL is recorded in the WAL before data pages are modified. Logical decoding converts binary WAL records into structured events with before/after images and operation type.',
        'PostgreSQL requires wal_level=logical for CDC. This cannot be changed on a running database — it requires a restart. It also requires creating a replication slot (which retains WAL until the consumer advances its LSN), a dedicated replication user, and a publication for the tables to capture.',
        'Debezium is a Kafka Connect plugin that connects to PostgreSQL as a logical replication client. It decodes WAL events and publishes them to Kafka with the schema embedded. The connector stores its position (LSN) in a Kafka offset topic. On restart, it resumes from the last confirmed offset.',
        'Schema Registry is non-negotiable in production. It registers Avro schemas and enforces compatibility rules, preventing source schema changes from silently breaking consumers. BACKWARD compatibility (new schema can read old messages) is the correct default — it allows adding fields with defaults without redeploying consumers.',
        'The Outbox Pattern solves dual-write consistency. The application writes to both the business table and an outbox table in one transaction. CDC reads the outbox and publishes to Kafka. This gives exactly-once business semantics from at-least-once infrastructure, with idempotency at the consumer layer handling duplicate deliveries.',
        'CDC guarantees ordering within a single Kafka partition (events for the same primary key are always ordered). CDC does not guarantee ordering across partitions or across tables. Never implement cross-table join logic in the CDC consumer — let dbt handle it in SQL, which is order-independent.',
        'The before image in an UPDATE event contains the row\'s previous values. PostgreSQL only records full before images when REPLICA IDENTITY FULL is set on the table. By default only primary key columns appear in the before image. Enable FULL replica identity for tables where you need audit trails or undo capabilities.',
        'Replication slot monitoring is the most critical operational concern. Alert at 1 GB lag (warning) and 10 GB lag (critical). An unmonitored slot can fill the source database disk and crash the production application. Set heartbeat.interval.ms in Debezium to ensure the slot advances even during low-write periods.',
        'CDC provides at-least-once delivery — events may be delivered more than once on connector restart. Every CDC consumer must use upsert (not INSERT) at the destination, with a UNIQUE constraint on the business key. Use the source LSN as an idempotency key for deduplication when exact-once processing is required.',
        'CDC for data lakes: do not write each event directly to S3. Use a Spark Structured Streaming micro-batch consumer (5-minute trigger) that reads from Kafka and upserts to Delta Lake. Run Delta OPTIMIZE daily to compact the small files the micro-batch pattern creates. Handle DELETE events explicitly — mark as soft-deleted or use Delta MERGE DELETE clause.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 25 builds a complete batch pipeline from scratch — extract, validate, transform, load, checkpoint — with full working Python code and every production decision explained as it is made.
        </p>
        <Link href="/learn/data-engineering/batch-pipeline-from-scratch" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 25 → Building a Batch Pipeline From Scratch
        </Link>
      </div>
    </LearnLayout>
  )
}
