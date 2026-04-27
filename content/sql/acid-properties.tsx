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
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
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

const PropertyCard = ({
  letter, word, color, tagline, what, how, breaks, example,
}: {
  letter: string; word: string; color: string; tagline: string;
  what: string; how: string; breaks: string; example: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
    <div style={{ padding: '16px 20px', background: `${color}12`, borderBottom: `1px solid ${color}25`, display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 900, color, lineHeight: 1, flexShrink: 0 }}>{letter}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color }}>{word}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>{tagline}</div>
      </div>
    </div>
    <div style={{ padding: '16px 20px', display: 'grid', gap: 14 }}>
      {[
        ['What it guarantees', what, 'var(--text)'],
        ['How the database enforces it', how, 'var(--muted)'],
        ['What breaks without it', breaks, '#ff4757'],
      ].map(([label, val, tc]) => (
        <div key={label as string}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', margin: '0 0 5px' }}>{label as string}</p>
          <p style={{ fontSize: 13, color: tc as string, lineHeight: 1.7, margin: 0 }}>{val as string}</p>
        </div>
      ))}
      <div style={{ background: 'var(--bg)', borderRadius: 8, padding: '12px 14px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', margin: '0 0 6px' }}>FreshCart scenario</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{example}</p>
      </div>
    </div>
  </div>
);

