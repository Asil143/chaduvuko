import React from 'react';
import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
import Link from 'next/link';

const C = '#06b6d4';

const Part = ({ n, title }: { n: string; title: string }) => {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
    </div>
  );
};

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

const FnCard = ({ fn, syntax, returns, note }: { fn: string; syntax: string; returns: string; note: string }) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${C}20`, borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: C }}>{fn}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)' }}>→ {returns}</span>
    </div>
    <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)', display: 'block', marginBottom: 6 }}>{syntax}</code>
    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{note}</p>
  </div>
);

export default function MathFunctions() {
  return (
    <LearnLayout
      title="Math Functions"
      description="ROUND, FLOOR, CEIL, ABS, MOD, POWER, SQRT, LOG — every numeric operation for financial calculations, statistical analysis, data bucketing, and percentage computations"
      section="SQL — Module 43"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Math Functions Matter in SQL" />

      <P>Most analytical SQL produces numbers — revenue totals, percentage shares, growth rates, margins, ratios. Raw numbers rarely arrive in the format you need: a sum might need rounding to two decimal places, a ratio needs to be expressed as a percentage, a negative difference needs its absolute value. Math functions are the final layer that transforms raw computed numbers into accurate, display-ready values.</P>

      <P>Beyond formatting, math functions enable bucketing (grouping values into ranges), statistical summaries (standard deviation, variance), financial calculations (compound growth, loan repayment), and safely handling division-by-zero — one of the most common runtime errors in analytical SQL.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Rounding — ROUND, FLOOR, CEIL, TRUNC" />

      <FnCard fn="ROUND" syntax="ROUND(number, decimal_places)" returns="rounded number" note="Rounds to specified decimal places. ROUND(4.567, 2) = 4.57. ROUND(4.564, 2) = 4.56. ROUND(4.5, 0) = 5. Negative places round to tens/hundreds: ROUND(1234, -2) = 1200." />
      <FnCard fn="FLOOR" syntax="FLOOR(number)" returns="largest integer ≤ number" note="Always rounds down. FLOOR(4.9) = 4. FLOOR(-4.1) = -5. Useful for bucketing into ranges." />
      <FnCard fn="CEIL / CEILING" syntax="CEIL(number)" returns="smallest integer ≥ number" note="Always rounds up. CEIL(4.1) = 5. CEIL(-4.9) = -4. Useful for page counts, minimum quantities." />
      <FnCard fn="TRUNC" syntax="TRUNC(number, decimal_places)" returns="truncated number" note="Truncates (cuts off) without rounding. TRUNC(4.99, 1) = 4.9. TRUNC(4.99, 0) = 4. Differs from ROUND — never rounds up." />

      <SQLPlayground
        initialQuery={`-- Compare rounding behaviours on FreshCart prices
SELECT
  unit_price,
  ROUND(unit_price, 0)          AS rounded_to_int,
  ROUND(unit_price, 1)          AS rounded_to_1dp,
  ROUND(unit_price, 2)          AS rounded_to_2dp,
  FLOOR(unit_price)             AS floored,
  CEIL(unit_price)              AS ceiled,
  TRUNC(unit_price, 0)          AS truncated,
  -- Rounding to nearest 10
  ROUND(unit_price / 10) * 10   AS nearest_10
FROM products
ORDER BY unit_price DESC
LIMIT 10;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Financial rounding: revenue summary with proper decimal places
SELECT
  store_id,
  COUNT(*)                              AS orders,
  SUM(total_amount)                     AS raw_total,         -- many decimals
  ROUND(SUM(total_amount), 2)           AS revenue_2dp,       -- ₹ precision
  ROUND(AVG(total_amount), 2)           AS avg_order,
  -- Round to nearest ₹50 for display
  ROUND(SUM(total_amount) / 50) * 50   AS revenue_to_50
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY revenue_2dp DESC;`}
        height={205}
        showSchema={false}
      />

      <H>Banker's rounding vs standard rounding</H>

      <CodeBlock
        label="ROUND behaviour at exactly .5"
        code={`-- Standard ROUND: always rounds .5 up
ROUND(0.5, 0)  = 1
ROUND(1.5, 0)  = 2
ROUND(2.5, 0)  = 3

-- PostgreSQL uses "round half up" (same as above)
-- Some databases use "banker's rounding" (round half to even):
-- Banker's: ROUND(2.5) = 2 (rounds to nearest even)
-- Banker's: ROUND(3.5) = 4 (rounds to nearest even)

-- For financial reporting, explicitly control rounding:
-- Always specify decimal places in ROUND — never rely on default
ROUND(amount, 2)   -- always explicit for currency
-- Use FLOOR for conservative estimates, CEIL for coverage quantities`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="ABS — Absolute Value" />

      <P>ABS returns the absolute (non-negative) value of a number. It is essential whenever you care about the <Hl>magnitude</Hl> of a difference rather than its direction — how far two values differ, not which is larger.</P>

      <SQLPlayground
        initialQuery={`-- Delivery time deviation from target (3 days)
SELECT
  order_id,
  store_id,
  delivery_date - order_date                            AS actual_days,
  3                                                     AS target_days,
  (delivery_date - order_date) - 3                      AS deviation,       -- signed
  ABS((delivery_date - order_date) - 3)                 AS abs_deviation,   -- magnitude
  CASE
    WHEN delivery_date - order_date <= 3 THEN 'On time'
    ELSE 'Late by ' || ((delivery_date - order_date) - 3)::TEXT || ' days'
  END                                                   AS status
FROM orders
WHERE order_status = 'Delivered'
  AND delivery_date IS NOT NULL
ORDER BY abs_deviation DESC
LIMIT 10;`}
        height={235}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products whose price deviates most from category average
-- ABS used to find the largest deviation regardless of direction
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  ROUND(cat_avg.avg_price, 2)                           AS category_avg,
  ROUND(p.unit_price - cat_avg.avg_price, 2)            AS deviation,
  ROUND(ABS(p.unit_price - cat_avg.avg_price), 2)       AS abs_deviation
FROM products AS p
JOIN (
  SELECT category, AVG(unit_price) AS avg_price
  FROM products GROUP BY category
) AS cat_avg ON p.category = cat_avg.category
ORDER BY abs_deviation DESC
LIMIT 10;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="MOD — Remainder After Division" />

      <P>MOD returns the remainder after integer division. It is used for cycling through values, identifying even/odd rows, generating alternating patterns, and extracting the last N digits of a number.</P>

      <CodeBlock
        label="MOD — syntax and common uses"
        code={`MOD(dividend, divisor)     -- returns remainder
