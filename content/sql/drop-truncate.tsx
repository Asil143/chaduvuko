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

export default function DropTruncate() {
  return (
    <LearnLayout
      title="DROP TABLE and TRUNCATE"
      description="Remove entire tables or all their data — the difference between DROP and TRUNCATE, cascade behaviour, safe patterns for dev vs production, and why these commands demand maximum respect"
      section="SQL — Module 25"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Two Nuclear Options" />

      <P>You have learned DELETE — removing specific rows. This module covers two more destructive operations that go further. <Hl>TRUNCATE</Hl> removes every row from a table at once, far faster than DELETE but with no WHERE clause and limited rollback options. <Hl>DROP TABLE</Hl> goes further still — it removes the table itself, including every row, every column definition, every constraint, every index, and every dependent object.</P>

      <P>Both commands demand maximum respect. They are legitimate, frequently-used tools — but in the wrong context, they cause catastrophic and irreversible data loss. Understanding exactly what each does, when each is appropriate, and what safeguards exist is the point of this module.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, margin: '20px 0 32px' }}>
        {[
          {
            cmd: 'DELETE',
            color: '#00e676',
            removes: 'Specific rows matching WHERE',
            keeps: 'Table structure, indexes, constraints',
            rollback: 'Yes — always transactional',
            speed: 'Slow on large tables (row by row)',
            use: 'Removing specific data in production',
          },
          {
            cmd: 'TRUNCATE',
            color: '#f59e0b',
            removes: 'ALL rows in the table',
            keeps: 'Table structure, indexes, constraints',
            rollback: 'Yes in PostgreSQL, NO in MySQL',
            speed: 'Very fast — page deallocation',
            use: 'Resetting dev/staging, clearing temp tables',
          },
          {
            cmd: 'DROP TABLE',
            color: '#ff4757',
            removes: 'Everything — rows + structure + indexes',
            keeps: 'Nothing — table is gone completely',
            rollback: 'Yes in transaction, otherwise permanent',
            speed: 'Instant — metadata removal',
            use: 'Decommissioning tables, schema cleanup',
          },
        ].map(item => (
          <div key={item.cmd} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: `${item.color}12`, borderBottom: `1px solid ${item.color}20` }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: item.color }}>{item.cmd}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              {[
                ['Removes', item.removes],
                ['Keeps', item.keeps],
                ['Rollback', item.rollback],
                ['Speed', item.speed],
                ['Use when', item.use],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}: </span>
                  <span style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="TRUNCATE — Emptying a Table Completely" />

      <P>TRUNCATE removes all rows from a table instantly by deallocating the data pages rather than deleting rows one by one. It does not fire row-level triggers, does not log individual row deletions, and resets the high-water mark of the table. For large tables, TRUNCATE is 100–1000x faster than DELETE without a WHERE clause.</P>

      <H>Basic TRUNCATE syntax</H>

      <CodeBlock
        label="TRUNCATE syntax"
        code={`-- Basic truncate
TRUNCATE TABLE order_items;

-- PostgreSQL: can truncate multiple tables at once
TRUNCATE TABLE order_items, orders;

-- RESTART IDENTITY: reset auto-increment sequences back to 1
TRUNCATE TABLE customers RESTART IDENTITY;

-- CASCADE: also truncate tables that FK-reference this table
TRUNCATE TABLE orders CASCADE;
-- This also truncates order_items (which has FK → orders)

-- CONTINUE IDENTITY (default): keep sequence at current value
TRUNCATE TABLE customers CONTINUE IDENTITY;`}
      />

      <SQLPlayground
        initialQuery={`-- See row counts before truncate simulation
SELECT
  'customers'   AS table_name, COUNT(*) AS row_count FROM customers
UNION ALL
SELECT 'orders',      COUNT(*) FROM orders
UNION ALL
SELECT 'products',    COUNT(*) FROM products
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;`}
        height={155}
        showSchema={true}
      />

      <H>TRUNCATE vs DELETE — when to use each</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Situation', 'Use', 'Reason'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Remove specific rows', 'DELETE', 'Only TRUNCATE can remove all rows — it has no WHERE clause'],
              ['Empty a dev/staging table completely', 'TRUNCATE', 'Much faster than DELETE, resets sequences, no row-by-row logging'],
              ['Reset a test database between test runs', 'TRUNCATE', 'Instant reset, sequences restart from 1'],
              ['Remove data but keep recent rows', 'DELETE with WHERE', 'TRUNCATE cannot filter — it removes everything'],
              ['Empty a large production staging/temp table', 'TRUNCATE', 'Speed advantage is critical — DELETE on millions of rows can take minutes'],
              ['Remove data where triggers must fire', 'DELETE', 'TRUNCATE does not fire row-level triggers'],
              ['Need to be sure of rollback in MySQL', 'DELETE', 'TRUNCATE in MySQL is NOT transactional — cannot be rolled back'],
            ].map(([situation, use, reason], i) => (
              <tr key={situation} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{situation}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: use === 'TRUNCATE' ? '#f59e0b' : '#00e676', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{use}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>TRUNCATE and FK constraints</H>
      <P>TRUNCATE respects foreign key constraints — you cannot truncate a parent table if child tables have FK references to it. You must truncate in dependency order (child first, then parent) or use CASCADE.</P>

      <CodeBlock
        label="TRUNCATE in dependency order — reset FreshMart test data"
        code={`-- WRONG order: fails because order_items references orders
TRUNCATE TABLE orders;
-- ERROR: cannot truncate a table referenced in a foreign key constraint

-- CORRECT order: truncate children first, then parents
TRUNCATE TABLE order_items;   -- depends on orders and products
TRUNCATE TABLE orders;        -- depends on customers and stores
TRUNCATE TABLE employees;     -- depends on stores
TRUNCATE TABLE customers;     -- no dependencies
TRUNCATE TABLE products;      -- no dependencies
TRUNCATE TABLE stores;        -- no dependencies

-- OR: use CASCADE (PostgreSQL) — truncates all FK-referencing tables
TRUNCATE TABLE stores CASCADE;
-- WARNING: this truncates stores AND employees AND orders AND order_items`}
      />

      <Callout type="warning">
        TRUNCATE in MySQL is NOT transactional. It commits immediately and cannot be rolled back even if you are inside a BEGIN/COMMIT block. If a TRUNCATE in MySQL is followed by other statements that fail, the TRUNCATE cannot be reversed. In PostgreSQL, TRUNCATE IS transactional and can be rolled back. Always know which database you are using before running TRUNCATE.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="DROP TABLE — Removing a Table Completely" />

      <P>DROP TABLE removes a table entirely — all rows, all column definitions, all indexes, all constraints, all sequences, and all triggers associated with the table. The table ceases to exist. Any application code, query, view, or FK that referenced the table will fail immediately after the drop.</P>

      <H>Basic DROP TABLE syntax</H>

      <CodeBlock
        label="DROP TABLE syntax"
        code={`-- Drop a single table
DROP TABLE table_name;

-- IF EXISTS: no error if the table does not exist
DROP TABLE IF EXISTS table_name;

-- Drop multiple tables at once (PostgreSQL)
DROP TABLE IF EXISTS temp_import, staging_orders, old_products;

-- CASCADE: also drop dependent objects (views, FKs that reference this table)
DROP TABLE customers CASCADE;
-- This also drops: any views that SELECT from customers,
-- any FK constraints in other tables that reference customers

-- RESTRICT (default): fail if any dependent objects exist
DROP TABLE customers RESTRICT;
-- Fails if any table has a FK referencing customers`}
      />

      <H>DROP TABLE in development workflows</H>
      <P>DROP TABLE is routine in development — you frequently create experimental tables, test a design, then drop and recreate them. The IF NOT EXISTS + IF EXISTS pair is the standard pattern for idempotent setup scripts.</P>

      <CodeBlock
        label="Idempotent table setup — development pattern"
        code={`-- Drop and recreate for a clean slate (dev/test only)
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;

CREATE TABLE promotions (
  promotion_id  INTEGER PRIMARY KEY,
  promo_code    VARCHAR(50) NOT NULL UNIQUE,
  discount_pct  DECIMAL(5,2) NOT NULL
);

CREATE TABLE product_reviews (
  review_id    INTEGER PRIMARY KEY,
  product_id   INTEGER NOT NULL REFERENCES products(product_id),
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text  TEXT
);

-- This script can be run multiple times safely:
-- IF EXISTS prevents errors if tables do not exist yet
-- CASCADE handles any dependent objects from previous runs`}
      />

      <SQLPlayground
        initialQuery={`-- Create a temporary table, verify it exists, then drop it
CREATE TABLE IF NOT EXISTS temp_analytics (
  store_id     VARCHAR(10),
  month        INTEGER,
  total_orders INTEGER,
  revenue      DECIMAL(12,2)
);

-- Verify it exists
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'temp_analytics'
ORDER BY ordinal_position;`}
        height={165}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Drop the temporary table
DROP TABLE IF EXISTS temp_analytics;

-- Verify it is gone
SELECT COUNT(*) AS temp_table_exists
FROM information_schema.tables
WHERE table_name = 'temp_analytics';
-- Should return 0`}
        height={130}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="DROP TABLE CASCADE — The Most Dangerous Modifier" />

      <P>CASCADE on DROP TABLE automatically removes all dependent objects — foreign key constraints in other tables, views that reference the dropped table, and triggers. A single DROP TABLE ... CASCADE can cascade through your entire schema, removing dozens of objects you did not intend to touch.</P>

      <CodeBlock
        label="What CASCADE drops along with the table"
        code={`-- DROP TABLE customers CASCADE removes:
-- 1. The customers table and all its data
-- 2. The FK constraint fk_orders_customer_id in the orders table
--    (orders still exists but its FK to customers is removed)
-- 3. Any views that SELECT from customers
-- 4. Any triggers on customers

-- It does NOT remove:
-- The orders table itself (only the FK constraint is removed)
-- Any other data in orders

-- This means: after DROP TABLE customers CASCADE,
-- orders.customer_id becomes an unconstrained column
-- Rows in orders now reference a non-existent customers table
-- Referential integrity is broken silently

-- ALWAYS check what CASCADE will affect before running:
-- PostgreSQL: check pg_depend
SELECT dependent.relname AS dependent_object
FROM pg_depend
JOIN pg_class dependent ON dependent.oid = pg_depend.objid
JOIN pg_class referenced ON referenced.oid = pg_depend.refobjid
WHERE referenced.relname = 'customers'
  AND pg_depend.deptype = 'n';`}
      />

      <Callout type="warning">
        DROP TABLE ... CASCADE on a parent table does not delete the child table's rows — it only removes the FK constraint. After cascading, the orders table still has rows with customer_id values, but there is no longer a FK enforcing that those values exist in customers. Referential integrity is silently broken. Use CASCADE only when you are certain you understand every object that will be affected.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="DROP DATABASE and DROP SCHEMA" />

      <P>Beyond individual tables, you can drop entire schemas (namespaces containing multiple tables) or entire databases. These are even more destructive than DROP TABLE — they remove everything inside them.</P>

      <CodeBlock
        label="DROP SCHEMA and DROP DATABASE"
        code={`-- Drop a schema and all its tables (PostgreSQL)
DROP SCHEMA analytics CASCADE;
-- Removes: every table, view, function, and sequence in the analytics schema

-- Drop a database entirely (PostgreSQL / MySQL)
DROP DATABASE freshmart_test;
-- Removes: every schema, table, and row in the database
-- Cannot be run while connected to that database

-- Safe versions
DROP SCHEMA IF EXISTS analytics CASCADE;
DROP DATABASE IF EXISTS freshmart_test;

-- These commands require special privileges:
-- DROP DATABASE: superuser or database owner
-- DROP SCHEMA: schema owner or superuser

-- Common use case: cleaning up test environments
-- Never run on production without a confirmed backup`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Temporary Tables — Tables That Auto-Delete" />

      <P>Temporary tables exist only for the duration of a session (or transaction, depending on the database). They are automatically dropped when the session ends. They are useful for storing intermediate results in complex queries or data processing pipelines — without leaving permanent objects behind.</P>

      <CodeBlock
        label="Temporary table syntax"
        code={`-- PostgreSQL: session-scoped temporary table
CREATE TEMP TABLE monthly_summary AS
SELECT
  EXTRACT(MONTH FROM order_date)   AS month,
  store_id,
  COUNT(*)                          AS order_count,
  SUM(total_amount)                 AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY EXTRACT(MONTH FROM order_date), store_id;

-- Query the temp table just like a regular table
SELECT * FROM monthly_summary ORDER BY revenue DESC;

-- Temp table is automatically dropped when session ends
-- Or drop it manually:
DROP TABLE IF EXISTS monthly_summary;

-- Transaction-scoped temp table (dropped at COMMIT/ROLLBACK)
CREATE TEMP TABLE order_processing_queue
ON COMMIT DROP AS
SELECT order_id FROM orders WHERE order_status = 'Processing';

-- MySQL: same syntax, session-scoped
CREATE TEMPORARY TABLE temp_results AS SELECT ...;`}
      />

      <SQLPlayground
        initialQuery={`-- Create a temporary summary table for this session
CREATE TEMP TABLE store_performance AS
SELECT
  s.store_id,
  s.city,
  COUNT(o.order_id)             AS total_orders,
  SUM(o.total_amount)           AS total_revenue,
  ROUND(AVG(o.total_amount), 2) AS avg_order
FROM stores AS s
LEFT JOIN orders AS o ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.city;

-- Query the temp table
SELECT * FROM store_performance ORDER BY total_revenue DESC;`}
        height={205}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- The temp table is available in the same session
SELECT city, avg_order
FROM store_performance
WHERE total_orders > 2
ORDER BY avg_order DESC;`}
        height={110}
        showSchema={false}
      />

      <H>When to use temporary tables</H>
      <P>Temporary tables are useful for: storing the result of a complex subquery that is referenced multiple times in subsequent queries (avoiding repeated computation), building intermediate results in a multi-step ETL process, isolating data for a complex report without creating permanent objects, and testing data transformations before applying them to real tables.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Resetting a Development Database" />

      <P>One of the most common uses of TRUNCATE and DROP TABLE is resetting a development or staging database to a clean state — for testing, for seeding with fresh data, or for running test suites that require a known starting state.</P>

      <H>Full database reset script</H>

      <CodeBlock
        label="Complete FreshMart database reset — dev/staging only"
        code={`-- DEVELOPMENT/STAGING ONLY — NEVER RUN ON PRODUCTION
-- Reset all FreshMart tables to empty state

-- Step 1: Truncate in dependency order (children first)
TRUNCATE TABLE order_items  RESTART IDENTITY;
TRUNCATE TABLE orders       RESTART IDENTITY;
TRUNCATE TABLE employees    RESTART IDENTITY;
TRUNCATE TABLE customers    RESTART IDENTITY;
TRUNCATE TABLE products     RESTART IDENTITY;
TRUNCATE TABLE stores       RESTART IDENTITY;

-- Step 2: Re-seed with fresh test data
-- (Run the seed SQL from data/sql-freshmart.ts here)

-- Alternative: single command with CASCADE
-- WARNING: truncates ALL referencing tables too
TRUNCATE TABLE stores RESTART IDENTITY CASCADE;
-- This truncates: stores, employees, orders, order_items
-- Still need to truncate customers and products separately

-- Add a guard to prevent accidental production execution:
DO $$
BEGIN
  IF current_database() NOT IN ('freshmart_dev', 'freshmart_test') THEN
    RAISE EXCEPTION 'This script must only run on dev or test databases!';
  END IF;
END $$;`}
      />

      <H>Test isolation pattern — transaction rollback</H>
      <P>For automated tests, instead of truncating between every test, wrap each test in a transaction and roll it back at the end. Each test starts with a clean database without any truncate overhead.</P>

      <CodeBlock
        label="Test isolation via transaction rollback"
        code={`-- In your test framework (pseudocode):
-- Before each test:
BEGIN;

-- Run test setup
INSERT INTO customers (first_name, email) VALUES ('Test', 'test@test.com');

-- Run the test...
SELECT * FROM customers WHERE email = 'test@test.com';

-- After each test (regardless of pass/fail):
ROLLBACK;
-- The database is now exactly as it was before the test
-- No TRUNCATE needed — rollback is instant

-- This pattern is used in pytest-postgresql, Django TestCase,
-- Rails database_cleaner, and most modern test frameworks`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Production Safety — Guards and Safeguards" />

      <P>Several tools and techniques protect against accidentally running DROP or TRUNCATE on production databases.</P>

      <H>Database-level guards</H>

      <CodeBlock
        label="Production safety patterns"
        code={`-- PostgreSQL: check which database you are on before destructive ops
SELECT current_database();
-- Verify this is 'freshmart_dev', not 'freshmart_prod'

-- Add a safety guard in scripts
DO $$
BEGIN
  IF current_database() = 'freshmart_prod' THEN
    RAISE EXCEPTION 'ABORT: Cannot run destructive operations on production!';
  END IF;
END $$;

-- PostgreSQL: revoke DROP privilege from non-superusers in production
REVOKE DROP ON TABLE orders FROM app_user;

-- Use read-only database users for analytics and reporting
-- Read-only users cannot run DROP, TRUNCATE, or DELETE
CREATE USER analyst_user WITH PASSWORD 'secure_pass';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analyst_user;
-- analyst_user can SELECT but never DROP or TRUNCATE`}
      />

      <H>Application-level safeguards</H>
      <P>Most production SQL clients and database management tools have confirmation dialogs for destructive operations. Enabling "safe mode" in DBeaver or TablePlus prevents DROP and TRUNCATE without explicit confirmation. Some teams require a second engineer to physically witness and approve any destructive SQL before it is run on production.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data engineer at a Bangalore startup. The QA team runs integration tests against a staging database every night. The tests require a fresh database with known seed data at the start of each run. Currently the process takes 45 minutes — most of which is DELETE statements removing old test data row by row. You are asked to optimise it.</P>

      <TimeBlock time="10:00 AM" label="Analyse the current process">
        The current nightly script runs DELETE FROM order_items WHERE created_at &lt; NOW(), DELETE FROM orders, DELETE FROM customers — in dependency order, but row by row. With 2 million rows accumulated from months of tests, the DELETE loop takes 40 minutes.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Design the replacement">
        TRUNCATE with RESTART IDENTITY resets everything in under 2 seconds. But you need two safeguards: the script must never run on production, and it must automatically reseed with the standard FreshMart test data after truncating.
      </TimeBlock>

      <CodeBlock
        label="Optimised nightly staging reset script"
        code={`-- nightly_staging_reset.sql
-- Runs at 00:00 IST on freshmart_staging only

-- Safety guard: abort if not on staging
DO $$
BEGIN
  IF current_database() != 'freshmart_staging' THEN
    RAISE EXCEPTION
      'SAFETY ABORT: This script must only run on freshmart_staging. Currently on: %',
      current_database();
  END IF;
END $$;

-- Log the reset start
INSERT INTO maintenance_log (event, started_at, database_name)
VALUES ('NIGHTLY_RESET', NOW(), current_database());

-- Truncate in dependency order, reset sequences
TRUNCATE TABLE order_items  RESTART IDENTITY;
TRUNCATE TABLE orders       RESTART IDENTITY;
TRUNCATE TABLE employees    RESTART IDENTITY;
TRUNCATE TABLE customers    RESTART IDENTITY;
TRUNCATE TABLE products     RESTART IDENTITY;
TRUNCATE TABLE stores       RESTART IDENTITY;

-- Reseed with standard FreshMart test data
\i /scripts/freshmart_seed.sql

-- Log completion
UPDATE maintenance_log
SET completed_at = NOW(), rows_seeded = (SELECT COUNT(*) FROM orders)
WHERE event = 'NIGHTLY_RESET'
  AND completed_at IS NULL;`}
      />

      <TimeBlock time="11:00 AM" label="Result after deployment">
        The nightly reset now completes in 8 seconds instead of 45 minutes. The QA team can run their tests 20 minutes earlier. The safety guard has already prevented one accidental run against the wrong database — a junior engineer connected to the wrong host and the script aborted with "SAFETY ABORT: currently on freshmart_prod."
      </TimeBlock>

      <ProTip>
        Every script that runs TRUNCATE or DROP should begin with an explicit database name check that aborts if the current database is anything other than the expected dev/test name. One line of PL/pgSQL that raises an exception has prevented more production incidents than any other single safeguard. Make it the first line of every destructive script you write.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between DELETE, TRUNCATE, and DROP TABLE?">
        <p style={{ margin: '0 0 14px' }}>DELETE is a DML command that removes specific rows based on a WHERE condition. It is fully transactional in all databases, fires row-level triggers, respects FK cascade rules, and logs each row deletion individually. It can be rolled back even after execution if inside an uncommitted transaction. On large tables without a WHERE clause, DELETE is extremely slow because every row deletion is individually logged.</p>
        <p style={{ margin: '0 0 14px' }}>TRUNCATE is a DDL command that removes all rows from a table at once by deallocating storage pages rather than removing rows one by one. It is dramatically faster than DELETE for full-table clearance — often 100-1000x faster. TRUNCATE does not fire row-level triggers, does not log individual row deletions, and resets auto-increment sequences when RESTART IDENTITY is specified. In PostgreSQL, TRUNCATE is transactional and can be rolled back. In MySQL, TRUNCATE auto-commits and cannot be rolled back — it is not transactional. TRUNCATE has no WHERE clause; it is all-or-nothing.</p>
        <p style={{ margin: 0 }}>DROP TABLE removes the entire table — not just the data, but the table structure itself including all column definitions, indexes, constraints, sequences, and triggers. After DROP TABLE, the table does not exist at all. Any query, view, FK, or application code that references the dropped table will fail immediately. DROP TABLE is transactional in PostgreSQL (can be rolled back in a transaction) and effectively permanent in MySQL. Use DELETE for selective row removal in production, TRUNCATE for rapidly emptying dev/staging tables, and DROP TABLE for decommissioning tables during schema changes or development.</p>
      </IQ>

      <IQ q="Why is TRUNCATE faster than DELETE and when should you choose DELETE despite the speed difference?">
        <p style={{ margin: '0 0 14px' }}>TRUNCATE is faster because it works at the storage level rather than the row level. DELETE removes rows one by one — for each row, it writes a log record for rollback, checks all FK constraints and triggers, updates all indexes, and marks the row as deleted. On a table with 10 million rows and 5 indexes, DELETE makes 10 million log writes, 10 million × 5 = 50 million index updates, and 10 million trigger evaluations. This is O(n) work proportional to the number of rows.</p>
        <p style={{ margin: '0 0 14px' }}>TRUNCATE bypasses all of this by deallocating the data pages directly. The table's storage pages are marked as free without examining individual rows. No row-by-row logging, no index updates per row, no trigger evaluations. It is essentially an O(1) operation regardless of how many rows exist. The speed difference becomes dramatic at scale — clearing 10 million rows with DELETE might take 10 minutes; TRUNCATE takes under a second.</p>
        <p style={{ margin: 0 }}>Choose DELETE despite the speed difference when: you need to remove only specific rows (TRUNCATE has no WHERE clause), when triggers must fire (DELETE fires them, TRUNCATE does not — auditing triggers, denormalisation triggers, notification triggers all require DELETE), when FK cascade rules must be processed row by row, when you need reliable rollback in MySQL (TRUNCATE MySQL auto-commits), or when you need to verify exactly which rows were removed using RETURNING. TRUNCATE is the right choice only when you need to empty an entire table and none of these conditions apply — primarily for dev/staging resets and clearing temporary/staging tables.</p>
      </IQ>

      <IQ q="What happens when you use CASCADE with DROP TABLE?">
        <p style={{ margin: '0 0 14px' }}>CASCADE with DROP TABLE automatically removes all database objects that depend on the dropped table. The cascade scope includes: foreign key constraints in other tables that reference the dropped table (the FK constraint is removed, but the referencing table and its rows remain), views that query the dropped table, triggers that use the dropped table, and any other objects that depend on the table's existence.</p>
        <p style={{ margin: '0 0 14px' }}>A critical subtlety: CASCADE removes the FK constraints from referencing tables but does NOT remove the referencing tables or their rows. After DROP TABLE customers CASCADE, the orders table still exists with all its rows — but the FK constraint fk_orders_customer_id is gone. Orders rows now have customer_id values that reference a non-existent customers table. Referential integrity is broken silently. The database no longer prevents inserting orders for non-existent customers.</p>
        <p style={{ margin: 0 }}>This makes CASCADE extremely dangerous on parent tables in a live schema. Before using it, always check what will cascade: in PostgreSQL, query pg_depend to find all objects that depend on the table. In MySQL, examine INFORMATION_SCHEMA.KEY_COLUMN_USAGE to find FK relationships. The professional rule: use CASCADE for cleanup scripts in development where breaking referential integrity temporarily is acceptable, and for dropping the entire chain of tables in the correct order. Never use DROP TABLE ... CASCADE in production without a complete understanding of every object it will affect and a verified backup.</p>
      </IQ>

      <IQ q="What are temporary tables and when should you use them?">
        <p style={{ margin: '0 0 14px' }}>Temporary tables are tables that exist only for the duration of a database session (or transaction, if created with ON COMMIT DROP). They are automatically dropped when the session ends — no manual cleanup required. Temporary tables are private to the session that created them — other sessions cannot see or access them, even if they create temporary tables with the same name.</p>
        <p style={{ margin: '0 0 14px' }}>Temporary tables are appropriate for: storing intermediate results of a complex multi-step query that is referenced multiple times (avoiding repeated subquery execution), breaking a complex single-query problem into readable sequential steps, creating a working dataset for an ETL step that is then processed and discarded, and providing a staging area for data that will be validated and then inserted into a permanent table.</p>
        <p style={{ margin: 0 }}>The key advantage over CTEs (Common Table Expressions) for the same purpose: temporary tables can have indexes added to them, which CTEs cannot. If an intermediate result set is large and queried multiple times with filters, a temporary table with an index on the filter column is significantly faster than a CTE. The key disadvantage: temporary tables are session-specific and add operational complexity — if a session crashes, the table may not be cleaned up immediately. For most use cases in analytics and reporting, a CTE is simpler and sufficient. Reach for a temporary table when the intermediate result is large (millions of rows), reused many times, or needs to be indexed for performance.</p>
      </IQ>

      <IQ q="How do you safely reset a staging database without risking production data?">
        <p style={{ margin: '0 0 14px' }}>The most important safeguard is a database name check at the start of any destructive script. A PL/pgSQL block that raises an exception if the current database is not the expected staging database name prevents accidental execution on production: IF current_database() != 'freshmart_staging' THEN RAISE EXCEPTION 'ABORT: wrong database %', current_database(); END IF. This single check has prevented more production incidents than any other safeguard.</p>
        <p style={{ margin: '0 0 14px' }}>For the reset itself, TRUNCATE with RESTART IDENTITY is the right tool — it empties all tables instantly and resets auto-increment sequences so new seed data starts from ID 1. TRUNCATE in the correct dependency order: child tables first (order_items, then orders), then parent tables (customers, products, stores). In PostgreSQL, TRUNCATE CASCADE on the top-level parent tables can handle the ordering automatically but requires understanding exactly which tables will be cascaded.</p>
        <p style={{ margin: 0 }}>Additional safeguards: use separate database users for production and staging with different credentials, never copy production credentials to staging environment config files, configure your deployment pipeline to use environment-specific connection strings with no overlap, and add a second safeguard inside the application — a boolean flag like ALLOW_DESTRUCTIVE_OPERATIONS that is set to false in production and true only in dev/staging environments. Log every destructive operation with a timestamp, the executing user, and the database name for audit purposes. For extra safety, many teams require a JIRA ticket or Slack approval before running any staging reset that affects shared staging environments used by multiple teams.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: cannot truncate a table referenced in a foreign key constraint"
        cause="You tried to TRUNCATE a parent table that has child tables with FK references to it. TRUNCATE cannot process FK cascade rules the same way DELETE does — it cannot selectively cascade or check each row. The database blocks the operation to prevent leaving orphaned rows in child tables that reference a now-empty parent."
        fix="TRUNCATE in dependency order — child tables first, then parents: TRUNCATE order_items; TRUNCATE orders; TRUNCATE customers; etc. Alternatively, use TRUNCATE TABLE parent CASCADE (PostgreSQL) which automatically truncates all FK-referencing child tables too — but verify you want to truncate all child tables before using CASCADE. In MySQL with FK checks enabled, temporarily disable them: SET FOREIGN_KEY_CHECKS = 0; TRUNCATE ...; SET FOREIGN_KEY_CHECKS = 1; — only in dev/staging, never in production with live traffic."
      />

      <Err
        msg="ERROR: table 'customers' does not exist — DROP TABLE customers"
        cause="You tried to DROP TABLE on a table that does not exist. This happens when a setup script is run in an environment where the table was never created, when you are connected to the wrong database or schema, or when the table was already dropped in a previous run of the script."
        fix="Use DROP TABLE IF EXISTS customers — this is a no-op if the table does not exist, rather than an error. IF EXISTS is the standard idiom for cleanup scripts that may be run multiple times: DROP TABLE IF EXISTS order_items CASCADE; DROP TABLE IF EXISTS orders CASCADE; etc. It makes scripts idempotent — safe to run multiple times with the same result."
      />

      <Err
        msg="TRUNCATE succeeded in MySQL but ROLLBACK had no effect — data is gone"
        cause="MySQL's TRUNCATE is NOT transactional. Even inside an explicit BEGIN/COMMIT block, TRUNCATE auto-commits immediately. If subsequent statements fail and you attempt ROLLBACK, the TRUNCATE cannot be reversed. This catches many developers who assume all DDL is transactional because it is in PostgreSQL."
        fix="In MySQL, if you need to empty a table with rollback capability, use DELETE instead: DELETE FROM table_name — slower but fully transactional. For test isolation in MySQL, use DELETE inside transactions rather than TRUNCATE. For staging resets where rollback is not needed, TRUNCATE is fine — just know it is permanent the moment it runs. If you have already lost data, restore from the most recent backup."
      />

      <Err
        msg="DROP TABLE customers CASCADE breaks foreign key enforcement — orders now have orphaned customer_ids"
        cause="DROP TABLE ... CASCADE removed the customers table and also removed the FK constraint from orders that referenced customers. The orders table still exists with all its rows, but orders.customer_id is now an unconstrained integer column. Nothing prevents inserting orders with any customer_id value, including values that never existed as customers. Referential integrity is silently broken."
        fix="Restore customers table from backup and re-establish FK constraints. Going forward: never use DROP TABLE ... CASCADE on a parent table in a live schema without a clear plan for the referential integrity of all child tables. Use RESTRICT (the default) to force you to explicitly handle all dependent objects before dropping. Check dependent objects before dropping: SELECT tablename FROM pg_tables WHERE schemaname = 'public' and manually trace all FK relationships to understand the full impact of a cascade."
      />

      <Err
        msg="Temp table disappears between queries — subsequent query fails with 'relation does not exist'"
        cause="The temporary table was created with ON COMMIT DROP — it was automatically dropped at the end of the transaction. Or, if using connection pooling, the session that created the temp table was returned to the pool and a different session (without the temp table) handled the subsequent query. Temporary tables are session-scoped, not global."
        fix="For ON COMMIT DROP tables, create the temp table and use it within the same transaction. For connection pooling issues, create the temp table within the same database session/connection and ensure the same connection handles all subsequent queries that use it. If temp tables need to survive across multiple application requests, consider using a regular table with a session_id column instead, and clean it up with a scheduled job or at the start of each session. Alternatively, use CTEs (WITH clause) which are scoped to a single query and do not have session-scope issues."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a complete database reset script for FreshMart's staging environment. The script should: (1) Check that the current database is 'freshmart_staging' and abort with a clear error message if not. (2) Truncate all six FreshMart tables in the correct dependency order, restarting all sequences. (3) After truncating, insert one test store (ST001, 'FreshMart Test Store', 'Bangalore', 'Karnataka', 'Test Manager', today's date, monthly target 500000). (4) Verify the reset worked by showing row counts for all six tables."
        hint="Dependency order for truncate: order_items → orders → employees → customers → products → stores. Use RESTART IDENTITY. The database check uses a DO $$ BEGIN IF ... END $$; block."
        answer={`-- FreshMart Staging Reset Script
-- DEVELOPMENT/STAGING ONLY

-- Step 1: Safety guard
DO $$
BEGIN
  IF current_database() != 'freshmart_staging' THEN
    RAISE EXCEPTION
      'SAFETY ABORT: This script must only run on freshmart_staging. Currently on: %',
      current_database();
  END IF;
END $$;

-- Step 2: Truncate in dependency order (children first)
TRUNCATE TABLE order_items  RESTART IDENTITY;
TRUNCATE TABLE orders       RESTART IDENTITY;
TRUNCATE TABLE employees    RESTART IDENTITY;
TRUNCATE TABLE customers    RESTART IDENTITY;
TRUNCATE TABLE products     RESTART IDENTITY;
TRUNCATE TABLE stores       RESTART IDENTITY;

-- Step 3: Insert one test store
INSERT INTO stores (store_id, store_name, city, state, manager_name, opened_date, monthly_target)
VALUES ('ST001', 'FreshMart Test Store', 'Bangalore', 'Karnataka', 'Test Manager', CURRENT_DATE, 500000.00);

-- Step 4: Verify row counts
SELECT 'order_items' AS table_name, COUNT(*) AS row_count FROM order_items
UNION ALL SELECT 'orders',      COUNT(*) FROM orders
UNION ALL SELECT 'employees',   COUNT(*) FROM employees
UNION ALL SELECT 'customers',   COUNT(*) FROM customers
UNION ALL SELECT 'products',    COUNT(*) FROM products
UNION ALL SELECT 'stores',      COUNT(*) FROM stores
ORDER BY table_name;`}
        explanation="The dependency order is non-negotiable: order_items must be truncated before orders (FK dependency), orders before customers and stores, employees before stores. RESTART IDENTITY resets auto-increment sequences so the next inserted row gets ID 1 — essential for predictable test data. The safety guard raises an exception that immediately aborts the script if run on any database other than freshmart_staging. The verification UNION ALL query shows all six tables in one result — all should show 0 except stores which should show 1. In production scripts, this guard is the single most important line and should always be the first executable statement."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Three levels of destruction: DELETE removes specific rows (transactional, slow, fires triggers). TRUNCATE removes all rows instantly (fast, no triggers, NOT transactional in MySQL). DROP TABLE removes the table itself — all data and all structure.',
          'TRUNCATE is 100-1000x faster than DELETE for full-table clearance because it deallocates storage pages rather than removing rows one by one. No row-level logging, no index updates per row.',
          'TRUNCATE in MySQL auto-commits and cannot be rolled back — even inside BEGIN/COMMIT. In PostgreSQL, TRUNCATE is fully transactional. Always know which database you are using.',
          'TRUNCATE respects FK constraints — cannot truncate a parent table if child tables reference it. Truncate in dependency order (children first) or use TRUNCATE ... CASCADE.',
          'DROP TABLE ... CASCADE removes the table and all dependent objects (FK constraints, views) but does NOT delete rows from referencing tables. Referential integrity is silently broken — orphaned rows remain.',
          'Use IF EXISTS to make DROP TABLE and TRUNCATE idempotent — DROP TABLE IF EXISTS table_name never errors, making scripts safe to run multiple times.',
          'Temporary tables (CREATE TEMP TABLE) auto-delete when the session ends. Private to the creating session. Useful for intermediate results in complex queries — can have indexes unlike CTEs.',
          'Every destructive script should start with a database name check: abort if not on the expected dev/staging database. One PL/pgSQL guard has prevented more production incidents than any other safeguard.',
          'The transaction rollback pattern for test isolation: wrap each test in BEGIN/ROLLBACK — the database is instantly reset without any truncate overhead.',
          'DROP TABLE in production requires: confirmed recent backup, complete codebase search for references to the table, understanding of all CASCADE impacts, and ideally a second engineer reviewing the command before execution.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 26</strong>, you learn normalisation — the theory and practice of designing relational schemas that eliminate redundancy, prevent update anomalies, and stay consistent as data grows.
        </p>
        <Link href="/learn/sql/normalization" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 26 → Normalisation
        </Link>
      </div>

    </LearnLayout>
  );
}