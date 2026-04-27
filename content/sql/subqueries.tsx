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

const SubCard = ({ type, color, where, returns, use }: {
  type: string; color: string; where: string; returns: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{type}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Appears in</p>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color, margin: 0 }}>{where}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Returns</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{returns}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use for</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{use}</p>
      </div>
    </div>
  </div>
);

export default function Subqueries() {
  return (
    <LearnLayout
      title="Subqueries"
      description="Queries inside queries — scalar subqueries in SELECT, subqueries in WHERE and FROM, correlated subqueries, and when to use each type versus a JOIN or CTE"
      section="SQL — Module 36"
      readTime="38 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a Subquery Is" />

      <P>A subquery is a SELECT statement nested inside another SQL statement. The outer query treats the subquery's result as if it were a table, a single value, or a list — depending on where the subquery appears and what it returns. The database executes the inner query first, then uses the result to evaluate the outer query.</P>

      <P>Subqueries solve a specific class of problem: queries that need data computed from one query in order to filter, compute, or define the scope of another. They are the mechanism for <Hl>composing queries</Hl> — building complex analysis from simpler pieces. Understanding where subqueries can appear and what each placement means is the entire substance of this module.</P>

      <CodeBlock
        label="Subquery anatomy"
        code={`-- Outer query
SELECT customer_id, first_name, total_amount
FROM orders
WHERE total_amount > (
  -- Inner query (subquery) — executes first
  SELECT AVG(total_amount)
  FROM orders
  WHERE order_status = 'Delivered'
);
-- The subquery returns a single number (the average)
-- The outer query compares each row's total_amount to that number`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Four Subquery Types" />

      <SubCard
        type="Scalar subquery"
        color={C}
        where="SELECT clause, WHERE clause, HAVING clause"
        returns="Exactly one row, one column — a single value"
        use="Compare a column to a computed aggregate (avg, max, min). Add a computed metric to each row."
      />
      <SubCard
        type="Row subquery"
        color="#10b981"
        where="WHERE clause with = or IN"
        returns="Exactly one row, multiple columns"
        use="Match a row against a tuple of values from another query."
      />
      <SubCard
        type="Table subquery (derived table)"
        color="#f97316"
        where="FROM clause — after FROM or JOIN"
        returns="Multiple rows and columns — a virtual table"
        use="Pre-aggregate, pre-filter, or transform data before the outer query joins or filters it."
      />
      <SubCard
        type="Correlated subquery"
        color="#8b5cf6"
        where="WHERE, SELECT, or HAVING — references outer query"
        returns="One value per outer row — runs once per outer row"
        use="Row-level comparison against an aggregate computed for that specific row's group."
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Scalar Subquery in WHERE — Compare to a Computed Value" />

      <P>The most common subquery type: a subquery in WHERE that returns a single value. The outer query compares each row against that value. This is the pattern for "find rows where the value is above/below the overall average" — a question that cannot be answered with a simple WHERE condition because the average is computed from the data being filtered.</P>

      <H>Orders above the average order value</H>

      <SQLPlayground
        initialQuery={`-- Find orders above the overall average order value
-- The subquery computes the average; the outer query filters rows
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status,
  c.first_name || ' ' || c.last_name  AS customer
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.total_amount > (
  SELECT AVG(total_amount)
  FROM orders
  WHERE order_status = 'Delivered'
)
ORDER BY o.total_amount DESC;`}
        height={230}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products priced above the average price in their own category
-- The subquery uses a correlated reference — covered in Part 07
-- This version uses a scalar subquery for the overall average
SELECT
  product_name,
  category,
  unit_price,
  ROUND(unit_price - (SELECT AVG(unit_price) FROM products), 2) AS above_avg_by
FROM products
WHERE unit_price > (SELECT AVG(unit_price) FROM products)
ORDER BY above_avg_by DESC;`}
        height={195}
        showSchema={false}
      />

      <H>Scalar subquery in SELECT — add a computed reference to every row</H>

      <SQLPlayground
        initialQuery={`-- Show each order's total_amount alongside the overall average
-- and the difference between the two
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  ROUND((SELECT AVG(total_amount) FROM orders
         WHERE order_status = 'Delivered'), 2)   AS overall_avg,
  ROUND(o.total_amount -
        (SELECT AVG(total_amount) FROM orders
         WHERE order_status = 'Delivered'), 2)   AS vs_avg
FROM orders AS o
WHERE o.order_status = 'Delivered'
ORDER BY vs_avg DESC
LIMIT 10;`}
        height={230}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Each product with its price and the category's average price
-- Uses a scalar subquery in SELECT (correlated — runs per row)
SELECT
  product_id,
  product_name,
  category,
  unit_price,
  ROUND((
    SELECT AVG(p2.unit_price)
    FROM products AS p2
    WHERE p2.category = p.category
  ), 2)                                   AS category_avg_price,
  ROUND(unit_price - (
    SELECT AVG(p2.unit_price)
    FROM products AS p2
    WHERE p2.category = p.category
  ), 2)                                   AS vs_category_avg
FROM products AS p
ORDER BY category, vs_category_avg DESC;`}
        height={245}
        showSchema={false}
      />

      <Callout type="info">
        A scalar subquery in SELECT that references the outer query (like the category example above) is a correlated scalar subquery. It executes once per row in the outer query — if the outer query has 100 rows, the subquery runs 100 times. This is correct but can be slow for large tables. A JOIN to a pre-aggregated subquery or a window function is usually more efficient for the same result.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Subquery with IN — Filter Against a List" />

      <P>A subquery after IN returns a list of values. The outer query keeps rows where the column matches any value in that list. This is the multi-value version of the scalar subquery — instead of one comparison value, IN provides many.</P>

      <SQLPlayground
        initialQuery={`-- Orders placed by customers from metro cities
-- Subquery returns a list of customer_ids from metro cities
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status
FROM orders AS o
WHERE o.customer_id IN (
  SELECT customer_id
  FROM customers
  WHERE city IN ('Seattle', 'New York', 'Delhi', 'Austin', 'Chicago')
)
ORDER BY o.total_amount DESC
LIMIT 10;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products that appear in at least one delivered order
-- Subquery returns all product_ids from delivered orders
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
WHERE p.product_id IN (
  SELECT DISTINCT oi.product_id
  FROM order_items AS oi
  JOIN orders AS o ON oi.order_id = o.order_id
  WHERE o.order_status = 'Delivered'
)
ORDER BY p.category, p.unit_price DESC;`}
        height={210}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Stores that have delivered more than 3 orders
-- Subquery identifies qualifying store IDs
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target
FROM stores AS s
WHERE s.store_id IN (
  SELECT store_id
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
  HAVING COUNT(*) > 3
)
ORDER BY s.city;`}
        height={210}
        showSchema={false}
      />

      <H>NOT IN — exclude rows matching the list</H>

      <SQLPlayground
        initialQuery={`-- Products that have NEVER been ordered
-- NOT IN: products whose product_id is not in any order_items row
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  p.in_stock
FROM products AS p
WHERE p.product_id NOT IN (
  SELECT DISTINCT product_id
  FROM order_items
)
ORDER BY p.category, p.unit_price DESC;`}
        height={205}
        showSchema={false}
      />

      <Callout type="warning">
        NOT IN is dangerous when the subquery can return NULL values. NOT IN (1, 2, NULL) returns no rows for any comparison — because col = NULL evaluates to NULL, making the entire NOT IN condition NULL. Always add WHERE subquery_column IS NOT NULL inside the subquery when using NOT IN, or use NOT EXISTS instead.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Subquery in FROM — Derived Tables" />

      <P>A subquery in the FROM clause is called a <Hl>derived table</Hl> or inline view. The outer query treats it exactly like a regular table — it can be joined, filtered, grouped, and sorted. Derived tables are essential for multi-step analytical queries where an intermediate aggregation must be computed before the outer query can use it.</P>

      <H>Pre-aggregate then join</H>

      <SQLPlayground
        initialQuery={`-- Average order value per store, joined back to store details
-- The derived table computes per-store aggregates
-- The outer query joins store details to the aggregated result
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  store_stats.order_count,
  store_stats.avg_order_value,
  store_stats.total_revenue,
  ROUND(store_stats.total_revenue / s.monthly_target * 100, 1) AS target_pct
FROM stores AS s
JOIN (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(AVG(total_amount), 2)  AS avg_order_value,
    ROUND(SUM(total_amount), 2)  AS total_revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS store_stats ON s.store_id = store_stats.store_id
ORDER BY total_revenue DESC;`}
        height={265}
        showSchema={true}
      />

      <H>Filter before joining — reduce rows early</H>

      <SQLPlayground
        initialQuery={`-- Join only Platinum customers' delivered orders
-- Pre-filter in a derived table before joining to order_items
SELECT
  plat.first_name || ' ' || plat.last_name  AS customer,
  plat.city,
  o.order_id,
  o.order_date,
  o.total_amount
FROM (
  SELECT customer_id, first_name, last_name, city
  FROM customers
  WHERE loyalty_tier = 'Platinum'
) AS plat
JOIN orders AS o
  ON plat.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
ORDER BY o.total_amount DESC;`}
        height={240}
        showSchema={false}
      />

      <H>Two-level aggregation — aggregate an aggregate</H>

      <SQLPlayground
        initialQuery={`-- Average of per-store average order values
-- (average of averages — requires two levels of aggregation)
SELECT
  ROUND(AVG(store_avg), 2)    AS avg_of_store_avgs,
  MIN(store_avg)              AS lowest_store_avg,
  MAX(store_avg)              AS highest_store_avg
FROM (
  SELECT
    store_id,
    ROUND(AVG(total_amount), 2) AS store_avg
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS store_averages;`}
        height={195}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customer segments: high-value customers (top 25% by spend)
-- Step 1: compute each customer's total spend (inner query)
-- Step 2: compute the 75th percentile threshold (middle query)
-- Step 3: filter customers above that threshold (outer query)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.loyalty_tier,
  cust_spend.total_spend
FROM customers AS c
JOIN (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS cust_spend ON c.customer_id = cust_spend.customer_id
WHERE cust_spend.total_spend >= (
  SELECT PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_spend)
  FROM (
    SELECT customer_id, SUM(total_amount) AS total_spend
    FROM orders WHERE order_status = 'Delivered'
    GROUP BY customer_id
  ) AS spend_distribution
)
ORDER BY cust_spend.total_spend DESC;`}
        height={300}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Subquery in HAVING — Filter Groups by Computed Values" />

      <SQLPlayground
        initialQuery={`-- Stores whose revenue exceeds the average store revenue
-- The subquery computes the average; HAVING filters groups above it
SELECT
  store_id,
  COUNT(*)                     AS order_count,
  ROUND(SUM(total_amount), 2)  AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
HAVING SUM(total_amount) > (
  -- Average revenue per store
  SELECT AVG(store_rev)
  FROM (
    SELECT store_id, SUM(total_amount) AS store_rev
    FROM orders
    WHERE order_status = 'Delivered'
    GROUP BY store_id
  ) AS store_revenues
)
ORDER BY revenue DESC;`}
        height={245}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product categories where average margin exceeds overall average margin
SELECT
  category,
  COUNT(*)                                                     AS product_count,
  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 1) AS avg_margin_pct
FROM products
GROUP BY category
HAVING AVG((unit_price - cost_price) / unit_price * 100) > (
  SELECT AVG((unit_price - cost_price) / unit_price * 100)
  FROM products
)
ORDER BY avg_margin_pct DESC;`}
        height={205}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Correlated Subquery — Runs Once Per Outer Row" />

      <P>A correlated subquery references a column from the outer query. This means it cannot be evaluated independently — it must be re-executed for each row of the outer query, with the outer row's values substituted into the subquery. The result is one value per outer row.</P>

      <P>Correlated subqueries are powerful but can be slow on large tables — they execute N times for N outer rows. For performance-critical queries, a JOIN or window function often provides the same result more efficiently. Use correlated subqueries when the logic is clearest expressed as "for each row, compute X from related rows."</P>

      <H>Each employee compared to their department average</H>

      <SQLPlayground
        initialQuery={`-- Each employee with their salary and department average
-- Correlated subquery: for each employee row, compute
-- the average salary for employees in the SAME department
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name   AS employee,
  e.department,
  e.salary,
  ROUND((
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.department = e.department  -- references outer row's department
  ), 0)                                AS dept_avg_salary,
  ROUND(e.salary - (
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.department = e.department
  ), 0)                                AS vs_dept_avg
FROM employees AS e
ORDER BY e.department, e.salary DESC;`}
        height={255}
        showSchema={true}
      />

      <H>Each product vs its category's max price</H>

      <SQLPlayground
        initialQuery={`-- Each product's price vs the maximum price in its category
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  (
    SELECT MAX(p2.unit_price)
    FROM products AS p2
    WHERE p2.category = p.category   -- correlated: matches outer row's category
  )                                   AS category_max_price,
  ROUND(
    (SELECT MAX(p2.unit_price) FROM products AS p2
     WHERE p2.category = p.category) - p.unit_price
  , 2)                                AS below_max_by
FROM products AS p
ORDER BY p.category, p.unit_price DESC;`}
        height={240}
        showSchema={false}
      />

      <H>Correlated subquery in WHERE — the EXISTS pattern</H>

      <SQLPlayground
        initialQuery={`-- Customers who have at least one order above ₹1,000
-- EXISTS: stops as soon as the first matching row is found (efficient)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id    -- correlated
    AND o.total_amount > 1000
    AND o.order_status = 'Delivered'
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={220}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Stores that have at least one employee
-- EXISTS vs IN: EXISTS short-circuits on first match, often faster
SELECT
  s.store_id,
  s.store_name,
  s.city
FROM stores AS s
WHERE EXISTS (
  SELECT 1
  FROM employees AS e
  WHERE e.store_id = s.store_id    -- correlated: checks this specific store
)
ORDER BY s.city;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="EXISTS and NOT EXISTS — Existence Checks" />

      <P>EXISTS returns TRUE if the subquery returns at least one row, FALSE if it returns no rows. It is the cleanest way to check whether a related record exists, and it <Hl>short-circuits</Hl> — the database stops scanning as soon as the first matching row is found, making it very efficient for existence checks.</P>

      <CodeBlock
        label="EXISTS vs IN — when to prefer each"
        code={`-- EXISTS: efficient, NULL-safe, semantically clear
-- Use for existence checks — "does at least one related row exist?"
WHERE EXISTS (
  SELECT 1           -- SELECT 1 is conventional — column content irrelevant
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.total_amount > 1000
)

-- IN: readable, good for fixed lists and small subquery results
-- Problematic with NULLs in the subquery result
WHERE customer_id IN (
  SELECT customer_id FROM orders WHERE total_amount > 1000
)

-- Both return the same rows for non-NULL values
-- Prefer EXISTS for large subquery results or when NULLs are possible
-- Prefer IN for small fixed value lists (IN (1, 2, 3)) or readable code`}
      />

      <SQLPlayground
        initialQuery={`-- NOT EXISTS: customers who have NO orders at all
-- NULL-safe alternative to LEFT JOIN IS NULL and NOT IN
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.joined_date
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
)
ORDER BY c.joined_date;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- NOT EXISTS: products that have never been ordered
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items AS oi
  WHERE oi.product_id = p.product_id
)
ORDER BY p.category, p.unit_price DESC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Subquery vs JOIN vs CTE — When to Use Each" />

      <P>Subqueries, JOINs, and CTEs often produce the same result. Choosing between them is about readability, performance, and reuse.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Approach', 'Best for', 'Avoid when', 'Performance'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Scalar subquery', 'Adding one computed value per row; simple threshold comparisons', 'Needs to reference multiple columns from the subquery; correlated over large tables', 'Fine for small tables; correlated versions can be O(n²)'],
              ['IN subquery', 'Filtering against a list computed from another table; readable anti-join with NOT IN', 'Subquery can return NULLs (use EXISTS instead); very large result lists', 'Good; optimiser often converts to JOIN internally'],
              ['Derived table (FROM subquery)', 'Pre-aggregation before joining; two-level aggregation; isolating complex logic', 'The same subquery is needed multiple times (use CTE); deep nesting degrades readability', 'Equivalent to CTE; may or may not be materialised by optimiser'],
              ['Correlated subquery', 'Row-level comparison against a group aggregate; EXISTS/NOT EXISTS checks', 'Large outer tables — runs once per row; better replaced by JOIN + GROUP BY or window function', 'Can be slow — O(n) subquery executions; optimiser sometimes rewrites to JOIN'],
              ['JOIN', 'Combining columns from multiple tables; most analytics queries; when the relationship is explicit', 'Single existence check (use EXISTS); when the relationship is aggregate-based', 'Usually fastest; uses indexes; optimiser has full plan flexibility'],
              ['CTE (WITH clause)', 'Complex multi-step logic; when the same subquery is referenced more than once; self-documenting named steps', 'Very simple one-use subqueries where inline is clearer', 'Equivalent to derived table; PostgreSQL materialises by default (MATERIALIZED hint available)'],
            ].map(([approach, best, avoid, perf], i) => (
              <tr key={approach} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{approach}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{best}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{avoid}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{perf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Rewriting a correlated subquery as a JOIN — performance improvement</H>

      <SQLPlayground
        initialQuery={`-- Correlated subquery version (runs AVG once per employee row)
SELECT
  e.first_name,
  e.department,
  e.salary,
  ROUND((SELECT AVG(e2.salary) FROM employees e2
         WHERE e2.department = e.department), 0) AS dept_avg
FROM employees AS e
ORDER BY e.department, e.salary DESC;`}
        height={175}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- JOIN version (computes AVG once per department — much faster at scale)
SELECT
  e.first_name,
  e.department,
  e.salary,
  da.dept_avg
FROM employees AS e
JOIN (
  SELECT department, ROUND(AVG(salary), 0) AS dept_avg
  FROM employees
  GROUP BY department
) AS da ON e.department = da.department
ORDER BY e.department, e.salary DESC;`}
        height={190}
        showSchema={false}
      />

      <P>Both produce identical results. The JOIN version computes the department average once per department (N_departments queries) rather than once per employee (N_employees queries). For a company with 10,000 employees across 20 departments, the JOIN version is 500x less work.</P>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Nested Subqueries — Subqueries Inside Subqueries" />

      <P>Subqueries can be nested — a subquery can itself contain a subquery. SQL has no theoretical limit on nesting depth, but readability degrades rapidly beyond two levels. When you find yourself writing a three-level nested subquery, it is almost always clearer as a CTE.</P>

      <SQLPlayground
        initialQuery={`-- Two-level nesting: orders from stores in the top half by revenue
SELECT
  o.order_id,
  o.store_id,
  o.total_amount,
  o.order_status
FROM orders AS o
WHERE o.store_id IN (
  -- Level 1: stores whose revenue is above the median store revenue
  SELECT store_id
  FROM (
    -- Level 2: per-store revenue totals
    SELECT store_id, SUM(total_amount) AS store_revenue
    FROM orders
    WHERE order_status = 'Delivered'
    GROUP BY store_id
  ) AS store_revs
  WHERE store_revenue >= (
    -- Level 3: median revenue
    SELECT AVG(store_revenue)
    FROM (
      SELECT store_id, SUM(total_amount) AS store_revenue
      FROM orders
      WHERE order_status = 'Delivered'
      GROUP BY store_id
    ) AS all_store_revs
  )
)
ORDER BY o.total_amount DESC
LIMIT 10;`}
        height={285}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Same logic, much cleaner as a CTE
WITH store_revenues AS (
  SELECT store_id, SUM(total_amount) AS revenue
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY store_id
),
median_revenue AS (
  SELECT AVG(revenue) AS median_rev FROM store_revenues
),
top_stores AS (
  SELECT store_id FROM store_revenues, median_revenue
  WHERE revenue >= median_rev
)
SELECT o.order_id, o.store_id, o.total_amount, o.order_status
FROM orders AS o
WHERE o.store_id IN (SELECT store_id FROM top_stores)
ORDER BY o.total_amount DESC
LIMIT 10;`}
        height={240}
        showSchema={false}
      />

      <ProTip>
        The rule for nesting depth: one level of inline subquery is fine. Two levels is acceptable for simple cases. Three or more levels should almost always be refactored into CTEs. Each CTE gets a descriptive name that documents what it computes — the multi-level CTE version reads like a step-by-step explanation of the logic. The nested subquery version requires the reader to work inside-out to understand what it does.
      </ProTip>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data analyst at Stripe. The product team needs a customer health report for a quarterly review. They want: every customer with their total spend, their spend relative to the average for their loyalty tier, whether they qualify as "high value" (top 25% spenders in their tier), and their most recent order date. This requires several computed values that depend on group-level aggregates — a classic multi-subquery problem.</P>

      <TimeBlock time="3:00 PM" label="Requirements received">
        Customer ID, name, loyalty tier, total spend, tier average spend, spend vs tier average, high-value flag (top 25% in tier), last order date.
      </TimeBlock>

      <TimeBlock time="3:20 PM" label="You plan the query structure">
        Three computed values need subqueries: tier average spend (correlated or JOIN), 75th percentile per tier (derived table), last order date (scalar correlated or JOIN). You choose CTEs for clarity.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Customer health report using CTEs and subqueries
WITH customer_spend AS (
  -- Total delivered spend per customer
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2)  AS total_spend,
    COUNT(order_id)              AS order_count,
    MAX(order_date)              AS last_order_date
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
),
tier_stats AS (
  -- Average and 75th percentile spend per loyalty tier
  SELECT
    c.loyalty_tier,
    ROUND(AVG(cs.total_spend), 2)   AS tier_avg_spend,
    ROUND(PERCENTILE_CONT(0.75)
      WITHIN GROUP (ORDER BY cs.total_spend), 2) AS tier_p75_spend
  FROM customers AS c
  JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
  GROUP BY c.loyalty_tier
)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.loyalty_tier,
  COALESCE(cs.total_spend, 0)          AS total_spend,
  COALESCE(cs.order_count, 0)          AS order_count,
  cs.last_order_date,
  ts.tier_avg_spend,
  ROUND(COALESCE(cs.total_spend, 0) - ts.tier_avg_spend, 2) AS vs_tier_avg,
  CASE
    WHEN cs.total_spend >= ts.tier_p75_spend THEN 'High value'
    WHEN cs.total_spend IS NULL              THEN 'No orders'
    ELSE 'Standard'
  END                                  AS customer_segment
FROM customers AS c
LEFT JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
JOIN tier_stats AS ts ON c.loyalty_tier = ts.loyalty_tier
ORDER BY c.loyalty_tier, total_spend DESC NULLS LAST;`}
        height={340}
        showSchema={true}
      />

      <TimeBlock time="4:00 PM" label="Report complete — delivered 40 minutes early">
        Three CTEs — customer_spend, tier_stats — each doing one clean computation, assembled in the final SELECT. Every computed metric is clearly named and the logic is readable without any nested subquery archaeology. The product team gets the complete customer health report in one query with all requested fields.
      </TimeBlock>

      <ProTip>
        The CTE-first pattern for complex reports: identify every intermediate computation the report needs (customer total spend, tier averages, percentiles), give each its own named CTE, then assemble in the final SELECT. The final SELECT reads like plain English — join customer to their spend to their tier stats. This structure makes the query maintainable: adding a new metric means adding one CTE, not restructuring a nested subquery stack.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a subquery and what are the different types?">
        <p style={{ margin: '0 0 14px' }}>A subquery is a SELECT statement nested inside another SQL statement. The outer query uses the subquery's result as if it were a value, a list, or a table. The database executes the subquery first, then uses the result to evaluate the outer query.</p>
        <p style={{ margin: '0 0 14px' }}>Four types based on where the subquery appears and what it returns. A scalar subquery appears in SELECT, WHERE, or HAVING and returns exactly one row and one column — a single value. It is used to compare a column against a computed aggregate or to add a computed reference value to each row. A table subquery (derived table) appears in the FROM clause and returns multiple rows and columns — a virtual table that the outer query can JOIN, filter, and aggregate. It is essential for pre-aggregation and multi-step logic. A correlated subquery references columns from the outer query, making it dependent on the outer row — it executes once per outer row. It is used for row-level comparisons against group aggregates and for EXISTS/NOT EXISTS existence checks. An IN/NOT IN subquery returns a list of values that the outer WHERE clause filters against.</p>
        <p style={{ margin: 0 }}>The choice of subquery type follows from what the query needs: a single comparison value → scalar subquery in WHERE; a list of valid IDs → IN subquery; pre-aggregated data to join → derived table in FROM; per-row group aggregate → correlated subquery (or JOIN to a derived table for performance); existence check → EXISTS correlated subquery.</p>
      </IQ>

      <IQ q="What is a correlated subquery and how does it differ from a non-correlated subquery?">
        <p style={{ margin: '0 0 14px' }}>A non-correlated subquery executes independently of the outer query — it produces a single result (a value, a list, or a table) and the outer query uses that result. The subquery runs once, and the outer query uses the cached result for every row it evaluates. SELECT AVG(salary) FROM employees is non-correlated — it produces one number regardless of which employee row the outer query is examining.</p>
        <p style={{ margin: '0 0 14px' }}>A correlated subquery references a column from the outer query — it cannot be evaluated without knowing the current outer row's values. It executes once per outer row, substituting the current row's values each time. SELECT AVG(e2.salary) FROM employees AS e2 WHERE e2.department = e.department is correlated — it computes the average salary for the department of the current employee being examined by the outer query. For each employee row in the outer query, the subquery reruns with a different department value.</p>
        <p style={{ margin: 0 }}>The performance implication is the key distinction: a non-correlated subquery runs once regardless of outer table size. A correlated subquery runs N times for N outer rows. On a table with 10,000 employees, a correlated subquery that computes the department average runs 10,000 times — even though there are only 20 departments. The JOIN equivalent computes the department average once per department (20 times) and joins — 500x less work. Always consider replacing correlated subqueries with JOIN to a pre-aggregated derived table or with window functions for large-table performance.</p>
      </IQ>

      <IQ q="When would you use EXISTS instead of IN?">
        <p style={{ margin: '0 0 14px' }}>Use EXISTS when you are checking for the existence of a related record — you need to know whether at least one row satisfying a condition exists in another table, but you do not need the actual values from that table. EXISTS is semantically clearest for existence checks and is always NULL-safe — it never has the NULL-returns-nothing problem that NOT IN has.</p>
        <p style={{ margin: '0 0 14px' }}>EXISTS short-circuits: as soon as one matching row is found, the database stops scanning. For large tables where matches are common, this makes EXISTS significantly faster than IN — IN must evaluate all matching rows and build the complete list before filtering. EXISTS also handles NULLs correctly — NOT EXISTS (subquery with NULLs) still works correctly, whereas NOT IN (subquery with NULLs) silently returns zero rows.</p>
        <p style={{ margin: 0 }}>Use IN when you have a small fixed list of values (IN (1, 2, 3) — no subquery), or when the subquery returns a manageable list of values and readability matters more than maximum performance. IN is slightly more readable for simple filtering: WHERE customer_id IN (SELECT customer_id FROM vip_customers) clearly states "get me rows where the customer is in this list." EXISTS requires understanding the correlated reference: WHERE EXISTS (SELECT 1 FROM vip_customers WHERE vip_customers.customer_id = orders.customer_id) is more verbose but semantically equivalent. The practical rule: use EXISTS for large subquery results, nullable columns, and all NOT IN use cases. Use IN for small lists and when you are certain the subquery returns no NULLs.</p>
      </IQ>

      <IQ q="What is a derived table and when would you use one instead of a CTE?">
        <p style={{ margin: '0 0 14px' }}>A derived table is a subquery in the FROM clause — a temporary result set that the outer query treats as a regular table. It is defined inline within the query: FROM (SELECT store_id, SUM(total_amount) AS revenue FROM orders GROUP BY store_id) AS store_revenues. The alias (AS store_revenues) is mandatory — the outer query references it by that name. Derived tables are not stored or cached — they are computed each time the query runs.</p>
        <p style={{ margin: '0 0 14px' }}>A CTE (Common Table Expression) defined with WITH serves the same purpose — it creates a named intermediate result — but it appears before the main query rather than inline. Both are equivalent in terms of what they compute. The difference is primarily readability and reuse. A CTE can be referenced multiple times in the same query; a derived table defined inline can only be used once at the location it is defined.</p>
        <p style={{ margin: 0 }}>When to use derived table vs CTE: use an inline derived table for simple, single-use pre-aggregation where the subquery is short and adding a CTE name would be more overhead than clarity. Use a CTE when the same intermediate result is needed more than once (CTE is defined once, referenced by name wherever needed), when the logic has multiple sequential steps that benefit from named intermediate results, or when the derived table subquery is complex enough that naming it adds meaningful documentation. As a practical guide: if a subquery in FROM is more than 5-6 lines, extract it to a named CTE for readability. If it is 2-3 lines, keeping it inline is often cleaner.</p>
      </IQ>

      <IQ q="How would you find customers whose total order value is above the average for their loyalty tier?">
        <p style={{ margin: '0 0 14px' }}>This requires comparing each customer's total spend against the average total spend for customers in the same loyalty tier. The tier average is an aggregate that varies by tier — it cannot be computed with a single scalar subquery (which would give the overall average, not the per-tier average).</p>
        <p style={{ margin: '0 0 14px' }}>Approach 1 — correlated subquery: for each customer, run a subquery that computes the average total spend for customers in the same tier. SELECT c.customer_id, c.loyalty_tier, SUM(o.total_amount) AS total_spend FROM customers AS c JOIN orders AS o ON c.customer_id = o.customer_id WHERE o.order_status = 'Delivered' GROUP BY c.customer_id, c.loyalty_tier HAVING SUM(o.total_amount) {'>'} (SELECT AVG(tier_spend) FROM (SELECT c2.customer_id, SUM(o2.total_amount) AS tier_spend FROM customers AS c2 JOIN orders AS o2 ON c2.customer_id = o2.customer_id WHERE o2.order_status = 'Delivered' AND c2.loyalty_tier = c.loyalty_tier GROUP BY c2.customer_id) AS tier_totals). This is correct but the correlated subquery in HAVING makes it verbose and potentially slow.</p>
        <p style={{ margin: 0 }}>Approach 2 — CTE with JOIN (preferred): WITH customer_totals AS (SELECT c.customer_id, c.loyalty_tier, SUM(o.total_amount) AS total_spend FROM customers AS c JOIN orders AS o ON c.customer_id = o.customer_id WHERE o.order_status = 'Delivered' GROUP BY c.customer_id, c.loyalty_tier), tier_averages AS (SELECT loyalty_tier, AVG(total_spend) AS avg_spend FROM customer_totals GROUP BY loyalty_tier) SELECT ct.customer_id, ct.loyalty_tier, ct.total_spend, ta.avg_spend FROM customer_totals AS ct JOIN tier_averages AS ta ON ct.loyalty_tier = ta.loyalty_tier WHERE ct.total_spend {'>'} ta.avg_spend. The CTE approach computes tier averages once (not per customer), is readable, and scales efficiently to large datasets.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: subquery returns more than one row — scalar subquery used where one value expected"
        cause="A scalar subquery (used in SELECT, WHERE with =, or HAVING with =) returned multiple rows instead of exactly one. For example, WHERE total_amount = (SELECT total_amount FROM orders WHERE customer_id = 5) — if customer 5 has multiple orders, the subquery returns multiple rows and the = operator fails. A scalar subquery must always return exactly one row."
        fix="Three options: (1) Add an aggregate to force one row: = (SELECT MAX(total_amount) FROM orders WHERE customer_id = 5). (2) Use IN instead of = if multiple matching values are acceptable: WHERE total_amount IN (SELECT total_amount FROM orders WHERE customer_id = 5). (3) Add a LIMIT 1 with ORDER BY to force exactly one row: = (SELECT total_amount FROM orders WHERE customer_id = 5 ORDER BY order_date DESC LIMIT 1). Choose based on which value is semantically correct."
      />

      <Err
        msg="NOT IN subquery returns zero rows — even though unmatched rows clearly exist"
        cause="The NOT IN subquery returns at least one NULL value. NOT IN (1, 2, NULL) is equivalent to col != 1 AND col != 2 AND col != NULL. Since col != NULL evaluates to NULL (not TRUE), the entire AND chain evaluates to NULL for every row — returning zero results. This is the most common and most dangerous subquery NULL trap."
        fix="Add WHERE subquery_column IS NOT NULL inside the subquery: WHERE p.product_id NOT IN (SELECT product_id FROM order_items WHERE product_id IS NOT NULL). Or switch to NOT EXISTS which is NULL-safe: WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id). Or use LEFT JOIN + IS NULL. Before using NOT IN in production, always verify the subquery cannot return NULLs: SELECT COUNT(*) FROM subquery_table WHERE join_column IS NULL."
      />

      <Err
        msg="Correlated subquery is extremely slow — query takes minutes instead of seconds"
        cause="The correlated subquery executes once per outer row. With 10,000 outer rows, the subquery runs 10,000 times. If the subquery itself does a full table scan (no index on the correlated column), total work is 10,000 × full_scan_cost. On large tables, this produces O(n²) complexity — exponentially worse than a single-pass JOIN."
        fix="Replace the correlated subquery with a JOIN to a pre-aggregated derived table or CTE. Instead of SELECT AVG(e2.salary) FROM employees e2 WHERE e2.department = e.department per row, compute: (SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department) AS dept_avgs — once per department — and JOIN to it. Also ensure the correlated column (e2.department in the subquery) is indexed. Use EXPLAIN ANALYZE to confirm the rewrite reduces total scans."
      />

      <Err
        msg="Derived table alias missing — syntax error near the subquery closing parenthesis"
        cause="Every subquery used as a derived table (in the FROM clause or as a JOIN target) must have an alias. FROM (SELECT ...) is a syntax error — the alias is mandatory. This is a hard SQL rule: the derived table must be named so the outer query can reference it."
        fix="Add an alias immediately after the closing parenthesis: FROM (SELECT ...) AS my_derived_table. The alias can then be used in JOIN conditions, WHERE clauses, and SELECT column prefixes. Choose a descriptive alias that explains what the derived table contains: AS store_revenues, AS customer_spend, AS top_products — not AS t1 or AS sub."
      />

      <Err
        msg="EXISTS subquery returns unexpected results — seems to match rows it should not"
        cause="The correlated condition in the EXISTS subquery is missing or too broad. EXISTS (SELECT 1 FROM orders) without a WHERE condition that links to the outer query is always TRUE for every outer row — it just checks whether the orders table has any rows at all, not whether a specific customer has orders. This turns the WHERE EXISTS into a no-op filter."
        fix="Always include a correlated condition in EXISTS that links the subquery to the current outer row: WHERE EXISTS (SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id). The WHERE inside EXISTS must reference the outer alias (c.customer_id) — without this, EXISTS evaluates once globally, not per row. Test by temporarily changing EXISTS to a SELECT * and verifying the subquery returns the expected rows for a specific outer row value."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a single query that produces a product performance report using subqueries. For each product show: product_id, product_name, category, unit_price, total_units_sold (0 if never sold), total_revenue (0 if never sold), a 'vs_category_avg_revenue' column showing how the product's revenue compares to the average revenue of products in the same category that were sold, and a performance_tier: 'Top' if revenue is above category average, 'Average' if within ±20% of category average, 'Below' if more than 20% below, 'Unsold' if never sold. Use a derived table in FROM for sales aggregation and a correlated subquery for the category average."
        hint="Derived table: aggregate order_items joined to orders for product_id, units, revenue. LEFT JOIN products to this. Correlated scalar subquery in SELECT for category avg. CASE on revenue vs category avg for performance_tier."
        answer={`SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  COALESCE(s.total_units, 0)           AS total_units_sold,
  COALESCE(s.total_revenue, 0)         AS total_revenue,
  ROUND(
    COALESCE(s.total_revenue, 0) - (
      SELECT AVG(s2.total_revenue)
      FROM (
        SELECT oi2.product_id, ROUND(SUM(oi2.line_total), 2) AS total_revenue
        FROM order_items AS oi2
        JOIN orders AS o2 ON oi2.order_id = o2.order_id
        WHERE o2.order_status = 'Delivered'
        GROUP BY oi2.product_id
      ) AS s2
      JOIN products AS p2 ON s2.product_id = p2.product_id
      WHERE p2.category = p.category
    )
  , 2)                                 AS vs_category_avg_revenue,
  CASE
    WHEN s.total_revenue IS NULL THEN 'Unsold'
    WHEN s.total_revenue > (
      SELECT AVG(s3.total_revenue)
      FROM (
        SELECT oi3.product_id, SUM(oi3.line_total) AS total_revenue
        FROM order_items AS oi3
        JOIN orders AS o3 ON oi3.order_id = o3.order_id
        WHERE o3.order_status = 'Delivered'
        GROUP BY oi3.product_id
      ) AS s3
      JOIN products AS p3 ON s3.product_id = p3.product_id
      WHERE p3.category = p.category
    ) THEN 'Top'
    WHEN s.total_revenue >= (
      SELECT AVG(s4.total_revenue) * 0.8
      FROM (
        SELECT oi4.product_id, SUM(oi4.line_total) AS total_revenue
        FROM order_items AS oi4
        JOIN orders AS o4 ON oi4.order_id = o4.order_id
        WHERE o4.order_status = 'Delivered'
        GROUP BY oi4.product_id
      ) AS s4
      JOIN products AS p4 ON s4.product_id = p4.product_id
      WHERE p4.category = p.category
    ) THEN 'Average'
    ELSE 'Below'
  END                                  AS performance_tier
FROM products AS p
LEFT JOIN (
  SELECT
    oi.product_id,
    SUM(oi.quantity)              AS total_units,
    ROUND(SUM(oi.line_total), 2)  AS total_revenue
  FROM order_items AS oi
  JOIN orders AS o ON oi.order_id = o.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY oi.product_id
) AS s ON p.product_id = s.product_id
ORDER BY p.category, total_revenue DESC NULLS LAST;`}
        explanation="The derived table in FROM (aliased as 's') pre-aggregates delivered sales by product — units and revenue — computed once. LEFT JOIN products to this preserves all products including those never sold (s columns will be NULL for them). The correlated scalar subqueries compute the category average revenue by joining back to products to filter by category matching the current outer row's category. COALESCE(s.total_revenue, 0) handles unsold products for arithmetic. The CASE checks IS NULL first (Unsold), then compares to the category average (> avg = Top, >= avg*0.8 = Average, else = Below). In production, this would be cleaner as a CTE — the correlated subqueries repeat similar logic three times. A CTE computing category averages once would be significantly more efficient and readable."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A subquery is a SELECT inside another SQL statement. The database executes the inner query first and the outer query uses the result as a value, list, or table.',
          'Four types: scalar subquery (one value — in SELECT, WHERE, HAVING), IN subquery (a list of values), derived table (virtual table in FROM), correlated subquery (references outer row — runs once per outer row).',
          'Scalar subquery in WHERE: compare each row against a computed aggregate like average or maximum. Must return exactly one row — use MAX(), MIN(), or AVG() to guarantee this.',
          'IN subquery: filter rows against a list returned by the subquery. NOT IN is dangerous when the subquery can return NULLs — use NOT EXISTS or LEFT JOIN IS NULL instead.',
          'Derived table in FROM: pre-aggregate or pre-filter data before the outer query uses it. Every derived table must have an alias. Two-level aggregation (average of averages) requires a derived table.',
          'Correlated subquery: references the outer query\'s columns — executes once per outer row. Powerful but potentially O(n²) at scale. Replace with JOIN to pre-aggregated derived table for large tables.',
          'EXISTS: semantically clearest for existence checks. Short-circuits on first match. NULL-safe. NOT EXISTS is the correct alternative to NOT IN when NULLs are possible.',
          'Subquery vs JOIN: JOINs are usually more efficient and flexible. Use subqueries when the logic requires a computed value as the filter threshold or when an existence check is needed.',
          'Subquery vs CTE: derived tables and CTEs are computationally equivalent. CTEs are preferred when: the same subquery is referenced more than once, the logic has multiple steps, or naming the intermediate result improves readability.',
          'Nesting depth: one level is fine, two is acceptable, three or more should be refactored into CTEs. Deeply nested subqueries are hard to read and maintain.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 37</strong>, you learn correlated subqueries in depth — every pattern, performance implications, and when to rewrite them as window functions or JOINs for production-scale queries.
        </p>
        <Link href="/learn/sql/correlated-subqueries" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 37 → Correlated Subqueries
        </Link>
      </div>

    </LearnLayout>
  );
}