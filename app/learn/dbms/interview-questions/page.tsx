import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'DBMS Interview Questions — 60 Complete Answers | Chaduvuko',
  description:
    'The 60 most important DBMS interview questions with complete answers — covering normalization, transactions, indexing, SQL, query processing, concurrency, recovery, distributed databases, NoSQL, and security. For freshers and experienced engineers.',
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

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '16px 20px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

interface QAProps {
  n: number
  q: string
  color: string
  level: 'Fresher' | 'Mid' | 'Senior'
  children: React.ReactNode
}

const QA = ({ n, q, color, level, children }: QAProps) => {
  const levelColor = level === 'Fresher' ? 'var(--accent)' : level === 'Mid' ? '#f97316' : '#8b5cf6'
  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${color}25`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: '22px 26px', marginBottom: 14 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--muted)', flexShrink: 0, marginTop: 2 }}>Q{String(n).padStart(2,'0')}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{q}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: levelColor, background: `${levelColor}12`, border: `1px solid ${levelColor}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em', flexShrink: 0 }}>{level}</span>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        {children}
      </div>
    </div>
  )
}

export default function InterviewQuestions() {
  return (
    <LearnLayout
      title="DBMS Interview Questions"
      description="60 questions across every DBMS topic — with complete answers written the way senior engineers actually think about them. Organised by topic, labelled by difficulty."
      section="DBMS"
      readTime="120–150 min"
      updatedAt="March 2026"
    >

      {/* INTRO */}
      <section style={{ marginBottom: 48 }}>
        <Para>
          These are the 60 questions that appear most frequently across campus placements,
          product company interviews, and GATE examinations. Each answer is written as a
          senior engineer would give it — precise, with the right technical depth, and
          connected to real systems. Work through each question yourself before reading
          the answer. The questions are grouped by topic and labelled by level:
          <strong style={{ color: 'var(--accent)' }}> Fresher</strong> (0–1 year),
          <strong style={{ color: '#f97316' }}> Mid</strong> (1–3 years),
          <strong style={{ color: '#8b5cf6' }}> Senior</strong> (3+ years / GATE deep).
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 10, marginBottom: 8 }}>
          {[
            ['01–08', 'Fundamentals & ER Model', '#0078d4'],
            ['09–16', 'Relational Model & Normalisation', 'var(--accent)'],
            ['17–24', 'SQL & Query Processing', '#f97316'],
            ['25–32', 'Indexing & Storage', '#8b5cf6'],
            ['33–40', 'Transactions & Concurrency', '#facc15'],
            ['41–46', 'Recovery & Distributed', '#e879f9'],
            ['47–52', 'NoSQL & Data Modelling', '#0078d4'],
            ['53–60', 'Security & Design', 'var(--accent)'],
          ].map(([range, topic, color]) => (
            <div key={range as string} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderTop: `3px solid ${color as string}`, borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: color as string, marginBottom: 4 }}>{range as string}</div>
              <Para>{topic as string}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          SECTION 1 — FUNDAMENTALS & ER MODEL
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 01 — Fundamentals & ER Model" />
        <SectionTitle>Fundamentals and ER Model</SectionTitle>

        <QA n={1} q="What is a DBMS and how is it different from a file system?" color="#0078d4" level="Fresher">
          <Para>A Database Management System is software that stores, organises, and retrieves structured data while enforcing consistency, integrity, and concurrent access. A file system stores raw files but provides no understanding of the data inside them. The DBMS adds five things a file system lacks: a data model (structured representation of data and relationships), query language (SQL — retrieve data without knowing physical storage), transaction management (ACID guarantees across multi-step operations), concurrency control (multiple users can access and modify data simultaneously without corrupting it), and recovery (the database restores itself to a consistent state after crashes).</Para>
          <Para>A file system stores payroll.csv. The DBMS stores the same data but can enforce that salary is always positive, ensure two HR managers editing different employees never conflict, rollback a failed salary update, and answer "who earns more than the department average" without reading the entire file.</Para>
        </QA>

        <QA n={2} q="Explain the three-schema architecture of a DBMS." color="#0078d4" level="Fresher">
          <Para>The three-schema architecture separates the database into three levels of abstraction, allowing changes at one level without affecting others. The external schema (view level) is what each user or application sees — a customised view of the data. A payroll app sees salary data; an HR reporting tool sees headcount data; neither sees what the other sees. The conceptual schema (logical level) is the complete logical description of the entire database — all entities, attributes, relationships, and constraints. This is what the DBA works with. The internal schema (physical level) describes how data is actually stored on disk — file formats, indexes, partition strategies, storage engine details.</Para>
          <Para>The architecture provides two kinds of independence. Logical data independence: changing the conceptual schema (adding a column, changing a table name) does not break external views. Physical data independence: changing storage structures (adding an index, changing file format) does not change the conceptual schema. This is why adding an index to a PostgreSQL table does not require changing any application SQL.</Para>
        </QA>

        <QA n={3} q="What are the different types of attributes in the ER model?" color="#0078d4" level="Fresher">
          <Para>Six attribute types exist in the ER model. Simple (atomic) attributes cannot be divided further — employee_id, age, salary. Composite attributes are made up of sub-attributes — full_name is composite (first_name, middle_name, last_name); address is composite (street, city, state, pin). Single-valued attributes have exactly one value per entity — a person has one date_of_birth. Multi-valued attributes can have multiple values — a person can have multiple phone_numbers, multiple email_addresses. Derived attributes can be computed from other attributes — age is derived from date_of_birth; total_price is derived from unit_price × quantity. Null attributes have no applicable or known value — middle_name may be null for many people.</Para>
          <Para>In ER diagrams: simple attributes are ovals, composite attributes are ovals with sub-ovals attached, multi-valued attributes are double ovals, and derived attributes are dashed ovals.</Para>
        </QA>

        <QA n={4} q="What is the difference between total and partial participation in the ER model?" color="#0078d4" level="Fresher">
          <Para>Participation describes whether every instance of an entity must participate in a relationship. Total participation means every entity instance must be involved in at least one instance of the relationship — it is represented by a double line in ER diagrams. Partial participation means some entity instances may not participate in any relationship instance — represented by a single line.</Para>
          <Para>Example: every employee must work in exactly one department (total participation of Employee in Works_In). But not every department must have a manager right now — a newly created department might temporarily have no manager (partial participation of Department in Manages). Total participation enforces a constraint: you cannot have an employee with no department. In SQL, this maps to a NOT NULL foreign key constraint on the employee table's department_id.</Para>
        </QA>

        <QA n={5} q="What is a weak entity and when do you use one?" color="#0078d4" level="Fresher">
          <Para>A weak entity is an entity that cannot be uniquely identified by its own attributes alone — it depends on a strong (owner) entity for its identity. A weak entity has a partial key (discriminator) that, combined with the primary key of its owner entity, forms the complete identifier. In ER diagrams, weak entities use double rectangles and their identifying relationship uses a double diamond.</Para>
          <Para>Classic example: an order item in an e-commerce system. The item number (1, 2, 3) within an order is the partial key, but item number 1 exists in every order — it only becomes unique when combined with the order_id. Order_item is a weak entity owned by Order. In SQL, the primary key of the order_items table is (order_id, item_number) — the combination is unique even though item_number alone is not. The order_id is a mandatory foreign key — an order item cannot exist without its parent order (total participation, cascade delete).</Para>
        </QA>

        <QA n={6} q="Explain cardinality ratios in ER modelling with examples." color="#0078d4" level="Fresher">
          <Para>Cardinality ratios describe how many instances of one entity relate to how many instances of another through a relationship. Four ratios exist. One-to-one (1:1): each entity on both sides participates at most once — a country has one capital city, a capital city belongs to one country. One-to-many (1:N): one entity on the left relates to many on the right, but each right-side entity relates to at most one left-side entity — one department has many employees, but each employee belongs to one department. Many-to-one (N:1): the inverse of 1:N. Many-to-many (M:N): entities on both sides can relate to multiple entities on the other side — students enrol in many courses, and each course has many students enrolled.</Para>
          <Para>In SQL, 1:N is implemented with a foreign key on the "many" side (employees.department_id). M:N requires a junction table (enrollments with student_id and course_id as a composite primary key). 1:1 uses a foreign key with a UNIQUE constraint on either side.</Para>
        </QA>

        <QA n={7} q="What are the rules for converting an ER diagram to relational tables?" color="#0078d4" level="Mid">
          <Para>Seven mapping rules cover all cases. Rule 1: each strong entity type becomes a table with all its simple attributes; choose a primary key from its candidate keys. Rule 2: each weak entity type becomes a table including its partial key and the primary key of its owner entity; the composite (owner_pk + partial_key) is the primary key with a foreign key and CASCADE DELETE to the owner. Rule 3: composite attributes — include only the sub-attributes (not the composite attribute itself) as separate columns. Rule 4: multi-valued attributes — create a separate table with the entity's primary key and the attribute value; the composite is the primary key. Rule 5: 1:1 relationships — add the primary key of one entity as a foreign key in the other's table (choose the side with total participation); alternatively merge both into one table. Rule 6: 1:N relationships — add the primary key of the "one" side as a foreign key in the "many" side table. Rule 7: M:N relationships — create a new junction/bridge table with the primary keys of both entities as a composite primary key plus any relationship attributes.</Para>
          <Para>Derived attributes are not stored — they are computed when needed. The mapping rules always produce a schema in at least First Normal Form.</Para>
        </QA>

        <QA n={8} q="What is an ISA (is-a) hierarchy and how does it map to tables?" color="#0078d4" level="Mid">
          <Para>An ISA hierarchy (also called a generalisation/specialisation hierarchy) represents an inheritance relationship between a superclass entity and one or more subclass entities. Each subclass "is-a" member of the superclass and inherits all superclass attributes, but also has its own additional attributes. Example: Person is the superclass; Student and Professor are subclasses. Every Student is a Person, but Students additionally have student_id and major. Every Professor is a Person but additionally has faculty_id and department.</Para>
          <Para>Three mapping strategies exist. Table per hierarchy (single table): one table with all attributes of all subclasses and a type discriminator column. Simple queries, but many NULL values for sub-class-specific attributes. Table per type (one table per class): superclass table plus one table per subclass containing only the subclass-specific attributes plus the superclass primary key as foreign key. No NULLs, but joins needed to get the full picture. Table per concrete class: each leaf subclass gets a table containing all attributes (superclass + subclass). No joins needed but superclass attributes are duplicated. PostgreSQL supports table inheritance natively with the INHERITS keyword.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 2 — RELATIONAL MODEL & NORMALISATION
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 02 — Relational Model & Normalisation" />
        <SectionTitle>Relational Model and Normalisation</SectionTitle>

        <QA n={9} q="What is the difference between a superkey, candidate key, and primary key?" color="var(--accent)" level="Fresher">
          <Para>A superkey is any set of attributes that uniquely identifies every tuple in a relation — it has no duplicate combinations. A relation can have many superkeys; every superset of a unique-identifying set is also a superkey. A candidate key is a minimal superkey — a superkey from which no attribute can be removed while maintaining uniqueness. If {'{A, B}'} uniquely identifies tuples but neither A nor B alone does, then {'{A, B}'} is a candidate key. A primary key is the candidate key chosen by the database designer to be the principal identifier. There is exactly one primary key per table; it cannot contain NULL values; it is used as the target of foreign key references from other tables.</Para>
          <Para>Example: in an employees table, {'{employee_id}'}, {'{email}'}, and {'{pan_number}'} might all be candidate keys (each uniquely identifies an employee). {'{employee_id, name}'} is a superkey but not a candidate key (employee_id alone is sufficient). The DBA chooses employee_id as the primary key for simplicity and efficiency.</Para>
        </QA>

        <QA n={10} q="Explain the four integrity constraints of the relational model." color="var(--accent)" level="Fresher">
          <Para>Domain constraint: every attribute value must belong to the defined domain of that attribute — salary must be a positive decimal, status must be one of {'{"active", "inactive"}'}, age must be an integer between 0 and 150. Enforced by data types and CHECK constraints. Entity integrity constraint: no attribute of a primary key can be NULL. The primary key's purpose is to uniquely identify every tuple — a NULL value would mean "unknown identity", making identification impossible. Enforced automatically by PRIMARY KEY constraint. Referential integrity constraint: every foreign key value must either match a primary key value in the referenced table or be NULL. An order cannot reference a customer_id that does not exist in the customers table. Enforced by FOREIGN KEY constraints with ON DELETE and ON UPDATE actions. Semantic/business integrity: additional application-specific rules — an employee's start date cannot be before the company's founding date, a manager must be a senior employee. Enforced with CHECK constraints, triggers, or application code.</Para>
        </QA>

        <QA n={11} q="What are the three types of anomalies that normalisation addresses?" color="var(--accent)" level="Fresher">
          <Para>Anomalies arise when a table contains redundant data — the same fact stored in multiple rows. Three types: Insertion anomaly: you cannot insert certain data without also inserting other unrelated data. In an un-normalised student-course table storing (student_id, student_name, course_id, instructor), you cannot add a new course until at least one student enrols — the course data has nowhere to go without a student_id. Update anomaly: changing one fact requires updating multiple rows. If instructor "Prof. Kumar" changes their name, you must update every row where they appear — miss one and the database is inconsistent. Deletion anomaly: deleting one piece of data unintentionally deletes another. If the last student in a course withdraws, deleting that row deletes the course and instructor information entirely.</Para>
          <Para>Normalisation eliminates these by decomposing the table into smaller tables, each storing one fact — student names in a students table, courses in a courses table, instructors in an instructors table, and enrolments in an enrolments table. Updates happen in one place, insertions are independent, and deletions don't cascade to unrelated data.</Para>
        </QA>

        <QA n={12} q="Explain 1NF, 2NF, and 3NF with examples." color="var(--accent)" level="Fresher">
          <Para>First Normal Form (1NF): every attribute must have atomic (indivisible) values, and there must be no repeating groups. A cell cannot contain a list or a set. A column phone_numbers containing "9876543210, 8765432109" violates 1NF. Fix: move multi-valued attributes to a separate table or add a row per phone number. Second Normal Form (2NF): must be in 1NF, and every non-key attribute must be fully functionally dependent on the entire primary key — not just a part of it. Only relevant for composite primary keys. In an enrolments table with PK (student_id, course_id) and attributes (student_name, course_name, grade): student_name depends only on student_id (partial dependency) and course_name depends only on course_id (partial dependency). Fix: move student_name to a students table and course_name to a courses table. Third Normal Form (3NF): must be in 2NF, and no non-key attribute should transitively depend on the primary key through another non-key attribute. In an employees table: employee_id → department_id → department_name. department_name depends on department_id, not directly on employee_id (transitive dependency). Fix: create a departments table with department_id and department_name.</Para>
        </QA>

        <QA n={13} q="What is BCNF and how does it differ from 3NF?" color="var(--accent)" level="Mid">
          <Para>Boyce-Codd Normal Form is a stricter version of 3NF. A relation is in BCNF if and only if for every non-trivial functional dependency X → Y, X is a superkey. In 3NF, a non-key attribute can determine another non-key attribute if the determinant is part of a candidate key. BCNF disallows this entirely — every determinant must be a superkey, full stop.</Para>
          <Para>Classic example where 3NF is satisfied but BCNF is not: TEACHING(student, course, teacher) where each teacher teaches only one course, but a course can be taught by multiple teachers. FDs: {'{student, course} → teacher'} and {'{teacher} → course'}. The relation is in 3NF but not BCNF because teacher → course and teacher is not a superkey. Decompose into TEACHER_COURSE(teacher, course) and STUDENT_TEACHER(student, teacher). The trade-off: BCNF decomposition may lose functional dependency preservation (we can no longer enforce {'{student, course} → teacher'} through a single table constraint). 3NF guarantees both lossless decomposition and dependency preservation; BCNF guarantees lossless decomposition but not always dependency preservation.</Para>
        </QA>

        <QA n={14} q="What is Armstrong's Axioms and how are they used?" color="var(--accent)" level="Mid">
          <Para>Armstrong's Axioms are three inference rules that are sound (they only derive valid FDs) and complete (they can derive all valid FDs) for reasoning about functional dependencies. Reflexivity: if Y is a subset of X, then X → Y. Trivially, {'{A, B}'} → A. Used to derive trivial dependencies. Augmentation: if X → Y, then XZ → YZ for any attribute set Z. If employee_id → name, then {'{employee_id, dept_id}'} → {'{name, dept_id}'}. Adding the same attributes to both sides of an FD preserves it. Transitivity: if X → Y and Y → Z, then X → Z. If employee_id → dept_id and dept_id → dept_name, then employee_id → dept_name. This is the basis for detecting transitive dependencies (3NF violations).</Para>
          <Para>Three derived rules follow: Union (if X→Y and X→Z then X→YZ), Decomposition (if X→YZ then X→Y and X→Z), and Pseudotransitivity (if X→Y and WY→Z then WX→Z). These are used to compute the closure of a set of attributes (X+) — all attributes functionally determined by X — which is the algorithm used to find candidate keys and check whether a set of FDs implies another FD.</Para>
        </QA>

        <QA n={15} q="What is a lossless join decomposition and how do you verify it?" color="var(--accent)" level="Mid">
          <Para>A decomposition of relation R into R1 and R2 is lossless (non-additive) if the natural join of R1 and R2 always reconstructs R exactly — no spurious (extra) tuples are introduced, and no original tuples are lost. A lossy decomposition produces extra rows when rejoined, making the original data unrecoverable.</Para>
          <Para>Heath's Theorem gives the condition: a decomposition of R(A, B, C) into R1(A, B) and R2(A, C) is lossless if and only if either A → B or A → C holds in R — that is, the common attribute set (A) is a superkey in at least one of the resulting relations. Practical test: write a Chase table. Create a tableau with one row per decomposed relation. Mark cells where the attribute is in the relation's schema. Apply FDs as rewriting rules. If all cells in one row become fully determined (no unknowns remain), the decomposition is lossless. For exam purposes, Heath's Theorem covers most cases: if the intersection of R1 and R2 (the attributes they share) is a superkey in either R1 or R2, the decomposition is guaranteed lossless.</Para>
        </QA>

        <QA n={16} q="What is the difference between 4NF and 5NF?" color="var(--accent)" level="Senior">
          <Para>Fourth Normal Form addresses multi-valued dependencies (MVDs). A multi-valued dependency X →→ Y exists when for each value of X, a set of Y values exists independently of the other attributes. In a relation EMPLOYEE(emp_id, skill, hobby), an employee can have multiple skills and multiple hobbies, and skills and hobbies are independent of each other. This creates unnecessary combinations — if Rahul has 3 skills and 2 hobbies, the table needs 6 rows. A relation is in 4NF if for every non-trivial MVD X →→ Y, X is a superkey. Fix: decompose into EMP_SKILLS(emp_id, skill) and EMP_HOBBIES(emp_id, hobby).</Para>
          <Para>Fifth Normal Form (Project-Join Normal Form) addresses join dependencies. A relation has a join dependency when it can be losslessly decomposed into three or more projections, but no pair of those projections alone constitutes a lossless decomposition. This is the rarest normal form and arises in complex three-way relationships. A relation is in 5NF when every join dependency is implied by its candidate keys. 4NF is concerned with two-way independence (MVDs); 5NF is concerned with multi-way independence. In practice, 3NF or BCNF is the target for production schemas; 4NF and 5NF are primarily studied in theory and GATE examinations.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 3 — SQL & QUERY PROCESSING
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 03 — SQL & Query Processing" />
        <SectionTitle>SQL and Query Processing</SectionTitle>

        <QA n={17} q="What is the logical execution order of a SQL SELECT statement?" color="#f97316" level="Fresher">
          <Para>SQL is declarative — you write what you want, not how to get it. But internally, SQL has a defined logical execution order that differs from the writing order. The order is: FROM (identify source tables and build the initial rowset), JOIN (combine tables based on join conditions), WHERE (filter rows based on conditions — runs before grouping, so aggregate functions cannot appear here), GROUP BY (group remaining rows by specified columns), HAVING (filter groups based on aggregate conditions — runs after grouping, so aggregates are valid here), SELECT (compute the output columns, apply expressions, assign aliases — aliases defined here are NOT available in WHERE or GROUP BY), DISTINCT (remove duplicate rows from the result), ORDER BY (sort the result — aliases defined in SELECT ARE available here because it runs after SELECT), LIMIT/OFFSET (return only a subset of rows).</Para>
          <Para>This explains several common confusions. Why can't you use a column alias in WHERE? Because WHERE runs before SELECT. Why can you use a column alias in ORDER BY? Because ORDER BY runs after SELECT. Why can't you use aggregate functions in WHERE? Because WHERE runs before GROUP BY — the groups don't exist yet. Use HAVING instead.</Para>
        </QA>

        <QA n={18} q="What is the difference between WHERE and HAVING?" color="#f97316" level="Fresher">
          <Para>WHERE filters individual rows before grouping occurs. It cannot reference aggregate functions because the groups do not yet exist when WHERE is evaluated. HAVING filters groups after GROUP BY has been applied. It can reference aggregate functions because the groups exist at that point.</Para>
          <Para>Example: find departments with more than 5 employees who each earn over 50,000. WHERE salary &gt; 50000 first filters individual employee rows to those earning over 50K. GROUP BY department_id then groups the filtered rows. HAVING COUNT(*) &gt; 5 then filters to groups (departments) that have more than 5 such employees. A common mistake is using WHERE COUNT(*) &gt; 5 — this fails because COUNT(*) is an aggregate and WHERE cannot evaluate it. Another common mistake is using HAVING salary &gt; 50000 — HAVING processes groups, not individual rows, so this would apply the salary filter incorrectly to aggregate values.</Para>
        </QA>

        <QA n={19} q="Explain the different types of JOINs in SQL." color="#f97316" level="Fresher">
          <Para>INNER JOIN returns only rows where the join condition is satisfied in both tables — non-matching rows from either table are excluded. The most common join type. LEFT OUTER JOIN returns all rows from the left table; for rows with no match in the right table, right-side columns are NULL. Used to find records in the left table regardless of whether a matching right-side record exists. RIGHT OUTER JOIN is the mirror: all rows from the right table, NULLs for unmatched left-side columns. FULL OUTER JOIN returns all rows from both tables; unmatched rows on either side get NULLs for the other side's columns. CROSS JOIN returns the Cartesian product — every combination of every row from both tables. N×M rows. No join condition. Used rarely (e.g., generating all possible combinations). SELF JOIN is a regular join of a table with itself using table aliases — used for hierarchical data (find manager-employee pairs where both are in the same table).</Para>
          <CodeBox>{`-- Find customers with no orders (LEFT JOIN + NULL check):
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`}</CodeBox>
        </QA>

        <QA n={20} q="What is the difference between UNION and UNION ALL?" color="#f97316" level="Fresher">
          <Para>UNION combines the results of two SELECT statements and removes duplicate rows from the combined result. It implicitly applies DISTINCT to the entire result set. This requires sorting or hashing to identify and eliminate duplicates, which adds computational overhead — O(n log n) or O(n). UNION ALL combines the results without removing duplicates. All rows from both queries appear in the result, including duplicates. It is always faster than UNION because no deduplication step is needed.</Para>
          <Para>Use UNION ALL when: you know there are no duplicates between the two result sets (the sets are disjoint), or you want to keep duplicates intentionally. Use UNION when: the result sets may overlap and you want each distinct combination to appear once. Common mistake: using UNION when UNION ALL would suffice, paying an unnecessary deduplication cost. Another common mistake: both SELECT statements must have the same number of columns with compatible data types (union compatibility) — violating this produces an error.</Para>
        </QA>

        <QA n={21} q="What are window functions and when do you use them instead of GROUP BY?" color="#f97316" level="Mid">
          <Para>Window functions compute a value across a set of rows related to the current row — without collapsing those rows into a single output row. GROUP BY collapses multiple rows into one per group; window functions preserve all rows while adding a computed column based on a window of rows.</Para>
          <Para>Use window functions when you need both individual row data and an aggregate calculated across a group simultaneously. Example: show each employee's salary alongside their department's average salary. GROUP BY forces you to either lose individual rows or use a self-join. A window function with PARTITION BY department_id computes the average per department but returns one row per employee. Key window functions: ROW_NUMBER() (unique sequential number per partition), RANK() (rank with gaps for ties), DENSE_RANK() (rank without gaps), LAG(col, n) (value from n rows before), LEAD(col, n) (value from n rows after), SUM/AVG OVER (running or window aggregates), FIRST_VALUE/LAST_VALUE (first or last value in the window). The OVER clause defines the window: PARTITION BY sets the grouping, ORDER BY sets the row order within the window, and the optional ROWS/RANGE frame clause defines how many rows to include.</Para>
        </QA>

        <QA n={22} q="What is a CTE and how does it differ from a subquery?" color="#f97316" level="Mid">
          <Para>A Common Table Expression (WITH clause) is a named temporary result set defined at the beginning of a query that can be referenced one or more times within the main query. It improves readability by naming intermediate results. A subquery is an anonymous nested SELECT inside another query.</Para>
          <Para>Practical differences: CTEs can be referenced multiple times in the same query — a subquery would need to be repeated or wrapped in a derived table. CTEs make complex queries readable by giving meaningful names to intermediate steps. Recursive CTEs can reference themselves, enabling hierarchical queries (org charts, graph traversal) that are impossible with subqueries. Performance: in PostgreSQL, a CTE is an optimisation fence in older versions — it was always materialised, preventing predicate pushdown. PostgreSQL 12+ changed the default: CTEs are now inlined (same as subquery) unless you add MATERIALIZED or they are recursive/have side effects. When to choose CTE: complex multi-step queries, recursive queries, when the same subresult is needed more than once. When to choose subquery: simple one-off filter conditions, correlated subqueries that reference outer query columns.</Para>
        </QA>

        <QA n={23} q="How does the query optimiser decide between a sequential scan and an index scan?" color="#f97316" level="Mid">
          <Para>The query optimiser uses a cost model to estimate the total work (I/O + CPU) of each possible plan and chooses the minimum cost plan. For a sequential scan, the cost is proportional to the number of pages in the table (all pages read once, sequentially). For an index scan, the cost is the B+ tree traversal (log of index size) plus random heap fetches for each matching row.</Para>
          <Para>The optimiser chooses a sequential scan over an index scan when the selectivity is low — when many rows match the filter. On spinning disk, random I/O is ~200× slower than sequential I/O; at some selectivity threshold (~15-20%), reading all pages sequentially is faster than jumping to random pages for each match. The exact threshold depends on random_page_cost (default 4.0 for spinning disk, 1.1 for SSD). Setting random_page_cost = 1.1 for SSD databases tells the optimiser that random I/O is almost as fast as sequential, causing it to prefer index scans at much lower selectivity thresholds. Stale statistics (outdated row counts or column value distributions from not running ANALYZE) cause the optimiser to misjudge selectivity and choose the wrong plan.</Para>
        </QA>

        <QA n={24} q="What is predicate pushdown and why does it matter?" color="#f97316" level="Mid">
          <Para>Predicate pushdown is a query optimisation that moves filter conditions (WHERE clause predicates) as close to the data source as possible in the execution plan — ideally before any join operations. Algebraically: σ_condition(R ⋈ S) is rewritten to σ_condition(R) ⋈ S when the condition only involves R's attributes.</Para>
          <Para>It matters because intermediate result sizes have a multiplicative effect on join cost. Joining an unfiltered 10M-row orders table with an unfiltered 5M-row customers table produces up to 50 trillion combinations before filtering. Pushing WHERE city='Bengaluru' before the join filters customers to 500K rows; pushing WHERE status='delivered' filters orders to 2M rows; the join now processes at most 1 trillion combinations — a 50× reduction. In a real plan with a hash join, the hash table is built from 500K customers not 5M, fitting in work_mem and avoiding disk spill. Predicate pushdown is the most impactful single optimisation in the query processing pipeline and is applied automatically by every major query optimiser.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 4 — INDEXING & STORAGE
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 04 — Indexing & Storage" />
        <SectionTitle>Indexing and Storage</SectionTitle>

        <QA n={25} q="What is a B+ tree index and why do databases use it?" color="#8b5cf6" level="Fresher">
          <Para>A B+ tree is a self-balancing multi-way search tree where all data pointers reside in the leaf nodes (internal nodes contain only keys for navigation), and leaf nodes are linked in a doubly-linked list sorted by key. This structure gives O(log n) lookup, insertion, and deletion with worst-case guarantees, and O(log n + k) for range scans where k is the number of matching rows.</Para>
          <Para>Databases use B+ trees over alternatives because: the leaf linked list makes range scans efficient — find the first matching leaf via tree traversal, then follow the linked list sequentially through all matching entries without returning to internal nodes. Higher fan-out than binary trees (each node holds hundreds of keys, not 2) means fewer levels — a B+ tree on a 50-million-row table is typically 3-4 levels deep, requiring only 3-4 disk reads to reach any leaf. Internal nodes store only keys (no data pointers), maximising fan-out per page. Compared to hash indexes: B+ trees support range queries, ORDER BY without sorting, and prefix queries. Hash indexes support only equality lookups but are theoretically O(1).</Para>
        </QA>

        <QA n={26} q="What is the difference between a clustered and a non-clustered index?" color="#8b5cf6" level="Fresher">
          <Para>A clustered index determines the physical storage order of rows in the table — the data rows are sorted and stored in the same order as the index key. There can be only one clustered index per table (there is only one physical ordering possible). In MySQL InnoDB, the primary key is always the clustered index; the data rows are stored at the B+ tree leaf nodes. In PostgreSQL, tables are heap-organised by default and CLUSTER reorganises the physical file order to match an index, but this is not maintained on subsequent writes.</Para>
          <Para>A non-clustered index is a separate structure from the actual data. Its leaf nodes contain the index key value and a pointer (row ID — page number + slot number) to the actual data row in the heap file. A table can have many non-clustered indexes. Querying via a non-clustered index requires two lookups: find the row ID in the index, then fetch the actual row from the heap (the "heap fetch" or "bookmark lookup"). Clustered indexes are faster for range scans because matching rows are physically adjacent on disk — sequential reads. Non-clustered indexes on selective equality queries are also fast but require the extra heap fetch for each match.</Para>
        </QA>

        <QA n={27} q="What is a covering index?" color="#8b5cf6" level="Mid">
          <Para>A covering index is an index that contains all the columns needed to satisfy a query — the query can be answered entirely from the index without ever touching the actual table (no heap fetch needed). When EXPLAIN shows "Index Only Scan" in PostgreSQL or "Covering Index" in other databases, a covering index is being used.</Para>
          <Para>Example: a query SELECT name, city FROM customers WHERE customer_id = 42 can be served by an index on (customer_id) INCLUDE (name, city) without reading the table. The INCLUDE clause (PostgreSQL 11+) adds non-key columns to the leaf nodes of the index without making them part of the sort key — they are carried along purely to avoid heap fetches. Creating a covering index for a hot query path can dramatically reduce read I/O. Trade-off: covering indexes are larger (they store extra columns) and slower to maintain on writes. Use them surgically for the most critical read-heavy queries, not as a general strategy.</Para>
        </QA>

        <QA n={28} q="What is the slotted page format and why does it matter?" color="#8b5cf6" level="Mid">
          <Para>The slotted page format is the standard layout for database pages storing variable-length records. Each 8KB page (in PostgreSQL) has a fixed header at the start, a slot array that grows forward from the end of the header, free space in the middle, and the actual record data growing backward from the end of the page. Each slot entry is a (offset, length) pair pointing to where a record starts in the page.</Para>
          <Para>It matters because row IDs (RIDs) — the references stored in indexes — must remain stable even when rows move within a page. The RID is (page_id, slot_number). Even if a row is moved during compaction (VACUUM in PostgreSQL, which reclaims space from deleted rows and reorganises the page), only the slot entry's offset is updated — the slot number stays the same, so the RID remains valid. Indexes do not need to be updated when rows move within a page. This design also handles variable-length records elegantly — records of any size can be packed from the end of the page while the slot array at the front provides O(1) access by slot number.</Para>
        </QA>

        <QA n={29} q="What is a partial index and when should you create one?" color="#8b5cf6" level="Mid">
          <Para>A partial index is an index built on only a subset of the table's rows — those satisfying a specified condition. The index is smaller (faster to build, smaller storage footprint, fits more easily in buffer pool cache) and more selective (better query plans) because it covers only the interesting rows.</Para>
          <Para>Classic use cases: an index on pending orders only — CREATE INDEX idx_pending ON orders(customer_id) WHERE status = 'pending'. If 95% of orders are delivered and only 5% are pending, a full index on customer_id covers 100% of rows, but queries filtering for pending orders benefit only from the 5% that are pending. A partial index on the pending 5% is 20× smaller and 20× faster to scan. Another use case: indexing non-null values — CREATE INDEX idx_email ON users(email) WHERE email IS NOT NULL. Excludes the NULL rows from the index, making it smaller. Third use case: unique constraint on a subset — CREATE UNIQUE INDEX idx_active_username ON users(username) WHERE is_active = true — allows multiple inactive users with the same username but enforces uniqueness among active users.</Para>
        </QA>

        <QA n={30} q="What is the buffer pool and how does LRU replacement work?" color="#8b5cf6" level="Mid">
          <Para>The buffer pool is the DBMS-managed area of RAM that caches database pages (8KB in PostgreSQL). It is organised as an array of fixed-size frames. A page table maps page IDs to frame numbers. Each frame has a dirty bit (page has been modified since loading) and a pin count (number of active threads using this page — cannot be evicted while pinned greater than 0). When a query needs a page: check the page table (buffer pool hit — return pointer to frame, increment pin count) or miss (find a frame to evict, read page from disk, update page table, pin).</Para>
          <Para>LRU (Least Recently Used) replacement policy evicts the frame that was accessed least recently. Implemented as a doubly-linked list ordered by access time — on every access, move the frame to the head; evict from the tail. O(1) with a hashmap. Problem: sequential scan flooding — a full table scan reads every page once, but with basic LRU these scan pages evict the frequently-used "hot" pages (index roots, popular rows). PostgreSQL uses a Clock Sweep algorithm (an LRU approximation with reference bits) plus a small dedicated ring buffer for sequential scans — scan pages cycle through the ring without touching the main buffer pool, preserving the working set for concurrent OLTP queries.</Para>
        </QA>

        <QA n={31} q="What is the difference between a row store and a column store?" color="#8b5cf6" level="Mid">
          <Para>A row store (NSM — N-ary Storage Model) stores all columns of a row together on the same page. Reading one row requires one page fetch — all columns are there. Optimal for OLTP workloads: point lookups, inserts, updates, deletes — operations that touch complete rows. PostgreSQL, MySQL InnoDB, and most relational databases use row storage by default.</Para>
          <Para>A column store (DSM — Decomposition Storage Model) stores each column's values together in a separate file, with all rows for that column stored contiguously. Reading SELECT AVG(salary) FROM employees reads only the salary column file — it never touches the name, email, or address columns. Optimal for OLAP workloads: aggregations, groupings, and analytics that read a few columns from millions of rows. For a table with 20 columns where a query uses only 3, column storage reads 85% less data. Column stores also achieve 5-10× better compression because adjacent same-type values compress efficiently with run-length encoding and delta encoding. Used by Snowflake, BigQuery, Redshift, ClickHouse, and the Parquet file format.</Para>
        </QA>

        <QA n={32} q="What is extendible hashing and how does it avoid full rehashing?" color="#8b5cf6" level="Senior">
          <Para>Extendible hashing is a dynamic hashing scheme that splits only the overflowing bucket rather than rebuilding the entire index. It uses a two-level structure: an in-memory directory of 2^d pointers (d = global depth) and actual bucket pages on disk. Each bucket has a local depth d_i indicating how many bits of the hash value distinguish the keys in that bucket.</Para>
          <Para>When a bucket overflows: if the bucket's local depth equals global depth, the directory must double first (global depth increments, directory size doubles — but no new bucket pages are created, existing directory entries simply point to the same buckets as before). Then the overflowing bucket splits — a new bucket is created, keys are redistributed by examining bit d_i+1 of their hash values, and the two relevant directory entries are updated to point to the two new buckets. If local depth less than global depth, the directory does not double — only the bucket splits and some directory entries are updated. The key insight: multiple directory entries can point to the same bucket, so doubling the directory does not double the number of actual pages. Full rehashing (rebuilding the entire index with more buckets) is avoided — only one bucket's data is redistributed at a time. Average cost per split: O(bucket capacity) to redistribute keys plus O(directory size) if a doubling occurs.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 5 — TRANSACTIONS & CONCURRENCY
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 05 — Transactions & Concurrency" />
        <SectionTitle>Transactions and Concurrency Control</SectionTitle>

        <QA n={33} q="Explain ACID properties with a bank transfer example." color="#facc15" level="Fresher">
          <Para>A bank transfer of ₹500 from Account A to Account B illustrates all four properties. Atomicity: the transfer is all-or-nothing. Either both the debit from A and the credit to B complete, or neither does. If the system crashes after debiting A but before crediting B, the partial debit is rolled back. There is no state where A is debited but B is not credited. Consistency: the database moves from one valid state to another valid state. Before: A=5000, B=3000, total=8000. After: A=4500, B=3500, total=8000. Constraints are satisfied — balances are non-negative (assuming 500 ≤ A's balance). No constraint is violated during or after the transaction. Isolation: if two transfers happen simultaneously, they do not interfere with each other. T1 transferring from A to B and T2 transferring from A to C behave as if they ran serially — T2 either sees A's value before T1's debit or after, but never a partially-applied T1. Durability: once the bank confirms the transfer succeeded, the new balances survive system crashes. Even if the server crashes one millisecond after the commit confirmation, the transaction is permanently recorded in the WAL and will be recovered on restart.</Para>
        </QA>

        <QA n={34} q="What are the four concurrency anomalies and which isolation levels prevent each?" color="#facc15" level="Mid">
          <Para>Dirty Read: Transaction T2 reads data written by T1 which has not yet committed. If T1 rolls back, T2 has read data that never officially existed. Prevented by: READ COMMITTED and above. Non-repeatable Read: T1 reads a row, T2 updates and commits that row, T1 reads the same row again and gets a different value. The same SELECT returns different results within one transaction. Prevented by: REPEATABLE READ and above. Phantom Read: T1 reads a set of rows matching a condition, T2 inserts new rows satisfying that condition and commits, T1 re-reads the same condition and sees new ("phantom") rows. The set of rows changes within one transaction. Prevented by: SERIALIZABLE only (in most implementations). Lost Update: T1 and T2 both read a value, both compute a new value based on the read, both write their new values — T1's write overwrites T2's write or vice versa. The update from one transaction is silently lost. Prevented by: REPEATABLE READ and above with proper locking.</Para>
          <Para>The four isolation levels in SQL standard: READ UNCOMMITTED (allows dirty reads — almost never used), READ COMMITTED (prevents dirty reads — PostgreSQL default), REPEATABLE READ (prevents dirty reads and non-repeatable reads), SERIALIZABLE (prevents all anomalies — transactions appear to execute serially).</Para>
        </QA>

        <QA n={35} q="What is two-phase locking (2PL) and what does it guarantee?" color="#facc15" level="Mid">
          <Para>Two-Phase Locking is a concurrency control protocol where every transaction must acquire all locks before releasing any lock. This creates two distinct phases: the growing phase (acquiring locks, no releases allowed) and the shrinking phase (releasing locks, no new acquisitions allowed). The protocol guarantees serializability — the concurrent execution of transactions under 2PL produces results equivalent to some serial execution of those transactions.</Para>
          <Para>Four variants: Basic 2PL (as described — can have cascading aborts if a transaction releases a lock and another reads the unlocked data before the first commits and then aborts). Strict 2PL (hold all exclusive write locks until commit — prevents cascading aborts — most common in practice). Rigorous 2PL (hold all locks, both shared and exclusive, until commit — simplifies recovery). Conservative 2PL (acquire all needed locks before starting — prevents deadlocks but requires predeclaring all data accesses). The problem with basic 2PL: it cannot prevent deadlocks. Deadlock detection (wait-for graph cycle detection) or prevention (wound-wait or wait-die timestamp-based protocols) must be added separately.</Para>
        </QA>

        <QA n={36} q="What is a deadlock and how do databases handle it?" color="#facc15" level="Mid">
          <Para>A deadlock is a circular waiting dependency where transaction T1 holds a lock that T2 needs, and T2 holds a lock that T1 needs. Neither can proceed; both wait indefinitely. Example: T1 locks row A then tries to lock row B. T2 locks row B then tries to lock row A. T1 waits for T2 to release B; T2 waits for T1 to release A. Circular wait.</Para>
          <Para>Detection: maintain a wait-for graph where an edge T1 → T2 means T1 is waiting for a lock held by T2. A cycle in this graph indicates a deadlock. PostgreSQL runs deadlock detection periodically (deadlock_timeout — default 1 second). When a cycle is detected, one transaction is selected as the victim and aborted, releasing its locks and allowing the others to proceed. The victim selection is based on cost (abort the cheapest transaction — fewest locks held, least work done). Prevention alternatives: Wait-Die (if T1 has a lower timestamp than T2, T1 waits; otherwise T1 dies — older transactions wait, younger ones are aborted). Wound-Wait (if T1 is older than T2, T2 is preempted/wounded; otherwise T1 waits — older transactions wound younger ones). Both are deadlock-free but waste work by aborting transactions that might never have deadlocked.</Para>
        </QA>

        <QA n={37} q="What is MVCC and how does PostgreSQL implement it?" color="#facc15" level="Mid">
          <Para>Multi-Version Concurrency Control is a concurrency control technique where the database maintains multiple versions of each row simultaneously. Readers never block writers and writers never block readers — only writer-writer conflicts require locks. This dramatically increases throughput in read-heavy workloads.</Para>
          <Para>PostgreSQL's MVCC implementation: every row version (called a "tuple") has two hidden system columns — xmin (the transaction ID that created this version) and xmax (the transaction ID that deleted or updated this version, or 0 if still current). When a transaction reads a row, it applies a visibility check: a row version is visible to transaction T if xmin committed before T started AND (xmax is 0 OR xmax started after T started OR xmax aborted). UPDATE in PostgreSQL does not modify in place — it marks the old version with xmax = current_txid and inserts a new version with xmin = current_txid. The old version remains for concurrent readers that started before the update. VACUUM periodically removes row versions that are no longer visible to any active transaction (dead tuples), reclaiming storage. The transaction snapshot (recorded at transaction start for REPEATABLE READ / at statement start for READ COMMITTED) determines which row versions are visible throughout the transaction.</Para>
        </QA>

        <QA n={38} q="What is the difference between optimistic and pessimistic concurrency control?" color="#facc15" level="Mid">
          <Para>Pessimistic concurrency control assumes conflicts are likely and prevents them by acquiring locks before accessing data. A transaction acquires a shared lock for reads and an exclusive lock for writes. Other transactions that need conflicting locks must wait. This is safe and simple but reduces concurrency — lock contention is the primary bottleneck in high-throughput OLTP systems. Standard 2PL is a pessimistic protocol.</Para>
          <Para>Optimistic concurrency control (OCC) assumes conflicts are rare. Transactions proceed without acquiring locks: read phase (read data into a private workspace, perform all computations), validate phase (check whether any other transaction has modified the data this transaction read — if conflict detected, abort and retry), write phase (if validation succeeds, apply the transaction's writes to the database). OCC has zero lock contention — all transactions run simultaneously. But it can waste work: a long transaction that fails validation after significant computation must retry from scratch. OCC is best when conflicts are genuinely rare (read-heavy workloads, distributed systems with partition-key-based access). Pessimistic is better when conflicts are frequent (high contention on popular rows) because OCC retry storms under contention are worse than lock waiting.</Para>
        </QA>

        <QA n={39} q="What is a phantom read and why does it require predicate locking to prevent?" color="#facc15" level="Senior">
          <Para>A phantom read occurs when a transaction executes a range query, another transaction inserts a row satisfying that range condition and commits, and the first transaction re-executes the same range query within the same transaction — seeing a new "phantom" row that did not exist in the first execution. This is different from a non-repeatable read (which is about an existing row changing value); a phantom read is about new rows appearing in a range.</Para>
          <Para>Standard row-level locking cannot prevent phantom reads because you cannot lock a row that does not yet exist. The phantom row is inserted after the first read — there is no row to lock. Preventing phantoms requires predicate locking (also called range locking): lock the predicate "all rows where city = Bengaluru" rather than individual rows. Any insert of a row satisfying this predicate conflicts with the predicate lock and must wait. True predicate locking is expensive (must check all active predicates on every insert). PostgreSQL's SERIALIZABLE isolation level uses Serializable Snapshot Isolation (SSI), which tracks read-write dependencies between transactions using predicate locks and detects potentially serialization-anomalous patterns, aborting one transaction when a cycle of rw-dependencies is detected.</Para>
        </QA>

        <QA n={40} q="What is a schedule and what makes it conflict-serialisable?" color="#facc15" level="Senior">
          <Para>A schedule is an interleaving of the operations of multiple concurrent transactions. A serial schedule executes transactions one after another with no interleaving — always correct but limits concurrency. A serialisable schedule produces the same result as some serial schedule — the gold standard for correctness. Conflict serialisability is the most practical sufficient condition for serialisability.</Para>
          <Para>Two operations conflict if they are from different transactions, operate on the same data item, and at least one is a write. Conflicting operation pairs: Read-Write (one reads, other writes the same item), Write-Read (one writes, other reads), Write-Write (both write). A schedule is conflict-serialisable if and only if its precedence graph (conflict graph) is acyclic. The precedence graph has one node per transaction and a directed edge Ti → Tj whenever Ti has an operation that conflicts with and precedes Tj's operation. If this graph has a cycle, no serial ordering can produce the same result — the schedule is not conflict-serialisable. A topological sort of an acyclic precedence graph gives the equivalent serial order. 2PL guarantees conflict-serialisable schedules (acyclic precedence graph) for all non-aborted transactions.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 6 — RECOVERY & DISTRIBUTED
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 06 — Recovery & Distributed" />
        <SectionTitle>Recovery and Distributed Databases</SectionTitle>

        <QA n={41} q="What is the WAL rule and why does it enable STEAL/NO-FORCE?" color="#e879f9" level="Mid">
          <Para>The Write-Ahead Logging rule has two parts: (1) before a dirty page is written to disk, its log record must already be on disk (enables UNDO — if the transaction aborts after the page is stolen to disk, the log has the before-image to restore it). (2) Before a transaction commits, all its log records including the COMMIT record must be on disk (enables REDO — if the system crashes after commit but before the data pages are flushed, the log has the after-images to redo all changes).</Para>
          <Para>STEAL means dirty pages from uncommitted transactions can be evicted to disk — needed to keep the buffer pool from filling up during long transactions. Without WAL, stealing is dangerous: if the transaction aborts after a page is evicted, uncommitted data is on disk with no way to undo it. WAL's first rule makes STEAL safe by ensuring the log record exists before any eviction. NO-FORCE means data pages do not need to be flushed at commit time — commits only require flushing the small, sequential log record, not the large random data pages. This is the performance win: a commit costs one sequential log write, not potentially hundreds of random page writes. Together, STEAL/NO-FORCE with WAL gives maximum performance (no forced flushes, no pinned pages) with full recoverability (ARIES handles both UNDO and REDO on restart).</Para>
        </QA>

        <QA n={42} q="Describe the three phases of ARIES recovery." color="#e879f9" level="Senior">
          <Para>ARIES (Algorithm for Recovery and Isolation Exploiting Semantics) is the recovery algorithm used by IBM DB2, SQL Server, and variants in PostgreSQL. It has three sequential phases executed after a system crash. Analysis phase: scan the WAL forward from the most recent checkpoint. Reconstruct the Active Transaction Table (all transactions active at crash time and their lastLSN) and the Dirty Page Table (all pages that were dirty and their recLSN — the earliest LSN needed to bring each page current). Compute redo_lsn = minimum recLSN across all DPT entries — this is where REDO must start.</Para>
          <Para>REDO phase: scan the log forward from redo_lsn. For each UPDATE record, if the page is in the DPT with recLSN ≤ record's LSN, and the page's pageLSN on disk is less than the record's LSN: apply the after-image. Otherwise skip (change is already on disk). This "repeats history" — restores the exact pre-crash state, including all in-progress transactions. UNDO phase: for each transaction in the ATT (the "losers" — no commit record), follow their PrevLSN chain backward and apply before-images (UNDO). For each undo, write a CLR (Compensation Log Record) to the log with an undoNextLSN pointing to the next action to undo. CLRs make recovery restartable — if the system crashes during UNDO, a new recovery run will replay CLRs in the new REDO phase and resume UNDO from undoNextLSN, never undoing already-undone changes.</Para>
        </QA>

        <QA n={43} q="What is the CAP theorem and what does it mean in practice?" color="#e879f9" level="Mid">
          <Para>The CAP theorem (Gilbert and Lynch, 2002) proves that a distributed data system can guarantee at most two of: Consistency (every read returns the most recent write or an error — linearizability), Availability (every request to a non-failing node receives a non-error response), and Partition Tolerance (the system operates even when network messages between nodes are lost). Since network partitions inevitably occur in any real distributed system, the practical choice is: CP (sacrifice availability during partitions — return errors rather than stale data, used by Zookeeper, etcd, HBase) or AP (sacrifice consistency during partitions — return potentially stale data but always respond, used by Cassandra, DynamoDB, CouchDB).</Para>
          <Para>Important nuances: CAP only applies during a network partition. When the network is healthy, a well-designed system can provide both consistency and availability. The theorem says nothing about which to sacrifice during normal operation. PACELC extends CAP: even without a partition, there is a trade-off between latency (respond from local replica immediately) and consistency (confirm latest value with a quorum — extra network round-trips). The CP/AP choice should be driven by which is worse for your domain: wrong data (choose CP, like for distributed locking or configuration) or no response (choose AP, like for shopping carts or social feeds).</Para>
        </QA>

        <QA n={44} q="What is Two-Phase Commit and what is its main weakness?" color="#e879f9" level="Mid">
          <Para>Two-Phase Commit (2PC) is the standard protocol for achieving atomic commits across multiple nodes. Prepare phase: the coordinator sends PREPARE to all participant nodes. Each participant checks whether it can commit (all constraints satisfied, all necessary locks held), durably writes its prepared state to WAL, and responds VOTE-COMMIT or VOTE-ABORT. Commit phase: if all votes are COMMIT, the coordinator durably records its COMMIT decision, then sends COMMIT to all participants. If any vote is ABORT, the coordinator sends ABORT. Each participant applies the decision and releases its locks.</Para>
          <Para>The main weakness is blocking: once a participant has sent VOTE-COMMIT, it has promised to commit if instructed. It must hold all its locks indefinitely until it hears the coordinator's decision. If the coordinator crashes after receiving all VOTE-COMMITs but before sending COMMITs, all participants are stuck — they cannot commit (they don't know if others voted abort) and cannot abort (they promised to commit if told). They hold their locks, blocking other transactions, until the coordinator recovers. This can freeze parts of the database for the duration of coordinator downtime. Modern distributed databases mitigate this with Raft/Paxos-based coordination (which tolerates coordinator failure without blocking) or the Saga pattern (which avoids distributed locks entirely by using compensating transactions).</Para>
        </QA>

        <QA n={45} q="What is the difference between synchronous and asynchronous replication?" color="#e879f9" level="Mid">
          <Para>In synchronous replication, the primary waits for at least one replica (or a quorum of replicas) to confirm receipt of the write before acknowledging the commit to the client. This guarantees zero data loss on primary failure — the promoted replica has all committed data. The cost: every write's latency includes at least one network round-trip to the replica (typically adds 1-5ms per commit in a well-connected data centre). If the synchronous replica is slow or unreachable, writes to the primary stall.</Para>
          <Para>In asynchronous replication, the primary acknowledges the commit immediately after writing to its own WAL, before any replica confirms receipt. Commits are fast (no extra network round-trip). The risk: if the primary crashes before the replica has applied the last few transactions, those transactions are permanently lost on failover (the RPO — Recovery Point Objective — is non-zero). The replica may be seconds or even minutes behind the primary under heavy load. In PostgreSQL, synchronous_standby_names configures synchronous replication. The common production compromise: synchronous replication to one standby in the same availability zone (zero data loss, low added latency), asynchronous replication to a standby in a different region (geographic DR, accepts potential data loss on regional failure).</Para>
        </QA>

        <QA n={46} q="What is consistent hashing and why is it used in distributed databases?" color="#e879f9" level="Senior">
          <Para>Consistent hashing is a sharding technique that minimises data redistribution when nodes are added or removed from a cluster. In simple modular hashing (hash(key) % N), changing N (adding or removing a node) requires rehashing and redistributing almost all keys. In consistent hashing, keys and nodes are both mapped to positions on a virtual ring of hash values (0 to 2^32). Each key is stored on the first node clockwise from hash(key). Adding a node: only the keys between the new node and its predecessor on the ring need to move (average 1/N of total keys). Removing a node: only that node's keys move to its successor (1/N keys). This compares to simple modular hashing where nearly all keys move when N changes.</Para>
          <Para>Used by Cassandra (each node owns a range of the token ring, virtual nodes spread each physical machine across multiple ring positions for better balance), Amazon's Dynamo, and the Chord P2P protocol. Virtual nodes (vnodes) improve balance: instead of one ring position per physical node, each node gets many (often 256) positions. This distributes each node's load more evenly and makes rebalancing smoother when nodes are added or removed. Consistent hashing with vnodes is the standard approach for building scalable, self-managing distributed databases.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 7 — NOSQL & DATA MODELLING
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 07 — NoSQL & Data Modelling" />
        <SectionTitle>NoSQL and Data Modelling</SectionTitle>

        <QA n={47} q="When would you choose MongoDB over PostgreSQL?" color="#0078d4" level="Mid">
          <Para>Choose MongoDB over PostgreSQL when your data naturally forms hierarchical documents — an order containing embedded items, a blog post containing embedded comments, a user profile with embedded addresses and preferences. In PostgreSQL, each embedded array becomes a separate join table; a query to fetch a complete order requires joining 3-4 tables. In MongoDB, the entire order is one document — one read, no joins. The impedance mismatch is eliminated.</Para>
          <Para>Also choose MongoDB when the schema evolves rapidly — adding a new field to some documents in MongoDB requires no migration. In PostgreSQL, ALTER TABLE on a billion-row table can take hours. MongoDB's flexible schema lets you deploy schema changes without touching existing documents. When to keep PostgreSQL: when you need multi-document ACID transactions as a core requirement (MongoDB added them in 4.0 but they are expensive), complex joins across entity types, referential integrity enforcement, or ad-hoc analytical queries. Most production systems that start with MongoDB for flexibility find that strong consistency and join requirements eventually push critical data back to PostgreSQL. A pragmatic middle ground: PostgreSQL for transactional data (orders, payments, users) + MongoDB for catalog and content data (product descriptions, blog posts, CMS content).</Para>
        </QA>

        <QA n={48} q="What is the Cassandra data model and what is its most important design constraint?" color="#0078d4" level="Mid">
          <Para>Cassandra stores data in tables with a partition key (determines which node stores the row via consistent hashing) and optional clustering keys (sort rows within a partition on disk). All rows with the same partition key are stored together on the same node — efficiently retrieved as a group. Clustering keys determine the physical sort order within a partition, making range queries on clustering keys fast (no sorting needed — data is already sorted on disk).</Para>
          <Para>The most important design constraint: you must design your table schema around your query patterns, not around your entity model. In SQL you design normalised entities and write any query. In Cassandra, you decide your queries first and build one table per query. If you need to query orders by customer AND by restaurant, you create two tables — orders_by_customer and orders_by_restaurant — storing the same data twice with different partition keys. Cassandra does not support joins, ad-hoc queries, or filtering on non-partition-key columns (without ALLOW FILTERING, which forces a full cluster scan). Every query must include the partition key as an equality filter. This query-first design discipline is the fundamental shift from relational thinking that Cassandra requires.</Para>
        </QA>

        <QA n={49} q="Explain the Redis sorted set and give a real-world use case." color="#0078d4" level="Mid">
          <Para>A Redis sorted set (ZSET) is a collection of unique string members, each associated with a float score. Members are stored in order by score (ascending). All operations that access members by rank or score range are O(log N). Key commands: ZADD (add member with score), ZRANGE/ZREVRANGE (members by rank range), ZRANGEBYSCORE (members within score range), ZRANK/ZREVRANK (rank of a specific member), ZINCRBY (atomically increment a member's score), ZCARD (count members), ZRANGEBYSCORE with LIMIT (pagination within score range).</Para>
          <Para>Real-world use case: real-time game leaderboard. On every score event: ZINCRBY leaderboard:game:42 150 "player:rahul" — atomically adds 150 to Rahul's score. To show top 10: ZREVRANGE leaderboard:game:42 0 9 WITHSCORES — returns top 10 players with scores in O(log N + 10). To show a specific player's rank: ZREVRANK leaderboard:game:42 "player:rahul" — O(log N). Redis handles millions of score updates per second and returns leaderboard results in microseconds. The entire leaderboard for 1 million players fits in under 100MB of RAM. This is a use case where a relational database (requiring an ORDER BY query with a full sort on millions of rows) cannot match Redis's performance.</Para>
        </QA>

        <QA n={50} q="What is eventual consistency and how do you handle conflicts in an eventually consistent system?" color="#0078d4" level="Mid">
          <Para>Eventual consistency means that if no new writes are made to a data item, all replicas will eventually converge to the same value. There is no guarantee on when convergence happens — it could be milliseconds or hours. During the convergence window, different nodes may return different values for the same key. This is the consistency model of Cassandra with ONE consistency level, DynamoDB with eventual reads, and DNS.</Para>
          <Para>Conflict handling strategies: Last Write Wins (LWW) — each write carries a timestamp; the write with the latest timestamp wins. Simple to implement but can silently discard valid writes if clocks are skewed. Used by Cassandra by default. Version vectors / Vector clocks — each value carries a vector {'{Node1: v1, Node2: v2, ...}'}; on conflict, if neither vector dominates the other, the values are concurrent and the application must resolve. Used by Riak and Amazon's Dynamo. CRDTs (Conflict-free Replicated Data Types) — data types designed with merge functions that are commutative and associative, so any merge order produces the same result. G-counters (grow-only), PN-counters (positive-negative), OR-Sets (observed-remove). The classic example: a shopping cart as an OR-Set — adding an item is always safe to merge; removing uses tombstones. Application-level resolution — store conflicting versions and ask the application to merge them (CouchDB's approach with document revisions).</Para>
        </QA>

        <QA n={51} q="What is denormalisation and when should you use it?" color="#0078d4" level="Mid">
          <Para>Denormalisation is the intentional violation of normalisation rules — storing redundant, derived, or duplicate data to improve read performance. A normalised schema distributes data across many tables to eliminate redundancy; denormalisation consolidates data into fewer tables or adds redundant columns to avoid joins.</Para>
          <Para>Use denormalisation when: (1) A specific join is executed thousands of times per second and dominates query latency. Materialising the join result as a redundant column eliminates the join cost entirely. (2) Aggregates that are expensive to compute (SUM of all order totals for a customer) are frequently needed — store the running total as a denormalised counter updated by triggers. (3) Read-to-write ratio is extremely high (e.g., a product listing page read millions of times per day but updated rarely) — denormalise for read speed. Trade-offs: writes become more complex (update the denormalised column everywhere the fact appears), data can become inconsistent if updates are not applied atomically to all copies, and the schema becomes harder to maintain. Cassandra's query-first design enforces denormalisation — you explicitly duplicate data across multiple tables, each optimised for a different query. The decision is explicit rather than accidental.</Para>
        </QA>

        <QA n={52} q="What is polyglot persistence and why do production systems use it?" color="#0078d4" level="Senior">
          <Para>Polyglot persistence is the practice of using multiple, different database technologies within the same system — each chosen for the specific data it manages best. The term acknowledges that no single database is optimal for all use cases: just as polyglot programming uses different languages for different tasks, polyglot persistence uses different databases for different data domains.</Para>
          <Para>A typical Indian tech company at scale: PostgreSQL for transactional data (orders, payments, users) — needs ACID, joins, complex queries. Redis for sessions, rate limiting, and leaderboards — needs microsecond latency, atomic operations, TTL. Cassandra for delivery GPS tracking — needs 500K writes/second with no single point of failure. Elasticsearch for restaurant and menu search — needs full-text search with relevance scoring. Kafka for event streaming between all these systems — needs durable, replayable, high-throughput pub-sub. Snowflake or BigQuery for analytics — needs columnar storage, distributed SQL over petabytes. Each database does what it is designed for. The complexity cost: more systems to operate, monitor, and keep in sync. The data consistency model between systems is eventually consistent (stream processing via Kafka or CDC tools like Debezium) rather than ACID-transactional. PostgreSQL is typically the source of truth; all other databases are derived views of that truth, updated asynchronously.</Para>
        </QA>
      </section>

      {/* ========================================
          SECTION 8 — SECURITY & DESIGN
          ======================================== */}
      <section style={{ marginBottom: 60 }}>
        <SectionTag text="// Section 08 — Security & System Design" />
        <SectionTitle>Security and System Design</SectionTitle>

        <QA n={53} q="What is SQL injection and write a vulnerable vs secure example." color="var(--accent)" level="Fresher">
          <Para>SQL injection occurs when user-supplied input is concatenated into a SQL query string, allowing the attacker to inject SQL code that changes the query's semantics. It can bypass authentication, read any table, modify data, and in some configurations execute OS commands.</Para>
          <CodeBox label="Vulnerable vs secure — Python">
{`# VULNERABLE: string concatenation
def login(username, password):
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    return db.execute(query).fetchone() is not None

# Attack: username = "admin'--"
# Query becomes: SELECT * FROM users WHERE username='admin'--' AND password='...'
# The -- comments out the password check → logs in as admin with any password

# SECURE: parameterised query
def login(username, password):
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    return db.execute(query, (username, password)).fetchone() is not None
# Parameters are NEVER interpreted as SQL — even if username contains SQL syntax`}
          </CodeBox>
          <Para>The parameterised version is secure because the database receives the SQL structure and the data values separately. The database engine never parses the parameter values as SQL code — they are always treated as literal strings, regardless of their content.</Para>
        </QA>

        <QA n={54} q="What is Row-Level Security and give a concrete use case." color="var(--accent)" level="Mid">
          <Para>Row-Level Security (RLS) is a database feature that defines policies controlling which rows a user can see or modify. When RLS is enabled on a table, the database engine automatically appends the policy's filter condition to every query on that table — transparently, at the engine level. This cannot be bypassed by SQL injection because the filter is applied by the database engine before the query result is returned, not by application code that could be bypassed.</Para>
          <CodeBox label="Multi-tenant RLS — each company sees only its own data">
{`-- Enable RLS:
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy: can only see own tenant's rows
CREATE POLICY tenant_isolation ON orders
FOR ALL USING (tenant_id = current_setting('app.tenant_id')::INT);

-- Application sets tenant context per request:
-- SET LOCAL app.tenant_id = '42';

-- Now: SELECT * FROM orders → automatically becomes
-- SELECT * FROM orders WHERE tenant_id = 42
-- No WHERE clause needed in application code — enforced by the database`}
          </CodeBox>
          <Para>Use cases: multi-tenant SaaS (each customer sees only their data), healthcare (doctors see only their patients' records), financial systems (relationship managers see only their clients' accounts), row-based feature flags (beta users see experimental data, others see production data). RLS policies are also used for soft-delete enforcement — rows with is_deleted=true are invisible to application roles but visible to admin roles — and for time-based data visibility — future-scheduled content invisible until its publish_date.</Para>
        </QA>

        <QA n={55} q="How do you design a database schema for a URL shortener like bit.ly?" color="var(--accent)" level="Mid">
          <Para>Core requirements: generate short URLs, redirect to the original long URL, track click analytics, support custom aliases, handle ~100M URLs and ~1B redirects per day.</Para>
          <CodeBox label="Schema design — URL shortener">
{`CREATE TABLE short_urls (
    short_code    CHAR(7)       PRIMARY KEY,  -- base62 encoded 7 chars = 62^7 = 3.5T URLs
    long_url      TEXT          NOT NULL,
    created_by    INT           REFERENCES users(user_id),
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    expires_at    TIMESTAMPTZ,              -- optional TTL
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    click_count   BIGINT        NOT NULL DEFAULT 0  -- denormalised counter
);
CREATE INDEX idx_short_urls_created ON short_urls(created_by, created_at DESC);

-- Click analytics (write-heavy — use Cassandra or TimescaleDB at scale)
CREATE TABLE clicks (
    click_id      BIGSERIAL     PRIMARY KEY,
    short_code    CHAR(7)       NOT NULL,
    clicked_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    country_code  CHAR(2),
    device_type   VARCHAR(20),
    referrer      TEXT
);
-- At 1B clicks/day: partition by day, archive old partitions to cold storage`}
          </CodeBox>
          <Para>Short code generation: take the auto-incremented ID, base62-encode it (digits + lowercase + uppercase = 62 characters, 7 characters gives 3.5 trillion unique codes). Redirect performance: the short_code lookup (PRIMARY KEY) is a single B+ tree lookup — sub-millisecond. Cache hot short codes in Redis with a TTL (most URL shorteners find 80% of traffic hits 1% of URLs). For click counting: don't UPDATE the row on every click (lock contention). Instead batch increments in Redis and periodically flush to PostgreSQL, or use a separate analytics system (Cassandra or ClickHouse) for the write-heavy click stream.</Para>
        </QA>

        <QA n={56} q="How would you design the database layer for an e-commerce inventory system?" color="var(--accent)" level="Senior">
          <Para>Core requirements: track stock levels accurately, prevent overselling (selling more than available), handle concurrent checkouts of the same product, support reservations (cart holds), audit all stock movements.</Para>
          <CodeBox label="Inventory schema with MVCC-safe stock reservation">
{`CREATE TABLE products (
    product_id    INT           PRIMARY KEY,
    name          TEXT          NOT NULL,
    sku           TEXT          UNIQUE NOT NULL
);

CREATE TABLE inventory (
    product_id    INT           PRIMARY KEY REFERENCES products,
    total_stock   INT           NOT NULL CHECK (total_stock >= 0),
    reserved      INT           NOT NULL DEFAULT 0 CHECK (reserved >= 0),
    available     INT           GENERATED ALWAYS AS (total_stock - reserved) STORED,
    version       INT           NOT NULL DEFAULT 0  -- optimistic lock version
);

-- Stock movement audit (every change logged):
CREATE TABLE stock_movements (
    movement_id   BIGSERIAL     PRIMARY KEY,
    product_id    INT           NOT NULL REFERENCES products,
    type          TEXT          NOT NULL, -- 'RESERVE', 'RELEASE', 'SELL', 'RESTOCK'
    quantity      INT           NOT NULL,
    order_id      INT,
    moved_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    moved_by      INT
);

-- Reserve stock (at checkout — prevents overselling):
UPDATE inventory
SET reserved = reserved + :qty,
    version  = version + 1
WHERE product_id = :pid
  AND version    = :expected_version   -- optimistic lock
  AND (total_stock - reserved) >= :qty; -- sufficient available stock

-- If 0 rows updated: either version mismatch (retry) or insufficient stock (error)
-- This single UPDATE is atomic — two concurrent checkouts for the last unit:
-- First UPDATE succeeds (available becomes 0)
-- Second UPDATE fails the available >= qty check → out of stock`}
          </CodeBox>
          <Para>The critical design: the available column is computed, not stored (prevents inconsistency). The optimistic lock version prevents lost updates under concurrent checkout — if two sessions read version=5 simultaneously and both try to update, only one succeeds (the other gets version mismatch and retries). At higher scale, partition inventory by warehouse, use Redis for real-time availability checks (cache the available count, invalidate on each reservation), and PostgreSQL as the source of truth with periodic reconciliation.</Para>
        </QA>

        <QA n={57} q="What is database sharding and what are its trade-offs?" color="var(--accent)" level="Senior">
          <Para>Sharding (horizontal partitioning) splits a large table across multiple database nodes — each node holds a different subset of rows. Unlike replication (which copies all data to every node), sharding distributes data so the total dataset can exceed the capacity of any single machine. Each shard is an independent database server handling reads and writes for its partition of the data.</Para>
          <Para>Trade-offs: Benefits — storage scales horizontally (add nodes to add capacity), write throughput scales (each shard handles a fraction of writes independently), queries that touch only one shard are fast (no cross-node communication). Costs — cross-shard joins are extremely expensive (scatter-gather across all shards, join in application code) or require denormalisation to avoid. Distributed transactions across shards require 2PC (complex, blocking) or the Saga pattern (eventual consistency). Rebalancing (moving data when adding shards) is operationally complex and risks downtime. The application or middleware must route queries to the correct shard. Key design choices: shard by the column that is most often in WHERE clauses (customer_id for customer queries, order_id for order queries). Use consistent hashing to minimise rebalancing on node changes. Co-locate related data (shard both orders and order_items by customer_id so joins stay within one shard).</Para>
        </QA>

        <QA n={58} q="How would you optimise a slow SQL query?" color="var(--accent)" level="Mid">
          <Para>The systematic approach: Step 1 — run EXPLAIN ANALYZE BUFFERS on the slow query. Read the plan from the bottom up (leaf nodes first). Identify the bottleneck node: large "Rows Removed by Filter" (predicate not using index), "Seq Scan" on a large table (missing index), "Hash Batches {'>='} 1" (hash join spilling to disk), "Sort Method: external merge" (sort spilling to disk).</Para>
          <Para>Step 2 — fix the identified issue. Missing index for a selective filter: CREATE INDEX CONCURRENTLY on the filtered column. Composite index for queries filtering on multiple columns (place the equality condition columns first, range condition last). Stale statistics causing wrong plan: VACUUM ANALYZE on the relevant tables. Hash join spill: increase work_mem (SET work_mem = '256MB' for the session). Step 3 — verify the fix: run EXPLAIN ANALYZE again and confirm the plan changed as expected. Common patterns: an N+1 query (application loops through N results and queries the DB once per result) — fix with a JOIN. A correlated subquery executing once per outer row — rewrite as a JOIN or window function. Missing covering index causing heap fetches — add INCLUDE columns to the index. A function call on an indexed column in WHERE ({"'{WHERE LOWER(email) = ...}'"}) prevents index use — create a functional index on LOWER(email) or store the email pre-lowercased.</Para>
        </QA>

        <QA n={59} q="What is the N+1 query problem and how do you fix it?" color="var(--accent)" level="Mid">
          <Para>The N+1 problem occurs when an application executes one query to fetch N records, then executes one additional query per record to fetch related data — totalling N+1 database round-trips. Example: fetch 100 orders, then fetch the customer details for each order one by one — 101 queries instead of 1. Each individual query is fast, but the overhead of 101 round-trips (each with connection overhead, query parsing, and network latency) makes the total operation slow.</Para>
          <Para>Fix 1 — JOIN: combine the queries. Instead of 100 separate customer lookups, JOIN orders with customers in a single query. The database performs the join internally — one round-trip instead of 101. Fix 2 — Eager loading (ORMs): in Django, orders.select_related('customer') or orders.prefetch_related('items') tells the ORM to fetch related data in a single additional query rather than per-record. In SQLAlchemy: joinedload() or subqueryload(). Fix 3 — IN clause batching: if a join is complex, fetch the IDs first (one query), then fetch related records with WHERE id IN (...) (one query) — 2 queries not N+1. Fix 4 — denormalisation: store the most-needed related fields directly (store customer_name in the orders table) — one read with no join needed. The ORM-generated N+1 is one of the most common performance issues in web applications and is usually invisible until the application hits meaningful traffic (100 users: fast. 10,000 users: catastrophic).</Para>
        </QA>

        <QA n={60} q="If you had to design the database architecture for a payment system like Razorpay, what would it look like?" color="var(--accent)" level="Senior">
          <Para>The payment system requires extreme reliability, strong consistency for financial data, regulatory compliance (audit trail, PCI-DSS), and high throughput (100K transactions/second at peak). No data loss is acceptable — a committed payment must be durable forever.</Para>
          <Para>Core transactional database: PostgreSQL with synchronous streaming replication (synchronous_standby_names = 'any 1 (replica1, replica2)') — zero data loss. Payments, accounts, merchants, and settlements stored here with full ACID. Row-Level Security for tenant isolation (each merchant sees only their own transactions). pgAudit enabled on all financial tables. Column encryption for sensitive data (card tokens, bank account numbers) using pgcrypto with keys in AWS KMS. TLS-only connections, scram-sha-256 authentication, no superuser access from application accounts. Event stream: every payment state transition (INITIATED → PROCESSING → COMPLETED/FAILED) published to Kafka. Downstream consumers update read models, trigger webhooks, feed analytics. This decouples the write path from the read path. Read models: Redis for real-time balance checks and rate limiting (100K reads/second, sub-millisecond). Elasticsearch for merchant transaction search with full-text and date range. Cassandra for high-frequency write-heavy data (payment attempt logs — write once, rarely read). Audit: every table has trigger-based audit logging to an append-only audit table, shipped to immutable S3 storage. The audit record is independent of the application — even a compromised application cannot delete it. Analytics: daily CDC from PostgreSQL → Kafka → Snowflake. Merchants query Snowflake for settlement reports; business intelligence runs on Snowflake. PostgreSQL never receives analytical query load.</Para>
        </QA>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'DBMS adds data model, query language, transaction management, concurrency control, and recovery to raw file storage. The three-schema architecture (external/conceptual/internal) provides logical and physical data independence.',
        'ER model: strong entity, weak entity (needs owner for identity), composite/multi-valued/derived attributes, participation (total vs partial), cardinality (1:1, 1:N, M:N), ISA hierarchies. Each maps to specific relational schema patterns.',
        'Normalisation eliminates insertion/update/deletion anomalies. 1NF: atomic values. 2NF: no partial dependencies (non-key depends on all of composite PK). 3NF: no transitive dependencies. BCNF: every determinant is a superkey. Decomposition must be lossless (Heath\'s Theorem) and ideally dependency-preserving.',
        'SQL execution order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. Explains why aliases defined in SELECT cannot be used in WHERE, and why aggregate functions cannot appear in WHERE.',
        'ACID: Atomicity (all or nothing via WAL), Consistency (constraints always satisfied), Isolation (concurrent transactions don\'t interfere — 4 levels), Durability (committed data survives crashes — via WAL + fsync). Four anomalies: dirty read, non-repeatable read, phantom read, lost update.',
        'B+ tree: all data pointers in leaf nodes, leaves linked in sorted list. O(log n) search, O(log n + k) range scan. Clustered index = physical storage order. Non-clustered index = separate structure with RID pointers. Covering index = no heap fetch needed. Partial index = index on a subset of rows.',
        'Buffer pool: DRAM cache of disk pages. STEAL/NO-FORCE policy for performance. WAL rule: log before page write (enables UNDO), log before commit (enables REDO). ARIES recovery: Analysis (reconstruct ATT+DPT), REDO (replay from redo_lsn), UNDO (rollback losers with CLRs).',
        'CAP theorem: during partition, choose CP (refuse stale responses) or AP (serve stale data). PACELC extends this: normally, choose latency (local read) or consistency (quorum read). 2PL guarantees serializability. Deadlocks detected via wait-for graph. MVCC: multiple row versions, readers never block writers.',
        'NoSQL families: Key-Value (Redis — microsecond, in-memory), Document (MongoDB — flexible JSON), Column-Family (Cassandra — high write throughput, query-first design), Graph (Neo4j — relationship traversal). Choose based on access patterns, not personal preference. Polyglot persistence uses all of them in one system.',
        'SQL injection: always use parameterised queries — no exceptions. Least privilege: application accounts get only necessary DML. RLS: row-level access control enforced by the database engine. Audit: pgAudit + application audit tables + immutable log shipping. Column encryption: pgcrypto + AWS KMS for sensitive PII.',
      ]} />

    </LearnLayout>
  )
}