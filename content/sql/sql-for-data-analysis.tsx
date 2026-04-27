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

const Insight = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '20px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>{label}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
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

export default function SqlForDataAnalysis() {
  return (
    <LearnLayout
      title="SQL for Data Analysis"
      description="Real analytical patterns — revenue trends, customer segmentation, cohort analysis, and RFM scoring — applied to the FreshMart dataset"
      section="SQL — Module 60"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Data Analysis Looks Like in SQL" />

      <P>Data analysis in SQL is not about learning new syntax — it is about applying the syntax you already know to answer real business questions. The patterns in this module are used daily by analysts at Swiggy, Zepto, HDFC, and every data-driven company: revenue breakdowns, customer cohorts, retention curves, and RFM segmentation.</P>

      <P>We will use the <Hl>FreshMart dataset</Hl> — the same one in every playground in this course — so every query you run here is real and produces real results. By the end of this module you will have a toolkit of analytical query patterns you can adapt to any business dataset.</P>

      <SQLPlayground
        initialQuery={`-- FreshMart business overview — what we are working with
SELECT
  (SELECT COUNT(DISTINCT customer_id) FROM customers)      AS total_customers,
  (SELECT COUNT(*) FROM orders)                            AS total_orders,
  (SELECT COUNT(*) FROM orders WHERE order_status = 'Delivered') AS delivered,
  (SELECT ROUND(SUM(total_amount), 2) FROM orders
   WHERE order_status = 'Delivered')                       AS total_revenue,
  (SELECT ROUND(AVG(total_amount), 2) FROM orders
   WHERE order_status = 'Delivered')                       AS avg_order_value,
  (SELECT COUNT(DISTINCT product_id) FROM products)        AS total_products;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Revenue Analysis — Breakdowns and Trends" />

      <P>The first question any business asks is: <Hl>where does our money come from?</Hl> Revenue breakdowns by time, channel, city, and product category reveal which segments drive growth and which are declining. These queries combine GROUP BY with date functions and window functions for trend context.</P>

      <H>Revenue by store and city</H>

      <SQLPlayground
        initialQuery={`-- Revenue by store with city breakdown
SELECT
  s.store_name,
  s.city,
  COUNT(o.order_id)                     AS order_count,
  ROUND(SUM(o.total_amount), 2)         AS total_revenue,
  ROUND(AVG(o.total_amount), 2)         AS avg_order_value,
  ROUND(SUM(o.total_amount) * 100.0
    / SUM(SUM(o.total_amount)) OVER (), 1) AS revenue_pct
FROM orders  AS o
JOIN stores  AS s ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city
ORDER BY total_revenue DESC;`}
        height={195}
        showSchema={true}
      />

      <H>Revenue by payment method</H>

      <SQLPlayground
        initialQuery={`-- Payment method breakdown with average order value
SELECT
  payment_method,
  COUNT(*)                              AS order_count,
  ROUND(SUM(total_amount), 2)           AS total_revenue,
  ROUND(AVG(total_amount), 2)           AS avg_order_value,
  ROUND(100.0 * COUNT(*)
    / SUM(COUNT(*)) OVER (), 1)         AS pct_of_orders
FROM orders
WHERE order_status = 'Delivered'
GROUP BY payment_method
ORDER BY total_revenue DESC;`}
        height={180}
        showSchema={true}
      />

      <H>Monthly revenue trend</H>

      <SQLPlayground
        initialQuery={`-- Monthly revenue trend with running total
SELECT
  strftime('%Y-%m', order_date)         AS month,
  COUNT(*)                              AS orders,
  ROUND(SUM(total_amount), 2)           AS monthly_revenue,
  ROUND(SUM(SUM(total_amount))
    OVER (ORDER BY strftime('%Y-%m', order_date)
          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2
  )                                     AS running_total
FROM orders
WHERE order_status = 'Delivered'
GROUP BY strftime('%Y-%m', order_date)
ORDER BY month;`}
        height={200}
        showSchema={true}
      />

      <Insight label="Analyst insight">
        Month-over-month revenue trend tells you whether the business is growing. Running total tells you where you stand against annual targets. Combining both in one query (monthly + cumulative) is the standard format for a revenue dashboard. The window function SUM() OVER (ORDER BY month ROWS UNBOUNDED PRECEDING) computes the running total without a self-join.
      </Insight>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Product Analysis — What Sells and What Does Not" />

      <P>Product analysis answers: which products drive the most revenue, which have the highest volume, and which are underperforming relative to their category. These insights drive inventory decisions, promotional strategy, and supplier negotiations.</P>

      <SQLPlayground
        initialQuery={`-- Top products by revenue with category context
SELECT
  p.product_name,
  p.category,
  COUNT(DISTINCT oi.order_id)           AS orders_containing,
  SUM(oi.quantity)                      AS units_sold,
  ROUND(SUM(oi.line_total), 2)          AS total_revenue,
  ROUND(AVG(oi.unit_price), 2)          AS avg_selling_price,
  RANK() OVER (ORDER BY SUM(oi.line_total) DESC) AS revenue_rank
FROM order_items AS oi
JOIN products    AS p ON p.product_id = oi.product_id
JOIN orders      AS o ON o.order_id   = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.product_id, p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 10;`}
        height={220}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Category performance with share of total
SELECT
  p.category,
  COUNT(DISTINCT p.product_id)          AS products_in_category,
  SUM(oi.quantity)                      AS units_sold,
  ROUND(SUM(oi.line_total), 2)          AS category_revenue,
  ROUND(100.0 * SUM(oi.line_total)
    / SUM(SUM(oi.line_total)) OVER (), 1) AS revenue_share_pct
FROM order_items AS oi
JOIN products    AS p ON p.product_id  = oi.product_id
JOIN orders      AS o ON o.order_id    = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY p.category
ORDER BY category_revenue DESC;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products in stock that have never been ordered (zero-sellers)
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
WHERE p.in_stock = 1
  AND NOT EXISTS (
    SELECT 1
    FROM order_items AS oi
    WHERE oi.product_id = p.product_id
  )
ORDER BY p.category, p.product_name;`}
        height={185}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Customer Segmentation — Who Are Your Best Customers" />

      <P>Customer segmentation divides your customer base into groups with similar characteristics or behaviour. The simplest and most powerful segmentation for e-commerce is <Hl>loyalty tier analysis</Hl> — understanding revenue concentration across Bronze, Silver, Gold, and Platinum customers.</P>

      <SQLPlayground
        initialQuery={`-- Customer value by loyalty tier
SELECT
  c.loyalty_tier,
  COUNT(DISTINCT c.customer_id)         AS customers,
  COUNT(o.order_id)                     AS total_orders,
  ROUND(SUM(o.total_amount), 2)         AS total_revenue,
  ROUND(AVG(o.total_amount), 2)         AS avg_order_value,
  ROUND(SUM(o.total_amount)
    / COUNT(DISTINCT c.customer_id), 2) AS revenue_per_customer,
  ROUND(100.0 * SUM(o.total_amount)
    / SUM(SUM(o.total_amount)) OVER (), 1) AS revenue_share_pct
FROM customers AS c
JOIN orders    AS o ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY c.loyalty_tier
ORDER BY revenue_per_customer DESC;`}
        height={210}
        showSchema={true}
      />

      <Insight label="Business insight">
        Loyalty tier analysis almost always reveals the 80/20 rule: Platinum and Gold customers (top 20%) typically generate 70-80% of revenue. This drives decisions like: should we invest more in retaining top-tier customers (cheaper than acquiring new ones) or in upgrading Silver customers to Gold (via targeted promotions)?
      </Insight>

      <H>City-level customer distribution</H>

      <SQLPlayground
        initialQuery={`-- Customer distribution and average spend by city
SELECT
  c.city,
  COUNT(DISTINCT c.customer_id)          AS customers,
  COUNT(o.order_id)                      AS orders,
  ROUND(SUM(o.total_amount), 2)          AS city_revenue,
  ROUND(AVG(o.total_amount), 2)          AS avg_order_value,
  ROUND(SUM(o.total_amount)
    / COUNT(DISTINCT c.customer_id), 2)  AS revenue_per_customer
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.city
ORDER BY city_revenue DESC NULLS LAST;`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="RFM Segmentation — Recency, Frequency, Monetary" />

      <P>RFM is the most widely used customer segmentation framework in e-commerce. It scores each customer on three dimensions: <Hl>Recency</Hl> (how recently did they order?), <Hl>Frequency</Hl> (how often do they order?), <Hl>Monetary</Hl> (how much do they spend?). High scores on all three = your best customers. Low scores = at-risk or churned customers.</P>

      <SQLPlayground
        initialQuery={`-- Step 1: Compute raw RFM metrics per customer
WITH customer_rfm AS (
  SELECT
    c.customer_id,
    c.first_name,
    c.loyalty_tier,
    -- Recency: days since last order (lower = better)
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER)
                                        AS days_since_last_order,
    -- Frequency: number of delivered orders
    COUNT(o.order_id)                   AS order_count,
    -- Monetary: total spend
    ROUND(SUM(o.total_amount), 2)       AS total_spent
  FROM customers AS c
  JOIN orders    AS o ON o.customer_id = c.customer_id
  WHERE o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.loyalty_tier
)
SELECT *
FROM customer_rfm
ORDER BY total_spent DESC
LIMIT 10;`}
        height={235}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: Score each dimension 1-3 and classify the customer
WITH customer_rfm AS (
  SELECT
    c.customer_id,
    c.first_name,
    c.loyalty_tier,
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS days_since_last,
    COUNT(o.order_id)           AS freq,
    ROUND(SUM(o.total_amount), 2) AS monetary
  FROM customers AS c
  JOIN orders    AS o ON o.customer_id = c.customer_id
  WHERE o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.loyalty_tier
),
scored AS (
  SELECT
    customer_id, first_name, loyalty_tier,
    days_since_last, freq, monetary,
    -- Recency score: 3 = recent, 1 = old
    CASE
      WHEN days_since_last <= 30  THEN 3
      WHEN days_since_last <= 90  THEN 2
      ELSE 1
    END AS r_score,
    -- Frequency score: 3 = frequent
    CASE
      WHEN freq >= 5 THEN 3
      WHEN freq >= 3 THEN 2
      ELSE 1
    END AS f_score,
    -- Monetary score: 3 = high spender
    CASE
      WHEN monetary >= 2000 THEN 3
      WHEN monetary >= 800  THEN 2
      ELSE 1
    END AS m_score
  FROM customer_rfm
)
SELECT
  customer_id, first_name, loyalty_tier,
  r_score, f_score, m_score,
  r_score + f_score + m_score  AS rfm_total,
  CASE
    WHEN r_score + f_score + m_score >= 8 THEN 'Champion'
    WHEN r_score + f_score + m_score >= 6 THEN 'Loyal'
    WHEN r_score = 1 AND f_score >= 2     THEN 'At Risk'
    WHEN r_score = 1 AND f_score = 1      THEN 'Lost'
    ELSE 'Potential'
  END AS segment
FROM scored
ORDER BY rfm_total DESC;`}
        height={360}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Cohort Analysis — Retention Over Time" />

      <P>A <Hl>cohort</Hl> is a group of customers who share a common characteristic — typically the month they placed their first order. Cohort analysis tracks what percentage of each cohort is still ordering in subsequent months. It is the gold standard for measuring whether customer retention is improving or declining over time.</P>

      <SQLPlayground
        initialQuery={`-- Step 1: Find each customer's first-order month (acquisition cohort)
WITH first_orders AS (
  SELECT
    customer_id,
    MIN(order_date)                          AS first_order_date,
    strftime('%Y-%m', MIN(order_date))       AS cohort_month
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(DISTINCT customer_id)  AS cohort_size
FROM first_orders
GROUP BY cohort_month
ORDER BY cohort_month;`}
        height={185}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: Full cohort retention table
-- For each cohort, how many customers ordered in months 0, 1, 2, ... after joining?
WITH first_orders AS (
  SELECT
    customer_id,
    MIN(order_date)                    AS first_order_date,
    strftime('%Y-%m', MIN(order_date)) AS cohort_month
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
),
order_periods AS (
  SELECT
    o.customer_id,
    f.cohort_month,
    -- months since first order (cohort month index)
    CAST(
      (strftime('%Y', o.order_date) - strftime('%Y', f.first_order_date)) * 12
      + (strftime('%m', o.order_date) - strftime('%m', f.first_order_date))
    AS INTEGER)                        AS months_since_first
  FROM orders    AS o
  JOIN first_orders AS f ON f.customer_id = o.customer_id
  WHERE o.order_status = 'Delivered'
)
SELECT
  cohort_month,
  COUNT(DISTINCT CASE WHEN months_since_first = 0 THEN customer_id END) AS m0,
  COUNT(DISTINCT CASE WHEN months_since_first = 1 THEN customer_id END) AS m1,
  COUNT(DISTINCT CASE WHEN months_since_first = 2 THEN customer_id END) AS m2,
  COUNT(DISTINCT CASE WHEN months_since_first = 3 THEN customer_id END) AS m3
FROM order_periods
GROUP BY cohort_month
ORDER BY cohort_month;`}
        height={310}
        showSchema={true}
      />

      <Insight label="Reading a cohort table">
        Each row is one acquisition cohort. M0 = customers who ordered in their first month (always 100% of cohort size). M1 = customers still ordering 1 month later. M2 = 2 months later. A healthy retention curve has M1/M0 above 40% for e-commerce. If M1/M0 is declining cohort-over-cohort, something changed in the customer experience or product quality.
      </Insight>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Order Funnel and Conversion Analysis" />

      <P>A funnel tracks how orders move through stages: placed → confirmed → shipped → delivered. Drop-off at each stage reveals operational bottlenecks. High cancellation rate after placement = payment issues. High drop-off before delivery = logistics problems.</P>

      <SQLPlayground
        initialQuery={`-- Order status funnel: counts and conversion rates
SELECT
  order_status,
  COUNT(*)                            AS order_count,
  ROUND(100.0 * COUNT(*)
    / SUM(COUNT(*)) OVER (), 1)       AS pct_of_all_orders,
  ROUND(AVG(total_amount), 2)         AS avg_order_value
FROM orders
GROUP BY order_status
ORDER BY order_count DESC;`}
        height={170}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Cancellation analysis: which store / loyalty tier has highest cancellation?
SELECT
  s.store_name,
  c.loyalty_tier,
  COUNT(CASE WHEN o.order_status = 'Cancelled' THEN 1 END) AS cancelled,
  COUNT(*)                                                   AS total_orders,
  ROUND(100.0 *
    COUNT(CASE WHEN o.order_status = 'Cancelled' THEN 1 END)
    / COUNT(*), 1)                                           AS cancellation_rate_pct
FROM orders    AS o
JOIN stores    AS s ON s.store_id    = o.store_id
JOIN customers AS c ON c.customer_id = o.customer_id
GROUP BY s.store_name, c.loyalty_tier
HAVING COUNT(*) >= 2
ORDER BY cancellation_rate_pct DESC;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Basket Analysis — What Do Customers Buy Together" />

      <P>Basket analysis identifies which products are frequently purchased in the same order. This drives cross-sell recommendations ("customers who bought X also bought Y") and bundle promotions. It uses a self-join on order_items — each order is joined to itself to find co-occurring products.</P>

      <SQLPlayground
        initialQuery={`-- Products most frequently bought together in the same order
SELECT
  p1.product_name    AS product_a,
  p2.product_name    AS product_b,
  COUNT(*)           AS co_occurrence_count
FROM order_items AS oi1
JOIN order_items AS oi2
  ON  oi1.order_id   = oi2.order_id
  AND oi1.product_id < oi2.product_id   -- avoid (A,B) and (B,A) duplicates
JOIN products    AS p1 ON p1.product_id = oi1.product_id
JOIN products    AS p2 ON p2.product_id = oi2.product_id
GROUP BY p1.product_name, p2.product_name
ORDER BY co_occurrence_count DESC
LIMIT 10;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Average basket size (items per order) by loyalty tier
SELECT
  c.loyalty_tier,
  ROUND(AVG(basket.item_count), 2)     AS avg_items_per_order,
  ROUND(AVG(basket.basket_value), 2)   AS avg_basket_value
FROM customers AS c
JOIN (
  SELECT
    o.customer_id,
    o.order_id,
    COUNT(oi.product_id)               AS item_count,
    SUM(oi.line_total)                 AS basket_value
  FROM orders      AS o
  JOIN order_items AS oi ON oi.order_id = o.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.order_id, o.customer_id
) AS basket ON basket.customer_id = c.customer_id
GROUP BY c.loyalty_tier
ORDER BY avg_basket_value DESC;`}
        height={225}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="The Complete FreshMart Business Report" />

      <P>A real business report combines multiple analytical angles into one document. Below is a comprehensive FreshMart Q-period performance report using window functions, CTEs, and aggregations — the kind of query a data analyst would write for a management review.</P>

      <SQLPlayground
        initialQuery={`-- Comprehensive FreshMart performance report
WITH
-- 1. Revenue by month
monthly AS (
  SELECT
    strftime('%Y-%m', order_date)      AS month,
    COUNT(*)                           AS orders,
    ROUND(SUM(total_amount), 2)        AS revenue,
    ROUND(AVG(total_amount), 2)        AS avg_aov
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY strftime('%Y-%m', order_date)
),
-- 2. Top store this period
top_store AS (
  SELECT s.store_name, ROUND(SUM(o.total_amount), 2) AS store_rev
  FROM orders AS o
  JOIN stores AS s ON s.store_id = o.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY s.store_name
  ORDER BY store_rev DESC
  LIMIT 1
),
-- 3. Top product this period
top_product AS (
  SELECT p.product_name, ROUND(SUM(oi.line_total), 2) AS prod_rev
  FROM order_items AS oi
  JOIN products    AS p  ON p.product_id  = oi.product_id
  JOIN orders      AS o  ON o.order_id    = oi.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY p.product_name
  ORDER BY prod_rev DESC
  LIMIT 1
)
-- Final report: monthly trend + key KPIs
SELECT
  m.month,
  m.orders,
  m.revenue,
  m.avg_aov,
  LAG(m.revenue) OVER (ORDER BY m.month) AS prev_month_rev,
  ROUND(
    (m.revenue - LAG(m.revenue) OVER (ORDER BY m.month))
    / LAG(m.revenue) OVER (ORDER BY m.month) * 100
  , 1)                                    AS mom_growth_pct
FROM monthly AS m
ORDER BY m.month;`}
        height={350}
        showSchema={true}
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a complete customer health report for FreshMart. The report should show for each loyalty tier: (1) number of customers, (2) average orders per customer, (3) average revenue per customer, (4) the percentage of customers in that tier who placed an order in the last 90 days (active rate). Order by average revenue per customer descending."
        hint="Use two CTEs: one to aggregate per customer (order count, total revenue, last order date), one to aggregate per tier with the 90-day active rate using CASE WHEN. julianday('now') - julianday(last_order_date) gives days since last order."
        answer={`-- Customer health report by loyalty tier
WITH customer_stats AS (
  -- Per-customer: order count, total spend, recency
  SELECT
    c.customer_id,
    c.loyalty_tier,
    COUNT(o.order_id)                AS order_count,
    ROUND(SUM(o.total_amount), 2)    AS total_spent,
    MAX(o.order_date)                AS last_order_date,
    CAST(julianday('now') - julianday(MAX(o.order_date))
         AS INTEGER)                 AS days_since_last
  FROM customers AS c
  LEFT JOIN orders AS o
    ON o.customer_id = c.customer_id
   AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.loyalty_tier
),
tier_summary AS (
  SELECT
    loyalty_tier,
    COUNT(*)                          AS customer_count,
    ROUND(AVG(order_count), 1)        AS avg_orders_per_customer,
    ROUND(AVG(total_spent), 2)        AS avg_revenue_per_customer,
    ROUND(100.0 *
      SUM(CASE WHEN days_since_last <= 90 THEN 1 ELSE 0 END)
      / COUNT(*), 1)                  AS active_rate_pct
  FROM customer_stats
  GROUP BY loyalty_tier
)
SELECT
  loyalty_tier,
  customer_count,
  avg_orders_per_customer,
  avg_revenue_per_customer,
  active_rate_pct
FROM tier_summary
ORDER BY avg_revenue_per_customer DESC NULLS LAST;`}
        explanation="The query uses two CTEs. The first (customer_stats) aggregates to the customer level: counting orders, summing spend, finding the last order date, and computing days since last order using julianday() which returns a floating-point day count — cast to INTEGER for readability. LEFT JOIN ensures customers with no delivered orders are included (they show 0 orders). The second CTE (tier_summary) aggregates customer_stats to the tier level. The active rate uses CASE WHEN inside SUM — a standard pattern for conditional counting without a subquery. NULL last_order_date (customers with no orders) correctly produces NULL days_since_last, and NULL <= 90 is NULL (falsy), so they count as inactive — correct behaviour. ORDER BY avg_revenue_per_customer DESC NULLS LAST handles the case where a tier has customers but none have placed orders."
      />

      <HR />

      <KeyTakeaways
        items={[
          'Revenue analysis = GROUP BY + SUM + window functions for share percentages and running totals. Always compute revenue_share_pct alongside absolute revenue.',
          'Product analysis: rank products by revenue, identify zero-sellers with NOT EXISTS, compute category share with SUM() OVER () window total.',
          'RFM segmentation scores customers on Recency (days since last order), Frequency (order count), Monetary (total spend). High RFM total = Champion; low = Lost or At Risk.',
          'Cohort analysis: group customers by acquisition month, track how many are still ordering in M1, M2, M3. Declining M1/M0 ratio signals a retention problem.',
          'Order funnel: COUNT by order_status to find drop-off. Add store and tier breakdowns to identify where cancellations concentrate.',
          'Basket analysis: self-join order_items on order_id with product_id < product_id to find co-purchased products without duplicates.',
          'The standard data analysis structure: 2-3 CTEs that prepare sub-aggregations, a final SELECT that joins them. Readable, composable, easy to extend.',
          'julianday() in SQLite gives the number of days between two dates. strftime() formats dates for monthly grouping. These replace PostgreSQL\'s DATE_TRUNC and age() functions.',
        ]}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 61</strong>, you tackle the Top 50 SQL interview questions — every question that appears in data analyst and data engineer interviews, with complete answers and the traps interviewers set.
        </p>
        <Link href="/learn/sql/interview-questions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 61 → Top 50 SQL Interview Questions
        </Link>
      </div>

    </LearnLayout>
  );
}
