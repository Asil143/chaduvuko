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

const WinCard = ({ fn, color, returns, syntax, use }: {
  fn: string; color: string; returns: string; syntax: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}25`, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
    <div style={{ padding: '10px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color }}>{fn}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)' }}>→ {returns}</span>
    </div>
    <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Syntax</p>
        <code style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text)', lineHeight: 1.6 }}>{syntax}</code>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use for</p>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{use}</p>
      </div>
    </div>
  </div>
);

export default function WindowFunctionsIntro() {
  return (
    <LearnLayout
      title="Window Functions"
      description="Compute aggregates across related rows without collapsing them — ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG, LEAD, running totals, moving averages, and the PARTITION BY / ORDER BY frame"
      section="SQL — Module 51"
      readTime="40 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Window Functions Are — and Why They Change Everything" />

      <P>Standard aggregate functions (SUM, AVG, COUNT) collapse a group of rows into one row. This is useful but limiting — you can compute the total revenue per store, but you lose the individual order rows. Window functions break this constraint. They <Hl>compute an aggregate across a set of related rows while keeping every row in the result</Hl>.</P>

      <P>This single capability — computing group-level metrics alongside individual row data — unlocks an entire class of analytical queries that are either impossible or extremely verbose without window functions: ranking rows within groups, computing running totals, finding each row's value relative to the previous row, and identifying what percentage of the total each row represents.</P>

      <CodeBlock
        label="Aggregate vs window function — the defining difference"
        code={`-- AGGREGATE: collapses rows — loses individual order detail
SELECT store_id, ROUND(AVG(total_amount), 2) AS avg_order
FROM orders WHERE order_status = 'Delivered'
GROUP BY store_id;
-- Result: 10 rows (one per store) — individual orders gone

-- WINDOW FUNCTION: keeps all rows — adds the aggregate alongside
SELECT
  order_id,
  store_id,
  total_amount,
  ROUND(AVG(total_amount) OVER (PARTITION BY store_id), 2) AS store_avg
FROM orders WHERE order_status = 'Delivered';
-- Result: all order rows — each row has its store's average attached
-- No GROUP BY needed — no rows collapsed

-- The OVER() clause is what makes it a window function
-- Everything between OVER( and ) defines the window`}
      />

      <SQLPlayground
        initialQuery={`-- Side-by-side comparison: GROUP BY vs window function
-- Window function keeps all rows AND adds the per-store average
SELECT
  order_id,
  store_id,
  order_date,
  total_amount,
  ROUND(AVG(total_amount) OVER (PARTITION BY store_id), 2)  AS store_avg,
  ROUND(total_amount - AVG(total_amount) OVER (PARTITION BY store_id), 2) AS vs_avg,
  ROUND(SUM(total_amount) OVER (), 2)                        AS grand_total,
  ROUND(total_amount / SUM(total_amount) OVER () * 100, 1)  AS pct_of_total
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, total_amount DESC
LIMIT 12;`}
        height={235}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The OVER() Clause — Defining the Window" />

      <P>The OVER() clause is the heart of every window function. It defines three things: which rows belong to the same group (<Hl>PARTITION BY</Hl>), how those rows are ordered within the group (<Hl>ORDER BY</Hl>), and which subset of the ordered rows to include in the calculation (<Hl>frame clause</Hl> — ROWS or RANGE BETWEEN).</P>

      <CodeBlock
        label="OVER() clause anatomy"
        code={`function_name() OVER (
  PARTITION BY col1, col2    -- optional: split into groups (like GROUP BY but keeps rows)
  ORDER BY col3 DESC         -- optional: order rows within each partition
  ROWS BETWEEN               -- optional: frame (which rows in the partition to include)
    UNBOUNDED PRECEDING      --   from the first row of the partition
    AND CURRENT ROW          --   to the current row
)

-- Examples:
AVG(total_amount) OVER ()
-- No PARTITION BY: one window = all rows
-- No ORDER BY: unordered window
-- No frame: defaults to all rows in the partition

AVG(total_amount) OVER (PARTITION BY store_id)
-- Partition: one window per store_id value
-- Within each store: average of all its rows

AVG(total_amount) OVER (PARTITION BY store_id ORDER BY order_date)
-- Partition: one window per store
-- Ordered by date: with ORDER BY, default frame becomes RANGE BETWEEN
--   UNBOUNDED PRECEDING AND CURRENT ROW
-- Effect: running average up to and including the current row's date

SUM(total_amount) OVER (
  PARTITION BY store_id
  ORDER BY order_date
  ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
)
-- 7-row rolling sum: current row + 6 rows before it, within each store`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate OVER() variants on the same data
SELECT
  store_id,
  order_date,
  total_amount,

  -- No partition: window = all rows
  ROUND(AVG(total_amount) OVER (), 2)                        AS overall_avg,

  -- Partition by store: window = all rows for this store
  ROUND(AVG(total_amount) OVER (PARTITION BY store_id), 2)   AS store_avg,

  -- Partition + order: running average per store
  ROUND(AVG(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date
  ), 2)                                                       AS running_store_avg,

  -- Running total per store
  ROUND(SUM(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                                       AS running_store_total

FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, order_date
LIMIT 12;`}
        height={270}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Ranking Functions — ROW_NUMBER, RANK, DENSE_RANK, NTILE" />

      <WinCard
        fn="ROW_NUMBER()"
        color={C}
        returns="unique integer 1, 2, 3, ... per partition"
        syntax="ROW_NUMBER() OVER (PARTITION BY col ORDER BY col)"
        use="Deduplicate (keep row 1 per group), assign unique sequential IDs, paginate results"
      />
      <WinCard
        fn="RANK()"
        color="#10b981"
        returns="rank with gaps (1, 1, 3, 4...)"
        syntax="RANK() OVER (PARTITION BY col ORDER BY col DESC)"
        use="Leaderboards where ties share a rank and the next rank skips (like Olympic medals)"
      />
      <WinCard
        fn="DENSE_RANK()"
        color="#8b5cf6"
        returns="rank without gaps (1, 1, 2, 3...)"
        syntax="DENSE_RANK() OVER (PARTITION BY col ORDER BY col DESC)"
        use="Rankings where ties share a rank but the next rank does not skip"
      />
      <WinCard
        fn="NTILE(n)"
        color="#f97316"
        returns="bucket number 1 through n"
        syntax="NTILE(4) OVER (ORDER BY col)"
        use="Split rows into n equal-size buckets (quartiles, deciles, percentiles)"
      />

      <H>ROW_NUMBER — unique sequential number per partition</H>

      <SQLPlayground
        initialQuery={`-- ROW_NUMBER: each order gets a unique sequential number within its store
SELECT
  store_id,
  order_id,
  order_date,
  total_amount,
  ROW_NUMBER() OVER (
    PARTITION BY store_id
    ORDER BY total_amount DESC
  ) AS rank_in_store
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, rank_in_store;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- ROW_NUMBER for deduplication: keep only the most recent order per customer
SELECT customer_id, order_id, order_date, total_amount, order_status
FROM (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY order_date DESC, order_id DESC
    ) AS rn
  FROM orders
) AS ranked
WHERE rn = 1      -- keep only the most recent order per customer
ORDER BY customer_id;`}
        height={210}
        showSchema={false}
      />

      <H>RANK vs DENSE_RANK — handling ties differently</H>

      <SQLPlayground
        initialQuery={`-- RANK vs DENSE_RANK: see how ties are handled differently
SELECT
  store_id,
  total_amount,
  -- RANK: tied rows share rank, next rank SKIPS
  RANK() OVER (ORDER BY total_amount DESC)        AS rank_with_gaps,
  -- DENSE_RANK: tied rows share rank, next rank does NOT skip
  DENSE_RANK() OVER (ORDER BY total_amount DESC)  AS dense_rank_no_gaps,
  -- ROW_NUMBER: no ties — every row gets a unique number
  ROW_NUMBER() OVER (ORDER BY total_amount DESC)  AS unique_row_num
FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount DESC
LIMIT 10;`}
        height={215}
        showSchema={false}
      />

      <H>NTILE — split into equal buckets</H>

      <SQLPlayground
        initialQuery={`-- NTILE(4): assign each order to one of 4 quartiles by total_amount
SELECT
  order_id,
  store_id,
  total_amount,
  NTILE(4) OVER (ORDER BY total_amount)           AS quartile,
  CASE NTILE(4) OVER (ORDER BY total_amount)
    WHEN 1 THEN 'Q1 Bottom 25%'
    WHEN 2 THEN 'Q2 Lower-mid 25%'
    WHEN 3 THEN 'Q3 Upper-mid 25%'
    WHEN 4 THEN 'Q4 Top 25%'
  END                                             AS quartile_label
FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount
LIMIT 12;`}
        height={220}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Top-N Per Group — The Essential Pattern" />

      <P>The most frequently used window function pattern in production analytics: find the top N rows within each group. ROW_NUMBER assigns ranks within each partition; a wrapping query filters to the top N. This is cleaner and more flexible than any alternative.</P>

      <SQLPlayground
        initialQuery={`-- Top 2 orders by value per store
SELECT store_id, order_id, order_date, total_amount, store_rank
FROM (
  SELECT
    store_id,
    order_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (
      PARTITION BY store_id
      ORDER BY total_amount DESC
    ) AS store_rank
  FROM orders
  WHERE order_status = 'Delivered'
) AS ranked
WHERE store_rank <= 2
ORDER BY store_id, store_rank;`}
        height={225}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Most expensive product in each category
