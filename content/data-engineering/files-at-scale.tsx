import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Working with Files at Scale — Data Engineering | Chaduvuko',
  description:
    'File organisation patterns, compression, partitioning strategies, the small file problem, format conversion pipelines, and everything a data engineer needs to manage files efficiently at petabyte scale.',
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

export default function FilesAtScaleModule() {
  return (
    <LearnLayout
      title="Working with Files at Scale"
      description="File organisation, compression, partitioning, the small file problem, and format conversion pipelines."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Files at Scale Is Its Own Topic ────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Files Are Not Trivial at Scale" />
        <SectionTitle>Why Working with Files at Scale Is Its Own Engineering Discipline</SectionTitle>

        <Para>
          A single CSV file is trivial. A directory of 50 million Parquet files
          representing three years of event data is not. At scale, every file
          decision has compounding consequences: how files are named determines
          whether partition pruning works. How files are sized determines whether
          Spark jobs are fast or slow. How files are compressed determines storage
          cost. How they are organised determines whether analysts can find data
          without asking a data engineer.
        </Para>

        <Para>
          This module covers the file engineering that sits between "I know Parquet
          exists" and "I can design a file layer that scales to petabytes and still
          serves fast queries." These decisions are made once and lived with for years
          — getting them right matters.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Seven topics this module covers
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'File naming conventions', desc: 'Naming patterns that make files discoverable, sortable, and debuggable.' },
              { num: '02', name: 'Partitioning strategies', desc: 'Hive-style partitioning, choosing partition keys, cardinality trade-offs.' },
              { num: '03', name: 'Compression codecs', desc: 'Snappy vs GZIP vs ZSTD vs LZ4 — when each wins.' },
              { num: '04', name: 'The small file problem', desc: 'Why millions of tiny files kill performance and how to fix it.' },
              { num: '05', name: 'File size optimisation', desc: 'Target sizes, compaction strategies, row group tuning.' },
              { num: '06', name: 'Format conversion pipelines', desc: 'CSV/JSON → Parquet pipelines that run reliably in production.' },
              { num: '07', name: 'File lifecycle management', desc: 'Retention policies, archiving, versioning, and cleanup automation.' },
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
      </section>

      <Divider />

      {/* ── Part 02 — File Naming Conventions ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — File Naming Conventions" />
        <SectionTitle>File Naming — The Foundation of a Usable Data Lake</SectionTitle>

        <Para>
          File naming in a data lake is not cosmetic. The names must encode enough
          information to identify the file without reading it, sort chronologically
          without special logic, and survive being listed in any filesystem tool
          without ambiguity. Poor naming conventions produce lakes where data
          engineers spend 20 minutes finding the right file for every query.
        </Para>

        <CodeBox label="File naming conventions — the patterns that actually work">{`# ── THE RULES ────────────────────────────────────────────────────────────────
# 1. Timestamps: always ISO 8601, always UTC, always in the name
# 2. Use underscores not spaces (spaces cause shell escaping nightmares)
# 3. Include enough context to identify without opening the file
# 4. Lexicographic sort order = chronological sort order (ISO dates achieve this)
# 5. Include a unique identifier to prevent overwrite collisions

# ── LANDING ZONE: preserve origin context ────────────────────────────────────
# Pattern: {source}_{entity}_{start_ts}_{end_ts}_{batch_id}.{ext}
razorpay_payments_20260317T000000Z_20260317T235959Z_f8a3b2c4.json
shopify_orders_20260317T060000Z_20260317T120000Z_9e1d7c3f.csv
shipfast_deliveries_20260317T000000Z_20260317T235959Z_2b4a8d6e.parquet

# What each component gives you:
# razorpay     → which source system (filter by prefix)
# payments     → which entity/table
# 20260317T... → ISO 8601 UTC timestamps (sort = chronological order)
# f8a3b2c4     → unique batch ID (trace back to pipeline run logs)

# ── BRONZE LAYER: add pipeline metadata ──────────────────────────────────────
# Pattern: {entity}/year={YYYY}/month={MM}/day={DD}/{entity}_{ts}_{id}.parquet
# (Hive-style partitioning — covered in Part 03)

s3://freshmart-lake/bronze/payments/year=2026/month=03/day=17/
  payments_20260317T000000Z_f8a3b2c4.parquet
  payments_20260317T060000Z_9e1d7c3f.parquet

# ── SILVER AND GOLD: clean entity-oriented names ─────────────────────────────
s3://freshmart-lake/silver/orders/date=2026-03-17/part-00001.parquet
s3://freshmart-lake/gold/daily_revenue/date=2026-03-17/part-00001.parquet

# ── WHAT NOT TO DO ────────────────────────────────────────────────────────────
# BAD: no timestamp — cannot determine when file was created
orders.csv

# BAD: ambiguous date format — is 03/17/26 March or day 3?
orders_03-17-26.csv

# BAD: spaces in filename — breaks shell commands without quoting
march 17 orders.csv

# BAD: no source or entity context
data_f8a3b2c4.parquet

# BAD: non-sortable timestamp — file 2_11_2026 sorts before 3_1_2026
orders_2_11_2026.csv   # Feb 11 sorts AFTER Mar 1? Depends on tool.

# BAD: mutable names — what does "latest" point to next week?
orders_latest.parquet
orders_final.parquet
orders_final_v2.parquet
orders_final_v2_ACTUALLY_FINAL.parquet   # this is not a joke`}</CodeBox>

        <SubTitle>Naming for operational visibility</SubTitle>

        <CodeBox label="Adding operational context to filenames">{`# Production pipelines write many files per day.
# Good names let you diagnose issues without opening files.

# Include run metadata in filename for traceability:
# {entity}_{date}_{pipeline_run_id}_{chunk_index:04d}.parquet

orders_20260317_run-abc123_0001.parquet
orders_20260317_run-abc123_0002.parquet
orders_20260317_run-abc123_0003.parquet

# Benefits:
# 1. Know exactly which pipeline run wrote each file
# 2. 0001/0002/0003 tells you how many chunks were written
# 3. If a run writes 0001 and 0002 but not 0003, you know it stopped early
# 4. Re-running produces different run_id — old files are not overwritten

# Generating this in Python:
import uuid
from datetime import date, timezone

def make_output_filename(
    entity:     str,
    run_date:   date,
    run_id:     str,
    chunk_idx:  int,
    fmt:        str = 'parquet',
) -> str:
    return f"\${entity}_\${run_date.strftime('%Y%m%d')}_run-\${run_id[:8]}_\${chunk_idx:04d}.\${fmt}"

run_id = str(uuid.uuid4())
# "orders_20260317_run-f8a3b2c4_0001.parquet"
print(make_output_filename('orders', date(2026, 3, 17), run_id, 1))`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Partitioning ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Partitioning Strategies" />
        <SectionTitle>Partitioning — The Single Biggest Lever for Query Performance</SectionTitle>

        <Para>
          Partitioning is the practice of organising files into a directory
          hierarchy based on column values. When a query filters on a partition
          column, the query engine reads only the directories matching that filter
          and skips all others. A query for last week's orders on a dataset
          partitioned by date reads 7 directories out of 1,000 — 99.3% of files
          never open. This is called partition pruning and it is the most
          impactful performance optimisation in a data lake.
        </Para>

        <SubTitle>Hive-style partitioning — the standard</SubTitle>

        <CodeBox label="Hive-style partitioning — structure and how query engines use it">{`# Hive-style partitioning uses key=value directory names.
# Query engines (Spark, Athena, Presto, BigQuery external tables)
# understand this structure natively and prune partitions automatically.

# Directory structure for orders partitioned by date:
s3://freshmart-lake/silver/orders/
  date=2026-03-15/
    part-00001.parquet    (rows where date = 2026-03-15)
    part-00002.parquet
  date=2026-03-16/
    part-00001.parquet    (rows where date = 2026-03-16)
  date=2026-03-17/
    part-00001.parquet    (rows where date = 2026-03-17)
    part-00002.parquet
    part-00003.parquet

# Query: SELECT COUNT(*) FROM orders WHERE date = '2026-03-17'
# Without partitioning:  reads ALL files → 100% I/O
# With date partitioning: reads ONLY date=2026-03-17/ → ~0.3% I/O (1 of 365 days)

# Multi-level partitioning (for finer granularity):
s3://freshmart-lake/silver/orders/
  year=2026/
    month=03/
      day=17/
        store=ST001/
          part-00001.parquet
        store=ST002/
          part-00001.parquet

# Query: WHERE year=2026 AND month=03 AND store='ST001'
# Reads: ONLY year=2026/month=03/*/store=ST001/ files

# Writing Hive-partitioned Parquet in Python (PyArrow):
import pyarrow as pa
import pyarrow.parquet as pq
import pandas as pd

df = pd.read_csv('orders.csv')
df['date'] = pd.to_datetime(df['created_at']).dt.date.astype(str)

table = pa.Table.from_pandas(df)
pq.write_to_dataset(
    table,
    root_path='s3://freshmart-lake/silver/orders',
    partition_cols=['date'],             # creates date=YYYY-MM-DD/ dirs
    filesystem=s3_filesystem,           # pyarrow.fs.S3FileSystem
    existing_data_behavior='overwrite_or_ignore',
    compression='snappy',
)

# Writing in PySpark:
df.write \
  .mode('overwrite') \
  .partitionBy('date') \
  .parquet('s3://freshmart-lake/silver/orders')`}</CodeBox>

        <SubTitle>Choosing the right partition key — the most important decision</SubTitle>

        <Para>
          The partition key must match the most common query filter. If analysts
          almost always filter by date, partition by date. If they filter by store,
          partition by store. The wrong partition key means partition pruning never
          fires and you get no benefit from the overhead of managing partitions.
        </Para>

        {[
          {
            scenario: 'Time-series data (orders, events, transactions)',
            bestKey: 'date (YYYY-MM-DD) — by far the most common filter in analytics',
            why: 'Nearly every analytical query has a date range filter. Date partitioning reduces I/O by 90%+ for typical last-30-days queries. Avoid partitioning by timestamp — too granular, creates too many tiny directories.',
            avoid: 'hour or minute — creates thousands of tiny partitions daily',
          },
          {
            scenario: 'Multi-tenant data (stores, merchants, accounts)',
            bestKey: 'store_id or a derived category column — if queries almost always filter by tenant',
            why: 'If every analyst query specifies a store or merchant, partitioning by store_id prunes all other tenants. Combine with date: PARTITION BY (date, store_id) for both dimensions.',
            avoid: 'customer_id — too high cardinality, creates millions of directories',
          },
          {
            scenario: 'Log data (application events, audit logs)',
            bestKey: 'date + hour for high-volume logs, date only for lower-volume',
            why: 'Log queries typically specify a time window. Date+hour allows fine-grained pruning for high-throughput logs (billions of rows/day). Date alone is fine for moderate volumes.',
            avoid: 'service_name or level — queries rarely filter by exactly one service',
          },
          {
            scenario: 'Slowly changing dimension tables (customers, products)',
            bestKey: 'No partitioning OR snapshot_date for SCD2 tables',
            why: 'Small tables (< 1 GB) do not benefit from partitioning — overhead exceeds gain. SCD2 tables with historical versions are naturally queried by valid_from/valid_to dates.',
            avoid: 'Partitioning tables with < 1 GB total size — more overhead than benefit',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden', marginBottom: 12,
          }}>
            <div style={{ height: 3, background: 'var(--accent)', opacity: 0.6 }} />
            <div style={{ padding: '16px 20px' }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 8,
              }}>{item.scenario}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#00e676',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Best partition key</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 6 }}>{item.bestKey}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.why}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Avoid</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.avoid}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Callout type="warning">
          <strong>High-cardinality partition columns are a common mistake.</strong> Partitioning by
          customer_id when you have 10 million customers creates 10 million directories.
          Listing those directories takes minutes. Each directory contains one tiny file.
          Query engines struggle with millions of partition entries. The rule: partition
          columns should have low-to-medium cardinality — days of the year (365),
          store IDs (10–1,000), product categories (10–100). Never partition by a
          column with more than ~10,000 distinct values.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Compression ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Compression Codecs" />
        <SectionTitle>Compression Codecs — Choosing the Right One for Each Situation</SectionTitle>

        <Para>
          Every Parquet and Avro file is compressed. The codec choice affects
          storage cost, read speed, write speed, and CPU usage during
          compression/decompression. There is no universal best choice —
          different workloads have different optimal codecs.
        </Para>

        <CompareTable
          headers={[
            { label: 'Codec' },
            { label: 'Compression ratio', color: '#00e676' },
            { label: 'Compress speed', color: '#7b61ff' },
            { label: 'Decompress speed', color: '#f97316' },
            { label: 'Splittable?', color: '#4285f4' },
            { label: 'Best for', color: '#facc15' },
          ]}
          keys={['codec', 'ratio', 'compress', 'decompress', 'splittable', 'best']}
          rows={[
            { codec: 'SNAPPY', ratio: '2–3× (moderate)', compress: 'Very fast', decompress: 'Very fast', splittable: 'Yes (Parquet/Avro blocks)', best: 'Default for data lake Parquet — best balance of speed and ratio' },
            { codec: 'GZIP / DEFLATE', ratio: '4–6× (good)', compress: 'Slow', decompress: 'Moderate', splittable: 'No (as raw .gz file)', best: 'Archival storage, landing zone CSVs, when size matters more than speed' },
            { codec: 'ZSTD', ratio: '3–5× (very good)', compress: 'Fast (tunable levels)', decompress: 'Very fast', splittable: 'Yes (Parquet/Avro blocks)', best: 'Modern default — better ratio than Snappy at similar speed. Parquet 1.5+ default' },
            { codec: 'LZ4', ratio: '1.5–2× (low)', compress: 'Extremely fast', decompress: 'Extremely fast', splittable: 'Yes', best: 'Real-time streaming, Kafka messages — CPU cost matters more than ratio' },
            { codec: 'BROTLI', ratio: '5–7× (excellent)', compress: 'Very slow', decompress: 'Moderate', splittable: 'Yes', best: 'Cold archival storage, rarely read files' },
            { codec: 'UNCOMPRESSED', ratio: '1× (none)', compress: 'N/A', decompress: 'N/A', splittable: 'Yes', best: 'Development/testing only — never use in production data lake' },
          ]}
        />

        <SubTitle>Splittability — why it matters for Spark performance</SubTitle>

        <Para>
          A splittable format allows multiple Spark executors to read different
          parts of the same file in parallel. A non-splittable format forces a single
          executor to read the entire file before splitting the data — a bottleneck
          that eliminates the parallelism that makes Spark fast.
        </Para>

        <CodeBox label="Splittability — the codec choice that determines Spark parallelism">{`# SPLITTABLE: Parquet/Avro with Snappy, ZSTD, or LZ4
# Each row group (Parquet) or data block (Avro) is compressed independently.
# Spark assigns one row group per task — true parallel reading.

s3://freshmart-lake/silver/orders/date=2026-03-17/part-00001.parquet
# This single 500 MB Parquet file with 10 row groups:
# → Spark creates 10 tasks, each reading one 50 MB row group in parallel
# → All 10 executors work simultaneously
# → Read time: ~5 seconds with 10 executors

# NON-SPLITTABLE: plain .gz CSV files
s3://freshmart-lake/landing/orders_20260317.csv.gz
# This single 500 MB gzip file:
# → One executor must decompress the ENTIRE file before splitting
# → Other executors wait idle
# → Read time: ~50 seconds (10× slower)

# HOW TO CHECK IF A FILE IS SPLITTABLE:
# Parquet with Snappy/ZSTD → always splittable (row group level)
# Parquet with GZIP → splittable (row group level) in modern Parquet
# .csv.gz → NOT splittable
# .csv.bz2 → splittable (bz2 supports block splitting but still slow)
# Avro with any codec → splittable (block level)
# .json.gz → NOT splittable

# RULE: for data lake storage, always use Parquet (inherently splittable
#        regardless of codec) or Avro. Never store large raw .gz CSV files
#        in the analytical layer.`}</CodeBox>

        <SubTitle>Codec selection by use case</SubTitle>

        <CodeBox label="Codec decision guide — practical recommendations">{`# DATA LAKE — Parquet files (Silver, Gold, Bronze)
pq.write_table(table, path, compression='zstd')   # best all-rounder for 2026
pq.write_table(table, path, compression='snappy') # safe default, widely supported

# Per-column compression (Parquet supports different codecs per column):
pq.write_table(
    table, path,
    compression={
        'order_id':   'zstd',    # numeric ID — compresses well with delta encoding
        'order_text': 'snappy',  # free text — fast decomp matters for queries
        'image_url':  'gzip',    # URL strings — ratio more important than speed
    }
)

# KAFKA / STREAMING (Avro messages)
# LZ4 — lowest latency, minimal CPU overhead
# Producer config: compression.type=lz4

# LANDING ZONE (vendor CSV/JSON files — as received, do not re-compress)
# Accept whatever the vendor sends, land it as-is
# Convert to Parquet/Snappy at Bronze layer

# ARCHIVAL (data older than 2 years, rarely accessed)
# GZIP for CSV archives, BROTLI or ZSTD level 19 for Parquet
# Trade CPU time at write for storage savings on cold data

# COMPRESSION LEVEL TUNING (ZSTD):
pq.write_table(table, path,
    compression='zstd',
    compression_level=1,   # fastest, moderate ratio (default)
    # compression_level=3,   # good ratio, still fast
    # compression_level=9,   # high ratio, slower — for archival
    # compression_level=19,  # max ratio, very slow — cold storage only
)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — The Small File Problem ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Small File Problem" />
        <SectionTitle>The Small File Problem — The Silent Performance Killer in Every Data Lake</SectionTitle>

        <Para>
          The small file problem is one of the most common and most impactful
          performance issues in data lakes. It occurs when a data lake accumulates
          millions of tiny files — each valid, each correct — but collectively
          making every operation slow: listing, querying, reading, and writing.
        </Para>

        <Para>
          The root cause is almost always streaming or micro-batch pipelines that
          write many small files over time, or highly partitioned tables where
          each partition gets very few rows per pipeline run. The diagnosis and
          solution are both well-understood — but many teams do not apply them
          until performance has already degraded severely.
        </Para>

        <SubTitle>Why small files are slow</SubTitle>

        <CodeBox label="The small file problem — what it looks like and why it is slow">{`# HEALTHY file structure: few large files per partition
s3://freshmart-lake/silver/orders/date=2026-03-17/
  part-00001.parquet  (480 MB)
  part-00002.parquet  (520 MB)
  part-00003.parquet  (495 MB)
# 3 files × ~500 MB each = 1.5 GB total
# Spark creates 3 tasks, each reads one large file efficiently

# SMALL FILE PROBLEM: many tiny files per partition
s3://freshmart-lake/silver/orders/date=2026-03-17/
  part-00001.parquet  (2.1 KB)   ← written by 5-minute micro-batch 00:05
  part-00002.parquet  (1.8 KB)   ← written by 5-minute micro-batch 00:10
  part-00003.parquet  (2.4 KB)   ← written by 5-minute micro-batch 00:15
  ... (287 more files)
  part-00288.parquet  (1.9 KB)   ← written by 5-minute micro-batch 23:55
# 288 files × ~2 KB each = 576 KB total data (same data!)
# Spark creates 288 tasks — 288× task scheduling overhead
# S3 LIST request returns 288 file metadata entries
# Each file read requires a separate S3 GET request

# WHAT SMALL FILES DO TO PERFORMANCE:
# 1. S3/ADLS LIST calls:
#    Listing 3 files:   <10ms
#    Listing 288 files: ~100ms (and S3 paginates at 1,000 objects)
#    Listing 50,000 files: 5-10 seconds just for the directory listing

# 2. Spark task overhead:
#    Each Spark task has ~100ms JVM overhead for scheduling
#    288 tasks × 100ms = ~29 seconds of pure overhead
#    3 tasks × 100ms = ~300ms overhead
#    Same data, 97× more overhead

# 3. Parquet footer reads:
#    Each Parquet file requires reading its footer to get schema and statistics
#    288 footer reads = 288 S3 GET requests for metadata
#    Most of these tiny files have no useful statistics anyway

# 4. Hive Metastore / Glue catalog:
#    Every file is a separate entry in partition metadata
#    MSCK REPAIR TABLE (rediscover partitions) takes minutes on lakes
#    with millions of files instead of seconds

# SCALE OF THE PROBLEM at large companies:
# A pipeline writing every 5 minutes produces 288 files/day per partition
# With 10 store partitions: 2,880 files/day
# After 1 year: 1,051,200 files
# After 3 years: 3,153,600 files — most systems start struggling around 1M files`}</CodeBox>

        <SubTitle>Solutions — compaction, coalescing, and preventing accumulation</SubTitle>

        <CodeBox label="Solving the small file problem — three approaches">{`# ── APPROACH 1: COMPACTION (merging small files into large ones) ──────────────
# Run a compaction job after each pipeline run or on a schedule

from pyspark.sql import SparkSession

def compact_partition(
    spark: SparkSession,
    path: str,
    date: str,
    target_file_size_mb: int = 512,
) -> None:
    """
    Read all small files in a partition and rewrite as fewer large files.
    Target: 1 file per 512 MB of compressed data (128 MB min, 1 GB max).
    """
    partition_path = f"\${path}/date=\${date}"

    df = spark.read.parquet(partition_path)
    row_count = df.count()

    # Calculate target number of files
    # Rough estimate: 1M rows ≈ 100 MB compressed Parquet
    estimated_mb = row_count / 10_000
    target_files = max(1, int(estimated_mb / target_file_size_mb))

    df.coalesce(target_files) \
      .write \
      .mode('overwrite') \
      .parquet(partition_path)

    print(f"Compacted date=\${date}: \${row_count:,} rows → \${target_files} files")


# ── APPROACH 2: COALESCE BEFORE WRITE ─────────────────────────────────────────
# Prevent small files at write time by coalescing the output DataFrame

def write_compact_parquet(df, output_path: str, partition_col: str = 'date') -> None:
    """Write Parquet with controlled file count per partition."""
    # Count rows to estimate file count needed
    row_count  = df.count()
    target_mb  = 512     # target file size in MB
    rows_per_mb = 10_000  # ~10k rows per MB of compressed Parquet (adjust to your data)

    target_files = max(1, int(row_count / (target_mb * rows_per_mb)))

    df.repartition(target_files, partition_col) \
      .write \
      .mode('overwrite') \
      .partitionBy(partition_col) \
      .parquet(output_path)


# ── APPROACH 3: DELTA LAKE AUTO-OPTIMISE ──────────────────────────────────────
# Delta Lake (and Iceberg) have built-in compaction via OPTIMIZE

# Delta Lake:
# OPTIMIZE silver.orders WHERE date = '2026-03-17';
# → Reads all small files in that partition, rewrites as ~1 GB files
# → Does NOT change table content — only file organisation
# → After OPTIMIZE, run VACUUM to remove old small files

# Python API:
from delta.tables import DeltaTable

delta_table = DeltaTable.forPath(spark, 's3://freshmart-lake/silver/orders')
delta_table.optimize().where("date = '2026-03-17'").executeCompaction()

# Schedule OPTIMIZE to run after every batch write:
# OPTIMIZE runs in ~seconds for small tables, minutes for large ones
# Run daily: OPTIMIZE silver.orders WHERE date >= current_date - 7

# ── APPROACH 4: PREVENT AT STREAM WRITE TIME ──────────────────────────────────
# Spark Structured Streaming: control output file size
streamDf.writeStream \
    .trigger(processingTime='1 hour') \
    .option('maxRecordsPerFile', 500_000) \
    .partitionBy('date') \
    .parquet('s3://freshmart-lake/silver/orders')

# processingTime='1 hour' batches 1 hour of data before writing
# → 24 files/day instead of 288 files/day (12× improvement)
# maxRecordsPerFile limits maximum records per output file`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — File Size Optimisation ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — File Size Optimisation" />
        <SectionTitle>Target File Sizes — What the Numbers Actually Mean</SectionTitle>

        <Para>
          Every modern storage and compute guide says files should be "128 MB to
          1 GB." Where does this range come from? Understanding the reasoning
          behind it lets you tune for your specific workload rather than applying
          a rule blindly.
        </Para>

        <CodeBox label="Target file size reasoning — why 128 MB to 1 GB">{`# WHY TOO-SMALL IS BAD (< 32 MB):
# ── Overhead dominates:
#    S3 GET request latency: ~10ms
#    Parquet footer read:    ~5ms
#    Spark task scheduling:  ~100ms
#    For a 1 KB file: overhead (115ms) >> actual read time (<1ms)
#    For a 512 MB file: overhead (115ms) << actual read time (~500ms)
# ── Metadata catalog grows large (each file = one catalog entry)
# ── S3 LIST paginated at 1,000 objects — large counts require many API calls

# WHY TOO-LARGE IS BAD (> 2 GB):
# ── Spark cannot split a single file across multiple tasks
#    (within a file, tasks map to row groups, not to bytes)
#    One 4 GB file → one executor reads all 4 GB serially
#    Four 1 GB files → four executors read 1 GB each in parallel
# ── Partial failures waste more work:
#    A failed write of 4 GB wastes 4 GB of work
#    A failed write of 512 MB wastes only 512 MB
# ── Schema discovery and footer reads take longer on very large files

# THE SWEET SPOT:
# Target: 256 MB to 1 GB per file (compressed Parquet)
# Minimum: 128 MB  (below this, overhead ratio becomes significant)
# Maximum: 1–2 GB  (above this, single-executor bottleneck emerges)

# PRACTICAL CALIBRATION:
# Run this on a sample partition to understand your row size:
import pyarrow.parquet as pq

metadata = pq.read_metadata('s3://freshmart-lake/silver/orders/date=2026-03-17/part-00001.parquet')
file_size_mb  = metadata.serialized_size / (1024 * 1024)
row_count     = metadata.num_rows
num_row_groups = metadata.num_row_groups

print(f"File size: \${file_size_mb:.1f} MB")
print(f"Row count: \${row_count:,}")
print(f"Row groups: \${num_row_groups}")
print(f"MB per million rows: \${file_size_mb / row_count * 1_000_000:.1f}")
# Use this last number to calibrate target_files calculations

# ROW GROUP SIZE WITHIN PARQUET FILES:
# Each Parquet file is divided into row groups (typically 100k-1M rows each)
# Row group size affects:
# - Predicate pushdown granularity (each row group has min/max statistics)
# - Memory during write (one row group is buffered in memory during write)
# - Parallelism within file (Spark assigns one task per row group)

# Tuning row groups in PyArrow:
pq.write_table(
    table, path,
    row_group_size=500_000,   # 500k rows per row group
    # Smaller row groups: better predicate pushdown, more metadata overhead
    # Larger row groups: less metadata overhead, coarser pruning
)`}</CodeBox>

        <SubTitle>Bloom filters — accelerating point lookups in Parquet</SubTitle>

        <CodeBox label="Bloom filters — enabling fast point lookups in Parquet files">{`# Parquet supports bloom filters on specific columns.
# A bloom filter is a probabilistic data structure that answers:
# "Is value X definitely NOT in this row group?"
# If yes → skip the row group entirely (zero reads)
# If no  → maybe (the row group might have it) → read and check

# Without bloom filter:
# "Find order_id = 9284751 in a 500 MB Parquet file"
# Must read every row group and check every value: slow
# With bloom filter:
# Bloom filter answers "9284751 is NOT in row groups 1,3,4,5,7,8,9,10"
# Only row group 2 and 6 need to be read: ~10× faster

# WHEN TO ADD BLOOM FILTERS:
# ✓ UUID or string primary key columns (high cardinality, point lookups common)
# ✓ External ID columns (payment_id, order_id from source systems)
# ✓ Any column where queries do "WHERE column = specific_value"
# ✗ Date columns (already pruned by partition pruning)
# ✗ Low-cardinality columns (status, boolean — min/max stats already handle these)

# Adding bloom filters with PyArrow:
import pyarrow.parquet as pq

pq.write_table(
    table,
    'output.parquet',
    compression='zstd',
    write_bloom_filter=True,                         # enable for all columns
    bloom_filter_columns=['payment_id', 'order_id'], # or specify columns
    bloom_filter_false_positive_rate=0.05,           # 5% false positive rate
    # Lower rate → larger bloom filter → better pruning but more memory
)

# Snowflake / BigQuery clustering achieves similar effect via table clustering:
# ALTER TABLE silver.orders CLUSTER BY (date, store_id);
# Snowflake physically co-locates rows with same cluster key values → fast point lookups`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Format Conversion Pipelines ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Format Conversion Pipelines" />
        <SectionTitle>Format Conversion Pipelines — CSV/JSON to Parquet in Production</SectionTitle>

        <Para>
          The most common file operation in data lake Bronze layer is format
          conversion: raw CSV and JSON files from vendors and APIs become typed,
          compressed, partitioned Parquet files. This operation seems simple but
          has dozens of real-world edge cases that must be handled to produce
          reliable, resumable, production-safe pipelines.
        </Para>

        <CodeBox label="Production CSV-to-Parquet conversion pipeline">{`"""
Bronze layer format conversion: CSV landing → Parquet Bronze
Handles: encoding detection, schema inference, type casting,
         bad row logging, resumability, S3 output.
"""

import os, json, logging
from pathlib import Path
from datetime import date, datetime, timezone
from typing import Iterator

import chardet
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import pyarrow.fs as pafs

log = logging.getLogger('csv_to_parquet')

# ── Schema definition (explicit is better than inferred) ──────────────────────
ORDERS_SCHEMA = pa.schema([
    pa.field('order_id',     pa.int64(),                  nullable=False),
    pa.field('store_id',     pa.string(),                  nullable=False),
    pa.field('customer_id',  pa.int64(),                  nullable=True),
    pa.field('amount',       pa.decimal128(10, 2),        nullable=False),
    pa.field('status',       pa.string(),                  nullable=False),
    pa.field('created_at',   pa.timestamp('us', tz='UTC'), nullable=False),
    pa.field('ingested_at',  pa.timestamp('us', tz='UTC'), nullable=False),
])

def detect_encoding(filepath: str, sample_bytes: int = 100_000) -> str:
    """Detect file encoding from first N bytes."""
    with open(filepath, 'rb') as f:
        raw = f.read(sample_bytes)
    result = chardet.detect(raw)
    encoding = result.get('encoding') or 'utf-8'
    confidence = result.get('confidence', 0)
    log.info('Detected encoding: \${s} (confidence: \${.0%})', encoding, confidence)
    return encoding if confidence > 0.7 else 'utf-8'


def read_csv_chunked(filepath: str, chunk_size: int = 200_000) -> Iterator[pd.DataFrame]:
    """Read CSV in chunks, detecting encoding and handling bad lines."""
    encoding = detect_encoding(filepath)
    bad_lines_path = filepath.replace('.csv', '_bad_lines.ndjson')

    try:
        for chunk in pd.read_csv(
            filepath,
            chunksize     = chunk_size,
            encoding      = encoding,
            encoding_errors = 'replace',   # replace undecodable bytes with ?
            dtype         = str,           # read all as string first, cast later
            na_values     = ['', 'NULL', 'null', 'N/A', 'n/a', 'NA', '-'],
            keep_default_na = True,
            on_bad_lines  = 'warn',        # log bad lines, do not crash
        ):
            yield chunk
    except Exception as e:
        log.error('Failed to read CSV \${s}: \${s}', filepath, str(e))
        raise


def cast_chunk(chunk: pd.DataFrame, source_date: date) -> pd.DataFrame:
    """Apply type casting and add pipeline metadata columns."""
    df = chunk.copy()

    # Cast numeric columns:
    for col in ['order_id', 'customer_id']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').astype('Int64')

    if 'amount' in df.columns:
        df['amount'] = pd.to_numeric(
            df['amount'].str.replace(',', '', regex=False),   # remove thousands sep
            errors='coerce',
        ).round(2)

    # Cast timestamps:
    if 'created_at' in df.columns:
        df['created_at'] = pd.to_datetime(
            df['created_at'], utc=True, errors='coerce'
        )

    # Add pipeline metadata:
    df['ingested_at'] = pd.Timestamp.now(tz='UTC')
    df['source_date'] = source_date.isoformat()   # partition column

    # Drop rows with NULL primary key (unrecoverable):
    bad_mask = df['order_id'].isna()
    if bad_mask.any():
        log.warning('Dropping \${d} rows with NULL order_id', bad_mask.sum())
        df = df[~bad_mask]

    return df


def convert_csv_to_parquet(
    input_path:  str,
    output_root: str,
    source_date: date,
    s3_bucket:   str | None = None,
) -> dict:
    """
    Convert a CSV file to partitioned Parquet on S3.
    Returns stats: {'rows_written', 'rows_rejected', 'files_written'}
    """
    stats = {'rows_written': 0, 'rows_rejected': 0, 'files_written': 0}
    all_tables = []

    for chunk_idx, chunk in enumerate(read_csv_chunked(input_path)):
        original_rows = len(chunk)
        cast = cast_chunk(chunk, source_date)
        dropped = original_rows - len(cast)

        if dropped:
            stats['rows_rejected'] += dropped
            log.warning('Chunk \${d}: dropped \${d} invalid rows', chunk_idx, dropped)

        if len(cast) > 0:
            try:
                table = pa.Table.from_pandas(cast, schema=ORDERS_SCHEMA, safe=False)
                all_tables.append(table)
            except Exception as e:
                log.error('Schema cast failed on chunk \${d}: \${s}', chunk_idx, str(e))
                raise

        stats['rows_written'] += len(cast)

    if not all_tables:
        log.warning('No valid rows to write')
        return stats

    full_table = pa.concat_tables(all_tables)

    # Write partitioned Parquet:
    output_path = f"\${output_root}/orders"
    if s3_bucket:
        filesystem = pafs.S3FileSystem(region='ap-south-1')
        output_path = f"\${s3_bucket}/bronze/orders"
    else:
        filesystem = pafs.LocalFileSystem()
        Path(output_path).mkdir(parents=True, exist_ok=True)

    pq.write_to_dataset(
        full_table,
        root_path   = output_path,
        partition_cols = ['source_date'],
        filesystem  = filesystem,
        compression = 'zstd',
        row_group_size = 500_000,
        write_statistics = True,
        existing_data_behavior = 'overwrite_or_ignore',
    )

    log.info(
        'Conversion complete: \${:,} rows written, \${:,} rejected, source_date=\${s}',
        stats['rows_written'], stats['rows_rejected'], source_date.isoformat(),
    )
    return stats`}</CodeBox>

        <SubTitle>JSON-to-Parquet conversion with schema normalisation</SubTitle>

        <CodeBox label="JSON/NDJSON to Parquet — handling nested structures">{`import json
from typing import Iterator
import pyarrow as pa
import pyarrow.parquet as pq

def read_ndjson(filepath: str) -> Iterator[dict]:
    """Stream records from NDJSON file one at a time."""
    with open(filepath, encoding='utf-8') as f:
        for line_num, line in enumerate(f, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError as e:
                log.warning('Invalid JSON on line \${d}: \${s}', line_num, str(e))


def flatten_order(raw: dict) -> dict:
    """Flatten nested order JSON to a flat dict for Parquet storage."""
    return {
        'order_id':         raw.get('order_id') or raw.get('id'),
        'customer_id':      raw.get('customer', {}).get('id'),
        'customer_city':    raw.get('customer', {}).get('address', {}).get('city'),
        'restaurant_id':    raw.get('restaurant', {}).get('id'),
        'restaurant_name':  raw.get('restaurant', {}).get('name'),
        'order_amount':     raw.get('payment', {}).get('amount'),
        'payment_method':   raw.get('payment', {}).get('method'),
        'item_count':       len(raw.get('items', [])),
        'status':           raw.get('status'),
        'created_at':       raw.get('created_at'),
        'promo_code':       raw.get('promo_code'),
        # Keep full payload for reference (rarely needed fields):
        '_raw_items':       json.dumps(raw.get('items', [])),
    }


def json_to_parquet(
    input_path:  str,
    output_path: str,
    batch_size:  int = 100_000,
) -> int:
    """Convert NDJSON to Parquet with flattening. Returns total rows written."""
    total = 0
    batch: list[dict] = []
    writer = None

    for record in read_ndjson(input_path):
        flat = flatten_order(record)
        batch.append(flat)

        if len(batch) >= batch_size:
            df    = pd.DataFrame(batch)
            table = pa.Table.from_pandas(df)

            if writer is None:
                writer = pq.ParquetWriter(output_path, table.schema, compression='zstd')

            writer.write_table(table)
            total += len(batch)
            batch = []

    # Write final batch:
    if batch:
        df    = pd.DataFrame(batch)
        table = pa.Table.from_pandas(df)
        if writer is None:
            writer = pq.ParquetWriter(output_path, table.schema, compression='zstd')
        writer.write_table(table)
        total += len(batch)

    if writer:
        writer.close()

    log.info('Wrote \${:,} rows to \${s}', total, output_path)
    return total`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — File Lifecycle Management ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — File Lifecycle Management" />
        <SectionTitle>File Lifecycle — Retention, Archival, and Cleanup</SectionTitle>

        <Para>
          A data lake without a lifecycle policy is a storage cost that grows
          indefinitely. Every file written to S3 costs $0.023 per GB per month
          forever, unless explicitly deleted or transitioned to cheaper storage.
          Lifecycle management is the operational discipline that keeps storage
          costs under control without deleting data that is still needed.
        </Para>

        <CodeBox label="S3 lifecycle policy — automated tier transitions and deletion">{`# S3 Lifecycle policy (set via AWS Console or Terraform)
# Automatically moves/deletes files based on age

# Terraform example:
resource "aws_s3_bucket_lifecycle_configuration" "freshmart_lake" {
  bucket = "freshmart-data-lake"

  # Rule 1: Landing zone — raw files only kept 30 days
  # After conversion to Bronze, raw files are not needed
  rule {
    id     = "landing-zone-cleanup"
    status = "Enabled"

    filter { prefix = "landing/" }

    # Move to Infrequent Access after 7 days:
    transition {
      days          = 7
      storage_class = "STANDARD_IA"   # 45% cheaper than Standard
    }

    # Delete after 30 days:
    expiration { days = 30 }
  }

  # Rule 2: Bronze layer — keep 1 year in Standard, then archive
  rule {
    id     = "bronze-archive"
    status = "Enabled"

    filter { prefix = "bronze/" }

    transition {
      days          = 90
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 365
      storage_class = "GLACIER_IR"     # Glacier Instant Retrieval ~68% cheaper
    }
  }

  # Rule 3: Silver layer — keep 2 years Standard, then long-term archive
  rule {
    id     = "silver-lifecycle"
    status = "Enabled"

    filter { prefix = "silver/" }

    transition {
      days          = 180
      storage_class = "STANDARD_IA"
    }

    transition {
      days          = 730     # 2 years
      storage_class = "GLACIER"   # Deep Archive — cheapest, 12h retrieval
    }
  }

  # Rule 4: Gold layer — keep hot forever (small, frequently accessed)
  # No lifecycle rule needed for Gold — it is usually small
}

# STORAGE COST COMPARISON (per GB/month, US East):
# S3 Standard:              $0.023
# S3 Standard-IA:           $0.0125  (45% cheaper, 30-day minimum)
# S3 Glacier Instant:       $0.004   (83% cheaper, millisecond retrieval)
# S3 Glacier Flexible:      $0.0036  (84% cheaper, 3-5 hour retrieval)
# S3 Glacier Deep Archive:  $0.00099 (96% cheaper, 12+ hour retrieval)`}</CodeBox>

        <SubTitle>Delta Lake VACUUM — cleaning up old file versions</SubTitle>

        <CodeBox label="Delta Lake VACUUM — removing old data files safely">{`# Delta Lake writes new Parquet files for every UPDATE, DELETE, and OPTIMIZE.
# Old files are kept (for time travel) but accumulate space costs.
# VACUUM removes files that are no longer needed for time travel.

# Default retention: 7 days (safe minimum — ensures no active transactions use old files)
# VACUUM silently skips files newer than retention threshold

# Run VACUUM after OPTIMIZE to reclaim space from compaction:
-- SQL:
VACUUM silver.orders RETAIN 168 HOURS;  -- 168h = 7 days
VACUUM silver.orders RETAIN 720 HOURS;  -- 30 days (if time travel is needed that far back)

-- Python API:
from delta.tables import DeltaTable

dt = DeltaTable.forPath(spark, 's3://freshmart-lake/silver/orders')
dt.vacuum(retentionHours=168)

# VACUUM dry run (shows what WOULD be deleted without deleting):
dt.vacuum(retentionHours=168, dry_run=True)

# WARNING: setting retention to < 7 days requires explicitly disabling the safety check:
spark.conf.set('spark.databricks.delta.retentionDurationCheck.enabled', 'false')
dt.vacuum(retentionHours=0)   # removes ALL old files — only for dev/testing

# SCHEDULE: run VACUUM weekly on all Silver and Gold tables
# Automate with Airflow DAG or Databricks Job:
# 0 3 * * 0  (every Sunday at 3 AM)

# ICEBERG equivalent:
# CALL catalog.system.expire_snapshots(
#   table => 'silver.orders',
#   older_than => TIMESTAMP '2026-02-17 00:00:00',
#   retain_last => 10
# );`}</CodeBox>

        <SubTitle>Practical file inventory — knowing what you have</SubTitle>

        <CodeBox label="File inventory queries — auditing your data lake's health">{`# Regular file inventory helps catch small file problems early
# and verifies lifecycle policies are working as expected.

import boto3
from collections import defaultdict
from datetime import datetime, timezone

def audit_s3_prefix(bucket: str, prefix: str) -> dict:
    """
    Audit S3 prefix: count files, total size, average size, min/max size.
    Returns health report for identifying small file problems.
    """
    s3 = boto3.client('s3')
    paginator = s3.get_paginator('list_objects_v2')

    sizes = []
    partition_files = defaultdict(list)

    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        for obj in page.get('Contents', []):
            size_mb = obj['Size'] / (1024 * 1024)
            sizes.append(size_mb)

            # Group by partition (last directory level)
            key_parts = obj['Key'].split('/')
            partition = '/'.join(key_parts[:-1])
            partition_files[partition].append(size_mb)

    if not sizes:
        return {'error': 'No files found'}

    total_gb   = sum(sizes) / 1024
    avg_mb     = sum(sizes) / len(sizes)
    small_files = sum(1 for s in sizes if s < 10)  # files < 10 MB

    report = {
        'total_files':  len(sizes),
        'total_gb':     round(total_gb, 2),
        'avg_mb':       round(avg_mb, 1),
        'min_mb':       round(min(sizes), 3),
        'max_mb':       round(max(sizes), 1),
        'small_files':  small_files,
        'small_pct':    round(small_files / len(sizes) * 100, 1),
        'partitions':   len(partition_files),
    }

    # Flag health issues:
    if small_files / len(sizes) > 0.5:
        report['warning'] = f'More than 50% of files are < 10 MB — compaction needed'
    if len(sizes) > 100_000:
        report['warning'] = 'More than 100k files — metadata listing will be slow'

    return report


# Example output:
# {
#   'total_files':  48234,
#   'total_gb':     142.7,
#   'avg_mb':       3.0,       ← WAY too small (should be 128–512 MB)
#   'min_mb':       0.002,
#   'max_mb':       12.4,
#   'small_files':  45891,
#   'small_pct':    95.1,      ← 95% of files are tiny
#   'warning':      'More than 50% of files are < 10 MB — compaction needed'
# }`}</CodeBox>
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
        <SectionTitle>Diagnosing a Slow Athena Query — and Fixing It with File Engineering</SectionTitle>

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
            Scenario — FreshCart · Analyst reports Athena query takes 18 minutes
          </div>

          <Para>
            An analyst runs a monthly revenue report every Monday morning. It used
            to take 90 seconds. This week it took 18 minutes. Nothing changed in
            the query. You investigate.
          </Para>

          <CodeBox label="Diagnosis and resolution — file engineering fixes an 18-minute query">{`# Step 1: Check the Athena query execution details
# In Athena console, click the query → "Execution detail"
# Data scanned: 4.2 TB  ← this is the problem signal
# Expected for a 90-day query: ~400 GB

# Step 2: Check partition count in the catalog
aws glue get-partitions \
    --database-name freshmart_silver \
    --table-name events \
    --query 'Partitions | length(@)'
# Returns: 156,420 partitions
# Expected for 3 years of daily data: ~1,095 partitions
# Something created 155,000 extra partitions!

# Step 3: Find the culprit partition key
aws glue get-partitions \
    --database-name freshmart_silver \
    --table-name events \
    --query 'Partitions[0:5].StorageDescriptor.Location'
# s3://freshmart-lake/silver/events/date=2026-03-17/hour=20/minute=14/
# s3://freshmart-lake/silver/events/date=2026-03-17/hour=20/minute=15/
# Found it: the pipeline was accidentally partitioning by MINUTE!

# Counting files:
aws s3 ls s3://freshmart-lake/silver/events/ --recursive \
    | awk '{print \$4}' | wc -l
# 4,847,293 files — each file has ~1 KB (one minute of events)

# Step 4: Understand the impact
# Athena: to list all partitions for MSCK REPAIR TABLE → tens of thousands of API calls
# Athena: to execute query → reads 4.2 TB instead of 400 GB (no minute-level pruning benefit)
# Glue catalog: 156k partition entries → slow SHOW PARTITIONS, slow query planning

# Step 5: Fix — rewrite with date-only partitioning
from pyspark.sql import SparkSession
spark = SparkSession.builder.getOrCreate()

df = spark.read.parquet('s3://freshmart-lake/silver/events/')

# Rewrite with correct partition: date only
df.write \
  .mode('overwrite') \
  .partitionBy('date') \
  .parquet('s3://freshmart-lake/silver/events_v2/')

# Step 6: Run MSCK REPAIR TABLE to update Glue catalog
spark.sql('MSCK REPAIR TABLE freshmart_silver.events_v2')

# After fix:
# Partitions: 1,095 (date-only)
# Files: ~3,285 (3 per day × 1,095 days)
# Avg file size: ~130 MB
# Query time: 94 seconds (was 18 minutes — 11× improvement)
# Data scanned: 412 GB (was 4.2 TB — 10× reduction)`}</CodeBox>

          <Para>
            The root cause was a single line in the Spark write configuration that
            added <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>minute</code> as a
            partition column alongside <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>date</code>.
            This turned 1,095 daily partitions into 1,576,800 minute partitions —
            all valid, all correct data, but completely unusable for analytics.
            Two hours of investigation and a Spark rewrite job fixed it permanently.
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
            q: 'Q1. What is the small file problem in a data lake and how do you solve it?',
            a: `The small file problem occurs when a data lake accumulates millions of tiny files — each correct in content, but collectively making every operation slow.

The performance impact has four dimensions. First, object storage LIST operations: S3 lists objects in pages of 1,000. A partition with 50,000 files requires 50 API calls to enumerate, adding seconds of latency before any query even begins. Second, Spark task overhead: each file in Spark becomes a task with approximately 100 milliseconds of JVM scheduling overhead. A partition with 10,000 tiny files has 1,000 seconds of pure overhead — more than the actual read time. Third, Parquet footer reads: every Parquet file requires reading its footer to get statistics. 10,000 footer reads are 10,000 separate S3 GET requests. Fourth, metadata catalog bloat: the Glue catalog or Hive Metastore stores one entry per file, and large catalogs make query planning slow.

The causes are usually streaming or micro-batch pipelines writing frequently, or high-cardinality partition columns that spread data across too many directories.

The solutions depend on whether you are preventing or fixing. For prevention: use larger trigger intervals in streaming jobs (process hourly not every 5 minutes), use coalesce before writing to control output file count, and choose partition columns with low-to-medium cardinality. For fixing existing small files: run compaction — either a Spark job that reads the partition, coalesces to fewer partitions, and overwrites, or Delta Lake's OPTIMIZE command which handles this automatically. For Delta Lake tables, OPTIMIZE runs in the background and can be scheduled daily.

Target file sizes: 128 MB minimum, 256 MB to 1 GB ideal, 2 GB maximum for Parquet in a data lake.`,
          },
          {
            q: 'Q2. Why should you never partition a data lake table by a high-cardinality column like customer_id?',
            a: `Partitioning creates one directory per distinct value of the partition column. If customer_id has 10 million distinct values, partitioning by customer_id creates 10 million directories.

The first problem is that each directory would contain almost no data. If you have 100 million orders across 10 million customers, each customer directory would average 10 rows — one tiny file per customer. The small file problem at its most extreme: 10 million files, each a few kilobytes.

The second problem is metadata overhead. Listing 10 million S3 directories requires 10,000 API calls (S3 paginates at 1,000 objects per call). The Glue catalog would have 10 million partition entries. Query planning, which must read the catalog to determine which partitions to prune, takes minutes instead of milliseconds.

The third problem is that partition pruning rarely helps for customer_id in practice. Analytical queries almost never say WHERE customer_id = 4201938. They say WHERE city = 'Bangalore' or WHERE date BETWEEN '2026-01-01' AND '2026-03-17'. The customer_id column does not appear in the WHERE clauses of the queries that would benefit from partition pruning.

The rule for choosing partition columns: they should have low-to-medium cardinality (date has 365 values per year, store_id might have 10–1,000 values, product_category might have 50–100 values), they should be the most common filter in analytical queries, and they should produce partitions large enough to avoid the small file problem (each partition should ideally have at least 100 MB of data).`,
          },
          {
            q: 'Q3. What is the difference between Snappy and GZIP compression for Parquet files, and when would you choose each?',
            a: `Snappy and GZIP are both compression codecs available for Parquet files but with fundamentally different trade-off profiles.

Snappy is optimised for speed. It compresses at roughly 250 MB/s and decompresses at roughly 500 MB/s on typical hardware. Its compression ratio is moderate — about 2–3× for typical data. The key properties for data engineering: it is the default Parquet codec in Spark and most DE tools, it produces splittable files at the row group level, and the fast decompression means query engines can read Parquet files very quickly. Every second a Spark executor spends decompressing is a second not spent doing computation — Snappy minimises this.

GZIP achieves better compression — typically 4–6× — but compresses about 10× slower than Snappy and decompresses 2–3× slower. The higher compression ratio means lower storage costs, but the CPU cost during both write and read is significantly higher.

The practical guideline: use Snappy (or ZSTD, which achieves better ratio than Snappy at similar speed and is the modern recommendation) for data lake files in the Bronze, Silver, and Gold layers where read performance matters and files are queried regularly. Use GZIP for archival files and landing zone CSV/JSON files where storage cost matters more than read performance, and for files that will rarely be read. For new projects in 2026, ZSTD at the default compression level gives better ratio than Snappy at similar speed and is the correct modern default.

The worst outcome is using GZIP on plain CSV files without Parquet wrapping — a gzip CSV is not splittable at all (unlike Parquet with GZIP which is splittable at the row group level), meaning Spark must assign one executor to decompress the entire file before any parallelism is possible.`,
          },
          {
            q: 'Q4. How does Hive-style partitioning improve query performance? What is partition pruning?',
            a: `Hive-style partitioning organises files into a directory hierarchy where the directory name encodes the partition column value — for example, date=2026-03-17 or store_id=ST001. The query engine reads the directory structure to understand the physical organisation of the data before executing any query.

Partition pruning is the query engine's ability to skip entire directories that cannot possibly contain rows matching the query's WHERE clause, based solely on the directory names. If a query says WHERE date = '2026-03-17', the engine reads the directory listing, finds only the date=2026-03-17 directory, and reads only the files within it — skipping all other date directories without opening any files.

For a three-year historical table with daily partitioning, a query for a single day reads 1 of 1,095 directories — roughly 0.1% of the total data. A query for the last 30 days reads 30 of 1,095 directories — about 2.7% of the total. Without partitioning, both queries would read 100% of the data.

The performance benefit is multiplicative. A query for last month's data on a table partitioned by date and store_id reads only the 30 × 10 = 300 relevant directories out of 10,950 total, reading about 2.7% of the data. Without partitioning, the same query reads everything.

Partition pruning works only when the filter is on the partition column. A filter on a non-partition column (WHERE amount > 1000) triggers a full table scan — no partitions can be pruned because the column is not encoded in the directory structure. This is why choosing the right partition column — the one most queries filter on — is so important. The Parquet row group statistics (min/max per column) handle sub-partition filtering through predicate pushdown.`,
          },
          {
            q: 'Q5. You inherit a data lake where queries are slow. What are the first five things you would check?',
            a: `I would check these five things in this order, moving from the most impactful and quickest to diagnose to the more complex.

First, check partition pruning is working. Run EXPLAIN on a query that should benefit from partition filters. If the query plan shows "Partition filters: NONE" or the data scanned metric in Athena/BigQuery is far more than the partition size suggests, partition pruning is not firing. Causes: filter uses a function on the partition column (YEAR(date) instead of date =), or the table was not partitioned at all.

Second, count the files per partition. Run du -sh on each partition directory or use S3 inventory. If partitions have thousands of tiny files (average size under 10 MB), the small file problem is the bottleneck. Fix with Delta OPTIMIZE or a Spark compaction job.

Third, check if files are in the right format. If the analytical layer stores CSV or JSON instead of Parquet, the performance gap is typically 10–100×. Check with aws s3 ls --recursive | grep -v parquet | head -20. If CSV or JSON files are present in Silver or Gold, that is the most impactful fix.

Fourth, verify the compression codec. Uncompressed files waste storage and slow reads. GZIP CSV files are not splittable — Spark cannot parallelize reading them. Parquet with Snappy or ZSTD is the correct choice.

Fifth, check for missing or stale statistics. Query optimisers use column statistics to plan execution. Run ANALYZE TABLE or the equivalent for your warehouse/engine to update statistics. Stale statistics cause the optimiser to choose wrong join strategies and ignore existing indexes or clustering.`,
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
            error: `Athena query scanned 4.2 TB but table has only 400 GB of data — partition filter WHERE date = '2026-03-17' is not working`,
            cause: 'Partition pruning is not firing. The most common causes: the filter uses a function on the partition column (DATE_TRUNC or CAST), the table was created with a different partition column name than what the query uses, or the Glue catalog partitions were never registered (MSCK REPAIR TABLE was never run after writing new partitions). When partition pruning fails, Athena scans the entire table.',
            fix: 'Verify the exact partition column name: SHOW PARTITIONS table_name in Athena. Ensure the WHERE clause uses the column directly without functions: WHERE date = \'2026-03-17\' not WHERE CAST(date AS DATE) = \'2026-03-17\'. If partitions are missing from the catalog: run MSCK REPAIR TABLE freshmart_silver.orders to rediscover all partitions. For ongoing pipelines, add partition registration to the pipeline: AWS Glue addPartition API or ALTER TABLE ADD PARTITION.',
          },
          {
            error: `pyarrow.lib.ArrowInvalid: Could not convert 'N/A' with type str: tried to convert to int64 — when writing a DataFrame to Parquet with an explicit schema`,
            cause: 'The DataFrame contains the string "N/A" in a column that the explicit Parquet schema defines as int64. PyArrow\'s type conversion cannot convert the string "N/A" to an integer. This happens when the CSV reading step did not correctly identify "N/A" as a null value, leaving it as a string in a numeric column.',
            fix: 'Add "N/A" to the na_values list when reading the CSV: pd.read_csv(file, na_values=["", "NULL", "N/A", "n/a", "NA", "-"]). After reading, validate that numeric columns contain only numeric values before casting: df[col] = pd.to_numeric(df[col], errors="coerce") converts non-numeric values to NaN. Then when writing to Parquet, NaN values map to null in the Parquet schema, which is valid for nullable int64 columns.',
          },
          {
            error: `Spark job reads 50,000 tasks for a 10 GB Parquet table — job takes 90 minutes instead of expected 5 minutes`,
            cause: 'The Parquet table has 50,000 small files — one task per file is Spark\'s default behaviour. With 100ms task scheduling overhead per task, 50,000 tasks add 83 minutes of pure scheduling overhead before any data is read. This is the small file problem manifesting as extreme Spark job slowness.',
            fix: 'Run a compaction job before the slow job: spark.read.parquet(path).coalesce(target_files).write.mode("overwrite").parquet(path). For ongoing prevention, use Delta Lake OPTIMIZE to compact the table and schedule it daily. Immediately for the current job, set spark.sql.files.maxPartitionBytes = 536870912 (512 MB) and spark.sql.files.openCostInBytes = 4194304 (4 MB) to make Spark combine small files into larger tasks without a full rewrite.',
          },
          {
            error: `S3 ListObjectsV2 returns an empty Contents list despite files existing — pipeline cannot find its own output files`,
            cause: 'S3 is eventually consistent for certain operations in some older SDK versions, or more commonly, the prefix being listed does not exactly match the prefix where files were written. A trailing slash difference, a case difference in the prefix, or writing to a slightly different path than expected causes ListObjects to return nothing.',
            fix: 'Verify the exact S3 path by logging the full path at write time and at read time and comparing them character by character. Check for trailing slash discrepancies: s3://bucket/prefix/ vs s3://bucket/prefix are different prefixes for ListObjects. Use aws s3 ls s3://bucket/prefix/ --recursive to manually confirm files exist at the exact path. If using boto3, add a small delay (2–3 seconds) after writing and before listing in tests — eventual consistency delays are real in some regions.',
          },
          {
            error: `Delta Lake AnalysisException: The schema of your Delta table has changed — cannot write because column 'delivery_fee' in the data does not match the table schema`,
            cause: 'A new column appeared in the source data that was not in the Delta table\'s schema when it was created. Delta Lake enforces schema-on-write by default and rejects writes where the input DataFrame has columns the table does not. This is schema enforcement working correctly — but it requires explicit handling to add the new column.',
            fix: 'To add the new column and allow writes: enable schema evolution with the mergeSchema option: df.write.format("delta").option("mergeSchema", "true").mode("append").save(path). This automatically adds new columns from the DataFrame to the Delta table schema. Alternatively, explicitly alter the table schema first: ALTER TABLE silver.orders ADD COLUMNS (delivery_fee DECIMAL(6,2)). The mergeSchema approach is more automated but should be used carefully — you want to validate that the new column is expected, not silently accept any schema change from an upstream source change.',
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
        'File naming must encode source, entity, date (ISO 8601 UTC), and a unique run identifier. ISO 8601 dates (YYYYMMDD) sort lexicographically in chronological order. Include the pipeline run ID in filenames to trace any file back to the run that created it. Never use mutable names like "latest" or "final."',
        'Hive-style partitioning (date=2026-03-17/ directories) enables partition pruning — query engines skip entire directories that cannot contain matching rows. A date-filtered query on a date-partitioned table reads 0.3% of data instead of 100%. Partition pruning is the single biggest performance lever in a data lake.',
        'Choose partition columns with low-to-medium cardinality (date: 365/year, store_id: 10–1,000). Never partition by high-cardinality columns like customer_id — 10 million customers creates 10 million directories, making every operation slower. Each partition should hold at least 100 MB of data.',
        'For data lake Parquet files, choose ZSTD (better ratio than Snappy at similar speed, modern default) or Snappy (widely supported, fast). Use GZIP only for archival and landing zone files where storage cost matters more than read speed. Never store uncompressed files in production.',
        'Splittability matters for Spark parallelism. Parquet files are splittable at the row group level regardless of codec. Plain .gz CSV files are not splittable — one executor reads the whole file. Always use Parquet (not gzip CSV) in the analytical layer.',
        'The small file problem occurs when streaming or micro-batch pipelines create millions of tiny files. Performance impact: S3 LIST API overhead, Spark task scheduling waste, and Parquet footer read overhead dominate actual read time. Target 256 MB to 1 GB per Parquet file.',
        'Fix small files with compaction: Delta Lake OPTIMIZE, Spark coalesce and overwrite, or PyArrow dataset rewrite. Schedule compaction after every batch write or daily. Prevent small files by batching micro-batches (write hourly not every 5 minutes) and using coalesce before writing.',
        'Bloom filters on high-cardinality string columns (payment_id, order_id) enable fast point lookups in Parquet by allowing the query engine to skip row groups that definitely do not contain a specific value. Add bloom filters to UUID and external ID columns used in WHERE column = value queries.',
        'File lifecycle management prevents unbounded storage cost growth. Landing zone files delete after 30 days. Bronze and Silver files transition to Infrequent Access after 90 days and Glacier after 2 years. Delta Lake VACUUM removes old file versions after the time travel retention period (7 days default).',
        'When an Athena or Spark query is suddenly slow: check data scanned (should match partition size), count files per partition (thousands of tiny files = small file problem), verify format is Parquet not CSV/JSON, confirm partition pruning is firing (no functions on partition columns in WHERE), and check if MSCK REPAIR TABLE needs to be run to register new partitions.',
      ]} />

    </LearnLayout>
  )
}