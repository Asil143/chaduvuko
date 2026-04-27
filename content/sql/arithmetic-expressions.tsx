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

export default function ArithmeticExpressions() {
  return (
    <LearnLayout
      title="Column Calculations — Arithmetic & Expressions"
      description="Do math directly inside SQL — operators, precedence, integer division, ROUND, MOD, and building computed columns that power real business analytics"
      section="SQL — Module 12"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why SQL Needs to Do Math" />

      <P>Databases store raw numbers — unit prices, quantities, salaries, order totals. But the numbers that drive business decisions are almost always <Hl>derived</Hl> — profit margin, GST-inclusive price, discount amount, days since order, salary as a percentage of the highest salary in the team. These are not stored anywhere. They are calculated on demand from the raw values.</P>

      <P>SQL lets you perform these calculations directly in your SELECT statement. The result is a computed column that exists only in the query output — the underlying table is never changed. This is one of SQL's most powerful features: the database handles all the math, and you get clean, calculated results without exporting data to Excel and doing it manually.</P>

      <SQLPlayground
        initialQuery={`-- Raw data from the table
SELECT product_name, unit_price, cost_price
FROM products
LIMIT 5;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Calculated columns derived from the raw data
-- The table stores only unit_price and cost_price
-- Everything else is computed on the fly
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price                              AS profit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1) AS margin_pct,
  ROUND(unit_price * 1.18, 2)                          AS price_with_gst
FROM products
LIMIT 5;`}
        height={170}
        showSchema={false}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Five Arithmetic Operators" />

      <P>SQL supports five arithmetic operators for numeric calculations. They work on INTEGER, DECIMAL, FLOAT, and BIGINT columns — and on literal numbers you type directly in the query.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operator', 'Name', 'Example', 'Result', 'FreshCart use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['+', 'Addition',       '100 + 50',   '150',   'unit_price + tax_amount'],
              ['-', 'Subtraction',    '100 - 30',   '70',    'unit_price - cost_price (profit)'],
              ['*', 'Multiplication', '100 * 1.18', '118',   'unit_price * quantity (line total)'],
              ['/', 'Division',       '100 / 4',    '25',    '(profit / unit_price) * 100 (margin %)'],
              ['%', 'Modulo',         '10 % 3',     '1',     'order_id % 2 (split into even/odd batches)'],
            ].map(([op, name, example, result, use], i) => (
              <tr key={op} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 16, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{op}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{name}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{example}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00e676', borderBottom: '1px solid var(--border)' }}>{result}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Addition and subtraction</H>

      <SQLPlayground
        initialQuery={`-- Profit per product: selling price minus cost price
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price    AS profit_per_unit
FROM products
ORDER BY profit_per_unit DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- GST-inclusive price: add 18% to the base price
SELECT
  product_name,
  unit_price                          AS base_price,
  ROUND(unit_price * 0.18, 2)         AS gst_amount,
  ROUND(unit_price + unit_price * 0.18, 2)  AS price_with_gst
FROM products
ORDER BY unit_price DESC
LIMIT 8;`}
        height={160}
        showSchema={false}
      />

      <H>Multiplication</H>

      <SQLPlayground
        initialQuery={`-- Line total for each order item: quantity × unit_price
-- The table already stores line_total — this recalculates it
SELECT
  item_id,
  product_id,
  quantity,
  unit_price,
  quantity * unit_price              AS calculated_total,
  line_total                         AS stored_total
FROM order_items
LIMIT 10;`}
        height={160}
        showSchema={false}
      />

      <H>Division and modulo</H>

      <SQLPlayground
        initialQuery={`-- Margin percentage: profit divided by price, times 100
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price                                    AS profit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)    AS margin_pct
FROM products
ORDER BY margin_pct DESC;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Modulo: split orders into two processing batches
-- Even order_ids go to batch A, odd to batch B
SELECT
  order_id,
  total_amount,
  CASE order_id % 2
    WHEN 0 THEN 'Batch A'
    ELSE        'Batch B'
  END  AS processing_batch
FROM orders
ORDER BY order_id
LIMIT 10;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Operator Precedence — The Order Calculations Run" />

      <P>SQL follows the same arithmetic precedence rules as mathematics. Multiplication and division run before addition and subtraction. Modulo has the same precedence as multiplication and division. Parentheses override everything.</P>

      <CodeBlock
        label="Operator precedence — same as standard mathematics"
        code={`-- Precedence order (highest to lowest):
--   1. Parentheses ()
--   2. Multiplication *, Division /, Modulo %
--   3. Addition +, Subtraction -

-- Example — what does this calculate?
10 + 5 * 2         -- = 10 + 10 = 20 (multiplication first)
(10 + 5) * 2       -- = 15 * 2 = 30 (parentheses first)
100 / 4 + 5 * 2    -- = 25 + 10 = 35
100 / (4 + 5) * 2  -- = 100 / 9 * 2 = 22.22...`}
      />

      <H>The margin percentage mistake</H>
      <P>This is the most common arithmetic precedence bug in SQL analytics. Getting the margin formula wrong produces silently incorrect results — the query runs fine but the numbers are wrong.</P>

      <SQLPlayground
        initialQuery={`-- WRONG: division runs before subtraction due to precedence
-- This calculates: unit_price - (cost_price / unit_price * 100)
-- Which is mathematically nonsensical
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price / unit_price * 100    AS wrong_margin
FROM products
LIMIT 5;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: parentheses around the numerator ensure correct order
-- This calculates: (unit_price - cost_price) / unit_price * 100
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS correct_margin_pct
FROM products
LIMIT 5;`}
        height={140}
        showSchema={false}
      />

      <Callout type="warning">
        When in doubt about precedence, always use parentheses. A query with explicit parentheses around every sub-expression is slower to write but immediately readable and impossible to get wrong. In finance and analytics, a wrong number caused by a missing parenthesis can have real consequences — always verify calculated results against known reference values.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Integer Division — The Silent Truncation Bug" />

      <P>This is one of the most dangerous arithmetic bugs in SQL and it produces no error — just wrong answers. When you divide two integers in PostgreSQL and MySQL, the result is also an integer — the decimal part is silently discarded (truncated, not rounded).</P>

      <SQLPlayground
        initialQuery={`-- Integer division in action — DuckDB (this playground) returns decimal
-- But PostgreSQL and MySQL would return 0 for 1/3
SELECT
  1 / 3        AS int_division,      -- 0 in PostgreSQL/MySQL, 0.333 in DuckDB
  1.0 / 3      AS decimal_division,  -- 0.333 everywhere
  1 / 3.0      AS also_decimal,      -- 0.333 everywhere
  CAST(1 AS DECIMAL) / 3  AS cast_decimal; -- 0.333 everywhere`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- The real problem: margin percentage with integer division
-- In PostgreSQL/MySQL: (unit_price - cost_price) might be integer
-- Dividing by unit_price (integer) gives 0 for all products
-- where profit < unit_price (which is all of them!)
-- FreshCart prices are DECIMAL so this works here
-- but try this pattern on INTEGER columns in production:
SELECT
  product_name,
  unit_price,
  cost_price,
  (unit_price - cost_price) / unit_price          AS wrong_in_postgres,
  (unit_price - cost_price) / unit_price * 100    AS also_wrong_would_be_0
FROM products
LIMIT 5;`}
        height={160}
        showSchema={false}
      />

      <H>The fix — force decimal division</H>
      <P>Three ways to force the database to treat integer division as decimal division:</P>

      <CodeBlock
        label="Three ways to avoid integer division truncation"
        code={`-- Method 1: multiply by 1.0 (promotes to decimal)
(unit_price - cost_price) * 1.0 / unit_price * 100

-- Method 2: use a decimal literal
(unit_price - cost_price) / 1.0 / unit_price * 100

-- Method 3: CAST to DECIMAL explicitly (most explicit, recommended)
CAST(unit_price - cost_price AS DECIMAL) / unit_price * 100

-- Method 4: ROUND() also forces decimal in some databases
ROUND((unit_price - cost_price) / unit_price, 4) * 100`}
      />

      <SQLPlayground
        initialQuery={`-- Safe margin calculation that works on INTEGER columns too
-- CAST ensures no integer division truncation
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND(
    CAST(unit_price - cost_price AS DECIMAL) / unit_price * 100
  , 1)   AS margin_pct
FROM products
ORDER BY margin_pct DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="ROUND, CEIL, FLOOR, ABS — Controlling Numeric Output" />

      <P>Raw division results often have many decimal places. SQL provides built-in functions to control the precision of numeric output.</P>

      <H>ROUND — round to N decimal places</H>

      <CodeBlock
        label="ROUND syntax"
        code={`ROUND(number, decimal_places)
ROUND(3.14159, 2)   -- 3.14
ROUND(3.14159, 0)   -- 3.0
ROUND(3.5, 0)       -- 4  (rounds up at .5)
ROUND(3.45, 1)      -- 3.5
ROUND(1234.567, -2) -- 1200 (negative rounds to left of decimal)`}
      />

      <SQLPlayground
        initialQuery={`-- Round margins to 1 decimal place
-- Round GST-inclusive price to 2 decimal places (paise)
SELECT
  product_name,
  unit_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct,
  ROUND(unit_price * 1.18, 2)                             AS gst_price
FROM products
ORDER BY margin_pct DESC
LIMIT 8;`}
        height={160}
        showSchema={false}
      />

      <H>CEIL — round up to the nearest integer</H>

      <CodeBlock
        label="CEIL / CEILING"
        code={`CEIL(4.1)    -- 5 (always rounds UP)
CEIL(4.9)    -- 5
CEIL(4.0)    -- 4 (already an integer)
CEIL(-4.1)   -- -4 (rounds towards zero for negatives)

-- PostgreSQL uses CEIL, MySQL/DuckDB support both CEIL and CEILING`}
      />

      <SQLPlayground
        initialQuery={`-- CEIL for page count calculation
-- Total pages = CEIL(total_rows / page_size)
SELECT
  COUNT(*)                              AS total_orders,
  10                                    AS page_size,
  CEIL(CAST(COUNT(*) AS DECIMAL) / 10) AS total_pages
FROM orders;`}
        height={120}
        showSchema={false}
      />

      <H>FLOOR — round down to the nearest integer</H>

      <CodeBlock
        label="FLOOR"
        code={`FLOOR(4.9)   -- 4 (always rounds DOWN)
FLOOR(4.1)   -- 4
FLOOR(-4.1)  -- -5 (rounds away from zero for negatives)

-- Common use: discount tiers, age buckets, score bands`}
      />

      <SQLPlayground
        initialQuery={`-- FLOOR for salary bands — which ₹10,000 band is each employee in?
SELECT
  first_name || ' ' || last_name   AS employee,
  salary,
  FLOOR(salary / 10000) * 10000    AS salary_band_floor,
  (FLOOR(salary / 10000) + 1) * 10000 - 1  AS salary_band_ceil
FROM employees
ORDER BY salary DESC;`}
        height={150}
        showSchema={false}
      />

      <H>ABS — absolute value</H>

      <CodeBlock
        label="ABS"
        code={`ABS(100)    -- 100
ABS(-100)   -- 100 (removes the negative sign)
ABS(-3.14)  -- 3.14

-- Common use: distance between values, deviation from target`}
      />

      <SQLPlayground
        initialQuery={`-- ABS for deviation from average price
-- How far is each product from the average price?
SELECT
  product_name,
  unit_price,
  ROUND(AVG(unit_price) OVER (), 2)                    AS avg_price,
  ROUND(ABS(unit_price - AVG(unit_price) OVER ()), 2)  AS deviation_from_avg
FROM products
ORDER BY deviation_from_avg DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Arithmetic in WHERE — Filtering on Calculated Values" />

      <P>You can use arithmetic expressions in WHERE conditions — not just in SELECT. This lets you filter rows based on calculated values without needing a subquery.</P>

      <SQLPlayground
        initialQuery={`-- Find products where profit margin is above 30%
-- Arithmetic in WHERE — the calculation runs for every row
SELECT
  product_name,
  brand,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
WHERE (unit_price - cost_price) / unit_price > 0.30
ORDER BY margin_pct DESC;`}
        height={170}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Orders where the line total per item is above ₹200 on average
-- (total_amount divided by estimated item count)
SELECT
  order_id,
  customer_id,
  total_amount,
  order_date,
  order_status
FROM orders
WHERE total_amount / 3 > 200   -- rough proxy for avg item value
  AND order_status = 'Delivered'
ORDER BY total_amount DESC;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees whose salary is more than 1.5x the minimum salary
SELECT
  first_name || ' ' || last_name  AS employee,
  role,
  salary
FROM employees
WHERE salary > (SELECT MIN(salary) FROM employees) * 1.5
ORDER BY salary DESC;`}
        height={130}
        showSchema={false}
      />

      <Callout type="warning">
        Arithmetic on column values in WHERE prevents index usage — the same way function calls do. WHERE unit_price * 1.18 {'>'} 200 forces the database to calculate unit_price * 1.18 for every row before comparing. Rewrite as WHERE unit_price {'>'} 200 / 1.18 to put the arithmetic on the literal side — this lets the database use an index on unit_price. Move calculations to the value side of comparisons whenever possible.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Arithmetic with Dates — Calculating Time Differences" />

      <P>Date arithmetic is one of the most frequent calculations in real analytics. How long did delivery take? How many days since a customer joined? How old is this record? SQL handles date arithmetic, though the syntax varies slightly between databases.</P>

      <H>Date subtraction — days between two dates</H>

      <SQLPlayground
        initialQuery={`-- Days between order date and delivery date
-- NULL for undelivered orders (delivery_date - order_date where delivery_date IS NULL = NULL)
SELECT
  order_id,
  order_date,
  delivery_date,
  delivery_date - order_date   AS days_to_deliver
FROM orders
WHERE delivery_date IS NOT NULL
ORDER BY days_to_deliver DESC;`}
        height={150}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Average delivery time across all delivered orders
SELECT
  ROUND(AVG(delivery_date - order_date), 1)   AS avg_days_to_deliver,
  MIN(delivery_date - order_date)              AS fastest_delivery,
  MAX(delivery_date - order_date)              AS slowest_delivery
FROM orders
WHERE delivery_date IS NOT NULL;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Days since each customer joined FreshCart
-- CURRENT_DATE is today's date in the database
SELECT
  first_name || ' ' || last_name         AS customer,
  joined_date,
  CURRENT_DATE - joined_date             AS days_since_joined,
  ROUND((CURRENT_DATE - joined_date) / 365.0, 1)  AS years_since_joined
FROM customers
ORDER BY days_since_joined DESC;`}
        height={160}
        showSchema={false}
      />

      <H>Dialect differences for date arithmetic</H>

      <CodeBlock
        label="Date arithmetic across databases"
        code={`-- PostgreSQL and DuckDB (this playground):
-- Subtracting two DATE columns returns an integer (number of days)
delivery_date - order_date       -- returns integer days

-- MySQL:
-- Use DATEDIFF() function
DATEDIFF(delivery_date, order_date)  -- returns integer days

-- Adding days to a date:
-- PostgreSQL: date + INTEGER  or  date + INTERVAL '7 days'
order_date + 7                       -- PostgreSQL: adds 7 days
order_date + INTERVAL '7 days'       -- more explicit

-- MySQL:
DATE_ADD(order_date, INTERVAL 7 DAY)

-- SQL Server:
DATEADD(day, 7, order_date)`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Building Computed Columns — Real Business Analytics" />

      <P>The real power of arithmetic in SQL is building complex computed columns that answer business questions in a single query. Here are complete real-world examples.</P>

      <H>Product profitability report</H>

      <SQLPlayground
        initialQuery={`-- Complete product profitability analysis
SELECT
  product_name,
  category,
  brand,
  unit_price,
  cost_price,
  unit_price - cost_price                                       AS profit_per_unit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)        AS margin_pct,
  ROUND(unit_price * 1.18, 2)                                   AS mrp_with_gst,
  CASE
    WHEN (unit_price - cost_price) / unit_price >= 0.40 THEN 'High Margin'
    WHEN (unit_price - cost_price) / unit_price >= 0.25 THEN 'Medium Margin'
    ELSE 'Low Margin'
  END                                                           AS margin_band
FROM products
WHERE in_stock = true
ORDER BY margin_pct DESC;`}
        height={210}
        showSchema={true}
      />

      <H>Order value analysis</H>

      <SQLPlayground
        initialQuery={`-- Order analysis with calculated fields
SELECT
  order_id,
  order_date,
  total_amount,
  ROUND(total_amount * 0.02, 2)                        AS platform_fee_2pct,
  ROUND(total_amount * 0.18, 2)                        AS gst_18pct,
  ROUND(total_amount + total_amount * 0.18, 2)         AS total_with_gst,
  CASE
    WHEN total_amount >= 2000 THEN 'Premium'
    WHEN total_amount >= 800  THEN 'Standard'
    ELSE 'Basic'
  END                                                  AS order_tier
FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount DESC;`}
        height={200}
        showSchema={false}
      />

      <H>Employee compensation analysis</H>

      <SQLPlayground
        initialQuery={`-- Employee salary analysis with percentages
SELECT
  first_name || ' ' || last_name                        AS employee,
  role,
  salary,
  ROUND(salary * 12, 0)                                 AS annual_ctc,
  ROUND(salary / (SELECT MAX(salary) FROM employees) * 100, 1)
                                                         AS pct_of_max_salary,
  ROUND(salary - AVG(salary) OVER (), 2)                AS diff_from_avg,
  ROUND(salary * 0.12, 2)                               AS pf_contribution
FROM employees
ORDER BY salary DESC;`}
        height={190}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Arithmetic Across Multiple Tables — Using Joins" />

      <P>The most powerful arithmetic queries combine data from multiple tables. You will learn JOINs in depth from Module 30, but here is a preview of how arithmetic works across joined tables — building revenue calculations that span orders, items, and products.</P>

      <SQLPlayground
        initialQuery={`-- Revenue per product: join order_items to products
-- Calculate actual revenue and profit per product sold
SELECT
  p.product_name,
  p.category,
  SUM(oi.quantity)                                            AS units_sold,
  SUM(oi.line_total)                                          AS total_revenue,
  SUM(oi.quantity * p.cost_price)                             AS total_cost,
  ROUND(SUM(oi.line_total) - SUM(oi.quantity * p.cost_price), 2)
                                                              AS gross_profit,
  ROUND(
    (SUM(oi.line_total) - SUM(oi.quantity * p.cost_price))
    / NULLIF(SUM(oi.line_total), 0) * 100
  , 1)                                                        AS profit_margin_pct
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name, p.category
ORDER BY gross_profit DESC;`}
        height={230}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a business analyst at Sephora. The category management team wants a weekly SKU-level profitability report that their buyers use to make restocking decisions. The report needs to show each product's margin, GST-inclusive price, a margin band category, and a restock recommendation based on stock status and margin.</P>

      <TimeBlock time="2:00 PM" label="Requirements briefing">
        The buyer explains: show all products with their margin percentage, GST price (18% added), a margin band (Premium above 40%, Standard 25–40%, Review below 25%), and a restocking flag — restock immediately if margin is above 30% and item is out of stock, otherwise normal replenishment.
      </TimeBlock>

      <TimeBlock time="2:20 PM" label="You build the query">
        Every piece of this report is arithmetic. No data exists in the database for margin_pct, gst_price, margin_band, or restock_flag — all four are computed columns.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Weekly SKU profitability report
SELECT
  product_name,
  category,
  brand,
  unit_price,
  cost_price,
  in_stock,
  -- Calculated columns
  ROUND((unit_price - cost_price) / unit_price * 100, 1)   AS margin_pct,
  ROUND(unit_price * 1.18, 2)                              AS gst_price,
  CASE
    WHEN (unit_price - cost_price) / unit_price >= 0.40 THEN 'Premium'
    WHEN (unit_price - cost_price) / unit_price >= 0.25 THEN 'Standard'
    ELSE 'Review'
  END                                                       AS margin_band,
  CASE
    WHEN (unit_price - cost_price) / unit_price > 0.30
     AND in_stock = false THEN 'RESTOCK IMMEDIATELY'
    WHEN in_stock = false THEN 'Monitor'
    ELSE 'In Stock'
  END                                                       AS restock_flag
FROM products
ORDER BY margin_pct DESC;`}
        height={240}
        showSchema={true}
      />

      <TimeBlock time="2:45 PM" label="Delivered and verified">
        The query runs in under 1 second and produces 25 rows — one per product. The buyer immediately spots that Parle-G Biscuits have a 30% margin and are out of stock — restock flag fires correctly. Head & Shoulders Shampoo has a 23% margin and is in stock — margin_band shows "Review" for the buyer to investigate cost reduction. The entire report that used to take 30 minutes of Excel work now takes 3 seconds to run and is always accurate.
      </TimeBlock>

      <ProTip>
        The most valuable thing about arithmetic in SQL is that it is reproducible and documentable. Every calculation is visible in the query. A colleague can review it, modify the margin threshold from 0.30 to 0.35, rerun, and get updated results instantly. An Excel formula hidden in a cell is none of these things. When building reports for business teams, prefer SQL calculations over post-export Excel calculations — they are auditable, versionable, and shareable.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What arithmetic operators does SQL support and what is their precedence order?">
        <p style={{ margin: '0 0 14px' }}>SQL supports five arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%). Modulo returns the remainder after integer division — 10 % 3 returns 1 because 10 divided by 3 is 3 with a remainder of 1.</p>
        <p style={{ margin: '0 0 14px' }}>The precedence order mirrors standard mathematics: multiplication, division, and modulo are evaluated first (left to right when they appear together), then addition and subtraction (left to right). Parentheses override all precedence rules — expressions inside parentheses are always evaluated first, regardless of what operators are inside or outside them.</p>
        <p style={{ margin: 0 }}>A practical precedence example: 10 + 5 * 2 evaluates as 10 + 10 = 20, not 15 * 2 = 30. To get 30, write (10 + 5) * 2. For margin percentage: unit_price - cost_price / unit_price * 100 is evaluated as unit_price - (cost_price / unit_price * 100), which is wrong. The correct formula requires parentheses: (unit_price - cost_price) / unit_price * 100. Precedence bugs in financial calculations are particularly dangerous because the query runs without error but produces incorrect numbers that may be used in business decisions.</p>
      </IQ>

      <IQ q="What is integer division and how do you avoid truncation errors?">
        <p style={{ margin: '0 0 14px' }}>Integer division occurs when both operands in a division expression are integers — the database returns an integer result, discarding the decimal portion. The result is truncated (not rounded): 7 / 2 returns 3 in PostgreSQL and MySQL, not 3.5. This is mathematically correct in integer arithmetic but almost never what SQL analysts intend when calculating ratios or percentages.</p>
        <p style={{ margin: '0 0 14px' }}>The danger is that no error occurs — the query runs successfully and returns results that appear plausible but are wrong. If a products table has INTEGER columns for unit_price and cost_price, the margin calculation (unit_price - cost_price) / unit_price would return 0 for every product where profit is less than the selling price — which is virtually every product. The analyst would see 0% margin across the board and have no indication that the division was truncated.</p>
        <p style={{ margin: 0 }}>Three reliable solutions: multiply by 1.0 before dividing — (unit_price - cost_price) * 1.0 / unit_price — which promotes the result to decimal. Use CAST to explicitly convert to a decimal type — CAST(unit_price - cost_price AS DECIMAL) / unit_price. Or use a decimal literal in the numerator or denominator — (unit_price - cost_price) / 1.0. The CAST approach is most explicit about intent and is recommended in production code where the data types of columns may not be immediately obvious to someone reading the query later.</p>
      </IQ>

      <IQ q="What is the difference between ROUND, CEIL, and FLOOR?">
        <p style={{ margin: '0 0 14px' }}>All three convert a decimal number to a controlled precision, but they round in different directions. ROUND(number, places) rounds to the specified number of decimal places using standard rounding — values ending in .5 or higher round up, below .5 round down. ROUND(3.45, 1) returns 3.5. ROUND(3.44, 1) returns 3.4. ROUND with a negative places argument rounds to the left of the decimal: ROUND(1234, -2) returns 1200.</p>
        <p style={{ margin: '0 0 14px' }}>CEIL (or CEILING) always rounds up to the nearest integer — away from zero for positive numbers. CEIL(4.1) returns 5. CEIL(4.9) returns 5. CEIL(4.0) returns 4. CEIL is used for "how many containers do I need?" problems — if you have 22 items and containers hold 10, you need CEIL(22/10) = 3 containers, not 2.2.</p>
        <p style={{ margin: 0 }}>FLOOR always rounds down to the nearest integer — towards zero for positive numbers. FLOOR(4.9) returns 4. FLOOR(4.1) returns 4. FLOOR(4.0) returns 4. FLOOR is used for bucketing and banding — FLOOR(salary / 10000) * 10000 gives the bottom of each ₹10,000 salary band. The trio covers three essential rounding patterns: nearest value (ROUND), always up (CEIL), always down (FLOOR).</p>
      </IQ>

      <IQ q="Why is it more efficient to put arithmetic on the literal side of a WHERE comparison rather than the column side?">
        <p style={{ margin: '0 0 14px' }}>When arithmetic is applied to a column in a WHERE condition — WHERE unit_price * 1.18 {'>'}200 — the database must calculate unit_price * 1.18 for every single row in the table before it can determine whether the row qualifies. This prevents the database from using an index on unit_price, because the index stores raw unit_price values, not the result of unit_price * 1.18. The result is a full table scan even when the unit_price column has an index.</p>
        <p style={{ margin: '0 0 14px' }}>When the arithmetic is moved to the literal side — WHERE unit_price {'>'} 200 / 1.18 — the database evaluates 200 / 1.18 once (it is a constant, independent of any row), producing approximately 169.49. The WHERE condition becomes WHERE unit_price {'>'} 169.49, which the database can evaluate using an index on unit_price directly. Instead of a full table scan, the database does an index range scan — a dramatically more efficient operation on large tables.</p>
        <p style={{ margin: 0 }}>This principle is called SARGability (Search ARGument Ability). A WHERE condition is SARGable if the database can use an index to satisfy it. Conditions that apply functions or arithmetic to columns are not SARGable. Conditions that compare raw column values to constants (even computed constants) are SARGable. The rule: whenever possible, isolate the column in the WHERE condition — put all transformations on the literal side. This applies to arithmetic, functions (LOWER, YEAR, MONTH), and any other operation that wraps a column value.</p>
      </IQ>

      <IQ q="How does date arithmetic work in SQL and where do the dialects differ?">
        <p style={{ margin: '0 0 14px' }}>Date arithmetic in SQL calculates intervals between dates or adds/subtracts time from a date. The concept is universal — every SQL database supports it — but the syntax differs significantly across databases, which is one of the most common portability issues when moving SQL between systems.</p>
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL and DuckDB (used in this playground), subtracting two DATE values returns an integer representing the number of days: delivery_date - order_date returns 2 if delivery was 2 days after the order. Adding an integer to a date adds that many days: order_date + 7 returns the date 7 days later. PostgreSQL also supports INTERVAL arithmetic: order_date + INTERVAL '1 month' adds exactly one month. In MySQL, date subtraction is done with the DATEDIFF function: DATEDIFF(delivery_date, order_date). Date addition uses DATE_ADD: DATE_ADD(order_date, INTERVAL 7 DAY). In SQL Server, DATEDIFF(day, order_date, delivery_date) for difference and DATEADD(day, 7, order_date) for addition.</p>
        <p style={{ margin: 0 }}>The safest cross-database approach is to use explicit functions rather than operator overloading. DATEDIFF is supported in MySQL and SQL Server (with different argument order). PostgreSQL's date subtraction operator is elegant but PostgreSQL-specific. When writing SQL that must run on multiple database types, document which database it targets or use a database abstraction layer that normalises these differences. In practice, most organisations standardise on one database per workload, making dialect differences a concern primarily when migrating systems or working with multiple clients on different stacks.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Result shows 0 for every row — margin calculation returns 0 instead of a percentage"
        cause="Integer division truncation. Both sides of the division are integers (or the result of integer subtraction is an integer), and dividing one integer by another returns an integer in PostgreSQL and MySQL. Since the profit (unit_price - cost_price) is always less than unit_price for any product sold at a markup, integer division always returns 0. The query runs without error and returns 0 for every product — a silent data quality failure."
        fix="Force decimal division by casting: CAST(unit_price - cost_price AS DECIMAL) / unit_price * 100. Or multiply by 1.0 first: (unit_price - cost_price) * 1.0 / unit_price * 100. Verify by checking the column data types: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products'. If unit_price is INTEGER, DECIMAL division must be forced explicitly."
      />

      <Err
        msg="ERROR: division by zero — calculated expression fails on some rows"
        cause="One or more rows have a zero value in the denominator of a division expression. This is most common when dividing by a column that should theoretically be non-zero but has zero values due to data entry errors, default values, or products added with a unit_price of 0. In PostgreSQL, division by zero raises an error and aborts the entire query. In MySQL, division by zero returns NULL (not an error) — which can mask the issue."
        fix="Wrap the denominator in NULLIF to convert zero to NULL before dividing: (profit / NULLIF(unit_price, 0)) * 100. Dividing by NULL returns NULL instead of raising an error. The affected rows show NULL in the result, clearly indicating the calculation is not applicable. Also investigate why zero values exist in the denominator column — add a CHECK constraint to prevent unit_price = 0 if that is invalid data: CHECK (unit_price > 0)."
      />

      <Err
        msg="Calculation gives unexpected result — wrong number but no error"
        cause="Operator precedence bug. The calculation runs without error but evaluates in a different order than intended. For example, unit_price - cost_price / unit_price * 100 is evaluated as unit_price - ((cost_price / unit_price) * 100) — not (unit_price - cost_price) / unit_price * 100. The result looks plausible but is mathematically wrong. This is the hardest type of error to catch because the query succeeds and returns numbers."
        fix="Add parentheses around every sub-expression to make the evaluation order explicit: (unit_price - cost_price) / unit_price * 100. Then verify against a known reference value: for Amul Butter with unit_price=56 and cost_price=44, the correct margin is (56-44)/56*100 = 21.4%. Run the query for that specific product and confirm the output matches. Any time a calculated number looks wrong but the query succeeded, check precedence first."
      />

      <Err
        msg="ROUND() returns a different number than expected — 3.455 rounds to 3.45 instead of 3.46"
        cause="Floating-point representation error. Numbers like 3.455 cannot be represented exactly in binary floating-point (the same way 1/3 cannot be written as a finite decimal). The actual stored value might be 3.4549999... instead of 3.455, so ROUND to 2 places produces 3.45 instead of 3.46. This happens with FLOAT and DOUBLE columns. DECIMAL columns store values as exact decimal digits and do not have this problem."
        fix="Use DECIMAL data types for all monetary and percentage values — never FLOAT or DOUBLE. For existing FLOAT columns, cast to DECIMAL before rounding: ROUND(CAST(float_column AS DECIMAL(10,4)), 2). If you cannot change the column type, be aware that ROUND on FLOAT values may behave unexpectedly at the boundary and test edge cases explicitly. For financial applications, this distinction is not optional — FLOAT rounding errors in currency accumulate across millions of transactions and cause accounting discrepancies."
      />

      <Err
        msg="Date arithmetic returns wrong interval — adding months gives wrong date"
        cause="Adding an integer to a date adds days, not months. In PostgreSQL, order_date + 1 adds 1 day. order_date + 30 adds 30 days — not one month. February has 28 or 29 days, months have 28-31 days, so 30 days from January 31 lands in March, not on February 28. If you intend to add one calendar month, adding 30 days is incorrect for dates near the end of a month."
        fix="Use INTERVAL for calendar-aware arithmetic: order_date + INTERVAL '1 month' in PostgreSQL correctly adds one calendar month — January 31 + 1 month = February 28/29 (adjusts to the last day of the month). In MySQL: DATE_ADD(order_date, INTERVAL 1 MONTH). For adding days: order_date + 30 or order_date + INTERVAL '30 days' — both add exactly 30 days and are equivalent. Use integers for day addition, INTERVAL for month/year addition."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart procurement team needs a reorder priority report. Write a query on the products table that returns: product_name, category, unit_price, cost_price, a profit column (unit_price minus cost_price), a margin_pct column (profit as a percentage of unit_price, rounded to 1 decimal), a gst_price column (unit_price multiplied by 1.18, rounded to 2 decimal places), and a priority column using CASE: 'Urgent Restock' if out of stock and margin above 25%, 'Restock' if out of stock and margin 25% or below, 'OK' if in stock. Sort by margin_pct descending."
        hint="Use (unit_price - cost_price) for profit. Use ROUND((unit_price - cost_price) / unit_price * 100, 1) for margin_pct. The CASE needs to check in_stock = false first, then branch on the margin condition."
        answer={`SELECT
  product_name,
  category,
  unit_price,
  cost_price,
  unit_price - cost_price                                    AS profit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)    AS margin_pct,
  ROUND(unit_price * 1.18, 2)                               AS gst_price,
  CASE
    WHEN in_stock = false
     AND (unit_price - cost_price) / unit_price > 0.25
      THEN 'Urgent Restock'
    WHEN in_stock = false
      THEN 'Restock'
    ELSE 'OK'
  END                                                        AS priority
FROM products
ORDER BY margin_pct DESC;`}
        explanation="This query combines four arithmetic patterns: simple subtraction for profit, the percentage formula with parentheses for correct precedence for margin_pct, multiplication by a constant for gst_price, and the margin percentage threshold reused inside the CASE expression for priority. Notice that the margin calculation appears twice — once in the SELECT as margin_pct and once inside CASE. You cannot reference the margin_pct alias inside the CASE because SELECT aliases are not available within the same SELECT list (they are resolved left to right, and CASE comes after margin_pct in the list but before the alias is available for reuse). Repeating the expression is correct."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'SQL supports five arithmetic operators: + (add), - (subtract), * (multiply), / (divide), % (modulo). Arithmetic in SELECT creates computed columns — the table is never modified.',
          'Operator precedence: multiplication, division, and modulo before addition and subtraction. Parentheses always override precedence. Use explicit parentheses for any non-trivial expression.',
          'Integer division truncates the decimal portion silently — 7/2 returns 3, not 3.5, in PostgreSQL and MySQL. Force decimal division with CAST(value AS DECIMAL), multiply by 1.0, or use a decimal literal.',
          'NULL propagates through arithmetic — any expression involving NULL returns NULL. Use COALESCE to substitute defaults before calculations: COALESCE(discount_pct, 0).',
          'ROUND(number, places) rounds to N decimal places. CEIL always rounds up. FLOOR always rounds down. ABS returns the absolute value (removes negative sign).',
          'Arithmetic in WHERE works but applying calculations to the column side (WHERE col * 1.18 > 200) prevents index usage. Move calculations to the literal side (WHERE col > 200 / 1.18) to keep queries SARGable.',
          'Date subtraction returns days between two dates in PostgreSQL/DuckDB. Use DATEDIFF in MySQL. Use INTERVAL for calendar-aware month/year arithmetic — adding 30 days is not the same as adding one month.',
          'Division by zero raises an error in PostgreSQL. Prevent it with NULLIF on the denominator: value / NULLIF(denominator, 0) — returns NULL instead of crashing when the denominator is zero.',
          'Always use DECIMAL data types for monetary values — never FLOAT or DOUBLE. Floating-point representation errors in ROUND() accumulate into accounting discrepancies at scale.',
          'Computed columns in SQL are reproducible, documentable, and reviewable. They are always preferable to post-export Excel calculations for business reporting.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 13</strong>, you learn aliases — giving columns and tables readable names with the AS keyword. Aliases make complex queries readable and are the foundation of every clean, maintainable SQL query you will ever write.
        </p>
        <Link href="/learn/sql/aliases" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 13 → Renaming Columns — AS (Aliases)
        </Link>
      </div>

    </LearnLayout>
  );
}