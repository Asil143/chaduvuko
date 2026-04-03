import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// Local style primitives (SQL track color: #06b6d4)
// ─────────────────────────────────────────────────────────────────────────────
const SQL_COLOR = '#06b6d4';

const STag = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
    textTransform: 'uppercase', color: SQL_COLOR,
    fontFamily: 'var(--font-mono)',
  }}>
    {children}
  </span>
);

const STitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(22px,3vw,34px)',
    fontWeight: 900,
    letterSpacing: '-1.5px',
    color: 'var(--text)',
    margin: '10px 0 20px',
  }}>
    {children}
  </h2>
);

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 16px' }}>
    {children}
  </p>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>
    {children}
  </h3>
);

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: SQL_COLOR, fontWeight: 700 }}>{children}</span>
);

const AnalogyBox = ({ analogy, children }: { analogy: string; children: React.ReactNode }) => (
  <div style={{
    background: `${SQL_COLOR}08`,
    border: `1px solid ${SQL_COLOR}25`,
    borderLeft: `4px solid ${SQL_COLOR}`,
    borderRadius: '0 10px 10px 0',
    padding: '20px 24px',
    margin: '28px 0',
  }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: SQL_COLOR, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
      Analogy — {analogy}
    </div>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
);

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '40px 0' }} />
);

