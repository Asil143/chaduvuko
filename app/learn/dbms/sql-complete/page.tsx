import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'SQL — Complete Guide | DBMS | Chaduvuko',
  description:
    'SQL from absolute zero to production-level advanced — DDL, DML, DCL, TCL, every JOIN type, subqueries, correlated queries, window functions, CTEs, recursive CTEs, aggregations, indexes in queries, query execution order, and every interview trap explained with real examples.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(22px, 2.8vw, 32px)',
    fontWeight: 900, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 20,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(17px, 2vw, 22px)',
    fontWeight: 800, letterSpacing: '-0.5px',
    color: 'var(--text)', marginBottom: 14,
    
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 16, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
    fontFamily: 'Syne, sans-serif',
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text2)',
    lineHeight: 1.95, marginBottom: 20,
    
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const SampleTable = ({
  title, headers, rows, note,
}: {
  title: string
  headers: string[]
  rows: (string | number)[][]
  note?: string
}) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{
      fontSize: 11, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 8, fontFamily: 'var(--font-mono)',
    }}>{title}</div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {headers.map((h) => (
              <th key={h} style={{
                textAlign: 'left', padding: '8px 14px',
                color: 'var(--accent)', fontWeight: 700,
                fontSize: 12, fontFamily: 'var(--font-mono)',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{
              borderBottom: '1px solid var(--border)',
              background: i % 2 === 0 ? 'transparent' : 'var(--bg2)',
            }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px',
                  color: j === 0 ? 'var(--accent)' : 'var(--text2)',
                  fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif',
                  fontSize: 13,
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && (
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6,  lineHeight: 1.6 }}>
        ↑ {note}
      </div>
    )}
  </div>
)

export default function SQLComplete() {
  return (
    <LearnLayout
      title="SQL — Complete Guide"
      description="From your very first SELECT to recursive CTEs and window functions — every SQL concept explained from first principles with production-realistic examples from real Indian tech companies."
      section="DBMS"
      readTime="120–150 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHAT SQL IS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Language" />
        <SectionTitle>What SQL Is — And What It Is Not</SectionTitle>

        <Para>
          SQL (Structured Query Language) is one of the most widely used languages in computing —
          and one of the most misunderstood. It is not a programming language. You cannot write
          a loop in SQL, you cannot declare variables the way you do in Python, and you cannot
          build a web server in SQL. SQL is a
          <strong style={{ color: 'var(--text)' }}> declarative query language</strong> —
          you describe <em>what data you want</em>, and the database engine decides
          <em> how to retrieve it</em>.
        </Para>

        <Para>
          This distinction between declarative and imperative thinking is the most important
          mindset shift when learning SQL. In Python, you write a loop and manually filter
          rows one by one. In SQL, you write a predicate and the database finds every row
          satisfying it — choosing the most efficient algorithm automatically. The database
          knows whether to use an index, whether to hash-join or nested-loop-join, whether
          to parallelise the scan — none of that is your concern. Your concern is the
          logical description of what you want.
        </Para>

        <Para>
          SQL was originally called SEQUEL (Structured English Query Language), developed
          at IBM in 1974 by Donald Chamberlin and Raymond Boyce, based on Codd's relational
          algebra. It became the ANSI standard in 1986 and ISO standard in 1987. Every major
          relational database — PostgreSQL, MySQL, Oracle, SQL Server — implements the SQL
          standard with their own extensions. The core syntax we cover here works on all of them.
        </Para>

        <SubTitle>SQL's Four Sublanguages — Every Command Has a Home</SubTitle>

        <Para>
          Every SQL statement belongs to one of four sublanguages. Knowing this taxonomy
          is not just academic — it organises how you think about database operations and
          is a standard interview question.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              type: 'DDL', full: 'Data Definition Language',
              color: '#0078d4',
              commands: 'CREATE, ALTER, DROP, TRUNCATE, RENAME',
              purpose: 'Defines and modifies the structure (schema) of the database. DDL changes are auto-committed in most databases — they cannot be rolled back.',
              example: 'CREATE TABLE customers (...)\nALTER TABLE orders ADD COLUMN...\nDROP TABLE temp_data',
            },
            {
              type: 'DML', full: 'Data Manipulation Language',
              color: 'var(--accent)',
              commands: 'SELECT, INSERT, UPDATE, DELETE, MERGE',
              purpose: 'Reads and modifies the actual data within tables. DML operations participate in transactions and can be rolled back.',
              example: 'SELECT * FROM orders\nINSERT INTO customers VALUES...\nUPDATE products SET price = 280',
            },
            {
              type: 'DCL', full: 'Data Control Language',
              color: '#f97316',
              commands: 'GRANT, REVOKE',
              purpose: 'Controls access permissions. Who can read which tables, who can write, who can execute stored procedures. Security layer of SQL.',
              example: 'GRANT SELECT ON orders TO analyst_role\nREVOKE DELETE ON customers FROM intern',
            },
            {
              type: 'TCL', full: 'Transaction Control Language',
              color: '#8b5cf6',
              commands: 'COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION',
              purpose: 'Manages transactions — groups of DML operations that must succeed or fail together. Implements the ACID properties discussed in Module 09.',
              example: 'BEGIN\n  UPDATE accounts SET balance...\n  UPDATE accounts SET balance...\nCOMMIT',
            },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 12, padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.type}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>{item.full}</span>
              </div>
              <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 5, padding: '4px 10px', marginBottom: 10 }}>{item.commands}</div>
              <Para>{item.purpose}</Para>
              <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 11, color: 'var(--text2)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', margin: 0 }}>{item.example}</pre>
            </div>
          ))}
        </div>

        <SubTitle>The Reference Schema — Used Throughout This Module</SubTitle>

        <Para>
          All examples in this module use a consistent schema representing a simplified
          food delivery platform. This makes it easy to follow along — you see the same
          tables evolve through every concept rather than learning a new schema for each section.
        </Para>

        <CodeBox label="Reference schema — create these tables to follow along">
{`-- CUSTOMERS table
CREATE TABLE customers (
    customer_id   SERIAL        PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    email         VARCHAR(150)  UNIQUE NOT NULL,
    city          VARCHAR(100)  NOT NULL,
    phone         VARCHAR(20),
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    is_active     BOOLEAN       DEFAULT true
);

-- RESTAURANTS table
CREATE TABLE restaurants (
    restaurant_id  SERIAL        PRIMARY KEY,
    name           VARCHAR(200)  NOT NULL,
    city           VARCHAR(100)  NOT NULL,
    cuisine_type   VARCHAR(100),
    avg_rating     DECIMAL(3,2)  DEFAULT 0,
    is_open        BOOLEAN       DEFAULT true
);

-- MENU_ITEMS table
CREATE TABLE menu_items (
    item_id        SERIAL         PRIMARY KEY,
    restaurant_id  INT            NOT NULL REFERENCES restaurants(restaurant_id),
    name           VARCHAR(200)   NOT NULL,
    category       VARCHAR(100),
    price          DECIMAL(10,2)  NOT NULL CHECK (price > 0),
    is_veg         BOOLEAN        DEFAULT false,
    is_available   BOOLEAN        DEFAULT true
);

-- ORDERS table
CREATE TABLE orders (
    order_id       SERIAL        PRIMARY KEY,
    customer_id    INT           NOT NULL REFERENCES customers(customer_id),
    restaurant_id  INT           NOT NULL REFERENCES restaurants(restaurant_id),
    order_date     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    status         VARCHAR(20)   DEFAULT 'pending'
                   CHECK (status IN ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled')),
    total_amount   DECIMAL(10,2),
    delivery_fee   DECIMAL(8,2)  DEFAULT 30,
    promo_code     VARCHAR(20)
);

-- ORDER_ITEMS table (junction — weak entity)
CREATE TABLE order_items (
    order_id   INT            NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
    item_id    INT            NOT NULL REFERENCES menu_items(item_id),
    quantity   INT            NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2)  NOT NULL,  -- snapshot at time of order
    PRIMARY KEY (order_id, item_id)
);

-- REVIEWS table
CREATE TABLE reviews (
    review_id      SERIAL        PRIMARY KEY,
    customer_id    INT           NOT NULL REFERENCES customers(customer_id),
    restaurant_id  INT           NOT NULL REFERENCES restaurants(restaurant_id),
    order_id       INT           UNIQUE REFERENCES orders(order_id),
    rating         INT           NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment        TEXT,
    created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);`}
        </CodeBox>

        <Para>
          Sample data mental model: 4 customers (Rahul, Priya, Arjun, Kavya), 3 restaurants
          (Biryani House, Dosa Corner, Pizza Stop), multiple menu items per restaurant,
          7 orders in various states, and a handful of reviews. All examples will work
          on this structure.
        </Para>
      </section>

      {/* ========================================
          PART 2 — DDL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — DDL" />
        <SectionTitle>DDL — Defining and Modifying Database Structure</SectionTitle>

        <SubTitle>CREATE TABLE — Every Option Explained</SubTitle>

        <CodeBox label="CREATE TABLE — comprehensive with every constraint type">
{`CREATE TABLE employees (
    -- COLUMN with AUTO-INCREMENT primary key (surrogate key)
    employee_id    SERIAL          PRIMARY KEY,
    -- SERIAL is PostgreSQL. MySQL uses AUTO_INCREMENT. SQL Server uses IDENTITY.

    -- SIMPLE NOT NULL column
    full_name      VARCHAR(100)    NOT NULL,

    -- UNIQUE constraint — alternate key
    email          VARCHAR(150)    NOT NULL UNIQUE,
    pan_number     CHAR(10)        UNIQUE,   -- nullable UNIQUE (partial participation)

    -- NUMERIC columns with precision
    salary         DECIMAL(12,2)   NOT NULL,
    -- DECIMAL(12,2) = up to 12 total digits, 2 after decimal point
    -- Use DECIMAL for money — never FLOAT (floating point rounding errors are real)

    -- ENUM-like constraint
    employment_type VARCHAR(20)    NOT NULL DEFAULT 'full_time'
                    CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),

    -- DATE and TIMESTAMP columns
    hire_date       DATE           NOT NULL DEFAULT CURRENT_DATE,
    last_login      TIMESTAMP,     -- nullable: NULL until first login

    -- BOOLEAN column
    is_active       BOOLEAN        NOT NULL DEFAULT true,

    -- FOREIGN KEY column
    dept_id         INT            NOT NULL,
    manager_id      INT,           -- nullable: CEO has no manager

    -- TABLE-LEVEL CONSTRAINTS (after all column definitions)
    CONSTRAINT fk_department
        FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id)
        REFERENCES employees(employee_id)   -- self-referential
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    -- COMPOSITE UNIQUE constraint
    CONSTRAINT uq_name_dept
        UNIQUE (full_name, dept_id),
        -- Same name allowed in different departments but not same dept

    -- CROSS-COLUMN CHECK constraint
    CONSTRAINT chk_salary_range
        CHECK (salary > 0 AND salary < 10000000)  -- max 1 crore
);`}
        </CodeBox>

        <SubTitle>ALTER TABLE — Modifying Existing Structure</SubTitle>

        <CodeBox label="ALTER TABLE — every operation you will need">
{`-- ADD a new column (non-destructive — safe on live production tables)
ALTER TABLE employees
    ADD COLUMN phone VARCHAR(20);

ALTER TABLE employees
    ADD COLUMN performance_score INT DEFAULT 0 CHECK (performance_score BETWEEN 0 AND 100);

-- ADD COLUMN with NOT NULL requires a DEFAULT (otherwise existing rows have no value)
ALTER TABLE employees
    ADD COLUMN region VARCHAR(50) NOT NULL DEFAULT 'South India';
-- PostgreSQL: this is a metadata-only operation for NOT NULL + DEFAULT — no table rewrite!
-- The DEFAULT is stored in catalog and applied to existing rows on access.

-- MODIFY / ALTER COLUMN TYPE
ALTER TABLE employees
    ALTER COLUMN phone TYPE VARCHAR(25);   -- PostgreSQL syntax

-- In MySQL: ALTER TABLE employees MODIFY COLUMN phone VARCHAR(25);

-- RENAME a column
ALTER TABLE employees
    RENAME COLUMN full_name TO employee_name;

-- ADD CONSTRAINT to existing table
ALTER TABLE employees
    ADD CONSTRAINT chk_phone_format
    CHECK (phone ~ '^\d{5}-\d{5}$');  -- regex check in PostgreSQL

-- DROP a constraint
ALTER TABLE employees
    DROP CONSTRAINT chk_phone_format;

-- ADD an index
CREATE INDEX idx_employees_dept ON employees(dept_id);
-- Not ALTER TABLE — indexes are created with CREATE INDEX

-- DROP a column (destructive — data is lost)
ALTER TABLE employees
    DROP COLUMN performance_score;

-- RENAME the table
ALTER TABLE employees
    RENAME TO staff;  -- PostgreSQL
-- MySQL: RENAME TABLE employees TO staff;`}
        </CodeBox>

        <SubTitle>DROP vs TRUNCATE vs DELETE — The Critical Differences</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginBottom: 20 }}>
          {[
            {
              cmd: 'DROP TABLE',
              color: '#ff4757',
              what: 'Removes the ENTIRE TABLE — structure AND all data. The table ceases to exist.',
              transaction: 'Auto-committed — cannot be rolled back in most databases.',
              when: 'When you want to permanently remove a table from the schema.',
              danger: 'HIGHEST — all data, indexes, and constraints are gone permanently.',
            },
            {
              cmd: 'TRUNCATE TABLE',
              color: '#f97316',
              what: 'Removes ALL ROWS from the table but keeps the table structure, indexes, and constraints. Much faster than DELETE for clearing large tables.',
              transaction: 'Auto-committed in most databases. Cannot be rolled back. Does NOT fire DELETE triggers.',
              when: 'Clearing a staging/temp table before reloading. Resetting test data.',
              danger: 'HIGH — all data is gone but table remains. Does not log individual row deletions.',
            },
            {
              cmd: 'DELETE',
              color: 'var(--accent)',
              what: 'Removes SPECIFIC ROWS matching a WHERE clause. Or all rows if no WHERE. Each deletion is logged individually.',
              transaction: 'Participates in transactions. CAN be rolled back. DOES fire DELETE triggers.',
              when: 'Removing specific records. When you need rollback capability. When DELETE triggers must fire.',
              danger: 'LOW — transactional. But DELETE without WHERE removes all rows (same effect as TRUNCATE but slower and logged).',
            },
          ].map((item) => (
            <div key={item.cmd} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '18px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 12 }}>{item.cmd}</div>
              {[
                ['What it does', item.what],
                ['Transactions', item.transaction],
                ['Use when', item.when],
                ['Danger level', item.danger],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)',  lineHeight: 1.65 }}>{value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 3 — DML — SELECT
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — SELECT" />
        <SectionTitle>SELECT — The Complete Query Language</SectionTitle>

        <SubTitle>The Logical Execution Order — The Most Important Thing to Memorise</SubTitle>

        <Para>
          SQL queries are written in a specific syntax order, but they are
          <strong style={{ color: 'var(--text)' }}> logically executed in a completely different order</strong>.
          This mismatch between write-order and execution-order is the source of most SQL
          confusion — "why can't I use a WHERE clause on a window function?" "why can't I
          reference a SELECT alias in WHERE?" The answer is always: execution order.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          {[
            { step: '1', clause: 'FROM', desc: 'Identify source tables. Perform CROSSJOINs if multiple tables. Build the working set.', note: 'Aliases defined here are available to all later steps.' },
            { step: '2', clause: 'JOIN ... ON', desc: 'Apply join conditions to filter the cross product. LEFT/RIGHT/FULL joins add back eliminated rows with NULLs.', note: 'Join conditions evaluated here, not in WHERE.' },
            { step: '3', clause: 'WHERE', desc: 'Filter individual rows from the joined result. Only rows where WHERE evaluates to TRUE are kept.', note: 'Cannot reference SELECT aliases (they don\'t exist yet). Cannot use aggregate functions.' },
            { step: '4', clause: 'GROUP BY', desc: 'Group remaining rows into buckets based on specified columns. One output row per unique group value.', note: 'After this step, only GROUP BY columns and aggregate functions are valid.' },
            { step: '5', clause: 'HAVING', desc: 'Filter groups (not rows) based on aggregate conditions. Applied AFTER grouping.', note: 'CAN reference aggregate functions. CAN reference GROUP BY columns.' },
            { step: '6', clause: 'SELECT', desc: 'Evaluate the SELECT list — compute column expressions, aliases, window functions. This is where output columns are defined.', note: 'Aliases defined here are NOT available to WHERE, HAVING, or GROUP BY.' },
            { step: '7', clause: 'DISTINCT', desc: 'If specified, remove duplicate rows from the SELECT result.', note: 'Applied after SELECT expressions are evaluated.' },
            { step: '8', clause: 'ORDER BY', desc: 'Sort the result set. Can reference SELECT aliases (this step runs after SELECT).', note: 'Only clause that CAN reference SELECT aliases.' },
            { step: '9', clause: 'LIMIT / OFFSET', desc: 'Restrict the number of rows returned and skip rows for pagination.', note: 'Applied last — only after everything else is computed.' },
          ].map((item, i) => (
            <div key={item.step} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 8 ? '1px solid var(--border)' : 'none',
              background: [5].includes(i) ? 'rgba(0,230,118,0.04)' : 'transparent',
            }}>
              <div style={{
                background: 'var(--bg2)', borderRight: '1px solid var(--border)',
                padding: '14px 16px', minWidth: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 900, color: i === 5 ? 'var(--accent)' : 'var(--muted)' }}>{item.step}</span>
              </div>
              <div style={{ padding: '14px 18px', flex: 1 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: i === 5 ? 'var(--accent)' : 'var(--text)' }}>{item.clause}</span>
                  <span style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>{item.desc}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)',  fontStyle: 'italic' }}>→ {item.note}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning">
          <strong>The #1 cause of SQL errors:</strong> Referencing a SELECT alias in WHERE.
          Example: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>SELECT total_amount * 1.18 AS total_with_gst FROM orders WHERE total_with_gst &gt; 500</code> —
          this FAILS because WHERE executes before SELECT, so total_with_gst doesn't exist yet.
          Fix: use a CTE or subquery, or repeat the expression in WHERE.
        </Callout>

        <SubTitle>SELECT — Building Queries From the Ground Up</SubTitle>

        <CodeBox label="SELECT — from simplest to progressively complex">
{`-- MOST BASIC: get all columns, all rows
SELECT * FROM customers;
-- ⚠ Avoid SELECT * in production code: column order changes with schema evolution,
-- fetches columns you don't need (wastes memory and network), hides intent

-- NAMED COLUMNS: always preferred
SELECT customer_id, name, city FROM customers;

-- ALIASES: rename columns in output
SELECT
    customer_id                    AS id,
    name                           AS customer_name,
    city                           AS location,
    CURRENT_TIMESTAMP - created_at AS account_age
FROM customers;

-- EXPRESSIONS in SELECT: compute values directly
SELECT
    name,
    salary,
    salary * 12                    AS annual_salary,
    salary * 12 * 0.10             AS estimated_tax,
    ROUND(salary / 1000.0, 1)      AS salary_in_thousands
FROM employees;

-- DISTINCT: remove duplicate values in output
SELECT DISTINCT city FROM customers;           -- unique cities
SELECT DISTINCT city, cuisine_type FROM restaurants;  -- unique city+cuisine combinations
-- Note: DISTINCT applies to the COMBINATION of all selected columns

-- CASE WHEN: conditional expressions in SELECT
SELECT
    name,
    total_amount,
    CASE
        WHEN total_amount < 200  THEN 'Small'
        WHEN total_amount < 500  THEN 'Medium'
        WHEN total_amount < 1000 THEN 'Large'
        ELSE 'Very Large'
    END AS order_size_category,
    CASE status
        WHEN 'delivered'  THEN '✓ Done'
        WHEN 'cancelled'  THEN '✗ Cancelled'
        ELSE '⏳ In Progress'
    END AS status_display
FROM orders;

-- COALESCE: return first non-NULL value
SELECT
    name,
    COALESCE(phone, 'No phone') AS phone_display,
    COALESCE(promo_code, 'None') AS promo
FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- NULLIF: return NULL if two expressions are equal
SELECT NULLIF(delivery_fee, 0) AS paid_delivery_fee
FROM orders;
-- Returns NULL if delivery_fee is 0, otherwise returns the fee
-- Useful to avoid division by zero: amount / NULLIF(qty, 0)`}
        </CodeBox>

        <SubTitle>WHERE — Every Operator and Condition Type</SubTitle>

        <CodeBox label="WHERE — complete operator reference">
{`-- COMPARISON OPERATORS
SELECT * FROM orders WHERE total_amount = 280;
SELECT * FROM orders WHERE total_amount != 280;   -- or <>
SELECT * FROM orders WHERE total_amount > 500;
SELECT * FROM orders WHERE total_amount >= 500;
SELECT * FROM orders WHERE total_amount < 100;
SELECT * FROM orders WHERE order_date >= '2024-01-01';

-- BETWEEN (inclusive on both ends)
SELECT * FROM orders WHERE total_amount BETWEEN 200 AND 500;
-- Equivalent to: total_amount >= 200 AND total_amount <= 500
-- Works on dates too:
SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';

-- IN: match against a list of values
SELECT * FROM customers WHERE city IN ('Bengaluru', 'Hyderabad', 'Mumbai');
SELECT * FROM orders WHERE status IN ('delivered', 'out_for_delivery');
-- NOT IN:
SELECT * FROM customers WHERE city NOT IN ('Delhi', 'Chennai');
-- ⚠ WARNING: NOT IN with NULL in the list returns ZERO rows!
-- If ANY value in the list is NULL: NOT IN fails for every row.
-- See the NULL trap section for details.

-- LIKE: pattern matching (case-sensitive in PostgreSQL, case-insensitive in MySQL)
SELECT * FROM customers WHERE name LIKE 'R%';      -- starts with R
SELECT * FROM customers WHERE name LIKE '%Sharma'; -- ends with Sharma
SELECT * FROM customers WHERE name LIKE '%Kumar%'; -- contains Kumar
SELECT * FROM customers WHERE phone LIKE '98___-_____'; -- specific pattern
-- % = zero or more any characters
-- _ = exactly one any character
-- ILIKE in PostgreSQL for case-insensitive LIKE

-- IS NULL / IS NOT NULL (NEVER use = NULL)
SELECT * FROM customers WHERE phone IS NULL;       -- no phone stored
SELECT * FROM orders   WHERE promo_code IS NOT NULL; -- has a promo

-- LOGICAL OPERATORS
SELECT * FROM orders
WHERE status = 'delivered'
  AND total_amount > 300
  AND order_date >= '2024-01-01';

SELECT * FROM menu_items
WHERE is_veg = true
   OR price < 100;

SELECT * FROM customers
WHERE NOT (city = 'Delhi' OR city = 'Chennai');
-- Equivalent to: WHERE city NOT IN ('Delhi', 'Chennai')

-- OPERATOR PRECEDENCE: NOT > AND > OR
-- Use parentheses to be explicit:
SELECT * FROM orders
WHERE (status = 'delivered' OR status = 'out_for_delivery')
  AND total_amount > 200;
-- Without parentheses, AND binds tighter than OR — could get wrong results`}
        </CodeBox>

        <SubTitle>ORDER BY, LIMIT, and OFFSET — Sorting and Pagination</SubTitle>

        <CodeBox label="ORDER BY with LIMIT/OFFSET — the pagination pattern">
{`-- ORDER BY: sort results (ASC = default, DESC = descending)
SELECT name, total_amount, order_date
FROM orders
ORDER BY total_amount DESC;   -- highest amount first

-- Multiple sort keys: secondary sort breaks ties
SELECT name, city, created_at
FROM customers
ORDER BY city ASC, created_at DESC;
-- Sort by city alphabetically, within same city sort by newest first

-- ORDER BY can use column positions (avoid — fragile):
ORDER BY 2 DESC;   -- 2nd column in SELECT list — BAD PRACTICE

-- LIMIT: return only first N rows
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;
-- Last 10 orders placed

-- LIMIT + OFFSET: pagination
-- Page 1 (rows 1-10):
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10 OFFSET 0;
-- Page 2 (rows 11-20):
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10 OFFSET 10;
-- Page N:
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10 OFFSET (page_number - 1) * 10;

-- ⚠ OFFSET PAGINATION PROBLEM at scale:
-- OFFSET 1000000 LIMIT 10 means the database reads and discards 1M rows!
-- For large datasets, use KEYSET PAGINATION instead:
-- Page 1:
SELECT * FROM orders ORDER BY order_id DESC LIMIT 10;
-- Page 2 (after seeing last order_id = 500):
SELECT * FROM orders WHERE order_id < 500 ORDER BY order_id DESC LIMIT 10;
-- Each page directly jumps to the right place using an index — O(log n) not O(n)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — AGGREGATIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Aggregations" />
        <SectionTitle>Aggregate Functions and GROUP BY — Computing Summaries</SectionTitle>

        <Para>
          Aggregate functions collapse multiple rows into a single value. They are the
          foundation of every report, dashboard, and analytics query. Every aggregation
          question in an interview — "find the top N customers", "find months with highest
          revenue", "find categories with more than X items" — requires mastering these.
        </Para>

        <SubTitle>The Five Core Aggregate Functions</SubTitle>

        <CodeBox label="Aggregate functions — every nuance">
{`-- COUNT — counts rows
SELECT COUNT(*)              FROM orders;    -- total rows (includes all rows, even NULLs)
SELECT COUNT(promo_code)     FROM orders;    -- rows where promo_code IS NOT NULL
SELECT COUNT(DISTINCT city)  FROM customers; -- unique city count (NULLs excluded)

-- Key distinction:
-- COUNT(*): counts ALL rows including those with NULL values in any column
-- COUNT(column): counts only rows where that column is NOT NULL
-- COUNT(DISTINCT column): counts unique non-NULL values

-- SUM, AVG, MIN, MAX
SELECT
    SUM(total_amount)           AS total_revenue,
    AVG(total_amount)           AS avg_order_value,
    MIN(total_amount)           AS smallest_order,
    MAX(total_amount)           AS largest_order,
    ROUND(AVG(total_amount), 2) AS avg_rounded
FROM orders
WHERE status = 'delivered';
-- All aggregate functions IGNORE NULL values (except COUNT(*))
-- AVG(salary) on {50000, NULL, 70000} = (50000+70000)/2 = 60000 — NOT /3

-- PERCENTILE functions (PostgreSQL)
SELECT
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_amount) AS median_order,
    PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY total_amount) AS p90_order
FROM orders;

-- ARRAY_AGG and STRING_AGG — aggregate into collections
SELECT
    restaurant_id,
    ARRAY_AGG(name ORDER BY price)          AS items_by_price,
    STRING_AGG(name, ', ' ORDER BY name)    AS item_list
FROM menu_items
GROUP BY restaurant_id;`}
        </CodeBox>

        <SubTitle>GROUP BY — Splitting Rows into Groups</SubTitle>

        <CodeBox label="GROUP BY — every pattern and common mistake">
{`-- BASIC GROUP BY: one row per group
SELECT
    city,
    COUNT(*) AS customer_count
FROM customers
GROUP BY city
ORDER BY customer_count DESC;

-- MULTIPLE GROUP BY columns: group by combination
SELECT
    city,
    is_active,
    COUNT(*) AS count
FROM customers
GROUP BY city, is_active
ORDER BY city, is_active;

-- AGGREGATE + GROUP BY with filter
SELECT
    r.name AS restaurant,
    COUNT(o.order_id) AS total_orders,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value,
    SUM(o.total_amount) AS total_revenue
FROM restaurants r
JOIN orders o ON r.restaurant_id = o.restaurant_id
WHERE o.status = 'delivered'            -- filter ROWS before grouping
GROUP BY r.restaurant_id, r.name
ORDER BY total_revenue DESC;

-- COMMON MISTAKE: selecting non-grouped, non-aggregated columns
-- THIS FAILS:
SELECT city, name, COUNT(*)   -- name is not in GROUP BY and not aggregated
FROM customers
GROUP BY city;
-- ERROR: column "customers.name" must appear in GROUP BY clause or be used in aggregate

-- CORRECT: all non-aggregated SELECT columns must be in GROUP BY
SELECT city, COUNT(*) FROM customers GROUP BY city;
SELECT city, name, COUNT(*) FROM customers GROUP BY city, name;  -- groups by both

-- ROLLUP: generates subtotals
SELECT
    COALESCE(city, 'ALL CITIES')    AS city,
    COALESCE(cuisine_type, 'ALL')   AS cuisine,
    COUNT(*) AS restaurant_count
FROM restaurants
GROUP BY ROLLUP(city, cuisine_type)
ORDER BY city, cuisine_type;
-- Produces: individual groups + city subtotals + grand total`}
        </CodeBox>

        <SubTitle>HAVING — Filtering Groups After Aggregation</SubTitle>

        <CodeBox label="HAVING vs WHERE — the critical distinction with every use case">
{`-- WHERE filters INDIVIDUAL ROWS before grouping
-- HAVING filters GROUPS (aggregate results) after grouping

-- HAVING: only show cities with more than 2 customers
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
HAVING COUNT(*) > 2;
-- Cannot use WHERE COUNT(*) > 2 — COUNT is not available at WHERE evaluation time

-- COMBINING WHERE and HAVING:
SELECT
    r.city,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_revenue
FROM orders o
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.status = 'delivered'             -- WHERE: filter individual rows (no aggregation)
  AND o.order_date >= '2024-01-01'       -- WHERE: only 2024 orders
GROUP BY r.city                          -- GROUP BY city
HAVING SUM(o.total_amount) > 50000       -- HAVING: only cities with >₹50K revenue
   AND COUNT(o.order_id) >= 10;          -- HAVING: only cities with >=10 orders
ORDER BY total_revenue DESC;

-- HAVING with HAVING COUNT(*) = 1 (find groups with exactly one member):
-- Find customers who placed exactly one order (potential first-time customers)
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) = 1;

-- ANTI-PATTERN: Using HAVING where WHERE would work
-- SLOW (filters after grouping — processes all rows then discards):
SELECT city, COUNT(*) FROM customers GROUP BY city HAVING city = 'Bengaluru';
-- FAST (filters before grouping — reduces rows first):
SELECT city, COUNT(*) FROM customers WHERE city = 'Bengaluru' GROUP BY city;
-- Rule: if the filter is on a raw column (not aggregate), use WHERE not HAVING`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — JOINS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — JOINs" />
        <SectionTitle>JOINs — Connecting Tables in Every Possible Way</SectionTitle>

        <Para>
          JOINs are the most important and most tested SQL concept. Every relational database
          stores normalised data across multiple tables — JOINs are how you put it back
          together for queries. Mastering JOINs means understanding not just the syntax but
          exactly which rows appear in the result and why.
        </Para>

        <SubTitle>The Reference Data for All JOIN Examples</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <SampleTable
            title="customers (left table)"
            headers={['customer_id', 'name', 'city']}
            rows={[
              [1, 'Rahul', 'Bengaluru'],
              [2, 'Priya', 'Hyderabad'],
              [3, 'Arjun', 'Mumbai'],
              [4, 'Kavya', 'Bengaluru'],
            ]}
            note="4 customers"
          />
          <SampleTable
            title="orders (right table)"
            headers={['order_id', 'customer_id', 'total_amount']}
            rows={[
              ['O001', 1, '₹280'],
              ['O002', 1, '₹450'],
              ['O003', 2, '₹180'],
              ['O004', 3, '₹320'],
              ['O005', 5, '₹150'],
            ]}
            note="5 orders — customer_id 4 has no orders, customer_id 5 doesn't exist in customers"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* INNER JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>INNER JOIN — Only Matching Rows from Both Tables</div>
              <Para>
                Returns rows where the join condition is TRUE in BOTH tables. Rows from either side
                that have no match in the other side are silently excluded. The most common join type —
                used when you only want records that have relationships on both sides.
              </Para>
              <CodeBox>
{`SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id;

-- RESULT:
-- customer_id | name  | order_id | total_amount
-- 1           | Rahul | O001     | ₹280
-- 1           | Rahul | O002     | ₹450
-- 2           | Priya | O003     | ₹180
-- 3           | Arjun | O004     | ₹320

-- Kavya (customer_id=4) has NO orders → EXCLUDED from result
-- order O005 has customer_id=5 which doesn't exist → EXCLUDED from result
-- Only the 4 rows where a match exists in BOTH tables are returned

-- JOIN is equivalent to INNER JOIN:
FROM customers c JOIN orders o ON c.customer_id = o.customer_id;  -- same result`}
              </CodeBox>
            </div>
          </div>

          {/* LEFT JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>LEFT JOIN (LEFT OUTER JOIN) — All Left Rows, Matching Right</div>
              <Para>
                Returns ALL rows from the LEFT table, plus matched rows from the right table.
                Where no match exists in the right table, right-side columns are filled with NULL.
                Use when you want to keep all records from the left table regardless of whether
                they have a match.
              </Para>
              <CodeBox>
{`SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id;

-- RESULT:
-- customer_id | name  | order_id | total_amount
-- 1           | Rahul | O001     | ₹280
-- 1           | Rahul | O002     | ₹450
-- 2           | Priya | O003     | ₹180
-- 3           | Arjun | O004     | ₹320
-- 4           | Kavya | NULL     | NULL       ← Kavya kept, NULLs for no-match right side

-- LEFT JOIN ANTI-PATTERN: Find customers with NO orders
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
-- Returns: customer_id=4, Kavya (the NULL row)
-- Pattern: LEFT JOIN + WHERE right_side_column IS NULL = find LEFT with no match in RIGHT

-- Practical use: get all customers with their order count (including 0):
SELECT c.name, COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY order_count DESC;
-- Kavya appears with order_count = 0 (COUNT(NULL) = 0, not skipped)`}
              </CodeBox>
            </div>
          </div>

          {/* RIGHT JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>RIGHT JOIN (RIGHT OUTER JOIN) — All Right Rows, Matching Left</div>
              <Para>
                Mirror of LEFT JOIN. Returns ALL rows from the RIGHT table, plus matches from
                the left. Less commonly used in practice — most engineers rewrite RIGHT JOINs
                as LEFT JOINs by swapping the table order, which is more readable.
              </Para>
              <CodeBox>
{`SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
RIGHT JOIN orders o ON c.customer_id = o.customer_id;

-- RESULT:
-- customer_id | name  | order_id | total_amount
-- 1           | Rahul | O001     | ₹280
-- 1           | Rahul | O002     | ₹450
-- 2           | Priya | O003     | ₹180
-- 3           | Arjun | O004     | ₹320
-- NULL        | NULL  | O005     | ₹150   ← O005 kept (customer_id=5 doesn't exist)

-- Equivalent rewrite using LEFT JOIN (preferred style):
SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM orders o
LEFT JOIN customers c ON c.customer_id = o.customer_id;
-- Identical result — just swap table order and change RIGHT to LEFT`}
              </CodeBox>
            </div>
          </div>

          {/* FULL OUTER JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#8b5cf6' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>FULL OUTER JOIN — All Rows from Both Tables</div>
              <Para>
                Returns ALL rows from BOTH tables. Where matches exist, columns from both tables
                are populated. Where no match exists on either side, NULL fills the unmatched side.
                Use for finding records that exist in one table but not the other, or for complete
                reconciliation queries.
              </Para>
              <CodeBox>
{`SELECT c.customer_id, c.name, o.order_id, o.total_amount
FROM customers c
FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;

-- RESULT:
-- customer_id | name  | order_id | total_amount
-- 1           | Rahul | O001     | ₹280
-- 1           | Rahul | O002     | ₹450
-- 2           | Priya | O003     | ₹180
-- 3           | Arjun | O004     | ₹320
-- 4           | Kavya | NULL     | NULL    ← customer with no orders (from LEFT side)
-- NULL        | NULL  | O005     | ₹150   ← orphaned order (from RIGHT side)

-- Note: MySQL does NOT support FULL OUTER JOIN directly. Workaround:
SELECT c.customer_id, c.name, o.order_id FROM customers c LEFT  JOIN orders o ON c.customer_id = o.customer_id
UNION
SELECT c.customer_id, c.name, o.order_id FROM customers c RIGHT JOIN orders o ON c.customer_id = o.customer_id;`}
              </CodeBox>
            </div>
          </div>

          {/* CROSS JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>CROSS JOIN — Cartesian Product (Every Combination)</div>
              <Para>
                Returns every possible combination of rows from both tables. If the left table
                has M rows and the right has N rows, the result has M × N rows. No join condition.
                Rarely used directly — but essential for understanding why accidental cartesian
                products (forgotten join conditions) are so dangerous.
              </Para>
              <CodeBox>
{`-- CROSS JOIN: every customer-restaurant combination (for a recommendation matrix)
SELECT c.name AS customer, r.name AS restaurant
FROM customers c
CROSS JOIN restaurants r;
-- 4 customers × 3 restaurants = 12 rows

-- PRACTICAL USE: generate test data, create time-series scaffolding
-- "Generate a row for every date-product combination for a report"
SELECT d.date_value, p.product_id
FROM date_series d CROSS JOIN products p;

-- ⚠ ACCIDENTAL CROSS JOIN — the most expensive SQL bug:
-- Missing join condition causes cartesian product
SELECT * FROM orders, customers;  -- comma syntax without WHERE = CROSS JOIN
-- With 1M orders and 100K customers: 100 BILLION rows returned
-- The database will attempt to materialise this and likely crash

-- Prevention: always use explicit JOIN syntax, never implicit comma-separated FROM`}
              </CodeBox>
            </div>
          </div>

          {/* SELF JOIN */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#e879f9' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>SELF JOIN — A Table Joined to Itself</div>
              <Para>
                A self join is when the same table appears on both sides of a join. Used for
                hierarchical data (manager-employee relationships), finding duplicate records,
                or any scenario where you need to compare rows within the same table.
                Requires using different aliases for each "copy" of the table.
              </Para>
              <CodeBox>
{`-- EMPLOYEE HIERARCHY: find each employee and their manager's name
SELECT
    e.employee_id,
    e.name            AS employee_name,
    m.name            AS manager_name,
    m.employee_id     AS manager_id
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
-- LEFT JOIN ensures CEO (manager_id IS NULL) is included with NULL manager_name

-- FIND DUPLICATE ORDERS: same customer, same restaurant, same day
SELECT
    a.order_id        AS order1,
    b.order_id        AS order2,
    a.customer_id,
    a.order_date
FROM orders a
JOIN orders b ON a.customer_id = b.customer_id
             AND DATE(a.order_date) = DATE(b.order_date)
             AND a.restaurant_id = b.restaurant_id
             AND a.order_id < b.order_id;  -- avoid (O001,O002) AND (O002,O001) duplicates
-- a.order_id < b.order_id ensures each pair appears exactly once

-- FIND CUSTOMERS FROM THE SAME CITY:
SELECT
    a.name   AS customer1,
    b.name   AS customer2,
    a.city
FROM customers a
JOIN customers b ON a.city = b.city
               AND a.customer_id < b.customer_id;
-- Pairs each customer with every other customer in the same city, no duplicates`}
              </CodeBox>
            </div>
          </div>
        </div>

        <SubTitle>Multiple JOINs — Chaining Three or More Tables</SubTitle>

        <CodeBox label="Multi-table JOINs — practical patterns">
{`-- THREE TABLE JOIN: customer → order → restaurant
SELECT
    c.name          AS customer_name,
    c.city          AS customer_city,
    o.order_id,
    o.order_date,
    o.total_amount,
    r.name          AS restaurant_name,
    r.cuisine_type
FROM orders o
JOIN customers   c ON o.customer_id   = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.status = 'delivered'
ORDER BY o.order_date DESC;

-- FOUR TABLE JOIN: customer → order → order_items → menu_items
SELECT
    c.name                          AS customer_name,
    o.order_id,
    mi.name                         AS item_name,
    mi.category,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price     AS line_total
FROM orders o
JOIN customers   c  ON o.order_id   = c.customer_id    -- ← typo: fix to o.customer_id
JOIN order_items oi ON o.order_id   = oi.order_id
JOIN menu_items  mi ON oi.item_id   = mi.item_id
WHERE o.order_id = 1
ORDER BY mi.category, mi.name;

-- MIXING JOIN TYPES: LEFT JOIN to include orders without reviews
SELECT
    o.order_id,
    c.name      AS customer,
    r.name      AS restaurant,
    rev.rating,                     -- NULL if no review
    rev.comment
FROM orders o
JOIN    customers   c   ON o.customer_id   = c.customer_id
JOIN    restaurants r   ON o.restaurant_id = r.restaurant_id
LEFT JOIN reviews   rev ON o.order_id      = rev.order_id
WHERE o.status = 'delivered'
ORDER BY o.order_date DESC;`}
        </CodeBox>

        <SubTitle>Non-Equi Joins and Complex Join Conditions</SubTitle>

        <CodeBox label="Non-equi joins — JOINs without equality conditions">
{`-- RANGE JOIN: assign commission tier based on order value
-- Commission tiers table: tier, min_amount, max_amount
SELECT
    o.order_id,
    o.total_amount,
    ct.tier_name,
    ct.commission_rate
FROM orders o
JOIN commission_tiers ct
    ON o.total_amount BETWEEN ct.min_amount AND ct.max_amount;

-- DATE RANGE JOIN: match orders to active promotions
SELECT
    o.order_id,
    o.order_date,
    p.promo_code,
    p.discount_percent
FROM orders o
JOIN promotions p
    ON o.order_date BETWEEN p.start_date AND p.end_date
    AND o.promo_code = p.promo_code;

-- INEQUALITY JOIN: find same-city customers who joined before another
SELECT
    a.name AS senior_customer,
    b.name AS newer_customer,
    a.city
FROM customers a
JOIN customers b ON a.city = b.city
               AND a.created_at < b.created_at;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — SUBQUERIES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Subqueries" />
        <SectionTitle>Subqueries — Queries Within Queries</SectionTitle>

        <Para>
          A subquery (also called an inner query or nested query) is a SELECT statement
          embedded inside another SQL statement. Subqueries can appear in the SELECT list,
          FROM clause, WHERE clause, and HAVING clause. Understanding when to use subqueries
          versus JOINs versus CTEs is a key skill that separates intermediate from senior SQL engineers.
        </Para>

        <SubTitle>Subquery in WHERE — The Most Common Use</SubTitle>

        <CodeBox label="Subquery in WHERE clause — scalar, list, and existence subqueries">
{`-- SCALAR SUBQUERY: returns exactly one value (one row, one column)
-- "Find orders with above-average total amount"
SELECT order_id, customer_id, total_amount
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);
-- The subquery (SELECT AVG...) runs once and returns one number.
-- That number is then compared against each row's total_amount.

-- SCALAR SUBQUERY in SELECT: add average as a column for comparison
SELECT
    order_id,
    total_amount,
    (SELECT AVG(total_amount) FROM orders) AS overall_avg,
    total_amount - (SELECT AVG(total_amount) FROM orders) AS diff_from_avg
FROM orders;

-- LIST SUBQUERY with IN: returns multiple values (one column, many rows)
-- "Find customers who have placed at least one order"
SELECT customer_id, name
FROM customers
WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);

