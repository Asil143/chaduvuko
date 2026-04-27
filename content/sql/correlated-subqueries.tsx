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

export default function CorrelatedSubqueries() {
  return (
    <LearnLayout
      title="Correlated Subqueries"
      description="Row-level computations that reference the outer query — every pattern, the execution model, performance implications, and when to rewrite with JOINs or window functions"
      section="SQL — Module 37"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Makes a Subquery Correlated" />

      <P>A non-correlated subquery is self-contained. It executes once, produces a result, and the outer query uses that result for every row it evaluates. The inner query has no dependency on the outer query's current row.</P>

      <P>A correlated subquery <Hl>references a column from the outer query</Hl>. This single fact changes everything about how it executes. Because the inner query depends on the current outer row's values, it cannot be evaluated in advance. It must be re-executed for every row the outer query processes — once per outer row, with the current outer row's column values substituted each time.</P>

      <CodeBlock
        label="Correlated vs non-correlated — the defining difference"
        code={`-- NON-CORRELATED: inner query is independent
-- Executes ONCE. Result reused for every outer row.
SELECT product_name, unit_price
FROM products
WHERE unit_price > (
  SELECT AVG(unit_price)   -- no reference to outer query
  FROM products
);

-- CORRELATED: inner query references outer row's column
-- Executes ONCE PER OUTER ROW.
SELECT product_name, category, unit_price
FROM products AS p
WHERE unit_price > (
  SELECT AVG(unit_price)
  FROM products AS p2
  WHERE p2.category = p.category   -- p.category = outer query's column
);
-- For each product row (outer), the subquery runs with THAT row's category
-- Result: products priced above their own category's average`}
      />

      <SQLPlayground
        initialQuery={`-- Correlated: each product vs its own category's average price
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  ROUND((
    SELECT AVG(p2.unit_price)
    FROM products AS p2
    WHERE p2.category = p.category   -- correlated on category
  ), 2)                              AS category_avg,
  ROUND(p.unit_price - (
    SELECT AVG(p2.unit_price)
    FROM products AS p2
    WHERE p2.category = p.category
  ), 2)                              AS above_avg_by
FROM products AS p
WHERE p.unit_price > (
  SELECT AVG(p2.unit_price)
  FROM products AS p2
  WHERE p2.category = p.category
)
ORDER BY p.category, above_avg_by DESC;`}
        height={255}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Execution Model — Once Per Outer Row" />

      <P>Understanding correlated subquery execution is essential for writing them correctly and knowing when to replace them. The database executes them in a loop — conceptually nested — one inner execution per outer row.</P>

      <CodeBlock
        label="Correlated subquery execution model"
        code={`-- Outer query scans products: 20 rows
-- For EACH of those 20 rows:
--   1. Take the current row's category value (e.g., 'Dairy')
--   2. Execute the inner query with category = 'Dairy'
--   3. Inner query returns the average price for Dairy products
--   4. Compare outer row's unit_price to that average
--   5. Include or exclude the outer row
-- Total inner executions: 20 (one per outer row)

-- If outer query has 1,000,000 rows → 1,000,000 inner executions
-- If inner query scans 10,000 rows each time →
--   10,000,000,000 total row comparisons (10 billion)
-- This is the O(n²) performance problem of correlated subqueries`}
      />

      <H>Watching the execution — step by step</H>

      <SQLPlayground
        initialQuery={`-- Step 1: What does the outer query produce before the correlated filter?
SELECT employee_id, first_name, department, salary
FROM employees
ORDER BY department, salary DESC;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: What does the correlated subquery return for one specific department?
-- Simulating what the inner query computes for 'Management'
SELECT ROUND(AVG(salary), 0) AS dept_avg
FROM employees
WHERE department = 'Management';`}
        height={105}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Step 3: The full correlated query
-- For each employee row, inner query runs with THAT employee's department
SELECT
  employee_id,
  first_name || ' ' || last_name   AS employee,
  department,
  salary,
  ROUND((
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.department = e.department  -- correlated
  ), 0)                                AS dept_avg,
  CASE
    WHEN salary > (SELECT AVG(e2.salary) FROM employees e2
                   WHERE e2.department = e.department)
    THEN 'Above average'
    ELSE 'Below average'
  END                                  AS vs_dept
FROM employees AS e
ORDER BY department, salary DESC;`}
        height={250}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Correlated Subquery in WHERE — Row-Level Filtering" />

      <P>The most common position for a correlated subquery: in the WHERE clause, filtering outer rows based on a comparison with an aggregate computed from related rows.</P>

      <H>Products above their category average</H>

      <SQLPlayground
        initialQuery={`-- Products priced above their own category's average
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  p.unit_price
FROM products AS p
WHERE p.unit_price > (
  SELECT AVG(p2.unit_price)
  FROM products AS p2
  WHERE p2.category = p.category   -- correlated on category
)
ORDER BY p.category, p.unit_price DESC;`}
        height={200}
        showSchema={true}
      />

      <H>Customers whose last order was above their own average</H>

      <SQLPlayground
        initialQuery={`-- Customers whose most recent order exceeds their personal order average
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier
FROM customers AS c
WHERE (
  SELECT MAX(o.total_amount)
  FROM orders AS o
  WHERE o.customer_id = c.customer_id   -- correlated on customer_id
    AND o.order_status = 'Delivered'
    AND o.order_date = (
      SELECT MAX(o2.order_date)
      FROM orders AS o2
      WHERE o2.customer_id = c.customer_id
        AND o2.order_status = 'Delivered'
    )
) > (
  SELECT AVG(o3.total_amount)
  FROM orders AS o3
  WHERE o3.customer_id = c.customer_id  -- correlated again
    AND o3.order_status = 'Delivered'
)
ORDER BY c.loyalty_tier;`}
        height={265}
        showSchema={false}
      />

      <H>Orders above the average for their store</H>

      <SQLPlayground
        initialQuery={`-- Orders where total_amount exceeds the average for that store
SELECT
  o.order_id,
  o.store_id,
  o.order_date,
  o.total_amount,
  ROUND((
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.store_id = o.store_id    -- correlated on store_id
      AND o2.order_status = 'Delivered'
  ), 2)                               AS store_avg
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND o.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.store_id = o.store_id
      AND o2.order_status = 'Delivered'
  )
ORDER BY o.store_id, o.total_amount DESC;`}
        height={255}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Correlated Subquery in SELECT — Per-Row Computed Columns" />

      <P>A correlated subquery in SELECT adds a computed column to every row — the column value is derived from related rows determined by the current outer row's values. This is clean and readable but runs once per row, so it can be slow on large tables.</P>

      <SQLPlayground
        initialQuery={`-- Each store with its total revenue and rank among all stores
SELECT
  s.store_id,
  s.store_name,
  s.city,
  (
    SELECT ROUND(SUM(o.total_amount), 2)
    FROM orders AS o
    WHERE o.store_id = s.store_id
      AND o.order_status = 'Delivered'
  )                                       AS total_revenue,
  (
    -- How many stores have higher revenue than this one?
    SELECT COUNT(*)
    FROM (
      SELECT store_id, SUM(total_amount) AS rev
      FROM orders WHERE order_status = 'Delivered'
      GROUP BY store_id
    ) AS store_revs
    WHERE store_revs.rev > (
      SELECT SUM(o2.total_amount)
      FROM orders AS o2
      WHERE o2.store_id = s.store_id
        AND o2.order_status = 'Delivered'
    )
  ) + 1                                   AS revenue_rank
FROM stores AS s
ORDER BY revenue_rank;`}
        height={285}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Each employee with their department's headcount
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name   AS employee,
  e.department,
  e.salary,
  (
    SELECT COUNT(*)
    FROM employees AS e2
    WHERE e2.department = e.department  -- correlated
  )                                     AS dept_headcount,
  (
    SELECT COUNT(*)
    FROM employees AS e3
    WHERE e3.department = e.department
      AND e3.salary > e.salary          -- employees in same dept earning more
  )                                     AS earns_more_than_me_in_dept
FROM employees AS e
ORDER BY e.department, e.salary DESC;`}
        height={255}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="EXISTS and NOT EXISTS — The Cleanest Correlated Pattern" />

      <P>EXISTS with a correlated subquery is the cleanest, most efficient way to check whether a related record exists. The subquery returns no columns — it returns nothing or at least one row. EXISTS is TRUE if at least one row matches; NOT EXISTS is TRUE if zero rows match. It short-circuits — stops scanning as soon as the first match is found.</P>

      <H>Customers with at least one high-value order</H>

      <SQLPlayground
        initialQuery={`-- Customers who have at least one delivered order above ₹800
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id   -- correlated
    AND o.order_status = 'Delivered'
    AND o.total_amount > 800
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={210}
        showSchema={true}
      />

      <H>Stores that have sold every product category</H>

      <SQLPlayground
        initialQuery={`-- Stores that have sold products from the Dairy category
SELECT
  s.store_id,
  s.store_name,
  s.city
FROM stores AS s
WHERE EXISTS (
  SELECT 1
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.store_id      = s.store_id    -- correlated
    AND o.order_status  = 'Delivered'
    AND p.category      = 'Dairy'
)
ORDER BY s.city;`}
        height={225}
        showSchema={false}
      />

      <H>NOT EXISTS — find gaps</H>

      <SQLPlayground
        initialQuery={`-- Customers who have NEVER placed a delivered order
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.joined_date,
  c.loyalty_tier
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id  = c.customer_id  -- correlated
    AND o.order_status = 'Delivered'
)
ORDER BY c.joined_date DESC;`}
        height={210}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products that have never appeared in any order
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  p.in_stock
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items AS oi
  WHERE oi.product_id = p.product_id   -- correlated
)
ORDER BY p.category, p.unit_price DESC;`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Correlated Subquery in HAVING — Group-Level Correlation" />

      <P>A correlated subquery can appear in HAVING — filtering groups based on a value that itself depends on the group. This is less common but powerful for relative group filtering.</P>

      <SQLPlayground
        initialQuery={`-- Stores whose revenue is above the average store revenue
-- HAVING with a correlated subquery that references the grouped store_id
SELECT
  o.store_id,
  COUNT(*)                      AS order_count,
  ROUND(SUM(o.total_amount), 2) AS store_revenue
FROM orders AS o
WHERE o.order_status = 'Delivered'
GROUP BY o.store_id
HAVING SUM(o.total_amount) > (
  -- Average revenue across all stores
  SELECT AVG(store_rev)
  FROM (
    SELECT store_id, SUM(total_amount) AS store_rev
    FROM orders
    WHERE order_status = 'Delivered'
    GROUP BY store_id
  ) AS all_store_revs
)
ORDER BY store_revenue DESC;`}
        height={260}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Customers who ordered more times than the average customer
