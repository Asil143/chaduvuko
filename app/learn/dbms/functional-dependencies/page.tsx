import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Functional Dependencies — Complete Guide | DBMS | Chaduvuko',
  description:
    "Complete functional dependencies from first principles — formal definition, trivial vs non-trivial, Armstrong's Axioms with proofs, derived rules, attribute closure algorithm, finding all candidate keys, canonical cover, dependency preservation, and every GATE exam pattern explained.",
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
    fontSize: 'clamp(22px, 2.8vw, 32px)',
    fontWeight: 900, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 20,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(17px, 2vw, 22px)',
    fontWeight: 800, letterSpacing: '-0.5px',
    color: 'var(--text)', marginBottom: 14,
    fontFamily: 'Syne, sans-serif',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 16, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
    fontFamily: 'Syne, sans-serif',
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text2)',
    lineHeight: 1.95, marginBottom: 20,
    fontFamily: 'Inter, sans-serif',
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

const FDBox = ({ lhs, rhs, label, color = 'var(--accent)', note }: {
  lhs: string; rhs: string; label?: string; color?: string; note?: string
}) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'var(--bg2)', border: `1px solid ${color}30`,
    borderLeft: `3px solid ${color}`,
    borderRadius: 8, padding: '10px 16px', marginBottom: 10,
    flexWrap: 'wrap',
  }}>
    {label && (
      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', flexShrink: 0 }}>{label}</span>
    )}
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: color, fontWeight: 700 }}>
      {lhs} <span style={{ color: 'var(--muted)' }}>→</span> {rhs}
    </span>
    {note && <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>{note}</span>}
  </div>
)

