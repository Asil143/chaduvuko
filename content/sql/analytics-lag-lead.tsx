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

export default function AnalyticsLagLead() {
  return (
    <LearnLayout
      title="Analytics with LAG and LEAD"
      description="Period-over-period comparison, retention analysis, funnel drop-off, session gap detection, first and last event patterns — every time-series analytics pattern built on offset window functions"
      section="SQL — Module 53"
      readTime="36 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Core Insight — Comparing Rows Without Self-Joins" />

      <P>Before window functions, comparing each row to the previous row required a self-join — joining the table to itself on a relationship like "previous order date for the same customer." Self-joins are verbose, error-prone, and slow on large tables because they force a Cartesian product before filtering.</P>

      <P><Hl>LAG and LEAD</Hl> replace every self-join for adjacent-row comparison with a single function call. LAG accesses the value from N rows before the current row within the window. LEAD accesses the value from N rows after. The window (PARTITION BY + ORDER BY) defines what "before" and "after" mean — previous order for the same customer, previous day's revenue for the same store, previous status in the same event sequence.</P>

      <CodeBlock
        label="LAG / LEAD — complete syntax"
        code={`-- LAG: value from N rows BEFORE current row in the window
LAG(column)                    OVER (PARTITION BY grp ORDER BY col)
LAG(column, 1)                 OVER (...)  -- same as above (offset=1 is default)
LAG(column, 2)                 OVER (...)  -- 2 rows back
LAG(column, 1, 0)              OVER (...)  -- default value 0 when no prior row
LAG(column, 1, column)         OVER (...)  -- default = current value (no change signal)

-- LEAD: value from N rows AFTER current row in the window
LEAD(column)                   OVER (PARTITION BY grp ORDER BY col)
LEAD(column, 1, 'end')         OVER (...)  -- default 'end' when no following row

-- NULL handling:
-- First row in partition: LAG returns NULL (no prior row)
-- Last row in partition:  LEAD returns NULL (no following row)
-- Use the third argument (default) to substitute NULL with a meaningful value

-- Both require ORDER BY — without it, "before" and "after" are undefined`}
      />

      <SQLPlayground
        initialQuery={`-- LAG and LEAD on order dates per customer
SELECT
  customer_id,
  order_id,
  order_date,
  total_amount,
  -- Previous order date for this customer
  LAG(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  )                                           AS prev_order_date,
  -- Next order date for this customer
  LEAD(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  )                                           AS next_order_date,
  -- Days since previous order
  order_date - LAG(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  )                                           AS days_since_prev
FROM orders
WHERE order_status = 'Delivered'
ORDER BY customer_id, order_date
LIMIT 12;`}
        height={250}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Period-Over-Period Comparison — MoM, WoW, YoY" />

      <P>Period-over-period (PoP) comparison is the most common use of LAG in production analytics. Every business dashboard shows "this month vs last month" — LAG makes this a single expression rather than a self-join or two separate subqueries.</P>

      <H>Month-over-month revenue change</H>

      <SQLPlayground
        initialQuery={`-- Month-over-month revenue with growth rate
WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date)::DATE        AS month_start,
    ROUND(SUM(total_amount), 2)                  AS revenue,
    COUNT(DISTINCT order_id)                     AS orders,
    COUNT(DISTINCT customer_id)                  AS unique_customers
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  month_start,
  revenue,
  orders,
  unique_customers,
  -- Prior period values via LAG
  LAG(revenue)          OVER (ORDER BY month_start)   AS prev_revenue,
  LAG(orders)           OVER (ORDER BY month_start)   AS prev_orders,
  -- Absolute and percentage change
  ROUND(revenue - LAG(revenue) OVER (ORDER BY month_start), 2) AS mom_change,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month_start))
    / NULLIF(LAG(revenue) OVER (ORDER BY month_start), 0) * 100
  , 1)                                                AS mom_pct,
  -- Growth signal
  CASE
    WHEN LAG(revenue) OVER (ORDER BY month_start) IS NULL THEN '— First period'
    WHEN revenue > LAG(revenue) OVER (ORDER BY month_start) THEN '▲ Growth'
    WHEN revenue < LAG(revenue) OVER (ORDER BY month_start) THEN '▼ Decline'
    ELSE '→ Flat'
  END                                                 AS trend
FROM monthly
ORDER BY month_start;`}
        height={290}
        showSchema={true}
      />

      <H>Week-over-week per store</H>

      <SQLPlayground
        initialQuery={`-- Week-over-week revenue per store
WITH weekly_store AS (
  SELECT
    o.store_id,
    s.city,
    DATE_TRUNC('week', o.order_date)::DATE         AS week_start,
    ROUND(SUM(o.total_amount), 2)                  AS revenue,
    COUNT(o.order_id)                              AS orders
  FROM orders  AS o
  JOIN stores  AS s ON o.store_id = s.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id, s.city, DATE_TRUNC('week', o.order_date)
)
SELECT
  store_id,
  city,
  week_start,
  revenue,
  orders,
  LAG(revenue) OVER (
    PARTITION BY store_id
    ORDER BY week_start
  )                                                AS prev_week_revenue,
  ROUND(
    (revenue - LAG(revenue) OVER (PARTITION BY store_id ORDER BY week_start))
    / NULLIF(LAG(revenue) OVER (PARTITION BY store_id ORDER BY week_start), 0) * 100
  , 1)                                             AS wow_pct
FROM weekly_store
ORDER BY store_id, week_start;`}
        height={265}
        showSchema={false}
      />

      <H>Same period last year — LAG with offset 12 (monthly data)</H>

      <CodeBlock
        label="Year-over-year comparison — LAG with offset"
        code={`-- YoY: compare to the same month 12 periods ago
WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date)::DATE   AS month_start,
    ROUND(SUM(total_amount), 2)             AS revenue
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  month_start,
  revenue,
  -- LAG with offset 12 = same month last year
  LAG(revenue, 12) OVER (ORDER BY month_start)     AS same_month_last_year,
  ROUND(
    (revenue - LAG(revenue, 12) OVER (ORDER BY month_start))
    / NULLIF(LAG(revenue, 12) OVER (ORDER BY month_start), 0) * 100
  , 1)                                              AS yoy_pct
FROM monthly
ORDER BY month_start;
-- Requires at least 13 months of data for YoY to be non-NULL`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Retention Analysis — Did the Customer Come Back?" />

      <P>Retention analysis answers "of the customers who ordered in period N, how many ordered again in period N+1?" LAG and LEAD make this query straightforward — for each customer's order, LEAD shows their next order date, enabling cohort retention measurement without complex subqueries.</P>

      <H>Days to next order — repeat purchase gap</H>

      <SQLPlayground
        initialQuery={`-- For each delivered order: how many days until the customer's next order?
SELECT
  o.customer_id,
  c.loyalty_tier,
  o.order_id,
  o.order_date,
  o.total_amount,
  -- Next order date for this customer
  LEAD(o.order_date) OVER (
    PARTITION BY o.customer_id
    ORDER BY o.order_date, o.order_id
  )                                                AS next_order_date,
  -- Gap in days
  LEAD(o.order_date) OVER (
    PARTITION BY o.customer_id
    ORDER BY o.order_date, o.order_id
  ) - o.order_date                                 AS days_to_next_order,
  -- Classify the gap
  CASE
    WHEN LEAD(o.order_date) OVER (
      PARTITION BY o.customer_id ORDER BY o.order_date, o.order_id
    ) IS NULL THEN 'No next order yet'
    WHEN LEAD(o.order_date) OVER (
      PARTITION BY o.customer_id ORDER BY o.order_date, o.order_id
    ) - o.order_date <= 7  THEN 'Returned within a week'
    WHEN LEAD(o.order_date) OVER (
      PARTITION BY o.customer_id ORDER BY o.order_date, o.order_id
    ) - o.order_date <= 30 THEN 'Returned within a month'
    ELSE 'Long gap before return'
  END                                              AS return_pattern
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
ORDER BY o.customer_id, o.order_date;`}
        height={295}
        showSchema={true}
      />

      <H>Cohort retention — first order month vs return rate</H>

      <SQLPlayground
        initialQuery={`-- Identify customers by their first order month (cohort)
-- and whether they ordered again in the following month
WITH customer_orders AS (
  SELECT
    customer_id,
    order_date,
    DATE_TRUNC('month', MIN(order_date) OVER (
      PARTITION BY customer_id
    ))::DATE                                       AS cohort_month,
    DATE_TRUNC('month', order_date)::DATE          AS order_month
  FROM orders
  WHERE order_status = 'Delivered'
),
cohort_activity AS (
  SELECT DISTINCT
    customer_id,
    cohort_month,
    order_month
  FROM customer_orders
)
SELECT
  cohort_month,
  COUNT(DISTINCT customer_id)                      AS cohort_size,
  -- How many ordered in the month AFTER their cohort month?
  COUNT(DISTINCT CASE
    WHEN order_month = cohort_month + INTERVAL '1 month'
    THEN customer_id
  END)                                             AS returned_month2,
  ROUND(
    COUNT(DISTINCT CASE
      WHEN order_month = cohort_month + INTERVAL '1 month'
      THEN customer_id
    END)::NUMERIC
    / COUNT(DISTINCT customer_id) * 100
  , 1)                                             AS month2_retention_pct
FROM cohort_activity
GROUP BY cohort_month
ORDER BY cohort_month;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Session Gap Detection — Finding Breaks in Event Streams" />

      <P>Session gap detection identifies when a sequence of events has a meaningful gap — defining "sessions" in clickstream data, finding delivery delays, or flagging unusual pauses in order streams. The pattern: use LAG to compute the gap between consecutive events, then flag gaps above a threshold.</P>

      <H>Detecting gaps in order sequences</H>

      <SQLPlayground
        initialQuery={`-- Flag large gaps between consecutive orders for each store
-- A "gap" > 3 days between consecutive delivered orders might signal an issue
WITH store_order_sequence AS (
  SELECT
    store_id,
    order_id,
    order_date,
    total_amount,
    LAG(order_date) OVER (
      PARTITION BY store_id
      ORDER BY order_date, order_id
    )                                              AS prev_order_date,
    order_date - LAG(order_date) OVER (
      PARTITION BY store_id
      ORDER BY order_date, order_id
    )                                              AS days_since_prev
  FROM orders
  WHERE order_status = 'Delivered'
)
SELECT
  store_id,
  order_id,
  order_date,
  prev_order_date,
  days_since_prev,
  CASE
    WHEN prev_order_date IS NULL     THEN '— First order'
    WHEN days_since_prev > 5         THEN '⚠ Gap > 5 days'
    WHEN days_since_prev > 2         THEN '△ Gap 3-5 days'
    ELSE '✓ Normal'
  END                                              AS gap_flag
FROM store_order_sequence
ORDER BY store_id, order_date;`}
        height={270}
        showSchema={true}
      />

      <H>Customer order gap analysis — churn signal detection</H>

      <SQLPlayground
        initialQuery={`-- Identify customers whose gap between last two orders is increasing
-- (early churn signal: orders getting further apart)
WITH customer_gaps AS (
  SELECT
    customer_id,
    order_date,
    order_date - LAG(order_date) OVER (
      PARTITION BY customer_id
      ORDER BY order_date, order_id
    )                                              AS gap_days,
    LAG(order_date - LAG(order_date) OVER (
      PARTITION BY customer_id
      ORDER BY order_date, order_id
    )) OVER (
      PARTITION BY customer_id
      ORDER BY order_date, order_id
    )                                              AS prev_gap_days,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY order_date DESC, order_id DESC
    )                                              AS recency_rank
  FROM orders
  WHERE order_status = 'Delivered'
)
SELECT
  customer_id,
  order_date                                       AS last_order_date,
  gap_days                                         AS last_gap,
  prev_gap_days                                    AS prior_gap,
  gap_days - prev_gap_days                         AS gap_change,
  CASE
    WHEN prev_gap_days IS NULL      THEN 'Only 2 orders — no trend yet'
    WHEN gap_days > prev_gap_days * 1.5 THEN '⚠ Gap growing significantly'
    WHEN gap_days > prev_gap_days   THEN '△ Gap growing'
    WHEN gap_days < prev_gap_days   THEN '✓ Gap shrinking'
    ELSE '→ Stable gap'
  END                                              AS churn_signal
FROM customer_gaps
WHERE recency_rank = 1   -- most recent order per customer
  AND gap_days IS NOT NULL
ORDER BY gap_change DESC NULLS LAST;`}
        height={310}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="First and Last Event Patterns — Identifying Boundaries" />

      <P>Identifying the first and last occurrence of an event per entity is a foundational analytics pattern. Combined with LAG and LEAD, it powers acquisition analysis (first order), churn detection (last order), and event sequence boundaries.</P>

      <H>First order detection — is this the customer's first?</H>

      <SQLPlayground
        initialQuery={`-- Flag first and last orders per customer
SELECT
  customer_id,
  order_id,
  order_date,
  total_amount,
  -- Is this the first order? (no previous order = LAG is NULL)
  LAG(order_id) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  ) IS NULL                                        AS is_first_order,
  -- Is this the last order? (no next order = LEAD is NULL)
  LEAD(order_id) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  ) IS NULL                                        AS is_last_order,
  -- Order sequence number
  ROW_NUMBER() OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  )                                                AS order_seq,
  COUNT(*) OVER (PARTITION BY customer_id)         AS total_orders
