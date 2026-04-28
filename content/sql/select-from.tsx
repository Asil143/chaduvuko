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

export default function SelectFrom() {
  return (
    <LearnLayout
      title="Your First Query — SELECT & FROM"
      description="The two most important words in SQL — what they mean, how the database executes them, and every variation you will use in the real world"
      section="SQL — Module 05"
      readTime="10–14 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Two Words That Run the World's Data" />

      <P>Every piece of data you have ever seen on a screen — your bank balance, your DoorDash order history, your Robinhood portfolio, your Instagram feed — was retrieved from a database using a query that starts with the same two words: <Hl>SELECT</Hl> and <Hl>FROM</Hl>.</P>

      <P>SELECT and FROM are not just beginner syntax that you graduate past. They are the foundation of every SQL query ever written, from the simplest lookup to the most complex analytical pipeline. A senior data engineer at a FAANG company writes SELECT and FROM a hundred times a day. Understanding them deeply — not just mechanically, but knowing what the database actually does when it sees them — makes every SQL concept that follows easier to learn.</P>

      <P>Here is the simplest possible SQL query:</P>

      <CodeBlock
        label="The anatomy of a SELECT query"
        code={`SELECT first_name, last_name, city
FROM   customers;`}
      />

      <P>Two lines. Two words. This query asks the FreshCart database one question: <em>"Give me the first_name, last_name, and city columns from every row in the customers table."</em> The database reads every row in customers, extracts those three columns, and returns the result. That is all SELECT and FROM do — and they do it for everything from 5 rows to 5 billion rows.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="What SELECT and FROM Actually Mean" />

      <H>FROM — tell the database where to look</H>
      <P>FROM is actually executed <Hl>before</Hl> SELECT, even though it is written after it. The database reads FROM first and identifies which table (or tables) to work with. FROM is the source — it tells the database where to find the data.</P>

      <P>Think of FROM as walking into the right filing cabinet. If you need customer information, you go to the customers drawer. If you need order information, you go to the orders drawer. You declare this in FROM. Everything else in the query operates on whatever FROM points at.</P>

      <CodeBlock
        label="FROM — declaring the source"
        code={`-- FROM tells the database which table to work with
FROM customers       -- work with the customers table
FROM orders          -- work with the orders table
FROM products        -- work with the products table
FROM order_items     -- work with the order_items table`}
      />

      <H>SELECT — tell the database what to return</H>
      <P>After FROM identifies the table, SELECT specifies which columns from that table to include in the result. SELECT is a <Hl>projection</Hl> — it narrows the output from all available columns to only the ones you asked for. A table might have 10 columns. SELECT lets you return 1, 3, or all 10 — your choice, every query.</P>

      <CodeBlock
        label="SELECT — choosing which columns to return"
        code={`-- Return only the first_name column
SELECT first_name
FROM customers;

-- Return three specific columns
SELECT first_name, last_name, city
FROM customers;

-- Return all columns (the * wildcard)
SELECT *
FROM customers;`}
      />

      <H>The order SQL is written vs the order it is executed</H>
      <P>This is one of the most important things to understand early. SQL queries are written in a specific order that does not match how the database executes them. Many confusing errors and surprising results come from misunderstanding this.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Written order', 'Execution order', 'What happens'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1. SELECT', '2. Executed second', 'Choose which columns to return from the already-identified rows'],
              ['2. FROM', '1. Executed first', 'Identify the table — this always runs before SELECT'],
              ['3. WHERE', '3. Executed third', 'Filter rows (you will learn this in Module 06)'],
              ['4. GROUP BY', '4. Executed fourth', 'Group filtered rows (Module 28)'],
              ['5. HAVING', '5. Executed fifth', 'Filter groups (Module 29)'],
              ['6. ORDER BY', '6. Executed sixth', 'Sort the result (Module 08)'],
              ['7. LIMIT', '7. Executed last', 'Cut to n rows (Module 09)'],
            ].map(([written, exec, what], i) => (
              <tr key={written} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{written}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: i < 2 ? '#00e676' : 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{exec}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>The key insight for now: <Hl>FROM runs before SELECT</Hl>. The database first decides which table to read, then decides which columns from that table to return. Every clause you add in future modules fits somewhere in this execution order.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="SELECT * — The Wildcard and Why to Use It Carefully" />

      <P>The asterisk <Hl>*</Hl> in SELECT means "all columns." Instead of listing every column by name, you use * to tell the database to return everything in the table.</P>

      <SQLPlayground
        initialQuery={`-- SELECT * returns every column in the table
-- Run this and count how many columns customers has
SELECT *
FROM customers
LIMIT 5;`}
        height={110}
        showSchema={true}
      />

      <P>SELECT * is extremely useful for exploration — when you join a new project and want to see what a table contains, SELECT * LIMIT 10 is the first query you run. It shows you every column, every data type, and the shape of the data instantly.</P>

      <H>Why SELECT * is dangerous in production code</H>
      <P>In production queries — queries that run inside applications, dashboards, or data pipelines — SELECT * is almost always the wrong choice. Here is why.</P>

      <P><Hl>It retrieves unnecessary data.</Hl> If the customers table has 10 columns but your application only needs first_name and email, SELECT * fetches all 10 columns, transfers them over the network, and forces the application to discard 8 of them. At 10 million rows this wastes significant time and bandwidth.</P>

      <P><Hl>It breaks when the schema changes.</Hl> If someone adds a new column to the customers table next month, your SELECT * query suddenly returns an extra column. Any code that expects a specific number or order of columns silently breaks. Explicit column names make your query immune to schema additions.</P>

      <P><Hl>It prevents index optimisation.</Hl> The database has a performance optimisation called a covering index — if your SELECT only asks for columns that exist in an index, the database can serve the query entirely from the index without reading the main table. SELECT * prevents this optimisation because * includes columns that are not in the index.</P>

      <Callout type="tip">
        Rule of thumb: use SELECT * only for exploration and debugging. In any query that runs regularly — in an app, a dashboard, a pipeline, or a scheduled job — always name the specific columns you need.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Selecting Specific Columns — The Right Way" />

      <P>When you name specific columns in SELECT, you are being explicit about exactly what you need. The database returns only those columns, in exactly the order you listed them — not necessarily the order they exist in the table.</P>

      <SQLPlayground
        initialQuery={`-- Select only the columns you need
-- Notice: columns appear in YOUR order, not the table's order
SELECT city, first_name, loyalty_tier
FROM customers
LIMIT 8;`}
        height={110}
        showSchema={false}
      />

      <H>Column order in SELECT is yours to control</H>
      <P>The columns in your result appear in the order you list them in SELECT — not the order they are defined in the table. In the query above, city appears first even though it is the 6th column in the customers table. This lets you organise results in whatever order makes sense for the person reading them.</P>

      <H>Selecting columns from FreshCart — practical examples</H>

      <SQLPlayground
        initialQuery={`-- Products: just the info a customer needs to see
SELECT product_name, brand, unit_price, unit, in_stock
FROM products
LIMIT 10;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders: just the operational columns
SELECT order_id, order_date, order_status, payment_method, total_amount
FROM orders
LIMIT 10;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees: what a manager needs to see about their team
SELECT first_name, last_name, role, department, salary
FROM employees;`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="SELECT with Calculations — Using SQL as a Calculator" />

      <P>SELECT does not just return column values as they are stored. It can perform calculations on those values — arithmetic, string operations, date math — and return the computed result as a new column in the output. The table itself is never changed. The calculation happens at query time and exists only in the result.</P>

      <H>Arithmetic in SELECT</H>

      <SQLPlayground
        initialQuery={`-- Calculate profit margin per product
-- The calculation happens during the query — the table is not changed
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price            AS profit_per_unit,
  ROUND((unit_price - cost_price)
        / unit_price * 100, 1)       AS margin_pct
FROM products
ORDER BY margin_pct DESC
LIMIT 10;`}
        height={170}
        showSchema={false}
      />

      <P>Several things to notice here. First, the arithmetic operators: <Hl>+</Hl> (add), <Hl>-</Hl> (subtract), <Hl>*</Hl> (multiply), <Hl>/</Hl> (divide). Second, the <Hl>AS</Hl> keyword — it gives the computed column a name in the result. Without AS, the database would show the raw expression as the column header. Third, <Hl>ROUND(value, decimal_places)</Hl> — a built-in function that rounds to a specified number of decimal places. You will learn all built-in functions in Modules 41–44.</P>

      <H>Calculating with dates</H>

      <SQLPlayground
        initialQuery={`-- How many days each order took to deliver
-- NULL delivery_date means the order is not yet delivered
SELECT
  order_id,
  order_date,
  delivery_date,
  order_status,
  delivery_date - order_date   AS days_to_deliver
FROM orders
WHERE delivery_date IS NOT NULL
LIMIT 10;`}
        height={160}
        showSchema={false}
      />

      <H>Combining text columns</H>

      <SQLPlayground
        initialQuery={`-- Combine first and last name into a single full name column
-- The || operator concatenates (joins) strings in SQL
SELECT
  first_name || ' ' || last_name   AS full_name,
  city,
  loyalty_tier
FROM customers
LIMIT 10;`}
        height={130}
        showSchema={false}
      />

      <Callout type="info">
        String concatenation uses <strong>||</strong> in PostgreSQL, SQLite, and DuckDB (what the playground uses). In MySQL you use CONCAT(first_name, ' ', last_name) instead. Both produce the same result — joining two strings together. This is one of the small dialect differences mentioned in Module 04.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="SELECT with Literal Values — Returning Constants" />

      <P>SELECT does not have to return columns from a table at all. You can SELECT literal values — fixed strings, numbers, or the result of functions — and the database returns them directly. This is more useful than it sounds.</P>

      <SQLPlayground
        initialQuery={`-- SELECT can return literal values directly
-- No FROM needed when you are not reading from any table
SELECT 'Hello, FreshCart!'   AS greeting,
       2 + 2                  AS math_result,
       CURRENT_DATE           AS today;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Mix literals with column values
-- Useful for adding context to your output
SELECT
  first_name,
  last_name,
  'FreshCart Customer'   AS type,
  loyalty_tier,
  2026 - 2022            AS years_since_launch
FROM customers
LIMIT 5;`}
        height={140}
        showSchema={false}
      />

      <P>Selecting literals is used in practice for: adding a constant label to identify the source of data when combining results from multiple queries, computing values that do not depend on any specific row (like a tax rate or a fixed fee), and testing expressions before embedding them in a larger query.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Case Sensitivity — What SQL Cares About and What It Does Not" />

      <P>SQL beginners are often confused about when capitalisation matters. The rule is simple once you know it:</P>

      <P><Hl>SQL keywords are case-insensitive.</Hl> SELECT, select, Select, and SeLeCt are all identical to the database. FROM, from, From — all the same. The convention is to write keywords in UPPERCASE — it makes queries easier to read by visually separating your instructions from your data. All examples in this course follow this convention.</P>

      <P><Hl>Table and column names depend on the database.</Hl> In PostgreSQL, table and column names are case-insensitive unless you quote them with double quotes. In MySQL, table names are case-sensitive on Linux (because file names are case-sensitive on Linux) but case-insensitive on Windows. The safest practice: always use lowercase for table and column names (as FreshCart does) and write them the same way every time.</P>

      <P><Hl>String values are case-sensitive.</Hl> The value 'Seattle' is not the same as 'bangalore' or 'BANGALORE' in a WHERE clause. String comparisons respect exact case — you will see this in Module 06 when learning WHERE.</P>

      <CodeBlock
        label="All of these are identical — SQL keywords are case-insensitive"
        code={`-- All four produce exactly the same result:
SELECT first_name FROM customers LIMIT 3;
select first_name from customers limit 3;
Select First_Name From Customers Limit 3;
SELECT FIRST_NAME FROM CUSTOMERS LIMIT 3;

-- Convention: KEYWORDS in uppercase, names in lowercase
-- This makes queries readable at a glance`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Comments in SQL — Explaining Your Queries" />

      <P>SQL supports two types of comments. Comments are ignored by the database — they exist only for humans reading the query. Writing good comments is a professional habit that makes your queries easier to understand, debug, and maintain.</P>

      <CodeBlock
        label="Single-line and multi-line comments"
        code={`-- This is a single-line comment
-- Everything after -- on this line is ignored by the database

SELECT
  first_name,
  last_name,
  -- email,        ← commented-out columns are easy to toggle
  city,
  loyalty_tier     -- inline comment explaining what this column means
FROM customers
/* This is a multi-line comment.
   Useful for longer explanations or
   temporarily disabling blocks of SQL. */
LIMIT 10;`}
      />

      <P>When to write comments in SQL: when a calculation is non-obvious (explain the formula), when a column name is ambiguous (clarify what it means in this context), when a query has a non-obvious filter or business rule (explain why), and when you are sharing a query with teammates who will need to understand it without asking you.</P>

      <ProTip>
        The best SQL queries at Indian tech companies read like a story. The table name tells you what you are looking at, the column names tell you what you are measuring, and comments explain the why — the business rule or decision behind each non-obvious choice. A query you write today needs to be understandable by your colleague six months from now without your explanation.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="SELECT DISTINCT — Removing Duplicate Rows" />

      <P>By default, SELECT returns every row from the table — including duplicates. If you want only unique values, use <Hl>SELECT DISTINCT</Hl>. The database returns each unique combination of the columns you selected, once.</P>

      <SQLPlayground
        initialQuery={`-- Without DISTINCT: every row comes back (many repeated cities)
SELECT city
FROM customers
LIMIT 20;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- With DISTINCT: each city appears only once
SELECT DISTINCT city
FROM customers
ORDER BY city;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- DISTINCT works on combinations of columns
-- Each unique city + loyalty_tier pair appears once
SELECT DISTINCT city, loyalty_tier
FROM customers
ORDER BY city, loyalty_tier;`}
        height={120}
        showSchema={false}
      />

      <P>DISTINCT is useful for: finding all unique values in a column (all cities FreshCart serves, all product categories, all payment methods used), checking what values actually exist in a column before filtering on them, and understanding the cardinality of a column — how many distinct values it has.</P>

      <Callout type="warning">
        DISTINCT has a performance cost — the database must compare every row against every other row (or sort all rows) to eliminate duplicates. On large tables, DISTINCT can be significantly slower than a plain SELECT. Only use it when you genuinely need unique values. If you are counting distinct values, use COUNT(DISTINCT column) — covered in Module 27.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Formatting Your Queries — The Professional Standard" />

      <P>SQL does not care about whitespace, line breaks, or indentation. These two queries are identical to the database:</P>

      <CodeBlock
        label="Both queries are identical to the database"
        code={`-- Ugly but valid:
select product_name,unit_price,cost_price,in_stock from products limit 5;

-- Professional and readable:
SELECT
  product_name,
  unit_price,
  cost_price,
  in_stock
FROM products
LIMIT 5;`}
      />

      <P>The formatted version takes more lines but is dramatically easier to read, modify, debug, and review. The professional SQL formatting conventions used throughout this course — and at most Indian tech companies:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { rule: 'Keywords in UPPERCASE', example: 'SELECT, FROM, WHERE, JOIN', why: 'Visually separates SQL instructions from data names at a glance' },
          { rule: 'One column per line in SELECT', example: 'SELECT\n  first_name,\n  last_name,', why: 'Easy to add, remove, or comment out individual columns' },
          { rule: 'Indent column list with 2 spaces', example: '  first_name,\n  last_name,', why: 'Shows the columns are subordinate to the SELECT keyword' },
          { rule: 'Each major clause on its own line', example: 'SELECT ...\nFROM ...\nWHERE ...', why: 'Makes the query structure immediately obvious' },
          { rule: 'Aliases aligned with AS keyword', example: 'unit_price - cost_price  AS margin', why: 'Makes it easy to scan which expression maps to which name' },
          { rule: 'Semicolon at the end', example: 'FROM customers;', why: 'Required when running multiple queries in one session' },
        ].map(item => (
          <div key={item.rule} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.rule}</div>
            <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, margin: '0 0 8px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{item.example}</pre>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.why}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Complete FreshCart Examples — Real Business Questions" />

      <P>Now let us put everything together. Here are real business questions that FreshCart's management team might ask, answered with SELECT and FROM alone — no filtering, no aggregation, just reading the right columns from the right table.</P>

      <SQLPlayground
        initialQuery={`-- Business question: "Show me all our stores — city, state, and monthly targets"
-- Management uses this in the weekly performance review
SELECT
  store_id,
  store_name,
  city,
  state,
  manager_name,
  monthly_target
FROM stores
ORDER BY monthly_target DESC;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Business question: "Which products have the highest profit margin?"
-- Procurement team uses this to decide which products to push
SELECT
  product_name,
  category,
  brand,
  unit_price,
  cost_price,
  unit_price - cost_price                          AS profit,
  ROUND((unit_price - cost_price) / unit_price
        * 100, 1)                                  AS margin_pct,
  in_stock
FROM products
ORDER BY margin_pct DESC;`}
        height={180}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Business question: "Give me the full employee roster for our HR records"
-- HR team needs this for their quarterly audit
SELECT
  employee_id,
  first_name || ' ' || last_name   AS full_name,
  role,
  department,
  store_id,
  salary,
  hire_date
FROM employees
ORDER BY store_id, salary DESC;`}
        height={170}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Business question: "Show me all pending and processing orders"
-- Operations team monitors this throughout the day
SELECT
  order_id,
  customer_id,
  store_id,
  order_date,
  order_status,
  payment_method,
  total_amount
FROM orders
ORDER BY order_date DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are three weeks into your job as a Business Analyst at a Seattle fintech startup. Your manager, Deepika, sends a Slack message on a Tuesday morning.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', margin: '20px 0 24px' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>Slack · #analytics</div>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: '0 0 12px' }}>
          <strong style={{ color: C }}>Deepika (Manager):</strong> Hey — can you pull the current list of all active merchants? I just need their merchant_id, business_name, city, and onboarded_date. Nothing fancy, just the raw list. Google Sheet is fine. Needed before the 3pm call.
        </p>
      </div>

      <TimeBlock time="10:15 AM" label="You open your SQL client">
        You connect to the staging database (you never run exploratory queries on production — you learned this in Module 04). You do not know the merchants table structure yet, so first you run: SELECT * FROM merchants LIMIT 5; — this shows you all the columns and a few rows so you know what you are working with.
      </TimeBlock>

      <TimeBlock time="10:18 AM" label="You write the actual query">
        Now that you know the column names, you write the proper query:
      </TimeBlock>

      <CodeBlock
        label="The query you write"
        code={`SELECT
  merchant_id,
  business_name,
  city,
  onboarded_date
FROM merchants
WHERE status = 'active'  -- (you will learn WHERE in the next module)
ORDER BY onboarded_date DESC;`}
      />

      <TimeBlock time="10:20 AM" label="Export and deliver">
        The query returns 847 rows in 0.3 seconds. You export to CSV, open in Google Sheets, do a quick sanity check on the row count, and share the link in Slack. Total time: 5 minutes. Deepika replies: "Perfect, thank you!" This is what SQL looks like at work on a normal day — not complex analytics, just fast, precise data retrieval that would have taken 30 minutes of manual searching without it.
      </TimeBlock>

      <ProTip>
        The first query you run on any unfamiliar table should always be SELECT * FROM table_name LIMIT 10. This shows you the column names, the data types, sample values, and how the data is formatted — all the information you need to write the proper query. Never guess column names. Always check first.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between SELECT * and selecting specific columns?">
        <p style={{ margin: '0 0 14px' }}>SELECT * retrieves all columns from the specified table in their defined order. Selecting specific columns — SELECT col1, col2, col3 — retrieves only the named columns in the order you specify. The data returned is a subset of what SELECT * would return, and the columns appear in your chosen order regardless of their order in the table definition.</p>
        <p style={{ margin: '0 0 14px' }}>SELECT * is appropriate for exploration — when you want to see what a table contains or are debugging a data issue. In production code it has three significant problems. First, it retrieves unnecessary data — if your application needs 2 columns but SELECT * fetches 15, you waste network bandwidth and memory on every execution. Second, it breaks silently when schema changes — if a column is added or removed, code that expects specific columns at specific positions will produce incorrect results with no error. Third, it prevents covering index optimisation — the database cannot serve the query from an index alone if you ask for all columns.</p>
        <p style={{ margin: 0 }}>The professional rule: use SELECT * only in interactive exploration and debugging. Every query that runs in an application, a scheduled job, a dashboard, or a data pipeline should name its columns explicitly.</p>
      </IQ>

      <IQ q="In what order does the database actually execute a SELECT query?">
        <p style={{ margin: '0 0 14px' }}>The written order of a SQL query (SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT) does not match the execution order. The database executes clauses in this sequence: FROM first (identify the source table or tables), WHERE second (filter individual rows), GROUP BY third (group the filtered rows), HAVING fourth (filter the groups), SELECT fifth (compute the output columns from the remaining rows), ORDER BY sixth (sort the result), LIMIT last (cut to the specified number of rows).</p>
        <p style={{ margin: '0 0 14px' }}>This execution order has practical consequences. It explains why you cannot use a SELECT alias in a WHERE clause — WHERE runs before SELECT, so the alias does not exist yet when WHERE is evaluated. It explains why you can use a SELECT alias in ORDER BY — ORDER BY runs after SELECT. It explains why aggregate functions like COUNT() and SUM() appear in SELECT and HAVING but not in WHERE — WHERE runs before grouping, so aggregate values do not exist yet at that point.</p>
        <p style={{ margin: 0 }}>Understanding execution order also helps with query optimisation. WHERE filtering happens early (before SELECT projection), so effective WHERE conditions reduce the number of rows processed by all subsequent steps. Applying filters as early as possible — through WHERE conditions on indexed columns — is one of the most impactful query performance improvements you can make.</p>
      </IQ>

      <IQ q="What does SELECT DISTINCT do and when should you use it?">
        <p style={{ margin: '0 0 14px' }}>SELECT DISTINCT returns only unique rows — it eliminates duplicate rows from the result set. When you list multiple columns, DISTINCT applies to the combination: every unique combination of the listed columns appears exactly once in the output. SELECT DISTINCT city returns each city once. SELECT DISTINCT city, loyalty_tier returns each unique city-tier pair once.</p>
        <p style={{ margin: '0 0 14px' }}>DISTINCT is appropriate when you genuinely need unique values — finding all distinct cities a company has customers in, all distinct product categories, all distinct payment methods used. It is also useful for data profiling: DISTINCT shows you what values actually exist in a column, which is valuable when exploring a new database.</p>
        <p style={{ margin: 0 }}>DISTINCT should be avoided when you do not actually need unique values, because it carries a performance cost — the database must sort or hash all rows to identify and eliminate duplicates. On large tables this can be significantly slower than a plain SELECT. A common mistake is using SELECT DISTINCT to work around a query that returns more rows than expected — this hides an underlying JOIN or filter bug rather than fixing it. The correct fix is to identify why duplicates are appearing (usually a many-to-one JOIN) and address the root cause.</p>
      </IQ>

      <IQ q="Can you perform calculations in a SELECT statement? Give examples.">
        <p style={{ margin: '0 0 14px' }}>Yes. SELECT can perform arithmetic, string operations, date calculations, and function calls on column values, and return the computed result as a new column in the output. The original table is never modified — calculations happen during query execution and exist only in the result set.</p>
        <p style={{ margin: '0 0 14px' }}>Arithmetic examples: unit_price - cost_price computes the profit margin per product. total_amount * 1.18 applies 18% GST to an order total. quantity * unit_price recalculates the line total. These use the standard arithmetic operators: + (add), - (subtract), * (multiply), / (divide), % (modulo). Division between integers produces an integer in some databases — use CAST or decimal literals if you need decimal division.</p>
        <p style={{ margin: 0 }}>String operation example: first_name || ' ' || last_name concatenates first and last name with a space (PostgreSQL/DuckDB syntax). MySQL uses CONCAT(first_name, ' ', last_name). Date example: delivery_date - order_date returns the number of days between two dates in PostgreSQL. Built-in function example: ROUND(price * 0.18, 2) rounds a calculated tax value to 2 decimal places. All computed columns can be given a readable name using AS: unit_price - cost_price AS profit. Without AS, the column header in the result shows the raw expression.</p>
      </IQ>

      <IQ q="What is a SQL comment and why should you write them?">
        <p style={{ margin: '0 0 14px' }}>SQL comments are text in a query that the database engine ignores completely — they exist only for humans reading the query. There are two comment syntaxes. Single-line comments start with two hyphens (--) and everything after them on that line is ignored. Multi-line comments start with /* and end with */ and can span any number of lines.</p>
        <p style={{ margin: '0 0 14px' }}>Comments serve four practical purposes in professional SQL work. First, explanation: a non-obvious calculation or filter needs an explanation of the business rule behind it — WHY you are multiplying by 1.18, not just WHAT the multiplication does. Second, attribution: who wrote the query and when, especially in shared query libraries. Third, toggling: commenting out individual SELECT columns or WHERE conditions is easier than deleting and retyping them when debugging. Fourth, documentation: queries in a data pipeline or scheduled job should have a comment explaining what business question they answer and which team owns them.</p>
        <p style={{ margin: 0 }}>The mark of a professional SQL writer is queries that read like documentation — the structure tells you what, the comments tell you why. A query you write today at 10 AM should be fully understandable to a colleague at 3 PM without your explanation. This becomes increasingly important as companies grow and queries are shared across teams and maintained over years.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'firstname' does not exist — LINE 1: SELECT firstname FROM customers;"
        cause="The column name in your SELECT does not exactly match any column name in the table. Here 'firstname' was typed instead of 'first_name' (missing the underscore). SQL column names must match exactly — a typo in any character causes this error. This also happens when you try to select a column from the wrong table, or when a column name was changed and your query was not updated."
        fix="Check the exact column names available: SELECT * FROM customers LIMIT 1; — this shows you every column header. In DBeaver or TablePlus you can expand the table in the schema panel to see column names. Once you find the right name, update your query. If you are on a new database and do not know the columns, run: SELECT column_name FROM information_schema.columns WHERE table_name = 'customers' ORDER BY ordinal_position; to get the full list."
      />

      <Err
        msg="ERROR: table 'customer' does not exist — FROM customer;"
        cause="The table name in your FROM clause does not match any table in the current database. Here 'customer' was typed instead of 'customers' (missing the s). Like column names, table names must match exactly. This also happens when you are connected to the wrong database, when the table exists in a different schema, or when the table simply has not been created yet."
        fix="List all tables in the current database: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'; (PostgreSQL) or SHOW TABLES; (MySQL). Find the correct table name and update your FROM clause. If the table is missing entirely, it may need to be created or you may be connected to the wrong database."
      />

      <Err
        msg="ERROR: syntax error at or near 'FORM' — LINE 1: SELECT first_name FORM customers;"
        cause="A keyword is misspelled — 'FORM' instead of 'FROM'. The database parser reached 'FORM', did not recognise it as any valid SQL keyword, and stopped with a syntax error. The error message tells you exactly where in the query the parser got confused — 'at or near FORM' — so you can find the typo quickly. SQL keywords must be spelled correctly but are not case-sensitive."
        fix="Read the error message — it tells you which word it did not recognise. Correct the spelling: FROM not FORM. To avoid keyword typos, use a SQL editor with autocomplete and syntax highlighting (VS Code with SQLTools, DBeaver, or DataGrip) — unrecognised keywords are highlighted in a different colour before you even run the query."
      />

      <Err
        msg="ERROR: missing FROM-clause entry for table 'c' — SELECT c.first_name FROM customers;"
        cause="You are using a table alias (c.first_name) but you never defined the alias. The prefix 'c.' tells the database you want the first_name column from a table aliased as 'c' — but no table in your FROM clause has that alias. This happens when you start writing a JOIN query with aliases and forget to actually add the alias to the FROM clause."
        fix="Either remove the table prefix (SELECT first_name FROM customers;) or add the alias definition to FROM: SELECT c.first_name FROM customers c; — the alias is defined by placing it after the table name. Aliases become necessary and important in JOIN queries (Module 30 onwards) where the same column name might exist in multiple tables and you need to specify which table's version you want."
      />

      <Err
        msg="ERROR: division by zero — SELECT unit_price / (unit_price - cost_price) FROM products;"
        cause="The denominator in your division calculation evaluated to zero for at least one row. Here, if unit_price equals cost_price (zero margin product), the expression unit_price - cost_price evaluates to 0, and dividing by 0 is mathematically undefined. SQL databases raise an error and stop the entire query when division by zero occurs, even if only one row in a million triggers it."
        fix="Use NULLIF to safely handle potential zero denominators: SELECT unit_price / NULLIF(unit_price - cost_price, 0) FROM products; — NULLIF(expression, 0) returns NULL instead of 0, and dividing by NULL returns NULL instead of raising an error. The affected rows will show NULL in the result, which is usually the correct behaviour (indicating the calculation is not applicable for that row). You can then use COALESCE to replace NULL with a default: COALESCE(unit_price / NULLIF(unit_price - cost_price, 0), 0)."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshCart wants a product listing for their website. Write a SELECT query that returns: the product name, category, brand, price (formatted as unit_price with an alias 'price'), and a calculated column called 'gst_price' which is the unit_price multiplied by 1.18 (adding 18% GST), rounded to 2 decimal places. Only return products that are in stock. Order by price ascending."
        hint="You need SELECT with column names and a calculated column using ROUND(unit_price * 1.18, 2). For filtering in-stock products use WHERE in_stock = true. For ordering use ORDER BY unit_price ASC."
        answer={`SELECT
  product_name,
  category,
  brand,
  unit_price                            AS price,
  ROUND(unit_price * 1.18, 2)           AS gst_price
FROM products
WHERE in_stock = true
ORDER BY unit_price ASC;`}
        explanation="This query combines everything from Module 05: selecting specific columns by name, giving them readable aliases with AS, performing arithmetic inside SELECT (multiplying by 1.18 for GST), using ROUND() to control decimal places, filtering with WHERE (you will learn this fully in Module 06), and sorting with ORDER BY. The result is a clean product listing with both the base price and the GST-inclusive price — exactly what a real e-commerce product listing query would look like."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'SELECT specifies which columns to return. FROM specifies which table to read from. These two keywords are in every SQL query ever written.',
          'The database executes FROM before SELECT, even though SELECT is written first. Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
          'SELECT * returns all columns and is useful for exploration. In production code always name specific columns — SELECT * wastes bandwidth, breaks when schemas change, and prevents covering index optimisation.',
          'Columns in the result appear in the order you list them in SELECT — not the order they exist in the table.',
          'SELECT can perform calculations: arithmetic (+ - * /), string operations (|| or CONCAT), date math, and built-in functions. The table is never changed — calculations exist only in the query result.',
          'Give computed columns a readable name using the AS keyword: unit_price - cost_price AS profit. Without AS, the column header shows the raw expression.',
          'SELECT DISTINCT eliminates duplicate rows from the result. It applies to the combination of all listed columns. It has a performance cost — only use it when you genuinely need unique values.',
          'SQL keywords (SELECT, FROM) are case-insensitive. Column and table names are case-insensitive in most databases but exact-match in others. String values in WHERE clauses are always case-sensitive.',
          'Comment your queries: -- for single-line, /* */ for multi-line. Explain the why, not just the what. Professional queries read like documentation.',
          'First query on any unfamiliar table: SELECT * FROM table_name LIMIT 10 — see the column names, data types, and sample values before writing the real query.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 06</strong>, you add the WHERE clause — the most powerful tool for getting only the rows you actually need. This is where SQL goes from "show me everything" to "show me exactly what I asked for." Every filter you will ever write starts here.
        </p>
        <Link href="/learn/sql/where-clause" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 06 → Filtering Rows — WHERE Clause
        </Link>
      </div>

    </LearnLayout>
  );
}