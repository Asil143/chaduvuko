import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Lakehouse Architecture — Data Engineering | Chaduvuko',
  description:
    'How the lakehouse converges the data lake and data warehouse — what it solves, how open table formats enable it, the ACID implementation, Unity Catalog, Apache Iceberg in practice, and when a lakehouse is the right choice.',
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

export default function LakehouseArchitectureModule() {
  return (
    <LearnLayout
      title="Lakehouse Architecture"
      description="How the lakehouse converges lake and warehouse, open table format mechanics, ACID on object storage, Unity Catalog, Iceberg in practice, and when to choose it."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Problem the Lakehouse Solves ────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem That Created the Lakehouse" />
        <SectionTitle>Why Two Systems Were Worse Than One</SectionTitle>

        <Para>
          Before the lakehouse, every serious data platform maintained two
          separate systems: a data lake for raw storage, ML training data, and
          large-scale batch processing, and a data warehouse for structured SQL
          analytics served to BI tools. This two-system architecture was expensive,
          inconsistent, and operationally complex in ways that compounded over time.
        </Para>

        <Para>
          The lakehouse is the architectural answer: a single storage layer with
          open table formats that adds warehouse-quality features — ACID
          transactions, schema enforcement, row-level updates, time travel —
          directly to the lake. One system. One copy of the data. Every engine
          that supports the open format can query it.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The two-system problem — what it cost
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
            {[
              {
                problem: 'Data duplication',
                color: '#ff4757',
                detail: 'The same data existed twice — once in the lake (raw/Silver), once in the warehouse (for analytics). Double storage cost. Double pipeline maintenance. Two versions of the truth to reconcile.',
              },
              {
                problem: 'ETL pipeline between systems',
                color: '#f97316',
                detail: 'A pipeline moved data from lake to warehouse daily. This pipeline had its own failure modes, its own schedule, its own lag. Analysts waited 8 hours for yesterday\'s data.',
              },
              {
                problem: 'Schema inconsistency',
                color: '#facc15',
                detail: 'Lake had the raw schema. Warehouse had a different transformed schema. When source systems changed, both needed updating independently — and got out of sync.',
              },
              {
                problem: 'ML and analytics separated',
                color: '#7b61ff',
                detail: 'ML engineers read from the lake (Spark, Python). Analysts queried the warehouse (SQL). Two teams, two systems, no shared data layer. Feature engineering done twice.',
              },
              {
                problem: 'Governance complexity',
                color: '#4285f4',
                detail: 'Access control, lineage, and data quality had to be managed separately in two systems. PII masked in the warehouse but exposed in the lake. Lineage broken at the lake-to-warehouse boundary.',
              },
            ].map((item) => (
              <div key={item.problem} style={{
                background: 'var(--bg2)', border: `1px solid ${item.color}25`,
                borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 6,
                }}>{item.problem}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          The lakehouse does not eliminate the warehouse entirely for every
          organisation. Snowflake, BigQuery, and Redshift remain excellent choices
          for structured SQL analytics at scale. The lakehouse is most compelling
          when an organisation needs ML and analytics on the same data, wants
          to avoid double storage costs, or is building a new platform without an
          existing warehouse investment to protect.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Lakehouse Architecture ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Lakehouse Architecture" />
        <SectionTitle>What the Lakehouse Architecture Looks Like</SectionTitle>

        <Para>
          A lakehouse is not a product — it is an architectural pattern. It
          consists of three components: cheap, durable object storage at the
          bottom; an open table format layer that adds ACID semantics and metadata
          management to the files on that storage; and multiple query engines on
          top that all speak the same table format protocol.
        </Para>

        <CodeBox label="Lakehouse architecture — components and their roles">{`LAKEHOUSE ARCHITECTURE (FreshMart example):

  ┌─────────────────────────────────────────────────────────────────┐
  │                    QUERY / COMPUTE LAYER                        │
  │                                                                 │
  │  Spark (batch + streaming)   Databricks SQL Warehouse           │
  │  Trino / Athena (ad hoc)     dbt (transformations)              │
  │  Flink (streaming)           TensorFlow / PyTorch (ML)          │
  │                                                                 │
  │  All engines speak the SAME table format protocol               │
  └──────────────────────────┬──────────────────────────────────────┘
                             │ reads/writes through table format API
  ┌──────────────────────────▼──────────────────────────────────────┐
  │                    OPEN TABLE FORMAT LAYER                      │
  │                                                                 │
  │  Delta Lake (Databricks)  │  Apache Iceberg  │  Apache Hudi     │
  │                                                                 │
  │  Provides:                                                      │
  │  ✓ ACID transactions         ✓ Time travel                      │
  │  ✓ Schema enforcement        ✓ Row-level DELETE/UPDATE          │
  │  ✓ Partition evolution       ✓ Data skipping / pruning          │
  │  ✓ Concurrent writer safety  ✓ Metadata management             │
  │                                                                 │
  │  Implemented as: transaction log + Parquet data files           │
  └──────────────────────────┬──────────────────────────────────────┘
                             │ raw files on object storage
  ┌──────────────────────────▼──────────────────────────────────────┐
  │                    OBJECT STORAGE LAYER                         │
  │                                                                 │
  │  AWS S3  │  Azure ADLS Gen2  │  Google Cloud Storage            │
  │                                                                 │
  │  - Petabyte-scale, cheap ($23/TB/month)                        │
  │  - 11 nines durability                                          │
  │  - All data stored as open-format Parquet files                 │
  │  - No vendor lock-in at storage level                           │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                    GOVERNANCE LAYER (cross-cutting)             │
  │                                                                 │
  │  Unity Catalog (Databricks)  │  Apache Polaris (open source)    │
  │  AWS Glue Data Catalog       │  Nessie (open source)            │
  │                                                                 │
  │  - Table discovery and registration                             │
  │  - Column-level access control                                  │
  │  - Data lineage across all engines                              │
  │  - Audit logging                                                │
  └─────────────────────────────────────────────────────────────────┘

KEY INSIGHT: every layer is replaceable.
  Replace Spark with Trino: same data, same governance, same ACID.
  Replace Delta Lake with Iceberg: change metadata format, same Parquet data.
  Replace S3 with ADLS: Iceberg adapts its path format.
  This composability is what the lakehouse pattern uniquely provides.`}</CodeBox>

        <SubTitle>Lake vs warehouse vs lakehouse — the three patterns today</SubTitle>

        <CompareTable
          headers={[
            { label: 'Property' },
            { label: 'Plain Lake', color: '#4285f4' },
            { label: 'Data Warehouse', color: '#7b61ff' },
            { label: 'Lakehouse', color: '#00e676' },
          ]}
          keys={['prop', 'lake', 'warehouse', 'lakehouse']}
          rows={[
            { prop: 'Storage cost', lake: 'Very low (S3)', warehouse: 'Higher (managed)', lakehouse: 'Very low (S3)' },
            { prop: 'ACID transactions', lake: 'No', warehouse: 'Yes', lakehouse: 'Yes (via open table format)' },
            { prop: 'Row-level updates', lake: 'No (partition overwrite)', warehouse: 'Yes', lakehouse: 'Yes (MERGE, UPDATE, DELETE)' },
            { prop: 'SQL analytics', lake: 'Limited (Presto/Athena)', warehouse: 'Excellent', lakehouse: 'Good (Databricks SQL, Trino)' },
            { prop: 'ML training', lake: 'Excellent (Spark, Python)', warehouse: 'Poor (no Spark native)', lakehouse: 'Excellent (Spark reads same tables)' },
            { prop: 'Streaming ingestion', lake: 'Yes (Spark Streaming)', warehouse: 'Limited', lakehouse: 'Yes (Spark Streaming → same tables)' },
            { prop: 'Schema enforcement', lake: 'No (schema-on-read)', warehouse: 'Yes (schema-on-write)', lakehouse: 'Yes (enforced at commit time)' },
            { prop: 'Time travel', lake: 'No (plain Parquet)', warehouse: 'Limited', lakehouse: 'Yes (transaction log versions)' },
            { prop: 'Open format', lake: 'Yes (Parquet)', warehouse: 'No (proprietary)', lakehouse: 'Yes (Parquet + open table format)' },
            { prop: 'Vendor lock-in', lake: 'Low', warehouse: 'High (Snowflake-specific SQL)', lakehouse: 'Low (open standards)' },
            { prop: 'Data duplication', lake: 'Single copy (no warehouse)', warehouse: 'Often double (lake + warehouse)', lakehouse: 'Single copy (no warehouse needed)' },
            { prop: 'Governance maturity', lake: 'Low (DIY)', warehouse: 'High (built-in)', lakehouse: 'Medium–High (Unity Catalog, Polaris)' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — ACID on Object Storage ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — ACID on Object Storage" />
        <SectionTitle>How Open Table Formats Implement ACID on Object Storage</SectionTitle>

        <Para>
          S3 is not a database. It has no transaction coordinator, no locking,
          no concept of "uncommitted writes." Two concurrent writers can overwrite
          each other's files silently. Object storage's atomicity guarantee is only
          at the level of a single object PUT. Getting ACID semantics on top of
          this requires careful protocol design — which is exactly what Delta Lake,
          Iceberg, and Hudi implement.
        </Para>

        <SubTitle>The transaction log as the source of ACID</SubTitle>

        <CodeBox label="How Delta Lake achieves ACID — the commit protocol">{`DELTA LAKE ACID IMPLEMENTATION:

The transaction log (_delta_log/) is the source of truth for table state.
Parquet data files are just bytes — they have no meaning without the log.
The log determines which files are part of the current table version.

ATOMICITY (all or nothing):
  Writer's steps:
    1. Write new Parquet files to the table directory (side effect-free)
       Files written: part-00001.parquet, part-00002.parquet
       These files EXIST on S3 but are INVISIBLE to readers — not in the log yet
    2. Write a new commit entry to _delta_log/000...042.json
       This is a SINGLE S3 PUT — an atomic operation
  If step 1 fails: no log entry written → files invisible → table unchanged
  If step 2 fails: log entry not written → files invisible → table unchanged
  If step 2 succeeds: both files visible simultaneously → atomic commit ✓

CONSISTENCY (schema enforced at every commit):
  Before writing log entry, Delta checks:
  - New data schema is compatible with table schema
  - Column types match (or schema evolution is explicitly allowed)
  - Required columns are not missing
  If schema check fails: log entry rejected → no data written → consistent ✓

ISOLATION (concurrent writers do not corrupt each other):
  Delta uses optimistic concurrency control:
    Writer A reads current table version: v41
    Writer B reads current table version: v41
    Writer A writes Parquet files, attempts to commit log entry v42
    Writer B writes Parquet files, attempts to commit log entry v42
    → S3 atomic PUT: only one can succeed (S3 does not have true CAS,
      Delta uses conditional PUT or atomic rename strategies per storage)
    Writer A succeeds → table is now v42
    Writer B detects conflict (log entry v42 already exists):
      → Checks if conflict is real (did A touch the same data?)
      → If appending non-overlapping partitions: REBASE and commit as v43
      → If touching overlapping partitions: ABORT and retry
  Result: only valid committed states are visible → isolation ✓

DURABILITY (committed data survives failures):
  S3 has 99.999999999% (11 nines) durability for stored objects.
  Once the log entry is committed (written to S3 successfully):
    The data is durable — S3's redundancy protects it.
  Log entries are immutable — once written, never modified.
  Recovery after failure: read the log from the beginning (or last checkpoint)
    to reconstruct the current table state ✓


ICEBERG'S APPROACH (slightly different mechanism):
  Instead of a sequential JSON log, Iceberg uses a tree of metadata files:
    metadata/
      v1.metadata.json        ← snapshot list, schema history, partition spec
      snap-001-manifest-list.avro  ← list of manifest files for this snapshot
    manifests/
      manifest-001.avro       ← list of data files and their statistics
    data/
      part-00001.parquet, ...

  COMMIT PROTOCOL:
    1. Write new data files (Parquet) — invisible until committed
    2. Write new manifest file listing new data files
    3. Write new manifest list referencing new manifest
    4. Atomically swap the metadata file pointer:
       v1.metadata.json → v2.metadata.json
       (catalog-level atomic pointer swap — varies by catalog implementation)
    5. If pointer swap succeeds: new snapshot is current state ✓

  KEY DIFFERENCE FROM DELTA:
    Iceberg uses a tree of metadata objects (not a sequential log)
    This enables better performance for very large tables (millions of files)
    — reading the manifest list is O(1) rather than scanning the full log`}</CodeBox>

        <SubTitle>Row-level deletes and updates — how MERGE works</SubTitle>

        <CodeBox label="MERGE, UPDATE, DELETE — how they work without actually modifying Parquet files">{`PARQUET FILES ARE IMMUTABLE — you cannot modify bytes inside them.
  UPDATE and DELETE work by writing NEW files, not modifying existing ones.

COPY-ON-WRITE (CoW) — Delta Lake and Iceberg default for updates:
  UPDATE silver.orders SET status = 'delivered'
  WHERE order_id = 9284751 AND order_date = '2026-03-17';

  Step 1: Read micro-partition containing order_id 9284751
          (file: date=2026-03-17/part-00042.parquet)
  Step 2: Apply update in memory:
          row where order_id=9284751: status changed to 'delivered'
  Step 3: Write ENTIRE FILE with the update applied:
          new file: date=2026-03-17/part-00043.parquet (full partition)
  Step 4: Commit new log entry:
          REMOVE: date=2026-03-17/part-00042.parquet
          ADD:    date=2026-03-17/part-00043.parquet

  RESULT: The new snapshot shows part-00043 (updated), not part-00042 (old).
  Old file is still on S3 until VACUUM removes it (supports time travel).

  CoW write amplification:
    1 row updated in a 128 MB file → 128 MB rewritten
    For high-update-rate tables: CoW is expensive at write time
    Trade-off: reads are fast (no merge needed — just read the file)

MERGE-ON-READ (MoR) — Hudi default, Iceberg option:
  Instead of rewriting the full file on every update:
    Write a small "delete file" recording which rows are deleted
    Write a small "position delete" or "equality delete" file
    New data written as new small files
  On READ: engine merges base files + delete files → current state

  MoR write cost: cheap (write small delta files only)
  MoR read cost:  more expensive (must merge delete files on every read)
  Use when: high write velocity, low read frequency (e.g. CDC ingestion)
  Use CoW when: high read frequency, moderate write rate (e.g. analytics tables)

MERGE INTO — the SQL syntax for upserts:
-- Snowflake / Databricks / BigQuery equivalent:
MERGE INTO silver.orders AS target
USING (
    SELECT order_id, status, amount, updated_at
    FROM bronze.orders_cdc
    WHERE _bronze_date = '2026-03-17'
) AS source
ON target.order_id = source.order_id
WHEN MATCHED AND target.updated_at < source.updated_at
  THEN UPDATE SET
      status     = source.status,
      amount     = source.amount,
      updated_at = source.updated_at
WHEN NOT MATCHED
  THEN INSERT (order_id, status, amount, updated_at)
       VALUES (source.order_id, source.status, source.amount, source.updated_at);

-- Delta Lake executes this as:
-- 1. Hash join target and source on order_id
-- 2. For matched rows where condition is true: mark old file for removal
--    Write updated rows to new file (CoW)
-- 3. For unmatched rows: write new rows to new file
-- 4. Commit: REMOVE old files, ADD new files in one atomic log entry`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Time Travel ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Time Travel" />
        <SectionTitle>Time Travel — Querying Historical Table Versions</SectionTitle>

        <Para>
          Time travel is the ability to query a table as it existed at a previous
          point in time or at a specific transaction version. It is one of the
          most practically valuable features of the lakehouse — both for debugging
          ("what did the data look like before that pipeline bug?") and for
          regulatory compliance ("prove what we reported to the regulator on
          March 17").
        </Para>

        <CodeBox label="Time travel in Delta Lake and Iceberg — syntax and use cases">{`DELTA LAKE TIME TRAVEL:

-- Query table at a specific version number:
SELECT * FROM silver.orders VERSION AS OF 41;
-- Returns the table as it was after commit 41

-- Query table at a specific timestamp:
SELECT * FROM silver.orders TIMESTAMP AS OF '2026-03-16 23:59:59';
-- Returns the table state at that exact moment in time

-- Using Spark API:
df = spark.read \
    .format("delta") \
    .option("versionAsOf", 41) \
    .load("s3://freshmart-lake/silver/orders")

df = spark.read \
    .format("delta") \
    .option("timestampAsOf", "2026-03-16 23:59:59") \
    .load("s3://freshmart-lake/silver/orders")

-- View table history:
DESCRIBE HISTORY silver.orders;
-- Returns: version, timestamp, userId, operation, operationParameters, ...
-- version 42: MERGE (2026-03-17 06:14:32) — 48,234 rows merged
-- version 41: MERGE (2026-03-16 06:11:47) — 47,892 rows merged
-- ...
-- version  0: CREATE TABLE (2026-01-01 00:00:00)

-- Restore table to a previous version:
RESTORE TABLE silver.orders TO VERSION AS OF 41;
-- or:
RESTORE TABLE silver.orders TO TIMESTAMP AS OF '2026-03-16 23:59:59';
-- Creates a new commit (v43) that points to the same files as v41
-- v41 and v42 still exist in history — restore is non-destructive


ICEBERG TIME TRAVEL:
-- Query at snapshot ID:
SELECT * FROM silver.orders FOR SYSTEM_VERSION AS OF 5765671814693002000;

-- Query at timestamp:
SELECT * FROM silver.orders FOR SYSTEM_TIME AS OF '2026-03-16 23:59:59';

-- View snapshots:
SELECT * FROM silver.orders.snapshots;
-- Returns: committed_at, snapshot_id, operation, manifest_list

-- Rollback to snapshot:
CALL system.rollback_to_snapshot('freshmart.silver.orders', 5765671814693002000);


TIME TRAVEL RETENTION:
  Delta Lake: controlled by delta.logRetentionDuration (default: 30 days)
              and delta.deletedFileRetentionDuration (default: 7 days)
  Files referenced by transactions within retention window: preserved
  VACUUM removes files older than the retention window

  SET TBLPROPERTIES on Delta:
    delta.logRetentionDuration = 'interval 90 days'   -- keep 90 days of history
    delta.deletedFileRetentionDuration = 'interval 30 days'

  CAUTION: longer retention = more storage cost
  For GDPR/compliance: long retention is valuable for audit
  For high-write tables: long retention is expensive (many old files)


PRACTICAL TIME TRAVEL USE CASES:

1. Debug a pipeline bug:
   Pipeline had a bug on 2026-03-10 that wrote wrong revenue figures.
   Bug fixed and Silver corrected on 2026-03-11.
   To see what was wrong:
     SELECT SUM(amount) FROM silver.orders TIMESTAMP AS OF '2026-03-10 23:59:59';
   Compare to:
     SELECT SUM(amount) FROM silver.orders TIMESTAMP AS OF '2026-03-11 23:59:59';

2. Regulatory audit:
   Regulator asks: "What was your total active customer count as of Q4 end?"
   SELECT COUNT(*) FROM silver.customers TIMESTAMP AS OF '2026-03-31 23:59:59';
   Returns the exact count from that date — provable, reproducible.

3. ML reproducibility:
   ML team trained a model on March 1 data.
   Need to reproduce the exact training dataset for audit:
     df = spark.read.format("delta") \
         .option("timestampAsOf", "2026-03-01 00:00:00") \
         .load(silver_orders_path)
   Returns the exact same data used for training.

4. Recover from accidental delete:
   Someone ran DELETE FROM silver.orders WHERE store_id = 'ST001' by mistake.
   RESTORE TABLE silver.orders TO VERSION AS OF (current_version - 1);
   Table recovered to state before the accidental delete.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Iceberg In Practice ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Apache Iceberg In Practice" />
        <SectionTitle>Apache Iceberg — The Most Portable Open Table Format</SectionTitle>

        <Para>
          Module 29 introduced the three open table formats. This module goes
          deeper on Apache Iceberg specifically, because its engine-agnostic design
          is the most relevant for teams building multi-engine platforms in 2026.
          Iceberg is natively supported by Spark, Flink, Trino, Athena, Snowflake,
          BigQuery, and Hive — you can write with Spark and query with Snowflake
          on the same Iceberg table, with no conversion.
        </Para>

        <SubTitle>Iceberg metadata hierarchy</SubTitle>

        <CodeBox label="Iceberg metadata structure — catalog, metadata, manifests, data">{`ICEBERG TABLE STRUCTURE ON S3:

s3://freshmart-lake/silver/orders/
├── metadata/
│   ├── v1.metadata.json          ← initial table creation
│   ├── v2.metadata.json          ← after first write
│   ├── v3.metadata.json          ← after second write (current)
│   ├── snap-001-manifest-list.avro    ← snapshot 1's manifest list
│   ├── snap-002-manifest-list.avro    ← snapshot 2's manifest list
│   └── snap-003-manifest-list.avro    ← snapshot 3's manifest list (current)
├── manifests/
│   ├── manifest-001.avro         ← lists data files for snapshot 1
│   ├── manifest-002.avro         ← lists data files for snapshot 2 additions
│   └── manifest-003.avro         ← lists data files for snapshot 3
└── data/
    ├── date=2026-03-15/
    │   └── part-00001-abc123.parquet
    ├── date=2026-03-16/
    │   └── part-00001-def456.parquet
    └── date=2026-03-17/
        └── part-00001-ghi789.parquet

CATALOG: the external service that stores the current metadata pointer
  The catalog maps: table_name → current metadata file path
  The catalog is the authoritative source of "which version is current"
  Without the catalog, you cannot know which metadata file is current.

  Supported Iceberg catalog implementations:
  ├── Hive Metastore (HMS): stores pointer in Hive's MySQL/PostgreSQL
  ├── AWS Glue Data Catalog: stores pointer in Glue's managed catalog
  ├── Apache Nessie: git-like catalog with branching and tagging
  ├── REST Catalog: generic REST API standard (Tabular, Databricks Unity Catalog)
  └── JDBC Catalog: stores pointer in any JDBC database (dev only)

HOW A QUERY READS AN ICEBERG TABLE:

  1. CATALOG LOOKUP: client asks catalog for table "silver.orders"
     Catalog returns: metadata file = "v3.metadata.json"

  2. READ METADATA FILE: v3.metadata.json
     Contains: current snapshot ID, schema history, partition spec
     Current snapshot: snap-003-manifest-list.avro

  3. READ MANIFEST LIST: snap-003-manifest-list.avro
     Contains: list of manifest files for this snapshot
     Each manifest entry has: partition range stats
     Apply partition pruning here: skip manifests with no matching partitions

  4. READ RELEVANT MANIFESTS: manifest-003.avro
     Contains: list of data files, per-file statistics (min/max/null_count)
     Apply data file pruning: skip files with no matching rows

  5. READ RELEVANT PARQUET FILES
     Apply predicate pushdown within each file (row group level)

  PERFORMANCE:
    Steps 1-4 are metadata-only (small files, fast)
    Step 5 is where actual data I/O happens
    Well-pruned queries skip 90-99% of data files → dramatic speedup`}</CodeBox>

        <SubTitle>Iceberg partition evolution — the feature Delta Lake lacks</SubTitle>

        <CodeBox label="Iceberg partition evolution — change partitioning without rewriting data">{`PROBLEM IN DELTA LAKE:
  Table created with PARTITION BY (order_date) in 2024.
  In 2026: table has grown to 50 TB, queries filter by (store_id, order_date).
  Changing partition strategy in Delta: requires full table rewrite (50 TB!)
  Duration: 8-12 hours of compute. Cost: hundreds of dollars. Risk: outage.

ICEBERG PARTITION EVOLUTION (no data rewrite needed):
  -- Original partition spec (applied to all data until now):
  ALTER TABLE silver.orders ADD PARTITION FIELD months(order_date);
  -- All existing data has metadata: partitioned by month(order_date)

  -- New partition spec (applied to new data only):
  ALTER TABLE silver.orders DROP PARTITION FIELD months(order_date);
  ALTER TABLE silver.orders ADD PARTITION FIELD days(order_date);
  ALTER TABLE silver.orders ADD PARTITION FIELD identity(store_id);
  -- New data written with: partitioned by (day(order_date), store_id)

  HOW ICEBERG HANDLES MIXED PARTITION SPECS:
    Old data files: still have month-based partition metadata in their manifests
    New data files: have (day, store_id) partition metadata
    Each manifest records which partition spec was used for its files

  QUERY: SELECT * FROM silver.orders WHERE order_date = '2026-03-17' AND store_id = 'ST001'
    Iceberg reads manifest list
    For old manifests (month spec): prune by month('2026-03') — keeps March
    For new manifests (day+store spec): prune by day=2026-03-17 AND store='ST001'
    → No data rewrite. Both old and new data queried efficiently with their
      respective partition specs. Pruning works for both.

HIDDEN PARTITION TRANSFORMS:
  Iceberg partition transforms allow partitioning by a derived value,
  not the raw column value:
    years(ts):   partition by year of timestamp
    months(ts):  partition by year-month of timestamp
    days(ts):    partition by date of timestamp
    hours(ts):   partition by hour of timestamp
    bucket(N, col): hash-partition into N buckets
    truncate(W, col): truncate string/number to width W

  These are HIDDEN from query writers:
    Query: WHERE order_date = '2026-03-17'
    Iceberg internally: find all files in the days(2026-03-17) partition
    User does not need to know the partition is day-level, not raw timestamp

  BENEFIT: queries do not break when partition granularity changes.
    Old query: WHERE order_date BETWEEN '2026-03-01' AND '2026-03-17'
    Old partitioning: months(order_date) → scans all March files
    New partitioning: days(order_date) → scans only March 1-17 files
    Query unchanged. Performance improved. No user migration needed.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Unity Catalog ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Unity Catalog and Lakehouse Governance" />
        <SectionTitle>Unity Catalog — Governance for the Lakehouse Era</SectionTitle>

        <Para>
          A lakehouse with no governance is just a large lake with ACID semantics.
          Unity Catalog (Databricks) is the most mature lakehouse governance layer
          in production as of 2026. It provides a three-level namespace
          (catalog.schema.table), column-level access control, row-level security,
          cross-engine lineage, and audit logging — all from a single control plane.
        </Para>

        <CodeBox label="Unity Catalog — namespace, access control, and lineage">{`UNITY CATALOG THREE-LEVEL NAMESPACE:
  catalog.schema.table
  │        │       └── table or view
  │        └── schema (like a PostgreSQL schema / database)
  └── catalog (top-level container, maps to a cloud storage account)

  freshmart_prod.silver.orders          ← production Silver orders
  freshmart_prod.gold.daily_revenue     ← production Gold metrics
  freshmart_dev.silver.orders           ← dev environment Silver (separate catalog)
  freshmart_prod.ml_features.order_features  ← ML feature store tables

UNITY CATALOG ACCESS CONTROL:
  Grant/revoke at any level of the three-level hierarchy:
    GRANT SELECT ON CATALOG freshmart_prod TO GROUP analysts;
    GRANT SELECT ON SCHEMA  freshmart_prod.silver TO USER priya@freshmart.com;
    GRANT SELECT ON TABLE   freshmart_prod.gold.daily_revenue TO GROUP finance;

    -- Deny access to PII columns in Silver:
    REVOKE SELECT ON TABLE freshmart_prod.silver.customers FROM GROUP analysts;
    -- Grant access to specific non-PII columns only:
    GRANT SELECT (customer_id, tier, city, lifetime_orders)
      ON TABLE freshmart_prod.silver.customers TO GROUP analysts;

  COLUMN MASKING (dynamic data masking):
    Create a masking policy for PII columns:
    CREATE OR REPLACE MASKING POLICY mask_email AS (val STRING)
    RETURNS STRING ->
      CASE WHEN is_account_group_member('data_engineers')
           THEN val                          -- engineers see raw email
           ELSE SHA2(val, 256)               -- others see hash
      END;

    ALTER TABLE freshmart_prod.bronze.customers
    ALTER COLUMN email
    SET MASKING POLICY mask_email;
    -- Everyone querying this table sees hashed email unless they are data_engineers

  ROW-LEVEL SECURITY:
    CREATE OR REPLACE ROW ACCESS POLICY store_partition_policy
    AS (store_id STRING)
    RETURNS BOOLEAN ->
        is_account_group_member('all_stores')  -- global access
        OR store_id = current_user_store_id()  -- or just their store
    ;

    ALTER TABLE freshmart_prod.gold.store_performance
    ADD ROW ACCESS POLICY store_partition_policy ON (store_id);
    -- Store managers only see their own store's performance data

UNITY CATALOG LINEAGE:
  Unity Catalog automatically captures data lineage from:
    - Spark queries (via SparkListener integration)
    - Databricks SQL queries
    - dbt runs (via dbt Unity Catalog integration)

  For any table, you can query:
    SELECT * FROM system.information_schema.column_lineage
    WHERE target_table_name = 'daily_revenue';
  Returns: upstream columns, transformations, and source tables
  → gold.daily_revenue.net_revenue ← silver.orders.order_amount, silver.orders.discount_amount

METASTORE ARCHITECTURE:
  Unity Catalog uses a Databricks-managed metastore (not Hive Metastore)
  One Unity Catalog metastore per cloud region per Databricks account
  Multiple workspaces share the same metastore → same governance
  Tables stored on customer-owned S3/ADLS — Databricks does not hold data
  Metastore endpoint: managed by Databricks, not customer`}</CodeBox>

        <SubTitle>Apache Polaris — the open source Unity Catalog alternative</SubTitle>

        <Para>
          Apache Polaris (incubating, donated by Snowflake in 2024) is the open
          source implementation of the Iceberg REST Catalog specification with
          governance features. It provides a vendor-neutral catalog that any
          Iceberg-compatible engine can use — enabling Unity Catalog-like
          governance without Databricks lock-in. As of 2026, Polaris is production-
          ready and used by teams that want multi-engine governance without a single
          vendor dependency.
        </Para>

        <CodeBox label="Iceberg REST Catalog — the standard that Polaris implements">{`ICEBERG REST CATALOG SPECIFICATION:
  Standard REST API for catalog operations:
    GET  /v1/namespaces                         ← list all namespaces
    GET  /v1/namespaces/{ns}/tables             ← list tables in namespace
    GET  /v1/namespaces/{ns}/tables/{table}     ← get table metadata
    POST /v1/namespaces/{ns}/tables             ← create table
    POST /v1/namespaces/{ns}/tables/{table}/metrics  ← report metrics

  ANY engine that implements this REST client can use ANY catalog server:
    Spark → Polaris REST catalog
    Flink → same Polaris REST catalog
    Trino → same Polaris REST catalog
    Athena → same Polaris REST catalog (via AWS Glue Iceberg support)

  This is the open standard equivalent of Unity Catalog's proprietary API.

CONFIGURING SPARK TO USE POLARIS:
  spark.sql.catalog.freshmart = org.apache.iceberg.spark.SparkCatalog
  spark.sql.catalog.freshmart.type = rest
  spark.sql.catalog.freshmart.uri = https://polaris.freshmart.internal/api/catalog
  spark.sql.catalog.freshmart.credential = client_id:client_secret
  spark.sql.catalog.freshmart.warehouse = s3://freshmart-lake/iceberg

  -- Query Iceberg tables via Polaris catalog:
  spark.sql("SELECT * FROM freshmart.silver.orders WHERE order_date = '2026-03-17'")

APACHE NESSIE — the git-like alternative:
  Nessie adds git-like branching and tagging to Iceberg catalogs.
  Create a branch for data experimentation without affecting production:
    nessie branch create experiment-new-transform
    spark.sql.catalog.nessie.ref = experiment-new-transform
    -- Write experimental data to this branch
    -- Merge to main when validated: nessie merge experiment-new-transform --into main
  Used by: Project Nessie, Arctic (Dremio's managed Nessie offering)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Streaming into the Lakehouse ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Streaming into the Lakehouse" />
        <SectionTitle>Streaming Ingestion Into Lakehouse Tables</SectionTitle>

        <Para>
          One of the lakehouse's most compelling properties is that streaming and
          batch workloads can read and write the same tables. A Spark Structured
          Streaming job appends events to a Delta Lake table in near-real-time.
          A dbt batch job reads the same table for daily Gold aggregation. An ML
          training job reads the same table for feature extraction. No copies,
          no synchronisation.
        </Para>

        <CodeBox label="Streaming writes to Delta Lake — concurrent with batch reads">{`# CDC STREAM → BRONZE DELTA LAKE (near-real-time)
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, current_timestamp
from pyspark.sql.types import StructType, LongType, StringType

spark = SparkSession.builder \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .getOrCreate()

# Read CDC events from Kafka:
orders_cdc = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "freshmart.cdc.public.orders") \
    .load()

# Parse and write to Bronze Delta Lake:
def write_to_bronze(batch_df, batch_id):
    batch_df \
        .select(from_json(col("value").cast("string"), order_schema).alias("e")) \
        .select("e.*") \
        .withColumn("_bronze_ts", current_timestamp()) \
        .withColumn("_batch_id", batch_id) \
        .write \
        .format("delta") \
        .mode("append") \
        .option("mergeSchema", "true") \
        .save("s3://freshmart-lake/bronze/orders")

query = orders_cdc.writeStream \
    .foreachBatch(write_to_bronze) \
    .option("checkpointLocation", "s3://freshmart-lake/checkpoints/orders_bronze") \
    .trigger(processingTime="1 minute") \  # micro-batch every 1 minute
    .start()


# WHILE THIS STREAMING WRITE IS HAPPENING:
# dbt runs against silver.orders (reads Bronze) — NO conflict
# Analysts query silver.orders — NO conflict
# Delta Lake's optimistic concurrency handles concurrent readers

# CHANGE DATA FEED — reading only changed rows from a Delta table:
# Instead of scanning the entire Bronze table to find new rows,
# use Change Data Feed to read only the delta since last processed version:

changes = spark.readStream \
    .format("delta") \
    .option("readChangeFeed", "true") \
    .option("startingVersion", "latest") \
    .load("s3://freshmart-lake/bronze/orders")

# changes includes: _change_type (insert/update_preimage/update_postimage/delete)
# Use this to feed Silver MERGE with only the changed Bronze rows:
def merge_to_silver(batch_df, batch_id):
    # Filter to latest version per order_id (most recent CDC event):
    from delta.tables import DeltaTable
    from pyspark.sql.window import Window
    from pyspark.sql.functions import row_number

    latest = batch_df \
        .filter(col("_change_type").isin("insert", "update_postimage")) \
        .withColumn("rn", row_number().over(
            Window.partitionBy("order_id").orderBy(col("updated_at").desc())
        )) \
        .filter(col("rn") == 1)

    DeltaTable.forPath(spark, "s3://freshmart-lake/silver/orders") \
        .alias("target") \
        .merge(
            latest.alias("source"),
            "target.order_id = source.order_id"
        ) \
        .whenMatchedUpdateAll() \
        .whenNotMatchedInsertAll() \
        .execute()

silver_stream = changes.writeStream \
    .foreachBatch(merge_to_silver) \
    .option("checkpointLocation", "s3://checkpoints/orders_silver") \
    .trigger(processingTime="5 minutes") \
    .start()


# ENABLE CHANGE DATA FEED ON A DELTA TABLE:
ALTER TABLE bronze.orders SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
-- From this point, Delta records change type alongside each row change.
-- CDF adds storage overhead (~10-20% for typical workloads).
-- Only enable when Change Data Feed is actively consumed.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — When to Choose the Lakehouse ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Decision Framework" />
        <SectionTitle>When the Lakehouse Is the Right Choice — and When It Is Not</SectionTitle>

        <Para>
          The lakehouse is not the right architecture for every team or every
          use case. It adds operational complexity over a plain warehouse, and
          it does not match the query performance of Snowflake or BigQuery for
          pure SQL analytics workloads. The decision is architectural — based
          on the specific characteristics of the platform being built.
        </Para>

        {[
          {
            condition: 'Choose the lakehouse when',
            color: '#00e676',
            points: [
              'ML and SQL analytics must share the same data — you want ML engineers using Spark and analysts using SQL on the same tables without data duplication.',
              'Data volume is measured in petabytes — at this scale, duplicating data between lake and warehouse is cost-prohibitive.',
              'Multiple compute engines are required — Spark for batch, Flink for streaming, Trino for ad-hoc, and a SQL warehouse for BI, all on the same data.',
              'Open format is a strategic requirement — you want to avoid proprietary formats and preserve the ability to switch compute engines without migrating data.',
              'Streaming and batch must share the same tables — Spark Streaming writes and dbt batch reads the same Delta/Iceberg table.',
              'You are building a new platform from scratch — no existing warehouse investment to protect, no migration cost.',
            ],
          },
          {
            condition: 'Stick with a managed warehouse when',
            color: '#ff4757',
            points: [
              'The primary workload is SQL analytics — Snowflake and BigQuery have superior query optimisers, better caching, and simpler operational models for pure SQL.',
              'The team has no Spark/Databricks expertise — the lakehouse\'s operational complexity (cluster management, Delta tuning, schema evolution) requires specific skills.',
              'Strong BI tool integration is required — Tableau, Power BI, and Looker have deep optimisations for Snowflake and BigQuery that do not exist for Databricks SQL.',
              'Sub-second dashboard query performance is required — Snowflake\'s result cache and micro-partition pruning are more mature than Databricks SQL for interactive queries.',
              'An existing Snowflake or BigQuery investment is in place — migration cost often exceeds the lakehouse benefit for established platforms.',
            ],
          },
        ].map((section, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: `1px solid ${section.color}30`,
            borderLeft: `3px solid ${section.color}`, borderRadius: 10,
            padding: '18px 20px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: section.color,
              fontFamily: 'var(--font-display)', marginBottom: 12,
            }}>{section.condition}</div>
            {section.points.map((p, pi) => (
              <div key={pi} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <div style={{ color: section.color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{p}</div>
              </div>
            ))}
          </div>
        ))}
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
        <SectionTitle>Migrating FreshMart From Two Systems to a Lakehouse</SectionTitle>

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
            Scenario — FreshMart · Consolidating lake + warehouse into lakehouse
          </div>

          <Para>
            FreshMart runs two separate systems: a Spark + S3 data lake (used by
            ML engineers) and a Snowflake warehouse (used by analysts). The daily
            ETL job that copies Silver tables from S3 to Snowflake costs $1,800/month
            in Snowflake credits and takes 4 hours. Analysts see data that is 4 hours
            stale. ML engineers and analysts have different versions of Silver — each
            team has found discrepancies. The CTO asks you to propose a consolidation.
          </Para>

          <CodeBox label="Migration plan — two systems to one lakehouse">{`CURRENT STATE:
  S3 (lake):       raw/bronze/silver/gold layers
                   ML team reads silver via Spark
  Snowflake:       silver/gold tables (copy of lake silver, 4h stale)
                   Analyst team queries via Snowflake SQL
  ETL pipeline:    copies silver from S3 to Snowflake daily (4h, $1,800/mo)
  Problem:         two copies, inconsistency, stale data, unnecessary cost

TARGET STATE:
  S3 (Delta Lake): raw/bronze/silver/gold layers — single copy
  Databricks SQL:  queries Silver/Gold Delta tables directly (replaces Snowflake)
  ML team:         reads same Delta tables via Spark (no change)
  Analyst team:    queries via Databricks SQL (new tool, same SQL)
  ETL pipeline:    eliminated

MIGRATION PHASES:

PHASE 1 (Weeks 1-4): Enable Delta Lake on existing S3 tables
  - Convert Silver and Gold S3 Parquet tables to Delta Lake format:
    spark.read.parquet("s3://freshmart-lake/silver/orders") \
        .write.format("delta").save("s3://freshmart-lake/silver_delta/orders")
  - Validate: Delta and Parquet versions produce identical query results
  - Set up Unity Catalog: register Delta tables in Unity Catalog
  - Create Databricks SQL Warehouse for analysts

PHASE 2 (Weeks 5-8): Dual-write period
  - Silver pipeline writes to BOTH S3 Parquet AND Delta simultaneously
  - Analysts get Databricks SQL access to Delta tables
  - Analysts run queries in parallel against Snowflake (old) and Databricks SQL (new)
  - Compare results: if Databricks SQL results match Snowflake → validation passed
  - ML team switches to Delta tables: verify training pipelines unchanged

PHASE 3 (Weeks 9-12): Cutover
  - Stop writing to S3 Parquet (keep Delta as sole format)
  - Stop running ETL copy to Snowflake
  - Decommission Snowflake warehouse (or retain for special use cases)
  - Migrate all dbt models to run against Delta tables (dbt Databricks adapter)
  - Redirect all analyst tools (Metabase) to Databricks SQL endpoint

PHASE 4 (Week 13+): Optimise
  - Add CLUSTER BY on Delta tables for analyst query patterns
  - Tune Databricks SQL warehouse sizes (X-Small for dashboards, Medium for ad-hoc)
  - Configure auto-suspend appropriately
  - Enable Unity Catalog lineage and access control

EXPECTED OUTCOMES:
  ETL cost eliminated:                   -$1,800/month
  Snowflake compute eliminated:          -$3,200/month (warehouse credits)
  Snowflake storage eliminated:          -$800/month
  Databricks SQL new cost:               +$1,600/month (smaller warehouse, less data)
  Net saving:                            $4,200/month ($50,400/year)

  Data freshness:                        4 hours → 15 minutes (pipeline interval)
  ML/analyst consistency:                guaranteed (one copy)
  Operational pipelines to maintain:     from 2 (lake + ETL) to 1 (lake only)`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a lakehouse and what problem does it solve compared to having both a data lake and a data warehouse?',
            a: `A lakehouse is an architectural pattern that adds warehouse-quality features — ACID transactions, schema enforcement, row-level updates, time travel — directly to a data lake's object storage layer using open table formats. The result is a single storage system that serves both analytical SQL workloads and large-scale Spark-based ML workloads, without duplicating data.

The two-system problem it solves is this: organisations that run both a data lake and a data warehouse maintain two copies of the same data. The lake has raw and transformed data used by ML engineers with Spark and Python. The warehouse has a copy of the transformed data used by analysts with SQL. A daily ETL pipeline moves data from lake to warehouse, introducing 4–8 hours of staleness, its own failure modes, and significant compute cost.

The inconsistency compounds over time. The ML team's Silver table and the analyst's Snowflake table start diverging as each is maintained separately. When a bug fix is applied to one, it must be applied to the other — often with a delay. Two teams discover their "same" metric has different values because they are reading from different systems with different update schedules.

The lakehouse eliminates the copy and the ETL pipeline. Both ML engineers (Spark) and analysts (Databricks SQL or Trino) read the same Delta Lake or Iceberg table. The table is updated once by the Silver pipeline. There is no lag between what ML sees and what analysts see. Schema changes are made once. Data quality issues are visible to both teams simultaneously.

The trade-off is that a managed warehouse like Snowflake or BigQuery has more mature query optimisation, better BI tool integration, and simpler operations for pure SQL workloads. The lakehouse is the right choice when ML and SQL workloads must share data, not when SQL analytics is the only workload.`,
          },
          {
            q: 'Q2. How does Delta Lake achieve ACID transactions on S3, which has no native transaction support?',
            a: `Delta Lake achieves ACID by layering a transaction protocol on top of S3's object model, exploiting S3's single-object atomic PUT operation as its primitive.

The transaction log is the core mechanism. Delta maintains a directory called _delta_log/ alongside the data files. This directory contains a sequential series of JSON files — one per committed transaction. Each JSON file records which Parquet data files were added to the table and which were removed in that transaction. The current state of the table is defined by replaying this log from the beginning (or from the last checkpoint).

Atomicity is achieved because writing a new Parquet data file to S3 is side-effect-free — the file exists but is invisible to any reader until a log entry references it. The actual commit is a single S3 PUT of the JSON log entry. This PUT is atomic: either the log entry exists (all referenced files are now part of the table) or it does not (no effect). If the process crashes after writing data files but before writing the log entry, the data files are orphaned and invisible — cleaned up by VACUUM. The table is unchanged.

Isolation is achieved through optimistic concurrency control. Two concurrent writers both read the table at version 41, write their data files, and attempt to commit as version 42. Only one S3 PUT for the log entry can succeed — Delta uses protocol-level conflict detection to determine which writer wins and whether the other can safely rebase to version 43 or must abort and retry. For appending to non-overlapping partitions, both can succeed in sequence. For modifying the same rows, one must retry.

Schema enforcement (consistency) is applied when the writer constructs the log entry — the new data's schema is validated against the table schema before the commit is written. An incompatible write never produces a log entry and is therefore never visible.

Durability relies on S3's own guarantees: once a PUT to S3 returns success, the object is durably stored across multiple availability zones with 11 nines reliability.`,
          },
          {
            q: 'Q3. What is Iceberg partition evolution and why is it significant?',
            a: `Partition evolution is the ability to change a table's partition strategy — the column or derived expression used to organise data into partitions — without rewriting any existing data. It is one of Iceberg's most important differentiators from Delta Lake.

In Delta Lake and traditional Hive-partitioned Parquet tables, changing the partition strategy requires a full table rewrite. If a 50 TB table was partitioned by month and you need to change it to partition by day (to improve pruning for daily queries), you must read all 50 TB and write all 50 TB to a new partition layout. This is expensive (hours of compute, hundreds of dollars), risky, and causes downtime.

In Iceberg, each snapshot records which partition specification was used to write its data files. A table can have multiple active partition specifications simultaneously. When you alter the partition spec, Iceberg creates a new spec version. New data is written using the new spec, while old data retains its original spec in the manifest files. When a query is executed, Iceberg applies the appropriate pruning strategy for each manifest based on the spec that was active when those files were written.

For example, a table that was partitioned by month for two years of data but is then re-partitioned by day for new data: queries filtering by a specific date will scan old manifests at month granularity (less pruning) and new manifests at day granularity (better pruning). The query still works correctly and efficiently without any data migration.

This matters in practice because data grows and query patterns change. A table partitioned optimally for write throughput at creation may need a different partition scheme two years later when query patterns have evolved. Partition evolution allows the table to evolve with the organisation without expensive migration events.

Iceberg also supports hidden partition transforms — partitioning by days(timestamp) or months(timestamp) where the partition value is derived from the column rather than stored explicitly. Users write WHERE timestamp = '2026-03-17' and Iceberg internally maps this to the appropriate partition — queries don't break when the partition granularity changes.`,
          },
          {
            q: 'Q4. What is Unity Catalog and what governance problems does it solve for lakehouse platforms?',
            a: `Unity Catalog is Databricks' data governance layer for the lakehouse. It provides a three-level namespace (catalog.schema.table), column-level access control, row-level security, cross-engine lineage, and audit logging — all managed through a single control plane that applies consistently regardless of which compute engine queries the data.

The governance problems it solves are significant. Before Unity Catalog, Databricks clusters had workspace-level access control — permissions were configured per workspace, and data shared across workspaces required manual coordination. There was no column-level access control: you could grant SELECT on a table but not exclude specific sensitive columns. Lineage was not tracked automatically — data engineers had to maintain lineage documentation manually.

Unity Catalog addresses all of these. The three-level namespace means development and production data are cleanly separated (freshmart_dev vs freshmart_prod) with the same table names — no naming collisions, no accidental production writes from a dev notebook. Access is granted at any level of the hierarchy: you can grant SELECT on an entire catalog, a specific schema, or a specific table, and the most restrictive applicable grant wins.

Column masking policies dynamically mask or hash sensitive values based on the querying user's group membership. An analyst querying silver.customers sees hashed email addresses while a data engineer sees the raw values — without maintaining two copies of the table. Row-level security restricts which rows each user can see — store managers see only their store's data from gold.store_performance.

Lineage is captured automatically from Spark queries, Databricks SQL, and dbt runs. For any Gold table, Unity Catalog can show which Silver columns contributed to which Gold columns, through which transformation. This is critical for impact analysis — before changing a Silver column, you can see every downstream Gold model affected.

Apache Polaris is the open source alternative that implements the Iceberg REST Catalog specification with similar governance features, for teams that want equivalent capabilities without Databricks dependency.`,
          },
          {
            q: 'Q5. A team asks you whether they should migrate from Snowflake to a Databricks lakehouse. What questions would you ask and how would you evaluate the trade-off?',
            a: `The decision hinges on the specific characteristics of the platform, not on which technology is more modern or better-marketed. I would ask six questions.

First, what is the ratio of SQL analytics to ML/data science workloads? If the team is 90% SQL analysts using Tableau and 10% data scientists, Snowflake is almost certainly the right tool — it has better query optimisation, mature BI integrations, and simpler operations for pure SQL. If the ratio is 50/50 or ML-heavy, the lakehouse case is stronger.

Second, is there currently a data duplication problem? If the team runs both a lake and a warehouse and has an ETL pipeline between them, the lakehouse directly eliminates this. If there is no lake — just Snowflake — the migration would add lake complexity without eliminating duplication.

Third, what is the data volume? Below about 10 TB of Snowflake storage, the cost argument for the lakehouse is weaker. Above 100 TB, avoiding duplication becomes economically significant.

Fourth, what is the team's Spark expertise? A Databricks lakehouse requires engineers comfortable with Spark tuning, Delta Lake operations, cluster sizing, and Databricks-specific concepts. A team that lives in SQL and dbt will have a significant learning curve.

Fifth, how important are sub-second interactive query responses? For finance dashboards that executives expect to load instantly, Snowflake's result cache and mature query optimiser consistently outperform Databricks SQL for interactive workloads. For analytical queries where 5–30 seconds is acceptable, the difference narrows.

Sixth, what are the contractual commitments to Snowflake? Early termination fees, committed spending commitments, and migration effort (rewriting Snowflake-specific SQL like QUALIFY, PIVOT, FLATTEN for other engines) have real costs that must be weighed against projected savings.

My typical recommendation: if the team is building a new platform and has both ML and analytics requirements, start with the lakehouse. If the team has an established Snowflake investment with primarily SQL analytics workloads, the migration cost likely exceeds the benefit unless data volume is very large or ML requirements are growing significantly.`,
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
            error: `Delta Lake ConcurrentAppendException — concurrent writers both committed to the same partition and data is duplicated`,
            cause: 'Two Spark jobs both read the current table version (v41), both wrote Parquet files, and both attempted to commit. Delta Lake\'s optimistic concurrency resolved the conflict by allowing both to commit (v42 and v43) because they were appending to the same partition using append mode — not merge mode. Delta\'s conflict detection allows concurrent appends to the same partition, so both commits succeed. If the same events were in both batches, they are now duplicated.',
            fix: 'Use MERGE (upsert) semantics instead of append when there is any risk of duplicate events. MERGE with ON target.event_id = source.event_id prevents duplicates even with concurrent writers — the second writer\'s MERGE finds the rows already exist and performs UPDATE instead of INSERT. For streaming pipelines: use Spark Structured Streaming with checkpointing, which ensures exactly-once delivery to Delta Lake by handling concurrent write conflicts automatically with retries.',
          },
          {
            error: `Iceberg commit fails: CommitFailedException — cannot commit because the base metadata has changed — after a long-running Spark job`,
            cause: 'An Iceberg MERGE or overwrite operation reads the table metadata at job start, runs for 45 minutes, and attempts to commit. During those 45 minutes, another writer committed a new snapshot, advancing the table metadata version. When the long job tries to commit, it finds the metadata version has changed — its commit references the old snapshot as base, which is now stale. Iceberg\'s optimistic concurrency rejects the commit.',
            fix: 'Retry the Iceberg write — Iceberg\'s commit protocol includes automatic retry logic in most engines. If retries keep failing due to frequent concurrent writes, restructure the job to run shorter operations: split the large MERGE into smaller partition-level batches that each commit in seconds rather than minutes. Use Iceberg\'s isolation level setting: .option("isolation-level", "serializable") vs "snapshot" (default). Snapshot isolation allows concurrent reads but serialises writes to non-overlapping partitions; serializable provides stronger isolation but more conflicts.',
          },
          {
            error: `Time travel query fails: AnalysisException — the version 15 does not exist in the transaction log — after VACUUM was run`,
            cause: 'VACUUM was run with a retention duration shorter than the version being queried. VACUUM removes data files and log entries older than the configured retention period. If retention was set to 7 days and someone queries VERSION AS OF 15 which is 10 days old, the log entries and data files for version 15 were deleted by VACUUM.',
            fix: 'For the immediate issue: the data cannot be recovered from Delta Lake if VACUUM deleted it. Check S3 versioning (if enabled) or S3 Glacier (if lifecycle policies preserved the objects) as last-resort recovery options. Going forward: set retention to match your time travel requirements. For 30-day audit capability: delta.logRetentionDuration = \'interval 30 days\'. Never run VACUUM with the retention check disabled (VACUUM table RETAIN 0 HOURS) in production. Add a governance check that alerts if VACUUM retention is configured below the organisational minimum.',
          },
          {
            error: `Unity Catalog error: PERMISSION_DENIED — user priya@freshmart.com does not have SELECT privilege on table freshmart_prod.silver.customers — despite being in the analysts group`,
            cause: 'Unity Catalog grants are additive — but the effective permission is the intersection of grants at all levels. If priya is in the analysts group and analysts have GRANT SELECT ON SCHEMA silver, but there is a REVOKE SELECT ON TABLE silver.customers FROM GROUP analysts, the revoke at the table level overrides the schema-level grant. Unity Catalog\'s permission model applies the most specific applicable grant/revoke.',
            fix: 'Check effective permissions: SHOW GRANTS ON TABLE freshmart_prod.silver.customers — this lists all grants and revokes applicable to the table. Look for any REVOKE or negative grant targeting analysts or priya specifically. If analysts should have access to silver.customers but with PII columns masked: do not REVOKE table access, instead apply a column masking policy on the sensitive columns. The analyst retains SELECT on the table but sees hashed/masked values for PII columns based on their group membership.',
          },
          {
            error: `Databricks SQL query against Delta table is 10× slower than the same query in Snowflake — despite both reading the same analytical data`,
            cause: 'Delta Lake tables on S3 do not have Snowflake\'s micro-partition metadata quality or result caching. The Databricks SQL query may be: (1) reading from an un-clustered Delta table with poor pruning, (2) experiencing a cold start (local disk cache empty after warehouse resume), or (3) reading from a table with many small files that requires listing overhead.',
            fix: 'Apply the same optimisations Delta Lake supports. First, add CLUSTER BY (or run OPTIMIZE with ZORDER BY) on the most common filter columns: OPTIMIZE freshmart_prod.silver.orders ZORDER BY (store_id, order_date). Second, run OPTIMIZE to compact small files: OPTIMIZE freshmart_prod.silver.orders. Third, warm the Databricks SQL warehouse disk cache with a warm-up query after compute startup. Fourth, check that the Databricks SQL warehouse is appropriately sized. For interactive queries that must match Snowflake\'s sub-second result cache, consider keeping Snowflake for that specific workload while using Databricks for Spark-heavy processing.',
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
        'The lakehouse solves the two-system problem: organisations with both a data lake and a data warehouse maintain two copies of data, an ETL pipeline between them, and two sources of truth that diverge over time. The lakehouse eliminates the copy by adding ACID semantics directly to the lake storage layer.',
        'The lakehouse architecture has three components: cheap object storage (S3/ADLS/GCS) at the bottom, an open table format (Delta Lake, Iceberg, or Hudi) that adds ACID semantics in the middle, and multiple compute engines (Spark, Databricks SQL, Trino, Flink) that all read/write the same table format at the top.',
        'Delta Lake achieves ACID on S3 via a transaction log (_delta_log/). New Parquet data files are written but invisible to readers until an atomic log entry commits them. The log entry is a single S3 PUT — atomic, all-or-nothing. Concurrent writers use optimistic concurrency with conflict detection and retry.',
        'Copy-on-Write (CoW) rewrites the entire affected file on every UPDATE/DELETE — fast reads, expensive writes. Merge-on-Read (MoR) writes small delete/change files and merges on read — cheap writes, more expensive reads. Choose CoW for analytics-heavy tables, MoR for high-velocity write workloads like CDC.',
        'Time travel queries return table state at a previous version or timestamp. Delta Lake uses VERSION AS OF and TIMESTAMP AS OF. Iceberg uses FOR SYSTEM_VERSION AS OF and FOR SYSTEM_TIME AS OF. Retention is configurable — longer retention enables longer time travel windows but increases storage cost.',
        'Iceberg partition evolution allows changing the partition strategy without rewriting any existing data. Old data retains its original partition spec in manifest metadata. New data uses the new spec. Queries efficiently prune both old and new data using the appropriate spec. Delta Lake lacks this feature — changing partition strategy requires full table rewrite.',
        'Unity Catalog provides the governance layer for the Databricks lakehouse: three-level namespace (catalog.schema.table), column-level masking policies, row-level security, automatic cross-engine lineage, and audit logging. Apache Polaris is the open source equivalent for teams that want catalog-level governance without vendor lock-in.',
        'Streaming and batch can share the same Delta/Iceberg tables. Spark Structured Streaming writes CDC events to Bronze Delta Lake in micro-batches. dbt batch jobs read the same Silver Delta tables for Gold aggregation. ML training Spark jobs read the same tables for feature extraction. One copy, all consumers.',
        'Change Data Feed (CDF) on Delta Lake records which rows changed and how (insert/update/delete) alongside each write. Downstream Silver MERGE jobs can use CDF to read only the changed Bronze rows rather than scanning the entire Bronze table. Enable with ALTER TABLE SET TBLPROPERTIES (delta.enableChangeDataFeed = true).',
        'Choose the lakehouse when ML and SQL analytics must share data without duplication, data volume is large enough that duplication is expensive, multiple engines are required, or building a new platform. Stick with a managed warehouse (Snowflake, BigQuery) when the workload is primarily SQL analytics, team has no Spark expertise, sub-second interactive performance is critical, or an existing warehouse investment is in place.',
      ]} />

    </LearnLayout>
  )
}