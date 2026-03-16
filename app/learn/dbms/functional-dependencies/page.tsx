import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Functional Dependencies & Armstrong\'s Axioms | DBMS | Chaduvuko',
  description:
    "The math behind normalization. What functional dependencies are, Armstrong's Axioms, attribute closure, canonical cover — with worked examples.",
}

export default function FunctionalDependencies() {
  return (
    <LearnLayout
      title="Functional Dependencies"
      description="The mathematical backbone of normalization. Once you understand functional dependencies, normalization rules stop being memorized rules and start making logical sense."
      section="DBMS"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      {/* ── SECTION 1 — WHAT IS AN FD ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          A <strong style={{ color: 'var(--text)' }}>functional dependency</strong> is a relationship
          between attributes. We say "X functionally determines Y" (written X → Y) if knowing the
          value of X tells you exactly one value of Y.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
            <strong style={{ color: 'var(--accent)' }}>X → Y means:</strong> For any two tuples in the relation,
            if they have the same value for X, they must have the same value for Y.
            In other words — X determines Y. Y depends on X.
          </div>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Real examples that make this click immediately:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, marginBottom: 24 }}>
          <div><span style={{ color: 'var(--accent)' }}>student_id → student_name</span><span style={{ color: 'var(--muted)' }}>  // One ID = one student name always</span></div>
          <div><span style={{ color: 'var(--accent)' }}>employee_id → department</span><span style={{ color: 'var(--muted)' }}>   // One employee = one department</span></div>
          <div><span style={{ color: '#f97316' }}>city → country</span><span style={{ color: 'var(--muted)' }}>             // Knowing the city tells you the country</span></div>
          <div style={{ marginTop: 8, color: '#ff4757' }}>student_name → student_id  <span style={{ color: 'var(--muted)' }}>// ✕ NOT valid — two students can share a name</span></div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>Trivial vs Non-Trivial FDs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Trivial FD</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>X → Y where Y is a subset of X. Always true, tells you nothing useful.</p>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '8px 10px' }}>{'{student_id, name} → student_id'}<br />Y is already in X — trivially true.</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Non-Trivial FD</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>X → Y where Y is NOT a subset of X. These are the meaningful dependencies.</p>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '8px 10px' }}>{'student_id → student_name'}<br />Y is not part of X — meaningful.</div>
          </div>
        </div>
      </section>

      {/* ── ARMSTRONG'S AXIOMS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>
          Armstrong's Axioms — The 3 Foundation Rules
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          William Armstrong defined a complete set of inference rules in 1974. Using just these 3
          axioms, you can derive every valid functional dependency from a given set. They are sound
          (produce only valid FDs) and complete (can derive all valid FDs).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              name: 'Reflexivity', color: '#0078d4',
              formal: 'If Y ⊆ X, then X → Y',
              plain: 'Any attribute set always determines itself or any of its subsets.',
              example: '{student_id, name} → {student_id}  — trivially always true',
            },
            {
              name: 'Augmentation', color: 'var(--accent)',
              formal: 'If X → Y, then XZ → YZ',
              plain: 'If X determines Y, adding the same extra attribute Z to both sides keeps the dependency valid.',
              example: 'student_id → name  ∴  {student_id, age} → {name, age}',
            },
            {
              name: 'Transitivity', color: '#f97316',
              formal: 'If X → Y and Y → Z, then X → Z',
              plain: 'If X determines Y, and Y determines Z, then X also determines Z indirectly.',
              example: 'emp_id → dept_id  AND  dept_id → dept_name  ∴  emp_id → dept_name',
            },
          ].map((axiom) => (
            <div key={axiom.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${axiom.color}`, borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{axiom.name}</div>
              <div style={{ fontSize: 13, color: axiom.color, fontFamily: 'var(--font-mono)', background: `${axiom.color}10`, border: `1px solid ${axiom.color}25`, borderRadius: 6, padding: '6px 12px', display: 'inline-block', marginBottom: 12 }}>{axiom.formal}</div>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{axiom.plain}</p>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '8px 12px' }}>{axiom.example}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>3 Derived Rules (from the Axioms)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
          {[
            { name: 'Union', rule: 'X→Y and X→Z ∴ X→YZ', plain: 'If X determines Y and Z separately, it determines both together.' },
            { name: 'Decomposition', rule: 'X→YZ ∴ X→Y and X→Z', plain: 'If X determines YZ together, it determines each one individually.' },
            { name: 'Pseudotransitivity', rule: 'X→Y and WY→Z ∴ WX→Z', plain: 'Generalised transitivity with an extra attribute W.' },
          ].map((item) => (
            <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 8, background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 5, padding: '5px 10px' }}>{item.rule}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{item.plain}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ATTRIBUTE CLOSURE ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Attribute Closure — The Key to Finding Candidate Keys
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          The <strong style={{ color: 'var(--text)' }}>closure of a set of attributes X</strong> (written X⁺) is
          the complete set of attributes that can be determined by X using the given functional dependencies.
          To check if X is a candidate key: compute X⁺ — if it equals all attributes in the relation, X is a superkey.
          If no proper subset of X also gives all attributes, X is a candidate key.
        </p>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>Worked Example — Step by Step</div>
          <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
            Relation R(A, B, C, D, E) with FDs: <br />
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>A→B, B→C, C→D, A→E</code>
            <br />Find: Is A a candidate key?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: 'Start', result: '{A}', reason: 'Begin with just A' },
              { step: 'Apply A→B', result: '{A, B}', reason: 'A determines B, add B' },
              { step: 'Apply B→C', result: '{A, B, C}', reason: 'B determines C, add C' },
              { step: 'Apply C→D', result: '{A, B, C, D}', reason: 'C determines D, add D' },
              { step: 'Apply A→E', result: '{A, B, C, D, E}', reason: 'A determines E, add E' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 120 }}>{item.step}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 5, padding: '3px 10px' }}>{item.result}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>{item.reason}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 8, fontSize: 14, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>
            <strong style={{ color: 'var(--accent)' }}>A⁺ = {'{A,B,C,D,E}'}</strong> — equals all attributes! A is a superkey.
            No proper subset of A (just {'{}'}) gives all attributes, so <strong style={{ color: 'var(--accent)' }}>A is also a candidate key.</strong>
          </div>
        </div>
        <Callout type="tip">
          The attribute closure algorithm is the most tested topic in GATE DBMS questions.
          Practice computing closures by hand until it's automatic. It's also the fastest
          way to verify if a given decomposition is lossless.
        </Callout>
      </section>

      {/* ── CANONICAL COVER ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Canonical Cover — The Minimal FD Set
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          A <strong style={{ color: 'var(--text)' }}>canonical cover</strong> (also called minimal cover)
          is the smallest, simplest set of FDs that is equivalent to the original set —
          no redundant FDs, no redundant attributes in any FD. Used to find 3NF decompositions efficiently.
        </p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Steps to find canonical cover</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Step 1 — Apply Union rule: if X→Y and X→Z exist, combine to X→YZ',
              'Step 2 — Remove extraneous attributes from the LEFT side of each FD',
              'Step 3 — Remove extraneous attributes from the RIGHT side of each FD',
              'Step 4 — Remove redundant FDs — any FD that can be derived from others',
            ].map((step) => (
              <div key={step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 14, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyTakeaways items={[
        'X → Y means: knowing X, you can always determine exactly one value for Y. The relationship is deterministic.',
        'Trivial FD: Y is a subset of X — always true, not useful. Non-trivial FD: Y is not in X — these are the meaningful ones.',
        "Armstrong's 3 Axioms: Reflexivity, Augmentation, Transitivity — all valid FDs can be derived using only these three rules.",
        'Attribute closure X⁺: the set of all attributes determined by X. If X⁺ = all attributes, X is a superkey. If also minimal, X is a candidate key.',
        'Canonical cover: the minimal equivalent FD set — no redundant FDs, no extraneous attributes. Used in 3NF decomposition.',
        'Computing attribute closure is the single most tested DBMS topic in GATE exams. Practise it until it is second nature.',
      ]} />
    </LearnLayout>
  )
}