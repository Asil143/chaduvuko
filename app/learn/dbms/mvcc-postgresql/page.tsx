import { WithLessonNav } from '@/components/content/WithLessonNav'
import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'MVCC — How PostgreSQL Handles Concurrent Reads and Writes | DBMS',
  description:
    'Understand PostgreSQL MVCC through row versions and snapshots: how concurrent statements see committed data, where writes still wait, and why VACUUM matters.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'Syne, sans-serif', lineHeight: 1.2 }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12 }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text2)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 22, margin: '0 0 22px', color: 'var(--text)', lineHeight: 1.9, fontSize: 15 }}>
    {items.map(item => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}
  </ul>
)

export default function PostgreSQLMVCC() {
  return (
    <WithLessonNav href="/learn/dbms/mvcc-postgresql">
      <LearnLayout
        title="MVCC — How PostgreSQL Handles Concurrent Reads and Writes"
        description="A practical look inside PostgreSQL snapshots: why a reader can keep seeing an older row while a writer commits a new one, and how the database eventually reclaims obsolete versions."
        section="DBMS"
        readTime="35–40 min"
      >
        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 01 — The concurrency problem" />
          <SectionTitle>One row, two users, and two different correct answers</SectionTitle>
          <Para>
            Imagine a delivery platform showing an order total while a support agent corrects the order in another session. The customer should see a consistent answer for their query; the support agent should be able to save the correction without waiting for every ordinary reader to finish. A database that overwrote a row in place would have to carefully block readers and writers from touching it at the same time.
          </Para>
          <Para>
            PostgreSQL uses <strong>multiversion concurrency control (MVCC)</strong>. Instead of treating a row as one mutable value, it can retain several physical row versions. A transaction reads the version that is visible in its snapshot. A concurrent update creates a newer version; it does not make an already-running snapshot suddenly change its answer.
          </Para>
          <Para>
            This is not a promise that every operation is lock-free. Readers and writers generally do not block one another for ordinary row reads and updates, but two writers changing the same row must coordinate. Explicit row locks, table locks, schema changes, and transaction-level conflicts can also wait. MVCC is the visibility model; locks still protect conflicting operations.
          </Para>
          <Callout type="info">
            Prerequisites: understand transactions, COMMIT/ROLLBACK, isolation levels, and the difference between a transaction and a single SQL statement. The preceding concurrency-control lesson introduces those ideas; here we follow the PostgreSQL implementation.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 02 — A row is a version chain" />
          <SectionTitle>UPDATE creates a new tuple version</SectionTitle>
          <Para>
            PostgreSQL stores tuple metadata alongside row data. Two fields are useful when learning visibility: <code>xmin</code> identifies the transaction that inserted a tuple version, and <code>xmax</code> commonly records the transaction that deleted or superseded it. An unset <code>xmax</code> means no deleting/updating transaction has been recorded on that version. Real tuple-header semantics also account for row locks and other internal states, so treat this as a visibility model, not a complete binary-layout specification. These are transaction identifiers, not timestamps, and their raw numeric values are not an application API.
          </Para>
          <Para>
            Suppose a committed row contains <code>status = 'paid'</code>. Transaction T42 updates the status to <code>'shipped'</code>. Conceptually, PostgreSQL records T42 as the old version's xmax and writes a new tuple whose xmin is T42. If T42 commits, a later snapshot can see the new version. A snapshot that began before T42 committed can continue to see the old version. If T42 aborts, its new tuple is not visible as committed data.
          </Para>
          <CodeBox label="The logical version chain — simplified">
{`Before update:
  row version A: { id: 501, status: 'paid',    xmin: 100, xmax: 0 }

T42 runs UPDATE orders SET status = 'shipped' WHERE id = 501;

After the update (conceptual view):
  row version A: { id: 501, status: 'paid',    xmin: 100, xmax: 142 }
  row version B: { id: 501, status: 'shipped', xmin: 142, xmax: 0   }

T42 commits:
  a snapshot from before T42 committed may still choose A
  a later snapshot can choose B`}
          </CodeBox>
          <Para>
            The physical layout is more nuanced than this sketch: tuple headers, transaction-status data, page layout, HOT updates, and index pointers matter. The reliable conceptual model is that versions plus transaction status and a snapshot determine what a query may see. Do not query or modify system columns to build application logic.
          </Para>
          <Callout type="warning">
            A committed update does not immediately erase the previous tuple. PostgreSQL must keep it while an active snapshot might still need it. That is why old versions exist temporarily and why cleanup is part of normal database operation.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 03 — Snapshots decide visibility" />
          <SectionTitle>A snapshot is a transaction-aware view of the database</SectionTitle>
          <Para>
            A snapshot records which transactions had committed, were still in progress, or had not yet started when the snapshot was taken. PostgreSQL checks this information together with tuple metadata before returning a row. A transaction does not simply compare a row's xmin to the current clock. A version inserted by an in-progress transaction is not visible to other transactions; a version superseded by a transaction that was not committed at the snapshot boundary can remain visible to that snapshot.
          </Para>
          <Para>
            At <code>READ COMMITTED</code>, PostgreSQL takes a fresh snapshot for each statement. If another transaction commits between two SELECT statements, the later statement can see its change. At <code>REPEATABLE READ</code>, one transaction-level snapshot is reused, so subsequent reads continue to see the same committed database view even as other transactions commit.
          </Para>
          <CodeBox label="Observe isolation settings in a PostgreSQL session">
{`SHOW transaction_isolation;

BEGIN ISOLATION LEVEL READ COMMITTED;
SELECT order_id, status FROM orders WHERE order_id = 501;
-- Another session may commit an update here.
SELECT order_id, status FROM orders WHERE order_id = 501;
-- This statement gets a new snapshot at READ COMMITTED.
COMMIT;

BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT order_id, status FROM orders WHERE order_id = 501;
-- Another session may commit an update here.
SELECT order_id, status FROM orders WHERE order_id = 501;
-- This transaction keeps its earlier snapshot.
COMMIT;`}
          </CodeBox>
          <Para>
            PostgreSQL treats <code>READ UNCOMMITTED</code> as <code>READ COMMITTED</code>; it does not expose another transaction's uncommitted row changes through that isolation level. Snapshot visibility also is not the same as a lock. A plain SELECT usually reads without taking a row-level lock that blocks UPDATE, while <code>SELECT ... FOR UPDATE</code> explicitly requests locking behavior.
          </Para>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 04 — Work through two sessions" />
          <SectionTitle>Why the reader does not have to wait for the writer</SectionTitle>
          <Para>
            Use a disposable development database for this experiment. First create and seed a small table, then open two SQL sessions. Session A will keep a transaction open at REPEATABLE READ; Session B will update and commit the row. The key observation is that each session's result follows its own snapshot rather than the latest physical write.
          </Para>
          <CodeBox label="One-time setup">
{`CREATE TABLE mvcc_demo (
  id integer PRIMARY KEY,
  note text NOT NULL
);

INSERT INTO mvcc_demo (id, note) VALUES (1, 'draft');`}
          </CodeBox>
          <CodeBox label="Session A — take and keep a snapshot">
{`BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT note FROM mvcc_demo WHERE id = 1;
-- Returns: draft
-- Leave this transaction open while Session B commits.`}
          </CodeBox>
          <CodeBox label="Session B — write a new version">
{`BEGIN;
UPDATE mvcc_demo SET note = 'published' WHERE id = 1;
COMMIT;

SELECT note FROM mvcc_demo WHERE id = 1;
-- A new transaction sees: published`}
          </CodeBox>
          <CodeBox label="Back in Session A">
{`SELECT note FROM mvcc_demo WHERE id = 1;
-- The repeatable-read transaction still sees: draft
COMMIT;

SELECT note FROM mvcc_demo WHERE id = 1;
-- A new transaction sees: published`}
          </CodeBox>
          <Para>
            Now repeat the experiment with Session A at READ COMMITTED. After Session B commits, Session A's next SELECT gets a new statement snapshot and sees <code>'published'</code>. Each isolation level gives a deliberate visibility guarantee; it is not a switch between &quot;safe&quot; and &quot;unsafe&quot; reads. Choose the guarantee that matches the whole business operation, and use constraints or appropriate locking when a decision must remain valid while a transaction writes.
          </Para>
          <Callout type="tip">
            When testing, commit or roll back every open transaction. A forgotten long-running transaction can retain an old snapshot, prevent cleanup of dead tuples, and create real operational problems even in a small test database.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 05 — Writers still coordinate" />
          <SectionTitle>MVCC reduces read/write blocking; it does not eliminate conflicts</SectionTitle>
          <Para>
            If two sessions update the same row, PostgreSQL cannot let both silently replace one another's work. One writer may wait for the other. When it resumes, PostgreSQL checks whether the row is still eligible for the operation under the current isolation rules. At REPEATABLE READ or SERIALIZABLE, a transaction can receive a serialization failure and must be retried from the beginning. Applications should make retries bounded, safe, and idempotent where possible.
          </Para>
          <CodeBox label="Prefer a conditional write for an invariant">
{`-- Assume sku identifies one inventory row; reserve only while it is positive.
UPDATE inventory
SET available = available - 1
WHERE sku = 'BOOK-42'
  AND available > 0;

-- Check the affected-row count in the application:
-- 1 row means reserved; 0 rows means unavailable or missing.
-- The predicate and update are one atomic database statement.`}
          </CodeBox>
          <Para>
            This statement is safer than reading the count in application code, deciding there is stock, then issuing an unconditional update. The database evaluates the predicate as part of the write and coordinates concurrent writers to the row. For invariants involving several rows, use constraints where possible, or choose a transaction/isolation/locking strategy that protects the complete invariant.
          </Para>
          <CodeBox label="An explicit row lock for a multi-step decision">
{`BEGIN;
SELECT available
FROM inventory
WHERE sku = 'BOOK-42'
FOR UPDATE;

-- Validate the requested quantity and update while holding the row lock.
UPDATE inventory
SET available = available - 1
WHERE sku = 'BOOK-42'
  AND available >= 1;
COMMIT;`}
          </CodeBox>
          <Para>
            Explicit locks should be held for as little time as possible. Do not wait for a user, an HTTP request, or a remote service while a transaction holds a database lock. Keep transactions short, acquire multiple rows in a consistent order, and handle deadlocks or serialization errors as expected retryable outcomes—not as proof that the database lost data.
          </Para>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 06 — Old versions need cleanup" />
          <SectionTitle>VACUUM makes versioning sustainable</SectionTitle>
          <Para>
            Once no active transaction can see an obsolete row version, PostgreSQL can mark its space reusable. <code>VACUUM</code> performs this cleanup and maintains visibility information used to avoid unnecessary heap visits. Autovacuum normally schedules maintenance based on table activity. Ordinary VACUUM generally makes space reusable inside the relation; it does not necessarily return that space to the operating system or shrink the table file. Table rewrites and specialized maintenance are different operations with their own locking and availability trade-offs.
          </Para>
          <Para>
            A long-lived transaction can keep an old snapshot alive. Vacuum must preserve row versions that snapshot could still need, so cleanup falls behind and the table can accumulate dead tuples. This can lead to bloat, extra I/O, slower scans, and increased storage. Long-running transactions and replication slots can also retain old WAL or hold back cleanup horizons, so diagnosing growth means checking the relevant retention mechanism rather than blindly running a more aggressive command.
          </Para>
          <CodeBox label="Useful read-only checks">
{`-- How long have transactions been open?
SELECT pid, now() - xact_start AS transaction_age, state, query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;

-- Approximate live/dead tuple counts and last vacuum activity.
SELECT relname, n_live_tup, n_dead_tup,
       last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 10;`}
          </CodeBox>
          <Para>
            The statistics are estimates and can be stale; use them to identify a trend, not as exact row counts. Investigate long transactions, vacuum logs, table churn, and workload patterns together. Do not disable autovacuum as a generic tuning fix. Transaction ID freezing is another maintenance responsibility: it prevents old transaction identifiers from eventually becoming ambiguous, and PostgreSQL has safeguards to protect against wraparound risk.
          </Para>
          <Callout type="warning">
            MVCC trades some storage and cleanup work for predictable snapshots and improved concurrency. A database with heavy updates still needs suitable autovacuum settings, monitoring, and short transactions; MVCC does not mean old versions disappear automatically at COMMIT.
          </Callout>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 07 — Choose the right isolation behavior" />
          <SectionTitle>Snapshot isolation is not the same as serial execution</SectionTitle>
          <Para>
            REPEATABLE READ in PostgreSQL uses snapshot isolation: reads within the transaction use a stable snapshot, and conflicting writes can cause an error rather than silently overwrite a newer row. Snapshot isolation prevents several common anomalies, including phantoms in PostgreSQL, but it does not make every multi-row business rule serializable. For example, two transactions can each observe that a different doctor is on call and independently turn themselves off call; both writes touch different rows, yet the combined result violates the rule that at least one doctor must remain on call.
          </Para>
          <Para>
            PostgreSQL's SERIALIZABLE level uses Serializable Snapshot Isolation (SSI). It monitors read/write dependencies and aborts a transaction when a dangerous dependency pattern could produce a result inconsistent with any serial order. It does not generally make readers block writers, but applications must be prepared to retry serialization failures. Constraints, explicit locks, or a redesigned atomic operation may be simpler for a particular invariant.
          </Para>
          <div style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.7 }}>
              <thead><tr style={{ background: 'var(--bg2)', textAlign: 'left' }}>
                {['Behavior', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'].map(h => <th key={h} style={{ padding: 12, border: '1px solid var(--border)', color: 'var(--text)' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[
                  ['Snapshot scope', 'One per statement', 'One per transaction', 'One per transaction, with SSI checks'],
                  ['Repeated SELECT', 'Can see a later commit', 'Keeps the same snapshot', 'Keeps the same snapshot'],
                  ['Typical conflict response', 'Waits/row recheck for concurrent updates', 'May abort a conflicting transaction', 'May abort to prevent a serialization anomaly'],
                  ['Application concern', 'Each statement may see new commits', 'Retry serialization failures', 'Retry serialization failures; test transaction logic'],
                ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, border: '1px solid var(--border)', color: 'var(--text2)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <Para>
            The database can enforce many single-row and relational rules with NOT NULL, CHECK, UNIQUE, and foreign-key constraints. Prefer declarative constraints because they protect writes from every application path. For a cross-row rule, verify whether it can be expressed with a constraint or represented by a row that can be locked; otherwise use SERIALIZABLE with a tested retry policy or another carefully designed coordination mechanism.
          </Para>
        </section>

        <section style={{ marginBottom: 64 }}>
          <SectionTag text="// Part 08 — Mistakes, practice & production habits" />
          <SectionTitle>Diagnose the behavior instead of guessing</SectionTitle>
          <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
            {[
              { mistake: '"MVCC means writes never wait."', cause: 'Concurrent writes to the same row, explicit locks, and DDL lock conflicts still require coordination.', fix: 'Distinguish ordinary snapshot reads from conflicting writes. Keep transactions short and inspect lock waits when latency spikes.' },
              { mistake: 'Treating xmin or xmax as wall-clock timestamps or permanent IDs.', cause: 'They are internal transaction identifiers with wraparound and visibility semantics, not business timestamps.', fix: 'Use created_at/updated_at columns for application time. Use supported system views for diagnostics, not raw tuple metadata in business logic.' },
              { mistake: 'Assuming REPEATABLE READ is identical across every DBMS.', cause: 'Isolation-level names are standards categories; implementations differ. PostgreSQL\'s REPEATABLE READ has snapshot-isolation behavior.', fix: 'Read the database\'s documented guarantees and test the actual concurrent schedule your application relies on.' },
              { mistake: 'Disabling autovacuum because dead tuples are visible.', cause: 'Dead tuple counts are normal in an update-heavy MVCC system; disabling cleanup can turn a local symptom into table bloat or wraparound risk.', fix: 'Find long snapshots and workload causes, then tune and monitor vacuum based on evidence.' },
            ].map(item => <div key={item.mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '16px 20px' }}>
              <Para><strong>Mistake:</strong> {item.mistake}</Para><Para><strong>Why it fails:</strong> {item.cause}</Para><Para><strong>Better approach:</strong> {item.fix}</Para>
            </div>)}
          </div>
          <SubTitle>Practice — explain before you execute</SubTitle>
          <BulletList items={[
            'Run the two-session experiment at READ COMMITTED and REPEATABLE READ. Write down exactly which statement gets a new snapshot, then explain why each result is correct.',
            'Draw the old and new tuple versions for an UPDATE that commits, and for one that rolls back. Mark which version a transaction started before the UPDATE can see.',
            'Change the inventory example to reserve a requested quantity. Explain how the affected-row count communicates success and why an application-side read-then-write is unsafe.',
            'Create a long-running read transaction, update the same test table repeatedly from another session, and observe approximate dead-tuple statistics. Close the transaction and observe how maintenance can catch up.',
            'Describe a multi-row invariant that snapshot isolation alone might not preserve. Propose a constraint, explicit locking strategy, or SERIALIZABLE transaction and state how the application retries failures.',
          ]} />
        </section>

        <KeyTakeaways items={[
          'PostgreSQL MVCC keeps multiple row versions so a statement can read a consistent snapshot while concurrent transactions create newer versions.',
          'xmin identifies the inserting transaction for a tuple version; xmax records a deleting or superseding transaction. They are internal transaction IDs, not application timestamps.',
          'At READ COMMITTED, each statement gets a fresh snapshot. At REPEATABLE READ, the transaction keeps its snapshot. PostgreSQL implements READ UNCOMMITTED as READ COMMITTED.',
          'MVCC reduces ordinary read/write blocking but does not remove writer conflicts, explicit locks, table locks, or schema-change waits.',
          'PostgreSQL SERIALIZABLE uses SSI to detect dangerous read/write dependency patterns; transactions may abort and the application must safely retry.',
          'VACUUM reclaims space from versions no active snapshot can see. Long-running transactions and retention horizons can delay cleanup; regular autovacuum is essential.',
          'Use constraints for invariants, short transactions, bounded retries, and observed operational diagnostics instead of relying on undocumented tuple internals.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
