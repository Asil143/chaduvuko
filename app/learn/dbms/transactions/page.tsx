import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Transactions & ACID Properties | DBMS | Chaduvuko',
  description:
    'What transactions are, why they exist, and how ACID properties — Atomicity, Consistency, Isolation, Durability — keep your data correct even when everything goes wrong.',
}

export default function Transactions() {
  return (
    <LearnLayout
      title="Transactions & ACID Properties"
      description="The mechanism that keeps your bank balance correct, your Flipkart order paid-and-placed simultaneously, and your data honest even when servers crash mid-operation."
      section="DBMS"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      {/* ── WHAT IS A TRANSACTION ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Imagine you're transferring ₹500 from your account to a friend's via Paytm.
          The operation has two steps:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, marginBottom: 20 }}>
          <div><span style={{ color: 'var(--accent)' }}>Step 1:</span> <span style={{ color: 'var(--text2)' }}>Deduct ₹500 from your account (balance: ₹5000 → ₹4500)</span></div>
          <div><span style={{ color: 'var(--accent)' }}>Step 2:</span> <span style={{ color: 'var(--text2)' }}>Add ₹500 to friend's account (balance: ₹2000 → ₹2500)</span></div>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Now imagine the server crashes after Step 1 completes but before Step 2 runs.
          Your ₹500 is gone. Your friend got nothing. The money vanished from the system.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          This is exactly the problem a <strong style={{ color: 'var(--text)' }}>transaction</strong> solves.
          A transaction groups multiple operations into a single logical unit that either
          <strong style={{ color: 'var(--text)' }}> completely succeeds or completely fails</strong> — nothing in between.
        </p>
        <Callout type="info">
          A transaction is a sequence of one or more database operations that must be executed as
          a single, indivisible unit. A transaction moves the database from one valid state to
          another valid state. Partial completion is never acceptable.
        </Callout>
      </section>

      {/* ── ACID ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>
          ACID Properties
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28, fontFamily: 'Inter, sans-serif' }}>
          ACID is the set of four properties every reliable database transaction must satisfy.
          The acronym was coined by Andreas Reuter and Theo Härder in 1983. These four
          properties together guarantee that database transactions are processed reliably.
        </p>

        {[
          {
            letter: 'A', word: 'Atomicity', color: '#0078d4',
            tagline: '"All or Nothing"',
            def: 'A transaction is treated as a single, indivisible unit. Either ALL operations in the transaction succeed and are committed, or NONE of them are applied — the entire transaction is rolled back.',
            scenario: 'Bank transfer: debit ₹500 from A, credit ₹500 to B.',
            pass: 'Both succeed → COMMIT. Both changes become permanent.',
            fail: 'Step 2 fails (network error) → ROLLBACK. Step 1 is also undone. Account A gets its ₹500 back. No money is lost.',
            realWorld: 'The debit-without-credit scenario literally cannot happen with atomicity enforced. The two operations are treated as one.',
          },
          {
            letter: 'C', word: 'Consistency', color: 'var(--accent)',
            tagline: '"Valid State to Valid State"',
            def: 'A transaction must bring the database from one valid state to another valid state. All integrity constraints, rules, and triggers must be satisfied before and after the transaction. Consistency is partly the DBMS\'s job and partly the application developer\'s.',
            scenario: 'Rule: account balance cannot go below ₹0.',
            pass: 'Transfer of ₹500 from account with ₹1000 → allowed. Balance goes from ₹1000 to ₹500. Still ≥ ₹0.',
            fail: 'Transfer of ₹1500 from account with ₹1000 → blocked. Would create negative balance. Transaction rejected.',
            realWorld: 'Consistency rules are defined via CHECK constraints, NOT NULL, UNIQUE, referential integrity, and triggers. The DBMS enforces them automatically.',
          },
          {
            letter: 'I', word: 'Isolation', color: '#f97316',
            tagline: '"Transactions Don\'t See Each Other\'s Work-in-Progress"',
            def: 'Concurrent transactions execute as if they were running one at a time, in isolation. The intermediate state of one transaction is not visible to other transactions. The final result is as if they ran serially.',
            scenario: 'Two people booking the last seat on a Flipkart product simultaneously.',
            pass: 'With proper isolation: Transaction 1 reads qty=1, reserves it, decrements to 0, commits. Transaction 2 then reads qty=0 and shows "Out of Stock".',
            fail: 'Without isolation: Both T1 and T2 read qty=1 simultaneously. Both reserve it. Both decrement to 0 and commit. Stock goes to -1. Two people paid for one item.',
            realWorld: 'This is the problem that makes concurrency control necessary. There are 4 isolation levels with different trade-offs — covered in the next module.',
          },
          {
            letter: 'D', word: 'Durability', color: '#8b5cf6',
            tagline: '"Once Committed, Always Committed"',
            def: 'Once a transaction is committed, its effects are permanent — even if the server crashes, power fails, or the OS panics immediately after. Committed data is written to durable (non-volatile) storage.',
            scenario: 'You place an order on Zomato. You see "Order Confirmed". Server crashes 0.001 seconds later.',
            pass: 'Your order still exists when the server restarts. The COMMIT was written to disk before being acknowledged.',
            fail: 'Without durability: server crash erases your order. You were charged but the restaurant never received it.',
            realWorld: 'Implemented using Write-Ahead Logging (WAL) — every change is written to a persistent log BEFORE being applied to the database. Covered in the Recovery module.',
          },
        ].map((prop) => (
          <div key={prop.letter} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${prop.color}`, borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: prop.color, fontFamily: 'Syne, sans-serif', lineHeight: 1 }}>{prop.letter}</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>{prop.word}</div>
                <div style={{ fontSize: 13, color: prop.color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{prop.tagline}</div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>{prop.def}</p>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Scenario: {prop.scenario}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}><span style={{ color: 'var(--accent)' }}>✓ With:</span> {prop.pass}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}><span style={{ color: '#ff4757' }}>✕ Without:</span> {prop.fail}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>💡 {prop.realWorld}</div>
          </div>
        ))}
      </section>

      {/* ── TRANSACTION STATES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Transaction States
        </h2>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, overflowX: 'auto', marginBottom: 20 }}>
          <div><span style={{ color: '#0078d4' }}>Active</span> <span style={{ color: 'var(--muted)' }}>──────▶</span> <span style={{ color: '#f97316' }}>Partially Committed</span> <span style={{ color: 'var(--muted)' }}>──────▶</span> <span style={{ color: 'var(--accent)' }}>Committed ✓</span></div>
          <div style={{ paddingLeft: 20 }}><span style={{ color: 'var(--muted)' }}>│ (error)                      │ (fail)               </span></div>
          <div style={{ paddingLeft: 20 }}><span style={{ color: 'var(--muted)' }}>▼                              ▼</span></div>
          <div style={{ paddingLeft: 20 }}><span style={{ color: '#ff4757' }}>Failed ──────────────────────▶ Aborted / Rolled Back ✕</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 10 }}>
          {[
            { state: 'Active', color: '#0078d4', desc: 'Transaction is executing. Operations are running.' },
            { state: 'Partially Committed', color: '#f97316', desc: 'Last operation executed. Not yet committed to disk.' },
            { state: 'Committed', color: 'var(--accent)', desc: 'All operations successful and permanently saved.' },
            { state: 'Failed', color: '#ff4757', desc: 'Error occurred. Transaction cannot proceed.' },
            { state: 'Aborted', color: '#ff4757', desc: 'Rolled back. Database restored to pre-transaction state.' },
          ].map((item) => (
            <div key={item.state} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{item.state}</div>
              <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT THIS LOOKS LIKE AT WORK ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Razorpay Checkout — 5 Operations, 1 Transaction
        </h2>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
            When you click "Pay ₹1,299" on a Flipkart checkout page, Razorpay runs roughly these
            5 operations — wrapped in a single transaction:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {[
              'Verify card details and authorization with the bank',
              'Deduct ₹1,299 from customer payment method',
              'Credit ₹1,299 (minus fee) to merchant (Flipkart) account',
              'Create a payment record in the payments table',
              'Update the order status to "payment_confirmed"',
            ].map((op, i) => (
              <div key={op} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 5, padding: '2px 8px', flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{op}</span>
              </div>
            ))}
          </div>
          <Callout type="tip">
            If ANY one of these 5 steps fails — bank declines, network timeout, disk error — the
            entire transaction is rolled back. Operations 1 through 4 are undone. The customer
            is not charged. The order status stays "pending". The system goes back to exactly
            the state it was in before the checkout attempt. This is ACID in production.
          </Callout>
        </div>
      </section>

      <KeyTakeaways items={[
        'A transaction is a group of operations that must execute as a single all-or-nothing unit. Partial success is never acceptable.',
        'Atomicity: all operations succeed or all are rolled back. The bank transfer either completes fully or is completely undone.',
        'Consistency: transactions move the database from one valid state to another. Integrity constraints are always satisfied.',
        'Isolation: concurrent transactions cannot see each other\'s intermediate states. Prevents data corruption from simultaneous access.',
        'Durability: committed transactions survive any failure — power cuts, server crashes, OS panics. Implemented via Write-Ahead Logging.',
        'Transaction states: Active → Partially Committed → Committed (success path) or Active → Failed → Aborted (failure path).',
      ]} />
    </LearnLayout>
  )
}