-- IN vs EXISTS performance consideration:
-- IN: loads the entire subquery result into memory, then compares
-- EXISTS: stops scanning as soon as first match found
-- For large subqueries: EXISTS is often faster
-- For small subqueries: IN is fine

-- NOT IN trap with NULLs:
-- "Find customers who have NOT placed an order"
SELECT name FROM customers
WHERE customer_id NOT IN (SELECT customer_id FROM orders);
-- ⚠ DANGER: If ANY row in orders has customer_id = NULL,
-- this query returns ZERO results — even if there are customers with no orders!
-- Why: NOT IN evaluates as "!= val1 AND != val2 AND != NULL"
-- "!= NULL" is UNKNOWN, and TRUE AND UNKNOWN = UNKNOWN → row filtered out

-- SAFE VERSION: use NOT EXISTS instead
SELECT name FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);
-- NOT EXISTS handles NULLs correctly — always use for negative existence tests

-- EXISTS subquery: checks if at least one row exists
-- "Find customers who have ordered from a vegetarian restaurant"
SELECT DISTINCT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.restaurant_id
    WHERE o.customer_id = c.customer_id
      AND r.cuisine_type = 'Pure Veg'
);
-- SELECT 1: the value returned doesn't matter — EXISTS only cares if rows exist`}
        </CodeBox>

        <SubTitle>Correlated Subqueries — The Most Powerful and Dangerous</SubTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>correlated subquery</strong> is one that
          references a column from the outer query. It cannot run independently —
          it re-executes once for every row in the outer query. This makes them
          extremely powerful (they can express complex per-row logic) and potentially
          very slow (N subquery executions for N outer rows = N+1 queries problem).
        </Para>

        <CodeBox label="Correlated subqueries — power and performance traps">
{`-- CORRELATED SUBQUERY: reference to outer query's column
-- "Find each customer's most recent order"
SELECT
    c.name,
    o.order_id,
    o.order_date,
    o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date = (
    SELECT MAX(o2.order_date)
    FROM orders o2
    WHERE o2.customer_id = c.customer_id  -- ← correlating condition: references outer c
);
-- For EACH row in the outer query, the subquery runs with that specific customer_id
-- If there are 100,000 customers: 100,000 subquery executions

-- BETTER ALTERNATIVE using window function (see Part 07):
SELECT name, order_id, order_date, total_amount
FROM (
    SELECT
        c.name, o.order_id, o.order_date, o.total_amount,
        ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY o.order_date DESC) AS rn
    FROM customers c JOIN orders o ON c.customer_id = o.customer_id
) ranked
WHERE rn = 1;
-- One scan instead of N+1 queries — dramatically faster at scale

-- CORRELATED SUBQUERY in SELECT: add per-customer statistics to each order row
SELECT
    o.order_id,
    o.total_amount,
    c.name,
    (SELECT COUNT(*)   FROM orders o2 WHERE o2.customer_id = o.customer_id) AS customer_total_orders,
    (SELECT SUM(total_amount) FROM orders o2 WHERE o2.customer_id = o.customer_id) AS customer_lifetime_value
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- Each correlated subquery runs once per row — expensive at scale
-- Better: use window functions or a pre-aggregated CTE

-- CORRELATED with comparison operators
-- "Find orders whose total is above the customer's personal average"
SELECT order_id, customer_id, total_amount
FROM orders o
WHERE total_amount > (
    SELECT AVG(total_amount)
    FROM orders o2
    WHERE o2.customer_id = o.customer_id  -- each customer's own average
);`}
        </CodeBox>

        <SubTitle>Subquery in FROM — Derived Tables</SubTitle>

        <CodeBox label="Derived tables (subquery in FROM) — pre-aggregation pattern">
{`-- DERIVED TABLE: subquery in FROM produces a virtual table
-- Must always be aliased
SELECT
    city_stats.city,
    city_stats.avg_order_value,
    city_stats.total_orders,
    RANK() OVER (ORDER BY city_stats.avg_order_value DESC) AS city_rank
FROM (
    SELECT
        c.city,
        ROUND(AVG(o.total_amount), 2)  AS avg_order_value,
        COUNT(o.order_id)               AS total_orders
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'delivered'
    GROUP BY c.city
) city_stats  -- alias required
ORDER BY avg_order_value DESC;

-- MULTI-LEVEL NESTING: derived table feeding another derived table
SELECT *
FROM (
    SELECT city, avg_order_value
    FROM (
        SELECT c.city, AVG(o.total_amount) AS avg_order_value
        FROM customers c JOIN orders o ON c.customer_id = o.customer_id
        GROUP BY c.city
    ) inner_agg
    WHERE avg_order_value > 300
) filtered_cities;
-- Note: deeply nested subqueries become hard to read — use CTEs instead`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — CTEs
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — CTEs" />
        <SectionTitle>CTEs — Making Complex Queries Readable</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>Common Table Expression (CTE)</strong> is a
          named temporary result set defined with the WITH keyword before the main query.
          CTEs make complex queries dramatically more readable by giving names to intermediate
          results — you can read them top-to-bottom like a story rather than parsing
          nested subqueries inside-out.
        </Para>

        <CodeBox label="CTEs — from simple to complex multi-step queries">
{`-- BASIC CTE: equivalent to a derived table but readable
WITH delivered_orders AS (
    SELECT * FROM orders WHERE status = 'delivered'
)
SELECT customer_id, COUNT(*) AS delivered_count, SUM(total_amount) AS total_spent
FROM delivered_orders
GROUP BY customer_id;

-- MULTIPLE CTEs: chain intermediate steps
WITH
-- Step 1: Get all delivered orders
delivered_orders AS (
    SELECT o.order_id, o.customer_id, o.restaurant_id, o.total_amount, o.order_date
    FROM orders o
    WHERE o.status = 'delivered'
),
-- Step 2: Compute per-customer statistics
customer_stats AS (
    SELECT
        c.customer_id,
        c.name,
        c.city,
        COUNT(d.order_id)     AS order_count,
        SUM(d.total_amount)   AS lifetime_value,
        AVG(d.total_amount)   AS avg_order_value,
        MAX(d.order_date)     AS last_order_date
    FROM customers c
    LEFT JOIN delivered_orders d ON c.customer_id = d.customer_id
    GROUP BY c.customer_id, c.name, c.city
),
-- Step 3: Classify customers by value tier
customer_tiers AS (
    SELECT
        customer_id, name, city, order_count, lifetime_value, avg_order_value,
        CASE
            WHEN lifetime_value >= 5000 THEN 'Platinum'
            WHEN lifetime_value >= 2000 THEN 'Gold'
            WHEN lifetime_value >= 500  THEN 'Silver'
            WHEN order_count > 0        THEN 'Bronze'
            ELSE 'Inactive'
        END AS tier
    FROM customer_stats
)
-- Final query using the CTEs:
SELECT tier, COUNT(*) AS customer_count, ROUND(AVG(lifetime_value), 2) AS avg_ltv
FROM customer_tiers
GROUP BY tier
ORDER BY avg_ltv DESC;

-- CTE vs SUBQUERY: CTEs are reference-able multiple times in the main query
-- A subquery must be repeated. A CTE is defined once and used many times.
WITH restaurant_revenue AS (
    SELECT restaurant_id, SUM(total_amount) AS revenue
    FROM orders
    WHERE status = 'delivered'
    GROUP BY restaurant_id
)
SELECT
    r.name,
    rr.revenue,
    rr.revenue / (SELECT SUM(revenue) FROM restaurant_revenue) * 100 AS market_share_pct
FROM restaurants r
JOIN restaurant_revenue rr ON r.restaurant_id = rr.restaurant_id;
-- restaurant_revenue CTE is referenced TWICE (in JOIN and in subquery)
-- Without CTE, would need to write the aggregation subquery twice`}
        </CodeBox>

        <SubTitle>Recursive CTEs — Hierarchical Data and Series Generation</SubTitle>

        <Para>
          Recursive CTEs can reference themselves — allowing queries that traverse hierarchical
          or graph-like data. They consist of two parts: a
          <strong style={{ color: 'var(--text)' }}> base case</strong> (the starting rows) and
          a <strong style={{ color: 'var(--text)' }}> recursive case</strong> (how to extend
          from current results). They execute repeatedly until the recursive case produces
          no new rows.
        </Para>

        <CodeBox label="Recursive CTEs — org chart traversal, date series, and path finding">
{`-- EXAMPLE 1: Traverse employee hierarchy (org chart)
WITH RECURSIVE employee_hierarchy AS (
    -- BASE CASE: start with the CEO (no manager)
    SELECT
        employee_id,
        name,
        manager_id,
        1 AS level,
        name::TEXT AS path   -- cast to TEXT for concatenation
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- RECURSIVE CASE: add each employee whose manager is already in the result
    SELECT
        e.employee_id,
        e.name,
        e.manager_id,
        eh.level + 1,
        eh.path || ' → ' || e.name
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT employee_id, name, level, path
FROM employee_hierarchy
ORDER BY level, name;
-- Output:
-- level=1: CEO (the top)
-- level=2: VPs reporting to CEO
-- level=3: Managers reporting to VPs
-- level=4: Individual contributors
-- path = "CEO → VP Engineering → Engineering Manager → Rahul"

-- EXAMPLE 2: Generate a date series (no base table needed)
WITH RECURSIVE date_series AS (
    -- BASE CASE: start date
    SELECT '2024-01-01'::DATE AS date_val

    UNION ALL

    -- RECURSIVE CASE: add one day at a time
    SELECT date_val + INTERVAL '1 day'
    FROM date_series
    WHERE date_val < '2024-12-31'
)
SELECT date_val FROM date_series;
-- Produces every date in 2024 (366 rows)
-- Useful for: filling gaps in time-series data, generating report scaffolding

-- EXAMPLE 3: Fill gaps in daily revenue report
WITH RECURSIVE date_range AS (
    SELECT MIN(DATE(order_date)) AS d FROM orders
    UNION ALL
    SELECT d + 1 FROM date_range WHERE d < (SELECT MAX(DATE(order_date)) FROM orders)
)
SELECT
    dr.d AS date,
    COALESCE(SUM(o.total_amount), 0) AS daily_revenue,
    COALESCE(COUNT(o.order_id), 0) AS order_count
FROM date_range dr
LEFT JOIN orders o ON DATE(o.order_date) = dr.d AND o.status = 'delivered'
GROUP BY dr.d
ORDER BY dr.d;
-- Every date has a row — missing days show revenue = 0 (not missing from result)

-- SAFETY: always add a termination condition to prevent infinite recursion
-- PostgreSQL stops automatically after max_recursion_depth (default 32768) iterations
-- Add explicit depth limit for large hierarchies:
WITH RECURSIVE ... AS (
    ...
    UNION ALL
    SELECT ... FROM table JOIN cte ON ...
    WHERE cte.level < 10  -- max 10 levels deep
)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — WINDOW FUNCTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Window Functions" />
        <SectionTitle>Window Functions — Computations Across Related Rows Without Collapsing</SectionTitle>

        <Para>
          Window functions perform calculations across a set of rows that are related to the
          current row — without collapsing those rows into a single result like GROUP BY does.
          Every row keeps its own result. Every row can "see" values from related rows.
          This is the most powerful SQL concept and the most-asked topic in senior engineer
          technical interviews.
        </Para>

        <Para>
          The syntax: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>function() OVER (PARTITION BY ... ORDER BY ... ROWS/RANGE ...)</code>
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { part: 'OVER', desc: 'Marks this as a window function. Without OVER, it would be a regular aggregate.', color: '#0078d4' },
            { part: 'PARTITION BY', desc: 'Divides rows into groups (windows). The function runs independently within each partition. Like GROUP BY but without collapsing.', color: 'var(--accent)' },
            { part: 'ORDER BY', desc: 'Within each partition, orders rows for functions that care about order (ranking, cumulative sums, LAG/LEAD).', color: '#f97316' },
            { part: 'ROWS/RANGE', desc: 'Defines a sliding frame within the partition (e.g., "last 7 rows" or "all preceding rows"). Used for moving averages.', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.part} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.part}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <SubTitle>Ranking Functions — ROW_NUMBER, RANK, DENSE_RANK, NTILE</SubTitle>

        <CodeBox label="Ranking functions — the most-asked window functions in interviews">
{`-- ROW_NUMBER: assigns a unique sequential number within each partition
-- No ties possible — each row gets a unique number
SELECT
    customer_id,
    order_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id
        ORDER BY order_date DESC
    ) AS order_sequence
FROM orders;
-- For customer 1: orders numbered 1, 2, 3... by most recent first
-- For customer 2: RESETS to 1, 2, 3... (new partition = new sequence)

-- RANK: assigns rank with GAPS after ties
-- Two rows tied at rank 2 → both get rank 2, next row gets rank 4 (not 3)
SELECT
    name, city, total_amount,
    RANK() OVER (PARTITION BY city ORDER BY total_amount DESC) AS city_rank
FROM (SELECT c.name, c.city, o.total_amount FROM customers c JOIN orders o ON c.customer_id = o.customer_id) sub;

-- DENSE_RANK: assigns rank WITHOUT GAPS after ties
-- Two rows tied at rank 2 → both get rank 2, next row gets rank 3
SELECT
    product_name, revenue,
    RANK()       OVER (ORDER BY revenue DESC) AS rank_with_gaps,     -- 1, 2, 2, 4, 5
    DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank_without_gaps   -- 1, 2, 2, 3, 4
FROM product_revenue;

-- THE INTERVIEW TRAP QUESTION:
-- "What is the difference between RANK and DENSE_RANK?"
-- RANK: ties cause gaps in rank numbers (1, 2, 2, 4)
-- DENSE_RANK: ties do NOT cause gaps (1, 2, 2, 3)
-- ROW_NUMBER: no ties possible — always sequential (1, 2, 3, 4)

-- NTILE: divide rows into N equal buckets
SELECT
    customer_id,
    lifetime_value,
    NTILE(4) OVER (ORDER BY lifetime_value DESC) AS quartile
-- quartile=1: top 25% (highest value), quartile=4: bottom 25%
FROM customer_stats;

-- TOP N PER GROUP: most common window function interview question
-- "Find the top 3 most expensive menu items per restaurant"
SELECT restaurant_id, item_id, name, price
FROM (
    SELECT
        restaurant_id, item_id, name, price,
        ROW_NUMBER() OVER (
            PARTITION BY restaurant_id
            ORDER BY price DESC
        ) AS price_rank
    FROM menu_items
    WHERE is_available = true
) ranked
WHERE price_rank <= 3;
-- This is THE canonical ROW_NUMBER() use case — learn it cold`}
        </CodeBox>

        <SubTitle>LAG and LEAD — Accessing Previous and Next Rows</SubTitle>

        <CodeBox label="LAG and LEAD — time-series analysis patterns">
{`-- LAG: access value from a previous row in the ordered partition
-- LEAD: access value from a following row
-- Syntax: LAG(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)

-- DAY-OVER-DAY REVENUE CHANGE:
WITH daily_revenue AS (
    SELECT
        DATE(order_date) AS order_day,
        SUM(total_amount) AS daily_total
    FROM orders
    WHERE status = 'delivered'
    GROUP BY DATE(order_date)
)
SELECT
    order_day,
    daily_total,
    LAG(daily_total) OVER (ORDER BY order_day)                    AS prev_day_revenue,
    daily_total - LAG(daily_total) OVER (ORDER BY order_day)      AS day_change,
    ROUND(
        (daily_total - LAG(daily_total) OVER (ORDER BY order_day)) * 100.0
        / NULLIF(LAG(daily_total) OVER (ORDER BY order_day), 0),
        2
    )                                                              AS pct_change
FROM daily_revenue
ORDER BY order_day;
-- NULLIF(..., 0) prevents division by zero when previous day had 0 revenue

-- LEAD: look ahead at next row
SELECT
    customer_id, order_date, total_amount,
    LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS next_order_date,
    LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)
        - order_date AS days_until_next_order
