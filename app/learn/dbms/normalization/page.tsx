import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Normalization — 1NF to BCNF | DBMS | Chaduvuko',
  description:
    'Eliminate insert, update, and delete anomalies from your database design. 1NF, 2NF, 3NF, BCNF explained step by step with the same example through every stage.',
}

export default function Normalization() {
  return (
    <LearnLayout
      title="Normalization — 1NF to BCNF"
      description="The most important design theory in all of DBMS. One bad table, fixed step by step — from a mess to a clean, anomaly-free relational design."
      section="DBMS"
      readTime="45–55 min"
      updatedAt="March 2026"
    >

      {/* ── SECTION 1 — WHY ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Normalization is the process of organizing a database to
          <strong style={{ color: 'var(--text)' }}> eliminate redundancy and prevent anomalies</strong>.
          It's the answer to the question: "How do I design tables so that data stays accurate and
          consistent no matter what operations are performed?"
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          Instead of abstract theory, we'll take one badly designed table and fix it through every
          normal form — watching exactly why each step matters.
        </p>

        {/* THE PROBLEM TABLE */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>⚠ The Problem Table — StudentCourseTeacher</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['student_id', 'student_name', 'course_id', 'course_name', 'teacher_id', 'teacher_name', 'teacher_phone'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['S001', 'Rahul', 'CS101', 'DBMS', 'T01', 'Prof. Kumar', '98765-43210'],
                  ['S001', 'Rahul', 'CS102', 'OS', 'T02', 'Prof. Singh', '87654-32109'],
                  ['S002', 'Priya', 'CS101', 'DBMS', 'T01', 'Prof. Kumar', '98765-43210'],
                  ['S003', 'Arjun', 'CS101', 'DBMS', 'T01', 'Prof. Kumar', '98765-43210'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg2)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '9px 12px', color: 'var(--text2)', fontFamily: j <= 1 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 12 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
          {[
            { type: 'Insert Anomaly', color: '#ff4757', desc: 'You cannot add a new teacher (T03) until they are assigned to at least one student and course. Teacher data is trapped inside student enrollment rows.' },
            { type: 'Update Anomaly', color: '#f97316', desc: "Prof. Kumar's phone changed? You must update 3 rows (Rahul, Priya, Arjun). Miss one row and the database becomes inconsistent — two different phone numbers for the same teacher." },
            { type: 'Delete Anomaly', color: '#facc15', desc: "If Arjun drops CS101, you delete his row. If he was the last student in CS101, you lose all information about CS101 and Prof. Kumar — gone forever." },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.type}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 1NF ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 6, padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Step 01</span>
          <h2 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text)', fontFamily: 'Syne, sans-serif', margin: 0 }}>First Normal Form (1NF)</h2>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Rule</div>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Every cell must contain exactly one value (atomic). No repeating groups. No arrays or lists in a column. Every row must be unique.
          </p>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Our StudentCourseTeacher table actually passes 1NF already — every cell has one value.
          But here's a common 1NF violation to recognise:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.9, marginBottom: 16 }}>
          <div style={{ color: '#ff4757', marginBottom: 4 }}>✕ NOT in 1NF:</div>
          <div style={{ color: 'var(--text2)' }}>student_id: S001 | courses: <span style={{ color: '#ff4757' }}>"CS101, CS102, CS103"</span></div>
          <div style={{ color: 'var(--muted)', marginTop: 8, marginBottom: 4 }}>// Multiple values crammed into one column = 1NF violation</div>
          <div style={{ color: 'var(--accent)', marginTop: 8 }}>✓ Fixed (1NF): Split into separate rows — one course per row.</div>
        </div>
        <Callout type="tip">
          The "atomic values" rule is why you should never store comma-separated values
          in a single column. It feels convenient but makes every query a nightmare and
          violates the most basic database design rule.
        </Callout>
      </section>

      {/* ── 2NF ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 6, padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Step 02</span>
          <h2 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text)', fontFamily: 'Syne, sans-serif', margin: 0 }}>Second Normal Form (2NF)</h2>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Rule</div>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Must be in 1NF, AND every non-key attribute must depend on the <strong style={{ color: 'var(--text)' }}>entire composite primary key</strong> — not just part of it. No partial dependencies.
          </p>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          In our table, the composite primary key is <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>(student_id, course_id)</code>.
          Now ask: does each non-key column depend on <em>both</em> student_id AND course_id, or just one of them?
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 2, marginBottom: 20 }}>
          <div style={{ color: '#ff4757' }}>✕ student_name depends only on student_id (partial dependency)</div>
          <div style={{ color: '#ff4757' }}>✕ course_name depends only on course_id (partial dependency)</div>
          <div style={{ color: '#ff4757' }}>✕ teacher_name depends only on course_id (partial dependency)</div>
          <div style={{ color: 'var(--accent)', marginTop: 8 }}>✓ Only the enrollment itself depends on (student_id + course_id)</div>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Fix: split into separate tables, each with its own full dependency:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.9, marginBottom: 8 }}>
          <div><span style={{ color: 'var(--accent)' }}>Students</span><span style={{ color: 'var(--muted)' }}>(student_id PK, student_name)</span></div>
          <div><span style={{ color: '#0078d4' }}>Courses</span><span style={{ color: 'var(--muted)' }}>(course_id PK, course_name, teacher_id FK)</span></div>
          <div><span style={{ color: '#f97316' }}>Enrollments</span><span style={{ color: 'var(--muted)' }}>(student_id FK, course_id FK) — PK = both</span></div>
        </div>
      </section>

      {/* ── 3NF ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 6, padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Step 03</span>
          <h2 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text)', fontFamily: 'Syne, sans-serif', margin: 0 }}>Third Normal Form (3NF)</h2>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Rule</div>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Must be in 2NF, AND no non-key attribute should depend on another non-key attribute.
            No <strong style={{ color: 'var(--text)' }}>transitive dependencies</strong>.
            Every non-key attribute must depend directly on the primary key — not on another non-key attribute.
          </p>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          In our Courses table: <code style={{ fontFamily: 'var(--font-mono)', color: '#0078d4', fontSize: 13 }}>Courses(course_id PK, course_name, teacher_id, teacher_name, teacher_phone)</code>
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 2, marginBottom: 20 }}>
          <div style={{ color: 'var(--text2)' }}>course_id <span style={{ color: 'var(--accent)' }}>→</span> teacher_id <span style={{ color: '#f97316)' }}>→</span> teacher_name, teacher_phone</div>
          <div style={{ color: '#ff4757', marginTop: 4 }}>✕ teacher_name and teacher_phone depend on teacher_id, NOT on course_id directly. Transitive dependency!</div>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Fix: extract teachers into their own table:
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.9 }}>
          <div><span style={{ color: 'var(--accent)' }}>Students</span><span style={{ color: 'var(--muted)' }}>(student_id PK, student_name)</span></div>
          <div><span style={{ color: '#0078d4' }}>Teachers</span><span style={{ color: 'var(--muted)' }}>(teacher_id PK, teacher_name, teacher_phone)</span></div>
          <div><span style={{ color: '#f97316' }}>Courses</span><span style={{ color: 'var(--muted)' }}>(course_id PK, course_name, teacher_id FK)</span></div>
          <div><span style={{ color: '#8b5cf6' }}>Enrollments</span><span style={{ color: 'var(--muted)' }}>(student_id FK, course_id FK)</span></div>
          <div style={{ color: 'var(--accent)', marginTop: 8 }}>✓ In 3NF. All anomalies eliminated. Clean, separate, no redundancy.</div>
        </div>
      </section>

      {/* ── BCNF ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 6, padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Step 04</span>
          <h2 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 900, letterSpacing: '-0.5px', color: 'var(--text)', fontFamily: 'Syne, sans-serif', margin: 0 }}>Boyce-Codd Normal Form (BCNF)</h2>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.8, margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Stricter version of 3NF. For every functional dependency X → Y, X must be a
            <strong style={{ color: 'var(--text)' }}> superkey</strong>. No determinant can be a
            non-superkey attribute. BCNF catches edge cases 3NF misses when a table has
            multiple overlapping candidate keys.
          </p>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Most 3NF tables are already in BCNF. The difference only matters when a table has
          multiple candidate keys that overlap (share attributes). This appears in GATE exams regularly.
        </p>
        <Callout type="info">
          <strong>For your exams and interviews:</strong> In 3NF, we allow X → Y even if X is not
          a superkey, as long as Y is part of some candidate key. BCNF removes even that exception —
          X must always be a superkey, no exceptions. BCNF is stricter, but sometimes causes
          dependency-preserving decomposition to fail.
        </Callout>
      </section>

      {/* ── QUICK MEMORY CHEAT SHEET ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Quick Memory Cheat Sheet
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Normal Form', 'Prerequisite', 'Eliminates', 'One-line Rule'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1NF', '—', 'Multi-valued cells, repeating groups', 'Every cell = one atomic value'],
                ['2NF', '1NF', 'Partial dependencies', 'Non-key depends on WHOLE key'],
                ['3NF', '2NF', 'Transitive dependencies', 'Non-key depends on KEY only, not other non-keys'],
                ['BCNF', '3NF', 'Remaining anomalies from overlapping keys', 'For every X→Y, X must be a superkey'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 14px', color: j === 0 ? 'var(--accent)' : 'var(--text2)', fontWeight: j === 0 ? 700 : 400, fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── DENORMALIZATION ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>Denormalization — When Breaking the Rules is Intentional</h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
          Normalization is about correctness. But sometimes you deliberately re-introduce redundancy
          for <strong style={{ color: 'var(--text)' }}>performance</strong>. This is called
          denormalization — and it's done on purpose, not by accident.
        </p>
        <Callout type="example">
          Swiggy's order history page needs to show customer name, restaurant name, items, total —
          all in one query. In fully normalized form this requires 4-5 JOINs on a table with
          100 million rows. The solution: store a denormalized copy of the full order summary
          separately — no joins needed, instant reads. The write path still uses normalized tables.
          Two representations of the same data for two different purposes.
        </Callout>
      </section>

      <KeyTakeaways items={[
        'Normalization eliminates 3 types of anomalies: Insert (can\'t add data alone), Update (must change multiple rows), Delete (lose unrelated data).',
        '1NF: atomic values, no repeating groups. Every cell holds exactly one value.',
        '2NF: no partial dependency — non-key attributes must depend on the ENTIRE composite primary key, not just part of it.',
        '3NF: no transitive dependency — non-key attributes must depend on the key directly, not through another non-key.',
        'BCNF: stricter than 3NF — every determinant must be a superkey. Catches edge cases with overlapping candidate keys.',
        'Denormalization is intentional — done for query performance when JOIN costs outweigh the benefits of normalization.',
      ]} />
    </LearnLayout>
  )
}