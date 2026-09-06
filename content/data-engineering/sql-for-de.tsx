import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
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

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
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

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

export default function SQLForDEModule() {
  return (
    <LearnLayout
      title="SQL for Data Engineers — Beyond the Basics"
      description="Window functions, CTEs, deduplication, NULL handling, and the queries every interview tests."
      section="Data Engineering — Module 15"
      readTime="80 min"
      updatedAt="August 2026"
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
          A data engineer&rsquo;s SQL calculates running totals and moving averages without
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
          with 10 stores across the US. You will see the same tables throughout:
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> silver.orders</code>,{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>silver.customers</code>,{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>silver.stores</code>.
          SQL dialect is standard PostgreSQL / Snowflake compatible unless noted.
        </Callout>

        <TryThis>
          Take any GROUP BY query you&rsquo;ve written and ask: could I get the same
          aggregated number on every individual row instead of collapsing to one
          row per group? If yes, that&rsquo;s a window function — Part 02 is built
          entirely around that one shift in thinking.
        </TryThis>
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
          regular aggregation.
        </Para>

        <CodeBox label="Window function anatomy — every clause explained">{`SELECT
    order_id, store_id, order_amount,
    SUM(order_amount) OVER (
        PARTITION BY store_id          -- divide rows into groups by store
        ORDER BY order_date            -- within each partition, sort by date
        ROWS BETWEEN
            UNBOUNDED PRECEDING        -- from the first row of the partition
            AND CURRENT ROW            -- to the current row
    ) AS running_total_by_store
FROM silver.orders;

-- PARTITION BY is optional — omit it to treat all rows as one partition:
SUM(order_amount) OVER (ORDER BY order_date) AS running_total_all_stores

-- ORDER BY inside OVER is optional — omit it for unordered aggregations:
SUM(order_amount) OVER (PARTITION BY store_id) AS store_total
-- gives every row the store's total — same as a correlated subquery but much faster

-- Frame clause defaults: with ORDER BY → RANGE UNBOUNDED PRECEDING TO CURRENT ROW
--                         without ORDER BY → ROWS UNBOUNDED PRECEDING TO UNBOUNDED FOLLOWING`}</CodeBox>

        <SubSubTitle>Ranking functions — ROW_NUMBER, RANK, DENSE_RANK</SubSubTitle>

        <CodeBox label="The three ranking functions, and how they differ on ties">{`SELECT order_id, store_id, order_amount,

    -- ROW_NUMBER: sequential unique number within partition, no ties
    ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY order_amount DESC) AS row_num,

    -- RANK: tied rows get the same rank, then skips numbers
    -- Scores: 100, 100, 80 → ranks: 1, 1, 3
    RANK() OVER (PARTITION BY store_id ORDER BY order_amount DESC) AS rank_with_gaps,

    -- DENSE_RANK: tied rows get the same rank, no skipping
    -- Scores: 100, 100, 80 → ranks: 1, 1, 2
    DENSE_RANK() OVER (PARTITION BY store_id ORDER BY order_amount DESC) AS rank_no_gaps

FROM silver.orders
WHERE order_date = '2026-03-17';`}</CodeBox>

        <CodeBox label="Real use case — top 3 orders per store, and why ROW_NUMBER for dedup">{`WITH ranked AS (
    SELECT order_id, store_id, order_amount,
        ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY order_amount DESC) AS rn
    FROM silver.orders
    WHERE order_date = '2026-03-17'
)
SELECT order_id, store_id, order_amount
FROM ranked
WHERE rn <= 3;   -- keep only top 3 per store

-- WHY ROW_NUMBER FOR DEDUP vs RANK:
-- ROW_NUMBER guarantees one row per group even when values tie.
-- RANK may return 2 rows when two rows tie for position 1.
-- For deduplication, always use ROW_NUMBER.`}</CodeBox>

        <SubSubTitle>LAG and LEAD — comparing current row to previous or next</SubSubTitle>

        <CodeBox label="Row-to-row comparisons without self-joins">{`-- LAG: access the value from a previous row in the partition
-- LEAD: access the value from a following row in the partition

SELECT store_id, order_date, daily_revenue,

    -- Yesterday's revenue for this store. Args: (column, offset, default_if_null)
    LAG(daily_revenue, 1, 0) OVER (PARTITION BY store_id ORDER BY order_date)
        AS prev_day_revenue,

    -- Day-over-day change
    daily_revenue - LAG(daily_revenue, 1, 0) OVER (PARTITION BY store_id ORDER BY order_date)
        AS day_over_day_change,

    -- Tomorrow's revenue
    LEAD(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date)
        AS next_day_revenue

FROM gold.daily_store_revenue
WHERE order_date BETWEEN '2026-03-01' AND '2026-03-17'
ORDER BY store_id, order_date;`}</CodeBox>

        <CodeBox label="Real DE use case — detecting gaps in daily data">{`-- Careful with % change — LAG can be 0, so guard the division:
SELECT store_id, order_date, daily_revenue,
    CASE
        WHEN LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) IS NULL
          OR LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) = 0
        THEN NULL
        ELSE ROUND(
            (daily_revenue - LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date))
            / LAG(daily_revenue, 1) OVER (PARTITION BY store_id ORDER BY order_date) * 100, 2)
    END AS pct_change
FROM gold.daily_store_revenue;

-- Find dates where a store had no data at all (gap detection):
WITH store_dates AS (
    SELECT store_id, order_date,
        LEAD(order_date) OVER (PARTITION BY store_id ORDER BY order_date) AS next_date
    FROM gold.daily_store_revenue
)
SELECT store_id, order_date, next_date, next_date - order_date - 1 AS missing_days
FROM store_dates
WHERE next_date - order_date > 1   -- gap of more than 1 day
ORDER BY missing_days DESC;`}</CodeBox>

        <SubSubTitle>Running totals and moving averages</SubSubTitle>

        <CodeBox label="Cumulative sum, 7-day moving average, and rolling sum">{`SELECT store_id, order_date, daily_revenue,

    -- Running total (cumulative sum from start of partition to current row)
    SUM(daily_revenue) OVER (
        PARTITION BY store_id ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue,

    -- 7-day moving average (last 7 days including today)
    AVG(daily_revenue) OVER (
        PARTITION BY store_id ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d,

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
ORDER BY store_id, order_date;`}</CodeBox>

        <Output>{`ROWS vs RANGE — an important distinction:

ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  → exactly 6 rows before current row, regardless of value gaps
  → correct for "last 7 rows"

RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
  → all rows within the last 6 calendar days by value
  → correct for "last 7 calendar days" even if some days have no data
  → only works when ORDER BY column is DATE or TIMESTAMP

For moving averages over time series with gaps, RANGE is more correct.
For moving averages over sequences of rows, ROWS is more correct.`}</Output>

        <SubSubTitle>NTILE and PERCENT_RANK — distribution functions</SubSubTitle>

        <CodeBox label="Bucketing and percentile calculations">{`SELECT customer_id, total_spend_ytd,

    -- NTILE(n): divide rows into n equal-sized buckets (quartile/decile segmentation)
    NTILE(4) OVER (ORDER BY total_spend_ytd DESC) AS spend_quartile,
    -- 1 = top 25%, 2 = next 25%, 3 = next 25%, 4 = bottom 25%

    -- PERCENT_RANK: what percentile is this row in? (0.0 to 1.0)
    ROUND(PERCENT_RANK() OVER (ORDER BY total_spend_ytd) * 100, 1) AS percentile_rank,

    -- CUME_DIST: cumulative distribution (fraction of rows <= current)
    ROUND(CUME_DIST() OVER (ORDER BY total_spend_ytd) * 100, 1) AS cumulative_pct

FROM silver.customer_annual_stats
ORDER BY total_spend_ytd DESC;

-- REAL USE CASE: customer segmentation for marketing
SELECT customer_id, total_orders, total_spend_ytd,
    CASE NTILE(5) OVER (ORDER BY total_spend_ytd DESC)
        WHEN 1 THEN 'Platinum' WHEN 2 THEN 'Gold' WHEN 3 THEN 'Silver'
        WHEN 4 THEN 'Bronze'   WHEN 5 THEN 'Standard'
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

        <CodeBox label="BAD — nested subquery, unreadable and impossible to test in steps">{`SELECT s.store_name, ranked.daily_revenue, ranked.revenue_rank
FROM (
    SELECT store_id, SUM(order_amount) AS daily_revenue,
        RANK() OVER (ORDER BY SUM(order_amount) DESC) AS revenue_rank
    FROM (
        SELECT order_id, store_id, order_amount
        FROM silver.orders
        WHERE order_date = '2026-03-17' AND status = 'delivered'
    ) filtered
    GROUP BY store_id
) ranked
JOIN silver.stores s ON ranked.store_id = s.store_id
WHERE ranked.revenue_rank <= 5;`}</CodeBox>

        <CodeBox label="GOOD — the same query as a CTE chain, each step named and testable">{`WITH
-- Step 1: filter to the orders we care about
delivered_orders AS (
    SELECT order_id, store_id, order_amount
    FROM silver.orders
    WHERE order_date = '2026-03-17' AND status = 'delivered'
),
-- Step 2: aggregate by store
store_revenue AS (
    SELECT store_id, SUM(order_amount) AS daily_revenue, COUNT(*) AS order_count
    FROM delivered_orders
    GROUP BY store_id
),
-- Step 3: rank stores by revenue
ranked_stores AS (
    SELECT store_id, daily_revenue, order_count,
        RANK() OVER (ORDER BY daily_revenue DESC) AS revenue_rank
    FROM store_revenue
)
-- Final: join to store names and filter top 5
SELECT s.store_name, s.city, rs.daily_revenue, rs.order_count, rs.revenue_rank
FROM ranked_stores rs
JOIN silver.stores s ON rs.store_id = s.store_id
WHERE rs.revenue_rank <= 5
ORDER BY rs.revenue_rank;`}</CodeBox>

        <SubSubTitle>Building a full transformation pipeline in SQL</SubSubTitle>

        <CodeBox label="A typical dbt Gold model — base orders, cohort dates, delivered filter">{`WITH
-- Base: all orders in the analysis window
base_orders AS (
    SELECT o.order_id, o.customer_id, o.store_id, o.order_amount, o.status,
           o.order_date, o.created_at
    FROM silver.orders o
    WHERE o.order_date BETWEEN '2026-01-01' AND '2026-03-17'
      AND o.status IN ('delivered', 'cancelled')
),
-- Customer first order date (for cohort analysis)
customer_first_order AS (
    SELECT customer_id, MIN(order_date) AS first_order_date, MIN(order_id) AS first_order_id
    FROM base_orders
    WHERE status = 'delivered'
    GROUP BY customer_id
),
-- Delivered orders only (for revenue metrics)
delivered AS (
    SELECT * FROM base_orders WHERE status = 'delivered'
),`}</CodeBox>

        <CodeBox label="...continued — customer-level aggregation">{`customer_metrics AS (
    SELECT
        d.customer_id,
        COUNT(DISTINCT d.order_id) AS total_orders,
        SUM(d.order_amount)        AS total_revenue,
        AVG(d.order_amount)        AS avg_order_value,
        MAX(d.order_date)          AS last_order_date,
        COUNT(DISTINCT d.store_id) AS stores_visited,
        cfo.first_order_date,
        ('2026-03-17'::DATE - cfo.first_order_date) AS customer_age_days,
        -- Order frequency (orders per month since first order):
        ROUND(
            COUNT(DISTINCT d.order_id)::NUMERIC
            / GREATEST(('2026-03-17'::DATE - cfo.first_order_date) / 30.0, 1), 2
        ) AS orders_per_month
    FROM delivered d
    JOIN customer_first_order cfo USING (customer_id)
    GROUP BY d.customer_id, cfo.first_order_date
),`}</CodeBox>

        <CodeBox label="...continued — adding dimension attributes and value/recency segments">{`final AS (
    SELECT
        cm.*, c.customer_name, c.city, c.tier,
        CASE
            WHEN cm.total_revenue >= 50000 THEN 'high_value'
            WHEN cm.total_revenue >= 10000 THEN 'mid_value'
            ELSE 'low_value'
        END AS value_segment,
        CASE
            WHEN '2026-03-17'::DATE - cm.last_order_date <= 30 THEN 'active'
            WHEN '2026-03-17'::DATE - cm.last_order_date <= 90 THEN 'at_risk'
            ELSE 'churned'
        END AS recency_segment
    FROM customer_metrics cm
    JOIN silver.customers c USING (customer_id)
)
SELECT * FROM final;`}</CodeBox>

        <SubSubTitle>Recursive CTEs — for hierarchical and graph data</SubSubTitle>

        <CodeBox label="Traversing a product category hierarchy">{`-- categories table: (category_id, name, parent_category_id)
-- Root categories have parent_category_id = NULL

WITH RECURSIVE category_tree AS (
    -- Base case: start with root categories (no parent)
    SELECT category_id, name, parent_category_id,
           name AS full_path, 0 AS depth
    FROM silver.categories
    WHERE parent_category_id IS NULL

    UNION ALL

    -- Recursive case: join each category to its children
    SELECT c.category_id, c.name, c.parent_category_id,
           ct.full_path || ' > ' || c.name AS full_path,
           ct.depth + 1 AS depth
    FROM silver.categories c
    JOIN category_tree ct ON c.parent_category_id = ct.category_id
)
SELECT category_id, name, full_path, depth
FROM category_tree
ORDER BY full_path;`}</CodeBox>

        <Output>{`Electronics                              depth=0
Electronics > Phones                     depth=1
Electronics > Phones > Smartphones       depth=2
Electronics > Phones > Feature Phones    depth=2
Electronics > Laptops                    depth=1

GUARD AGAINST INFINITE LOOPS: add WHERE depth < 10 to the recursive case.
Some databases support a MAXRECURSION hint as an additional safeguard.`}</Output>
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
          that do not account for shared rows between sources. SQL deduplication
          using window functions is the standard, efficient approach — it handles
          all three scenarios below in a single pass without expensive self-joins.
        </Para>

        <SubSubTitle>Scenario 1 — exact duplicates (all columns identical)</SubSubTitle>

        <CodeBox label="Keeping one copy of each fully-identical row">{`SELECT DISTINCT * FROM silver.orders;
-- Simple but scans all rows and you cannot control which row is kept

-- Better with a CTE — explicit control over which copy survives:
WITH deduped AS (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY order_id, customer_id, amount, status) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn) FROM deduped WHERE rn = 1;
-- NOTE: SELECT * EXCLUDE (...) is Snowflake/DuckDB-specific syntax — it does
-- NOT exist in PostgreSQL. PostgreSQL-portable alternative: list columns
-- explicitly instead of *, e.g.
-- SELECT order_id, customer_id, store_id, order_amount, status, order_date,
--        created_at, updated_at
-- FROM deduped WHERE rn = 1;`}</CodeBox>

        <SubSubTitle>Scenario 2 — same key, keep the most recent version</SubSubTitle>

        <CodeBox label="Multiple rows share order_id — keep the latest updated_at">{`WITH deduped AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id          -- group by business key
            ORDER BY updated_at DESC       -- most recent first
        ) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn) FROM deduped WHERE rn = 1;
-- For each order_id, keeps exactly one row — the one with the latest updated_at
-- NOTE: EXCLUDE (...) is Snowflake/DuckDB only — not valid PostgreSQL syntax.
-- In PostgreSQL, list the columns you want explicitly instead of SELECT *, e.g.
-- SELECT order_id, customer_id, store_id, order_amount, status, updated_at
-- FROM deduped WHERE rn = 1;`}</CodeBox>

        <SubSubTitle>Scenario 3 — same key, keep the first seen version</SubSubTitle>

        <CodeBox label="Keep the original record, ignore later duplicates">{`WITH deduped AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id
            ORDER BY created_at ASC,    -- oldest first
                     ingested_at ASC    -- tiebreak by when the pipeline saw it
        ) AS rn
    FROM silver.orders
)
SELECT * EXCLUDE (rn) FROM deduped WHERE rn = 1;
-- NOTE: EXCLUDE (...) is Snowflake/DuckDB only, not valid PostgreSQL syntax.
-- PostgreSQL alternative — list columns explicitly instead of *:
-- SELECT order_id, customer_id, store_id, order_amount, status, created_at, ingested_at
-- FROM deduped WHERE rn = 1;`}</CodeBox>

        <SubSubTitle>Snowflake&rsquo;s QUALIFY, and cleaning up an existing table</SubSubTitle>

        <CodeBox label="QUALIFY skips the wrapping CTE entirely">{`-- Snowflake supports QUALIFY to filter on window function results directly:
SELECT *
FROM silver.orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1;
-- Cleaner than wrapping in a CTE — equivalent result`}</CodeBox>

        <CodeBox label="In-place deduplication of a table that already has duplicates">{`-- Step 1: identify rows to keep
CREATE TEMP TABLE orders_deduped AS
SELECT * EXCLUDE (rn)
FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
    FROM silver.orders
) t
WHERE rn = 1;
-- NOTE: SELECT * EXCLUDE (...) is Snowflake/DuckDB-specific — not valid PostgreSQL.
-- PostgreSQL alternative: list columns explicitly in the outer SELECT instead of *, e.g.
-- SELECT order_id, customer_id, store_id, order_amount, status, updated_at
-- FROM (...) t WHERE rn = 1;

-- Step 2: swap (truncate original, insert clean version)
BEGIN;
TRUNCATE silver.orders;
INSERT INTO silver.orders SELECT * FROM orders_deduped;
COMMIT;

-- Or use DELETE with a CTE (PostgreSQL / Snowflake):
WITH duplicates AS (
    SELECT ctid, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
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

        <SubSubTitle>Three-valued logic, and the silent WHERE-clause trap</SubSubTitle>

        <CodeBox label="NULL arithmetic, comparisons, and boolean logic">{`-- NULL arithmetic — results are always NULL
SELECT 380 + NULL;          -- NULL
SELECT NULL * 0;            -- NULL (not 0!)
SELECT 'hello' || NULL;     -- NULL (not 'hello')

-- NULL comparisons — never use = NULL
SELECT * FROM orders WHERE promo_code = NULL;   -- WRONG: returns 0 rows
SELECT * FROM orders WHERE promo_code IS NULL;  -- CORRECT

-- NULL in three-valued logic:
-- TRUE  AND NULL = NULL (not FALSE)     FALSE AND NULL = FALSE
-- TRUE  OR  NULL = TRUE                 FALSE OR  NULL = NULL (not FALSE)
-- NOT NULL       = NULL`}</CodeBox>

        <CodeBox label="Why WHERE silently drops NULL rows, and the fix">{`-- Consequence: WHERE clause excludes rows where the condition is NULL.
-- If promo_code is NULL, these rows are silently excluded:
SELECT * FROM orders WHERE promo_code != 'SAVE10';
-- Rows where promo_code IS NULL are NOT returned — they fail the != comparison

-- FIX:
SELECT * FROM orders WHERE promo_code != 'SAVE10' OR promo_code IS NULL;`}</CodeBox>

        <SubSubTitle>NULL in aggregations</SubSubTitle>

        <CodeBox label="NULLs are ignored by every aggregate function except COUNT(*)">{`SELECT
    COUNT(*)              AS total_rows,         -- counts ALL rows including NULL
    COUNT(promo_code)     AS rows_with_promo,    -- counts only non-NULL promo_code
    COUNT(*) - COUNT(promo_code) AS rows_without_promo,
    AVG(order_amount)     AS avg_amount,         -- NULL amounts excluded from avg
    SUM(discount_amount)  AS total_discount      -- NULL discounts IGNORED, not treated as 0
FROM silver.orders;

-- Safe pattern: use COALESCE to treat NULL as 0 in sums
SELECT SUM(COALESCE(discount_amount, 0)) AS total_discount FROM silver.orders;`}</CodeBox>

        <SubSubTitle>COALESCE and NULLIF</SubSubTitle>

        <CodeBox label="Returning a default, and turning a sentinel value into NULL">{`-- COALESCE: return the first non-NULL value
SELECT order_id,
    COALESCE(promo_code, 'NO_PROMO')  AS promo_code_safe,
    COALESCE(delivery_fee, 0)          AS delivery_fee_safe,
    COALESCE(notes, special_inst, '') AS display_notes  -- try notes, then special_inst, then ''
FROM silver.orders;

-- NULLIF: return NULL if the value equals a specific value — prevents /0 elegantly
SELECT store_id, total_revenue / NULLIF(total_orders, 0) AS avg_order_value
FROM gold.store_metrics;
-- if total_orders = 0, NULLIF returns NULL → NULL/anything = NULL (not a division error)

-- Clean up placeholder values:
SELECT NULLIF(phone_number, 'N/A') AS phone_clean FROM customers;`}</CodeBox>

        <SubSubTitle>NULL in JOINs</SubSubTitle>

        <CodeBox label="NULL join keys never match, and how to tell the two kinds of NULL apart">{`-- NULL = NULL is UNKNOWN, so NULL join keys never match
SELECT o.*, c.name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id;
-- If o.customer_id IS NULL → no match → c.name IS NULL in the result

-- Common mistake: assuming every LEFT JOIN null comes from a missing match.
-- Some come from a NULL join key in the left table itself — distinguish them:
SELECT o.order_id, o.customer_id, c.name,
    CASE
        WHEN o.customer_id IS NULL THEN 'null_key_in_orders'
        WHEN c.customer_id IS NULL THEN 'missing_customer'
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

        <SubSubTitle>UNION ALL vs. UNION</SubSubTitle>

        <CodeBox label="Combining rows, with and without deduplication">{`-- UNION ALL: include all rows from both queries (keeps duplicates)
-- Use UNION ALL by default — faster, no deduplication step
SELECT order_id, order_amount, 'online' AS channel FROM silver.online_orders
UNION ALL
SELECT order_id, order_amount, 'instore' AS channel FROM silver.instore_orders;

-- UNION (without ALL): deduplicate — removes rows that appear in both results
-- Slower — requires a sort or hash to find duplicates
SELECT customer_id FROM silver.email_subscribers
UNION
SELECT customer_id FROM silver.sms_subscribers;
-- Returns unique customer_ids who subscribed to either channel`}</CodeBox>

        <SubSubTitle>INTERSECT and EXCEPT</SubSubTitle>

        <CodeBox label="Rows in both queries, and rows in only the first">{`-- INTERSECT: rows that appear in BOTH queries
SELECT customer_id FROM silver.email_subscribers
INTERSECT
SELECT customer_id FROM silver.sms_subscribers;

-- Equivalent with JOIN (sometimes more explicit):
SELECT DISTINCT e.customer_id
FROM silver.email_subscribers e
INNER JOIN silver.sms_subscribers s USING (customer_id);

-- EXCEPT: rows in the first query but NOT in the second (MINUS in Oracle)
SELECT customer_id FROM silver.email_subscribers
EXCEPT
SELECT customer_id FROM silver.sms_subscribers;`}</CodeBox>

        <SubSubTitle>Real DE use cases — completeness checks and multi-source unions</SubSubTitle>

        <CodeBox label="Finding a pipeline gap with EXCEPT">{`-- Find order_ids in the source (PostgreSQL) but missing from the warehouse
SELECT order_id FROM source.orders WHERE order_date = '2026-03-17'
EXCEPT
SELECT order_id FROM silver.orders WHERE order_date = '2026-03-17';
-- Returns order_ids that were ingested but not yet in the warehouse.
-- If this returns rows: the pipeline has a gap.`}</CodeBox>

        <CodeBox label="Combining payments from multiple providers with UNION ALL">{`WITH all_payments AS (
    SELECT payment_id, merchant_id, amount, 'stripe' AS provider, created_at
    FROM silver.stripe_payments
    UNION ALL
    SELECT payment_id, merchant_id, amount, 'paypal' AS provider, created_at
    FROM silver.paypal_payments
    UNION ALL
    SELECT payment_id, merchant_id, amount, 'square' AS provider, created_at
    FROM silver.square_payments
)
SELECT provider, DATE_TRUNC('day', created_at) AS payment_date,
    COUNT(*) AS transaction_count, SUM(amount) AS total_volume
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

        <CodeBox label="SCD Type 1 — overwrite, no history preserved">{`-- Use when: you only care about current state, history is not needed
INSERT INTO silver.customers (customer_id, name, city, updated_at)
VALUES (4201938, 'Emily Johnson', 'Austin', NOW())
ON CONFLICT (customer_id)
DO UPDATE SET city = EXCLUDED.city, updated_at = EXCLUDED.updated_at;

-- PROBLEM: all historical analysis now shows Austin.
-- "How much did Emily spend while she lived in Seattle?" → impossible to answer.
-- Use SCD Type 2 if that question matters to the business.`}</CodeBox>

        <SubSubTitle>SCD Type 2 — table structure and the expire+insert steps</SubSubTitle>

        <CodeBox label="Full history preserved via versioned rows">{`CREATE TABLE silver.customers_scd2 (
    customer_sk    BIGSERIAL PRIMARY KEY,   -- surrogate key (new per version)
    customer_id    BIGINT    NOT NULL,      -- business key (same across versions)
    name           VARCHAR   NOT NULL,
    city           VARCHAR   NOT NULL,
    tier           VARCHAR   NOT NULL,
    valid_from     DATE      NOT NULL,      -- when this version became active
    valid_to       DATE,                    -- when this version expired (NULL = current)
    is_current     BOOLEAN   NOT NULL DEFAULT TRUE,
    UNIQUE (customer_id, valid_from)
);

-- STEP 1: expire the current row
UPDATE silver.customers_scd2
SET valid_to = CURRENT_DATE - INTERVAL '1 day', is_current = FALSE
WHERE customer_id = 4201938 AND is_current = TRUE;

-- STEP 2: insert the new version
INSERT INTO silver.customers_scd2
    (customer_id, name, city, tier, valid_from, valid_to, is_current)
VALUES
    (4201938, 'Emily Johnson', 'Austin', 'Gold', CURRENT_DATE, NULL, TRUE);`}</CodeBox>

        <SubSubTitle>Point-in-time queries, and the dbt snapshot equivalent</SubSubTitle>

        <CodeBox label="Joining a fact to the version that was active at the time">{`-- QUERY: "What city was Emily in when she placed order 9284751?"
SELECT c.city
FROM silver.orders o
JOIN silver.customers_scd2 c
  ON o.customer_id = c.customer_id
 AND o.order_date BETWEEN c.valid_from AND COALESCE(c.valid_to, '9999-12-31')
WHERE o.order_id = 9284751;
-- Returns 'Seattle' if placed before the move, 'Austin' if placed after

-- dbt snapshot pattern (generates SCD2 automatically):
-- {% snapshot customers_snapshot %}
-- {{ config(target_schema='snapshots', unique_key='customer_id',
--           strategy='check', check_cols=['city', 'tier']) }}
-- SELECT customer_id, name, city, tier FROM {{ source('prod', 'customers') }}
-- {% endsnapshot %}`}</CodeBox>

        <CodeBox label="SCD Type 3 — add column, limited history">{`-- Use when: you only need to track one change back (current + previous)
CREATE TABLE silver.customers_scd3 (
    customer_id      BIGINT  PRIMARY KEY,
    name             VARCHAR NOT NULL,
    current_tier     VARCHAR NOT NULL,
    previous_tier    VARCHAR,          -- NULL if never changed
    tier_changed_at  TIMESTAMPTZ,
    city             VARCHAR NOT NULL
);

UPDATE silver.customers_scd3
SET previous_tier = current_tier,   -- save current as previous
    current_tier   = 'Platinum',    -- set new current
    tier_changed_at = NOW()
WHERE customer_id = 4201938;

-- LIMITATION: only tracks one previous value. After a second change,
-- previous_tier is overwritten — cannot answer "two changes ago?"
-- Use SCD Type 2 for full history.`}</CodeBox>
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

        <SubSubTitle>Date truncation and arithmetic</SubSubTitle>

        <CodeBox label="DATE_TRUNC across warehouses, and PostgreSQL date arithmetic">{`SELECT order_id, created_at,
    DATE_TRUNC('day',   created_at) AS order_day,        -- 2026-03-17 00:00:00
    DATE_TRUNC('week',  created_at) AS order_week_start, -- 2026-03-16 (Monday)
    DATE_TRUNC('month', created_at) AS order_month,      -- 2026-03-01 00:00:00
    DATE_TRUNC('year',  created_at) AS order_year        -- 2026-01-01 00:00:00
FROM silver.orders;
-- Snowflake: DATE_TRUNC('month', created_at) — same syntax
-- BigQuery:  DATE_TRUNC(created_at, MONTH)   — arguments reversed!

SELECT
    CURRENT_DATE - INTERVAL '7 days'  AS week_ago,
    CURRENT_DATE + INTERVAL '30 days' AS thirty_ahead,
    EXTRACT(DOW FROM CURRENT_DATE)    AS day_of_week,   -- 0=Sunday, 6=Saturday
    EXTRACT(EPOCH FROM created_at)    AS unix_ts,       -- seconds since 1970
    CURRENT_DATE - order_date         AS days_since_order,
    AGE(CURRENT_DATE, order_date)     AS age_interval   -- interval '14 days'
FROM silver.orders;`}</CodeBox>

        <SubSubTitle>Common date-range patterns</SubSubTitle>

        <CodeBox label="Last 7 days, month-to-date, previous month, same day last year">{`-- Last 7 days (inclusive of today):
WHERE order_date >= CURRENT_DATE - INTERVAL '6 days'

-- Month-to-date:
WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE)
  AND order_date <  CURRENT_DATE + INTERVAL '1 day'

-- Previous full month:
WHERE order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND order_date <  DATE_TRUNC('month', CURRENT_DATE)

-- Last complete week (Monday–Sunday):
WHERE order_date >= DATE_TRUNC('week', CURRENT_DATE - INTERVAL '7 days')
  AND order_date <  DATE_TRUNC('week', CURRENT_DATE)`}</CodeBox>

        <SubSubTitle>Timezone handling</SubSubTitle>

        <CodeBox label="Converting UTC storage to local time for display only">{`-- Always work in UTC internally, convert to local time only for display

-- PostgreSQL:
SELECT order_id,
    created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/New_York' AS created_at_local
FROM silver.orders;

-- Snowflake:  SELECT CONVERT_TIMEZONE('UTC', 'America/New_York', created_at) ...
-- BigQuery:   SELECT DATETIME(created_at, 'America/New_York') ...

-- Safe local-day grouping (orders placed between midnight and midnight local time):
SELECT DATE(created_at AT TIME ZONE 'America/New_York') AS order_date_local,
    COUNT(*) AS order_count
FROM silver.orders
GROUP BY 1 ORDER BY 1;`}</CodeBox>

        <SubTitle>Cohort analysis — the classic date SQL challenge</SubTitle>

        <CodeBox label="Assigning cohorts, and listing every active month per customer">{`-- Monthly cohort retention: for each signup month cohort,
-- what % of customers are still ordering in month N?

WITH
-- Step 1: assign each customer to their signup cohort (month of first order)
cohort_assignment AS (
    SELECT customer_id, DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM silver.orders
    WHERE status = 'delivered'
    GROUP BY customer_id
),
-- Step 2: for each customer, list every month they had at least one order
active_months AS (
    SELECT DISTINCT customer_id, DATE_TRUNC('month', order_date) AS active_month
    FROM silver.orders
    WHERE status = 'delivered'
),`}</CodeBox>

        <CodeBox label="...continued — computing cohort_period and the retention percentage">{`-- Step 3: join and calculate cohort_period (0 = cohort month, 1 = one month later)
cohort_data AS (
    SELECT ca.cohort_month, am.active_month,
        EXTRACT(YEAR FROM AGE(am.active_month, ca.cohort_month)) * 12
        + EXTRACT(MONTH FROM AGE(am.active_month, ca.cohort_month)) AS cohort_period,
        COUNT(DISTINCT am.customer_id) AS customers_active
    FROM cohort_assignment ca
    JOIN active_months am USING (customer_id)
    WHERE am.active_month >= ca.cohort_month
    GROUP BY 1, 2, 3
),
-- Step 4: calculate cohort size (customers in month 0)
cohort_sizes AS (
    SELECT cohort_month, customers_active AS cohort_size
    FROM cohort_data WHERE cohort_period = 0
)
-- Final: retention rates
SELECT cd.cohort_month, cs.cohort_size, cd.cohort_period, cd.customers_active,
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

        <SubSubTitle>Reading EXPLAIN ANALYZE in PostgreSQL</SubSubTitle>

        <CodeBox label="A query plan, and the signals that matter">{`EXPLAIN ANALYZE
SELECT s.store_name, COUNT(*) AS order_count, SUM(o.amount) AS total_revenue
FROM silver.orders o
JOIN silver.stores s ON o.store_id = s.store_id
WHERE o.order_date >= '2026-01-01'
GROUP BY s.store_name;

-- Sample output:
-- HashAggregate (actual time=892ms rows=10)
--   ->  Hash Join (actual time=24ms rows=482k)
--         ->  Index Scan using idx_orders_date on orders o (rows=482193)
--         ->  Hash -> Seq Scan on stores s (rows=10)
-- Execution Time: 896 ms`}</CodeBox>

        <Output>{`KEY THINGS TO LOOK FOR:
"Seq Scan" on a large table       → likely missing index
"Index Scan"                      → index is being used ✓
"Hash Join"                       → joining medium tables efficiently ✓
"Nested Loop" on large tables      → may be slow
rows estimate vs actual differing by 10×+  → stale statistics
high "actual time" on one node     → that node is the bottleneck`}</Output>

        <SubSubTitle>Reading EXPLAIN in Snowflake</SubSubTitle>

        <CodeBox label="Snowflake uses micro-partition pruning, not traditional indexes">{`EXPLAIN
SELECT store_name, SUM(amount) FROM orders WHERE order_date >= '2026-01-01'
GROUP BY store_name;

-- Look for in Snowflake:
--   "Partition pruning: 847 of 1024 partitions pruned" → filter is working ✓
--   "TableScan: ALL PARTITIONS" → no pruning → check clustering key
--   "SpillToLocalStorage" → query is spilling — increase warehouse size or
--                           rewrite the query to reduce intermediate result size`}</CodeBox>

        <SubSubTitle>Ten impactful optimisation rules — 1 through 5</SubSubTitle>

        <CodeBox label="Filter early, avoid SELECT *, don't wrap indexed columns, prefer JOINs, COUNT(*)">{`-- 1. FILTER EARLY — push WHERE conditions as early as possible in CTEs
-- GOOD: filter before the JOIN, reducing rows joining
WITH recent_orders AS (SELECT * FROM orders WHERE order_date >= '2026-03-01')
SELECT * FROM recent_orders o JOIN customers c USING (customer_id);

-- 2. AVOID SELECT * — on columnar warehouses it reads every column,
-- negating the columnar benefit
SELECT order_id, customer_id, amount FROM orders;

-- 3. AVOID FUNCTIONS ON INDEXED/FILTERED COLUMNS — prevents index/pruning use
-- BAD:  WHERE EXTRACT(YEAR FROM order_date) = 2026    (full scan!)
-- GOOD: WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01'

-- 4. USE JOINS INSTEAD OF CORRELATED SUBQUERIES — a correlated subquery
-- runs once per outer row; a JOIN runs once.

-- 5. COUNT(*) is the SQL standard — no practical difference from COUNT(1)
-- in modern databases. Use COUNT(*).`}</CodeBox>

        <SubSubTitle>Ten impactful optimisation rules — 6 through 10</SubSubTitle>

        <CodeBox label="Avoid unneeded DISTINCT, materialise reused CTEs, prune partitions, join order, approximation">{`-- 6. AVOID DISTINCT WHEN NOT NEEDED — it triggers an extra sort/hash step.
-- If the join is known to produce unique rows, omit DISTINCT.

-- 7. MATERIALISE INTERMEDIATE CTEs for reuse in Snowflake / BigQuery —
-- a CTE referenced multiple times may be re-executed each time
-- (database-dependent). Use CREATE TEMP TABLE for CTEs referenced >once
-- in complex queries.

-- 8. PARTITION PRUNING — always filter on partition columns. Without a
-- partition filter: full table scan regardless of other filters.

-- 9. JOIN ORDER — put the smaller table on the right in HASH JOINs.
-- Most optimisers (PostgreSQL) handle this automatically; for very large
-- tables in Snowflake/BigQuery, hint with the smaller table on the right.

-- 10. APPROXIMATE FUNCTIONS for exploration on very large datasets:
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM orders;              -- Snowflake
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM orders;              -- BigQuery (simplest option)

-- BigQuery's HLL_COUNT functions expose the underlying sketch — useful when you
-- want to pre-compute one sketch per partition (e.g. per day) and merge them
-- later without rescanning raw data. HLL_COUNT.INIT must run in an inner query,
-- producing one sketch per group; HLL_COUNT.MERGE aggregates those sketches in
-- an outer query — the two cannot be nested inside each other at the same level:
SELECT HLL_COUNT.MERGE(daily_sketch) AS approx_distinct_customers
FROM (
    SELECT order_date, HLL_COUNT.INIT(customer_id) AS daily_sketch
    FROM orders
    GROUP BY order_date
);
-- Typically within 1–2% of the exact count, but runs much faster.`}</CodeBox>
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

        <SubSubTitle>JSON / semi-structured data, and array handling</SubSubTitle>

        <CodeBox label="Three warehouses, three JSON path syntaxes and array-unpacking styles">{`-- PostgreSQL:
SELECT payload->>'order_id' AS order_id, (payload->>'amount')::DECIMAL
FROM orders WHERE payload IS NOT NULL;

-- Snowflake (VARIANT column):
SELECT payload:order_id::INTEGER          AS order_id,
       payload:customer.city::VARCHAR     AS city,        -- nested path
       payload:items[0]:name::VARCHAR     AS first_item   -- array index
FROM orders;

-- BigQuery (JSON column):
SELECT JSON_VALUE(payload, '$.order_id') AS order_id,
       JSON_VALUE(payload, '$.customer.city') AS city
FROM orders;

-- ARRAY UNPACKING:
SELECT order_id, UNNEST(items) AS item FROM orders;                    -- PostgreSQL
SELECT o.order_id, f.value:item_name::VARCHAR FROM orders o,
       LATERAL FLATTEN(input => o.items) f;                            -- Snowflake
SELECT order_id, item FROM orders, UNNEST(items) AS item;              -- BigQuery`}</CodeBox>

        <SubSubTitle>QUALIFY, string functions, and regex</SubSubTitle>

        <CodeBox label="Filtering window results, concatenation, splitting, and pattern matching">{`-- PostgreSQL requires a CTE to filter on a window function:
WITH ranked AS (SELECT *, ROW_NUMBER() OVER (...) AS rn FROM orders)
SELECT * FROM ranked WHERE rn = 1;

-- Snowflake / BigQuery — QUALIFY filters window results directly:
SELECT * FROM orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1;

-- String splitting:
-- PostgreSQL/Snowflake: SPLIT_PART(str, delimiter, field_number)
-- BigQuery:             SPLIT(str, delimiter)[OFFSET(0)]  — returns an array

-- Regex:
-- PostgreSQL: ~ for match, regexp_replace(), regexp_extract()
-- Snowflake:  REGEXP_LIKE(), REGEXP_REPLACE(), REGEXP_SUBSTR()
-- BigQuery:   REGEXP_CONTAINS(), REGEXP_REPLACE(), REGEXP_EXTRACT()`}</CodeBox>

        <SubSubTitle>Date functions and row limiting</SubSubTitle>

        <CodeBox label="The same operation, three different function names">{`-- Date truncation — BigQuery reverses the argument order:
DATE_TRUNC('month', ts)         -- PostgreSQL, Snowflake
DATE_TRUNC(ts, MONTH)           -- BigQuery — reversed!

-- Adding intervals:
ts + INTERVAL '7 days'          -- PostgreSQL
DATEADD('day', 7, ts)           -- Snowflake
DATE_ADD(ts, INTERVAL 7 DAY)    -- BigQuery

-- Limiting rows:
SELECT * FROM orders LIMIT 10;                    -- PostgreSQL, Snowflake, BigQuery
SELECT TOP 10 * FROM orders;                       -- SQL Server / Redshift (also supports LIMIT)
SELECT * FROM orders FETCH FIRST 10 ROWS ONLY;     -- SQL standard`}</CodeBox>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About SQL for Data Engineering</SectionTitle>

        {[
          {
            wrong: '"A window function is basically a GROUP BY with extra syntax"',
            right: 'Part 02 draws the actual distinction: GROUP BY collapses rows into one per group, while a window function returns a value on every individual row without collapsing anything — that\'s exactly why "each order alongside its store\'s total revenue" is trivial with a window function and impossible with GROUP BY alone.',
          },
          {
            wrong: '"RANK() is fine for deduplication — it and ROW_NUMBER() do basically the same thing"',
            right: 'Part 02 and Part 04 are both explicit that RANK() can return more than one row per group when values tie, while ROW_NUMBER() guarantees exactly one — deduplication logic that uses RANK() silently keeps duplicate rows whenever a tie happens to occur.',
          },
          {
            wrong: '"SUM() and AVG() treat NULL the same way COALESCE(x, 0) would"',
            right: 'Part 05 spells out the actual behavior: aggregate functions IGNORE NULLs rather than counting them as zero — SUM(discount_amount) on a column with NULLs silently produces a smaller total than expected, which is a different bug than treating NULL as 0 would be.',
          },
          {
            wrong: '"UNION is the safe default when combining data from multiple sources"',
            right: 'Part 06 is explicit that UNION ALL should be the default in data pipelines — UNION\'s deduplication can silently drop a legitimate record from one source that happens to share every column value with a record from another, which is exactly the kind of coincidental collision multi-source payment data can produce.',
          },
          {
            wrong: '"WHERE status != \'cancelled\' returns every non-cancelled row"',
            right: 'Part 05 and this module\'s Interview Prep Q4 both walk through the same trap: because NULL != anything evaluates to NULL rather than TRUE, any row where status IS NULL is silently excluded from that filter — the query looks like it means "everything except cancelled" but actually means "everything except cancelled and anything with unknown status."',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 11 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
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

          <SubSubTitle>Base and daily aggregation</SubSubTitle>

          <CodeBox label="gold/daily_store_category_metrics.sql — steps 1-2">{`-- Refresh: daily at 06:00 AM ET

WITH
-- Step 1: Base — delivered orders in the analysis window,
-- filter pushed down to Silver before any aggregation
base AS (
    SELECT o.order_id, o.store_id, p.category, o.order_amount,
        DATE(o.created_at AT TIME ZONE 'America/New_York') AS order_date
    FROM silver.orders o
    JOIN silver.order_items oi ON o.order_id = oi.order_id
    JOIN silver.products p    ON oi.product_id = p.product_id
    WHERE o.status = 'delivered'
      AND o.created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 months')
    -- 2 months back to support MoM comparisons
),
-- Step 2: Daily aggregation by store + category
daily_agg AS (
    SELECT store_id, category, order_date,
        COUNT(DISTINCT order_id) AS order_count,
        SUM(order_amount)        AS daily_revenue
    FROM base
    GROUP BY 1, 2, 3
),`}</CodeBox>

          <SubSubTitle>The window function layer</SubSubTitle>

          <CodeBox label="...continued — step 3, running totals, day-over-day, and ranking">{`-- Step 3: Window function layer — running totals, comparisons, rankings
enriched AS (
    SELECT store_id, category, order_date, order_count, daily_revenue,

        -- Running month-to-date revenue
        SUM(daily_revenue) OVER (
            PARTITION BY store_id, category, DATE_TRUNC('month', order_date)
            ORDER BY order_date
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS mtd_revenue,

        -- Day-over-day revenue change
        daily_revenue - COALESCE(LAG(daily_revenue) OVER (
            PARTITION BY store_id, category ORDER BY order_date
        ), 0) AS dod_revenue_change,

        -- 7-day moving average
        ROUND(AVG(daily_revenue) OVER (
            PARTITION BY store_id, category ORDER BY order_date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2) AS moving_avg_7d,

        -- Rank within category on each day (which store performed best?)
        RANK() OVER (
            PARTITION BY category, order_date ORDER BY daily_revenue DESC
        ) AS store_rank_in_category

    FROM daily_agg
),`}</CodeBox>

          <SubSubTitle>Final dimension join</SubSubTitle>

          <CodeBox label="...continued — step 4, adding store attributes">{`final AS (
    SELECT e.*, s.store_name, s.city, s.store_manager
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
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
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

Note: SELECT * EXCLUDE (...) is Snowflake/DuckDB-specific syntax — it does not exist in PostgreSQL. In PostgreSQL, list the columns you want explicitly instead of using *: SELECT order_id, customer_id, store_id, order_amount, status, updated_at FROM deduped WHERE rn = 1.

The choice of ORDER BY inside the window determines which copy is kept. DESC on updated_at keeps the most recently modified version. ASC keeps the earliest version. Adding a secondary sort on ingested_at as a tiebreaker handles cases where multiple versions have identical timestamps.

In Snowflake, QUALIFY simplifies this to a single SELECT without a wrapping CTE: SELECT * FROM silver.orders QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1.

The key distinction to understand: ROW_NUMBER should be used for deduplication rather than RANK or DENSE_RANK, because ROW_NUMBER guarantees exactly one row per partition group regardless of ties. RANK can return multiple rows with rank=1 when two rows tie on the ORDER BY column.`,
          },
          {
            q: 'Q3. Explain SCD Type 2. Write the SQL to insert a new version of a customer record when their city changes.',
            a: `A Slowly Changing Dimension Type 2 tracks the full history of changes to a dimension by adding a new row for each change rather than overwriting the existing row. Each row in the table represents one version of the entity during a specific time period.

The table has three metadata columns: valid_from (the date this version became active), valid_to (the date this version was superseded — NULL for the current version), and is_current (a boolean flag for easy filtering of current records).

When a customer's city changes from Seattle to Austin, two operations are needed in a single transaction. First, expire the currently active row by setting valid_to to yesterday's date and is_current to FALSE. Second, insert a new row with the new city, valid_from set to today's date, valid_to set to NULL, and is_current set to TRUE.

UPDATE silver.customers_scd2
SET valid_to = CURRENT_DATE - 1, is_current = FALSE
WHERE customer_id = 4201938 AND is_current = TRUE;

INSERT INTO silver.customers_scd2 (customer_id, name, city, valid_from, valid_to, is_current)
VALUES (4201938, 'Emily Johnson', 'Austin', CURRENT_DATE, NULL, TRUE);

The value of this pattern becomes clear when you need to answer time-sensitive questions. To find the city a customer lived in when they placed a specific order, join the order to the SCD2 table on both customer_id and the condition that the order date falls within the row's valid_from to valid_to range. This correctly returns Seattle for orders placed before the move and Austin for orders placed after.

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

Second, correctness for source combination: when you are combining data from multiple sources into one unified table — all payments from Stripe, Square, and Venmo into a single payments table — you typically want all records from all sources. A legitimate payment in Stripe that happens to have the same amount and timestamp as a Square payment would be silently removed by UNION but correctly preserved by UNION ALL.

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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Wrapping every window function call in its own repeated OVER (...) instead of naming it once',
            a: 'Part 02\'s LAG examples show this compounding fast — the same PARTITION BY store_id ORDER BY order_date gets typed three or four times in one query. It works, but it\'s also exactly how a day-over-day calculation quietly drifts out of sync with the row it\'s supposed to compare against when only one copy gets edited.',
          },
          {
            q: 'Reaching for a nested subquery instead of a CTE chain when a query has more than one logical step',
            a: 'Part 03\'s BAD/GOOD comparison is built specifically to make this visible — the nested version and the CTE version return identical results, but only the CTE chain lets you test step 2 in isolation or hand the query to a reviewer who can follow it without mentally un-nesting three levels of parentheses.',
          },
          {
            q: 'Assuming SUM() or AVG() over a column with NULLs is equivalent to treating those NULLs as zero',
            a: 'Part 05 is explicit that aggregate functions ignore NULLs rather than substituting zero — a revenue total can look "off by a suspiciously small amount" for months before anyone notices, which is exactly the failure mode in this module\'s Error Library\'s first entry.',
          },
          {
            q: 'Filtering with a plain != or NOT IN on a column that can contain NULL',
            a: 'Part 05 and Interview Prep Q4 both walk through the same silent trap: three-valued logic makes NULL != x evaluate to NULL, not TRUE, so those rows vanish from the result with no error and no warning. Add OR column IS NULL explicitly whenever NULL is a real possibility.',
          },
          {
            q: 'Defaulting to UNION instead of UNION ALL when combining rows from multiple sources',
            a: 'Part 06 and this module\'s Misconceptions section both flag the same risk — UNION\'s deduplication can silently drop a genuinely distinct record from one source that happens to match another source\'s row on every visible column, which is a real risk when combining payment data from multiple providers.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
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
        'DATE_TRUNC is the standard way to group by time period. Always use TIMESTAMPTZ for event timestamps and convert to local time (AT TIME ZONE "America/New_York") only for display, not for storage. BigQuery reverses the argument order of DATE_TRUNC — a common cross-warehouse bug.',
        'Query optimisation priorities: filter early in CTEs to reduce rows before joins, avoid SELECT *, never apply functions to indexed columns in WHERE (prevents index use), prefer JOINs over correlated subqueries, always filter on partition columns in cloud warehouses.',
        'UNION ALL is almost always the right choice over UNION. UNION ALL is faster (no deduplication step) and preserves all records from all sources. Use UNION only when you explicitly want distinct values across two sets. When deduplication is needed, do it explicitly with ROW_NUMBER rather than implicitly with UNION.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 16 covers the Linux terminal for data engineers — navigating the file system, processing files with grep, awk, and sed, writing bash scripts, and monitoring running processes.
        </p>
        <Link href="/learn/data-engineering/linux-shell" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 16 → Linux and Shell Scripting for Data Engineers
        </Link>
      </div>
    </LearnLayout>
  )
}
