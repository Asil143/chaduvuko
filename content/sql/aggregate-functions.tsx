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

const AggCard = ({ name, color, purpose, syntax, nulls, use }: {
  name: string; color: string; purpose: string;
  syntax: string; nulls: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color }}>{name}()</span>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{purpose}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Syntax</p>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color, margin: 0 }}>{syntax}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>NULL handling</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{nulls}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use for</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{use}</p>
      </div>
    </div>
  </div>
);

export default function AggregateFunctions() {
  return (
    <LearnLayout
      title="Aggregate Functions"
      description="COUNT, SUM, AVG, MIN, MAX — turn raw rows into business metrics, understand NULL behaviour, combine with DISTINCT, and build the analytics queries that power every dashboard"
      section="SQL — Module 27"
      readTime="12–16 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="From Rows to Metrics — What Aggregation Does" />

      <P>Every query you have written so far returns individual rows — one row per customer, one row per order, one row per product. Aggregate functions change this completely. They collapse many rows into a single computed value — the count of all orders, the total revenue for a month, the average order value, the most expensive product.</P>

      <P>This is the moment SQL becomes the language of analytics. Every dashboard metric, every KPI report, every business intelligence query is built on aggregate functions. How many active users? What is our daily revenue? What is the average delivery time? Which product has the highest margin? All of these are aggregate questions — and aggregate functions answer them.</P>

      <P>SQL provides five core aggregate functions:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, margin: '20px 0 32px' }}>
        {[
          { fn: 'COUNT()', color: C, desc: 'How many rows?' },
          { fn: 'SUM()', color: '#00e676', desc: 'What is the total?' },
          { fn: 'AVG()', color: '#f97316', desc: 'What is the average?' },
          { fn: 'MIN()', color: '#8b5cf6', desc: 'What is the smallest?' },
          { fn: 'MAX()', color: '#f59e0b', desc: 'What is the largest?' },
        ].map(item => (
          <div key={item.fn} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.fn}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Five Aggregate Functions — Reference" />

      <AggCard
        name="COUNT"
        color={C}
        purpose="— count rows or non-null values"
        syntax="COUNT(*) | COUNT(col) | COUNT(DISTINCT col)"
        nulls="COUNT(*) counts all rows including NULLs. COUNT(col) excludes NULL values."
        use="Number of orders, customers, products, transactions"
      />
      <AggCard
        name="SUM"
        color="#00e676"
        purpose="— total of numeric values"
        syntax="SUM(column) | SUM(expression)"
        nulls="Ignores NULL values. SUM of all NULLs returns NULL (not 0)."
        use="Total revenue, total quantity sold, total salary budget"
      />
      <AggCard
        name="AVG"
        color="#f97316"
        purpose="— arithmetic mean"
        syntax="AVG(column) | AVG(expression)"
        nulls="Ignores NULL values. AVG over all NULLs returns NULL."
        use="Average order value, average delivery days, average rating"
      />
      <AggCard
        name="MIN"
        color="#8b5cf6"
        purpose="— smallest value"
        syntax="MIN(column)"
        nulls="Ignores NULL values. Works on numbers, text (alphabetical), and dates."
        use="Cheapest product, first order date, lowest salary"
      />
      <AggCard
        name="MAX"
        color="#f59e0b"
        purpose="— largest value"
        syntax="MAX(column)"
        nulls="Ignores NULL values. Works on numbers, text (alphabetical), and dates."
        use="Most expensive product, latest order date, highest salary"
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="COUNT — The Most Used Aggregate" />

      <P>COUNT has three distinct forms that answer three different questions. Understanding the difference is essential — they produce different results on the same data.</P>

      <H>COUNT(*) — count every row</H>

      <SQLPlayground
        initialQuery={`-- How many orders do we have in total?
SELECT COUNT(*) AS total_orders
FROM orders;`}
        height={100}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- How many customers do we have?
SELECT COUNT(*) AS total_customers
FROM customers;`}
        height={95}
        showSchema={false}
      />

      <H>COUNT(column) — count non-NULL values</H>

      <SQLPlayground
        initialQuery={`-- How many orders have been delivered? (delivery_date IS NOT NULL)
-- COUNT(column) excludes NULL values
SELECT
  COUNT(*)               AS total_orders,
  COUNT(delivery_date)   AS delivered_orders,
  COUNT(*) - COUNT(delivery_date) AS pending_orders
FROM orders;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees with a manager vs without (top-level)
SELECT
  COUNT(*)           AS total_employees,
  COUNT(manager_id)  AS have_manager,
  COUNT(*) - COUNT(manager_id) AS top_level
FROM employees;`}
        height={115}
        showSchema={false}
      />

      <H>COUNT(DISTINCT column) — count unique values</H>

      <SQLPlayground
        initialQuery={`-- How many distinct customers have placed orders?
-- Not the total number of orders — distinct customers
SELECT
  COUNT(*)                    AS total_orders,
  COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- How many distinct products have been ordered?
SELECT
  COUNT(*)                   AS total_line_items,
  COUNT(DISTINCT product_id) AS distinct_products_ordered
FROM order_items;`}
        height={105}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Complete picture: orders, customers, stores, products
SELECT
  COUNT(DISTINCT o.order_id)   AS total_orders,
  COUNT(DISTINCT o.customer_id) AS unique_customers,
  COUNT(DISTINCT o.store_id)   AS stores_with_orders,
  COUNT(DISTINCT oi.product_id) AS products_ordered
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="SUM — Totalling Numeric Values" />

      <SQLPlayground
        initialQuery={`-- Total revenue from all delivered orders
SELECT
  SUM(total_amount)              AS total_revenue,
  ROUND(SUM(total_amount), 2)    AS total_revenue_rounded
FROM orders
WHERE order_status = 'Delivered';`}
        height={115}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Total units sold per product category
SELECT
  p.category,
  SUM(oi.quantity)               AS total_units_sold,
  SUM(oi.line_total)             AS total_revenue
FROM order_items AS oi
JOIN products AS p ON oi.product_id = p.product_id
GROUP BY p.category
ORDER BY total_revenue DESC;`}
        height={155}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Total salary budget by department
SELECT
  department,
  COUNT(*)                       AS headcount,
  SUM(salary)                    AS total_salary_budget,
  ROUND(SUM(salary) * 12, 0)     AS annual_budget
FROM employees
GROUP BY department
ORDER BY total_salary_budget DESC;`}
        height={155}
        showSchema={false}
      />

      <H>SUM with expressions</H>

      <SQLPlayground
        initialQuery={`-- Total potential revenue if all products were fully stocked and sold
-- SUM of an expression — not just a raw column
SELECT
  SUM(unit_price)                AS sum_of_prices,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  SUM(unit_price - cost_price)   AS total_potential_profit
FROM products
WHERE in_stock = true;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="AVG — Calculating Averages" />

      <SQLPlayground
        initialQuery={`-- Average order value across all delivered orders
SELECT
  ROUND(AVG(total_amount), 2)    AS avg_order_value,
  COUNT(*)                       AS order_count,
  ROUND(SUM(total_amount), 2)    AS total_revenue
FROM orders
WHERE order_status = 'Delivered';`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Average delivery time in days
SELECT
  ROUND(AVG(delivery_date - order_date), 1)  AS avg_delivery_days,
  MIN(delivery_date - order_date)            AS fastest_delivery,
  MAX(delivery_date - order_date)            AS slowest_delivery
FROM orders
WHERE delivery_date IS NOT NULL;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Average price by category — what does each category cost on average?
SELECT
  category,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  ROUND(AVG(unit_price - cost_price) / AVG(unit_price) * 100, 1) AS avg_margin_pct
FROM products
GROUP BY category
ORDER BY avg_price DESC;`}
        height={165}
        showSchema={false}
      />

      <H>AVG and NULL — the silent exclusion</H>
      <P>AVG ignores NULL values — it computes the average only over non-NULL rows. This means AVG gives the average of known values, not the average including unknowns treated as zero. In most cases this is correct, but it can surprise you when NULLs are meaningful.</P>

      <SQLPlayground
        initialQuery={`-- AVG ignores NULLs — delivery_date is NULL for undelivered orders
-- This gives average delivery time for DELIVERED orders only
-- Undelivered orders do not drag the average down to zero
SELECT
  COUNT(*)                                        AS total_orders,
  COUNT(delivery_date)                            AS delivered,
  ROUND(AVG(delivery_date - order_date), 1)       AS avg_days_delivered_only,
  -- If we wanted to include undelivered as 0:
  ROUND(AVG(COALESCE(delivery_date - order_date, 0)), 1) AS avg_including_pending_as_0
FROM orders;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="MIN and MAX — Finding Extremes" />

      <SQLPlayground
        initialQuery={`-- Price range across all products
SELECT
  MIN(unit_price)   AS cheapest_product,
  MAX(unit_price)   AS most_expensive_product,
  MAX(unit_price) - MIN(unit_price) AS price_range
FROM products;`}
        height={115}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Date range of orders — when did we start, what is the latest order?
SELECT
  MIN(order_date)   AS first_order_date,
  MAX(order_date)   AS most_recent_order,
  MAX(order_date) - MIN(order_date) AS days_of_data
FROM orders;`}
        height={115}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Salary range by department
SELECT
  department,
  COUNT(*)          AS headcount,
  MIN(salary)       AS lowest_salary,
  MAX(salary)       AS highest_salary,
  MAX(salary) - MIN(salary) AS salary_spread
FROM employees
GROUP BY department
ORDER BY highest_salary DESC;`}
        height={160}
        showSchema={false}
      />

      <H>MIN and MAX on text — alphabetical extremes</H>

      <SQLPlayground
        initialQuery={`-- Alphabetically first and last customer names
SELECT
  MIN(last_name || ', ' || first_name)  AS first_alphabetically,
  MAX(last_name || ', ' || first_name)  AS last_alphabetically
FROM customers;`}
        height={105}
        showSchema={false}
      />

      <H>MIN and MAX on dates — timeline extremes</H>

      <SQLPlayground
        initialQuery={`-- Per-store: when did each store receive its first and most recent order?
SELECT
  store_id,
  MIN(order_date)   AS first_order,
  MAX(order_date)   AS latest_order,
  COUNT(*)          AS total_orders
FROM orders
GROUP BY store_id
ORDER BY first_order;`}
        height={155}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Aggregates Without GROUP BY — Single-Row Results" />

      <P>Aggregate functions without GROUP BY collapse the entire table (or the filtered rows) into a single result row. This is the simplest form and produces one number that summarises the entire dataset.</P>

      <SQLPlayground
        initialQuery={`-- Complete business summary — one row, all key metrics
SELECT
  COUNT(*)                                    AS total_orders,
  COUNT(DISTINCT customer_id)                 AS unique_customers,
  COUNT(DISTINCT store_id)                    AS active_stores,
  ROUND(SUM(total_amount), 2)                 AS total_revenue,
  ROUND(AVG(total_amount), 2)                 AS avg_order_value,
  MIN(total_amount)                           AS smallest_order,
  MAX(total_amount)                           AS largest_order,
  SUM(CASE WHEN order_status = 'Delivered'
      THEN 1 ELSE 0 END)                      AS delivered_count,
  ROUND(
    SUM(CASE WHEN order_status = 'Delivered' THEN 1.0 ELSE 0 END)
    / COUNT(*) * 100, 1
  )                                           AS delivery_rate_pct
FROM orders;`}
        height={240}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product catalogue summary
SELECT
  COUNT(*)                                    AS total_products,
  COUNT(DISTINCT category)                    AS categories,
  COUNT(DISTINCT brand)                       AS brands,
  SUM(CASE WHEN in_stock THEN 1 ELSE 0 END)  AS in_stock_count,
  ROUND(AVG(unit_price), 2)                  AS avg_price,
  MIN(unit_price)                            AS min_price,
  MAX(unit_price)                            AS max_price,
  ROUND(AVG(unit_price - cost_price)
        / AVG(unit_price) * 100, 1)          AS avg_margin_pct
FROM products;`}
        height={210}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="NULL Behaviour — The Critical Detail" />

      <P>All five aggregate functions ignore NULL values — they compute only over non-NULL rows. This is usually the correct behaviour but produces surprising results in specific situations. You must understand this to interpret aggregate results correctly.</P>

      <CodeBlock
        label="NULL behaviour of all five aggregates"
        code={`-- Given these values: 10, 20, NULL, 30, NULL

COUNT(*) = 5          -- counts all rows including NULLs
COUNT(col) = 3        -- counts only non-NULL: 10, 20, 30
SUM(col) = 60         -- sums only non-NULL: 10+20+30
AVG(col) = 20         -- averages only non-NULL: 60/3 (NOT 60/5)
MIN(col) = 10         -- minimum of non-NULL values
MAX(col) = 30         -- maximum of non-NULL values

-- The dangerous case: AVG
-- If 2 out of 5 values are NULL, AVG divides by 3, not 5
-- This gives a HIGHER average than if NULLs were treated as 0
-- 60/3 = 20 vs 60/5 = 12 — very different answers

-- If NULLs should be treated as 0 for AVG:
AVG(COALESCE(col, 0)) = 12   -- treats NULL as 0, divides by 5`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate NULL behaviour difference
SELECT
  COUNT(*)                                    AS total_rows,
  COUNT(delivery_date)                        AS non_null_dates,
  -- AVG ignores NULL: only averages delivered orders
  ROUND(AVG(delivery_date - order_date), 1)   AS avg_days_excl_nulls,
  -- COALESCE treats undelivered as 0: averages all orders
  ROUND(AVG(COALESCE(delivery_date - order_date, 0)), 1) AS avg_days_incl_zeros,
  -- The two numbers answer DIFFERENT questions
  -- Which is "correct" depends on the business question
  '---' AS separator,
  'excl_nulls = avg delivery time for delivered orders' AS excl_note,
  'incl_zeros = avg across all orders (0 for pending)' AS incl_note
FROM orders;`}
        height={205}
        showSchema={false}
      />

      <Callout type="warning">
        AVG(column) and AVG(COALESCE(column, 0)) answer fundamentally different business questions. The first asks "what is the average among rows that have this value?" The second asks "what is the average across all rows, treating missing values as zero?" Always be explicit about which question you are answering — and document it in a SQL comment.
      </Callout>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Aggregates with Expressions and CASE WHEN" />

      <P>Aggregate functions do not have to operate on raw columns. You can aggregate expressions — calculations, CASE WHEN results, and any SQL expression that produces a numeric value. This unlocks powerful analytical patterns.</P>

      <H>SUM with CASE WHEN — conditional totals</H>

      <SQLPlayground
        initialQuery={`-- Revenue breakdown by order status — all in one row
SELECT
  ROUND(SUM(total_amount), 2)                                  AS total_gmv,
  ROUND(SUM(CASE WHEN order_status = 'Delivered'
    THEN total_amount ELSE 0 END), 2)                          AS delivered_revenue,
  ROUND(SUM(CASE WHEN order_status = 'Cancelled'
    THEN total_amount ELSE 0 END), 2)                          AS cancelled_gmv,
  ROUND(SUM(CASE WHEN order_status = 'Returned'
    THEN total_amount ELSE 0 END), 2)                          AS returned_gmv,
  ROUND(SUM(CASE WHEN order_status = 'Processing'
    THEN total_amount ELSE 0 END), 2)                          AS processing_gmv
FROM orders;`}
        height={200}
        showSchema={true}
      />

      <H>COUNT with CASE WHEN — conditional counts</H>

      <SQLPlayground
        initialQuery={`-- Order counts by payment method and status
SELECT
  SUM(CASE WHEN payment_method = 'UPI'        THEN 1 ELSE 0 END) AS upi_orders,
  SUM(CASE WHEN payment_method = 'Card'       THEN 1 ELSE 0 END) AS card_orders,
  SUM(CASE WHEN payment_method = 'COD'        THEN 1 ELSE 0 END) AS cod_orders,
  SUM(CASE WHEN payment_method = 'NetBanking' THEN 1 ELSE 0 END) AS netbanking_orders,
  COUNT(*)                                                        AS total_orders,
  -- Percentage UPI adoption
  ROUND(SUM(CASE WHEN payment_method = 'UPI' THEN 1.0 ELSE 0 END)
        / COUNT(*) * 100, 1)                                     AS upi_pct
FROM orders
WHERE order_status = 'Delivered';`}
        height={215}
        showSchema={false}
      />

      <H>Aggregate over calculated values</H>

      <SQLPlayground
        initialQuery={`-- Aggregate profit margin metrics across all products
SELECT
  COUNT(*)                                             AS product_count,
  ROUND(AVG(unit_price - cost_price), 2)              AS avg_profit_per_unit,
  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 1) AS avg_margin_pct,
  ROUND(MIN((unit_price - cost_price) / unit_price * 100), 1) AS min_margin_pct,
  ROUND(MAX((unit_price - cost_price) / unit_price * 100), 1) AS max_margin_pct,
  SUM(CASE
    WHEN (unit_price - cost_price) / unit_price >= 0.30 THEN 1 ELSE 0
  END)                                                 AS high_margin_products
FROM products
WHERE in_stock = true;`}
        height={210}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Aggregates Across Multiple Tables — JOINs + Aggregates" />

      <P>The most powerful analytical queries combine JOINs (to bring data from multiple tables together) with aggregate functions (to summarise that combined data). This is the foundation of every real analytics report.</P>

      <SQLPlayground
        initialQuery={`-- Revenue and order metrics per store
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(o.order_id)                   AS total_orders,
  COUNT(DISTINCT o.customer_id)       AS unique_customers,
  ROUND(SUM(o.total_amount), 2)       AS total_revenue,
  ROUND(AVG(o.total_amount), 2)       AS avg_order_value,
  s.monthly_target,
  ROUND(SUM(o.total_amount) / s.monthly_target * 100, 1) AS target_pct
FROM stores AS s
LEFT JOIN orders AS o ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
ORDER BY total_revenue DESC NULLS LAST;`}
        height={230}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Top products by units sold and revenue
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  COUNT(DISTINCT oi.order_id)        AS orders_containing_product,
  SUM(oi.quantity)                   AS total_units_sold,
  ROUND(SUM(oi.line_total), 2)       AS total_revenue,
  ROUND(AVG(oi.quantity), 1)         AS avg_qty_per_order,
  ROUND(SUM(oi.quantity * (oi.unit_price - p.cost_price)), 2) AS gross_profit
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.product_id, p.product_name, p.category, p.brand
ORDER BY total_revenue DESC
LIMIT 10;`}
        height={240}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customer value analysis
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.city,
  c.loyalty_tier,
  COUNT(o.order_id)                    AS total_orders,
  ROUND(SUM(o.total_amount), 2)        AS lifetime_value,
  ROUND(AVG(o.total_amount), 2)        AS avg_order_value,
  MIN(o.order_date)                    AS first_order,
  MAX(o.order_date)                    AS last_order
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.city, c.loyalty_tier
ORDER BY lifetime_value DESC NULLS LAST;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are an analyst at DoorDash. It is Monday morning and the weekly business review is in two hours. Your manager has sent three requests overnight: a summary of last week's GMV by city, the top 5 restaurants by order count, and the average delivery time by restaurant rating band. These are classic aggregate queries that you need to produce in under 30 minutes.</P>

      <TimeBlock time="8:00 AM" label="Request 1 — GMV by city (adapted for FreshCart)">
        Adapted to FreshCart: total delivered revenue by store city for the most recent available data.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Weekly GMV by store city (FreshCart adaptation)
SELECT
  s.city,
  COUNT(o.order_id)              AS order_count,
  COUNT(DISTINCT o.customer_id)  AS unique_customers,
  ROUND(SUM(o.total_amount), 2)  AS total_gmv,
  ROUND(AVG(o.total_amount), 2)  AS avg_order_value
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.city
ORDER BY total_gmv DESC;`}
        height={200}
        showSchema={true}
      />

      <TimeBlock time="8:15 AM" label="Request 2 — Top stores by order count">
        Top 5 stores by delivered order count with their revenue.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Top 5 stores by delivered order count
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(o.order_id)              AS delivered_orders,
  ROUND(SUM(o.total_amount), 2)  AS total_revenue,
  ROUND(AVG(o.total_amount), 2)  AS avg_order_value
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city
ORDER BY delivered_orders DESC
LIMIT 5;`}
        height={195}
        showSchema={false}
      />

      <TimeBlock time="8:30 AM" label="Request 3 — Delivery time by loyalty tier">
        Adapted: average delivery time grouped by customer loyalty tier.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Average delivery time by customer loyalty tier
SELECT
  c.loyalty_tier,
  COUNT(o.order_id)                                   AS delivered_orders,
  ROUND(AVG(o.delivery_date - o.order_date), 1)       AS avg_delivery_days,
  MIN(o.delivery_date - o.order_date)                 AS fastest,
  MAX(o.delivery_date - o.order_date)                 AS slowest,
  ROUND(AVG(o.total_amount), 2)                       AS avg_order_value
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
  AND o.delivery_date IS NOT NULL
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

      <TimeBlock time="8:45 AM" label="All three reports done, 75 minutes before the meeting">
        Three queries, three results, delivered 75 minutes before the business review. The queries are clean, well-aliased, and reproducible — the manager can re-run them next week with no modifications and get updated numbers automatically.
      </TimeBlock>

      <ProTip>
        Every recurring business report should be a saved, parameterised SQL query — not a one-off command. Before writing each query, ask: "Will someone need this next week?" If yes, write it cleanly with clear aliases, add a comment at the top describing what it does, and save it in your team's shared query library. The 5 minutes of cleanup pays back every time the query is reused.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?">
        <p style={{ margin: '0 0 14px' }}>COUNT(*) counts every row in the result set, including rows where all columns are NULL. It answers "how many rows are there?" It is the correct function for counting the total number of records — orders, customers, transactions — regardless of their values.</p>
        <p style={{ margin: '0 0 14px' }}>COUNT(column) counts rows where the specified column is NOT NULL. If delivery_date is NULL for undelivered orders, COUNT(delivery_date) counts only the delivered orders. This answers "how many rows have a value in this column?" It is useful for understanding data completeness — how many records have a phone number, how many orders have been assigned a delivery date.</p>
        <p style={{ margin: 0 }}>COUNT(DISTINCT column) counts the number of unique non-NULL values in the column. COUNT(DISTINCT customer_id) from the orders table counts how many distinct customers have placed at least one order — not how many total orders, and not including customers who have never ordered. This answers "how many unique values exist?" It is the cardinality question. A common analytical pattern combining all three: SELECT COUNT(*) AS total_orders, COUNT(delivery_date) AS delivered, COUNT(DISTINCT customer_id) AS unique_customers FROM orders — three different metrics from the same table in one query.</p>
      </IQ>

      <IQ q="How do aggregate functions handle NULL values?">
        <p style={{ margin: '0 0 14px' }}>All five aggregate functions (COUNT, SUM, AVG, MIN, MAX) ignore NULL values — they operate only over non-NULL rows. The one exception is COUNT(*), which counts all rows regardless of NULL content. This behaviour is defined by the SQL standard and is consistent across all databases.</p>
        <p style={{ margin: '0 0 14px' }}>The practical consequence that surprises most people: AVG(column) divides by the count of non-NULL values, not by the total row count. If 20 orders exist and 5 have NULL delivery_date, AVG(delivery_date - order_date) divides the sum by 15 — not 20. This gives the average delivery time for delivered orders, which is usually what you want, but it can mislead if you expect the average to account for all orders.</p>
        <p style={{ margin: 0 }}>When NULLs should be treated as a specific value rather than ignored, use COALESCE before the aggregate: AVG(COALESCE(delivery_date - order_date, 0)) treats undelivered orders as 0 days and divides by 20 instead of 15. SUM returns NULL (not 0) if all values in the column are NULL — COALESCE(SUM(column), 0) handles this. The rule: always be explicit about whether NULLs should be ignored (use the aggregate directly) or substituted (use COALESCE inside the aggregate) and document the choice in a SQL comment.</p>
      </IQ>

      <IQ q="Can you use aggregate functions without GROUP BY? What do they return?">
        <p style={{ margin: '0 0 14px' }}>Yes — aggregate functions can be used without GROUP BY. When used without GROUP BY, they collapse the entire result set (or the entire filtered result set after WHERE) into a single row. SELECT COUNT(*), SUM(total_amount), AVG(total_amount) FROM orders returns exactly one row containing three numbers that summarise all orders.</p>
        <p style={{ margin: '0 0 14px' }}>Without GROUP BY, all rows that pass the WHERE filter are treated as one group. This is the simplest and most common form of aggregation — getting a single summary metric for a dataset. Total revenue for the month, average order value, the number of active customers, the highest-paid employee salary — all of these are single-row aggregate queries without GROUP BY.</p>
        <p style={{ margin: 0 }}>The important rule: when aggregate functions are used without GROUP BY, you cannot include non-aggregated columns in SELECT. SELECT customer_id, COUNT(*) FROM orders without GROUP BY is an error — the database cannot return one row from COUNT(*) and simultaneously return a different customer_id for each row. Every column in SELECT must either be inside an aggregate function or be part of the GROUP BY clause. The only exception is window functions (covered in later modules), which compute aggregates alongside individual rows without collapsing them.</p>
      </IQ>

      <IQ q="What is the difference between SUM and COUNT and when would you use each?">
        <p style={{ margin: '0 0 14px' }}>COUNT counts the number of rows (or non-NULL values, or distinct values). SUM adds up the numeric values in a column. They answer fundamentally different questions: COUNT answers "how many?" and SUM answers "how much total?"</p>
        <p style={{ margin: '0 0 14px' }}>Use COUNT when you want a quantity of records: how many orders were placed, how many customers signed up this month, how many products are in stock. Use SUM when you want a total of a numeric value: total revenue, total units sold, total salary budget. A single query often uses both: SELECT COUNT(*) AS order_count, SUM(total_amount) AS total_revenue FROM orders — count tells you the volume, sum tells you the value.</p>
        <p style={{ margin: 0 }}>A common confusion: SUM(CASE WHEN condition THEN 1 ELSE 0 END) is equivalent to COUNT(CASE WHEN condition THEN 1 END) for conditional counting. Both count rows where the condition is true. The SUM version with ELSE 0 is slightly more readable for conditional aggregation alongside other aggregates, and it returns 0 (not NULL) when no rows match — COUNT of all NULLs returns 0 anyway, so the difference is subtle. The key insight: SUM of 1s and 0s is the same as COUNT of 1s. This is the foundation of the conditional aggregation pattern.</p>
      </IQ>

      <IQ q="How would you calculate the percentage of orders delivered successfully?">
        <p style={{ margin: '0 0 14px' }}>The delivery rate percentage requires two quantities: the count of delivered orders (the numerator) and the total count of all orders (the denominator). Divide numerator by denominator and multiply by 100. Several equivalent approaches exist in SQL.</p>
        <p style={{ margin: '0 0 14px' }}>Approach 1 — conditional SUM: ROUND(SUM(CASE WHEN order_status = 'Delivered' THEN 1.0 ELSE 0 END) / COUNT(*) * 100, 1) AS delivery_rate_pct. The 1.0 (not integer 1) forces decimal division. This is the most common and most readable approach for conditional percentages.</p>
        <p style={{ margin: 0 }}>Approach 2 — AVG of a boolean expression: ROUND(AVG(CASE WHEN order_status = 'Delivered' THEN 1.0 ELSE 0 END) * 100, 1). AVG of 0s and 1s gives the proportion directly (between 0 and 1), then multiply by 100 for the percentage. This is mathematically identical to approach 1. Both produce the same result. The choice is style preference — approach 1 (SUM / COUNT) is more explicit about what the numerator and denominator are, which aids readability. Add a NULLIF to prevent division by zero when the table might be empty: SUM(...) / NULLIF(COUNT(*), 0) * 100.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'customer_id' must appear in GROUP BY or be used in an aggregate function"
        cause="You included a non-aggregated column in SELECT alongside aggregate functions, without listing that column in GROUP BY. When aggregate functions are used, every column in SELECT must either be inside an aggregate function (COUNT, SUM, AVG, MIN, MAX) or be listed in GROUP BY. The database cannot return one summary row from COUNT(*) and simultaneously return a different customer_id per row."
        fix="Either add the column to GROUP BY: SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id. Or wrap the column in an aggregate function: SELECT MAX(customer_id), COUNT(*) FROM orders. Or remove the column from SELECT if it is not needed. The rule is: aggregate queries either return one summary row (no GROUP BY) or one row per group (with GROUP BY listing all non-aggregated columns)."
      />

      <Err
        msg="SUM returns NULL instead of 0 — no rows matched the WHERE condition"
        cause="SUM of zero rows returns NULL, not 0. When no rows match the WHERE condition, SUM has no values to add — and the result is NULL rather than the more intuitive 0. This happens when filtering by a date range with no data, a status with no matching rows, or a store with no orders."
        fix="Wrap SUM in COALESCE to replace NULL with 0: COALESCE(SUM(total_amount), 0) AS total_revenue. This handles the empty-set case cleanly. The same applies to AVG and other aggregates: COALESCE(AVG(total_amount), 0) AS avg_revenue. Note that COUNT(*) already returns 0 for empty sets (not NULL) — only SUM, AVG, MIN, and MAX return NULL when no rows match."
      />

      <Err
        msg="AVG gives a higher number than expected — some rows are being excluded"
        cause="AVG ignores NULL values. If the column being averaged has NULLs (for example, delivery_date - order_date is NULL for undelivered orders), AVG only divides by the count of non-NULL rows. With 20 orders and 5 undelivered (NULL delivery_date), AVG divides by 15, not 20. The result is the average for the delivered subset only — which is higher than the average including all orders."
        fix="If you want NULLs included as a specific value: AVG(COALESCE(delivery_date - order_date, 0)) treats undelivered orders as 0 days. If you want the average of delivered orders only (NULL exclusion is correct): document this explicitly in a comment and verify the denominator: SELECT COUNT(*) AS total, COUNT(delivery_date) AS non_null_count to confirm how many rows AVG is dividing by. The key is to be intentional about which question you are answering."
      />

      <Err
        msg="COUNT(DISTINCT column) returns a larger number than expected"
        cause="The column has more unique values than expected — possibly due to case sensitivity, whitespace, or formatting inconsistencies. 'Seattle' and 'bangalore' and 'Seattle ' (trailing space) are three distinct values in PostgreSQL's case-sensitive comparison. COUNT(DISTINCT city) returns 3 for what you might consider the same city."
        fix="Normalise the values before counting: COUNT(DISTINCT LOWER(TRIM(city))) counts distinct cities after converting to lowercase and removing whitespace — treating 'Seattle', 'bangalore', and 'Seattle ' as the same value. To investigate inconsistencies: SELECT DISTINCT city FROM customers ORDER BY city — examine the result for near-duplicates. Fix at the data level (UPDATE to canonical forms) for a permanent solution."
      />

      <Err
        msg="Aggregate result is wrong — CASE WHEN SUM returns unexpected values"
        cause="The CASE WHEN expression inside SUM has a logic error — conditions are in the wrong order, a condition is missing, or the ELSE clause is absent (returning NULL instead of 0 for non-matching rows). SUM(CASE WHEN condition THEN amount END) sums NULL for non-matching rows, which is ignored by SUM — equivalent to ELSE 0. But SUM(CASE WHEN condition THEN amount ELSE amount END) incorrectly counts everything."
        fix="Always include an explicit ELSE 0 in SUM(CASE WHEN): SUM(CASE WHEN order_status = 'Delivered' THEN total_amount ELSE 0 END). This makes the intent clear and prevents NULL accumulation surprises. To debug, run the CASE WHEN as a SELECT column first — no GROUP BY, just the CASE expression per row — and verify that each row produces the expected value before wrapping in SUM."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a single query that produces the FreshCart monthly executive summary. Show: total orders, unique customers, total delivered revenue (rounded to 2 decimal places), average order value for delivered orders (rounded to 2 decimal places), the count of orders by status (delivered, cancelled, returned, processing as separate columns), percentage of orders delivered (rounded to 1 decimal place), and the most expensive single order. All from the orders table — no GROUP BY needed, one summary row."
        hint="Use COUNT(*) for total, COUNT(DISTINCT customer_id) for unique customers, SUM with WHERE or CASE for delivered revenue, SUM(CASE WHEN ... THEN 1 ELSE 0 END) for status counts, and MAX(total_amount) for the largest order."
        answer={`SELECT
  COUNT(*)                                                        AS total_orders,
  COUNT(DISTINCT customer_id)                                     AS unique_customers,
  ROUND(SUM(
    CASE WHEN order_status = 'Delivered' THEN total_amount ELSE 0 END
  ), 2)                                                           AS delivered_revenue,
  ROUND(AVG(
    CASE WHEN order_status = 'Delivered' THEN total_amount END
  ), 2)                                                           AS avg_delivered_order,
  SUM(CASE WHEN order_status = 'Delivered'  THEN 1 ELSE 0 END)   AS delivered_count,
  SUM(CASE WHEN order_status = 'Cancelled'  THEN 1 ELSE 0 END)   AS cancelled_count,
  SUM(CASE WHEN order_status = 'Returned'   THEN 1 ELSE 0 END)   AS returned_count,
  SUM(CASE WHEN order_status = 'Processing' THEN 1 ELSE 0 END)   AS processing_count,
  ROUND(
    SUM(CASE WHEN order_status = 'Delivered' THEN 1.0 ELSE 0 END)
    / COUNT(*) * 100
  , 1)                                                            AS delivery_rate_pct,
  MAX(total_amount)                                               AS largest_single_order
