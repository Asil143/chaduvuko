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

export default function DerivedTables() {
  return (
    <LearnLayout
      title="Derived Tables"
      description="Subqueries in FROM as reusable virtual tables — pre-aggregation, multi-step analytics, fan-out prevention, filtering before joining, and when to choose derived tables over CTEs"
      section="SQL — Module 40"
      readTime="32 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a Derived Table Is" />

      <P>A derived table is a subquery that appears in the <Hl>FROM clause</Hl> — treated by the outer query exactly like a regular table. It has columns, it has rows, it can be JOINed, filtered, grouped, and aggregated. The difference from a base table is that it is computed on the fly from a SELECT — it does not exist in storage, only in memory during query execution.</P>

      <P>The term "derived table" and "inline view" mean the same thing. In some contexts people also call it a "subquery in FROM." All three phrases describe the same construct: a SELECT inside parentheses in the FROM clause, given a mandatory alias.</P>

      <CodeBlock
        label="Derived table anatomy"
        code={`SELECT outer.col_a, outer.col_b
FROM (
  -- This is the derived table
  SELECT col_a, col_b, computed_col
  FROM base_table
  WHERE some_condition
  GROUP BY col_a, col_b
) AS derived_table_alias        -- alias is MANDATORY
WHERE outer.computed_col > 100; -- outer query can filter on derived table's columns

-- Rules:
-- 1. Must be wrapped in parentheses
-- 2. Must have an alias (AS some_name)
-- 3. The outer query references it by the alias
-- 4. The outer query can use any column the derived table returns`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Why Derived Tables Exist — The Two-Step Problem" />

      <P>Many analytical questions require two steps that cannot be expressed in a single SELECT. Step 1 computes something — a per-group aggregate, a filtered subset, a ranked result. Step 2 uses that computed result to filter, join, or aggregate further. Without derived tables (or CTEs), you would need two separate queries and manual data transfer between them.</P>

      <P>The canonical example: find customers whose total spend is above the 75th percentile. Step 1 computes total spend per customer. Step 2 computes the 75th percentile of those totals. Step 3 filters customers above it. All three steps in one query require derived tables or CTEs.</P>

      <H>The problem without derived tables</H>

      <CodeBlock
        label="Why you cannot do it in one flat SELECT"
        code={`-- IMPOSSIBLE in a single flat SELECT:
-- Filter customers where their total spend > AVG(total spend per customer)

-- This fails: WHERE cannot reference an aggregate that doesn't exist yet
SELECT customer_id, SUM(total_amount) AS total_spend
FROM orders
WHERE SUM(total_amount) > (SELECT AVG(???) FROM ???)  -- ✗ can't reference
GROUP BY customer_id;

-- Derived table solves it cleanly:
SELECT customer_id, total_spend
FROM (
  -- Step 1: compute per-customer total spend
  SELECT customer_id, SUM(total_amount) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS customer_totals                          -- Step 1 result named
WHERE total_spend > (                          -- Step 2: filter on Step 1 result
  SELECT AVG(total_spend) FROM customer_totals -- re-reference Step 1
);
-- Note: MySQL allows this; PostgreSQL requires CTE for self-reference`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Pre-Aggregation — The Most Common Pattern" />

      <P>Pre-aggregation is the most frequent use of derived tables: aggregate a table first, then join the aggregated result to other tables. This prevents the fan-out problem (Module 31) and ensures aggregates are computed at the correct granularity before joining.</P>

      <H>Per-store revenue joined to store details</H>

      <SQLPlayground
        initialQuery={`-- Derived table: per-store order stats
-- Outer query: joins those stats to store details
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  store_stats.order_count,
  store_stats.total_revenue,
  store_stats.avg_order_value,
  ROUND(store_stats.total_revenue / s.monthly_target * 100, 1) AS target_pct
FROM stores AS s
JOIN (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_revenue,
    ROUND(AVG(total_amount), 2)  AS avg_order_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS store_stats ON s.store_id = store_stats.store_id
ORDER BY store_stats.total_revenue DESC;`}
        height={255}
        showSchema={true}
      />

      <H>Per-product revenue joined to product catalogue</H>

      <SQLPlayground
        initialQuery={`-- Derived table: sales aggregated to product level
-- No fan-out: each product has exactly one row in the derived table
SELECT
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  COALESCE(sales.units_sold, 0)        AS units_sold,
  COALESCE(sales.total_revenue, 0)     AS total_revenue,
  COALESCE(sales.order_count, 0)       AS order_count,
  ROUND(
    (p.unit_price - p.cost_price) / p.unit_price * 100
  , 1)                                 AS current_margin_pct
FROM products AS p
LEFT JOIN (
  SELECT
    oi.product_id,
    SUM(oi.quantity)               AS units_sold,
    ROUND(SUM(oi.line_total), 2)   AS total_revenue,
    COUNT(DISTINCT oi.order_id)    AS order_count
  FROM order_items AS oi
  JOIN orders AS o ON oi.order_id = o.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY oi.product_id
) AS sales ON p.product_id = sales.product_id
ORDER BY total_revenue DESC NULLS LAST;`}
        height={275}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Two-Level Aggregation — Aggregate of Aggregates" />

      <P>SQL does not allow directly aggregating an aggregate: AVG(SUM(col)) is not valid syntax. A derived table solves this — compute the inner aggregate in the derived table, then aggregate those results in the outer query.</P>

      <SQLPlayground
        initialQuery={`-- Average of per-store revenue totals
-- (average of averages requires two aggregation levels)
SELECT
  ROUND(AVG(store_rev.total_revenue), 2)  AS avg_store_revenue,
  ROUND(MIN(store_rev.total_revenue), 2)  AS min_store_revenue,
  ROUND(MAX(store_rev.total_revenue), 2)  AS max_store_revenue,
  COUNT(*)                                AS store_count
FROM (
  SELECT
    store_id,
    SUM(total_amount) AS total_revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS store_rev;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Customers above the average of per-customer total spend
-- Step 1 (derived table): compute total spend per customer
-- Step 2 (outer query): filter customers above the average of those totals
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  cs.total_spend
FROM customers AS c
JOIN (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cs ON c.customer_id = cs.customer_id
WHERE cs.total_spend > (
  -- Average of the per-customer totals (second level)
  SELECT AVG(total_spend)
  FROM (
    SELECT customer_id, SUM(total_amount) AS total_spend
    FROM orders WHERE order_status = 'Delivered'
    GROUP BY customer_id
  ) AS all_customer_totals
)
ORDER BY cs.total_spend DESC;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Pre-Filtering — Reduce Rows Before Joining" />

      <P>A derived table can filter a table before it is joined — reducing the number of rows the join must process. This is particularly useful when only a small subset of a large table is relevant to the join, and pushing the filter into a derived table allows the database to reduce rows early.</P>

      <SQLPlayground
        initialQuery={`-- Only join Platinum customers — pre-filter in derived table
-- Reduces the customer rows before the join to orders
SELECT
  plat.customer_id,
  plat.first_name || ' ' || plat.last_name  AS customer,
  plat.city,
  o.order_id,
  o.order_date,
  o.total_amount
FROM (
  SELECT customer_id, first_name, last_name, city
  FROM customers
  WHERE loyalty_tier = 'Platinum'   -- filter INSIDE derived table
) AS plat
JOIN orders AS o
  ON plat.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
ORDER BY o.total_amount DESC;`}
        height={240}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Only join high-value orders (above ₹800)
-- Filter in derived table before joining to customer details
SELECT
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city,
  big_orders.order_id,
  big_orders.total_amount,
  big_orders.order_date
FROM (
  SELECT order_id, customer_id, total_amount, order_date
  FROM orders
  WHERE order_status = 'Delivered'
    AND total_amount > 800             -- filter in derived table
) AS big_orders
JOIN customers AS c ON big_orders.customer_id = c.customer_id
ORDER BY big_orders.total_amount DESC;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Fan-Out Prevention — The Critical Use Case" />

      <P>The fan-out problem (Module 31): joining a one-to-many relationship before aggregating causes the aggregate to count the "one" side multiple times. Derived tables prevent this by aggregating the "many" side first — before the join — so the join is one-to-one at the order level.</P>

      <H>The fan-out bug and its fix</H>

      <SQLPlayground
        initialQuery={`-- WRONG: join orders to order_items THEN aggregate
-- total_amount is counted once per item (fan-out)
SELECT
  s.store_id,
  s.city,
  COUNT(DISTINCT o.order_id)        AS order_count,
  ROUND(SUM(o.total_amount), 2)     AS WRONG_revenue  -- inflated!
FROM stores AS s
JOIN orders      AS o  ON s.store_id   = o.store_id
JOIN order_items AS oi ON o.order_id   = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.city
ORDER BY WRONG_revenue DESC;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: pre-aggregate order_items before joining to orders
-- Each order has one row in item_totals — no fan-out
SELECT
  s.store_id,
  s.city,
  COUNT(o.order_id)                 AS order_count,
  ROUND(SUM(o.total_amount), 2)     AS correct_revenue
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.city
ORDER BY correct_revenue DESC;

-- When you DO need item-level metrics alongside order-level metrics:
-- Pre-aggregate items in a derived table first`}
        height={190}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Correct: order-level and item-level metrics together
-- item_stats derived table: one row per order (aggregated from items)
SELECT
  s.store_id,
  s.city,
  COUNT(o.order_id)                  AS order_count,
  ROUND(SUM(o.total_amount), 2)      AS order_revenue,
  SUM(item_stats.total_qty)          AS total_items_sold,
  COUNT(DISTINCT item_stats.product_count) AS distinct_products
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
JOIN (
  SELECT
    order_id,
    SUM(quantity)              AS total_qty,
    COUNT(DISTINCT product_id) AS product_count
  FROM order_items
  GROUP BY order_id
) AS item_stats ON o.order_id = item_stats.order_id
GROUP BY s.store_id, s.city
ORDER BY order_revenue DESC;`}
        height={260}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Derived Tables as Ranking Sources" />

      <P>Derived tables that use window functions to compute rankings can then be filtered in the outer query — the classic "filter by rank" pattern. This is how you find the top-N per group cleanly.</P>

      <SQLPlayground
        initialQuery={`-- Top 2 orders by value per store
-- Inner derived table: rank orders within each store
-- Outer query: keep only rank 1 and 2
SELECT
  store_id,
  order_id,
  order_date,
  total_amount,
  rank_in_store
FROM (
  SELECT
    store_id,
    order_id,
    order_date,
    total_amount,
    RANK() OVER (
      PARTITION BY store_id
      ORDER BY total_amount DESC
    ) AS rank_in_store
  FROM orders
  WHERE order_status = 'Delivered'
) AS ranked_orders
WHERE rank_in_store <= 2
ORDER BY store_id, rank_in_store;`}
        height={255}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Most expensive product in each category
-- Inner: rank products by price within category
-- Outer: filter for rank = 1 (the most expensive)
SELECT
  product_name,
  category,
  brand,
  unit_price,
  category_rank
FROM (
  SELECT
    product_name,
    category,
    brand,
    unit_price,
    RANK() OVER (
      PARTITION BY category
      ORDER BY unit_price DESC
    ) AS category_rank
  FROM products
  WHERE in_stock = true
) AS ranked_products
WHERE category_rank = 1
ORDER BY unit_price DESC;`}
        height={250}
        showSchema={false}
      />

      <Callout type="info">
        Window functions cannot be referenced in the WHERE clause of the same query that defines them — WHERE is evaluated before window functions. A derived table (or CTE) solves this: compute the window function in the inner query, then filter on it in the outer query's WHERE clause. This is one of the most common and most important uses of derived tables.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Multiple Derived Tables in One Query" />

      <P>A single outer query can join multiple derived tables — each one a pre-computed virtual table. This allows assembling a complex report from several independent pre-aggregations without nested CTEs.</P>

      <SQLPlayground
        initialQuery={`-- Store performance dashboard:
-- Three derived tables: order stats, employee stats, product variety
SELECT
  s.store_id,
  s.city,
  s.monthly_target,
  COALESCE(ord.order_count, 0)          AS delivered_orders,
  COALESCE(ord.total_revenue, 0)        AS revenue,
  COALESCE(emp.headcount, 0)            AS employee_count,
  COALESCE(emp.avg_salary, 0)           AS avg_salary,
  COALESCE(prod.distinct_products, 0)   AS distinct_products_sold,
  ROUND(
    COALESCE(ord.total_revenue, 0) / s.monthly_target * 100
  , 1)                                  AS target_pct
FROM stores AS s

LEFT JOIN (
  -- Derived table 1: order-level stats per store
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS ord ON s.store_id = ord.store_id

LEFT JOIN (
  -- Derived table 2: employee headcount and avg salary
  SELECT
    store_id,
    COUNT(*)                     AS headcount,
    ROUND(AVG(salary), 0)        AS avg_salary
  FROM employees
  GROUP BY store_id
) AS emp ON s.store_id = emp.store_id

LEFT JOIN (
  -- Derived table 3: distinct products sold per store
  SELECT
    o.store_id,
    COUNT(DISTINCT oi.product_id) AS distinct_products
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id = oi.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id
) AS prod ON s.store_id = prod.store_id

ORDER BY revenue DESC NULLS LAST;`}
        height={360}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Derived Tables vs CTEs — When to Use Each" />

      <P>Derived tables and CTEs (WITH clause) produce identical results — both create named intermediate result sets. The choice between them is about readability, reuse, and style.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Criterion', 'Derived Table', 'CTE'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Definition location', 'Inline — inside FROM or JOIN', 'Before the main query — WITH clause'],
              ['Reusability in same query', 'Cannot be referenced more than once', 'Can be referenced multiple times'],
              ['Readability', 'Harder to read when complex (nested)', 'Cleaner — each step named at the top'],
              ['Self-referencing', 'Cannot reference itself', 'Can (recursive CTEs)'],
              ['Naming', 'Anonymous until aliased inline', 'Named at definition, used by name throughout'],
              ['Performance', 'Identical — same execution plan', 'May be materialised in PostgreSQL (controllable)'],
              ['Best for', 'Short, single-use transformations; when CTE overhead feels excessive', 'Multi-step logic; reused results; self-documenting complex queries'],
            ].map(([crit, dt, cte], i) => (
              <tr key={crit} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{crit}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{dt}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{cte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Same query — derived table vs CTE</H>

      <SQLPlayground
        initialQuery={`-- Derived table version (inline — compact)
SELECT
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  cs.total_spend
FROM customers AS c
JOIN (
  SELECT customer_id, ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cs ON c.customer_id = cs.customer_id
WHERE cs.total_spend > 500
ORDER BY cs.total_spend DESC;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CTE version (named, reads top-to-bottom)
WITH customer_spend AS (
  SELECT customer_id, ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  cs.total_spend
FROM customers AS c
JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
WHERE cs.total_spend > 500
ORDER BY cs.total_spend DESC;`}
        height={195}
        showSchema={false}
      />

      <P>Both produce identical results. The derived table version is more compact — good for simple pre-aggregations. The CTE version is more readable for complex logic — each step is named and the main SELECT reads clearly. The decision is style: use whichever makes the query easier for the next person to understand and maintain.</P>

      <ProTip>
        The practical rule: if the subquery in FROM is 3 lines or fewer and used only once, keep it inline as a derived table. If it is longer, used more than once, or benefits from a descriptive name that documents what it computes, extract it to a CTE. When in doubt, prefer CTE — the naming overhead is small and the readability benefit is large.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data analyst at Gopuff, a quick-commerce platform. The operations team needs a daily metrics dashboard that shows, for each delivery partner (adapted here as FreshCart store): their total deliveries, average delivery time, their fastest and slowest delivery, how they compare to the overall average, and their rank among all partners. This requires multiple derived tables at different aggregation levels.</P>

      <TimeBlock time="9:00 AM" label="Requirements defined">
        Per-store: total delivered orders, avg delivery days, min/max delivery days, difference from overall avg, rank by average delivery speed.
      </TimeBlock>

      <TimeBlock time="9:20 AM" label="Step 1 — build the store-level derived table">
        First compute all per-store metrics in a derived table, verify the output.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Step 1: per-store delivery metrics
SELECT
  store_id,
  COUNT(*)                                            AS deliveries,
  ROUND(AVG(julianday(delivery_date) - julianday(order_date)), 1)           AS avg_days,
  MIN(julianday(delivery_date) - julianday(order_date))                     AS fastest,
  MAX(julianday(delivery_date) - julianday(order_date))                     AS slowest
FROM orders
WHERE order_status = 'Delivered'
  AND delivery_date IS NOT NULL
GROUP BY store_id
ORDER BY avg_days;`}
        height={195}
        showSchema={true}
      />

      <TimeBlock time="9:35 AM" label="Step 2 — add overall average and rank">
        Wrap Step 1 in a derived table, add overall average from a second derived table, compute rank in the outer query.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Full dashboard: store metrics + overall comparison + rank
SELECT
  s.store_id,
  s.city,
  store_metrics.deliveries,
  store_metrics.avg_days,
  store_metrics.fastest,
  store_metrics.slowest,
  overall.overall_avg_days,
  ROUND(store_metrics.avg_days - overall.overall_avg_days, 1) AS vs_overall,
  RANK() OVER (ORDER BY store_metrics.avg_days ASC)           AS speed_rank
FROM stores AS s
JOIN (
  -- Derived table 1: per-store metrics
  SELECT
    store_id,
    COUNT(*)                                          AS deliveries,
    ROUND(AVG(julianday(delivery_date) - julianday(order_date)), 1)         AS avg_days,
    MIN(julianday(delivery_date) - julianday(order_date))                   AS fastest,
    MAX(julianday(delivery_date) - julianday(order_date))                   AS slowest
  FROM orders
  WHERE order_status = 'Delivered'
    AND delivery_date IS NOT NULL
  GROUP BY store_id
) AS store_metrics ON s.store_id = store_metrics.store_id
CROSS JOIN (
  -- Derived table 2: overall average (single row — broadcast to all stores)
  SELECT ROUND(AVG(julianday(delivery_date) - julianday(order_date)), 1) AS overall_avg_days
  FROM orders
  WHERE order_status = 'Delivered'
    AND delivery_date IS NOT NULL
) AS overall
ORDER BY speed_rank;`}
        height={320}
        showSchema={false}
      />

      <TimeBlock time="10:00 AM" label="Dashboard complete — 40 minutes from brief to delivery">
        Two derived tables — one for per-store metrics, one for the overall average broadcast — assembled with a CROSS JOIN that attaches the single overall average to every store row. The outer query adds the rank using a window function over the derived table's avg_days. Clean, readable, and all in one query.
      </TimeBlock>

      <ProTip>
        CROSS JOIN to a single-row derived table is the standard SQL pattern for "broadcast a single computed value to every row." The single-row subquery (SELECT AVG(...) FROM ...) returns one row, and CROSS JOIN attaches it to every row of the other table — making the global average available for comparison in every row without a correlated subquery.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a derived table and what are the rules for using one?">
        <p style={{ margin: '0 0 14px' }}>A derived table is a subquery that appears in the FROM clause of an outer query. The database computes the subquery first and presents its result as a virtual table that the outer query can JOIN, filter, aggregate, and otherwise treat exactly like a base table. The derived table exists only for the duration of the query — it is not stored in the database.</p>
        <p style={{ margin: '0 0 14px' }}>Three mandatory rules: First, the subquery must be enclosed in parentheses. Second, the derived table must have an alias — FROM (SELECT ...) AS alias_name. Without the alias, the query produces a syntax error. Third, the outer query must reference the derived table by its alias — any column the outer query wants to use must be included in the derived table's SELECT list.</p>
        <p style={{ margin: 0 }}>The practical rules: derived tables cannot be referenced more than once in the same query (use a CTE for reuse), they cannot reference each other (derived table A cannot reference derived table B in the same FROM clause — use CTEs for sequential dependencies), and they cannot contain ORDER BY in most databases unless LIMIT is also specified. Beyond these restrictions, derived tables are fully functional SQL — they can contain JOINs, GROUP BY, HAVING, window functions, and any other SQL construct. The power comes from their composability: the outer query treats the result of any arbitrary SELECT as a clean, queryable table.</p>
      </IQ>

      <IQ q="Why would you put a subquery in FROM rather than using a correlated subquery in WHERE?">
        <p style={{ margin: '0 0 14px' }}>A correlated subquery in WHERE executes once per outer row — N executions for N outer rows. This can be O(n²) in complexity for large tables. A derived table in FROM is computed once — it runs the subquery a single time, produces a result set, and the outer query joins to that result. For aggregations that would otherwise be correlated, the derived table approach is dramatically faster at scale.</p>
        <p style={{ margin: '0 0 14px' }}>The specific case where derived table beats correlated subquery: "for each employee, find those whose salary is above the department average." Correlated subquery runs SELECT AVG(salary) FROM employees WHERE department = e.department once per employee — N subquery executions. Derived table runs SELECT department, AVG(salary) FROM employees GROUP BY department once total — one execution — and the outer query JOINs employees to these pre-computed averages. For 10,000 employees across 20 departments: correlated = 10,000 subquery executions, derived table = 1 execution producing 20 rows, then one JOIN pass through 10,000 employee rows.</p>
        <p style={{ margin: 0 }}>Additional reasons to prefer derived table over correlated subquery: when the outer query needs multiple columns from the subquery result (correlated scalar subquery returns one value — you need one correlated subquery per column; derived table provides all columns at once), when the same computation is needed in multiple places in the outer query (derived table computes it once and it is reusable via alias; correlated subquery must be repeated), and when the subquery logic is complex enough that seeing it inline in WHERE hurts readability. Use correlated subquery when the logic is simple, involves existence checks (EXISTS), or when the per-row dependency is genuinely required and cannot be expressed as a join.</p>
      </IQ>

      <IQ q="How do you prevent the fan-out problem when joining tables with one-to-many relationships?">
        <p style={{ margin: '0 0 14px' }}>The fan-out problem occurs when joining a one-to-many relationship before aggregating — each "one" side row is duplicated once per "many" side row, causing aggregates on the one-side column to count the same value multiple times. SUM(orders.total_amount) after joining orders to order_items triple-counts each order's total_amount for an order with three items.</p>
        <p style={{ margin: '0 0 14px' }}>The derived table solution: pre-aggregate the many-side table before joining. Instead of joining orders to order_items and then aggregating, first aggregate order_items to order-level metrics in a derived table (one row per order_id with SUM(line_total) and SUM(quantity)), then join that one-row-per-order result to orders. The resulting join is one-to-one at the order level — no fan-out, no inflated aggregates.</p>
        <p style={{ margin: 0 }}>Implementation: SELECT o.store_id, SUM(o.total_amount) AS revenue, SUM(item_stats.total_qty) AS total_items FROM orders AS o JOIN (SELECT order_id, SUM(quantity) AS total_qty FROM order_items GROUP BY order_id) AS item_stats ON o.order_id = item_stats.order_id GROUP BY o.store_id. The derived table item_stats has exactly one row per order — the join is safe. Using COUNT(DISTINCT o.order_id) instead of COUNT(*) is the other approach when pre-aggregation is not possible — it counts unique orders rather than order-item rows. The derived table approach is preferred when multiple many-side metrics are needed, as it is cleaner and more efficient.</p>
      </IQ>

      <IQ q="Why can window functions not be used in WHERE directly, and how do derived tables solve this?">
        <p style={{ margin: '0 0 14px' }}>Window functions are computed at the SELECT stage of query execution — after FROM, WHERE, GROUP BY, and HAVING have already been processed. WHERE runs before window functions are computed, so referencing a window function result in WHERE is a reference to a value that does not yet exist. This is why WHERE rank_in_store &lt;= 2 fails — rank_in_store is a window function result that has not been computed when WHERE evaluates.</p>
        <p style={{ margin: '0 0 14px' }}>The derived table solution: compute the window function in an inner query, then filter on its result in the outer query's WHERE. The inner query: SELECT *, RANK() OVER (PARTITION BY store_id ORDER BY total_amount DESC) AS rank_in_store FROM orders. This produces a result set where every row has its rank attached. The outer query: SELECT * FROM (inner_query) AS ranked WHERE rank_in_store &lt;= 2. The outer WHERE now filters on rank_in_store which exists as a column in the derived table — it was computed in the inner query and is just a regular column from the outer query's perspective.</p>
        <p style={{ margin: 0 }}>This pattern — window function in derived table, filter in outer WHERE — is one of the most common uses of derived tables. It appears every time you need to filter by rank, percentile, running total threshold, or any other window-computed value. The same pattern works for HAVING (cannot filter on window function results in HAVING of the same query) and for ORDER BY (though ORDER BY can reference window function columns in the same query without a derived table). An equivalent approach uses CTEs: WITH ranked AS (SELECT *, RANK() OVER (...) AS rn FROM orders) SELECT * FROM ranked WHERE rn &lt;= 2. Both derived table and CTE are correct — the CTE version is more readable for complex ranking queries.</p>
      </IQ>

      <IQ q="What is the difference between a derived table and a CTE and when would you choose each?">
        <p style={{ margin: '0 0 14px' }}>A derived table is defined inline within the FROM clause — it appears as a parenthesised subquery immediately where it is used. A CTE (Common Table Expression) is defined before the main query using the WITH keyword — it is given a name and can be referenced by that name anywhere in the subsequent query. Both produce the same intermediate result set and both are computed at query execution time (not stored).</p>
        <p style={{ margin: '0 0 14px' }}>The key functional differences: CTEs can be referenced multiple times in the same query; a derived table can only be referenced once at the location it is defined. CTEs can be recursive (WITH RECURSIVE) enabling hierarchical queries; derived tables cannot. CTEs read top-to-bottom in logical order — each step builds on the previous; derived tables are read inside-out which can be harder to follow for complex logic. In PostgreSQL, CTEs are materialised by default (computed once and cached) while derived tables are typically inlined into the main query plan; this difference is controllable with the MATERIALIZED and NOT MATERIALIZED hints.</p>
        <p style={{ margin: 0 }}>Choosing between them: use a derived table when the subquery is short (under 5 lines), used exactly once, and the inline position makes the query's logic clear — a simple pre-aggregation that is directly joined to one other table. Use a CTE when the intermediate result has a meaningful name that documents what it computes, when the same result is referenced more than once, when the logic has multiple sequential steps where each builds on the previous, or when the derived table would be long enough to obscure the outer query's logic. For simple cases, derived tables are more compact. For complex analytical queries, CTEs produce code that is significantly easier to read, review, and maintain.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: subquery in FROM must have an alias — syntax error near closing parenthesis"
        cause="Every derived table (subquery in FROM) requires an alias immediately after the closing parenthesis. Without the alias, the database cannot give the derived table a name for the outer query to reference it by, which is a syntax error. This is one of the most common beginner mistakes with derived tables."
        fix="Add AS alias_name immediately after the closing parenthesis of the subquery: FROM (SELECT ...) AS my_derived_table. The alias can be any valid identifier. Choose a descriptive name that reflects what the derived table computes: AS store_stats, AS customer_totals, AS ranked_orders. Short aliases like AS t or AS dt work syntactically but add no clarity — use descriptive names."
      />

      <Err
        msg="ERROR: column 'total_spend' does not exist — reference to derived table column fails"
        cause="The outer query references a column name that is either not returned by the derived table's SELECT list or is referenced by the wrong alias. The outer query can only access columns that the derived table explicitly returns — if total_spend is computed inside the derived table but not included in its SELECT, it is not accessible to the outer query."
        fix="Ensure the derived table's SELECT list includes every column the outer query needs: SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id. If the column has a computed expression (SUM(total_amount)), give it an alias in the derived table so the outer query can reference it by a clear name. Check the alias prefix — if the derived table is aliased AS cs, reference its columns as cs.total_spend not just total_spend (though both often work, prefixing prevents ambiguity errors)."
      />

      <Err
        msg="Derived table query is correct but outer query gives wrong aggregates — inflated numbers"
        cause="The derived table does not aggregate to the correct granularity before the join. If the derived table joins orders to order_items without aggregating to order-level first, the derived table itself has one row per order-item, and any subsequent join or aggregation in the outer query operates on inflated data. The fan-out problem can live inside the derived table, not just between the derived table and the outer query."
        fix="Verify the derived table's row count is the expected granularity: SELECT COUNT(*) FROM (your derived table subquery). If it returns more rows than expected (more than one per store_id for a per-store aggregation), the derived table has a fan-out — add GROUP BY to the correct level inside the derived table. The derived table should produce exactly one row per entity at the granularity the outer query needs."
      />

      <Err
        msg="Window function reference in WHERE fails — 'rank_in_store' column does not exist"
        cause="A window function result is referenced in the WHERE clause of the same query that defines it. WHERE is evaluated before SELECT in SQL's logical execution order — window functions are computed at the SELECT stage. So WHERE rank_in_store <= 2 references a column that has not been computed yet when WHERE executes."
        fix="Wrap the window function computation in a derived table (or CTE), then filter in the outer query's WHERE: SELECT * FROM (SELECT *, RANK() OVER (...) AS rank_in_store FROM orders) AS ranked WHERE rank_in_store <= 2. The outer WHERE now references rank_in_store as a regular column of the derived table — it exists because it was computed in the inner query. This pattern is necessary any time you need to filter, sort, or further process a window function result."
      />

      <Err
        msg="Derived table cannot be referenced twice — second reference causes 'table not found' error"
        cause="Derived tables can only be referenced once at the location they are defined. Unlike CTEs, a derived table cannot be used in multiple places in the same query. If the same pre-computed result is needed in two JOIN conditions or two WHERE subclauses, you cannot reference the derived table alias a second time — it does not exist as a named entity outside its single use point."
        fix="Convert the derived table to a CTE: WITH derived_name AS (the subquery) SELECT ... FROM derived_name JOIN ... derived_name. CTEs can be referenced multiple times in the same query. Alternatively, use a temporary table (CREATE TEMP TABLE) for results that are needed in many places across multiple queries. If the second reference is in a subquery within the outer WHERE (like WHERE col > (SELECT AVG(col) FROM derived_table_alias)), PostgreSQL may allow this but it is database-dependent — CTEs are the portable solution."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a single query using at least two derived tables that produces a customer value report. The report should show: customer_id, full name, loyalty_tier, city, total_delivered_spend (sum of their delivered orders), order_count, avg_order_value (rounded to 2 decimal places), the overall average spend per customer (as a single broadcast value — same for all rows), the difference between the customer's spend and the overall average (vs_overall_avg), and a value_segment: 'Champion' if spend > 2 × overall average, 'High Value' if spend > overall average, 'Average' if within ±20% of overall average, 'Below Average' otherwise. Only include customers who have at least one delivered order. Sort by total_delivered_spend descending."
        hint="Derived table 1: customer-level aggregates (customer_id, total_spend, order_count, avg_order). Derived table 2: single-row overall average (CROSS JOIN to broadcast). JOIN customers to derived table 1, CROSS JOIN derived table 2. CASE on spend vs overall avg for segment."
        answer={`SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name    AS full_name,
  c.loyalty_tier,
  c.city,
  cs.total_delivered_spend,
  cs.order_count,
  cs.avg_order_value,
  oa.overall_avg,
  ROUND(cs.total_delivered_spend - oa.overall_avg, 2)  AS vs_overall_avg,
  CASE
    WHEN cs.total_delivered_spend > oa.overall_avg * 2  THEN 'Champion'
    WHEN cs.total_delivered_spend > oa.overall_avg      THEN 'High Value'
    WHEN cs.total_delivered_spend >= oa.overall_avg * 0.8 THEN 'Average'
    ELSE                                                     'Below Average'
  END                                   AS value_segment
FROM customers AS c
JOIN (
  -- Derived table 1: per-customer aggregates
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2)   AS total_delivered_spend,
    COUNT(*)                      AS order_count,
    ROUND(AVG(total_amount), 2)   AS avg_order_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cs ON c.customer_id = cs.customer_id
CROSS JOIN (
  -- Derived table 2: overall average per customer (single row broadcast)
  SELECT ROUND(AVG(customer_total), 2) AS overall_avg
  FROM (
    SELECT customer_id, SUM(total_amount) AS customer_total
    FROM orders WHERE order_status = 'Delivered'
    GROUP BY customer_id
  ) AS customer_totals
) AS oa
ORDER BY cs.total_delivered_spend DESC;`}
        explanation="Derived table 1 (cs) pre-aggregates delivered orders to customer level — one row per customer with total spend, order count, and average. The JOIN to customers is safe: no fan-out because cs has exactly one row per customer_id. Derived table 2 (oa) computes the overall average in two levels: the inner subquery aggregates to customer-level totals, the outer SELECT averages those totals. This two-level aggregation is only possible with a derived table (or CTE). The CROSS JOIN broadcasts oa's single row to every customer row — making overall_avg available in every output row without a correlated subquery. The CASE for value_segment uses > oa.overall_avg * 2 for Champion (2x above average), > oa.overall_avg for High Value, >= oa.overall_avg * 0.8 for Average (within 20% below), and Below Average for the rest. The JOIN (not LEFT JOIN) naturally filters to only customers with delivered orders — customers not in the cs derived table have no row in cs so the JOIN excludes them."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A derived table is a subquery in the FROM clause — treated by the outer query as a virtual table. Every derived table must have an alias. No alias = syntax error.',
          'Pre-aggregation is the primary use: compute per-group aggregates in a derived table first, then join the aggregated result to other tables. This prevents fan-out and ensures correct aggregation granularity.',
          'Two-level aggregation — AVG(SUM(col)) — is impossible in one flat SELECT but clean with a derived table: inner query computes the SUM per group, outer query AVGs those sums.',
          'Derived tables prevent the fan-out bug: aggregate the many-side (order_items) to match the one-side granularity (orders) before joining. The derived table has one row per order — no row multiplication.',
          'Window function results cannot be filtered in WHERE of the same query. Wrap the window function in a derived table, then filter on the result column in the outer WHERE.',
          'CROSS JOIN to a single-row derived table broadcasts a global value (overall average, total count) to every row — the clean alternative to a correlated scalar subquery.',
          'Multiple derived tables can be joined in one outer query: three derived tables joined to stores gives per-store order stats, employee stats, and product variety — all in one query.',
          'Derived table vs CTE: derived tables are inline and compact — best for short, single-use transformations. CTEs are named and reusable — best for multi-step logic, repeated references, and self-documenting complex queries.',
          'Derived tables cannot reference each other in the same FROM clause (use CTEs for sequential dependencies) and cannot be referenced more than once (use CTEs for reuse).',
          'Always verify derived table row count: SELECT COUNT(*) FROM (derived table subquery). The count should equal the expected granularity — one row per store, per customer, per product. More rows than expected signals a join or missing GROUP BY inside the derived table.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 41</strong>, you learn the String Function in full depth — syntax, multi-step composition, reuse within one query, performance considerations, and every pattern where CTEs outshine derived tables and subqueries.
        </p>
        <Link href="/learn/sql/string-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 41 → String Function
        </Link>
      </div>

    </LearnLayout>
  );
}