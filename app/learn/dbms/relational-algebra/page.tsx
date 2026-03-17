import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Relational Algebra — Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete relational algebra from first principles — all operators with formal definitions, composition, equivalences, query trees, division operator, extended operators, SQL-to-algebra translation, and every GATE exam pattern with full worked solutions.',
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

const OpCard = ({
  symbol, name, type, color, arity, definition, notation, sql,
}: {
  symbol: string; name: string; type: string; color: string;
  arity: string; definition: string; notation: string; sql: string;
}) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${color}`, borderRadius: 10, padding: '18px 22px', marginBottom: 14 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 32, fontWeight: 900, color, fontFamily: 'serif', lineHeight: 1, minWidth: 36 }}>{symbol}</span>
      <div>
        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>{name}</div>
        <div style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{type} · {arity}</div>
      </div>
      <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, color, background: `${color}0e`, border: `1px solid ${color}25`, borderRadius: 6, padding: '4px 12px' }}>{notation}</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 10 }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
        <Para>{definition}</Para>
      </div>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>SQL Equivalent</div>
        <Para>{sql}</Para>
      </div>
    </div>
  </div>
)

export default function RelationalAlgebra() {
  return (
    <LearnLayout
      title="Relational Algebra"
      description="The procedural query language that SQL compiles into — every operator defined precisely, composed into queries, and applied to every GATE and interview problem type you will encounter."
      section="DBMS"
      readTime="80–95 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHAT RELATIONAL ALGEBRA IS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Language" />
        <SectionTitle>What Relational Algebra Is — And Why It Matters Beyond the Exam</SectionTitle>

        <Para>
          SQL is a declarative language — you describe what result you want and the database
          figures out how to produce it. Relational algebra is the procedural language that sits
          underneath SQL. When you write a SQL query, the database internally translates it
          into a relational algebra expression, then optimises that expression by applying
          algebraic equivalences, then executes the resulting plan.
        </Para>

        <Para>
          Understanding relational algebra gives you three practical abilities.
          First, you understand precisely what your SQL query means — not just
          approximately, but formally. When two SQL queries produce the same result,
          there is always a relational algebra equivalence that explains why.
          Second, you understand why the query optimiser rewrites queries the way it does —
          every query optimisation in Module 11 was an algebraic equivalence applied
          to the query tree. Third, you can express complex queries precisely for
          GATE exams and technical interviews — relational algebra questions are
          a staple of every DBMS examination.
        </Para>

        <Para>
          Relational algebra is a
          <strong style={{ color: 'var(--accent)' }}> closed</strong> language —
          every operator takes one or two relations as input and produces exactly
          one relation as output. This closure property is what allows arbitrary
          composition: you can nest any operator inside any other because every
          operation's output is a valid input for the next operation.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '18px 22px', marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Operator Taxonomy</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 12 }}>
            {[
              { category: 'Unary Operators', color: '#0078d4', ops: 'Selection (σ), Projection (π), Rename (ρ)', desc: 'Take one relation as input, produce one relation as output.' },
              { category: 'Set-Theoretic Binary', color: 'var(--accent)', ops: 'Union (∪), Difference (−), Intersection (∩), Cartesian Product (×)', desc: 'Take two union-compatible (or any, for ×) relations, produce one.' },
              { category: 'Relational Binary', color: '#f97316', ops: 'Join (⋈), Division (÷)', desc: 'Derived from the fundamental operators. Division is the most complex — handles "for all" queries.' },
              { category: 'Extended Operators', color: '#8b5cf6', ops: 'Generalised Projection, Aggregation (ℊ), Outer Joins', desc: 'Extensions to the basic model for practical query expression.' },
            ].map((item) => (
              <div key={item.category} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.category}</div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: item.color, marginBottom: 6, opacity: 0.8 }}>{item.ops}</div>
                <Para>{item.desc}</Para>
              </div>
            ))}
          </div>
        </div>

        <SubTitle>The Reference Schema — Used Throughout This Module</SubTitle>

        <CodeBox label="Reference tables for all examples">
{`// STUDENTS(student_id, name, city, gpa, dept_id)
// student_id | name           | city       | gpa  | dept_id
// -----------+----------------+------------+------+--------
// S001       | Rahul Sharma   | Bengaluru  | 8.5  | D01
// S002       | Priya Reddy    | Hyderabad  | 9.1  | D02
// S003       | Arjun Nair     | Mumbai     | 7.8  | D01
// S004       | Kavya Krishnan | Bengaluru  | 9.4  | D03
// S005       | Deepak Mehta   | Pune       | 8.2  | D02

// COURSES(course_id, course_name, dept_id, credits)
// course_id | course_name        | dept_id | credits
// ----------+--------------------+---------+--------
// CS301     | Database Systems   | D01     | 4
// CS302     | Algorithms         | D01     | 4
// CS401     | Machine Learning   | D02     | 3
// MA301     | Linear Algebra     | D03     | 3

// ENROLLMENTS(student_id, course_id, grade)
// student_id | course_id | grade
// -----------+-----------+------
// S001       | CS301     | A
// S001       | CS302     | B+
// S002       | CS301     | A+
// S002       | CS401     | A
// S003       | CS302     | A
// S004       | CS401     | A+
// S005       | CS301     | B

