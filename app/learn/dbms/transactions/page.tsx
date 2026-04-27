import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Transactions & ACID Properties — Complete Guide | DBMS | Chaduvuko',
  description:
    'What transactions are, why they exist, ACID properties explained from first principles with real failure scenarios, transaction states, savepoints, isolation levels preview, and every interview trap with complete answers.',
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
    fontSize: 'clamp(20px, 2.5vw, 28px)',
    fontWeight: 900, letterSpacing: '-1px',
    color: 'var(--text)', marginBottom: 18,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)',
    fontWeight: 700, letterSpacing: '-0.3px',
    color: 'var(--text)', marginBottom: 12,
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
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

export default function Transactions() {
  return (
    <LearnLayout
      title="Transactions & ACID Properties"
      description="The mechanism that keeps your bank balance correct when the server crashes mid-transfer — what transactions are, why they exist, and how ACID properties guarantee correctness even when everything goes wrong."
      section="DBMS"
      readTime="80–95 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY TRANSACTIONS EXIST
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>Why Transactions Exist — The Bank Transfer That Started It All</SectionTitle>

        <Para>
          Consider the most classic scenario in all of database theory.
          You open Square and transfer ₹500 to a friend.
          From the database's perspective, this involves two separate operations:
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
          <div><span style={{ color: 'var(--accent)' }}>Operation 1:</span> <span style={{ color: 'var(--text)' }}>UPDATE accounts SET balance = balance - 500 WHERE account_id = 'YOUR_ACCOUNT'</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Operation 2:</span> <span style={{ color: 'var(--text)' }}>UPDATE accounts SET balance = balance + 500 WHERE account_id = 'FRIEND_ACCOUNT'</span></div>
        </div>

        <Para>
          Now imagine the database server crashes — power failure, OS panic, hardware fault —
          after Operation 1 completes but before Operation 2 executes.
          Your ₹500 has been deducted. Your friend received nothing.
          The money has vanished from the financial system.
          This is not a theoretical edge case — it is a real failure mode that happens
          in every system that operates long enough. Without a mechanism to handle it,
          every financial system, every e-commerce platform, every hospital record
          system is fundamentally unreliable.
        </Para>

        <Para>
          The solution is a <strong style={{ color: 'var(--accent)' }}>transaction</strong> —
          a mechanism that groups multiple operations into a single, indivisible unit of work.
          Either ALL operations in the transaction complete successfully and are permanently saved,
          or NONE of them take effect. Partial completion is not a possible outcome.
          The two updates either both happen or neither happens. The money either transfers
          completely or stays exactly where it was.
        </Para>

        <Para>
          Transactions are not limited to financial systems. Every situation where multiple
          database operations must succeed or fail together requires a transaction.
          Placing an order and decrementing inventory. Creating a user account and
          sending a welcome email record. Marking a payment as complete and updating
          the order status. Removing a file record and deleting its metadata.
          Any multi-step operation with a business-level meaning requires transactional protection.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A <strong style={{ color: 'var(--text)' }}>transaction</strong> is a logical unit of
            work consisting of one or more database operations (reads and/or writes) that must
            be executed as a single, atomic, indivisible unit. A transaction takes the database
            from one consistent state to another consistent state.
            It either commits — making all its changes permanent —
            or aborts — undoing all its changes as if it never ran.
          </Para>
        </div>

        <SubTitle>What Happens Without Transactions — Concrete Failure Scenarios</SubTitle>

        <Para>
          Before examining how transactions work, it is worth precisely cataloguing what
          goes wrong without them. These are not hypothetical — they are the documented
          failure modes that motivated transaction theory in the 1970s.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              scenario: 'System Failure Mid-Operation',
              color: '#ff4757',
              what: 'A server crash, power failure, or OS panic occurs while a multi-step operation is partially complete.',
              without: 'The database is left in a partially updated state. Some rows reflect the new values, others still have the old values. The inconsistency is permanent unless manually detected and repaired.',
              with: 'The transaction is automatically rolled back on restart. The database returns to its state before the transaction began. No inconsistency is possible — the database is either in the old state or the new state, never in between.',
            },
            {
              scenario: 'Application Error Mid-Operation',
              color: '#f97316',
              what: 'An application-level error (null pointer exception, validation failure, network timeout) occurs after some database writes have been executed but before the full operation completes.',
              without: 'The writes that completed before the error are permanently in the database. The operation is half-done. Compensating logic must be written to detect and clean up partial states.',
              with: 'The application catches the error and calls ROLLBACK. All writes since the transaction began are undone. The database is back to its clean state. No cleanup logic needed.',
            },
            {
              scenario: 'Concurrent User Conflicts',
              color: '#facc15',
              what: 'Two users simultaneously modify the same data in conflicting ways — both read the same inventory count, both decide they can complete a purchase, both write a decremented count.',
              without: 'Both updates succeed. One item is sold twice. Inventory count is off. The business loses money or ships products it doesn\'t have.',
              with: 'Transaction isolation controls how concurrent transactions interact. One transaction sees the other\'s changes or is blocked until the other completes. The inventory update is serialised correctly.',
            },
          ].map((item) => (
            <div key={item.scenario} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{item.scenario}</div>
                <Para><strong style={{ color: 'var(--text)' }}>What happens:</strong> {item.what}</Para>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✕ Without transaction</div>
                    <Para>{item.without}</Para>
                  </div>
                  <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✓ With transaction</div>
                    <Para>{item.with}</Para>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 2 — TRANSACTION BASICS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The Basics" />
        <SectionTitle>Transaction Syntax — BEGIN, COMMIT, ROLLBACK, SAVEPOINT</SectionTitle>

        <Para>
          Every transaction in SQL follows the same lifecycle: it begins, executes operations,
          and either commits (making changes permanent) or rolls back (undoing all changes).
          The exact syntax varies slightly between databases, but the semantics are identical.
        </Para>

        <CodeBox label="Complete transaction syntax — every command explained">
{`-- BEGIN (also: START TRANSACTION) — marks the start of a transaction
BEGIN;
-- In PostgreSQL, every statement is implicitly in a transaction even without BEGIN.
-- BEGIN explicitly starts a multi-statement transaction.
-- In MySQL: START TRANSACTION; or BEGIN; (both work)

-- Execute operations within the transaction
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'ACC001';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'ACC002';

-- COMMIT — make all changes permanent
COMMIT;
-- After COMMIT: changes are durable, visible to all other transactions,
-- and cannot be undone by ROLLBACK.

-- ─────────────────────────────────────────────

-- ROLLBACK — undo ALL changes since BEGIN
BEGIN;
UPDATE inventory SET stock = stock - 1 WHERE product_id = 'P001';
-- Something went wrong (stock went negative, payment failed, etc.)
ROLLBACK;
-- After ROLLBACK: inventory.stock is exactly what it was before BEGIN.
-- It is as if the UPDATE never executed.

-- ─────────────────────────────────────────────

-- SAVEPOINT — create a named rollback point within a transaction
BEGIN;

INSERT INTO orders (customer_id, restaurant_id, total_amount)
VALUES (1, 2, 280.00);
-- order_id = 5001 auto-assigned

SAVEPOINT after_order_created;
-- Checkpoint: order exists, we can roll back to here if needed

INSERT INTO order_items (order_id, item_id, quantity, unit_price)
VALUES (5001, 15, 2, 140.00);
-- Suppose item_id = 15 doesn't exist → FK violation

ROLLBACK TO SAVEPOINT after_order_created;
-- Only the order_items INSERT is rolled back.
-- The orders INSERT is PRESERVED — order 5001 still exists.
-- We can now try a different item or surface the error.

INSERT INTO order_items (order_id, item_id, quantity, unit_price)
VALUES (5001, 12, 2, 140.00);  -- try a valid item

COMMIT;  -- both the order and the corrected item are committed

-- RELEASE SAVEPOINT — explicitly remove a savepoint (frees resources)
RELEASE SAVEPOINT after_order_created;
-- After RELEASE: cannot ROLLBACK TO this savepoint anymore.
-- The transaction continues normally.`}
        </CodeBox>

        <SubTitle>Autocommit — The Default Behaviour That Surprises Beginners</SubTitle>

        <Para>
          Most databases operate in <strong style={{ color: 'var(--accent)' }}>autocommit mode</strong>
          by default. In autocommit mode, every individual SQL statement is automatically
          wrapped in its own transaction — it begins, executes, and commits immediately.
          You do not need to write BEGIN/COMMIT for single statements.
          This is convenient for simple operations but means that if you run three
          UPDATE statements without BEGIN/COMMIT, each UPDATE commits independently —
          a failure between the second and third UPDATE leaves the database in a
          partially updated state with no way to undo the first two.
        </Para>

        <CodeBox label="Autocommit behaviour — the silent transaction wrapper">
{`-- In autocommit mode (default in MySQL, PostgreSQL psql):

-- This UPDATE is automatically wrapped in a transaction and committed:
UPDATE customers SET city = 'San Francisco' WHERE customer_id = 1;
-- Equivalent to: BEGIN; UPDATE...; COMMIT;
-- Cannot be rolled back after execution.

-- This sequence is DANGEROUS without explicit BEGIN:
UPDATE orders SET status = 'processing' WHERE order_id = 5001;  -- auto-committed
UPDATE inventory SET stock = stock - 1 WHERE product_id = 'P001';  -- auto-committed
-- Server crashes here
UPDATE payments SET status = 'captured' WHERE order_id = 5001;  -- NEVER EXECUTES

-- Result: order is 'processing', inventory is decremented, payment is never captured.
-- The database is in an inconsistent state with no automatic recovery.

-- CORRECT: explicit transaction groups all three as one unit
BEGIN;
UPDATE orders     SET status = 'processing'      WHERE order_id = 5001;
UPDATE inventory  SET stock = stock - 1          WHERE product_id = 'P001';
UPDATE payments   SET status = 'captured'        WHERE order_id = 5001;
COMMIT;
-- Either all three happen or none of them happen.

-- DISABLING autocommit (MySQL):
SET autocommit = 0;
-- Now every statement requires explicit COMMIT to make it permanent.

-- PostgreSQL psql: autocommit is ON by default.
-- In psql: \set AUTOCOMMIT off  -- disables autocommit for session`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — TRANSACTION STATES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The State Machine" />
        <SectionTitle>Transaction States — The Complete Lifecycle</SectionTitle>

        <Para>
          A transaction moves through a defined set of states from the moment it begins
          to the moment it terminates. Understanding these states is important for
          understanding what can and cannot be undone at each point — and it appears
          in nearly every DBMS exam.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.4, overflowX: 'auto' }}>
          <div style={{ color: '#0078d4', fontWeight: 700 }}>Active</div>
          <div style={{ paddingLeft: 20, color: 'var(--muted)' }}>│  (executing operations: reads and writes)</div>
          <div style={{ paddingLeft: 20 }}><span style={{ color: 'var(--muted)' }}>├──success──▶</span> <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Partially Committed</span></div>
          <div style={{ paddingLeft: 60, color: 'var(--muted)' }}>│  (last operation executed, waiting for commit confirmation)</div>
          <div style={{ paddingLeft: 60 }}><span style={{ color: 'var(--muted)' }}>├──commit confirmed──▶</span> <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Committed ✓</span></div>
          <div style={{ paddingLeft: 60 }}><span style={{ color: 'var(--muted)' }}>└──write/commit fails──▶</span> <span style={{ color: '#ff4757', fontWeight: 700 }}>Failed</span></div>
          <div style={{ paddingLeft: 20 }}><span style={{ color: 'var(--muted)' }}>└──error occurs──▶</span> <span style={{ color: '#ff4757', fontWeight: 700 }}>Failed</span></div>
          <div style={{ paddingLeft: 40, color: 'var(--muted)' }}>│  (cannot continue — must abort)</div>
          <div style={{ paddingLeft: 40 }}><span style={{ color: 'var(--muted)' }}>└──rollback──▶</span> <span style={{ color: '#ff4757', fontWeight: 700 }}>Aborted / Terminated ✕</span></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            {
              state: 'Active',
              color: '#0078d4',
              desc: 'The initial state. The transaction is currently executing. It reads data, writes data, evaluates conditions. All writes are tentative — held in temporary storage (write buffers), not yet written to permanent disk storage.',
              key: 'Changes made in Active state are NOT visible to other transactions (depending on isolation level) and can be fully undone by ROLLBACK.',
            },
            {
              state: 'Partially Committed',
              color: '#facc15',
              desc: 'The transaction has executed its final operation and is attempting to commit. The DBMS is in the process of writing the transaction\'s changes permanently to disk (flushing write-ahead log, updating data pages). This state exists between "last statement executed" and "commit confirmed on disk".',
              key: 'If a failure occurs in this state (disk failure during commit write), the transaction is rolled back. The partially written commit is detected via the write-ahead log on restart and reversed.',
            },
            {
              state: 'Committed',
              color: 'var(--accent)',
              desc: 'The transaction has successfully completed. All changes are durably written to disk. The COMMIT has been acknowledged to the client. The changes are now permanent and visible to other transactions.',
              key: 'A committed transaction CANNOT be rolled back by the application. It can only be reversed by a new compensating transaction. This is the Durability guarantee.',
            },
            {
              state: 'Failed',
              color: '#ff4757',
              desc: 'The transaction encountered an error — a constraint violation, a deadlock, a system failure, or an explicit application ROLLBACK call — and cannot proceed. The transaction must be aborted. No further operations can be executed.',
              key: 'A failed transaction must always transition to Aborted. It cannot be resumed or retried from where it failed — it must start completely fresh.',
            },
            {
              state: 'Aborted (Terminated)',
              color: '#ff4757',
              desc: 'The transaction has been rolled back. All changes made during the transaction have been undone. The database is in exactly the state it was in before the transaction began. The transaction is finished.',
              key: 'After abort, the application can either retry the entire transaction from scratch (if the failure was transient — like a deadlock) or report an error to the user (if the failure was fundamental — like a constraint violation).',
            },
          ].map((item) => (
            <div key={item.state} style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: `${item.color}12`, borderRight: '1px solid var(--border)', padding: '16px 14px', minWidth: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: item.color, textAlign: 'center', lineHeight: 1.4 }}>{item.state}</span>
              </div>
              <div style={{ padding: '16px 20px', flex: 1 }}>
                <Para>{item.desc}</Para>
                <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '6px 12px' }}>
                  → {item.key}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 4 — ACID
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — ACID" />
        <SectionTitle>ACID Properties — The Four Guarantees That Define a Reliable Database</SectionTitle>

        <Para>
          ACID is an acronym coined by Andreas Reuter and Theo Härder in their 1983 paper
          "Principles of Transaction-Oriented Database Recovery." It describes the four
          properties that every reliable transaction processing system must guarantee.
          These four properties are not independent features — they work together as a
          complete system for ensuring database correctness. Remove any one and the
          system becomes unreliable in a specific, predictable way.
        </Para>

        <Para>
          Every interview question about ACID is ultimately asking: "Do you understand
          what can go wrong in a multi-user, failure-prone system, and do you understand
          the precise mechanism that prevents each class of problem?"
          That is the level at which we will examine each property.
        </Para>

        {/* ── A — ATOMICITY ── */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: 4, background: '#0078d4' }} />
          <div style={{ padding: '28px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: '#0078d4', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>A</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>Atomicity</div>
                <div style={{ fontSize: 13, color: '#0078d4', fontFamily: 'var(--font-mono)', marginTop: 2 }}>"All or Nothing"</div>
              </div>
            </div>

            <Para>
              Atomicity means that a transaction is treated as a single, indivisible unit of work.
              Either ALL operations within the transaction complete successfully and their effects
              are permanently recorded, or NONE of the operations take effect — the database
              returns to exactly the state it was in before the transaction began.
              There is no middle ground. Partial completion is not a possible outcome.
            </Para>

            <SubTitle>The Problem Atomicity Solves</SubTitle>

            <Para>
              Without atomicity, a multi-step operation can be interrupted at any point —
              by a system crash, a hardware failure, an application error, or an explicit
              rollback. Each step that completed before the interruption is permanently
              in the database while steps after the interruption never happened.
              The database is left in a state that corresponds to no valid real-world
              scenario — it is simply wrong.
            </Para>

            <CodeBox label="Atomicity — the bank transfer with every failure scenario">
{`-- SCENARIO: Transfer ₹500 from Account A (balance: ₹5000) to Account B (balance: ₹2000)
-- WITHOUT atomicity guarantee — three possible failure points:

-- Step 1 executes:
UPDATE accounts SET balance = 4500 WHERE account_id = 'A';
-- ← CRASH HERE: A has ₹4500, B has ₹2000. ₹500 has vanished from the system.
-- ← APP ERROR HERE: same result. ₹500 is gone.

-- Step 2 executes:
UPDATE accounts SET balance = 2500 WHERE account_id = 'B';
-- ← CRASH HERE: A has ₹4500, B has ₹2500. Transfer succeeded — but crash means
--   the commit may not have been written to disk. On restart: depends on log.

-- WITH atomicity (transaction):
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B';
COMMIT;

-- Failure scenarios WITH atomicity:
-- CRASH after Step 1, before Step 2:
--   On restart: recovery system reads WAL log, sees incomplete transaction → ROLLBACK
--   A = ₹5000, B = ₹2000. Exactly as before. ₹500 never left A.

-- CRASH after Step 2, before COMMIT:
--   On restart: recovery sees transaction not committed → ROLLBACK both steps
--   A = ₹5000, B = ₹2000. Both updates are undone.

-- CRASH after COMMIT is written to log, before data pages updated:
--   On restart: recovery sees committed transaction → REDO both steps
--   A = ₹4500, B = ₹2500. Transfer completes correctly.

-- RESULT: The only possible outcomes are:
-- (A=₹4500, B=₹2500) — transfer completed, OR
-- (A=₹5000, B=₹2000) — transfer never happened
-- NEVER: (A=₹4500, B=₹2000) — money vanished`}
            </CodeBox>

            <SubTitle>How Atomicity Is Implemented — Write-Ahead Logging</SubTitle>

            <Para>
              Atomicity is implemented through the <strong style={{ color: 'var(--accent)' }}>Write-Ahead Log (WAL)</strong>
              — a persistent, sequential log file where every change is recorded
              <em> before</em> it is applied to the actual data pages. The WAL entry includes
              the old value (for undo) and the new value (for redo) of every modified row.
              On recovery after a crash, the DBMS reads the WAL, identifies which transactions
              were committed and which were not, redoes committed transactions whose data
              pages may not have been flushed, and rolls back transactions that were not
              committed. WAL is covered in full depth in Module 16 (Crash Recovery).
            </Para>

            <Callout type="info">
              <strong>Atomicity is about database operations only.</strong> If your application
              sends an SMS notification after committing a transaction, and the server crashes
              after the commit but before the SMS is sent, the database is correct but the
              SMS was never sent. Atomicity does not extend to external systems outside the
              database. Handling this requires distributed transaction patterns (two-phase commit,
              saga pattern, outbox pattern) — which are architectural concerns beyond the DBMS.
            </Callout>
          </div>
        </div>

        {/* ── C — CONSISTENCY ── */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: 4, background: 'var(--accent)' }} />
          <div style={{ padding: '28px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: 'var(--accent)', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>C</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>Consistency</div>
                <div style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>"Valid State to Valid State"</div>
              </div>
            </div>

            <Para>
              Consistency means that a transaction must bring the database from one valid state
              to another valid state. Every integrity constraint, business rule, and data invariant
              that was true before the transaction must also be true after the transaction commits.
              A transaction that would violate any constraint is rejected — it cannot commit.
            </Para>

            <Para>
              Consistency is both a DBMS responsibility and an application responsibility.
              The DBMS enforces the constraints it knows about — primary keys, foreign keys,
              NOT NULL, CHECK constraints, UNIQUE constraints. The application must ensure
              that the operations it performs are semantically meaningful — the DBMS cannot
              know, for example, that an account balance should never go negative unless
              the developer explicitly creates that constraint.
            </Para>

            <SubTitle>DBMS-Enforced Consistency — What the Database Checks Automatically</SubTitle>

            <CodeBox label="DBMS-enforced consistency constraints">
{`-- DOMAIN CONSTRAINT: value must be within the defined domain
ALTER TABLE accounts ADD CONSTRAINT chk_balance_positive
    CHECK (balance >= 0);
-- Consequence: any transaction that would set balance < 0 is REJECTED
BEGIN;
    UPDATE accounts SET balance = balance - 10000
    WHERE account_id = 'A' AND balance = 500;
    -- This sets balance = -9500 → violates CHECK constraint
COMMIT;
-- ERROR: new row for relation "accounts" violates check constraint "chk_balance_positive"
-- Transaction is automatically aborted. Balance remains ₹500.

-- REFERENTIAL INTEGRITY: foreign key must reference existing row
BEGIN;
    INSERT INTO order_items (order_id, item_id, quantity, unit_price)
    VALUES (9999, 12, 2, 140.00);
    -- order_id = 9999 does not exist in orders table
COMMIT;
-- ERROR: insert or update on table "order_items" violates foreign key constraint
-- Transaction aborted. No row inserted.

-- UNIQUENESS CONSTRAINT: duplicate primary key rejected
BEGIN;
    INSERT INTO customers (customer_id, email)
    VALUES (1, 'new@email.com');
    -- customer_id = 1 already exists
COMMIT;
-- ERROR: duplicate key value violates unique constraint "customers_pkey"
-- Transaction aborted.

-- NOT NULL CONSTRAINT:
BEGIN;
    INSERT INTO orders (customer_id, restaurant_id, total_amount)
    VALUES (NULL, 2, 280.00);
    -- customer_id cannot be NULL
COMMIT;
-- ERROR: null value in column "customer_id" violates not-null constraint`}
            </CodeBox>

            <SubTitle>Application-Enforced Consistency — What the Developer Must Ensure</SubTitle>

            <Para>
              Some consistency rules are too complex or context-dependent for the database
              to enforce automatically. The application must validate these before committing.
            </Para>

            <CodeBox label="Application-level consistency checks">
{`-- BUSINESS RULE: A customer cannot place an order if they have unpaid invoices
BEGIN;
    -- Application checks business rule BEFORE inserting the order:
    SELECT COUNT(*) FROM invoices
    WHERE customer_id = :customer_id AND status = 'overdue';
    -- If count > 0: ROLLBACK and return error to user
    -- If count = 0: proceed with order creation

    INSERT INTO orders (customer_id, restaurant_id, total_amount)
    VALUES (:customer_id, :restaurant_id, :total_amount);
COMMIT;

-- BUSINESS RULE: Total amount must equal sum of order items
-- (The DB could enforce this with a trigger, but often done in application)
BEGIN;
    INSERT INTO orders (order_id, customer_id, total_amount) VALUES (5001, 1, 420.00);
    INSERT INTO order_items VALUES (5001, 12, 2, 140.00);  -- ₹280
    INSERT INTO order_items VALUES (5001, 8,  1, 140.00);  -- ₹140
    -- Sum = ₹420 = total_amount → consistent ✓
COMMIT;

-- BUSINESS RULE: Stock cannot go negative (even without DB constraint)
BEGIN;
    SELECT stock FROM inventory WHERE product_id = :pid FOR UPDATE;
    -- FOR UPDATE: lock this row so no other transaction can modify it simultaneously
    -- If stock >= requested_quantity: proceed
    -- If stock < requested_quantity: ROLLBACK and return "out of stock" error
    UPDATE inventory SET stock = stock - :qty WHERE product_id = :pid;
COMMIT;`}
            </CodeBox>

            <Callout type="warning">
              <strong>Consistency is the most misunderstood ACID property.</strong>
              It is sometimes confused with Isolation (which deals with concurrent transaction
              visibility). Consistency deals with data validity — rules that must hold at
              the beginning and end of every transaction. A database can be consistent
              but not isolated (two transactions see each other's incomplete changes).
              A database can be isolated but not consistent (constraints are not enforced).
              They address completely different concerns.
            </Callout>
          </div>
        </div>

        {/* ── I — ISOLATION ── */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: 4, background: '#f97316' }} />
          <div style={{ padding: '28px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: '#f97316', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>I</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>Isolation</div>
                <div style={{ fontSize: 13, color: '#f97316', fontFamily: 'var(--font-mono)', marginTop: 2 }}>"Concurrent Transactions Don't See Each Other's Work-in-Progress"</div>
              </div>
            </div>

            <Para>
              Isolation means that when multiple transactions execute concurrently,
              the intermediate state of one transaction is not visible to other transactions.
              Each transaction appears to execute in isolation — as if it were the only
              transaction running in the system. The final result of concurrent execution
              must be equivalent to some serial execution (running the transactions one after another).
            </Para>

            <Para>
              Isolation is the most complex ACID property because it involves a fundamental
              trade-off: <strong style={{ color: 'var(--accent)' }}>stronger isolation = stronger correctness guarantees
              but lower concurrency and throughput</strong>. Weaker isolation allows more
              concurrent execution but introduces specific classes of anomalies.
              SQL defines four isolation levels — each preventing a different set of anomalies —
              allowing applications to choose their operating point on this trade-off.
            </Para>

            <SubTitle>Why Isolation Is Necessary — The Seat Booking Problem</SubTitle>

            <Para>
              Consider an airline seat booking system. Seat 14A on flight AI-101 has
              one remaining seat. Two passengers attempt to book it simultaneously.
            </Para>

            <CodeBox label="The concurrent booking problem — what happens without proper isolation">
{`-- TRANSACTION T1 (Passenger Rahul — booking agent 1):
-- T2 starts at almost exactly the same time

-- T1: Check if seat 14A is available
SELECT count FROM seats WHERE flight = 'AI-101' AND seat = '14A';
-- Result: count = 1 (available)

-- T2: Check if seat 14A is available (executing at same moment)
SELECT count FROM seats WHERE flight = 'AI-101' AND seat = '14A';
-- Result: count = 1 (available) ← T1's reservation hasn't committed yet!

-- T1: Reserve the seat (decrement count)
UPDATE seats SET count = 0, passenger = 'Rahul' WHERE flight = 'AI-101' AND seat = '14A';
COMMIT;  -- Rahul has the seat. count = 0.

-- T2: Reserve the seat (also decrements — READING STALE DATA)
UPDATE seats SET count = 0, passenger = 'Priya' WHERE flight = 'AI-101' AND seat = '14A';
COMMIT;  -- Priya also "has" the seat. count = 0. Passenger = 'Priya' (overwrites Rahul).

-- RESULT: Both passengers have confirmation emails. Same physical seat. Conflict at boarding.
-- The airline is legally liable.

-- WITH PROPER ISOLATION (SELECT FOR UPDATE — serialises the reservation):
BEGIN;
SELECT count FROM seats WHERE flight = 'AI-101' AND seat = '14A' FOR UPDATE;
-- FOR UPDATE: acquires an exclusive lock on this row.
-- T2's SELECT FOR UPDATE on the same row now BLOCKS until T1 commits or rolls back.
UPDATE seats SET count = 0, passenger = 'Rahul' WHERE ...;
COMMIT;
-- T1 commits. Lock released. T2's SELECT FOR UPDATE now proceeds.
-- T2 reads: count = 0 (seat is gone).
-- T2 application sees count = 0, returns "seat not available" to Priya.
-- Only Rahul gets the seat. Correct.`}
            </CodeBox>

            <SubTitle>The Four Concurrency Problems Isolation Prevents</SubTitle>

            <Para>
              Different isolation levels prevent different subsets of these four problems.
              Understanding exactly what each problem is — and what isolation level prevents it —
              is essential for both system design and interviews. These problems are covered
              in complete depth in Module 10 (Concurrency Control). Here we introduce them
              in the context of isolation.
            </Para>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 14, marginBottom: 24 }}>
              {[
                {
                  problem: 'Dirty Read',
                  color: '#ff4757',
                  desc: 'Transaction T2 reads data that T1 has modified but not yet committed. If T1 then rolls back, T2 has acted on data that never officially existed. The "dirty" data (uncommitted changes) has contaminated T2\'s results.',
                  example: 'T1 sets salary to ₹80,000 (not committed). T2 reads ₹80,000 and uses it in a calculation. T1 rolls back. T2\'s calculation is based on data that never existed.',
                  preventedBy: 'READ COMMITTED and above',
                },
                {
                  problem: 'Non-Repeatable Read',
                  color: '#f97316',
                  desc: 'T1 reads a row. T2 updates and commits that row. T1 reads the same row again and gets a different value. The same query returns different results within the same transaction.',
                  example: 'T1 reads account balance = ₹5,000 for a report. T2 debits ₹1,000 and commits. T1 reads balance again = ₹4,000. The report is internally inconsistent.',
                  preventedBy: 'REPEATABLE READ and above',
                },
                {
                  problem: 'Phantom Read',
                  color: '#facc15',
                  desc: 'T1 executes a query returning a set of rows. T2 inserts new rows that match T1\'s query and commits. T1 re-executes the same query and finds new "phantom" rows that appeared.',
                  example: 'T1 counts orders where amount > 500: gets 47. T2 inserts an order for ₹800 and commits. T1 counts again: gets 48. New phantom row appeared.',
                  preventedBy: 'SERIALIZABLE',
                },
                {
                  problem: 'Lost Update',
                  color: '#8b5cf6',
                  desc: 'Two transactions read the same value, both modify it based on what they read, and both commit. The second commit overwrites the first — the first update is lost as if it never happened.',
                  example: 'T1 reads stock=10, computes 10-1=9, writes 9. T2 reads stock=10, computes 10-1=9, writes 9. Two items sold, but stock shows 9 not 8. One sale\'s effect is lost.',
                  preventedBy: 'SELECT FOR UPDATE locking or REPEATABLE READ',
                },
              ].map((item) => (
                <div key={item.problem} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.problem}</div>
                  <Para>{item.desc}</Para>
                  <div style={{ fontSize: 12, color: 'var(--text)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', marginBottom: 8, lineHeight: 1.7 }}>
                    <strong>Example:</strong> {item.example}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Prevented by: {item.preventedBy}</div>
                </div>
              ))}
            </div>

            <SubTitle>The Four SQL Isolation Levels</SubTitle>

            <Para>
              SQL standard defines four isolation levels — from weakest to strongest.
              Each level is defined by which of the above anomalies it prevents.
              Higher isolation = stronger correctness guarantees = lower concurrency
              (more locking and blocking). The choice of isolation level is a deliberate
              engineering trade-off.
            </Para>

            <div style={{ overflowX: 'auto', marginBottom: 20 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Isolation Level', 'Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Performance', 'Use Case'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['READ UNCOMMITTED', '✓ Possible', '✓ Possible', '✓ Possible', '⚡ Fastest', 'Analytics where slight staleness is acceptable'],
                    ['READ COMMITTED', '✗ Prevented', '✓ Possible', '✓ Possible', '⚡ Fast', 'Default for most applications (PostgreSQL default)'],
                    ['REPEATABLE READ', '✗ Prevented', '✗ Prevented', '✓ Possible', '⚡ Medium', 'Financial reports, consistent snapshots (MySQL default)'],
                    ['SERIALIZABLE', '✗ Prevented', '✗ Prevented', '✗ Prevented', '🐌 Slowest', 'Banking, stock trading — maximum correctness required'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{
                          padding: '12px 12px',
                          color: j === 0 ? 'var(--text)' : j >= 1 && j <= 3 ? (cell.includes('✓') ? '#ff4757' : 'var(--accent)') : 'var(--text)',
                          fontWeight: j === 0 ? 700 : 400,
                          fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif',
                          fontSize: 12, lineHeight: 1.6,
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CodeBox label="Setting isolation levels in SQL">
{`-- Set isolation level for the current transaction:
BEGIN;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- All reads in this transaction see only committed data.

-- Set isolation level for all future transactions in the session:
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- PostgreSQL: check current isolation level
SHOW transaction_isolation;

-- Common production choices:
-- Web application (read-heavy, tolerates eventual consistency):
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;  -- PostgreSQL default

-- Financial system (balance calculations, reporting):
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Prevents reading changed values mid-transaction

-- Bank account updates (must prevent lost updates and phantom reads):
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Maximum correctness, minimum throughput

-- OR: use SELECT FOR UPDATE to serialise specific row access:
BEGIN;
SELECT balance FROM accounts WHERE account_id = 'A' FOR UPDATE;
-- Acquires exclusive lock on this row
-- No other transaction can modify this row until T1 commits or rolls back
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
COMMIT;`}
            </CodeBox>
          </div>
        </div>

        {/* ── D — DURABILITY ── */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ height: 4, background: '#8b5cf6' }} />
          <div style={{ padding: '28px 30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 42, fontWeight: 900, color: '#8b5cf6', fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>D</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>Durability</div>
                <div style={{ fontSize: 13, color: '#8b5cf6', fontFamily: 'var(--font-mono)', marginTop: 2 }}>"Once Committed, Always Committed"</div>
              </div>
            </div>

            <Para>
              Durability means that once a transaction has been committed, its effects
              are permanent — they survive any subsequent failure. Power cuts, OS crashes,
              hardware failures, process kills — none of these can cause a committed
              transaction to be lost. If the database told you "COMMIT successful,"
              your data is safe. Forever. No exceptions.
            </Para>

            <Para>
              This sounds obvious, but implementing it correctly is one of the most
              technically challenging aspects of database engineering. The problem is the
              gap between RAM and disk. When your application commits a transaction,
              the data may still be in the database's buffer pool in RAM —
              not yet written to the physical disk. If the server loses power at this
              moment, the RAM contents are gone and the committed data is lost.
              Durability is the guarantee that this cannot happen.
            </Para>

            <SubTitle>How Durability Is Implemented — Write-Ahead Logging (WAL)</SubTitle>

            <Para>
              Durability is implemented through the <strong style={{ color: 'var(--accent)' }}>Write-Ahead Log (WAL)</strong>.
              The core rule of WAL is: before any change is written to the actual data pages,
              a record of that change must be written to the WAL and flushed to durable storage
              (physically written to disk, not just buffered). A COMMIT is only acknowledged
              to the application after the commit record has been written and flushed to the WAL.
            </Para>

            <Para>
              This means: even if the server crashes immediately after sending "COMMIT" to the application,
              the WAL on disk contains a complete record of every change in that transaction.
              On restart, the recovery system reads the WAL, identifies the committed transaction,
              and re-applies its changes to the data pages. The committed data is recovered
              completely. This is covered in complete depth in Module 16.
            </Para>

            <CodeBox label="Durability in practice — WAL flush and recovery">
{`-- WHAT HAPPENS WHEN YOU COMMIT:

-- Step 1: Application executes operations
BEGIN;
UPDATE accounts SET balance = 4500 WHERE account_id = 'A';  -- change in buffer pool
UPDATE accounts SET balance = 2500 WHERE account_id = 'B';  -- change in buffer pool

-- Step 2: Application issues COMMIT
COMMIT;

-- Step 3: Database writes commit record to WAL
-- WAL entry: TXN_ID=8821 COMMITTED
-- WAL entry: TXN_ID=8821 BEFORE(A.balance=5000) AFTER(A.balance=4500)
-- WAL entry: TXN_ID=8821 BEFORE(B.balance=2000) AFTER(B.balance=2500)
-- WAL is flushed to disk (fsync) — this is the performance-critical step

-- Step 4: "COMMIT" is returned to the application
-- The data pages (A.balance, B.balance) may still be in buffer pool, NOT on disk
-- But durability is guaranteed because WAL is on disk

-- If server crashes NOW:
-- RAM is gone: buffer pool data (updated A and B values) is lost
-- Disk has: WAL with committed transaction record
-- On restart: recovery reads WAL, sees committed TXN 8821, REDOES both updates
-- A.balance = 4500, B.balance = 2500 — correctly recovered

-- DURABILITY PERFORMANCE TRADE-OFF:
-- fsync (WAL flush) is expensive — it waits for physical disk write confirmation
-- PostgreSQL configuration:
-- synchronous_commit = on  (default): wait for WAL fsync before returning COMMIT
--   → guaranteed durability, ~1-10ms added to each transaction
-- synchronous_commit = off: return COMMIT without waiting for WAL fsync
--   → slightly faster, but up to synchronous_commit_delay (200ms) of committed
--     transactions may be lost on crash
--   → acceptable for low-stakes operations (analytics, logging)
--   → NEVER use for financial transactions

-- CHECK current setting:
SHOW synchronous_commit;`}
            </CodeBox>

            <SubTitle>Durability vs Availability — They Are Not the Same</SubTitle>

            <Para>
              Durability guarantees that committed data survives failures on the local server.
              It does NOT guarantee that the database is always available. If the disk fails
              completely, the WAL is gone too and data recovery depends on backups.
              High availability (always reachable) and durability (no data loss on commit)
              are related but separate concerns. High availability requires replication —
              keeping copies of data on multiple servers so that if one fails, another
              takes over. Replication is covered in Module 17 (Distributed Databases).
            </Para>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 5 — ACID IN REAL SYSTEMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — ACID in Production" />
        <SectionTitle>ACID in Real Production Systems — How Companies Apply These Properties</SectionTitle>

        <Para>
          ACID properties are not abstract theory — they are engineering constraints that
          directly shape how production systems are built. Here is how each property
          manifests in real systems at Indian tech companies.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              company: 'Stripe — Payment Processing',
              color: '#0078d4',
              acid: 'All four ACID properties are non-negotiable',
              detail: 'Every payment involves debiting the customer\'s account, crediting the merchant, creating a transaction record, and updating the payment status. All four steps must be atomic — a partial payment that debits without crediting is a legal and financial disaster. Isolation at SERIALIZABLE level prevents two concurrent requests from processing the same payment twice. Durability ensures that a payment confirmed to the customer is permanently recorded even if the server crashes 10 milliseconds after the confirmation is sent.',
            },
            {
              company: 'DoorDash — Order Management',
              color: 'var(--accent)',
              acid: 'Atomicity and Consistency critical; Isolation at READ COMMITTED',
              detail: 'When a customer places an order, DoorDash must atomically: (1) create the order record, (2) deduct from inventory, (3) charge the payment, (4) notify the restaurant. These are wrapped in a transaction — if payment fails, the order and inventory changes are rolled back. They use READ COMMITTED isolation for the order listing page — it is acceptable for a customer to see an order that was created 50ms ago, and the lower locking overhead supports higher throughput.',
            },
            {
              company: 'Amazon — Inventory Management',
              color: '#f97316',
              acid: 'Lost update prevention critical during flash sales',
              detail: 'During Big Billion Days sales with thousands of concurrent purchases of limited items, lost updates are the primary threat. Without proper isolation, two customers can simultaneously read stock=1, both think they can purchase, both write stock=0 — and both receive confirmation for an item that only has one unit. Amazon uses SELECT FOR UPDATE on inventory rows during checkout, serialising access to each product\'s stock count. This causes some requests to queue, but prevents overselling.',
            },
            {
              company: 'Brex — Credit Score and Payments',
              color: '#8b5cf6',
              acid: 'REPEATABLE READ for credit score calculations',
              detail: 'Credit score calculations involve reading multiple tables (payment history, credit utilisation, account age) and computing a score. If a user\'s payment is processed between two reads in the same calculation, the score could be inconsistently computed. Brex uses REPEATABLE READ isolation for credit score transactions — all reads within the transaction see a consistent snapshot of the database as of when the transaction started, regardless of concurrent updates.',
            },
          ].map((item) => (
            <div key={item.company} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{item.company}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.acid}</span>
              </div>
              <Para>{item.detail}</Para>
            </div>
          ))}
        </div>

        <SubTitle>Complete Worked Example — Amazon Checkout Transaction</SubTitle>

        <Para>
          This is the kind of transaction that a backend engineer at Amazon would write
          for the checkout flow. Notice how every ACID property is explicitly considered
          in the design.
        </Para>

        <CodeBox label="Production checkout transaction — ACID considerations at every step">
{`-- FLIPKART CHECKOUT TRANSACTION
-- Placing an order for 2 units of product P001 by customer C001

BEGIN;
-- ISOLATION: transaction isolation level set to REPEATABLE READ for this transaction
-- (prevents non-repeatable reads during the multi-step checkout)

-- STEP 1: Verify customer is active and eligible (CONSISTENCY check)
SELECT customer_id, is_active, credit_limit
FROM customers
WHERE customer_id = :customer_id
FOR UPDATE;  -- lock this row to prevent concurrent account deactivation

-- Application checks: is_active = true, etc.
-- If inactive: ROLLBACK — consistency violation

-- STEP 2: Lock inventory and check stock (ISOLATION: prevent lost update)
SELECT product_id, stock_quantity, reserved_quantity, price
FROM inventory
WHERE product_id = :product_id
FOR UPDATE;  -- exclusive lock prevents concurrent purchases from reading stale stock

-- Application checks: (stock_quantity - reserved_quantity) >= requested_quantity
-- If insufficient: ROLLBACK — consistency violation (cannot oversell)

-- STEP 3: Reserve inventory (ATOMICITY: part of the indivisible unit)
UPDATE inventory
SET reserved_quantity = reserved_quantity + :requested_qty
WHERE product_id = :product_id;

-- STEP 4: Create order record (ATOMICITY: must happen with inventory update)
INSERT INTO orders (
    order_id, customer_id, status, created_at
) VALUES (
    :new_order_id, :customer_id, 'payment_pending', CURRENT_TIMESTAMP
);

-- STEP 5: Create order line items (ATOMICITY: all or nothing)
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (:new_order_id, :product_id, :requested_qty, :current_price);
-- unit_price = snapshot of current price — CONSISTENCY (price may change later)

-- STEP 6: Deduct from customer wallet or create payment request
UPDATE customer_wallets
SET balance = balance - :order_total
WHERE customer_id = :customer_id
  AND balance >= :order_total;
-- If no rows updated (balance insufficient): ROLLBACK — consistency violation

-- STEP 7: Create payment record
INSERT INTO payments (order_id, amount, method, status)
VALUES (:new_order_id, :order_total, :payment_method, 'captured');

-- STEP 8: Update inventory — convert reserved to actual deduction
UPDATE inventory
SET
    stock_quantity    = stock_quantity    - :requested_qty,
    reserved_quantity = reserved_quantity - :requested_qty
WHERE product_id = :product_id;

-- STEP 9: Update order status to confirmed
UPDATE orders SET status = 'confirmed' WHERE order_id = :new_order_id;

COMMIT;
-- DURABILITY: COMMIT flushes WAL to disk before returning success.
-- Even if the server crashes 1ms after this line, the entire transaction
-- (steps 1-9) will be recovered and replayed on restart.
-- The customer receives their order confirmation with guaranteed backing data.

-- ATOMICITY SUMMARY: All 9 steps succeed together or ALL are rolled back.
-- If step 6 (wallet deduction) fails, steps 1-5 are undone — inventory released.
-- If server crashes after step 7, all steps are rolled back on restart.

-- WHAT HAPPENS ON ROLLBACK:
-- inventory.reserved_quantity returns to original value
-- order is deleted (never committed)
-- order_items are deleted (never committed)
-- wallet balance returns to original (never committed)
-- Customer sees: "Payment failed, please try again" — clean state`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — BASE vs ACID
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — BASE vs ACID" />
        <SectionTitle>BASE — The Alternative Consistency Model for Distributed Systems</SectionTitle>

        <Para>
          ACID is the consistency model of traditional relational databases. When databases
          are distributed across multiple servers (as covered in Module 17), maintaining
          full ACID guarantees becomes extremely expensive — it requires coordination
          between servers which adds latency and reduces throughput. Many internet-scale
          systems opt for a weaker consistency model called
          <strong style={{ color: 'var(--accent)' }}> BASE</strong>.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0078d4', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>ACID</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['A', 'Atomic — all or nothing'],
                ['C', 'Consistent — always valid state'],
                ['I', 'Isolated — concurrent = serial'],
                ['D', 'Durable — committed = permanent'],
              ].map(([letter, desc]) => (
                <div key={letter} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 900, color: '#0078d4', minWidth: 16 }}>{letter}</span>
                  <Para>{desc}</Para>
                </div>
              ))}
            </div>
            <Para>Used by: PostgreSQL, MySQL, Oracle, SQL Server</Para>
            <Para>Best for: financial systems, inventory, anything where correctness is mandatory</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>BASE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['BA', 'Basically Available — system always responds (may return stale data)'],
                ['S', 'Soft state — data may change over time even without input (replication catching up)'],
                ['E', 'Eventually Consistent — given no new updates, all replicas will converge to the same value'],
              ].map(([letter, desc]) => (
                <div key={letter} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 900, color: 'var(--accent)', minWidth: 24 }}>{letter}</span>
                  <Para>{desc}</Para>
                </div>
              ))}
            </div>
            <Para>Used by: Cassandra, DynamoDB, CouchDB, many NoSQL systems</Para>
            <Para>Best for: social feeds, product catalogs, user preferences — data where slight staleness is acceptable</Para>
          </div>
        </div>

        <Para>
          BASE does not mean "no consistency" — it means
          <strong style={{ color: 'var(--accent)' }}> eventual consistency</strong>: the system
          will eventually reach a consistent state, but at any given moment, different
          servers might serve slightly different data because replication has not yet
          propagated the latest changes to all nodes.
          A social media like count that shows 1,423 on one server and 1,421 on another —
          both will converge to 1,424 eventually. For a Like count this is acceptable.
          For a bank balance it absolutely is not.
        </Para>

        <Callout type="info">
          <strong>The practical rule:</strong> Use ACID for anything involving money, inventory, orders,
          authentication, or any data where being wrong causes real harm. Use BASE/eventual consistency
          for high-volume, low-stakes data where availability and throughput matter more than
          exact consistency at every moment. Most production systems use both — ACID for the
          transactional core, BASE/eventual for the analytics and social layers.
        </Callout>
      </section>

      {/* ========================================
          PART 7 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Debugging Session — Finding a Missing Transaction in Production Code</SectionTitle>

        <Para>
          This scenario plays out in every backend team. A subtle bug creates data inconsistency
          in production. The root cause is always a missing transaction boundary.
          Understanding this scenario deeply is what makes you the engineer who finds
          and fixes it before it causes a major incident.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Bug Report — Order items disappear after failed payment
          </div>

          <Para>
            Customer support escalates: "Customers report that after a failed payment,
            their order appears in the system with status 'payment_failed' but the
            order_items are missing. The order total shows ₹0."
          </Para>

          <CodeBox label="The buggy code — missing transaction boundary">
{`# Python Flask backend — checkout endpoint (buggy version)
@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json

    # Step 1: Create order record
    order_id = db.execute("""
        INSERT INTO orders (customer_id, restaurant_id, total_amount, status)
        VALUES (%s, %s, %s, 'payment_pending')
        RETURNING order_id
    """, (data['customer_id'], data['restaurant_id'], data['total_amount']))
    # ← AUTO-COMMITTED immediately (no BEGIN)! Order exists in DB.

    # Step 2: Insert order items
    for item in data['items']:
        db.execute("""
            INSERT INTO order_items (order_id, item_id, quantity, unit_price)
            VALUES (%s, %s, %s, %s)
        """, (order_id, item['id'], item['qty'], item['price']))
    # ← Each INSERT AUTO-COMMITTED immediately!

    # Step 3: Process payment via external API
    try:
        payment_result = payment_gateway.charge(
            amount=data['total_amount'],
            card_token=data['card_token']
        )
    except PaymentFailedException as e:
        # Payment failed — update order status
        db.execute("""
            UPDATE orders SET status = 'payment_failed', total_amount = 0
            WHERE order_id = %s
        """, (order_id,))
        # ← Updates order to failed state
        # BUT: order_items from Step 2 were already committed and remain in DB
        # total_amount set to 0 but items still exist
        return {'error': 'Payment failed'}, 400

    return {'order_id': order_id}, 200
# BUG: The order and order_items are committed even when payment fails.
# total_amount is reset to 0 but line items remain — inconsistent state.`}
          </CodeBox>

          <CodeBox label="The fix — wrap everything in a transaction">
{`# Python Flask backend — checkout endpoint (FIXED with transaction)
@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json

    try:
        # START TRANSACTION — all operations are now part of one atomic unit
        db.execute("BEGIN")

        # Step 1: Create order record
        order_id = db.execute("""
            INSERT INTO orders (customer_id, restaurant_id, total_amount, status)
            VALUES (%s, %s, %s, 'payment_pending')
            RETURNING order_id
        """, (data['customer_id'], data['restaurant_id'], data['total_amount']))
        # NOT committed — held in transaction buffer

        # Step 2: Insert order items
        for item in data['items']:
            db.execute("""
                INSERT INTO order_items (order_id, item_id, quantity, unit_price)
                VALUES (%s, %s, %s, %s)
            """, (order_id, item['id'], item['qty'], item['price']))
        # NOT committed — held in transaction buffer

        # Step 3: Process payment
        payment_result = payment_gateway.charge(
            amount=data['total_amount'],
            card_token=data['card_token']
        )
        # Payment succeeded — now commit everything together

        db.execute("COMMIT")
        # COMMIT: order + order_items become permanent simultaneously
        return {'order_id': order_id}, 200

    except PaymentFailedException as e:
        db.execute("ROLLBACK")
        # ROLLBACK: order + order_items are UNDONE — as if they never existed
        # No orphaned records, no inconsistent state
        return {'error': 'Payment failed, no charges made'}, 400

    except Exception as e:
        db.execute("ROLLBACK")
        # Any unexpected error: clean rollback
        return {'error': 'Checkout failed'}, 500

# WITH TRANSACTION:
# - Payment fails → ROLLBACK → zero records in DB → customer can retry cleanly
# - Payment succeeds → COMMIT → order + items both permanently exist
# - Server crash mid-operation → auto-ROLLBACK on restart → clean state`}
          </CodeBox>

          <Para>
            The fix is nine characters: adding <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>BEGIN</code> at the start,
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> COMMIT</code> on success,
            and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> ROLLBACK</code> on failure.
            Those nine characters are the difference between a system that leaves orphaned,
            inconsistent records on payment failure and one that maintains perfect data integrity.
            This class of bug is responsible for a significant percentage of data quality
            incidents in production systems — and it is found in codebases at companies
            of every size.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 8 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>Transaction and ACID Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'Explain ACID properties with a real-world example.',
              color: '#0078d4',
              a: 'Use the bank transfer: Atomicity — both the debit and credit happen together or neither happens; the money cannot vanish mid-transfer. Consistency — both accounts must satisfy their constraints before and after (balance cannot go negative if a CHECK constraint exists; the total money in the system is conserved). Isolation — if two transfers happen simultaneously, each transfer sees a consistent state; the intermediate state of one is not visible to the other. Durability — once the transfer is confirmed, it survives any subsequent failure; the committed changes are written to durable storage and recovered after a crash. These four properties together make the bank transfer reliable even in a system with failures and concurrent users.',
            },
            {
              q: 'What is the difference between Atomicity and Durability?',
              color: 'var(--accent)',
              a: 'Atomicity deals with the outcome of a transaction: either all operations complete or none do. It is about preventing partial completion. It applies during the transaction\'s execution and determines what happens on failure before commit. Durability deals with what happens after a successful commit: the committed changes persist through any subsequent failure. It is about ensuring committed data is not lost. A transaction can be atomic (never partially committed) without being durable (committed data can still be lost if it was in RAM and not flushed to disk when the power failed). Durability specifically addresses the gap between acknowledging a commit and physically writing it to non-volatile storage.',
            },
            {
              q: 'What is the difference between Consistency and Isolation?',
              color: '#f97316',
              a: 'Consistency is about data validity — ensuring that integrity constraints, business rules, and data invariants are satisfied before and after every transaction. It is a property of the database state at transaction boundaries. A consistent transaction moves the database from one valid state to another. Isolation is about transaction visibility — ensuring that concurrent transactions do not see each other\'s intermediate (incomplete) states. It is a property of how multiple transactions interact during their concurrent execution. A database can be consistent (all constraints satisfied) while not being isolated (transactions seeing each other\'s uncommitted changes). They address completely orthogonal concerns.',
            },
            {
              q: 'What happens if a database crashes immediately after COMMIT returns to the application?',
              color: '#8b5cf6',
              a: 'Nothing bad — this is exactly what Durability guarantees. When COMMIT returns to the application, the database has already written the commit record to the Write-Ahead Log and flushed it to disk (with synchronous_commit = on). The actual data pages may still be in the buffer pool in RAM, but the WAL on disk contains a complete record of all changes. On restart, the recovery system reads the WAL, identifies the committed transaction (by finding its commit record), and re-applies (redoes) all its changes to the data pages. The committed data is fully recovered. The application can be confident that a committed transaction is permanent.',
            },
            {
              q: 'What is the difference between READ COMMITTED and REPEATABLE READ isolation levels?',
              color: '#facc15',
              a: 'READ COMMITTED: a transaction only sees data that has been committed before each individual statement executes. If another transaction commits between two statements in the same transaction, the second statement sees the new data. This allows non-repeatable reads — reading the same row twice in one transaction can return different values. REPEATABLE READ: a transaction sees a consistent snapshot of the database as of the moment the transaction began. Even if other transactions commit changes to rows being read, the repeatable read transaction always sees the original values it first read. Non-repeatable reads are impossible. However, phantom reads (new rows appearing that match a previous query) are still possible in some implementations (though PostgreSQL\'s REPEATABLE READ actually prevents phantoms too using snapshot isolation). PostgreSQL default is READ COMMITTED. MySQL default is REPEATABLE READ.',
            },
            {
              q: 'Can a COMMIT fail? What happens?',
              color: '#e879f9',
              a: 'Yes. A COMMIT can fail in several scenarios. Disk failure during WAL write: the commit record cannot be written to durable storage. The DBMS cannot guarantee durability, so the commit fails and the transaction is rolled back. Constraint violation detected at commit time: some constraints (deferred constraints in PostgreSQL) are checked at commit rather than immediately. If a violation is detected at commit time, the commit fails and the transaction is aborted. Out of disk space: if the WAL or data files cannot be written because disk is full, the commit fails. In all cases, a failed commit results in the transaction being aborted and all its changes being rolled back. The application receives an error rather than a success confirmation. No partial commits are possible.',
            },
            {
              q: 'What is the difference between ROLLBACK and ROLLBACK TO SAVEPOINT?',
              color: '#0078d4',
              a: 'ROLLBACK (without SAVEPOINT) aborts the entire transaction and undoes ALL changes since BEGIN. The transaction terminates and cannot continue. A new transaction must be started if needed. ROLLBACK TO SAVEPOINT undoes only the changes made after the specified SAVEPOINT was created. The transaction continues — it does NOT terminate. Changes made before the SAVEPOINT are preserved and can still be committed. The savepoint itself is preserved (you can roll back to it again). RELEASE SAVEPOINT removes a savepoint but the transaction continues. Savepoints are useful for partial error recovery within a long transaction: try a risky operation, and if it fails, rollback to the savepoint and try an alternative approach without losing the work done before the savepoint.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Q: {item.q}</div>
              <Para>{item.a}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A transaction is a logical unit of work that must execute as a single indivisible unit — all operations succeed together or all are rolled back together. Partial completion is never a valid outcome.',
        'Transaction lifecycle: Active (executing) → Partially Committed (last operation done, waiting for disk write) → Committed (permanent) or Failed → Aborted (fully rolled back). A failed transaction cannot resume — it must restart completely.',
        'Autocommit mode wraps each SQL statement in its own implicit transaction. Multi-step operations MUST use explicit BEGIN/COMMIT to be grouped atomically. Missing BEGIN is the most common cause of data inconsistency bugs in production.',
        'SAVEPOINT creates a named rollback point within a transaction. ROLLBACK TO SAVEPOINT undoes changes since that savepoint without terminating the transaction. The transaction can continue and eventually COMMIT or fully ROLLBACK.',
        'Atomicity: all or nothing — implemented via Write-Ahead Logging (WAL). Before any data page is changed, the change is recorded in the WAL and flushed to disk. On crash recovery, the WAL is replayed to restore committed state.',
        'Consistency: every transaction moves the database from one valid state to another. DBMS enforces structural constraints (PK, FK, CHECK, NOT NULL). Application must enforce semantic business rules (balance cannot go negative, order total must match items).',
        'Isolation: concurrent transactions do not see each other\'s intermediate states. Four isolation levels: READ UNCOMMITTED (no protection), READ COMMITTED (prevents dirty reads — PostgreSQL default), REPEATABLE READ (prevents non-repeatable reads — MySQL default), SERIALIZABLE (prevents all anomalies — maximum correctness).',
        'Four concurrency anomalies: Dirty Read (reading uncommitted changes), Non-Repeatable Read (same row returns different values in same transaction), Phantom Read (new rows appear in repeated query), Lost Update (concurrent writes overwrite each other). Each isolation level prevents a different subset.',
        'Durability: once COMMIT returns, the transaction is permanent through any failure — implemented by flushing WAL to disk before acknowledging COMMIT. synchronous_commit = on (default) guarantees this. synchronous_commit = off trades durability for speed.',
        'BASE (Basically Available, Soft state, Eventually Consistent) is the alternative to ACID for distributed systems where strong consistency is too expensive. Use ACID for financial, inventory, and transactional data. Use BASE for social, analytics, and high-volume low-stakes data where eventual consistency is acceptable.',
      ]} />

    </LearnLayout>
  )
}