SELECT product_name, category, unit_price, margin_pct, cat_rank
FROM (
  SELECT
    product_name,
    category,
    unit_price,
    ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1) AS margin_pct,
    RANK() OVER (
      PARTITION BY category
      ORDER BY unit_price DESC
    ) AS cat_rank
  FROM products
  WHERE in_stock = true
) AS ranked
WHERE cat_rank = 1
ORDER BY unit_price DESC;`}
        height={225}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Top 3 customers by lifetime value per loyalty tier
SELECT full_name, loyalty_tier, lifetime_value, tier_rank
FROM (
  SELECT
    c.first_name || ' ' || c.last_name              AS full_name,
    c.loyalty_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0)      AS lifetime_value,
    ROW_NUMBER() OVER (
      PARTITION BY c.loyalty_tier
      ORDER BY SUM(o.total_amount) DESC NULLS LAST
    )                                               AS tier_rank
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
) AS ranked
WHERE tier_rank <= 3
ORDER BY loyalty_tier, tier_rank;`}
        height={255}
        showSchema={false}
      />

      <Callout type="info">
        Window functions cannot be referenced in WHERE of the same query that defines them — WHERE is evaluated before SELECT. Always wrap the window function in a subquery or CTE, then filter in the outer WHERE. This is the standard top-N pattern: inner query computes ranks, outer query filters WHERE rank &lt;= N.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Aggregate Window Functions — SUM, AVG, COUNT with OVER()" />

      <P>All standard aggregate functions work as window functions when paired with OVER(). They compute the aggregate over the defined window while keeping every row. This is the mechanism for running totals, percentage-of-total, and comparing each row to its group's aggregate.</P>

      <H>Running total and running average</H>

      <SQLPlayground
        initialQuery={`-- Running total of revenue per store over time
SELECT
  store_id,
  order_date,
  total_amount,
  ROUND(SUM(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                         AS running_total,
  ROUND(AVG(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                         AS running_avg,
  ROW_NUMBER() OVER (
    PARTITION BY store_id
    ORDER BY order_date
  )                                             AS order_num_in_store
FROM orders
WHERE order_status = 'Delivered'
  AND store_id = 'ST001'
ORDER BY order_date;`}
        height={255}
        showSchema={true}
      />

      <H>Percentage of total</H>

      <SQLPlayground
        initialQuery={`-- Each order as a percentage of its store's total revenue
SELECT
  o.store_id,
  o.order_id,
  o.total_amount,
  ROUND(SUM(o.total_amount) OVER (PARTITION BY o.store_id), 2)  AS store_total,
  ROUND(
    o.total_amount
    / SUM(o.total_amount) OVER (PARTITION BY o.store_id) * 100
  , 1)                                                           AS pct_of_store,
  ROUND(
    o.total_amount
    / SUM(o.total_amount) OVER () * 100
  , 1)                                                           AS pct_of_all
FROM orders AS o
WHERE o.order_status = 'Delivered'
ORDER BY o.store_id, o.total_amount DESC
LIMIT 12;`}
        height={240}
        showSchema={false}
      />

      <H>Comparing each row to its group aggregate</H>

      <SQLPlayground
        initialQuery={`-- Each product's price vs its category average and max
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  ROUND(AVG(p.unit_price) OVER (PARTITION BY p.category), 2)    AS cat_avg,
  MAX(p.unit_price) OVER (PARTITION BY p.category)              AS cat_max,
  ROUND(p.unit_price - AVG(p.unit_price) OVER (PARTITION BY p.category), 2) AS vs_avg,
  CASE
    WHEN p.unit_price = MAX(p.unit_price) OVER (PARTITION BY p.category)
    THEN '🏆 Most expensive'
    WHEN p.unit_price > AVG(p.unit_price) OVER (PARTITION BY p.category)
    THEN '↑ Above avg'
    ELSE '↓ Below avg'
  END                                                            AS position
FROM products AS p
ORDER BY p.category, p.unit_price DESC;`}
        height={250}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="LAG and LEAD — Accessing Adjacent Rows" />

      <P>LAG and LEAD access a value from a row that is N positions before or after the current row within the window. They are the essential functions for period-over-period comparison — comparing each row to the previous row without a self-join.</P>

      <CodeBlock
        label="LAG and LEAD syntax"
        code={`-- LAG: value from N rows BEFORE the current row
LAG(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)
LAG(total_amount)        -- previous row's value (offset defaults to 1)
LAG(total_amount, 1, 0)  -- previous row, default 0 if no previous row exists
LAG(total_amount, 2)     -- 2 rows back

-- LEAD: value from N rows AFTER the current row
LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)
LEAD(order_date)         -- next row's date
LEAD(total_amount, 1, 0) -- next row's amount, default 0 if no next row

-- Both return NULL for rows where no prior/next row exists
-- Use the default parameter to substitute a value instead of NULL`}
      />

      <SQLPlayground
        initialQuery={`-- Month-over-month revenue change using LAG
WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date)::DATE          AS month_start,
    ROUND(SUM(total_amount), 2)                    AS revenue,
    COUNT(*)                                       AS order_count
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  month_start,
  revenue,
  order_count,
  LAG(revenue) OVER (ORDER BY month_start)        AS prev_month_revenue,
  ROUND(revenue - LAG(revenue) OVER (ORDER BY month_start), 2) AS mom_change,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month_start))
    / NULLIF(LAG(revenue) OVER (ORDER BY month_start), 0) * 100
  , 1)                                            AS mom_pct_change
FROM monthly
ORDER BY month_start;`}
        height={255}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Each order compared to the previous order for the same customer