export default function AcidProperties() {
  return (
    <LearnLayout
      title="ACID Properties"
      description="The four rules every reliable database follows — Atomicity, Consistency, Isolation, Durability — and the real-world failures each one prevents"
      section="SQL — Module 48"
      readTime="14 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Databases Need Rules" />

      <P>Databases do not just store data. They guarantee that data remains <Hl>correct, complete, and recoverable</Hl> even when servers crash, network connections drop, and hundreds of users write simultaneously. These guarantees do not happen by accident — they are enforced through four properties collectively known as ACID.</P>

      <P>ACID was formalized by Jim Gray and Andreas Reuter in 1983. Before it, database systems had inconsistent behaviour during failures — a server crash mid-operation could leave data in an unknown state with no way to determine what succeeded and what did not. ACID defined the contract: if a database claims to be ACID-compliant, you know exactly what will happen in every failure scenario.</P>

      <P>Every major relational database — PostgreSQL, MySQL (InnoDB), SQL Server, Oracle, SQLite — implements ACID. Understanding each property tells you what the database protects you from automatically and what you must protect yourself from in application code.</P>

      <SQLPlayground
        initialQuery={`-- FreshCart has financial and inventory data — exactly where ACID matters most
-- Let's see what we're working with
SELECT
  'customers'   AS tbl, COUNT(*) AS rows FROM customers
UNION ALL SELECT 'orders',      COUNT(*) FROM orders
UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
UNION ALL SELECT 'products',    COUNT(*) FROM products
UNION ALL SELECT 'stores',      COUNT(*) FROM stores;`}
        height={160}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Atomicity — All or Nothing" />

      <PropertyCard
        letter="A"
        word="Atomicity"
        color={C}
        tagline="A transaction is indivisible — it either fully completes or fully does not happen"
        what="Every SQL statement inside a BEGIN...COMMIT block is treated as a single unit. Either ALL statements execute and their changes are committed, or NONE of them take effect. There is no state where some statements committed and others did not — partial transactions are impossible."
        how="Transaction log (WAL — Write-Ahead Log). Before any change is applied to data files, the intended change is written to the log. If the transaction commits, the log records the commit. If the server crashes mid-transaction, on restart the database reads the log: uncommitted transactions are rolled back, committed transactions are replayed. The log is the ground truth."
        breaks="Without atomicity, a payment that deducts ₹500 from a customer's wallet but crashes before crediting the merchant leaves ₹500 permanently lost — deducted from one account, never arrived at another. The money exists in neither place. Any multi-step operation that must either fully succeed or fully fail needs atomicity."
        example="A FreshCart order involves: INSERT into orders, INSERT into order_items (one per product), UPDATE products to reduce stock, INSERT into payment_log. Atomicity means if the payment_log INSERT fails (duplicate key, constraint violation), the order INSERT, order_items INSERT, and stock UPDATE are all rolled back. The customer's order either fully exists or does not exist — never half-created."
      />

      <CodeBlock
        label="Atomicity in action — the all-or-nothing guarantee"
        code={`-- WITHOUT a transaction (autocommit — each statement commits independently)
UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1001;
-- ↑ committed immediately and permanently

-- <<< server crashes HERE >>>

INSERT INTO payment_log (order_id, amount, status)
VALUES (1001, 850.00, 'settled');
-- ↑ never executes — order is 'Delivered' but has no payment record
-- Result: corrupted state with no way to fix it automatically

-- WITH a transaction (atomic — both or neither)
BEGIN;
  UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1001;
  INSERT INTO payment_log (order_id, amount, status)
  VALUES (1001, 850.00, 'settled');
COMMIT;
-- If crash happens before COMMIT: on restart, both are rolled back
-- order_status is still 'Processing' — no corrupted state`}
      />

      <SQLPlayground
        initialQuery={`-- Atomicity demonstration: verify what a "delivered" order should look like
-- In a correct system, every delivered order must have matching order_items
SELECT
  o.order_id,
  o.order_status,
  o.total_amount,
  COUNT(oi.order_id)        AS item_count,
  ROUND(SUM(oi.line_total), 2) AS items_total,
  CASE
    WHEN COUNT(oi.order_id) = 0        THEN 'MISSING ITEMS — atomicity failure'
    WHEN ABS(SUM(oi.line_total) - o.total_amount) > 0.01 THEN 'AMOUNT MISMATCH'
    ELSE 'consistent'
  END AS integrity_status
FROM orders AS o
LEFT JOIN order_items AS oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.order_status, o.total_amount
ORDER BY o.order_id
LIMIT 10;`}
        height={220}
        showSchema={true}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Consistency — Only Valid States" />

      <PropertyCard
        letter="C"
        word="Consistency"
        color="#10b981"
        tagline="A transaction can only move the database between valid states"
        what="Consistency means the database is always in a valid state — before a transaction begins and after it commits. 'Valid state' is defined by all the rules declared in the schema: NOT NULL constraints, UNIQUE constraints, CHECK constraints, FOREIGN KEY constraints, and any triggers or rules. A transaction that would violate any of these is rejected in its entirety."
        how="Constraint checking at commit time (and in many cases, statement-by-statement). When you try to INSERT a row with a NULL in a NOT NULL column, the database rejects it before the INSERT completes. When you try to INSERT an order_item referencing a product_id that does not exist, the FOREIGN KEY constraint rejects it. Constraints are the database's definition of what 'valid' means."
        breaks="Without consistency enforcement, you could have orders referencing customers who do not exist (broken foreign keys), negative stock quantities (violated CHECK constraints), duplicate primary keys (two orders with the same order_id), or NULL values in columns that require a value. These corrupt states cause cascading failures in queries, reports, and application logic that assume the data is valid."
        example="FreshCart's order_items table has a FOREIGN KEY to products. Consistency ensures you cannot insert an order_item for a product that was deleted — the database rejects it. The products table has stock_quantity >= 0 as a CHECK constraint — no transaction can decrement stock below zero. These rules are enforced at the database level, not just the application layer."
      />

      <CodeBlock
        label="Consistency — constraints that define valid states"
        code={`-- SQLite constraint examples (FreshCart-style)
CREATE TABLE products (
  product_id    INTEGER PRIMARY KEY,
  product_name  TEXT    NOT NULL,              -- NOT NULL: every product needs a name
  unit_price    REAL    NOT NULL CHECK (unit_price > 0),  -- price must be positive
  stock_qty     INTEGER NOT NULL DEFAULT 0
                        CHECK (stock_qty >= 0), -- stock cannot go negative
  in_stock      INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE order_items (
  order_id    INTEGER NOT NULL REFERENCES orders(order_id),   -- FK: order must exist
  product_id  INTEGER NOT NULL REFERENCES products(product_id), -- FK: product must exist
  quantity    INTEGER NOT NULL CHECK (quantity > 0),          -- must order at least 1
  line_total  REAL    NOT NULL CHECK (line_total > 0),
  PRIMARY KEY (order_id, product_id)                         -- UNIQUE: no duplicate lines
);

-- Attempts that VIOLATE consistency (all rejected by the database):
INSERT INTO products (product_name, unit_price) VALUES (NULL, 50.00);
-- → ERROR: NOT NULL constraint failed: products.product_name

INSERT INTO products (product_name, unit_price) VALUES ('Milk', -10.00);
-- → ERROR: CHECK constraint failed: unit_price > 0

INSERT INTO order_items (order_id, product_id, quantity, line_total)
VALUES (99999, 1, 2, 200.00);
-- → ERROR: FOREIGN KEY constraint failed (order_id 99999 does not exist)`}
      />

      <SQLPlayground
        initialQuery={`-- Check FreshCart's current data consistency
-- Every order_item must reference a valid order and a valid product
SELECT
  (SELECT COUNT(*) FROM orders)       AS total_orders,
  (SELECT COUNT(*) FROM order_items)  AS total_items,
  (SELECT COUNT(*)
   FROM order_items oi
   WHERE NOT EXISTS (
     SELECT 1 FROM orders o WHERE o.order_id = oi.order_id
   ))                                  AS orphaned_items,
  (SELECT COUNT(*)
   FROM order_items oi
   WHERE NOT EXISTS (
     SELECT 1 FROM products p WHERE p.product_id = oi.product_id
   ))                                  AS items_missing_product;
-- Both orphaned counts should be 0 — consistency is maintained`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Isolation — Concurrent Without Conflict" />

      <PropertyCard
        letter="I"
        word="Isolation"
        color="#8b5cf6"
        tagline="Concurrent transactions behave as if they ran one at a time"
        what="Isolation means each transaction executes as if it were the only transaction running, even when hundreds of transactions run simultaneously. Changes made by an in-progress transaction are not visible to other transactions until the first transaction commits. This prevents one transaction from reading or depending on the intermediate, possibly-to-be-rolled-back work of another."
        how="MVCC (Multi-Version Concurrency Control) in PostgreSQL: instead of one version of each row, the database maintains multiple versions. Each transaction sees the version that was current when the transaction started (or when the statement started, depending on the isolation level). Readers never block writers. Writers never block readers. Only write-write conflicts require locking."
        breaks="Without isolation, two sessions simultaneously reading inventory could both see stock = 1, both decide to sell the last item, both decrement the stock, and leave it at -1 (an impossible state). Reports could read a row mid-update and see an inconsistent intermediate value. Financial aggregations could include partial payments."
        example="Two FreshCart customers simultaneously try to buy the last Amul Butter (stock = 1). Without isolation: both read stock = 1, both decrement by 1, stock = -1. With isolation at SERIALIZABLE: the first transaction commits stock = 0, the second tries to decrement but the database detects the conflict and forces it to retry — it reads stock = 0 and fails with 'out of stock'. The impossible state never exists."
      />

      <H>The four isolation levels</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '16px 0 28px' }}>
        {[
          { level: 'READ UNCOMMITTED', color: '#ff4757', desc: 'Lowest isolation. Transactions can read uncommitted (dirty) data from other transactions. Almost never used — PostgreSQL treats it as READ COMMITTED.', anomalies: 'Dirty reads, non-repeatable reads, phantom reads' },
          { level: 'READ COMMITTED', color: '#f97316', desc: 'Default in PostgreSQL. Each statement sees only committed data. Prevents dirty reads. A long-running transaction may see different values if it reads the same row twice after another transaction commits between reads.', anomalies: 'Non-repeatable reads, phantom reads' },
          { level: 'REPEATABLE READ', color: C, desc: 'A transaction sees a snapshot taken at its start. The same row always returns the same value within the transaction, even if other transactions commit changes to it. Good for long-running reports.', anomalies: 'Phantom reads (in standard SQL; PostgreSQL also prevents these)' },
          { level: 'SERIALIZABLE', color: '#00e676', desc: 'Strongest isolation. The database guarantees the result is identical to running transactions one at a time in some serial order. Detects and rejects transactions that would create a serialization anomaly.', anomalies: 'None — all anomalies prevented' },
        ].map(item => (
          <div key={item.level} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: item.color }}>{item.level}</span>
              <span style={{ fontSize: 11, color: '#ff4757', background: 'rgba(255,71,87,0.08)', padding: '3px 8px', borderRadius: 4 }}>Allows: {item.anomalies}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <SQLPlayground
        initialQuery={`-- Simulate isolation: see what two "concurrent" queries would each read
-- At READ COMMITTED, each statement sees committed data at statement start
-- A long analytics query and a fast order update running simultaneously:

-- Session 1 (analytics): would read this snapshot of order totals
SELECT
  order_status,
  COUNT(*)              AS order_count,
  ROUND(SUM(total_amount), 2) AS total_revenue
FROM orders
GROUP BY order_status
ORDER BY total_revenue DESC;

-- Session 2 (concurrent update) would commit a new 'Delivered' order
-- At READ COMMITTED, Session 1 re-reads AFTER Session 2 commits would see
-- the new row — this is a non-repeatable read
-- At REPEATABLE READ, Session 1's second read would still see the old snapshot`}
        height={190}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Durability — Survived Crashes" />

      <PropertyCard
        letter="D"
        word="Durability"
        color="#f97316"
        tagline="Once committed, data survives any failure"
        what="Once a transaction's COMMIT succeeds, its changes are permanent. A server crash, power failure, or OS restart immediately after COMMIT will not lose the committed data. When the database restarts, it recovers all committed transactions and discards all uncommitted ones. The COMMIT response to the client is only sent after the data is guaranteed to survive a crash."
        how="Write-Ahead Logging (WAL). Before any change is applied to the actual data files, the change is first written to the WAL — a sequential append-only log on durable storage. On crash recovery, the database reads the WAL: transactions with a COMMIT record are replayed (applied to data files), transactions without a COMMIT record are rolled back. The WAL is fsynced to disk before COMMIT returns — this is why COMMIT on large transactions can be slightly slow."
        breaks="Without durability, a confirmed order could disappear after a server restart. A payment marked 'success' in the database could vanish. Customers could receive order confirmations for orders that no longer exist in the database. This is catastrophic for any financial or e-commerce system."
        example="A FreshCart customer places an order at 11:59 PM. The COMMIT succeeds and the app sends the order confirmation email. The database server crashes at 12:00 AM. When it restarts, the order is still there — COMMIT means it was written to the WAL before the crash. The order data survived because durability guarantees that every committed transaction is recoverable."
      />

      <CodeBlock
        label="How WAL protects committed data"
        code={`-- Timeline of a COMMIT and what durability guarantees:

-- T=0: Client sends COMMIT
-- T=1: Database writes WAL record to disk (fsync)
--       WAL record includes: transaction ID, COMMIT marker, all changes
-- T=2: Database acknowledges COMMIT to client → "committed"
--       Client receives success response

-- <<< Server crashes at T=3 >>>

-- T=10: Server restarts
-- T=11: Database reads WAL
--        → Finds transaction with COMMIT record → REDO (apply changes to data files)
--        → Finds transactions without COMMIT record → ROLLBACK (undo partial changes)
-- T=12: Database is back online — all committed data intact

-- PostgreSQL WAL configuration (durability vs. performance tradeoffs):
-- synchronous_commit = on   → wait for WAL fsync (full durability, default)
-- synchronous_commit = off  → don't wait for WAL fsync (faster, risk ~100ms of data loss on crash)
-- fsync = on                → flush WAL to OS buffers (full durability, default)
-- fsync = off               → DANGEROUS: no durability guarantee — never use in production

-- SQLite equivalent: WAL mode
-- PRAGMA journal_mode = WAL;   -- use WAL for better concurrent reads + durability
-- PRAGMA synchronous = FULL;   -- fsync on every commit (default, safe)
-- PRAGMA synchronous = NORMAL; -- fsync less often (slightly faster, still safe)`}
      />

      <SQLPlayground
        initialQuery={`-- Verify SQLite's durability settings
PRAGMA journal_mode;   -- shows current journal mode (WAL or DELETE/rollback journal)
`}
        height={90}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="ACID Together — How the Four Properties Interact" />

      <P>The four ACID properties are not independent — they reinforce each other. Atomicity without Durability is useless (you committed but the data vanished). Isolation without Consistency is incomplete (transactions don't interfere but can still violate constraints). In practice, they form a single contract the database maintains:</P>

      <div style={{ display: 'grid', gap: 12, margin: '20px 0 32px' }}>
        {[
          { pair: 'Atomicity + Consistency', color: C, desc: 'Atomicity ensures no partial transaction applies. Consistency ensures every complete transaction produces a valid state. Together: only valid, complete state changes ever reach the database.' },
          { pair: 'Isolation + Atomicity', color: '#8b5cf6', desc: 'Isolation hides in-progress transaction changes. Atomicity ensures those changes either fully appear (on commit) or never appear (on rollback). Together: other transactions never see partial work.' },
          { pair: 'Durability + Atomicity', color: '#f97316', desc: 'Atomicity ensures only committed transactions take effect. Durability ensures committed transactions survive crashes. Together: exactly what was committed will be there after any failure.' },
          { pair: 'Isolation + Consistency', color: '#10b981', desc: 'Isolation prevents concurrent transactions from reading each other\'s partial work. Consistency ensures each transaction\'s completed work is valid. Together: concurrent transactions produce the same result as serial execution.' },
        ].map(item => (
          <div key={item.pair} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: item.color, margin: '0 0 8px' }}>{item.pair}</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        label="All four ACID properties in one transaction"
        code={`-- A FreshCart loyalty tier upgrade — all four properties at work
BEGIN;

  -- ISOLATION: this SELECT sees only committed data (READ COMMITTED default)
  -- Other sessions cannot see our changes until we COMMIT
  SELECT customer_id, loyalty_tier, first_name
  FROM customers
  WHERE customer_id = 42;

  -- CONSISTENCY: CHECK constraints on loyalty_tier values are enforced
  -- ATOMICITY: both UPDATEs are part of one indivisible unit
  UPDATE customers
  SET loyalty_tier = 'Gold'
  WHERE customer_id = 42;

  INSERT INTO loyalty_log (customer_id, old_tier, new_tier, upgraded_at)
  VALUES (42, 'Silver', 'Gold', date('now'));

-- DURABILITY: once COMMIT returns, both changes survive any crash
-- ATOMICITY: if INSERT fails, the UPDATE is also rolled back
COMMIT;`}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="ACID vs BASE — The NoSQL Tradeoff" />

      <P>Not all databases are ACID-compliant. Many NoSQL databases (Cassandra, DynamoDB, CouchDB) trade ACID guarantees for higher availability and partition tolerance. The alternative model is called <Hl>BASE</Hl>: Basically Available, Soft state, Eventually consistent.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, margin: '20px 0 28px' }}>
        {[
          {
            name: 'ACID',
            color: C,
            items: [
              'Strong consistency — reads always see the latest committed write',
              'Transactions are all-or-nothing',
              'Isolation prevents concurrent anomalies',
              'Durability guarantees no data loss on commit',
              'Best for: financial data, e-commerce orders, medical records',
              'Tradeoff: lower write throughput under heavy concurrent load',
            ],
          },
          {
            name: 'BASE',
            color: '#8b5cf6',
            items: [
              'Eventual consistency — reads eventually see the latest write (may lag)',
              'No transactions — individual writes are atomic, not multi-row',
              'No isolation — concurrent writes may conflict, resolved later',
              'Availability prioritized over consistency (stays up during network splits)',
              'Best for: social media feeds, recommendations, click tracking, logs',
              'Tradeoff: application must handle stale or conflicting reads',
            ],
          },
        ].map(model => (
          <div key={model.name} style={{ background: 'var(--surface)', border: `1px solid ${model.color}30`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: `${model.color}10`, borderBottom: `1px solid ${model.color}20` }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, color: model.color }}>{model.name}</span>
            </div>
            <ul style={{ margin: 0, padding: '14px 16px 14px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {model.items.map(item => (
                <li key={item} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout type="info">
        The choice between ACID and BASE is not about which is better — it is about which fits the workload. FreshCart orders, wallet balances, and inventory require ACID: no eventual consistency is acceptable when ₹1,000 is at stake. FreshCart's product recommendation engine or user activity log can tolerate BASE: a slightly stale recommendation or a 500ms lag in logging a page view is fine.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Real Failures ACID Prevents" />

      <P>Abstract properties are hard to remember. Concrete failures are not. Here are the five most common real-world database failures, and exactly which ACID property would have prevented each.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '20px 0' }}>
        {[
          {
            failure: 'Double-spend / partial payment',
            property: 'Atomicity',
            color: C,
            scenario: 'A payment service deducts ₹500 from the customer\'s wallet (committed) but the server crashes before crediting the merchant. ₹500 is permanently lost.',
            acid_fix: 'Wrap both the debit and credit in a single transaction. Either both commit or both roll back. The crash cannot leave one committed and one not.',
          },
          {
            failure: 'Negative stock / overselling',
            property: 'Isolation (SERIALIZABLE)',
            color: '#8b5cf6',
            scenario: 'Two customers simultaneously see stock = 1 for the last item, both purchase it, both decrement stock. Final stock = -1. Both customers receive order confirmations. Only one item exists.',
            acid_fix: 'SERIALIZABLE isolation detects that both transactions read and wrote the same row and forces one to retry. The retry reads stock = 0 and rejects the purchase.',
          },
          {
            failure: 'Order with invalid product reference',
            property: 'Consistency',
            color: '#10b981',
            scenario: 'A product is deleted from the products table. An existing order_items row references that product_id. Reports and queries now fail or return NULL for the product name.',
            acid_fix: 'FOREIGN KEY constraint (Consistency) prevents the product from being deleted while order_items rows reference it — or cascades the delete to order_items. The database enforces the relationship.',
          },
          {
            failure: 'Lost order after server crash',
            property: 'Durability',
            color: '#f97316',
            scenario: 'A customer places an order, receives a confirmation email, and the server crashes 50ms after COMMIT returns. On restart, the order is gone — it was only in memory.',
            acid_fix: 'Durability via WAL ensures the COMMIT is written to durable storage before returning success. The crash-restart cycle replays the WAL and restores the order.',
          },
          {
            failure: 'Report shows wrong totals mid-update',
            property: 'Isolation',
            color: '#f97316',
            scenario: 'A financial report runs for 10 seconds. Mid-report, a batch update changes 500 order amounts. The report reads some rows before the update and some after — totals are based on a mix of old and new values.',
            acid_fix: 'REPEATABLE READ or SERIALIZABLE isolation gives the report transaction a consistent snapshot taken at its start. All reads within the transaction see the same point in time.',
          },
        ].map(item => (
          <div key={item.failure} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: `${item.color}10`, borderBottom: `1px solid ${item.color}20`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{item.failure}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: '3px 10px', borderRadius: 4 }}>Fixed by: {item.property}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.7 }}><strong style={{ color: 'var(--text)' }}>Failure: </strong>{item.scenario}</p>
              <p style={{ fontSize: 12, color: '#00e676', margin: 0, lineHeight: 1.7 }}><strong>ACID fix: </strong>{item.acid_fix}</p>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 — Interview Prep ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does ACID stand for and why does it matter?">
        <p style={{ margin: '0 0 12px' }}>ACID stands for Atomicity, Consistency, Isolation, and Durability — the four properties that define the reliability guarantees of relational database transactions.</p>
        <p style={{ margin: '0 0 12px' }}><strong>Atomicity</strong> means a transaction is all-or-nothing. Either all SQL statements in the transaction execute and commit, or none of them take effect. If any statement fails, the entire transaction is rolled back. This prevents partial state changes — a payment deduction without the corresponding credit is impossible.</p>
        <p style={{ margin: '0 0 12px' }}><strong>Consistency</strong> means a transaction can only move the database between valid states. The database enforces all declared constraints (NOT NULL, UNIQUE, FOREIGN KEY, CHECK) at commit time. A transaction that would violate any constraint is rejected, preserving the integrity rules built into the schema.</p>
        <p style={{ margin: '0 0 12px' }}><strong>Isolation</strong> means concurrent transactions behave as if they ran one at a time. Each transaction sees a consistent view of the data without being affected by in-progress writes from other transactions. This prevents anomalies like dirty reads (reading uncommitted data) and phantoms (seeing rows inserted by another transaction mid-query).</p>
        <p style={{ margin: '0 0 12px' }}><strong>Durability</strong> means once a transaction commits, its changes are permanent. A server crash immediately after COMMIT will not lose the data. The database achieves this through write-ahead logging — changes are written to durable storage before COMMIT returns.</p>
        <p style={{ margin: 0 }}>ACID matters because data integrity cannot be compromised in financial, e-commerce, and medical applications. Without ACID, a system can leave money in neither the sender's nor receiver's account, create orders for products that don't exist, or lose confirmed transactions entirely after a crash.</p>
      </IQ>

      <IQ q="What is the difference between Atomicity and Consistency?">
        <p style={{ margin: '0 0 12px' }}>Atomicity and Consistency are related but address different concerns. Atomicity is about completeness — a transaction either fully commits all its changes or fully reverses all of them. It is enforced through the transaction mechanism (BEGIN/COMMIT/ROLLBACK) and the write-ahead log. Atomicity says nothing about whether the committed data is valid — only that it is complete.</p>
        <p style={{ margin: '0 0 12px' }}>Consistency is about validity — the data must satisfy all declared rules (constraints, foreign keys, check conditions) before and after every transaction. It is enforced through schema-level constraints. A transaction can be atomic (all statements completed) but still violate consistency if the constraints reject it. In practice, an atomicity failure rarely happens — it is the database's job to ensure all-or-nothing. A consistency violation is what happens when your application logic allows bad data that the constraints catch.</p>
        <p style={{ margin: 0 }}>Example: INSERT INTO order_items with an invalid product_id violates Consistency (FK constraint fails). The INSERT is rejected. The transaction is rolled back — which is also Atomicity in action. But Consistency was the rule that identified the violation, and Atomicity was the mechanism that ensured no partial state was written. They work together: Consistency defines what "valid" means, Atomicity ensures only valid-or-nothing states ever persist.</p>
      </IQ>

      <IQ q="How does Isolation differ from Consistency?">
        <p style={{ margin: '0 0 12px' }}>Consistency is a property of the data itself — it concerns whether the data satisfies defined rules at rest. Isolation is a property of concurrent execution — it concerns whether concurrent transactions interfere with each other's execution.</p>
        <p style={{ margin: '0 0 12px' }}>Consistency says: after every committed transaction, all constraints and rules are satisfied. Isolation says: while a transaction is in progress, other transactions cannot see its uncommitted changes (at standard isolation levels), and each transaction sees a consistent snapshot of the database.</p>
        <p style={{ margin: 0 }}>You can have Consistency without strong Isolation — each transaction individually satisfies constraints, but two concurrent transactions could still read each other's partial work (low isolation level). And you can have strong Isolation without perfect Consistency — the isolation mechanisms prevent concurrent interference, but if your constraints are wrong or missing, invalid data can still be committed. Both are independently necessary. Consistency prevents invalid data from being written. Isolation prevents concurrent transactions from creating anomalies through their interaction.</p>
      </IQ>

      <IQ q="What is eventual consistency and when is it acceptable?">
        <p style={{ margin: '0 0 12px' }}>Eventual consistency is a weaker guarantee offered by many distributed and NoSQL databases. Instead of guaranteeing that every read sees the latest committed write (strong consistency), eventual consistency guarantees only that if no new writes occur, all replicas will eventually converge to the same state. Between a write and that convergence, different nodes or readers may return different, stale, or conflicting values.</p>
        <p style={{ margin: '0 0 12px' }}>Eventual consistency is acceptable when: (1) the data is not financial or inventory-critical — a user's "likes" count being 1 second stale is acceptable, (2) operations are idempotent or easily reconciled — appending to a log can handle duplicates, (3) availability is more important than consistency — the system should stay up even if some nodes are unreachable, even if that means stale data.</p>
        <p style={{ margin: 0 }}>Eventual consistency is NOT acceptable for: wallet balances (a stale balance could allow overdrafts), order inventory (stale stock could allow overselling), payment records (a lost write means lost money), or medical records (stale data could affect patient safety). FreshCart's orders, payments, and stock all require strong consistency. FreshCart's product browsing history, search analytics, or recommendation click-through rates could tolerate eventual consistency. The choice is workload-driven, not ideological.</p>
      </IQ>

      <IQ q="How does a database achieve Durability — what is WAL?">
        <p style={{ margin: '0 0 12px' }}>Durability is achieved through Write-Ahead Logging (WAL). The core principle: before any change is applied to the actual database data files, the intended change is first written to the WAL — a sequential, append-only log on durable storage (disk). The WAL entry records everything needed to redo or undo the change: the transaction ID, the before-value (for rollback), the after-value (for replay), and eventually a COMMIT or ABORT record.</p>
        <p style={{ margin: '0 0 12px' }}>When a client issues COMMIT, the database performs an fsync — it flushes the WAL to durable storage (past the OS buffer cache, all the way to the physical disk). Only after this fsync succeeds does the database send the COMMIT acknowledgment to the client. The client only hears "committed" after the data is guaranteed to survive a crash.</p>
        <p style={{ margin: '0 0 12px' }}>On crash recovery, the database reads the WAL from the last checkpoint: any transaction with a COMMIT record is redone (its changes are applied to the data files if not already there). Any transaction without a COMMIT record is undone (its partial changes are removed). This brings the database to a consistent state matching exactly what was committed.</p>
        <p style={{ margin: 0 }}>In SQLite, the same concept exists as the rollback journal (default) or WAL mode (PRAGMA journal_mode = WAL). In WAL mode, writes go to a WAL file first; readers can still read from the main database file concurrently. Periodic checkpoints merge the WAL back into the main database file. The durability guarantee is identical: COMMIT only returns after the WAL is fsynced to disk.</p>
      </IQ>

      <HR />

      {/* ── PART 10 — Errors ── */}
      <Part n="10" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Inconsistent data: order status = 'Delivered' but no payment_log record exists"
        cause="Two separate DML statements were executed in autocommit mode (each committed independently). The first UPDATE committed successfully. The server crashed, the connection dropped, or the second INSERT raised an error — but since it was a separate transaction, the first UPDATE is already permanent. Partial state is now stored in the database."
        fix="Always wrap multi-statement operations that must atomically succeed together in an explicit BEGIN...COMMIT block. The fix is to rewrite the code path so both the UPDATE and INSERT are inside one transaction. Add a monitoring query that checks for this invariant (delivered orders with no payment_log) to catch historical violations. Going forward, the transaction prevents the partial state from occurring."
      />

      <Err
        msg="ERROR: FOREIGN KEY constraint failed"
        cause="An INSERT or UPDATE references a value in a parent table that does not exist. This is the Consistency property working correctly — the database is preventing you from creating an orphaned row that would violate referential integrity. Common triggers: inserting an order_item for a product_id that was deleted, inserting an order for a customer_id that was never created, or inserting with an incorrect ID due to an application bug."
        fix="Check that the referenced row exists before inserting. Use a SELECT to verify the parent row exists: SELECT 1 FROM products WHERE product_id = ?. If the parent row should exist but does not, fix the code that should have created it. If deletes cascade, add ON DELETE CASCADE or ON DELETE SET NULL to the FOREIGN KEY definition. Never disable FK enforcement (PRAGMA foreign_keys = OFF in SQLite) to work around this error — the constraint is telling you about a real data integrity problem."
      />

      <Err
        msg="Data visible in one session that was rolled back in another"
        cause="The isolation level is set to READ UNCOMMITTED, or there is a bug where a transaction committed when it should have rolled back. At READ UNCOMMITTED (not supported in PostgreSQL — maps to READ COMMITTED), other sessions can read your uncommitted changes. A successful read of data that was then rolled back is a dirty read — the data the reader saw never officially existed."
        fix="Use READ COMMITTED or higher (the default in most databases). Verify your application code does not have a bug where COMMIT is called when it should ROLLBACK. In PostgreSQL, READ UNCOMMITTED is not available — if you observe apparently dirty reads, the transaction that wrote the data committed before your read, not after. Investigate the commit ordering, not the isolation level."
      />

      <Err
        msg="Report total changes between two runs — same query, different result"
        cause="The report runs a long query across many tables. Between two executions of a sub-query, another transaction commits changes to the rows being aggregated. At READ COMMITTED, each statement sees a fresh snapshot — the second execution of the same sub-query sees the newly committed data. The report is computing over two different snapshots of the database."
        fix="Run the entire report inside a single transaction at REPEATABLE READ isolation: BEGIN; SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; [all report queries]; COMMIT; All reads within this transaction see the same consistent snapshot, regardless of what other transactions commit during the report's execution. This is the correct pattern for any report that must be internally consistent."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write queries that demonstrate all four ACID properties using the FreshCart schema. For each property, write a query or code block that: (A) shows Atomicity by simulating a payment that must debit and credit atomically; (B) shows Consistency by attempting an INSERT that violates a constraint; (C) shows Isolation by writing two queries that represent what two concurrent sessions would each see; (D) shows Durability by describing the WAL check query. Wrap the Atomicity demo in a BEGIN...ROLLBACK block."
        hint="BEGIN; two-statement payment scenario; ROLLBACK. For Consistency: try INSERT with NULL in a NOT NULL column. For Isolation: same SELECT run twice with a comment about what REPEATABLE READ would guarantee."
        answer={`-- A: ATOMICITY — payment must debit and credit as one unit
BEGIN;

-- Step 1: Check the order exists and is processing
SELECT order_id, total_amount, order_status
FROM orders
WHERE order_id = 1 AND order_status = 'Processing';

-- Step 2: Would deduct from customer balance
-- UPDATE customer_wallets SET balance = balance - 450.00
-- WHERE customer_id = 1;

-- Step 3: Would credit FreshCart account
-- UPDATE store_revenue SET total = total + 450.00
-- WHERE store_id = 'ST001';

-- Step 4: Log the payment
-- INSERT INTO payment_log (order_id, amount, status)
-- VALUES (1, 450.00, 'settled');

-- If ANY step fails, ROLLBACK undoes all previous steps
ROLLBACK;  -- playground-safe: undo our read-only transaction

-- B: CONSISTENCY — constraint violations are rejected
-- This would fail: NOT NULL constraint
-- INSERT INTO products (product_name, unit_price) VALUES (NULL, 50.0);
-- ERROR: NOT NULL constraint failed

-- This would fail: FOREIGN KEY constraint (order_id 99999 does not exist)
-- INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
-- VALUES (99999, 1, 1, 50.0, 50.0);
-- ERROR: FOREIGN KEY constraint failed

-- C: ISOLATION — two concurrent sessions see consistent snapshots
-- Session 1 (report): reads current order totals
SELECT order_status, COUNT(*) AS cnt, ROUND(SUM(total_amount),2) AS revenue
FROM orders GROUP BY order_status;

-- If Session 2 commits a new order BETWEEN Session 1's two reads,
-- at READ COMMITTED: Session 1's second read would see the new order
-- at REPEATABLE READ: Session 1 sees the same snapshot throughout

-- D: DURABILITY — WAL mode check in SQLite
PRAGMA journal_mode;   -- 'wal' means write-ahead logging is active`}
        explanation="The Atomicity block shows the pattern: BEGIN wraps all payment steps. If step 3 fails (credit), step 2's debit is also rolled back. ROLLBACK at the end is playground-safe. The Consistency examples are commented out because they would fail — those errors ARE the demonstration: the database is enforcing the rules. The Isolation query shows a snapshot read; at REPEATABLE READ the result is guaranteed identical if re-run within the same transaction. The Durability check uses SQLite's PRAGMA to confirm WAL mode is active, which means COMMIT = fsync to WAL before returning."
      />

      <HR />

      <KeyTakeaways
        items={[
          'ACID: Atomicity (all-or-nothing), Consistency (only valid states), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes).',
          'Atomicity is enforced by the transaction mechanism and WAL rollback on crash. Every statement in a BEGIN...COMMIT block is part of one indivisible unit.',
          'Consistency is enforced by schema constraints: NOT NULL, UNIQUE, CHECK, FOREIGN KEY. A transaction that violates any constraint is rejected entirely.',
          'Isolation is enforced by MVCC and locking. Four levels: READ UNCOMMITTED, READ COMMITTED (default), REPEATABLE READ, SERIALIZABLE. Higher isolation = fewer anomalies, lower concurrency.',
          'Durability is enforced by WAL (Write-Ahead Logging). COMMIT only returns after changes are fsynced to disk. Crash recovery replays the WAL to restore all committed transactions.',
          'BASE (Eventually Consistent) trades ACID guarantees for higher availability and write throughput. Acceptable for non-critical data; never for financial or inventory data.',
          'The five ACID-preventable failures: double-spend (Atomicity), overselling (Isolation), orphaned FK rows (Consistency), lost confirmed orders (Durability), inconsistent reports (Isolation).',
          'Always wrap multi-statement operations in explicit transactions. Never rely on autocommit for operations that must be atomic.',
        ]}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 49</strong>, you learn Stored Procedures — reusable named programs stored in the database, with parameters, control flow, and exception handling.
        </p>
        <Link href="/learn/sql/stored-procedures" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 49 → Stored Procedures
        </Link>
      </div>

    </LearnLayout>
  );
}