FROM orders;

-- LAG with offset > 1: compare to N rows back
SELECT
    order_day, daily_total,
    LAG(daily_total, 7) OVER (ORDER BY order_day) AS same_day_last_week,
    daily_total - LAG(daily_total, 7) OVER (ORDER BY order_day) AS week_over_week_change
FROM daily_revenue;`}
        </CodeBox>

        <SubTitle>Aggregate Window Functions — Running Totals and Moving Averages</SubTitle>

        <CodeBox label="SUM, AVG, COUNT OVER — cumulative and windowed aggregations">
{`-- RUNNING TOTAL (cumulative sum):
SELECT
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        ORDER BY order_date
        ROWS UNBOUNDED PRECEDING   -- from first row to current row
    ) AS running_total
FROM orders
WHERE status = 'delivered'
ORDER BY order_date;

-- RUNNING AVERAGE:
SELECT
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date
        ROWS UNBOUNDED PRECEDING
    ) AS running_avg
FROM orders ORDER BY order_date;

-- 7-DAY MOVING AVERAGE:
SELECT
    order_day,
    daily_total,
    AVG(daily_total) OVER (
        ORDER BY order_day
        ROWS 6 PRECEDING   -- current row + 6 before it = 7-day window
    ) AS seven_day_avg
FROM daily_revenue ORDER BY order_day;

