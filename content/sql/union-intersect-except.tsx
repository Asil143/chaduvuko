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

const SetCard = ({ op, color, returns, deduplicates, analogy, use }: {
  op: string; color: string; returns: string;
  deduplicates: string; analogy: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color }}>{op}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Returns</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{returns}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Deduplicates</p>
        <p style={{ fontSize: 12, color, fontWeight: 700, margin: 0 }}>{deduplicates}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Think of it as</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{analogy}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use for</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{use}</p>
      </div>
    </div>
  </div>
);

export default function UnionIntersectExcept() {
  return (
    <LearnLayout
      title="UNION, INTERSECT, and EXCEPT"
      description="Combine result sets vertically — stack rows from multiple queries, find common rows, subtract one set from another, and every rule about column matching, deduplication, and ordering"
      section="SQL — Module 39"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Set Operations — Combining Queries Vertically" />

      <P>Every SQL operation you have learned — JOINs, subqueries, aggregates — combines data <Hl>horizontally</Hl>, adding columns. Set operations combine data <Hl>vertically</Hl>, stacking rows from multiple queries on top of each other. The result has the same columns as each input query but more (or fewer) rows.</P>

      <P>SQL provides three set operations, each from classical set theory:</P>

      <SetCard
        op="UNION / UNION ALL"
        color={C}
        returns="All rows from both queries combined"
        deduplicates="UNION: yes. UNION ALL: no"
        analogy="A ∪ B — all rows from either set"
        use="Combining data from multiple sources, combining multiple segments, stacking historical periods"
      />
      <SetCard
        op="INTERSECT"
        color="#10b981"
        returns="Only rows that appear in BOTH queries"
        deduplicates="Yes — always"
        analogy="A ∩ B — rows in common between both sets"
        use="Finding rows that satisfy two independent conditions simultaneously"
      />
      <SetCard
        op="EXCEPT / MINUS"
        color="#f97316"
        returns="Rows from the first query that do NOT appear in the second"
        deduplicates="Yes — always"
        analogy="A − B — rows in the first set but not the second"
        use="Subtracting one result set from another, finding what changed between two periods"
      />

      <H>The fundamental rule — columns must match</H>
      <P>All set operations require the same number of columns in the same order with compatible data types across all queries being combined. Column names in the result come from the first query.</P>

      <CodeBlock
        label="Set operation column matching rule"
        code={`-- VALID: same column count, compatible types
SELECT customer_id, first_name, city FROM customers
UNION ALL
SELECT customer_id, first_name, city FROM former_customers;

-- INVALID: different column counts
SELECT customer_id, first_name FROM customers
UNION ALL
SELECT customer_id, first_name, city FROM former_customers;
-- ERROR: each SELECT must have the same number of columns

-- Column names come from the FIRST query:
SELECT customer_id AS id, first_name AS name FROM customers
UNION ALL
SELECT employee_id, first_name FROM employees;
-- Result columns are named: id, name (from the first SELECT)`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="UNION vs UNION ALL — Deduplication Cost" />

      <P>UNION removes duplicate rows — any row that appears in both queries appears only once in the result. UNION ALL keeps every row from both queries, including duplicates. UNION ALL is almost always the right choice when you know the result sets are disjoint (no overlapping rows) — it is significantly faster because it skips the deduplication sort.</P>

      <CodeBlock
        label="UNION vs UNION ALL — the difference"
        code={`-- UNION: deduplicates by sorting and comparing all rows
-- If the same row appears in both queries, it appears once in the result
-- Cost: O(n log n) — requires sorting all rows to find duplicates

-- UNION ALL: no deduplication — just concatenates both result sets
-- If the same row appears in both queries, it appears twice in the result
-- Cost: O(n) — just append rows

-- When to use UNION (with deduplication):
-- When the two queries might return the same row and you want each row once
-- Example: combining active and inactive customer lists where an ID could be in both

-- When to use UNION ALL (without deduplication):
-- When the two queries return disjoint sets (no possible overlap)
-- When you intentionally want duplicates (counting occurrences)
-- When performance matters — UNION ALL is always faster than UNION`}
      />

      <SQLPlayground
        initialQuery={`-- UNION: deduplicates rows
-- If a customer has both delivered and cancelled orders,
-- their customer_id would only appear once
SELECT DISTINCT customer_id FROM orders WHERE order_status = 'Delivered'
UNION
SELECT DISTINCT customer_id FROM orders WHERE order_status = 'Cancelled'
ORDER BY customer_id;`}
        height={150}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- UNION ALL: keeps all rows including duplicates
-- Customers appearing in both segments appear twice
SELECT DISTINCT customer_id, 'Delivered' AS status_type
FROM orders WHERE order_status = 'Delivered'
UNION ALL
SELECT DISTINCT customer_id, 'Cancelled' AS status_type
FROM orders WHERE order_status = 'Cancelled'
ORDER BY customer_id, status_type;`}
        height={155}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="UNION ALL — The Workhorse of Vertical Combination" />

      <P>UNION ALL is the most used set operation in production SQL. It stacks rows from multiple queries without deduplication — exactly what you need when combining disjoint data sources, multiple time periods, or labelled segments.</P>

      <H>Combining multiple customer segments into one list</H>

      <SQLPlayground
        initialQuery={`-- Three customer segments combined into one ranked list
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  'VIP'                               AS segment
FROM customers AS c
WHERE c.loyalty_tier = 'Platinum'

UNION ALL

SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name,
  c.loyalty_tier,
  'High Value'                        AS segment
FROM customers AS c
WHERE c.loyalty_tier = 'Gold'

UNION ALL

SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name,
  c.loyalty_tier,
  'Standard'                          AS segment
FROM customers AS c
WHERE c.loyalty_tier IN ('Silver', 'Bronze')

ORDER BY segment, loyalty_tier, customer_id;`}
        height={265}
        showSchema={true}
      />

      <H>Combining data from multiple periods</H>

      <SQLPlayground
        initialQuery={`-- Stack January and February order summaries
SELECT
  'January 2024'                       AS period,
  store_id,
  COUNT(*)                             AS orders,
  ROUND(SUM(total_amount), 2)          AS revenue
FROM orders
WHERE order_status = 'Delivered'
  AND strftime('%m', order_date) = '01'
  AND strftime('%Y', order_date) = '2024'
GROUP BY store_id

UNION ALL

SELECT
  'February 2024'                      AS period,
  store_id,
  COUNT(*)                             AS orders,
  ROUND(SUM(total_amount), 2)          AS revenue
FROM orders
WHERE order_status = 'Delivered'
  AND strftime('%m', order_date) = '02'
  AND strftime('%Y', order_date) = '2024'
GROUP BY store_id

ORDER BY store_id, period;`}
        height={265}
        showSchema={false}
      />

      <H>Combining different tables with compatible structures</H>

      <SQLPlayground
        initialQuery={`-- All people in the FreshCart system: customers and employees
-- Both have first_name and last_name — combine into one list
SELECT
  customer_id  AS person_id,
  first_name,
  last_name,
  city,
  'Customer'   AS person_type
FROM customers

UNION ALL

SELECT
  employee_id,
  first_name,
  last_name,
  NULL         AS city,      -- employees have no city column
  'Employee'   AS person_type
FROM employees

ORDER BY person_type, last_name, first_name;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="UNION for Report Subtotals — Combining Detail and Summary" />

      <P>A classic UNION ALL pattern in reporting: combine detail rows with summary rows. The result looks like a hierarchical report — individual records at the top (or bottom) with a total row appended.</P>

      <SQLPlayground
        initialQuery={`-- Per-store revenue with a grand total row appended
SELECT
  store_id,
  store_id                             AS label,
  COUNT(*)                             AS orders,
  ROUND(SUM(total_amount), 2)          AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id

UNION ALL

SELECT
  'TOTAL'                              AS store_id,
  'ALL STORES'                         AS label,
  COUNT(*)                             AS orders,
  ROUND(SUM(total_amount), 2)          AS revenue
FROM orders
WHERE order_status = 'Delivered'

ORDER BY store_id;`}
        height={240}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Category breakdown with subtotals per category and grand total
SELECT
  category,
  brand,
  COUNT(*)                             AS products,
  ROUND(AVG(unit_price), 2)            AS avg_price
FROM products
WHERE in_stock = true
GROUP BY category, brand

UNION ALL

-- Category subtotals
SELECT
  category,
  '— SUBTOTAL'                         AS brand,
  COUNT(*)                             AS products,
  ROUND(AVG(unit_price), 2)            AS avg_price
FROM products
WHERE in_stock = true
GROUP BY category

UNION ALL

-- Grand total
SELECT
  '=== GRAND TOTAL'                    AS category,
  ''                                   AS brand,
  COUNT(*)                             AS products,
  ROUND(AVG(unit_price), 2)            AS avg_price
FROM products
WHERE in_stock = true

ORDER BY category, brand;`}
        height={285}
        showSchema={false}
      />

      <Callout type="info">
        The UNION ALL + totals pattern is a manual alternative to ROLLUP (covered in Module 28). ROLLUP is more concise for standard hierarchical totals. UNION ALL gives more control when you need custom labels, different formatting, or non-standard aggregation levels.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="INTERSECT — Finding Common Rows" />

      <P>INTERSECT returns only rows that appear in <Hl>both</Hl> result sets. It is the SQL equivalent of set intersection — A ∩ B. Rows unique to either side are excluded. INTERSECT always deduplicates.</P>

      <H>Customers who have placed both delivered AND cancelled orders</H>

      <SQLPlayground
        initialQuery={`-- Customers appearing in both delivered AND cancelled order sets
SELECT customer_id FROM orders WHERE order_status = 'Delivered'
INTERSECT
SELECT customer_id FROM orders WHERE order_status = 'Cancelled'
ORDER BY customer_id;`}
        height={125}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Enrich the result — join back to get customer details
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city
FROM customers AS c
WHERE c.customer_id IN (
  SELECT customer_id FROM orders WHERE order_status = 'Delivered'
  INTERSECT
  SELECT customer_id FROM orders WHERE order_status = 'Cancelled'
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={200}
        showSchema={false}
      />

      <H>Products sold in multiple specific stores</H>

      <SQLPlayground
        initialQuery={`-- Products that have been sold in BOTH ST001 AND ST002
SELECT DISTINCT oi.product_id
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.store_id = 'ST001' AND o.order_status = 'Delivered'

INTERSECT

SELECT DISTINCT oi.product_id
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.store_id = 'ST002' AND o.order_status = 'Delivered'

ORDER BY product_id;`}
        height={200}
        showSchema={false}
      />

      <H>INTERSECT vs INNER JOIN — when each is appropriate</H>

      <CodeBlock
        label="INTERSECT vs INNER JOIN — different tools"
        code={`-- INTERSECT: find customer_ids that appear in BOTH queries
-- Works on the result sets — finds common values across two queries
SELECT customer_id FROM orders WHERE order_status = 'Delivered'
INTERSECT
SELECT customer_id FROM orders WHERE order_status = 'Cancelled';

-- Equivalent using EXISTS (more flexible — can filter differently):
SELECT DISTINCT o1.customer_id
FROM orders AS o1
WHERE o1.order_status = 'Delivered'
  AND EXISTS (
    SELECT 1 FROM orders AS o2
    WHERE o2.customer_id = o1.customer_id
      AND o2.order_status = 'Cancelled'
  );

-- INNER JOIN: combines columns from two different tables
-- Completely different purpose — adds columns, not finds common rows
-- Do not use INNER JOIN where INTERSECT is appropriate`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="EXCEPT — Subtracting One Set From Another" />

      <P>EXCEPT (called MINUS in Oracle and some other databases) returns rows from the first query that do <Hl>not</Hl> appear in the second query. It is the set difference — A − B. Rows unique to the second query are discarded. EXCEPT always deduplicates.</P>

      <H>Customers who ordered but never cancelled</H>

      <SQLPlayground
        initialQuery={`-- Customers who have delivered orders
-- MINUS customers who have ever cancelled
-- = customers who have ordered but never cancelled

SELECT customer_id FROM orders WHERE order_status = 'Delivered'
EXCEPT
SELECT customer_id FROM orders WHERE order_status = 'Cancelled'
ORDER BY customer_id;`}
        height={140}
        showSchema={true}
      />

      <H>Products sold in January but not in February</H>

      <SQLPlayground
        initialQuery={`-- Products that appeared in January delivered orders
-- but NOT in February delivered orders
SELECT DISTINCT oi.product_id
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_status = 'Delivered'
  AND strftime('%m', o.order_date) = '01'
  AND strftime('%Y', o.order_date) = '2024'

EXCEPT

SELECT DISTINCT oi.product_id
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_status = 'Delivered'
  AND strftime('%m', o.order_date) = '02'
  AND strftime('%Y', o.order_date) = '2024'

ORDER BY product_id;`}
        height={240}
        showSchema={false}
      />

      <H>EXCEPT vs NOT EXISTS vs LEFT JOIN IS NULL</H>

      <CodeBlock
        label="Three ways to find set difference — comparison"
        code={`-- Goal: customer_ids in delivered orders but not in cancelled orders

-- EXCEPT (cleanest — set operation on result sets):
SELECT customer_id FROM orders WHERE order_status = 'Delivered'
EXCEPT
SELECT customer_id FROM orders WHERE order_status = 'Cancelled';

-- NOT EXISTS (most flexible — any conditions in subquery):
SELECT DISTINCT o.customer_id
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND NOT EXISTS (
    SELECT 1 FROM orders AS o2
    WHERE o2.customer_id  = o.customer_id
      AND o2.order_status = 'Cancelled'
  );

-- LEFT JOIN IS NULL (when you need right-side columns too):
SELECT DISTINCT o1.customer_id
FROM orders AS o1
LEFT JOIN orders AS o2
  ON o1.customer_id  = o2.customer_id
  AND o2.order_status = 'Cancelled'
WHERE o1.order_status = 'Delivered'
  AND o2.order_id IS NULL;

-- All three return the same customer_ids
-- EXCEPT: most concise for pure set difference on complete queries
-- NOT EXISTS: more flexible, handles complex multi-table conditions
-- LEFT JOIN IS NULL: use when right-side columns are needed`}
      />

      <SQLPlayground
        initialQuery={`-- Verify: all three approaches return the same result
-- Method 1: EXCEPT
SELECT COUNT(*) AS except_count
FROM (
  SELECT customer_id FROM orders WHERE order_status = 'Delivered'
  EXCEPT
  SELECT customer_id FROM orders WHERE order_status = 'Cancelled'
) AS exc;`}
        height={135}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Method 2: NOT EXISTS (should match EXCEPT count)
SELECT COUNT(DISTINCT o.customer_id) AS not_exists_count
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND NOT EXISTS (
    SELECT 1 FROM orders o2
    WHERE o2.customer_id = o.customer_id
      AND o2.order_status = 'Cancelled'
  );`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Ordering and LIMIT With Set Operations" />

      <P>ORDER BY and LIMIT apply to the <Hl>entire</Hl> result of the set operation — not to individual queries. They must appear after the final query in the set operation chain. Attempting to add ORDER BY to an individual query within a UNION causes an error in most databases.</P>

      <CodeBlock
        label="ORDER BY and LIMIT with set operations"
        code={`-- CORRECT: ORDER BY after the final query
SELECT customer_id, 'Delivered' AS type FROM orders WHERE order_status = 'Delivered'
UNION ALL
SELECT customer_id, 'Cancelled' AS type FROM orders WHERE order_status = 'Cancelled'
ORDER BY customer_id, type;    -- applies to the full combined result

-- CORRECT: LIMIT after ORDER BY
SELECT city FROM customers
UNION
SELECT city FROM stores
ORDER BY city
LIMIT 5;

-- WRONG: ORDER BY inside an individual query
SELECT customer_id FROM orders WHERE order_status = 'Delivered'
ORDER BY customer_id   -- ERROR in most databases
UNION ALL
SELECT customer_id FROM orders WHERE order_status = 'Cancelled';

-- WORKAROUND: wrap individual queries in subqueries if you need separate ordering
-- (rarely needed — usually ORDER BY on the final result is what you want)
SELECT * FROM (
  SELECT customer_id, total_amount FROM orders WHERE order_status = 'Delivered'
  ORDER BY total_amount DESC LIMIT 5
) AS top_delivered
UNION ALL
SELECT * FROM (
  SELECT customer_id, total_amount FROM orders WHERE order_status = 'Cancelled'
  ORDER BY total_amount DESC LIMIT 5
) AS top_cancelled;`}
      />

      <SQLPlayground
        initialQuery={`-- Top 5 products by revenue from delivered orders
-- UNION ALL with per-subquery LIMIT then outer ORDER BY
SELECT * FROM (
  SELECT
    p.product_name,
    'In stock'      AS availability,
    ROUND(SUM(oi.line_total), 2) AS revenue
  FROM products AS p
  JOIN order_items AS oi ON p.product_id = oi.product_id
  JOIN orders      AS o  ON oi.order_id  = o.order_id
  WHERE p.in_stock = true AND o.order_status = 'Delivered'
  GROUP BY p.product_name
  ORDER BY revenue DESC LIMIT 3
) AS in_stock_top

UNION ALL

SELECT * FROM (
  SELECT
    p.product_name,
    'Out of stock'  AS availability,
    ROUND(SUM(oi.line_total), 2) AS revenue
  FROM products AS p
  JOIN order_items AS oi ON p.product_id = oi.product_id
  JOIN orders      AS o  ON oi.order_id  = o.order_id
  WHERE p.in_stock = false AND o.order_status = 'Delivered'
  GROUP BY p.product_name
  ORDER BY revenue DESC LIMIT 3
) AS out_stock_top

ORDER BY availability, revenue DESC;`}
        height={290}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Practical Patterns — Set Operations in Production Analytics" />

      <H>Full UNION pipeline report — all order statuses in one view</H>

      <SQLPlayground
        initialQuery={`-- Complete order status summary — one row per status
-- with percentage of total
WITH total AS (
  SELECT COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue
  FROM orders
)
SELECT
  order_status,
  COUNT(*)                                          AS orders,
  ROUND(SUM(total_amount), 2)                       AS revenue,
  ROUND(COUNT(*) * 100.0 / t.total_orders, 1)      AS pct_of_orders
FROM orders, total AS t
GROUP BY order_status, t.total_orders

UNION ALL

SELECT
  'TOTAL',
  t.total_orders,
  ROUND(t.total_revenue, 2),
  100.0
FROM total AS t

ORDER BY orders DESC;`}
        height={265}
        showSchema={true}
      />

      <H>Change detection — what changed between two snapshots</H>

      <SQLPlayground
        initialQuery={`-- Products whose price changed: compare Jan vs Feb unit prices
-- Using EXCEPT to find rows that exist in Jan but not Feb (changed or removed)
-- and Feb but not Jan (new or changed)

-- Products with different prices (using EXCEPT both ways)
SELECT 'In Jan not Feb (removed or changed)' AS change_type, product_id, unit_price
FROM (
  SELECT product_id, ROUND(unit_price, 2) AS unit_price FROM products
  WHERE in_stock = true
  EXCEPT
  SELECT product_id, ROUND(unit_price * 0.95, 2) FROM products  -- simulate Feb price
  WHERE in_stock = true
) AS removed_or_changed

UNION ALL

SELECT 'In Feb not Jan (new or changed)' AS change_type, product_id, unit_price
FROM (
  SELECT product_id, ROUND(unit_price * 0.95, 2) AS unit_price FROM products
  WHERE in_stock = true
  EXCEPT
  SELECT product_id, ROUND(unit_price, 2) FROM products
  WHERE in_stock = true
) AS new_or_changed

ORDER BY change_type, product_id
LIMIT 10;`}
        height={290}
        showSchema={false}
      />

      <H>Finding symmetric difference with EXCEPT + UNION ALL</H>

      <SQLPlayground
        initialQuery={`-- Symmetric difference: cities that appear in ONLY ONE of the two tables
-- Cities in customers but not stores, PLUS cities in stores but not customers
SELECT city, 'Customer city only' AS source
FROM (
  SELECT DISTINCT city FROM customers WHERE city IS NOT NULL
  EXCEPT
  SELECT DISTINCT city FROM stores
) AS cust_only

UNION ALL

SELECT city, 'Store city only' AS source
FROM (
  SELECT DISTINCT city FROM stores
  EXCEPT
  SELECT DISTINCT city FROM customers WHERE city IS NOT NULL
) AS store_only

ORDER BY city;`}
        height={250}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data engineer at Paytm. Every morning at 7 AM, the reconciliation job produces a report comparing yesterday's transaction data across three systems: the primary OLTP database, the data warehouse, and the partner bank's settlement file. Each source must agree. You use EXCEPT and UNION ALL to identify discrepancies.</P>

      <TimeBlock time="7:00 AM" label="Reconciliation job starts">
        Three sources need to agree: primary DB transactions, warehouse transactions, settlement file transactions. Adapted for FreshCart: compare ST001 orders, ST002 orders, and a combined view.
      </TimeBlock>

      <TimeBlock time="7:05 AM" label="Step 1 — find order IDs in one source but not the other">
        EXCEPT identifies order_ids present in one system but missing from another.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Simulate reconciliation: orders in ST001 but not ST002 (and vice versa)
-- In production: primary_db.orders vs warehouse.orders

-- Orders in ST001 that have no equivalent in ST002 (different store, same pattern)
SELECT order_id, total_amount, ROUND(total_amount, 0) AS rounded_total
FROM orders
WHERE store_id = 'ST001' AND order_status = 'Delivered'

EXCEPT

SELECT order_id, total_amount, ROUND(total_amount, 0) AS rounded_total
FROM orders
WHERE store_id = 'ST002' AND order_status = 'Delivered'

ORDER BY order_id
LIMIT 8;`}
        height={230}
        showSchema={true}
      />

      <TimeBlock time="7:20 AM" label="Step 2 — full reconciliation summary">
        UNION ALL combines: matched records, ST001-only records, and ST002-only records into a complete reconciliation view.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Full reconciliation: match status for each order
WITH st001 AS (
  SELECT order_id, ROUND(total_amount, 2) AS amount
  FROM orders WHERE store_id = 'ST001' AND order_status = 'Delivered'
),
st002 AS (
  SELECT order_id, ROUND(total_amount, 2) AS amount
  FROM orders WHERE store_id = 'ST002' AND order_status = 'Delivered'
)
-- Matched orders (in both)
SELECT a.order_id, a.amount AS st001_amount, b.amount AS st002_amount,
       '✓ In both' AS status
FROM st001 AS a
JOIN st002 AS b ON a.order_id = b.order_id

UNION ALL

-- ST001 only
SELECT a.order_id, a.amount, NULL, '⚠ ST001 only'
FROM st001 AS a
WHERE NOT EXISTS (SELECT 1 FROM st002 b WHERE b.order_id = a.order_id)

UNION ALL

-- ST002 only
SELECT b.order_id, NULL, b.amount, '⚠ ST002 only'
FROM st002 AS b
WHERE NOT EXISTS (SELECT 1 FROM st001 a WHERE a.order_id = b.order_id)

ORDER BY status DESC, order_id
LIMIT 15;`}
        height={310}
        showSchema={false}
      />

      <TimeBlock time="7:35 AM" label="Reconciliation report delivered">
        The UNION ALL of three result sets — matched, source-A-only, source-B-only — produces a complete reconciliation report. Any row with "⚠" status routes to the investigation queue. The report runs in under 5 seconds and is automatically emailed to the operations team.
      </TimeBlock>

      <ProTip>
        Reconciliation reports are one of the highest-value use cases for UNION ALL + EXCEPT. The pattern: (1) define each source as a CTE, (2) EXCEPT to find rows exclusive to each source, (3) UNION ALL to combine matched and exclusive rows with a status label. This architecture handles any number of sources — add one more CTE and one more UNION ALL block.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between UNION and UNION ALL?">
        <p style={{ margin: '0 0 14px' }}>Both UNION and UNION ALL combine the result sets of two or more queries by stacking rows vertically. The difference is deduplication. UNION removes duplicate rows — if the same row appears in both queries, it appears only once in the final result. UNION ALL keeps all rows from all queries, including duplicates — if the same row appears in both queries, it appears twice.</p>
        <p style={{ margin: '0 0 14px' }}>The performance implication is significant. UNION must sort or hash all rows to identify and remove duplicates — O(n log n) work. UNION ALL simply appends result sets — O(n) work. UNION ALL is always faster than UNION. On large result sets, this difference can be substantial.</p>
        <p style={{ margin: 0 }}>When to use each: use UNION ALL when you know the result sets are disjoint (no possible overlapping rows) — different time periods, different status values, different segments. Use UNION when the same row could appear in multiple queries and you want each unique row once — combining a current customer list with a historical list where some customers appear in both. The common mistake is defaulting to UNION (with deduplication) when UNION ALL is correct and faster. Always ask: "can the same row appear in both queries?" If yes and you want it once, use UNION. If yes and you want it multiple times, or if it is impossible for the same row to appear twice, use UNION ALL.</p>
      </IQ>

      <IQ q="What requirements must be met for a UNION or set operation to be valid?">
        <p style={{ margin: '0 0 14px' }}>Three requirements must be satisfied for any set operation (UNION, UNION ALL, INTERSECT, EXCEPT) to execute successfully. First: all queries must return the same number of columns. A SELECT with 3 columns cannot be combined with a SELECT with 4 columns — the column count must match exactly across all queries in the set operation.</p>
        <p style={{ margin: '0 0 14px' }}>Second: the corresponding columns must have compatible data types. Column 1 of query A must be compatible with column 1 of query B — both numeric, both text, both date, etc. Incompatible types (combining a DATE column with an INTEGER column in the same position) cause a type error. Most databases will attempt implicit type casting for closely related types (INTEGER and DECIMAL are usually compatible) but will error on clearly incompatible combinations (DATE and VARCHAR).</p>
        <p style={{ margin: 0 }}>Third: ORDER BY and LIMIT must appear after the final query and apply to the entire combined result — not to individual queries within the set operation. Adding ORDER BY to an individual query within UNION causes a syntax error in most databases (PostgreSQL, MySQL 8+). If you need to sort or limit individual queries before combining, wrap each query in a subquery: SELECT * FROM (SELECT ... ORDER BY ... LIMIT n) AS q1 UNION ALL SELECT * FROM (SELECT ... ORDER BY ... LIMIT n) AS q2. The column names in the result come from the first query — if query A has column named "customer_name" and query B has column named "emp_name", the result column is named "customer_name" throughout.</p>
      </IQ>

      <IQ q="When would you use INTERSECT instead of a JOIN?">
        <p style={{ margin: '0 0 14px' }}>INTERSECT finds rows that appear in both result sets simultaneously — it operates on complete result rows, not on join keys. It is the natural choice when you want to find entities that satisfy two independent conditions that can be expressed as separate queries, and you want the common elements.</p>
        <p style={{ margin: '0 0 14px' }}>INTERSECT is appropriate when: the two queries are logically independent (neither is a "lookup" of the other), both queries naturally return the same columns, and you want the rows that appear in both. Example: customer_ids who placed delivered orders INTERSECT customer_ids who placed cancelled orders — these are two independent queries against the same table, and INTERSECT cleanly finds customers who appear in both.</p>
        <p style={{ margin: 0 }}>JOIN is appropriate when you want to combine columns from different tables based on a relationship — horizontally expanding the result. INTERSECT is a vertical set operation — it does not add columns, it finds common rows. A JOIN of customers to orders adds order columns to customer rows. An INTERSECT of delivered customer_ids and cancelled customer_ids finds customer_ids that appear in both sets — no additional columns. When to prefer INTERSECT over a JOIN + filter: when both conditions are expressed on the same table with different WHERE clauses (same column, different values), INTERSECT is more direct. When you need columns from both result sets, EXISTS or JOIN is more appropriate than INTERSECT because INTERSECT does not give you access to the second query's specific rows.</p>
      </IQ>

      <IQ q="What is the difference between EXCEPT and NOT IN / NOT EXISTS for finding set differences?">
        <p style={{ margin: '0 0 14px' }}>All three find rows in one set that are absent from another, but they work at different levels of abstraction and have different capabilities. EXCEPT operates on complete result sets — it compares entire rows across two queries and returns rows from the first query that are not present in the second. It always deduplicates. It works cleanly when both queries return the same columns naturally.</p>
        <p style={{ margin: '0 0 14px' }}>NOT IN operates on a single column — it filters outer rows where a specific column's value does not appear in a list returned by the subquery. NOT IN fails silently when the subquery contains NULL values. NOT EXISTS is a correlated subquery that checks row-by-row whether a related record exists — it is NULL-safe and can handle complex multi-column or multi-table conditions in the subquery.</p>
        <p style={{ margin: 0 }}>Choose based on the problem structure: EXCEPT when both sides are naturally expressed as full queries returning the same columns — "customer_ids who ordered in January" EXCEPT "customer_ids who ordered in February" is a natural set difference. NOT EXISTS when the anti-join condition is complex — involves multiple tables, multiple conditions, or you need flexibility beyond what two parallel queries provide. NOT IN when the subquery is simple, small, and guaranteed NULL-free. EXCEPT is cleanest for comparing two entire queries; NOT EXISTS is most flexible for row-level anti-join with complex conditions. Performance: all three produce anti-join plans in the optimiser for most databases — performance is typically equivalent when proper indexes exist.</p>
      </IQ>

      <IQ q="How do set operations handle NULL values?">
        <p style={{ margin: '0 0 14px' }}>Set operations treat NULL values as equal to each other for the purpose of deduplication and comparison — unlike standard SQL WHERE comparisons where NULL ≠ NULL. This is a specific exception to NULL's usual semantics and it is important for understanding UNION, INTERSECT, and EXCEPT behaviour.</p>
        <p style={{ margin: '0 0 14px' }}>In UNION (with deduplication): if both queries return a row where a specific column is NULL, the NULL row appears only once in the result — the database treats the two NULL values as "equal" for deduplication. In INTERSECT: a row with NULL in one query can match a row with NULL in the other query — NULLs are considered equal. In EXCEPT: a row with NULL in the first query is considered matched by a row with NULL in the second query and is therefore excluded from the EXCEPT result.</p>
        <p style={{ margin: 0 }}>This NULL-equality behaviour in set operations is defined by the SQL standard and implemented consistently in PostgreSQL, MySQL 8+, and SQL Server. It differs from WHERE NULL = NULL (which evaluates to NULL, not TRUE) and is closer to IS NOT DISTINCT FROM semantics. Practical implication: if you are using EXCEPT to find "new" rows and some rows have NULL keys, those NULL-key rows from the first query will be considered matched by NULL-key rows from the second query and excluded from EXCEPT — which is usually the desired behaviour. When you specifically need NULL to not match NULL in a set operation context, you need a more complex approach using NOT EXISTS with IS NULL checks.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: each UNION query must have the same number of columns"
        cause="The two queries being combined with UNION, UNION ALL, INTERSECT, or EXCEPT return different numbers of columns. Set operations require exactly the same column count in all queries. This commonly happens when adding a new column to one query in a set operation without updating the others, or when copying a query template and forgetting to match the column count."
        fix="Count the columns in each SELECT clause and ensure they match. Add NULL AS column_name placeholder columns to queries that have fewer columns: SELECT customer_id, first_name, NULL AS city FROM employees UNION ALL SELECT customer_id, first_name, city FROM customers. Each NULL placeholder occupies a column position and is cast to the appropriate type from the other query's column. Alternatively, remove columns from the query that has more until they match."
      />

      <Err
        msg="UNION is very slow — takes 30 seconds for queries that individually take under 1 second"
        cause="UNION (without ALL) performs deduplication by sorting all combined rows — O(n log n) work even when the result sets are already disjoint and contain no duplicates. The sort is expensive proportional to the total number of rows across all combined queries. With large result sets, this deduplication sort becomes the dominant cost."
        fix="Use UNION ALL instead of UNION if the result sets are disjoint (which they often are when you are combining queries with mutually exclusive WHERE conditions). UNION ALL skips the deduplication sort entirely — O(n) instead of O(n log n). Only use UNION (with deduplication) when the same row could genuinely appear in multiple queries and you need each row once. Verify the result sets are disjoint by confirming their WHERE conditions are mutually exclusive: WHERE status = 'Active' and WHERE status = 'Inactive' cannot produce the same row — use UNION ALL."
      />

      <Err
        msg="ERROR: ORDER BY clause not allowed at this point — inside a UNION query"
        cause="An ORDER BY was placed inside one of the individual queries within a UNION/UNION ALL rather than after the final query. ORDER BY inside a UNION member query is not allowed in standard SQL (PostgreSQL, MySQL 8+) because it would apply only to that query's result before the set operation combines them — which is undefined behaviour since the set operation does not preserve ordering anyway."
        fix="Move ORDER BY to after the last query in the set operation: SELECT ... UNION ALL SELECT ... ORDER BY column. This applies ORDER BY to the entire combined result. If you need to sort and limit individual queries before combining them (for example, top-5 from each source), wrap each query in a subquery: SELECT * FROM (SELECT ... ORDER BY col LIMIT 5) AS q1 UNION ALL SELECT * FROM (SELECT ... ORDER BY col LIMIT 5) AS q2. The subquery wrapping allows ORDER BY and LIMIT to apply to each part independently."
      />

      <Err
        msg="EXCEPT returns zero rows — expected to find differences between two result sets"
        cause="The two queries passed to EXCEPT return identical result sets, so EXCEPT eliminates all rows from the first query. Or the column types or values differ slightly between the two queries (different precision, different string formatting, leading/trailing whitespace) preventing rows from being considered equal — so EXCEPT does not eliminate any rows from the first query and returns more rows than expected."
        fix="Run each query independently and compare the results visually. Check column types — EXCEPT considers rows identical only when all column values match including type. A DECIMAL(10,2) value of 5.00 may not match an INTEGER value of 5 in an EXCEPT comparison. Ensure consistent data types and formatting across both queries. Use ROUND() or CAST() to normalise numeric precision before EXCEPT. For string columns, use TRIM() and LOWER() to normalise whitespace and case before comparing."
      />

      <Err
        msg="INTERSECT returns fewer rows than expected — some common rows are missing"
        cause="The rows that should be common between the two queries are not considered identical by INTERSECT because of type or value differences in one or more columns. INTERSECT compares entire rows — all columns must match exactly. If column 3 has a different value or type in the two queries (even by one decimal place, trailing space, or NULL vs empty string), the row is not considered a match."
        fix="Simplify by reducing the columns being compared — only include the columns that define the common identity. SELECT customer_id FROM query_a INTERSECT SELECT customer_id FROM query_b is more reliable than comparing all columns. If you need multi-column INTERSECT, ensure consistent formatting: use the same ROUND() precision, the same TRIM() and LOWER() normalisation, and the same NULL handling (COALESCE to a default value) across both queries. Use FULL OUTER JOIN instead of INTERSECT for debugging — it shows matched and unmatched rows with all column values visible."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write three queries demonstrating all three set operations: (1) UNION ALL — produce a combined 'activity feed' showing the 5 most recent delivered orders and the 5 most expensive products, with columns: id (order_id or product_id), name (a description), amount (total_amount or unit_price), and type ('Order' or 'Product'). (2) INTERSECT — find store_ids that appear in BOTH delivered orders AND have at least one employee assigned. Show just the store_id. (3) EXCEPT — find product categories that appear in the products table but have NOT appeared in any delivered order's order_items. Show just the category name, sorted alphabetically."
        hint="Query 1: two subqueries with LIMIT 5 each, UNION ALL. Query 2: store_ids from delivered orders INTERSECT store_ids from employees. Query 3: DISTINCT category from products EXCEPT DISTINCT category from products JOIN order_items JOIN orders."
        answer={`-- Query 1: Activity feed — recent orders UNION ALL expensive products
SELECT * FROM (
  SELECT
    CAST(order_id AS TEXT)             AS id,
    'Order #' || CAST(order_id AS TEXT) AS name,
    total_amount                       AS amount,
    'Order'                            AS type
  FROM orders
  WHERE order_status = 'Delivered'
  ORDER BY order_date DESC
  LIMIT 5
) AS recent_orders

UNION ALL

SELECT * FROM (
  SELECT
    CAST(product_id AS TEXT)           AS id,
    product_name                       AS name,
    unit_price                         AS amount,
    'Product'                          AS type
  FROM products
  ORDER BY unit_price DESC
  LIMIT 5
) AS expensive_products

ORDER BY type, amount DESC;

-- Query 2: Stores with BOTH delivered orders AND employees
SELECT store_id FROM orders
WHERE order_status = 'Delivered'

INTERSECT

SELECT store_id FROM employees
WHERE store_id IS NOT NULL

ORDER BY store_id;

-- Query 3: Categories with NO delivered order history
SELECT DISTINCT category FROM products

EXCEPT

SELECT DISTINCT p.category
FROM products    AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders      AS o  ON oi.order_id  = o.order_id
WHERE o.order_status = 'Delivered'

ORDER BY category;`}
        explanation="Query 1 uses subquery wrapping (SELECT * FROM (...) AS alias) to apply LIMIT 5 and ORDER BY inside each query before UNION ALL combines them — direct ORDER BY inside a UNION member is not allowed. The outer ORDER BY applies to the combined result. Casting order_id and product_id to TEXT ensures column type compatibility across both SELECT lists. Query 2 is pure INTERSECT on store_id — the first query finds stores with delivered orders, the second finds stores with employees, INTERSECT returns only stores appearing in both. The WHERE store_id IS NOT NULL guard ensures head-office employees (NULL store_id) do not create a NULL in the INTERSECT. Query 3 uses EXCEPT to subtract categories that have appeared in delivered orders from the full category list. The second query joins three tables to get the category of each delivered order line — only those categories are subtracted from the full list, leaving categories that were never in a delivered order."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Set operations combine query results vertically — stacking rows. JOINs combine horizontally — adding columns. They solve different problems.',
          'Three set operations: UNION (all rows, deduplicates), INTERSECT (common rows only), EXCEPT (first minus second). All require matching column count and compatible types.',
          'UNION ALL skips deduplication — O(n) vs UNION\'s O(n log n). Default to UNION ALL when result sets are disjoint or duplicates are acceptable. Only use UNION when you need deduplication across sources.',
          'Column names in the result come from the first query. All subsequent queries contribute rows but their column names are ignored.',
          'ORDER BY and LIMIT apply to the entire combined result and must appear after the final query. To sort/limit individual queries, wrap each in a subquery.',
          'INTERSECT finds rows that satisfy two independent conditions — entities that appear in both result sets. NULL = NULL for set operation comparisons (unlike standard WHERE).',
          'EXCEPT returns rows from the first query not present in the second. Equivalent to NOT EXISTS and LEFT JOIN IS NULL for set differences — choose based on complexity of conditions.',
          'Set operations always deduplicate (except UNION ALL). UNION deduplicates across both queries. INTERSECT and EXCEPT deduplicate by definition.',
          'Symmetric difference (rows unique to either side): (A EXCEPT B) UNION ALL (B EXCEPT A). This finds everything that does not overlap.',
          'Reconciliation reports are the primary production use case: EXCEPT to find missing records, UNION ALL to combine matched and unmatched sets with status labels into one complete reconciliation view.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 40</strong>, you learn derived tables in depth — subqueries in FROM as building blocks for multi-step analytics, the rules for aliasing and referencing, and when a derived table beats a CTE.
        </p>
        <Link href="/learn/sql/derived-tables" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 40 → Derived Tables
        </Link>
      </div>

    </LearnLayout>
  );
}