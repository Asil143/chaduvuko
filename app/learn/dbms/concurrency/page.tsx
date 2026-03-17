import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Concurrency Control — Locks, Deadlocks, Isolation Levels | DBMS | Chaduvuko',
  description:
    'How databases handle thousands of simultaneous users safely. Lost updates, dirty reads, phantom reads, Two-Phase Locking, deadlocks, isolation levels, and MVCC explained.',
}

export default function ConcurrencyControl() {
  return (
    <LearnLayout
      title="Concurrency Control"
      description="10,000 users hitting the same database simultaneously. How do you stop them from destroying each other's data? This is the answer."
      section="DBMS"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      {/* ── WHY CONCURRENCY IS HARD ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          When only one transaction runs at a time, databases are simple. But in reality,
          thousands of transactions run simultaneously — and without careful control, they
          interfere with each other in ways that corrupt data silently.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          There are 4 classic concurrency problems. Every isolation level is defined by
          which of these problems it prevents.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              name: 'Lost Update', color: '#ff4757',
              scenario: 'Two users update the same row simultaneously.',
              example: 'T1 reads stock=10, T2 reads stock=10. T1 sets stock=9 (sold 1). T2 sets stock=9 (sold 1 independently). Final: stock=9. But 2 items were sold — should be 8.',
              consequence: 'One update is completely overwritten and lost. Inventory appears higher than reality.',
            },
            {
              name: 'Dirty Read', color: '#f97316',
              scenario: 'A transaction reads data that another transaction has changed but not yet committed.',
              example: 'T1 updates salary from ₹50k to ₹80k but has not committed. T2 reads ₹80k. T1 then rolls back. T2 has seen data that never officially existed.',
              consequence: 'A transaction makes decisions based on data that was never real. Payment systems handling dirty reads would be catastrophic.',
            },
            {
              name: 'Non-Repeatable Read', color: '#facc15',
              scenario: 'A transaction reads the same row twice and gets different values because another transaction modified it in between.',
              example: 'T1 reads product price = ₹999. T2 updates price to ₹1299 and commits. T1 reads price again = ₹1299. Same query, different result.',
              consequence: 'Reports and calculations based on "consistent snapshot" become unreliable. A bank report that reads your balance twice gets two different numbers.',
            },
            {
              name: 'Phantom Read', color: '#8b5cf6',
              scenario: 'A transaction re-executes a query and finds new rows that appeared because another transaction inserted data in between.',
              example: 'T1 queries: SELECT * FROM orders WHERE amount > 1000 — gets 50 rows. T2 inserts a new order with amount=2000 and commits. T1 runs same query again — gets 51 rows. A "phantom" row appeared.',
              consequence: 'Aggregate operations (COUNT, SUM) return different results in the same transaction. Statistical reports are unreliable.',
            },
          ].map((item) => (
            <div key={item.name} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12,  fontStyle: 'italic' }}>{item.scenario}</div>
              <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10,  background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>{item.example}</div>
              <div style={{ fontSize: 13, color: item.color, fontFamily: 'Inter, sans-serif' }}><strong>Consequence:</strong> {item.consequence}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCKS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Lock-Based Concurrency Control
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          The most common approach to concurrency control is locking. Before a transaction
          accesses data, it requests a lock. Other transactions must wait if their requested
          lock conflicts.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Shared Lock (S-Lock)</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Also called a Read Lock. Multiple transactions can hold a shared lock on the same data simultaneously — they're all just reading.</p>
            <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 10px' }}>T1 holds S-Lock → T2 can also get S-Lock ✓<br />T1 holds S-Lock → T3 wants X-Lock → Wait ✗</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #f97316', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Exclusive Lock (X-Lock)</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Also called a Write Lock. Only one transaction can hold an exclusive lock — no other transaction can read OR write the same data.</p>
            <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 10px' }}>T1 holds X-Lock → T2 wants S-Lock → Wait ✗<br />T1 holds X-Lock → T2 wants X-Lock → Wait ✗</div>
          </div>
        </div>

        {/* Compatibility matrix */}
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Lock Compatibility Matrix</div>
          <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['', 'T2 wants S-Lock', 'T2 wants X-Lock'].map((h) => (
                  <th key={h} style={{ padding: '10px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['T1 holds S-Lock', '✓ Compatible', '✗ Wait'],
                ['T1 holds X-Lock', '✗ Wait', '✗ Wait'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 20px', color: j === 0 ? 'var(--text2)' : cell.includes('✓') ? 'var(--accent)' : '#ff4757', fontWeight: j === 0 ? 600 : 700, textAlign: 'center', fontFamily: j === 0 ? 'Inter, sans-serif' : 'var(--font-mono)', background: j > 0 && i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 2PL ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Two-Phase Locking (2PL) — Guaranteeing Serializability
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          2PL is a protocol that guarantees concurrent transactions produce results equivalent to
          some serial execution. A transaction following 2PL moves through exactly two phases:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>Phase 1 — Growing Phase</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>The transaction acquires locks. It can request new locks but cannot release any existing lock. Lock count only goes up.</p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>Phase 2 — Shrinking Phase</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>The transaction releases locks. Once the first lock is released, no new locks can be acquired. Lock count only goes down.</p>
          </div>
        </div>
        <Callout type="tip">
          The point where a transaction transitions from growing to shrinking phase is called
          the <strong>lock point</strong>. 2PL guarantees serializability but does NOT prevent deadlocks.
        </Callout>
      </section>

      {/* ── DEADLOCKS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Deadlocks — When Two Transactions Wait for Each Other
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          A deadlock occurs when two or more transactions are waiting for each other to release
          locks — creating a circular wait that nobody can break out of.
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, marginBottom: 20 }}>
          <div style={{ color: '#0078d4' }}>T1: Lock(Account A) ──────▶ Wants Lock(Account B) ──▶ Waiting for T2</div>
          <div style={{ color: '#f97316' }}>T2: Lock(Account B) ──────▶ Wants Lock(Account A) ──▶ Waiting for T1</div>
          <div style={{ color: '#ff4757', marginTop: 8 }}>// T1 waits for T2. T2 waits for T1. Both wait forever. Deadlock.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
          {[
            { approach: 'Deadlock Detection', color: '#0078d4', desc: 'Periodically build a "wait-for graph". If a cycle exists → deadlock. Pick a victim transaction to abort (usually the newest or smallest). The other transactions proceed.' },
            { approach: 'Deadlock Prevention', color: 'var(--accent)', desc: 'Assign timestamps to transactions. Younger transactions either wait (wait-die) or are aborted (wound-wait) if they request a lock held by an older transaction.' },
            { approach: 'Deadlock Avoidance', color: '#f97316', desc: 'Require transactions to declare all locks they need upfront. Allocate all at once or not at all. Impractical for most real applications.' },
          ].map((item) => (
            <div key={item.approach} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.approach}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ISOLATION LEVELS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Isolation Levels — The Trade-off Between Safety and Speed
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          Maximum isolation = maximum safety but minimum concurrency (slowest). Minimum isolation = maximum speed but maximum risk of anomalies.
          The 4 standard isolation levels let you choose where on that spectrum you sit.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Isolation Level', 'Dirty Read', 'Non-Repeatable Read', 'Phantom Read', 'Performance'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['READ UNCOMMITTED', '✓ Possible', '✓ Possible', '✓ Possible', '⚡ Fastest'],
                ['READ COMMITTED', '✗ Prevented', '✓ Possible', '✓ Possible', '⚡ Fast'],
                ['REPEATABLE READ', '✗ Prevented', '✗ Prevented', '✓ Possible', '⚡ Medium'],
                ['SERIALIZABLE', '✗ Prevented', '✗ Prevented', '✗ Prevented', '🐌 Slowest'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 14px', color: j === 0 ? 'var(--text)' : cell.includes('✓') ? '#ff4757' : cell.includes('✗') ? 'var(--accent)' : 'var(--muted)', fontWeight: j === 0 ? 700 : 400, fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>
          ✓ = anomaly can happen &nbsp;|&nbsp; ✗ = anomaly is prevented
        </div>
      </section>

      {/* ── MVCC ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          MVCC — How PostgreSQL Avoids Most Locking
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          <strong style={{ color: 'var(--text)' }}>Multi-Version Concurrency Control (MVCC)</strong> is
          the approach PostgreSQL, Oracle, and MySQL InnoDB use to handle concurrency without
          blocking readers with writers. Instead of locking, the database keeps
          <strong style={{ color: 'var(--text)' }}> multiple versions</strong> of each row.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.85,  marginBottom: 12 }}>
            When T1 updates a row, PostgreSQL doesn't overwrite the old row.
            It creates a <strong style={{ color: 'var(--text)' }}>new version</strong> of the row and marks the old version as expired.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px' }}>
            <div><span style={{ color: 'var(--muted)' }}>Old version (xmin=100, xmax=200):</span> <span style={{ color: '#ff4757' }}>salary = ₹50,000</span> <span style={{ color: 'var(--muted)' }}>(visible to T2 started before T1 committed)</span></div>
            <div><span style={{ color: 'var(--muted)' }}>New version (xmin=200, xmax=∞):</span>  <span style={{ color: 'var(--accent)' }}>salary = ₹80,000</span> <span style={{ color: 'var(--muted)' }}>(visible to transactions started after T1 committed)</span></div>
          </div>
        </div>
        <Callout type="tip">
          MVCC means readers never block writers and writers never block readers. T2 reading
          the salary while T1 is updating it sees the old committed value — no lock needed.
          This is why PostgreSQL can handle thousands of concurrent queries without everything
          grinding to a halt waiting for locks.
        </Callout>
      </section>

      <KeyTakeaways items={[
        '4 concurrency problems: Lost Update, Dirty Read, Non-Repeatable Read, Phantom Read. Every isolation level is defined by which of these it prevents.',
        'Shared (S) lock: multiple readers allowed. Exclusive (X) lock: nobody else can read or write. S+S = compatible. Everything else = wait.',
        'Two-Phase Locking (2PL): Growing phase (acquire only) → Shrinking phase (release only). Guarantees serializability but not deadlock-free.',
        'Deadlock: circular wait where T1 waits for T2 and T2 waits for T1. Solved by detection (abort victim) or prevention (timestamp protocols).',
        '4 isolation levels: READ UNCOMMITTED < READ COMMITTED < REPEATABLE READ < SERIALIZABLE. Higher = safer but slower.',
        'MVCC: keeps multiple row versions so readers never block writers. PostgreSQL\'s secret weapon for high concurrency without heavy locking.',
      ]} />
    </LearnLayout>
  )
}