-- PERCENTAGE OF TOTAL: window SUM over full partition
SELECT
    restaurant_id,
    total_amount,
    ROUND(
        total_amount * 100.0
        / SUM(total_amount) OVER ()    -- OVER() with no args = entire result set
    , 2) AS pct_of_total_revenue
FROM (
    SELECT restaurant_id, SUM(total_amount) AS total_amount
    FROM orders WHERE status = 'delivered'
    GROUP BY restaurant_id
) restaurant_revenue;

-- PARTITION BY for category-relative percentage:
SELECT
    restaurant_id, cuisine_type, total_amount,
    ROUND(
        total_amount * 100.0
        / SUM(total_amount) OVER (PARTITION BY cuisine_type)
    , 2) AS pct_within_cuisine   -- % within same cuisine category
FROM restaurant_revenue
JOIN restaurants USING (restaurant_id);

-- ROWS vs RANGE distinction:
-- ROWS: physical rows (by position)
-- RANGE: logical rows (by value — rows with same ORDER BY value are in same range)
-- ROWS 1 PRECEDING: exactly the immediately preceding row
-- RANGE 1 PRECEDING: all rows where ORDER BY value is within 1 of current row's value`}
        </CodeBox>

        <SubTitle>FIRST_VALUE, LAST_VALUE, NTH_VALUE</SubTitle>

        <CodeBox label="Value window functions — getting specific row values within a window">
{`-- FIRST_VALUE: get the first value in the ordered window
-- LAST_VALUE: get the last value in the ordered window
SELECT
    customer_id,
    order_date,
    total_amount,
    FIRST_VALUE(total_amount) OVER (
        PARTITION BY customer_id ORDER BY order_date
    ) AS first_order_amount,
    LAST_VALUE(total_amount) OVER (
        PARTITION BY customer_id ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS last_order_amount
    -- ⚠ LAST_VALUE trap: without ROWS BETWEEN...FOLLOWING, the frame is
    -- "ROWS UNBOUNDED PRECEDING to CURRENT ROW" — LAST_VALUE returns
    -- the current row itself, not the actual last row in the partition!
    -- Always specify ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    -- when using LAST_VALUE
FROM orders ORDER BY customer_id, order_date;

-- NTH_VALUE: get the value of the Nth row in the window
SELECT
    customer_id, order_date, total_amount,
    NTH_VALUE(total_amount, 2) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS second_order_amount
FROM orders;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — DML INSERT UPDATE DELETE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — INSERT, UPDATE, DELETE" />
        <SectionTitle>Data Modification — INSERT, UPDATE, DELETE, MERGE</SectionTitle>

        <CodeBox label="INSERT — every form">
{`-- BASIC INSERT: explicit column list (always use this — never rely on column order)
INSERT INTO customers (name, email, city, phone)
VALUES ('Deepak Mehta', 'deepak@email.com', 'Pune', '99887-76655');

-- INSERT multiple rows in one statement (more efficient than separate INSERTs)
INSERT INTO menu_items (restaurant_id, name, category, price, is_veg)
VALUES
    (1, 'Chicken Biryani',   'Main Course', 280.00, false),
    (1, 'Veg Biryani',       'Main Course', 220.00, true),
    (1, 'Butter Chicken',    'Main Course', 340.00, false),
    (1, 'Masala Dosa',       'Breakfast',   120.00, true);

-- INSERT ... SELECT: copy data from another query
INSERT INTO order_archive (order_id, customer_id, total_amount, archived_at)
SELECT order_id, customer_id, total_amount, CURRENT_TIMESTAMP
FROM orders
WHERE status = 'delivered'
  AND order_date < '2024-01-01';  -- archive orders older than a year

-- INSERT ... ON CONFLICT (PostgreSQL UPSERT):
-- If the row already exists (PK/unique constraint violation) → update instead of error
INSERT INTO customer_stats (customer_id, order_count, total_spent)
VALUES (1, 1, 280.00)
ON CONFLICT (customer_id) DO UPDATE SET
    order_count = customer_stats.order_count + EXCLUDED.order_count,
    total_spent = customer_stats.total_spent + EXCLUDED.total_spent;
-- EXCLUDED refers to the row that was attempted to be inserted

-- INSERT and get the generated ID back (RETURNING clause in PostgreSQL)
INSERT INTO orders (customer_id, restaurant_id, total_amount)
VALUES (1, 2, 450.00)
RETURNING order_id, order_date;
-- Returns the generated order_id without needing a separate SELECT`}
        </CodeBox>

        <CodeBox label="UPDATE — patterns and safety">
{`-- BASIC UPDATE: always include WHERE to avoid updating every row
UPDATE menu_items
SET price = price * 1.10   -- 10% price increase
WHERE restaurant_id = 1
  AND category = 'Main Course';

-- UPDATE multiple columns at once
UPDATE customers
SET
    city       = 'Bengaluru',
    phone      = '99887-12345',
    is_active  = true
WHERE customer_id = 42;

-- UPDATE with JOIN (update based on data from another table)
-- In PostgreSQL: UPDATE ... FROM ... syntax
UPDATE orders o
SET status = 'cancelled'
FROM customers c
WHERE o.customer_id = c.customer_id
  AND c.is_active = false
  AND o.status = 'pending';
-- Cancel all pending orders of inactive customers

-- UPDATE with subquery
UPDATE menu_items
SET price = price * 1.15   -- 15% increase for popular items
WHERE item_id IN (
    SELECT oi.item_id
    FROM order_items oi
    GROUP BY oi.item_id
    HAVING COUNT(*) > 100   -- items ordered more than 100 times
);

-- UPDATE and RETURNING: see what was changed
UPDATE orders
SET status = 'cancelled'
WHERE order_date < CURRENT_DATE - INTERVAL '30 days'
  AND status = 'pending'
RETURNING order_id, customer_id, status;

-- ⚠ SAFETY: test your UPDATE with SELECT first
-- BEFORE: SELECT * FROM orders WHERE order_date < ... AND status = 'pending'
-- Verify the rows that will be affected, THEN run the UPDATE`}
        </CodeBox>

        <CodeBox label="DELETE — safe patterns and alternatives">
{`-- BASIC DELETE with WHERE
DELETE FROM menu_items
WHERE restaurant_id = 3
  AND is_available = false;

-- DELETE based on JOIN (delete rows that match another table)
DELETE FROM order_items
WHERE order_id IN (
    SELECT order_id
    FROM orders
    WHERE status = 'cancelled'
      AND order_date < '2024-01-01'
);

-- DELETE with JOIN using PostgreSQL USING syntax:
DELETE FROM order_items oi
USING orders o
WHERE oi.order_id = o.order_id
  AND o.status = 'cancelled';

-- DELETE and RETURNING: see what was deleted
DELETE FROM sessions
WHERE last_activity < CURRENT_TIMESTAMP - INTERVAL '24 hours'
RETURNING session_id, user_id;

-- SOFT DELETE pattern (preferred in production):
-- Instead of physically deleting, mark as deleted
ALTER TABLE customers ADD COLUMN deleted_at TIMESTAMP;
UPDATE customers SET deleted_at = CURRENT_TIMESTAMP WHERE customer_id = 42;
-- Queries use: WHERE deleted_at IS NULL (active records only)
-- Advantages: data is recoverable, audit trail preserved, FK constraints not violated`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 10 — SET OPERATIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Set Operations" />
        <SectionTitle>Set Operations — UNION, INTERSECT, EXCEPT</SectionTitle>

        <Para>
          SQL's set operations combine the results of two or more SELECT statements.
          Both queries must have the same number of columns with compatible data types.
          These implement the mathematical set operations from relational algebra directly.
        </Para>

        <CodeBox label="UNION, INTERSECT, EXCEPT — complete reference">
{`-- UNION: combine results from two queries, removing duplicates
-- (UNION ALL keeps duplicates — almost always what you want for performance)
SELECT customer_id, name, city FROM customers WHERE city = 'Bengaluru'
UNION
SELECT customer_id, name, city FROM customers WHERE name LIKE 'R%';
-- ⚠ UNION without ALL does a DISTINCT operation — expensive at scale
-- Use UNION ALL unless you specifically need deduplication

-- UNION ALL: combine results keeping ALL rows including duplicates
-- Practical use: combining data from different partitions/tables
SELECT 'Q1' AS quarter, SUM(total_amount) AS revenue
FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31'
UNION ALL
SELECT 'Q2', SUM(total_amount)
FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30'
UNION ALL
SELECT 'Q3', SUM(total_amount)
FROM orders WHERE order_date BETWEEN '2024-07-01' AND '2024-09-30'
UNION ALL
SELECT 'Q4', SUM(total_amount)
FROM orders WHERE order_date BETWEEN '2024-10-01' AND '2024-12-31';

-- INTERSECT: only rows that appear in BOTH query results
-- "Find customers who have both ordered AND written a review"
SELECT customer_id FROM orders
INTERSECT
SELECT customer_id FROM reviews;
-- Only customer_ids that exist in both tables

-- EXCEPT (MINUS in Oracle): rows in first query but NOT in second
-- "Find customers who have ordered but NEVER written a review"
SELECT DISTINCT customer_id FROM orders
EXCEPT
SELECT DISTINCT customer_id FROM reviews;
-- Equivalent but often faster alternative using NOT EXISTS:
SELECT DISTINCT o.customer_id FROM orders o
WHERE NOT EXISTS (SELECT 1 FROM reviews r WHERE r.customer_id = o.customer_id);

-- Rules for all set operations:
-- 1. Same number of columns in both SELECT lists
-- 2. Corresponding columns must have compatible (castable) data types
-- 3. Column names in result come from the FIRST SELECT
-- 4. ORDER BY can only be applied to the final combined result, not individual SELECTs`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 11 — TCL — TRANSACTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — TCL" />
        <SectionTitle>TCL — Transaction Control in SQL</SectionTitle>

        <CodeBox label="COMMIT, ROLLBACK, SAVEPOINT — complete transaction patterns">
{`-- BASIC TRANSACTION: two operations that must succeed together
BEGIN;
    -- Debit from sender
    UPDATE accounts
    SET balance = balance - 500
    WHERE account_id = 'ACC001';

    -- Credit to receiver
    UPDATE accounts
    SET balance = balance + 500
    WHERE account_id = 'ACC002';

    -- If both succeeded: make permanent
COMMIT;

-- TRANSACTION WITH ERROR HANDLING (application code style):
BEGIN;
    UPDATE inventory SET stock = stock - 1 WHERE product_id = 101;

    -- Application checks if stock went negative:
    -- IF (SELECT stock FROM inventory WHERE product_id = 101) < 0:
    --     ROLLBACK;
    --     RAISE ERROR 'Out of stock';
    -- ELSE:
    --     Continue...

    INSERT INTO order_items (order_id, product_id, quantity) VALUES (5001, 101, 1);
COMMIT;

-- ROLLBACK: undo everything since BEGIN (or last SAVEPOINT)
BEGIN;
    DELETE FROM temp_staging WHERE processed = true;
    -- Something went wrong
ROLLBACK;   -- temp_staging rows are restored

-- SAVEPOINT: partial rollback points within a transaction
BEGIN;
    INSERT INTO orders (customer_id, restaurant_id, total_amount)
    VALUES (1, 2, 280.00);
    -- order_id = 1001 generated

    SAVEPOINT after_order_insert;

    INSERT INTO order_items (order_id, item_id, quantity, unit_price)
    VALUES (1001, 5, 2, 140.00);
    -- If this fails (e.g., item doesn't exist):
    ROLLBACK TO after_order_insert;
    -- The ORDER was inserted and remains. Only the ORDER_ITEM is rolled back.
    -- Can attempt a different item or signal the error.

COMMIT;  -- commits the order (if order_items succeeded) or just the order (if rolled back to savepoint)

-- ISOLATION LEVELS: control what concurrent transactions can see
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;    -- default in PostgreSQL
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- stronger consistency
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- strongest, prevents all anomalies`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 12 — DCL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 12 — DCL" />
        <SectionTitle>DCL — Controlling Database Access</SectionTitle>

        <CodeBox label="GRANT and REVOKE — access control patterns">
{`-- CREATE A ROLE (group of permissions)
CREATE ROLE analyst_role;
CREATE ROLE developer_role;
CREATE ROLE admin_role;

-- GRANT privileges to a role
GRANT SELECT ON customers TO analyst_role;
GRANT SELECT ON orders TO analyst_role;
GRANT SELECT ON reviews TO analyst_role;
-- Analyst can read data but not modify it

GRANT SELECT, INSERT, UPDATE ON orders TO developer_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO admin_role;

-- GRANT column-level permissions (select specific columns only)
GRANT SELECT (order_id, customer_id, order_date, status) ON orders TO analyst_role;
-- Analyst cannot see total_amount, promo_code — only the listed columns

-- GRANT with GRANT OPTION: allow the grantee to grant to others
GRANT SELECT ON customers TO manager_role WITH GRANT OPTION;
-- manager_role can now grant SELECT on customers to others

-- ASSIGN role to a user
CREATE USER rahul_analyst WITH PASSWORD 'secure_password';
GRANT analyst_role TO rahul_analyst;

-- REVOKE: remove previously granted permissions
REVOKE DELETE ON customers FROM developer_role;
REVOKE SELECT ON salary_details FROM analyst_role;

-- ROW LEVEL SECURITY: restrict rows visible per user (PostgreSQL)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_sees_own_orders ON orders
    FOR SELECT
    USING (customer_id = current_user_id());
-- Each customer can only see their own orders, regardless of SELECT permissions

-- GRANT all on a schema (shortcut for all tables in schema)
GRANT USAGE ON SCHEMA reporting TO analyst_role;
GRANT SELECT ON ALL TABLES IN SCHEMA reporting TO analyst_role;
GRANT SELECT ON FUTURE TABLES IN SCHEMA reporting TO analyst_role; -- for new tables too`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 13 — ADVANCED SQL PATTERNS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 13 — Advanced Patterns" />
        <SectionTitle>Advanced SQL Patterns Used in Production</SectionTitle>

        <SubTitle>PIVOT — Rotating Rows into Columns</SubTitle>

        <CodeBox label="PIVOT using CASE WHEN — the SQL standard approach">
{`-- DATA: monthly revenue per restaurant (long format)
-- restaurant_id | month | revenue
-- 1             | Jan   | 50000
-- 1             | Feb   | 62000
-- 2             | Jan   | 38000

-- GOAL: rotate to wide format
-- restaurant_id | Jan_revenue | Feb_revenue | Mar_revenue ...

-- SQL doesn't have a native PIVOT statement (PostgreSQL) — use CASE WHEN:
SELECT
    restaurant_id,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 1  THEN total_amount ELSE 0 END) AS jan_revenue,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 2  THEN total_amount ELSE 0 END) AS feb_revenue,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 3  THEN total_amount ELSE 0 END) AS mar_revenue,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 4  THEN total_amount ELSE 0 END) AS apr_revenue,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 5  THEN total_amount ELSE 0 END) AS may_revenue,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 6  THEN total_amount ELSE 0 END) AS jun_revenue
