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

export default function RankingFunctions() {
  return (
    <LearnLayout
      title="Ranking Functions"
      description="Advanced ranking — percentile rank, cumulative distribution, conditional rankings, multi-level leaderboards, and every production pattern where ranking drives business decisions"
      section="SQL — Module 52"
      readTime="14–20 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Full Ranking Toolkit" />

      <P>Module 51 introduced ROW_NUMBER, RANK, DENSE_RANK, and NTILE. This module goes deeper — covering the statistical ranking functions PERCENT_RANK and CUME_DIST, the ordered-set aggregate PERCENTILE_CONT, conditional and multi-level ranking, and the production patterns that appear in leaderboards, cohort analysis, and performance tiers.</P>

      <CodeBlock
        label="Complete ranking function reference"
        code={`-- Positional ranking (covered in Module 51):
ROW_NUMBER() OVER (PARTITION BY grp ORDER BY col)  -- 1,2,3,4 — always unique
RANK()       OVER (PARTITION BY grp ORDER BY col)  -- 1,1,3,4 — gaps after ties
DENSE_RANK() OVER (PARTITION BY grp ORDER BY col)  -- 1,1,2,3 — no gaps
NTILE(n)     OVER (ORDER BY col)                   -- bucket 1..n

-- Statistical / fractional ranking (this module):
PERCENT_RANK() OVER (ORDER BY col)
-- Relative rank 0.0 to 1.0 — what fraction of rows rank below this row
-- Formula: (rank - 1) / (total_rows - 1)
-- First row: 0.0,  Last row: 1.0

CUME_DIST() OVER (ORDER BY col)
-- Cumulative distribution: fraction of rows <= current row's value
-- Formula: rank / total_rows  (including ties — all tied rows same value)
-- Values: 0 < CUME_DIST <= 1.0

-- Ordered-set aggregates (called differently — no OVER()):
PERCENTILE_CONT(0.5)  WITHIN GROUP (ORDER BY col)  -- median (interpolated)
PERCENTILE_DISC(0.5)  WITHIN GROUP (ORDER BY col)  -- median (actual value in dataset)
MODE() WITHIN GROUP (ORDER BY col)                  -- most frequent value`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="PERCENT_RANK and CUME_DIST — Statistical Position" />

      <P><Hl>PERCENT_RANK</Hl> answers "what percentage of rows rank strictly below this one?" — ranging from 0.0 (lowest) to 1.0 (highest). <Hl>CUME_DIST</Hl> answers "what fraction of rows have a value less than or equal to this row's value?" — always greater than 0.0, up to 1.0. Both are useful for expressing a row's position as a relative fraction rather than an absolute rank number.</P>

      <SQLPlayground
        initialQuery={`-- PERCENT_RANK and CUME_DIST on order values
SELECT
  order_id,
  store_id,
  total_amount,
  RANK() OVER (ORDER BY total_amount)                             AS rank_asc,
  ROUND(PERCENT_RANK() OVER (ORDER BY total_amount)::NUMERIC, 3) AS pct_rank,
  ROUND(CUME_DIST()    OVER (ORDER BY total_amount)::NUMERIC, 3) AS cume_dist,
  -- Interpret: what % of orders are cheaper than this one?
  ROUND(PERCENT_RANK() OVER (ORDER BY total_amount)::NUMERIC * 100, 1) || '%'
                                                                  AS cheaper_than_pct
FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount
LIMIT 12;`}
        height={225}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- PERCENT_RANK per store partition
-- "Where does this order sit within its own store's distribution?"
SELECT
  store_id,
  order_id,
  total_amount,
  ROUND(PERCENT_RANK() OVER (
    PARTITION BY store_id
    ORDER BY total_amount
  )::NUMERIC * 100, 1)                                          AS store_pct_rank,
  -- Label the position
  CASE
    WHEN PERCENT_RANK() OVER (PARTITION BY store_id ORDER BY total_amount) >= 0.9
    THEN 'Top 10%'
    WHEN PERCENT_RANK() OVER (PARTITION BY store_id ORDER BY total_amount) >= 0.75
    THEN 'Top 25%'
    WHEN PERCENT_RANK() OVER (PARTITION BY store_id ORDER BY total_amount) >= 0.5
    THEN 'Above median'
    ELSE 'Below median'
  END                                                           AS store_position
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, total_amount DESC
LIMIT 12;`}
        height={255}
        showSchema={false}
      />

      <H>PERCENT_RANK vs CUME_DIST — the key difference</H>

      <CodeBlock
        label="PERCENT_RANK vs CUME_DIST — formula and interpretation"
        code={`-- For a set of 5 rows with values: 100, 200, 200, 300, 400

-- PERCENT_RANK: (rank - 1) / (total - 1)
-- Row 100: rank=1 → (1-1)/(5-1) = 0.0    (0% of rows rank below)
-- Row 200: rank=2 → (2-1)/(5-1) = 0.25   (25% rank strictly below)
-- Row 200: rank=2 → (2-1)/(5-1) = 0.25   (same rank = same pct_rank)
-- Row 300: rank=4 → (4-1)/(5-1) = 0.75   (75% rank below)
-- Row 400: rank=5 → (5-1)/(5-1) = 1.0    (100% rank below)

-- CUME_DIST: rows_leq / total_rows
-- Row 100: 1 row ≤ 100  → 1/5 = 0.2
-- Row 200: 3 rows ≤ 200 → 3/5 = 0.6   (both 200s get same value)
-- Row 200: 3 rows ≤ 200 → 3/5 = 0.6
-- Row 300: 4 rows ≤ 300 → 4/5 = 0.8
-- Row 400: 5 rows ≤ 400 → 5/5 = 1.0

-- Key differences:
-- PERCENT_RANK can be 0.0 (first row always 0); CUME_DIST is always > 0
-- PERCENT_RANK: how many rows are STRICTLY BELOW (exclusive)
-- CUME_DIST:    how many rows are <= this value (inclusive)
-- For selecting top N%: use PERCENT_RANK >= (1 - N/100)
--                  e.g. top 20%: PERCENT_RANK >= 0.8`}
      />

      <SQLPlayground
        initialQuery={`-- Find top 25% of customers by lifetime value using PERCENT_RANK
WITH customer_ltv AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name              AS customer,
    c.loyalty_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0)      AS lifetime_value
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id   = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
)
SELECT
  customer_id,
  customer,
  loyalty_tier,
  lifetime_value,
  ROUND(PERCENT_RANK() OVER (
    ORDER BY lifetime_value
  )::NUMERIC * 100, 1)                              AS pct_rank,
  CASE
    WHEN PERCENT_RANK() OVER (ORDER BY lifetime_value) >= 0.75
    THEN '⭐ Top 25%'
    WHEN PERCENT_RANK() OVER (ORDER BY lifetime_value) >= 0.50
    THEN '↑ Above median'
    ELSE '↓ Bottom half'
  END                                               AS value_position
FROM customer_ltv
ORDER BY lifetime_value DESC;`}
        height={280}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="PERCENTILE_CONT and PERCENTILE_DISC — True Percentile Values" />

      <P>PERCENT_RANK and CUME_DIST tell you <em>where</em> a row sits in the distribution. PERCENTILE_CONT and PERCENTILE_DISC answer the inverse question: <Hl>what value sits at the Nth percentile</Hl>? These are ordered-set aggregates — they collapse rows like GROUP BY and return a single value representing a specific point in the distribution.</P>

      <CodeBlock
        label="PERCENTILE_CONT vs PERCENTILE_DISC"
        code={`-- PERCENTILE_CONT: continuous interpolation between adjacent values
-- Returns a value that may not exist in the dataset (interpolated)
PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount)
-- If the median falls between 850 and 900, returns 875.0

