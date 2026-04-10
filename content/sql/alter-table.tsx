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

export default function AlterTable() {
  return (
    <LearnLayout
      title="ALTER TABLE"
      description="Modify table structure safely — add, rename, and drop columns, change data types, manage constraints, and run schema changes in production without downtime"
      section="SQL — Module 24"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Schemas Change — And Why It Is Difficult" />

      <P>No database schema survives contact with production unchanged. Requirements evolve, business rules shift, new features arrive. A column that seemed optional becomes required. A VARCHAR(50) turns out to be too short. A table needs a new column to track something that was not anticipated at design time.</P>

      <P>ALTER TABLE is the DDL command for modifying existing table structures. It sounds simple — add a column, rename a column, change a type. But on a production table with millions of rows and active application traffic, even a simple ALTER TABLE can cause serious problems:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0 32px' }}>
        {[
          { issue: 'Table locks', desc: 'Some ALTER TABLE operations acquire a full table lock — blocking all reads and writes for the duration. On a 100-million-row table, this can mean minutes of downtime.' },
          { issue: 'Data rewrites', desc: 'Changing a column type from VARCHAR(100) to VARCHAR(200) may require rewriting every row on disk — expensive proportional to table size.' },
          { issue: 'Dependency cascade', desc: 'Renaming a column breaks any view, stored procedure, trigger, or application query that references the old name — silently, with no compile-time error.' },
          { issue: 'Constraint validation', desc: 'Adding NOT NULL or a CHECK constraint validates against all existing rows — fails if any row violates the new rule.' },
        ].map(item => (
          <div key={item.issue} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ width: 4, borderRadius: 2, background: '#ff4757', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.issue}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <P>This module teaches every ALTER TABLE operation — what it does, how it behaves on large tables, and how to run schema changes safely in production without causing downtime.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="ADD COLUMN — Adding New Columns" />

      <P>Adding a column is the most common and usually safest ALTER TABLE operation. In PostgreSQL 11+, adding a column with a DEFAULT value is instantaneous — the database stores the default at the table level and does not rewrite existing rows. Earlier versions required rewriting every row, making ADD COLUMN slow on large tables.</P>

      <CodeBlock
        label="ADD COLUMN syntax"
        code={`-- Basic ADD COLUMN
ALTER TABLE customers ADD COLUMN middle_name VARCHAR(100);

-- With NOT NULL and DEFAULT (fast in PostgreSQL 11+)
ALTER TABLE customers
ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT false;

-- With CHECK constraint
ALTER TABLE customers
ADD COLUMN credit_score INTEGER
CONSTRAINT chk_customers_credit_score CHECK (credit_score BETWEEN 300 AND 900);

-- Multiple columns at once (PostgreSQL)
ALTER TABLE customers
ADD COLUMN preferred_language VARCHAR(50) DEFAULT 'English',
ADD COLUMN notification_opt_in BOOLEAN NOT NULL DEFAULT true;`}
      />

      <SQLPlayground
        initialQuery={`-- Add a 'notes' column to the orders table
ALTER TABLE orders ADD COLUMN notes TEXT;

-- Verify it was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'orders'
  AND column_name = 'notes';`}
        height={150}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Add a column with a default value
ALTER TABLE products
ADD COLUMN last_restocked_date DATE DEFAULT CURRENT_DATE;

-- Verify — existing rows get the default value
SELECT product_id, product_name, last_restocked_date
FROM products
LIMIT 5;`}
        height={145}
        showSchema={false}
      />

      <H>ADD COLUMN with NOT NULL — the safe approach</H>
      <P>Adding a column with NOT NULL and no DEFAULT fails immediately if the table has any rows — because existing rows have no value for the new column. The safe pattern is a three-step process.</P>

      <CodeBlock
        label="Safe NOT NULL column addition — three steps"
        code={`-- WRONG: fails if table has rows
ALTER TABLE customers ADD COLUMN loyalty_points INTEGER NOT NULL;
-- ERROR: column "loyalty_points" of relation "customers" contains null values

-- RIGHT: three-step safe approach
-- Step 1: add as nullable with a default
ALTER TABLE customers
ADD COLUMN loyalty_points INTEGER NOT NULL DEFAULT 0;

-- Step 2 (if needed): update specific rows with real values
UPDATE customers
SET loyalty_points = CASE loyalty_tier
  WHEN 'Platinum' THEN 1000
  WHEN 'Gold'     THEN 500
  WHEN 'Silver'   THEN 200
  ELSE 0
END;

-- Step 3 (optional): remove the default if values should be set explicitly going forward
-- ALTER TABLE customers ALTER COLUMN loyalty_points DROP DEFAULT;`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="DROP COLUMN — Removing Columns" />

      <P>Dropping a column removes it permanently — both the column definition and all data in it across every row. Unlike dropping a table, dropping a column cannot usually be rolled back in MySQL (PostgreSQL transactions allow it). Always verify there is no application code, query, view, or index that references the column before dropping it.</P>

      <CodeBlock
        label="DROP COLUMN syntax"
        code={`-- Drop a single column
ALTER TABLE customers DROP COLUMN middle_name;

-- Drop multiple columns (PostgreSQL)
ALTER TABLE customers
DROP COLUMN middle_name,
DROP COLUMN preferred_language;

-- Drop column and any dependent objects (PostgreSQL)
ALTER TABLE customers DROP COLUMN email CASCADE;
-- CASCADE also drops: indexes on email, constraints using email,
-- views that reference email — be very careful with CASCADE

-- Safe version — fails if anything depends on the column
ALTER TABLE customers DROP COLUMN email RESTRICT;  -- default behaviour`}
      />

      <SQLPlayground
        initialQuery={`-- Add a temporary column then drop it
ALTER TABLE products ADD COLUMN temp_notes TEXT;

-- Verify it was added
SELECT column_name FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'temp_notes';`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Drop the temporary column
ALTER TABLE products DROP COLUMN temp_notes;

-- Verify it is gone
SELECT column_name FROM information_schema.columns
WHERE table_name = 'products' AND column_name = 'temp_notes';
-- Should return 0 rows`}
        height={130}
        showSchema={false}
      />

      <Callout type="warning">
        Before dropping any column in production: (1) Search your entire codebase for the column name — grep for it in application code, ORM models, stored procedures, and views. (2) Check if any indexes reference it. (3) Check if any constraints reference it. (4) Deploy the application code changes that remove the column reference BEFORE dropping the column — never the other way around. Application code that references a dropped column will throw errors the moment the column is gone.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="RENAME COLUMN and RENAME TABLE" />

      <P>Renaming is one of the most dangerous ALTER TABLE operations — not because of what it does to the data (nothing), but because of what it breaks. Every view, query, application model, API endpoint, and stored procedure that references the old name will fail silently or with an error the moment the rename is applied.</P>

      <H>RENAME COLUMN</H>

      <CodeBlock
        label="RENAME COLUMN syntax"
        code={`-- PostgreSQL
ALTER TABLE customers RENAME COLUMN phone TO phone_number;

-- MySQL
ALTER TABLE customers RENAME COLUMN phone TO phone_number;
-- MySQL 8.0+ supports RENAME COLUMN
-- Earlier MySQL: use CHANGE COLUMN:
ALTER TABLE customers CHANGE COLUMN phone phone_number VARCHAR(20);

-- Safe rename workflow:
-- Step 1: Add new column with new name
ALTER TABLE customers ADD COLUMN phone_number VARCHAR(20);

-- Step 2: Copy data from old column to new column
UPDATE customers SET phone_number = phone;

-- Step 3: Deploy application code to use new column name

-- Step 4: Drop old column only after all code is updated
ALTER TABLE customers DROP COLUMN phone;`}
      />

      <H>RENAME TABLE</H>

      <CodeBlock
        label="RENAME TABLE syntax"
        code={`-- PostgreSQL
ALTER TABLE customers RENAME TO customers_v2;

-- MySQL
RENAME TABLE customers TO customers_v2;
-- Or: ALTER TABLE customers RENAME TO customers_v2;

-- SQLite
ALTER TABLE customers RENAME TO customers_v2;

-- After rename, all FKs referencing 'customers' still work —
-- PostgreSQL updates FK references automatically
-- Always verify application code references after renaming`}
      />

      <SQLPlayground
        initialQuery={`-- Rename a column safely — add new, copy data, verify
-- Step 1: simulate the safe rename by adding a new column
ALTER TABLE stores ADD COLUMN manager_full_name VARCHAR(200);

-- Step 2: copy data
UPDATE stores SET manager_full_name = manager_name;

-- Step 3: verify both columns match
SELECT store_id, manager_name, manager_full_name
FROM stores
LIMIT 5;`}
        height={170}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="ALTER COLUMN — Changing Type, Nullability, and Default" />

      <H>Change column type</H>

      <CodeBlock
        label="ALTER COLUMN TYPE — PostgreSQL"
        code={`-- PostgreSQL: change column data type
ALTER TABLE products
ALTER COLUMN unit_price TYPE DECIMAL(12, 2);

-- With USING clause — convert existing data during type change
ALTER TABLE orders
ALTER COLUMN total_amount TYPE BIGINT
USING CAST(total_amount AS BIGINT);
-- USING tells PostgreSQL how to convert existing values

-- Safe type widening (VARCHAR 50 → VARCHAR 200): usually instant
ALTER TABLE customers ALTER COLUMN city TYPE VARCHAR(200);

-- Type narrowing (VARCHAR 200 → VARCHAR 50): rewrites all rows, can truncate data
-- First check: SELECT MAX(LENGTH(city)) FROM customers;
-- If max length <= 50, it is safe to narrow

-- Type change from text to number:
-- Requires USING to specify conversion
ALTER TABLE products
ALTER COLUMN stock_count TYPE INTEGER
USING stock_count::INTEGER;`}
      />

      <CodeBlock
        label="MySQL: change column type (MODIFY COLUMN)"
        code={`-- MySQL uses MODIFY COLUMN instead of ALTER COLUMN
ALTER TABLE products
MODIFY COLUMN unit_price DECIMAL(12, 2) NOT NULL;

-- Must re-specify all constraints — MySQL MODIFY replaces the entire definition
ALTER TABLE customers
MODIFY COLUMN city VARCHAR(200) NOT NULL DEFAULT 'Unknown';`}
      />

      <H>Change nullability</H>

      <CodeBlock
        label="SET NOT NULL / DROP NOT NULL"
        code={`-- PostgreSQL: add NOT NULL to an existing nullable column
-- First ensure no NULLs exist in the column
UPDATE customers SET phone = 'Unknown' WHERE phone IS NULL;
ALTER TABLE customers ALTER COLUMN phone SET NOT NULL;

-- Remove NOT NULL (make column nullable)
ALTER TABLE customers ALTER COLUMN phone DROP NOT NULL;

-- MySQL: use MODIFY COLUMN (re-specify full definition)
ALTER TABLE customers MODIFY COLUMN phone VARCHAR(20) NULL;
ALTER TABLE customers MODIFY COLUMN phone VARCHAR(20) NOT NULL;`}
      />

      <H>Change default value</H>

      <CodeBlock
        label="SET DEFAULT / DROP DEFAULT"
        code={`-- Add or change a default value
ALTER TABLE customers
ALTER COLUMN loyalty_tier SET DEFAULT 'Silver';

-- Remove a default value
ALTER TABLE customers
ALTER COLUMN loyalty_tier DROP DEFAULT;

-- MySQL: use MODIFY COLUMN
ALTER TABLE customers
MODIFY COLUMN loyalty_tier VARCHAR(20) NOT NULL DEFAULT 'Silver';`}
      />

      <SQLPlayground
        initialQuery={`-- Change a column's default value
ALTER TABLE orders ALTER COLUMN order_status SET DEFAULT 'Processing';

-- Verify the new default
SELECT column_name, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders' AND column_name = 'order_status';`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="ALTER TABLE and Constraints — Adding and Dropping" />

      <P>You learned the constraint syntax in Module 23. Here is the complete ALTER TABLE reference for managing constraints on existing tables.</P>

      <CodeBlock
        label="All constraint operations via ALTER TABLE"
        code={`-- Add PRIMARY KEY
ALTER TABLE customers ADD PRIMARY KEY (customer_id);

-- Add UNIQUE
ALTER TABLE customers
ADD CONSTRAINT uq_customers_email UNIQUE (email);

-- Add FOREIGN KEY
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ON DELETE RESTRICT;

-- Add CHECK
ALTER TABLE products
ADD CONSTRAINT chk_products_price_pos CHECK (unit_price >= 0);

-- Add NOT NULL
ALTER TABLE customers ALTER COLUMN email SET NOT NULL;

-- Drop any named constraint
ALTER TABLE customers DROP CONSTRAINT uq_customers_email;
ALTER TABLE products DROP CONSTRAINT chk_products_price_pos;
ALTER TABLE orders DROP CONSTRAINT fk_orders_customer;

-- Drop NOT NULL
ALTER TABLE customers ALTER COLUMN phone DROP NOT NULL;

-- Drop PRIMARY KEY (PostgreSQL)
ALTER TABLE customers DROP CONSTRAINT customers_pkey;

-- Disable FK temporarily (MySQL only — never in production)
SET FOREIGN_KEY_CHECKS = 0;
-- ... operations ...
SET FOREIGN_KEY_CHECKS = 1;`}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Production ALTER TABLE — Zero-Downtime Patterns" />

      <P>On a table with millions of rows serving live traffic, some ALTER TABLE operations lock the entire table for the duration. A 100-million-row table that takes 10 minutes to rewrite means 10 minutes of unavailability. These patterns let you make schema changes without downtime.</P>

      <H>Which operations are safe (no full table lock)</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'PostgreSQL', 'MySQL InnoDB', 'Notes'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['ADD COLUMN (with DEFAULT)', 'Instant (PG 11+)', 'Online (InnoDB)', 'No rewrite needed'],
              ['ADD COLUMN (no DEFAULT, nullable)', 'Instant', 'Online', 'Just metadata change'],
              ['DROP COLUMN', 'Instant (metadata)', 'Online', 'Data reclaimed on VACUUM/optimize'],
              ['RENAME COLUMN', 'Instant', 'Online (MySQL 8+)', 'Breaks dependent objects'],
              ['RENAME TABLE', 'Instant', 'Instant', 'Atomic rename'],
              ['ADD INDEX', 'Concurrent (CONCURRENTLY)', 'Online', 'Use CREATE INDEX CONCURRENTLY in PG'],
              ['DROP INDEX', 'Instant', 'Online', 'Safe on live table'],
              ['ADD UNIQUE', 'Requires table scan', 'Online', 'Slow on large tables with duplicates'],
              ['ADD FOREIGN KEY', 'Requires validation scan', 'Online', 'Use NOT VALID for large tables'],
              ['CHANGE COLUMN TYPE', 'Table rewrite (usually)', 'Table rewrite', 'Most dangerous for large tables'],
              ['SET NOT NULL', 'Table scan', 'Table rewrite', 'Use NOT VALID + VALIDATE in PG'],
            ].map(([op, pg, mysql, notes], i) => (
              <tr key={op} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{op}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: pg.includes('Instant') || pg.includes('Concurrent') ? '#00e676' : pg.includes('rewrite') ? '#ff4757' : '#f59e0b', borderBottom: '1px solid var(--border)' }}>{pg}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: mysql.includes('Online') || mysql.includes('Instant') ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)' }}>{mysql}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>PostgreSQL — CREATE INDEX CONCURRENTLY</H>

      <CodeBlock
        label="Adding an index without locking the table"
        code={`-- WRONG: regular CREATE INDEX locks table for reads and writes
CREATE INDEX idx_orders_customer_id ON orders (customer_id);
-- Table is locked until index build completes

-- RIGHT: CONCURRENTLY builds index while table stays available
CREATE INDEX CONCURRENTLY idx_orders_customer_id ON orders (customer_id);
-- Takes longer, but table stays fully available during build
-- Cannot be run inside a transaction

-- Drop index with CONCURRENTLY too
DROP INDEX CONCURRENTLY idx_orders_customer_id;`}
      />

      <H>Adding NOT NULL safely to a large table — PostgreSQL</H>

      <CodeBlock
        label="Zero-downtime NOT NULL addition — PostgreSQL"
        code={`-- Step 1: Add column as nullable with DEFAULT (instant — no rewrite)
ALTER TABLE orders ADD COLUMN delivery_partner_id INTEGER DEFAULT NULL;

-- Step 2: Backfill existing rows in batches (application can run)
UPDATE orders SET delivery_partner_id = 0
WHERE delivery_partner_id IS NULL
  AND order_id BETWEEN 1 AND 100000;
-- Repeat for each batch...

-- Step 3: Add NOT VALID constraint (no full scan — instant)
ALTER TABLE orders
ADD CONSTRAINT nn_orders_delivery_partner
CHECK (delivery_partner_id IS NOT NULL) NOT VALID;

-- Step 4: VALIDATE (scans table but does NOT lock it for writes)
ALTER TABLE orders VALIDATE CONSTRAINT nn_orders_delivery_partner;

-- Step 5: Now safe to add the real NOT NULL
ALTER TABLE orders ALTER COLUMN delivery_partner_id SET NOT NULL;

-- Step 6: Drop the CHECK constraint (NOT NULL is now enforced directly)
ALTER TABLE orders DROP CONSTRAINT nn_orders_delivery_partner;`}
      />

      <H>The expand-contract pattern — safe column renaming</H>

      <CodeBlock
        label="Rename without downtime — expand-contract"
        code={`-- Goal: rename 'phone' to 'phone_number' without downtime

-- Phase 1 (EXPAND): add new column, write to both
ALTER TABLE customers ADD COLUMN phone_number VARCHAR(20);

-- Backfill existing data
UPDATE customers SET phone_number = phone WHERE phone_number IS NULL;

-- Deploy application code that writes to BOTH columns
-- and reads from the new column

-- Phase 2 (CONTRACT): once all reads use new column:
-- Drop the old column
ALTER TABLE customers DROP COLUMN phone;

-- This two-phase approach means:
-- Old code still works (reads old column)
-- New code works (reads new column)
-- No moment where the column does not exist`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Database Migrations — Managing Schema Changes Over Time" />

      <P>In a team environment, ALTER TABLE statements are not run ad-hoc — they are written as <Hl>migration files</Hl>: version-controlled, sequentially numbered scripts that record every schema change from the beginning of the project. Migrations ensure every environment (development, staging, production) has the same schema.</P>

      <H>Migration file structure</H>

      <CodeBlock
        label="Migration file — naming and structure"
        code={`-- File: migrations/0042_add_loyalty_points_to_customers.sql
-- Created: 2024-04-10
-- Author: Asil
-- Description: Add loyalty_points column for the new rewards system

-- UP migration (apply the change)
ALTER TABLE customers
ADD COLUMN loyalty_points INTEGER NOT NULL DEFAULT 0
CONSTRAINT chk_customers_loyalty_points CHECK (loyalty_points >= 0);

-- Create index for queries that filter by loyalty_points
CREATE INDEX CONCURRENTLY idx_customers_loyalty_points
ON customers (loyalty_points);

-- DOWN migration (reverse the change — for rollback)
DROP INDEX CONCURRENTLY IF EXISTS idx_customers_loyalty_points;
ALTER TABLE customers DROP COLUMN IF EXISTS loyalty_points;`}
      />

      <H>Migration tools used at Indian tech companies</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { tool: 'Flyway', lang: 'Java / any', desc: 'SQL-based migrations. Each migration is a numbered .sql file. Tracks which migrations have run in a schema_version table. Used by many enterprise teams.' },
          { tool: 'Liquibase', lang: 'Java / any', desc: 'Supports SQL, XML, YAML, JSON migration formats. More flexible than Flyway for complex rollback scenarios. Common in enterprise banking systems.' },
          { tool: 'Alembic', lang: 'Python', desc: 'SQLAlchemy migration tool. Generates migration files from model changes. Standard for Python/FastAPI backends at Indian startups.' },
          { tool: 'Django Migrations', lang: 'Python', desc: 'Built into Django. Automatically generates migrations from model changes. Widely used at Python-based product companies.' },
          { tool: 'Prisma Migrate', lang: 'Node.js', desc: 'Generates migrations from Prisma schema changes. Standard for Node.js + TypeScript backends. Used by many modern Indian startups.' },
          { tool: 'golang-migrate', lang: 'Go', desc: 'Simple SQL-based migration tool for Go services. Used by companies with Go microservices architectures.' },
        ].map(item => (
          <div key={item.tool} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 4 }}>{item.tool}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{item.lang}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Dialect Differences — PostgreSQL vs MySQL" />

      <P>ALTER TABLE syntax differs significantly between PostgreSQL and MySQL. Knowing both is essential when working across different database environments.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'PostgreSQL', 'MySQL'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Add column', 'ALTER TABLE t ADD COLUMN c TYPE', 'ALTER TABLE t ADD COLUMN c TYPE'],
              ['Drop column', 'ALTER TABLE t DROP COLUMN c', 'ALTER TABLE t DROP COLUMN c'],
              ['Rename column', 'ALTER TABLE t RENAME COLUMN old TO new', 'ALTER TABLE t RENAME COLUMN old TO new (8.0+)\nALTER TABLE t CHANGE COLUMN old new TYPE (older)'],
              ['Change type', 'ALTER TABLE t ALTER COLUMN c TYPE newtype', 'ALTER TABLE t MODIFY COLUMN c newtype'],
              ['Set NOT NULL', 'ALTER TABLE t ALTER COLUMN c SET NOT NULL', 'ALTER TABLE t MODIFY COLUMN c TYPE NOT NULL'],
              ['Drop NOT NULL', 'ALTER TABLE t ALTER COLUMN c DROP NOT NULL', 'ALTER TABLE t MODIFY COLUMN c TYPE NULL'],
              ['Set DEFAULT', 'ALTER TABLE t ALTER COLUMN c SET DEFAULT v', 'ALTER TABLE t ALTER COLUMN c SET DEFAULT v'],
              ['Drop DEFAULT', 'ALTER TABLE t ALTER COLUMN c DROP DEFAULT', 'ALTER TABLE t ALTER COLUMN c DROP DEFAULT'],
              ['Rename table', 'ALTER TABLE old RENAME TO new', 'RENAME TABLE old TO new'],
            ].map(([op, pg, mysql], i) => (
              <tr key={op} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{op}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', lineHeight: 1.7, whiteSpace: 'pre' }}>{pg}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4479A1', borderBottom: '1px solid var(--border)', lineHeight: 1.7, whiteSpace: 'pre' }}>{mysql}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are the lead backend engineer at a Series B e-commerce startup in Bangalore. The product team has approved a new feature — a seller ratings system. You need to add a seller_rating column to the products table, which has 8 million rows and receives 50,000 queries per minute. Zero downtime is required.</P>

      <TimeBlock time="9:00 AM" label="Plan the migration">
        You map out the changes needed: add seller_rating (DECIMAL 1-5, nullable initially), add rating_count (INTEGER, defaults to 0), add a CHECK constraint for valid ratings. The table is live with high traffic so you cannot afford a table lock.
      </TimeBlock>

      <TimeBlock time="9:20 AM" label="Write the migration file">
        You write a migration with careful attention to which operations are online vs locking.
      </TimeBlock>

      <CodeBlock
        label="Migration: 0089_add_seller_rating_to_products.sql"
        code={`-- UP MIGRATION
-- Step 1: Add nullable columns with defaults (instant — no table lock)
ALTER TABLE products
ADD COLUMN seller_rating  DECIMAL(3, 2) DEFAULT NULL,
ADD COLUMN rating_count   INTEGER       NOT NULL DEFAULT 0;

-- Step 2: Add CHECK constraint as NOT VALID (instant — no validation scan)
ALTER TABLE products
ADD CONSTRAINT chk_products_seller_rating
CHECK (seller_rating IS NULL OR seller_rating BETWEEN 1.0 AND 5.0)
NOT VALID;

-- Step 3: Validate the constraint (scans table but DOES NOT block writes)
-- Run during low-traffic window
ALTER TABLE products VALIDATE CONSTRAINT chk_products_seller_rating;

-- Step 4: Add index concurrently (no table lock)
CREATE INDEX CONCURRENTLY idx_products_seller_rating
ON products (seller_rating)
WHERE seller_rating IS NOT NULL;

-- DOWN MIGRATION (rollback)
DROP INDEX CONCURRENTLY IF EXISTS idx_products_seller_rating;
ALTER TABLE products DROP CONSTRAINT IF EXISTS chk_products_seller_rating;
ALTER TABLE products
DROP COLUMN IF EXISTS seller_rating,
DROP COLUMN IF EXISTS rating_count;`}
      />

      <TimeBlock time="10:00 AM" label="Migration reviewed and approved">
        Your tech lead reviews the migration. They approve the NOT VALID + VALIDATE approach for the constraint, confirm CREATE INDEX CONCURRENTLY is used, and ask you to schedule the VALIDATE step for 2 AM when traffic is lowest. The migration is merged and deployed with the application code changes in the same release — the application is updated to write seller_rating when reviews are submitted.
      </TimeBlock>

      <TimeBlock time="2:05 AM" label="VALIDATE runs during low traffic">
        You run the VALIDATE step from the production database. It takes 4 minutes to scan 8 million rows — but because it only takes a ShareLock (not an ExclusiveLock), the application continues serving 50,000 queries per minute throughout. Zero downtime achieved.
      </TimeBlock>

      <ProTip>
        The NOT VALID + VALIDATE pattern is one of the most important PostgreSQL techniques for zero-downtime schema changes. NOT VALID adds the constraint without scanning existing rows — instantaneous. VALIDATE scans the rows but only needs a ShareLock — reads and writes continue while it runs. This two-step approach turns what would be minutes of downtime into an invisible background operation.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is ALTER TABLE and what are its most common operations?">
        <p style={{ margin: '0 0 14px' }}>ALTER TABLE is a DDL (Data Definition Language) command that modifies the structure of an existing table without affecting the data in it (except for column type changes and removals). It is the primary tool for evolving a database schema as application requirements change over time.</p>
        <p style={{ margin: '0 0 14px' }}>The most common operations: ADD COLUMN adds a new column to the table — existing rows receive the column's DEFAULT value or NULL. DROP COLUMN removes a column and all its data permanently. RENAME COLUMN changes a column's name without affecting its data. ALTER COLUMN (PostgreSQL) or MODIFY COLUMN (MySQL) changes a column's data type, nullability, or default value. ADD CONSTRAINT adds a new constraint (UNIQUE, CHECK, FOREIGN KEY, NOT NULL). DROP CONSTRAINT removes a named constraint.</p>
        <p style={{ margin: 0 }}>In production environments, ALTER TABLE is executed carefully because some operations lock the table for the duration, block application traffic, and on large tables can take minutes to hours. Modern PostgreSQL (11+) has made many operations online and lock-free — adding a column with a DEFAULT is now instant. MySQL InnoDB supports Online DDL for most operations. Understanding which operations are safe to run on live production tables and which require a maintenance window is an important production database skill.</p>
      </IQ>

      <IQ q="How do you safely add a NOT NULL column to a large production table?">
        <p style={{ margin: '0 0 14px' }}>The naive approach — ALTER TABLE orders ADD COLUMN delivery_partner_id INTEGER NOT NULL — fails immediately on any table with existing rows because existing rows have no value for the new column. Even if you provide a DEFAULT, on older PostgreSQL versions this triggers a full table rewrite, causing minutes of lock-time on large tables.</p>
        <p style={{ margin: '0 0 14px' }}>The safe zero-downtime approach on PostgreSQL 11+ has several steps. First, add the column as nullable with a DEFAULT (instant, no rewrite in PG11+): ALTER TABLE orders ADD COLUMN delivery_partner_id INTEGER DEFAULT 0. Second, backfill any rows that need specific values in batches, committing after each batch to release locks. Third, add the constraint as NOT VALID (no validation scan — instant): ALTER TABLE orders ADD CONSTRAINT chk_nn_delivery_partner CHECK (delivery_partner_id IS NOT NULL) NOT VALID. Fourth, run VALIDATE during a low-traffic window (scans rows but only needs ShareLock — does not block reads or writes): ALTER TABLE orders VALIDATE CONSTRAINT chk_nn_delivery_partner. Fifth, once fully validated, optionally convert to a real NOT NULL: ALTER TABLE orders ALTER COLUMN delivery_partner_id SET NOT NULL.</p>
        <p style={{ margin: 0 }}>In MySQL InnoDB, adding a column with a DEFAULT is an Online DDL operation since MySQL 5.6 — it does not block reads or writes. The column is added to the metadata and the DEFAULT is applied virtually without rewriting rows. Setting NOT NULL is more complex in MySQL — MODIFY COLUMN with NOT NULL triggers a table rebuild in older versions, but MySQL 8.0 has made this online as well. Always check the MySQL documentation for your specific version's Online DDL support matrix before running ALTER TABLE on a large production table.</p>
      </IQ>

      <IQ q="What is the expand-contract pattern for schema changes?">
        <p style={{ margin: '0 0 14px' }}>The expand-contract pattern is a zero-downtime technique for making schema changes that would otherwise require application downtime. Instead of making the schema change and updating application code simultaneously (which creates a window where either old code or new code is incompatible with the schema), it splits the change into two phases separated by a deployment.</p>
        <p style={{ margin: '0 0 14px' }}>The expand phase adds new schema elements alongside existing ones — adding a new column while keeping the old column, adding a new index while keeping queries that use the old approach. Both old and new schema elements coexist. The application code is then updated to use the new schema elements, deployed, and verified. Old code still works because the old schema elements still exist.</p>
        <p style={{ margin: 0 }}>The contract phase removes the old schema elements once all application code has migrated to the new ones — dropping the old column, dropping the old index, removing the old constraint. At this point, no application code references the old elements, so removal is safe. The classic example is renaming a column: expand by adding the new column name alongside the old, backfilling data, deploying code that writes to both and reads from the new; contract by dropping the old column after verifying no code references it. This pattern applies to any breaking schema change: column renames, type changes, constraint modifications, and table restructuring.</p>
      </IQ>

      <IQ q="What is CREATE INDEX CONCURRENTLY and when do you use it?">
        <p style={{ margin: '0 0 14px' }}>CREATE INDEX CONCURRENTLY is a PostgreSQL feature that builds an index on a live table without locking out reads or writes. Regular CREATE INDEX acquires an ExclusiveLock — no queries can read from or write to the table while the index is built. On a heavily used production table, this is essentially downtime. CREATE INDEX CONCURRENTLY acquires a much lighter lock, allowing all reads and writes to continue while the index build runs in the background.</p>
        <p style={{ margin: '0 0 14px' }}>The trade-offs: CONCURRENTLY takes longer to build (typically 2-3x) because it must make multiple passes over the table data and handle concurrent writes during the build. It also cannot be run inside a transaction — it must be run as a standalone statement. If a CONCURRENTLY build fails or is interrupted, it leaves an invalid index that must be cleaned up with DROP INDEX CONCURRENTLY before retrying.</p>
        <p style={{ margin: 0 }}>When to use it: always use CREATE INDEX CONCURRENTLY for any index added to a production table that serves live application traffic. The performance cost of the slower build is insignificant compared to the operational cost of locking a busy table. The only exceptions are development and testing environments where downtime does not matter, or the initial creation of indexes on a new empty table (where the build is instant regardless). DROP INDEX CONCURRENTLY also exists and should similarly be used for dropping indexes on live tables.</p>
      </IQ>

      <IQ q="What are database migrations and why are they essential in team environments?">
        <p style={{ margin: '0 0 14px' }}>Database migrations are version-controlled, sequentially applied scripts that record every schema change made to a database. Each migration file contains the SQL to apply a change (the UP migration) and optionally the SQL to reverse it (the DOWN migration). A migration tool tracks which migrations have been applied to each environment in a special tracking table, and applies only the ones that have not yet run.</p>
        <p style={{ margin: '0 0 14px' }}>In team environments, migrations solve the schema synchronisation problem. Without migrations, different developers might have different local schemas — one added a column that another does not have. Staging might be missing a constraint that production has. Migrations ensure that running all migration files in order produces the exact same schema in any environment. When a developer pulls the latest code and runs the migration tool, their database catches up to the current schema automatically.</p>
        <p style={{ margin: 0 }}>Migrations also provide a complete audit trail of every schema change — who made it, when, and why (from the commit message and migration description). This is valuable for compliance, debugging schema-related bugs, and understanding the evolution of the data model. Popular migration tools include Flyway (Java/any), Alembic (Python/SQLAlchemy), Django Migrations (Python/Django), Prisma Migrate (Node.js), and golang-migrate (Go). The choice of tool depends on the language and framework, but the principle is the same: every schema change is a migration file, every migration file is code-reviewed and committed to version control, and the migration tool ensures every environment is in sync.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'phone' of relation 'customers' contains null values — ALTER TABLE SET NOT NULL fails"
        cause="You tried to add NOT NULL to a column that has existing NULL values. The database validates the constraint against all current rows when it is added. Any NULL in the column causes the validation to fail and the ALTER TABLE is rolled back with no change made."
        fix="Find the NULLs first: SELECT COUNT(*) FROM customers WHERE phone IS NULL. Decide what to do with them — update to a placeholder value (UPDATE customers SET phone = 'Unknown' WHERE phone IS NULL) or delete the rows if they are invalid. Once no NULLs remain: SELECT COUNT(*) FROM customers WHERE phone IS NULL should return 0. Then add the constraint: ALTER TABLE customers ALTER COLUMN phone SET NOT NULL."
      />

      <Err
        msg="ERROR: cannot alter type of a column used in a view"
        cause="You tried to change a column's type but there is a view that references that column. The view depends on the column's current type for its own type definitions. PostgreSQL prevents the type change to avoid silently breaking the view."
        fix="Two options: (1) Drop the view, make the type change, then recreate the view: DROP VIEW view_name; ALTER TABLE ...; CREATE VIEW view_name AS ...; (2) Use ALTER TABLE ... TYPE ... CASCADE in PostgreSQL — this automatically rebuilds all dependent views with the new type. Use CASCADE carefully — inspect all dependent objects first with SELECT * FROM pg_depend WHERE refobjid = 'tablename.columnname'::regclass to understand the full impact before running CASCADE."
      />

      <Err
        msg="ALTER TABLE takes 20 minutes and blocks all application traffic"
        cause="The ALTER TABLE operation acquired an ExclusiveLock on the table and is performing a full table rewrite — typically a column type change, adding NOT NULL without the NOT VALID approach, or a MySQL ALTER TABLE that does not support Online DDL for the specific change. All application queries that need to read from or write to the table queue up waiting for the lock, causing timeouts."
        fix="Cancel the ALTER TABLE immediately if still running (pg_cancel_backend in PostgreSQL). Redesign the migration to use online operations: ADD COLUMN instead of MODIFY COLUMN when possible, CREATE INDEX CONCURRENTLY instead of CREATE INDEX, NOT VALID + VALIDATE for constraints, and the expand-contract pattern for type changes. For MySQL, check the Online DDL support matrix for your specific version and operation. Schedule any remaining locking operations during a maintenance window with application traffic redirected."
      />

      <Err
        msg="ERROR: column 'email' does not exist — after renaming the column"
        cause="Application code, a view, a stored procedure, or another query still references the old column name after it was renamed. The rename was applied to the schema but the dependent code was not updated simultaneously. This is the most common consequence of renaming columns without the expand-contract pattern."
        fix="Immediately rename the column back if possible (ALTER TABLE customers RENAME COLUMN email_address TO email) to restore application function. Then use the expand-contract pattern: add the new column name alongside the old, deploy application code that reads from the new name, verify all production traffic is using the new name, then drop the old column. Never rename a column and deploy in a single atomic change — always use expand-contract to allow a safe transition period."
      />

      <Err
        msg="MySQL: ALTER TABLE succeeds but CHECK constraint is not enforced — invalid values still accepted"
        cause="MySQL versions before 8.0.16 parse CHECK constraints in ALTER TABLE without enforcing them. The constraint appears in SHOW CREATE TABLE output but has zero effect — any value is accepted regardless of the CHECK condition. This is a well-known MySQL limitation that has confused many developers."
        fix="Upgrade to MySQL 8.0.16 or later where CHECK constraints are enforced. Verify enforcement in your version: attempt to INSERT a row that violates the CHECK — if it succeeds without error, CHECK is not enforced. For older MySQL versions, implement the validation with a BEFORE INSERT and BEFORE UPDATE trigger that raises a signal if the condition is violated: CREATE TRIGGER chk_price BEFORE INSERT ON products FOR EACH ROW IF NEW.unit_price < 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'unit_price must be >= 0'; END IF. This simulates CHECK constraint behaviour in MySQL versions that do not enforce it natively."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshMart is launching a loyalty points system. Write the ALTER TABLE statements to: (1) Add a 'loyalty_points' column to customers — integer, not null, defaults to 0, must be >= 0. (2) Add a 'points_expiry_date' column — date, nullable. (3) Update existing customers to seed their loyalty_points based on their tier: Platinum = 1000, Gold = 500, Silver = 200, Bronze = 0. (4) Add a named CHECK constraint ensuring points_expiry_date is either NULL or in the future (> current date). Then verify with a SELECT showing the new columns for all customers."
        hint="Step 1-2: ALTER TABLE ADD COLUMN. Step 3: UPDATE with CASE WHEN. Step 4: ALTER TABLE ADD CONSTRAINT with CHECK. Step 5: SELECT customer_id, first_name, loyalty_tier, loyalty_points, points_expiry_date FROM customers."
        answer={`-- Step 1: Add loyalty_points column
ALTER TABLE customers
ADD COLUMN loyalty_points INTEGER NOT NULL DEFAULT 0
CONSTRAINT chk_customers_loyalty_points_pos CHECK (loyalty_points >= 0);

-- Step 2: Add points_expiry_date column (nullable)
ALTER TABLE customers
ADD COLUMN points_expiry_date DATE;

-- Step 3: Seed loyalty_points based on tier
UPDATE customers
SET loyalty_points = CASE loyalty_tier
  WHEN 'Platinum' THEN 1000
  WHEN 'Gold'     THEN 500
  WHEN 'Silver'   THEN 200
  ELSE 0
END;

-- Step 4: Add named CHECK for expiry date
ALTER TABLE customers
ADD CONSTRAINT chk_customers_expiry_future
CHECK (points_expiry_date IS NULL OR points_expiry_date > CURRENT_DATE);

-- Step 5: Verify the new columns
SELECT
  customer_id,
  first_name,
  loyalty_tier,
  loyalty_points,
  points_expiry_date
FROM customers
ORDER BY loyalty_points DESC;`}
        explanation="Step 1 adds the column with NOT NULL and DEFAULT 0 simultaneously — this works on a table with existing rows because the DEFAULT fills the NULL gap that NOT NULL would reject. The CASE WHEN in Step 3 uses the current loyalty_tier to seed meaningful starting point values. Step 4 adds the expiry constraint with a NULL-safe condition — IS NULL allows rows without an expiry (points never expire) while also allowing future dates. The constraint name follows the chk_tablename_description convention. Notice the column was added before the constraint — this is correct because the constraint references the column, which must exist first."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'ALTER TABLE modifies table structure without (usually) affecting data. The six most common operations: ADD COLUMN, DROP COLUMN, RENAME COLUMN, ALTER COLUMN (type/nullability/default), ADD CONSTRAINT, DROP CONSTRAINT.',
          'Adding a column with a DEFAULT value is instant in PostgreSQL 11+ and MySQL InnoDB — no table rewrite. Adding NOT NULL without a DEFAULT fails on tables with existing rows.',
          'DROP COLUMN is permanent and immediate. Always search your codebase for column references before dropping — views, queries, ORM models, and stored procedures that reference the dropped column will fail silently or with errors.',
          'Renaming a column breaks every dependent object. Use the expand-contract pattern: add new column, backfill, deploy code using new name, drop old column — never rename and deploy in one step.',
          'CREATE INDEX CONCURRENTLY (PostgreSQL) builds an index without locking the table for reads or writes. Always use it for production indexes on live tables. Cannot run inside a transaction.',
          'The NOT VALID + VALIDATE pattern: add a constraint as NOT VALID (instant, skips existing rows), then VALIDATE (scans rows with ShareLock only — does not block reads or writes). Zero-downtime constraint addition on large tables.',
          'Some ALTER TABLE operations lock the entire table: column type changes, adding NOT NULL without NOT VALID, regular CREATE INDEX. Know which operations lock before running them on production.',
          'Database migrations are version-controlled SQL scripts applied sequentially. They ensure all environments have identical schemas. Every schema change should be a migration file — never alter production schema ad-hoc.',
          'MySQL ALTER TABLE syntax differs from PostgreSQL: MODIFY COLUMN instead of ALTER COLUMN, RENAME TABLE differently, CHECK constraints not enforced before MySQL 8.0.16.',
          'The expand-contract pattern is the professional approach for any breaking schema change: expand (add new), transition (deploy code), contract (remove old). Never make breaking changes atomically in production.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 25</strong>, you learn DROP TABLE and TRUNCATE — when to use each, the irreversibility of both, and how to safely clean up tables in development vs production environments.
        </p>
        <Link href="/learn/sql/drop-truncate" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 25 → DROP TABLE and TRUNCATE
        </Link>
      </div>

    </LearnLayout>
  );
}