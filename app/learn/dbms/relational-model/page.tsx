import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Relational Model & Keys — Complete Guide | DBMS | Chaduvuko',
  description:
    'The complete relational model from mathematical foundations — relations, tuples, domains, schemas, integrity constraints, and every key type explained with full depth: super key, candidate key, primary key, foreign key, composite key, surrogate key, and alternate key.',
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

export default function RelationalModel() {
  return (
    <LearnLayout
      title="Relational Model & Keys"
      description="The mathematical bedrock of every relational database — from Codd's formal definitions to every key type, every integrity constraint, and every design decision that flows from them."
      section="DBMS"
      readTime="85–100 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — THE FORMAL MATHEMATICAL FOUNDATIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Mathematics" />
        <SectionTitle>The Relational Model — Built on Set Theory, Not Intuition</SectionTitle>

        <Para>
          Most students learn the relational model by looking at tables in a spreadsheet and
          saying "oh, it's just rows and columns." That understanding is correct but dangerously
          shallow. The reason the relational model has endured for 55 years while every other
          data model has come and gone is not because tables are intuitive — it is because
          the relational model is built on a rigorous mathematical foundation that gives it
          provably correct semantics. Understanding that foundation is what separates someone
          who uses a database from someone who designs one correctly.
        </Para>

        <Para>
          Edgar Codd was a mathematician before he was a computer scientist. When he designed
          the relational model in 1970, he deliberately grounded it in two branches of
          established mathematics: <strong style={{ color: 'var(--text)' }}>set theory</strong>
          (specifically, the theory of relations between sets) and
          <strong style={{ color: 'var(--text)' }}> first-order predicate logic</strong>
          (the language of logical conditions over variables). This choice was not accidental —
          it gave every database operation a provable meaning, and it gave the query language
          (eventually SQL) a mathematical model that could be formally analysed.
        </Para>

        <SubTitle>Mathematical Relation vs Relational Table — The Precise Connection</SubTitle>

        <Para>
          In mathematics, a <strong style={{ color: 'var(--text)' }}>relation</strong> between
          sets D₁, D₂, ..., Dₙ is a subset of the Cartesian product D₁ × D₂ × ... × Dₙ.
          The Cartesian product D₁ × D₂ × ... × Dₙ is the set of all possible ordered
          n-tuples where the first element comes from D₁, the second from D₂, and so on.
          A relation is a selected subset of those possible tuples — specifically, the tuples
          that represent true facts about the real world.
        </Para>

        <CodeBox label="Mathematical definition — made concrete">
{`// Domain definitions:
D_customer_id = { all strings matching pattern 'C' followed by digits }
D_name        = { all non-empty strings up to 100 characters }
D_city        = { 'San Francisco', 'Austin', 'New York', 'Boston', 'Chicago', 'Delhi', ... }
D_age         = { integers from 0 to 150 }

// Cartesian product D_customer_id × D_name × D_city × D_age:
// contains EVERY possible combination:
// ('C001', 'Rahul Sharma', 'San Francisco', 28)
// ('C001', 'Rahul Sharma', 'San Francisco', 29)
// ('C001', 'Rahul Sharma', 'New York', 28)
// ... (infinite combinations)

// The CUSTOMERS RELATION is a specific SUBSET of this Cartesian product:
// Only the tuples that represent real customers:
CUSTOMERS = {
  ('C001', 'Rahul Sharma',  'San Francisco', 28),
  ('C002', 'Priya Reddy',   'Austin', 31),
  ('C003', 'Arjun Nair',    'New York',    24),
  ('C004', 'Kavya Krishnan','San Francisco', 35),
}
// This set of 4 tuples IS the relation.
// It represents the true facts about customers at this moment in time.

// KEY MATHEMATICAL PROPERTY: It is a SET — which means:
// 1. No two identical elements (no duplicate tuples)
// 2. The elements have no inherent order (sets are unordered)
// These two properties have profound implications for database design.`}
        </CodeBox>

        <Para>
          This mathematical grounding explains several features of SQL that seem arbitrary until
          you understand the set theory behind them. Why does <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>SELECT DISTINCT</code> exist?
          Because SQL relations are technically multisets (they can have duplicates, which pure
          sets cannot) — DISTINCT converts a multiset back to a proper set. Why does
          <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}> ORDER BY</code> only affect display and not the underlying data?
          Because a set has no inherent order — ORDER BY is a display instruction, not a
          property of the relation itself. Why can relational algebra operations
          compose arbitrarily? Because every operation takes a relation (set) as input
          and produces a relation (set) as output — closure under composition.
        </Para>
      </section>

      {/* ========================================
          PART 2 — CORE TERMINOLOGY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The Vocabulary" />
        <SectionTitle>Every Term in the Relational Model — Precise Definitions</SectionTitle>

        <Para>
          Every technical domain has precise vocabulary — and the relational model is particularly
          careful about its terminology. The same concept has both a formal mathematical name
          and an informal everyday name. You must know both because different contexts use
          different names. A textbook uses "tuple." A job description says "row." An interview
          question might use either. Knowing only one will confuse you.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 32 }}>
          {[
            {
              formal: 'Relation',
              informal: 'Table',
              color: '#0078d4',
              definition: 'A named, two-dimensional structure consisting of rows and columns that represents a single entity type or relationship type from the real world. A relation is formally a set of tuples — all sharing the same schema.',
              depth: 'The name "relation" comes directly from the mathematical concept. A relation has a name (customers, orders), a schema (the column definitions), and an extension (the actual rows currently stored). These are distinct concepts — a relation\'s schema is stable, its extension changes with every INSERT, UPDATE, and DELETE.',
              sqlEquivalent: 'CREATE TABLE customers (...) defines the schema. The rows in the table at any moment are the extension.',
              example: 'The customers relation has schema (customer_id, name, city, age) and an extension of 4 rows.',
            },
            {
              formal: 'Tuple',
              informal: 'Row / Record',
              color: 'var(--accent)',
              definition: 'A single ordered list of values — one value per attribute — representing one specific instance of the entity or relationship that the relation models.',
              depth: 'In mathematical set theory, a tuple is an ordered sequence. In the relational model, the order of attributes in a tuple is significant in the formal definition but irrelevant in SQL (SQL accesses attributes by name, not position). This apparent contradiction is resolved by treating each tuple as a mapping from attribute names to values, not as a positional sequence.',
              sqlEquivalent: 'One row in a SELECT result. One inserted record.',
              example: '(\'C001\', \'Rahul Sharma\', \'San Francisco\', 28) is a tuple in the customers relation.',
            },
            {
              formal: 'Attribute',
              informal: 'Column / Field',
              color: '#f97316',
              definition: 'A named property of the relation. Each attribute has a name and a domain (the set of values it can contain). Every tuple has exactly one value for each attribute.',
              depth: 'An attribute is NOT just a column name and data type. It carries semantic meaning — customer_id means something specific about what kind of value is stored and what it represents. The attribute name is part of the relation\'s schema and persists even when all tuples are deleted (an empty table still has its attribute definitions).',
              sqlEquivalent: 'A column definition in CREATE TABLE.',
              example: 'customer_id, name, city, age are the four attributes of the customers relation.',
            },
            {
              formal: 'Domain',
              informal: 'Allowed Values / Data Type',
              color: '#8b5cf6',
              definition: 'The complete set of atomic values that an attribute is permitted to contain. A domain defines both the data type (integer, varchar, date) and often semantic constraints (age must be non-negative, city must be a valid city name).',
              depth: 'Domains are more powerful than SQL data types. A domain has a name (it is not anonymous), a data type, and a constraint. Two attributes can share the same data type but have different domains — employee_id and manager_id are both integers, but they have different domains because they mean different things. In SQL, CHECK constraints and custom types approximate domain constraints.',
              sqlEquivalent: 'Data type + CHECK constraint together define a domain.',
              example: 'Domain of age: integers between 0 and 150. Domain of city: any non-empty string up to 100 chars.',
            },
            {
              formal: 'Degree',
              informal: 'Number of Columns / Arity',
              color: '#facc15',
              definition: 'The number of attributes (columns) in a relation. A relation with 5 attributes has degree 5. Degree is a property of the relation schema — it does not change unless the schema changes.',
              depth: 'Degree is a static, schema-level property. It changes only when you ALTER TABLE to add or drop columns. It is completely independent of the cardinality (number of rows). A relation with degree 10 can have zero rows or 10 billion rows. Degree and cardinality are orthogonal properties.',
              sqlEquivalent: 'SELECT COUNT(*) FROM information_schema.columns WHERE table_name = \'customers\'',
              example: 'customers(customer_id, name, email, city, age) has degree 5.',
            },
            {
              formal: 'Cardinality',
              informal: 'Number of Rows / Record Count',
              color: '#ff4757',
              definition: 'The number of tuples currently in a relation. Unlike degree, cardinality is a dynamic property — it changes every time a row is inserted, deleted, or (when the primary key changes) updated.',
              depth: 'Cardinality is a point-in-time measurement. It is context-dependent — the cardinality of the customers table right now might be 2.4 million; in 30 seconds it might be 2,400,001. Cardinality is important for query optimisation — the DBMS\'s statistics system tracks cardinality estimates for every table to help the query planner choose efficient execution plans.',
              sqlEquivalent: 'SELECT COUNT(*) FROM customers — returns the current cardinality.',
              example: 'The customers relation currently has cardinality 2,400,000 (2.4 million rows).',
            },
            {
              formal: 'Schema',
              informal: 'Table Structure / Table Definition',
              color: '#0078d4',
              definition: 'The name of the relation together with the names and domains of all its attributes. The schema is the intension of the relation — the persistent structural definition that exists regardless of what data is currently stored.',
              depth: 'Schema is to a relation what a class definition is to objects in OOP. It describes the structure without specifying the content. The schema CUSTOMERS(customer_id: string, name: string, city: string, age: integer) is the template. The actual rows are instances of that template. In SQL, the schema is what you define with CREATE TABLE and modify with ALTER TABLE.',
              sqlEquivalent: 'CREATE TABLE statement defines the schema.',
              example: 'CUSTOMERS(customer_id VARCHAR(10), name VARCHAR(100), city VARCHAR(100), age INT)',
            },
            {
              formal: 'Instance / Extension',
              informal: 'Table Data / Current State',
              color: 'var(--accent)',
              definition: 'The actual set of tuples currently stored in a relation at a specific point in time. The extension is the populated manifestation of the schema — it changes constantly as data is manipulated.',
              depth: 'The distinction between schema and instance is fundamental to data independence. The schema changes rarely (ALTER TABLE is an infrequent, planned operation). The instance changes constantly (every INSERT/UPDATE/DELETE changes the instance). Application code is written against the schema — it should not need to change just because the instance changes.',
              sqlEquivalent: 'The actual rows returned by SELECT * FROM customers.',
              example: 'At 14:32:05, the customers instance contains 2,400,001 rows. After one INSERT, at 14:32:06, the instance contains 2,400,002 rows.',
            },
          ].map((item, i) => (
            <div key={item.formal} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}10`, borderRight: '1px solid var(--border)',
                padding: '20px 16px', minWidth: 120,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)', textAlign: 'center', lineHeight: 1.3 }}>{item.formal}</span>
                <span style={{ fontSize: 10, color: 'var(--muted)',  textAlign: 'center', lineHeight: 1.4 }}>= {item.informal}</span>
              </div>
              <div style={{ padding: '20px 24px', flex: 1 }}>
                <Para><strong style={{ color: 'var(--text)' }}>Definition:</strong> {item.definition}</Para>
                <Para><strong style={{ color: 'var(--text)' }}>Why it matters:</strong> {item.depth}</Para>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>SQL:</span>
                  <span style={{ fontSize: 12, color: 'var(--text2)',  lineHeight: 1.6 }}>{item.sqlEquivalent}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap' }}>Example:</span>
                  <span style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>{item.example}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SubTitle>NULL — The Relational Model's Acknowledged Flaw</SubTitle>

        <Para>
          NULL is the most controversial concept in the relational model. Codd introduced it as
          a marker for "value unknown or inapplicable," but he recognised immediately that a
          single NULL value is insufficient — there is a semantic difference between "I don't
          know this person's salary" (unknown) and "this person has no salary" (not applicable)
          and "this person hasn't been assigned a salary yet" (pending). All three are represented
          identically as NULL in SQL, making it impossible for the database to distinguish them.
        </Para>

        <Para>
          Codd proposed a four-valued logic (true, false, unknown, inapplicable) to address this,
          but no major DBMS implemented it. SQL instead uses three-valued logic (true, false, unknown)
          where any comparison with NULL produces "unknown" — which has specific, non-obvious
          consequences that every SQL developer must understand.
        </Para>

        <CodeBox label="NULL — the three-valued logic trap that breaks intuitive reasoning">
{`-- Three-valued logic: TRUE, FALSE, UNKNOWN
-- Any comparison with NULL produces UNKNOWN (not TRUE or FALSE)

-- TRAP 1: NULL = NULL is UNKNOWN (not TRUE!)
SELECT * FROM employees WHERE salary = NULL;    -- returns ZERO rows!
SELECT * FROM employees WHERE salary IS NULL;   -- correct: returns rows with null salary

-- TRAP 2: NULL != NULL is also UNKNOWN (not TRUE!)
SELECT * FROM employees WHERE salary != NULL;   -- returns ZERO rows!
SELECT * FROM employees WHERE salary IS NOT NULL; -- correct

-- TRAP 3: Arithmetic with NULL propagates NULL
SELECT salary + 5000 FROM employees;
-- If salary is NULL → result is NULL (not salary + 5000!)
-- Fix: COALESCE(salary, 0) + 5000

-- TRAP 4: COUNT(*) vs COUNT(column) difference
CREATE TABLE test (id INT, value INT);
INSERT INTO test VALUES (1, 100), (2, NULL), (3, 200), (4, NULL);

SELECT COUNT(*)     FROM test;  -- Returns: 4  (counts all rows)
SELECT COUNT(value) FROM test;  -- Returns: 2  (counts non-NULL values only)
SELECT AVG(value)   FROM test;  -- Returns: 150 (ignores NULLs — (100+200)/2, not /4!)
SELECT SUM(value)   FROM test;  -- Returns: 300 (ignores NULLs correctly)

-- TRAP 5: NOT IN with NULL subquery — the silent killer
-- "Find employees NOT in the New York office"
SELECT name FROM employees
WHERE employee_id NOT IN (
    SELECT employee_id FROM ny_office_employees
);
-- If ny_office_employees has ANY row with employee_id = NULL,
-- this query returns ZERO ROWS — even though there are clearly non-NY employees!
-- Why: NOT IN is equivalent to "!= val1 AND != val2 AND != NULL"
-- "!= NULL" is UNKNOWN, and TRUE AND UNKNOWN = UNKNOWN (not TRUE)
-- So every row's condition becomes UNKNOWN → filtered out

-- FIX: Use NOT EXISTS instead
SELECT name FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM ny_office_employees n
    WHERE n.employee_id = e.employee_id
);
-- NOT EXISTS handles NULL correctly

-- TRAP 6: NULL in CHECK constraints
-- CHECK (age > 0) passes for NULL! (UNKNOWN is treated as passing CHECK)
-- To also reject NULL: CHECK (age IS NOT NULL AND age > 0)
-- Or: use NOT NULL constraint separately

-- HANDLING NULL PROPERLY:
SELECT
    name,
    COALESCE(phone, 'No phone on record')  AS phone_display,
    NULLIF(commission, 0)                  AS actual_commission,  -- treat 0 same as NULL
    CASE WHEN salary IS NULL THEN 'Unknown'
         WHEN salary < 50000  THEN 'Below average'
         ELSE 'Above average' END           AS salary_band
FROM employees;`}
        </CodeBox>

        <Callout type="warning">
          The NOT IN + NULL subquery trap is one of the most insidious bugs in SQL. It causes
          queries to silently return wrong results — no error, no warning, just incorrect data.
          In production, this has caused missed customer notifications, incorrect billing,
          and reporting errors. Whenever you write NOT IN with a subquery, always check whether
          that subquery can return NULL values. If it can, use NOT EXISTS instead.
        </Callout>
      </section>

      {/* ========================================
          PART 3 — PROPERTIES OF RELATIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The Rules" />
        <SectionTitle>Properties Every Relation Must Satisfy — And Why Each Property Matters</SectionTitle>

        <Para>
          A relation is not just any table with rows and columns. A properly defined relation
          must satisfy a specific set of properties that emerge from the mathematical definition
          of a set. These properties are not optional recommendations — they are constraints
          that every properly implemented DBMS enforces. Violating them produces what the
          relational model considers "not a valid relation."
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              property: 'Property 1 — No Duplicate Tuples',
              color: '#0078d4',
              formal: 'A relation is a mathematical set. By definition, a set cannot contain duplicate elements. Therefore, no two tuples in a relation can be identical in all their attribute values simultaneously.',
              why: 'Duplicate tuples represent the same real-world fact stated twice. They add zero information while consuming storage and causing confusion in queries. If you count "how many customers named Rahul in San Francisco?", a duplicate row would give you 2 instead of 1.',
              sqlReality: 'SQL does NOT automatically enforce no-duplicate-tuples unless you define a PRIMARY KEY or UNIQUE constraint covering all columns (which is impractical). SQL tables are technically multisets, not sets. This is one of SQL\'s departures from pure relational theory.',
              enforcement: 'Define a PRIMARY KEY on every table. This guarantees no duplicate tuples because the PK is always unique and never NULL.',
              code: `-- Without PK: duplicates are possible (SQL multiset behaviour)
CREATE TABLE bad_table (name VARCHAR(100), city VARCHAR(100));
INSERT INTO bad_table VALUES ('Rahul', 'San Francisco');
INSERT INTO bad_table VALUES ('Rahul', 'San Francisco');  -- allowed! duplicate silently inserted
SELECT COUNT(*) FROM bad_table;  -- Returns: 2

-- With PK: duplicates impossible on the PK column
CREATE TABLE good_table (
    customer_id  VARCHAR(10) PRIMARY KEY,  -- PK prevents duplicate customer_ids
    name         VARCHAR(100),
    city         VARCHAR(100)
);`,
            },
            {
              property: 'Property 2 — Tuples Are Unordered',
              color: 'var(--accent)',
              formal: 'In set theory, a set has no inherent ordering of its elements. Therefore, the order of tuples in a relation is mathematically meaningless. Tuple 1 and Tuple 1000 are not "before" or "after" each other — they are just members of the set.',
              why: 'If row order had meaning, changing storage organisation would change query results — which would make physical data independence impossible. By defining tuple order as meaningless, the relational model allows the DBMS to store data in any physical order for performance purposes without affecting logical correctness.',
              sqlReality: 'In SQL, the order of rows returned by SELECT (without ORDER BY) is implementation-defined and can change between queries. This surprises many beginners who expect rows to always come back in insertion order. They don\'t. The DBMS is free to return them in any order based on its physical storage and query plan.',
              enforcement: 'Always use ORDER BY when row order matters for your application. Never assume a particular row order without ORDER BY.',
              code: `-- WRONG ASSUMPTION: rows come back in insertion order
INSERT INTO customers VALUES ('C003', 'Arjun', 'New York');
INSERT INTO customers VALUES ('C001', 'Rahul', 'San Francisco');
INSERT INTO customers VALUES ('C002', 'Priya', 'Austin');

SELECT * FROM customers;
-- MIGHT return:  C001, C002, C003 (index order)
-- MIGHT return:  C003, C001, C002 (insertion order)
-- MIGHT return:  C002, C003, C001 (random, based on DBMS internals)
-- ALL OF THESE ARE CORRECT by the relational model.

-- CORRECT: if you need sorted output, explicitly request it
SELECT * FROM customers ORDER BY customer_id;  -- always alphabetical
SELECT * FROM customers ORDER BY name;          -- always alphabetical by name`,
            },
            {
              property: 'Property 3 — Attributes Are Unordered Within a Tuple',
              color: '#f97316',
              formal: 'In the formal relational model, the attributes of a tuple are identified by name, not by position. The ordering of columns in a CREATE TABLE statement is a convenience, not a semantic choice.',
              why: 'If column order had meaning, adding a new column in the "middle" of a table would break all application code that accesses columns by position. By making attribute order irrelevant, the relational model allows schema evolution (adding/dropping/reordering columns) without breaking applications.',
              sqlReality: 'SQL does allow positional column access (SELECT column2 FROM table is equivalent to SELECT name FROM table if name is the 2nd column — but this is extremely bad practice and fragile). Always access columns by name, never by position.',
              enforcement: 'Never use SELECT * in application code — always name the specific columns. Never rely on column position. Always use column names.',
              code: `-- FRAGILE: positional column access (never do this)
SELECT col1, col2, col3 FROM customers;  -- position-dependent
-- If someone does ALTER TABLE ADD COLUMN before col2, this breaks

-- ROBUST: named column access (always do this)
SELECT customer_id, name, city FROM customers;  -- always correct
-- Column order in CREATE TABLE can change; named access remains valid

-- The relational model says these two are semantically equivalent:
CREATE TABLE customers (customer_id VARCHAR(10), name VARCHAR(100), city VARCHAR(50));
CREATE TABLE customers (city VARCHAR(50), customer_id VARCHAR(10), name VARCHAR(100));
-- Column order in CREATE TABLE is a display preference, not a semantic choice.`,
            },
            {
              property: 'Property 4 — All Attribute Values Are Atomic',
              color: '#8b5cf6',
              formal: 'Each cell in a relation must contain exactly one atomic (indivisible) value. A cell cannot contain a set, a list, an array, another tuple, or any composite structure. This is the First Normal Form (1NF) requirement — and it is built into the definition of a relation itself.',
              why: 'If cells could contain non-atomic values (lists, arrays, nested tables), every query would need to know how to decompose those values before operating on them. SQL\'s entire query model assumes that each attribute value is a single, comparable, operable unit. Non-atomic values break joins, aggregations, ordering, and indexing.',
              sqlReality: 'Modern SQL (and PostgreSQL specifically) allows array columns and JSONB columns — which are technically non-atomic. These are powerful pragmatic extensions, but they are departures from pure 1NF. Queries on these columns require special syntax and cannot use standard B-tree indexes without additional operators.',
              enforcement: 'If you find yourself storing comma-separated values, pipe-separated lists, or JSON arrays in a column that you need to query by individual values — stop. Create a separate table.',
              code: `-- 1NF VIOLATION: storing multiple phone numbers in one cell
CREATE TABLE customers_bad (
    customer_id  VARCHAR(10) PRIMARY KEY,
    name         VARCHAR(100),
    phones       TEXT  -- "98765-43210, 87654-32109, 76543-21098"  ← WRONG
);
-- Problems:
-- Cannot query: WHERE phones = '98765-43210' (won't work reliably)
-- Cannot index: can't create a useful B-tree index on this column
-- Cannot update: changing one phone requires parsing + reconstructing the string
-- Violates the foundational definition of a relation

-- 1NF COMPLIANT: atomic values throughout
CREATE TABLE customers (
    customer_id  VARCHAR(10) PRIMARY KEY,
    name         VARCHAR(100)
);
CREATE TABLE customer_phones (
    customer_id   VARCHAR(10) NOT NULL,
    phone_number  VARCHAR(20) NOT NULL,
    phone_type    VARCHAR(20) DEFAULT 'mobile',
    PRIMARY KEY (customer_id, phone_number),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);`,
            },
            {
              property: 'Property 5 — Each Attribute Has a Unique Name Within the Relation',
              color: '#facc15',
              formal: 'Within a single relation, no two attributes can have the same name. Attribute names serve as identifiers for accessing specific values in tuples — if names were duplicated, the identifier would be ambiguous.',
              why: 'If two columns had the same name, every query referencing that column would be ambiguous. The query processor could not determine which column was intended. Column name uniqueness within a table is what makes named column access (as opposed to positional access) possible.',
              sqlReality: 'SQL enforces this strictly — CREATE TABLE will fail with a syntax error if you specify the same column name twice. However, in JOINs, two different tables can have columns with the same name — SQL resolves this with table-qualified names (table.column_name).',
              enforcement: 'Enforced by the DBMS. No action needed — you cannot violate this in SQL even if you try.',
              code: `-- SQL enforces unique column names within a table:
CREATE TABLE test (
    id   INT PRIMARY KEY,
    name VARCHAR(100),
    name VARCHAR(50)  -- ERROR: column "name" specified more than once
);

-- But JOIN can bring same-named columns from different tables:
SELECT c.name AS customer_name, r.name AS restaurant_name
FROM customers c JOIN restaurants r ON c.city = r.city;
-- Must qualify: c.name vs r.name to disambiguate`,
            },
          ].map((item) => (
            <div key={item.property} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>{item.property}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12, marginBottom: 14 }}>
                  {[
                    { label: 'Formal Statement', value: item.formal, c: item.color },
                    { label: 'Why This Matters', value: item.why, c: item.color },
                    { label: 'SQL Reality', value: item.sqlReality, c: item.color },
                    { label: 'How to Enforce', value: item.enforcement, c: item.color },
                  ].map((detail) => (
                    <div key={detail.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: detail.c, marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{detail.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{detail.value}</div>
                    </div>
                  ))}
                </div>
                <CodeBox>{item.code}</CodeBox>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 4 — RELATIONAL SCHEMA NOTATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — The Notation" />
        <SectionTitle>Relational Schema Notation — How to Read and Write It</SectionTitle>

        <Para>
          Academic papers, textbooks, and exam questions express relational schemas in a
          compact formal notation. Understanding this notation is essential for reading
          database literature, answering GATE questions, and communicating schema designs
          to other engineers without drawing diagrams.
        </Para>

        <CodeBox label="Standard relational schema notation — every convention explained">
{`// BASIC NOTATION: RelationName(attribute1, attribute2, ..., attributeN)
// Conventions:
//   - PRIMARY KEY attributes are UNDERLINED (shown here as ALL_CAPS)
//   - FOREIGN KEY attributes are shown with an asterisk or arrow notation
//   - NULL/NOT NULL constraints sometimes shown explicitly

// EXAMPLE 1: Simple relation
CUSTOMERS(CUSTOMER_ID, name, email, city, age)
//           ↑ underlined = primary key

// EXAMPLE 2: Relation with foreign key
ORDERS(ORDER_ID, customer_id*, order_date, total, status)
//               ↑ asterisk = foreign key to CUSTOMERS.customer_id

// EXAMPLE 3: Composite primary key
ENROLLMENTS(STUDENT_ID*, COURSE_ID*, enrolled_date, grade)
//           ↑────────────────────↑ both underlined together = composite PK
//           Both are also FKs (to STUDENTS and COURSES respectively)

// EXAMPLE 4: Complete university database schema in notation
STUDENTS(STUDENT_ID, name, email, major, gpa, enrollment_year)
PROFESSORS(PROFESSOR_ID, name, department, email, office_room)
COURSES(COURSE_ID, title, credits, department, PROFESSOR_ID*)
ENROLLMENTS(STUDENT_ID*, COURSE_ID*, semester, grade, attendance_pct)
//           ↑ composite PK — (student_id, course_id) together are unique

// Reading FK references:
// COURSES.PROFESSOR_ID → PROFESSORS.PROFESSOR_ID
// ENROLLMENTS.STUDENT_ID → STUDENTS.STUDENT_ID
// ENROLLMENTS.COURSE_ID → COURSES.COURSE_ID

// EXTENDED NOTATION with explicit constraints:
EMPLOYEES(EMPLOYEE_ID: INT NOT NULL,
          name: VARCHAR(100) NOT NULL,
          dept_id: INT NOT NULL REFERENCES DEPARTMENTS,
          salary: DECIMAL(10,2) CHECK salary > 0,
          hire_date: DATE DEFAULT CURRENT_DATE,
          manager_id: INT REFERENCES EMPLOYEES)
//                                  ↑ self-referential FK (recursive relationship)

// ALTERNATIVE NOTATION using arrows:
ORDERS.customer_id → CUSTOMERS.customer_id
EMPLOYEES.dept_id → DEPARTMENTS.dept_id
EMPLOYEES.manager_id → EMPLOYEES.employee_id  // self-referential`}
        </CodeBox>

        <SubTitle>Schema vs Instance — A Complete Contrast</SubTitle>

        <CodeBox label="Schema (intension) vs Instance (extension) — the full picture">
{`-- THE SCHEMA (intension) — defined once, stable, structural:
CREATE TABLE products (
    product_id    VARCHAR(20)   PRIMARY KEY,
    product_name  VARCHAR(200)  NOT NULL,
    category      VARCHAR(100)  NOT NULL,
    price         DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock_qty     INT           NOT NULL DEFAULT 0,
    is_active     BOOLEAN       DEFAULT true,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
-- This CREATE TABLE statement defines:
-- - The relation name (products)
-- - Its degree (7 attributes)
-- - Each attribute's name and domain
-- - The primary key (product_id)
-- - Integrity constraints (price >= 0, stock_qty has default 0)
-- The schema exists the moment you run CREATE TABLE,
-- even BEFORE any data is inserted. An empty table has a schema.

-- THE INSTANCE (extension) — at 2024-03-15 14:32:00:
-- product_id  | product_name      | category   | price  | stock_qty | is_active
-- P001        | Chicken Biryani   | Main Course| 280.00 | 50        | true
-- P002        | Masala Dosa       | Breakfast  | 120.00 | 30        | true
-- P003        | Butter Chicken    | Main Course| 340.00 | 0         | false
-- P004        | Veg Thali         | Meal Combo | 180.00 | 25        | true
-- Cardinality: 4 rows. Degree: 7 columns (unchanged from schema).

-- THE INSTANCE at 2024-03-15 15:00:00 (after INSERT and UPDATE):
-- P001 | Chicken Biryani   | Main Course| 280.00 | 48   | true    (2 sold)
-- P002 | Masala Dosa       | Breakfast  | 125.00 | 30   | true    (price updated)
-- P003 | Butter Chicken    | Main Course| 340.00 | 0    | false   (unchanged)
-- P004 | Veg Thali         | Meal Combo | 180.00 | 25   | true    (unchanged)
-- P005 | Paneer Tikka      | Starter    | 220.00 | 15   | true    (NEW — inserted)
-- Cardinality: now 5 rows. Schema: UNCHANGED. Degree: still 7.

-- KEY INSIGHT:
-- Schema changes require ALTER TABLE (planned, controlled, relatively rare)
-- Instance changes happen with every INSERT/UPDATE/DELETE (continuous, constant)
-- Application code is written against the SCHEMA — it stays correct as the instance changes`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — KEYS — COMPLETE AND EXHAUSTIVE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — The Keys" />
        <SectionTitle>Keys — The Complete Guide to Every Type, Every Nuance</SectionTitle>

        <Para>
          Keys are the most interview-heavy topic in the entire relational model. Nearly every
          DBMS exam question, placement interview, and system design discussion involves key
          concepts. The topic is deceptively simple on the surface — "a key uniquely identifies
          a row" — but the full picture involves seven distinct key types, each with specific
          properties, each with specific implementation consequences, and several with
          subtle distinctions that interviewers deliberately probe.
        </Para>

        <Para>
          We will examine every key type in complete depth — formal definition, informal
          intuition, a worked example using a concrete table, implementation details, and
          the interview traps specific to each type.
        </Para>

        {/* THE REFERENCE TABLE */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em' }}>Reference Relation — used for all key examples throughout this section</div>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['emp_id', 'email', 'phone', 'name', 'dept_id', 'ssn_last4', 'salary'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 14px', color: 'var(--accent)', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-mono)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['E001', 'rahul@co.in', '98765-43210', 'Rahul Sharma', 'D01', 'ABCDE1234F', '85000'],
                  ['E002', 'priya@co.in', '87654-32109', 'Priya Reddy', 'D02', 'FGHIJ5678K', '92000'],
                  ['E003', 'arjun@co.in', '76543-21098', 'Arjun Nair', 'D01', 'KLMNO9012L', '78000'],
                  ['E004', 'kavya@co.in', '65432-10987', 'Kavya Krishnan', 'D03', 'PQRST3456M', '95000'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--bg2)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 14px', color: j === 0 ? 'var(--accent)' : 'var(--text2)', fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Para>
            This EMPLOYEES relation has 4 tuples and 7 attributes. We will use it to illustrate
            every key type. The attributes are: emp_id (auto-assigned), email (work email),
            phone (mobile), name, dept_id (department), ssn_last4 (Indian tax ID — unique per person),
            salary.
          </Para>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* SUPER KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#f97316', fontFamily: 'Syne, sans-serif' }}>Super Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Broadest Key</span>
              </div>

              <Para>
                A <strong style={{ color: 'var(--text)' }}>super key</strong> is any set of one or more
                attributes whose combined values are guaranteed to uniquely identify every tuple
                in the relation. A super key is the broadest, most permissive definition of a key —
                it only requires uniqueness, with no requirement for minimality or simplicity.
              </Para>

              <Para>
                The defining characteristic: if you add any attribute to a super key, it remains
                a super key (adding attributes to a set that already uniquely identifies rows still
                uniquely identifies rows). If you have a super key, any superset of it is also a super key.
                This means every relation has a trivially large super key: the set of ALL attributes —
                since if all attributes together are used as the key, it trivially identifies every row
                (assuming no two rows are completely identical, which Property 1 guarantees).
              </Para>

              <CodeBox label="All super keys for the EMPLOYEES relation">
{`-- EMPLOYEES(emp_id, email, phone, name, dept_id, ssn_last4, salary)

-- SUPER KEYS (any set that uniquely identifies each row):

-- Single-attribute super keys (minimum size):
{emp_id}          -- emp_id is unique per employee
{email}           -- each employee has a unique work email
{phone}           -- each employee has a unique mobile
{ssn_last4}      -- PAN card is unique per person in India

-- Two-attribute super keys:
{emp_id, email}   -- still unique (adding email to already-unique emp_id)
{emp_id, name}    -- unique (emp_id alone is already unique)
{emp_id, salary}  -- unique
{email, phone}    -- unique (email alone is already unique)
{email, ssn_last4} -- unique
-- ... and many more combinations

-- Multi-attribute super keys (including redundant attributes):
{emp_id, email, phone}        -- unique
{emp_id, email, name}         -- unique
{emp_id, email, phone, name, dept_id, ssn_last4, salary}  -- ALL attributes = super key

-- NOT super keys (do NOT uniquely identify rows):
{name}     -- two employees could have the same name
{dept_id}  -- multiple employees per department
{salary}   -- multiple employees can have the same salary
{name, dept_id} -- two employees in same dept could have same name

-- TOTAL COUNT of super keys in this relation:
-- Starting with 4 single-attribute keys (emp_id, email, phone, ssn_last4),
-- every superset of any of these is also a super key.
-- The number of super keys grows exponentially with relation size.
-- This is why super keys alone are not useful practically.`}
              </CodeBox>

              <Callout type="info">
                The concept of super key is important theoretically because it defines the
                space from which candidate keys are drawn — candidate keys are minimal super keys.
                In practice, no one ever explicitly talks about "super keys" when designing a
                schema — but the concept is essential for understanding why candidate keys are
                defined the way they are, and it appears frequently in GATE questions.
              </Callout>
            </div>
          </div>

          {/* CANDIDATE KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#facc15', fontFamily: 'Syne, sans-serif' }}>Candidate Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#facc15', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Minimal Super Key</span>
              </div>

              <Para>
                A <strong style={{ color: 'var(--text)' }}>candidate key</strong> is a
                <strong style={{ color: 'var(--text)' }}> minimal super key</strong> — a super key
                from which no attribute can be removed without destroying its uniqueness property.
                If you remove any single attribute from a candidate key, the remaining set of
                attributes no longer uniquely identifies all tuples.
              </Para>

              <Para>
                "Candidate" means it is a candidate for becoming the primary key — it meets all
                the technical requirements for being the primary key. A relation can have multiple
                candidate keys, and all of them are equally valid technically. The choice of which
                one becomes the primary key is a design decision.
              </Para>

              <Para>
                The formal definition: a candidate key K is a super key such that for every
                proper subset K' of K, K' is NOT a super key. In other words: K uniquely identifies
                rows, AND you cannot remove any attribute from K and maintain that uniqueness.
              </Para>

              <CodeBox label="Candidate keys for the EMPLOYEES relation — identified by minimality test">
{`-- EMPLOYEES(emp_id, email, phone, name, dept_id, ssn_last4, salary)

-- CANDIDATE KEY TEST: start with a super key, try removing each attribute
-- If removing any attribute breaks uniqueness → it's a candidate key (minimal)

-- Test {emp_id}:
--   Remove emp_id from {emp_id}: {} → empty set, clearly not unique
--   Therefore, {emp_id} cannot be reduced further → CANDIDATE KEY ✓

-- Test {email}:
--   Remove email from {email}: {} → not unique
--   Therefore, {email} is a candidate key ✓

-- Test {phone}:
--   Remove phone from {phone}: {} → not unique
--   Therefore, {phone} is a candidate key ✓

-- Test {ssn_last4}:
--   Remove ssn_last4: {} → not unique
--   Therefore, {ssn_last4} is a candidate key ✓

-- Test {emp_id, email} (a super key):
--   Remove emp_id: {email} → still unique (email alone is unique) ← CAN REDUCE!
--   Therefore, {emp_id, email} is NOT a candidate key (it's a non-minimal super key)

-- CANDIDATE KEYS of EMPLOYEES:
-- {emp_id}, {email}, {phone}, {ssn_last4}
-- These are ALL equally valid for becoming the primary key.

-- COMPOSITE CANDIDATE KEY EXAMPLE — when no single attribute is unique:
-- FLIGHTS(flight_number, departure_date, departure_time, origin, destination, airline)
-- 
-- Single attributes tested:
--   {flight_number}: NOT unique — same flight number runs daily (AI-101 exists every day)
--   {departure_date}: NOT unique — many flights depart the same day
--   {departure_time}: NOT unique — many flights depart at 08:00
--
-- Combinations tested:
--   {flight_number, departure_date}: unique! Flight AI-101 on 2024-03-15 is one specific flight
--                                    Try removing flight_number: {departure_date} — NOT unique
--                                    Try removing departure_date: {flight_number} — NOT unique
--                                    Cannot reduce further → CANDIDATE KEY ✓
--
-- {flight_number, departure_date} is the candidate key (and primary key) for FLIGHTS.`}
              </CodeBox>

              <SubSubTitle>Identifying All Candidate Keys — The Algorithmic Approach</SubSubTitle>

              <Para>
                In exam and interview questions, you are often given a set of functional
                dependencies (FDs) and asked to find all candidate keys. The approach is
                systematic: for each possible attribute combination (starting from single
                attributes and growing), compute its attribute closure — if the closure
                equals all attributes, it is a super key. Then check minimality. This
                is covered in full depth in Module 06 (Functional Dependencies).
              </Para>

              <CodeBox label="Finding candidate keys from functional dependencies — preview">
{`-- Given relation R(A, B, C, D, E) and FDs:
-- AB → C, C → D, D → E, E → A

-- Check if {A, B} is a candidate key:
-- Closure of {A,B}:
--   Start: {A, B}
--   Apply AB → C: {A, B, C}
--   Apply C → D:  {A, B, C, D}
--   Apply D → E:  {A, B, C, D, E}
-- {A,B}+ = {A,B,C,D,E} = all attributes → {A,B} is a super key
-- Can we remove A? {B}+ = {B} ≠ all attributes → NO
-- Can we remove B? {A}+ = {A, E, A} = {A,E} ≠ all attributes → NO
-- (using E→A: {A}+ = {A,E} only)
-- {A,B} is minimal → CANDIDATE KEY ✓

-- Check if {B, E} is a candidate key:
-- {B,E}+:
--   Start: {B, E}
--   Apply E → A: {A, B, E}
--   Apply AB → C: {A, B, C, E}
--   Apply C → D:  {A, B, C, D, E}
-- {B,E}+ = all attributes → super key
-- Remove B? {E}+ = {E,A} ≠ all → cannot remove
-- Remove E? {B}+ = {B} ≠ all → cannot remove
-- {B,E} is minimal → CANDIDATE KEY ✓

-- This relation has TWO candidate keys: {A,B} and {B,E}
-- The DBA must choose one as the primary key.`}
              </CodeBox>
            </div>
          </div>

          {/* PRIMARY KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--accent)', fontFamily: 'Syne, sans-serif' }}>Primary Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>★ The Chosen One</span>
              </div>

              <Para>
                The <strong style={{ color: 'var(--text)' }}>primary key</strong> is the one
                candidate key selected by the database designer to be the official, primary
                identifier of tuples in the relation. Among all the candidate keys available,
                exactly one is elevated to primary key status. The others become alternate keys.
              </Para>

              <Para>
                The primary key has two constraints that no other key type has:
                <strong style={{ color: 'var(--text)' }}> entity integrity constraint</strong> —
                no primary key attribute can ever be NULL, and no two tuples can have the same
                primary key value. These constraints are enforced by the DBMS automatically
                once a column is designated as PRIMARY KEY.
              </Para>

              <SubSubTitle>Criteria for Choosing a Primary Key Among Candidate Keys</SubSubTitle>

              <Para>
                When multiple candidate keys exist, the choice of primary key is a design
                decision with real consequences. The following criteria guide the selection:
              </Para>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[
                  {
                    criterion: 'Simplicity — prefer fewer attributes',
                    detail: 'A single-attribute primary key is always simpler than a composite one. It requires less storage in the table and in every foreign key that references it. For the EMPLOYEES relation, {emp_id} is simpler than {email} because email strings are longer.',
                    verdict: '{emp_id} preferred over {ssn_last4} for simplicity in foreign key references',
                  },
                  {
                    criterion: 'Stability — prefer values that never change',
                    detail: 'Primary key values propagate to every foreign key that references the table. If a PK value changes, all FK references must be updated (or CASCADE rules must do it automatically). A value that never changes eliminates this risk entirely.',
                    verdict: '{emp_id} (system-assigned) is more stable than {email} (people change email addresses) or {phone} (people change phone numbers)',
                  },
                  {
                    criterion: 'Availability — must never be NULL',
                    detail: 'A primary key attribute must always have a value — it can never be NULL. If a candidate key attribute is sometimes unknown at the time of insertion (e.g., ssn_last4 might not be provided immediately when onboarding a new employee), it cannot serve as the primary key.',
                    verdict: '{emp_id} can be assigned at insertion time; {ssn_last4} might be unknown during employee setup',
                  },
                  {
                    criterion: 'Semantics — prefer meaningless over meaningful',
                    detail: 'A primary key with business meaning (like ssn_last4) can become problematic if the business logic around that meaning changes. A system-generated key with no real-world meaning never has this problem.',
                    verdict: 'System-generated {emp_id} is preferred over {ssn_last4} for long-term stability',
                  },
                  {
                    criterion: 'Performance — prefer integers over strings',
                    detail: 'Integer comparisons are faster than string comparisons. Integer indexes are more compact. For high-traffic tables, using an integer primary key (instead of a VARCHAR candidate key) significantly improves JOIN and lookup performance.',
                    verdict: '{emp_id} as INT is faster than {email} as VARCHAR(150) for JOIN operations',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 18px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.criterion}</div>
                    <Para>{item.detail}</Para>
                    <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 5, padding: '5px 10px' }}>→ {item.verdict}</div>
                  </div>
                ))}
              </div>

              <CodeBox label="Primary key — the entity integrity constraint and its enforcement">
{`-- PRIMARY KEY declaration:
CREATE TABLE employees (
    emp_id      SERIAL        PRIMARY KEY,  -- system-assigned INT, never NULL
    email       VARCHAR(150)  NOT NULL UNIQUE,   -- candidate key → alternate key
    phone       VARCHAR(20)   NOT NULL UNIQUE,   -- candidate key → alternate key
    name        VARCHAR(100)  NOT NULL,
    dept_id     INT           NOT NULL,
    ssn_last4  CHAR(10)      NOT NULL UNIQUE,   -- candidate key → alternate key
    salary      DECIMAL(10,2) NOT NULL CHECK (salary > 0),
    hire_date   DATE          NOT NULL DEFAULT CURRENT_DATE
);

-- ENTITY INTEGRITY CONSTRAINT TEST:
INSERT INTO employees (email, name, dept_id, ssn_last4, salary)
VALUES (NULL, 'Test', 1, 'ABCDE1234F', 50000);
-- ERROR: null value in column "emp_id" violates not-null constraint
-- The DBMS rejects NULL in the primary key column.

INSERT INTO employees (emp_id, email, name, dept_id, ssn_last4, salary)
VALUES (1, 'rahul@co.in', 'Rahul', 1, 'ABCDE1234F', 50000);
INSERT INTO employees (emp_id, email, name, dept_id, ssn_last4, salary)
VALUES (1, 'priya@co.in', 'Priya', 2, 'FGHIJ5678K', 60000);
-- ERROR: duplicate key value violates unique constraint "employees_pkey"
-- The DBMS rejects duplicate primary key values.

-- COMPOSITE PRIMARY KEY:
CREATE TABLE order_items (
    order_id     VARCHAR(15)   NOT NULL,
    line_number  INT           NOT NULL,
    product_id   VARCHAR(20)   NOT NULL,
    quantity     INT           NOT NULL,
    unit_price   DECIMAL(10,2) NOT NULL,
    
    PRIMARY KEY (order_id, line_number)  -- composite PK
    -- Both order_id AND line_number are NOT NULL (entity integrity on composite PK)
    -- The COMBINATION must be unique (not each attribute individually)
);

-- Test composite PK uniqueness:
INSERT INTO order_items VALUES ('ORD-001', 1, 'P001', 2, 280);
INSERT INTO order_items VALUES ('ORD-001', 2, 'P003', 1, 340);  -- OK: different line_number
INSERT INTO order_items VALUES ('ORD-002', 1, 'P001', 1, 280);  -- OK: different order_id
INSERT INTO order_items VALUES ('ORD-001', 1, 'P005', 3, 200);  -- ERROR: duplicate (ORD-001, 1)`}
              </CodeBox>
            </div>
          </div>

          {/* ALTERNATE KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#8b5cf6' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#8b5cf6', fontFamily: 'Syne, sans-serif' }}>Alternate Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Unchosen Candidate</span>
              </div>

              <Para>
                An <strong style={{ color: 'var(--text)' }}>alternate key</strong> is any
                candidate key that was not chosen as the primary key. The name "alternate"
                reflects that it could have served as the primary key — it satisfies all
                the technical requirements — but the designer chose a different candidate
                key for that role.
              </Para>

              <Para>
                Alternate keys are not ignored or discarded. They still represent real
                unique identifiers of tuples — they are just not the official primary identifier.
                In SQL, alternate keys are implemented as
                <strong style={{ color: 'var(--text)' }}> UNIQUE constraints</strong> (not as
                PRIMARY KEY). This enforces uniqueness while making it clear that these
                columns are secondary identifiers, not the primary one.
              </Para>

              <CodeBox label="Alternate keys — implemented as UNIQUE constraints">
{`-- EMPLOYEES relation has candidate keys: {emp_id}, {email}, {phone}, {ssn_last4}
-- Design decision: emp_id is chosen as PRIMARY KEY
-- email, phone, ssn_last4 become ALTERNATE KEYS

CREATE TABLE employees (
    emp_id      SERIAL        PRIMARY KEY,       -- chosen candidate key → PK
    
    email       VARCHAR(150)  NOT NULL UNIQUE,   -- alternate key #1
    phone       VARCHAR(20)   NOT NULL UNIQUE,   -- alternate key #2
    ssn_last4  CHAR(10)      NOT NULL UNIQUE,   -- alternate key #3
    
    name        VARCHAR(100)  NOT NULL,
    dept_id     INT           NOT NULL,
    salary      DECIMAL(10,2)
);

-- Why UNIQUE constraints on alternate keys matter:
-- 1. Data integrity: prevents accidentally assigning same email to two employees
-- 2. Performance: UNIQUE constraints automatically create an index
--    → fast lookup by email (login systems look up by email, not by emp_id)
-- 3. Natural identifiers: business users know employees by email, not by emp_id
--    → alternate keys are often more user-facing than the PK

-- Querying by alternate key:
-- Login endpoint: "authenticate user with this email"
SELECT emp_id, name, dept_id, salary
FROM employees
WHERE email = 'rahul@co.in';
-- Uses the UNIQUE index on email → O(log n) lookup, extremely fast

-- Password reset: "find account by phone number"
SELECT emp_id, name, email
FROM employees
WHERE phone = '98765-43210';
-- Uses the UNIQUE index on phone → O(log n) lookup

-- Tax system: "validate employee by PAN"
SELECT emp_id, name
FROM employees
WHERE ssn_last4 = 'ABCDE1234F';
-- Uses the UNIQUE index on ssn_last4 → O(log n) lookup`}
              </CodeBox>

              <Callout type="tip">
                <strong>The practical importance of alternate keys:</strong> In production systems,
                the primary key (often an auto-increment integer) is almost never used by end users
                directly. Users know their email address, their phone number, their username. These
                are alternate keys. The UNIQUE constraint on alternate keys is what prevents a new
                user from registering with an email that's already in use — one of the most basic
                and critical data integrity checks in any user-facing application.
              </Callout>
            </div>
          </div>

          {/* FOREIGN KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#0078d4', fontFamily: 'Syne, sans-serif' }}>Foreign Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The Relationship Enforcer</span>
              </div>

              <Para>
                A <strong style={{ color: 'var(--text)' }}>foreign key</strong> is an attribute
                (or set of attributes) in one relation R₁ that references the primary key
                (or alternate key) of another relation R₂. The foreign key creates a
                <strong style={{ color: 'var(--text)' }}> referential integrity constraint</strong>:
                every non-NULL value in the foreign key attribute must match an existing value
                in the referenced key. You cannot reference a tuple that does not exist.
              </Para>

              <Para>
                The relation containing the foreign key is called the
                <strong style={{ color: 'var(--text)' }}> referencing relation</strong> or
                <strong style={{ color: 'var(--text)' }}> child relation</strong>. The relation
                being referenced is the <strong style={{ color: 'var(--text)' }}>referenced relation</strong>
                or <strong style={{ color: 'var(--text)' }}>parent relation</strong>.
              </Para>

              <SubSubTitle>Referential Integrity — The Full Specification</SubSubTitle>

              <Para>
                The referential integrity constraint specifies: for each tuple t₁ in the
                referencing relation R₁, the value of the foreign key attribute(s) must either
                be NULL (if the FK column allows NULL) or must match the primary key value of
                some tuple t₂ in the referenced relation R₂. There is no third option — a
                foreign key cannot contain a value that doesn't exist in the referenced table.
              </Para>

              <CodeBox label="Foreign key — constraint definition, violation attempts, and ON DELETE/UPDATE rules">
{`-- Parent (referenced) relation:
CREATE TABLE departments (
    dept_id    SERIAL        PRIMARY KEY,
    dept_name  VARCHAR(100)  UNIQUE NOT NULL,
    location   VARCHAR(100),
    budget     DECIMAL(15,2)
);

-- Child (referencing) relation:
CREATE TABLE employees (
    emp_id     SERIAL        PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    dept_id    INT           NOT NULL,  -- FK to departments
    manager_id INT,                     -- FK to employees (self-referential, nullable)
    salary     DECIMAL(10,2),
    
    CONSTRAINT fk_employee_dept
        FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id)
        ON DELETE RESTRICT    -- cannot delete a dept that has employees
        ON UPDATE CASCADE,    -- if dept_id changes, update all employee records
    
    CONSTRAINT fk_employee_manager
        FOREIGN KEY (manager_id)
        REFERENCES employees(emp_id)
        ON DELETE SET NULL    -- if manager is deleted, set manager_id to NULL
        ON UPDATE CASCADE
);

-- REFERENTIAL INTEGRITY VIOLATION TESTS:

-- Test 1: INSERT with non-existent FK value
INSERT INTO employees (name, dept_id, salary)
VALUES ('New Employee', 999, 50000);
-- ERROR: insert or update on table "employees" violates foreign key constraint
-- Department 999 does not exist in departments table

-- Test 2: DELETE parent that has children
DELETE FROM departments WHERE dept_id = 1;
-- ERROR: update or delete on table "departments" violates foreign key constraint
-- Employees reference dept_id = 1 — ON DELETE RESTRICT blocks this

-- Test 3: Allowed INSERT (FK value exists)
INSERT INTO departments (dept_name, location) VALUES ('Engineering', 'San Francisco');
-- dept_id = 1 is assigned by SERIAL
INSERT INTO employees (name, dept_id, salary) VALUES ('Rahul', 1, 85000);
-- OK: dept_id = 1 exists in departments

-- Test 4: Self-referential FK (manager hierarchy)
-- First insert must have NULL manager (top of hierarchy)
INSERT INTO employees (name, dept_id, salary, manager_id)
VALUES ('CEO', 1, 200000, NULL);  -- emp_id = 1, no manager

INSERT INTO employees (name, dept_id, salary, manager_id)
VALUES ('VP Engineering', 1, 150000, 1);  -- reports to emp_id = 1 (CEO)

INSERT INTO employees (name, dept_id, salary, manager_id)
VALUES ('Rahul', 1, 85000, 2);  -- reports to emp_id = 2 (VP)

-- Test 5: Circular FK reference — always causes constraint violation
-- Cannot insert A with FK pointing to B if B doesn't exist yet
-- Solution for chicken-and-egg scenarios:
BEGIN;
    INSERT INTO employees (name, dept_id, salary) VALUES ('Alice', 1, 80000);
    -- emp_id = 4, manager_id = NULL initially
    INSERT INTO employees (name, dept_id, salary, manager_id) VALUES ('Bob', 1, 75000, 4);
    UPDATE employees SET manager_id = 5 WHERE emp_id = 4;  -- now Alice reports to Bob
COMMIT;  -- constraints checked at commit, not mid-transaction (DEFERRED mode)`}
              </CodeBox>

              <SubSubTitle>ON DELETE and ON UPDATE — The Full Specification</SubSubTitle>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  {
                    action: 'RESTRICT / NO ACTION',
                    color: '#ff4757',
                    desc: 'The default. Prevents the DELETE or UPDATE on the parent if any child row references it. The operation fails with an error. RESTRICT checks immediately. NO ACTION defers the check to end of transaction (useful for deferrable constraints).',
                    useCase: 'Protect critical reference data. "Don\'t allow deleting a product that has existing order items." Forces explicit cleanup before removal.',
                  },
                  {
                    action: 'CASCADE',
                    color: '#f97316',
                    desc: 'Automatically propagates the operation to all referencing rows. ON DELETE CASCADE: deleting a parent row deletes all child rows. ON UPDATE CASCADE: updating a parent PK value updates all matching FK values in child rows.',
                    useCase: 'ON DELETE CASCADE for ownership relationships: "Delete an order → delete all its order items." ON UPDATE CASCADE when PKs might change (rare but exists in legacy systems).',
                  },
                  {
                    action: 'SET NULL',
                    color: 'var(--accent)',
                    desc: 'Sets the foreign key column to NULL when the referenced row is deleted or updated. Only valid if the FK column allows NULL values.',
                    useCase: 'Optional relationships: "If a manager is deleted, set all their direct reports\' manager_id to NULL." The employee still exists, just without a manager.',
                  },
                  {
                    action: 'SET DEFAULT',
                    color: '#8b5cf6',
                    desc: 'Sets the foreign key column to its default value when the referenced row is deleted or updated. The default value must itself be a valid FK value (or NULL if allowed).',
                    useCase: 'Reassignment: "If a department is deleted, move all its employees to the default department (dept_id = 1: General)." Ensures employees always have a department.',
                  },
                ].map((item) => (
                  <div key={item.action} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.action}</div>
                    <Para>{item.desc}</Para>
                    <div style={{ fontSize: 12, color: item.color, fontFamily: 'Inter, sans-serif' }}>→ Use when: {item.useCase}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPOSITE KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#e879f9' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#e879f9', fontFamily: 'Syne, sans-serif' }}>Composite Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#e879f9', background: 'rgba(232,121,249,0.1)', border: '1px solid rgba(232,121,249,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Multi-Column Key</span>
              </div>

              <Para>
                A <strong style={{ color: 'var(--text)' }}>composite key</strong> is a key
                that consists of two or more attributes (columns) combined. No single attribute
                in the composite key is unique on its own — it is the
                <strong style={{ color: 'var(--text)' }}> combination</strong> that is unique.
                The composite key can be a candidate key, a primary key, or an alternate key —
                the "composite" label only describes that multiple attributes are involved,
                not the key's role.
              </Para>

              <Para>
                Composite keys arise naturally in junction tables for M:N relationships
                (order_id + line_number for order items, student_id + course_id for enrollments)
                and in any situation where natural identification requires context
                (branch_code + account_number for bank accounts, flight_number + departure_date
                for flights).
              </Para>

              <CodeBox label="Composite keys — when they arise and how they work">
{`-- EXAMPLE 1: Junction table composite PK
-- (student_id, course_id) — each student-course pair is unique
-- but student_id alone repeats (student takes many courses)
-- and course_id alone repeats (course has many students)
CREATE TABLE enrollments (
    student_id   INT  NOT NULL,
    course_id    INT  NOT NULL,
    grade        CHAR(2),
    enrolled_at  DATE DEFAULT CURRENT_DATE,
    
    PRIMARY KEY (student_id, course_id)  -- composite PK
);

-- The composite PK allows:
-- ('S001', 'CS101') -- Rahul in DBMS
-- ('S001', 'CS102') -- Rahul in Algorithms (same student_id, different course_id → OK)
-- ('S002', 'CS101') -- Priya in DBMS (different student_id, same course_id → OK)
-- ('S001', 'CS101') -- REJECTED: (S001, CS101) already exists → duplicate composite PK

-- EXAMPLE 2: Natural composite key (no surrogate PK needed)
-- A flight is uniquely identified by its number AND departure date
CREATE TABLE flights (
    flight_number    CHAR(8)       NOT NULL,  -- 'AI-101', 'IndiGo-6E204'
    departure_date   DATE          NOT NULL,
    origin           CHAR(3)       NOT NULL,  -- IATA airport code 'BLR', 'DEL', 'BOM'
    destination      CHAR(3)       NOT NULL,
    departure_time   TIME          NOT NULL,
    arrival_time     TIME          NOT NULL,
    aircraft_type    VARCHAR(50),
    
    PRIMARY KEY (flight_number, departure_date)  -- natural composite PK
);

-- EXAMPLE 3: Composite UNIQUE constraint (not PK but still composite key)
-- A company can have only one department with a given name in each location
CREATE TABLE departments (
    dept_id    SERIAL        PRIMARY KEY,
    dept_name  VARCHAR(100)  NOT NULL,
    city       VARCHAR(100)  NOT NULL,
    budget     DECIMAL(15,2),
    
    UNIQUE (dept_name, city)  -- composite alternate key: no two depts with same name in same city
);
-- 'Engineering' in 'San Francisco' is unique
-- 'Engineering' in 'New York' is allowed (different city)
-- Two 'Engineering' in 'San Francisco' → REJECTED

-- IMPORTANT NUANCE: Individual components of a composite key CAN repeat
INSERT INTO enrollments VALUES ('S001', 'CS101', 'A', '2024-01-15');
INSERT INTO enrollments VALUES ('S001', 'CS102', NULL, '2024-01-15');
-- student_id 'S001' appears twice — this is CORRECT and expected
-- The COMBINATION (S001, CS101) and (S001, CS102) are both unique`}
              </CodeBox>
            </div>
          </div>

          {/* SURROGATE KEY */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--muted)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--muted)', fontFamily: 'Syne, sans-serif' }}>Surrogate Key</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', background: 'rgba(168,168,168,0.1)', border: '1px solid rgba(168,168,168,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>System-Generated</span>
              </div>

              <Para>
                A <strong style={{ color: 'var(--text)' }}>surrogate key</strong> is a
                system-generated, meaningless identifier created purely to serve as a primary
                key — it has no real-world significance and carries no business meaning.
                Surrogate keys are not derived from the data itself; they are artificially
                assigned by the DBMS. Common implementations are auto-incrementing integers
                (SERIAL/IDENTITY columns in PostgreSQL/SQL Server) and UUIDs.
              </Para>

              <Para>
                The term "surrogate" means "substitute" — it substitutes for a natural key
                (a candidate key derived from real data) when no natural key is suitable
                as a primary key, or as a deliberate design choice to avoid the pitfalls
                of natural keys.
              </Para>

              <SubSubTitle>Surrogate Keys vs Natural Keys — The Complete Trade-off</SubSubTitle>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Surrogate Key</div>
                  {[
                    ['Stability', 'Never changes — not tied to any real-world value'],
                    ['Simplicity', 'Always a single integer or UUID — never composite'],
                    ['No business logic leakage', 'Changing business rules never affect the key'],
                    ['Performance', 'Integer comparisons are faster than string comparisons'],
                    ['Privacy', 'Exposes nothing about the entity to external users'],
                    ['Downside', 'No inherent meaning — joining tables requires explicit relationship'],
                  ].map(([prop, desc]) => (
                    <div key={prop} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, fontSize: 12 }}>▸</span>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{prop}: </span>
                        <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Natural Key</div>
                  {[
                    ['Meaningfulness', 'Carries real-world information (SSN last 4 identifies a person)'],
                    ['Self-documenting', 'The key itself tells you something about the entity'],
                    ['Debugging', 'Easier to trace data issues when key has meaning'],
                    ['Volatility', 'Can change if the real-world value changes (email changed)'],
                    ['Complexity', 'Often composite — larger storage footprint in FKs'],
                    ['Exposure risk', 'Natural keys may expose sensitive information if used in URLs'],
                  ].map(([prop, desc]) => (
                    <div key={prop} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: '#0078d4', flexShrink: 0, fontSize: 12 }}>▸</span>
                      <div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{prop}: </span>
                        <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBox label="Surrogate key implementations — SERIAL, IDENTITY, UUID">
{`-- Option 1: SERIAL (PostgreSQL — auto-incrementing integer)
CREATE TABLE customers (
    customer_id  SERIAL        PRIMARY KEY,   -- generates 1, 2, 3, 4...
    email        VARCHAR(150)  NOT NULL UNIQUE,
    name         VARCHAR(100)  NOT NULL
);
-- SERIAL is shorthand for: integer + sequence + DEFAULT nextval('sequence')
-- Internally equivalent to:
-- customer_id  INTEGER NOT NULL DEFAULT nextval('customers_customer_id_seq')
-- + SEQUENCE customers_customer_id_seq START 1 INCREMENT 1

-- Option 2: IDENTITY column (SQL standard, newer PostgreSQL syntax)
CREATE TABLE customers (
    customer_id  INT          GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email        VARCHAR(150) NOT NULL UNIQUE,
    name         VARCHAR(100) NOT NULL
);
-- GENERATED ALWAYS: cannot manually insert a customer_id value
-- GENERATED BY DEFAULT: can manually specify customer_id if needed (e.g., data migration)

-- Option 3: UUID (Universally Unique Identifier — 128-bit random value)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- enable UUID generation
CREATE TABLE customers (
    customer_id  UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- generates values like: '550e8400-e29b-41d4-a716-446655440000'
    email        VARCHAR(150) NOT NULL UNIQUE,
    name         VARCHAR(100) NOT NULL
);
-- UUID advantages:
-- Globally unique: can merge records from multiple databases without conflicts
-- Can be generated client-side: no round-trip to DB for ID generation
-- Not sequential: cannot guess record counts from URL (security)
-- UUID disadvantages:
-- 16 bytes vs 4 bytes for INT: larger index, larger FK storage
-- Not human-readable: harder to debug/trace in logs
-- Random insertion order: can cause index fragmentation (use UUID v7 for sequential UUIDs)

-- WHEN TO USE WHICH:
-- SERIAL/IDENTITY INT:  single-database system, performance is critical, sequential IDs OK
-- UUID:                 multi-database merge scenarios, public-facing IDs, microservices
-- Natural key:          stable, simple, single-attribute natural identifiers that never change
--                       (e.g., ISO country codes, IATA airport codes, standard part numbers)`}
              </CodeBox>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================
          PART 6 — KEY HIERARCHY SUMMARY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — The Hierarchy" />
        <SectionTitle>The Key Hierarchy — How All Key Types Relate to Each Other</SectionTitle>

        <Para>
          The seven key types are not independent concepts — they form a precise hierarchy.
          Understanding the hierarchy makes every key concept self-reinforcing: once you
          know where each type sits, you know its definition without memorising it separately.
        </Para>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', marginBottom: 28, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.4, overflowX: 'auto' }}>
          <div style={{ color: '#f97316' }}>SUPER KEY</div>
          <div style={{ paddingLeft: 24, color: 'var(--muted)' }}>│  (any set of attributes that uniquely identifies rows — no minimality required)</div>
          <div style={{ paddingLeft: 24, color: '#f97316' }}>│</div>
          <div style={{ paddingLeft: 24, color: '#facc15' }}>├── CANDIDATE KEY  (minimal super key — every candidate key IS a super key)</div>
          <div style={{ paddingLeft: 48, color: 'var(--muted)' }}>│   (cannot remove any attribute without losing uniqueness)</div>
          <div style={{ paddingLeft: 48, color: '#facc15' }}>│</div>
          <div style={{ paddingLeft: 48, color: 'var(--accent)' }}>├── PRIMARY KEY   (chosen candidate key — one per table)</div>
          <div style={{ paddingLeft: 72, color: 'var(--muted)' }}>│   (NOT NULL + UNIQUE enforced by DBMS)</div>
          <div style={{ paddingLeft: 72, color: 'var(--muted)' }}>│   → May be a SURROGATE KEY (system-generated, no real-world meaning)</div>
          <div style={{ paddingLeft: 72, color: 'var(--muted)' }}>│   → May be a COMPOSITE KEY (multiple columns combined)</div>
          <div style={{ paddingLeft: 48, color: '#facc15' }}>│</div>
          <div style={{ paddingLeft: 48, color: '#8b5cf6' }}>└── ALTERNATE KEY  (unchosen candidate keys — UNIQUE constraint enforced)</div>
          <div style={{ paddingLeft: 72, color: 'var(--muted)' }}>    → May also be COMPOSITE keys</div>
          <div style={{ paddingLeft: 24, color: '#f97316' }}>│</div>
          <div style={{ paddingLeft: 24, color: '#0078d4' }}>└── FOREIGN KEY   (references PK or alternate key of another table)</div>
          <div style={{ paddingLeft: 48, color: 'var(--muted)' }}>    (enforces referential integrity — separate concept from the above hierarchy)</div>
          <div style={{ paddingLeft: 48, color: 'var(--muted)' }}>    → May be COMPOSITE (foreign key consisting of multiple columns)</div>
        </div>

        <CodeBox label="The complete picture — all key types on one table">
{`-- EMPLOYEES table demonstrating all key types:
CREATE TABLE employees (
    -- PRIMARY KEY (also a SURROGATE KEY):
    emp_id       SERIAL         PRIMARY KEY,
    -- Surrogate: system-generated, no real-world meaning
    -- Primary: the chosen official identifier
    
    -- ALTERNATE KEYS (unchosen candidate keys):
    email        VARCHAR(150)   NOT NULL UNIQUE,     -- alternate key 1
    phone        VARCHAR(20)    NOT NULL UNIQUE,      -- alternate key 2
    ssn_last4   CHAR(10)       NOT NULL UNIQUE,      -- alternate key 3
    
    -- Regular attributes (not keys by themselves):
    name         VARCHAR(100)   NOT NULL,
    salary       DECIMAL(10,2)  CHECK (salary > 0),
    
    -- FOREIGN KEY (referential integrity to departments):
    dept_id      INT            NOT NULL,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
    
    -- Self-referential FOREIGN KEY (manager hierarchy):
    manager_id   INT,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- SUPER KEYS of employees (examples):
-- {emp_id}, {email}, {phone}, {ssn_last4}  ← single-attribute super keys
-- {emp_id, email}, {emp_id, name}, {email, phone}  ← multi-attribute super keys
-- {emp_id, email, phone, name, dept_id, ssn_last4, salary, manager_id}  ← trivial super key

-- CANDIDATE KEYS of employees:
-- {emp_id}, {email}, {phone}, {ssn_last4}  ← all minimal, all unique

-- PRIMARY KEY: {emp_id} (chosen — minimal, stable, integer)
-- ALTERNATE KEYS: {email}, {phone}, {ssn_last4} (UNIQUE constraints)
-- FOREIGN KEYS: dept_id → departments.dept_id, manager_id → employees.emp_id
-- COMPOSITE KEY example (from order_items table):
-- PRIMARY KEY (order_id, line_number) — composite because neither alone is unique`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — INTEGRITY CONSTRAINTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — The Rules of Data Correctness" />
        <SectionTitle>Integrity Constraints — The Database's Defence Against Bad Data</SectionTitle>

        <Para>
          Integrity constraints are rules defined in the schema that the DBMS enforces
          automatically on every INSERT, UPDATE, and DELETE operation. They are the database's
          built-in defence against incorrect, inconsistent, or invalid data. Any operation
          that would violate a constraint is rejected — the DBMS returns an error and the
          database remains in its previous valid state.
        </Para>

        <Para>
          Integrity constraints are not optional enhancements — they are fundamental to the
          relational model's value proposition. An application can try to bypass constraints
          in code (check for duplicate email before inserting, verify FK exists before adding
          a child row), but application-level checks have a critical weakness: concurrent
          transactions can bypass them. Two concurrent transactions can both check "is this
          email taken?" and both receive "no" — then both insert the same email. DBMS-level
          constraints enforce uniqueness atomically — this race condition is physically
          impossible at the database level.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>

          {/* Domain Constraint */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #0078d4', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Domain Constraint</div>
            <Para>
              The most fundamental constraint. Every value stored in an attribute must
              belong to the domain of that attribute — the defined set of valid values.
              Implemented through data type declarations and CHECK constraints in SQL.
            </Para>
            <CodeBox>
{`-- Data type is the first domain constraint:
age          INT              -- values must be integers (no strings, no decimals)
salary       DECIMAL(10,2)    -- values must be valid decimal numbers
hire_date    DATE             -- values must be valid calendar dates
is_active    BOOLEAN          -- values must be true or false

-- CHECK extends domain constraints with semantic rules:
CREATE TABLE employees (
    age          INT          NOT NULL CHECK (age >= 18 AND age <= 80),
    -- Domain: integers between 18 and 80 (working age)
    
    salary       DECIMAL(10,2) NOT NULL CHECK (salary > 0),
    -- Domain: positive decimal numbers only
    
    blood_group  CHAR(3)       CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
    -- Domain: exactly 8 specific string values (or NULL)
    
    email        VARCHAR(150)  CHECK (email LIKE '%@%.%'),
    -- Domain: strings containing @ and . (basic email format validation)
    -- Note: proper email validation requires a regex CHECK in PostgreSQL
    
    status       VARCHAR(20)   NOT NULL DEFAULT 'active'
                               CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
    -- Domain: exactly 4 allowed string values
    
    hire_date    DATE NOT NULL,
    resign_date  DATE,
    -- Cross-column domain constraint:
    CHECK (resign_date IS NULL OR resign_date > hire_date)
    -- Resign date must be after hire date (if it exists)
);

-- VIOLATION EXAMPLES:
INSERT INTO employees (age, salary) VALUES (15, 50000);
-- ERROR: new row violates check constraint "employees_age_check"
-- Age 15 is outside the domain [18, 80]

INSERT INTO employees (age, status) VALUES (25, 'fired');
-- ERROR: new row violates check constraint "employees_status_check"
-- 'fired' is not in the allowed status domain`}
            </CodeBox>
          </div>

          {/* Key Constraint */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Key Constraint (Uniqueness Constraint)</div>
            <Para>
              Every relation must have a key — a set of attributes that uniquely identifies
              each tuple. The key constraint requires that no two tuples can have identical
              values for the key attribute(s). This is enforced by PRIMARY KEY and UNIQUE
              constraints in SQL.
            </Para>
            <CodeBox>
{`-- PRIMARY KEY enforces uniqueness + NOT NULL:
CREATE TABLE products (
    product_id  VARCHAR(20)  PRIMARY KEY,  -- unique + not null automatically
    name        VARCHAR(200) NOT NULL
);

-- UNIQUE enforces uniqueness but allows NULL (multiple NULLs allowed!):
CREATE TABLE employees (
    emp_id      SERIAL        PRIMARY KEY,
    email       VARCHAR(150)  UNIQUE NOT NULL,  -- unique AND not null (alternate key)
    ssn_last4  CHAR(10)      UNIQUE,            -- unique but nullable (might not have PAN yet)
    -- Note: multiple rows can have ssn_last4 = NULL
    --       because NULL ≠ NULL in SQL's three-valued logic
    --       A UNIQUE constraint allows multiple NULLs
    name        VARCHAR(100)  NOT NULL
);

-- IMPORTANT: UNIQUE with multiple NULLs behaviour
INSERT INTO employees (email, ssn_last4, name) VALUES ('a@co.in', NULL, 'Rahul');
INSERT INTO employees (email, ssn_last4, name) VALUES ('b@co.in', NULL, 'Priya');
-- Both inserts succeed! Two rows with NULL ssn_last4 is allowed by UNIQUE.
-- NULL ≠ NULL → not considered duplicate by the uniqueness check.

-- COMPOSITE UNIQUE constraint:
CREATE TABLE schedules (
    employee_id  INT  NOT NULL,
    shift_date   DATE NOT NULL,
    shift_slot   VARCHAR(20) NOT NULL,  -- 'morning', 'afternoon', 'night'
    
    UNIQUE (employee_id, shift_date, shift_slot)
    -- One employee cannot have two assignments in same shift slot on same day
);`}
            </CodeBox>
          </div>

          {/* NOT NULL Constraint */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #f97316', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>NOT NULL Constraint (Entity Integrity)</div>
            <Para>
              The entity integrity rule states that primary key attributes must never be NULL.
              The NOT NULL constraint generalises this — any attribute declared NOT NULL
              must always have a value. Every INSERT must provide a value for NOT NULL columns
              (unless a DEFAULT is defined); every UPDATE that would set them to NULL is rejected.
            </Para>
            <CodeBox>
{`-- Primary key is implicitly NOT NULL:
product_id  VARCHAR(20) PRIMARY KEY   -- NOT NULL is automatic

-- Explicit NOT NULL for required business data:
CREATE TABLE orders (
    order_id      SERIAL        PRIMARY KEY,
    customer_id   INT           NOT NULL,   -- every order must have a customer
    order_date    DATE          NOT NULL DEFAULT CURRENT_DATE,  -- must have a date
    status        VARCHAR(20)   NOT NULL DEFAULT 'pending',     -- must have a status
    delivery_addr TEXT          NOT NULL,   -- must have a delivery address
    -- Optional fields (NULL allowed):
    promo_code    VARCHAR(20),  -- order might not have a promo code
    notes         TEXT,         -- customer notes are optional
    delivered_at  TIMESTAMP     -- NULL until delivery occurs
);

-- NOT NULL violation:
INSERT INTO orders (customer_id, delivery_addr) VALUES (NULL, '123 Main St');
-- ERROR: null value in column "customer_id" violates not-null constraint

-- Choosing NOT NULL vs nullable:
-- NOT NULL: data that must exist for the record to make business sense
--           "what does an order without a customer even mean? nothing."
-- Nullable:  data that is genuinely optional or unknown at insertion time
--           "promo code is optional, delivery time is unknown until it happens"`}
            </CodeBox>
          </div>

          {/* Referential Integrity */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 12, padding: '22px 26px' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Referential Integrity Constraint</div>
            <Para>
              For every non-NULL foreign key value in the referencing relation, there must
              exist a matching primary key value in the referenced relation. The database
              enforces this on INSERT (cannot add a child row with a FK that doesn't exist),
              on DELETE (cannot delete a parent row that has referencing child rows, unless
              CASCADE/SET NULL applies), and on UPDATE (cannot change a PK value that has
              referencing FK values, unless CASCADE applies).
            </Para>
            <CodeBox>
{`-- Complete referential integrity scenario:
CREATE TABLE categories (
    category_id  SERIAL       PRIMARY KEY,
    name         VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE products (
    product_id   SERIAL        PRIMARY KEY,
    name         VARCHAR(200)  NOT NULL,
    category_id  INT           NOT NULL,
    price        DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
    ON DELETE RESTRICT    -- safe default: cannot orphan products
    ON UPDATE CASCADE     -- if category_id changes, update all products
);

CREATE TABLE order_items (
    order_id    INT NOT NULL,
    product_id  INT NOT NULL,
    quantity    INT NOT NULL,
    
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE RESTRICT,  -- cannot delete a product that has been ordered
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
    ON DELETE CASCADE    -- deleting an order deletes all its items
);

-- TESTING all referential integrity scenarios:

-- SCENARIO 1: INSERT with non-existent FK
INSERT INTO products (name, category_id, price)
VALUES ('Chicken Biryani', 999, 280);
-- ERROR: violates FK constraint — category_id 999 doesn't exist

-- SCENARIO 2: DELETE parent with existing children
DELETE FROM categories WHERE category_id = 1;
-- ERROR: violates FK constraint — products reference category_id = 1

-- SCENARIO 3: Correct insertion order
INSERT INTO categories (name) VALUES ('Main Course');  -- id = 1
INSERT INTO products (name, category_id, price) VALUES ('Chicken Biryani', 1, 280);  -- OK
INSERT INTO products (name, category_id, price) VALUES ('Butter Chicken', 1, 340);   -- OK

-- SCENARIO 4: Correct deletion order (without CASCADE)
DELETE FROM products WHERE category_id = 1;    -- delete children first
DELETE FROM categories WHERE category_id = 1;  -- now parent can be deleted

-- SCENARIO 5: With CASCADE — deletion propagates automatically
DELETE FROM orders WHERE order_id = 'ORD-001';
-- Automatically deletes all order_items WHERE order_id = 'ORD-001'
-- Because: FOREIGN KEY (order_id) ON DELETE CASCADE`}
            </CodeBox>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 8 — INTERVIEW TRAPS AND COMMON MISTAKES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — The Interview" />
        <SectionTitle>The Most Common Interview Traps — Every Key Question Demystified</SectionTitle>

        <Para>
          The relational model's key concepts are some of the most frequently asked topics
          in technical interviews — precisely because they seem simple on the surface but
          have subtle nuances that reveal genuine understanding. Here are every significant
          trap, with the precise answers that distinguish a prepared candidate from one who
          has only surface knowledge.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              question: 'What is the difference between a candidate key and a primary key?',
              trap: 'Saying "a primary key is a unique identifier" and leaving it there.',
              correctAnswer: 'A candidate key is any minimal super key — any minimal set of attributes that uniquely identifies all tuples in the relation. A relation can have multiple candidate keys. A primary key is the ONE candidate key selected by the designer to serve as the official identifier. The others become alternate keys. Every primary key is a candidate key, but not every candidate key is a primary key. The primary key adds two constraints that candidate keys in general do not have: NOT NULL (entity integrity) and the designation as the "official" identifier for foreign key references.',
              color: '#f97316',
            },
            {
              question: 'Can a table have no primary key?',
              trap: 'Saying "no, every table must have a primary key."',
              correctAnswer: 'The relational model requires every relation to have a key (to prevent duplicate tuples). But SQL allows you to CREATE TABLE without declaring a PRIMARY KEY — the table becomes a heap with no enforced uniqueness. This is technically a violation of the relational model but is permitted by SQL for pragmatic reasons (e.g., staging tables for ETL loads). Best practice: every table should have a PRIMARY KEY. SQL tables without PKs are an antipattern that allows duplicate rows and makes the table impossible to update or delete from precisely.',
              color: '#facc15',
            },
            {
              question: 'Can a foreign key reference a non-primary key column?',
              trap: 'Saying "no, foreign keys must always reference primary keys."',
              correctAnswer: 'In the relational model, a foreign key must reference a key (unique identifier) of the referenced relation. In SQL, a foreign key can reference any column (or combination of columns) that has a UNIQUE constraint — it does not have to be the PRIMARY KEY. This is important because sometimes you want to reference a table by its natural key (email, SSN last 4) rather than its surrogate primary key. The SQL standard requires the referenced column(s) to have a UNIQUE or PRIMARY KEY constraint.',
              color: 'var(--accent)',
            },
            {
              question: 'Can a primary key be NULL?',
              trap: 'Saying "a primary key just needs to be unique."',
              correctAnswer: 'No. A primary key attribute can NEVER be NULL — this is the entity integrity constraint. The reason: NULL means "unknown" or "not applicable." If a primary key could be NULL, it would mean "there exists a tuple whose identity is unknown" — which makes no sense. You cannot identify something with an unknown identifier. In SQL, PRIMARY KEY automatically implies NOT NULL, even if you don\'t write NOT NULL explicitly. A UNIQUE constraint, by contrast, allows NULL values (multiple rows can have NULL in a UNIQUE column because NULL ≠ NULL).',
              color: '#0078d4',
            },
            {
              question: 'Can a foreign key be NULL?',
              trap: 'Saying "no, foreign keys must always have valid values."',
              correctAnswer: 'Yes, a foreign key column can be NULL — if the column is declared nullable. NULL in a foreign key means "no relationship" or "relationship is unknown" — it does not violate referential integrity. Referential integrity only applies to non-NULL FK values. Example: an employee\'s manager_id FK can be NULL for the CEO (who has no manager). An order\'s delivery_agent_id can be NULL before a delivery agent is assigned. Whether a FK should be nullable is a business rule decision: total participation → NOT NULL. Partial participation → nullable.',
              color: '#8b5cf6',
            },
            {
              question: 'What is the difference between degree and cardinality?',
              trap: 'Confusing them or using them interchangeably.',
              correctAnswer: 'Degree is the number of attributes (columns) in a relation — a schema-level, static property. Degree changes only when you ALTER TABLE to add or remove columns, which is an infrequent, planned operation. Cardinality is the number of tuples (rows) currently in a relation — a data-level, dynamic property. Cardinality changes with every INSERT, DELETE, and sometimes UPDATE. A relation with degree 7 could have cardinality 0 (empty table), 1, or 10 billion. They are completely independent properties.',
              color: '#ff4757',
            },
            {
              question: 'Given functional dependencies AB→C, C→D, D→E, E→B, find all candidate keys.',
              trap: 'Only finding one candidate key and stopping.',
              correctAnswer: 'This requires computing attribute closures for all possible subsets. Start with attributes that appear only on the right side of FDs (C, D, E, B) — these cannot be in any candidate key alone because they are "determined by" others. Attributes that appear only on the left side or not at all (A in this case) MUST be in every candidate key (they cannot be derived from anything). {A} alone: A+ = {A} — not all attributes. {AB}: AB+ = {A,B} → AB→C → {A,B,C} → C→D → {A,B,C,D} → D→E → {A,B,C,D,E} = all. {AB} is a candidate key. {AE}: AE+ → E→B → {A,B,E} → AB→C → {A,B,C,E} → C→D → {A,B,C,D,E} = all. {AE} is also a candidate key. Both are minimal. The relation has two candidate keys: {A,B} and {A,E}.',
              color: '#e879f9',
            },
            {
              question: 'What is the difference between RESTRICT and NO ACTION in foreign key constraints?',
              trap: 'Saying they are identical.',
              correctAnswer: 'Both RESTRICT and NO ACTION prevent deletion or update of a parent row if child rows exist. The difference is WHEN the check occurs. RESTRICT checks immediately — the moment the DELETE or UPDATE is executed, if a violation exists, the statement fails immediately. NO ACTION defers the check to end of statement or end of transaction (in deferred mode). NO ACTION is useful when you need to reorganise data within a transaction — you might temporarily create a state that would violate the constraint, then fix it before the transaction commits. RESTRICT never allows a temporarily violating state.',
              color: '#0078d4',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Q: {item.question}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Trap:</span>
                <span style={{ fontSize: 13, color: '#ff4757',  lineHeight: 1.7, fontStyle: 'italic' }}>{item.trap}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 2 }}>Answer:</span>
                <span style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.8 }}>{item.correctAnswer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 9 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Schema Review — A Senior Engineer Catches Five Key Mistakes</SectionTitle>

        <Para>
          Key and constraint decisions made at schema design time are often irreversible in
          production — changing a primary key type after 100 million rows exist requires
          a full table rewrite. The following is a realistic code review conversation
          showing the kinds of key-related mistakes that junior engineers commonly make
          and what the correct approach is.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 16, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            PR Review — Schema for New Payments Feature (Junior Engineer's Version)
          </div>
          <CodeBox label="Junior engineer's original schema — 5 problems">
{`-- Junior engineer's initial schema:
CREATE TABLE payment_methods (
    card_number     VARCHAR(16)   PRIMARY KEY,    -- MISTAKE 1
    cardholder_name VARCHAR(200)  NOT NULL,
    expiry_month    INT,                          -- MISTAKE 2
    expiry_year     INT,                          -- MISTAKE 2
    cvv             VARCHAR(3),                   -- MISTAKE 3
    user_id         INT,                          -- MISTAKE 4
    billing_address TEXT
);

CREATE TABLE transactions (
    txn_id          VARCHAR(50)   PRIMARY KEY,    -- MISTAKE 5
    card_number     VARCHAR(16)   REFERENCES payment_methods,
    amount          DECIMAL(10,2),
    txn_date        TIMESTAMP     DEFAULT NOW(),
    status          VARCHAR(20)
);`}
          </CodeBox>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                mistake: 'MISTAKE 1: Using card_number as PRIMARY KEY',
                color: '#ff4757',
                comment: 'Card numbers change. When a customer gets a new card (expiry, compromise, replacement), their card_number changes. Because this is the PK, every reference to it (in transactions table) must CASCADE UPDATE — meaning millions of transaction records need rewriting. Also: exposing card_number as a PK means it appears in URLs, logs, and error messages — PCI DSS violation risk.',
                fix: 'Use SERIAL/BIGSERIAL as surrogate PK. Add card_number as NOT NULL UNIQUE (alternate key). Use the surrogate PK in foreign keys.',
              },
              {
                mistake: 'MISTAKE 2: No composite CHECK on expiry_month + expiry_year',
                color: '#f97316',
                comment: 'expiry_month INT and expiry_year INT with no constraints allows storing month=13, year=1800, or a technically valid expiry date that is in the past. Domain constraints are missing entirely.',
                fix: 'CHECK (expiry_month BETWEEN 1 AND 12). CHECK (expiry_year >= EXTRACT(YEAR FROM CURRENT_DATE)). Or better: store as a DATE type (first day of the expiry month) for proper date arithmetic.',
              },
              {
                mistake: 'MISTAKE 3: Storing CVV in the database',
                color: '#ff4757',
                comment: 'CVV must NEVER be stored. PCI DSS (Payment Card Industry Data Security Standard) explicitly prohibits storing CVV after transaction authorisation. Storing it in plaintext in a VARCHAR column is a severe compliance violation that can result in loss of payment processing capability and massive fines.',
                fix: 'Remove the cvv column entirely. CVV is transmitted for authorisation and never stored.',
              },
              {
                mistake: 'MISTAKE 4: user_id is nullable (no NOT NULL constraint)',
                color: '#facc15',
                comment: 'A payment method with no associated user is meaningless in this context. Additionally, there\'s no FOREIGN KEY constraint — user_id can reference a non-existent user, creating orphaned payment methods that belong to nobody.',
                fix: 'ADD NOT NULL. ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE (or RESTRICT depending on business logic).',
              },
              {
                mistake: 'MISTAKE 5: Application-generated VARCHAR primary key on transactions',
                color: '#8b5cf6',
                comment: 'Application-generated VARCHAR PKs (like order IDs built from timestamps or UUIDs formatted as strings) are brittle — the format can change, they can collide if generation logic has bugs, and VARCHAR comparisons are slower than integer comparisons. For a high-throughput transactions table, PK choice has significant performance implications.',
                fix: 'Use BIGSERIAL (for single database) or UUID (for distributed system) as the primary key. If a human-readable transaction reference is needed, generate it as a separate UNIQUE column (alternate key), not as the PK.',
              },
            ].map((item, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.mistake}</div>
                <Para>{item.comment}</Para>
                <div style={{ fontSize: 13, color: item.color, fontFamily: 'Inter, sans-serif' }}>→ Fix: {item.fix}</div>
              </div>
            ))}
          </div>

          <CodeBox label="Corrected schema after senior engineer's review">
{`-- Corrected schema:
CREATE TABLE payment_methods (
    payment_method_id  BIGSERIAL     PRIMARY KEY,     -- surrogate PK (stable, fast)
    user_id            INT           NOT NULL,         -- FK with NOT NULL
    card_number        CHAR(16)      NOT NULL UNIQUE,  -- alternate key
    -- Note: in production, card_number should be TOKENIZED, not stored in plaintext
    -- Use a payment vault (Stripe, Stripe) that stores the actual number
    -- and returns a token. Store the token here, not the card number.
    cardholder_name    VARCHAR(200)  NOT NULL,
    expiry_month       SMALLINT      NOT NULL CHECK (expiry_month BETWEEN 1 AND 12),
    expiry_year        SMALLINT      NOT NULL CHECK (expiry_year >= EXTRACT(YEAR FROM CURRENT_DATE)),
    -- CVV: REMOVED — never store CVV per PCI DSS requirement
    card_type          VARCHAR(20)   NOT NULL CHECK (card_type IN ('visa','mastercard','rupay','amex')),
    is_default         BOOLEAN       NOT NULL DEFAULT false,
    created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    -- RESTRICT: don't allow deleting users who have payment methods
    -- Business rule: deactivate users, don't delete them, to preserve payment history
    
    CHECK (
        expiry_year > EXTRACT(YEAR FROM CURRENT_DATE)
        OR (expiry_year = EXTRACT(YEAR FROM CURRENT_DATE)
            AND expiry_month >= EXTRACT(MONTH FROM CURRENT_DATE))
    )
    -- Cross-column check: expiry must be in the future
);

CREATE TABLE transactions (
    txn_id             BIGSERIAL      PRIMARY KEY,     -- surrogate PK (fast, sequential)
    txn_reference      VARCHAR(30)    NOT NULL UNIQUE, -- human-readable reference (alternate key)
    -- e.g., 'TXN-20240315-00001' generated by application, stored as separate column
    
    payment_method_id  BIGINT         NOT NULL,        -- FK to surrogate PK (not card_number)
    amount             DECIMAL(12,2)  NOT NULL CHECK (amount > 0),
    currency           CHAR(3)        NOT NULL DEFAULT 'INR',
    txn_timestamp      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status             VARCHAR(20)    NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','authorised','captured','failed','refunded','voided')),
    failure_reason     TEXT,  -- NULL unless status = 'failed'
    
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id)
    ON DELETE RESTRICT  -- never delete a payment method that has transactions
);`}
          </CodeBox>
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'The relational model is built on set theory — a relation is a set of tuples. Set properties directly explain SQL behaviour: no inherent row order (ORDER BY is display-only), no duplicate rows by default, attributes identified by name not position.',
        'Eight core terms: Relation=table, Tuple=row, Attribute=column, Domain=allowed values, Degree=column count (static), Cardinality=row count (dynamic), Schema=structure definition, Instance=actual current data.',
        'NULL means unknown or inapplicable — not zero, not empty string. NULL in any arithmetic produces NULL. NULL = NULL produces UNKNOWN (not TRUE). Use IS NULL, not = NULL. NOT IN with a subquery that can return NULL silently returns no rows — use NOT EXISTS instead.',
        'Five relational properties: no duplicate tuples (set property), tuples are unordered (set property), attributes are unordered within a tuple, all attribute values are atomic (1NF), each attribute has a unique name within the relation.',
        'Key hierarchy: Super Key (any unique-identifying set) → Candidate Key (minimal super key) → Primary Key (chosen candidate key, NOT NULL enforced) / Alternate Key (unchosen candidate keys, UNIQUE constraint). Foreign Key is orthogonal — it references another relation\'s PK or alternate key.',
        'Primary key must be: unique, not null, stable, minimal, and simple. Among candidate keys, prefer system-generated integers (surrogate keys) over natural keys for stability and performance.',
        'Foreign key enforces referential integrity. ON DELETE options: RESTRICT (default, safest), CASCADE (propagates deletion), SET NULL (removes the reference), SET DEFAULT (substitutes a default). Choose based on the business rule for the relationship.',
        'All four constraint types: Domain (CHECK + data type), Key (PRIMARY KEY + UNIQUE), NOT NULL (entity integrity), Referential (FOREIGN KEY). Constraints enforced at the DBMS level are race-condition-proof — application-level checks are not.',
        'Surrogate keys (SERIAL/BIGSERIAL/UUID) are preferred in modern systems: they never change, are always simple, have no business meaning that could change, and perform better as integer comparisons in JOINs.',
        'UNIQUE and PRIMARY KEY differ in one critical way: UNIQUE allows multiple NULL values (because NULL ≠ NULL in three-valued logic). PRIMARY KEY never allows NULL. This distinction is tested in nearly every DBMS interview.',
      ]} />

    </LearnLayout>
  )
}