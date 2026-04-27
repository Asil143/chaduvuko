import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
import Link from 'next/link';

const C = '#06b6d4';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 95 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ label, code }: { label: string; code: string }) => (
  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0 24px' }}>
    <div style={{ padding: '8px 14px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{label}</span>
    </div>
    <pre style={{ margin: 0, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{code}</pre>
  </div>
);

const IdxCard = ({ type, color, structure, fast, slow, use }: {
  type: string; color: string; structure: string; fast: string; slow: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{type}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 12 }}>
      {[['Structure', structure], ['Fast for', fast], ['Slow / cannot use', slow], ['Best for', use]].map(([label, val]) => (
        <div key={label}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Indexes() {
  return (
    <LearnLayout
      title="Indexes"
      description="How databases find rows without scanning every row — B-tree, hash, composite, partial, and functional indexes; when to create them; and diagnosing slow queries with EXPLAIN ANALYZE"
      section="SQL — Module 46"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem Indexes Solve" />

      <P>Without an index, finding a row with a specific value requires the database to read <Hl>every row in the table</Hl> and check whether it matches the condition. This is called a <Hl>sequential scan</Hl> (or full table scan). For a table with 10 rows it is instant. For a table with 10 million rows it means reading and checking 10 million rows for every query — even if only one row matches.</P>

      <P>An index is a separate data structure that the database maintains alongside the table. It stores a sorted mapping from column values to the physical location of matching rows. Instead of reading every row, the database looks up the value in the index (fast — like a sorted phone book), finds the row location, and jumps directly to that row. Finding one row in 10 million takes the same time as finding one row in 100.</P>

      <CodeBlock
        label="Sequential scan vs index scan — the difference"
        code={`-- Without an index on customer_id:
-- Database reads ALL rows in orders table
-- For each row: check if customer_id = 42
-- Returns matching rows after scanning everything
-- Cost: O(n) — proportional to table size
SELECT * FROM orders WHERE customer_id = 42;

-- With an index on orders(customer_id):
-- Database looks up 42 in the index tree
-- Index points to exact physical row locations
-- Database fetches only those rows
-- Cost: O(log n) — proportional to index depth (much smaller)
SELECT * FROM orders WHERE customer_id = 42;

-- The query syntax is identical — the difference is invisible to the writer
-- Only EXPLAIN ANALYZE reveals which path the database chose`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="How B-Tree Indexes Work" />

      <P>The default index type in PostgreSQL and most databases is the <Hl>B-tree</Hl> (balanced tree). Understanding its structure explains which queries benefit from it and which do not.</P>

      <P>A B-tree index is a sorted tree where every leaf node points to actual table rows. The tree is balanced — every leaf is at the same depth, so every lookup takes the same number of steps regardless of which value is being searched. For a table with 1 million rows, a B-tree typically has depth 3-4 — meaning 3-4 page reads to find any value, versus 1 million page reads for a sequential scan.</P>

      <CodeBlock
        label="What a B-tree index enables"
        code={`-- B-tree supports:
-- ✅ Equality:          WHERE col = value
-- ✅ Range:             WHERE col > value  /  col BETWEEN a AND b
-- ✅ Starts-with LIKE:  WHERE col LIKE 'prefix%'
-- ✅ IS NULL / NOT NULL (PostgreSQL includes NULLs in B-tree)
-- ✅ ORDER BY col       (index already sorted — no sort step needed)
-- ✅ MIN / MAX          (first / last leaf in the index)
-- ✅ Composite leading: WHERE (a, b) — index on (a, b, c) used for (a) or (a,b)

-- B-tree CANNOT help with:
-- ❌ LIKE with leading wildcard: WHERE col LIKE '%suffix' (must scan all values)
-- ❌ Arbitrary functions:        WHERE LOWER(col) = 'x' (value transformed before compare)
-- ❌ Full-text search:           use GIN index + tsvector instead
-- ❌ Geometric / spatial data:   use GiST or BRIN index instead`}
      />

      <SQLPlayground
        initialQuery={`-- All of these benefit from an index on order_date:
-- Equality
SELECT COUNT(*) FROM orders WHERE order_date = '2024-01-15';

-- Range
SELECT COUNT(*) FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';

-- Greater than
SELECT COUNT(*) FROM orders
WHERE order_date >= '2024-02-01';

-- ORDER BY uses index ordering (no sort needed)
SELECT order_id, order_date, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 5;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Creating and Dropping Indexes" />

      <CodeBlock
        label="Index DDL — CREATE, DROP, naming conventions"
        code={`-- Basic index
CREATE INDEX idx_orders_customer_id
  ON orders(customer_id);

-- Naming convention: idx_tablename_columnname(s)
-- idx_orders_customer_id
-- idx_orders_store_id
-- idx_orders_customer_store  (composite)
-- idx_orders_status_date      (composite)

-- UNIQUE index — enforces uniqueness AND speeds up lookups
CREATE UNIQUE INDEX idx_customers_email
  ON customers(email);

-- Composite index — covers multiple columns
CREATE INDEX idx_orders_store_date
  ON orders(store_id, order_date);

-- Partial index — only indexes rows matching a condition
CREATE INDEX idx_orders_delivered
  ON orders(order_date)
  WHERE order_status = 'Delivered';

-- Functional (expression) index — indexes the result of a function
CREATE INDEX idx_customers_email_lower
  ON customers(LOWER(email));

-- CONCURRENT creation — does not lock the table (production safe)
CREATE INDEX CONCURRENTLY idx_orders_customer_id
  ON orders(customer_id);

-- Drop
DROP INDEX idx_orders_customer_id;
DROP INDEX IF EXISTS idx_orders_customer_id;

-- Check existing indexes on a table (PostgreSQL)
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders';`}
      />

      <SQLPlayground
        initialQuery={`-- Check what indexes exist on the FreshCart tables (SQLite)
SELECT
  tbl_name  AS tablename,
  name      AS indexname,
  sql       AS indexdef
FROM sqlite_master
WHERE type = 'index'
  AND tbl_name IN ('orders', 'customers', 'products', 'order_items', 'stores', 'employees')
ORDER BY tbl_name, name;`}
        height={175}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Index Types — Choosing the Right One" />

      <IdxCard
        type="B-tree (default)"
        color={C}
        structure="Sorted balanced tree"
        fast="=, <, >, BETWEEN, LIKE 'prefix%', ORDER BY, MIN, MAX"
        slow="LIKE '%suffix', arbitrary functions on column"
        use="Almost everything — FK columns, date ranges, sorted queries"
      />
      <IdxCard
        type="Hash"
        color="#10b981"
        structure="Hash table"
        fast="= (equality only) — slightly faster than B-tree for pure equality"
        slow="Range queries, ORDER BY, anything other than ="
        use="Pure equality lookups on very large tables — rare in practice"
      />
      <IdxCard
        type="GIN (Generalized Inverted Index)"
        color="#8b5cf6"
        structure="Inverted list of values → rows"
        fast="Full-text search, array containment (@>), JSONB key lookup"
        slow="Equality on simple scalar columns"
        use="Full-text search (tsvector), JSONB columns, array columns"
      />
      <IdxCard
        type="GiST (Generalized Search Tree)"
        color="#f97316"
        structure="Pluggable tree structure"
        fast="Geometric shapes, ranges, nearest-neighbour, full-text"
        slow="Exact equality on scalar columns"
        use="PostGIS geometry, RANGE types, tsvector with ranking"
      />
      <IdxCard
        type="BRIN (Block Range Index)"
        color="#f59e0b"
        structure="Min/max values per disk block range"
        fast="Range scans on naturally ordered data (timestamps, sequential IDs)"
        slow="Random-order data, equality lookups"
        use="Massive append-only tables (logs, events) with naturally ordered timestamps"
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Composite Indexes — Multi-Column Indexes" />

      <P>A composite index covers multiple columns in a defined order. The <Hl>column order matters critically</Hl> — a composite index on (store_id, order_date) can be used by queries that filter on store_id alone or on (store_id, order_date) together, but NOT by queries that filter on order_date alone without store_id.</P>

      <CodeBlock
        label="Composite index — column order rules"
        code={`-- Index on (store_id, order_date, order_status)
CREATE INDEX idx_orders_store_date_status
  ON orders(store_id, order_date, order_status);

-- ✅ Can use this index — leading column(s) specified:
WHERE store_id = 'ST001'
WHERE store_id = 'ST001' AND order_date = '2024-01-15'
WHERE store_id = 'ST001' AND order_date >= '2024-01-01'
WHERE store_id = 'ST001' AND order_date = '2024-01-15' AND order_status = 'Delivered'

-- ❌ CANNOT use this index — leading column missing:
WHERE order_date = '2024-01-15'             -- no store_id filter
WHERE order_status = 'Delivered'            -- no store_id filter
WHERE order_date = '2024-01-15'
  AND order_status = 'Delivered'             -- store_id still missing

-- ✅ Partial use — index used for leading prefix, then filtered:
-- WHERE store_id = 'ST001' AND order_status = 'Delivered'
-- Uses index to find all ST001 rows, then filters by status in memory
-- (Not as efficient as full composite use but better than full scan)

-- Rule: put the most selective column first (unless equality vs range matters)
-- Rule: equality conditions before range conditions in the column order
-- idx_orders_status_store vs idx_orders_store_status — depends on query pattern`}
      />

      <SQLPlayground
        initialQuery={`-- Queries that WOULD benefit from composite index on (store_id, order_date)
-- (showing query patterns — EXPLAIN would reveal index usage)

-- Pattern 1: Both columns — full composite use
SELECT COUNT(*), ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE store_id  = 'ST001'
  AND order_date BETWEEN '2024-01-01' AND '2024-01-31';

-- Pattern 2: Leading column only — partial composite use
SELECT COUNT(*) FROM orders WHERE store_id = 'ST002';

-- Pattern 3: Non-leading column only — cannot use composite index
-- (would need separate index on order_date alone)
SELECT COUNT(*) FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';`}
        height={215}
        showSchema={true}
      />

      <H>Covering indexes — include all needed columns</H>
      <P>A covering index includes all columns a query needs — the database can answer the query entirely from the index without touching the base table. In PostgreSQL, use INCLUDE to add non-indexed columns to the index leaf nodes.</P>

      <CodeBlock
        label="Covering index with INCLUDE"
        code={`-- Query: SELECT total_amount FROM orders WHERE store_id = 'ST001'
-- Without INCLUDE: index finds row location, fetches row from table for total_amount
-- With INCLUDE:    index already contains total_amount — no table fetch needed

CREATE INDEX idx_orders_store_covering
  ON orders(store_id)
  INCLUDE (total_amount, order_status, order_date);
-- Now: WHERE store_id = 'ST001' returning those columns = index-only scan
-- Significantly faster — zero table heap access

-- When to use INCLUDE:
-- ✅ Column is frequently selected but not filtered on
-- ✅ Table rows are wide (many columns) — heap fetch is expensive
-- ❌ Column changes frequently — maintaining INCLUDE columns adds write overhead`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Partial Indexes — Index Only the Rows You Query" />

      <P>A partial index adds a WHERE clause to the index definition — only rows that satisfy the condition are included in the index. This makes the index smaller, faster to build, faster to search, and cheaper to maintain. It is the right tool when queries consistently filter on a specific subset of rows.</P>

      <CodeBlock
        label="Partial index — only index the rows you care about"
        code={`-- Without partial index: index covers all orders (all statuses)
CREATE INDEX idx_orders_date ON orders(order_date);

-- With partial index: only index Delivered orders
CREATE INDEX idx_orders_delivered_date
  ON orders(order_date)
  WHERE order_status = 'Delivered';

-- This index is used ONLY when the query also has:
-- WHERE order_status = 'Delivered'
-- A query with WHERE order_date = '...' alone uses the full index
-- A query with WHERE order_status = 'Delivered' AND order_date = '...'
--   uses the partial index (smaller, faster)

-- Great use cases for partial indexes:
-- Index only active/live rows:     WHERE is_deleted = false
-- Index only recent data:          WHERE created_at > '2024-01-01'
-- Index only specific status:      WHERE order_status = 'Pending'
-- Index only non-NULL values:      WHERE email IS NOT NULL

-- Size benefit: if only 10% of orders are 'Delivered',
-- the partial index is 10% the size of a full index on order_date`}
      />

      <SQLPlayground
        initialQuery={`-- Partial index benefit example:
-- Most operational queries only care about 'Delivered' orders
-- A partial index on order_date WHERE order_status = 'Delivered'
-- would be ~half the size of a full index and faster to scan

-- Query 1: would use the partial index (status filter matches)
SELECT order_id, order_date, total_amount
FROM orders
WHERE order_status = 'Delivered'
  AND order_date >= '2024-02-01'
ORDER BY order_date DESC;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Functional Indexes — Indexing Expressions" />

      <P>A functional index indexes the <Hl>result of a function</Hl> applied to a column, not the raw column value. This enables index use for queries that apply a function in WHERE — which would otherwise prevent index usage by forcing a full scan.</P>

      <CodeBlock
        label="Functional index — index transformed values"
        code={`-- Problem: case-insensitive search defeats indexes
-- WHERE LOWER(email) = 'user@example.com'
-- → database applies LOWER() to every email row before comparing
-- → cannot use an index on raw email column
-- → full table scan on every login attempt

-- Solution: functional index on LOWER(email)
CREATE INDEX idx_customers_email_lower
  ON customers(LOWER(email));

-- Now: WHERE LOWER(email) = 'user@example.com'
-- → database looks up 'user@example.com' in the LOWER(email) index
-- → O(log n) instead of O(n)

-- More examples:
-- Functional index for DATE_TRUNC grouping:
CREATE INDEX idx_orders_month
  ON orders(DATE_TRUNC('month', order_date));
-- WHERE DATE_TRUNC('month', order_date) = '2024-01-01' → uses index

-- Functional index for JSONB field extraction:
CREATE INDEX idx_events_user_id
  ON events((payload->>'user_id'));
-- WHERE payload->>'user_id' = '42' → uses index

-- Functional index for computed column:
CREATE INDEX idx_orders_total_rounded
  ON orders(ROUND(total_amount, 0));
-- WHERE ROUND(total_amount, 0) = 500 → uses index`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate why functional indexes matter for case-insensitive search
-- In a real database with millions of users, this IS the index
SELECT
  customer_id,
  first_name,
  last_name,
  email
FROM customers
WHERE LOWER(email) = LOWER('priya.sharma@gmail.com')
   OR LOWER(email) LIKE '%gmail%';
-- Without functional index on LOWER(email):
-- every row must have LOWER() applied before comparison = full scan
-- With functional index on LOWER(email):
-- database looks up the pre-computed LOWER value = index scan`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="EXPLAIN ANALYZE — Reading the Query Plan" />

      <P>EXPLAIN ANALYZE is the most important diagnostic tool in SQL performance work. It shows <Hl>exactly</Hl> how the database executed a query — which tables were scanned, which indexes were used, how many rows were processed at each step, and where the time was spent.</P>

      <CodeBlock
        label="EXPLAIN ANALYZE — how to read the output"
        code={`-- Run EXPLAIN ANALYZE before any query
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 5;

-- Example output:
-- Index Scan using idx_orders_customer_id on orders
--   (cost=0.29..8.31 rows=3 width=64)
--   (actual time=0.082..0.091 rows=3 loops=1)
--   Index Cond: (customer_id = 5)
-- Planning Time: 0.143 ms
-- Execution Time: 0.121 ms

-- Reading the output:
-- "Index Scan"      → index was used ✓ (good)
-- "Seq Scan"        → full table scan (investigate — may need an index)
-- "Hash Join"       → join via hash table (common, usually efficient)
-- "Nested Loop"     → row-by-row join (efficient for small inner sets)
-- "Merge Join"      → sort-based join (efficient when inputs are sorted)
-- cost=X..Y         → estimated startup..total cost (in arbitrary units)
-- rows=N            → estimated row count (compare to actual)
-- actual time=X..Y  → real time in milliseconds
-- loops=N           → how many times this node ran

-- Red flags:
-- Seq Scan on large table → missing index
-- rows=1000 actual=1000000 → bad statistics — run ANALYZE table_name
-- Filter: (condition) after Index Scan → index used but extra filter applied`}
      />

      <SQLPlayground
        initialQuery={`-- EXPLAIN shows the plan without executing (fast preview)
EXPLAIN
SELECT o.order_id, o.total_amount, c.first_name
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
ORDER BY o.total_amount DESC
LIMIT 10;`}
        height={180}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- EXPLAIN QUERY PLAN executes the query AND shows the plan
-- (safe for SELECT — avoid on INSERT/UPDATE/DELETE without ROLLBACK)
EXPLAIN QUERY PLAN
SELECT
  store_id,
  COUNT(*) AS order_count,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY revenue DESC;`}
        height={165}
        showSchema={false}
      />

      <H>What each node type means</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Node type', 'What it means', 'Performance signal'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Seq Scan', 'Read every row in the table', '⚠ Investigate on large tables — may need index'],
              ['Index Scan', 'Use index to find rows, then fetch from table', '✅ Good — index used'],
              ['Index Only Scan', 'All needed columns in the index — no table fetch', '✅ Best — covering index hit'],
              ['Bitmap Index Scan', 'Build a bitmap of matching rows, then batch-fetch', '✅ Good for medium selectivity'],
              ['Hash Join', 'Build hash table of smaller side, probe with larger', '✅ Common — efficient for large joins'],
              ['Nested Loop', 'For each outer row, look up inner rows', '✅ Good when inner lookup uses index'],
              ['Merge Join', 'Sort both sides, merge — needs sorted input', '✅ Good when inputs already sorted'],
              ['Hash Aggregate', 'GROUP BY via hash table', '✅ Standard — check memory usage'],
              ['Sort', 'Sort rows for ORDER BY or Merge Join', '⚠ Large sorts spill to disk — add index or limit'],
            ].map(([node, meaning, signal], i) => (
              <tr key={node} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{node}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{meaning}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="When Indexes Are NOT Used — The Function Trap and Others" />

      <P>Writing a query with an indexed column does not guarantee the index is used. Several common patterns silently disable index usage — the most important one to memorise is applying a function to the indexed column in WHERE.</P>

      <CodeBlock
        label="Patterns that prevent index usage"
        code={`-- ❌ Function on indexed column — index cannot be used
WHERE LOWER(email) = 'user@example.com'        -- full scan on email index
WHERE YEAR(order_date) = 2024                  -- full scan on order_date index
WHERE CAST(customer_id AS TEXT) = '42'         -- full scan on customer_id index
WHERE DATE_TRUNC('month', order_date) = '2024-01-01'  -- full scan

-- ✅ Fix: rewrite to compare the raw column or use functional index
WHERE email = 'User@Example.com'              -- B-tree index used
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01'              -- range scan on index
WHERE customer_id = 42                        -- integer comparison, index used
WHERE order_date >= '2024-01-01'
  AND order_date <  '2024-02-01'              -- instead of DATE_TRUNC filter

-- ❌ Leading wildcard LIKE — index cannot be used
WHERE product_name LIKE '%Milk%'              -- full scan (% at start)
WHERE product_name LIKE '%Amul'               -- full scan (% at start)

-- ✅ Trailing wildcard — index CAN be used
WHERE product_name LIKE 'Amul%'               -- B-tree index used (prefix match)

-- ❌ NOT operators on low-selectivity conditions
WHERE order_status != 'Delivered'             -- may not use index (returns most rows)
-- Database may choose full scan if > ~15% of rows match

-- ❌ OR across different columns (in older PostgreSQL versions)
WHERE customer_id = 5 OR store_id = 'ST001'
-- May do two index scans + bitmap OR — check EXPLAIN

-- ❌ Implicit type cast on the column
WHERE customer_id = '42'                      -- '42' is TEXT, customer_id is INT
-- Database may cast column to TEXT → defeats index`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate: these queries reach the same rows but may have different plans
-- Query A: function on column (likely full scan without functional index)
SELECT COUNT(*) FROM customers
WHERE LOWER(city) = 'bangalore';

-- Query B: normalised column comparison (uses index on city if it exists)
SELECT COUNT(*) FROM customers
WHERE city = 'Seattle';

-- Query C: range instead of function (index-friendly date filter)
SELECT COUNT(*) FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01';   -- uses index on order_date`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Index Maintenance — The Hidden Cost" />

      <P>Indexes are not free. Every INSERT, UPDATE, and DELETE on a table must also update all indexes on that table. A table with 10 indexes pays 10x the write overhead compared to a table with no indexes. Understanding this tradeoff is what separates thoughtful index design from "add an index on everything."</P>

      <CodeBlock
        label="Index maintenance costs and management"
        code={`-- Every write to the table updates all indexes:
INSERT INTO orders (...) VALUES (...);
-- → Updates: idx_orders_customer_id, idx_orders_store_date,
--            idx_orders_status, idx_orders_delivered, ...

-- For write-heavy tables (millions of inserts/day):
-- Each extra index adds latency to every INSERT/UPDATE/DELETE
-- Rule of thumb: OLTP tables → 3-5 indexes max
--               OLAP/analytics tables → more indexes acceptable (fewer writes)

-- Find unused indexes (PostgreSQL — indexes not used since last stats reset):
SELECT
  relname AS table_name,
  indexrelname AS index_name,
  idx_scan AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE idx_scan = 0          -- never used
  AND NOT indisprimary      -- exclude primary keys
ORDER BY pg_relation_size(indexrelid) DESC;

-- Find duplicate indexes (same columns, same table):
SELECT
  t.relname AS table_name,
  a.indexname AS index_a,
  b.indexname AS index_b
FROM pg_indexes AS a
JOIN pg_indexes AS b
  ON a.tablename = b.tablename
  AND a.indexdef = b.indexdef
  AND a.indexname < b.indexname
JOIN pg_class AS t ON t.relname = a.tablename;

-- Rebuild a bloated index (frees dead space from deletes/updates):
REINDEX INDEX idx_orders_customer_id;
REINDEX TABLE orders;     -- rebuilds all indexes on the table`}
      />

      <SQLPlayground
        initialQuery={`-- List indexes on FreshCart tables
SELECT
  tbl_name AS tablename,
  name     AS indexname,
  sql      AS indexdef
FROM sqlite_master
WHERE type = 'index'
  AND tbl_name IN ('orders', 'customers', 'products', 'order_items')
ORDER BY tbl_name, name;`}
        height={165}
        showSchema={false}
      />

      <H>The index design decision framework</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { q: 'Is this a primary key or unique constraint column?', answer: 'Always index', color: '#00e676', why: 'Auto-created by the database — mandatory for correctness' },
          { q: 'Is this a foreign key column?', answer: 'Always index', color: '#00e676', why: 'JOIN performance — FK columns are joined constantly; full scan on every join is catastrophic' },
          { q: 'Is this a column frequently in WHERE, ORDER BY, or GROUP BY?', answer: 'Index it', color: C, why: 'High-frequency filtering column — measure query time before and after' },
          { q: 'Is this table write-heavy (>10,000 inserts/second)?', answer: 'Index minimally', color: '#f97316', why: 'Each index adds write latency — only add indexes that deliver measurable read improvement' },
          { q: 'Does the query only touch a small subset of rows (e.g. status = active)?', answer: 'Partial index', color: C, why: 'Partial index covers only the queried subset — smaller and faster than full index' },
          { q: 'Does the WHERE apply a function to the column?', answer: 'Functional index', color: C, why: 'LOWER(col), DATE_TRUNC, etc. — functional index stores the transformed value' },
          { q: 'Is this index never appearing in EXPLAIN plans?', answer: 'Drop it', color: '#ff4757', why: 'Unused index pays write overhead with zero read benefit — check pg_stat_user_indexes' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 6 }}>"{item.q}"</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{item.why}</div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{item.answer}</span>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Stripe. The payments team reports that the daily settlement report is taking 45 seconds to run. EXPLAIN ANALYZE shows three sequential scans on the transactions table (50 million rows). You have 30 minutes to diagnose and fix before the business day starts.</P>

      <TimeBlock time="6:15 AM" label="Alert fires — settlement report running 45 seconds">
        The report runs every morning at 6 AM. It has been getting slower every week as the transactions table grows. This morning it timed out.
      </TimeBlock>

      <TimeBlock time="6:18 AM" label="Run EXPLAIN ANALYZE on the slow query">
        Adapted for FreshCart: the equivalent is a slow orders aggregation query.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- EXPLAIN QUERY PLAN the slow query (safe — no data modification)
EXPLAIN QUERY PLAN
SELECT
  o.store_id,
  date(o.order_date, 'start of month')      AS month,
  p.category,
  COUNT(DISTINCT o.order_id)                AS orders,
  SUM(oi.quantity)                          AS units_sold,
  ROUND(SUM(oi.line_total), 2)              AS revenue
FROM orders      AS o
JOIN order_items AS oi ON o.order_id    = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
  AND o.order_date   >= '2024-01-01'
GROUP BY o.store_id, date(o.order_date, 'start of month'), p.category
ORDER BY month, o.store_id, revenue DESC;`}
        height={240}
        showSchema={true}
      />

      <TimeBlock time="6:22 AM" label="EXPLAIN reveals three Seq Scans">
        Seq Scan on orders (no index on order_status + order_date), Seq Scan on order_items (no index on order_id), Seq Scan on products (no index on product_id). The join between order_items and orders forces a full scan.
      </TimeBlock>

      <TimeBlock time="6:25 AM" label="Create the missing indexes concurrently">
        CONCURRENTLY means no table lock — safe to run in production during business hours.
      </TimeBlock>

      <CodeBlock
        label="The three indexes that fix the slow query"
        code={`-- Fix 1: composite index on orders for the WHERE + GROUP BY
-- order_status first (equality), order_date second (range)
CREATE INDEX CONCURRENTLY idx_orders_status_date
  ON orders(order_status, order_date)
  WHERE order_status = 'Delivered';   -- partial: only delivered orders
-- Index is ~40% smaller than full index on both columns

-- Fix 2: order_items.order_id for the JOIN (likely already exists as FK)
CREATE INDEX CONCURRENTLY idx_order_items_order_id
  ON order_items(order_id);

-- Fix 3: order_items.product_id for the JOIN to products
CREATE INDEX CONCURRENTLY idx_order_items_product_id
  ON order_items(product_id);

-- After indexes are built, run EXPLAIN ANALYZE again
-- Expected: Seq Scans replaced by Index Scans and Index Only Scans`}
      />

      <TimeBlock time="6:35 AM" label="Query time: 45 seconds → 0.4 seconds">
        Three CONCURRENT index creations took 8 minutes (no downtime). The same query now runs in 0.4 seconds. The settlement report completes in 2 seconds total. The fix holds as the table grows — the indexes scale logarithmically.
      </TimeBlock>

      <ProTip>
        Always create production indexes with CREATE INDEX CONCURRENTLY. Without CONCURRENTLY, PostgreSQL takes an exclusive lock on the table for the duration of index creation — blocking all reads and writes. On a table with millions of rows, this can mean minutes of downtime. CONCURRENTLY builds the index in the background without blocking, at the cost of taking slightly longer to complete.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a database index and how does it work?">
        <p style={{ margin: '0 0 14px' }}>A database index is a separate data structure maintained alongside a table that maps column values to the physical locations of rows containing those values. Without an index, finding rows that satisfy a WHERE condition requires reading every row in the table — a sequential scan that is O(n) in cost. With a B-tree index, the database traverses a sorted tree structure in O(log n) time to find the matching rows, then fetches only those rows from the table. For a table with 10 million rows, this is the difference between examining 10 million rows versus 3-4 tree nodes.</p>
        <p style={{ margin: '0 0 14px' }}>The most common index type is the B-tree (balanced tree). The tree is kept sorted by the indexed column values. Each internal node points to child nodes whose values fall in a specific range. Each leaf node points to the actual table rows. The balance property ensures every lookup takes the same number of steps — typically 3-4 for tables with millions of rows — regardless of which value is being searched.</p>
        <p style={{ margin: 0 }}>Indexes also benefit ORDER BY (the index is already sorted, so no sort step is needed), MIN and MAX (first and last leaf of the index), and JOIN conditions (the FK column is looked up in the index instead of scanned). The cost of indexes is write overhead — every INSERT, UPDATE, and DELETE must also update all indexes on the table. A table with 10 indexes pays 10 index maintenance operations per write. This is why indexes must be chosen deliberately: create the indexes the query workload needs, and periodically audit and remove unused ones.</p>
      </IQ>

      <IQ q="What is the difference between a clustered and non-clustered index?">
        <p style={{ margin: '0 0 14px' }}>A clustered index determines the physical order in which rows are stored on disk — the table's rows are physically sorted by the clustered index column. Because the data is stored in index order, range scans on the clustered column are extremely efficient (rows in a date range are adjacent on disk and read in one sequential sweep). Each table can have only one clustered index because the rows can only be physically ordered one way.</p>
        <p style={{ margin: '0 0 14px' }}>SQL Server and MySQL InnoDB have explicit clustered index syntax. In SQL Server, CREATE CLUSTERED INDEX is a DDL operation. In MySQL InnoDB, the PRIMARY KEY is automatically the clustered index — the table is stored in primary key order. If no primary key exists, InnoDB selects a hidden row ID column. In PostgreSQL, there is no persistent clustered index — CLUSTER table_name USING index_name physically reorders the table once, but the order is not maintained as new rows are inserted.</p>
        <p style={{ margin: 0 }}>A non-clustered index (the standard type in most databases) is a separate structure from the table data. Leaf nodes contain the indexed column values plus a pointer (row ID or primary key) to the actual table row. Range scans on a non-clustered index may require many random disk accesses to fetch matching rows from the heap — this is efficient for highly selective queries (few matching rows) but slower than a clustered index for large range scans. For most OLTP workloads: use the primary key as the clustered index (usually the auto-increment or UUID ID), and create non-clustered indexes on FK columns and frequently filtered columns.</p>
      </IQ>

      <IQ q="What is a composite index and why does column order matter?">
        <p style={{ margin: '0 0 14px' }}>A composite index covers multiple columns, defined in a specific order: CREATE INDEX ON orders(store_id, order_date). The B-tree sorts entries first by store_id, then by order_date within each store_id group. This means the index is useful for queries that filter on store_id (the leading column) — the database can go directly to the store_id section of the index. It is also useful for queries that filter on both store_id and order_date — the index delivers both lookups in one traversal.</p>
        <p style={{ margin: '0 0 14px' }}>Column order matters because the index can only be entered from the left. A query filtering only on order_date (without store_id) cannot use this composite index — it would have to scan the entire index because order_date values are interleaved across all store_id groups, not sorted globally. The database treats the composite index as a phone book sorted by last name then first name — you can look up "all Sharma entries" or "Sharma, Priya" efficiently, but you cannot look up "all Priya entries across all last names" without scanning the whole book.</p>
        <p style={{ margin: 0 }}>Two practical rules for composite index column order: first, put equality-filter columns before range-filter columns — equality filters use one specific section of the index, while range filters use a contiguous span; combining both in the right order allows the index to navigate to the equality section and then range-scan within it. Second, put the most selective column first when both are equality filters — this reduces the number of rows the database must examine after the initial lookup. For a query with WHERE store_id = 'ST001' AND order_status = 'Delivered': if order_status has only 4 distinct values but store_id has 10 distinct values, store_id is more selective per value and should come first.</p>
      </IQ>

      <IQ q="When would you use a partial index?">
        <p style={{ margin: '0 0 14px' }}>A partial index adds a WHERE clause to the index definition, indexing only rows that satisfy the condition. This makes the index smaller (fewer rows to index), faster to build and search (smaller tree), and cheaper to maintain (fewer index entries to update on writes). Use a partial index whenever queries consistently filter on a known, stable subset of rows and that subset is significantly smaller than the full table.</p>
        <p style={{ margin: '0 0 14px' }}>The classic use cases: indexing only active/live rows (WHERE is_deleted = false or WHERE status = 'Active') — if 90% of rows are deleted, a partial index on active rows is 10% the size of a full index and much faster to search. Indexing only a specific status value (WHERE order_status = 'Pending') for a queue-processing system where workers always query pending items. Indexing only non-NULL values (WHERE email IS NOT NULL) when the column is nullable and NULL rows are never queried. Indexing only recent data (WHERE created_at &gt;= '2024-01-01') for a time-series table where queries never touch old data.</p>
        <p style={{ margin: 0 }}>The constraint: the partial index is only used when the query's WHERE clause implies the index's WHERE condition. A query WHERE order_status = 'Pending' AND order_date = '2024-01-15' can use a partial index WHERE order_status = 'Pending' on order_date — the query's status filter implies the index's partial condition. A query WHERE order_date = '2024-01-15' without any status filter cannot use this partial index — the planner cannot be certain the partial condition is satisfied. Design partial indexes around the most common, high-frequency query patterns in the workload.</p>
      </IQ>

      <IQ q="How do you identify a slow query and diagnose it with EXPLAIN ANALYZE?">
        <p style={{ margin: '0 0 14px' }}>Finding slow queries: PostgreSQL's pg_stat_statements extension tracks query execution statistics across all sessions — total execution time, call count, mean time, and the query text. SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 20 reveals the 20 slowest queries by average execution time. The slow query log (log_min_duration_statement in postgresql.conf) logs any query exceeding a threshold. Application performance monitoring (APM) tools like Datadog or New Relic capture slow database queries from the application layer.</p>
        <p style={{ margin: '0 0 14px' }}>Diagnosing with EXPLAIN ANALYZE: prepend EXPLAIN ANALYZE to the slow query and examine the output. Look for: Seq Scan on large tables (check if rows processed &gt;&gt; rows returned — high filter ratio suggests a missing index), estimated rows dramatically different from actual rows (stale statistics — run ANALYZE table_name to refresh), and Sort nodes processing millions of rows (add an index on the ORDER BY column or LIMIT the result set). Also look at the total Planning Time and Execution Time at the bottom — high planning time on a simple query suggests overly complex statistics or too many indexes for the planner to evaluate.</p>
        <p style={{ margin: 0 }}>The fix workflow: identify the Seq Scan node and its filter condition — that filter condition is the candidate for an index. Verify the index would be selective (low percentage of rows returned relative to total rows — a WHERE on status with 2 distinct values for a 50% match rate may not benefit from an index). Create the index with CONCURRENTLY to avoid locking. Run EXPLAIN ANALYZE again to confirm the plan changed from Seq Scan to Index Scan. Measure actual query time before and after. If the index is not used, check for the function-on-column anti-pattern, implicit type casting, or low selectivity causing the planner to prefer a sequential scan. Use pg_stat_user_indexes after a week to verify the new index is actually being used in production traffic.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query is still slow after adding an index — EXPLAIN shows Seq Scan despite index existing"
        cause="Four possible causes: (1) The index is not being used because a function is applied to the indexed column in WHERE — WHERE LOWER(city) = 'bangalore' defeats an index on city. (2) The query returns too many rows — if >15-20% of the table matches the condition, the planner may prefer a sequential scan (reading the table sequentially is faster than many random index lookups for large result sets). (3) Statistics are stale — the planner's row count estimates are wrong, causing it to choose a bad plan. (4) The index was created after the planner's statistics snapshot — run ANALYZE on the table."
        fix="Check EXPLAIN ANALYZE carefully — look for 'Filter:' lines that show a condition being applied after the index scan (index used but extra filtering). For function-on-column: create a functional index matching the expression. For low selectivity: accept the sequential scan (it may genuinely be faster for large result sets) or use a partial index to make the subset smaller. For stale statistics: run ANALYZE table_name to refresh planner statistics. To force index use for testing: SET enable_seqscan = off — this forces the planner to use indexes even when it thinks a seq scan is faster. Never leave this setting off in production."
      />

      <Err
        msg="ERROR: could not create index — duplicate key value violates unique constraint"
        cause="Attempting to create a UNIQUE index on a column that already contains duplicate values. UNIQUE indexes enforce uniqueness at creation time — if duplicates exist in the current data, the index creation fails. This is data quality feedback: the column you thought was unique is not."
        fix="Find the duplicates first: SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1. Decide which duplicate rows to keep and remove the others. After deduplication, retry CREATE UNIQUE INDEX. If the column genuinely should not be unique, use CREATE INDEX (without UNIQUE). For future data quality, add a UNIQUE constraint to the column to enforce uniqueness at the application layer and prevent duplicates from being inserted."
      />

      <Err
        msg="CREATE INDEX takes the database offline — table is locked and queries queue up"
        cause="CREATE INDEX without CONCURRENTLY takes an exclusive lock on the table for the entire duration of index creation. On a large table (millions of rows), this can take minutes. During this time, all reads and writes to the table are blocked and queue up. On a production database with live traffic, this is an outage."
        fix="Always use CREATE INDEX CONCURRENTLY for production tables: CREATE INDEX CONCURRENTLY idx_name ON table(column). CONCURRENTLY builds the index in two passes — the first pass scans the table without a lock, the second pass validates and catches any changes during the first pass. Total time is longer than a direct CREATE INDEX but no exclusive lock is held. Restriction: CREATE INDEX CONCURRENTLY cannot run inside a transaction block (cannot be used inside BEGIN/COMMIT). Run it as a standalone statement. If a CONCURRENT index creation fails midway, it leaves an INVALID index — drop it with DROP INDEX CONCURRENTLY and retry."
      />

      <Err
        msg="Composite index not being used — query filters on second column but not first"
        cause="A composite index on (col_a, col_b) cannot be entered without specifying col_a (the leading column). A query WHERE col_b = value cannot navigate the index because col_b values are sorted within each col_a group — scanning all col_a groups to find col_b matches would be slower than a sequential table scan. The index is unusable for queries that skip the leading column."
        fix="Create a separate index on col_b alone: CREATE INDEX idx_table_col_b ON table(col_b). Now queries filtering only on col_b use this single-column index. Keep the composite index on (col_a, col_b) for queries that filter on both. The result: two indexes, each optimal for its query pattern. Review query patterns before creating composite indexes — the leading column should be the one most frequently filtered on in isolation. If queries always filter on both columns together, the composite index is sufficient and no separate index is needed."
      />

      <Err
        msg="Index exists but is marked INVALID — queries perform full table scans"
        cause="An index marked INVALID was created with CONCURRENTLY but the creation failed partway through (due to a constraint violation, a crash, or cancellation). The invalid index entry remains in the schema but is not usable by the query planner — it is ignored. The table effectively has no index for that column."
        fix="Drop the invalid index: DROP INDEX CONCURRENTLY idx_name (check first: SELECT indexname, indisvalid FROM pg_indexes JOIN pg_index ON indexrelid = pg_class.oid WHERE indisvalid = false). After dropping, retry the CREATE INDEX CONCURRENTLY. If the failure was due to a unique constraint violation, resolve the duplicate data first. If the failure was due to a timeout or cancellation, simply retry — CONCURRENTLY can be interrupted safely, but the partial index must be dropped before retrying."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design an indexing strategy for FreshCart's most critical queries. Write the CREATE INDEX statements (with appropriate types — partial, composite, functional, covering) for each scenario, and explain your choice. Scenarios: (1) The orders table is queried thousands of times per day with WHERE order_status = 'Delivered' AND order_date >= some_date — this is the most common query pattern. (2) Customer login authenticates by looking up LOWER(email) — case-insensitive email search happens on every login. (3) The analytics team runs store performance reports that GROUP BY store_id and aggregate total_amount — they always filter WHERE order_status = 'Delivered'. (4) Product search uses WHERE product_name ILIKE 'amul%' (prefix match, case-insensitive). (5) The order_items table is joined to orders via order_id on every order detail query. Then write a diagnostic query that shows all indexes on the orders and order_items tables."
        hint="Scenario 1: partial composite (status in WHERE, date range). Scenario 2: functional on LOWER(email). Scenario 3: partial composite with INCLUDE for covering. Scenario 4: functional on LOWER(product_name) for ILIKE prefix. Scenario 5: FK index on order_items(order_id). Diagnostic: pg_indexes WHERE tablename IN (...)."
        answer={`-- Scenario 1: Most common query — delivered orders by date
-- Partial: status filter baked into index (smaller index)
-- order_date after equality filter on status
CREATE INDEX IF NOT EXISTS idx_orders_delivered_date
  ON orders(order_date)
  WHERE order_status = 'Delivered';
-- Rationale: partial index contains only Delivered rows (~40-60% of table)
-- Range scan on order_date within that subset is fast
-- Queries without status filter use a separate full index on order_date

-- Scenario 2: Case-insensitive email login
-- Functional index on LOWER(email) — stores pre-computed lowercase values
CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_email_lower
  ON customers(LOWER(email));
-- Rationale: WHERE LOWER(email) = '...' matches the functional index exactly
-- UNIQUE enforces no duplicate emails (case-insensitively)
-- Without this index: every login = full table scan on customers

-- Scenario 3: Store performance reports — composite index
-- Include total_amount and order_date as index columns (SQLite has no INCLUDE)
CREATE INDEX IF NOT EXISTS idx_orders_store_revenue_covering
  ON orders(store_id, total_amount, order_date)
  WHERE order_status = 'Delivered';
-- Rationale: partial (Delivered only) + all needed columns in index
-- GROUP BY store_id, SUM(total_amount): index covers the aggregation
-- Dramatically faster for the daily analytics aggregation

-- Scenario 4: Case-insensitive prefix product search
-- Functional index on LOWER(product_name) for LIKE 'prefix%'
CREATE INDEX IF NOT EXISTS idx_products_name_lower
  ON products(LOWER(product_name));
-- Rationale: WHERE LOWER(product_name) LIKE 'amul%' uses B-tree prefix scan
-- LIKE 'amul%' with LOWER() rewrite: the functional index covers this pattern
-- Leading wildcard LIKE '%milk%' still cannot use this index

-- Scenario 5: FK index on order_items for JOIN to orders
CREATE INDEX IF NOT EXISTS idx_order_items_order_id
  ON order_items(order_id);
-- Rationale: every order detail query JOINs order_items.order_id = orders.order_id
-- Without this index: nested loop join does full scan of order_items per order
-- With this index: direct lookup of items for each order_id
-- This is the single highest-impact index for JOIN performance in FreshCart

-- ── Diagnostic: show all indexes on orders and order_items ──
SELECT
  tbl_name AS tablename,
  name     AS indexname,
  sql      AS indexdef
FROM sqlite_master
WHERE type = 'index'
  AND tbl_name IN ('orders', 'order_items')
ORDER BY tbl_name, name;`}
        explanation="Scenario 1 uses a partial index (WHERE order_status = 'Delivered') rather than a composite on (status, date) because status is already baked into the index predicate — the index only contains Delivered rows, so the date range scan is already within the correct subset. No need to store status as an indexed column. Scenario 2 uses UNIQUE + functional — the UNIQUE enforces the business rule that emails must be unique regardless of case, and the functional index makes LOWER(email) lookups O(log n). Scenario 3 adds INCLUDE (total_amount, order_date) so the analytics GROUP BY store_id + SUM(total_amount) query can be answered entirely from the index without touching the table heap — an index-only scan. Scenario 4 requires a functional index on LOWER(product_name) because ILIKE is compiled as LOWER(column) LIKE 'pattern'. A plain B-tree index on product_name would not help ILIKE comparisons. Scenario 5 is the mandatory FK index — this is the first index anyone should create on a table that is frequently joined. Missing this causes nested loop joins to do a full scan of order_items for every parent order row."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'An index maps column values to row locations, turning O(n) sequential scans into O(log n) tree traversals. The query syntax is identical — EXPLAIN ANALYZE reveals which path the database chose.',
          'B-tree is the default index type. It supports =, <, >, BETWEEN, LIKE \'prefix%\', ORDER BY, MIN, and MAX. It cannot help with LIKE \'%suffix\', arbitrary functions on the column, or full-text search.',
          'Composite index column order is critical: the leading column must be specified for the index to be used. Put equality-filter columns before range-filter columns. Queries skipping the leading column cannot use the index.',
          'Partial indexes add WHERE to the index definition — only matching rows are indexed. Use them when queries consistently filter on a specific subset (status = \'Delivered\', is_deleted = false). Smaller, faster, cheaper to maintain.',
          'Functional indexes store the result of an expression: CREATE INDEX ON customers(LOWER(email)). Required when WHERE applies a function to the column — without a functional index, functions on columns force full scans.',
          'Covering indexes (INCLUDE) add non-filtered columns to index leaf nodes. When the query needs only indexed + included columns, the database performs an index-only scan — zero table heap access.',
          'EXPLAIN ANALYZE is the essential diagnostic tool. Look for Seq Scan on large tables (missing index), rows estimate vs actual mismatch (stale statistics — run ANALYZE), and Sort nodes on large result sets (add ORDER BY index).',
          'Functions on indexed columns defeat indexes: WHERE LOWER(col) = \'x\' defeats an index on col. Fix: create a functional index on LOWER(col), or rewrite to compare the raw column. Never apply functions to the indexed side of a WHERE.',
          'Always CREATE INDEX CONCURRENTLY in production. Without CONCURRENTLY, index creation takes an exclusive table lock blocking all reads and writes for minutes. CONCURRENTLY builds without locking.',
          'Index maintenance costs: every write updates all indexes. Audit unused indexes with pg_stat_user_indexes (idx_scan = 0). Drop unused indexes — they pay write overhead with zero read benefit.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 47</strong>, you learn Transactions and ACID properties — how databases guarantee consistency, how COMMIT and ROLLBACK work, isolation levels, and how to avoid lost updates and phantom reads.
        </p>
        <Link href="/learn/sql/transactions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 47 → Transactions and ACID
        </Link>
      </div>

    </LearnLayout>
  );
}