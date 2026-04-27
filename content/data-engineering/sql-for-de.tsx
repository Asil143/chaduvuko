import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'SQL for Data Engineers — Beyond the Basics — Data Engineering | Chaduvuko',
  description:
    'Window functions, complex CTEs, deduplication patterns, NULL handling, SCD in SQL, performance optimisation, and the advanced queries every DE interview actually tests.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

export default function SQLForDEModule() {
  return (
    <LearnLayout
      title="SQL for Data Engineers — Beyond the Basics"
      description="Window functions, CTEs, deduplication, NULL handling, and the queries every interview tests."
      section="Data Engineering"
      readTime="80 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — This Is Not Basic SQL ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What DE SQL Actually Looks Like" />
        <SectionTitle>The SQL a Data Engineer Writes Is Not the SQL You Learned First</SectionTitle>

        <Para>
          Basic SQL — SELECT, WHERE, GROUP BY, JOINs — gets you far enough to query
          a database. It does not get you far enough to build the transformation layer
          of a production data platform. The SQL a data engineer writes daily is
          different in kind, not just complexity.
        </Para>

        <Para>
          A data engineer's SQL calculates running totals and moving averages without
          self-joins. It deduplicates millions of rows in a single pass using ranking
          functions. It tracks slowly changing dimensions across historical snapshots.
          It handles NULL in ways that prevent silent aggregation errors. It is written
          as modular, testable CTEs rather than nested subqueries. And it is written
          with query performance in mind — because a query that takes 4 minutes instead
          of 4 seconds is a pipeline SLA violation.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Eight skills this module builds
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Window functions', desc: 'RANK, ROW_NUMBER, LAG, LEAD, running totals, moving averages.' },
              { num: '02', name: 'CTEs', desc: 'Modular, readable, testable query structure using WITH clauses.' },
              { num: '03', name: 'Deduplication', desc: 'Row-level dedup using ROW_NUMBER and QUALIFY.' },
              { num: '04', name: 'NULL handling', desc: 'COALESCE, NULLIF, three-valued logic, and NULL in aggregations.' },
              { num: '05', name: 'Set operations', desc: 'UNION, INTERSECT, EXCEPT — when to use each.' },
              { num: '06', name: 'SCD in SQL', desc: 'Implementing Slowly Changing Dimensions Type 1 and 2 in SQL.' },
              { num: '07', name: 'Date/time SQL', desc: 'Date arithmetic, truncation, timezone conversion across warehouses.' },
              { num: '08', name: 'Query optimisation', desc: 'Reading query plans, index usage, partition pruning.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          <strong>All examples use FreshCart data</strong> — our fictional grocery chain
          with 10 stores across India. You will see the same tables throughout:
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> silver.orders</code>,{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>silver.customers</code>,{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>silver.stores</code>.
          SQL dialect is standard PostgreSQL / Snowflake compatible unless noted.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Window Functions ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Window Functions" />
        <SectionTitle>Window Functions — The Most Powerful SQL Feature You Must Know</SectionTitle>

        <Para>
          Window functions perform calculations across a set of rows that are related
          to the current row — without collapsing those rows into a single group the
          way GROUP BY does. They are the feature that separates junior SQL writers
          from senior ones, and they appear in virtually every data engineering
          interview.
        </Para>

        <Para>
          The fundamental structure is:{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            function() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE BETWEEN ...)
          </code>. The OVER clause is what makes it a window function rather than a
          regular aggregation. Breaking down each part:
        </Para>

        <CodeBox label="Window function anatomy — every clause explained">{`SELECT
    order_id,
    store_id,
    order_amount,

    -- The window function:
    SUM(order_amount) OVER (
        PARTITION BY store_id          -- divide rows into groups by store
                                       -- calculations are independent per partition
        ORDER BY order_date            -- within each partition, sort by date
        ROWS BETWEEN                   -- define the "window" of rows to include
            UNBOUNDED PRECEDING        -- from the first row of the partition
            AND CURRENT ROW            -- to the current row
    ) AS running_total_by_store

FROM silver.orders;

-- PARTITION BY is optional — omit it to treat all rows as one partition:
SUM(order_amount) OVER (ORDER BY order_date) AS running_total_all_stores

-- ORDER BY inside OVER is optional — omit it for unordered aggregations:
SUM(order_amount) OVER (PARTITION BY store_id) AS store_total
-- this gives every row the store's total — same as a correlated subquery but much faster

-- The frame clause (ROWS/RANGE BETWEEN) is optional:
-- Default with ORDER BY: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
-- Default without ORDER BY: ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`}</CodeBox>

        <SubTitle>Ranking functions — ROW_NUMBER, RANK, DENSE_RANK</SubTitle>

        <CodeBox label="Ranking functions — differences and when to use each">{`SELECT
    order_id,
    store_id,
    order_amount,

    -- ROW_NUMBER: sequential unique number within partition
    -- No ties — every row gets a unique number
    ROW_NUMBER() OVER (
        PARTITION BY store_id
        ORDER BY order_amount DESC
    ) AS row_num,

    -- RANK: tied rows get the same rank, then skips numbers
    -- Scores: 100, 100, 80 → ranks: 1, 1, 3
    RANK() OVER (
        PARTITION BY store_id
        ORDER BY order_amount DESC
    ) AS rank_with_gaps,

    -- DENSE_RANK: tied rows get the same rank, no skipping
    -- Scores: 100, 100, 80 → ranks: 1, 1, 2
    DENSE_RANK() OVER (
        PARTITION BY store_id
        ORDER BY order_amount DESC
    ) AS rank_no_gaps

FROM silver.orders
WHERE order_date = '2026-03-17';

-- REAL USE CASE: get the top 3 orders per store
WITH ranked AS (
    SELECT
        order_id,
        store_id,
        order_amount,
        ROW_NUMBER() OVER (
            PARTITION BY store_id
            ORDER BY order_amount DESC
        ) AS rn
    FROM silver.orders
    WHERE order_date = '2026-03-17'
)
SELECT order_id, store_id, order_amount
FROM ranked
WHERE rn <= 3;   -- keep only top 3 per store

-- WHY ROW_NUMBER FOR DEDUP vs RANK:
-- ROW_NUMBER guarantees one row per group even when values tie
-- RANK may return 2 rows when two rows tie for position 1
-- For deduplication, always use ROW_NUMBER`}</CodeBox>

        <SubTitle>LAG and LEAD — comparing current row to previous or next</SubTitle>

        <CodeBox label="LAG and LEAD — row-to-row comparisons without self-joins">{`-- LAG: access the value from a previous row in the partition
-- LEAD: access the value from a following row in the partition

SELECT
    store_id,
    order_date,
    daily_revenue,

    -- Yesterday's revenue for this store
    LAG(daily_revenue, 1, 0) OVER (
        PARTITION BY store_id
        ORDER BY order_date
    ) AS prev_day_revenue,
    -- Args: (column, offset, default_if_null)
    -- offset=1 means one row back; default=0 when no previous row exists

    -- Day-over-day change
    daily_revenue - LAG(daily_revenue, 1, 0) OVER (
        PARTITION BY store_id
        ORDER BY order_date
    ) AS day_over_day_change,

    -- Day-over-day % change (careful with division — LAG can be 0)
    CASE
        WHEN LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) IS NULL
          OR LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) = 0
        THEN NULL
        ELSE ROUND(
            (daily_revenue - LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date))
            / LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) * 100,
            2
        )
    END AS pct_change,

    -- Tomorrow's revenue (from the future row's perspective)
    LEAD(daily_revenue, 1) OVER (
        PARTITION BY store_id
        ORDER BY order_date
    ) AS next_day_revenue

FROM gold.daily_store_revenue
WHERE order_date BETWEEN '2026-03-01' AND '2026-03-17'
ORDER BY store_id, order_date;


-- REAL DE USE CASE: detect gaps in daily data
-- Find dates where a store had no data (gap detection)
WITH store_dates AS (
    SELECT
        store_id,
        order_date,
        LEAD(order_date) OVER (PARTITION BY store_id ORDER BY order_date) AS next_date
    FROM gold.daily_store_revenue
)
SELECT store_id, order_date, next_date,
       next_date - order_date - 1 AS missing_days
FROM store_dates
WHERE next_date - order_date > 1   -- gap of more than 1 day
ORDER BY missing_days DESC;`}</CodeBox>

        <SubTitle>Running totals and moving averages</SubTitle>

        <CodeBox label="Running totals and moving averages — frame clauses in depth">{`SELECT
    store_id,
    order_date,
    daily_revenue,

    -- Running total (cumulative sum from start of partition to current row)
    SUM(daily_revenue) OVER (
        PARTITION BY store_id
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue,

    -- 7-day moving average (last 7 days including today)
    AVG(daily_revenue) OVER (
        PARTITION BY store_id
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d,

    -- 7-day moving sum
    SUM(daily_revenue) OVER (
        PARTITION BY store_id
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7d_sum,

    -- Month-to-date total (from first day of current month to today)
    SUM(daily_revenue) OVER (
        PARTITION BY store_id, DATE_TRUNC('month', order_date)
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS mtd_revenue,

    -- Percentage of store's total monthly revenue
    daily_revenue / SUM(daily_revenue) OVER (
        PARTITION BY store_id, DATE_TRUNC('month', order_date)
    ) * 100 AS pct_of_monthly_total

FROM gold.daily_store_revenue
ORDER BY store_id, order_date;


-- ROWS vs RANGE — an important distinction:
--
-- ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
--   → exactly 6 rows before current row, regardless of value gaps
--   → correct for "last 7 rows"
--
-- RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
--   → all rows within the last 6 days by value (calendar days)
--   → correct for "last 7 calendar days" even if some days have no data
--   → only works when ORDER BY column is DATE or TIMESTAMP
--
-- For moving averages over time series with gaps, RANGE is more correct.
-- For moving averages over sequences of rows, ROWS is more correct.`}</CodeBox>

        <SubTitle>NTILE and PERCENT_RANK — distribution functions</SubTitle>

        <CodeBox label="NTILE and PERCENT_RANK — bucket and percentile calculations">{`SELECT
    customer_id,
    total_spend_ytd,

    -- NTILE(n): divide rows into n equal-sized buckets
    -- Useful for quartile/decile segmentation
    NTILE(4) OVER (ORDER BY total_spend_ytd DESC) AS spend_quartile,
    -- 1 = top 25%, 2 = next 25%, 3 = next 25%, 4 = bottom 25%

    NTILE(10) OVER (ORDER BY total_spend_ytd DESC) AS spend_decile,
    -- 1 = top 10%, ..., 10 = bottom 10%

    -- PERCENT_RANK: what percentile is this row in? (0.0 to 1.0)
    ROUND(PERCENT_RANK() OVER (ORDER BY total_spend_ytd) * 100, 1)
        AS percentile_rank,

    -- CUME_DIST: cumulative distribution (fraction of rows <= current)
    ROUND(CUME_DIST() OVER (ORDER BY total_spend_ytd) * 100, 1)
        AS cumulative_pct

FROM silver.customer_annual_stats
ORDER BY total_spend_ytd DESC;

-- REAL USE CASE: customer segmentation for marketing
SELECT
    customer_id,
    total_orders,
    total_spend_ytd,
    CASE NTILE(5) OVER (ORDER BY total_spend_ytd DESC)
        WHEN 1 THEN 'Platinum'   -- top 20%
        WHEN 2 THEN 'Gold'       -- next 20%
        WHEN 3 THEN 'Silver'     -- next 20%
        WHEN 4 THEN 'Bronze'     -- next 20%
        WHEN 5 THEN 'Standard'   -- bottom 20%
    END AS customer_tier
FROM silver.customer_annual_stats;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — CTEs ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — CTEs" />
        <SectionTitle>Common Table Expressions — The Foundation of Readable SQL</SectionTitle>

        <Para>
          A CTE (Common Table Expression) is a named temporary result set defined
          within a query using the WITH clause. CTEs transform a single deeply-nested
          subquery mess into a series of named, readable, independently-understandable
          steps. They are how data engineers write SQL that other engineers can
          review, debug, and modify.
        </Para>

        <Para>
          In dbt, every model is essentially a CTE chain — each model builds on the
          previous one, with each CTE representing one logical transformation step.
          The ability to write clear, modular CTEs is the most important SQL skill
          for a data engineer.
        </Para>

        <CodeBox label="CTE structure — the right way to organise complex SQL">{`-- BAD: nested subquery — unreadable, hard to debug, impossible to test steps
SELECT
    s.store_name,
    ranked.daily_revenue,
    ranked.revenue_rank
FROM (
    SELECT
        store_id,
        SUM(order_amount) AS daily_revenue,
        RANK() OVER (ORDER BY SUM(order_amount) DESC) AS revenue_rank
    FROM (
        SELECT order_id, store_id, order_amount
        FROM silver.orders
        WHERE order_date = '2026-03-17'
          AND status = 'delivered'
    ) filtered
    GROUP BY store_id
) ranked
JOIN silver.stores s ON ranked.store_id = s.store_id
WHERE ranked.revenue_rank <= 5;


-- GOOD: CTE chain — each step is named, readable, testable independently
WITH
-- Step 1: filter to the orders we care about
delivered_orders AS (
    SELECT order_id, store_id, order_amount
    FROM silver.orders
    WHERE order_date = '2026-03-17'
      AND status    = 'delivered'
),

-- Step 2: aggregate by store
store_revenue AS (
    SELECT
        store_id,
        SUM(order_amount) AS daily_revenue,
        COUNT(*)          AS order_count
    FROM delivered_orders
    GROUP BY store_id
),

-- Step 3: rank stores by revenue
ranked_stores AS (
    SELECT
        store_id,
        daily_revenue,
        order_count,
        RANK() OVER (ORDER BY daily_revenue DESC) AS revenue_rank
    FROM store_revenue
)

-- Final: join to store names and filter top 5
SELECT
    s.store_name,
    s.city,
    rs.daily_revenue,
    rs.order_count,
    rs.revenue_rank
FROM ranked_stores rs
JOIN silver.stores s ON rs.store_id = s.store_id
WHERE rs.revenue_rank <= 5
ORDER BY rs.revenue_rank;`}</CodeBox>

        <SubTitle>Multiple CTEs — building a full transformation pipeline in SQL</SubTitle>

        <CodeBox label="Multi-CTE query — a complete dbt-style transformation">{`-- Typical dbt Gold model: daily customer metrics
WITH
-- Base: all orders in the analysis window
base_orders AS (
    SELECT
        o.order_id,
        o.customer_id,
        o.store_id,
        o.order_amount,
        o.status,
        o.order_date,
        o.created_at
    FROM silver.orders o
    WHERE o.order_date BETWEEN '2026-01-01' AND '2026-03-17'
      AND o.status IN ('delivered', 'cancelled')
),

-- Customer first order date (for cohort analysis)
customer_first_order AS (
    SELECT
        customer_id,
        MIN(order_date) AS first_order_date,
        MIN(order_id)   AS first_order_id
    FROM base_orders
    WHERE status = 'delivered'
    GROUP BY customer_id
),

-- Delivered orders only (for revenue metrics)
delivered AS (
    SELECT * FROM base_orders WHERE status = 'delivered'
),

-- Customer-level aggregation
customer_metrics AS (
    SELECT
        d.customer_id,
        COUNT(DISTINCT d.order_id)              AS total_orders,
        SUM(d.order_amount)                     AS total_revenue,
        AVG(d.order_amount)                     AS avg_order_value,
        MAX(d.order_date)                       AS last_order_date,
        COUNT(DISTINCT d.store_id)              AS stores_visited,
        cfo.first_order_date,

        -- Days since first order
        ('2026-03-17'::DATE - cfo.first_order_date) AS customer_age_days,

        -- Order frequency (orders per month since first order)
        ROUND(
            COUNT(DISTINCT d.order_id)::NUMERIC
            / GREATEST(
                ('2026-03-17'::DATE - cfo.first_order_date) / 30.0,
                1
              ),
            2
        ) AS orders_per_month

    FROM delivered d
    JOIN customer_first_order cfo USING (customer_id)
    GROUP BY d.customer_id, cfo.first_order_date
),

-- Add customer dimension attributes
final AS (
    SELECT
        cm.*,
        c.customer_name,
        c.city,
        c.tier,
        -- Classify by value
        CASE
            WHEN cm.total_revenue >= 50000 THEN 'high_value'
            WHEN cm.total_revenue >= 10000 THEN 'mid_value'
            ELSE 'low_value'
        END AS value_segment,
        -- Classify by recency
        CASE
            WHEN '2026-03-17'::DATE - cm.last_order_date <= 30 THEN 'active'
            WHEN '2026-03-17'::DATE - cm.last_order_date <= 90 THEN 'at_risk'
            ELSE 'churned'
        END AS recency_segment
    FROM customer_metrics cm
    JOIN silver.customers c USING (customer_id)
)

SELECT * FROM final;`}</CodeBox>

        <SubTitle>Recursive CTEs — for hierarchical and graph data</SubTitle>

        <CodeBox label="Recursive CTE — traversing a hierarchy">{`-- Recursive CTEs traverse hierarchical data:
-- parent-child relationships, org charts, category trees

-- Example: product category hierarchy
-- categories table: (category_id, name, parent_category_id)
-- Root categories have parent_category_id = NULL

WITH RECURSIVE category_tree AS (
    -- Base case: start with root categories (no parent)
    SELECT
        category_id,
        name,
        parent_category_id,
        name                   AS full_path,
        0                      AS depth
    FROM silver.categories
    WHERE parent_category_id IS NULL

    UNION ALL

    -- Recursive case: join each category to its children
    SELECT
        c.category_id,
        c.name,
        c.parent_category_id,
        ct.full_path || ' > ' || c.name   AS full_path,  -- build path
        ct.depth + 1                       AS depth
    FROM silver.categories c
    JOIN category_tree ct ON c.parent_category_id = ct.category_id
)

SELECT
    category_id,
    name,
    full_path,
    depth
FROM category_tree
ORDER BY full_path;

-- Result:
-- Electronics                              depth=0
-- Electronics > Phones                     depth=1
-- Electronics > Phones > Smartphones       depth=2
-- Electronics > Phones > Feature Phones    depth=2
-- Electronics > Laptops                    depth=1

-- GUARD AGAINST INFINITE LOOPS:
-- Add WHERE depth < 10 to the recursive case
-- Some databases support MAXRECURSION hint`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Deduplication ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Deduplication" />
        <SectionTitle>Deduplication — The Most Common Data Engineering SQL Task</SectionTitle>

        <Para>
          Duplicate records are one of the most frequent data quality problems in
          any pipeline. They come from source systems that emit the same event twice
          during retries, from CDC tools that deliver at-least-once, from pipeline
          reruns that re-insert already-loaded records, and from UNION operations
          that do not account for shared rows between sources.
        </Para>

        <Para>
          SQL deduplication using window functions is the standard, efficient approach.
          It handles all deduplication scenarios in a single pass without expensive
          self-joins.
        </Para>

        <CodeBox label="Deduplication patterns — the three scenarios you will encounter">{`-- ── SCENARIO 1: Exact duplicates (all columns identical) ────────────────────
-- Keep one copy of each row where every column is the same

SELECT DISTINCT *
FROM silver.orders;
-- Simple but scans all rows and cannot be controlled which row is kept

-- Better with CTE:
WITH deduped AS (
    SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY order_id, customer_id, amount, status) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn) FROM deduped WHERE rn = 1;


-- ── SCENARIO 2: Same primary key, keep most recent version ───────────────────
-- Multiple rows with the same order_id — keep the one with the latest updated_at

WITH deduped AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id          -- group by business key
            ORDER BY updated_at DESC       -- most recent first
        ) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn)
FROM deduped
WHERE rn = 1;
-- For each order_id, keeps exactly one row — the one with the latest updated_at


-- ── SCENARIO 3: Same primary key, keep first seen version ────────────────────
-- Keep the original record, ignore later duplicates

WITH deduped AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id
            ORDER BY created_at ASC,    -- oldest first
                     ingested_at ASC    -- tiebreak by when pipeline saw it
        ) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn)
FROM deduped
WHERE rn = 1;


-- ── SNOWFLAKE: QUALIFY clause (no outer CTE needed) ──────────────────────────
-- Snowflake supports QUALIFY to filter on window function results directly

SELECT *
FROM silver.orders
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id
    ORDER BY updated_at DESC
) = 1;
-- Cleaner than wrapping in CTE — equivalent result


