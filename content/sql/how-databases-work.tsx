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

const TypeRow = ({ type, size, example, use }: { type: string; size: string; example: string; use: string }) => (
  <tr>
    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{type}</td>
    <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{size}</td>
    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{example}</td>
    <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{use}</td>
  </tr>
);

export default function HowDatabasesWork() {
  return (
    <LearnLayout
      title="How Databases Work"
      description="Tables, rows, columns, data types, primary keys, foreign keys, constraints — the complete building blocks"
      section="SQL — Module 02"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What Actually Happens When You Run a Query" />

      <P>Before learning the building blocks of a database, it helps to understand what a database is actually doing every time you interact with it. Most tutorials skip this and jump straight to CREATE TABLE. That creates a mental model of a database as a passive container — a box you put data into and take data out of. The reality is far more active, and understanding it will make every concept in this course easier to grasp.</P>

      <P>Here is the complete journey of a single query — what happens in the milliseconds between you pressing Enter and the result appearing on your screen.</P>

      <div style={{ margin: '28px 0', position: 'relative' }}>
        {[
          { n: '01', title: 'Parser — Read and validate the SQL', body: 'The DBMS first reads your SQL text and checks it for syntax errors. If you wrote SLECT instead of SELECT, it stops here and returns a syntax error. No data is touched. The parser also breaks the query into a parse tree — a structured representation of what you asked for.' },
          { n: '02', title: 'Query Planner — Figure out the best way to answer', body: 'This is the most intelligent part of the database. The query planner looks at your query and decides how to execute it — which indexes to use, in what order to join tables, whether to scan the whole table or jump to specific pages. It generates multiple execution plans, estimates the cost of each one, and picks the cheapest. A badly written query can trick the planner into choosing a slow plan — which is why understanding the internals makes you a better SQL writer.' },
          { n: '03', title: 'Executor — Run the chosen plan', body: 'The executor carries out the plan the query planner chose. It reads pages from the buffer pool (memory) or from disk if they are not already cached, applies filters, joins rows from different tables, applies functions, and assembles the result set.' },
          { n: '04', title: 'Buffer Pool — Serve from memory when possible', body: 'The buffer pool is the database\'s memory cache. Frequently accessed pages of data live here so they do not need to be read from disk on every query. If the page you need is in the buffer pool, the query is served from RAM — extremely fast. If not, the database fetches it from disk — much slower. This is why your second run of the same query is often faster than the first.' },
          { n: '05', title: 'Storage Engine — Read and write to disk', body: 'Underneath everything is the storage engine — the component that physically reads and writes data pages on disk. Different databases use different storage engines with different trade-offs. MySQL\'s default is InnoDB. PostgreSQL uses its own built-in engine. The storage engine also manages the Write-Ahead Log — writing every change to the log before writing to the data pages, ensuring crash safety.' },
          { n: '06', title: 'Transaction Manager — Enforce ACID', body: 'Every query runs inside a transaction, even if you did not explicitly write BEGIN. The transaction manager ensures isolation — other sessions cannot see your in-progress changes — and atomicity — your changes either fully commit or fully roll back. It uses locking mechanisms to coordinate concurrent sessions safely.' },
        ].map((step, i, arr) => (
          <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: i === arr.length - 1 ? 0 : 24 }}>
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{step.n}</div>
              {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />}
            </div>
            <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 8 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{step.body}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="info">
        You do not need to memorise all six steps. What matters is the mental model: SQL is not directly touching files on disk. There is a sophisticated engine between your query and the data — parsing, planning, caching, and enforcing rules at every step. When a query is slow, the problem is almost always in step 2 (the planner chose a bad plan) or step 4 (too many disk reads, not enough in the buffer pool).
      </Callout>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Tables — The Complete Rules" />

      <P>A table is the fundamental unit of storage in a relational database. Every piece of data you ever store lives in a table. Understanding what makes a good table — and what makes a bad one — is the most important design skill in all of SQL. Bad table design causes problems that no amount of clever querying can fix.</P>

      <H>Rule 1: One table, one thing</H>
      <P>The single most important rule in database design: each table stores exactly one type of entity. FreshMart has a customers table that stores only customers. A products table that stores only products. An orders table that stores only orders. You would never put customer data and product data in the same table, even though both are used when a customer buys a product.</P>
      <P>When beginners design databases for the first time they often try to put everything in one table — one row per order, with the customer's name, address, and loyalty tier repeated in every single row. This is called data redundancy and it causes serious problems: if Aisha Khan moves from Bangalore to Hyderabad, you have to update her address in every single order row. Miss one row and your data is inconsistent. In a properly designed database you update her address in exactly one place — the customers table — and every order automatically reflects it through the foreign key relationship.</P>

      <H>Rule 2: Every column stores exactly one piece of information</H>
      <P>Each column must represent one atomic, indivisible piece of data. A column called address that stores "12 Koramangala, Bangalore, 560034" is a bad design — city, street, and pincode are three different pieces of information crammed into one column. When you later want to find all customers in Bangalore, you would have to use string pattern matching on the whole address, which is slow and error-prone. Correct design separates them: street, city, state, pincode — four columns, four clean pieces of data.</P>

      <H>Rule 3: Table and column names must be clear, lowercase, and use underscores</H>
      <P>The universal convention for SQL tables and columns: all lowercase letters, words separated by underscores, no spaces, no special characters. <Hl>customers</Hl> not Customers. <Hl>order_date</Hl> not OrderDate or orderDate. <Hl>unit_price</Hl> not UnitPrice or unitprice. This matters because SQL is case-sensitive in some databases for table names, and mixed-case names require quoting everywhere — adding noise to every query you write.</P>

      <H>The FreshMart tables examined</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Table', 'What one thing it stores', 'Why it is separate'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['customers', 'One row per person who shops at FreshMart', 'Customer details (name, city, tier) should only exist in one place — update once, reflected everywhere'],
              ['orders', 'One row per purchase transaction', 'An order has its own attributes (date, status, total) that are not about the customer or the products inside it'],
              ['order_items', 'One row per product line within an order', 'One order can have many products — storing them in the orders table would require an unknown number of columns'],
              ['products', 'One row per thing FreshMart sells', 'Product details (name, price, category) should not be repeated in every order_items row — update once in products'],
              ['stores', 'One row per physical FreshMart location', 'Store details (city, manager, target) are independent of any specific order or customer'],
              ['employees', 'One row per person who works at FreshMart', 'Staff data (salary, role, hire date) is sensitive and operationally separate from customer or product data'],
            ].map(([table, what, why], i) => (
              <tr key={table} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{table}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{what}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Data Types — Choosing the Right Container for Every Column" />

      <P>When you create a table, every column must be given a data type — a declaration of what kind of data that column will hold. This is not just a label. The database uses the data type to: allocate the right amount of storage space, enforce that only valid values can be inserted, and choose the right comparison rules when you filter or sort.</P>

      <P>Choosing the wrong data type is a mistake you cannot fix cheaply. Changing a column from VARCHAR(50) to VARCHAR(255) on a table with 500 million rows can take hours and lock the table. Getting it right at design time is worth the extra five minutes of thought.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Type', 'Storage', 'Example value', 'Use in FreshMart'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TypeRow type="INTEGER" size="4 bytes" example="1, 42, 1001" use="customer_id, product_id, order_id — any whole number ID or count" />
            <TypeRow type="BIGINT" size="8 bytes" example="9876543210" use="phone numbers, large counters — when INTEGER's max of ~2 billion is not enough" />
            <TypeRow type="DECIMAL(10,2)" size="variable" example="340.00, 28.50" use="unit_price, total_amount — money. NEVER use FLOAT for money — floating point arithmetic introduces rounding errors" />
            <TypeRow type="VARCHAR(n)" size="up to n chars" example="'Aisha', 'Bangalore'" use="first_name, city, product_name — variable-length text up to n characters" />
            <TypeRow type="CHAR(n)" size="exactly n chars" example="'ST001'" use="store_id — fixed-length codes where every value is always the same length" />
            <TypeRow type="TEXT" size="unlimited" example="long descriptions" use="product descriptions, notes — when you cannot predict maximum length. Slower to index than VARCHAR" />
            <TypeRow type="DATE" size="3 bytes" example="2024-01-05" use="order_date, joined_date, hire_date — date without time, stored as YYYY-MM-DD" />
            <TypeRow type="TIMESTAMP" size="8 bytes" example="2024-01-05 14:32:11" use="created_at, updated_at — exact moment in time including hours, minutes, seconds" />
            <TypeRow type="BOOLEAN" size="1 byte" example="true, false" use="in_stock — yes/no flags. MySQL stores as TINYINT(1), PostgreSQL has a native BOOL type" />
          </tbody>
        </table>
      </div>

      <H>The money mistake — why FLOAT is wrong for prices</H>
      <P>This is one of the most common beginner mistakes. If you define a price column as FLOAT or DOUBLE, you will eventually get values like 28.499999999998 instead of 28.5. This happens because floating-point numbers are stored in binary and cannot represent most decimal fractions exactly — the same way 1/3 cannot be written as a finite decimal. For currency you must always use <Hl>DECIMAL(precision, scale)</Hl>. In FreshMart, DECIMAL(10,2) means up to 10 total digits with exactly 2 decimal places — sufficient for prices up to ₹99,999,999.99.</P>

      <H>VARCHAR vs CHAR — when to use which</H>
      <P>VARCHAR(n) stores variable-length strings — it only uses as much space as the actual string needs, plus 1–2 bytes to record the length. A VARCHAR(100) column storing the word "Amul" uses 5 bytes, not 100. CHAR(n) stores fixed-length strings — it always uses exactly n bytes, padding shorter values with spaces. Use CHAR for values that are always the same length: country codes (IN, US), store IDs (ST001), status codes. Use VARCHAR for everything else.</P>

      <Callout type="warning">
        In MySQL, TEXT columns cannot be indexed directly (only the first n characters can be indexed). If you need to search or sort on a column, use VARCHAR with an appropriate limit, not TEXT. PostgreSQL does not have this limitation, but the convention of using VARCHAR for indexable columns is still good practice across all databases.
      </Callout>

      <SQLPlayground
        initialQuery={`-- See the data types in action — FreshMart products
-- Notice: prices are clean decimals, dates are formatted,
-- booleans show as true/false
SELECT product_name,
       unit_price,
       cost_price,
       unit_price - cost_price AS margin,
       in_stock
FROM products
ORDER BY margin DESC
LIMIT 8;`}
        height={150}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Primary Keys — Every Row's Unique Identity" />

      <P>A primary key is a column (or combination of columns) that uniquely identifies every row in a table. It is the most fundamental constraint in all of SQL. Every table you will ever create should have one.</P>

      <H>What the database enforces automatically</H>
      <P>When you declare a column as the PRIMARY KEY, the database automatically enforces two rules that you can never break: <Hl>uniqueness</Hl> — no two rows can have the same primary key value, and <Hl>NOT NULL</Hl> — the primary key column can never be empty. You do not need to write separate constraints for these. The PRIMARY KEY declaration implies both.</P>
      <P>The database also automatically creates an index on the primary key column. This means lookups by primary key — the most common type of lookup in any application — are always fast, regardless of how large the table gets.</P>

      <H>Auto-increment — let the database generate IDs</H>
      <P>In almost every table you build, the primary key will be an auto-incrementing integer. This means the database generates the next value automatically whenever you insert a new row. In MySQL this is done with <Hl>AUTO_INCREMENT</Hl>. In PostgreSQL it is done with <Hl>SERIAL</Hl> or <Hl>GENERATED ALWAYS AS IDENTITY</Hl>. You never manually type a primary key value — the database handles it.</P>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '20px 0 28px' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>MySQL syntax</span>
        </div>
        <pre style={{ margin: 0, padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto' }}>
{`CREATE TABLE customers (
  customer_id  INTEGER       PRIMARY KEY AUTO_INCREMENT,
  first_name   VARCHAR(100)  NOT NULL,
  last_name    VARCHAR(100)  NOT NULL,
  email        VARCHAR(255)  NOT NULL UNIQUE,
  city         VARCHAR(100),
  loyalty_tier VARCHAR(20)   DEFAULT 'Bronze',
  joined_date  DATE          NOT NULL
);`}
        </pre>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '20px 0 28px' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>PostgreSQL syntax</span>
        </div>
        <pre style={{ margin: 0, padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto' }}>
{`CREATE TABLE customers (
  customer_id  INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name   VARCHAR(100)  NOT NULL,
  last_name    VARCHAR(100)  NOT NULL,
  email        VARCHAR(255)  NOT NULL UNIQUE,
  city         VARCHAR(100),
  loyalty_tier VARCHAR(20)   DEFAULT 'Bronze',
  joined_date  DATE          NOT NULL
);`}
        </pre>
      </div>

      <H>Composite primary keys — when one column is not enough</H>
      <P>Sometimes a single column is not sufficient to uniquely identify a row, and you need a combination of two columns to serve as the primary key. This is called a <Hl>composite primary key</Hl>. The order_items table is a good example: item_id is a dedicated surrogate key here, but you could also uniquely identify each item by the combination of (order_id, product_id) — one order cannot contain the same product twice. Composite primary keys are common in junction tables (many-to-many relationships). In FreshMart we use a surrogate integer key for simplicity, but both approaches are correct.</P>

      <ProTip>
        Always use a dedicated surrogate integer key (an auto-increment ID) as the primary key, even when another column or combination of columns could uniquely identify rows. Phone numbers change. Email addresses change. Business rules change. An integer ID never needs to change, which means every foreign key referencing it also never needs to change. This saves enormous pain when requirements evolve.
      </ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Foreign Keys — How Tables Connect and Why It Matters" />

      <P>A foreign key is a column in one table that stores the primary key value of a row in another table. It creates an enforced, permanent link between the two tables. Foreign keys are the mechanism that makes a database "relational" in practice — they are what allow you to ask questions that span multiple tables.</P>

      <H>What referential integrity means</H>
      <P>When you declare a foreign key, the database enforces a rule called <Hl>referential integrity</Hl>: every foreign key value must either match an existing primary key value in the referenced table, or be NULL. This has two practical consequences. First, you cannot insert an order with customer_id = 500 if no customer with id 500 exists — the database rejects the insert with an error. Second, you cannot delete a customer who still has orders — the database rejects the delete because it would leave orphaned orders pointing to nobody.</P>

      <H>ON DELETE behaviour — what happens when the parent is deleted</H>
      <P>You can control what happens to child rows when their parent is deleted by specifying a behaviour on the foreign key constraint:</P>

      <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Option', 'What happens', 'When to use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['RESTRICT (default)', 'Prevents deleting the parent if any child rows exist. The delete fails with an error.', 'Most situations — you want to know before deleting a customer that they have 8 orders.'],
              ['CASCADE', 'Automatically deletes all child rows when the parent is deleted.', 'Dependent data that has no meaning without the parent — e.g. deleting a user account deletes their session tokens.'],
              ['SET NULL', 'Sets the foreign key column to NULL in all child rows.', 'When the relationship becomes optional — e.g. an employee\'s manager is deleted but the employee stays.'],
              ['SET DEFAULT', 'Sets the foreign key column to its default value in all child rows.', 'Rare. When child rows should fall back to a default parent.'],
            ].map(([opt, what, when], i) => (
              <tr key={opt} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{opt}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{what}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>The FreshMart foreign key map in code</H>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0 32px' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>Every foreign key in the FreshMart schema</span>
        </div>
        <pre style={{ margin: 0, padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--text)', overflowX: 'auto' }}>
{`-- orders → customers
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

-- orders → stores
FOREIGN KEY (store_id) REFERENCES stores(store_id)

-- order_items → orders
FOREIGN KEY (order_id) REFERENCES orders(order_id)

-- order_items → products
FOREIGN KEY (product_id) REFERENCES products(product_id)

-- employees → stores
FOREIGN KEY (store_id) REFERENCES stores(store_id)

-- employees → employees (self-referencing: manager is also an employee)
FOREIGN KEY (manager_id) REFERENCES employees(employee_id)`}
        </pre>
      </div>

      <P>Notice the last one: employees.manager_id references employees.employee_id — a table referencing itself. This is called a <Hl>self-referencing foreign key</Hl> and it is how org charts and hierarchy data are stored. Priya Sharma (employee_id = 1) is the Store Manager with no manager above her (manager_id = NULL). Rahul Verma (employee_id = 2) reports to Priya, so his manager_id = 1. You will learn to query this hierarchy using SELF JOINs in Module 34.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Constraints — Rules the Database Enforces Automatically" />

      <P>Constraints are rules you attach to columns (or tables) that the database checks on every INSERT and UPDATE. If a value violates a constraint, the operation fails with an error — the data is never saved. Constraints are your first line of defence against bad data. They are far more reliable than checking validity in application code, because application code can have bugs, can be bypassed, and does not cover every path data enters through.</P>

      <H>NOT NULL — the column must always have a value</H>
      <P>By default, any column can contain NULL — the absence of a value. Adding NOT NULL means the column must always have a real value. Inserting a row without providing a value for a NOT NULL column causes an error. In FreshMart, first_name, last_name, and order_date are NOT NULL — it makes no sense to have a customer without a name or an order without a date.</P>

      <H>UNIQUE — no two rows can have the same value</H>
      <P>The UNIQUE constraint prevents duplicate values in a column across all rows. In FreshMart, the email column on customers is UNIQUE — no two customers can share the same email address. Unlike PRIMARY KEY, a UNIQUE column can contain NULL (and multiple NULLs are allowed, since NULL is not equal to NULL in SQL — more on this surprising behaviour in Module 11).</P>

      <H>DEFAULT — the value used when nothing is provided</H>
      <P>The DEFAULT constraint specifies what value the database should use when a row is inserted without providing a value for that column. In FreshMart, loyalty_tier has a DEFAULT of 'Bronze' — when a new customer is added without specifying their tier, they automatically start at Bronze. Defaults keep INSERT statements cleaner and reduce the chance of NULL slipping into columns that should always have a value.</P>

      <H>CHECK — custom rule for valid values</H>
      <P>The CHECK constraint lets you define an arbitrary condition that every value in a column must satisfy. For example, discount_pct in order_items should always be between 0 and 100. A CHECK constraint enforces this: CHECK (discount_pct &gt;= 0 AND discount_pct &lt;= 100). If you try to insert a discount of 150 or -5, the database rejects it immediately.</P>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '20px 0 28px' }}>
        <div style={{ padding: '10px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>All constraints on the FreshMart orders table</span>
        </div>
        <pre style={{ margin: 0, padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto' }}>
{`CREATE TABLE orders (
  order_id       INTEGER        PRIMARY KEY AUTO_INCREMENT,
  customer_id    INTEGER        NOT NULL,
  store_id       VARCHAR(10)    NOT NULL,
  order_date     DATE           NOT NULL,
  delivery_date  DATE,                          -- nullable: NULL until delivered
  order_status   VARCHAR(20)    NOT NULL
                 DEFAULT 'Processing'
                 CHECK (order_status IN
                   ('Delivered','Processing','Cancelled','Returned')),
  payment_method VARCHAR(20)    NOT NULL
                 CHECK (payment_method IN
                   ('UPI','Card','COD','NetBanking')),
  total_amount   DECIMAL(10,2)  NOT NULL
                 CHECK (total_amount >= 0),

  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (store_id)    REFERENCES stores(store_id)
);`}
        </pre>
      </div>

      <Callout type="tip">
        Constraints are your data quality layer at the database level. They work regardless of which application, script, or person inserts data. A bug in your app might skip a validation check. A direct INSERT from the terminal bypasses all app-level validation. Constraints at the database level catch everything.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="The FreshMart Schema — Every Table Examined Line by Line" />

      <P>Now that you understand tables, data types, primary keys, foreign keys, and constraints — let us look at the full FreshMart schema in one place. You will use this schema for every query in every module. Read it carefully and notice how every design decision reflects the rules covered in this module.</P>

      <SQLPlayground
        initialQuery={`-- Explore the customers table structure
-- Every column, its type, and what it holds
SELECT customer_id, first_name, last_name,
       email, city, loyalty_tier, joined_date
FROM customers
ORDER BY joined_date
LIMIT 10;`}
        height={140}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- See how orders connect to customers and stores
-- The customer_id and store_id columns are foreign keys
SELECT o.order_id,
       c.first_name || ' ' || c.last_name AS customer_name,
       o.store_id,
       o.order_date,
       o.order_status,
       o.payment_method,
       o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.order_date
LIMIT 10;`}
        height={170}
        showSchema={false}
      />

      <P>Notice how the second query uses <Hl>JOIN</Hl> to combine orders with customer names. The order table only stores customer_id — a number. To get the actual name, you join to the customers table using the foreign key relationship. This is the relational model working as designed. You will learn exactly how to write JOINs — including multiple-table JOINs — in Modules 30 through 35.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work" />

      <P>You are hired as a junior backend developer at a Bangalore fintech startup. On your second week, you are asked to review a new table that a colleague designed and give feedback before it goes to production. Here is what that day looks like.</P>

      <TimeBlock time="10:00 AM" label="Schema review request arrives">
        Your team lead shares a PR in GitHub. It adds a new table called user_transactions to the database. She asks you to review the schema before it is merged. You open the file.
      </TimeBlock>

      <TimeBlock time="10:15 AM" label="You spot the first problem">
        The table stores user_name, user_email, and user_phone in the transactions table — repeated for every transaction. You immediately recognise this as a violation of the "one table, one thing" rule. If a user updates their phone number, thousands of transaction rows would need to be updated. You add a comment: "User details should live in a users table. transactions should only store user_id as a foreign key."
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="You spot the second problem">
        The amount column is defined as FLOAT. You have been warned about this in Module 03 of your SQL course. Floating point arithmetic will introduce rounding errors on financial data. You add a comment: "Change to DECIMAL(12,2). FLOAT is wrong for money — you will eventually get 199.99999999998 instead of 200."
      </TimeBlock>

      <TimeBlock time="10:45 AM" label="Third problem — missing constraints">
        The status column has no CHECK constraint. Any string value can be inserted — including typos like "COMPLEATED" or "canceld". You suggest adding: CHECK (status IN ('pending', 'completed', 'failed', 'refunded')). You also notice transaction_date has no NOT NULL — a transaction must always have a date.
      </TimeBlock>

      <TimeBlock time="11:00 AM" label="You post the review">
        Three comments, all specific, all backed by reasons. Your team lead replies: "Great catches, fixing now." She tells your manager during standup that you flagged issues that would have caused real problems in three months when the user base grew. You have been at the company for two weeks.
      </TimeBlock>

      <ProTip>
        Knowing database design principles — not just SQL syntax — is what separates developers who write queries from developers who design systems. A PR review comment that catches a FLOAT money column or a missing NOT NULL constraint demonstrates understanding that takes most engineers years to develop. It comes from understanding the why, not just the how.
      </ProTip>

      <HR />

      {/* ── PART 09 — Interview Prep ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between PRIMARY KEY and UNIQUE constraint?">
        <p style={{ margin: '0 0 14px' }}>Both PRIMARY KEY and UNIQUE prevent duplicate values in a column. The differences are three. First, a table can have only one PRIMARY KEY but multiple UNIQUE constraints — you could have unique constraints on both email and phone independently. Second, PRIMARY KEY columns implicitly have NOT NULL — they can never contain a null value. UNIQUE columns can contain NULL, and in most databases multiple NULLs are allowed in a UNIQUE column because NULL is not considered equal to NULL. Third, the PRIMARY KEY is the canonical identifier for the row and is the column other tables reference in their foreign keys. UNIQUE constraints enforce business rules about uniqueness but do not serve as the relational identifier.</p>
        <p style={{ margin: 0 }}>In FreshMart's customers table: customer_id is the PRIMARY KEY — it is the row's identity that orders reference. email has a UNIQUE constraint — we want no two customers sharing the same email, but email is not the identifier we use in foreign keys.</p>
      </IQ>

      <IQ q="What is the difference between DELETE, TRUNCATE, and DROP?">
        <p style={{ margin: '0 0 14px' }}>All three remove data but at very different levels. DELETE removes specific rows from a table based on a WHERE condition. It is a transactional operation — it can be rolled back if inside a transaction. It fires triggers. It is slow on large tables because it logs each deleted row. DELETE without a WHERE clause removes all rows but is still transactional and logged.</p>
        <p style={{ margin: '0 0 14px' }}>TRUNCATE removes all rows from a table much faster than DELETE because it does not log individual row deletions — it deallocates the data pages directly. It cannot be filtered with WHERE. In most databases it cannot be rolled back (though PostgreSQL is an exception — TRUNCATE is transactional there). It resets auto-increment counters. It does not fire row-level triggers.</p>
        <p style={{ margin: 0 }}>DROP removes the table itself — not just the data, but the entire structure, all its constraints, indexes, and any foreign keys referencing it. The table no longer exists after DROP. You need to recreate it from scratch to use it again. DROP is irreversible and should never be run in production without a backup strategy.</p>
      </IQ>

      <IQ q="What is referential integrity and how does a database enforce it?">
        <p style={{ margin: '0 0 14px' }}>Referential integrity is the guarantee that every foreign key value in a table corresponds to an existing primary key value in the referenced table — no row can reference a parent that does not exist. The database enforces this automatically when you declare a FOREIGN KEY constraint.</p>
        <p style={{ margin: '0 0 14px' }}>Enforcement happens at two moments. On INSERT or UPDATE: if you try to insert a row with a foreign key value that does not exist in the parent table, the database rejects the operation with an error. On DELETE or UPDATE of the parent: if you try to delete or change the primary key of a parent row that has child rows referencing it, the database either rejects the operation (RESTRICT) or handles it according to the ON DELETE behaviour you specified (CASCADE, SET NULL, SET DEFAULT).</p>
        <p style={{ margin: 0 }}>Without referential integrity, orphaned records accumulate silently — orders pointing to deleted customers, items pointing to discontinued products. When you join these tables, the orphaned rows silently disappear from results with no error, causing data loss that is difficult to diagnose. Referential integrity prevents this class of problem entirely at the engine level.</p>
      </IQ>

      <IQ q="Why should you never use FLOAT for storing money values in a database?">
        <p style={{ margin: '0 0 14px' }}>FLOAT and DOUBLE are floating-point types that store numbers in binary representation. Most decimal fractions cannot be represented exactly in binary — the same way 1/3 cannot be written as a finite decimal. This means a value you insert as 199.99 might be stored and retrieved as 199.98999999999999. For arbitrary calculations this imprecision is acceptable. For financial data, it is catastrophic.</p>
        <p style={{ margin: '0 0 14px' }}>The consequences compound. If you sum 10,000 transactions each worth ₹199.99, the result might be ₹1,999,899.98 instead of ₹1,999,900. The discrepancy is small on each row but accumulates across millions of transactions. Accounting reconciliation fails. Regulatory audits find inconsistencies. Customers are charged or refunded wrong amounts.</p>
        <p style={{ margin: 0 }}>The correct type for money is DECIMAL(precision, scale) — also called NUMERIC. DECIMAL stores values as exact decimal digits, with no binary conversion. DECIMAL(10,2) stores values from -99,999,999.99 to 99,999,999.99 with perfect precision. This is the universal standard for financial data across every production database. MySQL, PostgreSQL, Oracle, and SQL Server all support it identically.</p>
      </IQ>

      <IQ q="What is a self-referencing foreign key? Give a real example.">
        <p style={{ margin: '0 0 14px' }}>A self-referencing foreign key is a foreign key in a table that references the primary key of the same table. It is used to represent hierarchical relationships where entities of the same type relate to each other — most commonly parent-child or manager-employee relationships.</p>
        <p style={{ margin: '0 0 14px' }}>In FreshMart's employees table, each employee has an employee_id (primary key) and a manager_id (foreign key). The manager_id column references employees.employee_id — a manager is also an employee. Priya Sharma is the Store Manager with employee_id = 1 and manager_id = NULL (she reports to nobody in this dataset). Rahul Verma is her Assistant Manager with employee_id = 2 and manager_id = 1 — he reports to Priya. This single foreign key declaration captures the entire org chart with no additional tables.</p>
        <p style={{ margin: 0 }}>Self-referencing foreign keys appear in: organisational hierarchies (employees and managers), geographic hierarchies (countries containing states containing cities), category trees (a category that has a parent_category_id pointing to another category), and comment threads (a comment with a parent_comment_id pointing to the comment it replies to). You query this structure using a SELF JOIN or, for arbitrary depth, a recursive CTE — covered in Module 34 and Module 56 respectively.</p>
      </IQ>

      <HR />

      {/* ── PART 10 — Error Library ── */}
      <Part n="10" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR 1215 (HY000): Cannot add foreign key constraint"
        cause="The foreign key column and the referenced column do not have exactly matching data types. If customer_id in orders is defined as INT but customer_id in customers is defined as INTEGER UNSIGNED, MySQL treats these as different types and refuses to create the foreign key. Column lengths must also match — a VARCHAR(10) cannot reference a VARCHAR(20). Additionally, the referenced column must be a PRIMARY KEY or have a UNIQUE constraint — you cannot create a foreign key pointing to a regular non-unique column."
        fix="Check that both columns have identical data types including signedness and length. Run SHOW CREATE TABLE customers; and SHOW CREATE TABLE orders; and compare the column definitions side by side. The referenced column must be a primary key or have a unique index. Also ensure the storage engine is InnoDB — MyISAM does not support foreign keys. In PostgreSQL the error is more descriptive: 'there is no unique constraint matching given keys for referenced table.'"
      />

      <Err
        msg="ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'"
        cause="You are trying to insert a row with a primary key value that already exists. This happens most often when: you are manually specifying primary key values in INSERT statements and accidentally repeat one, you are importing data that already has IDs and the auto-increment counter is not in sync with the existing data, or you are restoring a backup into a table that already has rows."
        fix="If you are specifying IDs manually: check which IDs already exist with SELECT MAX(customer_id) FROM customers; and use a higher value. If using AUTO_INCREMENT: do not specify the primary key column in your INSERT — let MySQL generate it. If you are importing data with existing IDs and the table is empty: use TRUNCATE TABLE first to reset the auto-increment counter, then import. If the table has data: run ALTER TABLE customers AUTO_INCREMENT = (SELECT MAX(customer_id) + 1 FROM customers); to sync the counter."
      />

      <Err
        msg="ERROR 3819 (HY000): Check constraint 'orders_chk_1' is violated"
        cause="You are inserting or updating a value that violates a CHECK constraint on the table. For example, if order_status has a CHECK constraint allowing only 'Delivered', 'Processing', 'Cancelled', 'Returned' — and you try to insert 'Pending' (which is not in the list) — the database rejects it. This commonly happens when: you use a value that is valid in your application but was not included in the CHECK list, you have a typo in the value, or the CHECK constraint was defined more restrictively than the application requires."
        fix="Check the exact values the constraint allows: SHOW CREATE TABLE orders; in MySQL or \d orders in PostgreSQL. The constraint definition will be visible. Either change your insert value to match an allowed value, or alter the constraint to include the new valid value: ALTER TABLE orders DROP CONSTRAINT orders_chk_1; then re-add with the updated list. In MySQL 8.0+, CHECK constraints are enforced — in older MySQL versions they were parsed but silently ignored, so you might see this error when upgrading."
      />

      <Err
        msg="ERROR 1292 (22007): Incorrect date value: '2024-31-01' for column 'order_date'"
        cause="The date value is in the wrong format or contains an invalid date. MySQL expects dates as 'YYYY-MM-DD'. The value '2024-31-01' is DD-MM-YYYY format — but MySQL interpreted the 31 as the month, which does not exist. Similarly '2024-02-30' fails because February never has 30 days. Dates imported from spreadsheets frequently have this problem because Excel stores dates in local format."
        fix="Always use ISO 8601 format: 'YYYY-MM-DD'. To convert from other formats during import, use STR_TO_DATE() in MySQL: STR_TO_DATE('31/01/2024', '%d/%m/%Y') returns '2024-01-31'. In PostgreSQL use TO_DATE('31/01/2024', 'DD/MM/YYYY'). When accepting date input from users in applications, always validate and convert to YYYY-MM-DD before passing to SQL — never trust that a user-entered date is in the format the database expects."
      />

      <Err
        msg="Column 'customer_id' cannot be null (errno: 1048)"
        cause="You are inserting a row without providing a value for a NOT NULL column and no DEFAULT is defined. This commonly happens when: you build a dynamic INSERT statement and the variable for that column is undefined or empty, you are inserting with column names listed but omit a required column, or you are copying data between tables and the source column is NULL while the destination has NOT NULL."
        fix="Ensure every NOT NULL column is included in your INSERT with a valid non-null value. If you are building INSERT statements dynamically in code, add a validation step that checks all required fields are populated before executing. If you cannot always guarantee a value, add a DEFAULT to the column definition: ALTER TABLE orders MODIFY customer_id INTEGER NOT NULL DEFAULT 0; — though a DEFAULT of 0 for a foreign key is only appropriate if customer 0 exists as a sentinel value. Better to fix the application logic to always provide the required value."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Look at the FreshMart employees table. Employee ID 1 (Priya Sharma) has manager_id = NULL. Employee ID 2 (Rahul Verma) has manager_id = 1. Employee ID 3 (Sunita Kapoor) has manager_id = 2. Write a query that shows each employee's name alongside their manager's name. What happens to Priya's row since she has no manager?"
        hint="You need to join the employees table to itself. Use two aliases — one for the employee, one for the manager. Use a LEFT JOIN so Priya's row is not excluded just because her manager_id is NULL."
        answer={`SELECT
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  m.first_name || ' ' || m.last_name  AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY e.employee_id
LIMIT 5;`}
        explanation="This is a SELF JOIN — the employees table is joined to itself using two different aliases (e for employee, m for manager). The JOIN condition matches each employee's manager_id to the employee_id of another row in the same table. Using LEFT JOIN ensures Priya Sharma appears in the results even though her manager_id is NULL — her manager column will show NULL (or 'No manager' if you use COALESCE). An INNER JOIN would exclude her row entirely because there is no matching manager row for NULL. You will learn SELF JOINs in full depth in Module 34."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'When you run a query, six components work in sequence: Parser (validates syntax), Query Planner (chooses the best execution plan), Executor (runs the plan), Buffer Pool (serves from memory), Storage Engine (reads disk), Transaction Manager (enforces ACID).',
          'The single most important table design rule: one table stores exactly one type of entity. Mixing customer and order data in one table causes redundancy that leads to inconsistency when data changes.',
          'Every column must store one atomic piece of data. An address column storing "12 Koramangala, Bangalore, 560034" is bad design — split into street, city, state, pincode.',
          'Use DECIMAL(precision, scale) for all money columns. FLOAT and DOUBLE introduce binary rounding errors that accumulate into accounting discrepancies on financial data.',
          'PRIMARY KEY automatically enforces uniqueness and NOT NULL, and creates a B-tree index. Every table needs one. Use auto-increment integers in almost all cases.',
          'UNIQUE allows NULL values (multiple NULLs permitted). PRIMARY KEY does not allow NULL. A table can have one PRIMARY KEY and multiple UNIQUE constraints.',
          'Foreign keys enforce referential integrity — you cannot insert a child row referencing a non-existent parent, and you cannot delete a parent with existing children (by default). Use ON DELETE CASCADE only when child rows have no meaning without their parent.',
          'Constraints (NOT NULL, UNIQUE, DEFAULT, CHECK) enforce data quality at the engine level — they work regardless of which application, script, or person inserts data. Application-level validation can be bypassed; database constraints cannot.',
          'A self-referencing foreign key (manager_id referencing employee_id in the same table) is how hierarchies — org charts, category trees, comment threads — are stored in relational databases.',
          'DROP removes the entire table structure. TRUNCATE removes all rows fast but cannot be filtered by WHERE. DELETE removes specific rows, is transactional, and can be rolled back.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 03</strong>, you learn about the three types of databases — Relational, NoSQL, and NewSQL — what problems each one was built to solve, and how to decide which one is right for any situation. This is the context that makes every tool decision in your career make sense.
        </p>
        <Link href="/learn/sql/types-of-databases" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 03 → Types of Databases
        </Link>
      </div>

    </LearnLayout>
  );
}