FROM orders
WHERE order_status = 'Delivered'
ORDER BY customer_id, order_date;`}
        height={250}
        showSchema={true}
      />

      <H>First-order uplift — do first orders differ from repeat orders?</H>

      <SQLPlayground
        initialQuery={`-- Compare first order value vs subsequent order values
WITH order_sequence AS (
  SELECT
    customer_id,
    order_id,
    total_amount,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY order_date, order_id
    ) AS order_seq
  FROM orders
  WHERE order_status = 'Delivered'
)
SELECT
  CASE WHEN order_seq = 1 THEN 'First order' ELSE 'Repeat order' END AS order_type,
  COUNT(*)                                          AS order_count,
  ROUND(AVG(total_amount), 2)                       AS avg_value,
  ROUND(MIN(total_amount), 2)                       AS min_value,
  ROUND(MAX(total_amount), 2)                       AS max_value,
  ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (
    ORDER BY total_amount
  )::NUMERIC, 2)                                    AS median_value
FROM order_sequence
GROUP BY CASE WHEN order_seq = 1 THEN 'First order' ELSE 'Repeat order' END
ORDER BY order_type;`}
        height={245}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="State Change Detection — Tracking Status Transitions" />

      <P>State change detection identifies when a row's categorical value changes — order status transitions, loyalty tier upgrades, product availability changes. The pattern: LAG the status column and compare to the current value. When they differ, a transition occurred.</P>

      <SQLPlayground
        initialQuery={`-- Detect order status transitions
