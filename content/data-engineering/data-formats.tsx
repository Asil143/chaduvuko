import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Formats — CSV, JSON, Parquet, Avro, ORC — Data Engineering | Chaduvuko',
  description:
    'Not just what each format is — but how it works internally, when to use it, what it costs in storage and compute, and what breaks when you choose the wrong one.',
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

// ── Reusable comparison table ────────────────────────────────────────────────

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
              fontSize: i === 0 ? 10 : 11,
              fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 150,
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

export default function DataFormatsModule() {
  return (
    <LearnLayout
      title="Data Formats — CSV, JSON, Parquet, Avro, ORC"
      description="How each format works internally, when to use it, and what breaks when you pick the wrong one."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Formats Matter ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why This Matters More Than You Think" />
        <SectionTitle>The Format Decision That Changed Everything</SectionTitle>

        <Para>
          In 2012, a team at Twitter needed to process billions of events per day.
          They were using CSV files. Queries that should have taken minutes took hours.
          Storage costs were enormous. They switched to a new columnar format called
          Parquet. Query time dropped by 90%. Storage cost dropped by 75%. They
          published the results. The industry never went back.
        </Para>

        <Para>
          The file format you choose determines four things: how much disk space your
          data takes, how fast queries run against it, whether your pipeline can handle
          schema changes, and whether different tools can read it. Choosing the wrong
          format does not cause an error — it causes slow pipelines, high cloud bills,
          and architectural pain that compounds over years.
        </Para>

        <Para>
          Every data engineer needs to know five formats fluently: <strong>CSV</strong>,
          <strong>JSON</strong>, <strong>Parquet</strong>, <strong>Avro</strong>, and
          <strong>ORC</strong>. Not because you will use all five in every project —
          you will not — but because you need to know which one is right for each
          situation and why.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 15, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.3px', marginBottom: 14,
          }}>
            The fundamental split that explains everything
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>Row-Oriented Formats</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 6 }}>
                All values for one record are stored together. Reading a record is fast.
                Scanning one column across many records is slow — you must read every column just to get one.
              </div>
              <div style={{
                fontSize: 12, color: '#00e676', fontFamily: 'var(--font-mono)',
              }}>CSV, JSON, Avro</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Best for: writing individual records, streaming, data transfer
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>Columnar Formats</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 6 }}>
                All values for one column are stored together. Reading one column
                across millions of rows is extremely fast. Reading one complete record requires
                stitching together values from multiple column chunks.
              </div>
              <div style={{
                fontSize: 12, color: '#7b61ff', fontFamily: 'var(--font-mono)',
              }}>Parquet, ORC</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
                Best for: analytical queries, data lakes, warehousing
              </div>
            </div>
          </div>
        </HighlightBox>

        <CodeBox label="Row vs columnar — how the same data is laid out differently on disk">{`Same dataset: 4 orders

ORDER DATA:
  order_id | customer_id | city       | amount | status
  ─────────────────────────────────────────────────────
  9284751  | 4201938     | Bangalore  | 380.00 | delivered
  9284752  | 1092847     | Mumbai     | 220.00 | cancelled
  9284753  | 8374621     | Hyderabad  | 540.00 | confirmed
  9284754  | 2938471     | Bangalore  | 180.00 | delivered

ROW FORMAT (CSV / Avro):
  Disk block 1: [9284751, 4201938, Bangalore, 380.00, delivered]
  Disk block 2: [9284752, 1092847, Mumbai,    220.00, cancelled]
  Disk block 3: [9284753, 8374621, Hyderabad, 540.00, confirmed]
  Disk block 4: [9284754, 2938471, Bangalore, 180.00, delivered]

  Query: SELECT SUM(amount) FROM orders
  Must read: ALL 5 columns × 4 rows = 20 values read, 4 needed

COLUMNAR FORMAT (Parquet / ORC):
  Column "order_id":    [9284751, 9284752, 9284753, 9284754]
  Column "customer_id": [4201938, 1092847, 8374621, 2938471]
  Column "city":        [Bangalore, Mumbai, Hyderabad, Bangalore]
  Column "amount":      [380.00, 220.00, 540.00, 180.00]
  Column "status":      [delivered, cancelled, confirmed, delivered]

  Query: SELECT SUM(amount) FROM orders
  Reads: ONLY the "amount" column = 4 values read, 4 needed
  10-100× less I/O for analytical queries at scale`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 — CSV ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Format One" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-mono)',
          }}>CSV</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Comma-Separated Values</h2>
        </div>

        <Para>
          CSV is the oldest, simplest, and most universal data format. Every system
          can read and write it. A CSV file is plain text — open it in Notepad and
          you see exactly what is in it. No binary encoding, no special software
          needed, no schema file required. This simplicity is why CSV has survived
          for 50 years and will survive 50 more.
        </Para>

        <SubTitle>How CSV works internally</SubTitle>

        <Para>
          A CSV file is a sequence of lines. Each line is one record. Within each
          line, values are separated by a delimiter — usually a comma, sometimes a
          tab (TSV), semicolon, or pipe. The first line is optionally a header
          row naming the columns. That is the entire specification.
        </Para>

        <CodeBox label="CSV internals — what the bytes actually look like">{`orders.csv — opened in a text editor:

order_id,customer_id,city,amount,status
9284751,4201938,Bangalore,380.00,delivered
9284752,1092847,Mumbai,220.00,cancelled
9284753,8374621,Hyderabad,540.00,confirmed

What the file actually is on disk:
  order_id,customer_id,city,amount,status\n
  9284751,4201938,Bangalore,380.00,delivered\n
  9284752,1092847,Mumbai,220.00,cancelled\n

  \n = newline character (line ending)
  Every value is a string — there are no types
  380.00 is not a number — it is the characters '3','8','0','.','0','0'
  The application reading the file decides what type to interpret it as

Quoting rule (RFC 4180):
  If a value contains the delimiter, wrap it in double quotes:
  9284755,4201938,"Mumbai, Maharashtra",380.00,delivered
                  ──────────────────── 
                  quoted because it contains a comma

  If a value contains double quotes, escape them by doubling:
  9284756,4201938,"Hotel ""Grand"" Mumbai",380.00,delivered`}</CodeBox>

        <SubTitle>What CSV does well and where it breaks</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#00e676',
              fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
              textTransform: 'uppercase', marginBottom: 10,
            }}>CSV strengths</div>
            {[
              'Universal — every tool, every language, every OS reads it',
              'Human readable — open in any text editor',
              'Simple to generate — any language can write it',
              'No schema file needed — self-contained',
              'Trivial to inspect and debug',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 4 }}>
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
            }}>CSV weaknesses</div>
            {[
              'No data types — everything is a string until parsed',
              'No schema enforcement — any garbage can be written',
              'Poor compression — text is verbose, especially for numbers',
              'No nested structure — cannot represent arrays or objects',
              'Slow for analytics — must read all columns to access one',
              'Delimiter ambiguity — commas in values require quoting',
              'Encoding issues — no way to declare encoding in the file itself',
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 4 }}>
                ✗ {s}
              </div>
            ))}
          </div>
        </div>

        <SubTitle>When to use CSV</SubTitle>
        <Para>
          CSV is the right choice for data exchange between systems where simplicity
          and universal compatibility matter more than performance. Vendor data exports,
          finance team reports, government open data, and one-time data loads are all
          appropriate CSV use cases. Never use CSV as the storage format inside a data
          lake or warehouse — convert to Parquet at the Bronze layer. Never use CSV
          for large analytical datasets — query performance is poor and storage cost
          is high compared to columnar alternatives.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — JSON ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Format Two" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(250,204,21,0.12)', border: '2px solid #facc15',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#facc15',
            fontFamily: 'var(--font-mono)',
          }}>JSON</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>JavaScript Object Notation</h2>
        </div>

        <Para>
          JSON is the lingua franca of the internet. Every REST API speaks JSON.
          Every modern web application exchanges JSON. Every NoSQL database stores
          JSON. As a data engineer, you will read, parse, validate, flatten, and
          transform more JSON than any other format. Module 07 covered JSON structure
          in depth — here we focus on JSON as a storage and transfer format.
        </Para>

        <SubTitle>JSON as a file format — NDJSON and JSON Lines</SubTitle>

        <Para>
          A single JSON object is fine for one record. But how do you store a million
          records? A single JSON array containing a million objects works but has a
          critical problem: you must read the entire file before you can parse any
          record, because the array is not complete until the closing bracket.
          This makes streaming and chunked processing impossible.
        </Para>

        <Para>
          The solution used in data engineering is <strong>NDJSON</strong> (Newline
          Delimited JSON) or JSON Lines — one complete JSON object per line, with
          a newline between records. This allows streaming parsers to read one record
          at a time without loading the entire file.
        </Para>

        <CodeBox label="JSON array vs NDJSON — how large datasets are stored">{`WRONG for large datasets — single JSON array:
[
  {"order_id": 9284751, "amount": 380.00, "city": "Bangalore"},
  {"order_id": 9284752, "amount": 220.00, "city": "Mumbai"},
  ... 999,998 more records ...
  {"order_id": 10284750, "amount": 540.00, "city": "Hyderabad"}
]
Problem: entire file must be read before any record can be parsed.
         1 GB file = hold 1 GB in memory to read record 1.

CORRECT for large datasets — NDJSON / JSON Lines:
{"order_id": 9284751, "amount": 380.00, "city": "Bangalore"}
{"order_id": 9284752, "amount": 220.00, "city": "Mumbai"}
{"order_id": 9284753, "amount": 540.00, "city": "Hyderabad"}

Each line is a complete, valid JSON object.
Parsers read line by line — constant memory regardless of file size.
Any line can be skipped or processed independently.
Spark, Pandas, and all major DE tools support NDJSON natively.

Python reading NDJSON efficiently:
  with open("orders.ndjson") as f:
      for line in f:                    # reads one line at a time
          record = json.loads(line)     # parses one object at a time
          process(record)               # constant memory usage`}</CodeBox>

        <SubTitle>JSON storage cost — the key overhead</SubTitle>

        <Para>
          JSON stores every key name with every record. In a CSV, column names appear
          once in the header. In JSON, the key "order_id" is repeated for every single
          record. For a dataset with 20 fields and 100 million records, this key
          repetition adds hundreds of megabytes of overhead that carries zero information.
        </Para>

        <CodeBox label="JSON key repetition overhead — why JSON is storage-inefficient">{`10 million order records stored as JSON:

Each record:
  {"order_id":9284751,"customer_id":4201938,"city":"Bangalore",
   "amount":380.00,"status":"delivered","created_at":"2026-03-17"}

Key name overhead per record:
  "order_id"    = 10 chars
  "customer_id" = 13 chars
  "city"        = 6 chars
  "amount"      = 8 chars
  "status"      = 8 chars
  "created_at"  = 12 chars
  Total key overhead = 57 chars per record × 10M records
                     = 570 MB of key names carrying zero data

Compared formats for same 10M orders:
  JSON (uncompressed):  ~4.2 GB
  JSON (gzip):          ~0.9 GB
  CSV (uncompressed):   ~1.8 GB
  CSV (gzip):           ~0.4 GB
  Parquet:              ~0.3 GB  ← columnar + compression combined
  
JSON is fine for transfer. It is a poor choice for storage at scale.`}</CodeBox>

        <SubTitle>When to use JSON</SubTitle>
        <Para>
          JSON is the right format for API communication, event streaming payloads,
          configuration files, and the landing zone where raw API responses are
          preserved. Convert JSON to Parquet at the Bronze layer for all analytical
          storage. Never keep large datasets in JSON format in a data lake long-term —
          the storage cost and query performance are both significantly worse than
          Parquet.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — Parquet ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Format Three" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(66,133,244,0.12)', border: '2px solid #4285f4',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#4285f4',
            fontFamily: 'var(--font-mono)',
          }}>PARQUET</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Apache Parquet</h2>
        </div>

        <Para>
          Parquet is the workhorse format of modern data engineering. If you work with
          data lakes — Bronze, Silver, Gold layers — you work with Parquet. It is
          the default storage format for Spark, dbt, Databricks, and every major cloud
          data lake. Understanding Parquet's internals explains why it is so much
          faster and cheaper than CSV or JSON for analytical workloads.
        </Para>

        <SubTitle>Parquet internals — how it achieves its performance</SubTitle>

        <Para>
          Parquet files have a specific internal structure that enables two performance
          optimisations working together: columnar storage and column-level compression
          and statistics. Understanding both explains the performance numbers that
          seem almost impossible.
        </Para>

        <CodeBox label="Parquet file structure — the anatomy of a .parquet file">{`A Parquet file is divided into Row Groups.
Each Row Group contains Column Chunks.
Each Column Chunk is stored consecutively on disk.

FILE STRUCTURE:
┌─────────────────────────────────────────────────┐
│ Magic bytes: PAR1 (marks file as Parquet)       │
├─────────────────────────────────────────────────┤
│ ROW GROUP 1 (e.g., rows 1 – 100,000)            │
│   ├── Column Chunk: order_id                    │
│   │     [9284751, 9284752, 9284753 ...]          │
│   │     Encoding: DELTA_BINARY_PACKED            │
│   │     Compression: SNAPPY                      │
│   │     Min: 9284751  Max: 9384750  Nulls: 0    │
│   ├── Column Chunk: amount                      │
│   │     [380.00, 220.00, 540.00 ...]             │
│   │     Encoding: PLAIN                          │
│   │     Compression: SNAPPY                      │
│   │     Min: 50.00  Max: 4999.00  Nulls: 0      │
│   ├── Column Chunk: city                        │
│   │     [Bangalore, Mumbai, Bangalore ...]       │
│   │     Encoding: RLE_DICTIONARY                 │
│   │     Compression: SNAPPY                      │
│   │     Min: Bangalore  Max: Pune  Nulls: 0     │
│   └── Column Chunk: status                      │
│         [delivered, cancelled, delivered ...]    │
│         Encoding: RLE_DICTIONARY (few values)    │
├─────────────────────────────────────────────────┤
│ ROW GROUP 2 (rows 100,001 – 200,000)            │
│   ...same structure...                          │
├─────────────────────────────────────────────────┤
│ FILE FOOTER (metadata for the entire file)      │
│   Schema definition (column names + types)      │
│   Row group statistics (min/max per column)     │
│   Row group offsets (where each group starts)   │
│ Magic bytes: PAR1                               │
└─────────────────────────────────────────────────┘

The footer contains everything a query engine needs to decide
which row groups to read — without opening them.`}</CodeBox>

        <SubTitle>The two mechanisms that make Parquet fast</SubTitle>

        <Para>
          <strong>Mechanism 1 — Predicate pushdown using statistics.</strong> The footer
          of a Parquet file stores the minimum and maximum value for every column in
          every row group. A query engine reads the footer first — before reading any
          data — and uses this information to skip row groups that cannot possibly
          contain matching rows.
        </Para>

        <CodeBox label="Predicate pushdown — skipping row groups without reading them">{`Query: SELECT SUM(amount) FROM orders WHERE city = 'Bangalore'

Parquet file has 10 row groups (1M rows each = 10M total rows)

Footer statistics for "city" column per row group:
  Row Group 1:  Min=Bangalore, Max=Pune      → MAY contain Bangalore ✓ read
  Row Group 2:  Min=Chennai,   Max=Delhi     → CANNOT contain Bangalore ✗ skip
  Row Group 3:  Min=Ahmedabad, Max=Bangalore → MAY contain Bangalore ✓ read
  Row Group 4:  Min=Delhi,     Max=Hyderabad → CANNOT contain Bangalore ✗ skip
  ...

Result: 6 of 10 row groups are skipped entirely.
        Only 4 million rows are read, not 10 million.
        Query is 60% faster before columnar storage even factors in.

Combined with columnar storage (reading only the amount and city columns):
  Traditional CSV:   Read 10M rows × 5 columns = 50M values
  Parquet:           Read 4M rows × 2 columns  = 8M values
  Effective speedup: ~6× from predicate pushdown × ~2.5× from columnar
                   = ~15× total faster than CSV for this query`}</CodeBox>

        <Para>
          <strong>Mechanism 2 — Encoding and compression per column.</strong> Because
          all values in a column chunk have the same type and often similar values,
          Parquet applies specialised encodings before compression. A column of order
          statuses containing mostly "delivered" with occasional "cancelled" gets
          encoded with Run-Length Encoding (RLE) — instead of storing "delivered"
          800,000 times, it stores "delivered × 800000". Then Snappy compression
          reduces it further. The result: a column that takes 8 MB as plain text
          takes 180 KB as Parquet.
        </Para>

        <CodeBox label="Parquet encoding types — how each column type is compressed">{`ENCODING            WHAT IT DOES                    BEST FOR
────────────────────────────────────────────────────────────────────
PLAIN               Store values as-is              Small columns, floats
                    No encoding transformation       where values vary widely

DICTIONARY          Build a dictionary of unique     String columns with few
                    values, store index numbers       unique values (city, status,
                    instead of repeating strings      category, country code)
                    "Bangalore"→0, "Mumbai"→1
                    [0,1,0,0,1,0] instead of names

RLE (Run-Length     Consecutive repeating values     Boolean columns, sorted
Encoding)           stored as (value, count) pairs    columns, status fields
                    [delivered×847,cancelled×12]

DELTA_BINARY        Store differences between         Auto-increment IDs,
_PACKED             consecutive values               timestamps
                    [9284751, +1, +1, +1, +1]
                    instead of full values

After encoding, SNAPPY or GZIP compression is applied.
Snappy: very fast compress/decompress, moderate ratio (~2-3×)
GZIP:   slower, better ratio (~4-5×) — use for archival storage`}</CodeBox>

        <SubTitle>Parquet schema evolution</SubTitle>

        <Para>
          Parquet supports adding new columns without rewriting existing files. Old
          files simply have NULL values for the new column when read by new readers.
          This makes Parquet compatible with incremental schema changes — an important
          property for long-running data lake tables where adding a column without
          reprocessing all historical data is essential.
        </Para>

        <SubTitle>When to use Parquet</SubTitle>
        <Para>
          Parquet is the default choice for all analytical storage in a data lake —
          Bronze, Silver, and Gold layers. Use it for any dataset that will be
          queried with SQL, processed with Spark, or stored in S3/ADLS for
          analytical purposes. The only reasons not to use Parquet are: you need
          human-readable files (use CSV), you need to stream individual records
          through a message broker (use Avro), or you are working in a Hive/MapReduce
          ecosystem that prefers ORC.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Avro ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Format Four" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#f97316',
            fontFamily: 'var(--font-mono)',
          }}>AVRO</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Apache Avro</h2>
        </div>

        <Para>
          Avro is a row-oriented binary serialisation format designed specifically
          for the Kafka ecosystem and schema evolution. While Parquet dominates
          analytical storage, Avro dominates event streaming and data serialisation
          between services. Understanding the difference in their design goals
          explains why both exist and why neither can replace the other.
        </Para>

        <SubTitle>How Avro works — schema separation</SubTitle>

        <Para>
          Avro separates the schema from the data. The schema — written in JSON —
          defines the structure of every record: field names, types, whether fields
          are nullable, and default values for missing fields. The data is stored
          in a compact binary format that does not repeat field names. To read an
          Avro file, you need the schema. This schema separation is both Avro's
          greatest strength and its primary source of operational complexity.
        </Para>

        <CodeBox label="Avro schema and data — how they work together">{`Avro Schema (written in JSON, stored separately):
{
  "type": "record",
  "name": "Order",
  "namespace": "com.freshmart.data",
  "fields": [
    {"name": "order_id",     "type": "long"},
    {"name": "customer_id",  "type": "long"},
    {"name": "city",         "type": "string"},
    {"name": "amount",       "type": {"type": "bytes", "logicalType": "decimal",
                                      "precision": 10, "scale": 2}},
    {"name": "status",       "type": "string"},
    {"name": "promo_code",   "type": ["null", "string"], "default": null}
  ]
}

Avro binary data (what the file actually stores):
  No field names. Just values in schema-defined order:
  [9284751][4201938][9:Bangalore][380.00][9:delivered][null]
  [9284752][1092847][6:Mumbai]   [220.00][9:cancelled][null]

  Field names are looked up from the schema, not stored with data.
  This makes Avro files smaller than JSON (no key repetition)
  but requires schema availability to read.

Avro file format:
  ┌──────────────────────────────────────────────┐
  │ File header: magic bytes + schema (JSON)     │  ← schema embedded in file
  ├──────────────────────────────────────────────┤
  │ Data block 1                                 │
  │   sync marker (for splittability)            │
  │   encoded records (binary, compressed)       │
  ├──────────────────────────────────────────────┤
  │ Data block 2 ...                             │
  └──────────────────────────────────────────────┘

Unlike Parquet: schema is in the file header, not the footer.
This means you can start streaming from the beginning immediately.`}</CodeBox>

        <SubTitle>Schema evolution — Avro's killer feature</SubTitle>

        <Para>
          Avro's most important feature for data engineering is its formal support for
          schema evolution. When a producer changes the schema of the events it sends
          (adds a new field, removes a field, changes a default value), Avro's schema
          compatibility rules determine whether existing consumers can still read the
          new events without breaking.
        </Para>

        <CodeBox label="Avro schema compatibility rules — what changes are safe">{`SCHEMA COMPATIBILITY RULES:

BACKWARD COMPATIBLE (new schema can read old data):
  ✓ Add a new field with a default value
    Old: {order_id, amount, status}
    New: {order_id, amount, status, delivery_time_mins: default=null}
    Old consumers reading new data: see null for delivery_time_mins ✓

FORWARD COMPATIBLE (old schema can read new data):
  ✓ Remove a field that had a default value
    Old: {order_id, amount, status, promo_code: default=null}
    New: {order_id, amount, status}
    Old consumers reading new data: use default for promo_code ✓

BREAKING CHANGES (never do these without coordination):
  ✗ Rename an existing field
  ✗ Change a field type (string to int)
  ✗ Add a field WITHOUT a default value
  ✗ Remove a field WITHOUT a default value

WHY THIS MATTERS:
  In a Kafka pipeline, 50 microservices may consume from one topic.
  If a producer changes its Avro schema in a non-backward-compatible
  way, all 50 consumers break simultaneously.
  
  Schema Registry (Confluent or AWS Glue Schema Registry) enforces
  compatibility rules automatically — rejects schema changes that
  would break consumers. Every production Kafka + Avro deployment
  must use a Schema Registry.`}</CodeBox>

        <SubTitle>Avro and Kafka — why they are paired</SubTitle>

        <Para>
          Avro and Kafka are the standard pairing for event streaming because Avro
          provides exactly what Kafka needs: compact binary serialisation, schema
          validation, and formal schema evolution semantics. A Kafka topic carries
          millions of events per second — the overhead of JSON key repetition at
          that volume is significant. Avro's compact binary format, combined with
          a Schema Registry that stores schemas centrally, makes Kafka pipelines
          both efficient and schema-safe.
        </Para>

        <SubTitle>When to use Avro</SubTitle>
        <Para>
          Avro is the right choice for Kafka event payloads, data serialisation between
          services, and any pipeline where schema evolution is a primary concern.
          Avro is not the right choice for analytical storage — convert Avro events
          to Parquet when landing them in a data lake Bronze layer. Avro is for
          data in motion; Parquet is for data at rest.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — ORC ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Format Five" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(139,92,246,0.12)', border: '2px solid #8b5cf6',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#8b5cf6',
            fontFamily: 'var(--font-mono)',
          }}>ORC</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Optimised Row Columnar</h2>
        </div>

        <Para>
          ORC is Apache Hive's columnar format — created at the same time as Parquet
          and with very similar goals. ORC is the default format in the Hive ecosystem
          and is heavily used in Amazon EMR, Apache Hive, and legacy Hadoop-based
          data platforms. If you join a company with an older big data stack built
          on Hive, you will work with ORC.
        </Para>

        <SubTitle>ORC vs Parquet — the practical differences</SubTitle>

        <Para>
          ORC and Parquet are genuinely similar — both are columnar, both use
          statistics-based predicate pushdown, both support compression and encoding,
          and both support schema evolution. The differences are in ecosystem support
          and a few technical details.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Parquet', color: '#4285f4' },
            { label: 'ORC', color: '#8b5cf6' },
          ]}
          keys={['dim', 'parquet', 'orc']}
          rows={[
            { dim: 'Origin', parquet: 'Twitter + Cloudera (2013)', orc: 'Hortonworks + Facebook for Hive (2013)' },
            { dim: 'Default in', parquet: 'Spark, Databricks, dbt, Athena, BigQuery, Snowflake', orc: 'Apache Hive, Amazon EMR (Hive mode), Presto (Hive tables)' },
            { dim: 'Compression', parquet: 'Snappy (default), GZIP, ZSTD, LZO', orc: 'ZLIB (default), Snappy, LZO — ORC ZLIB often gives better ratios than Parquet Snappy' },
            { dim: 'Predicate pushdown', parquet: 'Row group level (min/max statistics)', orc: 'Stripe level + row index (more granular, sometimes faster for highly selective filters)' },
            { dim: 'ACID transactions', parquet: 'Via Delta Lake or Iceberg (not native)', orc: 'Native in Hive with ORC — INSERT, UPDATE, DELETE supported in Hive tables' },
            { dim: 'Bloom filters', parquet: 'Supported (opt-in)', orc: 'Supported and widely used' },
            { dim: 'Nested types', parquet: 'Excellent — designed for deeply nested schemas', orc: 'Good — handles nesting but Parquet is more flexible' },
            { dim: 'Best ecosystem', parquet: 'Cloud-native, Spark-first, modern lakehouse', orc: 'Hive, legacy Hadoop, Amazon EMR Hive tables' },
          ]}
        />

        <Callout type="tip">
          <strong>The practical rule for 2026:</strong> if you are building a new data
          pipeline or data lake from scratch, use Parquet. Parquet has broader ecosystem
          support, is the default in every modern tool, and is what the industry is
          converging on. Choose ORC only when you are working in a Hive or legacy
          Hadoop environment where ORC is already the standard, or when your analysis
          shows ORC's compression or predicate pushdown performs better for your
          specific workload.
        </Callout>

        <SubTitle>When to use ORC</SubTitle>
        <Para>
          ORC is the right choice when working with Hive tables, Apache Hive on EMR,
          or any environment where ORC is the established standard. For new projects
          on AWS, Azure, or GCP with Spark or Databricks, Parquet is the default choice.
          The performance difference between ORC and Parquet for most analytical
          workloads is small enough that ecosystem compatibility matters more than
          raw performance.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Format Comparison Table ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Direct Comparison" />
        <SectionTitle>All Five Formats — The Complete Decision Table</SectionTitle>

        <Para>
          Use this table to make the format decision quickly for any new pipeline or storage need.
        </Para>

        <CompareTable
          headers={[
            { label: 'Property' },
            { label: 'CSV', color: '#00e676' },
            { label: 'JSON', color: '#facc15' },
            { label: 'Parquet', color: '#4285f4' },
            { label: 'Avro', color: '#f97316' },
            { label: 'ORC', color: '#8b5cf6' },
          ]}
          keys={['prop', 'csv', 'json', 'parquet', 'avro', 'orc']}
          rows={[
            { prop: 'Storage layout', csv: 'Row', json: 'Row', parquet: 'Columnar', avro: 'Row', orc: 'Columnar' },
            { prop: 'Human readable', csv: '✓ Yes', json: '✓ Yes', parquet: '✗ Binary', avro: '✗ Binary', orc: '✗ Binary' },
            { prop: 'Has schema', csv: 'Informal (header)', json: 'Self-describing', parquet: '✓ Embedded in file', avro: '✓ Embedded + Registry', orc: '✓ Embedded in file' },
            { prop: 'Schema evolution', csv: 'None', json: 'Flexible (no enforcement)', parquet: 'Add columns safely', avro: 'Formal rules + Registry', orc: 'Add columns safely' },
            { prop: 'Supports nesting', csv: '✗ No', json: '✓ Yes (native)', parquet: '✓ Yes', avro: '✓ Yes', orc: '✓ Yes' },
            { prop: 'Compression', csv: 'Low (gzip external)', json: 'Low (gzip external)', parquet: 'Very high (column-level)', avro: 'Medium (block-level)', orc: 'Very high (column-level)' },
            { prop: 'Read speed (analytics)', csv: 'Slow', json: 'Slow', parquet: 'Very fast', avro: 'Slow', orc: 'Very fast' },
            { prop: 'Write speed (streaming)', csv: 'Fast', json: 'Fast', parquet: 'Slow (must buffer)', avro: 'Very fast', orc: 'Slow (must buffer)' },
            { prop: 'Predicate pushdown', csv: '✗ No', json: '✗ No', parquet: '✓ Row group stats', avro: '✗ No', orc: '✓ Stripe + row index' },
            { prop: 'Splittable (Spark)', csv: 'Only with codec', json: 'NDJSON only', parquet: '✓ Row groups', avro: '✓ Data blocks', orc: '✓ Stripes' },
            { prop: 'Best use case', csv: 'Data exchange, exports', json: 'APIs, events, configs', parquet: 'Data lake storage, analytics', avro: 'Kafka streaming, CDC', orc: 'Hive tables, legacy Hadoop' },
            { prop: 'Typical size vs CSV', csv: '1×', json: '1.5–2×', parquet: '0.1–0.3×', avro: '0.5–0.7×', orc: '0.1–0.3×' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 08 — Storage Size Reality ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Storage Cost Reality" />
        <SectionTitle>Real Storage Numbers — What Each Format Actually Costs</SectionTitle>

        <Para>
          These are real-world compression ratios from a 100 million row orders
          dataset representative of what you would see in production. The differences
          are not marginal — they directly translate to cloud storage bills.
        </Para>

        <CodeBox label="100 million order records — storage size by format">{`Dataset: 100M orders, 12 columns
  order_id, customer_id, restaurant_id, city, category,
  amount, quantity, status, payment_method, created_at,
  delivered_at, promo_code (50% null)

FORMAT              UNCOMPRESSED    WITH COMPRESSION    NOTES
────────────────────────────────────────────────────────────────────────
CSV                 ~38 GB          ~9 GB (gzip)        Baseline
JSON (NDJSON)       ~72 GB          ~14 GB (gzip)       Key names repeated
Avro                ~22 GB          ~11 GB (snappy)     Compact binary,
                                                         no key repetition
Parquet             N/A (always     ~4.2 GB (snappy)    Columnar + per-column
                     compressed)    ~2.8 GB (zstd)       encoding + compression
ORC                 N/A             ~3.9 GB (zlib)      Similar to Parquet,
                                    ~3.1 GB (snappy)     slightly different
                                                         compression tradeoffs

COST AT AWS S3 STANDARD PRICING (~$0.023/GB/month):
  CSV (gzip):    9.0 GB × $0.023 = $0.21/month
  JSON (gzip):   14.0 GB × $0.023 = $0.32/month
  Avro (snappy): 11.0 GB × $0.023 = $0.25/month
  Parquet (snappy): 4.2 GB × $0.023 = $0.097/month
  Parquet (zstd):   2.8 GB × $0.023 = $0.064/month

At 1 BILLION rows (10× scale) — annual cost difference:
  CSV:     ~$25/month → $300/year
  Parquet: ~$6.4/month → $77/year

At 100 BILLION rows (100× scale) — annual cost difference:
  CSV:     ~$2,520/year
  Parquet: ~$770/year

Format choice is a cost decision as much as a performance decision.`}</CodeBox>

        <SubTitle>The format decision for each layer in Medallion Architecture</SubTitle>

        <CompareTable
          headers={[
            { label: 'Layer' },
            { label: 'Recommended Format', color: '#00e676' },
            { label: 'Why', color: '#7b61ff' },
          ]}
          keys={['layer', 'format', 'why']}
          rows={[
            {
              layer: 'Landing Zone',
              format: 'Original format (CSV/JSON/Avro as-is)',
              why: 'Preserve exactly what arrived from the source. Do not transform at this stage — just store.',
            },
            {
              layer: 'Bronze',
              format: 'Parquet (partitioned by date)',
              why: 'Convert from landing format to Parquet for efficient storage and query. Add metadata. Partition by date for fast time-range scans.',
            },
            {
              layer: 'Silver',
              format: 'Parquet or Delta Lake (Parquet + transaction log)',
              why: 'Cleaned and structured data. Delta Lake adds ACID transactions, time travel, and safe UPDATE/DELETE for GDPR compliance.',
            },
            {
              layer: 'Gold',
              format: 'Parquet in data lake or native warehouse tables',
              why: 'Aggregated metrics. Load to warehouse (Snowflake/BigQuery) for fast SQL. Keep Parquet copy in lake for backup and Spark access.',
            },
            {
              layer: 'Kafka Topics (streaming)',
              format: 'Avro + Schema Registry',
              why: 'Event streaming requires compact binary with schema evolution guarantees. Avro is the industry standard for Kafka payloads.',
            },
          ]}
        />
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
        <SectionTitle>Migrating a CSV Data Lake to Parquet — A Real Scenario</SectionTitle>

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
            Scenario — E-commerce Company · Cost and Performance Review
          </div>

          <Para>
            You join a 3-year-old e-commerce company as their second data engineer.
            The data lake on S3 contains 3 years of data — all stored as gzip-compressed
            CSV files. Total size: 4.2 TB. Monthly S3 cost: $97. Monthly Athena query
            cost (pay-per-TB-scanned): $840. The analytics team runs 200+ queries per
            day and complains that dashboards refresh in 8–12 minutes.
          </Para>

          <Para>
            Your first investigation: you run the same query against a CSV file and
            a Parquet version you create from a sample. The query scans 2.4 GB of CSV
            in 47 seconds. The same query against Parquet scans 180 MB and finishes
            in 3.2 seconds. 15× faster, 13× less data scanned.
          </Para>

          <Para>
            <strong>The migration plan you propose:</strong> Convert all historical
            CSV files to Parquet, partitioned by date. Run both formats in parallel
            for one month while validating row counts and checksums match. Switch
            all queries to Parquet. Decommission CSV after 90 days.
          </Para>

          <Para>
            <strong>The results after migration:</strong> S3 storage drops from
            4.2 TB to 680 GB — a 6.2× reduction. Monthly S3 cost drops from $97
            to $16. Monthly Athena cost drops from $840 to $62. Dashboard refresh
            time drops from 8–12 minutes to 45–90 seconds. Total annual saving:
            approximately $10,500 in cloud costs. Migration effort: two weeks.
          </Para>

          <Para>
            This is not an unusual outcome. Parquet migrations at companies still
            using CSV in their data lake typically produce 5–10× storage reduction
            and 10–20× query performance improvement. Format choice is one of the
            highest-leverage decisions a data engineer makes.
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
            q: 'Q1. Why is Parquet significantly faster than CSV for analytical queries, even when both are stored on the same hardware?',
            a: `Parquet is faster than CSV for analytics for two reasons that work together multiplicatively.

The first is columnar storage. CSV stores all columns for a row together. When a query needs only two columns from a 20-column table, CSV must read all 20 columns for every row just to extract the two needed. Parquet stores each column separately — only the two queried columns are read from disk. For a 100-million-row table, this reduces I/O by 90%.

The second is predicate pushdown using column statistics. Parquet's file footer stores the minimum and maximum value for every column in every row group (a chunk of ~100,000 rows). Before reading any data, a query engine reads the footer and identifies which row groups cannot possibly contain matching rows. A filter on city = 'Bangalore' can skip entire row groups where min_city > 'Bangalore' or max_city < 'Bangalore', without reading those rows at all.

Combined, these two mechanisms mean a query that reads 50 GB of CSV might read only 300 MB of Parquet — the same query, the same data, the same hardware, 160× less I/O. Less I/O means faster query completion and lower cost in cloud environments that charge per byte scanned.`,
          },
          {
            q: 'Q2. Why would you choose Avro over Parquet for a Kafka pipeline, even though Parquet is generally the better format?',
            a: `This is a question about choosing the right tool for the right job rather than picking an absolute winner.

Parquet is a columnar format optimised for reading many rows of a few columns — analytical queries. Writing Parquet requires buffering a complete row group (typically 100,000–1,000,000 rows) before writing, because the columnar layout requires all values for a column to be stored together. This batching is incompatible with streaming — you cannot write a Kafka event to Parquet as it arrives without buffering thousands of events first.

Avro is a row-oriented binary format that writes individual records immediately, one at a time, with no buffering requirement. Each event arriving in Kafka is serialised to Avro and sent — the latency added by serialisation is microseconds. This matches the real-time nature of event streaming.

Additionally, Avro has formal schema evolution semantics with a Schema Registry, which solves the practical problem of multiple producer and consumer teams changing their schemas at different times without coordinating every deployment.

The typical pattern in production: events flow through Kafka as Avro, Kafka consumers read them and write to a data lake landing zone as NDJSON or Avro files, and a batch pipeline converts those files to Parquet for the Bronze layer. Avro handles the streaming; Parquet handles the storage.`,
          },
          {
            q: 'Q3. What is schema evolution and why does it matter for a long-running data pipeline?',
            a: `Schema evolution is the ability of a data format to handle changes to the structure of data — adding, removing, or modifying fields — without requiring all existing data to be rewritten or all existing consumers to update simultaneously.

In a real data pipeline, schema changes are inevitable. A development team adds a new field to their API response. A business requirement changes and a new column is needed. A field that was always required is now optional. These changes happen continuously over a multi-year pipeline lifetime.

Without schema evolution support, every schema change requires a migration — rewrite all existing data in the new format and update all consumers simultaneously. This is expensive, risky, and often requires coordinated downtime across multiple teams.

With schema evolution support, the handling depends on the format. Parquet allows adding new columns — old files that lack the new column return NULL when read by new code expecting the column. Avro allows adding fields with default values, removing fields with defaults, and widening types — governed by compatibility rules enforced by a Schema Registry.

For a long-running pipeline that has processed 3 years of historical data, schema evolution determines whether a new business requirement means "add a column in dbt and new records have the value automatically" or "reprocess 3 years of data at significant cost and time." Getting format choice and schema evolution strategy right at the start of a pipeline avoids enormously expensive rewrites later.`,
          },
          {
            q: 'Q4. A CSV file from a vendor is causing your pipeline to fail intermittently. What are the five most likely causes you would check first?',
            a: `CSV's lack of enforcement makes it the most common source of intermittent pipeline failures when the data comes from an external vendor you do not control.

The first thing I check is the row count and column count. A row with more or fewer columns than the header causes most CSV parsers to either crash or silently produce NULLs depending on configuration. I run a quick check: count the delimiters per line and flag rows that differ from the header count.

The second is null representation. The vendor may use different null indicators on different days or in different fields — empty string, N/A, NULL, -1, 0, or the literal word "null". My parser's null value configuration must cover all of them. I scan the file for any non-numeric values in numeric columns.

The third is encoding. If the vendor changes their export system, the encoding can silently change from UTF-8 to latin-1. Files with accented characters, special currency symbols like ₹, or regional language content will parse incorrectly or crash with UnicodeDecodeError. I read the first 100 bytes with chardet to detect the encoding before passing to the parser.

The fourth is line endings. Windows systems produce \r\n; Unix produces \n. Some CSV parsers handle both; others do not. A vendor who changes their export system from Windows to Linux (or vice versa) silently changes the line ending. I add universal newline mode to my reader.

The fifth is the header row. Some vendors include the header row in some exports but not others, or include a metadata row above the header that describes the extract date. I validate that the first row exactly matches the expected column names before processing the rest of the file.`,
          },
          {
            q: 'Q5. Your data lake has 5 years of historical data stored as CSV. A new analyst joins and complains that her queries take 20 minutes. What is the root cause and what is your solution?',
            a: `The root cause is a combination of the row-oriented CSV format requiring full file scans for analytical queries, and the lack of partitioning meaning every query scans all 5 years of data regardless of the date range it needs.

Analytical queries are almost always either column-selective (read 3 of 20 columns) or time-selective (read last 30 days of 5 years) or both. CSV supports neither optimisation — it must scan all columns for all rows in all files every time.

My solution has three components, in priority order.

First, convert all historical CSV files to Parquet with Hive-style date partitioning. This is the highest-leverage single change. A query that previously scanned 4 TB of CSV files will now scan 300 GB of Parquet files (columnar) and, if it has a date filter, as little as 8 GB (partitioning). I would target a 10–20× query speedup from this change alone.

Second, add partitioning properly. Files should be stored at paths like s3://bucket/orders/date=2026-03-17/ so that query engines like Athena and Spark can skip entire date partitions based on WHERE clauses. Without partitioning, even Parquet files require scanning everything.

Third, for the most frequently run queries, create materialised aggregate tables in the Gold layer — pre-computed summaries at daily or weekly grain that analysts can query in seconds rather than scanning raw records. If the analyst runs the same revenue-by-city query every morning, that should be a pre-computed Gold table that refreshes nightly, not a live query over 5 years of raw data.

I would present this to the analyst as a two-week migration project with measurable before-and-after benchmarks to demonstrate the improvement.`,
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
            error: `Spark AnalysisException: Unable to infer schema for Parquet. It must be specified manually.`,
            cause: 'Spark is trying to read a Parquet directory that either contains no .parquet files (the path is wrong or the upstream pipeline did not write anything), or contains Parquet files with conflicting schemas written by different pipeline versions. Spark cannot reconcile the schemas automatically in this case.',
            fix: 'Verify the S3/ADLS path contains actual .parquet files: aws s3 ls s3://bucket/path/ --recursive | grep .parquet. If files exist but have schema conflicts, use spark.read.option("mergeSchema", "true").parquet("path") to merge compatible schemas. If schemas are incompatible, identify when the schema changed, separate old and new files into different directories, and read them separately before unioning with a common schema.',
          },
          {
            error: `ConfluentSchemaRegistryException: Schema being registered is incompatible with an earlier schema for subject "orders-value"`,
            cause: 'A Kafka producer is attempting to register a new Avro schema that violates the backward compatibility rules configured for that topic in the Schema Registry. This typically happens when a developer removes a field without a default value, renames a field, or changes a field\'s type — all of which are breaking changes for existing consumers.',
            fix: 'The Schema Registry is doing its job — preventing a breaking change from reaching production consumers. Do not bypass it. Review the schema diff: which field changed? If a field was removed, add a default value to it first and deploy, then remove it in a second schema version. If a field type changed, add a new field with the new type alongside the old field, migrate consumers to use the new field, then remove the old field. Always evolve schemas additively.',
          },
          {
            error: `Athena query scanned 4.2 TB and cost $20.48 for a query that should only need last 7 days of data`,
            cause: 'The Parquet files in S3 are not partitioned by date, so Athena has no way to skip historical data. Even though the query has WHERE created_date >= CURRENT_DATE - 7, Athena must scan all files to find matching rows because there are no partition directories to prune. This is the classic "partition pruning not working" problem.',
            fix: 'Repartition the data using Hive-style date partitioning: store files at s3://bucket/orders/date=2026-03-17/ instead of s3://bucket/orders/. Recreate the Athena table with PARTITIONED BY (date STRING) and run MSCK REPAIR TABLE to discover existing partitions. For new data, the pipeline must write to the correct partition path. Verify partition pruning is working by checking the "Data scanned" metric in the Athena console — it should drop dramatically for date-filtered queries.',
          },
          {
            error: `ORC file: java.io.IOException: Malformed ORC file footer. Cannot read file.`,
            cause: 'An ORC file is corrupt — the file was partially written when the writing process was interrupted (cluster failure, spot instance termination, out-of-disk error during write). Unlike row formats where partial files might be parseable, ORC stores its index and statistics in a footer written at the end. A file that did not finish writing has no footer and cannot be read.',
            fix: 'Delete the corrupt file and re-run the pipeline step that wrote it. To prevent this: always write ORC/Parquet files to a temporary path first, then rename (move) to the final path atomically once writing is complete. Object stores like S3 support atomic PUT operations — write to a temp key then copy to the final key. This ensures readers never see a partially-written file.',
          },
          {
            error: `Parquet file has 47 columns but dbt model expects 52 — 5 columns return NULL for all rows after pipeline upgrade`,
            cause: 'A pipeline was upgraded and the new version writes Parquet files with a different schema than the old version. Old Parquet files have 47 columns. New files have 52. When Spark or Athena reads a mix of old and new files (common during a rolling migration), records from old files return NULL for the 5 new columns that did not exist when they were written.',
            fix: 'This is Parquet schema evolution working as designed — NULL for missing columns in older files is correct behaviour. For the dbt model: use COALESCE(new_column, default_value) where NULLs from old files should be handled with a default. Update the pipeline documentation to note the schema change date. If NULLs from old files are unacceptable, backfill: reprocess old Parquet files through the new pipeline logic to write them with the new schema. This is expensive but produces a clean uniform schema across all historical data.',
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
        'The single most important format decision is row-oriented vs columnar. CSV, JSON, and Avro are row-oriented — fast for writing individual records. Parquet and ORC are columnar — fast for reading specific columns across millions of rows. Analytical queries need columnar. Streaming needs row-oriented.',
        'Parquet achieves its performance through two mechanisms working together: columnar storage (read only the columns a query needs) and predicate pushdown using row group statistics (skip entire chunks of rows that cannot match the filter). Combined, these can reduce I/O by 95%+ versus CSV for typical analytical queries.',
        'CSV is for data exchange between systems, not for data lake storage. Convert CSV to Parquet at the Bronze layer. Keeping CSV in a data lake for analytical use is expensive in storage, slow in query performance, and produces high cloud query costs.',
        'JSON is for APIs, events, and configs — not for data lake storage at scale. The key repetition overhead makes JSON 3–5× larger than equivalent Parquet. Convert JSON to Parquet when landing in the Bronze layer. Store as NDJSON (one record per line) in the landing zone to enable streaming reads.',
        'Avro is the right choice for Kafka event streaming because it writes individual records immediately without buffering, has a compact binary format, and has formal schema evolution semantics enforced by a Schema Registry. Never use Parquet for Kafka payloads — it requires buffering thousands of records before writing.',
        'ORC and Parquet have very similar performance. Choose Parquet for new cloud-native projects — it has broader ecosystem support (Spark, Databricks, dbt, Athena, BigQuery, Snowflake). Use ORC when working in Hive or legacy Hadoop environments where ORC is already the standard.',
        'Parquet schema evolution works by adding columns — old files without the new column return NULL when read by new readers. This is correct and expected behaviour. Design your transformations to handle NULLs from old files using COALESCE with appropriate defaults.',
        'Avro schema evolution requires a Schema Registry in Kafka pipelines. Backward-compatible changes (adding fields with defaults) are safe. Breaking changes (removing required fields, renaming, changing types) are rejected by the Registry. This enforcement is the Registry\'s primary value.',
        'Partitioning is as important as format choice for query performance. A Parquet file without date partitioning requires scanning all years of data for a last-7-days query. With date partitioning (files stored at date=2026-03-17/ paths), only the relevant date directories are scanned. Always partition by the most common filter column.',
        'Format choice is a cost decision. At 100 million rows, CSV costs 3× more in S3 storage than Parquet. At 10 billion rows, the annual cost difference between CSV and Parquet can exceed $10,000. Format migrations at companies still using CSV in their data lakes typically produce 5–10× storage reduction and pay back migration effort in weeks.',
      ]} />

    </LearnLayout>
  )
}