// DEPARTMENTS(dept_id, dept_name, hod)
// dept_id | dept_name          | hod
// --------+--------------------+-----------
// D01     | Computer Science   | Prof. Kumar
// D02     | AI & Data Science  | Prof. Rao
// D03     | Mathematics        | Prof. Mehta`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 2 — FUNDAMENTAL OPERATORS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The Six Fundamental Operators" />
        <SectionTitle>The Six Fundamental Operators — Every Other Operation Derives From These</SectionTitle>

        <Para>
          Six operators form the minimal complete set of relational algebra —
          any other operation can be expressed as a combination of these six.
          Codd proved this completeness: every query expressible in relational algebra
          can be expressed using only these six operators. The others we study
          (join, intersection, division) are convenient shorthands for combinations
          of fundamentals.
        </Para>

        {/* SELECTION */}
        <OpCard
          symbol="σ"
          name="Selection"
          type="Unary"
          color="#0078d4"
          arity="Input: 1 relation → Output: 1 relation (subset of rows)"
          definition="σ_condition(R) returns the set of all tuples in R that satisfy the given condition. The condition is a Boolean expression involving attribute names, constants, and comparison operators (=, ≠, <, >, ≤, ≥) connected by logical operators (∧ AND, ∨ OR, ¬ NOT)."
          notation="σ_{condition}(R)"
          sql="WHERE clause"
        />

        <CodeBox label="Selection — examples with every condition type">
{`// SIMPLE EQUALITY:
σ_{city='Bengaluru'}(STUDENTS)
// Returns: {(S001, Rahul, Bengaluru, 8.5, D01), (S004, Kavya, Bengaluru, 9.4, D03)}
// SQL: SELECT * FROM students WHERE city = 'Bengaluru'

// COMPARISON:
σ_{gpa > 9.0}(STUDENTS)
// Returns: {(S002, Priya, Hyderabad, 9.1, D02), (S004, Kavya, Bengaluru, 9.4, D03)}

// CONJUNCTION (AND — ∧):
σ_{city='Bengaluru' ∧ gpa > 8.0}(STUDENTS)
// Returns: {(S001, Rahul, Bengaluru, 8.5, D01), (S004, Kavya, Bengaluru, 9.4, D03)}
// SQL: WHERE city = 'Bengaluru' AND gpa > 8.0

// DISJUNCTION (OR — ∨):
σ_{city='Bengaluru' ∨ city='Mumbai'}(STUDENTS)
// Returns: Rahul, Kavya (Bengaluru), Arjun (Mumbai)

// NEGATION (NOT — ¬):
σ_{¬(dept_id='D01')}(STUDENTS)
// Returns: Priya (D02), Kavya (D03), Deepak (D02)

// INTER-ATTRIBUTE COMPARISON:
σ_{credits > 3}(COURSES)
// Returns all courses with more than 3 credits
// Credits can be compared to a constant OR to another attribute:
σ_{credits = credits_required}(ENROLLMENT_DETAILS)

// KEY PROPERTIES OF SELECTION:
// 1. Commutativity: σ_A(σ_B(R)) = σ_B(σ_A(R))  — order doesn't matter
// 2. Cascade: σ_{A∧B}(R) = σ_A(σ_B(R))          — split conjunctions
// 3. Idempotent: σ_A(σ_A(R)) = σ_A(R)             — applying twice = applying once
// 4. Output ≤ input: |σ(R)| ≤ |R|               — selection never adds rows`}
        </CodeBox>

        {/* PROJECTION */}
        <OpCard
          symbol="π"
          name="Projection"
          type="Unary"
          color="var(--accent)"
          arity="Input: 1 relation → Output: 1 relation (subset of columns)"
          definition="π_{A1,A2,...,Ak}(R) returns a relation containing only the specified attributes A1,...,Ak from every tuple in R. Duplicate tuples in the result are eliminated (since the result is a set). The schema of the result has only the listed attributes."
          notation="π_{A1,...,Ak}(R)"
          sql="SELECT column list (with implicit DISTINCT)"
        />

        <CodeBox label="Projection — duplicate elimination and composition with selection">
{`// SIMPLE PROJECTION:
π_{name, city}(STUDENTS)
// Returns: {(Rahul, Bengaluru), (Priya, Hyderabad), (Arjun, Mumbai), (Kavya, Bengaluru), (Deepak, Pune)}
// Note: no duplicates in this case (all names are unique)

// PROJECTION WITH DUPLICATES:
π_{city}(STUDENTS)
// Raw tuples: {Bengaluru, Hyderabad, Mumbai, Bengaluru, Pune}
// After duplicate elimination: {Bengaluru, Hyderabad, Mumbai, Pune}
// = 4 distinct cities from 5 students
// SQL: SELECT DISTINCT city FROM students

// COMPOSITION — selection then projection (the standard pattern):
π_{name, gpa}(σ_{dept_id='D01'}(STUDENTS))
// Step 1: σ selects CS department students: Rahul (8.5), Arjun (7.8)
// Step 2: π projects to name and gpa: {(Rahul, 8.5), (Arjun, 7.8)}
// SQL: SELECT name, gpa FROM students WHERE dept_id = 'D01'

// CRITICAL: Projection MUST include all columns needed by outer operations
// WRONG attempt:
π_{name}(σ_{dept_id='D01'}(π_{name}(STUDENTS)))
// The inner π removes dept_id, so the outer σ cannot filter by dept_id!
// CORRECT:
π_{name}(σ_{dept_id='D01'}(STUDENTS))
// Always apply σ before π when σ uses attributes not in π's output

// PROJECTION DOES NOT REORDER ROWS — it only removes columns
// The resulting relation has no inherent row order (set property)`}
        </CodeBox>

        {/* CARTESIAN PRODUCT */}
        <OpCard
          symbol="×"
          name="Cartesian Product"
          type="Binary"
          color="#ff4757"
          arity="Input: 2 relations → Output: 1 relation (every combination)"
          definition="R × S returns a relation containing all possible combinations of one tuple from R concatenated with one tuple from S. If R has m tuples and S has n tuples, R × S has m×n tuples. If R has attributes A1,...,Ak and S has B1,...,Bj, then R × S has attributes A1,...,Ak,B1,...,Bj (all attributes from both, renamed if there are conflicts)."
          notation="R × S"
          sql="FROM R, S (without WHERE — implicit CROSS JOIN)"
        />

        <CodeBox label="Cartesian product — explosion and combination with selection">
{`// CARTESIAN PRODUCT of small relations:
// Suppose R = {(a,1), (b,2)} and S = {(x), (y), (z)}
// R × S produces: {(a,1,x), (a,1,y), (a,1,z), (b,2,x), (b,2,y), (b,2,z)}
// |R × S| = 2 × 3 = 6 tuples

// STUDENTS × COURSES:
// |STUDENTS| = 5, |COURSES| = 4
// |STUDENTS × COURSES| = 5 × 4 = 20 tuples (every student-course combination)
// Most of these 20 combinations are meaningless — a student isn't necessarily
// enrolled in every course. We need a selection to filter meaningful combinations.

// THE JOIN = CARTESIAN PRODUCT + SELECTION:
// "Find all students and the courses they are enrolled in"
// Method 1: σ then × (join expressed using fundamentals)
σ_{STUDENTS.student_id = ENROLLMENTS.student_id}(STUDENTS × ENROLLMENTS)
// Step 1: form all 5 × 6 = 30 student-enrollment combinations
// Step 2: keep only those where student_id matches
// Result: 7 tuples (matching enrollments)

// This is EXPENSIVE — form 30 combinations just to keep 7.
// In practice, the database NEVER forms the full cross product.
// It uses a join algorithm (hash join, sort-merge, nested loop) which
// only produces matching combinations. But algebraically, join IS σ(R×S).

// ATTRIBUTE NAMING IN CROSS PRODUCT:
// If R and S have an attribute with the same name, qualify with relation name:
STUDENTS × DEPARTMENTS produces:
// STUDENTS.student_id, STUDENTS.name, STUDENTS.city, STUDENTS.gpa, STUDENTS.dept_id,
// DEPARTMENTS.dept_id, DEPARTMENTS.dept_name, DEPARTMENTS.hod
// Both have dept_id — renamed to STUDENTS.dept_id and DEPARTMENTS.dept_id`}
        </CodeBox>

        {/* UNION */}
        <OpCard
          symbol="∪"
          name="Union"
          type="Binary Set"
          color="#8b5cf6"
          arity="Input: 2 union-compatible relations → Output: 1 relation"
          definition="R ∪ S returns all tuples that appear in R, in S, or in both. Duplicates are eliminated. R and S must be union-compatible: same number of attributes (same degree), and corresponding attributes must have the same domain (compatible types). The result schema is defined as R's schema."
          notation="R ∪ S"
          sql="UNION (with implicit DISTINCT)"
        />

        <CodeBox label="Union — union-compatibility requirement and examples">
{`// UNION-COMPATIBILITY REQUIREMENT:
// Both relations must have SAME degree AND compatible attribute domains.
// Names do NOT need to match — only structure matters.

// VALID UNION (same structure):
// "Students from CS department OR students with GPA > 9.0"
π_{student_id, name}(σ_{dept_id='D01'}(STUDENTS))
∪
π_{student_id, name}(σ_{gpa>9.0}(STUDENTS))
// Result schema: (student_id, name)
// S001 Rahul appears in both (CS dept AND... wait, gpa=8.5 < 9.0, only in first)
// S003 Arjun: CS dept, gpa=7.8 < 9.0 → only in first
// S002 Priya: not CS dept (D02), gpa=9.1 > 9.0 → only in second
// S004 Kavya: not CS dept (D03), gpa=9.4 > 9.0 → only in second
// Union result: {(S001,Rahul), (S003,Arjun), (S002,Priya), (S004,Kavya)}
// SQL: SELECT student_id, name FROM students WHERE dept_id='D01'
//      UNION
//      SELECT student_id, name FROM students WHERE gpa > 9.0

// INVALID UNION (different structures):
STUDENTS ∪ COURSES  // ERROR: different attributes, different domains
// Cannot union a student relation with a course relation.

// UNION PROPERTIES:
// Commutativity: R ∪ S = S ∪ R
// Associativity: (R ∪ S) ∪ T = R ∪ (S ∪ T)
// Idempotent:    R ∪ R = R
// Identity:      R ∪ ∅ = R`}
        </CodeBox>

        {/* DIFFERENCE */}
        <OpCard
          symbol="−"
          name="Set Difference"
          type="Binary Set"
          color="#facc15"
          arity="Input: 2 union-compatible relations → Output: 1 relation"
          definition="R − S returns all tuples that appear in R but NOT in S. Duplicates eliminated. R and S must be union-compatible. The result contains tuples in R with no matching tuple in S. Unlike union, set difference is NOT commutative: R − S ≠ S − R in general."
          notation="R − S"
          sql="EXCEPT (also called MINUS in Oracle)"
        />

        <CodeBox label="Set difference — the 'but not' operator">
{`// "Students NOT enrolled in any course"
π_{student_id}(STUDENTS)  −  π_{student_id}(ENROLLMENTS)
// All student_ids in STUDENTS: {S001, S002, S003, S004, S005}
// All student_ids in ENROLLMENTS: {S001, S002, S003, S004, S005}
// Difference: {} (empty — all students are enrolled in at least one course)

// "Courses with NO enrollments"
π_{course_id}(COURSES)  −  π_{course_id}(ENROLLMENTS)
// All course_ids in COURSES: {CS301, CS302, CS401, MA301}
// Course_ids in ENROLLMENTS: {CS301, CS302, CS401}
// Difference: {MA301} — Linear Algebra has no enrolled students

// SQL: SELECT course_id FROM courses
//      EXCEPT
//      SELECT course_id FROM enrollments

// NOT COMMUTATIVE:
// π_{course_id}(ENROLLMENTS) − π_{course_id}(COURSES)
// = {CS301, CS302, CS401} − {CS301, CS302, CS401, MA301}
// = {} (empty — all enrollment course_ids exist in courses — referential integrity)

// DIFFERENCE PROPERTIES:
// NOT commutative: R − S ≠ S − R (generally)
// NOT associative: (R − S) − T ≠ R − (S − T)
// R − ∅ = R  (removing nothing leaves R unchanged)
// R − R = ∅  (removing R from itself leaves empty set)
// ∅ − R = ∅  (nothing minus anything = nothing)`}
        </CodeBox>

        {/* RENAME */}
        <OpCard
          symbol="ρ"
          name="Rename"
          type="Unary"
          color="#e879f9"
          arity="Input: 1 relation → Output: 1 relation (same data, new name)"
          definition="ρ_{X}(R) renames the relation R to X. ρ_{X(A1,A2,...,Ak)}(R) renames R to X and simultaneously renames its attributes to A1,...,Ak. This is essential for self-joins (joining a table to itself) where both copies need distinct names, and for renaming attributes before union operations."
          notation="ρ_{new_name}(R) or ρ_{new_name(a1,...,ak)}(R)"
          sql="AS alias in FROM clause"
        />

        <CodeBox label="Rename — self-joins and attribute disambiguation">
{`// RENAME A RELATION:
ρ_{S}(STUDENTS)
// STUDENTS is now called S — same data, new name

// RENAME RELATION AND ATTRIBUTES:
ρ_{S(sid, sname, scity, sgpa, sdept)}(STUDENTS)
// Renames STUDENTS to S with new attribute names

// SELF-JOIN: "Find students in the same city"
// Need two copies of STUDENTS with different names
ρ_{S1}(STUDENTS) × ρ_{S2}(STUDENTS)
// Then select matching cities but different students:
σ_{S1.city = S2.city ∧ S1.student_id ≠ S2.student_id}(ρ_{S1}(STUDENTS) × ρ_{S2}(STUDENTS))
// Then project to show the pairs:
π_{S1.name, S2.name, S1.city}(
  σ_{S1.city = S2.city ∧ S1.student_id < S2.student_id}(ρ_{S1}(STUDENTS) × ρ_{S2}(STUDENTS))
)
// S1.student_id < S2.student_id: avoids duplicates (Rahul-Kavya and Kavya-Rahul)
// Result: {(Rahul, Kavya, Bengaluru)} — both are in Bengaluru

// SQL equivalent:
// SELECT s1.name, s2.name, s1.city
// FROM students s1 JOIN students s2
//      ON s1.city = s2.city AND s1.student_id < s2.student_id

// RENAME FOR UNION COMPATIBILITY:
// Suppose we want to union two relations with different attribute names
ρ_{PEOPLE(id, full_name)}(STUDENTS)
∪
ρ_{PEOPLE(id, full_name)}(FACULTY)  // faculty has faculty_id, faculty_name
// Renaming makes both union-compatible`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — DERIVED OPERATORS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Derived Operators" />
        <SectionTitle>Derived Operators — Convenient Shorthands Built From the Six Fundamentals</SectionTitle>

        <Para>
          The following operators are not primitive — each can be expressed using only the
          six fundamental operators. But they appear so frequently and are so useful that
          every relational algebra system treats them as first-class operators.
        </Para>

        <SubTitle>Intersection (∩)</SubTitle>

        <CodeBox label="Intersection — tuples in both relations">
{`// DEFINITION: R ∩ S = R − (R − S)
// Tuples in both R and S simultaneously.
// Union-compatible requirement: same as union and difference.

// "Students enrolled in BOTH CS301 AND CS302"
π_{student_id}(σ_{course_id='CS301'}(ENROLLMENTS))
∩
π_{student_id}(σ_{course_id='CS302'}(ENROLLMENTS))

// Step 1: students in CS301: {S001, S002, S005}
// Step 2: students in CS302: {S001, S003}
// Intersection: {S001} — only Rahul takes both

// SQL: SELECT student_id FROM enrollments WHERE course_id = 'CS301'
//      INTERSECT
//      SELECT student_id FROM enrollments WHERE course_id = 'CS302'

// DERIVATION from fundamentals:
// R ∩ S = R − (R − S)
// R − S = {tuples in R not in S}
// R − (R−S) = {tuples in R not in (R−S)} = {tuples in R that ARE in S} = R ∩ S ✓

// PROPERTIES:
// Commutative: R ∩ S = S ∩ R
// Associative: (R ∩ S) ∩ T = R ∩ (S ∩ T)
// R ∩ R = R
// R ∩ ∅ = ∅`}
        </CodeBox>

        <SubTitle>Natural Join (⋈)</SubTitle>

        <CodeBox label="Natural join — the most important derived operator">
{`// DEFINITION: R ⋈ S
// Equijoin on ALL pairs of attributes with the same name in R and S.
// Duplicate join attribute columns are eliminated in the result.
// R ⋈ S = π_{attrs(R) ∪ attrs(S)}(σ_{R.A=S.A ∧ R.B=S.B ∧ ...}(R × S))
// where A, B, ... are the common attribute names.

// STUDENTS ⋈ DEPARTMENTS (common attribute: dept_id)
// = π_{student_id, name, city, gpa, dept_id, dept_name, hod}(
//     σ_{STUDENTS.dept_id = DEPARTMENTS.dept_id}(STUDENTS × DEPARTMENTS)
//   )
// Result: each student row joined with their department row
// dept_id appears once (duplicate eliminated)
// student_id | name  | city      | gpa | dept_id | dept_name        | hod
// S001       | Rahul | Bengaluru | 8.5 | D01     | Computer Science | Prof. Kumar
// S002       | Priya | Hyderabad | 9.1 | D02     | AI & Data Science| Prof. Rao
// ... (5 rows — one per student)

// STUDENTS ⋈ ENROLLMENTS ⋈ COURSES (chain natural joins)
// First: STUDENTS ⋈ ENROLLMENTS on student_id
//        produces: student_id, name, city, gpa, dept_id, course_id, grade
// Then: (STUDENTS ⋈ ENROLLMENTS) ⋈ COURSES on course_id
//        produces: all student + enrollment + course data for each enrollment
// Result: 7 rows (one per enrollment)

// SQL: SELECT * FROM students NATURAL JOIN departments
//      (NATURAL JOIN automatically joins on identically-named columns)
// More explicit: SELECT * FROM students s JOIN departments d ON s.dept_id = d.dept_id

// PROPERTIES:
// Commutative: R ⋈ S = S ⋈ R
// Associative: (R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)
// R ⋈ R = R (joining with itself = identity)
// R ⋈ S = R × S when R and S share NO common attributes

// THETA JOIN: join with arbitrary condition (not just equality):
// R ⋈_{condition} S = σ_{condition}(R × S)
// Example: σ_{STUDENTS.gpa > 9.0}(STUDENTS × DEPARTMENTS)
// Not restricted to equality — can use <, >, ≤, ≥, ≠`}
        </CodeBox>

        <SubTitle>Division (÷) — The Most Complex and Most Tested Operator</SubTitle>

        <Para>
          Division is the hardest relational algebra operator and the one most frequently
          tested in GATE exams. It answers queries of the form
          <strong style={{ color: 'var(--accent)' }}> "find all X that are associated with EVERY Y"</strong>
          — the universal quantification pattern.
          SQL has no direct equivalent (it must be expressed using NOT EXISTS or double negation),
          which makes understanding the algebra essential for translating such queries.
        </Para>

        <CodeBox label="Division — formal definition and every use case pattern">
{`// FORMAL DEFINITION:
// Let R have schema (A1,...,Ak, B1,...,Bm) and S have schema (B1,...,Bm).
// R ÷ S returns a relation with schema (A1,...,Ak) containing all tuples t such that
// for every tuple s in S, the tuple (t, s) appears in R.
// In plain English: "find all A-values in R that appear paired with EVERY B-value in S"

// DERIVATION from fundamentals:
// R ÷ S = π_A(R) − π_A((π_A(R) × S) − R)
// Read:
// π_A(R): all A-values that appear in R (candidate answers)
// π_A(R) × S: if t were a complete answer, it would pair with every s in S
// (π_A(R) × S) − R: pairs that SHOULD exist but DON'T (disqualifying evidence)
// π_A of those: A-values that are disqualified
// π_A(R) − disqualified: only the truly complete answers remain

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 1: "Find students enrolled in ALL courses in department D01"
// ─────────────────────────────────────────────────────────────────

// D01_courses = π_{course_id}(σ_{dept_id='D01'}(COURSES))
// = {CS301, CS302}

// student_courses = π_{student_id, course_id}(ENROLLMENTS)
// = {(S001,CS301), (S001,CS302), (S002,CS301), (S002,CS401),
//    (S003,CS302), (S004,CS401), (S005,CS301)}

// student_courses ÷ D01_courses:
// "Find student_ids that appear paired with BOTH CS301 AND CS302"

// Step 1: π_{student_id}(student_courses) = {S001, S002, S003, S004, S005}
// Step 2: π_{student_id}(student_courses) × D01_courses =
//   {(S001,CS301),(S001,CS302),(S002,CS301),(S002,CS302),
//    (S003,CS301),(S003,CS302),(S004,CS301),(S004,CS302),(S005,CS301),(S005,CS302)}
// Step 3: (π_{sid}(SC) × D01_courses) − student_courses = disqualifying pairs
//   pairs in step 2 NOT in student_courses:
//   S002 is in {(S002,CS401)} — S002 has CS301 but NOT CS302 → (S002,CS302) is disqualifying
//   S003 has CS302 but NOT CS301 → (S003,CS301) is disqualifying
//   S004 has CS401 but neither CS301 nor CS302 → (S004,CS301),(S004,CS302) are disqualifying
//   S005 has CS301 but NOT CS302 → (S005,CS302) is disqualifying
//   Disqualified = {(S002,CS302),(S003,CS301),(S004,CS301),(S004,CS302),(S005,CS302)}
// Step 4: π_{student_id}(disqualified) = {S002, S003, S004, S005}
// Step 5: {S001,S002,S003,S004,S005} − {S002,S003,S004,S005} = {S001}

// ANSWER: S001 (Rahul) — the only student enrolled in both CS301 AND CS302 ✓

// ─────────────────────────────────────────────────────────────────
// EXAMPLE 2: "Find departments that offer ALL 3-credit courses"
// ─────────────────────────────────────────────────────────────────

// three_credit = π_{course_id}(σ_{credits=3}(COURSES))
// = {CS401, MA301}

// dept_courses = π_{dept_id, course_id}(COURSES)
// = {(D01,CS301),(D01,CS302),(D02,CS401),(D03,MA301)}

// dept_courses ÷ three_credit:
// "Find dept_ids paired with BOTH CS401 AND MA301"
// D01 has: CS301, CS302 — missing CS401 and MA301 → disqualified
// D02 has: CS401 — missing MA301 → disqualified
// D03 has: MA301 — missing CS401 → disqualified
// ANSWER: {} (empty — no department offers all 3-credit courses)

// RECOGNITION PATTERN:
// "Find X that [does something] for ALL Y" → likely needs ÷
// "Find students who took every course" → ÷
// "Find suppliers who supply all parts" → ÷
// "Find employees who worked on every project" → ÷`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 4 — EXTENDED OPERATORS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Extended Operators" />
        <SectionTitle>Extended Relational Algebra — Aggregation, Outer Joins, and Generalised Projection</SectionTitle>

        <Para>
          The basic relational algebra operators handle set-theoretic queries cleanly,
          but they cannot express several common and important query patterns.
          Three extensions address the most important gaps.
        </Para>

        <SubTitle>Generalised Projection</SubTitle>

        <Para>
          Standard projection only selects existing attributes. Generalised projection
          allows arithmetic expressions and renaming in the projection list —
          essentially adding computed columns.
        </Para>

        <CodeBox label="Generalised projection — computed columns">
{`// NOTATION: π_{F1, F2, ..., Fk}(R)
// Each Fi is either an attribute name OR an arithmetic expression OR a renamed expression

// EXAMPLES:
π_{name, gpa × 10}(STUDENTS)
// Computes gpa × 10 for each student
// Result: (Rahul, 85), (Priya, 91), (Arjun, 78), (Kavya, 94), (Deepak, 82)

π_{course_id, credits × 15 AS hours}(COURSES)
// credits × 15 renamed to 'hours'
// CS301: 60 hours, CS302: 60 hours, CS401: 45 hours, MA301: 45 hours

// COMBINING WITH SELECTION:
π_{name, gpa, gpa * 10 AS score}(σ_{gpa > 8.5}(STUDENTS))
// Only students with GPA > 8.5, showing name, GPA, and computed score
// Result: (Priya, 9.1, 91), (Kavya, 9.4, 94)

// SQL equivalent:
// SELECT name, gpa, gpa * 10 AS score FROM students WHERE gpa > 8.5`}
        </CodeBox>

        <SubTitle>Aggregation (ℊ) — The Operator SQL Needs But Algebra Didn't Have</SubTitle>

        <Para>
          The basic relational algebra has no way to compute aggregates like COUNT, SUM,
          AVG, MIN, MAX — these require collapsing multiple tuples into one result,
          which no set operation can do. The aggregation operator extends relational
          algebra to support GROUP BY + aggregate function queries.
        </Para>

        <CodeBox label="Aggregation operator — syntax and worked examples">
{`// NOTATION: _{G1,G2,...} ℊ _{F1(A1), F2(A2), ...} (R)
// G1,G2,...: group-by attributes (may be empty for whole-relation aggregation)
// F1,F2,...: aggregate functions (COUNT, SUM, AVG, MIN, MAX)
// A1,A2,...: attributes the function is applied to

// EXAMPLE 1: Count students per department
// _{dept_id} ℊ _{COUNT(student_id) AS cnt} (STUDENTS)
// Groups STUDENTS by dept_id, counts student_ids in each group
// Result:
// dept_id | cnt
// D01     | 2   (Rahul, Arjun)
// D02     | 2   (Priya, Deepak)
// D03     | 1   (Kavya)
// SQL: SELECT dept_id, COUNT(student_id) AS cnt FROM students GROUP BY dept_id

// EXAMPLE 2: Average GPA per department
// _{dept_id} ℊ _{AVG(gpa) AS avg_gpa, MAX(gpa) AS top_gpa} (STUDENTS)
// dept_id | avg_gpa | top_gpa
// D01     | 8.15    | 8.5
// D02     | 8.65    | 9.1
// D03     | 9.4     | 9.4

// EXAMPLE 3: Whole-relation aggregation (no grouping)
// ℊ _{COUNT(*) AS total, AVG(gpa) AS mean_gpa} (STUDENTS)
// total | mean_gpa
// 5     | 8.6
// SQL: SELECT COUNT(*), AVG(gpa) FROM students

// EXAMPLE 4: Aggregation after join
// _{STUDENTS.name} ℊ _{COUNT(ENROLLMENTS.course_id) AS courses_taken} (
//   STUDENTS ⋈ ENROLLMENTS
// )
// Counts how many courses each student takes
// name   | courses_taken
// Rahul  | 2
// Priya  | 2
// Arjun  | 1
// Kavya  | 1
// Deepak | 1

// HAVING clause = σ applied AFTER ℊ:
// σ_{courses_taken >= 2}(
//   _{name} ℊ _{COUNT(course_id) AS courses_taken}(STUDENTS ⋈ ENROLLMENTS)
// )
// Students enrolled in 2 or more courses: Rahul, Priya`}
        </CodeBox>

        <SubTitle>Outer Joins — Preserving Non-Matching Tuples</SubTitle>

        <Para>
          The natural join (and all joins derived from it) drops tuples from either
          relation that have no matching tuple in the other. Outer joins preserve
          these non-matching tuples by padding with NULL values.
        </Para>

        <CodeBox label="Outer join variants — left, right, full">
{`// LEFT OUTER JOIN (⟕):
// All tuples from R, plus matching tuples from S.
// Non-matching R tuples have NULLs for S's attributes.
STUDENTS ⟕ DEPARTMENTS
// Every student is kept. Students with no matching department get NULL dept fields.
// (In this schema all students have valid dept_ids, so same as natural join)

// More illustrative: add student S006 with dept_id = NULL
// S006 would appear with NULL for dept_name and hod — no department exists for them
// SQL: SELECT * FROM students s LEFT JOIN departments d ON s.dept_id = d.dept_id

// RIGHT OUTER JOIN (⟖):
// All tuples from S, plus matching tuples from R.
// Non-matching S tuples have NULLs for R's attributes.
ENROLLMENTS ⟖ COURSES
// Every course is kept. MA301 has no enrollments → appears with NULLs for student_id, grade
// SQL: SELECT * FROM enrollments e RIGHT JOIN courses c ON e.course_id = c.course_id

// FULL OUTER JOIN (⟗):
// All tuples from both R and S. Non-matching tuples on either side get NULLs.
ENROLLMENTS ⟗ COURSES
// All enrollments + all courses. Unenrolled courses get NULL enrollment fields.
// SQL: SELECT * FROM enrollments e FULL OUTER JOIN courses c ON e.course_id = c.course_id

// FORMAL DEFINITIONS:
// R ⟕ S = (R ⋈ S) ∪ ((R − π_R(R ⋈ S)) × {(NULL,...,NULL)})
// R ⟖ S = (R ⋈ S) ∪ ({(NULL,...,NULL)} × (S − π_S(R ⋈ S)))
// R ⟗ S = (R ⟕ S) ∪ (R ⟖ S)

// COMMON USE: find unmatched tuples
// "Find courses with no enrollments":
π_{course_id, course_name}(σ_{student_id IS NULL}(ENROLLMENTS ⟖ COURSES))
// Right outer join keeps all courses, enrolled ones have student_id, unenrolled have NULL
// Selecting NULL student_id gives only unenrolled courses`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — QUERY TREES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Query Trees" />
        <SectionTitle>Query Trees — The Visual Representation of Relational Algebra</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>query tree</strong> (also called
          an operator tree or query plan tree) is a tree representation of a relational
          algebra expression. Leaf nodes are base relations (tables). Internal nodes are
          operators. Data flows from leaves upward through operators to the root,
          which produces the final result. The query optimiser manipulates query trees
          by applying equivalence rules to transform them into equivalent but cheaper forms.
        </Para>

        <CodeBox label="Query tree construction — SQL to algebra to tree">
{`// QUERY: "Find names of students from Bengaluru who are enrolled in Database Systems"
// SQL:
SELECT s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE s.city = 'Bengaluru'
  AND c.course_name = 'Database Systems';

// ─────────────────────────────────────────────────────────────────
// STEP 1: Write the relational algebra expression
// ─────────────────────────────────────────────────────────────────
π_{name}(
  σ_{city='Bengaluru' ∧ course_name='Database Systems'}(
    STUDENTS ⋈ ENROLLMENTS ⋈ COURSES
  )
)

// ─────────────────────────────────────────────────────────────────
// STEP 2: Draw the naive query tree (parse order)
// ─────────────────────────────────────────────────────────────────
//
//          π_{name}
//               |
//    σ_{city=Blr ∧ course_name=DB}
//               |
//              ⋈   (on course_id)
//            /   \
//           ⋈    COURSES
//         (on student_id)
//        /   \
//  STUDENTS  ENROLLMENTS
//
// Data flow: STUDENTS and ENROLLMENTS join first → result joins with COURSES
// → selection filters → projection gives names
// Problem: joins happen BEFORE filters → large intermediate results

// ─────────────────────────────────────────────────────────────────
// STEP 3: Optimised query tree (predicate pushdown applied)
// ─────────────────────────────────────────────────────────────────
π_{name}(
  σ_{city='Bengaluru'}(STUDENTS)
  ⋈
  ENROLLMENTS
  ⋈
  σ_{course_name='Database Systems'}(COURSES)
)

//              π_{name}
//                  |
//                 ⋈   (on course_id)
//               /   \
//              ⋈     σ_{course_name='DB'}
//   (on student_id)        |
//            /  \        COURSES
//   σ_{city=Blr}  ENROLLMENTS
//        |
//    STUDENTS
//
// Now:
// σ_{city='Bengaluru'}(STUDENTS): 5 → 2 rows (Rahul, Kavya)
// σ_{course_name='DB'}(COURSES): 4 → 1 row (CS301)
// First join (students ⋈ enrollments): 2 students × their enrollments
//   Rahul: enrolled in CS301, CS302 → 2 rows
//   Kavya: enrolled in CS401 → 1 row
//   Result: 3 rows
// Second join (3 rows ⋈ CS301): only rows matching CS301
//   (Rahul, CS301, A) ⋈ CS301 → 1 row
//   (Rahul, CS302, B+) — CS302 ≠ CS301, dropped
//   (Kavya, CS401) — CS401 ≠ CS301, dropped
//   Result: 1 row
// Final π_{name}: {Rahul}
//
// Optimised tree processes much less data at every step.`}
        </CodeBox>

        <SubTitle>Query Tree Equivalence Transformations — Applied to Trees</SubTitle>

        <CodeBox label="Transformation rules on query trees — the optimiser's toolkit">
{`// RULE 1: Selection cascade (split conjunctions)
// σ_{A ∧ B}(R) ≡ σ_A(σ_B(R))
//
// Tree:                    Becomes:
//   σ_{A∧B}                  σ_A
//     |            ≡           |
//     R                       σ_B
//                              |
//                              R

// RULE 2: Selection commutativity
// σ_A(σ_B(R)) ≡ σ_B(σ_A(R))
// Allows pushing the most selective filter down first

// RULE 3: Projection cascade (drop intermediate projections)
// π_{A}(π_{A,B}(R)) ≡ π_{A}(R)
// The outer projection subsumes the inner — only the outermost matters

// RULE 4: Selection through projection (push σ past π)
// σ_A(π_{B}(R)) ≡ π_{B}(σ_A(R))
// Only valid when condition A uses only attributes in B
//
//   σ_A              π_B
//    |       ≡         |
//   π_B              σ_A
//    |                 |
//    R                 R

// RULE 5: Selection through join (PREDICATE PUSHDOWN — most important)
// σ_{condition_on_R}(R ⋈ S) ≡ σ_{condition_on_R}(R) ⋈ S
//
//   σ_{R.city='Blr'}         σ_{R.city='Blr'}(R)
//         |            ≡              ⋈
//     R ⋈ S                           S
// Filter R BEFORE joining — dramatically reduces join input

// RULE 6: Join commutativity
// R ⋈ S ≡ S ⋈ R
// Allows choosing the smaller relation as the "build side" of a hash join

// RULE 7: Join associativity
// (R ⋈ S) ⋈ T ≡ R ⋈ (S ⋈ T)
// Allows choosing the optimal join order for multi-table queries

// APPLICATION: systematic optimisation procedure
// Step 1: Apply Rule 1 (cascade selections into individual σ nodes)
// Step 2: Apply Rule 5 (push each σ as far down the tree as possible)
// Step 3: Apply Rule 3/4 (push π down past operators where possible)
// Step 4: Apply Rules 6/7 (reorder joins for minimal intermediate results)
// Step 5: Estimate cost of each sub-tree and choose the minimum-cost plan`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — RELATIONAL ALGEBRA TO SQL AND BACK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Translation" />
        <SectionTitle>Translating Between SQL and Relational Algebra — Both Directions</SectionTitle>

        <Para>
          The most tested skill in GATE and most practically useful skill in understanding
          SQL deeply is translating fluently between SQL and relational algebra in both
          directions. SQL → algebra tells you what your query really means procedurally.
          Algebra → SQL turns a formal specification into executable code.
        </Para>

        <SubTitle>SQL to Relational Algebra — The Mechanical Procedure</SubTitle>

        <CodeBox label="SQL to relational algebra — step-by-step translation procedure">
{`// GENERAL FORM of SQL:
// SELECT col_list
// FROM table1 [JOIN table2 ON condition] ...
// WHERE filter_condition
// GROUP BY group_cols
// HAVING having_condition
// ORDER BY sort_cols

// TRANSLATION PROCEDURE:
// 1. Base relations: each table in FROM becomes a leaf node
// 2. Joins: combine with ⋈ using the ON condition as theta-join predicate
// 3. WHERE: wrap result in σ with the filter condition
// 4. GROUP BY + aggregate: wrap in ℊ operator
// 5. HAVING: wrap ℊ result in σ with having condition
// 6. SELECT: wrap in π (or generalised π for expressions) with the column list

// ─────────────────────────────────────────────────────────────────
// TRANSLATION EXAMPLE 1 — Simple join
// ─────────────────────────────────────────────────────────────────
// SQL:
SELECT s.name, d.dept_name
FROM students s JOIN departments d ON s.dept_id = d.dept_id
WHERE s.gpa > 8.5;

// Algebra:
π_{name, dept_name}(
  σ_{gpa > 8.5}(
    STUDENTS ⋈_{student.dept_id = dept.dept_id} DEPARTMENTS
  )
)
// With predicate pushdown:
π_{name, dept_name}(
  σ_{gpa > 8.5}(STUDENTS) ⋈ DEPARTMENTS
)

// ─────────────────────────────────────────────────────────────────
// TRANSLATION EXAMPLE 2 — GROUP BY + HAVING
// ─────────────────────────────────────────────────────────────────
// SQL:
SELECT dept_id, COUNT(*) AS student_count, AVG(gpa) AS avg_gpa
FROM students
GROUP BY dept_id
HAVING COUNT(*) >= 2;

// Algebra:
σ_{student_count >= 2}(
  _{dept_id} ℊ _{COUNT(*) AS student_count, AVG(gpa) AS avg_gpa}(STUDENTS)
)

// ─────────────────────────────────────────────────────────────────
// TRANSLATION EXAMPLE 3 — Subquery using difference
// ─────────────────────────────────────────────────────────────────
// SQL:
SELECT student_id FROM students
WHERE student_id NOT IN (
    SELECT student_id FROM enrollments WHERE course_id = 'CS301'
);

// Algebra:
π_{student_id}(STUDENTS)
−
π_{student_id}(σ_{course_id='CS301'}(ENROLLMENTS))
// Students who have NO enrollment in CS301
// Result: {S003, S004} (Arjun and Kavya are not in CS301)

// ─────────────────────────────────────────────────────────────────
// TRANSLATION EXAMPLE 4 — EXISTS using semijoin
// ─────────────────────────────────────────────────────────────────
// SQL:
SELECT DISTINCT s.name
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id
    AND e.course_id = 'CS401'
);

// Algebra:
π_{name}(STUDENTS ⋈ π_{student_id}(σ_{course_id='CS401'}(ENROLLMENTS)))
// Join STUDENTS with student_ids enrolled in CS401
// π_{student_id}(σ_{course_id='CS401'}(ENROLLMENTS)) = {S002, S004}
// STUDENTS ⋈ {S002, S004} = Priya and Kavya
// π_{name}: {Priya, Kavya}`}
        </CodeBox>

        <SubTitle>Relational Algebra to SQL — Expressing Complex Algebra in SQL</SubTitle>

        <CodeBox label="Relational algebra to SQL — translating division and nested expressions">
{`// TRANSLATING DIVISION: R ÷ S (the hardest direction)
// "Find students enrolled in ALL courses in dept D01"
// Algebra: π_{s_id, c_id}(ENROLLMENTS) ÷ π_{course_id}(σ_{dept_id='D01'}(COURSES))

// SQL TRANSLATION using NOT EXISTS (most correct):
SELECT DISTINCT s.student_id
FROM students s
WHERE NOT EXISTS (
    -- "There is no D01 course that this student is NOT enrolled in"
    SELECT c.course_id
    FROM courses c
    WHERE c.dept_id = 'D01'
    AND NOT EXISTS (
        SELECT 1 FROM enrollments e
        WHERE e.student_id = s.student_id
        AND e.course_id = c.course_id
    )
);

// SQL TRANSLATION using double negation (equivalent):
SELECT student_id
FROM students
WHERE student_id NOT IN (
    -- Students who are MISSING some D01 course
    SELECT s2.student_id
    FROM students s2
    CROSS JOIN (SELECT course_id FROM courses WHERE dept_id = 'D01') d01
    WHERE NOT EXISTS (
        SELECT 1 FROM enrollments e
        WHERE e.student_id = s2.student_id AND e.course_id = d01.course_id
    )
);

// SQL TRANSLATION using COUNT (pragmatic, works when division set is known):
SELECT student_id
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
WHERE c.dept_id = 'D01'
GROUP BY student_id
HAVING COUNT(DISTINCT e.course_id) = (
    SELECT COUNT(*) FROM courses WHERE dept_id = 'D01'
);
-- Count D01 courses per student; keep those matching total D01 course count
-- Simple and efficient but requires knowing the exact count threshold`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — WORKED EXAM PROBLEMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Exam Problems" />
        <SectionTitle>GATE-Level Relational Algebra Problems — Complete Solutions</SectionTitle>

        <Para>
          These are the exact problem types that appear in GATE DBMS questions.
          Work through each one before reading the solution — then verify your
          approach matches the formal derivation.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* PROBLEM 1 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 16 }}>Problem 1 — Multi-table query with filtering</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Given:</strong> Relations R(A, B, C) and S(B, D) with tuples:
                R = {'{ (1,2,3), (4,2,5), (1,3,6) }'} and S = {'{ (2,7), (3,8) }'}.
                Evaluate: {`π_{A,D}(σ_{C>3}(R ⋈ S))`}</Para>
              </div>
              <CodeBox>
{`// STEP 1: Natural join R ⋈ S (on common attribute B)
// Combine tuples where R.B = S.B:
// (1,2,3) ⋈ (2,7) → B matches (2=2): (1,2,3,7)
// (1,2,3) ⋈ (3,8) → B doesn't match (2≠3): skip
// (4,2,5) ⋈ (2,7) → B matches (2=2): (4,2,5,7)
// (4,2,5) ⋈ (3,8) → B doesn't match: skip
// (1,3,6) ⋈ (2,7) → B doesn't match (3≠2): skip
// (1,3,6) ⋈ (3,8) → B matches (3=3): (1,3,6,8)
// R ⋈ S = {(1,2,3,7), (4,2,5,7), (1,3,6,8)}
// Schema: (A, B, C, D)

// STEP 2: Selection σ_{C>3}
// (1,2,3,7): C=3, 3>3 is FALSE → excluded
// (4,2,5,7): C=5, 5>3 is TRUE  → included
// (1,3,6,8): C=6, 6>3 is TRUE  → included
// σ_{C>3}(R⋈S) = {(4,2,5,7), (1,3,6,8)}

// STEP 3: Projection π_{A,D}
// (4,2,5,7) → keep A=4, D=7: (4,7)
// (1,3,6,8) → keep A=1, D=8: (1,8)
// π_{A,D} = {(4,7), (1,8)}

// ANSWER: {(4,7), (1,8)}`}
              </CodeBox>
            </div>
          </div>

          {/* PROBLEM 2 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 16 }}>Problem 2 — Division operator</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Given:</strong> R(X, Y) and S(Y) where R = {'{ (a,1),(a,2),(b,1),(b,3),(c,1),(c,2),(c,3) }'} and S = {'{ (1),(2) }'}.
                Evaluate R ÷ S and explain each step.</Para>
              </div>
              <CodeBox>
{`// R ÷ S: "Find X-values in R paired with EVERY Y-value in S"
// S = {1, 2} — every X must appear with both 1 AND 2

// METHOD: R ÷ S = π_X(R) − π_X((π_X(R) × S) − R)

// STEP 1: π_X(R) = all X-values in R
// = {a, b, c}

// STEP 2: π_X(R) × S = every (X, Y) combination
// = {(a,1),(a,2),(a,3)... wait S = {1,2} only
// = {(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)}

// STEP 3: (π_X(R) × S) − R = pairs that SHOULD exist but DON'T
// Compare step2 pairs with R:
// (a,1): IN R ✓  → not in difference
// (a,2): IN R ✓  → not in difference
// (b,1): IN R ✓  → not in difference
// (b,2): NOT in R ✗ → IN the difference! (b has 1 and 3 but NOT 2)
// (c,1): IN R ✓  → not in difference
// (c,2): IN R ✓  → not in difference
// Difference = {(b,2)}

// STEP 4: π_X(difference) = π_X({(b,2)}) = {b}
// These are the DISQUALIFIED X-values (missing some Y)

// STEP 5: π_X(R) − disqualified = {a,b,c} − {b} = {a,c}

// VERIFICATION:
// a paired with: 1, 2 → matches S = {1,2} ✓
// b paired with: 1, 3 → missing 2 from S ✗
// c paired with: 1, 2, 3 → contains all of S = {1,2} ✓

// ANSWER: R ÷ S = {a, c}`}
              </CodeBox>
            </div>
          </div>

          {/* PROBLEM 3 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 16 }}>Problem 3 — Express a complex query in relational algebra</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Using the STUDENTS/COURSES/ENROLLMENTS schema, write relational algebra for:</strong>
                "Find the names of students who are enrolled in at least one course from the AI & Data Science department but are NOT enrolled in Database Systems."</Para>
              </div>
              <CodeBox>
{`// BREAK DOWN THE QUERY:
// Part A: students enrolled in at least one AI & DS course
// Part B: students enrolled in Database Systems
// Result: Part A − Part B

// PART A: students in AI & Data Science (dept_id = D02)
// Step 1: Find D02 courses
D02_courses = π_{course_id}(σ_{dept_id='D02'}(COURSES))
// = {CS401}

// Step 2: Find students enrolled in any D02 course
AI_students = π_{student_id}(ENROLLMENTS ⋈ D02_courses)
// ENROLLMENTS ⋈ D02_courses joins on course_id
// Keeps only enrollments where course_id is in D02_courses
// π_{student_id}: {S002, S004}

// PART B: students enrolled in Database Systems
// Step 1: Find Database Systems course_id
DB_course = π_{course_id}(σ_{course_name='Database Systems'}(COURSES))
// = {CS301}

// Step 2: Find students enrolled in CS301
DB_students = π_{student_id}(ENROLLMENTS ⋈ DB_course)
// = {S001, S002, S005}

// RESULT: AI students who are NOT in DB Systems
AI_students − DB_students
= {S002, S004} − {S001, S002, S005}
= {S004}  ← Kavya: enrolled in CS401 (AI), not in CS301 (DB Systems)

// FULL EXPRESSION:
π_{name}(STUDENTS ⋈
  (
    π_{student_id}(ENROLLMENTS ⋈ π_{course_id}(σ_{dept_id='D02'}(COURSES)))
    −
    π_{student_id}(ENROLLMENTS ⋈ π_{course_id}(σ_{course_name='Database Systems'}(COURSES)))
  )
)
// Join STUDENTS with the S004 result to get name
// ANSWER: {Kavya}

// SQL equivalent:
SELECT DISTINCT s.name
FROM students s
JOIN enrollments e1 ON s.student_id = e1.student_id
JOIN courses c1 ON e1.course_id = c1.course_id AND c1.dept_id = 'D02'
WHERE s.student_id NOT IN (
    SELECT e2.student_id FROM enrollments e2
    JOIN courses c2 ON e2.course_id = c2.course_id
    WHERE c2.course_name = 'Database Systems'
);`}
              </CodeBox>
            </div>
          </div>

          {/* PROBLEM 4 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#8b5cf6' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6', marginBottom: 16 }}>Problem 4 — GATE standard: size of expression result</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Given:</strong> R has 100 tuples, S has 80 tuples. Both have the same schema (A, B).
                What are the maximum and minimum possible sizes of R ∪ S, R ∩ S, and R − S?</Para>
              </div>
              <CodeBox>
{`// R has 100 tuples, S has 80 tuples, same schema (A,B)
// All operations produce SETS (no duplicates in result)

// ─── R ∪ S ───
// Minimum: max(|R|, |S|) = 100
//   When: S ⊆ R (all 80 tuples of S are already in R)
//   Union = R (no new tuples added) = 100 tuples
// Maximum: |R| + |S| = 100 + 80 = 180
//   When: R ∩ S = ∅ (R and S share NO tuples)
//   Union = all distinct tuples from both = 180

// ─── R ∩ S ───
// Minimum: 0
//   When: R ∩ S = ∅ (no common tuples at all)
// Maximum: min(|R|, |S|) = 80
//   When: S ⊆ R (all 80 tuples of S are in R)
//   Intersection = S = 80 tuples

// ─── R − S ───
// Minimum: max(0, |R| − |S|) = max(0, 100 − 80) = 20
//   When: all 80 tuples of S are in R (S ⊆ R)
//   R − S = tuples in R not in S = 100 − 80 = 20
// Maximum: |R| = 100
//   When: R ∩ S = ∅ (no common tuples)
//   R − S = R (nothing is removed from R) = 100

// SUMMARY TABLE:
// Operation  | Minimum    | Maximum
// R ∪ S     | 100        | 180
// R ∩ S     | 0          | 80
// R − S     | 20         | 100

// GENERAL FORMULAS:
// min(R ∪ S) = max(|R|, |S|)
// max(R ∪ S) = |R| + |S|
// min(R ∩ S) = 0
// max(R ∩ S) = min(|R|, |S|)
// min(R − S) = max(0, |R| − |S|)
// max(R − S) = |R|`}
              </CodeBox>
            </div>
          </div>

          {/* PROBLEM 5 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#facc15', marginBottom: 16 }}>Problem 5 — Query equivalence verification</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Are the following two expressions equivalent? Prove or disprove:</strong></Para>
                <Para>{'E1: σ_{A=1}(R ⋈ S) and E2: σ_{A=1}(R) ⋈ S'}</Para>
                <Para>Assume A is an attribute of R only (not in S).</Para>
              </div>
              <CodeBox>
{`// CLAIM: σ_{A=1}(R ⋈ S) ≡ σ_{A=1}(R) ⋈ S (when condition involves only R's attributes)

// PROOF using set theory:

// E1: σ_{A=1}(R ⋈ S)
// = {t | t ∈ R ⋈ S AND t.A = 1}
// = {(r,s) | r ∈ R AND s ∈ S AND r and s share common attributes AND r.A = 1}

// E2: σ_{A=1}(R) ⋈ S
// = {(r,s) | r ∈ σ_{A=1}(R) AND s ∈ S AND r and s share common attributes}
// = {(r,s) | r ∈ R AND r.A = 1 AND s ∈ S AND r and s share common attributes}

// The conditions are identical → E1 = E2 ✓

// PROOF by counterexample attempt (to verify no exceptions):
// Let R = {(1,x), (2,y)} and S = {(x,p), (y,q)} joining on second column of R = first of S
// R ⋈ S = {(1,x,p), (2,y,q)}  (joining on common attribute)

// E1: σ_{A=1}((1,x,p),(2,y,q)) = {(1,x,p)}
// E2: σ_{A=1}(R) ⋈ S = {(1,x)} ⋈ {(x,p),(y,q)} = {(1,x,p)}
// Same result ✓

// IMPORTANT: This equivalence ONLY holds when the condition A=1 references
// attributes in R ONLY.
// If the condition references attributes in BOTH R and S:
// σ_{R.A = S.B}(R ⋈ S) — cannot be pushed to just one side.

// CONCLUSION: σ_{A=1}(R ⋈ S) ≡ σ_{A=1}(R) ⋈ S
// This is the formal proof of predicate pushdown for selection.
// This equivalence is what makes predicate pushdown correct — it is not
// a heuristic optimisation but a mathematically provable equivalence.`}
              </CodeBox>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 8 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Using Relational Algebra to Debug a Complex SQL Query</SectionTitle>

        <Para>
          When a complex SQL query returns wrong results, converting it to relational algebra
          makes the error immediately visible. Here is a realistic debugging scenario.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Bug Report — "The report is showing zero rows"
          </div>

          <Para>
            A data analyst reports: "My query to find students enrolled in all mandatory courses
            is returning zero rows, but I know at least Rahul satisfies the condition."
          </Para>

          <CodeBox label="The buggy SQL query">
{`-- Analyst's query (WRONG):
SELECT DISTINCT s.student_id, s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE c.dept_id = 'D01'
GROUP BY s.student_id, s.name
HAVING COUNT(DISTINCT e.course_id) = COUNT(DISTINCT c.course_id);
-- Returns: 0 rows

-- The analyst expects: Rahul (enrolled in CS301 and CS302, both D01 courses)`}
          </CodeBox>

          <CodeBox label="Diagnosis using relational algebra">
{`// CONVERT THE QUERY TO RELATIONAL ALGEBRA to find the bug:

// The HAVING condition:
// COUNT(DISTINCT e.course_id) = COUNT(DISTINCT c.course_id)
// After the 3-table join, c.course_id = e.course_id (they're joined on this key!)
// So COUNT(DISTINCT e.course_id) = COUNT(DISTINCT c.course_id) ALWAYS
// Both sides count the same set of course_ids in the join result.
// The condition is always TRUE — but it doesn't test what the analyst wants!

// WHAT THE ANALYST WANTS IN RELATIONAL ALGEBRA:
// "Students where count of their D01 enrollments = total D01 courses"

// CORRECT formulation:
// count(π_{course_id}(σ_{dept_id='D01'}(COURSES))) = number of D01 courses = 2
// For each student: count(π_{course_id}(σ_{student_id=s_id ∧ course_id in D01}(ENROLLMENTS)))

// The intended algebra is:
// σ_{cnt = d01_total}(
//   _{student_id} ℊ _{COUNT(course_id) AS cnt}(
//     ENROLLMENTS ⋈ π_{course_id}(σ_{dept_id='D01'}(COURSES))
//   )
// )
// where d01_total = |π_{course_id}(σ_{dept_id='D01'}(COURSES))| = 2`}
          </CodeBox>

          <CodeBox label="The correct SQL derived from the algebra">
{`-- CORRECT query — student's D01 enrollment count = total D01 course count:
SELECT s.student_id, s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id AND c.dept_id = 'D01'
GROUP BY s.student_id, s.name
HAVING COUNT(DISTINCT e.course_id) = (
    SELECT COUNT(*) FROM courses WHERE dept_id = 'D01'
);
-- Returns: S001 Rahul (enrolled in CS301 AND CS302 — both D01 courses ✓)

-- ALTERNATIVE using NOT EXISTS (directly from division algebra):
SELECT student_id, name FROM students s
WHERE NOT EXISTS (
    SELECT course_id FROM courses WHERE dept_id = 'D01'
    EXCEPT
    SELECT course_id FROM enrollments WHERE student_id = s.student_id
);
-- "There is no D01 course that this student is not enrolled in"
-- The EXCEPT inside NOT EXISTS exactly mirrors the division operator`}
          </CodeBox>

          <Para>
            The bug was invisible in the SQL syntax but obvious in the relational algebra form:
            the HAVING clause was comparing two sides of the same join attribute —
            a tautology that is always true, not the intended cross-table comparison.
            Translating to algebra made the intended semantics precise and led directly
            to the correct SQL. This is why senior engineers reach for relational algebra
            when debugging queries that produce wrong results.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 9 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>Relational Algebra Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What are the six fundamental operators of relational algebra and why are they "fundamental"?',
              color: '#0078d4',
              a: 'The six fundamental operators are: Selection (σ), Projection (π), Cartesian Product (×), Union (∪), Set Difference (−), and Rename (ρ). They are "fundamental" because they form a minimal complete set — any query expressible in relational algebra can be expressed using only these six operators, and no proper subset of them has this property. Codd proved this completeness. All other operators (join, intersection, division, outer joins, aggregation) are derived — they can be expressed as combinations of the six fundamentals. For example: Join = Selection on Cartesian Product. Intersection = R − (R − S). Division = expressed using cartesian product, selection, projection, and difference. The fundamentals are the axioms of relational algebra from which everything else follows.',
            },
            {
              q: 'What is the division operator and when do you use it?',
              color: 'var(--accent)',
              a: 'The division operator R ÷ S answers queries with universal quantification: "find all X-values that appear paired with EVERY Y-value in S." Formally: R ÷ S returns all tuples t over R\'s non-S attributes such that for every tuple s in S, the combined tuple (t,s) exists in R. Use division when the query says "all", "every", "for each" — patterns that require a value to be associated with an entire set. Examples: "students enrolled in ALL mandatory courses", "suppliers who supply ALL required parts", "employees who worked on EVERY project". Division is derived: R ÷ S = π_A(R) − π_A((π_A(R) × S) − R). In SQL, division has no direct equivalent and must be expressed with NOT EXISTS double negation or COUNT comparison against the total.',
            },
            {
              q: 'What is the difference between a natural join and a theta join?',
              color: '#f97316',
              a: 'A natural join (⋈ without condition) automatically joins on ALL pairs of attributes with identical names in both relations, and eliminates duplicate join attribute columns in the result. It is convenient but potentially dangerous — if two unrelated attributes happen to share a name, they will be incorrectly joined. A theta join (R ⋈_{condition} S) joins on an explicit condition, which can be any Boolean expression involving attributes from R and S, including inequalities (R.salary > S.min_salary), not just equalities. An equijoin is the special case of theta join where the condition is equality (R.A = S.B). Natural join is equivalent to: equijoin on all common attribute names + projection to remove duplicate columns. Theta join is the most general: R ⋈_{condition} S = σ_{condition}(R × S). In practice, always prefer explicit JOIN ON conditions over NATURAL JOIN to avoid surprising results from coincidental name matches.',
            },
            {
              q: 'Is relational algebra equivalent in expressive power to SQL?',
              color: '#8b5cf6',
              a: 'Basic relational algebra (the six fundamental operators) is not fully equivalent to SQL. Relational algebra is less expressive in two important ways. First, relational algebra has no aggregate functions (COUNT, SUM, AVG) — the extended aggregation operator (ℊ) was added later to address this. Second, relational algebra is defined on sets (no duplicate tuples) while SQL tables are multisets (duplicates possible). The extended relational algebra with aggregation, generalised projection, and outer joins is approximately equivalent to the core of SQL (SELECT-FROM-WHERE-GROUP BY-HAVING). However, SQL has additional features beyond extended algebra: recursive queries (WITH RECURSIVE), window functions, ordering (ORDER BY), and various procedural extensions. So SQL is strictly more expressive than standard relational algebra, though relational algebra covers the vast majority of practical query patterns.',
            },
            {
              q: 'Given R(A,B) with 5 tuples and S(B,C) with 3 tuples, what are the possible sizes of R ⋈ S?',
              color: '#facc15',
              a: 'The natural join R ⋈ S joins on attribute B (the common attribute). Minimum size: 0 tuples. If no B-value appears in both R and S, the join produces an empty result. This happens when R\'s B-values and S\'s B-values are completely disjoint. Maximum size: |R| × |S| = 5 × 3 = 15 tuples. This happens when all B-values in R match all B-values in S — specifically when all 5 tuples in R have the same B-value, and all 3 tuples in S also have that same B-value. Then every R-tuple matches every S-tuple, producing a full cross product of 15 tuples. In the typical case (no duplicate B-values, partial overlap): the result size is between 0 and min(|R|,|S|) = 3 tuples (at most 3 matches since S has only 3 tuples). With duplicate B-values in R, the count can exceed 3 but the theoretical maximum is still 15.',
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
        'Relational algebra is the procedural language underneath SQL. SQL is declarative (what you want); relational algebra is procedural (how to get it). The query optimiser translates SQL → relational algebra, optimises the algebra expression, then executes it.',
        'Six fundamental operators form a minimal complete set: Selection σ (filter rows), Projection π (filter columns), Cartesian Product × (all combinations), Union ∪ (rows in either), Set Difference − (rows in first but not second), Rename ρ (new name/attributes). All other operators derive from these six.',
        'Selection properties: commutative (σ_A(σ_B(R)) = σ_B(σ_A(R))), cascade (σ_{A∧B} = σ_A(σ_B)), idempotent, never increases row count. Apply selection before joins (predicate pushdown) to reduce intermediate result sizes.',
        'Projection eliminates duplicate tuples (set semantics). Always apply projection AFTER selection — you need all filter attributes available when selecting. Generalised projection allows arithmetic expressions and renaming in the projection list.',
        'Join = σ(R × S): selection on cartesian product. Natural join automatically joins on all common attribute names and removes duplicate columns. Theta join uses any Boolean condition. Equijoin is equality theta join. Outer joins (⟕ ⟖ ⟗) preserve non-matching tuples with NULLs.',
        'Division R ÷ S answers "find all X associated with EVERY Y in S." Derivation: π_A(R) − π_A((π_A(R) × S) − R). Recognise by "all", "every", "for each" keywords. In SQL: express as NOT EXISTS double negation or COUNT = total count.',
        'Query trees are tree representations of algebra expressions. Leaves = base relations. Internal nodes = operators. Data flows upward. The optimiser transforms trees using equivalence rules: push σ down (predicate pushdown), reorder joins (commutativity/associativity), push π down past operators.',
        'Key algebraic equivalences for optimisation: σ_{A∧B}(R) ≡ σ_A(σ_B(R)) [cascade], σ_A(R ⋈ S) ≡ σ_A(R) ⋈ S [pushdown when A is only in R], R ⋈ S ≡ S ⋈ R [commutativity], (R ⋈ S) ⋈ T ≡ R ⋈ (S ⋈ T) [associativity].',
        'Aggregation operator ℊ: _{group_cols} ℊ _{agg_func(col)} (R). SQL HAVING clause = σ applied after ℊ. Standard relational algebra has no aggregation — ℊ is an extension that makes the algebra practically equivalent to SQL GROUP BY.',
        'Size bounds for set operations: |R ∪ S| in [max(|R|,|S|), |R|+|S|]. |R ∩ S| in [0, min(|R|,|S|)]. |R − S| in [max(0,|R|−|S|), |R|]. |R ⋈ S| in [0, |R|×|S|]. These bounds appear frequently in GATE questions.',
      ]} />

    </LearnLayout>
  )
}