SELECT
  customer_id,
  COUNT(*)                      AS order_count
FROM orders
WHERE order_status = 'Delivered'
GROUP BY customer_id
HAVING COUNT(*) > (
  SELECT AVG(cust_orders)
  FROM (
    SELECT customer_id, COUNT(*) AS cust_orders
    FROM orders
    WHERE order_status = 'Delivered'
    GROUP BY customer_id
  ) AS customer_order_counts
)
ORDER BY order_count DESC;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Performance — When Correlated Subqueries Become Expensive" />

      <P>The performance cost of correlated subqueries is proportional to the outer table size. For small tables (hundreds or thousands of rows) they are fast enough that readability should guide the choice. For large tables (millions of rows), the O(n) inner executions can make a query that takes seconds into one that takes minutes or hours.</P>

      <H>The problem at scale</H>

      <CodeBlock
        label="Performance cost model"
        code={`-- Correlated subquery cost:
-- outer_rows × inner_query_cost = total_cost

-- Small table (fine):
-- 50 employees × 50-row dept scan = 2,500 row comparisons

-- Medium table (manageable):
-- 10,000 orders × 10,000-row store scan = 100,000,000 comparisons
-- This starts to slow down

-- Large table (problematic):
-- 10,000,000 orders × 10,000,000-row store scan = 10^14 comparisons
-- This will timeout or OOM

-- The JOIN equivalent:
-- Compute per-store avg once: 10,000,000 rows scanned ONCE
-- Join result to orders: one pass through 10,000,000 rows
-- Total: ~20,000,000 row operations (vs 10^14)
-- Speedup: ~5 million times faster at this scale`}
      />

      <H>Rewriting correlated subquery as JOIN — always faster at scale</H>

      <SQLPlayground
        initialQuery={`-- SLOW: correlated subquery (runs once per product row)
SELECT
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
WHERE p.unit_price > (
  SELECT AVG(p2.unit_price)
  FROM products AS p2
  WHERE p2.category = p.category
);`}
        height={155}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- FAST: JOIN to pre-aggregated category averages (runs aggregation once)
