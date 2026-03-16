import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'SQL — Complete Guide | DBMS | Chaduvuko',
  description:
    'SQL from absolute zero to advanced — DDL, DML, DCL, TCL, all JOIN types, GROUP BY, window functions, CTEs, subqueries. Every concept with real examples.',
}

const CodeBlock = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.85, color: 'var(--text2)', fontFamily: 'var(--font-mono)', margin: 0 }}>
      <code>{children}</code>
    </pre>
  </div>
)

export default function SQLComplete() {
  return (
    <LearnLayout
      title="SQL — Complete Guide"
      description="From your first SELECT to recursive CTEs. Everything SQL in the exact order that makes it stick — with real data, real queries, real company context."
      section="DBMS"
      readTime="90–120 min"
      updatedAt="March 2026"
    >
      {/* ── INTRO ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          SQL (Structured Query Language) is not a programming language — it's a
          <strong style={{ color: 'var(--text)' }}> query language</strong>. You don't tell it
          how to find data. You describe <em>what</em> data you want, and the database
          engine figures out the best way to get it. That distinction is what makes SQL
          both powerful and approachable.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          SQL has 4 sublanguages. Every command you'll ever write falls into one of them:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12, marginBottom: 8 }}>
          {[
            { type: 'DDL', name: 'Data Definition Language', color: '#0078d4', cmds: 'CREATE · ALTER · DROP · TRUNCATE', desc: 'Defines structure' },
            { type: 'DML', name: 'Data Manipulation Language', color: 'var(--accent)', cmds: 'SELECT · INSERT · UPDATE · DELETE', desc: 'Manages data' },
            { type: 'DCL', name: 'Data Control Language', color: '#f97316', cmds: 'GRANT · REVOKE', desc: 'Controls access' },
            { type: 'TCL', name: 'Transaction Control Language', color: '#8b5cf6', cmds: 'COMMIT · ROLLBACK · SAVEPOINT', desc: 'Manages transactions' },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.type}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{item.cmds}</div>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DDL ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>DDL — Creating & Modifying Structure</h2>
        <CodeBlock label="CREATE TABLE — defining a table from scratch">
{`CREATE TABLE customers (
  customer_id  VARCHAR(10)  PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(150) UNIQUE,
  city         VARCHAR(50)  DEFAULT 'Unknown',
  age          INT          CHECK (age >= 0 AND age <= 120),
  created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Constraints explained:
-- PRIMARY KEY   = unique + not null, identifies each row
-- NOT NULL      = column must always have a value
-- UNIQUE        = no two rows can have the same email
-- DEFAULT       = value used if none is provided
-- CHECK         = only values passing this condition are allowed`}
        </CodeBlock>
        <CodeBlock label="ALTER TABLE — modifying existing structure">
{`-- Add a new column
ALTER TABLE customers ADD COLUMN phone VARCHAR(15);

-- Change a column's data type
ALTER TABLE customers ALTER COLUMN name TYPE VARCHAR(200);

-- Add a constraint
ALTER TABLE customers ADD CONSTRAINT chk_age CHECK (age > 0);

-- Drop a column
ALTER TABLE customers DROP COLUMN phone;`}
        </CodeBlock>
        <Callout type="warning">
          <strong>TRUNCATE vs DELETE:</strong> Both remove rows. TRUNCATE removes all rows instantly
          — it cannot be rolled back in most databases and does not fire triggers. DELETE removes
          rows one by one, can be rolled back, and fires DELETE triggers. For clearing large
          tables in production: TRUNCATE. For conditional removal: DELETE.
        </Callout>
      </section>

      {/* ── SELECT ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>SELECT — Retrieving Data</h2>
        <CodeBlock label="SELECT — building block by block">
{`-- Basic select
SELECT name, city FROM customers;

-- All columns (avoid in production — expensive)
SELECT * FROM customers;

-- With aliases
SELECT name AS customer_name, city AS location FROM customers;

-- Distinct values only
SELECT DISTINCT city FROM customers;

-- Filter with WHERE
SELECT name, city FROM customers
WHERE city = 'Bengaluru' AND age > 25;

-- Operators: =, !=, >, <, >=, <=, BETWEEN, IN, LIKE, IS NULL
SELECT * FROM customers WHERE age BETWEEN 20 AND 30;
SELECT * FROM customers WHERE city IN ('Bengaluru', 'Hyderabad', 'Mumbai');
SELECT * FROM customers WHERE name LIKE 'R%';   -- starts with R
SELECT * FROM customers WHERE phone IS NULL;    -- no phone stored

-- Sort results
SELECT name, age FROM customers ORDER BY age DESC;

-- Limit results
SELECT name FROM customers ORDER BY created_at DESC LIMIT 10;`}
        </CodeBlock>
      </section>

      {/* ── DML ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>INSERT, UPDATE, DELETE</h2>
        <CodeBlock label="DML operations">
{`-- INSERT — adding new rows
INSERT INTO customers (customer_id, name, email, city, age)
VALUES ('C004', 'Neha Sharma', 'neha@email.com', 'Pune', 28);

-- INSERT multiple rows at once
INSERT INTO customers (customer_id, name, city)
VALUES
  ('C005', 'Kiran Patel', 'Ahmedabad'),
  ('C006', 'Arun Kumar', 'Chennai');

-- UPDATE — modifying existing rows
UPDATE customers
SET city = 'Bengaluru', phone = '99887-76655'
WHERE customer_id = 'C001';
-- ⚠ Always include WHERE — without it, EVERY row is updated!

-- DELETE — removing rows
DELETE FROM customers WHERE customer_id = 'C001';
-- ⚠ Always include WHERE — without it, ALL rows are deleted!`}
        </CodeBlock>
      </section>

      {/* ── AGGREGATIONS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>GROUP BY, HAVING & Aggregate Functions</h2>
        <CodeBlock label="Aggregations — the functions">
{`-- Aggregate functions
SELECT
  COUNT(*)          AS total_orders,
  COUNT(customer_id) AS orders_with_customer,  -- excludes NULLs
  SUM(amount)       AS total_revenue,
  AVG(amount)       AS average_order_value,
  MIN(amount)       AS smallest_order,
  MAX(amount)       AS largest_order
FROM orders;`}
        </CodeBlock>
        <CodeBlock label="GROUP BY + HAVING — the most interview-tested combination">
{`-- Count orders per city
SELECT city, COUNT(*) AS order_count
FROM orders
GROUP BY city;

-- WHERE filters BEFORE grouping (on individual rows)
-- HAVING filters AFTER grouping (on group results)
SELECT city, COUNT(*) AS order_count
FROM orders
WHERE order_date >= '2024-01-01'   -- filter rows FIRST
GROUP BY city
HAVING COUNT(*) > 100;             -- THEN filter groups

-- Classic mistake:
-- SELECT city, COUNT(*) FROM orders WHERE COUNT(*) > 100  → ERROR
-- You CANNOT use aggregate functions in WHERE clause`}
        </CodeBlock>
      </section>

      {/* ── JOINS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>Joins — All Types</h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Joins combine rows from two or more tables based on a related column. This is how
          normalized tables are queried back together.
        </p>
        <CodeBlock label="All JOIN types with examples">
{`-- INNER JOIN — only rows with matching values in BOTH tables
SELECT c.name, o.order_id, o.amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;
-- Returns: only customers who have placed orders

-- LEFT JOIN — all rows from LEFT table + matching rows from RIGHT
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;
-- Returns: all customers, NULL in order columns if no orders

-- Find customers with NO orders:
SELECT c.name FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- RIGHT JOIN — all rows from RIGHT table + matching rows from LEFT
-- (Less common — most engineers prefer LEFT JOIN and swap table order)

-- FULL OUTER JOIN — all rows from BOTH tables
SELECT c.name, o.order_id
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- CROSS JOIN — every combination (Cartesian product)
-- 5 customers × 3 products = 15 rows
SELECT c.name, p.product_name
FROM customers c
CROSS JOIN products p;

-- SELF JOIN — a table joining itself
-- Find pairs of customers in the same city
SELECT a.name, b.name, a.city
FROM customers a
JOIN customers b ON a.city = b.city AND a.customer_id < b.customer_id;`}
        </CodeBlock>
      </section>

      {/* ── SUBQUERIES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>Subqueries</h2>
        <CodeBlock label="Subqueries — query inside a query">
{`-- Subquery in WHERE — find customers who placed orders above average
SELECT name FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM orders WHERE amount > (SELECT AVG(amount) FROM orders)
);

-- Subquery in FROM (derived table)
SELECT city, avg_amount
FROM (
  SELECT city, AVG(amount) as avg_amount
  FROM orders o JOIN customers c ON o.customer_id = c.customer_id
  GROUP BY city
) city_averages
WHERE avg_amount > 500;

-- Correlated subquery — runs ONCE PER ROW (slow but powerful)
-- Find customers whose latest order was above their own average
SELECT name FROM customers c
WHERE (
  SELECT MAX(amount) FROM orders o WHERE o.customer_id = c.customer_id
) > (
  SELECT AVG(amount) FROM orders o WHERE o.customer_id = c.customer_id
);

-- EXISTS vs IN
-- EXISTS — checks if subquery returns any rows (stops at first match)
SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.amount > 1000
);`}
        </CodeBlock>
      </section>

      {/* ── WINDOW FUNCTIONS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>Window Functions — The Most Important Advanced Topic</h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Window functions perform calculations across a set of related rows without collapsing
          them into groups. Unlike GROUP BY which returns one row per group, window functions
          return one row per original row — with the calculated value added as a new column.
        </p>
        <CodeBlock label="Window functions — complete reference">
{`-- ROW_NUMBER — unique sequential number per partition
SELECT
  customer_id, order_date, amount,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq
FROM orders;
-- Each customer's orders numbered 1, 2, 3... in date order

-- RANK vs DENSE_RANK — the classic interview trap
SELECT product_name, revenue,
  RANK()       OVER (ORDER BY revenue DESC) AS rank_with_gaps,   -- 1,2,2,4
  DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank_no_gaps      -- 1,2,2,3
FROM product_revenue;
-- RANK skips numbers after ties. DENSE_RANK does not.

-- LAG and LEAD — access previous/next row's value
SELECT order_date, amount,
  LAG(amount)  OVER (ORDER BY order_date) AS prev_day,
  LEAD(amount) OVER (ORDER BY order_date) AS next_day,
  amount - LAG(amount) OVER (ORDER BY order_date) AS day_change
FROM daily_sales;

-- Running total (cumulative sum)
SELECT order_date, amount,
  SUM(amount) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) AS running_total
FROM daily_sales;

-- Percentage of total
SELECT region, revenue,
  ROUND(revenue * 100.0 / SUM(revenue) OVER (), 2) AS pct_of_total
FROM regional_sales;

-- NTILE — divide rows into N equal buckets
SELECT name, score,
  NTILE(4) OVER (ORDER BY score DESC) AS quartile
FROM students;`}
        </CodeBlock>
      </section>

      {/* ── CTEs ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>CTEs — Write SQL That Humans Can Read</h2>
        <CodeBlock label="CTEs — breaking complex queries into readable steps">
{`-- Without CTE — one unreadable mess
SELECT customer_id, total
FROM (SELECT customer_id, SUM(amount) as total
      FROM orders WHERE status='completed' GROUP BY customer_id)
WHERE total > 5000;

-- With CTE — clean, debuggable, readable
WITH completed_orders AS (
  SELECT customer_id, amount
  FROM orders
  WHERE status = 'completed'
),
customer_totals AS (
  SELECT customer_id, SUM(amount) AS total
  FROM completed_orders
  GROUP BY customer_id
)
SELECT c.name, ct.total
FROM customer_totals ct
JOIN customers c ON ct.customer_id = c.customer_id
WHERE ct.total > 5000
ORDER BY ct.total DESC;

-- Recursive CTE — for hierarchical data (org charts, menus)
WITH RECURSIVE org_chart AS (
  -- Base: top-level employees (no manager)
  SELECT emp_id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: employees whose manager is already in the result
  SELECT e.emp_id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.emp_id
)
SELECT * FROM org_chart ORDER BY level, name;`}
        </CodeBlock>
      </section>

      {/* ── TCL ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>TCL — Transaction Control</h2>
        <CodeBlock label="COMMIT, ROLLBACK, SAVEPOINT">
{`-- Begin a transaction (implicit in most databases)
BEGIN;

-- Make changes
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'ACC001';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'ACC002';

-- If everything succeeded, commit (make permanent)
COMMIT;

-- If something went wrong, rollback (undo everything since BEGIN)
ROLLBACK;

-- SAVEPOINT — partial rollback
BEGIN;
UPDATE inventory SET stock = stock - 1 WHERE product_id = 'P001';
SAVEPOINT after_inventory;

UPDATE orders SET status = 'confirmed' WHERE order_id = 'ORD001';
-- Something failed here...
ROLLBACK TO after_inventory;  -- undo only back to savepoint
-- inventory update is preserved, order update is undone
COMMIT;`}
        </CodeBlock>
      </section>

      <KeyTakeaways items={[
        'SQL has 4 sublanguages: DDL (structure), DML (data), DCL (access), TCL (transactions). Know which command belongs to which.',
        'WHERE filters rows BEFORE grouping. HAVING filters groups AFTER grouping. You cannot use aggregate functions in WHERE.',
        'INNER JOIN: only matching rows. LEFT JOIN: all left rows + matches. FULL OUTER JOIN: all rows from both. CROSS JOIN: every combination.',
        'Window functions add calculated values without collapsing rows. RANK skips numbers on ties. DENSE_RANK does not.',
        'CTEs (WITH clause) make complex queries readable and debuggable. Recursive CTEs handle hierarchical data like org charts.',
        'Always use WHERE with UPDATE and DELETE. Without it, every row in the table is affected — a very expensive and irreversible mistake.',
      ]} />
    </LearnLayout>
  )
}