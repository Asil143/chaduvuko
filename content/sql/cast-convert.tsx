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

const CastCard = ({ from, to, syntax, note, safe }: {
  from: string; to: string; syntax: string; note: string; safe: boolean;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${safe ? C : '#f97316'}20`, borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 4 }}>{from}</span>
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>→</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: C, background: `${C}12`, padding: '2px 8px', borderRadius: 4 }}>{to}</span>
      <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: safe ? '#00e676' : '#f97316', textTransform: 'uppercase', letterSpacing: '.08em' }}>{safe ? 'Always safe' : 'May fail'}</span>
    </div>
    <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>{syntax}</code>
    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{note}</p>
  </div>
);

export default function CastConvert() {
  return (
    <LearnLayout
      title="CAST and Type Conversion"
      description="Converting between data types — CAST, :: shorthand, implicit vs explicit casting, TRY_CAST for safe conversion, and every coercion rule that prevents silent errors in production queries"
      section="SQL — Module 44"
      readTime="10–14 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Type Conversion Exists" />

      <P>SQL is a strongly typed language — every column and every expression has a declared data type, and most operations require compatible types. When types do not match, the database either performs an <Hl>implicit cast</Hl> (silently converts for you — sometimes incorrectly) or raises a type error and returns nothing.</P>

      <P>Type conversion becomes unavoidable in real data work. CSV imports store everything as text — dates and numbers arrive as VARCHAR and must be cast before arithmetic. UNION ALL requires matching column types across queries — a DATE in one query must become TEXT if the other query has TEXT in that position. Concatenation requires text — a numeric customer_id must be cast to TEXT before joining with a string prefix. Understanding when and how to cast explicitly is the difference between queries that work reliably and queries that fail silently or crash unpredictably.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Three Syntaxes for Casting" />

      <CodeBlock
        label="Three ways to cast — all equivalent"
        code={`-- 1. CAST() — SQL standard, most portable across databases
CAST(expression AS target_type)
CAST('123' AS INTEGER)           -- '123' (text) → 123 (integer)
CAST(order_date AS TEXT)         -- date → '2024-01-15' (text)
CAST(3.99 AS INTEGER)            -- 3.99 → 3 (truncates, not rounds)
CAST(NULL AS NUMERIC)            -- NULL → NULL (type hint, still NULL)

-- 2. :: shorthand — PostgreSQL and DuckDB
expression::target_type
'123'::INTEGER                   -- same as CAST('123' AS INTEGER)
order_date::TEXT                 -- same as CAST(order_date AS TEXT)
3.99::INTEGER                    -- 3 (truncates)
total_amount::NUMERIC            -- ensures decimal arithmetic

-- 3. CONVERT() — MySQL and SQL Server (different argument order!)
CONVERT(expression, target_type)   -- MySQL
CONVERT(target_type, expression)   -- SQL Server (reversed!)
-- CONVERT is not supported in standard PostgreSQL or DuckDB

-- Which to use:
-- :: shorthand  → fastest to type, PostgreSQL/DuckDB only
-- CAST()        → portable across all databases, use in shared code
-- CONVERT()     → MySQL/SQL Server only, be aware of argument order difference`}
      />

      <SQLPlayground
        initialQuery={`-- CAST() is portable; :: is PostgreSQL/DuckDB only (not SQLite)
SELECT
  CAST('42' AS INTEGER)                   AS standard_cast,
  -- typeof() shows SQLite's internal storage type
  typeof(42)                              AS int_type,
  typeof(42.0)                            AS float_type,
  typeof('42')                            AS text_type,
  typeof(CAST(42 AS REAL))               AS real_type,
  typeof(date('now'))                     AS date_type;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Common Cast Conversions — A Practical Map" />

      <CastCard
        from="TEXT"
        to="INTEGER"
        syntax="'42'::INTEGER  or  CAST('42' AS INTEGER)"
        note="Fails if string contains non-numeric characters or decimals. '42.5'::INTEGER fails — cast to NUMERIC first, then INTEGER."
        safe={false}
      />
      <CastCard
        from="TEXT"
        to="NUMERIC"
        syntax="'42.50'::NUMERIC  or  CAST('42.50' AS NUMERIC)"
        note="Accepts integers and decimals as strings. Fails on non-numeric strings like 'abc' or '₹42'."
        safe={false}
      />
      <CastCard
        from="TEXT"
        to="DATE"
        syntax="'2024-01-15'::DATE  or  CAST('2024-01-15' AS DATE)"
        note="Requires ISO format (YYYY-MM-DD). '15-01-2024' or '01/15/2024' may fail — database-dependent."
        safe={false}
      />
      <CastCard
        from="INTEGER"
        to="TEXT"
        syntax="42::TEXT  or  CAST(42 AS TEXT)"
        note="Always succeeds — every integer has a valid text representation. Essential for string concatenation."
        safe={true}
      />
      <CastCard
        from="NUMERIC"
        to="TEXT"
        syntax="3.14::TEXT  or  CAST(3.14 AS TEXT)"
        note="Produces the decimal string representation. May include scientific notation for very large/small values."
        safe={true}
      />
      <CastCard
        from="DATE"
        to="TEXT"
        syntax="order_date::TEXT  or  CAST(order_date AS TEXT)"
        note="Produces ISO format: '2024-01-15'. For custom formats, use strftime() or TO_CHAR() instead."
        safe={true}
      />
      <CastCard
        from="INTEGER"
        to="NUMERIC"
        syntax="42::NUMERIC  or  CAST(42 AS NUMERIC)"
        note="Always succeeds. Essential before division to prevent integer arithmetic. 7::NUMERIC / 2 = 3.5, not 3."
        safe={true}
      />
      <CastCard
        from="NUMERIC"
        to="INTEGER"
        syntax="3.99::INTEGER  or  CAST(3.99 AS INTEGER)"
        note="Truncates toward zero — does not round. 3.99 → 3, not 4. Use ROUND() first if rounding is needed."
        safe={true}
      />
      <CastCard
        from="BOOLEAN"
        to="INTEGER"
        syntax="TRUE::INTEGER  or  CAST(is_active AS INTEGER)"
        note="TRUE → 1, FALSE → 0. Useful for counting boolean flags: SUM(is_active::INTEGER)."
        safe={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Implicit Casting — When the Database Casts for You" />

      <P>Implicit casting happens automatically when the database converts a type without being asked. Sometimes this is convenient. Sometimes it causes silent bugs that are hard to diagnose — a comparison that "works" but filters the wrong rows, or a calculation that produces a different type than expected.</P>

      <CodeBlock
        label="Implicit casting — helpful and dangerous examples"
        code={`-- HELPFUL: integer literal compared to NUMERIC column
-- Database implicitly promotes integer to NUMERIC for comparison
WHERE unit_price > 100              -- 100 is int, unit_price is NUMERIC — fine

-- HELPFUL: string literal to date comparison
WHERE order_date = '2024-01-15'    -- '2024-01-15' implicitly cast to DATE — fine

-- DANGEROUS: implicit cast in a WHERE on an indexed column
WHERE order_id = '42'              -- order_id is INTEGER, '42' is TEXT
-- Database may cast '42' to INTEGER for comparison — usually works
-- BUT: if order_id were TEXT and you wrote WHERE order_id = 42
-- the database casts 42 to TEXT = '42' — works for this value
-- but could silently miscompare '042' (padded) vs 42 cast to '42'

-- DANGEROUS: implicit cast in UNION
SELECT customer_id, name FROM customers   -- customer_id is INTEGER
UNION ALL
SELECT '999', name FROM ex_customers      -- '999' is TEXT
-- PostgreSQL may raise type error; DuckDB may implicitly cast
-- Always be explicit with CAST in UNION columns

-- DANGEROUS: arithmetic with mixed types
SELECT '5' + 3                     -- MySQL: '5' cast to int → 8
                                   -- PostgreSQL: error — no operator for text + int
                                   -- DuckDB: '5'::INT + 3 → 8
-- Behaviour varies significantly across databases`}
      />

      <SQLPlayground
        initialQuery={`-- Implicit casting behaviour in SQLite
SELECT
  -- SQLite: text vs integer comparison — no implicit cast (not equal)
  CASE WHEN '100' = 100 THEN 'equal' ELSE 'not equal' END   AS str_vs_int,
  -- Date stored as text: string comparison works for ISO dates
  CASE WHEN '2024-01-15' = '2024-01-15' THEN 'equal' ELSE 'not equal' END AS date_vs_str,
  -- Type of arithmetic results
  typeof(1 + 1.0)                 AS int_plus_float_type,
  typeof(1 + 1)                   AS int_plus_int_type,
  -- Division type changes
  typeof(7 / 2)                   AS int_div_type,
  typeof(7 / 2.0)                 AS float_div_type,
  typeof(CAST(7 AS REAL) / 2)     AS real_div_type;`}
        height={215}
        showSchema={false}
      />

      <Callout type="warning">
        Never rely on implicit casting for join conditions or WHERE filters on indexed columns. Implicit casting on a column prevents index usage and can change query semantics. Be explicit: if joining an INTEGER id to a TEXT id, decide which direction to cast and write it explicitly. Relying on implicit casting is a maintenance hazard — behaviour varies across database versions and engines.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Casting in Practice — The Most Common Patterns" />

      <H>Numeric to text — for concatenation</H>

      <SQLPlayground
        initialQuery={`-- Concatenation requires text — cast numeric columns first
SELECT
  customer_id,
  first_name,
  -- Cast INTEGER to TEXT for concatenation
  'CUST-' || CAST(customer_id AS TEXT)                  AS display_id,
  -- Zero-padded ID using printf (SQLite 3.38+)
  'CUST-' || printf('%06d', customer_id)                AS padded_id,
  -- Mix numeric and string in one expression
  first_name || ' (ID: ' || CAST(customer_id AS TEXT) || ')' AS label
FROM customers
ORDER BY customer_id
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <H>Text to numeric — for arithmetic on imported data</H>

      <SQLPlayground
        initialQuery={`-- Simulating text-stored amounts (common after CSV import)
SELECT
  CAST('1250.50' AS REAL)                               AS parsed_amount,
  ROUND(CAST('1250.50' AS REAL) * 1.18, 2)              AS with_gst,
  -- Safe pattern: trim whitespace before casting
  TRIM('  1250.50  ')                                   AS dirty_input,
  -- Real-world: clean then cast (remove symbol and comma first)
  CAST(REPLACE(REPLACE(TRIM('1,250.50'), ',', ''), ' ', '') AS REAL) AS cleaned_numeric,
  -- Integer from text
  CAST('42' AS INTEGER) + 8                             AS text_int_arithmetic;`}
        height={195}
        showSchema={false}
      />

      <H>Integer to numeric — for safe division</H>

      <SQLPlayground
        initialQuery={`-- Cast before division to prevent integer arithmetic
SELECT
  store_id,
  COUNT(*)                                              AS total_orders,
  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END) AS delivered,
  -- WRONG: integer / integer = integer (0 or 1, never decimal)
  SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END)
    / COUNT(*) * 100                                    AS wrong_pct,
  -- RIGHT: cast numerator to REAL for decimal division
  ROUND(
    CAST(SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END) AS REAL)
    / COUNT(*) * 100
  , 1)                                                  AS correct_pct
FROM orders
GROUP BY store_id
ORDER BY correct_pct DESC;`}
        height={230}
        showSchema={false}
      />

      <H>Date to text — for display formatting</H>

      <SQLPlayground
        initialQuery={`-- Cast dates to text for labels and concatenation
SELECT
  order_id,
  order_date,
  -- SQLite stores dates as text — CAST gives ISO format
  CAST(order_date AS TEXT)                              AS iso_text,
  -- Custom format via strftime (SQLite: format string first)
  strftime('%d/%m/%Y', order_date)                     AS display_date,
  'Order placed on ' || strftime('%d/%m/%Y', order_date) AS order_label,
  -- Quarter label from strftime
  strftime('%Y', order_date) || ' Q'
    || CAST((CAST(strftime('%m', order_date) AS INTEGER) + 2) / 3 AS TEXT) AS quarter_label
FROM orders
ORDER BY order_date DESC
LIMIT 8;`}
        height={215}
        showSchema={true}
      />

      <H>Boolean to integer — for counting flags</H>

      <SQLPlayground
        initialQuery={`-- SQLite stores booleans as INTEGER (1=true, 0=false) — no cast needed
SELECT
  category,
  COUNT(*)                                              AS total_products,
  SUM(in_stock)                                         AS in_stock_count,
  SUM(1 - in_stock)                                     AS out_of_stock_count,
  ROUND(CAST(SUM(in_stock) AS REAL) / COUNT(*) * 100, 1) AS pct_in_stock
FROM products
GROUP BY category
ORDER BY pct_in_stock DESC;`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="TRY_CAST — Safe Conversion Without Crashes" />

      <P>Standard CAST fails with an error if the value cannot be converted — '₹120' cannot be cast to INTEGER and the entire query fails. <Hl>TRY_CAST</Hl> returns NULL instead of raising an error when conversion fails. This is essential for data quality checks and cleaning imports where not every value is guaranteed to be convertible.</P>

      <CodeBlock
        label="TRY_CAST — DuckDB and SQL Server"
        code={`-- Standard CAST: fails hard on bad input
CAST('₹120' AS INTEGER)           -- ERROR: invalid input syntax for integer
CAST('abc' AS DATE)               -- ERROR: invalid input syntax for date
CAST('12-30-2024' AS DATE)        -- ERROR: US date format not recognised

-- TRY_CAST: returns NULL on failure (DuckDB, SQL Server)
TRY_CAST('₹120' AS INTEGER)       -- returns NULL (no error)
TRY_CAST('abc' AS DATE)           -- returns NULL (no error)
TRY_CAST('42' AS INTEGER)         -- returns 42 (success)

-- PostgreSQL equivalent: no native TRY_CAST
-- Use a CASE + REGEXP check pattern:
CASE WHEN column ~ '^-?[0-9]+$'
     THEN column::INTEGER
     ELSE NULL
END                                -- NULL for non-integers, value otherwise

-- Or write a custom function:
-- CREATE OR REPLACE FUNCTION try_cast_int(text) RETURNS INTEGER AS $$
--   BEGIN RETURN $1::INTEGER; EXCEPTION WHEN OTHERS THEN RETURN NULL; END;
-- $$ LANGUAGE plpgsql;`}
      />

      <SQLPlayground
        initialQuery={`-- SQLite has no TRY_CAST — use CASE + GLOB for safe type checking
-- (In DuckDB/SQL Server, TRY_CAST returns NULL on failure instead)
SELECT
  val,
  typeof(val)                      AS input_type,
  -- Simulate safe integer check: no non-digit characters
  CASE WHEN val NOT GLOB '*[^0-9]*' AND val != ''
       THEN CAST(val AS INTEGER) ELSE NULL END   AS as_integer,
  -- Simulate safe number check: digits with optional decimal point
  CASE WHEN val NOT GLOB '*[^0-9.]*' AND val != ''
       THEN CAST(val AS REAL) ELSE NULL END      AS as_numeric,
  -- Validate ISO date format YYYY-MM-DD
  CASE WHEN val GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
       THEN val ELSE NULL END                    AS as_date,
  CASE
    WHEN val NOT GLOB '*[^0-9.]*' AND val != '' THEN 'Valid number'
    WHEN val GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]' THEN 'Valid date'
    ELSE 'Cannot convert'
  END                              AS assessment
