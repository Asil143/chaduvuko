import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Concurrency Control — Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete concurrency control from first principles — lock-based protocols, two-phase locking, deadlocks, timestamp ordering, MVCC, serializability, conflict and view serializability, precedence graphs, and every exam and interview pattern explained.',
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

export default function ConcurrencyControl() {
  return (
    <LearnLayout
      title="Concurrency Control"
      description="How databases let thousands of transactions run simultaneously without corrupting each other — locks, two-phase locking, deadlocks, timestamp ordering, and MVCC explained from the ground up."
      section="DBMS"
      readTime="90–110 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY CONCURRENCY CONTROL EXISTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>Why Concurrency Control Exists — The Problem of Simultaneous Access</SectionTitle>

        <Para>
          A production database is never accessed by one user at a time.
          Swiggy processes thousands of orders per second. Razorpay handles
          tens of thousands of payment requests per minute. Every one of those
          requests involves reading and writing the same shared tables.
          Without a mechanism to coordinate this simultaneous access,
          the results would be catastrophically wrong.
        </Para>

        <Para>
          In Module 09 we introduced the four concurrency anomalies — dirty reads,
          non-repeatable reads, phantom reads, and lost updates — and noted that
          isolation levels prevent them. In this module we examine the precise
          mechanisms by which that prevention is implemented. Knowing that
          SERIALIZABLE isolation prevents phantom reads is useful. Understanding
          <em> how</em> it prevents them — what the database actually does when
          two transactions access the same data simultaneously — is what separates
          a database user from a database engineer.
        </Para>

        <Para>
          There are three major families of concurrency control mechanisms.
          Lock-based protocols control access by acquiring locks before reading or writing.
          Timestamp-based protocols order transactions by their start time and validate
          operations against that order without locking.
          Multiversion concurrency control (MVCC) maintains multiple versions of each
          data item so readers never block writers and writers never block readers.
          All three are used in production databases today.
        </Para>

        <SubTitle>The Schedule — Formalising Concurrent Execution</SubTitle>

        <Para>
          To reason precisely about concurrent transactions, we need a formal model.
          A <strong style={{ color: 'var(--accent)' }}>schedule</strong> is a sequence
          of operations from multiple transactions, interleaved in the order they actually
          execute. Each operation is either a read (R) or a write (W) on a data item,
          followed by a commit (C) or abort (A).
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// Notation: R1(X) = Transaction 1 reads item X. W2(Y) = Transaction 2 writes item Y.</div>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// C1 = Transaction 1 commits. A2 = Transaction 2 aborts.</div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: '#0078d4', fontWeight: 700 }}>Serial Schedule S1</span>
            <span style={{ color: 'var(--text2)' }}> (T1 completes, then T2 starts):</span>
          </div>
          <div style={{ paddingLeft: 16, color: 'var(--text2)', marginBottom: 16 }}>R1(A) → W1(A) → C1 → R2(A) → W2(A) → C2</div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Concurrent Schedule S2</span>
            <span style={{ color: 'var(--text2)' }}> (interleaved execution):</span>
          </div>
          <div style={{ paddingLeft: 16, color: 'var(--text2)', marginBottom: 16 }}>R1(A) → R2(A) → W1(A) → W2(A) → C1 → C2</div>
          <div style={{ color: 'var(--muted)' }}>
            // Serial schedule: always correct — one transaction finishes before the next begins.<br />
            // Concurrent schedule: may or may not be correct depending on the operations.
          </div>
        </div>

        <Para>
          A serial schedule is always correct by definition — there is no interleaving,
          so no transaction sees another's partial state.
          The goal of concurrency control is to allow concurrent (interleaved) execution
          for performance while guaranteeing that the outcome is equivalent to
          <em> some</em> serial schedule. This property is called
          <strong style={{ color: 'var(--accent)' }}> serializability</strong>.
        </Para>
      </section>

      {/* ========================================
          PART 2 — SERIALIZABILITY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Serializability" />
        <SectionTitle>Serializability — The Gold Standard for Correctness</SectionTitle>

        <Para>
          A schedule is <strong style={{ color: 'var(--accent)' }}>serializable</strong> if
          its outcome (the final database state and the values returned to each transaction)
          is identical to the outcome of some serial execution of the same transactions.
          If the interleaved execution produces the same result as running T1 then T2
          (or T2 then T1), the schedule is serializable and therefore correct.
        </Para>

        <Para>
          There are two types of serializability, each with different strength.
          <strong style={{ color: 'var(--accent)' }}> Conflict serializability</strong> is
          the type that most databases enforce — it is easier to check algorithmically.
          <strong style={{ color: 'var(--accent)' }}> View serializability</strong> is a
          broader definition — every conflict-serializable schedule is view-serializable,
          but not every view-serializable schedule is conflict-serializable.
        </Para>

        <SubTitle>Conflicting Operations — The Foundation of Conflict Serializability</SubTitle>

        <Para>
          Two operations from different transactions
          <strong style={{ color: 'var(--accent)' }}> conflict</strong> if they satisfy
          all three conditions simultaneously:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            'They belong to different transactions (operations within the same transaction never conflict with each other)',
            'They access the same data item (operations on different items can never interfere)',
            'At least one of them is a WRITE (two reads on the same item never conflict — reading the same value twice causes no harm)',
          ].map((cond, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 900, color: 'var(--accent)', flexShrink: 0 }}>{i + 1}</span>
              <Para>{cond}</Para>
            </div>
          ))}
        </div>

        <Para>
          This gives us three types of conflicts: Read-Write conflict (one reads, one writes
          the same item), Write-Read conflict (one writes, other reads that written item),
          and Write-Write conflict (both write the same item). Two reads on the same item
          are never a conflict.
        </Para>

        <CodeBox label="Identifying conflicting operations in a schedule">
{`// Schedule S: R1(A) → R2(A) → W1(A) → R2(B) → W2(A) → W1(B) → C1 → C2

// Check every pair of operations from DIFFERENT transactions:

// R1(A) and R2(A): same item A, different transactions, BUT both are reads → NO CONFLICT
// R1(A) and W2(A): same item A, different transactions, W2 is a write → CONFLICT (R-W)
// R1(A) and R2(B): different items (A vs B) → NO CONFLICT
// R1(A) and W2(A): already noted
// W1(A) and R2(A): R2 reads A, W1 writes A, different transactions → CONFLICT (W-R)
// W1(A) and W2(A): same item A, different transactions, both writes → CONFLICT (W-W)
// R2(B) and W1(B): same item B, different transactions, W1 writes → CONFLICT (R-W)
// W2(A) and W1(A): same as W1(A) and W2(A) — conflict
// W2(A) and W1(B): different items → NO CONFLICT
// W1(B) and W2(A): different items → NO CONFLICT

// CONFLICTING PAIRS in this schedule:
// (R1(A), W2(A)) — T1 reads A before T2 writes A
// (W1(A), R2(A)) — T2 reads A after T1 writes A → but wait, R2(A) comes BEFORE W1(A)
//                  in the schedule: R2(A) is 2nd, W1(A) is 3rd → T2 reads A before T1 writes
//                  so this is: R2(A) before W1(A) → T2 reads A, T1 later writes A
// (W1(A), W2(A)) — T1 writes A, T2 later writes A
// (R2(B), W1(B)) — T2 reads B, T1 later writes B

// For conflict serializability: can we swap non-conflicting adjacent operations
// to transform this schedule into a serial schedule?
// See Precedence Graph method below for the systematic approach.`}
        </CodeBox>

        <SubTitle>The Precedence Graph — Testing Conflict Serializability</SubTitle>

        <Para>
          The <strong style={{ color: 'var(--accent)' }}>precedence graph</strong> (also called
          the serialisation graph or conflict graph) is the algorithmic tool for testing
          whether a schedule is conflict-serializable. It is the most important algorithm
          in this module and appears in virtually every GATE exam on this topic.
        </Para>

        <Para>
          Construction: create one node per transaction. For each conflicting pair of
          operations (Op_i from Ti, Op_j from Tj), if Op_i appears before Op_j in the
          schedule, draw a directed edge from Ti to Tj. The edge means: "Ti must come
          before Tj in any equivalent serial schedule."
        </Para>

        <Para>
          Test: the schedule is conflict-serializable if and only if the precedence graph
          contains <strong style={{ color: 'var(--accent)' }}>no cycles</strong>. If the graph
          is a DAG (directed acyclic graph), the topological sort of the graph gives the
          equivalent serial order.
        </Para>

        <CodeBox label="Precedence graph — three complete worked examples">
{`// ─────────────────────────────────────────────────────────────────
// EXAMPLE 1: Schedule that IS conflict-serializable
// Schedule S1: R1(A) → W1(A) → R2(A) → W2(A) → R1(B) → W2(B) → C1 → C2
// ─────────────────────────────────────────────────────────────────

// Step 1: Find all conflicting pairs:
// W1(A) before R2(A): W-R conflict on A → edge T1 → T2
// W1(A) before W2(A): W-W conflict on A → edge T1 → T2 (already have this)
// R1(B) before W2(B): R-W conflict on B → edge T1 → T2 (already have this)

// Precedence graph: T1 ──→ T2  (one edge, no cycle)

// Is it acyclic? YES — no cycle
// Equivalent serial schedule: T1, T2 (topological order)
// S1 IS conflict-serializable ✓

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 2: Schedule that is NOT conflict-serializable
// Schedule S2: R1(A) → R2(B) → W1(B) → W2(A) → C1 → C2
// ─────────────────────────────────────────────────────────────────

// Step 1: Find all conflicting pairs:
// R1(A) before W2(A): R-W conflict on A → edge T1 → T2
// R2(B) before W1(B): R-W conflict on B → edge T2 → T1

// Precedence graph: T1 ──→ T2
//                  T2 ──→ T1   ← CYCLE!

// T1 must come before T2 (from R1(A)-W2(A) conflict)
// T2 must come before T1 (from R2(B)-W1(B) conflict)
// Contradiction — no valid serial order exists.

// S2 is NOT conflict-serializable ✗
// This schedule can produce results inconsistent with any serial execution.

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 3: Three transactions — GATE level
// Schedule S3: R1(X) → R2(X) → W2(X) → R3(X) → W1(X) → W3(X) → C1 → C2 → C3
// ─────────────────────────────────────────────────────────────────

// Step 1: Find all conflicting pairs (same item, different tx, at least one write):
// R1(X) before W2(X): R-W on X → T1 → T2
// R1(X) before W3(X): R-W on X → T1 → T3
// R2(X) before W1(X): R-W on X → T2 → T1   ← note direction: R2 before W1
// R2(X) before W3(X): R-W on X → T2 → T3
// W2(X) before R3(X): W-R on X → T2 → T3 (already have this)
// W2(X) before W1(X): W-W on X → T2 → T1 (already have this)
// W2(X) before W3(X): W-W on X → T2 → T3 (already have this)
// R3(X) before W1(X): R-W on X → T3 → T1
// W1(X) before W3(X): W-W on X → T1 → T3 (already have this)

// Unique edges:
// T1 → T2 (from R1 before W2)
// T1 → T3 (from R1 before W3)
// T2 → T1 (from R2 before W1) ← T1→T2 AND T2→T1 = CYCLE between T1 and T2
// T2 → T3 (from R2 before W3)
// T3 → T1 (from R3 before W1) ← T1→T3 AND T3→T1 = CYCLE between T1 and T3

// Precedence graph has cycles: T1↔T2 and T1↔T3
// S3 is NOT conflict-serializable ✗`}
        </CodeBox>

        <SubTitle>View Serializability — The Broader Definition</SubTitle>

        <Para>
          Two schedules S and S' are <strong style={{ color: 'var(--accent)' }}>view-equivalent</strong> if:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { cond: 'Initial reads match', desc: 'For each data item X, if transaction Ti reads the initial value of X in S, then Ti also reads the initial value of X in S\' (not a value written by some other transaction).' },
            { cond: 'Updated reads match', desc: 'For each data item X, if Ti reads the value written by Tj in S, then Ti also reads the value written by Tj in S\'.' },
            { cond: 'Final writes match', desc: 'For each data item X, if Ti performs the final write of X in S (the write that survives to the end), then Ti also performs the final write of X in S\'.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '1px 7px', flexShrink: 0, marginTop: 2 }}>V{i + 1}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.cond}</div>
                <Para>{item.desc}</Para>
              </div>
            </div>
          ))}
        </div>

        <Para>
          A schedule is <strong style={{ color: 'var(--accent)' }}>view-serializable</strong> if
          it is view-equivalent to some serial schedule. Every conflict-serializable schedule
          is also view-serializable. But some view-serializable schedules are not
          conflict-serializable — specifically those containing
          <strong style={{ color: 'var(--accent)' }}> blind writes</strong>
          (a transaction writes a value without first reading it, meaning the write
          is immediately overwritten and its value never matters).
        </Para>

        <CodeBox label="View-serializable but NOT conflict-serializable — the blind write case">
{`// Schedule: W1(X) → W2(X) → W1(X) → C1 → C2
// (T1 writes X, T2 writes X, T1 writes X again)

// Conflicting pairs:
// W1(X) first and W2(X): W-W on X → T1 → T2
// W2(X) and W1(X) second: W-W on X → T2 → T1  ← CYCLE

// Precedence graph has cycle T1↔T2 → NOT conflict-serializable.

// But check view-serializability against serial schedule (T1, T2):
// Serial (T1 then T2): W1(X), W1(X), W2(X)
//   Final write of X: T2 ✓
// Our schedule: W1(X), W2(X), W1(X)
//   Final write of X: T1 ✗ — T2's write is not the final write!

// Check against serial schedule (T2, T1):
// Serial (T2 then T1): W2(X), W1(X), W1(X)
//   Final write of X: T1
// Our schedule W1(X), W2(X), W1(X):
//   Initial reads: none (no reads in this schedule)
//   Updated reads: none
//   Final write of X: T1 ✓ (matches)
// → View-equivalent to serial (T2, T1)!
// → Schedule IS view-serializable but NOT conflict-serializable.

// WHY: W2(X) is a blind write — T2 writes X without reading it,
// and T1 immediately overwrites it. T2's write is "invisible."
// The presence of blind writes can make a non-conflict-serializable
// schedule still view-serializable.

// PRACTICAL NOTE: Most databases test for conflict serializability
// because it is efficiently checkable (O(n²) precedence graph).
// View serializability testing is NP-complete in general.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — LOCK-BASED PROTOCOLS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Locks" />
        <SectionTitle>Lock-Based Concurrency Control — The Most Widely Used Mechanism</SectionTitle>

        <Para>
          Lock-based concurrency control is the most common mechanism in production relational
          databases. The core idea is simple: before a transaction accesses a data item,
          it must first acquire a lock on that item. Other transactions that need
          incompatible access are forced to wait until the lock is released.
          This serialises conflicting accesses without preventing non-conflicting access.
        </Para>

        <SubTitle>Shared and Exclusive Locks — The Two Basic Lock Types</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,120,212,0.3)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0078d4', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Shared Lock (S-lock)</div>
            <Para>
              Also called a <strong style={{ color: 'var(--text)' }}>read lock</strong>.
              Acquired before reading a data item. Multiple transactions can hold
              shared locks on the same item simultaneously — reading the same data
              concurrently is safe and causes no conflicts.
            </Para>
            <Para>
              A transaction holding an S-lock can read the item but cannot write it.
              To write, it must upgrade to an exclusive lock.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#0078d4', background: 'rgba(0,120,212,0.06)', border: '1px solid rgba(0,120,212,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Compatible with: other S-locks<br />
              Incompatible with: X-locks
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderTop: '3px solid #ff4757', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#ff4757', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Exclusive Lock (X-lock)</div>
            <Para>
              Also called a <strong style={{ color: 'var(--text)' }}>write lock</strong>.
              Acquired before writing a data item. Only one transaction can hold
              an exclusive lock on an item at any time — no other transaction can
              read or write that item while the X-lock is held.
            </Para>
            <Para>
              A transaction holding an X-lock can both read and write the item.
              No other transaction may acquire any lock (S or X) on the item.
            </Para>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#ff4757', background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 6, padding: '8px 12px' }}>
              Compatible with: nothing<br />
              Incompatible with: all locks (S and X)
            </div>
          </div>
        </div>

        <SubTitle>Lock Compatibility Matrix</SubTitle>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ borderCollapse: 'collapse', fontSize: 14, minWidth: 300 }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.1em' }}>Requesting →</th>
                <th style={{ padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#0078d4', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>S-lock</th>
                <th style={{ padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#ff4757', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>X-lock</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Currently held: S-lock', 'var(--accent)', '✓ Compatible', '#ff4757', '✗ Wait'],
                ['Currently held: X-lock', '#ff4757', '✗ Wait', '#ff4757', '✗ Wait'],
                ['No lock held', 'var(--accent)', '✓ Grant', 'var(--accent)', '✓ Grant'],
              ].map(([label, c1, v1, c2, v2]) => (
                <tr key={label as string}>
                  <td style={{ padding: '12px 20px', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontSize: 13, background: 'var(--bg2)', fontWeight: 600 }}>{label as string}</td>
                  <td style={{ padding: '12px 20px', border: '1px solid var(--border)', color: c1 as string, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>{v1 as string}</td>
                  <td style={{ padding: '12px 20px', border: '1px solid var(--border)', color: c2 as string, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>{v2 as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBox label="Basic locking in SQL — explicit lock commands">
{`-- EXPLICIT ROW-LEVEL LOCKS in SQL:

-- SELECT FOR UPDATE: acquire X-lock on selected rows
-- Blocks other transactions from reading or writing those rows
BEGIN;
SELECT balance FROM accounts WHERE account_id = 'A' FOR UPDATE;
-- Row A is now X-locked. Any other transaction attempting:
-- SELECT ... FOR UPDATE on A → BLOCKS until this transaction commits/rolls back
-- SELECT ... (without FOR UPDATE) → behaviour depends on isolation level
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
COMMIT;  -- lock released

-- SELECT FOR SHARE: acquire S-lock on selected rows
-- Allows other S-locks but blocks X-locks
BEGIN;
SELECT balance FROM accounts WHERE account_id = 'A' FOR SHARE;
-- Row A is S-locked. Other transactions CAN read FOR SHARE.
-- But: SELECT ... FOR UPDATE on A → BLOCKS
-- Good for: "I want to read this and be sure it's not modified while I calculate"
COMMIT;

-- SELECT FOR UPDATE SKIP LOCKED: skip rows that are already locked
-- Instead of waiting, move on to the next available row
-- Useful for job queues: grab the next available job without blocking
BEGIN;
SELECT job_id, payload FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
-- Multiple workers can run this concurrently — each grabs a different unlocked row
UPDATE job_queue SET status = 'processing' WHERE job_id = :grabbed_id;
COMMIT;

-- SELECT FOR UPDATE NOWAIT: fail immediately if lock not available
-- Instead of waiting, return an error
BEGIN;
SELECT * FROM inventory WHERE product_id = 'P001' FOR UPDATE NOWAIT;
-- If P001 is locked: ERROR: could not obtain lock on row in relation "inventory"
-- Application can catch this and retry later`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — TWO-PHASE LOCKING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — 2PL" />
        <SectionTitle>Two-Phase Locking (2PL) — The Protocol That Guarantees Serializability</SectionTitle>

        <Para>
          Basic locking prevents conflicts on individual operations, but it does not by itself
          guarantee serializability. A transaction could acquire a lock, release it,
          acquire another lock, release it — and the interleaving of lock acquisitions
          and releases across transactions could still produce a non-serializable schedule.
          Two-Phase Locking (2PL) is the protocol that adds the additional constraint
          necessary to guarantee conflict serializability.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The 2PL Rule</div>
          <Para>
            A transaction must follow a strict two-phase structure regarding lock acquisition and release:
          </Para>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 8 }}>Phase 1 — Growing Phase</div>
              <Para>The transaction may acquire new locks (both S and X locks). It may NOT release any lock during this phase. The transaction grows its lock set.</Para>
            </div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#ff4757', marginBottom: 8 }}>Phase 2 — Shrinking Phase</div>
              <Para>Once the first lock is released, the transaction enters the shrinking phase. It may release existing locks but may NOT acquire any new locks.</Para>
            </div>
          </div>
        </div>

        <Para>
          The critical point: once a transaction releases even one lock,
          it can never acquire another lock for the rest of its execution.
          This prevents the scenario where a transaction releases a lock on item A,
          another transaction modifies A, and the first transaction then re-reads A —
          which would allow non-serializable behaviour.
        </Para>

        <CodeBox label="2PL — the two phases in action">
{`// TRANSACTION T1 — following 2PL:

// GROWING PHASE: acquire locks, do not release any
lock_S(A);    // acquire S-lock on A ← growing phase
read(A);
lock_X(B);    // acquire X-lock on B ← still growing phase
write(B);
lock_S(C);    // acquire S-lock on C ← still growing phase
read(C);
// ← LOCK POINT: this is the moment T1 holds its maximum lock set

// SHRINKING PHASE: release locks, acquire no new ones
unlock(A);    // release S-lock on A ← shrinking phase begins
unlock(B);    // release X-lock on B ← still shrinking
unlock(C);    // release S-lock on C ← still shrinking
commit;

// 2PL VIOLATION (what you must NOT do):
lock_S(A);
read(A);
unlock(A);    // ← released a lock
lock_X(B);    // ← acquiring a NEW lock AFTER releasing → VIOLATES 2PL!
// This sequence is NOT 2PL compliant and may produce non-serializable schedules.

// THEOREM: Any schedule produced by transactions following 2PL is
// conflict-serializable. 2PL is a SUFFICIENT condition for conflict serializability.
// (It is not necessary — there exist serializable schedules not produced by 2PL.)`}
        </CodeBox>

        <SubTitle>Variants of 2PL — Strict, Rigorous, and Conservative</SubTitle>

        <Para>
          Basic 2PL guarantees serializability but still allows cascading aborts —
          a situation where one transaction reads a value written by another,
          and if the writer aborts, the reader must also abort (because it read
          a value that never officially existed). This cascade can propagate through
          many transactions. Three variants of 2PL address this and other problems.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          {[
            {
              name: 'Basic 2PL',
              color: '#f97316',
              rule: 'Two phases as defined: growing then shrinking. Locks can be released before commit.',
              problem: 'Allows cascading aborts. If T1 releases a lock on A and T2 reads A then T1 aborts — T2 must also abort (dirty read). This cascade can affect many transactions.',
              guarantee: 'Conflict serializability',
            },
            {
              name: 'Strict 2PL (S-2PL)',
              color: 'var(--accent)',
              rule: 'All EXCLUSIVE (write) locks must be held until the transaction commits or aborts. Shared locks can be released during shrinking phase.',
              problem: 'Less concurrency than basic 2PL but prevents cascading aborts from dirty writes. The most commonly used variant in practice.',
              guarantee: 'Conflict serializability + no cascading aborts from dirty writes',
            },
            {
              name: 'Rigorous 2PL (R-2PL)',
              color: '#0078d4',
              rule: 'ALL locks (both S and X) must be held until the transaction commits or aborts. No lock is released until commit/abort.',
              problem: 'Least concurrency — locks are held the longest. But completely eliminates cascading aborts and dirty reads. Equivalent to holding locks until commit.',
              guarantee: 'Conflict serializability + no cascading aborts + no dirty reads',
            },
            {
              name: 'Conservative 2PL (C-2PL)',
              color: '#8b5cf6',
              rule: 'A transaction must acquire ALL locks it will ever need before it begins executing any operation. Pre-declares its entire lock set.',
              problem: 'Not practical in most real systems (hard to know all needed locks in advance). But completely prevents deadlocks — if any lock is unavailable, the transaction waits before starting at all.',
              guarantee: 'Conflict serializability + deadlock-free',
            },
          ].map((item) => (
            <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{item.name}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.guarantee}</span>
              </div>
              <Para><strong style={{ color: 'var(--text)' }}>Rule:</strong> {item.rule}</Para>
              <Para><strong style={{ color: 'var(--text)' }}>Trade-off:</strong> {item.problem}</Para>
            </div>
          ))}
        </div>

        <Callout type="tip">
          In production databases, <strong>Strict 2PL is the standard implementation</strong>.
          PostgreSQL, MySQL InnoDB, and Oracle all hold exclusive locks until commit
          (matching Strict 2PL or Rigorous 2PL). This is what happens when you execute
          an UPDATE — the row's X-lock is held until you COMMIT or ROLLBACK.
          You never need to manually implement 2PL — the database does it automatically.
          Understanding it matters for reasoning about concurrency behaviour and designing
          application-level transaction patterns.
        </Callout>
      </section>

      {/* ========================================
          PART 5 — DEADLOCKS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Deadlocks" />
        <SectionTitle>Deadlocks — When Transactions Wait For Each Other Forever</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>deadlock</strong> occurs when two or more
          transactions are each waiting for a lock held by one of the others,
          creating a circular wait that can never resolve on its own.
          No transaction can proceed because each is waiting for another to release a lock,
          but none will release their locks until they finish executing — which they
          cannot do because they are waiting.
        </Para>

        <Para>
          Deadlocks are not programming errors in the traditional sense — they are an
          inherent consequence of lock-based concurrency control. Any system that uses
          locks to protect shared resources can produce deadlocks given the right
          interleaving of operations. The question is not how to prevent them entirely
          (only Conservative 2PL prevents them, at significant cost)
          but how to detect and resolve them quickly.
        </Para>

        <SubTitle>The Classic Deadlock — Step by Step</SubTitle>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// Bank transfer deadlock — two transfers happening simultaneously</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ color: '#0078d4', fontWeight: 700, marginBottom: 8 }}>T1: Transfer A → B</div>
              <div><span style={{ color: 'var(--accent)' }}>t=1:</span> <span style={{ color: 'var(--text2)' }}>lock_X(A) ← acquired ✓</span></div>
              <div><span style={{ color: 'var(--accent)' }}>t=2:</span> <span style={{ color: 'var(--text2)' }}>read(A), debit A</span></div>
              <div><span style={{ color: 'var(--accent)' }}>t=4:</span> <span style={{ color: 'var(--text2)' }}>lock_X(B) ← WAITING...</span></div>
              <div><span style={{ color: '#ff4757' }}>t=∞:</span> <span style={{ color: '#ff4757' }}>blocked by T2's lock on B</span></div>
            </div>
            <div>
              <div style={{ color: '#f97316', fontWeight: 700, marginBottom: 8 }}>T2: Transfer B → A</div>
              <div><span style={{ color: 'var(--accent)' }}>t=1:</span> <span style={{ color: 'var(--text2)' }}>lock_X(B) ← acquired ✓</span></div>
              <div><span style={{ color: 'var(--accent)' }}>t=3:</span> <span style={{ color: 'var(--text2)' }}>read(B), debit B</span></div>
              <div><span style={{ color: 'var(--accent)' }}>t=5:</span> <span style={{ color: 'var(--text2)' }}>lock_X(A) ← WAITING...</span></div>
              <div><span style={{ color: '#ff4757' }}>t=∞:</span> <span style={{ color: '#ff4757' }}>blocked by T1's lock on A</span></div>
            </div>
          </div>
          <div style={{ marginTop: 14, color: '#ff4757' }}>
            // T1 holds A, wants B. T2 holds B, wants A. Neither can proceed. DEADLOCK.
          </div>
        </div>

        <SubTitle>The Wait-For Graph — Detecting Deadlocks</SubTitle>

        <Para>
          The DBMS detects deadlocks using a <strong style={{ color: 'var(--accent)' }}>wait-for graph</strong>.
          Each node is a transaction. A directed edge from Ti to Tj means
          "Ti is waiting for Tj to release a lock." A deadlock exists if and only if
          the wait-for graph contains a cycle.
        </Para>

        <CodeBox label="Wait-for graph — construction and deadlock detection">
{`// WAIT-FOR GRAPH for the deadlock above:
// T1 is waiting for T2 (T1 wants B, which T2 holds) → edge T1 → T2
// T2 is waiting for T1 (T2 wants A, which T1 holds) → edge T2 → T1

// Graph: T1 → T2 → T1  (cycle of length 2 = deadlock involving 2 transactions)

// THREE-TRANSACTION DEADLOCK:
// T1 holds A, wants B
// T2 holds B, wants C
// T3 holds C, wants A

// Wait-for graph:
// T1 → T2 (T1 waits for T2 to release B)
// T2 → T3 (T2 waits for T3 to release C)
// T3 → T1 (T3 waits for T1 to release A)

// Cycle: T1 → T2 → T3 → T1  (deadlock involving 3 transactions)

// DEADLOCK DETECTION PROCESS (performed by DBMS periodically):
// 1. Build current wait-for graph from lock manager state
// 2. Run cycle detection algorithm (DFS or BFS)
// 3. If cycle found: select a victim transaction to abort
// 4. Abort the victim: release all its locks, roll back its work
// 5. The waiting transactions can now proceed
// 6. Repeat detection periodically (every 1 second in PostgreSQL by default)

// HOW POSTGRESQL HANDLES DEADLOCKS:
-- Client A:
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
-- holds X-lock on account A

-- Client B (at same time):
BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE account_id = 'B';
-- holds X-lock on account B
UPDATE accounts SET balance = balance + 300 WHERE account_id = 'A';
-- BLOCKS: waiting for X-lock on A (held by Client A)

-- Client A continues:
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B';
-- BLOCKS: waiting for X-lock on B (held by Client B)

-- After deadlock detection timeout:
-- ERROR: deadlock detected
-- DETAIL: Process 12345 waits for ShareLock on transaction 67890;
--         blocked by process 11111.
-- HINT: See server log for query details.
-- Client B's transaction is rolled back (ABORTED).
-- Client A's lock request on B is now granted. Client A proceeds and commits.
-- Client B must retry its transaction.`}
        </CodeBox>

        <SubTitle>Deadlock Prevention — Alternative Strategies</SubTitle>

        <Para>
          Rather than detecting deadlocks after they occur, deadlock prevention strategies
          ensure deadlocks cannot happen. Two common timestamp-based prevention protocols:
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0078d4', marginBottom: 10 }}>Wait-Die Scheme</div>
            <Para>
              Each transaction gets a timestamp when it starts (older = smaller timestamp).
              When Ti requests a lock held by Tj:
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px' }}>
                <Para><strong style={{ color: 'var(--text)' }}>Ti is OLDER than Tj</strong> (Ti started first): Ti WAITS. An older transaction is allowed to wait for a younger one.</Para>
              </div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px' }}>
                <Para><strong style={{ color: 'var(--text)' }}>Ti is YOUNGER than Tj</strong>: Ti DIES (aborts and restarts with its original timestamp). A younger transaction never waits for an older one.</Para>
              </div>
            </div>
            <Para>Non-preemptive: the requesting transaction backs off voluntarily. Old transactions never die waiting for young ones.</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #f97316', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#f97316', marginBottom: 10 }}>Wound-Wait Scheme</div>
            <Para>
              When Ti requests a lock held by Tj:
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px' }}>
                <Para><strong style={{ color: 'var(--text)' }}>Ti is OLDER than Tj</strong>: Ti WOUNDS Tj (forces Tj to abort and restart). The older transaction preempts the younger one.</Para>
              </div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px' }}>
                <Para><strong style={{ color: 'var(--text)' }}>Ti is YOUNGER than Tj</strong>: Ti WAITS. A younger transaction waits for an older one to finish.</Para>
              </div>
            </div>
            <Para>Preemptive: the lock holder is forced to abort. Young transactions may wait but old ones always preempt.</Para>
          </div>
        </div>

        <Para>
          Both schemes prevent deadlocks because they establish a strict ordering on who
          waits for whom: in Wait-Die, only older transactions wait; in Wound-Wait,
          only younger transactions wait. Since waiting always follows the age ordering,
          cycles in the wait-for graph are impossible.
        </Para>

        <SubTitle>Deadlock Avoidance — The Practical Application Patterns</SubTitle>

        <CodeBox label="Preventing deadlocks in application code — the most practical approach">
{`-- THE #1 PRACTICAL DEADLOCK PREVENTION:
-- Always acquire locks in a consistent global order.

-- BAD: T1 and T2 acquire locks in different orders
-- T1: lock A then lock B
-- T2: lock B then lock A
-- → Deadlock possible (as shown above)

-- GOOD: Both transactions always lock in alphabetical/ID order
-- T1: lock A then lock B (A < B alphabetically)
-- T2: lock A then lock B (same order, even though T2 needs B first)
-- → Deadlock impossible with consistent ordering

-- In SQL: ensure JOINs and UPDATEs touch tables in consistent order

-- BAD (inconsistent order creates deadlock risk):
-- Transaction T1:
UPDATE orders SET status = 'processing' WHERE order_id = 1;   -- locks order 1
UPDATE payments SET status = 'captured' WHERE order_id = 1;  -- then locks payment 1

-- Transaction T2 (concurrent):
UPDATE payments SET status = 'refunding' WHERE order_id = 1; -- locks payment 1
UPDATE orders SET status = 'refunding' WHERE order_id = 1;   -- then locks order 1
-- → Classic deadlock: T1 holds order, wants payment. T2 holds payment, wants order.

-- GOOD: consistent order (always update orders before payments):
-- T1:
UPDATE orders  SET status = 'processing' WHERE order_id = 1;  -- lock order first
UPDATE payments SET status = 'captured'  WHERE order_id = 1; -- then payment

-- T2:
UPDATE orders  SET status = 'refunding'  WHERE order_id = 1;  -- lock order first
UPDATE payments SET status = 'refunding' WHERE order_id = 1; -- then payment
-- T2 will wait for T1 to release the order lock — but no deadlock.

-- ANOTHER PRACTICAL PATTERN: lock all needed rows at the START of the transaction
BEGIN;
-- Lock both rows immediately before doing any work
SELECT * FROM accounts WHERE account_id IN ('A', 'B') ORDER BY account_id FOR UPDATE;
-- ORDER BY ensures consistent lock ordering even for SET operations
-- Now safely update:
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'B';
COMMIT;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — TIMESTAMP-BASED PROTOCOLS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Timestamp Ordering" />
        <SectionTitle>Timestamp-Based Concurrency Control — Ordering Without Locks</SectionTitle>

        <Para>
          Timestamp ordering (TO) is a completely different approach to concurrency control
          that does not use locks at all. Instead, each transaction is assigned a unique
          <strong style={{ color: 'var(--accent)' }}> timestamp</strong> when it starts —
          typically the system clock value or a monotonically increasing counter.
          The protocol then validates every read and write against these timestamps to ensure
          that the execution is equivalent to a serial schedule ordered by the timestamps.
        </Para>

        <Para>
          Every data item X maintains two timestamps:
          <strong style={{ color: 'var(--accent)' }}> W-timestamp(X)</strong> — the timestamp
          of the last transaction that successfully wrote X, and
          <strong style={{ color: 'var(--accent)' }}> R-timestamp(X)</strong> — the timestamp
          of the last transaction that successfully read X.
        </Para>

        <SubTitle>The Basic Timestamp Ordering Protocol — Rules</SubTitle>

        <CodeBox label="Timestamp ordering rules — READ and WRITE validation">
{`// Every transaction Ti has timestamp TS(Ti).
// Each data item X has W-TS(X) and R-TS(X).
// Goal: ensure execution is equivalent to serial order by timestamp.

// ─────────────────────────────────────────────
// RULE FOR READ: Ti wants to read X
// ─────────────────────────────────────────────

if TS(Ti) < W-TS(X):
    // Ti is trying to read a value that was written by a YOUNGER transaction Tj.
    // This means Tj already "happened after" Ti in the logical timeline.
    // Allowing Ti to read X would be like reading a value from the future.
    REJECT — abort Ti and restart with a new (later) timestamp.
else:
    // Ti's timestamp is >= the last write timestamp — safe to read.
    Allow the read.
    R-TS(X) = max(R-TS(X), TS(Ti))  // update read timestamp

// ─────────────────────────────────────────────
// RULE FOR WRITE: Ti wants to write X
// ─────────────────────────────────────────────

if TS(Ti) < R-TS(X):
    // A younger transaction Tj already read X.
    // If Ti now writes X, Tj would have read a value it should not have seen.
    // The serial order says Ti should come before Tj, but Tj already read
    // the old value — contradiction. Cannot allow this write.
    REJECT — abort Ti and restart with a new timestamp.
elif TS(Ti) < W-TS(X):
    // A younger transaction Tj already wrote X.
    // Ti's write would be outdated — in serial order, Tj's write should win.
    // Apply Thomas's Write Rule: IGNORE (skip) this write — it is obsolete.
    // Do NOT abort — just skip the write. This is an optimisation.
    Ignore the write (Thomas's Write Rule).
else:
    // Safe to write.
    Write X.
    W-TS(X) = TS(Ti)

// KEY PROPERTIES:
// 1. No locks needed — no deadlocks possible (deadlocks require waiting; TO aborts instead)
// 2. Produces conflict-serializable schedules (equivalent to serial order by timestamp)
// 3. Starvation possible: an unlucky transaction may be repeatedly aborted and restarted
//    if it always conflicts with younger transactions. Addressed by aging (give long-waiting
//    transactions priority).`}
        </CodeBox>

        <CodeBox label="Timestamp ordering — worked example">
{`// Transactions: T1 (TS=1), T2 (TS=2), T3 (TS=3)
// Initial state: W-TS(A)=0, R-TS(A)=0, W-TS(B)=0, R-TS(B)=0

// Schedule (in execution order):
// 1. R1(A): TS(T1)=1, W-TS(A)=0. Is 1 < 0? NO. Allow. R-TS(A) = max(0,1) = 1
// 2. R2(A): TS(T2)=2, W-TS(A)=0. Is 2 < 0? NO. Allow. R-TS(A) = max(1,2) = 2
// 3. W1(A): TS(T1)=1, R-TS(A)=2. Is 1 < 2? YES → ABORT T1!
//           T1 tried to write A, but T2 (younger, TS=2) already read A.
//           Allowing T1's write would mean T2 should have seen T1's write
//           (since T1 logically comes before T2) but T2 already read the old value.
//           Contradiction → reject T1's write.

// T1 is aborted and will restart with a new timestamp TS(T1_new) = 4 (current time)
// T2 and T3 continue.

// ANALYSIS: This prevents the scenario where T2 reads a stale value of A
// that would be inconsistent with T1's write in the serial order T1→T2→T3.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — MVCC
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — MVCC" />
        <SectionTitle>Multiversion Concurrency Control (MVCC) — How PostgreSQL and Modern Databases Work</SectionTitle>

        <Para>
          Multiversion Concurrency Control (MVCC) is the concurrency control mechanism
          used by PostgreSQL, Oracle, MySQL InnoDB, and virtually every modern production
          database. It is the reason that in PostgreSQL, readers never block writers and
          writers never block readers — and it is worth understanding deeply because it
          directly affects how you design applications.
        </Para>

        <Para>
          The core insight of MVCC: instead of locking a row when it is being modified
          and forcing readers to wait, maintain multiple versions of each row simultaneously.
          A reader always reads the version that was current at the moment the reader's
          transaction started. A writer creates a new version without overwriting the
          existing one. Readers and writers operate on different versions — they never conflict.
        </Para>

        <SubTitle>How MVCC Works — Row Versions and Transaction Snapshots</SubTitle>

        <Para>
          In PostgreSQL's MVCC implementation, every row has two hidden system columns:
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> xmin</code> (the transaction ID that created this row version)
          and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>xmax</code> (the transaction ID that deleted/updated
          this row version, or 0 if the row is still current). When a transaction
          starts, it takes a <strong style={{ color: 'var(--accent)' }}>snapshot</strong> of
          which transactions are currently committed. It only sees row versions created
          by transactions that were committed before its snapshot was taken.
        </Para>

        <CodeBox label="MVCC internals — row versions and visibility rules">
{`-- PostgreSQL MVCC internals (using system columns)

-- Initial state: account balance = ₹5000
-- Row version 1: (account_id='A', balance=5000, xmin=100, xmax=0)
--   xmin=100: created by transaction 100
--   xmax=0: not yet deleted or updated

-- T1 (transaction ID 200) starts: "Transfer ₹500 from A"
BEGIN;  -- T1 takes a snapshot: sees all committed tx up to ~199
UPDATE accounts SET balance = 4500 WHERE account_id = 'A';

-- MVCC action: does NOT overwrite the existing row.
-- Instead, creates a NEW row version:
-- Row version 1: (account_id='A', balance=5000, xmin=100, xmax=200)
--   xmax=200: T1 has marked this version as superseded
-- Row version 2: (account_id='A', balance=4500, xmin=200, xmax=0)
--   xmin=200: created by T1
--   xmax=0: current version

-- T2 (transaction ID 201) starts at same time as T1 (before T1 commits):
BEGIN;  -- T2 takes a snapshot: sees all committed tx up to ~199
       -- T1 (tx 200) is NOT in T2's snapshot (T1 hasn't committed yet)
SELECT balance FROM accounts WHERE account_id = 'A';
-- T2 evaluates visibility:
-- Row version 2: xmin=200. Is tx 200 committed in T2's snapshot? NO (still running)
--   → Version 2 is INVISIBLE to T2
-- Row version 1: xmin=100, xmax=200. Is tx 100 committed? YES. Is tx 200 committed? NO
--   → The deletion (xmax=200) hasn't committed yet → Version 1 is VISIBLE to T2
-- T2 reads: balance = ₹5000  ← the pre-update value! T2 sees a consistent snapshot.

-- T1 commits:
COMMIT;
-- T1's changes become permanent. Tx 200 is now committed.

-- T3 starts after T1 commits:
BEGIN;  -- T3 snapshot: sees tx 200 as committed
SELECT balance FROM accounts WHERE account_id = 'A';
-- Row version 1: xmax=200, tx 200 is committed → Version 1 is DELETED from T3's view
-- Row version 2: xmin=200, tx 200 is committed → Version 2 IS VISIBLE to T3
-- T3 reads: balance = ₹4500  ← sees T1's committed update

-- KEY OBSERVATION:
-- T2 and T1 ran concurrently. T2 never waited for T1.
-- T2 read a consistent snapshot of the database as of T2's start time.
-- No locks were acquired for T2's read. No blocking occurred.
-- This is why "readers never block writers, writers never block readers" in MVCC.`}
        </CodeBox>

        <SubTitle>MVCC and Write Conflicts — Where Locking Still Applies</SubTitle>

        <Para>
          MVCC eliminates read-write conflicts — readers always get a consistent snapshot
          without waiting for writers. But <strong style={{ color: 'var(--accent)' }}>write-write conflicts</strong>
          still require locking even in MVCC systems. If two transactions both try to
          UPDATE the same row, the second one must wait for the first to commit or abort.
          PostgreSQL uses row-level locks for this specific case.
        </Para>

        <CodeBox label="MVCC write-write conflict — where locking still occurs">
{`-- Concurrent UPDATEs on the same row: locking still required

-- T1 (tx 200):
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE account_id = 'A';
-- T1 acquires X-lock on the row for account A (for write-write conflict prevention)
-- Creates new row version: (balance=4500, xmin=200, xmax=0)

-- T2 (tx 201): attempts to update the SAME row concurrently
BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE account_id = 'A';
-- T2 tries to acquire X-lock on account A's row
-- T1 holds that X-lock → T2 BLOCKS and waits

-- T1 commits:
COMMIT;
-- T1's X-lock released. T2's lock request granted.

-- T2 now executes its UPDATE:
-- T2 re-reads account A: sees T1's committed version (balance=4500)
-- T2 creates new version: (balance=4100, xmin=201, xmax=0)
-- The row previously written by T1 (xmax=0) gets xmax=201
COMMIT;
-- Final balance: ₹4100

-- SUMMARY OF MVCC BLOCKING BEHAVIOUR:
-- Read vs Read: NO BLOCKING (each reads their snapshot)
-- Read vs Write: NO BLOCKING (reader reads old version; writer creates new version)
-- Write vs Write (same row): BLOCKING (row-level X-lock required)
-- This is why MVCC dramatically improves read throughput in read-heavy workloads`}
        </CodeBox>

        <SubTitle>MVCC Garbage Collection — The VACUUM Problem</SubTitle>

        <Para>
          MVCC's storage of multiple row versions has a cost: old versions accumulate.
          Row version 1 in our example (balance=5000) still exists on disk even after
          T1 committed. It is invisible to all new transactions — but it takes up space.
          Over time, in a heavily updated table, the disk fills with dead row versions
          that no running transaction can see anymore.
        </Para>

        <Para>
          PostgreSQL uses a process called <strong style={{ color: 'var(--accent)' }}>VACUUM</strong>
          to clean up dead row versions. VACUUM scans tables, identifies row versions
          that are older than the oldest running transaction's snapshot, and marks them
          as free space. Without regular VACUUM, tables bloat with dead versions, query
          performance degrades, and PostgreSQL's transaction ID counter can wrap around
          (the dreaded "transaction ID wraparound" problem that requires emergency maintenance).
        </Para>

        <CodeBox label="VACUUM — keeping MVCC tables healthy">
{`-- Manual VACUUM: clean dead tuples from one table
VACUUM accounts;

-- VACUUM ANALYZE: clean + update statistics (run this regularly on busy tables)
VACUUM ANALYZE accounts;

-- VACUUM FULL: reclaim disk space by rewriting table (LOCKS table — use in maintenance)
VACUUM FULL accounts;

-- Check for table bloat — tables that need VACUUM:
SELECT
    schemaname,
    tablename,
    n_dead_tup                              AS dead_tuples,
    n_live_tup                              AS live_tuples,
    ROUND(n_dead_tup * 100.0
          / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY dead_pct DESC NULLS LAST;

-- AUTOVACUUM: PostgreSQL's background process that runs VACUUM automatically
-- Triggered when: dead tuples exceed 20% of live tuples (default threshold)
-- Check autovacuum settings:
SHOW autovacuum_vacuum_threshold;      -- minimum dead tuples before trigger (default: 50)
SHOW autovacuum_vacuum_scale_factor;   -- percentage of table size (default: 0.2 = 20%)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — LOCK GRANULARITY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Lock Granularity" />
        <SectionTitle>Lock Granularity — Choosing What Level to Lock</SectionTitle>

        <Para>
          Locks can be acquired at different levels of granularity. The choice of
          granularity involves a direct trade-off:
          <strong style={{ color: 'var(--accent)' }}> coarser granularity</strong>
          (locking more data at once) reduces the overhead of managing many individual
          locks but reduces concurrency — more transactions are blocked.
          <strong style={{ color: 'var(--accent)' }}> Finer granularity</strong>
          (locking individual rows) maximises concurrency — only the exact rows
          being modified are locked — but the overhead of tracking thousands of
          individual row locks can itself become a performance bottleneck.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          {[
            { level: 'Database', color: '#ff4757', example: 'LOCK DATABASE orders_db', concurrent: 'None', use: 'Schema migrations, full backup. Extremely rare in applications.' },
            { level: 'Table', color: '#f97316', example: 'LOCK TABLE orders IN EXCLUSIVE MODE', concurrent: 'No other transaction can access the table', use: 'Bulk data loads, DDL operations (ALTER TABLE). Avoid in normal transaction flow.' },
            { level: 'Page', color: '#facc15', example: 'Internal — not directly controllable in PostgreSQL', concurrent: 'Other transactions access rows on different pages', use: 'Managed internally by DBMS. Not exposed to application developers in most databases.' },
            { level: 'Row', color: 'var(--accent)', example: 'SELECT ... FOR UPDATE', concurrent: 'Other transactions access different rows freely', use: 'The standard choice for most application transactions. Fine-grained, high concurrency.' },
          ].map((item, i) => (
            <div key={item.level} style={{ display: 'flex', gap: 0, borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ background: `${item.color}10`, borderRight: '1px solid var(--border)', padding: '16px 14px', minWidth: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: item.color, textAlign: 'center' }}>{item.level}</span>
              </div>
              <div style={{ padding: '16px 20px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: item.color, marginBottom: 8 }}>{item.example}</div>
                <Para><strong style={{ color: 'var(--text)' }}>Concurrent access:</strong> {item.concurrent}</Para>
                <Para><strong style={{ color: 'var(--text)' }}>When to use:</strong> {item.use}</Para>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>Intention Locks — Enabling Multi-Level Lock Protocols</SubTitle>

        <Para>
          When a transaction wants to lock a row, how does the DBMS efficiently check
          whether any other transaction holds a conflicting table-level lock?
          Checking every row in a table to see if any row is locked would be
          prohibitively expensive. Intention locks solve this efficiently.
        </Para>

        <Para>
          An <strong style={{ color: 'var(--accent)' }}>intention lock</strong> on a table
          signals that the transaction intends to acquire locks on rows within that table.
          Before acquiring a row-level lock, the transaction first acquires an intention
          lock on the table. Checking for conflicts at the table level is now O(1) —
          just check if any incompatible intention lock is held on the table.
        </Para>

        <CodeBox label="Intention locks — IS, IX, SIX">
{`// LOCK TYPES with intention locks:
// S   = Shared lock on the table (reading the whole table)
// X   = Exclusive lock on the table (modifying the whole table)
// IS  = Intention-Shared: intend to acquire S-locks on rows
// IX  = Intention-Exclusive: intend to acquire X-locks on rows
// SIX = Shared + Intention-Exclusive: S on table, but will X-lock some rows

// COMPATIBILITY MATRIX (IS/IX/SIX):
//       IS    IX    S     SIX   X
// IS  [ ✓  ] [ ✓ ] [ ✓ ] [ ✓ ] [ ✗ ]
// IX  [ ✓  ] [ ✓ ] [ ✗ ] [ ✗ ] [ ✗ ]
// S   [ ✓  ] [ ✗ ] [ ✓ ] [ ✗ ] [ ✗ ]
// SIX [ ✓  ] [ ✗ ] [ ✗ ] [ ✗ ] [ ✗ ]
// X   [ ✗  ] [ ✗ ] [ ✗ ] [ ✗ ] [ ✗ ]

// TYPICAL SEQUENCE:
// Transaction wants to update row R in table T:
// 1. Acquire IX lock on table T (intention to X-lock rows within T)
// 2. Acquire X lock on row R

// If another transaction tries to LOCK TABLE T IN SHARE MODE (full table S-lock):
// It tries to acquire S on T. IX and S are incompatible → BLOCKED.
// This correctly prevents the full-table reader from running while rows are being modified.

// POSTGRESQL lock types you'll see in pg_locks:
-- RowShareLock    = IS lock (SELECT FOR SHARE)
-- RowExclusiveLock = IX lock (INSERT, UPDATE, DELETE, SELECT FOR UPDATE)
-- ShareLock        = S lock (CREATE INDEX without CONCURRENTLY)
-- ShareRowExclusiveLock = SIX
-- ExclusiveLock    = exclusive table lock
-- AccessExclusiveLock  = full exclusive (ALTER TABLE, DROP TABLE)

-- View current locks:
SELECT pid, locktype, relation::regclass, mode, granted
FROM pg_locks l
JOIN pg_class c ON l.relation = c.oid
ORDER BY pid, relation;`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Flash Sale — Preventing Overselling With Concurrency Control</SectionTitle>

        <Para>
          Every major Indian e-commerce company faces this problem during sales events.
          Understanding it completely requires every concept from this module.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Flipkart Big Billion Days — 1 iPhone left, 500 people checking out simultaneously
          </div>

          <SubSubTitle>Approach 1 — No Concurrency Control (WRONG)</SubSubTitle>
          <CodeBox>
{`-- 500 concurrent transactions all execute this simultaneously:
BEGIN;
SELECT stock FROM inventory WHERE product_id = 'IPHONE15';
-- All 500 read: stock = 1 (available!)
-- All 500 decide: "I can purchase this"
UPDATE inventory SET stock = stock - 1 WHERE product_id = 'IPHONE15';
-- All 500 set stock = 1 - 1 = 0  (reading initial value 1, subtracting 1)
-- Actually: last writer wins → stock = 0 after all 500 commit
-- But: 500 orders created, 500 payments charged
-- RESULT: Flipkart owes 499 iPhones it doesn't have.`}
          </CodeBox>

          <SubSubTitle>Approach 2 — Optimistic with Check-and-Set (PARTIAL FIX)</SubSubTitle>
          <CodeBox>
{`-- Use the stock value as an optimistic lock condition:
BEGIN;
SELECT stock FROM inventory WHERE product_id = 'IPHONE15';
-- Read stock = 1
UPDATE inventory
SET stock = stock - 1
WHERE product_id = 'IPHONE15' AND stock >= 1;  -- conditional update
-- If stock is still >= 1: update succeeds, affected_rows = 1
-- If stock already = 0: update fails, affected_rows = 0
-- Application checks affected_rows. If 0: ROLLBACK, "out of stock"

-- PROBLEM: Race condition still exists.
-- T1 reads stock=1, T2 reads stock=1 (both pass the check)
-- T1 executes UPDATE: stock = 0, affected_rows = 1, commits
-- T2 executes UPDATE: stock already 0, WHERE stock >= 1 fails, affected_rows = 0
-- T2 rolls back correctly.
-- RESULT: Only one sale completes ✓

-- But: this is a lost update pattern — works but relies on the WHERE clause
-- to catch the race. Not reliable for all scenarios.`}
          </CodeBox>

          <SubSubTitle>Approach 3 — SELECT FOR UPDATE (CORRECT AND RECOMMENDED)</SubSubTitle>
          <CodeBox>
{`-- Serialise access to the inventory row using pessimistic locking:
BEGIN;

-- Acquire X-lock on the specific iPhone row BEFORE reading
SELECT stock FROM inventory
WHERE product_id = 'IPHONE15'
FOR UPDATE;
-- This is the crucial line.
-- The FIRST transaction to reach this acquires the X-lock.
-- All other 499 transactions BLOCK here, waiting for the lock.
-- No deadlock possible (only one row, all transactions want the same one — 
-- they queue up, not circular).

-- Only the lock holder continues:
IF stock >= 1:
    UPDATE inventory SET stock = stock - 1 WHERE product_id = 'IPHONE15';
    INSERT INTO orders (...) VALUES (...);
    COMMIT;  -- X-lock released. Next queued transaction gets the lock.
ELSE:
    -- stock = 0: someone else got the last one
    ROLLBACK;  -- return "out of stock" to this customer

-- RESULT:
-- 500 transactions queue on the FOR UPDATE lock
-- Transaction 1: reads stock=1, decrements to 0, commits
-- Transaction 2: reads stock=0, rolls back → "out of stock"
-- Transactions 3-500: reads stock=0, all roll back → "out of stock"
-- Exactly 1 iPhone sold. No overselling. Correct.

-- TRADE-OFF: 499 transactions are serialised through one lock.
-- At extreme scale, this creates a bottleneck.
-- For truly massive inventory, use:
-- 1. Distributed queue (Redis SETNX for atomic claim)
-- 2. Database-level atomic decrement with floor check:
UPDATE inventory
SET stock = GREATEST(stock - 1, 0),
    sold  = sold + CASE WHEN stock > 0 THEN 1 ELSE 0 END
WHERE product_id = 'IPHONE15'
RETURNING sold;  -- if sold increased: purchase succeeded; else: out of stock`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 10 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>Concurrency Control Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is the difference between conflict serializability and view serializability?',
              color: '#0078d4',
              a: 'A schedule is conflict-serializable if it can be transformed into a serial schedule by swapping non-conflicting adjacent operations. It is tested using the precedence graph — acyclic graph = conflict-serializable. A schedule is view-serializable if it is view-equivalent to some serial schedule — meaning the same initial reads, same updated reads, and same final writes as that serial schedule. Every conflict-serializable schedule is also view-serializable. But there exist view-serializable schedules that are not conflict-serializable — specifically those with blind writes (writes whose value is immediately overwritten, so the write is never read). Conflict serializability is a sufficient but not necessary condition for view serializability. In practice, databases test for conflict serializability because it is efficiently checkable (O(n²)) while view serializability testing is NP-complete.',
            },
            {
              q: 'Explain Two-Phase Locking and why it guarantees serializability.',
              color: 'var(--accent)',
              a: '2PL requires every transaction to go through two phases: a growing phase where it acquires locks but releases none, and a shrinking phase where it releases locks but acquires none. Once the first lock is released, no new locks can be acquired for the rest of the transaction. The reason 2PL guarantees conflict serializability: the lock point (moment of maximum lock set) defines a total ordering on transactions. The precedence graph of any 2PL schedule is acyclic because if Ti holds a lock that Tj is waiting for, Ti\'s lock point comes before Tj\'s lock point, and this ordering is transitive and cycle-free. Variants: Strict 2PL holds X-locks until commit (prevents cascading aborts). Rigorous 2PL holds all locks until commit. Conservative 2PL acquires all locks before starting (prevents deadlocks but impractical).',
            },
            {
              q: 'What is a deadlock and how do databases handle it?',
              color: '#f97316',
              a: 'A deadlock occurs when two or more transactions each hold a lock that another needs, creating a circular wait where no transaction can proceed. It is detected using a wait-for graph — a cycle in the graph indicates a deadlock. Databases handle deadlocks by: (1) Detection: periodically building the wait-for graph and running cycle detection. When a cycle is found, a victim transaction is selected (typically the one with the least work done or lowest cost to rollback) and aborted. The aborted transaction releases its locks, breaking the cycle. The application must detect the "deadlock detected" error and retry the transaction. (2) Prevention: timestamp-based schemes like Wait-Die (older waits, younger aborts) or Wound-Wait (older preempts, younger waits) prevent deadlocks by eliminating circular waits. (3) Avoidance in application code: always acquire locks in a consistent global order to eliminate the circular dependency that causes deadlocks.',
            },
            {
              q: 'How does MVCC work and why does it improve performance?',
              color: '#8b5cf6',
              a: 'MVCC maintains multiple versions of each row. When a transaction updates a row, instead of overwriting the existing row, a new row version is created. Each row version has timestamps (xmin: transaction that created it, xmax: transaction that superseded it). When a transaction reads, it takes a snapshot of which transactions were committed when it started, and only sees row versions visible at that snapshot time. This allows readers to see a consistent view of the database without waiting for writers — readers use older versions while writers create new ones. Readers never block writers and writers never block readers because they operate on different versions. Performance improvement comes from this elimination of read-write conflicts: in high read-to-write workload systems (typical of most web applications), reads are never blocked. The cost is storage space for multiple row versions and the need for periodic garbage collection (VACUUM in PostgreSQL) to remove dead versions that no active transaction can see.',
            },
            {
              q: 'A schedule is given. How do you determine if it is conflict-serializable?',
              color: '#facc15',
              a: 'The systematic procedure: (1) Identify all operations — R(X) and W(X) for each transaction. (2) Find all conflicting pairs: two operations from DIFFERENT transactions on the SAME data item where at least one is a WRITE. (3) Build the precedence graph: one node per transaction. For each conflicting pair where Op_i from Ti appears before Op_j from Tj in the schedule, draw edge Ti → Tj. (4) Check for cycles using DFS or topological sort. If the graph is acyclic (a DAG), the schedule is conflict-serializable. The topological sort of the DAG gives the equivalent serial order. If the graph has a cycle, the schedule is NOT conflict-serializable. Example: if Ti → Tj and Tj → Ti both exist, there is a cycle — Ti must come before Tj AND Tj must come before Ti, which is impossible for a serial schedule.',
            },
            {
              q: 'What is the difference between pessimistic and optimistic concurrency control?',
              color: '#e879f9',
              a: 'Pessimistic concurrency control assumes conflicts are likely and prevents them by acquiring locks before accessing data. A transaction that needs a resource locks it first — other transactions wait or are rejected. Two-Phase Locking is the classic pessimistic protocol. Pessimistic approaches have higher overhead for non-conflicting workloads (unnecessary locking when conflicts are rare) but avoid wasted work on conflict detection — conflicting transactions simply wait rather than executing and then being rejected. Optimistic concurrency control assumes conflicts are rare and allows transactions to proceed without locking. At commit time, the transaction validates that no conflicts occurred during its execution — it checks whether any data it read was modified by another committed transaction. If a conflict is detected, the transaction is aborted and retried. Optimistic approaches have zero overhead for reads (no locks acquired) but waste work when validation fails. Use pessimistic control for high-contention data (limited inventory, financial accounts). Use optimistic control for low-contention data (user profile updates, blog post edits) where conflicts are genuinely rare.',
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
        'A schedule is serializable if its outcome equals some serial execution of the same transactions. Conflict serializability (testable in O(n²) via precedence graph) is the standard correctness criterion. View serializability is broader but NP-complete to test.',
        'Two operations conflict if they are from different transactions, access the same data item, and at least one is a WRITE. Two reads never conflict. Conflict pairs create edges in the precedence graph.',
        'Precedence graph test: draw one node per transaction, add directed edge Ti→Tj for each conflict where Ti\'s operation precedes Tj\'s. If the graph is acyclic → conflict-serializable. If it has a cycle → not conflict-serializable.',
        'Shared lock (S/read lock): compatible with other S-locks, incompatible with X-locks. Exclusive lock (X/write lock): incompatible with everything including other X-locks and S-locks. A transaction must acquire the appropriate lock before any read or write operation.',
        'Two-Phase Locking: growing phase (acquire locks, release none) then shrinking phase (release locks, acquire none). Any schedule produced by 2PL transactions is conflict-serializable. Strict 2PL holds X-locks until commit — the standard in production databases.',
        'Deadlock: circular wait — Ti holds lock A wanting B, Tj holds lock B wanting A. Detected via wait-for graph cycle detection. Resolved by aborting a victim transaction. Prevented in application code by always acquiring locks in a consistent global order.',
        'Wait-Die: older transaction waits, younger aborts. Wound-Wait: older wounds (aborts) younger, younger waits. Both prevent deadlocks by preventing circular waits. Neither requires lock detection overhead.',
        'MVCC: every update creates a new row version instead of overwriting. Each transaction sees a consistent snapshot based on its start time. Readers never block writers. Writers never block readers. Write-write conflicts on the same row still require a row-level X-lock.',
        'MVCC in PostgreSQL uses xmin/xmax on each row. A row version is visible to a transaction if xmin is committed and xmax is not committed (or 0). Old row versions accumulate and must be cleaned by VACUUM. Without regular VACUUM, tables bloat with dead versions.',
        'Lock granularity trade-off: coarser granularity (table locks) = low overhead, low concurrency. Finer granularity (row locks) = high overhead, high concurrency. Intention locks (IS, IX, SIX) allow efficient multi-level locking without checking every individual row for compatibility.',
      ]} />

    </LearnLayout>
  )
}