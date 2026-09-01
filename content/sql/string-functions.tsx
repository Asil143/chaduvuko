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

const FnCard = ({ fn, returns, syntax, note }: {
  fn: string; returns: string; syntax: string; note: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${C}20`, borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: C }}>{fn}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)' }}>→ {returns}</span>
    </div>
    <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)', display: 'block', marginBottom: 6 }}>{syntax}</code>
    <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{note}</p>
  </div>
);

export default function StringFunctions() {
  return (
    <LearnLayout
      title="String Functions"
      description="Every text manipulation tool — concatenation, case, length, trimming, substrings, replacement, padding, splitting, and pattern matching for real data cleaning"
      section="SQL — Module 41"
      readTime="14–18 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why String Functions Matter in Real Data" />

      <P>In an ideal world, every string column is clean, consistently formatted, and ready to query. In production, data arrives from mobile apps, web forms, CSV imports, partner APIs, and legacy systems — each with its own formatting quirks. Customer names with extra spaces, email addresses in mixed case, phone numbers formatted a dozen different ways, product codes with inconsistent separators.</P>

      <P>String functions are the tools that standardise, clean, extract, and transform text data at query time — without modifying the underlying rows. They are essential for data quality checks, display formatting, join key normalisation (so 'seattle' matches 'Seattle'), and extracting structured information from unstructured text fields.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Concatenation — Joining Strings Together" />

      <H>The || operator and CONCAT()</H>

      <CodeBlock
        label="Concatenation syntax — two approaches"
        code={`-- PostgreSQL and DuckDB: || operator (SQL standard)
'Hello' || ' ' || 'World'     -- result: 'Hello World'

-- MySQL and most databases: CONCAT() function
CONCAT('Hello', ' ', 'World') -- result: 'Hello World'

-- Both work in this playground's SQLite engine — || is standard SQL,
-- and CONCAT() was added as a built-in SQLite function in 3.44+
-- NULL propagation: NULL || 'anything' = NULL
-- CONCAT handles NULLs differently in MySQL (treats as empty string)

-- Safe concatenation with COALESCE:
COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')`}
      />

      <SQLPlayground
        initialQuery={`-- Build full names, store labels, and email displays
-- (SQLite has no LEFT() — SUBSTR(str, 1, n) does the same job)
SELECT
  first_name || ' ' || last_name                       AS full_name,
  UPPER(SUBSTR(first_name, 1, 1)) || '. ' || last_name  AS abbreviated,
  city || ', ' || state                                AS location,
  first_name || ' <' || email || '>'                  AS email_display
FROM customers
ORDER BY last_name, first_name
LIMIT 8;`}
        height={185}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CONCAT_WS: concatenate with separator — skips NULLs automatically
-- (Concat With Separator)
SELECT
  store_id,
  store_name,
  -- Build a full address, skipping NULL parts
  CONCAT_WS(', ', store_name, city, state)   AS full_address
FROM stores
ORDER BY store_id;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Case Functions — UPPER, LOWER, INITCAP" />

      <CodeBlock
        label="INITCAP — PostgreSQL / DuckDB only (no SQLite equivalent)"
        code={`-- INITCAP: Title Case — capitalises the first letter of EVERY word
INITCAP('hello world')            -- 'Hello World'
INITCAP(LOWER('MORTON SALT'))     -- 'Morton Salt'

-- Practical: normalise product names to Title Case for display
INITCAP(LOWER(product_name))      -- 'organic whole milk' → 'Organic Whole Milk'

-- SQLite has no INITCAP and no built-in multi-word title-case function.
-- The closest single-expression trick only capitalises the FIRST letter
-- of the whole string:
UPPER(SUBSTR(LOWER(x), 1, 1)) || SUBSTR(LOWER(x), 2)
-- 'ORGANIC MILK' → 'Organic milk'   (only word 1 is capitalised — not
--                                    'Organic Milk')
-- True multi-word Title Case in SQLite needs a recursive CTE or a
-- transform in the application layer, not a single SQL expression.`}
      />

      <SQLPlayground
        initialQuery={`-- Case normalisation — essential for joins and comparisons
-- SQLite has no INITCAP; the SUBSTR trick below only capitalises the
-- FIRST letter of the whole string, not each word (see note above)
SELECT
  product_name,
  UPPER(product_name)       AS upper_name,
  LOWER(product_name)       AS lower_name,
  LOWER(brand)              AS normalised_brand,
  UPPER(SUBSTR(LOWER(product_name), 1, 1)) || SUBSTR(LOWER(product_name), 2)
                             AS first_letter_cap
FROM products
ORDER BY category
LIMIT 10;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Case-insensitive join using LOWER()
-- Without LOWER: 'Seattle' != 'seattle' — join misses rows
-- With LOWER: both normalised, join works correctly
SELECT
  c.customer_id,
  c.first_name,
  c.city,
  COUNT(o.order_id)  AS order_count
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE LOWER(c.city) IN ('seattle', 'austin', 'boston')
GROUP BY c.customer_id, c.first_name, c.city
ORDER BY order_count DESC;`}
        height={200}
        showSchema={false}
      />

      <Callout type="tip">
        Always normalise case before comparing or joining on string columns. WHERE LOWER(city) = 'seattle' correctly matches 'Seattle', 'SEATTLE', and 'seattle'. Without normalisation, a single inconsistency in the data breaks the match silently — no error, just missing rows.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Length Functions — Measuring Strings" />

      <SQLPlayground
        initialQuery={`-- LENGTH / CHAR_LENGTH: number of characters
-- OCTET_LENGTH: number of bytes (differs for multi-byte UTF-8)
SELECT
  product_name,
  LENGTH(product_name)        AS char_length,
  LENGTH(TRIM(product_name))  AS trimmed_length,
  brand,
  LENGTH(brand)               AS brand_length
FROM products
ORDER BY char_length DESC
LIMIT 8;`}
        height={180}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Data quality: find suspiciously short or long values
SELECT
  customer_id,
  first_name,
  LENGTH(first_name)   AS name_len,
  email,
  LENGTH(email)        AS email_len
FROM customers
WHERE LENGTH(first_name) < 2        -- suspiciously short names
   OR LENGTH(email) < 6             -- suspiciously short emails
   OR email NOT LIKE '%@%'          -- missing @ — invalid email
ORDER BY name_len;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Trimming — Removing Whitespace and Characters" />

      <P>Leading and trailing whitespace is one of the most common data quality issues — especially in data imported from CSV files or form submissions. TRIM removes it cleanly. Untrimmed strings cause join mismatches and incorrect comparisons silently.</P>

      <CodeBlock
        label="TRIM variants"
        code={`-- TRIM: removes leading AND trailing whitespace (default)
TRIM('  hello world  ')           -- 'hello world'

-- LTRIM: removes leading whitespace only
LTRIM('  hello world  ')          -- 'hello world  '

-- RTRIM: removes trailing whitespace only
RTRIM('  hello world  ')          -- '  hello world'

-- TRIM with specific character (remove specific chars not just spaces)
TRIM('.' FROM '...hello...')      -- 'hello'
TRIM(BOTH '0' FROM '00042000')    -- '42'   (removes leading/trailing zeros)
TRIM(LEADING '0' FROM '00042000') -- '42000' (removes only leading zeros)

-- Practical: normalise before joining
WHERE LOWER(TRIM(city)) = 'seattle'`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate TRIM in action
SELECT
  '  Horizon Butter  '                       AS raw_value,
  TRIM('  Horizon Butter  ')                 AS trimmed,
  LENGTH('  Horizon Butter  ')              AS raw_length,
  LENGTH(TRIM('  Horizon Butter  '))         AS trimmed_length,
  -- Practical: trim, then capitalise the first letter (no INITCAP in SQLite)
  UPPER(SUBSTR(LOWER(TRIM(product_name)),1,1)) || SUBSTR(LOWER(TRIM(product_name)),2)
                                             AS clean_name,
  LENGTH(product_name) - LENGTH(TRIM(product_name)) AS whitespace_count
FROM products
LIMIT 6;`}
        height={185}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Data quality audit: find values with leading/trailing whitespace
SELECT
  customer_id,
  first_name,
  '>' || first_name || '<'                AS raw_with_markers,
  LENGTH(first_name) - LENGTH(TRIM(first_name)) AS extra_whitespace
FROM customers
WHERE first_name != TRIM(first_name)      -- has leading or trailing spaces
   OR last_name  != TRIM(last_name)
ORDER BY customer_id;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Substring Functions — Extracting Parts of Strings" />

      <FnCard
        fn="SUBSTRING / SUBSTR"
        returns="portion of string"
        syntax="SUBSTR(str, start_pos, length)  -- 1-indexed"
        note="Extract a portion starting at start_pos for length characters. In SQLite (this playground), a negative start_pos counts from the END of the string — SUBSTR('ST001', -3) = '001'. Standard SQL does not define this."
      />
      <FnCard
        fn="LEFT"
        returns="first N characters"
        syntax="LEFT(str, n)  -- not built into SQLite"
        note="Returns the first n characters. LEFT('Seattle', 3) = 'Sea'. Not available in this playground — use SUBSTR(str, 1, n) instead."
      />
      <FnCard
        fn="RIGHT"
        returns="last N characters"
        syntax="RIGHT(str, n)  -- not built into SQLite"
        note="Returns the last n characters. RIGHT('ST001', 3) = '001'. Not available in this playground — use SUBSTR(str, -n) instead (negative start counts from the end)."
      />
      <FnCard
        fn="SPLIT_PART"
        returns="Nth segment after splitting"
        syntax="SPLIT_PART(str, delimiter, n)  -- 1-indexed"
        note="PostgreSQL / DuckDB only. Splits by delimiter and returns the Nth segment. SPLIT_PART('a,b,c', ',', 2) = 'b'. SQLite has no equivalent — use INSTR + SUBSTR for a specific delimiter (see Part 07)."
      />

      <SQLPlayground
        initialQuery={`-- Extracting parts of store IDs and product codes
-- SQLite has no LEFT()/RIGHT() — SUBSTR(str, 1, n) and SUBSTR(str, -n)
-- do the same job (negative start counts from the end)
SELECT
  store_id,
  SUBSTR(store_id, 1, 2)                    AS prefix,
  SUBSTR(store_id, -3)                      AS store_number,
  SUBSTRING(store_id, 3)                    AS number_part,
  -- Extract first letter of each word for initials
  SUBSTR(store_name, 1, 1)                  AS first_letter,
  city
FROM stores
ORDER BY store_id;`}
        height={195}
        showSchema={true}
      />

      <CodeBlock
        label="SPLIT_PART — PostgreSQL / DuckDB only (no SQLite equivalent)"
        code={`SELECT
  email,
  SPLIT_PART(email, '@', 1)              AS username,
  SPLIT_PART(email, '@', 2)              AS domain,
  SPLIT_PART(SPLIT_PART(email, '@', 2), '.', 1) AS domain_name
FROM customers
ORDER BY domain
LIMIT 8;

-- SQLite has no SPLIT_PART. For a single, known delimiter like '@',
-- INSTR + SUBSTR reproduce the same result — see the live example
-- in Part 07 (String Search) just below.`}
      />

      <SQLPlayground
        initialQuery={`-- Build customer initials and short codes
-- SQLite: no LEFT() → SUBSTR(str, 1, n). No :: cast → CAST(x AS TEXT).
SELECT
  customer_id,
  first_name,
  last_name,
  SUBSTR(first_name, 1, 1) || SUBSTR(last_name, 1, 1)  AS initials,
  -- Short code: first 3 chars of last name + customer_id
  UPPER(SUBSTR(last_name, 1, 3)) || CAST(customer_id AS TEXT) AS short_code
FROM customers
ORDER BY last_name
LIMIT 8;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="String Search — POSITION, STRPOS, CONTAINS" />

      <CodeBlock
        label="Finding positions within strings"
        code={`-- POSITION: find where a substring first appears (1-indexed, 0 = not found)
POSITION('@' IN 'user@gmail.com')          -- 5
POSITION('xyz' IN 'user@gmail.com')        -- 0 (not found)

-- STRPOS (PostgreSQL/DuckDB): same as POSITION, different syntax
STRPOS('user@gmail.com', '@')              -- 5

-- CONTAINS (DuckDB): returns TRUE/FALSE
CONTAINS('Seattle Washington', 'Seattle')  -- true

-- Practical: extract everything before a delimiter
SUBSTRING(email, 1, POSITION('@' IN email) - 1)  -- username before @
SUBSTRING(email, POSITION('@' IN email) + 1)      -- domain after @`}
      />

      <SQLPlayground
        initialQuery={`-- Use INSTR (SQLite's equivalent of POSITION) to extract email parts
-- without SPLIT_PART — POSITION('@' IN email) is not valid SQLite syntax
SELECT
  email,
  -- Username: everything before @
  SUBSTRING(email, 1, INSTR(email, '@') - 1)   AS username,
  -- Domain: everything after @
  SUBSTRING(email, INSTR(email, '@') + 1)       AS domain,
  -- Position of the @ sign
  INSTR(email, '@')                              AS at_position
FROM customers
WHERE INSTR(email, '@') > 0   -- only valid emails with @
ORDER BY domain
LIMIT 8;`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="REPLACE and TRANSLATE — Substituting Characters" />

      <SQLPlayground
        initialQuery={`-- REPLACE: substitute all occurrences of a substring
SELECT
  product_name,
  REPLACE(product_name, ' ', '_')           AS underscored,
  REPLACE(LOWER(product_name), ' ', '-')    AS url_slug
FROM products
LIMIT 6;`}
        height={170}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Chaining REPLACE for data cleaning
SELECT
  email,
  -- Normalise: remove spaces, lowercase
  LOWER(REPLACE(email, ' ', ''))            AS clean_email,
  phone,
  -- Clean phone: remove spaces, dashes, parentheses
  REPLACE(REPLACE(REPLACE(REPLACE(
    phone, ' ', ''), '-', ''), '(', ''), ')', ''
  )                                         AS clean_phone
FROM customers
LIMIT 8;`}
        height={185}
        showSchema={false}
      />

      <CodeBlock
        label="TRANSLATE — PostgreSQL / DuckDB only (no SQLite equivalent)"
        code={`-- TRANSLATE: replace each character in the FROM set with the corresponding
-- character in the TO set — one-to-one character mapping
TRANSLATE('Hello World', 'aeiou', '12345')  -- 'H2ll4 W4rld'
-- H→H, e→2, l→l, l→l, o→4, ' '→' ', W→W, o→4, r→r, l→l, d→d

-- Remove specific characters (TO is shorter than FROM — excess chars are deleted)
TRANSLATE('ST-001/A', '-/', '')             -- 'ST001A' (removes - and /)

-- Practical: clean phone numbers (remove all non-digit characters)
TRANSLATE(phone, '()-+ ', '')              -- removes (), -, +, space
-- Much cleaner than chaining multiple REPLACE calls — but SQLite has no
-- TRANSLATE function at all, so the live example below chains REPLACE
-- instead (the technique the note above says TRANSLATE avoids)`}
      />

      <SQLPlayground
        initialQuery={`-- SQLite has no TRANSLATE — chain REPLACE calls for the same result
SELECT
  store_id,
  -- Remove all vowels from store names (illustrative)
  REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    LOWER(store_name), 'a', ''), 'e', ''), 'i', ''), 'o', ''), 'u', '')
                                                AS consonants_only,
  -- Normalise store codes: remove non-alphanumeric
  REPLACE(REPLACE(store_id, '-', ''), '/', '') AS clean_code,
  city
