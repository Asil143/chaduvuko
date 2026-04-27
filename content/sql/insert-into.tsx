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

export default function InsertInto() {
  return (
    <LearnLayout
      title="INSERT INTO"
      description="Add rows to tables — single inserts, bulk inserts, insert from SELECT, upsert patterns, and every safety practice for writing data correctly"
      section="SQL — Module 20"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Writing Data Into a Table" />

      <P>Every query you have written so far has been read-only — SELECT returns data but never changes it. INSERT INTO is where you start writing data. It is the command that adds new rows to a table and the foundation of every application that stores anything.</P>

      <P>INSERT runs inside applications thousands of times per second at scale. When a FreshCart customer places an order, an INSERT adds a row to the orders table and multiple rows to order_items. When a new user registers, an INSERT adds their record to customers. When stock is replenished, an INSERT or UPDATE reflects the new quantity. Understanding INSERT deeply — the syntax, the safety rules, the performance patterns, and the failure modes — is essential for any SQL developer.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic Syntax — Single Row Insert" />

      <P>The fundamental INSERT statement specifies the table name, the list of columns to populate, and the values to insert. Always list column names explicitly — never rely on positional column order.</P>

      <CodeBlock
        label="INSERT INTO basic syntax"
        code={`INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

-- Real example: add a new customer
INSERT INTO customers (
  first_name,
  last_name,
  email,
  phone,
  city,
  state,
  pincode,
  joined_date,
  loyalty_tier
)
VALUES (
  'Priya',
  'Nair',
  'priya.nair@gmail.com',
  '9876543210',
  'Kochi',
  'Kerala',
  '682001',
  '2024-04-10',
  'Bronze'
);`}
      />

      <H>Why always list column names</H>
      <P>SQL allows omitting the column list: INSERT INTO customers VALUES (val1, val2, ...). This works but is <Hl>extremely dangerous</Hl>. It requires values in the exact order columns were defined in CREATE TABLE — an order that is invisible to anyone reading the query. If a column is added, removed, or reordered in the future, the positional INSERT silently inserts wrong values into wrong columns with no error. Always name your columns.</P>

      <CodeBlock
        label="Named vs positional insert — always use named"
        code={`-- WRONG: positional — breaks if schema changes, unreadable
INSERT INTO customers VALUES (
  DEFAULT, 'Priya', 'Nair', 'priya@gmail.com',
  '9876543210', 'Kochi', 'Kerala', '682001',
  '2024-04-10', 'Bronze'
);

-- RIGHT: named — self-documenting, schema-change resistant
INSERT INTO customers (first_name, last_name, email, city, loyalty_tier)
VALUES ('Priya', 'Nair', 'priya@gmail.com', 'Kochi', 'Bronze');
-- Omitted columns get their DEFAULT values or NULL`}
      />

      <H>Columns with defaults and nullable columns</H>
      <P>You do not need to specify every column in INSERT. Columns omitted from the INSERT list receive their DEFAULT value if one is defined, or NULL if nullable with no default. Columns with NOT NULL and no default must be included.</P>

      <SQLPlayground
        initialQuery={`-- See what the current customers table looks like
-- before we simulate inserts
SELECT customer_id, first_name, last_name, city, loyalty_tier, joined_date
FROM customers
ORDER BY customer_id
LIMIT 5;`}
        height={125}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Simulate: insert then immediately query the new row
-- DuckDB playground: INSERT affects the in-memory FreshCart data
INSERT INTO customers (first_name, last_name, email, city, state, joined_date)
VALUES ('Priya', 'Nair', 'priya.nair@gmail.com', 'Kochi', 'Kerala', '2024-04-10');

-- Verify the new row was added
SELECT customer_id, first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE email = 'priya.nair@gmail.com';`}
        height={155}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Multi-Row INSERT — Adding Many Rows at Once" />

      <P>Instead of running one INSERT per row, SQL lets you insert multiple rows in a single statement by listing multiple VALUES tuples separated by commas. This is dramatically faster than individual inserts — one round-trip to the database instead of N, and one transaction instead of N.</P>

      <CodeBlock
        label="Multi-row INSERT syntax"
        code={`INSERT INTO table_name (col1, col2, col3)
VALUES
  (val1a, val2a, val3a),
  (val1b, val2b, val3b),
  (val1c, val2c, val3c),
  ...;

-- Real example: add multiple products at once
INSERT INTO products (product_name, category, brand, unit_price, cost_price, unit, in_stock)
VALUES
  ('Amul Taaza Milk 1L',  'Dairy',   'Amul',  62.00, 52.00, '1L',  true),
  ('Tata Salt 1kg',       'Staples', 'Tata',  22.00, 16.00, '1kg', true),
  ('Maggi Noodles 70g',   'Staples', 'Nestle',15.00, 10.00, '70g', true),
  ('Fortune Sunflower Oil','Cooking', 'Fortune',145.00,118.00,'1L', false);`}
      />

      <SQLPlayground
        initialQuery={`-- Multi-row insert: add three new customers at once
INSERT INTO customers (first_name, last_name, email, city, state, joined_date, loyalty_tier)
VALUES
  ('Arjun',  'Mehta',  'arjun.mehta@gmail.com',  'Pune',      'Maharashtra', '2024-03-01', 'Silver'),
  ('Sneha',  'Pillai', 'sneha.pillai@yahoo.com',  'Trivandrum','Kerala',      '2024-03-15', 'Bronze'),
  ('Vikram', 'Bose',   'vikram.bose@outlook.com', 'Kolkata',   'West Bengal', '2024-04-01', 'Gold');

-- Verify all three were added
SELECT customer_id, first_name, last_name, city, loyalty_tier
FROM customers
WHERE email IN (
  'arjun.mehta@gmail.com',
  'sneha.pillai@yahoo.com',
  'vikram.bose@outlook.com'
);`}
        height={205}
        showSchema={false}
      />

      <H>Performance: multi-row vs single-row inserts</H>
      <P>Inserting 1,000 rows as a single multi-row INSERT is 10–100× faster than 1,000 individual INSERT statements. Each individual INSERT requires: a network round-trip, query parsing, constraint checking, index updating, and a transaction commit. A single multi-row INSERT does all of this once for all rows. For bulk data loading, use multi-row inserts or COPY (PostgreSQL) / LOAD DATA INFILE (MySQL) for even larger volumes.</P>

      <ProTip>
        In application code that needs to insert many rows — user registrations from a batch import, order items for a cart checkout, events from a stream — always batch inserts rather than inserting one row per database call. Most ORMs and database drivers support batch insert. In Python with psycopg2: executemany() or execute_values(). In Node.js: use a parameterised multi-row INSERT. Batching 100-1000 rows per INSERT is a standard production optimisation.
      </ProTip>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="INSERT INTO ... SELECT — Copy Data Between Tables" />

      <P>Instead of hardcoded VALUES, you can use a SELECT query as the source of rows to insert. This is one of the most powerful INSERT patterns — it lets you copy, transform, or aggregate data from one table into another in a single statement.</P>

      <CodeBlock
        label="INSERT INTO ... SELECT syntax"
        code={`INSERT INTO target_table (col1, col2, col3)
SELECT expr1, expr2, expr3
FROM source_table
WHERE condition;

-- The SELECT can be any valid query:
-- joins, aggregations, calculations, subqueries
-- The column count and types must match between
-- the INSERT column list and the SELECT output`}
      />

      <H>Copy rows between tables</H>

      <SQLPlayground
        initialQuery={`-- Create a summary of delivered orders per store
-- INSERT INTO ... SELECT pattern (SELECT part shown)
SELECT
  store_id,
  COUNT(*)                    AS delivered_count,
  SUM(total_amount)           AS total_revenue,
  ROUND(AVG(total_amount), 2) AS avg_order_value,
  MIN(order_date)             AS first_delivery,
  MAX(order_date)             AS last_delivery
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY total_revenue DESC;

-- In production this would be:
-- INSERT INTO store_delivery_summary
--   (store_id, delivered_count, total_revenue, avg_order_value, ...)
-- SELECT store_id, COUNT(*), SUM(...), ...
-- FROM orders WHERE ...`}
        height={210}
        showSchema={true}
      />

      <H>Archive pattern — move old rows to a history table</H>

      <CodeBlock
        label="Archive old rows using INSERT INTO ... SELECT"
        code={`-- Step 1: copy old cancelled orders to archive table
INSERT INTO orders_archive (
  order_id, customer_id, store_id, order_date,
  order_status, total_amount, archived_at
)
SELECT
  order_id, customer_id, store_id, order_date,
  order_status, total_amount, NOW()
FROM orders
WHERE order_status = 'Cancelled'
  AND order_date < CURRENT_DATE - INTERVAL '1 year';

-- Step 2: delete the archived rows from the main table
DELETE FROM orders
WHERE order_status = 'Cancelled'
  AND order_date < CURRENT_DATE - INTERVAL '1 year';

-- Always do Step 1 before Step 2 — archive first, then delete
-- Wrap both in a transaction for atomicity`}
      />

      <H>Transform and load pattern</H>

      <SQLPlayground
        initialQuery={`-- Transform raw order data into a denormalised reporting view
-- (SELECT part of what would be INSERT INTO reporting_orders ... SELECT)
SELECT
  o.order_id,
  o.order_date,
  c.first_name || ' ' || c.last_name    AS customer_name,
  c.city                                AS customer_city,
  c.loyalty_tier,
  s.store_name,
  s.city                                AS store_city,
  o.order_status,
  o.payment_method,
  o.total_amount,
  o.delivery_date - o.order_date        AS days_to_deliver
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
ORDER BY o.order_date DESC
LIMIT 10;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="RETURNING — Get Back What You Just Inserted" />

      <P>In PostgreSQL (and DuckDB), the RETURNING clause lets you retrieve column values from the rows you just inserted — without needing a separate SELECT. This is essential for getting the auto-generated primary key after an INSERT.</P>

      <CodeBlock
        label="RETURNING clause — PostgreSQL and DuckDB"
        code={`-- Insert and get back the generated customer_id
INSERT INTO customers (first_name, last_name, email, city, joined_date)
VALUES ('Kavya', 'Reddy', 'kavya@gmail.com', 'Hyderabad', '2024-04-10')
RETURNING customer_id, first_name, joined_date;

-- Returns:
-- customer_id | first_name | joined_date
-- 21          | Kavya      | 2024-04-10

-- RETURNING * returns all columns of the inserted row
INSERT INTO products (product_name, category, unit_price, cost_price, in_stock)
VALUES ('Haldiram Bhujia 200g', 'Snacks', 80.00, 58.00, true)
RETURNING *;

-- RETURNING is also available on UPDATE and DELETE
-- UPDATE customers SET loyalty_tier = 'Gold' WHERE customer_id = 5
-- RETURNING customer_id, loyalty_tier;`}
      />

      <SQLPlayground
        initialQuery={`-- Insert a new product and return the generated ID + computed margin
INSERT INTO products (product_name, category, brand, unit_price, cost_price, unit, in_stock)
VALUES ('Yoga Bar Oats 400g', 'Snacks', 'Yoga Bar', 199.00, 140.00, '400g', true)
RETURNING
  product_id,
  product_name,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1) AS margin_pct;`}
        height={155}
        showSchema={false}
      />

      <Callout type="info">
        MySQL does not support RETURNING. To get the last inserted auto-increment ID in MySQL, use LAST_INSERT_ID() immediately after the INSERT: SELECT LAST_INSERT_ID(). This is connection-scoped — it returns the ID generated by the most recent INSERT on the same connection, not globally. In application code, most MySQL drivers expose the insert ID directly after executing the INSERT (e.g. cursor.lastrowid in Python, result.insertId in Node.js).
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="ON CONFLICT — Upsert Patterns" />

      <P>An <Hl>upsert</Hl> (update-or-insert) handles the case where you want to insert a row if it does not exist, or update it if it does. This is one of the most common patterns in production systems — syncing data from an external source, updating a counter, or applying a daily feed of records that may or may not already exist.</P>

      <H>PostgreSQL — ON CONFLICT DO NOTHING</H>

      <CodeBlock
        label="ON CONFLICT DO NOTHING — skip duplicates silently"
        code={`-- If a customer with this email already exists, do nothing
-- Without this, a duplicate email INSERT would throw an error
INSERT INTO customers (first_name, last_name, email, city, joined_date)
VALUES ('Aisha', 'Khan', 'aisha.khan@gmail.com', 'Bangalore', '2024-01-05')
ON CONFLICT (email) DO NOTHING;

-- The (email) specifies WHICH unique constraint to check
-- If email already exists: row is silently skipped, no error
-- If email is new: row is inserted normally

-- Common use case: batch import where duplicates are expected
INSERT INTO products (product_name, brand, unit_price, in_stock)
SELECT product_name, brand, unit_price, in_stock
FROM products_import_staging
ON CONFLICT (product_name, brand) DO NOTHING;`}
      />

      <H>PostgreSQL — ON CONFLICT DO UPDATE (true upsert)</H>

      <CodeBlock
        label="ON CONFLICT DO UPDATE — insert or update"
        code={`-- If product already exists (by name+brand), update its price and stock
-- If product is new, insert it
INSERT INTO products (product_name, brand, unit_price, cost_price, in_stock)
VALUES ('Amul Butter 500g', 'Amul', 285.00, 245.00, true)
ON CONFLICT (product_name, brand)
DO UPDATE SET
  unit_price = EXCLUDED.unit_price,
  cost_price = EXCLUDED.cost_price,
  in_stock   = EXCLUDED.in_stock;

-- EXCLUDED refers to the row that was ATTEMPTED to be inserted
-- So EXCLUDED.unit_price = 285.00 (the new value you tried to insert)
-- SET unit_price = EXCLUDED.unit_price means: update to the new value

-- You can also set computed values or conditionally update:
DO UPDATE SET
  unit_price = EXCLUDED.unit_price,
  -- Only update in_stock if the new value is true
  in_stock   = CASE WHEN EXCLUDED.in_stock THEN true ELSE products.in_stock END;`}
      />

      <H>MySQL — INSERT ... ON DUPLICATE KEY UPDATE</H>

      <CodeBlock
        label="MySQL upsert syntax"
        code={`-- MySQL equivalent of PostgreSQL's ON CONFLICT DO UPDATE
INSERT INTO products (product_name, brand, unit_price, in_stock)
VALUES ('Amul Butter 500g', 'Amul', 285.00, true)
ON DUPLICATE KEY UPDATE
  unit_price = VALUES(unit_price),
  in_stock   = VALUES(in_stock);

-- VALUES(column) refers to the value from the INSERT attempt
-- Similar to PostgreSQL's EXCLUDED.column`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate upsert: try to insert an existing customer
-- The customer with email 'aisha.khan@gmail.com' already exists
-- ON CONFLICT DO NOTHING skips the insert silently

INSERT INTO customers (first_name, last_name, email, city, joined_date)
VALUES ('Aisha', 'Khan', 'aisha.khan@gmail.com', 'Mumbai', '2024-04-10')
ON CONFLICT (email) DO NOTHING;

-- Verify original record is unchanged
SELECT customer_id, first_name, last_name, city, joined_date
FROM customers
WHERE email = 'aisha.khan@gmail.com';`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="INSERT Safety — Preventing Data Corruption" />

      <P>INSERT is a write operation — it permanently changes the database. Getting it wrong in production can corrupt data, violate constraints, or create orphan records. These safety practices should be second nature before you run any INSERT on a real database.</P>

      <H>Always wrap related INSERTs in a transaction</H>
      <P>A transaction groups multiple statements so they either all succeed or all fail together. When inserting an order and its items, both must succeed — a partial insert (order without items, or items without an order) leaves the database in an inconsistent state.</P>

      <CodeBlock
        label="Transaction wrapping related INSERTs"
        code={`-- WRONG: two separate inserts — if the second fails, the first stays
INSERT INTO orders (customer_id, store_id, order_date, payment_method, total_amount)
VALUES (5, 'ST001', '2024-04-10', 'UPI', 856.00);

INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
VALUES (31, 3, 2, 428.00, 856.00);
-- If this fails, the order exists but has no items — data corruption

-- RIGHT: wrap in a transaction
BEGIN;
  INSERT INTO orders (customer_id, store_id, order_date, payment_method, total_amount)
  VALUES (5, 'ST001', '2024-04-10', 'UPI', 856.00)
  RETURNING order_id;  -- capture the generated order_id

  INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
  VALUES (31, 3, 2, 428.00, 856.00);
COMMIT;
-- If either INSERT fails, ROLLBACK automatically undoes both`}
      />

      <H>Use parameterised queries — never string interpolation</H>
      <P>In application code, never build INSERT statements by concatenating user input into a SQL string. This is the source of SQL injection attacks — one of the most critical security vulnerabilities in web applications.</P>

      <CodeBlock
        label="SQL injection prevention — parameterised queries"
        code={`-- WRONG: string interpolation (SQL injection vulnerability)
name = request.get('name')  # user input
query = f"INSERT INTO customers (first_name) VALUES ('{name}')"
# If name = "'; DROP TABLE customers; --"
# The query becomes: INSERT INTO customers (first_name) VALUES ('');
# DROP TABLE customers; --')
# This DELETES THE ENTIRE CUSTOMERS TABLE

-- RIGHT: parameterised query (Python psycopg2)
cursor.execute(
  "INSERT INTO customers (first_name, email) VALUES (%s, %s)",
  (name, email)  # values passed separately, never interpolated
)

-- RIGHT: parameterised query (Node.js with pg)
await client.query(
  'INSERT INTO customers (first_name, email) VALUES ($1, $2)',
  [name, email]
)

-- The database driver handles escaping — user input can never
-- break out of the value context into the SQL structure`}
      />

      <H>Verify before bulk insert — check the SELECT first</H>
      <P>Before running INSERT INTO ... SELECT, always run the SELECT alone and inspect the results. Confirm the row count, spot-check values, and verify the data looks correct before committing it to the target table.</P>

      <CodeBlock
        label="Verify-first pattern for INSERT INTO ... SELECT"
        code={`-- Step 1: run the SELECT and inspect results
SELECT customer_id, first_name, email, city
FROM customers_staging
WHERE import_batch = '2024-04-10'
LIMIT 20;

-- Step 2: check the count
SELECT COUNT(*) FROM customers_staging WHERE import_batch = '2024-04-10';

-- Step 3: check for potential FK violations
SELECT s.customer_id
FROM customers_staging s
LEFT JOIN customers c ON s.customer_id = c.customer_id
WHERE s.import_batch = '2024-04-10'
  AND c.customer_id IS NULL;  -- these would violate FK constraints

-- Step 4: only then run the INSERT
INSERT INTO customers (first_name, last_name, email, city)
SELECT first_name, last_name, email, city
FROM customers_staging
WHERE import_batch = '2024-04-10';`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="INSERT with DEFAULT and CURRENT Values" />

      <P>INSERT statements can use SQL functions and expressions as values — not just static literals. This is used extensively for timestamps, computed values, and defaults.</P>

      <CodeBlock
        label="INSERT with functions and expressions"
        code={`-- CURRENT_DATE and NOW() as values
INSERT INTO orders (customer_id, store_id, order_date, payment_method, total_amount)
VALUES (5, 'ST001', CURRENT_DATE, 'UPI', 856.00);
-- order_date gets today's date automatically

-- DEFAULT keyword — use the column's DEFAULT value explicitly
INSERT INTO customers (first_name, last_name, email, joined_date, loyalty_tier)
VALUES ('Rahul', 'Sharma', 'rahul@gmail.com', DEFAULT, DEFAULT);
-- joined_date gets CURRENT_DATE (its default)
-- loyalty_tier gets 'Bronze' (its default)

-- Computed values in VALUES
INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
VALUES (31, 5, 3, 56.00, 3 * 56.00);
-- line_total computed from quantity * unit_price directly in the INSERT

-- Expression from another query
INSERT INTO orders (customer_id, store_id, order_date, payment_method, total_amount)
VALUES (
  (SELECT customer_id FROM customers WHERE email = 'rahul@gmail.com'),
  'ST001',
  CURRENT_DATE,
  'UPI',
  1200.00
);`}
      />

      <SQLPlayground
        initialQuery={`-- Insert a new order using CURRENT_DATE and a computed line_total
-- Then immediately query to verify it was inserted correctly
INSERT INTO orders (
  customer_id, store_id, order_date,
  order_status, payment_method, total_amount
)
VALUES (
  3,           -- existing customer
  'ST003',     -- existing store
  CURRENT_DATE,
  'Processing',
  'UPI',
  1456.50
)
RETURNING order_id, customer_id, order_date, order_status, total_amount;`}
        height={180}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Bulk Loading — COPY and Large Data Imports" />

      <P>For large-scale data loading — millions of rows from CSV files, data migrations, ETL pipelines — INSERT statements one by one are too slow. Production databases provide specialised bulk load commands that bypass normal row-by-row processing and load data directly at the storage layer.</P>

      <H>PostgreSQL COPY — the fastest bulk loader</H>

      <CodeBlock
        label="PostgreSQL COPY command"
        code={`-- Load data from a CSV file directly into a table
COPY customers (first_name, last_name, email, city, joined_date, loyalty_tier)
FROM '/tmp/new_customers.csv'
WITH (
  FORMAT CSV,
  HEADER true,       -- first row is headers, skip it
  DELIMITER ',',
  NULL 'NULL',       -- how NULLs are represented in the file
  QUOTE '"'
);

-- Export table data to a CSV file
COPY customers TO '/tmp/customers_export.csv'
WITH (FORMAT CSV, HEADER true);

-- COPY from application code (psycopg2)
with open('customers.csv', 'r') as f:
    cursor.copy_expert(
        "COPY customers (first_name, email) FROM STDIN WITH CSV HEADER",
        f
    )

-- COPY is 10-100x faster than INSERT for large datasets:
-- 1 million rows via INSERT: ~60 seconds
-- 1 million rows via COPY:   ~3 seconds`}
      />

      <H>MySQL LOAD DATA INFILE</H>

      <CodeBlock
        label="MySQL bulk load"
        code={`-- MySQL equivalent of PostgreSQL COPY
LOAD DATA INFILE '/tmp/new_customers.csv'
INTO TABLE customers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS   -- skip header row
(first_name, last_name, email, city, @joined_date, loyalty_tier)
SET joined_date = STR_TO_DATE(@joined_date, '%Y-%m-%d');`}
      />

      <H>When to use COPY vs INSERT</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { title: 'Use INSERT for', color: C, items: ['Application-level inserts (user actions, API calls)', 'Small batches (1–1000 rows)', 'Rows that need constraint checking per-row', 'Upsert logic (ON CONFLICT)', 'When you need RETURNING for generated IDs'] },
          { title: 'Use COPY / LOAD DATA for', color: '#00e676', items: ['Bulk data loads (10,000+ rows)', 'CSV file imports', 'Data migrations between environments', 'ETL pipeline data loading', 'Initial database seeding with large datasets'] },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 10 }}>{item.title}</div>
            {item.items.map(i => (
              <p key={i} style={{ fontSize: 12, color: 'var(--text)', margin: '0 0 6px', lineHeight: 1.5 }}>· {i}</p>
            ))}
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Zepto, a 10-minute grocery delivery startup. It is 8 PM on a Friday. A new batch of 500 stores has been approved for onboarding — their data is in a staging table from the operations team's form submissions. You need to load them into production safely before the weekend.</P>

      <TimeBlock time="8:00 PM" label="Data arrives in staging table">
        The operations team has loaded the raw store data into stores_staging. Before touching production, you inspect the staging data.
      </TimeBlock>

      <CodeBlock
        label="Step 1 — inspect the staging data"
        code={`-- Check row count
SELECT COUNT(*) FROM stores_staging WHERE approved = true;
-- Returns: 500

-- Spot-check a few rows
SELECT * FROM stores_staging WHERE approved = true LIMIT 5;

-- Check for NULL values in required fields
SELECT COUNT(*) FROM stores_staging
WHERE approved = true
  AND (store_name IS NULL OR city IS NULL OR monthly_target IS NULL);
-- Returns: 0 — all required fields populated

-- Check for duplicate store codes
SELECT store_code, COUNT(*)
FROM stores_staging
WHERE approved = true
GROUP BY store_code
HAVING COUNT(*) > 1;
-- Returns: 0 rows — no duplicates`}
      />

      <TimeBlock time="8:20 PM" label="Check for conflicts with existing stores">
        Some stores in the staging table might already exist in production (re-submissions from a previous batch).
      </TimeBlock>

      <CodeBlock
        label="Step 2 — identify conflicts"
        code={`-- How many staging stores already exist in production?
SELECT COUNT(*)
FROM stores_staging s
JOIN stores p ON s.store_code = p.store_id
WHERE s.approved = true;
-- Returns: 12 — 12 stores already in production`}
      />

      <TimeBlock time="8:30 PM" label="Run the INSERT with upsert handling">
        You use ON CONFLICT DO NOTHING to skip existing stores silently, then verify the count.
      </TimeBlock>

      <CodeBlock
        label="Step 3 — safe bulk insert with conflict handling"
        code={`BEGIN;

INSERT INTO stores (
  store_id, store_name, city, state,
  manager_name, opened_date, monthly_target
)
SELECT
  store_code,
  store_name,
  city,
  state,
  manager_name,
  CURRENT_DATE,
  monthly_target
FROM stores_staging
WHERE approved = true
ON CONFLICT (store_id) DO NOTHING;

-- Verify: should have inserted 488 new stores (500 - 12 existing)
SELECT COUNT(*) FROM stores WHERE store_id IN (
  SELECT store_code FROM stores_staging WHERE approved = true
);

COMMIT;`}
      />

      <TimeBlock time="8:45 PM" label="All 488 new stores loaded, 12 skipped cleanly">
        The INSERT ran in 0.3 seconds. 488 new stores are in production. The 12 duplicates were skipped with no errors. You send a Slack message to the operations team: "500-store batch processed. 488 new stores onboarded, 12 already existed and were skipped." Done before 9 PM.
      </TimeBlock>

      <ProTip>
        The verify-before-insert pattern is not optional for production bulk loads. Always: (1) inspect the staging data for NULLs in required fields, (2) check for internal duplicates within the staging data, (3) check for conflicts with existing production data, (4) run the INSERT inside a transaction, (5) verify the inserted count matches the expected count. Finding a data quality issue before the INSERT costs you 10 minutes. Finding it after the INSERT costs you hours of cleanup.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between INSERT with VALUES and INSERT INTO ... SELECT?">
        <p style={{ margin: '0 0 14px' }}>INSERT with VALUES inserts explicitly specified data — the values are hardcoded in the statement. INSERT INTO ... SELECT inserts the results of a query — the data comes from existing tables, can be transformed by the SELECT, and is dynamic. Both insert rows into the same target table using the same constraints and triggers.</p>
        <p style={{ margin: '0 0 14px' }}>VALUES is used in application code for user-generated data: a new customer registration, a new order, a single product addition. The values come from application logic or user input. INSERT INTO ... SELECT is used for data pipeline operations: copying a subset of rows from one table to another, archiving old records to a history table, populating a summary table from raw data, or denormalising relational data into a flat reporting structure.</p>
        <p style={{ margin: 0 }}>A critical safety difference: INSERT INTO ... SELECT can insert zero rows (if the SELECT returns nothing) or millions of rows (if the SELECT is broad) without any error — the statement succeeds either way. Always verify the SELECT result count before running INSERT INTO ... SELECT in production. Run the SELECT alone first to confirm the data and row count are what you expect. VALUES inserts a fixed known number of rows — if the VALUES list has 5 tuples, exactly 5 rows are attempted (subject to constraint violations).</p>
      </IQ>

      <IQ q="What is an upsert and how do you implement it in PostgreSQL?">
        <p style={{ margin: '0 0 14px' }}>An upsert is an operation that inserts a row if it does not exist, or updates it if it does — combining INSERT and UPDATE into a single atomic operation. The name comes from combining "update" and "insert." Upserts are essential in systems that synchronise data from external sources, apply daily data feeds, or maintain running counters — where you cannot know in advance whether the row already exists.</p>
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL, upsert is implemented with the ON CONFLICT clause added to INSERT. ON CONFLICT (column) specifies which unique constraint defines a conflict — if the INSERT would violate that constraint, the conflict handler runs instead of throwing an error. ON CONFLICT DO NOTHING silently skips the conflicting row. ON CONFLICT DO UPDATE SET col = EXCLUDED.col updates the existing row with the new values — EXCLUDED is a special table reference to the row that was attempted to be inserted.</p>
        <p style={{ margin: 0 }}>A concrete example: syncing a product catalogue from a supplier feed that sends all products daily. Products already in the database should have their prices updated. New products should be inserted. INSERT INTO products (sku, name, price) SELECT sku, name, price FROM supplier_feed ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, updated_at = NOW() — this single statement handles both cases atomically, without needing separate INSERT and UPDATE logic in application code.</p>
      </IQ>

      <IQ q="Why should you always list column names in an INSERT statement?">
        <p style={{ margin: '0 0 14px' }}>Positional INSERT — INSERT INTO table VALUES (val1, val2, val3) without listing column names — requires values in the exact order columns were defined in CREATE TABLE. This order is invisible to anyone reading the query. If the schema changes — a column is added, removed, or reordered — the positional INSERT silently maps values to the wrong columns with no error. A new column added in position 3 causes the old value that belonged to the old column 3 to now be inserted into the new column.</p>
        <p style={{ margin: '0 0 14px' }}>Named INSERT — INSERT INTO table (col1, col2, col3) VALUES (val1, val2, val3) — is schema-change resistant. Adding a new column to the table does not affect existing named INSERTs — the new column receives its DEFAULT value or NULL, and all other columns receive their specified values. The mapping between column names and values is explicit, visible, and cannot be broken by column reordering.</p>
        <p style={{ margin: 0 }}>Named INSERT also makes queries self-documenting — anyone reading the statement can immediately see what each value represents without needing to look up the table definition. For a table with 15 columns, a positional INSERT with 15 values is completely unreadable without the schema. A named INSERT with 15 column-value pairs is self-explanatory. The professional standard: always name columns in INSERT statements, with no exceptions.</p>
      </IQ>

      <IQ q="What is SQL injection and how do parameterised queries prevent it?">
        <p style={{ margin: '0 0 14px' }}>SQL injection is an attack where malicious input data is interpreted as SQL commands rather than as data values. It occurs when application code builds SQL statements by concatenating user input directly into the SQL string. If a user enters '; DROP TABLE customers; -- as their name, and the application builds the query as INSERT INTO customers (name) VALUES ('' + name + ''), the resulting SQL is INSERT INTO customers (name) VALUES (''); DROP TABLE customers; -- '), which executes two statements: the INSERT and a DROP TABLE that deletes the entire customers table.</p>
        <p style={{ margin: '0 0 14px' }}>SQL injection is consistently ranked as a top web security vulnerability and has caused some of the largest data breaches in history. It requires no special tools — just crafted input in a web form, an API parameter, or a URL query string. The vulnerability is not in the database — it is in the application code that builds queries with string concatenation.</p>
        <p style={{ margin: 0 }}>Parameterised queries (also called prepared statements) prevent SQL injection by separating SQL structure from data values. The SQL template is sent to the database first: INSERT INTO customers (name) VALUES ($1). Then the value is sent separately: ['Priya']. The database driver handles all escaping and quoting — user input is always treated as a data value, never as SQL syntax. The malicious '; DROP TABLE customers; -- input would be stored as a literal string in the name column, doing no harm. Parameterised queries are mandatory for any application that accepts user input and are supported by every major database driver in every language.</p>
      </IQ>

      <IQ q="What is the RETURNING clause and when do you need it?">
        <p style={{ margin: '0 0 14px' }}>RETURNING is a PostgreSQL (and DuckDB) extension to INSERT, UPDATE, and DELETE that returns column values from the affected rows without requiring a separate SELECT. After INSERT, RETURNING most commonly returns the auto-generated primary key — which the application needs to reference the new row in subsequent operations. INSERT INTO orders (...) VALUES (...) RETURNING order_id returns the generated order_id immediately, which the application then uses to insert the corresponding order_items rows.</p>
        <p style={{ margin: '0 0 14px' }}>Without RETURNING, getting the generated ID requires a second query: SELECT MAX(order_id) FROM orders (unreliable in concurrent systems — another INSERT between your INSERT and SELECT could return the wrong ID) or a database-specific function like LAST_INSERT_ID() in MySQL (connection-scoped but only available immediately after the INSERT).</p>
        <p style={{ margin: 0 }}>RETURNING is also valuable for: confirming what was actually inserted (useful when DEFAULT values or triggers modify the row during INSERT), getting computed values that the database added (created_at timestamp, auto-generated codes), and chaining operations where the INSERT output feeds the next step. In an API that creates an order and returns the complete order record, RETURNING * on the INSERT avoids a SELECT round-trip to fetch the created record. MySQL does not support RETURNING — use LAST_INSERT_ID() or a subsequent SELECT for MySQL compatibility.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: duplicate key value violates unique constraint 'customers_email_key' — INSERT fails"
        cause="You are trying to insert a row where a column value (email) already exists in the table and that column has a UNIQUE constraint. This is the database correctly enforcing data integrity. Common causes: importing a batch that contains existing records, a user registering twice with the same email, or a migration script running multiple times."
        fix="Three options depending on intent. (1) Skip duplicates: add ON CONFLICT (email) DO NOTHING — the conflicting row is silently skipped. (2) Update existing: add ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name — updates the existing row with new values. (3) Check first: SELECT customer_id FROM customers WHERE email = 'the_email' — if a row exists, UPDATE instead of INSERT. Always use ON CONFLICT in batch imports where duplicates are expected rather than checking row-by-row in application code."
      />

      <Err
        msg="ERROR: insert or update on table 'order_items' violates foreign key constraint — order_id not present in orders"
        cause="You are trying to insert an order_item row referencing an order_id that does not exist in the orders table. Either the parent order was not inserted yet (wrong insertion order), the order was inserted in a different transaction that was not committed yet, or the order_id value is incorrect (typo or wrong variable)."
        fix="Always insert parent rows before child rows: INSERT the order first, get the generated order_id (using RETURNING or LAST_INSERT_ID()), then INSERT the order_items using that ID. Wrap both in a transaction: BEGIN; INSERT INTO orders...; INSERT INTO order_items...; COMMIT; — this guarantees atomicity. To diagnose: SELECT order_id FROM orders WHERE order_id = [the failing id] — if no row is returned, the parent order does not exist."
      />

      <Err
        msg="ERROR: null value in column 'email' violates not-null constraint — INSERT fails"
        cause="The INSERT did not include a value for email and that column has NOT NULL with no DEFAULT. Either you omitted email from the column list (so it defaults to NULL but NULL is not allowed), or you explicitly passed NULL as the email value, or the SELECT in an INSERT INTO ... SELECT returned NULL for that column."
        fix="Always include values for all NOT NULL columns without defaults. Check which columns are NOT NULL: SELECT column_name, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'customers'. Add the missing column and value to your INSERT. For INSERT INTO ... SELECT, check whether the source query might produce NULL for required columns: SELECT COUNT(*) FROM source WHERE email IS NULL — if any rows have NULL email, they will fail the insert."
      />

      <Err
        msg="INSERT INTO ... SELECT inserted 0 rows — expected thousands"
        cause="The SELECT query in your INSERT INTO ... SELECT returned no rows. The INSERT statement itself succeeded (no error) because inserting zero rows is valid SQL. This happens when: the WHERE condition in the SELECT was too restrictive, you specified the wrong source table, the staging table was empty because the data load had not run yet, or a date filter used the wrong date format."
        fix="Always run the SELECT independently before running INSERT INTO ... SELECT: copy the SELECT part of your statement, run it standalone, and verify the row count and a sample of results. If it returns 0 rows, debug the WHERE conditions and data source. Never assume INSERT INTO ... SELECT worked because no error was raised — always verify the affected row count afterward: SELECT COUNT(*) FROM target_table WHERE [identifying condition] to confirm the expected rows were added."
      />

      <Err
        msg="Inserted data has wrong values in wrong columns — first_name contains the email address"
        cause="You used positional INSERT (INSERT INTO table VALUES (...)) and the values are in a different order than the column definitions. When columns are listed positionally, every value must match the column at the same position in the CREATE TABLE statement — a position that is invisible in the INSERT itself. This is the silent wrong-column bug that named INSERT prevents."
        fix="Always use named INSERT: INSERT INTO table (col1, col2, col3) VALUES (val1, val2, val3). To fix corrupted rows: first identify the scope of the problem (SELECT COUNT(*) FROM table WHERE first_name LIKE '%@%' — email addresses in the first_name column), then UPDATE the affected rows with correct values. Going forward, enforce named INSERT in code review and never accept positional INSERT in any production query."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshCart is opening three new stores in Tier 2 cities. Write a single INSERT statement that adds all three stores at once. The stores are: (1) 'FreshCart Nagpur Central' in Nagpur, Maharashtra, managed by 'Suresh Rao', with a monthly target of ₹8,50,000. (2) 'FreshCart Indore Main' in Indore, Madhya Pradesh, managed by 'Anjali Singh', monthly target ₹7,20,000. (3) 'FreshCart Bhopal Square' in Bhopal, Madhya Pradesh, managed by 'Ramesh Tiwari', monthly target ₹6,80,000. Use store IDs ST011, ST012, ST013. Set opened_date to today. Then write a SELECT to verify all three were inserted."
        hint="Multi-row INSERT with three VALUES tuples. Use CURRENT_DATE for opened_date. Then SELECT WHERE store_id IN ('ST011','ST012','ST013')."
        answer={`-- Insert three new stores
INSERT INTO stores (store_id, store_name, city, state, manager_name, opened_date, monthly_target)
VALUES
  ('ST011', 'FreshCart Nagpur Central', 'Nagpur', 'Maharashtra',    'Suresh Rao',    CURRENT_DATE, 850000.00),
  ('ST012', 'FreshCart Indore Main',    'Indore', 'Madhya Pradesh', 'Anjali Singh',  CURRENT_DATE, 720000.00),
  ('ST013', 'FreshCart Bhopal Square',  'Bhopal', 'Madhya Pradesh', 'Ramesh Tiwari', CURRENT_DATE, 680000.00);

-- Verify all three were inserted
SELECT
  store_id,
  store_name,
  city,
  state,
  manager_name,
  opened_date,
  monthly_target
FROM stores
WHERE store_id IN ('ST011', 'ST012', 'ST013')
ORDER BY store_id;`}
        explanation="The multi-row INSERT adds all three stores in a single statement — one round-trip to the database, one transaction, one constraint check pass. Each tuple in VALUES maps to the column list in order: store_id → 'ST011', store_name → 'FreshCart Nagpur Central', etc. CURRENT_DATE is a SQL function that evaluates to today's date at execution time — the database fills it in, not the application. The verification SELECT uses IN with the three store IDs to confirm all three rows exist with correct values. In production you would wrap the INSERT in a transaction and check the affected row count equals 3 before committing."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Always list column names in INSERT — INSERT INTO table (col1, col2) VALUES (val1, val2). Never use positional INSERT. Schema changes silently corrupt positional inserts.',
          'Multi-row INSERT — VALUES (a1,b1), (a2,b2), (a3,b3) — is 10–100x faster than individual inserts for bulk operations. One round-trip, one transaction, one constraint check.',
          'INSERT INTO ... SELECT copies and transforms data from existing tables. Always run the SELECT alone first to verify row count and values before committing the insert.',
          'RETURNING (PostgreSQL/DuckDB) returns column values from inserted rows — essential for capturing auto-generated primary keys without a separate SELECT.',
          'ON CONFLICT DO NOTHING skips conflicting rows silently. ON CONFLICT DO UPDATE performs a true upsert — insert if new, update if exists. Both require specifying the conflicting constraint.',
          'Always wrap related INSERTs in a transaction — BEGIN; INSERT...; INSERT...; COMMIT. A partial insert (parent without children) leaves the database in an inconsistent state.',
          'Never build SQL strings by concatenating user input. Use parameterised queries — the database driver handles escaping and user input can never be interpreted as SQL.',
          'COPY (PostgreSQL) and LOAD DATA INFILE (MySQL) are 10–100x faster than INSERT for large bulk loads — millions of rows from CSV files in seconds.',
          'The verify-before-insert pattern for bulk loads: check NULLs in required fields, check internal duplicates, check FK conflicts with production data, run in a transaction, verify the inserted count afterward.',
          'MySQL uses LAST_INSERT_ID() to get the generated PK after INSERT. MySQL does not support RETURNING — it is PostgreSQL-specific.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 21</strong>, you learn UPDATE — modifying existing rows, updating multiple columns at once, updating from another table, and the most important safety rule in SQL: always run SELECT before UPDATE.
        </p>
        <Link href="/learn/sql/update" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 21 → UPDATE
        </Link>
      </div>

    </LearnLayout>
  );
}