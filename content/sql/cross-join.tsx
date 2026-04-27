import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import WhyMatters from '@/components/content/WhyMatters';
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

export default function CrossJoin() {
  return (
    <LearnLayout
      title="CROSS JOIN"
      description="Generate every combination — Cartesian products, reference grids, calendar scaffolding, test data, and the scenarios where every-row-with-every-row is exactly what you need"
      section="SQL — Module 35"
      readTime="25 min"
      updatedAt="April 2026"
    >
      <WhyMatters track="sql">
        Instacart's operations team runs JOIN queries every morning to match delivery partner IDs to order IDs. This is that query.
      </WhyMatters>

      {/* ── PART 01 ── */}
      <Part n="01" title="What CROSS JOIN Does — Every Row with Every Row" />

      <P>Every JOIN type you have learned so far requires a join condition — an ON clause that defines which rows from each table relate to each other. <Hl>CROSS JOIN has no join condition</Hl>. It pairs every row from the left table with every row from the right table, producing the <Hl>Cartesian product</Hl> — all possible combinations.</P>

      <P>If the left table has M rows and the right table has N rows, the result has M × N rows. Ten stores cross-joined with five product categories produces 50 rows — one for every (store, category) combination. Ten stores cross-joined with twelve months produces 120 rows — one for every (store, month) pair.</P>

      <CodeBlock
        label="CROSS JOIN syntax"
        code={`-- Explicit CROSS JOIN keyword (preferred — clearly intentional)
SELECT l.col, r.col
FROM left_table  AS l
CROSS JOIN right_table AS r;

-- Implicit CROSS JOIN (old comma syntax — avoid in new code)
SELECT l.col, r.col
FROM left_table AS l, right_table AS r;
-- Same result but reads like a mistake — always use explicit CROSS JOIN

-- Row count: left_rows × right_rows
-- 10 stores × 12 months = 120 rows
-- 5 categories × 3 price_bands = 15 rows`}
      />

      <SQLPlayground
        initialQuery={`-- Every store paired with every product category
-- 10 stores × distinct categories = total combinations
SELECT
  s.store_id,
  s.city         AS store_city,
  cats.category
FROM stores AS s
CROSS JOIN (SELECT DISTINCT category FROM products) AS cats
ORDER BY s.store_id, cats.category;`}
        height={175}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Count: how many (store, category) combinations exist?
SELECT COUNT(*) AS total_combinations
FROM stores
CROSS JOIN (SELECT DISTINCT category FROM products);`}
        height={105}
        showSchema={false}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Primary Use Case — Building a Complete Reference Grid" />

      <P>The most important use of CROSS JOIN in analytics is building a <Hl>complete reference grid</Hl> — a scaffold of all combinations that should exist, which you then LEFT JOIN actual data against to find gaps. This is the foundation of gap analysis and zero-filling reports.</P>

      <P>Without a reference grid, a GROUP BY query only returns groups that have data. If store ST007 had no sales in February, it simply does not appear in the February report — invisible, as if it does not exist. By building a grid of all expected combinations first and LEFT JOINing actual data against it, stores with zero sales appear explicitly with 0 instead of being missing entirely.</P>

      <H>Store × month complete grid</H>

      <SQLPlayground
        initialQuery={`-- Step 1: Generate the reference grid
-- Every store × every observed month in 2024
SELECT
  s.store_id,
  s.city,
  months.order_month
FROM stores AS s
CROSS JOIN (
  SELECT DISTINCT CAST(strftime('%m', order_date) AS INTEGER) AS order_month
  FROM orders
  WHERE strftime('%Y', order_date) = '2024'
) AS months
ORDER BY s.store_id, months.order_month;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: LEFT JOIN actual data against the reference grid
-- Shows 0 for store-month combinations with no delivered orders
WITH grid AS (
  SELECT
    s.store_id,
    s.city,
    months.order_month
  FROM stores AS s
  CROSS JOIN (
    SELECT DISTINCT CAST(strftime('%m', order_date) AS INTEGER) AS order_month
    FROM orders
    WHERE strftime('%Y', order_date) = '2024'
  ) AS months
),
actuals AS (
  SELECT
    store_id,
    CAST(strftime('%m', order_date) AS INTEGER)  AS order_month,
    COUNT(*)                                     AS order_count,
    ROUND(SUM(total_amount), 2)                  AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id, strftime('%m', order_date)
)
SELECT
  g.store_id,
  g.city,
  g.order_month,
  COALESCE(a.order_count, 0)   AS order_count,
  COALESCE(a.revenue, 0)       AS revenue,
  CASE WHEN a.store_id IS NULL THEN '⚠ No data' ELSE '✓ Active' END AS status
FROM grid AS g
LEFT JOIN actuals AS a
  ON g.store_id    = a.store_id
  AND g.order_month = a.order_month
ORDER BY g.store_id, g.order_month;`}
        height={320}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Generating Number Series and Date Ranges" />

      <P>CROSS JOIN is frequently used to generate sequences — lists of consecutive numbers or dates — that do not exist as physical table data. Combined with arithmetic or date arithmetic, a small seed table crossed with itself creates arbitrarily long sequences.</P>

      <H>Generating a number series</H>

      <CodeBlock
        label="Number series via CROSS JOIN"
        code={`-- Generate numbers 0–99 using two-digit decomposition
-- tens: 0,1,2,...,9  × ones: 0,1,2,...,9
SELECT
  tens.n * 10 + ones.n  AS number
FROM (VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) AS tens(n)
CROSS JOIN
     (VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9)) AS ones(n)
ORDER BY number;
-- 10 × 10 = 100 rows: 0 through 99

-- PostgreSQL built-in (cleaner for large ranges):
SELECT generate_series(1, 365) AS day_number;`}
      />

      <H>Generating a calendar scaffold</H>

      <SQLPlayground
        initialQuery={`-- Build a January 2024 calendar scaffold
-- One row per day using a recursive CTE
WITH RECURSIVE day_nums AS (
  SELECT 0 AS n
  UNION ALL
  SELECT n + 1 FROM day_nums WHERE n < 30
)
SELECT
  s.store_id,
  s.city,
  date('2024-01-01', '+' || day_nums.n || ' days') AS cal_date
FROM stores AS s
CROSS JOIN day_nums
ORDER BY s.store_id, cal_date
LIMIT 20;`}
        height={215}
        showSchema={true}
      />

      <H>Using the calendar to find days with no orders</H>

      <SQLPlayground
        initialQuery={`-- All days in January 2024 — show 0 for days with no orders
WITH RECURSIVE day_nums AS (
  SELECT 0 AS n
  UNION ALL
  SELECT n + 1 FROM day_nums WHERE n < 30
),
jan_days AS (
  SELECT date('2024-01-01', '+' || n || ' days') AS cal_date
  FROM day_nums
),
daily_orders AS (
  SELECT
    order_date,
    COUNT(*)                    AS order_count,
    ROUND(SUM(total_amount), 2) AS daily_revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date BETWEEN '2024-01-01' AND '2024-01-31'
  GROUP BY order_date
)
SELECT
  j.cal_date,
  COALESCE(d.order_count, 0)   AS orders,
  COALESCE(d.daily_revenue, 0) AS revenue,
  CASE WHEN d.order_date IS NULL THEN 'No orders' ELSE 'Active' END AS day_status
FROM jan_days AS j
LEFT JOIN daily_orders AS d ON j.cal_date = d.order_date
ORDER BY j.cal_date;`}
        height={270}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="All Possible Combinations — Promotion and Pricing Matrices" />

      <P>CROSS JOIN generates every possible combination — useful for pricing matrices, promotion eligibility grids, A/B test assignment scaffolds, and any scenario where the business needs to account for every possible pairing before filtering down to valid ones.</P>

      <H>Store × loyalty tier promotion matrix</H>

      <SQLPlayground
        initialQuery={`-- Every (store, loyalty_tier) combination for a promotion matrix
-- This is the complete grid before filtering which promotions apply
SELECT
  s.store_id,
  s.city,
  tiers.loyalty_tier,
  -- Simulated discount: Platinum gets 20%, Gold 15%, Silver 10%, Bronze 5%
  CASE tiers.loyalty_tier
    WHEN 'Platinum' THEN 20
    WHEN 'Gold'     THEN 15
    WHEN 'Silver'   THEN 10
    ELSE                  5
  END                     AS discount_pct,
  -- Count actual customers in this store-tier combination
  COUNT(c.customer_id)    AS customer_count
FROM stores AS s
CROSS JOIN (
  VALUES ('Bronze'), ('Silver'), ('Gold'), ('Platinum')
) AS tiers(loyalty_tier)
LEFT JOIN customers AS c
  ON c.city = s.city
  AND c.loyalty_tier = tiers.loyalty_tier
GROUP BY s.store_id, s.city, tiers.loyalty_tier
ORDER BY s.city, tiers.loyalty_tier;`}
        height={265}
        showSchema={true}
      />

      <H>Product × discount tier pricing matrix</H>

      <SQLPlayground
        initialQuery={`-- Price at each discount level for every product
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price                                        AS original_price,
  d.discount_pct,
  ROUND(p.unit_price * (1 - d.discount_pct / 100.0), 2) AS discounted_price,
  ROUND(p.unit_price * d.discount_pct / 100.0, 2)    AS discount_amount
FROM products AS p
CROSS JOIN (
  VALUES (5), (10), (15), (20), (25)
) AS d(discount_pct)
WHERE p.in_stock = true
ORDER BY p.category, p.product_name, d.discount_pct;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Test Data Generation" />

      <P>CROSS JOIN is the most efficient way to generate large volumes of test data — by crossing small seed tables, you can produce thousands of rows without any application-level loops.</P>

      <H>Generating test order scenarios</H>

      <CodeBlock
        label="Test data generation — CROSS JOIN seed values"
        code={`-- Generate all (customer, store, payment_method) test scenarios
-- 5 customers × 3 stores × 4 payment methods = 60 test rows
INSERT INTO test_orders (customer_id, store_id, payment_method, total_amount, order_date)
SELECT
  c.customer_id,
  s.store_id,
  pm.method,
  ROUND(100 + RANDOM() * 900, 2),  -- random amount ₹100–₹1000
  CURRENT_DATE - (RANDOM() * 30)::INTEGER  -- random date in last 30 days
FROM (SELECT customer_id FROM customers LIMIT 5) AS c
CROSS JOIN (SELECT store_id FROM stores LIMIT 3) AS s
CROSS JOIN (
  VALUES ('UPI'), ('Card'), ('COD'), ('NetBanking')
) AS pm(method);`}
      />

      <SQLPlayground
        initialQuery={`-- Preview: all (store, payment_method) combinations
-- Useful as a test scaffold before joining to actual data
SELECT
  s.store_id,
  s.city,
  pm.method                     AS payment_method
FROM stores AS s
CROSS JOIN (
  VALUES ('UPI'), ('Card'), ('COD'), ('NetBanking')
) AS pm(method)
ORDER BY s.store_id, pm.method;`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="VALUES as a Lookup Table" />

      <P>The VALUES clause creates an inline table from literal values. Combined with CROSS JOIN, it eliminates the need for a physical reference table — the lookup data lives directly in the query.</P>

      <CodeBlock
        label="VALUES as an inline table"
        code={`-- Inline price bands — no physical table needed
SELECT p.product_name, p.unit_price, bands.band_name
FROM products AS p
CROSS JOIN (
  VALUES
    ('Budget',   0,    100),
    ('Mid',      100,  300),
    ('Premium',  300,  99999)
) AS bands(band_name, min_price, max_price)
WHERE p.unit_price BETWEEN bands.min_price AND bands.max_price;

-- Inline status labels
SELECT o.order_id, o.order_status, labels.display_label
FROM orders AS o
JOIN (
  VALUES
    ('Delivered',  '✅ Delivered'),
    ('Processing', '🔄 Processing'),
    ('Cancelled',  '❌ Cancelled'),
    ('Returned',   '↩ Returned')
) AS labels(status_code, display_label)
  ON o.order_status = labels.status_code;`}
      />

      <SQLPlayground
        initialQuery={`-- Classify products into price bands using VALUES inline table
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  bands.band_name,
  bands.min_price,
  bands.max_price
FROM products AS p
JOIN (
  VALUES
    ('Budget',   0,     50),
    ('Standard', 50,    150),
    ('Premium',  150,   99999)
) AS bands(band_name, min_price, max_price)
  ON p.unit_price >= bands.min_price
  AND p.unit_price < bands.max_price
ORDER BY p.unit_price;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Accidental CROSS JOIN — The Most Dangerous SQL Mistake" />

      <P>CROSS JOIN is the most dangerous accidental query in SQL. A missing ON condition in an INNER JOIN (when using the old comma syntax) creates an accidental CROSS JOIN — multiplying every row with every other row. On production tables with millions of rows, this can generate trillions of rows, exhaust memory, and crash the database.</P>

      <H>How accidental CROSS JOINs happen</H>

      <CodeBlock
        label="Accidental CROSS JOIN — three common causes"
        code={`-- Cause 1: Comma syntax with missing WHERE condition
SELECT o.order_id, c.first_name
FROM orders o, customers c;
-- FORGOT: WHERE o.customer_id = c.customer_id
-- Result: every order × every customer = massive result

-- Cause 2: Missing ON clause in multi-table join chain
SELECT o.order_id, c.first_name, s.city
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN stores s;    -- FORGOT: ON o.store_id = s.store_id
-- Result: (orders × customers joined) × ALL stores

-- Cause 3: Subquery in FROM without a join condition
SELECT o.order_id, recent.latest_date
FROM orders o, (
  SELECT MAX(order_date) AS latest_date FROM orders
) AS recent;
-- This is actually intentional — scalar subquery broadcast
-- But it reads like an accidental CROSS JOIN

-- Prevention: always use explicit JOIN syntax, never comma syntax
-- The database will error if you write JOIN without ON`}
      />

      <H>Row count sanity check — always do this after any JOIN</H>

      <SQLPlayground
        initialQuery={`-- ALWAYS check: does the row count make sense?
-- orders has ~30 rows, customers has ~20 rows
-- An accidental CROSS JOIN would give 30 × 20 = 600 rows

-- Check 1: how many rows in each table?
SELECT 'orders' AS tbl, COUNT(*) AS rows FROM orders
UNION ALL
SELECT 'customers', COUNT(*) FROM customers
UNION ALL
SELECT 'stores', COUNT(*) FROM stores;`}
        height={150}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Check 2: does your join return a sensible count?
-- For orders JOIN customers: should be ~= number of orders (one per order)
SELECT COUNT(*) AS joined_rows
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id;
-- If this returned 600 instead of ~30, the join condition is wrong`}
        height={120}
        showSchema={false}
      />

      <Callout type="warning">
        Always run SELECT COUNT(*) immediately after writing a new JOIN query — before fetching any actual data. Compare the count to the number of rows in the primary table. If it is unexpectedly large (orders of magnitude bigger than the left table), you likely have an accidental CROSS JOIN or a fan-out from a one-to-many join. Catching this at COUNT time is free. Catching it after fetching 10 million rows is expensive.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="CROSS JOIN vs Other Methods for the Same Result" />

      <P>For many use cases, CROSS JOIN competes with alternative approaches. Knowing when CROSS JOIN is the right tool — versus generate_series, recursive CTEs, or application-level loops — makes your code cleaner and more maintainable.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Goal', 'Best approach', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Generate number 1–1000', 'generate_series(1,1000) in PostgreSQL or range() in DuckDB', 'Built-in, cleaner, no table needed'],
              ['Generate date range', 'generate_series(start, end, interval) in PostgreSQL', 'Purpose-built, handles DST and month edges correctly'],
              ['All store × month combinations', 'CROSS JOIN stores × months subquery', 'Natural — two meaningful sets crossed together'],
              ['All product × discount combinations', 'CROSS JOIN products × VALUES', 'Clean inline table for small fixed value sets'],
              ['Build test data at scale', 'CROSS JOIN multiple seed tables', 'Exponential growth with minimal source rows'],
              ['Broadcast a single value to all rows', 'Scalar subquery in SELECT or CROSS JOIN single-row subquery', 'Both work — scalar subquery is cleaner for one value'],
            ].map(([goal, approach, why], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{goal}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{approach}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data analyst at BigBasket, India's largest online grocery platform. The growth team is building a monthly performance dashboard. The requirement: show revenue and order count for every (store, category, month) combination — including combinations with zero activity. Without a reference grid, the GROUP BY query simply omits zero combinations, making it impossible to spot which stores stopped selling which categories in which months.</P>

      <TimeBlock time="11:00 AM" label="The problem with plain GROUP BY">
        Plain GROUP BY only returns groups that have data — zero combinations are invisible. You need to show all combinations explicitly.
      </TimeBlock>

      <TimeBlock time="11:15 AM" label="Step 1 — build the reference grid with CROSS JOIN">
        Cross join stores × product categories × months to get every expected combination.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Reference grid: every (store, category, month) combination
SELECT
  s.store_id,
  s.city,
  cats.category,
  months.order_month
FROM stores AS s
CROSS JOIN (SELECT DISTINCT category FROM products) AS cats
CROSS JOIN (
  SELECT DISTINCT CAST(strftime('%m', order_date) AS INTEGER) AS order_month
  FROM orders
  WHERE strftime('%Y', order_date) = '2024'
) AS months
ORDER BY s.store_id, cats.category, months.order_month
LIMIT 20;`}
        height={225}
        showSchema={true}
      />

      <TimeBlock time="11:35 AM" label="Step 2 — LEFT JOIN actual data against the grid">
        Actuals fill in where data exists. Zero combinations show 0 revenue.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Complete dashboard: all (store, category, month) with actuals
WITH grid AS (
  SELECT
    s.store_id,
    s.city,
    cats.category,
    months.order_month
  FROM stores AS s
  CROSS JOIN (SELECT DISTINCT category FROM products) AS cats
  CROSS JOIN (
    SELECT DISTINCT CAST(strftime('%m', order_date) AS INTEGER) AS order_month
    FROM orders
    WHERE strftime('%Y', order_date) = '2024'
  ) AS months
),
actuals AS (
  SELECT
    o.store_id,
    p.category,
    CAST(strftime('%m', o.order_date) AS INTEGER)  AS order_month,
    COUNT(DISTINCT o.order_id)                     AS order_count,
    ROUND(SUM(oi.line_total), 2)                   AS revenue
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
    AND strftime('%Y', o.order_date) = '2024'
  GROUP BY o.store_id, p.category, strftime('%m', o.order_date)
)
SELECT
  g.store_id,
  g.city,
  g.category,
  g.order_month,
  COALESCE(a.order_count, 0)  AS order_count,
  COALESCE(a.revenue, 0)      AS revenue,
  CASE WHEN a.store_id IS NULL THEN '⚠ Zero' ELSE '✓' END AS activity
FROM grid AS g
LEFT JOIN actuals AS a
  ON g.store_id   = a.store_id
  AND g.category   = a.category
  AND g.order_month = a.order_month
ORDER BY g.store_id, g.category, g.order_month;`}
        height={340}
        showSchema={false}
      />

      <TimeBlock time="12:00 PM" label="Dashboard complete — zero combinations visible">
        The report shows all combinations with zero activity clearly marked. The growth team immediately spots that certain store-category-month combinations have no activity and can investigate whether it is a supply issue, a data pipeline problem, or a genuine demand gap. None of this was visible in the plain GROUP BY version.
      </TimeBlock>

      <ProTip>
        The CROSS JOIN + LEFT JOIN pattern is the correct architecture for any dashboard that needs to show zero values. Build the complete grid first (CROSS JOIN), then fill in actuals (LEFT JOIN), then display with COALESCE for clean zeros. This pattern works for any dimensional combination: store × time, product × region, customer × channel, employee × month. Build it once as a reusable CTE pattern in your team's query library.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a CROSS JOIN and when would you use it intentionally?">
        <p style={{ margin: '0 0 14px' }}>A CROSS JOIN produces the Cartesian product of two tables — every row from the left table paired with every row from the right table. There is no join condition (no ON clause). If the left table has M rows and the right table has N rows, the result has M × N rows. It is the only JOIN type that does not require a matching condition between the tables.</p>
        <p style={{ margin: '0 0 14px' }}>Intentional use cases: building a complete reference grid for reports that must show all combinations including those with no activity. CROSS JOIN stores × months creates all (store, month) pairs; LEFT JOINing actual sales data against this grid fills in zeros for months where a store had no activity. Without the grid, GROUP BY would silently omit the zero combinations. Other use cases: generating number sequences or date ranges by crossing small seed tables, creating pricing or discount matrices by crossing products with discount levels, building test data by crossing multiple dimension tables (customer × store × payment method), and broadcasting a single computed value (like a grand total) to every row for percentage calculations.</p>
        <p style={{ margin: 0 }}>The key signal that CROSS JOIN is appropriate: you need all possible combinations of two sets, regardless of whether those combinations exist in the actual data. If you only care about combinations that exist, INNER JOIN is correct. If you care about combinations that might not exist in the data, CROSS JOIN + LEFT JOIN is the pattern.</p>
      </IQ>

      <IQ q="What is an accidental Cartesian product and how do you detect and prevent it?">
        <p style={{ margin: '0 0 14px' }}>An accidental Cartesian product happens when a JOIN is written without a join condition (or with a missing/incorrect ON clause), causing every row from one table to be paired with every row from another. The result set size explodes to left_rows × right_rows. With two production tables each containing a million rows, this produces a trillion-row result that will exhaust memory and potentially crash the database session.</p>
        <p style={{ margin: '0 0 14px' }}>The most common causes: using old comma syntax (FROM orders, customers) and forgetting the WHERE join condition, writing JOIN without ON in a multi-table chain, or accidentally typing a condition that is always true (ON 1 = 1). Modern explicit JOIN syntax helps — most databases require an ON clause after JOIN and will parse error without one.</p>
        <p style={{ margin: 0 }}>Detection: always run SELECT COUNT(*) before fetching data from any new JOIN query. Compare the count to the expected result size. For a customers JOIN orders, the result should have approximately as many rows as the orders table (one row per order). If it returns orders_count × customers_count rows, the join condition is missing. Prevention: always use explicit JOIN syntax rather than comma syntax, always add an ON clause, prefix every column with its table alias (so a missing join is more visible), and establish the habit of COUNT(*) verification as the first step after writing any JOIN. For complex queries with many tables, build joins incrementally — add one table at a time and verify the count at each step.</p>
      </IQ>

      <IQ q="How would you generate a report showing revenue for every store for every month, including months with zero revenue?">
        <p style={{ margin: '0 0 14px' }}>A plain GROUP BY query only returns combinations where data exists — months with zero revenue are simply absent from the result. To show zeros explicitly, you need a reference grid of all expected (store, month) combinations, then LEFT JOIN actual revenue data against it.</p>
        <p style={{ margin: '0 0 14px' }}>Step 1 — build the grid with CROSS JOIN: SELECT s.store_id, m.month FROM stores AS s CROSS JOIN (SELECT DISTINCT EXTRACT(MONTH FROM order_date) AS month FROM orders) AS m. This produces one row for every (store, month) combination regardless of whether any orders existed. Step 2 — aggregate actuals: SELECT store_id, EXTRACT(MONTH FROM order_date) AS month, SUM(total_amount) AS revenue FROM orders WHERE order_status = 'Delivered' GROUP BY store_id, month. Step 3 — LEFT JOIN grid to actuals: SELECT g.store_id, g.month, COALESCE(a.revenue, 0) AS revenue FROM grid AS g LEFT JOIN actuals AS a ON g.store_id = a.store_id AND g.month = a.month ORDER BY g.store_id, g.month.</p>
        <p style={{ margin: 0 }}>The COALESCE(a.revenue, 0) converts NULLs (months with no activity) to zero for clean display. This three-step pattern — CROSS JOIN reference grid, aggregate actuals, LEFT JOIN — is the standard architecture for any "show all combinations including zeros" requirement. It works for any dimensional combination: store × month, product × store, customer × product category. The key is always building the complete grid first, then filling it with actual data.</p>
      </IQ>

      <IQ q="What is the VALUES clause and how can it be used with CROSS JOIN?">
        <p style={{ margin: '0 0 14px' }}>The VALUES clause creates an inline table from literal values without requiring a physical table to exist. It generates rows from explicitly listed tuples: VALUES (val1a, val2a), (val1b, val2b), (val1c, val2c). Used in FROM with an alias and column names, it becomes a queryable table: (VALUES ('Bronze'), ('Silver'), ('Gold'), ('Platinum')) AS tiers(loyalty_tier).</p>
        <p style={{ margin: '0 0 14px' }}>Combined with CROSS JOIN, VALUES creates combination matrices on the fly. CROSS JOIN stores WITH (VALUES ('Bronze'),('Silver'),('Gold'),('Platinum')) AS tiers(tier) generates every (store, tier) combination — without needing a physical loyalty_tiers table. This is useful for pricing matrices, discount levels, configuration options, and any small fixed set of values that does not warrant a separate table.</p>
        <p style={{ margin: 0 }}>VALUES is also used as an inline lookup table with JOIN. JOIN (VALUES ('Delivered','✅'),('Cancelled','❌'),('Processing','🔄'),('Returned','↩')) AS labels(status, icon) ON orders.order_status = labels.status translates status codes to display labels without requiring a separate status_labels table. The pattern eliminates the need for small reference tables that would otherwise clutter the schema — the reference data lives directly in the query where it is used. For production use, if the same VALUES table appears in many queries, extract it into a real reference table for single-point maintenance.</p>
      </IQ>

      <IQ q="How does CROSS JOIN differ from UNION ALL?">
        <p style={{ margin: '0 0 14px' }}>CROSS JOIN and UNION ALL are both operations that combine data from two sources, but they work orthogonally — in different structural directions and for different purposes.</p>
        <p style={{ margin: '0 0 14px' }}>CROSS JOIN is a horizontal combination — it joins columns from two tables side by side, producing a result with columns from both tables. Each row in the result comes from one row in the left table and one row in the right table. The result has left_columns + right_columns columns and left_rows × right_rows rows. It generates combinations.</p>
        <p style={{ margin: 0 }}>UNION ALL is a vertical combination — it stacks rows from two queries on top of each other. Both queries must return the same number of columns in compatible types. The result has the same number of columns as each query and left_rows + right_rows rows (all rows from both queries, including duplicates). It concatenates. The mental model: CROSS JOIN expands horizontally (more columns, more rows via multiplication). UNION ALL expands vertically (same columns, more rows via addition). They serve completely different purposes: CROSS JOIN for generating combinations, UNION ALL for combining result sets that contain the same type of data from different sources or time periods.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query is running for 10+ minutes and database memory is exhausted"
        cause="An accidental CROSS JOIN is generating a massive result. The most common cause is a JOIN written without an ON clause (or with a typo in the ON clause that makes it too broad), using the old comma syntax (FROM a, b) without a WHERE condition, or a CROSS JOIN that is larger than anticipated — crossing a 100,000-row table with a 10,000-row table gives one billion rows."
        fix="Cancel the query immediately (pg_cancel_backend in PostgreSQL, KILL QUERY in MySQL). Check the FROM and JOIN clauses: count the tables and the join conditions — if you have N tables, you need N-1 join conditions. Run SELECT COUNT(*) FROM each_table separately to understand individual table sizes. Then verify the expected join result size: for a reference grid CROSS JOIN, M × N should be a manageable number (stores × months = 10 × 2 = 20 rows, not millions). Always compute expected row count before executing any CROSS JOIN on production tables."
      />

      <Err
        msg="CROSS JOIN reference grid is correct but LEFT JOIN still shows missing combinations"
        cause="The LEFT JOIN condition does not match the grid's column names or data types exactly. If the grid uses INTEGER months and the actuals use DECIMAL months (from EXTRACT), they will not match. If the grid uses VARCHAR store_id and the actuals use a different representation, the join silently fails to match and all grid rows appear with NULLs."
        fix="Run SELECT DISTINCT store_id, order_month FROM grid and SELECT DISTINCT store_id, order_month FROM actuals and compare the values and types side by side. Use pg_typeof(column) or typeof(column) in DuckDB to check types. Cast to ensure matching types: ON g.order_month = a.order_month::INTEGER or use EXTRACT consistently in both the grid and the actuals. After fixing, verify by checking that at least one grid row matches its corresponding actual row."
      />

      <Err
        msg="VALUES inline table produces a syntax error"
        cause="Different databases have different syntax for VALUES in FROM. Some require explicit column names in the alias: (VALUES (...)) AS t(col1, col2). Others require specific wrapping. PostgreSQL requires the column alias list. DuckDB supports VALUES as a select expression. MySQL has limited support for VALUES in FROM in older versions."
        fix="For PostgreSQL and DuckDB: (VALUES ('a', 1), ('b', 2)) AS t(name, code) — always include the column alias list. For MySQL 8.0+: same syntax works. For MySQL before 8.0: replace VALUES inline tables with a UNION ALL subquery: (SELECT 'a' AS name, 1 AS code UNION ALL SELECT 'b', 2) AS t. The UNION ALL pattern is the most portable across all database versions."
      />

      <Err
        msg="Reference grid has duplicate rows — some combinations appear multiple times"
        cause="The source data for one of the CROSS JOIN dimensions contains duplicates. If the months subquery returns duplicate month values (because multiple orders share the same month), the grid will have duplicate (store, month) rows. CROSS JOIN with N stores and M distinct months = N×M rows, but if months has duplicates it gives N×(M+duplicates) rows."
        fix="Add DISTINCT to each dimension before the CROSS JOIN: (SELECT DISTINCT EXTRACT(MONTH FROM order_date) AS month FROM orders) instead of (SELECT EXTRACT(MONTH FROM order_date) AS month FROM orders). Verify each dimension subquery returns the expected unique count: SELECT COUNT(*) from the subquery before using it in the CROSS JOIN. A 12-month grid should have exactly 12 rows from the months dimension."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart business team wants a complete payment method performance report. Write a query using CROSS JOIN that shows for every (store, payment_method) combination: store_id, city, payment_method, order_count (0 if none), total_revenue (0 if none), avg_order_value (NULL is acceptable for zero combinations), and a 'performance' column: 'Strong' if revenue > ₹1500, 'Moderate' if revenue > ₹500, 'Weak' if revenue > 0, 'No activity' if zero. Use the four payment methods: UPI, Card, COD, NetBanking. Only include delivered orders. Sort by store_id then total_revenue descending."
        hint="CROSS JOIN stores × VALUES payment methods. LEFT JOIN actual delivered order data aggregated by (store_id, payment_method). COALESCE for zeros. CASE on revenue for performance band."
        answer={`WITH grid AS (
  SELECT
    s.store_id,
    s.city,
    pm.payment_method
  FROM stores AS s
  CROSS JOIN (
    VALUES ('UPI'), ('Card'), ('COD'), ('NetBanking')
  ) AS pm(payment_method)
),
actuals AS (
  SELECT
    store_id,
    payment_method,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS total_revenue,
    ROUND(AVG(total_amount), 2)  AS avg_order_value
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id, payment_method
)
SELECT
  g.store_id,
  g.city,
  g.payment_method,
  COALESCE(a.order_count, 0)       AS order_count,
  COALESCE(a.total_revenue, 0)     AS total_revenue,
  a.avg_order_value,
  CASE
    WHEN COALESCE(a.total_revenue, 0) > 1500 THEN 'Strong'
    WHEN COALESCE(a.total_revenue, 0) > 500  THEN 'Moderate'
    WHEN COALESCE(a.total_revenue, 0) > 0    THEN 'Weak'
    ELSE                                          'No activity'
  END                              AS performance
FROM grid AS g
LEFT JOIN actuals AS a
  ON g.store_id       = a.store_id
  AND g.payment_method = a.payment_method
ORDER BY g.store_id, total_revenue DESC;`}
        explanation="The grid CTE uses CROSS JOIN to generate all 10 × 4 = 40 (store, payment_method) combinations — every store paired with every payment method regardless of whether that combination has any orders. The actuals CTE aggregates delivered orders grouped by the same two dimensions. The final LEFT JOIN fills in actuals where they exist and leaves NULLs where no orders match — for those NULLs, COALESCE converts them to 0 for order_count and total_revenue. avg_order_value is left as NULL for zero combinations (no average makes sense for zero orders). The CASE uses COALESCE(revenue, 0) to safely compare the potentially NULL revenue — without COALESCE, NULL > 1500 would evaluate to NULL and fall through all WHEN conditions to the ELSE, but since we already converted to 0 via COALESCE this is handled cleanly. ORDER BY total_revenue DESC puts the most active payment methods first within each store."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'CROSS JOIN produces the Cartesian product — every row from the left table paired with every row from the right. M rows × N rows = M×N result rows. No join condition required or allowed.',
          'The primary legitimate use: building a complete reference grid for reports. CROSS JOIN stores × months generates all combinations; LEFT JOIN actual data fills in zeros for missing combinations.',
          'Without a reference grid, GROUP BY silently omits zero combinations — making gaps invisible. CROSS JOIN + LEFT JOIN + COALESCE makes every gap explicit with a 0.',
          'VALUES creates an inline table from literal values: (VALUES (\'UPI\'),(\'Card\'),(\'COD\')) AS pm(method). Combined with CROSS JOIN, it generates combination matrices without needing a physical reference table.',
          'Accidental CROSS JOIN is the most dangerous SQL mistake — a missing ON condition creates M×N rows. Always run SELECT COUNT(*) before fetching data from any new JOIN query.',
          'The row count sanity check: for a JOIN on a one-to-one or many-to-one relationship, the result should have approximately the same number of rows as the left table. Significantly more rows signals a fan-out or accidental CROSS JOIN.',
          'CROSS JOIN is for multiplication (all combinations). UNION ALL is for addition (all rows). They solve different problems and are not interchangeable.',
          'Use DISTINCT in each dimension subquery before CROSS JOIN to prevent duplicate combinations in the grid: SELECT DISTINCT EXTRACT(MONTH FROM order_date) AS month — not SELECT EXTRACT without DISTINCT.',
          'The three-step zero-fill pattern: (1) CROSS JOIN for the complete grid, (2) aggregate actuals, (3) LEFT JOIN grid to actuals with COALESCE. This pattern works for any dimensional combination.',
          'For large dimension tables, CROSS JOIN can be expensive. Always compute expected row count (M × N) before executing — avoid crossing tables with thousands of rows without a size estimate.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 36</strong>, you learn subqueries — queries nested inside other queries. Scalar subqueries, correlated subqueries, subqueries in FROM, WHERE, and SELECT — the foundation of every complex multi-step analysis.
        </p>
        <Link href="/learn/sql/subqueries" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 36 → Subqueries
        </Link>
      </div>

    </LearnLayout>
  );
}