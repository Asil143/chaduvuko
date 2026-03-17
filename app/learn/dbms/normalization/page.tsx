import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Normalization — 1NF to 5NF Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete normalization from first principles — every anomaly type, 1NF through 5NF with full worked examples, BCNF vs 3NF trade-offs, lossless decomposition, dependency preservation, denormalization, and every interview trap explained.',
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

// Reusable relation display component
const RelationTable = ({
  title, headers, rows, highlightCols = [], note
}: {
  title: string
  headers: string[]
  rows: string[][]
  highlightCols?: number[]
  note?: string
}) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>{title}</div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {headers.map((h, i) => (
              <th key={h} style={{
                textAlign: 'left', padding: '8px 14px',
                color: highlightCols.includes(i) ? '#ff4757' : 'var(--accent)',
                fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-mono)',
                background: highlightCols.includes(i) ? 'rgba(255,71,87,0.05)' : 'transparent',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg2)' }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px',
                  color: highlightCols.includes(j) ? '#ff4757' : 'var(--text2)',
                   fontSize: 13,
                  background: highlightCols.includes(j) ? 'rgba(255,71,87,0.04)' : 'transparent',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && <div style={{ fontSize: 12, color: 'var(--muted)',  marginTop: 6, lineHeight: 1.6 }}>↑ {note}</div>}
  </div>
)

export default function Normalization() {
  return (
    <LearnLayout
      title="Normalization — 1NF to 5NF"
      description="The complete science of designing databases that don't betray you — eliminating every class of anomaly, through every normal form, with complete worked examples and real-world context."
      section="DBMS"
      readTime="95–115 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHAT NORMALIZATION IS AND WHY IT EXISTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>What Normalization Is — And the Pain It Was Built to Eliminate</SectionTitle>

        <Para>
          Normalization is the process of structuring a relational database schema to
          reduce data redundancy and eliminate data anomalies. It was developed by
          <strong style={{ color: 'var(--text)' }}> Edgar Codd</strong> alongside the
          relational model itself — he recognised immediately that having a good data model
          (tables and relations) was not sufficient. You also needed rules for how to design
          good tables. Without those rules, engineers would produce relational schemas that
          technically satisfied the relational model but were deeply flawed in practice.
        </Para>

        <Para>
          Codd's initial paper (1970) introduced First Normal Form. He then published
          Second and Third Normal Forms in 1971. Raymond Boyce and Codd together published
          BCNF in 1974. Fourth Normal Form was formalised by Ronald Fagin in 1977.
          Fifth Normal Form (also called Project-Join Normal Form) was published by Fagin
          in 1979. The progression spans nearly a decade of research — each new normal form
          discovered by finding a class of anomaly that the previous form failed to prevent.
        </Para>

        <Para>
          Before we study the normal forms, we must understand deeply what they are protecting
          us from. The enemy of normalization is <strong style={{ color: 'var(--text)' }}>data anomalies</strong> —
          situations where the database can be updated in ways that leave it in an
          inconsistent state. There are three classes of anomalies, and they arise from
          a single root cause: storing facts about multiple independent things in the same table.
        </Para>

        <SubTitle>The Problem Table — Before We Start Fixing Anything</SubTitle>

        <Para>
          We will use one concrete, realistic table throughout this entire module —
          watching it transform step by step through every normal form. The table is
          called <strong style={{ color: 'var(--text)' }}>STUDENT_COURSE_TEACHER</strong>.
          It is the kind of table a beginner might design when asked to track which
          students are enrolled in which courses taught by which teachers.
        </Para>

        <RelationTable
          title="STUDENT_COURSE_TEACHER — The Unnormalised Mess We Start With"
          headers={['student_id', 'student_name', 'student_email', 'course_id', 'course_name', 'teacher_id', 'teacher_name', 'teacher_phone', 'teacher_dept', 'grade']}
          rows={[
            ['S001', 'Rahul Sharma', 'rahul@uni.in', 'CS301', 'Database Systems', 'T01', 'Prof. Kumar', '98765-43210', 'Computer Science', 'A'],
            ['S001', 'Rahul Sharma', 'rahul@uni.in', 'CS302', 'Algorithms', 'T02', 'Prof. Singh', '87654-32109', 'Computer Science', 'B+'],
            ['S002', 'Priya Reddy', 'priya@uni.in', 'CS301', 'Database Systems', 'T01', 'Prof. Kumar', '98765-43210', 'Computer Science', 'A+'],
            ['S002', 'Priya Reddy', 'priya@uni.in', 'CS401', 'Machine Learning', 'T03', 'Prof. Rao', '76543-21098', 'AI Department', 'B'],
            ['S003', 'Arjun Nair', 'arjun@uni.in', 'CS301', 'Database Systems', 'T01', 'Prof. Kumar', '98765-43210', 'Computer Science', 'B+'],
            ['S003', 'Arjun Nair', 'arjun@uni.in', 'CS302', 'Algorithms', 'T02', 'Prof. Singh', '87654-32109', 'Computer Science', 'A'],
            ['S004', 'Kavya Krishnan', 'kavya@uni.in', 'CS401', 'Machine Learning', 'T03', 'Prof. Rao', '76543-21098', 'AI Department', 'A+'],
          ]}
          note="Primary key (as intended): (student_id, course_id). 7 rows, 10 columns. Problems lurk everywhere."
        />

        <Para>
          Look at this table carefully. Prof. Kumar's phone number appears in THREE rows.
          Rahul Sharma's email appears in TWO rows. The course name "Database Systems"
          appears in THREE rows. All of this repeated data is redundancy — and redundancy
          is the breeding ground for anomalies.
        </Para>

        <SubTitle>The Three Anomalies — A Complete Dissection</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>

          {/* INSERT ANOMALY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#ff4757' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Anomaly 01</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Insert Anomaly</span>
              </div>
              <Para>
                An <strong style={{ color: 'var(--text)' }}>insert anomaly</strong> occurs
                when you cannot add a new fact to the database without also adding another,
                unrelated fact — because the table structure forces you to store multiple
                independent things together.
              </Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Concrete Insert Anomaly on STUDENT_COURSE_TEACHER</div>
                <Para>
                  The university hires a new teacher: Prof. Mehta (T04) from the Mathematics
                  department, phone 65432-10987. She has not yet been assigned to teach any
                  course. Can we add her to the database?
                </Para>
                <Para>
                  <strong style={{ color: '#ff4757' }}>No.</strong> The primary key is
                  (student_id, course_id). To insert a row, we must provide both a student_id
                  and a course_id. Prof. Mehta has no students and no course yet.
                  We would be forced to use NULL values for student_id and course_id —
                  but student_id is part of the primary key, and primary key values cannot
                  be NULL. The insert is physically impossible without fabricating fake
                  enrollment data.
                </Para>
                <Para>
                  Similarly: a new student, Deepak (S005), has been admitted but not yet
                  enrolled in any courses. We cannot add Deepak to this database. His
                  existence depends on him being enrolled in at least one course. The student
                  is trapped — he cannot exist in the system until he is enrolled.
                </Para>
                <div style={{ fontSize: 13, color: '#ff4757',  fontWeight: 700 }}>
                  Root cause: Facts about independent things (teachers, students, enrollments) are all mixed into one table.
                </div>
              </div>
            </div>
          </div>

          {/* UPDATE ANOMALY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Anomaly 02</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Update Anomaly</span>
              </div>
              <Para>
                An <strong style={{ color: 'var(--text)' }}>update anomaly</strong> occurs when
                updating a single real-world fact requires changing multiple rows in the database.
                If even one row is missed, the database becomes inconsistent — two different rows
                claim two different values for the same fact.
              </Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Concrete Update Anomaly on STUDENT_COURSE_TEACHER</div>
                <Para>
                  Prof. Kumar changes his phone number from 98765-43210 to 98765-99999.
                  In our table, Prof. Kumar's phone number appears in THREE rows
                  (rows 1, 3, and 5 — one for each student enrolled in CS301).
                  A developer must know to update all three rows.
                </Para>
                <Para>
                  What if the developer runs <code style={{ fontFamily: 'var(--font-mono)', color: '#f97316', fontSize: 13 }}>UPDATE ... WHERE student_id = 'S001'</code> —
                  correctly updating row 1 — but forgets rows 3 and 5? Now the database
                  has contradictory data: one row says Prof. Kumar's phone is 98765-99999,
                  two rows say it's 98765-43210. Which is correct? The database cannot tell.
                  A query asking for Prof. Kumar's phone might return different results
                  depending on which row it finds first.
                </Para>
                <Para>
                  This is not a theoretical concern. In production systems with millions of
                  rows, partial update bugs are common, silent (no error is raised), and
                  extremely difficult to detect and fix after the fact.
                </Para>
                <div style={{ fontSize: 13, color: '#f97316',  fontWeight: 700 }}>
                  Root cause: One real-world fact (Prof. Kumar's phone) is stored in multiple rows, each of which can be independently updated.
                </div>
              </div>
            </div>
          </div>

          {/* DELETE ANOMALY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#facc15', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Anomaly 03</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Delete Anomaly</span>
              </div>
              <Para>
                A <strong style={{ color: 'var(--text)' }}>delete anomaly</strong> occurs when
                deleting one fact from the database inadvertently destroys another, completely
                unrelated fact — because both facts were stored together in the same row.
              </Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#facc15', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Concrete Delete Anomaly on STUDENT_COURSE_TEACHER</div>
                <Para>
                  Kavya Krishnan (S004) drops the Machine Learning course (CS401) and withdraws
                  from the university. We must delete her enrollment record. Her row is:
                  (S004, Kavya Krishnan, kavya@uni.in, CS401, Machine Learning, T03, Prof. Rao, 76543-21098, AI Department, A+).
                </Para>
                <Para>
                  After we delete this row, what happens to information about Prof. Rao?
                  Look at the table — Kavya is the ONLY student enrolled in CS401.
                  When her row is deleted, <strong style={{ color: '#facc15' }}>all information about Prof. Rao is permanently lost</strong>.
                  We no longer know that Prof. Rao exists, what his phone number is, or that he belongs to the AI Department.
                  A faculty member's existence in the system depended entirely on at least one student being enrolled in his course.
                </Para>
                <Para>
                  This is devastating for a real university system. Deleting a student's enrollment
                  should not destroy a teacher's record. These are independent facts with independent
                  lifecycles — they should never have been stored in the same row.
                </Para>
                <div style={{ fontSize: 13, color: '#facc15',  fontWeight: 700 }}>
                  Root cause: Independent facts (student enrollment, teacher information) are coupled in the same row — deleting one destroys the other.
                </div>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          All three anomalies have the same root cause:
          <strong> a single table is storing facts about multiple independent real-world things simultaneously</strong>.
          Normalization's solution is systematic: separate independent facts into separate tables,
          each table storing facts about exactly one thing. The normal forms provide precise,
          mathematically grounded criteria for determining when a table has achieved this separation.
        </Callout>
      </section>

      {/* ========================================
          PART 2 — FIRST NORMAL FORM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — 1NF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 01</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>First Normal Form (1NF)</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in First Normal Form if and only if every attribute in every tuple
            contains exactly one <strong style={{ color: 'var(--text)' }}>atomic</strong> value —
            a single, indivisible value from the attribute's domain. No attribute may contain
            a set of values, a list, an array, a nested relation, or any repeating group.
            Additionally, all rows must be unique (the relation must have a primary key).
          </Para>
        </div>

        <SubTitle>What Violates 1NF — Every Case</SubTitle>

        <Para>
          Our STUDENT_COURSE_TEACHER table actually satisfies 1NF as written — each cell
          contains exactly one value. But there are many real-world tables that violate 1NF.
          Understanding every violation type is essential because 1NF violations appear
          in every real codebase.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>

          {/* Violation 1 */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>Violation Type 1 — Multi-valued Attribute (The Most Common)</div>
            <Para>
              Storing multiple values in a single cell — typically as comma-separated strings,
              pipe-delimited lists, or serialised arrays. This is the most common 1NF violation
              in real code, especially when developers coming from NoSQL backgrounds start
              working with relational databases.
            </Para>
            <RelationTable
              title="STUDENTS — 1NF Violated (multi-valued phone_numbers)"
              headers={['student_id', 'name', 'phone_numbers', 'courses_enrolled']}
              rows={[
                ['S001', 'Rahul Sharma', '98765-43210, 87654-32109', 'CS301, CS302'],
                ['S002', 'Priya Reddy', '76543-21098', 'CS301, CS401'],
                ['S003', 'Arjun Nair', '65432-10987, 54321-09876, 43210-98765', 'CS302'],
              ]}
              highlightCols={[2, 3]}
              note="Highlighted columns contain multiple values — 1NF violation"
            />
            <CodeBox label="Why this breaks everything — specific query failures">
{`-- PROBLEM 1: Cannot search by individual phone number
SELECT * FROM students WHERE phone_numbers = '87654-32109';
-- Returns ZERO rows! Because phone_numbers = '98765-43210, 87654-32109' ≠ '87654-32109'

-- Workaround attempt (terrible):
SELECT * FROM students WHERE phone_numbers LIKE '%87654-32109%';
-- Works but: cannot use an index (full table scan), slow at scale, fragile

-- PROBLEM 2: Cannot count unique phone numbers across students
SELECT COUNT(DISTINCT phone_numbers) FROM students;
-- Counts unique strings ('98765-43210, 87654-32109') not unique phone numbers

-- PROBLEM 3: Cannot add a phone type (mobile/home/work) per number
-- The schema has no way to record that 98765-43210 is mobile and 87654-32109 is home

-- PROBLEM 4: Insertion anomaly — adding a phone number requires reading the field,
-- parsing it, appending the new number, then rewriting the whole string
UPDATE students
SET phone_numbers = phone_numbers || ', 22222-11111'
WHERE student_id = 'S001';
-- Race condition: two concurrent updates both read '98765-43210, 87654-32109'
-- and both write different values, one overwrites the other

-- THE 1NF SOLUTION: separate table
CREATE TABLE student_phones (
    student_id    VARCHAR(10)  NOT NULL,
    phone_number  VARCHAR(20)  NOT NULL,
    phone_type    VARCHAR(10)  DEFAULT 'mobile',
    PRIMARY KEY (student_id, phone_number),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);
-- Now: full indexing, proper queries, no race conditions, type-per-number possible`}
            </CodeBox>
          </div>

          {/* Violation 2 */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>Violation Type 2 — Repeating Groups (The Historical Violation)</div>
            <Para>
              Pre-relational databases used repeating groups — a way of storing multiple
              related values in sequentially numbered columns. While this stores one value
              per cell, it violates 1NF because it encodes a collection within the tuple
              structure itself.
            </Para>
            <RelationTable
              title="STUDENT_SKILLS — 1NF Violated (repeating group columns)"
              headers={['student_id', 'name', 'skill1', 'level1', 'skill2', 'level2', 'skill3', 'level3']}
              rows={[
                ['S001', 'Rahul', 'Python', 'Expert', 'SQL', 'Intermediate', 'Java', 'Beginner'],
                ['S002', 'Priya', 'Machine Learning', 'Expert', 'Python', 'Expert', '', ''],
                ['S003', 'Arjun', 'React', 'Intermediate', '', '', '', ''],
              ]}
              highlightCols={[2, 3, 4, 5, 6, 7]}
              note="skill1/level1/skill2/level2... — repeating groups — 1NF violation"
            />
            <Para>
              The problems are obvious: what if a student has 4 skills? 10 skills? You'd need
              to ALTER TABLE to add more columns — or silently truncate the data. Querying all
              skills for a student requires checking all column pairs. Searching for students
              with a specific skill requires checking every skill column separately.
            </Para>
            <CodeBox label="The 1NF solution for repeating groups">
{`-- 1NF COMPLIANT: one row per skill
CREATE TABLE students (student_id VARCHAR(10) PRIMARY KEY, name VARCHAR(100) NOT NULL);

CREATE TABLE student_skills (
    student_id  VARCHAR(10)  NOT NULL,
    skill_name  VARCHAR(100) NOT NULL,
    level       VARCHAR(20)  CHECK (level IN ('beginner', 'intermediate', 'expert')),
    PRIMARY KEY (student_id, skill_name),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

INSERT INTO student_skills VALUES
    ('S001', 'Python',           'expert'),
    ('S001', 'SQL',              'intermediate'),
    ('S001', 'Java',             'beginner'),
    ('S002', 'Machine Learning', 'expert'),
    ('S002', 'Python',           'expert'),
    ('S003', 'React',            'intermediate');

-- Now: unlimited skills per student, full indexing, clean queries
SELECT * FROM student_skills WHERE skill_name = 'Python' AND level = 'expert';`}
            </CodeBox>
          </div>

          {/* Violation 3 */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>Violation Type 3 — Composite Value in One Cell (Subtle)</div>
            <Para>
              Storing a value that appears atomic but actually encodes multiple pieces of
              information that the application needs to decompose. This is the hardest 1NF
              violation to detect because the cell contains "one string" — but that string
              is actually two or more distinct data points.
            </Para>
            <CodeBox label="Subtle 1NF violations — composite values masquerading as atoms">
{`-- VIOLATION: address stored as one string but city/pincode are queried separately
CREATE TABLE customers (
    customer_id  VARCHAR(10) PRIMARY KEY,
    address      TEXT  -- "123 MG Road, Bengaluru, Karnataka, 560001"
);
-- App does: address.split(',')[1] to get city — violates 1NF
-- Cannot index on city, state, or pincode separately

-- VIOLATION: full_name stored when first/last are used independently
CREATE TABLE employees (
    employee_id  INT PRIMARY KEY,
    full_name    VARCHAR(200)  -- "Rahul Kumar Sharma"
);
-- App does: full_name.split(' ')[0] to get first name for salutations
-- Cannot sort by last name, cannot search by first name efficiently

-- VIOLATION: encoded composite meaning
CREATE TABLE products (
    product_id   VARCHAR(20) PRIMARY KEY
    -- product_id = 'EL-SONY-TV-55-4K' encodes category + brand + type + size + quality
    -- App parses product_id to extract category, brand etc.
    -- This is NOT 1NF compliant — the value is composite
);

-- 1NF COMPLIANT VERSIONS:
CREATE TABLE customers (
    customer_id  VARCHAR(10)  PRIMARY KEY,
    street       VARCHAR(200),
    city         VARCHAR(100),  -- separately stored, separately indexable
    state        VARCHAR(50),
    pincode      CHAR(6)
);

CREATE TABLE employees (
    employee_id  INT          PRIMARY KEY,
    first_name   VARCHAR(50)  NOT NULL,  -- separate columns
    last_name    VARCHAR(50)  NOT NULL,
    -- full_name is derived: first_name || ' ' || last_name (computed in queries)
);

CREATE TABLE products (
    product_id    SERIAL        PRIMARY KEY,  -- meaningless surrogate key
    product_code  VARCHAR(50)   UNIQUE NOT NULL,  -- human-readable, but not used as PK
    category      VARCHAR(50),   -- extracted from composite code, stored separately
    brand         VARCHAR(50),
    product_type  VARCHAR(50),
    screen_size   INT,
    resolution    VARCHAR(10)
);`}
            </CodeBox>
          </div>
        </div>

        <SubTitle>Our Working Table — Already in 1NF</SubTitle>

        <Para>
          Our STUDENT_COURSE_TEACHER table already satisfies 1NF: every cell has one atomic
          value and all rows are unique (because the combination of student_id + course_id
          uniquely identifies each row). So why does it still have terrible anomalies? Because
          1NF is merely the starting point — it only ensures atomic values. It says nothing
          about how attributes relate to each other within the table. The anomalies we
          identified come from higher-level structural problems that 2NF and 3NF address.
        </Para>

        <Callout type="info">
          <strong>An important misconception to address:</strong> Many students think that achieving 1NF is sufficient to
          have a "good" database. It is not. A table can be in 1NF and still have catastrophic
          update, insert, and delete anomalies — as our STUDENT_COURSE_TEACHER table demonstrates.
          1NF is the floor, not the ceiling. 2NF, 3NF, and BCNF are what actually eliminate the anomalies.
        </Callout>
      </section>

      {/* ========================================
          PART 3 — SECOND NORMAL FORM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — 2NF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 02</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Second Normal Form (2NF)</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in Second Normal Form if and only if:
            <strong style={{ color: 'var(--text)' }}> (1) it is in 1NF</strong>, AND
            <strong style={{ color: 'var(--text)' }}> (2) every non-prime attribute is fully functionally dependent on the entire primary key</strong>.
            A non-prime attribute is any attribute that is not part of any candidate key.
            Full functional dependency means no non-prime attribute is dependent on any proper
            subset (partial subset) of the primary key.
          </Para>
          <Para>
            <strong style={{ color: 'var(--text)' }}>2NF only applies to relations with composite primary keys.</strong>
            A relation with a single-attribute primary key is automatically in 2NF
            (partial dependency is impossible when the key is one attribute —
            there is no proper subset of a single-element set other than the empty set).
          </Para>
        </div>

        <SubTitle>Understanding Partial Dependency — The Core Concept</SubTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>partial dependency</strong> exists when
          a non-prime attribute is functionally determined by only part of the composite
          primary key — not the entire key. The attribute "partially depends" on the key
          because knowing only some key attributes is sufficient to determine its value.
        </Para>

        <Para>
          In our STUDENT_COURSE_TEACHER table, the primary key is
          <strong style={{ color: 'var(--text)' }}> (student_id, course_id)</strong>.
          Let us test every non-prime attribute to see if it depends on the full composite key
          or just part of it.
        </Para>

        <CodeBox label="Partial dependency analysis — testing every attribute against (student_id, course_id)">
{`// RELATION: STUDENT_COURSE_TEACHER
// PRIMARY KEY: (student_id, course_id)
// NON-PRIME ATTRIBUTES: student_name, student_email, course_name, teacher_id,
//                       teacher_name, teacher_phone, teacher_dept, grade

// ANALYSIS: For each non-prime attribute, what determines it?

// student_name:
//   Does student_name depend on student_id alone? YES
//   (Knowing student_id = 'S001' tells us name = 'Rahul Sharma' — we don't need course_id)
//   → PARTIAL DEPENDENCY: student_name → student_id (only part of PK)

// student_email:
//   Does student_email depend on student_id alone? YES
//   (Knowing student_id tells us the email — course doesn't matter)
//   → PARTIAL DEPENDENCY: student_email → student_id

// course_name:
//   Does course_name depend on course_id alone? YES
//   (Knowing course_id = 'CS301' tells us name = 'Database Systems' — student irrelevant)
//   → PARTIAL DEPENDENCY: course_name → course_id

// teacher_id:
//   Does teacher_id depend on course_id alone? YES
//   (CS301 is always taught by T01 regardless of which student)
//   → PARTIAL DEPENDENCY: teacher_id → course_id

// teacher_name:
//   Does teacher_name depend on course_id alone? YES (via teacher_id)
//   → PARTIAL DEPENDENCY: teacher_name → course_id

// teacher_phone:
//   Does teacher_phone depend on course_id alone? YES (via teacher_id)
//   → PARTIAL DEPENDENCY

// teacher_dept:
//   Does teacher_dept depend on course_id alone? YES (via teacher_id)
//   → PARTIAL DEPENDENCY

// grade:
//   Does grade depend on student_id alone? NO — a student has different grades per course
//   Does grade depend on course_id alone? NO — a course has different grades per student
//   Does grade depend on (student_id, course_id) TOGETHER? YES
//   → FULL DEPENDENCY: grade → (student_id, course_id)
//   grade is the ONLY 2NF-compliant attribute in this relation!

// CONCLUSION: Almost every attribute has a partial dependency.
// This table is severely 2NF-violating.`}
        </CodeBox>

        <SubTitle>Decomposing to 2NF — The Systematic Process</SubTitle>

        <Para>
          The fix for partial dependencies is always the same: remove the partially dependent
          attributes from the original relation and create a new relation containing those
          attributes along with the part of the key that determines them. The original relation
          retains only the fully dependent attributes.
        </Para>

        <Para>
          We identify three distinct determinants among the partial dependencies:
          student_id determines student attributes, course_id determines course and
          teacher attributes, and (student_id, course_id) together determine grade.
          We create one table per determinant.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Table 1 — STUDENTS (student_id determines student attributes)</div>
            <RelationTable
              title="STUDENTS"
              headers={['student_id (PK)', 'student_name', 'student_email']}
              rows={[
                ['S001', 'Rahul Sharma', 'rahul@uni.in'],
                ['S002', 'Priya Reddy', 'priya@uni.in'],
                ['S003', 'Arjun Nair', 'arjun@uni.in'],
                ['S004', 'Kavya Krishnan', 'kavya@uni.in'],
              ]}
              note="All student attributes fully depend on student_id alone"
            />
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Table 2 — COURSES (course_id determines course + teacher attributes)</div>
            <RelationTable
              title="COURSES"
              headers={['course_id (PK)', 'course_name', 'teacher_id', 'teacher_name', 'teacher_phone', 'teacher_dept']}
              rows={[
                ['CS301', 'Database Systems', 'T01', 'Prof. Kumar', '98765-43210', 'Computer Science'],
                ['CS302', 'Algorithms', 'T02', 'Prof. Singh', '87654-32109', 'Computer Science'],
                ['CS401', 'Machine Learning', 'T03', 'Prof. Rao', '76543-21098', 'AI Department'],
              ]}
              note="All course + teacher attributes fully depend on course_id alone"
            />
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Table 3 — ENROLLMENTS (grade depends on full composite key)</div>
            <RelationTable
              title="ENROLLMENTS"
              headers={['student_id (PK, FK)', 'course_id (PK, FK)', 'grade']}
              rows={[
                ['S001', 'CS301', 'A'],
                ['S001', 'CS302', 'B+'],
                ['S002', 'CS301', 'A+'],
                ['S002', 'CS401', 'B'],
                ['S003', 'CS301', 'B+'],
                ['S003', 'CS302', 'A'],
                ['S004', 'CS401', 'A+'],
              ]}
              note="grade depends on the full (student_id, course_id) — correctly here"
            />
          </div>
        </div>

        <CodeBox label="2NF-compliant schema in SQL">
{`CREATE TABLE students (
    student_id    VARCHAR(10)   PRIMARY KEY,
    student_name  VARCHAR(100)  NOT NULL,
    student_email VARCHAR(150)  UNIQUE NOT NULL
);

CREATE TABLE courses (
    course_id    VARCHAR(10)   PRIMARY KEY,
    course_name  VARCHAR(200)  NOT NULL,
    teacher_id   VARCHAR(10)   NOT NULL,
    teacher_name VARCHAR(100)  NOT NULL,
    teacher_phone VARCHAR(20),
    teacher_dept VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id  VARCHAR(10)  NOT NULL,
    course_id   VARCHAR(10)  NOT NULL,
    grade       CHAR(2),
    
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE RESTRICT
);`}
        </CodeBox>

        <SubTitle>Verifying the 2NF Schema Fixes the Anomalies</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 14, marginBottom: 24 }}>
          {[
            {
              anomaly: 'Insert Anomaly — Fixed',
              color: 'var(--accent)',
              desc: 'Prof. Mehta can now be inserted into the COURSES table (or a TEACHERS table in 3NF) independently, without any student enrollment existing. A new student can be added to STUDENTS without any course enrollment.',
            },
            {
              anomaly: 'Update Anomaly — Partially Fixed',
              color: 'var(--accent)',
              desc: "Prof. Kumar's phone number now appears in exactly ONE row in the COURSES table. Update one row → done. No partial update risk.",
            },
            {
              anomaly: 'Delete Anomaly — Fixed',
              color: 'var(--accent)',
              desc: "Deleting Kavya's enrollment from ENROLLMENTS no longer affects COURSES. Prof. Rao's course (CS401) still exists in the COURSES table. Teacher data is independent.",
            },
            {
              anomaly: 'Still remaining in COURSES',
              color: '#f97316',
              desc: 'Teacher_name, teacher_phone, teacher_dept appear in the COURSES table alongside course information. A teacher teaching multiple courses still has their data duplicated. This is a transitive dependency — fixed by 3NF.',
            },
          ].map((item) => (
            <div key={item.anomaly} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.anomaly}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <Callout type="warning">
          <strong>The 2NF trap that catches everyone:</strong> 2NF violations can only occur in tables
          with composite primary keys. If a table has a single-column primary key and is in 1NF,
          it is automatically in 2NF — partial dependency is impossible. However, it can still
          violate 3NF (transitive dependency). This is why students who only memorise "remove
          partial dependencies" miss 3NF violations in single-key tables entirely.
        </Callout>
      </section>

      {/* ========================================
          PART 4 — THIRD NORMAL FORM
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — 3NF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 03</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Third Normal Form (3NF)</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in Third Normal Form if and only if:
            <strong style={{ color: 'var(--text)' }}> (1) it is in 2NF</strong>, AND
            <strong style={{ color: 'var(--text)' }}> (2) for every non-trivial functional dependency X → A,
            either X is a superkey OR A is a prime attribute</strong> (part of some candidate key).
          </Para>
          <Para>
            In simpler terms: no non-prime attribute should be transitively dependent on the primary key.
            Every non-prime attribute must depend directly and only on the primary key — not on
            another non-prime attribute.
          </Para>
        </div>

        <SubTitle>Understanding Transitive Dependency — The 3NF Enemy</SubTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>transitive dependency</strong> exists when
          a non-prime attribute A is functionally determined by another non-prime attribute B
          (which is itself determined by the primary key). The chain looks like:
          PK → B → A. A is transitively dependent on PK through B.
        </Para>

        <Para>
          The problem: B and A now have a separate relationship that is being stored inside
          the table whose primary purpose is something else. When B's value changes in the
          real world (Prof. Kumar changes departments), we face the same update anomaly problem —
          we must find every row where B = "Prof. Kumar" and update A = department in each one.
        </Para>

        <CodeBox label="Transitive dependency identification in the 2NF COURSES table">
{`// COURSES table after 2NF: (course_id, course_name, teacher_id, teacher_name, teacher_phone, teacher_dept)
// PRIMARY KEY: course_id
// NON-PRIME ATTRIBUTES: course_name, teacher_id, teacher_name, teacher_phone, teacher_dept

// DEPENDENCY ANALYSIS:

// course_id → course_name: DIRECT dependency on PK ✓
// course_id → teacher_id: DIRECT dependency on PK ✓
//   (each course is taught by one teacher — teacher_id depends directly on course_id)

// But now look at teacher_name, teacher_phone, teacher_dept:
// teacher_id → teacher_name    (knowing the teacher ID tells us their name)
// teacher_id → teacher_phone   (knowing the teacher ID tells us their phone)
// teacher_id → teacher_dept    (knowing the teacher ID tells us their department)

// So the full chain is:
// course_id → teacher_id → teacher_name    ← TRANSITIVE DEPENDENCY
// course_id → teacher_id → teacher_phone   ← TRANSITIVE DEPENDENCY
// course_id → teacher_id → teacher_dept    ← TRANSITIVE DEPENDENCY

// teacher_name, teacher_phone, teacher_dept depend on course_id TRANSITIVELY through teacher_id.
// They are facts about the TEACHER, not facts about the COURSE.
// They have no business being in the COURSES table.

// EVIDENCE OF THE PROBLEM:
// Prof. Kumar teaches CS301. Prof. Kumar changes departments from CS to AI.
// We must update the COURSES table: UPDATE courses SET teacher_dept = 'AI' WHERE teacher_id = 'T01'
// If Prof. Kumar also teaches CS303 (another course), we must update that row too.
// If we miss any row → update anomaly. Same problem as before 2NF.`}
        </CodeBox>

        <SubTitle>Decomposing to 3NF — Extracting the Transitive Dependencies</SubTitle>

        <Para>
          The fix is the same pattern as 2NF: extract the transitively dependent attributes
          along with their determinant into a new table. The original table retains the
          determinant (teacher_id as a foreign key) but loses the transitively dependent attributes.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f97316', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>New Table — TEACHERS (extracted from COURSES)</div>
            <RelationTable
              title="TEACHERS"
              headers={['teacher_id (PK)', 'teacher_name', 'teacher_phone', 'teacher_dept']}
              rows={[
                ['T01', 'Prof. Kumar', '98765-43210', 'Computer Science'],
                ['T02', 'Prof. Singh', '87654-32109', 'Computer Science'],
                ['T03', 'Prof. Rao', '76543-21098', 'AI Department'],
              ]}
              note="Teacher facts now stored independently — no duplication, no transitive dependency"
            />
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Updated COURSES Table (transitive attributes removed)</div>
            <RelationTable
              title="COURSES"
              headers={['course_id (PK)', 'course_name', 'teacher_id (FK)']}
              rows={[
                ['CS301', 'Database Systems', 'T01'],
                ['CS302', 'Algorithms', 'T02'],
                ['CS401', 'Machine Learning', 'T03'],
              ]}
              note="course_name and teacher_id both depend directly on course_id — no transitive dependency"
            />
          </div>
        </div>

        <SubTitle>The Complete 3NF Schema — Four Clean Tables</SubTitle>

        <CodeBox label="Complete 3NF-compliant schema">
{`-- All four tables. Every non-prime attribute depends directly on its table's primary key.

CREATE TABLE students (
    student_id    VARCHAR(10)   PRIMARY KEY,
    student_name  VARCHAR(100)  NOT NULL,
    student_email VARCHAR(150)  UNIQUE NOT NULL
    -- student_name and student_email depend DIRECTLY on student_id ✓
);

CREATE TABLE teachers (
    teacher_id    VARCHAR(10)   PRIMARY KEY,
    teacher_name  VARCHAR(100)  NOT NULL,
    teacher_phone VARCHAR(20)   UNIQUE,
    teacher_dept  VARCHAR(100)  NOT NULL
    -- All attributes depend DIRECTLY on teacher_id ✓
);

CREATE TABLE courses (
    course_id    VARCHAR(10)   PRIMARY KEY,
    course_name  VARCHAR(200)  NOT NULL,
    teacher_id   VARCHAR(10)   NOT NULL,
    -- course_name depends directly on course_id ✓
    -- teacher_id depends directly on course_id ✓ (course directly determines teacher)
    
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE enrollments (
    student_id  VARCHAR(10)  NOT NULL,
    course_id   VARCHAR(10)  NOT NULL,
    grade       CHAR(2),
    -- grade depends on the FULL composite key (student_id, course_id) ✓
    
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE RESTRICT
);

-- VERIFICATION: All anomalies eliminated?
-- Insert anomaly: YES — Prof. Mehta can be added to TEACHERS without any course
-- Update anomaly: YES — Prof. Kumar's phone is in ONE row in TEACHERS
-- Delete anomaly: YES — Deleting Kavya's enrollment doesn't touch TEACHERS or COURSES`}
        </CodeBox>

        <SubTitle>Transitive Dependencies in Single-PK Tables — The Hidden Case</SubTitle>

        <Para>
          The most dangerous 3NF violations are in single-primary-key tables because
          students often forget that 3NF applies there too. A table with a single-attribute
          PK is automatically in 2NF — but can easily violate 3NF if its non-prime
          attributes transitively depend on each other.
        </Para>

        <CodeBox label="3NF violation in a single-PK table — the forgotten case">
{`-- ORDERS table with a single PK order_id — but 3NF is still violated!
CREATE TABLE orders_bad (
    order_id       INT           PRIMARY KEY,
    customer_id    INT           NOT NULL,
    customer_name  VARCHAR(100),  -- depends on customer_id, NOT order_id directly!
    customer_email VARCHAR(150),  -- depends on customer_id, NOT order_id directly!
    customer_city  VARCHAR(100),  -- depends on customer_id, NOT order_id directly!
    order_date     DATE,
    total          DECIMAL(10,2)
);

-- TRANSITIVE DEPENDENCIES:
-- order_id → customer_id (direct)
-- customer_id → customer_name, customer_email, customer_city (transitive through customer_id)
-- So: order_id → customer_id → customer_name (transitive → 3NF VIOLATION)

-- EVIDENCE OF PROBLEM:
-- Customer Rahul changes email: must update EVERY ORDER row for Rahul
-- Rahul has placed 100 orders → 100 rows must be updated → update anomaly

-- 3NF SOLUTION: extract customer data to separate table
CREATE TABLE customers (
    customer_id    INT          PRIMARY KEY,
    customer_name  VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150) UNIQUE NOT NULL,
    customer_city  VARCHAR(100)
);

CREATE TABLE orders_good (
    order_id     INT           PRIMARY KEY,
    customer_id  INT           NOT NULL,  -- FK (direct dependency on PK ✓)
    order_date   DATE          NOT NULL,
    total        DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
-- Now: customer_name appears ONCE in customers. Update once, consistent everywhere.`}
        </CodeBox>

        <Callout type="tip">
          <strong>The complete 3NF test for any table:</strong> For each non-prime attribute A,
          ask: "What uniquely determines A?" If the answer is "the primary key directly" → fine.
          If the answer is "another non-prime attribute B (which is then determined by the PK)"
          → transitive dependency → 3NF violation. Extract B and its dependents to a new table.
          This test works for both composite-PK and single-PK tables.
        </Callout>
      </section>

      {/* ========================================
          PART 5 — BCNF
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — BCNF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 3.5</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Boyce-Codd Normal Form (BCNF)</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#8b5cf6', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in Boyce-Codd Normal Form if and only if for every non-trivial
            functional dependency <strong style={{ color: 'var(--text)' }}>X → Y</strong> in the relation,
            <strong style={{ color: 'var(--text)' }}> X is a superkey</strong>. No exceptions.
          </Para>
          <Para>
            3NF allows one exception: if Y is a prime attribute (part of some candidate key),
            X does not need to be a superkey. BCNF removes this exception entirely.
            In BCNF, the only non-trivial dependencies allowed are those where the left side is a superkey.
          </Para>
        </div>

        <SubTitle>Why 3NF Is Not Always Enough — The BCNF Case</SubTitle>

        <Para>
          For most practical schemas, 3NF and BCNF are equivalent — if a relation is in 3NF,
          it is also in BCNF. The difference only manifests when a relation has
          <strong style={{ color: 'var(--text)' }}> multiple overlapping candidate keys</strong>.
          This is the specific scenario where a relation can be in 3NF but not in BCNF.
        </Para>

        <Para>
          The classic example: a university allows multiple teachers to teach the same course,
          but each student can only be taught a particular subject by one teacher
          (they don't have two different teachers for the same subject simultaneously).
          Also, each teacher teaches only one subject.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#8b5cf6', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>The Classic BCNF Example — STUDENT_TEACHER_SUBJECT</div>

          <Para><strong style={{ color: 'var(--text)' }}>Business rules:</strong></Para>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {[
              'Each student studies each subject with exactly one teacher',
              'A teacher teaches only one subject',
              'A subject can be taught by multiple teachers',
            ].map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#8b5cf6', flexShrink: 0 }}>▸</span>
                <Para>{rule}</Para>
              </div>
            ))}
          </div>

          <RelationTable
            title="STUDENT_TEACHER_SUBJECT"
            headers={['student_id', 'teacher_id', 'subject']}
            rows={[
              ['S001', 'T01', 'Physics'],
              ['S001', 'T02', 'Chemistry'],
              ['S002', 'T01', 'Physics'],
              ['S002', 'T03', 'Physics'],
              ['S003', 'T02', 'Chemistry'],
              ['S003', 'T01', 'Physics'],
            ]}
            note="Wait — S002 has T01 AND T03 both for Physics? That violates rule 1. Let's use a consistent example."
          />

          <Para>Let us use a cleaner version where the rules are consistently satisfied:</Para>

          <RelationTable
            title="STUDENT_TEACHER_SUBJECT (consistent with business rules)"
            headers={['student_id', 'teacher_id', 'subject']}
            rows={[
              ['S001', 'T01', 'Physics'],
              ['S001', 'T02', 'Chemistry'],
              ['S002', 'T01', 'Physics'],
              ['S002', 'T02', 'Chemistry'],
              ['S003', 'T03', 'Physics'],
              ['S003', 'T02', 'Chemistry'],
            ]}
            note="T01 and T03 both teach Physics. T02 teaches Chemistry only. Each student has one teacher per subject."
          />

          <SubSubTitle>Finding Candidate Keys and FDs</SubSubTitle>

          <CodeBox label="Functional dependency analysis for STUDENT_TEACHER_SUBJECT">
{`// FUNCTIONAL DEPENDENCIES:
// FD1: (student_id, subject) → teacher_id
//      "A student studies each subject with exactly one teacher"
//      Knowing student + subject → we know which teacher

// FD2: teacher_id → subject
//      "Each teacher teaches only one subject"
//      Knowing teacher_id → we know which subject

// CANDIDATE KEYS:
// (student_id, teacher_id):
//   Closure: {student_id, teacher_id}
//   Apply teacher_id → subject: {student_id, teacher_id, subject}
//   = all attributes → superkey
//   Is it minimal? Remove student_id: {teacher_id} → {teacher_id, subject} ≠ all ✓
//   Remove teacher_id: {student_id} → {student_id} ≠ all ✓
//   → CANDIDATE KEY #1: {student_id, teacher_id}

// (student_id, subject):
//   Closure: {student_id, subject}
//   Apply (student_id, subject) → teacher_id: {student_id, subject, teacher_id}
//   = all attributes → superkey
//   Is it minimal? Remove student_id: {subject} → cannot derive teacher_id for a student ✓
//   Remove subject: {student_id} → cannot derive teacher_id ✓
//   → CANDIDATE KEY #2: {student_id, subject}

// TWO CANDIDATE KEYS: {student_id, teacher_id} and {student_id, subject}
// Prime attributes: student_id, teacher_id, subject — ALL attributes are prime!

// 3NF CHECK:
// For FD1: (student_id, subject) → teacher_id
//   Is {student_id, subject} a superkey? YES (it's a candidate key)
//   → Satisfies 3NF ✓
// For FD2: teacher_id → subject
//   Is {teacher_id} a superkey? NO (teacher_id alone cannot determine student_id)
//   Is subject a prime attribute? YES (subject is part of candidate key {student_id, subject})
//   → 3NF exception applies: Y is prime → Satisfies 3NF ✓
// CONCLUSION: Relation IS in 3NF

// BCNF CHECK:
// For FD2: teacher_id → subject
//   Is {teacher_id} a superkey? NO!
//   BCNF requires every determinant to be a superkey — NO EXCEPTIONS
//   → BCNF VIOLATED!`}
          </CodeBox>

          <Para>
            The relation is in 3NF but NOT in BCNF. The FD
            <code style={{ fontFamily: 'var(--font-mono)', color: '#8b5cf6', fontSize: 13 }}> teacher_id → subject</code>
            violates BCNF because teacher_id is not a superkey. However, 3NF allows it because subject is a prime attribute.
          </Para>

          <SubSubTitle>The Anomaly That Remains in 3NF — But Not After BCNF</SubSubTitle>

          <Para>
            Despite being in 3NF, this relation still has an update anomaly: if teacher T01 changes
            from teaching Physics to teaching Mathematics, we must update every row where teacher_id = 'T01'.
            If T01 teaches 500 students, we update 500 rows. Miss one → inconsistency.
          </Para>

          <SubSubTitle>BCNF Decomposition</SubSubTitle>

          <Para>
            We decompose by removing the violating FD (teacher_id → subject) into its own relation:
          </Para>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <RelationTable
                title="TEACHER_SUBJECT (extracted)"
                headers={['teacher_id (PK)', 'subject']}
                rows={[
                  ['T01', 'Physics'],
                  ['T02', 'Chemistry'],
                  ['T03', 'Physics'],
                ]}
                note="teacher_id → subject. One row per teacher. No redundancy."
              />
            </div>
            <div>
              <RelationTable
                title="STUDENT_TEACHER (remaining)"
                headers={['student_id (PK)', 'teacher_id (PK, FK)']}
                rows={[
                  ['S001', 'T01'],
                  ['S001', 'T02'],
                  ['S002', 'T01'],
                  ['S002', 'T02'],
                  ['S003', 'T03'],
                  ['S003', 'T02'],
                ]}
                note="(student_id, teacher_id) → all. Both are prime attributes."
              />
            </div>
          </div>
        </div>

        <SubTitle>The Critical BCNF Trade-off — Dependency Preservation</SubTitle>

        <Para>
          There is a significant cost to BCNF decomposition that 3NF decomposition does not have:
          <strong style={{ color: 'var(--text)' }}> BCNF decomposition may not preserve all functional dependencies</strong>.
          After decomposing to BCNF, some FDs may no longer be directly enforceable within a single table —
          enforcing them requires a JOIN.
        </Para>

        <CodeBox label="The dependency preservation problem after BCNF decomposition">
{`-- After BCNF decomposition, we have:
-- TEACHER_SUBJECT(teacher_id PK, subject)
-- STUDENT_TEACHER(student_id PK, teacher_id FK)

-- The original FD: (student_id, subject) → teacher_id
-- This FD CANNOT be directly enforced in either BCNF table alone.
-- To verify it, we must JOIN:

SELECT st.student_id, ts.subject, st.teacher_id
FROM student_teacher st
JOIN teacher_subject ts ON st.teacher_id = ts.teacher_id;

-- To enforce "each student has at most one teacher per subject":
-- We need a UNIQUE constraint on (student_id, subject) — but these columns
-- are now in DIFFERENT tables! We cannot add a UNIQUE constraint that spans tables.

-- This means the BCNF schema can allow invalid data:
INSERT INTO student_teacher VALUES ('S001', 'T01');  -- T01 teaches Physics
INSERT INTO student_teacher VALUES ('S001', 'T03');  -- T03 ALSO teaches Physics!
-- Now student S001 has TWO Physics teachers — violates the original business rule
-- But the BCNF schema cannot prevent this without application-level enforcement

-- THE CHOICE:
-- 3NF: All dependencies preserved. Some redundancy possible. Anomaly-free enough for most uses.
-- BCNF: All dependencies enforced by superkeys. May lose some dependency enforcement in decomposition.

-- IN PRACTICE:
-- Most schemas in production aim for 3NF.
-- BCNF is preferred when the dependency that causes the violation is truly independent
-- and the lost FD can be enforced at the application layer or with triggers.`}
        </CodeBox>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#8b5cf6', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Professional Decision</div>
          <Para>
            For production database design, the standard recommendation is:
            <strong style={{ color: 'var(--text)' }}> aim for 3NF, and move to BCNF only when the anomalies
            remaining in 3NF are causing real production problems</strong>. BCNF is the theoretically
            stronger form, but its inability to always preserve functional dependencies means you
            may need triggers or application code to enforce constraints that were automatic in 3NF.
            The cost of that complexity must be weighed against the benefit of eliminating the remaining anomaly.
          </Para>
          <Para>
            For exams and interviews: know the BCNF definition precisely, be able to identify
            when 3NF and BCNF differ, and be able to explain the trade-off between them.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 6 — 4NF
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — 4NF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#facc15', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 04</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Fourth Normal Form (4NF)</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #facc15', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#facc15', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in Fourth Normal Form if and only if it is in BCNF AND contains
            no non-trivial <strong style={{ color: 'var(--text)' }}>multi-valued dependencies</strong> unless
            the determinant is a superkey.
          </Para>
        </div>

        <SubTitle>Multi-valued Dependencies — A New Category of Problem</SubTitle>

        <Para>
          BCNF handles functional dependencies — where one set of attributes determines one value.
          But some relations have a different kind of redundancy that functional dependencies
          cannot capture: <strong style={{ color: 'var(--text)' }}>multi-valued dependencies</strong>.
        </Para>

        <Para>
          A multi-valued dependency <strong style={{ color: 'var(--text)' }}>X ↠ Y</strong> exists
          in a relation R(X, Y, Z) when: the set of Y values associated with a given X value
          is independent of the Z values associated with that same X value. The Y values and
          Z values are two independent sets of facts about X, and forcing them to coexist in
          one table causes spurious tuple multiplication.
        </Para>

        <Para>
          A classic example: a course can have multiple textbooks AND multiple teachers.
          These are two independent facts about a course — the set of textbooks doesn't
          depend on which teachers teach it, and vice versa.
        </Para>

        <RelationTable
          title="COURSE_TEACHER_TEXTBOOK — BCNF satisfied, but 4NF violated"
          headers={['course_id', 'teacher_id', 'textbook']}
          rows={[
            ['CS301', 'T01', 'Database System Concepts'],
            ['CS301', 'T01', 'Fundamentals of Database Systems'],
            ['CS301', 'T02', 'Database System Concepts'],
            ['CS301', 'T02', 'Fundamentals of Database Systems'],
          ]}
          note="CS301 has 2 teachers (T01, T02) and 2 textbooks. Each teacher-textbook combination creates a row — 2×2 = 4 rows for 2+2 independent facts."
        />

        <Para>
          Notice the problem: every combination of teacher and textbook for CS301 must appear
          as a separate row. If CS301 gets a third teacher, we must add 2 new rows (one per textbook).
          If CS301 gets a third textbook, we must add 2 new rows (one per teacher). The rows
          multiply because two independent sets of facts are being stored together.
        </Para>

        <CodeBox label="Multi-valued dependency analysis and 4NF decomposition">
{`// MULTI-VALUED DEPENDENCIES in COURSE_TEACHER_TEXTBOOK:
// course_id ↠ teacher_id (the set of teachers for a course is independent of textbooks)
// course_id ↠ textbook   (the set of textbooks for a course is independent of teachers)

// 4NF VIOLATION:
// course_id ↠ teacher_id: Is course_id a superkey? NO (course_id doesn't uniquely identify rows)
// course_id ↠ textbook:   Is course_id a superkey? NO
// → 4NF VIOLATED

// THE ANOMALIES:
// Insert: Cannot add a new textbook for CS301 with ONE row — must add one row per teacher
// Delete: If T01 is removed from CS301, we must delete rows carefully to not lose textbook info
// Update: These same spurious combinations must be maintained consistently

// 4NF DECOMPOSITION: Split into two separate tables, one per independent multi-valued fact
// COURSE_TEACHERS: course_id ↠ teacher_id
// COURSE_TEXTBOOKS: course_id ↠ textbook

-- AFTER 4NF DECOMPOSITION:
CREATE TABLE course_teachers (
    course_id   VARCHAR(10)  NOT NULL,
    teacher_id  VARCHAR(10)  NOT NULL,
    PRIMARY KEY (course_id, teacher_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

CREATE TABLE course_textbooks (
    course_id  VARCHAR(10)  NOT NULL,
    textbook   VARCHAR(200) NOT NULL,
    PRIMARY KEY (course_id, textbook),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- COURSE_TEACHERS:       COURSE_TEXTBOOKS:
-- CS301 | T01            CS301 | Database System Concepts
-- CS301 | T02            CS301 | Fundamentals of Database Systems

-- NOW: adding teacher T03 to CS301 = 1 row in COURSE_TEACHERS
--      adding a new textbook = 1 row in COURSE_TEXTBOOKS
-- No spurious multiplication. Independent facts stored independently.`}
        </CodeBox>

        <Callout type="info">
          4NF violations are less common than 1NF/2NF/3NF violations in practice, but they appear
          in any schema that needs to track two or more independent multi-valued attributes about
          the same entity. Common scenarios: a product with multiple compatible parts AND multiple
          applicable regions (independent facts), an employee with multiple skills AND multiple
          certifications (independent facts), a course with multiple teachers AND multiple
          textbooks (the classic example above).
        </Callout>
      </section>

      {/* ========================================
          PART 7 — 5NF
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — 5NF" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#e879f9', background: 'rgba(232,121,249,0.1)', border: '1px solid rgba(232,121,249,0.25)', borderRadius: 6, padding: '4px 12px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Normal Form 05</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Fifth Normal Form (5NF) — Project-Join Normal Form</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #e879f9', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#e879f9', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Formal Definition</div>
          <Para>
            A relation is in Fifth Normal Form (also called Project-Join Normal Form, PJNF)
            if and only if it is in 4NF and every
            <strong style={{ color: 'var(--text)' }}> join dependency</strong> in the relation
            is implied by the candidate keys. A join dependency exists when a relation can
            be losslessly decomposed into three or more projections that can be rejoined
            to reconstruct the original relation.
          </Para>
        </div>

        <Para>
          5NF addresses the rarest and most subtle form of redundancy — join dependencies that
          cannot be explained by either functional or multi-valued dependencies. The classic
          example involves a three-way relationship where a specific combination of values
          is meaningful only when all three are present together.
        </Para>

        <CodeBox label="5NF example — supplier-part-project three-way constraint">
{`// Scenario: A SUPPLIER can supply certain PARTs, a SUPPLIER works on certain PROJECTs,
// and certain PARTs are used in certain PROJECTs.
// BUSINESS RULE: A supplier supplies a part to a project IF AND ONLY IF:
//   (a) The supplier can supply that part, AND
//   (b) The supplier works on that project, AND
//   (c) That part is used in that project
// This is a cyclic join dependency — not expressible as an FD or MVD.

-- SUPPLIER_PART_PROJECT table (contains all valid three-way combinations):
-- supplier | part  | project
-- S1       | P1    | J1
-- S1       | P1    | J2
-- S1       | P2    | J1
-- S2       | P1    | J1

-- If we decompose into three binary relations:
-- SUPPLIER_PART:    {(S1,P1), (S1,P2), (S2,P1)}
-- SUPPLIER_PROJECT: {(S1,J1), (S1,J2), (S2,J1)}
-- PART_PROJECT:     {(P1,J1), (P1,J2), (P2,J1)}

-- To reconstruct, we JOIN all three:
SELECT sp.supplier, sp.part, sj.project
FROM supplier_part sp
JOIN supplier_project sj ON sp.supplier = sj.supplier
JOIN part_project pp     ON sp.part = pp.part AND sj.project = pp.project;

-- This JOIN produces EXACTLY the original tuples — no spurious tuples.
-- If any binary pair relationship is invalid (spurious), the JOIN removes it
-- because the third pair acts as a filter.

-- IN SQL (5NF-compliant schema):
CREATE TABLE supplier_parts (
    supplier_id  VARCHAR(10) NOT NULL,
    part_id      VARCHAR(10) NOT NULL,
    PRIMARY KEY (supplier_id, part_id)
);

CREATE TABLE supplier_projects (
    supplier_id  VARCHAR(10) NOT NULL,
    project_id   VARCHAR(10) NOT NULL,
    PRIMARY KEY (supplier_id, project_id)
);

CREATE TABLE part_projects (
    part_id     VARCHAR(10) NOT NULL,
    project_id  VARCHAR(10) NOT NULL,
    PRIMARY KEY (part_id, project_id)
);

-- ADVANTAGE: Adding that S1 can now supply P3 to J1 requires
-- checking all three binary relations — the three-way constraint is
-- enforced by the intersection of independent binary facts.`}
        </CodeBox>

        <Para>
          5NF is rarely encountered in practical application database design. It appears
          in academic literature, in GATE exam questions, and in certain specific domains
          (supply chain management, logistics, complex scheduling systems where three-way
          cyclic constraints are present). For most production schemas, achieving BCNF
          or 3NF is the practical target.
        </Para>
      </section>

      {/* ========================================
          PART 8 — LOSSLESS DECOMPOSITION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Lossless Decomposition" />
        <SectionTitle>Lossless Decomposition — The Non-Negotiable Requirement</SectionTitle>

        <Para>
          Every decomposition during normalisation must satisfy one absolute requirement:
          it must be <strong style={{ color: 'var(--text)' }}>lossless</strong> (also called
          lossless-join). A decomposition is lossless if the original relation can be
          reconstructed exactly by joining the decomposed relations — no spurious tuples
          added, no original tuples lost.
        </Para>

        <Para>
          A lossy decomposition is a catastrophe — it permanently destroys information.
          You can never recover the original data from the decomposed tables. Every
          normalisation step you perform must preserve the ability to reconstruct the
          original data by joining.
        </Para>

        <CodeBox label="Lossless vs lossy decomposition — the test and the rule">
{`// ORIGINAL RELATION R(A, B, C) with tuples:
// A | B | C
// 1 | x | p
// 1 | y | q
// 2 | x | r

// DECOMPOSITION 1: R1(A, B) and R2(B, C)
// R1:          R2:
// A | B        B | C
// 1 | x        x | p
// 1 | y        y | q
// 2 | x        x | r

// RECONSTRUCT via natural join R1 ⋈ R2 (join on B):
// A | B | C
// 1 | x | p    ← original ✓
// 1 | x | r    ← SPURIOUS! This tuple was NOT in the original relation!
// 1 | y | q    ← original ✓
// 2 | x | p    ← SPURIOUS! This tuple was NOT in the original relation!
// 2 | x | r    ← original ✓
// → LOSSY DECOMPOSITION — spurious tuples introduced. This decomposition DESTROYS INFORMATION.

// DECOMPOSITION 2: R1(A, B) and R2(A, C)
// R1:          R2:
// A | B        A | C
// 1 | x        1 | p
// 1 | y        1 | q
// 2 | x        2 | r

// RECONSTRUCT via natural join R1 ⋈ R2 (join on A):
// A | B | C
// 1 | x | p    ← original ✓
// 1 | x | q    ← SPURIOUS!
// 1 | y | p    ← SPURIOUS!
// 1 | y | q    ← original ✓
// 2 | x | r    ← original ✓
// → ALSO LOSSY. Joining on A introduces spurious combinations.

// THE LOSSLESS DECOMPOSITION RULE (Heath's Theorem):
// A decomposition of R(X, Y, Z) into R1(X, Y) and R2(X, Z) is lossless if and only if:
// X → Y  (X functionally determines Y), OR
// X → Z  (X functionally determines Z)
// In other words: the attributes in the JOIN column set must be a superkey of at least one
// of the decomposed relations.

// APPLYING THE RULE:
// Decompose COURSES(course_id, course_name, teacher_id, teacher_name, teacher_phone, teacher_dept)
// into COURSES(course_id, course_name, teacher_id) and TEACHERS(teacher_id, teacher_name, teacher_phone, teacher_dept)
// JOIN attribute: teacher_id
// Is teacher_id a superkey of TEACHERS? YES (teacher_id is the PK of TEACHERS)
// → LOSSLESS DECOMPOSITION ✓

-- VERIFICATION:
SELECT c.course_id, c.course_name, c.teacher_id, t.teacher_name, t.teacher_phone, t.teacher_dept
FROM courses c JOIN teachers t ON c.teacher_id = t.teacher_id;
-- This JOIN exactly reconstructs the original COURSES table — no spurious tuples.`}
        </CodeBox>

        <Callout type="warning">
          <strong>Lossless decomposition is mandatory — not optional.</strong>
          Never decompose a table during normalisation without verifying that the join
          on the common attributes will perfectly reconstruct the original. In all standard
          normalisation procedures (removing partial dependencies, removing transitive dependencies),
          the decomposition is always lossless because you always keep the determinant
          attribute in both the original and the extracted table. That determinant becomes
          the join key — and because it determines the extracted attributes, joining on
          it produces exactly the original data.
        </Callout>

        <SubTitle>Dependency Preservation — The Other Requirement</SubTitle>

        <Para>
          The second desirable property of normalisation decompositions is
          <strong style={{ color: 'var(--text)' }}> dependency preservation</strong>: every
          functional dependency in the original relation should be enforceable in at least
          one of the decomposed relations without requiring a join.
        </Para>

        <Para>
          Why does this matter? Because FDs that span multiple tables cannot be enforced
          by simple constraints — they require either triggers or application-level checks,
          both of which are error-prone and performance-impacting. 3NF decomposition
          always preserves dependencies. BCNF decomposition may not.
        </Para>

        <CodeBox label="Dependency preservation check">
{`// ORIGINAL RELATION: R(student_id, teacher_id, subject)
// FUNCTIONAL DEPENDENCIES:
//   FD1: (student_id, subject) → teacher_id
//   FD2: teacher_id → subject

// BCNF DECOMPOSITION produces:
//   R1(teacher_id, subject) — teacher_id is PK, enforces FD2
//   R2(student_id, teacher_id) — (student_id, teacher_id) is PK

// CHECK DEPENDENCY PRESERVATION:
// FD1: (student_id, subject) → teacher_id
//   student_id is in R2. subject is in R1. teacher_id is in both.
//   FD1 CANNOT be checked within R1 alone (no student_id there)
//   FD1 CANNOT be checked within R2 alone (no subject there)
//   Checking FD1 requires JOIN of R1 and R2 → NOT PRESERVED in decomposition
//   → FD1 is a lost dependency

// CONSEQUENCE:
-- Can we insert this into R2 without violating FD1?
INSERT INTO r2_student_teacher VALUES ('S001', 'T01');  -- T01 teaches Physics
INSERT INTO r2_student_teacher VALUES ('S001', 'T03');  -- T03 also teaches Physics!
-- Without FD1 enforced in any single table, S001 now has TWO Physics teachers
-- The BCNF schema cannot prevent this — it requires application-level enforcement

// CONTRAST WITH 3NF DECOMPOSITION (from our main example):
// Original: COURSES(course_id, course_name, teacher_id, teacher_name, teacher_phone, teacher_dept)
// 3NF decomposition:
//   COURSES(course_id, course_name, teacher_id)   — course_id → teacher_id preserved here ✓
//   TEACHERS(teacher_id, teacher_name, teacher_phone, teacher_dept) — teacher_id → * preserved ✓
// ALL FDs are preserved in the 3NF decomposition.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 9 — DENORMALIZATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — When to Break the Rules" />
        <SectionTitle>Denormalization — When Breaking Normalization Rules Is the Right Decision</SectionTitle>

        <Para>
          Normalization produces schemas with minimal redundancy and zero anomalies —
          which are ideal for data integrity. But normalised schemas have a performance
          cost: retrieving complete information about an entity often requires JOINs across
          multiple tables. At scale — millions to billions of rows — those JOINs can become
          performance bottlenecks.
        </Para>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Denormalization</strong> is the deliberate,
          controlled introduction of redundancy to improve read performance. It is a design
          choice, not a design mistake. The engineer who denormalises knows exactly what
          normalization rule they are breaking, why they are breaking it, and what mechanism
          will keep the redundant data consistent. Denormalization without a consistency
          strategy is just bad design.
        </Para>

        <SubTitle>When Denormalization Is Justified</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            {
              scenario: 'High read-to-write ratio with expensive joins',
              color: '#0078d4',
              desc: 'When a JOIN query runs millions of times per day but the underlying data changes rarely, materialising the JOIN result as a pre-computed column eliminates the runtime JOIN cost. The cost of keeping the denormalised column in sync (via triggers or periodic updates) is far less than the cost of 10 million JOINs per day.',
              example: 'Storing customer_name in the orders table even though it exists in the customers table. Orders are read 100x more than they are written. Adding customer_name eliminates the JOIN on every order display query.',
            },
            {
              scenario: 'Snapshot / historical accuracy requirements',
              color: 'var(--accent)',
              desc: 'Sometimes you need to capture what the data looked like at a specific point in time — and normalisation cannot provide this because the referenced table changes. Denormalisation into the fact table preserves the historical snapshot.',
              example: 'Storing unit_price in order_items even though prices exist in the products table. The product price may change tomorrow — the order must record what the price WAS at the time of purchase, not what it is today. This is correct denormalisation, not a mistake.',
            },
            {
              scenario: 'Reporting and analytical workloads (OLAP vs OLTP)',
              color: '#f97316',
              desc: 'Analytical databases (data warehouses) are read-heavy and write-infrequent. Complex analytical queries that aggregate across many dimensions perform dramatically better on denormalised star/snowflake schemas than on fully normalised OLTP schemas. This is why data warehouse design deliberately violates 3NF.',
              example: 'A sales fact table in a data warehouse stores not just order_id and product_id, but product_name, product_category, customer_city, customer_region — all duplicated from the dimension tables — to allow efficient aggregation without runtime JOINs across billions of rows.',
            },
            {
              scenario: 'Avoiding the N+1 query problem in APIs',
              color: '#8b5cf6',
              desc: 'An API endpoint that renders a list of 100 orders, each needing the customer name, faces an N+1 problem: 1 query for orders + 100 queries for customer names. Denormalising customer_name into the orders table converts this to 1 query.',
              example: 'ORDER LIST API: with normalised schema → 1 + N queries. With denormalised customer_name → 1 query. At high traffic, the difference is thousands of database round-trips per second.',
            },
          ].map((item) => (
            <div key={item.scenario} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.scenario}</div>
              <Para>{item.desc}</Para>
              <div style={{ fontSize: 13, color: item.color,  lineHeight: 1.7 }}>
                → Real example: {item.example}
              </div>
            </div>
          ))}
        </div>

        <SubTitle>Denormalization Techniques and Consistency Strategies</SubTitle>

        <CodeBox label="Denormalization in practice — with consistency mechanisms">
{`-- TECHNIQUE 1: Storing a derived/redundant column with a trigger to maintain it

-- Denormalised: orders.customer_name (redundant — also in customers.name)
ALTER TABLE orders ADD COLUMN customer_name VARCHAR(100);

-- Populate existing rows:
UPDATE orders o SET customer_name = (SELECT name FROM customers WHERE customer_id = o.customer_id);

-- Trigger to keep in sync:
CREATE OR REPLACE FUNCTION sync_order_customer_name()
RETURNS TRIGGER AS $$
BEGIN
    -- When a customer's name changes, update all their orders
    UPDATE orders
    SET customer_name = NEW.name
    WHERE customer_id = NEW.customer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_customer_name_update
AFTER UPDATE OF name ON customers
FOR EACH ROW
WHEN (OLD.name IS DISTINCT FROM NEW.name)
EXECUTE FUNCTION sync_order_customer_name();

-- TRADE-OFF: UPDATE to customers.name now triggers UPDATE on orders table.
-- If a customer has 10,000 orders, updating their name touches 10,001 rows.
-- Acceptable if customer name changes are rare; unacceptable if frequent.


-- TECHNIQUE 2: Historical snapshot — intentional denormalisation (no sync needed)
-- order_items.unit_price is denormalised from products.price
-- This is NOT an error — it's intentional historical accuracy

CREATE TABLE order_items (
    order_id    INT           NOT NULL,
    product_id  INT           NOT NULL,
    quantity    INT           NOT NULL,
    unit_price  DECIMAL(10,2) NOT NULL,  -- snapshot of price at time of order
    -- unit_price is intentionally redundant with products.current_price
    -- It must NOT be updated when products.price changes — that would corrupt history
    PRIMARY KEY (order_id, product_id)
);
-- Documentation comment: unit_price is a historical snapshot. Do NOT sync with products.price.


-- TECHNIQUE 3: Materialised view — database-managed denormalisation
-- PostgreSQL maintains a materialised view — a pre-computed, cached result set
CREATE MATERIALIZED VIEW order_summary AS
SELECT
    o.order_id,
    o.order_date,
    c.name           AS customer_name,  -- denormalised from customers
    c.city           AS customer_city,
    COUNT(oi.product_id) AS item_count,
    SUM(oi.quantity * oi.unit_price) AS total
FROM orders o
JOIN customers c   ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.order_date, c.name, c.city;

-- Create index on the materialised view for fast lookups:
CREATE INDEX idx_order_summary_customer ON order_summary(customer_name);

-- Refresh strategy: choose based on data freshness requirements
REFRESH MATERIALIZED VIEW CONCURRENTLY order_summary;
-- CONCURRENTLY: refresh without locking reads (requires unique index on the view)
-- Schedule via pg_cron or application-level job:
-- SELECT cron.schedule('refresh-order-summary', '*/15 * * * *', 'REFRESH MATERIALIZED VIEW CONCURRENTLY order_summary');

-- Query the materialised view (no JOIN at query time):
SELECT * FROM order_summary WHERE customer_city = 'Bengaluru' ORDER BY total DESC;
-- Fast: reads pre-computed data, uses index, no runtime JOIN`}
        </CodeBox>

        <Callout type="example">
          <strong>Real case — Swiggy order history page:</strong><br /><br />
          Swiggy's fully normalised schema for order data has: orders table, order_items table,
          products table, restaurants table, customers table — 5 JOIN operations to render
          one order card. At 50 million orders per day, the order history page is queried
          constantly. <br /><br />
          The solution: a pre-computed order_history_view materialised view (or a separate
          order_display table) that stores order_id, restaurant_name, item_names (as JSON array),
          total, date, and status — all in one row. The history page reads ONE row per order.
          The normalised tables are still the source of truth — the denormalised view is
          refreshed every few minutes. Read performance: O(1). Consistency: eventually
          consistent (acceptable for order history display).
        </Callout>
      </section>

      {/* ========================================
          PART 10 — NORMALIZATION SUMMARY AND COMPARISON
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — The Complete Picture" />
        <SectionTitle>All Normal Forms — Side by Side</SectionTitle>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Normal Form', 'Prerequisite', 'Additional Requirement', 'Eliminates', 'Dependency Type'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1NF', '—', 'All attribute values are atomic; no repeating groups; rows are unique', 'Multi-valued cells, repeating groups', 'Structural constraint'],
                ['2NF', '1NF', 'Every non-prime attribute is fully dependent on the entire composite PK', 'Partial dependencies', 'Functional dependency (partial)'],
                ['3NF', '2NF', 'No non-prime attribute is transitively dependent on the PK', 'Transitive dependencies', 'Functional dependency (transitive)'],
                ['BCNF', '3NF', 'For every non-trivial FD X→Y, X must be a superkey', 'Remaining FD anomalies in overlapping-key relations', 'Functional dependency (all)'],
                ['4NF', 'BCNF', 'No non-trivial multi-valued dependency X↠Y unless X is a superkey', 'Independent multi-valued attribute duplication', 'Multi-valued dependency'],
                ['5NF', '4NF', 'Every join dependency is implied by the candidate keys', 'Cyclic join dependency redundancy', 'Join dependency'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '12px 14px',
                      color: j === 0 ? 'var(--accent)' : 'var(--text2)',
                      fontWeight: j === 0 ? 800 : 400,
                      fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif',
                      fontSize: 13, lineHeight: 1.6,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SubTitle>The Quick Test — How to Identify Which Normal Form Is Violated</SubTitle>

        <CodeBox label="Decision tree — identifying normal form violations">
{`// STEP 1: Is every cell atomic? No multi-valued cells, no repeating groups?
// NO → Not even 1NF. Fix: split into separate tables or separate columns.

// STEP 2: Is the primary key composite?
// NO → Automatically in 2NF (partial dependency impossible with single-attribute PK)
//       Proceed to Step 3.
// YES → For each non-prime attribute A, ask:
//        "Does A depend on the FULL primary key, or just PART of it?"
//        If PART → 2NF violation. Fix: move A and its partial key to a new table.

// STEP 3: For each non-prime attribute A, ask:
//   "What directly determines A?"
//   If the answer is "the primary key directly" → OK
//   If the answer is "another non-prime attribute B (which is determined by PK)"
//     → Transitive dependency → 3NF violation.
//     Fix: move B and its dependents to a new table with B as PK.

// STEP 4 (BCNF check): For every non-trivial FD X → Y in the relation:
//   Is X a superkey?
//   NO → BCNF violation (even if it passed 3NF because Y is a prime attribute).
//   Fix: decompose, accepting potential dependency-preservation loss.

// STEP 5 (4NF check): Are there independent multi-valued attributes of the same key?
//   e.g., course_id ↠ teachers AND course_id ↠ textbooks (independent sets)?
//   YES → 4NF violation. Fix: separate tables for each multi-valued set.

// STEP 6 (5NF check — rarely needed):
//   Can the relation be decomposed into 3+ projections that perfectly rejoin?
//   And is this decomposition NOT implied by FDs or MVDs?
//   YES → 5NF violation. Very rare in practice.

// PRACTICAL STOPPING POINT:
// For OLTP databases: aim for 3NF as minimum, BCNF where practical.
// For data warehouses: intentional denormalisation (star/snowflake schema) is standard.
// For exam/interview: understand all 6 normal forms precisely.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 11 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Schema Review — Catching Normalisation Violations in Code Review</SectionTitle>

        <Para>
          Normalization knowledge shows up most powerfully in code reviews. When a junior
          engineer submits a migration adding new tables, a senior engineer immediately
          scans for the patterns we have studied. Here is a realistic review showing
          how this knowledge applies directly.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Pull Request — Migration for New "Training Assignments" Feature
          </div>

          <CodeBox label="Junior engineer's migration — multiple normalisation violations">
{`-- Migration: create training assignments table
CREATE TABLE training_assignments (
    assignment_id       SERIAL        PRIMARY KEY,
    employee_id         INT           NOT NULL,
    employee_name       VARCHAR(100),              -- VIOLATION: 3NF transitive
    employee_department VARCHAR(100),              -- VIOLATION: 3NF transitive
    employee_location   VARCHAR(100),              -- VIOLATION: 3NF transitive
    course_id           INT           NOT NULL,
    course_name         VARCHAR(200),              -- VIOLATION: 3NF transitive
    course_duration_hrs INT,                       -- VIOLATION: 3NF transitive
    vendor_id           INT,
    vendor_name         VARCHAR(100),              -- VIOLATION: 3NF transitive
    vendor_contact      VARCHAR(200),              -- VIOLATION: 3NF transitive (multi-valued?)
    assigned_date       DATE          NOT NULL DEFAULT CURRENT_DATE,
    completion_date     DATE,
    status              VARCHAR(20)   NOT NULL DEFAULT 'pending',
    score               INT,
    skills_covered      TEXT          -- VIOLATION: 1NF (comma-separated values)
                                     -- "Python,SQL,Data Engineering"
);`}
          </CodeBox>

          <Para>
            <strong style={{ color: 'var(--text)' }}>Senior engineer's review comments:</strong>
          </Para>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                comment: '3NF Violation — employee_name, employee_department, employee_location',
                color: '#ff4757',
                detail: 'These depend on employee_id, not on assignment_id. They are facts about the employee, not about the assignment. If Rahul changes departments, we must update every assignment row. Move them to the employees table (they may already be there). This table should only have employee_id as FK.',
              },
              {
                comment: '3NF Violation — course_name, course_duration_hrs',
                color: '#f97316',
                detail: 'These depend on course_id, not assignment_id. Facts about the course belong in a courses table. Store only course_id as FK here.',
              },
              {
                comment: '3NF Violation — vendor_name, vendor_contact',
                color: '#f97316',
                detail: 'These depend on vendor_id. Create a vendors table. Store only vendor_id FK here. Also: vendor_contact as TEXT is suspicious — if it contains multiple contact methods, this is also a 1NF violation. Separate table for vendor_contacts.',
              },
              {
                comment: '1NF Violation — skills_covered',
                color: '#ff4757',
                detail: 'Comma-separated values in a TEXT column is a classic 1NF violation. If we ever need to query "find all employees who completed training covering Python" this query is impossible to do efficiently. Create a training_assignment_skills(assignment_id FK, skill VARCHAR) table with PK (assignment_id, skill).',
              },
              {
                comment: 'What SHOULD remain in this table',
                color: 'var(--accent)',
                detail: 'assignment_id (PK), employee_id (FK), course_id (FK), vendor_id (FK, nullable), assigned_date, completion_date, status, score. That is it. Everything else belongs in the referenced tables.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '14px 18px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.comment}</div>
                <Para>{item.detail}</Para>
              </div>
            ))}
          </div>

          <CodeBox label="Corrected migration — fully normalised">
{`-- Assuming employees, courses, and vendors tables already exist or are created separately

-- Correct training_assignments table: only assignment-specific facts
CREATE TABLE training_assignments (
    assignment_id    SERIAL  PRIMARY KEY,
    employee_id      INT     NOT NULL,
    course_id        INT     NOT NULL,
    vendor_id        INT,    -- nullable: some courses are internal (no vendor)
    assigned_date    DATE    NOT NULL DEFAULT CURRENT_DATE,
    completion_date  DATE,
    status           VARCHAR(20) NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'cancelled')),
    score            INT     CHECK (score BETWEEN 0 AND 100),
    
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE RESTRICT,
    FOREIGN KEY (course_id)   REFERENCES courses(course_id)   ON DELETE RESTRICT,
    FOREIGN KEY (vendor_id)   REFERENCES vendors(vendor_id)   ON DELETE SET NULL
);

-- Separate table for skills covered (1NF compliant)
CREATE TABLE assignment_skills (
    assignment_id  INT         NOT NULL,
    skill          VARCHAR(100) NOT NULL,
    PRIMARY KEY (assignment_id, skill),
    FOREIGN KEY (assignment_id) REFERENCES training_assignments(assignment_id) ON DELETE CASCADE
);

-- Now queries are clean:
-- "Find employees who completed Python training in the last 6 months"
SELECT DISTINCT e.name, e.department
FROM employees e
JOIN training_assignments ta ON e.employee_id = ta.employee_id
JOIN assignment_skills ask    ON ta.assignment_id = ask.assignment_id
WHERE ask.skill = 'Python'
  AND ta.status = 'completed'
  AND ta.completion_date >= CURRENT_DATE - INTERVAL '6 months';

-- "If training vendor changes contact info: update ONE row in vendors table.
--  Zero training_assignment rows need updating." ← the update anomaly is gone`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 12 — INTERVIEW TRAPS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 12 — Interview Traps" />
        <SectionTitle>Every Normalisation Interview Trap — Questions That Fail 90% of Candidates</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'A relation has a single-attribute primary key and is in 1NF. What normal forms can it violate?',
              trap: 'Saying "it could violate 2NF."',
              answer: 'It CANNOT violate 2NF — partial dependency requires a composite primary key, which this relation doesn\'t have. However, it CAN still violate 3NF (transitive dependency), BCNF (non-superkey determinant — though with single-attribute PK this is unusual), 4NF (multi-valued dependencies), and 5NF. The most common violation is 3NF: a non-prime attribute depends transitively on the PK through another non-prime attribute.',
              color: '#f97316',
            },
            {
              q: 'If a relation is in BCNF, is it necessarily in 3NF?',
              trap: 'Saying "no, they are different."',
              answer: 'Yes, always. The normal forms are strictly hierarchical: 5NF ⊂ 4NF ⊂ BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF. Every relation in BCNF is automatically in 3NF (and 2NF, and 1NF). BCNF is strictly stronger than 3NF — it is a subset of 3NF-satisfying relations.',
              color: 'var(--accent)',
            },
            {
              q: 'A relation R(A, B, C) has FDs: A→B, B→C. What normal forms does it satisfy?',
              trap: 'Not analysing which attributes are prime and which are non-prime.',
              answer: 'First, find candidate keys: A⁺ = {A,B,C} = all attributes → A is a candidate key (and the only one, since B alone gives {B,C} ≠ all and C alone gives {C} ≠ all). So A is the only candidate key, A is the only prime attribute, B and C are non-prime. 1NF: need to check for atomic values (assume satisfied). 2NF: single-attribute PK → automatically in 2NF. 3NF: B→C — B is non-prime, C is non-prime, and B is not a superkey → TRANSITIVE DEPENDENCY → NOT in 3NF. Therefore: R is in 2NF but NOT in 3NF (and not BCNF, 4NF, 5NF).',
              color: '#0078d4',
            },
            {
              q: 'Can a relation be in BCNF but not in 4NF?',
              trap: 'Saying "no, BCNF is stronger so it implies 4NF."',
              answer: 'Yes. BCNF and 4NF address different types of dependencies. BCNF addresses functional dependencies — for every FD X→Y, X must be a superkey. 4NF addresses multi-valued dependencies — for every MVD X↠Y, X must be a superkey. A relation can have no problematic FDs (satisfying BCNF) but still have multi-valued dependencies (violating 4NF). The classic example: COURSE_TEACHER_TEXTBOOK satisfies BCNF (because the only candidate key is the entire composite of all three attributes, making every attribute prime — no FD violations possible), but violates 4NF because of the independent multi-valued dependencies.',
              color: '#8b5cf6',
            },
            {
              q: 'Is every BCNF decomposition always lossless?',
              trap: 'Saying "yes, if done correctly."',
              answer: 'Losslessness and the normal form of a decomposition are separate concerns. You CAN perform a BCNF decomposition that is lossy if done incorrectly. The lossless property comes from Heath\'s Theorem: decomposing R(X,Y,Z) into R1(X,Y) and R2(X,Z) is lossless if and only if X→Y or X→Z holds. Standard BCNF decomposition procedures always choose the decomposition so that the join attribute (the determinant of the violating FD) is a key of one of the resulting relations — this guarantees losslessness. But if you arbitrarily decompose without following this rule, the result can be lossy.',
              color: '#facc15',
            },
            {
              q: 'A relation has no FD violations but fails the 4NF test. Is it in 3NF?',
              trap: 'Saying "no, if it fails 4NF it fails everything below."',
              answer: 'Yes, it can be in 3NF (and BCNF) while failing 4NF. 3NF and BCNF only check for functional dependency violations. A relation with no FD violations is automatically in 3NF and BCNF regardless of its multi-valued dependencies. 4NF is a strictly higher requirement that goes beyond FD-based normal forms. It is entirely possible — and common — to have a relation that satisfies BCNF but violates 4NF.',
              color: '#ff4757',
            },
            {
              q: 'What is the difference between a partial dependency and a transitive dependency?',
              trap: 'Confusing the two or describing them in vague terms.',
              answer: 'A partial dependency: a non-prime attribute is determined by only PART of a composite primary key. Example: in (student_id, course_id) → student_name, student_name only depends on student_id — a subset of the PK. Partial dependencies can only exist in relations with composite primary keys. A transitive dependency: a non-prime attribute A is determined by another non-prime attribute B, which is itself determined by the primary key. The chain is PK → B → A. A depends on the PK only TRANSITIVELY through B. Example: PK = employee_id, FDs: employee_id → dept_id → dept_name. dept_name is transitively dependent on employee_id through dept_id. Transitive dependencies can exist with both single and composite primary keys.',
              color: '#e879f9',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Q: {item.q}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Trap:</span>
                <span style={{ fontSize: 13, color: '#ff4757',  lineHeight: 1.75, fontStyle: 'italic' }}>{item.trap}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Answer:</span>
                <span style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.85 }}>{item.answer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'Normalization eliminates data anomalies — insert (cannot add a fact without adding an unrelated fact), update (changing one real-world fact requires changing multiple rows), and delete (deleting one fact destroys another). All three arise from storing facts about multiple independent things in the same table.',
        '1NF: every cell contains exactly one atomic value. No comma-separated lists, no repeating groups, no composite values used as a single atom. Rows must be unique. 1NF is the floor — tables can be in 1NF and still have severe anomalies.',
        '2NF eliminates partial dependencies: every non-prime attribute must depend on the ENTIRE composite primary key, not just part of it. Only relevant for tables with composite primary keys. Fix: extract partially dependent attributes along with their partial key into a new table.',
        '3NF eliminates transitive dependencies: no non-prime attribute should be determined by another non-prime attribute. The chain PK → B → A is a transitive dependency — A must be extracted along with B into a separate table with B as primary key. Applies to ALL tables including single-PK tables.',
        'BCNF is stricter than 3NF: for every non-trivial FD X→Y, X must be a superkey — no exceptions. 3NF allows one exception (Y is a prime attribute). BCNF may not preserve all functional dependencies after decomposition. Most production schemas target 3NF; BCNF is applied selectively.',
        '4NF eliminates multi-valued dependencies: when two independent sets of multi-valued facts exist about the same key (course_id ↠ teachers AND course_id ↠ textbooks), they cause tuple multiplication. Fix: one table per independent multi-valued set.',
        '5NF (Project-Join Normal Form) eliminates join dependencies not implied by candidate keys. Rare in practice. Addresses cyclic three-way constraints where a combination of facts is only valid when all three components satisfy their pairwise binary relationships.',
        'Every decomposition must be lossless: the original relation must be perfectly reconstructible by joining the decomposed relations. Guaranteed if the join attribute is a key (superkey) of at least one of the decomposed relations (Heath\'s Theorem).',
        'Dependency preservation is desirable but not always achievable: 3NF decomposition always preserves dependencies. BCNF decomposition may not — some FDs may become unenforceable within a single table and require triggers or application-level enforcement.',
        'Denormalization is deliberate, controlled introduction of redundancy for performance. Justified for high read-to-write ratios, historical snapshots, analytical workloads, and eliminating expensive JOIN patterns. Always requires a consistency mechanism (trigger, materialized view, or application logic) to prevent the anomalies that normalization prevents.',
      ]} />

    </LearnLayout>
  )
}