FROM stores
ORDER BY store_id;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Padding — LPAD and RPAD" />

      <P>Padding adds characters to reach a target length — essential for generating fixed-width codes, formatting report columns for alignment, and generating zero-padded IDs.</P>

      <CodeBlock
        label="LPAD / RPAD — PostgreSQL / DuckDB only (no SQLite equivalent)"
        code={`LPAD(customer_id::TEXT, 6, '0')      -- zero-pad to 6 digits: '000042'
RPAD(name, 25, ' ')                  -- right-pad name to 25 chars for reports

-- SQLite has no LPAD/RPAD, but printf() format specifiers cover the same
-- ground for the common cases used in this lesson:
printf('%06d', customer_id)          -- zero-padded integer: '000042'
printf('%-25s', name)                -- left-justify (RPAD) in a 25-char field
printf('%10.2f', total_amount)       -- right-justify (LPAD) a rounded float`}
      />

      <SQLPlayground
        initialQuery={`-- printf() format specifiers replace LPAD/RPAD in SQLite
SELECT
  c.customer_id,
  -- Zero-padded ID: ensure 6 digits
  printf('%06d', c.customer_id)             AS padded_id,
  first_name,
  -- Left-justify name for fixed-width report columns (RPAD equivalent)
  printf('%-25s', first_name || ' ' || last_name) || '|' AS fixed_width_name,
  -- Right-justify order amounts for alignment (LPAD equivalent) — printf
  -- rounds to 2dp and pads to width 10 in one call
  printf('%10.2f', total_amount)            AS aligned_amount
FROM customers AS c
LEFT JOIN (
  SELECT customer_id, MAX(total_amount) AS total_amount
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS o ON c.customer_id = o.customer_id
ORDER BY c.customer_id
LIMIT 8;`}
        height={225}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Generate fixed-format store codes and report headers
