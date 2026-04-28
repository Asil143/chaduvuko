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

const ConstraintCard = ({ name, color, purpose, syntax, enforces, allows }: {
  name: string; color: string; purpose: string;
  syntax: string; enforces: string; allows: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{name}</span>
      <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{purpose}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Syntax example</p>
        <p style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color, margin: 0, lineHeight: 1.6 }}>{syntax}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#00e676', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Enforces</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{enforces}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Allows</p>
        <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{allows}</p>
      </div>
    </div>
  </div>
);

export default function Constraints() {
  return (
    <LearnLayout
      title="Constraints"
      description="NOT NULL, UNIQUE, CHECK, PRIMARY KEY, FOREIGN KEY — what each constraint does, when to use it, and how to add or drop them on existing tables with ALTER TABLE"
      section="SQL — Module 23"
      readTime="16–22 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Constraints Are and Why They Matter" />

      <P>A constraint is a rule enforced by the database on a column or table. Every time a row is inserted or updated, the database checks all applicable constraints and rejects the operation if any constraint is violated. This enforcement happens at the database level — below the application, below the API, below any code that might have bugs or be bypassed.</P>

      <P>The value of database-level constraints is absolute enforcement. Application code can be bypassed — a developer connects directly to the database with a SQL client, a bulk import script skips validation, a new microservice forgets to replicate the validation logic. A database constraint cannot be bypassed by any of these. If a column has NOT NULL, no row can ever have NULL in it — regardless of how the data was inserted.</P>

      <P>Constraints are the last line of defence for data quality. Design them carefully — they are far cheaper to add at schema creation time than to add later when a table has millions of rows with inconsistent data.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Five Constraint Types" />

      <ConstraintCard
        name="NOT NULL"
        color="#06b6d4"
        purpose="— column must always have a value"
        syntax="email VARCHAR(255) NOT NULL"
        enforces="Every row must have a non-NULL value in this column"
        allows="Any non-NULL value — does not restrict what the value is"
      />
      <ConstraintCard
        name="UNIQUE"
        color="#10b981"
        purpose="— no two rows can share the same value"
        syntax="email VARCHAR(255) UNIQUE"
        enforces="No duplicate values across all rows — one email per customer"
        allows="Multiple NULL values (NULL ≠ NULL in SQL)"
      />
      <ConstraintCard
        name="PRIMARY KEY"
        color="#f97316"
        purpose="— the row's unique identifier"
        syntax="customer_id INTEGER PRIMARY KEY"
        enforces="NOT NULL + UNIQUE on the designated identifier column(s)"
        allows="One per table only — the main row identifier"
      />
      <ConstraintCard
        name="FOREIGN KEY"
        color="#8b5cf6"
        purpose="— value must exist in the referenced table"
        syntax="REFERENCES customers(customer_id)"
        enforces="Referenced value must exist as a PK in the parent table"
        allows="NULL (unless column is also NOT NULL)"
      />
      <ConstraintCard
        name="CHECK"
        color="#f59e0b"
        purpose="— value must satisfy a boolean condition"
        syntax="CHECK (unit_price >= 0)"
        enforces="Every row must satisfy the specified condition"
        allows="Any value where the condition evaluates to TRUE or NULL"
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="NOT NULL — Preventing Missing Data" />

      <P>NOT NULL is the most fundamental constraint. It guarantees that a column always contains a value — the database will reject any INSERT or UPDATE that would leave the column empty. Without NOT NULL, every column is nullable by default and any column can silently receive NULL.</P>

      <H>Column-level NOT NULL</H>

      <CodeBlock
        label="NOT NULL declaration"
        code={`-- Column-level (inline):
CREATE TABLE customers (
  customer_id  INTEGER       NOT NULL,
  first_name   VARCHAR(100)  NOT NULL,
  last_name    VARCHAR(100)  NOT NULL,
  email        VARCHAR(255)  NOT NULL,
  phone        VARCHAR(20),         -- nullable: optional field
  joined_date  DATE          NOT NULL DEFAULT CURRENT_DATE
);

-- NULL values are appropriate for:
-- Optional fields not collected at registration (phone, middle name)
-- Fields not yet known (delivery_date before delivery)
-- Optional associations (manager_id for top-level employees)`}
      />

      <H>Adding NOT NULL to an existing column</H>

      <CodeBlock
        label="ALTER TABLE — add NOT NULL"
        code={`-- Step 1: fill in any existing NULLs first
UPDATE customers SET phone = 'Unknown' WHERE phone IS NULL;

-- Step 2: add the constraint
ALTER TABLE customers ALTER COLUMN phone SET NOT NULL;

-- If existing NULLs remain when you try to add NOT NULL:
-- ERROR: column "phone" of relation "customers" contains null values
-- Fix the data first, then add the constraint`}
      />

      <SQLPlayground
        initialQuery={`-- Check which FreshCart columns are nullable
SELECT
  column_name,
  is_nullable,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position;`}
        height={160}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="UNIQUE — Preventing Duplicate Values" />

      <P>UNIQUE ensures no two rows share the same value in the specified column or combination of columns. The database creates an index to efficiently enforce this constraint. Unlike PRIMARY KEY, UNIQUE allows NULL — multiple rows can have NULL in a UNIQUE column because NULL ≠ NULL in SQL's three-valued logic.</P>

      <H>Single-column UNIQUE</H>

      <CodeBlock
        label="UNIQUE constraint — single column"
        code={`-- Inline:
email VARCHAR(255) NOT NULL UNIQUE

-- Table-level (allows naming the constraint):
CONSTRAINT uq_customers_email UNIQUE (email)

-- What UNIQUE prevents:
-- Two customers with email 'aisha@gmail.com' → ERROR
-- Two products with same product_name + brand → allowed (different columns)
-- Two rows with NULL email → ALLOWED (NULL ≠ NULL)`}
      />

      <H>Composite UNIQUE — unique combinations</H>

      <CodeBlock
        label="Composite UNIQUE — unique pairs"
        code={`-- One customer can review each product only once
CREATE TABLE product_reviews (
  review_id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  product_id  INTEGER NOT NULL REFERENCES products(product_id),
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  UNIQUE (customer_id, product_id)  -- the PAIR must be unique
);

-- This INSERT succeeds: customer 1, product 5 (new pair)
INSERT INTO product_reviews (customer_id, product_id, rating)
VALUES (1, 5, 4);

-- This INSERT fails: customer 1, product 5 already exists
INSERT INTO product_reviews (customer_id, product_id, rating)
VALUES (1, 5, 3);
-- ERROR: duplicate key value violates unique constraint`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate UNIQUE enforcement
-- Insert a customer with a new email — succeeds
INSERT INTO customers (first_name, last_name, email, city, joined_date)
VALUES ('Test', 'User', 'unique.test@gmail.com', 'Boston', '2024-04-10');

-- Try to insert another with the same email — fails
INSERT INTO customers (first_name, last_name, email, city, joined_date)
VALUES ('Another', 'User', 'unique.test@gmail.com', 'New York', '2024-04-10');`}
        height={145}
        showSchema={false}
      />

      <H>Adding UNIQUE to an existing column</H>

      <CodeBlock
        label="ALTER TABLE — add UNIQUE"
        code={`-- Add UNIQUE constraint to existing column
ALTER TABLE customers ADD CONSTRAINT uq_customers_email UNIQUE (email);

-- If duplicates already exist, this fails:
-- ERROR: could not create unique index "uq_customers_email"
-- DETAIL: Key (email)=(aisha@gmail.com) is duplicated

-- Fix duplicates first:
-- Find them:
SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1;
-- Remove the duplicates, then add the constraint`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="CHECK — Enforcing Business Rules at the Database Level" />

      <P>CHECK constraints embed business rules directly in the schema. The database evaluates the condition for every INSERT and UPDATE — if the condition returns FALSE, the operation is rejected. If it returns NULL (from a NULL column value), the row is allowed through — CHECK only rejects definitive FALSE results.</P>

      <H>Single-column CHECK</H>

      <CodeBlock
        label="CHECK constraint examples"
        code={`-- Numeric range validation
unit_price   DECIMAL(10,2) CHECK (unit_price >= 0)
quantity     INTEGER       CHECK (quantity > 0)
discount_pct DECIMAL(5,2)  CHECK (discount_pct BETWEEN 0 AND 100)
rating       INTEGER       CHECK (rating BETWEEN 1 AND 5)

-- Enumerated values (when ENUM type is not available)
loyalty_tier VARCHAR(20) CHECK (loyalty_tier IN ('Bronze','Silver','Gold','Platinum'))
order_status VARCHAR(20) CHECK (order_status IN ('Processing','Delivered','Cancelled','Returned'))
gender       VARCHAR(20) CHECK (gender IN ('Male','Female','Other','Prefer not to say'))

-- String format validation
ssn_last4   CHAR(10)    CHECK (LENGTH(ssn_last4) = 10)
zip_code      VARCHAR(10) CHECK (zip_code ~ '^[0-9]{6}$')  -- PostgreSQL regex`}
      />

      <H>Named CHECK constraints — better error messages</H>

      <CodeBlock
        label="Naming constraints for readable errors"
        code={`-- Unnamed constraint: "violates check constraint products_unit_price_check"
unit_price DECIMAL(10,2) CHECK (unit_price >= 0)

-- Named constraint: "violates check constraint chk_products_price_positive"
unit_price DECIMAL(10,2) CONSTRAINT chk_products_price_positive CHECK (unit_price >= 0)

-- Named constraints produce informative error messages
-- and are easier to drop/modify later:
ALTER TABLE products DROP CONSTRAINT chk_products_price_positive;`}
      />

      <H>Cross-column CHECK constraints</H>

      <CodeBlock
        label="Multi-column CHECK — rules spanning multiple columns"
        code={`CREATE TABLE orders (
  order_id       INTEGER        NOT NULL,
  order_date     DATE           NOT NULL,
  delivery_date  DATE,
  cost_price     DECIMAL(10,2)  NOT NULL,
  unit_price     DECIMAL(10,2)  NOT NULL,
  -- delivery must be on or after order date
  CONSTRAINT chk_delivery_after_order
    CHECK (delivery_date IS NULL OR delivery_date >= order_date),
  -- cost must not exceed selling price (no negative margin)
  CONSTRAINT chk_valid_margin
    CHECK (unit_price >= cost_price)
);`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate CHECK enforcement on FreshCart
-- Try to insert a product with a negative price (violates CHECK)
INSERT INTO products (product_name, category, brand, unit_price, cost_price, in_stock)
VALUES ('Test Product', 'Dairy', 'TestBrand', -50.00, 30.00, true);
-- Expected: ERROR — check constraint violation`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Try to insert a customer with an invalid loyalty_tier
INSERT INTO customers (first_name, last_name, email, city, joined_date, loyalty_tier)
VALUES ('Test', 'Customer', 'test.check@gmail.com', 'Delhi', '2024-04-10', 'Diamond');
-- Expected: ERROR — 'Diamond' is not in the allowed values`}
        height={120}
        showSchema={false}
      />

      <Callout type="info">
        CHECK constraints only reject FALSE results — they allow NULL through. This means CHECK (rating BETWEEN 1 AND 5) allows NULL rating values. If you want to prevent both invalid values AND NULL, combine CHECK with NOT NULL: rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5).
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="PRIMARY KEY — The Row's Identity" />

      <P>A primary key uniquely identifies every row in a table. It combines NOT NULL and UNIQUE automatically. Every table should have exactly one primary key. The database creates an index on the PK automatically — PK lookups are always the fastest possible query.</P>

      <H>Auto-incrementing primary keys</H>

      <CodeBlock
        label="Auto-increment PK across databases"
        code={`-- PostgreSQL — GENERATED ALWAYS AS IDENTITY (SQL standard)
customer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY

-- PostgreSQL — SERIAL (older shorthand, still widely used)
customer_id SERIAL PRIMARY KEY

-- MySQL — AUTO_INCREMENT
customer_id INTEGER PRIMARY KEY AUTO_INCREMENT

-- DuckDB — SEQUENCE or auto-generated
CREATE SEQUENCE customer_id_seq START 1;
customer_id INTEGER PRIMARY KEY DEFAULT nextval('customer_id_seq')`}
      />

      <H>Composite primary keys</H>

      <CodeBlock
        label="Composite PK — multiple columns form the identifier"
        code={`-- When no single column uniquely identifies a row
CREATE TABLE order_items (
  order_id    INTEGER       NOT NULL REFERENCES orders(order_id),
  product_id  INTEGER       NOT NULL REFERENCES products(product_id),
  quantity    INTEGER       NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (order_id, product_id)
  -- The COMBINATION of order_id + product_id is unique
  -- One product per order line — no duplicates
);

-- Composite PKs are table-level constraints — cannot be inline`}
      />

      <SQLPlayground
        initialQuery={`-- See primary keys across FreshCart tables
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name IN ('customers','orders','products','stores','order_items')
  AND column_name IN ('customer_id','order_id','product_id','store_id','item_id')
ORDER BY table_name, ordinal_position;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="FOREIGN KEY — Enforcing Relationships" />

      <P>Foreign key constraints ensure that every value in the FK column exists as a PK value in the referenced (parent) table. This enforces referential integrity — no orphaned child rows, no references to non-existent parents.</P>

      <H>FK behaviour options — what happens on parent delete/update</H>

      <CodeBlock
        label="ON DELETE and ON UPDATE options"
        code={`-- RESTRICT (default): prevent deletion if child rows exist
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
-- Trying to delete a customer with orders: ERROR

-- CASCADE: delete child rows when parent is deleted
FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
-- Deleting an order also deletes its order_items

-- SET NULL: set FK column to NULL when parent is deleted
FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
-- Deleting a manager: employees' manager_id becomes NULL

-- SET DEFAULT: set FK column to its default value
FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET DEFAULT
-- Deleting a category: products get the default category

-- ON UPDATE CASCADE: update child FK when parent PK is updated
FOREIGN KEY (store_id) REFERENCES stores(store_id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE
-- If store_id 'ST001' changes to 'ST011', all orders update automatically`}
      />

      <H>Deferrable constraints — PostgreSQL</H>

      <CodeBlock
        label="Deferrable FK constraints"
        code={`-- By default, FK constraints are checked immediately on each statement
-- DEFERRABLE INITIALLY DEFERRED checks at transaction COMMIT instead
-- Useful for circular references or complex multi-step operations

CREATE TABLE employees (
  employee_id  INTEGER PRIMARY KEY,
  manager_id   INTEGER,
  CONSTRAINT fk_manager FOREIGN KEY (manager_id)
    REFERENCES employees(employee_id)
    DEFERRABLE INITIALLY DEFERRED
);
-- Now you can insert an employee before their manager:
BEGIN;
INSERT INTO employees VALUES (1, 2);  -- manager 2 doesn't exist yet
INSERT INTO employees VALUES (2, 1);  -- now manager 2 exists
COMMIT;  -- FK checked here — both rows now exist, no violation`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate FK enforcement
-- Try to insert an order for a non-existent customer
INSERT INTO orders (customer_id, store_id, order_date, order_status, payment_method, total_amount)
VALUES (9999, 'ST001', '2024-04-10', 'Processing', 'UPI', 500.00);
-- Expected: ERROR — customer_id 9999 does not exist in customers`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Try to use a non-existent store
INSERT INTO orders (customer_id, store_id, order_date, order_status, payment_method, total_amount)
VALUES (1, 'ST999', '2024-04-10', 'Processing', 'UPI', 500.00);
-- Expected: ERROR — store_id 'ST999' does not exist in stores`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="ALTER TABLE — Adding and Dropping Constraints" />

      <P>Constraints are not permanent — you can add them to existing tables, drop them when they are no longer needed, or modify them by dropping and re-adding. ALTER TABLE is the command for all schema modifications after initial table creation.</P>

      <H>Adding constraints to existing tables</H>

      <CodeBlock
        label="ALTER TABLE ADD CONSTRAINT"
        code={`-- Add NOT NULL (PostgreSQL)
ALTER TABLE customers ALTER COLUMN phone SET NOT NULL;

-- Add UNIQUE
ALTER TABLE customers
ADD CONSTRAINT uq_customers_email UNIQUE (email);

-- Add CHECK
ALTER TABLE products
ADD CONSTRAINT chk_products_price_positive
CHECK (unit_price >= 0);

-- Add FOREIGN KEY
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ON DELETE RESTRICT;

-- Add PRIMARY KEY (if not set at creation)
ALTER TABLE customers
ADD PRIMARY KEY (customer_id);

-- Add composite UNIQUE
ALTER TABLE product_reviews
ADD CONSTRAINT uq_one_review_per_product
UNIQUE (customer_id, product_id);`}
      />

      <H>Dropping constraints</H>

      <CodeBlock
        label="ALTER TABLE DROP CONSTRAINT"
        code={`-- Drop a named constraint (works for UNIQUE, CHECK, FK, PK)
ALTER TABLE customers DROP CONSTRAINT uq_customers_email;
ALTER TABLE products DROP CONSTRAINT chk_products_price_positive;
ALTER TABLE orders DROP CONSTRAINT fk_orders_customer;

-- Drop NOT NULL (PostgreSQL)
ALTER TABLE customers ALTER COLUMN phone DROP NOT NULL;

-- Drop PRIMARY KEY
ALTER TABLE customers DROP CONSTRAINT customers_pkey;
-- Or: ALTER TABLE customers DROP PRIMARY KEY;  (MySQL)

-- Find constraint names before dropping:
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'customers';`}
      />

      <H>Temporarily disabling constraints — MySQL only</H>

      <CodeBlock
        label="Disable FK checks for bulk operations (MySQL)"
        code={`-- MySQL: disable FK checks for bulk import
SET FOREIGN_KEY_CHECKS = 0;

-- Run your bulk INSERT or LOAD DATA here

SET FOREIGN_KEY_CHECKS = 1;

-- WARNING: only do this in controlled situations
-- You are responsible for data integrity while FKs are disabled
-- Never disable FK checks in production with live application traffic`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Constraint Naming Conventions" />

      <P>Named constraints produce clearer error messages and are easier to manage. When a constraint has no name, the database auto-generates one (like products_unit_price_check) — informative but not always clear. Named constraints tell you exactly which business rule was violated.</P>

      <CodeBlock
        label="Naming conventions used in production"
        code={`-- Convention: prefix_tablename_columnname_purpose
-- Prefixes:
--   pk_  = primary key
--   uq_  = unique
--   fk_  = foreign key
--   chk_ = check
--   nn_  = not null (rarely named)

-- Examples:
CONSTRAINT pk_customers              PRIMARY KEY (customer_id)
CONSTRAINT uq_customers_email        UNIQUE (email)
CONSTRAINT fk_orders_customer_id     FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
CONSTRAINT fk_orders_store_id        FOREIGN KEY (store_id)    REFERENCES stores(store_id)
CONSTRAINT chk_products_price_pos    CHECK (unit_price >= 0)
CONSTRAINT chk_orders_status         CHECK (order_status IN ('Processing','Delivered','Cancelled','Returned'))
CONSTRAINT chk_delivery_after_order  CHECK (delivery_date IS NULL OR delivery_date >= order_date)

-- Error message with named constraint:
-- ERROR: new row for relation "products" violates check constraint "chk_products_price_pos"
-- vs unnamed:
-- ERROR: new row for relation "products" violates check constraint "products_unit_price_check"`}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Constraints in Practice — FreshCart Complete Schema" />

      <P>Here is the FreshCart schema with every constraint fully named and annotated. This is the production-quality standard for constraint design.</P>

      <SQLPlayground
        initialQuery={`-- Verify FreshCart's existing constraints using information_schema
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
WHERE tc.table_name IN ('customers','orders','products','order_items','stores','employees')
  AND tc.constraint_type IN ('PRIMARY KEY','UNIQUE','FOREIGN KEY')
ORDER BY tc.table_name, tc.constraint_type, kcu.column_name;`}
        height={200}
        showSchema={true}
      />

      <CodeBlock
        label="Production-quality FreshCart schema — all constraints named"
        code={`CREATE TABLE customers (
  customer_id  INTEGER        NOT NULL,
  first_name   VARCHAR(100)   NOT NULL,
  last_name    VARCHAR(100)   NOT NULL,
  email        VARCHAR(255)   NOT NULL,
  phone        VARCHAR(20),
  city         VARCHAR(100),
  state        VARCHAR(100),
  zip_code      VARCHAR(10),
  joined_date  DATE           NOT NULL DEFAULT CURRENT_DATE,
  loyalty_tier VARCHAR(20)    NOT NULL DEFAULT 'Bronze',

  CONSTRAINT pk_customers          PRIMARY KEY (customer_id),
  CONSTRAINT uq_customers_email    UNIQUE      (email),
  CONSTRAINT chk_customers_tier    CHECK       (loyalty_tier IN ('Bronze','Silver','Gold','Platinum'))
);

CREATE TABLE orders (
  order_id        INTEGER        NOT NULL,
  customer_id     INTEGER        NOT NULL,
  store_id        VARCHAR(10)    NOT NULL,
  order_date      DATE           NOT NULL DEFAULT CURRENT_DATE,
  delivery_date   DATE,
  order_status    VARCHAR(20)    NOT NULL DEFAULT 'Processing',
  payment_method  VARCHAR(20)    NOT NULL,
  total_amount    DECIMAL(10,2)  NOT NULL,

  CONSTRAINT pk_orders              PRIMARY KEY (order_id),
  CONSTRAINT fk_orders_customer     FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id) ON DELETE RESTRICT,
  CONSTRAINT fk_orders_store        FOREIGN KEY (store_id)
    REFERENCES stores(store_id)       ON DELETE RESTRICT,
  CONSTRAINT chk_orders_status      CHECK (order_status IN
    ('Delivered','Processing','Cancelled','Returned')),
  CONSTRAINT chk_orders_payment     CHECK (payment_method IN
    ('UPI','Card','COD','NetBanking')),
  CONSTRAINT chk_orders_amount      CHECK (total_amount >= 0),
  CONSTRAINT chk_delivery_after_order CHECK
    (delivery_date IS NULL OR delivery_date >= order_date)
);`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are reviewing a pull request at a Seattle fintech startup. A junior engineer has written a migration that adds a new payments table. You are doing the schema review before it goes to production.</P>

      <TimeBlock time="10:00 AM" label="Schema arrives for review">
        The migration creates a payments table for tracking UPI and card transactions.
      </TimeBlock>

      <CodeBlock
        label="Original schema — before review"
        code={`-- Junior engineer's original schema:
CREATE TABLE payments (
  payment_id   INTEGER,
  order_id     INTEGER,
  amount       FLOAT,
  method       VARCHAR(50),
  status       VARCHAR(50),
  paid_at      TIMESTAMP,
  gateway_ref  VARCHAR(200)
);`}
      />

      <TimeBlock time="10:15 AM" label="You identify seven issues">
        No primary key, no NOT NULL on required fields, FLOAT for money (should be DECIMAL), no FK to orders, no CHECK for valid methods and statuses, no UNIQUE on gateway_ref (payment gateway reference IDs must be unique), and no DEFAULT for paid_at.
      </TimeBlock>

      <CodeBlock
        label="Corrected schema — after review"
        code={`-- Corrected schema with all constraints:
CREATE TABLE payments (
  payment_id   INTEGER        NOT NULL,
  order_id     INTEGER        NOT NULL,
  -- DECIMAL not FLOAT: money must be exact
  amount       DECIMAL(12, 2) NOT NULL
               CONSTRAINT chk_payments_amount_positive CHECK (amount > 0),
  method       VARCHAR(20)    NOT NULL
               CONSTRAINT chk_payments_method CHECK
                 (method IN ('UPI','Card','NetBanking','Wallet')),
  status       VARCHAR(20)    NOT NULL DEFAULT 'Pending'
               CONSTRAINT chk_payments_status CHECK
                 (status IN ('Pending','Success','Failed','Refunded')),
  paid_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  -- UNIQUE: each payment gateway transaction ID is globally unique
  -- gateway_ref is nullable (not yet assigned for Pending payments)
  gateway_ref  VARCHAR(200)   UNIQUE,

  CONSTRAINT pk_payments           PRIMARY KEY (payment_id),
  CONSTRAINT fk_payments_order     FOREIGN KEY (order_id)
    REFERENCES orders(order_id) ON DELETE RESTRICT
);`}
      />

      <TimeBlock time="10:40 AM" label="Review comment posted">
        You post a detailed review comment on the PR explaining each change: DECIMAL instead of FLOAT for money prevents rounding errors in reconciliation reports. NOT NULL on all required fields ensures the payment processor cannot create incomplete records. CHECK constraints for method and status prevent invalid states from being stored. UNIQUE on gateway_ref prevents duplicate payment processing — critical for preventing double-charges. The review is approved after the engineer incorporates all changes.
      </TimeBlock>

      <ProTip>
        Schema reviews are one of the highest-value activities in backend engineering. A poorly constrained schema that reaches production with millions of rows is extremely expensive to fix — you cannot add NOT NULL to a column that has NULLs without first fixing all the NULL values, which may require data archaeology. Adding CHECK constraints to a column with existing invalid values requires cleaning the data first. Getting constraints right in the initial schema costs 20 minutes of review and saves weeks of data quality work later.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between PRIMARY KEY and UNIQUE constraints?">
        <p style={{ margin: '0 0 14px' }}>Both PRIMARY KEY and UNIQUE prevent duplicate values in the specified column(s), but they differ in three important ways. First, NULL handling: PRIMARY KEY implicitly adds NOT NULL — no row can have NULL in a PK column. UNIQUE allows NULL, and multiple rows can have NULL in a UNIQUE column because NULL ≠ NULL in SQL's three-valued logic. Second, cardinality: a table can have only one PRIMARY KEY but can have multiple UNIQUE constraints on different columns or combinations. Third, purpose: PRIMARY KEY designates the row's canonical identifier — the column that other tables reference as a foreign key target. UNIQUE enforces uniqueness on other columns that must be unique but are not the primary identifier (email, phone, external reference codes).</p>
        <p style={{ margin: '0 0 14px' }}>Both create an index automatically — queries that filter on PK or UNIQUE columns are always fast because the index makes lookups efficient.</p>
        <p style={{ margin: 0 }}>A practical example from FreshCart: customers.customer_id is the PRIMARY KEY — it is the row identifier that orders.customer_id references as a foreign key. customers.email is UNIQUE — no two customers can share an email, but email is not the primary identifier (customers can change emails, emails are not always present, and the system uses customer_id internally). The guideline: every table gets one PRIMARY KEY for the immutable row identifier, and UNIQUE constraints on any other columns that must have distinct values.</p>
      </IQ>

      <IQ q="What does a CHECK constraint enforce and what are its limitations?">
        <p style={{ margin: '0 0 14px' }}>A CHECK constraint defines a boolean condition that every row must satisfy when inserted or updated. If the condition evaluates to FALSE, the operation is rejected immediately with an error. CHECK constraints encode business rules at the database level — rules that are independent of application logic and cannot be bypassed by any data entry method.</p>
        <p style={{ margin: '0 0 14px' }}>CHECK constraints can enforce: numeric ranges (unit_price {'>'}= 0, quantity {'>'} = 0), enumerated valid values (status IN ('Active','Inactive')), string format requirements (LENGTH(ssn_last4) = 10), cross-column logical relationships (delivery_date IS NULL OR delivery_date {'>'}= order_date), and any condition expressible as a boolean SQL expression.</p>
        <p style={{ margin: 0 }}>The key limitation: CHECK constraints can only reference columns within the same row of the same table. They cannot reference other tables (that is what FOREIGN KEY is for), cannot reference other rows in the same table, and cannot call non-deterministic functions in most databases. The NULL behaviour is also important: CHECK only rejects FALSE results — if the condition evaluates to NULL (because the column being checked is NULL), the row is allowed through. To prevent both invalid values AND NULL, combine CHECK with NOT NULL. Finally, in MySQL before version 8.0.16, CHECK constraints were parsed but silently ignored — they had no effect. Always verify that your database version actually enforces CHECK constraints.</p>
      </IQ>

      <IQ q="How do you add a constraint to a table that already has data in it?">
        <p style={{ margin: '0 0 14px' }}>Adding a constraint to an existing table with data requires that the existing data satisfies the new constraint — the database validates the constraint against all existing rows when it is added. If any existing row violates the new constraint, the ALTER TABLE statement fails.</p>
        <p style={{ margin: '0 0 14px' }}>The workflow: first identify and fix any rows that would violate the new constraint, then add the constraint. For NOT NULL: SELECT * FROM table WHERE column IS NULL — find the NULLs, UPDATE them to valid values, then ALTER TABLE ... ALTER COLUMN ... SET NOT NULL. For UNIQUE: SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) {'>'} 1 — find duplicates, decide which to keep and delete the rest, then ALTER TABLE ... ADD CONSTRAINT ... UNIQUE. For CHECK: SELECT * FROM table WHERE NOT (the check condition) — find violations, UPDATE to valid values, then add the constraint. For FOREIGN KEY: SELECT * FROM child WHERE fk_column NOT IN (SELECT pk FROM parent) — find orphans, fix or delete them, then add the FK.</p>
        <p style={{ margin: 0 }}>On large production tables, adding a constraint can be expensive because the database must scan all rows to validate. In PostgreSQL, you can use NOT VALID to add the constraint without checking existing rows: ALTER TABLE orders ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers NOT VALID. Then validate it during a maintenance window: ALTER TABLE orders VALIDATE CONSTRAINT fk_customer — this validates existing rows without taking a full table lock. This two-step approach minimises downtime on large tables.</p>
      </IQ>

      <IQ q="What is referential integrity and how do FOREIGN KEY constraints enforce it?">
        <p style={{ margin: '0 0 14px' }}>Referential integrity is the guarantee that relationships between tables are consistent — every foreign key value in a child table exists as a primary key value in the referenced parent table. Without referential integrity, you can have orphaned records: order_items that reference orders which have been deleted, or employees whose store_id references a store that no longer exists. Orphaned records cause queries to silently miss data, calculations to be wrong, and joins to produce incomplete results.</p>
        <p style={{ margin: '0 0 14px' }}>Foreign key constraints enforce referential integrity in two directions. On INSERT or UPDATE of the child table: the database checks that the FK value exists in the parent table. Attempting to insert an order with customer_id = 9999 when no customer with that ID exists causes an immediate error. On DELETE or UPDATE of the parent table: the database checks for existing FK references. What happens next depends on the ON DELETE option: RESTRICT (default) prevents the deletion if any child rows reference it, CASCADE automatically deletes child rows, SET NULL nullifies the FK in child rows, SET DEFAULT sets the FK to its default value.</p>
        <p style={{ margin: 0 }}>The value of database-level FK enforcement over application-level validation is that it is absolute. Application validation can be bypassed: a developer runs a direct SQL statement, a bulk import script skips the application layer, a new service is written without the validation logic, or a race condition in concurrent inserts allows an inconsistent state. A FK constraint enforced by the database cannot be bypassed by any of these. At Indian fintech companies where data integrity is a regulatory requirement (SEBI, RBI compliance), FK constraints on financial tables are mandatory and are audited during compliance reviews.</p>
      </IQ>

      <IQ q="When should you name constraints and what naming convention do you recommend?">
        <p style={{ margin: '0 0 14px' }}>Always name constraints — at minimum for FOREIGN KEY, UNIQUE, and CHECK constraints. When a constraint is unnamed, the database auto-generates a name (like products_unit_price_check or orders_customer_id_fkey) that is functional but not always informative. Named constraints produce clearer error messages: "violates check constraint chk_orders_status" immediately tells you which business rule was violated. "violates check constraint orders_order_status_check" requires you to look up the constraint to understand it.</p>
        <p style={{ margin: '0 0 14px' }}>Named constraints are also easier to manage: ALTER TABLE products DROP CONSTRAINT chk_products_price_positive is clear and self-documenting. Dropping an auto-named constraint requires first looking up the auto-generated name, which varies between database versions and creation order. In team environments, consistent constraint names make schema diffs in migration files easier to read and review.</p>
        <p style={{ margin: 0 }}>The recommended naming convention uses a prefix that identifies the constraint type, the table name, and the column(s) or purpose: pk_tablename for primary keys, uq_tablename_column for unique constraints, fk_childtable_parenttable or fk_childtable_columnname for foreign keys, and chk_tablename_description for check constraints. Examples: pk_customers, uq_customers_email, fk_orders_customer_id, chk_orders_status, chk_delivery_after_order. The convention should be consistent across the entire schema so any developer can infer the constraint name from the table and column names without looking it up.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'email' of relation 'customers' contains null values — when adding NOT NULL"
        cause="You tried to add NOT NULL to a column that has existing NULL values. ALTER TABLE ... SET NOT NULL validates against all existing rows immediately — if any row has NULL in that column, the constraint cannot be added. The database cannot leave existing NULL rows in a NOT NULL column."
        fix="First identify and fix the NULL rows: SELECT customer_id, email FROM customers WHERE email IS NULL. Update them to valid values: UPDATE customers SET email = CONCAT('unknown_', customer_id, '@placeholder.com') WHERE email IS NULL. Once no NULLs remain, add the constraint: ALTER TABLE customers ALTER COLUMN email SET NOT NULL. In production, decide whether the NULL values represent actual missing data (fix with real values) or rows that should be deleted (clean up first)."
      />

      <Err
        msg="ERROR: could not create unique index — Key (email) is duplicated"
        cause="You tried to add a UNIQUE constraint on a column that already has duplicate values. The database cannot enforce uniqueness on data that is already not unique. This commonly happens during schema cleanup when adding constraints to legacy tables that were built without them."
        fix="Find the duplicates first: SELECT email, COUNT(*), array_agg(customer_id) FROM customers GROUP BY email HAVING COUNT(*) > 1. For each duplicate set, decide which row to keep (usually the oldest by customer_id or the one with more complete data) and delete the rest. Once all duplicates are resolved: SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1 — this should return 0 rows. Then add the UNIQUE constraint: ALTER TABLE customers ADD CONSTRAINT uq_customers_email UNIQUE (email)."
      />

      <Err
        msg="ERROR: new row violates check constraint 'chk_orders_status' — value 'Shipped' is not valid"
        cause="An INSERT or UPDATE attempted to set a column to a value that does not satisfy the CHECK constraint. The value 'Shipped' is not in the allowed list defined in the CHECK. This is the constraint working correctly — it is preventing an invalid status value from entering the database. The error usually means application code is using a status value that was not included in the original constraint definition."
        fix="Two options: (1) If 'Shipped' is a legitimate new status, modify the constraint to include it: ALTER TABLE orders DROP CONSTRAINT chk_orders_status; ALTER TABLE orders ADD CONSTRAINT chk_orders_status CHECK (order_status IN ('Processing','Delivered','Cancelled','Returned','Shipped')). (2) If 'Shipped' is incorrect and the application code has a bug, fix the application code to use one of the existing valid statuses. Never silently disable a CHECK constraint to make application bugs disappear — fix the code or update the constraint deliberately."
      />

      <Err
        msg="ERROR: there is no unique constraint matching given keys for referenced table 'customers'"
        cause="You tried to create a FOREIGN KEY referencing a column in the parent table that does not have a PRIMARY KEY or UNIQUE constraint. FK references must target a PK or UNIQUE column — the database needs a uniqueness guarantee on the referenced column to enforce referential integrity. This happens when referencing a column that should be a PK but was not defined as one."
        fix="Add a PRIMARY KEY or UNIQUE constraint to the referenced column first: ALTER TABLE customers ADD PRIMARY KEY (customer_id). Or if customer_id already has a PK, verify you are referencing the correct column name — the FK must reference the exact column name of the PK or UNIQUE constraint. After adding the constraint to the parent, the FK creation will succeed."
      />

      <Err
        msg="In MySQL: CHECK constraint defined but has no effect — invalid values are inserted successfully"
        cause="MySQL versions before 8.0.16 parse CHECK constraints without enforcing them. The constraint is accepted in CREATE TABLE syntax but never actually checked. This means CHECK (unit_price >= 0) in MySQL 5.7 or MySQL 8.0 before 8.0.16 silently allows negative prices to be inserted without any error."
        fix="Upgrade to MySQL 8.0.16 or later where CHECK constraints are enforced. For older MySQL versions, implement the validation in application code or use triggers to simulate CHECK constraint behaviour. To check your MySQL version: SELECT VERSION(). To verify whether CHECK is enforced in your version: INSERT a row that violates the CHECK — if it succeeds without error, CHECK is not enforced and you need application-level validation. This is one reason many teams prefer PostgreSQL for applications requiring strict data integrity."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshCart is adding a promotions system. Design a CREATE TABLE statement for a 'promotions' table with these rules: each promotion has a unique code (e.g. 'DIWALI24'), a description, a discount percentage (must be between 1 and 90), a minimum order value (must be above 0, defaults to 0), a start_date and end_date (end must be after start), an is_active flag (defaults to true), and it belongs to a store (nullable — some promotions apply to all stores). Name all constraints. Then write ALTER TABLE statements to: (1) add a maximum usage count column (integer, must be above 0 if set), and (2) add a UNIQUE constraint on (store_id, promo_code) so the same code cannot be used twice in the same store."
        hint="Cross-column CHECK for end > start. Named constraints with chk_ prefix. ALTER TABLE ADD COLUMN then ADD CONSTRAINT."
        answer={`-- CREATE TABLE with all named constraints
CREATE TABLE promotions (
  promotion_id    INTEGER        NOT NULL,
  promo_code      VARCHAR(50)    NOT NULL,
  description     VARCHAR(500)   NOT NULL,
  discount_pct    DECIMAL(5, 2)  NOT NULL
                  CONSTRAINT chk_promotions_discount CHECK (discount_pct BETWEEN 1 AND 90),
  min_order_value DECIMAL(10, 2) NOT NULL DEFAULT 0
                  CONSTRAINT chk_promotions_min_order CHECK (min_order_value >= 0),
  start_date      DATE           NOT NULL,
  end_date        DATE           NOT NULL,
  is_active       BOOLEAN        NOT NULL DEFAULT true,
  store_id        VARCHAR(10)
                  CONSTRAINT fk_promotions_store
                  REFERENCES stores(store_id) ON DELETE SET NULL,

  CONSTRAINT pk_promotions         PRIMARY KEY (promotion_id),
  CONSTRAINT uq_promotions_code    UNIQUE (promo_code),
  CONSTRAINT chk_promotions_dates  CHECK (end_date > start_date)
);

-- ALTER TABLE: add max_usage_count column with CHECK
ALTER TABLE promotions
ADD COLUMN max_usage_count INTEGER
CONSTRAINT chk_promotions_max_usage CHECK (max_usage_count IS NULL OR max_usage_count > 0);

-- ALTER TABLE: add composite UNIQUE on (store_id, promo_code)
ALTER TABLE promotions
ADD CONSTRAINT uq_promotions_store_code UNIQUE (store_id, promo_code);`}
        explanation="Every constraint is named with the chk_, pk_, uq_, fk_ prefix convention. The cross-column CHECK (end_date > start_date) is a table-level constraint because it references two columns. The discount CHECK uses BETWEEN which is inclusive — 1% and 90% are both valid. The max_usage_count CHECK uses IS NULL OR max_usage_count > 0 — allowing NULL (unlimited usage) while requiring positive values when set. The composite UNIQUE (store_id, promo_code) allows the same promo_code in different stores (store_id differentiates them) but prevents the same code being used twice in the same store. Note that NULL store_id (all-store promotions) can appear multiple times in UNIQUE because NULL ≠ NULL — so multiple all-store promotions with different codes are fine."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Constraints enforce data quality at the database level — below application code, below APIs, below any bypass. They are the last and most reliable line of defence.',
          'Five constraint types: NOT NULL (column always has a value), UNIQUE (no duplicate non-null values), PRIMARY KEY (NOT NULL + UNIQUE + row identifier), FOREIGN KEY (value exists in parent table), CHECK (value satisfies a condition).',
          'NOT NULL should be on every column that must always have a value. The default in SQL is nullable — you must explicitly add NOT NULL. Design schemas with NOT NULL as the default intent.',
          'UNIQUE allows multiple NULLs — NULL ≠ NULL in SQL. PRIMARY KEY does not allow NULL at all. A table can have one PK and multiple UNIQUE constraints.',
          'CHECK constraints reject FALSE results but allow NULL through. Combine CHECK with NOT NULL to prevent both invalid values and empty values.',
          'Always name constraints: CONSTRAINT pk_customers PRIMARY KEY, CONSTRAINT chk_orders_status CHECK (...). Named constraints produce readable error messages and are easy to drop/modify later.',
          'Adding a constraint to an existing table validates against all current rows. Fix violations first — find them with SELECT, clean them with UPDATE or DELETE, then add the constraint.',
          'ALTER TABLE ADD CONSTRAINT adds constraints to existing tables. ALTER TABLE DROP CONSTRAINT removes them. In PostgreSQL, use NOT VALID + VALIDATE CONSTRAINT for large tables to minimise locking.',
          'CHECK constraints in MySQL before 8.0.16 are parsed but not enforced — they silently accept invalid values. Always verify CHECK enforcement in your specific database version.',
          'Referential integrity via FK constraints is non-negotiable for financial and compliance data at Indian regulated companies. Database-level FK enforcement cannot be bypassed by any application path.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 24</strong>, you learn ALTER TABLE in full depth — adding columns, changing types, renaming columns and tables, and managing schema changes safely in production without downtime.
        </p>
        <Link href="/learn/sql/alter-table" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 24 → ALTER TABLE
        </Link>
      </div>

    </LearnLayout>
  );
}