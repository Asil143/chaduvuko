import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Crash Recovery — Complete Guide | DBMS | Chaduvuko',
  description:
    'How databases survive failures — failure classification, write-ahead logging, ARIES recovery algorithm, checkpoint mechanisms, UNDO and REDO phases, shadow paging, and every exam and interview pattern with complete worked examples.',
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

export default function CrashRecovery() {
  return (
    <LearnLayout
      title="Crash Recovery"
      description="How a database restores itself to a consistent state after a failure — the theory of what can go wrong, the write-ahead log that makes recovery possible, and the ARIES algorithm that every major database uses."
      section="DBMS"
      readTime="85–100 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — FAILURE CLASSIFICATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — What Can Go Wrong" />
        <SectionTitle>Failure Classification — Every Way a Database Can Fail</SectionTitle>

        <Para>
          Crash recovery is the mechanism that makes the Durability and Atomicity guarantees
          of ACID real in the presence of failures. Without it, a committed transaction
          might be lost when the server crashes, and a half-executed transaction might
          leave the database in an inconsistent state forever.
          To build recovery, you must first precisely classify what kinds of failures exist —
          because different failure types require different recovery strategies.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              type: 'Transaction Failure',
              color: '#f97316',
              icon: '01',
              causes: 'Logical error in the transaction (divide by zero, constraint violation, deadlock), or explicit application-level ROLLBACK.',
              scope: 'Affects only the failing transaction. All other transactions continue normally.',
              recovery: 'UNDO the partial work of the failed transaction. Roll back all changes made since BEGIN. The DBMS handles this automatically using the log.',
              persistence: 'RAM and disk are both intact. Only in-progress transaction state needs cleanup.',
              example: 'A bank transfer where the debit succeeds but the credit fails a NOT NULL constraint. The debit must be undone.',
            },
            {
              type: 'System Failure (Soft Crash)',
              color: '#ff4757',
              icon: '02',
              causes: 'OS crash, power failure, DBMS process kill, hardware fault that crashes the system without damaging disk. The server restarts and disk is intact.',
              scope: 'Affects ALL active transactions at the time of crash. Buffer pool contents (RAM) are lost. Disk contents (data pages + WAL) survive.',
              recovery: 'On restart: REDO all committed transactions whose data pages were not yet flushed to disk. UNDO all transactions that were active (uncommitted) at crash time.',
              persistence: 'Disk intact. RAM lost. WAL on disk is the source of truth for recovery.',
              example: 'Power outage while 50 transactions are in-flight. Some committed just before the crash (their WAL records are on disk but data pages may not be). Others were mid-execution.',
            },
            {
              type: 'Media Failure (Hard Crash)',
              color: '#8b5cf6',
              icon: '03',
              causes: 'Disk head crash, storage corruption, hardware failure that destroys disk contents. Both RAM and disk contents are lost.',
              scope: 'Catastrophic — all data on the failed disk is gone. Recovery requires a backup plus WAL replay from the point of the last backup.',
              recovery: 'Restore from most recent backup. Then replay all WAL records from the backup point to the time of failure. This is point-in-time recovery (PITR).',
              persistence: 'Disk lost. Requires off-disk backup (replication, snapshot, backup to separate storage).',
              example: 'SSD failure on the primary database server. The entire data directory is gone. Restore yesterday\'s backup, replay 23 hours of WAL from the WAL archive.',
            },
            {
              type: 'Network Partition / Byzantine Failure',
              color: '#facc15',
              icon: '04',
              causes: 'Network split separating database nodes, silent data corruption (bit rot), faulty hardware writing wrong values, software bugs causing incorrect state.',
              scope: 'Distributed systems only. Part of the cluster is unreachable or produces incorrect results.',
              recovery: 'Handled by distributed consensus protocols (Raft, Paxos), checksums and CRC verification, replication with majority quorums. Beyond single-node crash recovery.',
              persistence: 'Disk may be intact but network unreachable, or data may be silently corrupted.',
              example: 'A network switch fails, splitting a 3-node PostgreSQL streaming replication cluster into a primary with 1 follower and an isolated follower.',
            },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 5, padding: '3px 10px' }}>{item.icon}</span>
                  <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>{item.type}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10 }}>
                  {[
                    ['Causes', item.causes],
                    ['Scope', item.scope],
                    ['Recovery Strategy', item.recovery],
                    ['What Survives', item.persistence],
                    ['Real Example', item.example],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
                      <Para>{value}</Para>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>The Core Recovery Challenge — The Gap Between RAM and Disk</SubTitle>

        <Para>
          The fundamental challenge of crash recovery arises from the buffer pool.
          The database reads pages from disk into RAM (the buffer pool) and modifies
          them in RAM for performance. Those modified pages are written back to disk
          lazily — not immediately after every change, because disk writes are slow
          and batching them improves throughput dramatically.
        </Para>

        <Para>
          This creates a dangerous gap: a transaction can commit (the application receives
          confirmation) while its data pages are still only in RAM, not yet on disk.
          If the server crashes between commit and disk write, that committed data is lost —
          violating Durability. This is the problem that Write-Ahead Logging solves.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 24, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto' }}>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>// The dangerous gap — what can happen without recovery mechanisms</div>
          <div><span style={{ color: 'var(--accent)' }}>t=1:</span> <span style={{ color: 'var(--text2)' }}>T1 updates page P1 in buffer pool (P1 is now "dirty")</span></div>
          <div><span style={{ color: 'var(--accent)' }}>t=2:</span> <span style={{ color: 'var(--text2)' }}>T1 updates page P2 in buffer pool (P2 is now "dirty")</span></div>
          <div><span style={{ color: 'var(--accent)' }}>t=3:</span> <span style={{ color: 'var(--text2)' }}>T1 issues COMMIT — application receives "OK"</span></div>
          <div><span style={{ color: '#ff4757' }}>t=4:</span> <span style={{ color: '#ff4757' }}>SERVER CRASHES — P1 and P2 never written to disk</span></div>
          <div><span style={{ color: '#ff4757' }}>t=5:</span> <span style={{ color: '#ff4757' }}>Restart: P1 and P2 on disk still have OLD values — T1 is LOST</span></div>
          <div style={{ marginTop: 8, color: 'var(--muted)' }}>
            // ALSO dangerous in the other direction:<br />
            // T2 updates P3 in buffer pool but has NOT committed<br />
            // Buffer pool evicts P3 to disk (to make room for another page)<br />
            // T2 crashes — P3 on disk has T2's UNCOMMITTED changes (must UNDO)
          </div>
        </div>

        <Para>
          This reveals two distinct problems. The
          <strong style={{ color: 'var(--accent)' }}> steal problem</strong>: can a dirty
          page from an uncommitted transaction be evicted (stolen) to disk to free buffer
          pool space? If yes, and the transaction later aborts, those uncommitted changes
          are on disk and must be undone. The
          <strong style={{ color: 'var(--accent)' }}> force problem</strong>: must all dirty
          pages of a committing transaction be flushed to disk before the commit is
          acknowledged? If yes, Durability is guaranteed but performance is terrible
          (every commit triggers disk writes). If no, fast commits but risk of loss.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {[
            {
              policy: 'STEAL / NO-FORCE',
              color: 'var(--accent)',
              label: 'The Production Choice',
              desc: 'STEAL: dirty pages CAN be evicted before commit (good for performance — buffer pool can always make room). NO-FORCE: dirty pages do NOT need to be flushed at commit time (good for performance — commits are fast). This is what every major production database uses. Enables high performance at the cost of needing a sophisticated recovery mechanism (WAL + ARIES).',
            },
            {
              policy: 'NO-STEAL / FORCE',
              color: '#f97316',
              label: 'Theoretically Simple',
              desc: 'NO-STEAL: dirty pages cannot be evicted until the transaction commits. FORCE: all dirty pages must be flushed to disk before commit is acknowledged. Simple recovery: on restart, all committed transactions are on disk (force), uncommitted transactions never made it to disk (no-steal). Terrible performance: commits are slow (many disk writes), buffer pool may fill up and block new transactions. Not used in production.',
            },
          ].map((item) => (
            <div key={item.policy} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '18px' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.policy}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 7px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{item.label}</span>
              </div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 2 — WRITE-AHEAD LOGGING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Write-Ahead Logging" />
        <SectionTitle>Write-Ahead Logging (WAL) — The Foundation of All Database Recovery</SectionTitle>

        <Para>
          Write-Ahead Logging is the mechanism that makes STEAL/NO-FORCE safe.
          The core rule, stated precisely:
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The WAL Rule — Two Absolute Requirements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: 'var(--accent)', flexShrink: 0 }}>1</span>
              <Para><strong style={{ color: 'var(--text)' }}>Before a dirty page is written to disk (STEAL):</strong> the log record describing that change must already be durably on disk. This enables UNDO — if the transaction later aborts, the log has the old value to restore.</Para>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: 'var(--accent)', flexShrink: 0 }}>2</span>
              <Para><strong style={{ color: 'var(--text)' }}>Before a transaction is allowed to COMMIT:</strong> all log records for that transaction (including the commit record) must be durably on disk. This enables REDO — if the system crashes after commit, the log has enough information to redo all changes even if the data pages weren't flushed.</Para>
            </div>
          </div>
        </div>

        <Para>
          Note carefully what WAL does and does not require. It requires the
          <strong style={{ color: 'var(--accent)' }}> log</strong> to be on disk before
          commit — not the data pages. Writing the sequential log is fast (sequential I/O,
          small records). Writing modified data pages is slow (random I/O, large pages).
          WAL converts the commit cost from "flush all dirty data pages" to "flush the
          log record" — a much smaller, sequentially written piece of data.
        </Para>

        <SubTitle>The WAL Log Record Format — What Is Written and When</SubTitle>

        <CodeBox label="WAL log record structure — every field and its purpose">
{`// EACH LOG RECORD contains:
// LSN (Log Sequence Number): a monotonically increasing unique identifier for this record
//   - Used to determine ordering of log records
//   - Each page in the buffer pool stores the LSN of the most recent log record
//     that modified it (pageLSN)
// TransactionID: which transaction performed this operation
// Type: BEGIN, UPDATE, COMMIT, ABORT, CHECKPOINT, COMPENSATION (CLR)
// PageID: which database page was modified (for UPDATE records)
// Offset: byte offset within the page where the modification starts
// Before Image (UNDO info): the value BEFORE the modification (for UNDO)
// After Image (REDO info): the value AFTER the modification (for REDO)
// PrevLSN: the LSN of the previous log record for this same transaction
//   - Forms a backward-linked list of all records for one transaction
//   - Used during UNDO to find the previous action for this transaction

// EXAMPLE LOG SEQUENCE:
// LSN  | TxnID | Type   | PageID | Before      | After       | PrevLSN
// -----+-------+--------+--------+-------------+-------------+--------
// 1000 | T1    | BEGIN  | -      | -           | -           | NULL
// 1010 | T1    | UPDATE | P5     | balance=5000| balance=4500| 1000
// 1020 | T2    | BEGIN  | -      | -           | -           | NULL
// 1030 | T2    | UPDATE | P7     | balance=2000| balance=2500| 1020
// 1040 | T1    | UPDATE | P6     | qty=100     | qty=99      | 1010
// 1050 | T1    | COMMIT | -      | -           | -           | 1040
// 1060 | T2    | UPDATE | P8     | price=280   | price=300   | 1030
// 1070 | SERVER CRASHES HERE
// T1 is committed (LSN 1050 is in log)
// T2 is active (no COMMIT record)

// ON RESTART:
// Recovery reads the log from the last checkpoint
// REDO: replay LSN 1010 (T1 update P5) — bring P5 to balance=4500
//       replay LSN 1030 (T2 update P7) — bring P7 to balance=2500
//       replay LSN 1040 (T1 update P6) — bring P6 to qty=99
//       skip LSN 1050 (T1 COMMIT) — no data change
//       replay LSN 1060 (T2 update P8) — bring P8 to price=300
// UNDO: T2 has no COMMIT → undo all T2 changes in REVERSE order
//       undo LSN 1060: restore P8.price from 300 → 280
//       undo LSN 1030: restore P7.balance from 2500 → 2000
// FINAL STATE: T1 committed correctly, T2 fully rolled back ✓`}
        </CodeBox>

        <SubTitle>Log Sequence Numbers (LSNs) — The Ordering Mechanism</SubTitle>

        <Para>
          The LSN is the spine of the entire recovery system. Every log record has a
          unique LSN that increases monotonically. Every database page stores the
          LSN of the most recent log record that modified it (called
          <strong style={{ color: 'var(--accent)' }}> pageLSN</strong>). During REDO,
          the recovery system compares the log record's LSN against the page's pageLSN
          to determine whether the change is already reflected in the page (if the
          page's pageLSN ≥ log record's LSN, the change is already there — skip it).
          This idempotency property means REDO can safely replay the same log record
          multiple times without causing errors.
        </Para>

        <CodeBox label="LSN and pageLSN — the skip-already-done check during REDO">
{`// REDO RULE for each log record with LSN = L and PageID = P:
//   IF page[P].pageLSN >= L:
//       SKIP — this change is already reflected in page P on disk
//   ELSE:
//       APPLY the change — write the after-image to page P
//       Set page[P].pageLSN = L

// WHY THIS IS SAFE AND NECESSARY:
// Consider: T1 commits at LSN 1050. Page P5 is eventually flushed to disk.
// The flush writes pageLSN=1010 into the page header on disk.
// Server crashes. Recovery starts.
// Log record LSN=1010 says: update P5 balance from 5000 to 4500.
// Check: pageLSN of P5 on disk = 1010 >= 1010 → SKIP
// The change is already on disk. No need to redo it.

// Now consider: T1 commits at LSN 1050. Page P6 was NEVER flushed to disk.
// pageLSN of P6 on disk = 0 (old value, pre-T1).
// Log record LSN=1040 says: update P6 qty from 100 to 99.
// Check: pageLSN of P6 on disk = 0 < 1040 → APPLY
// Write qty=99 to P6. Set pageLSN=1040.
// The change is now reflected on disk.

// IDEMPOTENCY: if recovery crashes mid-way and restarts again,
// it will re-read the same log records and re-check pageLSN.
// Records already applied have pageLSN ≥ their LSN → skip.
// Recovery is safe to run multiple times — converges to correct state.

// IN POSTGRESQL:
-- Check WAL configuration:
SHOW wal_level;              -- minimal, replica, logical
SHOW wal_buffers;            -- WAL buffer size in memory before flush
SHOW synchronous_commit;     -- when WAL is flushed relative to COMMIT
SHOW wal_writer_delay;       -- how often background WAL writer flushes
-- View current WAL LSN:
SELECT pg_current_wal_lsn();
-- View WAL file location:
SELECT pg_walfile_name(pg_current_wal_lsn());`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — CHECKPOINTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Checkpoints" />
        <SectionTitle>Checkpoints — Bounding How Much Log Must Be Replayed</SectionTitle>

        <Para>
          If the WAL log grows indefinitely and the system crashes, recovery must
          replay the entire log from the very beginning — which could be months or
          years of history for a long-running system. This is impractical.
          Checkpoints limit how far back recovery must go.
        </Para>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>checkpoint</strong> is a periodic
          operation that writes all currently dirty buffer pool pages to disk and records
          a checkpoint record in the WAL. After a checkpoint, recovery only needs to
          replay WAL records from the most recent checkpoint — because everything before
          the checkpoint is guaranteed to be on disk already.
        </Para>

        <SubTitle>Simple Checkpoint vs Fuzzy Checkpoint</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #f97316', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 10 }}>Simple (Sharp) Checkpoint</div>
            <Para>Stop all transaction processing. Flush all dirty pages to disk. Write a CHECKPOINT record to the log. Resume processing.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Problem:</strong> Pauses the entire database while dirty pages are flushed. For a busy system with thousands of dirty pages, this pause can last seconds — unacceptable for production OLTP.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Recovery benefit:</strong> After restart, recovery only needs to replay from the checkpoint. All dirty pages are guaranteed on disk at the checkpoint moment.</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>Fuzzy Checkpoint (Production Standard)</div>
            <Para>Write BEGIN_CHECKPOINT to log. Record which pages are currently dirty (the dirty page table) and which transactions are active. Continue processing — do NOT stop. Gradually flush dirty pages in the background. When all dirty pages noted at BEGIN_CHECKPOINT are flushed, write END_CHECKPOINT to log.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Advantage:</strong> Zero pause for ongoing transactions. Checkpointing happens concurrently with normal processing.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Recovery complexity:</strong> Recovery must account for pages modified after BEGIN_CHECKPOINT but before END_CHECKPOINT. This is what the ARIES algorithm handles.</Para>
          </div>
        </div>

        <CodeBox label="Checkpoint record contents — what is saved and why">
{`// CHECKPOINT LOG RECORD contains:
// 1. Transaction Table (ATT — Active Transaction Table):
//    List of all transactions active at checkpoint time
//    For each active transaction:
//      - TransactionID
//      - Status (running, committed but not yet flushed)
//      - lastLSN: the LSN of the most recent log record for this transaction
//    Purpose: during recovery, these are the transactions that MIGHT need UNDO

// 2. Dirty Page Table (DPT):
//    List of all pages currently in buffer pool that are dirty
//    For each dirty page:
//      - PageID
//      - recLSN: the LSN of the FIRST log record that made this page dirty
//                (the minimum LSN we need to replay to bring this page up to date)
//    Purpose: tells recovery the earliest point in the log it needs to start REDO from

// EXAMPLE CHECKPOINT RECORD:
// BEGIN_CHECKPOINT at LSN 2000
// ATT = {T2: lastLSN=1060, T3: lastLSN=1900}  (T1 already committed)
// DPT = {P5: recLSN=1010, P7: recLSN=1030, P8: recLSN=1060, P9: recLSN=1800}
// END_CHECKPOINT at LSN 2010

// MEANING:
// recLSN of P5 = 1010: to bring P5 to current state, replay from LSN 1010
// The earliest recLSN across all dirty pages = 1010 = "redo_lsn"
// Recovery only needs to replay from LSN 1010 onwards
// All log records before LSN 1010 are irrelevant — their pages are on disk

// POSTGRESQL CHECKPOINT:
-- Force a checkpoint:
CHECKPOINT;

-- Monitor checkpoint activity:
SELECT checkpoints_timed, checkpoints_req, buffers_checkpoint,
       checkpoint_write_time, checkpoint_sync_time
FROM pg_stat_bgwriter;

-- Configuration:
SHOW checkpoint_timeout;          -- max time between checkpoints (default: 5min)
SHOW max_wal_size;                -- trigger checkpoint if WAL exceeds this (default: 1GB)
SHOW checkpoint_completion_target; -- spread writes over this fraction of interval (default: 0.9)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — ARIES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — ARIES" />
        <SectionTitle>ARIES — The Recovery Algorithm Used by Every Major Database</SectionTitle>

        <Para>
          ARIES (Algorithm for Recovery and Isolation Exploiting Semantics) was published
          by Mohan, Haderle, Lindsay, Pirahesh, and Schwarz at IBM Research in 1992.
          It is the algorithm underlying recovery in IBM DB2, Microsoft SQL Server,
          PostgreSQL (influenced by it), Oracle, and most other production relational
          databases. Understanding ARIES precisely is understanding how real database
          recovery actually works.
        </Para>

        <Para>
          ARIES makes three key design decisions. First, it uses
          <strong style={{ color: 'var(--accent)' }}> write-ahead logging with STEAL/NO-FORCE</strong>
          — dirty pages can be evicted before commit (STEAL), and commits don't require
          flushing all dirty pages (NO-FORCE). Second, it uses
          <strong style={{ color: 'var(--accent)' }}> REDO all, UNDO losers</strong> —
          during recovery, first redo all changes in the log (even uncommitted ones),
          then undo the changes of uncommitted transactions. Third, it uses
          <strong style={{ color: 'var(--accent)' }}> CLRs (Compensation Log Records)</strong>
          to log UNDO actions themselves, making recovery restartable if it crashes mid-recovery.
        </Para>

        <SubTitle>ARIES — The Three Phases of Recovery</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          {[
            {
              phase: 'Phase 1',
              name: 'Analysis',
              color: '#0078d4',
              goal: 'Figure out what was in progress at crash time — which transactions were active, which pages were dirty.',
              process: 'Scan the log forward from the most recent checkpoint. Reconstruct the Active Transaction Table (ATT) and the Dirty Page Table (DPT) as they would have been at crash time. Determine the redo_lsn = minimum recLSN across all entries in the DPT.',
              output: 'ATT: transactions that were active at crash time and their lastLSN. DPT: pages that were dirty and their recLSN. redo_lsn: where REDO must start.',
            },
            {
              phase: 'Phase 2',
              name: 'REDO (Repeating History)',
              color: 'var(--accent)',
              goal: 'Restore the database to exactly the state it was in just before the crash — including all in-progress transactions.',
              process: 'Scan the log forward from redo_lsn. For each UPDATE log record: check if the page is in the DPT with recLSN ≤ this record\'s LSN. If yes, check the page\'s pageLSN on disk. If pageLSN < record\'s LSN: apply the change (write the after-image). This brings ALL changes (committed and uncommitted) back to the pre-crash state.',
              output: 'Database is in the exact state it was in at the moment of crash. Both committed and uncommitted changes are present on disk.',
            },
            {
              phase: 'Phase 3',
              name: 'UNDO (Rolling Back Losers)',
              color: '#f97316',
              goal: 'Remove all changes made by uncommitted transactions ("losers").',
              process: 'Process the ATT from Phase 1. For each active (uncommitted) transaction, follow its lastLSN backward through the log via PrevLSN links. For each UPDATE record encountered, write a CLR (Compensation Log Record) to the WAL, apply the UNDO (write the before-image to the page). Continue until the BEGIN record is reached.',
              output: 'All uncommitted changes are reversed. Database is in a state where only committed transactions\' effects are visible. ACID Atomicity and Durability are both restored.',
            },
          ].map((item, i) => (
            <div key={item.phase} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}10`, borderRight: '1px solid var(--border)',
                padding: '20px 14px', minWidth: 90,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 4,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.phase}</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: item.color, fontFamily: 'Syne, sans-serif', textAlign: 'center', lineHeight: 1.3 }}>{item.name}</span>
              </div>
              <div style={{ padding: '20px 24px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10 }}>
                  {[
                    ['Goal', item.goal],
                    ['Process', item.process],
                    ['Output', item.output],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
                      <Para>{value}</Para>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>ARIES — Complete Worked Example With Log</SubTitle>

        <CodeBox label="ARIES full example — crash and complete recovery trace">
{`// INITIAL STATE:
// Page P1: A = 100 (balance account A)
// Page P2: B = 200 (balance account B)
// Page P3: C = 300 (balance account C)

// TRANSACTIONS:
// T1: Transfer 50 from A to B (T1 commits before crash)
// T2: Transfer 30 from B to C (T2 is active at crash)

// COMPLETE WAL LOG BEFORE CRASH:
// LSN  | TxnID | Type       | PageID | Before | After | PrevLSN
// -----+-------+------------+--------+--------+-------+--------
// 1000 | T1    | BEGIN      | -      | -      | -     | NULL
// 1010 | T1    | UPDATE P1  | P1     | A=100  | A=50  | 1000
// 1020 | T1    | UPDATE P2  | P2     | B=200  | B=250 | 1010
// 1030 | T1    | COMMIT     | -      | -      | -     | 1020
// [CHECKPOINT at LSN 1040]
//   ATT = {} (T1 committed, no active transactions)
//   DPT = {P1: recLSN=1010, P2: recLSN=1020}
//   (P1 and P2 still dirty — not yet flushed to disk)
// 1050 | T2    | BEGIN      | -      | -      | -     | NULL
// 1060 | T2    | UPDATE P2  | P2     | B=250  | B=220 | 1050
// 1070 | T2    | UPDATE P3  | P3     | C=300  | C=330 | 1060
// [SERVER CRASHES at this point — T2 never commits]

// ON DISK AT CRASH TIME:
// P1: A=100  (pageLSN=0, never flushed — still has original value!)
// P2: B=200  (pageLSN=0, never flushed — still has original value!)
// P3: C=300  (pageLSN=0, never flushed — still has original value!)

// ─────────────────────────────────────────────────────────────────
// PHASE 1: ANALYSIS (start from last checkpoint at LSN 1040)
// ─────────────────────────────────────────────────────────────────
// Start with checkpoint info:
//   ATT = {} (from checkpoint)
//   DPT = {P1: recLSN=1010, P2: recLSN=1020} (from checkpoint)

// Scan log forward from LSN 1040:
// LSN 1050 — T2 BEGIN: add T2 to ATT: ATT = {T2: status=active, lastLSN=1050}
// LSN 1060 — T2 UPDATE P2: update ATT: T2.lastLSN=1060
//             P2 already in DPT → no change to DPT
// LSN 1070 — T2 UPDATE P3: update ATT: T2.lastLSN=1070
//             P3 NOT in DPT → add: DPT[P3] = recLSN=1070

// END OF ANALYSIS:
// ATT = {T2: lastLSN=1070}  ← T2 is the "loser" (no commit)
// DPT = {P1: recLSN=1010, P2: recLSN=1020, P3: recLSN=1070}
// redo_lsn = min(recLSN in DPT) = min(1010, 1020, 1070) = 1010

// ─────────────────────────────────────────────────────────────────
// PHASE 2: REDO (start from redo_lsn = 1010)
// ─────────────────────────────────────────────────────────────────
// Process LSN 1010: UPDATE P1, A: 100→50
//   Is P1 in DPT? YES (recLSN=1010 ≤ 1010)
//   pageLSN of P1 on disk = 0 < 1010 → APPLY
//   Write A=50 to P1. P1.pageLSN = 1010.

// Process LSN 1020: UPDATE P2, B: 200→250
//   Is P2 in DPT? YES (recLSN=1020 ≤ 1020)
//   pageLSN of P2 on disk = 0 < 1020 → APPLY
//   Write B=250 to P2. P2.pageLSN = 1020.

// Process LSN 1030: T1 COMMIT — no data change, skip

// Process LSN 1040: CHECKPOINT — no data change, skip

// Process LSN 1050: T2 BEGIN — no data change, skip

// Process LSN 1060: UPDATE P2, B: 250→220
//   Is P2 in DPT? YES (recLSN=1020 ≤ 1060)
//   pageLSN of P2 = 1020 < 1060 → APPLY
//   Write B=220 to P2. P2.pageLSN = 1060.

// Process LSN 1070: UPDATE P3, C: 300→330
//   Is P3 in DPT? YES (recLSN=1070 ≤ 1070)
//   pageLSN of P3 = 0 < 1070 → APPLY
//   Write C=330 to P3. P3.pageLSN = 1070.

// END OF REDO:
// P1: A=50  (T1's change, committed ✓)
// P2: B=220 (T1 set 250, T2 set 220 — T2 uncommitted, will be undone)
// P3: C=330 (T2's change, uncommitted, will be undone)
// This is exactly the pre-crash state.

// ─────────────────────────────────────────────────────────────────
// PHASE 3: UNDO (undo T2 — the loser)
// ─────────────────────────────────────────────────────────────────
// T2.lastLSN = 1070. Process in reverse order via PrevLSN links.

// UNDO LSN 1070: T2 UPDATE P3, C: 300→330
//   Apply UNDO: write before-image C=300 to P3
//   Write CLR to log: LSN=1080, T2, CLR for LSN 1070, P3, C=300, undoNextLSN=1060
//   (CLR records the undo so if recovery crashes again, we know to skip LSN 1070)
//   P3: C=300 ✓ (T2's change undone)

// UNDO LSN 1060: T2 UPDATE P2, B: 250→220
//   Apply UNDO: write before-image B=250 to P2
//   Write CLR: LSN=1090, T2, CLR for LSN 1060, P2, B=250, undoNextLSN=1050
//   P2: B=250 ✓ (T2's change undone, T1's committed change preserved)

// UNDO LSN 1050: T2 BEGIN — nothing to undo
//   Write ABORT record to log: LSN=1100, T2 ABORT
//   Remove T2 from ATT.

// FINAL RECOVERED STATE:
// P1: A=50   ← T1's transfer from A (COMMITTED) ✓
// P2: B=250  ← T1's transfer to B (COMMITTED) ✓
// P3: C=300  ← T2's update undone (T2 ROLLED BACK) ✓
//
// ACID PROPERTIES RESTORED:
// Atomicity: T2 fully rolled back — no partial effect
// Durability: T1's committed changes fully present
// The database is consistent.`}
        </CodeBox>

        <SubTitle>Compensation Log Records (CLRs) — Making UNDO Restartable</SubTitle>

        <Para>
          A critical detail of ARIES is that the UNDO phase itself is logged.
          When the recovery process undoes a change, it writes a
          <strong style={{ color: 'var(--accent)' }}> Compensation Log Record (CLR)</strong>
          to the WAL. The CLR records what was undone and contains an
          <strong style={{ color: 'var(--accent)' }}> undoNextLSN</strong> field pointing
          to the next log record to undo for this transaction.
        </Para>

        <Para>
          Why is this necessary? If the system crashes again <em>during</em> the recovery
          process — mid-UNDO — and recovery restarts, it must not undo changes that
          were already undone. Without CLRs, the recovery process would undo already-undone
          changes, potentially causing corruption. With CLRs: during the re-started REDO
          phase, the CLR's after-image is the undone value — replaying the CLR re-applies
          the undo. The undoNextLSN tells the new UNDO phase exactly where to continue.
          ARIES recovery is thus safe to restart any number of times.
        </Para>
      </section>

      {/* ========================================
          PART 5 — SHADOW PAGING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Shadow Paging" />
        <SectionTitle>Shadow Paging — The Alternative to WAL</SectionTitle>

        <Para>
          Shadow paging is a completely different approach to crash recovery that does not
          use a write-ahead log. Instead of logging changes and recovering by replaying them,
          shadow paging maintains two copies of the database: the
          <strong style={{ color: 'var(--accent)' }}> current page table</strong> (pointing
          to pages modified by the current transaction) and the
          <strong style={{ color: 'var(--accent)' }}> shadow page table</strong> (the last
          committed state — unchanged pages from before the current transaction).
        </Para>

        <CodeBox label="Shadow paging — how it works and why it's rarely used in production">
{`// SHADOW PAGING MECHANISM:

// INITIAL STATE: a single page table points to all database pages
// Page Table: P1→disk_loc_A, P2→disk_loc_B, P3→disk_loc_C

// TRANSACTION T1 begins modifying pages:

// STEP 1: Copy the page table → creates "shadow page table"
// Shadow Table: P1→disk_loc_A, P2→disk_loc_B, P3→disk_loc_C (unchanged copy)

// STEP 2: T1 updates P1 — write new P1 to a NEW disk location (disk_loc_D)
// Current Table: P1→disk_loc_D, P2→disk_loc_B, P3→disk_loc_C
// Shadow Table: P1→disk_loc_A, P2→disk_loc_B, P3→disk_loc_C (unchanged)

// STEP 3: T1 updates P2 — write new P2 to disk_loc_E
// Current Table: P1→disk_loc_D, P2→disk_loc_E, P3→disk_loc_C
// Shadow Table: P1→disk_loc_A, P2→disk_loc_B, P3→disk_loc_C (unchanged)

// TO COMMIT: atomically swap current page table for shadow page table
// Write current page table to disk (single atomic write)
// The swap is the commit — either the new table is the active one, or the old one is
// On disk, the shadow table is the fallback

// ROLLBACK: trivial — just discard the current page table
// The shadow table still points to the original, unmodified pages
// Restore: discard current table, shadow table becomes the page table again

// CRASH RECOVERY:
// If crash before commit: shadow table is still active → pre-transaction state ✓
// If crash after commit (atomic swap): new table is active → post-transaction state ✓
// No log needed, no replay, no UNDO/REDO phases

// WHY SHADOW PAGING IS NOT USED IN MOST PRODUCTION DATABASES:
// 1. FRAGMENTATION: each transaction writes pages to new locations
//    Related pages become physically scattered across disk
//    Sequential scans lose their performance advantage (random I/O)
//    Periodically must compact/reorganise the entire database

// 2. PAGE TABLE COST: copying the entire page table for each transaction is expensive
//    For a large database with millions of pages, the page table is large

// 3. NO CONCURRENT TRANSACTIONS: shadow paging inherently supports only one
//    write transaction at a time (only one "current" and one "shadow" table)
//    Multi-transaction concurrency requires complex extensions

// USED IN: SQLite (simplified variant), some research databases
// NOT USED IN: PostgreSQL, MySQL, Oracle, SQL Server (all use WAL)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — POINT-IN-TIME RECOVERY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Point-in-Time Recovery" />
        <SectionTitle>Point-in-Time Recovery (PITR) — Recovering From Media Failure</SectionTitle>

        <Para>
          System failure (soft crash) recovery uses only the WAL and restarts from the
          most recent checkpoint. Media failure (disk corruption, accidental DROP TABLE,
          data corruption) requires a fundamentally different approach: restore from a
          backup taken before the failure, then replay the WAL from the backup point
          to the desired recovery point.
        </Para>

        <Para>
          This is called <strong style={{ color: 'var(--accent)' }}>Point-in-Time Recovery (PITR)</strong>
          — the ability to restore the database to any point in time for which both a backup
          and a continuous WAL archive exist. PostgreSQL's WAL archiving and streaming
          replication are built on this foundation.
        </Para>

        <CodeBox label="PITR configuration and recovery in PostgreSQL">
{`-- ─────────────────────────────────────────────────────────────────
-- STEP 1: Configure continuous WAL archiving (in postgresql.conf)
-- ─────────────────────────────────────────────────────────────────
wal_level = replica         -- must be replica or logical for archiving
archive_mode = on           -- enable WAL archiving
archive_command = 'cp %p /mnt/wal-archive/%f'
-- %p = full path to WAL file on the primary
-- %f = filename of the WAL file
-- This copies each completed WAL segment to the archive location
-- In production: use cloud storage (S3, Azure Blob, GCS)
-- archive_command = 'aws s3 cp %p s3://my-wal-archive/%f'

-- ─────────────────────────────────────────────────────────────────
-- STEP 2: Take base backup (the starting point for PITR)
-- ─────────────────────────────────────────────────────────────────
-- Use pg_basebackup to take a consistent backup:
pg_basebackup -h localhost -U replication_user -D /backup/base -Ft -z -P
-- -Ft: tar format  -z: gzip compress  -P: show progress
-- The backup includes a backup_label file with the starting WAL LSN

-- ─────────────────────────────────────────────────────────────────
-- STEP 3: DISASTER SCENARIO — accidental table drop at 14:32:15
-- ─────────────────────────────────────────────────────────────────
-- DROP TABLE orders;  ← someone ran this at 14:32:15
-- Goal: recover to 14:32:00 (15 seconds before the drop)

-- ─────────────────────────────────────────────────────────────────
-- STEP 4: Restore base backup
-- ─────────────────────────────────────────────────────────────────
-- Stop the crashed/wrong PostgreSQL instance
-- Restore the base backup to the data directory:
rm -rf /var/lib/postgresql/data
tar -xzf /backup/base/base.tar.gz -C /var/lib/postgresql/data

-- ─────────────────────────────────────────────────────────────────
-- STEP 5: Configure recovery target
-- ─────────────────────────────────────────────────────────────────
-- Create recovery.conf (PostgreSQL 11 and earlier) or
-- use postgresql.conf + standby.signal (PostgreSQL 12+):

-- In postgresql.conf:
restore_command = 'cp /mnt/wal-archive/%f %p'
-- Tells PostgreSQL where to find archived WAL segments

recovery_target_time = '2024-03-15 14:32:00'
-- Stop replaying WAL at exactly this timestamp (before the DROP)

recovery_target_action = 'promote'
-- After reaching target: promote to a live primary (resume normal operation)

-- Create recovery signal file (PostgreSQL 12+):
touch /var/lib/postgresql/data/recovery.signal

-- ─────────────────────────────────────────────────────────────────
-- STEP 6: Start PostgreSQL — it replays WAL automatically
-- ─────────────────────────────────────────────────────────────────
-- PostgreSQL starts, finds recovery.signal
-- Restores WAL segments from archive one by one
-- Replays changes until 14:32:00
-- Stops, promotes to primary
-- orders table is restored as of 14:32:00 ✓

-- MONITOR RECOVERY PROGRESS:
SELECT pg_is_in_recovery();    -- true during recovery
SELECT pg_last_wal_replay_lsn(); -- current replay position
SELECT recovery_target_lsn, recovery_target_time FROM pg_control_recovery;`}
        </CodeBox>

        <SubTitle>Streaming Replication — Continuous PITR as High Availability</SubTitle>

        <Para>
          Streaming replication is essentially continuous PITR running in real time.
          The primary database streams WAL records to one or more standby servers.
          Each standby applies the WAL records as they arrive — staying within seconds
          of the primary. If the primary fails, a standby can be promoted to primary
          with minimal data loss. This is the standard high availability architecture
          for PostgreSQL in production.
        </Para>

        <CodeBox label="Streaming replication setup and monitoring">
{`-- ON PRIMARY: postgresql.conf
wal_level = replica
max_wal_senders = 10      -- max concurrent standby connections
wal_keep_size = 1GB       -- keep this much WAL for slow standbys

-- ON PRIMARY: pg_hba.conf (allow replication connections)
host replication replication_user 10.0.1.0/24 md5

-- ON STANDBY: postgresql.conf
primary_conninfo = 'host=10.0.1.100 port=5432 user=replication_user'
-- Signal that this is a standby:
touch /var/lib/postgresql/data/standby.signal

-- MONITOR REPLICATION LAG (on primary):
SELECT
    client_addr,
    state,
    sent_lsn,
    write_lsn,
    flush_lsn,
    replay_lsn,
    pg_wal_lsn_diff(sent_lsn, replay_lsn) AS replication_lag_bytes,
    write_lag,
    flush_lag,
    replay_lag
FROM pg_stat_replication;

-- SYNCHRONOUS vs ASYNCHRONOUS REPLICATION:
-- Asynchronous (default): primary commits without waiting for standby
--   Pros: no performance impact on primary
--   Cons: if primary crashes, standby may be slightly behind (data loss window)
-- Synchronous: primary waits for standby to confirm WAL receipt before commit
--   Pros: zero data loss on primary failure (RPO = 0)
--   Cons: each commit is slower (must wait for network round-trip to standby)

-- Configure synchronous:
synchronous_standby_names = 'standby1'  -- wait for this standby to confirm`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The 3am Corruption Incident — Full Recovery Walkthrough</SectionTitle>

        <Para>
          This is the most stressful on-call scenario in database engineering.
          Understanding it completely is what makes you the engineer who leads
          the recovery instead of panicking.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Incident — Primary Database OOM Killed at 03:17 AM
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                time: '03:17',
                event: 'OOM killer fires',
                detail: 'Linux OOM killer terminates the PostgreSQL process due to memory exhaustion from a runaway analytics query. This is a system failure — soft crash. Disk is intact. WAL is intact.',
                color: '#ff4757',
              },
              {
                time: '03:17',
                event: 'PostgreSQL automatically restarts',
                detail: 'PostgreSQL process manager (postmaster) detects the crash and immediately starts recovery. This is automatic — no human intervention needed for a soft crash.',
                color: '#f97316',
              },
              {
                time: '03:17',
                event: 'ARIES Analysis phase',
                detail: 'Recovery reads from the last checkpoint (was 2 minutes ago at 03:15). Reconstructs the ATT — finds 3 active transactions at crash time. Reconstructs the DPT — finds 847 dirty pages. redo_lsn = earliest recLSN in DPT.',
                color: '#facc15',
              },
              {
                time: '03:17',
                event: 'ARIES REDO phase',
                detail: 'Replays 2 minutes of WAL records from redo_lsn to crash point. Re-applies all changes (committed and uncommitted) to bring pages to pre-crash state. 847 pages written. Takes approximately 4 seconds.',
                color: '#facc15',
              },
              {
                time: '03:17',
                event: 'ARIES UNDO phase',
                detail: 'Rolls back the 3 uncommitted transactions found in ATT. Writes CLRs for each undone change. The analytics query that caused the OOM is fully rolled back — its partial aggregation state is gone. Takes approximately 1 second.',
                color: 'var(--accent)',
              },
              {
                time: '03:17',
                event: 'Recovery complete — database accepts connections',
                detail: 'Total recovery time: 6 seconds from crash to accepting new connections. All committed transactions are preserved. The 3 in-flight transactions are cleanly rolled back. Applications reconnect and resume normally.',
                color: 'var(--accent)',
              },
              {
                time: '03:18',
                event: 'On-call engineer wakes up',
                detail: 'PagerDuty alert fires 45 seconds after the crash (health check detects recovery in progress). By the time the engineer looks at the dashboard, PostgreSQL is already accepting connections. Root cause: analytics query running a cross-join with no LIMIT clause. Fix: add statement_timeout = \'30s\' for the analytics role.',
                color: '#0078d4',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{ flexShrink: 0, width: 54, textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{item.time}</span>
                </div>
                <div style={{ borderLeft: `2px solid ${item.color}40`, paddingLeft: 16, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.event}</div>
                  <Para>{item.detail}</Para>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '16px 18px' }}>
            <Para>
              <strong style={{ color: 'var(--accent)' }}>The key insight:</strong> For a system failure
              (OOM kill, server crash, power outage), PostgreSQL's WAL-based ARIES recovery is
              completely automatic. The DBMS handles Analysis, REDO, and UNDO without any
              human intervention. The engineer's job is to understand why it crashed and
              prevent recurrence — not to manually repair data. The recovery guarantee
              is built into the engine.
            </Para>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 8 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>Crash Recovery Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is Write-Ahead Logging and what two rules must it enforce?',
              color: '#0078d4',
              a: 'Write-Ahead Logging is the mechanism that makes STEAL/NO-FORCE buffer pool policy safe for crash recovery. It requires that every change to a data page is first recorded in a sequential log file on durable storage. The two absolute rules: (1) Before a dirty page is written to disk (the STEAL condition), the log record describing that change must already be durably on disk. This enables UNDO — if the transaction later aborts or the system crashes before commit, the log has the before-image to restore the page to its pre-transaction state. (2) Before a transaction is acknowledged as committed, all of its log records including the COMMIT record must be durably on disk. This enables REDO — if the system crashes after commit but before the data pages are flushed, the log has the after-images to redo all changes from scratch. Together these two rules make crash recovery possible without requiring slow synchronous data page flushes on every commit.',
            },
            {
              q: 'Explain the three phases of ARIES recovery.',
              color: 'var(--accent)',
              a: 'ARIES recovery has three sequential phases executed after a system crash. Phase 1 — Analysis: scan the log forward from the most recent checkpoint. Reconstruct the Active Transaction Table (ATT — transactions that were active at crash time and their lastLSN) and the Dirty Page Table (DPT — pages that were dirty and their recLSN, the earliest LSN needed to bring them current). The minimum recLSN across the DPT is redo_lsn — where REDO must start. Phase 2 — REDO (Repeating History): scan the log forward from redo_lsn. For each UPDATE record, check if the page is in the DPT and if the page\'s pageLSN on disk is less than the record\'s LSN. If so, apply the after-image. This brings the database to exactly the pre-crash state — including all in-progress (uncommitted) transactions. Phase 3 — UNDO: for each transaction in the ATT (the losers — no commit record), follow their PrevLSN chain backward through the log and apply the before-image of each UPDATE. Write a CLR (Compensation Log Record) for each undone change to make recovery restartable. Remove each transaction from the ATT when its BEGIN record is reached. After UNDO, only committed transactions\' effects remain.',
            },
            {
              q: 'What is the steal/force problem and which policy does PostgreSQL use?',
              color: '#f97316',
              a: 'The steal problem asks: can the buffer pool manager evict a dirty page belonging to an uncommitted transaction to disk (to make room for other pages)? If STEAL is allowed, uncommitted data can reach disk and must be undone if the transaction aborts. If NO-STEAL, uncommitted data never reaches disk but the buffer pool may become full and block all transactions. The force problem asks: must all dirty pages of a committing transaction be flushed to disk before the commit is acknowledged? If FORCE, Durability is trivially guaranteed (all changes are on disk before commit) but commits are slow (many random disk writes). If NO-FORCE, commits are fast (only the log record is flushed) but recovery needs REDO to recover committed changes not yet on disk. PostgreSQL uses STEAL/NO-FORCE — dirty pages can be evicted before commit (STEAL), and commits don\'t require flushing data pages (NO-FORCE). Only the WAL record must be flushed at commit time. This policy enables the best performance but requires a sophisticated recovery mechanism (WAL + ARIES) to handle both UNDO (for stolen pages from aborted transactions) and REDO (for committed transactions whose pages weren\'t forced to disk).',
            },
            {
              q: 'What are Compensation Log Records (CLRs) and why does ARIES need them?',
              color: '#8b5cf6',
              a: 'Compensation Log Records are log entries written during the UNDO phase of recovery, recording that a specific UNDO action was performed. When ARIES undoes a change at LSN L, it writes a CLR that records: the transaction ID, the page modified, the value written (the before-image that was restored), and most importantly an undoNextLSN field pointing to the log record that should be undone next for this transaction (the PrevLSN of L). CLRs solve the problem of recovery crashing during recovery. If ARIES crashes mid-UNDO and must restart, it starts a new recovery process. During the new REDO phase, the CLRs are replayed — they re-apply the already-completed UNDO actions. During the new UNDO phase, the undoNextLSN fields in the CLRs tell ARIES exactly where to continue undoing from — skipping records that were already undone. Without CLRs, a crash during recovery could cause ARIES to undo already-undone changes, corrupting the database. CLRs make ARIES idempotent — it can be restarted any number of times and will always converge to the correct result.',
            },
            {
              q: 'What is the difference between a system failure and a media failure, and how is recovery different?',
              color: '#facc15',
              a: 'A system failure (soft crash) is a server crash where the disk is intact — power failure, OS crash, process kill. RAM contents (buffer pool) are lost but the disk contents (data files and WAL) survive. Recovery uses only the WAL: the ARIES three-phase process reads the WAL, redoes committed transactions whose pages weren\'t flushed, and undoes uncommitted transactions. This is fully automatic, typically takes seconds to minutes, and requires no backup. A media failure (hard crash) is a disk failure where the storage is physically damaged or lost — head crash, SSD failure, logical corruption. Both the data files and possibly the local WAL are gone. Recovery from media failure requires: (1) A base backup taken before the failure (a full physical copy of the database files). (2) A WAL archive (continuous stream of WAL files written during operation, stored on separate media). Recovery restores the base backup, then replays the WAL archive from the backup\'s starting LSN to the desired recovery point. This is point-in-time recovery (PITR) and can target any specific timestamp or LSN for which WAL exists. Recovery time depends on the backup age and WAL volume — potentially hours for large databases.',
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
        'Three failure types: Transaction failure (one transaction fails, UNDO only), System failure (crash, RAM lost disk intact, UNDO+REDO from WAL), Media failure (disk lost, restore backup + replay WAL archive). Each requires a different recovery strategy.',
        'The STEAL/NO-FORCE policy enables best performance: dirty pages can be evicted before commit (STEAL), commits don\'t require data page flushes (NO-FORCE). The cost: sophisticated recovery (WAL + ARIES) needed to handle both UNDO and REDO. This is what every production database uses.',
        'WAL Rule 1: before a dirty page is written to disk, its log record must be on disk (enables UNDO). WAL Rule 2: before commit is acknowledged, all log records including the COMMIT record must be on disk (enables REDO). Only the sequential log needs to be flushed at commit — not the random data pages.',
        'Log records contain: LSN (monotonically increasing ID), TransactionID, Type, PageID, before-image (UNDO info), after-image (REDO info), PrevLSN (link to previous record for same transaction). pageLSN on each page records the LSN of its most recent modification.',
        'Checkpoints bound how much WAL must be replayed on recovery. Fuzzy checkpoints (production standard) write BEGIN_CHECKPOINT and END_CHECKPOINT with the ATT and DPT contents, allowing checkpointing to happen concurrently with transactions — zero pause time.',
        'ARIES Phase 1 (Analysis): reconstruct ATT and DPT from last checkpoint forward. Find redo_lsn = minimum recLSN in DPT. Phase 2 (REDO): replay all log records from redo_lsn applying after-images where pageLSN < record LSN. Phase 3 (UNDO): reverse all ATT transactions using PrevLSN chains, writing CLRs for each undone action.',
        'CLRs (Compensation Log Records) log the UNDO actions themselves. They contain an undoNextLSN pointing to the next action to undo. CLRs make recovery restartable — if recovery crashes mid-UNDO, a fresh ARIES run will replay CLRs in REDO (re-applying already-done undos) and resume UNDO from undoNextLSN.',
        'REDO is idempotent because of pageLSN: if pageLSN ≥ record\'s LSN, the change is already on disk — skip it. If pageLSN < record\'s LSN — apply it. Recovery can replay the same log segment multiple times and converge to the same correct result.',
        'Shadow paging: maintains current and shadow page tables — commits by atomically switching tables, rollbacks by discarding current table. Simpler recovery (no WAL) but causes fragmentation, supports only one write transaction at a time, and is rarely used in production (SQLite uses a variant).',
        'Point-in-time recovery (PITR) for media failure: restore base backup, replay WAL archive to target timestamp. Requires: (1) periodic base backups to separate storage, (2) continuous WAL archiving (archive_command). Streaming replication is PITR running continuously in real time — standbys stay within seconds of primary.',
      ]} />

    </LearnLayout>
  )
}