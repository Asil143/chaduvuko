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

export default function OrderBy() {
  return (
    <LearnLayout
      title="Sorting Results — ORDER BY"
      description="Control exactly how your results come back — ascending, descending, multiple columns, NULL handling, and sorting by expressions"
      section="SQL — Module 08"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Result Order Matters" />

      <P>Without ORDER BY, a SQL query returns rows in no guaranteed order. The database returns them in whatever order is most efficient for its internal storage and execution plan. On the same table, two identical queries run at different times can return rows in different orders. This is not a bug — it is how relational databases work by design.</P>

      <P>For exploration, random order is fine. But for any result that a person reads, a dashboard displays, or an application processes — order matters enormously. A finance report with the largest transactions at the top. A customer list alphabetically sorted for a dropdown. The most recent orders first for an operations dashboard. The top 10 highest-margin products for a procurement decision. All of these require ORDER BY.</P>

      <SQLPlayground
        initialQuery={`-- Without ORDER BY: rows come back in storage order (unpredictable)
SELECT first_name, last_name, city, loyalty_tier
FROM customers;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- With ORDER BY: rows come back in alphabetical city order
SELECT first_name, last_name, city, loyalty_tier
FROM customers
ORDER BY city;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="ASC and DESC — Ascending and Descending" />

      <P>ORDER BY sorts in ascending order by default — smallest to largest for numbers, A to Z for text, oldest to newest for dates. To reverse the order, add <Hl>DESC</Hl> (descending). To be explicit about ascending, add <Hl>ASC</Hl> — though it is optional since it is the default.</P>

      <CodeBlock
        label="ASC vs DESC"
        code={`-- Ascending (default) — smallest to largest, A to Z, oldest to newest
ORDER BY unit_price          -- same as ORDER BY unit_price ASC
ORDER BY first_name ASC      -- A to Z
ORDER BY order_date ASC      -- oldest first

-- Descending — largest to smallest, Z to A, newest to oldest
ORDER BY unit_price DESC     -- most expensive first
ORDER BY first_name DESC     -- Z to A
ORDER BY order_date DESC     -- most recent first`}
      />

      <H>Numbers — ascending and descending</H>

      <SQLPlayground
        initialQuery={`-- Products from cheapest to most expensive
SELECT product_name, category, brand, unit_price
FROM products
ORDER BY unit_price ASC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products from most expensive to cheapest
SELECT product_name, category, brand, unit_price
FROM products
ORDER BY unit_price DESC;`}
        height={120}
        showSchema={false}
      />

      <H>Text — alphabetical sorting</H>

      <SQLPlayground
        initialQuery={`-- Customers alphabetically by last name
SELECT first_name, last_name, city, loyalty_tier
FROM customers
ORDER BY last_name ASC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products sorted Z to A by product name
SELECT product_name, brand, unit_price
FROM products
ORDER BY product_name DESC;`}
        height={110}
        showSchema={false}
      />

      <H>Dates — chronological and reverse chronological</H>

      <SQLPlayground
        initialQuery={`-- Orders oldest first — chronological timeline view
SELECT order_id, order_date, order_status, total_amount
FROM orders
ORDER BY order_date ASC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders most recent first — the standard for dashboards
SELECT order_id, order_date, order_status, total_amount
FROM orders
ORDER BY order_date DESC;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Multi-Column Sorting — Primary and Secondary Sort" />

      <P>ORDER BY can sort by multiple columns separated by commas. The database sorts by the first column, then within rows that have the same value in the first column, it sorts by the second column, and so on. This is called a <Hl>compound sort</Hl> or <Hl>multi-key sort</Hl>.</P>

      <P>Think of it like a phone book: sorted by last name first, then by first name within the same last name. If two people share a last name, their first names determine the order between them.</P>

      <SQLPlayground
        initialQuery={`-- Sort by city first, then by loyalty_tier within each city
-- The second column only matters when the first column ties
SELECT first_name, last_name, city, loyalty_tier
FROM customers
ORDER BY city ASC, loyalty_tier ASC;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Sort by category ascending, then price descending within each category
-- Most expensive products in each category appear first
SELECT product_name, category, brand, unit_price
FROM products
ORDER BY category ASC, unit_price DESC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Sort by store_id ascending, then salary descending within each store
-- Highest earner in each store appears at the top of their group
SELECT store_id, first_name, last_name, role, salary
FROM employees
ORDER BY store_id ASC, salary DESC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders sorted by status, then by total_amount descending within each status
-- Largest orders in each status group appear first
SELECT order_id, order_status, payment_method, total_amount, order_date
FROM orders
ORDER BY order_status ASC, total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <P>Each column in a multi-column ORDER BY can independently be ASC or DESC. In the examples above, ORDER BY category ASC, unit_price DESC means: sort categories A-Z, then within each category sort prices from highest to lowest. The directions are completely independent per column.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Sorting by Expressions and Calculated Columns" />

      <P>ORDER BY does not have to sort by a raw column value. You can sort by an <Hl>expression</Hl> — a calculation, a function result, or a column alias defined in SELECT.</P>

      <H>Sorting by a calculated value</H>

      <SQLPlayground
        initialQuery={`-- Sort products by profit margin (highest margin first)
-- The calculation happens, the sort uses the result
SELECT
  product_name,
  brand,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
ORDER BY (unit_price - cost_price) / unit_price DESC;`}
        height={170}
        showSchema={false}
      />

      <H>Sorting by a SELECT alias</H>

      <P>Unlike WHERE (which runs before SELECT), ORDER BY runs <Hl>after</Hl> SELECT — so you can reference a SELECT alias in ORDER BY. This makes queries cleaner when sorting by a computed column.</P>

      <SQLPlayground
        initialQuery={`-- Use the alias 'margin_pct' in ORDER BY
-- This works because ORDER BY runs after SELECT
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
ORDER BY margin_pct DESC;`}
        height={160}
        showSchema={false}
      />

      <H>Sorting by column position number</H>

      <P>SQL also allows sorting by column position — the number of the column in your SELECT list. ORDER BY 1 means "sort by the first column in SELECT." This is a shorthand that works but is generally discouraged in professional code because it breaks silently when columns are reordered.</P>

      <CodeBlock
        label="Column position sorting — works but not recommended"
        code={`-- ORDER BY 3 means "sort by the 3rd column in SELECT"
-- Here that is unit_price
SELECT product_name, brand, unit_price
FROM products
ORDER BY 3 DESC;

-- Problem: if you add a column between brand and unit_price,
-- ORDER BY 3 now sorts by the new column, not unit_price
-- Use column names instead for safety`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="NULL Values in ORDER BY — Where Do They Land?" />

      <P>NULL values require special attention when sorting. SQL databases differ in how they handle NULLs in ORDER BY — and the default behaviour is not always what you expect.</P>

      <H>Default NULL sort order</H>
      <P>In <Hl>PostgreSQL and DuckDB</Hl> (used in the playground): NULLs sort <Hl>last in ASC</Hl> and <Hl>first in DESC</Hl>. In <Hl>MySQL</Hl>: NULLs sort first in ASC and last in DESC — the opposite.</P>

      <SQLPlayground
        initialQuery={`-- delivery_date is NULL for undelivered orders
-- In DuckDB/PostgreSQL: NULLs appear last in ASC order
SELECT order_id, order_date, delivery_date, order_status
FROM orders
ORDER BY delivery_date ASC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- In DESC order: NULLs appear first in PostgreSQL/DuckDB
-- The undelivered orders (NULL delivery_date) come before delivered ones
SELECT order_id, order_date, delivery_date, order_status
FROM orders
ORDER BY delivery_date DESC;`}
        height={130}
        showSchema={false}
      />

      <H>Controlling NULL position — NULLS FIRST and NULLS LAST</H>

      <P>PostgreSQL (and DuckDB) support explicit control over where NULLs land using <Hl>NULLS FIRST</Hl> and <Hl>NULLS LAST</Hl> at the end of an ORDER BY column.</P>

      <SQLPlayground
        initialQuery={`-- Put NULLs last even in DESC order (PostgreSQL/DuckDB)
-- Delivered orders (real dates) appear first, undelivered (NULLs) last
SELECT order_id, order_date, delivery_date, order_status
FROM orders
ORDER BY delivery_date DESC NULLS LAST;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Put NULLs first even in ASC order
-- Undelivered orders appear at the top of the list
SELECT order_id, order_date, delivery_date, order_status
FROM orders
ORDER BY delivery_date ASC NULLS FIRST;`}
        height={130}
        showSchema={false}
      />

      <Callout type="info">
        MySQL does not support NULLS FIRST / NULLS LAST syntax. In MySQL, to control NULL position use: ORDER BY (delivery_date IS NULL) ASC, delivery_date ASC — the IS NULL expression returns 0 for non-null and 1 for null, so sorting by it ASC puts non-nulls first. This is a dialect difference worth knowing when switching between databases.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="ORDER BY with WHERE — Filtering Before Sorting" />

      <P>ORDER BY and WHERE work together seamlessly. WHERE filters first (execution order: FROM → WHERE → SELECT → ORDER BY), then ORDER BY sorts only the rows that survived the filter. This is efficient — you are sorting a potentially much smaller set of rows after filtering.</P>

      <SQLPlayground
        initialQuery={`-- Filter to delivered orders, then sort by amount descending
-- Only delivered orders are sorted — everything else was discarded by WHERE
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_status = 'Delivered'
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Gold and Platinum customers sorted by join date (most recent first)
SELECT first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier IN ('Gold', 'Platinum')
ORDER BY joined_date DESC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Dairy and Beverages products sorted by price, cheapest first
SELECT product_name, category, brand, unit_price
FROM products
WHERE category = 'Dairy' OR category = 'Beverages'
ORDER BY category ASC, unit_price ASC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- High-salary employees in management, sorted by hire date
SELECT first_name, last_name, role, salary, hire_date
FROM employees
WHERE salary > 50000
  AND department = 'Management'
ORDER BY salary DESC, hire_date ASC;`}
        height={140}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="ORDER BY and Performance" />

      <P>Sorting is not free — it has a cost that grows with the number of rows being sorted. Understanding this cost helps you write queries that stay fast even on large tables.</P>

      <H>How the database sorts</H>
      <P>When the database executes ORDER BY, it must compare rows to determine their relative order. For small result sets, this happens in memory (fast). For large result sets that do not fit in memory, the database writes temporary files to disk and performs a <Hl>disk-based sort</Hl> — significantly slower. This is one reason why LIMIT is often paired with ORDER BY: sort then take the top 10 is much faster than sort all 500 million rows and take the top 10.</P>

      <H>Indexes can eliminate sorting</H>
      <P>If the column you are sorting by has an index, and the index is ordered in the same direction as your ORDER BY, the database can read the index in order rather than sorting at all. This is called an <Hl>index scan in order</Hl> and avoids the sort step entirely. For frequently run queries that sort by the same column, an index on that column can make ORDER BY essentially free.</P>

      <H>Never rely on ORDER BY without LIMIT for large tables</H>
      <P>Sorting 500 million rows to present them in order is extremely expensive. In production, ORDER BY on a large table without LIMIT should always be paired with a WHERE clause that filters the rows down first, or be used only in reporting contexts where the user explicitly requested a sorted export.</P>

      <ProTip>
        In production SQL, ORDER BY is almost always combined with LIMIT — "give me the top 10 highest-value orders" or "the 5 most recent customers." Sorting the entire result set to return all rows in order is expensive. Sorting to find the top N rows is efficient when combined with LIMIT. You will learn LIMIT in Module 09 — use the two together from that point forward.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Practical ORDER BY Patterns — Real Business Examples" />

      <P>These are the ORDER BY patterns you will write most frequently in real work — each tied to a specific business context.</P>

      <H>Top N pattern — find the highest or lowest</H>

      <SQLPlayground
        initialQuery={`-- The 5 most expensive products
-- Top N: sort DESC, take the first N rows
SELECT product_name, category, brand, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- The 3 largest orders in the dataset
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY total_amount DESC
LIMIT 3;`}
        height={120}
        showSchema={false}
      />

      <H>Most recent records pattern</H>

      <SQLPlayground
        initialQuery={`-- The 10 most recently placed orders
-- Standard pattern for any operations dashboard
SELECT order_id, customer_id, store_id,
       order_date, order_status, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 10;`}
        height={140}
        showSchema={false}
      />

      <H>Alphabetical list pattern</H>

      <SQLPlayground
        initialQuery={`-- All stores alphabetically by city for a dropdown menu
SELECT store_id, store_name, city, manager_name
FROM stores
ORDER BY city ASC, store_name ASC;`}
        height={120}
        showSchema={false}
      />

      <H>Ranked within group pattern</H>

      <SQLPlayground
        initialQuery={`-- Products ranked by price within each category
-- Category sorted A-Z, then most expensive first within each
SELECT
  category,
  product_name,
  brand,
  unit_price
FROM products
ORDER BY category ASC, unit_price DESC;`}
        height={140}
        showSchema={false}
      />

      <H>Salary leaderboard pattern</H>

      <SQLPlayground
        initialQuery={`-- Employee salary ranking — highest paid overall
SELECT
  first_name || ' ' || last_name   AS employee,
  role,
  store_id,
  salary
FROM employees
ORDER BY salary DESC;`}
        height={130}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are an analyst at Nykaa, the beauty and fashion e-commerce platform. It is Monday morning. The merchandising team has three requests waiting in your inbox before the weekly review meeting at 10 AM.</P>

      <TimeBlock time="8:45 AM" label="Request 1 — Top selling categories report">
        The category manager wants a ranked list of product categories by total revenue — highest revenue category first. This is a standard reporting query she runs every Monday.
      </TimeBlock>

      <CodeBlock
        label="Top categories by revenue (adapted for FreshMart)"
        code={`-- Category revenue ranked highest to lowest
SELECT
  category,
  COUNT(oi.item_id)        AS total_items_sold,
  SUM(oi.line_total)       AS total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY category
ORDER BY total_revenue DESC;`}
      />

      <TimeBlock time="9:00 AM" label="Request 2 — Store performance sorted by target achievement">
        The operations director wants stores sorted by how close they are to their monthly target — stores furthest below target at the top so they can be prioritised for support.
      </TimeBlock>

      <CodeBlock
        label="Stores sorted by gap to monthly target"
        code={`-- Stores with largest gap to target first
-- (This uses concepts from upcoming modules — preview only)
SELECT
  store_id,
  store_name,
  city,
  monthly_target,
  -- actual_revenue would come from orders in a real query
  monthly_target  AS target_gap
FROM stores
ORDER BY monthly_target DESC;  -- simplified version`}
      />

      <TimeBlock time="9:15 AM" label="Request 3 — New customer list alphabetically for CRM import">
        The CRM team needs all customers who joined in 2023, sorted alphabetically by last name then first name — the format their import tool expects.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- New 2023 customers alphabetically — CRM import format
SELECT
  customer_id,
  last_name,
  first_name,
  email,
  city,
  joined_date
FROM customers
WHERE joined_date >= '2023-01-01'
  AND joined_date <  '2024-01-01'
ORDER BY last_name ASC, first_name ASC;`}
        height={160}
        showSchema={true}
      />

      <TimeBlock time="9:25 AM" label="All three delivered before the meeting">
        Three queries, three outputs in the format each team needs. The ORDER BY in each query is not cosmetic — it is what makes each report immediately usable without manual rearranging. The CRM team in particular needs alphabetical order because their import tool processes rows sequentially and the order determines how duplicates are handled.
      </TimeBlock>

      <ProTip>
        When delivering data to another team, always ask: "Does the order matter for how you will use this?" For CRM imports, dropdown menus, ranked reports, and dashboards — order almost always matters. For raw data dumps that will be processed programmatically — order usually does not matter. Asking saves you the round-trip of "can you re-sort this?"
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the default sort order of ORDER BY and how do you reverse it?">
        <p style={{ margin: '0 0 14px' }}>The default sort order of ORDER BY is ascending — ASC. For numeric columns, ascending means smallest to largest. For text columns, ascending means A to Z (lexicographic order based on the column's collation). For date and timestamp columns, ascending means oldest to newest. Writing ORDER BY column is identical to writing ORDER BY column ASC — the ASC keyword is optional but explicit and improves readability.</p>
        <p style={{ margin: '0 0 14px' }}>To reverse the sort order, add DESC (descending) after the column name: ORDER BY unit_price DESC sorts from highest to lowest price. ORDER BY order_date DESC sorts from newest to oldest — the standard for any "most recent first" dashboard. ORDER BY last_name DESC sorts Z to A.</p>
        <p style={{ margin: 0 }}>In a multi-column ORDER BY, each column has its own independent direction. ORDER BY category ASC, unit_price DESC sorts categories A to Z, and within each category sorts prices from highest to lowest. The ASC/DESC keyword applies to the immediately preceding column only.</p>
      </IQ>

      <IQ q="How does ORDER BY handle NULL values? How do you control where NULLs appear?">
        <p style={{ margin: '0 0 14px' }}>NULL handling in ORDER BY differs between database systems. In PostgreSQL and DuckDB, NULLs sort last in ascending order (they appear after all non-null values) and first in descending order (they appear before all non-null values). MySQL does the opposite: NULLs sort first in ascending order and last in descending order.</p>
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL and DuckDB, you can explicitly control NULL position using NULLS FIRST or NULLS LAST modifiers: ORDER BY delivery_date ASC NULLS LAST places nulls at the end even in ascending order. ORDER BY delivery_date DESC NULLS LAST places nulls at the end even in descending order — useful when you want real dates first and undelivered orders (NULL delivery_date) at the bottom regardless of sort direction.</p>
        <p style={{ margin: 0 }}>MySQL does not support NULLS FIRST / NULLS LAST syntax. The workaround is to sort by an IS NULL expression: ORDER BY (delivery_date IS NULL) ASC, delivery_date ASC. The IS NULL expression returns 0 for non-null values and 1 for null values, so sorting ASC on it puts non-nulls (0) before nulls (1). This technique works across all databases and is useful when writing cross-database compatible SQL.</p>
      </IQ>

      <IQ q="Can you use a SELECT alias in ORDER BY? Why or why not?">
        <p style={{ margin: '0 0 14px' }}>Yes, you can use a SELECT alias in ORDER BY, and this is one of the important differences between ORDER BY and WHERE. The reason is SQL's logical execution order: FROM runs first, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY last. Because ORDER BY executes after SELECT, the aliases defined in SELECT already exist by the time ORDER BY is evaluated. This makes ORDER BY alias_name perfectly valid.</p>
        <p style={{ margin: '0 0 14px' }}>For example: SELECT unit_price - cost_price AS margin FROM products ORDER BY margin DESC works correctly. The alias 'margin' is defined in SELECT, and ORDER BY can reference it because it runs after SELECT. This is cleaner than repeating the full expression: ORDER BY (unit_price - cost_price) DESC — both produce identical results, but the alias version is more readable especially for complex expressions.</p>
        <p style={{ margin: 0 }}>By contrast, you cannot use a SELECT alias in WHERE because WHERE runs before SELECT — the alias does not exist yet. WHERE margin {'>'} 100 would throw an error. You must repeat the full expression: WHERE (unit_price - cost_price) {'>'} 100. This asymmetry between WHERE (cannot use aliases) and ORDER BY (can use aliases) confuses many beginners, but it follows directly from the logical execution order.</p>
      </IQ>

      <IQ q="What happens when you ORDER BY multiple columns? Give a practical example.">
        <p style={{ margin: '0 0 14px' }}>When you ORDER BY multiple columns separated by commas, the database sorts by the first column. Among rows that have identical values in the first column — ties — it sorts by the second column. Among remaining ties, it sorts by the third column, and so on. Each column independently can be ASC or DESC.</p>
        <p style={{ margin: '0 0 14px' }}>A practical example: ORDER BY category ASC, unit_price DESC on a products table. The database first sorts all products alphabetically by category — Beverages, Dairy, Fruits, Household, Packaged Food, Personal Care, Staples, Vegetables. Within each category, products are sorted from most expensive to cheapest. A Beverages product at ₹270 appears before a Beverages product at ₹115, but both appear before any Dairy product.</p>
        <p style={{ margin: 0 }}>Multi-column ORDER BY is essential for any report where items are grouped by one dimension and ranked within those groups. Common real-world uses: ORDER BY store_id ASC, revenue DESC (each store's top products), ORDER BY department ASC, salary DESC (highest earner in each department), ORDER BY order_date DESC, order_id DESC (most recent orders, ties broken by ID). The second column only ever affects the relative order of rows that tied on the first column — if no ties exist on the first column, the second column has no effect.</p>
      </IQ>

      <IQ q="Does ORDER BY guarantee consistent results when rows have equal sort values?">
        <p style={{ margin: '0 0 14px' }}>No. When multiple rows have identical values in all ORDER BY columns — a complete tie — the database can return them in any order, and that order may change between query executions. SQL does not guarantee a deterministic result for tied rows unless you provide enough sort columns to uniquely distinguish every row.</p>
        <p style={{ margin: '0 0 14px' }}>This matters for pagination. If you use ORDER BY order_date DESC LIMIT 10 to get the first page of results, and then ORDER BY order_date DESC LIMIT 10 OFFSET 10 for the second page, any orders placed on the same date might appear on the wrong page or appear on both pages if the database reorders the ties between the two queries. The result is a silent data integrity issue in pagination systems.</p>
        <p style={{ margin: 0 }}>The fix is always to include a unique column as the final tiebreaker: ORDER BY order_date DESC, order_id DESC. Since order_id is the primary key and unique for every row, there are no ties and the order is completely deterministic. Every paginated query should end with the primary key as the final sort column to guarantee consistent, non-overlapping pages. This practice is called a stable sort and is standard in any production API that supports pagination.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'margin' does not exist — ORDER BY margin (when margin is not a SELECT alias)"
        cause="You referenced a name in ORDER BY that does not exist as a column in the table or as an alias in SELECT. This happens when you misspell an alias, when you try to sort by a column that exists in the table but is not included in your SELECT list (in some databases), or when you confuse a column name with a variable or calculated name."
        fix="Check that the alias name in ORDER BY exactly matches the alias defined in SELECT — including case if your database is case-sensitive for identifiers. If you want to sort by a calculated value that is not in SELECT, either add it to SELECT with an alias or repeat the full expression in ORDER BY: ORDER BY (unit_price - cost_price) DESC. In PostgreSQL you can sort by a column even if it is not in SELECT, but the column name must exactly match a column in the table."
      />

      <Err
        msg="Query results change order between runs — ORDER BY customer_id but ties on order_date"
        cause="You sorted by a column that has duplicate values (order_date in this example), and you did not include a tiebreaker column. When multiple rows have identical sort values, the database is free to return them in any order — and that order can change between executions depending on internal state, parallelism, and storage layout changes. This is not a bug — it is undefined behaviour that the database is permitted to resolve arbitrarily."
        fix="Always add a unique column as the final tiebreaker in ORDER BY. The primary key is almost always the right choice: ORDER BY order_date DESC, order_id DESC. With order_id as the final sort key, every row has a unique position in the result and the order is guaranteed to be identical on every execution. This is especially important for paginated results where inconsistent ordering causes rows to be skipped or duplicated across pages."
      />

      <Err
        msg="ORDER BY clause is out of position — ERROR: syntax error at or near 'ORDER'"
        cause="ORDER BY must be the last clause in a SELECT statement (before any LIMIT). Placing it before WHERE, before GROUP BY, or before HAVING causes a syntax error. This typically happens when editing a query and accidentally moving the ORDER BY block above another clause."
        fix="The correct clause order is: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT. ORDER BY must come after all filtering and grouping clauses. If you are building a query incrementally, always add ORDER BY as the second-to-last clause, followed by LIMIT as the absolute last. In most SQL editors, syntax highlighting will show ORDER BY in the wrong position as a different colour — look for the visual indicator before running."
      />

      <Err
        msg="NULL values appearing in unexpected position — NULLs at top instead of bottom in ASC sort"
        cause="You are using MySQL which sorts NULLs first in ascending order — the opposite of PostgreSQL. If your development database is PostgreSQL and your production database is MySQL (or vice versa), NULL sort behaviour will differ between environments. Queries that appear correct in development produce different output in production."
        fix="Use the database-appropriate syntax to control NULL position explicitly. In PostgreSQL/DuckDB: ORDER BY column ASC NULLS LAST. In MySQL (no NULLS LAST support): ORDER BY (column IS NULL) ASC, column ASC — the IS NULL expression produces 0 for non-null and 1 for null, so ascending sort puts non-nulls first. For cross-database compatible code, always use the CASE-based workaround: ORDER BY CASE WHEN column IS NULL THEN 1 ELSE 0 END ASC, column ASC — this works identically on PostgreSQL and MySQL."
      />

      <Err
        msg="Slow query — ORDER BY on a large table without WHERE takes minutes"
        cause="Sorting requires the database to process every row in the result set before returning any rows. Without a WHERE clause filtering the data first, the database must sort all rows in the table. On a table with millions of rows, a full sort of the entire table can take minutes — especially if the result does not fit in memory and requires a disk-based sort with temporary files."
        fix="Three solutions in order of preference. First, add a WHERE clause to filter the data before sorting — sorting 10,000 rows is orders of magnitude faster than sorting 50 million. Second, add LIMIT — ORDER BY column DESC LIMIT 10 lets the database use a heap sort optimisation that only tracks the top 10 rows, far cheaper than a full sort. Third, add an index on the sort column — if the column is already indexed in the required order, the database can read the index in order without sorting at all. Always check the query plan with EXPLAIN to understand which of these the database is doing."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshMart procurement team wants a product report for their weekly review. Write a query that returns all in-stock products sorted first by category alphabetically, then within each category by unit_price from highest to lowest. Show product_name, category, brand, unit_price, and a calculated column called margin that is unit_price minus cost_price. The report should only include products where the margin is greater than ₹30."
        hint="You need WHERE in_stock = true AND (unit_price - cost_price) > 30, then ORDER BY category ASC, unit_price DESC. The margin calculation goes in SELECT."
        answer={`SELECT
  product_name,
  category,
  brand,
  unit_price,
  unit_price - cost_price          AS margin
FROM products
WHERE in_stock = true
  AND (unit_price - cost_price) > 30
ORDER BY category ASC, unit_price DESC;`}
        explanation="This query combines WHERE filtering (in stock AND margin above ₹30), a SELECT calculation (unit_price - cost_price AS margin), and a two-column ORDER BY (category alphabetically, then price descending within each category). Notice that the WHERE condition repeats the margin expression — you cannot use the alias 'margin' in WHERE because WHERE runs before SELECT. The ORDER BY sorts by category first, and only when two products share the same category does unit_price determine their relative order."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Without ORDER BY, SQL returns rows in no guaranteed order — the same query can return rows in different order on different executions. Never rely on implicit ordering.',
          'ASC (ascending) is the default: smallest to largest for numbers, A to Z for text, oldest to newest for dates. DESC reverses this. Both keywords apply per column independently.',
          'Multi-column ORDER BY: sort by the first column, then break ties using the second column, then the third. Each column independently can be ASC or DESC.',
          'ORDER BY runs after SELECT in the execution order — so you can reference SELECT aliases in ORDER BY but not in WHERE.',
          'Sorting by expressions and calculated columns works: ORDER BY (unit_price - cost_price) DESC or ORDER BY margin DESC (using the alias).',
          'NULL handling differs by database: PostgreSQL/DuckDB sorts NULLs last in ASC and first in DESC. MySQL does the opposite. Use NULLS FIRST / NULLS LAST (PostgreSQL) or the IS NULL workaround (MySQL) to control NULL position explicitly.',
          'Always add a unique tiebreaker column (usually the primary key) as the final ORDER BY column when ties are possible — especially in paginated queries where inconsistent ordering causes duplicate or missing rows.',
          'ORDER BY without LIMIT on a large table is expensive — the database must sort all rows before returning any. Combine ORDER BY with WHERE (filter first) and LIMIT (take top N) for production performance.',
          'Indexes on sort columns can eliminate the sort step entirely — the database reads the index in order rather than sorting. For frequently sorted columns on large tables, an index makes ORDER BY essentially free.',
          'The standard production pattern: WHERE (filter rows) → ORDER BY (sort filtered rows) → LIMIT (take top N). These three clauses together are the foundation of almost every paginated list, leaderboard, and ranked report.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 09</strong>, you add LIMIT and OFFSET — controlling exactly how many rows come back and implementing pagination. Combined with ORDER BY from this module, LIMIT is how you build every "top 10," "most recent," and "next page" feature.
        </p>
        <Link href="/learn/sql/limit-fetch" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 09 → Limiting Results — LIMIT / OFFSET
        </Link>
      </div>

    </LearnLayout>
  );
}