SELECT
  o.customer_id,
  o.order_id,
  o.order_date,
  o.total_amount,
  LAG(o.total_amount) OVER (
    PARTITION BY o.customer_id
    ORDER BY o.order_date, o.order_id
  )                                               AS prev_order_amount,
  LAG(o.order_date) OVER (
    PARTITION BY o.customer_id
    ORDER BY o.order_date, o.order_id
  )                                               AS prev_order_date,
  -- Days between orders
  o.order_date - LAG(o.order_date) OVER (
    PARTITION BY o.customer_id
    ORDER BY o.order_date, o.order_id
  )                                               AS days_since_prev_order
FROM orders AS o
WHERE o.order_status = 'Delivered'
ORDER BY o.customer_id, o.order_date
LIMIT 12;`}
        height={265}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- LEAD: show each order alongside the NEXT order date (repeat purchase gap)
SELECT
  customer_id,
  order_id,
  order_date,
  total_amount,
  LEAD(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
  )                                               AS next_order_date,
  LEAD(order_date) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
  ) - order_date                                  AS days_to_next_order
FROM orders
WHERE order_status = 'Delivered'
ORDER BY customer_id, order_date
LIMIT 12;`}
        height={230}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Moving Averages — The Frame Clause" />

      <P>The frame clause defines which rows within the ordered partition are included in the window function calculation for the current row. It is the mechanism for rolling/moving calculations — a 7-day moving average, a 3-row moving sum, a cumulative total.</P>

      <CodeBlock
        label="Frame clause syntax"
        code={`-- Frame clause options:
ROWS BETWEEN start AND end
RANGE BETWEEN start AND end

-- Start / end options:
UNBOUNDED PRECEDING   -- from the first row of the partition
N PRECEDING           -- N rows before the current row
CURRENT ROW           -- the current row itself
N FOLLOWING           -- N rows after the current row
UNBOUNDED FOLLOWING   -- to the last row of the partition

-- Common frames:
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
-- Cumulative / running total (from first row to current row)

ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
-- 7-row rolling window (6 previous + current row)

ROWS BETWEEN 3 PRECEDING AND 3 FOLLOWING
-- Centred 7-row window (3 before + current + 3 after)

ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
-- All rows in the partition (same as no frame with no ORDER BY)

-- ROWS vs RANGE:
-- ROWS: physical row offsets — N rows before/after
-- RANGE: value-based offsets — rows within N units of value
-- ROWS is usually what you want — RANGE can include unexpected rows
--   when ORDER BY column has duplicate values`}
      />

      <SQLPlayground
        initialQuery={`-- 3-day moving average of revenue across all stores
WITH daily AS (
  SELECT
    order_date,
    ROUND(SUM(total_amount), 2)  AS daily_revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY order_date
)
SELECT
  order_date,
  daily_revenue,
  -- 3-day moving average (current + 2 preceding)
  ROUND(AVG(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2)                           AS ma_3day,
  -- 7-day moving average
  ROUND(AVG(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2)                           AS ma_7day,
  -- Cumulative total since first day
  ROUND(SUM(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                           AS cumulative_total
FROM daily
ORDER BY order_date;`}
        height={275}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Per-store rolling 3-order average (not time-based — row-based)
