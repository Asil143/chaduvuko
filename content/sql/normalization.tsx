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

const NF = ({ level, color, title, rule, example }: {
  level: string; color: string; title: string; rule: string; example: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color, background: `${color}20`, padding: '2px 8px', borderRadius: 4 }}>{level}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
    </div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Rule</p>
      <p style={{ fontSize: 13, color: 'var(--text)', margin: '0 0 12px', lineHeight: 1.6 }}>{rule}</p>
      <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Key test</p>
      <p style={{ fontSize: 13, color, fontFamily: 'var(--font-mono)', margin: 0, lineHeight: 1.6 }}>{example}</p>
    </div>
  </div>
);

export default function Normalization() {
  return (
    <LearnLayout
      title="Normalisation"
      description="Design relational schemas that eliminate redundancy, prevent update anomalies, and stay consistent — 1NF through 3NF explained with real FreshCart examples"
      section="SQL — Module 26"
      readTime="40 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem That Normalisation Solves" />

      <P>Before relational databases existed, data was often stored in flat files — one big table with every piece of information crammed into it. This feels natural: put everything in one place, easy to find. But as soon as the data needs to be updated, the problems begin.</P>

      <P>Imagine FreshCart stored all order information in a single flat table like this:</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {['order_id', 'customer_name', 'customer_email', 'customer_city', 'product_name', 'category', 'brand', 'qty', 'unit_price', 'store_city', 'store_manager'].map(h => (
                <th key={h} style={{ padding: '8px 10px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1001', 'Aisha Khan', 'aisha@gmail.com', 'Seattle', 'Amul Butter', 'Dairy', 'Amul', '2', '56.00', 'Seattle', 'Suresh Rao'],
              ['1001', 'Aisha Khan', 'aisha@gmail.com', 'Seattle', 'Tata Salt', 'Staples', 'Tata', '1', '22.00', 'Seattle', 'Suresh Rao'],
              ['1002', 'Rahul Sharma', 'rahul@gmail.com', 'New York', 'Amul Butter', 'Dairy', 'Amul', '3', '56.00', 'New York', 'Olivia Brown'],
              ['1003', 'Aisha Khan', 'aisha@gmail.com', 'Seattle', 'Maggi Noodles', 'Staples', 'Nestle', '5', '15.00', 'Seattle', 'Suresh Rao'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '8px 10px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>This table has four serious problems — and understanding them is the entire motivation for normalisation.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0 32px' }}>
        {[
          { name: 'Update anomaly', color: '#ff4757', desc: 'Aisha Khan\'s email appears in three rows. If she changes her email, you must update all three rows. Miss one and your database has inconsistent data — two different "correct" emails for the same customer.' },
          { name: 'Insertion anomaly', color: '#f59e0b', desc: 'You cannot add a new product to the catalogue without also having an order for it. The product row requires an order_id because the table is built around orders.' },
          { name: 'Deletion anomaly', color: '#f97316', desc: 'If order 1002 is deleted, you lose all information about the New York store and Olivia Brown — because that was the only row containing those store details.' },
          { name: 'Redundancy', color: '#8b5cf6', desc: 'Amul Butter\'s name, category, and brand are repeated in every order that contains it. With millions of orders, this is millions of repeated values wasting storage and causing inconsistency risk.' },
        ].map(item => (
          <div key={item.name} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ width: 4, borderRadius: 2, background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <P>Normalisation is the process of restructuring a relational database to eliminate these anomalies. It organises columns and tables to ensure that data dependencies make sense — that each piece of data is stored exactly once, in the right place, and can be updated in exactly one location.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Normal Forms — A Progressive Hierarchy" />

      <P>Normalisation is defined as a series of <Hl>normal forms</Hl> — each a progressively stricter set of rules. A table that satisfies the rules of a given normal form is said to be "in" that normal form. Each normal form builds on the previous one: a table in 3NF is also in 2NF and 1NF.</P>

      <NF
        level="1NF"
        color="#06b6d4"
        title="First Normal Form — Atomic values, no repeating groups"
        rule="Every column contains atomic (indivisible) values. No column contains multiple values or repeating groups. There are no duplicate rows."
        example="Test: Can any cell be split into multiple values? If yes → not 1NF"
      />
      <NF
        level="2NF"
        color="#10b981"
        title="Second Normal Form — No partial dependencies"
        rule="The table is in 1NF AND every non-key column is fully functionally dependent on the entire primary key — not just part of it. Only relevant for composite primary keys."
        example="Test: Does any non-key column depend on only PART of a composite PK? If yes → not 2NF"
      />
      <NF
        level="3NF"
        color="#f97316"
        title="Third Normal Form — No transitive dependencies"
        rule="The table is in 2NF AND no non-key column depends on another non-key column. Every non-key column depends directly on the primary key, and nothing else."
        example="Test: Does any non-key column determine another non-key column? If yes → not 3NF"
      />
      <NF
        level="BCNF"
        color="#8b5cf6"
        title="Boyce-Codd Normal Form — Stricter 3NF"
        rule="A stricter version of 3NF: for every functional dependency A → B, A must be a superkey (a key that uniquely identifies the entire row). BCNF resolves edge cases where 3NF is insufficient."
        example="Test: Does any non-superkey column determine any column? If yes → not BCNF"
      />

      <P>In practice, the target for most production databases is <Hl>3NF</Hl>. It eliminates the major anomalies while keeping the schema practical. BCNF, 4NF, and 5NF address increasingly rare edge cases and are rarely required outside academic settings or highly specialised applications.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="First Normal Form (1NF) — Atomic Values" />

      <P>A table is in 1NF when every column contains a single, atomic (indivisible) value — no lists, no sets, no repeating groups. Each row represents exactly one fact, and every fact is in exactly one cell.</P>

      <H>Violations of 1NF</H>

      <CodeBlock
        label="1NF violations — common patterns"
        code={`-- Violation 1: Multiple values in one cell (comma-separated list)
-- products table with a 'tags' column
product_id | product_name   | tags
1          | Amul Butter    | 'dairy, refrigerated, fat'
-- PROBLEM: 'dairy, refrigerated, fat' is three values in one cell
-- Cannot query: WHERE tags = 'dairy' -- this won't work

-- Violation 2: Repeating column groups
-- orders table with multiple product columns
order_id | product_1   | qty_1 | product_2  | qty_2 | product_3 | qty_3
1001     | Amul Butter | 2     | Tata Salt  | 1     | NULL      | NULL
-- PROBLEM: How do you handle an order with 10 products?
-- Must add more columns. Queries are complex. NULLs everywhere.

-- Violation 3: Non-atomic composite value
customer_id | full_address
1           | '204 MG Road, Koramangala, Seattle 560001'
-- PROBLEM: Cannot query by city alone without string parsing`}
      />

      <H>Fixing 1NF violations</H>

      <CodeBlock
        label="Fixing 1NF — decompose into atomic values"
        code={`-- Fix 1: Move multi-valued attribute to a separate table
-- Instead of tags column in products:
CREATE TABLE product_tags (
  product_id  INTEGER REFERENCES products(product_id),
  tag         VARCHAR(50) NOT NULL,
  PRIMARY KEY (product_id, tag)
);
-- One row per tag per product — fully atomic

-- Fix 2: Move repeating groups to a separate table
-- Instead of product_1, qty_1, product_2, qty_2 columns in orders:
CREATE TABLE order_items (
  order_id    INTEGER REFERENCES orders(order_id),
  product_id  INTEGER REFERENCES products(product_id),
  quantity    INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
-- One row per product per order — handles any number of products

-- Fix 3: Split composite address into atomic columns
CREATE TABLE customers (
  customer_id     INTEGER PRIMARY KEY,
  street_address  VARCHAR(200),
  locality        VARCHAR(100),
  city            VARCHAR(100),
  state           VARCHAR(100),
  zip_code         VARCHAR(10)
);
-- Each address component queryable independently`}
      />

      <SQLPlayground
        initialQuery={`-- FreshCart is already in 1NF
-- order_items has one row per product per order — atomic
SELECT
  o.order_id,
  oi.product_id,
  p.product_name,
  oi.quantity,
  oi.unit_price,
  oi.line_total
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
WHERE o.order_id = 1001
ORDER BY oi.item_id;`}
        height={190}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Second Normal Form (2NF) — No Partial Dependencies" />

      <P>A table is in 2NF when it is in 1NF AND every non-key column depends on the <Hl>entire</Hl> primary key — not just part of it. This only matters when the primary key is composite (made of multiple columns). If the PK is a single column, 1NF automatically implies 2NF.</P>

      <H>Understanding functional dependency</H>
      <P>Column B is <Hl>functionally dependent</Hl> on column A if knowing the value of A determines the value of B. Knowing a customer_id determines the customer's email (one customer_id → one email). Knowing a product_id determines the product's name. Knowing an order_id determines the order date.</P>

      <H>A 2NF violation — partial dependency</H>

      <CodeBlock
        label="2NF violation — order_items with extra columns"
        code={`-- Imagine order_items stored product details alongside order details:
CREATE TABLE order_items_bad (
  order_id      INTEGER,
  product_id    INTEGER,
  quantity      INTEGER,
  unit_price    DECIMAL(10,2),
  -- These columns violate 2NF:
  product_name  VARCHAR(200),  -- depends only on product_id, not on order_id
  category      VARCHAR(100),  -- depends only on product_id
  brand         VARCHAR(100),  -- depends only on product_id
  PRIMARY KEY (order_id, product_id)
);

-- Composite PK: (order_id, product_id)
-- Dependency analysis:
--   quantity    → depends on (order_id, product_id) BOTH ✓
--   unit_price  → depends on (order_id, product_id) BOTH ✓ (price at time of order)
--   product_name → depends only on product_id ✗ PARTIAL DEPENDENCY
--   category    → depends only on product_id ✗ PARTIAL DEPENDENCY
--   brand       → depends only on product_id ✗ PARTIAL DEPENDENCY

-- Problems this causes:
-- If Amul Butter's name changes: must update EVERY order_item row
-- If a product is ordered 50,000 times: product_name stored 50,000 times`}
      />

      <H>Fixing the 2NF violation</H>

      <CodeBlock
        label="2NF fix — move partial dependencies to their own table"
        code={`-- BEFORE (2NF violation):
order_items(order_id, product_id, quantity, unit_price, product_name, category, brand)

-- AFTER (2NF compliant — split into two tables):
-- Table 1: Facts about the order line item (depend on full PK)
CREATE TABLE order_items (
  order_id    INTEGER       NOT NULL REFERENCES orders(order_id),
  product_id  INTEGER       NOT NULL REFERENCES products(product_id),
  quantity    INTEGER       NOT NULL,
  unit_price  DECIMAL(10,2) NOT NULL,  -- price AT TIME of order (valid here)
  line_total  DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);

-- Table 2: Facts about the product (depend only on product_id)
CREATE TABLE products (
  product_id    INTEGER       PRIMARY KEY,
  product_name  VARCHAR(200)  NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  brand         VARCHAR(100),
  unit_price    DECIMAL(10,2) NOT NULL  -- current price (may differ from order price)
);

-- Now product_name is stored ONCE in products
-- order_items joins to products to get the name when needed`}
      />

      <SQLPlayground
        initialQuery={`-- FreshCart's order_items is in 2NF
-- product_name lives in products, not in order_items
-- Join retrieves it when needed — stored only once

SELECT
  oi.order_id,
  oi.product_id,
  p.product_name,   -- from products table (not duplicated in order_items)
  p.category,       -- from products table
  oi.quantity,
  oi.unit_price,    -- price at time of order (legitimate in order_items)
  p.unit_price AS current_price  -- current price (may differ)
FROM order_items AS oi
JOIN products AS p ON oi.product_id = p.product_id
LIMIT 8;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Third Normal Form (3NF) — No Transitive Dependencies" />

      <P>A table is in 3NF when it is in 2NF AND no non-key column determines another non-key column. Every non-key column must depend directly on the primary key — not on another non-key column via a chain (transitively).</P>

      <H>Understanding transitive dependency</H>
      <P>Column C is <Hl>transitively dependent</Hl> on the primary key A if A → B and B → C. The primary key determines B, and B determines C — but C does not directly depend on A. This is the chain that 3NF breaks.</P>

      <H>A 3NF violation — transitive dependency</H>

      <CodeBlock
        label="3NF violation — transitive dependency example"
        code={`-- Imagine customers stored with city and state together:
CREATE TABLE customers_bad (
  customer_id  INTEGER  PRIMARY KEY,
  first_name   VARCHAR(100),
  email        VARCHAR(255),
  zip_code      VARCHAR(10),
  city         VARCHAR(100),   -- determined by zip_code (transitive!)
  state        VARCHAR(100)    -- determined by zip_code (transitive!)
);

-- Dependency chain:
-- customer_id → zip_code    (direct: each customer has one zip_code)
-- zip_code → city           (a zip_code determines a city)
-- zip_code → state          (a zip_code determines a state)
-- Therefore: customer_id → zip_code → city  (TRANSITIVE)

-- Problems:
-- If Seattle's zip_code 560001 is reassigned to another city:
--   Must update EVERY customer row with that zip_code
-- Storage: city/state repeated for every customer with the same zip_code
-- Inconsistency risk: two customers with same zip_code can have different cities

-- Another classic 3NF violation:
CREATE TABLE employees_bad (
  employee_id  INTEGER  PRIMARY KEY,
  first_name   VARCHAR(100),
  department   VARCHAR(100),
  dept_head    VARCHAR(100)   -- determined by department, not employee_id!
);
-- employee_id → department → dept_head  (TRANSITIVE)`}
      />

      <H>Fixing the 3NF violation</H>

      <CodeBlock
        label="3NF fix — extract the transitive dependency"
        code={`-- BEFORE (3NF violation):
customers(customer_id, first_name, email, zip_code, city, state)

-- AFTER (3NF compliant):
-- Table 1: Customer facts that depend directly on customer_id
CREATE TABLE customers (
  customer_id  INTEGER      PRIMARY KEY,
  first_name   VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL UNIQUE,
  zip_code      VARCHAR(10)
  -- city and state removed — they belong in a zip_codes table
);

-- Table 2: Zip Code facts (city and state depend on zip_code, not customer)
CREATE TABLE zip_codes (
  zip_code  VARCHAR(10)   PRIMARY KEY,
  city     VARCHAR(100)  NOT NULL,
  state    VARCHAR(100)  NOT NULL
);

-- employees fix:
CREATE TABLE departments (
  department  VARCHAR(100) PRIMARY KEY,
  dept_head   VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  employee_id  INTEGER       PRIMARY KEY,
  first_name   VARCHAR(100)  NOT NULL,
  department   VARCHAR(100)  REFERENCES departments(department)
  -- dept_head removed — it depends on department, not employee_id
);`}
      />

      <SQLPlayground
        initialQuery={`-- FreshCart employees — checking for transitive dependencies
-- Do any non-key columns in employees depend on other non-key columns?
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.department,
  e.store_id,
  s.city AS store_city,        -- store city is in stores, not employees
  s.manager_name               -- store manager is in stores, not employees
FROM employees AS e
JOIN stores AS s ON e.store_id = s.store_id
ORDER BY e.store_id, e.salary DESC;`}
        height={195}
        showSchema={true}
      />

      <P>In FreshCart's employees table, store_id is stored in employees and the store's city and manager_name are in the stores table. This is correct 3NF — if we stored store_city in employees, it would be a transitive dependency: employee_id → store_id → city.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="FreshCart — Full Normalisation Walkthrough" />

      <P>Let us walk through the original denormalised FreshCart flat table from Part 01 and normalise it step by step to 3NF.</P>

      <H>Starting point — the flat table (unnormalised)</H>

      <CodeBlock
        label="Unnormalised flat table"
        code={`-- Single flat table with everything mixed together
orders_flat(
  order_id,
  customer_name,    -- should be in customers
  customer_email,   -- should be in customers
  customer_city,    -- should be in customers
  product_name,     -- should be in products
  category,         -- should be in products (depends on product)
  brand,            -- should be in products
  quantity,         -- belongs here (depends on order + product)
  unit_price,       -- belongs here (price at time of order)
  store_city,       -- should be in stores
  store_manager     -- should be in stores
)`}
      />

      <H>Step 1 — Apply 1NF</H>
      <P>Separate repeating groups. Each order can have multiple products — this is a repeating group. Split into orders (one row per order) and order_items (one row per product per order).</P>

      <CodeBlock
        label="After 1NF — two tables"
        code={`orders(order_id, customer_name, customer_email, customer_city,
       store_city, store_manager, order_date)
-- One row per order ✓

order_items(order_id, product_name, category, brand, quantity, unit_price)
-- One row per product per order ✓
-- PK: (order_id, product_name) — composite`}
      />

      <H>Step 2 — Apply 2NF</H>
      <P>In order_items, the composite PK is (order_id, product_name). Check: which columns depend on the FULL PK vs only PART of it?</P>

      <CodeBlock
        label="After 2NF — partial dependencies removed"
        code={`-- order_items partial dependencies:
-- quantity    → depends on (order_id, product_name) ✓ stays
-- unit_price  → depends on (order_id, product_name) ✓ stays (price at time of order)
-- product_name → it IS part of the PK ✓
-- category    → depends only on product_name ✗ move to products table
-- brand       → depends only on product_name ✗ move to products table

-- After 2NF:
order_items(order_id, product_id, quantity, unit_price)
-- product_name, category, brand moved to their own table:
products(product_id, product_name, category, brand)`}
      />

      <H>Step 3 — Apply 3NF</H>
      <P>Check all tables for transitive dependencies — non-key columns that determine other non-key columns.</P>

      <CodeBlock
        label="After 3NF — transitive dependencies removed"
        code={`-- In orders table:
-- order_id → customer_name (direct) — but customer info should be its own entity
-- order_id → customer_email (depends on customer, not on order)
-- order_id → customer_city (depends on customer)
-- order_id → store_city (depends on store, not on order)
-- order_id → store_manager (depends on store)

-- Transitive chains:
-- order_id → customer_id → customer_email (3NF violation)
-- order_id → store_id → store_manager (3NF violation)

-- After 3NF:
customers(customer_id, customer_name, email, city)
stores(store_id, city, manager_name, monthly_target)
orders(order_id, customer_id, store_id, order_date, total_amount)
products(product_id, product_name, category, brand, unit_price)
order_items(order_id, product_id, quantity, unit_price, line_total)

-- This is exactly FreshCart's schema!`}
      />

      <SQLPlayground
        initialQuery={`-- Reconstruct the original flat view using JOINs
-- This shows what normalisation achieves:
-- store once, query with JOINs to reassemble

SELECT
  o.order_id,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.city                              AS customer_city,
  p.product_name,
  p.category,
  p.brand,
  oi.quantity,
  oi.unit_price,
  s.city                              AS store_city,
  s.manager_name                      AS store_manager
FROM orders AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
JOIN products    AS p  ON oi.product_id  = p.product_id
JOIN stores      AS s  ON o.store_id     = s.store_id
ORDER BY o.order_id, p.product_name
LIMIT 10;`}
        height={240}
        showSchema={false}
      />

      <P>The JOIN query recreates the flat view on demand. The difference: each piece of data is stored exactly once. Updating a customer's city requires updating one row in customers — not scanning millions of order rows. Adding a new product does not require an order. Deleting an order does not lose product or store data.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Denormalisation — When to Break the Rules" />

      <P>Normalisation eliminates redundancy and prevents anomalies. But it has a cost: every query that needs data from multiple tables must perform JOINs. JOINs are powerful but not free — they require the database to match rows across tables, which takes time proportional to the sizes of the tables involved.</P>

      <P>In read-heavy analytical workloads — reporting, dashboards, business intelligence — JOINs across heavily normalised schemas can become the bottleneck. This is where <Hl>denormalisation</Hl> is intentionally applied: trading storage efficiency and update simplicity for query speed.</P>

      <H>When denormalisation is appropriate</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { title: 'Read-heavy analytics', color: C, desc: 'A reporting table queried millions of times per day that is only updated nightly. The update cost is small, the read benefit is large.' },
          { title: 'Data warehouses', color: '#10b981', desc: 'Star schema and snowflake schema in data warehouses intentionally denormalise for analytical query performance.' },
          { title: 'Pre-computed aggregates', color: '#f97316', desc: 'Storing total_amount in orders instead of computing SUM(order_items.line_total) on every order query.' },
          { title: 'High-read lookup data', color: '#8b5cf6', desc: 'Storing city and state on the customer row even though they "belong" in a locations table — if city is filtered on 90% of queries, the JOIN cost adds up.' },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>FreshCart's deliberate denormalisation</H>

      <CodeBlock
        label="Deliberate denormalisation in FreshCart"
        code={`-- orders.total_amount is denormalised
-- It could always be computed as: SELECT SUM(line_total) FROM order_items WHERE order_id = X
-- But storing it directly in orders saves that JOIN+SUM for every order lookup

-- This is a valid denormalisation because:
-- 1. total_amount is queried far more often than it is computed
-- 2. The application maintains consistency: it always updates total_amount when order_items change
-- 3. The performance benefit is significant (no JOIN for the most common query)

-- The trade-off: if an order_items line_total is corrected,
-- total_amount in orders must also be manually updated
-- Application code must maintain this invariant

-- order_items.unit_price is also denormalised:
-- The current product price is in products.unit_price
-- The price AT TIME OF ORDER is stored in order_items.unit_price
-- This is correct — it is a slowly changing dimension (not a 3NF violation)`}
      />

      <ProTip>
        The rule of thumb for denormalisation: normalise first, then selectively denormalise based on measured performance data. Never denormalise speculatively — "this might be slow" is not a reason. Measure the query, confirm the JOIN is the bottleneck, then denormalise the specific data that eliminates the bottleneck. Document every denormalisation decision and how the application maintains data consistency.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Functional Dependencies — The Theory Behind Normalisation" />

      <P>Understanding normalisation deeply requires understanding <Hl>functional dependencies</Hl> — the formal mathematical concept that normal forms are built on.</P>

      <H>Definition</H>
      <P>A functional dependency A → B (read: "A determines B") means that for any two rows with the same value of A, those rows will always have the same value of B. Knowing A is enough to know B.</P>

      <CodeBlock
        label="Functional dependencies in FreshCart"
        code={`-- These functional dependencies exist in FreshCart's data:

customer_id → first_name          -- one customer_id has one first_name
customer_id → email               -- one customer has one email
customer_id → city                -- one customer has one city
product_id  → product_name        -- one product has one name
product_id  → category            -- one product belongs to one category
product_id  → unit_price          -- one product has one current price
store_id    → city                -- one store is in one city
store_id    → manager_name        -- one store has one manager
order_id    → customer_id         -- one order belongs to one customer
order_id    → order_date          -- one order has one date
order_id    → total_amount        -- one order has one total

-- Composite key dependency:
(order_id, product_id) → quantity     -- one line item has one quantity
(order_id, product_id) → unit_price   -- one line item has one price at order time

-- Transitive dependencies (these would violate 3NF if in the wrong table):
customer_id → city    (would violate 3NF if city were stored in orders)
store_id → manager_name (would violate 3NF if stored in orders)`}
      />

      <H>Using functional dependencies to test normal forms</H>

      <CodeBlock
        label="Systematic normalisation test"
        code={`-- For any table, to check its normal form:

-- 1NF test: Is every column atomic?
--   "tags VARCHAR containing 'dairy,fresh,organic'" → FAIL 1NF

-- 2NF test (only for composite PKs): Does every non-key column
--   depend on the FULL primary key?
--   In order_items(order_id, product_id, quantity, product_name):
--   product_name depends only on product_id (partial) → FAIL 2NF

-- 3NF test: Does any non-key column determine another non-key column?
--   In customers(customer_id, email, city, state):
--   If city → state (a city is always in one state) → CHECK 3NF
--   Actually: in India, a city can span state borders (rare)
--   And a customer might be in a different state than their city suggests
--   So city does NOT reliably determine state → PASS 3NF (in this context)

-- Context matters: functional dependencies are facts about your DOMAIN
-- not about SQL syntax. You must understand the business rules.`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Practical Normalisation — Step-by-Step Design" />

      <P>Here is the practical workflow for designing a normalised schema from scratch, applied to a new FreshCart feature: a supplier management system.</P>

      <H>Requirements from the product team</H>
      <P>FreshCart needs to track: which supplier provides which products, the supplier's contact details, the contract price (may differ from the selling price), the contract start and end dates, and whether the supplier is preferred for that product.</P>

      <TimeBlock time="Step 1" label="Identify all the entities and their attributes">
        Entities: Supplier (name, contact person, phone, email, address), Product (already exists), Supply contract (product, supplier, contract price, start date, end date, is preferred).
      </TimeBlock>

      <TimeBlock time="Step 2" label="Identify the functional dependencies">
        supplier_id → name, contact_person, phone, email, address. product_id → product_name, category (already in products table). (supplier_id, product_id) → contract_price, start_date, end_date, is_preferred (depends on the combination of both).
      </TimeBlock>

      <TimeBlock time="Step 3" label="Design tables based on functional dependencies">
        Each set of attributes with the same determinant becomes a table. The determinant becomes the primary key.
      </TimeBlock>

      <CodeBlock
        label="Normalised supplier schema — 3NF"
        code={`-- Suppliers table: attributes that depend on supplier_id
CREATE TABLE suppliers (
  supplier_id    INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  supplier_name  VARCHAR(200)   NOT NULL,
  contact_person VARCHAR(200)   NOT NULL,
  phone          VARCHAR(20)    NOT NULL,
  email          VARCHAR(255)   NOT NULL UNIQUE,
  city           VARCHAR(100),
  state          VARCHAR(100),
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Supply contracts: attributes that depend on (supplier_id, product_id)
CREATE TABLE supply_contracts (
  supplier_id    INTEGER        NOT NULL REFERENCES suppliers(supplier_id),
  product_id     INTEGER        NOT NULL REFERENCES products(product_id),
  contract_price DECIMAL(10,2)  NOT NULL CHECK (contract_price > 0),
  start_date     DATE           NOT NULL,
  end_date       DATE,
  is_preferred   BOOLEAN        NOT NULL DEFAULT false,
  PRIMARY KEY (supplier_id, product_id),
  -- A product can only have one preferred supplier
  CONSTRAINT uq_preferred_supplier
    UNIQUE (product_id, is_preferred)
    -- Note: in practice this constraint is complex to implement
    -- as UNIQUE allows multiple FALSE values but only one TRUE
);

-- This is 3NF because:
-- All supplier attributes depend directly on supplier_id
-- All contract attributes depend on (supplier_id, product_id)
-- No transitive dependencies
-- supplier city/state depend on supplier_id (the PK) directly`}
      />

      <SQLPlayground
        initialQuery={`-- Preview the supply contract structure with FreshCart data
-- Simulate supplier-product relationships
SELECT
  p.product_id,
  p.product_name,
  p.brand,
  p.category,
  p.unit_price     AS selling_price,
  -- In a real system: contract_price from supply_contracts
  ROUND(p.unit_price * 0.75, 2)  AS estimated_contract_price,
  ROUND((p.unit_price - p.unit_price * 0.75) / p.unit_price * 100, 1) AS margin_pct
FROM products
ORDER BY margin_pct DESC
LIMIT 8;`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are reviewing a database design at a Seattle health-tech startup. A junior engineer has designed a single flat table for their telemedicine platform's appointment system. You need to normalise it.</P>

      <TimeBlock time="9:00 AM" label="The original design arrives">
        The original appointments table:
      </TimeBlock>

      <CodeBlock
        label="Original flat table — needs normalisation"
        code={`CREATE TABLE appointments_flat (
  appointment_id   INTEGER PRIMARY KEY,
  patient_name     VARCHAR(200),
  patient_email    VARCHAR(255),
  patient_phone    VARCHAR(20),
  patient_city     VARCHAR(100),
  doctor_name      VARCHAR(200),
  doctor_phone     VARCHAR(20),
  specialisation   VARCHAR(200),
  consultation_fee DECIMAL(8,2),
  clinic_name      VARCHAR(200),
  clinic_address   VARCHAR(500),
  clinic_city      VARCHAR(100),
  appointment_date DATE,
  appointment_time TIME,
  status           VARCHAR(20),
  notes            TEXT
);`}
      />

      <TimeBlock time="9:30 AM" label="You identify the anomalies">
        Update anomaly: if Dr. Priya Sharma changes her phone, every appointment row must be updated. Deletion anomaly: if all appointments with a clinic are cancelled, the clinic's data is lost. Insertion anomaly: cannot add a doctor to the system without scheduling an appointment.
      </TimeBlock>

      <TimeBlock time="10:00 AM" label="You apply normalisation">
        Identify entities and functional dependencies, then design the 3NF schema.
      </TimeBlock>

      <CodeBlock
        label="Normalised 3NF design"
        code={`-- Entity: Patient (attributes depend on patient_id)
CREATE TABLE patients (
  patient_id   INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name    VARCHAR(200) NOT NULL,
  email        VARCHAR(255) NOT NULL UNIQUE,
  phone        VARCHAR(20)  NOT NULL,
  city         VARCHAR(100)
);

-- Entity: Doctor (attributes depend on doctor_id)
CREATE TABLE doctors (
  doctor_id        INTEGER        PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name        VARCHAR(200)   NOT NULL,
  phone            VARCHAR(20)    NOT NULL,
  email            VARCHAR(255)   NOT NULL UNIQUE,
  specialisation   VARCHAR(200)   NOT NULL,
  consultation_fee DECIMAL(8, 2)  NOT NULL CHECK (consultation_fee > 0)
);

-- Entity: Clinic (attributes depend on clinic_id)
-- (Removed from appointment — transitive dependency)
CREATE TABLE clinics (
  clinic_id    INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  clinic_name  VARCHAR(200) NOT NULL,
  address      VARCHAR(500) NOT NULL,
  city         VARCHAR(100) NOT NULL
);

-- Association: which doctors work at which clinics
CREATE TABLE doctor_clinics (
  doctor_id  INTEGER REFERENCES doctors(doctor_id),
  clinic_id  INTEGER REFERENCES clinics(clinic_id),
  PRIMARY KEY (doctor_id, clinic_id)
);

-- Entity: Appointment (depends on appointment_id)
CREATE TABLE appointments (
  appointment_id   INTEGER      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  patient_id       INTEGER      NOT NULL REFERENCES patients(patient_id),
  doctor_id        INTEGER      NOT NULL REFERENCES doctors(doctor_id),
  clinic_id        INTEGER      NOT NULL REFERENCES clinics(clinic_id),
  appointment_date DATE         NOT NULL,
  appointment_time TIME         NOT NULL,
  -- consultation_fee stored here: price at booking time (may differ from doctor's current fee)
  consultation_fee DECIMAL(8,2) NOT NULL,
  status           VARCHAR(20)  NOT NULL DEFAULT 'Scheduled'
                   CHECK (status IN ('Scheduled','Completed','Cancelled','No-show')),
  notes            TEXT
);`}
      />

      <TimeBlock time="11:00 AM" label="Review and approval">
        You walk through the normalised design with the team. The CTO asks: "Why store consultation_fee in appointments if it is already in doctors?" You explain: the fee at booking time may differ from the doctor's current fee — storing it in appointments is a deliberate denormalisation that preserves historical accuracy (like unit_price in order_items). This is accepted and the design is approved.
      </TimeBlock>

      <ProTip>
        The question "why is this stored here if it's already in the other table?" is one of the most common and most useful questions in schema review. Sometimes the answer is "it should not be here — move it" (a normalisation fix). Sometimes the answer is "it needs to capture the value at a specific point in time, which may differ from the current value" (a valid denormalisation). Learning to distinguish between these two cases is a core database design skill.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is normalisation and what problems does it solve?">
        <p style={{ margin: '0 0 14px' }}>Normalisation is the process of organising a relational database schema to reduce redundancy and eliminate data anomalies. It works by ensuring that each piece of data is stored in exactly one place, and that every column in a table depends on the primary key — not on other non-key columns or on only part of a composite key.</p>
        <p style={{ margin: '0 0 14px' }}>The three anomalies normalisation prevents: Update anomaly — when the same data exists in multiple places, updating it requires finding and changing every occurrence. Missing one creates inconsistency. Insertion anomaly — when data about one entity is mixed with data about another, you cannot insert one without the other. Deletion anomaly — when data about two different entities is stored together, deleting information about one accidentally destroys information about the other.</p>
        <p style={{ margin: 0 }}>A concrete example: storing customer email in an orders table alongside order details means the email must be updated in every order row if it changes. A normalised design stores the email once in a customers table and references it from orders via customer_id. Changing the email requires one update to one row — not thousands of updates across all order rows. This is the fundamental value proposition of normalisation: store each fact exactly once, update it in exactly one place, and never risk inconsistency from partial updates.</p>
      </IQ>

      <IQ q="Explain the difference between 1NF, 2NF, and 3NF with examples.">
        <p style={{ margin: '0 0 14px' }}>First Normal Form (1NF) requires that every column contains a single, atomic (indivisible) value and that there are no repeating groups. A table violates 1NF if a cell contains multiple values (a comma-separated tags list), if the schema uses repeating column groups (product_1, product_2, product_3), or if there are duplicate rows. The fix is always to move multi-valued attributes to a separate table with a FK relationship.</p>
        <p style={{ margin: '0 0 14px' }}>Second Normal Form (2NF) applies only to tables with composite primary keys. It requires that every non-key column depends on the entire composite key — not just part of it. A partial dependency exists when a non-key column can be determined by only one column of the composite key. Example: in order_items(order_id, product_id, quantity, product_name), product_name depends only on product_id, not on the full (order_id, product_id) key — a 2NF violation. Fix: move product_name to a products table keyed by product_id alone.</p>
        <p style={{ margin: 0 }}>Third Normal Form (3NF) requires that no non-key column determines another non-key column. A transitive dependency exists when column A (the PK) determines column B (non-key), and column B determines column C (another non-key). Example: in employees(employee_id, department, dept_head), employee_id → department → dept_head creates a transitive chain. dept_head depends on department, not directly on employee_id. Fix: move (department, dept_head) to a departments table — each department is stored once with its head. The key test: can you update one non-key column without touching the PK? If yes, it should be in a separate table.</p>
      </IQ>

      <IQ q="What is a functional dependency and how does it relate to normalisation?">
        <p style={{ margin: '0 0 14px' }}>A functional dependency A → B (A determines B) means that for any two rows with the same value of A, those rows will always have the same value of B. If you know A, you can uniquely determine B. Functional dependencies are facts about the domain — they reflect business rules about how data relates, not SQL syntax.</p>
        <p style={{ margin: '0 0 14px' }}>Functional dependencies are the mathematical foundation of normal forms. 1NF is about atomicity (no multi-valued attributes). 2NF is about eliminating partial functional dependencies on composite keys. 3NF is about eliminating transitive functional dependencies. BCNF generalises further: for every functional dependency A → B, A must be a superkey. Each normal form is defined in terms of which functional dependencies are or are not allowed.</p>
        <p style={{ margin: 0 }}>Practically, to normalise a schema, you identify all functional dependencies in your domain, group attributes by their determinants (the left-hand side of dependencies), and make each determinant a primary key with its dependent attributes as columns. Attributes with the same determinant belong in the same table. Attributes with different determinants belong in different tables — connected by foreign keys. The resulting schema, built from correctly identified functional dependencies, will automatically be in 3NF.</p>
      </IQ>

      <IQ q="When is it acceptable to denormalise a schema and what are the risks?">
        <p style={{ margin: '0 0 14px' }}>Denormalisation is acceptable when the read performance benefit outweighs the write complexity cost — specifically in read-heavy analytical workloads where the same JOIN computation is performed millions of times per day, and the data being joined changes infrequently. Data warehouses intentionally use denormalised star schemas because analytical queries over billions of rows need to avoid expensive multi-table JOINs. Reporting tables populated nightly from normalised OLTP tables are another common case — the report runs against a flat denormalised table for speed.</p>
        <p style={{ margin: '0 0 14px' }}>Common legitimate denormalisations: storing computed aggregates (total_amount in orders instead of always computing SUM(order_items.line_total)), storing denormalised display values (customer_name on an events table to avoid a JOIN for every event display), and storing point-in-time values that must not change when the source changes (unit_price in order_items).</p>
        <p style={{ margin: 0 }}>The risks: data inconsistency when the denormalised copy falls out of sync with the source. If orders.total_amount is stored but an order_items record is corrected, total_amount must be manually updated too — the database no longer enforces consistency. Application code must maintain the invariant. This requires careful testing, triggers, or event-driven synchronisation. The rule: normalise first, measure performance, denormalise only where you have data showing the JOIN is the bottleneck, and document every denormalisation decision with how consistency is maintained.</p>
      </IQ>

      <IQ q="How does FreshCart's schema demonstrate normalisation principles?">
        <p style={{ margin: '0 0 14px' }}>FreshCart's six-table schema is a clean example of 3NF design. Each entity — customers, products, stores, employees, orders, order_items — has its own table where all columns depend directly on that table's primary key. Customer information (name, email, city) is stored once in customers and referenced by customer_id wherever needed. Product information (name, category, brand) is stored once in products. Store information is in stores. No non-key column in any table determines another non-key column.</p>
        <p style={{ margin: '0 0 14px' }}>The relationships are enforced by foreign keys: orders.customer_id references customers, orders.store_id references stores, order_items.order_id references orders, order_items.product_id references products. This structure means changing a customer's city requires one UPDATE to one row in customers — not thousands of updates across all order rows. Deleting a store does not lose product data. Adding a new product does not require an order to exist first.</p>
        <p style={{ margin: 0 }}>FreshCart has two deliberate denormalisations worth noting: orders.total_amount stores the sum of order_items.line_total — this is a computed aggregate stored for read performance, maintained by application code. order_items.unit_price stores the price at the time of the order, which may differ from the current products.unit_price — this is a point-in-time capture, not redundancy. Both are valid and intentional, following the principle of "normalise first, denormalise only where justified by real performance data."</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Design Mistakes — And How to Recognise Them" />

      <Err
        msg="Data quality issue: two orders show different cities for the same customer — which is correct?"
        cause="Customer city is stored in the orders table (or any child table) rather than in a dedicated customers table. When the customer moved cities and only some orders were updated, different rows ended up with different city values for the same customer. This is a classic update anomaly caused by a 3NF violation — city transitively depends on customer_id through the order, not directly."
        fix="Move city to the customers table where it belongs. Each customer has one city, stored once. UPDATE requires changing one row. All orders automatically reflect the current city via the JOIN. Run a data cleanup: SELECT customer_id, COUNT(DISTINCT city) FROM orders GROUP BY customer_id HAVING COUNT(DISTINCT city) > 1 — find all customers with inconsistent cities. Pick the canonical value and update customers.city. Then remove city from the orders table."
      />

      <Err
        msg="Cannot add a new product to the catalogue — INSERT into products fails because there is no order to attach it to"
        cause="Product information is stored in the orders or order_items table rather than in a standalone products table. This is an insertion anomaly — the schema treats products as a property of orders rather than as an independent entity. You cannot record the existence of a product until an order is placed for it."
        fix="Create a standalone products table with its own primary key. Every product in the catalogue gets a row in products regardless of whether it has ever been ordered. order_items then references products via product_id. This is the correct 2NF/3NF design: product facts (name, category, price) belong in products; order-specific facts (quantity, price at order time) belong in order_items."
      />

      <Err
        msg="Deleting a store record also loses all information about the products that were sold in that store"
        cause="Product information is stored in the same table as store information or order information, rather than in its own products table. When the store record is deleted, the only rows containing that product's details are gone — a deletion anomaly. This happens when the schema does not separate entities into their own tables."
        fix="Ensure each entity (product, store, customer, order) has its own table. Products exist independently of stores and orders. The relationship between stores and orders is captured via orders.store_id (a FK). Deleting a store (assuming RESTRICT) would be prevented if orders reference it — protecting the historical record. The product catalogue exists independently and is unaffected by store deletions."
      />

      <Err
        msg="Report shows incorrect totals — order_items were corrected but orders.total_amount still shows the old value"
        cause="A deliberate denormalisation (storing total_amount in orders alongside the detailed amounts in order_items) has gone out of sync. A correction was made to order_items without updating the aggregate in orders. This is the inherent risk of any denormalisation — the application must maintain consistency between the redundant copies."
        fix="After any correction to order_items, recalculate and update orders.total_amount: UPDATE orders SET total_amount = (SELECT SUM(line_total) FROM order_items WHERE order_id = orders.order_id) WHERE order_id IN (corrected_order_ids). Going forward, either use a trigger to automatically update total_amount when order_items change, or add an application-level invariant that any code path modifying order_items must also recalculate total_amount. Document the denormalisation clearly so future developers know both tables must be updated together."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="A FreshCart analyst built this single flat table for tracking marketing campaigns: campaigns_flat(campaign_id, campaign_name, start_date, end_date, store_id, store_city, store_manager, product_id, product_name, product_category, discount_pct, target_units). Identify: (1) Which normal form does this violate and why? (2) What are the anomalies? (3) Design a normalised 3NF schema with correct tables and FKs. You do not need to write CREATE TABLE — just describe the tables and their columns."
        hint="The flat table has attributes from multiple entities: stores (store_city, store_manager), products (product_name, product_category), and the campaign itself. Identify which columns depend on campaign_id, which on store_id, and which on product_id."
        answer={`-- (1) Normal form violations:
-- Violates 2NF and 3NF.
-- If PK is campaign_id (single column), then 2NF is satisfied but 3NF is violated:
--   store_city and store_manager depend on store_id (not campaign_id) → 3NF violation
--   product_name and product_category depend on product_id (not campaign_id) → 3NF violation
-- Transitive dependencies:
--   campaign_id → store_id → store_city (3NF violation)
--   campaign_id → store_id → store_manager (3NF violation)
--   campaign_id → product_id → product_name (3NF violation)
--   campaign_id → product_id → product_category (3NF violation)

-- (2) Anomalies:
-- Update anomaly: if store manager changes, must update every campaign row for that store
-- Deletion anomaly: deleting all campaigns for a store loses store manager info
-- Insertion anomaly: cannot record a store or product without creating a campaign

-- (3) Normalised 3NF schema:

-- campaigns(campaign_id PK, campaign_name, start_date, end_date)
--   Only campaign-specific facts

-- campaign_stores(campaign_id FK, store_id FK, PRIMARY KEY(campaign_id, store_id))
--   Which stores run this campaign (junction table if many-to-many)

-- campaign_products(campaign_id FK, product_id FK, discount_pct, target_units,
--                   PRIMARY KEY(campaign_id, product_id))
--   Which products are in this campaign + campaign-specific facts (discount, target)

-- stores(store_id PK, store_city, store_manager, ...)
--   Already exists in FreshCart — no change needed

-- products(product_id PK, product_name, product_category, ...)
--   Already exists in FreshCart — no change needed`}
        explanation="The flat table mixes three entities: campaigns, stores, and products. Normalisation separates them. Campaign facts (name, dates) belong in campaigns. Store facts (city, manager) belong in stores (already exists). Product facts (name, category) belong in products (already exists). The relationships between campaigns, stores, and products are captured in junction tables (campaign_stores, campaign_products) which hold only the facts that depend on the combination — like discount_pct and target_units which are specific to a campaign-product pair, not to a product alone. This 3NF design stores each fact once, eliminates all anomalies, and allows campaigns, stores, and products to be managed independently."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Normalisation eliminates three data anomalies: update anomaly (same data in multiple places), insertion anomaly (cannot add one entity without another), and deletion anomaly (deleting one entity accidentally removes another).',
          '1NF: every column is atomic (single value). No lists in cells, no repeating column groups. Fix: move multi-valued attributes to a separate table.',
          '2NF: every non-key column depends on the ENTIRE composite primary key. Only relevant for composite PKs. Fix: move partially dependent columns to a table keyed by the partial key.',
          '3NF: no non-key column determines another non-key column. No transitive dependencies. Fix: extract the transitive chain into its own table with the intermediate column as the PK.',
          'Functional dependency A → B means knowing A uniquely determines B. Normalisation groups attributes by their determinant — each determinant becomes a table\'s primary key.',
          'The target for production databases is 3NF. BCNF, 4NF, and 5NF address increasingly rare edge cases and are rarely needed outside academic or highly specialised contexts.',
          'Denormalisation is intentionally breaking normalisation rules for read performance. Valid for analytics, reporting tables, and pre-computed aggregates. Always: normalise first, measure, then denormalise only where justified.',
          'Storing a value at its point in time (unit_price in order_items, consultation_fee in appointments) is not a 3NF violation — it is a deliberate historical capture. The value captures what was true at that moment, not what is true now.',
          'Every denormalisation creates an application-level invariant: the code must keep all redundant copies in sync. Document every denormalisation and how consistency is maintained.',
          'FreshCart\'s six-table schema is 3NF: each entity has its own table, all columns depend directly on the PK, no transitive dependencies, two deliberate denormalisations (total_amount, order unit_price) with clear business justifications.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 27</strong>, you learn aggregate functions — COUNT, SUM, AVG, MIN, MAX — the tools that turn raw rows into business metrics. This is where SQL becomes the language of analytics.
        </p>
        <Link href="/learn/sql/aggregate-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 27 → Aggregate Functions
        </Link>
      </div>

    </LearnLayout>
  );
}