-- ── IN-PLACE DEDUPLICATION: remove duplicates from an existing table ─────────
-- Use when you need to clean a table that already has duplicates

-- Step 1: identify rows to keep (in temp table or CTE)
CREATE TEMP TABLE orders_deduped AS
SELECT * EXCLUDE (rn)
FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
    FROM silver.orders
) t
WHERE rn = 1;

-- Step 2: swap (truncate original, insert clean version)
BEGIN;
TRUNCATE silver.orders;
INSERT INTO silver.orders SELECT * FROM orders_deduped;
COMMIT;

-- Or use DELETE with a CTE (PostgreSQL / Snowflake):
WITH duplicates AS (
    SELECT ctid,
           ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
    FROM silver.orders
)
DELETE FROM silver.orders
WHERE ctid IN (SELECT ctid FROM duplicates WHERE rn > 1);`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — NULL Handling ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — NULL Handling" />
        <SectionTitle>NULL — The Most Misunderstood Value in SQL</SectionTitle>

        <Para>
          NULL in SQL does not mean zero. It does not mean empty string. It means
          <em> unknown</em>. This single semantic distinction causes more silent
          data errors in data engineering than almost any other SQL concept. When
          you add NULL to a number, the result is NULL. When you compare NULL to
          anything — even another NULL — the result is neither TRUE nor FALSE,
          but UNKNOWN. And UNKNOWN in a WHERE clause means the row is excluded.
        </Para>

        <CodeBox label="NULL semantics — three-valued logic and its consequences">{`-- NULL arithmetic — results are always NULL
