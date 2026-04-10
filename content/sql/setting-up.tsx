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

const Step = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{n}</div>
      <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />
    </div>
    <div style={{ flex: 1, paddingBottom: 8 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
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

const OptionCard = ({ title, color, badge, pros, cons, best }: {
  title: string; color: string; badge: string;
  pros: string[]; cons: string[]; best: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', flex: 1, minWidth: 240 }}>
    <div style={{ padding: '12px 16px', background: `${color}12`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: 'var(--font-mono)', border: `1px solid ${color}40`, padding: '2px 6px', borderRadius: 4 }}>{badge}</span>
    </div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#00e676', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Pros</p>
      {pros.map(p => <p key={p} style={{ fontSize: 12, color: 'var(--text)', margin: '0 0 4px', lineHeight: 1.6 }}>· {p}</p>)}
      <p style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', textTransform: 'uppercase', letterSpacing: '.08em', margin: '12px 0 6px' }}>Cons</p>
      {cons.map(c => <p key={c} style={{ fontSize: 12, color: 'var(--text)', margin: '0 0 4px', lineHeight: 1.6 }}>· {c}</p>)}
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '12px 0 4px' }}>Best for</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{best}</p>
    </div>
  </div>
);

export default function SettingUp() {
  return (
    <LearnLayout
      title="Setting Up Your Environment"
      description="Install MySQL or PostgreSQL locally, connect with a client, and understand how SQL tools work — or use the browser playground and skip straight to Module 05"
      section="SQL — Module 04"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="You Already Have a Working SQL Environment" />

      <P>Before going any further — you already have a fully functional SQL environment running in your browser. The playground on every page of this course uses <Hl>DuckDB-WASM</Hl> — a real, production-grade database engine that runs entirely in your browser with the complete FreshMart database preloaded. Every query you write here is real SQL. Every concept you learn here works identically in MySQL and PostgreSQL.</P>

      <P>This module is for when you want to go further — when you want a local installation that you can use for your own projects, connect to from your code, or use in job interviews where they ask you to run queries on their database. A local installation is not required to complete any module in this course. If you just want to write SQL, skip to Module 05 right now.</P>

      <Callout type="tip">
        If you are a student or a career switcher just learning SQL for the first time — use the browser playground for now. Come back to this module when you start building a real project or when a company asks you to connect to their database. Do not let setup friction slow your learning.
      </Callout>

      <SQLPlayground
        initialQuery={`-- Your browser playground is already live.
-- This runs against the full FreshMart database right now.
SELECT 'Your SQL environment is ready!' AS status,
       COUNT(*)                          AS customers_loaded
FROM customers;`}
        height={110}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Which Database Should You Install?" />

      <P>If you decide to install a local database, you have three realistic options. Here is exactly how to choose between them.</P>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', margin: '20px 0 32px' }}>
        <OptionCard
          title="PostgreSQL"
          color="#336791"
          badge="Recommended"
          pros={[
            'Open source, completely free forever',
            'Most feature-rich SQL database available',
            'Used by Razorpay, CRED, Zerodha, Groww',
            'Best JSON support (JSONB) for mixed data',
            'Window functions, CTEs, full-text search all work',
            'Standard in modern Indian tech hiring',
          ]}
          cons={[
            'Slightly more complex setup than MySQL',
            'psql command line is less beginner-friendly',
          ]}
          best="First choice if you are learning for a tech career in India. Most startups, most fintech companies, most product companies use PostgreSQL."
        />
        <OptionCard
          title="MySQL"
          color="#4479A1"
          badge="Popular"
          pros={[
            'Easier to install and get started',
            'Massive community, huge amount of tutorials',
            'Used by Swiggy, Nykaa, BookMyShow',
            'MySQL Workbench is a polished GUI',
          ]}
          cons={[
            'Some SQL features behave slightly differently',
            'ONLY_FULL_GROUP_BY mode surprises beginners',
            'NULL handling quirks differ from standard SQL',
          ]}
          best="Good choice if your target company uses MySQL or if you want the easiest possible setup experience."
        />
        <OptionCard
          title="SQLite"
          color="#003B57"
          badge="Simplest"
          pros={[
            'Zero installation — just one file',
            'No server to manage or start',
            'Works on every OS with zero config',
            'Perfect for learning and small projects',
          ]}
          cons={[
            'Not used in production web backends',
            'Missing some advanced features (no full ALTER TABLE)',
            'Single-user only — no concurrent connections',
          ]}
          best="Best if you want the absolute simplest start. Good for learning, mobile app development, or small desktop apps."
        />
      </div>

      <P>The SQL you write in this course works on all three. The tiny syntax differences (like AUTO_INCREMENT vs SERIAL vs INTEGER PRIMARY KEY) are noted where they appear. For the rest of this module, instructions are given for both PostgreSQL and MySQL side by side.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Option A — Online SQL Tools (Zero Install)" />

      <P>Before installing anything locally, consider whether an online tool meets your needs. These are real database servers running in the cloud — you write SQL in the browser, the server executes it, results come back. No install, no account required for most.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          {
            name: 'SQLiteOnline.com',
            color: '#003B57',
            url: 'sqliteonline.com',
            desc: 'Zero friction. Open the URL and start typing SQL. SQLite dialect. Upload your own CSV to create tables. Best for quick experiments.',
            rating: 'Best for: Quick experiments, no setup at all',
          },
          {
            name: 'DB Fiddle',
            color: C,
            url: 'dbfiddle.uk',
            desc: 'Supports MySQL, PostgreSQL, and SQLite. Write your schema in one panel, your query in another, see results instantly. Share your query via URL.',
            rating: 'Best for: Testing queries, sharing with colleagues',
          },
          {
            name: 'Supabase Studio',
            color: '#3ecf8e',
            url: 'supabase.com',
            desc: 'Free account gives you a real PostgreSQL database in the cloud. Full SQL editor, table viewer, and REST API. The closest to a production PostgreSQL without local install.',
            rating: 'Best for: Learning PostgreSQL with a real cloud database',
          },
          {
            name: 'PlanetScale',
            color: '#f97316',
            url: 'planetscale.com',
            desc: 'Free tier gives you a MySQL-compatible database. Built for scale. Good if you want to learn with a cloud MySQL database.',
            rating: 'Best for: Learning MySQL with cloud hosting',
          },
        ].map(tool => (
          <div key={tool.name} style={{ background: 'var(--surface)', border: `1px solid ${tool.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: tool.color, display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{tool.name}</span>
            </div>
            <p style={{ fontSize: 11, color: tool.color, fontFamily: 'var(--font-mono)', margin: '0 0 8px' }}>{tool.url}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.6 }}>{tool.desc}</p>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{tool.rating}</p>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Option B — Install PostgreSQL Locally" />

      <H>Windows</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '16px 0 24px' }}>
        <Step n="1" title="Download the installer">
          Go to <span style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 13 }}>postgresql.org/download/windows</span> and download the latest stable version (PostgreSQL 16 as of April 2026). Run the .exe installer.
        </Step>
        <Step n="2" title="Run the installer">
          Accept defaults on every screen. When asked for a password — set it to something simple you will remember, like <span style={{ fontFamily: 'var(--font-mono)', color: C }}>postgres123</span>. Write it down. The default port is 5432 — leave it. When asked about components, keep all of them selected including pgAdmin 4.
        </Step>
        <Step n="3" title="Verify the installation">
          Open the Windows search bar, type <span style={{ fontFamily: 'var(--font-mono)', color: C }}>psql</span> and open the SQL Shell (psql). Press Enter four times to accept the defaults (server, database, port, username), then type your password. You should see the prompt: <span style={{ fontFamily: 'var(--font-mono)', color: C }}>postgres=#</span>
        </Step>
        <Step n="4" title="Run your first command">
          At the prompt, type: <span style={{ fontFamily: 'var(--font-mono)', color: C }}>\l</span> and press Enter. This lists all databases. You should see postgres, template0, and template1. Type <span style={{ fontFamily: 'var(--font-mono)', color: C }}>\q</span> to quit.
        </Step>
      </div>

      <CodeBlock
        label="Verify PostgreSQL is working — run in psql"
        code={`-- At the postgres=# prompt, run:
SELECT version();

-- Expected output (version number will differ):
-- PostgreSQL 16.2, compiled by Visual C++ build 1937, 64-bit`}
      />

      <H>macOS</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '16px 0 24px' }}>
        <Step n="1" title="Install using Homebrew (recommended)">
          If you have Homebrew installed: open Terminal and run <span style={{ fontFamily: 'var(--font-mono)', color: C }}>brew install postgresql@16</span>. If you do not have Homebrew, install it first from <span style={{ fontFamily: 'var(--font-mono)', color: C }}>brew.sh</span> — one command install.
        </Step>
        <Step n="2" title="Start the PostgreSQL service">
          Run: <span style={{ fontFamily: 'var(--font-mono)', color: C }}>brew services start postgresql@16</span>. PostgreSQL is now running as a background service and will start automatically on login.
        </Step>
        <Step n="3" title="Connect to the database">
          Run: <span style={{ fontFamily: 'var(--font-mono)', color: C }}>psql postgres</span>. On macOS with Homebrew, the default user is your macOS username with no password required. You should see: <span style={{ fontFamily: 'var(--font-mono)', color: C }}>postgres=#</span>
        </Step>
        <Step n="4" title="Alternative: Postgres.app">
          If you prefer a GUI-first approach, download <span style={{ fontFamily: 'var(--font-mono)', color: C }}>postgresapp.com</span> — a menu bar app that makes starting and stopping PostgreSQL one click. No Homebrew required.
        </Step>
      </div>

      <H>Linux (Ubuntu / Debian)</H>

      <CodeBlock
        label="Terminal — Ubuntu/Debian"
        code={`# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start the service
sudo systemctl start postgresql
sudo systemctl enable postgresql   # auto-start on boot

# Connect as the postgres superuser
sudo -u postgres psql

# You should see: postgres=#
# Run this to verify:
SELECT version();`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Option C — Install MySQL Locally" />

      <H>Windows</H>
      <P>Download MySQL Installer from <span style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13 }}>dev.mysql.com/downloads/installer</span>. Choose the "mysql-installer-community" option (the larger file). Run the installer, choose "Developer Default" setup type. When prompted for a root password, set something you will remember. The installer also installs MySQL Workbench — a visual client — which is what most beginners use.</P>

      <H>macOS</H>
      <CodeBlock
        label="Terminal — macOS with Homebrew"
        code={`# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Run the secure installation wizard (sets root password)
mysql_secure_installation

# Connect as root
mysql -u root -p
# Enter the password you just set
# You should see: mysql>`}
      />

      <H>Linux (Ubuntu / Debian)</H>
      <CodeBlock
        label="Terminal — Ubuntu/Debian"
        code={`# Install MySQL
sudo apt update
sudo apt install mysql-server

# Run the security setup
sudo mysql_secure_installation

# Connect
sudo mysql -u root -p

# You should see: mysql>`}
      />

      <CodeBlock
        label="Verify MySQL is working — run at the mysql> prompt"
        code={`-- Check the version
SELECT VERSION();

-- List all databases
SHOW DATABASES;

-- Expected output includes: information_schema, mysql, performance_schema, sys`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="SQL Clients — The Tools You Will Actually Use Day to Day" />

      <P>The command-line clients (psql, mysql) work, but most professional SQL work is done in a <Hl>GUI client</Hl> — a visual application where you write queries, see results in a table, browse your schema, and manage connections without memorising command-line flags. Here are the four most-used SQL clients in Indian tech companies.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '16px 0 32px' }}>
        {[
          {
            name: 'DBeaver',
            color: '#8b5cf6',
            price: 'Free & open source',
            supports: 'PostgreSQL, MySQL, SQLite, Oracle, SQL Server, 50+ more',
            desc: 'The most popular SQL client in the world. Connects to any database. Built-in ER diagram generator, data export, schema comparison. The tool used by most data engineers and analysts at Indian startups.',
            download: 'dbeaver.io',
            recommended: true,
          },
          {
            name: 'TablePlus',
            color: '#f97316',
            price: 'Free (limited) / ₹3,500 one-time',
            supports: 'PostgreSQL, MySQL, SQLite, Redis, and more',
            desc: 'Beautiful, fast, native app for macOS and Windows. Excellent tab management, query history, and safe mode (prevents accidental writes in production). Popular at product companies and startups.',
            download: 'tableplus.com',
            recommended: false,
          },
          {
            name: 'pgAdmin 4',
            color: '#336791',
            price: 'Free & open source',
            supports: 'PostgreSQL only',
            desc: 'The official PostgreSQL GUI. Installed automatically with the PostgreSQL Windows installer. Powerful for PostgreSQL-specific features but can be slow. Installed by default — a reliable starting point.',
            download: 'pgadmin.org',
            recommended: false,
          },
          {
            name: 'MySQL Workbench',
            color: '#4479A1',
            price: 'Free & open source',
            supports: 'MySQL only',
            desc: 'The official MySQL GUI from Oracle. Visual query builder, ER diagram tool, performance dashboard. Installed with the MySQL Windows installer. Standard tool in companies running MySQL.',
            download: 'mysql.com/products/workbench',
            recommended: false,
          },
        ].map(client => (
          <div key={client.name} style={{ background: 'var(--surface)', border: `1px solid ${client.color}${client.recommended ? '60' : '25'}`, borderRadius: 10, padding: '16px', position: 'relative' }}>
            {client.recommended && (
              <div style={{ position: 'absolute', top: -1, right: 12, background: client.color, color: '#000', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: '0 0 6px 6px', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Recommended
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: client.color, display: 'inline-block' }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{client.name}</span>
            </div>
            <p style={{ fontSize: 11, color: '#00e676', fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>{client.price}</p>
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.5 }}>{client.supports}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.65 }}>{client.desc}</p>
            <p style={{ fontSize: 11, color: client.color, fontFamily: 'var(--font-mono)', margin: 0 }}>{client.download}</p>
          </div>
        ))}
      </div>

      <ProTip>
        Download DBeaver. It is free, works with every database you will ever use (PostgreSQL, MySQL, SQLite, Oracle, Snowflake, BigQuery — all from one client), and is the tool used by most data engineers and analysts at Indian companies. Learning one client well is more valuable than switching between multiple specialised ones.
      </ProTip>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Load the FreshMart Database Locally" />

      <P>Once your local database is running, you can load the full FreshMart dataset into it. This lets you practice every query from this course on your local machine — useful when you want to experiment beyond what the browser playground allows.</P>

      <H>PostgreSQL</H>
      <CodeBlock
        label="psql — create the FreshMart database"
        code={`-- 1. Connect to PostgreSQL
psql -U postgres

-- 2. Create the database
CREATE DATABASE freshmart;

-- 3. Connect to it
\c freshmart

-- 4. Create the stores table first (other tables reference it)
CREATE TABLE stores (
  store_id        VARCHAR(10)   PRIMARY KEY,
  store_name      VARCHAR(200)  NOT NULL,
  city            VARCHAR(100)  NOT NULL,
  state           VARCHAR(100)  NOT NULL,
  manager_name    VARCHAR(200)  NOT NULL,
  opened_date     DATE          NOT NULL,
  monthly_target  DECIMAL(12,2) NOT NULL
);

-- 5. Create customers
CREATE TABLE customers (
  customer_id   INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  phone         VARCHAR(20),
  city          VARCHAR(100),
  state         VARCHAR(100),
  pincode       VARCHAR(10),
  joined_date   DATE          NOT NULL,
  loyalty_tier  VARCHAR(20)   NOT NULL DEFAULT 'Bronze'
                CHECK (loyalty_tier IN ('Bronze','Silver','Gold','Platinum'))
);

-- 6. Create products
CREATE TABLE products (
  product_id    INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_name  VARCHAR(200)  NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  sub_category  VARCHAR(100),
  brand         VARCHAR(100),
  unit_price    DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  cost_price    DECIMAL(10,2) NOT NULL CHECK (cost_price >= 0),
  unit          VARCHAR(50),
  in_stock      BOOLEAN       NOT NULL DEFAULT true
);

-- 7. Create employees (references stores)
CREATE TABLE employees (
  employee_id   INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  role          VARCHAR(100)  NOT NULL,
  department    VARCHAR(100),
  store_id      VARCHAR(10)   REFERENCES stores(store_id),
  salary        DECIMAL(10,2) NOT NULL CHECK (salary >= 0),
  hire_date     DATE          NOT NULL,
  manager_id    INTEGER       REFERENCES employees(employee_id)
);

-- 8. Create orders (references customers and stores)
CREATE TABLE orders (
  order_id        INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id     INTEGER       NOT NULL REFERENCES customers(customer_id),
  store_id        VARCHAR(10)   NOT NULL REFERENCES stores(store_id),
  order_date      DATE          NOT NULL,
  delivery_date   DATE,
  order_status    VARCHAR(20)   NOT NULL DEFAULT 'Processing'
                  CHECK (order_status IN
                    ('Delivered','Processing','Cancelled','Returned')),
  payment_method  VARCHAR(20)   NOT NULL
                  CHECK (payment_method IN ('UPI','Card','COD','NetBanking')),
  total_amount    DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0)
);

-- 9. Create order_items (references orders and products)
CREATE TABLE order_items (
  item_id       INTEGER       PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id      INTEGER       NOT NULL REFERENCES orders(order_id),
  product_id    INTEGER       NOT NULL REFERENCES products(product_id),
  quantity      INTEGER       NOT NULL CHECK (quantity > 0),
  unit_price    DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  discount_pct  DECIMAL(5,2)  NOT NULL DEFAULT 0
                CHECK (discount_pct >= 0 AND discount_pct <= 100),
  line_total    DECIMAL(10,2) NOT NULL CHECK (line_total >= 0)
);`}
      />

      <H>MySQL</H>
      <CodeBlock
        label="mysql — create the FreshMart database"
        code={`-- 1. Connect to MySQL
mysql -u root -p

-- 2. Create and select the database
CREATE DATABASE freshmart;
USE freshmart;

-- 3. Create tables (same structure, MySQL syntax)
CREATE TABLE stores (
  store_id        VARCHAR(10)   PRIMARY KEY,
  store_name      VARCHAR(200)  NOT NULL,
  city            VARCHAR(100)  NOT NULL,
  state           VARCHAR(100)  NOT NULL,
  manager_name    VARCHAR(200)  NOT NULL,
  opened_date     DATE          NOT NULL,
  monthly_target  DECIMAL(12,2) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE customers (
  customer_id   INTEGER       PRIMARY KEY AUTO_INCREMENT,
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  phone         VARCHAR(20),
  city          VARCHAR(100),
  state         VARCHAR(100),
  pincode       VARCHAR(10),
  joined_date   DATE          NOT NULL,
  loyalty_tier  VARCHAR(20)   NOT NULL DEFAULT 'Bronze'
) ENGINE=InnoDB;

CREATE TABLE products (
  product_id    INTEGER       PRIMARY KEY AUTO_INCREMENT,
  product_name  VARCHAR(200)  NOT NULL,
  category      VARCHAR(100)  NOT NULL,
  sub_category  VARCHAR(100),
  brand         VARCHAR(100),
  unit_price    DECIMAL(10,2) NOT NULL,
  cost_price    DECIMAL(10,2) NOT NULL,
  unit          VARCHAR(50),
  in_stock      TINYINT(1)    NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE employees (
  employee_id   INTEGER       PRIMARY KEY AUTO_INCREMENT,
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  role          VARCHAR(100)  NOT NULL,
  department    VARCHAR(100),
  store_id      VARCHAR(10),
  salary        DECIMAL(10,2) NOT NULL,
  hire_date     DATE          NOT NULL,
  manager_id    INTEGER,
  FOREIGN KEY (store_id)    REFERENCES stores(store_id),
  FOREIGN KEY (manager_id)  REFERENCES employees(employee_id)
) ENGINE=InnoDB;

CREATE TABLE orders (
  order_id        INTEGER       PRIMARY KEY AUTO_INCREMENT,
  customer_id     INTEGER       NOT NULL,
  store_id        VARCHAR(10)   NOT NULL,
  order_date      DATE          NOT NULL,
  delivery_date   DATE,
  order_status    VARCHAR(20)   NOT NULL DEFAULT 'Processing',
  payment_method  VARCHAR(20)   NOT NULL,
  total_amount    DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (store_id)    REFERENCES stores(store_id)
) ENGINE=InnoDB;

CREATE TABLE order_items (
  item_id       INTEGER       PRIMARY KEY AUTO_INCREMENT,
  order_id      INTEGER       NOT NULL,
  product_id    INTEGER       NOT NULL,
  quantity      INTEGER       NOT NULL,
  unit_price    DECIMAL(10,2) NOT NULL,
  discount_pct  DECIMAL(5,2)  NOT NULL DEFAULT 0,
  line_total    DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
) ENGINE=InnoDB;`}
      />

      <Callout type="info">
        The data INSERT statements (all 208 rows of FreshMart data) are in the <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4 }}>data/sql-freshmart.ts</code> file in the Chaduvuko GitHub repository. Copy the SQL from the <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4 }}>FRESHMART_SEED_SQL</code> constant and run it after the CREATE TABLE statements above.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Understanding SQL Dialects — The Differences That Matter" />

      <P>SQL is a standard (ISO/ANSI SQL) but every database implements it slightly differently. These variations are called <Hl>SQL dialects</Hl>. For 95% of what you write in this course — SELECT, WHERE, JOIN, GROUP BY, window functions, CTEs — the syntax is identical across all relational databases. The differences only show up in specific areas.</P>

      <div style={{ overflowX: 'auto', margin: '16px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Feature', 'PostgreSQL', 'MySQL', 'SQLite / DuckDB'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Auto-increment PK', 'GENERATED ALWAYS AS IDENTITY', 'AUTO_INCREMENT', 'INTEGER PRIMARY KEY (implicit)'],
              ['String concatenation', "|| operator: 'a' || 'b'", "CONCAT('a', 'b')", "|| operator (same as PostgreSQL)"],
              ['Current timestamp', 'NOW() or CURRENT_TIMESTAMP', 'NOW() or SYSDATE()', 'CURRENT_TIMESTAMP'],
              ['Date difference', "date1 - date2 (returns interval)", "DATEDIFF(date1, date2)", "DATEDIFF(date1, date2)"],
              ['Limit rows', 'LIMIT n OFFSET m', 'LIMIT n OFFSET m', 'LIMIT n OFFSET m'],
              ['Boolean type', 'BOOLEAN (true/false)', 'TINYINT(1) (1/0)', 'INTEGER (1/0)'],
              ['String case sensitive?', 'Yes by default', 'No by default (uses collation)', 'Yes by default'],
              ['ILIKE (case-insensitive LIKE)', 'Supported natively', 'Use LIKE (already case-insensitive)', 'Not supported, use LOWER()'],
              ['JSON support', 'JSON, JSONB (binary, indexable)', 'JSON (text-based)', 'Limited JSON functions'],
              ['Full text search', 'tsvector/tsquery built-in', 'FULLTEXT index', 'FTS5 extension'],
            ].map(([feat, pg, my, sq], i) => (
              <tr key={feat} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{feat}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{pg}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4479A1', borderBottom: '1px solid var(--border)' }}>{my}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{sq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>In this course, when a syntax difference matters we will show both the PostgreSQL/standard version and the MySQL version. The concepts — what the query is doing — are always the same. The dialect is just the spelling.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="VS Code as a SQL Editor — The Professional Setup" />

      <P>Most professional SQL work at Indian tech companies does not happen in pgAdmin or MySQL Workbench. It happens in <Hl>VS Code</Hl> with database extensions. This gives you SQL editing with autocomplete, syntax highlighting, query history, and schema browsing — all inside the same editor you use for everything else.</P>

      <H>Setup: VS Code + SQLTools</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '16px 0 28px' }}>
        <Step n="1" title="Install VS Code">
          Download from <span style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13 }}>code.visualstudio.com</span> — free for all platforms.
        </Step>
        <Step n="2" title="Install the SQLTools extension">
          Open VS Code → press Ctrl+Shift+X → search "SQLTools" → install the extension by Matheus Teixeira.
        </Step>
        <Step n="3" title="Install the driver for your database">
          SQLTools needs a driver plugin for each database type. In the Extensions panel, also install: "SQLTools PostgreSQL/Cockroach Driver" for PostgreSQL, or "SQLTools MySQL/MariaDB/TiDB Driver" for MySQL.
        </Step>
        <Step n="4" title="Add a connection">
          Click the SQLTools icon in the VS Code sidebar (looks like a database cylinder) → click Add New Connection → fill in: host (localhost), port (5432 or 3306), database (freshmart), username, password. Click Test Connection to verify, then Save.
        </Step>
        <Step n="5" title="Open a SQL file and run queries">
          Create a new file with a .sql extension. Write any SQL query. Press Ctrl+Shift+E (or click Run on Selection in the SQLTools toolbar) to execute it. Results appear in a panel below. Ctrl+E runs the entire file.
        </Step>
      </div>

      <ProTip>
        VS Code with SQLTools is how most data engineers and analysts actually work in production. You can have your Python pipeline code open in one tab and the SQL it uses in the next tab — same editor, same shortcuts, same git integration. It is a significantly better workflow than switching between separate applications.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You join a Bangalore startup as a data analyst. On your first day, the engineering manager gives you database credentials and tells you to explore the data before your first standup. Here is exactly what that first hour looks like.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '16px 0 32px' }}>
        <Step n="1" title="You receive a credentials file">
          The manager shares a Bitwarden entry (or a secure Slack message) with: Host, Port, Database name, Username, Password. Sometimes also an SSL certificate file if the database requires encrypted connections.
        </Step>
        <Step n="2" title="You open DBeaver and create a new connection">
          File → New Database Connection → choose PostgreSQL → paste in the credentials → click Test Connection. It shows "Connected" in green. You now have access to the production (or staging) database.
        </Step>
        <Step n="3" title="You explore the schema before writing a single query">
          In DBeaver's left panel you can see all tables. You expand each one to see its columns and data types. You look at the ER diagram (right-click the database → Tools → Entity Relationship Diagram) to understand how tables connect. This is called schema exploration and it is the first thing every experienced data person does with a new database.
        </Step>
        <Step n="4" title="You write a safe exploration query first">
          Before running any query that could be slow, you run a COUNT: <span style={{ fontFamily: 'var(--font-mono)', color: C, fontSize: 13 }}>SELECT COUNT(*) FROM orders;</span> — this tells you the table size instantly. A 100-row table vs a 500-million-row table changes how you write every subsequent query. Always check table sizes before running heavy queries on production databases.
        </Step>
        <Step n="5" title="You add LIMIT to every exploratory query">
          Your first queries on any unknown table always end with LIMIT 10 or LIMIT 100. This prevents accidentally running a SELECT * on a 500-million-row table and bringing down the database. Only remove the LIMIT once you know the table size and have added appropriate WHERE filters or indexes.
        </Step>
      </div>

      <CodeBlock
        label="The first queries every data person runs on a new database"
        code={`-- 1. Check what tables exist (PostgreSQL)
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Check table sizes before touching them
SELECT
  relname                              AS table_name,
  n_live_tup                           AS row_count,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;

-- 3. Safe exploration — always LIMIT first
SELECT * FROM orders LIMIT 10;

-- 4. Check column names and types
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'orders'
ORDER BY ordinal_position;`}
      />

      <HR />

      {/* ── Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between PostgreSQL and MySQL? Which would you recommend for a new project?">
        <p style={{ margin: '0 0 14px' }}>PostgreSQL and MySQL are both mature, production-grade open-source relational databases. The practical differences: PostgreSQL is more standards-compliant — it follows the SQL standard more closely and supports more advanced features natively, including better window functions, more flexible JSONB storage and indexing, more powerful full-text search, and a broader set of data types. MySQL has a simpler setup experience and historically had better replication tooling, which made it dominant in high-read consumer web applications.</p>
        <p style={{ margin: '0 0 14px' }}>The Indian tech industry has largely converged on PostgreSQL for new projects. Razorpay, CRED, Zerodha, Groww, and most high-growth startups choose PostgreSQL. MySQL remains strong in companies that built their stack before 2015 (Swiggy, Nykaa) and are maintaining existing infrastructure.</p>
        <p style={{ margin: 0 }}>For a new project in 2026, I would recommend PostgreSQL. It handles every workload MySQL handles, plus more advanced analytical queries, better JSON support, and stronger compliance with the SQL standard — meaning less surprising behaviour when writing complex queries.</p>
      </IQ>

      <IQ q="What is the information_schema and how is it useful?">
        <p style={{ margin: '0 0 14px' }}>The information_schema is a read-only schema that exists in every SQL-compliant database (PostgreSQL, MySQL, SQLite) containing metadata about the database itself — tables, columns, constraints, indexes, views, and privileges. It is a database of databases: you query it with SQL just like any other table, but instead of business data, it returns information about the database structure.</p>
        <p style={{ margin: '0 0 14px' }}>The most useful tables in information_schema: information_schema.tables lists every table and view in the database with their names, schemas, and row estimates. information_schema.columns lists every column in every table — its name, data type, whether it is nullable, and its default value. information_schema.table_constraints lists all constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) on every table. information_schema.referential_constraints shows foreign key relationships between tables.</p>
        <p style={{ margin: 0 }}>In practice, information_schema is used for: automated documentation generation, schema migration scripts that need to check whether a table or column already exists before creating it, data profiling tools, and ad-hoc exploration when joining a new project and trying to understand the database structure programmatically.</p>
      </IQ>

      <IQ q="What is a SQL client and how does it differ from the database server?">
        <p style={{ margin: '0 0 14px' }}>A database server is the software that runs continuously in the background, manages data storage, processes queries, and enforces all database rules. It listens on a network port (5432 for PostgreSQL, 3306 for MySQL) for incoming connections. The server is where your data lives and where queries are executed.</p>
        <p style={{ margin: '0 0 14px' }}>A SQL client is any software that connects to the database server, sends queries, and displays the results. The client does no execution — it sends SQL text to the server over the network, receives the result set back, and presents it in a usable format. A client can be a command-line tool (psql, mysql), a GUI application (DBeaver, TablePlus, pgAdmin), or application code in any language (Python with psycopg2, Node.js with pg, Java with JDBC).</p>
        <p style={{ margin: 0 }}>The distinction matters for troubleshooting. If a query is slow, the slowness is almost always on the server (bad query plan, missing index, table scan) — not the client. If a connection fails, the problem is between the client and server — network, firewall, credentials, or the server not running. If results look wrong, that is a query logic problem, which belongs to whoever wrote the query.</p>
      </IQ>

      <IQ q="What is the difference between LIMIT and WHERE for controlling result size?">
        <p style={{ margin: '0 0 14px' }}>WHERE and LIMIT both reduce how many rows you see in the output, but they operate at completely different points in query execution and have completely different performance implications.</p>
        <p style={{ margin: '0 0 14px' }}>WHERE filters rows before they are processed — the database reads pages from disk, applies the WHERE condition to each row, and only passes rows that match the condition forward for further processing. If WHERE uses an indexed column, the database can skip entire pages of data and only read the relevant ones. A well-written WHERE clause can turn a full-table scan of 500 million rows into an index lookup of 10 rows — a 50-million-fold performance improvement.</p>
        <p style={{ margin: 0 }}>LIMIT stops returning rows after n have been found. It does not filter rows — it stops counting. Crucially, the database must still find candidate rows (either through a table scan or an index scan) before LIMIT cuts the output. Running SELECT * FROM orders LIMIT 10 without a WHERE clause still potentially triggers a full table scan — the database finds rows in storage order and stops after 10. On a 500-million-row table with no WHERE clause, LIMIT 10 returns fast by luck (first 10 rows happen to be near the start), but it is not a substitute for proper filtering. Always use WHERE to filter the data you actually want; use LIMIT to cap the output size as an additional safeguard.</p>
      </IQ>

      <IQ q="You join a new company and are given database credentials. What are the first things you do before running any queries?">
        <p style={{ margin: '0 0 14px' }}>The first step is to understand the environment you are connecting to — specifically whether this is a production database, a staging database, or a development replica. This changes everything about how carefully you must write queries. On production, a SELECT * on a large table can lock pages and slow down the application. An accidental UPDATE without a WHERE clause can corrupt live data. Always ask which environment the credentials are for and treat production credentials with maximum caution.</p>
        <p style={{ margin: '0 0 14px' }}>Second, explore the schema before writing any business queries. List all tables, look at their structure (columns and data types), and understand the foreign key relationships between them — ideally by looking at an ER diagram if one exists, or generating one from the database client. This prevents writing queries on assumptions that turn out to be wrong about which table holds what data.</p>
        <p style={{ margin: 0 }}>Third, check table sizes before running any broad queries. SELECT COUNT(*) FROM each major table tells you whether you are dealing with 10,000 rows or 10 billion. This knowledge changes how you write every query — whether to add indexes, whether to use LIMIT defensively, whether to run queries during off-peak hours. Only after completing these three steps do you write the first business query — and that first query always starts with LIMIT 100 until you are confident it performs well.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="psql: error: connection to server on socket '/var/run/postgresql/.s.PGSQL.5432' failed: No such file or directory"
        cause="The PostgreSQL server is not running. This is the most common setup error on Linux and macOS. The socket file that psql is trying to connect through does not exist because the database server process is not active. This happens after installation before the first start, after a system restart if the service is not configured to auto-start, or after a crash."
        fix="Start the PostgreSQL service. On Ubuntu/Debian: sudo systemctl start postgresql. On macOS with Homebrew: brew services start postgresql@16. On macOS with Postgres.app: open the app and click Start. Verify it is running: sudo systemctl status postgresql (Linux) or brew services list (macOS). If the service starts but immediately stops, check the PostgreSQL log at /var/log/postgresql/ for the error that caused the crash."
      />

      <Err
        msg="ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost' (10061)"
        cause="The MySQL server is not running or is not accepting connections on the default port 3306. Error 10061 on Windows specifically means 'connection refused' — the port is not open. This typically means the MySQL service has not been started, failed to start, or is running on a different port than 3306."
        fix="On Windows: open Services (Win + R → services.msc), find MySQL80 (or MySQL), right-click → Start. Or from Command Prompt as administrator: net start mysql80. On Linux: sudo systemctl start mysql. Verify MySQL is running and on which port: SHOW VARIABLES LIKE 'port'; run inside mysql if you can connect, or check the my.cnf configuration file at /etc/mysql/my.cnf. If the port differs from 3306, add -P [port] to your mysql connection command."
      />

      <Err
        msg="FATAL: password authentication failed for user 'postgres'"
        cause="The password you are providing does not match the password set for the postgres user in PostgreSQL. This happens when: you set a different password during installation than what you are typing now, the password has special characters that need escaping in the terminal, or the pg_hba.conf file requires a password but you are expecting passwordless access."
        fix="On Linux, if you have sudo access, you can reset the postgres password without knowing the old one: sudo -u postgres psql then ALTER USER postgres WITH PASSWORD 'newpassword'; then \q. On Windows, find pg_hba.conf (usually in C:\Program Files\PostgreSQL\16\data\pg_hba.conf), temporarily change the auth method from 'md5' to 'trust' for local connections, restart PostgreSQL, connect without a password and reset it, then change pg_hba.conf back. If you used the installer, check if the password was saved in the installation log."
      />

      <Err
        msg="ERROR 1819 (HY000): Your password does not satisfy the current policy requirements"
        cause="MySQL has a built-in password validation plugin (validate_password) that enforces minimum complexity rules. By default it requires: at least 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character. If you try to set a simple password like 'password123' during setup, MySQL rejects it."
        fix="Either use a password that meets the policy (e.g. 'Freshmart@2026') or change the policy. To check current policy: SHOW VARIABLES LIKE 'validate_password%'; To lower the requirement temporarily: SET GLOBAL validate_password.policy = LOW; SET GLOBAL validate_password.length = 6; Then set your simpler password: ALTER USER 'root'@'localhost' IDENTIFIED BY 'simple123'; This only affects your local development database — use strong passwords in production."
      />

      <Err
        msg="django.db.utils.OperationalError: could not connect to server: Connection refused (0.0.0.0:5432)"
        cause="Your application is trying to connect to PostgreSQL but the connection is being refused. In a local development environment, this typically means the database server is not running. In a Docker or containerised environment, it usually means the PostgreSQL container has not started yet, or your application container is trying to connect before the database container is ready — a race condition in the startup sequence."
        fix="Local development: start PostgreSQL as described above. Docker Compose: add a depends_on condition with a health check to your service definition so the app container waits for PostgreSQL to be healthy before starting. Check if the host and port in your DATABASE_URL environment variable match where PostgreSQL is actually listening. In Docker, the host is usually the service name (e.g. 'db') not 'localhost' — 'localhost' inside a container refers to the container itself, not the host machine or sibling containers."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="You are given credentials to a new database at your company. Before running any business queries, you want to understand the schema. Using the browser playground (which has the FreshMart database loaded), write a query that shows all the columns in the 'orders' table — their names, data types, and whether they allow NULL."
        hint="Use pragma_table_info('orders') — it returns one row per column with the fields: name, type, notnull, dflt_value, and pk."
        answer={`-- Inspect the orders table structure (SQLite / sql.js)
SELECT
  name        AS column_name,
  type        AS data_type,
  [notnull]   AS not_null,
  dflt_value  AS default_value,
  pk          AS primary_key
FROM pragma_table_info('orders');`}
        explanation="In the playground (which runs SQLite via sql.js), pragma_table_info() is the equivalent of information_schema.columns. It returns one row per column with: name (column name), type (declared data type), notnull (1 if NOT NULL), dflt_value (DEFAULT expression), and pk (1 if part of primary key). In a real PostgreSQL or MySQL database you would use: SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position — the concept is identical, only the syntax differs between engines."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The browser playground on every module page is a full SQL environment using DuckDB-WASM. It is sufficient to complete every module in this course without any local installation.',
          'PostgreSQL is the recommended local database for Indian tech careers in 2026 — used by Razorpay, CRED, Zerodha, Groww, and most high-growth startups.',
          'MySQL is the alternative with easier initial setup — used by Swiggy, Nykaa, and many consumer web companies.',
          'SQLite is the simplest option with zero server setup — runs from a single file. Not used in production web backends but excellent for learning and mobile development.',
          'DBeaver is the recommended SQL client — free, open source, works with PostgreSQL, MySQL, SQLite, Oracle, Snowflake, BigQuery, and 50+ more from one application.',
          'SQL dialects differ in specific areas: auto-increment syntax (GENERATED ALWAYS AS IDENTITY vs AUTO_INCREMENT), string concatenation (|| vs CONCAT()), boolean types, and some date functions. Core SQL — SELECT, WHERE, JOIN, GROUP BY, window functions, CTEs — is 95% identical across all databases.',
          'The information_schema is a built-in read-only schema in every SQL database. Query information_schema.tables for table lists, information_schema.columns for column structure, and information_schema.table_constraints for constraint details.',
          'When joining a new company: confirm whether credentials are for production or staging, explore schema before writing queries, check table sizes with COUNT(*) before running broad queries, and always add LIMIT to exploratory queries.',
          'VS Code with the SQLTools extension is how most data engineers write SQL professionally — same editor, same git integration, autocomplete and schema browsing without switching applications.',
          'The five online SQL tools worth knowing: SQLiteOnline.com (zero friction), DB Fiddle (multi-database), Supabase Studio (real cloud PostgreSQL), PlanetScale (cloud MySQL), and the Chaduvuko browser playground (FreshMart preloaded).',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          <strong>Module 05</strong> is where the actual SQL writing begins. You will write your first real query — SELECT and FROM — and understand exactly what the database does when it executes it. This is the module where SQL starts to feel like a superpower.
        </p>
        <Link href="/learn/sql/select-from" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 05 → Your First Query →
        </Link>
      </div>

    </LearnLayout>
  );
}