FROM (VALUES
  ('42'), ('3.14'), ('2024-01-15'), ('abc'), ('99999999999')
) AS t(val);`}
        height={255}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Data quality audit using GLOB-based safe cast check
-- Equivalent to TRY_CAST in DuckDB/SQL Server
SELECT
  customer_id,
  first_name,
  email,
  -- customer_id is already INTEGER in FreshCart — cast to TEXT and back to check
  CAST(customer_id AS TEXT)                AS id_as_text,
  CAST(customer_id AS INTEGER)             AS id_as_int,
  CASE WHEN typeof(customer_id) = 'integer'
    THEN '✓ Valid integer ID'
    ELSE '⚠ Non-integer ID'
  END                                      AS id_quality
FROM customers
ORDER BY customer_id
LIMIT 8;`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Numeric Type Precision — NUMERIC vs FLOAT" />

      <P>SQL has two families of numeric types and choosing between them matters for financial calculations. FLOAT/DOUBLE stores values in binary floating-point — fast but imprecise for exact decimal values. NUMERIC/DECIMAL stores exact decimal values — slightly slower but essential for money.</P>

      <CodeBlock
        label="NUMERIC vs FLOAT — the precision difference"
        code={`-- FLOAT (binary floating-point): approximate
-- Binary cannot represent 0.1 exactly — it repeats like 1/3 in decimal
SELECT 0.1::FLOAT + 0.2::FLOAT;           -- may return 0.30000000000000004
SELECT (0.1 + 0.2)::FLOAT = 0.3::FLOAT;  -- may return FALSE

-- NUMERIC (exact decimal arithmetic): precise
SELECT 0.1::NUMERIC + 0.2::NUMERIC;       -- returns exactly 0.3
SELECT 0.1::NUMERIC + 0.2::NUMERIC = 0.3::NUMERIC;  -- returns TRUE

-- NUMERIC(precision, scale):
-- precision = total digits, scale = digits after decimal point
NUMERIC(10, 2)     -- up to 10 digits total, 2 after decimal → ₹99,999,999.99
NUMERIC(15, 4)     -- 15 digits, 4 decimal → ₹99,999,999,999.9999

-- For financial columns:
-- ALWAYS use NUMERIC or DECIMAL, never FLOAT or DOUBLE
-- FLOAT is appropriate for scientific/statistical data where approximate is fine
-- NUMERIC is required for money, quantities, tax, and any value requiring exactness`}
      />

      <SQLPlayground
        initialQuery={`-- SQLite uses REAL (64-bit float) for all decimals — no separate NUMERIC
-- Both show the same result; in PostgreSQL/DuckDB, NUMERIC would be exact
SELECT
  0.1 + 0.2                              AS float_result,
  CAST(0.1 AS REAL) + CAST(0.2 AS REAL)  AS explicit_real_result,
  -- Financial aggregation — CAST to REAL for aggregation safety
  ROUND(
    SUM(CAST(total_amount AS REAL)), 2
  )                                      AS precise_revenue,
  typeof(0.1 + 0.2)                      AS default_type,
  typeof(CAST(0.1 AS REAL))              AS explicit_real_type
FROM orders
WHERE order_status = 'Delivered';`}
        height={210}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Type Coercion in UNION — Matching Column Types" />

      <P>UNION and UNION ALL require matching column types across all queries. When types differ, the database either performs implicit coercion (if compatible) or raises a type error. Explicit CAST in UNION is best practice — it makes the intended type clear and prevents database-specific coercion surprises.</P>

      <SQLPlayground
        initialQuery={`-- UNION with explicit type alignment
-- Combining customers and employees into one person list
SELECT
  CAST(customer_id AS TEXT)  AS person_id,    -- INTEGER → TEXT
  first_name,
  last_name,
  city,
  'Customer'                 AS person_type,
  CAST(joined_date AS TEXT)  AS activity_date -- DATE → TEXT
FROM customers

UNION ALL

SELECT
  CAST(employee_id AS TEXT)  AS person_id,    -- INTEGER → TEXT (match)
  first_name,
  last_name,
  NULL                       AS city,
  'Employee'                 AS person_type,
  CAST(hire_date AS TEXT)    AS activity_date -- DATE → TEXT (match)
FROM employees

ORDER BY last_name, first_name;`}
        height={265}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- UNION with mixed numeric types — explicit cast ensures consistency