SELECT 380 + NULL;          -- NULL
SELECT NULL * 0;            -- NULL (not 0!)
SELECT 'hello' || NULL;     -- NULL (not 'hello')

-- NULL comparisons — never use = NULL
SELECT * FROM orders WHERE promo_code = NULL;   -- WRONG: returns 0 rows
SELECT * FROM orders WHERE promo_code IS NULL;  -- CORRECT: returns rows with NULL promo_code
SELECT * FROM orders WHERE promo_code IS NOT NULL;

-- NULL in three-valued logic:
-- TRUE  AND NULL = NULL (not FALSE)
-- FALSE AND NULL = FALSE
-- TRUE  OR  NULL = TRUE
-- FALSE OR  NULL = NULL (not FALSE)
-- NOT NULL       = NULL

-- Consequence: WHERE clause excludes rows where condition is NULL
-- This means: if promo_code is NULL, these rows are silently excluded:
SELECT * FROM orders WHERE promo_code != 'SAVE10';
-- Rows where promo_code IS NULL are NOT returned — they fail the != comparison
-- FIX:
SELECT * FROM orders WHERE promo_code != 'SAVE10' OR promo_code IS NULL;


-- ── NULL IN AGGREGATIONS ──────────────────────────────────────────────────────
-- NULL values are IGNORED in all aggregate functions EXCEPT COUNT(*)

SELECT
    COUNT(*)              AS total_rows,         -- counts ALL rows including NULL
    COUNT(promo_code)     AS rows_with_promo,    -- counts only non-NULL promo_code
    COUNT(*) - COUNT(promo_code)
                          AS rows_without_promo, -- difference = NULL rows
    AVG(order_amount)     AS avg_amount,         -- NULL amounts excluded from avg
    SUM(discount_amount)  AS total_discount      -- NULL discounts treated as 0 in SUM
                                                  -- Wait — are they? No! NULL is NOT 0.
                                                  -- SUM ignores NULLs, not treats as 0.
FROM silver.orders;

-- Safe pattern: use COALESCE to treat NULL as 0 in sums
SELECT SUM(COALESCE(discount_amount, 0)) AS total_discount FROM silver.orders;
-- Now NULL discount_amount is explicitly treated as 0


-- ── COALESCE: return first non-NULL value ─────────────────────────────────────
SELECT
    order_id,
    COALESCE(promo_code, 'NO_PROMO') AS promo_code_safe,
    COALESCE(delivery_fee, 0)         AS delivery_fee_safe,
    COALESCE(notes, special_inst, '') AS display_notes  -- try notes, then special_inst, then ''
FROM silver.orders;


-- ── NULLIF: return NULL if value equals a specific value ─────────────────────
-- Prevents division by zero elegantly
SELECT
    store_id,
    total_revenue / NULLIF(total_orders, 0) AS avg_order_value
    -- if total_orders = 0, NULLIF returns NULL → NULL/anything = NULL (not error)
