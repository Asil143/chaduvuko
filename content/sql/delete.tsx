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

export default function Delete() {
  return (
    <LearnLayout
      title="DELETE — Removing Rows"
      description="Remove rows from tables safely — DELETE vs TRUNCATE, soft delete patterns, cascade deletes, referential integrity, and why SELECT before DELETE is non-negotiable"
      section="SQL — Module 22"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="DELETE Is Permanent — Treat It That Way" />

      <P>DELETE removes rows from a table. Unlike UPDATE — which can sometimes be partially reversed by running the opposite update — a DELETE that completes outside a transaction removes data permanently. There is no recycle bin, no undo button, no confirmation dialog. The rows are gone.</P>

      <P>At the same time, DELETE is a necessary and routine operation. Test data must be cleaned up. Cancelled orders past a retention period must be purged. Duplicate records must be removed. Knowing how to DELETE safely — not just syntactically — is a core professional skill.</P>

      <P>The same golden rule from UPDATE applies here, with even higher stakes:</P>

      <div style={{ background: 'rgba(255,71,87,0.08)', border: '2px solid rgba(255,71,87,0.4)', borderRadius: 10, padding: '20px 24px', margin: '20px 0 32px' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#ff4757', margin: '0 0 8px', fontFamily: 'var(--font-mono)' }}>The Golden Rule — Non-Negotiable</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Before every DELETE, run the equivalent SELECT with the same WHERE clause. Verify every row it returns is a row you intend to permanently remove. Zero exceptions.
        </p>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic Syntax — Deleting Specific Rows" />

      <CodeBlock
        label="DELETE syntax"
        code={`DELETE FROM table_name
WHERE condition;

-- Without WHERE: deletes EVERY row in the table
-- With WHERE: deletes only matching rows

-- Always: run equivalent SELECT first
SELECT * FROM table_name WHERE condition;
-- Verify, then:
DELETE FROM table_name WHERE condition;`}
      />

      <H>Delete one specific row by primary key</H>

      <SQLPlayground
        initialQuery={`-- Step 1: SELECT first — verify which row you are about to delete
SELECT order_id, customer_id, order_date, order_status, total_amount
FROM orders
WHERE order_id = 1030;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: DELETE after confirming the row
DELETE FROM orders
WHERE order_id = 1030;

-- Step 3: verify it is gone
SELECT order_id FROM orders WHERE order_id = 1030;
-- Should return 0 rows`}
        height={120}
        showSchema={false}
      />

      <H>Delete rows matching a condition</H>

      <SQLPlayground
        initialQuery={`-- SELECT first: how many cancelled orders are there?
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE order_status = 'Cancelled'
ORDER BY order_date;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- DELETE the cancelled orders
DELETE FROM orders
WHERE order_status = 'Cancelled';

-- Verify: no cancelled orders should remain
SELECT COUNT(*) AS remaining_cancelled
FROM orders
WHERE order_status = 'Cancelled';`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="DELETE vs TRUNCATE vs DROP — Three Different Operations" />

      <P>Three commands remove data from tables but they work very differently. Knowing which to use and when is important — using the wrong one can destroy more data than intended or leave orphaned rows in related tables.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Command', 'What it removes', 'WHERE clause', 'Rollback', 'Speed', 'Triggers', 'Use when'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['DELETE', 'Specific rows', 'Yes — required for safety', 'Yes (in transaction)', 'Slow on large tables', 'Yes — fires per row', 'Removing specific rows by condition'],
              ['TRUNCATE', 'All rows in table', 'No — removes everything', 'Yes (PostgreSQL), No (MySQL)', 'Very fast', 'No — skips triggers', 'Clearing a table completely (dev/staging reset)'],
              ['DROP TABLE', 'The entire table + its structure', 'No', 'Yes (in transaction)', 'Instant', 'No', 'Removing a table permanently from the schema'],
            ].map(([cmd, what, where, rollback, speed, triggers, use], i) => (
              <tr key={cmd} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: cmd === 'DELETE' ? '#00e676' : cmd === 'TRUNCATE' ? '#f59e0b' : '#ff4757', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{cmd}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{what}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{where}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{rollback}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{speed}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{triggers}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>TRUNCATE — fastest way to empty a table</H>

      <CodeBlock
        label="TRUNCATE syntax"
        code={`-- Remove ALL rows from a table — much faster than DELETE
TRUNCATE TABLE order_items;

-- PostgreSQL: TRUNCATE is transactional — can be rolled back
-- MySQL: TRUNCATE is NOT transactional — cannot be rolled back

-- TRUNCATE with RESTART IDENTITY (PostgreSQL)
-- Also resets the auto-increment sequence back to 1
TRUNCATE TABLE customers RESTART IDENTITY;

-- TRUNCATE with CASCADE (PostgreSQL)
-- Also truncates tables that have FK references to this table
TRUNCATE TABLE orders CASCADE;
-- WARNING: this also truncates order_items (which references orders)

-- Common use case: resetting a test/staging database
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE customers;
TRUNCATE TABLE products;
TRUNCATE TABLE stores;`}
      />

      <Callout type="warning">
        TRUNCATE in MySQL is NOT inside a transaction — it auto-commits and cannot be rolled back. Never use TRUNCATE on a MySQL production table unless you are absolutely certain you want every row gone. In PostgreSQL, TRUNCATE is transactional and can be rolled back, making it safer. Always know which database you are on before using TRUNCATE.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Soft Delete — The Production Alternative to DELETE" />

      <P>In production systems at most Indian tech companies, rows are almost never actually deleted from the database. Instead they use a pattern called <Hl>soft delete</Hl> — adding an is_deleted boolean column (or a deleted_at timestamp) and setting it to true/now when a row should be "deleted." The row stays in the database but is excluded from all normal queries.</P>

      <H>Why soft delete instead of real delete</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { title: 'Auditability', desc: 'Regulators and compliance teams need to see what happened to every record. A truly deleted row leaves no trace — a soft-deleted row is permanently auditable.' },
          { title: 'Recovery', desc: 'Users accidentally delete things. With soft delete, restoring is a single UPDATE. With real delete, recovery requires a database backup restore which takes hours.' },
          { title: 'Referential integrity', desc: 'A deleted customer still has orders in the orders table. With hard delete, those orders become orphaned. With soft delete, the customer row stays and relationships remain intact.' },
          { title: 'Data analysis', desc: 'Historical data has analytical value even after the record is "deleted." Churned customers, cancelled orders, and removed products all tell business stories.' },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>Implementing soft delete</H>

      <CodeBlock
        label="Soft delete schema and query patterns"
        code={`-- Schema: add is_deleted column (or deleted_at timestamp)
ALTER TABLE customers ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE customers ADD COLUMN deleted_at TIMESTAMPTZ;

-- Soft delete: UPDATE instead of DELETE
UPDATE customers
SET
  is_deleted = true,
  deleted_at = NOW()
WHERE customer_id = 42;

-- All normal queries must exclude soft-deleted rows
SELECT * FROM customers WHERE is_deleted = false;
-- Or using deleted_at:
SELECT * FROM customers WHERE deleted_at IS NULL;

-- Recovery: set is_deleted back to false
UPDATE customers
SET is_deleted = false, deleted_at = NULL
WHERE customer_id = 42;

-- Periodic hard delete of very old soft-deleted rows (GDPR compliance)
DELETE FROM customers
WHERE is_deleted = true
  AND deleted_at < NOW() - INTERVAL '2 years';`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate soft delete: mark a product as deleted
-- without actually removing the row
UPDATE products
SET in_stock = false
WHERE product_id = 8;

-- Query that excludes "deleted" products (in_stock = false as proxy)
SELECT product_id, product_name, brand, unit_price, in_stock
FROM products
WHERE in_stock = true
ORDER BY product_name
LIMIT 10;`}
        height={175}
        showSchema={true}
      />

      <H>Soft delete with views — transparent filtering</H>
      <P>A common production pattern is creating a database view that automatically filters out soft-deleted rows. Application code queries the view instead of the base table — it never sees deleted rows without any extra WHERE condition.</P>

      <CodeBlock
        label="Soft delete view — transparent filtering"
        code={`-- Create a view that automatically excludes soft-deleted rows
CREATE VIEW active_customers AS
SELECT * FROM customers WHERE is_deleted = false;

-- Application code queries the view, never the base table
SELECT * FROM active_customers WHERE city = 'Bangalore';
-- Automatically excludes deleted customers

-- Admin/audit queries use the base table directly
SELECT * FROM customers WHERE is_deleted = true;
-- Shows only deleted customers for audit purposes`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="DELETE with Subqueries — Deleting Based on Another Table" />

      <P>DELETE can use a subquery in the WHERE clause to identify which rows to remove based on data in another table — similar to the UPDATE FROM pattern.</P>

      <SQLPlayground
        initialQuery={`-- Find order_items for cancelled orders
-- These are the rows we would delete in a cleanup operation
SELECT oi.item_id, oi.order_id, oi.product_id, oi.line_total
FROM order_items AS oi
WHERE oi.order_id IN (
  SELECT order_id FROM orders WHERE order_status = 'Cancelled'
)
ORDER BY oi.order_id;`}
        height={155}
        showSchema={true}
      />

      <CodeBlock
        label="DELETE using a subquery"
        code={`-- Delete order_items for all cancelled orders
-- Step 1: verify with SELECT (shown above)
-- Step 2: delete

DELETE FROM order_items
WHERE order_id IN (
  SELECT order_id
  FROM orders
  WHERE order_status = 'Cancelled'
);

-- Note: if orders has ON DELETE CASCADE to order_items,
-- deleting from orders automatically deletes the order_items
-- The above is for cases without CASCADE

-- PostgreSQL: DELETE with USING (like UPDATE FROM)
DELETE FROM order_items AS oi
USING orders AS o
WHERE oi.order_id = o.order_id
  AND o.order_status = 'Cancelled';`}
      />

      <SQLPlayground
        initialQuery={`-- Preview: products that have never been ordered
-- These might be candidates for removal from the catalogue
SELECT p.product_id, p.product_name, p.brand, p.unit_price
FROM products AS p
WHERE p.product_id NOT IN (
  SELECT DISTINCT product_id FROM order_items
)
ORDER BY p.product_name;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Cascade Deletes — When FK Relationships Handle Cleanup" />

      <P>When tables have foreign keys with ON DELETE CASCADE, deleting a parent row automatically deletes all child rows that reference it. This is the database handling the cleanup for you — but it means a single DELETE can remove far more rows than you see in the one table you are targeting.</P>

      <CodeBlock
        label="CASCADE delete — what gets deleted"
        code={`-- FreshMart FK relationships with CASCADE:
-- order_items.order_id → orders.order_id ON DELETE CASCADE

-- Deleting one order also deletes all its order_items
DELETE FROM orders WHERE order_id = 1007;
-- This also deletes:
-- All rows in order_items WHERE order_id = 1007
-- (because of ON DELETE CASCADE)

-- Always check which tables have CASCADE FKs before deleting
-- A DELETE from a parent table can cascade through multiple levels

-- To see CASCADE relationships:
-- Check your CREATE TABLE statements for ON DELETE CASCADE clauses`}
      />

      <SQLPlayground
        initialQuery={`-- Before any delete from orders, understand the impact
-- How many order_items would be cascade-deleted?
SELECT
  o.order_id,
  o.order_status,
  o.total_amount,
  COUNT(oi.item_id)   AS items_that_would_cascade
FROM orders AS o
LEFT JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_status = 'Returned'
GROUP BY o.order_id, o.order_status, o.total_amount
ORDER BY o.order_id;`}
        height={185}
        showSchema={false}
      />

      <Callout type="warning">
        Before deleting from any parent table, always check what CASCADE relationships exist. A single DELETE FROM orders WHERE order_status = 'Cancelled' can cascade-delete thousands of order_items rows silently. Always count the total rows that will be affected across all cascading tables before executing a delete on a parent table with CASCADE FKs.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="RETURNING on DELETE — Capture What You Removed" />

      <P>In PostgreSQL and DuckDB, RETURNING works on DELETE just like on INSERT and UPDATE — it returns the values of the deleted rows before they are removed. This is essential for audit logging, archiving before deletion, and confirming exactly what was deleted.</P>

      <SQLPlayground
        initialQuery={`-- Delete returned orders and capture what was deleted
DELETE FROM orders
WHERE order_status = 'Returned'
RETURNING order_id, customer_id, order_date, total_amount, order_status;`}
        height={120}
        showSchema={true}
      />

      <CodeBlock
        label="Archive-then-delete pattern using RETURNING"
        code={`-- Archive cancelled orders before deleting them
-- Using CTE with RETURNING to capture deleted rows
WITH deleted_orders AS (
  DELETE FROM orders
  WHERE order_status = 'Cancelled'
    AND order_date < CURRENT_DATE - INTERVAL '1 year'
  RETURNING *
)
INSERT INTO orders_archive
SELECT *, NOW() AS archived_at
FROM deleted_orders;

-- This single statement:
-- 1. Deletes old cancelled orders from orders
-- 2. Inserts the deleted rows into orders_archive
-- All in one atomic transaction`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Batch Deletes — Safely Removing Large Numbers of Rows" />

      <P>Just like large UPDATE operations, deleting millions of rows in one statement holds locks, blocks other queries, and risks a long rollback if something goes wrong. The same batch pattern applies.</P>

      <CodeBlock
        label="Batch delete pattern — process in chunks"
        code={`-- Instead of deleting 10 million rows at once:
DELETE FROM events WHERE created_at < '2022-01-01';
-- Holds locks for minutes, blocks all other queries

-- Better: batch in chunks of 10,000 rows
-- Run from application code or a scheduled job:

-- Iteration 1:
DELETE FROM events
WHERE event_id IN (
  SELECT event_id FROM events
  WHERE created_at < '2022-01-01'
  LIMIT 10000
);
-- COMMIT; (affected row count will be <= 10000)

-- Repeat until 0 rows affected:
-- Iteration 2, 3, ... until done

-- PostgreSQL shorthand:
DELETE FROM events
WHERE created_at < '2022-01-01'
  AND event_id IN (
    SELECT event_id FROM events
    WHERE created_at < '2022-01-01'
    ORDER BY event_id
    LIMIT 10000
  );`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="DELETE Safety Checklist" />

      <P>Run through this checklist before every DELETE that touches real data.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '20px 0 32px' }}>
        {[
          { n: '01', q: 'Did you run SELECT with the identical WHERE first?', a: 'Non-negotiable. Count the rows and inspect a sample. Confirm every row returned is a row you intend to permanently remove.' },
          { n: '02', q: 'Does the DELETE have a WHERE clause?', a: 'Always. A DELETE without WHERE removes every row. If you genuinely need to delete everything, use TRUNCATE and name it explicitly in a comment.' },
          { n: '03', q: 'Are there CASCADE relationships on this table?', a: 'Check your schema for ON DELETE CASCADE. A delete from orders also deletes order_items — count how many cascade rows will be affected.' },
          { n: '04', q: 'Is this wrapped in a transaction?', a: 'For any consequential delete (more than a handful of test rows), wrap in BEGIN; DELETE...; SELECT (verify); COMMIT or ROLLBACK.' },
          { n: '05', q: 'Is there a backup or soft-delete alternative?', a: 'For important data, consider soft delete (UPDATE is_deleted = true) rather than hard delete. For production hard deletes, confirm a recent backup exists.' },
          { n: '06', q: 'Did you verify the affected row count after deletion?', a: 'Check that the count matches your expectation. 0 rows deleted means the WHERE matched nothing. 10,000 rows deleted when you expected 10 means something is wrong.' },
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

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="GDPR and Data Retention — Real-World Delete Scenarios" />

      <P>Indian tech companies that handle personal data are increasingly subject to data privacy regulations — India's Digital Personal Data Protection Act (DPDPA), GDPR for European users, and RBI guidelines for financial data. These regulations create specific requirements around when data must be deleted.</P>

      <H>Right to erasure — deleting a specific user's data</H>

      <CodeBlock
        label="GDPR right to erasure — delete all data for one user"
        code={`-- A customer requests complete data deletion
-- Must delete from all tables in dependency order

BEGIN;

-- Step 1: delete child tables first (to avoid FK violations)
DELETE FROM order_items
WHERE order_id IN (
  SELECT order_id FROM orders WHERE customer_id = 42
);

-- Step 2: delete orders
DELETE FROM orders WHERE customer_id = 42;

-- Step 3: delete the customer record
DELETE FROM customers WHERE customer_id = 42;

-- Step 4: delete from any other tables that reference this customer
-- (reviews, addresses, payment methods, etc.)

COMMIT;

-- Alternative: soft delete everything and schedule hard delete
-- This preserves referential integrity while honouring the request
UPDATE customers SET is_deleted = true, deleted_at = NOW()
WHERE customer_id = 42;`}
      />

      <H>Data retention — purging old records</H>

      <CodeBlock
        label="Data retention policy — automated purge job"
        code={`-- Purge orders older than 7 years (typical financial retention period)
-- Run as a scheduled job (cron / Airflow / Lambda)

BEGIN;

-- Archive first, then delete
INSERT INTO orders_archive
SELECT *, NOW() AS archived_at
FROM orders
WHERE order_date < CURRENT_DATE - INTERVAL '7 years';

DELETE FROM order_items
WHERE order_id IN (
  SELECT order_id FROM orders
  WHERE order_date < CURRENT_DATE - INTERVAL '7 years'
);

DELETE FROM orders
WHERE order_date < CURRENT_DATE - INTERVAL '7 years';

COMMIT;

-- Log the purge operation
INSERT INTO data_governance_log (operation, table_name, rows_affected, run_at)
VALUES ('RETENTION_PURGE', 'orders', [affected_count], NOW());`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Zepto. The product team runs a referral program — customers get a bonus when they refer a new user. The fraud team has identified 23 referral bonus credits that were fraudulently generated — a user created fake accounts to claim multiple bonuses. You need to delete these credits safely from the production database.</P>

      <TimeBlock time="11:00 AM" label="Fraud team shares the list">
        They send a CSV with 23 referral_credit_ids that were fraudulently generated. You load them into a staging table: fraudulent_credits_2024_04.
      </TimeBlock>

      <TimeBlock time="11:15 AM" label="Step 1 — verify the scope">
        Before touching production, understand exactly what you are about to delete.
      </TimeBlock>

      <CodeBlock
        label="Step 1 — scope verification"
        code={`-- How many credits are flagged?
SELECT COUNT(*) FROM fraudulent_credits_2024_04;
-- Returns: 23

-- What do these credits look like?
SELECT
  rc.credit_id,
  rc.customer_id,
  c.email,
  rc.amount,
  rc.created_at,
  rc.referral_code_used
FROM referral_credits AS rc
JOIN customers AS c ON rc.customer_id = c.customer_id
WHERE rc.credit_id IN (
  SELECT credit_id FROM fraudulent_credits_2024_04
)
ORDER BY rc.created_at;

-- Are any of these credits already applied to orders?
SELECT COUNT(*)
FROM orders
WHERE referral_credit_applied IN (
  SELECT credit_id FROM fraudulent_credits_2024_04
);
-- Returns: 3 — three orders already used these credits
-- Those orders need to be handled separately before deleting the credits`}
      />

      <TimeBlock time="11:35 AM" label="Step 2 — handle the 3 credits already applied">
        Three credits were already applied to orders. The finance team decides to adjust those orders (not delete them). You get approval for the adjustment approach.
      </TimeBlock>

      <TimeBlock time="11:50 AM" label="Step 3 — delete the 20 unapplied credits inside a transaction" children={undefined}>
        </TimeBlock>

      <CodeBlock
        label="Step 3 — safe delete inside transaction"
        code={`BEGIN;

-- Delete the 20 unapplied fraudulent credits
DELETE FROM referral_credits
WHERE credit_id IN (
  SELECT credit_id FROM fraudulent_credits_2024_04
)
  AND credit_id NOT IN (
  -- Exclude the 3 that are already applied to orders
  SELECT referral_credit_applied FROM orders
  WHERE referral_credit_applied IS NOT NULL
);

-- Verify: exactly 20 rows deleted
SELECT COUNT(*) FROM referral_credits
WHERE credit_id IN (
  SELECT credit_id FROM fraudulent_credits_2024_04
);
-- Should return 3 (the ones still attached to orders)

-- If count = 3: commit
COMMIT;

-- Audit log
INSERT INTO security_audit_log (
  action, table_name, rows_affected,
  performed_by, ticket_ref, performed_at
)
VALUES (
  'FRAUD_DELETE', 'referral_credits', 20,
  'engineer_name', 'FRAUD-2024-0042', NOW()
);`}
      />

      <TimeBlock time="12:10 PM" label="Done — 20 fraudulent credits deleted, 3 flagged for manual review">
        The delete affected exactly 20 rows as expected. The audit log records the operation with the ticket reference. You send a summary to the fraud team: "20 of 23 fraudulent credits deleted. 3 credits (IDs: 891, 923, 947) were already applied to orders — these have been escalated to finance for manual adjustment. All operations logged under FRAUD-2024-0042."
      </TimeBlock>

      <ProTip>
        Every DELETE on production data at a company with compliance requirements should generate an audit log entry — what was deleted, when, by whom, and why (ticket/ticket reference). This is not just good practice — in regulated industries (fintech, health, e-commerce) it is a legal requirement. Build audit logging into your delete workflow from the start, not as an afterthought.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between DELETE, TRUNCATE, and DROP TABLE?">
        <p style={{ margin: '0 0 14px' }}>DELETE is a DML (Data Manipulation Language) command that removes specific rows based on a WHERE condition, or all rows if no WHERE is given. DELETE is fully transactional in all databases — it can be rolled back if inside an uncommitted transaction. DELETE fires triggers, respects foreign key constraints, and logs each row deletion to the transaction log. On large tables DELETE is slow because every row removal is individually logged.</p>
        <p style={{ margin: '0 0 14px' }}>TRUNCATE is a DDL (Data Definition Language) command that removes all rows from a table at once. It does not use a WHERE clause — it is all-or-nothing. TRUNCATE is much faster than DELETE because it deallocates data pages rather than removing rows one by one. In PostgreSQL, TRUNCATE is transactional and can be rolled back. In MySQL, TRUNCATE is NOT transactional and auto-commits — it cannot be rolled back. TRUNCATE does not fire row-level triggers and bypasses foreign key cascade rules (you must truncate in dependency order or use CASCADE).</p>
        <p style={{ margin: 0 }}>DROP TABLE removes the entire table — both all the data and the table structure (column definitions, constraints, indexes). It is irreversible without a backup. Use DROP TABLE when decommissioning a feature or cleaning up a table that is no longer needed. The choice in practice: DELETE for removing specific rows in production, TRUNCATE for resetting test/staging environments, DROP TABLE for schema changes during development or migrations.</p>
      </IQ>

      <IQ q="What is soft delete and why do most production applications prefer it over hard delete?">
        <p style={{ margin: '0 0 14px' }}>Soft delete is a pattern where rows are never physically removed from the database — instead a column (typically is_deleted BOOLEAN or deleted_at TIMESTAMP) is set to mark the row as logically deleted. All normal application queries include WHERE is_deleted = false (or WHERE deleted_at IS NULL) to exclude soft-deleted rows. The actual data remains in the database indefinitely or until a scheduled hard delete after a retention period.</p>
        <p style={{ margin: '0 0 14px' }}>Four reasons production applications prefer soft delete: First, auditability — regulators, auditors, and compliance teams need to see the full history of what happened to every record. A hard-deleted row leaves no trace. A soft-deleted row is permanently visible to audit queries. Second, recovery — users accidentally delete things daily. With soft delete, recovery is UPDATE is_deleted = false — instant. With hard delete, recovery requires a database backup restore, potentially losing hours of other changes. Third, referential integrity — a hard-deleted customer still has orders in the orders table that now reference a non-existent customer. Soft delete keeps the customer row, preserving all relationships. Fourth, analytics — churned customers, removed products, and cancelled subscriptions have analytical value. Their historical data answers questions about why users leave and which products fail.</p>
        <p style={{ margin: 0 }}>The trade-offs: soft delete means the table grows indefinitely unless a periodic hard delete runs for very old soft-deleted rows. All queries must include the is_deleted filter — missing it returns deleted rows, which is a bug. Indexes must be designed to efficiently filter on is_deleted. And UNIQUE constraints become complex — if an email is soft-deleted, can a new user register with the same email? These are solvable problems, but they require deliberate design. Most Indian tech companies (Swiggy, Razorpay, CRED) use soft delete for user-facing data and compliance-sensitive tables, and use hard delete only for truly ephemeral data like session tokens and temporary processing records.</p>
      </IQ>

      <IQ q="How do CASCADE deletes work and what are the risks?">
        <p style={{ margin: '0 0 14px' }}>When a foreign key is defined with ON DELETE CASCADE, deleting a row from the parent table automatically deletes all rows in child tables that reference the deleted parent. This cascades through multiple levels — if table A references B with CASCADE, and table C references A with CASCADE, deleting from B automatically deletes from A and then from C.</p>
        <p style={{ margin: '0 0 14px' }}>The mechanism: the database engine, after deleting the parent row, searches all FK relationships on that table for CASCADE constraints. For each found FK with CASCADE, it deletes the referencing rows from the child table — which may trigger further cascades in tables that reference the child. This all happens atomically within the same transaction. The entire cascade either succeeds or rolls back together.</p>
        <p style={{ margin: 0 }}>The risks: a CASCADE delete from a parent table can silently remove far more rows than you intended. DELETE FROM orders WHERE order_id = 1007 might also delete 5 rows from order_items via CASCADE — if you did not know about the CASCADE relationship, the order_items deletion is invisible and surprising. Before deleting from any table, always check which FK relationships have CASCADE and estimate how many rows will be affected across all cascading tables. Count them with SELECT queries before the DELETE. Another risk: poorly designed CASCADE chains can make a single DELETE catastrophically broad — a DELETE from a top-level table cascades through 5 child tables, removing thousands of rows you did not intend to touch. Restrict CASCADE to genuinely containment relationships (order_items to orders) and use RESTRICT for association relationships (orders to customers).</p>
      </IQ>

      <IQ q="How do you delete duplicate rows from a table while keeping one copy?">
        <p style={{ margin: '0 0 14px' }}>Deleting duplicates requires identifying which rows to keep and which to delete. The standard approach uses a CTE (Common Table Expression) with ROW_NUMBER() to assign a rank to each duplicate group — keeping the row with rank 1 and deleting the rest.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern in PostgreSQL: <code style={{ background: 'var(--bg2)', padding: '2px 4px', borderRadius: 4, fontSize: '0.9em', fontFamily: 'var(--font-mono)' }}>WITH duplicates AS (SELECT customer_id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY customer_id ASC) AS rn FROM customers) DELETE FROM customers WHERE customer_id IN (SELECT customer_id FROM duplicates WHERE rn {'>'} 1);</code>. The PARTITION BY email groups rows by email address. ROW_NUMBER() assigns 1 to the first occurrence (by customer_id order) and 2, 3, etc. to subsequent duplicates. The DELETE removes all rows where rn {'>'} 1 — keeping exactly one row per email.</p>
        <p style={{ margin: 0 }}>Choosing which duplicate to keep: ORDER BY customer_id ASC keeps the oldest (lowest ID, first inserted). ORDER BY customer_id DESC keeps the newest. ORDER BY updated_at DESC keeps the most recently modified. The choice depends on which duplicate has the most complete or most current data. Always run the CTE as a SELECT first — SELECT * FROM duplicates WHERE rn {'>'} 1 — to see exactly which rows will be deleted before converting it to a DELETE statement. For tables with hundreds of millions of rows, batch the duplicate deletion by adding a LIMIT to avoid locking the table for too long.</p>
      </IQ>

      <IQ q="A junior engineer accidentally runs DELETE FROM customers without a WHERE clause on production. What do you do?">
        <p style={{ margin: '0 0 14px' }}>The first action depends on whether the statement is still running or has already completed. If it is still running — interrupt it immediately. In PostgreSQL, find the process with SELECT pid, query FROM pg_stat_activity WHERE state = 'active' and terminate it with SELECT pg_terminate_backend(pid). If the DELETE was running inside an explicit transaction and has not been committed, terminating the connection automatically rolls back the transaction — all rows are restored. This is why wrapping destructive operations in explicit transactions is critical.</p>
        <p style={{ margin: '0 0 14px' }}>If the DELETE has already committed: assess the damage immediately. Determine when the DELETE ran (check database logs or application logs) and how old the most recent backup is. In PostgreSQL, point-in-time recovery (PITR) using WAL (write-ahead logs) can restore the database to the exact state immediately before the DELETE — this is the fastest recovery path and preserves all changes made after the last base backup. Contact your DBA immediately — this is not a situation to handle alone.</p>
        <p style={{ margin: 0 }}>Prevention for the future: enable query review requirements for destructive operations on production (require a second engineer to approve the SQL before execution), implement a "safe mode" in your SQL client that prevents DELETE/UPDATE without WHERE, use row-level security policies that limit which users can run DELETE, add automated backups with short RPO (Recovery Point Objective) so the maximum data loss window is small, and make soft delete the default for all user-facing tables so hard delete is rarely necessary. This incident should trigger a blameless post-mortem focused on system improvements rather than individual punishment — the system should make it impossible to cause this level of damage with a single command.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: update or delete on table 'customers' violates foreign key constraint on table 'orders'"
        cause="You tried to delete a customer who has orders in the orders table. The FK constraint on orders.customer_id → customers.customer_id with ON DELETE RESTRICT (the default) prevents the deletion because deleting the customer would orphan their orders. The database is correctly protecting referential integrity."
        fix="Three options: (1) Delete the child rows first, then the parent: DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id = 42); DELETE FROM orders WHERE customer_id = 42; DELETE FROM customers WHERE customer_id = 42. (2) Use soft delete instead: UPDATE customers SET is_deleted = true WHERE customer_id = 42. (3) Change the FK to ON DELETE CASCADE — but only if child rows are genuinely meaningless without the parent, which orders usually are not (they are financial records)."
      />

      <Err
        msg="DELETE removed 50,000 rows — expected to remove 50"
        cause="The WHERE clause was less specific than intended — it matched far more rows than expected. Common causes: a missing AND condition, using OR when AND was intended, a date range that was too broad, or a condition that matched on a non-unique column when a unique identifier should have been used. This is the most catastrophic DELETE error class because it is silent — no error, just too much data gone."
        fix="If inside a transaction: ROLLBACK immediately. If already committed: check the most recent database backup and begin point-in-time recovery. Going forward: always run SELECT COUNT(*) with the identical WHERE before DELETE, verify the count matches expectations, wrap in a transaction, and check the affected row count reported by the DELETE statement before COMMIT. Many teams require a second person to verify the SELECT output before any DELETE affecting more than 100 rows in production."
      />

      <Err
        msg="TRUNCATE fails — cannot truncate table referenced in a foreign key constraint"
        cause="You tried to TRUNCATE a parent table that has child tables with FK references to it. TRUNCATE cannot check and cascade FK relationships the same way DELETE does — it would leave the child table with orphaned rows pointing to a now-empty parent. PostgreSQL blocks this by default."
        fix="Use TRUNCATE TABLE parent_table CASCADE to also truncate all FK-referencing child tables simultaneously. WARNING: this will empty ALL child tables too — verify this is what you want before running. Alternatively, TRUNCATE in dependency order: TRUNCATE the child tables first, then the parent. TRUNCATE order_items; TRUNCATE orders; TRUNCATE customers; — child tables first, parent tables last. In MySQL, disable foreign key checks temporarily: SET FOREIGN_KEY_CHECKS = 0; TRUNCATE ...; SET FOREIGN_KEY_CHECKS = 1; — but only in controlled environments, never in production with live application traffic."
      />

      <Err
        msg="DELETE 0 rows — expected to delete several records"
        cause="The WHERE clause matched no rows. Common causes: the filter value does not match what is stored (case difference, leading/trailing whitespace, wrong ID), the rows were already deleted by another process, a date filter using the wrong format, or a subquery that returns no rows making the IN condition match nothing."
        fix="Run the equivalent SELECT: SELECT * FROM table WHERE [identical WHERE condition]. If it returns 0 rows, investigate the filter. Check actual stored values: SELECT DISTINCT status FROM table to see what values exist. Check for case issues: WHERE LOWER(column) = LOWER('value'). Check for whitespace: WHERE TRIM(column) = 'value'. For subquery-based deletes, run the subquery alone first to confirm it returns the expected rows."
      />

      <Err
        msg="DELETE is very slow — takes 20 minutes on a table with 50 million rows"
        cause="Deleting millions of rows from a large table is slow for two reasons: the database logs every row deletion individually to the transaction log (for rollback capability), and every deleted row requires updating all indexes on that table. On a table with 10 indexes, deleting one row updates 10 indexes. Deleting 50 million rows updates 10 indexes × 50 million times. Additionally, a long-running DELETE holds locks that block other queries."
        fix="Three approaches in order of preference: (1) Batch delete: add LIMIT 10000 and loop until 0 rows affected — each batch commits quickly, releases locks, and keeps the operation visible to other queries. (2) If deleting most rows, consider creating a new table with only the rows you want to keep, swapping table names, then dropping the old table — faster than deleting the majority. (3) If indexes are the bottleneck, drop non-essential indexes before the bulk delete and recreate them after — index creation on a static table is faster than maintaining indexes during deletion. For truly massive tables, discuss with a DBA before attempting any approach."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshMart's data team needs to clean up test data that was inserted during a recent load test. All test data has customer emails ending in '@test.freshmart.com'. Write: (1) A SELECT to find all test customers and how many orders they have each. (2) The DELETE to remove test order_items first (for orders belonging to test customers). (3) The DELETE to remove test orders. (4) The DELETE to remove the test customers themselves. Show the correct order."
        hint="Delete in dependency order: order_items first, then orders, then customers. Use subqueries in WHERE: WHERE order_id IN (SELECT order_id FROM orders WHERE customer_id IN (SELECT customer_id FROM customers WHERE email LIKE '%@test.freshmart.com'))."
        answer={`-- Step 1: Verify scope — find test customers and their order counts
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  COUNT(o.order_id)                   AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE c.email LIKE '%@test.freshmart.com'
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY c.customer_id;

-- Step 2: Delete order_items for test customers' orders
DELETE FROM order_items
WHERE order_id IN (
  SELECT order_id FROM orders
  WHERE customer_id IN (
    SELECT customer_id FROM customers
    WHERE email LIKE '%@test.freshmart.com'
  )
);

-- Step 3: Delete orders belonging to test customers
DELETE FROM orders
WHERE customer_id IN (
  SELECT customer_id FROM customers
  WHERE email LIKE '%@test.freshmart.com'
);

-- Step 4: Delete the test customers
DELETE FROM customers
WHERE email LIKE '%@test.freshmart.com';

-- Verify: no test data remains
SELECT COUNT(*) AS remaining_test_customers
FROM customers
WHERE email LIKE '%@test.freshmart.com';`}
        explanation="Deletion must follow dependency order — deepest child first (order_items), then intermediate (orders), then parent (customers). Reversing this order causes FK constraint violations at every step. Each DELETE uses a nested subquery to identify the rows: order_items need the order_ids, which need the customer_ids, which are identified by the email pattern. The LIKE '%@test.freshmart.com' pattern matches any email ending with the test domain. In production, wrap all four statements in a single BEGIN/COMMIT transaction so either all test data is cleaned up or none of it is — preventing a partial cleanup state where some test customers remain without their orders."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'DELETE is permanent without a transaction. The golden rule: run SELECT with the identical WHERE first, verify every row is one you intend to remove, then DELETE.',
          'Always include WHERE in DELETE. DELETE without WHERE removes every row in the table — immediately and permanently (without a transaction to roll back).',
          'DELETE vs TRUNCATE vs DROP: DELETE removes specific rows (transactional, slow, fires triggers). TRUNCATE removes all rows (fast, no triggers, NOT transactional in MySQL). DROP removes the entire table structure.',
          'Soft delete — UPDATE is_deleted = true — is the production standard for user-facing data. It preserves referential integrity, enables recovery, satisfies audit requirements, and retains analytical value.',
          'CASCADE deletes propagate through FK relationships silently. Before deleting from a parent table, count all rows that will cascade-delete from child tables. Always know your FK relationships.',
          'RETURNING on DELETE (PostgreSQL/DuckDB) returns the deleted row values — use it to archive before deleting, generate audit logs, or confirm what was removed.',
          'Delete in dependency order: delete child table rows before parent table rows. Reversing the order causes FK constraint violations.',
          'Batch large deletes: LIMIT 10000 in a loop until 0 rows affected. Keeps locks short, prevents application timeouts, and limits rollback cost per batch.',
          'Every production DELETE should be logged in an audit table: what was deleted, when, by whom, and the ticket/reason reference. This is a legal requirement in regulated industries.',
          'For GDPR/DPDPA right-to-erasure requests: delete in dependency order, or use soft delete and schedule a hard delete after the legal retention period. Log the deletion operation with the request reference.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 23</strong>, you learn constraints in depth — NOT NULL, UNIQUE, CHECK, PRIMARY KEY, FOREIGN KEY, and how to add, modify, and drop constraints on existing tables using ALTER TABLE.
        </p>
        <Link href="/learn/sql/constraints" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 23 → Constraints
        </Link>
      </div>

    </LearnLayout>
  );
}