-- PERCENTILE_DISC: discrete — returns the actual nearest value in the dataset
PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY total_amount)
-- Returns either 850 or 900 (whichever is the actual value at that position)

-- PERCENTILE_CONT is almost always preferred:
-- - Standard mathematical definition of percentile
-- - Returns smooth values for any fraction 0.0–1.0
-- - PERCENTILE_DISC can surprise: P(0.5) of [1,2,3,4] gives 2, not 2.5

-- Use with GROUP BY for per-group percentiles:
SELECT
  store_id,
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount) AS p25,
  PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY total_amount) AS median,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount) AS p75,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total_amount) AS p95
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id;`}
      />

      <SQLPlayground
        initialQuery={`-- Distribution summary: five-number summary + mean per store
SELECT
  store_id,
  COUNT(*)                                                           AS order_count,
  ROUND(MIN(total_amount), 2)                                        AS minimum,
  ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount)::NUMERIC, 2) AS p25,
  ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY total_amount)::NUMERIC, 2) AS median,
  ROUND(AVG(total_amount), 2)                                        AS mean,
  ROUND(PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount)::NUMERIC, 2) AS p75,
  ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total_amount)::NUMERIC, 2) AS p95,
  ROUND(MAX(total_amount), 2)                                        AS maximum,
  -- IQR: spread of the middle 50%
  ROUND((
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount)
    - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount)
  )::NUMERIC, 2)                                                     AS iqr
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY median DESC;`}
        height={265}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Identify outliers using IQR method
-- Outlier = value below Q1 - 1.5*IQR  OR  above Q3 + 1.5*IQR
WITH store_stats AS (
  SELECT
    store_id,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount)::NUMERIC AS q1,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount)::NUMERIC AS q3
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
),
bounds AS (
  SELECT
    store_id,
    q1,
    q3,
    q3 - q1                   AS iqr,
    q1 - 1.5 * (q3 - q1)     AS lower_bound,
    q3 + 1.5 * (q3 - q1)     AS upper_bound
  FROM store_stats
)
SELECT
  o.order_id,
  o.store_id,
  o.total_amount,
  ROUND(b.lower_bound, 2)     AS lower_fence,
  ROUND(b.upper_bound, 2)     AS upper_fence,
  CASE
    WHEN o.total_amount < b.lower_bound THEN '⚠ Low outlier'
    WHEN o.total_amount > b.upper_bound THEN '⚠ High outlier'
    ELSE '✓ Normal'
  END                         AS outlier_status
FROM orders AS o
JOIN bounds AS b ON o.store_id = b.store_id
WHERE o.order_status = 'Delivered'
  AND (o.total_amount < b.lower_bound OR o.total_amount > b.upper_bound)
ORDER BY o.store_id, o.total_amount DESC;`}
        height={300}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Conditional Ranking — Rank Only a Subset" />

      <P>Sometimes you need to rank rows only when they meet a condition — rank only active products, rank only delivered orders, rank employees within their own department. The FILTER clause and CASE expressions extend ranking functions to handle these scenarios cleanly.</P>

      <H>Rank within a filtered subset using a CTE</H>

      <SQLPlayground
        initialQuery={`-- Rank only in-stock products within each category
SELECT product_name, category, unit_price, in_stock, stock_rank
FROM (
  SELECT
    product_name,
    category,
    unit_price,
    in_stock,
    -- Only rank in-stock products — out-of-stock get NULL rank
    CASE WHEN in_stock
      THEN RANK() OVER (
        PARTITION BY category
        ORDER BY unit_price DESC
      )
      ELSE NULL
    END AS stock_rank
  FROM products
) AS ranked
ORDER BY category, stock_rank NULLS LAST, unit_price DESC;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Rank customers within their loyalty tier
-- AND flag if they rank in the top 3 of their tier
WITH customer_spend AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name      AS customer,
    c.loyalty_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS total_spend
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id   = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
)
SELECT
  customer_id,
  customer,
  loyalty_tier,
  total_spend,
  RANK() OVER (
    PARTITION BY loyalty_tier
    ORDER BY total_spend DESC
  )                                          AS tier_rank,
  DENSE_RANK() OVER (
    ORDER BY total_spend DESC
  )                                          AS overall_rank,
  CASE
    WHEN RANK() OVER (PARTITION BY loyalty_tier ORDER BY total_spend DESC) <= 3
    THEN '🥇 Tier top 3'
    ELSE ''
  END                                        AS badge
FROM customer_spend
ORDER BY loyalty_tier, tier_rank;`}
        height={275}
        showSchema={false}
      />

      <H>Rank with a FILTER clause — conditional aggregation inside ranking</H>

      <SQLPlayground
        initialQuery={`-- Rank stores by their DELIVERED revenue (ignoring other statuses)
-- Using a CTE to pre-filter cleanly
WITH delivered_revenue AS (
  SELECT
    store_id,
    ROUND(SUM(total_amount) FILTER (WHERE order_status = 'Delivered'), 2) AS delivered_rev,
    ROUND(SUM(total_amount) FILTER (WHERE order_status = 'Cancelled'), 2) AS cancelled_rev,
    COUNT(*) FILTER (WHERE order_status = 'Delivered')   AS delivered_count,
    COUNT(*) FILTER (WHERE order_status = 'Cancelled')   AS cancelled_count
  FROM orders
  GROUP BY store_id
)
SELECT
  dr.store_id,
  s.city,
  dr.delivered_rev,
  dr.cancelled_rev,
  dr.delivered_count,
  dr.cancelled_count,
  RANK() OVER (ORDER BY dr.delivered_rev DESC NULLS LAST)    AS revenue_rank,
  RANK() OVER (ORDER BY dr.cancelled_count DESC NULLS LAST)  AS cancellation_rank
FROM delivered_revenue AS dr
JOIN stores AS s ON dr.store_id = s.store_id
ORDER BY revenue_rank;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Multi-Level Rankings — Ranking Within Ranking" />

      <P>Production leaderboards often need hierarchy: rank stores within a city, then cities within a region. Or rank products within a category, then rank categories overall. Multi-level rankings use multiple window functions with different PARTITION BY clauses in the same query.</P>

      <SQLPlayground
        initialQuery={`-- Two-level ranking: store rank within city, city rank overall
WITH store_revenue AS (
  SELECT
    o.store_id,
    s.city,
    ROUND(SUM(o.total_amount), 2) AS revenue,
    COUNT(o.order_id)             AS orders
  FROM orders  AS o
  JOIN stores  AS s ON o.store_id = s.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id, s.city
),
city_revenue AS (
  SELECT
    city,
    ROUND(SUM(revenue), 2) AS city_revenue,
    COUNT(*)               AS store_count
  FROM store_revenue
  GROUP BY city
)
SELECT
  sr.store_id,
  sr.city,
  sr.revenue                                       AS store_revenue,
  cr.city_revenue,

  -- Level 1: store rank within its city
  RANK() OVER (
    PARTITION BY sr.city
    ORDER BY sr.revenue DESC
  )                                                AS rank_in_city,

  -- Level 2: city rank overall
  RANK() OVER (
    ORDER BY cr.city_revenue DESC
  )                                                AS city_rank,

  -- Store's revenue as % of city total
  ROUND(sr.revenue / NULLIF(cr.city_revenue, 0) * 100, 1) AS pct_of_city,

  -- Combined label
  'City #' || RANK() OVER (ORDER BY cr.city_revenue DESC)::TEXT
  || ' / Store #' || RANK() OVER (PARTITION BY sr.city ORDER BY sr.revenue DESC)::TEXT
                                                   AS position_label

FROM store_revenue AS sr
JOIN city_revenue  AS cr ON sr.city = cr.city
ORDER BY city_rank, rank_in_city;`}
        height={320}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Three-level product ranking: product → category → overall
WITH product_sales AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    COALESCE(ROUND(SUM(oi.line_total), 2), 0) AS revenue,
    COALESCE(SUM(oi.quantity), 0)             AS units_sold
  FROM products    AS p
  LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
  LEFT JOIN orders      AS o  ON oi.order_id  = o.order_id
    AND o.order_status = 'Delivered'
  GROUP BY p.product_id, p.product_name, p.category
)
SELECT
  product_id,
  product_name,
  category,
  revenue,
  units_sold,
  -- Level 1: product rank within category by revenue
  RANK() OVER (PARTITION BY category ORDER BY revenue DESC)  AS cat_rank,
  -- Level 2: product rank overall
  RANK() OVER (ORDER BY revenue DESC)                        AS overall_rank,
  -- Level 3: category total and rank
  ROUND(SUM(revenue) OVER (PARTITION BY category), 2)        AS category_total,
  RANK() OVER (
    ORDER BY SUM(revenue) OVER (PARTITION BY category) DESC
  )                                                          AS category_rank,
  -- % of category
  ROUND(revenue / NULLIF(SUM(revenue) OVER (PARTITION BY category), 0) * 100, 1)
                                                             AS pct_of_category
FROM product_sales
ORDER BY category_rank, cat_rank;`}
        height={310}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Leaderboard Patterns — Production-Grade Rankings" />

      <P>Production leaderboards need more than a simple RANK() — they need movement indicators (up/down from last period), badges for sustained performance, and handling of new entrants. These patterns combine ranking functions with LAG for previous-period comparison.</P>

      <H>Leaderboard with movement arrows</H>

      <SQLPlayground
        initialQuery={`-- Leaderboard with rank movement (current vs previous period)
WITH jan_revenue AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND EXTRACT(MONTH FROM order_date) = 1
    AND EXTRACT(YEAR  FROM order_date) = 2024
  GROUP BY store_id
),
feb_revenue AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND EXTRACT(MONTH FROM order_date) = 2
    AND EXTRACT(YEAR  FROM order_date) = 2024
  GROUP BY store_id
),
ranked AS (
  SELECT
    COALESCE(f.store_id, j.store_id)              AS store_id,
    COALESCE(f.revenue, 0)                        AS feb_revenue,
    COALESCE(j.revenue, 0)                        AS jan_revenue,
    RANK() OVER (ORDER BY COALESCE(f.revenue, 0) DESC) AS feb_rank,
    RANK() OVER (ORDER BY COALESCE(j.revenue, 0) DESC) AS jan_rank
  FROM feb_revenue AS f
  FULL OUTER JOIN jan_revenue AS j ON f.store_id = j.store_id
)
SELECT
  r.store_id,
  s.city,
  r.feb_revenue,
  r.feb_rank,
  r.jan_rank,
  r.jan_rank - r.feb_rank                         AS rank_change,
  CASE
    WHEN r.jan_rank - r.feb_rank > 0  THEN '▲ ' || (r.jan_rank - r.feb_rank)::TEXT
    WHEN r.jan_rank - r.feb_rank < 0  THEN '▼ ' || ABS(r.jan_rank - r.feb_rank)::TEXT
    ELSE '— Same'
  END                                             AS movement,
  CASE
    WHEN r.feb_rank = 1               THEN '🥇'
    WHEN r.feb_rank = 2               THEN '🥈'
    WHEN r.feb_rank = 3               THEN '🥉'
    ELSE ''
  END                                             AS medal
FROM ranked AS r
JOIN stores AS s ON r.store_id = s.store_id
ORDER BY r.feb_rank;`}
        height={350}
        showSchema={true}
      />

      <H>Sustained performance badge — consistently top-ranked</H>

      <SQLPlayground
        initialQuery={`-- Products that are top-3 in their category by BOTH revenue AND order count
WITH product_metrics AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    COALESCE(ROUND(SUM(oi.line_total), 2), 0)    AS revenue,
    COALESCE(COUNT(DISTINCT oi.order_id), 0)     AS order_count
  FROM products    AS p
  LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
  LEFT JOIN orders      AS o  ON oi.order_id  = o.order_id
    AND o.order_status = 'Delivered'
  GROUP BY p.product_id, p.product_name, p.category
)
SELECT
  product_id,
  product_name,
  category,
  revenue,
  order_count,
  RANK() OVER (PARTITION BY category ORDER BY revenue    DESC) AS rev_rank,
  RANK() OVER (PARTITION BY category ORDER BY order_count DESC) AS cnt_rank,
  CASE
    WHEN RANK() OVER (PARTITION BY category ORDER BY revenue DESC)     <= 3
     AND RANK() OVER (PARTITION BY category ORDER BY order_count DESC) <= 3
    THEN '⭐ Dual top-3'
    WHEN RANK() OVER (PARTITION BY category ORDER BY revenue DESC) <= 3
    THEN '💰 Revenue top-3'
    WHEN RANK() OVER (PARTITION BY category ORDER BY order_count DESC) <= 3
    THEN '📦 Volume top-3'
    ELSE ''
  END                                                           AS badge
FROM product_metrics
WHERE revenue > 0
ORDER BY category,
  RANK() OVER (PARTITION BY category ORDER BY revenue DESC);`}
        height={295}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Percentile-Based Segmentation — Deciles and Quartiles" />

      <P>Percentile-based segmentation divides a continuous distribution into equal-sized groups for analysis. Quartiles (4 groups), deciles (10 groups), and percentiles (100 groups) are standard tools for customer segmentation, product tiering, and performance distribution analysis.</P>

      <SQLPlayground
        initialQuery={`-- Customer segmentation using NTILE quartiles and PERCENT_RANK
WITH customer_ltv AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name       AS customer,
    c.loyalty_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id   = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
  HAVING COALESCE(SUM(o.total_amount), 0) > 0   -- only customers who ordered
)
SELECT
  customer_id,
  customer,
  loyalty_tier,
  lifetime_value,
  -- NTILE quartile (equal-sized buckets by row count)
  NTILE(4) OVER (ORDER BY lifetime_value)        AS quartile,
  CASE NTILE(4) OVER (ORDER BY lifetime_value)
    WHEN 4 THEN 'Q4 — Top 25% spenders'
    WHEN 3 THEN 'Q3 — Upper-mid spenders'
    WHEN 2 THEN 'Q2 — Lower-mid spenders'
    WHEN 1 THEN 'Q1 — Bottom 25% spenders'
  END                                            AS quartile_label,
  -- NTILE decile (equal-sized buckets into 10 groups)
  NTILE(10) OVER (ORDER BY lifetime_value)       AS decile,
  -- PERCENT_RANK (value-based position 0–1)
  ROUND(PERCENT_RANK() OVER (
    ORDER BY lifetime_value
  )::NUMERIC * 100, 1)                           AS percentile_rank
FROM customer_ltv
ORDER BY lifetime_value DESC;`}
        height={295}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Summary statistics per quartile
