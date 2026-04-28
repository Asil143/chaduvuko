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

const NodeCard = ({ node, color, meaning, signal, fix }: {
  node: string; color: string; meaning: string; signal: string; fix: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}25`, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
    <div style={{ padding: '10px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color }}>{node}</span>
    </div>
    <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10 }}>
      {[['What it does', meaning], ['Performance signal', signal], ['When to act', fix]].map(([label, val]) => (
        <div key={label}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function ExplainAnalyze() {
  return (
    <LearnLayout
      title="EXPLAIN and Query Optimisation"
      description="Read execution plans, spot bottlenecks, understand every node type, and apply the systematic workflow that turns a 30-second query into a 300-millisecond one"
      section="SQL — Module 55"
      readTime="14–20 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Queries Are Slow — The Mental Model" />

      <P>A slow SQL query has exactly one of three root causes: it reads too many rows it does not need (missing index, bad filter), it does expensive work repeatedly (nested loop on a large table, function on every row, missing join condition), or it transfers too much data between the storage layer and the query engine (wide SELECT *, large intermediate results). EXPLAIN ANALYZE shows you which of these is happening and exactly where.</P>

      <P>The query planner is the component that decides <Hl>how</Hl> to execute your SQL. It considers available indexes, table statistics, join order, and join strategy, then picks the plan it estimates will cost the least. The planner is usually right but not always — stale statistics, misleading data distributions, and missing indexes all cause it to choose suboptimal plans. EXPLAIN shows the plan it chose. EXPLAIN ANALYZE shows the plan it chose AND what actually happened at runtime.</P>

      <CodeBlock
        label="EXPLAIN vs EXPLAIN ANALYZE — when to use each"
        code={`-- EXPLAIN: shows the plan WITHOUT executing the query
-- Safe to run on INSERT/UPDATE/DELETE — data is not changed
-- Use when: you want to inspect the plan before running an expensive query
EXPLAIN SELECT * FROM orders WHERE customer_id = 5;

-- EXPLAIN ANALYZE: executes the query AND shows the plan
-- DANGEROUS on INSERT/UPDATE/DELETE without a ROLLBACK wrapper
-- Use when: you need actual timing and row counts (plan vs reality)
EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 5;

-- Safe pattern for DML:
BEGIN;
EXPLAIN ANALYZE UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1;
ROLLBACK;   -- undo the actual change

-- EXPLAIN (FORMAT JSON): machine-readable output for tools
EXPLAIN (ANALYZE, FORMAT JSON) SELECT ...;

-- EXPLAIN (BUFFERS): shows cache hit/miss statistics
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
-- Buffers output tells you how much data came from cache vs disk
-- Hit = fast (from shared buffer cache)  Miss = slow (from disk)`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Reading an Execution Plan — The Basics" />

      <P>An execution plan is a tree of nodes read from the <Hl>bottom up</Hl>. The deepest nodes execute first — they scan tables and indexes. Their output flows up to parent nodes that filter, join, sort, and aggregate. The root node at the top produces the final result.</P>

      <CodeBlock
        label="Annotated execution plan — every field explained"
        code={`EXPLAIN ANALYZE
SELECT o.order_id, c.first_name, o.total_amount
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
  AND o.total_amount > 500;

-- Example output:
Hash Join  (cost=12.50..89.30 rows=45 width=64)
           (actual time=0.412..1.823 rows=38 loops=1)
  Hash Cond: (o.customer_id = c.customer_id)
  ->  Seq Scan on orders o  (cost=0.00..72.40 rows=45 width=32)
                             (actual time=0.018..1.201 rows=38 loops=1)
        Filter: ((order_status = 'Delivered') AND (total_amount > 500))
        Rows Removed by Filter: 82
  ->  Hash  (cost=8.20..8.20 rows=220 width=36)
             (actual time=0.189..0.189 rows=20 loops=1)
        Buckets: 1024  Batches: 1  Memory Usage: 10kB
        ->  Seq Scan on customers c  (cost=0.00..8.20 rows=220 width=36)
                                      (actual time=0.009..0.112 rows=20 loops=1)
Planning Time: 0.285 ms
Execution Time: 1.893 ms

-- Field by field:
-- cost=0.00..72.40   startup cost .. total cost (arbitrary planner units)
-- rows=45            planner's ESTIMATED row count
-- width=32           estimated average row width in bytes
-- actual time=0.018..1.201  real time: startup ms .. total ms
-- rows=38            ACTUAL row count at runtime
-- loops=1            how many times this node ran
-- Rows Removed by Filter: 82  rows read but discarded — wasted work`}
      />

      <H>The five numbers to read immediately</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { label: 'Execution Time (bottom line)', color: '#00e676', desc: 'Total wall-clock time the query took. This is the number you are trying to reduce.' },
          { label: 'actual rows vs rows estimate', color: C, desc: 'Large divergence (actual=100,000 vs estimated=10) means stale statistics. Run ANALYZE on the table.' },
          { label: 'Rows Removed by Filter', color: '#f97316', desc: 'Rows read and discarded. High ratio = missing index on the filter column.' },
          { label: 'loops=N on inner nodes', color: '#8b5cf6', desc: 'If a nested loop runs 10,000 times and each loop scans 500 rows, that is 5 million row reads.' },
          { label: 'Node type at each level', color: '#ff4757', desc: 'Seq Scan on large tables is the primary red flag. Hash Join and Merge Join are usually fine.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '12px 16px' }}>
            <div style={{ flexShrink: 0, width: 10, borderRadius: 4, background: item.color, alignSelf: 'stretch' }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px', fontFamily: 'var(--font-mono)' }}>{item.label}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <SQLPlayground
        initialQuery={`-- Read the plan for a multi-table query
EXPLAIN
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name || ' ' || c.last_name AS customer,
  s.city
FROM orders      AS o
JOIN customers   AS c ON o.customer_id = c.customer_id
JOIN stores      AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
  AND o.total_amount > 500
ORDER BY o.total_amount DESC
LIMIT 10;`}
        height={210}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Node Types — What Each One Means" />

      <NodeCard
        node="Seq Scan (Sequential Scan)"
        color="#ff4757"
        meaning="Reads every row in the table from start to finish. No index used."
        signal="⚠ Investigate on tables > 1,000 rows. Check Rows Removed by Filter ratio."
        fix="Add an index on the filter column. If > 15% of rows match, seq scan may be intentional."
      />
      <NodeCard
        node="Index Scan"
        color="#00e676"
        meaning="Uses a B-tree index to find matching rows, then fetches each row from the table heap."
        signal="✅ Good. Index used — random access to table for matching rows."
        fix="If index scan is slow, check if a covering index (INCLUDE) could eliminate the heap fetch."
      />
      <NodeCard
        node="Index Only Scan"
        color="#00e676"
        meaning="All needed columns are in the index leaf nodes. No table heap access at all."
        signal="✅ Best possible. Covering index hit — zero table access."
        fix="No action needed. Aim for this on frequently queried columns."
      />
      <NodeCard
        node="Bitmap Index Scan + Bitmap Heap Scan"
        color={C}
        meaning="Builds a bitmap of matching page locations from the index, then batch-fetches those pages."
        signal="✅ Good for medium-selectivity queries. Efficient when many rows match."
        fix="Normal and expected. Better than Seq Scan, slightly less selective than Index Scan."
      />
      <NodeCard
        node="Hash Join"
        color={C}
        meaning="Builds a hash table from the smaller relation, probes it with each row from the larger."
        signal="✅ Common and efficient for large joins where neither side is tiny."
        fix="Check memory usage. If hash join spills to disk (Batches > 1), increase work_mem."
      />
      <NodeCard
        node="Nested Loop"
        color="#f97316"
        meaning="For each row in the outer relation, looks up matching rows in the inner relation."
        signal="✅ Efficient when outer is small and inner lookup uses an index. ⚠ Slow if outer is large."
        fix="Verify inner side uses an Index Scan. If outer is large, planner may be wrong about row estimates."
      />
      <NodeCard
        node="Merge Join"
        color={C}
        meaning="Sorts both inputs on the join key, then merges them in a single pass."
        signal="✅ Efficient when inputs are already sorted or can be sorted cheaply."
        fix="Normal. May add Sort node above each input — check if an index on the join column could avoid the sort."
      />
      <NodeCard
        node="Sort"
        color="#f97316"
        meaning="Sorts rows for ORDER BY, Merge Join, or window functions."
        signal="⚠ Check if sort spills to disk (Sort Method: external merge). Indicates work_mem too low."
        fix="Add an index on the ORDER BY column. Increase work_mem if sort is necessary and spilling."
      />
      <NodeCard
        node="Hash Aggregate / Group Aggregate"
        color={C}
        meaning="Computes GROUP BY using a hash table (Hash Agg) or sorted input (Group Agg)."
        signal="✅ Normal. Hash Agg is usually faster. Check memory usage."
        fix="If Hash Agg uses too much memory, it batches — check Batches count in EXPLAIN output."
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="The Optimisation Workflow — Systematic Diagnosis" />

      <P>Every query optimisation follows the same workflow. Never guess and add random indexes. Always diagnose first — read the plan, identify the most expensive node, fix that node, measure again. Repeat until the query meets its performance target.</P>

      <CodeBlock
        label="The 5-step optimisation workflow"
        code={`-- Step 1: measure baseline
EXPLAIN ANALYZE <your slow query>;
-- Record: Execution Time, node types, row estimates vs actuals

-- Step 2: identify the worst node
-- Look for: largest actual time, highest loops count, Seq Scan on large table,
-- large divergence between estimated and actual rows

-- Step 3: diagnose root cause
-- Seq Scan + high Rows Removed by Filter → missing index on filter column
-- Estimated rows ≪ Actual rows → stale statistics → ANALYZE table_name
-- Nested Loop with large outer → planner misjudged row counts → fix stats
-- Sort node with "external merge" → spilling to disk → increase work_mem
-- Index Scan on small table → might be correct → verify with EXPLAIN ANALYZE

-- Step 4: apply one fix at a time
-- Create index, rewrite query, or update statistics
-- Only one change per iteration — otherwise you cannot attribute improvement

-- Step 5: measure again
EXPLAIN ANALYZE <same query>;
-- Compare execution times. If improved, verify the fix addresses the root cause.
-- If not improved, undo and try a different approach.`}
      />

      <SQLPlayground
        initialQuery={`-- Step 1: baseline plan for a multi-condition query
EXPLAIN
SELECT
  o.order_id,
  o.store_id,
  o.order_date,
  o.total_amount,
  o.order_status
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
  AND o.total_amount > 300
ORDER BY o.total_amount DESC;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: check what percentage of rows the filter removes
-- High removal ratio = good index candidate
SELECT
  COUNT(*)                                          AS total_rows,
  COUNT(*) FILTER (WHERE order_status = 'Delivered'
    AND order_date >= '2024-01-01'
    AND total_amount > 300)                         AS matching_rows,
  ROUND(
    COUNT(*) FILTER (WHERE order_status = 'Delivered'
      AND order_date >= '2024-01-01'
      AND total_amount > 300)::NUMERIC
    / COUNT(*) * 100
  , 1)                                              AS match_pct
FROM orders;
-- If match_pct is < 15%, an index will help significantly
-- If match_pct is > 50%, seq scan may be faster than index scan`}
        height={220}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Stale Statistics — When the Planner Is Wrong" />

      <P>The query planner uses table statistics to estimate how many rows each node will produce. These statistics (stored in pg_statistic) are updated by VACUUM ANALYZE and by autovacuum, but on fast-growing or frequently updated tables they can become stale. When estimated rows diverge massively from actual rows, the planner makes wrong plan choices — choosing a nested loop when a hash join would be better, or choosing a seq scan when an index would be faster.</P>

      <CodeBlock
        label="Diagnosing and fixing stale statistics"
        code={`-- Spot stale statistics: estimated vs actual divergence in EXPLAIN ANALYZE
-- Seq Scan on orders  (cost=0.00..4.25 rows=10 width=64)
--                     (actual time=0.018..1.201 rows=10000 loops=1)
-- rows=10 estimated vs rows=10000 actual → statistics are badly stale

-- Check when statistics were last updated:
SELECT
  relname,
  n_live_tup,
  n_dead_tup,
  last_analyze,
  last_autoanalyze
FROM pg_stat_user_tables
WHERE relname = 'orders';

-- Fix: refresh statistics manually
ANALYZE orders;          -- refresh stats for one table
ANALYZE;                 -- refresh all tables in current database

-- Check the planner's current estimate for a column:
SELECT
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE tablename = 'orders'
  AND attname = 'order_status';
-- n_distinct: estimated number of distinct values
-- correlation: 1.0 = physically sorted, 0 = random order

-- For very skewed distributions, increase statistics target:
ALTER TABLE orders ALTER COLUMN order_status SET STATISTICS 500;
-- Default is 100. Higher = more histogram buckets = better estimates
-- for skewed data. Run ANALYZE after changing.`}
      />

      <SQLPlayground
        initialQuery={`-- Inspect current statistics for FreshCart tables
SELECT
  tablename,
  attname                                    AS column_name,
  n_distinct,
  ROUND(correlation::NUMERIC, 3)             AS sort_correlation,
  most_common_vals::TEXT                     AS top_values,
  most_common_freqs::TEXT                    AS top_frequencies
FROM pg_stats
WHERE tablename IN ('orders', 'customers', 'products')
  AND attname IN ('order_status', 'loyalty_tier', 'category', 'store_id')
ORDER BY tablename, attname;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The Function Trap — The Most Common Performance Bug" />

      <P>Applying a function to an indexed column in WHERE silently defeats the index — the database must apply the function to every row before comparing, forcing a sequential scan. This is the single most common performance bug in production SQL and the first thing to look for when a query is unexpectedly slow on an indexed column.</P>

      <CodeBlock
        label="Function trap — patterns and fixes"
        code={`-- ❌ SLOW: function on indexed column forces Seq Scan
WHERE LOWER(email) = 'user@example.com'        -- index on email NOT used
WHERE YEAR(order_date) = 2024                  -- index on order_date NOT used
WHERE DATE_TRUNC('month', order_date) = '2024-01-01'  -- NOT used
WHERE CAST(customer_id AS TEXT) = '42'         -- NOT used
WHERE total_amount::INTEGER = 500              -- NOT used

-- ✅ FAST: rewrite to compare raw column — index IS used
WHERE email = 'user@example.com'              -- case-sensitive (use functional idx for CI)
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01'              -- range scan instead of YEAR()
WHERE order_date >= '2024-01-01'
  AND order_date <  '2024-02-01'              -- range scan instead of DATE_TRUNC
WHERE customer_id = 42                        -- integer, no cast needed

-- ✅ FAST alternative: functional index matching the expression
CREATE INDEX idx_orders_month ON orders (DATE_TRUNC('month', order_date));
-- Now WHERE DATE_TRUNC('month', order_date) = '2024-01-01' uses the index

-- ❌ Also slow: leading wildcard LIKE
WHERE product_name LIKE '%Milk'               -- Seq Scan (% at start)
WHERE product_name LIKE '%milk%'              -- Seq Scan

-- ✅ Fast: trailing wildcard only
WHERE product_name LIKE 'Amul%'              -- Index Scan (prefix match)`}
      />

      <SQLPlayground
        initialQuery={`-- Compare: filter with vs without function on date column
-- Both return the same rows — very different performance at scale

-- Version A: function on column (defeats index)
-- WHERE DATE_TRUNC('month', order_date) = '2024-01-01'
-- Equivalent rewrite — range scan instead:
-- Version B: range comparison (index-friendly)
SELECT
  COUNT(*)                             AS order_count,
  ROUND(SUM(total_amount), 2)          AS revenue
FROM orders
WHERE order_status = 'Delivered'
  AND order_date >= '2024-01-01'       -- Version B: range on raw column
  AND order_date <  '2024-02-01';      -- index on order_date CAN be used`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Join Optimisation — Order, Strategy, and Missing FKs" />

      <P>Join performance depends on three factors: the join strategy the planner chooses (hash, merge, or nested loop), the order in which tables are joined, and whether the join columns have indexes. The most impactful fix is almost always adding a missing index on a foreign key column.</P>

      <H>The FK index rule</H>

      <CodeBlock
        label="Always index foreign key columns"
        code={`-- Every FK column must have an index — without it, every join does a Seq Scan
-- on the referencing table for each row in the referenced table

-- Common culprit: order_items.order_id with no index
-- Query: SELECT * FROM orders JOIN order_items ON order_items.order_id = orders.order_id
-- Without index on order_items.order_id:
--   Nested Loop: for each order (100K rows), Seq Scan all of order_items (1M rows)
--   = 100,000 × 1,000,000 = 100 billion row reads

-- With index on order_items.order_id:
--   Nested Loop: for each order, Index Scan on order_items → ~10 matching rows
--   = 100,000 × 10 = 1 million row reads (100,000x faster)

-- Check for FK columns without indexes:
SELECT
  kcu.table_name,
  kcu.column_name,
  kcu.constraint_name
FROM information_schema.key_column_usage AS kcu
JOIN information_schema.table_constraints AS tc
  ON kcu.constraint_name = tc.constraint_name
  AND tc.constraint_type = 'FOREIGN KEY'
WHERE NOT EXISTS (
  SELECT 1 FROM pg_indexes AS pi
  WHERE pi.tablename = kcu.table_name
    AND pi.indexdef LIKE '%' || kcu.column_name || '%'
)
ORDER BY kcu.table_name;`}
      />

      <H>Join order matters — small tables first</H>

      <CodeBlock
        label="Controlling join order with explicit hints"
        code={`-- PostgreSQL's planner usually chooses good join order
-- But it can be fooled by stale statistics or unusual data distributions

-- Check the planner's join order in EXPLAIN output:
-- The innermost (deepest) table is scanned first
-- "Hash on customers → probe with orders" = customers built into hash, orders probes it

-- To force a specific join order (use sparingly — only after diagnosing):
SET join_collapse_limit = 1;    -- forces planner to use the query's FROM order
-- Then write FROM small_table JOIN large_table (not large JOIN small)
RESET join_collapse_limit;      -- always reset after testing

-- Better alternative: fix statistics with ANALYZE and let planner decide
-- The planner is almost always right when statistics are fresh

-- Subquery trick: force a small result set into the join early
SELECT *
FROM (
  SELECT * FROM orders WHERE order_status = 'Delivered' LIMIT 100
) AS recent
JOIN customers ON customers.customer_id = recent.customer_id;
-- Planner sees LIMIT 100 and knows the inner result is small → better join choice`}
      />

      <SQLPlayground
        initialQuery={`-- Inspect the join strategy on a 3-table query
EXPLAIN
SELECT
  o.order_id,
  c.loyalty_tier,
  s.city,
  COUNT(oi.order_item_id)   AS item_count,
  ROUND(SUM(o.total_amount), 2) AS revenue
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id = c.customer_id
JOIN stores      AS s  ON o.store_id    = s.store_id
JOIN order_items AS oi ON o.order_id   = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY o.order_id, c.loyalty_tier, s.city
ORDER BY revenue DESC
LIMIT 10;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Rewriting Queries for Performance" />

      <P>Sometimes the right fix is not an index but a query rewrite — restructuring the SQL to give the planner a better shape to optimise. Common rewrites: moving filters earlier, replacing correlated subqueries with JOINs, using CTEs to pre-aggregate, and avoiding SELECT *.</P>

      <H>Move filters as early as possible</H>

      <CodeBlock
        label="Filter pushdown — reduce rows before joining"
        code={`-- ❌ SLOW: filter after join — join produces a large intermediate result
SELECT o.order_id, c.first_name, oi.line_total
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id = c.customer_id
JOIN order_items AS oi ON o.order_id    = oi.order_id
WHERE o.order_status = 'Delivered'   -- filter after all joins complete
  AND o.total_amount > 1000;

-- ✅ FAST: filter before joining — subquery reduces orders first
SELECT o.order_id, c.first_name, oi.line_total
FROM (
  SELECT * FROM orders
  WHERE order_status = 'Delivered'
    AND total_amount > 1000
) AS o
JOIN customers   AS c  ON o.customer_id = c.customer_id
JOIN order_items AS oi ON o.order_id    = oi.order_id;

-- Modern PostgreSQL usually pushes WHERE filters down automatically
-- But explicit pre-filtering via CTE or subquery guarantees it
-- and makes the intent clear to future readers`}
      />

      <H>Replace correlated subqueries with JOINs</H>

      <CodeBlock
        label="Correlated subquery vs JOIN — dramatic performance difference"
        code={`-- ❌ SLOW: correlated subquery — runs once per outer row
SELECT
  customer_id,
  first_name,
  (SELECT COUNT(*) FROM orders AS o
   WHERE o.customer_id = c.customer_id
     AND o.order_status = 'Delivered') AS order_count
FROM customers AS c;
-- If customers has 50,000 rows: runs 50,000 separate COUNT queries

-- ✅ FAST: pre-aggregate then JOIN — runs once total
SELECT
  c.customer_id,
  c.first_name,
  COALESCE(stats.order_count, 0)  AS order_count
FROM customers AS c
LEFT JOIN (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS stats ON c.customer_id = stats.customer_id;
-- One pass over orders + one join = dramatically faster`}
      />

      <H>SELECT * — the silent performance killer</H>

      <CodeBlock
        label="SELECT * — why it hurts more than you think"
        code={`-- ❌ SELECT * fetches ALL columns — even wide columns you don't use
SELECT * FROM orders JOIN order_items ON ...;
-- orders has 15 columns, order_items has 8 = 23 columns per row
-- If you only need 4, you are transferring 23/4 = 5.75x more data than needed

-- ✅ Explicit column list — only transfer what you need
SELECT o.order_id, o.total_amount, oi.product_id, oi.quantity
FROM orders AS o JOIN order_items AS oi ON ...;

-- SELECT * also prevents covering index usage:
-- Index on (customer_id) INCLUDE (total_amount, order_date)
-- SELECT * FROM orders WHERE customer_id = 5
--   → cannot use index-only scan (index does not have all columns)
-- SELECT order_id, total_amount, order_date FROM orders WHERE customer_id = 5
--   → index-only scan possible (all requested columns in index)

-- In production: NEVER use SELECT * in application queries
-- In ad-hoc analysis/EXPLAIN: SELECT * is fine for exploration`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate correlated subquery vs pre-aggregated join
-- Version A: correlated subquery pattern (educational — shows what to avoid)
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier,
  -- This subquery runs once per customer row
  (SELECT COUNT(*)
   FROM orders AS o
   WHERE o.customer_id = c.customer_id
     AND o.order_status = 'Delivered')     AS delivered_orders,
  (SELECT ROUND(SUM(total_amount), 2)
   FROM orders AS o
   WHERE o.customer_id = c.customer_id
     AND o.order_status = 'Delivered')     AS lifetime_value
FROM customers AS c
ORDER BY lifetime_value DESC NULLS LAST
LIMIT 5;`}
        height={225}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Version B: pre-aggregated JOIN (the correct approach)
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier,
  COALESCE(s.delivered_orders, 0)          AS delivered_orders,
  COALESCE(s.lifetime_value, 0)            AS lifetime_value
FROM customers AS c
LEFT JOIN (
  SELECT
    customer_id,
    COUNT(*)                               AS delivered_orders,
    ROUND(SUM(total_amount), 2)            AS lifetime_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS s ON c.customer_id = s.customer_id
ORDER BY lifetime_value DESC NULLS LAST
LIMIT 5;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="work_mem, Spilling, and Memory Tuning" />

      <P>Some query operations — sorting, hash joins, hash aggregation — require memory to hold intermediate results. When the result exceeds the available memory (controlled by work_mem), PostgreSQL spills to disk. Disk spills are 100–1000x slower than in-memory operations. EXPLAIN ANALYZE reveals spills in the node output.</P>

      <CodeBlock
        label="Diagnosing and fixing disk spills"
        code={`-- Signs of disk spill in EXPLAIN ANALYZE:

-- Sort spill:
Sort  (cost=...) (actual time=...)
  Sort Key: total_amount DESC
  Sort Method: external merge  Disk: 4096kB
--             ^^^^^^^^^^^^^^ spilled to disk

-- Hash Join spill:
Hash  (cost=...) (actual time=...)
  Buckets: 1024  Batches: 8  Memory Usage: 4096kB
--                ^^^^^^^^^ Batches > 1 means spilled to disk

-- Hash Aggregate spill (PostgreSQL 13+):
HashAggregate  (cost=...)
  Group Key: store_id
  Batches: 4  Memory Usage: 8192kB
--         ^ Batches > 1 means spilled

-- Fix: increase work_mem for the session (not globally — too risky)
SET work_mem = '64MB';    -- default is 4MB — often too low for analytics
<run your query>
RESET work_mem;

-- Or in a transaction:
BEGIN;
SET LOCAL work_mem = '256MB';
<analytics query>
COMMIT;

-- NEVER set work_mem globally to a large value:
-- Each sort/hash node per query per session gets its own work_mem allocation
-- 10 concurrent sessions × 5 nodes each × 256MB = 12.8 GB — can OOM the server`}
      />

      <SQLPlayground
        initialQuery={`-- Check current work_mem setting
SHOW work_mem;`}
        height={100}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Stripe. A settlement report query that used to run in 2 seconds now takes 4 minutes. The database grew from 5 million to 50 million transactions over the last quarter. You have 30 minutes to diagnose and fix before the finance team's daily report runs.</P>

      <TimeBlock time="7:30 AM" label="Alert: settlement report timing out at 4 minutes">
        The query joins transactions, merchants, and payment_methods. It ran fine last quarter. Same query, 10x more data.
      </TimeBlock>

      <TimeBlock time="7:35 AM" label="Step 1 — run EXPLAIN ANALYZE on the slow query">
        Adapted for FreshCart: the equivalent is a revenue reconciliation across orders, stores, and customers.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Baseline plan for the settlement-style report
EXPLAIN
SELECT
  s.city,
  c.loyalty_tier,
  DATE_TRUNC('month', o.order_date)::DATE    AS month_start,
  COUNT(DISTINCT o.order_id)                 AS order_count,
  COUNT(DISTINCT o.customer_id)              AS unique_customers,
  ROUND(SUM(o.total_amount), 2)              AS gross_revenue,
  ROUND(SUM(oi.line_total), 2)               AS item_revenue,
  ROUND(AVG(o.total_amount), 2)              AS avg_order
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id = c.customer_id
JOIN stores      AS s  ON o.store_id    = s.store_id
JOIN order_items AS oi ON o.order_id    = oi.order_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
GROUP BY s.city, c.loyalty_tier, DATE_TRUNC('month', o.order_date)
ORDER BY month_start, s.city;`}
        height={255}
        showSchema={true}
      />

      <TimeBlock time="7:38 AM" label="Step 2 — identify the bottleneck">
        EXPLAIN shows Seq Scan on orders with Rows Removed by Filter: 820,000. No index on order_status + order_date. Also shows estimated rows = 50 vs actual = 48,000 — stale statistics.
      </TimeBlock>

      <TimeBlock time="7:42 AM" label="Step 3 — fix statistics first, then add composite index">
        ANALYZE orders refreshes the planner's estimates. Then add the missing index.
      </TimeBlock>

      <CodeBlock
        label="The two fixes that cut 4 minutes to 3 seconds"
        code={`-- Fix 1: refresh statistics (30 seconds, safe to run any time)
ANALYZE orders;
ANALYZE order_items;

-- Fix 2: composite partial index (build concurrently — no table lock)
CREATE INDEX CONCURRENTLY idx_orders_delivered_date_store
  ON orders (order_date, store_id, customer_id)
  WHERE order_status = 'Delivered';
-- Partial: only indexes Delivered rows (~60% of table)
-- Composite: covers the WHERE + JOIN columns together
-- Covering via INCLUDE would add total_amount:
CREATE INDEX CONCURRENTLY idx_orders_delivered_covering
  ON orders (order_date)
  INCLUDE (store_id, customer_id, total_amount)
  WHERE order_status = 'Delivered';

-- After indexes are built:
EXPLAIN ANALYZE <same query>;
-- Expected change:
-- Seq Scan on orders → Bitmap Index Scan or Index Scan
-- rows estimate now matches actual (statistics fixed)
-- Execution Time: 4 min → ~3 sec`}
      />

      <SQLPlayground
        initialQuery={`-- Verify the fix by checking selectivity — what % of orders are Delivered?
SELECT
  order_status,
  COUNT(*)                                           AS row_count,
  ROUND(COUNT(*)::NUMERIC / SUM(COUNT(*)) OVER () * 100, 1) AS pct
FROM orders
GROUP BY order_status
ORDER BY row_count DESC;
-- If Delivered is < 80% of rows, a partial index WHERE order_status = 'Delivered'
-- gives meaningful size reduction and faster scans`}
        height={185}
        showSchema={true}
      />

      <TimeBlock time="8:05 AM" label="Query runs in 3.1 seconds — report delivered on time">
        Two targeted fixes: ANALYZE refreshed stale statistics so the planner chose hash join over nested loop, and the partial composite index eliminated the sequential scan on delivered orders. No query rewrite required — the query was correct, the infrastructure was wrong.
      </TimeBlock>

      <ProTip>
        Always fix statistics before adding indexes. Stale statistics cause wrong plan choices that indexes alone cannot fix — the planner may still choose a seq scan even after you add an index if it thinks very few rows exist. ANALYZE is free, instant, and safe. Run it first. Then add indexes. Then rewrite the query if both prior fixes are insufficient. This order saves significant time and avoids adding unnecessary indexes.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between EXPLAIN and EXPLAIN ANALYZE?">
        <p style={{ margin: '0 0 14px' }}>EXPLAIN shows the query execution plan without running the query. It displays the planner's chosen strategy — which tables will be scanned, which indexes will be used, which join strategies will be applied, and the planner's cost estimates and row count estimates. Since the query does not execute, EXPLAIN is safe to run on any query including INSERT, UPDATE, and DELETE with no side effects. Use it when you want to preview the plan for an expensive query before committing to running it.</p>
        <p style={{ margin: '0 0 14px' }}>EXPLAIN ANALYZE actually executes the query and augments the plan output with runtime data: actual execution time per node in milliseconds, actual row counts produced by each node, the number of loops each node ran, and at the bottom, the total Planning Time and Execution Time. This is the essential tool for diagnosing performance — it shows both what the planner intended and what actually happened, making divergences immediately visible.</p>
        <p style={{ margin: 0 }}>The critical safety rule: EXPLAIN ANALYZE on INSERT, UPDATE, or DELETE actually modifies the data. Always wrap it in a transaction: BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK; The ROLLBACK undoes the modification while retaining the plan output. For SELECT queries, EXPLAIN ANALYZE is always safe since selects have no side effects. The most useful combination is EXPLAIN (ANALYZE, BUFFERS) which adds cache hit and miss statistics — showing how much data came from the shared buffer cache versus disk, which determines whether slow queries are memory-bound or disk-bound.</p>
      </IQ>

      <IQ q="You see a Seq Scan in the execution plan. Is that always a problem?">
        <p style={{ margin: '0 0 14px' }}>No — a Seq Scan is only a problem when it is reading far more rows than the query needs. For a table of 100 rows, a Seq Scan is always correct — the overhead of an index lookup on 100 rows exceeds the cost of just reading all 100 rows directly. For a table with 10 million rows where only 50 rows match the WHERE condition, a Seq Scan is a serious problem — it reads 9,999,950 unnecessary rows.</p>
        <p style={{ margin: '0 0 14px' }}>The diagnostic is Rows Removed by Filter in EXPLAIN ANALYZE output. If a Seq Scan on orders reads 50,000 rows and removes 49,500 by filter (keeping only 500), the filter selectivity is 1% — an index would reduce this to 500 reads instead of 50,000. If a Seq Scan reads 50,000 rows and removes 5,000 (keeping 45,000 — 90% match rate), an index would actually be slower than the seq scan because the database would need 45,000 random index lookups instead of one sequential read.</p>
        <p style={{ margin: 0 }}>The planner's decision: PostgreSQL chooses between Seq Scan and Index Scan based on the estimated selectivity of the filter conditions. If the planner estimates more than approximately 10–15% of rows will match, it prefers Seq Scan. This threshold exists because sequential reads are dramatically faster on disk than random index-based reads. The planner is usually right. When a Seq Scan appears unexpectedly on a highly selective query, check for: stale statistics causing wrong selectivity estimates, a function applied to the filter column defeating the index, or an index that exists but does not match the query's predicates.</p>
      </IQ>

      <IQ q="What causes the estimated row count to diverge massively from the actual row count?">
        <p style={{ margin: '0 0 14px' }}>Stale statistics — the planner's row count estimates are based on table statistics stored in pg_statistic, collected by VACUUM ANALYZE and autovacuum. These statistics include histograms of column value distributions, counts of distinct values, and correlation between column order and physical storage order. When the table's data changes significantly (bulk inserts, deletions, or updates) after the last statistics collection, the histogram no longer reflects reality and the planner's estimates become wrong.</p>
        <p style={{ margin: '0 0 14px' }}>Highly skewed data distributions are the second common cause. The default statistics target (statistics_target = 100) creates 100 histogram buckets. If a column has a highly skewed distribution — 95% of rows have status = 'Delivered' and the remaining 5% are split among 4 other values — 100 buckets may not capture the distribution accurately enough for rare values. Queries filtering on rare values get wildly wrong estimates. Fix: ALTER TABLE t ALTER COLUMN c SET STATISTICS 500 followed by ANALYZE — more buckets capture skewed distributions more accurately.</p>
        <p style={{ margin: 0 }}>Complex multi-column predicates are the third cause. The planner estimates the selectivity of multiple WHERE conditions independently and multiplies them together — but correlated columns violate this independence assumption. WHERE city = 'Seattle' AND zip_code = '560001' — Seattle zip codes are a subset of Seattle, so the actual selectivity is much higher than city_selectivity × zip_selectivity. For correlated columns, create a statistics extension: CREATE STATISTICS stats_city_zip ON city, zip_code FROM table. PostgreSQL then collects joint statistics for these columns and produces better estimates for queries that filter on both.</p>
      </IQ>

      <IQ q="What is work_mem and when would you change it?">
        <p style={{ margin: '0 0 14px' }}>work_mem is the amount of memory PostgreSQL allocates per sort operation or hash table within a single query. The default is 4MB — chosen to be safe on servers with many concurrent connections. When a sort or hash operation exceeds work_mem, PostgreSQL spills the excess to temporary files on disk. Disk spills are 100–1000x slower than in-memory operations, causing dramatic query slowdowns.</p>
        <p style={{ margin: '0 0 14px' }}>You identify a disk spill in EXPLAIN ANALYZE output: Sort Method: external merge Disk: 8192kB indicates a sort spilled 8MB to disk. Batches: 4 on a Hash node indicates the hash table spilled across 4 disk batches instead of fitting in memory. The fix is increasing work_mem for the session or transaction: SET work_mem = '64MB'; — the query then keeps intermediate results in memory and the spill disappears.</p>
        <p style={{ margin: 0 }}>The dangerous mistake: setting work_mem globally to a high value in postgresql.conf. work_mem applies per sort/hash node per query per connection — not per connection total. A complex query might have 8 sort and hash nodes. With 50 concurrent connections each running that query: 50 × 8 × 256MB = 102GB of memory demand, which would crash the server. Always set work_mem for specific sessions using SET work_mem = 'NMB' before the expensive query, then RESET work_mem immediately after. For scheduled analytics jobs that run alone, a higher session-level work_mem is safe and beneficial. For OLTP workloads with many concurrent users, keep it low globally and raise it only per-session for specific known-expensive queries.</p>
      </IQ>

      <IQ q="How do you diagnose and fix a slow query in production systematically?">
        <p style={{ margin: '0 0 14px' }}>Start by finding the slow queries. pg_stat_statements (if enabled) tracks cumulative execution stats — SELECT query, calls, mean_exec_time, total_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 20 reveals the 20 slowest queries by average execution time. The slow query log (log_min_duration_statement in postgresql.conf) captures any query exceeding a threshold. Application monitoring (Datadog, New Relic) captures slow database calls from the application layer with full context.</p>
        <p style={{ margin: '0 0 14px' }}>Once you have the slow query: run EXPLAIN ANALYZE and read bottom-up. The first red flag to check is the biggest divergence between estimated and actual rows — if they differ by more than 10x, run ANALYZE on the affected tables before doing anything else. Statistics fixes are free and often fix the plan without any other changes. Next look for Seq Scan nodes with high Rows Removed by Filter — these are candidates for indexing. Check the node with the highest actual time — that is the bottleneck to fix first.</p>
        <p style={{ margin: 0 }}>Apply exactly one fix at a time and measure again. If you add three indexes simultaneously and the query speeds up, you cannot know which index helped. Common fixes in order of preference: (1) ANALYZE to refresh statistics — free and instant. (2) CREATE INDEX CONCURRENTLY on the filter or join column — targeted and reversible. (3) Rewrite the query — replace correlated subqueries with JOINs, add explicit filter pushdown, remove functions from WHERE columns. (4) Increase work_mem for the session — fixes spilling. (5) VACUUM to remove bloat if dead tuples are causing unnecessary reads. (6) Consider partitioning or archiving for tables that are simply too large for any index to help efficiently. Never add indexes speculatively — every index adds write overhead. Index to fix a specific measured performance problem, not in anticipation of hypothetical queries.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query is slow despite having an index — EXPLAIN shows Seq Scan ignoring the index"
        cause="Four possible causes: (1) A function is applied to the indexed column in WHERE — WHERE LOWER(email) defeats an index on email. (2) The planner estimates too many rows match (stale statistics) and prefers Seq Scan over the index. (3) The index does not match the predicate — a composite index on (store_id, order_date) cannot be used for a query filtering only on order_date. (4) The table is small enough that the planner correctly prefers Seq Scan over the index overhead."
        fix="Check for functions on the filter column first — this is the most common cause. Then run ANALYZE table_name to refresh statistics and check if the plan changes. Verify the index covers the exact predicate: SELECT indexdef FROM pg_indexes WHERE tablename = 'orders' — the index definition must match the query's WHERE columns and their order. Use SET enable_seqscan = off; EXPLAIN SELECT ...; RESET enable_seqscan; to force the planner to show what an index-based plan would cost — if the estimated cost is close, statistics update may tip the decision."
      />

      <Err
        msg="EXPLAIN ANALYZE shows actual rows=0 but query returns rows to the application"
        cause="The node with actual rows=0 was the inner side of a nested loop that was never executed because the outer side returned 0 rows first. The outer side filtered everything out before the inner side had a chance to run. This cascades — if the outer table returns 0 rows, the join produces 0 rows, even if the inner table has millions of matching rows."
        fix="Read the plan bottom-up and find the first node that shows actual rows=0. That is where the data disappears. Check the filter on that node — a WHERE condition is eliminating all rows before the join. This might be a bug (wrong filter value) or a data issue (no rows match the condition). Add a standalone SELECT to verify rows exist with that filter: SELECT COUNT(*) FROM table WHERE condition. If it returns 0, the filter is the problem — not the join."
      />

      <Err
        msg="Adding an index made the query slower, not faster"
        cause="Three scenarios: (1) The query returns a high percentage of rows (> 15–20%) — for high-selectivity queries, Seq Scan is faster than random index lookups. The planner chose index scan to please you but Seq Scan was actually better. (2) The new index added write overhead to a heavily written table, and the query improvement is smaller than the write degradation. (3) The index is not actually being used — the planner still chose Seq Scan, but now VACUUM has more index entries to maintain, adding overhead with no benefit."
        fix="Check if the index is actually used: run EXPLAIN ANALYZE and look for your index name in the plan. If it is not used, the planner correctly determined Seq Scan is faster — drop the unused index. Verify query selectivity: SELECT COUNT(*) FILTER (WHERE condition) / COUNT(*) FROM table — if > 20%, index may genuinely not help. For write-heavy tables, measure INSERT/UPDATE throughput before and after the index to quantify the write cost. Drop the index if write degradation exceeds read improvement."
      />

      <Err
        msg="EXPLAIN ANALYZE reports Planning Time: 800ms — plan generation is the bottleneck"
        cause="The planner is taking too long to generate the execution plan, not the execution itself. This happens when: too many indexes exist on the queried tables (planner must evaluate all possible index combinations), the query has too many joins (planner evaluates all join orders — exponential with join count), or pg_statistics is very large causing slow statistics lookups."
        fix="Audit indexes for unused ones: SELECT indexname FROM pg_stat_user_indexes WHERE idx_scan = 0 AND schemaname = 'public' — drop indexes with zero scans. Reduce the number of joins by pre-aggregating in CTEs. Set join_collapse_limit = 8 (default) or lower to limit the join orderings the planner evaluates. For extremely complex queries (15+ joins), consider geqo_threshold — the genetic query optimiser kicks in above this and sacrifices optimality for planning speed: SET geqo_threshold = 10."
      />

      <Err
        msg="Query performance degrades gradually over weeks — was fast at first, slow now"
        cause="Table bloat from dead tuples. PostgreSQL's MVCC model keeps old row versions (dead tuples) after UPDATE and DELETE until VACUUM reclaims them. Over weeks of heavy writes, tables accumulate millions of dead tuples. Sequential scans must read through dead tuples to find live ones — effective table size grows far beyond the live row count. Index bloat has the same effect on index scans."
        fix="Check bloat: SELECT relname, n_dead_tup, n_live_tup, ROUND(n_dead_tup::NUMERIC / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 1) AS dead_pct FROM pg_stat_user_tables ORDER BY n_dead_tup DESC. A dead_pct above 20–30% indicates bloat. Run VACUUM ANALYZE table_name to reclaim dead tuples and refresh statistics. For severe bloat, VACUUM FULL table_name rewrites the table from scratch (requires an exclusive lock — schedule during low-traffic windows). Prevent future bloat by tuning autovacuum: decrease autovacuum_vacuum_scale_factor for frequently updated tables."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Perform a systematic query diagnosis on the following FreshCart report query. (1) Run EXPLAIN on the query and identify: the join strategies used, whether any Seq Scans appear and on which tables, the estimated row counts at each major node. (2) Rewrite the correlated subquery for customer order count into a pre-aggregated LEFT JOIN. (3) Remove the function applied to the date column and replace with an index-friendly range. (4) Write the CREATE INDEX statements that would most improve this query — include a partial index and specify why each index helps. The query to diagnose: SELECT c.customer_id, c.first_name, c.loyalty_tier, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id AND order_status = 'Delivered') AS order_count, ROUND(SUM(o2.total_amount), 2) AS total_spend FROM customers c LEFT JOIN orders o2 ON c.customer_id = o2.customer_id AND DATE_TRUNC('month', o2.order_date) = '2024-01-01' AND o2.order_status = 'Delivered' GROUP BY c.customer_id, c.first_name, c.loyalty_tier ORDER BY total_spend DESC NULLS LAST LIMIT 20."
        hint="(1) EXPLAIN the query as-is. (2) Replace correlated subquery with LEFT JOIN (SELECT customer_id, COUNT(*) FROM orders WHERE status='Delivered' GROUP BY customer_id). (3) Replace DATE_TRUNC = '2024-01-01' with order_date >= '2024-01-01' AND order_date < '2024-02-01'. (4) Partial index on orders WHERE order_status = 'Delivered', composite index on (customer_id, order_date) INCLUDE (total_amount)."
        answer={`-- ── Step 1: Diagnose the original query ────────────────────────
EXPLAIN
SELECT c.customer_id, c.first_name, c.loyalty_tier,
  (SELECT COUNT(*) FROM orders o
   WHERE o.customer_id = c.customer_id AND order_status = 'Delivered') AS order_count,
  ROUND(SUM(o2.total_amount), 2) AS total_spend
FROM customers c
LEFT JOIN orders o2
  ON c.customer_id = o2.customer_id
  AND DATE_TRUNC('month', o2.order_date) = '2024-01-01'
  AND o2.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.loyalty_tier
ORDER BY total_spend DESC NULLS LAST
LIMIT 20;

-- Problems identified:
-- 1. Correlated subquery on line 2-4: runs once per customer row
-- 2. DATE_TRUNC on order_date: defeats any index on order_date
-- 3. Seq Scan likely on orders (no partial index on order_status)
-- 4. order_status filter repeated twice in the same query

-- ── Step 2: Rewritten query — all three problems fixed ───────────
EXPLAIN
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier,
  COALESCE(cnt.order_count, 0)              AS order_count,
  COALESCE(ROUND(jan.total_spend, 2), 0)    AS total_spend
FROM customers AS c
-- Fix 1: pre-aggregated JOIN replaces the correlated subquery
LEFT JOIN (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cnt ON c.customer_id = cnt.customer_id
-- Fix 2: range comparison replaces DATE_TRUNC (index-friendly)
LEFT JOIN (
  SELECT customer_id, ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= '2024-01-01'       -- index on order_date CAN be used
    AND order_date <  '2024-02-01'
  GROUP BY customer_id
) AS jan ON c.customer_id = jan.customer_id
ORDER BY total_spend DESC NULLS LAST
LIMIT 20;

-- ── Step 3: Indexes that most improve this query ────────────────

-- Index 1: partial composite — covers the January delivered orders subquery
-- Partial WHERE order_status = 'Delivered' shrinks the index significantly
-- composite (customer_id, order_date) serves both the JOIN and the date range
-- INCLUDE (total_amount) makes it a covering index — no heap fetch needed
CREATE INDEX CONCURRENTLY idx_orders_delivered_cust_date
  ON orders (customer_id, order_date)
  INCLUDE (total_amount)
  WHERE order_status = 'Delivered';
-- Why: the rewritten query's two subqueries both filter WHERE order_status = 'Delivered'
-- and join on customer_id. This single partial covering index serves both subqueries
-- with Index Only Scans — zero table heap access.

-- Index 2: on customers(customer_id) — already exists as PK, no action needed

-- Index 3: if customers table is large and loyalty_tier is filtered elsewhere
CREATE INDEX CONCURRENTLY idx_customers_loyalty
  ON customers (loyalty_tier, customer_id)
  INCLUDE (first_name);
-- Why: if a WHERE loyalty_tier = 'Gold' filter is later added to this report,
-- this index handles the filter + JOIN + SELECT columns without a heap fetch.
-- Not strictly needed for the current query but anticipates common next step.

-- ── Verify: check the plan is better ────────────────────────────
EXPLAIN
SELECT
  c.customer_id, c.first_name, c.loyalty_tier,
  COALESCE(cnt.order_count, 0)           AS order_count,
  COALESCE(ROUND(jan.total_spend, 2), 0) AS total_spend
FROM customers AS c
LEFT JOIN (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cnt ON c.customer_id = cnt.customer_id
LEFT JOIN (
  SELECT customer_id, ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= '2024-01-01'
    AND order_date <  '2024-02-01'
  GROUP BY customer_id
) AS jan ON c.customer_id = jan.customer_id
ORDER BY total_spend DESC NULLS LAST
LIMIT 20;`}
        explanation="The diagnosis reveals three compounding problems. The correlated subquery is the most severe — it executes one COUNT query per customer, which on a 50,000-customer table means 50,000 separate database operations regardless of index coverage. Replacing it with a pre-aggregated LEFT JOIN reduces this to one pass over the orders table. The DATE_TRUNC function on order_date prevents any B-tree index from being used on that column — the database must apply the function to every row before comparison. Replacing with a range filter (>= '2024-01-01' AND < '2024-02-01') allows the planner to use an index range scan. The two separate LEFT JOINs in the rewrite (one for all-time order count, one for January spend) may look less efficient than a single JOIN, but they are semantically correct — combining them into one JOIN would require complex conditional aggregation and produces the same pre-aggregation pattern either way. The partial composite covering index is the single most impactful index because: (a) partial on order_status = 'Delivered' reduces index size by whatever fraction of orders are non-delivered, (b) composite on (customer_id, order_date) serves the JOIN condition AND the date range filter in one traversal, and (c) INCLUDE (total_amount) avoids any heap fetch for the SUM — the entire January subquery can execute as an Index Only Scan."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'EXPLAIN shows the plan without executing. EXPLAIN ANALYZE executes and shows actual timing and row counts. Always wrap EXPLAIN ANALYZE on DML in BEGIN/ROLLBACK to avoid side effects.',
          'Read execution plans bottom-up. Leaf nodes execute first, results flow up to parent nodes. The root node produces the final result.',
          'The five numbers to read immediately: Execution Time, estimated vs actual row divergence, Rows Removed by Filter, loops count on inner nodes, and node type at each level.',
          'Seq Scan is only a problem when the filter removes a high percentage of rows. Rows Removed by Filter: N in EXPLAIN ANALYZE quantifies the wasted work. Under 15% match rate → index candidate.',
          'Fix statistics first. ANALYZE table_name is free, instant, and safe. Stale statistics cause wrong plan choices that indexes alone cannot fix. Always run ANALYZE before adding indexes.',
          'The function trap: applying any function to an indexed column in WHERE defeats the index. LOWER(col), DATE_TRUNC(col), CAST(col) all force Seq Scan. Rewrite as a range or create a functional index.',
          'Always index foreign key columns. A missing FK index causes Nested Loop on the referencing table for every row in the referenced table — the most common catastrophic performance bug.',
          'Replace correlated subqueries with pre-aggregated LEFT JOINs. A correlated subquery runs once per outer row. A pre-aggregated JOIN runs once total. The difference on large tables is 1000x or more.',
          'Disk spills: Sort Method: external merge and Batches > 1 mean work_mem is too low. SET work_mem = \'64MB\' for the session before the expensive query, then RESET work_mem immediately after.',
          'The optimisation workflow: measure baseline → identify worst node → fix one thing → measure again. Never add indexes speculatively. Every index adds write overhead — only add indexes that fix a measured problem.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 56</strong>, you learn Index Strategies in depth — composite index design, covering indexes, partial indexes, when indexes hurt, and the full decision framework for production index management.
        </p>
        <Link href="/learn/sql/index-strategies" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 56 → Index Strategies
        </Link>
      </div>

    </LearnLayout>
  );
}