FROM gold.store_metrics;

-- Clean up dummy/placeholder values:
SELECT NULLIF(phone_number, 'N/A') AS phone_clean FROM customers;
-- Returns NULL where phone_number = 'N/A'


-- ── NULL IN JOINs ─────────────────────────────────────────────────────────────
-- NULL = NULL is UNKNOWN, so NULL join keys never match
SELECT o.*, c.name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id;
-- If o.customer_id IS NULL → no match → c.name IS NULL in result

-- Common mistake: assuming all LEFT JOIN nulls come from missing matches
-- Some may come from NULL join keys in the left table itself
-- Distinguish them:
SELECT
    o.order_id,
    o.customer_id,
    c.name,
    CASE
        WHEN o.customer_id IS NULL     THEN 'null_key_in_orders'
        WHEN c.customer_id IS NULL     THEN 'missing_customer'
        ELSE 'matched'
    END AS join_status
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Set Operations ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Set Operations" />
        <SectionTitle>Set Operations — UNION, INTERSECT, EXCEPT</SectionTitle>

        <Para>
          Set operations combine the results of two queries that have the same
          columns. They are essential for a data engineer who combines data from
          multiple sources, audits for data completeness, or identifies records
          that appear in one dataset but not another.
        </Para>

        <CodeBox label="UNION, INTERSECT, EXCEPT — when to use each">{`-- ── UNION: combine rows from two queries ────────────────────────────────────

-- UNION ALL: include all rows from both queries (keeps duplicates)
-- Use UNION ALL by default — it is faster because no deduplication step
SELECT order_id, order_amount, 'online' AS channel FROM silver.online_orders
UNION ALL
SELECT order_id, order_amount, 'instore' AS channel FROM silver.instore_orders;

-- UNION (without ALL): deduplicate — removes rows that appear in both results
-- Slower — requires a sort or hash to find duplicates
SELECT customer_id FROM silver.email_subscribers
UNION
SELECT customer_id FROM silver.sms_subscribers;
-- Returns unique customer_ids who subscribed to either channel


-- ── INTERSECT: rows that appear in BOTH queries ───────────────────────────────

-- Find customers subscribed to both email AND SMS
SELECT customer_id FROM silver.email_subscribers
INTERSECT
SELECT customer_id FROM silver.sms_subscribers;

-- Equivalent with JOIN (sometimes more explicit):
SELECT DISTINCT e.customer_id
FROM silver.email_subscribers e
INNER JOIN silver.sms_subscribers s USING (customer_id);


-- ── EXCEPT: rows in first query but NOT in second ────────────────────────────
-- (Called MINUS in Oracle/some other databases)

-- Find email subscribers who are NOT SMS subscribers
SELECT customer_id FROM silver.email_subscribers
EXCEPT
SELECT customer_id FROM silver.sms_subscribers;

-- REAL DE USE CASE: data completeness check
-- Find order_ids in the source (PostgreSQL) but missing from the warehouse
SELECT order_id FROM source.orders WHERE order_date = '2026-03-17'
EXCEPT
SELECT order_id FROM silver.orders WHERE order_date = '2026-03-17';
-- Returns order_ids that were ingested but not yet in warehouse
-- If this returns rows: the pipeline has a gap


-- ── UNION ALL for combining multiple sources (common DE pattern) ──────────────
-- Combine payments from multiple payment providers into one table

WITH all_payments AS (
    SELECT payment_id, merchant_id, amount, 'razorpay' AS provider, created_at
    FROM silver.razorpay_payments
    UNION ALL
    SELECT payment_id, merchant_id, amount, 'paytm'    AS provider, created_at
    FROM silver.paytm_payments
    UNION ALL
    SELECT payment_id, merchant_id, amount, 'phonepe'  AS provider, created_at
    FROM silver.phonepe_payments
)
SELECT
    provider,
    DATE_TRUNC('day', created_at) AS payment_date,
    COUNT(*)                       AS transaction_count,
    SUM(amount)                    AS total_volume
FROM all_payments
GROUP BY 1, 2
ORDER BY 2, 1;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — SCD in SQL ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — SCD in SQL" />
        <SectionTitle>Slowly Changing Dimensions in SQL — Types 1, 2, and 3</SectionTitle>

        <Para>
          A Slowly Changing Dimension (SCD) is a dimension table where the attribute
          values change over time — a customer changes their city, a product changes
          its category, a store changes its manager. How you handle these changes
          determines whether historical analysis produces correct or misleading results.
          SCD handling is one of the most-tested topics in data engineering interviews.
        </Para>

        <CodeBox label="SCD Type 1 — overwrite (no history preserved)">{`-- SCD TYPE 1: update in place, discard old value
-- Use when: you only care about current state, history is not needed
-- Example: correct a data entry mistake in an address

-- UPSERT pattern (INSERT or UPDATE):
INSERT INTO silver.customers (customer_id, name, city, updated_at)
VALUES (4201938, 'Priya Sharma', 'Hyderabad', NOW())
ON CONFLICT (customer_id)
DO UPDATE SET
    city       = EXCLUDED.city,
    updated_at = EXCLUDED.updated_at;
-- If customer 4201938 exists: update city from 'Bangalore' to 'Hyderabad'
-- If not: insert as new row

-- PROBLEM: all historical analysis now shows Hyderabad
-- "How much did Priya spend while she lived in Bangalore?" → impossible to answer
-- Use SCD Type 2 if that question matters to the business`}</CodeBox>

        <CodeBox label="SCD Type 2 — add new row (full history preserved)">{`-- SCD TYPE 2: add a new row for each change, expire the old row
-- Use when: you need to track history — "what was X at time T?"
-- Example: customer moves city — track both old and new for historical analysis

-- SCD Type 2 table structure:
CREATE TABLE silver.customers_scd2 (
    customer_sk    BIGSERIAL PRIMARY KEY,   -- surrogate key (new per version)
    customer_id    BIGINT    NOT NULL,      -- business key (same across versions)
    name           VARCHAR   NOT NULL,
    city           VARCHAR   NOT NULL,
    tier           VARCHAR   NOT NULL,
    -- SCD metadata columns:
    valid_from     DATE      NOT NULL,      -- when this version became active
    valid_to       DATE,                    -- when this version expired (NULL = current)
    is_current     BOOLEAN   NOT NULL DEFAULT TRUE,
    UNIQUE (customer_id, valid_from)
);

-- STEP 1: expire the current row
UPDATE silver.customers_scd2
SET
    valid_to   = CURRENT_DATE - INTERVAL '1 day',
    is_current = FALSE
WHERE customer_id = 4201938
  AND is_current  = TRUE;

-- STEP 2: insert the new version
INSERT INTO silver.customers_scd2
    (customer_id, name, city, tier, valid_from, valid_to, is_current)
VALUES
    (4201938, 'Priya Sharma', 'Hyderabad', 'Gold', CURRENT_DATE, NULL, TRUE);

-- QUERY: "What city was Priya in when she placed order 9284751?"
SELECT c.city
FROM silver.orders o
JOIN silver.customers_scd2 c
  ON o.customer_id = c.customer_id
 AND o.order_date BETWEEN c.valid_from AND COALESCE(c.valid_to, '9999-12-31')
WHERE o.order_id = 9284751;
-- Returns 'Bangalore' if the order was placed before the move
-- Returns 'Hyderabad' if placed after


-- dbt snapshot pattern (generates SCD2 automatically):
-- {% snapshot customers_snapshot %}
-- {{ config(target_schema='snapshots', unique_key='customer_id',
--           strategy='check', check_cols=['city', 'tier']) }}
-- SELECT customer_id, name, city, tier FROM {{ source('prod', 'customers') }}
-- {% endsnapshot %}`}</CodeBox>

        <CodeBox label="SCD Type 3 — add column (limited history)">{`-- SCD TYPE 3: add a column for the previous value
-- Use when: you only need to track one change back (current + previous)
-- Example: customer segment changes — track current and previous segment

CREATE TABLE silver.customers_scd3 (
    customer_id      BIGINT  PRIMARY KEY,
    name             VARCHAR NOT NULL,
    current_tier     VARCHAR NOT NULL,
    previous_tier    VARCHAR,          -- NULL if never changed
    tier_changed_at  TIMESTAMPTZ,      -- when the most recent change happened
    city             VARCHAR NOT NULL
);

-- UPDATE pattern:
UPDATE silver.customers_scd3
SET
    previous_tier  = current_tier,    -- save current as previous
    current_tier   = 'Platinum',      -- set new current
    tier_changed_at = NOW()
WHERE customer_id = 4201938;

-- LIMITATION: only tracks one previous value
-- After a second change: previous_tier is overwritten
-- Cannot answer "what was the tier two changes ago?"
-- Use SCD Type 2 for full history`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Date and Time SQL ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Date and Time SQL" />
        <SectionTitle>Date and Time SQL — Arithmetic, Truncation, and Timezone Handling</SectionTitle>

        <Para>
          Date and time manipulation is in almost every data engineering query.
          Daily aggregations, week-over-week comparisons, cohort analysis by
          signup month, session duration calculations — all require solid date
          SQL skills. The syntax varies slightly between databases; we cover
          PostgreSQL with notes on Snowflake and BigQuery differences.
        </Para>

        <CodeBox label="Date arithmetic and truncation — the essential patterns">{`-- ── DATE TRUNCATION ──────────────────────────────────────────────────────────
-- DATE_TRUNC rounds down to the start of the specified period

SELECT
    order_id,
    created_at,

    DATE_TRUNC('day',   created_at) AS order_day,        -- 2026-03-17 00:00:00
    DATE_TRUNC('week',  created_at) AS order_week_start, -- 2026-03-16 (Monday)
    DATE_TRUNC('month', created_at) AS order_month,      -- 2026-03-01 00:00:00
    DATE_TRUNC('year',  created_at) AS order_year,       -- 2026-01-01 00:00:00
    DATE_TRUNC('hour',  created_at) AS order_hour        -- 2026-03-17 20:00:00

FROM silver.orders;

-- In Snowflake: DATE_TRUNC('month', created_at) — same syntax
-- In BigQuery: DATE_TRUNC(created_at, MONTH) — arguments reversed!


-- ── DATE ARITHMETIC ───────────────────────────────────────────────────────────
-- PostgreSQL:
SELECT
    CURRENT_DATE,                              -- today: 2026-03-17
    CURRENT_DATE - INTERVAL '7 days',         -- 7 days ago: 2026-03-10
    CURRENT_DATE - INTERVAL '1 month',        -- 1 month ago: 2026-02-17
    CURRENT_DATE + INTERVAL '30 days',        -- 30 days ahead: 2026-04-16

    -- Date parts:
    EXTRACT(DOW FROM CURRENT_DATE),           -- day of week (0=Sunday, 6=Saturday)
    EXTRACT(DOY FROM CURRENT_DATE),           -- day of year (1–365)
    EXTRACT(MONTH FROM created_at),           -- month number (1–12)
    EXTRACT(EPOCH FROM created_at),           -- Unix timestamp (seconds since 1970)

    -- Date difference:
    CURRENT_DATE - order_date                 AS days_since_order,  -- integer
    AGE(CURRENT_DATE, order_date)             AS age_interval,      -- interval '14 days'
    DATE_PART('day', CURRENT_DATE - order_date::DATE) AS days_int   -- explicitly integer

FROM silver.orders;


-- ── COMMON DATE PATTERNS ──────────────────────────────────────────────────────

-- Last 7 days (inclusive of today):
WHERE order_date >= CURRENT_DATE - INTERVAL '6 days'

-- Month-to-date:
WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE)
  AND order_date <  CURRENT_DATE + INTERVAL '1 day'

