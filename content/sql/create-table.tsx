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

export default function CreateTable() {
  return (
    <LearnLayout
      title="CREATE TABLE"
      description="Define tables from scratch — column types, constraints, primary keys, foreign keys, default values, and schema design decisions that last for years"
      section="SQL — Module 19"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What CREATE TABLE Does" />

      <P>Every table you have queried in this course — customers, orders, products, stores, employees, order_items — was created with a CREATE TABLE statement. It is the foundational DDL (Data Definition Language) command that defines the structure of a table: what columns it has, what type each column stores, what values are valid, and how it relates to other tables.</P>

      <P>CREATE TABLE is not just syntax to memorise. The decisions you make in a CREATE TABLE statement — which columns to include, which types to use, which constraints to enforce, which relationships to define — shape the entire application built on top of it. A well-designed table is a joy to query and maintain. A poorly designed one causes bugs, data quality issues, and migrations that lock production databases for hours.</P>

      <P>This module teaches you to write CREATE TABLE statements that are correct, complete, and built to last.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic Syntax — Column Definitions" />

      <P>The core structure of CREATE TABLE is a list of column definitions, each specifying the column name, its data type, and any constraints that apply to that column.</P>

      <CodeBlock
        label="CREATE TABLE basic syntax"
        code={`CREATE TABLE table_name (
  column_name  data_type  [constraints],
  column_name  data_type  [constraints],
  ...
  [table_level constraints]
);

-- Simplest possible table:
CREATE TABLE products (
  product_id    INTEGER,
  product_name  VARCHAR(200),
  unit_price    DECIMAL(10, 2)
);

-- This works but is dangerously incomplete:
-- No primary key, no NOT NULL, no constraints of any kind
-- Any value or no value can go into any column`}
      />

      <H>Column definition anatomy</H>

      <CodeBlock
        label="Anatomy of a column definition"
        code={`column_name   data_type   [NOT NULL]   [DEFAULT value]   [constraints]

-- Examples:
product_id    INTEGER       NOT NULL
product_name  VARCHAR(200)  NOT NULL
unit_price    DECIMAL(10,2) NOT NULL   DEFAULT 0.00
in_stock      BOOLEAN       NOT NULL   DEFAULT true
joined_date   DATE          NOT NULL   DEFAULT CURRENT_DATE
description   TEXT                     -- nullable, no default`}
      />

      <SQLPlayground
        initialQuery={`-- See the column definitions for FreshMart's customers table
-- pragma_table_info() is SQLite's built-in schema inspector
SELECT
  name        AS column_name,
  type        AS data_type,
  [notnull]   AS not_null,
  dflt_value  AS default_value,
  pk          AS primary_key
FROM pragma_table_info('customers');`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="NOT NULL — The Most Important Constraint" />

      <P>NOT NULL is the single most valuable constraint in SQL. It tells the database to reject any INSERT or UPDATE that would leave this column empty. Without NOT NULL, any column can have NULL in any row — silently, with no error.</P>

      <P>The default in SQL is nullable — if you do not specify NOT NULL, the column accepts NULL. This is the opposite of what most applications want. Most columns should be NOT NULL. The exceptions are columns that genuinely may not have a value for every row: delivery_date (NULL until delivered), manager_id (NULL for top-level employees), middle_name (not everyone has one).</P>

      <CodeBlock
        label="NOT NULL — required on most columns"
        code={`-- WRONG: every column nullable by default
CREATE TABLE customers (
  customer_id  INTEGER,
  first_name   VARCHAR(100),
  email        VARCHAR(255),
  joined_date  DATE
);
-- Nothing stops: INSERT INTO customers VALUES (NULL, NULL, NULL, NULL)

-- RIGHT: NOT NULL on every column that must always have a value
CREATE TABLE customers (
  customer_id  INTEGER       NOT NULL,
  first_name   VARCHAR(100)  NOT NULL,
  last_name    VARCHAR(100)  NOT NULL,
  email        VARCHAR(255)  NOT NULL,
  joined_date  DATE          NOT NULL
  -- delivery_date would NOT have NOT NULL — it can be NULL before delivery
);`}
      />

      <SQLPlayground
        initialQuery={`-- Verify which FreshMart columns are NOT NULL
-- notnull = 1 means NOT NULL constraint is present
SELECT 'customers' AS table_name, name AS column_name, type AS data_type
FROM pragma_table_info('customers') WHERE [notnull] = 1
UNION ALL
SELECT 'orders', name, type
FROM pragma_table_info('orders') WHERE [notnull] = 1
UNION ALL
SELECT 'products', name, type
FROM pragma_table_info('products') WHERE [notnull] = 1
ORDER BY table_name;`}
        height={175}
        showSchema={false}
      />

      <Callout type="tip">
        A good rule of thumb: make every column NOT NULL unless you can articulate a specific business reason why it should be nullable. "I'm not sure yet" is not a reason — it is a sign you need to think harder about the data model. Adding NOT NULL later to a large production table is expensive; getting it right on creation costs nothing.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="PRIMARY KEY — Uniquely Identifying Every Row" />

      <P>A primary key is a column (or combination of columns) that uniquely identifies every row in a table. Every table should have a primary key. The database enforces two guarantees on primary key columns: the value must be unique across all rows, and it cannot be NULL.</P>

      <H>Single-column primary key</H>

      <CodeBlock
        label="Primary key syntax — two styles"
        code={`-- Style 1: inline (column-level constraint)
CREATE TABLE customers (
  customer_id  INTEGER  PRIMARY KEY,  -- PK declared here
  first_name   VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL
);

-- Style 2: table-level constraint (required for composite PKs)
CREATE TABLE customers (
  customer_id  INTEGER      NOT NULL,
  first_name   VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  PRIMARY KEY (customer_id)            -- PK declared at table level
);

-- Both produce identical results for single-column PKs`}
      />

      <H>Auto-incrementing primary keys</H>
      <P>Primary key values should be generated automatically — you should never manually assign IDs. Each database has its own syntax for this:</P>

      <CodeBlock
        label="Auto-increment syntax across databases"
        code={`-- PostgreSQL — SERIAL (shorthand) or GENERATED ALWAYS AS IDENTITY (standard)
CREATE TABLE customers (
  customer_id  SERIAL         PRIMARY KEY,  -- auto-increment
  -- or:
  customer_id  INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name   VARCHAR(100)   NOT NULL
);

-- MySQL — AUTO_INCREMENT
CREATE TABLE customers (
  customer_id  INTEGER        PRIMARY KEY AUTO_INCREMENT,
  first_name   VARCHAR(100)   NOT NULL
);

-- SQLite — INTEGER PRIMARY KEY is implicitly auto-increment
CREATE TABLE customers (
  customer_id  INTEGER        PRIMARY KEY,  -- auto-increment in SQLite
  first_name   VARCHAR(100)   NOT NULL
);

-- DuckDB (this playground) — SEQUENCE or auto-generated
CREATE SEQUENCE IF NOT EXISTS customer_id_seq;
CREATE TABLE customers (
  customer_id  INTEGER        PRIMARY KEY DEFAULT nextval('customer_id_seq'),
  first_name   VARCHAR(100)   NOT NULL
);`}
      />

      <H>Composite primary key — when one column is not enough</H>
      <P>Some tables need multiple columns to uniquely identify a row. The order_items table is a good example — each item is uniquely identified by both its order_id and product_id (one order can have many products, each product can appear in many orders).</P>

      <CodeBlock
        label="Composite primary key"
        code={`-- order_items: no single column uniquely identifies a row
-- The combination of order_id + product_id does
CREATE TABLE order_items (
  order_id    INTEGER       NOT NULL,
  product_id  INTEGER       NOT NULL,
  quantity    INTEGER       NOT NULL,
  unit_price  DECIMAL(10,2) NOT NULL,
  -- Composite PK: must be table-level constraint
  PRIMARY KEY (order_id, product_id)
);

-- A composite PK guarantees:
-- No duplicate (order_id, product_id) pairs
-- Neither column can be NULL`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="FOREIGN KEY — Enforcing Relationships" />

      <P>A foreign key (FK) constraint ensures that a value in one table's column exists as a primary key in another table. It enforces <Hl>referential integrity</Hl> — you cannot have an order for a customer that does not exist, or an order item for a product that does not exist.</P>

      <CodeBlock
        label="FOREIGN KEY syntax"
        code={`-- Inline style (column-level):
CREATE TABLE orders (
  order_id     INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id  INTEGER       NOT NULL REFERENCES customers(customer_id),
  store_id     VARCHAR(10)   NOT NULL REFERENCES stores(store_id),
  order_date   DATE          NOT NULL
);

-- Table-level style (more explicit, allows naming the constraint):
CREATE TABLE orders (
  order_id     INTEGER       NOT NULL,
  customer_id  INTEGER       NOT NULL,
  store_id     VARCHAR(10)   NOT NULL,
  order_date   DATE          NOT NULL,
  PRIMARY KEY (order_id),
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  CONSTRAINT fk_orders_store
    FOREIGN KEY (store_id)    REFERENCES stores(store_id)
);`}
      />

      <H>What foreign keys enforce</H>

      <CodeBlock
        label="What FK enforcement prevents"
        code={`-- With FK on orders.customer_id → customers.customer_id:

-- This FAILS — customer_id 9999 does not exist in customers table
INSERT INTO orders (customer_id, store_id, order_date, ...)
VALUES (9999, 'ST001', '2024-01-15', ...);
-- ERROR: insert or update on table "orders" violates foreign key constraint

-- This FAILS — cannot delete a customer who has orders
DELETE FROM customers WHERE customer_id = 1;
-- ERROR: update or delete on table "customers" violates foreign key constraint
-- (because orders reference this customer)

-- FKs work in both directions:
-- INSERT: the referenced value must exist
-- DELETE: the referencing row must not exist (unless CASCADE is set)`}
      />

      <H>ON DELETE behaviour</H>
      <P>When a referenced row is deleted, the database needs to decide what to do with rows that reference it. The ON DELETE clause controls this.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Option', 'Behaviour', 'Use when'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['RESTRICT (default)', 'Prevents deletion if any referencing row exists', 'Most cases — protect data integrity, force explicit cleanup'],
              ['CASCADE', 'Automatically deletes all referencing rows', 'Child data is meaningless without the parent (order_items without order)'],
              ['SET NULL', 'Sets the FK column to NULL in referencing rows', 'Child can exist independently (employee without a manager)'],
              ['SET DEFAULT', 'Sets the FK column to its default value', 'Rare — only if a meaningful default exists'],
              ['NO ACTION', 'Like RESTRICT but checked at end of transaction', 'Complex transactions where temporary violations are OK'],
            ].map(([opt, beh, use], i) => (
              <tr key={opt} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{opt}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{beh}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        label="ON DELETE examples"
        code={`-- order_items deleted when the parent order is deleted
FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE

-- employee's manager_id set to NULL if the manager is deleted
FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL

-- default: prevent deletion of customer who has orders
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
-- equivalent to ON DELETE RESTRICT`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="UNIQUE — Enforcing Column Uniqueness" />

      <P>A UNIQUE constraint ensures no two rows have the same value in the specified column (or combination of columns). Unlike PRIMARY KEY, a UNIQUE column can contain NULL (multiple NULLs are allowed because NULL ≠ NULL in SQL).</P>

      <CodeBlock
        label="UNIQUE constraint syntax"
        code={`-- Column-level UNIQUE
CREATE TABLE customers (
  customer_id  INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email        VARCHAR(255)  NOT NULL UNIQUE,  -- no duplicate emails
  phone        VARCHAR(20)   UNIQUE            -- nullable but unique if set
);

-- Table-level UNIQUE (required for composite unique constraints)
CREATE TABLE customers (
  customer_id   INTEGER       NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  phone         VARCHAR(20),
  PRIMARY KEY (customer_id),
  UNIQUE (email),                         -- single column
  UNIQUE (phone),                         -- another single column
  UNIQUE (email, phone)                   -- composite: this PAIR must be unique
);`}
      />

      <SQLPlayground
        initialQuery={`-- See column definitions for the customers, products, and stores tables
SELECT 'customers' AS table_name, name AS column_name, type AS data_type, [notnull] AS not_null, dflt_value AS default_value
FROM pragma_table_info('customers')
UNION ALL
SELECT 'products', name, type, [notnull], dflt_value
FROM pragma_table_info('products')
UNION ALL
SELECT 'stores', name, type, [notnull], dflt_value
FROM pragma_table_info('stores')
ORDER BY table_name;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="CHECK — Validating Column Values" />

      <P>A CHECK constraint defines a condition that every row must satisfy. If an INSERT or UPDATE would violate the condition, the database rejects it with an error. CHECK constraints bring business logic into the database — enforcing rules that application code alone cannot guarantee.</P>

      <CodeBlock
        label="CHECK constraint syntax and examples"
        code={`-- Basic CHECK constraints:
CREATE TABLE products (
  product_id   INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name VARCHAR(200)  NOT NULL,
  unit_price   DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  cost_price   DECIMAL(10,2) NOT NULL CHECK (cost_price >= 0),
  discount_pct DECIMAL(5,2)  NOT NULL DEFAULT 0
               CHECK (discount_pct >= 0 AND discount_pct <= 100),
  quantity     INTEGER       NOT NULL CHECK (quantity > 0)
);

-- Named CHECK constraints (easier to identify in error messages):
CREATE TABLE orders (
  order_id       INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id    INTEGER       NOT NULL,
  total_amount   DECIMAL(10,2) NOT NULL,
  order_status   VARCHAR(20)   NOT NULL
    CONSTRAINT chk_order_status
    CHECK (order_status IN ('Processing','Delivered','Cancelled','Returned')),
  payment_method VARCHAR(20)   NOT NULL
    CONSTRAINT chk_payment_method
    CHECK (payment_method IN ('UPI','Card','COD','NetBanking')),
  loyalty_tier   VARCHAR(20)   NOT NULL DEFAULT 'Bronze'
    CONSTRAINT chk_loyalty_tier
    CHECK (loyalty_tier IN ('Bronze','Silver','Gold','Platinum'))
);`}
      />

      <H>Cross-column CHECK constraints</H>
      <P>CHECK constraints can reference multiple columns — enforcing rules that span across columns in the same row.</P>

      <CodeBlock
        label="Cross-column CHECK constraints"
        code={`CREATE TABLE orders (
  order_id       INTEGER       NOT NULL,
  order_date     DATE          NOT NULL,
  delivery_date  DATE,
  total_amount   DECIMAL(10,2) NOT NULL,
  -- delivery_date must be on or after order_date
  CONSTRAINT chk_delivery_after_order
    CHECK (delivery_date IS NULL OR delivery_date >= order_date),
  -- cost_price must be less than or equal to unit_price
  CONSTRAINT chk_valid_margin
    CHECK (cost_price <= unit_price)
);`}
      />

      <SQLPlayground
        initialQuery={`-- See column defaults in FreshMart tables
-- dflt_value holds the DEFAULT expression; NULL means no default set
SELECT 'customers' AS table_name, name AS column_name, type AS data_type, dflt_value AS default_value
FROM pragma_table_info('customers') WHERE dflt_value IS NOT NULL
UNION ALL
SELECT 'orders', name, type, dflt_value
FROM pragma_table_info('orders') WHERE dflt_value IS NOT NULL
UNION ALL
SELECT 'products', name, type, dflt_value
FROM pragma_table_info('products') WHERE dflt_value IS NOT NULL
UNION ALL
SELECT 'order_items', name, type, dflt_value
FROM pragma_table_info('order_items') WHERE dflt_value IS NOT NULL
ORDER BY table_name;`}
        height={175}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="DEFAULT — Automatic Column Values" />

      <P>A DEFAULT clause specifies the value to use for a column when no value is provided on INSERT. Defaults reduce boilerplate in application code and guarantee sensible values for columns the caller did not specify.</P>

      <CodeBlock
        label="DEFAULT syntax and common patterns"
        code={`-- Static defaults:
loyalty_tier  VARCHAR(20)   NOT NULL DEFAULT 'Bronze'
in_stock      BOOLEAN       NOT NULL DEFAULT true
discount_pct  DECIMAL(5,2)  NOT NULL DEFAULT 0.00
order_status  VARCHAR(20)   NOT NULL DEFAULT 'Processing'

-- Dynamic defaults (computed at INSERT time):
joined_date   DATE          NOT NULL DEFAULT CURRENT_DATE
created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()

-- Using defaults on INSERT:
-- Without specifying loyalty_tier — gets 'Bronze' automatically
INSERT INTO customers (first_name, last_name, email, joined_date)
VALUES ('Aisha', 'Khan', 'aisha@gmail.com', '2024-01-15');

-- With explicit value — overrides the default
INSERT INTO customers (first_name, last_name, email, joined_date, loyalty_tier)
VALUES ('Rahul', 'Sharma', 'rahul@gmail.com', '2024-01-15', 'Gold');`}
      />

      <SQLPlayground
        initialQuery={`-- See which FreshMart columns have defaults
SELECT 'customers' AS table_name, name AS column_name, type AS data_type, dflt_value AS default_value
FROM pragma_table_info('customers') WHERE dflt_value IS NOT NULL
UNION ALL
SELECT 'orders', name, type, dflt_value
FROM pragma_table_info('orders') WHERE dflt_value IS NOT NULL
UNION ALL
SELECT 'products', name, type, dflt_value
FROM pragma_table_info('products') WHERE dflt_value IS NOT NULL
ORDER BY table_name;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="IF NOT EXISTS — Safe Table Creation" />

      <P>Running CREATE TABLE when the table already exists throws an error. The IF NOT EXISTS modifier makes the statement a no-op if the table already exists — useful in scripts that might be run multiple times.</P>

      <CodeBlock
        label="IF NOT EXISTS"
        code={`-- Without IF NOT EXISTS: error if table already exists
CREATE TABLE customers (...);
-- ERROR: relation "customers" already exists

-- With IF NOT EXISTS: safe to run multiple times
CREATE TABLE IF NOT EXISTS customers (...);
-- No error if the table exists — just does nothing

-- Common use case: database initialisation scripts
-- and migration scripts that need to be idempotent`}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Complete Table Definitions — FreshMart From Scratch" />

      <P>Here are the complete, production-quality CREATE TABLE statements for the entire FreshMart database. Every type choice, every constraint, and every default is annotated with the reasoning behind it.</P>

      <CodeBlock
        label="FreshMart — stores table (no dependencies, create first)"
        code={`CREATE TABLE stores (
  store_id        VARCHAR(10)    PRIMARY KEY,
  -- VARCHAR(10) not INTEGER: store codes like 'ST001' contain letters
  store_name      VARCHAR(200)   NOT NULL,
  city            VARCHAR(100)   NOT NULL,
  state           VARCHAR(100)   NOT NULL,
  manager_name    VARCHAR(200)   NOT NULL,
  opened_date     DATE           NOT NULL,
  monthly_target  DECIMAL(12, 2) NOT NULL
                  CHECK (monthly_target > 0)
  -- DECIMAL(12,2): store targets can be large (crores)
  -- CHECK ensures a target of zero or negative is impossible
);`}
      />

      <CodeBlock
        label="FreshMart — customers table"
        code={`CREATE TABLE customers (
  customer_id  INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name   VARCHAR(100)   NOT NULL,
  last_name    VARCHAR(100)   NOT NULL,
  email        VARCHAR(255)   NOT NULL UNIQUE,
  -- UNIQUE: one account per email address
  phone        VARCHAR(20),
  -- Nullable: not all customers provide a phone number
  -- VARCHAR not INTEGER: phone numbers have leading zeros and country codes
  city         VARCHAR(100),
  state        VARCHAR(100),
  pincode      VARCHAR(10),
  -- All nullable: collected progressively, not all at registration
  joined_date  DATE           NOT NULL DEFAULT CURRENT_DATE,
  loyalty_tier VARCHAR(20)    NOT NULL DEFAULT 'Bronze'
               CHECK (loyalty_tier IN ('Bronze','Silver','Gold','Platinum'))
  -- CHECK enforces only valid tiers — no 'Diamond' or typos possible
);`}
      />

      <CodeBlock
        label="FreshMart — products table"
        code={`CREATE TABLE products (
  product_id    INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name  VARCHAR(200)   NOT NULL,
  category      VARCHAR(100)   NOT NULL,
  sub_category  VARCHAR(100),
  -- Nullable: not all products have a sub-category
  brand         VARCHAR(100),
  -- Nullable: some products are unbranded
  unit_price    DECIMAL(10, 2) NOT NULL
                CHECK (unit_price >= 0),
  cost_price    DECIMAL(10, 2) NOT NULL
                CHECK (cost_price >= 0),
  unit          VARCHAR(50),
  in_stock      BOOLEAN        NOT NULL DEFAULT true
  -- DEFAULT true: newly added products are assumed in stock
);`}
      />

      <CodeBlock
        label="FreshMart — employees table (self-referencing FK)"
        code={`CREATE TABLE employees (
  employee_id  INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name   VARCHAR(100)   NOT NULL,
  last_name    VARCHAR(100)   NOT NULL,
  role         VARCHAR(100)   NOT NULL,
  department   VARCHAR(100),
  store_id     VARCHAR(10)
               REFERENCES stores(store_id) ON DELETE SET NULL,
  -- Nullable FK: head office employees have no store
  -- SET NULL: if a store is deleted, employees become store-less (not deleted)
  salary       DECIMAL(10, 2) NOT NULL
               CHECK (salary >= 0),
  hire_date    DATE           NOT NULL,
  manager_id   INTEGER
               REFERENCES employees(employee_id) ON DELETE SET NULL
  -- Self-referencing FK: manager is also an employee
  -- Nullable: top-level managers have no manager
  -- SET NULL: if a manager is deleted, reports become manager-less
);`}
      />

      <CodeBlock
        label="FreshMart — orders table"
        code={`CREATE TABLE orders (
  order_id        INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id     INTEGER        NOT NULL
                  REFERENCES customers(customer_id) ON DELETE RESTRICT,
  -- RESTRICT: cannot delete a customer who has orders
  store_id        VARCHAR(10)    NOT NULL
                  REFERENCES stores(store_id) ON DELETE RESTRICT,
  order_date      DATE           NOT NULL DEFAULT CURRENT_DATE,
  delivery_date   DATE,
  -- Nullable: NULL until the order is delivered
  order_status    VARCHAR(20)    NOT NULL DEFAULT 'Processing'
                  CHECK (order_status IN
                    ('Delivered','Processing','Cancelled','Returned')),
  payment_method  VARCHAR(20)    NOT NULL
                  CHECK (payment_method IN ('UPI','Card','COD','NetBanking')),
  total_amount    DECIMAL(10, 2) NOT NULL
                  CHECK (total_amount >= 0),
  CONSTRAINT chk_delivery_after_order
    CHECK (delivery_date IS NULL OR delivery_date >= order_date)
  -- Cross-column CHECK: delivery cannot be before the order date
);`}
      />

      <CodeBlock
        label="FreshMart — order_items table (create last — depends on orders and products)"
        code={`CREATE TABLE order_items (
  item_id       INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id      INTEGER        NOT NULL
                REFERENCES orders(order_id)   ON DELETE CASCADE,
  -- CASCADE: when an order is deleted, its items are deleted too
  -- An order_item is meaningless without its parent order
  product_id    INTEGER        NOT NULL
                REFERENCES products(product_id) ON DELETE RESTRICT,
  -- RESTRICT: cannot delete a product that has been ordered
  quantity      INTEGER        NOT NULL
                CHECK (quantity > 0),
  unit_price    DECIMAL(10, 2) NOT NULL
                CHECK (unit_price >= 0),
  discount_pct  DECIMAL(5, 2)  NOT NULL DEFAULT 0
                CHECK (discount_pct >= 0 AND discount_pct <= 100),
  line_total    DECIMAL(10, 2) NOT NULL
                CHECK (line_total >= 0),
  -- line_total stored explicitly for reporting performance
  -- application code must keep it consistent with quantity * unit_price
  UNIQUE (order_id, product_id)
  -- One product per order line — prevents duplicate line items
);`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="CREATE TABLE AS SELECT — Derived Tables" />

      <P>CREATE TABLE AS SELECT (CTAS) creates a new table and populates it with the results of a SELECT query in one statement. This is used extensively in data warehousing and analytics for creating summary tables, snapshots, and denormalised reporting tables.</P>

      <CodeBlock
        label="CREATE TABLE AS SELECT syntax"
        code={`-- Create a new table from a query result
CREATE TABLE monthly_revenue_summary AS
SELECT
  EXTRACT(YEAR  FROM o.order_date)   AS year,
  EXTRACT(MONTH FROM o.order_date)   AS month,
  o.store_id,
  s.city,
  COUNT(o.order_id)                  AS total_orders,
  SUM(o.total_amount)                AS total_revenue,
  AVG(o.total_amount)                AS avg_order_value
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY
  EXTRACT(YEAR  FROM o.order_date),
  EXTRACT(MONTH FROM o.order_date),
  o.store_id, s.city;

-- The new table has the columns and data from the SELECT
-- But NO constraints — no PK, no NOT NULL, no FKs
-- Add them separately if needed:
ALTER TABLE monthly_revenue_summary
  ADD PRIMARY KEY (year, month, store_id);`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate CTAS: see what a summary table would look like
-- (DuckDB playground doesn't persist across queries,
-- but the SELECT logic is identical to CTAS)
SELECT
  EXTRACT(MONTH FROM o.order_date)   AS month,
  o.store_id,
  COUNT(o.order_id)                  AS total_orders,
  ROUND(SUM(o.total_amount), 2)      AS total_revenue,
  ROUND(AVG(o.total_amount), 2)      AS avg_order_value
FROM orders AS o
WHERE o.order_status = 'Delivered'
GROUP BY
  EXTRACT(MONTH FROM o.order_date),
  o.store_id
ORDER BY month, total_revenue DESC;`}
        height={200}
        showSchema={true}
      />

      <Callout type="info">
        CTAS creates a table without constraints. The new table is a snapshot of the data at creation time — it does not update when the source tables change. In data warehousing, CTAS tables are typically recreated on a schedule (daily, hourly) to refresh the snapshot. Add indexes manually after CTAS for query performance: CREATE INDEX ON monthly_revenue_summary (store_id).
      </Callout>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="Table Creation Order — Dependency Management" />

      <P>When creating multiple related tables, the order matters. A table with a foreign key that references another table cannot be created before the referenced table exists. This is called the <Hl>dependency order</Hl> and it is one of the most common mistakes in schema setup scripts.</P>

      <CodeBlock
        label="Correct creation order for FreshMart"
        code={`-- Create tables in dependency order:
-- Tables with no FKs first, tables with FKs last

-- Step 1: Tables with no foreign keys (no dependencies)
CREATE TABLE stores   (...);   -- no FKs
CREATE TABLE customers(...);   -- no FKs
CREATE TABLE products (...);   -- no FKs

-- Step 2: Tables that depend on Step 1
CREATE TABLE employees(...);   -- FK → stores

-- Step 3: Tables that depend on Step 1 and 2
CREATE TABLE orders   (...);   -- FK → customers, stores

-- Step 4: Tables that depend on Step 3
CREATE TABLE order_items(...); -- FK → orders, products

-- WRONG ORDER — this fails:
CREATE TABLE orders (...REFERENCES customers...);  -- ERROR: customers does not exist yet
CREATE TABLE customers (...);`}
      />

      <HR />

      {/* ── PART 13 ── */}
      <Part n="13" title="What This Looks Like at Work" />

      <P>You join a Bangalore health-tech startup as their first data engineer. The company is building a telemedicine platform — doctors, patients, appointments, and prescriptions. You are asked to design and create the initial database schema. This is a greenfield project — there is no existing schema.</P>

      <TimeBlock time="9:00 AM" label="Requirements gathering">
        The product manager walks you through the domain: patients register with their name, date of birth, and contact details. Doctors have a specialisation and a consultation fee. Appointments connect a patient to a doctor at a specific date and time, with a status (scheduled, completed, cancelled). Prescriptions belong to appointments and contain medication details.
      </TimeBlock>

      <TimeBlock time="10:00 AM" label="You design the dependency graph">
        No dependencies: patients, doctors. Depends on patients and doctors: appointments. Depends on appointments: prescriptions. Creation order: patients → doctors → appointments → prescriptions.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="You write the CREATE TABLE statements">
        Each table gets correct types, NOT NULL on every required column, CHECK constraints for valid values, FKs with appropriate ON DELETE behaviour, and DEFAULT for standard values.
      </TimeBlock>

      <CodeBlock
        label="Health-tech schema — complete CREATE TABLE statements"
        code={`-- Step 1: patients (no dependencies)
CREATE TABLE patients (
  patient_id    INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name    VARCHAR(100)   NOT NULL,
  last_name     VARCHAR(100)   NOT NULL,
  date_of_birth DATE           NOT NULL,
  gender        VARCHAR(10)
                CHECK (gender IN ('Male','Female','Other','Prefer not to say')),
  email         VARCHAR(255)   NOT NULL UNIQUE,
  phone         VARCHAR(20)    NOT NULL,
  city          VARCHAR(100),
  registered_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Step 2: doctors (no dependencies)
CREATE TABLE doctors (
  doctor_id        INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name       VARCHAR(100)   NOT NULL,
  last_name        VARCHAR(100)   NOT NULL,
  specialisation   VARCHAR(200)   NOT NULL,
  qualification    VARCHAR(200)   NOT NULL,
  consultation_fee DECIMAL(8, 2)  NOT NULL
                   CHECK (consultation_fee > 0),
  is_active        BOOLEAN        NOT NULL DEFAULT true,
  joined_at        TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Step 3: appointments (depends on patients and doctors)
CREATE TABLE appointments (
  appointment_id   INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id       INTEGER        NOT NULL
                   REFERENCES patients(patient_id) ON DELETE RESTRICT,
  doctor_id        INTEGER        NOT NULL
                   REFERENCES doctors(doctor_id)   ON DELETE RESTRICT,
  scheduled_at     TIMESTAMPTZ    NOT NULL,
  duration_minutes INTEGER        NOT NULL DEFAULT 30
                   CHECK (duration_minutes > 0),
  status           VARCHAR(20)    NOT NULL DEFAULT 'Scheduled'
                   CHECK (status IN ('Scheduled','Completed','Cancelled','No-show')),
  consultation_fee DECIMAL(8, 2)  NOT NULL,
  -- Store fee at time of booking — doctor's fee may change later
  notes            TEXT,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Step 4: prescriptions (depends on appointments)
CREATE TABLE prescriptions (
  prescription_id  INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  appointment_id   INTEGER        NOT NULL UNIQUE
                   REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  -- UNIQUE: one prescription per appointment
  -- CASCADE: if appointment deleted, prescription deleted too
  medication_name  VARCHAR(200)   NOT NULL,
  dosage           VARCHAR(100)   NOT NULL,
  frequency        VARCHAR(100)   NOT NULL,
  duration_days    INTEGER        NOT NULL CHECK (duration_days > 0),
  instructions     TEXT,
  prescribed_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);`}
      />

      <TimeBlock time="11:30 AM" label="Schema reviewed and approved">
        The CTO reviews the schema and flags one issue: the gender CHECK constraint does not include 'Non-binary' — which you add. She also asks why consultation_fee is stored on both the doctors table and appointments. You explain: storing it on appointments captures the fee at the time of booking — if a doctor changes their fee next month, historical appointments should still show the original fee. This is called a <Hl>slowly changing dimension</Hl> pattern and it is the correct approach for any value that can change over time.
      </TimeBlock>

      <ProTip>
        Always store the "effective" value of a changing attribute at transaction time — never just a foreign key reference. If you only store doctor_id on appointments, a future fee change breaks all historical reports. Storing consultation_fee on appointments captures the value as it was. This principle applies to prices in order_items, salary in payroll records, and tax rates on invoices — always store the effective value, not just a reference to a potentially changing master record.
      </ProTip>

      <HR />

      {/* ── PART 14 — Interview Prep ── */}
      <Part n="14" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between PRIMARY KEY, UNIQUE, and NOT NULL constraints?">
        <p style={{ margin: '0 0 14px' }}>NOT NULL ensures a column cannot contain NULL — every row must have a value for this column. It does not require values to be unique — multiple rows can have the same non-null value. NOT NULL is a column-level constraint that only cares about the presence or absence of a value.</p>
        <p style={{ margin: '0 0 14px' }}>UNIQUE ensures no two rows have the same value in the specified column or combination of columns. Unlike PRIMARY KEY, UNIQUE allows NULL — and because NULL ≠ NULL in SQL, multiple rows can have NULL in a UNIQUE column without violating the constraint. UNIQUE creates an index on the constrained column, which also improves lookup performance. A table can have multiple UNIQUE constraints.</p>
        <p style={{ margin: 0 }}>PRIMARY KEY is the combination of both: it enforces uniqueness (like UNIQUE) AND it enforces NOT NULL. Every table should have exactly one primary key. PRIMARY KEY also creates an index (typically a clustered index that physically orders the table by the PK values). Primary key columns are the reference target for foreign keys in other tables. The summary: NOT NULL prevents missing values. UNIQUE prevents duplicate values. PRIMARY KEY = NOT NULL + UNIQUE + the designated row identifier.</p>
      </IQ>

      <IQ q="What is referential integrity and how do foreign keys enforce it?">
        <p style={{ margin: '0 0 14px' }}>Referential integrity is the guarantee that relationships between tables are consistent — that a value in a foreign key column always corresponds to an existing primary key in the referenced table. Without referential integrity, you can have "orphan" records: order_items that reference orders that do not exist, or orders that reference customers who have been deleted. These orphan records cause queries to miss data or return wrong results.</p>
        <p style={{ margin: '0 0 14px' }}>Foreign key constraints enforce referential integrity at the database level in two directions. On INSERT or UPDATE: the database checks that the FK value exists as a PK in the referenced table — if not, the operation is rejected. An attempt to insert an order with customer_id = 9999 fails immediately if no customer with that ID exists. On DELETE or UPDATE of the referenced row: the database checks whether any FK values reference the row being deleted. The behaviour depends on the ON DELETE option specified: RESTRICT (default) prevents the deletion, CASCADE automatically deletes referencing rows, SET NULL sets the FK to NULL.</p>
        <p style={{ margin: 0 }}>The value of database-level FK enforcement over application-level validation is that it cannot be bypassed. Application code has bugs, edge cases, and direct database access tools that bypass application logic. A FK constraint enforced by the database is absolute — no application bug, no raw SQL INSERT, and no bulk import can create an inconsistent state. At Indian fintech companies where data integrity is a regulatory requirement, FK constraints are mandatory for financial tables.</p>
      </IQ>

      <IQ q="When should you use ON DELETE CASCADE vs ON DELETE RESTRICT?">
        <p style={{ margin: '0 0 14px' }}>ON DELETE CASCADE automatically deletes all referencing rows when the referenced row is deleted. Use it when the child rows are meaningless without their parent — they exist only as parts of the parent entity. order_items is the canonical example: an order item cannot exist without its order. If an order is deleted (cancelled and purged), its items should be deleted too. A prescription belonging to a deleted appointment is also meaningless on its own — CASCADE is appropriate.</p>
        <p style={{ margin: '0 0 14px' }}>ON DELETE RESTRICT (the default) prevents deletion of a referenced row as long as any FK references it. Use it when the child rows have independent meaning or when deletion should require explicit confirmation. A customer who has placed orders should not be silently deleted — the orders are independent business records that may be needed for accounting, reporting, and compliance. Deleting them requires deliberate action. Similarly, a product that has been ordered should not be deletable — the order history is a permanent business record.</p>
        <p style={{ margin: 0 }}>The mental model: CASCADE is for containment — child data is "contained by" the parent and has no life outside it. RESTRICT is for association — child data is "associated with" the parent but has independent existence. A helpful question: "If the parent is deleted, does the child data still make sense?" If no — CASCADE. If yes — RESTRICT. SET NULL is for optional associations — an employee can exist without a manager, so if the manager is deleted, set manager_id to NULL rather than deleting the employee or preventing the manager's deletion.</p>
      </IQ>

      <IQ q="What is the purpose of a CHECK constraint and what are its limitations?">
        <p style={{ margin: '0 0 14px' }}>A CHECK constraint defines a condition that every row must satisfy when inserted or updated. It enforces business rules at the database level — rules that are independent of the application inserting the data. CHECK (unit_price {'>'}= 0) prevents negative prices. CHECK (loyalty_tier IN ('Bronze','Silver','Gold','Platinum')) prevents invalid tier values. CHECK (delivery_date IS NULL OR delivery_date {'>'}= order_date) prevents logically impossible dates where delivery precedes the order.</p>
        <p style={{ margin: '0 0 14px' }}>The value of CHECK over application-level validation is the same as FK constraints — it cannot be bypassed. Any INSERT or UPDATE that violates a CHECK constraint is rejected immediately by the database, regardless of which application, script, or tool performed the operation. This makes CHECK constraints the final defence against invalid data.</p>
        <p style={{ margin: 0 }}>Limitations: CHECK constraints can only reference columns in the same row — they cannot reference other tables or other rows. You cannot write CHECK (customer_id IN (SELECT customer_id FROM customers)) — that is what foreign keys are for. CHECK also cannot call non-deterministic functions like NOW() or random() in some databases — constraints must evaluate consistently. Complex inter-row or inter-table validation that CHECK cannot express requires triggers or application logic. In MySQL (prior to version 8.0.16), CHECK constraints were parsed but silently ignored — a critical limitation that caused many developers to incorrectly assume their data was validated when it was not.</p>
      </IQ>

      <IQ q="Why does the order of table creation matter and how do you determine the correct order?">
        <p style={{ margin: '0 0 14px' }}>Table creation order matters because foreign key constraints reference other tables. When you create a table with a FK to another table, the referenced table must already exist. If it does not, the CREATE TABLE statement fails with an error like "referenced table does not exist." This is the dependency constraint of relational schema creation.</p>
        <p style={{ margin: '0 0 14px' }}>The correct creation order follows the dependency graph of your schema — a directed acyclic graph (DAG) where each table is a node and each FK is a directed edge pointing to the referenced table. Tables with no outgoing edges (no FKs) have no dependencies and can be created first. Tables with FKs must be created after all the tables they reference. This is called a topological sort of the dependency graph.</p>
        <p style={{ margin: 0 }}>For FreshMart: stores, customers, and products have no FKs — create first. employees references stores — create after stores. orders references customers and stores — create after both. order_items references orders and products — create last. In practice, determine creation order by drawing the dependency graph and creating tables from the "leaves" (no dependencies) inward to the "centre" (many dependencies). For schemas with circular references — where table A references B and B references A — break the cycle by creating one table first without the circular FK, then adding it later with ALTER TABLE ADD FOREIGN KEY after both tables exist.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: relation 'customers' does not exist — when creating orders table"
        cause="You are trying to create a table with a foreign key that references a table that has not been created yet. The database validates FK references at creation time — the referenced table must exist. This happens when CREATE TABLE statements are run in the wrong order, or when a migration script is partially executed and the referenced table was not created in a previous run."
        fix="Create tables in dependency order: tables with no FKs first, then tables that reference them. For FreshMart: stores, customers, products → employees → orders → order_items. If you have a circular dependency (table A references B, B references A), create one table without the circular FK, then add it after both tables exist: ALTER TABLE a ADD CONSTRAINT fk_a_b FOREIGN KEY (b_id) REFERENCES b(b_id)."
      />

      <Err
        msg="ERROR: insert or update on table 'orders' violates foreign key constraint — customer_id key is not present in customers"
        cause="You are trying to insert an order with a customer_id value that does not exist in the customers table. The FK constraint correctly prevents this. Common causes: the customer was deleted before the order was removed, the customer_id value is wrong (typo, wrong ID), or the customers table was not populated before orders were inserted in a test or migration script."
        fix="Insert the referenced customer first, then insert the order. In a migration or seed script, always INSERT in dependency order: customers before orders, orders before order_items. To find which customer_id values are missing: SELECT DISTINCT o.customer_id FROM orders_staging o LEFT JOIN customers c ON o.customer_id = c.customer_id WHERE c.customer_id IS NULL — this identifies FK violations before a bulk insert."
      />

      <Err
        msg="ERROR: new row for relation 'products' violates check constraint 'products_unit_price_check'"
        cause="An INSERT or UPDATE attempted to set unit_price to a value that violates the CHECK (unit_price >= 0) constraint — most likely a negative value or NULL (if the column is also NOT NULL). Named constraints like products_unit_price_check help identify which constraint failed. Unnamed constraints show the auto-generated name which is harder to trace."
        fix="Fix the data being inserted: ensure unit_price is a non-negative value. If the CHECK constraint name is not informative, query it: SELECT constraint_name, check_clause FROM information_schema.check_constraints WHERE constraint_name = 'products_unit_price_check'. Always name your CHECK constraints descriptively — CONSTRAINT chk_products_price_positive CHECK (unit_price >= 0) — so error messages immediately identify the business rule that was violated."
      />

      <Err
        msg="ERROR: duplicate key value violates unique constraint 'customers_email_key'"
        cause="An INSERT attempted to add a customer with an email address that already exists in the customers table. The UNIQUE constraint on email correctly prevents duplicate accounts. This happens during bulk imports when the source data has duplicate emails, when a user attempts to register twice, or when a migration script runs multiple times without deduplication."
        fix="For single inserts, check whether the email exists first: SELECT customer_id FROM customers WHERE email = 'the_email@gmail.com'. For bulk imports, deduplicate the source: INSERT INTO customers SELECT DISTINCT ON (email) * FROM customers_staging ORDER BY email, registered_at DESC — this keeps only the most recent record per email. For application code, use INSERT ... ON CONFLICT DO NOTHING (PostgreSQL) or INSERT IGNORE (MySQL) when upsert behaviour is acceptable."
      />

      <Err
        msg="ERROR: column 'customer_id' of relation 'orders' contains null values — when adding NOT NULL constraint"
        cause="You are trying to add a NOT NULL constraint to an existing column that already has NULL values in some rows. The ALTER TABLE ... ALTER COLUMN ... SET NOT NULL command fails because the database validates the constraint against all existing data — and existing NULLs violate it."
        fix="Fix the existing NULL values before adding the constraint. First identify the rows: SELECT * FROM orders WHERE customer_id IS NULL. Then update them with valid values: UPDATE orders SET customer_id = 1 WHERE customer_id IS NULL (use the appropriate actual value). Once no NULLs exist: ALTER TABLE orders ALTER COLUMN customer_id SET NOT NULL. In production, this update + constraint addition should be done in a transaction: BEGIN; UPDATE ...; ALTER TABLE ...; COMMIT; — so the constraint is added only if the update succeeds."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design a CREATE TABLE statement for a 'product_reviews' table for FreshMart. Requirements: each review belongs to a customer and a product. Reviews have a rating (1-5, integer, required), a review_text (optional, up to 2000 characters), a title (required, up to 200 characters), a verified_purchase flag (boolean, defaults to false), and a created_at timestamp (defaults to now). One customer can only review each product once. The table should cascade-delete reviews if the product is deleted, but restrict deletion of customers who have reviews."
        hint="You need FKs to customers and products with different ON DELETE behaviours. The one-review-per-customer-per-product rule requires a UNIQUE constraint on (customer_id, product_id). Rating needs a CHECK between 1 and 5."
        answer={`CREATE TABLE product_reviews (
  review_id          INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id        INTEGER        NOT NULL
                     REFERENCES customers(customer_id) ON DELETE RESTRICT,
  product_id         INTEGER        NOT NULL
                     REFERENCES products(product_id)  ON DELETE CASCADE,
  rating             INTEGER        NOT NULL
                     CHECK (rating BETWEEN 1 AND 5),
  title              VARCHAR(200)   NOT NULL,
  review_text        VARCHAR(2000),
  verified_purchase  BOOLEAN        NOT NULL DEFAULT false,
  created_at         TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, product_id)
);`}
        explanation="Every decision maps to a requirement. GENERATED ALWAYS AS IDENTITY for the PK — auto-increment, no manual ID management. REFERENCES customers ON DELETE RESTRICT — a customer who has written reviews cannot be deleted (reviews are their expression and may be valuable). REFERENCES products ON DELETE CASCADE — if a product is removed from the catalogue, its reviews have no context and should be cleaned up automatically. CHECK (rating BETWEEN 1 AND 5) — enforces the valid range at the database level. review_text is VARCHAR(2000) without NOT NULL — it is optional per requirements. UNIQUE (customer_id, product_id) — one review per customer per product, as a composite unique constraint at the table level."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'CREATE TABLE defines a table\'s structure: column names, data types, constraints, and defaults. Decisions made here shape everything built on top — get them right before the first INSERT.',
          'NOT NULL should be on every column that must always have a value. The default in SQL is nullable — explicitly add NOT NULL rather than leaving columns accidentally nullable.',
          'PRIMARY KEY = NOT NULL + UNIQUE + the designated row identifier. Every table should have exactly one primary key. Use GENERATED ALWAYS AS IDENTITY (PostgreSQL) or AUTO_INCREMENT (MySQL) for auto-incrementing PKs.',
          'FOREIGN KEY enforces referential integrity — referenced values must exist in the parent table. ON DELETE CASCADE for child data that is meaningless without the parent. ON DELETE RESTRICT for child data with independent meaning.',
          'UNIQUE ensures no duplicate values (allows multiple NULLs). Use it for columns like email, phone, and any business identifier that must be distinct across all rows.',
          'CHECK constraints enforce business rules at the database level — valid status values, non-negative prices, valid rating ranges, cross-column logical constraints. They cannot be bypassed by application code.',
          'DEFAULT values reduce boilerplate in INSERTs and guarantee sensible starting values. Use CURRENT_DATE and NOW() for timestamp defaults.',
          'Create tables in dependency order: tables with no FKs first, tables with FKs after the tables they reference. Breaking this order causes "relation does not exist" errors.',
          'CREATE TABLE AS SELECT creates a table from a query result — useful for summary tables and snapshots. CTAS tables have no constraints — add them manually afterward.',
          'Store "effective" values at transaction time (price at order, fee at appointment) rather than just a FK reference. Referenced values can change; the historical transaction must reflect what was true at that moment.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 20</strong>, you learn INSERT INTO — adding rows to tables, inserting multiple rows at once, inserting from SELECT queries, and handling conflicts with upsert patterns.
        </p>
        <Link href="/learn/sql/insert-into" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 20 → INSERT INTO
        </Link>
      </div>

    </LearnLayout>
  );
}