-- %-Ns left-justifies (RPAD) in an N-character field
SELECT
  store_id,
  -- Fixed-width store display
  '[' || printf('%-6s', store_id) || '] '
       || printf('%-12s', city) || printf('%-25s', store_name) AS report_row
FROM stores
ORDER BY store_id;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="LIKE and Pattern Matching — Flexible String Filtering" />

      <P>LIKE with wildcards is the standard SQL pattern matching tool. % matches any sequence of characters (including none). _ matches exactly one character. For more powerful patterns, SIMILAR TO (PostgreSQL) and regular expressions provide regex capabilities.</P>

      <CodeBlock
        label="LIKE wildcards"
        code={`-- % = zero or more characters
-- _ = exactly one character

'Horizon%'        -- starts with 'Horizon'
'%Butter'      -- ends with 'Butter'
'%Milk%'       -- contains 'Milk' anywhere
'_mail.com'    -- any single char then 'mail.com'
'ST__1'        -- ST, any 2 chars, then 1

-- Case sensitivity: LIKE is case-sensitive in PostgreSQL
-- Use ILIKE for case-insensitive matching (PostgreSQL/DuckDB)
WHERE product_name ILIKE '%horizon%'      -- matches 'Horizon', 'HORIZON', 'horizon'
WHERE product_name LIKE '%Horizon%'       -- matches only 'Horizon' (case-sensitive)

-- Escape literal % or _: use ESCAPE clause
WHERE notes LIKE '%50\%%' ESCAPE '\'   -- contains literal '50%'`}
      />

      <SQLPlayground
        initialQuery={`-- LIKE pattern filtering on FreshCart data
SELECT
  product_name,
  category,
  brand,
  unit_price
FROM products
WHERE product_name LIKE '%Milk%'          -- contains 'Milk'
   OR product_name LIKE 'Horizon%'           -- starts with 'Horizon'
   OR brand        LIKE '%ort%'           -- brand contains 'ort' (Morton)
ORDER BY brand, product_name;`}
        height={185}
        showSchema={true}
      />

      <Callout type="tip">
        ILIKE is PostgreSQL/DuckDB syntax and is not valid in this playground's SQLite engine. SQLite's own LIKE is already case-insensitive for ASCII letters by default (unlike PostgreSQL), so WHERE email LIKE '%GMAIL%' already matches 'gmail.com' here. Wrapping both sides in LOWER() below is not strictly required in SQLite, but it is the portable pattern that also works on databases where LIKE is case-sensitive.
      </Callout>

      <SQLPlayground
        initialQuery={`-- SQLite has no ILIKE — and its own LIKE is already case-insensitive
-- for ASCII by default (unlike PostgreSQL's case-sensitive LIKE).
-- LOWER()-wrapping both sides makes the intent explicit and stays
-- portable to databases where LIKE IS case-sensitive.
SELECT
  customer_id,
  first_name,
  last_name,
  email
FROM customers
WHERE LOWER(email) LIKE LOWER('%gmail%')      -- any case gmail addresses
   OR LOWER(first_name) LIKE LOWER('a%')      -- names starting with A (any case)
ORDER BY first_name;`}
        height={185}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Find stores in cities matching a pattern
