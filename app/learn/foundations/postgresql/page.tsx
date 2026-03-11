import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'PostgreSQL for Data Engineers — Asil' }

const conceptsTable = [
  { term: 'Database',   def: 'A container that holds all your tables and data',              example: 'freshmart_db' },
  { term: 'Table',      def: 'Like a spreadsheet — rows and columns of data',               example: 'sales, customers, products' },
  { term: 'Row',        def: 'One single record in a table',                                 example: 'One sale transaction' },
  { term: 'Column',     def: 'A field/attribute every row has',                              example: 'order_id, amount, date' },
  { term: 'Schema',     def: 'A folder inside a database to organise tables',               example: 'raw, silver, gold' },
  { term: 'Query',      def: 'A question you ask the database in SQL',                       example: 'SELECT * FROM sales' },
  { term: 'Primary Key',def: 'A column that uniquely identifies each row',                   example: 'order_id' },
  { term: 'Foreign Key',def: 'A column that links to a primary key in another table',        example: 'store_id → stores.store_id' },
  { term: 'Index',      def: 'A speed-up structure so queries find rows faster',             example: 'Index on order_date' },
  { term: 'NULL',       def: 'A missing or unknown value — not zero, not empty string',     example: 'A sale with no discount' },
]

const dataTypes = [
  { type: 'INTEGER',       use: 'Whole numbers',             example: '1, 42, 1000' },
  { type: 'BIGINT',        use: 'Very large whole numbers',  example: 'Row counts, IDs in large tables' },
  { type: 'NUMERIC(p,s)',  use: 'Exact decimals (money)',    example: 'NUMERIC(10,2) → 29999.99' },
  { type: 'VARCHAR(n)',    use: 'Text with max length',      example: 'VARCHAR(100) for names' },
  { type: 'TEXT',          use: 'Unlimited length text',     example: 'Descriptions, notes' },
  { type: 'BOOLEAN',       use: 'True / False',              example: 'is_active, is_deleted' },
  { type: 'DATE',          use: 'Date only',                 example: '2024-01-15' },
  { type: 'TIMESTAMP',     use: 'Date + Time',               example: '2024-01-15 09:30:00' },
  { type: 'JSONB',         use: 'JSON data (binary, fast)',  example: 'API responses, flexible fields' },
]

const joinTypes = [
  { join: 'INNER JOIN', returns: 'Only rows that match in BOTH tables',        analogy: 'Customers who placed an order' },
  { join: 'LEFT JOIN',  returns: 'All left rows + matching right rows',         analogy: 'All customers, with orders if they have any' },
  { join: 'RIGHT JOIN', returns: 'All right rows + matching left rows',         analogy: 'All orders, with customer details if available' },
  { join: 'FULL JOIN',  returns: 'All rows from both tables, matched where possible', analogy: 'Every customer and every order' },
]

