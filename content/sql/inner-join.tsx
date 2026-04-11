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

export default function InnerJoin() {
  return (
    <LearnLayout
      title="INNER JOIN"
      description="Master the most-used JOIN — two-table joins, three and four-table chains, joining on expressions, aggregate queries with joins, and every production pattern you will write daily"
      section="SQL — Module 31"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="INNER JOIN — The Intersection" />

      <P>INNER JOIN is the default JOIN type and the one you will write most often. It returns only rows where the join condition is satisfied in <Hl>both</Hl> tables simultaneously. Any row in the left table with no matching row in the right is excluded. Any row in the right table with no matching row in the left is excluded. Only the intersection survives.</P>

      <P>This behaviour is exactly what you want for the vast majority of analytics queries: orders with their customers, order items with their products, employees with their stores. In a well-designed schema with foreign key constraints, every FK value is guaranteed to exist in the parent table — so INNER JOIN and LEFT JOIN produce identical results for those relationships. The choice between them becomes meaningful when the relationship is optional or when you specifically need to find unmatched rows.</P>

      <CodeBlock
        label="INNER JOIN — syntax reminder"
        code={`-- Explicit keyword (clearest):
SELECT columns
FROM   left_table AS l
INNER JOIN right_table AS r ON l.key = r.key;

-- Shorthand (JOIN without qualifier = INNER JOIN):
SELECT columns
FROM   left_table AS l
JOIN   right_table AS r ON l.key = r.key;

-- Both are identical — INNER is the default when no type is specified`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Two-Table INNER JOIN — Every Core Pattern" />

      <H>Orders → Customers</H>

      <SQLPlayground
        initialQuery={`-- Every order enriched with customer details
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  o.payment_method,
  o.total_amount,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.city,
  c.loyalty_tier
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <H>Orders → Stores</H>

      <SQLPlayground
        initialQuery={`-- Orders with store city and manager details
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status,
  s.store_id,
  s.city          AS store_city,
  s.manager_name
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
ORDER BY o.total_amount DESC
LIMIT 8;`}
        height={205}
        showSchema={false}
      />

      <H>Order Items → Products</H>

      <SQLPlayground
        initialQuery={`-- Every order line with its product details
SELECT
  oi.order_id,
  oi.quantity,
  oi.unit_price,
  oi.line_total,
  p.product_name,
  p.category,
  p.brand,
  -- Margin at time of order vs current cost
  ROUND((oi.unit_price - p.cost_price) / oi.unit_price * 100, 1) AS margin_pct
FROM order_items AS oi
JOIN products AS p ON oi.product_id = p.product_id
ORDER BY oi.line_total DESC
LIMIT 10;`}
        height={215}
        showSchema={false}
      />

      <H>Employees → Stores</H>

      <SQLPlayground
        initialQuery={`-- Employees with their store location
-- INNER JOIN excludes head-office employees (store_id IS NULL)
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.salary,
  s.store_id,
  s.city          AS store_city,
  s.manager_name  AS store_manager
FROM employees AS e
JOIN stores AS s ON e.store_id = s.store_id
ORDER BY s.city, e.salary DESC;`}
        height={205}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Three-Table INNER JOIN — Chaining Relationships" />

      <P>Every additional JOIN adds one more table to the combined result. The database processes JOINs left to right — each JOIN combines the current result with the next table. The query optimiser may reorder joins for performance, but logically they chain sequentially.</P>

      <H>Orders + Customers + Stores</H>

      <SQLPlayground
        initialQuery={`-- Orders with full customer and store context
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  o.total_amount,
  o.payment_method,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city           AS customer_city,
  s.city           AS store_city
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id
ORDER BY o.total_amount DESC
LIMIT 8;`}
        height={220}
        showSchema={true}
      />

      <H>Order Items + Orders + Products</H>

      <SQLPlayground
        initialQuery={`-- Order line items with their order date and product details
SELECT
  oi.item_id,
  o.order_id,
  o.order_date,
  o.order_status,
  p.product_name,
  p.category,
  oi.quantity,
  oi.unit_price,
  oi.line_total
FROM order_items AS oi
JOIN orders   AS o ON oi.order_id   = o.order_id
JOIN products AS p ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
ORDER BY oi.line_total DESC
LIMIT 10;`}
        height={220}
        showSchema={false}
      />

      <H>Employees + Stores + (grouped summary)</H>

      <SQLPlayground
        initialQuery={`-- Store employee summary — headcount and payroll per store city
SELECT
  s.city,
  s.store_name,
  COUNT(e.employee_id)           AS headcount,
  ROUND(AVG(e.salary), 0)        AS avg_salary,
  SUM(e.salary)                  AS monthly_payroll
FROM stores AS s
JOIN employees AS e ON s.store_id = e.store_id
GROUP BY s.store_id, s.city, s.store_name
ORDER BY monthly_payroll DESC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Four-Table INNER JOIN — The FreshMart Master Query" />

      <P>The full FreshMart order detail query joins all four core tables: orders, customers, stores, order_items, and products. This five-table join (treating order_items as the bridge between orders and products) is the foundation for almost every sales and customer report.</P>

      <SQLPlayground
        initialQuery={`-- FreshMart master join — full order line detail
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  o.payment_method,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city           AS customer_city,
  s.city           AS store_city,
  p.product_name,
  p.category,
  p.brand,
  oi.quantity,
  oi.unit_price,
  oi.line_total
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN stores      AS s  ON o.store_id     = s.store_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
JOIN products    AS p  ON oi.product_id  = p.product_id
WHERE o.order_status = 'Delivered'
ORDER BY o.order_id, p.category
LIMIT 15;`}
        height={270}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Master join + GROUP BY: revenue by customer city and product category
SELECT
  c.city                              AS customer_city,
  p.category,
  COUNT(DISTINCT o.order_id)          AS orders,
  SUM(oi.quantity)                    AS units_sold,
  ROUND(SUM(oi.line_total), 2)        AS revenue
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
JOIN products    AS p  ON oi.product_id  = p.product_id
WHERE o.order_status = 'Delivered'
GROUP BY c.city, p.category
ORDER BY c.city, revenue DESC;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="INNER JOIN on Expressions — Non-Equality Joins" />

      <P>The ON clause is not limited to equality. You can join on any boolean expression — ranges, inequalities, calculated values. Non-equality joins are less common than equality joins but essential for certain analytical patterns.</P>

      <H>Range join — joining on a value falling within a range</H>

      <CodeBlock
        label="Range join — ON with BETWEEN"
        code={`-- Classify orders into salary bands defined in a reference table
-- salary_bands(band_name, min_amount, max_amount)
SELECT
  o.order_id,
  o.total_amount,
  sb.band_name
FROM orders AS o
JOIN salary_bands AS sb
  ON o.total_amount BETWEEN sb.min_amount AND sb.max_amount;

-- This is a range join: no single equality condition
-- Each order matches the band whose range contains its total_amount`}
      />

      <H>Joining on a calculated condition</H>

      <SQLPlayground
        initialQuery={`-- Orders where the customer joined AFTER the order was placed
-- (data quality check — should never happen, but useful to verify)
SELECT
  o.order_id,
  o.order_date,
  c.first_name,
  c.joined_date
FROM orders AS o
JOIN customers AS c
  ON o.customer_id = c.customer_id
  AND o.order_date >= c.joined_date   -- order must be after joining
ORDER BY o.order_date
LIMIT 8;`}
        height={200}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products where the order price was below the current price
-- (sold at a discount relative to today's price)
SELECT
  oi.order_id,
  p.product_name,
  p.unit_price       AS current_price,
  oi.unit_price      AS sold_at_price,
  ROUND(p.unit_price - oi.unit_price, 2) AS price_difference
FROM order_items AS oi
JOIN products AS p
  ON oi.product_id = p.product_id
  AND oi.unit_price < p.unit_price   -- sold below current price
ORDER BY price_difference DESC
LIMIT 10;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="INNER JOIN with Aggregates — The Analytics Core" />

      <P>The combination of INNER JOIN and GROUP BY is the foundation of every analytics report. Join to bring data together, group to define dimensions, aggregate to compute metrics.</P>

      <H>Revenue by store</H>

      <SQLPlayground
        initialQuery={`-- Total revenue, order count, and avg order value per store
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(o.order_id)              AS total_orders,
  ROUND(SUM(o.total_amount), 2)  AS total_revenue,
  ROUND(AVG(o.total_amount), 2)  AS avg_order_value,
  s.monthly_target,
  ROUND(SUM(o.total_amount) / s.monthly_target * 100, 1) AS target_pct
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
ORDER BY total_revenue DESC;`}
        height={225}
        showSchema={true}
      />

      <H>Top products by revenue</H>

      <SQLPlayground
        initialQuery={`-- Top 10 products by total delivered revenue
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  COUNT(DISTINCT oi.order_id)    AS times_ordered,
  SUM(oi.quantity)               AS units_sold,
  ROUND(SUM(oi.line_total), 2)   AS total_revenue,
  ROUND(AVG(oi.unit_price), 2)   AS avg_selling_price
FROM products AS p
JOIN order_items AS oi ON p.product_id  = oi.product_id
JOIN orders      AS o  ON oi.order_id   = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.product_id, p.product_name, p.category, p.brand
ORDER BY total_revenue DESC
LIMIT 10;`}
        height={230}
        showSchema={false}
      />

      <H>Customer lifetime value</H>

      <SQLPlayground
        initialQuery={`-- Lifetime value and order behaviour per customer
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  COUNT(DISTINCT o.order_id)          AS total_orders,
  SUM(oi.quantity)                    AS total_items_bought,
  ROUND(SUM(o.total_amount), 2)       AS lifetime_value,
  ROUND(AVG(o.total_amount), 2)       AS avg_order_value,
  MIN(o.order_date)                   AS first_order,
  MAX(o.order_date)                   AS latest_order
FROM customers   AS c
JOIN orders      AS o  ON c.customer_id  = o.customer_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.city, c.loyalty_tier
ORDER BY lifetime_value DESC;`}
        height={250}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="INNER JOIN with Subqueries — Joining to Derived Tables" />

      <P>The right side of a JOIN does not have to be a base table. It can be a subquery — a derived table computed on the fly. This pattern is useful when you need to join pre-aggregated data or filter a table before joining it.</P>

      <H>Join to a pre-aggregated subquery</H>

      <SQLPlayground
        initialQuery={`-- Customers joined to their order summary
-- The subquery computes per-customer stats, then joins to customer details
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  os.order_count,
  os.total_spend,
  os.avg_order
FROM customers AS c
JOIN (
  SELECT
    customer_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_spend,
    ROUND(AVG(total_amount), 2)  AS avg_order
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS os ON c.customer_id = os.customer_id
ORDER BY os.total_spend DESC;`}
        height={260}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products joined to their best-selling order details
-- Join to subquery that finds the max line_total per product
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  top_sale.max_line_total,
  top_sale.max_qty
FROM products AS p
JOIN (
  SELECT
    product_id,
    MAX(line_total)   AS max_line_total,
    MAX(quantity)     AS max_qty
  FROM order_items
  GROUP BY product_id
) AS top_sale ON p.product_id = top_sale.product_id
ORDER BY top_sale.max_line_total DESC
LIMIT 10;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="INNER JOIN with CTEs — Readable Multi-Step Queries" />

      <P>CTEs (Common Table Expressions) define named intermediate results that can be joined like regular tables. For complex multi-step analytics, CTEs make the logic readable and maintainable — each step builds on the previous.</P>

      <SQLPlayground
        initialQuery={`-- CTE-based: top customers per loyalty tier
WITH customer_spend AS (
  -- Step 1: compute total spend per customer
  SELECT
    customer_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
),
ranked AS (
  -- Step 2: join to customer details and rank within tier
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name  AS customer,
    c.loyalty_tier,
    c.city,
    cs.order_count,
    cs.total_spend,
    ROW_NUMBER() OVER (
      PARTITION BY c.loyalty_tier
      ORDER BY cs.total_spend DESC
    ) AS rank_in_tier
  FROM customers AS c
  JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
)
-- Step 3: keep only the top customer per tier
SELECT *
FROM ranked
WHERE rank_in_tier = 1
ORDER BY total_spend DESC;`}
        height={300}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CTE: product revenue joined to store revenue
-- Compare product contribution to store total
WITH store_revenue AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS store_total
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
),
product_by_store AS (
  SELECT
    o.store_id,
    p.product_name,
    p.category,
    ROUND(SUM(oi.line_total), 2) AS product_revenue
  FROM orders AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id, p.product_name, p.category
)
SELECT
  pbs.store_id,
  pbs.product_name,
  pbs.category,
  pbs.product_revenue,
  sr.store_total,
  ROUND(pbs.product_revenue / sr.store_total * 100, 1) AS pct_of_store
FROM product_by_store AS pbs
JOIN store_revenue    AS sr ON pbs.store_id = sr.store_id
ORDER BY pbs.store_id, pbs.product_revenue DESC;`}
        height={300}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="The Fan-Out Problem — When JOINs Inflate Aggregates" />

      <P>The most common INNER JOIN mistake in analytics: joining a one-to-many relationship before aggregating inflates aggregate values. If one order has three items, joining orders to order_items gives three rows per order. Summing orders.total_amount on this result adds the total_amount three times — once per item row.</P>

      <H>Demonstrating the fan-out bug</H>

      <SQLPlayground
        initialQuery={`-- WRONG: fan-out bug — SUM(total_amount) is inflated
-- Each order appears once per item, so total_amount is added multiple times
SELECT
  SUM(o.total_amount)          AS wrong_revenue,
  COUNT(*)                     AS row_count
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_status = 'Delivered';`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: aggregate at the right level
-- Sum line_total from order_items (item-level) — not total_amount from orders
SELECT
  SUM(oi.line_total)           AS correct_revenue,
  COUNT(DISTINCT o.order_id)   AS order_count
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_status = 'Delivered';`}
        height={125}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- ALSO CORRECT: pre-aggregate orders before joining to items
-- Compute order-level metrics from orders table, item-level from order_items
SELECT
  COUNT(DISTINCT o.order_id)   AS order_count,
  ROUND(SUM(o.total_amount), 2) AS order_revenue,   -- from orders, not joined
  ROUND(SUM(oi.line_total), 2)  AS item_revenue     -- from items, both should match
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_status = 'Delivered';`}
        height={145}
        showSchema={false}
      />

      <H>The rules to prevent fan-out</H>

      <CodeBlock
        label="Fan-out prevention rules"
        code={`-- Rule 1: Only aggregate columns from the many-side table
-- WRONG: SUM(orders.total_amount) after joining to order_items
-- RIGHT:  SUM(order_items.line_total) — aggregate the many-side column

-- Rule 2: Use COUNT(DISTINCT pk) not COUNT(*) on the one-side
-- WRONG: COUNT(*) counts one row per item, not one per order
-- RIGHT:  COUNT(DISTINCT o.order_id) counts distinct orders

-- Rule 3: Pre-aggregate the many side before joining
WITH item_totals AS (
  SELECT order_id, SUM(line_total) AS item_total
  FROM order_items GROUP BY order_id
)
SELECT o.order_id, o.total_amount, it.item_total
FROM orders AS o
JOIN item_totals AS it ON o.order_id = it.order_id;
-- Now one row per order — no fan-out

-- Rule 4: Verify by comparing totals to known values
-- Run the aggregate, then cross-check against a simpler query`}
      />

      <Callout type="warning">
        The fan-out bug is silent — the query runs without errors and returns results that look plausible. The numbers are simply wrong. Always cross-check aggregate results from a JOIN query against a simpler single-table aggregate to detect inflation before trusting the output.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="JOIN Order and Performance" />

      <P>SQL is declarative — you describe what you want, not how to get it. The query optimiser decides the physical join order based on table statistics, indexes, and cardinality estimates. However, understanding how the optimiser thinks helps you write queries that perform well.</P>

      <H>How the optimiser chooses join order</H>
      <P>The optimiser aims to minimise the number of rows processed at each stage. It typically starts with the most selective filter (the table + WHERE condition that produces the fewest rows) and progressively joins larger tables. On a well-tuned database with up-to-date statistics, the optimiser usually picks the right order automatically.</P>

      <H>Index usage in JOINs</H>
      <P>The join column in the "inner" table (the one being looked up) should be indexed. When the database evaluates o.customer_id = c.customer_id, it scans orders and looks up each customer_id in customers. If customers has an index on customer_id (it does — it is the primary key), each lookup is O(log n). Without an index, each lookup is a full scan — O(n) per order row — making the join O(n²).</P>

      <CodeBlock
        label="Index usage in JOINs"
        code={`-- Fast: joining on primary keys and indexed columns
JOIN customers AS c ON o.customer_id = c.customer_id
-- customer_id is the PK of customers — always indexed

JOIN products AS p ON oi.product_id = p.product_id
-- product_id is the PK of products — always indexed

-- Potentially slow: joining on non-indexed columns
JOIN orders AS o ON o.payment_method = p.category
-- payment_method in orders may not be indexed
-- Consider adding: CREATE INDEX idx_orders_payment ON orders(payment_method)

-- Use EXPLAIN ANALYZE to see the actual join plan and identify slow joins:
EXPLAIN ANALYZE
SELECT * FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered';`}
      />

      <H>Writing joins for the optimiser</H>

      <CodeBlock
        label="Performance-friendly JOIN patterns"
        code={`-- Filter early: put selective WHERE conditions to reduce rows before joining
SELECT ...
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2024-01-01'   -- reduces orders table first
  AND c.loyalty_tier = 'Platinum';   -- further reduces matched customers

-- Avoid functions on join columns — prevents index use
-- WRONG:
JOIN customers AS c ON LOWER(o.customer_email) = LOWER(c.email)
-- The LOWER() call prevents the index on email from being used

-- RIGHT: normalise data at write time, join on raw values
JOIN customers AS c ON o.customer_id = c.customer_id

-- Avoid OR conditions in ON — harder to optimise
-- Use UNION ALL instead of OR in join conditions when possible`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a senior analyst at Meesho, India's social commerce platform. The growth team needs a weekly seller performance report — for each seller, show total orders handled, revenue generated, unique products listed, average order value, and the top product category. This is a multi-table INNER JOIN with aggregation — the most common production analytics pattern.</P>

      <TimeBlock time="9:00 AM" label="Requirements received">
        Weekly seller performance: seller_id, seller_name, total orders, total revenue, unique products, avg order value, top category. Adapted for FreshMart: store performance with product category breakdown.
      </TimeBlock>

      <TimeBlock time="9:20 AM" label="Step 1 — build the base join">
        Start with the master join covering all required tables.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Step 1: Base join — stores + orders + order_items + products
-- Verify row count and spot-check before aggregating
SELECT
  s.store_id,
  s.city,
  o.order_id,
  p.product_name,
  p.category,
  oi.quantity,
  oi.line_total
FROM stores      AS s
JOIN orders      AS o  ON s.store_id    = o.store_id
JOIN order_items AS oi ON o.order_id    = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
LIMIT 8;`}
        height={220}
        showSchema={true}
      />

      <TimeBlock time="9:35 AM" label="Step 2 — add aggregation">
        Base join is correct. Now add GROUP BY and aggregates.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Step 2: Aggregated seller (store) performance report
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(DISTINCT o.order_id)          AS total_orders,
  ROUND(SUM(oi.line_total), 2)        AS total_revenue,
  COUNT(DISTINCT oi.product_id)       AS unique_products,
  ROUND(AVG(o.total_amount), 2)       AS avg_order_value,
  s.monthly_target,
  ROUND(SUM(oi.line_total) / s.monthly_target * 100, 1) AS target_pct
FROM stores      AS s
JOIN orders      AS o  ON s.store_id    = o.store_id
JOIN order_items AS oi ON o.order_id    = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
ORDER BY total_revenue DESC;`}
        height={250}
        showSchema={false}
      />

      <TimeBlock time="9:55 AM" label="Step 3 — add top category per store">
        Use a CTE to find each store's top category, then join to the main report.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Step 3: Full report with top category per store
WITH store_summary AS (
  SELECT
    s.store_id,
    s.store_name,
    s.city,
    s.monthly_target,
    COUNT(DISTINCT o.order_id)          AS total_orders,
    ROUND(SUM(oi.line_total), 2)        AS total_revenue,
    COUNT(DISTINCT oi.product_id)       AS unique_products,
    ROUND(AVG(o.total_amount), 2)       AS avg_order_value
  FROM stores      AS s
  JOIN orders      AS o  ON s.store_id    = o.store_id
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
),
top_category AS (
  SELECT DISTINCT ON (o.store_id)
    o.store_id,
    p.category                          AS top_category,
    SUM(oi.line_total) OVER (
      PARTITION BY o.store_id, p.category
    )                                   AS category_revenue
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
  ORDER BY o.store_id, category_revenue DESC
)
SELECT
  ss.store_id,
  ss.store_name,
  ss.city,
  ss.total_orders,
  ss.total_revenue,
  ss.unique_products,
  ss.avg_order_value,
  ROUND(ss.total_revenue / ss.monthly_target * 100, 1) AS target_pct,
  tc.top_category
FROM store_summary AS ss
JOIN top_category  AS tc ON ss.store_id = tc.store_id
ORDER BY ss.total_revenue DESC;`}
        height={340}
        showSchema={false}
      />

      <TimeBlock time="10:20 AM" label="Report delivered — one hour from brief to delivery">
        Three incremental steps: base join verification → aggregation → CTE enrichment. Each step was verified before the next was built. The final report has every metric the growth team requested, in one query.
      </TimeBlock>

      <ProTip>
        The incremental build pattern — base join → verify → add aggregation → verify → add enrichment — is the professional workflow for every complex JOIN query. Never write the full query in one shot and hope it is correct. Build it layer by layer, verify the row count and spot-check values at each stage, and add the next layer only when the current one is confirmed correct.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How does INNER JOIN work internally and what does it return?">
        <p style={{ margin: '0 0 14px' }}>INNER JOIN works by evaluating the ON condition for every candidate pair of rows from the left and right tables. For each row in the left table, the database uses the join column's index (if available) to find matching rows in the right table — rows where the ON condition evaluates to TRUE. When a match is found, the columns from both rows are concatenated into a single output row. Rows from either table that have no matching partner in the other table are excluded from the result.</p>
        <p style={{ margin: '0 0 14px' }}>The database does not literally evaluate every combination of rows (which would be O(n²)). Instead it uses join algorithms: the nested loop join (iterate left rows, index-lookup right), hash join (build a hash table from the smaller table, probe it with each left row), or merge join (sort both tables on the join key, merge-scan). The query optimiser chooses the algorithm based on table sizes, available indexes, and memory.</p>
        <p style={{ margin: 0 }}>The result of INNER JOIN is always a subset of the Cartesian product of the two tables — only rows where the ON condition is satisfied. The output has all columns from both tables (as specified in SELECT) for each matched pair. For foreign key relationships in a well-designed schema, INNER JOIN and LEFT JOIN produce the same result — because the FK constraint guarantees every FK value has a matching PK. The difference emerges only for optional relationships or when checking for unmatched rows.</p>
      </IQ>

      <IQ q="When you join orders to order_items, why does SUM(orders.total_amount) give wrong results?">
        <p style={{ margin: '0 0 14px' }}>This is the fan-out bug. The orders-to-order_items relationship is one-to-many: one order can have many items. When you JOIN orders to order_items, each order row is duplicated once per item — an order with 3 items appears 3 times in the joined result. When you then SUM(orders.total_amount), you are adding the same total_amount three times for that order.</p>
        <p style={{ margin: '0 0 14px' }}>Example: order 1001 has total_amount = ₹500 and 3 items. After the JOIN, the result has 3 rows all with total_amount = ₹500. SUM(total_amount) for this order contributes ₹1,500 instead of ₹500 — triple-counted. The final sum across all orders is inflated by the average number of items per order.</p>
        <p style={{ margin: 0 }}>The three fixes: (1) SUM the item-level column instead — SUM(order_items.line_total) is correct because each line_total is unique to each item row, not duplicated. (2) Use COUNT(DISTINCT order_id) instead of COUNT(*) to count orders, not item rows. (3) Pre-aggregate order_items in a subquery or CTE first (SELECT order_id, SUM(line_total) AS total FROM order_items GROUP BY order_id), then join that aggregated result to orders — one row per order in the joined result, no fan-out. The fan-out bug is especially dangerous because the query runs without errors and returns plausible-looking numbers. Always cross-check JOIN aggregates against simpler single-table queries.</p>
      </IQ>

      <IQ q="What is the difference between writing a filter in ON vs WHERE for an INNER JOIN?">
        <p style={{ margin: '0 0 14px' }}>For INNER JOIN specifically, a filter in ON and a filter in WHERE produce identical results. This is because INNER JOIN already excludes unmatched rows — it does not have the asymmetric NULL-preservation behaviour of LEFT JOIN. Whether the filter is applied during the join (ON) or after (WHERE), the same rows end up being excluded.</p>
        <p style={{ margin: '0 0 14px' }}>Example: JOIN customers AS c ON o.customer_id = c.customer_id AND c.city = 'Bangalore' produces the same result as JOIN customers AS c ON o.customer_id = c.customer_id WHERE c.city = 'Bangalore'. Both return only orders from Bangalore customers.</p>
        <p style={{ margin: 0 }}>However, there is a convention preference: conditions that define the join relationship (matching keys) belong in ON; conditions that filter the result belong in WHERE. This makes queries more readable and semantically clear. ON answers "how do the tables relate?" WHERE answers "what rows from the joined result do I want?" Mixing business filters into ON makes the join condition harder to scan. The performance implication is theoretically the same for INNER JOIN since the optimiser can push predicates into the join regardless — but readability favours keeping relationship conditions in ON and filter conditions in WHERE.</p>
      </IQ>

      <IQ q="How do you join more than two tables and does the order matter?">
        <p style={{ margin: '0 0 14px' }}>Joining more than two tables means chaining multiple JOIN clauses. Each JOIN adds one more table to the current result. The syntax is sequential: FROM a JOIN b ON a.key = b.key JOIN c ON b.key = c.key JOIN d ON c.key = d.key. Each JOIN's ON clause can reference columns from any table that has already been introduced — you cannot reference a table before it appears in the FROM/JOIN chain.</p>
        <p style={{ margin: '0 0 14px' }}>Logically, the order of JOINs matters for which columns are available in subsequent ON clauses. You cannot join order_items to products before joining orders to order_items — because order_items is not yet in scope when you try to join products to it. The practical rule: join tables in the order of the relationship chain, following the FK path through the schema.</p>
        <p style={{ margin: 0 }}>Physically, the query optimiser reorders JOINs for performance — it does not respect the written order. It evaluates all possible join orderings (up to a threshold) and chooses the one with the lowest estimated cost based on table sizes, indexes, and statistics. For queries with 5+ tables, the optimiser uses heuristics rather than exhaustive search. You can influence the physical order with hints in some databases (e.g., LEADING in PostgreSQL), but this is rarely necessary unless the optimiser is making a provably bad choice. Write JOINs in the logical relationship order for readability; trust the optimiser for physical ordering.</p>
      </IQ>

      <IQ q="How would you find the top-selling product for each store using INNER JOIN?">
        <p style={{ margin: '0 0 14px' }}>Finding the top seller per store is a "top N per group" problem. The approach requires computing revenue per (store, product) combination, then selecting the product with the highest revenue within each store group.</p>
        <p style={{ margin: '0 0 14px' }}>Step 1 — compute revenue per store per product: SELECT o.store_id, p.product_id, p.product_name, SUM(oi.line_total) AS revenue FROM orders AS o JOIN order_items AS oi ON o.order_id = oi.order_id JOIN products AS p ON oi.product_id = p.product_id WHERE o.order_status = 'Delivered' GROUP BY o.store_id, p.product_id, p.product_name. This gives one row per (store, product) pair with total revenue.</p>
        <p style={{ margin: 0 }}>Step 2 — select the top product per store. The cleanest approach uses ROW_NUMBER() window function: wrap Step 1 in a CTE or subquery, add ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY revenue DESC) AS rn, then filter WHERE rn = 1 in the outer query. This assigns rank 1 to the highest-revenue product within each store and returns only those. An alternative without window functions: join the Step 1 result to a subquery that finds MAX(revenue) per store, matching on both store_id and revenue = max_revenue. The ROW_NUMBER approach is cleaner and handles ties more explicitly (ROW_NUMBER picks one; DENSE_RANK preserves ties). Window functions are covered in depth in Module 45.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="JOIN returns 0 rows — both tables have data but nothing matches"
        cause="The ON condition references the wrong columns, uses mismatched data types, or the FK values in one table do not exist as PK values in the other. Common causes: joining on the wrong column (o.store_id = c.customer_id by mistake), type mismatch where one column is VARCHAR and the other is INTEGER, or the tables genuinely have no overlapping values (staging data that has not been linked yet)."
        fix="Test each table independently: SELECT DISTINCT customer_id FROM orders LIMIT 5 and SELECT customer_id FROM customers LIMIT 5 — confirm the values overlap. Check data types: SELECT pg_typeof(o.customer_id), pg_typeof(c.customer_id) FROM orders AS o, customers AS c LIMIT 1. If types differ, cast one: ON o.customer_id = c.customer_id::INTEGER. If no values overlap, investigate the data pipeline — FK values in the child table must exist in the parent table for INNER JOIN to return rows."
      />

      <Err
        msg="JOIN is correct but very slow — taking 30+ seconds on a medium table"
        cause="The join column on the looked-up table (the inner table) is not indexed. Without an index, each row from the outer table requires a full sequential scan of the inner table to find matches. On a 100,000-row table joined to a 10,000-row table without indexes, this means up to 100,000 × 10,000 = 1 billion comparisons in the worst case."
        fix="Add an index on the join column: CREATE INDEX idx_orders_customer_id ON orders(customer_id). For primary keys and unique columns, indexes already exist. Check with: SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'orders'. Use EXPLAIN ANALYZE to confirm the query plan shows Index Scan (fast) rather than Sequential Scan (slow) on the inner table. For very large tables, also consider composite indexes that cover both the join column and the most common WHERE columns."
      />

      <Err
        msg="Three-table JOIN returns wrong row count — far more rows than expected"
        cause="A many-to-many relationship in the join chain is creating a multiplicative fan-out. If orders join to order_items (one-to-many) AND order_items join to products (many-to-one), the result has one row per order-item-product combination — which may be more rows than you expected if you were thinking in terms of orders or products."
        fix="Always count rows at each JOIN step: add each JOIN one at a time and SELECT COUNT(*) after each one. When the count jumps unexpectedly, the last added JOIN is causing the fan-out. Examine the relationship: is it truly one-to-many? Does the ON condition match multiple rows? The solution is usually to aggregate one side before joining: pre-aggregate order_items to order-level totals, then join that aggregated result to orders — removing the item-level multiplication."
      />

      <Err
        msg="Column 'order_id' is ambiguous after joining orders and order_items"
        cause="Both orders and order_items have an order_id column. Without a table alias prefix, SELECT order_id is ambiguous — the database does not know which table's order_id you mean."
        fix="Always prefix columns with their table alias in multi-table queries: SELECT o.order_id, oi.order_id AS item_order_id. In practice, for a shared key column like order_id, you usually only need one copy: SELECT o.order_id — prefix with the alias of the table that owns the column as a PK. Establish the habit of prefixing every column reference with a table alias in any query involving JOINs — this prevents both ambiguity errors and confusion about which table a column comes from."
      />

      <Err
        msg="CTE join returns different results than expected — CTE seems to not filter correctly"
        cause="A filter inside the CTE is not behaving as expected, or the outer query's WHERE is conflicting with the CTE's logic. CTEs in PostgreSQL are not always inlined by the optimiser — they may be materialised (computed once, cached), which means subsequent filters in the outer query cannot be pushed into the CTE for optimisation. In some versions, the CTE materialises all its rows even if the outer query only needs a few."
        fix="Verify the CTE result independently: WITH my_cte AS (...) SELECT * FROM my_cte LIMIT 20. Confirm the CTE produces the expected rows. If the outer join to the CTE returns wrong results, check that the ON condition references the correct column names in the CTE (alias names, not original table names). In PostgreSQL 12+, use MATERIALIZED or NOT MATERIALIZED hints to control whether the CTE is inlined: WITH cte AS NOT MATERIALIZED (...) — NOT MATERIALIZED allows the optimiser to push filters into the CTE for better performance."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a query that produces a category performance report — one row per product category. Show: category, number of distinct products in that category, number of distinct orders that contained at least one product from that category, total units sold, total revenue (from order_items.line_total, rounded to 2 decimal places), average selling price (rounded to 2 decimal places), and the category's share of total delivered revenue as a percentage (rounded to 1 decimal place). Only include delivered orders. Sort by total revenue descending."
        hint="JOIN products → order_items → orders. WHERE order_status = 'Delivered'. GROUP BY category. For the revenue share percentage: SUM(line_total) / SUM(SUM(line_total)) OVER () * 100 — a window function over the GROUP BY result. COUNT(DISTINCT product_id) and COUNT(DISTINCT order_id) for the distinct counts."
        answer={`SELECT
  p.category,
  COUNT(DISTINCT p.product_id)                          AS distinct_products,
  COUNT(DISTINCT o.order_id)                            AS orders_with_category,
  SUM(oi.quantity)                                      AS total_units_sold,
  ROUND(SUM(oi.line_total), 2)                          AS total_revenue,
  ROUND(AVG(oi.unit_price), 2)                          AS avg_selling_price,
  ROUND(
    SUM(oi.line_total)
    / SUM(SUM(oi.line_total)) OVER () * 100
  , 1)                                                  AS revenue_share_pct
FROM products    AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders      AS o  ON oi.order_id  = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.category
ORDER BY total_revenue DESC;`}
        explanation="The three-table chain joins products to order_items (each item has a product) then to orders (each item belongs to an order). WHERE filters before grouping — only delivered order rows participate. GROUP BY category collapses all items within each category. COUNT(DISTINCT p.product_id) counts unique products in the category that were actually sold — not all products in the category. COUNT(DISTINCT o.order_id) counts distinct orders containing this category — not item rows. SUM(oi.line_total) is the correct revenue aggregate — summing item-level line totals, not the order-level total_amount which would fan-out. The revenue_share_pct uses a window function: SUM(SUM(oi.line_total)) OVER () computes the grand total across all categories after GROUP BY, letting us divide each category's total by the overall total without a separate subquery."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'INNER JOIN returns only rows where the ON condition matches in both tables. It is the default JOIN type — writing JOIN without a qualifier means INNER JOIN.',
          'Chain multiple JOINs sequentially — each JOIN adds one more table. Join in the logical relationship order: parent before child, following the FK path through the schema.',
          'The fan-out bug: joining a one-to-many relationship before aggregating inflates aggregate values. SUM(orders.total_amount) after joining to order_items triple-counts each order with three items.',
          'Prevent fan-out: SUM the many-side column (order_items.line_total), use COUNT(DISTINCT pk) for the one-side count, or pre-aggregate the many side in a CTE before joining.',
          'For INNER JOIN, filters in ON and WHERE produce identical results. By convention: join relationship conditions in ON, business filter conditions in WHERE.',
          'The right side of JOIN can be a subquery or CTE — join pre-aggregated or filtered data without base table constraints.',
          'Join columns on the looked-up table must be indexed for performance. Primary keys are always indexed. Add explicit indexes on FK columns for frequently-joined non-PK columns.',
          'Incremental build pattern: write base JOIN → SELECT COUNT(*) + LIMIT 5 spot-check → add WHERE → add GROUP BY → add HAVING. Never write the full complex query in one shot.',
          'Verify aggregates from JOIN queries against simpler single-table queries. The fan-out bug is silent — queries run without errors and return plausible but wrong numbers.',
          'CTEs make complex multi-JOIN queries readable by naming each analytical step. Each CTE is defined once and can be joined like a regular table in subsequent CTEs or the final SELECT.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 32</strong>, you learn LEFT and RIGHT JOINs in full depth — every pattern for keeping unmatched rows, the IS NULL filter idiom, optional relationships, and when to choose LEFT over INNER.
        </p>
        <Link href="/learn/sql/left-right-join" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 32 → LEFT and RIGHT JOIN
        </Link>
      </div>

    </LearnLayout>
  );
}