export default function FunctionalDependencies() {
  return (
    <LearnLayout
      title="Functional Dependencies"
      description="The mathematical language of normalization — how attributes determine each other, how to derive all possible dependencies from a given set, and how to design schemas that enforce exactly the constraints the data requires."
      section="DBMS"
      readTime="90–110 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHAT FDs ARE AND WHY THEY EXIST
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Foundation" />
        <SectionTitle>What Functional Dependencies Are — And Why They Are the Engine Behind Normalization</SectionTitle>

        <Para>
          In Module 05 we learned normalization: partial dependencies violate 2NF,
          transitive dependencies violate 3NF, and non-superkey determinants violate BCNF.
          But we used an informal version of these concepts — we said things like
          "student_name depends on student_id alone." This informality was sufficient for
          the introduction. Now we make it precise.
        </Para>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Functional dependencies (FDs)</strong> are
          the mathematical tool that makes "dependency" precise. They are constraints on a
          relation schema that specify which sets of attributes determine which other attributes.
          They are the formal language in which normalization theory is expressed. Without FDs,
          normalization is just intuition. With FDs, it becomes a mathematical procedure with
          provably correct outcomes.
        </Para>

        <Para>
          Understanding functional dependencies deeply serves three critical purposes in
          practice and in examinations:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[
            { num: '01', purpose: 'Finding candidate keys algorithmically', detail: 'Given a set of FDs, compute which attribute sets can serve as candidate keys — without guessing or relying on intuition.' },
            { num: '02', purpose: 'Determining normal form violations precisely', detail: 'Given a schema and its FDs, determine exactly which normal forms are satisfied and which are violated — with mathematical certainty, not approximation.' },
            { num: '03', purpose: 'Designing optimal decompositions', detail: 'When normalising, determine exactly how to split tables to preserve all dependencies and guarantee lossless joins — not by trial and error, but by algorithm.' },
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 5, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>{item.num}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{item.purpose}</div>
                <Para>{item.detail}</Para>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>The Formal Definition — Stated Precisely</SubTitle>

        <Para>
          Let R be a relation schema and let X and Y be subsets of the attributes of R
          (X ⊆ attrs(R) and Y ⊆ attrs(R)). A functional dependency
          <strong style={{ color: 'var(--text)' }}> X → Y</strong> (read: "X functionally
          determines Y" or "Y is functionally dependent on X") holds on R if and only if:
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <Para>
            <strong style={{ color: 'var(--accent)' }}>For every valid instance r of R:</strong> for any
            two tuples t₁ and t₂ in r, if t₁[X] = t₂[X] (the tuples have the same values
            for all attributes in X), then t₁[Y] = t₂[Y] (the tuples must also have the
            same values for all attributes in Y).
          </Para>
          <Para>
            In plain language: <strong style={{ color: 'var(--text)' }}>knowing the value of X is sufficient
            to determine the value of Y</strong>. Whenever two rows agree on X, they must agree on Y.
            X cannot map to two different Y values in any valid state of the relation.
          </Para>
        </div>

        <Para>
          The word "every valid instance" is crucial. An FD is not a statement about one
          specific snapshot of the data — it is a constraint on ALL possible states the
          database can ever be in. It is a schema-level property, not a data-level observation.
          This distinction matters enormously: you cannot determine FDs by looking at a
          single snapshot of data — you can only verify that a proposed FD is not violated
          by a snapshot, or discover a violation.
        </Para>

        <Callout type="warning">
          <strong>The single most common FD mistake:</strong> Looking at the current data in a table and
          concluding that an FD holds because no violation is visible right now. This is wrong.
          If the current data happens to have no two rows with the same X value, then ANY
          FD X → anything appears to hold — but that says nothing about whether it is a true
          constraint on the schema. FDs must be determined from the semantics of the
          real-world domain being modelled, not by inspection of current data.
        </Callout>

        <SubTitle>FDs in the Real World — Examples That Build Intuition</SubTitle>

        <Para>
          Before formalising FD theory, let us build strong intuition with concrete real-world
          examples. For each FD, understand WHY it holds — what real-world fact makes it true.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              relation: 'EMPLOYEES(employee_id, name, email, dept_id, salary, pan_number)',
              fds: [
                { lhs: 'employee_id', rhs: 'name, email, dept_id, salary, pan_number', why: 'Each employee has a unique ID assigned exactly once. Knowing the ID tells you everything about that employee. This is the primary key dependency.' },
                { lhs: 'email', rhs: 'employee_id, name, dept_id', why: 'Work email addresses are unique per employee — each email belongs to exactly one person. Knowing the email tells you which employee it is, and therefore all their details.' },
                { lhs: 'pan_number', rhs: 'employee_id, name', why: 'PAN (Permanent Account Number) is issued uniquely per person by the Indian government. Knowing the PAN tells you which person it is.' },
                { lhs: 'dept_id', rhs: 'name', color: '#ff4757', why: 'Does NOT hold. Multiple employees belong to the same department — knowing the dept_id does NOT tell you which specific employee you are referring to. Many people share the same dept_id.' },
              ],
              color: '#0078d4',
            },
            {
              relation: 'ORDERS(order_id, customer_id, customer_name, product_id, product_name, price, qty, order_date)',
              fds: [
                { lhs: 'order_id', rhs: 'customer_id, order_date', why: 'Each order has a unique ID. Knowing the order ID tells you which customer placed it and when — directly.' },
                { lhs: 'customer_id', rhs: 'customer_name', why: 'Each customer has a unique ID. Knowing the customer_id tells you the customer\'s name — this is a transitive dependency if customer_name is stored in the ORDERS table.' },
                { lhs: 'product_id', rhs: 'product_name, price', why: 'Each product has a unique ID. Knowing the product_id tells you the product name and its price — another transitive dependency if stored in ORDERS.' },
                { lhs: '(order_id, product_id)', rhs: 'qty', why: 'The quantity of a product in a specific order depends on both — you need to know WHICH order AND WHICH product to know how many were ordered. Neither alone is sufficient.' },
              ],
              color: 'var(--accent)',
            },
            {
              relation: 'FLIGHTS(flight_num, airline, departure_date, origin, destination, departure_time)',
              fds: [
                { lhs: '(flight_num, departure_date)', rhs: 'origin, destination, departure_time', why: 'A specific flight on a specific date has exactly one origin, one destination, and one departure time. The combination (flight + date) uniquely identifies a flight instance.' },
                { lhs: 'flight_num', rhs: 'origin, destination, airline', why: 'Flight numbers are stable route identifiers — AI-101 always flies Delhi to London, always operated by Air India. The date does not affect the route or airline.' },
                { lhs: 'flight_num', rhs: 'departure_date', color: '#ff4757', why: 'Does NOT hold. Flight AI-101 operates on many different dates — knowing the flight number does NOT uniquely determine the departure date.' },
              ],
              color: '#f97316',
            },
          ].map((example) => (
            <div key={example.relation} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: example.color, marginBottom: 16 }}>{example.relation}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {example.fds.map((fd, i) => (
                  <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
                        color: fd.color || example.color,
                      }}>
                        {fd.lhs} <span style={{ color: 'var(--muted)' }}>→</span> {fd.rhs}
                      </span>
                      {fd.color === '#ff4757' && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 4, padding: '2px 6px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Does NOT Hold</span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Why: </span>{fd.why}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 2 — TRIVIAL VS NON-TRIVIAL FDs
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Types of FDs" />
        <SectionTitle>Trivial vs Non-Trivial Functional Dependencies</SectionTitle>

        <Para>
          Not all functional dependencies carry useful information. Some FDs are mathematically
          guaranteed to hold regardless of any data or schema properties — they are "trivially"
          true. Understanding this distinction is critical because normalization theory and
          Armstrong's Axioms distinguish carefully between trivial and non-trivial dependencies.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--muted)', borderRadius: 12, padding: '22px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--muted)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Trivial FD</div>
            <Para>
              An FD X → Y is <strong style={{ color: 'var(--text)' }}>trivial</strong> if
              Y ⊆ X — if Y is a subset of X. In other words, the right-hand side is
              already contained within the left-hand side.
            </Para>
            <Para>
              These FDs are always true for every relation, by definition of functional dependency —
              if two tuples agree on all attributes in X, they trivially agree on any subset of X.
              They add zero information about the data model.
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { fd: '{A, B, C} → {A}', reason: 'A is a subset of {A,B,C}' },
                { fd: '{A, B, C} → {A, B}', reason: '{A,B} is a subset of {A,B,C}' },
                { fd: '{student_id, course_id} → {student_id}', reason: 'student_id is in the LHS' },
                { fd: '{X} → {X}', reason: 'Any attribute determines itself' },
              ].map((item) => (
                <div key={item.fd} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>{item.fd}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>{item.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 12, padding: '22px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Non-Trivial FD</div>
            <Para>
              An FD X → Y is <strong style={{ color: 'var(--text)' }}>non-trivial</strong> if
              Y ⊄ X — if at least one attribute in Y is NOT in X. Non-trivial FDs carry
              real information about the domain — they tell us something meaningful about
              how the data is related.
            </Para>
            <Para>
              An FD is <strong style={{ color: 'var(--text)' }}>completely non-trivial</strong> if
              X ∩ Y = ∅ — the left and right sides share no attributes at all.
            </Para>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { fd: 'employee_id → name', reason: 'name is not in {employee_id}' },
                { fd: '{student_id, course_id} → grade', reason: 'grade is not in the LHS' },
                { fd: '{A, B} → {B, C}', reason: 'C is not in {A,B} — partially non-trivial' },
                { fd: 'dept_id → dept_name, location', reason: 'Neither in {dept_id}' },
              ].map((item) => (
                <div key={item.fd} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', marginBottom: 3 }}>{item.fd}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>{item.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SubTitle>Why the Trivial/Non-Trivial Distinction Matters for Normal Forms</SubTitle>

        <Para>
          BCNF states: "for every <strong style={{ color: 'var(--text)' }}>non-trivial</strong> functional
          dependency X → Y, X must be a superkey." The word "non-trivial" is load-bearing.
          Without it, the definition would be absurd — trivial FDs are universally true and
          cannot be eliminated. 3NF similarly only considers non-trivial FDs.
        </Para>

        <Para>
          Armstrong's Axioms, which we examine next, produce both trivial and non-trivial FDs.
          In practice, when we compute attribute closures or find candidate keys, we work with
          non-trivial FDs exclusively — trivial FDs are set-theoretically guaranteed and
          carry no design information.
        </Para>
      </section>

      {/* ========================================
          PART 3 — ARMSTRONG'S AXIOMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The Three Foundation Rules" />
        <SectionTitle>Armstrong's Axioms — The Complete Inference System for FDs</SectionTitle>

        <Para>
          In 1974, William W. Armstrong published "Dependency Structures of Data Base Relationships"
          — a paper that gave the relational model community something it critically needed:
          a complete, sound inference system for functional dependencies.
        </Para>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Complete</strong> means: using these axioms
          alone, you can derive every functional dependency that logically follows from a given
          set of FDs. No valid FD will escape you.
          <strong style={{ color: 'var(--text)' }}> Sound</strong> means: every FD derived using
          these axioms is genuinely valid — you will never derive a false FD.
        </Para>

        <Para>
          There are exactly three axioms. All other inference rules (and there are infinitely
          many FDs that can be derived) are consequences of these three.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>

          {/* AXIOM 1 — REFLEXIVITY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Axiom 01</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Reflexivity</span>
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Statement</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: '#0078d4', fontWeight: 700 }}>
                  If Y ⊆ X, then X → Y
                </div>
              </div>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Plain English:</strong> Any set of attributes
                always functionally determines itself or any of its subsets. If you know the
                values of {'{A, B, C}'}, you trivially know the value of A, or {'{A, B}'},
                or any subset — because those values are part of what you already know.
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Why it is obviously true:</strong> If
                two tuples agree on attributes {'{A, B, C}'}, they agree on A (because A is part of
                {'{A, B, C}'}). This is set-theoretic identity — knowing a superset trivially
                implies knowing any subset.
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>What it produces:</strong> All trivial FDs.
                Reflexivity is the axiom of trivial dependencies.
              </Para>

              <CodeBox label="Reflexivity — concrete applications">
{`// Given any set X, reflexivity gives us all trivial FDs:

// EMPLOYEES(employee_id, name, email, dept_id, salary)

// By Reflexivity:
{employee_id, name}           → employee_id      // Y = {emp_id} ⊆ X = {emp_id, name}
{employee_id, name}           → name             // trivial
{employee_id, name}           → {employee_id, name}  // X → X always holds
{employee_id, name, email}    → email            // trivial
{employee_id, name, email}    → {employee_id}    // trivial

// Reflexivity is almost never explicitly invoked in practical work —
// trivial FDs are so obvious they are assumed.
// But reflexivity is the formal basis that makes them part of the FD closure F+.`}
              </CodeBox>
            </div>
          </div>

          {/* AXIOM 2 — AUGMENTATION */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Axiom 02</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Augmentation</span>
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Statement</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--accent)', fontWeight: 700 }}>
                  If X → Y, then XZ → YZ  (for any attribute set Z)
                </div>
              </div>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Plain English:</strong> If X determines Y,
                then adding the same extra attributes Z to both sides preserves the dependency.
                If you can determine Y from X, you can certainly determine Y from X plus Z
                (because you can just ignore Z and use X to get Y).
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Why it is true:</strong> Suppose X → Y holds.
                Consider two tuples t₁ and t₂ that agree on XZ (on both X and Z). Since they
                agree on X (which is part of XZ), and X → Y, they must also agree on Y. Since they
                also agree on Z, they agree on YZ. Therefore XZ → YZ.
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>What it produces:</strong> New FDs by
                expanding both sides. This axiom is what allows us to grow candidate keys
                into super keys: if {'{A}'} is a candidate key (A → all attributes), then
                {'{A, B}'} is also a superkey (A, B → all attributes, by augmenting with B).
              </Para>

              <CodeBox label="Augmentation — building new FDs from known ones">
{`// Known FD: employee_id → dept_id
// Apply Augmentation with Z = {salary}:
{employee_id, salary} → {dept_id, salary}

// Known FD: dept_id → dept_name
// Apply Augmentation with Z = {employee_id}:
{dept_id, employee_id} → {dept_name, employee_id}

// Known FD: customer_id → customer_name
// Apply Augmentation with Z = {order_id}:
{customer_id, order_id} → {customer_name, order_id}

// IMPORTANT INSIGHT from Augmentation:
// If A is a candidate key (A → all), then augmenting with ANY attribute B gives:
// {A, B} → {all, B} = all attributes
// Therefore {A, B} is ALSO a superkey (though not a candidate key — it's not minimal).
// This is why superkeys form a superset of candidate keys.

// Augmentation also tells us about COMPOSITE KEY derivation:
// If AB → C holds, then by Augmentation with D:
// ABD → CD (adding D to both sides)
// and since CD contains C, by Reflexivity: ABD → C too
// Augmentation + Reflexivity together give us containment propagation.`}
              </CodeBox>
            </div>
          </div>

          {/* AXIOM 3 — TRANSITIVITY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Axiom 03</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Transitivity</span>
              </div>

              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Statement</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: '#f97316', fontWeight: 700 }}>
                  If X → Y and Y → Z, then X → Z
                </div>
              </div>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Plain English:</strong> If X determines Y,
                and Y determines Z, then X also determines Z (transitively, through Y).
                The chain of determination is transitive — knowing X is sufficient to
                determine Y, and knowing Y is sufficient to determine Z, so knowing X
                is sufficient to determine Z.
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>Why it is true:</strong> Suppose X → Y
                and Y → Z. Consider tuples t₁ and t₂ that agree on X. Since X → Y, they also
                agree on Y. Since Y → Z and they agree on Y, they also agree on Z. Therefore X → Z.
              </Para>

              <Para>
                <strong style={{ color: 'var(--text)' }}>What it produces:</strong> The transitive
                closure of FDs. This is the axiom that formalises
                <strong style={{ color: 'var(--text)' }}> transitive dependency</strong> — the 3NF
                violation we studied in Module 05. The chain employee_id → dept_id → dept_name
                is transitivity in action. Transitivity is also the primary axiom used in the
                attribute closure algorithm.
              </Para>

              <CodeBox label="Transitivity — chaining FDs and discovering transitive dependencies">
{`// EXAMPLE 1: Discovering a transitive dependency
// FD1: employee_id → dept_id
// FD2: dept_id → dept_name, dept_location, dept_budget

// Apply Transitivity (FD1 + FD2):
// employee_id → dept_name      (chain: emp_id → dept_id → dept_name)
// employee_id → dept_location  (chain: emp_id → dept_id → dept_location)
// employee_id → dept_budget    (chain: emp_id → dept_id → dept_budget)

// This IS a transitive dependency — dept_name depends on employee_id
// THROUGH dept_id. dept_name should NOT be in the EMPLOYEES table.
// 3NF violation detected by Transitivity.

// EXAMPLE 2: Building a long derivation chain
// FD1: order_id → customer_id
// FD2: customer_id → city_id
// FD3: city_id → state
// FD4: state → country

// By Transitivity (FD1 + FD2): order_id → city_id
// By Transitivity ((FD1+FD2) + FD3): order_id → state
// By Transitivity ((FD1+FD2+FD3) + FD4): order_id → country
// All of these are transitive dependencies — country, state, city_id should all
// be in their own tables, linked by foreign keys, NOT in the ORDERS table.

// EXAMPLE 3: Finding a candidate key using Transitivity
// Relation R(A, B, C, D) with FDs: A → B, B → C, C → D
// By Transitivity: A → C, A → D
// {A}+ = {A, B, C, D} = all attributes → A is a candidate key`}
              </CodeBox>
            </div>
          </div>
        </div>

        <SubTitle>The Three Derived Rules — Consequences of the Axioms</SubTitle>

        <Para>
          Armstrong's three axioms are complete — but working with just three rules makes
          derivations tedious. Three additional rules are commonly used in practice. They are
          NOT independent axioms — they can all be proved using only Reflexivity, Augmentation,
          and Transitivity. But knowing them dramatically speeds up closure computations
          and derivations.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

          {/* UNION */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Derived Rule 01</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Union</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#8b5cf6', fontWeight: 700, marginBottom: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', display: 'inline-block' }}>
              If X → Y and X → Z, then X → YZ
            </div>
            <Para>
              If X determines Y separately and Z separately, then X determines their union YZ together.
              You can always combine separately determined attributes onto one right-hand side.
            </Para>
            <Para>
              <strong style={{ color: 'var(--text)' }}>Proof using axioms:</strong> Given X → Y and X → Z.
              By Augmentation of X → Y with Z: XZ → YZ. By Augmentation of X → Z with X: X → XZ.
              By Transitivity of X → XZ and XZ → YZ: X → YZ. □
            </Para>
            <CodeBox>
{`// Application:
// employee_id → dept_id   (given)
// employee_id → salary    (given)
// By Union: employee_id → {dept_id, salary}

// This is useful when computing closures:
// Instead of tracking dept_id and salary as separate derived FDs,
// Union lets us combine them immediately.`}
            </CodeBox>
          </div>

          {/* DECOMPOSITION */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #facc15', borderRadius: 10, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#facc15', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Derived Rule 02</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Decomposition</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#facc15', fontWeight: 700, marginBottom: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', display: 'inline-block' }}>
              If X → YZ, then X → Y and X → Z
            </div>
            <Para>
              The reverse of Union. If X determines a combined set YZ, you can split the right-hand
              side into its individual components. X determines each part separately.
            </Para>
            <Para>
              <strong style={{ color: 'var(--text)' }}>Proof:</strong> Given X → YZ.
              By Reflexivity: YZ → Y (since Y ⊆ YZ). By Transitivity of X → YZ and YZ → Y: X → Y.
              Similarly, YZ → Z by Reflexivity, giving X → Z by Transitivity. □
            </Para>
            <CodeBox>
{`// Application:
// dept_id → {dept_name, dept_location, dept_budget}   (given)
// By Decomposition:
// dept_id → dept_name      (individual FD)
// dept_id → dept_location  (individual FD)
// dept_id → dept_budget    (individual FD)

// This is useful when testing whether a specific attribute is determined:
// "Is dept_location determined by dept_id?" 
// Given dept_id → {dept_name, dept_location, dept_budget},
// Decomposition immediately gives us dept_id → dept_location.`}
            </CodeBox>
          </div>

          {/* PSEUDOTRANSITIVITY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #e879f9', borderRadius: 10, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#e879f9', background: 'rgba(232,121,249,0.1)', border: '1px solid rgba(232,121,249,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Derived Rule 03</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Pseudotransitivity</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#e879f9', fontWeight: 700, marginBottom: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', display: 'inline-block' }}>
              If X → Y and WY → Z, then WX → Z
            </div>
            <Para>
              A generalisation of Transitivity. If X determines Y, and the combination of W and Y
              determines Z, then the combination of W and X determines Z (because WX can produce Y
              from X, then WY → Z gives us Z).
            </Para>
            <Para>
              <strong style={{ color: 'var(--text)' }}>Proof:</strong> Given X → Y and WY → Z.
              By Augmentation of X → Y with W: WX → WY.
              By Transitivity of WX → WY and WY → Z: WX → Z. □
            </Para>
            <CodeBox>
{`// Application:
// student_id → advisor_id        (given: each student has one advisor)
// {advisor_id, course_id} → grade  (given: advisor grades students in courses)
// By Pseudotransitivity:
// {student_id, course_id} → grade  (replace advisor_id with student_id on LHS)

// This is the most practically useful derived rule for situations
// where you need to "substitute" one determining attribute for another.`}
            </CodeBox>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 4 — CLOSURE OF FD SET F+
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — The Complete FD Space" />
        <SectionTitle>The Closure of a Set of Functional Dependencies (F⁺)</SectionTitle>

        <Para>
          Given a set of functional dependencies F on a relation schema R, the
          <strong style={{ color: 'var(--text)' }}> closure of F</strong> (written F⁺) is the
          complete set of all functional dependencies that can be derived from F using
          Armstrong's Axioms. F⁺ includes every FD that logically follows from the given FDs —
          including the trivial FDs from Reflexivity and all the transitive chains from Transitivity.
        </Para>

        <Para>
          F⁺ is typically much larger than F. For a relation with n attributes, F⁺ can
          contain exponentially many FDs. This is why we never compute F⁺ explicitly in
          practice — instead we compute the closure of specific attribute sets
          (the attribute closure algorithm), which is far more efficient and answers
          the specific questions we care about: "does this FD hold?" and "is this set
          of attributes a superkey?"
        </Para>

        <CodeBox label="F⁺ vs F — why we compute attribute closures instead">
{`// Given F = {A → B, B → C, A → D} on R(A, B, C, D)

// F⁺ contains ALL of:
// Trivial (from Reflexivity):
// A → A, B → B, C → C, D → D
// {A,B} → A, {A,B} → B, {A,B} → {A,B}, etc. (all subsets of all attribute sets)

// Non-trivial (from Transitivity + Augmentation):
// A → B                  (given)
// B → C                  (given)
// A → D                  (given)
// A → C                  (Transitivity: A→B, B→C)
// A → BC                 (Union: A→B, A→C)
// A → BCD                (Union: A→BC, A→D)
// A → ABCD               (Union of A→A with A→BCD)
// AB → BC                (Augmentation of A→BC with B? No... let's trace properly)
// ... (hundreds of FDs)

// TOTAL F⁺ for this small 4-attribute relation: dozens of FDs
// For a 10-attribute relation: thousands of FDs
// For a 20-attribute relation: millions of FDs

// INSTEAD: Ask "What does A determine?" → Compute A⁺ (attribute closure of A)
// This answers the question in O(n²) time — much more practical.`}
        </CodeBox>

        <SubTitle>Testing FD Membership — Does a Given FD Hold in F⁺?</SubTitle>

        <Para>
          The most common question in normalization work is: "Given F, does a specific FD
          X → Y hold?" The answer: compute X⁺ (the attribute closure of X with respect to F).
          If Y ⊆ X⁺, then X → Y holds in F⁺. If Y ⊄ X⁺, then X → Y does not hold.
        </Para>

        <Para>
          This is why the attribute closure algorithm (Part 5) is the central algorithm of
          functional dependency theory — it answers membership questions for F⁺ efficiently
          without ever computing F⁺ explicitly.
        </Para>
      </section>

      {/* ========================================
          PART 5 — ATTRIBUTE CLOSURE ALGORITHM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — The Central Algorithm" />
        <SectionTitle>The Attribute Closure Algorithm — The Most Important Algorithm in FD Theory</SectionTitle>

        <Para>
          The <strong style={{ color: 'var(--text)' }}>attribute closure</strong> of a set of
          attributes X with respect to a set of FDs F (written X⁺ or X⁺_F) is the largest
          set of attributes that is functionally determined by X under F.
        </Para>

        <Para>
          Formally: X⁺ = {'{A | X → A is in F⁺}'}. It is the set of all attributes
          that X can determine — directly or through chains of FDs. If X⁺ contains every
          attribute in the relation, then X is a superkey.
        </Para>

        <SubTitle>The Algorithm — Step by Step</SubTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Attribute Closure Algorithm</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {[
              { step: 'Initialise', desc: 'Set closure = X (start with just the attributes you already know — you can determine yourself from yourself by Reflexivity)', code: 'closure := X' },
              { step: 'Repeat until no change', desc: 'Scan every FD in F. If the left-hand side (LHS) of an FD is contained within the current closure, add the right-hand side (RHS) to the closure.', code: 'for each FD (Z → W) in F:\n    if Z ⊆ closure:\n        closure := closure ∪ W' },
              { step: 'Terminate', desc: 'When no FD can add any new attributes to the closure in a complete scan, the algorithm terminates. The current closure is X⁺.', code: 'return closure as X⁺' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 5, padding: '2px 8px', flexShrink: 0, marginTop: 2 }}>Step {i + 1}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{item.step}</div>
                  <Para>{item.desc}</Para>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5, padding: '6px 10px' }}>{item.code}</div>
                </div>
              </div>
            ))}
          </div>

          <Para>
            <strong style={{ color: 'var(--text)' }}>Time complexity:</strong> O(n²) where n is the
            number of FDs. In the worst case, each iteration of the outer loop adds at least
            one attribute to the closure, and there are at most |R| attributes, so the algorithm
            runs at most |R| × |F| iterations. This is polynomial — the algorithm is efficient
            even for large schemas.
          </Para>
        </div>

        <SubTitle>Three Complete Worked Examples — Different Difficulty Levels</SubTitle>

        {/* EXAMPLE 1 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example 1 — Basic (GATE Level)</div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
              <strong style={{ color: 'var(--text)' }}>Relation:</strong> R(A, B, C, D, E)
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: 'var(--text)' }}>FDs:</strong> F = {'{ AB → C, C → D, D → E, E → B }'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginTop: 8 }}>
              <strong style={{ color: 'var(--text)' }}>Question:</strong> Compute {'{AB}'}⁺ and determine if AB is a candidate key.
            </div>
          </div>

          <CodeBox label="Step-by-step computation of {AB}⁺">
{`// COMPUTE {AB}⁺ under F = {AB→C, C→D, D→E, E→B}

// Step 1 — Initialise:
closure = {A, B}

// Step 2 — Iteration 1: Scan all FDs
// FD: AB → C  ← Is {A,B} ⊆ closure = {A,B}? YES
//   Add C: closure = {A, B, C}
// FD: C → D   ← Is {C} ⊆ closure = {A,B,C}? YES
//   Add D: closure = {A, B, C, D}
// FD: D → E   ← Is {D} ⊆ closure = {A,B,C,D}? YES
//   Add E: closure = {A, B, C, D, E}
// FD: E → B   ← Is {E} ⊆ closure = {A,B,C,D,E}? YES
//   Add B (already in closure — no change)

// End of Iteration 1: closure = {A, B, C, D, E}
// Did anything change? YES — added C, D, E.

// Step 2 — Iteration 2: Scan all FDs again
// FD: AB → C  ← C already in closure
// FD: C → D   ← D already in closure
// FD: D → E   ← E already in closure
// FD: E → B   ← B already in closure
// No new attributes added in this iteration → TERMINATE

// RESULT: {AB}⁺ = {A, B, C, D, E} = all attributes of R

// CONCLUSION:
// {AB}⁺ = all attributes → AB is a SUPERKEY
// Can we remove A? {B}⁺: start {B}, E→B not helpful, no FD has {B} alone as LHS
//   {B}⁺ = {B} ≠ all → cannot remove A
// Can we remove B? {A}⁺: start {A}, no FD has just {A} on LHS
//   {A}⁺ = {A} ≠ all → cannot remove B
// AB is MINIMAL → AB is a CANDIDATE KEY ✓`}
          </CodeBox>
        </div>

        {/* EXAMPLE 2 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example 2 — Intermediate (Multiple Candidate Keys)</div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
              <strong style={{ color: 'var(--text)' }}>Relation:</strong> R(A, B, C, D)
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
              <strong style={{ color: 'var(--text)' }}>FDs:</strong> F = {'{ A → B, B → A, B → C, A → C, C → D }'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: 'var(--text)' }}>Question:</strong> Find ALL candidate keys of R.
            </div>
          </div>

          <CodeBox label="Finding all candidate keys systematically">
{`// STRATEGY: First identify which attributes CAN be in a candidate key.
// An attribute that appears ONLY on the right-hand side of FDs (never on LHS)
// CANNOT be a candidate key alone (nothing derives it independently).
// An attribute that appears ONLY on the left-hand side (never on RHS)
// MUST be in every candidate key (no FD produces it, so it cannot be derived).

// Classify attributes:
// A: appears on LHS (A→B, A→C) — can derive things
//    appears on RHS (B→A) — can be derived
// B: appears on LHS (B→A, B→C) — can derive things
//    appears on RHS (A→B) — can be derived
// C: appears on LHS (C→D) — can derive things
//    appears on RHS (B→C, A→C) — can be derived
// D: appears ONLY on RHS (C→D) — NEVER on LHS
//    D is only derivable, never a determiner
//    D CANNOT be in any candidate key (removing it still gives a superkey)
//    D MUST be derived — no candidate key contains D alone OR is reducible by removing D

// Since D never appears on LHS, D cannot help derive anything.
// Every candidate key must be able to derive D → must derive C (C→D) → must derive A or B.

// TEST {A}:
// A⁺: start {A}
//   A → B: add B → {A,B}
//   A → C: add C → {A,B,C}
//   B → A: A already there
//   B → C: C already there
//   C → D: add D → {A,B,C,D}
// A⁺ = {A,B,C,D} = all attributes → A is a superkey
// Can we reduce? A alone → A⁺ = all → already single attribute
// A is a CANDIDATE KEY ✓

// TEST {B}:
// B⁺: start {B}
//   B → A: add A → {A,B}
//   B → C: add C → {A,B,C}
//   A → B: B already there
//   A → C: C already there
//   C → D: add D → {A,B,C,D}
// B⁺ = {A,B,C,D} = all attributes → B is a superkey
// B alone → already single attribute
// B is a CANDIDATE KEY ✓

// TEST {C}:
// C⁺: start {C}
//   C → D: add D → {C,D}
// C⁺ = {C,D} ≠ all attributes → C is NOT a candidate key
// (Cannot derive A or B from C alone)

// TEST {D}:
// D⁺: start {D}
// No FD has D on LHS → D⁺ = {D} ≠ all → NOT a candidate key

// TEST {A,B}: A⁺ = all → AB is a superkey. But A alone is a superkey → {A,B} is NOT minimal
// TEST {A,C}: A⁺ = all → AC superkey. A alone is superkey → NOT minimal
// TEST {B,C}: B⁺ = all → BC superkey. B alone is superkey → NOT minimal
// (Any multi-attribute set containing A or B is a non-minimal superkey)

// FINAL ANSWER: Candidate keys = {A} and {B}
// Both A and B independently determine all attributes of R.
// A↔B (they determine each other) — they are equivalent identifiers.`}
          </CodeBox>
        </div>

        {/* EXAMPLE 3 */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example 3 — Advanced (GATE Exam Standard)</div>

          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
              <strong style={{ color: 'var(--text)' }}>Relation:</strong> R(A, B, C, D, E, F)
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
              <strong style={{ color: 'var(--text)' }}>FDs:</strong> F = {'{ AB → C, BC → AD, D → E, CF → B }'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: 'var(--text)' }}>Question:</strong> Find all candidate keys of R.
            </div>
          </div>

          <CodeBox label="Systematic candidate key identification for complex FD set">
{`// STEP 1: Classify attributes
// Appears ONLY on LHS (never on RHS): must be in every candidate key
//   F appears on LHS (CF→B) but NEVER on RHS → F must be in EVERY candidate key
//   A appears on LHS (AB→C), also on RHS (BC→AD) → not required in every key
//   B appears on LHS (AB→C, BC→AD), also on RHS (CF→B) → not required in every key
//   C appears on LHS (BC→AD, CF→B), also on RHS (AB→C) → not required in every key
//   D appears on LHS (D→E), also on RHS (BC→AD) → not required in every key
//   E appears ONLY on RHS (D→E) → CANNOT be in any candidate key (cannot derive others)

// CONCLUSION from classification:
//   F must be in EVERY candidate key (never derived)
//   E cannot be in any candidate key (never derives anything)
//   So every candidate key contains F and does NOT contain E alone

// STEP 2: Test {A, F}
// Closure of {A,F}:
//   Start: {A, F}
//   FD AB→C: need {A,B} — B not in closure yet. Skip.
//   FD BC→AD: need {B,C} — not in closure. Skip.
//   FD D→E: need {D} — not in closure. Skip.
//   FD CF→B: need {C,F} — C not in closure. Skip.
//   No additions in iteration 1.
//   {A,F}⁺ = {A,F} ≠ all → NOT a candidate key

// STEP 3: Test {A, B, F}
// Closure of {A,B,F}:
//   Start: {A, B, F}
//   FD AB→C: {A,B} ⊆ {A,B,F} → add C → {A,B,C,F}
//   FD BC→AD: {B,C} ⊆ {A,B,C,F} → add A,D → {A,B,C,D,F}
//   FD D→E: {D} ⊆ {A,B,C,D,F} → add E → {A,B,C,D,E,F}
//   FD CF→B: {C,F} ⊆ {A,B,C,D,E,F} → add B (already there)
//   End iteration 1: {A,B,C,D,E,F} = all attributes ✓
// {ABF}⁺ = all → ABF is a superkey
// Is it minimal? Can we remove any attribute?
//   Remove A? {BF}⁺: start {B,F}, CF→B needs C, AB→C needs A... 
//     {B,F}: no FD fires → {BF}⁺ = {B,F} ≠ all → Cannot remove A ✓
//   Remove B? {AF}⁺ = {A,F} ≠ all (computed above) → Cannot remove B ✓
//   Remove F? {AB}⁺: AB→C → {A,B,C}, BC→AD → {A,B,C,D}, D→E → {A,B,C,D,E}
//     {AB}⁺ = {A,B,C,D,E} — missing F! ≠ all → Cannot remove F ✓
// ABF is MINIMAL → ABF is a CANDIDATE KEY ✓

// STEP 4: Test {B, C, F}
// Closure of {B,C,F}:
//   Start: {B,C,F}
//   FD AB→C: needs A — not present. Skip.
//   FD BC→AD: {B,C} ⊆ {B,C,F} → add A,D → {A,B,C,D,F}
//   FD D→E: {D} ⊆ {A,B,C,D,F} → add E → {A,B,C,D,E,F}
//   FD CF→B: already have B
// {BCF}⁺ = {A,B,C,D,E,F} = all ✓
// Is it minimal?
//   Remove B? {CF}⁺: CF→B → add B → {B,C,F}, BC→AD → add A,D → {A,B,C,D,F}, D→E → {A,B,C,D,E,F}
//     {CF}⁺ = all → B is redundant in BCF! NOT minimal
// So BCF is NOT a candidate key (CF alone is a superkey)

// STEP 5: Test {C, F}
// {CF}⁺ (computed above) = {A,B,C,D,E,F} = all ✓
// Is it minimal?
//   Remove C? {F}⁺: no FD has just F on LHS → {F}⁺ = {F} ≠ all → cannot remove C ✓
//   Remove F? {C}⁺: C→? no FD has just C on LHS → {C}⁺ = {C} ≠ all → cannot remove F ✓
// CF is MINIMAL → CF is a CANDIDATE KEY ✓

// FINAL ANSWER: Candidate keys = {A,B,F} and {C,F}
// (Check any other combinations systematically to confirm no others)
// Verify: A appears in ABF, F appears in both — consistent with our classification`}
          </CodeBox>
        </div>

        <SubTitle>The Attribute Closure Algorithm — Uses Beyond Candidate Key Finding</SubTitle>

        <Para>
          The attribute closure algorithm answers every important question about FDs efficiently.
          Here are its primary applications:
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            {
              use: 'Test FD membership',
              desc: 'Does X → Y hold in F⁺? Compute X⁺. If Y ⊆ X⁺ → yes. Else → no.',
              color: '#0078d4',
              example: 'Does AB → E hold? Compute {AB}⁺. If E ∈ {AB}⁺ → yes.',
            },
            {
              use: 'Test if X is a superkey',
              desc: 'Compute X⁺. If X⁺ = all attributes of R → X is a superkey.',
              color: 'var(--accent)',
              example: '{A,B}⁺ = {A,B,C,D,E} = all → AB is a superkey.',
            },
            {
              use: 'Find all candidate keys',
              desc: 'Test all subsets systematically (start with single attributes, then pairs, etc.). A subset is a candidate key if it is a superkey AND no proper subset is also a superkey.',
              color: '#f97316',
              example: 'Test {A}, {B}, {C}, {AB}, {AC}, ... until all minimal superkeys found.',
            },
            {
              use: 'Test if a decomposition is lossless',
              desc: 'Decompose R into R1(X,Y) and R2(X,Z). Check if X → Y or X → Z holds (i.e., if Y ⊆ X⁺ or Z ⊆ X⁺). If either holds → lossless decomposition.',
              color: '#8b5cf6',
              example: 'Decompose courses into (course_id, teacher_id) and (teacher_id, teacher_name). Is teacher_id → teacher_name? Compute {teacher_id}⁺ — if teacher_name ∈ closure → lossless.',
            },
            {
              use: 'Test if an FD is redundant',
              desc: 'An FD X → Y is redundant in F if Y ⊆ X⁺ computed from F − {X→Y}. If removing it from F does not change any closure, it is redundant.',
              color: '#facc15',
              example: 'F = {A→B, B→C, A→C}. Is A→C redundant? {A}⁺ from {A→B, B→C} = {A,B,C} → C ∈ closure → A→C is redundant.',
            },
            {
              use: 'Test if an attribute is extraneous',
              desc: 'In FD XA → Y, is A extraneous? Compute X⁺ from F. If Y ⊆ X⁺ → A is extraneous in XA → Y (X alone already determines Y).',
              color: '#e879f9',
              example: 'F = {AB→C, A→C}. In AB→C, is B extraneous? {A}⁺ from F = {A,C} → C ∈ {A}⁺ → B is extraneous in AB→C. Simplify to A→C.',
            },
          ].map((item) => (
            <div key={item.use} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.use}</div>
              <Para>{item.desc}</Para>
              <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '6px 10px' }}>{item.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 6 — CANONICAL COVER
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — The Minimal FD Set" />
        <SectionTitle>Canonical Cover (Minimal Cover) — Reducing FDs to Their Essence</SectionTitle>

        <Para>
          In practice, the set of FDs given for a schema is often redundant — it contains
          FDs that can be derived from others, and individual FDs may have extraneous
          attributes on their left-hand sides. A
          <strong style={{ color: 'var(--text)' }}> canonical cover</strong> (also called
          a minimal cover, written F_c) is an equivalent set of FDs that has no redundancy:
          no extraneous attributes anywhere, no redundant FDs, and every FD has a single
          attribute on its right-hand side.
        </Para>

        <Para>
          Canonical covers are important for two reasons. First, they give you the smallest
          possible set of FDs that is logically equivalent to the original — useful for
          understanding the true constraints of a schema without noise. Second, they are
          used in the 3NF synthesis algorithm to produce a minimal set of tables in a
          3NF decomposition.
        </Para>

        <SubTitle>What Makes an FD Set Canonical (Minimal)</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            {
              property: 'No extraneous attributes on the LHS',
              desc: 'For every FD X → A in F_c, no attribute in X is extraneous — removing any attribute from X changes the closure. Every LHS attribute genuinely contributes to the dependency.',
              color: '#0078d4',
            },
            {
              property: 'No extraneous attributes on the RHS',
              desc: 'Each FD in F_c has exactly ONE attribute on its right-hand side. X → AB is not canonical — it must be split into X → A and X → B using Decomposition.',
              color: 'var(--accent)',
            },
            {
              property: 'No redundant FDs',
              desc: 'No FD in F_c can be derived from the remaining FDs in F_c. Removing any FD changes the closure of some attribute set — every FD genuinely contributes.',
              color: '#f97316',
            },
          ].map((item) => (
            <div key={item.property} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.property}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <SubTitle>The Canonical Cover Algorithm — Step by Step</SubTitle>

        <CodeBox label="Canonical cover algorithm — the complete procedure">
{`// INPUT: A set of functional dependencies F
// OUTPUT: A canonical cover F_c equivalent to F

// PHASE 1: Convert all FDs to have single-attribute RHS (Decomposition Rule)
// For each FD X → {A, B, C, ...}, replace with X→A, X→B, X→C, ...

Example: F = {A → BC, B → C, A → B, AB → C}
After Phase 1:
F = {A→B, A→C, B→C, A→B, AB→C}
// Note: A→B appears twice — keep one copy

// PHASE 2: Remove extraneous attributes from LHS of each FD
// For each FD XA → B in F, check if A is extraneous:
//   Compute X⁺ using F (not F − {XA→B}, use the full F)
//   If B ∈ X⁺ → A is extraneous → replace XA→B with X→B

// Check AB → C (from our F):
//   Is A extraneous in AB → C?
//   Compute {B}⁺ using all of F = {A→B, A→C, B→C, AB→C}:
//     Start {B}
//     B→C: add C → {B,C}
//   {B}⁺ = {B,C} → C ∈ {B}⁺ → A IS extraneous in AB→C
//   Replace AB→C with B→C (already in F — this one is now truly redundant)

// After Phase 2: F = {A→B, A→C, B→C}

// PHASE 3: Remove redundant FDs
// For each FD X → A in F, check if it is redundant:
//   Compute X⁺ using F − {X→A}
//   If A ∈ X⁺ → X→A is redundant → remove it

// Check A→C: Is it redundant?
//   Compute {A}⁺ using F − {A→C} = {A→B, B→C}:
//     Start {A}
//     A→B: add B → {A,B}
//     B→C: add C → {A,B,C}
//   {A}⁺ = {A,B,C} → C ∈ {A}⁺ → A→C IS redundant → REMOVE

// Check A→B: Is it redundant?
//   Compute {A}⁺ using F − {A→B} = {B→C}:
//     Start {A}
//     B→C: need B — not in {A}. No FD fires.
//   {A}⁺ = {A} → B ∉ {A}⁺ → A→B is NOT redundant → KEEP

// Check B→C: Is it redundant?
//   Compute {B}⁺ using F − {B→C} = {A→B}:
//     Start {B}
//     A→B: need A — not in {B}. No FD fires.
//   {B}⁺ = {B} → C ∉ {B}⁺ → B→C is NOT redundant → KEEP

// CANONICAL COVER: F_c = {A→B, B→C}
// Verify equivalence: {A}⁺ under F_c = {A,B,C} same as under original F? YES ✓
// Verify: {B}⁺ under F_c = {B,C} same as under F? YES ✓
// F_c is equivalent to F, has 2 FDs instead of 4, and all are non-redundant.`}
        </CodeBox>

        <SubTitle>Another Complete Example — Starting from Scratch</SubTitle>

        <CodeBox label="Canonical cover — full worked example with messy initial FDs">
{`// Relation R(A, B, C, D) with:
// F = {A→BCD, AB→C, A→BC, B→D}
// Find the canonical cover.

// PHASE 1: Single-attribute RHS
// A→BCD becomes: A→B, A→C, A→D
// AB→C stays:    AB→C
// A→BC becomes:  A→B, A→C  (already separated above)
// B→D stays:     B→D

// After deduplication:
F = {A→B, A→C, A→D, AB→C, B→D}

// PHASE 2: Remove extraneous LHS attributes
// Check AB→C: Is A extraneous?
//   {B}⁺ from F = {A→B, A→C, A→D, AB→C, B→D}:
//     Start {B}
//     B→D: add D → {B,D}
//     No other FD fires with just {B,D}.
//   {B}⁺ = {B,D} → C ∉ {B}⁺ → A is NOT extraneous in AB→C

//   Is B extraneous in AB→C?
//   {A}⁺ from F:
//     Start {A}
//     A→B: add B → {A,B}
//     A→C: add C → {A,B,C}
//     A→D: add D → {A,B,C,D}
//   {A}⁺ = {A,B,C,D} → C ∈ {A}⁺ → B IS extraneous in AB→C
//   Replace AB→C with A→C (already in F)

// After Phase 2: F = {A→B, A→C, A→D, B→D}
// (AB→C reduced to A→C, which was already present — just keep one copy)

// PHASE 3: Remove redundant FDs
// Check A→B: {A}⁺ from F − {A→B} = {A→C, A→D, B→D}:
//   Start {A}, A→C: {A,C}, A→D: {A,C,D}. B ∉ → NOT redundant. KEEP.

// Check A→C: {A}⁺ from F − {A→C} = {A→B, A→D, B→D}:
//   Start {A}, A→B: {A,B}, A→D: {A,B,D}, B→D: D already there.
//   {A}⁺ = {A,B,D} → C ∉ → NOT redundant. KEEP.

// Check A→D: {A}⁺ from F − {A→D} = {A→B, A→C, B→D}:
//   Start {A}, A→B: {A,B}, A→C: {A,B,C}, B→D: {A,B,C,D}
//   {A}⁺ = {A,B,C,D} → D ∈ {A}⁺ → A→D IS redundant (A→B→D). REMOVE.

// Check B→D: {B}⁺ from F − {B→D} = {A→B, A→C}:
//   Start {B}. No FD with just B on LHS. {B}⁺ = {B} → D ∉ → NOT redundant. KEEP.

// CANONICAL COVER: F_c = {A→B, A→C, B→D}
// Much cleaner than the original 5 FDs (which reduced to 4 after dedup, now 3).
// Verification: A⁺ under F_c: {A}→B→D, A→C → {A,B,C,D} = same as under original F ✓`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — EQUIVALENCE OF FD SETS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Equivalence" />
        <SectionTitle>Equivalence of FD Sets — When Two Sets Represent the Same Constraints</SectionTitle>

        <Para>
          Two sets of functional dependencies F and G are
          <strong style={{ color: 'var(--text)' }}> equivalent</strong> (written F ≡ G)
          if they have the same closure: F⁺ = G⁺. Equivalence means they impose exactly
          the same constraints on any relation — no more, no less.
        </Para>

        <Para>
          Equivalence is important because: (a) the canonical cover of F is equivalent to F
          but simpler, (b) different decompositions may have different sets of FDs but still
          be equivalent to the original, and (c) testing equivalence is a common GATE question type.
        </Para>

        <CodeBox label="Testing FD set equivalence — the practical algorithm">
{`// F and G are equivalent if and only if F ⊆ G⁺ AND G ⊆ F⁺
// (Every FD in F can be derived from G, and every FD in G can be derived from F)

// PROCEDURE:
// For each FD X → Y in F:
//   Compute X⁺ using G
//   Check if Y ⊆ X⁺
//   If NO → G cannot derive this FD → F ≢ G
// For each FD X → Y in G:
//   Compute X⁺ using F
//   Check if Y ⊆ X⁺
//   If NO → F cannot derive this FD → F ≢ G

// EXAMPLE:
// F = {A→B, B→C, A→C}
// G = {A→B, B→C}

// Does F ⊆ G⁺?
//   A→B: {A}⁺ under G: A→B → {A,B}. B ∈ {A}⁺ → A→B derivable from G ✓
//   B→C: {B}⁺ under G: B→C → {B,C}. C ∈ {B}⁺ → B→C derivable from G ✓
//   A→C: {A}⁺ under G: A→B→C → {A,B,C}. C ∈ {A}⁺ → A→C derivable from G ✓
// F ⊆ G⁺ ✓

// Does G ⊆ F⁺?
//   A→B: in F directly → derivable ✓
//   B→C: in F directly → derivable ✓
// G ⊆ F⁺ ✓

// CONCLUSION: F ≡ G — they are equivalent.
// G is a canonical cover of F (A→C is redundant in F).`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — FDs AND NORMAL FORMS — THE COMPLETE CONNECTION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — FDs and Normal Forms" />
        <SectionTitle>The Precise Connection Between FDs and Every Normal Form</SectionTitle>

        <Para>
          Now that functional dependencies are fully understood, we can state every
          normal form condition precisely using FD language. This is how normalization
          is implemented algorithmically — not by intuition, but by mechanical FD testing.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              nf: '1NF',
              color: '#0078d4',
              fdCondition: 'No FD condition — 1NF is a structural property about attribute atomicity. Every attribute must have an atomic domain (no set-valued attributes). A relation is automatically in 1NF if its schema has a primary key and all domains are atomic.',
              testUsing: 'Inspect the schema domains. No algorithmic FD test required.',
              violation: 'multi-valued or composite attribute values in a single cell.',
            },
            {
              nf: '2NF',
              color: 'var(--accent)',
              fdCondition: 'A relation R with primary key PK is in 2NF if and only if for every non-trivial FD X → A where A is a non-prime attribute: X is not a proper subset of PK. In other words: no partial dependency X → A exists where X ⊂ PK (proper subset).',
              testUsing: 'For each attribute A not in any candidate key, compute whether any proper subset of the primary key determines A. If yes → 2NF violation.',
              violation: 'non-prime attribute determined by only part of a composite primary key.',
            },
            {
              nf: '3NF',
              color: '#f97316',
              fdCondition: 'A relation R is in 3NF if and only if for every non-trivial FD X → A in F⁺, at least one of: (1) X is a superkey of R, OR (2) A is a prime attribute (member of some candidate key of R).',
              testUsing: 'Find all candidate keys (attribute closures). For each non-trivial FD X → A: check if X is a superkey OR A is prime. If neither → 3NF violation.',
              violation: 'non-prime attribute determined by a non-superkey that is not itself a prime attribute.',
            },
            {
              nf: 'BCNF',
              color: '#8b5cf6',
              fdCondition: 'A relation R is in BCNF if and only if for every non-trivial FD X → Y in F⁺, X is a superkey of R. Period. No exceptions for prime attributes.',
              testUsing: 'Find all candidate keys. For each non-trivial FD X → Y: check if X is a superkey. If not → BCNF violation, regardless of whether Y is prime.',
              violation: 'any non-trivial FD where the LHS is not a superkey.',
            },
            {
              nf: '4NF',
              color: '#facc15',
              fdCondition: 'A relation R is in 4NF if and only if for every non-trivial multi-valued dependency X ↠ Y in R, X is a superkey. FDs are a special case of MVDs (X → Y implies X ↠ Y), so every BCNF relation is automatically in 4NF with respect to functional dependencies. The additional constraint is about MVDs that are not implied by FDs.',
              testUsing: 'Identify independent multi-valued attributes of the same key. Check if any two independent sets of multi-valued facts are being stored in the same table.',
              violation: 'two independent multi-valued facts about the same key coexisting in one table.',
            },
          ].map((item) => (
            <div key={item.nf} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 6, padding: '3px 12px' }}>{item.nf}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12 }}>
                {[
                  { label: 'FD Condition', value: item.fdCondition },
                  { label: 'How to Test', value: item.testUsing },
                  { label: 'What it Eliminates', value: item.violation },
                ].map((detail) => (
                  <div key={detail.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{detail.label}</div>
                    <Para>{detail.value}</Para>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SubTitle>The 3NF Synthesis Algorithm — Using FDs to Design Schemas</SubTitle>

        <Para>
          The 3NF synthesis algorithm uses FDs to produce a guaranteed 3NF decomposition
          that is both lossless and dependency-preserving. It is the algorithmic realisation
          of what we did manually in Module 05.
        </Para>

        <CodeBox label="3NF Synthesis Algorithm — the complete procedure">
{`// INPUT: Relation R with attributes U and FD set F
// OUTPUT: A 3NF decomposition that is lossless and dependency-preserving

// STEP 1: Find the canonical cover F_c of F
// (Remove redundant FDs and extraneous attributes as described in Part 06)

// STEP 2: Create one relation schema for each FD in F_c
// For each FD X → A in F_c, create a relation R_i(X ∪ A)
// (The LHS attributes plus the single RHS attribute form one table)

// STEP 3: If no relation in the decomposition contains a candidate key of R,
// add a relation containing the attributes of one candidate key.
// (This ensures the decomposition is lossless)

// STEP 4: Remove any relation R_i that is a subset of another relation R_j
// (Eliminate redundant tables)

// WORKED EXAMPLE:
// R(student_id, student_name, dept_id, dept_name, course_id, course_name, grade)
// FDs: F = {student_id → student_name, student_id → dept_id, dept_id → dept_name,
//            course_id → course_name, (student_id, course_id) → grade}

// STEP 1: Find canonical cover
// Check for extraneous attributes and redundant FDs:
// student_id → student_name: not redundant ✓
// student_id → dept_id:      not redundant ✓  
// dept_id → dept_name:       not redundant ✓
// course_id → course_name:   not redundant ✓
// (student_id, course_id) → grade: not redundant (neither alone determines grade) ✓
// F_c = F (already canonical in this example)

// STEP 2: Create one relation per FD in F_c
// R1(student_id, student_name)      ← from student_id → student_name
// R2(student_id, dept_id)           ← from student_id → dept_id
// R3(dept_id, dept_name)            ← from dept_id → dept_name
// R4(course_id, course_name)        ← from course_id → course_name
// R5(student_id, course_id, grade)  ← from (student_id, course_id) → grade

// STEP 3: Does any relation contain a candidate key of R?
// Candidate key of R: (student_id, course_id) — appears in R5 ✓
// No additional relation needed.

// STEP 4: Remove subsets
// R2(student_id, dept_id) — is this a subset of any other relation? No.
// All relations survive.

// FINAL 3NF SCHEMA:
// R1(student_id PK, student_name)
// R2(student_id PK, dept_id FK→R?)  ← Actually merge R1 and R2 since same PK
// Better: STUDENTS(student_id PK, student_name, dept_id FK)
// DEPARTMENTS(dept_id PK, dept_name)
// COURSES(course_id PK, course_name)
// ENROLLMENTS(student_id PK/FK, course_id PK/FK, grade)

// The 3NF synthesis algorithm formally produces this decomposition.
// In practice, good database designers apply the same logic intuitively.
// For exams: know the formal algorithm to apply it mechanically when needed.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — COMMON MISTAKES AND MISCONCEPTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Mistakes" />
        <SectionTitle>FD Misconceptions That Cost Marks and Cause Production Bugs</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              misconception: 'Reading FDs from data instead of semantics',
              color: '#ff4757',
              wrong: 'Looking at a table snapshot where no two rows share the same city value and concluding "city → employee_id" holds.',
              correct: 'FDs are semantic constraints — they must be true for ALL possible data, not just the current snapshot. If city → employee_id happened to hold today (because no two employees share a city), a single new hire from an existing city would violate it. FDs must be established from domain knowledge: "Does each city value uniquely identify exactly one employee?" The answer from business rules is clearly no.',
            },
            {
              misconception: 'Confusing FD direction (X→Y means X determines Y, NOT Y→X)',
              color: '#f97316',
              wrong: 'Given employee_id → name, concluding that name → employee_id also holds.',
              correct: 'employee_id → name means: knowing the employee ID tells you the name. This does NOT imply name → employee_id. Multiple employees can share the same name (Rahul Sharma might be common). The FD employee_id → name does NOT mean names are unique. Only if you separately established that names ARE unique (perhaps email is unique, not names) does name → employee_id hold. Arrow direction matters completely.',
            },
            {
              misconception: 'Thinking that FD X→Y requires all of X to be used',
              color: '#facc15',
              wrong: 'Given {A,B} → C, concluding that both A AND B together are always needed to determine C.',
              correct: 'An FD {A,B} → C means: IF you know both A and B, THEN you can determine C. It does NOT mean that A alone cannot determine C or B alone cannot determine C. It is entirely possible that A → C also holds (making B extraneous in AB→C). This is why we check for extraneous attributes in canonical cover computation — we verify whether any LHS attributes are genuinely necessary.',
            },
            {
              misconception: 'Claiming a relation is in some normal form based on the primary key alone',
              color: '#8b5cf6',
              wrong: 'A table has a composite PK (A, B). Therefore it cannot be in BCNF because "composite PKs create partial dependencies."',
              correct: 'Having a composite primary key does not automatically mean 2NF is violated — it depends on whether there ARE partial dependencies. A composite key table can be in BCNF if all FDs have superkeys on the LHS. Conversely, a single-attribute PK table can violate 3NF if transitive dependencies exist. Normal forms are determined by the FDs, not by the structure of the primary key alone.',
            },
            {
              misconception: 'Assuming X⁺ = X always initially',
              color: '#e879f9',
              wrong: 'Starting closure computation of {A,B} with closure = {} and needing to add A and B manually.',
              correct: 'The closure of X always starts as X itself (by Reflexivity — X determines everything in X trivially). You initialise closure = X, then apply FDs to grow it. Starting from empty and adding X manually gives the same result but adds confusion. The correct mental model: I know everything in X, what else can I figure out from the given FDs?',
            },
            {
              misconception: 'Thinking canonical cover is unique',
              color: '#0078d4',
              wrong: 'F has exactly one canonical cover.',
              correct: 'A canonical cover is NOT unique. Different orderings of the algorithm steps can produce different but equally valid canonical covers — all equivalent to F, all with no redundancy, but potentially different sets of FDs. For example, if F = {A→B, A→C, B→C}, the canonical cover could be {A→B, B→C} or (if we happened to remove B→C first) {A→C, ...} — but we must verify the result is equivalent to F. This is why the algorithm says "a canonical cover" not "the canonical cover."',
            },
            {
              misconception: 'Confusing attribute closure with FD closure',
              color: '#f97316',
              wrong: 'Thinking X⁺ (attribute closure) and F⁺ (FD closure) are the same thing.',
              correct: 'They are completely different objects. X⁺ (attribute closure of X) is a SET OF ATTRIBUTES — the attributes that X can determine. F⁺ (closure of FD set F) is a SET OF FUNCTIONAL DEPENDENCIES — all FDs that can be derived from F. Computing X⁺ uses the attribute closure algorithm (efficient). Computing F⁺ involves generating all possible FDs derivable from F (exponential — impractical). In practice, we always compute X⁺ and use it to test membership in F⁺.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>{item.misconception}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Wrong:</span>
                <span style={{ fontSize: 13, color: '#ff4757', fontFamily: 'Inter, sans-serif', lineHeight: 1.75, fontStyle: 'italic' }}>{item.wrong}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Correct:</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', lineHeight: 1.85 }}>{item.correct}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 10 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>FDs in Production — Finding and Fixing a Schema Designed Without FD Analysis</SectionTitle>

        <Para>
          Most production schemas were never formally analysed for functional dependencies —
          they were designed by intuition. The result is almost always hidden redundancies
          and anomalies that only surface after the system is in production with real data
          volumes. Here is a realistic scenario showing how FD analysis diagnoses and
          fixes a production problem.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Production Incident — Data Inconsistency in Sales Reports
          </div>

          <Para>
            The sales team reports that the same product shows different prices in different reports.
            Product "Chicken Biryani" shows ₹280 in the order history report and ₹300 in the
            product catalogue report. An engineer investigates.
          </Para>

          <CodeBox label="The problematic schema — no FD analysis was done">
{`-- The original schema (intuition-designed, never FD-analysed):
CREATE TABLE order_details (
    order_id          INT           NOT NULL,
    product_id        INT           NOT NULL,
    product_name      VARCHAR(200),   -- stored here for "convenience"
    product_category  VARCHAR(100),   -- stored here for "convenience"
    current_price     DECIMAL(10,2),  -- PROBLEM: whose current? when?
    ordered_qty       INT             NOT NULL,
    unit_price        DECIMAL(10,2),  -- price at time of order
    customer_id       INT             NOT NULL,
    customer_name     VARCHAR(100),   -- stored here for "convenience"
    customer_city     VARCHAR(100),   -- stored here for "convenience"
    order_date        DATE            NOT NULL,
    
    PRIMARY KEY (order_id, product_id)
);`}
          </CodeBox>

          <Para>
            <strong style={{ color: 'var(--text)' }}>FD Analysis — diagnosing the problem formally:</strong>
          </Para>

          <CodeBox label="FD analysis reveals the root cause">
{`// Identify all FDs that should hold on order_details:
// PK = (order_id, product_id)

// product_id → product_name, product_category, current_price
//   (product attributes depend only on product_id — PARTIAL DEPENDENCY on PK)
//   → 2NF VIOLATION → update anomaly root cause!

// customer_id → customer_name, customer_city
//   (customer attributes depend only on customer_id)
//   But customer_id itself depends on order_id → TRANSITIVE DEPENDENCY
//   → 3NF VIOLATION

// order_id → customer_id, order_date
//   (order attributes depend on order_id — PARTIAL DEPENDENCY on PK)
//   → 2NF VIOLATION

// (order_id, product_id) → ordered_qty, unit_price
//   These correctly depend on the full PK

// THE INCIDENT ROOT CAUSE:
// current_price is product_id → current_price (partial dependency).
// When a product's price changes, engineers run:
// UPDATE products SET price = 300 WHERE product_id = 101;
// They update the products table (not order_details).
// But order_details ALSO stores current_price (copied at order insertion).
// The two values diverge → two different prices in two different queries
// depending on which table they source from.`}
          </CodeBox>

          <CodeBox label="The fix — normalised schema derived from FD analysis">
{`-- After FD analysis: extract each dependency set to its own table

CREATE TABLE products (
    product_id    SERIAL         PRIMARY KEY,
    product_name  VARCHAR(200)   NOT NULL,
    category      VARCHAR(100),
    current_price DECIMAL(10,2)  NOT NULL  -- single source of truth for CURRENT price
);

CREATE TABLE customers (
    customer_id    SERIAL        PRIMARY KEY,
    customer_name  VARCHAR(100)  NOT NULL,
    customer_city  VARCHAR(100)
);

CREATE TABLE orders (
    order_id     SERIAL   PRIMARY KEY,
    customer_id  INT      NOT NULL,
    order_date   DATE     NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_id    INT           NOT NULL,
    product_id  INT           NOT NULL,
    ordered_qty INT           NOT NULL CHECK (ordered_qty > 0),
    unit_price  DECIMAL(10,2) NOT NULL,  -- SNAPSHOT: price at time of order (historical)
    -- unit_price is INTENTIONAL denormalisation for historical accuracy
    -- It is NOT synced with products.current_price — that is correct by design
    
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- NOW: "current price" always comes from products.current_price (single source)
-- "historical price" always comes from order_items.unit_price (snapshot)
-- These are genuinely different data — one current fact, one historical fact
-- They SHOULD be different values when prices change — by design

-- QUERIES:
-- Product catalogue price (always current):
SELECT product_name, current_price FROM products WHERE product_id = 101;

-- Order history price (always historical snapshot):
SELECT oi.unit_price, o.order_date
FROM order_items oi JOIN orders o ON oi.order_id = o.order_id
WHERE oi.product_id = 101;

-- No more inconsistency — two different CORRECT answers for two different questions.`}
          </CodeBox>

          <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.85, fontFamily: 'Inter, sans-serif' }}>
              The incident was caused by a 2NF violation (product_id → current_price stored inside
              a table whose PK includes order_id). FD analysis in 30 minutes during the design phase
              would have caught this before any code was written. A formal FD analysis is not
              academic overhead — it is the fastest way to find every anomaly that will eventually
              cause a production incident.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 11 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>FD Interview and GATE Questions — With Complete Solutions</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'R(A,B,C,D) with FDs: A→B, B→C, C→D, D→A. How many candidate keys does R have?',
              color: '#0078d4',
              solution: `All attributes form a cycle: A→B→C→D→A. Each single attribute can derive all others through the cycle. Test each:
{A}⁺: A→B→C→D→A = {A,B,C,D} = all → A is candidate key
{B}⁺: B→C→D→A→B = {A,B,C,D} = all → B is candidate key  
{C}⁺: C→D→A→B→C = {A,B,C,D} = all → C is candidate key
{D}⁺: D→A→B→C→D = {A,B,C,D} = all → D is candidate key
All 4 single attributes are candidate keys. R has 4 candidate keys.
Every attribute is a prime attribute → no non-prime attributes → R is in BCNF.`,
            },
            {
              q: 'R(A,B,C,D,E) with FDs: AB→C, D→E, E→D. Find all candidate keys.',
              color: 'var(--accent)',
              solution: `Classify: A appears only on LHS (AB→C) → must be in every candidate key.
B appears only on LHS (AB→C) → must be in every candidate key.
D,E appear on both sides (D→E, E→D) — they determine each other but not C.
C appears only on RHS → cannot alone determine everything.

Test {A,B}: {AB}⁺: AB→C → {A,B,C}. D→E, E→D with {A,B,C}: no D or E yet.
{AB}⁺ = {A,B,C} ≠ all → not a candidate key.

Test {A,B,D}: {ABD}⁺: AB→C → {A,B,C,D}, D→E → {A,B,C,D,E} = all ✓
Minimal? Remove A: {BD}⁺ = {B,D,E} (D→E) ≠ all → cannot remove A.
Remove B: {AD}⁺ = {A,D,E} (D→E) ≠ all → cannot remove B.  
Remove D: {AB}⁺ = {A,B,C} ≠ all → cannot remove D. → ABD is a CANDIDATE KEY ✓

Test {A,B,E}: {ABE}⁺: AB→C → {A,B,C,E}, E→D → {A,B,C,D,E} = all ✓
Minimal? Same analysis as ABD → ABE is a CANDIDATE KEY ✓

Any others? Any set containing {AB} plus D or E gives a candidate key.
{ABD} and {ABE} are the only two candidate keys.`,
            },
            {
              q: 'Given F = {A→BC, CD→E, B→D, E→A}. Is FD CD→AB derivable from F?',
              color: '#f97316',
              solution: `To test if CD→AB holds in F⁺, compute {CD}⁺ under F and check if {A,B} ⊆ {CD}⁺.

{CD}⁺: Start {C,D}
  A→BC: need A — not in closure. Skip.
  CD→E: {C,D} ⊆ {C,D} → add E → {C,D,E}
  B→D: need B — not in closure. Skip.
  E→A: {E} ⊆ {C,D,E} → add A → {A,C,D,E}

Iteration 2:
  A→BC: {A} ⊆ {A,C,D,E} → add B,C → {A,B,C,D,E}
  All other FDs: nothing new to add.

{CD}⁺ = {A,B,C,D,E} → A ∈ {CD}⁺ and B ∈ {CD}⁺ → YES, CD→AB is derivable from F ✓`,
            },
            {
              q: 'R(P,Q,R,S) with FDs: P→Q, Q→R, R→S, S→P. What is the highest normal form R satisfies?',
              color: '#8b5cf6',
              solution: `Every attribute forms a cycle with all others. As in the first question pattern:
{P}⁺ = {P,Q,R,S} = all → P is candidate key
{Q}⁺ = {Q,R,S,P} = all → Q is candidate key
{R}⁺ = {R,S,P,Q} = all → R is candidate key
{S}⁺ = {S,P,Q,R} = all → S is candidate key

All 4 attributes are candidate keys → ALL attributes are prime attributes → NO non-prime attributes exist.

Normal form analysis:
1NF: assume atomic values → satisfied ✓
2NF: no non-prime attributes → no partial dependencies possible → satisfied ✓  
3NF: no non-prime attributes → no transitive dependencies possible → satisfied ✓
BCNF: for every non-trivial FD X→Y, is X a superkey?
  P→Q: P is a candidate key (superkey) ✓
  Q→R: Q is a candidate key ✓
  R→S: R is a candidate key ✓
  S→P: S is a candidate key ✓
All FDs have superkeys on LHS → BCNF satisfied ✓
4NF: no independent MVDs (all MVDs are implied by FDs) → 4NF satisfied ✓
5NF: No join dependencies beyond what keys imply → 5NF satisfied ✓

ANSWER: R is in 5NF (and all lower normal forms).`,
            },
            {
              q: 'R(A,B,C,D) with FDs: A→B, B→C, A→C, A→D. Find the canonical cover.',
              color: '#facc15',
              solution: `PHASE 1: Single-attribute RHS — already done (all FDs have one attribute on RHS).
F = {A→B, B→C, A→C, A→D}

PHASE 2: Remove extraneous LHS attributes — no FD has composite LHS → skip.

PHASE 3: Remove redundant FDs:
Check A→C: {A}⁺ from F − {A→C} = {A→B, B→C, A→D}:
  A→B → {A,B}, B→C → {A,B,C}, A→D → {A,B,C,D}
  {A}⁺ = {A,B,C,D} → C ∈ {A}⁺ → A→C IS redundant → REMOVE.

F now = {A→B, B→C, A→D}

Check A→B: {A}⁺ from {B→C, A→D}:
  A→D → {A,D}. B not reachable. {A}⁺ = {A,D} → B ∉ → NOT redundant. KEEP.

Check B→C: {B}⁺ from {A→B, A→D}:
  Need A to use A→B or A→D. Can't get A from B. {B}⁺ = {B} → C ∉ → NOT redundant. KEEP.

Check A→D: {A}⁺ from {A→B, B→C}:
  A→B → {A,B}, B→C → {A,B,C}. {A}⁺ = {A,B,C} → D ∉ → NOT redundant. KEEP.

CANONICAL COVER: F_c = {A→B, B→C, A→D}
Verify: {A}⁺ under F_c = {A}→B→C, A→D = {A,B,C,D} = same as under original F ✓`,
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Q{i + 1}: {item.q}</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Complete Solution</div>
                <pre style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'var(--font-mono)', lineHeight: 1.85, whiteSpace: 'pre-wrap', margin: 0 }}>{item.solution}</pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A functional dependency X → Y is a constraint on ALL valid instances of a relation: whenever two tuples agree on X, they must agree on Y. FDs are schema-level constraints derived from domain semantics — never from inspecting current data.',
        'Trivial FD: Y ⊆ X — always holds by set theory, carries no useful design information. Non-trivial FD: Y ⊄ X — carries meaningful constraint information. Completely non-trivial: X ∩ Y = ∅. All normal form definitions are stated in terms of non-trivial FDs.',
        "Armstrong's 3 Axioms are sound and complete: Reflexivity (Y ⊆ X → X→Y), Augmentation (X→Y → XZ→YZ), Transitivity (X→Y and Y→Z → X→Z). All valid FDs can be derived using only these three rules. Three derived rules (Union, Decomposition, Pseudotransitivity) speed up practical derivation.",
        'The attribute closure X⁺ is the set of all attributes determined by X under F. Algorithm: start with X, repeatedly apply FDs to grow the set until stable. X⁺ = all attributes → X is a superkey. X⁺ = all and X is minimal → X is a candidate key. Time complexity: O(n²).',
        'Finding ALL candidate keys: classify attributes (LHS-only attributes must be in every CK, RHS-only attributes cannot be in any CK). Test subsets starting from smallest, compute closures, verify minimality. The attribute closure algorithm is the only reliable method.',
        'F⁺ (FD set closure) = all FDs derivable from F. Computing F⁺ explicitly is exponential. Instead, test FD membership by computing attribute closures: X → Y ∈ F⁺ iff Y ⊆ X⁺.',
        'Canonical cover F_c: equivalent to F, with single-attribute RHS, no extraneous LHS attributes, no redundant FDs. Not unique — different orderings can produce different but equivalent canonical covers. Used in 3NF synthesis algorithm.',
        'Two FD sets F and G are equivalent iff F ⊆ G⁺ and G ⊆ F⁺ — every FD in each set is derivable from the other. Test using attribute closures: for each FD X→Y in F, verify Y ⊆ {X}⁺ under G, and vice versa.',
        '3NF test using FDs: for every non-trivial FD X → A, either X is a superkey OR A is prime. BCNF test: for every non-trivial FD X → Y, X must be a superkey — no exceptions. 3NF synthesis algorithm uses canonical cover to produce guaranteed 3NF decomposition that is lossless and dependency-preserving.',
        'Attribute classification shortcut for candidate key finding: attributes appearing ONLY on LHS of any FD must appear in every candidate key. Attributes appearing ONLY on RHS can never be in any candidate key. This dramatically reduces the search space.',
      ]} />

    </LearnLayout>
  )
}