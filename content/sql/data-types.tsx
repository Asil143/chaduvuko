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

const TypeCard = ({ type, color, aliases, storage, range, use, avoid }: {
  type: string; color: string; aliases: string; storage: string;
  range: string; use: string; avoid: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{type}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{aliases}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Storage</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, fontFamily: 'var(--font-mono)' }}>{storage}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Range / Size</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0 }}>{range}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#00e676', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use for</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{use}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Never use for</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{avoid}</p>
      </div>
    </div>
  </div>
);

export default function DataTypes() {
  return (
    <LearnLayout
      title="SQL Data Types"
      description="What types exist, which to choose for each use case, how types affect storage and performance, and how type mismatches cause silent bugs in calculations and comparisons"
      section="SQL — Module 17"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Data Types Matter More Than You Think" />

      <P>Every column in a SQL table has a data type. This is not just a technical detail — the type you choose for a column determines how the database stores it, how fast queries on it run, what operations are valid on it, and whether calculations produce correct results or silently wrong ones.</P>

      <P>Three real consequences of wrong type choices that happen in production:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0 32px' }}>
        {[
          {
            title: 'Financial rounding errors',
            color: '#ff4757',
            desc: 'Storing money as FLOAT instead of DECIMAL causes floating-point rounding errors. ₹10.50 stored as a FLOAT might be retrieved as ₹10.499999999. Multiplied across millions of transactions, these fractions cause accounting discrepancies that compliance teams spend days tracking down.',
          },
          {
            title: 'Silent comparison failures',
            color: '#f59e0b',
            desc: 'Storing a phone number as INTEGER drops leading zeros — 09876543210 becomes 9876543210. Storing order IDs as VARCHAR when they should be INTEGER makes WHERE order_id = 1007 compare a number to a string, which sometimes works (MySQL coerces) and sometimes fails (PostgreSQL errors).',
          },
          {
            title: 'Index inefficiency',
            color: C,
            desc: 'Using VARCHAR(5000) for a column that always holds 2-character country codes wastes storage and makes indexes larger than necessary. Using TEXT when VARCHAR(100) is appropriate prevents certain index types. Choosing the tightest correct type keeps indexes small and queries fast.',
          },
        ].map(item => (
          <div key={item.title} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ width: 4, borderRadius: 2, background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <P>In FreshMart's schema, every type choice was deliberate. unit_price is DECIMAL(10,2) — not FLOAT — because money must be exact. customer_id is INTEGER — not VARCHAR — because IDs are numbers used in arithmetic and joins. order_date is DATE — not TIMESTAMP — because FreshMart only needs day precision. This module explains every choice like that.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Five Type Families" />

      <P>SQL data types fall into five broad families. Every specific type belongs to one of these families, and understanding the families gives you a mental model for choosing types even when you encounter an unfamiliar database.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { family: 'Numeric', color: C, types: 'INTEGER, BIGINT, DECIMAL, FLOAT', desc: 'Numbers — counts, prices, quantities, IDs, percentages' },
          { family: 'Text', color: '#10b981', types: 'VARCHAR, CHAR, TEXT', desc: 'Strings — names, emails, descriptions, codes' },
          { family: 'Date & Time', color: '#f97316', types: 'DATE, TIME, TIMESTAMP, INTERVAL', desc: 'Dates and times — order dates, birth dates, timestamps' },
          { family: 'Boolean', color: '#8b5cf6', types: 'BOOLEAN, TINYINT(1)', desc: 'True/false flags — in_stock, is_active, is_deleted' },
          { family: 'Binary & Other', color: '#f59e0b', types: 'BYTEA, JSON, JSONB, UUID, ARRAY', desc: 'Files, structured data, unique identifiers, lists' },
        ].map(item => (
          <div key={item.family} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 10, padding: '16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.family}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.6 }}>{item.types}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Numeric Types — Integers, Decimals, and Floats" />

      <P>Numeric types are the most consequential choice in database design. The difference between INTEGER, DECIMAL, and FLOAT is not just precision — it determines whether your financial calculations are correct.</P>

      <H>Integer types — whole numbers</H>

      <TypeCard
        type="SMALLINT"
        color="#06b6d4"
        aliases="INT2"
        storage="2 bytes"
        range="-32,768 to 32,767"
        use="Small counters, ratings (1-5), age, small counts"
        avoid="IDs, prices, anything that might exceed 32,767"
      />
      <TypeCard
        type="INTEGER"
        color="#06b6d4"
        aliases="INT, INT4"
        storage="4 bytes"
        range="-2.1 billion to 2.1 billion"
        use="Primary keys, foreign keys, quantities, most counts"
        avoid="User counts above 2 billion (use BIGINT), money"
      />
      <TypeCard
        type="BIGINT"
        color="#06b6d4"
        aliases="INT8"
        storage="8 bytes"
        range="±9.2 quintillion"
        use="High-volume PKs, timestamps as epoch ms, large counts"
        avoid="Overkill for most IDs — use INTEGER until you need BIGINT"
      />

      <SQLPlayground
        initialQuery={`-- See the integer types in FreshMart
SELECT
  column_name,
  data_type,
  character_maximum_length,
  numeric_precision,
  numeric_scale
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;`}
        height={150}
        showSchema={true}
      />

      <H>DECIMAL / NUMERIC — exact decimal arithmetic</H>

      <TypeCard
        type="DECIMAL(p, s)"
        color="#00e676"
        aliases="NUMERIC(p, s)"
        storage="Variable — depends on precision"
        range="Up to 131,072 digits before decimal, 16,383 after"
        use="Money, prices, financial calculations, tax rates, percentages"
        avoid="Scientific measurements needing huge range (use FLOAT)"
      />

      <P>DECIMAL(p, s) takes two parameters: <Hl>p</Hl> (precision) is the total number of significant digits, and <Hl>s</Hl> (scale) is the number of digits after the decimal point. DECIMAL(10, 2) stores up to 10 total digits with exactly 2 after the decimal — perfect for prices up to ₹99,999,999.99.</P>

      <CodeBlock
        label="DECIMAL precision and scale examples"
        code={`DECIMAL(10, 2)   -- max: 99,999,999.99  — prices, salaries
DECIMAL(5, 2)    -- max: 999.99          — percentages, tax rates
DECIMAL(15, 4)   -- max: 99,999,999,999.9999 — high-precision financial
DECIMAL(3, 0)    -- max: 999             — integer stored as decimal

-- FreshMart uses:
unit_price  DECIMAL(10, 2)  -- up to ₹99,999,999.99
cost_price  DECIMAL(10, 2)  -- same
salary      DECIMAL(10, 2)  -- monthly salary
line_total  DECIMAL(10, 2)  -- order item total`}
      />

      <SQLPlayground
        initialQuery={`-- DECIMAL arithmetic is exact — no floating-point error
SELECT
  0.1 + 0.2                         AS float_result,
  CAST(0.1 AS DECIMAL(5,1))
  + CAST(0.2 AS DECIMAL(5,1))       AS decimal_result,
  -- In most databases: float gives 0.30000000000000004
  -- DECIMAL gives exactly 0.3
  unit_price * 1.18                 AS gst_price,
  ROUND(unit_price * 1.18, 2)       AS gst_rounded
FROM products
LIMIT 5;`}
        height={165}
        showSchema={false}
      />

      <H>FLOAT / REAL / DOUBLE — approximate decimal arithmetic</H>

      <TypeCard
        type="FLOAT / DOUBLE"
        color="#ff4757"
        aliases="FLOAT8, DOUBLE PRECISION, REAL"
        storage="4 bytes (REAL) or 8 bytes (FLOAT/DOUBLE)"
        range="±1.7 × 10^308 (enormous range)"
        use="Scientific measurements, ML model weights, statistics"
        avoid="Money, prices, financial calculations — use DECIMAL instead"
      />

      <P>FLOAT stores numbers in binary floating-point format — the same format used by computers for all floating-point arithmetic. It can represent an enormous range of values but <Hl>cannot represent most decimal fractions exactly</Hl>. The decimal 0.1 stored as a FLOAT is actually stored as the closest binary approximation: 0.1000000000000000055511151231257827021181583404541015625. Calculations compound these tiny errors into visible discrepancies.</P>

      <CodeBlock
        label="Why FLOAT is wrong for money — always"
        code={`-- FLOAT rounding error demonstration
-- Store ₹10.50 as FLOAT and multiply:
SELECT 10.50::FLOAT * 1000000  -- might give 10499999.999... instead of 10500000

-- In a payment system processing 1 million ₹10.50 transactions:
-- FLOAT total: ₹10,499,999.99 (₹0.01 short — regulatory violation)
-- DECIMAL total: ₹10,500,000.00 (exactly correct)

-- The rule is absolute: NEVER store money as FLOAT.
-- Always use DECIMAL(precision, 2) for any monetary value.`}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Text Types — VARCHAR, CHAR, and TEXT" />

      <P>Text types store strings of characters. The choice between them affects storage efficiency, performance, and what operations are available.</P>

      <TypeCard
        type="VARCHAR(n)"
        color="#10b981"
        aliases="CHARACTER VARYING(n)"
        storage="Actual length + 1-4 bytes overhead"
        range="Up to n characters (max 65,535 in MySQL, 10,485,760 in PostgreSQL)"
        use="Names, emails, codes, URLs, any variable-length text with a known max"
        avoid="Text longer than ~10,000 chars (use TEXT), fixed-length codes (use CHAR)"
      />

      <TypeCard
        type="CHAR(n)"
        color="#10b981"
        aliases="CHARACTER(n)"
        storage="Always exactly n bytes (space-padded)"
        range="Fixed n characters"
        use="Fixed-length codes: country codes (CHAR(2)), currency codes (CHAR(3)), postal codes"
        avoid="Variable-length data — wastes space with padding"
      />

      <TypeCard
        type="TEXT"
        color="#10b981"
        aliases="CLOB (Oracle/MySQL)"
        storage="Actual length + small overhead"
        range="Unlimited (PostgreSQL), 65,535 bytes (MySQL TEXT), 4GB (MySQL LONGTEXT)"
        use="Long descriptions, article content, JSON strings, logs"
        avoid="Short fields where VARCHAR(n) communicates the expected max length"
      />

      <H>VARCHAR vs TEXT — practical guidance</H>
      <P>In PostgreSQL, VARCHAR and TEXT have identical performance — TEXT is not slower than VARCHAR. The difference is documentation: VARCHAR(100) tells any developer that this column should never exceed 100 characters, which acts as a soft constraint and communicates intent. TEXT has no upper bound. Use VARCHAR(n) when you have a reasonable maximum, TEXT when the length is genuinely unbounded (product descriptions, user reviews, log entries).</P>

      <P>In MySQL, TEXT types are stored differently from VARCHAR — they cannot be fully indexed without a prefix and have different row-format implications. For MySQL, prefer VARCHAR(255) or VARCHAR(1000) over TEXT whenever a reasonable maximum exists.</P>

      <SQLPlayground
        initialQuery={`-- See text column types in FreshMart
SELECT
  column_name,
  data_type,
  character_maximum_length
FROM information_schema.columns
WHERE table_name IN ('customers', 'products')
  AND data_type IN ('character varying', 'text', 'character')
ORDER BY table_name, ordinal_position;`}
        height={150}
        showSchema={false}
      />

      <H>String storage and collation</H>
      <P>Every text column has a <Hl>collation</Hl> — a set of rules for comparing and sorting strings. Collation controls case sensitivity (is 'A' = 'a'?), accent sensitivity (is 'é' = 'e'?), and sort order. In PostgreSQL the default collation is determined at database creation. In MySQL the default is often utf8mb4_general_ci (case-insensitive). Mismatched collations between joined tables can cause join failures or incorrect results — a subtle bug that is hard to diagnose.</P>

      <CodeBlock
        label="Choosing VARCHAR length — FreshMart column design rationale"
        code={`-- Why each column has the length it has:
first_name  VARCHAR(100)  -- longest Indian name + margin
last_name   VARCHAR(100)  -- same
email       VARCHAR(255)  -- RFC 5321 maximum email length
phone       VARCHAR(20)   -- country code + number + separators
city        VARCHAR(100)  -- longest city name with margin
pincode     VARCHAR(10)   -- 6-digit Indian pincode + future
product_name VARCHAR(200) -- long descriptive product names
store_name  VARCHAR(200)  -- full store name with location

-- The principle: VARCHAR(n) where n is the realistic maximum
-- Add ~20-30% headroom for edge cases
-- Do not use VARCHAR(255) for everything — it hides intent`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Date and Time Types — DATE, TIME, TIMESTAMP" />

      <P>Date and time types are among the most misused in SQL. Choosing the wrong one causes subtle bugs that only appear when edge cases hit — daylight saving time transitions, year boundaries, timezone changes.</P>

      <TypeCard
        type="DATE"
        color="#f97316"
        aliases="(standard across databases)"
        storage="4 bytes"
        range="4713 BC to 5874897 AD (PostgreSQL)"
        use="Birth dates, order dates, hire dates, any calendar day without time"
        avoid="Anything that needs time of day — use TIMESTAMP"
      />

      <TypeCard
        type="TIME"
        color="#f97316"
        aliases="TIME WITHOUT TIME ZONE"
        storage="8 bytes"
        range="00:00:00 to 24:00:00"
        use="Store opening hours, scheduled times without a date"
        avoid="Most business uses — TIME alone without a date is rarely useful"
      />

      <TypeCard
        type="TIMESTAMP"
        color="#f97316"
        aliases="DATETIME (MySQL)"
        storage="8 bytes"
        range="4713 BC to 294276 AD (PostgreSQL)"
        use="Created_at, updated_at, event timestamps, log entries — any moment in time"
        avoid="When only the date matters — use DATE to avoid timezone confusion"
      />

      <TypeCard
        type="TIMESTAMPTZ"
        color="#f97316"
        aliases="TIMESTAMP WITH TIME ZONE"
        storage="8 bytes"
        range="Same as TIMESTAMP"
        use="All production timestamps where users are in multiple timezones"
        avoid="Single-timezone applications where TIMESTAMP is simpler"
      />

      <H>DATE vs TIMESTAMP — the most important choice</H>

      <P>Use <Hl>DATE</Hl> when only the calendar day matters and time is irrelevant. Order dates, birth dates, hire dates, expiry dates — these are pure dates. Using TIMESTAMP for these adds unnecessary complexity and opens timezone pitfalls.</P>

      <P>Use <Hl>TIMESTAMP WITH TIME ZONE</Hl> (TIMESTAMPTZ) for any event that happens at a specific moment — when a user logged in, when a payment was made, when a notification was sent. TIMESTAMPTZ stores the moment in UTC and converts to local time on display. Without time zone, timestamps from different cities are ambiguous — 14:30:00 in Bangalore and 14:30:00 in New York are completely different moments.</P>

      <SQLPlayground
        initialQuery={`-- Working with dates in FreshMart
SELECT
  order_id,
  order_date,
  delivery_date,
  -- Extract parts of a date
  EXTRACT(YEAR  FROM order_date)   AS order_year,
  EXTRACT(MONTH FROM order_date)   AS order_month,
  EXTRACT(DOW   FROM order_date)   AS day_of_week,  -- 0=Sunday
  -- Date arithmetic
  delivery_date - order_date       AS days_to_deliver,
  -- Current date functions
  CURRENT_DATE                     AS today,
  CURRENT_DATE - order_date        AS days_since_order
FROM orders
WHERE delivery_date IS NOT NULL
ORDER BY order_date DESC
LIMIT 8;`}
        height={230}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Date formatting and extraction
SELECT
  order_id,
  order_date,
  -- Format as readable string (PostgreSQL)
  TO_CHAR(order_date, 'DD Mon YYYY')          AS formatted_date,
  TO_CHAR(order_date, 'Month YYYY')           AS month_label,
  -- First day of the month
  DATE_TRUNC('month', order_date)             AS month_start,
  -- Days until end of month
  (DATE_TRUNC('month', order_date)
   + INTERVAL '1 month' - INTERVAL '1 day')
  - order_date                               AS days_left_in_month
FROM orders
ORDER BY order_date DESC
LIMIT 8;`}
        height={220}
        showSchema={false}
      />

      <H>INTERVAL — storing durations</H>

      <P>INTERVAL stores a duration rather than a point in time. It is used in date arithmetic for adding or subtracting time periods.</P>

      <CodeBlock
        label="INTERVAL in date arithmetic"
        code={`-- Add one month to a date
order_date + INTERVAL '1 month'

-- Subtract 30 days
CURRENT_DATE - INTERVAL '30 days'

-- Add 2 hours 30 minutes to a timestamp
created_at + INTERVAL '2 hours 30 minutes'

-- Find orders in the last 7 days
WHERE order_date >= CURRENT_DATE - INTERVAL '7 days'

-- MySQL equivalent:
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Boolean Type — TRUE, FALSE, and NULL" />

      <P>Boolean columns store true/false values. In PostgreSQL, BOOLEAN is a first-class type. In MySQL, it is stored as TINYINT(1) — 1 for true, 0 for false. Both support the same logical operations.</P>

      <TypeCard
        type="BOOLEAN"
        color="#8b5cf6"
        aliases="BOOL, TINYINT(1) in MySQL"
        storage="1 byte"
        range="TRUE, FALSE, or NULL"
        use="Flags: in_stock, is_active, is_deleted, is_verified, is_paid"
        avoid="Multi-state fields — use VARCHAR or ENUM for status columns"
      />

      <SQLPlayground
        initialQuery={`-- Boolean operations in SQL
SELECT
  product_name,
  in_stock,
  -- Boolean in WHERE
  CASE WHEN in_stock THEN 'Available' ELSE 'Unavailable' END  AS availability,
  -- Arithmetic with boolean (TRUE = 1, FALSE = 0)
  in_stock::INTEGER                                           AS stock_as_int
FROM products
ORDER BY in_stock DESC, product_name;`}
        height={155}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Count boolean values — how many in stock vs out of stock?
SELECT
  COUNT(*)                                   AS total_products,
  SUM(CASE WHEN in_stock THEN 1 ELSE 0 END)  AS in_stock_count,
  SUM(CASE WHEN NOT in_stock THEN 1 ELSE 0 END) AS out_of_stock_count,
  -- Alternative: cast boolean to integer
  SUM(in_stock::INTEGER)                     AS in_stock_alt
FROM products;`}
        height={145}
        showSchema={false}
      />

      <Callout type="info">
        Boolean columns should be used for true binary flags — columns that are definitively either true or false with no other states. For anything with multiple possible states (order_status, loyalty_tier, payment_method), use VARCHAR with a CHECK constraint or an ENUM type. A boolean is_delivered column becomes wrong the moment you need to distinguish between "delivered," "partially delivered," and "delivery failed."
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="CAST and Type Conversion" />

      <P>Explicit type conversion is done with the <Hl>CAST</Hl> function or the PostgreSQL shorthand <Hl>::</Hl> operator. This is essential when you need to convert between types in calculations, comparisons, or output formatting.</P>

      <CodeBlock
        label="CAST syntax"
        code={`-- Standard SQL syntax (works everywhere):
CAST(expression AS target_type)

-- PostgreSQL shorthand (:: operator):
expression::target_type

-- Examples:
CAST('2024-01-15' AS DATE)
CAST(unit_price AS INTEGER)
CAST(customer_id AS VARCHAR)
CAST(total_amount AS DECIMAL(10,2))

-- PostgreSQL shorthand:
'2024-01-15'::DATE
unit_price::INTEGER
customer_id::VARCHAR
3.14159::NUMERIC(5,2)  -- rounds to 3.14`}
      />

      <H>Common CAST use cases</H>

      <SQLPlayground
        initialQuery={`-- CAST for safe division (force decimal result)
SELECT
  product_name,
  unit_price,
  cost_price,
  -- Integer division (wrong in databases with integer columns):
  -- (unit_price - cost_price) / unit_price
  -- Decimal division (always correct):
  ROUND(
    CAST(unit_price - cost_price AS DECIMAL) / unit_price * 100
  , 1)  AS margin_pct
FROM products
ORDER BY margin_pct DESC
LIMIT 6;`}
        height={175}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CAST for string formatting and concatenation
SELECT
  order_id,
  customer_id,
  order_date,
  total_amount,
  -- Concatenate mixed types — must CAST to text first
  'Order #' || CAST(order_id AS VARCHAR)
  || ' — ₹' || CAST(total_amount AS VARCHAR)   AS order_summary,
  -- Format date as string
  TO_CHAR(order_date, 'DD/MM/YYYY')             AS formatted_date
FROM orders
ORDER BY order_date DESC
LIMIT 6;`}
        height={185}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- CAST for date extraction
SELECT
  order_date,
  EXTRACT(YEAR FROM order_date)                    AS year,
  EXTRACT(MONTH FROM order_date)                   AS month,
  -- Cast date to text for grouping labels
  CAST(EXTRACT(YEAR FROM order_date) AS VARCHAR)
  || '-Q'
  || CAST(CEIL(EXTRACT(MONTH FROM order_date)/3.0) AS VARCHAR)
                                                   AS quarter_label
FROM orders
ORDER BY order_date DESC
LIMIT 8;`}
        height={185}
        showSchema={false}
      />

      <H>Implicit vs explicit conversion</H>
      <P>Some databases silently convert between compatible types — this is called <Hl>implicit conversion</Hl>. MySQL is more permissive about implicit conversion than PostgreSQL. Relying on implicit conversion creates code that works on one database but fails on another. Always use explicit CAST when you need a type conversion — it makes the intent clear and ensures portability.</P>

      <CodeBlock
        label="Implicit vs explicit conversion"
        code={`-- MySQL: implicit conversion works (but avoid relying on it)
WHERE order_id = '1007'   -- MySQL converts '1007' to integer silently
WHERE total_amount = '850' -- MySQL converts '850' to decimal

-- PostgreSQL: explicit conversion required
WHERE order_id = 1007          -- correct — integer literal
WHERE order_id = CAST('1007' AS INTEGER)  -- explicit cast
WHERE total_amount = 850.00    -- correct — decimal literal

-- Always write queries that are explicit about types:
-- Use integer literals for integer columns
-- Use decimal literals for decimal columns
-- Use quoted ISO dates for date columns`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Special Types — JSON, UUID, and Arrays" />

      <P>Modern databases support types beyond the basic five families. These are used in specific scenarios at production companies.</P>

      <H>JSON and JSONB — storing structured documents</H>

      <P>PostgreSQL supports JSON (text-stored JSON) and JSONB (binary-stored JSON, indexable and faster to query). JSONB is almost always preferred. MySQL supports a JSON type since version 5.7.</P>

      <CodeBlock
        label="JSONB in PostgreSQL — real use cases"
        code={`-- Store product attributes with varying structure
-- Electronics have 'wattage', food has 'expiry_days' — no fixed schema
CREATE TABLE products (
  product_id   INTEGER PRIMARY KEY,
  product_name VARCHAR(200),
  attributes   JSONB    -- flexible key-value storage
);

-- Insert
INSERT INTO products VALUES (
  1, 'Smart TV 55"',
  '{"wattage": 120, "resolution": "4K", "ports": ["HDMI", "USB"]}'
);

-- Query JSONB
SELECT product_name,
  attributes->>'resolution'          AS resolution,
  attributes->'ports'                AS ports_array,
  attributes->'ports'->>0           AS first_port
FROM products
WHERE attributes->>'resolution' = '4K';

-- Index for fast JSONB queries
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);`}
      />

      <P>Razorpay uses JSONB to store payment metadata — each payment instrument (UPI, card, netbanking) has a completely different structure of additional fields. JSONB lets them store all of it in one column without creating dozens of nullable columns. Zomato uses JSONB for restaurant menu data — each item has different option structures.</P>

      <H>UUID — universally unique identifiers</H>

      <CodeBlock
        label="UUID as primary key"
        code={`-- UUID: 128-bit random identifier, globally unique
-- Format: 550e8400-e29b-41d4-a716-446655440000

CREATE TABLE events (
  event_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- When to use UUID vs INTEGER primary key:
-- UUID: distributed systems, external-facing IDs, merged databases
-- INTEGER: internal tables, simple applications, better join performance

-- FreshMart uses INTEGER PKs — single database, internal IDs
-- Razorpay uses UUID for payment IDs shared with merchants — must be globally unique`}
      />

      <H>Arrays — storing multiple values in one column</H>

      <CodeBlock
        label="PostgreSQL ARRAY type"
        code={`-- Store a list of tags in one column (PostgreSQL only)
CREATE TABLE products (
  product_id  INTEGER PRIMARY KEY,
  tags        TEXT[]   -- array of text values
);

INSERT INTO products VALUES (1, ARRAY['organic', 'dairy-free', 'vegan']);

-- Query array columns
SELECT * FROM products WHERE 'organic' = ANY(tags);
SELECT * FROM products WHERE tags @> ARRAY['organic', 'vegan'];

-- When arrays are appropriate:
-- Small, fixed-type lists that are always fetched with the parent row
-- Tags, categories, phone numbers for one contact

-- When NOT to use arrays:
-- When you need to query individual elements frequently — normalise instead
-- When elements have their own attributes — they deserve a separate table`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Choosing the Right Type — The Decision Framework" />

      <P>When designing a column or reviewing a schema, run through these questions in order.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '20px 0 32px' }}>
        {[
          { n: '01', q: 'Is it a number?', a: 'Is it always a whole number? → INTEGER or BIGINT. Does it have decimal places? Is it money? → DECIMAL(p,s). Is it a scientific measurement? → FLOAT. Is it a boolean flag? → BOOLEAN.' },
          { n: '02', q: 'Is it text?', a: 'Do you know the maximum length? → VARCHAR(n). Is the length truly unbounded (descriptions, articles)? → TEXT. Is it always exactly the same length (country code, currency code)? → CHAR(n).' },
          { n: '03', q: 'Is it a date or time?', a: 'Date only, no time? → DATE. Exact moment in time, single timezone? → TIMESTAMP. Exact moment, multiple timezones? → TIMESTAMPTZ. Duration/interval? → INTERVAL.' },
          { n: '04', q: 'Is it an identifier?', a: 'Internal ID, single database? → INTEGER with AUTO_INCREMENT or SERIAL. Distributed system or external-facing? → UUID. Fixed-format code (PAN, GST)? → CHAR(n) or VARCHAR(n) with CHECK constraint.' },
          { n: '05', q: 'Is it structured data with variable schema?', a: 'Attributes that differ per row? → JSONB (PostgreSQL) or JSON (MySQL). Small fixed list? → ARRAY (PostgreSQL) or separate table. Always separate table when elements need their own attributes or are queried independently.' },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: i === arr.length - 1 ? 0 : 20 }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{step.n}</div>
              {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 8 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{step.q}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{step.a}</div>
            </div>
          </div>
        ))}
      </div>

      <H>FreshMart schema — every type explained</H>

      <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Column', 'Type chosen', 'Why this type'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['customer_id', 'INTEGER', 'Whole number, internal ID, will not exceed 2 billion customers'],
              ['email', 'VARCHAR(255)', 'RFC 5321 max email length is 254 chars — 255 gives one byte headroom'],
              ['phone', 'VARCHAR(20)', 'Must store leading zeros and country codes — NOT an integer'],
              ['joined_date', 'DATE', 'Only the calendar day matters — no time component needed'],
              ['loyalty_tier', 'VARCHAR(20)', 'Short text with a finite set of values — CHECK constraint enforces allowed values'],
              ['unit_price', 'DECIMAL(10,2)', 'Money — must be exact. 10 total digits, 2 decimal places (paise precision)'],
              ['in_stock', 'BOOLEAN', 'Binary flag — either in stock or not. No other states needed'],
              ['order_date', 'DATE', 'Calendar day of the order — no time needed'],
              ['delivery_date', 'DATE', 'Calendar day of delivery — nullable (NULL = not yet delivered)'],
              ['total_amount', 'DECIMAL(10,2)', 'Money — same reasoning as unit_price'],
              ['salary', 'DECIMAL(10,2)', 'Money — monthly salary in rupees with paise precision'],
              ['monthly_target', 'DECIMAL(12,2)', 'Larger amounts (store targets) — wider precision than individual prices'],
            ].map(([col, type, why], i) => (
              <tr key={col} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{col}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00e676', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{type}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Type Mismatches — Silent Bugs in Production" />

      <P>Type mismatches between columns and values in WHERE conditions, JOINs, and calculations are a major source of production bugs. They often do not cause errors — they cause silent wrong results or performance issues.</P>

      <H>Phone number stored as INTEGER — leading zero lost</H>

      <CodeBlock
        label="The phone number type mistake"
        code={`-- WRONG: phone stored as INTEGER
CREATE TABLE customers (phone BIGINT);
INSERT INTO customers VALUES (09876543210);  -- stored as 9876543210
-- Leading zero is gone. Can never be recovered.

-- RIGHT: phone stored as VARCHAR
CREATE TABLE customers (phone VARCHAR(20));
INSERT INTO customers VALUES ('09876543210');  -- stored correctly
INSERT INTO customers VALUES ('+91-9876543210');  -- also works

-- The rule: store phone numbers, account numbers, PAN, Aadhaar,
-- and any "number" that has leading zeros or non-numeric characters
-- as VARCHAR, never as INTEGER`}
      />

      <H>Date stored as VARCHAR — sorting breaks</H>

      <CodeBlock
        label="The VARCHAR date mistake"
        code={`-- WRONG: date stored as VARCHAR
-- '2024-01-15' sorts correctly (ISO format)
-- But '15/01/2024' sorts wrong — '15' comes before '9' alphabetically
SELECT * FROM orders ORDER BY order_date;
-- '01/01/2024', '15/01/2024', '2/01/2024', '20/01/2024' — WRONG ORDER

-- RIGHT: always store dates as DATE type
-- Database handles sorting, arithmetic, extraction correctly
-- CURRENT_DATE - order_date works, VARCHAR - VARCHAR does not

-- The rule: any calendar date should be a DATE column, never VARCHAR`}
      />

      <H>JOIN on mismatched types — implicit cast or index miss</H>

      <CodeBlock
        label="JOIN type mismatch"
        code={`-- WRONG: joining INTEGER customer_id to VARCHAR customer_id
-- customers.customer_id = INTEGER
-- orders.customer_id = VARCHAR  (design error)

SELECT * FROM customers c
JOIN orders o ON c.customer_id = o.customer_id;
-- PostgreSQL: ERROR — cannot compare integer and varchar
-- MySQL: implicit cast, but cannot use index on either column
-- Result: full table scan, extremely slow on large tables

-- RIGHT: join columns must have the same type
-- Always make FK columns the same type as the PK they reference
-- customer_id INTEGER in customers → customer_id INTEGER in orders`}
      />

      <SQLPlayground
        initialQuery={`-- Verify FreshMart's type consistency in joins
-- customer_id should be the same type in customers and orders
SELECT
  c.column_name AS customers_col,
  c.data_type   AS customers_type,
  o.column_name AS orders_col,
  o.data_type   AS orders_type,
  CASE WHEN c.data_type = o.data_type
    THEN 'MATCH ✓'
    ELSE 'MISMATCH ✗'
  END           AS type_status
FROM information_schema.columns c
JOIN information_schema.columns o
  ON c.column_name = o.column_name
WHERE c.table_name = 'customers'
  AND o.table_name = 'orders'
  AND c.column_name IN ('customer_id');`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at a Bangalore fintech startup. A senior engineer asks you to review the schema for a new loan application table before it goes to production. You find three type-related issues that would have caused production bugs.</P>

      <TimeBlock time="10:00 AM" label="Schema review request arrives">
        The schema dump arrives in Slack. You review it column by column against the type decision framework.
      </TimeBlock>

      <CodeBlock
        label="The schema with issues (adapted example)"
        code={`-- Problematic schema (before your review):
CREATE TABLE loan_applications (
  application_id  VARCHAR(20),      -- Issue 1
  applicant_name  VARCHAR(50),
  pan_number      CHAR(10),
  annual_income   FLOAT,            -- Issue 2
  application_date VARCHAR(10),     -- Issue 3
  phone_number    BIGINT,           -- Issue 4
  credit_score    INTEGER,
  loan_amount     FLOAT,            -- Issue 5
  is_approved     INTEGER           -- Issue 6
);`}
      />

      <TimeBlock time="10:20 AM" label="You identify six issues">
        You document each issue with the business impact and the correct fix.
      </TimeBlock>

      <CodeBlock
        label="Your corrected schema with rationale"
        code={`CREATE TABLE loan_applications (
  -- Issue 1: application_id should be SERIAL or UUID
  -- VARCHAR(20) requires manual ID generation and risks duplicates
  application_id   SERIAL PRIMARY KEY,

  -- applicant_name: VARCHAR(50) too short for some Indian names with titles
  applicant_name   VARCHAR(200) NOT NULL,

  -- PAN: CHAR(10) is correct — PAN is always exactly 10 chars (ABCDE1234F)
  pan_number       CHAR(10) UNIQUE NOT NULL,

  -- Issue 2: annual_income as FLOAT causes rounding errors in loan calculations
  -- ₹5,00,000 stored as FLOAT might compute to ₹4,99,999.999...
  annual_income    DECIMAL(12, 2) NOT NULL,

  -- Issue 3: application_date as VARCHAR loses date arithmetic and sorting
  -- '15/01/2024' cannot be subtracted from CURRENT_DATE
  application_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Issue 4: phone_number as BIGINT loses leading zeros and +91 prefix
  phone_number     VARCHAR(20) NOT NULL,

  credit_score     SMALLINT NOT NULL CHECK (credit_score BETWEEN 300 AND 900),

  -- Issue 5: loan_amount as FLOAT — same as income, must be exact
  loan_amount      DECIMAL(14, 2) NOT NULL,

  -- Issue 6: is_approved as INTEGER instead of BOOLEAN
  -- Also: 3-state approval (pending/approved/rejected) needs VARCHAR
  approval_status  VARCHAR(20) NOT NULL DEFAULT 'Pending'
                   CHECK (approval_status IN ('Pending','Approved','Rejected')),

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
      />

      <TimeBlock time="11:00 AM" label="Review approved, schema fixed before production">
        The senior engineer reviews your comments and approves all six changes. The FLOAT-to-DECIMAL change alone prevents a potential regulatory issue — RBI audit reports require exact loan amounts, and FLOAT rounding in amortisation calculations would have caused discrepancies in compliance reports.
      </TimeBlock>

      <ProTip>
        Schema reviews for type correctness are one of the highest-value activities in backend engineering. A wrong type chosen at table creation is extremely costly to change in production — ALTER TABLE on a column type on a table with millions of rows locks the table, requires extensive data migration, and risks data loss. Getting it right before the first INSERT is worth hours of careful review.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between DECIMAL and FLOAT and which should you use for money?">
        <p style={{ margin: '0 0 14px' }}>DECIMAL (also called NUMERIC) stores numbers as exact decimal digits — DECIMAL(10,2) stores exactly 10 significant digits with exactly 2 after the decimal point. Arithmetic on DECIMAL values produces exact results. 0.1 + 0.2 in DECIMAL is exactly 0.3. FLOAT stores numbers in binary floating-point format — the IEEE 754 standard used by all modern CPUs. Binary floating-point cannot represent most decimal fractions exactly. 0.1 stored as FLOAT is actually 0.1000000000000000055511151231... — a tiny error that compounds through arithmetic.</p>
        <p style={{ margin: '0 0 14px' }}>For money, FLOAT is never acceptable. Financial calculations require exact decimal arithmetic — ₹10.50 × 1,000,000 must be exactly ₹10,500,000.00, not ₹10,499,999.99 due to floating-point approximation. In a payment system processing millions of transactions, FLOAT errors accumulate into accounting discrepancies that violate regulatory requirements. The RBI and SEBI require exact financial records. FLOAT violates this requirement at scale.</p>
        <p style={{ margin: 0 }}>Always use DECIMAL for monetary values, prices, tax rates, and any financial calculation. The typical choices: DECIMAL(10,2) for amounts in rupees (up to ₹99,999,999.99), DECIMAL(5,4) for tax rates and percentages stored as decimals (0.1800 for 18% GST), DECIMAL(15,2) for very large institutional amounts. Use FLOAT only for scientific measurements, machine learning weights, and statistical values where exact decimal representation is neither possible nor required — the measurement itself has inherent imprecision that exceeds the floating-point error.</p>
      </IQ>

      <IQ q="When should you use VARCHAR vs TEXT for a text column?">
        <p style={{ margin: '0 0 14px' }}>The functional difference between VARCHAR and TEXT varies by database. In PostgreSQL, VARCHAR and TEXT have identical storage and performance — there is no technical advantage to TEXT over VARCHAR or vice versa. The choice is entirely about documentation and constraints: VARCHAR(n) enforces a maximum length limit and communicates to any developer that the field should not exceed n characters. TEXT has no upper bound and makes no statement about expected length.</p>
        <p style={{ margin: '0 0 14px' }}>In MySQL, the distinction is more significant. VARCHAR(n) is stored inline with the row for values up to 65,535 bytes. TEXT types (TEXT, MEDIUMTEXT, LONGTEXT) are stored off-row as a reference, have different indexing limitations (cannot be fully indexed without a prefix), and have different performance characteristics for large values. For MySQL, prefer VARCHAR(n) for all fields where a reasonable maximum exists, and TEXT only for genuinely long content.</p>
        <p style={{ margin: 0 }}>Professional guidance: use VARCHAR(n) whenever you can define a meaningful maximum — email VARCHAR(255), first_name VARCHAR(100), city VARCHAR(100), product_name VARCHAR(200). The n value should be based on the realistic maximum for the domain, not defaulted to 255 for everything. Use TEXT for genuinely unbounded fields: product descriptions, user reviews, blog content, log messages, any field where the author might reasonably write hundreds or thousands of words. The VARCHAR(n) limit serves as a soft validation and a schema communication tool — it tells the next developer what to expect from this column.</p>
      </IQ>

      <IQ q="Why should phone numbers be stored as VARCHAR rather than INTEGER?">
        <p style={{ margin: '0 0 14px' }}>Phone numbers are not numeric values in the mathematical sense — they are identifiers that happen to use digits. Storing them as INTEGER or BIGINT causes three problems. First, leading zeros are lost. Indian mobile numbers start with 0 (when dialled as local calls) or with a country code — 09876543210 stored as BIGINT becomes 9876543210, irreversibly losing the leading zero. Stored data can never be recovered to the original format.</p>
        <p style={{ margin: '0 0 14px' }}>Second, non-numeric characters cannot be stored. International format phone numbers include country codes (+91), separators (-), and sometimes extensions (x204). BIGINT accepts none of these — any format beyond pure digits requires VARCHAR. Third, no arithmetic is ever performed on phone numbers — you never add two phone numbers together or calculate the average phone number. The entire reason to choose a numeric type is to enable arithmetic and range operations. Phone numbers need neither.</p>
        <p style={{ margin: 0 }}>The correct type is VARCHAR(20) — long enough for any international format (+1-800-555-0199 is 15 chars, with headroom). This applies to any "number" that is really an identifier: PAN card (ABCDE1234F — mixed alphanumeric), Aadhaar number (12 digits, no arithmetic), GST number, IFSC code, postal codes (some have letters — UK postcodes SW1A 1AA). The rule: if you would never multiply it, average it, or compare it with greater-than, store it as VARCHAR.</p>
      </IQ>

      <IQ q="What is the difference between TIMESTAMP and TIMESTAMPTZ and which should you use?">
        <p style={{ margin: '0 0 14px' }}>TIMESTAMP (TIMESTAMP WITHOUT TIME ZONE) stores a date and time value with no timezone information attached. The value is stored and retrieved exactly as entered — 2024-01-15 14:30:00 is stored and returned as-is. The database makes no attempt to convert it. If two users in different timezones insert the "same" timestamp, they might both insert 14:30:00 but mean completely different moments in absolute time (IST vs UTC vs PST).</p>
        <p style={{ margin: '0 0 14px' }}>TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE) stores a specific moment in absolute time. The value is always stored internally as UTC. When you insert a timestamp with a timezone (or the database's configured timezone is used), it converts to UTC for storage. When you retrieve it, PostgreSQL converts from UTC to the current session's timezone. 2024-01-15 14:30:00+05:30 (IST) and 2024-01-15 09:00:00+00:00 (UTC) refer to the same moment and store identically.</p>
        <p style={{ margin: 0 }}>Use TIMESTAMPTZ for all production application timestamps — created_at, updated_at, logged_at, processed_at. Any event that "happened at a specific moment" needs TIMESTAMPTZ to be unambiguous across timezones. Use TIMESTAMP only when the time has no timezone meaning — a scheduled broadcast at 20:00 every evening regardless of timezone, a business hours definition, a recurring calendar event. Most Indian startups operate in a single timezone (IST) but use TIMESTAMPTZ anyway because it is the safer default and costs nothing extra. If you later add international users or move servers between regions, TIMESTAMP values become ambiguous while TIMESTAMPTZ remains correct.</p>
      </IQ>

      <IQ q="What is CAST and when do you need it?">
        <p style={{ margin: '0 0 14px' }}>CAST converts a value from one data type to another. The standard SQL syntax is CAST(expression AS target_type). PostgreSQL also supports the :: shorthand: expression::target_type. The conversion is explicit — you are telling the database exactly what type conversion you want, rather than relying on implicit conversion behaviour that may differ between databases.</p>
        <p style={{ margin: '0 0 14px' }}>The most important use cases for CAST: forcing decimal division when columns are integers — CAST(numerator AS DECIMAL) / denominator prevents integer truncation where 7/2 would return 3 instead of 3.5. Converting dates to strings for display — TO_CHAR or CAST(date_col AS VARCHAR) for concatenation with strings. Converting strings to dates when inserting or comparing with user input. Narrowing a type for a specific calculation — CAST(total_amount AS INTEGER) to drop paise precision when only rupees matter.</p>
        <p style={{ margin: 0 }}>When not to use CAST: do not use CAST to work around a schema design error. If you are constantly casting a phone_number column from BIGINT to VARCHAR, fix the schema — change the column to VARCHAR. CAST is for legitimate temporary type coercion in calculations and output formatting, not a permanent workaround for wrong column types. Also avoid CAST on the column side of WHERE conditions because it prevents index usage — CAST(order_id AS VARCHAR) = '1007' disables the index on order_id. Rewrite the value side instead: order_id = CAST('1007' AS INTEGER) or simply order_id = 1007.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: operator does not exist: integer = character varying — WHERE customer_id = '1007'"
        cause="Type mismatch in a WHERE condition. customer_id is an INTEGER column but you compared it to a string value '1007' (with quotes). PostgreSQL does not implicitly convert between integer and text. MySQL would silently coerce the string to an integer and succeed — which is why queries written for MySQL sometimes fail on PostgreSQL."
        fix="Remove the quotes to use the correct integer literal: WHERE customer_id = 1007. If the value comes from application code that always produces strings, cast explicitly: WHERE customer_id = CAST('1007' AS INTEGER). For the long term, ensure your application passes integer values for integer columns — use typed parameters in prepared statements, not raw string interpolation."
      />

      <Err
        msg="Financial totals are consistently off by small fractions — SUM returns 10499999.99 instead of 10500000.00"
        cause="Money is stored as FLOAT or DOUBLE instead of DECIMAL. Floating-point arithmetic cannot represent most decimal fractions exactly. Small errors (like 10.50 being stored as 10.499999...) compound across millions of rows. The SUM of one million ₹10.50 values stored as FLOAT may be ₹10,499,999.99 instead of ₹10,500,000.00 — a ₹0.01 discrepancy that causes compliance failures."
        fix="Change the column type from FLOAT to DECIMAL(precision, 2): ALTER TABLE payments ALTER COLUMN amount TYPE DECIMAL(12,2). Migrate existing data: UPDATE payments SET amount = ROUND(amount::DECIMAL, 2). Audit all financial columns across the schema and convert every FLOAT used for money. Going forward, make DECIMAL mandatory in code review for any column that stores a monetary value — reject any schema change that uses FLOAT for money."
      />

      <Err
        msg="Date sorting is wrong — '2/01/2024' sorts before '15/01/2024' in ORDER BY"
        cause="Dates are stored as VARCHAR instead of DATE. VARCHAR sorts lexicographically — character by character. '2' comes before '15' alphabetically because '2' > '1'. The correct chronological order (Jan 2 before Jan 15) matches numeric order, not alphabetical. Any non-ISO date format stored as VARCHAR will sort incorrectly."
        fix="Change the column to DATE type: ALTER TABLE orders ALTER COLUMN order_date TYPE DATE USING TO_DATE(order_date, 'DD/MM/YYYY'). The USING clause converts existing VARCHAR values to DATE during the migration. Going forward, always insert dates as ISO 8601 strings ('2024-01-15') which the database parses correctly into DATE. If input arrives in DD/MM/YYYY format from users, convert at the application layer before inserting."
      />

      <Err
        msg="VARCHAR column truncates long values silently — 'Rajasthani Papad Masala Fryums Mixed' becomes 'Rajasthani Papad Masala F'"
        cause="The VARCHAR(n) limit is too short for some values being inserted. The database is truncating values to fit the declared length — or in strict mode, rejecting the insert entirely. VARCHAR(20) for a product name column that needs to hold 35-character names will silently truncate in MySQL's non-strict mode, causing data loss that is invisible until a product search returns wrong names."
        fix="Increase the VARCHAR length: ALTER TABLE products ALTER COLUMN product_name TYPE VARCHAR(500). Review all VARCHAR lengths in your schema against the actual data: SELECT MAX(LENGTH(product_name)) FROM products — this shows the current maximum and helps you set a correct limit with headroom. Enable MySQL strict mode (STRICT_TRANS_TABLES) to turn silent truncation into an error so data loss is immediately visible."
      />

      <Err
        msg="Timezone confusion — timestamps show wrong time after server migration"
        cause="Timestamps are stored as TIMESTAMP WITHOUT TIME ZONE. When the database server was in one timezone (Asia/Kolkata), values inserted at 14:30 IST were stored as 14:30 with no timezone. After migrating the server to UTC, the same values are displayed as 14:30 UTC — 5.5 hours ahead of the original time. All historical timestamps are now wrong relative to their actual creation time."
        fix="Going forward, use TIMESTAMPTZ for all event timestamps: ALTER TABLE events ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'Asia/Kolkata'. This converts the stored 14:30 to 09:00 UTC (the actual UTC equivalent of 14:30 IST), which displays as 14:30 when the session timezone is set to IST and as 09:00 when set to UTC — always representing the correct moment. For existing data, determine what timezone the values were originally entered in and migrate accordingly."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Using information_schema, write a query that shows all columns in the FreshMart 'products' table with their column name, data type, whether they allow NULL, and their character maximum length (NULL for non-text columns). Then write a second query that finds any product where unit_price cast to INTEGER differs from unit_price — which would indicate products with sub-rupee pricing that would be lost in integer conversion."
        hint="Query 1: SELECT column_name, data_type, is_nullable, character_maximum_length FROM information_schema.columns WHERE table_name = 'products' ORDER BY ordinal_position. Query 2: SELECT product_name, unit_price FROM products WHERE CAST(unit_price AS INTEGER) != unit_price."
        answer={`-- Query 1: Products table schema inspection
SELECT
  column_name,
  data_type,
  is_nullable,
  character_maximum_length,
  numeric_precision,
  numeric_scale
FROM information_schema.columns
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- Query 2: Products with sub-rupee pricing (paise component)
-- If CAST to INTEGER matches, the price is a whole number of rupees
-- If it doesn't match, there are paise in the price
SELECT
  product_name,
  unit_price,
  CAST(unit_price AS INTEGER)            AS rupees_only,
  unit_price - CAST(unit_price AS INTEGER) AS paise_component
FROM products
WHERE CAST(unit_price AS INTEGER) != unit_price
ORDER BY paise_component DESC;`}
        explanation="Query 1 uses information_schema.columns — the system view that holds metadata about every column in every table. numeric_precision and numeric_scale reveal the DECIMAL(10,2) definitions. character_maximum_length shows VARCHAR lengths (NULL for non-text types). is_nullable shows which columns allow NULL. Query 2 demonstrates CAST in a practical audit context: comparing the original DECIMAL value to its INTEGER cast reveals any prices that would lose data if the column type were changed to INTEGER. The paise_component column shows exactly how much sub-rupee precision exists. This is the type of schema audit query a DBA runs before any column type migration."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Data types are not just technical details — wrong choices cause silent bugs (FLOAT money rounding), data loss (INTEGER phone numbers), and schema migrations that lock production tables for hours.',
          'Never store money as FLOAT or DOUBLE. Always use DECIMAL(p,2). Floating-point cannot represent decimal fractions exactly, and errors compound across millions of transactions into regulatory violations.',
          'INTEGER for whole-number counts and IDs. BIGINT when values might exceed 2.1 billion. DECIMAL for any number with decimal precision. FLOAT only for scientific measurements with inherent imprecision.',
          'VARCHAR(n) for variable-length text with a known maximum. CHAR(n) for fixed-length codes (country codes, currency codes, PAN). TEXT for unbounded content (descriptions, articles).',
          'Phone numbers, PAN, Aadhaar, IFSC, postal codes — store as VARCHAR, never INTEGER. They have leading zeros, non-numeric characters, and require no arithmetic.',
          'DATE for calendar days with no time component. TIMESTAMP for specific moments in a single timezone. TIMESTAMPTZ for specific moments across multiple timezones — use this for all production created_at and updated_at columns.',
          'CAST(expression AS type) or expression::type (PostgreSQL) converts between types. Put CAST on the literal side of WHERE conditions, not the column side — CAST on a column prevents index usage.',
          'BOOLEAN for binary flags (is_active, in_stock). For multi-state columns (order_status, approval_status), use VARCHAR with a CHECK constraint — not BOOLEAN.',
          'Join columns must be the same type. Joining INTEGER customer_id to VARCHAR customer_id either throws an error (PostgreSQL) or silently disables indexes (MySQL), causing full table scans.',
          'query information_schema.columns to inspect column types in any database. Always run a schema type audit before migrations and review type choices in code review before tables are created.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 18</strong>, you learn CREATE TABLE — how to define a table from scratch, set column types, add constraints, and design schemas that enforce data quality at the database level.
        </p>
        <Link href="/learn/sql/create-table" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 18 → CREATE TABLE
        </Link>
      </div>

    </LearnLayout>
  );
}