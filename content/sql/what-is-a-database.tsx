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

const Step = ({ n, label, children }: { n: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{n}</div>
      <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />
    </div>
    <div style={{ flex: 1, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
    </div>
  </div>
);

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
    <div style={{ flexShrink: 0, textAlign: 'right', width: 90 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

export default function WhatIsADatabase() {
  return (
    <LearnLayout
      title="What is a Database?"
      description="The definition, the internals, the Indian companies using them, and why SQL is the most valuable skill you can learn in tech"
      section="SQL — Module 01"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Definition — And Why Every Other Explanation Fails" />

      <P>Search "what is a database" and you will find answers like <em>"a structured collection of data"</em> or <em>"software for organising information."</em> These are not wrong. They are useless. A notebook is a structured collection of data. A filing cabinet organises information. What makes a database fundamentally different from every other way humans have stored data is not what it holds — it is what it <Hl>guarantees</Hl>.</P>

      <P>Here is the definition that actually explains it:</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>A database is a structured collection of data managed by software that guarantees: every read gets the correct data, every write either fully succeeds or fully fails, multiple users never corrupt each other's changes, and committed data survives any crash — all simultaneously, at any scale.</P>
      </div>

      <P>Every word of that definition is doing work. Let us go through it.</P>

      <P><Hl>"Every read gets the correct data"</Hl> — when your Razorpay app shows your account balance, it must show the real current balance — not a stale version from 3 seconds ago when another transaction was still in progress. Databases use a property called isolation to ensure you never see partial or in-progress data from another user's session.</P>

      <P><Hl>"Every write either fully succeeds or fully fails"</Hl> — if you transfer ₹1000 from your savings to your current account, two things must happen: ₹1000 leaves savings AND ₹1000 enters current. If the server crashes between those two steps, the database must undo the first step automatically. No half-executed operations. This is called atomicity.</P>

      <P><Hl>"Multiple users never corrupt each other's changes"</Hl> — right now, thousands of people are placing Swiggy orders simultaneously. Two customers might order the last item in a restaurant's inventory at the exact same moment. The database ensures exactly one of them gets it and the other sees "out of stock." Without this guarantee, both orders would go through and the restaurant would be in chaos.</P>

      <P><Hl>"Committed data survives any crash"</Hl> — the moment your UPI payment shows "Success," that record is permanent. Even if the bank's server loses power one millisecond later, the transaction is not lost. The database writes to a log on disk before confirming success — if it crashes, it replays the log on restart. This is called durability.</P>

      <P>Together these four guarantees are called <Hl>ACID</Hl> — Atomicity, Consistency, Isolation, Durability. You will learn them deeply in Module 47. For now, know this: every reliable software system you have ever used runs on a database because of these four guarantees. Nothing else provides them.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="What Is Happening Inside — The Internals That Make Everything Click" />

      <P>Most SQL tutorials skip this section entirely and jump straight to SELECT. That works until something goes wrong and you have no idea why your query is slow, or why two rows disagree, or why an index helps. Ten minutes understanding the internals will make you a permanently better SQL writer.</P>

      <H>Data lives in pages on disk</H>
      <P>When you create a table and insert rows, the database does not write one file per row. It groups rows into fixed-size blocks called <Hl>pages</Hl> — typically 8KB or 16KB each. Every read and write to the database happens in units of pages, not individual rows. When you query for one customer, the database loads the entire page containing that customer's row into memory, then finds the row within it.</P>
      <P>This is why column data types matter even for beginners. If you define a column as VARCHAR(1000) when your data is never more than 50 characters, you waste space on every page, meaning fewer rows fit per page, meaning more pages to load, meaning slower queries. Good data type choices are a performance decision, not just a semantic one.</P>

      <H>Indexes — the reason SQL is fast at all</H>
      <P>Without an index, finding a customer by email in a table with 10 million rows requires the database to scan every single page from start to finish. On a table of that size, that takes seconds. With an index on the email column, the database maintains a separate sorted data structure called a <Hl>B-tree</Hl> that lets it jump directly to the right page in microseconds — the same way a book's index lets you jump to the right page instead of reading every word.</P>
      <P>The difference between a query with and without an index on a 10-million-row table is not 10% faster — it is often 1000× faster. You will build indexes in Module 46 and learn exactly when to add them and when they hurt rather than help.</P>

      <H>The buffer pool — why RAM size matters</H>
      <P>Reading from disk is roughly 100,000 times slower than reading from RAM. So the database keeps recently accessed pages in a memory area called the <Hl>buffer pool</Hl>. When you run the same query twice in quick succession, the second run is often dramatically faster because the pages are already in memory — no disk read needed. This is why a database server with more RAM handles more queries without slowing down. It fits more of its "hot" data in the buffer pool.</P>

      <H>The Write-Ahead Log — how data survives crashes</H>
      <P>Before the database writes any change to the actual data pages, it first records the change in a separate sequential file called the <Hl>Write-Ahead Log (WAL)</Hl>. Only after the log entry is safely written to disk does the database confirm the write succeeded. If the server crashes mid-operation, the database reads the WAL on restart and either completes or undoes the interrupted operation. This is the mechanical reason why "committed data survives any crash" is a guarantee, not a hope. It is also why databases recover cleanly from power cuts that would leave a spreadsheet file permanently corrupted.</P>

      <Callout type="info">
        You do not need to memorise these internals to write SQL. But knowing they exist explains everything that seems mysterious later — why indexes speed things up so dramatically, why the same query is slow on a large table but fast on a small one, why adding RAM to a database server often helps more than adding CPU, and why databases recover from crashes that would destroy any other file format.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Tables, Rows, Columns, Primary Keys and Foreign Keys" />

      <P>A relational database stores all data in <Hl>tables</Hl>. A table holds exactly one type of thing. FreshMart has a table for customers, a separate table for orders, one for products, and so on. You never mix two types of things in the same table — that single rule is the most important design principle in all of SQL.</P>

      <H>Rows and Columns</H>
      <P><Hl>Columns</Hl> are the fields — the specific pieces of information you track about that type of thing. <Hl>Rows</Hl> are the individual records — one row per instance. In the FreshMart customers table, columns include first_name, city, and loyalty_tier. Each row is one specific customer.</P>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', margin: '20px 0 32px' }}>
        <div style={{ padding: '10px 16px', background: `${C}15`, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: C, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: C }}>customers</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 6 }}>— one table, one type of thing</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {[
                  { col: 'customer_id', note: '← Primary Key', noteColor: '#f97316' },
                  { col: 'first_name',  note: '← column', noteColor: 'var(--muted)' },
                  { col: 'city',        note: '← column', noteColor: 'var(--muted)' },
                  { col: 'loyalty_tier',note: '← column', noteColor: 'var(--muted)' },
                  { col: 'joined_date', note: '← column', noteColor: 'var(--muted)' },
                ].map(({ col, note, noteColor }) => (
                  <th key={col} style={{ padding: '10px 14px', background: 'var(--surface)', color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                    {col}
                    <div style={{ fontSize: 9, color: noteColor, marginTop: 2, fontWeight: 400 }}>{note}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Aisha',  'Bangalore', 'Gold',   '2022-03-15'],
                ['2', 'Ravi',   'Hyderabad', 'Silver', '2021-07-22'],
                ['3', 'Priya',  'Mumbai',    'Bronze', '2023-01-10'],
                ['4', 'Arjun',  'Ahmedabad', 'Platinum','2022-11-05'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#f97316' : 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                      {cell}
                      {i === 1 && j === 0 && <div style={{ fontSize: 9, color: 'var(--muted)', fontStyle: 'italic' }}>← each line = one ROW</div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <H>Primary Keys — Every Row's Unique ID</H>
      <P>Every table must have a column whose value is unique for every row and is never NULL. That column is called the <Hl>Primary Key</Hl>. In FreshMart's customers table, customer_id is the primary key. No two customers can ever share the same customer_id. The database enforces this automatically — if you try to insert a second customer with customer_id = 1, it will throw an error and reject the insert.</P>
      <P>Primary keys are almost always integers that auto-increment — the database generates 1, 2, 3, 4... automatically every time a new row is inserted. You never type a primary key value manually. The database does it for you. This means every customer, every order, every product always has a unique identifier you can refer to precisely — no ambiguity, no duplicates.</P>

      <H>Foreign Keys — How Tables Connect to Each Other</H>
      <P>The power of a relational database comes from linking tables. The orders table has a column called customer_id. This is a <Hl>Foreign Key</Hl> — it stores the primary key value of a row in another table, creating an enforced link between them. Order 1001 has customer_id = 1. That 1 means Aisha Khan placed this order. The database enforces this link: you cannot insert an order with customer_id = 999 if no customer with id 999 exists. This prevents orphaned records — orders that point to nobody.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '20px 0 32px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>How FreshMart's 6 tables are linked</div>
        <div style={{ color: 'var(--text)' }}>
          customers.customer_id <span style={{ color: C }}>←——</span> orders.customer_id<br />
          orders.order_id <span style={{ color: C }}>←——</span> order_items.order_id<br />
          order_items.product_id <span style={{ color: C }}>←——</span> products.product_id<br />
          orders.store_id <span style={{ color: C }}>←——</span> stores.store_id<br />
          employees.store_id <span style={{ color: C }}>←——</span> stores.store_id<br />
          employees.manager_id <span style={{ color: C }}>←——</span> employees.employee_id
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 12 }}>Every arrow is a foreign key. This is what "relational" means.</div>
      </div>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Excel vs Database — The Honest, Complete Comparison" />

      <P>Excel is a genuinely great tool for reports, budgets, and exploring small datasets. The problems start at scale, at concurrency, and at reliability. Here is every dimension where they differ:</P>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['The problem', 'Excel', 'Database'].map((h, i) => (
                <th key={h} style={{ padding: '12px 16px', background: i === 0 ? 'var(--surface)' : i === 1 ? 'rgba(255,71,87,0.12)' : `${C}15`, color: i === 0 ? 'var(--muted)' : i === 1 ? '#ff4757' : C, fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Scale', 'Hard limit of ~1 million rows per sheet. Swiggy crosses that before 9 AM every day.', 'Billions of rows. PostgreSQL runs production tables with hundreds of billions of rows.'],
              ['Concurrent users', 'One person can edit at a time. Two people saving simultaneously corrupts the file or silently overwrites each other\'s changes.', 'Thousands of simultaneous connections. Each gets an isolated session. Changes never conflict.'],
              ['Data type enforcement', 'Anyone can type "two hundred" into a price column. No enforcement — one bad entry breaks every formula downstream.', 'Types enforced at the engine level. Inserting text into an INTEGER column throws an error before the data is saved.'],
              ['Query speed', 'VLOOKUP across 1 lakh rows takes 10–30 seconds. Filters and pivot tables on large datasets lock the file for minutes.', 'A properly indexed query on 100 million rows returns in under 100 milliseconds.'],
              ['Connecting related data', 'VLOOKUP by ID across sheets — breaks when row order changes, requires manual maintenance in every file.', 'Foreign keys enforce links permanently. Change a customer name once — every table referencing that customer reflects it.'],
              ['Application connectivity', 'Cannot be queried by an app programmatically while open. No concept of concurrent API access.', 'Applications connect via a network protocol. 10,000 simultaneous app connections are routine.'],
              ['Crash recovery', 'If Excel crashes mid-save, the file may be permanently corrupted. No recovery guarantee beyond the last manual save.', 'The Write-Ahead Log guarantees committed data survives any crash. Zero data loss on recovery.'],
              ['Access control', 'Password-protect the whole file or nothing. No column-level or row-level permissions.', 'Row-level security, column masking, role-based access. An analyst can see sales but not salaries. Enforced by the engine.'],
            ].map(([problem, xl, db], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: 600, borderBottom: '1px solid var(--border)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{problem}</td>
                <td style={{ padding: '12px 16px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.7, verticalAlign: 'top' }}>{xl}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.7, verticalAlign: 'top' }}>{db}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        Excel and databases are not competitors. Analysts use databases to store and query millions of rows, then export small result sets to Excel for presentation and formatting. The mistake is using Excel as the database itself.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="What 'Relational' Actually Means — And the Databases Indian Companies Use" />

      <P>The databases you will use SQL on are called <Hl>Relational Database Management Systems (RDBMS)</Hl>. The word "relational" confuses beginners because it sounds like it means the tables are related to each other. That is true, but it is not the origin.</P>
      <P>In 1970, an IBM researcher named Edgar Codd published a landmark paper proposing that data should be stored as mathematical <em>relations</em> — a formal term for a table with rows and columns, with specific mathematical properties that guaranteed consistency. The word stuck. A relational database means: data in tables with rows and columns, tables linked through keys, queried using SQL. MySQL, PostgreSQL, Oracle, SQL Server, and SQLite all qualify.</P>

      <H>What the leading Indian tech companies actually run</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { db: 'PostgreSQL', color: '#336791', companies: 'Razorpay, CRED, Zerodha, Groww, Meesho', why: 'Open source with zero licensing cost. Handles complex queries, concurrent writes, and JSONB for semi-structured data. Default choice for high-growth fintech and e-commerce startups.' },
          { db: 'MySQL',      color: '#4479A1', companies: 'Swiggy, Nykaa, OYO, MakeMyTrip',         why: 'Extremely mature, massive community, dominates high-traffic consumer apps. Swiggy uses MySQL for core order management because of its proven replication and read-scaling.' },
          { db: 'MS SQL Server', color: '#0078d4', companies: 'HDFC Bank, ICICI, Infosys clients',   why: 'Enterprise support contracts, Windows Server integration, strong compliance tooling. Standard in Indian banking where RBI-regulated downtime has legal consequences.' },
          { db: 'Oracle',    color: '#F80000', companies: 'TCS, Wipro clients, IRCTC, LIC',          why: 'Dominant in legacy enterprise and government. IRCTC runs one of the highest-transaction-volume Oracle databases in Asia. Expensive but deeply entrenched.' },
          { db: 'SQLite',    color: '#003B57', companies: 'Inside every mobile app',                 why: 'Serverless, zero-configuration, runs on the device itself. Every Android and iOS app — including Swiggy, PhonePe, CRED — has an SQLite database storing local data.' },
        ].map(item => (
          <div key={item.db} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.db}</span>
            </div>
            <p style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', margin: '0 0 6px', lineHeight: 1.5 }}>{item.companies}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{item.why}</p>
          </div>
        ))}
      </div>

      <Callout type="tip">
        This course uses DuckDB in the browser playground — a modern analytical database that runs entirely in your browser. The SQL you write here works in MySQL, PostgreSQL, and every other relational database with only minor syntax differences we will flag explicitly when they come up.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The FreshMart Database — Your SQL Dataset for All 62 Modules" />

      <P>Every single module in this course — from Module 01 to Module 62 — uses the same database: <Hl>FreshMart</Hl>. A fictional Indian grocery chain. 10 stores across Bangalore, Hyderabad, Mumbai, Delhi, Chennai, Pune, and Ahmedabad. Real Indian brands — Amul, Tata, Nestle, Britannia, P&G. Realistic prices, realistic data.</P>
      <P>You will know this database so well by Module 62 that you could rebuild it from memory. That depth of familiarity with one dataset is intentional — every query you write will feel meaningful, not academic.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12, margin: '24px 0 32px' }}>
        {[
          { name: 'customers',   color: C,        rows: 20,  cols: 10, desc: '20 customers across 7 Indian cities. Bronze, Silver, Gold, Platinum loyalty tiers. Joined dates from 2020–2023.' },
          { name: 'orders',      color: '#f97316', rows: 30,  cols: 8,  desc: '30 orders from January–March 2024. Statuses: Delivered, Processing, Cancelled, Returned. UPI, Card, COD, NetBanking.' },
          { name: 'order_items', color: '#8b5cf6', rows: 118, cols: 7,  desc: '118 line items. Which products were in each order, at what quantity, with what discount.' },
          { name: 'products',    color: '#10b981', rows: 25,  cols: 9,  desc: '25 products — Amul Butter, Maggi, Parle-G, Head & Shoulders, Fortune Oil. Across Staples, Dairy, Beverages, Personal Care.' },
          { name: 'stores',      color: '#0078d4', rows: 10,  cols: 7,  desc: '10 stores: ST001–ST010. Each with a city, manager name, opening date, and monthly revenue target.' },
          { name: 'employees',   color: '#f59e0b', rows: 15,  cols: 9,  desc: '15 employees with roles, salaries, hire dates, and a self-referencing manager_id for the org hierarchy.' },
        ].map(t => (
          <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>{t.rows}r · {t.cols}c</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <P>The tables connect exactly as a real business does. A customer places an order. The order is at a store. The order has items. Each item is a product. Each store has employees. Employees have managers — who are also employees. One real-world event, six coordinated tables. You will learn to query across all of them.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="The Live SQL Playground — Run Queries Right Now" />

      <P>Every module in this course has a live SQL playground. The FreshMart database is loaded and ready the moment the page opens — no install, no account, no cloud. It runs entirely in your browser using DuckDB-WASM.</P>
      <P>Do not worry about understanding the syntax below yet. That starts in Module 05. For now, click <Hl>Run</Hl> and see real FreshMart data appear.</P>

      <SQLPlayground
        initialQuery={`-- Every customer and their loyalty tier
SELECT first_name, last_name, city, loyalty_tier
FROM customers
ORDER BY loyalty_tier
LIMIT 10;`}
        height={120}
        showSchema={true}
      />

      <P>Try changing LIMIT 10 to LIMIT 20 and clicking Run again. That is your first SQL experiment — you just filtered a live database.</P>

      <SQLPlayground
        initialQuery={`-- Total revenue and order count per city
-- (You will understand every word of this by Module 28)
SELECT c.city,
       COUNT(o.order_id)      AS total_orders,
       SUM(o.total_amount)    AS revenue
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
GROUP BY c.city
ORDER BY revenue DESC;`}
        height={160}
        showSchema={false}
      />

      <P>That second query joins two tables, filters by status, groups by city, and sorts by revenue. You will write queries like this yourself by Module 31. For now just notice: one SQL query answered a business question that would have taken 10 minutes of VLOOKUP in Excel.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work — A Full Day" />

      <P>You join PhonePe as a Business Analyst, three months after completing this SQL course. Here is what a real working day looks like.</P>

      <TimeBlock time="8:30 AM" label="Check overnight data refresh">
        You open the company's internal analytics dashboard. The nightly pipeline ran at 3 AM and refreshed all the warehouse tables. You run a quick sanity check query — yesterday's total transaction volume — and confirm it looks reasonable before the morning standup.
      </TimeBlock>

      <TimeBlock time="9:00 AM" label="Standup — you get a data request">
        The growth team lead asks: "Can you find all merchants in Tier 2 cities whose monthly transaction volume dropped more than 20% from January to February? We need it for the 11 AM review." Before SQL, this request would take all morning. You say: "I'll have it by 10:30."
      </TimeBlock>

      <TimeBlock time="9:15 AM — 10:15 AM" label="Write the analysis query">
        You open the database client. You know the transactions table has merchant_id, city_tier, amount, and transaction_date. You write a CTE that calculates each merchant's January total and February total, then filters for those where February is less than 80% of January, joined to the merchants table for their names and city. The query runs in 4 seconds over 18 million rows. You export the result — 47 merchants — to a Google Sheet.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Deliver — 30 minutes early">
        You paste the Sheet link in the growth team's Slack channel with a 3-line summary. The growth lead replies: "This is exactly what we needed." In the 11 AM review, they present your analysis to the VP. Your name comes up. You were hired 3 months ago.
      </TimeBlock>

      <TimeBlock time="11:30 AM" label="Ad hoc investigation">
        An alert fires: the fraud detection dashboard shows a spike in declined transactions in Karnataka. You query the transactions table directly, slicing by state, merchant category, and time. Within 20 minutes you identify it is concentrated in one payment instrument — a specific bank's debit cards — and escalate to the engineering team with the exact query and numbers. Investigation that used to take hours took 20 minutes because you can query the data directly.
      </TimeBlock>

      <TimeBlock time="2:00 PM" label="Building a new metric">
        Product asks for a new "30-day reactivation rate" metric — users who were inactive for 30 days and then transacted again. You design the SQL logic, test it on 3 months of historical data, confirm the numbers make sense, and hand the query to the data engineering team to schedule as a daily pipeline. You built the metric. They automate it. Both teams move fast.
      </TimeBlock>

      <ProTip>
        In most Indian tech companies, the ability to query data independently — without waiting for a data engineer to pull it for you — is the single biggest differentiator between a junior analyst and a senior one. Every product, growth, ops, finance, and marketing role uses SQL daily. It is the highest return-per-hour skill you can learn in the first year of any tech career.
      </ProTip>

      <HR />

      {/* ── PART 09 — Interview Prep ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a database and how is it different from a spreadsheet?">
        <p style={{ margin: '0 0 14px' }}>A database is a structured collection of data managed by a Database Management System that provides four guarantees a spreadsheet cannot: atomicity (every write fully succeeds or fully fails), consistency (data always satisfies defined rules), isolation (concurrent users never see each other's in-progress changes), and durability (committed data survives any crash). Together these are called ACID properties.</p>
        <p style={{ margin: '0 0 14px' }}>The practical differences are significant across three dimensions. First, scale: a spreadsheet hard-limits at roughly one million rows and degrades long before that. A database handles billions of rows without degrading — PostgreSQL production tables with hundreds of billions of rows are common. Second, concurrency: two people saving the same spreadsheet simultaneously corrupts it. A database uses transaction isolation to safely handle thousands of simultaneous write sessions. Third, integrity: a spreadsheet allows any value in any cell. A database enforces data types, foreign key relationships, and custom constraints at the engine level — bad data is rejected before it is saved.</p>
        <p style={{ margin: 0 }}>In practice, databases power every application — every tap on a mobile app reads or writes to a database. Spreadsheets are for reporting and analysis on small exported result sets, not for storing the data itself.</p>
      </IQ>

      <IQ q="What is a primary key? Why does every table need one?">
        <p style={{ margin: '0 0 14px' }}>A primary key is a column or combination of columns whose value uniquely identifies each row in a table. The database enforces two constraints on a primary key column automatically: every value must be unique — no two rows can share the same primary key — and no value can be NULL. These constraints cannot be violated by any INSERT or UPDATE.</p>
        <p style={{ margin: '0 0 14px' }}>Every table needs a primary key for three reasons. First, without a unique identifier there is no reliable way to update or delete a specific row. If two customers have the same name and city, which one do you update? The primary key makes the answer unambiguous. Second, other tables reference the primary key through foreign keys — the orders table knows which customer placed an order by storing that customer's primary key value. Without a primary key, no foreign key relationship can exist. Third, the database automatically creates a B-tree index on the primary key, making lookups by primary key extremely fast regardless of table size.</p>
        <p style={{ margin: 0 }}>In practice, primary keys are almost always auto-incrementing integers — the database generates 1, 2, 3... automatically on each insert. You never manually type a primary key value.</p>
      </IQ>

      <IQ q="What is a foreign key and what problem does it solve?">
        <p style={{ margin: '0 0 14px' }}>A foreign key is a column in one table that stores the primary key value of a row in another table, creating an enforced relationship between the two. In FreshMart, the orders table has a customer_id column that references customers.customer_id. The database enforces this: any insert into orders must provide a customer_id that already exists in the customers table. An insert with customer_id = 9999 when no customer 9999 exists will fail immediately.</p>
        <p style={{ margin: '0 0 14px' }}>The problem foreign keys solve is called referential integrity — ensuring relationships between tables are always valid. Without foreign keys, you could insert orders pointing to customers who do not exist, delete customers who still have orders referencing them, or end up with thousands of orphaned records that point to nothing. When you later join orders to customers, those orphaned rows silently disappear from the results with no error message — a data quality disaster that is extremely difficult to debug.</p>
        <p style={{ margin: 0 }}>Foreign keys also define the structure of every JOIN query you will write. When you join orders to customers, you join on the foreign key relationship: ON orders.customer_id = customers.customer_id. Understanding foreign keys is the foundational prerequisite to writing any correct JOIN.</p>
      </IQ>

      <IQ q="What does RDBMS stand for and what makes a database 'relational'?">
        <p style={{ margin: '0 0 14px' }}>RDBMS stands for Relational Database Management System. The word "relational" comes from relational algebra — a mathematical framework proposed by Edgar Codd at IBM in 1970. In mathematics, a "relation" is a set of tuples (rows) with named attributes (columns). Codd proposed that all enterprise data should be stored in this tabular form with specific mathematical operations — selection, projection, join — used to query it. SQL is essentially a user-friendly syntax for those relational algebra operations.</p>
        <p style={{ margin: '0 0 14px' }}>Practically, a database is relational when it stores data in tables with rows and columns, enforces relationships between tables through keys, supports SQL as the query language, and guarantees ACID properties. MySQL, PostgreSQL, Oracle, SQL Server, and SQLite are all RDBMS.</p>
        <p style={{ margin: 0 }}>MongoDB is not relational — it stores JSON documents rather than rows in tables, making it a "NoSQL" database. It trades ACID guarantees and the relational model for flexible schema and horizontal scaling. The relational model dominates structured business data because of its consistency guarantees and the expressive power of SQL for ad-hoc analysis. Knowing SQL means you can work with any RDBMS, because the core language is 95% identical across all of them.</p>
      </IQ>

      <IQ q="Name three databases used by well-known Indian tech companies and explain why they chose them.">
        <p style={{ margin: '0 0 14px' }}>Razorpay uses PostgreSQL as its primary transactional database. PostgreSQL is the dominant choice at Indian fintech startups because it is open source with no licensing cost, handles complex query patterns that payment processing requires, provides JSONB columns for storing semi-structured payment metadata alongside structured transaction records, and has a strong track record of ACID compliance at high concurrency. Every rupee transferred through Razorpay touches a PostgreSQL transaction.</p>
        <p style={{ margin: '0 0 14px' }}>Swiggy uses MySQL for its core order management and logistics systems. MySQL has been proven at extreme transaction volumes in food delivery. Its read-replica architecture lets Swiggy route millions of "check my order status" queries to read replicas while reserving the primary database for writes — ensuring that peak dinner-time load does not overwhelm a single server. MySQL's maturity and the size of its ecosystem also mean Swiggy can hire engineers who already know it.</p>
        <p style={{ margin: 0 }}>HDFC Bank runs Microsoft SQL Server across much of its core banking infrastructure. SQL Server's enterprise support contracts, deep integration with Windows Server, and long track record with the kind of compliance and audit tooling that RBI-regulated institutions require make it the standard choice in Indian banking. The licensing cost is significant but acceptable when database downtime has direct regulatory and reputational consequences. HDFC also uses Oracle for certain legacy systems — Oracle remains dominant in Indian banking, insurance, and government despite its cost.</p>
      </IQ>

      <HR />

      {/* ── PART 10 — Error Library ── */}
      <Part n="10" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)"
        cause="The username or password you are using to connect to MySQL is wrong. This is the single most common error beginners hit when setting up a local database for the first time. The 'root' user is MySQL's default admin, but its password is set during installation and is often not what you expect — especially if you skipped the step or the installer set a random temporary password."
        fix="On MySQL: run 'mysql -u root -p' from the terminal, enter the password when prompted. If you have forgotten it, reset it: stop MySQL, start it with --skip-grant-tables, then run ALTER USER 'root'@'localhost' IDENTIFIED BY 'yournewpassword'; On PostgreSQL the default user is 'postgres' with no password — connect with 'psql -U postgres' and set a password with ALTER USER postgres WITH PASSWORD 'yourpassword';"
      />

      <Err
        msg="ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'FORM customers' at line 1"
        cause="A typo in a SQL keyword. Here 'FROM' was typed as 'FORM'. The database parser reached the word 'FORM', did not recognise it as a valid keyword, and stopped. The error message shows you the exact position where parsing failed — always start reading from that position backwards to find the typo."
        fix="Read the error message carefully. It tells you where parsing broke. Keywords must be spelled correctly but are not case-sensitive — FROM, from, and From are all identical to MySQL. The fastest fix is to use a SQL editor with autocomplete (VS Code with the SQL extension, DBeaver, DataGrip) — it will highlight unrecognised keywords in real time before you run anything."
      />

      <Err
        msg="ERROR 1406 (22001): Data too long for column 'email' at row 1"
        cause="You are trying to insert a value that is longer than the column's defined maximum size. If email is defined as VARCHAR(50) and the email address you are inserting is 58 characters, the database rejects it. It will not silently truncate the value — it throws an error."
        fix="Either widen the column definition: ALTER TABLE customers MODIFY COLUMN email VARCHAR(255); — or clean the input data before inserting. For email addresses VARCHAR(255) is the standard safe width — the maximum valid email length per the RFC is 254 characters. If you are importing data in bulk and hitting this frequently, inspect the longest value in your source with: SELECT MAX(LENGTH(email)) FROM your_source_table;"
      />

      <Err
        msg="ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`freshmart`.`orders`, CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`))"
        cause="You are trying to insert an order with a customer_id value that does not exist in the customers table. For example: INSERT INTO orders (order_id, customer_id, ...) VALUES (9999, 500, ...); — and no customer with customer_id = 500 exists. The database is protecting referential integrity — it will not allow records that reference nonexistent parents."
        fix="First verify the parent record exists: SELECT * FROM customers WHERE customer_id = 500; If it does not exist, insert the customer first, then insert the order. In test or seed scripts where you need to load data in bulk and temporarily cannot guarantee order, you can disable foreign key checks: SET FOREIGN_KEY_CHECKS = 0; — run your inserts — SET FOREIGN_KEY_CHECKS = 1; Never do this in production and always re-enable immediately."
      />

      <Err
        msg="ERROR 1292 (22007): Incorrect datetime value: '2024-13-05' for column 'order_date' at row 1"
        cause="You are inserting an invalid date — month 13 does not exist. MySQL and PostgreSQL validate date values strictly. The format must also match what the database expects: YYYY-MM-DD for DATE columns. Common variations that fail: '05-13-2024' (MM-DD-YYYY), '13/05/2024' (DD/MM/YYYY with slashes), '2024/05/13' (correct date but wrong separator in some configurations)."
        fix="Always use ISO 8601 format: 'YYYY-MM-DD' for dates and 'YYYY-MM-DD HH:MM:SS' for datetimes. This format is unambiguous across every database engine. If you are importing dates from a CSV or external system in a different format, use STR_TO_DATE() in MySQL or TO_DATE() in PostgreSQL to parse them explicitly: STR_TO_DATE('13/05/2024', '%d/%m/%Y')"
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="A customer in Bangalore places an order on FreshMart's app. She buys Amul Milk, Tata Atta, and Maggi. How many tables in the FreshMart database are involved in storing that single transaction — and which ones are they?"
        hint="Think step by step: who placed it (1 table), what is the order itself (1 table), what products were bought (how many tables does that involve)?"
        answer={`5 tables are involved:

1. customers — stores who placed the order (Aisha Khan, Bangalore, Gold tier)
2. orders — stores the order itself (order_id, date, store, status, payment method, total)  
3. order_items — stores 3 rows, one per product (Amul Milk × 1, Tata Atta × 1, Maggi × 2)
4. products — each order_items row links here to get the product name, price, and category
5. stores — the orders row links here to record which FreshMart location processed the order

The employees table is not directly involved in recording the transaction, though a store's employees are associated with that store.`}
        explanation="This is the relational model in action. One real-world event — a customer buying 3 products — is split across 5 coordinated tables. Each table stores exactly one type of thing. The tables are linked through foreign keys. When you query this data with SQL, you will JOIN these tables back together to answer questions like 'What did each customer buy, and from which store?' Understanding this structure is the foundation of every JOIN query you will write from Module 30 onwards."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A database is a structured collection of data managed by a DBMS that guarantees ACID: Atomicity (writes fully succeed or fully fail), Consistency (rules always hold), Isolation (concurrent users never see each other\'s in-progress changes), Durability (committed data survives any crash).',
          'Internally, databases store data in fixed-size pages on disk, use B-tree indexes for fast row lookups, keep frequently-accessed pages in a memory buffer pool, and use a Write-Ahead Log to survive crashes without data loss.',
          'Excel breaks at scale across 8 dimensions: row limits, no concurrency, no type enforcement, slow queries, fragile cross-sheet links, no app connectivity, no crash safety, and no row-level access control. Databases solve all eight.',
          'Every table needs a Primary Key — a column whose value uniquely identifies each row. The database enforces uniqueness and non-nullability automatically. Almost always an auto-incrementing integer.',
          'Foreign Keys create enforced links between tables. You cannot insert a row that references a parent that does not exist. This prevents orphaned records and is the foundation of every JOIN query you will write.',
          'RDBMS (Relational Database Management System) is the category that MySQL, PostgreSQL, Oracle, SQL Server, and SQLite belong to. SQL is the standardised query language for this model — 95% identical across all of them.',
          'In Indian tech: PostgreSQL is default at fintech startups (Razorpay, CRED, Zerodha). MySQL dominates high-traffic consumer apps (Swiggy, Nykaa). MS SQL Server is standard in banking (HDFC, ICICI). SQLite runs inside every mobile app.',
          'FreshMart — 6 tables, 218 total rows, realistic Indian data — is the dataset for all 62 modules. Learn it once and use it for every single query in the course.',
          'A live SQL playground powered by DuckDB-WASM runs on every module page. Zero install, zero account, zero server — the FreshMart database is pre-loaded and ready the moment the page opens.',
          'SQL is not just a "data" skill. Every product manager, growth analyst, operations lead, and finance analyst at every Indian tech company uses SQL daily. It is the highest-return technical skill learnable in under 3 months.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 02</strong>, you go inside the database — how primary keys and foreign keys are defined in code, what constraints are and how they enforce data quality automatically, and why the decisions you make about table structure before writing a single query determine how well everything downstream works.
        </p>
        <Link href="/learn/sql/how-databases-work" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 02 → How Databases Work
        </Link>
      </div>

    </LearnLayout>
  );
}