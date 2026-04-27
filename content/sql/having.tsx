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

export default function Having() {
  return (
    <LearnLayout
      title="HAVING"
      description="Filter groups after aggregation — the clause that completes WHERE + GROUP BY + HAVING, with real business examples of every pattern you will use in production analytics"
      section="SQL — Module 29"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem HAVING Solves" />

      <P>You now know WHERE (filters rows) and GROUP BY (groups rows for aggregation). Together they answer most analytical questions. But there is a category of question they cannot answer alone:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          'Which stores have processed more than 5 delivered orders?',
          'Which product categories have average price above ₹100?',
          'Which customers have spent more than ₹2,000 in total?',
          'Which payment methods account for more than 20% of revenue?',
        ].map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>Q{i + 1}</span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{q}</span>
          </div>
        ))}
      </div>

      <P>All four questions require filtering <Hl>groups</Hl> based on aggregate values — not individual rows. WHERE cannot do this because WHERE runs before groups are formed, so aggregate values do not exist yet. HAVING is the answer: it runs <Hl>after</Hl> GROUP BY, when groups and their aggregates are fully computed, and filters which groups appear in the final result.</P>

      <CodeBlock
        label="WHERE vs HAVING — the fundamental difference"
        code={`-- WHERE: filters individual rows BEFORE grouping
-- Cannot use aggregate functions here
WHERE order_status = 'Delivered'          -- ✓ row-level value
WHERE COUNT(*) > 5                        -- ✗ aggregate — does not exist yet

-- HAVING: filters groups AFTER grouping and aggregation
-- Can use aggregate functions here
HAVING COUNT(*) > 5                       -- ✓ group-level aggregate
HAVING SUM(total_amount) > 1000           -- ✓ group-level aggregate
HAVING AVG(unit_price) > 100              -- ✓ group-level aggregate
HAVING order_status = 'Delivered'         -- ✗ works but belongs in WHERE (inefficient)`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic HAVING Syntax" />

      <CodeBlock
        label="HAVING syntax — position in the full query"
        code={`SELECT   column, aggregate_function
FROM     table
WHERE    row_level_condition        -- step 2: filter rows
GROUP BY column                    -- step 3: form groups
HAVING   group_level_condition     -- step 4: filter groups
ORDER BY column                    -- step 5: sort results
LIMIT    n;                        -- step 6: truncate`}
      />

      <H>Stores with more than 3 delivered orders</H>

      <SQLPlayground
        initialQuery={`-- All stores with their order counts
SELECT
  store_id,
  COUNT(*)                       AS delivered_orders,
  ROUND(SUM(total_amount), 2)    AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY delivered_orders DESC;`}
        height={155}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Only stores with more than 3 delivered orders
-- HAVING filters the groups AFTER COUNT is computed
SELECT
  store_id,
  COUNT(*)                       AS delivered_orders,
  ROUND(SUM(total_amount), 2)    AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
HAVING COUNT(*) > 3
ORDER BY delivered_orders DESC;`}
        height={155}
        showSchema={false}
      />

      <H>Categories with average price above ₹100</H>

      <SQLPlayground
        initialQuery={`-- Product categories where the average price is above ₹100
SELECT
  category,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  MIN(unit_price)                AS min_price,
  MAX(unit_price)                AS max_price
FROM products
GROUP BY category
HAVING AVG(unit_price) > 100
ORDER BY avg_price DESC;`}
        height={175}
        showSchema={false}
      />

      <H>Customers who have spent more than ₹1,000</H>

      <SQLPlayground
        initialQuery={`-- High-value customers: total spend above ₹1,000
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name    AS customer,
  c.loyalty_tier,
  COUNT(o.order_id)                     AS order_count,
  ROUND(SUM(o.total_amount), 2)         AS total_spend
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
HAVING SUM(o.total_amount) > 1000
ORDER BY total_spend DESC;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="HAVING with COUNT — Frequency Filters" />

      <P>Filtering by COUNT is the most common HAVING pattern. It answers questions about minimum activity thresholds — customers with at least N orders, products ordered at least N times, stores processing at least N transactions.</P>

      <SQLPlayground
        initialQuery={`-- Products ordered by at least 3 different customers
SELECT
  p.product_id,
  p.product_name,
  p.category,
  COUNT(DISTINCT o.customer_id)  AS unique_customers,
  SUM(oi.quantity)               AS total_units_sold
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.product_id, p.product_name, p.category
HAVING COUNT(DISTINCT o.customer_id) >= 3
ORDER BY unique_customers DESC;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Stores that have served at least 2 distinct customers
SELECT
  s.store_id,
  s.city,
  COUNT(DISTINCT o.customer_id)  AS unique_customers,
  COUNT(o.order_id)              AS total_orders
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
GROUP BY s.store_id, s.city
HAVING COUNT(DISTINCT o.customer_id) >= 2
ORDER BY unique_customers DESC;`}
        height={190}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees in departments with more than 2 people
-- (find departments first with HAVING, then use as filter)
SELECT
  department,
  COUNT(*)                       AS headcount,
  ROUND(AVG(salary), 0)          AS avg_salary,
  SUM(salary)                    AS total_payroll
FROM employees
GROUP BY department
HAVING COUNT(*) > 2
ORDER BY headcount DESC;`}
        height={175}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="HAVING with SUM and AVG — Value Thresholds" />

      <SQLPlayground
        initialQuery={`-- Stores where total delivered revenue exceeds ₹2,000
SELECT
  o.store_id,
  s.city,
  COUNT(*)                       AS order_count,
  ROUND(SUM(o.total_amount), 2)  AS total_revenue
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY o.store_id, s.city
HAVING SUM(o.total_amount) > 2000
ORDER BY total_revenue DESC;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product categories with above-average margin (above 25%)
SELECT
  category,
  COUNT(*)                       AS product_count,
  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 1) AS avg_margin_pct
