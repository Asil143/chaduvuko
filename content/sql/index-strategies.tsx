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

const DecisionRow = ({ q, answer, color, why }: { q: string; answer: string; color: string; why: string }) => (
  <div style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${color}20`, borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 6 }}>"{q}"</div>
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{why}</div>
    </div>
    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color, background: `${color}15`, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{answer}</span>
    </div>
  </div>
);

export default function IndexStrategies() {
  return (
    <LearnLayout
      title="Index Strategies"
      description="Production index design — composite column order, covering indexes, partial indexes, functional indexes, index-only scans, the write cost tradeoff, and the complete decision framework for when to add or drop an index"
      section="SQL — Module 56"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Index Strategy Matters" />

      <P>Module 46 covered the mechanics of indexes — B-tree structure, CREATE INDEX syntax, and basic types. This module goes deeper into strategy: how to design indexes that serve your actual query workload, how to avoid the common traps that make indexes useless or harmful, and how to audit and maintain indexes as a production database evolves.</P>

      <P>Most databases are under-indexed in some places and over-indexed in others simultaneously. Under-indexed queries do full table scans. Over-indexed tables pay unnecessary write overhead on every INSERT, UPDATE, and DELETE. The goal is a minimal set of indexes that covers the query workload precisely — nothing missing, nothing redundant.</P>

      <CodeBlock
        label="The index tradeoff in one equation"
        code={`-- Every index makes reads faster and writes slower
-- The tradeoff: read speedup must outweigh write cost

-- Read benefit: full table scan → index lookup
-- O(n) → O(log n) for equality; O(log n + k) for range (k = matching rows)

-- Write cost: every INSERT, UPDATE, DELETE updates all indexes
-- Table with 1 index:  1 heap write + 1 index write per INSERT
-- Table with 10 indexes: 1 heap write + 10 index writes per INSERT

-- Example: orders table (FreshMart)
-- Current indexes: pk (order_id), customer_id, store_id, order_date
-- Every INSERT into orders: 1 heap write + 4 index writes = 5 total writes
-- Adding 6 more indexes: 1 + 10 = 10 writes per INSERT — 2× write overhead

-- Rule: add an index only when the read speedup on measured queries
-- demonstrably outweighs the write overhead for the table's write volume`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Composite Index Design — Column Order Is Everything" />

      <P>A composite index on (col_a, col_b, col_c) is sorted first by col_a, then by col_b within each col_a group, then by col_c within each col_b group. The B-tree can be entered from the left — queries that specify col_a can use the index; queries that skip col_a cannot. This is the most important rule in composite index design.</P>

      <H>The left-prefix rule</H>

      <CodeBlock
        label="Composite index — what can and cannot use it"
        code={`-- Index: CREATE INDEX idx ON orders (store_id, order_status, order_date)

-- ✅ Uses the index — leading column(s) specified:
WHERE store_id = 'ST001'
WHERE store_id = 'ST001' AND order_status = 'Delivered'
WHERE store_id = 'ST001' AND order_status = 'Delivered' AND order_date = '2024-01-15'
WHERE store_id = 'ST001' AND order_date > '2024-01-01'   -- partial: store_id only, date filtered after

-- ❌ Cannot use the index — leading column missing:
WHERE order_status = 'Delivered'                         -- no store_id → cannot enter index
WHERE order_date > '2024-01-01'                          -- no store_id → cannot enter index
WHERE order_status = 'Delivered' AND order_date = '...'  -- still no store_id

-- Rule: the index is useful for any query that specifies
-- the FIRST N columns in order (for any N from 1 to total columns)
-- Queries skipping any leading column get zero benefit from this index`}
      />

      <H>Equality before range — the ordering rule</H>

      <CodeBlock
        label="Equality columns before range columns in composite indexes"
        code={`-- Query: WHERE store_id = 'ST001' AND order_date BETWEEN '2024-01-01' AND '2024-01-31'

-- Option A: idx_a ON orders (store_id, order_date)
-- store_id equality: planner navigates to the ST001 section of the index
-- order_date range: scans the contiguous date range within ST001
-- ✅ Both conditions use the index efficiently

-- Option B: idx_b ON orders (order_date, store_id)
-- order_date range: planner scans the 31-day date range (all stores mixed)
-- store_id filter: applied AFTER the date scan, as an index filter
-- ❌ Less efficient: scans all stores' orders for January, then filters ST001

-- The rule: for composite indexes, put EQUALITY filter columns
-- BEFORE range filter columns. Equality narrows to an exact section;
-- range then scans within that narrow section.

-- Another example:
-- Query: WHERE customer_id = 42 AND order_date > '2024-01-01' AND total_amount > 500
-- Best index: (customer_id, order_date, total_amount)
--   customer_id = equality → narrow to customer 42's orders
--   order_date > range → scan date range within customer 42
--   total_amount > applied after (only one range per index used efficiently)
-- NOT: (order_date, total_amount, customer_id)
--   order_date > range → wide scan, then filter for customer 42`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate the left-prefix rule with real query patterns
-- Check which column combinations would benefit from composite indexes

-- Query 1: equality + range (composite order matters)
SELECT
  COUNT(*)                                AS matching_rows,
  ROUND(COUNT(*)::NUMERIC / (SELECT COUNT(*) FROM orders) * 100, 1) AS selectivity_pct
FROM orders
WHERE store_id = 'ST001'
  AND order_date BETWEEN '2024-01-01' AND '2024-01-31';

-- Query 2: two equality filters (order matters less)
SELECT COUNT(*) FROM orders
WHERE store_id = 'ST002'
  AND order_status = 'Delivered';

-- Query 3: range only (cannot benefit from composite — needs single column index)
SELECT COUNT(*) FROM orders
WHERE order_date >= '2024-01-15';`}
        height={220}
        showSchema={true}
      />

      <H>Selectivity — most selective column first for equality-only composites</H>

      <CodeBlock
        label="Column selectivity — choose higher selectivity first"
        code={`-- When ALL filter conditions are equality (no range), put the
-- most selective column first — reduces the number of rows examined
-- after the first condition is applied.

-- Check column selectivity (distinct values / total rows):
SELECT
  'store_id'     AS col, COUNT(DISTINCT store_id)::NUMERIC / COUNT(*) AS selectivity FROM orders
UNION ALL
SELECT 'order_status', COUNT(DISTINCT order_status)::NUMERIC / COUNT(*) FROM orders
UNION ALL
SELECT 'customer_id',  COUNT(DISTINCT customer_id)::NUMERIC / COUNT(*) FROM orders;

-- Example results:
-- store_id:     0.067  (10 stores / 150 orders)
-- customer_id:  0.133  (20 customers / 150 orders)
-- order_status: 0.027  (4 statuses / 150 orders)

-- For WHERE customer_id = ? AND order_status = ?:
-- Best: idx ON (customer_id, order_status) — customer_id more selective
-- Worse: idx ON (order_status, customer_id) — status only narrows to ~25% first

-- Exception: if one column is ALWAYS an equality filter (always in WHERE),
-- put it first regardless of selectivity — it is always the entry point`}
      />

      <SQLPlayground
        initialQuery={`-- Measure column selectivity for FreshMart tables
SELECT
  'orders.store_id'     AS column_name,
  COUNT(DISTINCT store_id)   AS distinct_vals,
  COUNT(*)                   AS total_rows,
  ROUND(COUNT(DISTINCT store_id)::NUMERIC / COUNT(*), 4) AS selectivity
FROM orders
UNION ALL
SELECT 'orders.order_status',
  COUNT(DISTINCT order_status), COUNT(*),
  ROUND(COUNT(DISTINCT order_status)::NUMERIC / COUNT(*), 4)
FROM orders
UNION ALL
SELECT 'orders.customer_id',
  COUNT(DISTINCT customer_id), COUNT(*),
  ROUND(COUNT(DISTINCT customer_id)::NUMERIC / COUNT(*), 4)
FROM orders
UNION ALL
SELECT 'products.category',
  COUNT(DISTINCT category), COUNT(*),
  ROUND(COUNT(DISTINCT category)::NUMERIC / COUNT(*), 4)
FROM products
ORDER BY selectivity DESC;`}
        height={235}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Covering Indexes — Eliminating the Heap Fetch" />

      <P>An index lookup normally has two steps: find the row location in the index, then fetch the full row from the table heap. A <Hl>covering index</Hl> stores additional columns in the index leaf nodes so the database can answer the query entirely from the index — zero heap access. This is called an Index Only Scan and is the fastest possible read path.</P>

      <CodeBlock
        label="Covering index — INCLUDE clause"
        code={`-- Query: SELECT order_id, total_amount, order_date
--        FROM orders WHERE customer_id = 5 AND order_status = 'Delivered'

-- Without covering index:
-- 1. Index lookup on (customer_id, order_status) → row location
-- 2. Heap fetch for each matching row → reads order_id, total_amount, order_date
-- Two I/O steps per matching row

-- With covering index (INCLUDE adds columns to index leaf nodes):
CREATE INDEX idx_orders_cust_status_covering
  ON orders (customer_id, order_status)
  INCLUDE (order_id, total_amount, order_date);
-- 1. Index lookup → row location AND order_id, total_amount, order_date already there
-- Zero heap fetch — Index Only Scan

-- The distinction:
-- Columns in the key (before INCLUDE): used for searching and sorting
-- Columns in INCLUDE: stored in leaf nodes only — not searchable, just fetchable
-- INCLUDE columns have no overhead in internal index nodes — only in leaves
-- WHERE customer_id = 5 AND order_status = 'Delivered' — key columns
-- SELECT order_id, total_amount, order_date — INCLUDE columns

-- When to use INCLUDE:
-- ✅ Column is frequently SELECTed alongside the key columns
-- ✅ Heap rows are wide (many columns) — heap fetch is expensive
-- ✅ The queries are read-heavy and latency-sensitive
-- ❌ Column changes frequently — each update must also update the index leaf`}
      />

      <SQLPlayground
        initialQuery={`-- Queries that would benefit from a covering index on orders
-- (showing the shape of queries that could be Index Only Scans)

-- Query A: customer order history — all needed columns could be in the index
SELECT order_id, order_date, total_amount, order_status
FROM orders
WHERE customer_id = 1
ORDER BY order_date DESC;
-- Covering index: ON orders(customer_id) INCLUDE(order_id, order_date, total_amount, order_status)

-- Query B: store revenue calculation — SUM from index-only
SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_status = 'Delivered'
  AND order_date BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY store_id;
-- Covering index: ON orders(order_status, order_date) INCLUDE(store_id, total_amount)`}
        height={230}
        showSchema={false}
      />

      <H>Verifying Index Only Scan in EXPLAIN</H>

      <SQLPlayground
        initialQuery={`-- Check if queries are using Index Only Scans
EXPLAIN
SELECT store_id, COUNT(*), ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id;
-- Look for "Index Only Scan" in the output — means no heap fetch
-- "Index Scan" means the index was used but heap was also read
-- "Seq Scan" means no index was used at all`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Partial Indexes — Index Only the Rows You Query" />

      <P>A partial index adds a WHERE clause to the index definition — only rows satisfying the condition are indexed. The index is smaller, faster to build, faster to search, and cheaper to maintain. A partial index is the right choice whenever queries consistently filter on a known, stable subset.</P>

      <CodeBlock
        label="Partial index — real production patterns"
        code={`-- Pattern 1: index only active/live rows
-- If 90% of orders are Delivered, a partial index on Processing orders
-- is 10% the size and serves the queue-processing use case precisely
CREATE INDEX idx_orders_processing
  ON orders (order_date, store_id)
  WHERE order_status = 'Processing';
-- Used by: WHERE order_status = 'Processing' AND order_date >= '...'
-- Not used by: WHERE order_status = 'Delivered' (different condition)

-- Pattern 2: index only non-deleted rows (soft delete pattern)
CREATE INDEX idx_customers_active
  ON customers (loyalty_tier, customer_id)
  WHERE is_deleted = false;
-- 100,000 customer table with 80% soft-deleted:
-- Full index: 100,000 entries
-- Partial index: 20,000 entries — 5× smaller, 5× faster to scan

-- Pattern 3: index only recent data (time-series pattern)
CREATE INDEX idx_orders_recent
  ON orders (order_date DESC, store_id)
  WHERE order_date >= '2024-01-01';
-- Operational queries almost always filter on recent data
-- Historical queries can use a seq scan (they are rare anyway)

-- Pattern 4: unique partial index (conditional uniqueness)
CREATE UNIQUE INDEX idx_customers_active_email
  ON customers (LOWER(email))
  WHERE is_deleted = false;
-- Allows same email to appear in deleted + active rows
-- But prevents two active rows from sharing an email`}
      />

      <SQLPlayground
        initialQuery={`-- Verify partial index benefit: how much smaller would it be?
SELECT
  order_status,
  COUNT(*)                                                     AS row_count,
  ROUND(COUNT(*)::NUMERIC / SUM(COUNT(*)) OVER () * 100, 1)   AS pct_of_table
FROM orders
GROUP BY order_status
ORDER BY row_count DESC;
-- If Processing = 15% of rows:
-- Partial index WHERE order_status = 'Processing' is 85% smaller
-- than a full index — and serves the queue-processing queries exclusively`}
        height={175}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Partial index for high-value orders (business-driven subset)
-- Only index orders above ₹500 — most revenue analytics only care about these
SELECT
  COUNT(*) FILTER (WHERE total_amount > 500)   AS high_value_orders,
  COUNT(*)                                     AS total_orders,
  ROUND(
    COUNT(*) FILTER (WHERE total_amount > 500)::NUMERIC
    / COUNT(*) * 100
  , 1)                                         AS pct_high_value
FROM orders
WHERE order_status = 'Delivered';
-- If high_value = 40% of delivered orders:
-- Partial index: ON orders(total_amount DESC, customer_id)
--               WHERE order_status = 'Delivered' AND total_amount > 500
-- Size: 40% of a full Delivered index — faster for premium customer queries`}
        height={205}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Functional Indexes — Indexing Expressions" />

      <P>A functional index stores the result of a function or expression applied to column values. When a query's WHERE clause applies the same function to the column, the index can be used — the pre-computed values are already sorted and searchable. Without a functional index, any function on a column forces a sequential scan regardless of whether a plain column index exists.</P>

      <CodeBlock
        label="Functional indexes — the essential patterns"
        code={`-- Pattern 1: case-insensitive search
CREATE INDEX idx_customers_email_lower
  ON customers (LOWER(email));
-- Enables: WHERE LOWER(email) = 'user@example.com'  → Index Scan
-- Without: full table scan on every login attempt

-- Pattern 2: date truncation for monthly grouping
CREATE INDEX idx_orders_month
  ON orders (DATE_TRUNC('month', order_date));
-- Enables: WHERE DATE_TRUNC('month', order_date) = '2024-01-01'  → Index Scan
-- Without: function on every row = Seq Scan

-- Pattern 3: computed margin percentage
CREATE INDEX idx_products_margin
  ON products (ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1));
-- Enables: WHERE ROUND((unit_price - cost_price)/NULLIF(unit_price,0)*100,1) > 40
-- Without: expression computed on every row = Seq Scan

-- Pattern 4: JSONB field extraction
-- (for tables with JSONB columns storing structured data)
CREATE INDEX idx_events_user_id
  ON events ((payload->>'user_id'));
-- Enables: WHERE payload->>'user_id' = '42'  → Index Scan
-- Without: full JSONB column scan

-- Key requirement: the query's WHERE expression must be IDENTICAL to the index expression
-- WHERE lower(email) matches idx ON (lower(email))  ✅
-- WHERE lower(trim(email)) does NOT match idx ON (lower(email))  ❌ — different expression`}
      />

      <SQLPlayground
        initialQuery={`-- Queries that need functional indexes in FreshMart
-- Check: are these common query patterns? If yes, functional indexes help

-- Pattern 1: case-insensitive name search
SELECT customer_id, first_name, last_name, email
FROM customers
WHERE LOWER(first_name) = LOWER('priya');
-- Without functional index on LOWER(first_name): Seq Scan every time

-- Pattern 2: find products with margin above threshold
SELECT product_name, category, unit_price, cost_price,
  ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1) AS margin_pct
FROM products
WHERE ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1) > 40
ORDER BY margin_pct DESC;
-- Without functional index on the expression: Seq Scan every time`}
        height={225}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The Write Cost Tradeoff — When Indexes Hurt" />

      <P>Every index is a liability for write operations. INSERT, UPDATE, and DELETE must update every index on the table. A table with 10 indexes performs 10 index writes per row written — on top of the heap write. For write-heavy tables (millions of inserts per day), index overhead accumulates into a meaningful fraction of total write cost. Understanding this tradeoff is what separates thoughtful index design from "add indexes everywhere."</P>

      <H>Measuring index write overhead</H>

      <CodeBlock
        label="Quantifying index overhead on writes"
        code={`-- Check index sizes (large index = large write per row)
SELECT
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(schemaname || '.' || indexname)) AS index_size
FROM pg_indexes
WHERE tablename IN ('orders', 'order_items', 'customers')
  AND schemaname = 'main'
ORDER BY tablename, pg_relation_size(schemaname || '.' || indexname) DESC;

-- Check index usage stats (has this index been used recently?)
SELECT
  relname         AS table_name,
  indexrelname    AS index_name,
  idx_scan        AS times_used,
  idx_tup_read    AS rows_read_via_index,
  idx_tup_fetch   AS rows_fetched_from_heap,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE schemaname = 'main'
ORDER BY idx_scan ASC;           -- sort by usage ascending → unused at top

-- Red flags:
-- idx_scan = 0 → never used → paying write cost with zero read benefit → DROP IT
-- idx_scan < 10 → rarely used → consider dropping and recreating only if needed
-- Large index_size + idx_scan = 0 → expensive to maintain, no benefit`}
      />

      <H>OLTP vs OLAP index philosophy</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['', 'OLTP (transactional)', 'OLAP (analytical)'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Typical queries', 'Point lookups, small result sets', 'Full scans, large aggregations'],
              ['Write pattern', 'Frequent individual row writes', 'Bulk loads, few writes'],
              ['Index philosophy', 'Minimal — 3-5 per table maximum', 'More acceptable — writes are infrequent'],
              ['Primary concern', 'Write overhead per transaction', 'Read throughput on large scans'],
              ['Useful index types', 'PK, FK, equality filter columns', 'Composite, covering, partial, BRIN'],
              ['Avoid', 'Indexes on low-selectivity columns', 'Unneeded indexes on columns never filtered'],
            ].map(([criterion, oltp, olap], i) => (
              <tr key={criterion} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{criterion}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{oltp}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{olap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Index Audit — Finding Unused, Duplicate, and Bloated Indexes" />

      <P>A production database accumulates indexes over time — some added for queries that no longer exist, some duplicated by different developers, some that became redundant after schema changes. Regular index audits keep the index set lean and the write overhead low.</P>

      <CodeBlock
        label="Complete index audit query set"
        code={`-- ── 1. Unused indexes (never used since last stats reset) ──────
SELECT
  schemaname,
  relname         AS table_name,
  indexrelname    AS index_name,
  idx_scan        AS scan_count,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE idx_scan = 0
  AND NOT indisprimary          -- exclude PKs
  AND NOT indisunique           -- exclude unique constraints (they enforce data integrity)
ORDER BY pg_relation_size(indexrelid) DESC;

-- ── 2. Duplicate / redundant indexes ──────────────────────────
-- Index A is redundant if Index B covers all of A's key columns as a prefix
SELECT
  a.tablename,
  a.indexname AS redundant_index,
  a.indexdef  AS redundant_def,
  b.indexname AS covering_index,
  b.indexdef  AS covering_def
FROM pg_indexes AS a
JOIN pg_indexes AS b
  ON a.tablename = b.tablename
  AND a.indexname != b.indexname
  AND b.indexdef LIKE '%' || SPLIT_PART(a.indexdef, '(', 2) || '%'
WHERE a.schemaname = 'public';

-- ── 3. Index bloat (dead versions consuming space) ──────────
-- Run VACUUM ANALYZE to reclaim bloat first
-- Then check if index size is proportional to table size
SELECT
  t.relname   AS table_name,
  pg_size_pretty(pg_table_size(t.oid))           AS table_size,
  pg_size_pretty(pg_indexes_size(t.oid))         AS all_indexes_size,
  ROUND(pg_indexes_size(t.oid)::NUMERIC /
    NULLIF(pg_table_size(t.oid), 0) * 100, 0)    AS index_to_table_pct
FROM pg_class AS t
WHERE t.relkind = 'r'
  AND t.relname IN ('orders', 'order_items', 'customers', 'products')
ORDER BY pg_indexes_size(t.oid) DESC;

-- ── 4. Most used indexes (confirm high-value indexes) ────────
SELECT
  relname         AS table_name,
  indexrelname    AS index_name,
  idx_scan,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC
LIMIT 20;`}
      />

      <SQLPlayground
        initialQuery={`-- Audit FreshMart indexes: size vs usage
SELECT
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(schemaname || '.' || indexname)) AS index_size
FROM pg_indexes
WHERE schemaname = 'main'
ORDER BY tablename, indexname;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Check index usage statistics for FreshMart tables
SELECT
  relname       AS table_name,
  indexrelname  AS index_name,
  idx_scan      AS times_scanned,
  idx_tup_read  AS tuples_read
FROM pg_stat_user_indexes
WHERE schemaname = 'main'
ORDER BY idx_scan DESC;`}
        height={155}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Index Maintenance — REINDEX, VACUUM, and Bloat" />

      <P>Indexes degrade over time. Every UPDATE and DELETE leaves dead index entries — the old values remain in the index until VACUUM reclaims them. Over months of heavy writes, indexes bloat: they contain far more entries than live rows, making scans slower. VACUUM, REINDEX, and monitoring keep indexes healthy.</P>

      <CodeBlock
        label="Index maintenance operations"
        code={`-- VACUUM: reclaim dead tuples and index entries (non-blocking)
VACUUM orders;                    -- reclaim dead tuples in orders + all its indexes
VACUUM ANALYZE orders;            -- reclaim + refresh statistics in one pass
VACUUM VERBOSE ANALYZE orders;    -- with progress output

-- VACUUM FULL: rewrite the table from scratch (exclusive lock — schedule carefully)
-- Only use when bloat is severe and the window allows a table lock
VACUUM FULL orders;               -- rewrites heap and all indexes — exclusive lock

-- REINDEX: rebuild one or all indexes (removes bloat from the index structure)
REINDEX INDEX idx_orders_customer_id;         -- one index (locks the index)
REINDEX TABLE orders;                         -- all indexes on the table (locks all)
REINDEX TABLE CONCURRENTLY orders;            -- PostgreSQL 12+ — no lock (slower)

-- When to REINDEX:
-- pg_stat_user_indexes shows index size >> expected size for the row count
-- After bulk DELETE that removed > 30% of rows
-- After VACUUM FULL on the table (rebuild indexes to match the new heap layout)

-- Autovacuum tuning for high-write tables:
-- Default autovacuum triggers when 20% of rows are dead
-- For high-volume tables, trigger earlier:
ALTER TABLE orders
  SET (autovacuum_vacuum_scale_factor = 0.05,    -- trigger at 5% dead rows
       autovacuum_analyze_scale_factor = 0.02);  -- refresh stats at 2% changes`}
      />

      <SQLPlayground
        initialQuery={`-- Check table and index health statistics
SELECT
  relname                                AS table_name,
  n_live_tup                             AS live_rows,
  n_dead_tup                             AS dead_rows,
  ROUND(n_dead_tup::NUMERIC /
    NULLIF(n_live_tup + n_dead_tup, 0) * 100, 1) AS dead_pct,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze
FROM pg_stat_user_tables
WHERE relname IN ('orders', 'customers', 'products', 'order_items')
ORDER BY dead_pct DESC NULLS LAST;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="The Complete Index Decision Framework" />

      <P>Before creating any index, answer these questions in order. The answers determine whether an index is needed, what type, and exactly which columns to include.</P>

      <DecisionRow
        q="Is this a primary key or unique constraint column?"
        answer="Always index"
        color="#00e676"
        why="Auto-created by PostgreSQL. Mandatory for correctness — do not skip."
      />
      <DecisionRow
        q="Is this a foreign key column?"
        answer="Always index"
        color="#00e676"
        why="Every JOIN on this column without an index is a Seq Scan for every outer row. FK indexes are the highest-impact indexes in any relational schema."
      />
      <DecisionRow
        q="Is this column in WHERE, ORDER BY, or GROUP BY of high-frequency queries?"
        answer="Measure first"
        color={C}
        why="Run EXPLAIN ANALYZE on the query. Check Rows Removed by Filter. If > 10,000 rows removed per query, create the index. If < 1,000, the overhead may not justify it."
      />
      <DecisionRow
        q="Does the WHERE apply a function to the column (LOWER, DATE_TRUNC, etc.)?"
        answer="Functional index"
        color={C}
        why="A plain column index cannot be used when a function is applied. Create a functional index on the exact expression used in the query."
      />
      <DecisionRow
        q="Do queries consistently filter on the same small subset (active rows, one status, recent dates)?"
        answer="Partial index"
        color={C}
        why="Partial index is smaller, faster, and cheaper to maintain. Stronger signal: when the subset is < 30% of the table."
      />
      <DecisionRow
        q="Do queries SELECT only a few columns alongside the filter column?"
        answer="Covering index (INCLUDE)"
        color={C}
        why="INCLUDE the selected columns in the index leaf nodes to enable Index Only Scans. Eliminates the heap fetch entirely."
      />
      <DecisionRow
        q="Is this table heavily write-intensive (> 10,000 inserts/sec)?"
        answer="Minimise indexes"
        color="#f97316"
        why="Each index adds per-row write overhead. For high-write tables, only add indexes that demonstrably improve read latency enough to justify the write cost."
      />
      <DecisionRow
        q="Is this index never appearing in EXPLAIN plans after a week in production?"
        answer="Drop it"
        color="#ff4757"
        why="idx_scan = 0 in pg_stat_user_indexes means zero reads benefited. The index pays write overhead with no read return. Drop it."
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a senior engineer at Zepto. The ops team reports that order placements have slowed by 40% over the last month. After investigation, the orders table now has 18 indexes — accumulated over 2 years of "fix this slow query" patches. Many are unused, several are redundant. You perform a systematic index audit and reduce from 18 to 7 indexes, cutting write overhead by 60% and restoring order placement speed.</P>

      <TimeBlock time="10:00 AM" label="18 indexes on the orders table — audit reveals the accumulation">
        Over 2 years: 5 indexes added for reports that were retired, 3 duplicates from different developers, 2 indexes with zero scans since the last statistics reset, 1 index on a column with only 2 distinct values.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Step 1 — identify unused and redundant indexes">
        Query pg_stat_user_indexes. Sort by idx_scan ascending. Anything with 0 or near-0 scans is a candidate for removal.
      </TimeBlock>

      <CodeBlock
        label="The audit query that found 11 removable indexes"
        code={`-- Find candidates for removal on the orders table
SELECT
  indexrelname    AS index_name,
  idx_scan        AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size,
  CASE
    WHEN idx_scan = 0                  THEN '🔴 Never used — drop'
    WHEN idx_scan < 10                 THEN '🟡 Rarely used — investigate'
    ELSE                                    '🟢 Active — keep'
  END AS recommendation
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE relname = 'orders'
  AND NOT indisprimary
  AND NOT indisunique
ORDER BY idx_scan ASC;

-- Also check for indexes redundant to broader composites:
-- If idx_orders_customer_id EXISTS and
--    idx_orders_customer_date ON (customer_id, order_date) ALSO EXISTS:
-- The single-column idx_orders_customer_id is fully covered by the composite
-- (queries on customer_id alone can use the composite's left prefix)
-- → drop the single-column index, keep the composite`}
      />

      <TimeBlock time="11:15 AM" label="Step 2 — design the minimal correct index set">
        7 indexes cover every query in the workload. The 11 removed indexes were costing 11 extra writes per INSERT with zero read benefit.
      </TimeBlock>

      <CodeBlock
        label="The final 7-index design for orders"
        code={`-- Keep (or create):

-- 1. Primary key (auto-created, cannot remove)
-- orders_pkey ON orders(order_id)

-- 2. FK to customers — every JOIN on customer_id
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- 3. FK to stores — every JOIN on store_id
CREATE INDEX idx_orders_store_id ON orders(store_id);

-- 4. Composite for the queue-processing query (most write-sensitive path)
-- Partial: only Processing orders (< 20% of table)
CREATE INDEX idx_orders_processing_date
  ON orders(order_date, store_id)
  WHERE order_status = 'Processing';

-- 5. Composite covering index for the delivery report
-- Covers: WHERE order_status = 'Delivered' AND order_date range
-- INCLUDE avoids heap fetch for total_amount and customer_id
CREATE INDEX idx_orders_delivered_covering
  ON orders(order_status, order_date)
  INCLUDE (store_id, customer_id, total_amount);

-- 6. Index for customer-facing order history
CREATE INDEX idx_orders_customer_date
  ON orders(customer_id, order_date DESC)
  INCLUDE (order_id, order_status, total_amount);

-- 7. Index for store performance dashboard (by store + month)
CREATE INDEX idx_orders_store_month
  ON orders(store_id, DATE_TRUNC('month', order_date));

-- Removed: 11 indexes covering retired reports, one-off queries,
-- and low-selectivity columns — saving 11 write operations per INSERT`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the impact: how many INSERTs per day on orders?
-- (approximation from the data spread)
SELECT
  MIN(order_date)                          AS first_order,
  MAX(order_date)                          AS last_order,
  COUNT(*)                                 AS total_orders,
  MAX(order_date) - MIN(order_date)        AS days_span,
  ROUND(COUNT(*)::NUMERIC /
    NULLIF(MAX(order_date) - MIN(order_date), 0), 1) AS avg_orders_per_day
FROM orders;
-- At scale: 50,000 orders/day × 11 removed indexes = 550,000 fewer index writes/day`}
        height={185}
        showSchema={true}
      />

      <TimeBlock time="12:30 PM" label="Order placement speed restored — 60% fewer index writes per INSERT">
        From 18 indexes (19 writes per INSERT including heap) to 7 indexes (8 writes per INSERT). The write throughput improvement is immediate — no application code changed, no schema changes, just the index set reduced to the minimum correct set for the actual query workload.
      </TimeBlock>

      <ProTip>
        Run an index audit every quarter. pg_stat_user_indexes resets on server restart but otherwise accumulates since the last reset — so a 90-day window gives reliable signal about which indexes are genuinely unused. Any index with idx_scan = 0 after 90 days of production traffic should be dropped unless it enforces a unique constraint. Set a calendar reminder to review the audit output and drop unused indexes before they accumulate to the point of measurable write degradation.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How do you design a composite index for a query with multiple filter conditions?">
        <p style={{ margin: '0 0 14px' }}>Two rules govern composite index column ordering. First, the left-prefix rule: the index can only be entered from its leftmost column. A query filtering on column B without filtering on column A cannot use an index on (A, B). So every column that must be specified for the index to be usable must appear before columns that are optional. Second, equality before range: within the columns that are always specified, put equality-filter columns before range-filter columns. An equality filter narrows the B-tree traversal to an exact section; a range filter then scans a contiguous span within that section. Reversing the order (range before equality) forces a wider initial scan followed by post-scan filtering.</p>
        <p style={{ margin: '0 0 14px' }}>Example: a query WHERE customer_id = 42 AND order_date &gt; '2024-01-01' AND order_status = 'Delivered'. Three conditions: customer_id is equality, order_status is equality, order_date is range. Best composite: (customer_id, order_status, order_date) — both equality columns first, range column last. The planner navigates to customer 42's delivered orders, then range-scans the dates within that narrow section.</p>
        <p style={{ margin: 0 }}>A third consideration for equality-only composites: selectivity. When all conditions are equality, put the most selective column first — the column with the most distinct values relative to total rows. This minimises the number of rows examined after the first condition. The intuition: if order_status has 4 values, filtering on it first still leaves 25% of rows in play. If customer_id has 50,000 values, filtering on it first leaves one customer's rows. Lead with customer_id for faster elimination. Final step: consider adding INCLUDE columns for frequently selected columns that do not need to be searchable — this enables Index Only Scans.</p>
      </IQ>

      <IQ q="What is a covering index and how does it improve performance?">
        <p style={{ margin: '0 0 14px' }}>A covering index is an index that contains all columns needed to answer a query — both the columns used for filtering (in the index key) and the columns needed for the SELECT list (in INCLUDE). When all needed columns are available in the index, PostgreSQL performs an Index Only Scan — it reads the index and never accesses the main table heap. This eliminates the most expensive part of an index lookup: the random I/O heap fetch for each matching row.</p>
        <p style={{ margin: '0 0 14px' }}>Implementation: the INCLUDE clause in CREATE INDEX adds columns to the index leaf nodes without making them part of the searchable key. CREATE INDEX idx ON orders(customer_id) INCLUDE(order_date, total_amount, order_status). The key column customer_id is searchable and determines the sort order. The included columns are stored at the leaf level only — available for retrieval without heap access, but not usable in WHERE or ORDER BY for index navigation.</p>
        <p style={{ margin: 0 }}>When to use: covering indexes pay off when the query is read-heavy and latency-sensitive, the heap rows are wide (many columns — heap fetch reads the full row), and the included columns are frequently selected alongside the key columns but do not change frequently (updates to included columns require updating all index leaf entries containing them). The tradeoff: INCLUDE columns make the index larger, which increases memory consumption and the time to scan the full index. Do not include rarely-used columns — only the specific columns that appear in the SELECT list of the targeted query. Verify the improvement with EXPLAIN ANALYZE — look for "Index Only Scan" replacing "Index Scan."</p>
      </IQ>

      <IQ q="When would a partial index outperform a full index?">
        <p style={{ margin: '0 0 14px' }}>A partial index outperforms a full index whenever two conditions are true: queries consistently filter on a known subset of rows, and that subset is significantly smaller than the full table. The partial index covers only that subset — it is smaller, its leaf pages fit in fewer memory pages, and index scans cover fewer entries before finding matches. The partial index is also cheaper to maintain: INSERTs and UPDATEs that do not satisfy the partial index condition do not touch the index at all.</p>
        <p style={{ margin: '0 0 14px' }}>Classic examples: a soft-delete table where 90% of rows have is_deleted = true. Queries almost always filter WHERE is_deleted = false. A partial index WHERE is_deleted = false is 10% the size of a full index — 10x faster to search, 10x less write overhead for the 10% of writes that affect active rows. A queue table where 95% of rows have status = 'Processed'. The queue workers query WHERE status = 'Pending'. A partial index WHERE status = 'Pending' covers only the 5% of rows the workers actually query.</p>
        <p style={{ margin: 0 }}>The partial index has a constraint that makes it powerful but specific: it is only used by queries whose WHERE clause implies the index's condition. A query WHERE is_deleted = false AND customer_id = 42 can use the partial index on (customer_id) WHERE is_deleted = false — the query's filter is consistent with the index's partial condition. A query WHERE customer_id = 42 without the is_deleted = false condition cannot use the partial index — the planner cannot be certain all matching customer rows satisfy the partial condition. Design partial indexes around the dominant, high-frequency query pattern for the table — the condition that appears in 80%+ of queries against that table.</p>
      </IQ>

      <IQ q="How do you identify and handle unused indexes in production?">
        <p style={{ margin: '0 0 14px' }}>PostgreSQL tracks index usage in pg_stat_user_indexes. The idx_scan column counts how many times each index has been used for a scan since the last statistics reset (typically the last server restart). Querying SELECT indexrelname, idx_scan, pg_size_pretty(pg_relation_size(indexrelid)) FROM pg_stat_user_indexes WHERE relname = 'table_name' ORDER BY idx_scan ASC reveals the least-used indexes at the top.</p>
        <p style={{ margin: '0 0 14px' }}>The threshold for "unused": an index with idx_scan = 0 after 30 or more days of production traffic has definitively never been used in that period. If the database has been running for 90 days since the last reset, any index with idx_scan = 0 has paid 90 days of write overhead with zero read benefit. Such indexes should be dropped unless they enforce a UNIQUE constraint (which provides data integrity value independent of reads) or are known to support very rare but critical queries like disaster recovery or compliance reports.</p>
        <p style={{ margin: 0 }}>Safe removal process: before dropping, confirm the index is not a unique constraint (indisunique in pg_index). Annotate the DROP statement with a comment about why the index was removed and when, so it can be recreated if needed. Use DROP INDEX CONCURRENTLY to avoid locking the table. After dropping, monitor write throughput and the slow query log for 24-48 hours — if a query that was fast before suddenly appears in the slow log, the dropped index was in fact being used (perhaps only by rare queries). Keep the DROP INDEX scripts in version control so any removed index can be quickly recreated with CREATE INDEX CONCURRENTLY. Repeat the audit quarterly — new queries added by developers may create new index needs, and old queries retired may make existing indexes redundant.</p>
      </IQ>

      <IQ q="How many indexes should a production table have, and what determines the limit?">
        <p style={{ margin: '0 0 14px' }}>There is no universal number, but a practical guideline by workload type: OLTP tables (frequently written by application transactions) should have 3-5 indexes maximum — the primary key, foreign key indexes, and at most 2-3 additional query-specific indexes. OLAP or reporting tables (written by infrequent bulk loads, read by complex analytical queries) can tolerate more — 8-12 is reasonable. The ceiling is determined by write throughput, not an arbitrary rule.</p>
        <p style={{ margin: '0 0 14px' }}>The calculation: measure the table's peak INSERT rate (rows per second). Each index adds one write operation per INSERT. At 10,000 inserts/second, each additional index adds 10,000 write operations per second to the database's I/O budget. If the server's total write throughput is 200,000 operations/second and the table has 20 indexes, that table alone consumes 200,000 × 1 (heap) + 200,000 × 20 (indexes) = 4,200,000 write operations/second — likely exceeding the server's capacity.</p>
        <p style={{ margin: 0 }}>The practical approach: start with only mandatory indexes (PK, FK). Add indexes one at a time when EXPLAIN ANALYZE reveals a specific slow query that would benefit. Verify with before/after timing that the read speedup justifies the write cost. Run quarterly audits to remove unused indexes. The correct number of indexes is the smallest set that keeps every query in the workload within its performance target — not the largest set that avoids any possible future slow query. Over-indexing is as harmful as under-indexing; it just manifests as write degradation rather than read degradation.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Index on (store_id, order_date) not used when query filters on order_date only"
        cause="The left-prefix rule: a composite index on (store_id, order_date) can only be entered at the store_id level. A query filtering WHERE order_date > '2024-01-01' without a store_id condition cannot navigate to the relevant section of the index — store_id values are interleaved across all date values, so the entire index would need to be scanned, which is no better than a seq scan."
        fix="Create a separate single-column index on order_date: CREATE INDEX idx_orders_date ON orders(order_date). This serves queries that filter only on order_date. Keep the composite (store_id, order_date) for queries that filter on both. The two indexes coexist — the planner chooses the appropriate one based on the query's WHERE clause. Never assume a composite index can be entered from any column — it can only be entered from the leftmost column specified in the query."
      />

      <Err
        msg="INCLUDE index not producing Index Only Scans — EXPLAIN still shows Index Scan"
        cause="One of the selected columns is not in the INCLUDE list, or the column is in the key portion but the query also selects columns from a joined table that are not in the index. An Index Only Scan is only possible when every column in the SELECT list (and WHERE clause) is either in the index key or in the INCLUDE list — the planner needs zero columns from the heap."
        fix="Compare the SELECT list to the index definition: SELECT indexdef FROM pg_indexes WHERE indexname = 'your_index'. Every column in the SELECT and WHERE must appear in the index. Also check for visibility map issues — PostgreSQL requires pages to be marked all-visible in the heap's visibility map before it can use Index Only Scan safely. Run VACUUM on the table after creating a new covering index: VACUUM table_name. The visibility map is updated by VACUUM — without it, the planner may choose Index Scan even when columns are covered because it cannot safely skip the heap visibility check."
      />

      <Err
        msg="Adding a composite index made some queries faster but a different query slower"
        cause="The new composite index replaced the old single-column index in the planner's choice — the planner now uses the composite for a query that was better served by the single-column index, because the composite has a higher selectivity estimate for the combined columns. Or the composite index is larger, causing more buffer cache eviction, making queries that previously hit the cache now miss it."
        fix="Do not remove the original single-column index when adding a composite that covers the same leading column. Both can coexist — the planner chooses the appropriate one per query. Verify with EXPLAIN ANALYZE that the correct index is chosen for each query pattern. If the new composite is causing cache pressure, check pg_statio_user_indexes for blks_hit vs blks_read ratios — high blks_read indicates cache misses. Consider whether the composite is genuinely needed or whether the workload is better served by the simpler single-column index."
      />

      <Err
        msg="Partial index not being used — EXPLAIN shows Seq Scan despite matching rows"
        cause="The query's WHERE clause does not imply the partial index's condition. For example, a partial index WHERE order_status = 'Delivered' is only used by queries that also have order_status = 'Delivered' in their WHERE clause. A query WHERE customer_id = 5 without an order_status condition cannot use this partial index — the planner cannot assume the index covers all customer 5 rows."
        fix="Ensure the query's WHERE clause explicitly includes the partial index condition. Add WHERE order_status = 'Delivered' to the query, or create a composite that includes order_status as a regular key column (not partial). To test whether the index would be used if the condition matched, run EXPLAIN with SET enable_seqscan = off to see what plan the planner would choose if forced to use an index. If the partial index appears in that plan, the condition is the issue — add it to the query."
      />

      <Err
        msg="Functional index created but query still gets Seq Scan"
        cause="The expression in the query's WHERE clause does not exactly match the expression in the functional index definition. Even minor differences — extra whitespace in the expression string, a different function call (LOWER vs lower), or slightly different argument order — cause the planner to treat them as different expressions. PostgreSQL's expression matching is exact."
        fix="Compare the index definition to the query expression exactly: SELECT indexdef FROM pg_indexes WHERE indexname = 'your_functional_index'. The function and arguments must be byte-for-byte identical to what is in the WHERE clause. Common mismatches: LOWER(email) vs lower(email) (both work but must be consistent), TRIM(LOWER(email)) vs LOWER(TRIM(email)) (different functions applied in different order — different expressions), and ROUND(col, 2) vs ROUND(col::NUMERIC, 2) (implicit vs explicit cast). Recreate the functional index by copying the exact expression from the query's WHERE clause."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design a complete index strategy for the FreshMart orders table based on the following five query patterns. For each query, write the CREATE INDEX statement (including type, columns, INCLUDE if beneficial, WHERE if partial) and a one-sentence justification. Then write a single audit query that identifies any existing indexes on the orders table with zero scans. Query patterns: (1) Customer order history page: SELECT order_id, order_date, total_amount, order_status FROM orders WHERE customer_id = ? ORDER BY order_date DESC LIMIT 20. (2) Store daily settlement: SELECT store_id, SUM(total_amount) FROM orders WHERE order_status = 'Delivered' AND order_date BETWEEN ? AND ? GROUP BY store_id. (3) Queue worker: SELECT order_id, customer_id, store_id FROM orders WHERE order_status = 'Processing' ORDER BY order_date LIMIT 1 FOR UPDATE SKIP LOCKED. (4) Admin cancellation report: SELECT order_id, customer_id, total_amount FROM orders WHERE order_status = 'Cancelled' AND order_date >= ? ORDER BY order_date DESC. (5) High-value order alert: SELECT order_id, store_id, customer_id, total_amount FROM orders WHERE total_amount > 1000 AND order_status = 'Delivered' AND order_date >= ?."
        hint="Q1: composite (customer_id, order_date DESC) INCLUDE(order_id, total_amount, order_status). Q2: partial WHERE order_status='Delivered' on (order_date) INCLUDE(store_id, total_amount) — or composite (order_status, order_date) INCLUDE. Q3: partial WHERE order_status='Processing' on (order_date). Q4: partial WHERE order_status='Cancelled' on (order_date DESC) INCLUDE. Q5: partial WHERE order_status='Delivered' on (total_amount, order_date) INCLUDE. Audit: pg_stat_user_indexes WHERE idx_scan = 0."
        answer={`-- ── Index 1: Customer order history page ───────────────────────
-- Query: WHERE customer_id = ? ORDER BY order_date DESC LIMIT 20
-- Need: find all orders for a customer, sorted by date, returning 4 columns
CREATE INDEX CONCURRENTLY idx_orders_customer_history
  ON orders (customer_id, order_date DESC)
  INCLUDE (order_id, total_amount, order_status);
-- Justification: composite (customer_id, order_date DESC) matches the
-- exact WHERE + ORDER BY pattern; INCLUDE enables Index Only Scan,
-- eliminating heap fetches for the 4 selected columns.

-- ── Index 2: Store daily settlement ─────────────────────────────
-- Query: WHERE order_status = 'Delivered' AND order_date BETWEEN ? AND ?
-- GROUP BY store_id, SELECT SUM(total_amount)
CREATE INDEX CONCURRENTLY idx_orders_delivered_settlement
  ON orders (order_date)
  INCLUDE (store_id, total_amount)
  WHERE order_status = 'Delivered';
-- Justification: partial index covers only Delivered rows (likely 60-70%
-- of all orders), shrinking the index; date range scan returns store_id
-- and total_amount directly from the index leaf — no heap fetch for SUM.

-- ── Index 3: Queue worker — Processing orders ────────────────────
-- Query: WHERE order_status = 'Processing' ORDER BY order_date LIMIT 1 FOR UPDATE
CREATE INDEX CONCURRENTLY idx_orders_processing_queue
  ON orders (order_date)
  WHERE order_status = 'Processing';
-- Justification: partial index covers only the tiny subset of in-flight
-- Processing orders — this is the smallest and fastest possible index
-- for queue workers; SKIP LOCKED benefits from a lean index to minimise
-- lock contention scanning.

-- ── Index 4: Admin cancellation report ──────────────────────────
-- Query: WHERE order_status = 'Cancelled' AND order_date >= ?
CREATE INDEX CONCURRENTLY idx_orders_cancelled_date
  ON orders (order_date DESC)
  INCLUDE (order_id, customer_id, total_amount)
  WHERE order_status = 'Cancelled';
-- Justification: partial index on Cancelled orders (typically a small
-- fraction of total orders); DESC on order_date matches the ORDER BY
-- in the report query directly — no Sort node needed; INCLUDE provides
-- all selected columns for Index Only Scan.

-- ── Index 5: High-value delivered order alert ────────────────────
-- Query: WHERE total_amount > 1000 AND order_status = 'Delivered' AND order_date >= ?
CREATE INDEX CONCURRENTLY idx_orders_highvalue_delivered
  ON orders (total_amount DESC, order_date)
  INCLUDE (order_id, store_id, customer_id)
  WHERE order_status = 'Delivered';
-- Justification: partial index on Delivered orders; total_amount DESC
-- as leading key serves the high-value filter efficiently (range scan
-- from the top); order_date narrows the date window within that range;
-- INCLUDE delivers all selected columns without heap access.

-- ── Audit query: unused indexes on orders ────────────────────────
SELECT
  indexrelname                                    AS index_name,
  idx_scan                                        AS times_used,
  pg_size_pretty(pg_relation_size(indexrelid))    AS index_size,
  '⚠ Drop candidate — paying write cost with zero read benefit' AS recommendation
FROM pg_stat_user_indexes
JOIN pg_index USING (indexrelid)
WHERE relname = 'orders'
  AND idx_scan = 0
  AND NOT indisprimary
  AND NOT indisunique
ORDER BY pg_relation_size(indexrelid) DESC;`}
        explanation="Each index addresses exactly one query pattern and no more. Index 1 uses a descending order_date in the key so the ORDER BY order_date DESC in the query requires no Sort node — the index is already in the right order. Without DESC, PostgreSQL would need to reverse-scan the index or add a sort step. Index 2 uses a partial WHERE order_status = 'Delivered' because the settlement query always filters on Delivered — the partial index is smaller than a full index and the planner's row estimate for this condition is more accurate. The INCLUDE on store_id and total_amount enables the GROUP BY + SUM to run as an Index Only Scan. Index 3 is intentionally minimal — no INCLUDE — because the FOR UPDATE SKIP LOCKED pattern is latency-sensitive and the index is already tiny (Processing orders are a small, fast-moving subset). Adding INCLUDE would slightly enlarge the index and is unnecessary since the worker immediately updates the locked row anyway. Index 4 uses DESC on order_date to match the query's ORDER BY exactly. If the index stored ASC dates, the planner would need a reverse scan (cheaper than a full Sort, but still extra work). Index 5 leads with total_amount because it is the range condition that reduces the result set most dramatically — most orders are below ₹1000, so total_amount > 1000 is highly selective. The audit query excludes primary keys and unique indexes because even with idx_scan = 0, unique indexes enforce data integrity constraints that are valuable regardless of whether they serve read queries."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The index tradeoff: every index makes reads faster and writes slower. Add an index only when the measured read speedup on real queries outweighs the write overhead for the table\'s write volume.',
          'Left-prefix rule: a composite index on (A, B, C) can be entered for queries specifying A, or A+B, or A+B+C — never for queries that skip A. The leading column must always be present.',
          'Equality before range: in composite indexes, put equality-filter columns before range-filter columns. Equality narrows to an exact section; range then scans within that narrow section.',
          'Covering indexes (INCLUDE): store additional columns in index leaf nodes so queries can be answered without touching the table heap — enabling Index Only Scans. Only INCLUDE columns that appear in the SELECT list of the target query.',
          'Partial indexes add WHERE to the index definition. Only matching rows are indexed — the index is smaller, faster, and cheaper to maintain. Use when queries consistently target a subset smaller than ~30% of the table.',
          'Functional indexes store the result of an expression (LOWER(email), DATE_TRUNC(\'month\', col)). Required when WHERE applies a function to a column — a plain column index cannot be used for function predicates.',
          'OLTP tables: maximum 3-5 indexes. Each index adds one write operation per INSERT. A table with 18 indexes performs 19 writes per INSERT — this adds up at thousands of inserts per second.',
          'Index audit quarterly: query pg_stat_user_indexes WHERE idx_scan = 0. Any index with zero scans after 30+ days of production traffic pays write overhead with zero read benefit — drop it.',
          'VACUUM keeps indexes healthy by reclaiming dead entries from UPDATE and DELETE. Use REINDEX CONCURRENTLY for severe index bloat. Tune autovacuum_vacuum_scale_factor lower on high-write tables.',
          'The decision framework in order: always index PK and FK columns → measure before adding any other index → use partial for subset queries → use functional for expression predicates → use INCLUDE for covering → drop any index with idx_scan = 0.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 57</strong>, you learn Query Best Practices — the full set of SQL writing habits that separate beginner queries from production-grade code: sargability, NULL handling, anti-patterns, and writing SQL that stays fast as data grows.
        </p>
        <Link href="/learn/sql/query-best-practices" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 57 → Query Best Practices
        </Link>
      </div>

    </LearnLayout>
  );
}