SELECT
  store_id,
  store_name,
  city
FROM stores
WHERE city LIKE '%a%'                  -- cities containing 'a'
  AND store_id LIKE 'ST0%'            -- standard store codes
ORDER BY city;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Regular Expressions — Powerful Pattern Matching" />

      <P>Regular expressions (regex) provide full pattern matching power — validating formats, extracting structured data from free text, and finding complex patterns. PostgreSQL uses ~ for regex match and ~* for case-insensitive match. DuckDB uses REGEXP_MATCHES.</P>

      <CodeBlock
        label="Regex operators and functions"
        code={`-- PostgreSQL / DuckDB regex:
-- ~   : matches regex (case-sensitive)
-- ~*  : matches regex (case-insensitive)
-- !~  : does NOT match
-- !~* : does NOT match (case-insensitive)

-- Validate email format (simplified)
WHERE email ~ '^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'

-- Validate US mobile number: starts with 2-9 (area codes never start 0/1), 10 digits total
WHERE phone ~ '^[2-9][0-9]{9}$'

-- Validate 5-digit zip_code
WHERE zip_code ~ '^[0-9]{5}$'

-- Extract with REGEXP_EXTRACT (DuckDB)
REGEXP_EXTRACT(text, pattern, group)

-- Replace with REGEXP_REPLACE
REGEXP_REPLACE(string, pattern, replacement)
-- Replace all non-digit characters in phone:
REGEXP_REPLACE(phone, '[^0-9]', '', 'g')  -- 'g' = global (all occurrences)`}
      />

      <CodeBlock
        label="Regex validation — PostgreSQL / DuckDB only (not supported in this playground)"
        code={`-- SQLite has no built-in regex engine (no loadable extension is
-- available in the browser playground), so ~ and !~ error here
SELECT
  customer_id,
  email,
  -- Valid email: has exactly one @, domain has a dot
  CASE WHEN email ~ '^[^@]+@[^@]+\.[^@]+$'
       THEN '✓ Valid' ELSE '✗ Invalid' END AS email_status,
  phone,
  -- Valid US mobile: 10 digits starting with 2-9
  CASE WHEN REPLACE(REPLACE(phone, ' ', ''), '-', '')
            ~ '^[2-9][0-9]{9}$'
       THEN '✓ Valid' ELSE '✗ Check' END   AS phone_status
FROM customers
ORDER BY customer_id
LIMIT 8;`}
      />

      <P>Without a regex engine, GLOB is the closest thing SQLite offers — it supports character classes like <Hl>[0-9]</Hl> but has no <Hl>{'{n}'}</Hl> repeat-count syntax, so each digit position has to be spelled out.</P>

      <SQLPlayground
        initialQuery={`-- GLOB approximates a simple regex check: character classes, no {n} counts
SELECT
  customer_id,
  phone,
  REPLACE(REPLACE(REPLACE(REPLACE(
    phone, ' ', ''), '-', ''), '(', ''), ')', '')          AS digits_only,
  -- Valid US mobile: 10 digits starting with 2-9 (one [class] per digit)
  CASE WHEN REPLACE(REPLACE(REPLACE(REPLACE(
              phone, ' ', ''), '-', ''), '(', ''), ')', '')
            GLOB '[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
       THEN '✓ Valid' ELSE '✗ Check' END                    AS phone_status
FROM customers
ORDER BY customer_id
LIMIT 8;`}
        height={195}
        showSchema={true}
      />

      <CodeBlock
        label="REGEXP_REPLACE — PostgreSQL / DuckDB only (not supported in this playground)"
        code={`-- Remove everything that is not a digit
SELECT
  customer_id,
  phone                                                AS raw_phone,
  REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g') AS digits_only,
  LENGTH(REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g')) AS digit_count
FROM customers
ORDER BY customer_id
LIMIT 8;

-- SQLite equivalent: no regex, so chain REPLACE for each character to
-- strip instead (see Part 08 for the full REPLACE-chaining pattern) —
REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(phone,''), ' ', ''), '-', ''), '(', ''), ')', '')`}
      />

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="Aggregating Strings — STRING_AGG and ARRAY_AGG" />

      <P>Standard aggregates collapse values to a single number. STRING_AGG collapses multiple string values into a single concatenated string — essential for building comma-separated lists, generating labels, and creating readable summaries.</P>

      <SQLPlayground
        initialQuery={`-- GROUP_CONCAT is SQLite's STRING_AGG (PostgreSQL/DuckDB name — not
-- valid here). Syntax: GROUP_CONCAT(column, separator ORDER BY col)
SELECT
  o.order_id,
  o.total_amount,
  -- List all products in this order as a comma-separated string
  GROUP_CONCAT(p.product_name, ', ' ORDER BY p.product_name) AS products_in_order,
  COUNT(oi.item_id)                                          AS item_count
FROM orders AS o
JOIN order_items AS oi ON o.order_id   = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_status = 'Delivered'
GROUP BY o.order_id, o.total_amount
ORDER BY o.total_amount DESC
LIMIT 6;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Customer-level product preferences
-- SQLite's GROUP_CONCAT cannot combine DISTINCT with a custom separator
-- or ORDER BY in one call, so de-duplicate the categories in a CTE first,
-- then GROUP_CONCAT the already-distinct rows with separator + ORDER BY
WITH cust_categories AS (
  SELECT DISTINCT
    c.customer_id,
    c.first_name || ' ' || c.last_name  AS customer,
    c.loyalty_tier,
    p.category
  FROM customers AS c
  JOIN orders      AS o  ON c.customer_id  = o.customer_id
  JOIN order_items AS oi ON o.order_id     = oi.order_id
  JOIN products    AS p  ON oi.product_id  = p.product_id
  WHERE o.order_status = 'Delivered'
)
SELECT
  customer_id,
  customer,
  loyalty_tier,
  GROUP_CONCAT(category, ' | ' ORDER BY category) AS categories_ordered,
  COUNT(category)                                  AS category_count
FROM cust_categories
GROUP BY customer_id, customer, loyalty_tier
ORDER BY category_count DESC
LIMIT 8;`}
        height={290}
        showSchema={false}
      />

      <HR />

      {/* ── PART 13 ── */}
      <Part n="13" title="Real-World Data Cleaning Pipeline" />

      <P>In practice, string functions are combined into cleaning pipelines — multiple transformations chained together to take raw dirty data and produce standardised output ready for joining, reporting, or loading into a clean table.</P>

      <SQLPlayground
        initialQuery={`-- Complete data cleaning pipeline for customer records
-- SQLite has no INITCAP (first-letter-cap via SUBSTR instead — fine
-- here since first/last names are single words) and no :: cast or
-- LPAD (CAST(...AS TEXT) and printf() cover both)
SELECT
  customer_id,

  -- Name: trim whitespace, first-letter cap
  UPPER(SUBSTR(LOWER(TRIM(first_name)),1,1)) || SUBSTR(LOWER(TRIM(first_name)),2)
                                                    AS clean_first_name,
  UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                    AS clean_last_name,

  -- Full name formatted consistently
  UPPER(SUBSTR(LOWER(TRIM(first_name)),1,1)) || SUBSTR(LOWER(TRIM(first_name)),2) || ' '
  || UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                    AS clean_full_name,

  -- Email: lowercase, trim
  LOWER(TRIM(email))                               AS clean_email,

  -- City: first-letter cap, trim (most FreshCart cities are one word)
  UPPER(SUBSTR(LOWER(TRIM(city)),1,1)) || SUBSTR(LOWER(TRIM(city)),2)
                                                    AS clean_city,

  -- Generate a URL-safe customer slug
  LOWER(
    REPLACE(
      TRIM(first_name) || '-' || TRIM(last_name),
      ' ', '-'
    )
  ) || '-' || CAST(customer_id AS TEXT)             AS customer_slug,

  -- Zero-padded customer ID for display
  'CUST-' || printf('%06d', customer_id)           AS display_id

FROM customers
ORDER BY customer_id
LIMIT 8;`}
        height={320}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product name standardisation and code generation
