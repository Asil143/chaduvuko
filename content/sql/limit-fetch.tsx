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

export default function LimitFetch() {
  return (
    <LearnLayout
      title="Limiting Results — LIMIT / OFFSET"
      description="Control exactly how many rows come back, implement pagination, and understand the performance implications of LIMIT on large tables"
      section="SQL — Module 09"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why You Almost Never Want All the Rows" />

      <P>Every query you have written so far returns every row that satisfies the WHERE condition. On the FreshCart database with 20 customers and 30 orders, that is fine. In a real production database at Swiggy, Flipkart, or Razorpay, the equivalent tables have tens of millions of rows. Returning all of them in a single query is not just slow — it can crash your application, exhaust database memory, and bring down services for other users.</P>

      <P>LIMIT is the clause that says: <Hl>"Stop after you have returned N rows."</Hl> It is one of the most important performance tools in SQL. Combined with ORDER BY from Module 08, LIMIT lets you efficiently answer questions like:</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', margin: '20px 0 28px' }}>
        {[
          'What are the 10 best-selling products this week?',
          'Show me the 5 most recent orders for this customer.',
          'Which 3 stores had the highest revenue last month?',
          'Give me page 2 of the customer list (items 11–20).',
          'What is the single most expensive product we sell?',
        ].map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 4 ? 10 : 0 }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 13, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{q}</span>
          </div>
        ))}
      </div>

      <P>All five of these require LIMIT. Without it, answering "the top 10" means sorting all 10 million rows and reading them all — with LIMIT 10, the database stops as soon as it has found 10 qualifying rows.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="LIMIT — The Syntax and What It Does" />

      <P>LIMIT takes a single integer — the maximum number of rows to return. It is always the last clause in a query, after ORDER BY.</P>

      <CodeBlock
        label="LIMIT syntax"
        code={`SELECT columns
FROM table
WHERE condition
ORDER BY column
LIMIT n;           -- return at most n rows`}
      />

      <SQLPlayground
        initialQuery={`-- Return only the first 5 customers
-- Without ORDER BY, the 5 rows are in storage order (unpredictable)
SELECT customer_id, first_name, last_name, city
FROM customers
LIMIT 5;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- The 5 most expensive products
-- ORDER BY first, LIMIT after — this is the correct pattern
SELECT product_name, category, brand, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- The single highest-value order
-- LIMIT 1 is extremely common for "find the maximum record"
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY total_amount DESC
LIMIT 1;`}
        height={130}
        showSchema={false}
      />

      <H>LIMIT does not guarantee which rows you get — ORDER BY does</H>

      <P>This is the most important thing to understand about LIMIT. <Hl>LIMIT without ORDER BY returns an arbitrary set of rows</Hl> — whichever rows the database happens to encounter first in its internal scan. Two identical queries can return different rows if the storage layout changes. LIMIT alone answers "give me any N rows." ORDER BY + LIMIT answers "give me the top N rows by this criterion." Always combine them.</P>

      <SQLPlayground
        initialQuery={`-- LIMIT without ORDER BY: arbitrary rows, unpredictable which ones
-- Only useful for "show me any sample of the data"
SELECT product_name, unit_price
FROM products
LIMIT 5;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- LIMIT with ORDER BY: the specific top N rows you wanted
-- Deterministic: same result every time (assuming data does not change)
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5;`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="OFFSET — Skip N Rows Before Returning" />

      <P>OFFSET tells the database to skip a specified number of rows before starting to return results. OFFSET is almost always used with LIMIT together — LIMIT says how many rows to return, OFFSET says how many to skip first.</P>

      <CodeBlock
        label="OFFSET syntax"
        code={`SELECT columns
FROM table
ORDER BY column
LIMIT n OFFSET m;    -- skip m rows, then return n rows`}
      />

      <SQLPlayground
        initialQuery={`-- All 25 products in order of price
-- Reference: see the full list before paginating
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Page 1: products 1-5 (most expensive first)
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5 OFFSET 0;     -- skip 0, return 5`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Page 2: products 6-10
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5 OFFSET 5;     -- skip 5, return 5`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Page 3: products 11-15
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5 OFFSET 10;    -- skip 10, return 5`}
        height={110}
        showSchema={false}
      />

      <P>The pattern is clear: for page number P with page size N, the OFFSET is <Hl>(P - 1) × N</Hl>. Page 1 → OFFSET 0. Page 2 → OFFSET 5. Page 3 → OFFSET 10. Page 4 → OFFSET 15. This is how every paginated list in every application works at the SQL level.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Pagination — Building Page-by-Page Navigation" />

      <P>Pagination is how applications display large datasets in manageable chunks — 10 results per page, 20 per page, 50 per page. The SQL behind every paginated list is LIMIT + OFFSET + ORDER BY.</P>

      <H>The pagination formula</H>

      <CodeBlock
        label="Pagination formula — any page, any page size"
        code={`-- Variables:
--   page_size = number of rows per page (e.g. 10)
--   page_number = which page (starting from 1)
--
-- OFFSET = (page_number - 1) * page_size

-- Page 1 of customers (10 per page)
SELECT customer_id, first_name, last_name, city, loyalty_tier
FROM customers
ORDER BY customer_id ASC
LIMIT 10 OFFSET 0;     -- (1-1) * 10 = 0

-- Page 2
LIMIT 10 OFFSET 10;    -- (2-1) * 10 = 10

-- Page 3
LIMIT 10 OFFSET 20;    -- (3-1) * 10 = 20

-- Page N
LIMIT 10 OFFSET (N-1)*10;`}
      />

      <SQLPlayground
        initialQuery={`-- FreshCart has 30 orders. Show them 8 per page.
-- Page 1: orders 1-8 (most recent first)
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 8 OFFSET 0;`}
        height={150}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Page 2: orders 9-16
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 8 OFFSET 8;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Page 3: orders 17-24
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY order_date DESC, order_id DESC
LIMIT 8 OFFSET 16;`}
        height={150}
        showSchema={false}
      />

      <H>How many pages are there? — COUNT with LIMIT</H>

      <P>To know how many total pages exist, you need to know the total row count. Applications typically run two queries: one for the total count (to calculate total pages), and one with LIMIT + OFFSET for the actual data.</P>

      <SQLPlayground
        initialQuery={`-- Total row count — used to calculate number of pages
-- total_pages = CEIL(total_rows / page_size)
SELECT COUNT(*) AS total_orders
FROM orders;
-- With 30 orders and 8 per page: CEIL(30/8) = 4 pages`}
        height={100}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Syntax Variations Across Databases" />

      <P>LIMIT and OFFSET are supported in PostgreSQL, MySQL, SQLite, and DuckDB (the playground). SQL Server and Oracle use different syntax — important to know when working in enterprise environments.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Database', 'Syntax', 'Notes'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL / MySQL / SQLite / DuckDB', 'LIMIT n OFFSET m', 'Most common. OFFSET is optional — omit it for no skipping.'],
              ['PostgreSQL (alternative)', 'LIMIT n OFFSET m  or  FETCH FIRST n ROWS ONLY', 'PostgreSQL supports both syntaxes.'],
              ['SQL Server', 'ORDER BY col OFFSET m ROWS FETCH NEXT n ROWS ONLY', 'OFFSET and FETCH are mandatory together. ORDER BY is required.'],
              ['Oracle (12c+)', 'FETCH FIRST n ROWS ONLY  or  OFFSET m ROWS FETCH NEXT n ROWS ONLY', 'Modern Oracle uses FETCH. Older Oracle used ROWNUM workarounds.'],
              ['MySQL (alternative)', 'LIMIT m, n', 'Reversed order: skip m rows, return n. Confusing — avoid this form.'],
            ].map(([db, syntax, note], i) => (
              <tr key={db} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{db}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{syntax}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        label="The same query — four different database syntaxes"
        code={`-- PostgreSQL / MySQL / SQLite / DuckDB
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5 OFFSET 10;

-- SQL Server
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY;

-- Oracle 12c+
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY;

-- MySQL shorthand (avoid — confusing argument order)
SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 10, 5;    -- skip 10, return 5 — reversed from LIMIT n OFFSET m`}
      />

      <Callout type="tip">
        If you work at a company using SQL Server (common in banking and large enterprise), memorise the OFFSET...FETCH NEXT syntax. It is more verbose but follows the SQL standard more closely than LIMIT. If you later switch to PostgreSQL, both syntaxes work there — PostgreSQL supports both LIMIT/OFFSET and FETCH NEXT.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="LIMIT and Performance — How the Database Executes It" />

      <P>Understanding what happens inside the database when you add LIMIT explains why it can dramatically speed up queries — and also why it sometimes does not help as much as you expect.</P>

      <H>How LIMIT helps — early termination</H>
      <P>When the database executes ORDER BY column DESC LIMIT 10, it does not necessarily sort all rows first. If the sort column has an index, the database can read the index in reverse order, take the first 10 entries, and stop — never reading the rest of the table. This is called <Hl>early termination</Hl> and makes LIMIT with an indexed ORDER BY column essentially free regardless of table size.</P>

      <P>Even without an index, the database uses a <Hl>top-N heap sort</Hl> optimisation — it maintains a sorted buffer of only N rows as it scans the table, discarding any row that would not make the top N. This is far cheaper than sorting all rows and then taking the first N.</P>

      <H>When LIMIT does NOT help</H>
      <P>LIMIT does not help when it is combined with a large OFFSET. To execute LIMIT 10 OFFSET 990000 (page 99,001 of a 10-per-page list), the database must still process 990,010 rows to find which 10 to return — it skips 990,000 but it has to count through all of them first. Deep pagination with large OFFSETs is expensive regardless of how small the LIMIT is. This is called the <Hl>deep pagination problem</Hl> and is why applications like Twitter and Instagram use cursor-based pagination rather than OFFSET-based pagination for very large datasets.</P>

      <H>LIMIT is not a substitute for WHERE</H>
      <P>A common beginner mistake: using LIMIT to make a query "fast" without adding a WHERE clause. LIMIT 10 on a 500-million-row table without WHERE still triggers a full table scan — the database reads pages from the start until it finds 10 rows, which happens quickly if those rows are near the beginning. But if the ORDER BY requires a sort (no index), all 500 million rows must be processed before LIMIT can take effect. <Hl>WHERE filters early. LIMIT cuts late.</Hl> They serve different purposes and are most powerful together.</P>

      <SQLPlayground
        initialQuery={`-- Good: WHERE filters first (potentially uses index),
-- ORDER BY sorts the small filtered set,
-- LIMIT takes the top N from the already-small set
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_status = 'Delivered'     -- filter first
ORDER BY total_amount DESC           -- sort the filtered rows
LIMIT 5;                             -- take top 5`}
        height={150}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Cursor-Based Pagination — The Production Alternative" />

      <P>OFFSET-based pagination has a fundamental problem at scale: as the offset grows, performance degrades. Page 1 is fast. Page 10,000 is slow. There is also a data consistency issue — if new rows are inserted while a user is paginating, rows can shift, causing duplicates or skipped items across pages.</P>

      <P>The production alternative for large-scale pagination is <Hl>cursor-based pagination</Hl> (also called keyset pagination). Instead of "skip N rows," you say "give me the next N rows after this specific ID." Because the primary key is always indexed, the WHERE clause jumps directly to the right position regardless of how deep into the dataset you are.</P>

      <CodeBlock
        label="Cursor-based pagination — production pattern"
        code={`-- Page 1: first 10 orders
SELECT order_id, order_date, total_amount
FROM orders
ORDER BY order_id ASC
LIMIT 10;
-- Last order_id returned: 1010 (the cursor)

-- Page 2: next 10 orders AFTER order_id 1010
SELECT order_id, order_date, total_amount
FROM orders
WHERE order_id > 1010      -- the cursor from page 1
ORDER BY order_id ASC
LIMIT 10;
-- Last order_id returned: 1020 (new cursor)

-- Page 3: next 10 after order_id 1020
SELECT order_id, order_date, total_amount
FROM orders
WHERE order_id > 1020
ORDER BY order_id ASC
LIMIT 10;`}
      />

      <SQLPlayground
        initialQuery={`-- Cursor pagination on FreshCart orders
-- Page 1: first 8 orders
SELECT order_id, customer_id, order_date, total_amount
FROM orders
ORDER BY order_id ASC
LIMIT 8;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Page 2: next 8 orders after order_id 1008
-- WHERE replaces OFFSET — much faster on large tables
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_id > 1008
ORDER BY order_id ASC
LIMIT 8;`}
        height={130}
        showSchema={false}
      />

      <P>Cursor-based pagination is <Hl>O(1)</Hl> — the same speed on page 1 as on page 1,000,000, because the WHERE condition on the primary key always does an index lookup. OFFSET-based pagination is <Hl>O(n)</Hl> — proportional to how deep you are in the dataset. For applications serving millions of users with infinite scroll (Twitter, Instagram, Flipkart product listings), cursor-based pagination is the only viable approach.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Common LIMIT Patterns in Production" />

      <P>These are the patterns you will write most often in real work.</P>

      <H>Top N — leaderboards and rankings</H>

      <SQLPlayground
        initialQuery={`-- Top 3 highest-value orders
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
ORDER BY total_amount DESC
LIMIT 3;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Top 5 most expensive products in stock
SELECT product_name, category, brand, unit_price
FROM products
WHERE in_stock = true
ORDER BY unit_price DESC
LIMIT 5;`}
        height={120}
        showSchema={false}
      />

      <H>Most recent N records</H>

      <SQLPlayground
        initialQuery={`-- The 5 most recently joined customers
SELECT customer_id, first_name, last_name,
       city, loyalty_tier, joined_date
FROM customers
ORDER BY joined_date DESC
LIMIT 5;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- The 3 most recent orders for store ST001
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
WHERE store_id = 'ST001'
ORDER BY order_date DESC, order_id DESC
LIMIT 3;`}
        height={130}
        showSchema={false}
      />

      <H>Single record lookup — the top 1 pattern</H>

      <SQLPlayground
        initialQuery={`-- The employee with the highest salary
SELECT first_name, last_name, role, salary, store_id
FROM employees
ORDER BY salary DESC
LIMIT 1;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- The cheapest product currently in stock
SELECT product_name, category, brand, unit_price
FROM products
WHERE in_stock = true
ORDER BY unit_price ASC
LIMIT 1;`}
        height={110}
        showSchema={false}
      />

      <H>Sampling — get a random representative subset</H>

      <SQLPlayground
        initialQuery={`-- A sample of 10 products for manual QA review
-- Without ORDER BY: arbitrary rows, good for sampling
SELECT product_id, product_name, category, unit_price
FROM products
LIMIT 10;`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Meesho building the product listing API. The product manager asks you to implement the product catalogue endpoint — it needs to support pagination, filtering by category, and sorting by price. This is a classic LIMIT + OFFSET API implementation.</P>

      <TimeBlock time="10:00 AM" label="Requirements arrive">
        The API endpoint is GET /products with query parameters: category (optional filter), sort_by (price_asc or price_desc), page (page number, default 1), and page_size (rows per page, default 20 max 50). It needs to return the products for the requested page plus metadata: total_count, total_pages, current_page, has_next_page.
      </TimeBlock>

      <TimeBlock time="10:20 AM" label="You design the SQL queries">
        Two queries per API call — one for total count, one for the page data.
      </TimeBlock>

      <CodeBlock
        label="Count query — for total_pages calculation"
        code={`-- Count query (runs first, fast with WHERE on indexed column)
SELECT COUNT(*) AS total_count
FROM products
WHERE in_stock = true
  AND category = :category;   -- optional, parameterised

-- If category is null/empty: omit the AND clause
-- Result used to calculate: total_pages = CEIL(total_count / page_size)`}
      />

      <CodeBlock
        label="Data query — with LIMIT and OFFSET"
        code={`-- Data query (parameterised, safe from SQL injection)
SELECT
  product_id,
  product_name,
  brand,
  unit_price,
  unit,
  in_stock
FROM products
WHERE in_stock = true
  AND (:category IS NULL OR category = :category)
ORDER BY
  CASE WHEN :sort_by = 'price_asc'  THEN unit_price END ASC,
  CASE WHEN :sort_by = 'price_desc' THEN unit_price END DESC
LIMIT :page_size
OFFSET (:page - 1) * :page_size;`}
      />

      <TimeBlock time="11:00 AM" label="Testing pagination correctness">
        You verify page boundaries: with 25 in-stock products and page_size = 10, page 1 should have 10, page 2 should have 10, page 3 should have 5. You test LIMIT 10 OFFSET 0, OFFSET 10, and OFFSET 20 against the full list to confirm no products are duplicated or skipped. Getting the OFFSET formula wrong (common bug: using page number instead of page number - 1) causes the first item to always be skipped.
      </TimeBlock>

      <TimeBlock time="11:30 AM" label="Performance check">
        You run EXPLAIN on the data query with a category filter and confirm the database is using the index on (category, unit_price). With the index, even a 10-million-product catalogue returns page 1 in under 5 milliseconds. Deep pagination (page 500) is slower — you flag this in the PR and suggest cursor-based pagination if usage data shows users browsing beyond page 20.
      </TimeBlock>

      <ProTip>
        In any API that serves paginated data, always return metadata alongside the data: total_count, total_pages, current_page, and has_next_page. The frontend needs total_count to render pagination controls. has_next_page is cheaper to compute than total_count for cursor-based pagination and is sufficient for infinite scroll. Never make the frontend calculate pagination state from the raw data.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does LIMIT do and why is ORDER BY important when using it?">
        <p style={{ margin: '0 0 14px' }}>LIMIT restricts the number of rows returned by a query to at most the specified number. If the query would normally return 10,000 rows, LIMIT 10 returns only 10. LIMIT is evaluated last in the SQL execution order — after FROM, WHERE, GROUP BY, HAVING, SELECT, and ORDER BY — so it cuts the final result set after all other processing is complete.</p>
        <p style={{ margin: '0 0 14px' }}>ORDER BY is critical when using LIMIT because without it, LIMIT returns an arbitrary set of rows — whichever rows the database encounters first in its internal storage scan. This order is non-deterministic and can vary between executions as storage layouts change. LIMIT 10 without ORDER BY answers "give me any 10 rows," which is useful only for sampling. LIMIT 10 with ORDER BY unit_price DESC answers "give me the 10 most expensive rows" — a specific, reproducible, meaningful result.</p>
        <p style={{ margin: 0 }}>The combination ORDER BY column DESC LIMIT n is also a performance pattern: if the sort column has an index, the database reads the index in order and stops after n rows — never reading the rest of the table. Without an index, the database uses a top-N heap sort that is far cheaper than a full sort followed by truncation. In both cases, LIMIT + ORDER BY is much more efficient than returning all rows and discarding most of them in application code.</p>
      </IQ>

      <IQ q="How does OFFSET work and what is the pagination formula?">
        <p style={{ margin: '0 0 14px' }}>OFFSET tells the database to skip a specified number of rows before starting to return results. LIMIT 10 OFFSET 20 skips the first 20 rows and returns the next 10 — rows 21 through 30. OFFSET is almost always used with LIMIT. Without LIMIT, OFFSET alone means "skip these rows and return everything remaining" — useful occasionally but not the standard use case.</p>
        <p style={{ margin: '0 0 14px' }}>The pagination formula for page-based navigation: OFFSET = (page_number - 1) × page_size. For a 10-items-per-page list: page 1 → OFFSET 0, page 2 → OFFSET 10, page 3 → OFFSET 20, page N → OFFSET (N-1)×10. The query structure is always: SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT page_size OFFSET (page_number - 1) * page_size.</p>
        <p style={{ margin: 0 }}>To know how many total pages exist: run a separate SELECT COUNT(*) with the same WHERE clause, then calculate total_pages = CEIL(total_count / page_size). Applications typically run both queries per page request — the count query for the pagination controls and the data query for the actual rows. This two-query pattern is standard in REST APIs, GraphQL resolvers, and database-backed dashboards.</p>
      </IQ>

      <IQ q="What is the deep pagination problem and how do you solve it?">
        <p style={{ margin: '0 0 14px' }}>The deep pagination problem is the performance degradation that occurs with large OFFSET values. To execute LIMIT 10 OFFSET 990000, the database must process 990,010 rows — skip 990,000 and return 10. Even though only 10 rows are returned, the work of scanning through 990,000 rows cannot be avoided. Performance degrades linearly with OFFSET size: page 1 takes 1ms, page 100,000 takes 100,000ms. On tables with billions of rows, deep pagination with large OFFSETs becomes functionally unusable.</p>
        <p style={{ margin: '0 0 14px' }}>The solution is cursor-based pagination (also called keyset pagination). Instead of "skip N rows," use "give me rows after this specific cursor value." For example, instead of LIMIT 10 OFFSET 990000, store the last order_id from the previous page (say, order_id = 991000) and run: WHERE order_id {'>'} 991000 ORDER BY order_id ASC LIMIT 10. Because order_id is the primary key and always indexed, this WHERE clause does a direct index lookup regardless of how deep into the table it is — O(1) performance on page 1 and page 1,000,000 alike.</p>
        <p style={{ margin: 0 }}>The trade-off: cursor-based pagination cannot jump to an arbitrary page number (you cannot say "go to page 5000" without knowing the cursor for page 4999). It only supports "next page" and sometimes "previous page." This is why Instagram, Twitter, and product catalogues with infinite scroll use cursor-based pagination — users always go next, never jump to page 5000. Admin dashboards and reports where users need to jump to specific pages sometimes still use OFFSET despite the performance cost, accepting the trade-off for the UX benefit.</p>
      </IQ>

      <IQ q="What is the difference between LIMIT and WHERE for controlling result size?">
        <p style={{ margin: '0 0 14px' }}>WHERE and LIMIT both reduce the number of rows returned, but they operate at fundamentally different points in the execution pipeline and serve entirely different purposes. WHERE is a filter — it specifies which rows qualify to be in the result at all, based on their values. It runs early in the execution order (after FROM, before GROUP BY, SELECT, ORDER BY) and can use indexes to avoid reading rows that do not match. WHERE changes which rows are in the result set.</p>
        <p style={{ margin: '0 0 14px' }}>LIMIT is a cap — it stops returning rows after the specified count regardless of how many qualifying rows remain. It runs last in the execution order, after all other processing including ORDER BY. LIMIT does not filter based on values — it simply truncates the result at N rows. LIMIT changes how many rows from the result set are returned to the caller, not which rows qualify.</p>
        <p style={{ margin: 0 }}>Performance implication: WHERE on an indexed column can reduce the rows the database processes from billions to hundreds — a massive speedup applied early. LIMIT reduces the rows returned to the caller but the database may still process many rows to find them, especially without an index or with a large OFFSET. A query with no WHERE and LIMIT 10 on a billion-row table without an appropriate index still scans the full table (or sorts it). Always use WHERE to filter the relevant data, then LIMIT to cap the output size. They are complementary, not interchangeable.</p>
      </IQ>

      <IQ q="How is LIMIT / OFFSET syntax different across databases?">
        <p style={{ margin: '0 0 14px' }}>LIMIT n OFFSET m is the most common syntax and works in PostgreSQL, MySQL, SQLite, DuckDB, and MariaDB. OFFSET is optional — LIMIT n alone returns the first n rows with no skipping. This syntax is clean and widely understood, making it the de facto standard for most modern development.</p>
        <p style={{ margin: '0 0 14px' }}>SQL Server uses a different syntax that is part of the SQL standard: ORDER BY column OFFSET m ROWS FETCH NEXT n ROWS ONLY. Important: SQL Server requires ORDER BY when using OFFSET/FETCH — you cannot use it without specifying a sort order. Oracle 12c and later uses the same FETCH NEXT syntax. Older Oracle versions (pre-12c) required a ROWNUM workaround: SELECT * FROM (SELECT *, ROWNUM rn FROM table WHERE ROWNUM {'<'}= n + m) WHERE rn {'>'} m — cumbersome and now rarely needed.</p>
        <p style={{ margin: 0 }}>MySQL has a shorthand form LIMIT m, n where the first argument is the offset and the second is the count — the reverse of LIMIT n OFFSET m. This form is valid MySQL but widely considered confusing because the argument order is counterintuitive. Avoid it in shared codebases. PostgreSQL supports both LIMIT/OFFSET and FETCH NEXT, making it compatible with both MySQL-style and SQL Server-style code. When writing SQL that must run on multiple database types, use FETCH FIRST n ROWS ONLY (no offset) or OFFSET m ROWS FETCH NEXT n ROWS ONLY — these are part of the SQL standard and work on PostgreSQL, SQL Server, Oracle, and DB2.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: syntax error at or near 'LIMIT' — SELECT ... FROM ... LIMIT 10 WHERE status = 'Delivered'"
        cause="LIMIT is placed before WHERE in the query, but LIMIT must always be the last clause (or second to last, before a final FETCH). The correct order is: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT. Placing LIMIT anywhere else causes a syntax error because the parser expects WHERE before any result-limiting clauses."
        fix="Always write LIMIT as the very last clause: SELECT ... FROM ... WHERE status = 'Delivered' ORDER BY order_date DESC LIMIT 10. If you are also using OFFSET, LIMIT comes before OFFSET: LIMIT 10 OFFSET 20. Check your clause order whenever you see a syntax error near LIMIT — 90% of the time it is a clause ordering issue."
      />

      <Err
        msg="LIMIT 10 returns different rows on different runs — results are inconsistent"
        cause="You used LIMIT without ORDER BY. Without an explicit sort order, the database returns rows in whatever order its internal storage or execution plan produces, which is non-deterministic and can change between runs as storage changes, parallel execution varies, or buffer cache state differs. Two identical LIMIT 10 queries without ORDER BY may return completely different rows."
        fix="Always combine LIMIT with ORDER BY when you need a specific set of rows: LIMIT 10 ORDER BY order_date DESC returns the 10 most recent orders consistently. If you genuinely want a random sample with no specific order (e.g. for QA testing), that is the only legitimate case for LIMIT without ORDER BY — and even then, document in a comment that the random order is intentional."
      />

      <Err
        msg="Pagination returns duplicate rows — same product appears on both page 1 and page 2"
        cause="The ORDER BY columns used for pagination have duplicate values (ties), and no unique tiebreaker column is included. When two rows have identical values in all ORDER BY columns, the database can return them in any order — and the order may differ between the page 1 query and the page 2 query. A row that appeared at position 10 (end of page 1) may shift to position 11 (start of page 2) in the next query, causing it to appear on both pages."
        fix="Always add the primary key as the final ORDER BY column: ORDER BY order_date DESC, order_id DESC. Since order_id is unique for every row, there are no ties and every row has a fixed, deterministic position in the result. This guarantees that LIMIT 10 OFFSET 0, LIMIT 10 OFFSET 10, and LIMIT 10 OFFSET 20 return perfectly non-overlapping pages with no duplicates or gaps."
      />

      <Err
        msg="Page 2 is empty even though there are 15 rows — LIMIT 10 OFFSET 10 returns nothing"
        cause="The OFFSET value is too large — either because the total row count is less than the offset, or (the more common bug) the page number was used directly as the offset instead of (page_number - 1) * page_size. If page_size = 10 and the user requests page 2, the offset should be (2-1)*10 = 10. If the code incorrectly uses page_number directly as the offset: LIMIT 10 OFFSET 2 returns rows 3-12 for page 2 (not page 2 at all), LIMIT 10 OFFSET 10 returns rows 11-20 for page 10 (wrong page), and eventually the offset exceeds the total row count returning nothing."
        fix="Verify the pagination formula: OFFSET = (page_number - 1) * page_size. For page_number = 2, page_size = 10: OFFSET = (2-1)*10 = 10. Run the count query first: SELECT COUNT(*) FROM table WHERE ...; confirm the total. Then manually verify LIMIT 10 OFFSET 0 returns rows 1-10, LIMIT 10 OFFSET 10 returns rows 11-15 (and shows 5 rows, not 10, because there are only 15 total). If any of these return unexpected counts, the OFFSET formula is wrong."
      />

      <Err
        msg="Deep pagination is extremely slow — LIMIT 20 OFFSET 500000 takes 30 seconds"
        cause="Large OFFSET values are expensive because the database must count through all skipped rows before returning results. To execute OFFSET 500000, the database processes 500,020 rows — it cannot jump directly to row 500,001 without counting. This is O(offset) complexity, meaning performance degrades linearly as users paginate deeper into the dataset. The query plan shows a Sequential Scan or full index scan over hundreds of thousands of rows."
        fix="Switch to cursor-based pagination: instead of LIMIT 20 OFFSET 500000, store the last id from the previous page and use WHERE id > last_id ORDER BY id ASC LIMIT 20. This WHERE condition on the primary key does an O(1) index lookup regardless of depth — page 25,000 is as fast as page 1. If OFFSET-based pagination must be retained (e.g. users need to jump to specific page numbers), add a covering index on the sort column, limit the maximum allowed page depth, or pre-compute and cache deep pages during off-peak hours."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart mobile app shows customers a 'Recent Orders' screen with 4 orders per page. Write the SQL for page 1 and page 2 of all delivered orders, sorted by most recent first. Also write the query to find how many total pages the customer needs to scroll through."
        hint="Page 1: LIMIT 4 OFFSET 0. Page 2: LIMIT 4 OFFSET 4. For total pages: SELECT COUNT(*) FROM orders WHERE order_status = 'Delivered' — then divide by 4 and round up."
        answer={`-- Total count (to calculate number of pages)
SELECT COUNT(*) AS total_delivered
FROM orders
WHERE order_status = 'Delivered';
-- Result: 18 delivered orders → CEIL(18/4) = 5 pages

-- Page 1: most recent 4 delivered orders
SELECT order_id, customer_id, order_date,
       delivery_date, total_amount
FROM orders
WHERE order_status = 'Delivered'
ORDER BY order_date DESC, order_id DESC
LIMIT 4 OFFSET 0;

-- Page 2: next 4 delivered orders
SELECT order_id, customer_id, order_date,
       delivery_date, total_amount
FROM orders
WHERE order_status = 'Delivered'
ORDER BY order_date DESC, order_id DESC
LIMIT 4 OFFSET 4;`}
        explanation="Three queries together implement a complete pagination system. The count query tells the app how many total pages to show in the UI. The data queries use LIMIT 4 with increasing OFFSET (0, 4, 8, 12, 16) to retrieve each page. ORDER BY order_date DESC, order_id DESC guarantees consistent ordering with no ties — the order_id tiebreaker ensures no order appears on two pages or gets skipped between pages. The WHERE order_status = 'Delivered' filter applies before sorting and paging, so only delivered orders count toward page numbers and are returned in results."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'LIMIT n returns at most n rows from the result. It is always the last clause in a query, executed after ORDER BY.',
          'LIMIT without ORDER BY returns arbitrary rows — non-deterministic and changes between runs. Always combine LIMIT with ORDER BY to get a specific, reproducible set of rows.',
          'OFFSET m skips the first m rows before returning results. Used with LIMIT for pagination: LIMIT page_size OFFSET (page_number - 1) * page_size.',
          'Pagination formula: OFFSET = (page_number - 1) × page_size. Page 1 → OFFSET 0. Page 2 → OFFSET page_size. Page N → OFFSET (N-1) × page_size.',
          'Always add the primary key as the final ORDER BY tiebreaker for paginated queries — guarantees no duplicate or skipped rows across pages.',
          'Deep pagination with large OFFSET values is slow — the database must count through all skipped rows. LIMIT 10 OFFSET 1000000 processes 1,000,010 rows.',
          'Cursor-based pagination (WHERE id > last_cursor ORDER BY id LIMIT n) solves deep pagination — O(1) performance regardless of depth because the WHERE on the primary key uses an index lookup.',
          'LIMIT is not a substitute for WHERE. LIMIT cuts after processing. WHERE filters before processing. Use WHERE to reduce the dataset, then LIMIT to cap the output.',
          'Syntax varies by database: LIMIT n OFFSET m (PostgreSQL/MySQL/SQLite/DuckDB), OFFSET m ROWS FETCH NEXT n ROWS ONLY (SQL Server/Oracle 12c+).',
          'For paginated APIs, always return metadata: total_count, total_pages, current_page, has_next_page. The frontend needs this to render pagination controls.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 10</strong>, you learn DISTINCT — how to remove duplicate rows from your results, when to use it, and the performance cost it carries on large tables.
        </p>
        <Link href="/learn/sql/distinct" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 10 → Removing Duplicates — DISTINCT
        </Link>
      </div>

    </LearnLayout>
  );
}