-- (simulating a status history log where orders have multiple status rows)
WITH order_status_log AS (
  -- Simulate status log: each order passes through stages
  SELECT order_id, 'Processing' AS status, order_date AS status_date
  FROM orders
  UNION ALL
  SELECT order_id, order_status, order_date + INTERVAL '1 day'
  FROM orders WHERE order_status IN ('Delivered','Cancelled')
)
SELECT
  order_id,
  status_date,
  status                                           AS current_status,
  LAG(status) OVER (
    PARTITION BY order_id
    ORDER BY status_date
  )                                                AS prev_status,
  -- Is this a status change?
  status != COALESCE(
    LAG(status) OVER (PARTITION BY order_id ORDER BY status_date),
    ''
  )                                                AS is_transition,
  -- Time spent in previous status
  status_date - LAG(status_date) OVER (
    PARTITION BY order_id
    ORDER BY status_date
  )                                                AS days_in_prev_status
FROM order_status_log
ORDER BY order_id, status_date
LIMIT 10;`}
        height={280}
        showSchema={true}
      />

      <H>Loyalty tier upgrade detection</H>

      <SQLPlayground
        initialQuery={`-- Detect if a customer's earned tier differs from their stored tier
-- (flagging who should be upgraded or downgraded)
WITH customer_earned AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name             AS customer,
    c.loyalty_tier                                 AS current_tier,
    CASE
      WHEN COALESCE(SUM(o.total_amount), 0) >= 5000 THEN 'Platinum'
      WHEN COALESCE(SUM(o.total_amount), 0) >= 2000 THEN 'Gold'
      WHEN COALESCE(SUM(o.total_amount), 0) >= 500  THEN 'Silver'
      ELSE 'Bronze'
    END                                            AS earned_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0)    AS lifetime_value
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
)
SELECT
  customer_id,
  customer,
  current_tier,
  earned_tier,
  lifetime_value,
  CASE
    WHEN current_tier = earned_tier THEN '✓ Correct'
    WHEN ARRAY_POSITION(
      ARRAY['Bronze','Silver','Gold','Platinum'], earned_tier
    ) > ARRAY_POSITION(
      ARRAY['Bronze','Silver','Gold','Platinum'], current_tier
    ) THEN '⬆ Should upgrade'
    ELSE '⬇ Should downgrade'
  END                                              AS tier_action
FROM customer_earned
ORDER BY tier_action, lifetime_value DESC;`}
        height={290}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Funnel Analysis — Drop-off Between Steps" />

      <P>Funnel analysis measures how many users/customers complete each step in a sequence and where drop-off occurs. LAG and LEAD make it easy to compare adjacent funnel steps without multiple subqueries.</P>

      <CodeBlock
        label="Funnel analysis pattern — drop-off between steps"
        code={`-- Define funnel steps with a CTE, then use LAG to compute drop-off