-- SQLite: no INITCAP (first-letter-cap via SUBSTR — product_name is
-- multi-word here, so this only capitalises the first word, e.g.
-- 'jasmine rice' → 'Jasmine rice', not 'Jasmine Rice'), no regex
-- (REPLACE handles the one-character case), no LEFT/LPAD/:: cast
SELECT
  product_id,
  product_name,

  -- Clean and standardise (first-letter cap only — see note above)
  UPPER(SUBSTR(LOWER(TRIM(product_name)),1,1)) || SUBSTR(LOWER(TRIM(product_name)),2)
                                                    AS standard_name,

  -- URL slug for product pages: lowercase, spaces to hyphens
  LOWER(REPLACE(TRIM(product_name), ' ', '-'))     AS url_slug,

  -- Product code: category prefix + zero-padded ID
  UPPER(SUBSTR(category, 1, 3)) || '-' || printf('%04d', product_id) AS product_code,

  -- Short description: first 30 chars of name + category
  SUBSTR(product_name, 1, 30) ||
  CASE WHEN LENGTH(product_name) > 30 THEN '…' ELSE '' END AS short_name,

  category,
  brand

FROM products
ORDER BY category, product_name
LIMIT 10;`}
        height={300}
        showSchema={false}
      />

      <HR />

      {/* ── PART 14 ── */}
      <Part n="14" title="What This Looks Like at Work" />

      <P>You are a data engineer at Shopify. A partner has delivered a CSV of 50,000 seller records — names are in inconsistent case, phone numbers have various formats, city names have typos and whitespace, and emails are uncleaned. Before loading into the sellers table, you write a cleaning query that standardises every string field.</P>

      <TimeBlock time="9:00 AM" label="Raw data sample arrives">
        Sample shows: 'JASON miller', ' New York ', 'jason@GMAIL.COM', '206.555.0142' — every field needs cleaning.
      </TimeBlock>

      <TimeBlock time="9:20 AM" label="Build the cleaning pipeline">
        Chain string functions to produce a clean output SELECT that can be wrapped in INSERT INTO sellers.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Simulated seller data cleaning pipeline
-- Using FreshCart employees as stand-in for seller records
-- SQLite: no INITCAP (first-letter-cap via SUBSTR — fine for these
-- single-word fields), no :: cast or LPAD (CAST + printf instead),
-- no TO_CHAR for number formatting (printf's ',' flag adds the commas)
SELECT
  employee_id                                        AS seller_id,

  -- Name cleaning
  UPPER(SUBSTR(LOWER(TRIM(first_name)),1,1)) || SUBSTR(LOWER(TRIM(first_name)),2)
                                                      AS clean_first_name,
  UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                      AS clean_last_name,
  UPPER(SUBSTR(LOWER(TRIM(first_name)),1,1)) || SUBSTR(LOWER(TRIM(first_name)),2) || ' '
    || UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                      AS full_name,

  -- Role standardisation
  UPPER(SUBSTR(LOWER(TRIM(role)),1,1)) || SUBSTR(LOWER(TRIM(role)),2)
                                                      AS clean_role,
  UPPER(TRIM(department))                            AS clean_department,

  -- Generate seller handle: firstname.lastname (lowercase, no spaces)
  LOWER(TRIM(first_name)) || '.'
    || LOWER(REPLACE(TRIM(last_name), ' ', ''))      AS seller_handle,

  -- Display ID with prefix
  'SELL-' || printf('%05d', employee_id)             AS display_id,

  -- Salary formatted with currency symbol and thousands separator
  '$' || printf('%,d', salary)                       AS formatted_salary

FROM employees
ORDER BY department, last_name
LIMIT 10;`}
        height={315}
        showSchema={true}
      />

      <TimeBlock time="10:00 AM" label="Cleaning query reviewed and approved">
        The cleaning pipeline standardises all string fields consistently. The INSERT INTO sellers SELECT ... wraps this query and loads 50,000 clean records in under 3 seconds. Post-load validation confirms zero records with invalid email format or untrimmed whitespace.
      </TimeBlock>

      <ProTip>
        Always create a cleaning SELECT before writing the INSERT. Run the SELECT, spot-check 20 rows manually, and verify edge cases (names with special characters, NULL values, extremely short or long values). Only wrap in INSERT once the SELECT output looks correct. Cleaning bugs caught in SELECT cost nothing. Cleaning bugs discovered after INSERT cost a DELETE, a fix, and a re-insert.
      </ProTip>

      <HR />

      {/* ── PART 15 — Interview Prep ── */}
      <Part n="15" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How do you perform a case-insensitive string comparison in SQL?">
        <p style={{ margin: '0 0 14px' }}>Three approaches. First, normalise both sides using LOWER() or UPPER() before comparing: WHERE LOWER(city) = LOWER('seattle'). This converts both values to the same case before the comparison, making it case-insensitive. Second, in PostgreSQL and DuckDB, use ILIKE instead of LIKE: WHERE city ILIKE 'seattle' — ILIKE is the case-insensitive version of LIKE and supports wildcards. Third, for joins on string columns, normalise the join key: JOIN stores ON LOWER(TRIM(o.city)) = LOWER(TRIM(s.city)).</p>
        <p style={{ margin: '0 0 14px' }}>The most important practical application is join key normalisation. Two tables may store the same city as 'Seattle' and 'seattle' — an INNER JOIN without normalisation would miss the match entirely. Using LOWER(TRIM(city)) on both sides ensures the join finds matches regardless of case or whitespace differences.</p>
        <p style={{ margin: 0 }}>Performance consideration: applying LOWER() or TRIM() to a column in WHERE prevents the database from using an index on that column — because the index stores the original values, not the lowercased versions. For high-frequency case-insensitive searches on large tables, create a functional index: CREATE INDEX idx_customers_city_lower ON customers (LOWER(city)). Then WHERE LOWER(city) = 'seattle' can use this index efficiently. Alternatively, enforce case normalisation at write time (store all city values in title case) so queries never need to apply LOWER().</p>
      </IQ>

      <IQ q="What is the difference between REPLACE and TRANSLATE?">
        <p style={{ margin: '0 0 14px' }}>REPLACE substitutes all occurrences of a specific substring with a replacement string: REPLACE(string, find_string, replace_string). It works on substrings of any length. REPLACE('Hello World', 'World', 'SQL') returns 'Hello SQL'. REPLACE can only handle one substitution pattern per call — to substitute multiple different patterns requires chaining multiple REPLACE calls.</p>
        <p style={{ margin: '0 0 14px' }}>TRANSLATE performs character-by-character substitution — each character in the FROM set is replaced by the corresponding character in the TO set: TRANSLATE(string, from_chars, to_chars). It processes the entire character-by-character mapping in a single pass. TRANSLATE('aeiou', 'aeiou', '12345') replaces a→1, e→2, i→3, o→4, u→5 in one call. If the TO set is shorter than the FROM set, characters with no corresponding TO character are deleted.</p>
        <p style={{ margin: 0 }}>The practical choice: use REPLACE when substituting specific substrings or words — REPLACE(text, 'Ltd', 'Limited'). Use TRANSLATE when you need to substitute or remove many individual characters in one pass — TRANSLATE(phone, '()-+ ', '') removes five different characters in a single function call instead of five nested REPLACE calls. For phone number cleaning, TRANSLATE is significantly cleaner than REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(phone, '(', ''), ')', ''), '-', ''), '+', ''), ' ', '')).</p>
      </IQ>

      <IQ q="How would you extract the domain from an email address using SQL string functions?">
        <p style={{ margin: '0 0 14px' }}>Two approaches. Using SPLIT_PART: SPLIT_PART(email, '@', 2) splits by '@' and returns the second segment — the domain. For 'user@gmail.com' this returns 'gmail.com'. SPLIT_PART is the cleanest approach when the delimiter is a single consistent character.</p>
        <p style={{ margin: '0 0 14px' }}>Using SUBSTRING and POSITION: SUBSTRING(email, POSITION('@' IN email) + 1) starts extraction from one character after the '@' and takes everything to the end. POSITION('@' IN 'user@gmail.com') returns 5, so SUBSTRING starts from position 6, returning 'gmail.com'. This approach is more verbose but is portable across databases that may not support SPLIT_PART.</p>
        <p style={{ margin: 0 }}>To further extract just the domain name without the TLD: SPLIT_PART(SPLIT_PART(email, '@', 2), '.', 1) extracts 'gmail' from 'gmail.com'. To validate that the email has an @ before extracting: WHERE POSITION('@' IN email) {'>'} 0 ensures only valid emails are processed. To handle NULLs: SPLIT_PART(COALESCE(email, ''), '@', 2) returns empty string for NULL emails rather than NULL. In production data cleaning, always validate the email format first with LIKE '%@%.%' or a regex before attempting extraction — malformed emails can cause unexpected results.</p>
      </IQ>

      <IQ q="What does STRING_AGG do and how is it different from GROUP_CONCAT in MySQL?">
        <p style={{ margin: '0 0 14px' }}>STRING_AGG is an aggregate function that concatenates string values from multiple rows into a single string, with a specified separator between each value. It is the PostgreSQL and DuckDB syntax. STRING_AGG(product_name, ', ' ORDER BY product_name) collects all product_name values in the group, sorts them alphabetically, and joins them with ', '. The result is one string per group — for a GROUP BY store_id, each store gets one string listing all its products.</p>
        <p style={{ margin: '0 0 14px' }}>GROUP_CONCAT is the MySQL and SQLite equivalent (SQLite's playground engine in this course — SQLite's syntax is GROUP_CONCAT(product_name, ', ' ORDER BY product_name), argument order rather than a SEPARATOR keyword). The functionality is identical — both aggregate string values from multiple rows into one concatenated string with a separator. The syntax differs: STRING_AGG uses standard SQL aggregate function syntax with the separator as the second argument; GROUP_CONCAT uses MySQL's non-standard keyword syntax with SEPARATOR.</p>
        <p style={{ margin: 0 }}>Important differences: STRING_AGG returns NULL when there are no rows in the group (consistent with SUM/AVG behaviour). GROUP_CONCAT returns NULL in the same case. STRING_AGG in PostgreSQL has a strict type requirement — the column must be text or castable to text. STRING_AGG supports ORDER BY inside the function to control the concatenation order. Both support DISTINCT to deduplicate values before aggregating: STRING_AGG(DISTINCT category, ', ') produces a deduplicated list. Both have length limits (PostgreSQL default 1GB; MySQL default 1024 bytes configurable with group_concat_max_len). For large result sets, consider whether aggregating to a string is the right approach or whether a separate rows-based result would be cleaner.</p>
      </IQ>

      <IQ q="How do you handle NULL values in string operations?">
        <p style={{ margin: '0 0 14px' }}>NULL propagates through most string operations — any expression involving NULL produces NULL. 'Hello' || NULL || 'World' = NULL (not 'HelloWorld'). LENGTH(NULL) = NULL. LOWER(NULL) = NULL. TRIM(NULL) = NULL. This is the correct SQL behaviour but it can cause surprising results when any input column contains NULLs.</p>
        <p style={{ margin: '0 0 14px' }}>COALESCE is the primary tool for handling NULLs in string operations: COALESCE(column, '') replaces NULL with an empty string, allowing concatenation to proceed. first_name || ' ' || COALESCE(middle_name, '') || ' ' || last_name builds a full name even when middle_name is NULL. COALESCE(city, 'Unknown') provides a display label for NULL city values.</p>
        <p style={{ margin: 0 }}>CONCAT() in MySQL treats NULL as empty string rather than propagating it — CONCAT('Hello', NULL, 'World') = 'HelloWorld' in MySQL, unlike PostgreSQL's || which would return NULL. This makes CONCAT() safer for nullable columns in MySQL but masks potential data issues. CONCAT_WS (Concatenate With Separator) also skips NULL values entirely — CONCAT_WS(', ', city, state, country) with a NULL city produces 'state, country' rather than ', state, country'. For regex and pattern matching functions, NULL inputs always return NULL — wrap nullable columns with COALESCE before passing to REGEXP_REPLACE or REGEXP_EXTRACT. The consistent rule: use COALESCE to substitute a meaningful default (empty string, 'Unknown', 'N/A') before any string operation on a nullable column.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="16" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="String comparison fails to match — 'Seattle' != 'seattle' — joins miss rows"
        cause="SQL string comparisons are case-sensitive in PostgreSQL and most databases. 'Seattle' and 'seattle' are different values. A JOIN or WHERE using direct equality will miss rows where the case differs between the two columns being compared. This is especially common after bulk imports where different sources used different conventions."
        fix="Normalise both sides with LOWER() before comparing: WHERE LOWER(city) = 'seattle' or JOIN ON LOWER(a.city) = LOWER(b.city). For PostgreSQL, ILIKE is the case-insensitive alternative to LIKE. Long-term fix: enforce consistent case at write time using CHECK constraints or triggers, so all city values are always title case. For frequent queries, create a functional index on LOWER(city) to maintain performance while using case-insensitive comparisons."
      />

      <Err
        msg="String concatenation returns NULL — full_name is NULL even though first_name and last_name are not"
        cause="The || operator (and CONCAT in PostgreSQL) returns NULL if any operand is NULL. If middle_name is NULL, first_name || ' ' || middle_name || ' ' || last_name = NULL — the NULL in the middle propagates to the entire expression. Any NULL in the concatenation chain nullifies the whole result."
        fix="Wrap nullable columns with COALESCE: COALESCE(middle_name, '') or use CONCAT_WS which skips NULL values. For a full name with optional middle name: first_name || CASE WHEN middle_name IS NOT NULL THEN ' ' || middle_name ELSE '' END || ' ' || last_name. Or use CONCAT_WS(' ', first_name, middle_name, last_name) — CONCAT_WS skips NULLs and only inserts the separator between non-NULL values."
      />

      <Err
        msg="LIKE pattern not matching as expected — wildcard seems to be ignored"
        cause="Three common causes: (1) Case sensitivity — LIKE 'seattle%' does not match 'Seattle%' in PostgreSQL. (2) Whitespace — the value has leading/trailing spaces that the pattern does not account for. (3) Incorrect wildcard placement — LIKE 'Seattle' without any % or _ is an exact match, not a pattern. The value must exactly equal 'Seattle' for it to match."
        fix="Use ILIKE instead of LIKE for case-insensitive matching. Wrap the column with TRIM() before LIKE: WHERE TRIM(city) LIKE 'Seattle%'. Verify wildcards are in the right position: LIKE '%Seattle%' matches the string anywhere; LIKE 'Seattle%' only matches strings starting with 'Seattle'. Test the pattern in isolation: SELECT 'Seattle' LIKE 'seattle%' — this returns FALSE without ILIKE, confirming the case-sensitivity issue."
      />

      <Err
        msg="SUBSTRING returns unexpected result — wrong characters extracted"
        cause="SUBSTRING in SQL is 1-indexed (the first character is at position 1), not 0-indexed like most programming languages. SUBSTRING('Hello', 0, 3) may return different results than expected — position 0 is before the first character. Off-by-one errors are common when developers from Python/JavaScript backgrounds expect 0-based indexing."
        fix="Remember SQL string positions are 1-indexed: SUBSTRING('Hello', 1, 3) returns 'Hel' (3 characters starting from position 1). SUBSTRING('Hello', 2, 3) returns 'ell' (3 characters starting from position 2). Test with a known string: SELECT SUBSTRING('Hello World', 7, 5) should return 'World'. Use POSITION to find the starting position dynamically: SUBSTRING(email, POSITION('@' IN email) + 1) correctly extracts everything after the @."
      />

      <Err
        msg="REPLACE only removes the first occurrence — other occurrences remain"
        cause="This is a MySQL-specific behaviour in some contexts, or confusion with programming language string replace behaviour. In standard SQL (PostgreSQL, DuckDB), REPLACE replaces ALL occurrences by default. In some string libraries in application code, replace() only replaces the first occurrence unless a global flag is used."
        fix="In PostgreSQL and DuckDB, REPLACE always replaces all occurrences: REPLACE('aababab', 'ab', 'X') returns 'aXXX' — all three occurrences replaced. If you are seeing only the first occurrence replaced, verify you are using the SQL REPLACE function (not application-level string replace) and that you are running the query on the correct database. For REGEXP_REPLACE, use the 'g' flag for global replacement: REGEXP_REPLACE(text, pattern, replacement, 'g')."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a query that generates a clean customer directory from FreshCart's customers table. Each row should show: a display_id (format: 'CUST-' followed by zero-padded 6-digit customer_id), clean_name (first + last name in Title Case, trimmed), username (everything before @ in email, lowercased), domain (everything after @ in email, lowercased), city_display (city in Title Case), a customer_slug (lowercase first name + '.' + lowercase last name + '-' + customer_id, all spaces replaced with hyphens), and a short_label (first initial + '. ' + last name, e.g. 'A. Khan'). Order by clean_name. Only include customers whose email contains an @ symbol."
        hint="printf('%06d', customer_id) for zero-padding (no LPAD in SQLite). UPPER(SUBSTR(LOWER(x),1,1)) || SUBSTR(LOWER(x),2) for a Title Case approximation (no INITCAP). INSTR + SUBSTR for email parts (no SPLIT_PART). LOWER + REPLACE for the slug. SUBSTR(first_name,1,1) for the initial (no LEFT). WHERE email LIKE '%@%'."
        answer={`SELECT
  'CUST-' || printf('%06d', customer_id)              AS display_id,

  UPPER(SUBSTR(LOWER(TRIM(first_name)),1,1)) || SUBSTR(LOWER(TRIM(first_name)),2) || ' '
    || UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                        AS clean_name,

  LOWER(SUBSTR(TRIM(email), 1, INSTR(TRIM(email), '@') - 1)) AS username,
  LOWER(SUBSTR(TRIM(email), INSTR(TRIM(email), '@') + 1))    AS domain,

  UPPER(SUBSTR(LOWER(TRIM(city)),1,1)) || SUBSTR(LOWER(TRIM(city)),2) AS city_display,

  LOWER(
    REPLACE(TRIM(first_name), ' ', '-')
    || '.' ||
    REPLACE(TRIM(last_name), ' ', '-')
    || '-' || CAST(customer_id AS TEXT)
  )                                                    AS customer_slug,

  UPPER(SUBSTR(TRIM(first_name), 1, 1)) || '. '
    || UPPER(SUBSTR(LOWER(TRIM(last_name)),1,1)) || SUBSTR(LOWER(TRIM(last_name)),2)
                                                        AS short_label

FROM customers
WHERE email LIKE '%@%'
ORDER BY clean_name;`}
        explanation="printf('%06d', customer_id) zero-pads the numeric ID to 6 digits directly — SQLite has no LPAD, but printf's format specifiers handle numeric formatting and padding in one call. UPPER(SUBSTR(LOWER(x),1,1)) || SUBSTR(LOWER(x),2) is SQLite's substitute for INITCAP/Title Case on a single word — TRIM/LOWER normalise first, then the first character is uppercased and reattached to the (lowercased) remainder. SQLite has no SPLIT_PART, so username/domain use INSTR to find the '@' position and SUBSTR to slice around it — INSTR(str, '@') returns the same 1-indexed position POSITION('@' IN str) would in PostgreSQL. The slug uses REPLACE to swap spaces for hyphens in both name parts before joining with a dot separator, with CAST(customer_id AS TEXT) — not the PostgreSQL-only :: shorthand, which SQLite does not parse — appending the numeric ID. SUBSTR(first_name, 1, 1) extracts just the first character for the initial (SQLite has no LEFT). WHERE email LIKE '%@%' ensures only valid emails with an @ are processed — without this guard, INSTR returning 0 for a malformed email would shift every SUBSTR position and produce garbage output."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'String functions transform text at query time without modifying stored data — use them for display formatting, data cleaning, join key normalisation, and validation.',
          'Always normalise case before comparing or joining string columns: LOWER(city) = LOWER(other_city). Use ILIKE (PostgreSQL/DuckDB) for case-insensitive LIKE matching.',
          'TRIM removes leading and trailing whitespace. Always TRIM before comparing or joining on string columns — a trailing space makes \'Seattle\' != \'Seattle \' causing silent join misses.',
          'NULL propagates through string operations: \'Hello\' || NULL = NULL. Wrap nullable columns with COALESCE before concatenation. CONCAT_WS skips NULLs automatically.',
          'REPLACE substitutes substrings. TRANSLATE substitutes individual characters in one pass — use TRANSLATE for cleaning multiple different characters (phone number symbols) instead of chaining REPLACE.',
          'SQL strings are 1-indexed: SUBSTRING(str, 1, 3) returns the first 3 characters. SPLIT_PART(str, delimiter, n) returns the nth segment (1-indexed).',
          'LIKE uses % (any characters) and _ (one character). ILIKE is the case-insensitive variant. Applying LIKE/LOWER on indexed columns prevents index use — create functional indexes for frequent case-insensitive searches.',
          'STRING_AGG(column, separator ORDER BY col) aggregates multiple rows into one concatenated string — essential for building comma-separated lists and human-readable summaries.',
          'The standard cleaning chain in PostgreSQL/DuckDB: INITCAP(LOWER(TRIM(column))) produces consistently formatted Title Case from any input. SQLite has no INITCAP — UPPER(SUBSTR(LOWER(x),1,1)) || SUBSTR(LOWER(x),2) capitalises just the first letter of the whole string instead.',
          'Build cleaning pipelines as SELECT first, verify with spot checks on 20+ rows, then wrap in INSERT. Cleaning bugs caught in SELECT cost nothing. Bugs found after INSERT require DELETE + reclean + reinsert.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 42</strong>, you learn date and time functions — extracting parts, calculating differences, formatting, truncating to periods, and every temporal operation needed for time-series analytics and reporting.
        </p>
        <Link href="/learn/sql/date-time-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 42 → Date and Time Functions
        </Link>
      </div>

    </LearnLayout>
  );
}