SELECT
  'Delivered revenue'       AS metric,
  CAST(ROUND(SUM(total_amount), 2) AS REAL)  AS value
FROM orders WHERE order_status = 'Delivered'

UNION ALL

SELECT
  'Avg order value',
  CAST(ROUND(AVG(total_amount), 2) AS REAL)  AS value
FROM orders WHERE order_status = 'Delivered'

UNION ALL

SELECT
  'Order count',
  CAST(COUNT(*) AS REAL)                     AS value  -- integer cast to REAL
FROM orders WHERE order_status = 'Delivered'

ORDER BY metric;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Casting Dates — Parsing, Formatting, and Extraction" />

      <P>Date casting is one of the highest-frequency type conversions in real work — parsing date strings from imports, extracting integer parts for arithmetic, and formatting for display. Each direction has its own considerations.</P>

      <SQLPlayground
        initialQuery={`-- Date casting in all directions (SQLite)
SELECT
  -- ISO text treated as date by SQLite date functions
  date('2024-01-15')                            AS text_to_date,
  -- Current date as text
  date('now')                                   AS date_to_text,
  -- Timestamp to date: drop time with date()
  date(datetime('now'))                         AS timestamp_to_date,
  -- Date to timestamp: add midnight time
  datetime('2024-01-15')                        AS date_to_timestamp,
  -- Extract components as integers via strftime
  CAST(strftime('%Y', 'now') AS INTEGER)        AS year_int,
  CAST(strftime('%m', 'now') AS INTEGER)        AS month_int,
  -- First day of current month
  date('now', 'start of month')                 AS first_of_current_month;`}
        height={225}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Date string parsing in SQLite (no strptime — rearrange manually)
