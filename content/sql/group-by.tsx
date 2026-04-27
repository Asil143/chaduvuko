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

export default function GroupBy() {
  return (
    <LearnLayout
      title="GROUP BY"
      description="Split rows into groups and compute aggregates per group — the engine behind every analytics report, dashboard metric, and business intelligence query"
      section="SQL — Module 28"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="From One Summary to Many — What GROUP BY Does" />

      <P>In Module 27 you learned aggregate functions — they collapse all rows into a single summary number. But most real business questions are not "what is the total revenue?" They are "what is the total revenue <Hl>per store</Hl>?" or "what is the average order value <Hl>per city</Hl>?" or "how many orders were placed <Hl>per month</Hl>?"</P>

      <P>GROUP BY is the clause that splits rows into groups before aggregating — so instead of one summary number for the whole table, you get one summary number per group. It is the difference between a company-wide total and a per-department breakdown. Between a product's average rating and a category's average rating.</P>

      <SQLPlayground
        initialQuery={`-- Without GROUP BY: one total for the whole table
SELECT
  COUNT(*)              AS total_orders,
  SUM(total_amount)     AS total_revenue
FROM orders
WHERE order_status = 'Delivered';`}
        height={115}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- With GROUP BY: one row per store, aggregates per store
SELECT
  store_id,
  COUNT(*)              AS order_count,
  ROUND(SUM(total_amount), 2)   AS store_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY store_revenue DESC;`}
        height={145}
        showSchema={false}
      />

      <P>Same table, same WHERE filter, same aggregate functions — but GROUP BY store_id splits the rows into one bucket per store and computes the aggregates separately for each bucket. The result is one row per store instead of one row total.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="How GROUP BY Works Internally" />

      <P>Understanding what the database does when it executes GROUP BY makes you write better GROUP BY queries — and explains every error you will encounter.</P>

      <H>The execution steps</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '20px 0 32px' }}>
        {[
          { n: '01', title: 'FROM', desc: 'Identify the source table(s)' },
          { n: '02', title: 'WHERE', desc: 'Filter individual rows — only matching rows proceed' },
          { n: '03', title: 'GROUP BY', desc: 'Split remaining rows into groups — one bucket per unique combination of GROUP BY columns' },
          { n: '04', title: 'HAVING', desc: 'Filter groups — discard groups that do not satisfy the HAVING condition' },
          { n: '05', title: 'SELECT', desc: 'Compute the output columns for each surviving group — aggregate functions run here' },
          { n: '06', title: 'ORDER BY', desc: 'Sort the group-level result rows' },
          { n: '07', title: 'LIMIT', desc: 'Truncate the sorted result' },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: i === arr.length - 1 ? 0 : 16 }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 2 ? C : `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i === 2 ? '#000' : C, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{step.n}</div>
              {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: i === 2 ? C : 'var(--text)', marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <P>The key insight: <Hl>GROUP BY runs before SELECT</Hl>. This is why you cannot use a SELECT alias in GROUP BY in standard SQL — the alias has not been computed yet when GROUP BY runs. It is also why aggregate functions appear in SELECT (step 5) and HAVING (step 4), but never in WHERE (step 2) — WHERE runs before groups are formed, so aggregates do not exist yet.</P>

      <H>What happens inside each group</H>
      <P>After GROUP BY, each group contains all rows that share the same value(s) in the GROUP BY column(s). SELECT then processes each group independently — the aggregate functions see only the rows belonging to that group. COUNT(*) counts the rows in that group. SUM(total_amount) adds up the total_amount values for that group. MIN and MAX find the extremes within that group.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="GROUP BY Single Column — The Foundation" />

      <H>Group by category</H>

      <SQLPlayground
        initialQuery={`-- Product count and average price per category
SELECT
  category,
  COUNT(*)                        AS product_count,
  ROUND(AVG(unit_price), 2)       AS avg_price,
  MIN(unit_price)                 AS cheapest,
  MAX(unit_price)                 AS most_expensive
FROM products
GROUP BY category
ORDER BY product_count DESC;`}
        height={165}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Orders per payment method — how customers prefer to pay
SELECT
  payment_method,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS total_revenue,
  ROUND(AVG(total_amount), 2)     AS avg_order_value
FROM orders
GROUP BY payment_method
ORDER BY order_count DESC;`}
        height={165}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customer count per city — where are FreshCart's customers?
SELECT
  city,
  COUNT(*)                        AS customer_count,
  COUNT(DISTINCT loyalty_tier)    AS tiers_present
FROM customers
GROUP BY city
ORDER BY customer_count DESC;`}
        height={145}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders per status — the operations dashboard summary
SELECT
  order_status,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS total_value,
  ROUND(AVG(total_amount), 2)     AS avg_value
FROM orders
GROUP BY order_status
ORDER BY order_count DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="GROUP BY Multiple Columns — Two-Dimensional Grouping" />

      <P>GROUP BY can list multiple columns. The database creates one group for each unique <Hl>combination</Hl> of all GROUP BY columns — not one group per unique value in each column independently.</P>

      <SQLPlayground
        initialQuery={`-- Orders per store per payment method
-- One row per (store_id, payment_method) pair
SELECT
  store_id,
  payment_method,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id, payment_method
ORDER BY store_id, revenue DESC;`}
        height={170}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Customers per city per loyalty tier
-- One row per (city, loyalty_tier) combination
SELECT
  city,
  loyalty_tier,
  COUNT(*)                        AS customer_count
FROM customers
GROUP BY city, loyalty_tier
ORDER BY city,
  CASE loyalty_tier
    WHEN 'Platinum' THEN 1
    WHEN 'Gold'     THEN 2
    WHEN 'Silver'   THEN 3
    ELSE 4
  END;`}
        height={190}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Product count per category per in_stock status
SELECT
  category,
  in_stock,
  COUNT(*)                        AS product_count,
  ROUND(AVG(unit_price), 2)       AS avg_price
FROM products
GROUP BY category, in_stock
ORDER BY category, in_stock DESC;`}
        height={155}
        showSchema={false}
      />

      <H>The key rule — every non-aggregate SELECT column must be in GROUP BY</H>

      <CodeBlock
        label="The GROUP BY rule — every non-aggregate must be grouped"
        code={`-- WRONG: store_name is in SELECT but not in GROUP BY
SELECT store_id, store_name, COUNT(*)
FROM orders
JOIN stores ON orders.store_id = stores.store_id
GROUP BY store_id;
-- ERROR: column "stores.store_name" must appear in GROUP BY
-- or be used in an aggregate function

-- RIGHT: include all non-aggregate columns in GROUP BY
SELECT store_id, store_name, COUNT(*)
FROM orders
JOIN stores ON orders.store_id = stores.store_id
GROUP BY store_id, store_name;

-- Or aggregate store_name (rarely needed):
SELECT store_id, MIN(store_name) AS store_name, COUNT(*)
FROM orders
JOIN stores ON orders.store_id = stores.store_id
GROUP BY store_id;`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="GROUP BY with WHERE — Filter Before Grouping" />

      <P>WHERE filters rows <Hl>before</Hl> GROUP BY processes them. Only rows that pass the WHERE condition are included in any group. This is the most efficient way to filter — rows excluded by WHERE never participate in grouping or aggregation.</P>

      <SQLPlayground
        initialQuery={`-- Revenue per store for DELIVERED orders only
-- WHERE filters first, then GROUP BY processes surviving rows
SELECT
  o.store_id,
  s.city,
  COUNT(o.order_id)               AS delivered_orders,
  ROUND(SUM(o.total_amount), 2)   AS delivered_revenue
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'   -- filter BEFORE grouping
GROUP BY o.store_id, s.city
ORDER BY delivered_revenue DESC;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product metrics for in-stock items only
SELECT
  category,
  COUNT(*)                        AS in_stock_count,
  ROUND(AVG(unit_price), 2)       AS avg_price,
  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 1) AS avg_margin_pct
FROM products
WHERE in_stock = true             -- filter before grouping
GROUP BY category
ORDER BY avg_margin_pct DESC;`}
        height={170}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employee salary stats per department — management dept only
SELECT
  department,
  role,
  COUNT(*)                        AS headcount,
  MIN(salary)                     AS min_salary,
  MAX(salary)                     AS max_salary,
  ROUND(AVG(salary), 0)           AS avg_salary
FROM employees
WHERE hire_date >= '2020-01-01'   -- only employees hired from 2020 onwards
GROUP BY department, role
ORDER BY department, avg_salary DESC;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="GROUP BY with Expressions — Grouping on Computed Values" />

      <P>GROUP BY does not have to group by raw column values. You can group by any expression — a calculated value, a date part, a CASE WHEN classification. This is how you group by month, by price band, by day of week, or by any computed category.</P>

      <H>Grouping by date parts</H>

      <SQLPlayground
        initialQuery={`-- Orders per month — group by the month extracted from order_date
SELECT
  EXTRACT(YEAR  FROM order_date)  AS year,
  EXTRACT(MONTH FROM order_date)  AS month,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS monthly_revenue,
  ROUND(AVG(total_amount), 2)     AS avg_order_value
FROM orders
WHERE order_status = 'Delivered'
GROUP BY
  EXTRACT(YEAR  FROM order_date),
  EXTRACT(MONTH FROM order_date)
ORDER BY year, month;`}
        height={205}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Orders per day of week (1=Sunday...7=Saturday in DuckDB)
SELECT
  EXTRACT(DOW FROM order_date)    AS day_of_week,
  COUNT(*)                        AS order_count,
  ROUND(AVG(total_amount), 2)     AS avg_order_value
FROM orders
GROUP BY EXTRACT(DOW FROM order_date)
ORDER BY day_of_week;`}
        height={155}
        showSchema={false}
      />

      <H>Grouping by CASE WHEN — custom bands</H>

      <SQLPlayground
        initialQuery={`-- Group orders into value tiers
SELECT
  CASE
    WHEN total_amount >= 2000 THEN 'Premium (₹2000+)'
    WHEN total_amount >= 800  THEN 'Standard (₹800-1999)'
    WHEN total_amount >= 300  THEN 'Basic (₹300-799)'
    ELSE 'Micro (<₹300)'
  END                             AS order_tier,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS tier_revenue,
  ROUND(AVG(total_amount), 2)     AS avg_in_tier
FROM orders
GROUP BY
  CASE
    WHEN total_amount >= 2000 THEN 'Premium (₹2000+)'
    WHEN total_amount >= 800  THEN 'Standard (₹800-1999)'
    WHEN total_amount >= 300  THEN 'Basic (₹300-799)'
    ELSE 'Micro (<₹300)'
  END
ORDER BY avg_in_tier DESC;`}
        height={240}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Group employees by salary band
SELECT
  CASE
    WHEN salary >= 70000 THEN 'Senior (₹70k+)'
    WHEN salary >= 50000 THEN 'Mid (₹50k-70k)'
    WHEN salary >= 35000 THEN 'Junior (₹35k-50k)'
    ELSE 'Entry (<₹35k)'
  END                             AS salary_band,
  COUNT(*)                        AS headcount,
  ROUND(AVG(salary), 0)           AS avg_salary,
  SUM(salary)                     AS total_payroll
FROM employees
GROUP BY
  CASE
    WHEN salary >= 70000 THEN 'Senior (₹70k+)'
    WHEN salary >= 50000 THEN 'Mid (₹50k-70k)'
    WHEN salary >= 35000 THEN 'Junior (₹35k-50k)'
    ELSE 'Entry (<₹35k)'
  END
ORDER BY avg_salary DESC;`}
        height={235}
        showSchema={false}
      />

      <Callout type="info">
        In MySQL and DuckDB (this playground), you can use a SELECT alias in GROUP BY: GROUP BY order_tier. In PostgreSQL, this is not allowed — the standard requires repeating the full expression. For portability, always repeat the expression in GROUP BY. If the expression is very long and repetition feels painful, use a CTE or subquery to define the group column first.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="GROUP BY with JOIN — Multi-Table Aggregation" />

      <P>The most powerful GROUP BY queries join multiple tables before grouping — bringing together data from customers, orders, products, and stores, then aggregating the combined result.</P>

      <SQLPlayground
        initialQuery={`-- Revenue, orders, and unique customers per store city
SELECT
  s.city,
  COUNT(DISTINCT o.order_id)      AS total_orders,
  COUNT(DISTINCT o.customer_id)   AS unique_customers,
  ROUND(SUM(o.total_amount), 2)   AS total_revenue,
  ROUND(AVG(o.total_amount), 2)   AS avg_order_value,
  s.monthly_target,
  ROUND(SUM(o.total_amount) / s.monthly_target * 100, 1) AS pct_of_target
FROM stores AS s
LEFT JOIN orders AS o
  ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.city, s.monthly_target
ORDER BY total_revenue DESC NULLS LAST;`}
        height={230}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Top product categories by units sold and revenue
SELECT
  p.category,
  COUNT(DISTINCT oi.order_id)     AS orders_with_category,
  SUM(oi.quantity)                AS total_units_sold,
  ROUND(SUM(oi.line_total), 2)    AS total_revenue,
  ROUND(AVG(oi.unit_price), 2)    AS avg_selling_price,
  COUNT(DISTINCT p.product_id)    AS distinct_products
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders AS o      ON oi.order_id   = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.category
ORDER BY total_revenue DESC;`}
        height={215}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customer order behaviour by loyalty tier
SELECT
  c.loyalty_tier,
  COUNT(DISTINCT c.customer_id)   AS customers_in_tier,
  COUNT(o.order_id)               AS total_orders,
  ROUND(SUM(o.total_amount), 2)   AS total_revenue,
  ROUND(AVG(o.total_amount), 2)   AS avg_order_value,
  ROUND(COUNT(o.order_id)::DECIMAL
        / COUNT(DISTINCT c.customer_id), 1) AS orders_per_customer
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.loyalty_tier
ORDER BY
  CASE c.loyalty_tier
    WHEN 'Platinum' THEN 1
    WHEN 'Gold'     THEN 2
    WHEN 'Silver'   THEN 3
    ELSE 4
  END;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="NULL Values in GROUP BY" />

      <P>Unlike most SQL contexts where NULL ≠ NULL, GROUP BY treats all NULL values as a single group. All rows with NULL in the GROUP BY column(s) are placed together in one NULL group. This is consistent with the DISTINCT behaviour you learned in Module 10.</P>

      <SQLPlayground
        initialQuery={`-- Group by sub_category — which includes NULL (products without sub-category)
-- NULL sub_category rows form their own group
SELECT
  sub_category,
  COUNT(*)                        AS product_count,
  ROUND(AVG(unit_price), 2)       AS avg_price
FROM products
GROUP BY sub_category
ORDER BY product_count DESC;`}
        height={155}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees grouped by store_id — head office employees have NULL store_id
SELECT
  store_id,
  COUNT(*)                        AS employee_count,
  ROUND(AVG(salary), 0)           AS avg_salary,
  SUM(salary)                     AS total_payroll
FROM employees
GROUP BY store_id
ORDER BY store_id NULLS LAST;`}
        height={155}
        showSchema={false}
      />

      <P>The NULL group is a valid group — it gets its own aggregate row just like any other group. If you want to exclude the NULL group from results, add WHERE column IS NOT NULL before the GROUP BY. If you want to label the NULL group, use COALESCE in the GROUP BY expression.</P>

      <SQLPlayground
        initialQuery={`-- Label the NULL store as 'Head Office'
SELECT
  COALESCE(store_id, 'Head Office')   AS store,
  COUNT(*)                            AS employee_count,
  ROUND(AVG(salary), 0)               AS avg_salary
FROM employees
GROUP BY COALESCE(store_id, 'Head Office')
ORDER BY store;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="ROLLUP — Subtotals and Grand Totals" />

      <P>ROLLUP is an extension of GROUP BY that automatically generates subtotals and a grand total. It is used heavily in reporting — the kind of hierarchical totals you see in Excel pivot tables.</P>

      <CodeBlock
        label="ROLLUP syntax"
        code={`-- Standard GROUP BY: one row per group
GROUP BY store_id, payment_method

-- ROLLUP: rows per group + subtotals + grand total
GROUP BY ROLLUP(store_id, payment_method)

-- This generates:
-- One row per (store_id, payment_method) combination
-- One subtotal row per store_id (NULL for payment_method)
-- One grand total row (NULL for both store_id and payment_method)`}
      />

      <SQLPlayground
        initialQuery={`-- Revenue with subtotals per store and grand total
-- NULL in store_id = subtotal/grand total row
SELECT
  COALESCE(store_id, 'ALL STORES') AS store,
  COALESCE(payment_method, 'ALL METHODS') AS payment,
  COUNT(*)                          AS order_count,
  ROUND(SUM(total_amount), 2)       AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY ROLLUP(store_id, payment_method)
ORDER BY store, payment;`}
        height={190}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Performance — How GROUP BY Uses Indexes" />

      <P>GROUP BY performance on large tables depends on whether the database can use indexes to avoid sorting all rows.</P>

      <H>How the database executes GROUP BY</H>
      <P>To group rows, the database must find all rows with the same GROUP BY value and put them together. Two approaches: <Hl>Sort-based grouping</Hl> — sort all rows by the GROUP BY columns, then scan sequentially (identical values are adjacent after sorting). Or <Hl>Hash-based grouping</Hl> — compute a hash of each row's GROUP BY values and bucket rows into a hash table. Hash-based is usually faster when the number of groups is manageable in memory.</P>

      <H>When indexes help GROUP BY</H>
      <P>If the GROUP BY column(s) are indexed and the query also filters by those columns, the database can use the index to avoid a full sort. For very selective GROUP BY (few groups), a partial scan of the index can be faster than processing all rows. For GROUP BY on the primary key or a unique column, each group has exactly one row — effectively no grouping needed.</P>

      <H>Practical performance guidance</H>

      <CodeBlock
        label="GROUP BY performance patterns"
        code={`-- FAST: GROUP BY on an indexed column with selective WHERE
SELECT store_id, COUNT(*), SUM(total_amount)
FROM orders
WHERE order_date >= '2024-01-01'  -- filtered by indexed date column
GROUP BY store_id;

-- FAST: GROUP BY on low-cardinality column (few distinct values)
-- 'order_status' has 4 values — hash grouping is trivial
SELECT order_status, COUNT(*), SUM(total_amount)
FROM orders
GROUP BY order_status;

-- SLOWER: GROUP BY on high-cardinality column, no filtering
-- customer_id has 20 distinct values here but in production could be millions
SELECT customer_id, COUNT(*)
FROM orders
GROUP BY customer_id;
-- On millions of rows: needs full sort or large hash table

-- OPTIMIZATION: filter with WHERE first to reduce rows before grouping
SELECT customer_id, COUNT(*)
FROM orders
WHERE order_date >= '2024-03-01'  -- process only recent rows
GROUP BY customer_id;`}
      />

      <ProTip>
        The most impactful GROUP BY optimisation: ensure a strong WHERE clause filters rows before GROUP BY processes them. A GROUP BY that runs on 10,000 rows after WHERE filtering is 100x faster than running on 1,000,000 rows without filtering. Always think of WHERE as the pre-filter that determines how much work GROUP BY has to do.
      </ProTip>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Complete Analytics Examples — Real Business Reports" />

      <P>These are the types of GROUP BY queries you will write in real analytics work — complete, production-quality reports.</P>

      <H>Monthly revenue trend</H>

      <SQLPlayground
        initialQuery={`-- Month-by-month revenue trend with growth metrics
SELECT
  EXTRACT(YEAR  FROM order_date)              AS year,
  EXTRACT(MONTH FROM order_date)              AS month,
  COUNT(*)                                    AS orders,
  ROUND(SUM(total_amount), 2)                 AS revenue,
  ROUND(AVG(total_amount), 2)                 AS avg_order,
  COUNT(DISTINCT customer_id)                 AS unique_customers
FROM orders
WHERE order_status = 'Delivered'
GROUP BY
  EXTRACT(YEAR  FROM order_date),
  EXTRACT(MONTH FROM order_date)
ORDER BY year, month;`}
        height={210}
        showSchema={true}
      />

      <H>Product performance report</H>

      <SQLPlayground
        initialQuery={`-- Full product performance: sales, revenue, margin
SELECT
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  COUNT(DISTINCT oi.order_id)                 AS times_ordered,
  SUM(oi.quantity)                            AS units_sold,
  ROUND(SUM(oi.line_total), 2)                AS total_revenue,
  ROUND(SUM(oi.quantity * (oi.unit_price - p.cost_price)), 2) AS gross_profit,
  ROUND(
    SUM(oi.quantity * (oi.unit_price - p.cost_price))
    / NULLIF(SUM(oi.line_total), 0) * 100
  , 1)                                        AS margin_pct
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.product_id, p.product_name, p.category, p.brand, p.unit_price, p.cost_price
ORDER BY gross_profit DESC;`}
        height={255}
        showSchema={false}
      />

      <H>Customer RFM summary (Recency, Frequency, Monetary)</H>

      <SQLPlayground
        initialQuery={`-- RFM analysis: how recently, how often, how much per customer
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name         AS customer,
  c.loyalty_tier,
  MAX(o.order_date)                           AS last_order_date,
  CURRENT_DATE - MAX(o.order_date)            AS days_since_last_order,
  COUNT(o.order_id)                           AS order_frequency,
  ROUND(SUM(o.total_amount), 2)               AS total_spend,
  ROUND(AVG(o.total_amount), 2)               AS avg_order_value
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
ORDER BY total_spend DESC NULLS LAST;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are a data analyst at PhonePe. The product team is reviewing payment method adoption across different merchant categories. They need a breakdown of transaction volume and value by payment method and merchant type — a two-dimensional GROUP BY report.</P>

      <TimeBlock time="2:00 PM" label="Request arrives">
        The product manager needs: for each combination of payment method and merchant category, show the transaction count, total value, average transaction size, and the percentage of total transactions. This is a multi-column GROUP BY with percentage calculations.
      </TimeBlock>

      <TimeBlock time="2:15 PM" label="You build the query (adapted for FreshCart)">
        Adapted to FreshCart: payment method × product category breakdown.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Payment method adoption by product category
-- Two-dimensional GROUP BY with percentage of total
SELECT
  p.category,
  o.payment_method,
  COUNT(DISTINCT o.order_id)                  AS order_count,
  ROUND(SUM(oi.line_total), 2)                AS category_payment_revenue,
  ROUND(AVG(o.total_amount), 2)               AS avg_order_value,
  -- Percentage of total orders (all categories, all methods)
  ROUND(
    COUNT(DISTINCT o.order_id) * 100.0
    / SUM(COUNT(DISTINCT o.order_id)) OVER ()
  , 1)                                        AS pct_of_total_orders
FROM orders AS o
JOIN order_items AS oi ON o.order_id  = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
GROUP BY p.category, o.payment_method
ORDER BY p.category, order_count DESC;`}
        height={250}
        showSchema={true}
      />

      <TimeBlock time="2:40 PM" label="Report delivered">
        The product manager immediately spots that COD (Cash on Delivery) is disproportionately high for Staples orders — customers trust FreshCart enough to pay digitally for premium products but default to COD for everyday groceries. This insight drives a new COD-to-digital conversion campaign targeting staple product orders.
      </TimeBlock>

      <ProTip>
        Two-dimensional GROUP BY queries (grouping by two columns) are the foundation of every business pivot table. The moment you find yourself wanting to see "X by Y" in a report — revenue by city by month, orders by payment method by product category, customers by tier by city — that is a GROUP BY with two columns. Learn to read business questions and immediately translate "X by Y" to GROUP BY x, y.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does GROUP BY do and how does it relate to aggregate functions?">
        <p style={{ margin: '0 0 14px' }}>GROUP BY divides rows into groups based on one or more columns, so that aggregate functions (COUNT, SUM, AVG, MIN, MAX) compute separately for each group rather than across all rows. Without GROUP BY, an aggregate function returns one value for the entire result set. With GROUP BY, it returns one value per group — one row per unique combination of GROUP BY column values.</p>
        <p style={{ margin: '0 0 14px' }}>The relationship is fundamental: aggregate functions and GROUP BY are designed to work together. GROUP BY defines the groups; aggregate functions compute statistics for each group. SELECT COUNT(*), SUM(total_amount) FROM orders returns one summary row. SELECT store_id, COUNT(*), SUM(total_amount) FROM orders GROUP BY store_id returns one summary row per store — the aggregates are computed independently within each store's group of rows.</p>
        <p style={{ margin: 0 }}>The execution order is critical: GROUP BY runs after WHERE (which filters individual rows before grouping) but before SELECT (which computes the output columns including aggregates). This means: WHERE filters which rows participate in groups; GROUP BY determines the groups; SELECT aggregates within each group. Because GROUP BY runs before SELECT, you cannot use SELECT aliases in GROUP BY in standard SQL — the aliases do not exist yet. And because WHERE runs before GROUP BY, you cannot filter groups using WHERE — that requires HAVING, which runs after GROUP BY.</p>
      </IQ>

      <IQ q="What is the rule about non-aggregate columns in GROUP BY queries?">
        <p style={{ margin: '0 0 14px' }}>Every column in the SELECT list of a GROUP BY query must be either (1) listed in the GROUP BY clause, or (2) wrapped in an aggregate function. This is the fundamental rule of grouped queries and it follows directly from what GROUP BY does.</p>
        <p style={{ margin: '0 0 14px' }}>The reason: after GROUP BY, each group is collapsed into one output row. A non-aggregate column like first_name might have different values within a group — if you group by city, one Bangalore group might contain customers named Aisha, Rahul, and Priya. The database cannot return a single first_name for this group because there is no single value. It can only return values that are the same for every row in the group (the GROUP BY columns themselves) or computed aggregate values that reduce the group to one number.</p>
        <p style={{ margin: 0 }}>PostgreSQL and most standard SQL databases enforce this strictly — a non-aggregate, non-GROUP BY column in SELECT throws an error. MySQL with sql_mode not including ONLY_FULL_GROUP_BY was historically more permissive — it would pick an arbitrary value from the group for non-aggregate columns, which is usually wrong and unpredictable. This is why MySQL queries sometimes appear to "work" without proper GROUP BY usage, but return unreliable results. Always follow the rule: every SELECT column is either in GROUP BY or in an aggregate function.</p>
      </IQ>

      <IQ q="What is the difference between WHERE and HAVING in a GROUP BY query?">
        <p style={{ margin: '0 0 14px' }}>WHERE and HAVING both filter data, but they operate at different stages of the GROUP BY execution pipeline and on different things. WHERE filters individual rows before groups are formed — it determines which rows participate in grouping. HAVING filters groups after they have been formed and aggregated — it determines which groups appear in the final result.</p>
        <p style={{ margin: '0 0 14px' }}>Concrete example: to find stores with more than 3 delivered orders. WHERE order_status = 'Delivered' filters individual orders to include only delivered ones. HAVING COUNT(*) {'>'} 3 filters store groups to include only stores that have more than 3 delivered orders. Both conditions are necessary: WHERE selects which orders count, HAVING selects which stores qualify. Using WHERE COUNT(*) {'>'} 3 is an error — WHERE runs before grouping, so aggregate results do not exist yet when WHERE evaluates.</p>
        <p style={{ margin: 0 }}>Performance implication: WHERE filtering is almost always more efficient than HAVING filtering for the same condition. WHERE filters rows before they enter the grouping process — fewer rows means less grouping work. HAVING filters after all the grouping and aggregation is done — the work was already performed on the excluded groups. The rule: use WHERE for any condition that can be expressed on individual row values. Use HAVING only for conditions that require aggregate values (COUNT {'>'} N, SUM {'>'} value, AVG {'>'} threshold). Moving a filter from HAVING to WHERE (when the logic allows it) can dramatically improve query performance.</p>
      </IQ>

      <IQ q="How does GROUP BY handle NULL values?">
        <p style={{ margin: '0 0 14px' }}>GROUP BY treats all NULL values in a GROUP BY column as belonging to the same group — all rows with NULL in the GROUP BY column are placed together in a single NULL group. This is different from WHERE and JOIN conditions, where NULL ≠ NULL. For grouping purposes, the database considers NULLs to be equal to each other.</p>
        <p style={{ margin: '0 0 14px' }}>This means a GROUP BY query on a nullable column will produce a row in the result for the NULL group, alongside rows for each non-null distinct value. GROUP BY department from employees might produce rows for 'Management', 'Operations', 'Sales', and NULL — the NULL row represents all employees without a department assignment. The aggregate functions compute normally for the NULL group: COUNT(*) counts all NULL-department employees, SUM(salary) adds their salaries.</p>
        <p style={{ margin: 0 }}>If you want to exclude the NULL group from results, add WHERE column IS NOT NULL before the GROUP BY — this filters out NULL rows before they can form a group. If you want to give the NULL group a meaningful label in the output, use COALESCE in the GROUP BY expression: GROUP BY COALESCE(department, 'Unassigned') also changes the group value to 'Unassigned' in the SELECT output. Note that grouping by COALESCE(department, 'Unassigned') and department = 'Unassigned' are different: the COALESCE version groups NULLs and actual 'Unassigned' values together, while grouping by the raw column keeps them separate (though in practice, both should not exist in a well-constrained schema).</p>
      </IQ>

      <IQ q="You need to find the top-selling product in each category. How do you approach this with GROUP BY?">
        <p style={{ margin: '0 0 14px' }}>A basic GROUP BY can find the maximum sales value per category: SELECT category, MAX(units_sold) FROM product_sales GROUP BY category. But this only returns the maximum value — not which product achieved it. To find the specific product name alongside the maximum, you need to join the GROUP BY result back to the original data or use a different approach.</p>
        <p style={{ margin: '0 0 14px' }}>Approach 1 — subquery: SELECT p.category, p.product_name, ps.units_sold FROM product_sales ps JOIN products p ON ... WHERE (p.category, ps.units_sold) IN (SELECT p2.category, MAX(ps2.units_sold) FROM product_sales ps2 JOIN products p2 ON ... GROUP BY p2.category). This finds the product where the (category, units_sold) pair matches the maximum units_sold for that category.</p>
        <p style={{ margin: 0 }}>Approach 2 — window functions (the modern approach): SELECT DISTINCT ON (category) category, product_name, units_sold FROM product_sales ORDER BY category, units_sold DESC. In PostgreSQL, DISTINCT ON returns the first row per category after sorting by units_sold descending — effectively the top product per category. The even cleaner approach using ROW_NUMBER(): SELECT category, product_name, units_sold FROM (SELECT category, product_name, units_sold, ROW_NUMBER() OVER (PARTITION BY category ORDER BY units_sold DESC) AS rn FROM product_sales) ranked WHERE rn = 1. This ranks products within each category and selects only rank 1 — the top seller. Window functions (Module 45) are the professional solution for "top N per group" queries.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'first_name' must appear in GROUP BY or be used in an aggregate function"
        cause="A column in SELECT is neither inside an aggregate function nor listed in the GROUP BY clause. When GROUP BY is used, every GROUP BY row represents multiple source rows collapsed into one. A non-aggregate column could have different values across those source rows — the database cannot determine a single value to return, so it refuses the query."
        fix="Add the column to GROUP BY: GROUP BY store_id, first_name. Or wrap it in an aggregate: SELECT MAX(first_name) AS name (picks one value from the group). Or remove it from SELECT if it is not needed. In analytics queries, the most common fix is adding all descriptive columns (name, city, status) to GROUP BY alongside the grouping key."
      />

      <Err
        msg="GROUP BY returns more rows than expected — expected one row per store but got many"
        cause="The GROUP BY columns have more unique combinations than expected — often because a JOIN introduced extra rows that created new unique combinations, or because a column you thought was a one-to-one with the GROUP BY key actually varies. For example, grouping by store_id and store_name should give one row per store, but if store_name has trailing whitespace in some rows ('Bangalore ' vs 'Bangalore'), it creates two distinct groups."
        fix="Inspect the GROUP BY columns: SELECT store_id, store_name, COUNT(*) FROM stores GROUP BY store_id, store_name — if this returns more than one row per store_id, there are inconsistent store_name values. Fix the data (TRIM whitespace, normalise capitalisation) or group only by the primary key (store_id) and use MIN(store_name) or MAX(store_name) to get a single name per group in SELECT."
      />

      <Err
        msg="WHERE clause on aggregate result fails — WHERE COUNT(*) > 3 gives syntax error"
        cause="You tried to use an aggregate function in WHERE. WHERE executes before GROUP BY in the logical order — aggregate values do not exist yet when WHERE runs. WHERE evaluates row-by-row before any grouping occurs, so it cannot reference aggregated values."
        fix="Move the aggregate condition to HAVING, which runs after GROUP BY: GROUP BY store_id HAVING COUNT(*) > 3. HAVING filters groups after they have been formed and aggregated. Use WHERE for conditions on individual row values (column = value, column > threshold), and HAVING for conditions on aggregate results (COUNT(*) > N, SUM(amount) > value, AVG(rating) >= 4.0)."
      />

      <Err
        msg="GROUP BY query gives wrong totals when joining tables — revenue is inflated"
        cause="A many-to-many or one-to-many join multiplied rows before aggregation. If orders are joined to order_items (one order → many items), each order row is duplicated for every item. SUM(orders.total_amount) then adds the total_amount multiple times — once per item in the order. This is called a fan-out bug and is one of the most common data quality issues in analytics queries."
        fix="Aggregate at the correct level before joining. For order-level metrics (total_amount), aggregate in orders first. For item-level metrics (line_total, quantity), aggregate in order_items. Use subqueries or CTEs to pre-aggregate one side of the join: WITH order_totals AS (SELECT order_id, SUM(line_total) AS total FROM order_items GROUP BY order_id) then join order_totals to orders. Or use COUNT(DISTINCT order_id) instead of COUNT(*) to deduplicate after a fan-out join."
      />

      <Err
        msg="GROUP BY expression query works in MySQL but fails in PostgreSQL"
        cause="You used a SELECT alias in GROUP BY: SELECT EXTRACT(MONTH FROM order_date) AS month FROM orders GROUP BY month. MySQL and DuckDB allow GROUP BY to reference SELECT aliases. PostgreSQL follows the SQL standard strictly — GROUP BY runs before SELECT, so aliases are not yet defined when GROUP BY executes."
        fix="Repeat the full expression in GROUP BY: GROUP BY EXTRACT(MONTH FROM order_date). For complex expressions that are painful to repeat, use a subquery or CTE: WITH monthly AS (SELECT EXTRACT(MONTH FROM order_date) AS month, total_amount FROM orders) SELECT month, SUM(total_amount) FROM monthly GROUP BY month. The CTE defines the alias first, making it available for GROUP BY in the outer query."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart management team needs a store performance summary for their Q1 2024 review (January through March 2024). Write a GROUP BY query that shows for each store: store_id, city, total delivered orders, unique customers served, total delivered revenue (rounded to 2 decimal places), average order value (rounded to 2 decimal places), fastest delivery in days, and a performance_band column using CASE: 'Star' if revenue above ₹3,000, 'Good' if above ₹1,500, 'Needs Support' otherwise. Only include stores that had at least 1 delivered order. Sort by total revenue descending."
        hint="JOIN stores to orders. WHERE for Q1 2024 date range AND order_status = 'Delivered'. GROUP BY store_id and city. HAVING COUNT(*) >= 1 (or just let the join naturally exclude stores with no orders). CASE on SUM(total_amount) for the band."
        answer={`SELECT
  s.store_id,
  s.city,
  COUNT(o.order_id)                          AS delivered_orders,
  COUNT(DISTINCT o.customer_id)              AS unique_customers,
  ROUND(SUM(o.total_amount), 2)              AS total_revenue,
  ROUND(AVG(o.total_amount), 2)              AS avg_order_value,
  MIN(o.delivery_date - o.order_date)        AS fastest_delivery_days,
  CASE
    WHEN SUM(o.total_amount) > 3000 THEN 'Star'
    WHEN SUM(o.total_amount) > 1500 THEN 'Good'
    ELSE 'Needs Support'
  END                                        AS performance_band
FROM stores AS s
JOIN orders AS o
  ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
  AND o.order_date BETWEEN '2024-01-01' AND '2024-03-31'
GROUP BY s.store_id, s.city
ORDER BY total_revenue DESC;`}
        explanation="The JOIN brings store details alongside order data. WHERE filters to only delivered Q1 orders before grouping — both conditions applied before GROUP BY processes any rows. GROUP BY s.store_id, s.city follows the rule: both non-aggregate SELECT columns must be in GROUP BY. The CASE on SUM(total_amount) in SELECT is valid — aggregates are computed at SELECT time (after GROUP BY), so the CASE can reference them. The HAVING clause was not needed here because the INNER JOIN naturally excludes stores with no matching orders. If using LEFT JOIN to show all stores including those with no Q1 orders, you would need HAVING COUNT(o.order_id) >= 1 to exclude zero-order stores from the result."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'GROUP BY splits rows into groups based on column values, then aggregate functions compute separately per group. One output row per unique combination of GROUP BY column values.',
          'Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. GROUP BY runs before SELECT — SELECT aliases cannot be used in GROUP BY in standard SQL.',
          'Every non-aggregate column in SELECT must appear in GROUP BY. Aggregate columns (COUNT, SUM, AVG) do not need to be in GROUP BY — they compute per group automatically.',
          'WHERE filters individual rows BEFORE grouping. HAVING filters groups AFTER grouping. Use WHERE for row-level conditions; use HAVING only for conditions on aggregate results.',
          'GROUP BY on multiple columns creates one group per unique combination. GROUP BY city, loyalty_tier creates one group per (city, tier) pair — potentially many groups.',
          'GROUP BY on expressions (EXTRACT(MONTH FROM date), CASE WHEN salary >= 70000) groups by computed values. Repeat the full expression in GROUP BY — do not rely on aliases.',
          'GROUP BY treats NULLs as a single group — all NULL rows in the GROUP BY column form one group. Use WHERE col IS NOT NULL to exclude or COALESCE to rename the NULL group.',
          'Fan-out bug: joining a one-to-many relationship before aggregating inflates counts. Pre-aggregate in a subquery or CTE, or use COUNT(DISTINCT key) to deduplicate.',
          'ROLLUP extends GROUP BY to add subtotals and grand totals automatically — one row per group, plus subtotal rows for each partial combination, plus one grand total row.',
          'The most impactful performance optimisation: filter aggressively with WHERE before GROUP BY. Reducing rows before grouping is the single biggest lever for GROUP BY query speed.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 29</strong>, you learn HAVING — the clause that filters groups after aggregation, completing the WHERE + GROUP BY + HAVING triad that powers every analytical query.
        </p>
        <Link href="/learn/sql/having" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 29 → HAVING
        </Link>
      </div>

    </LearnLayout>
  );
}