FROM orders
WHERE status = 'delivered'
  AND EXTRACT(YEAR FROM order_date) = 2024
GROUP BY restaurant_id;`}
        </CodeBox>

        <SubTitle>Data Quality Queries — The Data Engineer's Daily Work</SubTitle>

        <CodeBox label="Data quality checks — patterns every data engineer writes daily">
{`-- CHECK 1: NULL counts per column (find columns with missing data)
SELECT
    COUNT(*) AS total_rows,
    COUNT(*) - COUNT(customer_id)   AS null_customer_ids,
    COUNT(*) - COUNT(restaurant_id) AS null_restaurant_ids,
    COUNT(*) - COUNT(total_amount)  AS null_amounts,
    COUNT(*) - COUNT(order_date)    AS null_dates,
    COUNT(*) - COUNT(status)        AS null_statuses,
    ROUND(100.0 * (COUNT(*) - COUNT(total_amount)) / COUNT(*), 2) AS pct_null_amounts
FROM orders;

-- CHECK 2: Duplicate primary key detection
SELECT order_id, COUNT(*) AS occurrence_count
FROM orders
GROUP BY order_id
HAVING COUNT(*) > 1;  -- any result here = duplicate PK = critical error

-- CHECK 3: Referential integrity violations (orphaned records)
-- Find order_items whose order_id doesn't exist in orders
SELECT oi.order_id, oi.item_id
FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL;  -- no match in orders = orphaned item