FROM products
WHERE in_stock = true
GROUP BY category
HAVING AVG((unit_price - cost_price) / unit_price * 100) > 25
ORDER BY avg_margin_pct DESC;`}
        height={180}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Payment methods with average order value above ₹500
SELECT
  payment_method,
  COUNT(*)                       AS order_count,
  ROUND(AVG(total_amount), 2)    AS avg_order_value,
  ROUND(SUM(total_amount), 2)    AS total_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY payment_method
HAVING AVG(total_amount) > 500
ORDER BY avg_order_value DESC;`}
        height={180}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="HAVING with Multiple Conditions" />

      <P>HAVING supports the same AND, OR, and NOT logic as WHERE. You can combine multiple aggregate conditions to define complex group-level filters.</P>

      <SQLPlayground
        initialQuery={`-- Stores that are both high-volume (5+ orders) AND high-value (revenue > ₹2,000)
SELECT
  o.store_id,
  s.city,
  COUNT(*)                       AS delivered_orders,
  ROUND(SUM(o.total_amount), 2)  AS revenue,
  ROUND(AVG(o.total_amount), 2)  AS avg_order
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY o.store_id, s.city
HAVING COUNT(*) >= 5
   AND SUM(o.total_amount) > 2000
ORDER BY revenue DESC;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Categories where EITHER avg price > ₹150 OR product count > 5
SELECT
  category,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  ROUND(AVG((unit_price - cost_price) / unit_price * 100), 1) AS avg_margin_pct
FROM products
GROUP BY category
HAVING AVG(unit_price) > 150
    OR COUNT(*) > 5
ORDER BY avg_price DESC;`}
        height={190}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customers with multiple orders but average order below ₹500
-- (frequent low-value shoppers — coupon hunters, potential churn risk)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.loyalty_tier,
  COUNT(o.order_id)                    AS order_count,
  ROUND(AVG(o.total_amount), 2)        AS avg_order_value,
  ROUND(SUM(o.total_amount), 2)        AS total_spend
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
HAVING COUNT(o.order_id) >= 2
   AND AVG(o.total_amount) < 500
ORDER BY order_count DESC;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="WHERE + GROUP BY + HAVING Together — The Full Pattern" />

      <P>In production analytics queries, WHERE, GROUP BY, and HAVING all appear together. Each does its distinct job at its distinct stage of execution.</P>

      <CodeBlock
        label="The three-clause filter pattern"
        code={`SELECT   store_id, COUNT(*), SUM(total_amount)
FROM     orders
WHERE    order_status = 'Delivered'    -- (1) row filter: only delivered orders
  AND    order_date >= '2024-01-01'   -- (2) row filter: only 2024 orders
GROUP BY store_id                      -- (3) group: one bucket per store
HAVING   COUNT(*) >= 3                 -- (4) group filter: stores with 3+ orders
  AND    SUM(total_amount) > 1500      -- (5) group filter: revenue threshold
ORDER BY SUM(total_amount) DESC;       -- (6) sort by revenue`}
      />

      <SQLPlayground
        initialQuery={`-- Complete three-clause query:
-- WHERE: filter to delivered orders placed in 2024
-- GROUP BY: one row per store
-- HAVING: only stores with 3+ orders AND revenue > ₹1,500
SELECT
  o.store_id,
  s.city,
  COUNT(*)                       AS delivered_orders,
  ROUND(SUM(o.total_amount), 2)  AS revenue,
  ROUND(AVG(o.total_amount), 2)  AS avg_order
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
GROUP BY o.store_id, s.city
HAVING COUNT(*) >= 3
   AND SUM(o.total_amount) > 1500
ORDER BY revenue DESC;`}
        height={230}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Another full pattern:
-- WHERE: only in-stock products
-- GROUP BY: by category and brand
-- HAVING: categories where the brand has multiple products AND avg price > ₹50
SELECT
  category,
  brand,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  MIN(unit_price)                AS cheapest,
  MAX(unit_price)                AS most_expensive
FROM products
WHERE in_stock = true
GROUP BY category, brand
HAVING COUNT(*) >= 2
   AND AVG(unit_price) > 50
ORDER BY category, avg_price DESC;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="HAVING Without GROUP BY — Rare But Valid" />

      <P>HAVING can be used without GROUP BY. In this case, the entire table (or filtered rows) is treated as one group. HAVING then decides whether that single group appears in the result. This is rarely useful in practice — a WHERE condition on a scalar subquery usually achieves the same result more clearly — but it is syntactically valid.</P>

      <SQLPlayground
        initialQuery={`-- Return the summary row only if total orders exceed 20
-- (HAVING without GROUP BY — entire table is one group)
SELECT
  COUNT(*)                       AS total_orders,
  ROUND(SUM(total_amount), 2)    AS total_revenue
FROM orders
WHERE order_status = 'Delivered'
HAVING COUNT(*) > 20;
-- Returns the row if there are more than 20 delivered orders
-- Returns nothing if 20 or fewer`}
        height={165}
        showSchema={false}
      />

      <Callout type="info">
        HAVING without GROUP BY is mostly a curiosity. The more common and clearer pattern for "only return results if the aggregate condition is met" is to use a subquery or CTE. In practice, if you find yourself writing HAVING without GROUP BY, ask whether the business question is better served by a different query structure.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="HAVING vs WHERE — Performance and Correctness" />

      <P>Understanding when to use WHERE versus HAVING is both a correctness issue and a performance issue. Using HAVING where WHERE should be used is one of the most common SQL performance mistakes.</P>

      <H>Correctness — when only HAVING works</H>
      <P>HAVING is required when the filter condition references an aggregate function. WHERE cannot reference aggregates — they do not exist at the WHERE stage. This is a hard requirement, not a preference.</P>

      <CodeBlock
        label="Only HAVING works — aggregate conditions"
        code={`-- These REQUIRE HAVING (cannot use WHERE):
HAVING COUNT(*) > 5                     -- aggregate: row count per group
HAVING SUM(total_amount) > 1000         -- aggregate: sum per group
HAVING AVG(unit_price) > 100            -- aggregate: average per group
HAVING MAX(salary) > MIN(salary) * 2    -- aggregate: comparison of aggregates`}
      />

      <H>Performance — when WHERE is better than HAVING</H>
      <P>For conditions on non-aggregate columns, always use WHERE instead of HAVING. WHERE filters rows before grouping — fewer rows means less grouping work. HAVING filters after grouping — all the grouping work is done before the filter is applied.</P>

      <SQLPlayground
        initialQuery={`-- SLOW: HAVING on a non-aggregate column
-- Groups ALL rows first, then discards non-Delivered groups
SELECT
  store_id,
  COUNT(*)                       AS order_count
FROM orders
GROUP BY store_id, order_status
HAVING order_status = 'Delivered'
ORDER BY order_count DESC;`}
        height={155}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- FAST: WHERE on a non-aggregate column
-- Filters rows BEFORE grouping — less work for GROUP BY
SELECT
  store_id,
  COUNT(*)                       AS order_count
FROM orders
WHERE order_status = 'Delivered'   -- filter first
GROUP BY store_id
ORDER BY order_count DESC;`}
        height={150}
        showSchema={false}
      />

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Condition type', 'Use', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Filter on individual column value', 'WHERE', 'Runs before grouping — reduces rows GROUP BY must process'],
              ['Filter on aggregate result (COUNT, SUM, AVG)', 'HAVING', 'Aggregates do not exist until after GROUP BY — WHERE cannot access them'],
              ['Filter on GROUP BY column value', 'WHERE (preferred)', 'Technically works in HAVING but WHERE is faster — filter before grouping'],
              ['Filter combining row and aggregate conditions', 'BOTH', 'Row conditions in WHERE, aggregate conditions in HAVING'],
            ].map(([cond, use, why], i) => (
              <tr key={cond} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{cond}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: use === 'WHERE (preferred)' || use === 'WHERE' ? '#00e676' : use === 'HAVING' ? C : '#f59e0b', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{use}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Advanced HAVING — Filtering on Computed Expressions" />

      <P>HAVING can filter on any aggregate expression — not just raw aggregates. This enables sophisticated group-level filters that express complex business rules.</P>

      <H>Filter on a ratio or percentage</H>

      <SQLPlayground
        initialQuery={`-- Payment methods where cancellation rate exceeds 20%