SELECT
  -- ISO format: always works directly
  date('2024-01-15')                            AS iso_date,
  -- Parse DD/MM/YYYY by rearranging substrings → YYYY-MM-DD
  SUBSTR('15/01/2024', 7, 4) || '-' ||
  SUBSTR('15/01/2024', 4, 2) || '-' ||
  SUBSTR('15/01/2024', 1, 2)                    AS parsed_ddmmyyyy,
  -- Current date formatted
  strftime('%d/%m/%Y', 'now')                   AS indian_format,
  strftime('%Y', 'now') || '-W' || strftime('%W', 'now') AS week_label,
  -- Real order dates from data
  strftime('%d/%m/%Y', order_date)              AS order_indian_fmt
FROM orders
ORDER BY order_date DESC
LIMIT 5;`}
        height={205}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data engineer at Amazon. A partner has delivered a seller performance CSV. Every column is stored as TEXT — amounts have currency symbols, dates are in DD/MM/YYYY format, booleans are stored as 'Y'/'N', and some numeric fields have commas as thousand separators. You must write a cleaning and casting query before inserting into the target table.</P>

      <TimeBlock time="9:00 AM" label="Raw import preview">
        Sample row: seller_id='S001', revenue='₹1,25,000.50', is_active='Y', last_sale_date='15/01/2024', refund_rate='3.5%'. Everything is TEXT.
      </TimeBlock>

      <TimeBlock time="9:20 AM" label="Build the type conversion pipeline">
        Each column needs a different casting strategy. Use TRY_CAST to identify which rows cannot be converted before the full INSERT.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Simulate the import table (all text) using VALUES
-- Then apply the casting pipeline
SELECT
  raw.seller_id,

  -- Revenue: strip symbol and commas, then cast to REAL
  CAST(REPLACE(REPLACE(raw.revenue, 'Rs', ''), ',', '') AS REAL) AS revenue_numeric,
  ROUND(
    CAST(REPLACE(REPLACE(raw.revenue, 'Rs', ''), ',', '') AS REAL)
  , 2)                                                       AS revenue_clean,

  -- Boolean: 'Y'/'N' → 1/0
  CASE raw.is_active WHEN 'Y' THEN 1 ELSE 0 END             AS is_active_int,

  -- Date: DD/MM/YYYY → ISO format by rearranging substrings
  SUBSTR(raw.last_sale_date, 7, 4) || '-' ||
  SUBSTR(raw.last_sale_date, 4, 2) || '-' ||
  SUBSTR(raw.last_sale_date, 1, 2)                           AS last_sale_date,

  -- Percentage: strip % then cast to REAL
  CAST(REPLACE(raw.refund_rate, '%', '') AS REAL) / 100      AS refund_rate_decimal,

  -- Seller ID: extract numeric part (after 'S')
  CAST(SUBSTR(raw.seller_id, 2) AS INTEGER)                  AS seller_num

FROM (VALUES
  ('S001', '125000.50', 'Y', '15/01/2024', '3.5%'),
  ('S002', '45200.00',  'N', '02/02/2024', '0.8%'),
  ('S003', '210500.75', 'Y', '28/01/2024', '1.2%')
) AS raw(seller_id, revenue, is_active, last_sale_date, refund_rate);`}
        height={350}
        showSchema={false}
      />

      <TimeBlock time="10:00 AM" label="TRY_CAST audit before full load">
        Run TRY_CAST on all numeric fields to find rows that cannot be converted — fix or quarantine them before the main INSERT.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Pre-load audit: identify rows that cannot be safely converted