WITH customer_ltv AS (
  SELECT
    c.customer_id,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id AND o.order_status = 'Delivered'
  GROUP BY c.customer_id
  HAVING COALESCE(SUM(o.total_amount), 0) > 0
),
with_quartile AS (
  SELECT
    customer_id,
    lifetime_value,
    NTILE(4) OVER (ORDER BY lifetime_value) AS quartile
  FROM customer_ltv
)
SELECT
  quartile,
  CASE quartile
    WHEN 4 THEN 'Champions (Q4)'
    WHEN 3 THEN 'High Value (Q3)'
    WHEN 2 THEN 'Mid Value (Q2)'
    WHEN 1 THEN 'Entry (Q1)'
  END                                         AS segment_name,
  COUNT(*)                                    AS customer_count,
  ROUND(MIN(lifetime_value), 2)               AS min_ltv,
  ROUND(AVG(lifetime_value), 2)               AS avg_ltv,
  ROUND(MAX(lifetime_value), 2)               AS max_ltv,
  ROUND(SUM(lifetime_value), 2)               AS total_ltv,
  ROUND(SUM(lifetime_value) / SUM(SUM(lifetime_value)) OVER () * 100, 1) AS pct_of_total_revenue
FROM with_quartile
GROUP BY quartile
ORDER BY quartile DESC;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Ranking for Deduplication — Keep One Row Per Group" />

      <P>ROW_NUMBER is the cleanest way to deduplicate — keep exactly one row per group based on a defined priority. The pattern appears constantly in data engineering: keep the most recent record, keep the highest-value record, keep the first occurrence.</P>

      <SQLPlayground
        initialQuery={`-- Keep only the most recent delivered order per customer
-- (deduplication: one row per customer_id)
SELECT customer_id, order_id, order_date, total_amount, order_status
FROM (
  SELECT
    customer_id,
    order_id,
    order_date,
    total_amount,
    order_status,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY order_date DESC, order_id DESC  -- most recent first
    ) AS rn
  FROM orders
  WHERE order_status = 'Delivered'
) AS ranked
WHERE rn = 1
ORDER BY customer_id;`}
        height={220}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Deduplicate products: keep only the best-selling product per category