-- or: dividend % divisor    (DuckDB, PostgreSQL, MySQL)

MOD(10, 3)   = 1    -- 10 / 3 = 3 remainder 1
MOD(12, 4)   = 0    -- 12 / 4 = 3 remainder 0 (evenly divisible)
MOD(7, 2)    = 1    -- odd number (odd if MOD(n,2) = 1)
MOD(8, 2)    = 0    -- even number

-- Common uses:
-- Even/odd row identification: MOD(row_number, 2) = 0
-- Group cycling: MOD(customer_id, 3) assigns customers to 3 buckets (0,1,2)
-- Last N digits: MOD(order_id, 100) gives last 2 digits of order_id
-- Quarterly bucket: MOD(EXTRACT(MONTH FROM date) - 1, 3) = 0 for first month of quarter`}
      />

      <SQLPlayground
        initialQuery={`-- MOD for A/B test bucket assignment
-- Customers split into 3 groups based on customer_id
SELECT
  customer_id,
  first_name || ' ' || last_name           AS customer,
  loyalty_tier,
  -- Assign to bucket 0, 1, or 2 based on customer_id
  MOD(customer_id, 3)                      AS ab_bucket,
  CASE MOD(customer_id, 3)
    WHEN 0 THEN 'Control'
    WHEN 1 THEN 'Treatment A'
    WHEN 2 THEN 'Treatment B'
  END                                      AS experiment_group
FROM customers
ORDER BY ab_bucket, customer_id;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- MOD to identify even and odd order IDs
-- Useful for splitting datasets for validation
SELECT
  order_id,
  total_amount,
  MOD(order_id, 2)                         AS is_odd,
  CASE MOD(order_id, 2)
    WHEN 0 THEN 'Even — validation set'
    WHEN 1 THEN 'Odd — training set'
  END                                      AS dataset_split
FROM orders
WHERE order_status = 'Delivered'
ORDER BY order_id
LIMIT 10;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="POWER, SQRT, CBRT — Exponents and Roots" />

      <FnCard fn="POWER" syntax="POWER(base, exponent)" returns="base^exponent" note="POWER(2, 10) = 1024. POWER(9, 0.5) = 3 (square root). POWER(amount, 2) = amount squared. Used for compound growth, geometric means." />
      <FnCard fn="SQRT" syntax="SQRT(number)" returns="square root" note="SQRT(25) = 5. SQRT(2) = 1.4142... Returns NULL for negative inputs in most databases. Used for standard deviation calculations." />
      <FnCard fn="CBRT" syntax="CBRT(number)" returns="cube root" note="CBRT(27) = 3. CBRT(8) = 2. Available in PostgreSQL and DuckDB. Used in volume calculations." />
      <FnCard fn="EXP" syntax="EXP(number)" returns="e^number" note="EXP(1) = 2.71828 (Euler's number). EXP(0) = 1. Used for exponential growth models and log-scale transformations." />

      <SQLPlayground
        initialQuery={`-- Compound Annual Growth Rate (CAGR) calculation
-- CAGR = (end_value / start_value)^(1/years) - 1
-- Using Jan vs Feb revenue as a simplified example
WITH monthly_rev AS (
  SELECT
    EXTRACT(MONTH FROM order_date)::INT   AS mo,
    ROUND(SUM(total_amount), 2)           AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND EXTRACT(YEAR FROM order_date) = 2024
  GROUP BY EXTRACT(MONTH FROM order_date)
)
SELECT
  jan.revenue                             AS jan_revenue,
  feb.revenue                             AS feb_revenue,
  -- Month-over-month growth rate
  ROUND((feb.revenue - jan.revenue) / jan.revenue * 100, 2) AS mom_pct,
  -- Annualised from 1-month growth: (1 + monthly_rate)^12 - 1
  ROUND(
    (POWER(1 + (feb.revenue - jan.revenue) / jan.revenue, 12) - 1) * 100
  , 2)                                    AS annualised_growth_pct
FROM monthly_rev AS jan, monthly_rev AS feb
WHERE jan.mo = 1 AND feb.mo = 2;`}
        height={265}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- SQRT in statistical calculation: standard deviation manually
-- stddev = SQRT(AVG((x - mean)^2))
WITH order_stats AS (
  SELECT
    store_id,
    total_amount,
    AVG(total_amount) OVER (PARTITION BY store_id) AS store_avg
  FROM orders
  WHERE order_status = 'Delivered'
)
SELECT
  store_id,
  ROUND(AVG(total_amount), 2)                           AS avg_order,
  -- Manual stddev using SQRT and POWER:
  ROUND(SQRT(AVG(POWER(total_amount - store_avg, 2))), 2) AS manual_stddev,
  -- Built-in for comparison:
  ROUND(STDDEV(total_amount), 2)                        AS builtin_stddev