SELECT
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
JOIN (
  SELECT category, AVG(unit_price) AS category_avg
  FROM products
  GROUP BY category
) AS cat_avgs ON p.category = cat_avgs.category
WHERE p.unit_price > cat_avgs.category_avg
ORDER BY p.category, p.unit_price DESC;`}
        height={190}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- FASTEST at scale: window function (single pass, no join)
-- AVG() OVER (PARTITION BY category) computes category avg alongside each row
SELECT
  product_name,
  category,
  unit_price,
  ROUND(AVG(unit_price) OVER (PARTITION BY category), 2) AS category_avg
FROM products
WHERE unit_price > AVG(unit_price) OVER (PARTITION BY category)
ORDER BY category, unit_price DESC;`}
        height={185}
        showSchema={false}
      />

      <H>The decision framework for performance</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { rows: '< 1,000 outer rows', rec: 'Correlated subquery is fine', color: '#00e676', why: 'Small enough that readability is more important than micro-optimisation' },
          { rows: '1,000 – 100,000 rows', rec: 'Consider JOIN rewrite', color: '#f59e0b', why: 'Measure execution time; correlated subquery may be acceptable or noticeably slow' },
          { rows: '> 100,000 rows', rec: 'Use JOIN or window function', color: '#ff4757', why: 'Correlated subquery will be significantly slower — JOIN or window function is mandatory' },
        ].map(item => (
          <div key={item.rows} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ flexShrink: 0, width: 130 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color, fontWeight: 700 }}>{item.rows}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.rec}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.why}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Rewriting Patterns — Correlated to JOIN to Window Function" />

      <P>Every correlated subquery can be rewritten as a JOIN to a derived table or CTE. Most can also be rewritten as a window function. Here are the three canonical rewrites for the most common correlated patterns.</P>

      <H>Pattern 1 — "Each row vs its group aggregate"</H>

      <CodeBlock
        label="Three equivalent rewrites"
        code={`-- GOAL: employees earning above their department average

-- Version A: correlated subquery (readable, slow at scale)
SELECT first_name, department, salary
FROM employees AS e
WHERE salary > (
  SELECT AVG(salary) FROM employees e2
  WHERE e2.department = e.department
);

-- Version B: JOIN to derived table (fast, explicit)
SELECT e.first_name, e.department, e.salary
FROM employees AS e
JOIN (
  SELECT department, AVG(salary) AS dept_avg
  FROM employees GROUP BY department
) AS da ON e.department = da.department
WHERE e.salary > da.dept_avg;

-- Version C: window function (fastest, single pass)
SELECT first_name, department, salary
FROM (
  SELECT
    first_name, department, salary,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg
  FROM employees
) AS ranked
WHERE salary > dept_avg;`}
      />

      <H>Pattern 2 — "Each row vs its group maximum"</H>

      <SQLPlayground
        initialQuery={`-- Most expensive product in each category
-- Window function rewrite — single pass through products

SELECT product_name, category, unit_price
FROM (
  SELECT
    product_name,
    category,
    unit_price,
    MAX(unit_price) OVER (PARTITION BY category) AS category_max
  FROM products
) AS ranked
WHERE unit_price = category_max
ORDER BY category;`}
        height={195}
        showSchema={true}
      />

      <H>Pattern 3 — "Each row vs an ordered rank within its group"</H>

      <SQLPlayground
        initialQuery={`-- Top 2 highest-paid employees per department
-- Correlated subquery version (counting employees with higher salary in dept)
SELECT
  e.first_name || ' ' || e.last_name AS employee,
  e.department,
  e.salary
FROM employees AS e
WHERE (
  SELECT COUNT(*)
  FROM employees AS e2
  WHERE e2.department = e.department
    AND e2.salary > e.salary        -- correlated: employees with higher salary
) < 2                               -- fewer than 2 people earn more → top 2
ORDER BY e.department, e.salary DESC;`}
        height={220}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Same result — window function version (cleaner, faster)