WITH funnel_steps AS (
  SELECT 1 AS step_num, 'Visited' AS step_name, 1000 AS users
  UNION ALL SELECT 2, 'Added to cart', 650
  UNION ALL SELECT 3, 'Started checkout', 420
  UNION ALL SELECT 4, 'Entered payment', 310
  UNION ALL SELECT 5, 'Completed order', 245
)
SELECT
  step_num,
  step_name,
  users,
  -- Previous step's users
  LAG(users) OVER (ORDER BY step_num)              AS prev_step_users,
  -- Drop-off count
  LAG(users) OVER (ORDER BY step_num) - users      AS dropped_off,
  -- Drop-off rate from previous step
  ROUND(
    (LAG(users) OVER (ORDER BY step_num) - users)::NUMERIC
    / NULLIF(LAG(users) OVER (ORDER BY step_num), 0) * 100
  , 1)                                             AS dropoff_pct,
  -- Conversion rate from step 1 (top of funnel)
  ROUND(users::NUMERIC / FIRST_VALUE(users) OVER (
    ORDER BY step_num
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) * 100, 1)                                      AS overall_conversion_pct
FROM funnel_steps
ORDER BY step_num;`}
      />

      <SQLPlayground
        initialQuery={`-- FreshCart order funnel: how many orders reach each status stage
WITH order_funnel AS (
  SELECT
    1 AS step_num, 'Orders placed (all)'          AS step_name,
    COUNT(*) AS order_count FROM orders
  UNION ALL
  SELECT 2, 'Delivered', COUNT(*) FROM orders WHERE order_status = 'Delivered'
  UNION ALL
  SELECT 3, 'Delivered on time (≤ 3 days)',
    COUNT(*) FROM orders
    WHERE order_status = 'Delivered'
      AND delivery_date - order_date <= 3
  UNION ALL
  SELECT 4, 'High value delivered (> ₹500)',
    COUNT(*) FROM orders
    WHERE order_status = 'Delivered'
      AND total_amount > 500
  UNION ALL
  SELECT 5, 'Cancelled', COUNT(*) FROM orders WHERE order_status = 'Cancelled'
)
SELECT
  step_name,
  order_count,
  LAG(order_count) OVER (ORDER BY step_num)       AS prev_count,
  CASE
    WHEN step_num = 1 THEN '—'
    ELSE ROUND(
      order_count::NUMERIC
      / NULLIF(LAG(order_count) OVER (ORDER BY step_num), 0) * 100
    , 1)::TEXT || '%'
  END                                              AS rate_from_prev,
  ROUND(
    order_count::NUMERIC
    / FIRST_VALUE(order_count) OVER (
      ORDER BY step_num
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) * 100
  , 1)::TEXT || '%'                                AS overall_rate
FROM order_funnel
ORDER BY step_num;`}
        height={285}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Running Comparisons — Each Row vs Its Previous N Rows" />

      <P>Beyond simple one-step LAG, production analytics often needs to compare a value to an average or sum of the previous N values — a baseline computed from the recent history. The combination of LAG-based values and frame-based window aggregates handles this cleanly.</P>

      <SQLPlayground
        initialQuery={`-- Is today's revenue above the trailing 3-day average?
WITH daily_revenue AS (
  SELECT
    order_date,
    ROUND(SUM(total_amount), 2) AS daily_rev
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY order_date
)
SELECT
  order_date,
  daily_rev,
  -- 3-day trailing average (excludes current row)
  ROUND(AVG(daily_rev) OVER (
    ORDER BY order_date
    ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
  ), 2)                                            AS trailing_3day_avg,
  -- Is today above or below the trailing average?
  CASE
    WHEN AVG(daily_rev) OVER (
      ORDER BY order_date
      ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
    ) IS NULL THEN '— Not enough history'
    WHEN daily_rev > AVG(daily_rev) OVER (
      ORDER BY order_date
      ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
    ) THEN '▲ Above trailing avg'
    ELSE '▼ Below trailing avg'
  END                                              AS vs_trailing_avg,
  -- Day-over-day change
  ROUND(daily_rev - LAG(daily_rev) OVER (
    ORDER BY order_date
  ), 2)                                            AS dod_change
FROM daily_revenue
ORDER BY order_date;`}
        height={285}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product sales: compare each month to its own 2-month average
WITH monthly_product_sales AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    DATE_TRUNC('month', o.order_date)::DATE        AS month_start,
    ROUND(SUM(oi.line_total), 2)                   AS monthly_revenue
  FROM products    AS p
  JOIN order_items AS oi ON p.product_id = oi.product_id
  JOIN orders      AS o  ON oi.order_id  = o.order_id
  WHERE o.order_status = 'Delivered'
  GROUP BY p.product_id, p.product_name, p.category,
           DATE_TRUNC('month', o.order_date)
)
SELECT
  product_name,
  category,
  month_start,
  monthly_revenue,
  -- Previous month's revenue
  LAG(monthly_revenue) OVER (
    PARTITION BY product_id
    ORDER BY month_start
  )                                                AS prev_month,
  -- 2-month trailing average (excludes current month)
  ROUND(AVG(monthly_revenue) OVER (
    PARTITION BY product_id
    ORDER BY month_start
    ROWS BETWEEN 2 PRECEDING AND 1 PRECEDING
  ), 2)                                            AS trailing_2m_avg,
  -- MoM change
  ROUND(monthly_revenue - LAG(monthly_revenue) OVER (
    PARTITION BY product_id
    ORDER BY month_start
  ), 2)                                            AS mom_change
FROM monthly_product_sales
ORDER BY category, product_name, month_start;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Islands and Gaps — Consecutive Sequence Analysis" />

      <P>The islands and gaps problem: given a sequence of events, identify consecutive runs ("islands") and the breaks between them ("gaps"). Classic examples: consecutive days a store was active, runs of increasing revenue, streaks of on-time deliveries. The LAG-based solution is elegant.</P>

      <H>Consecutive active days per store</H>

      <SQLPlayground
        initialQuery={`-- Find consecutive active days (days with delivered orders) per store