FROM order_stats
GROUP BY store_id
ORDER BY store_id;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="LOG and LN — Logarithms" />

      <CodeBlock
        label="Logarithm functions"
        code={`-- LN: natural logarithm (base e)
LN(1)           = 0
LN(EXP(1))      = 1      -- LN and EXP are inverses
LN(100)         = 4.605...

-- LOG: base-10 logarithm (or arbitrary base)
LOG(100)        = 2      -- base 10
LOG(10, 100)    = 2      -- LOG(base, number) — explicit base
LOG(2, 1024)    = 10     -- log base 2 of 1024

-- DuckDB: LOG10() for base-10, LOG2() for base-2
LOG10(1000)     = 3
LOG2(1024)      = 10

-- Common uses:
-- Log-scale buckets: FLOOR(LOG10(amount)) puts amounts into order-of-magnitude buckets
-- Revenue distribution: amounts in ₹10s, ₹100s, ₹1000s in separate buckets
-- Growth rates: continuous compounding uses LN
-- Normalising skewed distributions for analysis`}
      />

      <SQLPlayground
        initialQuery={`-- Log-scale order value buckets
-- Groups orders into order-of-magnitude ranges
SELECT
  CASE
    WHEN total_amount < 100   THEN '₹10-99'
    WHEN total_amount < 1000  THEN '₹100-999'
    WHEN total_amount < 10000 THEN '₹1,000-9,999'
    ELSE                           '₹10,000+'
  END                                       AS value_bucket,
  -- Floor of log10 gives the order of magnitude
  FLOOR(LOG10(total_amount))::INT           AS magnitude,
  COUNT(*)                                  AS order_count,
  ROUND(AVG(total_amount), 2)               AS avg_in_bucket,
  ROUND(SUM(total_amount), 2)               AS total_in_bucket
FROM orders
WHERE order_status = 'Delivered'
  AND total_amount > 0
GROUP BY
  CASE
    WHEN total_amount < 100   THEN '₹10-99'
    WHEN total_amount < 1000  THEN '₹100-999'
    WHEN total_amount < 10000 THEN '₹1,000-9,999'
    ELSE                           '₹10,000+'
  END,
  FLOOR(LOG10(total_amount))::INT
ORDER BY magnitude;`}
        height={275}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Division and NULLIF — Preventing Division by Zero" />

      <P>Division by zero is one of the most common runtime errors in SQL — it crashes the query with no data returned. The fix is <Hl>NULLIF</Hl>: it returns NULL when its two arguments are equal, and NULL divided by anything is NULL (not an error). Wrapping the denominator with NULLIF(denominator, 0) silently converts zero-division attempts into NULL results.</P>

      <CodeBlock
        label="Division by zero — the NULLIF pattern"
        code={`-- Division by zero → ERROR
SELECT 100 / 0;                          -- ERROR: division by zero

-- NULLIF converts zero to NULL — NULL / anything = NULL (no error)
SELECT 100 / NULLIF(0, 0);              -- returns NULL
SELECT 100 / NULLIF(total_orders, 0);  -- safe even when total_orders = 0

-- Why NULLIF works:
-- NULLIF(a, b) returns NULL when a = b, otherwise returns a
-- So NULLIF(0, 0) = NULL, and 100 / NULL = NULL (not an error)
-- NULLIF(5, 0) = 5 (unchanged), and 100 / 5 = 20 (normal division)

-- Combine with COALESCE to substitute 0 instead of NULL:
COALESCE(revenue / NULLIF(orders, 0), 0)   -- returns 0 when orders = 0

-- Common patterns:
-- Percentage: ROUND(part / NULLIF(total, 0) * 100, 1)
-- Ratio:      ROUND(metric_a / NULLIF(metric_b, 0), 2)
-- Growth:     ROUND((new - old) / NULLIF(old, 0) * 100, 1)`}
      />

      <SQLPlayground
        initialQuery={`-- Percentage calculations with NULLIF protection
SELECT
  p.category,
  COUNT(*)                                                    AS product_count,
  SUM(CASE WHEN p.in_stock THEN 1 ELSE 0 END)                AS in_stock_count,
  -- Percentage in stock — NULLIF protects against empty categories
  ROUND(
    SUM(CASE WHEN p.in_stock THEN 1 ELSE 0 END)::NUMERIC
    / NULLIF(COUNT(*), 0) * 100
  , 1)                                                        AS pct_in_stock,
  ROUND(AVG(unit_price), 2)                                   AS avg_price,
  -- Margin percentage
  ROUND(
    AVG((unit_price - cost_price) / NULLIF(unit_price, 0) * 100)
  , 1)                                                        AS avg_margin_pct
FROM products AS p
GROUP BY p.category
ORDER BY avg_margin_pct DESC;`}
        height={250}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Revenue per employee — NULLIF prevents crash when store has 0 employees
WITH store_revenue AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY store_id
),
store_headcount AS (
  SELECT store_id, COUNT(*) AS headcount
  FROM employees WHERE store_id IS NOT NULL
  GROUP BY store_id
)
SELECT
  s.store_id,
  s.city,
  COALESCE(r.revenue, 0)                                   AS revenue,
  COALESCE(h.headcount, 0)                                 AS employees,
  -- NULLIF prevents division by zero for stores with no employees
  ROUND(
    COALESCE(r.revenue, 0) / NULLIF(COALESCE(h.headcount, 0), 0)
  , 2)                                                     AS revenue_per_employee
FROM stores AS s
LEFT JOIN store_revenue   AS r ON s.store_id = r.store_id
LEFT JOIN store_headcount AS h ON s.store_id = h.store_id
ORDER BY revenue_per_employee DESC NULLS LAST;`}
        height={270}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Statistical Aggregates — STDDEV, VARIANCE, PERCENTILE" />

      <P>SQL includes statistical aggregate functions that go beyond SUM, AVG, and COUNT. These functions are essential for understanding data distributions — not just the average, but how spread out values are and what the typical range looks like.</P>

      <CodeBlock
        label="Statistical aggregate functions"
        code={`-- Standard deviation: spread around the mean
STDDEV(column)          -- sample standard deviation (divides by n-1)
STDDEV_POP(column)      -- population standard deviation (divides by n)

-- Variance: squared standard deviation
VARIANCE(column)        -- sample variance
VAR_POP(column)         -- population variance

-- Percentiles: value at which N% of data falls below
PERCENTILE_CONT(0.5)  WITHIN GROUP (ORDER BY column)   -- median (50th percentile)
PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY column)   -- 25th percentile (Q1)
PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY column)   -- 75th percentile (Q3)
PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY column)   -- 95th percentile

-- PERCENTILE_DISC: returns an actual value from the dataset
-- PERCENTILE_CONT: interpolates between values (exact percentile)

-- CORR: Pearson correlation coefficient (-1 to 1)
CORR(col_a, col_b)      -- 1 = perfect positive, -1 = perfect negative, 0 = no linear relationship`}
      />

      <SQLPlayground
        initialQuery={`-- Distribution analysis of order values
SELECT
  ROUND(MIN(total_amount), 2)                                  AS minimum,
  ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount), 2) AS p25,
  ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY total_amount), 2) AS median,
  ROUND(AVG(total_amount), 2)                                  AS mean,
  ROUND(PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount), 2) AS p75,
  ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY total_amount), 2) AS p95,
  ROUND(MAX(total_amount), 2)                                  AS maximum,
  ROUND(STDDEV(total_amount), 2)                               AS std_dev,
  -- Interquartile range (IQR)
  ROUND(
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY total_amount)
    - PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY total_amount)
  , 2)                                                         AS iqr