-- CHECK 4: Business rule violations
SELECT order_id, total_amount, delivery_fee
FROM orders
WHERE total_amount < 0           -- negative order total
   OR delivery_fee < 0          -- negative delivery fee
   OR total_amount > 100000;    -- suspiciously large order (possible fraud)

-- CHECK 5: Cross-table consistency
-- Verify order total matches sum of order_items
SELECT
    o.order_id,
    o.total_amount AS header_total,
    SUM(oi.quantity * oi.unit_price) AS calculated_total,
    ABS(o.total_amount - SUM(oi.quantity * oi.unit_price)) AS discrepancy
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.total_amount
HAVING ABS(o.total_amount - SUM(oi.quantity * oi.unit_price)) > 0.01;
-- Any result = inconsistency between header and line items`}
        </CodeBox>

        <SubTitle>Month-Over-Month and Year-Over-Year Comparisons</SubTitle>

        <CodeBox label="Time-based comparisons — standard analyst queries">
{`-- MONTH-OVER-MONTH comparison using LAG window function
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue,
        COUNT(order_id)                 AS order_count
    FROM orders
    WHERE status = 'delivered'
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    TO_CHAR(month, 'Mon YYYY')   AS month_name,
    revenue,
    order_count,
    LAG(revenue)     OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month)  AS revenue_change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0),
        2
    )                                             AS mom_pct_change
