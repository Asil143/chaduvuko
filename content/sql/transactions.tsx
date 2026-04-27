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

const AcidCard = ({ letter, word, color, plain, technical, example }: {
  letter: string; word: string; color: string;
  plain: string; technical: string; example: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20`, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color, lineHeight: 1 }}>{letter}</span>
      <div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{word}</span>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '2px 0 0' }}>{plain}</p>
      </div>
    </div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: '0 0 10px' }}>{technical}</p>
      <div style={{ background: 'var(--bg)', borderRadius: 6, padding: '10px 12px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>FreshCart example</p>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{example}</p>
      </div>
    </div>
  </div>
);

const IsolationCard = ({ level, color, prevents, allows, use }: {
  level: string; color: string; prevents: string; allows: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}25`, borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color }}>{level}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
      {[['Prevents', prevents, '#00e676'], ['Allows', allows, '#ff4757'], ['Use when', use, 'var(--muted)']].map(([label, val, textColor]) => (
        <div key={label as string}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label as string}</p>
          <p style={{ fontSize: 12, color: textColor as string, margin: 0, lineHeight: 1.5 }}>{val as string}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Transactions() {
  return (
    <LearnLayout
      title="Transactions and ACID"
      description="How databases guarantee correctness — BEGIN, COMMIT, ROLLBACK, savepoints, isolation levels, and the concurrency anomalies that each level prevents"
      section="SQL — Module 47"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a Transaction Is — and Why It Exists" />

      <P>A transaction is a group of SQL statements that the database treats as a <Hl>single indivisible unit of work</Hl>. Either all statements in the transaction succeed and are permanently saved, or none of them take effect. There is no in-between state visible to other users or sessions.</P>

      <P>The classic example: a customer pays ₹500 for a FreshCart order. Two things must happen — the customer's wallet balance decreases by ₹500 AND FreshCart's account increases by ₹500. If the first statement succeeds but the database crashes before the second, the customer has lost ₹500 with nothing to show for it. A transaction prevents this: both updates are wrapped in a single unit. If the crash happens mid-transaction, the database rolls back the first update on restart. Either both succeed or neither does.</P>

      <CodeBlock
        label="Transaction anatomy — BEGIN, COMMIT, ROLLBACK"
        code={`-- Start a transaction
BEGIN;               -- or: START TRANSACTION;

-- All statements between BEGIN and COMMIT are one unit
UPDATE wallets SET balance = balance - 500 WHERE user_id = 42;
UPDATE wallets SET balance = balance + 500 WHERE merchant_id = 99;
INSERT INTO payment_log (user_id, amount, status) VALUES (42, 500, 'success');

-- If all succeeded: make permanent
COMMIT;

-- If anything went wrong: undo everything back to BEGIN
ROLLBACK;

-- Without a transaction (autocommit mode):
-- Each statement is its own transaction
-- UPDATE wallets SET balance = balance - 500 WHERE user_id = 42;
-- ↑ This is committed immediately — no way to roll it back if the next statement fails`}
      />

      <SQLPlayground
        initialQuery={`-- Preview: what a payment transaction would look like
-- (SELECT only — we won't modify FreshCart data here)
BEGIN;

-- Step 1: verify customer has sufficient balance (check before deducting)
SELECT customer_id, loyalty_tier
FROM customers
WHERE customer_id = 1;

-- Step 2: check order details
SELECT order_id, total_amount, order_status
FROM orders
WHERE order_id = 1
  AND order_status = 'Processing';

-- In a real payment: UPDATE wallet, INSERT payment_log, UPDATE order_status
-- All or nothing — if any step fails, ROLLBACK undoes everything

ROLLBACK;   -- clean up the read-only transaction`}
        height={235}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="ACID — The Four Guarantees" />

      <P>ACID is the set of four properties that define what a reliable database transaction must guarantee. These are not optional features — they are the contract every SQL database makes about how transactions behave under normal operation, concurrent access, and failure scenarios.</P>

      <AcidCard
        letter="A"
        word="Atomicity"
        color={C}
        plain="All or nothing — the transaction never partially completes"
        technical="Every statement in a transaction either fully succeeds (all changes applied) or fully fails (no changes applied). If any statement in the transaction raises an error, the database automatically rolls back all previous statements in that transaction. Partial commits are impossible — the database will never show a state where some statements of a transaction applied and others did not."
        example="A FreshCart order involves: INSERT into orders, INSERT into order_items (one per product), UPDATE products (decrement stock), INSERT into payment_log. Atomicity guarantees that if the payment_log insert fails, the order and order_items and stock changes are also rolled back. The customer's order either fully exists or does not exist at all."
      />

      <AcidCard
        letter="C"
        word="Consistency"
        color="#10b981"
        plain="Transactions can only take the database from one valid state to another"
        technical="A transaction must bring the database from one consistent state to another consistent state. Consistency is defined by the constraints, rules, and invariants declared in the schema — NOT NULL, UNIQUE, CHECK, FOREIGN KEY constraints, and any application-level business rules. A transaction that would violate any constraint is rejected entirely."
        example="FreshCart's order_items table has a FK to products. Consistency means a transaction cannot insert an order_item referencing a non-existent product_id — the FK constraint is checked and the transaction is rejected. After a successful order, the sum of line_total in order_items should equal orders.total_amount — this business invariant must hold after every commit."
      />

      <AcidCard
        letter="I"
        word="Isolation"
        color="#8b5cf6"
        plain="Concurrent transactions don't interfere with each other"
        technical="Each transaction executes as if it were the only transaction running, even when hundreds of transactions run simultaneously. Changes made by an in-progress transaction are not visible to other transactions until the first transaction commits (at the default isolation level). This prevents one transaction from reading dirty, inconsistent intermediate states written by another in-flight transaction."
        example="Two FreshCart customers simultaneously try to buy the last unit of Amul Butter (stock = 1). Without isolation, both transactions could read stock = 1, both deduct 1, and both succeed — leaving stock at -1 (an impossible state). Isolation ensures one transaction wins and the other sees stock = 0 and fails, maintaining the invariant that stock >= 0."
      />

      <AcidCard
        letter="D"
        word="Durability"
        color="#f97316"
        plain="Committed data survives crashes"
        technical="Once a transaction commits, its changes are permanently recorded — even if the database server crashes immediately after COMMIT returns. The database achieves this through write-ahead logging (WAL): changes are written to a persistent log before they are applied to the main data files. On restart after a crash, the database replays the WAL to recover any committed changes that had not yet been written to main storage."
        example="A customer's FreshCart order is placed at 11:59 PM. The server crashes at 12:00 AM. On restart, the order is still there — the COMMIT was written to the WAL before the crash. The customer's order confirmation email was correct — the data is durable. Without durability, a crash after COMMIT could silently lose the order."
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="BEGIN, COMMIT, and ROLLBACK in Practice" />

      <CodeBlock
        label="Complete transaction patterns"
        code={`-- Pattern 1: Simple two-statement transaction
BEGIN;
  UPDATE orders SET order_status = 'Delivered', delivery_date = CURRENT_DATE
  WHERE order_id = 1001;

  INSERT INTO delivery_log (order_id, delivered_at, delivered_by)
  VALUES (1001, NOW(), 'Rider-42');
COMMIT;

-- Pattern 2: Transaction with error check and conditional rollback
BEGIN;
  UPDATE products SET in_stock = false WHERE product_id = 55;
  UPDATE order_items SET unit_price = unit_price * 1.05
  WHERE product_id = 55;
  -- If either fails, ROLLBACK is implicit on error in most configs
  -- In application code, check the error and issue ROLLBACK explicitly
COMMIT;

-- Pattern 3: Manual ROLLBACK when business logic fails
BEGIN;
  SELECT stock_quantity INTO v_stock FROM products WHERE product_id = 55;
  IF v_stock < order_qty THEN
    ROLLBACK;    -- insufficient stock — undo and exit
    RETURN;
  END IF;
  UPDATE products SET stock_quantity = stock_quantity - order_qty
  WHERE product_id = 55;
COMMIT;

-- Pattern 4: DDL in transactions (PostgreSQL — not MySQL)
BEGIN;
  ALTER TABLE orders ADD COLUMN delivery_partner_id INTEGER;
  UPDATE orders SET delivery_partner_id = 1 WHERE store_id = 'ST001';
COMMIT;
-- If the UPDATE fails, the ALTER TABLE is also rolled back`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate transaction state: what changes are visible when
-- In a real multi-session scenario, Session B cannot see Session A's
-- uncommitted changes (at default READ COMMITTED isolation)

-- Simulate a loyalty tier upgrade transaction
BEGIN;

-- Step 1: check current tier
SELECT customer_id, loyalty_tier, first_name
FROM customers
WHERE customer_id = 1;

-- Step 2: calculate if upgrade is warranted
SELECT
  customer_id,
  ROUND(SUM(total_amount), 2) AS lifetime_value,
  CASE
    WHEN SUM(total_amount) > 2000 THEN 'Platinum'
    WHEN SUM(total_amount) > 1000 THEN 'Gold'
    WHEN SUM(total_amount) > 500  THEN 'Silver'
    ELSE 'Bronze'
  END AS earned_tier
FROM orders
WHERE customer_id = 1
  AND order_status = 'Delivered'
GROUP BY customer_id;

-- In production: UPDATE customers SET loyalty_tier = earned_tier ...
-- Then COMMIT to make permanent, or ROLLBACK if validation fails

ROLLBACK;  -- undo our read-only transaction`}
        height={265}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="SAVEPOINT — Partial Rollback Within a Transaction" />

      <P>A savepoint marks a point within a transaction that you can roll back to without abandoning the entire transaction. This enables partial rollback — undoing only the most recent statements while keeping earlier work intact.</P>

      <CodeBlock
        label="SAVEPOINT syntax"
        code={`-- Full pattern: BEGIN → work → SAVEPOINT → more work → ROLLBACK TO or RELEASE
BEGIN;

  INSERT INTO orders (customer_id, store_id, total_amount, order_status)
  VALUES (42, 'ST001', 1250.00, 'Processing');

  SAVEPOINT after_order;    -- mark this point

  INSERT INTO order_items (order_id, product_id, quantity, line_total)
  VALUES (currval('orders_order_id_seq'), 99, 2, 1250.00);
  -- ↑ if product_id 99 doesn't exist → FK violation

  -- If the order_items insert failed:
  ROLLBACK TO SAVEPOINT after_order;   -- undo only the order_items insert
  -- The order INSERT is still intact — we rolled back to after_order
  -- Now we can try a different product or handle the error

  -- After fixing the problem:
  INSERT INTO order_items (order_id, product_id, quantity, line_total)
  VALUES (currval('orders_order_id_seq'), 5, 2, 1250.00);

  RELEASE SAVEPOINT after_order;  -- discard the savepoint (optional cleanup)

COMMIT;  -- commit both the order and the corrected order_items

-- Multiple savepoints in one transaction:
SAVEPOINT sp1;
SAVEPOINT sp2;
ROLLBACK TO SAVEPOINT sp1;  -- rolls back sp2 AND everything after sp1
-- sp2 is automatically released when rolling back past it`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate savepoint-style logic with CTEs (playground-safe)
-- In production this would be inside a BEGIN...COMMIT block
WITH
-- Step 1: find the order we want to process
target_order AS (
  SELECT order_id, customer_id, total_amount, order_status
  FROM orders
  WHERE order_id = 1
    AND order_status = 'Processing'
),
-- Step 2: verify customer exists (equivalent to FK check)
customer_check AS (
  SELECT c.customer_id, c.loyalty_tier
  FROM customers AS c
  JOIN target_order AS t ON c.customer_id = t.customer_id
),
-- Step 3: verify stock availability for all items
stock_check AS (
  SELECT
    oi.product_id,
    p.product_name,
    p.in_stock,
    oi.quantity,
    CASE WHEN p.in_stock THEN 'OK' ELSE 'Out of stock' END AS stock_status
  FROM order_items AS oi
  JOIN products    AS p ON oi.product_id = p.product_id
  JOIN target_order AS t ON oi.order_id = t.order_id
)
-- Show what each savepoint step would validate
SELECT 'Order check' AS step, order_id::TEXT AS detail, order_status AS status
FROM target_order
UNION ALL
SELECT 'Customer check', customer_id::TEXT, loyalty_tier FROM customer_check
UNION ALL
SELECT 'Stock check', product_name, stock_status FROM stock_check;`}
        height={290}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Autocommit — The Default Mode" />

      <P>When you run SQL statements outside of an explicit BEGIN...COMMIT block, most databases operate in <Hl>autocommit</Hl> mode — each statement is its own implicit transaction that is committed immediately after it succeeds. This is convenient for ad-hoc queries but dangerous for multi-statement operations that must succeed or fail together.</P>

      <CodeBlock
        label="Autocommit mode — behaviour and implications"
        code={`-- AUTOCOMMIT ON (default in most clients):
-- Each statement below is its own transaction — committed immediately

UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1001;
-- ↑ COMMITTED immediately — no way to roll this back

INSERT INTO delivery_log VALUES (1001, NOW());
-- ↑ COMMITTED immediately — independent of the UPDATE above

-- If the INSERT fails, the UPDATE is already permanent
-- This is the bug: the order is marked Delivered but has no delivery log

-- SOLUTION: wrap in explicit transaction
BEGIN;
  UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1001;
  INSERT INTO delivery_log VALUES (1001, NOW());
COMMIT;
-- Now both succeed together or both are rolled back together

-- Checking autocommit mode in PostgreSQL:
SHOW autocommit;        -- shows current setting
-- In psql: \echo :AUTOCOMMIT

-- In different clients:
-- psql:          autocommit OFF by default in interactive mode
-- DBeaver:       autocommit ON by default
-- Python psycopg2: autocommit OFF by default (manual commit required)
-- SQLAlchemy:    autocommit OFF by default (session.commit() required)`}
      />

      <Callout type="warning">
        Never run multi-statement DML (UPDATE + INSERT, or multiple UPDATEs that must succeed together) in autocommit mode. Each statement commits independently — a failure in statement 2 does not undo statement 1. Always wrap multi-statement operations in explicit BEGIN...COMMIT blocks. When in doubt, use explicit transactions — the overhead is negligible for the correctness guarantee they provide.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Isolation Levels — Controlling What Concurrent Transactions See" />

      <P>Isolation is a spectrum, not a binary. Higher isolation provides stronger correctness guarantees but reduces concurrency (more waiting). Lower isolation allows more concurrent access but permits certain anomalies — reads that see inconsistent or phantom data. SQL defines four isolation levels, each preventing a specific set of concurrency anomalies.</P>

      <H>The three concurrency anomalies</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0 32px' }}>
        {[
          {
            name: 'Dirty Read',
            color: '#ff4757',
            desc: 'Transaction A reads data written by Transaction B that has not yet committed. If B rolls back, A read data that never officially existed.',
            example: 'Customer A reads their wallet balance. Customer B is mid-transaction adding a refund — their UPDATE is not yet committed. A reads the inflated balance, sees ₹1,200 instead of the real ₹800. B rolls back. The ₹1,200 A read was a ghost.',
          },
          {
            name: 'Non-Repeatable Read',
            color: '#f97316',
            desc: 'Transaction A reads a row, then reads it again and gets a different value because Transaction B committed a change between A\'s two reads.',
            example: 'A settlement report reads FreshCart order #1001 total_amount = ₹850 at the start of the report. Midway through the report, a refund transaction commits and changes #1001 to ₹750. The report re-reads #1001 and gets ₹750. The same row returned two different values in the same report run.',
          },
          {
            name: 'Phantom Read',
            color: '#8b5cf6',
            desc: 'Transaction A runs a query and gets N rows. Transaction B inserts or deletes rows that match A\'s WHERE condition and commits. A re-runs the same query and gets a different number of rows.',
            example: 'An inventory query counts 5 products in the Dairy category. Between two executions of the same count query, another transaction inserts a new Dairy product. The second execution returns 6. Same query, different row count — the new row is a "phantom".',
          },
        ].map(item => (
          <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: `${item.color}10`, borderBottom: `1px solid ${item.color}20` }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: item.color }}>{item.name}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: '0 0 10px' }}>{item.desc}</p>
              <div style={{ background: 'var(--bg)', borderRadius: 6, padding: '10px 12px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Example</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{item.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <H>The four isolation levels</H>

      <IsolationCard
        level="READ UNCOMMITTED"
        color="#ff4757"
        prevents="Nothing — all anomalies possible"
        allows="Dirty reads, non-repeatable reads, phantom reads"
        use="Almost never — only for approximate counts or reporting where speed matters more than accuracy. Not supported in PostgreSQL (maps to READ COMMITTED)."
      />
      <IsolationCard
        level="READ COMMITTED (PostgreSQL default)"
        color="#f97316"
        prevents="Dirty reads — only sees committed data"
        allows="Non-repeatable reads, phantom reads"
        use="Default for most OLTP workloads. Each statement sees a fresh snapshot of committed data. Sufficient for most web application transactions."
      />
      <IsolationCard
        level="REPEATABLE READ"
        color={C}
        prevents="Dirty reads, non-repeatable reads"
        allows="Phantom reads (in SQL standard; PostgreSQL's REPEATABLE READ also prevents phantoms)"
        use="Long-running reports and analytics that must see a consistent snapshot throughout. Financial reports that read the same row multiple times."
      />
      <IsolationCard
        level="SERIALIZABLE (strongest)"
        color="#00e676"
        prevents="All anomalies — dirty reads, non-repeatable reads, phantom reads, serialisation anomalies"
        allows="Nothing — equivalent to transactions running one at a time"
        use="Financial transfers, inventory management, any scenario where correctness absolutely cannot be compromised. Lowest concurrency — highest contention."
      />

      <CodeBlock
        label="Setting isolation level"
        code={`-- Set for the current transaction (must be set before any DML)
BEGIN;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  UPDATE products SET in_stock = false WHERE product_id = 55;
  -- Other transactions trying to read product 55 may wait or see conflicts
COMMIT;

-- Set for the current session (all subsequent transactions use this level)
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Check current isolation level
SHOW transaction_isolation;

-- Common defaults:
-- PostgreSQL: READ COMMITTED
-- MySQL InnoDB: REPEATABLE READ
-- SQL Server: READ COMMITTED
-- Oracle: READ COMMITTED`}
      />

      <SQLPlayground
        initialQuery={`-- Show current isolation level and transaction state in DuckDB
SELECT
  current_setting('transaction_isolation')    AS isolation_level,
  current_setting('transaction_read_only')    AS read_only;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Locking — How Isolation Is Enforced" />

      <P>Databases enforce isolation through locking — transactions acquire locks on rows or tables they access, preventing conflicting operations by other transactions until the lock is released. Understanding the two primary lock types explains why concurrent transactions sometimes wait for each other.</P>

      <CodeBlock
        label="Row-level locks — shared and exclusive"
        code={`-- SHARED LOCK (S-lock): acquired for reads
-- Multiple transactions can hold shared locks on the same row simultaneously
-- (Multiple readers are fine — they do not conflict with each other)
SELECT * FROM orders WHERE order_id = 1;   -- acquires shared lock (briefly)

-- For explicit shared lock (prevents others from modifying until released):
SELECT * FROM orders WHERE order_id = 1 FOR SHARE;
-- Other transactions can still read but cannot UPDATE/DELETE until your TX ends

-- EXCLUSIVE LOCK (X-lock): acquired for writes
-- Only one transaction can hold an exclusive lock on a row at a time
-- Blocks all other reads (at SERIALIZABLE) or writes (at READ COMMITTED)
SELECT * FROM orders WHERE order_id = 1 FOR UPDATE;
-- Now locked exclusively — other transactions trying to UPDATE/DELETE this row
-- must WAIT until your transaction commits or rolls back

-- SKIP LOCKED: don't wait — skip rows that are already locked
-- (useful for queue processing — skip rows another worker has locked)
SELECT * FROM orders
WHERE order_status = 'Processing'
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- NOWAIT: fail immediately if lock cannot be acquired (don't wait)
SELECT * FROM orders WHERE order_id = 1
FOR UPDATE NOWAIT;   -- raises ERROR immediately if row is locked`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what queue-based order processing looks like
-- Workers compete for 'Processing' orders using FOR UPDATE SKIP LOCKED
-- (demonstrating the query pattern — lock actually held in a real transaction)
SELECT
  order_id,
  customer_id,
  store_id,
  total_amount,
  order_status,
  order_date
FROM orders
WHERE order_status = 'Processing'
ORDER BY order_date
LIMIT 3;
-- In production: wrap in BEGIN; ... FOR UPDATE SKIP LOCKED; ... COMMIT;
-- Each worker picks up a different order without blocking others`}
        height={195}
        showSchema={true}
      />

      <H>Deadlock — when two transactions wait for each other</H>

      <CodeBlock
        label="Deadlock — cause and prevention"
        code={`-- DEADLOCK: Transaction A holds lock on row 1, wants row 2
--            Transaction B holds lock on row 2, wants row 1
--            Both wait forever — deadlock detected and one is killed

-- Session A:
BEGIN;
UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1;  -- locks row 1
-- (waits for Session B to release row 2...)
UPDATE orders SET total_amount = 900 WHERE order_id = 2;          -- wants row 2

-- Session B (concurrent):
BEGIN;
UPDATE orders SET total_amount = 850 WHERE order_id = 2;  -- locks row 2
-- (waits for Session A to release row 1...)
UPDATE orders SET order_status = 'Cancelled' WHERE order_id = 1;  -- wants row 1
-- → DEADLOCK detected: one session is automatically rolled back

-- PREVENTION: always acquire locks in the same order
-- Both sessions should lock row 1 first, then row 2
-- If both follow the same order, one will wait (not deadlock)

-- In PostgreSQL: deadlock detected automatically, one transaction rolled back
-- ERROR: deadlock detected
-- DETAIL: Process 1234 waits for ShareLock on transaction 5678
--         Process 5678 waits for ShareLock on transaction 1234
-- HINT:   See server log for query details.`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Transactions in Real Application Code" />

      <P>In application code, transactions are managed through the database driver or ORM. The pattern is consistent: open a connection, begin a transaction, execute statements, commit on success, rollback on any error.</P>

      <CodeBlock
        label="Transaction patterns in Python (psycopg2)"
        code={`import psycopg2

conn = psycopg2.connect(dsn)

# Pattern 1: Manual transaction management
try:
    cur = conn.cursor()
    cur.execute("""
        UPDATE orders
        SET order_status = 'Delivered', delivery_date = CURRENT_DATE
        WHERE order_id = %s
    """, (order_id,))

    cur.execute("""
        INSERT INTO delivery_log (order_id, delivered_at, delivered_by)
        VALUES (%s, NOW(), %s)
    """, (order_id, rider_id))

    conn.commit()          # both succeed → commit
except Exception as e:
    conn.rollback()        # any error → rollback both
    raise e
finally:
    cur.close()

# Pattern 2: Context manager (cleaner — auto-commits or rolls back)
with conn:                 # conn acts as context manager
    with conn.cursor() as cur:
        cur.execute("UPDATE wallets SET balance = balance - %s WHERE user_id = %s",
                    (amount, user_id))
        cur.execute("UPDATE wallets SET balance = balance + %s WHERE merchant_id = %s",
                    (amount, merchant_id))
# Automatically COMMITs on exit; ROLLBACKs on exception

# Pattern 3: SQLAlchemy ORM
from sqlalchemy.orm import Session

with Session(engine) as session:
    with session.begin():              # starts transaction
        order = session.get(Order, order_id)
        order.status = 'Delivered'
        session.add(DeliveryLog(order_id=order_id, delivered_at=datetime.now()))
    # session.begin() context manager auto-commits on success, rolls back on error`}
      />

      <CodeBlock
        label="Transaction patterns in Node.js (pg library)"
        code={`const { Pool } = require('pg');
const pool = new Pool();

async function processPayment(userId, merchantId, amount) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Deduct from customer wallet
    const deductResult = await client.query(
      'UPDATE wallets SET balance = balance - $1 WHERE user_id = $2 RETURNING balance',
      [amount, userId]
    );

    if (deductResult.rows[0].balance < 0) {
      throw new Error('Insufficient balance');
    }

    // Credit merchant wallet
    await client.query(
      'UPDATE wallets SET balance = balance + $1 WHERE merchant_id = $2',
      [amount, merchantId]
    );

    // Log the payment
    await client.query(
      'INSERT INTO payment_log (user_id, merchant_id, amount) VALUES ($1, $2, $3)',
      [userId, merchantId, amount]
    );

    await client.query('COMMIT');
    return { success: true };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Venmo. A critical bug is reported: occasionally, a customer's UPI payment succeeds (money deducted from their account) but the merchant never receives the credit. This is a classic atomicity failure — two statements that must succeed together are not wrapped in a transaction.</P>

      <TimeBlock time="9:00 AM" label="Bug reported — customer deducted, merchant not credited">
        Investigation reveals the payment service runs two separate UPDATE statements — one for the customer deduction, one for the merchant credit — without a transaction. The database crashes between the two statements 1 in 50,000 times. Adapted for FreshCart: order placed (INSERT) but payment not logged (INSERT fails).
      </TimeBlock>

      <TimeBlock time="9:30 AM" label="Reproduce the bug scenario">
        The broken pattern: two independent autocommit statements. The fix: wrap both in a transaction.
      </TimeBlock>

      <CodeBlock
        label="The bug — two separate autocommit statements"
        code={`-- BROKEN: two independent statements — NOT atomic
-- Statement 1 commits immediately
UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1001;
-- ↑ committed — order is now 'Delivered'

-- <<< server crashes here >>>

-- Statement 2 never runs
INSERT INTO payment_log (order_id, amount, status)
VALUES (1001, 850.00, 'settled');
-- ↑ never executed — order is 'Delivered' but no payment record exists

-- Result: order appears delivered, payment settlement is missing
-- Financial reconciliation shows discrepancy`}
      />

      <CodeBlock
        label="The fix — wrap in explicit transaction"
        code={`-- FIXED: atomic transaction — both succeed or neither does
BEGIN;

UPDATE orders
  SET order_status = 'Delivered',
      delivery_date = CURRENT_DATE
WHERE order_id = 1001;

INSERT INTO payment_log (order_id, amount, status, settled_at)
VALUES (1001, 850.00, 'settled', NOW());

-- Only after both statements succeed:
COMMIT;

-- If server crashes after BEGIN but before COMMIT:
-- On restart, the database replays the WAL and rolls back
-- the partial transaction — order_status is NOT changed
-- Both statements are undone atomically

-- If the INSERT fails (e.g. duplicate payment_log entry):
-- ROLLBACK automatically issued — order_status is also undone
-- No partial state visible to any other transaction`}
      />

      <SQLPlayground
        initialQuery={`-- Verify what a clean transaction-protected order processing looks like
-- (read-only simulation — both validations in one atomic unit)
BEGIN;

-- Step 1: lock the order for processing (prevents concurrent processing)
SELECT order_id, order_status, total_amount, customer_id
FROM orders
WHERE order_id = 1
  AND order_status = 'Processing';
-- FOR UPDATE would lock this row in production

-- Step 2: verify customer loyalty for any applicable discount
SELECT customer_id, loyalty_tier, first_name
FROM customers
WHERE customer_id = (
  SELECT customer_id FROM orders WHERE order_id = 1
);

-- Step 3: check all items are in stock
SELECT
  p.product_name,
  p.in_stock,
  oi.quantity
FROM order_items AS oi
JOIN products    AS p ON oi.product_id = p.product_id
WHERE oi.order_id = 1;

-- In production: if all checks pass → UPDATE + INSERT → COMMIT
-- If any check fails → ROLLBACK

ROLLBACK;  -- end the read-only transaction`}
        height={285}
        showSchema={true}
      />

      <TimeBlock time="10:15 AM" label="Fix deployed — payment atomicity restored">
        The fix wraps the UPDATE and INSERT in a single BEGIN...COMMIT block. Both operations now succeed together or neither does. The financial reconciliation discrepancy drops from 1 in 50,000 to zero. Database durability ensures that even if the server crashes immediately after COMMIT, both changes survive the restart via WAL replay.
      </TimeBlock>

      <ProTip>
        Any time your application logic requires "do X then Y, and both must succeed," wrap both in an explicit database transaction. Do not rely on application-level compensation (trying to undo X if Y fails) — it is complex, error-prone, and creates race conditions. The database transaction is simpler, more reliable, and handles crashes that application-level compensation cannot.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What are ACID properties and why do they matter?">
        <p style={{ margin: '0 0 14px' }}>ACID is the set of four properties that define the reliability guarantees of database transactions. Atomicity means a transaction is all-or-nothing — every statement in it succeeds and is committed, or no statement takes effect. Partial completion is impossible. Consistency means a transaction can only bring the database from one valid state to another — all constraints, foreign keys, and schema rules are enforced, and any transaction that would violate them is rejected. Isolation means concurrent transactions do not interfere with each other — each transaction sees a consistent view of data and changes from one transaction are not visible to others until committed. Durability means once a transaction commits, its changes survive permanently — even a server crash immediately after COMMIT cannot lose committed data, because changes are written to a write-ahead log before being applied.</p>
        <p style={{ margin: '0 0 14px' }}>Why they matter: without Atomicity, a payment system could deduct money from a customer without crediting the merchant if it crashes mid-operation. Without Consistency, a database could contain orphaned records (orders referencing non-existent customers). Without Isolation, two concurrent transactions could both read a stock count of 1, both decrement it, and leave the count at -1. Without Durability, a confirmed order could disappear after a server crash.</p>
        <p style={{ margin: 0 }}>ACID properties are implemented through specific mechanisms: Atomicity via transaction rollback on error; Consistency via constraint checking at commit time; Isolation via locking and MVCC (Multi-Version Concurrency Control); Durability via write-ahead logging. These are not optional features — they are the foundational contract that makes relational databases trustworthy for financial, medical, and any critical application data.</p>
      </IQ>

      <IQ q="What is the difference between COMMIT and ROLLBACK?">
        <p style={{ margin: '0 0 14px' }}>COMMIT makes all changes made since the last BEGIN permanent. Once COMMIT executes, the changes are written to durable storage and become visible to all other sessions. The transaction ends and all locks acquired during it are released. COMMIT is irreversible — once committed, changes cannot be undone through a ROLLBACK (only through a new transaction that explicitly reverses the changes).</p>
        <p style={{ margin: '0 0 14px' }}>ROLLBACK undoes all changes made since the last BEGIN (or since the last SAVEPOINT if using ROLLBACK TO SAVEPOINT). The database reverts to the exact state it was in before the transaction started. All modified rows are restored to their pre-transaction values. All locks are released. A ROLLBACK can be issued explicitly (by the application when it detects an error or business rule violation) or automatically (by the database when it detects a constraint violation, deadlock, or crash recovery).</p>
        <p style={{ margin: 0 }}>The practical distinction matters when a transaction contains multiple statements: if statement 3 of 5 fails, ROLLBACK undoes statements 1 and 2 as well — the database never shows a state where only some of the transaction's changes applied. This is the guarantee applications rely on for correctness. In autocommit mode (the default in most SQL clients), each individual statement is its own implicit transaction that commits immediately — there is nothing to roll back if a later statement fails. This is why multi-statement operations that must be atomic must always be wrapped in an explicit BEGIN...COMMIT block.</p>
      </IQ>

      <IQ q="What are database isolation levels and when would you change from the default?">
        <p style={{ margin: '0 0 14px' }}>SQL defines four isolation levels representing a spectrum from lowest to highest isolation: READ UNCOMMITTED (allows dirty reads — reading uncommitted data from other transactions), READ COMMITTED (prevents dirty reads — only reads committed data; this is the PostgreSQL default), REPEATABLE READ (prevents dirty reads and non-repeatable reads — if a transaction reads a row twice, it gets the same value both times), and SERIALIZABLE (prevents all anomalies — equivalent to running transactions one at a time, no concurrency anomalies possible).</p>
        <p style={{ margin: '0 0 14px' }}>The default (READ COMMITTED) is appropriate for most OLTP workloads — web requests, API handlers, individual user operations. Each statement sees the latest committed data, preventing dirty reads while allowing good concurrency. Change to REPEATABLE READ when: a transaction reads the same data multiple times and must see consistent values throughout (a financial report that sums balances across multiple queries within the same transaction must use REPEATABLE READ or higher, or it could show inconsistent totals if accounts are updated between reads).</p>
        <p style={{ margin: 0 }}>Change to SERIALIZABLE when: two concurrent transactions could make mutually inconsistent decisions based on data they each read. The classic example is two doctors both reading that a room is empty and both assigning a patient to it — at READ COMMITTED both see empty and both assign, resulting in double booking. At SERIALIZABLE, one transaction wins and the other sees a conflict and is forced to retry. Use SERIALIZABLE for inventory allocation, appointment booking, any "read then write based on the read" pattern where the read-to-write decision must be exclusive. The cost is lower throughput — the database detects more conflicts and forces retries. In PostgreSQL, SERIALIZABLE is implemented via SSI (Serializable Snapshot Isolation) which reduces the conflict rate compared to traditional lock-based serializable isolation.</p>
      </IQ>

      <IQ q="What is a dirty read and which isolation level prevents it?">
        <p style={{ margin: '0 0 14px' }}>A dirty read occurs when Transaction A reads data that Transaction B has written but not yet committed. If Transaction B subsequently rolls back, Transaction A has read data that effectively never existed — a "dirty" (invalid) read. The term "dirty" refers to the uncommitted write being read before it is confirmed as permanent.</p>
        <p style={{ margin: '0 0 14px' }}>Example: a loyalty point balance adjustment transaction starts, credits a customer 500 points (balance goes from 1,000 to 1,500), but has not yet committed. Another transaction reads the customer's balance to check eligibility for a premium offer — it sees 1,500 points and approves the offer. The first transaction then rolls back (perhaps the order that earned the points was cancelled) — the balance reverts to 1,000 points. The customer was approved for a premium offer based on points they do not actually have.</p>
        <p style={{ margin: 0 }}>READ UNCOMMITTED allows dirty reads — it is the only isolation level that does. READ COMMITTED (and all higher levels) prevents dirty reads by ensuring a transaction only sees data from committed transactions. PostgreSQL does not support READ UNCOMMITTED — SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED is silently promoted to READ COMMITTED. In practice, dirty reads are almost never acceptable — READ COMMITTED is the minimum viable isolation level for any application where data correctness matters. READ UNCOMMITTED is sometimes used for approximate analytics (counting rows where a small error is acceptable) to avoid lock contention, but this use case is rare.</p>
      </IQ>

      <IQ q="What is a deadlock and how do you prevent it?">
        <p style={{ margin: '0 0 14px' }}>A deadlock occurs when two or more transactions each hold a lock that the other needs, creating a circular wait that can never resolve. Transaction A holds a lock on Row 1 and wants Row 2. Transaction B holds a lock on Row 2 and wants Row 1. Neither can proceed. The database detects this cycle and automatically rolls back one of the transactions (typically the one that has done less work or holds fewer locks), allowing the other to proceed. The rolled-back transaction receives an error and must be retried by the application.</p>
        <p style={{ margin: '0 0 14px' }}>Deadlocks are not errors in the database — they are a natural consequence of concurrent transactions accessing shared data. The database handles them correctly. The application must handle the deadlock error by retrying the rolled-back transaction. The real question is how to minimise their frequency.</p>
        <p style={{ margin: 0 }}>Prevention strategies: first, always acquire locks in a consistent order. If every transaction that needs to lock both Row 1 and Row 2 always locks Row 1 before Row 2, deadlocks between them are impossible (one will wait for the other to finish, not create a cycle). Second, keep transactions short — the longer a transaction holds locks, the higher the probability another transaction needs those same locks. Commit as soon as the work is done. Third, use SELECT FOR UPDATE SKIP LOCKED for queue-based processing — each worker picks a different row and never contends with other workers. Fourth, avoid user interaction within a transaction — never hold a database transaction open while waiting for a user to click a button (the transaction would hold locks for seconds or minutes, causing widespread contention). Fifth, use optimistic locking (version numbers or timestamps) instead of pessimistic locking (SELECT FOR UPDATE) when conflicts are rare — check the version number at UPDATE time and retry only if it changed.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: current transaction is aborted, commands ignored until end of transaction block"
        cause="A previous statement in the current transaction raised an error. PostgreSQL puts the transaction into an aborted state — all subsequent statements are ignored and return this error. The transaction cannot proceed in this state. This happens when, for example, a constraint violation or duplicate key error occurs mid-transaction and the application continues sending statements instead of issuing ROLLBACK."
        fix="Issue ROLLBACK immediately after detecting any error in a transaction: ROLLBACK; This ends the aborted transaction and returns the connection to a clean state. Then either retry the entire transaction from BEGIN or handle the error at the application level. In application code, always catch exceptions in the transaction block and execute ROLLBACK before re-raising or returning. Never re-use a database connection that has an aborted transaction — all queries on that connection will fail until ROLLBACK is issued."
      />

      <Err
        msg="ERROR: deadlock detected — process waited for lock, then was selected as deadlock victim"
        cause="Two concurrent transactions each hold a lock needed by the other, creating a circular wait. PostgreSQL's deadlock detector runs periodically, identifies the cycle, and rolls back one transaction (the 'victim') to break the deadlock. The victim transaction receives this error. The other transaction is allowed to proceed and complete."
        fix="The application must handle deadlock errors by retrying the entire transaction. Implement exponential backoff — wait a short random time before retrying to avoid immediately deadlocking again. To reduce deadlock frequency: ensure all transactions that access the same set of rows acquire locks in the same order (lock customer before merchant, not merchant before customer). Keep transactions as short as possible. Use SELECT FOR UPDATE only when genuinely needed. Consider whether SERIALIZABLE isolation (which handles some of these conflicts differently via SSI) would be more appropriate for the workload."
      />

      <Err
        msg="Data inconsistency — order marked 'Delivered' but no payment record exists"
        cause="Two statements that must succeed together are running in autocommit mode — each commits independently. The UPDATE committed, then the server crashed or the application errored before the INSERT could run. The result is a partial state that violates application-level invariants."
        fix="Wrap all statements that must succeed together in an explicit transaction: BEGIN; UPDATE ...; INSERT ...; COMMIT; With a transaction, if the INSERT fails for any reason, the UPDATE is automatically rolled back. The database will never show a state where one committed and the other did not. Audit existing code for any multi-statement operations that lack explicit BEGIN/COMMIT and add them. Add a CHECK or trigger that enforces the business invariant at the database level if possible — a delivered order must have a payment record."
      />

      <Err
        msg="ERROR: could not serialize access due to concurrent update — serialization failure"
        cause="Using SERIALIZABLE isolation level. Two concurrent transactions read and wrote overlapping data in a way that is not equivalent to any serial ordering. PostgreSQL's SSI (Serializable Snapshot Isolation) detected a serialization anomaly and rolled back one transaction to preserve serializability. This is not a bug — it is the correct behaviour of SERIALIZABLE isolation."
        fix="The application must retry serialization failures. Implement a retry loop: catch the serialization error (error code 40001 in PostgreSQL), wait a brief random interval, and retry the entire transaction from BEGIN. Most serialization failures are transient — the retry will typically succeed because the conflicting transaction has already committed and the window of conflict is gone. If serialization failures are frequent, reconsider whether SERIALIZABLE is necessary — REPEATABLE READ or READ COMMITTED may be sufficient for the workload with appropriate application-level conflict detection."
      />

      <Err
        msg="Transaction holds locks for minutes — other queries queue up and time out"
        cause="A long-running transaction is holding row or table locks while performing slow work (large aggregations, waiting for external API responses, or — worst — waiting for user input). Any other transaction that needs those same rows must wait for the lock to be released. As the wait grows, query timeouts begin cascading across the application."
        fix="Keep transactions as short as possible. Do all computation, validation, and external calls OUTSIDE the transaction. Only open BEGIN when you are ready to immediately execute the DML statements. Never make network calls (API requests, file reads) inside a transaction. Never wait for user interaction inside a transaction. Set statement_timeout (per-session timeout) and lock_timeout (maximum wait for a lock) in PostgreSQL: SET lock_timeout = '5s' — queries that cannot acquire a lock within 5 seconds fail instead of waiting indefinitely, preventing cascading timeouts."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a complete transaction scenario for FreshCart's order fulfilment process. The scenario: a customer (customer_id = 1) places an order for 2 units of product_id = 1. Write the SQL transaction that: (1) verifies the customer exists and is active (loyalty_tier != null), (2) checks product_id = 1 is in stock, (3) inserts a new order into the orders table with store_id = 'ST001', total_amount = quantity × unit_price, order_status = 'Processing', (4) inserts the order line into order_items. Wrap all validation and DML in a BEGIN...ROLLBACK block (use ROLLBACK at the end since this is a playground — in production it would be COMMIT). Also show what a SAVEPOINT would look like between the order INSERT and the order_items INSERT, and write the SELECT queries that verify each step."
        hint="BEGIN; SELECT to validate; INSERT into orders; SAVEPOINT sp_order; INSERT into order_items; ROLLBACK TO if items fail; ROLLBACK at end. Use subquery for product unit_price in the total_amount calculation."
        answer={`-- FreshCart order fulfilment transaction
BEGIN;

-- Step 1: Validate customer exists and is active
-- In production: if this returns 0 rows → ROLLBACK
SELECT customer_id, first_name, loyalty_tier
FROM customers
WHERE customer_id = 1
  AND loyalty_tier IS NOT NULL;

-- Step 2: Validate product is in stock and get unit price
SELECT product_id, product_name, unit_price, in_stock
FROM products
WHERE product_id = 1
  AND in_stock = true;

-- Step 3: Insert the order
-- total_amount = quantity (2) × unit_price from products
INSERT INTO orders (
  customer_id,
  store_id,
  order_date,
  order_status,
  total_amount,
  payment_method
)
SELECT
  1,                          -- customer_id
  'ST001',                    -- store_id
  CURRENT_DATE,               -- order_date
  'Processing',               -- order_status
  2 * unit_price,             -- total_amount: qty × price
  'UPI'                       -- payment_method
FROM products
WHERE product_id = 1;

-- Step 4: Mark a savepoint after order is inserted
-- If order_items insertion fails, we can roll back to here
-- and retry items without losing the order header
SAVEPOINT sp_after_order;

-- Step 5: Insert the order line
-- In production: use currval('orders_order_id_seq') for the new order_id
-- Here we use the max order_id as a stand-in
INSERT INTO order_items (
  order_id,
  product_id,
  quantity,
  unit_price,
  line_total
)
SELECT
  MAX(o.order_id),          -- the newly inserted order
  1,                        -- product_id
  2,                        -- quantity
  p.unit_price,             -- unit_price at time of order
  2 * p.unit_price          -- line_total
FROM orders AS o
CROSS JOIN products AS p
WHERE p.product_id = 1;

-- Step 6: Verify both rows were inserted correctly
SELECT
  o.order_id,
  o.customer_id,
  o.order_status,
  o.total_amount,
  oi.product_id,
  oi.quantity,
  oi.line_total
FROM orders      AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_id = (SELECT MAX(order_id) FROM orders);

-- Step 7: Release the savepoint — no longer need the rollback point
RELEASE SAVEPOINT sp_after_order;

-- In production: COMMIT here to make permanent
-- For playground safety: ROLLBACK to leave data unchanged
ROLLBACK;

-- Verify: the rollback means no data was permanently changed
SELECT COUNT(*) AS order_count_unchanged
FROM orders
WHERE customer_id = 1
  AND order_status = 'Processing'
  AND order_date = CURRENT_DATE;`}
        explanation="The transaction demonstrates all key concepts: BEGIN starts the atomic unit. Two validation SELECTs run first — in production, application code would check the row counts and issue ROLLBACK if either returns 0 rows (customer not found / product out of stock). The INSERT into orders uses a subquery against products to pull the current unit_price — this ensures the price is fetched within the same transaction, preventing a race condition where the price changes between a separate SELECT and the INSERT. SAVEPOINT sp_after_order is set after the order header is inserted — if the order_items INSERT fails (e.g. FK violation, constraint error), ROLLBACK TO SAVEPOINT sp_after_order undoes only the items insert while preserving the order, allowing the application to retry with corrected item data without restarting the whole transaction. The verification SELECT confirms both rows exist before committing. ROLLBACK at the end is playground-safe — in production this would be COMMIT. The ROLLBACK means none of the INSERTs actually persist, which is why the final verification SELECT shows no new processing orders."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A transaction is a group of statements treated as one indivisible unit — all succeed (COMMIT) or all are undone (ROLLBACK). No partial state is ever visible to other sessions.',
          'ACID: Atomicity (all or nothing), Consistency (only valid states), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes via write-ahead logging).',
          'BEGIN starts a transaction. COMMIT makes it permanent. ROLLBACK undoes everything since BEGIN. In autocommit mode, each statement is its own implicit transaction — no rollback is possible if a later statement fails.',
          'SAVEPOINT marks a point within a transaction for partial rollback. ROLLBACK TO SAVEPOINT undoes only work since the savepoint, not the entire transaction. RELEASE SAVEPOINT discards it.',
          'Four isolation levels: READ UNCOMMITTED (allows dirty reads — PostgreSQL promotes to READ COMMITTED), READ COMMITTED (default — prevents dirty reads), REPEATABLE READ (prevents dirty and non-repeatable reads), SERIALIZABLE (prevents all anomalies).',
          'Dirty read: reading uncommitted data. Non-repeatable read: same row returns different value on second read. Phantom read: same WHERE returns different row count on second execution.',
          'SELECT FOR UPDATE acquires an exclusive lock for the transaction. SKIP LOCKED skips already-locked rows — ideal for queue processing. NOWAIT fails immediately if lock cannot be acquired.',
          'Deadlock: two transactions wait for each other\'s locks. Database detects and rolls back one. Prevention: always acquire locks in the same order across all transactions. Application must retry on deadlock error.',
          'Never hold a transaction open during network calls, user interaction, or slow computation. Locks held by long transactions block all concurrent access to those rows.',
          'Always use explicit BEGIN...COMMIT for multi-statement DML. Never rely on autocommit for operations that must be atomic. The overhead of explicit transactions is negligible — the correctness guarantee is invaluable.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 48</strong>, you learn Stored Procedures — reusable named programs stored in the database, with parameters, control flow, exception handling, and when to use them versus application-layer logic.
        </p>
        <Link href="/learn/sql/stored-procedures" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 48 → Stored Procedures
        </Link>
      </div>

    </LearnLayout>
  );
}