SELECT employee, department, salary
FROM (
  SELECT
    first_name || ' ' || last_name AS employee,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
  FROM employees
) AS ranked
WHERE dept_rank <= 2
ORDER BY department, salary DESC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="When Correlated Subqueries Are the Best Choice" />

      <P>Despite their performance limitations, correlated subqueries remain the clearest solution for certain patterns. Knowing when to keep them versus rewriting them is as important as knowing how to rewrite them.</P>

      <H>EXISTS/NOT EXISTS — always use correlated subquery</H>
      <P>For existence checks, EXISTS with a correlated subquery is the correct, most efficient, and most readable approach. There is no better alternative — JOIN to check existence can produce fan-out, and NOT IN has NULL problems. EXISTS short-circuits on the first match, making it efficient even for large tables when matches are common.</P>

      <H>Complex multi-column correlation — hard to express as JOIN</H>

      <SQLPlayground
        initialQuery={`-- Orders where this customer's spend is above average
-- AND the store's delivery time is below the store's average
-- Complex two-condition correlation — cleaner as correlated subquery
SELECT
  o.order_id,
  o.customer_id,
  o.store_id,
  o.total_amount,
  o.delivery_date - o.order_date AS delivery_days
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND o.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.customer_id = o.customer_id  -- correlated on customer
      AND o2.order_status = 'Delivered'
  )
  AND o.delivery_date - o.order_date < (
    SELECT AVG(o3.delivery_date - o3.order_date)
    FROM orders AS o3
    WHERE o3.store_id = o.store_id        -- correlated on store
      AND o3.order_status = 'Delivered'
      AND o3.delivery_date IS NOT NULL
  )
ORDER BY o.total_amount DESC;`}
        height={275}
        showSchema={false}
      />

      <H>Single-use computed values that would require multiple CTEs</H>
      <P>When a computed value is used exactly once and the correlated subquery is short, keeping it inline is often cleaner than adding a CTE. The readability benefit of naming the CTE is outweighed by the structural overhead when the computation is simple.</P>

      <ProTip>
        The signal to replace a correlated subquery with a JOIN or window function: when you run EXPLAIN ANALYZE and see the inner query executing thousands or millions of times, or when query time is measured in seconds rather than milliseconds on a medium-sized table. For the day-to-day analytical queries on FreshCart's 30-row playground data, correlated subqueries are perfectly fine and often clearest. The rewrite matters when the table has millions of rows.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a senior data analyst at PhonePe. The fraud team needs to identify merchants showing unusual transaction patterns — specifically merchants whose average transaction value this month is more than 2 standard deviations above their own historical average. This is a classic "each merchant vs their own baseline" correlated problem — the baseline is specific to each merchant, not a global average.</P>

      <TimeBlock time="2:00 PM" label="Fraud pattern definition">
        Flag merchants where current month average transaction {'>'} historical average + (2 × historical standard deviation). Adapted for FreshCart: flag stores where February average order value exceeds their January average by more than 2 standard deviations of their January orders.
      </TimeBlock>

      <TimeBlock time="2:20 PM" label="Step 1 — verify the correlated logic on a small example">
        Before writing the full query, test the correlation pattern on one store to confirm the logic.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- For store ST001: what is their Jan baseline?
SELECT
  ROUND(AVG(total_amount), 2)    AS jan_avg,
  ROUND(STDDEV(total_amount), 2) AS jan_stddev,
  ROUND(AVG(total_amount) + 2 * STDDEV(total_amount), 2) AS threshold