FROM monthly_revenue
ORDER BY month;

-- YEAR-OVER-YEAR: same month, different year
WITH monthly AS (
    SELECT
        EXTRACT(YEAR FROM order_date)  AS year,
        EXTRACT(MONTH FROM order_date) AS month,
        SUM(total_amount)              AS revenue
    FROM orders WHERE status = 'delivered'
    GROUP BY 1, 2
)
SELECT
    a.year, a.month, a.revenue AS current_year_revenue,
    b.revenue AS prev_year_revenue,
    ROUND((a.revenue - b.revenue) * 100.0 / NULLIF(b.revenue, 0), 2) AS yoy_pct_change
FROM monthly a
LEFT JOIN monthly b ON a.month = b.month AND a.year = b.year + 1
ORDER BY a.year, a.month;`}
        </CodeBox>

        <SubTitle>Handling Gaps and Islands in Sequential Data</SubTitle>

        <CodeBox label="Gaps and islands — consecutive date/order streak analysis">
{`-- FIND CONSECUTIVE ORDER STREAKS per customer
-- "Find customers who ordered on 5 or more consecutive days"
WITH daily_orders AS (
    SELECT DISTINCT
        customer_id,
        DATE(order_date) AS order_day
    FROM orders
    WHERE status != 'cancelled'
),
grouped AS (
    SELECT
        customer_id,
        order_day,
        order_day - ROW_NUMBER() OVER (
            PARTITION BY customer_id ORDER BY order_day
        ) * INTERVAL '1 day' AS group_id
        -- Rows that are consecutive have the same group_id
        -- A gap of 1 day breaks the consecutive sequence → new group_id
    FROM daily_orders
),
streaks AS (
    SELECT
        customer_id,
        MIN(order_day) AS streak_start,
        MAX(order_day) AS streak_end,
        COUNT(*) AS streak_length
    FROM grouped
    GROUP BY customer_id, group_id
)
SELECT c.name, s.streak_start, s.streak_end, s.streak_length
FROM streaks s
JOIN customers c ON s.customer_id = c.customer_id
WHERE s.streak_length >= 5
ORDER BY s.streak_length DESC;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 14 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 14 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Real Queries From Real Job Descriptions at Indian Tech Companies</SectionTitle>

        <Para>
          These are the exact types of SQL tasks that appear in Swiggy, Flipkart, Razorpay,
          and CRED job descriptions for data engineering and analytics roles. Every one of
          these exercises pulls from the concepts in this module.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Swiggy — "Find top 3 restaurants by revenue in each city for Q1 2024"
            </div>
            <CodeBox>
{`WITH q1_revenue AS (
    SELECT
        r.restaurant_id,
        r.name     AS restaurant_name,
        r.city,
        SUM(o.total_amount) AS q1_revenue
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.restaurant_id
    WHERE o.status = 'delivered'
      AND o.order_date BETWEEN '2024-01-01' AND '2024-03-31'
    GROUP BY r.restaurant_id, r.name, r.city
),
ranked AS (
    SELECT
        *,
        DENSE_RANK() OVER (PARTITION BY city ORDER BY q1_revenue DESC) AS city_rank
    FROM q1_revenue
)
SELECT city, restaurant_name, q1_revenue, city_rank
FROM ranked
WHERE city_rank <= 3
ORDER BY city, city_rank;`}
            </CodeBox>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Razorpay — "Find customers who increased their average order value by more than 20% in the second half of the year compared to the first half"
            </div>
            <CodeBox>
{`WITH half_year_stats AS (
    SELECT
        customer_id,
        AVG(CASE WHEN EXTRACT(MONTH FROM order_date) <= 6
                 THEN total_amount END) AS h1_avg,
        AVG(CASE WHEN EXTRACT(MONTH FROM order_date) > 6
                 THEN total_amount END) AS h2_avg
    FROM orders
    WHERE status = 'delivered'
      AND EXTRACT(YEAR FROM order_date) = 2024
    GROUP BY customer_id
)
SELECT
    c.name,
    ROUND(h.h1_avg, 2)   AS h1_avg_order,
    ROUND(h.h2_avg, 2)   AS h2_avg_order,
    ROUND((h.h2_avg - h.h1_avg) * 100.0 / h.h1_avg, 2) AS pct_increase
FROM half_year_stats h
JOIN customers c ON h.customer_id = c.customer_id
WHERE h.h1_avg IS NOT NULL
  AND h.h2_avg IS NOT NULL
  AND (h.h2_avg - h.h1_avg) / h.h1_avg > 0.20
ORDER BY pct_increase DESC;`}
            </CodeBox>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>
              Flipkart — "Find the most ordered item in each restaurant and the percentage it contributes to that restaurant's total orders"
            </div>
            <CodeBox>
{`WITH item_orders AS (
    SELECT
        mi.restaurant_id,
        mi.item_id,
        mi.name AS item_name,
        SUM(oi.quantity) AS total_qty_ordered
    FROM order_items oi
    JOIN menu_items mi ON oi.item_id = mi.item_id
    JOIN orders o       ON oi.order_id = o.order_id
    WHERE o.status = 'delivered'
    GROUP BY mi.restaurant_id, mi.item_id, mi.name
),
ranked_items AS (
    SELECT
        *,
        SUM(total_qty_ordered) OVER (PARTITION BY restaurant_id) AS restaurant_total_qty,
        RANK() OVER (PARTITION BY restaurant_id ORDER BY total_qty_ordered DESC) AS item_rank
    FROM item_orders
)
SELECT
    r.name        AS restaurant_name,
    ri.item_name  AS top_item,
    ri.total_qty_ordered,
    ri.restaurant_total_qty,
    ROUND(ri.total_qty_ordered * 100.0 / ri.restaurant_total_qty, 2) AS pct_of_restaurant_orders
FROM ranked_items ri
JOIN restaurants r ON ri.restaurant_id = r.restaurant_id
WHERE item_rank = 1
ORDER BY r.name;`}
            </CodeBox>
          </div>

        </div>
      </section>

      {/* ========================================
          PART 15 — INTERVIEW TRAPS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 15 — Interview Traps" />
        <SectionTitle>SQL Interview Traps — Questions That Expose Shallow Knowledge</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is the difference between WHERE and HAVING?',
              trap: 'Saying "HAVING filters after grouping" and nothing more.',
              answer: 'WHERE filters individual rows BEFORE grouping occurs — it cannot reference aggregate functions because aggregation hasn\'t happened yet. HAVING filters groups AFTER grouping and aggregation — it CAN reference aggregate functions like COUNT(*), SUM(), AVG(). Additionally: WHERE is more performant because it reduces the number of rows before GROUP BY processes them. Using HAVING to filter on a non-aggregate column (e.g., HAVING city = \'Bengaluru\') is an anti-pattern — that filter should be in WHERE where it can use indexes and reduces the data before grouping.',
              color: '#0078d4',
            },
            {
              q: 'Write a query to find the second highest salary in the employees table.',
              trap: 'Using LIMIT 1 OFFSET 1 without handling ties correctly.',
              answer: `Multiple correct approaches with different semantics:
              
-- Using DENSE_RANK (handles ties correctly — finds 2nd distinct salary):
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) ranked WHERE rnk = 2 LIMIT 1;

-- Using subquery:
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Using LIMIT OFFSET (misses ties — if two people have the 2nd highest, returns only one):
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Discuss the difference: DENSE_RANK correctly returns all employees at rank 2.
-- The MAX of sub-MAX approach returns the salary value. Both are "correct" but semantically different.`,
              color: 'var(--accent)',
            },
            {
              q: 'What is the difference between UNION and UNION ALL?',
              trap: 'Only mentioning that UNION removes duplicates.',
              answer: 'UNION deduplicates the combined results — it applies a DISTINCT operation over the merged rows. UNION ALL combines all rows including duplicates. The performance difference is significant: UNION ALL is a simple append (O(n+m) time), while UNION requires a sort or hash-based deduplication step (O((n+m) log(n+m)) time). In practice: always use UNION ALL unless you specifically need deduplication. Two separate tables in a UNION that don\'t have overlapping data will produce the same result from both — but UNION ALL is always faster. Only use UNION when the data genuinely has duplicates that must be removed.',
              color: '#f97316',
            },
            {
              q: 'Explain what happens when you run SELECT * FROM orders, customers without a WHERE clause.',
              trap: 'Not recognising this as a cross join.',
              answer: 'This is an implicit CROSS JOIN — the comma between table names without a WHERE or JOIN condition produces the Cartesian product. If orders has 1,000,000 rows and customers has 100,000 rows, this produces 100,000,000,000 rows (100 billion rows). This will exhaust memory, take hours, and likely crash the database session. The correct query requires an explicit JOIN with a condition. The comma-separated FROM syntax is legal SQL but dangerous — always use explicit JOIN syntax: FROM orders JOIN customers ON orders.customer_id = customers.customer_id.',
              color: '#ff4757',
            },
            {
              q: 'What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?',
              trap: 'Only explaining one of the three.',
              answer: 'All three assign ordinal positions to rows within a partition, but handle ties differently. ROW_NUMBER() assigns a unique sequential integer to each row regardless of ties — no two rows get the same number (1, 2, 3, 4 even if rows 2 and 3 are tied on the ORDER BY column). RANK() assigns the same rank to tied rows, then skips — if rows 2 and 3 are tied, both get rank 2, and the next row gets rank 4 (gaps: 1, 2, 2, 4). DENSE_RANK() assigns the same rank to tied rows but does NOT skip — tied rows at rank 2 give the next row rank 3, not 4 (no gaps: 1, 2, 2, 3). Use ROW_NUMBER() when you need a unique identifier per row (top-N queries, deduplication). Use DENSE_RANK() for ranking competitions where you want "2nd place" to be a valid rank even after ties.',
              color: '#8b5cf6',
            },
            {
              q: 'Can you explain when NOT EXISTS is preferred over NOT IN?',
              trap: 'Saying they are always equivalent.',
              answer: 'They are NOT equivalent when the subquery can return NULL values. NOT IN with a subquery that contains any NULL values returns ZERO results for the entire outer query. This is because NOT IN expands to "!= val1 AND != val2 AND != NULL" — any comparison with NULL produces UNKNOWN, and TRUE AND UNKNOWN evaluates to UNKNOWN (not TRUE), causing every row to be filtered out. NOT EXISTS handles NULLs correctly — it evaluates to TRUE when the subquery returns no rows, regardless of NULLs in the subquery. Rule: always use NOT EXISTS for negative existence tests involving subqueries. Only use NOT IN when you are certain the subquery cannot return NULL values (e.g., the column has a NOT NULL constraint).',
              color: '#facc15',
            },
            {
              q: 'What does SELECT 1 mean inside an EXISTS subquery?',
              trap: 'Thinking the value matters.',
              answer: 'SELECT 1 (or SELECT *, or SELECT any_column) inside an EXISTS subquery has no impact on the result. EXISTS only evaluates whether the subquery returns ANY rows at all — it does not process or use the actual values returned. SELECT 1 is a convention that signals "I\'m only checking existence, not retrieving actual values" and can be a micro-optimisation hint in some databases (though modern optimisers ignore the select list in EXISTS subqueries anyway). EXISTS returns TRUE if at least one row is returned by the subquery, and FALSE if zero rows are returned. The VALUES in those rows are completely irrelevant.',
              color: '#e879f9',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Q: {item.q}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Trap:</span>
                <span style={{ fontSize: 13, color: '#ff4757',  lineHeight: 1.75, fontStyle: 'italic' }}>{item.trap}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Answer:</span>
                <span style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.85, whiteSpace: 'pre-wrap' }}>{item.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'SQL is declarative — describe what data you want, not how to find it. The database\'s query optimiser decides the execution strategy. This is the fundamental difference from imperative programming languages.',
        'Logical execution order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. This order explains why you cannot use SELECT aliases in WHERE (alias doesn\'t exist yet at WHERE evaluation time).',
        'WHERE filters individual rows before grouping (cannot use aggregates). HAVING filters groups after aggregation (can use aggregates). Using HAVING for non-aggregate filters is an anti-pattern — put them in WHERE for better performance.',
        'INNER JOIN: only matching rows from both sides. LEFT JOIN: all left rows + matching right (NULLs for no match). FULL OUTER JOIN: all rows from both sides. CROSS JOIN: every combination. Missing a JOIN condition accidentally creates a cross join — catastrophic at scale.',
        'NOT IN fails silently when the subquery contains NULL values — returns zero rows. Always use NOT EXISTS for negative existence tests. This is one of the most dangerous silent bugs in SQL.',
        'Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER) perform calculations across related rows without collapsing them. PARTITION BY creates independent groups. ORDER BY determines row sequence within each group. These are the most powerful and most-tested SQL concepts in senior interviews.',
        'CTEs (WITH clause) make complex queries readable by naming intermediate results. They are reference-able multiple times in the main query. Recursive CTEs handle hierarchical data (org charts) and series generation (date ranges). Always prefer CTEs over deeply nested subqueries.',
        'RANK gives gaps after ties (1,2,2,4). DENSE_RANK gives no gaps (1,2,2,3). ROW_NUMBER gives no ties, always unique (1,2,3,4). The canonical TOP-N-per-group pattern uses ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) in a subquery then WHERE rn <= N.',
        'UNION removes duplicates (expensive — requires deduplication). UNION ALL keeps all rows (fast — just appends). Always use UNION ALL unless you specifically need deduplication. Both require the same number of columns with compatible types.',
        'Correlated subqueries are powerful but dangerous at scale — they re-execute once per outer row (N+1 problem). Replace with window functions, CTEs, or pre-aggregated JOINs wherever possible for production query performance.',
      ]} />

    </LearnLayout>
  )
}