SELECT
  payment_method,
  COUNT(*)                                   AS total_orders,
  SUM(CASE WHEN order_status = 'Cancelled'
      THEN 1 ELSE 0 END)                     AS cancelled_orders,
  ROUND(
    SUM(CASE WHEN order_status = 'Cancelled' THEN 1.0 ELSE 0 END)
    / COUNT(*) * 100
  , 1)                                       AS cancellation_rate_pct
FROM orders
GROUP BY payment_method
HAVING SUM(CASE WHEN order_status = 'Cancelled' THEN 1.0 ELSE 0 END)
       / COUNT(*) > 0.20
ORDER BY cancellation_rate_pct DESC;`}
        height={230}
        showSchema={true}
      />

      <H>Filter comparing two aggregates</H>

      <SQLPlayground
        initialQuery={`-- Categories where max price is more than 5x the min price
-- (high price dispersion within category)
SELECT
  category,
  COUNT(*)                       AS product_count,
  MIN(unit_price)                AS min_price,
  MAX(unit_price)                AS max_price,
  ROUND(MAX(unit_price) / NULLIF(MIN(unit_price), 0), 1) AS price_ratio
FROM products
GROUP BY category
HAVING MAX(unit_price) > MIN(unit_price) * 5
ORDER BY price_ratio DESC;`}
        height={190}
        showSchema={false}
      />

      <H>Filter using HAVING with DISTINCT count ratio</H>

      <SQLPlayground
        initialQuery={`-- Stores where more than half the orders come from repeat customers
-- (customers who placed more than one order)
SELECT
  o.store_id,
  s.city,
  COUNT(o.order_id)                          AS total_orders,
  COUNT(DISTINCT o.customer_id)              AS unique_customers,
  ROUND(
    COUNT(o.order_id)::DECIMAL
    / NULLIF(COUNT(DISTINCT o.customer_id), 0)
  , 1)                                       AS orders_per_customer
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY o.store_id, s.city
HAVING COUNT(o.order_id)::DECIMAL
       / NULLIF(COUNT(DISTINCT o.customer_id), 0) > 1.5
