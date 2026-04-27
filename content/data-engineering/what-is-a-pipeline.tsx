import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is a Data Pipeline? Anatomy and Design Principles — Data Engineering | Chaduvuko',
  description:
    'What a data pipeline actually is, its anatomy from source to sink, the design principles that separate reliable pipelines from fragile ones, and the patterns every senior engineer applies.',
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

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function WhatIsAPipelineModule() {
  return (
    <LearnLayout
      title="What is a Data Pipeline? Anatomy and Design Principles"
      description="The anatomy of every pipeline, the design principles that make them reliable, and the patterns that separate good from fragile."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Precise Definition ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Precise Definition" />
        <SectionTitle>What a Data Pipeline Actually Is</SectionTitle>

        <Para>
          The term "data pipeline" gets used loosely — sometimes to mean a single
          Python script, sometimes to mean an entire data platform, sometimes to
          mean a Kafka stream. Before building pipelines professionally, you need
          a precise mental model of what a pipeline is, what it consists of, and
          what distinguishes a well-designed pipeline from a fragile one.
        </Para>

        <Para>
          A data pipeline is a system that moves data from one or more sources to
          one or more destinations, performing transformations along the way.
          That definition has three parts: <strong>sources</strong> (where data
          originates), <strong>transformations</strong> (operations applied to
          data in transit), and <strong>sinks</strong> (where data lands).
          Everything else — orchestration, monitoring, error handling, retries —
          exists to make this movement reliable, repeatable, and observable.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The complete anatomy of a data pipeline
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {[
              { layer: 'Source', color: '#4285f4', desc: 'Where data originates — databases, APIs, files, streams, SaaS tools.' },
              { layer: 'Extraction', color: '#7b61ff', desc: 'The mechanism that reads data from the source — SQL query, API call, file read, CDC stream.' },
              { layer: 'Transformation', color: '#f97316', desc: 'Operations that change data — cleaning, typing, joining, aggregating, enriching.' },
              { layer: 'Loading', color: '#00e676', desc: 'Writing data to the destination — INSERT, upsert, file write, stream publish.' },
              { layer: 'Sink', color: '#facc15', desc: 'Where data lands — data warehouse, data lake, another database, a message queue.' },
              { layer: 'Orchestration', color: '#ff4757', desc: 'What runs the pipeline on a schedule and in the right order — Airflow, cron, dbt Cloud.' },
              { layer: 'Monitoring', color: '#00add4', desc: 'What tells you the pipeline ran, how long it took, and whether it succeeded.' },
            ].map((item) => (
              <div key={item.layer} style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: 12,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 4,
                }}>{item.layer}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          A pipeline is not defined by its technology. A 50-line Python script that
          reads from a PostgreSQL table and writes to S3 is a pipeline. A Spark job
          processing 10 TB of Kafka events is a pipeline. A dbt model that
          transforms Silver tables into a Gold aggregate is a pipeline. What makes
          all of them pipelines is the same structure: source → extract → transform
          → load → sink, with orchestration and monitoring around it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Pipeline Anatomy in Depth ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Anatomy in Depth" />
        <SectionTitle>Each Layer of the Pipeline — In Depth</SectionTitle>

        <SubTitle>Sources — where data comes from</SubTitle>

        <Para>
          Every pipeline starts with a source. The source determines what extraction
          approach is possible, what change detection mechanism is available, and
          what data quality guarantees you can rely on. Understanding the source
          deeply — its schema, its update frequency, its scale, its consistency
          model — is the first thing a data engineer does before designing any pipeline.
        </Para>

        <CodeBox label="The source taxonomy — what kinds of sources exist">{`SOURCE TYPE          EXAMPLES                    EXTRACTION APPROACH
─────────────────────────────────────────────────────────────────────────────
Relational DB        PostgreSQL, MySQL, Oracle   CDC (Debezium) or SQL incremental
Document DB          MongoDB, Firestore           Change Streams or scheduled export
Key-Value            Redis, DynamoDB             Snapshot (no built-in CDC)
Column-Family        Cassandra, HBase            Spark connector or CDC plugin
REST API             Stripe, Salesforce        HTTP pagination with cursor
Event Stream         Kafka, Kinesis, Pub/Sub     Kafka Consumer Group (streaming)
File Drop            SFTP, S3 landing zone       File event trigger or scheduled scan
SaaS Platform        Stripe, HubSpot, Shopify    Official connectors or REST API
Message Queue        RabbitMQ, SQS               Consumer subscription
Webhook              Payment events, IoT         HTTP endpoint + Kafka/DB write
Batch Export         Partner CSV files, reports  Scheduled SFTP/S3 poll

WHAT TO UNDERSTAND ABOUT EACH SOURCE:
  Schema:        What are the fields, types, and constraints?
  Cardinality:   How many rows? How fast does it grow?
  Change rate:   How many inserts/updates/deletes per hour?
  Latency need:  Does the business need real-time or batch is fine?
  Quality:       Is source data clean? Are there known gaps or inconsistencies?
  Access:        Read replica? Production only? Rate limited?
  History:       How far back can we pull? Is there a retention policy?`}</CodeBox>

        <SubTitle>Extraction — getting data out of the source</SubTitle>

        <Para>
          Extraction is the mechanism by which data moves from the source into the
          pipeline. The two fundamental extraction patterns are <strong>full extraction</strong>
          (read everything every time) and <strong>incremental extraction</strong>
          (read only what changed since the last run). The choice between them has
          enormous consequences for pipeline performance and source system load.
        </Para>

        <CodeBox label="Full vs incremental extraction — trade-offs and implementation">{`# ── FULL EXTRACTION ──────────────────────────────────────────────────────────
# Read every row in the source table on every run.
# Simple. Correct. Expensive at scale.

SELECT * FROM orders;               -- every row, every time

# When to use full extraction:
#   Small tables (< 1M rows, < 100 MB)
#   Tables that have no reliable "changed at" timestamp
#   Reference/dimension tables (product categories, store master)
#   When the source cannot be queried incrementally safely

# When NOT to use:
#   Large transaction tables (billions of rows)
#   High-velocity sources (thousands of inserts/minute)
#   Sources with rate limits or shared connection pools


# ── INCREMENTAL EXTRACTION (high-watermark) ───────────────────────────────────
# Read only rows created or modified since the last run.
# Requires a monotonically increasing column (timestamp or auto-increment ID).

-- Get all orders modified since the last checkpoint:
SELECT *
FROM orders
WHERE updated_at > '2026-03-16 06:00:00'   -- last successful run timestamp
  AND updated_at <= '2026-03-17 06:00:00'; -- current run timestamp

# Checkpoint management in Python:
import json
from pathlib import Path
from datetime import datetime, timezone

CHECKPOINT = Path('/data/checkpoints/orders.json')

def load_checkpoint() -> datetime:
    if CHECKPOINT.exists():
        data = json.loads(CHECKPOINT.read_text())
        return datetime.fromisoformat(data['last_updated_at'])
    return datetime(2020, 1, 1, tzinfo=timezone.utc)   # beginning of time

def save_checkpoint(ts: datetime) -> None:
    CHECKPOINT.write_text(json.dumps({'last_updated_at': ts.isoformat()}))

last_run = load_checkpoint()
current_run = datetime.now(timezone.utc)

# Extract rows modified between last_run and current_run:
rows = db.query(
    "SELECT * FROM orders WHERE updated_at > %s AND updated_at <= %s",
    (last_run, current_run),
)

# Only save checkpoint after successful write to destination:
write_to_destination(rows)
save_checkpoint(current_run)   # advance checkpoint only on success


# ── INCREMENTAL PITFALLS ──────────────────────────────────────────────────────
# 1. Late-arriving data: rows written with a past timestamp after the window closed
#    Solution: overlap windows by 30 minutes and use upsert at destination

# 2. Deletes: incremental queries only see modified rows, not deleted ones
#    Solution: CDC (Change Data Capture) — see Module 24

# 3. Clock skew: source DB clock differs from pipeline clock
#    Solution: always use the source DB's NOW() as the upper bound

# 4. No updated_at column: some tables have only created_at
#    Solution: use max(id) as watermark if auto-increment; otherwise full extract`}</CodeBox>

        <SubTitle>Transformation — the heart of the pipeline</SubTitle>

        <Para>
          Transformation is where raw source data becomes clean, typed, validated,
          business-ready data. Transformations range from trivial (renaming a column)
          to complex (computing 90-day cohort retention across billions of events).
          Every transformation in a pipeline is a business decision encoded in code —
          and every transformation is a potential source of bugs.
        </Para>

        <CodeBox label="The transformation taxonomy — every operation type">{`TRANSFORMATION TYPE    WHAT IT DOES                          EXAMPLE
─────────────────────────────────────────────────────────────────────────────
Type casting           Convert string to correct type        "380.00" → DECIMAL
Null handling          Replace, filter, or flag nulls        COALESCE(amount, 0)
Deduplication          Remove duplicate rows                 ROW_NUMBER() OVER (PARTITION BY id)
Filtering              Remove invalid/out-of-scope rows      WHERE status != 'test'
Normalisation          Standardise values                    LOWER(status), TRIM(name)
Enrichment             Add data from another source          JOIN to customers table
Aggregation            Compute metrics                       SUM, COUNT, AVG, PERCENTILE
Flattening             Expand nested structures              UNNEST(items), JSON extraction
Pivoting               Reshape wide-to-long or long-to-wide  PIVOT(status values)
Business rules         Apply domain logic                    IF amount > threshold THEN tier = 'high'
Anonymisation          Mask or hash PII for compliance       SHA256(email)
Window calculations    Running totals, moving averages       SUM OVER (PARTITION BY ... ORDER BY ...)

WHERE TRANSFORMATIONS HAPPEN:
  Python (Pandas/PySpark):  general-purpose, imperative, easy to test
  SQL/dbt:                  set-based, declarative, best for tabular data
  Spark:                    large-scale distributed, complex transformations
  Stream processors:        Flink, Spark Streaming — real-time transformations`}</CodeBox>

        <SubTitle>Loading — writing to the destination</SubTitle>

        <CodeBox label="Load patterns — full replace, append, upsert, and merge">{`# The loading pattern determines how new data interacts with existing data

# ── FULL REPLACE (TRUNCATE AND RELOAD) ───────────────────────────────────────
# Delete everything in the destination, reload from source.
# Simple. Safe. Only works for full extraction.
# Use for: small dimension tables, reference tables, daily full snapshots

BEGIN;
TRUNCATE TABLE silver.store_master;
INSERT INTO silver.store_master SELECT * FROM source_store_master;
COMMIT;

# Risk: window between TRUNCATE and INSERT where table is empty
# Fix: use a staging table + atomic swap:
CREATE TABLE silver.store_master_staging AS SELECT * FROM source_store_master;
ALTER TABLE silver.store_master_staging RENAME TO store_master_new;
ALTER TABLE silver.store_master RENAME TO store_master_old;
ALTER TABLE store_master_new RENAME TO store_master;
DROP TABLE silver.store_master_old;


# ── APPEND ONLY ───────────────────────────────────────────────────────────────
# Only add new rows. Never update or delete.
# Use for: event logs, immutable facts, audit trails

INSERT INTO silver.events (event_id, user_id, event_type, ts)
SELECT event_id, user_id, event_type, ts
FROM staging.events
WHERE ts > (SELECT MAX(ts) FROM silver.events);

# Risk: duplicates on rerun (if some rows already inserted)
# Fix: add UNIQUE constraint on event_id + use ON CONFLICT DO NOTHING


# ── UPSERT (INSERT OR UPDATE) ────────────────────────────────────────────────
# Insert new rows. Update existing rows if they changed.
# The workhorse of incremental loading.
# Use for: mutable entities (orders, customers, products)

-- PostgreSQL:
INSERT INTO silver.orders (order_id, status, amount, updated_at)
VALUES (%s, %s, %s, %s)
ON CONFLICT (order_id)
DO UPDATE SET
    status     = EXCLUDED.status,
    amount     = EXCLUDED.amount,
    updated_at = EXCLUDED.updated_at
WHERE silver.orders.updated_at < EXCLUDED.updated_at;
-- The WHERE clause prevents overwriting newer data with older data (important!)

-- Snowflake MERGE:
MERGE INTO silver.orders AS target
USING staging.orders AS source
ON target.order_id = source.order_id
WHEN MATCHED AND target.updated_at < source.updated_at THEN
    UPDATE SET status = source.status, amount = source.amount
WHEN NOT MATCHED THEN
    INSERT (order_id, status, amount, updated_at)
    VALUES (source.order_id, source.status, source.amount, source.updated_at);


# ── DELTA MERGE (for lakehouses) ─────────────────────────────────────────────
from delta.tables import DeltaTable

DeltaTable.forPath(spark, 's3://freshmart-lake/silver/orders').alias('target') \
    .merge(
        source    = staging_df.alias('source'),
        condition = 'target.order_id = source.order_id',
    ) \
    .whenMatchedUpdate(
        condition = 'target.updated_at < source.updated_at',
        set = {
            'status':     'source.status',
            'amount':     'source.amount',
            'updated_at': 'source.updated_at',
        },
    ) \
    .whenNotMatchedInsertAll() \
    .execute()`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — The Eight Design Principles ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Design Principles" />
        <SectionTitle>The Eight Design Principles of Reliable Pipelines</SectionTitle>

        <Para>
          Two pipelines can be functionally identical — they move the same data
          from the same source to the same destination — but have dramatically
          different reliability profiles. One fails once a month and recovers
          automatically in 15 minutes. The other fails weekly, requires manual
          intervention, and sometimes produces wrong data.
        </Para>

        <Para>
          The difference is design principles. These eight principles are what
          senior data engineers apply when designing pipelines and what they
          look for when reviewing pipeline code. Apply them and pipelines become
          reliable infrastructure. Ignore them and pipelines become technical debt.
        </Para>

        {[
          {
            num: '01',
            name: 'Idempotency',
            color: '#00e676',
            def: 'Running the pipeline multiple times with the same input produces the same result. No duplicates, no data loss, no different outcomes based on how many times it ran.',
            impl: 'Use upsert (ON CONFLICT DO UPDATE) instead of INSERT. Add UNIQUE constraints on business keys. Use fixed time windows as run parameters, not relative windows like "last 24 hours."',
            violated: 'A pipeline reruns after a failure and inserts duplicate rows because it uses plain INSERT without a conflict handler.',
          },
          {
            num: '02',
            name: 'Resumability',
            color: '#7b61ff',
            def: 'A pipeline that fails partway through can restart from where it stopped, not from the beginning. For a 10-hour pipeline, this means a failure after 9 hours retries the last hour, not all 10.',
            impl: 'Save checkpoint state after each successful unit of work (batch, page, file). Load checkpoint at startup. Organise work into independent units that can each be retried independently.',
            violated: 'A pipeline that processes 100 files restarts from file 1 if file 73 fails — wasting 72 files of work and potentially double-processing them if output was not idempotent.',
          },
          {
            num: '03',
            name: 'Observability',
            color: '#f97316',
            def: 'The pipeline\'s state is visible. You can answer: is it running? did it succeed? how many rows did it process? how long did it take? what failed and why?',
            impl: 'Structured logging with run_id, row counts, duration, and stage-level metrics. Write pipeline run metadata to a runs table. Emit metrics to a monitoring system. Alert on failure, SLA miss, and anomalous row counts.',
            violated: 'The pipeline writes "done" to a log file when finished. When it fails silently at row 50,000, no one knows for 6 hours until an analyst notices the dashboard is stale.',
          },
          {
            num: '04',
            name: 'Isolation',
            color: '#4285f4',
            def: 'One pipeline\'s failure does not affect other pipelines. One pipeline\'s heavy resource usage does not degrade others. Pipelines are independent units.',
            impl: 'Separate compute resources per pipeline (Spark cluster per job, not shared). Write to staging tables first, atomic swap to production. Use separate schemas/databases for each pipeline\'s work-in-progress.',
            violated: 'A heavy Spark job and a lightweight Python script share a single Airflow worker. The Spark job exhausts memory, the Python script fails with OOMKilled.',
          },
          {
            num: '05',
            name: 'Data Quality Enforcement',
            color: '#facc15',
            def: 'The pipeline validates data before writing it to the destination. Invalid data is rejected, quarantined, or flagged — never silently written to production tables where it corrupts downstream analysis.',
            impl: 'Schema validation (correct types, no unexpected nulls). Value range checks (amounts must be positive, dates must be in reasonable range). Row count checks (output row count within expected range of input). Write failures to a dead letter queue, not the destination.',
            violated: 'A vendor CSV with a corrupted column is loaded directly to the warehouse. The SUM(revenue) metric is wrong for the next 3 months before anyone notices.',
          },
          {
            num: '06',
            name: 'Source Isolation',
            color: '#00add4',
            def: 'The pipeline does not harm the source system. Analytical workloads run against replicas, not production databases. API calls respect rate limits. Batch extractions run during off-peak hours.',
            impl: 'Read from read replicas for relational databases. Stay within API rate limits with proactive throttling. Schedule heavy extractions during low-traffic hours (2–5 AM). Use incremental extraction to minimise source load.',
            violated: 'A data engineer runs a full table scan on a production PostgreSQL database during peak hours, polluting the buffer pool and slowing the application for 30 minutes.',
          },
          {
            num: '07',
            name: 'Atomicity at the Right Granularity',
            color: '#8b5cf6',
            def: 'Writes succeed completely or not at all for each logical unit. Partial writes that leave the destination in an inconsistent state are prevented.',
            impl: 'Wrap each batch in a transaction. For file systems, write to a temporary path first then rename atomically. For Delta Lake, each write is a transaction by default. Never commit a partial batch.',
            violated: 'A pipeline writes 50,000 rows in a loop with one INSERT per row and auto-commit. A failure after row 23,000 leaves 23,000 rows in the destination — a partial state that is hard to detect and clean.',
          },
          {
            num: '08',
            name: 'Minimal Footprint',
            color: '#ff4757',
            def: 'The pipeline reads only the data it needs, writes only what is required, and holds resources only as long as necessary. It does not hold database transactions open while doing external work.',
            impl: 'Use column projection (SELECT only needed columns, not SELECT *). Use incremental extraction instead of full extraction. Close database connections when not in use. Release locks promptly.',
            violated: 'A pipeline opens a database transaction, calls an external API that takes 45 seconds, then tries to commit. The open transaction held row locks for 45 seconds, blocking other queries.',
          },
        ].map((item) => (
          <div key={item.num} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  background: `${item.color}15`, border: `1px solid ${item.color}40`,
                  borderRadius: 4, padding: '2px 8px',
                }}>{item.num}</div>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)',
                }}>{item.name}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>
                {item.def}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{
                  background: 'var(--bg2)', borderRadius: 8, padding: '10px 14px',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>How to implement</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.impl}</div>
                </div>
                <div style={{
                  background: 'var(--bg2)', borderRadius: 8, padding: '10px 14px',
                  borderLeft: '2px solid rgba(255,71,87,0.4)',
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>What happens when violated</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.violated}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 04 — Pipeline Topologies ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Pipeline Topologies" />
        <SectionTitle>Pipeline Topologies — The Shapes Data Flows Take</SectionTitle>

        <Para>
          Real data platforms are not single linear pipelines. They are networks
          of pipelines with different shapes. Recognising the topology of a data
          flow immediately tells you its failure modes, its parallelism opportunities,
          and its monitoring requirements.
        </Para>

        <CodeBox label="Common pipeline topologies — shapes, examples, and properties">{`# ── LINEAR PIPELINE ───────────────────────────────────────────────────────────
# Source → Transform → Sink
# The simplest topology. One input, one output, sequential stages.

  [PostgreSQL orders] → [Python cleaner] → [S3 Bronze Parquet]

# Properties:
#   Simple failure model: one failure point, clear restart path
#   No parallelism between stages
#   Used for: simple batch ingestion, API-to-warehouse pipelines


# ── FAN-OUT PIPELINE ─────────────────────────────────────────────────────────
# One source, multiple sinks.
# Same data written to multiple destinations simultaneously or sequentially.

                        ┌→ [S3 data lake (Parquet)]
  [Kafka payments] ─────┤→ [PostgreSQL (OLTP write-through)]
                        └→ [Elasticsearch (search index)]

# Properties:
#   If one sink fails, others may succeed → inconsistency across sinks
#   Must decide: fail all if any fail, or allow partial success?
#   Used for: CDC fan-out, event-driven architectures, dual-write patterns


# ── FAN-IN PIPELINE ──────────────────────────────────────────────────────────
# Multiple sources, one sink.
# Data from different sources merged into one unified destination.

  [Stripe payments] ─┐
  [Square payments]    ─┤→ [UNION ALL] → [silver.all_payments]
  [Venmo payments]  ─┘

# Properties:
#   If one source fails, do you write partial data or wait for all sources?
#   Must dedup after union (same transaction ID from multiple sources?)
#   Used for: multi-source consolidation, polyglot persistence → unified lake


# ── DAG PIPELINE ─────────────────────────────────────────────────────────────
# Multiple stages with dependencies. Some stages can run in parallel.
# A Directed Acyclic Graph (DAG) — no cycles.

  [Extract orders] ─────┬──────────────────┐
  [Extract customers] ──┤→ [Silver orders] →┤→ [Gold daily revenue]
  [Extract restaurants] ─┘                  └→ [Gold customer LTV]

# Properties:
#   Stages without dependencies can run in parallel (faster)
#   A failed upstream stage blocks all downstream stages
#   This is exactly what Airflow DAGs model
#   Used for: dbt projects, complex multi-source transformations


# ── STREAMING PIPELINE ───────────────────────────────────────────────────────
# Continuous, event-driven. Data is processed as it arrives, not in batches.

  [Kafka topic: orders] → [Flink/Spark Streaming] → [Kafka topic: enriched_orders]
                                                   → [Cassandra (real-time store)]

# Properties:
#   No concept of "a run" — continuous execution
#   Failure means falling behind, not stopping completely (consumer lag)
#   State management is complex (windowing, watermarks)
#   Used for: real-time dashboards, fraud detection, CDC materialisation


# ── LAMBDA ARCHITECTURE (batch + streaming combined) ─────────────────────────
# Two paths: slow batch path for accuracy, fast streaming path for low latency.

  [Source data] ──┬─ [Batch (Spark, nightly)] ──────────→ [Batch layer (accurate)]
                  └─ [Streaming (Flink, real-time)] ──────→ [Speed layer (fast)]
                                                                     ↓
                                                         [Serving layer: merge both]

# Properties:
#   Complex to maintain: two codebases for same logic
#   Kappa architecture (streaming only) is the modern alternative
#   Used for: systems that need both historical accuracy and real-time freshness`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — ETL vs ELT vs EL ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — ETL vs ELT vs EL" />
        <SectionTitle>ETL vs ELT vs EL — Why the Order Matters</SectionTitle>

        <Para>
          The three-letter acronyms ETL, ELT, and EL describe where transformation
          happens in the pipeline. This is not a trivial naming distinction —
          the position of the transformation step determines what tools you use,
          who can see and change the transformation logic, and how you debug when
          data is wrong.
        </Para>

        <CompareTable
          headers={[
            { label: 'Pattern' },
            { label: 'Full name', color: '#00e676' },
            { label: 'Where transform happens', color: '#7b61ff' },
            { label: 'When to use', color: '#f97316' },
          ]}
          keys={['pattern', 'name', 'where', 'when']}
          rows={[
            {
              pattern: 'ETL',
              name: 'Extract → Transform → Load',
              where: 'Before loading. Data is cleaned and shaped BEFORE it reaches the destination. Python/Spark pipeline does the transformation.',
              when: 'Source data is sensitive (PII must be masked before landing), destination has strict schema enforcement, transformation is complex and requires Python/ML.',
            },
            {
              pattern: 'ELT',
              name: 'Extract → Load → Transform',
              where: 'After loading. Raw data lands in the warehouse/lake first, THEN SQL/dbt transforms it in place. The destination does the transformation work.',
              when: 'Modern data warehouse (Snowflake/BigQuery) is the compute engine. Transformation logic is primarily SQL. Analysts need access to raw data. Schema flexibility is needed at load time.',
            },
            {
              pattern: 'EL',
              name: 'Extract → Load (no transform)',
              where: 'No transformation. Raw data is landed exactly as received in the destination.',
              when: 'Landing zone / Bronze layer ingestion. Transformation happens later in a separate pipeline. Need to preserve the exact original data for audit, debugging, or reprocessing.',
            },
          ]}
        />

        <CodeBox label="ETL vs ELT — the same transformation done two different ways">{`# ── ETL: transform BEFORE loading (Python pipeline) ─────────────────────────

# Python pipeline does all transformation:
def etl_orders(source_conn, dest_conn):
    # Extract
    raw = pd.read_sql("SELECT * FROM orders WHERE updated_at > %s", source_conn)

    # Transform (Python/Pandas)
    raw = raw.drop_duplicates(subset=['order_id'])
    raw = raw[raw['amount'] > 0]
    raw['status'] = raw['status'].str.lower().str.strip()
    raw['created_at'] = pd.to_datetime(raw['created_at'], utc=True)
    raw['customer_city'] = raw['customer'].apply(lambda x: x.get('city'))  # flatten JSON
    raw = raw[raw['status'].isin(['placed','confirmed','delivered','cancelled'])]

    # Load — destination receives clean, typed data
    raw.to_sql('silver_orders', dest_conn, if_exists='append', index=False)


# ── ELT: load raw THEN transform with SQL/dbt ────────────────────────────────

# Step 1: EL — load raw data as-is
def extract_load_orders(source_conn, warehouse_conn):
    raw = pd.read_sql("SELECT * FROM orders WHERE updated_at > %s", source_conn)
    raw.to_sql('raw_orders', warehouse_conn, if_exists='append')  # load raw, no transforms

# Step 2: dbt model transforms the raw table inside the warehouse
# models/silver/orders.sql:
# WITH source AS (
#     SELECT * FROM {{ source('raw', 'orders') }}
# ),
# cleaned AS (
#     SELECT
#         order_id,
#         amount::DECIMAL(10,2),
#         LOWER(TRIM(status)) AS status,
#         created_at::TIMESTAMPTZ
#     FROM source
#     WHERE amount > 0
#       AND LOWER(status) IN ('placed','confirmed','delivered','cancelled')
#     QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1
# )
# SELECT * FROM cleaned;

# MODERN BEST PRACTICE (2026):
#   EL raw data into the lake/warehouse (Bronze layer)
#   dbt/SQL transforms it in place (Silver and Gold layers)
#   Python ETL only for: PII masking, ML feature engineering, complex flattening
#   Never transform in the extraction layer if the warehouse can do it`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Pipeline Failure Modes ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Failure Modes" />
        <SectionTitle>How Pipelines Fail — The Complete Taxonomy</SectionTitle>

        <Para>
          Every pipeline will fail. The question is not whether but when and how
          badly. Understanding the complete taxonomy of pipeline failures is what
          lets a data engineer design pipelines that fail gracefully, recover
          automatically, and alert clearly when human intervention is needed.
        </Para>

        <CodeBox label="Pipeline failure taxonomy — every way a pipeline can break">{`FAILURE CATEGORY      EXAMPLES                         DEFAULT BEHAVIOUR    CORRECT BEHAVIOUR
──────────────────────────────────────────────────────────────────────────────────────────────────
Source unavailable    DB connection timeout             Crash with error    Retry with backoff
                      API 503 Service Unavailable                           Alert if > N retries
                      SFTP server unreachable

Source data changed   New column added to source        Wrong data written   Schema validation
                      Column renamed in source API      silently             Alert + DLQ bad rows
                      Type changed (string → number)

Source data quality   NULL in required field            Wrong aggregations  Row-level validation
                      Negative amounts                  (silent!)           DLQ invalid rows
                      Duplicate primary keys                                Alert if DLQ fills up

Transformation bug    Wrong SQL logic                   Wrong data written   dbt tests catch before deploy
                      Off-by-one in date range          (no error!)          Code review
                      NULL propagation in calculation                        Data quality checks

Destination issue     Warehouse out of disk             Crash with error    Retry, then alert
                      Schema mismatch on write          Schema check fails  Schema validation before write
                      Table locked by another query     Timeout or deadlock Retry + timeout config

Resource exhaustion   OOM on large dataset              Crash               Chunked processing
                      Disk full mid-write               Corrupt output      Disk space checks before run
                      Rate limit on API sink            Throttling error    Proactive rate limiting

Infrastructure        Network partition                 Timeout             Retry with exponential backoff
                      Pod eviction (Kubernetes)         Mid-run failure     Resumable from checkpoint
                      Spot instance termination         Data corruption     SIGTERM handler + checkpoint

Orchestration         Dependency task failed            Downstream skipped  Explicit failure propagation
                      Wrong schedule (timezone bug)     Wrong time range    Fixed UTC schedule + monitoring
                      Concurrent runs overlap           Duplicate data      Lock file / mutex

SLA breach            Pipeline takes 4h instead of 1h  Late data in dash   Timeout + alerting
                      Source delivers data late         Late pipeline run    SLA monitoring, not just failure
                      Backfill job blocks daily run     Daily run delayed   Job priority management`}</CodeBox>

        <SubTitle>The pipeline health checklist</SubTitle>

        <Para>
          A pipeline is not just "running" or "not running." There are intermediate
          states that require attention: running too slowly (SLA risk), producing
          fewer rows than expected (data quality issue), or succeeding but writing
          wrong data (the most dangerous state because it produces no alert).
        </Para>

        <CodeBox label="Pipeline health metrics — what to measure on every run">{`# Write these metrics after every pipeline run to a runs table:

CREATE TABLE monitoring.pipeline_runs (
    run_id          UUID        PRIMARY KEY,
    pipeline_name   VARCHAR(100) NOT NULL,
    run_date        DATE        NOT NULL,
    started_at      TIMESTAMPTZ NOT NULL,
    finished_at     TIMESTAMPTZ,
    status          VARCHAR(20) NOT NULL,  -- 'running', 'success', 'failed', 'partial'
    rows_extracted  BIGINT,
    rows_written    BIGINT,
    rows_rejected   BIGINT,
    duration_seconds DECIMAL(10,2),
    error_message   TEXT,
    dlq_count       INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ALERT CONDITIONS (set up in monitoring tool):
-- 1. status = 'failed'                          → immediate alert
-- 2. duration_seconds > expected_duration * 2   → SLA warning
-- 3. rows_written < expected_rows * 0.8         → data quality alert
-- 4. rows_rejected > total_rows * 0.05           → data quality alert (>5% rejected)
-- 5. dlq_count > 100                            → investigate DLQ
-- 6. No row inserted for today at 8 AM          → pipeline did not run

-- DATA QUALITY CHECK after every run:
SELECT
    run_date,
    rows_written,
    LAG(rows_written) OVER (ORDER BY run_date) AS prev_day_rows,
    ABS(rows_written - LAG(rows_written) OVER (ORDER BY run_date))
    / NULLIF(LAG(rows_written) OVER (ORDER BY run_date), 0) AS pct_change
FROM monitoring.pipeline_runs
WHERE pipeline_name = 'orders_ingestion'
ORDER BY run_date DESC
LIMIT 30;
-- Alert if pct_change > 0.3 (30% day-over-day change is suspicious)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Pipeline vs Workflow vs DAG ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Terminology Clarity" />
        <SectionTitle>Pipeline vs Workflow vs DAG vs Job — Precise Terminology</SectionTitle>

        <Para>
          These terms are often used interchangeably but have distinct meanings
          in professional data engineering. Using them precisely in conversations,
          documentation, and code makes communication clearer.
        </Para>

        <CompareTable
          headers={[
            { label: 'Term' },
            { label: 'Precise meaning', color: '#00e676' },
            { label: 'Example', color: '#7b61ff' },
          ]}
          keys={['term', 'meaning', 'example']}
          rows={[
            {
              term: 'Task',
              meaning: 'The smallest unit of work — one atomic operation that succeeds or fails as a whole.',
              example: 'Run dbt model fct_orders. Extract one day of orders from API. Write one batch to S3.',
            },
            {
              term: 'Job',
              meaning: 'A single executable unit — a script, a Spark application, a dbt model run. One process, one purpose.',
              example: 'orders_ingestion.py — a Python script that runs once and exits. spark-submit process_events.jar.',
            },
            {
              term: 'Pipeline',
              meaning: 'A sequence of tasks or jobs that move data from source to sink. May be a single job or multiple jobs in sequence.',
              example: 'Extract orders → Bronze Parquet → Silver cleaning → Gold aggregation.',
            },
            {
              term: 'Workflow',
              meaning: 'A coordinated set of pipelines with dependencies, schedules, and error handling. A workflow defines what runs when and in what order.',
              example: 'The daily FreshCart workflow: ingest orders + customers + products, then run dbt Silver, then run Gold models.',
            },
            {
              term: 'DAG',
              meaning: 'Directed Acyclic Graph — the specific representation of a workflow as a graph where nodes are tasks and edges are dependencies. Used in Airflow.',
              example: 'An Airflow DAG with 12 tasks: 3 extraction tasks → 2 validation tasks → 4 dbt tasks → 3 alert tasks.',
            },
            {
              term: 'Orchestrator',
              meaning: 'The system that schedules and executes workflows — manages dependencies, retries, alerting, and history.',
              example: 'Apache Airflow, Prefect, Dagster, dbt Cloud, AWS Step Functions, GitHub Actions.',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 08 — Pipeline Code Quality ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Writing Pipeline Code" />
        <SectionTitle>What Good Pipeline Code Looks Like</SectionTitle>

        <Para>
          A pipeline that is correct but unreadable, untestable, and unmaintainable
          is a liability. Production pipelines run for years. The team that maintains
          them changes. The data engineer who wrote it three years ago is not
          available to explain why a particular branch condition exists. Good pipeline
          code is self-documenting, testable at every layer, and structured so that
          changes can be made safely.
        </Para>

        <CodeBox label="Good pipeline structure — the template every pipeline should follow">{`"""
orders_ingestion_pipeline.py

Daily orders ingestion: PostgreSQL source → S3 Bronze Parquet
Schedule: 06:00 AM IST daily (00:30 UTC)
Owner: data-team@freshmart.com
SLA: complete by 07:00 AM IST
Dependencies: none (first pipeline in daily DAG)

Idempotent: yes (upserts on order_id)
Resumable: yes (checkpoint per S3 partition written)
"""

# ── IMPORTS: clear separation of standard, third-party, local ─────────────────
import os
import json
import logging
import uuid
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from typing import Iterator

import psycopg2
import pyarrow as pa
import pyarrow.parquet as pq

# ── CONSTANTS: at the top, named, never magic numbers ─────────────────────────
BATCH_SIZE      = 100_000
TARGET_FILE_MB  = 512
CHECKPOINT_DIR  = Path('/data/checkpoints')
DLQ_DIR         = Path('/data/dlq')

# ── CONFIGURATION: from environment, validated at startup ─────────────────────
class Config:
    db_url:  str = os.environ['SOURCE_DB_URL']
    s3_path: str = os.environ['S3_OUTPUT_PATH']

# ── FUNCTIONS: each one does one thing, has a clear name ──────────────────────

def extract_orders(conn, run_date: date) -> Iterator[dict]:
    """
    Extract all orders for run_date from PostgreSQL.
    Uses run_date as the fixed window — idempotent for the same date.
    Yields one row at a time — constant memory regardless of volume.
    """
    start_ts = datetime(run_date.year, run_date.month, run_date.day, tzinfo=timezone.utc)
    end_ts   = start_ts + timedelta(days=1)

    with conn.cursor('orders_cursor') as cur:   # server-side cursor: streams rows
        cur.execute(
            "SELECT * FROM orders WHERE created_at >= %s AND created_at < %s",
            (start_ts, end_ts),
        )
        for row in cur:
            yield dict(zip([desc[0] for desc in cur.description], row))


def validate_row(row: dict) -> tuple[dict | None, str | None]:
    """
    Validate one order row. Returns (clean_row, None) or (None, error_reason).
    Pure function — no I/O, fully unit-testable.
    """
    if not row.get('order_id'):
        return None, 'missing_order_id'
    if (row.get('amount') or 0) <= 0:
        return None, f'invalid_amount: {row.get("amount")}'
    if row.get('status') not in ('placed', 'confirmed', 'delivered', 'cancelled'):
        return None, f'invalid_status: {row.get("status")}'
    return row, None


def write_parquet_batch(rows: list[dict], path: str) -> None:
    """Write a list of row dicts to a Parquet file. Single responsibility."""
    table = pa.Table.from_pylist(rows)
    pq.write_table(table, path, compression='zstd')


def run(run_date: date) -> dict:
    """
    Main pipeline function. Orchestrates extract → validate → load.
    Returns run statistics.
    """
    run_id  = str(uuid.uuid4())
    log     = logging.getLogger('orders_ingestion')
    stats   = {'run_id': run_id, 'rows_extracted': 0, 'rows_written': 0, 'rows_rejected': 0}

    log.info('Pipeline started', extra={'run_date': str(run_date), 'run_id': run_id})

    conn = psycopg2.connect(Config.db_url)
    batch: list[dict] = []
    chunk = 0

    try:
        for row in extract_orders(conn, run_date):
            stats['rows_extracted'] += 1
            clean, error = validate_row(row)

            if error:
                stats['rows_rejected'] += 1
                # Write to DLQ — do not crash the whole pipeline for one bad row
                with open(DLQ_DIR / f'orders_{run_date}_{run_id}.ndjson', 'a') as f:
                    f.write(json.dumps({'error': error, 'row': row}) + '\n')
                continue

            batch.append(clean)

            if len(batch) >= BATCH_SIZE:
                chunk += 1
                output_path = f'{Config.s3_path}/date={run_date}/part-{chunk:05d}.parquet'
                write_parquet_batch(batch, output_path)
                stats['rows_written'] += len(batch)
                log.info('Batch written', extra={'chunk': chunk, 'cumulative': stats['rows_written']})
                batch = []

        # Write final partial batch:
        if batch:
            chunk += 1
            output_path = f'{Config.s3_path}/date={run_date}/part-{chunk:05d}.parquet'
            write_parquet_batch(batch, output_path)
            stats['rows_written'] += len(batch)

    finally:
        conn.close()

    log.info('Pipeline complete', extra=stats)
    return stats


# ── ENTRY POINT: handles CLI arguments, calls run() ───────────────────────────
if __name__ == '__main__':
    import sys
    logging.basicConfig(level=logging.INFO, format='%(message)s')

    run_date = (
        date.fromisoformat(sys.argv[1])
        if len(sys.argv) > 1
        else date.today() - timedelta(days=1)
    )
    result = run(run_date)
    sys.exit(0 if result['rows_rejected'] / max(result['rows_extracted'], 1) < 0.05 else 1)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Auditing a Fragile Pipeline and Redesigning It</SectionTitle>

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
            Scenario — FreshCart · Pipeline audit task
          </div>

          <Para>
            You are asked to audit the existing orders pipeline and identify what
            is fragile about it. Here is the original pipeline code you inherit:
          </Para>

          <CodeBox label="Original fragile pipeline — find all the violations">{`# ORIGINAL PIPELINE (from a junior engineer two years ago)
import psycopg2
import pandas as pd

conn = psycopg2.connect("postgresql://admin:password123@prod-db-01:5432/orders")

df = pd.read_sql("SELECT * FROM orders", conn)        # PROBLEM 1
df['amount'] = df['amount'].astype(float)              # PROBLEM 2
df = df.dropna()                                       # PROBLEM 3
df.to_sql('silver_orders', warehouse_conn, if_exists='replace')  # PROBLEM 4
print("done")                                          # PROBLEM 5`}</CodeBox>

          <Para>
            <strong>Problem 1 — Full extraction every run:</strong> SELECT * FROM orders
            reads the entire orders table (currently 180 million rows) every morning.
            Takes 4 hours. Slows production database. No incremental pattern.
          </Para>

          <Para>
            <strong>Problem 2 — Silent type casting failure:</strong>{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>astype(float)</code>{' '}
            raises a ValueError and crashes the entire pipeline if any amount is a
            non-numeric string (which happens from a specific vendor once a week).
          </Para>

          <Para>
            <strong>Problem 3 — Silent data deletion:</strong>{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>dropna()</code>{' '}
            drops ALL rows containing ANY null value. Orders with a null promo_code
            (the majority) are silently deleted. Revenue metrics are wrong.
          </Para>

          <Para>
            <strong>Problem 4 — Truncate-and-replace every run:</strong>{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>if_exists='replace'</code>{' '}
            drops and recreates the entire table every run. The table is empty during
            the 4-hour run. Analysts see zero data all morning. No idempotency.
          </Para>

          <Para>
            <strong>Problem 5 — No logging, no observability:</strong> The only output
            is "done." No row counts, no timing, no run ID. When something goes wrong,
            there is no information to debug with.
          </Para>

          <Para>
            After applying the eight design principles, the pipeline becomes the
            structured, resumable, observable version shown in Part 08. It processes
            only yesterday's new orders (incremental), validates each row individually
            and sends failures to a DLQ (data quality enforcement), writes in batches
            with upserts (idempotency), logs structured metrics (observability), and
            takes 4 minutes instead of 4 hours (source isolation). Every principle
            has a direct, measurable impact.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a data pipeline and what are its key components?',
            a: `A data pipeline is a system that moves data from one or more sources to one or more destinations, applying transformations along the way. The pipeline reliably, repeatably, and observably executes this movement.

Every pipeline has the same core components regardless of complexity. The source is where data originates — a relational database, an API, a file drop, a message stream. Extraction is the mechanism that reads data from the source, which might be a SQL query, an HTTP request, a file read, or a CDC stream subscription. Transformation is any operation that changes the data — type casting, deduplication, filtering, joining to other tables, aggregating, or applying business logic. Loading is the write operation that places transformed data into the destination. The sink is the destination — a data warehouse, a data lake, another database, a Kafka topic.

Around these core components sit the operational layers that make the pipeline reliable: orchestration (what schedules and runs the pipeline and manages dependencies between pipelines), monitoring (what tells you the pipeline ran, how long it took, and whether the output is correct), error handling (what captures and routes failures without crashing the entire pipeline), and checkpointing (what allows the pipeline to resume from where it left off after a failure).

A mature pipeline is not just correct — it is also idempotent (safe to rerun), resumable (survives failures mid-run), observable (state is visible at all times), and respectful of its source system (does not harm production databases with analytical queries).`,
          },
          {
            q: 'Q2. What is the difference between ETL and ELT? Which is preferred in modern data engineering?',
            a: `ETL (Extract, Transform, Load) performs transformation before data reaches the destination. A Python or Spark pipeline reads from the source, cleans and reshapes the data in memory, and writes clean, typed data to the destination. The destination receives already-transformed data.

ELT (Extract, Load, Transform) lands raw data in the destination first, then performs transformation inside the destination using SQL. The data warehouse or data lake receives raw data, and a separate transformation step (typically dbt models) applies cleaning, typing, and business logic to produce clean tables within the same system.

Modern data engineering strongly prefers ELT for most workloads, for four reasons. First, modern cloud data warehouses (Snowflake, BigQuery, Redshift) have enormous compute capacity and can run SQL transformations on terabytes of data in seconds — there is no performance advantage to pre-transforming in Python. Second, ELT preserves raw data: since the raw data lands first, you can always reprocess it by re-running the transformation, which is impossible if the raw data was transformed and discarded in the ETL pipeline. Third, dbt (the dominant transformation layer) works on top of ELT — it version-controls SQL transformations, runs automated tests, and generates documentation from within the warehouse. Fourth, analysts and analytics engineers can see and modify the transformation logic in SQL without needing Python access or execution environments.

ETL remains appropriate when transformation must happen before data can be safely loaded — PII masking before raw data touches the warehouse, ML feature engineering that requires Python, complex JSON flattening, or transformations that require libraries unavailable in SQL.`,
          },
          {
            q: 'Q3. What does it mean for a pipeline to be idempotent and why is this property critical?',
            a: `An idempotent pipeline produces the same result whether it runs once or a hundred times with the same input parameters. Running it twice does not create duplicate rows. Running it after a failure and a successful retry does not produce a different dataset than if it had succeeded on the first attempt. The output is deterministic and collision-free.

Idempotency is critical because pipeline failures and reruns are not exceptions — they are routine operational events. Network timeouts, database connection failures, API rate limits, infrastructure restarts, and bugs that require reprocessing all result in pipelines being re-executed. A pipeline that is not idempotent turns each of these routine events into a data quality incident: duplicate records inflate metrics, partial states cause inconsistencies, and manual cleanup is required before normal operation can resume.

Achieving idempotency requires two things. First, use upsert operations (INSERT ... ON CONFLICT DO UPDATE) rather than plain INSERT, combined with a UNIQUE constraint on the business key. This ensures that re-inserting a record that already exists updates it to the correct state rather than creating a duplicate. Second, use fixed, deterministic parameters for extraction windows. A pipeline parameter of run_date=2026-03-17 always extracts the same date range, whether it runs at 6 AM or is re-run at 4 PM. Relative windows like "last 24 hours" produce different results depending on when the pipeline runs, making reruns non-idempotent.

In practice, idempotent pipelines are dramatically easier to operate: you can rerun any failed pipeline at any time without checking whether partial data was written, without cleaning up the destination first, and without worrying about duplicate effects.`,
          },
          {
            q: 'Q4. A pipeline has been running successfully for six months and suddenly starts producing incorrect aggregation results. No code was changed. How would you diagnose this?',
            a: `Silent data correctness failures — no error, pipeline reports success, but the output is wrong — are the hardest class of pipeline problems to diagnose. When no code changed, the issue is almost certainly in the data itself or the environment around the pipeline.

My diagnostic sequence would be the following.

First, identify when the problem started. Compare the current wrong output to historical correct output to find the first date where the values diverge. This narrows the possible causes to events that occurred around that date.

Second, check for source schema changes on or before that date. A new column added upstream, a column renamed, or a data type changed — any of these can silently change pipeline behaviour. Query information_schema.columns or ask the source team for their schema change log around that date.

Third, check for data volume anomalies. Run the pipeline's row count against the source for the affected date range and compare to a known-good reference period. A sudden drop in row count (rows being filtered that previously were not) or a sudden increase (rows being duplicated that previously were not) points to a filtering or join condition change.

Fourth, check the distribution of key columns. If the pipeline aggregates by status, check whether a new status value appeared that the pipeline's WHERE clause excludes. If there are new NULL values in a column previously free of NULLs, check how NULLs affect the aggregation.

Fifth, check for infrastructure changes — database version upgrades, library version changes in the pipeline environment, timezone configuration changes on the server. These can silently change how date arithmetic, string comparison, or numeric precision works.

The common root causes: a source team added a new category value that existing filters silently excluded, a null appeared in a column used in a non-null-safe aggregation, or a timezone configuration change shifted date boundaries.`,
          },
          {
            q: 'Q5. What is the difference between a pipeline and a DAG?',
            a: `A pipeline is a logical concept — a system that moves data from a source to a destination through a sequence of transformations. It describes what the data flow does.

A DAG (Directed Acyclic Graph) is a mathematical structure used to represent the dependencies between tasks in a workflow. Each node in the DAG is a task, and each directed edge represents a dependency — this task must complete before that task can start. "Acyclic" means there are no circular dependencies: no task depends on itself, directly or indirectly.

In Apache Airflow — the dominant workflow orchestration tool in data engineering — a DAG is the code representation of a workflow. Each Airflow DAG defines a set of tasks and their dependencies, a schedule for when to run, and configuration for retries, timeouts, and alerting. A single Airflow DAG often orchestrates multiple pipelines — for example, the daily FreshCart DAG might contain tasks for extracting orders, extracting customers, running dbt Silver models, running dbt Gold models, and sending a completion notification. Each of these tasks is a pipeline (or part of one), and the DAG defines their execution order and dependency relationships.

The distinction matters practically: a pipeline can exist without a DAG (a cron job running a Python script has no DAG representation), and a DAG can contain many pipelines. When engineers say "the DAG failed," they usually mean a specific task within the Airflow DAG failed, not the entire data flow. When they say "the pipeline is slow," they usually mean the data processing logic is slow, independent of how it is scheduled. Using the terms precisely prevents confusion during incident response.`,
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Pipeline succeeds but row count in destination is 30% lower than source — no error raised, no rows in DLQ`,
            cause: 'A silent filter is removing rows. The most common culprit is a dropna() call or a WHERE clause condition that filters out rows with NULL in a column that recently started receiving NULLs. The pipeline reports success because technically it ran without errors — it just filtered more rows than expected. This is why row count validation is part of every production pipeline.',
            fix: 'Add a row count check after every pipeline run: assert abs(rows_written - rows_extracted) / rows_extracted < 0.05, or alert when the ratio falls outside an expected range. Audit every filter in the transformation layer to verify it is intentional. Replace broad dropna() with column-specific null handling: df.dropna(subset=["order_id", "amount"]) drops only rows where these specific required columns are null, not rows with any null anywhere.',
          },
          {
            error: `Pipeline fails with "relation silver_orders does not exist" after running successfully in development — production uses a different schema`,
            cause: 'The pipeline hardcodes the table name without a schema qualifier, and the default search_path differs between the development and production database users. In development, the pipeline user\'s default schema is silver. In production, the default schema is public, and silver is a separate schema that must be explicitly qualified.',
            fix: 'Always use fully-qualified table names in pipeline code: silver.orders not orders. This is explicit, portable, and fails clearly if the schema does not exist. Set the search_path explicitly in the database connection: connection.cursor().execute("SET search_path = silver, public") immediately after connecting. Add a startup check that verifies the required schemas and tables exist before processing any data.',
          },
          {
            error: `Two pipeline instances ran simultaneously and produced duplicate rows — the pipeline does not have concurrency protection`,
            cause: 'The Airflow DAG did not have max_active_runs=1 set, or a manual backfill triggered while the scheduled run was already executing. Both instances extracted the same data, both wrote it with INSERT (not upsert), and both committed successfully — creating duplicates that now exist in the destination.',
            fix: 'Two complementary fixes are needed. First, prevent concurrent runs at the orchestration level: set max_active_runs=1 in the Airflow DAG definition. Second, make the pipeline idempotent so concurrent runs produce correct results even if they occur: change INSERT to INSERT ... ON CONFLICT (order_id) DO UPDATE. Add a UNIQUE constraint on order_id in the destination table. With both fixes, concurrent accidental runs are prevented AND if they do occur, the result is correct rather than corrupt.',
          },
          {
            error: `Checkpoint file is corrupt — pipeline fails with JSON decode error on startup and cannot resume`,
            cause: 'The pipeline was killed (SIGKILL or OOMKilled by Kubernetes) while writing the checkpoint file, leaving a partial JSON write on disk. The next run tries to load the checkpoint, fails to parse the incomplete JSON, and crashes before processing any data.',
            fix: 'Write checkpoint files atomically: write to a temporary file first, then rename to the final path. The rename operation is atomic on most filesystems. from pathlib import Path: tmp = checkpoint_path.with_suffix(".tmp"); tmp.write_text(json.dumps(data)); tmp.rename(checkpoint_path). On startup, add error handling: try: checkpoint = json.loads(path.read_text()) except (json.JSONDecodeError, FileNotFoundError): checkpoint = None; log.warning("Could not load checkpoint — starting from beginning"). Never crash the pipeline on a corrupt checkpoint — starting from scratch is safer than not running at all.',
          },
          {
            error: `dbt run succeeds but the Gold model has wrong totals — a Silver model it depends on also ran successfully`,
            cause: 'A transformation bug in the Silver model produces wrong intermediate values that do not trigger any test failures because the tests only check for nulls and uniqueness, not value correctness. The Gold model aggregates the wrong Silver data, producing wrong totals. This is the "pipeline succeeds but data is wrong" scenario — the most dangerous failure mode because no alert fires.',
            fix: 'Add value-correctness tests to dbt models, not just structural tests. For financial models: dbt_utils.accepted_range on revenue columns (must be positive), custom test that total Silver revenue matches total source revenue within 1%, row count test that Silver row count is within 5% of last 7 days average. For the immediate incident: identify the first date where the Silver values are wrong, revert the model change that caused it (git revert), run dbt for the affected date range to reprocess. Add the missing tests before re-merging the feature that caused the bug.',
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
        'A data pipeline moves data from sources to sinks through transformations. Every pipeline has the same anatomy: Source → Extraction → Transformation → Loading → Sink, with Orchestration and Monitoring around it. The technology changes; the anatomy does not.',
        'Extraction is either full (read everything, every run — simple, expensive) or incremental (read only changes since last run — efficient, requires a watermark column and checkpoint). Use incremental extraction for any table with more than a few million rows.',
        'Loading patterns: full replace (truncate + reload — simple, destination empty during run), append-only (INSERT for immutable events), upsert (INSERT ... ON CONFLICT DO UPDATE — the correct default for mutable entities). Always use upserts with a UNIQUE constraint on the business key.',
        'ETL transforms before loading — good for PII masking, complex Python logic. ELT loads raw then transforms with SQL/dbt inside the warehouse — the modern standard. Most teams in 2026 use ELT with dbt for transformations and raw data preserved in the landing zone.',
        'The eight design principles: Idempotency, Resumability, Observability, Isolation, Data Quality Enforcement, Source Isolation, Atomicity at the right granularity, Minimal Footprint. Apply all eight and pipelines become reliable infrastructure. Ignore them and they become fragile scripts.',
        'Idempotency is the most critical single principle. Achieved by: upserts not inserts, UNIQUE constraints on business keys, fixed time windows as parameters. An idempotent pipeline can be rerun at any time without causing data quality issues.',
        'The most dangerous pipeline failure is silent data incorrectness — the pipeline reports success but the data is wrong. Prevent it with row count validation after every run, value range checks in dbt tests, and comparing output row counts to source row counts.',
        'Pipeline topologies: linear (one source, one sink), fan-out (one source, multiple sinks), fan-in (multiple sources, one sink), DAG (multiple stages with dependencies). Each topology has different failure modes and parallelism opportunities.',
        'Write pipeline runs metadata to a monitoring table: run_id, pipeline_name, started_at, finished_at, status, rows_extracted, rows_written, rows_rejected, duration_seconds. Alert on failures, SLA breaches, and anomalous row counts — not just outright failures.',
        'A pipeline and a DAG are not the same thing. A pipeline is a data flow. A DAG is the dependency graph that orchestrates multiple pipelines or tasks. An Airflow DAG for the morning data platform may contain 15 tasks across 6 pipelines.',
      ]} />

    </LearnLayout>
  )
}