FROM orders;`}
        explanation="This single-row summary uses every aggregate function type. COUNT(*) for total rows. COUNT(DISTINCT) for unique customers. SUM(CASE WHEN) for conditional revenue — only Delivered orders contribute. AVG(CASE WHEN ... END) without ELSE means non-Delivered rows return NULL which AVG ignores — giving the average only for delivered orders. SUM(CASE WHEN ... THEN 1 ELSE 0 END) for each status count — this is the conditional counting pattern. The delivery_rate uses 1.0 (not 1) to force decimal division, preventing integer truncation. MAX gives the single highest order value. All results in one row — a complete executive dashboard in one query."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Five core aggregate functions: COUNT (how many), SUM (total), AVG (mean), MIN (smallest), MAX (largest). They collapse many rows into a single computed value.',
          'COUNT(*) counts all rows including NULLs. COUNT(column) counts non-NULL values only. COUNT(DISTINCT column) counts unique non-NULL values. Three different answers to three different questions.',
          'All aggregates except COUNT(*) ignore NULL values. AVG divides by the count of non-NULL rows — not total rows. Use COALESCE inside the aggregate to treat NULLs as a specific value.',
          'SUM returns NULL (not 0) when no rows match. Wrap in COALESCE(SUM(col), 0) to return 0 for empty result sets.',
          'Aggregates without GROUP BY: collapse all rows into one result row. Every non-aggregate column in SELECT must be in GROUP BY — or the query errors.',
          'SUM(CASE WHEN condition THEN 1 ELSE 0 END) counts rows matching the condition. SUM(CASE WHEN condition THEN amount ELSE 0 END) sums values for matching rows. This conditional aggregation pattern replaces multiple queries with one.',
          'AVG(CASE WHEN condition THEN value END) without ELSE computes the average only for matching rows — non-matching rows return NULL which AVG ignores.',
          'Combining JOINs with aggregates is the foundation of analytics: JOIN to bring data together, GROUP BY to define the groups, aggregates to summarise each group.',
          'COUNT(DISTINCT col) can be slow on large tables — requires deduplication across all values. For frequent queries, consider pre-aggregating into a summary table.',
          'Always alias aggregate results: COUNT(*) AS total_orders, not just COUNT(*). Application code and dashboards reference columns by name — unnamed aggregates produce unreadable or broken references.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 28</strong>, you learn GROUP BY — the clause that splits rows into groups so aggregate functions compute separately per group. This is where SQL analytics becomes truly powerful.
        </p>
        <Link href="/learn/sql/group-by" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 28 → GROUP BY
        </Link>
      </div>

    </LearnLayout>
  );
}