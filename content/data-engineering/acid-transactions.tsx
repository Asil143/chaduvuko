import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'ACID Properties and Transactions — Data Engineering | Chaduvuko',
  description:
    'Why ACID exists, what each property means at the implementation level, what actually happens when a transaction fails halfway, and why every data engineer must understand this deeply.',
}

// ── Local components ────────────────────────────────────────────────────────

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── Page ────────────────────────────────────────────────────────────────────

export default function ACIDTransactionsModule() {
  return (
    <LearnLayout
      title="ACID Properties and Transactions"
      description="Why ACID exists, what each property means, and what happens when it breaks."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Problem ACID Solves ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>The Problem ACID Was Invented to Solve</SectionTitle>

        <Para>
          Imagine a bank transfer. Priya sends ₹5,000 to Rahul. Two things must happen:
          subtract ₹5,000 from Priya's account, add ₹5,000 to Rahul's account. Simple.
          Now imagine the server crashes after the subtraction but before the addition.
          Priya's account is ₹5,000 lighter. Rahul's account shows nothing. The money
          has vanished.
        </Para>

        <Para>
          Or consider a different failure: while the bank transfer is being processed,
          another query reads both account balances at the exact moment between the
          subtraction and the addition. It sees Priya's balance already reduced but
          Rahul's not yet increased. It calculates total money in the system as ₹5,000
          less than the actual total. It is seeing a reality that never truly existed.
        </Para>

        <Para>
          These are not hypothetical edge cases. They happen constantly in systems
          without proper transaction semantics. Every concurrent database — which means
          every database worth using — faces these problems at scale. ACID is the set
          of four guarantees that databases provide to ensure these problems never
          occur. Understanding ACID deeply is not just theoretical knowledge — it
          directly determines how you design data pipelines that handle failures
          correctly.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16, letterSpacing: '-0.3px',
          }}>
            The four problems ACID solves
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { problem: 'Partial update', solution: 'Atomicity — all or nothing', color: '#00e676' },
              { problem: 'Constraint violation after update', solution: 'Consistency — valid before and after', color: '#7b61ff' },
              { problem: 'Reading in-progress changes', solution: 'Isolation — transactions do not interfere', color: '#f97316' },
              { problem: 'Losing committed data on crash', solution: 'Durability — committed data survives', color: '#4285f4' },
            ].map((item) => (
              <div key={item.problem} style={{
                borderLeft: `3px solid ${item.color}`, paddingLeft: 14,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#ff4757',
                  fontFamily: 'var(--font-mono)', marginBottom: 4,
                }}>Problem: {item.problem}</div>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.06em',
                }}>→ {item.solution}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Atomicity ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — A: Atomicity" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-display)',
          }}>A</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#00e676', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Atomicity — All or Nothing</h2>
        </div>

        <Para>
          Atomicity is the guarantee that a transaction — which may contain dozens
          of individual operations — is treated as a single indivisible unit. Either
          every single operation in the transaction succeeds and the changes are
          committed, or the entire transaction is rolled back and the database is
          left exactly as it was before the transaction began. There is no partial
          state. There is no "most of the changes succeeded."
        </Para>

        <Para>
          The word "atomic" comes from the Greek word for indivisible. An atomic
          operation cannot be split. You observe it before it starts, or after it
          finishes. You never observe it in the middle.
        </Para>

        <SubTitle>How atomicity works internally</SubTitle>

        <Para>
          Atomicity is implemented using the Write-Ahead Log (WAL) we covered in
          Module 09. Every operation in a transaction is written to the WAL before
          the data pages are modified. When a transaction commits, a commit record
          is written to the WAL and flushed to disk. If a crash occurs before the
          commit record is written, the database replays the WAL on restart, sees
          no commit record for that transaction, and discards all its changes.
          If the commit record was written, all changes are replayed and applied.
        </Para>

        <CodeBox label="Atomicity — what happens at each failure point">{`BANK TRANSFER TRANSACTION:
  BEGIN;
    UPDATE accounts SET balance = balance - 5000 WHERE account_id = 'A001'; -- Step 1
    UPDATE accounts SET balance = balance + 5000 WHERE account_id = 'B001'; -- Step 2
  COMMIT;

SCENARIO 1: Server crashes AFTER step 1, BEFORE step 2
  WAL contains: Step 1 operation, NO commit record
  On restart: database sees no commit → ROLLS BACK step 1
  Result: A001 balance unchanged, B001 balance unchanged
  Money is NOT lost. ✓

SCENARIO 2: Server crashes AFTER commit record is written
  WAL contains: Step 1, Step 2, COMMIT record
  On restart: database replays both steps
  Result: A001 reduced by 5000, B001 increased by 5000
  Transaction is fully applied. ✓

SCENARIO 3: Step 2 fails due to a constraint violation
  (e.g. B001 account has been frozen and cannot receive funds)
  Database automatically rolls back step 1 within the transaction
  Result: A001 balance unchanged (step 1 reversed)
  Error returned to application: transaction failed. ✓
  No partial state. ✓

WITHOUT ATOMICITY (naive implementation):
  Step 1 executes and modifies A001 directly
  Step 2 fails for any reason
  Result: A001 reduced, B001 unchanged — money GONE
  This is why atomicity is not optional for financial systems.`}</CodeBox>

        <SubTitle>Atomicity in data pipelines</SubTitle>

        <Para>
          Atomicity in data pipelines means: either the entire batch of rows
          is written or none of them are. If your pipeline writes 100,000 rows
          in a transaction and fails on row 73,241, the entire batch is rolled
          back. The next run starts from the beginning of the batch.
        </Para>

        <Para>
          This is why <strong>idempotency</strong> — the ability to safely rerun a pipeline —
          is built on atomicity. If writes are atomic, a failed run leaves no
          partial data behind. The next run can safely write the complete batch
          without worrying about duplicating what was already written.
        </Para>

        <CodeBox label="Atomic batch write in a data pipeline">{`# Python pipeline — atomic batch insert using a transaction
import psycopg2

def load_orders_batch(orders: list[dict], conn) -> None:
    """Load a batch of orders atomically — all succeed or all fail."""
    with conn.cursor() as cur:
        try:
            # Everything inside this block is one transaction
            cur.execute("BEGIN;")

            for order in orders:
                cur.execute(
                    """INSERT INTO silver.orders
                       (order_id, customer_id, amount, status, created_at)
                       VALUES (%s, %s, %s, %s, %s)
                       ON CONFLICT (order_id) DO UPDATE
                       SET status = EXCLUDED.status,
                           updated_at = NOW()""",
                    (order['id'], order['customer_id'],
                     order['amount'], order['status'], order['created_at'])
                )

            cur.execute("COMMIT;")
            print(f"Successfully committed {len(orders)} orders")

        except Exception as e:
            cur.execute("ROLLBACK;")  # ← atomicity: undo all changes
            print(f"Transaction rolled back due to: {e}")
            raise  # re-raise so the orchestrator knows it failed

# Without the transaction:
#   If row 73,241 fails, rows 1–73,240 are already committed
#   Next run re-inserts rows 1–73,240 → duplicates
#   With ON CONFLICT this is handled, but messy
#
# With the transaction:
#   If row 73,241 fails, rows 1–73,240 are rolled back
#   Next run starts cleanly from row 1`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Consistency ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — C: Consistency" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900, color: '#7b61ff',
            fontFamily: 'var(--font-display)',
          }}>C</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#7b61ff', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Consistency — Valid Before and After</h2>
        </div>

        <Para>
          Consistency is the guarantee that a transaction takes the database from
          one valid state to another valid state. Every constraint, rule, and
          invariant defined in the schema must be satisfied both before and after
          the transaction. A transaction that would violate any constraint is
          aborted entirely — atomicity ensures the invalid intermediate state
          is never persisted.
        </Para>

        <Para>
          Consistency is the only ACID property that is partly the application's
          responsibility. The database enforces its own constraints — foreign keys,
          CHECK constraints, NOT NULL, UNIQUE — automatically. But business rules
          that are not expressed as database constraints must be enforced by the
          application or pipeline code.
        </Para>

        <SubTitle>What consistency means in practice</SubTitle>

        <CodeBox label="Consistency — database-enforced vs application-enforced">{`DATABASE-ENFORCED CONSISTENCY (automatic):

  Schema constraints the database checks on every transaction:
    NOT NULL:    customer_id cannot be NULL
    UNIQUE:      order_id cannot repeat
    FOREIGN KEY: customer_id must exist in customers table
    CHECK:       order_amount must be > 0
                 status must be in ('placed','confirmed','delivered','cancelled')

  Example: trying to insert an order with amount = -100
    INSERT INTO orders (order_id, customer_id, amount, status)
    VALUES (9284751, 4201938, -100.00, 'placed');

    → ERROR: new row violates check constraint "chk_order_amount"
    → Transaction aborted. No partial state. ✓

APPLICATION-ENFORCED CONSISTENCY (your responsibility):

  Business rules that cannot be expressed as simple DB constraints:
    "A delivered order cannot be cancelled"
    "A customer cannot have more than 5 active orders simultaneously"
    "An order amount cannot exceed the customer's credit limit"
    "Delivery time cannot be set before the order was placed"

  These rules must be checked in application/pipeline code BEFORE
  attempting the database write. The database has no way to know
  these business rules exist.

  Example of a consistency violation the DB cannot catch:
    -- Order was already 'delivered' at 8:14 PM
    -- At 8:45 PM, a bug in the status service sends 'cancelled'
    UPDATE orders SET status = 'cancelled'
    WHERE order_id = 9284751;
    → DB allows this (no constraint prevents it)
    → But it violates a business rule: you cannot cancel a delivered order
    → Application code must check current status BEFORE allowing the update

  This is why data quality checks in pipelines matter:
  the database enforces its constraints; your pipeline must enforce
  the business rules the database cannot express as constraints.`}</CodeBox>

        <SubTitle>Consistency and data pipelines</SubTitle>

        <Para>
          For data engineers, consistency means your pipeline must leave the
          data in a valid state after every run. This includes not just database
          constraints but business-level invariants: row counts that match expected
          volumes, referential completeness (every order_id in order_items has
          a corresponding row in orders), and value distributions within expected
          ranges. Data quality tests in dbt are exactly this — they are consistency
          checks for business rules the database cannot enforce natively.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — Isolation ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — I: Isolation" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900, color: '#f97316',
            fontFamily: 'var(--font-display)',
          }}>I</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#f97316', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Isolation — Transactions Do Not Interfere</h2>
        </div>

        <Para>
          Isolation is the guarantee that concurrent transactions are isolated from
          each other — a transaction in progress cannot see the uncommitted changes
          of another transaction, and two transactions do not produce inconsistent
          results just because they run at the same time. Every transaction behaves
          as if it were the only transaction running, even when thousands of
          transactions execute simultaneously.
        </Para>

        <Para>
          Isolation is the most complex ACID property to implement and the one with
          the most engineering nuance. Full isolation (every transaction sees a
          perfectly consistent snapshot with no interference) comes at a performance
          cost. Databases offer different <strong>isolation levels</strong> that trade
          off correctness guarantees against concurrency performance.
        </Para>

        <SubTitle>The four isolation problems — what happens without isolation</SubTitle>

        {[
          {
            problem: 'Dirty Read',
            color: '#ff4757',
            desc: 'Transaction A reads data that Transaction B has modified but not yet committed. If B rolls back, A has read data that never officially existed.',
            example: `T1 (payment service):  BEGIN; UPDATE balance = 50000; -- not committed yet
T2 (report query):     SELECT balance → reads 50000   ← DIRTY READ
T1:                    ROLLBACK;  -- balance was never actually 50000
T2 used a value that never existed.`,
          },
          {
            problem: 'Non-Repeatable Read',
            color: '#f97316',
            desc: 'Transaction A reads the same row twice during its execution and gets different results because Transaction B modified and committed the row between the two reads.',
            example: `T1 (order report):  SELECT amount FROM orders WHERE id=9284751 → 380.00
T2 (price update):  UPDATE orders SET amount=420.00 WHERE id=9284751; COMMIT;
T1:                 SELECT amount FROM orders WHERE id=9284751 → 420.00
Same query, same transaction, different result. Inconsistent.`,
          },
          {
            problem: 'Phantom Read',
            color: '#facc15',
            desc: 'Transaction A runs a range query twice. Between the two reads, Transaction B inserts or deletes rows that match the range. The second read returns different rows than the first.',
            example: `T1 (daily report): SELECT COUNT(*) FROM orders WHERE date='2026-03-17' → 48,234
T2 (new orders):   INSERT INTO orders ... WHERE date='2026-03-17'; COMMIT;
T1:                SELECT COUNT(*) FROM orders WHERE date='2026-03-17' → 48,891
New "phantom" rows appeared during T1's execution.`,
          },
          {
            problem: 'Lost Update',
            color: '#7b61ff',
            desc: 'Two transactions read the same value, both compute an update based on the value they read, and both write back. The second write overwrites the first without knowing it existed.',
            example: `T1 reads inventory: quantity = 100
T2 reads inventory: quantity = 100
T1: UPDATE SET quantity = 100 - 10 = 90; COMMIT;
T2: UPDATE SET quantity = 100 - 5  = 95; COMMIT;   ← overwrites T1!
Result: 95 (wrong). Should be 100 - 10 - 5 = 85.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '18px 22px' }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 8,
              }}>⚠ {item.problem}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>
                {item.desc}
              </div>
              <pre style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 16px',
                fontSize: 12, lineHeight: 1.8, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
              }}>{item.example}</pre>
            </div>
          </div>
        ))}

        <SubTitle>Isolation levels — the trade-off between correctness and performance</SubTitle>

        <Para>
          Rather than providing maximum isolation always (which is expensive),
          SQL databases offer four isolation levels. Each level prevents certain
          anomalies while allowing others, trading consistency guarantees for
          higher concurrency.
        </Para>

        <CompareTable
          headers={[
            { label: 'Isolation Level' },
            { label: 'Dirty Read', color: '#ff4757' },
            { label: 'Non-Repeatable Read', color: '#f97316' },
            { label: 'Phantom Read', color: '#facc15' },
            { label: 'Use when', color: '#00e676' },
          ]}
          keys={['level', 'dirty', 'nonrep', 'phantom', 'use']}
          rows={[
            {
              level: 'READ UNCOMMITTED',
              dirty: '✗ Possible',
              nonrep: '✗ Possible',
              phantom: '✗ Possible',
              use: 'Almost never — allows reading uncommitted data. Only acceptable for approximate analytics where staleness is fine.',
            },
            {
              level: 'READ COMMITTED (default in PostgreSQL)',
              dirty: '✓ Prevented',
              nonrep: '✗ Possible',
              phantom: '✗ Possible',
              use: 'Most OLTP applications. Each statement sees only committed data, but two reads in same transaction may differ.',
            },
            {
              level: 'REPEATABLE READ (default in MySQL InnoDB)',
              dirty: '✓ Prevented',
              nonrep: '✓ Prevented',
              phantom: '✗ Possible (standard) ✓ Prevented (PostgreSQL)',
              use: 'Financial reports, bank statements — where same-row reads must be consistent within one transaction.',
            },
            {
              level: 'SERIALIZABLE',
              dirty: '✓ Prevented',
              nonrep: '✓ Prevented',
              phantom: '✓ Prevented',
              use: 'Critical financial operations, inventory management — where all anomalies are unacceptable. Slowest.',
            },
          ]}
        />

        <SubTitle>What isolation level should data pipelines use?</SubTitle>

        <CodeBox label="Isolation levels for data engineering — practical guidance">{`INGESTION QUERIES (reading from production databases):
  Use: READ COMMITTED (PostgreSQL default) or REPEATABLE READ
  Why: you want to read committed data, not in-progress changes
       READ COMMITTED: each of your SELECT statements sees a fresh snapshot
       REPEATABLE READ: your entire transaction sees one consistent snapshot
                        (better for long-running analytical extractions)

  PostgreSQL example:
    BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
    -- All reads within this transaction see the same snapshot
    SELECT * FROM orders WHERE created_at >= '2026-03-17';
    -- Even if new orders are committed during this query,
    -- they will NOT appear here (snapshot was taken at BEGIN)
    COMMIT;

WRITE PIPELINES (loading data into warehouse/lake tables):
  Use: READ COMMITTED or SERIALIZABLE depending on conflict risk
  For simple appends: READ COMMITTED is sufficient
  For read-modify-write patterns (count then insert):
    Use SERIALIZABLE to prevent lost updates

  Example of dangerous read-modify-write without SERIALIZABLE:
    -- Two pipeline instances run simultaneously:
    T1: SELECT COUNT(*) FROM daily_summary WHERE date='2026-03-17' → 0
    T2: SELECT COUNT(*) FROM daily_summary WHERE date='2026-03-17' → 0
    T1: INSERT INTO daily_summary (date, count) VALUES ('2026-03-17', 48234)
    T2: INSERT INTO daily_summary (date, count) VALUES ('2026-03-17', 48234)
    Result: DUPLICATE ROW in daily_summary
    With SERIALIZABLE: T2 fails with serialization error → retry → correct

PRACTICAL RULE FOR DATA ENGINEERS:
  For reading: always use at least READ COMMITTED — never READ UNCOMMITTED
  For long analytical reads: use REPEATABLE READ for snapshot consistency
  For concurrent writes to shared tables: use SERIALIZABLE
  Most pipelines: READ COMMITTED is fine because writes are controlled
                  (only one pipeline writes to a table at a time)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Durability ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — D: Durability" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            background: 'rgba(66,133,244,0.12)', border: '2px solid #4285f4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 900, color: '#4285f4',
            fontFamily: 'var(--font-display)',
          }}>D</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#4285f4', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Durability — Committed Data Survives Everything</h2>
        </div>

        <Para>
          Durability is the guarantee that once a transaction is committed, its
          changes are permanent. Not "probably permanent." Not "permanent unless
          the server crashes." Permanent — they survive server crashes, power
          failures, OS crashes, and restarts. If the database told the application
          "transaction committed," those changes will be in the database after any
          failure.
        </Para>

        <Para>
          Durability is implemented through the Write-Ahead Log. Before the database
          sends the "committed" response to the application, the commit record is
          flushed to the WAL on durable storage (disk or SSD). Even if the server
          immediately crashes after sending the commit response, the WAL replay
          on restart will recover all committed changes. This is why the WAL flush
          (the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>fsync</code> call
          that forces the WAL buffer to physical disk) is the most performance-critical
          operation in a high-write database.
        </Para>

        <CodeBox label="Durability — the WAL fsync and its performance implications">{`DURABILITY IMPLEMENTATION:

  Transaction COMMIT sequence:
    1. All operations in transaction written to WAL buffer (in memory)
    2. fsync() called → WAL buffer flushed to durable disk storage
    3. "COMMIT" response sent to application  ← only after fsync completes
    4. Data pages modified in buffer pool (can happen lazily later)
    5. At checkpoint: modified data pages written from buffer to disk

  The critical point: step 3 cannot happen before step 2.
  "Committed" means "safely on disk." Not "in memory."

PERFORMANCE IMPACT OF DURABILITY:
  fsync() is expensive — forces all pending writes to physical disk
  Typical SSD fsync latency: 0.5 – 5 milliseconds
  Without fsync: database could acknowledge commits at memory speed (~microseconds)
  With fsync: every transaction pays the disk latency penalty

  PostgreSQL synchronous_commit settings:
    on (default):  fsync after every commit → fully durable, slowest writes
    off:           no fsync → commits acknowledged at memory speed
                   risk: up to ~0.6 seconds of committed transactions can be
                   lost on crash (the WAL buffer that was not flushed)
    local:         fsync to local disk, not to replicas

  For data pipelines: synchronous_commit = on is correct for all
  financial and critical data. For analytics data that can be
  reprocessed from source, synchronous_commit = off is acceptable
  and dramatically improves write throughput.

CLOUD DATABASE DURABILITY:
  RDS PostgreSQL, Cloud SQL, Azure Database for PostgreSQL:
    → Multi-AZ deployments replicate WAL to a standby in a different
      availability zone synchronously before acknowledging commits
    → Survive data centre failure, not just single server failure
    
  Snowflake / BigQuery:
    → Multiple copies of data written across multiple storage nodes
    → Commit acknowledged only after all copies are confirmed
    → Effectively more durable than a single-server PostgreSQL`}</CodeBox>

        <SubTitle>Durability vs performance — the real trade-off</SubTitle>

        <Para>
          Every database that offers durability pays a performance cost for it.
          The <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>fsync</code> that
          makes durability possible is the same operation that limits write throughput.
          Some high-throughput data systems deliberately relax durability guarantees
          for better performance — accepting that some recently committed data might
          be lost on crash because it can be reprocessed from the source.
        </Para>

        <Para>
          As a data engineer, you must make this trade-off consciously for each
          pipeline. Financial transaction data: full durability always. Analytics
          event data that can be reprocessed from Kafka: relaxed durability is
          acceptable. Understand the recovery cost of lost data before choosing
          a durability level.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Transactions in Practice ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Transactions in Practice" />
        <SectionTitle>Writing and Managing Transactions — The Practical Patterns</SectionTitle>

        <Para>
          Understanding ACID conceptually is necessary. Using transactions correctly
          in code is what actually protects your data. Here are the practical patterns
          every data engineer must know.
        </Para>

        <SubTitle>Basic transaction syntax</SubTitle>

        <CodeBox label="Transaction syntax — PostgreSQL and Python">{`-- SQL transaction syntax:
BEGIN;                     -- start transaction (also: START TRANSACTION)
  UPDATE accounts SET balance = balance - 5000 WHERE id = 'A001';
  UPDATE accounts SET balance = balance + 5000 WHERE id = 'B001';
  INSERT INTO transfer_log (from_id, to_id, amount, ts)
    VALUES ('A001', 'B001', 5000, NOW());
COMMIT;                    -- make all changes permanent

-- If something goes wrong:
BEGIN;
  UPDATE accounts SET balance = balance - 5000 WHERE id = 'A001';
  -- Something fails here...
ROLLBACK;                  -- undo all changes in this transaction

-- SAVEPOINT — partial rollback within a transaction:
BEGIN;
  UPDATE orders SET status = 'confirmed' WHERE order_id = 9284751;
  SAVEPOINT after_confirm;

  UPDATE inventory SET stock = stock - 1 WHERE item_id = 'MI-001';
  -- If inventory update fails:
  ROLLBACK TO SAVEPOINT after_confirm;  -- undo only inventory update
  -- Order confirmation is preserved, inventory update is rolled back

  -- Continue with other work...
COMMIT;

-- Python with psycopg2:
with psycopg2.connect(conn_string) as conn:
    with conn.cursor() as cur:
        try:
            cur.execute("UPDATE accounts SET balance = balance - 5000 WHERE id = 'A001'")
            cur.execute("UPDATE accounts SET balance = balance + 5000 WHERE id = 'B001'")
            conn.commit()      # explicit commit
        except Exception:
            conn.rollback()    # explicit rollback on any error
            raise

# Python with context manager (autocommit=False by default in psycopg2):
with psycopg2.connect(conn_string) as conn:
    # conn is automatically committed on __exit__ if no exception
    # conn is automatically rolled back on __exit__ if exception occurs
    with conn.cursor() as cur:
        cur.execute("UPDATE ...")`}</CodeBox>

        <SubTitle>Transaction scope — the most common mistake</SubTitle>

        <Para>
          The most common transaction mistake in data pipelines is making transactions
          too large. Wrapping one million row inserts in a single transaction means
          holding locks on all resources for the duration of the entire operation.
          Long transactions: block other queries waiting for locks, consume enormous
          amounts of WAL space, prevent VACUUM from reclaiming dead row versions (as
          covered in Module 09), and take a long time to roll back if they fail.
        </Para>

        <CodeBox label="Transaction scope — too large vs correctly sized">{`TOO LARGE (one transaction for the entire batch):
  BEGIN;
  INSERT INTO orders VALUES (row 1);
  INSERT INTO orders VALUES (row 2);
  ...
  INSERT INTO orders VALUES (row 1,000,000);  -- after 45 minutes...
  COMMIT;

  Problems:
  → Holds row locks for 45 minutes
  → If row 900,000 fails, ALL 900,000 previous rows are rolled back
  → 45 minutes of WAL accumulation before any data is visible
  → Other queries that need those rows are blocked for 45 minutes

CORRECTLY SIZED (one transaction per micro-batch):
  BATCH_SIZE = 10_000

  for batch in chunks(all_orders, BATCH_SIZE):
      with conn.cursor() as cur:
          try:
              cur.execute("BEGIN;")
              for order in batch:
                  cur.execute("INSERT INTO orders ...", order)
              cur.execute("COMMIT;")
              checkpoint.save(batch[-1]['order_id'])  # track progress
          except Exception as e:
              cur.execute("ROLLBACK;")
              # Only this batch of 10,000 rows is lost
              # Previous committed batches are safe
              # Retry only from the last checkpoint
              raise

  Benefits:
  → Each transaction holds locks for seconds, not hours
  → On failure, only 10,000 rows need retrying (not 1,000,000)
  → Committed data is visible progressively
  → Checkpoint tracking enables resumable pipelines

RULE: keep transactions as small as possible while still being
      atomic for the unit of work that must succeed or fail together.
      For pipelines: one transaction per batch, not one transaction
      for the entire pipeline run.`}</CodeBox>

        <SubTitle>Autocommit — the hidden default that catches beginners</SubTitle>

        <Para>
          Most database clients operate in autocommit mode by default — every
          statement is automatically wrapped in its own transaction and committed
          immediately. This means there is no "undo" for a plain
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> UPDATE</code> or
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> DELETE</code> run without explicit
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> BEGIN</code>. Understanding
          this prevents the classic mistake of running a bulk update, realising it
          was wrong, and discovering there is nothing to roll back.
        </Para>

        <CodeBox label="Autocommit — understanding the default and when to disable it">{`PSQL (PostgreSQL command line) — autocommit is ON by default:
  UPDATE orders SET status = 'cancelled';  -- Runs and commits immediately
  -- There is no ROLLBACK possible after this.
  -- If you meant to add a WHERE clause, the data is already modified.

  Safe practice for destructive operations:
  BEGIN;                                    -- start explicit transaction
  UPDATE orders SET status = 'cancelled';  -- run the update
  SELECT count(*) FROM orders WHERE status = 'cancelled';  -- verify
  -- If count looks wrong:
  ROLLBACK;   -- undo safely
  -- If count looks right:
  COMMIT;     -- make permanent

PYTHON / psycopg2 — autocommit is OFF by default:
  conn = psycopg2.connect(...)
  cur = conn.cursor()
  cur.execute("UPDATE orders SET status = 'cancelled'")
  # NOT committed yet! Still in an implicit transaction.
  # conn.commit() must be called explicitly.
  # Without conn.commit(), changes are LOST when connection closes.

  # This is why pipelines must call conn.commit() explicitly
  # or use context managers that commit on clean exit.

SQLALCHEMY — autocommit behaviour:
  session.execute(update_stmt)     # not committed
  session.commit()                 # committed
  # or
  with session.begin():
      session.execute(update_stmt) # commits when with block exits cleanly
                                   # rolls back if exception raised

THE SAFEST RULE:
  In any data pipeline code:
    1. Always use explicit BEGIN/COMMIT (not autocommit)
    2. Always wrap writes in try/except with explicit ROLLBACK on error
    3. Test your rollback path — not just the happy path`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — ACID in Data Warehouses ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — ACID Beyond PostgreSQL" />
        <SectionTitle>ACID in Data Warehouses, Lakehouses, and NoSQL</SectionTitle>

        <Para>
          ACID was first implemented in traditional relational databases. As the
          data landscape expanded, different systems made different choices about
          which ACID properties to support, how strictly, and at what performance
          cost. Understanding these choices tells you what you can and cannot rely
          on in each system.
        </Para>

        <CompareTable
          headers={[
            { label: 'System' },
            { label: 'Atomicity', color: '#00e676' },
            { label: 'Consistency', color: '#7b61ff' },
            { label: 'Isolation', color: '#f97316' },
            { label: 'Durability', color: '#4285f4' },
          ]}
          keys={['sys', 'a', 'c', 'i', 'd']}
          rows={[
            {
              sys: 'PostgreSQL',
              a: '✓ Full — WAL-based rollback',
              c: '✓ Full — all constraints enforced',
              i: '✓ MVCC — configurable isolation levels',
              d: '✓ Full — WAL fsync before commit',
            },
            {
              sys: 'MySQL (InnoDB)',
              a: '✓ Full — redo/undo log',
              c: '✓ Full — all constraints enforced',
              i: '✓ MVCC — Repeatable Read default',
              d: '✓ Full — innodb_flush_log_at_trx_commit',
            },
            {
              sys: 'Snowflake',
              a: '✓ Full — multi-statement transactions',
              c: '⚠ Partial — constraints defined but NOT enforced at runtime',
              i: '✓ Snapshot isolation — Serializable available',
              d: '✓ Full — multi-copy cloud storage',
            },
            {
              sys: 'BigQuery',
              a: '✓ Per-statement atomicity only — no multi-statement transactions in standard DML',
              c: '⚠ Partial — no enforced FK/PK/UNIQUE at runtime',
              i: '✓ Snapshot isolation per query',
              d: '✓ Full — Colossus distributed storage',
            },
            {
              sys: 'Delta Lake (Lakehouse)',
              a: '✓ Full — transaction log ensures all-or-nothing',
              c: '⚠ Partial — schema enforced, constraints not enforced',
              i: '✓ Snapshot isolation via transaction log',
              d: '✓ Full — object storage durability',
            },
            {
              sys: 'Cassandra',
              a: '⚠ Lightweight transactions (LWT) only — expensive, use rarely',
              c: '⚠ Eventual consistency — AP system',
              i: '⚠ None by default — concurrent writes merge via LWW',
              d: '✓ Configurable consistency level on writes',
            },
            {
              sys: 'MongoDB',
              a: '✓ Multi-document transactions since v4.0 (replica set only)',
              c: '⚠ Schema validation optional — not enforced by default',
              i: '✓ Snapshot isolation in transactions',
              d: '✓ Configurable write concern (w: majority)',
            },
          ]}
        />

        <Callout type="warning">
          <strong>The warehouse consistency trap:</strong> Snowflake, BigQuery, and
          Redshift define PRIMARY KEY, UNIQUE, and FOREIGN KEY constraints in their
          DDL — but do not enforce them. You can insert duplicate primary keys,
          NULL values in NOT NULL columns, and orphaned foreign keys without any
          error. This is by design (enforcement adds overhead at warehouse scale)
          but means your data quality cannot be guaranteed by the database. It must
          be guaranteed by your pipeline code and dbt tests. Every data engineer
          working with cloud warehouses must internalise this.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — BASE — The Alternative ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — BASE: The Alternative to ACID" />
        <SectionTitle>BASE — What NoSQL Systems Do Instead</SectionTitle>

        <Para>
          Not all databases implement ACID. Many NoSQL systems — Cassandra, DynamoDB,
          CouchDB — use a different model called BASE, which trades consistency
          for availability and performance. Understanding BASE is important because
          many of the source systems data engineers ingest from are BASE systems.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              {
                letter: 'BA',
                name: 'Basically Available',
                color: '#f97316',
                desc: 'The system guarantees availability — it responds to every request, even during failures. The response may be stale, incomplete, or slightly wrong, but it will not fail with an error.',
              },
              {
                letter: 'S',
                name: 'Soft State',
                color: '#facc15',
                desc: 'The state of the system may change over time even without any new input, as the system converges toward consistency. Different nodes may temporarily have different versions of the same data.',
              },
              {
                letter: 'E',
                name: 'Eventually Consistent',
                color: '#00e676',
                desc: 'If no new updates are made, the system will eventually converge to a consistent state where all nodes agree. "Eventually" can mean milliseconds to seconds depending on replication lag.',
              },
            ].map((item) => (
              <div key={item.letter} style={{
                borderLeft: `3px solid ${item.color}`, paddingLeft: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                    background: `${item.color}18`, border: `1px solid ${item.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 900, color: item.color,
                    fontFamily: 'var(--font-display)',
                  }}>{item.letter}</div>
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: item.color,
                    fontFamily: 'var(--font-display)',
                  }}>{item.name}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <SubTitle>What BASE means for data engineering pipelines</SubTitle>

        <Para>
          When you ingest data from a BASE system (Cassandra, DynamoDB, CouchDB),
          you are ingesting from a system that may have temporarily inconsistent
          data across its nodes. The practical implications:
        </Para>

        <CodeBox label="BASE systems — what to expect when ingesting">{`CASSANDRA (AP / eventual consistency):

  Problem 1 — Duplicate writes:
    At-least-once delivery semantics mean the same event can be
    written to Cassandra more than once during network issues.
    Your extraction will see duplicate rows.
    Solution: always deduplicate on (partition_key, clustering_key)
              in your Silver transformation. Keep the row with the
              most recent writetime().

  Problem 2 — Slightly stale reads:
    If you read from a non-primary replica (LOCAL_ONE consistency),
    you may read a row version that was updated seconds ago on another
    node but hasn't replicated yet.
    Solution: use QUORUM consistency for extractions where accuracy matters.
              QUORUM requires a majority of replicas to agree → no stale reads.

  Problem 3 — Tombstones (delete markers):
    Cassandra "deletes" rows by writing a tombstone marker.
    The actual data is still present until compaction removes it.
    An extraction that happens between the tombstone write and compaction
    may see both the tombstone and the original data.
    Solution: filter out tombstones. Check TTL columns and deletion flags.

DYNAMODB (AP by default / CP with strongly consistent reads):
    Default: eventually consistent reads (may be slightly stale)
    Option:  strongly consistent reads (read from primary, 2× cost)
    For DE pipelines: ALWAYS use strongly consistent reads (ConsistentRead=True)
    to ensure you do not extract stale data.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Payment Pipeline Failure — Tracing it Through ACID</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Fintech Company · Month-End Reconciliation
          </div>

          <Para>
            It is the last day of March 2026. The finance team is running the
            month-end reconciliation between the payment gateway's records and
            your data warehouse. The payment gateway shows ₹4,82,73,841 in
            settlements for March. Your warehouse shows ₹4,81,98,293. A
            ₹75,548 discrepancy. You are assigned to find it.
          </Para>

          <Para>
            <strong>Investigation step 1 — check for pipeline failures:</strong>
            You look at the Airflow dashboard. March 14th's settlement ingestion
            pipeline shows a yellow warning — it completed but with a retry.
            The first attempt failed at 3:17 AM, the retry succeeded at 3:24 AM.
          </Para>

          <Para>
            <strong>Investigation step 2 — check atomicity:</strong> You look at
            the pipeline logs for March 14th's first attempt. It failed with a
            database connection timeout at row 8,241 of 15,892. Because the
            pipeline was not using explicit transactions, the first 8,240 rows
            were committed before the failure. The retry then loaded all 15,892
            rows again. Rows 1–8,240 exist twice.
          </Para>

          <Para>
            <strong>The root cause:</strong> The pipeline was loading settlement
            rows with plain INSERT statements without a transaction boundary.
            When the connection timed out, 8,240 rows were already committed.
            The retry's ON CONFLICT DO UPDATE clause should have handled
            duplicates — except that settlement_id (the conflict key) had no
            UNIQUE constraint in the warehouse. The INSERT silently created
            duplicate rows instead of upserting.
          </Para>

          <Para>
            <strong>The fix:</strong> You deduplicate the affected date's data,
            add a UNIQUE constraint on settlement_id, and rewrite the pipeline
            to wrap each file's worth of inserts in an explicit transaction.
            The ₹75,548 discrepancy resolves to zero. Total time to find and
            fix: four hours.
          </Para>

          <Para>
            <strong>The lesson:</strong> Two missing things — an explicit
            transaction wrapping the batch and a UNIQUE constraint on the
            business key — allowed a normal operational failure (connection
            timeout) to produce a financial data discrepancy. ACID properties
            are not academic. They are what makes the difference between data
            you can trust for financial decisions and data that quietly diverges
            from reality.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Explain the four ACID properties with a real example from data engineering.',
            a: `I will use a daily settlement pipeline that loads payment data from Stripe into a PostgreSQL database.

Atomicity: the pipeline loads one day's settlements as a single transaction — either all 15,892 settlement records for March 14th are committed together, or none of them are. If the pipeline fails on record 8,000, the entire batch is rolled back and the database contains no partial data for March 14th. The retry starts cleanly from record 1.

Consistency: the settlements table has a CHECK constraint that settlement_amount must be greater than zero and a FOREIGN KEY constraint that merchant_id must exist in the merchants table. If any record violates these constraints, the entire transaction is rejected. The database is always in a valid state — no negative settlements, no settlements for non-existent merchants.

Isolation: while the settlements pipeline is loading March 14th data in its transaction, the finance team's reconciliation query is reading the settlements table. Because PostgreSQL uses READ COMMITTED isolation by default, the reconciliation query sees only records that were committed before its statement began. It does not see the in-progress March 14th records until the pipeline commits. Both operations run simultaneously without interfering.

Durability: once the pipeline calls COMMIT, the settlements are permanent. If the server crashes one second after COMMIT returns, the data is still there when the server restarts — the WAL replay on startup recovers all committed data. The COMMIT response is only sent after the WAL is flushed to disk.`,
          },
          {
            q: 'Q2. What is the difference between READ COMMITTED and REPEATABLE READ isolation levels? When would a data engineer use each?',
            a: `The difference is in what snapshot of the database each statement in a transaction sees.

In READ COMMITTED (PostgreSQL's default), each individual SQL statement within a transaction sees a fresh snapshot of the database — the latest committed state at the moment that statement starts executing. This means if two SELECT statements run within the same transaction and a concurrent transaction commits changes between them, the two SELECTs can return different results. This is called a non-repeatable read.

In REPEATABLE READ, the entire transaction sees a single consistent snapshot — the committed state at the moment the transaction began. Any changes committed by other transactions after this transaction started are invisible. Running the same SELECT twice in this transaction always returns the same result, regardless of concurrent commits.

For a data engineer: READ COMMITTED is appropriate for most pipeline writes — you want to see the latest committed data in each read but do not need perfect consistency across multiple reads within the same transaction.

REPEATABLE READ is appropriate for long-running analytical extraction queries. If I am extracting all of yesterday's orders in a transaction that takes 15 minutes, I want a consistent snapshot of the data as it was when I started. New orders committed during my extraction should not appear mid-extract (which could cause the same order to be counted twice if the query runs in multiple chunks). Using REPEATABLE READ ensures the 15-minute extraction sees a frozen view of the database, even as the application continues writing new orders.`,
          },
          {
            q: 'Q3. Your pipeline loads 1 million rows into a PostgreSQL table in one transaction. What are the problems with this and how would you fix it?',
            a: `Loading 1 million rows in a single transaction creates five significant problems.

First, lock duration. The transaction holds locks on the target table for the entire duration of the load — potentially 30–60 minutes. Any other query that needs an exclusive lock (like an ALTER TABLE or VACUUM FULL) is blocked for that entire period.

Second, failure cost. If the load fails at row 900,000, all 900,000 previous rows are rolled back. The retry must start from row 1 and repeat all 900,000 rows of work. At large scale this means a single transient failure can cost hours of re-processing.

Third, WAL accumulation. All 1 million row operations are written to the WAL before any checkpoint can reclaim the space. Large WAL accumulation slows down WAL archiving and replication, and prevents VACUUM from reclaiming dead rows.

Fourth, memory consumption. PostgreSQL's transaction state (rollback segments, lock table entries) grows with the number of in-progress operations. A very large transaction can exhaust shared memory.

Fifth, visibility delay. No rows are visible to other queries until the entire 1 million row load commits. Analytics queries cannot start reading partial results until the full load completes.

The fix is to batch the load into manageable transaction sizes — typically 10,000–100,000 rows per transaction. Each batch commits independently. On failure, only the current batch is rolled back and retried from a checkpoint. The pipeline becomes resumable, locking impact is minimal, WAL accumulation is controlled, and partial results are visible progressively. This batched approach combined with checkpoint tracking (saving the last successfully committed batch position) makes the pipeline both atomic at the batch level and resumable at the pipeline level.`,
          },
          {
            q: 'Q4. What does "eventually consistent" mean and why does it create extra work for data engineers ingesting from Cassandra?',
            a: `Eventual consistency means that if no new updates are made to a distributed system, all nodes will eventually converge to the same state — but there is no guarantee about when, and during the convergence period different nodes may have different versions of the same data.

Cassandra is designed as an AP system (available and partition-tolerant). When a write is sent to Cassandra, it is replicated to multiple nodes. Whether the write is acknowledged before or after all replicas have it depends on the configured consistency level. At the default LOCAL_ONE level, the write is acknowledged after just one replica confirms it — the other replicas receive the data eventually through a background gossip process.

This creates three concrete challenges for data engineers.

The first is duplicate data. Cassandra uses an at-least-once delivery model for replication. During network issues, the same write can be delivered to a node multiple times. If you extract data from multiple Cassandra nodes, you can receive the same row from different nodes — each node has committed its copy legitimately. Your Silver transformation must explicitly deduplicate using the row's primary key, keeping the version with the latest timestamp.

The second is stale reads. If you read from a replica that has not yet received the latest updates, you see an older version of the data. For DE pipelines where accuracy matters, use QUORUM consistency on reads — this requires a majority of replicas to agree on the value before returning it, eliminating stale reads at the cost of slightly higher latency.

The third is out-of-order delivery. Events written to Cassandra by a distributed application may arrive at different replicas in different orders. Your pipeline must use the write timestamp (WRITETIME() function in Cassandra) rather than insertion order to correctly sequence events.`,
          },
          {
            q: 'Q5. A colleague says "Snowflake is fully ACID compliant so I don\'t need to add data quality checks in my dbt models." How do you respond?',
            a: `This is a common and consequential misunderstanding. Snowflake does provide some ACID guarantees, but in a way that is meaningfully different from PostgreSQL, and the difference is precisely what makes dbt data quality tests necessary.

Snowflake provides atomicity at the transaction and statement level — a multi-statement transaction either commits fully or rolls back. It provides durability through multi-copy cloud storage. It provides snapshot isolation through its time travel and multi-cluster concurrency model. These three are genuine and reliable.

What Snowflake does not do is enforce consistency constraints at runtime. Snowflake allows you to define PRIMARY KEY, UNIQUE, and FOREIGN KEY constraints in your DDL, and even marks them as RELY (trusted by the optimizer) — but it does not validate them when data is inserted. You can INSERT duplicate primary keys into a Snowflake table and it will succeed without error. You can INSERT rows with customer_id values that have no corresponding row in the customers table. You can INSERT NULLs into columns you defined as NOT NULL. Snowflake will accept all of them.

This means the C in ACID — Consistency — is only partially provided by Snowflake. The database schema is descriptive, not prescriptive. The enforcement burden shifts entirely to the data engineering team.

This is exactly what dbt tests are for. A unique test on order_id catches the duplicate primary keys Snowflake allows. A not_null test on customer_id catches the NULLs Snowflake accepts. A relationships test verifies that every customer_id in orders exists in customers. These tests provide the consistency enforcement that the warehouse engine deliberately delegates to the application layer. Removing them does not make the data trustworthy — it just means the errors are discovered later, by analysts, after they have already influenced decisions.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `ERROR: could not serialize access due to concurrent update — ERROR: could not serialize access due to concurrent update (SQLState: 40001)`,
            cause: 'A SERIALIZABLE isolation level transaction detected a conflict with a concurrent transaction and aborted to preserve serializability. This is the correct behaviour — the database chose to abort one transaction rather than allow results that could not have been produced by any serial (one-at-a-time) execution of the transactions.',
            fix: 'Retry the aborted transaction. Serialization failures are expected under SERIALIZABLE isolation and must be handled with retry logic in your application code. In Python: catch psycopg2.errors.SerializationFailure and retry with exponential backoff up to N times. If serialization failures are frequent, consider whether SERIALIZABLE is genuinely needed or whether REPEATABLE READ with application-level conflict detection is sufficient.',
          },
          {
            error: `Pipeline produced duplicate settlements — settlement_id 9847291 appears 2 times in the settlements table`,
            cause: 'The pipeline loaded settlements without an explicit transaction and without a UNIQUE constraint on settlement_id. When a connection failure occurred partway through the load, the successfully-written rows were already committed. The retry re-inserted all rows including those already committed. Since there was no UNIQUE constraint to reject the duplicate insert, both copies were accepted silently.',
            fix: 'Three changes are needed. First: add a UNIQUE constraint on settlement_id (ALTER TABLE settlements ADD CONSTRAINT uq_settlement_id UNIQUE (settlement_id)). Second: change INSERT to INSERT ... ON CONFLICT DO UPDATE to handle any existing duplicates idempotently. Third: wrap each file or batch in an explicit transaction so that a mid-batch failure rolls back the entire batch rather than committing partial data. Deduplicate the existing duplicates by keeping one copy: DELETE FROM settlements WHERE ctid NOT IN (SELECT MIN(ctid) FROM settlements GROUP BY settlement_id).',
          },
          {
            error: `Transaction timeout: transaction has been running for 7200 seconds — idle_in_transaction_session_timeout exceeded`,
            cause: 'A pipeline opened a database transaction (explicitly or implicitly) and then stopped executing SQL — either because the pipeline code is doing a long computation between queries, waiting for an API response, or crashed in a way that left the connection open with an uncommitted transaction. The database\'s idle_in_transaction_session_timeout setting terminated the connection after 2 hours of inactivity within an open transaction.',
            fix: 'Review the pipeline code for long operations between SQL statements that should not be inside a transaction. Pattern to fix: fetch data from API (outside transaction) → open transaction → write to database → commit (inside transaction is only the write, not the fetch). Never open a database transaction before an external API call. If the pipeline genuinely needs a long transaction, increase idle_in_transaction_session_timeout on the database — but first verify that holding locks for that duration is acceptable.',
          },
          {
            error: `Read inconsistency: COUNT(*) of today's orders ran twice within the same script and returned 48,234 and 48,891 respectively`,
            cause: 'The script is running two separate queries without a transaction or with READ COMMITTED isolation. Between the two COUNT queries, new orders were inserted and committed by the application. Each COUNT query sees a fresh snapshot (READ COMMITTED), so the second count includes the newly committed orders. This is a non-repeatable read — expected behaviour under READ COMMITTED but undesirable for a report that needs a consistent point-in-time count.',
            fix: 'Wrap both COUNT queries in a single transaction with REPEATABLE READ isolation: SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; BEGIN; first_count = SELECT COUNT(*) FROM orders WHERE date = TODAY; second_count = SELECT COUNT(*) FROM orders WHERE date = TODAY; COMMIT. Both queries now read from the same snapshot taken at BEGIN, producing consistent results regardless of concurrent inserts.',
          },
          {
            error: `Data loss after pipeline restart: pipeline wrote 80,000 rows, crashed, restarted, and now table has only 23,000 rows`,
            cause: 'The pipeline was wrapping its entire load in one large transaction and writing data to a temporary table, then doing a TRUNCATE + INSERT to replace the target table at the end. The restart path has a bug: on restart it truncates the target table (removing the 80,000 committed rows) but then fails before loading the new data, leaving the table empty or with only partial rows from the current run.',
            fix: 'Use an atomic swap pattern: write all new data to a staging table first, then perform the swap as a single atomic transaction: BEGIN; TRUNCATE target_table; INSERT INTO target_table SELECT * FROM staging_table; COMMIT. If any step fails, the entire swap is rolled back and the target table is unchanged. Alternatively, use INSERT ... ON CONFLICT DO UPDATE (upsert) directly to the target table instead of truncate-and-reload, so partial runs leave the existing data intact rather than wiping it.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'ACID solves four problems that arise in concurrent databases: partial updates (Atomicity), constraint violations after update (Consistency), reading in-progress changes (Isolation), and losing committed data on crash (Durability). Every database without ACID is vulnerable to all four.',
        'Atomicity guarantees all-or-nothing execution. A transaction with ten operations either commits all ten or rolls back all ten. No partial state. Implemented via the WAL — changes are only made permanent after the commit record is flushed to disk.',
        'Consistency ensures the database moves from one valid state to another valid state. The database enforces schema constraints automatically. Business rules not expressible as constraints must be enforced by your pipeline code and data quality tests.',
        'Isolation prevents transactions from seeing each other\'s in-progress changes. Four isolation levels trade correctness for performance: READ UNCOMMITTED (no protection), READ COMMITTED (no dirty reads, PostgreSQL default), REPEATABLE READ (no non-repeatable reads), SERIALIZABLE (full isolation, slowest).',
        'Durability guarantees that committed data survives crashes. Implemented via WAL fsync — the commit response is only sent after the WAL is on durable storage. Every committed transaction can be recovered on restart by replaying the WAL.',
        'Transactions must be correctly sized for pipelines. One million rows in one transaction holds locks for the entire duration, wastes all work on failure, and consumes enormous WAL space. Batch into 10,000–100,000 row transactions with checkpoint tracking for resumability.',
        'Autocommit is ON by default in most SQL clients — every statement is its own transaction. In Python psycopg2 it is OFF — you must call conn.commit() explicitly. Understand your client\'s default and always use explicit transaction control for pipeline code.',
        'Cloud data warehouses (Snowflake, BigQuery, Redshift) provide atomicity, isolation, and durability — but do NOT enforce consistency constraints (PRIMARY KEY, UNIQUE, FOREIGN KEY, NOT NULL) at runtime. Your dbt tests are the consistency enforcement layer for warehouse data.',
        'BASE (Basically Available, Soft State, Eventually Consistent) is the alternative to ACID used by Cassandra, DynamoDB, and other AP NoSQL systems. BASE systems trade consistency for availability. Always deduplicate data extracted from BASE systems — at-least-once delivery means duplicates are expected.',
        'The most common ACID violation in production data pipelines is not a theoretical failure — it is missing explicit transaction boundaries on batch writes combined with missing UNIQUE constraints on business keys. These two omissions together turn a routine connection timeout into a financial data discrepancy.',
      ]} />

    </LearnLayout>
  )
}