FROM orders
WHERE store_id     = 'ST001'
  AND order_status = 'Delivered'
  AND EXTRACT(MONTH FROM order_date) = 1
  AND EXTRACT(YEAR  FROM order_date) = 2024;`}
        height={165}
        showSchema={true}
      />

      <TimeBlock time="2:35 PM" label="Step 2 — build the full correlated query">
        Scale to all stores with the correlated subquery pattern.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Flag stores whose Feb avg order exceeds Jan avg + 2 × Jan stddev
WITH feb_stats AS (
  SELECT
    store_id,
    ROUND(AVG(total_amount), 2)   AS feb_avg,
    COUNT(*)                      AS feb_orders
  FROM orders
  WHERE order_status = 'Delivered'
    AND EXTRACT(MONTH FROM order_date) = 2
    AND EXTRACT(YEAR  FROM order_date) = 2024
  GROUP BY store_id
)
SELECT
  f.store_id,
  s.city,
  f.feb_avg,
  f.feb_orders,
  ROUND((
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.store_id     = f.store_id     -- correlated on store_id
      AND o2.order_status = 'Delivered'
      AND EXTRACT(MONTH FROM o2.order_date) = 1
      AND EXTRACT(YEAR  FROM o2.order_date) = 2024
  ), 2)                                     AS jan_avg,
  ROUND((
    SELECT STDDEV(o3.total_amount)
    FROM orders AS o3
    WHERE o3.store_id     = f.store_id     -- correlated on store_id
      AND o3.order_status = 'Delivered'
      AND EXTRACT(MONTH FROM o3.order_date) = 1
      AND EXTRACT(YEAR  FROM o3.order_date) = 2024
  ), 2)                                     AS jan_stddev,
  CASE
    WHEN f.feb_avg > (
      SELECT AVG(o4.total_amount) + 2 * STDDEV(o4.total_amount)
      FROM orders AS o4
      WHERE o4.store_id     = f.store_id   -- correlated
        AND o4.order_status = 'Delivered'
        AND EXTRACT(MONTH FROM o4.order_date) = 1
        AND EXTRACT(YEAR  FROM o4.order_date) = 2024
    ) THEN '⚠ FLAGGED'
    ELSE '✓ Normal'
  END                                       AS anomaly_status
FROM feb_stats AS f
JOIN stores AS s ON f.store_id = s.store_id
ORDER BY anomaly_status DESC, f.feb_avg DESC;`}
        height={340}
        showSchema={false}
      />

      <TimeBlock time="3:10 PM" label="Fraud flags delivered">
        The query flags stores whose February average order value is statistically anomalous relative to their January baseline. Each store's threshold is personalised — not a global average. The correlated subquery is the right tool here: the baseline is unique to each store, the table is small enough that performance is not a concern, and the pattern is clearest expressed as "for each store, compute its own historical baseline."
      </TimeBlock>

      <ProTip>
        Anomaly detection — "is this entity's current metric statistically unusual relative to its own history?" — is one of the strongest use cases for correlated subqueries. The historical baseline is entity-specific, making it a natural correlated pattern. On large tables (millions of merchants, billions of transactions), this would be rewritten using window functions or pre-computed baseline CTEs. At FreshCart's scale, the correlated version is perfectly readable and fast.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a correlated subquery and how does it execute differently from a non-correlated subquery?">
        <p style={{ margin: '0 0 14px' }}>A correlated subquery references a column from the outer query in its WHERE clause (or other clauses). This creates a dependency on the outer query's current row — the subquery cannot be evaluated independently because it needs the current outer row's values to execute. A non-correlated subquery is entirely self-contained; it executes once and produces a fixed result that the outer query reuses for every row.</p>
        <p style={{ margin: '0 0 14px' }}>The execution difference is fundamental. A non-correlated subquery: execute inner query once → cache result → outer query uses the cached result for every row it evaluates. One inner execution total. A correlated subquery: for each outer row → substitute outer row's column values into the inner query → execute inner query → use the result for this specific outer row → move to next outer row → repeat. N inner executions for N outer rows.</p>
        <p style={{ margin: 0 }}>This execution model makes correlated subqueries O(n) in the number of outer rows — one inner execution per outer row. If the inner query is itself expensive (full table scan, complex join), total cost is O(n × inner_cost), which becomes O(n²) when the inner query scans the same table as the outer. For small tables this is unimportant. For large production tables with millions of rows, this is the difference between a 100ms query and a 10-minute query. The solution for large tables is to rewrite the correlated pattern as a JOIN to a pre-aggregated derived table or a window function — both compute the aggregate once rather than once per outer row.</p>
      </IQ>

      <IQ q="How do you rewrite a correlated subquery as a JOIN for better performance?">
        <p style={{ margin: '0 0 14px' }}>The rewrite follows a consistent pattern. Identify what the correlated subquery computes — typically an aggregate (AVG, MAX, MIN, COUNT) per group defined by the correlation column. Move that computation into a standalone derived table or CTE that groups by the correlation column. Then JOIN the outer query to that derived table on the correlation column.</p>
        <p style={{ margin: '0 0 14px' }}>Example: SELECT * FROM products AS p WHERE p.unit_price {'>'} (SELECT AVG(p2.unit_price) FROM products p2 WHERE p2.category = p.category). The correlated subquery computes the average price per category, once per product row. Rewrite: compute category averages once in a derived table: (SELECT category, AVG(unit_price) AS cat_avg FROM products GROUP BY category) AS cat_avgs. Then join: SELECT p.* FROM products AS p JOIN cat_avgs ON p.category = cat_avgs.category WHERE p.unit_price {'>'} cat_avgs.cat_avg.</p>
        <p style={{ margin: 0 }}>The performance improvement: the derived table computes one AVG per category (say 8 categories → 8 aggregations). The correlated version computes one AVG per product row (say 50 products → 50 aggregations, each scanning 50 rows → 2,500 total row operations). The JOIN version: 50 rows for the aggregation + 50 rows for the outer query = 100 total row operations. For 1 million products across 100 categories: correlated = 10^12 operations, JOIN = ~2,000,000 operations. The JOIN is orders of magnitude faster. This same rewrite pattern applies to any correlated aggregate: compute the aggregate per group in a derived table, join the outer query to it.</p>
      </IQ>

      <IQ q="When should you use EXISTS vs IN vs LEFT JOIN IS NULL for checking whether a related row exists?">
        <p style={{ margin: '0 0 14px' }}>These three approaches solve the same problem — finding rows in one table that do or do not have a matching row in another — but with different semantics, NULL behaviour, and performance characteristics.</p>
        <p style={{ margin: '0 0 14px' }}>EXISTS (and NOT EXISTS) is the preferred general-purpose approach. It is semantically clear ("does at least one related row exist?"), always NULL-safe, and short-circuits on the first match — stopping the inner scan as soon as one matching row is found. This makes it very efficient when matches are common. NOT EXISTS is the safest anti-join pattern — it correctly handles NULL values in the correlated column, unlike NOT IN. Use EXISTS/NOT EXISTS as the default for existence checks.</p>
        <p style={{ margin: '0 0 14px' }}>IN (and NOT IN) is readable for small fixed lists (IN (1, 2, 3)) and reasonable for small subquery results. NOT IN is dangerous: if the subquery returns any NULL value, NOT IN returns zero rows for every outer row — a silent correctness bug. Only use NOT IN when you are certain the subquery column cannot contain NULLs, ideally enforced by a NOT NULL constraint.</p>
        <p style={{ margin: 0 }}>LEFT JOIN + WHERE IS NULL is the anti-join alternative — functionally equivalent to NOT EXISTS for non-NULL cases. It is familiar to analysts who think in terms of JOINs and allows selecting right-table columns in the result (EXISTS cannot). On large tables, the query optimiser typically converts both NOT EXISTS and LEFT JOIN IS NULL to the same physical anti-join plan, making their performance equivalent. Choose based on readability: EXISTS if you want to express existence semantics explicitly; LEFT JOIN IS NULL if you are already in a JOIN-heavy query and consistency matters.</p>
      </IQ>

      <IQ q="What is the difference between a correlated subquery and a window function for computing per-group aggregates?">
        <p style={{ margin: '0 0 14px' }}>Both correlated subqueries and window functions compute an aggregate value per group for each row — for example, the department average salary shown alongside each employee's salary. But they work very differently at the execution level and have different performance characteristics.</p>
        <p style={{ margin: '0 0 14px' }}>A correlated subquery executes separately for each outer row. For 1,000 employees across 20 departments, it runs 1,000 subquery executions — one per employee — even though there are only 20 distinct department averages to compute. A window function (AVG(salary) OVER (PARTITION BY department)) makes a single pass through the data, computes all department averages simultaneously, and attaches the correct average to each row. One pass for all 1,000 employees regardless of group count.</p>
        <p style={{ margin: 0 }}>Window functions are almost always faster for per-group aggregate computations. They are also more composable — you can compute multiple window functions in the same SELECT without multiple subquery executions: SELECT salary, AVG(salary) OVER (PARTITION BY dept) AS dept_avg, MAX(salary) OVER (PARTITION BY dept) AS dept_max, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank FROM employees. Three group-level computations in one pass. The equivalent with correlated subqueries requires three separate subquery executions per row. The limitation of window functions: they cannot be used in WHERE directly (only in a wrapping subquery or CTE) and they require database support (all major databases support them today). Correlated subqueries in WHERE remain more natural for filtering based on group conditions when window functions are not available or when the logic is clearest expressed as a row-level existence check.</p>
      </IQ>

      <IQ q="How would you find the most recent order for each customer using a correlated subquery?">
        <p style={{ margin: '0 0 14px' }}>The most recent order per customer requires finding, for each customer, the order whose date equals the maximum order date among all orders for that customer. The correlated subquery pattern: SELECT * FROM orders AS o WHERE o.order_date = (SELECT MAX(o2.order_date) FROM orders AS o2 WHERE o2.customer_id = o.customer_id). For each order row in the outer query, the subquery computes the maximum order date for that order's customer — if the current order's date equals that maximum, it is the most recent.</p>
        <p style={{ margin: '0 0 14px' }}>This works but executes once per order row. For a customer with 10 orders, the subquery runs 10 times — each time returning the same MAX date — and only the one matching order survives. Better approaches for scale: JOIN to a derived table of max dates: FROM orders AS o JOIN (SELECT customer_id, MAX(order_date) AS max_date FROM orders GROUP BY customer_id) AS latest ON o.customer_id = latest.customer_id AND o.order_date = latest.max_date. Or DISTINCT ON (PostgreSQL): SELECT DISTINCT ON (customer_id) * FROM orders ORDER BY customer_id, order_date DESC.</p>
        <p style={{ margin: 0 }}>The cleanest modern approach uses window functions: SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) AS ranked WHERE rn = 1. ROW_NUMBER() assigns rank 1 to the most recent order per customer — a single pass through the data. This is the "top N per group" pattern that window functions handle cleanly and efficiently. For the specific case of "most recent one record per group," DISTINCT ON in PostgreSQL is often the most concise: SELECT DISTINCT ON (customer_id) customer_id, order_id, order_date, total_amount FROM orders ORDER BY customer_id, order_date DESC — this returns exactly one row per customer, the one with the latest order_date.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Correlated subquery returns NULL for some outer rows — result is missing or wrong"
        cause="The correlated subquery returns NULL when no rows match the correlation condition. This happens when an outer row's correlated column value does not appear in the inner table — for example, a customer with no orders produces NULL from (SELECT AVG(total_amount) FROM orders WHERE customer_id = c.customer_id). Comparing the outer column to NULL (col > NULL) evaluates to NULL, which WHERE discards — the outer row disappears from the result."
        fix="Handle the NULL with COALESCE: WHERE col > COALESCE((SELECT AVG(...) ...), 0). Or use IS NOT NULL to exclude outer rows where the subquery returns NULL: AND (SELECT AVG(...) ...) IS NOT NULL. Or change the logic to EXISTS if the intent is to check whether the related record exists at all. Decide which is semantically correct: should rows with no correlated data be included (COALESCE) or excluded (natural NULL filtering)?"
      />

      <Err
        msg="Correlated subquery returns multiple rows — error: subquery used as an expression"
        cause="The correlated subquery in SELECT or WHERE with = is returning more than one row. A correlated subquery in SELECT or with = must return exactly one row — it is expected to be a scalar. If the correlation is on a non-unique column, multiple rows may match and the subquery returns multiple values, violating the scalar requirement."
        fix="Add an aggregate to force exactly one row: = (SELECT MAX(...) ... WHERE ...) or = (SELECT MIN(...) ...). If multiple matching rows are intentionally valid, use IN instead of =: WHERE col IN (SELECT ... WHERE correlation). Or add LIMIT 1 with ORDER BY if you want the top matching row: = (SELECT val FROM ... WHERE ... ORDER BY col DESC LIMIT 1). If the multiple rows represent a one-to-many relationship, a JOIN may be more appropriate than a scalar subquery."
      />

      <Err
        msg="Correlated subquery is slow — query takes 5 minutes on a 100,000-row table"
        cause="The correlated subquery executes once per outer row — 100,000 executions for 100,000 outer rows. Each inner execution may scan a large portion of the inner table. Total work: 100,000 × inner_scan_cost. If the inner table has no index on the correlated column (the join key), each inner execution is a full table scan, making total cost O(n²)."
        fix="First: add an index on the correlated column in the inner table. CREATE INDEX ON orders(customer_id) — this makes each inner execution an index lookup rather than a full scan. Second: rewrite as a JOIN to a pre-aggregated derived table — compute the aggregate once per group, then JOIN. Third: rewrite as a window function for per-group aggregates — single pass through the data. Use EXPLAIN ANALYZE to see the current execution plan and verify the rewrite improvement."
      />

      <Err
        msg="EXISTS subquery always returns TRUE — filtering has no effect"
        cause="The EXISTS subquery is missing its correlated condition — the WHERE clause inside EXISTS does not reference the outer query's table. EXISTS (SELECT 1 FROM orders) without a WHERE that links to the outer row simply checks whether the orders table has any rows at all — which is always TRUE if the table is non-empty. The result is that EXISTS is always TRUE for every outer row, making the WHERE EXISTS filter a no-op."
        fix="Add the correlated condition: WHERE EXISTS (SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id). The inner WHERE must reference the outer alias (c.customer_id) to make the subquery dependent on the current outer row. To verify, temporarily change EXISTS to a SELECT * and add the correlated condition — the result should vary by outer row, returning different rows for different customers."
      />

      <Err
        msg="NOT EXISTS returns all rows — the anti-join filter is not excluding anything"
        cause="The NOT EXISTS correlated condition is too broad or inverted. A common mistake: NOT EXISTS (SELECT 1 FROM orders WHERE customer_id IS NOT NULL) — this checks whether any order exists with any non-NULL customer_id, which is always TRUE (there are always orders), so NOT EXISTS is always FALSE and no rows are returned — or worse, the condition is never satisfied. Another mistake: using the wrong column in the correlation."
        fix="Verify the correlated condition links specifically to the outer row: NOT EXISTS (SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id). The correlation must use the outer row's specific value — not a generic condition. Test by temporarily changing NOT EXISTS to EXISTS and verifying it returns the correct rows (the ones you want to exclude). Then flip back to NOT EXISTS. Also confirm column names and aliases are correctly prefixed."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write three separate queries using correlated subqueries: (1) Find all orders where the total_amount is above the average total_amount for orders from the same store. Show order_id, store_id, total_amount, and the store's average as store_avg_amount. Only include delivered orders. (2) Find all customers who have placed at least one order in every month that has order data (i.e., they ordered in January AND February 2024). Use a correlated EXISTS or NOT EXISTS approach. Show customer_id and full name. (3) Find each product along with the count of other products in the same category that are cheaper than it (cheaper_in_category count). Show product_name, category, unit_price, and cheaper_in_category. Sort by category then cheaper_in_category descending."
        hint="Query 1: correlated AVG in WHERE. Query 2: NOT EXISTS approach — find customers where NOT EXISTS a month with no order. Query 3: correlated COUNT in SELECT — count products in same category with lower price, using p2.product_id != p.product_id to exclude self."
        answer={`-- Query 1: Orders above their store's average
SELECT
  o.order_id,
  o.store_id,
  o.total_amount,
  ROUND((
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.store_id     = o.store_id
      AND o2.order_status = 'Delivered'
  ), 2)                              AS store_avg_amount
FROM orders AS o
WHERE o.order_status = 'Delivered'
  AND o.total_amount > (
    SELECT AVG(o2.total_amount)
    FROM orders AS o2
    WHERE o2.store_id     = o.store_id
      AND o2.order_status = 'Delivered'
  )
ORDER BY o.store_id, o.total_amount DESC;

-- Query 2: Customers who ordered in BOTH Jan and Feb 2024
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS full_name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND EXTRACT(MONTH FROM o.order_date) = 1
    AND EXTRACT(YEAR  FROM o.order_date) = 2024
)
AND EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND EXTRACT(MONTH FROM o.order_date) = 2
    AND EXTRACT(YEAR  FROM o.order_date) = 2024
)
ORDER BY c.customer_id;

-- Query 3: Each product with count of cheaper products in same category
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  (
    SELECT COUNT(*)
    FROM products AS p2
    WHERE p2.category   = p.category       -- same category
      AND p2.unit_price < p.unit_price     -- cheaper
      AND p2.product_id <> p.product_id   -- not itself
  )                                        AS cheaper_in_category
FROM products AS p
ORDER BY p.category, cheaper_in_category DESC;`}
        explanation="Query 1 uses a correlated AVG in both SELECT (to display the store average) and WHERE (to filter). The two subqueries are identical — in production this would be rewritten as a JOIN to avoid the double computation. Query 2 uses two separate EXISTS checks — one per month — both correlated on customer_id. This is more readable than NOT EXISTS over a set of months, and since FreshCart only has two months of data, two EXISTS is clean and correct. A more general approach for 'ordered in every month' uses NOT EXISTS (SELECT 1 FROM months WHERE NOT EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id AND month = m.month)) but that is overkill for two months. Query 3 uses a correlated COUNT in SELECT — for each product, count how many other products in the same category have a lower price. The p2.product_id <> p.product_id condition excludes the product from counting itself. This produces a natural ranking: the product with the most cheaper alternatives has the highest rank in its category."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A correlated subquery references a column from the outer query. It executes once per outer row — N executions for N outer rows — unlike non-correlated subqueries which execute once.',
          'The correlation link is always a WHERE condition inside the subquery that references the outer table\'s alias: WHERE inner.col = outer.col. Without this link, the subquery is non-correlated.',
          'Performance cost: O(n) inner executions for O(n) outer rows. With a full table scan per inner execution, total cost is O(n²) — exponentially worse than a JOIN at scale.',
          'For large tables: replace correlated aggregates (AVG, MAX, COUNT per group) with a JOIN to a pre-aggregated derived table or CTE. Compute the aggregate once per group, not once per outer row.',
          'Window functions replace most correlated aggregate patterns with a single-pass computation: AVG(salary) OVER (PARTITION BY department) replaces SELECT AVG(...) FROM ... WHERE dept = outer.dept.',
          'EXISTS and NOT EXISTS are the correct tools for existence checks. They short-circuit on the first match (efficient), are NULL-safe, and have no alternative when checking "does at least one related row exist?".',
          'NOT EXISTS is the safe alternative to NOT IN — NOT IN silently returns zero rows when the subquery contains NULLs. NOT EXISTS never has this problem.',
          'Correlated subqueries remain the best choice for: EXISTS/NOT EXISTS checks, complex multi-column correlations that are hard to express as JOINs, and row-level anomaly detection against entity-specific baselines.',
          'Always test correlated subquery results by running the inner query manually with a specific outer row value — verify it returns what you expect before trusting the full query output.',
          'Nesting correlated subqueries (correlated subquery inside a correlated subquery) creates O(n³) or worse performance. Refactor to CTEs or window functions before this becomes necessary.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 38</strong>, you learn EXISTS and NOT EXISTS in full depth — every pattern, performance analysis, and the complete comparison against IN, NOT IN, and LEFT JOIN IS NULL for every anti-join scenario.
        </p>
        <Link href="/learn/sql/exists-not-exists" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 38 → EXISTS and NOT EXISTS
        </Link>
      </div>

    </LearnLayout>
  );
}