WITH active_days AS (
  SELECT DISTINCT
    store_id,
    order_date AS active_date
  FROM orders
  WHERE order_status = 'Delivered'
),
with_gaps AS (
  SELECT
    store_id,
    active_date,
    -- Gap from previous active day
    active_date - LAG(active_date) OVER (
      PARTITION BY store_id
      ORDER BY active_date
    )                                              AS days_gap,
    -- A new island starts when gap > 1 (non-consecutive)
    CASE
      WHEN active_date - LAG(active_date) OVER (
        PARTITION BY store_id ORDER BY active_date
      ) > 1 OR LAG(active_date) OVER (
        PARTITION BY store_id ORDER BY active_date
      ) IS NULL
      THEN 1 ELSE 0
    END                                            AS is_island_start
  FROM active_days
),
island_labels AS (
  SELECT
    store_id,
    active_date,
    days_gap,
    -- Cumulative sum of island starts = island number
    SUM(is_island_start) OVER (
      PARTITION BY store_id
      ORDER BY active_date
    )                                              AS island_num
  FROM with_gaps
)
SELECT
  store_id,
  island_num,
  MIN(active_date)                                 AS island_start,
  MAX(active_date)                                 AS island_end,
  COUNT(*)                                         AS consecutive_days,
  MAX(active_date) - MIN(active_date) + 1          AS span_days
