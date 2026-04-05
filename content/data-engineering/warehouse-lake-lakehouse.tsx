import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Warehouse vs Data Lake vs Lakehouse — Data Engineering | Chaduvuko',
  description:
    'Three different answers to the same question — where do we store all this data? The honest trade-offs, why the industry evolved from warehouse to lake to lakehouse, and how to choose.',
}

// ── Local components ────────────────────────────────────────────────────────

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

// ── Page ────────────────────────────────────────────────────────────────────

export default function WarehouseLakeLakehouseModule() {
  return (
    <LearnLayout
      title="Data Warehouse vs Data Lake vs Lakehouse"
      description="Three answers to where we store data — the honest trade-offs and how to choose."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Same Problem, Three Solutions ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — One Problem, Three Solutions" />
        <SectionTitle>The Same Problem Solved Three Different Ways</SectionTitle>

        <Para>
          Every company that collects data eventually faces the same problem: the
          operational databases that run the business are not suitable for analysis.
          They are optimised for fast individual record access, not for scanning
          millions of rows to compute aggregations. The business needs somewhere to
          store all its data for analysis. The question is where.
        </Para>

        <Para>
          Three distinct architectural answers have emerged over the past 40 years,
          each built on the lessons and failures of the previous one. Understanding
          why each was invented — what problem it solved and what new problems it
          created — is the foundation for making intelligent storage architecture
          decisions.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              {
                era: '1980s–2000s',
                name: 'Data Warehouse',
                color: '#00e676',
                oneline: 'A centralised, structured, SQL-queryable store for clean, modelled data. Fast queries. Expensive storage. Only accepts data that fits a predefined schema.',
                inventor: 'IBM, Teradata, Bill Inmon',
              },
              {
                era: '2010s',
                name: 'Data Lake',
                color: '#7b61ff',
                oneline: 'A cheap object store that accepts any data in any format with no schema required. Store everything now, figure out the schema when you query it. Low cost. No governance.',
                inventor: 'Hadoop ecosystem, HDFS, then S3',
              },
              {
                era: '2020s–present',
                name: 'Lakehouse',
                color: '#f97316',
                oneline: 'Object storage + table format layer = warehouse-quality transactions and governance at data lake storage cost. The convergence of both architectures.',
                inventor: 'Databricks (Delta Lake), Apache Iceberg, Apache Hudi',
              },
            ].map((item) => (
              <div key={item.name} style={{
                borderLeft: `3px solid ${item.color}`, paddingLeft: 16,
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.era}</div>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: 'var(--text)',
                  fontFamily: 'var(--font-display)', marginBottom: 8,
                }}>{item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                  {item.oneline}
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  Invented by: {item.inventor}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          This is not a story of old being replaced by new. All three architectures
          coexist in production today. Many large companies have all three in their
          data platform. Understanding each one deeply — its design, its trade-offs,
          and where it fits in a modern data architecture — is essential knowledge
          for every data engineer.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Data Warehouse ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Architecture One" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-mono)',
          }}>WAREHOUSE</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Data Warehouse</h2>
        </div>

        <Para>
          A data warehouse is a centralised relational database designed specifically
          for analytical queries. It is where cleaned, modelled, business-ready data
          lives. Business analysts connect their BI tools to the warehouse. Data
          scientists run training queries against it. Finance teams pull reports from it.
          The warehouse is the single source of truth for historical, clean data in
          a traditional data architecture.
        </Para>

        <SubTitle>How a data warehouse is different from an operational database</SubTitle>

        <Para>
          Both are relational databases that accept SQL queries. The differences are
          in storage layout, optimisation target, and design philosophy.
        </Para>

        <Para>
          An operational database (PostgreSQL, MySQL) is row-oriented and normalised —
          optimised for fast individual record access with ACID transactions. An
          ORDER BY created_at query that scans the whole table is slow and problematic
          on a production OLTP database.
        </Para>

        <Para>
          A data warehouse (Snowflake, BigQuery, Redshift) is columnar and typically
          denormalised — optimised for aggregate queries that scan many rows across few
          columns. The same analytical scan that would cripple a production database
          runs in seconds on a warehouse because of columnar storage, predicate
          pushdown, and distributed execution across many compute nodes.
        </Para>

        <CodeBox label="Data warehouse — why it exists and what makes it fast">{`BUSINESS QUESTION: What was our daily revenue by city and restaurant
                   category for the last 90 days?

ON POSTGRESQL (operational database):
  SELECT DATE(created_at), r.city, r.category, SUM(o.amount)
  FROM orders o
  JOIN restaurants r ON o.restaurant_id = r.id
  WHERE o.created_at >= NOW() - INTERVAL '90 days'
  GROUP BY 1, 2, 3
  ORDER BY 1;

  Result: 4 minutes 23 seconds (100M orders table, full scan)
  Problem: this query evicted hot pages from buffer pool, slowing
           every concurrent application query for 30 minutes after

ON SNOWFLAKE (data warehouse):
  Same query. Same data (loaded into warehouse).
  Result: 3.8 seconds
  Reason: columnar storage reads only amount and created_at columns,
          partitioning prunes to last 90 days only,
          distributed execution across 8 compute nodes

WHY WAREHOUSES EXIST:
  → Separate analytical compute from operational compute
    No more slowing down the live app with analytical queries
  → Optimised storage layout for analytical patterns
    Columnar, compressed, partitioned, clustered
  → Scalable compute on demand
    Scale compute nodes up for heavy queries, down when idle
  → Centralised governance and access control
    One place for all business data, one place to manage access
  → Schema enforcement at query time
    Data is validated and typed before entering the warehouse`}</CodeBox>

        <SubTitle>The schema-on-write constraint — the warehouse's biggest limitation</SubTitle>

        <Para>
          The defining characteristic of a data warehouse is <strong>schema-on-write</strong>:
          before any data enters the warehouse, it must conform to a defined schema.
          Column names, data types, NOT NULL constraints, and foreign keys must all
          be satisfied. Data that does not conform is rejected.
        </Para>

        <Para>
          This constraint is the source of the warehouse's trustworthiness — data in
          the warehouse conforms to a known structure and can be trusted. It is also
          the source of the warehouse's biggest limitation: you must know what you
          want to store before you store it, and changing the schema (adding columns,
          changing types) requires explicit migrations.
        </Para>

        <Para>
          For a company in 2010 that generated structured transactional data from
          known systems, schema-on-write was acceptable. For a company in 2020 that
          was also collecting raw click streams, IoT sensor data, unstructured log
          files, and semi-structured JSON events — schema-on-write became a bottleneck.
          Someone had to define a schema for every new data source before a single byte
          could be stored. This bottleneck created the data lake.
        </Para>

        <SubTitle>Storage cost — the warehouse's second limitation</SubTitle>

        <Para>
          Traditional on-premises data warehouses (Teradata, IBM Netezza, Oracle Exadata)
          bundled compute and storage together in proprietary hardware. Storage cost was
          $10,000–$50,000 per TB. This made it economically impossible to store raw,
          unprocessed data in the warehouse — only clean, valuable data justified the cost.
          The warehouse became a highly curated space. Raw data was discarded or stored
          on separate, cheaper but less queryable storage.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#00e676',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Warehouse strengths</div>
            {[
              'Fast analytical SQL queries (columnar, distributed)',
              'Schema enforcement ensures data quality',
              'ACID transactions on large datasets',
              'Built-in access control and auditing',
              'Analysts and BI tools connect directly with SQL',
              'Time travel and zero-copy cloning (Snowflake)',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✓ {s}
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#ff4757',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Warehouse weaknesses</div>
            {[
              'Expensive per GB — not suitable for raw data storage',
              'Schema-on-write — must define structure before ingesting',
              'Cannot store unstructured data (images, audio)',
              'Schema migrations required for structure changes',
              'Vendor lock-in with proprietary formats and SQL dialects',
              'Compute and storage often bundled (improving with modern warehouses)',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✗ {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Part 03 — Data Lake ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Architecture Two" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#7b61ff',
            fontFamily: 'var(--font-mono)',
          }}>LAKE</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Data Lake</h2>
        </div>

        <Para>
          The data lake emerged in the early 2010s as a direct reaction to the
          warehouse's limitations. The invention of cheap, scalable cloud object
          storage (Amazon S3 launched in 2006) meant that storing raw data became
          economically viable for the first time. A terabyte in S3 costs $23 per month.
          The same terabyte in a traditional warehouse hardware appliance cost thousands.
        </Para>

        <Para>
          The data lake philosophy is the opposite of the warehouse:
          <strong> store everything now, define structure when you query it
          (schema-on-read)</strong>. Raw JSON, CSV files, log files, images, audio,
          sensor streams — land everything in object storage in its original format.
          Do not clean, do not transform, do not reject. Worry about structure later.
        </Para>

        <SubTitle>Schema-on-read — the lake's defining characteristic</SubTitle>

        <Para>
          In a data lake, the schema is not defined when data is written — it is
          defined when data is read. You can store a year of raw JSON events without
          ever defining their schema. When you need to analyse them, you read the files
          and apply a schema at query time. Apache Spark and query engines like Athena
          and Presto support this pattern natively — they infer or accept an
          externally-defined schema at read time.
        </Para>

        <CodeBox label="Schema-on-read — the lake's approach to flexibility">{`SCHEMA-ON-WRITE (warehouse):
  Before loading order data, you must define:
    CREATE TABLE orders (
      order_id BIGINT NOT NULL,
      customer_id BIGINT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(20) NOT NULL CHECK (status IN (...)),
      created_at TIMESTAMP NOT NULL
    );
  Data that doesn't match this schema → REJECTED

  New field added to source (restaurant_tier)? 
    → ALTER TABLE, migration, re-load. Days of work.

SCHEMA-ON-READ (data lake):
  Store raw JSON as-is in S3:
    s3://data-lake/orders/2026-03-17/batch_001.json
  No schema definition needed. File lands in seconds.

  Query time (Spark / Athena):
    spark.read.json("s3://data-lake/orders/2026-03-17/")
    → Spark infers schema from the files
    → Returns DataFrame with inferred column types

  New field added to source?
    → Nothing to do. It just appears in new files.
    → Old files that lack the new field return null for it.
    → No migration needed.

  Freedom: store ANY format — JSON, CSV, Parquet, images, audio.
  Cost: $0.023/GB/month on S3 vs $10,000+/TB for old warehouse hardware.

  The tradeoff: you get flexibility and low cost.
  You lose: schema enforcement, data quality guarantees, fast SQL.`}</CodeBox>

        <SubTitle>Why the data lake became a data swamp</SubTitle>

        <Para>
          The "store everything now, worry later" philosophy sounded liberating. In
          practice, it created a new set of problems that became so pervasive they
          earned their own name: the <strong>data swamp</strong>. A data lake that
          nobody can use effectively is a data swamp.
        </Para>

        {[
          {
            problem: 'No schema enforcement means no data quality',
            detail: 'When any data can be stored in any format without validation, the lake fills with inconsistent, corrupt, and undocumented data. A CSV file from a vendor that changed its column order six months ago sits in the lake next to the correctly-formatted files. Nobody knows which is which. Queries produce wrong results silently.',
          },
          {
            problem: 'No ACID transactions means inconsistent reads',
            detail: 'Without transactions, a pipeline that writes a batch of files can be interrupted halfway. Readers see partial data. Another pipeline might overwrite a directory while a query is reading from it. Concurrent writes to the same partition produce data corruption that is not detected until analysis produces wrong numbers.',
          },
          {
            problem: 'No update or delete means GDPR is a nightmare',
            detail: 'Object storage is append-only. You can add files but cannot update a specific row in an existing file. When a user exercises their GDPR "right to be forgotten," you cannot delete their records from raw Parquet files without rewriting the entire file. At terabyte scale, this is an expensive operation.',
          },
          {
            problem: 'No governance means nobody knows what exists',
            detail: 'Without a metadata layer, the lake is a directory of files with no documentation of what each file contains, when it was last updated, or whether it is reliable. Data teams spend hours finding the right file, understanding its schema, and guessing whether it is current. The data catalogue becomes essential — and was often missing from early lake architectures.',
          },
          {
            problem: 'Slow SQL performance without proper organisation',
            detail: 'A plain S3 directory of JSON files is slow to query. Without Parquet format, date partitioning, and a proper query engine, even basic aggregations require full dataset scans. Many early data lakes stored raw JSON from APIs, making analytical queries impractically slow.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.15)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 10,
            borderLeft: '3px solid #ff4757',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#ff4757',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>⚠ {item.problem}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.detail}
            </div>
          </div>
        ))}

        <Callout type="tip">
          <strong>The data swamp diagnosis:</strong> your data lake is a swamp if:
          analysts cannot find what they need without asking a data engineer,
          you cannot answer "is this data current?", pipeline reruns produce
          different results from the original run, or a GDPR deletion request
          takes more than a few hours to execute. All of these are solvable —
          with better organisation, Parquet format, partitioning, and a metadata
          catalogue. The lakehouse architecture was designed to solve them systematically.
        </Callout>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(123,97,255,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Lake strengths</div>
            {[
              'Extremely cheap storage ($0.02–0.05/GB/month)',
              'Accepts any format — CSV, JSON, Parquet, images, audio',
              'No schema required at write time — agile ingestion',
              'Schema changes need no migration',
              'Unlimited scale — petabytes without infrastructure changes',
              'Archive and raw data preservation indefinitely',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✓ {s}
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#ff4757',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Lake weaknesses</div>
            {[
              'No schema enforcement — garbage in, garbage out',
              'No ACID transactions — concurrent writes corrupt data',
              'No row-level updates or deletes (GDPR is hard)',
              'Slow SQL without Parquet + partitioning + proper engine',
              'Becomes a swamp without active governance',
              'No native access control at the row/column level',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✗ {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Part 04 — Lakehouse ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Architecture Three" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#f97316',
            fontFamily: 'var(--font-mono)',
          }}>LAKEHOUSE</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Lakehouse</h2>
        </div>

        <Para>
          The lakehouse is the architecture that combines the low cost and flexibility
          of a data lake with the reliability and governance of a data warehouse.
          It achieves this by adding a <strong>transaction log layer</strong> on top
          of object storage — a metadata layer that tracks every change made to the
          data, enforces schema evolution rules, and provides ACID transaction
          guarantees without moving data to an expensive proprietary system.
        </Para>

        <Para>
          Databricks introduced Delta Lake in 2019. Apache Iceberg (originally from
          Netflix) and Apache Hudi (originally from Uber) are the other dominant
          table formats. All three work on the same principle: your data files are
          still plain Parquet on S3 or ADLS — but a transaction log alongside them
          records every operation, making the whole thing behave like a proper
          database table.
        </Para>

        <SubTitle>How the table format layer works</SubTitle>

        <CodeBox label="Delta Lake — how a transaction log adds ACID to object storage">{`Plain S3 without Delta Lake (data lake):
  s3://data-lake/orders/
    part-00001.parquet  (written Monday)
    part-00002.parquet  (written Tuesday)
    part-00003.parquet  (written Tuesday, overlaps with 00002 — BUG)

  Problems:
    If Tuesday's job failed partway, 00002 and 00003 partially exist
    No way to know which files are "committed" vs in-progress
    No way to update or delete specific rows
    Two simultaneous writers corrupt the data

WITH DELTA LAKE (lakehouse):
  s3://data-lake/orders/
    part-00001.parquet
    part-00002.parquet
    part-00003.parquet
    _delta_log/
      00000000000000000000.json   ← transaction 0: initial table creation
      00000000000000000001.json   ← transaction 1: add part-00001
      00000000000000000002.json   ← transaction 2: add part-00002
      00000000000000000003.json   ← transaction 3: add part-00003
      00000000000000000004.json   ← transaction 4: DELETE WHERE status='test'

Transaction log entry (JSON):
{
  "commitInfo": {"timestamp": 1710698072847, "operation": "WRITE",
                 "operationParameters": {"mode": "Append"}},
  "add": {"path": "part-00002.parquet",
          "size": 8472931, "dataChange": true,
          "stats": {"numRecords": 100000,
                    "minValues": {"order_id": 9284751},
                    "maxValues": {"order_id": 9384750}}}
}

WHAT THE TRANSACTION LOG ENABLES:
  ✓ ACID transactions: readers see only committed transactions
  ✓ Time travel: read table as it was at any past transaction
      spark.read.format("delta").option("versionAsOf", 3).load(path)
  ✓ Row-level deletes: DELETE FROM orders WHERE customer_id = 4201938
      (marks old file as removed, writes new file without the row)
  ✓ Schema evolution: ALTER TABLE orders ADD COLUMN delivery_fee DECIMAL
  ✓ Concurrent writes: optimistic concurrency control, conflict detection
  ✓ Audit log: full history of every operation ever performed`}</CodeBox>

        <SubTitle>The three table formats — Delta Lake, Iceberg, Hudi</SubTitle>

        <Para>
          All three table formats solve the same core problems (ACID transactions,
          time travel, schema evolution on object storage) but differ in ecosystem
          support, specific capabilities, and design philosophy.
        </Para>

        <CompareTable
          headers={[
            { label: 'Feature' },
            { label: 'Delta Lake', color: '#00add4' },
            { label: 'Apache Iceberg', color: '#2672a0' },
            { label: 'Apache Hudi', color: '#f97316' },
          ]}
          keys={['feature', 'delta', 'iceberg', 'hudi']}
          rows={[
            { feature: 'Created by', delta: 'Databricks (2019)', iceberg: 'Netflix → Apache (2018)', hudi: 'Uber → Apache (2019)' },
            { feature: 'Metadata format', delta: 'JSON transaction log in _delta_log/', iceberg: 'Metadata JSON tree + manifest files', hudi: 'Timeline + .hoodie metadata directory' },
            { feature: 'Primary strength', delta: 'Deep Spark + Databricks integration, simplest to use', iceberg: 'Engine-agnostic, works with Spark + Flink + Trino + Athena + BigQuery', hudi: 'Optimised for high-frequency upserts and near-real-time CDC ingestion' },
            { feature: 'Time travel', delta: '✓ Version-based and timestamp-based', iceberg: '✓ Snapshot-based, very efficient', hudi: '✓ Commit-timeline based' },
            { feature: 'Schema evolution', delta: '✓ Add columns, drop columns, rename (with config)', iceberg: '✓ Full evolution with hidden partitioning', hudi: '✓ Add columns, evolve types' },
            { feature: 'Partition evolution', delta: 'Manual — must rewrite data to change partitions', iceberg: '✓ Hidden partitioning — change partitions without rewriting data', hudi: 'Manual partition evolution' },
            { feature: 'Best query engines', delta: 'Apache Spark, Databricks, Trino (via connector)', iceberg: 'Spark, Flink, Trino, Athena, BigQuery Omni, Snowflake', hudi: 'Spark, Flink, Hive, Presto' },
            { feature: 'Choose when', delta: 'Databricks is your primary compute platform', iceberg: 'Multiple query engines, AWS-heavy or multi-cloud', hudi: 'High-frequency CDC upserts are the dominant workload' },
          ]}
        />

        <SubTitle>The separation of compute and storage — the lakehouse advantage</SubTitle>

        <Para>
          Traditional data warehouses bundled compute and storage together — if you
          needed more storage, you also paid for more compute, and vice versa. This
          coupling was economically wasteful: most data is rarely queried, so paying
          for always-on compute to sit next to cold storage made little sense.
        </Para>

        <Para>
          The lakehouse completely separates compute from storage. Data lives in S3
          or ADLS at $0.023/GB/month. Compute — Spark clusters, Databricks clusters,
          Trino clusters — spins up when a query runs and shuts down when it finishes.
          You pay for storage continuously at low cost and pay for compute only while
          it is actually running. This economic model made petabyte-scale analytics
          accessible to companies that could never afford traditional warehouse hardware.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#f97316',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Lakehouse strengths</div>
            {[
              'Lake-cost storage + warehouse-quality transactions',
              'ACID guarantees on object storage',
              'Row-level updates and deletes (GDPR compliance)',
              'Time travel — query data at any historical point',
              'Schema evolution without full rewrites',
              'Open formats — no vendor lock-in on data files',
              'Supports ML training (Spark direct access) and SQL (warehouse)',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✓ {s}
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#ff4757',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>Lakehouse weaknesses</div>
            {[
              'More complex to set up and operate than a pure warehouse',
              'Compaction and maintenance jobs required (VACUUM, OPTIMIZE)',
              'Small file accumulation degrades performance over time',
              'SQL performance slightly below optimised warehouse for simple queries',
              'Ecosystem still maturing — some BI tools have limited support',
              'Requires understanding of Spark or another compute engine',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 3 }}>
                ✗ {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Part 05 — Full Comparison ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Direct Comparison" />
        <SectionTitle>Warehouse vs Lake vs Lakehouse — Every Dimension</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Data Warehouse', color: '#00e676' },
            { label: 'Data Lake', color: '#7b61ff' },
            { label: 'Lakehouse', color: '#f97316' },
          ]}
          keys={['dim', 'warehouse', 'lake', 'lakehouse']}
          rows={[
            { dim: 'Storage cost', warehouse: 'High — $100–500+/TB/month', lake: 'Very low — $23/TB/month (S3)', lakehouse: 'Very low — same object storage as lake' },
            { dim: 'Schema approach', warehouse: 'Schema-on-write — enforced before load', lake: 'Schema-on-read — applied at query time', lakehouse: 'Schema-on-write with evolution — enforced but changeable' },
            { dim: 'Data types accepted', warehouse: 'Structured only (tables)', lake: 'Any — structured, semi, unstructured', lakehouse: 'Structured + semi-structured (unstructured stored separately)' },
            { dim: 'ACID transactions', warehouse: '✓ Full ACID', lake: '✗ None — append only', lakehouse: '✓ Full ACID via transaction log' },
            { dim: 'Row-level updates', warehouse: '✓ Yes (UPDATE/DELETE)', lake: '✗ No — must rewrite files', lakehouse: '✓ Yes (rewrites affected files)' },
            { dim: 'Time travel', warehouse: 'Depends — Snowflake yes, Redshift no', lake: '✗ No — no history tracking', lakehouse: '✓ Yes — any historical version' },
            { dim: 'SQL performance', warehouse: 'Excellent — optimised for SQL', lake: 'Slow without Parquet + partitioning', lakehouse: 'Good — slightly below pure warehouse for simple SQL' },
            { dim: 'ML / Spark access', warehouse: 'Via JDBC/export — slower', lake: '✓ Direct file access — fast', lakehouse: '✓ Direct Spark access — fast' },
            { dim: 'Governance', warehouse: '✓ Strong — schema + access control', lake: '✗ Weak — no schema enforcement', lakehouse: '✓ Strong — schema + audit log + access control' },
            { dim: 'Maintenance', warehouse: 'Low — managed by vendor', lake: 'Low to medium — file organisation matters', lakehouse: 'Medium — compaction, VACUUM, OPTIMIZE jobs required' },
            { dim: 'Vendor lock-in', warehouse: 'High — proprietary format and SQL', lake: 'Low — open file formats (Parquet)', lakehouse: 'Low — open formats, table format is open source' },
            { dim: 'Best for', warehouse: 'Business analytics, BI dashboards, regulated data', lake: 'Raw data archive, ML training data, unstructured data', lakehouse: 'Unified analytics + ML + streaming, modern data platforms' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Modern Architecture ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — How They Work Together" />
        <SectionTitle>How All Three Coexist in a Modern Data Platform</SectionTitle>

        <Para>
          The choice is not "pick one." Most mature data platforms at Indian tech
          companies use all three architectural patterns simultaneously, each serving
          a different purpose. Understanding how they fit together is more useful
          than treating them as alternatives.
        </Para>

        <CodeBox label="Modern data platform — all three architectures in one design">{`LAYER               ARCHITECTURE    PURPOSE
─────────────────────────────────────────────────────────────────────
Landing Zone        Data Lake        Raw files in S3/ADLS exactly
(object storage)                     as received — any format,
                                     no schema enforcement,
                                     permanent archive

Bronze Layer        Data Lake        Parquet files, date-partitioned,
(object storage     (organised)      metadata added. Still no ACID
+ Parquet)                           but organised for query efficiency

Silver Layer        Lakehouse        Delta Lake / Iceberg tables.
(object storage     (Delta/Iceberg)  ACID transactions, schema
+ table format)                      enforced, row-level deletes,
                                     time travel enabled.
                                     Cleaned and conformed data.

Gold Layer          Lakehouse +      Delta tables for Spark consumers
(object storage     Warehouse        Snowflake/BigQuery tables for
+ warehouse)                         SQL/BI consumers.
                                     Same data, two serving layers.

ML Feature Store    Lakehouse        Delta tables with low-latency
(object storage)                     access for model training.
                                     Versioned features for reproducibility.

Unstructured Data   Pure Data Lake   Images, audio, PDFs in S3.
(object storage)                     No table format — just organised
                                     object storage with metadata table
                                     tracking what exists.

REAL EXAMPLE — Swiggy-style architecture:
  Raw Kafka events (JSON) → S3 landing zone (data lake)
  Landing → Bronze Parquet (data lake, organised)
  Bronze → Silver Delta tables (lakehouse, ACID, deduplicated)
  Silver → Gold Delta tables (lakehouse, aggregated)
  Gold → Snowflake (warehouse, SQL for analysts, Power BI)
  Gold → Spark ML jobs (lakehouse, model training)
  Product images → S3 (pure lake, ML model reads directly)`}</CodeBox>

        <SubTitle>When to use just a warehouse (no lake needed)</SubTitle>

        <Para>
          Not every company needs a data lake or lakehouse. A Series A startup with
          structured data from a few PostgreSQL tables, a Salesforce CRM, and a
          payment processor does not need Delta Lake and a Spark cluster. A direct
          pipeline from those sources into Snowflake, with dbt transformations, is
          the right architecture. Simple, fast to build, easy to maintain.
        </Para>

        <Para>
          The trigger points for adding a lake or lakehouse layer: data volume exceeds
          what a warehouse can economically store (usually in the multi-TB range for
          raw data), data types include unstructured content that cannot go in the
          warehouse, ML teams need direct file access for model training, or schema
          flexibility requirements exceed what the warehouse's migration process can
          handle comfortably.
        </Para>

        <SubTitle>The modern warehouse — blurring the line</SubTitle>

        <Para>
          Modern cloud warehouses (Snowflake, BigQuery, Redshift Spectrum) have
          been adding data lake features. Snowflake can query external S3 files
          directly. BigQuery supports external tables over GCS. Redshift Spectrum
          queries S3 Parquet via Athena. Simultaneously, the lakehouse (Databricks
          SQL) has been adding warehouse-quality SQL performance. The boundary
          between warehouse and lakehouse is blurring — both are converging on the
          same goal: cheap lake storage with warehouse-quality SQL.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Choosing Guide ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Choice Guide" />
        <SectionTitle>How to Choose the Right Architecture for Your Company</SectionTitle>

        <CodeBox label="Architecture decision framework — match to your actual situation">{`SITUATION 1: Small to mid-size company, mostly structured data
  Team:    1–3 data engineers, 2–5 analysts
  Data:    PostgreSQL, a few SaaS APIs, payment processor
  Volume:  < 500 GB total
  Answer:  WAREHOUSE ONLY (Snowflake or BigQuery)
    → Ingest directly into warehouse via dbt
    → No lake needed — volume is manageable
    → Analysts use SQL directly, BI tools connect to warehouse
    → Simple, fast to build, low maintenance

SITUATION 2: Growth stage company, mixed structured + semi-structured
  Team:    3–8 data engineers
  Data:    PostgreSQL, MongoDB, Kafka events, vendor files
  Volume:  500 GB – 10 TB
  Answer:  LAKE + WAREHOUSE (Medallion architecture)
    → Bronze: raw Parquet in S3, preserves all data cheaply
    → Silver/Gold: dbt transformations into Snowflake
    → Analysts query Snowflake, raw lake is for reprocessing
    → Add Delta Lake when update/delete requirements emerge

SITUATION 3: Scale company, ML platform, streaming data
  Team:    10+ data engineers, ML team, analytics team
  Data:    Multiple DBs, Kafka, IoT, unstructured content
  Volume:  10 TB – PB scale
  Answer:  FULL LAKEHOUSE (Delta Lake or Iceberg)
    → Landing zone: raw files in S3/ADLS
    → Bronze: Parquet with date partitioning
    → Silver: Delta/Iceberg tables (ACID, time travel)
    → Gold: Delta/Iceberg + Snowflake serving layer
    → ML: Spark reads directly from Delta tables
    → Analysts: Snowflake or Databricks SQL

SITUATION 4: Regulated industry (banking, healthcare, insurance)
  Requirements: full audit trail, GDPR compliance, data lineage
  Answer:  WAREHOUSE with strong governance OR LAKEHOUSE with Unity Catalog
    → Warehouses (Snowflake) have mature governance features
    → Lakehouse (Databricks + Unity Catalog) for scale + governance
    → Time travel in both enables point-in-time audit queries
    → Row-level security for column-level data masking (PII)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Migrating From a Warehouse-Only Architecture to a Lakehouse</SectionTitle>

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
            Scenario — D2C Startup · Series C · Growing Data Needs
          </div>

          <Para>
            A D2C fashion startup raised its Series C in 2024. They have 2 million
            active customers, 800,000 orders per month, and a data platform built two
            years ago as a simple Snowflake warehouse. Their data engineers run five
            dbt pipelines that load data from PostgreSQL and Shopify into Snowflake.
            It works. But three new requirements have arrived simultaneously that
            Snowflake alone cannot handle well.
          </Para>

          <Para>
            <strong>Requirement 1 — ML team needs training data:</strong> The ML team
            wants to train a recommendation model on 18 months of user behaviour events
            (200 million rows of click and purchase events). Loading all of this into
            Snowflake for ML training costs $800/month just in compute credits. They
            need direct file access.
          </Para>

          <Para>
            <strong>Requirement 2 — GDPR deletion requests:</strong> European
            customers are submitting data deletion requests. Deleting a customer from
            Snowflake is straightforward. But the raw PostgreSQL CDC events and Shopify
            export files in S3 still contain their data. Without row-level deletes
            on S3 files, full GDPR compliance is impossible.
          </Para>

          <Para>
            <strong>Requirement 3 — Raw data preservation:</strong> A business
            intelligence query found that Snowflake's computed metrics do not match
            the raw source data for a period six months ago. Someone ran a data
            migration that corrupted three weeks of order metrics. They need to
            reprocess from raw. But raw data was never preserved — only the
            transformed Snowflake tables exist.
          </Para>

          <Para>
            <strong>Your migration plan:</strong> Add a lakehouse layer below the
            existing Snowflake warehouse without disrupting what already works.
          </Para>

          <Para>
            Step 1: land all raw data from every pipeline run into S3 as Parquet
            before loading to Snowflake. The landing zone costs $8/month to store
            a year of raw data. Raw data is now preserved for reprocessing.
          </Para>

          <Para>
            Step 2: convert the S3 raw layer to Delta Lake tables. GDPR deletion
            requests can now be executed with a Delta DELETE statement — Delta writes
            new Parquet files excluding the deleted customer's records. Full GDPR
            compliance on the lake layer.
          </Para>

          <Para>
            Step 3: expose the Delta Lake Silver tables to the ML team via
            Databricks. They read training data directly from Delta files on S3 —
            no Snowflake compute credits consumed. ML training cost drops to near zero.
          </Para>

          <Para>
            <strong>The result:</strong> three blocking requirements resolved without
            replacing the existing Snowflake warehouse. The analysts still use
            Snowflake for SQL. The ML team uses Databricks against Delta. Operations
            use the Delta layer for GDPR compliance. Raw data is preserved for
            reprocessing. Total additional infrastructure cost: $80/month for S3
            storage and Databricks community edition for development.
          </Para>

          <Para>
            This is the most common real-world lakehouse adoption pattern — not a
            full rewrite, but a pragmatic addition of lake and lakehouse layers to
            a working warehouse architecture.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between a data lake and a data warehouse? When would you use each?',
            a: `A data warehouse is a structured, SQL-queryable analytical database that accepts only schema-conforming data and stores it in a columnar format optimised for fast aggregation queries. Before any data enters a warehouse, it must conform to a defined schema — correct column names, correct types, valid values. The warehouse is the source of truth for clean, modelled, business-ready data. Business analysts connect BI tools to it and run SQL. It is fast, reliable, and governed — but expensive per GB and inflexible about schema changes.

A data lake is an object store (S3, ADLS, GCS) that accepts any data in any format — CSV, JSON, Parquet, images, audio, log files — with no schema requirement. Data lands as-is and schema is applied when the data is read (schema-on-read). Storage costs are 10–50× cheaper than a warehouse. The trade-off is that the lake provides no data quality enforcement, no ACID transactions, no row-level updates, and becomes difficult to manage at scale without active governance.

I would use a warehouse alone when the company has structured data from a few known sources, the volume is in the GB to low TB range, and the primary consumers are SQL analysts and BI tools. I would add a data lake when raw data preservation for reprocessing is needed, data includes unstructured content that cannot go in the warehouse, volume makes warehouse storage economically impractical, or ML teams need direct file access for model training.`,
          },
          {
            q: 'Q2. What is a data swamp and how do you prevent one?',
            a: `A data swamp is a data lake that has become unusable — full of data that nobody can find, understand, or trust. The term captures the state where the original promise of the lake (store everything, query flexibly) has been defeated by poor governance and organisation.

The signs of a data swamp: analysts cannot find the right dataset without asking a data engineer, nobody knows if a dataset is current or stale, the same data exists in multiple inconsistent versions across different directories, schema documentation does not exist, query results are inconsistent between runs, and GDPR deletion requests take days or weeks because nobody knows which files contain a given customer's data.

Prevention requires four things applied consistently from the beginning. First, format discipline: always convert raw data to Parquet at the Bronze layer. Never leave JSON or CSV files as the long-term storage format for analytical data. Parquet is compressed, queryable, and self-describing.

Second, partitioning: organise files in Hive-style date partitions from day one. Files at paths like date=2026-03-17/ allow query engines to prune irrelevant data and make it clear when data was written.

Third, a data catalogue: every dataset in the lake must be registered in a catalogue (AWS Glue Data Catalog, Apache Atlas, Databricks Unity Catalog) with schema definition, owner, freshness expectations, and description. Undocumented datasets become orphaned quickly.

Fourth, a table format: adding Delta Lake or Iceberg turns the lake into a lakehouse — adding ACID transactions, schema enforcement, and time travel. The table format is the single change that eliminates most swamp-forming behaviours by making the lake behave more like a database.`,
          },
          {
            q: 'Q3. What problem does the lakehouse architecture solve that neither the warehouse nor the lake solves alone?',
            a: `The warehouse and the data lake each solve different problems and introduce different limitations. The lakehouse solves the specific problems created by having both architectures coexist without the downsides of either.

The warehouse's problems: expensive storage (cannot economically store raw data), no support for unstructured data, schema rigidity (new data sources require migration before ingestion), and difficulty serving both SQL analysts and ML engineers who need direct file access.

The lake's problems: no ACID transactions (concurrent writes corrupt data, failed jobs leave partial data), no row-level updates or deletes (makes GDPR compliance difficult), no schema enforcement (data quality degrades without guardrails), slow SQL queries without proper organisation.

The lakehouse solves these specific gaps. By adding a transaction log layer (Delta Lake, Iceberg) on top of object storage, the lake gains ACID transactions, row-level updates and deletes, schema enforcement with evolution, and time travel — all the properties that made the warehouse trustworthy. Since the underlying storage is still cheap object storage, the cost remains at lake prices. Since data is still in open Parquet files, both SQL engines (Snowflake, Databricks SQL) and ML compute (Spark) can access it directly.

The one thing the lakehouse does not fully solve is simple SQL query performance for analytics — a pure warehouse with its full optimisation stack is still somewhat faster for SQL. The lakehouse is the better choice when you need to serve both analytics and ML workloads, need GDPR-compliant deletions, need time travel for audit or reprocessing, and want to avoid paying warehouse prices for raw data storage.`,
          },
          {
            q: 'Q4. How does time travel work in a lakehouse and when is it useful for data engineering?',
            a: `Time travel in a lakehouse allows you to query the state of a table as it existed at any past point in time — either by specifying a version number or a timestamp. It works because the transaction log (Delta Lake's _delta_log, Iceberg's metadata snapshots) records every change made to the table, including which files were added, which were removed, and when. Reading a historical version means reading only the files that were "live" at that point, which the log records precisely.

In Delta Lake: SELECT * FROM orders VERSION AS OF 47 reads the table as it was after transaction 47. SELECT * FROM orders TIMESTAMP AS OF '2026-03-01' reads it as it was on March 1st. In Iceberg: SELECT * FROM orders FOR SYSTEM_TIME AS OF TIMESTAMP '2026-03-01 00:00:00'. Files are never deleted immediately — they are retained for a configurable period (default 30 days in Delta Lake) before VACUUM removes them.

For data engineering, time travel is useful in four concrete situations. First, pipeline debugging: when a pipeline produces wrong results, time travel lets you compare the current table state to the state before the pipeline ran, identifying exactly what changed. Second, reprocessing: if a transformation bug corrupted data, you can restore the previous correct version and rerun the correct logic without re-ingesting from source. Third, slowly changing dimension tracking: SCD Type 2 can be implemented by reading historical snapshots rather than maintaining complex slowly-changing logic in the pipeline. Fourth, audit and compliance: regulated industries need to answer questions like "what was the account balance on this customer's account on this date" — time travel answers these without maintaining separate audit tables.`,
          },
          {
            q: 'Q5. A company stores 5 TB of data in Snowflake and pays $2,400/month. The CTO asks if this can be reduced without losing analytical capability. What do you recommend?',
            a: `This is a cost optimisation question that the lakehouse architecture answers directly. $2,400/month for 5 TB of storage in Snowflake translates to roughly $480/TB/month — substantially above object storage pricing of $23/TB/month.

The question is: how much of that 5 TB needs to be in Snowflake, and how much could move to cheaper object storage without losing analytical capability?

My recommendation: implement a tiered storage architecture with three categories.

First, identify which data is actively queried. In most data platforms, 20% of data accounts for 80% of queries — typically the Gold layer aggregations and the most recent 90 days of Silver data. This hot data stays in Snowflake where query performance is critical. Typically 500 GB to 1 TB.

Second, identify historical Silver and Bronze data that is queried rarely but must be kept for compliance or reprocessing. This cold data moves to Delta Lake on S3. It is still queryable via Snowflake external tables (Snowflake can query S3 Parquet files directly) or via Spark for ad-hoc analysis. Storage cost drops to $23/TB/month. Typically 3–4 TB.

Third, true archives (Bronze landing zone, raw unprocessed files) move to S3 Glacier Instant Retrieval at $4/TB/month. Rarely queried, only needed for disaster recovery or deep reprocessing.

Expected outcome: keep 1 TB in Snowflake at $480/month, move 3.5 TB to S3 Delta at $80/month, archive 0.5 TB at $2/month. New monthly cost: approximately $562/month — a 77% reduction. Analytical capability for active data is unchanged. Historical data remains accessible, just slower to query.`,
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
            error: `DeltaAnalysisException: Cannot perform MERGE INTO on table because the destination has concurrent writes — transaction conflict detected`,
            cause: 'Two Spark jobs tried to write to the same Delta table at the same time and their changes conflicted. Delta Lake uses optimistic concurrency control — both jobs read the table state, computed their changes, and then attempted to commit. The second commit detected that the table had changed since it read its snapshot and refused to write, preventing data corruption.',
            fix: 'Delta\'s conflict detection is working correctly — this is better than silently corrupting data. For append-only pipelines: use delta.append mode instead of overwrite. For concurrent updates: serialise writes to the same table (run jobs sequentially rather than in parallel). For high-concurrency use cases: partition the table and ensure each job writes to a different partition, eliminating conflicts entirely. Review whether two jobs genuinely need to write to the same table simultaneously.',
          },
          {
            error: `Snowflake query cost alert: single query scanned 4.2 TB and consumed 847 credits ($1,694)`,
            cause: 'A query ran a full table scan on a large table without a clustering key filter, causing Snowflake to scan the entire table. This commonly happens when: a WHERE filter references a column that is not the clustering key, a non-selective filter returns most of the table anyway, or the table has no clustering key and data is not organised for the query pattern.',
            fix: 'Check the query profile in Snowflake UI — look for "Partition pruning: 0%" which confirms full scan. Add a clustering key on the most common filter column: ALTER TABLE orders CLUSTER BY (DATE(created_at)). Snowflake automatically reclusters over time. For immediate relief: add the clustering column to the WHERE clause with a selective filter. Investigate whether this query should be reading pre-aggregated Gold data instead of raw Silver records.',
          },
          {
            error: `Delta Lake: VACUUM removed files that an active Spark job was reading — FileNotFoundException on part-00147.parquet`,
            cause: 'A VACUUM command was run with the retention threshold set too low (or to 0), and it deleted Parquet files that belong to an earlier table version. A concurrent Spark job that had taken a snapshot of that earlier version was still reading those files when VACUUM deleted them.',
            fix: 'Never run VACUUM with retentionDuration = 0 unless you have confirmed no active jobs reference historical versions. The default safe retention period is 7 days — keep it at least this long. Before running VACUUM on a production table: check for active streaming queries or long-running Spark jobs that reference this table. Run VACUUM in a maintenance window when no active jobs are reading the table. Set spark.databricks.delta.retentionDurationCheck.enabled = false only for testing, never in production.',
          },
          {
            error: `S3 data lake: query returned 12.4M rows but pipeline originally wrote 14.8M rows — 2.4M rows silently missing`,
            cause: 'A pipeline writing to S3 without a table format (plain Parquet files, no Delta/Iceberg) failed partway through and left the directory in a partial state. Some partition directories contain complete data, others contain only the files written before the failure. The query engine counted only the files that exist, not the files that should exist. Without a transaction log, there is no way for the query engine to know the write was incomplete.',
            fix: 'This is the core problem that Delta Lake and Iceberg solve. Migrate the table to Delta Lake or Iceberg — all future writes will be atomic, and partial writes will not be visible to readers. For the immediate data loss: re-run the pipeline for the affected date range to rewrite the missing partitions. Add a row count validation step to your pipeline that compares the count written to the count in the destination, alerting if they differ by more than 1%.',
          },
          {
            error: `Iceberg table: snapshot expired — cannot read table at version requested because snapshot 1710432000 has been removed by expire_snapshots`,
            cause: 'An Iceberg maintenance job ran expire_snapshots to reclaim storage, and it removed the snapshot that a downstream pipeline was trying to reference for time-travel or incremental processing. The snapshot\'s Parquet files were deleted before the consuming pipeline completed its work.',
            fix: 'Configure expire_snapshots with a minimum age that is longer than your longest pipeline run: spark.sql("CALL catalog.system.expire_snapshots(table => \'db.orders\', older_than => TIMESTAMP \'2026-02-01 00:00:00\', retain_last => 10)"). This retains at least 10 snapshots and only expires those older than 30 days. For pipelines that use time-travel references: store the snapshot ID at pipeline start and verify it still exists before beginning a long-running job. Never expire snapshots if any active pipeline holds a reference to them.',
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
        'The data warehouse (1980s–2000s) is a structured, columnar, SQL-queryable analytical database. It enforces schema on write, delivers fast SQL queries, and provides strong governance — but is expensive per GB and cannot store unstructured data or accept schema changes without migrations.',
        'The data lake (2010s) is cheap object storage (S3/ADLS/GCS) that accepts any data in any format with no schema requirement. It solves the warehouse\'s cost and flexibility problems but creates new ones: no ACID transactions, no row-level updates, no schema enforcement, and the risk of becoming a data swamp.',
        'A data swamp is a data lake that nobody can use — undocumented, inconsistent, ungoverned. Prevent it with four practices: convert raw files to Parquet, use date partitioning, maintain a data catalogue, and add a table format (Delta Lake or Iceberg).',
        'The lakehouse (2020s) adds a transaction log layer (Delta Lake, Iceberg, Hudi) on top of object storage, giving it ACID transactions, row-level updates and deletes, time travel, and schema evolution — at lake storage prices. The convergence of warehouse reliability with lake economics.',
        'Delta Lake uses a JSON transaction log (_delta_log/) alongside Parquet files to track every operation. Readers see only committed transactions. Time travel lets you query any historical version. Row-level deletes write new Parquet files excluding the deleted rows.',
        'The three lakehouse table formats (Delta Lake, Iceberg, Hudi) solve the same core problems but differ in ecosystem: Delta is best for Databricks-heavy stacks, Iceberg is engine-agnostic and best for multi-engine environments, Hudi is best when high-frequency CDC upserts are the dominant workload.',
        'Modern data platforms use all three architectures simultaneously: raw data in pure lake (S3), Silver/Gold as lakehouse tables (Delta/Iceberg), analytical serving via warehouse (Snowflake/BigQuery). Each layer uses the architecture suited to its purpose.',
        'Time travel is practically useful for pipeline debugging (compare before/after a bad run), reprocessing (restore previous version after a bug), GDPR audit queries (what was the state on this date), and SCD implementation. Retain snapshots for at least 7 days.',
        'The choice is not "lake or warehouse" — it is which combination matches your scale, team size, and requirements. A Series A startup with structured data and SQL analysts only needs a warehouse. A scale company with ML workloads, streaming data, and GDPR requirements needs a lakehouse.',
        'The most impactful single migration a data engineer can make on a legacy CSV data lake is: convert all files to Parquet + add date partitioning + add Delta Lake. This typically reduces query time by 10–20×, reduces storage cost by 5–10×, and adds GDPR-compliant deletion capability — all without changing the downstream SQL interface.',
      ]} />

    </LearnLayout>
  )
}