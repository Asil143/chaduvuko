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

export default function CteWithClause() {
  return (
    <LearnLayout
      title="CTE — WITH Clause"
      description="Named intermediate results that make complex queries readable — single CTEs, chained multi-step CTEs, reuse within one query, DML with CTEs, and performance considerations"
      section="SQL — Module 41"
      readTime="14–20 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a CTE Is and Why It Exists" />

      <P>A CTE (Common Table Expression) is a named temporary result set defined at the top of a query using the WITH keyword. It works like a derived table — it computes a SELECT and makes the result available as a named table — but it appears before the main query instead of inline within it, and it can be referenced multiple times.</P>

      <P>The problem CTEs solve is readability and reuse. As queries grow in complexity — multiple pre-aggregations, sequential analytical steps, values needed in several places — inline subqueries and nested derived tables become hard to read and maintain. CTEs let you write each logical step once, give it a descriptive name, and refer to it cleanly by name wherever it is needed.</P>

      <CodeBlock
        label="CTE syntax — the WITH keyword"
        code={`-- Single CTE
WITH cte_name AS (
  SELECT ...    -- the CTE definition
  FROM ...
  WHERE ...
)
SELECT ...      -- the main query uses the CTE by name
FROM cte_name
WHERE ...;

-- Multiple CTEs — chain with commas
WITH
first_cte AS (
  SELECT ...
),
second_cte AS (
  SELECT ...
  FROM first_cte    -- can reference previous CTEs
  JOIN other_table ON ...
),
third_cte AS (
  SELECT ...
  FROM second_cte
)
SELECT *
FROM third_cte
JOIN first_cte ON ...;   -- main query can reference any CTE`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Single CTE — The Basic Pattern" />

      <H>Replacing a derived table with a CTE</H>

      <SQLPlayground
        initialQuery={`-- Equivalent to a derived table in FROM but reads top-to-bottom
WITH customer_spend AS (
  SELECT
    customer_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_spend,
    ROUND(AVG(total_amount), 2)  AS avg_order
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  c.city,
  cs.order_count,
  cs.total_spend,
  cs.avg_order
FROM customers AS c
JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
ORDER BY cs.total_spend DESC;`}
        height={255}
        showSchema={true}
      />

      <H>CTE for pre-filtering</H>

      <SQLPlayground
        initialQuery={`-- Name the filtered subset — makes the main query intent clear
WITH delivered_orders AS (
  SELECT
    order_id,
    customer_id,
    store_id,
    order_date,
    delivery_date,
    total_amount,
    payment_method
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= '2024-01-01'
)
SELECT
  s.city             AS store_city,
  COUNT(d.order_id)  AS delivered_count,
  ROUND(SUM(d.total_amount), 2)  AS revenue,
  ROUND(AVG(julianday(d.delivery_date) - julianday(d.order_date)), 1) AS avg_delivery_days
FROM stores AS s
JOIN delivered_orders AS d ON s.store_id = d.store_id
GROUP BY s.city
ORDER BY revenue DESC;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Multiple CTEs — Sequential Step-by-Step Logic" />

      <P>Multiple CTEs chain together — each CTE can reference CTEs defined before it. This enables expressing complex multi-step analytical logic as a sequence of clearly named transformations, each building on the previous. The main SELECT at the end assembles the final result from the named CTEs.</P>

      <H>Three-step customer analysis</H>

      <SQLPlayground
        initialQuery={`-- Step 1: customer order totals
-- Step 2: tier-level averages
-- Step 3: compare each customer to their tier average
WITH
customer_totals AS (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2)  AS total_spend,
    COUNT(*)                     AS order_count
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
),
tier_averages AS (
  SELECT
    c.loyalty_tier,
    ROUND(AVG(ct.total_spend), 2)  AS avg_tier_spend,
    COUNT(c.customer_id)           AS tier_size
  FROM customers AS c
  JOIN customer_totals AS ct ON c.customer_id = ct.customer_id
  GROUP BY c.loyalty_tier
)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  ct.total_spend,
  ct.order_count,
  ta.avg_tier_spend,
  ROUND(ct.total_spend - ta.avg_tier_spend, 2)  AS vs_tier_avg,
  CASE
    WHEN ct.total_spend > ta.avg_tier_spend * 1.5 THEN 'Star'
    WHEN ct.total_spend > ta.avg_tier_spend       THEN 'Above average'
    ELSE 'Below average'
  END                                            AS tier_status
FROM customers AS c
JOIN customer_totals AS ct ON c.customer_id = ct.customer_id
JOIN tier_averages   AS ta ON c.loyalty_tier = ta.loyalty_tier
ORDER BY c.loyalty_tier, ct.total_spend DESC;`}
        height={330}
        showSchema={true}
      />

      <H>Four-step product performance pipeline</H>

      <SQLPlayground
        initialQuery={`WITH
-- Step 1: sales by product
product_sales AS (
  SELECT
    oi.product_id,
    SUM(oi.quantity)              AS units_sold,
    ROUND(SUM(oi.line_total), 2)  AS revenue,
    COUNT(DISTINCT oi.order_id)   AS times_ordered
  FROM order_items AS oi
  JOIN orders AS o ON oi.order_id = o.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY oi.product_id
),
-- Step 2: enrich with product details
product_enriched AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.unit_price,
    p.cost_price,
    COALESCE(ps.units_sold, 0)   AS units_sold,
    COALESCE(ps.revenue, 0)      AS revenue,
    COALESCE(ps.times_ordered, 0) AS times_ordered,
    ROUND((p.unit_price - p.cost_price) / p.unit_price * 100, 1) AS margin_pct
  FROM products AS p
  LEFT JOIN product_sales AS ps ON p.product_id = ps.product_id
),
-- Step 3: category benchmarks
category_benchmarks AS (
  SELECT
    category,
    ROUND(AVG(revenue), 2)  AS avg_category_revenue,
    MAX(revenue)            AS max_category_revenue
  FROM product_enriched
  GROUP BY category
)
-- Step 4: final output with benchmarks
SELECT
  pe.product_name,
  pe.category,
  pe.unit_price,
  pe.margin_pct,
  pe.units_sold,
  pe.revenue,
  cb.avg_category_revenue,
  ROUND(pe.revenue - cb.avg_category_revenue, 2) AS vs_category_avg,
  CASE
    WHEN pe.revenue = cb.max_category_revenue THEN '🏆 Category leader'
    WHEN pe.revenue > cb.avg_category_revenue THEN '↑ Above average'
    WHEN pe.revenue = 0                       THEN '⚠ No sales'
    ELSE '↓ Below average'
  END AS performance
FROM product_enriched AS pe
JOIN category_benchmarks AS cb ON pe.category = cb.category
ORDER BY pe.category, pe.revenue DESC;`}
        height={380}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="CTE Reuse — Referencing the Same CTE Multiple Times" />

      <P>The key advantage of CTEs over derived tables: a CTE can be referenced multiple times in the main query or in subsequent CTEs. This eliminates the need to repeat the same subquery in multiple places — define it once, use it everywhere.</P>

      <H>Using the same CTE in multiple JOINs</H>

      <SQLPlayground
        initialQuery={`-- customer_spend CTE used TWICE:
-- once to join to customer details
-- once to compute the overall average (CROSS JOIN)
WITH customer_spend AS (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2)  AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  cs.total_spend,
  overall.avg_spend,
  ROUND(cs.total_spend - overall.avg_spend, 2)  AS vs_overall
FROM customers AS c
JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
CROSS JOIN (
  SELECT ROUND(AVG(total_spend), 2) AS avg_spend
  FROM customer_spend    -- second reference to the same CTE
) AS overall
ORDER BY cs.total_spend DESC;`}
        height={275}
        showSchema={true}
      />

      <H>CTE used in a subsequent CTE and in the main SELECT</H>

      <SQLPlayground
        initialQuery={`WITH
store_revenue AS (
  -- Defined once
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
),
store_rank AS (
  -- References store_revenue (CTE → CTE)
  SELECT
    store_id,
    revenue,
    RANK() OVER (ORDER BY revenue DESC) AS rev_rank
  FROM store_revenue
)
-- Main query references BOTH CTEs
SELECT
  s.store_id,
  s.city,
  sr.revenue,
  sr.revenue / (SELECT SUM(revenue) FROM store_revenue) * 100  AS pct_total,
  srk.rev_rank
FROM stores AS s
JOIN store_revenue AS sr  ON s.store_id = sr.store_id
JOIN store_rank    AS srk ON s.store_id = srk.store_id
ORDER BY srk.rev_rank;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="CTEs with INSERT, UPDATE, and DELETE — DML CTEs" />

      <P>In PostgreSQL, CTEs are not limited to SELECT queries. They can be used with INSERT, UPDATE, and DELETE — enabling multi-step data modifications in a single atomic statement. The RETURNING clause from DML CTEs makes this especially powerful.</P>

      <H>INSERT using CTE result</H>

      <CodeBlock
        label="CTE with INSERT"
        code={`-- Identify high-value customers and insert them into a VIP table
WITH high_value AS (
  SELECT
    customer_id,
    SUM(total_amount) AS lifetime_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
  HAVING SUM(total_amount) > 2000
)
INSERT INTO vip_customers (customer_id, lifetime_value, created_at)
SELECT customer_id, lifetime_value, NOW()
FROM high_value
ON CONFLICT (customer_id) DO UPDATE
  SET lifetime_value = EXCLUDED.lifetime_value;`}
      />

      <H>UPDATE with CTE — complex conditional update</H>

      <SQLPlayground
        initialQuery={`-- Preview: which customers would qualify for loyalty upgrade?
-- CTE computes spend, outer UPDATE uses the result
WITH qualifying AS (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2)  AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
  HAVING SUM(total_amount) >= 500
)
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier          AS current_tier,
  q.total_spend,
  'Silver'                AS would_upgrade_to
FROM customers AS c
JOIN qualifying AS q ON c.customer_id = q.customer_id
WHERE c.loyalty_tier = 'Bronze'
ORDER BY q.total_spend DESC;`}
        height={245}
        showSchema={true}
      />

      <H>DELETE with RETURNING — archive-then-delete</H>

      <CodeBlock
        label="CTE with DELETE + RETURNING — atomic archive"
        code={`-- Archive old cancelled orders then delete them — all in one statement
WITH archived AS (
  DELETE FROM orders
  WHERE order_status = 'Cancelled'
    AND order_date < CURRENT_DATE - INTERVAL '1 year'
  RETURNING *   -- capture deleted rows
)
INSERT INTO orders_archive
SELECT *, NOW() AS archived_at
FROM archived;

-- This is fully atomic: if the INSERT fails, the DELETE rolls back too
-- No risk of deleting without archiving`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="CTE for Deduplication and Data Cleaning" />

      <P>CTEs make deduplication queries readable by separating the identification of duplicates from the deletion or selection logic.</P>

      <SQLPlayground
        initialQuery={`-- Identify duplicate customers by email
-- Show which to keep (lowest customer_id = oldest) and which are duplicates
WITH email_groups AS (
  SELECT
    email,
    MIN(customer_id)  AS keep_id,
    MAX(customer_id)  AS duplicate_id,
    COUNT(*)          AS occurrences
  FROM customers
  GROUP BY email
  HAVING COUNT(*) > 1
)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  CASE
    WHEN c.customer_id = eg.keep_id      THEN 'Keep (oldest)'
    ELSE 'Remove (duplicate)'
  END                                  AS action
FROM customers AS c
JOIN email_groups AS eg ON c.email = eg.email
ORDER BY c.email, c.customer_id;`}
        height={260}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Remove duplicate rows keeping the one with the lowest ID
-- CTE identifies duplicates, DELETE removes them
WITH ranked_customers AS (
  SELECT
    customer_id,
    email,
    ROW_NUMBER() OVER (
      PARTITION BY email
      ORDER BY customer_id ASC   -- keep lowest ID (oldest)
    ) AS rn
  FROM customers
)
-- Preview: which rows would be deleted?
SELECT customer_id, email, rn AS row_number
FROM ranked_customers
WHERE rn > 1
ORDER BY email, customer_id;
-- In production: DELETE FROM customers WHERE customer_id IN
--   (SELECT customer_id FROM ranked_customers WHERE rn > 1)`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Performance — Materialisation vs Inlining" />

      <P>CTEs and derived tables are logically equivalent but may differ in execution. PostgreSQL (before version 12) always materialised CTEs — computed them once and stored the result. PostgreSQL 12+ made CTEs inlined by default unless they contain side effects. Understanding this helps you write CTEs that perform well.</P>

      <H>Materialised vs inlined — what changes</H>

      <CodeBlock
        label="Materialisation behaviour across databases"
        code={`-- PostgreSQL 12+ default: CTEs are NOT MATERIALIZED (inlined)
-- The optimiser can push predicates into the CTE and optimise freely
WITH customer_spend AS (
  SELECT customer_id, SUM(total_amount) AS spend
  FROM orders GROUP BY customer_id
)
SELECT * FROM customer_spend WHERE customer_id = 5;
-- Optimiser may push "WHERE customer_id = 5" into the CTE
-- so it only scans orders for customer_id = 5

-- Force materialisation (PostgreSQL 12+):
WITH customer_spend AS MATERIALIZED (
  SELECT customer_id, SUM(total_amount) AS spend
  FROM orders GROUP BY customer_id
)
-- CTE is computed once for ALL customers, cached, then filtered
-- Useful when the CTE result is used many times and re-computation is expensive

-- Force inlining (PostgreSQL 12+):
WITH customer_spend AS NOT MATERIALIZED (
  SELECT customer_id, SUM(total_amount) AS spend
  FROM orders GROUP BY customer_id
)
-- Equivalent to a derived table — fully inlined into the main query

-- MySQL: CTEs are always inlined (no materialisation control)
-- SQL Server: CTEs are inlined by default (can use hints)`}
      />

      <H>When to force materialisation</H>
      <P>Force MATERIALIZED when the CTE is referenced multiple times in the query and the computation is expensive — materialising once is cheaper than recomputing N times. Force NOT MATERIALIZED when a filter in the outer query is highly selective — allowing the optimiser to push that filter into the CTE avoids computing the full CTE result.</P>

      <SQLPlayground
        initialQuery={`-- Example where materialisation helps: CTE used twice
-- customer_spend is computed once and used for both the JOIN and the subquery
WITH customer_spend AS (
  SELECT
    customer_id,
    ROUND(SUM(total_amount), 2) AS total_spend
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  c.customer_id,
  c.first_name,
  cs.total_spend,
  ROUND(cs.total_spend / (
    SELECT SUM(total_spend) FROM customer_spend  -- second reference
  ) * 100, 2)                                   AS pct_of_total
FROM customers AS c
JOIN customer_spend AS cs ON c.customer_id = cs.customer_id
ORDER BY cs.total_spend DESC;`}
        height={265}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="CTEs for Report Building — The Complete Pattern" />

      <P>The full CTE-based report pattern: define each data dimension as its own named CTE, then assemble the final report in the main SELECT by joining those CTEs. Each CTE is independently testable — run it alone to verify its output before the full query.</P>

      <SQLPlayground
        initialQuery={`-- Complete store report: revenue, employees, products, delivery time
WITH
-- Dimension 1: delivered order metrics per store
order_metrics AS (
  SELECT
    store_id,
    COUNT(*)                                          AS order_count,
    ROUND(SUM(total_amount), 2)                       AS revenue,
    ROUND(AVG(total_amount), 2)                       AS avg_order,
    ROUND(AVG(julianday(delivery_date) - julianday(order_date)), 1) AS avg_delivery_days
  FROM orders
  WHERE order_status = 'Delivered'
    AND delivery_date IS NOT NULL
  GROUP BY store_id
),
-- Dimension 2: employee metrics per store
employee_metrics AS (
  SELECT
    store_id,
    COUNT(*)                    AS headcount,
    ROUND(AVG(salary), 0)       AS avg_salary,
    SUM(salary)                 AS payroll
  FROM employees
  WHERE store_id IS NOT NULL
  GROUP BY store_id
),
-- Dimension 3: product variety per store
product_variety AS (
  SELECT
    o.store_id,
    COUNT(DISTINCT oi.product_id)   AS distinct_products,
    COUNT(DISTINCT p.category)      AS distinct_categories
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id
),
-- Dimension 4: overall averages for benchmarking
overall_benchmarks AS (
  SELECT
    ROUND(AVG(revenue), 2)         AS avg_store_revenue,
    ROUND(AVG(avg_delivery_days), 1) AS avg_delivery_days_all
  FROM order_metrics
)
-- Final assembly
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  COALESCE(om.order_count, 0)        AS orders,
  COALESCE(om.revenue, 0)            AS revenue,
  COALESCE(om.avg_order, 0)          AS avg_order,
  COALESCE(om.avg_delivery_days, 0)  AS avg_delivery_days,
  COALESCE(em.headcount, 0)          AS employees,
  COALESCE(pv.distinct_products, 0)  AS products_sold,
  COALESCE(pv.distinct_categories, 0) AS categories_sold,
  ROUND(COALESCE(om.revenue, 0) / s.monthly_target * 100, 1) AS target_pct,
  ob.avg_store_revenue,
  ROUND(COALESCE(om.revenue, 0) - ob.avg_store_revenue, 2)   AS vs_avg_revenue
FROM stores AS s
LEFT JOIN order_metrics     AS om ON s.store_id = om.store_id
LEFT JOIN employee_metrics  AS em ON s.store_id = em.store_id
LEFT JOIN product_variety   AS pv ON s.store_id = pv.store_id
CROSS JOIN overall_benchmarks AS ob
ORDER BY revenue DESC NULLS LAST;`}
        height={430}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a senior analyst at DoorDash. The weekly business review requires a single comprehensive report: customer cohort analysis — how customers who joined in January 2024 have behaved over time. For each customer: their join month, total orders, lifetime value, average order value, days since last order, and a lifecycle stage label. The query needs multiple intermediate computations — a textbook CTE use case.</P>

      <TimeBlock time="2:00 PM" label="Requirements received">
        Cohort = customers who joined in Jan 2024. Metrics: order count, lifetime value, avg order value, days since last order. Lifecycle: 'Active' (ordered in last 60 days), 'At Risk' (last order 60-120 days ago), 'Churned' (no order in 120+ days or never ordered).
      </TimeBlock>

      <TimeBlock time="2:20 PM" label="Design the CTE chain">
        CTE 1: Jan 2024 cohort. CTE 2: order metrics per customer. CTE 3: days since last order. CTE 4: lifecycle classification. Main SELECT: assemble.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Customer cohort analysis — Jan 2024 joiners
WITH
-- Step 1: January 2024 cohort
jan_cohort AS (
  SELECT customer_id, first_name, last_name, city, loyalty_tier, joined_date
  FROM customers
  WHERE strftime('%m', joined_date) = '01'
    AND strftime('%Y', joined_date) = '2024'
),
-- Step 2: order metrics for cohort members
cohort_orders AS (
  SELECT
    c.customer_id,
    COUNT(o.order_id)                    AS order_count,
    ROUND(SUM(o.total_amount), 2)        AS lifetime_value,
    ROUND(AVG(o.total_amount), 2)        AS avg_order_value,
    MAX(o.order_date)                    AS last_order_date
  FROM jan_cohort AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id
),
-- Step 3: combine cohort with their metrics
cohort_with_recency AS (
  SELECT
    jc.customer_id,
    jc.first_name || ' ' || jc.last_name  AS customer,
    jc.city,
    jc.loyalty_tier,
    jc.joined_date,
    COALESCE(co.order_count, 0)           AS order_count,
    COALESCE(co.lifetime_value, 0)        AS lifetime_value,
    COALESCE(co.avg_order_value, 0)       AS avg_order_value,
    co.last_order_date,
    CASE
      WHEN co.last_order_date IS NULL THEN NULL
      ELSE CAST(julianday('now') - julianday(co.last_order_date) AS INTEGER)
    END                                   AS days_since_last_order
  FROM jan_cohort AS jc
  LEFT JOIN cohort_orders AS co ON jc.customer_id = co.customer_id
)
-- Step 4: final report with lifecycle stage
SELECT
  customer_id,
  customer,
  city,
  loyalty_tier,
  joined_date,
  order_count,
  lifetime_value,
  avg_order_value,
  last_order_date,
  days_since_last_order,
  CASE
    WHEN order_count = 0                    THEN 'Never ordered'
    WHEN days_since_last_order <= 60        THEN 'Active'
    WHEN days_since_last_order <= 120       THEN 'At Risk'
    ELSE                                         'Churned'
  END                                       AS lifecycle_stage
FROM cohort_with_recency
ORDER BY lifetime_value DESC NULLS LAST;`}
        height={420}
        showSchema={true}
      />

      <TimeBlock time="3:10 PM" label="Report delivered — every step independently verifiable">
        Four CTEs — each one runnable independently to verify its output. The main SELECT assembles the final result cleanly. When the business asks "why is customer X labelled 'At Risk'?", you can run just the cohort_with_recency CTE with a WHERE customer_id = X and trace the computation. This debuggability is the defining advantage of CTEs over nested subqueries.
      </TimeBlock>

      <ProTip>
        The best CTEs are independently testable. During development, run each CTE as a standalone SELECT to verify it produces the expected rows and values before adding the next CTE. This incremental verification pattern — run one CTE, confirm it, add the next — catches bugs at the step where they occur rather than having to untangle the full query.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a CTE and how does it differ from a subquery or derived table?">
        <p style={{ margin: '0 0 14px' }}>A CTE (Common Table Expression) is a named temporary result set defined before the main query using the WITH keyword. It creates a named intermediate result that can be referenced anywhere in the subsequent query — in the main SELECT, in subsequent CTEs, in JOIN conditions, in WHERE clauses, and in subqueries within the main query. A subquery or derived table is defined inline — inside the WHERE, FROM, or another clause — and exists only at that single location in the query.</p>
        <p style={{ margin: '0 0 14px' }}>The key practical differences: CTEs can be referenced multiple times in the same query; a derived table can only be used once at its inline position. CTEs appear before the main query and read top-to-bottom in logical order; derived tables are read inside-out which degrades readability for complex logic. CTEs give each step a descriptive name that documents what it computes; derived tables have aliases but the computation is interleaved with the outer query's structure. CTEs support recursive queries (WITH RECURSIVE) for hierarchical data; derived tables cannot be recursive.</p>
        <p style={{ margin: 0 }}>Computationally, CTEs and derived tables produce identical results — both define a temporary result set the outer query uses as a virtual table. The choice is primarily about readability and reuse. Use a derived table for a simple, short, single-use pre-aggregation where the inline position makes context clear. Use a CTE for anything complex, multi-step, reused more than once, or deserving of a descriptive name that documents its purpose.</p>
      </IQ>

      <IQ q="What are the rules for chaining multiple CTEs together?">
        <p style={{ margin: '0 0 14px' }}>Multiple CTEs are chained with commas — each CTE definition is separated from the next by a comma. The WITH keyword appears only once at the very beginning: WITH first_cte AS (...), second_cte AS (...), third_cte AS (...) SELECT ... The chain ends with the main query — no comma before the final SELECT.</p>
        <p style={{ margin: '0 0 14px' }}>The dependency rule: a CTE can reference any CTE that was defined before it in the chain. second_cte can reference first_cte. third_cte can reference both first_cte and second_cte. But first_cte cannot reference second_cte — references must go forward only (except in recursive CTEs, which have their own rules). The main SELECT at the end can reference any CTE in the chain.</p>
        <p style={{ margin: 0 }}>The naming scope rule: CTE names are scoped to the entire WITH block. A CTE name defined in the WITH block shadows any base table with the same name for the duration of the query — be careful not to accidentally reuse a base table name as a CTE alias. Column names within each CTE are independent — two CTEs can have columns with the same name without conflict, as long as the outer query references them with the correct CTE prefix. The practical pattern: define CTEs in the order of their dependencies — base computations first, enrichments next, final transformations last. The main SELECT reads the final result from the last CTE or assembles from multiple CTEs.</p>
      </IQ>

      <IQ q="When would you use a CTE over a window function for a 'top N per group' query?">
        <p style={{ margin: '0 0 14px' }}>The "top N per group" query (find the top 2 orders per store, or the highest-paid employee per department) is typically solved with a window function (ROW_NUMBER or RANK) inside a CTE or derived table, followed by filtering on the rank in the outer query. The CTE and window function work together — the CTE enables filtering on the window function result.</p>
        <p style={{ margin: '0 0 14px' }}>A CTE is needed because window functions cannot be referenced in WHERE of the same query where they are defined — WHERE runs before SELECT in the logical execution order. The pattern: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY total_amount DESC) AS rn FROM orders WHERE order_status = 'Delivered') SELECT * FROM ranked WHERE rn &lt;= 2. The CTE computes the rank, the outer query filters by it.</p>
        <p style={{ margin: 0 }}>A correlated subquery alternative exists (WHERE (SELECT COUNT(*) FROM orders o2 WHERE o2.store_id = o.store_id AND o2.total_amount &gt; o.total_amount) &lt; 2) but is generally slower for large tables — it runs once per outer row. The CTE + window function approach makes a single pass through the data with the window function, then one filtering pass — O(n log n) for the sort inside the window function, O(n) for the filter. For large tables, the CTE + window function approach is significantly faster than the correlated subquery alternative.</p>
      </IQ>

      <IQ q="What is the difference between MATERIALIZED and NOT MATERIALIZED CTEs in PostgreSQL?">
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL 12 and later, CTEs default to NOT MATERIALIZED behaviour — the optimiser treats the CTE as an inline view, exactly like a derived table. It can push predicates from the outer query into the CTE, reorder joins involving the CTE, and optimise the CTE's execution as part of the overall query plan. This is equivalent to writing the CTE as a derived table inline in the FROM clause.</p>
        <p style={{ margin: '0 0 14px' }}>MATERIALIZED forces the CTE to be computed once, stored in memory, and reused for all references. The CTE becomes a fence for optimisation — predicates from the outer query cannot be pushed into it. The result is computed in full and cached. This is the PostgreSQL behaviour before version 12 (and is still the default in some other databases).</p>
        <p style={{ margin: 0 }}>When to use each: force MATERIALIZED when the CTE is referenced multiple times in the query and the computation is expensive — materialising once prevents the expensive computation from being repeated once per reference. Use MATERIALIZED when you want the CTE to be an optimisation boundary — for example, when you want to ensure the CTE computes its result on the full data before outer-query filters are applied (important for correctness when the CTE has side effects or when the optimiser is making bad decisions). Force NOT MATERIALIZED when the CTE has a highly selective outer query filter that the optimiser should be able to push in — for example, when the outer query filters by customer_id = 5 and you want the CTE to only scan orders for customer 5 rather than all customers. In practice, most CTEs work well with the default (NOT MATERIALIZED / inlined) behaviour — only reach for these hints when EXPLAIN ANALYZE shows the optimiser making a suboptimal choice.</p>
      </IQ>

      <IQ q="How do you use a CTE with a DELETE to implement an archive-then-delete pattern?">
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL, CTEs can contain DML statements (INSERT, UPDATE, DELETE) using the RETURNING clause to capture the affected rows. This enables atomic multi-step operations — the canonical example being archive-then-delete: delete rows from one table and simultaneously insert them into another, all in one transaction.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern: WITH deleted_rows AS (DELETE FROM source_table WHERE condition RETURNING *) INSERT INTO archive_table SELECT *, NOW() AS archived_at FROM deleted_rows. The DELETE CTE runs first, capturing all deleted rows via RETURNING *. The main INSERT then uses those captured rows to populate the archive table. Because the entire statement executes in a single transaction, either both the DELETE and INSERT succeed together or neither does — there is no risk of deleting without archiving.</p>
        <p style={{ margin: 0 }}>The critical constraint: DML CTEs can only appear in PostgreSQL (and SQL Server with different syntax) — MySQL does not support DML in CTEs. Also, a DML CTE always executes even if the main query references it zero times — it has side effects by definition. This is different from SELECT CTEs which are only computed when referenced. The archive-then-delete pattern is the safest approach for data retention cleanup jobs: wrap the statement in an explicit transaction for additional protection, log the operation to an audit table, and verify the RETURNING clause captures the expected rows before deploying to production.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: syntax error at or near 'WITH' — CTE not recognised"
        cause="CTE syntax is not supported in the database version being used, or the WITH keyword is in the wrong position. MySQL added CTE support in version 8.0 — versions before MySQL 8.0 do not support WITH. Also, if WITH appears inside a subquery in some database configurations, it may not be recognised (standard SQL requires WITH at the outermost level, though PostgreSQL allows it in subqueries)."
        fix="Check MySQL version: SELECT VERSION() — if below 8.0, upgrade or rewrite using derived tables (inline subqueries in FROM). For subquery-level CTEs, move the WITH to the outermost query level and use derived tables or additional CTEs for the inner logic. PostgreSQL 8.4+ and SQL Server 2005+ fully support CTEs. DuckDB (this playground) fully supports CTEs."
      />

      <Err
        msg="ERROR: relation 'cte_name' does not exist — CTE referenced before it is defined"
        cause="A CTE references another CTE that appears later in the WITH chain. CTEs can only reference CTEs defined before them — the reference order is forward-only. Or the CTE name is misspelled in the reference, causing the database to look for a base table with that name instead."
        fix="Reorder CTEs so dependencies come first: if second_cte references first_cte, first_cte must appear before second_cte in the WITH chain. Check spelling — CTE names are case-sensitive in some databases. If two CTEs need to reference each other (circular dependency), this is not possible with standard CTEs — restructure the logic to break the cycle, or use a recursive CTE if the dependency is hierarchical."
      />

      <Err
        msg="CTE result is computed multiple times — query is slower than expected"
        cause="In PostgreSQL 12+ with NOT MATERIALIZED (default), the CTE is treated as an inline view — if the optimiser determines the CTE should be computed separately for each reference point, it may recompute it multiple times. This is unusual but can happen with complex query shapes or when the optimiser's cost estimates are off."
        fix="Force MATERIALIZED to ensure the CTE is computed once: WITH my_cte AS MATERIALIZED (SELECT ...). This guarantees the CTE is computed exactly once regardless of how many times it is referenced. Use EXPLAIN ANALYZE to verify execution — look for the CTE node in the plan. If the CTE appears multiple times in the plan without MATERIALIZED, adding it will prevent the recomputation. Only add MATERIALIZED when EXPLAIN ANALYZE confirms the problem exists — unnecessary materialisation can reduce performance by preventing predicate pushdown."
      />

      <Err
        msg="CTE column not accessible in outer query — column name not found"
        cause="The outer query references a column name that was not included in the CTE's SELECT list, or the column was computed inside the CTE but not given an alias that matches the outer query's reference. CTE columns are only accessible through the names given in the CTE's SELECT list — any expression must be aliased for the outer query to reference it."
        fix="Add the missing column to the CTE's SELECT list: WITH cte AS (SELECT col1, col2, computed_expression AS alias_name FROM ...). The outer query then references it as cte.alias_name. If the CTE already includes the column but the reference fails, check for typos and case sensitivity. Remember that CTE column names come from the CTE's SELECT list — if you alias a column differently in the CTE than how you reference it in the outer query, the reference will fail."
      />

      <Err
        msg="DML CTE (DELETE/UPDATE in WITH) executes even when the main query is not reached"
        cause="DML statements in CTEs always execute unconditionally — they are not lazy. Unlike SELECT CTEs which are only computed when referenced, a DELETE or UPDATE CTE runs as soon as the statement begins execution, even if the main query has a WHERE condition that would produce zero rows. This can cause unexpected data modifications."
        fix="Always preview DML CTEs before running: temporarily replace DELETE FROM ... WITH ... RETURNING * with SELECT * FROM table WHERE condition to verify which rows would be affected. Wrap DML CTEs in explicit transactions and verify the result before COMMIT: BEGIN; WITH deleted AS (DELETE ... RETURNING *) INSERT INTO archive SELECT * FROM deleted; SELECT COUNT(*) FROM archive WHERE archived_at >= NOW() - INTERVAL '5 seconds'; COMMIT. This lets you verify the operation's effect before making it permanent."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a query using multiple CTEs that produces a complete store health report. The report should include for each store: store_id, city, monthly_target, delivered_revenue, delivered_order_count, avg_order_value (rounded to 2 decimal places), employee_count (0 if none), total_payroll (0 if none), revenue_per_employee (delivered_revenue / employee_count, NULL if no employees), target_achievement_pct (delivered_revenue / monthly_target × 100, rounded to 1 decimal), and a health_status: 'Excellent' if target >= 120%, 'On Track' if target >= 80%, 'Needs Attention' if target >= 50%, 'Critical' otherwise. Use a separate CTE for each dimension (order metrics, employee metrics) and a third CTE for the combined store data before the final SELECT adds the health status. Include all stores even those with no orders or employees."
        hint="Three CTEs: order_metrics (GROUP BY store_id from orders), employee_metrics (GROUP BY store_id from employees WHERE store_id IS NOT NULL), store_combined (LEFT JOIN both to stores). Final SELECT adds CASE for health_status."
        answer={`WITH
order_metrics AS (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS revenue,
    ROUND(AVG(total_amount), 2)  AS avg_order_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
),
employee_metrics AS (
  SELECT
    store_id,
    COUNT(*)               AS employee_count,
    SUM(salary)            AS total_payroll
  FROM employees
  WHERE store_id IS NOT NULL
  GROUP BY store_id
),
store_combined AS (
  SELECT
    s.store_id,
    s.city,
    s.monthly_target,
    COALESCE(om.revenue, 0)          AS delivered_revenue,
    COALESCE(om.order_count, 0)      AS delivered_order_count,
    COALESCE(om.avg_order_value, 0)  AS avg_order_value,
    COALESCE(em.employee_count, 0)   AS employee_count,
    COALESCE(em.total_payroll, 0)    AS total_payroll,
    CASE
      WHEN COALESCE(em.employee_count, 0) = 0 THEN NULL
      ELSE ROUND(COALESCE(om.revenue, 0) / em.employee_count, 2)
    END                              AS revenue_per_employee,
    ROUND(
      COALESCE(om.revenue, 0) / s.monthly_target * 100
    , 1)                             AS target_achievement_pct
  FROM stores AS s
  LEFT JOIN order_metrics   AS om ON s.store_id = om.store_id
  LEFT JOIN employee_metrics AS em ON s.store_id = em.store_id
)
SELECT
  store_id,
  city,
  monthly_target,
  delivered_revenue,
  delivered_order_count,
  avg_order_value,
  employee_count,
  total_payroll,
  revenue_per_employee,
  target_achievement_pct,
  CASE
    WHEN target_achievement_pct >= 120 THEN 'Excellent'
    WHEN target_achievement_pct >= 80  THEN 'On Track'
    WHEN target_achievement_pct >= 50  THEN 'Needs Attention'
    ELSE                                    'Critical'
  END AS health_status
FROM store_combined
ORDER BY target_achievement_pct DESC NULLS LAST;`}
        explanation="Three CTEs each handle one dimension cleanly. order_metrics aggregates delivered orders to store level. employee_metrics aggregates employees to store level (WHERE store_id IS NOT NULL excludes head-office employees). store_combined LEFT JOINs both to stores — LEFT JOIN ensures all stores appear even with no orders or employees; COALESCE converts NULLs to 0 for numeric display. The revenue_per_employee uses a CASE to return NULL when there are no employees rather than a division by zero error. The final SELECT adds the CASE for health_status — it references target_achievement_pct which is a column in store_combined, available cleanly by name. This structure makes each computation independently verifiable: run just order_metrics to check order counts, just employee_metrics to check headcounts, just store_combined to verify the join and COALESCE logic, before trusting the final result."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A CTE (WITH clause) defines a named temporary result set before the main query. It reads top-to-bottom — each step builds on the previous — unlike nested subqueries which read inside-out.',
          'CTEs can be referenced multiple times in the same query; derived tables cannot. This is the key advantage that makes CTEs superior for complex multi-step logic.',
          'Multiple CTEs chain with commas. Each CTE can reference only CTEs defined before it — forward-only dependencies. The main SELECT can reference any CTE in the chain.',
          'CTEs make complex queries independently testable: run each CTE as a standalone SELECT during development to verify its output before adding the next step.',
          'CTEs support DML in PostgreSQL: a DELETE or UPDATE CTE with RETURNING captures the affected rows for use by the main query. Enables atomic archive-then-delete in a single statement.',
          'PostgreSQL 12+ defaults to NOT MATERIALIZED (inline) CTEs — the optimiser can push predicates in. Use AS MATERIALIZED to force one-time computation when the CTE is expensive and referenced multiple times.',
          'CTEs are the correct solution for filtering on window function results: compute the window function in the CTE, filter in the outer query WHERE. Window functions cannot be referenced in WHERE of the same query.',
          'Naming matters: customer_spend, tier_averages, store_combined are informative. t1, t2, sub are not. Good CTE names make a complex query self-documenting.',
          'CTE vs derived table decision: derived table for short, single-use, inline. CTE for multi-step, reused results, anything deserving a descriptive name.',
          'CTEs do not improve performance by themselves — they are organisational tools. Use EXPLAIN ANALYZE to verify the query plan and add MATERIALIZED hints only when the optimiser is making provably suboptimal choices.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 42</strong>, you learn string functions — CONCAT, SUBSTRING, TRIM, UPPER, LOWER, REPLACE, LIKE pattern matching, REGEXP, and every text manipulation tool you need for real data cleaning and formatting.
        </p>
        <Link href="/learn/sql/string-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 42 → String Functions
        </Link>
      </div>

    </LearnLayout>
  );
}