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

export default function WhereClause() {
  return (
    <LearnLayout
      title="Filtering Rows — WHERE Clause"
      description="Get only the rows you actually need — every comparison operator, every data type, and how the database evaluates filters internally"
      section="SQL — Module 06"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why WHERE Is the Most Important Clause in SQL" />

      <P>In Module 05 you learned SELECT and FROM — they let you read data from a table. But SELECT without WHERE returns <Hl>every single row</Hl> in the table. The customers table has 20 rows. The orders table at a real company has 500 million. Returning all 500 million rows every time you need to answer a question is not just slow — it is impossible. Your screen cannot display it, your network cannot transfer it, and your database server will collapse under the load.</P>

      <P>WHERE is the clause that tells the database: <Hl>"Only give me rows that satisfy this condition."</Hl> It is the difference between "show me everything" and "show me exactly what I asked for." Every useful SQL query in a production system has a WHERE clause. Mastering WHERE is mastering SQL.</P>

      <P>Here is WHERE in its simplest form:</P>

      <SQLPlayground
        initialQuery={`-- Without WHERE: all 20 customers
SELECT first_name, last_name, city, loyalty_tier
FROM customers;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- With WHERE: only customers in Seattle
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE city = 'Seattle';`}
        height={120}
        showSchema={false}
      />

      <P>Same table, same columns — but the second query returns only the rows where city equals 'Seattle'. The WHERE clause evaluated every row and kept only the ones where the condition was true. Everything else was discarded before the result was returned to you.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="How WHERE Works Internally" />

      <P>Understanding what the database does when it processes a WHERE clause makes you a dramatically better SQL writer. It explains why some queries are fast and others are slow — and what you can do about it.</P>

      <H>The evaluation process — row by row</H>
      <P>When the database executes a WHERE clause, it goes through the table row by row. For each row, it evaluates your condition. The condition produces one of three results: <Hl>TRUE</Hl> (the row satisfies the condition — include it), <Hl>FALSE</Hl> (the row does not satisfy the condition — discard it), or <Hl>NULL</Hl> (the condition could not be evaluated because a value is missing — also discarded). Only rows where the condition evaluates to TRUE make it into the result.</P>

      <P>This happens before SELECT — remember from Module 05 that the execution order is FROM → WHERE → SELECT. The database identifies all rows that match the WHERE condition first, then extracts the requested columns from only those rows. This is efficient: if WHERE filters 10 million rows down to 100, SELECT only has to process those 100.</P>

      <H>Without an index — full table scan</H>
      <P>If the column in your WHERE clause has no index, the database must read every single page of the table, check every row, and keep only the ones where the condition is true. This is called a <Hl>full table scan</Hl>. On a table with 500 million rows and no index, a full table scan takes minutes to hours.</P>

      <H>With an index — direct lookup</H>
      <P>If the column in your WHERE clause has an index (a B-tree), the database jumps directly to the matching rows without reading the whole table. Finding 100 rows out of 500 million with an index takes milliseconds — the same query without an index takes minutes. You will learn to create indexes in Module 46. For now, know that WHERE on a primary key or a properly indexed column is always fast regardless of table size.</P>

      <Callout type="info">
        In the FreshCart playground, all tables are small (under 120 rows) so every query is fast regardless of indexes. In real production databases with millions of rows, WHERE performance depends entirely on whether the filtered column has an index. Always think about indexes when writing WHERE clauses on large tables.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Comparison Operators — The Six Tools of Filtering" />

      <P>A WHERE condition uses a <Hl>comparison operator</Hl> to compare a column value against a test value. There are six comparison operators in SQL, and you will use all six regularly.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operator', 'Meaning', 'Example', 'Returns rows where...'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['=', 'Equal to', "city = 'Seattle'", 'city is exactly Seattle'],
              ['<> or !=', 'Not equal to', "city <> 'Seattle'", 'city is anything other than Seattle'],
              ['>', 'Greater than', 'unit_price > 100', 'unit_price is more than 100'],
              ['<', 'Less than', 'unit_price < 100', 'unit_price is less than 100'],
              ['>=', 'Greater than or equal to', 'salary >= 50000', 'salary is 50000 or more'],
              ['<=', 'Less than or equal to', 'salary <= 50000', 'salary is 50000 or less'],
            ].map(([op, meaning, example, desc], i) => (
              <tr key={op} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 14, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{op}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{meaning}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{example}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Equality — = operator</H>

      <SQLPlayground
        initialQuery={`-- Find all Gold tier customers
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold';`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Find the order with a specific order_id
-- Primary key lookup — the fastest possible query
SELECT order_id, customer_id, order_date, total_amount, order_status
FROM orders
WHERE order_id = 1007;`}
        height={120}
        showSchema={false}
      />

      <H>Not equal — &lt;&gt; operator</H>

      <SQLPlayground
        initialQuery={`-- Find all orders that were NOT delivered
-- <> means "not equal to" — same as != in most databases
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE order_status <> 'Delivered'
ORDER BY order_date;`}
        height={130}
        showSchema={false}
      />

      <H>Greater than and less than</H>

      <SQLPlayground
        initialQuery={`-- Products priced above ₹200
SELECT product_name, category, brand, unit_price
FROM products
WHERE unit_price > 200
ORDER BY unit_price DESC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees earning at or above ₹60,000
SELECT first_name, last_name, role, salary
FROM employees
WHERE salary >= 60000
ORDER BY salary DESC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders placed before February 2024
SELECT order_id, order_date, total_amount, order_status
FROM orders
WHERE order_date < '2024-02-01'
ORDER BY order_date;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Filtering Different Data Types — Numbers, Text, and Dates" />

      <P>WHERE works on every data type, but the syntax for each type is slightly different. Getting the syntax wrong is one of the most common beginner mistakes.</P>

      <H>Filtering numbers — no quotes</H>
      <P>Number values in WHERE conditions are written as-is, without quotes. The database compares the column value numerically.</P>

      <CodeBlock
        label="Number filters — no quotes"
        code={`-- Correct — numbers without quotes
WHERE unit_price = 56
WHERE total_amount > 1000
WHERE quantity <= 3
WHERE salary >= 40000

-- Wrong — numbers with quotes are treated as text
WHERE unit_price = '56'     -- might work but is incorrect practice
WHERE total_amount > '1000' -- string comparison, not numeric`}
      />

      <H>Filtering text — always use single quotes</H>
      <P>Text (VARCHAR, CHAR, TEXT) values in WHERE conditions must be wrapped in <Hl>single quotes</Hl>. Double quotes are used for identifiers (column names, table names) in SQL — not for string values. Forgetting this is the most common syntax error beginners make.</P>

      <CodeBlock
        label="Text filters — always single quotes"
        code={`-- Correct — text values in single quotes
WHERE city = 'Seattle'
WHERE order_status = 'Delivered'
WHERE loyalty_tier = 'Platinum'
WHERE payment_method = 'UPI'

-- Wrong — double quotes are for identifiers, not values
WHERE city = "Seattle"     -- error in PostgreSQL, might work in MySQL
WHERE city = Seattle       -- error: Seattle treated as column name`}
      />

      <H>String comparison is case-sensitive</H>
      <P>In PostgreSQL (and DuckDB, which the playground uses), string comparisons are <Hl>case-sensitive</Hl>. 'Seattle' is not the same as 'bangalore' or 'BANGALORE'. The WHERE condition will only return rows where the value matches exactly — including case.</P>

      <SQLPlayground
        initialQuery={`-- 'Seattle' (capital B) finds rows
SELECT first_name, city FROM customers WHERE city = 'Seattle';`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- 'bangalore' (lowercase) finds nothing in PostgreSQL
-- Because the actual stored values have capital B
SELECT first_name, city FROM customers WHERE city = 'bangalore';`}
        height={100}
        showSchema={false}
      />

      <P>To do a case-insensitive comparison in PostgreSQL, use the <Hl>ILIKE</Hl> operator or wrap the column in <Hl>LOWER()</Hl>:</P>

      <SQLPlayground
        initialQuery={`-- Case-insensitive comparison using LOWER()
-- Works in PostgreSQL, MySQL, and DuckDB
SELECT first_name, city
FROM customers
WHERE LOWER(city) = 'bangalore';`}
        height={110}
        showSchema={false}
      />

      <H>Filtering dates — use ISO 8601 format</H>
      <P>Date values in WHERE conditions are written as strings in <Hl>YYYY-MM-DD</Hl> format, wrapped in single quotes. Always use this format — it is unambiguous across every database and every locale. Never use DD/MM/YYYY or MM-DD-YYYY in SQL queries.</P>

      <SQLPlayground
        initialQuery={`-- Orders placed on a specific date
SELECT order_id, order_date, total_amount
FROM orders
WHERE order_date = '2024-01-15';`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders placed in January 2024
-- >= first day of month AND < first day of next month
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <  '2024-02-01'
ORDER BY order_date;`}
        height={140}
        showSchema={false}
      />

      <H>Filtering booleans</H>

      <SQLPlayground
        initialQuery={`-- Products currently in stock
SELECT product_name, category, unit_price
FROM products
WHERE in_stock = true
ORDER BY unit_price;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products out of stock
SELECT product_name, category, unit_price
FROM products
WHERE in_stock = false;`}
        height={100}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="WHERE with Calculated Expressions" />

      <P>The condition in WHERE does not have to compare a raw column to a fixed value. You can use calculations on both sides of the comparison. The database evaluates the expression for each row and checks whether the result satisfies the condition.</P>

      <SQLPlayground
        initialQuery={`-- Products where profit margin is greater than 30%
-- The calculation runs for every row
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
WHERE (unit_price - cost_price) / unit_price > 0.30
ORDER BY margin_pct DESC;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders where total_amount is more than 3x the average
-- This is a subquery — you'll learn these fully in Module 36
SELECT order_id, customer_id, total_amount, order_status
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) * 3 FROM orders)
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <Callout type="warning">
        Applying functions or calculations to the column side of a WHERE condition (e.g. WHERE YEAR(order_date) = 2024) can prevent the database from using an index on that column — because the index stores raw values, not the computed results. This is called a non-SARGable condition. Where possible, rewrite calculations to the value side: WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'. You will learn this in depth in Module 57 (Query Optimisation).
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Filtering NULL Values — IS NULL and IS NOT NULL" />

      <P>NULL is the absence of a value. It is not zero, not an empty string, not false — it means <Hl>"we do not know"</Hl> or <Hl>"this information does not apply."</Hl> In FreshCart's orders table, delivery_date is NULL for orders that have not been delivered yet — we do not know the delivery date because it has not happened.</P>

      <P>NULL has a special property that surprises almost every beginner: <Hl>you cannot use = to check for NULL</Hl>. The expression column = NULL does not return TRUE or FALSE — it returns NULL. And remember: WHERE discards rows where the condition is NULL. So WHERE delivery_date = NULL returns zero rows — always, no matter what the data contains.</P>

      <CodeBlock
        label="The NULL trap — = NULL never works"
        code={`-- WRONG: this returns zero rows even if delivery_date is NULL
WHERE delivery_date = NULL

-- CORRECT: use IS NULL
WHERE delivery_date IS NULL

-- CORRECT: use IS NOT NULL for the opposite
WHERE delivery_date IS NOT NULL`}
      />

      <SQLPlayground
        initialQuery={`-- Orders that have NOT been delivered yet
-- delivery_date is NULL for undelivered orders
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE delivery_date IS NULL
ORDER BY order_date;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders that HAVE been delivered
-- delivery_date IS NOT NULL for delivered orders
SELECT order_id, order_date, delivery_date,
       delivery_date - order_date  AS days_taken
FROM orders
WHERE delivery_date IS NOT NULL
ORDER BY days_taken DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees with no manager (top-level managers)
-- manager_id is NULL for employees who report to nobody
SELECT employee_id, first_name, last_name, role, store_id
FROM employees
WHERE manager_id IS NULL;`}
        height={120}
        showSchema={false}
      />

      <ProTip>
        NULL confusion causes silent data quality bugs that are extremely hard to find. Whenever you write a WHERE condition on a column that might contain NULLs, ask yourself: "What do I want to happen with NULL rows?" If you want them included, you need to explicitly handle them. If you want them excluded, your regular condition already excludes them (remember: NULL condition = row discarded). Module 11 covers NULL in full depth — this is a preview of why it matters.
      </ProTip>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="WHERE on Different FreshCart Tables — Real Scenarios" />

      <P>Let us practice WHERE across all six FreshCart tables with real business questions that would come up in day-to-day work.</P>

      <H>Customers — targeting by tier and location</H>

      <SQLPlayground
        initialQuery={`-- Platinum customers — the highest value segment
-- Marketing team uses this for exclusive campaign targeting
SELECT
  first_name, last_name, city, state, email, phone
FROM customers
WHERE loyalty_tier = 'Platinum';`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customers who joined after January 2023
-- Growth team tracks new cohorts
SELECT
  first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE joined_date >= '2023-01-01'
ORDER BY joined_date;`}
        height={130}
        showSchema={false}
      />

      <H>Products — filtering by price, category, and stock</H>

      <SQLPlayground
        initialQuery={`-- Budget products under ₹50 that are in stock
-- Used for discount campaign eligibility
SELECT product_name, brand, unit_price, unit, category
FROM products
WHERE unit_price < 50
  AND in_stock = true
ORDER BY unit_price;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All dairy products
-- Category management team reviews this weekly
SELECT product_name, brand, unit_price, cost_price, in_stock
FROM products
WHERE category = 'Dairy'
ORDER BY unit_price;`}
        height={120}
        showSchema={false}
      />

      <H>Orders — operational filtering</H>

      <SQLPlayground
        initialQuery={`-- High-value orders above ₹2,000 — flagged for review
-- Finance team monitors these for fraud screening
SELECT order_id, customer_id, store_id,
       order_date, payment_method, total_amount
FROM orders
WHERE total_amount > 2000
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Cancelled orders — the ops team investigates these
SELECT order_id, customer_id, store_id,
       order_date, payment_method, total_amount
FROM orders
WHERE order_status = 'Cancelled'
ORDER BY order_date;`}
        height={130}
        showSchema={false}
      />

      <H>Employees — HR and payroll filtering</H>

      <SQLPlayground
        initialQuery={`-- Employees at the Seattle stores (ST001 and ST002)
-- Store operations manager uses this for scheduling
SELECT first_name, last_name, role, salary, hire_date
FROM employees
WHERE store_id = 'ST001'
ORDER BY salary DESC;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Senior employees hired before 2021
-- Used for long-service recognition programme
SELECT first_name, last_name, role, store_id, hire_date
FROM employees
WHERE hire_date < '2021-01-01'
ORDER BY hire_date;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Common WHERE Patterns You Will Write Every Day" />

      <P>In real work, certain WHERE patterns appear constantly. Recognising them makes you write queries faster and more accurately.</P>

      <H>Exact match on a primary key or ID</H>
      <P>The most common query in any application: look up one specific record by its ID. This is always fast because primary keys are always indexed.</P>

      <CodeBlock
        label="ID lookup — fastest possible query"
        code={`-- Find one specific customer
SELECT * FROM customers WHERE customer_id = 4;

-- Find one specific order
SELECT * FROM orders WHERE order_id = 1015;

-- Find one specific product
SELECT * FROM products WHERE product_id = 21;`}
      />

      <H>Date range filter</H>
      <P>Filtering by a date range — this month, last quarter, last 30 days — appears in almost every analytics query.</P>

      <CodeBlock
        label="Date range patterns"
        code={`-- This month (January 2024)
WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01'

-- Last 30 days from today (use CURRENT_DATE)
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'   -- PostgreSQL
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) -- MySQL

-- Between two specific dates (inclusive on both ends)
WHERE order_date >= '2024-01-15' AND order_date <= '2024-02-15'`}
      />

      <H>Status filter</H>
      <P>Almost every transactional table has a status column. Filtering by status is one of the most frequent operations.</P>

      <CodeBlock
        label="Status filtering"
        code={`-- Find all delivered orders
WHERE order_status = 'Delivered'

-- Find all open/active records (not cancelled or completed)
WHERE order_status = 'Processing'

-- Find problem orders (cancelled or returned)
WHERE order_status <> 'Delivered'`}
      />

      <H>Amount threshold</H>
      <P>Filtering by a monetary amount — high-value transactions, orders above a minimum, products in a price range — is constant in financial and e-commerce analytics.</P>

      <CodeBlock
        label="Amount thresholds"
        code={`-- High-value orders
WHERE total_amount >= 1000

-- Affordable products
WHERE unit_price <= 100

-- Products in a specific price range
WHERE unit_price >= 50 AND unit_price <= 200`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="WHERE vs HAVING — A Critical Distinction" />

      <P>Both WHERE and HAVING filter rows, but they operate at completely different points in query execution and on completely different things. Confusing them causes errors that can be frustrating to debug if you do not understand the distinction.</P>

      <P><Hl>WHERE filters individual rows</Hl> — before any grouping or aggregation happens. It operates on the raw column values of each row.</P>

      <P><Hl>HAVING filters groups</Hl> — after GROUP BY has aggregated rows into groups. It operates on aggregate values like COUNT(), SUM(), AVG(). You cannot use HAVING without GROUP BY.</P>

      <CodeBlock
        label="WHERE vs HAVING — the key difference"
        code={`-- WHERE: filter individual orders before counting
-- "Count only delivered orders, grouped by store"
SELECT store_id, COUNT(*) AS delivered_count
FROM orders
WHERE order_status = 'Delivered'   -- filter rows BEFORE grouping
GROUP BY store_id;

-- HAVING: filter groups after counting
-- "Show only stores that had more than 3 orders total"
SELECT store_id, COUNT(*) AS total_orders
FROM orders
GROUP BY store_id
HAVING COUNT(*) > 3;               -- filter AFTER grouping

-- Both together:
-- "Stores with more than 2 DELIVERED orders"
SELECT store_id, COUNT(*) AS delivered_count
FROM orders
WHERE order_status = 'Delivered'   -- filter rows first
GROUP BY store_id
HAVING COUNT(*) > 2;               -- then filter groups`}
      />

      <P>You will learn GROUP BY and HAVING in full depth in Modules 28 and 29. For now, remember this one rule: <Hl>WHERE for rows, HAVING for groups</Hl>.</P>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Performance — Writing WHERE Clauses That Stay Fast" />

      <P>A WHERE clause that works correctly but runs slowly is still a problem in production. Here are the most important performance rules for WHERE — you will learn the full details in Module 57, but these habits should start now.</P>

      <H>Filter on indexed columns</H>
      <P>Primary keys are always indexed. Other columns may or may not have indexes — that depends on how the database was designed. When you write WHERE on a column that has an index, the database does an index lookup (fast). When you write WHERE on an unindexed column, the database does a full table scan (slow on large tables). Ask your team which columns are indexed when joining a new project.</P>

      <H>Avoid functions on the left side of WHERE</H>
      <P>Applying a function to a column in WHERE prevents index usage. The database's index stores raw column values — not the result of functions applied to them.</P>

      <CodeBlock
        label="SARGable vs non-SARGable WHERE conditions"
        code={`-- SLOW: function on the column side — cannot use index on order_date
WHERE YEAR(order_date) = 2024
WHERE MONTH(order_date) = 1
WHERE UPPER(city) = 'BANGALORE'

-- FAST: equivalent conditions that CAN use the index
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'
WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01'
WHERE city = 'Seattle'   -- or use a case-insensitive index`}
      />

      <H>Put the most selective filter first when possible</H>
      <P>The most selective filter is the one that eliminates the most rows. In most databases the query optimiser figures this out automatically, but writing your most restrictive condition first makes the query easier for humans to read and reason about — the first condition narrows the data most aggressively.</P>

      <CodeBlock
        label="Most selective filter first"
        code={`-- Better: order_id is the primary key — eliminates all but 1 row immediately
WHERE order_id = 1007
  AND order_status = 'Delivered'

-- Less ideal order — status filter is less selective than the ID filter
WHERE order_status = 'Delivered'
  AND order_id = 1007`}
      />

      <ProTip>
        Every WHERE clause you write in a production environment should be accompanied by a mental question: "Does this column have an index?" If you are filtering on a column that millions of rows will be scanned against and there is no index, the query will be slow. The fix is adding an index — which you will learn to do in Module 46. For now, build the habit of asking the question.
      </ProTip>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are an analyst at Shopify, a Seattle-based social commerce platform. It is 2 PM on a Thursday. The customer support team sends an urgent message — a customer is complaining that their order was marked delivered but they never received it. They need you to pull everything about this specific order immediately.</P>

      <TimeBlock time="2:05 PM" label="First query — find the order">
        The support team gives you order ID 9847321. You open your SQL client and run the single most useful query in any investigation: a primary key lookup.
      </TimeBlock>

      <CodeBlock
        label="Step 1 — primary key lookup"
        code={`-- Find the specific order
SELECT *
FROM orders
WHERE order_id = 9847321;`}
      />

      <TimeBlock time="2:06 PM" label="You see the problem">
        The order shows status = 'Delivered' and delivery_date = '2024-03-15', but the customer says they never got it. You need to see the customer's details and which store fulfilled it.
      </TimeBlock>

      <CodeBlock
        label="Step 2 — get customer and store context"
        code={`-- Find this customer's other recent orders
-- to see if there is a pattern
SELECT order_id, order_date, delivery_date,
       order_status, total_amount, store_id
FROM orders
WHERE customer_id = 12847
  AND order_date >= '2024-01-01'
ORDER BY order_date DESC;`}
      />

      <TimeBlock time="2:10 PM" label="Pattern found">
        You see that this customer has had 3 'Delivered' orders in the last month — all from the same store (ST007). You check that store's recent delivery data.
      </TimeBlock>

      <CodeBlock
        label="Step 3 — check the store's delivery pattern"
        code={`-- All 'Delivered' orders from store ST007 in the last 2 weeks
-- Are there more complaints from this store?
SELECT order_id, customer_id, order_date,
       delivery_date, total_amount
FROM orders
WHERE store_id = 'ST007'
  AND order_status = 'Delivered'
  AND delivery_date >= '2024-03-08'
ORDER BY delivery_date DESC;`}
      />

      <TimeBlock time="2:18 PM" label="Escalation with data">
        You find 12 orders from ST007 all marked delivered in the same 2-day window. You pull the list, attach it to the support ticket, and escalate to the operations team with a clear note: "Pattern of potentially false delivery marks from ST007, 12 orders affected, dates 2024-03-14 to 2024-03-15." What started as one customer complaint turned into a store-level operations issue — found in 13 minutes with three WHERE queries.
      </TimeBlock>

      <ProTip>
        This is real SQL work. Not complex analytics — just precise, targeted WHERE queries that narrow from "the whole database" to "the exact rows that explain the problem." The investigation above uses only what you have learned in Modules 01–06. This is how much SQL you need to be genuinely useful on day one.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the WHERE clause and when is it executed relative to SELECT?">
        <p style={{ margin: '0 0 14px' }}>The WHERE clause filters rows in a SQL query — it specifies conditions that each row must satisfy to be included in the result. Only rows where the WHERE condition evaluates to TRUE are passed forward. Rows where the condition is FALSE or NULL are discarded.</p>
        <p style={{ margin: '0 0 14px' }}>WHERE is executed before SELECT in the query execution order. The full execution order is: FROM (identify the source table), WHERE (filter rows), GROUP BY (group filtered rows), HAVING (filter groups), SELECT (compute output columns from remaining rows), ORDER BY (sort), LIMIT (cut to n rows). This sequence has important consequences: you cannot reference a SELECT alias in a WHERE clause because WHERE runs before SELECT and the alias does not yet exist. You cannot use aggregate functions (COUNT, SUM, AVG) in WHERE because aggregation happens after WHERE — use HAVING instead for filtering aggregate results.</p>
        <p style={{ margin: 0 }}>Performance-wise, WHERE is the most important clause for query speed. An effective WHERE condition on an indexed column can reduce the rows the database processes from 500 million to 100 — a 5-million-fold reduction in work before SELECT, ORDER BY, or any other clause runs.</p>
      </IQ>

      <IQ q="Why can you not use = NULL to check for NULL values? What should you use instead?">
        <p style={{ margin: '0 0 14px' }}>NULL represents the absence of a value — it means "unknown" or "not applicable." In SQL, any comparison involving NULL returns NULL, not TRUE or FALSE. This is called three-valued logic. The expression column = NULL does not return TRUE for rows where column is NULL — it returns NULL. And the WHERE clause discards rows where the condition result is NULL (not just FALSE). So WHERE column = NULL will always return zero rows, regardless of what the data contains.</p>
        <p style={{ margin: '0 0 14px' }}>This behaviour is technically correct but surprises almost every SQL beginner. NULL means "we don't know the value" — and "we don't know" = "we don't know" does not logically produce a definitive TRUE answer, so SQL returns NULL instead.</p>
        <p style={{ margin: 0 }}>To check for NULL, SQL provides the IS NULL and IS NOT NULL operators. These are specifically designed to handle the three-valued logic of NULL: IS NULL returns TRUE when the value is NULL, and IS NOT NULL returns TRUE when the value is anything other than NULL. WHERE delivery_date IS NULL finds all rows where delivery_date has not been set. WHERE delivery_date IS NOT NULL finds all rows where it has been set to a real date. These are the only correct ways to filter NULL values.</p>
      </IQ>

      <IQ q="What is the difference between WHERE and HAVING?">
        <p style={{ margin: '0 0 14px' }}>WHERE and HAVING both filter data, but they operate at different stages of query execution and on different things. WHERE filters individual rows before any grouping or aggregation. It operates on raw column values and runs early in the execution pipeline — immediately after FROM. HAVING filters groups after GROUP BY has aggregated rows, and it operates on aggregate values like COUNT(), SUM(), AVG(). HAVING runs after SELECT in the execution order.</p>
        <p style={{ margin: '0 0 14px' }}>A concrete example: to find the total revenue per city, but only for cities with more than ₹5,000 in delivered orders, you need both. WHERE order_status = 'Delivered' filters individual rows before the city grouping. HAVING SUM(total_amount) {'>'} 5000 filters the city groups after their revenue has been computed. You cannot use WHERE SUM(total_amount) {'>'} 5000 because SUM() does not exist yet when WHERE runs.</p>
        <p style={{ margin: 0 }}>Performance difference: WHERE filters early and reduces the number of rows that GROUP BY must process. HAVING filters late after all aggregation is done. For performance, always move filtering to WHERE when possible and use HAVING only for conditions that genuinely require aggregate values. If you can express a filter in WHERE instead of HAVING, always do — it reduces the work done by GROUP BY.</p>
      </IQ>

      <IQ q="What is a full table scan and how does the WHERE clause affect it?">
        <p style={{ margin: '0 0 14px' }}>A full table scan is when the database reads every page of a table from start to finish to find rows that match a WHERE condition. On a small table this is fine. On a table with 500 million rows stored across thousands of disk pages, a full table scan can take minutes or longer — and blocks other queries from running efficiently.</p>
        <p style={{ margin: '0 0 14px' }}>Whether WHERE causes a full table scan depends on whether the filtered column has an index. If the column has a B-tree index, the database uses the index to jump directly to the matching rows without reading the whole table — an index lookup. This turns a minutes-long full scan into a sub-millisecond operation. If the column has no index, the database has no choice but to read every row.</p>
        <p style={{ margin: 0 }}>WHERE conditions that prevent index usage include: applying a function to the column (WHERE UPPER(city) = 'BANGALORE' cannot use an index on city), using OR conditions across different columns without a composite index, and using leading wildcards in LIKE (WHERE email LIKE '%gmail.com' cannot use an index because the prefix is unknown). The solution for function-wrapped columns is to rewrite the condition: WHERE city = 'Seattle' (case-sensitive, uses index) or add a functional index on UPPER(city). Understanding when WHERE triggers a full scan versus an index lookup is the foundation of query optimisation.</p>
      </IQ>

      <IQ q="How does string comparison work in WHERE? Give an example of a case-sensitivity issue.">
        <p style={{ margin: '0 0 14px' }}>String comparison in WHERE checks whether a column value matches a specified string. In PostgreSQL, SQLite, and DuckDB (used in the Chaduvuko playground), string comparisons are case-sensitive by default — the exact characters must match including capitalisation. 'Seattle' does not equal 'bangalore' or 'BANGALORE'. In MySQL, string comparisons are case-insensitive by default because MySQL's default collation (utf8mb4_general_ci, where ci stands for case-insensitive) treats uppercase and lowercase as equivalent.</p>
        <p style={{ margin: '0 0 14px' }}>A real example of a case-sensitivity issue: an analyst queries WHERE city = 'bangalore' on a PostgreSQL database where cities are stored as 'Seattle' (capital B). The query returns zero rows — not because there are no customers in Seattle, but because 'bangalore' and 'Seattle' are treated as different strings. The analyst might incorrectly conclude the data is missing.</p>
        <p style={{ margin: 0 }}>Solutions for case-insensitive matching: use LOWER(city) = 'bangalore' to convert both sides to lowercase before comparing — this works in all databases but prevents index usage on city. In PostgreSQL, use the ILIKE operator (case-insensitive LIKE) as an alternative: WHERE city ILIKE 'bangalore'. For production systems where case-insensitive search is frequent, create a functional index on LOWER(city) so that WHERE LOWER(city) = 'bangalore' can use the index. The safest long-term practice is to standardise data capitalisation on insert — store all cities as 'Seattle' consistently, then case-sensitive comparison is always correct and fast.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: operator does not exist: integer = text — WHERE customer_id = '1'"
        cause="You are comparing a numeric column (customer_id is INTEGER) with a string value ('1' in quotes). PostgreSQL is strict about type matching — it will not silently convert '1' to 1 for comparison. This happens when you paste code from a tool that adds quotes around all values regardless of type, or when column types are not what you expect."
        fix="Remove the quotes from numeric values: WHERE customer_id = 1 — no quotes. PostgreSQL will not implicitly cast a string to an integer in a comparison. If you are generating queries dynamically in code, use parameterised queries with the correct Python/JS type (integer, not string) for the value. MySQL is more permissive and will silently cast '1' to 1 — which is why the same code works in MySQL but fails in PostgreSQL."
      />

      <Err
        msg="ERROR: invalid input syntax for type date: '15-01-2024' — WHERE order_date = '15-01-2024'"
        cause="The date string is in DD-MM-YYYY format but PostgreSQL (and most databases) expect YYYY-MM-DD (ISO 8601 format). PostgreSQL tries to parse the string as a date and fails because '15' is not a valid year in the YYYY position of the default format. This is an extremely common error when dates come from a spreadsheet, a user form, or a non-technical source."
        fix="Always use YYYY-MM-DD format in SQL queries: WHERE order_date = '2024-01-15'. If your data is stored in a different format, convert it at insertion time. If you must parse a non-standard format at query time, use TO_DATE() in PostgreSQL: WHERE order_date = TO_DATE('15-01-2024', 'DD-MM-YYYY'). In MySQL use STR_TO_DATE(): WHERE order_date = STR_TO_DATE('15-01-2024', '%d-%m-%Y')."
      />

      <Err
        msg="Query returns 0 rows — expected to find data"
        cause="This is not a database error but a logic error — your WHERE condition does not match any rows even though you expect it to. Most common causes: string value is wrong case (WHERE city = 'bangalore' but data stores 'Seattle'), extra whitespace in the stored value (WHERE email = 'aisha@gmail.com' but stored as ' aisha@gmail.com' with a leading space), using = NULL instead of IS NULL, or the value genuinely does not exist in the table."
        fix="Debug systematically. First, run SELECT * FROM table LIMIT 10 to see actual stored values. Check case and whitespace carefully. If checking for NULL, use IS NULL not = NULL. Use LOWER() on both sides to rule out case issues: WHERE LOWER(city) = LOWER('Seattle'). Use TRIM() to rule out whitespace: WHERE TRIM(email) = 'aisha@gmail.com'. Once you find the exact stored value, update your WHERE condition to match it precisely."
      />

      <Err
        msg="ERROR: column 'total' does not exist — WHERE total > 1000 (when SELECT has AS total)"
        cause="You gave a computed column an alias (AS total) in SELECT and then tried to use that alias in WHERE. This fails because WHERE executes before SELECT in SQL's logical processing order — the alias 'total' does not exist yet when WHERE is evaluated. This is one of the most common SQL logic errors for beginners who expect aliases to be available throughout the query."
        fix="Repeat the expression in WHERE instead of using the alias: WHERE total_amount > 1000 (use the original column name), or WHERE (unit_price - cost_price) > 100 (repeat the calculation). Alternatively, wrap your query in a subquery or CTE (covered in Modules 36 and 55) where the inner query defines the alias and the outer query filters on it: SELECT * FROM (SELECT *, unit_price - cost_price AS margin FROM products) t WHERE margin > 100. Note: ORDER BY is the one clause where aliases ARE available, because ORDER BY executes after SELECT."
      />

      <Err
        msg="WARNING: 0 rows affected by UPDATE — WHERE customer_id = 999"
        cause="This is not an error but a critical warning to understand. An UPDATE or DELETE with a WHERE clause that matches zero rows executes successfully — the database reports 0 rows affected. This happens when: the ID does not exist, the value has a typo, or the condition is too restrictive. The danger is in the opposite case: a WHERE clause that is less restrictive than intended can affect many more rows than you expected, including wrong rows."
        fix="Before running any UPDATE or DELETE with a WHERE clause, always run the equivalent SELECT with the same WHERE to see which rows will be affected: SELECT * FROM customers WHERE customer_id = 999 — if this returns 0 rows, your UPDATE will also affect 0 rows. Fix the condition before running the destructive operation. As a habit: SELECT first, then UPDATE or DELETE. Many SQL clients have a safe mode that requires you to explicitly confirm bulk operations."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart operations team needs a report of all high-value delivered orders placed in February 2024 — specifically orders with a total_amount above ₹800 that were successfully delivered. Show the order_id, order_date, delivery_date, payment_method, and total_amount. Sort by total_amount descending."
        hint="You need three conditions in WHERE: order_status = 'Delivered', order_date range for February 2024 (>= '2024-02-01' AND < '2024-03-01'), and total_amount > 800. All three must be true — combine them with AND (covered in Module 07)."
        answer={`SELECT
  order_id,
  order_date,
  delivery_date,
  payment_method,
  total_amount
FROM orders
WHERE order_status = 'Delivered'
  AND order_date >= '2024-02-01'
  AND order_date <  '2024-03-01'
  AND total_amount > 800
ORDER BY total_amount DESC;`}
        explanation="This query combines four WHERE conditions using AND — all four must be true for a row to appear in the result. The date range uses >= on the first day and < on the first day of the next month, which correctly captures all dates in February without worrying about time components. The result shows which high-value February orders were successfully delivered, which the operations team can use to verify delivery performance on important transactions. You will learn AND, OR, and NOT in full depth in Module 07."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'WHERE filters rows by evaluating a condition for each row. Only rows where the condition evaluates to TRUE are included. FALSE and NULL both cause the row to be discarded.',
          'WHERE executes before SELECT in the logical execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. This is why SELECT aliases cannot be used in WHERE.',
          'The six comparison operators: = (equal), <> or != (not equal), > (greater than), < (less than), >= (greater than or equal), <= (less than or equal). All work on numbers, text, and dates.',
          'Numbers in WHERE have no quotes: WHERE salary > 50000. Text values always use single quotes: WHERE city = \'Seattle\'. Dates use single quotes in YYYY-MM-DD format: WHERE order_date >= \'2024-01-01\'.',
          'String comparison is case-sensitive in PostgreSQL and DuckDB. WHERE city = \'bangalore\' finds nothing if values are stored as \'Seattle\'. Use LOWER() or ILIKE for case-insensitive matching.',
          'You cannot use = NULL to check for NULL values — any comparison involving NULL returns NULL, not TRUE. Always use IS NULL and IS NOT NULL instead.',
          'WHERE filters rows. HAVING filters groups after GROUP BY. You cannot use aggregate functions (COUNT, SUM, AVG) in WHERE — use HAVING for that.',
          'WHERE on an indexed column triggers a fast index lookup. WHERE on an unindexed column triggers a slow full table scan. Avoid applying functions to the column side of WHERE conditions — it prevents index usage.',
          'The debug workflow for unexpected zero results: run SELECT * FROM table LIMIT 10 to see actual stored values, check for case and whitespace mismatches, verify you are using IS NULL not = NULL.',
          'Before any UPDATE or DELETE, always run the equivalent SELECT with the same WHERE to confirm which rows will be affected. Never run a destructive operation without first seeing the result of the equivalent SELECT.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 07</strong>, you combine multiple WHERE conditions using AND, OR, and NOT — turning simple single-condition filters into precise multi-condition queries that can answer complex business questions in a single statement.
        </p>
        <Link href="/learn/sql/and-or-not" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 07 → Multiple Conditions — AND, OR, NOT
        </Link>
      </div>

    </LearnLayout>
  );
}