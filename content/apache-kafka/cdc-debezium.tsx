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

export default function CdcDebezium() {
  return (
    <LearnLayout
      title="Change Data Capture with Debezium"
      description="What Change Data Capture actually is, why polling for changes is fragile, how Debezium reads a database's own transaction log instead of querying tables, the Debezium event envelope, initial snapshots, the outbox pattern, schema evolution, and the operational pitfalls of running CDC in production."
      section="Apache Kafka — Module 21"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Change Data Capture with Debezium', href: '/learn/apache-kafka/cdc-debezium' },
      ]}
      prev={{ title: 'Event-Driven Architecture', href: '/learn/apache-kafka/event-driven-architecture' }}
      next={{ title: 'Managed Kafka and Cloud Choices', href: '/learn/apache-kafka/managed-kafka-cloud' }}
    >
      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What CDC Actually Is" />
        <SectionTitle>Change Data Capture — Every Row Change, As It Happens, Without Asking the Database Twice</SectionTitle>
        <Para>
          Change Data Capture (CDC) is the practice of capturing every row-level insert, update, and delete
          made to a database, in the order they happened, as a stream of events — rather than periodically
          asking the database "what changed since I last checked." The distinction sounds small. It is not.
          A CDC system produces one event per write. A polling system produces a batch summary of net effects
          observed at whatever interval it happens to run, which is a fundamentally lossier signal.
        </Para>
        <Para>
          Most teams' first encounter with the need for CDC looks the same: a service owns a Postgres table
          — orders, customers, inventory — and three other teams each want to know when a row changes, so
          they can react. The instinct is to add a scheduled job: <code>SELECT * FROM orders WHERE
          updated_at &gt; last_run_time</code>, run every five minutes, publish whatever comes back. This
          works, briefly, and then breaks in ways that are hard to notice until they have already cost
          someone data.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What CDC gives you that polling structurally cannot:</strong>
          </Para>
          <Para>
            <strong>Every change, not just the latest state</strong> — if a row is updated three times
            between polls, polling sees only the final value. CDC sees, and can emit, all three updates,
            each with its own before/after state.
          </Para>
          <Para>
            <strong>Deletes, which polling cannot see at all</strong> — a <code>WHERE updated_at &gt; x</code>
            query finds rows that changed. A deleted row is gone; there is nothing left to select. Polling
            has no way to know a delete happened unless the application is disciplined enough to soft-delete
            every single row, forever, which most schemas do not do.
          </Para>
          <Para>
            <strong>Near-zero load on the source database</strong> — CDC, done the way this module covers,
            reads the database's own internal change log rather than running repeated <code>SELECT</code>
            queries against live tables, so it does not compete with production traffic for query capacity
            or lock contention.
          </Para>
        </HighlightBox>
        <Para>
          This module builds directly on Kafka Connect (Module 13). Debezium — the dominant open-source CDC
          project, and the one this module focuses on — does not run as a separate system you deploy and
          operate independently. It runs <em>as</em> a Kafka Connect source connector, in distributed mode,
          configured through the same REST API, using the same converters and Single Message Transforms
          you already learned. Everything Module 13 taught about tasks, offsets, distributed-mode
          rebalancing, and DLQ handling for source connectors applies to Debezium directly — this module
          does not re-teach that ground, it builds on it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why Polling Is Fragile" />
        <SectionTitle>The "Poll for Changes" Pattern Is Fragile in Three Specific, Predictable Ways</SectionTitle>
        <Para>
          It is worth being precise about exactly how the polling approach fails, because each failure mode
          shows up independently in production, and each one is the kind of bug that passes code review and
          works fine in testing before quietly losing data at scale.
        </Para>
        <SubTitle>Failure 1 — deletes are invisible</SubTitle>
        <Para>
          A polling query built around a <code>last_modified</code> or <code>updated_at</code> column
          finds rows whose value in that column is newer than the last checkpoint. A row that was deleted
          no longer exists to be found by any query. Unless every table in the system is disciplined about
          soft-deletes (an <code>is_deleted</code> flag set instead of a real <code>DELETE</code>), and
          every consumer of the polling job knows to check that flag, deletions simply vanish from the
          event stream. Downstream systems — a search index, a cache, an analytics table — drift out of
          sync with the source of truth and nobody notices until a customer asks why a cancelled order is
          still showing up somewhere.
        </Para>
        <SubTitle>Failure 2 — intra-poll-window updates are collapsed</SubTitle>
        <Para>
          If a row is updated twice between two poll runs, the polling query sees the row once, with only
          its final value. Both intermediate states are gone. This matters more than it first appears:
          an inventory system that needs to know a product went from 40 units to 0 units to 15 units
          (a stockout and restock within one polling window) only sees "15 units" — the stockout, and any
          business logic that should have reacted to it, never happened as far as the event stream is
          concerned.
        </Para>
        <SubTitle>Failure 3 — polling load competes with production traffic</SubTitle>
        <Para>
          A polling job that scans a large table on a schedule adds real query load to a database that is
          also serving live application traffic. As tables grow, either the poll interval has to widen (making
          Failures 1 and 2 worse) or the query has to be more carefully indexed and rate-limited to avoid
          contending with production queries — and even a well-indexed poll is still periodic load the
          database's own internal write path does not otherwise need to pay.
        </Para>
        <CodeBox label="the same three orders, polling vs CDC">
{`# Timeline: three things happen to order_id=4821 in a 5-minute polling window

t=0:10   INSERT order_id=4821, status='pending'
t=1:40   UPDATE order_id=4821 SET status='paid'
t=3:05   DELETE FROM orders WHERE order_id=4821   -- customer cancelled, refunded

# Polling job runs at t=5:00, query: WHERE updated_at > last_checkpoint
# Result: ZERO rows returned for order_id=4821.
# The row was inserted, updated, and deleted, all inside the window --
# and the final state (deleted) means there is nothing left to select.
# Every one of these three events is invisible to the polling consumer.

# CDC reading the transaction log instead:
# offset 9001  op=c (create)  order_id=4821 status=pending
# offset 9002  op=u (update)  order_id=4821 status: pending -> paid
# offset 9003  op=d (delete)  order_id=4821 status: paid -> (row gone)
# All three events exist on the Kafka topic, in order, individually.
# A downstream fraud-detection consumer that cares about rapid
# pay-then-cancel patterns can actually see this sequence happen.`}
        </CodeBox>
        <Callout title="Polling is not always wrong" color="#38bdf8">
          For a small table with low change frequency, where only the current state matters and deletes are
          rare or handled as soft-deletes everywhere, a polling job can be a reasonable, low-effort choice.
          The point of this Part is not that polling is never acceptable — it is that polling has specific,
          structural blind spots that CDC does not, and choosing polling should be a deliberate trade-off,
          not a default born from not knowing CDC exists.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — How Debezium Actually Captures Changes" />
        <SectionTitle>Debezium Reads the Database's Own Write-Ahead Log — It Never Runs a SELECT Against Your Tables</SectionTitle>
        <Para>
          Every production relational database already maintains an internal, sequential log of every write
          it performs, for its own crash-recovery and replication purposes. Postgres calls this the
          write-ahead log (WAL). MySQL calls it the binary log (binlog). SQL Server has Change Data Capture
          or Change Tracking built directly into the engine. These logs exist independent of Debezium — every
          database that supports replication already writes one, because it is how the database replicates
          itself to standby replicas.
        </Para>
        <Para>
          Debezium's core mechanism is to tap into this existing log rather than issuing queries. It
          effectively registers itself as a replication consumer — from the database's point of view, a
          Debezium connector looks similar to a standby replica asking to stream changes, not a client
          running repeated <code>SELECT</code> statements. This single design decision is what makes Debezium
          fundamentally different from a polling-based tool, and it is the reason it can capture deletes and
          every intermediate update with near-zero added load on the source database.
        </Para>
        <Table
          headers={['Database', 'Log Debezium reads', 'Mechanism']}
          rows={[
            ['PostgreSQL', 'Write-ahead log (WAL)', 'Logical replication slot, decoded via the pgoutput plugin (built into Postgres 10+) or the older decoderbufs plugin'],
            ['MySQL', 'Binary log (binlog)', 'Debezium registers as a MySQL replication client, reading the binlog in ROW format'],
            ['SQL Server', 'Change Data Capture (CDC) or Change Tracking tables', 'SQL Server\'s own built-in CDC feature must be enabled per-table; Debezium reads the resulting change tables'],
            ['MongoDB', 'Oplog (operation log)', 'Debezium reads MongoDB\'s replica set oplog, the same log used for replica set replication'],
          ]}
        />
        <SubTitle>Why this matters operationally — near-zero read load on the source</SubTitle>
        <Para>
          Because Debezium is consuming a log the database is already writing for its own purposes, it does
          not add meaningful query load to the tables it is capturing. It does not take row locks, does not
          compete with application queries for the query planner's attention, and does not scan tables. The
          practical impact for a team introducing CDC into a busy production database is that Debezium can
          typically be turned on against a live, high-traffic table without the kind of careful load-testing
          a new polling job against that same table would need.
        </Para>
        <CodeBox label="pgoutput, in one picture — what actually happens on the Postgres side">
{`1. A logical replication SLOT is created on the Postgres primary,
   specifically for Debezium: e.g. slot name "debezium_freshcart"

2. Every committed write to a table included in that slot's
   publication is appended to the WAL, exactly as it always was --
   Debezium did not change how Postgres writes.

3. Debezium's connector streams from that replication slot,
   decoding each WAL entry via the pgoutput logical decoding plugin
   into a structured change: table, operation type, before/after row

4. Debezium turns each decoded change into a Kafka record and
   produces it to the appropriate topic (see Part 05 for the shape)

5. Once Debezium acknowledges it has processed a WAL position,
   Postgres is free to reclaim (garbage-collect) that portion of
   the WAL -- see Part 08 for what happens when this acknowledgement
   stops arriving`}
        </CodeBox>
        <Callout title="Debezium is a Kafka Connect source connector — not a separate deployed system" color={K}>
          There is no standalone "Debezium server" you deploy by default (a Debezium Server mode exists for
          non-Kafka targets, but it is the exception, not the norm covered here). In the overwhelmingly
          common deployment, Debezium is a connector JAR installed into a Kafka Connect distributed cluster,
          configured with a JSON payload submitted to the same <code>POST /connectors</code> REST endpoint
          covered in Module 13, running as tasks on Connect workers, with the same offset-tracking,
          rebalancing, and error-handling model as any other source connector.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Configuring a Real Debezium Connector" />
        <SectionTitle>A Worked Example — Deploying a Postgres Connector Through the Connect REST API</SectionTitle>
        <Para>
          Continuing with FreshCart's Postgres <code>orders</code> table: the fulfillment, fraud, and
          analytics teams all want a real-time stream of every insert, update, and delete on that table,
          including the ones a polling job would have silently dropped. Here is the connector configuration.
        </Para>
        <CodeBox label="debezium-postgres-orders.json">
{`{
  "name": "source-postgres-orders-prod",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "database.hostname": "db.internal",
    "database.port": "5432",
    "database.user": "debezium_reader",
    "database.password": "\${file:/secrets/connect-creds.properties:db_password}",
    "database.dbname": "freshcart",
    "topic.prefix": "freshcart.pg",
    "table.include.list": "public.orders",
    "plugin.name": "pgoutput",
    "slot.name": "debezium_freshcart_orders",
    "publication.name": "dbz_publication_orders",
    "snapshot.mode": "initial",
    "key.converter": "org.apache.kafka.connect.json.JsonConverter",
    "key.converter.schemas.enable": "false",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081"
  }
}`}
        </CodeBox>
        <BulletList
          items={[
            'connector.class — Debezium\'s Postgres connector plugin, submitted the exact same way any Connect source connector is.',
            'plugin.name: "pgoutput" — the logical decoding plugin, built into Postgres since version 10, no extra Postgres extension install required.',
            'slot.name — the name of the logical replication slot this connector owns. Only one consumer can read a given slot; the slot persists on the Postgres server itself until explicitly dropped (see Part 08 on why this matters).',
            'table.include.list — restricts capture to specific tables rather than the whole database, keeping the blast radius of one connector small.',
            'snapshot.mode: "initial" — take a full snapshot of existing rows once, then switch to streaming the WAL (see Part 06).',
            'tasks.max: "1" — Debezium\'s Postgres connector runs a single task per connector; unlike the JDBC source connector from Module 13, parallelism across tables comes from running multiple connectors, not multiple tasks within one.',
          ]}
        />
        <Para>
          Submitting this is identical in mechanics to submitting any Connect source connector — one HTTP
          POST, one JSON payload, and the connector's status is checked the same way, at
          <code>GET /connectors/source-postgres-orders-prod/status</code>.
        </Para>
        <Table
          headers={['Config property', 'What it actually controls']}
          rows={[
            ['table.include.list / table.exclude.list', 'Which tables are captured — an allowlist or denylist of fully-qualified table names'],
            ['column.exclude.list', 'Drops specific columns from captured events entirely — useful for excluding a sensitive column before it ever reaches Kafka'],
            ['heartbeat.interval.ms', 'How often Debezium writes a heartbeat message to a dedicated topic, used to advance the WAL position even on quiet tables (see Part 08)'],
            ['tombstones.on.delete', 'Whether a delete produces both a delete event and a following null-value tombstone, matching the compacted-topic tombstone convention'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 05 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Change Event Envelope" />
        <SectionTitle>Every Debezium Event Has the Same Shape — before, after, source, and op</SectionTitle>
        <Para>
          Regardless of which database Debezium is capturing from, every change event it produces follows
          the same envelope structure. Learning this shape once means every Debezium-backed topic you ever
          consume, across any team or any database, is immediately readable.
        </Para>
        <CodeBox label="the Debezium envelope — an UPDATE on the orders table">
{`{
  "before": {
    "order_id": 4821,
    "customer_id": "C-991",
    "status": "pending",
    "total_cents": 4599
  },
  "after": {
    "order_id": 4821,
    "customer_id": "C-991",
    "status": "paid",
    "total_cents": 4599
  },
  "source": {
    "version": "2.5.0.Final",
    "connector": "postgresql",
    "name": "freshcart.pg",
    "ts_ms": 1758000000123,
    "db": "freshcart",
    "schema": "public",
    "table": "orders",
    "txId": 88213,
    "lsn": 302981744,
    "snapshot": "false"
  },
  "op": "u",
  "ts_ms": 1758000000456
}`}
        </CodeBox>
        <Table
          headers={['Field', 'Meaning']}
          rows={[
            ['before', 'The row\'s full state immediately before this change. Null for an insert (there was no "before" row) and populated for update and delete.'],
            ['after', 'The row\'s full state immediately after this change. Null for a delete (there is no "after" row) and populated for insert and update.'],
            ['source', 'Metadata about where this change came from — the database, table, transaction ID, and log position (LSN for Postgres, file+offset for MySQL binlog) that produced it.'],
            ['op', '"c" (create/insert), "u" (update), "d" (delete), or "r" (read — an event produced during the initial snapshot, not a live change).'],
            ['ts_ms', 'The wall-clock time Debezium processed and emitted this event, distinct from source.ts_ms which is when the database committed the change.'],
          ]}
        />
        <Para>
          The <code>op</code> field is the field most consumer logic branches on. A consumer materializing
          a downstream cache or search index typically upserts on <code>c</code> and <code>u</code> events
          using the <code>after</code> state, and deletes the corresponding document on a <code>d</code>
          event — a delete event's <code>after</code> is null, so the deletion signal is unambiguous, which
          is exactly the guarantee polling could never provide.
        </Para>
        <CodeBox label="a minimal consumer branching on op">
{`def handle_debezium_event(event):
    op = event["op"]

    if op in ("c", "u", "r"):
        # insert, update, or initial-snapshot read -- upsert the current row
        upsert_search_index(event["after"])
    elif op == "d":
        # delete -- 'after' is null, 'before' still has the last known row
        delete_from_search_index(event["before"]["order_id"])
    else:
        raise ValueError(f"unexpected op: {op}")`}
        </CodeBox>
        <Callout title="Key field: what a Debezium record's Kafka key actually is" color="#38bdf8">
          A Debezium record's Kafka message key is the captured table's primary key, by default — for the
          orders table, that is <code>{'{"order_id": 4821}'}</code>. This is what makes Debezium topics
          naturally compactable (Part 07) and what guarantees every change to the same row lands on the
          same partition, preserving per-row ordering exactly the way keyed partitioning does for any Kafka
          producer.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Initial Snapshot" />
        <SectionTitle>Before Streaming Begins, Debezium Snapshots Existing Data — And That Phase Needs Care</SectionTitle>
        <Para>
          When a Debezium connector starts for the first time against a table, the WAL or binlog only
          contains changes going forward from the moment the connector's replication slot was created — it
          has no record of the rows that already existed in the table before that point. To give consumers
          a complete picture, Debezium first performs a snapshot phase: it reads the table's current
          contents in full, producing one <code>op: "r"</code> (read) event per existing row, and only
          switches to streaming live changes from the log once the snapshot completes.
        </Para>
        <CodeBox label="the two phases, in sequence">
{`Phase 1 — Snapshot (once, at connector startup)
  Debezium runs a consistent read of every row currently in the
  orders table. For 2 million existing rows, that is 2 million
  "op": "r" events produced to the topic, each with only an
  "after" (the current row), no "before".

Phase 2 — Streaming (continuous, from here on)
  Debezium switches to reading the WAL/binlog from the exact log
  position that was consistent with the snapshot's starting point,
  so no change is missed and no change is double-counted between
  the two phases. From here, every insert/update/delete produces
  a "c"/"u"/"d" event with full before/after state.

  The switch from snapshot to streaming is seamless from a
  consumer's point of view -- both phases write to the same topic,
  using the same envelope shape, just with different "op" values.`}
        </CodeBox>
        <SubTitle>Operational care for large tables</SubTitle>
        <Para>
          A snapshot of a 2-million-row table is 2 million Kafka records produced in a short burst — real
          load on both the source database (a full table read) and the target Kafka cluster (a spike in
          write throughput on the destination topic). For very large tables, this deserves the same
          operational attention as any large backfill: running it during a lower-traffic window, watching
          the source database's read replica lag if the snapshot is taken from a replica, and being aware
          that a snapshot in progress delays the point at which the connector starts surfacing genuinely
          live changes.
        </Para>
        <Table
          headers={['snapshot.mode value', 'Behavior']}
          rows={[
            ['initial (default)', 'Snapshot existing data once on first startup, then stream. If the connector restarts later, it resumes streaming from its saved offset — it does not re-snapshot.'],
            ['initial_only', 'Take the snapshot, then stop — useful for a one-time historical load into a topic without ongoing streaming.'],
            ['never', 'Skip the snapshot entirely and only stream changes from the point the connector starts — consumers get no historical data, only what changes going forward.'],
            ['when_needed', 'Debezium decides based on whether it has a valid saved offset to resume from — snapshots automatically if it does not.'],
          ]}
        />
        <Callout title="A skipped snapshot is a common source of 'the topic is missing most of our data' confusion" color="#ff4757">
          A team that sets <code>snapshot.mode: "never"</code>, expecting to save time, often does not
          realize until later that every row that existed in the table before the connector started is
          simply absent from the topic — only rows changed after that moment ever appear. If downstream
          consumers need a complete picture of current state, not just a feed of future changes, the
          snapshot phase is not optional.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Topic Conventions and Log Compaction" />
        <SectionTitle>Topic-Per-Table Conventions, and Why CDC Topics Are Natural Candidates for Log Compaction</SectionTitle>
        <Para>
          Debezium follows a topic-per-table convention by default: <code>{'{topic.prefix}.{schema}.{table}'}</code>.
          For the FreshCart example in Part 04, that produces <code>freshcart.pg.public.orders</code>. This
          mirrors the naming discipline covered for Connect topics generally in Module 13, and matters even
          more for CDC, because a single Debezium connector configured against a whole schema can spin up
          dozens of topics automatically — one per table — with no manual topic-creation step required.
        </Para>
        <SubTitle>Why CDC topics are a natural fit for compaction</SubTitle>
        <Para>
          Recall from the message-brokers module that log compaction retains only the latest value per key,
          forever, rather than deleting old segments by age. A Debezium topic's key is the source table's
          primary key (Part 05), and every event for a given row is a complete new snapshot of that row's
          current state in <code>after</code>. This means a compacted Debezium topic is, structurally, a
          changelog of the table — replaying it from the beginning reconstructs the table's current full
          state, row by row, exactly the changelog-table pattern the message-brokers module introduced
          conceptually.
        </Para>
        <CodeBox label="a compacted orders CDC topic, reconstructing table state">
{`# freshcart.pg.public.orders, compacted, key = order_id

# Raw log (before compaction):
offset 0: key=4821  op=c  after={status: pending, ...}
offset 1: key=4822  op=c  after={status: pending, ...}
offset 2: key=4821  op=u  after={status: paid, ...}
offset 3: key=4821  op=u  after={status: shipped, ...}

# After compaction, only the latest offset per key survives:
offset 1: key=4822  op=c  after={status: pending, ...}
offset 3: key=4821  op=u  after={status: shipped, ...}

# A new consumer reading from the beginning of this compacted
# topic sees the CURRENT state of every order that has ever
# existed -- a live, rebuildable copy of the orders table,
# without querying Postgres at all.

# A delete (op=d, after=null) becomes a tombstone once compacted
# -- the row's key is removed from the reconstructed state entirely.`}
        </CodeBox>
        <Para>
          Not every Debezium topic should be compacted, though. If downstream consumers genuinely need the
          full history of intermediate updates — an audit log, a fraud model training on the sequence of
          state transitions — time-based retention, not compaction, is the right policy, since compaction
          is specifically designed to discard everything except the latest value per key.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Replication Slot Risk" />
        <SectionTitle>Replication Slot Growth — The Single Most Dangerous Operational Failure Mode in Postgres CDC</SectionTitle>
        <Para>
          Part 03 described the replication slot Postgres creates for Debezium as the mechanism that lets
          Debezium resume exactly where it left off. That same mechanism has a sharp edge: Postgres will not
          reclaim (garbage-collect) any portion of the WAL that a replication slot has not yet acknowledged
          as consumed — no matter how much disk space that requires. If Debezium falls behind, disconnects,
          or is deleted incorrectly while its slot still exists, Postgres keeps every WAL segment since the
          slot's last acknowledged position, indefinitely.
        </Para>
        <CodeBox label="how an unattended slot fills the disk — a real incident shape">
{`t=0        Debezium connector "source-postgres-orders-prod" running
           normally, slot "debezium_freshcart_orders" actively
           acknowledging WAL positions as it streams

t=1 day    The Connect cluster the connector runs on is
           decommissioned as part of an unrelated migration.
           Nobody explicitly stops or drops the connector first --
           it simply stops running.

t=1 day+   The replication slot "debezium_freshcart_orders" still
           EXISTS on the Postgres server. Postgres does not know
           the connector is gone -- from its point of view, a
           consumer might reconnect and resume at any moment, so
           it keeps every WAL segment since the slot's last
           acknowledged position, exactly as designed.

t=3 days   Postgres's WAL directory has grown by tens of GB and is
           approaching the disk's capacity. Every table on this
           Postgres instance is now at risk -- not just orders.

t=3 days+  If disk fills completely, Postgres refuses new writes
           cluster-wide. This is now a production outage for every
           application using this database, caused entirely by an
           orphaned replication slot nobody remembered to drop.`}
        </CodeBox>
        <Para>
          This is arguably the single highest-stakes operational fact in this entire module: a replication
          slot is not free, and it is not self-cleaning. It is a standing commitment from Postgres to retain
          WAL until someone tells it otherwise, and "someone" has to be a human or an automated process that
          explicitly drops the slot — Debezium disappearing does not drop its own slot.
        </Para>
        <SubTitle>Mitigations</SubTitle>
        <BulletList
          items={[
            'Monitor replication slot lag directly in Postgres — pg_replication_slots exposes how far behind each slot is, in WAL bytes, and this should be an alerted metric, not something checked manually after an incident.',
            'Always explicitly delete the Debezium connector (DELETE /connectors/{name}) before decommissioning the infrastructure it runs on — deleting the connector is what triggers Debezium to drop its own replication slot cleanly.',
            'Set a heartbeat.interval.ms on tables that change infrequently — a table with no writes for hours means Debezium has no new WAL activity to acknowledge, which can itself stall slot advancement; a periodic heartbeat message gives Debezium something to acknowledge against even on quiet tables.',
            'Alert on slot existence itself, not just lag — an orphaned slot that nobody is consuming from produces zero lag readings if lag is measured only against an active consumer, so a stale-slot check (a slot with no active connection for an extended period) catches what a lag-only alert would miss.',
          ]}
        />
        <Callout title="This risk is specific to log-based CDC on Postgres and MySQL — not a general Kafka Connect concern" color="#ff4757">
          A JDBC source connector from Module 13, polling a table with an incrementing column, has no
          equivalent failure mode — there is no server-side resource being held open on its behalf. The
          replication-slot risk is the direct cost of the mechanism that makes Debezium fast, low-impact,
          and delete-aware in the first place. Understanding it is not optional for anyone operating
          Debezium against Postgres in production.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — The Outbox Pattern" />
        <SectionTitle>The Outbox Pattern — Debezium as the Real Fix for the Dual-Write Problem</SectionTitle>
        <Para>
          The event-driven-architecture module covered the dual-write problem: a service that must both
          update its own database and publish an event describing that update has no way to make both
          operations atomic using two separate systems (a database transaction and a Kafka producer call)
          — a crash between the two leaves them inconsistent, either a committed database change with no
          published event, or a published event for a database change that never actually committed.
        </Para>
        <Para>
          The outbox pattern solves this by turning a two-system problem into a one-system problem, and CDC
          is what makes it work in practice. Instead of writing to the database and separately calling a
          Kafka producer, the service writes both the business data change and a row describing the event
          — into an <code>outbox</code> table — in the same database transaction. A Debezium connector then
          captures changes to that outbox table exactly like any other table, turning each outbox row into
          a Kafka event. Because the outbox write and the business data write are one atomic database
          transaction, and Debezium is guaranteed to eventually capture every committed row via the WAL,
          the dual-write problem disappears — there is only ever one system (the database) that needs to
          commit atomically.
        </Para>
        <CodeBox label="the outbox pattern, end to end">
{`-- Inside ONE Postgres transaction, from the orders service:

BEGIN;

UPDATE orders SET status = 'paid' WHERE order_id = 4821;

INSERT INTO outbox (
  aggregate_type, aggregate_id, event_type, payload
) VALUES (
  'Order', '4821', 'OrderPaid',
  '{"order_id": 4821, "total_cents": 4599, "paid_at": "..."}'
);

COMMIT;

-- Both rows commit together or neither does. There is no window
-- where the order is marked paid but no event was ever recorded,
-- and no window where an event exists for an update that rolled back.

-- A Debezium connector configured against the outbox table (using
-- Debezium's dedicated "outbox event router" SMT, which unwraps
-- the outbox row into a clean event on a topic named after
-- aggregate_type) captures each new outbox row exactly like any
-- other insert, and produces it to a Kafka topic -- with the same
-- at-least-once, near-zero-source-load guarantees as any other
-- Debezium-captured table.`}
        </CodeBox>
        <Table
          headers={['Approach', 'Atomicity of write + publish', 'Failure mode']}
          rows={[
            ['Direct dual write (DB write, then producer.send())', 'None — two independent systems, two independent points of failure', 'Crash between the two leaves them inconsistent — the classic dual-write problem'],
            ['Outbox table + Debezium', 'Full — both rows are one database transaction', 'None specific to this pattern; ordinary Debezium operational risks (Part 08) still apply'],
          ]}
        />
        <Callout title="The outbox pattern is the standard real answer, not a workaround" color={K}>
          Teams sometimes reach for two-phase commit, distributed transactions, or best-effort retry logic
          to paper over the dual-write problem. The outbox-plus-CDC pattern is simpler than all of those and
          is the pattern most production systems that need this guarantee actually converge on — it turns
          an unsolved distributed-transactions problem into an ordinary, single-database, ACID transaction,
          with Debezium doing the work of reliably getting that data out of the database and onto Kafka.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Schema Evolution" />
        <SectionTitle>Schema Evolution in CDC Topics — The Source Schema Changes Whether the Topic Is Ready or Not</SectionTitle>
        <Para>
          A hand-written producer only ever writes a schema its own application code was deployed with —
          the team controls both when the schema changes and when the producer deploys. A Debezium connector
          has no such control: the moment a database migration runs <code>ALTER TABLE orders ADD COLUMN
          discount_cents INTEGER</code>, the very next captured row includes that new field, whether or not
          any downstream consumer or Schema Registry compatibility check was prepared for it.
        </Para>
        <Para>
          This makes the converter and Schema Registry discipline from Module 13 more important for Debezium
          topics than almost any other kind of Connect pipeline. With an Avro converter and Schema Registry
          configured — as in the Part 04 configuration — a genuinely breaking schema change (removing a
          required field, changing a field's type incompatibly) is rejected at registration time, before it
          reaches the topic and breaks every downstream consumer simultaneously. Without that enforcement, a
          routine database migration becomes a silent, cluster-wide breaking change for every Debezium topic
          consumer at once.
        </Para>
        <Table
          headers={['Database change', 'Effect on the Debezium event without schema enforcement']}
          rows={[
            ['Add a nullable column', 'New field appears in after with a null or default value for older rows — usually safe, but still a schema change worth registering explicitly'],
            ['Add a NOT NULL column with no default', 'Every subsequent event includes the new required field — consumers built against the old schema may fail to deserialize'],
            ['Rename a column', 'Looks like the old field disappearing and a new field appearing simultaneously — a genuinely breaking change for any consumer reading field names directly'],
            ['Change a column\'s type (e.g. INTEGER to VARCHAR)', 'Breaking for any consumer that deserializes strictly against the old Avro schema'],
          ]}
        />
        <Callout title="Coordinate database migrations with downstream CDC consumers the same way you'd coordinate an API breaking change" color="#ff4757">
          A team that owns the orders table and a team consuming its Debezium topic are effectively coupled
          by that topic's schema, even though neither team calls the other's code directly. Treating a
          migration that renames or retypes a captured column with the same care as a breaking API change —
          announcing it, versioning it, giving consumers time to adapt — is the practical discipline CDC
          requires that a purely internal database change would not otherwise need.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 11 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Monitoring and Operating Debezium" />
        <SectionTitle>Monitoring a Debezium Deployment — What to Watch Beyond Ordinary Connect Task Health</SectionTitle>
        <Para>
          Module 13 already covered the baseline for monitoring any Kafka Connect source connector — task
          state (RUNNING/PAUSED/FAILED), poll and write rates, and DLQ produce rates. Debezium connectors
          need everything from that baseline plus a handful of CDC-specific signals that a generic JDBC
          source connector does not have, because Debezium's failure modes are shaped by the replication
          mechanism covered in Part 03 and Part 08.
        </Para>
        <Table
          headers={['Metric', 'What it tells you', 'Why it is specific to log-based CDC']}
          rows={[
            ['Replication slot lag (pg_replication_slots.confirmed_flush_lsn vs. current WAL position)', 'How far behind the connector is in acknowledging WAL — the direct early-warning signal for Part 08\'s disk-growth failure mode', 'A JDBC source connector has no equivalent server-side resource being held open on its behalf; this metric only exists because of the replication slot mechanism'],
            ['MilliSecondsBehindSource (a Debezium-exposed JMX metric)', 'How far behind, in wall-clock time, the connector\'s streaming position is relative to the most recent committed database transaction', 'Gives a time-based view of lag that is often more actionable for on-call than a raw LSN or byte-offset number'],
            ['Snapshot progress / RemainingTableCount during an initial snapshot', 'How much of a large-table snapshot (Part 06) is left to complete', 'Only relevant during the one-time snapshot phase — irrelevant once a connector is fully in streaming mode'],
            ['NumberOfEventsFiltered / NumberOfDisconnects', 'How often events are being filtered by include/exclude lists, and how often the connector\'s database connection is dropping and reconnecting', 'Frequent disconnects are a leading indicator of the network or database instability that can also cause replication slot lag to grow'],
          ]}
        />
        <Para>
          The single highest-leverage alert to add on top of Module 13's baseline is replication slot lag
          specifically, alerted well before it reaches a level that threatens disk capacity — not just when
          the connector's task itself transitions to FAILED. A connector can be technically RUNNING while
          steadily falling behind the WAL, which is exactly the silent, slow-building failure mode Part 08
          describes; a task-state-only alert will not catch it until the underlying database is already in
          serious trouble.
        </Para>
        <CodeBox label="a monitoring check that catches the specific CDC failure mode Part 08 describes">
{`-- Run on the Postgres primary, on a schedule, alert on the result:

SELECT
  slot_name,
  active,
  pg_size_pretty(
    pg_wal_lsn_diff(pg_current_wal_lsn(), confirmed_flush_lsn)
  ) AS retained_wal_size
FROM pg_replication_slots
WHERE slot_name LIKE 'debezium_%';

-- Alert conditions:
--   active = false AND retained_wal_size > 0
--     -> an orphaned slot with nobody consuming from it, per Part 08
--   retained_wal_size growing steadily over a rolling window
--     -> a connected-but-lagging connector, falling behind the WAL
--   retained_wal_size approaching a disk-capacity threshold
--     -> the emergency case: act now, before Postgres refuses writes`}
        </CodeBox>
        <Callout title="Debezium's own metrics are exposed via JMX, the same way a broker's or a plain Connect worker's are" color="#38bdf8">
          Because Debezium runs inside a Connect worker's JVM, its connector-specific metrics are exposed
          through the same JMX mechanism that Connect's own task-level metrics use, which means they plug
          into whatever metrics pipeline (Prometheus JMX exporter, Datadog, CloudWatch) a team already has
          set up for Kafka and Connect monitoring generally — no separate observability stack is needed
          specifically for Debezium.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 12 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — MySQL Specifics and Multi-Database Reality" />
        <SectionTitle>The Postgres Story Generalizes, With Database-Specific Wrinkles Worth Knowing</SectionTitle>
        <Para>
          Everything covered so far — the envelope shape, the snapshot phase, the outbox pattern, the
          topic-per-table convention — applies the same way regardless of which database Debezium is
          capturing from. But the specific mechanism each database uses to expose its change log, and the
          specific operational risks that come with it, differ enough to be worth knowing explicitly rather
          than assuming Postgres's exact failure modes transfer one-for-one.
        </Para>
        <SubTitle>MySQL — the binlog, and why ROW format is non-negotiable</SubTitle>
        <Para>
          MySQL's binary log can be configured in one of three formats: STATEMENT (records the SQL
          statement executed), ROW (records the actual row-level before/after data), or MIXED. Debezium
          requires ROW format specifically, because STATEMENT format only records "UPDATE orders SET status
          = 'paid' WHERE order_id = 4821" — the statement itself, not the row's resulting data — which is
          not enough information to construct the before/after envelope Part 05 describes, especially for a
          statement that could affect many rows non-deterministically (an UPDATE with a subquery, or one
          relying on auto-increment values assigned at execution time).
        </Para>
        <CodeBox label="checking and setting MySQL's binlog format — a prerequisite, not an optional tuning knob">
{`-- Check current binlog format:
SHOW VARIABLES LIKE 'binlog_format';

-- If it returns STATEMENT or MIXED, Debezium cannot reliably
-- reconstruct row-level before/after state. This must be set to
-- ROW before a Debezium MySQL connector is deployed:

SET GLOBAL binlog_format = 'ROW';
-- (Typically set in my.cnf for a permanent, restart-safe change
--  rather than only at the session level)

-- MySQL binlog retention also needs explicit attention -- similar
-- in spirit to Part 08's Postgres WAL retention concern, but
-- governed by expire_logs_days / binlog_expire_logs_seconds rather
-- than a replication-slot mechanism. Too short a retention window
-- risks the binlog Debezium needs being purged before it catches up
-- after an outage; too long wastes disk on an otherwise healthy setup.`}
        </CodeBox>
        <SubTitle>SQL Server — CDC must be explicitly enabled per table</SubTitle>
        <Para>
          Unlike Postgres's WAL or MySQL's binlog, which exist by default as part of normal database
          operation, SQL Server's Change Data Capture feature is off by default and must be explicitly
          enabled, both at the database level and per individual table Debezium needs to capture. This is
          an extra deployment step MySQL and Postgres do not require, and it is a common source of "the
          connector is running but producing nothing" confusion — the connector can be correctly configured
          and still capture zero changes if CDC was never turned on for the specific table in SQL Server
          itself.
        </Para>
        <CodeBox label="enabling SQL Server CDC — a database-side step Debezium's connector config alone cannot replace">
{`-- Enable CDC at the database level (once per database):
EXEC sys.sp_cdc_enable_db;

-- Enable CDC for a specific table (once per table Debezium needs):
EXEC sys.sp_cdc_enable_table
  @source_schema = N'dbo',
  @source_name   = N'orders',
  @role_name     = NULL;

-- Only after both of these succeed does SQL Server begin
-- populating the change tables Debezium's SQL Server connector
-- actually reads from -- the Debezium connector config itself has
-- no way to turn this on from the Kafka Connect side.`}
        </CodeBox>
        <Table
          headers={['Database', 'Prerequisite before Debezium can capture anything', 'Retention/cleanup concern to monitor']}
          rows={[
            ['PostgreSQL', 'Logical replication enabled (wal_level=logical) and a replication slot created', 'Replication slot WAL retention — Part 08\'s central risk'],
            ['MySQL', 'binlog_format=ROW, binary logging enabled', 'Binlog expiry window (expire_logs_days) — too short risks data loss if Debezium falls behind'],
            ['SQL Server', 'CDC explicitly enabled at database and table level', 'SQL Server\'s own CDC cleanup job retention window for change tables'],
          ]}
        />
        <Callout title="The 'connector is RUNNING but no data is flowing' failure mode has a different root cause per database" color="#ff4757">
          A healthy-looking connector task status does not guarantee change capture is actually working —
          for SQL Server specifically, forgetting the per-table CDC enable step produces exactly this
          symptom, since the connector itself has nothing wrong with its own configuration; the database
          simply is not producing anything for it to read. Diagnosing "no data flowing" on a Debezium
          connector should always start with confirming the database-side prerequisite for that specific
          database engine, not just the connector's own Connect-side status.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 13 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Debezium vs. Hand-Rolled CDC vs. Vendor ETL" />
        <SectionTitle>When Debezium Is the Right Tool, and When It Genuinely Isn't</SectionTitle>
        <Para>
          Not every team that needs to move database changes into Kafka should deploy Debezium themselves.
          It is worth being explicit about the alternatives and where each one actually fits, rather than
          treating Debezium as the automatic answer to every CDC requirement.
        </Para>
        <SubTitle>Hand-rolled CDC — reading the log yourself</SubTitle>
        <Para>
          It is technically possible to write a custom application that reads a database's WAL or binlog
          directly, without Debezium, using the same underlying replication protocols Debezium itself uses.
          This is rarely the right choice: it means re-implementing snapshot handling, offset tracking,
          schema mapping, and the specific quirks of each database's logical decoding format from scratch —
          exactly the repetitive, error-prone integration work the Kafka Connect module's Part 01 described
          Connect itself as existing to eliminate. Hand-rolled CDC is occasionally justified for a database
          engine Debezium does not support at all, or a highly specialized capture requirement no existing
          connector covers — but it should be a deliberate last resort, not a default.
        </Para>
        <SubTitle>Fully managed CDC-as-a-service — Fivetran, Airbyte, and similar</SubTitle>
        <Para>
          Vendors like Fivetran (fully managed, closed-source) and Airbyte (open-source with a managed cloud
          offering) provide CDC as a hosted product, typically aimed at moving data directly into a data
          warehouse rather than into a Kafka topic a team then consumes with its own applications. These
          tools solve a meaningfully different problem than Debezium-on-Kafka-Connect: they are optimized
          for "get database changes into Snowflake/BigQuery/Redshift with minimal setup," not "give me a
          real-time, replayable Kafka topic that many independent internal consumers can build applications
          against."
        </Para>
        <Table
          headers={['Approach', 'Best fit', 'Trade-off']}
          rows={[
            ['Debezium on Kafka Connect (this module)', 'Real-time, replayable Kafka topics feeding multiple independent internal services and applications — the outbox pattern, event-driven architectures, stream processing', 'Requires operating Kafka Connect (or a managed Connect offering) and understanding the operational risks in Part 08 and Part 11'],
            ['Fivetran / Airbyte-style managed CDC', 'Getting database changes into a data warehouse with minimal engineering setup, when Kafka itself is not otherwise part of the architecture', 'Not designed as a general-purpose event bus for multiple internal application consumers — it is a warehouse-loading tool, not a Kafka topic producer, in its primary use case'],
            ['Hand-rolled log reader', 'A database engine with no existing Debezium connector, or a narrow, unusual capture requirement', 'Reimplements snapshot handling, offset tracking, and log-decoding logic that Debezium has already solved and battle-tested'],
          ]}
        />
        <Callout title="These tools are not always mutually exclusive within the same company" color={K}>
          It is common for one team to run Debezium against a specific operational database specifically
          because downstream services need real-time, replayable Kafka topics — the outbox pattern from
          Part 09, or a fraud-detection consumer that needs sub-second latency — while a separate analytics
          team, needing the same underlying source data in a warehouse for BI dashboards, uses a
          Fivetran-style tool independently, or consumes the Kafka topic Debezium already produces via a
          sink connector into the warehouse rather than running a second, separate CDC pipeline against the
          same source database.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 14 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Testing a Debezium Pipeline Before Production" />
        <SectionTitle>Validating a Debezium Connector Before It Touches a Production Database</SectionTitle>
        <Para>
          Because Debezium sits directly on top of a production database's replication mechanism, a
          misconfigured connector is not a purely Kafka-side risk the way a misconfigured hand-written
          producer would be — it can hold open a replication slot against a production database (Part 08)
          or run an unplanned full-table snapshot (Part 06) against live infrastructure. A short, deliberate
          validation pass before first deploying against production data catches most of the mistakes this
          module has covered.
        </Para>
        <BulletList
          items={[
            'Validate against a staging or replica database first — confirm the connector configuration, table include/exclude lists, and SMT chain (Part 04) produce the expected envelope shape before pointing at production.',
            'Deliberately test the delete path — insert, update, then delete a test row, and confirm the resulting op="d" event and consumer-side handling (Part 05) behave as expected; the create and update paths are far more commonly tested than delete, and delete handling is where Part 05\'s Error Library entry shows up most often.',
            'Confirm snapshot.mode is set deliberately, not left at a default assumed without checking — verify whether the pipeline actually needs the initial snapshot (Part 06) before the first production deployment, since this is a one-time decision that is awkward to reverse after the fact.',
            'Set up the replication slot lag alert (Part 11) before, not after, the first production deployment — this is the single highest-consequence monitoring gap to close early, given Part 08\'s failure mode.',
            'Load-test the initial snapshot against a production-sized (or realistically sized) copy of the table, if the real table is large — to understand the actual snapshot duration and throughput impact before it happens against the real production table.',
          ]}
        />
        <CodeBox label="a minimal smoke test script — confirming the envelope shape end to end">
{`# 1. Insert a row, confirm op="c" arrives with the expected 'after'
INSERT INTO orders (order_id, status) VALUES (999001, 'pending');

# 2. Update it, confirm op="u" arrives with correct 'before' and 'after'
UPDATE orders SET status = 'paid' WHERE order_id = 999001;

# 3. Delete it, confirm op="d" arrives with 'after' null and
#    'before' populated -- this is the path most often skipped
DELETE FROM orders WHERE order_id = 999001;

# 4. Confirm the consumer under test correctly upserts on c/u/r
#    and deletes on d, per the Part 05 worked example -- not just
#    that events arrive, but that downstream handling is correct`}
        </CodeBox>
        <Callout title="A staging validation pass is cheap; an orphaned production replication slot is not" color={K}>
          The cost of a short validation pass against staging or a replica — typically a few hours of setup
          — is small relative to the cost of discovering a misconfiguration against production data, whether
          that is an unexpected full-table snapshot at peak traffic or a slot growth incident that was not
          caught until disk pressure was already a live production concern.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About CDC and Debezium</SectionTitle>
        {[
          {
            wrong: '"CDC just means polling a table more often, or on a shorter interval"',
            right: 'Part 02 is explicit that no polling interval, however short, solves the delete-visibility problem or the collapsed-intermediate-update problem. CDC\'s defining property is reading the transaction log directly, not querying tables faster — the mechanism is different in kind, not just in frequency.',
          },
          {
            wrong: '"Debezium is a separate database replication tool you install and run independently of Kafka"',
            right: 'Part 01 and Part 03 are clear that Debezium is, in its standard deployment, a Kafka Connect source connector — it runs on Connect workers, is configured through the same REST API, and uses the same distributed-mode fault tolerance as any other connector from Module 13.',
          },
          {
            wrong: '"Debezium adds meaningful query load to the source database, since it\'s constantly reading from it"',
            right: 'Part 03 explains the opposite is true: Debezium reads a log the database already writes for its own replication purposes, and behaves like a replication client, not a repeated-query client. This is precisely what gives it near-zero impact on source database performance compared to polling.',
          },
          {
            wrong: '"If a Debezium connector is deleted or its infrastructure decommissioned, cleanup happens automatically"',
            right: 'Part 08 is the direct rebuttal: a Postgres replication slot is retained by the database until explicitly dropped, and infrastructure disappearing without an explicit DELETE /connectors call leaves an orphaned slot silently accumulating WAL until disk fills — one of the most consequential operational risks in this whole module.',
          },
          {
            wrong: '"The outbox pattern with Debezium is a workaround — a real system would use distributed transactions instead"',
            right: 'Part 09 frames it the other way around: outbox-plus-CDC turns a genuinely hard distributed-transactions problem into an ordinary single-database ACID transaction, which is simpler and more reliable than two-phase commit, not a lesser substitute for it — this is the pattern most production systems actually converge on.',
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
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Confluent (the company that employs many of Kafka's original creators, and
            increasingly the primary commercial sponsor of Debezium's ecosystem tooling):</strong> a
            customer's support ticket describes their production Postgres disk filling up over a weekend,
            no application deploy, no obvious cause. Confluent's field engineering team's first diagnostic
            question, before looking at anything else, is: "do you have an orphaned replication slot?" It is
            common enough — teams decommissioning old Connect clusters without first deleting the Debezium
            connectors running on them — that it is one of the first items on their standard CDC incident
            runbook, precisely because Part 08's failure mode is not theoretical; it is one of the most
            common real support escalations in CDC deployments across the industry.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Fivetran (a data-integration company whose product overlaps directly with
            what this module teaches — moving database changes reliably into downstream systems):</strong>
            an engineer is reviewing a new customer's Postgres-to-warehouse pipeline design and flags that
            the customer's schema includes several tables with frequent column renames as part of an
            ongoing internal refactor. The engineer explains, in terms directly out of Part 10, that a
            column rename looks like a field disappearing and a new one appearing simultaneously in the
            captured change stream — and recommends the customer either freeze renames on CDC-tracked
            tables during active migration windows, or explicitly coordinate them with every downstream
            consumer, the same discipline any breaking API change would require.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Airbnb-scale internal tooling, or any company running its own CDC-to-search-index
            pipeline (the kind of infrastructure Airbyte, an open-source data integration platform,
            explicitly builds connectors to replace hand-rolled versions of):</strong> an incident review
            finds that a search index has been silently missing cancelled listings for weeks. The root
            cause: the original pipeline was a polling job, not CDC, and cancellations were implemented as
            hard deletes on the source table — exactly Part 02's Failure 1. The fix that gets shipped is a
            Debezium connector against the listings table, with the outbox pattern from Part 09 used for
            a separate, related event (listing status changes that also need to trigger email notifications)
            so that both the search index and the notification system are fed from the same reliable,
            delete-aware change stream instead of two separately fragile polling jobs.
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
            q: 'Q1. Why would you choose Debezium-based CDC over a scheduled polling job for keeping a downstream system in sync with a database table?',
            a: `The core reason is that polling has structural blind spots that no polling interval can fix, not just performance ones. As Part 02 covers, a "SELECT WHERE updated_at > last_checkpoint" style query cannot see deletes at all — a deleted row simply has nothing left to select — and it collapses any row that changed more than once within a polling window down to only its final value, silently dropping every intermediate state.

Debezium avoids both problems because it reads the database's write-ahead log or binlog directly, rather than querying tables — the same log the database already writes for its own replication purposes. Every committed change, including deletes, produces its own event with full before/after state, in the order it actually happened.

The secondary reason is load: because Debezium behaves like a replication client rather than a repeated-query client, it adds near-zero query load to the source database, which matters a lot for a busy production table where a polling job would otherwise compete with live traffic for query capacity.`,
          },
          {
            q: 'Q2. Walk me through what happens, mechanically, when a Debezium Postgres connector is started for the very first time against an existing, populated table.',
            a: `It happens in two distinct phases, covered in Part 06. First is the snapshot phase: Debezium performs a consistent read of the table's current contents and produces one event per existing row, with op set to "r" for read — these events have only an after state, since they are not describing a change, just the row's current state at snapshot time.

Once the snapshot completes, Debezium switches to the streaming phase, reading the WAL from the exact log position that corresponds to where the snapshot was taken, so no change is missed or double-counted in the handoff. From that point forward, every insert, update, and delete produces a "c", "u", or "d" event with full before/after state.

The operational nuance worth mentioning: for a very large table, the snapshot phase is a real burst of load — a full table read on the source, and a throughput spike on the destination topic — so for large tables I'd think about running it during a lower-traffic window and monitoring replica lag if the snapshot is sourced from a read replica.`,
          },
          {
            q: 'Q3. A team\'s Postgres disk usage is growing steadily with no obvious application-level cause. What would you check, given that they run Debezium?',
            a: `The first thing I'd check is pg_replication_slots for an orphaned or lagging replication slot. This is the single highest-stakes operational risk covered in Part 08: Postgres will not reclaim WAL that a replication slot has not yet acknowledged as consumed, no matter how much disk space that requires. If a Debezium connector stopped running — because its Connect cluster was decommissioned, or the connector crashed and was never restarted, or was deleted from Connect without also dropping the underlying slot — Postgres keeps accumulating WAL against that slot indefinitely.

The fix, once identified, is to explicitly drop the orphaned slot (or properly delete the Debezium connector through the Connect REST API, which triggers a clean slot drop) rather than just adding more disk, which only delays the same failure.

Prevention is the more important half of the answer: alert directly on replication slot lag in WAL bytes, and also alert on slot existence with no active consuming connection, since a truly orphaned slot with nobody reading from it can otherwise go unnoticed by lag-only monitoring.`,
          },
          {
            q: 'Q4. What is the outbox pattern, and how does Debezium make it work in practice?',
            a: `The outbox pattern solves the dual-write problem — a service needing to both update its own database and publish a corresponding event, where those are normally two separate systems with no shared transaction, so a crash between them leaves them inconsistent.

The outbox pattern turns this into a single-system problem: instead of writing to the database and separately calling a Kafka producer, the service writes the business data change and a row describing the event into an outbox table, both inside the same database transaction. Since it's one ACID transaction, both commit together or neither does — there's no window of inconsistency.

Debezium is what makes the pattern practical rather than theoretical: it captures changes to the outbox table exactly like it would capture changes to any other table, turning each new outbox row into a Kafka event reliably, using the same log-based mechanism covered throughout this module. Debezium even has a dedicated Single Message Transform, the outbox event router, that unwraps the outbox row's structure into a clean domain event on an appropriately named topic.`,
          },
          {
            q: 'Q5. How does schema evolution work differently for a Debezium-backed topic compared to a topic written by a hand-written application producer?',
            a: `With a hand-written producer, the team writing to the topic controls exactly when the schema changes, because the schema change and the producer deploy are the same event — they can coordinate compatibility checks and rollout timing deliberately.

With Debezium, the schema of the topic tracks the schema of the source table directly and automatically, as Part 10 covers. The moment a database migration runs — adding a column, renaming one, changing a type — the very next captured row reflects that change, whether or not any downstream consumer or the Schema Registry's compatibility rules were prepared for it. A column rename in particular looks like one field disappearing and an unrelated new field appearing simultaneously from a consumer's point of view, which is a breaking change for anyone deserializing by field name.

Because of this, I'd treat a Debezium-tracked table's schema with the same discipline as a public API contract — using Schema Registry compatibility enforcement so a breaking migration is rejected at registration time rather than silently breaking every downstream consumer, and coordinating renames or type changes with consuming teams ahead of the migration rather than treating it as a purely internal database change.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
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
            q: 'Decommissioning the Connect cluster a Debezium connector runs on without first deleting the connector',
            a: 'Part 08 covers this as the most consequential operational mistake in this module: the replication slot the connector owns on Postgres is not tied to the Connect cluster\'s lifecycle. It has to be explicitly dropped, either by deleting the connector through the REST API first, or by manually dropping the slot on the database — otherwise it silently accumulates WAL until the disk fills.',
          },
          {
            q: 'Setting snapshot.mode to "never" without realizing existing rows will be permanently absent from the topic',
            a: 'Part 06 is explicit that skipping the snapshot means only changes after the connector starts ever appear — every row that existed before that moment is simply missing. This is fine if consumers genuinely only need future changes, and a real problem if they need a complete current-state picture.',
          },
          {
            q: 'Treating a database column rename or type change as a purely internal migration with no downstream coordination',
            a: 'Part 10 and Interview Prep Q5 both make the same point: a Debezium topic\'s schema is coupled directly to the source table\'s schema, so a rename or retype is effectively a breaking API change for every downstream consumer of that topic, and deserves the same coordination discipline.',
          },
          {
            q: 'Solving the dual-write problem with retry logic or a distributed transaction coordinator instead of the outbox pattern',
            a: 'Part 09 frames outbox-plus-Debezium as the simpler, more reliable answer — an ordinary single-database ACID transaction, captured by CDC, rather than a genuinely hard distributed-transactions problem. Reaching for two-phase commit or best-effort retries is usually solving a harder version of a problem that has a simpler standard fix.',
          },
          {
            q: 'Assuming Debezium query-polls the source database the way a JDBC source connector does',
            a: 'Part 03 is explicit that Debezium reads the database\'s own write-ahead log or binlog, behaving like a replication client, not a repeated-query client. Conflating the two leads to unnecessary worry about query load that Debezium\'s actual mechanism does not create — and, in the other direction, to underestimating the very real replication-slot risk that a polling connector does not share.',
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
            error: `Postgres disk usage climbs steadily over days with no corresponding growth in application data — eventually the database refuses writes cluster-wide`,
            cause: 'A Debezium connector\'s replication slot is no longer being consumed from — the connector crashed, was orphaned by an infrastructure migration, or was deleted from Connect without the slot itself being dropped — but Postgres continues retaining every WAL segment since the slot\'s last acknowledged position, exactly as the replication protocol requires it to.',
            fix: 'Query pg_replication_slots to find the stale slot, confirm it has no active connector consuming from it, and drop it explicitly (pg_drop_replication_slot). Going forward, always delete the Debezium connector through the Connect REST API before decommissioning its infrastructure, and alert on both slot lag and slot existence with no active consumer, per Part 08.',
          },
          {
            error: `A downstream search index or cache is missing records for entities that were deleted from the source table weeks ago`,
            cause: 'The original pipeline feeding this downstream system was a polling job, not CDC — a query built around a last-modified timestamp column has no way to detect a row that no longer exists to be selected, so every hard delete on the source table was silently invisible to the pipeline from day one.',
            fix: 'Replace the polling job with a Debezium connector against the source table. Debezium\'s op="d" events carry an explicit before state and a null after, giving downstream consumers an unambiguous delete signal that polling structurally cannot provide, per Part 02 and Part 05.',
          },
          {
            error: `Every consumer of a Debezium topic starts throwing deserialization errors simultaneously, immediately following an unrelated database migration deploy`,
            cause: 'A migration renamed or changed the type of a captured column, and because Debezium\'s topic schema tracks the source table\'s schema directly and automatically, the very next captured row broke Avro compatibility for every consumer still using the old schema — with no application-level deploy on the Kafka side to correlate the timing to.',
            fix: 'Enforce Schema Registry compatibility rules (BACKWARD or FULL) on Debezium topics so an incompatible migration is rejected at registration time, before it reaches the topic. Going forward, coordinate schema-impacting migrations on CDC-tracked tables with downstream consuming teams the same way a breaking API change would be coordinated, per Part 10.',
          },
          {
            error: `A new Debezium connector produces millions of records in the first few minutes, saturating the destination topic and alarming on-call`,
            cause: 'This is the expected initial snapshot phase (Part 06), not a malfunction — snapshot.mode="initial" (the default) reads and produces one event per existing row in the captured table the first time the connector starts, which for a large table is a genuine burst of throughput on both the source read and the destination write.',
            fix: 'This is not a bug to fix so much as an event to plan for: run first-time snapshots of large tables during lower-traffic windows, ensure the destination topic and any downstream consumers can absorb a throughput spike, and distinguish this expected one-time burst from an ongoing throughput problem in monitoring so it does not trigger unnecessary incident response.',
          },
          {
            error: `A consumer materializing current state from a Debezium topic shows a row with stale or partially-updated data, even though the source table is correct`,
            cause: 'The consumer is not branching on the op field correctly — most commonly, treating every event as an upsert using after without checking for op="d", which means a deleted row\'s last known state (from before the delete) is never removed from the consumer\'s materialized view, since a delete event\'s after is null and was likely skipped or mishandled by upsert-only logic.',
            fix: 'Explicitly branch on op: upsert using after for "c", "u", and "r" (snapshot read) events, and delete using the row\'s key (available even when after is null, since before still has it) for "d" events, per Part 05\'s worked consumer example.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways items={[
        'CDC captures every row-level insert, update, and delete as an individual event, in order — polling only captures net differences observed at a fixed interval, silently missing deletes and collapsing intermediate updates.',
        'Debezium reads the database\'s own write-ahead log (Postgres via pgoutput) or binary log (MySQL) directly, rather than querying tables — this is what gives it near-zero impact on the source database and complete delete visibility.',
        'Debezium runs as a Kafka Connect source connector in distributed mode, configured through the same REST API, sharing the offset-tracking, rebalancing, and error-handling model covered for Connect generally.',
        'Every Debezium event has the same envelope: before, after, source, and op ("c"/"u"/"d"/"r"). Consumers should branch explicitly on op — upserting on c/u/r, deleting on d using the before state since after is null.',
        'A connector first performs a one-time snapshot of existing table data (op="r" events), then switches to streaming live changes from the log — large-table snapshots deserve the same operational care as any large backfill.',
        'The outbox pattern — writing business data and an event description in the same database transaction, then letting Debezium capture the outbox table — is the standard, reliable fix for the dual-write problem.',
        'A Postgres replication slot is retained by the database until explicitly dropped. An orphaned or lagging slot causes unbounded WAL growth that can fill disk and take down writes for every table on the instance — monitor slot lag and slot existence directly.',
        'A Debezium topic\'s schema tracks the source table\'s schema automatically and immediately — a column rename or type change is a breaking change for every downstream consumer the moment the migration runs, and deserves the same coordination as a breaking API change.',
      ]} />
    </LearnLayout>
  )
}