FROM island_labels
GROUP BY store_id, island_num
ORDER BY store_id, island_start;`}
        height={330}
        showSchema={true}
      />

      <ProTip>
        The islands-and-gaps pattern always follows the same structure: (1) LAG to compute the gap from the previous row, (2) flag rows where gap &gt; threshold as island starts, (3) cumulative SUM of the flag gives each island a unique number, (4) GROUP BY the island number to summarise each island. This pattern works for any "consecutive run" problem — daily activity streaks, consecutive revenue increases, runs of on-time delivery.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data analyst at Swiggy. The retention team needs a comprehensive customer health report: for each customer who placed their most recent order within the last 60 days, show their order history summary, their average gap between orders, whether their gaps are increasing or decreasing (churn signal), and their predicted next order window based on their typical gap.</P>

      <TimeBlock time="11:00 AM" label="Requirements: customer order cadence report">
        Most recent order date, total orders, avg gap between orders, gap trend (increasing/stable/decreasing), and predicted next order window. Only customers whose last order was within 60 days.
      </TimeBlock>

      <TimeBlock time="11:25 AM" label="Design: LAG chain computes gaps, trend uses LAG of LAG">
        Gap = order_date - LAG(order_date). Gap trend = latest gap vs average of previous gaps. Prediction = last order date + avg gap.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Customer order cadence analysis
WITH order_gaps AS (
  SELECT
    o.customer_id,
    o.order_id,
    o.order_date,
    o.total_amount,
    -- Gap from previous order
    o.order_date - LAG(o.order_date) OVER (
      PARTITION BY o.customer_id
      ORDER BY o.order_date, o.order_id
    )                                              AS gap_days,
    ROW_NUMBER() OVER (
      PARTITION BY o.customer_id
      ORDER BY o.order_date DESC, o.order_id DESC
    )                                              AS recency_rank,
    COUNT(*) OVER (PARTITION BY o.customer_id)     AS total_orders
  FROM orders AS o
  WHERE o.order_status = 'Delivered'
),
customer_cadence AS (
  SELECT
    customer_id,
    total_orders,
    -- Most recent order
    MAX(CASE WHEN recency_rank = 1 THEN order_date END) AS last_order_date,
    -- Most recent gap
    MAX(CASE WHEN recency_rank = 1 THEN gap_days END)   AS latest_gap,
    -- Average gap across all orders (excluding first order which has no gap)
    ROUND(AVG(gap_days), 1)                             AS avg_gap_days,
    -- Total spend
    ROUND(SUM(total_amount), 2)                         AS total_spend
  FROM order_gaps
  GROUP BY customer_id, total_orders
)
SELECT
  cc.customer_id,
  c.first_name || ' ' || c.last_name              AS customer,
  c.loyalty_tier,
  cc.total_orders,
  cc.last_order_date,
  CURRENT_DATE - cc.last_order_date               AS days_since_last,
  cc.avg_gap_days,
  cc.latest_gap,
  cc.total_spend,
  -- Predicted next order window
  (cc.last_order_date + cc.avg_gap_days::INTEGER)::DATE AS predicted_next_order,
  -- Gap trend: is the customer ordering more or less frequently?
  CASE
    WHEN cc.latest_gap IS NULL OR cc.total_orders < 3 THEN 'Not enough data'
    WHEN cc.latest_gap <= cc.avg_gap_days * 0.8       THEN '✓ Ordering faster'
    WHEN cc.latest_gap >= cc.avg_gap_days * 1.3       THEN '⚠ Ordering slower'
    ELSE '→ Stable cadence'
  END                                              AS gap_trend,
  -- At-risk flag: last gap much longer than usual
  CASE
    WHEN cc.latest_gap > cc.avg_gap_days * 2 THEN '🚨 At risk'
    WHEN cc.latest_gap > cc.avg_gap_days * 1.5 THEN '⚠ Watch'
    ELSE '✓ OK'
  END                                              AS churn_risk
FROM customer_cadence AS cc
JOIN customers AS c ON cc.customer_id = c.customer_id
WHERE cc.last_order_date >= CURRENT_DATE - INTERVAL '60 days'
  AND cc.total_orders >= 2
ORDER BY churn_risk DESC, days_since_last DESC;`}
        height={400}
        showSchema={true}
      />

      <TimeBlock time="12:20 PM" label="Report delivered — actionable retention signals">
        The LAG-powered cadence report gives the retention team three actionable segments: customers ordering faster (reward them), customers ordering slower (trigger a re-engagement campaign), and at-risk customers (urgent outreach). The predicted next order date helps the team time outreach optimally — contact customers whose predicted date has passed.
      </TimeBlock>

      <ProTip>
        When building predictive signals from order gaps, always filter to customers with at least 2-3 orders before computing gap trends. A customer with one order has no gap; a customer with two orders has one gap but no trend. Meaningful gap trends require at least 3 orders (two gaps to compare). Add a WHERE total_orders &gt;= 3 filter to the final report to avoid misleading signals from customers with limited history.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How do you compute month-over-month growth using SQL window functions?">
        <p style={{ margin: '0 0 14px' }}>The pattern: aggregate data to monthly granularity in a CTE using DATE_TRUNC('month', date), then apply LAG(revenue) OVER (ORDER BY month_start) in the outer SELECT to access the previous month's value. The MoM change is current_revenue - LAG(revenue), and the growth percentage is (current - previous) / NULLIF(previous, 0) * 100.</p>
        <p style={{ margin: '0 0 14px' }}>Full implementation: WITH monthly AS (SELECT DATE_TRUNC('month', order_date)::DATE AS month_start, ROUND(SUM(total_amount), 2) AS revenue FROM orders WHERE order_status = 'Delivered' GROUP BY DATE_TRUNC('month', order_date)) SELECT month_start, revenue, LAG(revenue) OVER (ORDER BY month_start) AS prev_revenue, ROUND(revenue - LAG(revenue) OVER (ORDER BY month_start), 2) AS mom_change, ROUND((revenue - LAG(revenue) OVER (ORDER BY month_start)) / NULLIF(LAG(revenue) OVER (ORDER BY month_start), 0) * 100, 1) AS mom_pct FROM monthly ORDER BY month_start.</p>
        <p style={{ margin: 0 }}>Important details: NULLIF(LAG(revenue), 0) prevents division by zero if a prior month had zero revenue. The first month's LAG returns NULL — handle this in the display (show '— First period' instead of a percentage). For per-entity PoP (per store, per product), add PARTITION BY entity_id to the OVER clause — LAG then looks at the previous month for the same entity, not the globally previous month. For year-over-year using monthly data, use LAG(revenue, 12) OVER (ORDER BY month_start) — the offset 12 reaches back 12 months.</p>
      </IQ>

      <IQ q="How do you detect if a customer is churning using SQL?">
        <p style={{ margin: '0 0 14px' }}>Churn detection combines LAG (to compute gaps between orders) with aggregation (to compare recent gaps to historical averages). The pattern: for each customer's orders, compute the gap in days between consecutive orders using order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date). Then aggregate per customer: the latest gap, the average historical gap, and the ratio between them.</p>
        <p style={{ margin: '0 0 14px' }}>A customer shows churn signals when their latest gap significantly exceeds their historical average: latest_gap &gt; avg_gap * 1.5 is "at risk," latest_gap &gt; avg_gap * 2 is "likely churned." Customers whose last order date is beyond their predicted next order date (last_order_date + avg_gap &lt; CURRENT_DATE) are overdue. Combining these signals produces an actionable churn risk score: Green (ordering within normal cadence), Amber (gap longer than usual), Red (significantly overdue).</p>
        <p style={{ margin: 0 }}>A complete signal: for customers whose last order was more than 90 days ago AND whose last gap is more than twice their average gap, send a re-engagement campaign. Use LEAD instead of LAG for forward-looking analysis — LEAD(order_date) OVER (...) on the most recent order returns NULL (no next order yet), which is itself a churn signal for customers whose last gap has exceeded their typical cadence. Filter to customers with at least 3 orders before computing trends — fewer orders produce unreliable gap averages.</p>
      </IQ>

      <IQ q="What is the islands and gaps problem and how do you solve it with LAG?">
        <p style={{ margin: '0 0 14px' }}>The islands and gaps problem identifies consecutive runs of events (islands) separated by breaks (gaps). Examples: consecutive days a user was active, consecutive months of positive revenue growth, consecutive on-time deliveries. The challenge is grouping consecutive rows into the same island when there is no explicit island identifier in the data.</p>
        <p style={{ margin: '0 0 14px' }}>The LAG-based solution in four steps. Step 1: use LAG to compute the gap between each row and its predecessor — active_date - LAG(active_date) OVER (PARTITION BY entity ORDER BY active_date). Step 2: flag rows where the gap exceeds the threshold as island starts — CASE WHEN gap &gt; 1 OR LAG is NULL THEN 1 ELSE 0 END AS is_island_start. Step 3: compute a cumulative sum of the island start flag using SUM(is_island_start) OVER (PARTITION BY entity ORDER BY active_date) — each island gets a unique incrementing number. Step 4: GROUP BY the island number to summarise each consecutive run — MIN(date) is the island start, MAX(date) is the island end, COUNT(*) is the island length.</p>
        <p style={{ margin: 0 }}>The elegance of this approach: the cumulative SUM of the is_island_start flag increments exactly once per island. All rows in the same consecutive run share the same cumulative sum value — the same island number. Any non-consecutive gap increments the flag, creating a new island number for all subsequent rows. This pattern generalises to any consecutive-run problem: consecutive days of positive revenue (flag when revenue turns negative or date jumps), consecutive on-time deliveries (flag when a late delivery occurs), consecutive months of sales growth (flag when growth rate goes negative).</p>
      </IQ>

      <IQ q="How do you compute the average gap between a customer's orders?">
        <p style={{ margin: '0 0 14px' }}>Use LAG to compute the gap for each order, then aggregate per customer. The gap for each order is order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id). The first order per customer has LAG = NULL (no prior order) — this NULL is excluded from AVG automatically, so AVG correctly computes the average gap only across orders that have a preceding order.</p>
        <p style={{ margin: '0 0 14px' }}>Implementation: WITH order_gaps AS (SELECT customer_id, order_date, order_date - LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS gap_days FROM orders WHERE order_status = 'Delivered') SELECT customer_id, COUNT(*) AS order_count, ROUND(AVG(gap_days), 1) AS avg_gap_days, MIN(gap_days) AS min_gap, MAX(gap_days) AS max_gap FROM order_gaps GROUP BY customer_id HAVING COUNT(*) &gt;= 2. The HAVING COUNT(*) &gt;= 2 excludes single-order customers who have no meaningful gap to compute.</p>
        <p style={{ margin: 0 }}>The result is used for: predicted next order date (last_order_date + avg_gap_days::INTEGER), churn signal (CURRENT_DATE - last_order_date &gt; avg_gap_days * 1.5), and segment classification (customers with avg_gap &lt; 7 days are weekly shoppers, avg_gap 7-30 days are monthly shoppers). Always add a tiebreaker to the ORDER BY inside the LAG (order_id is a good choice) — when two orders share the same date, the gap computation must be deterministic.</p>
      </IQ>

      <IQ q="How would you build a funnel analysis query showing drop-off rates between steps?">
        <p style={{ margin: '0 0 14px' }}>A funnel analysis needs: the count at each step, the drop-off from the previous step, and the overall conversion from the top of the funnel. LAG provides the previous step's count, FIRST_VALUE provides the top-of-funnel count, and simple arithmetic computes the rates.</p>
        <p style={{ margin: '0 0 14px' }}>Pattern: define each funnel step as a row in a CTE — either using a VALUES clause for known step counts, or computing counts per step from event tables. Then in the outer SELECT, apply LAG(users) OVER (ORDER BY step_num) for the previous step count. Drop-off = LAG(users) - users. Drop-off rate = drop-off / LAG(users) * 100. Overall conversion = users / FIRST_VALUE(users) OVER (ORDER BY step_num ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100 — this gives the cumulative conversion from step 1.</p>
        <p style={{ margin: 0 }}>For a real event-based funnel (not pre-aggregated counts), aggregate each step separately in a CTE — count distinct users who performed action A, action B, action C — then UNION ALL the step counts into one result set that LAG can process. The key is computing steps independently (not chaining — A then B then C — which double-counts and misses users who skip steps) and then joining the step counts. Use DISTINCT user counts at each step, not cumulative — a user who completes step 3 should not be double-counted at step 2. The funnel shows what percentage of the initial population makes it to each step, independent of whether they did all prior steps.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="LAG returns NULL for all rows — expected to see previous values"
        cause="The OVER clause is missing ORDER BY. LAG requires ORDER BY to define which row is 'previous' — without it, the concept of row order is undefined and the result is NULL for all rows. Alternatively, PARTITION BY is creating partitions of one row each (all rows have a unique partition key), so every row is alone in its partition and has no predecessor."
        fix="Add ORDER BY to the OVER clause: LAG(col) OVER (PARTITION BY customer_id ORDER BY order_date). Verify PARTITION BY groups multiple rows — check SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id to confirm multiple orders per customer. If PARTITION BY customer_id gives single-row partitions because the data is already one-row-per-customer (after aggregation), the LAG needs to be computed before the aggregation step."
      />

      <Err
        msg="Month-over-month LAG produces wrong values — compares to wrong month"
        cause="The ORDER BY in the OVER clause is not using DATE_TRUNC output — it may be using a string representation or a partial date component. If two different months sort identically (e.g., both have month_num = 1 for January across different years), LAG skips to the wrong prior row. Or PARTITION BY is inadvertently splitting months into single-row partitions."
        fix="Use DATE_TRUNC('month', date)::DATE as both the GROUP BY key and the ORDER BY in the OVER clause: LAG(revenue) OVER (ORDER BY DATE_TRUNC('month', order_date)). The DATE comparison is unambiguous — 2024-01-01 sorts before 2024-02-01 regardless of year. If PARTITION BY is present for multi-entity PoP, ensure it is only on the entity column (store_id, product_id) — not on a date component that would create single-month partitions."
      />

      <Err
        msg="Gap calculation produces NULL for the first row — expected 0"
        cause="The first row in a partition has no predecessor — LAG returns NULL. When computing gap = date - LAG(date), the first row's gap is NULL. If downstream logic treats NULL as 0 (e.g., a WHERE gap > 5 filter excludes NULL rows), first orders are silently excluded from analysis."
        fix="Use the default parameter of LAG to substitute a value for the first row: LAG(order_date, 1, order_date) OVER (...) returns the current date when no prior row exists — making the first row's gap = 0. Alternatively, use COALESCE: COALESCE(order_date - LAG(order_date) OVER (...), 0). Choose the default based on semantics: 0 days gap for first orders (they have no wait), or keep NULL to explicitly mark first orders and handle them separately in downstream logic."
      />

      <Err
        msg="Islands-and-gaps island number resets to 1 mid-sequence — unexpected new island"
        cause="The is_island_start flag is incorrectly set to 1 for rows that should be in the same island. The gap condition (gap > threshold) is triggering for rows that are actually consecutive. Common causes: the ORDER BY column has duplicate values causing non-deterministic ordering, the gap threshold is too tight, or the date arithmetic is wrong (e.g., comparing dates when the column is a TIMESTAMP with time components that differ)."
        fix="Verify the gap values: SELECT store_id, active_date, active_date - LAG(active_date) OVER (PARTITION BY store_id ORDER BY active_date) AS gap FROM active_days ORDER BY store_id, active_date. Confirm the gap values match expectations. If dates are TIMESTAMP type, cast to DATE first: active_date::DATE - LAG(active_date::DATE) OVER (...) to avoid sub-day gaps from time components. Add a secondary ORDER BY tiebreaker to resolve ties in the primary sort column."
      />

      <Err
        msg="Funnel drop-off rate exceeds 100% — more users at step N+1 than at step N"
        cause="The funnel steps are not properly defined as sequential subsets. A user counted at step 3 was not counted at step 2 — meaning step 3's population is not a subset of step 2's. This happens when steps use different filters that are not strictly nested (e.g., step 2 counts orders in January but step 3 counts all delivered orders regardless of month)."
        fix="Ensure each funnel step's population is a strict subset of the previous step. In SQL, this means joining each step to the prior step: users at step 3 must have also completed step 2. Use EXISTS or IN to enforce the sequence: step 3 count = COUNT(DISTINCT user_id) WHERE completed_step3 AND user_id IN (step2_users) AND user_id IN (step1_users). For event-based funnels, filter each step to only users who completed all prior steps before counting — this ensures the funnel is strictly sequential and each step can only have fewer or equal users compared to the prior step."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Build a store performance trend report using LAG and LEAD. For each store and each day they had delivered orders, show: store_id, city, order_date, daily_revenue, the previous day's revenue for this store (prev_day_revenue — NULL if no previous day), day-over-day change (dod_change), day-over-day percentage change (dod_pct, rounded to 1dp), the next day's revenue for this store (next_day_revenue), a 3-day trailing average excluding the current day (trailing_3day_avg — use ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING), and a performance label: 'Best day' if daily_revenue = MAX for that store, 'Growing' if dod_change > 0, 'Declining' if dod_change < 0, 'First day' if prev_day_revenue IS NULL, 'Flat' otherwise. Use a CTE for daily aggregation. Sort by store_id then order_date."
        hint="CTE: GROUP BY store_id, order_date. Then LAG(daily_revenue) OVER (PARTITION BY store_id ORDER BY order_date) for prev. LEAD for next. AVG OVER with ROWS 3 PRECEDING AND 1 PRECEDING for trailing. MAX OVER (PARTITION BY store_id) for store max. CASE checks in order: best day first."
        answer={`WITH daily_store AS (
  SELECT
    o.store_id,
    s.city,
    o.order_date,
    ROUND(SUM(o.total_amount), 2)   AS daily_revenue,
    COUNT(o.order_id)               AS daily_orders
  FROM orders  AS o
  JOIN stores  AS s ON o.store_id = s.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id, s.city, o.order_date
),
with_lags AS (
  SELECT
    store_id,
    city,
    order_date,
    daily_revenue,
    daily_orders,
    -- Previous day's revenue for this store
    LAG(daily_revenue) OVER (
      PARTITION BY store_id
      ORDER BY order_date
    )                                              AS prev_day_revenue,
    -- Next day's revenue for this store
    LEAD(daily_revenue) OVER (
      PARTITION BY store_id
      ORDER BY order_date
    )                                              AS next_day_revenue,
    -- 3-day trailing average (excludes current day)
    ROUND(AVG(daily_revenue) OVER (
      PARTITION BY store_id
      ORDER BY order_date
      ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
    ), 2)                                          AS trailing_3day_avg,
    -- Store's all-time best day revenue
    MAX(daily_revenue) OVER (
      PARTITION BY store_id
    )                                              AS store_max_revenue
  FROM daily_store
)
SELECT
  store_id,
  city,
  order_date,
  daily_revenue,
  daily_orders,
  prev_day_revenue,
  next_day_revenue,
  trailing_3day_avg,
  -- Day-over-day change
  ROUND(daily_revenue - prev_day_revenue, 2)       AS dod_change,
  -- Day-over-day percentage change
  ROUND(
    (daily_revenue - prev_day_revenue)
    / NULLIF(prev_day_revenue, 0) * 100
  , 1)                                             AS dod_pct,
  -- Performance label (order matters: best day checked first)
  CASE
    WHEN daily_revenue = store_max_revenue         THEN 'Best day'
    WHEN prev_day_revenue IS NULL                  THEN 'First day'
    WHEN daily_revenue > prev_day_revenue          THEN 'Growing'
    WHEN daily_revenue < prev_day_revenue          THEN 'Declining'
    ELSE 'Flat'
  END                                              AS performance_label
FROM with_lags
ORDER BY store_id, order_date;`}
        explanation="The two-CTE pattern is essential here. daily_store pre-aggregates to daily store revenue — applying window functions to raw order rows would produce one result row per order, not per day. with_lags computes all window expressions in a single layer: LAG and LEAD for adjacent-day values, AVG with a custom frame for the trailing average, and MAX OVER (PARTITION BY store_id) without ORDER BY or frame to get the all-time maximum across all days for that store. The final SELECT references the named columns from with_lags rather than repeating the window expressions — this is clean and avoids recomputation. The ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING frame for trailing_3day_avg deliberately excludes the current day (AND 1 PRECEDING means stop one row before the current), giving a true trailing average from prior days only. The performance_label CASE checks 'Best day' first — if a day is simultaneously the best day AND shows growth (which it likely does), it should be labelled 'Best day' not 'Growing'. 'First day' is checked before growth/decline because prev_day_revenue IS NULL makes the dod_change comparison meaningless."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'LAG(col, n, default) returns the value n rows before the current row within the window. LEAD(col, n, default) returns n rows after. Both require ORDER BY — without it, before/after are undefined.',
          'LAG replaces every self-join for adjacent-row comparison. The window (PARTITION BY + ORDER BY) defines what adjacent means — previous order for the same customer, previous day for the same store.',
          'Period-over-period pattern: aggregate to period granularity in a CTE (DATE_TRUNC), then apply LAG(revenue) OVER (ORDER BY month_start) in the outer SELECT. MoM change = revenue - LAG(revenue). Growth rate uses NULLIF on the denominator.',
          'For per-entity PoP (per store, per product), add PARTITION BY entity_id to the OVER clause — LAG looks at the previous period for the same entity, not the globally previous row.',
          'Churn signal: compute gap_days = order_date - LAG(order_date), then compare latest_gap to avg_gap per customer. latest_gap > avg_gap * 1.5 is at risk; > 2x is likely churned.',
          'First-order detection: LAG(order_id) IS NULL flags the first order per customer (no predecessor). LEAD(order_id) IS NULL flags the last order (no successor).',
          'Islands and gaps: (1) LAG to compute gap, (2) flag gap > threshold as island_start = 1, (3) SUM(island_start) OVER (...) cumulative gives each island a unique number, (4) GROUP BY island_num to summarise runs.',
          'Funnel drop-off: define step counts in a CTE, then LAG(users) OVER (ORDER BY step_num) gives the prior step count. Drop-off rate = (LAG - current) / LAG * 100. Overall conversion uses FIRST_VALUE.',
          'Trailing average excluding current row: ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING. This frame ends one row before the current row — the average is from prior rows only, a true trailing baseline.',
          'Always pre-aggregate to the correct granularity in a CTE before applying LAG/LEAD. Window functions on raw row-level data when you need daily or monthly values produce one result per raw row, not per period.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 54</strong>, you learn Recursive CTEs — querying hierarchical data like org charts, category trees, and bill-of-materials without fixed-depth self-joins, using the WITH RECURSIVE pattern.
        </p>
        <Link href="/learn/sql/recursive-cte" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 54 → Recursive CTEs
        </Link>
      </div>

    </LearnLayout>
  );
}