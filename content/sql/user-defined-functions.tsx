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

const VolCard = ({ vol, color, desc, when, example }: {
  vol: string; color: string; desc: string; when: string; example: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
    <div style={{ padding: '10px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{vol}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      {[['What it means', desc], ['Use when', when], ['Example', example]].map(([label, val]) => (
        <div key={label}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function UserDefinedFunctions() {
  return (
    <LearnLayout
      title="User-Defined Functions"
      description="Build reusable scalar, table-valued, and SQL functions — IMMUTABLE vs STABLE vs VOLATILE, overloading, security definer, and assembling a production function library"
      section="SQL — Module 49"
      readTime="12–18 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Write Your Own Functions" />

      <P>SQL's built-in functions cover the common cases — ROUND, SUBSTR, DATE_TRUNC, COALESCE. But every application has domain-specific computations that appear in dozens of queries: margin percentage, loyalty tier classification, masked display formats, custom date range labels. Without functions, that logic is copied and pasted across every query. Change the formula once and you have to find and update every copy.</P>

      <P>A user-defined function (UDF) names the computation once, stores it in the database, and makes it callable anywhere SQL is used — in SELECT lists, WHERE clauses, JOIN conditions, CHECK constraints, index definitions, and other function bodies. The formula changes in one place and every query that calls the function automatically uses the new version.</P>

      <CodeBlock
        label="UDF anatomy — scalar function in PL/pgSQL"
        code={`CREATE OR REPLACE FUNCTION function_name(
  param1  data_type,
  param2  data_type DEFAULT default_value
)
RETURNS return_type
LANGUAGE plpgsql
IMMUTABLE   -- or STABLE or VOLATILE (covered in Part 05)
AS $$
DECLARE
  v_result  data_type;
BEGIN
  -- compute the result
  v_result := param1 + param2;
  RETURN v_result;
END;
$$;

-- Call it anywhere in SQL:
SELECT function_name(col1, col2) FROM table;
WHERE function_name(col) > threshold
ORDER BY function_name(col) DESC`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="SQL Functions vs PL/pgSQL Functions" />

      <P>PostgreSQL offers two main languages for UDFs. <Hl>SQL functions</Hl> contain a single SQL expression — clean, fast, and inlinable by the query planner. <Hl>PL/pgSQL functions</Hl> are procedural programs with variables, conditionals, loops, and exception handling. Use SQL functions for simple expressions; use PL/pgSQL for anything requiring logic.</P>

      <CodeBlock
        label="SQL function vs PL/pgSQL function — when to use each"
        code={`-- SQL function: single expression, no procedural logic
-- The planner can inline this directly into the calling query
CREATE OR REPLACE FUNCTION fn_gross_profit(
  p_unit_price  NUMERIC,
  p_cost_price  NUMERIC
) RETURNS NUMERIC
LANGUAGE sql
IMMUTABLE STRICT    -- STRICT: returns NULL if any input is NULL
AS $$
  SELECT ROUND(p_unit_price - p_cost_price, 2)
$$;

-- PL/pgSQL function: requires conditionals, variables, or multiple statements
CREATE OR REPLACE FUNCTION fn_price_band(p_price NUMERIC)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN CASE
    WHEN p_price < 50   THEN 'Budget'
    WHEN p_price < 150  THEN 'Standard'
    WHEN p_price < 300  THEN 'Premium'
    ELSE 'Luxury'
  END;
END;
$$;

-- When to use SQL:
-- ✅ Single expression (arithmetic, string op, date calc)
-- ✅ No variables or control flow needed
-- ✅ Performance-critical — planner can inline it
-- ✅ Works across many databases (standard SQL body)

-- When to use PL/pgSQL:
-- ✅ Conditional logic (IF/CASE with side effects)
-- ✅ Variables needed across multiple steps
-- ✅ Exception handling (EXCEPTION block)
-- ✅ Calling other procedures/functions in sequence`}
      />

      <SQLPlayground
        initialQuery={`-- Simulating both function types inline (playground-safe)

-- fn_gross_profit equivalent (SQL function logic)
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND(unit_price - cost_price, 2)                    AS gross_profit,

-- fn_price_band equivalent (PL/pgSQL logic)
  CASE
    WHEN unit_price < 50  THEN 'Budget'
    WHEN unit_price < 150 THEN 'Standard'
    WHEN unit_price < 300 THEN 'Premium'
    ELSE 'Luxury'
  END                                                  AS price_band,

-- fn_margin_pct (combines both)
  ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1) AS margin_pct

FROM products
ORDER BY margin_pct DESC
LIMIT 10;`}
        height={230}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Scalar Functions — The Most Common Type" />

      <P>A scalar function takes one or more inputs and returns exactly one value. These are the building blocks of a reusable SQL function library — encapsulating domain formulas, validation logic, and display formatting.</P>

      <H>Domain formula functions</H>

      <CodeBlock
        label="Business formula functions — FreshCart library"
        code={`-- Gross margin percentage
CREATE OR REPLACE FUNCTION fn_margin_pct(
  p_price  NUMERIC,
  p_cost   NUMERIC
) RETURNS NUMERIC
LANGUAGE sql IMMUTABLE STRICT AS $$
  SELECT ROUND((p_price - p_cost) / NULLIF(p_price, 0) * 100, 1)
$$;

-- Customer lifetime value tier
CREATE OR REPLACE FUNCTION fn_ltv_tier(p_lifetime_value NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_lifetime_value >= 5000 THEN 'Platinum'
    WHEN p_lifetime_value >= 2000 THEN 'Gold'
    WHEN p_lifetime_value >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END
$$;

-- Delivery performance label
CREATE OR REPLACE FUNCTION fn_delivery_label(p_days INTEGER)
RETURNS TEXT
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_days IS NULL THEN 'Not delivered'
    WHEN p_days <= 1    THEN 'Same/next day'
    WHEN p_days <= 3    THEN 'Standard'
    WHEN p_days <= 7    THEN 'Slow'
    ELSE 'Very slow'
  END
$$;

-- Display-formatted rupee amount
CREATE OR REPLACE FUNCTION fn_format_inr(p_amount NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE AS $$
  SELECT '₹' || TO_CHAR(p_amount, 'FM999,999,990.00')
$$;

-- Safe percentage (handles zero denominator)
CREATE OR REPLACE FUNCTION fn_pct(p_part NUMERIC, p_total NUMERIC)
RETURNS NUMERIC
LANGUAGE sql IMMUTABLE AS $$
  SELECT ROUND(p_part / NULLIF(p_total, 0) * 100, 1)
$$;`}
      />

      <SQLPlayground
        initialQuery={`-- Use the function logic in a product analysis query
-- (functions defined inline as expressions for the playground)
SELECT
  product_name,
  category,
  unit_price,
  cost_price,
  -- fn_margin_pct inline:
  ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1)  AS margin_pct,
  -- fn_price_band inline:
  CASE
    WHEN unit_price < 50  THEN 'Budget'
    WHEN unit_price < 150 THEN 'Standard'
    WHEN unit_price < 300 THEN 'Premium'
    ELSE 'Luxury'
  END                                                                  AS price_band,
  -- fn_format_inr inline:
  '₹' || TO_CHAR(unit_price, 'FM999,999,990.00')                      AS display_price
FROM products
ORDER BY margin_pct DESC
LIMIT 10;`}
        height={230}
        showSchema={false}
      />

      <H>Validation functions</H>

      <CodeBlock
        label="Validation functions — reusable data quality checks"
        code={`-- Valid Indian mobile number: 10 digits starting with 6-9
CREATE OR REPLACE FUNCTION fn_is_valid_mobile(p_phone TEXT)
RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE AS $$
  SELECT REGEXP_REPLACE(COALESCE(p_phone, ''), '[^0-9]', '', 'g') ~ '^[6-9][0-9]{9}$'
$$;

-- Valid email: has exactly one @ and at least one dot in domain
CREATE OR REPLACE FUNCTION fn_is_valid_email(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE AS $$
  SELECT COALESCE(p_email, '') ~ '^[^@]+@[^@]+\.[^@]+$'
$$;

-- Valid zip_code: exactly 6 digits
CREATE OR REPLACE FUNCTION fn_is_valid_zip_code(p_pin TEXT)
RETURNS BOOLEAN
LANGUAGE sql IMMUTABLE AS $$
  SELECT COALESCE(p_pin, '') ~ '^[0-9]{6}$'
$$;

-- Usage in a data quality audit:
SELECT
  customer_id,
  email,
  fn_is_valid_email(email)    AS email_valid,
  phone,
  fn_is_valid_mobile(phone)   AS phone_valid
FROM customers
WHERE NOT fn_is_valid_email(email)
   OR NOT fn_is_valid_mobile(phone);`}
      />

      <SQLPlayground
        initialQuery={`-- Data quality audit using validation function logic inline
SELECT
  customer_id,
  first_name,
  email,
  -- fn_is_valid_email equivalent:
  CASE WHEN COALESCE(email,'') ~ '^[^@]+@[^@]+\.[^@]+$'
       THEN '✓ Valid' ELSE '✗ Invalid' END           AS email_status,
  phone,
  -- fn_is_valid_mobile equivalent (strip non-digits first):
  CASE WHEN REGEXP_REPLACE(COALESCE(phone,''),'[^0-9]','','g') ~ '^[6-9][0-9]{9}$'
       THEN '✓ Valid' ELSE '✗ Check' END              AS phone_status
FROM customers
ORDER BY customer_id
LIMIT 10;`}
        height={205}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Table-Valued Functions — Returning Result Sets" />

      <P>A table-valued function (TVF) returns a set of rows rather than a single value. It behaves exactly like a table in FROM — you can JOIN it, filter it, aggregate it. TVFs are the parameterised alternative to views: a view has no parameters, but a TVF accepts arguments that shape the result.</P>

      <H>SETOF — return rows of a specific type</H>

      <CodeBlock
        label="Table-valued function — SETOF and RETURNS TABLE"
        code={`-- RETURNS TABLE: define the output columns explicitly
CREATE OR REPLACE FUNCTION fn_store_daily_report(
  p_store_id  TEXT,
  p_from      DATE DEFAULT '2024-01-01',
  p_to        DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  order_date      DATE,
  order_count     BIGINT,
  daily_revenue   NUMERIC,
  avg_order       NUMERIC,
  top_category    TEXT
)
LANGUAGE plpgsql STABLE
AS $$
BEGIN
  RETURN QUERY
  WITH daily AS (
    SELECT
      o.order_date,
      COUNT(DISTINCT o.order_id)          AS cnt,
      ROUND(SUM(o.total_amount), 2)       AS rev,
      ROUND(AVG(o.total_amount), 2)       AS avg_val,
      p.category,
      ROUND(SUM(oi.line_total), 2)        AS cat_rev,
      RANK() OVER (
        PARTITION BY o.order_date
        ORDER BY SUM(oi.line_total) DESC
      )                                   AS cat_rank
    FROM orders      AS o
    JOIN order_items AS oi ON o.order_id    = oi.order_id
    JOIN products    AS p  ON oi.product_id = p.product_id
    WHERE o.store_id     = p_store_id
      AND o.order_status = 'Delivered'
      AND o.order_date BETWEEN p_from AND p_to
    GROUP BY o.order_date, p.category
  )
  SELECT
    order_date,
    cnt,
    rev,
    avg_val,
    category
  FROM daily
  WHERE cat_rank = 1
  ORDER BY order_date;
END;
$$;

-- Use it exactly like a table:
SELECT * FROM fn_store_daily_report('ST001');
SELECT * FROM fn_store_daily_report('ST001', '2024-01-01', '2024-01-31');

-- JOIN the function result to other tables:
SELECT s.city, r.daily_revenue, r.top_category
FROM fn_store_daily_report('ST001') AS r
CROSS JOIN stores AS s
WHERE s.store_id = 'ST001';`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate fn_store_daily_report('ST001') inline
WITH daily AS (
  SELECT
    o.order_date,
    COUNT(DISTINCT o.order_id)            AS order_count,
    ROUND(SUM(o.total_amount), 2)         AS daily_revenue,
    ROUND(AVG(o.total_amount), 2)         AS avg_order,
    p.category,
    ROUND(SUM(oi.line_total), 2)          AS cat_rev,
    RANK() OVER (
      PARTITION BY o.order_date
      ORDER BY SUM(oi.line_total) DESC
    )                                     AS cat_rank
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.store_id     = 'ST001'
    AND o.order_status = 'Delivered'
  GROUP BY o.order_date, p.category
)
SELECT
  order_date,
  order_count,
  daily_revenue,
  avg_order,
  category AS top_category
FROM daily
WHERE cat_rank = 1
ORDER BY order_date;`}
        height={270}
        showSchema={true}
      />

      <H>Simple SQL table-valued function</H>

      <CodeBlock
        label="SQL language TVF — clean and inlinable"
        code={`-- Simple SQL TVF: parameterised view for top-N products by category
CREATE OR REPLACE FUNCTION fn_top_products_by_category(
  p_category  TEXT,
  p_limit     INTEGER DEFAULT 5
)
RETURNS TABLE (
  product_id    INTEGER,
  product_name  TEXT,
  unit_price    NUMERIC,
  margin_pct    NUMERIC,
  times_ordered BIGINT
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.product_id,
    p.product_name,
    p.unit_price,
    ROUND((p.unit_price - p.cost_price) / NULLIF(p.unit_price, 0) * 100, 1),
    COUNT(DISTINCT oi.order_id)
  FROM products    AS p
  LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
  WHERE p.category = p_category
  GROUP BY p.product_id, p.product_name, p.unit_price, p.cost_price
  ORDER BY COUNT(DISTINCT oi.order_id) DESC
  LIMIT p_limit
$$;

-- Call:
SELECT * FROM fn_top_products_by_category('Dairy');
SELECT * FROM fn_top_products_by_category('Bakery', 3);`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate fn_top_products_by_category('Dairy') inline
SELECT
  p.product_id,
  p.product_name,
  p.unit_price,
  ROUND((p.unit_price - p.cost_price) / NULLIF(p.unit_price, 0) * 100, 1) AS margin_pct,
  COUNT(DISTINCT oi.order_id)                                              AS times_ordered
FROM products    AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
WHERE p.category = 'Dairy'
GROUP BY p.product_id, p.product_name, p.unit_price, p.cost_price
ORDER BY times_ordered DESC
LIMIT 5;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="IMMUTABLE, STABLE, VOLATILE — Volatility Categories" />

      <P>Every function has a <Hl>volatility category</Hl> that tells the query planner how the function behaves across multiple calls with the same inputs. Getting this right enables the planner to cache results, inline the function, and use it in functional indexes.</P>

      <VolCard
        vol="IMMUTABLE"
        color="#00e676"
        desc="Always returns the same result for the same inputs, forever. Does not read the database. Does not depend on any external state."
        when="Pure mathematical or string computations: fn_margin_pct(price, cost), fn_price_band(price), LOWER(col). Safe to use in index expressions."
        example="fn_margin_pct(100, 60) always returns 40.0, regardless of when called. Planner can cache the result and call only once per unique input."
      />
      <VolCard
        vol="STABLE"
        color={C}
        desc="Returns the same result within a single query execution but may change between queries. Can read the database but cannot modify it. Result may depend on current time or current session settings."
        when="Functions that read base tables: fn_store_daily_report(id, from, to). Functions using CURRENT_DATE, CURRENT_USER. View-equivalent functions."
        example="fn_store_daily_report('ST001') returns the same rows throughout one query execution, but different rows if data changes and another query runs. Cannot be used in indexes."
      />
      <VolCard
        vol="VOLATILE (default)"
        color="#f97316"
        desc="Can return different results on every call even with identical inputs. May read or modify the database. May depend on random values, sequences, or external state."
        when="Functions that use RANDOM(), NEXTVAL(), NOW() with side effects, or modify data. Any function whose result cannot be predicted from its inputs alone."
        example="fn_generate_order_id() calls NEXTVAL(sequence) — each call returns a new, unique integer. Cannot be cached or inlined. This is the default if no category is specified."
      />

      <CodeBlock
        label="Volatility in practice — when it matters"
        code={`-- IMMUTABLE: safe in indexes, cached aggressively
CREATE INDEX idx_products_margin ON products (
  fn_margin_pct(unit_price, cost_price)
);
-- The planner knows fn_margin_pct is IMMUTABLE:
-- WHERE fn_margin_pct(unit_price, cost_price) > 40
-- → uses the functional index directly (fast)

-- STABLE: cannot be in indexes, but planner evaluates once per query
CREATE OR REPLACE FUNCTION fn_current_month_revenue(p_store_id TEXT)
RETURNS NUMERIC
LANGUAGE plpgsql STABLE AS $$
DECLARE v_rev NUMERIC;
BEGIN
  SELECT ROUND(SUM(total_amount), 2) INTO v_rev
  FROM orders
  WHERE store_id = p_store_id
    AND order_status = 'Delivered'
    AND DATE_TRUNC('month', order_date) = DATE_TRUNC('month', CURRENT_DATE);
  RETURN COALESCE(v_rev, 0);
END;
$$;

-- VOLATILE: evaluated fresh on every row — no caching
CREATE OR REPLACE FUNCTION fn_random_discount()
RETURNS NUMERIC
LANGUAGE sql VOLATILE AS $$
  SELECT ROUND(RANDOM() * 20 + 5, 0)   -- random 5-25% discount
$$;

-- WRONG — declaring IMMUTABLE when function reads the database:
-- CREATE FUNCTION fn_customer_count() RETURNS BIGINT
-- LANGUAGE sql IMMUTABLE AS $$ SELECT COUNT(*) FROM customers $$;
-- ↑ IMMUTABLE is a LIE — the planner will cache a stale result
-- Always use STABLE for functions that read tables`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate volatility impact on results
SELECT
  product_id,
  product_name,
  unit_price,
  cost_price,

  -- IMMUTABLE: same result every call — safe to call multiple times
  ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1) AS margin_pct,

  -- STABLE: reads current data — consistent within this query
  EXTRACT(MONTH FROM CURRENT_DATE)::INT   AS current_month,

  -- VOLATILE: different every row (use RANDOM() carefully)
  ROUND(RANDOM() * 10 + 5, 0)            AS random_discount_pct

FROM products
ORDER BY margin_pct DESC
LIMIT 5;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Function Overloading — Same Name, Different Parameters" />

      <P>PostgreSQL supports <Hl>function overloading</Hl> — multiple functions can share the same name as long as they have different parameter types or counts. The database picks the correct version based on the argument types provided at call time.</P>

      <CodeBlock
        label="Function overloading — polymorphic behaviour"
        code={`-- Overload 1: margin_pct from price and cost
CREATE OR REPLACE FUNCTION fn_margin_pct(
  p_price  NUMERIC,
  p_cost   NUMERIC
) RETURNS NUMERIC
LANGUAGE sql IMMUTABLE AS $$
  SELECT ROUND((p_price - p_cost) / NULLIF(p_price, 0) * 100, 1)
$$;

-- Overload 2: margin_pct from product_id (looks up from table)
CREATE OR REPLACE FUNCTION fn_margin_pct(
  p_product_id  INTEGER
) RETURNS NUMERIC
LANGUAGE plpgsql STABLE AS $$
DECLARE v_price NUMERIC; v_cost NUMERIC;
BEGIN
  SELECT unit_price, cost_price INTO v_price, v_cost
  FROM products WHERE product_id = p_product_id;
  RETURN ROUND((v_price - v_cost) / NULLIF(v_price, 0) * 100, 1);
END;
$$;

-- Overload 3: format_display as TEXT (one arg)
CREATE OR REPLACE FUNCTION fn_format_display(p_amount NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE AS $$
  SELECT '₹' || TO_CHAR(p_amount, 'FM999,999,990.00')
$$;

-- Overload 4: format_display with currency code (two args)
CREATE OR REPLACE FUNCTION fn_format_display(
  p_amount    NUMERIC,
  p_currency  TEXT
) RETURNS TEXT
LANGUAGE sql IMMUTABLE AS $$
  SELECT p_currency || ' ' || TO_CHAR(p_amount, 'FM999,999,990.00')
$$;

-- Caller does not need to know which overload:
SELECT fn_margin_pct(100.0, 60.0);     -- → calls Overload 1
SELECT fn_margin_pct(5);               -- → calls Overload 2
SELECT fn_format_display(1250.50);     -- → calls Overload 3
SELECT fn_format_display(1250.50,'$'); -- → calls Overload 4`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate overload behaviour using type-based dispatch
-- Simulating what each overload version would return
SELECT
  'Overload 1 (price, cost)'              AS call_pattern,
  ROUND((100.0 - 60.0) / NULLIF(100.0, 0) * 100, 1) AS result

UNION ALL

SELECT
  'Overload 3 (amount → ₹ format)',
  NULL  -- text result not numeric
UNION ALL

SELECT
  'Overload 4 (amount, currency → $ format)',
  NULL;`}
        height={135}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="STRICT — Automatic NULL Propagation" />

      <P>Marking a function <Hl>STRICT</Hl> (or RETURNS NULL ON NULL INPUT) tells the database to skip execution and return NULL automatically whenever any argument is NULL. This is equivalent to manual COALESCE/IS NULL checking inside the function body but requires no extra code.</P>

      <CodeBlock
        label="STRICT — automatic NULL handling"
        code={`-- WITHOUT STRICT: must handle NULLs manually
CREATE OR REPLACE FUNCTION fn_margin_pct_manual(
  p_price  NUMERIC,
  p_cost   NUMERIC
) RETURNS NUMERIC
LANGUAGE sql IMMUTABLE AS $$
  SELECT CASE
    WHEN p_price IS NULL OR p_cost IS NULL THEN NULL
    ELSE ROUND((p_price - p_cost) / NULLIF(p_price, 0) * 100, 1)
  END
$$;

-- WITH STRICT: NULL propagation is automatic — body is cleaner
CREATE OR REPLACE FUNCTION fn_margin_pct(
  p_price  NUMERIC,
  p_cost   NUMERIC
) RETURNS NUMERIC
LANGUAGE sql IMMUTABLE STRICT AS $$
  SELECT ROUND((p_price - p_cost) / NULLIF(p_price, 0) * 100, 1)
$$;
-- If p_price IS NULL OR p_cost IS NULL → returns NULL immediately
-- The body never executes when any argument is NULL

-- When NOT to use STRICT:
-- When NULL input should produce a non-NULL output
-- e.g. fn_coalesce_label(p_value TEXT) should return 'N/A' for NULL p_value
-- Using STRICT would make it return NULL instead — wrong behaviour`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate STRICT-like behaviour
SELECT
  product_name,
  unit_price,
  cost_price,
  -- STRICT equivalent: if either is NULL, result is NULL
  CASE
    WHEN unit_price IS NULL OR cost_price IS NULL THEN NULL
    ELSE ROUND((unit_price - cost_price) / NULLIF(unit_price, 0) * 100, 1)
  END                                   AS margin_pct_strict,
  -- Without STRICT: COALESCE handles NULLs explicitly
  ROUND(
    COALESCE(unit_price - cost_price, 0)
    / NULLIF(COALESCE(unit_price, 0), 0) * 100
  , 1)                                  AS margin_pct_with_defaults
FROM products
ORDER BY unit_price DESC
LIMIT 8;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="SECURITY DEFINER — Elevated Privilege Functions" />

      <P>By default a function runs with the privileges of the <Hl>caller</Hl> — the user invoking the function. A <Hl>SECURITY DEFINER</Hl> function runs with the privileges of the user who created it. This enables controlled privilege escalation: an application role with no direct table access can call a SECURITY DEFINER function that reads or writes restricted tables — but only through the logic the function defines.</P>

      <CodeBlock
        label="SECURITY DEFINER — controlled privilege escalation"
        code={`-- Scenario: app_user has NO SELECT on the customers table
-- But needs to look up customer loyalty tier by customer_id
-- (to personalise the UI — should not see full customer data)

-- Create the function as a privileged user (admin role):
CREATE OR REPLACE FUNCTION fn_get_loyalty_tier(p_customer_id INTEGER)
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER          -- runs as the function creator, not the caller
SET search_path = public  -- IMPORTANT: always set search_path in SECURITY DEFINER
AS $$
DECLARE
  v_tier TEXT;
BEGIN
  -- This SELECT runs with CREATOR's privileges (admin), not app_user's
  SELECT loyalty_tier INTO v_tier
  FROM customers
  WHERE customer_id = p_customer_id;
  RETURN v_tier;
END;
$$;

-- Grant EXECUTE to the app role:
GRANT EXECUTE ON FUNCTION fn_get_loyalty_tier(INTEGER) TO app_user;
-- Revoke direct table access:
REVOKE SELECT ON customers FROM app_user;

-- Now app_user can call the function but cannot query customers directly:
SELECT fn_get_loyalty_tier(42);    -- works (runs as admin)
SELECT * FROM customers;           -- ERROR: permission denied

-- SECURITY RISK: always SET search_path to prevent search_path injection
-- A malicious user could create a schema that shadows system functions
-- SET search_path = public forces the function to use the correct schema`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what SECURITY DEFINER enables:
-- A masked, restricted view of customer data
-- (equivalent to what a SECURITY DEFINER function would expose)
SELECT
  customer_id,
  -- Only expose loyalty_tier — not email, phone, or full name
  loyalty_tier,
  city,
  -- Mask name to first name + last initial
  first_name || ' ' || LEFT(last_name, 1) || '.'  AS display_name,
  -- Mask email
  LEFT(email, 3) || '***@' || SPLIT_PART(email, '@', 2) AS masked_email
FROM customers
WHERE customer_id = 1;   -- fn_get_loyalty_tier(1) equivalent`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Building a Reusable Function Library" />

      <P>Production databases accumulate dozens of domain functions. Organising them into a coherent library — with consistent naming, documentation, and volatility declarations — makes the codebase maintainable. The convention used at most companies: a function schema (or prefix) per domain area, consistent parameter naming, and a comment on every function.</P>

      <CodeBlock
        label="FreshCart function library — production-ready definitions"
        code={`-- ── NAMING CONVENTION ──────────────────────────────────────────
-- fn_<domain>_<action>
-- fn_product_margin_pct   — product domain
-- fn_customer_ltv_tier    — customer domain
-- fn_order_delivery_label — order domain
-- fn_format_inr           — formatting utilities

-- ── PRODUCT DOMAIN ──────────────────────────────────────────────
-- Gross margin percentage
CREATE OR REPLACE FUNCTION fn_product_margin_pct(
  p_price NUMERIC, p_cost NUMERIC
) RETURNS NUMERIC
LANGUAGE sql IMMUTABLE STRICT
COMMENT ON FUNCTION fn_product_margin_pct IS
  'Returns gross margin % = (price - cost) / price * 100. NULL if either input is NULL.'
AS $$ SELECT ROUND((p_price - p_cost) / NULLIF(p_price, 0) * 100, 1) $$;

-- Price band classification
CREATE OR REPLACE FUNCTION fn_product_price_band(p_price NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$ SELECT CASE
  WHEN p_price IS NULL THEN 'Unknown'
  WHEN p_price < 50    THEN 'Budget'
  WHEN p_price < 150   THEN 'Standard'
  WHEN p_price < 300   THEN 'Premium'
  ELSE 'Luxury'
END $$;

-- ── CUSTOMER DOMAIN ──────────────────────────────────────────────
-- Lifetime value tier
CREATE OR REPLACE FUNCTION fn_customer_ltv_tier(p_ltv NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$ SELECT CASE
  WHEN p_ltv IS NULL   THEN 'New'
  WHEN p_ltv >= 5000   THEN 'Platinum'
  WHEN p_ltv >= 2000   THEN 'Gold'
  WHEN p_ltv >= 500    THEN 'Silver'
  ELSE 'Bronze'
END $$;

-- Days since last order → recency label
CREATE OR REPLACE FUNCTION fn_customer_recency_label(p_days INTEGER)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$ SELECT CASE
  WHEN p_days IS NULL THEN 'Never ordered'
  WHEN p_days <= 30   THEN 'Active'
  WHEN p_days <= 90   THEN 'At risk'
  WHEN p_days <= 180  THEN 'Lapsing'
  ELSE 'Churned'
END $$;

-- ── ORDER DOMAIN ─────────────────────────────────────────────────
-- Delivery speed label
CREATE OR REPLACE FUNCTION fn_order_delivery_label(p_days INTEGER)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$ SELECT CASE
  WHEN p_days IS NULL THEN 'Pending'
  WHEN p_days <= 1    THEN 'Express'
  WHEN p_days <= 3    THEN 'Standard'
  WHEN p_days <= 7    THEN 'Slow'
  ELSE 'Very slow'
END $$;

-- ── FORMATTING UTILITIES ─────────────────────────────────────────
-- INR display format
CREATE OR REPLACE FUNCTION fn_format_inr(p_amount NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$ SELECT '₹' || TO_CHAR(COALESCE(p_amount, 0), 'FM999,999,990.00') $$;

-- Safe percentage
CREATE OR REPLACE FUNCTION fn_safe_pct(p_part NUMERIC, p_total NUMERIC)
RETURNS NUMERIC
LANGUAGE sql IMMUTABLE
AS $$ SELECT ROUND(p_part / NULLIF(p_total, 0) * 100, 1) $$;`}
      />

      <SQLPlayground
        initialQuery={`-- Comprehensive product report using the function library (inline)
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  -- fn_product_margin_pct:
  ROUND((p.unit_price - p.cost_price) / NULLIF(p.unit_price, 0) * 100, 1)  AS margin_pct,
  -- fn_product_price_band:
  CASE
    WHEN p.unit_price < 50  THEN 'Budget'
    WHEN p.unit_price < 150 THEN 'Standard'
    WHEN p.unit_price < 300 THEN 'Premium'
    ELSE 'Luxury'
  END                                                                        AS price_band,
  -- fn_format_inr:
  '₹' || TO_CHAR(p.unit_price, 'FM999,999,990.00')                          AS display_price,
  -- fn_safe_pct (% of category):
  ROUND(p.unit_price / NULLIF(
    SUM(p.unit_price) OVER (PARTITION BY p.category)
  , 0) * 100, 1)                                                             AS pct_of_category_total
FROM products AS p
ORDER BY p.category, margin_pct DESC
LIMIT 12;`}
        height={265}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data engineer at DoorDash. The analytics team runs 30+ reports — all of which repeat the same customer segmentation logic, delivery performance labels, and margin calculations. The logic has already drifted: three reports classify "active" as last order within 30 days, two use 60 days, and one uses 90 days. You standardise everything into a function library that becomes the single source of truth.</P>

      <TimeBlock time="10:00 AM" label="Audit finds 6 different definitions of 'active customer'">
        Reports use different thresholds for churn classification. The function library will fix this drift permanently.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Deploy the function library">
        Every classification function defined once. All 30 reports updated to call the function instead of embedding logic inline.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- The unified customer analytics report using the function library
-- Every classification comes from a single function — no drift possible
WITH customer_metrics AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name      AS customer,
    c.city,
    c.loyalty_tier                           AS stored_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value,
    COUNT(o.order_id)                        AS order_count,
    MAX(o.order_date)                        AS last_order_date,
    CURRENT_DATE - MAX(o.order_date)         AS days_since_last_order
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id   = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name, c.city, c.loyalty_tier
)
SELECT
  customer_id,
  customer,
  city,
  lifetime_value,
  order_count,
  last_order_date,
  days_since_last_order,
  -- fn_customer_ltv_tier inline (single source of truth):
  CASE
    WHEN lifetime_value IS NULL OR lifetime_value = 0 THEN 'New'
    WHEN lifetime_value >= 5000 THEN 'Platinum'
    WHEN lifetime_value >= 2000 THEN 'Gold'
    WHEN lifetime_value >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END                                        AS earned_tier,
  -- fn_customer_recency_label inline (standard 30/90/180 thresholds):
  CASE
    WHEN days_since_last_order IS NULL THEN 'Never ordered'
    WHEN days_since_last_order <= 30   THEN 'Active'
    WHEN days_since_last_order <= 90   THEN 'At risk'
    WHEN days_since_last_order <= 180  THEN 'Lapsing'
    ELSE 'Churned'
  END                                        AS recency_segment,
  -- fn_format_inr inline:
  '₹' || TO_CHAR(lifetime_value, 'FM999,999,990.00') AS formatted_ltv
FROM customer_metrics
ORDER BY lifetime_value DESC NULLS LAST
LIMIT 12;`}
        height={350}
        showSchema={true}
      />

      <TimeBlock time="11:45 AM" label="Library deployed — all 30 reports reference functions">
        Business rules change: "lapsing" threshold moves from 180 to 120 days. One function update. All 30 reports automatically reflect the new definition on next run — no report-by-report fixes needed.
      </TimeBlock>

      <ProTip>
        Build your function library before you need it. The moment you write the same CASE classification twice in two different queries — that is the signal to extract it into a function. The second instance is the one that will diverge. By the time you notice drift across a dozen reports, the function library is weeks overdue. Create fn_ functions early, use them everywhere, and make schema changes in one place.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a user-defined function and how does it differ from a stored procedure?">
        <p style={{ margin: '0 0 14px' }}>A user-defined function (UDF) is a named, reusable computation stored in the database that accepts parameters and returns a value — a scalar value, a row, or a table of rows. Functions are called inline in SQL expressions: in SELECT lists, WHERE clauses, JOIN conditions, CHECK constraints, and functional index definitions. They integrate seamlessly into SQL queries because they behave like built-in functions.</p>
        <p style={{ margin: '0 0 14px' }}>The key differences from stored procedures: functions must return a value — a procedure does not. Functions cannot manage transactions (no COMMIT or ROLLBACK inside a function in PostgreSQL) — procedures can. Functions are called inline in SQL — procedures are called with CALL as a standalone statement and cannot appear inside a SELECT or WHERE. Functions can be used in computed columns, check constraints, and functional indexes — procedures cannot.</p>
        <p style={{ margin: 0 }}>In practice, functions and procedures serve different purposes. Functions encapsulate reusable computations: margin percentage, tier classification, display formatting, validation logic. These computations need to run inside queries and be composable with other SQL expressions. Procedures encapsulate workflows: batch processing, multi-step order fulfilment, nightly tier upgrades. These workflows need transaction control and are invoked as standalone operations rather than embedded in queries. Many PostgreSQL teams use functions for almost all database-side logic and reserve procedures specifically for the cases that require COMMIT/ROLLBACK inside the body.</p>
      </IQ>

      <IQ q="What are the three volatility categories and why does choosing the right one matter?">
        <p style={{ margin: '0 0 14px' }}>IMMUTABLE means the function always returns the same result for the same inputs — it does not read the database, does not depend on current time, and has no side effects. The query planner can cache IMMUTABLE function results, call the function once for all identical inputs in a query, and use IMMUTABLE functions in index definitions. Pure mathematical computations (margin_pct, price_band) and pure string transformations (LOWER, TRIM) are IMMUTABLE.</p>
        <p style={{ margin: '0 0 14px' }}>STABLE means the function returns consistent results within a single query execution but may return different results between queries. It can read the database but cannot modify it. The planner evaluates STABLE functions once per query execution rather than once per row. Functions that read base tables, use CURRENT_DATE, or depend on session settings are STABLE. STABLE functions cannot be used in index definitions — the index would become stale as data changes.</p>
        <p style={{ margin: 0 }}>VOLATILE is the default when no category is specified. The function may return different results on every call even with identical inputs — it may use RANDOM(), call NEXTVAL(), modify data, or depend on any external state. The planner makes no caching assumptions and evaluates VOLATILE functions once per row. Getting the category wrong has real consequences: declaring a function IMMUTABLE when it reads the database is a lie to the planner — it caches a stale result, causing queries to return wrong data without any error. Declaring a STABLE function VOLATILE is merely wasteful — it re-evaluates unnecessarily. Always use the most restrictive accurate category: IMMUTABLE if possible, STABLE if it reads data, VOLATILE only if necessary.</p>
      </IQ>

      <IQ q="What is function overloading and when would you use it?">
        <p style={{ margin: '0 0 14px' }}>Function overloading allows multiple functions to share the same name, distinguished by their parameter signature — the number of parameters and/or the parameter data types. When the function is called, PostgreSQL selects the correct version based on the types of the arguments provided. This enables polymorphic behaviour: the same logical operation works correctly for different input types without the caller needing to know which specific version is being called.</p>
        <p style={{ margin: '0 0 14px' }}>Use overloading when the same logical concept has multiple natural invocation patterns. A margin percentage function could accept (unit_price, cost_price) for cases where both values are at hand, or just (product_id) for cases where the caller only knows the product identifier and the function should look up the prices. Both functions compute the same thing — margin percentage — but from different starting information.</p>
        <p style={{ margin: 0 }}>Overloading also enables default-argument polymorphism: fn_store_report('ST001') calls the two-argument overload with defaults, fn_store_report('ST001', '2024-01-01', '2024-01-31') calls the three-argument overload with explicit dates. The caller uses the simplest form for the common case and the more explicit form when needed. Overloading should be used when the overloads represent genuinely the same operation — not as a way to group unrelated functions under one name. If the function bodies are completely unrelated, separate names are clearer. The benefit of overloading is that callers do not need to remember multiple function names for the same logical operation.</p>
      </IQ>

      <IQ q="What is SECURITY DEFINER and when is it appropriate?">
        <p style={{ margin: '0 0 14px' }}>By default, a function runs with the privileges of the user calling it — the caller's permissions determine what tables can be read or modified. SECURITY DEFINER changes this: the function runs with the privileges of the user who created the function (typically a privileged database role), not the caller. This enables controlled privilege escalation — an unprivileged caller can perform an operation they would otherwise be denied, but only through the specific logic the function defines.</p>
        <p style={{ margin: '0 0 14px' }}>Appropriate use cases: an application user needs to read a specific value from a sensitive table (like a customer loyalty tier for UI personalisation) but should not have general SELECT permission on the entire table. A SECURITY DEFINER function that accepts a customer_id and returns only the loyalty_tier column gives the application exactly what it needs without exposing the rest of the table. Similarly, an audit logging function that writes to a restricted audit table can be SECURITY DEFINER — the application calls it to log actions without needing direct INSERT on the audit table.</p>
        <p style={{ margin: 0 }}>Two critical security practices for SECURITY DEFINER functions: always include SET search_path = schema_name in the function definition. Without this, a malicious user could create a schema with objects that shadow system functions — the SECURITY DEFINER function would then call the attacker's objects with elevated privileges (a search_path injection attack). Second, be conservative about what the function exposes — a SECURITY DEFINER function should expose the minimum information needed for its purpose, not general access to the privileged table. Grant EXECUTE on the function to the appropriate role and verify the function cannot be exploited to access more data than intended by testing with the restricted role.</p>
      </IQ>

      <IQ q="When should you use a table-valued function instead of a view?">
        <p style={{ margin: '0 0 14px' }}>A view is a static saved query — it always returns the same shape of data with no ability to vary the result based on runtime parameters. A table-valued function (TVF) is a parameterised query that produces a different result depending on the arguments passed. Use a TVF when the query that populates a result set needs runtime parameters that filter, scope, or shape the output.</p>
        <p style={{ margin: '0 0 14px' }}>Classic TVF use cases: a store performance report filtered by store_id and date range — the filter changes per call, making a static view inadequate. A product analysis for a specific category — different categories need different results. A customer activity report for a given date window — the window is specified at runtime. All of these require parameters that a static view cannot accept. The TVF exposes a table-like interface (SELECT * FROM fn_store_report('ST001')) that is fully composable with the rest of SQL — joinable, filterable, aggregatable — while carrying parameters.</p>
        <p style={{ margin: 0 }}>Use a view when: the query does not need parameters (shows all stores, all products, all customers), the abstraction is primarily for access control or simplification, or the same query is referenced by many different downstream consumers with no per-consumer variation. Views are also preferable when the logic is simple enough that the query planner can inline it and optimise it freely — deep TVFs can be opaque to the planner in ways that reduce optimisation opportunities. A pragmatic approach: start with a parameterised WHERE clause in a query, extract to a view when the same query appears in multiple places without parameters, extract to a TVF when parameters vary per call. Materialised views are the third option when the result is expensive to compute and can tolerate being slightly stale.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: function fn_margin_pct(integer, integer) does not exist — no match for argument types"
        cause="The function was defined to accept NUMERIC parameters but was called with INTEGER arguments and no overload exists for INTEGER inputs. PostgreSQL's function resolution is strict about types — it will not silently cast INTEGER to NUMERIC if doing so would be ambiguous or if the cast is not implicit."
        fix="Either cast arguments at the call site: fn_margin_pct(col::NUMERIC, other_col::NUMERIC), or add an overload that accepts INTEGER parameters, or redefine the function to accept ANYELEMENT or use polymorphic types. For functions used with mixed numeric types, define the parameters as NUMERIC (the most general exact numeric type) and rely on implicit promotion from INTEGER to NUMERIC which PostgreSQL does perform automatically for this pair. Check which types the function was created with: SELECT proargtypes FROM pg_proc WHERE proname = 'fn_margin_pct'."
      />

      <Err
        msg="Function declared IMMUTABLE but returns stale/wrong results after data changes"
        cause="The function was incorrectly declared IMMUTABLE when it actually reads from database tables. IMMUTABLE tells the planner the function's result depends only on its inputs — so the planner may cache the result or compute it only once across many rows. When the underlying data changes, the cached result is not invalidated and queries return the old (now wrong) result."
        fix="Change the volatility to STABLE: CREATE OR REPLACE FUNCTION fn_name(...) ... STABLE AS ... STABLE means consistent within a query but may change between queries — appropriate for functions that read tables. Use EXPLAIN ANALYZE to see if the planner is caching the function result incorrectly. Review all IMMUTABLE functions to confirm they genuinely depend only on their inputs and perform no database reads. IMMUTABLE should only be used for pure computations: arithmetic, string manipulations, and deterministic transformations of the input values."
      />

      <Err
        msg="ERROR: cannot change return type of existing function"
        cause="CREATE OR REPLACE FUNCTION cannot change the return type of an existing function — only the function body and volatility can be changed with OR REPLACE. This is because dependent objects (indexes, views, other functions) may rely on the specific return type."
        fix="DROP the function first, then recreate it with the new return type: DROP FUNCTION fn_name(param_types); CREATE FUNCTION fn_name(...) RETURNS new_type AS ...; Be aware that DROP will cascade to any dependent objects (functional indexes on this function, views that call it). Use DROP FUNCTION IF EXISTS fn_name(param_types) CASCADE if cascading is acceptable. List dependents first: SELECT * FROM pg_depend WHERE refobjid = 'fn_name'::regproc to understand the impact before dropping."
      />

      <Err
        msg="SECURITY DEFINER function is exploitable — user can access tables beyond what was intended"
        cause="A SECURITY DEFINER function was created without SET search_path, allowing a malicious user to create a schema that shadows system functions or tables. When the function executes with elevated privileges, it may call attacker-controlled objects rather than the intended ones (search_path injection). Alternatively, the function body is too permissive — it accepts a parameter that is used in a dynamic query without sanitisation, enabling SQL injection."
        fix="Always add SET search_path = public, pg_catalog (or your specific schema) to every SECURITY DEFINER function. This pins the search path for the function's execution, preventing search_path manipulation. For parameterised queries inside SECURITY DEFINER functions, never concatenate parameters into SQL strings — use parameterised queries (EXECUTE ... USING param) or restrict inputs to known-safe types (INTEGER IDs rather than arbitrary TEXT). Audit the function: confirm it exposes only the minimum necessary data and that no parameter value can cause it to access tables beyond its intended scope. Test with a restricted role to verify the function cannot be exploited."
      />

      <Err
        msg="Table-valued function is very slow — slower than the equivalent inline query"
        cause="The query planner cannot see inside the TVF body to optimise it together with the outer query. A TVF is a black box to the planner — it evaluates the function first (producing a temporary result) and then applies outer WHERE filters to that result, rather than pushing filters into the function's query. This prevents predicate pushdown and can cause the function to compute far more rows than the outer query ultimately needs."
        fix="For SQL language functions (LANGUAGE sql), the planner can sometimes inline the function body and optimise it with the outer query — add LANGUAGE sql instead of LANGUAGE plpgsql if the function body is a single SQL SELECT. For PL/pgSQL functions, pass additional parameters to pre-filter inside the function: fn_store_report('ST001', '2024-01-01', '2024-01-31') with the date filter inside the function is faster than fn_store_report('ST001') WHERE order_date BETWEEN ... which filters after the full result is computed. Use EXPLAIN ANALYZE on SELECT * FROM fn_name(args) WHERE ... to see if the WHERE filter is applied before or after the function result materialisation."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Build a FreshCart function library with four functions, then use them all in one report query. Write the CREATE OR REPLACE FUNCTION statements for: (1) fn_order_size_label(p_amount NUMERIC) → TEXT: 'Micro' if < 200, 'Small' if < 500, 'Medium' if < 1000, 'Large' otherwise. IMMUTABLE, handles NULL (return 'Unknown'). (2) fn_store_target_status(p_revenue NUMERIC, p_target NUMERIC) → TEXT: 'Exceeded' if revenue >= target * 1.2, 'Met' if >= target, 'Near' if >= target * 0.8, 'Behind' otherwise. IMMUTABLE STRICT. (3) fn_customer_display_name(p_first TEXT, p_last TEXT) → TEXT: returns 'FirstName L.' format (first name + space + first letter of last name + dot). IMMUTABLE STRICT. (4) fn_days_label(p_days INTEGER) → TEXT: '< 1 week' if days <= 7, '1–2 weeks' if <= 14, '2–4 weeks' if <= 28, '> 1 month' otherwise, 'N/A' if NULL. IMMUTABLE. Then write a report query that uses all four functions against FreshCart data."
        hint="Functions 1 and 4: check IS NULL first in the CASE, then the numeric thresholds. Function 2: STRICT handles NULL automatically. Function 3: LEFT(p_last, 1) for the initial. Report: join orders + stores + customers, call each function."
        answer={`-- Function 1: Order size label
CREATE OR REPLACE FUNCTION fn_order_size_label(p_amount NUMERIC)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_amount IS NULL THEN 'Unknown'
    WHEN p_amount < 200   THEN 'Micro'
    WHEN p_amount < 500   THEN 'Small'
    WHEN p_amount < 1000  THEN 'Medium'
    ELSE 'Large'
  END
$$;

-- Function 2: Store target status (STRICT handles NULL inputs)
CREATE OR REPLACE FUNCTION fn_store_target_status(
  p_revenue NUMERIC,
  p_target  NUMERIC
) RETURNS TEXT
LANGUAGE sql IMMUTABLE STRICT
AS $$
  SELECT CASE
    WHEN p_revenue >= p_target * 1.2 THEN 'Exceeded'
    WHEN p_revenue >= p_target       THEN 'Met'
    WHEN p_revenue >= p_target * 0.8 THEN 'Near'
    ELSE 'Behind'
  END
$$;

-- Function 3: Customer display name (STRICT: NULL if either input NULL)
CREATE OR REPLACE FUNCTION fn_customer_display_name(
  p_first TEXT,
  p_last  TEXT
) RETURNS TEXT
LANGUAGE sql IMMUTABLE STRICT
AS $$
  SELECT p_first || ' ' || LEFT(p_last, 1) || '.'
$$;

-- Function 4: Days label
CREATE OR REPLACE FUNCTION fn_days_label(p_days INTEGER)
RETURNS TEXT
LANGUAGE sql IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_days IS NULL THEN 'N/A'
    WHEN p_days <= 7    THEN '< 1 week'
    WHEN p_days <= 14   THEN '1–2 weeks'
    WHEN p_days <= 28   THEN '2–4 weeks'
    ELSE '> 1 month'
  END
$$;

-- ── Report using all four functions ──────────────────────────────
-- (functions simulated inline for the playground)
SELECT
  o.order_id,
  -- fn_customer_display_name:
  c.first_name || ' ' || LEFT(c.last_name, 1) || '.'       AS customer_display,
  c.loyalty_tier,
  s.city                                                    AS store_city,
  o.total_amount,
  -- fn_order_size_label:
  CASE
    WHEN o.total_amount IS NULL THEN 'Unknown'
    WHEN o.total_amount < 200   THEN 'Micro'
    WHEN o.total_amount < 500   THEN 'Small'
    WHEN o.total_amount < 1000  THEN 'Medium'
    ELSE 'Large'
  END                                                       AS order_size,
  o.delivery_date - o.order_date                            AS delivery_days,
  -- fn_days_label:
  CASE
    WHEN (o.delivery_date - o.order_date) IS NULL THEN 'N/A'
    WHEN (o.delivery_date - o.order_date) <= 7    THEN '< 1 week'
    WHEN (o.delivery_date - o.order_date) <= 14   THEN '1–2 weeks'
    WHEN (o.delivery_date - o.order_date) <= 28   THEN '2–4 weeks'
    ELSE '> 1 month'
  END                                                       AS delivery_window,
  -- fn_store_target_status (per-order revenue vs store monthly target):
  CASE
    WHEN o.total_amount >= s.monthly_target * 1.2 THEN 'Exceeded'
    WHEN o.total_amount >= s.monthly_target        THEN 'Met'
    WHEN o.total_amount >= s.monthly_target * 0.8  THEN 'Near'
    ELSE 'Behind'
  END                                                       AS order_vs_target
FROM orders      AS o
JOIN customers   AS c ON o.customer_id = c.customer_id
JOIN stores      AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
ORDER BY o.total_amount DESC
LIMIT 10;`}
        explanation="Function 1 checks IS NULL first in the CASE — without this, a NULL p_amount would fall through all WHEN clauses and the ELSE would return 'Large', which is semantically wrong. Function 2 uses STRICT — if either revenue or target is NULL, the planner returns NULL automatically without executing the body. This is correct because a status cannot be computed without both values. Function 3 also uses STRICT — a display name requires both first and last name; NULL for either is a data quality issue that should propagate. LEFT(p_last, 1) safely handles a single-character last name. Function 4 checks IS NULL before numeric comparisons — a NULL days value means delivery date is missing (order not yet delivered), so 'N/A' is semantically correct rather than defaulting to a numeric band. The report query joins three tables and applies all four function equivalents inline. In production with the functions created in the database, each CASE block would be replaced by a single function call: fn_order_size_label(o.total_amount), fn_days_label(o.delivery_date - o.order_date), etc. — making the report query dramatically shorter and guaranteed to use the same classification logic as every other query that calls these functions."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A user-defined function encapsulates a reusable computation. Unlike procedures, functions return values and are callable inline in SELECT, WHERE, JOIN, CHECK constraints, and index definitions.',
          'SQL language functions (LANGUAGE sql) contain a single SQL expression and are inlinable — the planner can fold them directly into the calling query. Use them for simple expressions. Use PL/pgSQL for conditional logic and variables.',
          'Three volatility categories: IMMUTABLE (same result forever, safe in indexes, aggressively cached), STABLE (consistent within one query, reads database), VOLATILE (different every call, default if unspecified). Declaring IMMUTABLE on a function that reads tables is a correctness bug — the planner caches stale results.',
          'STRICT (RETURNS NULL ON NULL INPUT) makes the function return NULL automatically when any argument is NULL — no manual IS NULL checking needed in the body. Do not use STRICT when NULL input should produce a non-NULL result.',
          'Function overloading: multiple functions can share a name if their parameter signatures differ. The database picks the correct version based on argument types. Use overloading for the same logical operation with different input patterns.',
          'Table-valued functions (RETURNS TABLE, RETURNS SETOF) are parameterised views — they return rows and accept runtime parameters that static views cannot. Use them when the query that shapes the result set needs arguments.',
          'SECURITY DEFINER runs the function with the creator\'s privileges, not the caller\'s. Always SET search_path = schema in SECURITY DEFINER functions to prevent search_path injection. Grant EXECUTE, revoke direct table access.',
          'A function library — with consistent naming (fn_domain_action), volatility declarations, and STRICT where appropriate — is a single source of truth for business rules. Change the formula in one function; all queries using it update automatically.',
          'Functional indexes on IMMUTABLE functions: CREATE INDEX ON table(fn_name(col)) allows WHERE fn_name(col) > threshold to use the index instead of scanning the table.',
          'DROP FUNCTION requires the full parameter type signature: DROP FUNCTION fn_name(NUMERIC, NUMERIC) — not just the name. CREATE OR REPLACE changes the body and volatility but cannot change the return type.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 50</strong>, you learn Triggers — automatic database responses to INSERT, UPDATE, and DELETE events, with row-level and statement-level triggers, BEFORE vs AFTER timing, and audit log patterns.
        </p>
        <Link href="/learn/sql/triggers" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 50 → Triggers
        </Link>
      </div>

    </LearnLayout>
  );
}