export default function PostgreSQLPage() {
  return (
    <LearnLayout
      title="PostgreSQL for Data Engineers"
      description="The most important database skill you can learn. From absolute zero — install PostgreSQL, understand tables, write real queries, and build skills that every data engineering job requires."
      section="Foundations"
      readTime="90–120 min"
      updatedAt="March 2026"
      prev={{ title: 'SQL for Data Engineers', href: '/learn/foundations/sql' }}
      next={{ title: 'Python for Data Engineers', href: '/learn/foundations/python' }}
    >

      {/* Meta badges */}
      <div className="flex flex-wrap gap-3 my-6">
        {[
          { label: 'Level',      value: 'Absolute Beginner' },
          { label: 'Requires',   value: 'Nothing — start from zero' },
          { label: 'Time',       value: '90–120 minutes' },
          { label: 'Used in',    value: 'Almost every DE job' },
        ].map(item => (
          <div key={item.label} className="px-3 py-2 rounded-lg text-xs"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{item.label}: </span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* What you will learn */}
      <div className="my-6 p-5 rounded-xl"
        style={{ background: 'var(--surface)', border: '2px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          What you will learn
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Install PostgreSQL, create a real database, write SELECT / INSERT / UPDATE / DELETE queries,
          understand JOINs, and learn the patterns data engineers use every single day.
        </p>
      </div>

      {/* ── SECTION 1 — What is PostgreSQL ── */}
      <h2>What is PostgreSQL?</h2>
      <p>
        PostgreSQL (often called "Postgres") is a <strong>relational database</strong> — a system that stores data
        in organised tables with rows and columns, like a very powerful, programmable spreadsheet.
      </p>
      <p>
        It has been in development since 1986, it is completely free and open source, and it is trusted by
        companies like Apple, Instagram, Spotify, and thousands of others to store billions of rows of data.
      </p>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🆓', title: 'Free Forever',     desc: 'Open source — no licencing cost, ever. Used by startups and Fortune 500 companies equally.' },
          { icon: '💪', title: 'Extremely Powerful', desc: 'Handles everything from 1,000 rows to billions of rows. Used in production at massive scale.' },
          { icon: '🏢', title: 'Industry Standard', desc: 'If a job says "SQL experience required" — PostgreSQL knowledge covers it completely.' },
        ].map(c => (
          <div key={c.title} className="p-4 rounded-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-2xl mb-2">{c.icon}</div>
            <div className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{c.title}</div>
            <p className="text-xs" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h3>PostgreSQL vs Other Databases</h3>
      <div className="overflow-x-auto my-6 rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface)' }}>
              {['Database', 'Type', 'Free?', 'When used in DE'].map(h => (
                <th key={h} className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', 'Relational', '✅ Yes', 'Source systems, staging, metadata stores'],
              ['MySQL',      'Relational', '✅ Yes', 'Web app backends, OLTP source systems'],
              ['SQL Server', 'Relational', '❌ Paid', 'Enterprise source systems (common in Azure)'],
              ['BigQuery',   'Cloud DW',   '💳 Pay per query', 'GCP analytics warehouse'],
              ['Snowflake',  'Cloud DW',   '💳 Pay per use',   'Multi-cloud analytics warehouse'],
              ['MongoDB',    'Document',   '✅ Free tier',      'Semi-structured / JSON data'],
            ].map(([db, type, free, when], i) => (
              <tr key={db} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td className="py-2 px-4 font-mono font-bold" style={{ color: 'var(--accent)' }}>{db}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{type}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{free}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info">
        As a data engineer you will constantly pull data <strong>from</strong> PostgreSQL (source systems) and
        sometimes use it <strong>as</strong> a staging or metadata store. Understanding it deeply is non-negotiable.
      </Callout>

      {/* ── SECTION 2 — Install ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PHASE 1 — INSTALL POSTGRESQL
      </div>

      <h2>Step 1 — Download and Install PostgreSQL</h2>
      <p>Go to <strong>postgresql.org/download</strong> → choose your operating system → download the installer.</p>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { os: '🪟 Windows', steps: ['Run the .exe installer', 'Click Next through all steps', 'Set a password for the postgres user — remember this!', 'Keep default port: 5432', 'pgAdmin will be installed automatically'] },
          { os: '🍎 Mac',     steps: ['Download the .dmg installer', 'Drag to Applications', 'Or use Homebrew: brew install postgresql@16', 'Start with: brew services start postgresql@16', 'pgAdmin: download separately from pgadmin.org'] },
        ].map(item => (
          <div key={item.os} className="p-4 rounded-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="font-semibold text-sm mb-3" style={{ color: 'var(--text)' }}>{item.os}</div>
            <ol className="space-y-1">
              {item.steps.map((s, i) => (
                <li key={i} className="text-xs flex gap-2" style={{ color: 'var(--text2)' }}>
                  <span className="font-mono font-bold flex-shrink-0" style={{ color: 'var(--accent)' }}>{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <Callout type="warning">
        Remember the <strong>password</strong> you set for the postgres user during installation.
        You will need it every time you connect. If you forget it, reinstalling is the easiest fix.
      </Callout>

      <h2>Step 2 — Open pgAdmin (Your Visual Interface)</h2>
      <p>
        pgAdmin is the free visual tool that comes with PostgreSQL. It lets you browse databases,
        run queries, and see your data without typing everything in a terminal.
      </p>
      <p>
        Open pgAdmin from your Start Menu / Applications → it opens in your browser →
        enter the password you set during installation.
      </p>

      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>pgAdmin left panel structure</div>
        <p style={{ color: 'var(--accent)' }}>Servers</p>
        <p className="pl-4" style={{ color: 'var(--text2)' }}>└── PostgreSQL 16</p>
        <p className="pl-8" style={{ color: 'var(--text2)' }}>└── Databases</p>
        <p className="pl-12" style={{ color: '#00e676' }}>└── postgres  ← default database, always exists</p>
        <p className="pl-16" style={{ color: 'var(--muted)' }}>└── Schemas → public → Tables</p>
      </div>

      {/* ── SECTION 3 — Key concepts ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#0078d415', color: '#50b0ff' }}>
        PHASE 2 — UNDERSTAND THE BASICS
      </div>

      <h2>Core Concepts You Must Know</h2>

      <div className="overflow-x-auto my-6 rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface)' }}>
              {['Term', 'What It Means', 'Example'].map(h => (
                <th key={h} className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((c, i) => (
              <tr key={c.term} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td className="py-2 px-4 font-mono font-bold" style={{ color: 'var(--accent)' }}>{c.term}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{c.def}</td>
                <td className="py-2 px-4 font-mono" style={{ color: '#7b61ff' }}>{c.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Data Types — What Type Does Each Column Store?</h3>
      <p>Every column in a table must have a data type. This tells PostgreSQL what kind of data to expect and how to store it efficiently.</p>

      <div className="overflow-x-auto my-6 rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface)' }}>
              {['Type', 'Use For', 'Example'].map(h => (
                <th key={h} className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTypes.map((d, i) => (
              <tr key={d.type} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td className="py-2 px-4 font-mono font-bold" style={{ color: '#00e676' }}>{d.type}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{d.use}</td>
                <td className="py-2 px-4 font-mono" style={{ color: 'var(--muted)' }}>{d.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SECTION 4 — Create DB & Tables ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#ff990015', color: '#ff9900' }}>
        PHASE 3 — CREATE YOUR FIRST DATABASE
      </div>

      <h2>Step 3 — Create a Database</h2>
      <p>
        In pgAdmin → right-click <strong>Databases</strong> → <strong>Create</strong> → <strong>Database</strong>.
        Or open the Query Tool and run:
      </p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2 flex items-center gap-2"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>SQL — Create Database</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.8 }}>{`CREATE DATABASE freshmart_db;`}</pre>
      </div>

      <p>Now connect to it — in pgAdmin click on <strong>freshmart_db</strong> in the left panel, then open the Query Tool (Tools → Query Tool).</p>

      <h2>Step 4 — Create Your First Table</h2>
      <p>
        We will recreate the FreshMart scenario in PostgreSQL. Let us create a <code>stores</code> table and a <code>sales</code> table.
      </p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>SQL — Create stores table</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.8 }}>{`CREATE TABLE stores (
  store_id    VARCHAR(10)  PRIMARY KEY,
  store_name  VARCHAR(100) NOT NULL,
  city        VARCHAR(100) NOT NULL,
  state       VARCHAR(50)  NOT NULL,
  opened_date DATE
);`}</pre>
      </div>

      <div className="my-4 p-4 rounded-xl text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>What each part means:</p>
        {[
          ['store_id VARCHAR(10) PRIMARY KEY', 'Text column, max 10 chars, must be unique — identifies each store'],
          ['store_name VARCHAR(100) NOT NULL',  'Text column, max 100 chars, cannot be empty'],
          ['city VARCHAR(100) NOT NULL',        'City name — required'],
          ['opened_date DATE',                  'Date only — no time. NULL allowed (we did not say NOT NULL)'],
        ].map(([col, desc]) => (
          <div key={col} className="flex gap-3 flex-wrap">
            <code className="flex-shrink-0" style={{ color: '#00e676' }}>{col}</code>
            <span style={{ color: 'var(--muted)' }}>→ {desc}</span>
          </div>
        ))}
      </div>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>SQL — Create sales table</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.8 }}>{`CREATE TABLE sales (
  order_id      VARCHAR(20)    PRIMARY KEY,
  store_id      VARCHAR(10)    NOT NULL REFERENCES stores(store_id),
  product_name  VARCHAR(200)   NOT NULL,
  category      VARCHAR(100),
  quantity      INTEGER        NOT NULL DEFAULT 1,
  unit_price    NUMERIC(10,2)  NOT NULL,
  total_amount  NUMERIC(10,2)  GENERATED ALWAYS AS (quantity * unit_price) STORED,
  order_date    DATE           NOT NULL,
  created_at    TIMESTAMP      DEFAULT NOW()
);`}</pre>
      </div>

      <Callout type="tip">
        <code>REFERENCES stores(store_id)</code> is a <strong>Foreign Key</strong> — it means every
        <code>store_id</code> in the sales table MUST exist in the stores table first. PostgreSQL
        will reject any sale for a store that does not exist. This is called <strong>referential integrity</strong>.
      </Callout>

      {/* ── SECTION 5 — INSERT ── */}
      <h2>Step 5 — Insert Data</h2>
      <p>Tables are empty after creation. Let us add some FreshMart data.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>SQL — Insert stores</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.8 }}>{`INSERT INTO stores (store_id, store_name, city, state, opened_date)
VALUES
  ('ST001', 'FreshMart New Delhi',   'New Delhi',  'Delhi',     '2020-01-15'),
  ('ST002', 'FreshMart Mumbai',      'Mumbai',     'Maharashtra','2020-03-10'),
  ('ST003', 'FreshMart Bangalore',   'Bangalore',  'Karnataka', '2020-06-01'),
  ('ST004', 'FreshMart Chennai',     'Chennai',    'Tamil Nadu','2021-01-20'),
  ('ST005', 'FreshMart Hyderabad',   'Hyderabad',  'Telangana', '2021-04-05');`}</pre>
      </div>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>SQL — Insert sales</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.8 }}>{`INSERT INTO sales (order_id, store_id, product_name, category, quantity, unit_price, order_date)
VALUES
  ('ORD1001', 'ST001', 'Basmati Rice 5kg',    'Grocery',      12,  299.00, '2024-01-15'),
  ('ORD1002', 'ST001', 'Samsung TV 43inch',   'Electronics',   2, 32000.00,'2024-01-15'),
  ('ORD1003', 'ST001', 'Amul Butter 500g',    'Dairy',        25,  240.00, '2024-01-15'),
  ('ORD1004', 'ST002', 'Sunflower Oil 1L',    'Grocery',      18,  145.00, '2024-01-15'),
  ('ORD1005', 'ST002', 'iPhone 14',           'Electronics',   1, 75000.00,'2024-01-15'),
  ('ORD1006', 'ST002', 'Amul Milk 1L',        'Dairy',        40,   62.00, '2024-01-15'),
  ('ORD1007', 'ST003', 'Nike Running Shoes',  'Apparel',       5,  4500.00,'2024-01-16'),
  ('ORD1008', 'ST003', 'Colgate Toothpaste',  'Personal Care',30,   89.00, '2024-01-16'),
  ('ORD1009', 'ST004', 'Levis Jeans',         'Apparel',       8,  2999.00,'2024-01-16'),
  ('ORD1010', 'ST005', 'Dove Soap 100g',      'Personal Care',50,   65.00, '2024-01-16');`}</pre>
      </div>

      {/* ── SECTION 6 — SELECT ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#7b61ff15', color: '#7b61ff' }}>
        PHASE 4 — QUERY YOUR DATA
      </div>

      <h2>Step 6 — SELECT Queries (Reading Data)</h2>
      <p>SELECT is the most important SQL command. It retrieves data from your tables.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>Basic SELECT patterns</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- Get every row and every column
SELECT * FROM sales;

-- Get only specific columns
SELECT order_id, product_name, total_amount FROM sales;

-- Filter rows with WHERE
SELECT * FROM sales WHERE category = 'Electronics';

-- Multiple conditions
SELECT * FROM sales WHERE category = 'Grocery' AND unit_price > 100;

-- Sort results
SELECT * FROM sales ORDER BY total_amount DESC;

-- Limit number of results
SELECT * FROM sales ORDER BY order_date DESC LIMIT 5;

-- Filter by date
SELECT * FROM sales WHERE order_date = '2024-01-15';

-- Filter by date range
SELECT * FROM sales WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';`}</pre>
      </div>

      <Callout type="tip">
        <code>--</code> is a comment in SQL. Anything after <code>--</code> on a line is ignored by PostgreSQL.
        Always comment your queries — your future self will thank you.
      </Callout>

      <h2>Step 7 — Aggregate Functions (Summarising Data)</h2>
      <p>
        Aggregate functions calculate a single value from many rows.
        These are what data engineers use to build summary reports.
      </p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>Aggregate functions</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- Count all rows
SELECT COUNT(*) FROM sales;

-- Sum of all sales
SELECT SUM(total_amount) FROM sales;

-- Average order value
SELECT ROUND(AVG(total_amount), 2) AS avg_order_value FROM sales;

-- Highest and lowest sale
SELECT MAX(total_amount) AS highest, MIN(total_amount) AS lowest FROM sales;

-- Total sales per category  ← this is GROUP BY
SELECT
  category,
  COUNT(*)              AS order_count,
  SUM(total_amount)     AS total_revenue,
  ROUND(AVG(unit_price),2) AS avg_price
FROM sales
GROUP BY category
ORDER BY total_revenue DESC;`}</pre>
      </div>

      <div className="my-4 p-4 rounded-xl text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Expected result of the last query:</p>
        <div className="font-mono space-y-1" style={{ color: 'var(--muted)' }}>
          <p><span style={{ color: '#00e676', display: 'inline-block', width: 160 }}>category</span><span style={{ display: 'inline-block', width: 100 }}>order_count</span><span style={{ display: 'inline-block', width: 140 }}>total_revenue</span>avg_price</p>
          <p><span style={{ display: 'inline-block', width: 160 }}>Electronics</span><span style={{ display: 'inline-block', width: 100 }}>3</span><span style={{ display: 'inline-block', width: 140 }}>139000.00</span>46333.33</p>
          <p><span style={{ display: 'inline-block', width: 160 }}>Apparel</span><span style={{ display: 'inline-block', width: 100 }}>2</span><span style={{ display: 'inline-block', width: 140 }}>26492.00</span>3749.50</p>
          <p><span style={{ display: 'inline-block', width: 160 }}>Dairy</span><span style={{ display: 'inline-block', width: 100 }}>2</span><span style={{ display: 'inline-block', width: 140 }}>5960.00</span>151.00</p>
        </div>
      </div>

      <h2>Step 8 — HAVING (Filter After GROUP BY)</h2>
      <p>
        WHERE filters rows <em>before</em> grouping. HAVING filters <em>after</em> grouping.
        Use HAVING when you want to filter based on an aggregate result.
      </p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>WHERE vs HAVING</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- WHERE filters individual rows before grouping
SELECT category, SUM(total_amount) AS revenue
FROM sales
WHERE order_date >= '2024-01-01'    -- ← filters rows first
GROUP BY category;

-- HAVING filters groups after aggregation
SELECT category, SUM(total_amount) AS revenue
FROM sales
GROUP BY category
HAVING SUM(total_amount) > 5000;    -- ← only show categories with revenue > 5000`}</pre>
      </div>

      {/* ── SECTION 7 — JOINs ── */}
      <h2>Step 9 — JOINs (Combining Tables)</h2>
      <p>
        Real data is almost never in a single table. JOINs combine rows from two or more tables
        based on a related column. This is one of the most important skills in data engineering.
      </p>

      <div className="overflow-x-auto my-6 rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface)' }}>
              {['JOIN Type', 'Returns', 'Real World Analogy'].map(h => (
                <th key={h} className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {joinTypes.map((j, i) => (
              <tr key={j.join} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td className="py-2 px-4 font-mono font-bold" style={{ color: '#00e676' }}>{j.join}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{j.returns}</td>
                <td className="py-2 px-4" style={{ color: 'var(--muted)' }}>{j.analogy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>JOIN examples</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- INNER JOIN — sales with their store name
SELECT
  s.order_id,
  s.product_name,
  s.total_amount,
  st.store_name,
  st.city
FROM sales s
INNER JOIN stores st ON s.store_id = st.store_id;

-- Total revenue per city
SELECT
  st.city,
  COUNT(s.order_id)       AS total_orders,
  SUM(s.total_amount)     AS total_revenue
FROM stores st
LEFT JOIN sales s ON st.store_id = s.store_id
GROUP BY st.city
ORDER BY total_revenue DESC NULLS LAST;`}</pre>
      </div>

      <Callout type="info">
        <code>s</code> and <code>st</code> are <strong>aliases</strong> — short names for tables used inside
        a query. <code>FROM sales s</code> means "call the sales table 's' in this query".
        Aliases make long queries much easier to read.
      </Callout>

      {/* ── SECTION 8 — UPDATE & DELETE ── */}
      <h2>Step 10 — UPDATE and DELETE</h2>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>UPDATE and DELETE</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- UPDATE a single row
UPDATE stores
SET city = 'Bengaluru'
WHERE store_id = 'ST003';

-- UPDATE multiple rows
UPDATE sales
SET category = 'Food & Grocery'
WHERE category = 'Grocery';

-- DELETE a specific row
DELETE FROM sales WHERE order_id = 'ORD1001';

-- DELETE with a condition
DELETE FROM sales WHERE order_date < '2023-01-01';`}</pre>
      </div>

      <Callout type="warning">
        <strong>Always use WHERE with UPDATE and DELETE.</strong> Running <code>DELETE FROM sales</code>
        without a WHERE clause deletes every single row in the table instantly — with no undo.
        Always double-check your WHERE condition before running.
      </Callout>

      {/* ── SECTION 9 — DE patterns ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#00e67615', color: '#00e676' }}>
        PHASE 5 — DATA ENGINEERING PATTERNS
      </div>

      <h2>Patterns Data Engineers Use Every Day</h2>
      <p>These are the SQL patterns you will actually write in a real DE job — not just SELECT * FROM table.</p>

      <h3>1. UPSERT — Insert or Update</h3>
      <p>In pipelines you often need to insert new records but update existing ones. This is called an upsert.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>UPSERT with ON CONFLICT</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`INSERT INTO stores (store_id, store_name, city, state)
VALUES ('ST001', 'FreshMart New Delhi Updated', 'New Delhi', 'Delhi')
ON CONFLICT (store_id)
DO UPDATE SET
  store_name = EXCLUDED.store_name,
  city       = EXCLUDED.city;
-- If ST001 exists → UPDATE it. If not → INSERT it.`}</pre>
      </div>

      <h3>2. CTEs — Clean Up Complex Queries</h3>
      <p>A CTE (Common Table Expression) lets you break a complex query into named steps — like variables in a query.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>CTE example</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`WITH daily_totals AS (
  SELECT
    order_date,
    SUM(total_amount) AS daily_revenue
  FROM sales
  GROUP BY order_date
),
high_revenue_days AS (
  SELECT * FROM daily_totals
  WHERE daily_revenue > 50000
)
SELECT * FROM high_revenue_days ORDER BY daily_revenue DESC;`}</pre>
      </div>

      <h3>3. Window Functions — Rank and Compare Rows</h3>
      <p>Window functions calculate a value for each row based on a group of related rows — without collapsing rows like GROUP BY does.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>Window function examples</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- Rank products by revenue within each category
SELECT
  product_name,
  category,
  total_amount,
  RANK() OVER (PARTITION BY category ORDER BY total_amount DESC) AS rank_in_category
FROM sales;

-- Running total of revenue by date
SELECT
  order_date,
  total_amount,
  SUM(total_amount) OVER (ORDER BY order_date) AS running_total
FROM sales
ORDER BY order_date;`}</pre>
      </div>

      <h3>4. CREATE TABLE AS — Build Summary Tables</h3>
      <p>In pipelines you often materialise a query result into a new table — this is the Silver → Gold pattern.</p>

      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>Create summary table</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 2 }}>{`-- Create a Gold-layer summary table
CREATE TABLE gold_sales_by_store_category AS
SELECT
  st.store_id,
  st.city,
  s.category,
  COUNT(s.order_id)           AS total_orders,
  SUM(s.total_amount)         AS total_revenue,
  ROUND(AVG(s.unit_price), 2) AS avg_unit_price,
  MIN(s.order_date)           AS first_sale_date,
  MAX(s.order_date)           AS last_sale_date
FROM sales s
INNER JOIN stores st ON s.store_id = st.store_id
GROUP BY st.store_id, st.city, s.category;`}</pre>
      </div>

      <Callout type="example">
        This is exactly what the <strong>Silver → Gold</strong> layer looks like in a real Medallion Architecture —
        you read from cleaned data (Silver) and write a business-ready aggregated table (Gold) that analysts
        and dashboards query directly.
      </Callout>

      {/* ── Quick Reference ── */}
      <h2>Quick Reference — Most Used Commands</h2>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'DDL — Structure', color: '#0078d4', cmds: ['CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE TABLE'] },
          { label: 'DML — Data',      color: '#00e676', cmds: ['SELECT', 'INSERT INTO', 'UPDATE ... SET', 'DELETE FROM'] },
          { label: 'Aggregates',      color: '#ff9900', cmds: ['COUNT()', 'SUM()', 'AVG()', 'MAX() / MIN()'] },
          { label: 'Clauses',         color: '#7b61ff', cmds: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'] },
        ].map(g => (
          <div key={g.label} className="p-4 rounded-xl"
            style={{ background: 'var(--surface)', border: `1px solid ${g.color}30` }}>
            <div className="text-xs font-mono font-bold mb-3" style={{ color: g.color }}>{g.label}</div>
            <div className="space-y-1">
              {g.cmds.map(c => (
                <div key={c} className="text-xs font-mono px-2 py-1 rounded"
                  style={{ background: 'var(--bg2)', color: 'var(--text2)' }}>{c}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <KeyTakeaways items={[
        'PostgreSQL is a free, open-source relational database — the most important database skill for any data engineer',
        'Every table must have defined columns with data types — use VARCHAR for text, NUMERIC for money, DATE/TIMESTAMP for time',
        'SELECT, INSERT, UPDATE, DELETE are the four core operations — always use WHERE with UPDATE and DELETE',
        'GROUP BY + aggregate functions (SUM, COUNT, AVG) is how you build summaries — the foundation of every report',
        'JOINs combine data from multiple tables — INNER JOIN for matches only, LEFT JOIN to keep all rows from the left table',
        'CTEs make complex queries readable by breaking them into named steps — use them in every non-trivial query',
        'Window functions (RANK, SUM OVER) calculate per-row values across groups without collapsing rows like GROUP BY',
        'UPSERT (ON CONFLICT DO UPDATE) is the key pattern for idempotent pipeline loads — safe to run multiple times',
        'CREATE TABLE AS SELECT is how you materialise Gold-layer summary tables — the end result of a pipeline',
      ]} />
    </LearnLayout>
  )
}