-- Previous full month:
WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND order_date <  DATE_TRUNC('month', CURRENT_DATE)

-- Same day last year:
WHERE order_date = CURRENT_DATE - INTERVAL '1 year'

-- Last complete week (Monday–Sunday):
WHERE order_date >= DATE_TRUNC('week', CURRENT_DATE - INTERVAL '7 days')
  AND order_date <  DATE_TRUNC('week', CURRENT_DATE)


-- ── TIMEZONE HANDLING ─────────────────────────────────────────────────────────
-- Always work in UTC internally, convert to IST (UTC+5:30) only for display

-- Convert UTC timestamp to IST for reporting:
SELECT
    order_id,
    created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata' AS created_at_ist
FROM silver.orders;

-- Snowflake timezone conversion:
SELECT CONVERT_TIMEZONE('UTC', 'Asia/Kolkata', created_at) AS ist_time FROM orders;

-- BigQuery timezone conversion:
SELECT DATETIME(created_at, 'Asia/Kolkata') AS ist_time FROM orders;

-- Safe IST daily grouping (orders placed between midnight and midnight IST):
SELECT
    DATE(created_at AT TIME ZONE 'Asia/Kolkata') AS order_date_ist,
    COUNT(*)                                      AS order_count
FROM silver.orders
GROUP BY 1
ORDER BY 1;`}</CodeBox>

        <SubTitle>Cohort analysis — the classic date SQL challenge</SubTitle>

        <CodeBox label="Cohort retention analysis — a complete DE SQL pattern">{`-- Monthly cohort retention: for each signup month cohort,
-- what % of customers are still ordering in month N?

WITH
-- Step 1: assign each customer to their signup cohort (month of first order)
cohort_assignment AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM silver.orders
    WHERE status = 'delivered'
    GROUP BY customer_id
),

-- Step 2: for each customer, list every month they had at least one order
active_months AS (
    SELECT DISTINCT
        customer_id,
        DATE_TRUNC('month', order_date) AS active_month
    FROM silver.orders
    WHERE status = 'delivered'
),

-- Step 3: join and calculate cohort_period (0 = cohort month, 1 = one month later, etc.)
cohort_data AS (
    SELECT
        ca.cohort_month,
        am.active_month,
        -- How many months after cohort month is this?
        EXTRACT(YEAR  FROM AGE(am.active_month, ca.cohort_month)) * 12
        + EXTRACT(MONTH FROM AGE(am.active_month, ca.cohort_month))
            AS cohort_period,
        COUNT(DISTINCT am.customer_id) AS customers_active
    FROM cohort_assignment ca
    JOIN active_months am USING (customer_id)
    WHERE am.active_month >= ca.cohort_month
    GROUP BY 1, 2, 3
),

-- Step 4: calculate cohort size (customers in month 0)
cohort_sizes AS (
    SELECT cohort_month, customers_active AS cohort_size
    FROM cohort_data
    WHERE cohort_period = 0
)

-- Final: retention rates
SELECT
    cd.cohort_month,
    cs.cohort_size,
    cd.cohort_period,
    cd.customers_active,
    ROUND(cd.customers_active::NUMERIC / cs.cohort_size * 100, 1) AS retention_pct
