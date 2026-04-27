import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Databases — What They Are and How They Work Internally — Data Engineering | Chaduvuko',
  description:
    'Storage engines, B-trees, indexes, buffer pools, WAL, and MVCC — the internal mechanics that make every database tick. Understand these and every database you ever use makes more sense.',
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

export default function DatabasesInternalsModule() {
  return (
    <LearnLayout
      title="Databases — What They Are and How They Work Internally"
      description="Storage engines, B-trees, indexes, buffer pools, WAL — the inside story."
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Internals Matter ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Internals Matter" />
        <SectionTitle>Why Every Data Engineer Must Understand Database Internals</SectionTitle>

        <Para>
          Most people learn databases from the outside — they learn SQL syntax,
          how to create tables, how to run queries. This is enough to get data out
          of a database. It is not enough to understand why a query takes 4 minutes
          instead of 4 seconds, why a pipeline slows down a live application, why
          two transactions that seem independent can deadlock, or why replication lag
          causes data inconsistencies in your pipelines.
        </Para>

        <Para>
          Every database you will ever work with — PostgreSQL, MySQL, Snowflake,
          MongoDB, Redis, Cassandra — has internals built on the same small set of
          fundamental concepts. A B-tree is a B-tree whether you are in PostgreSQL
          or MongoDB. Write-Ahead Logging exists in PostgreSQL, MySQL, SQLite, and
          modern cloud warehouses. Buffer pool management appears in every database
          that reads from disk.
        </Para>

        <Para>
          Learn these concepts once, at depth, and every database you encounter for
          the rest of your career becomes easier to understand, debug, and optimise.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The six internal concepts that explain 90% of database behaviour
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { num: '01', name: 'Storage Engine', desc: 'How data is physically organised on disk — the foundation everything else builds on.' },
              { num: '02', name: 'B-tree Index', desc: 'The data structure that makes lookups fast — without it, every query is a full scan.' },
              { num: '03', name: 'Buffer Pool', desc: 'The in-memory cache between disk and queries — the source of most performance gains and surprises.' },
              { num: '04', name: 'Write-Ahead Log', desc: 'The mechanism that makes databases crash-safe — also the source of replication and CDC.' },
              { num: '05', name: 'Transactions & MVCC', desc: 'How multiple queries run simultaneously without corrupting each other\'s view of data.' },
              { num: '06', name: 'Query Execution', desc: 'How a SQL string becomes a physical plan and how the engine decides what to do first.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '14px 16px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Storage Engine ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Storage Engines" />
        <SectionTitle>Storage Engines — How Data Is Physically Organised on Disk</SectionTitle>

        <Para>
          A storage engine is the component of a database responsible for how data
          is physically written to and read from disk. The rest of the database —
          query parsing, optimisation, transaction management — sits on top of
          the storage engine. The engine's design determines what operations are fast,
          what operations are slow, and what consistency guarantees the database can offer.
        </Para>

        <Para>
          There are two dominant storage engine designs: <strong>B-tree based</strong>
          (used by PostgreSQL, MySQL InnoDB, SQLite) and <strong>LSM-tree based</strong>
          (used by RocksDB, Cassandra, LevelDB, Apache HBase). Understanding the
          trade-off between them explains the performance profile of almost every
          database you will encounter.
        </Para>

        <SubTitle>B-tree based storage engines</SubTitle>

        <Para>
          B-tree engines organise data in a tree structure of fixed-size pages
          (typically 8–16 KB each). Every read and write operation navigates this
          tree to find the right page. Updates are done in-place — the old value
          on the page is directly overwritten with the new value.
        </Para>

        <CodeBox label="B-tree storage — how data pages are organised">{`B-tree page structure (PostgreSQL uses 8 KB pages):

  Root page (level 3)
    ├── Internal page A (level 2) — covers order_id 1–5,000,000
    │     ├── Internal page A1 (level 1) — covers 1–500,000
    │     │     ├── Leaf page 1 — rows: order_id 1–100
    │     │     ├── Leaf page 2 — rows: order_id 101–200
    │     │     └── ...
    │     └── Internal page A2 — covers 500,001–1,000,000
    └── Internal page B (level 2) — covers 5,000,001–10,000,000

Leaf pages contain the actual row data (or pointers to it).
Internal pages contain only keys and child page pointers.

What this means for operations:
  READ by primary key (order_id = 9284751):
    Root → Internal page → Leaf page → row found
    = 3–4 page reads regardless of table size (O log n)
    At 100M rows, still only 4 page reads. Fast.

  FULL TABLE SCAN (no WHERE clause or non-indexed column):
    Must read ALL leaf pages sequentially
    100M rows × 100 rows/page = 1M page reads. Slow.

  UPDATE existing row:
    Find the page (3–4 reads), modify the value in-place,
    write the page back. Fast for individual updates.

  INSERT new row:
    Find the correct leaf page, insert in sorted order.
    If page is full → page split (expensive operation).`}</CodeBox>

        <SubTitle>LSM-tree based storage engines</SubTitle>

        <Para>
          LSM-tree (Log-Structured Merge-tree) engines work completely differently.
          They never modify data in-place. Instead, every write is appended to an
          in-memory buffer. When the buffer fills, it is flushed to a new immutable
          file on disk. Periodically, the engine merges these files together in a
          background compaction process.
        </Para>

        <CodeBox label="LSM-tree storage — the append-only write path">{`LSM-tree write path (Cassandra, RocksDB, HBase):

  WRITE (INSERT or UPDATE order 9284751):
    1. Write to in-memory buffer (MemTable)          ← very fast
    2. Append to Write-Ahead Log (for crash safety)   ← sequential write
    3. Return success to client                       ← done, no disk random write

  BACKGROUND (when MemTable fills up):
    4. Flush MemTable to disk as new SSTable file     ← immutable sorted file
    5. Periodically COMPACT multiple SSTables         ← merge + remove old versions
       into fewer, larger sorted files

RESULT of multiple updates to same key:
  SSTable 1 (oldest): {order_id: 9284751, status: "placed"}
  SSTable 2:          {order_id: 9284751, status: "confirmed"}
  SSTable 3 (newest): {order_id: 9284751, status: "delivered"}

  READ order 9284751: check MemTable first,
  then SSTables newest-to-oldest, return first match found.
  Bloom filters on each SSTable tell you if key exists
  without reading the whole file.

TRADE-OFFS vs B-tree:
  ✓ Writes are much faster (sequential append, no page splits)
  ✓ Better write throughput at high velocity
  ✗ Reads are slower (check multiple SSTables)
  ✗ Compaction consumes background CPU and I/O
  ✗ Space amplification (same data in multiple SSTables until compaction)

Best for: write-heavy workloads, time-series data, IoT streams, Kafka consumer state`}</CodeBox>

        <CompareTable
          headers={[
            { label: 'Property' },
            { label: 'B-tree Engine', color: '#00e676' },
            { label: 'LSM-tree Engine', color: '#7b61ff' },
          ]}
          keys={['prop', 'btree', 'lsm']}
          rows={[
            { prop: 'Write speed', btree: 'Moderate (random writes, possible page splits)', lsm: 'Very fast (sequential append to memory + log)' },
            { prop: 'Read speed', btree: 'Fast (O log n via tree navigation)', lsm: 'Moderate (check MemTable + multiple SSTables)' },
            { prop: 'Update', btree: 'In-place overwrite', lsm: 'Append new version, old version removed at compaction' },
            { prop: 'Delete', btree: 'Mark as deleted (vacuum reclaims space)', lsm: 'Write tombstone marker, removed at compaction' },
            { prop: 'Space usage', btree: 'Efficient (updates overwrite)', lsm: 'Higher temporarily (multiple versions until compaction)' },
            { prop: 'Best for', btree: 'Mixed read/write, OLTP workloads', lsm: 'Write-heavy, high-velocity, time-series data' },
            { prop: 'Examples', btree: 'PostgreSQL, MySQL (InnoDB), SQLite, SQL Server', lsm: 'Cassandra, RocksDB, HBase, LevelDB, InfluxDB' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — B-tree Indexes ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Indexes" />
        <SectionTitle>Indexes — The Mechanism That Makes Databases Usable</SectionTitle>

        <Para>
          An index is a separate data structure that the database maintains alongside
          the actual table data. It stores a subset of column values in a sorted,
          searchable format along with pointers back to the full rows. Without indexes,
          every query that cannot use the primary key requires reading every row in
          the table. With the right index, that same query reads only a handful of pages.
        </Para>

        <Para>
          Understanding indexes at this level — not just "add an index to make queries
          faster" but specifically how they work — is what allows you to diagnose why
          a query is slow, whether an index is being used, and whether an index is
          hurting write performance more than it helps read performance.
        </Para>

        <SubTitle>B-tree index structure</SubTitle>

        <Para>
          A B-tree index for a column stores the column values in sorted order in a
          tree of pages. The leaf pages of the index store the indexed values alongside
          pointers (row IDs or primary key values) to the actual table rows. Navigation
          from root to leaf takes O(log n) time — for a table of 100 million rows with
          a balanced B-tree of height 4, finding a value requires reading exactly
          4 pages.
        </Para>

        <CodeBox label="B-tree index — how a lookup works step by step">{`Table: orders (100 million rows)
Index: idx_orders_city ON orders(city)

INDEX STRUCTURE (simplified):
  Root page:  [Chicago | Austin | New York]
                  ↓           ↓          ↓
  Level 1: [Ahm..Che] [Hy..Mum] [Mum..Pun] [Pun..Vis]
                                     ↓
  Leaf pages: [New York row_ptr_1, New York row_ptr_2, ...]
              [New York row_ptr_3, New York row_ptr_4, ...]

QUERY: SELECT * FROM orders WHERE city = 'New York'

EXECUTION WITH INDEX:
  1. Read root page → navigate right subtree (New York > Austin)
  2. Read level-1 internal page → find leaf page range for New York
  3. Read first leaf page → find first New York entry + row pointer
  4. Follow row pointer → read actual table page for this row
  5. Continue through leaf pages until city > 'New York'

  Total: ~4 index pages + N data pages (one per matching row)
  For 50,000 New York orders in 100M rows: ~50,004 page reads

QUERY WITHOUT INDEX:
  Full table scan: 100,000,000 rows / 100 rows per page = 1,000,000 page reads
  With index: ~50,004 page reads
  Speedup: ~20× for this query

RANGE QUERY benefit:
  SELECT * FROM orders WHERE city = 'New York' AND amount > 500
  Index on city narrows to New York rows, then filters amount.
  Index on (city, amount) composite — narrows to both criteria in one pass.`}</CodeBox>

        <SubTitle>Index types every data engineer must know</SubTitle>

        {[
          {
            type: 'B-tree Index (default)',
            color: '#00e676',
            use: 'The universal index type. Works for equality (=), range (BETWEEN, >, <), and ORDER BY. Maintains sort order, making range queries highly efficient.',
            example: 'CREATE INDEX idx_orders_city ON orders(city)',
            when: 'Any column frequently used in WHERE, JOIN ON, or ORDER BY clauses. Always create on foreign key columns.',
            cost: 'Adds ~10–30% overhead to INSERT/UPDATE/DELETE operations on the indexed column. Each index must be updated on every write.',
          },
          {
            type: 'Composite Index',
            color: '#7b61ff',
            use: 'An index on multiple columns in a specific order. Extremely efficient when queries filter on the leading columns. Column order matters: (city, status) helps WHERE city = X but not WHERE status = X alone.',
            example: 'CREATE INDEX idx_orders_city_status ON orders(city, status)',
            when: 'Queries that filter on multiple columns together. The leftmost columns must be the most selective filters.',
            cost: 'Higher write overhead than single-column index. Larger storage footprint. Worth it when the query pattern is well-defined.',
          },
          {
            type: 'Unique Index',
            color: '#f97316',
            use: 'A B-tree index that also enforces uniqueness — no two rows can have the same value in the indexed column(s). PRIMARY KEY constraints automatically create a unique index.',
            example: 'CREATE UNIQUE INDEX idx_orders_order_id ON orders(order_id)',
            when: 'Any column that must be unique — email addresses, external IDs, usernames. Use UNIQUE CONSTRAINT rather than index directly for clarity.',
            cost: 'Same as B-tree plus uniqueness check on every write.',
          },
          {
            type: 'Partial Index',
            color: '#facc15',
            use: 'An index that only covers rows matching a condition. A partial index on status = "pending" only indexes pending orders, not the full table. Much smaller and faster for queries that always filter on that condition.',
            example: "CREATE INDEX idx_pending_orders ON orders(created_at) WHERE status = 'pending'",
            when: "Queries that always include a specific filter value — 'WHERE status = pending AND created_at > X'. Only useful if the filtered subset is a small fraction of the table.",
            cost: 'Smaller and faster than full index. Only useful for the specific filter it was designed for.',
          },
          {
            type: 'Expression Index',
            color: '#4285f4',
            use: 'An index on a computed expression rather than a raw column value. Allows indexing LOWER(email), DATE(created_at), or any function of a column.',
            example: 'CREATE INDEX idx_orders_date ON orders(DATE(created_at))',
            when: 'Queries that filter on a function of a column: WHERE LOWER(email) = X or WHERE DATE(created_at) = X. The query must use the exact same expression as the index.',
            cost: 'The expression is evaluated and stored for every row — higher write overhead than a simple column index.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '18px 22px' }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 8,
              }}>{item.type}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                {item.use}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '6px 12px', marginBottom: 10,
              }}>{item.example}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>When to use</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.when}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Cost</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.cost}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Callout type="warning">
          <strong>The index trade-off data engineers must understand:</strong> Every index
          speeds up reads and slows down writes. An orders table with 15 indexes takes
          15 separate tree updates for every single INSERT. A data engineer who adds
          indexes to a production OLTP table for analytical query performance may
          inadvertently slow down the application that writes to that table.
          Always check write volume before adding indexes to production tables.
          For analytics, the answer is usually to query the data warehouse instead —
          not to add indexes to the OLTP source.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Buffer Pool ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Buffer Pool" />
        <SectionTitle>The Buffer Pool — The Most Important Performance Variable</SectionTitle>

        <Para>
          A database's buffer pool (also called page cache or shared buffers) is the
          in-memory cache between the disk and the query engine. When the database
          needs a page — a 8 KB block of data from a table or index — it first checks
          whether that page is already in the buffer pool. A cache hit means reading
          from RAM in nanoseconds. A cache miss means reading from disk in milliseconds.
          The ratio between hits and misses determines 80% of database performance.
        </Para>

        <SubTitle>How the buffer pool works</SubTitle>

        <CodeBox label="Buffer pool operation — cache hit vs cache miss">{`Buffer pool: 4 GB RAM allocated to PostgreSQL shared_buffers

State before a query runs:
  Buffer pool (4 GB): [page_1847, page_9234, page_2341 ... 500,000 pages cached]

QUERY: SELECT * FROM orders WHERE order_id = 9284751

Step 1: Query executor needs leaf page of orders index (page_8823)
  → Check buffer pool: page_8823 is in cache? YES → cache hit
  → Read from RAM: ~100 nanoseconds

Step 2: Follow row pointer to data page (page_44219)
  → Check buffer pool: page_44219 in cache? NO → cache miss
  → Read from disk: ~1 millisecond (10,000× slower than RAM)
  → Load page_44219 into buffer pool (evict least-recently-used page)

Step 3: Return row data to client

BUFFER POOL EVICTION (when cache is full):
  PostgreSQL uses Clock Sweep (approximate LRU):
    Each page has a usage counter
    Pages used recently have higher counters
    When eviction needed, scan and evict first page with counter = 0
    Dirty pages (modified but not yet written to disk) must be flushed
    before eviction — adds latency

WHY THIS MATTERS FOR DATA ENGINEERS:
  When you run a large analytical query on a production OLTP database,
  it reads millions of pages from disk into the buffer pool.
  This EVICTS the hot pages that application queries use frequently.
  After your analytical query, every application query hits cache misses
  until the buffer pool refills with hot pages.
  
  Result: you ran a "read-only" analytical query and slowed down
  the production application for the next 10–30 minutes.
  This is why analytical queries must NOT run on production databases.`}</CodeBox>

        <SubTitle>Buffer pool sizing — why it matters so much</SubTitle>

        <Para>
          PostgreSQL's default <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>shared_buffers</code> setting
          is 128 MB — far too small for any production workload.
          The recommended setting is 25% of total RAM. On a 64 GB server, that is 16 GB
          of buffer pool. A properly sized buffer pool means frequently-accessed data
          lives in RAM permanently and query performance is consistently fast. An
          undersized buffer pool means constant cache misses and slow, variable query
          performance.
        </Para>

        <CodeBox label="Buffer pool hit ratio — the key performance metric">{`Buffer pool hit ratio = (cache hits) / (cache hits + cache misses) × 100%

-- PostgreSQL: check buffer pool hit ratio
SELECT
    sum(heap_blks_hit) AS cache_hits,
    sum(heap_blks_read) AS disk_reads,
    ROUND(
        sum(heap_blks_hit)::numeric /
        NULLIF(sum(heap_blks_hit) + sum(heap_blks_read), 0) * 100, 2
    ) AS hit_ratio_pct
FROM pg_statio_user_tables;

Interpreting the result:
  > 99%  → Excellent. Frequently-accessed data is in memory.
  95–99% → Good. Some disk reads, acceptable for mixed workloads.
  90–95% → Warning. Significant disk I/O. Consider increasing shared_buffers.
  < 90%  → Problem. Most queries hit disk. Database is I/O bound.
            Either increase RAM, reduce working set size, or both.

Real impact of hit ratio on query latency:
  99% hit ratio:  average page read = 100ns×0.99 + 1ms×0.01 = ~10 μs
  95% hit ratio:  average page read = 100ns×0.95 + 1ms×0.05 = ~50 μs
  80% hit ratio:  average page read = 100ns×0.80 + 1ms×0.20 = ~200 μs
  50% hit ratio:  average page read = 100ns×0.50 + 1ms×0.50 = ~500 μs`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Write-Ahead Log ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Write-Ahead Log (WAL)" />
        <SectionTitle>Write-Ahead Log — Crash Safety, Replication, and CDC</SectionTitle>

        <Para>
          The Write-Ahead Log (WAL) — called the redo log in MySQL and the transaction
          log in SQL Server — is one of the most important concepts in database
          engineering. It is the mechanism that makes databases crash-safe, it is the
          source of replication between primary and replica databases, and it is the
          source of Change Data Capture (CDC) that data engineers use to ingest
          database changes in real-time.
        </Para>

        <SubTitle>What the WAL is and why it exists</SubTitle>

        <Para>
          Every change a database makes to data goes through two steps: write to
          the WAL first, then modify the actual data page in the buffer pool.
          The WAL is a sequential, append-only log of every database operation —
          every INSERT, UPDATE, and DELETE, with enough information to reproduce
          or reverse the operation.
        </Para>

        <Para>
          Why write to the WAL before changing the data? Because the WAL is sequential.
          Sequential writes to disk are dramatically faster than random writes (up to
          100× faster on spinning disks, and still significantly faster on SSDs).
          By writing changes to the WAL first in one sequential pass, and flushing
          the WAL to disk, the database can safely acknowledge a transaction as
          committed even before the actual data pages have been written back to disk.
          If the server crashes before the data pages are written, the database
          replays the WAL at startup to recover the missing writes.
        </Para>

        <CodeBox label="WAL write path — why sequential logging enables fast durable writes">{`WITHOUT WAL (naive approach):
  UPDATE orders SET status = 'delivered' WHERE order_id = 9284751

  1. Find the data page containing order 9284751 (random read)
  2. Modify the status value in the page in buffer pool
  3. Write the modified page to its original disk location (random write)
  4. Return success to application

  Problem: step 3 is a random write — slow.
  If crash between step 2 and step 3: data change is LOST.

WITH WAL (actual approach — PostgreSQL, MySQL, SQL Server):
  1. Find the data page (random read → probably buffer pool hit)
  2. Write WAL record to WAL file (sequential append — very fast):
     {txn_id: 847291, operation: UPDATE, table: orders,
      old: {status: "confirmed"}, new: {status: "delivered"},
      row_pointer: page_44219/slot_7}
  3. Flush WAL file to disk (fsync — ensures durability)
  4. Modify the page in buffer pool (in memory only, not yet on disk)
  5. Return success to application ← WAL guarantees durability

  Data page will be written to disk LATER during checkpoint.
  If crash before checkpoint: replay WAL at startup → data recovered.
  WAL write is sequential → fast even under high write load.

WAL record contains everything needed to reproduce or reverse a change:
  - Transaction ID
  - Table and page location
  - Before image (old values) — used for rollback and MVCC
  - After image (new values) — used for redo on crash recovery`}</CodeBox>

        <SubTitle>WAL as the source of replication</SubTitle>

        <Para>
          Read replicas in PostgreSQL work by streaming the WAL from the primary
          database to the replica and replaying it. The replica receives each WAL
          record, applies the same change to its own copy of the data, and stays
          in sync with the primary. This is called streaming replication, and it is
          the basis of every high-availability database setup in production.
        </Para>

        <SubTitle>WAL as the source of Change Data Capture</SubTitle>

        <Para>
          This is the most relevant WAL concept for data engineers. CDC (Change Data
          Capture) — the technique of capturing every INSERT, UPDATE, and DELETE
          from a database and streaming them into a data pipeline — works by reading
          the WAL. Tools like Debezium read the PostgreSQL WAL through its logical
          replication protocol, decode each change record, and publish it as a
          structured event to Kafka. This enables near-real-time data pipelines
          without polling the source database repeatedly.
        </Para>

        <CodeBox label="CDC from WAL — how Debezium turns WAL records into pipeline events">{`PostgreSQL WAL record (internal binary format):
  {lsn: 0/1A3F2B8, txn: 847291, op: UPDATE, rel: orders,
   old: {order_id:9284751, status:"confirmed"},
   new: {order_id:9284751, status:"delivered"}}

Debezium decodes WAL → structured Kafka event:
{
  "before": {
    "order_id": 9284751,
    "status": "confirmed"
  },
  "after": {
    "order_id": 9284751,
    "status": "delivered"
  },
  "op": "u",                    ← u=update, c=create, d=delete
  "ts_ms": 1710698072847,       ← timestamp of the change
  "source": {
    "db": "production",
    "table": "orders",
    "lsn": 28437128,            ← log sequence number (position in WAL)
    "txId": 847291
  }
}

This Kafka event is published to topic "production.public.orders"
Any consumer (data pipeline, search indexer, cache invalidator)
can subscribe and react to every database change in near-real-time.

Latency: change committed in PostgreSQL → Kafka event available
         typically 50–500 milliseconds
         
Key benefit for data engineers: your data lake sees every change
within seconds, not the next morning's batch.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Transactions and MVCC ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Transactions and MVCC" />
        <SectionTitle>Transactions, ACID, and MVCC — How Databases Handle Concurrency</SectionTitle>

        <Para>
          A transaction is a group of database operations that execute as a single
          atomic unit — either all succeed together or all fail together with no
          partial state left behind. Transactions are what make databases safe for
          concurrent use by thousands of connections simultaneously. Without
          transaction semantics, concurrent reads and writes produce inconsistent,
          corrupt, or impossible data.
        </Para>

        <SubTitle>ACID — the four guarantees of a transaction</SubTitle>

        {[
          {
            letter: 'A',
            word: 'Atomicity',
            color: '#00e676',
            def: 'All operations in a transaction succeed together, or none of them do. A bank transfer subtracts from account A and adds to account B. If anything fails between the two operations, both are rolled back. The money is never lost and never duplicated.',
            real: 'A Stripe payment: debit the customer\'s account and credit the merchant\'s account as one atomic operation. If the credit fails, the debit is automatically reversed.',
          },
          {
            letter: 'C',
            word: 'Consistency',
            color: '#7b61ff',
            def: 'A transaction takes the database from one valid state to another valid state. All constraints, foreign keys, and business rules are satisfied both before and after. A transaction that would violate a constraint is aborted entirely.',
            real: 'An order cannot be placed for a restaurant_id that does not exist in the restaurants table. The FOREIGN KEY constraint prevents this, and any transaction that tries to create such an order fails.',
          },
          {
            letter: 'I',
            word: 'Isolation',
            color: '#f97316',
            def: 'Concurrent transactions are isolated from each other — a transaction in progress cannot see uncommitted changes made by another transaction. Each transaction appears to execute as if it were the only transaction running.',
            real: 'Two data engineers running queries simultaneously on a production database cannot see each other\'s in-progress changes. One engineer\'s half-completed UPDATE is invisible to the other until it is committed.',
          },
          {
            letter: 'D',
            word: 'Durability',
            color: '#4285f4',
            def: 'Once a transaction commits, its changes are permanent — they survive system crashes, power failures, and restarts. This is why the WAL exists: the committed transaction is in the WAL before the "committed" response is sent to the client.',
            real: 'An order that was committed at 8:14 PM is still in the database after a server crash and restart at 8:15 PM. The WAL replay on restart recovers it.',
          },
        ].map((item) => (
          <div key={item.letter} style={{
            display: 'flex', gap: 16, marginBottom: 14, alignItems: 'flex-start',
          }}>
            <div style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 10,
              background: `${item.color}15`, border: `2px solid ${item.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 900, color: item.color,
              fontFamily: 'var(--font-display)',
            }}>{item.letter}</div>
            <div style={{
              flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 18px',
            }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>{item.word}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                {item.def}
              </div>
              <div style={{
                fontSize: 12, color: item.color,
                borderLeft: `2px solid ${item.color}40`,
                paddingLeft: 10, lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                Real example: {item.real}
              </div>
            </div>
          </div>
        ))}

        <SubTitle>MVCC — how isolation works without blocking reads</SubTitle>

        <Para>
          The naive way to implement isolation would be to lock every row being read
          or written so other transactions cannot touch it. This works but causes
          read queries to wait for write transactions to complete, and write transactions
          to wait for read queries to finish — a serial bottleneck that makes concurrent
          databases slow.
        </Para>

        <Para>
          Modern databases — PostgreSQL, Oracle, MySQL InnoDB — use a technique called
          MVCC (Multi-Version Concurrency Control) that allows readers and writers to
          operate concurrently without blocking each other, by giving each transaction
          a consistent snapshot of the data as it existed at a specific point in time.
        </Para>

        <CodeBox label="MVCC — how multiple versions coexist in the database">{`PostgreSQL MVCC mechanism:

Every row has two hidden fields:
  xmin: transaction ID that created this row version
  xmax: transaction ID that deleted this row version (0 if not deleted)

Timeline:
  T=100 (txn 100): INSERT order {id:9284751, status:'placed'}
    Row: {id:9284751, status:'placed',  xmin:100, xmax:0}

  T=200 (txn 200): UPDATE status = 'confirmed'
    OLD row: {id:9284751, status:'placed',    xmin:100, xmax:200}  ← marked deleted
    NEW row: {id:9284751, status:'confirmed', xmin:200, xmax:0}    ← new version

  T=300 (txn 300): UPDATE status = 'delivered'
    OLD row: {id:9284751, status:'confirmed', xmin:200, xmax:300}  ← marked deleted
    NEW row: {id:9284751, status:'delivered', xmin:300, xmax:0}    ← current version

  All three versions exist on disk simultaneously!

NOW: two concurrent queries run at T=250:

  QUERY A (analyst, started before txn 300):
    Snapshot: sees all transactions committed before T=250
    Sees: status='confirmed' (txn 200 committed, txn 300 not yet)
    Returns: 'confirmed'

  QUERY B (application write, started at T=300):
    Sees: status='delivered' (txn 300 committed)
    Returns: 'delivered'

NEITHER QUERY BLOCKED THE OTHER.
Readers see a consistent point-in-time snapshot.
Writers create new row versions, not locking old ones.

This is why SELECT queries in PostgreSQL never block UPDATE queries
and UPDATE queries never block SELECT queries.

VACUUM: old row versions are eventually cleaned up by the
        background VACUUM process once no transaction can see them.
        Without VACUUM, the table grows forever (table bloat).`}</CodeBox>

        <Callout type="info">
          <strong>Why MVCC matters for data engineers:</strong> CDC tools like Debezium
          read old row versions from the WAL during high-load periods. Table bloat
          from insufficient vacuuming can slow down CDC reads. Long-running
          transactions (like a slow batch ingestion that holds a transaction open
          for hours) prevent VACUUM from reclaiming old versions, causing table bloat.
          If your CDC pipeline is falling behind, check for long-running transactions
          on the source database.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Query Execution ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Query Execution" />
        <SectionTitle>How a SQL Query Becomes a Physical Execution Plan</SectionTitle>

        <Para>
          When you run a SQL query, the database does not execute it literally in
          the order you wrote it. It parses the SQL, builds a logical plan, optimises
          it into a physical plan, and then executes the physical plan. Understanding
          this process is what allows you to read EXPLAIN output, understand why
          the database chose one plan over another, and rewrite queries that choose
          inefficient plans.
        </Para>

        <CodeBox label="Query execution pipeline — from SQL string to result rows">{`SQL string: SELECT c.name, SUM(o.amount) as total
            FROM orders o
            JOIN customers c ON o.customer_id = c.id
            WHERE o.created_at >= '2026-01-01'
            GROUP BY c.name
            ORDER BY total DESC
            LIMIT 10

STEP 1: PARSING
  Lexer tokenises: [SELECT, c.name, SUM, (, o.amount, ), ...]
  Parser builds Abstract Syntax Tree (AST)
  Validates syntax — catches typos, missing clauses

STEP 2: SEMANTIC ANALYSIS
  Resolves table and column names against catalog
  Validates types: created_at >= '2026-01-01' — date comparison valid?
  Expands SELECT * to explicit column names if needed

STEP 3: LOGICAL PLAN
  Relational algebra tree — what to compute, not how:
    Limit(10)
      Sort(total DESC)
        Aggregate(GROUP BY c.name, SUM(o.amount))
          Join(o.customer_id = c.id)
            Filter(o.created_at >= '2026-01-01')
              Scan(orders)
            Scan(customers)

STEP 4: OPTIMISATION (the most important step)
  Query optimizer rewrites the logical plan for efficiency:
    - Push filters DOWN before joins (filter orders before joining customers)
    - Choose join algorithm: hash join? merge join? nested loop?
    - Choose index scans vs sequential scans based on statistics
    - Decide join order (smaller table first)
  
  Statistics used: row counts, column cardinality, value distributions
  Optimizer estimates cost of each plan in abstract "cost units"
  Chooses plan with lowest estimated cost

STEP 5: PHYSICAL PLAN
  Concrete execution plan with specific algorithms:
    Limit
      Sort (external sort — result too large for memory)
        HashAggregate (hash table for GROUP BY)
          Hash Join (hash customers table, probe with filtered orders)
            Index Scan on idx_orders_created_at (filter pushdown)
            Sequential Scan on customers

STEP 6: EXECUTION
  Each node in the plan pulls rows from its children (volcano model)
  Rows flow up the plan from leaf nodes to the root
  Result returned to client

To see the plan PostgreSQL chose:
  EXPLAIN ANALYZE SELECT ... (same query)
  Shows: plan nodes, estimated vs actual rows, actual timing per node`}</CodeBox>

        <SubTitle>Reading EXPLAIN output — the most practical skill for query optimisation</SubTitle>

        <CodeBox label="EXPLAIN ANALYZE output — how to read it">{`EXPLAIN ANALYZE
  SELECT * FROM orders WHERE city = 'Seattle' AND amount > 1000;

Output:
  Bitmap Heap Scan on orders  (cost=892.14..4821.33 rows=12847 width=89)
                               (actual time=12.847..89.234 rows=13102 loops=1)
    Recheck Cond: (city = 'Seattle')
    Filter: (amount > 1000::numeric)
    Rows Removed by Filter: 28432
    ->  Bitmap Index Scan on idx_orders_city
                             (cost=0.00..888.93 rows=41279 width=0)
                             (actual time=11.234..11.234 rows=41534 loops=1)
          Index Cond: (city = 'Seattle')
  Planning Time: 0.847 ms
  Execution Time: 94.127 ms

HOW TO READ THIS:
  "cost=892.14..4821.33" → estimated cost (startup..total) in arbitrary units
  "rows=12847"           → estimated number of rows (optimizer's guess)
  "actual time=12.847..89.234" → actual timing in milliseconds
  "rows=13102"           → actual rows returned (compare to estimate!)
  "Rows Removed by Filter: 28432" → 28k rows passed index but failed amount filter

KEY INSIGHT from this output:
  The index returned 41,534 rows for city='Seattle'
  But only 13,102 had amount > 1000 (filter removed 28,432)
  
  This means a composite index on (city, amount) would be better:
  CREATE INDEX idx_orders_city_amount ON orders(city, amount);
  New plan would return only ~13,102 rows from the index directly,
  skipping the 28,432 wasted reads.

Warning sign: estimated rows vs actual rows differ by 10×+
  Means statistics are stale → run ANALYZE to update them`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — OLTP vs OLAP ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — OLTP vs OLAP" />
        <SectionTitle>OLTP vs OLAP — Two Fundamentally Different Database Designs</SectionTitle>

        <Para>
          Now that you understand the internals, the OLTP vs OLAP distinction becomes
          fully clear. These are not just two categories of databases — they are two
          fundamentally different design philosophies optimised for completely
          different workloads.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'OLTP', color: '#00e676' },
            { label: 'OLAP', color: '#7b61ff' },
          ]}
          keys={['dim', 'oltp', 'olap']}
          rows={[
            { dim: 'Stands for', oltp: 'Online Transaction Processing', olap: 'Online Analytical Processing' },
            { dim: 'Primary purpose', oltp: 'Run the business — record and retrieve individual transactions fast', olap: 'Analyse the business — aggregate large volumes of historical data' },
            { dim: 'Query pattern', oltp: 'Read/write individual rows by primary key or indexed lookup', olap: 'Scan millions of rows, aggregate columns, compute metrics' },
            { dim: 'Storage layout', oltp: 'Row-oriented (all columns of a row together)', olap: 'Columnar (all values of a column together)' },
            { dim: 'Optimised for', oltp: 'Low latency individual operations (< 10ms)', olap: 'High throughput analytical scans (seconds to minutes)' },
            { dim: 'Concurrent users', oltp: 'Thousands of concurrent writers + readers', olap: 'Tens of analysts, not thousands of app connections' },
            { dim: 'Data volume', oltp: 'Current/recent operational data (GB to low TB)', olap: 'Full historical data (TB to PB)' },
            { dim: 'Schema style', oltp: 'Normalised (3NF) — data in one place, JOINs required', olap: 'Denormalised — pre-joined for fast query performance' },
            { dim: 'Indexes', oltp: 'Many indexes on common lookup columns', olap: 'Partitioning + clustering keys instead of traditional indexes' },
            { dim: 'Transactions', oltp: 'Full ACID, high-concurrency write transactions', olap: 'Append-only or batch load — minimal concurrent writes' },
            { dim: 'Examples', oltp: 'PostgreSQL, MySQL, SQL Server, Oracle', olap: 'Snowflake, BigQuery, Redshift, Azure Synapse, ClickHouse' },
          ]}
        />

        <Para>
          The data engineer's job is to bridge these two worlds — extract data from
          OLTP systems where it is created and load it into OLAP systems where it
          can be efficiently analysed. Understanding why you cannot run analytical
          queries on OLTP systems (buffer pool pollution, write amplification from
          index scans, contention with application queries) and why you cannot run
          application transactions on OLAP systems (no row-level locks, no fast
          primary-key lookups, slow individual writes) is fundamental knowledge.
        </Para>
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
        <SectionTitle>Diagnosing a Slow Pipeline Using Database Internals</SectionTitle>

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
            Scenario — Fintech Company · Pipeline Suddenly Slow
          </div>

          <Para>
            Your daily ingestion pipeline pulls the last 24 hours of transactions
            from PostgreSQL. It runs every morning at 5 AM and normally finishes
            in 18 minutes. This morning it ran for 3 hours and is still going when
            you arrive at 9 AM. Nothing in the pipeline code changed. What happened?
          </Para>

          <Para>
            <strong>Step 1 — Check if the query is running:</strong> You connect
            to PostgreSQL and run{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              SELECT pid, query, state, wait_event_type, wait_event, query_start FROM pg_stat_activity
            </code>.
            You find your ingestion query in the "active" state with
            wait_event_type = "Lock". It is waiting for a lock.
          </Para>

          <Para>
            <strong>Step 2 — Find the blocking query:</strong> You run{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              SELECT * FROM pg_blocking_pids(pid)
            </code>{' '}
            on your ingestion process. It returns a PID. You check that PID — it is
            a transaction started at 11 PM last night (10 hours ago) by a developer
            running an ad-hoc UPDATE statement that never committed. It has been
            sitting with an open transaction, holding row locks, for 10 hours.
          </Para>

          <Para>
            <strong>Step 3 — Understand why this blocked you:</strong> Your ingestion
            query uses REPEATABLE READ isolation and was waiting for consistent
            snapshot data. The open transaction was holding locks on rows your query
            needed to read, causing a lock wait. This is the isolation mechanism
            working as designed — protecting you from reading uncommitted data —
            but the developer's abandoned transaction is blocking the entire pipeline.
          </Para>

          <Para>
            <strong>Step 4 — Resolution:</strong> You confirm with the developer that
            the transaction can be safely terminated (it was a test query that was
            never meant to stay open). You run{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              SELECT pg_terminate_backend(pid)
            </code>.
            The blocking transaction is terminated, the row locks are released,
            and your ingestion pipeline completes in 19 minutes.
          </Para>

          <Para>
            <strong>The fix going forward:</strong> You set{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              idle_in_transaction_session_timeout = '30min'
            </code>{' '}
            on the PostgreSQL server — any transaction that sits idle for more than
            30 minutes without executing a query is automatically terminated.
            This prevents a single forgotten developer query from blocking production
            pipelines overnight.
          </Para>

          <Para>
            This scenario plays out at real companies regularly. The data engineer
            who understands database internals — transactions, locks, MVCC, pg_stat_activity —
            diagnoses and resolves it in 20 minutes. The one who does not spends
            hours restarting the pipeline, escalating to DBAs, and not understanding why.
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
            q: 'Q1. What is a database index and what are the trade-offs of adding one?',
            a: `A database index is a separate data structure — most commonly a B-tree — that the database maintains alongside a table to enable fast lookups on specific columns without scanning every row. The index stores the indexed column values in sorted order with pointers back to the full rows, allowing the query engine to navigate directly to matching rows in O(log n) time.

The trade-off is straightforward: indexes speed up reads and slow down writes. For every INSERT, UPDATE, or DELETE that affects an indexed column, the database must also update the corresponding index structure. A table with 10 indexes requires 10 index updates for every single row insertion.

For a data warehouse or analytical table with rare writes and frequent reads, this trade-off strongly favours adding indexes. For a high-write OLTP table like an orders table receiving thousands of inserts per second, adding indexes has a measurable throughput cost. The right number of indexes is the minimum set that covers the most performance-critical queries.

The third consideration is storage: each index requires additional disk space — typically 10–30% of the table's size for a single-column B-tree index. A table with 10 indexes can use 2–3× its raw data size just for indexes.`,
          },
          {
            q: 'Q2. Explain Write-Ahead Logging and why it is important for data engineering.',
            a: `Write-Ahead Logging (WAL) is the mechanism by which databases guarantee durability and enable crash recovery. The principle is: every change is written to the WAL — a sequential, append-only log — before the actual data pages are modified. Once a WAL record is durably flushed to disk, the database can acknowledge the transaction as committed, even if the data page has not yet been written to its permanent location. If the server crashes, the WAL is replayed on restart to apply all changes that were committed but not yet reflected in the data files.

WAL is important for data engineers for three reasons beyond its role in crash recovery.

First, it is the source of database replication. Read replicas in PostgreSQL work by streaming WAL records from the primary to the replica and replaying them — the replica stays in sync by applying the same changes in order.

Second, it is the source of Change Data Capture. Tools like Debezium read the PostgreSQL WAL through its logical replication interface, decode each change record, and publish INSERT, UPDATE, and DELETE events to Kafka. This enables near-real-time data pipelines that react to database changes within seconds rather than waiting for the next batch run.

Third, understanding WAL explains pipeline failure modes — replication lag, CDC consumer lag, and the reason why long-running transactions on a source database can stall both replication and CDC consumers.`,
          },
          {
            q: 'Q3. What is MVCC and how does it affect how you read data from a database in a pipeline?',
            a: `MVCC (Multi-Version Concurrency Control) is the mechanism by which databases allow concurrent readers and writers to operate without blocking each other. Instead of locking rows being read, the database maintains multiple versions of each row — one per committed transaction that modified it. Each transaction receives a snapshot: a consistent view of the database as it existed at the moment the transaction started. The transaction sees only the row versions committed before its snapshot timestamp.

The practical implication for data pipelines is that a long-running ingestion query reading a large table will see the database as it existed when the query started, even if other transactions are modifying rows during the query execution. This is generally the correct behaviour — you want a consistent snapshot of the table, not a mix of old and new values depending on when each page was read.

However, MVCC creates a specific pipeline concern: table bloat. Old row versions cannot be reclaimed by VACUUM while any transaction holds a snapshot older than those versions. A pipeline that opens a transaction, queries a large table slowly over several hours, and keeps the transaction open prevents all old row versions created during that window from being cleaned up. If this happens regularly, the table accumulates dead row versions, grows significantly larger than its live data, and queries slow down because they must read and skip dead versions.

The fix: use the smallest possible transaction scope in ingestion queries, set appropriate idle_in_transaction_session_timeout on the source database, and monitor for table bloat with pg_stat_user_tables.`,
          },
          {
            q: 'Q4. Your ingestion query takes 2 minutes to extract 1 million rows from a PostgreSQL table. What would you investigate first?',
            a: `I would start by running EXPLAIN ANALYZE on the ingestion query to see the execution plan and identify where time is being spent.

The three most common causes of slow extraction queries and how I identify each:

Full table scan on a large table: EXPLAIN shows "Seq Scan" on a large table. This means no index is being used. Check whether the WHERE clause column has an index — if the query filters by updated_at for incremental extraction, there should be an index on updated_at. If the index exists but is not being used, check whether the statistics are stale (run ANALYZE) and whether PostgreSQL's planner underestimates the selectivity of the filter.

Insufficient buffer pool: the query is doing many physical disk reads (shown in EXPLAIN ANALYZE as high "blocks read" count). This indicates the table data is not cached. For a table that is queried regularly, most pages should be in the buffer pool. If they are not, either the buffer pool is undersized or a large query recently evicted the hot pages.

Lock waiting: the query is in "active" state but not progressing. Check pg_stat_activity for wait_event_type = "Lock". If another transaction is holding locks on rows this query needs, it will wait. Identify and terminate the blocking transaction if it is safe to do so.

If none of these explain the 2-minute runtime, I check network latency between the database and the pipeline runner — a slow network connection reading 1 million rows can be the bottleneck if the rows are large and bandwidth is limited.`,
          },
          {
            q: 'Q5. Why should data engineers never run analytical queries directly on production OLTP databases?',
            a: `Running analytical queries on a production OLTP database causes two categories of harm: harm to the application and harm to the analysis itself.

The harm to the application: an analytical query scanning millions of rows reads enormous amounts of data from disk into the database's buffer pool. This evicts the hot pages that application queries rely on for fast response times. The application's cache hit ratio drops from 99% to 80% or lower, causing every subsequent application query to hit disk instead of RAM. The result is a 5–20× slowdown in application query latency that persists for minutes to hours after the analytical query completes. During this period, the production application is effectively degraded by a query that was supposed to be read-only.

Additionally, analytical scans consume significant CPU and I/O bandwidth. On a database server that is already at 70% CPU capacity handling application traffic, a large analytical query can push it to 100%, causing application queries to queue and time out.

The harm to the analysis: OLTP databases are row-oriented and normalised. An analytical query that needs to aggregate data across millions of rows and join several tables runs fundamentally slower than the same query on a columnar data warehouse. A query that takes 45 minutes on PostgreSQL might take 4 seconds on BigQuery or Snowflake, because the warehouse's columnar layout reads only the necessary columns and uses distributed execution.

The correct architecture: run a scheduled pipeline that copies data from the OLTP database to a data warehouse, and direct all analytical queries to the warehouse. The pipeline can run against a read replica of the OLTP database to avoid even the replication traffic affecting the primary.`,
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
            error: `ERROR: deadlock detected — Process 47291 waits for ShareLock on transaction 84729; blocked by process 58392. Process 58392 waits for ShareLock on transaction 47291; blocked by process 47291.`,
            cause: 'Two transactions are waiting for each other to release locks, creating a circular dependency. Transaction A has locked row X and wants row Y. Transaction B has locked row Y and wants row X. Neither can proceed. PostgreSQL detects this cycle and automatically aborts the transaction that has done less work.',
            fix: 'Ensure all transactions that touch multiple tables or rows always access them in the same order. If pipeline A always updates orders then payments, and pipeline B always updates orders then payments (never the reverse), deadlocks cannot occur. For the immediate error: the aborted transaction should be retried. Add retry logic with a short delay to handle intermittent deadlocks automatically.',
          },
          {
            error: `WARNING: table "orders" has bloat ratio of 340% — live rows: 12M, dead rows: 28.8M`,
            cause: 'The VACUUM process is not keeping up with the rate of UPDATE and DELETE operations. Each update in PostgreSQL creates a new row version and marks the old one as dead. VACUUM reclaims dead rows but cannot do so while any open transaction holds a snapshot older than those rows. A long-running pipeline transaction or an abandoned developer session is likely preventing VACUUM from cleaning up.',
            fix: 'Identify long-running transactions: SELECT pid, now()-pg_stat_activity.query_start AS duration, query FROM pg_stat_activity WHERE state != \'idle\' ORDER BY duration DESC. Terminate transactions that have been running for hours unnecessarily. Configure autovacuum more aggressively: lower autovacuum_vacuum_scale_factor and autovacuum_vacuum_threshold for high-churn tables. Consider a manual VACUUM ANALYZE on the affected table.',
          },
          {
            error: `Debezium connector error: ERROR: logical replication slot "debezium_slot" requires WAL retention but WAL has been removed up to LSN 0/4A3B2910`,
            cause: 'The Debezium CDC connector fell behind — it was not reading from the WAL fast enough (due to high source write volume, connector downtime, or network issues). PostgreSQL\'s WAL retention is finite — it only keeps WAL files needed by the oldest replication slot consumer. When Debezium fell behind, PostgreSQL continued writing new WAL and deleting old WAL that was no longer needed. The connector is now trying to read WAL that has already been deleted.',
            fix: 'The slot position is no longer valid — the connector cannot resume from where it left off. The replication slot must be dropped and recreated, and the connector must perform a full initial snapshot of the source tables to rebuild its baseline. Prevent recurrence by: monitoring Debezium consumer lag and alerting when it grows; increasing wal_keep_size on PostgreSQL to retain more WAL; ensuring the Debezium connector has sufficient resources to keep up with source write volume.',
          },
          {
            error: `sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) FATAL: remaining connection slots are reserved for non-replication superuser connections`,
            cause: 'PostgreSQL has reached its maximum_connections limit (default 100). The database cannot accept any new connections. This happens when a pipeline creates too many connections — either by not using a connection pool, or by opening many parallel connections for parallelised extraction, or by failing to close connections after use.',
            fix: 'Immediately: identify and terminate idle connections with SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = \'idle\' AND query_start < NOW() - INTERVAL \'10 minutes\'. Long-term: always use a connection pool (SQLAlchemy\'s pool_size and max_overflow parameters, or an external pooler like PgBouncer). Never create one connection per thread in a parallelised pipeline — share a pool. Set pool_pre_ping=True to handle stale connections automatically.',
          },
          {
            error: `Query plan changed after ANALYZE — was using idx_orders_created_at, now doing Seq Scan on orders (25× slower)`,
            cause: 'PostgreSQL\'s query planner updated its statistics after ANALYZE and is now estimating that a sequential scan is cheaper than the index scan for this query. This often happens when the data distribution changed significantly — perhaps the orders table grew much larger, or the created_at column values became more clustered, making the planner think the index would return too many rows to be more efficient than a seq scan.',
            fix: 'Run EXPLAIN ANALYZE on the query and check the estimated vs actual row counts. If the estimate is wildly wrong, statistics may not reflect reality even after ANALYZE — increase statistics collection target: ALTER TABLE orders ALTER COLUMN created_at SET STATISTICS 500. If the planner is consistently wrong for this query, use a partial index covering only the specific range your query uses most, or use CREATE INDEX with a WHERE clause. As a last resort, use enable_seqscan = off in a session to force the planner to prefer index scans for diagnostic purposes.',
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
        'Every database is built on six internal concepts: storage engine, B-tree index, buffer pool, Write-Ahead Log, transactions and MVCC, and query execution. Learn these once and every database you encounter becomes understandable.',
        'B-tree storage engines store data in fixed-size pages organised as a tree. Lookups are O(log n) — fast. Full table scans read every page — slow. LSM-tree engines append writes to memory and flush to immutable disk files — writes are faster, reads require checking multiple files.',
        'A B-tree index allows the query engine to jump directly to matching rows without scanning the whole table. Without an index on a filter column, every query is a full scan. The cost of an index is write overhead — every INSERT, UPDATE, or DELETE must also update all indexes on the table.',
        'The buffer pool is the in-memory cache between disk and queries. A 99% cache hit ratio means queries read mostly from RAM. Running a large analytical scan on an OLTP database evicts hot pages from the buffer pool, slowing down application queries for minutes to hours after the scan completes.',
        'The Write-Ahead Log (WAL) makes databases crash-safe by recording every change before modifying data pages. WAL is also the source of replication (replicas stream and replay WAL) and Change Data Capture (Debezium reads WAL to publish database changes to Kafka in near-real-time).',
        'MVCC (Multi-Version Concurrency Control) allows readers and writers to operate concurrently without blocking each other. Each transaction sees a consistent snapshot of the database as it existed when the transaction started. Old row versions accumulate as dead rows and must be reclaimed by VACUUM.',
        'Long-running pipeline transactions prevent VACUUM from reclaiming dead row versions, causing table bloat. Always keep transaction scope as small as possible in ingestion code. Set idle_in_transaction_session_timeout on source databases to auto-terminate abandoned sessions.',
        'The query executor translates SQL into a physical plan via parsing, semantic analysis, logical planning, optimisation, and execution. EXPLAIN ANALYZE shows the actual plan chosen, estimated vs actual row counts, and timing per node — essential for diagnosing slow queries.',
        'OLTP databases are row-oriented, normalised, and optimised for fast individual record access under high write concurrency. OLAP databases are columnar, denormalised, and optimised for fast aggregation over large datasets. Never run analytical queries on OLTP databases — the buffer pool pollution alone degrades the application.',
        'The most practical database internals skills for a data engineer: reading EXPLAIN ANALYZE output, identifying and terminating blocking transactions with pg_stat_activity, monitoring buffer pool hit ratio, understanding why WAL is the source of CDC, and knowing when table bloat is causing slow queries.',
      ]} />

    </LearnLayout>
  )
}