ORDER BY orders_per_customer DESC;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="HAVING in Subqueries and CTEs" />

      <P>HAVING queries are frequently used as subqueries or CTEs — first filtering groups with HAVING, then using that filtered result as input for further queries.</P>

      <H>HAVING result as a subquery</H>

      <SQLPlayground
        initialQuery={`-- Get full customer details for high-value customers
-- (customers who spent more than ₹1,000 in delivered orders)
SELECT
  c.customer_id,
  c.first_name,
  c.last_name,
  c.email,
  c.city,
  c.loyalty_tier,
  hv.total_spend,
  hv.order_count
FROM customers AS c
JOIN (
  -- Subquery: identify high-value customers using HAVING
  SELECT
    customer_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
  HAVING SUM(total_amount) > 1000
) AS hv ON c.customer_id = hv.customer_id
ORDER BY hv.total_spend DESC;`}
        height={260}
        showSchema={false}
      />

      <H>HAVING in a CTE</H>

      <SQLPlayground
        initialQuery={`-- CTE: identify active stores (3+ orders)
-- Then join back for full store details and ranking
WITH active_stores AS (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
  HAVING COUNT(*) >= 3
)
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.manager_name,
  a.order_count,
  a.revenue,
  s.monthly_target,
  ROUND(a.revenue / s.monthly_target * 100, 1) AS target_achieved_pct
FROM active_stores AS a
JOIN stores AS s ON a.store_id = s.store_id
ORDER BY a.revenue DESC;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data analyst at Razorpay, India's largest payment gateway. The risk team has asked you to identify merchant accounts showing unusual activity patterns that may indicate fraud or policy violations. They have given you three criteria that define "flagged" merchants.</P>

      <TimeBlock time="3:00 PM" label="Risk team criteria arrive">
        Flag any merchant where: (1) average transaction value exceeds ₹5,000 AND total transaction count is below 10 (low volume, high value — unusual), (2) OR cancellation rate exceeds 30% of all transactions, (3) OR they have only 1 distinct payment method used (legitimate merchants typically use multiple methods). Adapted for FreshCart: flag stores matching analogous patterns.
      </TimeBlock>

      <TimeBlock time="3:20 PM" label="You build the query">
        Three OR conditions on aggregate values — this is a HAVING query with multiple conditions.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Flag stores with unusual order patterns
-- Three OR conditions, all requiring HAVING (aggregate filters)
SELECT
  o.store_id,
  s.city,
  COUNT(*)                                    AS total_orders,
  ROUND(AVG(o.total_amount), 2)               AS avg_order_value,
  COUNT(DISTINCT o.payment_method)            AS payment_methods_used,
  ROUND(
    SUM(CASE WHEN o.order_status = 'Cancelled'
        THEN 1.0 ELSE 0 END)
    / COUNT(*) * 100
  , 1)                                        AS cancellation_rate_pct,
  CASE
    WHEN AVG(o.total_amount) > 1000
     AND COUNT(*) < 5                        THEN 'Low-volume high-value'
    WHEN SUM(CASE WHEN o.order_status = 'Cancelled'
         THEN 1.0 ELSE 0 END) / COUNT(*) > 0.3 THEN 'High cancellation'
    WHEN COUNT(DISTINCT o.payment_method) = 1 THEN 'Single payment method'
    ELSE 'Multiple flags'
  END                                         AS flag_reason
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
GROUP BY o.store_id, s.city
HAVING (AVG(o.total_amount) > 1000 AND COUNT(*) < 5)
    OR (SUM(CASE WHEN o.order_status = 'Cancelled'
        THEN 1.0 ELSE 0 END) / COUNT(*) > 0.3)
    OR (COUNT(DISTINCT o.payment_method) = 1)
ORDER BY cancellation_rate_pct DESC;`}
        height={310}
        showSchema={true}
      />

      <TimeBlock time="3:50 PM" label="Results reviewed">
        The query returns the flagged stores with the flag reason labelled via CASE WHEN. The risk team immediately has an actionable list. Two stores show high cancellation rates — these are escalated for review. The pattern-detection query is saved to the shared analytics library and scheduled to run weekly.
      </TimeBlock>

      <ProTip>
        HAVING is the right tool whenever the business question is of the form "show me groups WHERE the aggregate is X." The moment you find yourself wanting to filter by a count, a sum, an average, or any other aggregate result, that is HAVING. The mental model: WHERE is for individual records (rows), HAVING is for groups (buckets). Write WHERE first, GROUP BY next, then add HAVING for any remaining aggregate filters.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is HAVING and how does it differ from WHERE?">
        <p style={{ margin: '0 0 14px' }}>HAVING is a filter clause that operates on groups after GROUP BY has formed them and after aggregate functions have been computed. WHERE is a filter clause that operates on individual rows before GROUP BY processes them. Both filter data, but they work at different stages of query execution and on different things.</p>
        <p style={{ margin: '0 0 14px' }}>The distinction follows directly from SQL's execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE runs at step 2, before groups exist. HAVING runs at step 4, after groups and their aggregates are fully computed. This means WHERE can only reference raw column values — the aggregate functions have not run yet. HAVING can reference aggregate results — the groups exist and their metrics are known.</p>
        <p style={{ margin: 0 }}>Concrete example: to find stores with more than 5 delivered orders, you need WHERE order_status = 'Delivered' to filter individual orders (a row-level condition), GROUP BY store_id to group them by store, and HAVING COUNT(*) {'>'} 5 to keep only groups with more than 5 rows. Using WHERE COUNT(*) {'>'} 5 is a syntax error — WHERE cannot reference aggregates. Using HAVING order_status = 'Delivered' instead of WHERE works technically but is inefficient — it groups all orders including cancelled ones, then discards the non-Delivered groups after the grouping work is done. Always put row-level conditions in WHERE and aggregate conditions in HAVING.</p>
      </IQ>

      <IQ q="Can you use HAVING without GROUP BY?">
        <p style={{ margin: '0 0 14px' }}>Yes — HAVING without GROUP BY is syntactically valid in SQL. When HAVING appears without GROUP BY, the entire table (or the rows surviving the WHERE filter) is treated as a single group. HAVING then decides whether that single group appears in the result. If the HAVING condition is TRUE for the aggregate over all rows, the query returns one summary row. If FALSE, the query returns zero rows.</p>
        <p style={{ margin: '0 0 14px' }}>Example: SELECT COUNT(*), SUM(total_amount) FROM orders HAVING COUNT(*) {'>'} 100 returns the count and sum if there are more than 100 orders, and returns nothing if there are 100 or fewer. This is technically correct SQL.</p>
        <p style={{ margin: 0 }}>In practice, HAVING without GROUP BY is rarely used or recommended. The same result can almost always be expressed more clearly with a subquery or WHERE clause. SELECT COUNT(*), SUM(total_amount) FROM orders WHERE (SELECT COUNT(*) FROM orders) {'>'} 100 or putting the condition in application code after checking the count. HAVING without GROUP BY exists in the SQL standard and databases support it, but you will rarely see it in production code and it can confuse readers who expect HAVING to accompany GROUP BY.</p>
      </IQ>

      <IQ q="Write a query to find customers who have placed more than 2 orders with an average order value above ₹500.">
        <p style={{ margin: '0 0 14px' }}>This requires two aggregate conditions on the same group — COUNT of orders and AVG of order values — so both belong in HAVING. The WHERE clause filters to only delivered orders (a row-level condition that should happen before grouping for efficiency).</p>
        <p style={{ margin: '0 0 14px' }}>The query: SELECT c.customer_id, c.first_name || ' ' || c.last_name AS customer, COUNT(o.order_id) AS order_count, ROUND(AVG(o.total_amount), 2) AS avg_order_value FROM customers AS c JOIN orders AS o ON c.customer_id = o.customer_id WHERE o.order_status = 'Delivered' GROUP BY c.customer_id, c.first_name, c.last_name HAVING COUNT(o.order_id) {'>'} 2 AND AVG(o.total_amount) {'>'} 500 ORDER BY avg_order_value DESC.</p>
        <p style={{ margin: 0 }}>The reasoning for each clause: JOIN brings orders alongside customer data. WHERE filters to delivered orders before grouping — this is a row-level condition. GROUP BY customer_id (plus name columns per the non-aggregate rule) creates one group per customer. HAVING COUNT {'>'} 2 filters to customers with more than two orders. HAVING AVG {'>'} 500 filters to customers whose average order exceeds ₹500. Both HAVING conditions must be satisfied simultaneously (AND). ORDER BY sorts by average order value descending — highest-value customers first. This query pattern — filter by count AND filter by aggregate value — is one of the most common HAVING patterns in customer analytics.</p>
      </IQ>

      <IQ q="What is the performance implication of using HAVING instead of WHERE for non-aggregate conditions?">
        <p style={{ margin: '0 0 14px' }}>Using HAVING for a condition that could be expressed in WHERE is a performance mistake that causes unnecessary work. HAVING filters groups after GROUP BY has already processed all rows. If a non-aggregate condition belongs in WHERE but is mistakenly placed in HAVING, the database groups all rows — including those that would be excluded by the condition — before discarding them at the HAVING stage. All the grouping computation for those excluded rows is wasted.</p>
        <p style={{ margin: '0 0 14px' }}>Concrete example with scale: a table with 10 million orders, 2 million of which are 'Delivered'. HAVING order_status = 'Delivered' after GROUP BY processes all 10 million rows and forms groups for all statuses, then discards non-Delivered groups. WHERE order_status = 'Delivered' filters first — GROUP BY processes only 2 million rows. The WHERE version does 80% less grouping work on this data distribution.</p>
        <p style={{ margin: 0 }}>The rule: move any condition expressible on individual row values from HAVING to WHERE. Only conditions requiring aggregate function results belong in HAVING. A quick test: if the condition does not contain COUNT, SUM, AVG, MIN, MAX, or any aggregate function, it should be in WHERE. If it does contain an aggregate, it must be in HAVING. Following this rule consistently keeps GROUP BY queries at their most efficient regardless of table size.</p>
      </IQ>

      <IQ q="How would you find products that appear in more than half of all orders?">
        <p style={{ margin: '0 0 14px' }}>This requires comparing a per-product aggregate (how many orders contain this product) against an overall aggregate (total number of orders). It is a HAVING filter where the threshold is itself a computed value — not a hardcoded number.</p>
        <p style={{ margin: '0 0 14px' }}>Approach 1 — subquery in HAVING: SELECT product_id, COUNT(DISTINCT order_id) AS order_count FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT order_id) {'>'} (SELECT COUNT(*) * 0.5 FROM orders). The subquery (SELECT COUNT(*) * 0.5 FROM orders) computes half the total order count and is evaluated once. HAVING then compares each product's order count against this threshold.</p>
        <p style={{ margin: 0 }}>Approach 2 — window function (more elegant): SELECT product_id, COUNT(DISTINCT order_id) AS order_count, COUNT(DISTINCT order_id) * 1.0 / COUNT(DISTINCT order_id) OVER () AS fraction_of_orders FROM order_items GROUP BY product_id HAVING COUNT(DISTINCT order_id) * 1.0 / (SELECT COUNT(*) FROM orders) {'>'} 0.5. The subquery approach is simpler and more universally supported. In practice, "appears in more than X% of all orders" is called market basket penetration rate — a key metric in retail analytics used to identify anchor products that drive traffic. Products with very high penetration {'(>50%)'} are typically staples like milk, bread, or cooking oil that customers purchase on almost every visit.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: aggregate functions are not allowed in WHERE"
        cause="You tried to use COUNT, SUM, AVG, MIN, or MAX inside a WHERE clause. WHERE runs before GROUP BY in the execution order — aggregate values do not exist yet at the WHERE stage. The database cannot evaluate an aggregate condition on individual rows because aggregates are computed across groups of rows, not single rows."
        fix="Move the aggregate condition to HAVING. HAVING runs after GROUP BY when groups and their aggregates are fully computed. WHERE COUNT(*) > 5 becomes HAVING COUNT(*) > 5. If there is no GROUP BY in your query, add one: GROUP BY the relevant column, then add HAVING. If you genuinely want to filter based on a whole-table aggregate (not per-group), use a subquery in WHERE: WHERE column > (SELECT AVG(column) FROM table)."
      />

      <Err
        msg="HAVING clause returns no rows — expected results"
        cause="The HAVING condition is too restrictive — no group satisfies it. This happens when the threshold in HAVING is higher than any group's aggregate value, when the WHERE clause already filtered too aggressively leaving insufficient rows in any group, or when the GROUP BY columns create too many small groups (each with a low count) and the HAVING COUNT threshold is never reached."
        fix="Debug by temporarily removing the HAVING clause and examining what the aggregates actually are: SELECT store_id, COUNT(*) AS cnt FROM orders GROUP BY store_id ORDER BY cnt DESC. See the maximum COUNT value across all groups. If the maximum is 3 and your HAVING COUNT(*) > 10 was expecting results, the data does not have groups that large. Adjust the HAVING threshold to match realistic data distributions, or check whether the WHERE clause is too restrictive."
      />

      <Err
        msg="HAVING filters correctly but query is very slow on a large table"
        cause="A non-aggregate condition is in HAVING instead of WHERE — forcing the database to group all rows before filtering. For example, HAVING order_status = 'Delivered' instead of WHERE order_status = 'Delivered'. The database must group all rows (including Cancelled, Returned, Processing) into their groups, compute aggregates for all groups, and only then discard the non-Delivered groups. All the grouping work for non-Delivered rows is wasted."
        fix="Move any condition on non-aggregate columns from HAVING to WHERE. Scan the HAVING clause: if any condition does not reference an aggregate function (COUNT, SUM, AVG, MIN, MAX), move it to WHERE. This pre-filters rows before GROUP BY, dramatically reducing the number of rows that need to be grouped. Use EXPLAIN ANALYZE to compare execution plans before and after — the filter-before-group plan will show significantly lower row counts at the GROUP BY node."
      />

      <Err
        msg="HAVING with SELECT alias fails — column 'order_count' does not exist in HAVING"
        cause="You tried to use a SELECT alias in HAVING: SELECT COUNT(*) AS order_count ... HAVING order_count > 5. HAVING runs before SELECT in the logical execution order — the alias 'order_count' does not exist yet when HAVING evaluates. This is the same reason SELECT aliases cannot be used in WHERE."
        fix="Repeat the aggregate expression in HAVING: HAVING COUNT(*) > 5. Do not reference the alias. In DuckDB and MySQL, using SELECT aliases in HAVING sometimes works due to implementation-specific extensions, but relying on this is not portable to PostgreSQL or standard SQL. For complex expressions repeated in both SELECT and HAVING, use a CTE: WITH agg AS (SELECT store_id, COUNT(*) AS cnt FROM orders GROUP BY store_id) SELECT store_id, cnt FROM agg WHERE cnt > 5 — the outer query can reference the alias because it is now a proper column in the CTE result."
      />

      <Err
        msg="Query returns wrong counts — HAVING COUNT(*) includes rows that should be excluded"
        cause="A condition that should be in WHERE is absent, causing rows that should be excluded to still participate in grouping and be counted by the HAVING aggregate. For example, counting all order statuses when only 'Delivered' orders should count — HAVING COUNT(*) > 3 counts every order, not just delivered ones, so a store with 2 delivered and 2 cancelled orders passes the threshold incorrectly."
        fix="Add the appropriate WHERE condition: WHERE order_status = 'Delivered'. This excludes non-Delivered rows before grouping, so COUNT(*) in HAVING only counts the rows you care about. Alternatively, use conditional counting in HAVING: HAVING SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END) > 3 — this counts only Delivered rows within each group without filtering other rows from the group. Use conditional counting when you need both the filtered count and other metrics (like total orders including all statuses) in the same query."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart loyalty team needs to identify customers for a targeted re-engagement campaign. Write a query that finds customers who meet ALL of these criteria: placed at least 2 delivered orders, have an average delivered order value between ₹300 and ₹800 (not too cheap, not already high-value), and their most recent delivered order was before '2024-03-01' (lapsed customers). Show customer_id, full name, city, loyalty_tier, order_count, avg_order_value (rounded to 2 decimal places), and last_order_date. Sort by last_order_date ascending (longest lapsed first)."
        hint="JOIN customers to orders. WHERE for delivered status. GROUP BY customer details. HAVING for the three aggregate conditions: COUNT >= 2, AVG BETWEEN 300 AND 800, MAX(order_date) < '2024-03-01'."
        answer={`SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name    AS full_name,
  c.city,
  c.loyalty_tier,
  COUNT(o.order_id)                     AS order_count,
  ROUND(AVG(o.total_amount), 2)         AS avg_order_value,
  MAX(o.order_date)                     AS last_order_date
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY
  c.customer_id,
  c.first_name,
  c.last_name,
  c.city,
  c.loyalty_tier
HAVING COUNT(o.order_id) >= 2
   AND AVG(o.total_amount) BETWEEN 300 AND 800
   AND MAX(o.order_date) < '2024-03-01'
ORDER BY last_order_date ASC;`}
        explanation="WHERE filters to only delivered orders before grouping — non-delivered orders never enter any group or affect any aggregate. GROUP BY lists all non-aggregate SELECT columns (customer_id, first_name, last_name, city, loyalty_tier) following the GROUP BY rule. All three HAVING conditions reference aggregate functions so they correctly belong in HAVING, not WHERE. COUNT(o.order_id) >= 2 ensures engagement history. AVG BETWEEN 300 AND 800 targets the mid-value segment — neither low-spend nor already high-value. MAX(o.order_date) < '2024-03-01' identifies lapsed customers by ensuring even their most recent order is before the cutoff date. ORDER BY last_order_date ASC puts the longest-lapsed customers first — the campaign team would prioritise outreach to customers who have been inactive the longest."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'HAVING filters groups after GROUP BY has formed them and aggregates have been computed. WHERE filters individual rows before GROUP BY. Same concept — different execution stage, different purpose.',
          'HAVING is required when the filter condition references an aggregate function (COUNT, SUM, AVG, MIN, MAX). WHERE cannot reference aggregates — they do not exist at the WHERE stage.',
          'Always put non-aggregate conditions in WHERE, not HAVING. WHERE filters rows before grouping — less work for GROUP BY. HAVING filters after all grouping is done — wasted work on excluded groups.',
          'Full execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. HAVING sees aggregate results; WHERE does not.',
          'HAVING supports AND, OR, NOT — the same logical operators as WHERE. Multiple aggregate conditions can be combined: HAVING COUNT(*) > 5 AND AVG(amount) > 1000.',
          'HAVING can filter on computed aggregate expressions: ratios (SUM/COUNT), comparisons between aggregates (MAX > MIN * 2), and percentage thresholds.',
          'SELECT aliases cannot be used in HAVING — HAVING runs before SELECT. Repeat the full aggregate expression in HAVING, or use a CTE to define the alias first.',
          'HAVING without GROUP BY is valid — treats all rows as one group. Rarely needed in practice; a subquery or application logic usually serves the same purpose more clearly.',
          'HAVING results work as subqueries and CTEs — filter groups first with HAVING, then use the result for further joins, aggregations, or reporting.',
          'The WHERE + GROUP BY + HAVING triad is the foundation of every analytics query. WHERE selects the rows, GROUP BY defines the dimensions, HAVING filters the metrics.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 30</strong>, you learn JOINs — the most powerful concept in relational SQL. How to combine data from multiple tables, the difference between INNER, LEFT, RIGHT, and FULL OUTER JOINs, and why joins are the foundation of every non-trivial query.
        </p>
        <Link href="/learn/sql/joins-intro" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 30 → Introduction to JOINs
        </Link>
      </div>

    </LearnLayout>
  );
}