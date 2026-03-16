import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Models in DBMS — Hierarchical to NoSQL | Chaduvuko',
  description:
    'Every major data model explained at depth — hierarchical, network, relational, entity-relationship, object-oriented, object-relational, document, key-value, column-family, and graph. Why each was invented, how each works internally, and why the relational model has dominated for 50 years.',
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

export default function DataModels() {
  return (
    <LearnLayout
      title="Data Models"
      description="The complete evolution of how humanity has organised data — from paper ledgers to distributed graph databases — and why every architectural decision in database engineering traces back to the choice of data model."
      section="DBMS"
      readTime="70–85 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHAT IS A DATA MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Blueprint" />
        <SectionTitle>What Is a Data Model — The Precise Definition</SectionTitle>

        <Para>
          Most students hear "data model" and think it means a database schema — the list of tables
          and columns. That is a <em>specific instance</em> of a data model, but not the concept itself.
          A data model is something far more fundamental.
        </Para>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>data model</strong> is a formal framework — a
          collection of concepts, rules, and constraints — that precisely describes three things:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
          {[
            {
              num: '01',
              concept: 'Structure',
              color: '#0078d4',
              desc: 'What categories of objects can exist in the database and how they are organised. Are data elements arranged as tables? As trees? As graphs? As documents? This is the structural component — the "shape" of data.',
              example: 'In the relational model, the structural concept is a "relation" — a set of tuples with a fixed set of attributes. Every piece of data must fit into this structure.',
            },
            {
              num: '02',
              concept: 'Operations',
              color: 'var(--accent)',
              desc: 'What operations can be performed on data — what can you do with it? How do you retrieve it, modify it, navigate through it? The operations define the expressive power of the model.',
              example: 'In the relational model, the operations are relational algebra — select, project, join, union, difference. SQL is the practical realisation of these operations.',
            },
            {
              num: '03',
              concept: 'Constraints',
              color: '#f97316',
              desc: 'What rules must always hold true about the data? What is permitted and what is forbidden? Constraints define the validity conditions the model enforces automatically.',
              example: 'In the relational model: every tuple in a relation must have a unique primary key value. A foreign key must reference an existing primary key. These are structural constraints built into the model itself.',
            },
          ].map((item, i) => (
            <div key={item.num} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}12`, borderRight: '1px solid var(--border)',
                padding: '22px 18px', minWidth: 100,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--muted)' }}>{item.num}</span>
                <span style={{ fontSize: 15, fontWeight: 900, color: item.color, fontFamily: 'Syne, sans-serif', textAlign: 'center' }}>{item.concept}</span>
              </div>
              <div style={{ padding: '22px 24px', flex: 1 }}>
                <Para>{item.desc}</Para>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example: </span>
                  <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{item.example}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Para>
          When a database researcher says "the relational model," they are not talking about tables
          and SQL specifically. They are talking about the mathematical framework — the abstract
          structure of relations (sets of tuples), the algebra of operations over those relations,
          and the integrity rules that govern them. SQL is just one implementation. Tables on a
          screen are just one visualisation. The model is the theory underneath.
        </Para>

        <SubTitle>Why Choosing the Right Data Model is the Most Consequential Decision in System Design</SubTitle>

        <Para>
          The data model is chosen once — at the beginning of a system's life. After that, changing
          it is one of the most painful and expensive engineering operations that exists. Migrating
          from a relational model to a document model for a system with 100 million existing records
          is a multi-month project involving data transformation pipelines, application rewrites,
          data validation procedures, and careful rollout strategies. Companies have gone bankrupt
          executing bad data model migrations.
        </Para>

        <Para>
          The data model choice determines: how fast queries run at scale, how easy it is to add new
          features, how much application code is required to maintain data integrity, what kind of
          engineers you need to hire, and what your database infrastructure costs will be. A wrong
          choice compounds over years. The most senior engineers at any company are the ones who
          chose their data models well at the beginning.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Historical Context That Changes How You See This</div>
          <Para>
            In the 1960s, every major organisation that adopted computers made a data model choice —
            and most of them got it wrong. The US banking system, airline reservation systems, and
            government agencies built massive hierarchical and network database systems that became
            increasingly expensive to maintain, modify, and query. When the relational model arrived
            in 1970, it was not just a technical improvement — it was a rescue. Edgar Codd's paper
            was titled "A Relational Model of Data for Large Shared Data Banks" — and it directly
            addressed the pain of organisations already drowning in the complexity of their existing
            data models. Understanding history is understanding why things are designed the way they are.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 2 — HIERARCHICAL MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The First Model" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#f97316', background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 01</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
            color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase',
          }}>1960s — IBM IMS</span>
        </div>

        <SectionTitle>The Hierarchical Model</SectionTitle>

        <Para>
          The hierarchical model was the first commercially significant data model, introduced by IBM
          in 1966 as part of the <strong style={{ color: 'var(--text)' }}>Information Management System (IMS)</strong> —
          built specifically to manage the bill of materials for the Apollo spacecraft programme.
          NASA needed to track hundreds of thousands of parts, each composed of sub-parts, each
          composed of further sub-parts — a naturally tree-shaped problem. The hierarchical model
          was a perfect fit for that specific problem. The trouble began when organisations tried
          to use it for everything else.
        </Para>

        <SubTitle>Structure — The Tree</SubTitle>

        <Para>
          In the hierarchical model, data is organised as a collection of trees. Each tree has
          a single <strong style={{ color: 'var(--text)' }}>root node</strong> at the top. Every
          node in the tree (except the root) has exactly
          <strong style={{ color: 'var(--text)' }}> one parent</strong>. A parent can have many
          children. Children can have their own children. This creates a rigid, top-down structure
          where relationships are physically embedded — a child record is stored directly beneath
          its parent record on disk.
        </Para>

        <CodeBox label="Hierarchical model — visualised for a university system">
{`University (root)
│
├── Department: Computer Science
│   ├── Course: DBMS (CS301)
│   │   ├── Student: Rahul Sharma  (enrolled)
│   │   ├── Student: Priya Reddy   (enrolled)
│   │   └── Student: Arjun Nair   (enrolled)
│   │
│   └── Course: Algorithms (CS302)
│       ├── Student: Rahul Sharma  (enrolled)
│       └── Student: Kiran Patel   (enrolled)
│
└── Department: Mathematics
    └── Course: Linear Algebra (MA201)
        └── Student: Priya Reddy  (enrolled)

// Notice: Rahul appears TWICE — once under CS301, once under CS302
// Priya appears TWICE — once under CS301, once under MA201
// This duplication is not a bug — it is a fundamental limitation of the model`}
        </CodeBox>

        <Para>
          The critical observation in that diagram: <strong style={{ color: 'var(--text)' }}>Rahul
          Sharma appears twice</strong> because he is enrolled in two courses. In the hierarchical
          model, a child can only have one parent — but a student in reality can be enrolled in many
          courses. The model cannot represent this naturally. The solution was to duplicate the
          student record under each course they attend. This duplication is not accidental —
          it is a structural consequence of the one-parent constraint. And it brings back every
          problem we listed in Module 01: redundancy, inconsistency, and update anomalies.
        </Para>

        <SubTitle>How Navigation Worked — The Pointer Model</SubTitle>

        <Para>
          In IMS, data was not queried using a declarative language like SQL. Programmers wrote
          procedural code that <strong style={{ color: 'var(--text)' }}>navigated</strong> the
          tree structure manually — moving down from root to child to grandchild, following physical
          pointers stored in the records themselves. A query like "find all students enrolled in
          Computer Science courses" required code that:
        </Para>

        <CodeBox label="Pseudocode — hierarchical navigation (IMS-style DL/I language)">
{`// To find all CS students in IMS, a programmer would write:
GU  DEPARTMENT (DEPT-NAME = 'Computer Science')
// GU = Get Unique — navigate to this node

GNP COURSE
// GNP = Get Next within Parent — get first course under CS dept

WHILE status = ok:
    GNP STUDENT
    // Navigate to each student under this course
    WHILE status = ok:
        PRINT student.name
        GNP STUDENT
    GNP COURSE  // Move to next course
    
// This is not a query — it is navigation code.
// The programmer must know the physical tree structure to write this.
// Change the tree structure → rewrite every program that navigates it.
// This is the data dependency problem from Module 01 at its worst.`}
        </CodeBox>

        <Para>
          Every DML operation in a hierarchical database required the programmer to know the exact
          path through the tree. There was no way to say "give me all students named Rahul" without
          knowing which branches of the tree might contain students named Rahul and navigating to
          each one explicitly. The lack of a declarative query language was a profound limitation.
        </Para>

        <SubTitle>Strengths — Where It Still Wins</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            {
              strength: 'Blazing Fast for Known Path Queries',
              desc: 'If you always access data top-down along the tree — "get all orders for this customer" — the hierarchical model is extremely fast because the child records are physically adjacent to the parent on disk. One disk read retrieves the parent and all its children together.',
            },
            {
              strength: 'Simple to Understand for Natural Hierarchies',
              desc: 'For data that genuinely is a tree — file systems, XML documents, organisational charts, bill of materials — the hierarchical model maps directly to the natural structure without any awkward translation.',
            },
            {
              strength: 'Excellent Write Performance',
              desc: 'Inserting a new child record simply appends it beneath the parent. No index maintenance, no join tables, no foreign key checks across multiple tables. For high-volume insert workloads with a natural hierarchy, this is efficient.',
            },
            {
              strength: 'Predictable Performance',
              desc: 'Because the data structure is fixed and navigation paths are predetermined, query execution time is predictable — no query optimiser needed, no statistics to maintain. A given operation always takes the same amount of time.',
            },
          ].map((item) => (
            <div key={item.strength} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.strength}</div>
              </div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <SubTitle>Weaknesses — Why It Was Replaced</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            {
              weakness: 'Cannot Represent Many-to-Many Relationships',
              desc: 'A student enrolled in multiple courses, a product in multiple categories, an employee in multiple projects — any real-world many-to-many relationship requires data duplication. The model has no concept of a record having two parents.',
            },
            {
              weakness: 'Data Duplication is Built-In',
              desc: 'Every many-to-many relationship forces copies of records under multiple parents. Update one copy but not others and the database is inconsistent. There is no mechanism in the model to prevent or detect this.',
            },
            {
              weakness: 'No Declarative Query Language',
              desc: 'DL/I (Data Language One, IBM\'s query language for IMS) is entirely navigational and procedural. Queries require detailed knowledge of the physical tree structure. Ad-hoc questions from business users are effectively impossible.',
            },
            {
              weakness: 'Schema Changes are Catastrophic',
              desc: 'Adding a new level to the hierarchy, or reorganising the tree structure, requires rewriting every program that navigates the affected branches. The data-program dependency problem (Module 01) is at its most severe here.',
            },
            {
              weakness: 'Cannot Ask Cross-Tree Questions',
              desc: 'Queries that span across tree branches — "find all students who are enrolled in both CS and Math courses" — require navigating multiple separate trees and manually correlating results in application code.',
            },
            {
              weakness: 'Deletion Anomalies',
              desc: 'Deleting a parent node deletes all its children. Deleting a course deletes all enrollment records. Deleting a department deletes all its courses and all student enrollments. Data is coupled through the physical tree.',
            },
          ].map((item) => (
            <div key={item.weakness} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#ff4757', flexShrink: 0, fontWeight: 700 }}>✕</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.weakness}</div>
              </div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Still Running Today — The Legacy That Will Not Die</div>
          <Para>
            IBM IMS is still in active production use at thousands of banks, insurance companies,
            airline systems, and government agencies worldwide. According to IBM's own figures,
            IMS processes more than 50 billion transactions per day — more than any other database
            system. The Japanese banking system, several US federal agencies, and most major
            airlines run core transaction processing on IMS databases built in the 1970s.
          </Para>
          <Para>
            Why hasn't it been replaced? Because migrating decades of hierarchical data to a relational
            model requires understanding every implicit structural relationship baked into the tree —
            many of which are undocumented and known only to engineers who retired or died.
            The risk and cost of migration exceeds the pain of maintaining the existing system.
            This is a critical lesson: data model decisions outlive every other technical decision
            in a system's lifetime.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 3 — NETWORK MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The Graph Predecessor" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#facc15', background: 'rgba(250,204,21,0.1)',
            border: '1px solid rgba(250,204,21,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 02</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>1969 — CODASYL Standard</span>
        </div>

        <SectionTitle>The Network Model</SectionTitle>

        <Para>
          In 1969, a committee called CODASYL (Conference on Data Systems Languages — the same
          group that standardised COBOL) published a specification for a network database standard.
          The network model was a direct response to the hierarchical model's most glaring weakness:
          the inability to represent many-to-many relationships without data duplication.
        </Para>

        <Para>
          The key innovation of the network model was simple but profound: it removed the
          one-parent constraint. In the network model, a record can have
          <strong style={{ color: 'var(--text)' }}> multiple parent records</strong> and
          <strong style={{ color: 'var(--text)' }}> multiple child records</strong> simultaneously.
          Instead of a tree, data is organised as a
          <strong style={{ color: 'var(--text)' }}> directed graph</strong> — nodes connected by
          named relationships called <strong style={{ color: 'var(--text)' }}>sets</strong>.
        </Para>

        <SubTitle>Structure — Sets and Owners</SubTitle>

        <Para>
          The fundamental concept in the network model is the <strong style={{ color: 'var(--text)' }}>set</strong> —
          a named, directed relationship between two record types. A set has an
          <strong style={{ color: 'var(--text)' }}> owner</strong> record type and a
          <strong style={{ color: 'var(--text)' }}> member</strong> record type. One owner can
          have many members (one-to-many). Crucially, a record type can be a member in multiple
          different sets simultaneously — it can have multiple owners of different types.
        </Para>

        <CodeBox label="Network model — visualised for a university system">
{`// The many-to-many problem is now solvable:

STUDENT record: Rahul Sharma (S001)
    │
    ├── ENROLLED_IN set ──────▶  COURSE: DBMS (CS301)
    │                                 │
    │                                 └── TAUGHT_BY set ──▶ TEACHER: Prof. Kumar
    │
    └── ENROLLED_IN set ──────▶  COURSE: Algorithms (CS302)
                                      │
                                      └── TAUGHT_BY set ──▶ TEACHER: Prof. Singh

// Rahul appears ONCE. He is a member of ENROLLED_IN set twice — once per course.
// No duplication. The student record has two logical parents through the same set.

// Cross-structure query: "find all students taught by Prof. Kumar"
// Navigate: TEACHER(Prof. Kumar) ← TAUGHT_BY ← COURSE ← ENROLLED_IN ← STUDENTS
// Still navigational — but now both directions are possible without duplication.`}
        </CodeBox>

        <SubTitle>How Navigation Worked — Currency Indicators</SubTitle>

        <Para>
          The network model used a concept called <strong style={{ color: 'var(--text)' }}>currency indicators</strong> —
          essentially pointers that kept track of the "current" record in each set and record type
          as the program navigated the database. A program would call operations like FIND, GET,
          STORE, MODIFY, ERASE, CONNECT, and DISCONNECT to navigate and manipulate the graph.
          The programmer was responsible for maintaining correct navigation state throughout
          every operation.
        </Para>

        <CodeBox label="CODASYL DML navigation pseudocode">
{`// "Find all courses taken by student S001 and their teachers"

MOVE 'S001' TO STUDENT-ID
FIND ANY STUDENT USING STUDENT-ID
// Currency: current STUDENT = Rahul Sharma

FIND FIRST COURSE WITHIN ENROLLED_IN
// Currency: current COURSE = DBMS (CS301)

WHILE DB-STATUS = 0:
    GET CURRENT COURSE           // Retrieve course data
    FIND OWNER WITHIN TAUGHT_BY  // Navigate to teacher
    GET CURRENT TEACHER          // Retrieve teacher data
    PRINT COURSE-NAME, TEACHER-NAME
    
    FIND NEXT COURSE WITHIN ENROLLED_IN  // Next course for this student

// The programmer must manage currency indicators manually.
// If you navigate off-course (pun intended), currency is lost and
// you must restart the navigation from a known anchor point.
// Writing correct CODASYL programs required deep expertise in the
// exact structure of every set in the database schema.`}
        </CodeBox>

        <SubTitle>Why the Network Model Failed to Dominate</SubTitle>

        <Para>
          The network model solved the many-to-many relationship problem that crippled hierarchical
          databases. But it solved it at an enormous cost in complexity. The CODASYL specification
          itself was hundreds of pages long. Writing correct network database programs required
          intimate knowledge of the physical storage structure, careful management of currency
          indicators, and sophisticated error handling for every navigation operation.
        </Para>

        <Para>
          More critically, the network model shared the hierarchical model's fatal flaw:
          it was <strong style={{ color: 'var(--text)' }}>navigational and procedural</strong>,
          not declarative. There was still no equivalent of SQL — no way to say "give me all
          students who scored above 80 in courses taught by professors in the Computer Science
          department" without writing a multi-page navigation program. Every ad-hoc business
          question required custom development work.
        </Para>

        <Para>
          When Edgar Codd published his relational model paper in 1970, he explicitly criticised
          both the hierarchical and network models for their navigational nature. His key insight —
          which we examine thoroughly in the next section — was that users should describe
          <strong style={{ color: 'var(--text)' }}> what</strong> data they want, not
          <strong style={{ color: 'var(--text)' }}> how</strong> to navigate to it.
          That insight made both models obsolete for general-purpose data management.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #facc15', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#facc15', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Network Model's Legacy — Graph Databases</div>
          <Para>
            The network model is not dead — it evolved. Modern graph databases (Neo4j, Amazon Neptune)
            are the direct intellectual descendants of the CODASYL network model. The fundamental
            insight — that some data is inherently graph-shaped and should be stored as nodes and
            edges rather than forced into tables — was correct. What changed is the query language.
            Cypher (Neo4j's query language) is declarative: "MATCH (s:Student)-[:ENROLLED_IN]-&gt;(c:Course) RETURN s, c"
            — describe the pattern you want, not the navigation path to find it. The network model's
            structure survived; its procedural interface did not.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 4 — THE RELATIONAL MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — The Revolution" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: 'var(--accent)', background: 'rgba(0,230,118,0.1)',
            border: '1px solid rgba(0,230,118,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 03 ★</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--accent)', letterSpacing: '.08em', textTransform: 'uppercase' }}>1970 — Codd's Revolution — Dominant for 50+ Years</span>
        </div>

        <SectionTitle>The Relational Model — Why It Changed Everything</SectionTitle>

        <Para>
          On June 26, 1970, IBM researcher <strong style={{ color: 'var(--text)' }}>Edgar F. Codd</strong> published
          a 12-page paper in the Communications of the ACM titled "A Relational Model of Data for
          Large Shared Data Banks." It is, without exaggeration, one of the most influential
          scientific papers in the history of computing. Codd won the Turing Award for it in 1981 —
          the highest honour in computer science.
        </Para>

        <Para>
          Codd's central insight was deceptively simple: the hierarchical and network models
          required users to navigate physical data structures. This meant users had to understand
          how data was stored to retrieve it. This was backwards. The right abstraction, Codd
          argued, was to let users describe the logical properties of the data they wanted —
          and have the system figure out how to retrieve it. This is the principle of
          <strong style={{ color: 'var(--text)' }}> data independence</strong> applied to queries.
        </Para>

        <SubTitle>The Mathematical Foundation — Set Theory and Predicate Logic</SubTitle>

        <Para>
          Unlike the hierarchical and network models, which were engineering constructs without
          formal mathematical foundations, Codd built the relational model on two branches of
          mathematics that had been rigorously developed for decades:
          <strong style={{ color: 'var(--text)' }}> set theory</strong> (specifically, the
          mathematics of relations — mappings between sets) and
          <strong style={{ color: 'var(--text)' }}> first-order predicate logic</strong>
          (the formal language of logical conditions and quantification).
        </Para>

        <Para>
          This mathematical foundation is not academic decoration — it has profound practical consequences.
          Because the relational model is mathematically defined, every operation has provably correct
          semantics. You can formally prove that a query returns correct results, that a decomposition
          preserves information, that an integrity constraint prevents a specific class of errors.
          No other data model has ever achieved this level of formal rigour, and it is a primary
          reason the relational model has remained the foundation of database engineering for over
          50 years.
        </Para>

        <SubTitle>The Three Pillars of the Relational Model</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              pillar: 'Pillar 1 — Relations (Tables)',
              color: '#0078d4',
              content: `A relation is a mathematical set of tuples — each tuple being an ordered list of domain values. In practical terms, a relation is a table: rows are tuples, columns are attributes, and each column has a domain (the set of valid values). The critical mathematical property: a relation is a SET — which means no two tuples can be identical (no duplicate rows), and tuples have no inherent order (the order of rows in a table is meaningless). These constraints come from set theory, not from engineering convenience.`,
              example: `relation R = {(C001, Rahul, Bengaluru), (C002, Priya, Hyderabad), (C003, Arjun, Mumbai)}
// This is a mathematical set of 3-tuples.
// No duplicate tuples (set property).
// Unordered (set property — sequences are not sets).
// Each position has a domain: customer_id ∈ strings, name ∈ strings, city ∈ city_names`,
            },
            {
              pillar: 'Pillar 2 — Relational Algebra (Operations)',
              color: 'var(--accent)',
              content: `Codd defined eight fundamental operations over relations — Selection (σ), Projection (π), Cartesian Product (×), Union (∪), Difference (−), Rename (ρ), Join (⋈), and Division (÷). These operations are closed — every operation takes one or more relations as input and produces a relation as output. This closure property means operations can be composed arbitrarily: the output of one operation can be the input of another. SQL is a declarative language that translates user queries into sequences of these algebraic operations.`,
              example: `// "Find names of customers from Bengaluru with orders above ₹500"
// In relational algebra:
π_name(σ_city='Bengaluru' AND amount>500 (customers ⋈ orders))

// Translation: JOIN customers and orders, SELECT rows matching conditions,
// PROJECT down to just the name column.
// The DBMS optimiser decides the best physical execution order for this.`,
            },
            {
              pillar: 'Pillar 3 — Integrity Constraints',
              color: '#f97316',
              content: `Codd defined integrity constraints that must hold over all relations at all times — not just when convenient. Domain constraints (values must be from the defined domain), Key constraints (no two tuples can have identical primary key values), and Referential Integrity (a foreign key value must either be null or reference an existing primary key value in the referenced relation). These constraints are enforced by the DBMS automatically — applications cannot violate them even if they try.`,
              example: `-- Domain constraint: age must be a non-negative integer
CHECK (age >= 0 AND age <= 150)

-- Key constraint: no two customers can have the same customer_id
PRIMARY KEY (customer_id)  -- implicitly enforces uniqueness + not null

-- Referential integrity: every order must reference an existing customer
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
-- The DBMS rejects any INSERT into orders where customer_id doesn't exist`,
            },
          ].map((item) => (
            <div key={item.pillar} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px',
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 12, fontFamily: 'Syne, sans-serif' }}>{item.pillar}</div>
              <Para>{item.content}</Para>
              <CodeBox>{item.example}</CodeBox>
            </div>
          ))}
        </div>

        <SubTitle>The Physical-Logical Separation — Codd's Deepest Insight</SubTitle>

        <Para>
          Perhaps the most elegant feature of the relational model is the complete separation
          between the logical view of data and its physical storage. In a relational database,
          you describe data in terms of relations and attributes — logical concepts. The DBMS
          is completely free to store this data in any physical form it chooses: B+ trees,
          heap files, hash tables, sorted arrays, compressed columns — anything.
        </Para>

        <Para>
          This means a DBA can completely reorganise the physical storage — rebuild indexes,
          change file organisation, move data between storage tiers — without any application
          knowing or caring. Applications always see the same logical view: tables with rows
          and columns. This is physical data independence in its purest form, and it is a
          direct mathematical consequence of the relational model's structure.
        </Para>

        <SubTitle>Why Relational Databases Handle Concurrency Better Than Any Previous Model</SubTitle>

        <Para>
          The hierarchical and network models used physical pointers to link records. When two
          transactions tried to modify related records simultaneously, they would both be
          modifying pointer chains — an operation that requires careful coordination and
          is fundamentally difficult to parallelise safely.
        </Para>

        <Para>
          The relational model represents relationships through shared values — a foreign key
          in one table matching a primary key in another. Values, unlike pointers, can be
          compared and locked at the tuple level without affecting other tuples. This makes
          the relational model inherently more amenable to concurrent access control — which
          is why ACID transaction semantics were much easier to implement and reason about
          in relational systems than in hierarchical or network systems.
        </Para>

        <SubTitle>SQL — The Declaration of Independence from Navigation</SubTitle>

        <Para>
          SQL (originally called SEQUEL — Structured English Query Language, developed at IBM
          by Donald Chamberlin and Raymond Boyce in 1974) is the declarative interface to the
          relational model. It is the language in which users specify
          <strong style={{ color: 'var(--text)' }}> what</strong> data they want,
          leaving the <strong style={{ color: 'var(--text)' }}> how</strong> to retrieve it
          entirely to the DBMS.
        </Para>

        <CodeBox label="The power of declarative vs navigational — same question, two paradigms">
{`-- NAVIGATIONAL (Network Model style):
// "Find all students enrolled in DBMS course taught by a CS department professor"
FIND ANY COURSE WHERE COURSE-NAME = 'DBMS'
FIND FIRST STUDENT WITHIN ENROLLED_IN
WHILE DB-STATUS = 0:
    FIND OWNER WITHIN TEACHES
    GET CURRENT PROFESSOR
    IF PROFESSOR.DEPT = 'Computer Science':
        FIND CURRENT STUDENT
        GET CURRENT STUDENT
        PRINT STUDENT.NAME
    FIND NEXT STUDENT WITHIN ENROLLED_IN
// The programmer navigates. The programmer manages state. The programmer knows the structure.

-- DECLARATIVE (Relational Model / SQL):
SELECT s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
JOIN professors p ON c.professor_id = p.professor_id
WHERE c.course_name = 'DBMS'
  AND p.department = 'Computer Science';

-- The programmer describes WHAT they want.
-- The DBMS query optimiser decides HOW to retrieve it.
-- Add an index → same SQL runs faster. Change storage → same SQL works.
-- A business analyst who doesn't know pointer structures can write this.`}
        </CodeBox>

        <Callout type="tip">
          The transition from navigational to declarative querying is not just a technical improvement —
          it is a democratisation of data access. In the hierarchical and network model era, only
          specialised programmers could query databases. With SQL, analysts, managers, and domain
          experts can directly access data. This is why SQL adoption was explosive: it removed the
          programmer as a bottleneck between business questions and data answers.
        </Callout>

        <SubTitle>The Relational Model's Limitations — Honest Assessment</SubTitle>

        <Para>
          The relational model is not without genuine limitations. Understanding them is essential
          for knowing when to reach for alternative models — and for not making the mistake of
          forcing every problem into a relational box.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            {
              limitation: 'The Object-Relational Impedance Mismatch',
              desc: 'Modern applications are built with object-oriented programming languages. Objects have inheritance, polymorphism, nested structures, and methods. Relational tables are flat. Mapping objects to tables and back (ORM — Object-Relational Mapping) is complex, error-prone, and introduces performance overhead. Hibernate, SQLAlchemy, and Prisma exist entirely because of this mismatch.',
            },
            {
              limitation: 'Schema Rigidity',
              desc: 'The relational model requires a predefined schema. Every row in a table must have the same columns. Adding a new column requires an ALTER TABLE statement that locks the table (depending on the DBMS) and may require migrating all existing data. For applications where the data structure is still evolving rapidly, this rigidity is a significant friction.',
            },
            {
              limitation: 'Horizontal Scaling Complexity',
              desc: 'The relational model assumes that all related data is accessible in a single system (for join operations to work). When you need to distribute a relational database across multiple servers (sharding), you either lose the ability to join across shards, or you introduce enormous coordination complexity. This is why social networks, global content platforms, and internet-scale applications often reach for non-relational databases.',
            },
            {
              limitation: 'Deeply Nested Data',
              desc: 'Storing and retrieving a deeply nested data structure (a product with categories, subcategories, variants, images, reviews, and attributes) in a relational model requires many tables and many JOIN operations. For read-heavy access patterns where the entire nested structure is always needed at once, this is inefficient compared to storing the nested structure in a document database.',
            },
          ].map((item) => (
            <div key={item.limitation} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ color: '#f97316', flexShrink: 0, fontWeight: 700 }}>⚠</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.limitation}</div>
              </div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 5 — ENTITY-RELATIONSHIP MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — The Design Tool" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#8b5cf6', background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 04</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>1976 — Peter Chen — Design Methodology</span>
        </div>

        <SectionTitle>The Entity-Relationship Model — Designing Before Building</SectionTitle>

        <Para>
          In 1976, Peter Chen published "The Entity-Relationship Model — Toward a Unified View
          of Data" — a paper that provided what the relational model itself lacked: a
          <strong style={{ color: 'var(--text)' }}> design methodology</strong>. The relational
          model told you how to store data once you had a schema. The ER model told you how to
          design the schema in the first place.
        </Para>

        <Para>
          The ER model is <strong style={{ color: 'var(--text)' }}>conceptual</strong> — it operates
          at a higher level of abstraction than the relational model. It models the real world directly:
          the things that exist (entities), their properties (attributes), and how they relate to each
          other (relationships). It uses a visual notation (ER diagrams) that non-technical stakeholders
          can understand and validate before a single table is created.
        </Para>

        <Para>
          This is why the ER model and the relational model are complementary rather than competing:
          you use the ER model to <em>design</em> your database schema, then convert the ER diagram
          to relational tables using a defined set of mapping rules. This is the standard database
          design methodology used in industry and academia for nearly 50 years.
        </Para>

        <SubTitle>The ER Model's Place in the Database Design Process</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 }}>
          {[
            { step: 'Requirements Gathering', desc: 'Understand the real-world domain — what objects exist, what facts matter, what questions must be answered. Talk to stakeholders. Document the miniworld.', color: '#0078d4' },
            { step: 'ER Modelling (Conceptual Design)', desc: 'Draw the ER diagram — identify entities, define their attributes, identify relationships between entities, determine cardinalities. This produces the conceptual schema.', color: 'var(--accent)' },
            { step: 'Logical Design (ER to Relational)', desc: 'Convert the ER diagram to relational tables using the mapping rules (covered in Module 03). Normalise the tables. This produces the logical schema.', color: '#f97316' },
            { step: 'Physical Design', desc: 'Choose indexes, storage organisation, partitioning strategies, and hardware configuration. This produces the internal schema (the DBA\'s domain).', color: '#8b5cf6' },
            { step: 'Implementation', desc: 'Write the DDL (CREATE TABLE statements), create indexes, configure the DBMS, load initial data.', color: '#facc15' },
          ].map((item, i) => (
            <div key={item.step} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              padding: '14px 18px',
              background: i === 1 ? `${item.color}08` : 'var(--surface)',
              border: `1px solid ${i === 1 ? item.color + '30' : 'var(--border)'}`,
              borderRadius: 8,
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                color: item.color, background: `${item.color}15`,
                border: `1px solid ${item.color}30`, borderRadius: 5,
                padding: '3px 10px', flexShrink: 0, marginTop: 1,
              }}>0{i + 1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>
                  {item.step}
                  {i === 1 && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>← ER Model Lives Here</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info">
          The ER model is covered in complete depth in Module 03 — including every type of entity,
          every type of attribute, every cardinality notation, the complete rules for ER-to-relational
          mapping, and a full worked example designing a real system from scratch. What matters here
          is understanding its role in the data model landscape: it is a conceptual design tool,
          not a storage model.
        </Callout>
      </section>

      {/* ========================================
          PART 6 — OBJECT-ORIENTED MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — The OOP Experiment" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#e879f9', background: 'rgba(232,121,249,0.1)',
            border: '1px solid rgba(232,121,249,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 05</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>1980s–90s — OODBMS</span>
        </div>

        <SectionTitle>The Object-Oriented Model</SectionTitle>

        <Para>
          The 1980s brought the rise of object-oriented programming — Smalltalk, C++, and later Java
          changed how software was written. Objects — with their encapsulated state (attributes),
          behaviour (methods), inheritance hierarchies, and polymorphism — became the dominant
          programming paradigm. And immediately, programmers faced a painful problem:
          their in-memory objects needed to be persisted in relational databases, and the
          translation was awkward and expensive.
        </Para>

        <Para>
          This friction — called the <strong style={{ color: 'var(--text)' }}>object-relational impedance
          mismatch</strong> — motivated the development of
          <strong style={{ color: 'var(--text)' }}> object-oriented database management systems (OODBMS)</strong>.
          The fundamental idea: eliminate the mismatch entirely by storing objects directly in
          the database, exactly as they exist in memory. No transformation, no mapping, no
          ORM layer.
        </Para>

        <SubTitle>Core Concepts of the Object-Oriented Model</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              concept: 'Object Identity (OID)',
              desc: 'Every object in an OODBMS has a unique, system-generated object identifier (OID) — similar to a primary key in a relational database, but managed entirely by the DBMS. The OID is immutable — it never changes regardless of how the object\'s attribute values change. Relationships between objects are represented by storing the OID of referenced objects (like pointers, but persistent).',
              example: 'Customer object with OID=0x4A2F has attributes (name="Rahul", city="Bengaluru") and a reference to Order OID=0x8B3C. The link is the OID, not a foreign key.',
            },
            {
              concept: 'Complex Attributes and Nested Objects',
              desc: 'Unlike relational attributes (which must be atomic — a single value), object attributes can be complex types: lists, sets, arrays, other objects, or nested structures. A Customer object can have an attribute orders of type List<Order> where each Order is itself an object with its own attributes.',
              example: 'customer.orders = [Order{id:1, items:[...], total:280}, Order{id:2, items:[...], total:450}]\n// This nested structure is stored and retrieved as-is — no join required.',
            },
            {
              concept: 'Classes and Inheritance',
              desc: 'Objects are instances of classes. Classes can inherit from other classes, inheriting all parent attributes and methods. A SavingsAccount class can extend Account, inheriting account_number and balance, and adding interest_rate. The database understands the inheritance hierarchy.',
              example: 'Account (account_number, balance, owner)\n    ├── SavingsAccount (interest_rate)\n    └── CurrentAccount (overdraft_limit)\n// Query: find all Accounts with balance > 10000 returns both types.',
            },
            {
              concept: 'Methods on Objects',
              desc: 'Objects in an OODBMS can have methods — executable code stored alongside the data. A BankAccount object can have a transfer(amount, target) method. The logic is part of the stored object. This is a radical departure from the relational model where data and code are strictly separated.',
              example: 'account.deposit(5000)  // method stored in the database\naccount.calculateInterest()  // business logic lives WITH the data',
            },
            {
              concept: 'OQL — Object Query Language',
              desc: 'The ODMG (Object Data Management Group) standardised OQL (Object Query Language) in 1993 as the object-oriented equivalent of SQL. It is declarative like SQL but operates on objects and their traversal paths rather than flat table joins.',
              example: 'SELECT c.name, c.orders\nFROM customers c\nWHERE c.city = "Bengaluru"\n  AND COUNT(c.orders) > 5\n// c.orders is traversed directly — no JOIN across tables needed',
            },
          ].map((item) => (
            <div key={item.concept} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: '4px solid #e879f9', borderRadius: 10, padding: '18px 22px',
            }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>{item.concept}</div>
              <Para>{item.desc}</Para>
              <CodeBox>{item.example}</CodeBox>
            </div>
          ))}
        </div>

        <SubTitle>Why OODBMS Failed to Replace Relational</SubTitle>

        <Para>
          Object databases were genuinely useful for specific domains — CAD/CAM engineering systems
          (where objects are literally mechanical components with complex structures), geographic
          information systems (GIS), multimedia applications, and scientific simulation data.
          Objectivity/DB, GemStone, and Versant were commercially successful OODBMS products.
        </Para>

        <Para>
          But they never replaced relational databases for general business applications, for
          several fundamental reasons:
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { reason: 'No Ad-Hoc Querying', desc: 'OQL was standardised in 1993 but vendor implementations diverged significantly. Business analysts and managers could not use object databases as easily as they could use SQL. The SQL ecosystem — reporting tools, BI software, ETL tools — all assumed relational tables.' },
            { reason: 'Relational Extended Itself', desc: 'Oracle, PostgreSQL, and SQL Server added object-relational extensions — user-defined types, nested tables, array columns. This allowed relational databases to handle complex types without abandoning the relational core. The relational camp absorbed the best ideas from object databases.' },
            { reason: 'Optimiser Immaturity', desc: 'Object databases lacked the decades of query optimiser research that relational databases had accumulated. OQL queries often performed poorly on large datasets compared to equivalent SQL queries on a well-indexed relational database.' },
            { reason: 'No SQL Ecosystem', desc: 'By the 1990s, SQL had become the universal language of enterprise data. Decades of developer training, tooling, and institutional knowledge were invested in SQL and relational databases. Object databases required learning an entirely new paradigm with far fewer resources.' },
          ].map((item) => (
            <div key={item.reason} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.reason}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 7 — OBJECT-RELATIONAL MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — The Compromise" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#0078d4', background: 'rgba(0,120,212,0.1)',
            border: '1px solid rgba(0,120,212,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 06</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>1990s–Present — PostgreSQL, Oracle</span>
        </div>

        <SectionTitle>The Object-Relational Model — The Best of Both Worlds</SectionTitle>

        <Para>
          The object-relational model emerged in the 1990s as relational databases began incorporating
          object-oriented features while maintaining their relational core. The result is a hybrid:
          the structured, queryable, ACID-compliant relational foundation with the ability to store
          complex types, user-defined types, and inheritance hierarchies.
        </Para>

        <Para>
          PostgreSQL is the most complete implementation of the object-relational model available today.
          It supports user-defined base types, composite types (struct-like column types), array columns,
          JSON/JSONB columns with indexing, inheritance between tables, and user-defined functions
          written in multiple languages. Oracle also has extensive object-relational features.
        </Para>

        <CodeBox label="Object-relational features in PostgreSQL — production examples">
{`-- 1. Composite type (structured column type)
CREATE TYPE address_t AS (
    street    VARCHAR(200),
    city      VARCHAR(100),
    state     VARCHAR(50),
    pincode   CHAR(6)
);

CREATE TABLE customers (
    customer_id  SERIAL      PRIMARY KEY,
    name         VARCHAR(100),
    address      address_t,          -- structured column — not just a string
    phone_numbers TEXT[]             -- array column — multiple phones natively
);

-- Insert with composite type
INSERT INTO customers (name, address, phone_numbers)
VALUES (
    'Rahul Sharma',
    ROW('123 MG Road', 'Bengaluru', 'Karnataka', '560001'),
    ARRAY['98765-43210', '87654-32109']
);

-- Query into composite type's components
SELECT name, (address).city, (address).pincode
FROM customers
WHERE (address).city = 'Bengaluru';

-- Query arrays
SELECT name FROM customers
WHERE '98765-43210' = ANY(phone_numbers);

-- 2. JSONB column with indexing — semi-structured data in relational DB
CREATE TABLE products (
    product_id   SERIAL    PRIMARY KEY,
    name         VARCHAR(200),
    category     VARCHAR(100),
    attributes   JSONB      -- flexible schema for product-specific attributes
);

-- Zomato restaurant: attributes vary by restaurant type
INSERT INTO products (name, category, attributes) VALUES
('Butter Chicken', 'Main Course', 
 '{"spice_level": "medium", "is_vegetarian": false, "prep_time_mins": 20, "allergens": ["dairy"]}'),
('Masala Dosa', 'Breakfast',
 '{"spice_level": "mild", "is_vegetarian": true, "accompaniments": ["sambar", "chutney"], "calories": 350}');

-- GIN index for fast JSONB queries
CREATE INDEX idx_product_attrs ON products USING GIN (attributes);

-- Query JSONB — fully indexed
SELECT name FROM products
WHERE attributes @> '{"is_vegetarian": true}'  -- contains this key-value
  AND (attributes->>'spice_level') = 'mild';`}
        </CodeBox>

        <Para>
          The object-relational model is why PostgreSQL is the most popular database for complex
          applications in 2026. It gives you SQL, ACID transactions, and mature query optimisation —
          while also giving you the flexibility to model complex, varying data structures without
          leaving the relational ecosystem. Swiggy, Razorpay, and PhonePe run on PostgreSQL
          precisely because it handles both the structured financial data (relational) and the
          flexible product/menu data (JSONB) in a single system.
        </Para>
      </section>

      {/* ========================================
          PART 8 — DOCUMENT MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — The NoSQL Revolution" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#4285f4', background: 'rgba(66,133,244,0.1)',
            border: '1px solid rgba(66,133,244,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 07</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>2007–Present — MongoDB, CouchDB, Firestore</span>
        </div>

        <SectionTitle>The Document Model — When Your Data Is Already a Document</SectionTitle>

        <Para>
          The document model emerged directly from the pain of internet-scale web applications in
          the mid-2000s. Companies like Google, Amazon, Facebook, and LinkedIn were building systems
          with user-generated content, flexible schemas, and requirements for horizontal scale across
          hundreds of servers that relational databases — designed in an era of single-server systems —
          struggled to meet elegantly.
        </Para>

        <Para>
          The document model stores data as <strong style={{ color: 'var(--text)' }}>self-contained
          documents</strong> — typically JSON or BSON (Binary JSON) format. A document is analogous
          to a row in a relational table, but with two critical differences: a document can contain
          nested sub-documents and arrays (eliminating the need for JOIN), and documents in the same
          collection are not required to have the same structure (schema flexibility).
        </Para>

        <SubTitle>The Document Model's Core Philosophy — Colocation</SubTitle>

        <Para>
          The relational model's approach to related data: normalise it into separate tables, then
          reconstruct it at query time using JOIN. The document model's approach: store everything
          that belongs together in one place. This is called
          <strong style={{ color: 'var(--text)' }}> colocation</strong>.
        </Para>

        <Para>
          Colocation is a deliberate trade-off: you accept some data duplication in exchange for
          read performance. If 95% of the time you read a restaurant's full information (name,
          location, hours, menu, ratings), it is faster to retrieve it as one document than to
          execute 5 JOIN operations across 5 tables. The document model optimises for the
          common-case read pattern.
        </Para>

        <CodeBox label="Relational vs Document — restaurant menu storage compared">
{`/* ─── RELATIONAL MODEL ─── 5 tables, 5 JOINs needed ─── */

restaurants (restaurant_id, name, address, city, rating, opening_time, closing_time)
menu_categories (category_id, restaurant_id FK, name, display_order)
menu_items (item_id, category_id FK, name, description, price, is_veg, prep_time)
item_images (image_id, item_id FK, url, is_primary)
item_allergens (item_id FK, allergen)

-- Query to get full restaurant info for display:
SELECT r.name, r.address, mc.name as category,
       mi.name as item, mi.price, mi.is_veg,
       ii.url as image, ia.allergen
FROM restaurants r
JOIN menu_categories mc ON r.restaurant_id = mc.restaurant_id
JOIN menu_items mi ON mc.category_id = mi.category_id
LEFT JOIN item_images ii ON mi.item_id = ii.item_id AND ii.is_primary = true
LEFT JOIN item_allergens ia ON mi.item_id = ia.item_id
WHERE r.restaurant_id = 'R001';
-- 5 JOINs. Multiple table reads. Complex query. Potentially slow at scale.


/* ─── DOCUMENT MODEL ─── 1 collection, 1 read ─── */

// One MongoDB document — entire restaurant in one place
{
  "_id": "R001",
  "name": "Biryani House",
  "address": { "street": "45 Brigade Road", "city": "Bengaluru", "pincode": "560001" },
  "rating": 4.6,
  "hours": { "open": "11:00", "close": "23:00" },
  "menu": [
    {
      "category": "Biryani",
      "items": [
        {
          "name": "Chicken Biryani",
          "price": 280,
          "is_veg": false,
          "prep_time_mins": 25,
          "images": ["https://cdn.example.com/img/cb1.jpg"],
          "allergens": ["gluten", "dairy"]
        },
        {
          "name": "Veg Biryani",
          "price": 220,
          "is_veg": true,
          "prep_time_mins": 20,
          "images": ["https://cdn.example.com/img/vb1.jpg"],
          "allergens": []
        }
      ]
    }
  ]
}

// Query: db.restaurants.findOne({ "_id": "R001" })
// One network round-trip. One disk read (if cached). Full restaurant returned.`}
        </CodeBox>

        <SubTitle>When the Document Model Struggles — The JOIN Problem</SubTitle>

        <Para>
          The document model's strength (colocation) becomes a weakness when you need to query
          across documents in ways that were not anticipated when the schema was designed.
          The relational model can answer any question about any combination of attributes.
          The document model can efficiently answer questions about attributes within
          a single document — but cross-document queries require either denormalisation
          (storing the same data in multiple documents) or application-level joins
          (fetching multiple documents and correlating them in code).
        </Para>

        <CodeBox label="Cross-document query problem — document model's Achilles heel">
{`// Relational: "Find all restaurants in Bengaluru that serve veg biryani under ₹200"
// Clean single SQL query
SELECT DISTINCT r.name, r.rating
FROM restaurants r
JOIN menu_categories mc ON r.restaurant_id = mc.restaurant_id
JOIN menu_items mi ON mc.category_id = mi.category_id
WHERE r.city = 'Bengaluru'
  AND mc.name = 'Biryani'
  AND mi.is_veg = true
  AND mi.price < 200;


// MongoDB: same query
db.restaurants.find({
  "address.city": "Bengaluru",
  "menu": {
    $elemMatch: {
      "category": "Biryani",
      "items": {
        $elemMatch: {
          "is_veg": true,
          "price": { $lt: 200 }
        }
      }
    }
  }
}, { name: 1, rating: 1 });

// MongoDB can do this — but it gets complex fast.
// Harder to read, harder to debug, harder to index optimally.

// Now: "For each order placed in the last 7 days, show the customer's name,
//       the restaurant name, and total items ordered"
// This requires customers + orders + restaurants to be joined.
// In MongoDB, this requires $lookup (server-side join) which is
// significantly more complex and often slower than relational JOIN.
// This is the query the document model was NOT designed for.`}
        </CodeBox>

        <SubTitle>Schema Flexibility — Gift and Curse</SubTitle>

        <Para>
          Document databases have no enforced schema — every document in a collection can have
          different fields. This is liberating during rapid development: you can add new fields
          to new documents without migrating existing ones. It is dangerous at production scale:
          without discipline, you end up with documents in the same collection having 15 different
          slightly incompatible shapes, and application code becomes a maze of null checks and
          field existence tests.
        </Para>

        <Para>
          Modern MongoDB (since version 3.6) supports
          <strong style={{ color: 'var(--text)' }}> schema validation</strong> — JSON Schema rules
          that documents must satisfy before being inserted. This is schema-on-write, similar to
          relational database constraints. Most mature MongoDB deployments use schema validation
          heavily. In other words, they re-introduce schema rigidity by choice — because the
          production pain of fully schemaless data is too high.
        </Para>
      </section>

      {/* ========================================
          PART 9 — KEY-VALUE MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Speed Above All" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#ff4757', background: 'rgba(255,71,87,0.1)',
            border: '1px solid rgba(255,71,87,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 08</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>2003–Present — Redis, DynamoDB, etcd</span>
        </div>

        <SectionTitle>The Key-Value Model — The Simplest Model, The Fastest Access</SectionTitle>

        <Para>
          The key-value model is, by design, the simplest data model that can meaningfully be called
          a database. The entire model consists of one concept: a
          <strong style={{ color: 'var(--text)' }}> key</strong> that uniquely identifies a record,
          and a <strong style={{ color: 'var(--text)' }}> value</strong> associated with that key.
          The database makes no assumptions about the structure of the value — it is treated as an
          opaque blob (in simple key-value stores) or as a typed data structure (in Redis).
        </Para>

        <Para>
          This simplicity is not a limitation — it is the source of the key-value model's primary
          virtue: <strong style={{ color: 'var(--text)' }}>speed</strong>. With no schema to enforce,
          no relationships to validate, no indexes to maintain on value contents, and no query
          parsing (just a direct hash table lookup), key-value operations execute in microseconds.
          Redis, the most widely used key-value store, serves millions of operations per second
          from a single server.
        </Para>

        <SubTitle>Redis — Beyond Simple Key-Value</SubTitle>

        <Para>
          Amazon's Dynamo paper (2007) popularised the key-value model for distributed systems.
          Redis (2009) took the model further by defining a rich set of value types that can be
          operated on atomically at the server — making it far more powerful than a simple
          GET/SET store.
        </Para>

        <CodeBox label="Redis data types and production use cases">
{`# ─── STRING ─── The fundamental type
SET user:session:abc123 "{"user_id": 1001, "role": "customer", "cart_id": "C789"}"
GET user:session:abc123
EXPIRE user:session:abc123 3600  # Auto-delete after 1 hour (session expiry)

# Use case: session storage, OTP codes, feature flags, short-term caches
SET otp:9876543210 "284731"
EXPIRE otp:9876543210 300  # OTP expires in 5 minutes

# ─── COUNTER ─── Atomic increment
INCR page_views:blog:dbms-introduction   # Thread-safe counter
INCRBY api:rate_limit:user:1001 1        # Rate limiting — incr per request
GET api:rate_limit:user:1001             # Check current request count

# ─── HASH ─── Object storage without serialisation
HSET user:1001 name "Rahul Sharma" city "Bengaluru" tier "gold"
HGET user:1001 name        # Returns: "Rahul Sharma"
HGETALL user:1001          # Returns all fields
HINCRBY user:1001 order_count 1  # Atomic field increment

# Use case: user profiles, product metadata, any object with many fields

# ─── SORTED SET ─── Leaderboard
ZADD game:leaderboard 9842 "player:Rahul"
ZADD game:leaderboard 8731 "player:Priya"
ZADD game:leaderboard 9156 "player:Arjun"
ZREVRANGE game:leaderboard 0 9 WITHSCORES  # Top 10 players, sorted by score
ZRANK game:leaderboard "player:Priya"       # Priya's rank

# ─── LIST ─── Message queue / Recent activity
LPUSH notifications:user:1001 "Your order #ORD-4521 was delivered"
RPOP  notifications:user:1001  # Consume notification
LRANGE notifications:user:1001 0 9  # Last 10 notifications

# ─── SET ─── Unique collections
SADD online_users 1001 1002 1003
SISMEMBER online_users 1001  # Is user 1001 online? O(1) check
SUNION online_users:server1 online_users:server2  # Union across servers`}
        </CodeBox>

        <SubTitle>Why Every Large Application Uses Redis</SubTitle>

        <Para>
          Redis sits in front of your primary relational database as a
          <strong style={{ color: 'var(--text)' }}> cache layer</strong>. The architecture is:
          application first checks Redis; if the data is there (cache hit), return it immediately
          (microseconds). If not (cache miss), query the relational database (milliseconds),
          store the result in Redis, return it. For frequently-read data — user profiles, product
          information, configuration values, search results — the cache hit rate in a well-tuned
          system is 80–95%. This means 80–95% of reads never touch the database at all.
          At Swiggy's scale (10 million orders per day), eliminating even 80% of database reads
          is the difference between a functioning system and one that requires 5x the database
          infrastructure.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Cache-aside pattern — the most common Redis usage</div>
          <CodeBox>
{`# Python (Flask + Redis + PostgreSQL)

def get_restaurant(restaurant_id: str):
    cache_key = f"restaurant:{restaurant_id}"
    
    # Step 1: Check Redis cache
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)  # Cache hit — microseconds
    
    # Step 2: Cache miss — query PostgreSQL
    restaurant = db.query(
        "SELECT * FROM restaurants WHERE id = %s",
        [restaurant_id]
    )
    
    # Step 3: Store in Redis with 5-minute TTL
    redis_client.setex(
        cache_key,
        300,  # 300 seconds = 5 minutes
        json.dumps(restaurant)
    )
    
    return restaurant  # Milliseconds on first call, microseconds after`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 10 — COLUMN-FAMILY MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 10 — Web-Scale Writes" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#f97316', background: 'rgba(249,115,22,0.1)',
            border: '1px solid rgba(249,115,22,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 09</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>2008–Present — Cassandra, HBase, Bigtable</span>
        </div>

        <SectionTitle>The Column-Family Model — Designed for Petabyte-Scale Writes</SectionTitle>

        <Para>
          Google's Bigtable paper (2006) and Amazon's Dynamo paper (2007) described internal
          systems built to handle data volumes that no existing database could manage.
          Apache HBase (2008, based on Bigtable) and Apache Cassandra (2008, combining
          Bigtable's data model with Dynamo's distributed architecture) brought these ideas
          to the open-source world.
        </Para>

        <Para>
          The column-family model is often misunderstood because its name sounds like it is
          simply "column-oriented storage" — a performance optimisation used by analytical
          databases like DuckDB and ClickHouse. It is not. The column-family model is a
          fundamentally different data model.
        </Para>

        <SubTitle>Understanding the Column-Family Structure</SubTitle>

        <Para>
          In the relational model, a row has a fixed set of columns — every row in the table
          has the same columns, even if some are NULL. In the column-family model, rows can have
          completely different sets of columns. Columns are grouped into
          <strong style={{ color: 'var(--text)' }}> column families</strong> — predefined at
          schema creation time. Within a column family, rows can have any number of
          <strong style={{ color: 'var(--text)' }}> column qualifiers</strong> (the actual
          column names), and these can differ from row to row.
        </Para>

        <CodeBox label="Column-family model — user activity tracking example">
{`// Cassandra table — user activity with time-series data
// Each row is a user's activity record for a specific time bucket

Table: user_activity
  Partition key: (user_id, date)  -- determines which server stores this row
  Clustering key: event_time      -- within a partition, rows sorted by time

Row for user 1001, date 2024-03-15:
  [user_id: 1001, date: 2024-03-15]
    event_time: 09:14:23 | event_type: "login"      | device: "Android"
    event_time: 09:15:01 | event_type: "view"       | page: "home"     | session: "S892"
    event_time: 09:16:44 | event_type: "search"     | query: "biryani" | results: 47
    event_time: 09:17:12 | event_type: "view"       | page: "restaurant/R001"
    event_time: 09:18:55 | event_type: "order_start"| cart_id: "C341"
    event_time: 09:21:03 | event_type: "payment"    | amount: 280      | method: "UPI"

// Notice: different events have different columns (extra fields).
// "login" has "device". "search" has "query" and "results".
// "payment" has "amount" and "method". This is legal in column-family model.

// Query: get all events for user 1001 on 2024-03-15
SELECT * FROM user_activity
WHERE user_id = 1001 AND date = '2024-03-15';
-- Returns all 6 rows above. One partition = one server read.

// Query: get events between specific times
SELECT * FROM user_activity
WHERE user_id = 1001 AND date = '2024-03-15'
  AND event_time >= '09:15:00' AND event_time <= '09:20:00';
-- Efficient: clustering key is sorted, so this is a range scan within the partition.`}
        </CodeBox>

        <SubTitle>Cassandra's Distributed Architecture — Why It Scales</SubTitle>

        <Para>
          Cassandra's write performance comes from its architecture:
          <strong style={{ color: 'var(--text)' }}> no master node</strong>. Every node in a
          Cassandra cluster is equal. A write request can be handled by any node. The node
          receiving the request (the coordinator) uses a consistent hashing algorithm to
          determine which nodes should store the data, forwards the write to those nodes,
          and returns success once enough nodes have acknowledged (the number is configurable).
        </Para>

        <Para>
          This means Cassandra scales linearly: double the number of nodes, roughly double the
          write throughput. Netflix uses Cassandra to store viewing history for 280+ million
          subscribers — approximately 1 trillion write operations per day. No relational database
          can handle that write volume without heroic infrastructure and complex sharding.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Critical Design Constraint — Query-First Design</div>
          <Para>
            Cassandra's biggest gotcha for developers coming from a relational background:
            <strong style={{ color: 'var(--text)' }}> you must design your data model around
            your queries</strong> — not around your entities. In a relational database, you model
            entities (customers, orders, products), create tables, and then JOIN them in any
            query pattern. In Cassandra, you model your queries first, then design a table
            that serves exactly that query pattern. If you need to query the same data in two
            different patterns, you typically create two separate tables with the same data stored
            in two different arrangements. Data duplication is not just acceptable — it is expected
            and designed for. This is a radical inversion of relational normalisation philosophy.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 11 — GRAPH MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 11 — Relationships as First-Class Citizens" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            color: '#8b5cf6', background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.25)', borderRadius: 5,
            padding: '4px 10px', letterSpacing: '.1em', textTransform: 'uppercase',
          }}>Model 10</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>2007–Present — Neo4j, Amazon Neptune</span>
        </div>

        <SectionTitle>The Graph Model — When Relationships Are More Important Than Data</SectionTitle>

        <Para>
          In the relational model, relationships between entities are represented by storing
          foreign key values and joining tables at query time. Join operations are computed
          dynamically — the database searches for matching values across two sets of rows.
          As the depth of relationships increases (friends of friends of friends), the join
          operations multiply and the performance degrades dramatically.
        </Para>

        <Para>
          The graph model takes a fundamentally different approach: store relationships as
          first-class data structures — actual edges in the graph, with their own properties
          and direct pointers to the nodes they connect. Traversing a relationship in a graph
          database is a direct pointer follow — O(1) per hop — rather than a set intersection
          operation. For highly connected data, this difference is the difference between a
          query that returns in 50 milliseconds and one that times out.
        </Para>

        <SubTitle>Graph Model Structure — Nodes, Edges, Properties</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { term: 'Node', color: '#8b5cf6', desc: 'A node is an entity in the graph — a person, a product, a city, a transaction. Nodes have labels (like a type tag) and properties (key-value attributes). A single node can have multiple labels: a person might be labelled both :Customer and :Employee.' },
            { term: 'Edge (Relationship)', color: 'var(--accent)', desc: 'An edge is a directed, named relationship between two nodes. Every edge has a type (FRIENDS_WITH, PURCHASED, LIVES_IN, MANAGES) and can also have properties (since, weight, amount). Edges are stored as direct pointers — traversal is a pointer follow, not a search.' },
            { term: 'Properties', color: '#0078d4', desc: 'Both nodes and edges can have properties — arbitrary key-value pairs. A PURCHASED edge can have a purchase_date and amount property. Properties make the graph model extremely expressive without requiring additional tables.' },
            { term: 'Labels', color: '#f97316', desc: 'Labels categorise nodes and allow efficient filtering. A node labelled :Product AND :Electronics can be found by either label. Labels are like light-weight table membership — a node can belong to multiple categories simultaneously.' },
          ].map((item) => (
            <div key={item.term} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.term}</div>
              <Para>{item.desc}</Para>
            </div>
          ))}
        </div>

        <SubTitle>Cypher — The Declarative Graph Query Language</SubTitle>

        <Para>
          Neo4j's Cypher query language is designed to express graph patterns in a way that
          visually resembles the graph structure itself. Nodes are represented as
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>(n)</code>,
          relationships as <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>-[r]-&gt;</code>.
          This visual correspondence makes Cypher queries far more readable than their
          equivalent SQL for graph-shaped problems.
        </Para>

        <CodeBox label="Cypher vs SQL — friend recommendation, 3 degrees of separation">
{`-- SQL: Find all users who are friends-of-friends-of-friends with user 1001
-- (3-hop traversal in relational model)
SELECT DISTINCT u3.user_id, u3.name
FROM friendships f1
JOIN friendships f2 ON f1.friend_id = f2.user_id
JOIN friendships f3 ON f2.friend_id = f3.user_id
JOIN users u3       ON f3.friend_id = u3.user_id
WHERE f1.user_id = 1001
  AND f3.friend_id != 1001
  AND f3.friend_id NOT IN (
    SELECT friend_id FROM friendships WHERE user_id = 1001
  );
-- 3 self-joins on a 500M-row friendships table.
-- On LinkedIn-scale data, this query can take MINUTES.


-- Cypher: Same query — and it reads like plain English
MATCH (me:User {user_id: 1001})-[:FRIENDS_WITH*3]-(recommendation:User)
WHERE NOT (me)-[:FRIENDS_WITH]-(recommendation)
  AND recommendation.user_id <> 1001
RETURN DISTINCT recommendation.user_id, recommendation.name;
-- Neo4j traverses the graph directly.
-- On the same data, this query takes MILLISECONDS.
-- The *3 means: traverse FRIENDS_WITH edges exactly 3 hops.


-- Fraud detection: find circular payment patterns (signs of money laundering)
MATCH path = (a:Account)-[:TRANSFERRED_TO*4..6]-(a)
WHERE ALL(tx IN relationships(path) WHERE tx.amount > 50000)
RETURN path;
-- In SQL: 4-6 self-joins on a transactions table. Possibly intractable.
-- In Cypher: efficient graph traversal returning suspicious circular paths.`}
        </CodeBox>

        <SubTitle>Real-World Graph Database Use Cases</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {[
            { useCase: 'LinkedIn — People You May Know', desc: 'Every recommendation ("Rahul knows Priya, who knows Arjun, who knows you") is a graph traversal. LinkedIn\'s entire connection network — 900+ million members, billions of connections — is stored in a graph database. A relational JOIN at this scale for 2-hop recommendations would be unusably slow.' },
            { useCase: 'PayTM / Razorpay — Fraud Detection', desc: 'Fraudulent behaviour often creates unusual graph patterns — a single entity connected to many accounts, circular fund transfers, unusually dense connection clusters. These patterns are trivial to detect with graph queries and practically impossible to detect with relational queries at transaction volume.' },
            { useCase: 'Amazon / Flipkart — Recommendation Engine', desc: '"Customers who bought X also bought Y and Z" is a graph problem: find products that are connected via shared-purchase edges to the products the user has purchased, weighted by frequency. Graph databases store these purchase-connection graphs and traverse them in real time.' },
            { useCase: 'Uber / Ola — Route Optimisation', desc: 'A city\'s road network is literally a graph — intersections are nodes, roads are edges, distances and traffic data are edge properties. Graph databases with specialised shortest-path algorithms (Dijkstra, A*) are the natural tool for routing and ETA calculation.' },
          ].map((item) => (
            <div key={item.useCase} style={{
              display: 'flex', gap: 14, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px',
            }}>
              <span style={{ color: '#8b5cf6', flexShrink: 0, fontWeight: 700, marginTop: 2 }}>▸</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.useCase}</div>
                <Para>{item.desc}</Para>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 12 — COMPREHENSIVE COMPARISON
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 12 — The Decision Framework" />
        <SectionTitle>Choosing the Right Data Model — A Complete Decision Framework</SectionTitle>

        <Para>
          In real engineering, you rarely choose a single data model for an entire system.
          Modern architectures use multiple data models simultaneously — each selected for the
          specific access pattern and data type it handles best. This is called
          <strong style={{ color: 'var(--text)' }}> polyglot persistence</strong>: using multiple
          database types in a single system, each serving its own purpose.
        </Para>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Model', 'Data Shape', 'Query Style', 'Scales', 'ACID?', 'Best For', 'Avoid When'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 12px',
                    color: 'var(--muted)', fontWeight: 700,
                    fontSize: 10, letterSpacing: '.1em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Relational', 'Structured, tabular', 'SQL — declarative, flexible', 'Vertically well, horizontal hard', '✓ Full ACID', 'Financial data, ERP, any structured business data', 'Deep nesting, web-scale writes, highly variable schema'],
                ['Document', 'Nested JSON documents', 'Pattern matching on fields', 'Horizontally well', '✓ Single-doc ACID', 'Product catalogs, content, user profiles, rapidly evolving schema', 'Many cross-document joins, strict consistency'],
                ['Key-Value', 'Opaque blobs/typed values', 'GET/SET by key only', 'Extremely well', '✓ Single-key ops', 'Caching, sessions, counters, queues, leaderboards', 'Complex queries, relations between data'],
                ['Column-Family', 'Wide rows, sparse columns', 'Partition key + clustering key', 'Linearly at petabyte scale', '✕ Eventual consistency by default', 'Time-series, write-heavy, IoT, activity logging', 'Ad-hoc queries, complex aggregations, joins'],
                ['Graph', 'Nodes + edges + properties', 'Pattern matching traversal', 'Node depth well, breadth medium', '✓ Full ACID (Neo4j)', 'Social networks, fraud detection, recommendations, routing', 'Simple tabular data, non-connected data, bulk aggregations'],
                ['Hierarchical', 'Tree (parent-child)', 'Navigational / procedural', 'Single server', '✕ Varies', 'File systems, XML, bill of materials, org charts', 'Many-to-many relationships, ad-hoc queries'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i === 0 ? 'rgba(0,230,118,0.04)' : i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '12px 12px',
                      color: j === 0 ? 'var(--text)' : j === 4 ? (cell.includes('✓') ? 'var(--accent)' : '#ff4757') : 'var(--text2)',
                      fontWeight: j === 0 ? 700 : 400,
                      fontFamily: j === 0 ? 'Syne, sans-serif' : 'Inter, sans-serif',
                      fontSize: 12, lineHeight: 1.6,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SubTitle>The Polyglot Persistence Architecture — A Real Example</SubTitle>

        <Para>
          Let's design the data architecture for a comprehensive e-commerce platform
          (think Flipkart) using the right model for each concern:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[
            {
              dataType: 'User accounts, orders, payments, invoices',
              model: 'PostgreSQL (Relational)',
              color: 'var(--accent)',
              why: 'These are the financial and legal core of the business. They are highly structured, highly interconnected, and require full ACID transactions. A payment that partially succeeds is a disaster. Relational is the only correct choice.',
            },
            {
              dataType: 'Product catalog — names, descriptions, images, attributes',
              model: 'MongoDB (Document)',
              color: '#4285f4',
              why: 'Every product type has completely different attributes. A TV has screen size, resolution, refresh rate. A shirt has size, colour, material, fit. These attributes are nested, flexible, and always read as a complete unit. Document model avoids 20 JOINs per product page view.',
            },
            {
              dataType: 'User sessions, shopping cart, recently viewed',
              model: 'Redis (Key-Value)',
              color: '#ff4757',
              why: 'Session data is short-lived, frequently accessed, and has no complex relationships. Redis delivers sub-millisecond access, handles automatic expiry (TTL), and is horizontally scalable. Storing sessions in PostgreSQL would create unnecessary load on the primary database.',
            },
            {
              dataType: 'Product recommendation engine — "also bought"',
              model: 'Neo4j (Graph)',
              color: '#8b5cf6',
              why: 'The connection graph between users and products (via purchase history) is the data that powers recommendations. Finding which products cluster together in user purchase histories is a graph traversal problem. A relational approach requires multiple self-joins on a massive purchase table.',
            },
            {
              dataType: 'Clickstream, page views, search queries (analytics)',
              model: 'Cassandra or ClickHouse',
              color: '#f97316',
              why: 'Clickstream data is pure append — no updates, no deletes, only inserts. Volume can be billions of events per day. Cassandra handles the write volume. ClickHouse (columnar) handles the analytical queries over the historical data.',
            },
            {
              dataType: 'Product search — full-text, filters, facets',
              model: 'Elasticsearch (Search Engine)',
              color: '#facc15',
              why: 'Full-text search across millions of product descriptions, with filters, relevance ranking, typo tolerance, and faceted counts (\"23 results in Electronics\") requires an inverted index structure that relational databases cannot efficiently provide.',
            },
          ].map((item) => (
            <div key={item.dataType} style={{
              display: 'flex', gap: 0, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
              <div style={{ padding: '16px 20px', flex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.dataType}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 5, padding: '2px 8px', fontFamily: 'var(--font-mono)' }}>→ {item.model}</span>
                </div>
                <Para>{item.why}</Para>
              </div>
            </div>
          ))}
        </div>

        <Callout type="tip">
          <strong>The interview answer that impresses senior engineers:</strong> When asked "SQL or NoSQL?"
          never say one is better than the other. The correct answer is always "it depends on the
          access pattern, consistency requirements, data shape, and scale." Then explain the specific
          trade-offs for the scenario at hand. Engineers who say "just use PostgreSQL for everything"
          or "NoSQL is better because it scales" are revealing that they don't understand data modelling.
          The right answer is always contextual.
        </Callout>
      </section>

      {/* ========================================
          PART 13 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 13 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Database Selection Meeting — A Real Engineering Discussion</SectionTitle>

        <Para>
          Architecture decisions involving data models happen most visibly in two situations:
          when a new system is being built from scratch, and when an existing system is hitting
          the limits of its current data model. Here is what both conversations sound like.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario 1 — New System Architecture Meeting at a Fintech Startup
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { role: 'Product Manager', color: 'var(--muted)', msg: '"We\'re building a peer-to-peer lending platform. Lenders create loan offers. Borrowers apply. We need to match them, track repayments, and calculate risk scores. What database should we use?"' },
              { role: 'Junior Engineer (wrong answer)', color: '#ff4757', msg: '"MongoDB. It\'s more scalable than SQL and we don\'t know the full schema yet."' },
              { role: 'Senior Engineer (correcting)', color: 'var(--accent)', msg: '"That would be a serious mistake. Loan data — offer amounts, repayment schedules, interest calculations, transaction records — is exactly the kind of data that requires ACID transactions. If a repayment is processed and the database half-commits, some borrowers will be marked as paid without money actually being transferred. MongoDB\'s single-document atomicity is insufficient for cross-document financial transactions."' },
              { role: 'Senior Engineer (continues)', color: 'var(--accent)', msg: '"PostgreSQL for the core financial data. The schema is actually quite clear: users, loan_offers, loan_applications, loan_agreements, repayment_schedule, repayment_transactions. All structured, all interconnected, all requiring strict integrity. We might add Redis later for caching credit scores and session data, but start with PostgreSQL."' },
              { role: 'Junior Engineer', color: 'var(--muted)', msg: '"But what about schema flexibility? We might need to add fields as the product evolves."' },
              { role: 'Senior Engineer', color: 'var(--accent)', msg: '"PostgreSQL\'s ALTER TABLE ADD COLUMN is non-blocking for adding nullable columns — it\'s a metadata-only operation in modern PostgreSQL, it doesn\'t lock the table. Schema evolution in PostgreSQL is much less painful than people think. And if we genuinely have flexible fields for loan risk metadata, we use a JSONB column for exactly that — structured data in PostgreSQL, flexible data in a JSONB column, same database."' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30`, borderRadius: 5, padding: '3px 8px', fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0, marginTop: 3, whiteSpace: 'nowrap' }}>{item.role}</span>
                <Para>{item.msg}</Para>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario 2 — Existing System Hitting Limits
          </div>
          <Para>
            An e-commerce company's product page is taking 4 seconds to load.
            A senior engineer runs EXPLAIN ANALYZE and finds the culprit:
          </Para>
          <CodeBox label="The slow query — 7 joins, 800ms on product page">
{`-- Product detail page query — currently 800ms at 50K concurrent users
SELECT
    p.name, p.description, p.base_price,
    b.name AS brand,
    array_agg(DISTINCT c.name) AS categories,
    array_agg(DISTINCT pi.url ORDER BY pi.sort_order) AS images,
    array_agg(DISTINCT pa.attribute_name || ': ' || pa.attribute_value) AS attributes,
    json_agg(DISTINCT jsonb_build_object(
        'sku', pv.sku, 'size', pv.size, 'color', pv.color,
        'price', pv.price, 'stock', pv.stock_count
    )) AS variants
FROM products p
JOIN brands b ON p.brand_id = b.brand_id
LEFT JOIN product_categories pc ON p.product_id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.category_id
LEFT JOIN product_images pi ON p.product_id = pi.product_id
LEFT JOIN product_attributes pa ON p.product_id = pa.product_id
LEFT JOIN product_variants pv ON p.product_id = pv.product_id
WHERE p.product_id = 'P-8821'
GROUP BY p.product_id, p.name, p.description, p.base_price, b.name;`}
          </CodeBox>
          <Para>
            The diagnosis: this product data is essentially a document — it's always read as a
            complete unit, never partially. Seven JOINs at this traffic volume is the wrong model
            for this access pattern. The decision:
          </Para>
          <CodeBox label="The solution — MongoDB for product catalog, PostgreSQL for orders">
{`// 1. Migrate product catalog to MongoDB
//    (keep orders, customers, payments in PostgreSQL)

// New MongoDB document — same data, one read
const product = await db.collection('products').findOne(
    { product_id: 'P-8821' },
    { projection: { name:1, description:1, brand:1, categories:1, images:1, attributes:1, variants:1 }}
);
// Query time: 12ms (was 800ms)
// Zero JOINs. One document. One disk read.

// 2. Add Redis cache layer
//    Product data changes rarely — cache for 30 minutes
const cacheKey = \`product:\${productId}\`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);  // 0.2ms

const product = await mongo.findOne(...);
await redis.setex(cacheKey, 1800, JSON.stringify(product));
return product;
// After cache warmup: 0.2ms per product page (was 800ms)
// 4000x improvement. No application logic changes. No new features lost.`}
          </CodeBox>
          <Para>
            This is what data model knowledge enables: recognising when a data model mismatch
            is causing performance problems, and knowing which alternative model fits the
            access pattern better. A developer who knows only SQL would keep adding indexes
            to the 7-join query. A developer who understands data models correctly diagnoses
            the root cause and applies the right tool.
          </Para>
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A data model is a formal framework defining structure (how data is organised), operations (what you can do with data), and constraints (what rules must hold). Every DBMS is built on a specific data model.',
        'The hierarchical model (1960s, IBM IMS) organises data as trees — one parent per child. Fast for known-path queries, but cannot represent many-to-many relationships without duplication. Still running in banks worldwide.',
        'The network model (1969, CODASYL) allowed multiple parents per record — solving many-to-many. Still navigational and procedural — no declarative query language. Direct ancestor of modern graph databases.',
        'The relational model (1970, Codd) built on set theory and predicate logic — the most mathematically rigorous data model ever created. Tables, relational algebra, SQL, and ACID transactions. Dominant for 50+ years because of its formal foundation, physical-logical separation, and declarative SQL.',
        'The object-oriented model (1980s–90s) stored objects directly — solving the impedance mismatch. Failed to replace relational because relational extended itself (object-relational model, PostgreSQL JSONB), and the SQL ecosystem was too entrenched.',
        'Document model (MongoDB, 2007+) stores self-contained JSON documents — optimised for colocation (read all related data in one operation). Best for flexible schema and nested data. Weak at cross-document joins and strict multi-record consistency.',
        'Key-value model (Redis) is the simplest and fastest model — direct hash table lookup in microseconds. Used as a cache layer in front of every primary database in high-traffic systems. Not a primary database.',
        'Column-family model (Cassandra, HBase) designed for petabyte-scale write workloads with no single point of failure. Requires query-first design — data model must be designed around access patterns, not entities. Netflix, IoT, time-series.',
        'Graph model (Neo4j) makes relationships first-class — direct pointer traversal instead of JOIN computation. Transformative for connected data (social networks, fraud, recommendations, routing). Poor for non-connected tabular data.',
        'Polyglot persistence is the correct modern architecture: PostgreSQL for structured financial/transactional data, MongoDB or JSONB for flexible nested data, Redis for caching and sessions, Cassandra for write-heavy time-series, graph databases for connection-heavy workloads. No single model wins everything.',
      ]} />

    </LearnLayout>
  )
}