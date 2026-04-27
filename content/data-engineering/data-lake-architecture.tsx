import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Lake Architecture — Data Engineering | Chaduvuko',
  description:
    'What a data lake actually is, why it was invented, how it differs from a warehouse, zone-based organisation, the storage layer, compute-storage separation, and how modern lakehouses are replacing both patterns.',
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

export default function DataLakeArchitectureModule() {
  return (
    <LearnLayout
      title="Data Lake Architecture"
      description="What a data lake is, why it was invented, zone-based organisation, compute-storage separation, and the rise of the lakehouse."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What a Data Lake Actually Is ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Precise Definition" />
        <SectionTitle>What a Data Lake Actually Is — Beyond the Buzzword</SectionTitle>

        <Para>
          "Data lake" is one of the most overloaded terms in data engineering.
          It has been used to mean a dump of raw files on S3, a governed analytical
          platform, a Hadoop cluster, and a marketing term for whatever a vendor
          is selling. This module gives a precise, technical definition and the
          historical context that explains why data lakes were invented, what
          problems they solve, and where they fall short.
        </Para>

        <Para>
          A data lake is a centralised storage repository that holds data in
          its native raw format — structured, semi-structured, and unstructured —
          at any scale, with compute separated from storage. The defining
          characteristics are storage format flexibility (not just tabular rows),
          schema-on-read (structure applied when querying, not when writing),
          and the separation of durable cheap object storage from the compute
          engines that query it.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The four defining properties of a data lake
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              {
                prop: 'Any data format',
                color: '#4285f4',
                desc: 'CSV, JSON, Parquet, Avro, images, logs, audio, video — stored as-is without a schema enforced at write time.',
              },
              {
                prop: 'Any scale',
                color: '#00e676',
                desc: 'Object storage (S3, ADLS, GCS) scales to petabytes with no schema migration, no index rebuilds, no DBA.',
              },
              {
                prop: 'Schema-on-read',
                color: '#7b61ff',
                desc: 'Data is stored raw. Structure (schema, types) is applied by the query engine when data is read, not at write time.',
              },
              {
                prop: 'Compute-storage separation',
                color: '#f97316',
                desc: 'Storage (S3) and compute (Spark, Presto, Athena) are independent. Scale each independently. Pay for storage separately from queries.',
              },
            ].map((item) => (
              <div key={item.prop} style={{
                borderLeft: `3px solid ${item.color}`, paddingLeft: 14,
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 4,
                }}>{item.prop}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Why Data Lakes Were Invented ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Problem That Created Data Lakes" />
        <SectionTitle>Why Data Lakes Were Invented — The Problem They Solved</SectionTitle>

        <Para>
          Data lakes did not emerge from an abstract architectural preference.
          They emerged from a specific set of problems that data warehouses could
          not solve economically in the early 2010s. Understanding those problems
          makes the lake's architectural choices — raw storage, schema-on-read,
          object storage — feel inevitable rather than arbitrary.
        </Para>

        <SubTitle>The three warehouse limitations that created demand for lakes</SubTitle>

        <CodeBox label="The warehouse limitations that motivated the data lake">{`WAREHOUSE LIMITATION 1: Cost of unstructured and semi-structured data
  ────────────────────────────────────────────────────────────────────
  A data warehouse (Teradata, Oracle, Redshift 2012) stores structured tables.
  Loading semi-structured JSON from application logs requires:
    - Flattening the JSON into tabular columns (an ETL step)
    - Defining a schema before loading
    - Storing in the warehouse's proprietary columnar format

  Application logs at Flipkart in 2013: 10 TB/day of JSON event logs
  Cost to store in Teradata: $50,000/TB × 10 TB × 365 = $182M/year
  Cost to store on HDFS (Hadoop): ~$1,000/TB = $3.65M/year
  Cost to store on S3 (2015): $23/TB = $83,950/year

  For unstructured data (images, audio, ML model outputs):
  Warehouses simply could not store them at all.
  You needed a separate system regardless.

WAREHOUSE LIMITATION 2: Schema-on-write inflexibility
  ────────────────────────────────────────────────────────────────────
  Warehouse schema must be defined before loading.
  A new event type requires:
    - Schema design (hours to days)
    - Table creation and ALTER TABLE (minutes, but blocking)
    - ETL pipeline update (days of engineering work)
    - Schema approval from DBA (days to weeks at large companies)

  At a fast-growing startup: 5 new event types per week.
  Each requires a full schema-change workflow.
  Result: data arrives 2 weeks after the event type is shipped.
  Business: "We can't analyse this event — the data team hasn't added it yet."

  Data lake answer: just drop the JSON file in the landing zone.
  No schema required at write time. Define it when you query.

WAREHOUSE LIMITATION 3: Coupled compute and storage scaling
  ────────────────────────────────────────────────────────────────────
  Traditional warehouse: compute and storage are the same hardware.
  To add more storage: buy more nodes (also adds unwanted compute).
  To add more compute: buy more nodes (also adds unwanted storage).
  Hardware refresh every 3-5 years: millions of dollars, planned outage.

  At Airbnb 2011: data growing 3× per year, compute needed for batch jobs.
  Adding storage for data growth forced adding compute they did not need.
  Cost and complexity scaled together with no ability to separate them.

  Data lake answer: S3 for storage (infinite, pay per GB).
  Spark cluster for compute (spin up/down, pay per hour).
  Scale each independently. Pay only for what you use.

THESE THREE PROBLEMS created the Hadoop + HDFS ecosystem (2009-2014)
and then the cloud object storage + Spark ecosystem (2014-present).
The architectural choices of data lakes are direct responses to these
specific warehouse limitations.`}</CodeBox>

        <SubTitle>The evolution: Hadoop → Cloud data lake</SubTitle>

        <CodeBox label="Data lake evolution — from Hadoop to modern cloud storage">{`GENERATION 1: HADOOP + HDFS (2009-2016)
  ─────────────────────────────────────────────────────────────
  Storage: HDFS (Hadoop Distributed File System)
    - Runs on commodity hardware in on-premise data centres
    - Files replicated 3× across nodes for durability
    - Block size: 128 MB — designed for sequential MapReduce reads
  Compute: MapReduce → Hive → Spark (2014 onward)
  Format:  Text files (CSV, JSON), then Parquet and ORC

  Problems with Hadoop:
    - HDFS and compute tightly coupled (same cluster)
    - Operational complexity: ZooKeeper, NameNode HA, YARN tuning
    - S3 became cheaper than HDFS by 2015 ($23/TB vs $100+/TB)
    - Cluster always running even when no jobs — wasted cost

GENERATION 2: CLOUD OBJECT STORAGE + SPARK (2015-2022)
  ─────────────────────────────────────────────────────────────
  Storage: S3 (AWS), ADLS Gen2 (Azure), GCS (Google Cloud)
    - Infinitely scalable, 99.999999999% (11 9s) durability
    - $23/TB/month — cheaper than any on-premise storage
    - No cluster management, no replication configuration
  Compute: Spark on EMR / Databricks / HDInsight (ephemeral clusters)
    - Spin up cluster for a job, terminate when done
    - No cost when no jobs running
  Format:  Parquet, Avro, ORC (columnar, compressed, splittable)

  Problems with Gen 2:
    - No ACID transactions (concurrent writes corrupt partitions)
    - No ability to UPDATE or DELETE single rows (only full partition overwrite)
    - No schema enforcement — anyone can write anything anywhere
    - Metadata catalog (Glue, Hive Metastore) becomes a bottleneck
    - "Data swamp": ungoverned lakes become unusable over time

GENERATION 3: OPEN TABLE FORMATS + LAKEHOUSE (2020-present)
  ─────────────────────────────────────────────────────────────
  Storage: S3 / ADLS / GCS (same as Gen 2)
  Format:  Parquet files + transaction log layer
    - Delta Lake (Databricks): _delta_log/ JSON transaction log
    - Apache Iceberg (Netflix): metadata tree + manifest files
    - Apache Hudi (Uber): timeline-based record-level upserts
  Compute: Spark, Trino, Flink, Athena, Snowflake (via external tables)

  What open table formats add:
    - ACID transactions: concurrent writes without corruption
    - Row-level UPDATE and DELETE: not just partition-level operations
    - Time travel: query data as of a specific timestamp or version
    - Schema evolution: add/rename columns without rewriting data
    - Partition evolution: change partition strategy without rewriting
    - Optimistic concurrency: multiple writers, serialisable isolation`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Data Lake vs Data Warehouse ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Lake vs Warehouse" />
        <SectionTitle>Data Lake vs Data Warehouse — The Real Technical Differences</SectionTitle>

        <Para>
          The lake vs warehouse comparison is one of the most commonly discussed
          topics in data engineering interviews and architecture reviews. The
          differences are not just cost — they are architectural choices about
          schema management, query patterns, data types, and governance that
          compound over time.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Data Lake', color: '#4285f4' },
            { label: 'Data Warehouse', color: '#7b61ff' },
          ]}
          keys={['dim', 'lake', 'warehouse']}
          rows={[
            { dim: 'Schema model', lake: 'Schema-on-read: structure applied at query time', warehouse: 'Schema-on-write: structure enforced at load time' },
            { dim: 'Data formats', lake: 'Any format: CSV, JSON, Parquet, images, logs, audio', warehouse: 'Structured tabular data only' },
            { dim: 'Storage cost', lake: 'Very low — S3 at $23/TB/month', warehouse: 'Higher — proprietary compressed columnar storage' },
            { dim: 'Query speed', lake: 'Slower — metadata overhead, no native indexing', warehouse: 'Faster — columnar indexes, result caching, statistics' },
            { dim: 'ACID transactions', lake: 'No (plain), Yes (with Delta/Iceberg/Hudi)', warehouse: 'Yes — native, mature' },
            { dim: 'Row-level updates', lake: 'No (plain), Yes (with Delta/Iceberg MERGE)', warehouse: 'Yes — standard UPDATE/DELETE' },
            { dim: 'Schema enforcement', lake: 'Optional (schema-on-read by default)', warehouse: 'Mandatory (schema-on-write enforced)' },
            { dim: 'Data types', lake: 'Any — unstructured text, images, ML models', warehouse: 'Structured only — numbers, strings, dates' },
            { dim: 'Access patterns', lake: 'Batch analytics, ML training, ad-hoc exploration', warehouse: 'BI dashboards, SQL analytics, aggregated reporting' },
            { dim: 'Governance', lake: 'Requires explicit effort — data catalogs, access control', warehouse: 'Built-in — column-level permissions, row-level security' },
            { dim: 'Scaling model', lake: 'Decouple: storage and compute scale independently', warehouse: 'Coupled or semi-coupled (Snowflake separates more)' },
            { dim: 'Best tools 2026', lake: 'S3 + Delta Lake + Spark + Databricks', warehouse: 'Snowflake, BigQuery, Redshift, ClickHouse' },
          ]}
        />

        <Callout type="tip">
          <strong>The modern answer is not "lake or warehouse."</strong> It is
          "lake for raw storage and ML, warehouse for structured analytics." Most
          mature data platforms have both. Data flows from sources → data lake
          (raw storage, EL) → transformation → data warehouse (Silver/Gold, SQL
          analytics). The lakehouse architecture (Delta Lake, Iceberg) blurs this
          boundary by adding warehouse-like features to the lake layer.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Zone-Based Organisation ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Zone-Based Organisation" />
        <SectionTitle>Zones — How a Data Lake Is Organised Into Layers</SectionTitle>

        <Para>
          A raw dump of files on S3 is not a data lake — it is a data swamp.
          The difference is organisation. Every mature data lake uses a zone-based
          architecture that separates data by its quality level, transformation
          state, and access pattern. The zone model is the foundation of both
          the Medallion Architecture (covered in Module 30) and every well-governed
          data lake.
        </Para>

        <SubTitle>The standard four-zone model</SubTitle>

        <CodeBox label="Data lake zone organisation — the standard model">{`DATA LAKE ZONES (S3 bucket organisation for FreshCart):

s3://freshmart-data-lake/
├── landing/              ← ZONE 1: Landing / Raw Ingestion
│   ├── razorpay/
│   │   └── payments_20260317.json       (as received from API)
│   ├── shipfast/
│   │   └── deliveries_week_20260317.csv (as received from vendor SFTP)
│   └── postgres_cdc/
│       └── orders/
│           └── 2026/03/17/              (raw CDC events from Debezium)
│
├── bronze/               ← ZONE 2: Bronze / Raw Standardised
│   ├── payments/
│   │   └── year=2026/month=03/day=17/   (Parquet, Hive-partitioned)
│   ├── deliveries/
│   │   └── year=2026/month=03/week=11/
│   └── orders_cdc/
│       └── date=2026-03-17/
│
├── silver/               ← ZONE 3: Silver / Cleaned and Typed
│   ├── orders/
│   │   └── date=2026-03-17/             (validated, typed, deduped)
│   ├── customers/                       (cleaned, PII masked)
│   └── payments/                        (reconciled with bank data)
│
└── gold/                 ← ZONE 4: Gold / Business-Ready
    ├── daily_revenue/
    │   └── date=2026-03-17/
    ├── customer_ltv/
    │   └── date=2026-03-17/
    └── store_performance/
        └── date=2026-03-17/


ZONE CHARACTERISTICS:

ZONE 1 — LANDING (Raw Ingestion)
  Purpose:     Exact copy of data as received from source
  Transform:   None — file written exactly as received
  Format:      Whatever the source sends (JSON, CSV, XML)
  Retention:   30-90 days (after Bronze conversion, can expire)
  Access:      Pipeline engineers only
  Key rule:    IMMUTABLE — never modify, never delete during retention

ZONE 2 — BRONZE (Raw Standardised)
  Purpose:     Landed data converted to standard format (Parquet)
               with minimal transformation — types coerced for load compatibility
  Transform:   Format conversion, Hive partitioning, add ingestion metadata
  Format:      Parquet + Snappy/ZSTD compression, Hive-partitioned
  Retention:   1-3 years (raw data for reprocessing)
  Access:      Pipeline engineers, data scientists (raw exploration)
  Key rule:    APPEND ONLY via CDC/incremental — preserve all history

ZONE 3 — SILVER (Cleaned and Typed)
  Purpose:     Trusted, clean, validated data for analytical use
  Transform:   Type casting, deduplication, validation, NULL handling,
               normalisation, PII masking, business rule application
  Format:      Delta Lake / Iceberg (ACID, time travel) partitioned by date
  Retention:   2-5 years
  Access:      Data engineers, analysts, BI tools, ML engineers
  Key rule:    IDEMPOTENT UPDATES via MERGE — not append-only

ZONE 4 — GOLD (Business-Ready Aggregates)
  Purpose:     Pre-computed metrics and aggregates for dashboards and APIs
  Transform:   Aggregation, joining, business metric computation
  Format:      Delta Lake, typically small (GB not TB)
  Retention:   Long-term (1+ years)
  Access:      Analysts, BI tools, downstream APIs
  Key rule:    REBUILT regularly from Silver — not primary source of truth`}</CodeBox>

        <SubTitle>Access control by zone</SubTitle>

        <CodeBox label="IAM policies per zone — who can read and write where">{`# S3 bucket policy zones — principle of least privilege

# Landing zone: write by ingestion pipelines only, read by bronze conversion
# Bronze zone: write by format conversion, read by silver pipelines and data scientists
# Silver zone: write by transformation pipelines, read by analysts and BI tools
# Gold zone:   write by aggregation pipelines, read by everyone

# AWS IAM role structure:
# role/pipeline-ingestion: s3:PutObject on landing/*
# role/pipeline-bronze:    s3:GetObject on landing/*, s3:PutObject on bronze/*
# role/pipeline-silver:    s3:GetObject on bronze/*, s3:PutObject on silver/*
# role/pipeline-gold:      s3:GetObject on silver/*, s3:PutObject on gold/*
# role/analyst:            s3:GetObject on silver/*, s3:GetObject on gold/*
#                          (NO access to landing — raw PII)
# role/data-scientist:     s3:GetObject on bronze/*, silver/*, gold/*
#                          (bronze for raw ML training data)

# CRITICAL: landing and bronze zones contain raw PII (emails, phone numbers)
# Analysts and BI tools must NEVER have direct access to landing/bronze.
# Only masked/anonymised Silver and Gold are accessible to analysts.

# Azure ADLS Gen2 equivalent:
# Use POSIX-style ACLs on container directories:
# landing/: execute for pipeline-bronze service principal only
# bronze/:  read for data-scientists, execute for pipeline-silver
# silver/:  read for analysts, BI service principals
# gold/:    read for all authenticated users in the tenant

# Snowflake (for Silver and Gold served via warehouse):
# GRANT SELECT ON SCHEMA silver TO ROLE analyst;
# GRANT SELECT ON SCHEMA gold   TO ROLE analyst;
# REVOKE SELECT ON SCHEMA silver.customers_raw FROM ROLE analyst;
# (raw PII tables blocked even within Silver)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Object Storage Deep Dive ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Object Storage" />
        <SectionTitle>Object Storage — The Foundation Everything Else Sits On</SectionTitle>

        <Para>
          Every modern data lake is built on object storage — S3, Azure Data
          Lake Storage Gen2, or Google Cloud Storage. Understanding how object
          storage works at a level below the API is what lets a data engineer
          make correct decisions about file sizes, naming, access patterns,
          and cost optimisation.
        </Para>

        <SubTitle>How S3 works internally — what every DE must know</SubTitle>

        <CodeBox label="S3 internals — the model that explains file design decisions">{`S3 OBJECT MODEL:
  Everything is an object. An object has:
    - Key:        the "path" — "bronze/orders/date=2026-03-17/part-001.parquet"
    - Value:      the bytes of the file
    - Metadata:   content-type, user-defined key-value pairs, system metadata
    - ETag:       MD5 hash of the content (used for integrity checking)
    - Version ID: if versioning is enabled

  There are no real directories — the key is just a string.
  "Directories" are a UI fiction — a key ending in / is a zero-byte object.
  s3://bucket/bronze/orders/ is just a prefix filter on keys, not a real dir.

  IMPLICATION FOR LISTING:
    ListObjectsV2 returns all keys matching a prefix.
    s3://bucket/bronze/orders/ with 1,000,000 objects:
      → 1,000 API calls (1,000 objects per page)
      → Athena/Spark must list all keys to find relevant partitions
      → Use Hive-style partitioning to reduce list scope

S3 CONSISTENCY MODEL (since Dec 2020):
  S3 provides strong read-after-write consistency for all operations.
  After a PUT: the GET immediately returns the new object. ✓
  After a DELETE: the GET immediately returns 404. ✓
  This was eventually consistent before Dec 2020 — old code may still
  have unnecessary sleep() calls to work around the old model.

S3 PERFORMANCE:
  Request rate limits (per prefix):
    3,500 PUT/COPY/POST/DELETE requests per second
    5,500 GET/HEAD requests per second
  Each unique prefix has its own limits:
    s3://bucket/a/  and  s3://bucket/b/  are SEPARATE rate limits
    Use date-partitioning: orders/date=2026-03-17/ and orders/date=2026-03-18/
    give each day its own rate limit bucket — effectively unlimited

  Multipart upload:
    Objects > 5 MB: use multipart upload (automatic in boto3/s3fs)
    Parts uploaded in parallel → fast for large files
    Minimum part size: 5 MB (except last part)
    Maximum object size: 5 TB

  S3 Transfer Acceleration:
    Routes uploads through CloudFront edge nodes
    Use for: uploading from mobile devices or geographically distant sources

S3 STORAGE CLASSES AND COST (US East, 2026 approximate):
  Standard:            $0.023/GB/month  — frequently accessed
  Standard-IA:         $0.0125/GB/month — infrequently accessed, instant retrieval
  Glacier Instant:     $0.004/GB/month  — archive, instant retrieval
  Glacier Flexible:    $0.0036/GB/month — archive, 3-5 hour retrieval
  Glacier Deep Archive: $0.00099/GB/month — coldest archive, 12+ hours

  Lifecycle policy automatically transitions objects between classes.
  Apply per prefix: landing/ transitions to IA after 7 days, delete after 30.

S3 NAMING BEST PRACTICES:
  Use lowercase: S3 is case-sensitive but tools treat case inconsistently
  Use hyphens not underscores in bucket names: freshmart-data-lake
  Use underscores in object keys for compatibility: date=2026-03-17
  Avoid special characters: only a-z, 0-9, /, -, _, .
  Never put credentials or PII in bucket names or object keys
  (keys appear in logs, access logs, CloudTrail)`}</CodeBox>

        <SubTitle>ADLS Gen2 — how it differs from S3</SubTitle>

        <CodeBox label="Azure Data Lake Storage Gen2 — key differences from S3">{`ADLS GEN2 vs S3:

HIERARCHICAL NAMESPACE (HNS):
  ADLS Gen2 supports a true hierarchical namespace — directories are real,
  not just key prefixes. This has performance implications:
    - Rename a directory: atomic O(1) operation
      S3: must copy all objects to new prefix, delete originals — O(n) time
    - Delete a directory: O(1) in ADLS, O(n) in S3
    - Directory listing: O(1) in ADLS (real directory), O(n) in S3 (list all keys)
  For Spark jobs that rename output directories (common in Hadoop code):
    ADLS is significantly faster than S3 for this operation.

ACCESS CONTROL:
  ADLS supports POSIX-style ACLs on files and directories:
    - Owner: full rwx
    - Owning group: configurable rwx
    - Other: configurable rwx
    - Named user/group ACLs (like Linux setfacl)
  This is finer-grained than S3's bucket policy + IAM combination.
  Azure Active Directory integration: assign ADLS ACLs to AAD groups.

PROTOCOL:
  ADLS Gen2 supports both:
    - Blob storage API (https://account.blob.core.windows.net/container/blob)
    - DFS API (https://account.dfs.core.windows.net/filesystem/path)
  Use DFS API for hierarchical operations (rename, directory delete).
  Use Blob API for compatibility with older tools that do not know DFS.
  In Spark: spark.read.parquet('abfss://container@account.dfs.core.windows.net/path')

COST (2026 approximate):
  LRS (Locally Redundant):  $0.018/GB/month  (similar to S3 Standard)
  ZRS (Zone Redundant):     $0.023/GB/month
  GRS (Geo Redundant):      $0.036/GB/month

AUTHENTICATION:
  Service Principal (recommended for pipelines):
    - Client ID + Client Secret → OAuth 2.0 token
    - Assign Storage Blob Data Contributor role to service principal
  Managed Identity (best for Azure VMs / AKS):
    - No credentials needed — identity from the compute resource
  Shared Access Signature (SAS):
    - Time-limited URL with specific permissions
    - Use for temporary external access

GCS (Google Cloud Storage) is similar to S3:
  - Eventually consistent (unlike S3's strong consistency since 2020)
  - Similar object model, bucket-based
  - gs:// URI scheme
  - Strong integration with BigQuery (native external tables)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Compute-Storage Separation ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Compute-Storage Separation" />
        <SectionTitle>Compute-Storage Separation — Why It Changes Everything</SectionTitle>

        <Para>
          The separation of compute from storage is the architectural decision
          that makes cloud data lakes economically viable and operationally
          flexible. It sounds like an infrastructure detail but has profound
          consequences for how a data platform is designed, scaled, and costed.
        </Para>

        <CodeBox label="Compute-storage separation — economic and operational implications">{`TRADITIONAL WAREHOUSE (coupled compute and storage):
  ─────────────────────────────────────────────────────────────────────
  Data stored ON the same machines that query it.
  Teradata: storage and CPU on the same proprietary blades.
  Redshift (original): storage and compute on the same EC2 instances.

  IMPLICATIONS:
    To add 10 TB storage: buy 10 TB of nodes (also adds ~10× compute).
    Peak CPU needs (end-of-month reports): must always have peak nodes running.
    Off-peak (2 AM): same nodes idle, same cost.
    Hardware utilisation: typically 10-30% of capacity.
    Data growth → hardware growth → capital expense every 3-5 years.

CLOUD DATA LAKE (decoupled compute and storage):
  ─────────────────────────────────────────────────────────────────────
  Data stored on S3 (storage-only, no compute).
  Query engines (Spark, Athena, Presto) are separate compute resources.

  IMPLICATIONS:
    To add 10 TB storage: write more data to S3. Compute unchanged.
    Peak CPU needs: spin up a large Spark cluster for 4 hours. Terminate after.
    Off-peak: S3 still holds data, zero compute running. Zero compute cost.
    Data growth → storage cost growth. Compute cost tied to query volume only.

  COST COMPARISON FOR A 100 TB DATA PLATFORM:
    Storage: 100 TB × $23/TB/month = $2,300/month always-on
    Compute: 20 Spark jobs/day × 10 r5.4xlarge × $1/hr × 1 hr = $200/day
    Total:   $2,300 + ($200 × 30) = $8,300/month

    Traditional warehouse equivalent (Redshift):
    dc2.8xlarge (16 nodes for 100 TB): $52,000/month
    → Cloud lake is ~6× cheaper for the same data volume

THE TRADE-OFF:
  Coupled: faster queries (data near compute, no network hop)
  Decoupled: more flexible, cheaper, scales each dimension independently

  Modern cloud warehouses (Snowflake, BigQuery) use a hybrid approach:
    - Data stored in cloud object storage (S3-equivalent)
    - Compute clusters (virtual warehouses) read from storage
    - Result cache and local disk cache reduce the network penalty
    - Effectively decoupled but with intelligent caching to preserve speed

SPARK ON S3 — THE NETWORK PERFORMANCE GAP:
  Spark reading 1 TB from local HDFS: ~100 GB/s aggregate throughput
  Spark reading 1 TB from S3: ~10 GB/s per cluster (network bottleneck)
  → S3 reads are ~10× slower than HDFS for the same cluster size

  MITIGATION:
    1. Use Parquet with predicate pushdown — read only needed columns/rows
    2. Use columnar formats — minimise bytes transferred per query
    3. Partition data — read only relevant partitions
    4. Use Delta Lake data skipping — skip files with no matching rows
    5. S3 Express One Zone (new, 2023): 10× lower latency than standard S3
    6. Use Snowflake/BigQuery for interactive queries (they cache aggressively)
       Use Spark for batch processing where latency is acceptable`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Data Lake Governance ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Governance and the Data Swamp Problem" />
        <SectionTitle>Governance — How Data Lakes Become Data Swamps</SectionTitle>

        <Para>
          The data swamp problem is universal: every organisation that builds
          a data lake without a governance strategy eventually ends up with
          petabytes of unorganised files where nobody knows what data is in them,
          who owns it, whether it is trustworthy, or how to query it. The lake
          degrades from a strategic asset to an expensive dump of uncertain quality.
        </Para>

        <Para>
          Governance is not a single tool or policy — it is the ongoing practice
          of maintaining the discoverability, quality, lineage, and access control
          of data in the lake. Data lakes require explicit governance investment
          that data warehouses handle implicitly through schema enforcement.
        </Para>

        <SubTitle>The four governance pillars</SubTitle>

        {[
          {
            pillar: 'Data Catalogue',
            color: '#00e676',
            problem: 'Nobody knows what data exists in the lake or what it means.',
            solution: 'A searchable inventory of all datasets with descriptions, owners, schemas, sample data, and usage statistics. AWS Glue Data Catalog, Apache Atlas, Amundsen, DataHub.',
            practice: 'Every new table added to the lake must have: owner, description, update frequency, and schema documented in the catalog. Enforce this as a pull request requirement.',
          },
          {
            pillar: 'Data Lineage',
            color: '#7b61ff',
            problem: 'A metric is wrong. Nobody knows which pipeline produced it or what source data it came from.',
            solution: 'Track the transformation history of every dataset — where it came from, what transformed it, what datasets depend on it. dbt lineage graph, OpenLineage, Marquez, DataHub.',
            practice: 'Every dbt model\'s lineage is automatically documented. Every Spark job emits OpenLineage events. Analysts can trace any metric back to its source table.',
          },
          {
            pillar: 'Data Quality',
            color: '#f97316',
            problem: 'Data quality degrades silently. Analysts make decisions on wrong data weeks before anyone notices.',
            solution: 'Automated checks on every pipeline run: row counts, null rates, value distributions, referential integrity. dbt tests, Great Expectations, Soda.',
            practice: 'Every Silver and Gold table has: not_null tests on required columns, unique tests on primary keys, accepted_values on categoricals, freshness checks, and anomaly detection on row counts.',
          },
          {
            pillar: 'Access Control',
            color: '#4285f4',
            problem: 'Analysts access raw PII. Engineers accidentally overwrite production data. No audit trail.',
            solution: 'Zone-based IAM: landing/bronze read-restricted, silver/gold analyst-readable. Column-level and row-level security in the warehouse layer. Audit logs for all access.',
            practice: 'Principle of least privilege: analysts get SELECT on silver/gold only. Pipelines get write only to their specific output prefix. All access logged to CloudTrail/Azure Monitor.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '18px 20px' }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 10,
              }}>{item.pillar}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Problem</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.problem}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Solution</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.solution}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: '#00e676',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Practice</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.practice}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 08 — The Lakehouse ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — The Lakehouse" />
        <SectionTitle>The Lakehouse — Converging Lakes and Warehouses</SectionTitle>

        <Para>
          The lakehouse is an architectural pattern that adds warehouse-quality
          features (ACID transactions, schema enforcement, row-level updates,
          time travel) directly to the data lake storage layer using open table
          formats. It is not a new type of system — it is a new set of capabilities
          layered on top of existing object storage.
        </Para>

        <Para>
          The three open table formats — Delta Lake, Apache Iceberg, and Apache
          Hudi — each implement the lakehouse pattern differently, but they all
          solve the same core problems with plain object storage: no transactions,
          no row-level updates, and no reliable schema enforcement.
        </Para>

        <SubTitle>Delta Lake — the most widely adopted open table format</SubTitle>

        <CodeBox label="Delta Lake internals — transaction log and ACID guarantees">{`DELTA LAKE TABLE STRUCTURE:
  s3://freshmart-lake/silver/orders/
  ├── _delta_log/
  │   ├── 00000000000000000000.json   ← commit 0 (table creation)
  │   ├── 00000000000000000001.json   ← commit 1 (first write)
  │   ├── 00000000000000000042.json   ← commit 42 (latest)
  │   └── 00000000000000000010.checkpoint.parquet  ← periodic checkpoint
  ├── date=2026-03-15/
  │   └── part-00001.parquet
  ├── date=2026-03-16/
  │   └── part-00001.parquet
  └── date=2026-03-17/
      ├── part-00001.parquet           ← written in commit 41
      └── part-00002.parquet           ← written in commit 42

TRANSACTION LOG ENTRY (00000000000000000042.json):
  {
    "commitInfo": {
      "timestamp": 1710706472847,
      "operation": "MERGE",
      "operationParameters": {"predicate": "target.order_id = source.order_id"}
    }
  }
  {
    "add": {
      "path": "date=2026-03-17/part-00002.parquet",
      "partitionValues": {"date": "2026-03-17"},
      "size": 52428800,
      "stats": {"numRecords": 50000, "minValues": {"order_id": 9200000},
                "maxValues": {"order_id": 9250000}}
    }
  }
  {
    "remove": {
      "path": "date=2026-03-17/part-00001.parquet",
      "deletionTimestamp": 1710706472000
    }
  }

HOW DELTA ACHIEVES ACID:
  Atomicity: a write either commits a new JSON log entry (visible)
             or does not (Parquet files written but not referenced)
  Consistency: schema validation at commit time
  Isolation:  optimistic concurrency — concurrent writes detected via
              log entry conflicts, one writer succeeds, other retries
  Durability: S3 11-nines durability — once PUT, object is durable

TIME TRAVEL:
  Every commit in the log represents a version of the table.
  Read version 40 (before commit 41 and 42):
    spark.read.format('delta').option('versionAsOf', 40).load(path)
    spark.read.format('delta').option('timestampAsOf', '2026-03-16').load(path)
  Useful for: debugging, auditing, recovering from bad writes
  Retention: versions kept for 30 days by default (configurable)

DELTA OPERATIONS:
  OPTIMIZE:   compact small files into larger ones
  VACUUM:     remove files no longer referenced (respects retention)
  Z-ORDER:    co-locate related data by a column (improves skip rate)
  RESTORE:    revert table to a previous version

-- Z-ORDER example (Databricks / Spark):
OPTIMIZE silver.orders ZORDER BY (store_id, order_date);
-- Co-locates rows with same store_id and order_date in same files
-- Queries filtering by store_id + order_date skip ~80% of files`}</CodeBox>

        <SubTitle>Delta Lake vs Iceberg vs Hudi — choosing between the three</SubTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Delta Lake', color: '#00add4' },
            { label: 'Apache Iceberg', color: '#f97316' },
            { label: 'Apache Hudi', color: '#7b61ff' },
          ]}
          keys={['dim', 'delta', 'iceberg', 'hudi']}
          rows={[
            { dim: 'Origin', delta: 'Databricks (2019)', iceberg: 'Netflix (2018)', hudi: 'Uber (2019)' },
            { dim: 'Primary strength', delta: 'Spark integration, DML, time travel', iceberg: 'Engine-agnostic design, partition evolution', hudi: 'Upserts and incremental processing' },
            { dim: 'ACID support', delta: 'Full ACID', iceberg: 'Full ACID (Iceberg v2)', hudi: 'Full ACID' },
            { dim: 'Row-level updates', delta: 'MERGE INTO, UPDATE, DELETE', iceberg: 'MERGE INTO, UPDATE, DELETE (v2)', hudi: 'Native — designed for record-level upserts' },
            { dim: 'Partition evolution', delta: 'Requires data rewrite', iceberg: 'Native — no data rewrite needed', hudi: 'Limited' },
            { dim: 'Engine support', delta: 'Spark (best), Flink, Trino (via DeltaReader)', iceberg: 'Spark, Flink, Trino, Athena, BigQuery — widest', hudi: 'Spark (best), Flink, Hive, Presto' },
            { dim: 'Cloud native', delta: 'Databricks native, S3 / ADLS / GCS', iceberg: 'All cloud storage — most portable', hudi: 'S3, ADLS, GCS' },
            { dim: 'Best for', delta: 'Databricks-centric stack, strong Spark use', iceberg: 'Multi-engine, multi-cloud portability', hudi: 'High-velocity CDC ingestion' },
          ]}
        />

        <Callout type="info">
          <strong>As of 2026:</strong> Delta Lake is the most widely adopted in
          Databricks environments. Iceberg is growing fastest due to its
          engine-agnostic design — Snowflake, BigQuery, and Athena all support it
          natively. Hudi remains popular at companies with heavy CDC ingestion
          workloads (similar to Uber's origin use case). If you are building a
          new platform, Iceberg's portability makes it the lowest-lock-in choice.
        </Callout>
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
        <SectionTitle>Designing FreshCart's Data Lake From Scratch</SectionTitle>

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
            Scenario — FreshCart · New data lake design
          </div>

          <Para>
            FreshCart is migrating from an on-premise Hadoop cluster to a cloud
            data lake on AWS. You are asked to design the architecture. Here is
            the complete design decision process a senior data engineer follows.
          </Para>

          <CodeBox label="FreshCart data lake design — decisions and rationale">{`DECISION 1: Storage choice
  Options: S3 Standard vs ADLS Gen2 vs GCS
  FreshCart is AWS-native (EC2, RDS, Lambda already on AWS).
  Decision: S3 — zero integration friction with existing AWS services.
  Bucket structure: one bucket per environment (dev/staging/prod).
  prod: s3://freshmart-data-lake-prod/  (versioning on, default encryption)

DECISION 2: Zone naming and organisation
  landing/ bronze/ silver/ gold/   — clear, industry-standard names
  Within each zone: {entity}/{partition_cols}/
  Partition by date for all time-series data, avoid high-cardinality columns.

DECISION 3: File format
  Landing: as-received (JSON from APIs, CSV from vendors)
  Bronze: Parquet + ZSTD, Hive-partitioned by date
  Silver: Delta Lake (ACID, time travel, row-level updates needed for CDC)
  Gold:   Delta Lake (small tables, need MERGE semantics from dbt incremental)

DECISION 4: Compute engine
  Batch transformation: Spark on Databricks (existing team expertise)
  Interactive queries: Athena (analyst self-service, serverless, no clusters)
  dbt (Silver→Gold transformations): runs against Databricks SQL Warehouse
  ML training: Spark on Databricks + SageMaker for model training

DECISION 5: Catalog
  AWS Glue Data Catalog — integrated with S3, Athena, EMR, Glue ETL.
  Landing and Bronze tables registered manually by pipelines.
  Silver and Gold tables: dbt generates schema + docs → synced to Glue.
  DataHub deployed for business-facing catalog (lineage, ownership).

DECISION 6: Access control
  landing/: only ingestion Lambda + Spark ingestion roles
  bronze/:  ingestion roles + data engineers + data scientists
  silver/:  transformation roles + analysts (read-only) + Athena
  gold/:    transformation roles + analysts + Metabase BI service account
  PII data: blocked at Silver — analysts never see raw emails/phones.

DECISION 7: Cost optimisation
  Lifecycle policies:
    landing/ → Standard-IA after 7 days → delete after 30 days
    bronze/  → Standard-IA after 90 days → Glacier after 365 days
    silver/  → Standard-IA after 180 days → Glacier after 730 days
    gold/    → no lifecycle (small, frequently queried)
  Delta VACUUM: weekly, retain 30 days
  Delta OPTIMIZE: daily, compact files > 7 days old

DECISION 8: Governance baseline (phase 1)
  Data catalog: required for all new Silver/Gold tables before merge
  dbt tests: not_null + unique on all primary keys, freshness checks
  Row count anomaly detection: alert if count deviates > 20% from 7-day avg
  Access audit: CloudTrail → Athena table → weekly access report

RESULTING ARCHITECTURE:
  Sources → Kafka → Debezium → Kafka topics
          → Lambda (API polling) → s3://freshmart-data-lake-prod/landing/

  landing/ → Spark (Databricks) → s3://freshmart-data-lake-prod/bronze/
           (format conversion, minimal typing, Hive partitioning)

  bronze/ → dbt on Databricks SQL → s3://freshmart-data-lake-prod/silver/
           (Delta Lake, ACID, typed, validated, PII-masked)

  silver/ → dbt on Databricks SQL → s3://freshmart-data-lake-prod/gold/
           (Delta Lake, pre-computed metrics, business-ready)

  gold/ → Athena (self-service SQL) + Metabase (dashboards)`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a data lake and how does it differ from a data warehouse?',
            a: `A data lake is a centralised storage repository that holds data in its native raw format — any format, any scale — with compute separated from storage and schema applied at query time rather than write time.

The key differences from a data warehouse are four. First, schema model: a warehouse enforces schema on write — you must define the structure before loading, and the warehouse rejects data that does not conform. A data lake uses schema on read — data is stored in whatever format it arrives, and the query engine applies structure when reading. This makes the lake more flexible for new data types but less reliable by default.

Second, data types: a warehouse stores only structured tabular data. A data lake can store anything — JSON event logs, CSV files, images, audio, ML model artifacts. This was the original motivation for the lake's invention.

Third, cost model: warehouse storage is expensive because it uses proprietary compressed columnar formats on proprietary hardware or managed storage. Data lake storage uses commodity object storage (S3 at $23/TB/month) — typically 10–100× cheaper per terabyte than warehouse storage.

Fourth, update semantics: traditional warehouses support row-level UPDATE and DELETE natively. Plain data lakes do not — data is immutable files, and "updating" requires rewriting the entire partition. Open table formats (Delta Lake, Iceberg) have added MERGE, UPDATE, and DELETE to the lake, blurring this distinction.

In practice, mature data platforms use both: the data lake for raw storage, historical data, and ML training data, with a warehouse for clean analytical data served to BI tools. The lakehouse pattern is converging the two.`,
          },
          {
            q: 'Q2. What is schema-on-read and what are its advantages and risks?',
            a: `Schema-on-read means the structure of data — column names, data types, nullable constraints — is applied when the data is queried, not when it is stored. The data is written to storage in its native format (a JSON file, a CSV file, a Parquet file with its own embedded schema) and the query engine imposes the expected schema at query time.

The advantages are three. First, write speed: data lands in the lake immediately without waiting for schema definition, table creation, or ETL transformation. A new event type from the application can be in the landing zone within minutes of being shipped, not days after a schema change workflow. Second, flexibility: raw data is preserved exactly as it arrived. If the source schema changes, the raw data still exists and can be reprocessed with the new understanding. In a warehouse, schema changes require careful ALTER TABLE operations and may make old data incompatible. Third, multiple interpretations: the same raw data can be queried with different schemas by different consumers — one team flattens nested JSON one way, another team flattens it differently.

The risks are also three. First, quality degradation: without schema enforcement at write time, bad data enters the lake silently. A field that should be a decimal arrives as a string and passes through to the Bronze zone without error. Second, discoverability failure: schema-on-read requires someone to know what schema to apply. Undocumented data in a lake is effectively unusable. Third, query-time errors: type mismatches that would have been caught at write time surface at query time, often in the middle of analyst work.

The practical resolution is schema-on-read in the landing and bronze zones (raw data preserved exactly), combined with schema-on-write semantics in the silver zone (Delta Lake enforces the Silver schema at MERGE time). This gives the flexibility benefits at the entry point and the reliability benefits at the analytical layer.`,
          },
          {
            q: 'Q3. What is the data swamp problem and how do you prevent it?',
            a: `The data swamp problem is what happens when a data lake grows without governance: petabytes of files accumulate where nobody knows what data is in them, who owns it, when it was last updated, whether it can be trusted, how it relates to other datasets, or how to query it. The lake becomes an expensive dump that costs more to maintain than it delivers in value.

The root cause is that data lakes lack the implicit governance that warehouses provide by default. A warehouse enforces schema, maintains statistics, requires explicit table creation — all of which create a natural inventory. A lake accepts anything written to any path, with no requirement to document, register, or validate it.

Prevention requires four explicit governance practices. Data catalog: every dataset added to the lake must be registered with metadata — owner, description, schema, update frequency, data classification. Treat undocumented data as unusable. Data quality: automated tests on every pipeline run — row count checks, null rate monitoring, value range validation, freshness checks. Silent quality degradation is what makes a lake undependable. Data lineage: track how every dataset was produced — which pipeline, from which source, through which transformations. When a metric is wrong, lineage is what lets you trace it back to the source in minutes rather than hours. Access control: enforce zone-based permissions. Raw PII in landing/bronze zones must not be accessible to analysts. Ungoverned write access leads to data overwriting and contamination.

The governance practices must be enforced as part of the deployment process, not added after the lake is already a swamp. A code review requirement that blocks merging any pipeline that produces a new Silver or Gold table without catalog registration and quality tests is more effective than any retroactive cleanup effort.`,
          },
          {
            q: 'Q4. What problem does Delta Lake solve that plain Parquet on S3 does not?',
            a: `Plain Parquet on S3 has four significant limitations that Delta Lake addresses.

First, no atomicity for multi-file writes. When a Spark job writes 10 Parquet files to a partition and fails after writing 7, those 7 files are visible to readers immediately. Queries run against the partition see partial data. Delta Lake's transaction log makes multi-file writes atomic: the 10 files are written to the data directory, but they become visible to readers only when a new JSON entry in the transaction log references all 10. If the write fails, the 7 written files are invisible and get cleaned up by VACUUM.

Second, no row-level updates or deletes. Parquet files are immutable — you cannot update a single row. Updating order_id 9284751's status requires rewriting the entire partition containing that row. For tables with high update rates (CDC ingestion, slowly changing dimensions), this is impractical. Delta Lake adds MERGE INTO, UPDATE, and DELETE operations that efficiently update only the files containing changed rows.

Third, no concurrent write safety. If two Spark jobs write to the same Parquet partition simultaneously, the second writer's files overwrite the first's silently. There is no conflict detection. Delta Lake uses optimistic concurrency: both writers attempt to commit a new transaction log entry, and if both reference the same version, one succeeds and the other detects the conflict and retries.

Fourth, no history. Plain Parquet has no concept of table versions. Delta Lake's transaction log is a history of every change, enabling time travel (read data as of version 40 or as of a specific timestamp) and audit trails. When a bad write corrupts data, RESTORE TABLE TO VERSION 40 recovers the previous state.

These four properties together make Delta Lake behave more like a relational database table than a collection of files — which is exactly the lakehouse concept.`,
          },
          {
            q: 'Q5. Compare Delta Lake, Apache Iceberg, and Apache Hudi. When would you choose each?',
            a: `All three are open table formats that add ACID transactions, row-level updates, and time travel to object storage. The differences are in their design priorities, ecosystem support, and specific strengths.

Delta Lake originated at Databricks and is optimised for Spark. Its transaction log is a series of JSON files — simple and debuggable. It has the best Spark integration of the three and the most mature DML (MERGE, UPDATE, DELETE) implementation. The limitation is portability: while Trino and Athena have Delta Lake readers, Snowflake and BigQuery support it less natively than Iceberg. Choose Delta Lake when your stack is Databricks-centric, your team has Spark expertise, and you are not planning to query the same tables from multiple engines.

Apache Iceberg originated at Netflix and was designed from the start to be engine-agnostic. Its table format is understood natively by Spark, Flink, Trino, Athena, Snowflake, BigQuery, and Hive — a wider engine surface than Delta Lake. Its metadata model (metadata files → manifest lists → manifest files → data files) is more complex than Delta's log but enables features Delta lacks, most importantly partition evolution: you can change the partitioning strategy of an Iceberg table without rewriting any data. Choose Iceberg when portability is critical — you want to query the same tables from Snowflake for analytics and Spark for ML, or you are in a multi-cloud environment.

Apache Hudi originated at Uber and was designed specifically for high-velocity CDC ingestion — the exact problem Uber had with ride-event streaming. It provides two table types: Copy-on-Write (rewrite files on update — optimised for read performance) and Merge-on-Read (write update logs separately — optimised for write performance, compacted periodically). Choose Hudi when your primary workload is near-real-time record-level upserts from CDC streams at very high volume, and read latency is less critical than write throughput.

For new projects in 2026, Iceberg is the most future-proof choice due to its engine portability and active adoption by every major cloud platform.`,
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
            error: `Athena query scans 4.2 TB and takes 18 minutes — the table has a partition filter but partition pruning is not working`,
            cause: 'The Athena table was created with a partition column (date) but MSCK REPAIR TABLE was never run after new partitions were added. Glue Catalog does not know the new partitions exist. Athena lists all objects under the S3 prefix and scans everything because the catalog partition metadata is stale. Alternatively, the query filter uses a function on the partition column (CAST(date AS DATE)) which prevents Athena from using partition metadata for pruning.',
            fix: 'Register new partitions: MSCK REPAIR TABLE freshmart_silver.orders will rediscover all Hive-style partitions and add them to the Glue catalog. For ongoing automation: add an AWS Glue Crawler on a schedule, or register partitions programmatically in the pipeline after writing: ALTER TABLE freshmart_silver.orders ADD PARTITION (date=\'2026-03-17\') LOCATION \'s3://bucket/silver/orders/date=2026-03-17/\'. Ensure the query filter uses the partition column directly without functions: WHERE date = \'2026-03-17\' not WHERE CAST(date AS DATE) = \'2026-03-17\'.',
          },
          {
            error: `Delta Lake concurrent write error: ConcurrentModificationException — concurrent writers both attempted to commit to version 47`,
            cause: 'Two Spark jobs attempted to write to the same Delta Lake table simultaneously. Delta Lake uses optimistic concurrency — both jobs wrote their Parquet files, both attempted to write a commit entry for version 47 to the transaction log. S3 PUT operations are last-writer-wins, so only one commit succeeded. Delta detected the conflict on the other writer\'s commit attempt.',
            fix: 'This is Delta Lake\'s concurrency protection working correctly — the failed job should retry. For structured streaming: the checkpoint mechanism handles this automatically. For batch jobs: add retry logic around the Delta write operation. To prevent conflicts systematically: ensure only one Spark job writes to a specific table partition at a time. Use Airflow max_active_runs=1 on the DAG. For append-only workloads, multiple writers can use append mode to different partition paths without conflicting. For MERGE operations: they are serialisable — run sequentially if conflicts are frequent.',
          },
          {
            error: `S3 ListObjectsV2 returns empty for a prefix that definitely has objects — Spark job reports zero input files`,
            cause: 'The S3 prefix being listed does not exactly match the prefix where files were written. S3 is case-sensitive and there is no concept of a directory — a prefix mismatch means ListObjects returns nothing. Common causes: a trailing slash difference (bronze/orders vs bronze/orders/), a typo in the path, or the pipeline wrote to a tmp/ prefix and the files were never moved to the final location.',
            fix: 'Verify the exact S3 path: aws s3 ls s3://bucket/bronze/orders/ --recursive | head -20. Compare character-by-character with the path the Spark job is reading. Check for case differences: Bronze vs bronze. Check for trailing slashes. In Python pipelines, construct paths with os.path.join or pathlib to avoid accidental double slashes or missing slashes. Add a startup check to the pipeline that verifies the output path exists before attempting to read it.',
          },
          {
            error: `Delta VACUUM removes files that are still needed — downstream query fails with FileNotFoundException after VACUUM was run with retention 0`,
            cause: 'VACUUM was run with retentionHours=0 or a very small retention period. Delta Lake\'s safety check (which prevents retention < 7 days) was explicitly disabled with spark.databricks.delta.retentionDurationCheck.enabled=false. Files that were part of the table state as of the version before VACUUM ran were deleted, but a concurrent reader was still using them for a time travel query or a query that started before VACUUM completed.',
            fix: 'Restore the table from a Delta backup or snapshot if available. Never run VACUUM with retention < 7 days (168 hours) in production. The 7-day minimum exists because Delta Lake\'s conflict detection algorithm requires files to be available for the window of any concurrent reader. If storage cost is a concern, run VACUUM weekly with 168-hour retention rather than reducing retention below the safety threshold. Add a process guard: always run VACUUM without disabling the retention check.',
          },
          {
            error: `An analyst accidentally writes test data to s3://freshmart-data-lake-prod/silver/orders/ overwriting production data`,
            cause: 'The analyst\'s IAM role or service account has write permissions on the Silver zone. This violates the principle of least privilege — analysts should have read-only access to Silver and Gold. The accidental write was possible because the access control policy was not enforced correctly when the analyst role was created.',
            fix: 'Immediate: restore from the Delta transaction log — RESTORE TABLE silver.orders TO VERSION BEFORE UPDATE will recover the previous state. Long-term: review and fix IAM policies. Analysts should have s3:GetObject on silver/* and gold/* but never s3:PutObject on any production zone. For Snowflake: GRANT SELECT only, no INSERT/UPDATE. Audit all IAM roles with write access to production zones quarterly. Enable S3 Object Lock on production zones to make objects immutable for a retention period (prevents both accidental and malicious overwrites). Add CloudTrail alerting: alert when any s3:PutObject or s3:DeleteObject occurs on silver/* or gold/* from a non-pipeline role.',
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
        'A data lake stores data in native raw format at any scale, with compute separated from storage and schema applied at query time. The four defining properties: any data format, any scale (object storage), schema-on-read, and compute-storage separation.',
        'Data lakes were invented to solve three warehouse limitations: warehouse storage was too expensive for large volumes of unstructured data, schema-on-write made adding new data types slow and rigid, and coupled compute-storage forced hardware scaling in both dimensions simultaneously.',
        'Zone-based organisation prevents data swamps. Four zones: Landing (raw as-received, immutable), Bronze (format-converted to Parquet, minimal typing), Silver (cleaned, validated, ACID via Delta Lake), Gold (pre-computed business aggregates). Each zone has distinct access controls, retention policies, and transformation semantics.',
        'Object storage (S3) has no real directories — keys are just strings with prefixes. S3 provides strong read-after-write consistency since 2020. Rate limits are per prefix, so date-partitioned paths effectively have unlimited throughput. Lifecycle policies automate tier transitions for cost optimisation.',
        'Compute-storage separation means storage (S3) and compute (Spark, Athena) scale independently. The lake is 6–10× cheaper than a warehouse for equivalent data volume. The trade-off: S3 reads are ~10× slower than HDFS reads — mitigated by Parquet predicate pushdown, columnar formats, and partition pruning.',
        'The data swamp problem is universal without explicit governance. The four governance pillars: Data Catalog (what data exists and what it means), Data Lineage (where data came from), Data Quality (automated tests on every pipeline run), Access Control (zone-based permissions with PII protection).',
        'Delta Lake adds ACID transactions, row-level updates (MERGE/UPDATE/DELETE), time travel, and schema enforcement to plain Parquet on S3 via a transaction log (_delta_log/). The log makes multi-file writes atomic — files are invisible until the log entry commits.',
        'The lakehouse converges lake storage costs with warehouse query capabilities. Delta Lake (Databricks-native), Apache Iceberg (widest engine support — best for portability), and Apache Hudi (optimised for high-velocity CDC upserts) are the three open table formats. Iceberg is the most portable choice for new projects in 2026.',
        'Schema-on-read gives write flexibility but requires explicit quality enforcement downstream. Use schema-on-read in landing/bronze (raw data preserved), schema-on-write semantics in silver (Delta enforces schema at MERGE). Never leave Silver as an ungoverned schema-on-read zone.',
        'VACUUM must never run with retention below 7 days (168 hours). The 7-day minimum protects concurrent readers and time travel users. Run VACUUM weekly with 168-hour retention. OPTIMIZE (compaction) should run daily on recently written partitions. Z-ORDER on the most common filter columns reduces data skipping overhead.',
      ]} />

    </LearnLayout>
  )
}