FROM orders
WHERE order_status = 'Delivered';`}
        height={265}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Per-store distribution: mean, stddev, and coefficient of variation
-- Coefficient of variation = stddev / mean — measures relative spread
SELECT
  store_id,
  COUNT(*)                              AS orders,
  ROUND(AVG(total_amount), 2)           AS mean_order,
  ROUND(STDDEV(total_amount), 2)        AS std_dev,
  ROUND(MIN(total_amount), 2)           AS minimum,
  ROUND(MAX(total_amount), 2)           AS maximum,
  -- CV: lower = more consistent order values, higher = more variable
  ROUND(
    STDDEV(total_amount) / NULLIF(AVG(total_amount), 0) * 100
  , 1)                                  AS coeff_variation_pct
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY coeff_variation_pct;`}
        height={240}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Outlier detection: orders beyond 2 standard deviations from mean
WITH order_stats AS (
  SELECT
    AVG(total_amount)    AS mean_val,
    STDDEV(total_amount) AS std_val
  FROM orders WHERE order_status = 'Delivered'
)
SELECT
  o.order_id,
  o.store_id,
  o.total_amount,
  ROUND(os.mean_val, 2)                                    AS overall_mean,
  ROUND(os.std_val, 2)                                     AS overall_stddev,
  ROUND(ABS(o.total_amount - os.mean_val) / NULLIF(os.std_val, 0), 2) AS z_score,
  CASE
    WHEN ABS(o.total_amount - os.mean_val) > 2 * os.std_val THEN '⚠ Outlier'
    ELSE '✓ Normal'
  END                                                      AS classification
FROM orders AS o, order_stats AS os
WHERE o.order_status = 'Delivered'
ORDER BY z_score DESC
LIMIT 10;`}
        height={270}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Numeric Bucketing — WIDTH_BUCKET and CASE Ranges" />

      <P>Bucketing assigns each row to a numeric range — turning continuous values into discrete categories for distribution analysis and histograms. SQL provides WIDTH_BUCKET for uniform-width buckets and CASE for custom ranges.</P>

      <SQLPlayground
        initialQuery={`-- WIDTH_BUCKET: uniform-width buckets
-- WIDTH_BUCKET(value, min, max, num_buckets)
-- Returns bucket number 1 through num_buckets
SELECT
  WIDTH_BUCKET(total_amount, 0, 2000, 10)   AS bucket_num,
  -- Bucket label (each bucket covers ₹200)
  (WIDTH_BUCKET(total_amount, 0, 2000, 10) - 1) * 200 AS bucket_min,
  WIDTH_BUCKET(total_amount, 0, 2000, 10) * 200       AS bucket_max,
  COUNT(*)                                            AS order_count,
  ROUND(AVG(total_amount), 2)                         AS avg_in_bucket
FROM orders
WHERE order_status = 'Delivered'
  AND total_amount BETWEEN 0 AND 2000
GROUP BY WIDTH_BUCKET(total_amount, 0, 2000, 10)
ORDER BY bucket_num;`}
        height={240}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Custom CASE bucketing: business-meaningful price tiers
SELECT
  CASE
    WHEN unit_price < 50   THEN '₹0–49 (Budget)'
    WHEN unit_price < 150  THEN '₹50–149 (Standard)'
    WHEN unit_price < 300  THEN '₹150–299 (Premium)'
    WHEN unit_price < 500  THEN '₹300–499 (Luxury)'
    ELSE                        '₹500+ (Ultra)'
  END                            AS price_tier,
  COUNT(*)                       AS product_count,
  ROUND(AVG(unit_price), 2)      AS avg_price,
  ROUND(MIN(unit_price), 2)      AS min_price,
  ROUND(MAX(unit_price), 2)      AS max_price
FROM products
GROUP BY
  CASE
    WHEN unit_price < 50   THEN '₹0–49 (Budget)'
    WHEN unit_price < 150  THEN '₹50–149 (Standard)'
    WHEN unit_price < 300  THEN '₹150–299 (Premium)'
    WHEN unit_price < 500  THEN '₹300–499 (Luxury)'
    ELSE                        '₹500+ (Ultra)'
  END
ORDER BY min_price;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Integer Division and Type Casting" />

      <P>SQL type rules for division are a frequent source of bugs. When both operands are integers, SQL performs <Hl>integer division</Hl> — discarding the remainder. 7 / 2 = 3, not 3.5. Casting one operand to NUMERIC or FLOAT forces decimal division.</P>

      <CodeBlock
        label="Integer division trap and fix"
        code={`-- INTEGER division: both operands are integers
SELECT 7 / 2;               -- returns 3 (not 3.5!)
SELECT 1 / 3;               -- returns 0 (not 0.333!)
SELECT 10 / 3;              -- returns 3 (remainder discarded)

-- Fix 1: cast one operand to NUMERIC or FLOAT
SELECT 7::NUMERIC / 2;      -- returns 3.5
SELECT 7 / 2.0;             -- returns 3.5 (2.0 is a float literal)
SELECT CAST(7 AS NUMERIC) / 2;  -- returns 3.5

-- Fix 2: multiply by 1.0 first
SELECT 7 * 1.0 / 2;        -- returns 3.5

-- Common mistake: percentage calculation on integer counts
SELECT COUNT(*) / COUNT(*) * 100 FROM orders;       -- returns 100 (integer: 1 * 100)
SELECT COUNT(*)::NUMERIC / COUNT(*) * 100 FROM orders;  -- returns 100.0 (correct)

-- Percentage of delivered orders:
SELECT
  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END)::NUMERIC
  / COUNT(*) * 100   -- cast numerator to NUMERIC → decimal result