-- SQLite GLOB check simulates TRY_CAST from DuckDB/SQL Server
SELECT
  raw.seller_id,
  raw.revenue,
  -- Safe numeric check: digits with optional decimal
  CASE WHEN raw.revenue NOT GLOB '*[^0-9.]*' AND raw.revenue != ''
       THEN CAST(raw.revenue AS REAL) ELSE NULL END   AS revenue_parsed,
  raw.last_sale_date,
  -- Safe date check: DD/MM/YYYY format with valid digits
  CASE WHEN raw.last_sale_date GLOB '[0-9][0-9]/[0-9][0-9]/[0-9][0-9][0-9][0-9]'
       THEN SUBSTR(raw.last_sale_date,7,4)||'-'||SUBSTR(raw.last_sale_date,4,2)||'-'||SUBSTR(raw.last_sale_date,1,2)
       ELSE NULL END                                  AS date_parsed,
  CASE
    WHEN raw.revenue GLOB '*[^0-9.]*' OR raw.revenue = '' THEN '⚠ Bad revenue'
    ELSE '✓ OK'
  END                                                 AS revenue_status
FROM (VALUES
  ('S001', '125000.50', '15/01/2024'),
  ('S002', 'N/A',       '02/02/2024'),   -- bad revenue
  ('S003', '210500.75', 'invalid-date')  -- bad date
) AS raw(seller_id, revenue, last_sale_date);`}
        height={295}
        showSchema={false}
      />

      <TimeBlock time="10:30 AM" label="Clean rows inserted, bad rows quarantined">
        TRY_CAST identified 2 rows with bad values. Those rows are written to a quarantine table for manual review. The remaining 3,847 rows are inserted cleanly with all types correct.
      </TimeBlock>

      <ProTip>
        Always run a TRY_CAST audit query before any bulk INSERT from external data. COUNT how many rows have NULL TRY_CAST results — those are rows that will fail CAST during INSERT. If the bad-row count is low, quarantine them. If it is high, there is a systemic format problem that needs upstream investigation before the load proceeds.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between CAST, :: and CONVERT in SQL?">
        <p style={{ margin: '0 0 14px' }}>All three convert a value from one data type to another, but with different syntax and portability. CAST(expression AS type) is the SQL standard syntax — it works across PostgreSQL, MySQL, SQL Server, DuckDB, and virtually every other SQL database. It is the most portable choice for code that needs to run on multiple databases.</p>
        <p style={{ margin: '0 0 14px' }}>The :: shorthand (expression::type) is PostgreSQL and DuckDB syntax — it is more concise and reads naturally in analytical queries. '2024-01-15'::DATE is cleaner to type and read than CAST('2024-01-15' AS DATE). It is the preferred style in PostgreSQL-specific code. CONVERT has two incompatible variants: MySQL uses CONVERT(expression, type) and SQL Server uses CONVERT(type, expression) — the argument order is reversed between the two databases. CONVERT is not supported in PostgreSQL or DuckDB.</p>
        <p style={{ margin: 0 }}>The recommendation: use CAST() for any SQL code that may run on multiple database engines (shared scripts, portable ETL code). Use :: in PostgreSQL and DuckDB-specific code where readability matters. Never use CONVERT in code that needs to work across MySQL and SQL Server without careful attention to the argument order reversal.</p>
      </IQ>

      <IQ q="What is implicit casting and what are the risks?">
        <p style={{ margin: '0 0 14px' }}>Implicit casting is automatic type conversion performed by the database without an explicit CAST instruction. When you write WHERE order_date = '2024-01-15', the database implicitly converts the text literal '2024-01-15' to a DATE for comparison. When you add an integer to a numeric column, the integer is implicitly promoted to numeric. These conversions are usually correct and convenient.</p>
        <p style={{ margin: '0 0 14px' }}>The risks are subtle but real. First, performance: if implicit casting is applied to an indexed column (WHERE CAST(id AS TEXT) = '42'), the index cannot be used and the query performs a full table scan. The rule is to never apply any function or cast to the indexed column side — cast the constant instead. Second, silent semantic errors: implicit casting between text and numeric may succeed with unexpected results in some databases (MySQL converts '5abc' to 5, losing the 'abc' silently), while the same cast raises an error in others (PostgreSQL). Third, portability: a query that relies on implicit casting may behave differently across database engines, especially for edge cases like empty string to numeric conversion or locale-specific date parsing.</p>
        <p style={{ margin: 0 }}>Best practice: be explicit about type conversions in all non-trivial cases. Reserve implicit casting for the truly safe cases — integer to numeric promotion in arithmetic, string literal to date in WHERE clauses with clearly formatted ISO dates. For joins between columns of different types, casting on the constant side (not the column side) preserves index usage: WHERE date_column = '2024-01-15'::DATE is better than WHERE date_column::TEXT = '2024-01-15'.</p>
      </IQ>

      <IQ q="What is TRY_CAST and when would you use it?">
        <p style={{ margin: '0 0 14px' }}>TRY_CAST(expression AS type) attempts type conversion and returns NULL when conversion fails, instead of raising an error. Standard CAST terminates the entire query with an error if any single row has an unconvertible value. TRY_CAST allows the query to continue, producing NULL for problematic rows while returning converted values for valid rows.</p>
        <p style={{ margin: '0 0 14px' }}>The primary use case is data quality assessment on imported data. After loading a CSV into a staging table where every column is TEXT, TRY_CAST identifies which rows have invalid values in each column: SELECT COUNT(*) FROM staging WHERE TRY_CAST(revenue_col AS NUMERIC) IS NULL gives the count of rows with non-numeric revenue values. This pre-flight check prevents a bulk INSERT from crashing midway through a large load.</p>
        <p style={{ margin: 0 }}>TRY_CAST is native to DuckDB and SQL Server. PostgreSQL does not have TRY_CAST — the equivalent pattern uses a CASE + regular expression check (CASE WHEN col ~ '^-?[0-9]+(\.[0-9]+)?$' THEN col::NUMERIC ELSE NULL END) or a custom exception-handling function written in PL/pgSQL. In data pipelines, TRY_CAST enables a quarantine pattern: rows where TRY_CAST returns NULL are inserted into an error table for manual review, while rows where TRY_CAST succeeds proceed to the target table. This pattern is essential for production ETL pipelines where bad data must not block good data.</p>
      </IQ>

      <IQ q="Why should you use NUMERIC instead of FLOAT for financial calculations?">
        <p style={{ margin: '0 0 14px' }}>FLOAT (and DOUBLE) store values in binary floating-point format — a base-2 representation. Most decimal fractions (like 0.1 and 0.2) cannot be represented exactly in binary, just as 1/3 cannot be represented exactly in decimal. This causes accumulation of tiny rounding errors across arithmetic operations. 0.1::FLOAT + 0.2::FLOAT may return 0.30000000000000004, not 0.3. For a single transaction this is irrelevant, but accumulated across thousands of transactions in a financial report, these errors compound into visible discrepancies.</p>
        <p style={{ margin: '0 0 14px' }}>NUMERIC (also called DECIMAL) stores values in exact base-10 representation with a specified precision and scale. 0.1::NUMERIC + 0.2::NUMERIC = exactly 0.3. No floating-point error is introduced. NUMERIC(10, 2) stores up to 10 total digits with exactly 2 decimal places — exactly the semantics needed for currency values.</p>
        <p style={{ margin: 0 }}>For financial columns in a production database, always declare them as NUMERIC(precision, scale) — never FLOAT or DOUBLE. For analytical queries on existing FLOAT columns, cast to NUMERIC before summing or averaging: SUM(amount::NUMERIC). FLOAT is appropriate for scientific and statistical data where approximate values are acceptable and where the operations (averages, standard deviations) are inherently approximate anyway. The performance difference between NUMERIC and FLOAT is small on modern hardware and never justifies using FLOAT for money.</p>
      </IQ>

      <IQ q="How do you handle type mismatches in UNION queries?">
        <p style={{ margin: '0 0 14px' }}>UNION requires all component queries to return the same number of columns with compatible types in corresponding positions. When types differ, the database either performs implicit coercion (if the types are compatible) or raises a type error. Rather than relying on implicit coercion (which varies by database), the professional approach is to cast all non-matching columns explicitly in every component query.</p>
        <p style={{ margin: '0 0 14px' }}>The rule for choosing the cast direction: cast to the most general type that can represent all values. If one query returns INTEGER and another returns NUMERIC, cast the INTEGER to NUMERIC — NUMERIC can represent all INTEGER values without loss. If one query returns DATE and another returns TEXT, cast the DATE to TEXT — TEXT can represent any DATE value. Avoid casting from a more general to a less general type (TEXT to INTEGER) in UNION columns — this will fail for rows where the text is not a valid integer.</p>
        <p style={{ margin: 0 }}>The most common UNION type issue: combining different tables with the same column name but different types. customer_id as INTEGER in customers and customer_id as VARCHAR in a legacy import table cannot be directly unioned — cast one to match the other. Use CAST(customer_id AS TEXT) on the INTEGER side or CAST(legacy_id AS INTEGER) on the TEXT side depending on which type you want in the combined result. Always add explicit column aliases on the first query in the UNION — these determine the column names in the final result. Test UNION type compatibility by running each component query independently first and comparing the output column types.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: invalid input syntax for type integer: '₹1,250'"
        cause="CAST or implicit cast is attempting to convert a string that contains non-numeric characters (currency symbols, commas, spaces) to an INTEGER or NUMERIC. The string '₹1,250' is not a valid integer literal — it must be cleaned first before casting."
        fix="Clean the string before casting: REPLACE(REPLACE(value, '₹', ''), ',', '')::NUMERIC. Strip all non-numeric characters using REGEXP_REPLACE: REGEXP_REPLACE(value, '[^0-9.]', '', 'g')::NUMERIC. For unknown formatting, use TRY_CAST first to identify which rows have problematic values before applying the full CAST. Build a cleaning pipeline: TRIM → REPLACE currency symbol → REPLACE thousand separator → CAST to NUMERIC."
      />

      <Err
        msg="ERROR: invalid input syntax for type date: '15/01/2024'"
        cause="CAST to DATE expects ISO format (YYYY-MM-DD) by default in PostgreSQL and DuckDB. DD/MM/YYYY, MM/DD/YYYY, or any other format fails because the database cannot determine which number is the day and which is the month from format alone."
        fix="Use strptime to parse non-ISO date formats: strptime('15/01/2024', '%d/%m/%Y')::DATE. The format string explicitly specifies the input format. For PostgreSQL: TO_DATE('15/01/2024', 'DD/MM/YYYY'). Establish a convention in your data pipelines: always convert dates to ISO format at the source before loading — it eliminates all date parsing ambiguity. For TRY_CAST with custom formats in DuckDB: TRY_CAST(strptime(col, '%d/%m/%Y')::TEXT AS DATE)."
      />

      <Err
        msg="CAST to INTEGER truncates value — expected rounding but got a lower number"
        cause="CAST(3.99 AS INTEGER) returns 3, not 4. SQL casting from NUMERIC/FLOAT to INTEGER truncates toward zero — it discards the decimal part without rounding. This is the defined behaviour, not a bug, but it surprises developers who expect rounding."
        fix="Round before casting: ROUND(3.99, 0)::INTEGER = 4. FLOOR before casting: FLOOR(3.99)::INTEGER = 3 (explicit floor). CEIL before casting: CEIL(3.1)::INTEGER = 4 (explicit ceiling). The rule: never rely on CAST to INTEGER for rounding — always apply the rounding function explicitly (ROUND, FLOOR, or CEIL) before the CAST. This makes the intent explicit and prevents unexpected truncation in production."
      />

      <Err
        msg="Type error in UNION — column types do not match between queries"
        cause="UNION requires corresponding columns to have compatible types. When one query returns INTEGER and another returns TEXT for the same column position, or one returns DATE and another returns TIMESTAMP, the database raises a type mismatch error. This is common when combining tables from different systems (legacy vs modern schema) or when mixing literal values with column values."
        fix="Add explicit CAST on the non-matching column in each query: CAST(integer_col AS TEXT) or CAST(date_col AS TIMESTAMP). Cast to the more general type — TEXT can hold any value, NUMERIC can hold any number. The first query's column names become the output names — add AS col_name aliases to the first query for clarity. Check types with pg_typeof() on each query independently before combining in UNION."
      />

      <Err
        msg="Concatenation error — operator does not exist: integer || text"
        cause="The || concatenation operator in PostgreSQL requires both operands to be text. Concatenating an integer column directly with a string raises an operator not found error. In MySQL, + performs numeric addition, not concatenation — 'hello' + 5 = 5 (not 'hello5'). In DuckDB, || attempts type coercion but may fail for some combinations."
        fix="Cast numeric columns to TEXT before concatenating: customer_id::TEXT || ' - ' || first_name. Or use CAST: CAST(customer_id AS TEXT) || ' - ' || first_name. For building compound identifiers: 'CUST-' || LPAD(customer_id::TEXT, 6, '0'). In MySQL, use CONCAT() instead of ||: CONCAT('CUST-', customer_id, '-', first_name) — MySQL's CONCAT() handles type coercion automatically and treats NULL as empty string by default (unlike || which returns NULL if any operand is NULL)."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a data quality and casting report for FreshCart orders. The report should show for each order: order_id cast to TEXT with 'ORD-' prefix and zero-padded to 8 digits (e.g. 'ORD-00000001'), order_date formatted as 'DD Month YYYY' (e.g. '15 January 2024'), total_amount cast to NUMERIC and rounded to 2dp, total_amount cast to INTEGER (showing truncation), the difference between NUMERIC rounded and INTEGER truncated versions (to illustrate the difference), total_amount as a percentage of the maximum order amount (rounded to 1dp, using NUMERIC division), a size_band: 'Small' if total < 300, 'Medium' if total < 700, 'Large' if total < 1200, 'Premium' otherwise. Only include delivered orders. Sort by total_amount descending."
        hint="'ORD-' || LPAD(order_id::TEXT, 8, '0'). strftime for date. ::NUMERIC and ::INTEGER for both casts. NULLIF on MAX for pct. CASE for band."
        answer={`SELECT
  -- Zero-padded order ID with prefix using printf
  'ORD-' || printf('%08d', order_id)                    AS display_order_id,

  -- Formatted date (SQLite: format string first, no %B — use CASE)
  strftime('%d/', order_date) ||
  CASE CAST(strftime('%m', order_date) AS INTEGER)
    WHEN 1 THEN 'January'   WHEN 2 THEN 'February' WHEN 3 THEN 'March'
    WHEN 4 THEN 'April'     WHEN 5 THEN 'May'       WHEN 6 THEN 'June'
    WHEN 7 THEN 'July'      WHEN 8 THEN 'August'    WHEN 9 THEN 'September'
    WHEN 10 THEN 'October'  WHEN 11 THEN 'November' WHEN 12 THEN 'December'
  END || ' ' || strftime('%Y', order_date)              AS formatted_date,

  -- Numeric cast
  CAST(total_amount AS REAL)                            AS amount_numeric,
  ROUND(CAST(total_amount AS REAL), 2)                  AS amount_rounded,

  -- Integer cast: truncates toward zero
  CAST(total_amount AS INTEGER)                         AS amount_truncated,

  -- Difference illustrates truncation vs rounding
  ROUND(CAST(total_amount AS REAL), 2)
    - CAST(total_amount AS INTEGER)                     AS round_vs_trunc_diff,

  -- Percentage of max order — NULLIF protects divide by zero
  ROUND(
    CAST(total_amount AS REAL)
    / NULLIF(MAX(CAST(total_amount AS REAL)) OVER (), 0) * 100
  , 1)                                                  AS pct_of_max,

  -- Size band
  CASE
    WHEN total_amount < 300  THEN 'Small'
    WHEN total_amount < 700  THEN 'Medium'
    WHEN total_amount < 1200 THEN 'Large'
    ELSE                          'Premium'
  END                                                   AS size_band

FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount DESC;`}
        explanation="'ORD-' || LPAD(order_id::TEXT, 8, '0') chains two casts: order_id (INTEGER) is cast to TEXT for LPAD, then the padded result is concatenated with the 'ORD-' prefix. strftime handles date formatting directly — no cast needed since order_date is already a DATE. The two parallel casts (::NUMERIC rounded vs ::INTEGER truncated) illustrate the key difference: ROUND(3.99, 2) = 3.99 but 3.99::INTEGER = 3 — the integer cast discards .99 without rounding. Subtracting them shows this gap per order. The window function MAX() OVER () computes the overall maximum order amount across all delivered orders — attaching it to every row for the percentage calculation. NULLIF protects the denominator even though MAX of a non-empty table cannot actually be zero — it is defensive programming. The CASE for size_band uses the raw total_amount column directly, which DuckDB treats as NUMERIC in comparisons."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Three cast syntaxes: CAST(expr AS type) is SQL standard and portable; expr::type is PostgreSQL/DuckDB shorthand; CONVERT() is MySQL/SQL Server only with incompatible argument order between the two.',
          'Safe conversions (always succeed): INTEGER → TEXT, NUMERIC → TEXT, DATE → TEXT, INTEGER → NUMERIC, BOOLEAN → INTEGER. Risky conversions (can fail): TEXT → INTEGER, TEXT → NUMERIC, TEXT → DATE.',
          'TRY_CAST returns NULL on failure instead of raising an error. Use it for data quality audits on imported data before bulk INSERT. PostgreSQL lacks TRY_CAST — use regex validation with CASE instead.',
          'CAST to INTEGER truncates toward zero — does not round. 3.99::INTEGER = 3. Always ROUND() first if rounding is intended: ROUND(3.99, 0)::INTEGER = 4.',
          'Use NUMERIC not FLOAT for financial values. FLOAT has binary precision issues: 0.1 + 0.2 ≠ 0.3 in floating-point. NUMERIC stores exact decimal values. Cast money columns to NUMERIC before aggregating.',
          'Implicit casting on an indexed column prevents index usage. Always cast the constant, not the column: WHERE date_col = \'2024-01-15\'::DATE not WHERE date_col::TEXT = \'2024-01-15\'.',
          'In UNION queries, cast non-matching column types explicitly. Cast to the more general type — TEXT can hold anything, NUMERIC can hold any number. Column names come from the first query.',
          'Date string parsing: ISO format (YYYY-MM-DD) always works with ::DATE. Non-ISO formats need strptime(str, format)::DATE in DuckDB or TO_DATE(str, format) in PostgreSQL.',
          'For concatenation, numeric columns must be cast to TEXT first: customer_id::TEXT || \'-\' || name. The || operator requires both operands to be text in PostgreSQL and DuckDB.',
          'The TRY_CAST quarantine pattern: INSERT valid rows (TRY_CAST IS NOT NULL) to target, INSERT invalid rows (TRY_CAST IS NULL) to error table for review. This prevents bad data from blocking good data in bulk loads.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 45</strong>, you learn Views — virtual tables defined by a query, stored in the database schema, and queryable like real tables. Covers creation, updating, security, and when views outperform repeated CTEs.
        </p>
        <Link href="/learn/sql/views" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 45 → Views
        </Link>
      </div>

    </LearnLayout>
  );
}