import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Relational Model & Keys | DBMS | Chaduvuko',
  description:
    'Tables, tuples, domains, and every type of key explained clearly — Super Key, Candidate Key, Primary Key, Foreign Key, Composite Key, Surrogate Key.',
}

export default function RelationalModel() {
  return (
    <LearnLayout
      title="Relational Model & Keys"
      description="The mathematical foundation of every relational database — what a relation actually is, and how keys hold the entire system together."
      section="DBMS"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      {/* ── SECTION 1 — RELATIONAL MODEL ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          The relational model is built on a branch of mathematics called <strong style={{ color: 'var(--text)' }}>set theory</strong>.
          In 1970, Edgar Codd took that math and applied it to data storage — the result was the most
          durable idea in computing history. Every MySQL, PostgreSQL, Oracle, and SQL Server database
          you will ever work with is an implementation of his model.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          Understanding the formal vocabulary is important — not because you'll use it in daily work,
          but because every interview question, every textbook, and every GATE exam paper uses these
          exact terms. Know them cold.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            { term: 'Relation', informal: 'Table', definition: 'A two-dimensional structure of rows and columns representing a single entity type. Every relation has a name.', example: 'The "customers" table is a relation.' },
            { term: 'Tuple', informal: 'Row / Record', definition: 'A single horizontal entry in a relation. Represents one instance of the entity.', example: 'One row in customers = one specific customer like Rahul Sharma.' },
            { term: 'Attribute', informal: 'Column / Field', definition: 'A named property of the relation. Has a specific data type and domain.', example: 'customer_id, name, city, phone are attributes of customers.' },
            { term: 'Domain', informal: 'Allowed Values', definition: 'The complete set of valid values an attribute can hold. Enforces data accuracy at the lowest level.', example: 'Domain of "city" = set of valid Indian city names. Domain of "age" = integers 0–120.' },
            { term: 'Degree', informal: 'Number of Columns', definition: 'The total number of attributes (columns) in a relation.', example: 'A customers table with 5 columns has degree 5.' },
            { term: 'Cardinality', informal: 'Number of Rows', definition: 'The total number of tuples (rows) currently in a relation. Changes as data is inserted/deleted.', example: 'A customers table with 10,000 rows has cardinality 10,000.' },
            { term: 'Schema', informal: 'Table Structure', definition: 'The definition of a relation — its name, attributes, and domains. The structure without the data.', example: 'customers(customer_id, name, city, phone) — this is the schema.' },
            { term: 'Instance', informal: 'Actual Data', definition: 'The actual data in a relation at a specific point in time. Changes constantly.', example: 'The 10,000 rows currently in the customers table — that is the instance.' },
          ].map((item) => (
            <div key={item.term} style={{ display: 'flex', gap: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg2)', borderRight: '1px solid var(--border)', padding: '16px 18px', minWidth: 130, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.term}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>= {item.informal}</div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>{item.definition}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 5, padding: '5px 10px', display: 'inline-block' }}>{item.example}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2 — PROPERTIES OF A RELATION ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Properties Every Relation Must Have
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {[
            { prop: 'No duplicate tuples', desc: 'Every row must be unique. Two rows cannot be identical in all columns. This is why we have primary keys.' },
            { prop: 'Tuples are unordered', desc: 'The order of rows does not matter. Row 1 is not "more important" than Row 100. SQL\'s ORDER BY is just for display.' },
            { prop: 'Attributes are unordered', desc: 'The order of columns does not matter logically. Physically the DB may store them in order, but logically they are a set.' },
            { prop: 'Atomic attribute values', desc: 'Each cell holds exactly one value — not a list, not a nested structure. This is First Normal Form at its root.' },
            { prop: 'Each attribute has a unique name', desc: 'Two columns in the same table cannot have the same name. Column names identify attributes unambiguously.' },
            { prop: 'NULL values are allowed', desc: 'NULL means the value is unknown or not applicable — not zero, not empty string. NULL is a special marker.' },
          ].map((item) => (
            <div key={item.prop} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.prop}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3 — ALL KEY TYPES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>
          Keys — The Most Interview-Heavy Topic in DBMS
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 28, fontFamily: 'Inter, sans-serif' }}>
          A key is any attribute (or combination of attributes) that can uniquely identify a tuple.
          There are 7 types. Every DBMS exam and placement interview asks about them.
        </p>

        {/* Example table first */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>Reference table — we'll use this for all key examples</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['emp_id', 'name', 'email', 'dept_id', 'phone'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 14px', color: 'var(--accent)', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font-mono)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['E001', 'Rahul Sharma', 'rahul@co.in', 'D01', '98765-43210'],
                  ['E002', 'Priya Reddy', 'priya@co.in', 'D02', '87654-32109'],
                  ['E003', 'Arjun Nair', 'arjun@co.in', 'D01', '76543-21098'],
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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              key: 'Super Key', color: '#f97316',
              def: 'Any set of one or more attributes that can uniquely identify a tuple. There can be many super keys — including keys with unnecessary extra attributes.',
              example: '{emp_id}, {email}, {phone}, {emp_id, name}, {emp_id, email, phone} — all are super keys.',
              note: 'Super keys can have "extra" attributes that are not needed. That\'s fine — they still uniquely identify a row.',
            },
            {
              key: 'Candidate Key', color: '#facc15',
              def: 'A minimal super key — a super key with no unnecessary attributes. Remove any attribute and it no longer uniquely identifies a row.',
              example: '{emp_id}, {email}, {phone} — all three are candidate keys. {emp_id, name} is NOT because {emp_id} alone is enough.',
              note: 'A table can have multiple candidate keys. They are all equally valid for uniquely identifying rows.',
            },
            {
              key: 'Primary Key', color: 'var(--accent)',
              def: 'The one candidate key chosen to be the official identifier of the table. Chosen by the DBA or developer. Cannot be NULL. Must be unique.',
              example: 'We choose emp_id as primary key. It\'s simple, numeric, never null, and guaranteed unique.',
              note: 'A table has ONLY ONE primary key — but it can be a composite of multiple columns (composite PK).',
            },
            {
              key: 'Alternate Key', color: '#8b5cf6',
              def: 'Every candidate key that was NOT chosen as the primary key. They can still be used for lookups and usually get UNIQUE constraints.',
              example: 'email and phone are alternate keys. Still unique — just not the primary identifier.',
              note: 'In SQL these become UNIQUE constraints: ALTER TABLE employees ADD UNIQUE(email)',
            },
            {
              key: 'Foreign Key', color: '#0078d4',
              def: 'An attribute in one table that references the primary key of another table. Enforces referential integrity — you cannot reference a row that doesn\'t exist.',
              example: 'orders.customer_id is a foreign key referencing customers.customer_id',
              note: 'Foreign keys prevent orphaned records. You cannot add an order for customer_id=C999 if C999 doesn\'t exist in customers.',
            },
            {
              key: 'Composite Key', color: '#f97316',
              def: 'A primary key made of two or more columns combined. Used when no single column is unique enough on its own.',
              example: 'In order_items: PK = (order_id, line_number). Neither column alone is unique — together they are.',
              note: 'The combination must be unique. Individual columns can repeat.',
            },
            {
              key: 'Surrogate Key', color: 'var(--muted)',
              def: 'A system-generated key with no real-world meaning. Usually an auto-incrementing integer or UUID. Created purely to serve as a unique identifier.',
              example: 'An auto-increment id column (1, 2, 3, 4...) added because the natural data has no clean unique identifier.',
              note: 'Most modern databases prefer surrogate keys for PKs. They never change, have no business meaning, and are always unique.',
            },
          ].map((item) => (
            <div key={item.key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.key}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{item.def}</p>
              <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', marginBottom: 8 }}>
                <span style={{ color: 'var(--muted)' }}>Example: </span>{item.example}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>💡 {item.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERVIEW TRAP ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          The Most Common Interview Trap — Candidate Key vs Primary Key
        </h2>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Candidate Key</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Can be multiple per table', 'All are equally valid uniquely', 'Chosen from to become PK', 'Can be NULL (until chosen as PK)', 'emp_id, email, phone are all candidate keys'].map((p) => (
                  <li key={p} style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', display: 'flex', gap: 8 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Primary Key</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Only ONE per table', 'The chosen official identifier', 'Must NEVER be NULL', 'Must NEVER change', 'emp_id is chosen as PK'].map((p) => (
                  <li key={p} style={{ fontSize: 13, color: 'var(--text2)', fontFamily: 'Inter, sans-serif', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#0078d4', flexShrink: 0 }}>▸</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Callout type="tip">
            Memory trick: <strong>Every Primary Key is a Candidate Key</strong> — but not every
            Candidate Key is a Primary Key. Think of it like elections — everyone who wins the
            nomination (candidate key) is eligible, but only one person wins the election (primary key).
          </Callout>
        </div>
      </section>

      {/* ── INTEGRITY CONSTRAINTS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Integrity Constraints — Rules That Keep Data Honest
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { name: 'Domain Constraint', desc: 'Every value must belong to the domain of its attribute. Age cannot be "hello". City cannot be -500.', color: '#0078d4' },
            { name: 'Key Constraint', desc: 'No two tuples can have the same primary key value. Primary key must always be unique.', color: 'var(--accent)' },
            { name: 'NOT NULL Constraint', desc: 'Primary key attributes can never be NULL. Also applies to other columns marked NOT NULL.', color: '#f97316' },
            { name: 'Referential Integrity', desc: 'A foreign key value must either be NULL (if allowed) or match an existing primary key in the referenced table. You cannot reference a row that does not exist.', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.name} style={{ display: 'flex', gap: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', alignItems: 'flex-start' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 5, boxShadow: `0 0 6px ${item.color}60` }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{item.name}</div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <KeyTakeaways items={[
        'Relation = table. Tuple = row. Attribute = column. Domain = allowed values. Schema = structure. Instance = actual data.',
        'Degree = number of columns. Cardinality = number of rows. Both terms appear heavily in GATE exams.',
        'Super key: uniquely identifies rows (may have extras). Candidate key: minimal super key. Primary key: the one chosen candidate key.',
        'A table can have multiple candidate keys but only ONE primary key. All non-chosen candidate keys become alternate keys.',
        'Foreign key enforces referential integrity — you cannot reference a row that does not exist in the parent table.',
        'Surrogate keys (auto-increment IDs) are preferred in modern databases. They have no business meaning and never change.',
      ]} />
    </LearnLayout>
  )
}