FROM orders;`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate integer division trap and fix
SELECT
  -- WRONG: integer division
  3 / 4                              AS int_div_wrong,      -- 0
  -- CORRECT: cast to numeric
  3::NUMERIC / 4                     AS numeric_div,        -- 0.75
  -- Percentage: delivered orders
  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END)
    AS delivered_count,
  COUNT(*)
    AS total_count,
  -- WRONG: integer / integer * 100
  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END)
    / COUNT(*) * 100                 AS wrong_pct,          -- always 0 or 100!
  -- CORRECT: cast numerator
  ROUND(
    SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END)::NUMERIC
    / COUNT(*) * 100
  , 1)                               AS correct_pct
FROM orders;`}
        height={255}
        showSchema={true}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Complete Math Function Reference" />

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Function', 'Description', 'Example → Result'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['ROUND(n, dp)', 'Round to dp decimal places', 'ROUND(3.456, 2) → 3.46'],
              ['FLOOR(n)', 'Largest integer ≤ n', 'FLOOR(3.9) → 3'],
              ['CEIL(n)', 'Smallest integer ≥ n', 'CEIL(3.1) → 4'],
              ['TRUNC(n, dp)', 'Truncate to dp decimal places', 'TRUNC(3.99, 1) → 3.9'],
              ['ABS(n)', 'Absolute value', 'ABS(-42) → 42'],
              ['MOD(a, b)', 'Remainder of a / b', 'MOD(10, 3) → 1'],
              ['POWER(b, e)', 'b raised to exponent e', 'POWER(2, 8) → 256'],
              ['SQRT(n)', 'Square root', 'SQRT(144) → 12'],
              ['CBRT(n)', 'Cube root', 'CBRT(27) → 3'],
              ['EXP(n)', 'e raised to power n', 'EXP(1) → 2.71828'],
              ['LN(n)', 'Natural logarithm (base e)', 'LN(1) → 0'],
              ['LOG(n)', 'Base-10 logarithm', 'LOG(1000) → 3'],
              ['LOG(b, n)', 'Logarithm base b of n', 'LOG(2, 1024) → 10'],
              ['SIGN(n)', 'Sign of n: -1, 0, or 1', 'SIGN(-42) → -1'],
              ['PI()', 'Value of π', 'PI() → 3.14159...'],
              ['RANDOM()', 'Random float 0 ≤ x < 1', 'RANDOM() → 0.73421...'],
              ['WIDTH_BUCKET(v, lo, hi, n)', 'Uniform bucket number for v', 'WIDTH_BUCKET(350, 0, 1000, 10) → 4'],
              ['NULLIF(a, b)', 'NULL if a=b, else a', 'NULLIF(0, 0) → NULL'],
              ['STDDEV(col)', 'Sample standard deviation', 'STDDEV(salary) → 12450.3'],
              ['VARIANCE(col)', 'Sample variance', 'VARIANCE(salary) → 155010000'],
              ['PERCENTILE_CONT(f) WITHIN GROUP (ORDER BY col)', 'Interpolated percentile', 'PERCENTILE_CONT(0.5) → median'],
              ['CORR(a, b)', 'Pearson correlation coefficient', 'CORR(price, sales) → -0.72'],
            ].map(([fn, desc, ex], i) => (
              <tr key={fn} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{fn}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{desc}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are a data analyst at CRED, a fintech platform. The finance team needs a monthly P&L summary showing revenue, cost of goods, gross margin, gross margin percentage, standard deviation of transaction values, and identification of outlier transactions. All require combinations of math functions.</P>

      <TimeBlock time="10:00 AM" label="P&L summary requirements">
        Revenue, COGS, gross profit, gross margin %, avg transaction, stddev, outlier flag (beyond 2σ). All rounded to 2 dp, percentages to 1 dp.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Monthly P&L summary using math functions
WITH monthly_stats AS (
  SELECT
    DATE_TRUNC('month', o.order_date)::DATE           AS month_start,
    -- Revenue
    ROUND(SUM(o.total_amount), 2)                     AS revenue,
    -- COGS (sum of cost_price × quantity)
    ROUND(SUM(p.cost_price * oi.quantity), 2)         AS cogs,
    -- Gross profit
    ROUND(SUM(o.total_amount) - SUM(p.cost_price * oi.quantity), 2) AS gross_profit,
    -- Transaction stats
    COUNT(DISTINCT o.order_id)                        AS order_count,
    ROUND(AVG(o.total_amount), 2)                     AS avg_order,
    ROUND(STDDEV(o.total_amount), 2)                  AS stddev_order,
    ROUND(MIN(o.total_amount), 2)                     AS min_order,
    ROUND(MAX(o.total_amount), 2)                     AS max_order
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
  GROUP BY DATE_TRUNC('month', o.order_date)
)
SELECT
  month_start,
  revenue,
  cogs,
  gross_profit,
  -- Gross margin percentage — NULLIF prevents division by zero
  ROUND(gross_profit / NULLIF(revenue, 0) * 100, 1)  AS gross_margin_pct,
  order_count,
  avg_order,
  stddev_order,
  min_order,
  max_order,
  -- Upper outlier threshold: mean + 2 × stddev
  ROUND(avg_order + 2 * stddev_order, 2)             AS outlier_threshold
FROM monthly_stats
ORDER BY month_start;`}
        height={360}
        showSchema={true}
      />

      <TimeBlock time="10:45 AM" label="Outlier orders flagged separately">
        A second query identifies specific orders exceeding the monthly outlier threshold.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Flag individual outlier orders beyond 2 standard deviations
WITH monthly_benchmarks AS (
  SELECT
    DATE_TRUNC('month', order_date)::DATE  AS month_start,
    AVG(total_amount)                      AS mean_val,
    STDDEV(total_amount)                   AS std_val
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  o.order_id,
  DATE_TRUNC('month', o.order_date)::DATE   AS month,
  o.store_id,
  o.total_amount,
  ROUND(mb.mean_val, 2)                     AS month_mean,
  ROUND(mb.std_val, 2)                      AS month_stddev,
  -- Z-score: how many stddevs from the mean
  ROUND(
    ABS(o.total_amount - mb.mean_val) / NULLIF(mb.std_val, 0)
  , 2)                                      AS z_score,
  CASE
    WHEN ABS(o.total_amount - mb.mean_val) > 2 * mb.std_val
    THEN '⚠ Outlier'
    ELSE '✓ Normal'
  END                                       AS flag
FROM orders AS o
JOIN monthly_benchmarks AS mb
  ON DATE_TRUNC('month', o.order_date)::DATE = mb.month_start
WHERE o.order_status = 'Delivered'
ORDER BY z_score DESC
LIMIT 8;`}
        height={310}
        showSchema={false}
      />

      <TimeBlock time="11:15 AM" label="Finance team gets complete P&L + outlier report">
        Two queries — one for the summary P&L with margin calculations, one for flagging outlier transactions. All numbers properly rounded, all divisions protected with NULLIF, all percentages cast to NUMERIC before division. The finance team has actionable numbers with statistical context.
      </TimeBlock>

      <ProTip>
        Always pair margin and percentage calculations with NULLIF on the denominator. In a P&L query, if a store has zero revenue (no delivered orders), dividing gross_profit / 0 crashes the entire query — not just that store's row. NULLIF converts the zero to NULL, the division returns NULL, and the query continues for all other stores. Add COALESCE if you want 0% instead of NULL for display.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is NULLIF and when do you use it in SQL?">
        <p style={{ margin: '0 0 14px' }}>NULLIF(a, b) returns NULL when a equals b, and returns a unchanged when a does not equal b. Its primary use is preventing division-by-zero errors — NULLIF(denominator, 0) converts zero denominators to NULL, and NULL divided by anything is NULL (not a runtime error). Without this guard, a single row with a zero denominator crashes the entire query.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern appears in every percentage and ratio calculation: ROUND(part::NUMERIC / NULLIF(total, 0) * 100, 1). For a revenue-per-order metric: ROUND(total_revenue / NULLIF(order_count, 0), 2). For growth rates: ROUND((new_val - old_val) / NULLIF(old_val, 0) * 100, 1). Any time you divide by an aggregate or by a value that could be zero in some rows, wrap the denominator in NULLIF.</p>
        <p style={{ margin: 0 }}>Combine NULLIF with COALESCE for display purposes: COALESCE(value / NULLIF(denominator, 0), 0) returns 0 instead of NULL when the denominator is zero — useful when a zero percentage is a meaningful display value rather than a missing value. NULLIF also has a secondary use: returning NULL to suppress a specific value in aggregates — AVG(NULLIF(score, -1)) computes the average of scores while treating -1 as "not applicable" (NULLs are excluded from AVG).</p>
      </IQ>

      <IQ q="What is the difference between ROUND, FLOOR, CEIL, and TRUNC?">
        <p style={{ margin: '0 0 14px' }}>All four reduce a decimal number to fewer decimal places but with different rounding behaviour. ROUND(n, dp) rounds to the nearest value at dp decimal places — values at exactly .5 round up in standard SQL. ROUND(3.456, 2) = 3.46 (rounds up). ROUND(3.454, 2) = 3.45 (rounds down). ROUND accepts negative dp to round to tens, hundreds: ROUND(1234, -2) = 1200.</p>
        <p style={{ margin: '0 0 14px' }}>FLOOR(n) always rounds down to the largest integer not greater than n. FLOOR(3.9) = 3. FLOOR(-3.1) = -4 (more negative, not -3). CEIL(n) always rounds up to the smallest integer not less than n. CEIL(3.1) = 4. CEIL(-3.9) = -3 (less negative, not -4). TRUNC(n, dp) cuts off at dp decimal places without rounding — TRUNC(3.99, 1) = 3.9 (not 4.0). TRUNC always truncates toward zero for both positive and negative numbers.</p>
        <p style={{ margin: 0 }}>When to use each: ROUND for financial display where standard rounding is expected (₹ amounts, percentages). FLOOR for conservative estimates, bin lower-bounds, and page-down calculations (how many complete pages?). CEIL for coverage calculations, minimum quantities, and page-up calculations (how many pages needed to fit N items?). TRUNC when you need to cut precision without any rounding — for example, extracting the integer part of a number without rounding it up: TRUNC(salary / 1000, 0) gives the thousands-level band (₹45,678 → 45).</p>
      </IQ>

      <IQ q="How do you calculate percentage of total in SQL?">
        <p style={{ margin: '0 0 14px' }}>Three approaches. First, using a subquery for the total: SELECT store_id, revenue, ROUND(revenue::NUMERIC / (SELECT SUM(revenue) FROM store_revenues) * 100, 1) AS pct_of_total FROM store_revenues. The subquery computes the grand total once and each row divides its revenue by it. NULLIF protects against a zero total. The ::NUMERIC cast prevents integer division.</p>
        <p style={{ margin: '0 0 14px' }}>Second, using a window function — more efficient and cleaner: SELECT store_id, revenue, ROUND(revenue::NUMERIC / SUM(revenue) OVER () * 100, 1) AS pct_of_total FROM store_revenues. SUM(revenue) OVER () computes the grand total across all rows and attaches it to each row in one pass — no subquery needed.</p>
        <p style={{ margin: 0 }}>Third, using CROSS JOIN to a single-row total: WITH totals AS (SELECT SUM(revenue) AS grand_total FROM store_revenues) SELECT sr.store_id, sr.revenue, ROUND(sr.revenue / NULLIF(t.grand_total, 0) * 100, 1) AS pct FROM store_revenues AS sr CROSS JOIN totals AS t. This is explicit and readable. Key rules for all three: always cast the numerator or denominator to NUMERIC before dividing (integer / integer discards the decimal part, giving 0 or 1 for values under 100%); always protect the denominator with NULLIF(total, 0); always ROUND to a reasonable number of decimal places (1 or 2 for percentages).</p>
      </IQ>

      <IQ q="What is the integer division trap and how do you avoid it?">
        <p style={{ margin: '0 0 14px' }}>When both operands in a division are integer types, SQL performs integer division — discarding the fractional remainder. 7 / 2 = 3 (not 3.5). 1 / 3 = 0 (not 0.333). This is not a bug — it is the defined behaviour for integer arithmetic in SQL. But it produces incorrect results in percentage and ratio calculations where a decimal result is expected.</p>
        <p style={{ margin: '0 0 14px' }}>The most common symptom: a percentage calculation always returns 0 or 100 instead of a decimal value. SELECT COUNT(CASE WHEN status = 'Delivered' THEN 1 END) / COUNT(*) * 100 FROM orders — if the counts are both integers, the division produces 0 or 1 (integer), then multiplied by 100 gives 0 or 100. Never the expected decimal percentage.</p>
        <p style={{ margin: 0 }}>Three fixes: cast one operand to NUMERIC — COUNT(...)::NUMERIC / COUNT(*) * 100; use a decimal literal — COUNT(...) / COUNT(*) * 100.0 (the 100.0 float forces decimal promotion); or use CAST explicitly — CAST(COUNT(...) AS NUMERIC) / COUNT(*) * 100. The cast must apply to the numerator or denominator before the division occurs — casting the result of an integer division (SELECT (7 / 2)::NUMERIC) still gives 3.0, not 3.5. The cast must come before the division: SELECT 7::NUMERIC / 2 → 3.5. The same trap applies to AVG of integers — AVG(integer_column) returns an integer in some databases (MySQL) but numeric in others (PostgreSQL). Always verify AVG results when working with integer columns across different databases.</p>
      </IQ>

      <IQ q="How do you detect outliers in SQL using standard deviation?">
        <p style={{ margin: '0 0 14px' }}>The standard z-score approach: a value is an outlier if it is more than N standard deviations from the mean (commonly N=2 or N=3). The z-score formula is z = (value - mean) / stddev. Values with |z| {'>'} 2 are outside 95% of the distribution (assuming normal distribution); |z| {'>'} 3 are outside 99.7%.</p>
        <p style={{ margin: '0 0 14px' }}>SQL implementation: compute mean and stddev in a CTE or derived table, then JOIN to the original table and compute z-scores per row: WITH stats AS (SELECT AVG(total_amount) AS mean_val, STDDEV(total_amount) AS std_val FROM orders WHERE order_status = 'Delivered') SELECT order_id, total_amount, ROUND(ABS(total_amount - s.mean_val) / NULLIF(s.std_val, 0), 2) AS z_score FROM orders, stats AS s WHERE ABS(total_amount - s.mean_val) {'>'} 2 * s.std_val. NULLIF protects against the case where all values are identical (stddev = 0).</p>
        <p style={{ margin: 0 }}>An alternative to z-score is the IQR (interquartile range) method — more robust to extreme outliers: outliers are values below Q1 - 1.5 × IQR or above Q3 + 1.5 × IQR. IQR = Q3 - Q1 computed with PERCENTILE_CONT. The IQR method does not assume a normal distribution and is preferred for skewed data (like revenue or order values which are typically right-skewed). For time-series data, per-period outlier detection (z-score within each month) is more meaningful than a global z-score across all periods — a ₹5,000 order might be normal in December but an outlier in January.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: division by zero"
        cause="A division expression has a denominator that evaluates to zero for at least one row. This terminates the entire query — no rows are returned at all. Common causes: dividing by COUNT() when a group has zero rows (impossible — COUNT always returns at least 0), dividing by SUM() when a group's sum is zero, dividing by a column value that contains zero, or computing a percentage where the denominator column has zero for some categories."
        fix="Wrap every denominator in NULLIF(denominator, 0). This converts zero to NULL — NULL divided by anything returns NULL rather than causing an error. ROUND(numerator / NULLIF(denominator, 0), 2) safely returns NULL for zero-denominator rows while computing normally for all other rows. Chain with COALESCE if you need 0 instead of NULL: COALESCE(numerator / NULLIF(denominator, 0), 0). Make NULLIF the default for all ratio and percentage calculations — treat it as mandatory syntax, not an edge-case protection."
      />

      <Err
        msg="Percentage calculation always returns 0 or 100 — never a decimal value"
        cause="Integer division is discarding the fractional part. When both the numerator and denominator are integer types (which COUNT(*) and SUM of INTEGER columns produce), SQL performs integer division: 3 / 10 = 0, 10 / 10 = 1. Multiplying by 100 afterward gives 0 or 100. The cast to decimal must happen before the division, not after."
        fix="Cast the numerator to NUMERIC before dividing: COUNT(CASE WHEN ... THEN 1 END)::NUMERIC / COUNT(*) * 100. Or use a decimal literal in the multiplication: / COUNT(*) * 100.0. Check the types of your columns — if the column is INTEGER, SUM produces INTEGER. Cast appropriately: SUM(integer_col)::NUMERIC. Verify the fix by running SELECT 1::NUMERIC / 3 — should return 0.333..., not 0."
      />

      <Err
        msg="ROUND returns unexpected results — rounding seems wrong"
        cause="Two possible causes: (1) the number being rounded is a floating-point type (FLOAT/DOUBLE) which has binary precision issues — 0.1 in binary floating point is not exactly 0.1, causing ROUND(2.675, 2) to sometimes return 2.67 instead of 2.68. (2) Banker's rounding — some databases implement round-half-to-even rather than round-half-up, so ROUND(2.5, 0) = 2 (not 3) in these implementations."
        fix="Use NUMERIC (exact decimal arithmetic) instead of FLOAT for monetary values: ROUND(amount::NUMERIC, 2). NUMERIC stores exact decimal values, avoiding binary floating-point imprecision. For round-half-up behaviour in all cases: FLOOR(value * 10^dp + 0.5) / 10^dp — this manually implements round-half-up. For financial calculations, always use NUMERIC columns and ROUND to 2 decimal places at every aggregation step — do not let floating-point accumulate through multiple operations."
      />

      <Err
        msg="STDDEV returns NULL — expected a number"
        cause="STDDEV returns NULL when the input has only one row (standard deviation requires at least two values — it divides by n-1) or when all input values are NULL. STDDEV_POP divides by n and returns 0 for a single-row input, but STDDEV (sample standard deviation) returns NULL for one row because the denominator n-1 = 0."
        fix="Check the group size before computing STDDEV: CASE WHEN COUNT(*) > 1 THEN STDDEV(column) ELSE NULL END. Or use STDDEV_POP if population standard deviation is appropriate for your use case — it returns 0 for a single-row group. For outlier detection, handle the NULL with COALESCE: COALESCE(STDDEV(column), 0) treats single-row groups as having zero spread. Also verify no upstream NULL filtering has reduced the group to one row — a WHERE clause that is too restrictive can produce single-row groups where multi-row groups are expected."
      />

      <Err
        msg="POWER(base, 0.5) returns wrong result for negative base"
        cause="SQRT and POWER with fractional exponents return NULL (or an error) for negative inputs in most SQL databases. POWER(-4, 0.5) is mathematically a complex number — SQL does not support complex arithmetic and returns NULL or raises an error. This can occur when computing distance or RMS values on data that contains negative differences."
        fix="Ensure the base is non-negative before calling POWER or SQRT. For standard deviation-related calculations use ABS first: SQRT(ABS(variance_value)). For distance calculations: SQRT(POWER(ABS(x2 - x1), 2) + POWER(ABS(y2 - y1), 2)) — ABS is technically unnecessary for squared differences (squaring makes all values positive) but documents the intent. Use NULLIF to handle edge cases: SQRT(NULLIF(ABS(value), 0)) returns NULL for zero rather than a potential error."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a comprehensive product profitability report using math functions. For each product category show: category, product_count, total_units_sold (0 if none sold), total_revenue (0 if none), total_cogs (sum of cost_price × quantity, 0 if none), gross_profit (revenue minus cogs), gross_margin_pct (gross_profit / revenue × 100, rounded to 1dp, NULL if no revenue), avg_unit_price (rounded to 2dp), price_stddev (rounded to 2dp), price_cv_pct (coefficient of variation = stddev/avg × 100, rounded to 1dp, NULL if avg is 0), and a profitability_band: 'High Margin' if gross_margin_pct >= 40, 'Good Margin' if >= 25, 'Low Margin' if >= 10, 'Loss/Unknown' otherwise. Sort by gross_margin_pct descending, NULLs last."
        hint="LEFT JOIN products to aggregated order_items+orders for sales data. NULLIF on revenue for margin pct. NULLIF on avg for CV. COALESCE for zeros. CASE for band."
        answer={`WITH product_sales AS (
  SELECT
    oi.product_id,
    SUM(oi.quantity)                   AS units_sold,
    ROUND(SUM(oi.line_total), 2)       AS revenue,
    ROUND(SUM(p2.cost_price * oi.quantity), 2) AS cogs
  FROM order_items AS oi
  JOIN orders   AS o  ON oi.order_id    = o.order_id
  JOIN products AS p2 ON oi.product_id  = p2.product_id
  WHERE o.order_status = 'Delivered'
  GROUP BY oi.product_id
),
category_metrics AS (
  SELECT
    p.category,
    COUNT(DISTINCT p.product_id)                    AS product_count,
    COALESCE(SUM(ps.units_sold), 0)                 AS total_units_sold,
    COALESCE(SUM(ps.revenue), 0)                    AS total_revenue,
    COALESCE(SUM(ps.cogs), 0)                       AS total_cogs,
    COALESCE(SUM(ps.revenue), 0)
      - COALESCE(SUM(ps.cogs), 0)                   AS gross_profit,
    ROUND(AVG(p.unit_price), 2)                     AS avg_unit_price,
    ROUND(STDDEV(p.unit_price), 2)                  AS price_stddev
  FROM products AS p
  LEFT JOIN product_sales AS ps ON p.product_id = ps.product_id
  GROUP BY p.category
)
SELECT
  category,
  product_count,
  total_units_sold,
  total_revenue,
  total_cogs,
  gross_profit,
  -- Gross margin pct — NULLIF prevents divide by zero
  ROUND(
    gross_profit / NULLIF(total_revenue, 0) * 100
  , 1)                                              AS gross_margin_pct,
  avg_unit_price,
  price_stddev,
  -- Coefficient of variation — NULLIF prevents divide by zero
  ROUND(
    price_stddev / NULLIF(avg_unit_price, 0) * 100
  , 1)                                              AS price_cv_pct,
  CASE
    WHEN gross_profit / NULLIF(total_revenue, 0) * 100 >= 40 THEN 'High Margin'
    WHEN gross_profit / NULLIF(total_revenue, 0) * 100 >= 25 THEN 'Good Margin'
    WHEN gross_profit / NULLIF(total_revenue, 0) * 100 >= 10 THEN 'Low Margin'
    ELSE 'Loss/Unknown'
  END                                               AS profitability_band
FROM category_metrics
ORDER BY gross_margin_pct DESC NULLS LAST;`}
        explanation="The query uses two CTEs. product_sales aggregates delivered order data to product level — joining order_items to orders (for the status filter) and back to products (for cost_price). category_metrics LEFT JOINs all products to product_sales — LEFT JOIN ensures categories with no sold products still appear, with COALESCE converting the NULL aggregates to 0. gross_profit is computed as revenue - cogs directly in the CTE rather than repeating the formula in the final SELECT. The final SELECT applies NULLIF(total_revenue, 0) on the gross margin calculation — if a category has zero revenue (all unsold), this returns NULL rather than a division error, and NULLIF naturally handles the profitability_band CASE too (NULL comparisons evaluate to NULL, falling through to 'Loss/Unknown'). price_cv_pct uses NULLIF(avg_unit_price, 0) — theoretically avg price could be zero if all products in a category were free. NULLIF on avg_unit_price rather than price_stddev is correct because it is the denominator being protected."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'ROUND(n, dp) rounds to dp decimal places. Always specify decimal places explicitly for currency — ROUND(amount, 2). FLOOR always rounds down; CEIL always rounds up; TRUNC cuts without rounding.',
          'ABS returns the magnitude regardless of sign. Use it when you care about how far apart two values are, not which is larger — deviations, tolerances, outlier distances.',
          'MOD(a, b) returns the remainder after division. Use it for cycling (even/odd, A/B buckets), last-N-digit extraction, and identifying multiples.',
          'NULLIF(denominator, 0) is mandatory for all division operations. It converts zero to NULL — NULL / anything = NULL (no error). Pair with COALESCE if you need 0 instead of NULL for display.',
          'Integer division trap: 7 / 2 = 3 in SQL when both are integers. Cast the numerator to NUMERIC before dividing: 7::NUMERIC / 2 = 3.5. This applies to all percentage and ratio calculations.',
          'POWER(base, exponent) for exponentiation. SQRT for square roots. Use POWER(x, 0.5) only on non-negative values — negative inputs return NULL or error.',
          'LOG(n) is base-10 logarithm. LN(n) is natural logarithm. FLOOR(LOG10(value)) gives the order of magnitude — useful for log-scale bucketing.',
          'STDDEV returns NULL for single-row groups (n-1 = 0). Use STDDEV_POP or guard with CASE WHEN COUNT(*) > 1 THEN STDDEV(col) END.',
          'PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col) computes the median. Use PERCENTILE_CONT for the five-number summary: min, Q1, median, Q3, max.',
          'WIDTH_BUCKET(value, min, max, n) assigns values to n uniform-width buckets. Use CASE ranges for business-meaningful non-uniform buckets.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 44</strong>, you learn CAST and type conversion — converting between data types, implicit vs explicit casting, safe casting with TRY_CAST, and the type coercion rules that prevent silent errors.
        </p>
        <Link href="/learn/sql/cast-convert" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 44 → CAST and Type Conversion
        </Link>
      </div>

    </LearnLayout>
  );
}