-- "Best-selling" = highest total revenue
WITH product_revenue AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.unit_price,
    COALESCE(ROUND(SUM(oi.line_total), 2), 0) AS revenue,
    COALESCE(SUM(oi.quantity), 0)             AS units_sold
  FROM products    AS p
  LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
  LEFT JOIN orders      AS o  ON oi.order_id  = o.order_id
    AND o.order_status = 'Delivered'
  GROUP BY p.product_id, p.product_name, p.category, p.unit_price
)
SELECT category, product_id, product_name, revenue, units_sold
FROM (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY category
      ORDER BY revenue DESC, units_sold DESC
    ) AS rn
  FROM product_revenue
) AS ranked
WHERE rn = 1
ORDER BY revenue DESC;`}
        height={255}
        showSchema={false}
      />

      <ProTip>
        When deduplicating, always add a tiebreaker to the ORDER BY inside ROW_NUMBER. If two rows have the same primary sort value (same order_date, same revenue), the one that gets rn = 1 is non-deterministic without a tiebreaker. Add a unique column (order_id, product_id) as the final ORDER BY key to ensure deterministic, reproducible results across query executions.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data analyst at Amazon. The seller success team runs a monthly seller health report: for each seller, their revenue rank within their category, their overall revenue rank, their percentile position, their quartile segment, and whether they moved up or down compared to the previous month. The ranking logic alone would take multiple queries without window functions — with them, it is one SELECT on two pre-aggregated CTEs.</P>

      <TimeBlock time="2:00 PM" label="Requirements: seller health report with 6 ranking metrics">
        Category rank, overall rank, percentile, quartile, MoM rank movement, performance badge. Adapted for FreshCart stores.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Complete seller / store health ranking report
WITH
-- Period 1: January revenue per store
jan AS (
  SELECT
    o.store_id,
    s.city,
    ROUND(SUM(o.total_amount), 2)  AS revenue,
    COUNT(o.order_id)              AS orders
  FROM orders AS o
  JOIN stores AS s ON o.store_id = s.store_id
  WHERE o.order_status = 'Delivered'
    AND EXTRACT(MONTH FROM o.order_date) = 1
    AND EXTRACT(YEAR  FROM o.order_date) = 2024
  GROUP BY o.store_id, s.city
),
-- Period 2: February revenue per store
feb AS (
  SELECT
    o.store_id,
    ROUND(SUM(o.total_amount), 2)  AS revenue,
    COUNT(o.order_id)              AS orders
  FROM orders AS o
  WHERE o.order_status = 'Delivered'
    AND EXTRACT(MONTH FROM o.order_date) = 2
    AND EXTRACT(YEAR  FROM o.order_date) = 2024
  GROUP BY o.store_id
),
-- Combine with all ranking metrics
combined AS (
  SELECT
    j.store_id,
    j.city,
    COALESCE(f.revenue, 0)                          AS feb_revenue,
    COALESCE(j.revenue, 0)                          AS jan_revenue,
    COALESCE(f.orders, 0)                           AS feb_orders
  FROM jan AS j
  LEFT JOIN feb AS f ON j.store_id = f.store_id
)
SELECT
  store_id,
  city,
  feb_revenue,
  jan_revenue,
  feb_orders,
  -- Absolute rank (February)
  RANK() OVER (ORDER BY feb_revenue DESC)              AS feb_rank,
  -- Previous rank (January)
  RANK() OVER (ORDER BY jan_revenue DESC)              AS jan_rank,
  -- Rank movement: positive = improved
  RANK() OVER (ORDER BY jan_revenue DESC)
    - RANK() OVER (ORDER BY feb_revenue DESC)          AS rank_change,
  -- Percentile position
  ROUND(PERCENT_RANK() OVER (
    ORDER BY feb_revenue
  )::NUMERIC * 100, 1)                                AS percentile,
  -- Quartile segment
  NTILE(4) OVER (ORDER BY feb_revenue)                AS quartile,
  -- MoM revenue growth
  ROUND(
    (feb_revenue - jan_revenue) / NULLIF(jan_revenue, 0) * 100
  , 1)                                                AS mom_growth_pct,
  -- Performance badge
  CASE
    WHEN RANK() OVER (ORDER BY feb_revenue DESC) = 1
    THEN '🥇 #1 Store'
    WHEN NTILE(4) OVER (ORDER BY feb_revenue) = 4
      AND RANK() OVER (ORDER BY jan_revenue DESC)
        - RANK() OVER (ORDER BY feb_revenue DESC) > 0
    THEN '⭐ Rising top quarter'
    WHEN NTILE(4) OVER (ORDER BY feb_revenue) = 4
    THEN '✅ Top quarter'
    WHEN NTILE(4) OVER (ORDER BY feb_revenue) = 1
    THEN '⚠ Needs attention'
    ELSE '— On track'
  END                                                 AS badge
FROM combined
ORDER BY feb_rank;`}
        height={420}
        showSchema={true}
      />

      <TimeBlock time="3:15 PM" label="Complete ranking report — delivered in 75 minutes">
        Six ranking metrics computed in a single SELECT over two CTEs. The seller success team has a complete, sortable report with movement arrows, percentile positions, and performance badges. Adding a seventh metric — say, a city-level rank — requires one more window function expression, not a new query.
      </TimeBlock>

      <ProTip>
        When building leaderboard reports, always compute rankings in a CTE layer rather than in the final SELECT. This avoids repeating the same RANK() OVER (...) expression multiple times (for the badge CASE and for display). Extract ranks into a CTE with columns rank_jan and rank_feb, then reference those columns in the final SELECT for comparisons and badges. The query runs faster (each OVER() is computed once) and is easier to read.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between PERCENT_RANK and CUME_DIST?">
        <p style={{ margin: '0 0 14px' }}>Both express a row's position in the distribution as a fraction between 0 and 1, but they compute different things. PERCENT_RANK answers "what fraction of rows rank strictly below this row?" It is computed as (rank - 1) / (total_rows - 1). The lowest value always gets 0.0 (zero rows rank below it) and the highest always gets 1.0. Tied rows get the same PERCENT_RANK value. If two rows share the minimum value, both get PERCENT_RANK = 0.0.</p>
        <p style={{ margin: '0 0 14px' }}>CUME_DIST answers "what fraction of rows have a value less than or equal to this row's value?" It is computed as rows_with_value_leq_current / total_rows. CUME_DIST is always greater than zero — even the lowest-value rows have themselves counted, so the minimum is 1/total_rows. For the highest value, CUME_DIST = 1.0. All rows sharing the same value get the same CUME_DIST value, and it includes themselves in the count.</p>
        <p style={{ margin: 0 }}>Practical implication: PERCENT_RANK is better for "is this row in the top X%?" comparisons — WHERE PERCENT_RANK() OVER (...) &gt;= 0.8 finds the top 20% cleanly. CUME_DIST is useful when you want to know what proportion of the population has a value at or below a specific point — for example, "what fraction of orders are at or below ₹500?" Both are window functions requiring OVER() with ORDER BY — unlike PERCENTILE_CONT and PERCENTILE_DISC which are ordered-set aggregates that collapse rows like GROUP BY.</p>
      </IQ>

      <IQ q="When would you use NTILE vs PERCENT_RANK for segmentation?">
        <p style={{ margin: '0 0 14px' }}>NTILE(n) divides rows into exactly n buckets with approximately equal row counts — it is a row-count-based division. NTILE(4) assigns each row to quartile 1, 2, 3, or 4, where each quartile contains roughly 25% of the rows. The bucket assignment depends on row position, not value — two rows with very different values could both be in quartile 3 if they are adjacent in the ordered sequence.</p>
        <p style={{ margin: '0 0 14px' }}>PERCENT_RANK is value-based — it computes the row's fractional rank relative to the distribution of values. Filtering WHERE PERCENT_RANK() OVER (...) &gt;= 0.75 finds the top 25% by value, not by count. If the top 5% of customers account for 60% of revenue (a right-skewed distribution), NTILE splits 25% of customers per bucket regardless of value distribution, while PERCENT_RANK &gt;= 0.75 identifies customers whose spend puts them in the top 25% by value rank.</p>
        <p style={{ margin: 0 }}>Choose NTILE for equal-count segments — marketing campaigns that need to reach exactly 25% of the customer base per segment, A/B test splits where equal group sizes matter. Choose PERCENT_RANK for value-based thresholds — "find customers above the 75th percentile of spending", "identify products in the bottom 10% of revenue", "classify orders by where they fall in the distribution". NTILE can produce unintuitive results when the data is skewed — a product that just barely makes the top quartile may be far below the actual 75th percentile value if most revenue is concentrated in the top few products. For business reporting where "top 25%" means value-based, PERCENT_RANK is more meaningful.</p>
      </IQ>

      <IQ q="How do you handle ties when ranking for deduplication?">
        <p style={{ margin: '0 0 14px' }}>When using ROW_NUMBER for deduplication (keeping exactly one row per group), ties in the ORDER BY column create non-deterministic behaviour — the database may assign rn = 1 to any of the tied rows, and the choice may change between query executions or database versions. This is a correctness problem: the same query run twice could return different rows, making results unreproducible.</p>
        <p style={{ margin: '0 0 14px' }}>The solution is always to add a tiebreaker column as the final ORDER BY key — a column that is guaranteed unique within the partition, typically the primary key. ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC) — if two orders have the same order_date, the one with the higher order_id gets rn = 1. This ensures deterministic, reproducible results regardless of physical row order or internal optimiser decisions.</p>
        <p style={{ margin: 0 }}>The tiebreaker column choice matters semantically: order_id DESC for the most recently inserted duplicate, created_at ASC for the original/oldest record. Document the tiebreaker logic — when someone asks "which record do you keep when there are duplicates?", the ORDER BY clause inside ROW_NUMBER should have a clear, business-meaningful answer. For RANK and DENSE_RANK (which are designed to express ties), no tiebreaker is needed — tied rows intentionally share the same rank. Only ROW_NUMBER requires a tiebreaker because its contract is to produce unique sequential integers.</p>
      </IQ>

      <IQ q="What is the difference between PERCENTILE_CONT and PERCENTILE_DISC?">
        <p style={{ margin: '0 0 14px' }}>Both compute the value at a specified percentile of a distribution, but they use different methods for non-integer positions. PERCENTILE_CONT uses linear interpolation — when the percentile falls between two actual data values, it returns the weighted average of those two values. PERCENTILE_DISC returns the nearest actual value in the dataset — no interpolation.</p>
        <p style={{ margin: '0 0 14px' }}>For the median (50th percentile) of [100, 200, 300, 400]: PERCENTILE_CONT(0.5) returns 250 (the midpoint of 200 and 300, interpolated). PERCENTILE_DISC(0.5) returns 200 or 300 (the actual data value nearest the 50th percentile position). For an odd number of values like [100, 200, 300]: both would return 200 since 200 is exactly at the 50th percentile.</p>
        <p style={{ margin: 0 }}>Choose PERCENTILE_CONT for statistical analysis where mathematical precision matters — it follows the standard definition of percentile that most statisticians and data scientists expect. Choose PERCENTILE_DISC when you need the result to be an actual value from the dataset — for example, when selecting the median salary to identify a specific employee as the median earner. These are ordered-set aggregates (unlike the window function PERCENT_RANK) — they use WITHIN GROUP (ORDER BY column) syntax and collapse rows like GROUP BY. They do not have OVER() — they are called like standard aggregate functions: SELECT store_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median FROM orders GROUP BY store_id.</p>
      </IQ>

      <IQ q="How would you build a leaderboard that shows rank movement from the previous period?">
        <p style={{ margin: '0 0 14px' }}>The pattern requires computing ranks for two time periods independently, then comparing them. Use two CTEs — one per period — each aggregating the relevant metric (revenue, order count, score) per entity. Then a final SELECT joins the two CTEs and applies RANK() to each period's metric with separate OVER() clauses. The rank movement is the previous period rank minus the current period rank — positive means improved (moved up), negative means declined (moved down), zero means unchanged.</p>
        <p style={{ margin: '0 0 14px' }}>Implementation: WITH current_period AS (SELECT entity_id, SUM(metric) AS score FROM ... WHERE date IN current_range GROUP BY entity_id), previous_period AS (SELECT entity_id, SUM(metric) AS score FROM ... WHERE date IN previous_range GROUP BY entity_id), combined AS (SELECT COALESCE(c.entity_id, p.entity_id) AS entity_id, COALESCE(c.score, 0) AS current_score, COALESCE(p.score, 0) AS prev_score FROM current_period c FULL OUTER JOIN previous_period p ON c.entity_id = p.entity_id) SELECT *, RANK() OVER (ORDER BY current_score DESC) AS current_rank, RANK() OVER (ORDER BY prev_score DESC) AS prev_rank, RANK() OVER (ORDER BY prev_score DESC) - RANK() OVER (ORDER BY current_score DESC) AS rank_change FROM combined.</p>
        <p style={{ margin: 0 }}>Two important details: use FULL OUTER JOIN between periods to include entities that appear in one period but not the other (new entrants have no previous rank; churned entities have no current rank). Use COALESCE(score, 0) so new entrants get rank assigned based on zero score rather than being excluded. For the movement indicator display, convert rank_change to a symbol: CASE WHEN rank_change &gt; 0 THEN '▲ ' || rank_change WHEN rank_change &lt; 0 THEN '▼ ' || ABS(rank_change) ELSE '—' END. For entities that did not exist in the previous period, show 'NEW' instead of a movement arrow. The FULL OUTER JOIN naturally handles this — entities with no previous record have prev_rank based on zero score.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="PERCENT_RANK returns 0.0 for all rows — expected a spread of values"
        cause="The OVER() clause is missing ORDER BY or has an ORDER BY with all identical values. PERCENT_RANK requires ORDER BY to define the ranking — without it, all rows are considered tied at the same rank, making (rank - 1) / (total - 1) = 0 for all rows. Alternatively, all rows genuinely have the same value in the ORDER BY column, making all ranks equal."
        fix="Add ORDER BY to the OVER clause: PERCENT_RANK() OVER (ORDER BY total_amount). Verify that the ORDER BY column has distinct values — check SELECT COUNT(DISTINCT total_amount) FROM table. If all values truly are identical, PERCENT_RANK correctly returns 0.0 for all rows (all tied at rank 1). If ORDER BY is present and values vary but PERCENT_RANK still shows 0.0, check if PARTITION BY has created single-row partitions — a partition of one row always has PERCENT_RANK = 0.0."
      />

      <Err
        msg="NTILE produces unequal bucket sizes — expected exactly 25% per quartile"
        cause="NTILE distributes rows as evenly as possible, but when total rows is not evenly divisible by n, some buckets get one extra row. NTILE(4) on 10 rows produces buckets of sizes 3, 3, 2, 2 — not all size 2 or 3. This is correct behaviour — NTILE makes no guarantee of exact equal sizes, only approximately equal sizes."
        fix="This is expected and correct — document it to stakeholders. The standard definition of NTILE distributes the remainder rows to the first buckets. To get exact equal-count segments regardless of remainder, use PERCENT_RANK for value-based thresholds instead: WHERE PERCENT_RANK() OVER (ORDER BY col) >= 0.75 for the top 25%. This is value-based (not row-count-based) but conceptually matches what most people mean by 'top quartile'. If exact row counts per bucket are required, calculate the target rows per bucket (FLOOR(COUNT(*) / n)) and use ROW_NUMBER with arithmetic to assign buckets manually."
      />

      <Err
        msg="ROW_NUMBER deduplication returns different rows on different executions — non-deterministic"
        cause="The ORDER BY inside ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) has ties — multiple rows share the same ORDER BY value. When two rows have identical sort values, the database can assign either one as rn = 1, and this choice may differ between executions, server restarts, or after updates to table statistics. The result is non-deterministic deduplication."
        fix="Add a unique column as the final tiebreaker in the ORDER BY: ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC). The order_id is unique, so no two rows will have identical (order_date, order_id) combinations. The tiebreaker guarantees deterministic assignment — the row with the highest order_id among those with the same order_date always gets rn = 1. Document which tiebreaker was chosen and why — it represents a business decision about which duplicate to keep."
      />

      <Err
        msg="PERCENTILE_CONT syntax error — cannot use OVER() with WITHIN GROUP"
        cause="PERCENTILE_CONT and PERCENTILE_DISC are ordered-set aggregate functions, not window functions. They use a completely different syntax: PERCENTILE_CONT(fraction) WITHIN GROUP (ORDER BY column). Attempting to add OVER() to them (PERCENTILE_CONT(0.5) OVER (PARTITION BY ...)) is a syntax error — they do not support the window function OVER() clause."
        fix="Use the correct ordered-set aggregate syntax with GROUP BY for per-group percentiles: SELECT store_id, PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median FROM orders GROUP BY store_id. For a per-row percentile rank (window function equivalent), use PERCENT_RANK() OVER (ORDER BY col) instead — this is the window function version that works with OVER() and PARTITION BY. The two serve different purposes: PERCENTILE_CONT returns the VALUE at a percentile; PERCENT_RANK returns the RANK of a row as a fraction."
      />

      <Err
        msg="Multi-level ranking produces wrong results — inner rank affected by outer partition"
        cause="When computing ranks at multiple levels (store rank within city AND city rank overall), using a single PARTITION BY that mixes both levels can produce incorrect results. For example, RANK() OVER (PARTITION BY city ORDER BY city_total_revenue DESC) when applied to a row-level table assigns ranks based on repeated city_total_revenue values — every store in the same city gets city_total_revenue rank = 1 because they all share the same value."
        fix="Compute each ranking level independently in its own CTE. CTE 1: aggregate to store level and compute store_rank OVER (PARTITION BY city ORDER BY store_revenue DESC). CTE 2: aggregate to city level and compute city_rank OVER (ORDER BY city_revenue DESC). CTE 3: join the two CTEs to produce the combined result. Never attempt to compute city-level ranks in a query that still has store-level granularity — the duplicate city values in every store row will produce incorrect rank assignments."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Build a comprehensive product ranking report using multiple ranking functions. The report should show for each product: product_id, product_name, category, unit_price, margin_pct (rounded to 1dp), total revenue from delivered orders (0 if none), times_ordered (distinct order count), and the following rankings: (1) price_rank — RANK by unit_price DESC within category, (2) revenue_rank — RANK by total revenue DESC within category, (3) overall_revenue_rank — DENSE_RANK by total revenue DESC across all products, (4) revenue_percentile — PERCENT_RANK by revenue across all products (as a 0–100 value rounded to 1dp), (5) revenue_quartile — NTILE(4) by revenue across all products (Q4 = highest), (6) a performance_tier: 'Elite' if both price_rank and revenue_rank are <= 2, 'Revenue Leader' if revenue_rank = 1, 'Premium Priced' if price_rank = 1, 'Standard' otherwise. Sort by category then revenue_rank."
        hint="CTE for product sales (LEFT JOIN products to order_items+orders). Then window functions in the outer SELECT. PERCENT_RANK needs ::NUMERIC cast and * 100. CASE checks both price_rank and revenue_rank — compute them in an inner query first so you can reference them in the CASE."
        answer={`WITH product_sales AS (
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.unit_price,
    p.cost_price,
    ROUND((p.unit_price - p.cost_price)
      / NULLIF(p.unit_price, 0) * 100, 1)          AS margin_pct,
    COALESCE(ROUND(SUM(oi.line_total), 2), 0)       AS total_revenue,
    COALESCE(COUNT(DISTINCT oi.order_id), 0)        AS times_ordered
  FROM products    AS p
  LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
  LEFT JOIN orders      AS o  ON oi.order_id  = o.order_id
    AND o.order_status = 'Delivered'
  GROUP BY p.product_id, p.product_name, p.category,
           p.unit_price, p.cost_price
),
ranked AS (
  SELECT
    product_id,
    product_name,
    category,
    unit_price,
    margin_pct,
    total_revenue,
    times_ordered,
    -- Within-category rankings
    RANK() OVER (
      PARTITION BY category
      ORDER BY unit_price DESC
    )                                               AS price_rank,
    RANK() OVER (
      PARTITION BY category
      ORDER BY total_revenue DESC
    )                                               AS revenue_rank,
    -- Overall rankings
    DENSE_RANK() OVER (
      ORDER BY total_revenue DESC
    )                                               AS overall_revenue_rank,
    ROUND(PERCENT_RANK() OVER (
      ORDER BY total_revenue
    )::NUMERIC * 100, 1)                            AS revenue_percentile,
    NTILE(4) OVER (
      ORDER BY total_revenue
    )                                               AS revenue_quartile
  FROM product_sales
)
SELECT
  product_id,
  product_name,
  category,
  unit_price,
  margin_pct,
  total_revenue,
  times_ordered,
  price_rank,
  revenue_rank,
  overall_revenue_rank,
  revenue_percentile,
  revenue_quartile,
  CASE
    WHEN price_rank <= 2 AND revenue_rank <= 2 THEN 'Elite'
    WHEN revenue_rank = 1                      THEN 'Revenue Leader'
    WHEN price_rank  = 1                       THEN 'Premium Priced'
    ELSE 'Standard'
  END                                             AS performance_tier
FROM ranked
ORDER BY category, revenue_rank;`}
        explanation="The query uses a two-CTE pattern. product_sales pre-aggregates sales data — LEFT JOIN ensures all products appear even if they have no orders. ranked computes all five window functions in one place, making them available as named columns for the final CASE statement. This avoids repeating RANK() OVER (...) expressions inside the CASE (which would force the database to compute them multiple times). price_rank and revenue_rank use PARTITION BY category so each product is ranked relative to its own category peers. overall_revenue_rank uses DENSE_RANK (not RANK) globally — DENSE_RANK means no gaps after ties, producing a clean leaderboard numbering. revenue_percentile uses PERCENT_RANK() with ::NUMERIC cast before * 100 to prevent integer arithmetic. NTILE(4) assigns quartile 4 to the top-revenue products (highest value = highest bucket when ORDER BY is ascending). The performance_tier CASE checks price_rank and revenue_rank from the ranked CTE — 'Elite' requires both to be <= 2 within the category, checked first so an elite product is not incorrectly labelled 'Revenue Leader'."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'PERCENT_RANK: fractional rank from 0.0 (lowest) to 1.0 (highest) — fraction of rows ranking strictly below. Formula: (rank - 1) / (total_rows - 1). Use WHERE PERCENT_RANK() >= 0.8 to find top 20%.',
          'CUME_DIST: cumulative distribution — fraction of rows with value ≤ current row. Always > 0, up to 1.0. Differs from PERCENT_RANK by including the current row in the count.',
          'PERCENTILE_CONT(f) WITHIN GROUP (ORDER BY col): returns the interpolated value at fraction f of the distribution. Uses GROUP BY syntax, not OVER(). PERCENTILE_DISC returns the nearest actual value from the dataset.',
          'NTILE(n): equal-count buckets. When rows do not divide evenly by n, early buckets get one extra row. Use for equal-sized segments; use PERCENT_RANK for value-based thresholds.',
          'Conditional ranking: wrap the window function in a CASE — return the rank when the condition is true, NULL otherwise. Or pre-filter in a CTE and apply the ranking to the filtered subset.',
          'Multi-level rankings (store within city, city overall) must be computed in separate CTE layers at their respective granularities. Never compute city-level ranks in a store-level query — duplicate values produce incorrect rank assignments.',
          'ROW_NUMBER deduplication: always add a unique tiebreaker column as the final ORDER BY key. Without a tiebreaker, ties produce non-deterministic assignment of rn = 1 — different rows may be kept on different executions.',
          'Leaderboard with movement: FULL OUTER JOIN two period CTEs, compute RANK() OVER (...) on each period\'s metric independently, subtract to get rank_change. Positive = improved, negative = declined.',
          'Pre-compute ranks in a CTE when the same RANK() expression appears in multiple CASE branches — the CTE computes it once, the outer SELECT references the named column without repeated computation.',
          'PERCENT_RANK and CUME_DIST require ORDER BY in OVER(). PERCENTILE_CONT and PERCENTILE_DISC use WITHIN GROUP (ORDER BY) and are aggregate functions — no OVER() clause.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 53</strong>, you learn Analytics with LAG and LEAD — every period-over-period pattern, retention analysis, funnel drop-off, session gap detection, and time-series analytics built on offset window functions.
        </p>
        <Link href="/learn/sql/analytics-lag-lead" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 53 → Analytics with LAG and LEAD
        </Link>
      </div>

    </LearnLayout>
  );
}