SELECT
  store_id,
  order_id,
  order_date,
  total_amount,
  -- 3-order rolling average within each store
  ROUND(AVG(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date, order_id
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2)                            AS rolling_3_avg,
  -- Count of orders in the rolling window
  COUNT(*) OVER (
    PARTITION BY store_id
    ORDER BY order_date, order_id
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  )                                AS window_size
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, order_date
LIMIT 12;`}
        height={255}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="FIRST_VALUE, LAST_VALUE, NTH_VALUE — Value Navigation" />

      <P>These functions return specific values from the ordered window — the first, last, or Nth value — making it easy to attach a reference value (like the store's first order amount) to every row in the partition.</P>

      <SQLPlayground
        initialQuery={`-- FIRST_VALUE and LAST_VALUE: attach extreme values to every row
SELECT
  store_id,
  order_id,
  order_date,
  total_amount,
  -- First order amount for this store (chronologically)
  FIRST_VALUE(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )                                          AS first_order_amount,
  -- Last (most recent) order amount for this store
  LAST_VALUE(total_amount) OVER (
    PARTITION BY store_id
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )                                          AS last_order_amount,
  -- 2nd highest order in the store (NTH_VALUE with RANK ordering)
  NTH_VALUE(total_amount, 2) OVER (
    PARTITION BY store_id
    ORDER BY total_amount DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  )                                          AS second_highest_amount
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, order_date
LIMIT 10;`}
        height={275}
        showSchema={true}
      />

      <Callout type="warning">
        LAST_VALUE requires an explicit frame of ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING. Without it, the default frame is ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW — making LAST_VALUE return the current row's value (because the current row IS the last row in the default frame). This is the most common window function gotcha in production code.
      </Callout>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="WINDOW Alias — Reusing Window Definitions" />

      <P>When multiple window functions in the same query share the same OVER() definition, the WINDOW clause names the window once and each function references it by name — eliminating repetition and making the query shorter and easier to maintain.</P>

      <SQLPlayground
        initialQuery={`-- Without WINDOW alias: repeat the same OVER() clause multiple times
SELECT
  store_id, order_date, total_amount,
  SUM(total_amount)   OVER (PARTITION BY store_id ORDER BY order_date
                            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,
  AVG(total_amount)   OVER (PARTITION BY store_id ORDER BY order_date
                            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_avg,
  COUNT(*)            OVER (PARTITION BY store_id ORDER BY order_date
                            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_count
FROM orders WHERE order_status = 'Delivered'
ORDER BY store_id, order_date LIMIT 8;`}
        height={200}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- WITH WINDOW alias: define once, reference by name
SELECT
  store_id, order_date, total_amount,
  ROUND(SUM(total_amount)   OVER store_window, 2) AS running_total,
  ROUND(AVG(total_amount)   OVER store_window, 2) AS running_avg,
  COUNT(*)                  OVER store_window      AS running_count,
  -- Can extend a named window with additional clauses:
  RANK()                    OVER (store_window)    AS order_rank
FROM orders
WHERE order_status = 'Delivered'
WINDOW store_window AS (
  PARTITION BY store_id
  ORDER BY order_date, order_id
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
ORDER BY store_id, order_date
LIMIT 8;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data analyst at Shopify. The growth team needs a weekly seller performance report for the last month: each seller's daily revenue, their 7-day moving average, their rank by revenue within their city, how their current week compares to last week (WoW change), and their cumulative revenue for the month. Without window functions this would require multiple queries and a complex join. With window functions it is one query.</P>

      <TimeBlock time="10:00 AM" label="Requirements: daily seller report with 5 computed metrics">
        Daily revenue, 7-day MA, city rank, WoW change, cumulative monthly revenue. All in one result set. Adapted for FreshCart stores.
      </TimeBlock>

      <TimeBlock time="10:20 AM" label="Design: three window definitions cover all five metrics">
        Partition 1: store + date order (for running total and moving average). Partition 2: city + date order (for city rank). Partition 3: store unpartitioned (for WoW LAG). All assembled in one SELECT.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Complete seller performance report using window functions
WITH daily_store_revenue AS (
  SELECT
    o.store_id,
    s.city,
    o.order_date,
    ROUND(SUM(o.total_amount), 2)   AS daily_revenue,
    COUNT(o.order_id)               AS daily_orders
  FROM orders      AS o
  JOIN stores      AS s ON o.store_id = s.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY o.store_id, s.city, o.order_date
)
SELECT
  store_id,
  city,
  order_date,
  daily_revenue,
  daily_orders,

  -- Metric 1: 7-day moving average per store
  ROUND(AVG(daily_revenue) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2)                                              AS ma_7day,

  -- Metric 2: rank within city by daily revenue
  RANK() OVER (
    PARTITION BY city, order_date
    ORDER BY daily_revenue DESC
  )                                                  AS city_rank,

  -- Metric 3: week-over-week change (compare to 7 days ago)
  ROUND(daily_revenue - LAG(daily_revenue, 7) OVER (
    PARTITION BY store_id
    ORDER BY order_date
  ), 2)                                              AS wow_change,

  -- Metric 4: cumulative revenue for the period
  ROUND(SUM(daily_revenue) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                              AS cumulative_revenue,

  -- Metric 5: revenue as % of the store's total for the period
  ROUND(daily_revenue / SUM(daily_revenue) OVER (
    PARTITION BY store_id
  ) * 100, 1)                                        AS pct_of_store_total

FROM daily_store_revenue
ORDER BY store_id, order_date;`}
        height={380}
        showSchema={true}
      />

      <TimeBlock time="11:10 AM" label="Five metrics — one query, delivered in 50 minutes">
        Five window function computations — three different PARTITION BY definitions — all in a single SELECT on a CTE that pre-aggregates daily totals. The growth team gets a complete, sortable, filterable report. Adding a sixth metric requires adding one window function expression, not restructuring the query.
      </TimeBlock>

      <ProTip>
        When a query needs multiple window functions on the same data, group them into a CTE that pre-aggregates to the right granularity first (daily store revenue in the example above). Then apply all window functions in the outer SELECT. This prevents the window functions from running on the raw row-level data and ensures each window computation operates on the correct granularity.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a window function and how does it differ from GROUP BY?">
        <p style={{ margin: '0 0 14px' }}>A window function computes an aggregate or ranking value across a set of related rows — the window — while preserving every row in the result. GROUP BY collapses rows into one row per group, losing the individual row detail. Window functions never collapse rows — the result set has the same number of rows as the input, with the computed window value added as an extra column alongside the original data.</p>
        <p style={{ margin: '0 0 14px' }}>The defining syntax is the OVER() clause. Every window function requires OVER() — it is what makes the function "windowed." Inside OVER(), PARTITION BY defines which rows form the window for each row (analogous to GROUP BY), ORDER BY defines the order within the partition, and the optional frame clause defines which subset of the ordered partition to include. A bare OVER() with nothing inside uses all rows as the single window.</p>
        <p style={{ margin: 0 }}>The power this unlocks: questions that aggregate data and need row-level detail simultaneously. "What is each order's value as a percentage of its store's total revenue?" cannot be answered with GROUP BY because after grouping, the individual orders are gone. With a window function — total_amount / SUM(total_amount) OVER (PARTITION BY store_id) — each order row retains its total_amount AND gains the store-level sum for comparison, all in the same query without subqueries or joins.</p>
      </IQ>

      <IQ q="What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?">
        <p style={{ margin: '0 0 14px' }}>All three assign position numbers to rows within a window, but they handle ties differently. ROW_NUMBER assigns a unique sequential integer to every row — even if two rows have identical values in the ORDER BY column, they get different numbers. The ordering of ties is arbitrary (depends on physical row order) but the numbers are always unique: 1, 2, 3, 4. ROW_NUMBER is used when you need unique positions — for deduplication (keep rn = 1 per group) or pagination.</p>
        <p style={{ margin: '0 0 14px' }}>RANK assigns tied rows the same rank but then skips the next rank(s). If two rows tie for rank 2, both get rank 2 and the next row gets rank 4 (rank 3 is skipped). The sequence has gaps: 1, 2, 2, 4, 5. RANK mirrors how sports competitions work — two silver medalists means no bronze. DENSE_RANK also gives tied rows the same rank, but the next rank does not skip — 1, 2, 2, 3, 4. Dense rank is used when gaps are confusing or when you want to count distinct rank levels.</p>
        <p style={{ margin: 0 }}>Practical choice: use ROW_NUMBER for deduplication and top-N filtering (WHERE rn = 1 gives exactly one row per group). Use RANK for competitive leaderboards where gaps signal the tied count (two rows at rank 1 followed by rank 3 shows there was no second place). Use DENSE_RANK for tier classification where you want consecutive tier numbers regardless of ties. In a query like "find the top 3 revenue stores" — with RANK, if two stores tie for first, WHERE rank &lt;= 3 returns 4 stores (both first-place stores plus two more). With ROW_NUMBER, exactly 3 stores are returned but the tie-breaking is arbitrary.</p>
      </IQ>

      <IQ q="How do LAG and LEAD work, and what are they used for?">
        <p style={{ margin: '0 0 14px' }}>LAG(column, offset, default) returns the value of column from the row offset positions before the current row within the window. LEAD(column, offset, default) returns the value from offset positions after the current row. The offset defaults to 1 (immediate predecessor/successor). The default parameter specifies what to return when no preceding or following row exists (the first row has no predecessor for LAG, the last row has no successor for LEAD) — if omitted, NULL is returned.</p>
        <p style={{ margin: '0 0 14px' }}>Both require ORDER BY in the OVER clause — otherwise "previous" and "next" have no defined meaning. PARTITION BY is optional: without it, the entire result set is the window; with it, the preceding/following row is within the same partition (so LAG on a customer-partitioned window gives the previous order for the same customer, not the globally previous order).</p>
        <p style={{ margin: 0 }}>Primary use cases: period-over-period comparison — LAG(revenue) OVER (ORDER BY month) gives last month's revenue on the same row as this month's, enabling revenue - LAG(revenue) as the month-over-month change without a self-join. Customer order gap analysis — LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) gives the previous order date for each customer, enabling order_date - LAG(order_date) as the gap in days between orders. Sequential event analysis — detecting state changes (IF NEW.status != LAG(status) OVER (...) THEN ...), finding first occurrences, and computing durations between events. LAG and LEAD eliminate the verbose self-join alternative for all of these patterns.</p>
      </IQ>

      <IQ q="What is the frame clause and when do you need ROWS vs RANGE?">
        <p style={{ margin: '0 0 14px' }}>The frame clause (ROWS BETWEEN ... AND ... or RANGE BETWEEN ... AND ...) defines which rows within the ordered partition are included in the window function calculation for the current row. Without a frame clause, the default is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW when ORDER BY is present — which is usually the intended behaviour for cumulative calculations but not for rolling windows.</p>
        <p style={{ margin: '0 0 14px' }}>ROWS uses physical row offsets — ROWS BETWEEN 6 PRECEDING AND CURRENT ROW includes exactly the 7 rows: the current row and the 6 immediately preceding rows, regardless of their column values. RANGE uses value-based offsets — RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW includes all rows whose ORDER BY column value is within 6 days of the current row's value. RANGE is useful for time-series where "the last 7 days" should include all rows with dates in that range, not exactly 7 rows.</p>
        <p style={{ margin: 0 }}>The practical difference becomes important with duplicate ORDER BY values. If 5 orders have the same order_date, ROWS BETWEEN 0 PRECEDING AND CURRENT ROW includes only the current row. RANGE BETWEEN CURRENT ROW AND CURRENT ROW includes all 5 rows with the same date (because they are all within 0 value-distance of the current row). This causes LAST_VALUE to behave unexpectedly with the default frame — LAST_VALUE with the default ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW returns the current row's value (because the current row is the last row in the frame), not the last row of the partition. The fix: explicitly specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING to include all rows in the partition.</p>
      </IQ>

      <IQ q="How would you find the top 3 orders per store using window functions?">
        <p style={{ margin: '0 0 14px' }}>Use ROW_NUMBER (or RANK) inside a subquery or CTE to assign a rank to each order within its store partition, then filter in the outer query for ranks 1 through 3. The window function cannot be referenced in WHERE of the same query — window functions are evaluated at the SELECT stage, after WHERE. The wrapping subquery makes the rank value a regular column that the outer WHERE can filter.</p>
        <p style={{ margin: '0 0 14px' }}>Pattern: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY total_amount DESC) AS rn FROM orders WHERE order_status = 'Delivered') SELECT store_id, order_id, order_date, total_amount, rn FROM ranked WHERE rn &lt;= 3 ORDER BY store_id, rn.</p>
        <p style={{ margin: 0 }}>Choosing between ROW_NUMBER and RANK for this pattern: ROW_NUMBER always returns exactly 3 rows per store — if two orders tie for the third position, one is arbitrarily included and one is excluded. RANK returns 3 or more rows — if two orders tie for third, both get rank 3 and both are included (WHERE rank &lt;= 3 returns 4 rows for that store). Use ROW_NUMBER when you need exactly N rows per group. Use RANK when ties should be included (a "top 3 by revenue" report where two stores are equally third should show both). DENSE_RANK is rarely needed for this pattern but useful when the rank number itself is meaningful to display (a ranking table where ranks are shown as 1, 2, 3 even with ties).</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: window function calls cannot contain window function calls"
        cause="A window function was used as the argument to another window function — for example, RANK() OVER (ORDER BY SUM(col) OVER (...)) is not valid. Window functions cannot be nested directly. They can reference aggregate functions (SUM, AVG) but not other window functions in their arguments."
        fix="Break the computation into two steps using a CTE or subquery. Compute the inner window function first, then reference its result in the outer query for the second computation: WITH step1 AS (SELECT *, SUM(col) OVER (PARTITION BY grp) AS group_sum FROM table) SELECT *, RANK() OVER (ORDER BY group_sum DESC) AS rnk FROM step1. Each window function gets its own query level."
      />

      <Err
        msg="Window function result referenced in WHERE — column does not exist"
        cause="A window function result was referenced in the WHERE clause of the same query that defines it. SQL's logical execution order evaluates WHERE before SELECT — window functions are computed in the SELECT stage. The column produced by the window function does not exist yet when WHERE runs."
        fix="Wrap the window function in a subquery or CTE, then filter in the outer WHERE. Standard pattern for top-N: WITH ranked AS (SELECT *, ROW_NUMBER() OVER (...) AS rn FROM table) SELECT * FROM ranked WHERE rn <= 3. The outer WHERE sees rn as a regular column of the CTE — it exists because it was computed in the inner query."
      />

      <Err
        msg="LAST_VALUE returns the current row's value instead of the partition's last value"
        cause="The default window frame when ORDER BY is present is ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. For LAST_VALUE, the last row in this frame IS the current row — so LAST_VALUE always returns the current row's own value, not the final row of the partition. This is the most common window function bug in production."
        fix="Explicitly specify the full partition frame: LAST_VALUE(col) OVER (PARTITION BY grp ORDER BY ord ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING). This makes the frame span the entire partition — the last row in the frame is genuinely the last row of the partition. Alternatively, use FIRST_VALUE with ORDER BY in reverse: FIRST_VALUE(col) OVER (PARTITION BY grp ORDER BY ord DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) — this reorders the partition so the last value is now the first."
      />

      <Err
        msg="Running total resets unexpectedly — values decrease mid-sequence"
        cause="The ORDER BY inside the OVER clause has ties — multiple rows with the same ORDER BY value. When RANGE is the frame type (the default when ORDER BY is specified), all rows with the same ORDER BY value are included together, causing the cumulative sum to jump by the combined total of all tied rows at once. This can appear as a non-monotonic running total."
        fix="Use ROWS instead of the default RANGE frame: SUM(col) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). ROWS uses physical row position — strictly one row at a time. Also add a tiebreaker to the ORDER BY to eliminate ties: ORDER BY order_date, order_id — with a unique secondary sort, no two rows have the same combined ORDER BY value and the frame behaves predictably."
      />

      <Err
        msg="LAG returns NULL for all rows — expected to see previous values"
        cause="The OVER clause is missing ORDER BY or the ORDER BY column has no meaningful ordering. LAG requires ORDER BY to know which row is the 'previous' row. Without ORDER BY, the concept of previous is undefined and the behaviour is implementation-specific (often NULL). Alternatively, PARTITION BY is grouping rows into single-row partitions — when each partition has only one row, there is no previous row and LAG returns NULL for every row."
        fix="Add ORDER BY to the OVER clause: LAG(col) OVER (PARTITION BY grp ORDER BY sort_col). Verify that sort_col has enough distinct values to create meaningful ordering — if all rows in a partition have the same sort_col value, LAG still returns NULL for all rows because they are considered tied and there is no well-defined previous row. Add a tiebreaker: ORDER BY sort_col, id to ensure each row has a unique position."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a comprehensive store analytics query using at least 5 different window functions. The query should operate on delivered orders and produce one row per store per day with: store_id, city, order_date, daily_revenue, daily_orders, a 7-day moving average of daily_revenue (ma_7day), the store's rank by daily_revenue among all stores on that day (daily_rank), the cumulative revenue for the store from the start of the data (cumulative_revenue), the day-over-day change in revenue for that store (dod_change — compare to the previous day this store had an order), the store's daily_revenue as a percentage of all stores' combined revenue on that day (pct_of_day_total), and a performance label: 'Best' if daily_rank = 1, 'Top 3' if <= 3, 'Average' if daily_revenue >= overall daily average, 'Below' otherwise. Use a CTE for the daily aggregation."
        hint="CTE: GROUP BY store_id, city, order_date. Then window functions: AVG OVER (PARTITION BY store_id ORDER BY order_date ROWS 6 PRECEDING) for MA. RANK OVER (PARTITION BY order_date ORDER BY revenue DESC) for daily rank. SUM OVER (PARTITION BY store_id ORDER BY date ROWS UNBOUNDED PRECEDING) for cumulative. LAG(revenue) OVER (PARTITION BY store_id ORDER BY date) for DoD. SUM OVER (PARTITION BY date) for day total."
        answer={`WITH daily AS (
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
)
SELECT
  store_id,
  city,
  order_date,
  daily_revenue,
  daily_orders,

  -- 7-day moving average per store
  ROUND(AVG(daily_revenue) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2)                                              AS ma_7day,

  -- Daily rank among all stores (best revenue = rank 1)
  RANK() OVER (
    PARTITION BY order_date
    ORDER BY daily_revenue DESC
  )                                                  AS daily_rank,

  -- Cumulative revenue per store
  ROUND(SUM(daily_revenue) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                              AS cumulative_revenue,

  -- Day-over-day change (previous day this store had an order)
  ROUND(daily_revenue - LAG(daily_revenue) OVER (
    PARTITION BY store_id
    ORDER BY order_date
  ), 2)                                              AS dod_change,

  -- % of all stores' combined revenue on this day
  ROUND(daily_revenue / SUM(daily_revenue) OVER (
    PARTITION BY order_date
  ) * 100, 1)                                        AS pct_of_day_total,

  -- Performance label
  CASE
    WHEN RANK() OVER (PARTITION BY order_date ORDER BY daily_revenue DESC) = 1
    THEN 'Best'
    WHEN RANK() OVER (PARTITION BY order_date ORDER BY daily_revenue DESC) <= 3
    THEN 'Top 3'
    WHEN daily_revenue >= AVG(daily_revenue) OVER (PARTITION BY order_date)
    THEN 'Average'
    ELSE 'Below'
  END                                                AS performance_label

FROM daily
ORDER BY order_date, daily_rank;`}
        explanation="The CTE pre-aggregates to daily store revenue — running window functions on raw order rows would produce incorrect results because each order would be treated as a day. The 7-day moving average uses ROWS BETWEEN 6 PRECEDING AND CURRENT ROW — exactly 7 rows (or fewer for early dates where fewer than 6 prior rows exist). daily_rank uses PARTITION BY order_date so stores are ranked against each other within the same day — without the partition, all stores across all days would be ranked together. The cumulative revenue uses ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW explicitly (equivalent to the default, but explicit is safer). dod_change uses LAG(daily_revenue) OVER (PARTITION BY store_id ORDER BY order_date) — the partition ensures LAG looks at the previous day for the same store, not the globally previous row. pct_of_day_total uses SUM OVER (PARTITION BY order_date) without ORDER BY — no ORDER BY means all rows in the day's partition are included (the entire day's total). The performance_label repeats the RANK() computation — in production, compute rank in a second CTE to avoid repetition. The CASE checks consecutive conditions: rank = 1 before <= 3 ensures 'Best' not 'Top 3' for the day leader."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Window functions compute aggregates across related rows without collapsing them — every input row remains in the result, with the computed window value added as an extra column.',
          'The OVER() clause defines the window: PARTITION BY splits rows into groups (like GROUP BY but rows are kept), ORDER BY orders rows within each partition, and the frame clause selects a subset of the ordered partition.',
          'ROW_NUMBER: unique sequential integers — no ties. RANK: shared rank with gaps after ties (1,1,3). DENSE_RANK: shared rank without gaps (1,1,2). NTILE(n): assigns rows to n equal-size buckets.',
          'Top-N per group pattern: ROW_NUMBER() OVER (PARTITION BY grp ORDER BY col DESC) AS rn in a subquery or CTE, then WHERE rn <= N in the outer query. Window functions cannot be filtered in WHERE of the same query.',
          'LAG(col, n) returns the value n rows before the current row. LEAD(col, n) returns the value n rows after. Both require ORDER BY to define before/after. Use them for period-over-period comparisons without self-joins.',
          'Frame clause: ROWS BETWEEN N PRECEDING AND CURRENT ROW for rolling windows. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for cumulative totals. Always use ROWS not RANGE for predictable behaviour with duplicate ORDER BY values.',
          'LAST_VALUE requires explicit ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING — without it, the default frame ends at CURRENT ROW and LAST_VALUE returns the current row\'s own value.',
          'WINDOW alias: define a named window once with WINDOW w AS (...) and reference it as OVER w across multiple functions — eliminates duplication and makes complex queries readable.',
          'Aggregate functions (SUM, AVG, COUNT, MIN, MAX) all work as window functions with OVER(). SUM() OVER (PARTITION BY store ORDER BY date ROWS UNBOUNDED PRECEDING) is a running total.',
          'Pre-aggregate to the right granularity in a CTE before applying window functions. Window functions on raw row-level data when you need daily totals will produce wrong results — group first, then window.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 52</strong>, you learn Ranking Functions in depth — advanced RANK patterns, percentile ranks, conditional rankings, multi-level rankings, and every production scenario where ranking drives business decisions.
        </p>
        <Link href="/learn/sql/ranking-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 52 → Ranking Functions
        </Link>
      </div>

    </LearnLayout>
  );
}