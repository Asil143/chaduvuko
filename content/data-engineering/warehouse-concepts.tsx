import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Warehouse Concepts — Data Engineering | Chaduvuko',
  description:
    'How a data warehouse works internally — columnar storage, query execution, result caching, virtual warehouses, cluster keys, distribution keys, and the concepts that explain why Snowflake queries are fast.',
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

export default function WarehouseConceptsModule() {
  return (
    <LearnLayout
      title="Data Warehouse Concepts"
      description="Columnar storage, query execution, result caching, virtual warehouses, cluster keys, and why Snowflake queries are fast."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Internal Concepts Matter ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why the Internals Matter" />
        <SectionTitle>Understanding the Warehouse From the Inside</SectionTitle>

        <Para>
          Most data engineers write SQL against Snowflake or BigQuery without
          understanding how those systems actually execute the query. This gap
          produces pipelines with unexplained performance problems, unnecessarily
          expensive queries, and architectural decisions that make no sense once
          you understand the internals.
        </Para>

        <Para>
          This module covers the concepts that explain warehouse behaviour:
          why columnar storage makes analytical queries fast, how a virtual
          warehouse scales, what micro-partition pruning and result caching actually
          do, why distribution keys matter in Redshift, and how to read a query
          plan to find the bottleneck. These are the concepts that turn a data
          engineer who writes SQL into one who understands what the warehouse
          is doing with it.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Eight concepts this module covers
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Columnar storage', desc: 'Why columns, not rows — the physical layout that makes analytical queries 100× faster.' },
              { num: '02', name: 'Compression in columns', desc: 'Run-length encoding, dictionary encoding, delta encoding per column type.' },
              { num: '03', name: 'Predicate pushdown', desc: 'How the engine skips reading data before loading it into memory.' },
              { num: '04', name: 'Snowflake micro-partitions', desc: 'How Snowflake organises storage and prunes with metadata-only scans.' },
              { num: '05', name: 'Virtual warehouses', desc: 'What they are, how they scale, and when to size up vs scale out.' },
              { num: '06', name: 'Result and metadata caching', desc: 'Why repeat queries return instantly and what invalidates the cache.' },
              { num: '07', name: 'Cluster keys and Z-ORDER', desc: 'Controlling data co-location for better pruning on high-cardinality columns.' },
              { num: '08', name: 'Query planning', desc: 'Reading EXPLAIN output, identifying bottlenecks, and fixing them.' },
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

      {/* ── Part 02 — Columnar Storage ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Columnar Storage" />
        <SectionTitle>Columnar Storage — The Physical Layout That Makes Analytics Fast</SectionTitle>

        <Para>
          The single biggest reason modern analytical databases are fast for
          analytical workloads is columnar storage. Every analytical query that
          reads 3 columns out of a 200-column table benefits enormously from
          storing data by column rather than by row. Understanding why requires
          understanding how data is physically laid out on disk and what the
          CPU and I/O costs of reading it are.
        </Para>

        <SubTitle>Row storage vs column storage — the physical difference</SubTitle>

        <CodeBox label="Row vs column storage — physical layout and query performance">{`SAMPLE DATA (orders table, 5 rows, 6 columns):
  order_id  customer_id  store_id  amount   status     created_at
  ─────────────────────────────────────────────────────────────────
  9284751   4201938      ST001     380.00   delivered  2026-03-17
  9284752   4201939      ST002     245.00   cancelled  2026-03-17
  9284753   4201940      ST001     890.00   delivered  2026-03-17
  9284754   4201941      ST003     125.00   placed     2026-03-17
  9284755   4201938      ST001     460.00   confirmed  2026-03-17

ROW STORAGE (PostgreSQL, MySQL, OLTP databases):
  Disk layout — all columns of one row stored together:
  [9284751][4201938][ST001][380.00][delivered][2026-03-17]
  [9284752][4201939][ST002][245.00][cancelled][2026-03-17]
  [9284753][4201940][ST001][890.00][delivered][2026-03-17]
  ...

  QUERY: SELECT SUM(amount) FROM orders WHERE status = 'delivered'
  Must READ all 6 columns for all 5 rows to compute sum of 1 column.
  For 500M rows × 6 columns × 8 bytes avg = 24 GB read from disk.
  Most data read is thrown away (5 columns not needed, 2 rows not matching).

COLUMN STORAGE (Snowflake, BigQuery, Redshift, Parquet):
  Disk layout — all values of one column stored together:
  amount column:    [380.00][245.00][890.00][125.00][460.00]
  status column:    [delivered][cancelled][delivered][placed][confirmed]
  customer_id col:  [4201938][4201939][4201940][4201941][4201938]
  ...

  QUERY: SELECT SUM(amount) FROM orders WHERE status = 'delivered'
  Step 1: Read status column → find rows 1, 3 (delivered)
  Step 2: Read amount column → only rows 1, 3: [380.00][890.00]
  Step 3: Compute SUM = 1270.00
  For 500M rows × 2 columns × 8 bytes avg = 8 GB read (vs 24 GB)
  → 3× less I/O for a 1-of-6-column query

  MORE DRAMATIC EXAMPLE:
  Table has 200 columns. Query uses 3 columns.
  Row storage:    reads all 200 columns = 1.6 TB
  Column storage: reads 3 columns       = 24 GB
  → 66× less I/O

WHY COLUMN STORAGE ALSO COMPRESSES BETTER:
  Columns store the same data type repeatedly.
  status column:  [delivered][delivered][delivered][cancelled][cancelled]
  Adjacent same values → run-length encoding compresses 5 values to 2.
  Row storage: [delivered, 380.00, ST001] — mixed types, poor compression.
  Column storage: all amounts together, all statuses together — high compression.

  Real compression ratios on typical analytical data:
  Row storage (PostgreSQL): 1.5-2× compression
  Column storage (Parquet/Snowflake): 5-15× compression
  → 5-10× less storage = 5-10× cheaper on S3/Snowflake`}</CodeBox>

        <SubTitle>Compression encoding per column type</SubTitle>

        <CodeBox label="Column compression encodings — how each type compresses">{`COMPRESSION ENCODING TYPES — chosen automatically by the warehouse:

RUN-LENGTH ENCODING (RLE):
  Best for: low-cardinality columns with runs of identical values
  Example: status column sorted by status:
    CANCELLED × 8,432,  CONFIRMED × 12,847,  DELIVERED × 319,284
  Storage: [("CANCELLED", 8432), ("CONFIRMED", 12847), ("DELIVERED", 319284)]
  Instead of storing 340,563 individual strings → store 3 pairs
  Compression ratio: 100,000:1 for very low cardinality sorted data

DICTIONARY ENCODING:
  Best for: categorical columns with moderate cardinality
  Example: status has 5 distinct values out of 500M rows
  Dictionary: {0: 'placed', 1: 'confirmed', 2: 'delivered', 3: 'cancelled', 4: 'refunded'}
  Column stored as: [2, 0, 1, 3, 2, 2, ...]   (1-byte integers not strings)
  vs storing 'delivered' × 500M = 4.5 GB
  → Stored as: 500M × 1 byte = 500 MB   (9× compression)
  Queries on status column compare integers, not strings → faster

DELTA ENCODING:
  Best for: monotonically increasing numeric columns (IDs, timestamps)
  Example: order_id column:
    [9284751, 9284752, 9284753, 9284754, 9284755]
  Instead of: store each 8-byte integer
  Delta encode: [9284751, +1, +1, +1, +1]
  The base + small deltas compress further with RLE
  Created_at timestamps: store base + deltas in seconds (small ints)

BIT PACKING:
  Best for: small integer columns
  order_hour (0-23): requires only 5 bits, not 32/64 bits
  is_promo (0 or 1): 1 bit

SNOWFLAKE AUTOMATIC ENCODING:
  Snowflake selects optimal encoding per column automatically.
  No manual configuration needed.
  During COPY INTO / INSERT: Snowflake samples data to determine encoding.
  You can view the chosen encoding:
    SELECT column_name, data_type, compression
    FROM information_schema.columns
    WHERE table_name = 'ORDERS';

PRACTICAL IMPLICATION FOR DATA ENGINEERS:
  Choose data types correctly — they determine compression effectiveness.
  VARCHAR(100) for a status with 5 short values: poor compression signal.
  VARCHAR(20) for status: tells the warehouse the values are short.
  Numeric types for amounts (not VARCHAR): enables numeric encoding.
  TIMESTAMPTZ for timestamps: enables delta encoding.
  BOOLEAN for flags: bit packing.
  Never store numbers as strings — loses all numeric compression and
  query-time numeric comparison performance.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Snowflake Internals ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Snowflake Internals" />
        <SectionTitle>Snowflake Internals — Micro-Partitions, Pruning, and Caching</SectionTitle>

        <Para>
          Snowflake is the most widely used cloud data warehouse in 2026. Its
          architecture differs fundamentally from traditional warehouses —
          understanding its three-layer design (storage, query processing,
          cloud services) explains both why it is fast and where it can be slow.
        </Para>

        <SubTitle>Snowflake's three-layer architecture</SubTitle>

        <CodeBox label="Snowflake architecture — three layers and what each does">{`SNOWFLAKE THREE-LAYER ARCHITECTURE:

LAYER 1: CLOUD SERVICES LAYER (always running)
  ─────────────────────────────────────────────────────────────────────
  • Query parser and optimizer
  • Metadata repository (table stats, partition info, access control)
  • Transaction management
  • Result cache (query results stored here, not in compute)
  • Runs 24/7 — always available even when warehouses are suspended
  • No per-query cost — included in Snowflake's base fee
  • Single global metadata store for all virtual warehouses

LAYER 2: QUERY PROCESSING LAYER (virtual warehouses)
  ─────────────────────────────────────────────────────────────────────
  • Virtual warehouse: a cluster of EC2 nodes (Snowflake manages them)
  • Each warehouse is independent — no resource sharing between warehouses
  • Local SSD disk cache (data reads from S3 are cached here)
  • Scales up (larger node type) or out (multi-cluster) independently
  • Auto-suspend after idle time (no compute cost when idle)
  • Auto-resume on query (takes 1-5 seconds)

LAYER 3: STORAGE LAYER (micro-partitions on S3)
  ─────────────────────────────────────────────────────────────────────
  • All table data stored as encrypted Parquet files in Snowflake-managed S3
  • Organised into micro-partitions (50-500 MB compressed)
  • Each micro-partition has column-level metadata (min, max, count, null%)
  • Metadata stored in cloud services layer — never requires data read
  • Immutable: new writes create new micro-partitions, old ones marked deleted

QUERY EXECUTION PATH:
  1. Query submitted → Cloud Services parses and optimises
  2. Cloud Services checks RESULT CACHE
     → If cache hit: return cached result instantly (no warehouse needed)
  3. Cloud Services evaluates METADATA to prune micro-partitions
     → "WHERE date = '2026-03-17'" — prune all partitions without March 17
  4. Virtual warehouse reads only surviving micro-partitions from S3
     → SSD cache hit: data already on local disk from previous query
     → S3 read: fetch from storage (slower)
  5. Warehouse executes operators (filter, join, aggregate)
  6. Result returned, written to result cache

COST BREAKDOWN:
  Idle warehouse (auto-suspended): $0/hour compute
  Active warehouse: $2-$16/credit × warehouse credits/hour
  Storage: ~$40/TB/month (compressed)
  Cloud services queries (metadata only): included in storage cost`}</CodeBox>

        <SubTitle>Micro-partitions — Snowflake's storage unit</SubTitle>

        <CodeBox label="Micro-partitions — how Snowflake stores and prunes data">{`MICRO-PARTITION PROPERTIES:
  Size:         50–500 MB compressed (16–512 MB uncompressed)
  Organisation: data written to micro-partitions in arrival order
                (not sorted unless CLUSTER BY is configured)
  Metadata:     each micro-partition has column-level statistics:
                  - min value per column
                  - max value per column
                  - null count per column
                  - distinct count (approximate) per column

MICRO-PARTITION PRUNING:
  When a query has a WHERE clause, Snowflake compares it to micro-partition
  metadata BEFORE reading any data. Partitions that cannot contain matching
  rows are skipped entirely.

  Example: SELECT * FROM orders WHERE order_date = '2026-03-17'
  Micro-partition A: min_order_date=2026-03-15, max_order_date=2026-03-16
    → PRUNE: max is before 2026-03-17, cannot contain matching rows
  Micro-partition B: min_order_date=2026-03-16, max_order_date=2026-03-18
    → KEEP: range includes 2026-03-17
  Micro-partition C: min_order_date=2026-03-18, max_order_date=2026-03-20
    → PRUNE: min is after 2026-03-17

  If 99% of micro-partitions are pruned: 1% of data read — dramatic speedup.
  If data is randomly distributed: no pruning possible, full scan.

WHEN PRUNING WORKS WELL:
  ✓ Querying by order_date when data was loaded daily (natural ordering)
  ✓ Querying recent data when recent = last rows loaded
  ✓ Range filters on monotonically increasing columns (IDs, timestamps)

WHEN PRUNING DOES NOT WORK:
  ✗ Querying by customer_id (random ordering — no correlation with load order)
  ✗ Querying by status (random distribution across all partitions)
  ✗ Applying functions to columns: WHERE YEAR(order_date) = 2026
    → Snowflake cannot use date metadata for YEAR() function
    → Use: WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01'

CHECKING PRUNING EFFECTIVENESS:
  After running a query, check the query profile in Snowflake UI:
  "Partitions scanned" vs "Partitions total"
  Good: 100 of 10,000 partitions scanned (1%)
  Bad:  9,800 of 10,000 partitions scanned (98%) → consider CLUSTER BY`}</CodeBox>

        <SubTitle>Cluster keys — forcing good pruning on any column</SubTitle>

        <CodeBox label="CLUSTER BY — controlling micro-partition organisation">{`PROBLEM: orders table loaded daily, 500M rows, 10,000 micro-partitions
  natural order = order in which rows arrived (mostly date-ordered by luck)
  Queries by order_date: good pruning (data is mostly date-ordered)
  Queries by store_id: poor pruning (stores randomly distributed)

  Query: SELECT * FROM orders WHERE store_id = 'ST001'
  Without CLUSTER BY:
    ST001 rows spread randomly across all 10,000 partitions
    Snowflake must scan all 10,000 partitions
    Partitions scanned: 10,000 of 10,000 (100%) — full table scan

SOLUTION: ALTER TABLE silver.orders CLUSTER BY (store_id, order_date);
  Snowflake runs a background reclustering process:
    Reads existing micro-partitions
    Re-sorts data by (store_id, order_date)
    Writes new micro-partitions where each contains similar store_id values
  After reclustering:
    ST001 rows co-located in same micro-partitions
    Partitions scanned for store_id='ST001': ~100 of 10,000 (1%)

CLUSTER KEY SELECTION RULES:
  ✓ Columns most frequently used in WHERE clauses
  ✓ High-cardinality columns where equality or range queries are common
  ✓ Typically: (most_common_filter, second_most_common_filter)
  ✓ For event tables: (tenant_id, event_date) or (store_id, order_date)

  ✗ Don't cluster by a timestamp to microsecond precision (too many distinct values)
  ✗ Don't cluster by a boolean (only 2 values — poor co-location)
  ✗ Don't cluster small tables (< 1 TB) — overhead exceeds benefit

CLUSTER KEY COST:
  Reclustering is a background compute operation — has a cost.
  Monitor via: SELECT * FROM snowflake.account_usage.automatic_clustering_history;
  For high-write tables: disable automatic clustering, run manual clustering
  during maintenance windows to control cost:
  ALTER TABLE silver.orders SUSPEND RECLUSTER;
  -- Trigger manually:
  ALTER TABLE silver.orders RESUME RECLUSTER;

CHECKING CLUSTER DEPTH:
  SELECT SYSTEM\$CLUSTERING_INFORMATION('silver.orders', '(store_id, order_date)');
  Returns: average_depth (lower = better co-location, 1.0 = perfect)
  Good: average_depth < 2
  Needs reclustering: average_depth > 5`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Caching Layers ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Caching" />
        <SectionTitle>Caching Layers — Why Some Queries Are Instantaneous</SectionTitle>

        <Para>
          Snowflake has three distinct caching layers, each with different
          scope and lifetime. Understanding them explains why some queries
          return in milliseconds and others take minutes — and why the same
          query run twice in quick succession may have wildly different
          execution times.
        </Para>

        <CodeBox label="Snowflake's three caching layers — what each caches and for how long">{`CACHE LAYER 1: RESULT CACHE (cloud services layer)
  ─────────────────────────────────────────────────────────────────────
  What:     The complete result set of a query
  Where:    Cloud services layer (not in the virtual warehouse)
  Duration: 24 hours (reset to 24h on each access of the same result)
  Scope:    Per user per query — exact SQL match required
  Cost:     Zero compute — result cache queries do not use a warehouse

  WHEN RESULT CACHE HITS:
    - Same exact SQL text (including whitespace and case)
    - Same session parameters
    - Underlying data has NOT changed since the result was cached
    - User has the same access permissions

  INVALIDATION:
    - Data in any referenced table changes (DML or new micro-partitions)
    - 24-hour expiry without access
    - Table structure changes (ALTER TABLE)

  CHECKING IF RESULT CACHE WAS USED:
    In query history: look for "result cache" in execution details
    Or: SELECT query_type, total_elapsed_time, result_from_cache
        FROM snowflake.account_usage.query_history
        WHERE query_text ILIKE '%SELECT%' LIMIT 20;

  PRACTICAL IMPACT:
    Daily analytics queries that run the same SELECT at 8 AM and 9 AM:
    8 AM run: 45 seconds (full execution)
    9 AM run: < 1 second (result cache hit) — if no new data was loaded
    If Silver pipeline ran at 8:30 AM: 9 AM run = 45 seconds (cache invalidated)

CACHE LAYER 2: LOCAL DISK CACHE (virtual warehouse)
  ─────────────────────────────────────────────────────────────────────
  What:     Raw micro-partition data read from S3
  Where:    SSD disk on virtual warehouse nodes
  Duration: Until the warehouse is suspended (cache evicted on suspend)
  Scope:    Per virtual warehouse (all users on same warehouse benefit)

  HOW IT WORKS:
    First query reads micro-partitions from S3 → stores on local SSD
    Subsequent queries needing same partitions: reads from SSD (10× faster)
    Cache is managed with LRU (least recently used) eviction

  IMPLICATION: do not suspend-and-resume too aggressively
    Auto-suspend after 10 minutes: cache lost every 10 minutes
    Cold queries take longer after resume (S3 reads, not SSD reads)
    Balance: suspend when genuinely idle, but not after every single query

CACHE LAYER 3: METADATA CACHE (cloud services layer)
  ─────────────────────────────────────────────────────────────────────
  What:     Table statistics and micro-partition metadata
  Where:    Cloud services layer (persistent)
  Duration: Always maintained — updated on every write
  Cost:     Included in storage fees

  WHAT IT ENABLES:
    SHOW TABLES, COUNT(*), MAX(id): answered from metadata alone
    No warehouse needed for:
      SELECT COUNT(*) FROM large_table  → returns instantly from metadata
      SELECT MAX(updated_at) FROM silver.orders  → metadata-only query
    These queries appear in query history with result_from_cache=TRUE
    and total_elapsed_time < 100ms regardless of table size

ARCHITECT YOUR QUERIES AROUND CACHING:
  BI tool scheduled refreshes: refresh at fixed intervals AFTER pipeline runs
    not before — otherwise analysts get cached stale results
  Warm-up queries: some teams run a "warm-up" script after each pipeline run
    to pre-populate the disk cache for common dashboard queries
  Avoid cache busting: parameterised queries with user-specific WHERE clauses
    never hit the result cache — each user's variation is a different SQL text`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Virtual Warehouses ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Virtual Warehouses" />
        <SectionTitle>Virtual Warehouses — Sizing, Scaling, and Cost Control</SectionTitle>

        <Para>
          A virtual warehouse is Snowflake's unit of compute — a named cluster
          of CPU and memory that executes queries. Getting virtual warehouse
          configuration wrong is the most common cause of both performance
          problems and unexpectedly high Snowflake bills.
        </Para>

        <SubTitle>Warehouse sizes and what they mean</SubTitle>

        <CodeBox label="Virtual warehouse sizes — credits, nodes, and when to size up">{`SNOWFLAKE WAREHOUSE SIZES:
  Size      Credits/Hour  Nodes  Local Cache  Best for
  ─────────────────────────────────────────────────────────────────────
  X-Small   1             1      ~70 GB       Light queries, small tables, dev
  Small     2             2      ~140 GB      Moderate queries, staging
  Medium    4             4      ~280 GB      dbt production runs, typical analytics
  Large     8             8      ~560 GB      Large dbt jobs, complex SQL
  X-Large   16            16     ~1.1 TB      Very large joins, ML feature extraction
  2X-Large  32            32     ~2.2 TB      Batch processing, largest datasets
  3X-Large  64            64     ~4.4 TB      Extreme scale (rare — very expensive)
  4X-Large  128           128    ~8.8 TB      Almost never needed

  Credit cost (US East, 2026 approximate): $2–$4/credit/hour depending on plan
  X-Small running 1 hour: 1 credit × $2 = $2
  2X-Large running 1 hour: 32 credits × $2 = $64

SCALE UP (larger warehouse): single-query performance
  A complex dbt model that spills to disk on Medium: run it on Large
  A join between two 10B-row tables: needs X-Large to fit in memory
  Useful for: single-job batch transformations, ML feature computation

SCALE OUT (multi-cluster warehouse): concurrency
  Multiple small clusters serving many users simultaneously
  Each cluster gets its own set of nodes
  Incoming queries routed to least-busy cluster
  Useful for: analyst-heavy workloads, BI tool dashboard loads

  ALTER WAREHOUSE ANALYTICS_WH SET
      MIN_CLUSTER_COUNT = 1
      MAX_CLUSTER_COUNT = 5
      SCALING_POLICY = 'ECONOMY';  -- or 'STANDARD'
  ECONOMY: scale out only when existing clusters are fully loaded
  STANDARD: scale out proactively when queue starts building

AUTO-SUSPEND AND AUTO-RESUME:
  Auto-suspend: warehouse turns off after N minutes idle (no compute cost)
  Auto-resume: first query after suspend wakes the warehouse (1-5 second delay)

  RECOMMENDED SETTINGS BY WAREHOUSE PURPOSE:
    dbt transformation warehouse:  AUTO_SUSPEND = 300  (5 min)
    Analyst self-service:          AUTO_SUSPEND = 600  (10 min, keep warm for users)
    Dashboard service account:     AUTO_SUSPEND = 60   (1 min, cache warms fast)
    ML training warehouse:         AUTO_SUSPEND = 60   (rare large jobs)
    Dev/test warehouse:            AUTO_SUSPEND = 60   (minimise idle cost)

WAREHOUSE SIZING DECISION PROCESS:
  1. Run the query on Medium first
  2. Check query profile: is it spilling to disk?
     → Yes: memory is insufficient → size up to Large or X-Large
  3. Check partitions scanned: is it scanning all partitions?
     → Yes: cluster keys or query filter issue — sizing up won't help
  4. Check bytes scanned per second: is CPU the bottleneck?
     → Yes, and no spill: more nodes (scale out) may help for parallelism
  5. Check queue time: are queries waiting for the warehouse?
     → Yes: scale out (multi-cluster) or separate workloads into dedicated warehouses`}</CodeBox>

        <SubTitle>Warehouse isolation — separating workloads</SubTitle>

        <CodeBox label="Warehouse architecture — isolating workloads for performance and cost">{`# ANTI-PATTERN: one warehouse for everything
# All users, all pipelines, all dashboards share one COMPUTE_WH
# dbt job runs 30-minute transformation → blocks analyst queries for 30 min
# Analyst runs expensive ad-hoc query → slows down dashboard for 5 min
# Result: unpredictable performance, no cost attribution, no isolation

# CORRECT PATTERN: dedicated warehouses per workload type
# Each has independent sizing, auto-suspend, and scaling policy

-- Create warehouses for different workload types:
CREATE WAREHOUSE dbt_pipeline_wh
    WAREHOUSE_SIZE = 'MEDIUM'
    AUTO_SUSPEND = 300
    AUTO_RESUME = TRUE
    COMMENT = 'dbt production pipeline runs — pipelines use this';

CREATE WAREHOUSE analyst_wh
    WAREHOUSE_SIZE = 'SMALL'
    AUTO_SUSPEND = 600
    AUTO_RESUME = TRUE
    MAX_CLUSTER_COUNT = 3   -- scale out for concurrent analyst queries
    COMMENT = 'Analyst self-service queries and BI tools';

CREATE WAREHOUSE dashboard_wh
    WAREHOUSE_SIZE = 'X-SMALL'
    AUTO_SUSPEND = 60
    AUTO_RESUME = TRUE
    COMMENT = 'Metabase/Tableau service account — small, frequently-used queries';

CREATE WAREHOUSE ml_wh
    WAREHOUSE_SIZE = 'X-LARGE'
    AUTO_SUSPEND = 60
    AUTO_RESUME = TRUE
    COMMENT = 'ML feature extraction — rare, large, terminated after use';

-- Assign warehouses via roles:
GRANT USAGE ON WAREHOUSE dbt_pipeline_wh TO ROLE pipeline_role;
GRANT USAGE ON WAREHOUSE analyst_wh       TO ROLE analyst_role;
GRANT USAGE ON WAREHOUSE dashboard_wh     TO ROLE metabase_service_role;

-- Cost attribution: each warehouse's credit usage is separately trackable
SELECT warehouse_name, SUM(credits_used) AS total_credits
FROM snowflake.account_usage.warehouse_metering_history
WHERE start_time >= DATEADD('day', -30, CURRENT_DATE)
GROUP BY 1
ORDER BY 2 DESC;
-- Shows per-team compute cost clearly — enables chargeback to business units`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — BigQuery vs Redshift vs Snowflake ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Big Three Compared" />
        <SectionTitle>Snowflake vs BigQuery vs Redshift — Architectural Differences</SectionTitle>

        <Para>
          These three warehouses dominate the market and appear in almost every
          data engineering job. They are architecturally different in ways that
          matter for performance tuning, cost management, and platform design.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Snowflake', color: '#00add4' },
            { label: 'BigQuery', color: '#4285f4' },
            { label: 'Redshift', color: '#ff9900' },
          ]}
          keys={['dim', 'snowflake', 'bigquery', 'redshift']}
          rows={[
            { dim: 'Storage model', snowflake: 'Managed S3 (micro-partitions)', bigquery: 'Capacitor columnar format on Colossus', redshift: 'Local attached storage per node (RA3: S3-backed)' },
            { dim: 'Compute model', snowflake: 'Named virtual warehouses — you size them', bigquery: 'Serverless — you set slot reservations or on-demand', redshift: 'Named clusters — you provision node types and count' },
            { dim: 'Scaling', snowflake: 'Scale up/down warehouse size; multi-cluster for concurrency', bigquery: 'Automatic — serverless, scales to terabytes per query', redshift: 'Manual cluster resize; Concurrency Scaling for bursts' },
            { dim: 'Cost model', snowflake: 'Pay per second of warehouse time + storage', bigquery: 'On-demand: $6.25/TB scanned; or flat reservation slots', redshift: 'Pay per node-hour (provisioned) or per query (Serverless)' },
            { dim: 'Performance tuning', snowflake: 'Cluster keys, warehouse sizing, result cache management', bigquery: 'Partition and cluster tables, avoid SELECT *, avoid cross-joins', redshift: 'Distribution keys, sort keys, VACUUM, ANALYZE, WLM queues' },
            { dim: 'Concurrency', snowflake: 'Multi-cluster warehouse for concurrent users', bigquery: 'Unlimited — serverless handles concurrency automatically', redshift: 'WLM queues + Concurrency Scaling for bursts' },
            { dim: 'JSON / semi-structured', snowflake: 'VARIANT type — native JSON with dot notation access', bigquery: 'JSON/RECORD types — nested and repeated fields', redshift: 'SUPER type (Redshift PartiQL) — less mature' },
            { dim: 'Data sharing', snowflake: 'Native — share live data across accounts without copying', bigquery: 'Analytics Hub — publish/subscribe data exchange', redshift: 'Data sharing across clusters in same region' },
            { dim: 'Cloud native', snowflake: 'Multi-cloud (AWS, Azure, GCP) — same experience', bigquery: 'Google Cloud native', redshift: 'AWS native (deep integration with S3, Glue, SageMaker)' },
            { dim: 'Best for (2026)', snowflake: 'Multi-cloud, SQL-heavy platforms, strong data sharing', bigquery: 'Google Cloud, serverless simplicity, petabyte queries', redshift: 'AWS-native stack, Redshift-native ML, tight S3 integration' },
          ]}
        />

        <SubTitle>Redshift distribution keys and sort keys — the manual tuning that matters</SubTitle>

        <CodeBox label="Redshift distribution and sort keys — the key tuning concepts">{`# Redshift distributes data across multiple nodes.
# How data is distributed determines join performance.

# DISTRIBUTION STYLES:
# EVEN:   rows distributed round-robin across nodes — good default for small tables
# KEY:    rows with same distribution key value go to same node — good for joins
# ALL:    entire table copied to every node — for small dimension tables
# AUTO:   Redshift decides based on table size (modern default)

-- Tables joined on order_id should share the same distribution key:
CREATE TABLE silver.orders (
    order_id    BIGINT      NOT NULL,
    customer_id BIGINT,
    amount      DECIMAL(10,2),
    ...
) DISTKEY(order_id) SORTKEY(order_date);
-- order_id is the join column → co-locate orders and order_items on same node
-- order_date is the most common filter → sort key enables range pruning

CREATE TABLE silver.order_items (
    order_id    BIGINT,
    product_id  BIGINT,
    quantity    INTEGER,
    ...
) DISTKEY(order_id);  -- same DISTKEY as orders → join without data movement

# WITHOUT MATCHING DISTKEYS:
# JOIN between orders (node 1,2,3) and order_items (node 4,5,6):
# Redshift must REDISTRIBUTE one table across the network before joining
# This is the most expensive join operation — 10-100× slower than co-located

# CHECKING QUERY DISTRIBUTION:
# In EXPLAIN output, look for:
# DS_BCAST_INNER: broadcasting inner table to all nodes (expensive for large tables)
# DS_DIST_BOTH:   redistributing both tables (most expensive)
# DS_DIST_NONE:   co-located join (fastest — what you want)

# SORT KEYS:
# COMPOUND SORTKEY(col1, col2): efficient for filters on col1 or (col1, col2)
# INTERLEAVED SORTKEY(col1, col2): equal efficiency for any subset — but VACUUM slower
# For time-series data: SORTKEY(ingestion_date, event_date) — match your query patterns

# VACUUM and ANALYZE:
# Redshift does not auto-update table statistics — must run manually:
VACUUM silver.orders;    -- reclaim deleted space, re-sort unsorted region
ANALYZE silver.orders;   -- update table statistics for query optimizer
-- Run after large loads. Without current statistics: query planner makes poor choices.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Reading Query Plans ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Query Plans" />
        <SectionTitle>Reading Query Plans — Finding the Bottleneck</SectionTitle>

        <Para>
          A query plan is the execution strategy the database chose for your
          SQL. Reading it tells you exactly what the warehouse is doing — which
          operations take the most time, whether indexes or cluster keys are being
          used, and where the bottleneck is. Every data engineer should be able
          to read a basic query plan.
        </Para>

        <SubTitle>Snowflake query profile — what to look for</SubTitle>

        <CodeBox label="Snowflake query profile — reading the execution graph">{`SNOWFLAKE QUERY PROFILE (accessed via UI after query runs):
  Shows a node-by-node execution graph with time and data statistics.

OPERATOR TYPES YOU WILL SEE:
  TableScan:       reading micro-partitions from S3 or local cache
  Filter:          applying WHERE conditions
  Join:            HASH JOIN, MERGE JOIN, or NESTED LOOP
  Aggregate:       GROUP BY computation
  Sort:            ORDER BY
  WindowFunction:  OVER (PARTITION BY ... ORDER BY ...)
  Result:          sending results to client
  Exchange:        redistributing data between nodes for parallel ops

KEY METRICS PER OPERATOR:
  Time (ms):             how long this operator took
  Rows:                  how many rows this operator processed
  Bytes:                 how many bytes read/written
  Partitions scanned:    (TableScan only) vs total partitions

BOTTLENECK PATTERNS AND FIXES:
  1. TableScan reads most partitions:
     Metric: "Partitions scanned: 9,800 / 10,000"
     Cause:  No pruning — filter column not in cluster key
     Fix:    ALTER TABLE CLUSTER BY (filter_column)
             Or: check that filter uses column directly, not inside function

  2. Large HASH JOIN with spilling:
     Metric: "Bytes written to local storage" > 0 (spill to disk)
     Cause:  Join tables too large for memory at this warehouse size
     Fix:    Size up the warehouse OR filter before joining to reduce size
             Or: ensure smaller table is the build side of the hash join

  3. Slow Aggregate:
     Metric: Aggregate node takes most of query time
     Cause:  GROUP BY on many distinct values, many output rows
     Fix:    Pre-aggregate in Silver/Gold dbt model if this runs frequently
             Push down filters to reduce rows before aggregation

  4. WindowFunction with many rows:
     Metric: WindowFunction node is slow, large data volume
     Cause:  OVER (PARTITION BY customer_id) when customer_id is unique
             → window function has to keep all rows in memory
     Fix:    Ensure PARTITION BY is on a selective column that groups rows

PRACTICAL USAGE:
  After any query that is slower than expected:
  1. Click "Query ID" in Snowflake UI → "Query Profile"
  2. Find the slowest node (highest % of total time)
  3. Read the metrics on that node to diagnose the cause
  4. Apply the appropriate fix above
  Most query performance issues fall into one of three categories:
  partition pruning not working, join order wrong, or warehouse too small.`}</CodeBox>

        <SubTitle>EXPLAIN in PostgreSQL — reading row estimates and scan types</SubTitle>

        <CodeBox label="PostgreSQL EXPLAIN ANALYZE — what each component means">{`EXPLAIN ANALYZE
SELECT o.order_id, c.name, o.amount
FROM silver.orders o
JOIN silver.customers c ON o.customer_id = c.customer_id
WHERE o.order_date = '2026-03-17';

-- Sample output:
-- Hash Join  (cost=12847.00..98432.00 rows=48234 width=28)
--             (actual time=124ms..892ms rows=48109 loops=1)
--   Hash Cond: (o.customer_id = c.customer_id)
--   ->  Index Scan using idx_orders_date on orders o
--         (cost=0.44..48291.00 rows=48234 width=20)
--         (actual time=0.04ms..124ms rows=48234 loops=1)
--       Index Cond: (order_date = '2026-03-17'::date)
--   ->  Hash  (cost=7823.00..7823.00 rows=812345 width=16)
--         (actual time=98ms..98ms rows=812345 loops=1)
--         ->  Seq Scan on customers c
--               (cost=0.00..7823.00 rows=812345 width=16)
--               (actual time=0.03ms..54ms rows=812345 loops=1)
-- Planning Time: 1.2 ms
-- Execution Time: 897 ms

-- WHAT TO READ:
-- Index Scan (vs Seq Scan): orders is using an index on order_date ✓
--   → index was used for the WHERE filter — efficient
-- Seq Scan on customers: full table scan — no index used
--   → 812,345 rows scanned just to build hash table — expected for large dim table
-- Hash Join: one table (customers) loaded into hash table, other (orders) probed
--   → orders is the probe side (smaller matching set) — correct order ✓
-- actual time vs cost: actual rows 48,109 vs estimated 48,234 — close ✓
--   if actual >> estimated: stale statistics, run ANALYZE
-- Execution Time 897ms: reasonable for 48k rows joining to 812k rows

-- RED FLAGS IN EXPLAIN OUTPUT:
-- Seq Scan on large table with filter → missing index
-- Hash Join with very different estimated vs actual rows → stale stats → ANALYZE
-- Nested Loop with large outer table → wrong join type for this size → HashJoin needed
-- Sort on large data set without index → ORDER BY without index → add index or avoid`}</CodeBox>
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
        <SectionTitle>Cutting a Snowflake Bill by 60% Without Losing Performance</SectionTitle>

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
            Scenario — FreshMart · CFO asks why Snowflake bill doubled in 3 months
          </div>

          <Para>
            FreshMart's Snowflake bill grew from $4,200/month to $11,800/month
            over three months. The data team is asked to investigate and reduce
            the cost. Here is the systematic approach.
          </Para>

          <CodeBox label="Snowflake cost investigation and optimisation">{`-- STEP 1: Find the top credit consumers
SELECT warehouse_name,
       SUM(credits_used)                                  AS total_credits,
       SUM(credits_used) * 2                              AS approx_usd_cost,
       COUNT(*)                                           AS query_count
FROM snowflake.account_usage.warehouse_metering_history
WHERE start_time >= DATEADD('month', -3, CURRENT_DATE)
GROUP BY 1
ORDER BY 2 DESC;

-- Results:
-- COMPUTE_WH       4,890 credits  $9,780  182,433 queries  ← 83% of bill
-- DBT_PIPELINE_WH    420 credits    $840      284 queries
-- ML_WH               80 credits    $160        8 queries

-- COMPUTE_WH is the problem — one warehouse doing everything.

-- STEP 2: Find the most expensive queries on COMPUTE_WH
SELECT query_text,
       total_elapsed_time / 1000 / 60           AS duration_min,
       credits_used_cloud_services               AS cloud_credits,
       partitions_scanned,
       partitions_total,
       bytes_scanned / 1024 / 1024 / 1024       AS gb_scanned
FROM snowflake.account_usage.query_history
WHERE warehouse_name = 'COMPUTE_WH'
  AND start_time >= DATEADD('month', -1, CURRENT_DATE)
ORDER BY credits_used_cloud_services DESC
LIMIT 20;

-- Top 3 queries explain 60% of the cost:
-- 1. dbt gold.customer_ltv model: 28 min, 892 partitions/892 total (100% scan)
-- 2. Metabase dashboard refresh: 12 min, runs every 5 min (12× per hour)
-- 3. Analyst's ad-hoc explore: 45 min, ran 8 times today

-- STEP 3: Fix the top issues

-- Issue 1: dbt Gold model scanning all partitions
-- Check query profile → TableScan shows no pruning on customers table
-- customers table has no CLUSTER BY
ALTER TABLE silver.customers CLUSTER BY (tier, city);
-- After reclustering: customer_ltv model scans 8% of partitions → 28min → 4min

-- Issue 2: Metabase dashboard refreshing every 5 minutes
-- Gold metrics don't change more than once per hour (Silver pipeline is hourly)
-- Fix: change Metabase refresh to 60 minutes
-- Additionally: Metabase now hits result cache on most refreshes → near-instant

-- Issue 3: Analyst using X-Large warehouse for small queries
-- Query profile shows: 95% idle, 5% actual work
-- Analyst's connection string was set to use compute_wh (X-Large by mistake)
-- Fix: reassign analyst to analyst_wh (Small), add query timeout 10 minutes
ALTER USER analyst_priya SET DEFAULT_WAREHOUSE = 'ANALYST_WH';

-- Issue 4: One warehouse for everything — separate workloads
-- Create dedicated warehouses (as shown in Part 05)
-- dbt_pipeline_wh (Medium), analyst_wh (Small+multi-cluster), dashboard_wh (X-Small)

-- STEP 4: Verify improvement
-- After 30 days with all fixes:
-- Total credits: 1,840 (was 5,390) → 66% reduction
-- Query performance: unchanged or improved (better pruning for dbt model)
-- Analyst experience: better (dedicated warehouse, no contention with pipeline)`}</CodeBox>

          <Para>
            The cost reduction was entirely from better configuration — no query
            rewrites, no architecture changes. Separating warehouses, fixing cluster
            keys, adjusting dashboard refresh rates, and ensuring analysts used the
            right warehouse size reduced the bill by 66%. Most Snowflake overspend
            comes from these operational patterns rather than intrinsically expensive
            queries.
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
            q: 'Q1. Why is columnar storage faster than row storage for analytical queries?',
            a: `Columnar storage stores all values of a single column contiguously on disk, while row storage stores all values of a single row contiguously. This difference has profound performance implications for analytical queries that read a small number of columns from a large table.

Consider a query: SELECT SUM(amount) FROM orders WHERE status = 'delivered'. This query needs only two columns (amount and status) from a table with perhaps 200 columns. In row storage, every row's 200 columns must be read from disk to access the two needed columns — 99% of the data read is immediately discarded. In columnar storage, only the status column and amount column are read. For a 200-column table, this is a 100× reduction in I/O.

The second advantage is compression. Columnar storage groups similar data together — all amounts in one block, all statuses in another. Compression algorithms work much better on homogeneous data. A status column with 5 distinct values out of 500 million rows compresses to nearly nothing with dictionary encoding. A row block containing amounts, statuses, IDs, and timestamps has low compressibility because the values are heterogeneous.

The combined effect is significant: a query that would read 1.6 TB in a 200-column row-oriented table might read 24 GB in a columnar store — 66× less I/O, 5-10× better compression, and the CPU operates on much smaller datasets. This is why Snowflake, BigQuery, Redshift, and Parquet all use columnar storage for analytical workloads. Row storage remains superior for OLTP workloads where you need all columns of a specific row — a transactional UPDATE or a point lookup by primary key reads the entire row naturally in row storage.`,
          },
          {
            q: 'Q2. What is a Snowflake virtual warehouse and how should you decide what size to use?',
            a: `A Snowflake virtual warehouse is a named cluster of compute nodes (CPU and memory) that executes queries. Virtual warehouses are independent of each other and of storage — Snowflake's data lives in managed S3 and is queried by whichever warehouse you assign to the session. Each warehouse has its own local SSD cache and its own resource pool.

The sizes range from X-Small (1 credit per hour, 1 node) to 4X-Large (128 credits per hour, 128 nodes). Larger warehouses have more CPU, more memory, more nodes, and a larger local disk cache.

The decision process for warehouse sizing starts with running the query on a Medium warehouse. Then examine the query profile. If the query shows spilling to local storage (bytes written to local storage > 0), the warehouse is running out of memory — size up to Large or X-Large. If the query is scanning all micro-partitions with no pruning, sizing up will not help — the bottleneck is I/O from a missing cluster key, not compute.

A warehouse that is too large wastes money (you are paying for idle nodes). A warehouse too small causes queries to spill to disk and run slower than they would on a properly-sized warehouse.

The other factor is workload type. Scale up (larger single warehouse) improves single-query performance — complex dbt models, large joins, memory-intensive operations. Scale out (multi-cluster warehouse) improves concurrency — when many analysts run queries simultaneously and queue for the warehouse. Use separate dedicated warehouses for different workload types: transformation pipelines on a Medium warehouse, analysts on a Small multi-cluster warehouse, dashboards on an X-Small warehouse. Separating workloads prevents contention, enables per-team cost attribution, and ensures a long dbt run does not block analyst queries.`,
          },
          {
            q: 'Q3. What is Snowflake\'s result cache and when does it help vs when does it hurt?',
            a: `Snowflake's result cache stores the complete result set of every query in the cloud services layer for 24 hours. When an identical query is run again within that window and the underlying data has not changed, Snowflake returns the cached result immediately — no warehouse time used, zero compute cost.

The result cache helps dramatically for repeated queries on slowly-changing data. A BI dashboard that refreshes every 5 minutes showing daily revenue aggregates will hit the result cache on most refreshes (since the underlying Silver pipeline runs hourly, not every 5 minutes). The result is instant — sub-second responses for what would otherwise be a 30-second query.

The conditions for a cache hit are strict: the exact same SQL text (including whitespace and case), the same session parameters, the same user permissions, and no changes to the underlying tables since the result was cached. The cache is invalidated whenever any referenced table receives new data via DML or INSERT.

The result cache hurts when analysts expect fresh data but receive stale cached results. If the Silver pipeline ran at 08:00 and loaded new orders for March 17, but an analyst's query for March 17 revenue is cached from 07:45 before the pipeline ran, they see yesterday's answer. The fix is to schedule BI dashboard refreshes after the pipeline completes, not on a fixed interval that may run before the pipeline.

The result cache also does not help for parameterised queries where different users pass different values. SELECT * FROM orders WHERE customer_id = 4201938 and SELECT * FROM orders WHERE customer_id = 4201939 are different SQL texts — neither hits the other's cache. For user-specific dashboards, the result cache is largely ineffective and the local disk cache (which caches the underlying micro-partition data) is what provides performance.`,
          },
          {
            q: 'Q4. What is a distribution key in Redshift and why does it matter for join performance?',
            a: `A distribution key in Redshift determines which node in the cluster stores each row. Rows with the same distribution key value are stored on the same node. This design decision profoundly affects join performance.

Redshift is a massively parallel database where data is distributed across multiple nodes. When a query joins two large tables, the most efficient execution is to have matching rows on the same node — the join happens locally without network transfer. When matching rows are on different nodes, Redshift must redistribute one or both tables across the network before joining. This redistribution is called a broadcast or hash redistribution and is one of the most expensive operations in a distributed system.

When you set the same distribution key on two tables that are frequently joined — say, DISTKEY(order_id) on both orders and order_items — rows with the same order_id land on the same node. A join between them requires no data movement at all. In the EXPLAIN output, this shows as DS_DIST_NONE (no distribution needed) — the optimal case.

Without matching distribution keys, a join between orders (nodes 1-4) and order_items (also nodes 1-4, but different distribution) requires Redshift to redistribute order_items to match orders's distribution, or broadcast the smaller table to all nodes. The EXPLAIN output shows DS_DIST_BOTH or DS_BCAST_INNER — both are significantly more expensive.

The practical rule: if two large tables are frequently joined, they should share the same distribution key on the join column. For small dimension tables (less than a few hundred MB), use DISTSTYLE ALL to copy the entire table to every node — this eliminates redistribution for any join to that table since every node has the full dimension locally. For tables with no clear join pattern, DISTSTYLE EVEN distributes rows round-robin and is a reasonable default that avoids any hotspots.`,
          },
          {
            q: 'Q5. A Snowflake query that ran in 30 seconds last month now takes 8 minutes. No code changed. What would you check?',
            a: `When a query degrades significantly without code changes, the cause is almost always in the data or the environment, not the SQL. I would investigate in this sequence.

First, check whether the underlying table grew significantly. More data means more partitions to scan. Query the partition count: SELECT TABLE_NAME, ACTIVE_BYTES, ROW_COUNT FROM information_schema.tables WHERE table_name = 'ORDERS'. If the table tripled in size, the query naturally takes longer even with good pruning.

Second, check the query profile to see if micro-partition pruning is still working. Compare "Partitions scanned" to "Partitions total." If the ratio was previously 5% and is now 95%, something changed about data organisation. This can happen when new data was loaded in a different order than before (for example, a bulk historical backfill loaded old data after newer data, interleaving them in micro-partitions and breaking the natural date ordering that enabled pruning).

Third, check whether the CLUSTER BY was disrupted. A large out-of-order load can increase the average cluster depth significantly, degrading pruning. Check: SELECT SYSTEM\$CLUSTERING_INFORMATION('silver.orders', '(order_date, store_id)'). If average_depth jumped from 1.5 to 8, the cluster key needs re-application via ALTER TABLE.

Fourth, check whether the warehouse local disk cache was lost. If the warehouse was suspended and resumed (perhaps due to a configuration change reducing auto-suspend time), it starts cold with no cached micro-partition data. The first runs after resume read from S3 rather than local SSD.

Fifth, check if the result cache was invalidated more frequently. If the pipeline's load schedule changed and now loads data more often, the result cache that used to serve the query now frequently misses. This is especially relevant for a BI dashboard that went from 30 seconds to 8 minutes — if it was hitting the result cache 95% of the time before and now misses it, the apparent query time increases dramatically.`,
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
            error: `Snowflake query suddenly takes 45 minutes — query profile shows "Partitions scanned: 10,000 / 10,000" despite a WHERE clause on order_date`,
            cause: 'The query uses a function on the partition column: WHERE DATE_TRUNC(\'day\', created_at) = \'2026-03-17\'. Snowflake cannot use micro-partition metadata for the column value when a function is applied to it. The metadata shows min/max of created_at (a timestamp), but the function result (a date) is not in the metadata. Snowflake must scan all partitions to evaluate the function.',
            fix: 'Rewrite the filter to use the column directly without a function. For date truncation: WHERE created_at >= \'2026-03-17\'::TIMESTAMPTZ AND created_at < \'2026-03-18\'::TIMESTAMPTZ. For extracting year: WHERE created_at >= \'2026-01-01\' AND created_at < \'2027-01-01\'. This lets Snowflake compare the filter value directly to the min/max metadata in each micro-partition and prune correctly.',
          },
          {
            error: `Snowflake bill doubled after a bulk historical backfill — queries that previously ran in 30 seconds now take 8 minutes`,
            cause: 'The bulk backfill loaded 2 years of historical data in random order (not chronologically sorted). This interleaved old and new data in micro-partitions, destroying the natural date ordering. Previously, a filter for "last 7 days" pruned 99% of partitions because recent data was in recent partitions. After the backfill, every partition has data from random dates, so the min/max range for each partition spans 2 years — no pruning is possible.',
            fix: 'Run CLUSTER BY on the table after the backfill to re-organise micro-partitions by date: ALTER TABLE silver.orders CLUSTER BY (order_date). Snowflake runs a background reclustering job that re-sorts the data. Monitor progress with SYSTEM\$CLUSTERING_INFORMATION until average_depth returns below 2. For future backfills, load historical data in chronological order or load to a staging table first and insert with ORDER BY date.',
          },
          {
            error: `Redshift query takes 45 minutes with DS_DIST_BOTH in EXPLAIN output — both tables being redistributed before the join`,
            cause: 'The two tables being joined (orders and payments) have different distribution keys. Orders is distributed by order_id but payments is distributed by payment_id (its primary key, not the join column). To join them on order_id, Redshift must redistribute both tables across nodes so that matching order_ids land on the same node. DS_DIST_BOTH means both tables are being shuffled — the most expensive redistribution type.',
            fix: 'Align distribution keys on the join column: ALTER TABLE silver.payments ALTER DISTKEY order_id. After the table is redistributed, the join executes with DS_DIST_NONE (no redistribution needed). If the table is very large and cannot be altered without significant downtime, consider CTAS (CREATE TABLE AS SELECT) to create a new properly-distributed table, then swap it in. Run VACUUM and ANALYZE after any large redistribution.',
          },
          {
            error: `All analyst queries are returning stale data — dashboard shows yesterday's numbers despite pipeline completing successfully 2 hours ago`,
            cause: 'The result cache is serving cached query results from before the pipeline ran. The pipeline ran at 06:00 and completed at 06:45. Analysts began querying at 07:00 and their queries hit the result cache from before 06:00. If the warehouse the analysts use has result cache enabled (the default) and the query text is identical to earlier cached queries, Snowflake returns the cached result even though newer data exists.',
            fix: 'The result cache is only invalidated when a table\'s data changes. Check whether the pipeline\'s writes are reaching the correct table and schema: SELECT MAX(ingested_at) FROM silver.orders. If ingested_at is recent, the table was updated and the result cache should have been invalidated. If the pipeline wrote to a staging table but the final swap or MERGE did not complete, the analysts\' target table was not updated. Also check: SHOW PARAMETERS LIKE \'USE_CACHED_RESULT\' — if it was disabled for testing and not re-enabled, results will never cache. The more likely issue is that the BI tool itself has its own layer of caching separate from Snowflake.',
          },
          {
            error: `BigQuery query costs $47 for a single run against a 500GB table — SELECT * on a partitioned table scans the entire table`,
            cause: 'BigQuery bills by bytes scanned. SELECT * reads all columns — in a wide table with 200 columns, you pay for all 200 columns even if only 3 are needed. BigQuery\'s on-demand pricing is $6.25 per TB scanned, so a full scan of 500 GB × $6.25/TB = $3.13 per query. But $47 suggests 7.5 TB was scanned — the table may be much larger than expected, or the partition filter is not being applied. BigQuery requires partition filters on partitioned tables to enable pruning, but does not enforce them unless require_partition_filter = TRUE.',
            fix: 'Never use SELECT * in BigQuery production queries — specify only the columns you need. BigQuery is columnar and bills only for columns read. For a 200-column table reading 3 columns: cost drops from $3.13 to $0.047 (66× cheaper). Enable partition filter enforcement: ALTER TABLE silver.orders SET OPTIONS (require_partition_filter = TRUE) — this forces queries to include a partition column filter or fail with an error rather than silently running a full scan. For the immediate $47 bill: verify partitions are being used with EXPLAIN SELECT ... and check for partition filter in the query plan.',
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
        'Columnar storage is faster for analytics because queries only read the columns they need. A query using 3 of 200 columns reads 1.5% of the data vs 100% in row storage. Columnar also compresses better — homogeneous column data enables run-length encoding, dictionary encoding, and delta encoding that mixed-type row blocks cannot match.',
        'Choose correct data types for maximum compression: DECIMAL for amounts (not VARCHAR), TIMESTAMPTZ for timestamps (enables delta encoding), BOOLEAN for flags (bit packing), properly-sized VARCHAR lengths. Never store numbers as strings — loses all numeric compression and comparison performance.',
        'Snowflake has three layers: Cloud Services (query planner, metadata, result cache — always on), Virtual Warehouse (compute with local SSD cache — pay per second), Storage (micro-partitions on S3 — cheap). Understanding which layer a bottleneck is in determines the fix.',
        'Snowflake micro-partition pruning works by comparing filter values to per-partition min/max metadata without reading any data. Pruning requires: filter on a column whose ordering is correlated with partition boundaries, no function applied to the filter column. Never apply functions to filter columns in WHERE clauses.',
        'Cluster keys (CLUSTER BY) re-organise data so rows with similar values in the cluster key columns are co-located in the same micro-partitions. Use cluster keys for columns frequently used in WHERE filters where natural loading order does not provide pruning. Monitor clustering depth — values above 5 indicate reclustering is needed.',
        'Snowflake\'s result cache returns query results instantly if the exact same SQL was run within 24 hours and no underlying data changed. Schedule BI dashboard refreshes after pipeline completion (data-driven), not on a fixed interval that may run before the pipeline and serve stale cached results.',
        'Use separate virtual warehouses for separate workload types. dbt transformation pipeline, analyst self-service, and BI dashboard service accounts all have different resource needs and should not compete on the same warehouse. Dedicated warehouses enable per-team cost attribution and prevent pipeline runs from blocking analyst queries.',
        'In Redshift, distribution keys (DISTKEY) determine which node stores each row. Tables frequently joined together should share the same distribution key on the join column — this enables DS_DIST_NONE (no redistribution at join time). DS_DIST_BOTH in EXPLAIN means both tables are being redistributed — the most expensive join type.',
        'For Redshift performance: always run VACUUM after large loads (reclaims deleted space, re-sorts data) and ANALYZE (updates query planner statistics). Without current statistics, the query planner makes poor join order and join type choices. These must be run manually — Redshift does not auto-update statistics.',
        'Read query profiles after any slow query. In Snowflake: check partitions scanned vs total (pruning), spill to disk (warehouse too small), and the slowest operator (bottleneck). In PostgreSQL EXPLAIN ANALYZE: check for Seq Scan where Index Scan is expected, large discrepancy between estimated and actual rows (stale statistics), and DS_DIST_BOTH in Redshift (wrong distribution keys).',
      ]} />

    </LearnLayout>
  )
}