FROM cohort_data cd
JOIN cohort_sizes cs USING (cohort_month)
ORDER BY cohort_month, cohort_period;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Query Optimisation ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Query Optimisation" />
        <SectionTitle>Query Optimisation — Writing SQL That Is Fast, Not Just Correct</SectionTitle>

        <Para>
          Correct SQL and fast SQL are not the same thing. A data engineer whose
          queries take 40 minutes when they should take 40 seconds is a pipeline
          SLA risk. Query optimisation is not premature optimisation — it is the
          difference between a pipeline that meets its morning SLA and one that
          does not.
        </Para>

        <SubTitle>Reading EXPLAIN ANALYZE in PostgreSQL and Snowflake</SubTitle>

        <CodeBox label="Understanding query plans — what to look for">{`-- ── POSTGRESQL: EXPLAIN ANALYZE ─────────────────────────────────────────────
EXPLAIN ANALYZE
SELECT
    s.store_name,
    COUNT(*) AS order_count,
    SUM(o.amount) AS total_revenue
FROM silver.orders o
JOIN silver.stores s ON o.store_id = s.store_id
WHERE o.order_date >= '2026-01-01'
GROUP BY s.store_name;

-- Sample output:
-- HashAggregate  (cost=... rows=10) (actual time=892ms rows=10)
--   ->  Hash Join  (cost=... rows=480k) (actual time=24ms rows=482k)
--         Hash Cond: (o.store_id = s.store_id)
--         ->  Index Scan using idx_orders_date on orders o
--               (actual time=0.04ms rows=482193)
--               Index Cond: (order_date >= '2026-01-01')
--         ->  Hash  (actual time=0.03ms rows=10)
--               ->  Seq Scan on stores s  (actual time=0.02ms rows=10)
-- Planning Time: 1.2 ms
-- Execution Time: 896 ms

-- KEY THINGS TO LOOK FOR:
--   "Seq Scan" on a large table → likely missing index
--   "Index Scan" → index is being used ✓
--   "Hash Join" → joining medium tables efficiently ✓
--   "Nested Loop" on large tables → may be slow
--   rows estimate vs actual rows differing by 10×+ → stale statistics
--   high "actual time" on one node → that node is the bottleneck


-- ── SNOWFLAKE: EXPLAIN ────────────────────────────────────────────────────────
-- Snowflake does not use traditional indexes — it uses micro-partition pruning

EXPLAIN
SELECT store_name, SUM(amount) FROM orders WHERE order_date >= '2026-01-01'
GROUP BY store_name;

-- Look for in Snowflake:
--   "Partition pruning: 847 of 1024 partitions pruned" → filter is working ✓
--   "TableScan: ALL PARTITIONS" → no partition pruning → check clustering key
--   "SpillToLocalStorage" → query is spilling — increase warehouse size or
--                           rewrite query to reduce intermediate result size`}</CodeBox>

        <SubTitle>The ten most impactful optimisation rules</SubTitle>

        <CodeBox label="Query optimisation rules — ordered by impact">{`-- 1. FILTER EARLY — push WHERE conditions as early as possible in CTEs
-- BAD: filter after the JOIN
SELECT * FROM orders o JOIN customers c USING (customer_id)
WHERE o.order_date >= '2026-03-01';

-- GOOD: filter before the JOIN — reduces rows joining
WITH recent_orders AS (
    SELECT * FROM orders WHERE order_date >= '2026-03-01'
)
SELECT * FROM recent_orders o JOIN customers c USING (customer_id);


-- 2. AVOID SELECT * IN PRODUCTION — select only columns you need
-- SELECT * reads all columns including ones your query never uses
-- On columnar warehouses, SELECT * reads every column — negates columnar benefit
SELECT order_id, customer_id, amount FROM orders;  -- not SELECT *


-- 3. AVOID FUNCTIONS ON INDEXED COLUMNS IN WHERE — prevents index use
-- BAD: applying function to indexed column prevents index use
WHERE LOWER(email) = 'priya@example.com'
WHERE EXTRACT(YEAR FROM order_date) = 2026   -- full scan!

-- GOOD: compute the comparison value instead, leave the column raw
WHERE email = LOWER('Priya@Example.com')     -- or store email pre-lowercased
WHERE order_date >= '2026-01-01'             -- range on the column directly
  AND order_date <  '2027-01-01'


-- 4. USE JOINS INSTEAD OF CORRELATED SUBQUERIES
-- BAD: correlated subquery runs once per outer row
SELECT
    o.*,
    (SELECT name FROM customers WHERE customer_id = o.customer_id) AS customer_name
FROM orders o;

-- GOOD: JOIN runs once
SELECT o.*, c.name AS customer_name
FROM orders o
JOIN customers c USING (customer_id);


-- 5. COUNT(1) vs COUNT(*) — no practical difference in modern databases
-- Both count rows. COUNT(*) is the SQL standard. Use it.
SELECT COUNT(*) FROM orders;


-- 6. AVOID DISTINCT when not needed — it triggers an extra sort/hash step
-- If you know the join produces unique results, omit DISTINCT
-- If you need uniqueness, check whether a better JOIN design eliminates duplicates


-- 7. MATERIALISE INTERMEDIATE CTEs for reuse in Snowflake / BigQuery
-- A CTE referenced multiple times may be re-executed each time (database-dependent)
-- In Snowflake, use CREATE TEMP TABLE for CTEs referenced > once in complex queries


-- 8. PARTITION PRUNING — always filter on partition columns
-- Snowflake: cluster by the column you filter on most frequently
-- Parquet/Iceberg: filter on the partition column in WHERE clause
-- Without partition filter: full table scan regardless of other filters


-- 9. JOIN ORDER — put the smaller table on the right in HASH JOINs
-- PostgreSQL optimiser usually handles this automatically
-- In Snowflake/BigQuery for very large tables: hint with smaller table on right side


-- 10. APPROXIMATE FUNCTIONS for exploration on very large datasets
-- Instead of COUNT(DISTINCT customer_id) which requires loading all IDs:
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM orders;  -- Snowflake
SELECT HLL_COUNT.MERGE(HLL_COUNT.INIT(customer_id)) FROM orders;  -- BigQuery
-- Typically within 1–2% of exact count, but runs much faster`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Warehouse-Specific SQL ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Warehouse-Specific SQL" />
        <SectionTitle>Warehouse-Specific SQL — Snowflake, BigQuery, Redshift Differences</SectionTitle>

        <Para>
          SQL is standardised but every warehouse adds its own extensions and has
          its own quirks. When you switch warehouses or work across multiple, these
          differences cause silent errors or failed queries. Here are the most
          important differences a data engineer needs to know.
        </Para>

        <CodeBox label="Key SQL differences across warehouses">{`-- ── JSON / SEMI-STRUCTURED DATA ──────────────────────────────────────────────

-- PostgreSQL:
SELECT payload->>'order_id' AS order_id,    -- text value
       payload->'amount'    AS amount_json,  -- JSON value
       (payload->>'amount')::DECIMAL         -- cast to numeric
FROM orders WHERE payload IS NOT NULL;

-- Snowflake (VARIANT column):
SELECT
    payload:order_id::INTEGER          AS order_id,
    payload:customer.city::VARCHAR     AS city,        -- nested path
    payload:items[0]:name::VARCHAR     AS first_item   -- array index
FROM orders;

-- BigQuery (JSON column):
SELECT
    JSON_VALUE(payload, '$.order_id')  AS order_id,
    JSON_VALUE(payload, '$.customer.city') AS city
FROM orders;


-- ── ARRAY HANDLING ────────────────────────────────────────────────────────────

-- PostgreSQL: UNNEST
SELECT order_id, UNNEST(items) AS item FROM orders;

-- Snowflake: FLATTEN
SELECT o.order_id, f.value:item_name::VARCHAR AS item_name
FROM orders o, LATERAL FLATTEN(input => o.items) f;

-- BigQuery: UNNEST
SELECT order_id, item
FROM orders, UNNEST(items) AS item;


-- ── WINDOW FUNCTION QUALIFY (Snowflake / BigQuery only) ──────────────────────
-- PostgreSQL requires a CTE:
WITH ranked AS (SELECT *, ROW_NUMBER() OVER (...) AS rn FROM orders)
SELECT * FROM ranked WHERE rn = 1;

-- Snowflake / BigQuery — QUALIFY filters window function results directly:
SELECT * FROM orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1;


-- ── STRING FUNCTIONS ─────────────────────────────────────────────────────────
-- Concatenation:
SELECT 'Hello' || ' ' || 'World';          -- PostgreSQL, Snowflake, BigQuery
SELECT CONCAT('Hello', ' ', 'World');      -- All three

-- String splitting:
-- PostgreSQL:  SPLIT_PART(str, delimiter, field_number)
-- Snowflake:   SPLIT_PART(str, delimiter, field_number)  -- same
-- BigQuery:    SPLIT(str, delimiter)[OFFSET(0)]          -- returns array

-- Regex:
-- PostgreSQL:  ~ for match, regexp_replace(), regexp_extract()
-- Snowflake:   REGEXP_LIKE(), REGEXP_REPLACE(), REGEXP_SUBSTR()
-- BigQuery:    REGEXP_CONTAINS(), REGEXP_REPLACE(), REGEXP_EXTRACT()


-- ── DATE FUNCTIONS ────────────────────────────────────────────────────────────
-- Get current date:
CURRENT_DATE                    -- PostgreSQL, Snowflake
CURRENT_DATE()                  -- BigQuery

-- Date truncation:
DATE_TRUNC('month', ts)         -- PostgreSQL: DATE_TRUNC(part, value)
DATE_TRUNC('month', ts)         -- Snowflake: same
DATE_TRUNC(ts, MONTH)           -- BigQuery: DATE_TRUNC(value, part) — reversed!

-- Add intervals:
ts + INTERVAL '7 days'          -- PostgreSQL
DATEADD('day', 7, ts)           -- Snowflake
DATE_ADD(ts, INTERVAL 7 DAY)    -- BigQuery


-- ── LIMITING ROWS ────────────────────────────────────────────────────────────
SELECT * FROM orders LIMIT 10;          -- PostgreSQL, Snowflake, BigQuery
SELECT TOP 10 * FROM orders;            -- SQL Server / Redshift (also supports LIMIT)
SELECT * FROM orders FETCH FIRST 10 ROWS ONLY;  -- SQL standard`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 11 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Complete dbt Gold Model — Revenue Dashboard SQL</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Task — FreshCart Daily Revenue Dashboard model
          </div>

          <Para>
            The analytics team needs a Gold layer table that powers the daily revenue
            dashboard. Requirements: daily revenue per store per category, with
            running month-to-date totals, day-over-day change, and store ranking
            within category. This is a complete production dbt model using every
            pattern from this module.
          </Para>

          <CodeBox label="gold/daily_store_category_metrics.sql — complete production model">{`-- Gold model: daily revenue metrics by store and category
-- Powers the FreshCart Revenue Dashboard
-- Refresh: daily at 06:00 AM IST

WITH
-- Step 1: Base — delivered orders in analysis window
-- Filter pushed down to Silver before any aggregation
base AS (
    SELECT
        o.order_id,
        o.store_id,
        p.category,
        o.order_amount,
        DATE(o.created_at AT TIME ZONE 'Asia/Kolkata') AS order_date
    FROM silver.orders o
    JOIN silver.order_items oi ON o.order_id = oi.order_id
    JOIN silver.products p    ON oi.product_id = p.product_id
    WHERE o.status = 'delivered'
      AND o.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 months')
    -- 2 months back to support MoM comparisons
),

-- Step 2: Daily aggregation by store + category
daily_agg AS (
    SELECT
        store_id,
        category,
        order_date,
        COUNT(DISTINCT order_id) AS order_count,
        SUM(order_amount)        AS daily_revenue
    FROM base
    GROUP BY 1, 2, 3
),

-- Step 3: Window function layer — running totals, comparisons, rankings
enriched AS (
    SELECT
        store_id,
        category,
        order_date,
        order_count,
        daily_revenue,

        -- Running month-to-date revenue
        SUM(daily_revenue) OVER (
            PARTITION BY store_id, category,
                         DATE_TRUNC('month', order_date)
            ORDER BY order_date
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS mtd_revenue,

        -- Day-over-day revenue change
        daily_revenue
        - COALESCE(LAG(daily_revenue) OVER (
            PARTITION BY store_id, category
            ORDER BY order_date
          ), 0)
        AS dod_revenue_change,

        -- 7-day moving average
        ROUND(AVG(daily_revenue) OVER (
            PARTITION BY store_id, category
            ORDER BY order_date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2) AS moving_avg_7d,

        -- Rank within category on each day (which store performed best?)
        RANK() OVER (
            PARTITION BY category, order_date
            ORDER BY daily_revenue DESC
        ) AS store_rank_in_category

    FROM daily_agg
),

-- Step 4: Add store dimension attributes
final AS (
    SELECT
        e.*,
        s.store_name,
        s.city,
        s.store_manager
    FROM enriched e
    JOIN silver.stores s USING (store_id)
)

SELECT * FROM final
ORDER BY order_date DESC, category, store_rank_in_category;`}</CodeBox>

          <Para>
            This model uses every major pattern from this module: CTE chain for
            readability and testability, filter pushdown in the base CTE, window
            functions for running totals and rankings, LAG with COALESCE for safe
            day-over-day comparison, and a clean final JOIN to dimension attributes.
            A data engineer who can write this kind of SQL confidently is ready for
            a production data engineering role.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 12 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a window function and how does it differ from GROUP BY?',
            a: `Both window functions and GROUP BY perform calculations across multiple rows. The critical difference is that GROUP BY collapses multiple rows into one output row per group, while window functions perform the calculation but return a value for each individual input row without collapsing them.

A GROUP BY query that calculates total revenue per store returns one row per store — the individual order rows disappear. A window function SUM(amount) OVER (PARTITION BY store_id) returns the store's total revenue on every single order row, alongside all the other order fields.

This makes window functions indispensable for calculations that need both the individual row detail and an aggregated value at the same time. For example: "show me each order alongside the percentage of that order's store's total revenue" — impossible with GROUP BY alone, straightforward with a window function.

Window functions also enable calculations that are logically difficult with GROUP BY: running totals (cumulative sum as you move through rows in order), moving averages (average of the last N rows), row-to-row comparisons (compare each row to the previous row using LAG), and ranking within groups (identify the top 3 orders per store using ROW_NUMBER).

The OVER clause is what defines the window: PARTITION BY divides rows into independent groups (like GROUP BY), ORDER BY defines the sequence within the partition, and the optional frame clause (ROWS/RANGE BETWEEN) defines exactly which rows are included in the calculation for each row.`,
          },
          {
            q: 'Q2. Write a SQL query to find duplicate records in a table and keep only the most recent version of each.',
            a: `The standard approach uses ROW_NUMBER() with PARTITION BY on the business key and ORDER BY on the timestamp you want to use as the tie-breaker.

The query structure: wrap the table in a CTE that assigns a row number to each record within its duplicate group. Row number 1 in each group gets the "keep" designation based on the ORDER BY clause inside the window. Then the outer query filters to only keep row number 1.

Using order_id as the business key and updated_at as the recency indicator:

WITH deduped AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
  FROM silver.orders
)
SELECT * EXCLUDE (rn) FROM deduped WHERE rn = 1;

The choice of ORDER BY inside the window determines which copy is kept. DESC on updated_at keeps the most recently modified version. ASC keeps the earliest version. Adding a secondary sort on ingested_at as a tiebreaker handles cases where multiple versions have identical timestamps.

In Snowflake, QUALIFY simplifies this to a single SELECT without a wrapping CTE: SELECT * FROM silver.orders QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1.

The key distinction to understand: ROW_NUMBER should be used for deduplication rather than RANK or DENSE_RANK, because ROW_NUMBER guarantees exactly one row per partition group regardless of ties. RANK can return multiple rows with rank=1 when two rows tie on the ORDER BY column.`,
          },
          {
            q: 'Q3. Explain SCD Type 2. Write the SQL to insert a new version of a customer record when their city changes.',
            a: `A Slowly Changing Dimension Type 2 tracks the full history of changes to a dimension by adding a new row for each change rather than overwriting the existing row. Each row in the table represents one version of the entity during a specific time period.

The table has three metadata columns: valid_from (the date this version became active), valid_to (the date this version was superseded — NULL for the current version), and is_current (a boolean flag for easy filtering of current records).

When a customer's city changes from Bangalore to Hyderabad, two operations are needed in a single transaction. First, expire the currently active row by setting valid_to to yesterday's date and is_current to FALSE. Second, insert a new row with the new city, valid_from set to today's date, valid_to set to NULL, and is_current set to TRUE.

UPDATE silver.customers_scd2
SET valid_to = CURRENT_DATE - 1, is_current = FALSE
WHERE customer_id = 4201938 AND is_current = TRUE;

INSERT INTO silver.customers_scd2 (customer_id, name, city, valid_from, valid_to, is_current)
VALUES (4201938, 'Priya Sharma', 'Hyderabad', CURRENT_DATE, NULL, TRUE);

The value of this pattern becomes clear when you need to answer time-sensitive questions. To find the city a customer lived in when they placed a specific order, join the order to the SCD2 table on both customer_id and the condition that the order date falls within the row's valid_from to valid_to range. This correctly returns Bangalore for orders placed before the move and Hyderabad for orders placed after.

In practice, most teams implement SCD2 using dbt snapshots rather than hand-written UPDATE/INSERT logic, because dbt handles the expiry and insertion atomically based on a change detection strategy.`,
          },
          {
            q: 'Q4. A query is returning wrong results when filtering with WHERE status != "cancelled". What might be wrong and how do you fix it?',
            a: `The most likely cause is NULL values in the status column. This is a classic SQL three-valued logic problem.

In SQL, comparison operators — including != — return NULL (not FALSE) when either operand is NULL. The expression NULL != "cancelled" evaluates to NULL, not TRUE. And in a WHERE clause, rows where the condition evaluates to NULL are excluded from the result — they are treated the same as rows where the condition is FALSE.

So if status IS NULL for some rows, those rows will not appear in the result of WHERE status != "cancelled". The query says "give me everything except cancelled orders" but the result is actually "give me delivered and placed orders, and silently drop all orders with NULL status."

The fix is to explicitly handle the NULL case:
WHERE status != 'cancelled' OR status IS NULL

This returns all rows where status is not "cancelled" including rows where status is NULL. Whether NULL status rows should be included depends on the business logic — but the point is that the developer should make this decision explicitly, not have it silently made by NULL comparison semantics.

This same trap appears in many other contexts: LEFT JOIN filtering, NOT IN with NULL values (a query like WHERE customer_id NOT IN (SELECT customer_id FROM blacklist) silently returns no rows if any blacklist customer_id is NULL), and aggregate filters. The rule is: whenever you see a filter that involves NOT or != on a nullable column, check whether NULL handling is correct.`,
          },
          {
            q: 'Q5. What is the difference between UNION and UNION ALL? When should you use each in a data pipeline?',
            a: `Both UNION and UNION ALL combine the result sets of two queries with the same column structure. The difference is that UNION ALL includes all rows from both queries — including duplicates — while UNION deduplicates the result, returning only distinct rows.

UNION internally sorts or hashes the combined result to identify and remove duplicates, which adds computational cost proportional to the result size. UNION ALL just concatenates the two result sets, with no additional processing. This makes UNION ALL significantly faster, especially on large datasets.

In data engineering, UNION ALL should be the default choice in almost all cases, for three reasons.

First, performance: UNION ALL is consistently faster. On a warehouse query combining two large tables, the difference can be seconds versus minutes.

Second, correctness for source combination: when you are combining data from multiple sources into one unified table — all payments from Razorpay, Paytm, and PhonePe into a single payments table — you typically want all records from all sources. A legitimate payment in Razorpay that happens to have the same amount and timestamp as a Paytm payment would be silently removed by UNION but correctly preserved by UNION ALL.

Third, explicit deduplication: if deduplication is needed, it is better to do it explicitly and intentionally — using ROW_NUMBER or DISTINCT with specific column-level logic — rather than implicitly through UNION. Explicit deduplication lets you control which duplicate copy is kept and makes the deduplication intent visible to code reviewers.

Use UNION (without ALL) only when you genuinely want to find the set of distinct values that appear in either result — like finding unique customer IDs who appear in either the email or SMS subscriber list. Even then, consider whether UNION ALL followed by a SELECT DISTINCT gives you more control.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Incorrect revenue total — SUM(order_amount) returns less than expected; COUNT(*) and COUNT(order_amount) return different numbers`,
            cause: 'The order_amount column contains NULL values for some rows. SUM() and AVG() silently ignore NULL values in their calculation, producing a result that is lower than the true total. COUNT(*) counts all rows including those with NULL order_amount; COUNT(order_amount) counts only rows with non-NULL amounts. The discrepancy between the two counts reveals the extent of the NULL contamination.',
            fix: 'Use COALESCE to treat NULL as zero in sums: SUM(COALESCE(order_amount, 0)). Add a NOT NULL constraint to the order_amount column to prevent future NULLs from entering. Audit which pipeline run introduced the NULLs using ingested_at and pipeline_run_id, and reprocess those records from the source.',
          },
          {
            error: `Window function error: column "store_id" must appear in GROUP BY or be used in an aggregate function`,
            cause: 'A window function was mixed with a GROUP BY in the same SELECT, and a column was referenced that belongs to neither. Window functions can be used alongside GROUP BY but the window function must operate on the aggregated result, not on individual rows. The query tried to partition by a column that was not part of the GROUP BY.',
            fix: 'Separate the aggregation and the window function into two CTEs: first GROUP BY to aggregate, then apply window functions over the aggregated result. Never try to use raw row-level columns in window functions within the same query as GROUP BY unless those columns are in the GROUP BY list.',
          },
          {
            error: `Snowflake query scanned ALL partitions despite a WHERE clause on the date column — partition pruning not occurring`,
            cause: 'The table was not clustered on the date column used in the WHERE filter, or the filter uses a function on the clustered column (such as DATE_TRUNC or EXTRACT) which prevents Snowflake from using the clustering metadata to prune partitions.',
            fix: 'For Snowflake: ALTER TABLE orders CLUSTER BY (order_date) to cluster by the most common filter column. Avoid applying functions to the clustering key in WHERE clauses — filter on the raw column value. For partitioned data lakes: ensure files are stored in Hive-style date partition directories and the query engine (Athena, Spark) is using the partition column in the WHERE clause with a direct comparison, not a function application.',
          },
          {
            error: `Recursive CTE causes: ERROR: infinite recursion detected in rules for relation "category_tree"`,
            cause: 'The recursive CTE has a cycle in the data — a category is its own ancestor (perhaps through a data entry error where parent_category_id was set to category_id). Without a cycle-breaking condition, the recursion continues indefinitely until the database detects it and raises an error.',
            fix: 'Add a depth limit to the recursive case: AND ct.depth < 10 prevents the recursion from going beyond 10 levels. In PostgreSQL you can also track the path as an array and add WHERE NOT (category_id = ANY(path)) to explicitly detect and break cycles. Fix the underlying data: find and correct the circular reference in the categories table.',
          },
          {
            error: `dbt model fails: column "rn" does not exist — after refactoring a CTE that used ROW_NUMBER() AS rn`,
            cause: 'A column alias defined inside a CTE (rn in this case) was referenced in the outer SELECT or WHERE clause of a query that no longer wraps the CTE. Snowflake supports QUALIFY to filter on window functions directly, but in PostgreSQL the window function result must be wrapped in a CTE or subquery before filtering on it. The column alias rn is not visible outside the CTE where it was defined.',
            fix: 'Ensure that the column alias created by a window function is only referenced in the same query level where the window function is defined, or in an outer CTE that references the inner CTE. Do not try to use rn in a WHERE clause at the same level as the SELECT where rn is computed — wrap it: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (...) AS rn FROM orders) SELECT * FROM ranked WHERE rn = 1.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Window functions perform calculations across related rows without collapsing them like GROUP BY does. The OVER clause defines the window: PARTITION BY divides rows into groups, ORDER BY sequences them, and the frame clause (ROWS/RANGE BETWEEN) defines which rows are included per calculation.',
        'ROW_NUMBER, RANK, and DENSE_RANK all assign sequential numbers within a partition. Use ROW_NUMBER for deduplication — it guarantees exactly one row per group. RANK allows ties and skips numbers. DENSE_RANK allows ties without skipping. ROW_NUMBER is the correct choice when you need exactly one row kept per key.',
        'LAG and LEAD access values from previous and next rows without self-joins. Always provide a default value as the third argument to handle the first/last row in a partition where no previous/next row exists: LAG(amount, 1, 0).',
        'CTEs (WITH clauses) are the foundation of readable, maintainable data engineering SQL. Every complex query should be written as a CTE chain — each step named, documented, and independently understandable. Avoid nested subqueries in production code.',
        'Deduplication uses ROW_NUMBER() OVER (PARTITION BY business_key ORDER BY timestamp DESC) = 1. This efficiently keeps one row per business key in a single pass. In Snowflake and BigQuery, QUALIFY eliminates the need for a wrapping CTE.',
        'NULL in SQL means unknown — not zero, not empty. NULL != "anything" evaluates to NULL (not TRUE), causing rows to be silently excluded from WHERE clauses. Always handle NULL explicitly: use IS NULL / IS NOT NULL for comparison, COALESCE for defaults, NULLIF for converting values to NULL.',
        'SCD Type 1 overwrites — simple but loses history. SCD Type 2 adds a new row with valid_from/valid_to dates — preserves full history, enables point-in-time queries. SCD Type 3 adds a previous-value column — simple but only one change back. Use SCD2 for dimensions where historical analysis matters.',
        'DATE_TRUNC is the standard way to group by time period. Always use TIMESTAMPTZ for event timestamps and convert to IST (AT TIME ZONE "Asia/Kolkata") only for display, not for storage. BigQuery reverses the argument order of DATE_TRUNC — a common cross-warehouse bug.',
        'Query optimisation priorities: filter early in CTEs to reduce rows before joins, avoid SELECT *, never apply functions to indexed columns in WHERE (prevents index use), prefer JOINs over correlated subqueries, always filter on partition columns in cloud warehouses.',
        'UNION ALL is almost always the right choice over UNION. UNION ALL is faster (no deduplication step) and preserves all records from all sources. Use UNION only when you explicitly want distinct values across two sets. When deduplication is needed, do it explicitly with ROW_NUMBER rather than implicitly with UNION.',
      ]} />

    </LearnLayout>
  )
}