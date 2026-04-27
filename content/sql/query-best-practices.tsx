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

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
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

const GoodBad = ({ bad, good, badLabel, goodLabel }: { bad: string; good: string; badLabel?: string; goodLabel?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, margin: '16px 0 24px' }}>
    <div style={{ background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid rgba(255,71,87,0.2)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#ff4757', fontWeight: 700 }}>{badLabel ?? 'Avoid'}</span>
      </div>
      <pre style={{ margin: 0, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{bad}</pre>
    </div>
    <div style={{ background: 'rgba(0,230,118,0.04)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ padding: '8px 14px', background: 'rgba(0,230,118,0.08)', borderBottom: '1px solid rgba(0,230,118,0.2)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00e676', fontWeight: 700 }}>{goodLabel ?? 'Prefer'}</span>
      </div>
      <pre style={{ margin: 0, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{good}</pre>
    </div>
  </div>
);

export default function QueryBestPractices() {
  return (
    <LearnLayout
      title="Query Best Practices"
      description="Write clean, fast, readable SQL your team will thank you for — SARGability, avoiding SELECT *, NULL handling, and formatting conventions"
      section="SQL — Module 59"
      readTime="14 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Query Style Matters" />

      <P>Bad SQL is not just ugly — it is slow, hard to debug, and breaks in unexpected ways when the dataset grows. Most of the worst-performing queries in production share a small set of anti-patterns: functions applied to indexed columns, vague column selection, missing aliases, and ambiguous NULLs. Learning to recognize and avoid these patterns will make your queries 10x faster and your code 10x easier to review.</P>

      <P>This module covers the patterns senior engineers check for in every SQL code review. They are not stylistic preferences — most of them have direct, measurable performance implications.</P>

      <SQLPlayground
        initialQuery={`-- The FreshCart dataset we will optimize queries against
SELECT
  'customers'   AS tbl, COUNT(*) AS rows FROM customers
UNION ALL SELECT 'orders',      COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL SELECT 'products',    COUNT(*) FROM products;`}
        height={140}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Never Use SELECT *" />

      <P><Hl>SELECT *</Hl> seems convenient but causes real problems in production: it reads every column from disk even if you only need two, breaks views and application code when table schemas change (new column added = different column order), and makes queries self-documenting only if you know the table schema by heart.</P>

      <GoodBad
        bad={`-- Reads all columns even if only 2 are used
SELECT *
FROM orders
WHERE order_status = 'Delivered';

-- application code then does:
-- order.order_id, order.customer_id
-- all other columns: wasted I/O`}
        good={`-- Only read what you need
SELECT
  order_id,
  customer_id,
  total_amount,
  delivery_date
FROM orders
WHERE order_status = 'Delivered';`}
      />

      <P>The only acceptable use of SELECT * is in quick exploratory queries directly in a SQL client — never in application code, views, or stored procedures. In CTEs, SELECT * from an inner CTE into a final SELECT is acceptable if you immediately alias what you need.</P>

      <SQLPlayground
        initialQuery={`-- Show the difference: explicit columns vs implicit *
-- Explicit: exactly what we need for a delivery summary
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name || ' ' || c.last_name AS customer_name,
  c.city
FROM orders     AS o
JOIN customers  AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
ORDER BY o.order_date DESC
LIMIT 5;`}
        height={190}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="SARGability — Write Index-Friendly WHERE Clauses" />

      <P><Hl>SARGable</Hl> stands for Search ARGument Able — a WHERE clause the database can use an index to satisfy. A non-SARGable condition forces a full table scan even when a perfect index exists. The single most common cause: applying a function to the indexed column.</P>

      <H>The rule: never transform the indexed column</H>

      <P>An index on a column stores the raw column values in sorted order. If your WHERE clause applies a function to the column, the database cannot use the index — the computed value is not in the index. Move transformations to the comparison value instead.</P>

      <GoodBad
        bad={`-- Non-SARGable: function applied to indexed column
-- Full scan even with index on order_date
WHERE strftime('%Y', order_date) = '2024'

WHERE UPPER(city) = 'MUMBAI'

WHERE LENGTH(product_name) > 10

WHERE total_amount * 1.18 > 1000`}
        good={`-- SARGable: transform the literal, not the column
-- Index on order_date can be used
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01'

WHERE city = 'Mumbai'   -- or store consistently-cased data

WHERE product_name > ''  -- different logic needed

WHERE total_amount > 847.46  -- pre-compute: 1000 / 1.18`}
      />

      <GoodBad
        badLabel="Non-SARGable — LIKE with leading wildcard"
        goodLabel="SARGable — LIKE with trailing wildcard"
        bad={`-- Full scan: leading wildcard prevents index use
WHERE product_name LIKE '%milk%'
WHERE email LIKE '%@gmail.com'`}
        good={`-- Index usable: trailing wildcard only
WHERE product_name LIKE 'Amul%'
WHERE email LIKE 'rahul%'
-- For contains-search: use full-text indexes`}
      />

      <SQLPlayground
        initialQuery={`-- SARGable date range (index-friendly) vs function-based (index-killing)
-- SARGable: compare column directly to range boundaries
SELECT COUNT(*) AS delivered_in_2024
FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01'
  AND order_status = 'Delivered';`}
        height={140}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Avoid Functions on Indexed Columns in JOINs" />

      <P>The same SARGability rule applies to JOIN conditions. If a JOIN applies a function to either side's join key, the index on that key cannot be used — the database must compute the function for every row and compare, resulting in a nested-loop full scan.</P>

      <GoodBad
        bad={`-- Non-SARGable JOIN: function kills the FK index
SELECT o.order_id, c.first_name
FROM orders    AS o
JOIN customers AS c
  ON CAST(o.customer_id AS TEXT)
   = CAST(c.customer_id AS TEXT);
-- Computes CAST for every row pair — full scan`}
        good={`-- SARGable JOIN: same types, direct comparison
SELECT o.order_id, c.first_name
FROM orders    AS o
JOIN customers AS c
  ON o.customer_id = c.customer_id;
-- Index on customer_id (FK) is used`}
      />

      <GoodBad
        bad={`-- Implicit type coercion: date stored as TEXT
-- WHERE CAST(order_date AS DATE) = '2024-03-15'
-- or: WHERE date(order_date) = '2024-03-15'
-- Function on column = no index`}
        good={`-- Store dates as DATE/TEXT in ISO format: 'YYYY-MM-DD'
-- Then direct comparison works and is SARGable:
WHERE order_date = '2024-03-15'`}
      />

      <ProTip>
        Run EXPLAIN QUERY PLAN before your query to see whether the database is using an index. If you see "SCAN TABLE" instead of "SEARCH TABLE USING INDEX", your WHERE or JOIN condition is likely non-SARGable. Fix the condition and re-run EXPLAIN QUERY PLAN to confirm the index is now being used.
      </ProTip>

      <SQLPlayground
        initialQuery={`-- Check query plan: index usage vs full scan
EXPLAIN QUERY PLAN
SELECT o.order_id, c.first_name, o.total_amount
FROM orders    AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
  AND o.total_amount > 500;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Always Alias Tables in Multi-Table Queries" />

      <P>Unaliased multi-table queries are hard to read and can be ambiguous when two tables share a column name. Always assign short, meaningful aliases to every table in a query with more than one table. Use the table's initials or a short mnemonic — not t1, t2, t3.</P>

      <GoodBad
        bad={`-- Ambiguous: which table does customer_id belong to?
SELECT order_id, customer_id, first_name, total_amount
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
WHERE order_status = 'Delivered';
-- 'customer_id' is ambiguous in SELECT — whose?`}
        good={`-- Clear: every column is table-qualified
SELECT
  o.order_id,
  o.customer_id,
  c.first_name,
  o.total_amount
FROM orders    AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered';`}
      />

      <GoodBad
        bad={`-- t1/t2 aliases: meaningless, hard to review
SELECT t1.order_id, t2.product_name, t1.quantity
FROM order_items t1
JOIN products t2 ON t1.product_id = t2.product_id;`}
        good={`-- Semantic aliases: self-documenting
SELECT
  oi.order_id,
  p.product_name,
  oi.quantity,
  oi.line_total
FROM order_items AS oi
JOIN products    AS p ON oi.product_id = p.product_id;`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Use EXISTS Instead of COUNT(*) for Existence Checks" />

      <P>A common pattern: checking whether any row matches a condition, then branching on the result. The slow way is <Hl>COUNT(*) {'>'} 0</Hl> — it scans all matching rows and counts them before you can compare. The correct way is <Hl>EXISTS</Hl> — it stops as soon as the first matching row is found.</P>

      <GoodBad
        bad={`-- Scans all matching rows to get the count
SELECT customer_id
FROM customers
WHERE (
  SELECT COUNT(*)
  FROM orders
  WHERE orders.customer_id = customers.customer_id
    AND order_status = 'Delivered'
) > 0;`}
        good={`-- Stops at the first matching row — much faster
SELECT customer_id
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
);`}
      />

      <GoodBad
        badLabel="Slow — scans all to count"
        goodLabel="Fast — stops at first match"
        bad={`-- Checking if a product has any orders
SELECT product_id
FROM products
WHERE (
  SELECT COUNT(*) FROM order_items
  WHERE order_items.product_id = products.product_id
) > 0;`}
        good={`-- EXISTS is always better for "does any row match?"
SELECT product_id
FROM products AS p
WHERE EXISTS (
  SELECT 1 FROM order_items AS oi
  WHERE oi.product_id = p.product_id
);`}
      />

      <SQLPlayground
        initialQuery={`-- Find customers who have at least one delivered order
-- Using EXISTS (stops at first match per customer)
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
)
ORDER BY c.loyalty_tier, c.first_name;`}
        height={185}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="NULL Handling — Three Rules You Must Know" />

      <P>NULL is not a value — it is the absence of a value. It obeys different rules than regular values. Getting NULL handling wrong produces silent incorrect results: rows are silently excluded from aggregations, comparisons return the wrong result, and joins drop rows. Three rules cover 90% of NULL bugs.</P>

      <H>Rule 1: NULL comparisons always return NULL (not TRUE or FALSE)</H>

      <GoodBad
        bad={`-- Both of these return 0 rows — not the rows with NULL delivery_date
SELECT * FROM orders WHERE delivery_date = NULL;
SELECT * FROM orders WHERE delivery_date != NULL;
-- = NULL and != NULL are always NULL (falsy), never TRUE`}
        good={`-- IS NULL and IS NOT NULL are the correct tests
SELECT * FROM orders WHERE delivery_date IS NULL;
SELECT * FROM orders WHERE delivery_date IS NOT NULL;`}
      />

      <H>Rule 2: Aggregates silently ignore NULL</H>

      <GoodBad
        bad={`-- AVG ignores NULL rows — result looks like average of all,
-- but it is only the average of non-NULL rows
SELECT AVG(delivery_date) FROM orders;
-- If 20% of rows have NULL delivery_date, the average
-- is computed over only 80% of rows — no warning given`}
        good={`-- Count NULLs explicitly to know what AVG is actually over
SELECT
  COUNT(*)                 AS total_orders,
  COUNT(delivery_date)     AS orders_with_delivery,
  COUNT(*) - COUNT(delivery_date) AS orders_missing_delivery
FROM orders;`}
      />

      <H>Rule 3: Use COALESCE or IFNULL to provide a default</H>

      <GoodBad
        bad={`-- NULL propagates: any arithmetic with NULL = NULL
SELECT
  first_name,
  discount_pct * total_amount AS discount_amount
-- If discount_pct is NULL → discount_amount is NULL
-- Report shows NULL instead of 0`}
        good={`-- Replace NULL with a sensible default before arithmetic
SELECT
  first_name,
  COALESCE(discount_pct, 0) * total_amount AS discount_amount
-- COALESCE returns first non-NULL argument
-- NULL discount_pct treated as 0 → correct ₹0 discount`}
      />

      <SQLPlayground
        initialQuery={`-- NULL audit on the FreshCart orders table
SELECT
  COUNT(*)                                        AS total_orders,
  COUNT(delivery_date)                            AS with_delivery_date,
  COUNT(*) - COUNT(delivery_date)                 AS missing_delivery_date,
  ROUND(100.0 * (COUNT(*) - COUNT(delivery_date))
        / COUNT(*), 1)                            AS pct_missing
FROM orders;`}
        height={155}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Formatting and Readability Conventions" />

      <P>SQL has no official style guide, but teams that adopt consistent conventions find code review, debugging, and onboarding dramatically easier. These are the conventions used by most professional SQL teams:</P>

      <CodeBlock
        label="SQL formatting conventions"
        code={`-- KEYWORDS: uppercase
-- table/column names: lowercase_snake_case
-- aliases: always use AS keyword (never implicit)

-- Structure: one clause per line, aligned
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name || ' ' || c.last_name  AS customer_name,
  s.store_name,
  COUNT(oi.product_id)                AS item_count
FROM   orders     AS o
JOIN   customers  AS c  ON c.customer_id  = o.customer_id
JOIN   stores     AS s  ON s.store_id     = o.store_id
JOIN   order_items AS oi ON oi.order_id   = o.order_id
WHERE  o.order_status = 'Delivered'
  AND  o.order_date >= '2024-01-01'
GROUP BY
  o.order_id,
  o.order_date,
  o.total_amount,
  customer_name,
  s.store_name
HAVING COUNT(oi.product_id) >= 3
ORDER BY o.order_date DESC
LIMIT 20;

-- CTEs: name them as what they represent (not cte1, subq2)
WITH
delivered_orders AS (
  SELECT order_id, customer_id, total_amount
  FROM   orders
  WHERE  order_status = 'Delivered'
),
high_value_customers AS (
  SELECT customer_id, SUM(total_amount) AS lifetime_value
  FROM   delivered_orders
  GROUP  BY customer_id
  HAVING SUM(total_amount) > 5000
)
SELECT c.first_name, h.lifetime_value
FROM   high_value_customers AS h
JOIN   customers             AS c ON c.customer_id = h.customer_id
ORDER  BY h.lifetime_value DESC;`}
      />

      <div style={{ display: 'grid', gap: 10, margin: '16px 0 24px' }}>
        {[
          ['Uppercase keywords', 'SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT', C],
          ['One SELECT column per line', 'Easier to comment out, reorder, or add a column during debugging', C],
          ['Always use AS for aliases', 'SELECT total_amount AS revenue — never SELECT total_amount revenue', C],
          ['Align JOIN ON conditions', 'Makes foreign key relationships visually obvious', C],
          ['Name CTEs semantically', 'delivered_orders not cte1 — the name documents the purpose', C],
          ['Trailing commas vs leading commas', 'Team choice — leading commas make it easier to comment out the last column', '#8b5cf6'],
        ].map(([rule, why, color]) => (
          <div key={rule as string} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: color as string, flexShrink: 0, marginTop: 2 }}>RULE</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>{rule as string}</p>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{why as string}</p>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Common Anti-Patterns to Eliminate" />

      <H>Anti-pattern 1: Implicit GROUP BY</H>

      <GoodBad
        bad={`-- Selecting non-aggregated columns not in GROUP BY
-- (Some databases allow this; result is non-deterministic)
SELECT customer_id, first_name, SUM(total_amount)
FROM orders
GROUP BY customer_id;
-- first_name is not in GROUP BY — which first_name
-- does the database pick? Undefined.`}
        good={`SELECT customer_id, first_name, SUM(total_amount) AS revenue
FROM orders AS o
JOIN customers AS c USING (customer_id)
GROUP BY o.customer_id, c.first_name;
-- Every selected column is either aggregated or in GROUP BY`}
      />

      <H>Anti-pattern 2: Correlated subquery in SELECT (N+1)</H>

      <GoodBad
        bad={`-- Runs a subquery for EVERY row in orders — O(n) queries
SELECT
  order_id,
  (SELECT first_name FROM customers
   WHERE customer_id = o.customer_id) AS name
FROM orders AS o;`}
        good={`-- One JOIN — single pass
SELECT o.order_id, c.first_name AS name
FROM orders    AS o
JOIN customers AS c ON c.customer_id = o.customer_id;`}
      />

      <H>Anti-pattern 3: DISTINCT as a bug-hider</H>

      <GoodBad
        bad={`-- DISTINCT hides the JOIN that is producing duplicates
SELECT DISTINCT c.customer_id, c.first_name
FROM customers AS c
JOIN orders    AS o ON o.customer_id = c.customer_id;
-- Why are there duplicates? DISTINCT masks the root cause`}
        good={`-- Use EXISTS to find customers with at least one order
SELECT c.customer_id, c.first_name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.customer_id
);`}
      />

      <H>Anti-pattern 4: OR across different columns in WHERE</H>

      <GoodBad
        bad={`-- OR prevents index use when columns are different
WHERE city = 'Mumbai' OR store_id = 'ST001'
-- Database cannot satisfy both sides with one index scan`}
        good={`-- UNION ALL splits into two index-friendly queries
SELECT * FROM customers WHERE city = 'Mumbai'
UNION ALL
SELECT * FROM customers WHERE store_id = 'ST001'
  AND city != 'Mumbai';  -- avoid duplicates`}
      />

      <SQLPlayground
        initialQuery={`-- Anti-pattern 3 fixed: EXISTS vs DISTINCT
-- Find customers who placed at least one order in 2024

-- DISTINCT (hides the why):
-- SELECT DISTINCT c.customer_id, c.first_name
-- FROM customers c JOIN orders o ON o.customer_id = c.customer_id
-- WHERE o.order_date >= '2024-01-01'

-- EXISTS (correct intent):
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_date >= '2024-01-01'
)
ORDER BY c.loyalty_tier DESC, c.first_name;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is SARGability and why does it matter?">
        <p style={{ margin: '0 0 12px' }}>SARGable (Search ARGument Able) describes a WHERE clause condition that allows the database engine to use an index to satisfy it. A condition is SARGable when the indexed column appears alone on one side of the comparison, without any function or transformation applied to it. The database can walk the sorted index to find matching rows rather than scanning the full table.</p>
        <p style={{ margin: '0 0 12px' }}>A condition becomes non-SARGable when a function is applied to the indexed column: WHERE YEAR(order_date) = 2024, WHERE UPPER(city) = 'MUMBAI', or WHERE total_amount * 1.18 {'>'} 1000. The database cannot use the index on order_date for the first example because the index stores raw dates, not YEAR-extracted integers. The engine must compute YEAR() for every row and compare — a full table scan.</p>
        <p style={{ margin: 0 }}>Fix: transform the comparison value instead of the column. Replace WHERE YEAR(order_date) = 2024 with WHERE order_date {'>'} '2024-01-01' AND order_date {'<'} '2025-01-01'. The column appears unmodified, the index can be used. SARGability matters because on tables with millions of rows, the difference between an index seek and a full scan is measured in seconds vs. milliseconds. Always check EXPLAIN QUERY PLAN to verify index usage.</p>
      </IQ>

      <IQ q="Why should you avoid SELECT * in production queries?">
        <p style={{ margin: '0 0 12px' }}>SELECT * has three production problems. First, it reads every column from disk even if your application only uses two — unnecessary I/O, more data transferred over the network, more memory used. On wide tables (100+ columns, JSONB blobs, large TEXT fields) this overhead is significant. Second, SELECT * is fragile: when a column is added to the table, SELECT * returns it even if the application does not expect it, breaking deserialization code, ORMs that map columns to object fields, or CSV exports with fixed column order. Third, it makes queries unreadable — a reader cannot determine what data the query produces without knowing the table schema.</p>
        <p style={{ margin: 0 }}>The only acceptable context for SELECT * is interactive exploration in a SQL client — never in views, stored procedures, application code, or automated reports. In CTEs, SELECT * from a named CTE into a final outer SELECT is acceptable if the final SELECT explicitly names what it needs. Rule of thumb: if the query will run more than once, name the columns.</p>
      </IQ>

      <IQ q="What is the difference between WHERE and HAVING?">
        <p style={{ margin: '0 0 12px' }}>WHERE filters rows before grouping. HAVING filters groups after grouping. They operate at different stages of query execution. WHERE runs first — it restricts which rows are included in the aggregation. HAVING runs after GROUP BY — it restricts which groups appear in the final result based on aggregated values.</p>
        <p style={{ margin: '0 0 12px' }}>WHERE can only reference columns that exist in the raw table (individual row values). It cannot reference aggregate functions (SUM, COUNT, AVG) because the aggregation has not happened yet. HAVING can reference both the GROUP BY columns and aggregate functions applied to the group.</p>
        <p style={{ margin: 0 }}>Performance implication: filter as early as possible using WHERE. If you can eliminate rows before grouping, the aggregation processes fewer rows and runs faster. HAVING should only contain conditions that genuinely require the aggregated value — anything else belongs in WHERE. Example: WHERE order_status = 'Delivered' eliminates non-delivered rows before counting, which is far more efficient than HAVING order_status = 'Delivered' which would group all rows first, then discard non-delivered groups.</p>
      </IQ>

      <IQ q="When should you use a CTE vs a subquery vs a temporary table?">
        <p style={{ margin: '0 0 12px' }}>CTEs (WITH clauses) are best for: breaking a complex query into readable named steps, referencing the same intermediate result multiple times within one query, and recursive queries. Most databases optimize CTEs inline (treating them as subqueries), so there is typically no performance difference between a CTE and an equivalent subquery — choose CTEs for readability. Use meaningful CTE names that describe what the set represents.</p>
        <p style={{ margin: '0 0 12px' }}>Subqueries are best for: simple one-off filtering (EXISTS / IN subqueries), scalar subqueries that return a single value, and cases where the subquery is used in only one place and is simple enough to read inline. Correlated subqueries run once per outer row — avoid them in SELECT lists when the same result can be achieved with a JOIN (the N+1 problem).</p>
        <p style={{ margin: 0 }}>Temporary tables are best for: large intermediate results that need to be queried multiple times (CTEs re-materialize each time in some databases), results that need indexes for subsequent queries (you can CREATE INDEX on a temp table), and multi-step data transformation pipelines where each step produces a significant intermediate dataset. Temp tables have setup overhead; for small datasets, a CTE is faster and requires no cleanup.</p>
      </IQ>

      <IQ q="What is the N+1 query problem and how do you fix it?">
        <p style={{ margin: '0 0 12px' }}>The N+1 problem occurs when application code executes 1 query to get N rows, then executes 1 additional query per row to fetch related data — N+1 queries total. Example: fetch 100 orders (1 query), then for each order, fetch the customer name (100 queries) = 101 queries. At 100 orders this is annoying; at 10,000 orders it is catastrophic.</p>
        <p style={{ margin: '0 0 12px' }}>In raw SQL, the N+1 pattern appears as a correlated subquery in the SELECT list: SELECT order_id, (SELECT first_name FROM customers WHERE customer_id = o.customer_id) FROM orders o. This executes one subquery per order row.</p>
        <p style={{ margin: 0 }}>Fix: JOIN the related table in the original query. SELECT o.order_id, c.first_name FROM orders o JOIN customers c ON c.customer_id = o.customer_id. The database executes one query with one pass over both tables — O(1) queries regardless of N. In ORM frameworks (Django, Rails, SQLAlchemy), the equivalent fix is eager loading: select_related() in Django, includes() in Rails, joinedload() in SQLAlchemy. The fix is always the same: fetch all needed data in one query, not one query per row.</p>
      </IQ>

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Rewrite the following poorly-written query using all best practices from this module: SELECT *, (SELECT COUNT(*) FROM order_items WHERE order_items.order_id = orders.order_id) as item_count FROM orders WHERE strftime('%Y', order_date) = '2024' AND order_status = 'Delivered'. Fix: (1) remove SELECT *, specify needed columns; (2) fix the non-SARGable date filter; (3) replace the correlated COUNT(*) subquery with a JOIN + GROUP BY; (4) use proper aliases and formatting."
        hint="Change strftime('%Y', order_date) = '2024' to order_date >= '2024-01-01' AND order_date < '2025-01-01'. Replace the correlated subquery with JOIN order_items ... GROUP BY. Select specific columns with table-qualified aliases."
        answer={`-- Original (bad):
-- SELECT *, (SELECT COUNT(*) FROM order_items
--            WHERE order_items.order_id = orders.order_id) as item_count
-- FROM orders
-- WHERE strftime('%Y', order_date) = '2024' AND order_status = 'Delivered'

-- Fixed: all best practices applied
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.payment_method,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.city,
  COUNT(oi.product_id)                AS item_count,
  ROUND(SUM(oi.line_total), 2)        AS items_total
FROM orders      AS o
JOIN customers   AS c  ON c.customer_id  = o.customer_id
JOIN order_items AS oi ON oi.order_id    = o.order_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
  AND o.order_date <  '2025-01-01'
GROUP BY
  o.order_id,
  o.order_date,
  o.total_amount,
  o.payment_method,
  customer_name,
  c.city
ORDER BY o.order_date DESC, o.total_amount DESC;`}
        explanation="Five improvements applied: (1) SELECT * replaced with explicit columns — only the fields a delivery summary needs. (2) strftime('%Y', order_date) = '2024' is non-SARGable (function applied to the indexed column); replaced with a SARGable range: order_date >= '2024-01-01' AND order_date < '2025-01-01'. (3) The correlated COUNT(*) subquery runs once per order row (N+1); replaced with JOIN order_items + GROUP BY + COUNT() — one pass over both tables. (4) Every table has a semantic alias (o, c, oi — not t1, t2). (5) Every SELECT column is table-qualified, keywords are uppercase, one column per line. The result is readable, index-friendly, and executes in one query regardless of the number of orders."
      />

      <HR />

      <KeyTakeaways
        items={[
          'Never use SELECT * in production queries — name every column. Explicit columns prevent silent breaks when schema changes and eliminate unnecessary I/O.',
          'SARGable WHERE clauses allow index use. Never apply functions to indexed columns: WHERE YEAR(col) = 2024 kills the index; WHERE col >= \'2024-01-01\' uses it.',
          'Trailing LIKE wildcards (\'Amul%\') are SARGable and use indexes. Leading wildcards (\'%milk%\') force full scans. Use full-text search for contains-matching.',
          'Use EXISTS instead of COUNT(*) > 0 for existence checks. EXISTS stops at the first match; COUNT(*) scans all matching rows.',
          'NULL is not a value — it is unknown. Use IS NULL / IS NOT NULL (not = NULL). Aggregates silently skip NULLs. Use COALESCE to provide defaults.',
          'Filter with WHERE before grouping; filter groups with HAVING after grouping. Move conditions to WHERE whenever they do not require aggregate values.',
          'Correlated subqueries in SELECT are N+1 queries — one per outer row. Replace with a JOIN. The database does one pass regardless of N.',
          'Avoid DISTINCT as a bug-hider for duplicate-producing JOINs. Investigate why duplicates appear; usually EXISTS or a better JOIN is the fix.',
          'Format SQL with uppercase keywords, one column per line, semantic table aliases, and named CTEs that describe what the set represents.',
        ]}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 60</strong>, you apply everything to real data analysis — cohort analysis, RFM segmentation, and revenue breakdowns using the full FreshCart dataset.
        </p>
        <Link href="/learn/sql/sql-for-data-analysis" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 60 → SQL for Data Analysis
        </Link>
      </div>

    </LearnLayout>
  );
}