// ─────────────────────────────────────────────────────────────────────────────
// Module 01 — What is a Database?
// ─────────────────────────────────────────────────────────────────────────────
export default function WhatIsADatabase() {
  return (
    <LearnLayout
      title="What is a Database?"
      description="Why Excel fails at scale — and what databases do instead"
      section="SQL — Module 01"
      readTime="8 min"
      updatedAt="April 2026"
    >

      {/* ── The Hook ── */}
      <STag>The real problem</STag>
      <STitle>1 crore orders. One spreadsheet won't cut it.</STitle>

      <Para>
        Every day, Swiggy processes roughly 1 crore food orders. Each order has a customer,
        a restaurant, multiple items, a delivery partner, a price, a time, a status, and a
        payment record. That's tens of millions of pieces of data — every single day.
      </Para>

      <Para>
        Now imagine someone suggests: "Let's put all of this in an Excel file."
      </Para>

      <Para>
        You'd laugh. And you'd be right. Excel would crash before you even got through Monday.
        What Swiggy actually uses — what every company uses — is a <Highlight>database</Highlight>.
      </Para>

      <Callout type="info">
        You don't need to be a developer to understand databases. If you've ever used a mobile app,
        ordered food online, or checked your bank balance, you've already interacted with one —
        you just didn't know it.
      </Callout>

      <Divider />

      {/* ── Analogy ── */}
      <STag>Making it simple</STag>
      <STitle>Think of it like FreshMart's filing room</STitle>

      <AnalogyBox analogy="FreshMart's record room">
        Imagine FreshMart's head office has a giant, perfectly organised filing room.
        One drawer holds all customer records. Another holds all order records. Another
        holds all product information. Each drawer is labelled, sorted, and locked.
        Any employee can walk in, find exactly what they need in seconds, and the records
        are never lost or duplicated.
        <br /><br />
        A database is that filing room — but digital, lightning-fast, and able to handle
        millions of records at once while serving thousands of people simultaneously.
      </AnalogyBox>

      <Divider />

      {/* ── Why Not Excel ── */}
      <STag>The honest comparison</STag>
      <STitle>Why not just use Excel?</STitle>

      <Para>
        Excel is a great tool — for reports, budgets, small datasets, and analysis. But when
        your data grows, Excel starts to break. Here's why databases exist:
      </Para>

      {/* Comparison table */}
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ padding: '12px 16px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>The problem</th>
              <th style={{ padding: '12px 16px', background: '#ff475720', color: '#ff4757', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>Excel</th>
              <th style={{ padding: '12px 16px', background: `${SQL_COLOR}15`, color: SQL_COLOR, fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>Database</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['How much data?', 'Limit of ~1 million rows per sheet. Zepto has that by 9 AM.', 'Billions of rows. No practical limit.'],
              ['Multiple users?', 'One person edits at a time. Two people saving = data lost.', 'Thousands of users simultaneously. Everyone gets their own session.'],
              ['Data reliability?', 'Anyone can accidentally delete a column or type letters where numbers should be.', 'Rules enforced automatically. You cannot insert a text value in a price column.'],
              ['Speed?', 'Scrolling through 1 lakh rows takes 10 seconds. Filtering takes longer.', 'Finding 1 row out of 100 crore takes milliseconds with an index.'],
              ['Connecting data?', 'You use VLOOKUP across sheets. It breaks when data moves.', 'Tables link to each other with foreign keys — always in sync.'],
              ['History & backup?', 'Manual save. Previous versions lost unless you remembered to copy the file.', 'Transactions, rollbacks, automatic backups, audit logs.'],
            ].map(([problem, xl, db], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{problem}</td>
                <td style={{ padding: '12px 16px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{xl}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{db}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* ── How a Database is Organised ── */}
      <STag>The building blocks</STag>
      <STitle>Tables, Rows, and Columns</STitle>

      <Para>
        A database is made up of <Highlight>tables</Highlight> — and if you've used Excel, you
        already know what a table looks like. Rows going across, columns going down.
      </Para>

      {/* Visual diagram of a table */}
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        margin: '20px 0 28px',
      }}>
        <div style={{
          padding: '10px 16px',
          background: `${SQL_COLOR}15`,
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: SQL_COLOR, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: SQL_COLOR }}>customers</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>← This is a TABLE</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['customer_id', 'first_name', 'last_name', 'city', 'loyalty_tier'].map(col => (
                  <th key={col} style={{
                    padding: '10px 14px',
                    background: 'var(--surface)',
                    color: SQL_COLOR,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11, fontWeight: 700,
                    textAlign: 'left',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}>
                    {col}
                    <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2, fontWeight: 400 }}>← COLUMN</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Aisha', 'Khan', 'Bangalore', 'Gold'],
                ['2', 'Ravi', 'Kumar', 'Hyderabad', 'Silver'],
                ['3', 'Priya', 'Sharma', 'Mumbai', 'Bronze'],
              ].map((row, i) => (
                <tr key={i} style={{ position: 'relative' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '10px 14px',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      borderBottom: '1px solid var(--border)',
                      background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                      whiteSpace: 'nowrap',
                    }}>
                      {cell}
                      {i === 1 && j === 0 && (
                        <span style={{ fontSize: 9, color: 'var(--muted)', marginLeft: 8, fontStyle: 'italic', display: 'block', whiteSpace: 'nowrap' }}>← this entire line is a ROW</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Para>
        Simple as that. A <Highlight>table</Highlight> holds one type of thing (customers, orders,
        products). A <Highlight>row</Highlight> is one record (one customer). A{' '}
        <Highlight>column</Highlight> is one piece of information about that thing (city, name, tier).
      </Para>

      <Divider />

      {/* ── The FreshMart Database ── */}
      <STag>Your learning database</STag>
      <STitle>Meet FreshMart — Your SQL Playground</STitle>

      <Para>
        Throughout every module in this course, you'll write queries against the{' '}
        <Highlight>FreshMart Database</Highlight> — a fictional Indian grocery chain with
        10 stores across India. It has 6 connected tables that together represent how a real
        retail business stores its data.
      </Para>

      {/* 6 tables overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '24px 0' }}>
        {[
          { name: 'customers',   color: SQL_COLOR,   rows: 20,  desc: 'Who buys from FreshMart — names, cities, loyalty tiers' },
          { name: 'orders',      color: '#f97316',   rows: 30,  desc: 'Every purchase — date, status, total, payment method' },
          { name: 'order_items', color: '#8b5cf6',   rows: 118, desc: 'What\'s in each order — products, quantities, discounts' },
          { name: 'products',    color: '#10b981',   rows: 25,  desc: 'Everything FreshMart sells — Amul, Tata, local brands' },
          { name: 'stores',      color: '#0078d4',   rows: 10,  desc: 'The 10 FreshMart locations across India' },
          { name: 'employees',   color: '#f59e0b',   rows: 15,  desc: 'Staff with roles, salaries, and who reports to whom' },
        ].map(t => (
          <div key={t.name} style={{
            background: 'var(--surface)',
            border: `1px solid ${t.color}25`,
            borderRadius: 10,
            padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>{t.rows} rows</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <Para>
        The tables are connected. An order links to the customer who placed it, the store
        it was placed at, and the order_items inside it, which link to products. This is exactly
        how real databases work — and you'll learn to query across all of them.
      </Para>

      <Divider />

      {/* ── What This Looks Like at Work ── */}
      <STag>What this looks like at work</STag>
      <STitle>Day 1 at a Real Company</STitle>

      <Para>
        You join Zepto as a Business Analyst. On your first day, your manager sends a Slack message:
      </Para>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '20px 24px',
        margin: '16px 0 24px',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <div style={{ color: 'var(--muted)', fontSize: 11, marginBottom: 8 }}>Slack · #data-team</div>
        <strong style={{ color: SQL_COLOR }}>Priya (Manager):</strong>{' '}
        Hey! Can you pull the total orders from Bangalore customers in January? Need it before the 10am standup.
      </div>

      <Para>
        Without SQL, you'd be lost. With SQL, you write one query. It takes 10 seconds.
        You paste the number in Slack and look like a genius. That's what this course teaches you.
      </Para>

      <Divider />

      {/* ── Playground Preview ── */}
      <STag>Live preview</STag>
      <STitle>See the FreshMart Database Right Now</STitle>

      <Para>
        Don't worry about the syntax below — you'll learn all of it starting Module 05.
        For now, just click <Highlight>Run</Highlight> and watch real data appear from the
        FreshMart database — running entirely in your browser.
      </Para>

      <SQLPlayground
        initialQuery={`-- A peek at FreshMart's customer data
-- You'll write queries like this yourself by Module 05!
SELECT first_name, last_name, city, loyalty_tier
FROM customers
LIMIT 5;`}
        height={120}
        showSchema={true}
      />

      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginTop: 16 }}>
        That data is running live in your browser using DuckDB-WASM. No server, no login.
        You'll have access to all 6 FreshMart tables on every single module page.
      </p>

      <Divider />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshMart has 6 tables. Which table would you look at to find out: how many products did a specific customer buy in a single order?"
        hint="Think about what connects an order to its individual items. You'd need more than just the 'orders' table."
        answer="order_items"
        explanation="The orders table only stores the total amount and order status — not which individual products were in it. The order_items table stores one row per product per order. To know 'customer X bought 3 units of Amul Milk in order 1001', you'd query order_items and join it with orders to link it back to the customer."
      />

      <Divider />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A database is a structured, organised collection of data — like a digital filing room that multiple people can use simultaneously.',
          'Data is stored in tables: rows are individual records, columns are individual fields.',
          'Databases handle millions of rows, multiple users at once, data integrity rules, and blazing-fast queries — things Excel cannot.',
          'The FreshMart database has 6 connected tables you\'ll use throughout this entire course.',
          'SQL (Structured Query Language) is how you communicate with a database — read, write, update, and delete data.',
        ]}
      />

      {/* ── What comes next ── */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '24px',
        marginTop: 40,
      }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 12 }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, margin: '0 0 20px' }}>
          In <strong>Module 02</strong>, you'll go deeper into how a database is organised internally —
          primary keys, foreign keys, and why table design matters before you write a single query.
        </p>
        <Link href="/learn/sql/how-databases-work" style={{
          background: SQL_COLOR, color: '#000',
          padding: '10px 22px', borderRadius: 7,
          fontWeight: 700, fontSize: 13, textDecoration: 'none',
          display: 'inline-block',
        }}>
          Module 02 → How Databases Work
        </Link>
      </div>

    </LearnLayout>
  );
}