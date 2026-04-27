import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Entity-Relationship Model — Complete Guide | DBMS | Chaduvuko',
  description:
    'The complete ER model from first principles — entities, attributes, relationships, cardinality, participation constraints, weak entities, generalisation, specialisation, aggregation, and complete ER-to-relational mapping with worked examples.',
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

export default function ERModel() {
  return (
    <LearnLayout
      title="Entity-Relationship (ER) Model"
      description="The architectural blueprint of database design — how to model any real-world system as entities, attributes, and relationships before writing a single line of SQL."
      section="DBMS"
      readTime="80–95 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — WHY ER MODEL EXISTS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Foundation" />
        <SectionTitle>Why the ER Model Exists — The Gap It Was Built to Fill</SectionTitle>

        <Para>
          By 1976, the relational model had been defined by Codd (1970) and SQL was being
          developed at IBM. The theory of how to store data was solid. But there was a painful
          gap: how do you <strong style={{ color: 'var(--text)' }}>design</strong> the schema
          in the first place? Given a real-world problem — build a database for a university,
          a hospital, a bank — how do you systematically identify what tables to create,
          what columns they should have, and how they should connect?
        </Para>

        <Para>
          There was no methodology. Developers would stare at requirements documents and
          try to intuit table structures. Different engineers on the same team would design
          incompatible schemas for the same problem. Stakeholders — who understood the
          business domain but not relational algebra — could not validate whether a schema
          correctly captured the real-world rules they cared about.
        </Para>

        <Para>
          In 1976, Peter Pin-Shan Chen published "The Entity-Relationship Model — Toward a
          Unified View of Data" in ACM Transactions on Database Systems. His contribution
          was not a new storage model — it was a <strong style={{ color: 'var(--text)' }}>design
          methodology</strong> with a visual notation. The ER model gave database designers
          a systematic way to:
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {[
            { point: 'Capture the real-world miniworld precisely', detail: 'Identify every significant thing (entity), every important property (attribute), and every meaningful connection (relationship) in the domain being modelled.' },
            { point: 'Communicate design to non-technical stakeholders', detail: 'ER diagrams are visual — a domain expert who has never seen SQL can look at an ER diagram and confirm whether it correctly captures the rules of their domain.' },
            { point: 'Validate completeness and correctness before implementation', detail: 'Mistakes discovered on paper cost nothing. Mistakes discovered after 50,000 lines of application code have been written against a wrong schema cost weeks of re-engineering.' },
            { point: 'Provide a systematic path to relational tables', detail: 'The ER model has a defined, algorithmic mapping to relational tables. Once you have a correct ER diagram, the table design largely derives mechanically.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                color: 'var(--accent)', background: 'rgba(0,230,118,0.08)',
                border: '1px solid rgba(0,230,118,0.2)', borderRadius: 5,
                padding: '2px 8px', flexShrink: 0, marginTop: 1,
                minWidth: 24, textAlign: 'center',
              }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 5, fontFamily: 'Syne, sans-serif' }}>{item.point}</div>
                <Para>{item.detail}</Para>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>The ER Model's Role in the Design Process</div>
          <Para>
            The ER model is a <strong style={{ color: 'var(--text)' }}>conceptual model</strong> —
            it operates at the level of the problem domain, not the level of database implementation.
            It describes the world in terms of things and their relationships. It has nothing to say
            about tables, columns, indexes, or SQL. Those concerns come later — after the conceptual
            model is complete and validated. This separation of concerns is what makes the ER model
            so powerful: you solve the domain problem first, then solve the implementation problem.
          </Para>
        </div>

        <SubTitle>The Miniworld — What You Are Actually Modelling</SubTitle>

        <Para>
          When designing a database, you are not modelling the entire world — you are modelling
          a specific, bounded portion of reality called the
          <strong style={{ color: 'var(--text)' }}> miniworld</strong> (or universe of discourse).
          The miniworld is defined by the purposes the database must serve and the questions
          it must be able to answer.
        </Para>

        <Para>
          Consider designing a database for a hospital. The real world contains patients, doctors,
          nurses, administrators, suppliers, insurance companies, medications, equipment, buildings,
          parking lots, and thousands of other entities. But the hospital's database miniworld might
          be narrowly defined as: patients, their medical records, doctors who treat them, the
          wards they are admitted to, and the medications they are prescribed. Everything outside
          this boundary is excluded from the model — not because it doesn't exist, but because
          the database doesn't need to know about it.
        </Para>

        <Para>
          Defining the miniworld precisely is the first and most critical step in database design.
          Scope creep in the miniworld definition is the most common cause of over-engineered,
          bloated schemas that are expensive to build and maintain.
        </Para>
      </section>

      {/* ========================================
          PART 2 — ENTITIES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — The Things" />
        <SectionTitle>Entities — Modelling the Things That Exist</SectionTitle>

        <Para>
          An <strong style={{ color: 'var(--text)' }}>entity</strong> is any object or thing in
          the real world that has an independent existence and about which the database needs to
          store information. Entities are the nouns of your data model. Every table in your
          final relational schema will correspond to either an entity or a relationship in
          your ER diagram.
        </Para>

        <Para>
          The critical word is <strong style={{ color: 'var(--text)' }}>independent</strong>.
          An entity can exist on its own. A customer exists regardless of whether they have
          placed an order. A professor exists regardless of whether they are currently teaching
          a course. A product exists regardless of whether anyone has bought it. This independent
          existence is what distinguishes an entity from an attribute.
        </Para>

        <SubTitle>Entity Type vs Entity Instance — The Distinction That Matters</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0078d4', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Entity Type</div>
            <Para>
              The abstract category — the definition or template. It describes the kind of
              thing, not any specific instance. In ER diagrams, entity types are drawn as
              rectangles. In the final relational schema, an entity type becomes a table.
            </Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#0078d4' }}>
              CUSTOMER, PRODUCT, ORDER, EMPLOYEE
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Entity Instance</div>
            <Para>
              A specific, concrete occurrence of an entity type. A particular customer,
              a particular product, a particular order. In the final relational schema,
              an entity instance becomes a row in a table.
            </Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>
              "Rahul Sharma", "Chicken Biryani", "ORD-4521"
            </div>
          </div>
        </div>

        <SubTitle>Strong Entities — The Independent Building Blocks</SubTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>strong entity</strong> (also called a regular
          entity) is one that has its own unique identifier — an attribute or combination of
          attributes whose value is unique across all instances of that entity type and is
          never null. A strong entity can be uniquely identified without reference to any
          other entity. In ER diagrams, strong entities are drawn with a
          <strong style={{ color: 'var(--text)' }}> single-line rectangle</strong>.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { entity: 'CUSTOMER', identifier: 'customer_id', why: 'Each customer has a unique ID assigned at registration. No two customers share an ID. The ID is never null.', color: '#0078d4' },
            { entity: 'PRODUCT', identifier: 'product_id or SKU', why: 'Each product has a unique product code. Products exist independently of any orders.', color: 'var(--accent)' },
            { entity: 'EMPLOYEE', identifier: 'employee_id', why: 'Each employee has a unique employee number assigned at hiring. Exists independently of assignments.', color: '#f97316' },
            { entity: 'DEPARTMENT', identifier: 'dept_code', why: 'A department exists independently of whether it currently has any employees.', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.entity} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.entity}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Key: {item.identifier}</div>
              <Para>{item.why}</Para>
            </div>
          ))}
        </div>

        <SubTitle>Weak Entities — The Dependents</SubTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>weak entity</strong> is one that
          <strong style={{ color: 'var(--text)' }}> cannot be uniquely identified</strong> by
          its own attributes alone — it depends on a related strong entity (called its
          <strong style={{ color: 'var(--text)' }}> owner entity</strong> or
          <strong style={{ color: 'var(--text)' }}> identifying entity</strong>) for its
          identity. A weak entity's existence is contingent on the existence of its owner —
          if the owner is deleted, the weak entity must also be deleted. In ER diagrams,
          weak entities are drawn with a <strong style={{ color: 'var(--text)' }}>double-line rectangle</strong>.
        </Para>

        <Para>
          The attribute that partially identifies a weak entity (within the context of its
          owner) is called the <strong style={{ color: 'var(--text)' }}>partial key</strong>
          or <strong style={{ color: 'var(--text)' }}>discriminator</strong>. A partial key
          is unique only within the set of weak entity instances associated with one specific
          owner instance — not globally unique across the entire entity set.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[
            {
              weak: 'ORDER_ITEM',
              owner: 'ORDER',
              partialKey: 'line_number',
              color: '#ff4757',
              explanation: 'An order item (line item) exists only within an order. Line number 1 in Order ORD-001 is completely different from Line number 1 in Order ORD-002. The line_number is not globally unique — it is only meaningful within a specific order. If Order ORD-001 is cancelled and deleted, all its line items must also be deleted.',
              fullKey: '(order_id, line_number) — combined from owner PK + partial key',
            },
            {
              weak: 'DEPENDENT',
              owner: 'EMPLOYEE',
              partialKey: 'dependent_name',
              color: '#f97316',
              explanation: 'Employee dependents (family members enrolled in company benefits) exist only in the context of the employee. An employee\'s dependent named "Priya" is identified by the combination of employee ID + dependent name. If the employee leaves the company and is deleted, their dependents are also removed.',
              fullKey: '(employee_id, dependent_name)',
            },
            {
              weak: 'BANK_ACCOUNT',
              owner: 'BRANCH',
              partialKey: 'account_number',
              color: '#8b5cf6',
              explanation: 'In many banking systems, account numbers are only unique within a branch — the same account number can exist in two different branches. The account is identified by the combination of branch_code + account_number. This is a classic textbook example because it reveals how institutional identifiers are often not globally unique.',
              fullKey: '(branch_code, account_number)',
            },
          ].map((item) => (
            <div key={item.weak} style={{ background: 'var(--surface)', border: `1px solid ${item.color}40`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 14, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: item.color }}>{item.weak}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>depends on</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: 'var(--text)' }}>{item.owner}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}25`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>WEAK ENTITY</span>
              </div>
              <Para>{item.explanation}</Para>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Partial key:</span>
                <span style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.partialKey}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Full key:</span>
                <span style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>{item.fullKey}</span>
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning">
          <strong>The most common weak entity mistake in exams and interviews:</strong> Students
          confuse weak entities with entities that happen to have foreign keys. Every entity
          in a relational schema has foreign keys — that does not make them weak. A weak entity
          is specifically one whose primary key is composed partly of a foreign key from its
          owner entity. The test: can this entity instance be uniquely identified without
          knowing which owner it belongs to? If yes — strong. If no — weak.
        </Callout>
      </section>

      {/* ========================================
          PART 3 — ATTRIBUTES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — The Properties" />
        <SectionTitle>Attributes — Every Type, Every Implication</SectionTitle>

        <Para>
          An <strong style={{ color: 'var(--text)' }}>attribute</strong> is a property or
          characteristic that describes an entity type or a relationship type. Attributes
          represent the data we want to store about entities. In the final relational schema,
          most attributes become columns. But not all attributes translate to columns in the
          same way — different attribute types have different implementation implications.
        </Para>

        <Para>
          Understanding attribute types is not just academic — each type has a specific
          consequence for how the database is designed and how queries are written.
          Getting this wrong leads to either over-complicated designs or designs that
          cannot answer required questions.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>

          {/* Simple Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Simple (Atomic) Attribute</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0078d4', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Most Common</span>
              </div>
              <Para>
                A simple attribute is one that cannot be subdivided into smaller, meaningful
                components. It holds exactly one value — a single atomic unit of data.
                Simple attributes map directly and cleanly to a single column in the
                relational schema. They are the baseline case.
              </Para>
              <Para>
                The definition of "atomic" is relative to the miniworld. Age is atomic —
                it is a single number with no meaningful sub-components in most contexts.
                Phone number might be considered atomic in one system (just store the string)
                but composite in another (country code, area code, subscriber number need
                to be searched separately).
              </Para>
              <CodeBox label="Simple attributes → direct column mapping">
{`CUSTOMER entity — simple attributes:
  customer_id   → column customer_id     (single value, uniquely identifies)
  age           → column age             (single integer, no sub-components)
  email         → column email           (single string value)
  is_active     → column is_active       (single boolean)
  created_at    → column created_at      (single timestamp)

-- In the relational schema:
CREATE TABLE customers (
    customer_id   VARCHAR(10)  PRIMARY KEY,
    age           INT          CHECK (age >= 0 AND age <= 150),
    email         VARCHAR(150) UNIQUE NOT NULL,
    is_active     BOOLEAN      NOT NULL DEFAULT true,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);
-- Each simple attribute = one column. One-to-one translation.`}
              </CodeBox>
            </div>
          </div>

          {/* Composite Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Composite Attribute</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Design Decision Required</span>
              </div>
              <Para>
                A composite attribute is one that can be subdivided into smaller sub-attributes,
                each of which has independent meaning. The composite attribute itself has meaning
                (the full address), and each component also has independent meaning (the city
                can be searched on its own, the zip_code can be used for delivery zone grouping).
              </Para>
              <Para>
                The design question is whether to store the composite attribute as a single column
                or split it into its components. The answer depends on whether the sub-components
                are ever searched, filtered, grouped, or displayed independently. If you will
                ever run a query like <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}>WHERE city = 'San Francisco'</code>,
                then city must be its own column — you cannot efficiently search within
                a single address string for a city value.
              </Para>
              <CodeBox label="Composite attributes — two implementation strategies">
{`-- COMPOSITE ATTRIBUTE: address (street, city, state, zip_code, country)
-- COMPOSITE ATTRIBUTE: full_name (first_name, middle_name, last_name)
-- COMPOSITE ATTRIBUTE: phone (country_code, area_code, number)

-- Strategy 1: STORE AS SEPARATE COLUMNS (when components are queried independently)
CREATE TABLE customers (
    customer_id   VARCHAR(10)  PRIMARY KEY,
    first_name    VARCHAR(50)  NOT NULL,
    last_name     VARCHAR(50)  NOT NULL,
    -- full_name is derived: first_name || ' ' || last_name
    street        VARCHAR(200),
    city          VARCHAR(100),  -- searched: WHERE city = 'San Francisco'
    state         VARCHAR(50),
    zip_code       CHAR(6),        -- searched: WHERE zip_code = '560001'
    country       VARCHAR(50)    DEFAULT 'India'
);
-- Queries on individual components are efficient (indexable).
-- More columns, but full query flexibility.

-- Strategy 2: STORE AS SINGLE COLUMN (when always used as a whole)
CREATE TABLE customers (
    customer_id   VARCHAR(10)   PRIMARY KEY,
    full_name     VARCHAR(150)  NOT NULL,  -- never search by first/last separately
    address       TEXT                     -- always displayed as one unit, never filtered
);
-- Simpler schema, but cannot efficiently search by city or zip_code.

-- Strategy 3: JSONB for semi-structured addresses (PostgreSQL)
CREATE TABLE customers (
    customer_id   VARCHAR(10)   PRIMARY KEY,
    full_name     VARCHAR(150)  NOT NULL,
    address       JSONB         -- flexible: some customers have different address fields
    -- with GIN index: CREATE INDEX ON customers USING GIN (address)
    -- query: WHERE address->>'city' = 'San Francisco' (indexed)
);`}
              </CodeBox>
              <Callout type="tip">
                The right rule: if any sub-component of a composite attribute will ever be used
                in a WHERE clause, GROUP BY, ORDER BY, or JOIN — store it as a separate column
                with its own index. Storing "12 Brigade Road, San Francisco, Karnataka, 560001" as
                a single string and then trying to filter by city requires a full table scan
                with a LIKE '%San Francisco%' — which cannot use an index and will be catastrophically
                slow on millions of rows.
              </Callout>
            </div>
          </div>

          {/* Multi-valued Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Multi-valued Attribute</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Always Needs Separate Table</span>
              </div>
              <Para>
                A multi-valued attribute is one that can hold multiple values simultaneously
                for a single entity instance. A customer can have multiple phone numbers.
                An employee can have multiple skills. A product can belong to multiple
                categories. In ER diagrams, multi-valued attributes are drawn with a
                <strong style={{ color: 'var(--text)' }}> double-line ellipse</strong>.
              </Para>
              <Para>
                Multi-valued attributes <strong style={{ color: 'var(--text)' }}>cannot be stored
                as a single column</strong> in a properly normalised relational database.
                A column must hold exactly one atomic value (First Normal Form requirement).
                Storing multiple phone numbers as "98765-43210, 87654-32109" in a single
                string column violates 1NF, makes querying by phone number impossible,
                and creates update anomalies.
              </Para>
              <Para>
                The relational solution is always a separate table — one row per value,
                linked back to the parent entity via a foreign key. This is sometimes
                called a <strong style={{ color: 'var(--text)' }}>value table</strong>.
              </Para>
              <CodeBox label="Multi-valued attributes — always a separate table">
{`-- WRONG: Storing multi-valued attribute in one column (1NF violation)
CREATE TABLE customers (
    customer_id  VARCHAR(10) PRIMARY KEY,
    name         VARCHAR(100),
    phones       TEXT  -- "98765-43210, 87654-32109, 76543-21098" -- WRONG!
    -- Cannot index, cannot query by specific phone, update anomaly guaranteed
);

-- CORRECT: Separate table for each value
CREATE TABLE customer_phones (
    customer_id   VARCHAR(10)  NOT NULL,
    phone_number  VARCHAR(20)  NOT NULL,
    phone_type    VARCHAR(20)  DEFAULT 'mobile', -- mobile, home, work, whatsapp
    is_primary    BOOLEAN      DEFAULT false,
    
    PRIMARY KEY (customer_id, phone_number),  -- composite PK
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Similarly for skills:
CREATE TABLE employee_skills (
    employee_id   INT         NOT NULL,
    skill         VARCHAR(100) NOT NULL,
    proficiency   VARCHAR(20), -- beginner, intermediate, expert
    years_exp     INT,
    
    PRIMARY KEY (employee_id, skill),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Querying multi-valued attributes:
-- "Find all customers who have a WhatsApp number"
SELECT DISTINCT c.name, cp.phone_number
FROM customers c
JOIN customer_phones cp ON c.customer_id = cp.customer_id
WHERE cp.phone_type = 'whatsapp';

-- "Find all employees with Python skill at expert level"
SELECT e.name, es.years_exp
FROM employees e
JOIN employee_skills es ON e.employee_id = es.employee_id
WHERE es.skill = 'Python' AND es.proficiency = 'expert';`}
              </CodeBox>
            </div>
          </div>

          {/* Derived Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#8b5cf6' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Derived Attribute</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Store or Compute?</span>
              </div>
              <Para>
                A derived attribute is one whose value can be calculated or derived from
                other stored attributes or from related entity data. The value is not
                independently stored — it is computed on demand. In ER diagrams, derived
                attributes are drawn with a <strong style={{ color: 'var(--text)' }}>dashed ellipse</strong>.
              </Para>
              <Para>
                The design decision: should the derived attribute be computed dynamically
                at query time, or pre-computed and stored as a regular column? This is
                a performance-vs-consistency trade-off. Computed values are always accurate
                (they reflect the latest data) but add query computation cost. Stored values
                are fast to retrieve but can become stale if the underlying data changes
                and the derived value is not recalculated.
              </Para>
              <CodeBox label="Derived attributes — compute vs store analysis">
{`-- DERIVED: age (derived from date_of_birth)
-- STORE date_of_birth, COMPUTE age at query time:
SELECT
    name,
    date_of_birth,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth)) AS age
FROM customers;
-- Always accurate. Never stale. Slight computation cost per query.

-- DERIVED: order_total (derived from sum of order_items.quantity * price)
-- Option 1: Compute dynamically
SELECT
    o.order_id,
    SUM(oi.quantity * oi.unit_price) AS order_total
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- Option 2: Store as a column (denormalisation for performance)
ALTER TABLE orders ADD COLUMN order_total DECIMAL(10,2);
-- Must keep in sync: update orders.order_total whenever order_items change
-- Use trigger to maintain consistency:
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders
    SET order_total = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER recalculate_order_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW EXECUTE FUNCTION update_order_total();

-- DERIVED: years_of_service (derived from hire_date)
SELECT
    name,
    hire_date,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) AS years_of_service
FROM employees;

-- RULE: For frequently queried, slowly changing derived values → store with trigger
-- For rarely needed or fast to compute → compute dynamically
-- NEVER store derived values without a mechanism to keep them in sync`}
              </CodeBox>
            </div>
          </div>

          {/* Null Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#facc15' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Null-Valued Attributes — The Hidden Complexity</span>
              </div>
              <Para>
                NULL in a relational database does not mean zero, empty string, or false.
                NULL means the value is unknown, not applicable, or not available.
                These are semantically different situations that NULL cannot distinguish —
                which is one of the known theoretical weaknesses of the relational model
                as implemented.
              </Para>
              <Para>
                E.F. Codd himself recognised this problem and proposed a two-valued NULL system
                (unknown vs not applicable), which no major DBMS ever implemented. In practice,
                you must design your schema and queries to handle NULL carefully.
              </Para>
              <CodeBox label="NULL — three semantic meanings, one keyword">
{`-- NULL situation 1: VALUE UNKNOWN
-- An employee's salary is NULL — we simply don't have this information yet
SELECT name FROM employees WHERE salary IS NULL;  -- find unknown salaries

-- NULL situation 2: VALUE NOT APPLICABLE
-- A person's middle_name is NULL — they simply don't have one
-- This is "not applicable", not "unknown"

-- NULL situation 3: VALUE NOT YET ASSIGNED
-- An order's delivery_date is NULL — it hasn't been delivered yet
SELECT order_id FROM orders WHERE delivery_date IS NULL;  -- undelivered orders

-- The problem: SQL cannot distinguish between these three meanings
-- All three are represented identically: NULL

-- NULL in arithmetic: any arithmetic with NULL produces NULL
SELECT 100 + NULL;    -- Result: NULL (not 100!)
SELECT NULL * 5;      -- Result: NULL
SELECT NULL = NULL;   -- Result: NULL (not TRUE! Use IS NULL)

-- COALESCE: replace NULL with a default value
SELECT name, COALESCE(middle_name, '') AS middle_name FROM employees;
SELECT name, COALESCE(salary, 0) AS salary FROM employees;

-- NULLIF: return NULL if two values are equal
SELECT NULLIF(phone_number, '') AS phone  -- treat empty string same as NULL
FROM customers;

-- COUNT behaviour with NULL:
SELECT
    COUNT(*) AS total_rows,          -- counts ALL rows including NULLs
    COUNT(salary) AS with_salary,    -- counts only non-NULL salary rows
    COUNT(DISTINCT salary) AS unique_salaries  -- counts distinct non-NULL salaries
FROM employees;`}
              </CodeBox>
            </div>
          </div>

          {/* Key Attribute */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#ff4757' }} />
            <div style={{ padding: '22px 26px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 14, fontFamily: 'Syne, sans-serif' }}>Key Attribute — The Identifier</div>
              <Para>
                A key attribute is an attribute (or combination of attributes) whose value
                uniquely identifies each entity instance. It is represented in ER diagrams
                by <strong style={{ color: 'var(--text)' }}>underlining</strong> the attribute
                name. A strong entity must have at least one key attribute. If multiple
                attributes together form the key (and no single one is sufficient alone),
                all of them are underlined.
              </Para>
              <Para>
                It is important to distinguish between key attributes in the ER model
                (a design-level concept about unique identification) and primary keys in
                the relational model (an implementation-level choice). An entity type
                may have multiple key attributes (equivalent to candidate keys) — only
                one becomes the primary key in the relational schema.
              </Para>
              <CodeBox>
{`CUSTOMER entity:
  key attributes: customer_id, email (both uniquely identify a customer)
  → customer_id becomes PRIMARY KEY
  → email gets UNIQUE constraint (it's a candidate key, not chosen as PK)

STUDENT entity:
  key attributes: student_id, (college_name + roll_number combined)
  → student_id is the simpler key → becomes PRIMARY KEY
  → (college_name, roll_number) is a composite candidate key → UNIQUE constraint

FLIGHT entity:
  key attribute: (flight_number, departure_date) combined
  → Neither alone is unique (same flight number runs every day)
  → Together they uniquely identify a flight instance
  → Composite primary key: PRIMARY KEY (flight_number, departure_date)`}
              </CodeBox>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          PART 4 — RELATIONSHIPS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — The Connections" />
        <SectionTitle>Relationships — How Entities Connect to Each Other</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--text)' }}>relationship type</strong> is a meaningful
          association between two or more entity types. Relationships are the most powerful
          part of the ER model — they capture the semantic connections that give data its
          meaning and context. A customer without their orders is just a name. The
          relationship "PLACES" between CUSTOMER and ORDER is what makes the data a business.
        </Para>

        <Para>
          Like entity types, relationship types have
          <strong style={{ color: 'var(--text)' }}> relationship instances</strong> — specific
          associations between specific entity instances. "Rahul Sharma placed Order ORD-4521"
          is a relationship instance. "Prof. Kumar teaches CS301" is a relationship instance.
          In ER diagrams, relationship types are drawn as
          <strong style={{ color: 'var(--text)' }}> diamonds</strong>.
        </Para>

        <SubTitle>Degree of a Relationship — How Many Entity Types Participate</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 14, marginBottom: 28 }}>
          {[
            {
              degree: 'Unary (Degree 1)',
              also: 'Recursive / Self-Referential',
              color: '#0078d4',
              desc: 'A relationship between instances of the SAME entity type. One entity instance relates to another instance of the same type.',
              examples: [
                'EMPLOYEE "manages" EMPLOYEE — a manager is also an employee',
                'PERSON "is married to" PERSON — both sides are persons',
                'CATEGORY "is subcategory of" CATEGORY — hierarchical categories',
              ],
              tableImpact: 'Add a self-referential foreign key column to the same table: employees.manager_id → employees.employee_id',
            },
            {
              degree: 'Binary (Degree 2)',
              also: 'Most Common',
              color: 'var(--accent)',
              desc: 'A relationship between instances of TWO different entity types. The vast majority of real-world relationships are binary.',
              examples: [
                'CUSTOMER "places" ORDER',
                'EMPLOYEE "works in" DEPARTMENT',
                'STUDENT "enrolled in" COURSE',
              ],
              tableImpact: 'Implementation depends on cardinality (1:1, 1:N, M:N). Covered in depth in the cardinality section below.',
            },
            {
              degree: 'Ternary (Degree 3)',
              also: 'Three-Way Relationship',
              color: '#f97316',
              desc: 'A relationship involving THREE different entity types simultaneously. A ternary relationship captures a fact that cannot be correctly decomposed into binary relationships without losing information.',
              examples: [
                'SUPPLIER "supplies" PART "to" PROJECT — which supplier supplies which part to which project',
                'DOCTOR "prescribes" DRUG "to" PATIENT',
                'EMPLOYEE "uses" SKILL "on" PROJECT',
              ],
              tableImpact: 'Creates a junction table with foreign keys to all three participating entity tables.',
            },
          ].map((item) => (
            <div key={item.degree} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: `3px solid ${item.color}`, borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 4, fontFamily: 'Syne, sans-serif' }}>{item.degree}</div>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{item.also}</div>
              <Para>{item.desc}</Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', marginBottom: 10 }}>
                {item.examples.map((ex) => (
                  <div key={ex} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: item.color, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 12, color: 'var(--text2)',  lineHeight: 1.6 }}>{ex}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)',  fontStyle: 'italic', lineHeight: 1.6 }}>
                → Table impact: {item.tableImpact}
              </div>
            </div>
          ))}
        </div>

        <SubTitle>Relationship Attributes — Properties of the Connection Itself</SubTitle>

        <Para>
          Relationships can have their own attributes — properties that belong to the
          relationship instance, not to either participating entity. This is a subtle but
          important concept. The date an employee was assigned to a project is not a
          property of the employee (an employee has many assignments with different dates),
          nor is it a property of the project (a project has many employee assignments with
          different dates). It is a property of the specific EMPLOYEE-PROJECT assignment
          relationship instance.
        </Para>

        <CodeBox label="Relationship attributes — where they belong">
{`-- EMPLOYEE "works on" PROJECT relationship
-- Relationship attributes: start_date, hours_per_week, role

-- WRONG: Storing relationship attribute in EMPLOYEE table
employees (employee_id, name, project_id, project_start_date)
-- Fails when an employee works on multiple projects (which is common)

-- WRONG: Storing relationship attribute in PROJECT table
projects (project_id, name, employee_id, employee_start_date)
-- Fails when a project has multiple employees (which is always)

-- CORRECT: Junction table captures the M:N relationship AND its attributes
CREATE TABLE employee_project_assignments (
    employee_id     INT         NOT NULL,
    project_id      INT         NOT NULL,
    -- Relationship attributes:
    start_date      DATE        NOT NULL,
    end_date        DATE,         -- NULL if still active
    hours_per_week  DECIMAL(4,1) DEFAULT 40.0,
    role            VARCHAR(50),  -- lead, developer, reviewer, consultant
    
    PRIMARY KEY (employee_id, project_id),  -- or add start_date if re-assignments allowed
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (project_id)  REFERENCES projects(project_id)
);

-- Now: one employee on many projects, one project with many employees
-- AND the relationship-specific data (start_date, role) lives in the right place

-- STUDENT "enrolled in" COURSE with relationship attribute: enrollment_date, grade
CREATE TABLE enrollments (
    student_id       INT    NOT NULL,
    course_id        INT    NOT NULL,
    enrollment_date  DATE   NOT NULL,
    grade            CHAR(2),   -- A, B+, B, C, F — NULL until assigned
    attendance_pct   DECIMAL(5,2),
    
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — CARDINALITY
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — The Numbers" />
        <SectionTitle>Cardinality Constraints — The Most Critical Design Decision</SectionTitle>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Cardinality</strong> specifies the maximum
          number of relationship instances that an entity instance can participate in.
          It answers the question: for one instance of entity A, how many instances of
          entity B can it be associated with — and vice versa?
        </Para>

        <Para>
          Cardinality is arguably the most important single decision in ER design because
          it directly determines the table structure in the relational schema — specifically,
          whether to use a foreign key column or a separate junction table. Getting cardinality
          wrong creates schemas that cannot represent real-world data or that represent it
          with severe redundancy.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>

          {/* 1:1 */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#0078d4' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 900, color: '#0078d4' }}>1 : 1</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>One-to-One</span>
              </div>
              <Para>
                Each instance of entity A is associated with at most one instance of entity B,
                AND each instance of entity B is associated with at most one instance of entity A.
                One-to-one relationships are the rarest in real-world modelling — they often
                suggest that the two entities could be merged into one, though there are valid
                reasons to keep them separate.
              </Para>
              <Para>
                <strong style={{ color: 'var(--text)' }}>Valid reasons to keep 1:1 entities separate:</strong>
                Frequent access patterns (one table accessed constantly, the other rarely —
                keeping them separate improves cache efficiency), security (sensitive columns
                in one table can be access-controlled separately), optional data (the related
                entity only exists for some instances — a customer may or may not have a
                loyalty profile).
              </Para>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 14, marginBottom: 14 }}>
                {[
                  { example: 'EMPLOYEE ↔ PARKING_SPOT', detail: 'Each employee is assigned at most one parking spot. Each parking spot is assigned to at most one employee. (In a company with assigned parking.)' },
                  { example: 'COUNTRY ↔ CAPITAL_CITY', detail: 'Each country has exactly one capital city. Each capital city is the capital of exactly one country.' },
                  { example: 'CUSTOMER ↔ LOYALTY_PROFILE', detail: 'A customer may have zero or one loyalty profile. A loyalty profile belongs to exactly one customer.' },
                ].map((item) => (
                  <div key={item.example} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0078d4', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{item.example}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.detail}</div>
                  </div>
                ))}
              </div>
              <CodeBox label="1:1 implementation — three strategies">
{`-- Strategy 1: Foreign key in either table (recommended for optional relationships)
CREATE TABLE customers (
    customer_id      INT  PRIMARY KEY,
    name             VARCHAR(100) NOT NULL
);

CREATE TABLE loyalty_profiles (
    profile_id       INT          PRIMARY KEY,
    customer_id      INT          UNIQUE NOT NULL, -- UNIQUE enforces 1:1
    points_balance   INT          DEFAULT 0,
    tier             VARCHAR(20)  DEFAULT 'silver',
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);
-- UNIQUE on customer_id: ensures each customer has at most ONE loyalty profile.
-- Not all customers have a loyalty profile (optional side).

-- Strategy 2: Shared primary key (strongest 1:1 — recommended when always paired)
CREATE TABLE employees (
    employee_id  INT  PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    hire_date    DATE NOT NULL
);

CREATE TABLE employee_access_cards (
    employee_id  INT  PRIMARY KEY,  -- same PK as employees!
    card_number  VARCHAR(20) UNIQUE NOT NULL,
    issued_date  DATE NOT NULL,
    access_level VARCHAR(10),
    
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
    -- employee_id is BOTH the PK and the FK — guarantees perfect 1:1
);

-- Strategy 3: Merge into one table (when always paired, no access pattern reason to split)
CREATE TABLE countries (
    country_id    INT  PRIMARY KEY,
    country_name  VARCHAR(100) UNIQUE NOT NULL,
    capital_city  VARCHAR(100) UNIQUE NOT NULL,  -- 1:1 stored inline
    population    BIGINT,
    iso_code      CHAR(2) UNIQUE
);`}
              </CodeBox>
            </div>
          </div>

          {/* 1:N */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: 'var(--accent)' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 900, color: 'var(--accent)' }}>1 : N</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>One-to-Many</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Most Common</span>
              </div>
              <Para>
                Each instance of entity A (the "one" side) can be associated with many instances
                of entity B (the "many" side). But each instance of entity B is associated with
                at most one instance of entity A. This is the most common relationship type in
                real-world data modelling — hierarchies, ownership, classification all naturally
                express as 1:N relationships.
              </Para>
              <Para>
                The implementation rule is always the same and never has exceptions:
                <strong style={{ color: 'var(--text)' }}> the foreign key goes in the "many" side table</strong>,
                referencing the primary key of the "one" side table. This is the only correct
                implementation. Putting the FK anywhere else violates the relational model.
              </Para>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 14, marginBottom: 14 }}>
                {[
                  { example: 'CUSTOMER (1) → ORDER (N)', detail: 'One customer places many orders. Each order belongs to exactly one customer. FK: orders.customer_id → customers.customer_id' },
                  { example: 'DEPARTMENT (1) → EMPLOYEE (N)', detail: 'One department has many employees. Each employee belongs to one department. FK: employees.dept_id → departments.dept_id' },
                  { example: 'CATEGORY (1) → PRODUCT (N)', detail: 'One category contains many products. Each product belongs to one category (in this simplified model). FK: products.category_id → categories.category_id' },
                  { example: 'ORDER (1) → ORDER_ITEM (N)', detail: 'One order contains many order items. Each order item belongs to exactly one order. FK: order_items.order_id → orders.order_id' },
                ].map((item) => (
                  <div key={item.example} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{item.example}</div>
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.detail}</div>
                  </div>
                ))}
              </div>
              <CodeBox label="1:N implementation — FK always on the many side">
{`-- CUSTOMER (1) → ORDER (N)
CREATE TABLE customers (
    customer_id  VARCHAR(10)  PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE orders (
    order_id     VARCHAR(15)  PRIMARY KEY,
    customer_id  VARCHAR(10)  NOT NULL,  -- FK here (many side)
    order_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    status       VARCHAR(20)  DEFAULT 'pending',
    total        DECIMAL(10,2),
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    -- ON DELETE options:
    -- ON DELETE CASCADE:    delete customer → delete all their orders (careful!)
    -- ON DELETE RESTRICT:   cannot delete customer if they have orders (safe default)
    -- ON DELETE SET NULL:   set customer_id to NULL (only if order can be anonymous)
);

-- WRONG: trying to store the 1:N relationship on the "one" side
-- customers (customer_id, name, order_ids TEXT[])  ← WRONG!
-- This violates 1NF, makes joins impossible, and duplicates data.
-- The FK ALWAYS goes on the N side.

-- Querying 1:N:
-- "All orders for customer C001 with their total value"
SELECT o.order_id, o.order_date, o.total, o.status
FROM orders o
WHERE o.customer_id = 'C001'
ORDER BY o.order_date DESC;

-- "Customers with more than 5 orders (high-value customers)"
SELECT c.name, COUNT(o.order_id) AS order_count, SUM(o.total) AS lifetime_value
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING COUNT(o.order_id) > 5
ORDER BY lifetime_value DESC;`}
              </CodeBox>
            </div>
          </div>

          {/* M:N */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 3, background: '#f97316' }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 900, color: '#f97316' }}>M : N</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>Many-to-Many</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Always a Junction Table</span>
              </div>
              <Para>
                Each instance of entity A can be associated with many instances of entity B,
                AND each instance of entity B can be associated with many instances of entity A.
                Many-to-many relationships cannot be represented by a foreign key in either
                participating table — they always require a separate
                <strong style={{ color: 'var(--text)' }}> junction table</strong> (also called
                a bridge table, associative table, or intersection table).
              </Para>
              <Para>
                The junction table contains foreign keys to both entity tables. The combination
                of these foreign keys typically forms the primary key of the junction table —
                ensuring that each specific pair is recorded at most once. The junction table
                can also contain relationship attributes.
              </Para>
              <CodeBox label="M:N implementation — junction table is always the answer">
{`-- STUDENT (M) ↔ COURSE (N) — a student can take many courses,
--                             a course can have many students

CREATE TABLE students (
    student_id   INT          PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE courses (
    course_id    VARCHAR(10)  PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    credits      INT          NOT NULL CHECK (credits BETWEEN 1 AND 6),
    department   VARCHAR(50)
);

-- Junction table — represents the M:N relationship
CREATE TABLE enrollments (
    student_id       INT   NOT NULL,
    course_id        VARCHAR(10) NOT NULL,
    -- Relationship attributes:
    enrolled_date    DATE  NOT NULL DEFAULT CURRENT_DATE,
    grade            CHAR(2),    -- NULL until graded
    attendance_pct   DECIMAL(5,2),
    
    PRIMARY KEY (student_id, course_id),  -- composite PK prevents duplicate enrollments
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE RESTRICT,
    
    -- Additional constraint: grade must be a valid value or NULL
    CHECK (grade IN ('A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F') OR grade IS NULL)
);

-- PRODUCT (M) ↔ ORDER (N) — an order contains many products,
--                           a product can be in many orders
CREATE TABLE order_items (
    order_id       VARCHAR(15)  NOT NULL,
    product_id     VARCHAR(20)  NOT NULL,
    -- Relationship attributes:
    quantity       INT          NOT NULL CHECK (quantity > 0),
    unit_price     DECIMAL(10,2) NOT NULL,  -- price at time of purchase (may change later)
    discount_pct   DECIMAL(5,2) DEFAULT 0,
    
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
);

-- TEACHER (M) ↔ COURSE (N) — a teacher can teach many courses,
--                            a course can be taught by many teachers (co-teaching)
CREATE TABLE course_teachers (
    teacher_id   INT         NOT NULL,
    course_id    VARCHAR(10) NOT NULL,
    semester     VARCHAR(10) NOT NULL,  -- 'Spring2024', 'Fall2024'
    role         VARCHAR(20) DEFAULT 'instructor',  -- instructor, assistant, guest
    
    PRIMARY KEY (teacher_id, course_id, semester),  -- teacher can teach same course in diff semesters
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);

-- Querying M:N relationships:
-- "All courses taken by student 1001 with their grades"
SELECT c.title, c.credits, e.grade, e.enrolled_date
FROM courses c
JOIN enrollments e ON c.course_id = e.course_id
WHERE e.student_id = 1001
ORDER BY e.enrolled_date DESC;

-- "Students who passed both DBMS and Algorithms"
SELECT s.name
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments
    WHERE student_id = s.student_id AND course_id = 'CS301' AND grade NOT IN ('D','F')
)
AND EXISTS (
    SELECT 1 FROM enrollments
    WHERE student_id = s.student_id AND course_id = 'CS302' AND grade NOT IN ('D','F')
);`}
              </CodeBox>
            </div>
          </div>
        </div>

        <SubTitle>Participation Constraints — Total vs Partial</SubTitle>

        <Para>
          Cardinality tells you the maximum number of relationship instances. Participation
          constraints tell you the <strong style={{ color: 'var(--text)' }}>minimum</strong> —
          whether participation in a relationship is mandatory or optional.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid var(--accent)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Total Participation</div>
            <Para>Every instance of the entity MUST participate in at least one relationship instance. No entity instance is allowed to exist without being associated with the other entity.</Para>
            <Para>Represented by a <strong style={{ color: 'var(--text)' }}>double line</strong> in ER diagrams. Implemented as a NOT NULL constraint or a mandatory foreign key in the relational schema.</Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 12, color: 'var(--text2)',  lineHeight: 1.7 }}>Every ORDER must belong to exactly one CUSTOMER.<br />An order cannot exist without a customer.<br />→ customer_id NOT NULL in orders table</div>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '4px solid #8b5cf6', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>Partial Participation</div>
            <Para>Some instances of the entity may NOT participate in any relationship instance. The relationship is optional — an entity can exist without being associated with the other entity.</Para>
            <Para>Represented by a <strong style={{ color: 'var(--text)' }}>single line</strong> in ER diagrams. Implemented by allowing NULL in the foreign key column.</Para>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 12, color: 'var(--text2)',  lineHeight: 1.7 }}>A CUSTOMER may or may not have placed any orders.<br />A customer can exist without any orders.<br />→ customers without orders is valid</div>
            </div>
          </div>
        </div>

        <CodeBox label="Participation constraints → NOT NULL and CHECK constraints">
{`-- Relationship: EMPLOYEE "works in" DEPARTMENT
-- Total participation on EMPLOYEE side: every employee must be in a department
-- Partial participation on DEPARTMENT side: a department can exist with no employees (new dept)

CREATE TABLE departments (
    dept_id    INT          PRIMARY KEY,
    dept_name  VARCHAR(100) UNIQUE NOT NULL,
    budget     DECIMAL(15,2)
);

CREATE TABLE employees (
    employee_id  INT          PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    dept_id      INT          NOT NULL,  -- NOT NULL = total participation!
    -- Every employee MUST be in exactly one department
    
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    -- ON DELETE RESTRICT: cannot delete a department that has employees
    -- This enforces the total participation from the other direction too
);

-- Relationship: CUSTOMER "has" LOYALTY_PROFILE (optional — partial participation)
CREATE TABLE loyalty_profiles (
    profile_id   INT PRIMARY KEY,
    customer_id  INT UNIQUE,  -- UNIQUE but NOT NOT NULL → profile is optional
    points       INT DEFAULT 0,
    
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
-- customer_id is UNIQUE (enforces 1:1 max) but not NOT NULL (profile is optional)`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — EXTENDED ER MODEL
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Beyond the Basics" />
        <SectionTitle>Extended ER Model — Generalisation, Specialisation, and Aggregation</SectionTitle>

        <Para>
          The basic ER model (entities, attributes, relationships, cardinality) is sufficient
          for modelling many real-world systems. But complex domains — particularly those with
          entity hierarchies, inheritance, or relationships involving other relationships —
          require extended ER (EER) concepts. These concepts were developed in the 1980s to
          bring object-oriented ideas (inheritance, abstraction) into the entity-relationship
          framework.
        </Para>

        <SubTitle>Generalisation — Bottom-Up Abstraction</SubTitle>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Generalisation</strong> is a bottom-up
          design process: you start with specific entity types and identify common attributes
          among them, extracting those common attributes into a higher-level, more general
          entity type. The specific entities become specialised subtypes of the general entity.
        </Para>

        <Para>
          This is conceptually identical to inheritance in object-oriented programming —
          you are extracting a superclass (the generalised entity) from existing classes
          (the specific entities). The design process moves from specific to general.
        </Para>

        <CodeBox label="Generalisation — bottom-up from specific to general">
{`// Starting point: two separate entity types that share many attributes

EMPLOYEE entity: employee_id, name, salary, hire_date, office_location
CONTRACTOR entity: contractor_id, name, hourly_rate, contract_end_date, agency

// Observation: both have name, both represent people working for the company
// Generalisation: extract common attributes into a WORKER supertype

WORKER (supertype):        worker_id, name, contact_email
  |
  ├── EMPLOYEE (subtype):  salary, hire_date, office_location, benefit_plan
  └── CONTRACTOR (subtype): hourly_rate, contract_end_date, agency_name

// The generalisation captures:
// - What all workers have in common (WORKER attributes)
// - What distinguishes employees from contractors (subtype-specific attributes)
// - The IS-A relationship: an EMPLOYEE IS-A WORKER, a CONTRACTOR IS-A WORKER`}
        </CodeBox>

        <SubTitle>Specialisation — Top-Down Decomposition</SubTitle>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Specialisation</strong> is the reverse:
          a top-down design process. You start with a general entity type and define distinct
          subtypes based on differences in attributes or relationships. Different subtypes
          may have different attributes that are not applicable to the general type or to
          other subtypes.
        </Para>

        <Para>
          A vehicle might be specialised into car and truck — a car has passenger_capacity
          while a truck has payload_tonnes. These are not attributes of all vehicles,
          only of specific subtypes.
        </Para>

        <CodeBox label="Specialisation — top-down from general to specific">
{`// Starting point: a general ACCOUNT entity
ACCOUNT (supertype): account_number, balance, owner_id, opened_date

// Specialisation based on account type:
ACCOUNT
  |
  ├── SAVINGS_ACCOUNT:    interest_rate, minimum_balance, withdrawal_limit_per_month
  ├── CURRENT_ACCOUNT:    overdraft_limit, transaction_charges
  └── FIXED_DEPOSIT:      deposit_term_months, maturity_date, lock_in_amount

// VEHICLE → CAR, TRUCK, MOTORCYCLE:
VEHICLE: vehicle_id, registration_no, manufacturer, model_year, colour
  |
  ├── CAR:          passenger_capacity, fuel_type, transmission, airbag_count
  ├── TRUCK:        payload_tonnes, num_axles, cargo_type
  └── MOTORCYCLE:   engine_cc, sidecar_attached

// Specialisation constraints:
// DISJOINT:     an entity can belong to only ONE subtype (a car cannot also be a truck)
// OVERLAPPING:  an entity can belong to MULTIPLE subtypes simultaneously
//               (a PERSON can be both an EMPLOYEE and a STUDENT simultaneously)

// TOTAL:    every supertype instance must belong to at least one subtype
//           (every ACCOUNT must be a savings, current, or fixed deposit)
// PARTIAL:  some supertype instances may not belong to any subtype
//           (some VEHICLES may not be specialised yet — their type is unknown)`}
        </CodeBox>

        <SubTitle>Implementing Generalisation/Specialisation in Relational Schema</SubTitle>

        <Para>
          The ER model has a clean notation for inheritance. The relational model does not
          natively support inheritance — so you must choose an implementation strategy.
          There are three options, each with trade-offs.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[
            {
              strategy: 'Strategy 1 — Single Table (Table Per Hierarchy)',
              color: '#0078d4',
              desc: 'Store all subtypes in one table, with a discriminator column indicating the subtype, and nullable columns for subtype-specific attributes.',
              pros: 'Simple. No JOINs needed to retrieve any subtype. Best query performance for polymorphic queries ("get all workers").',
              cons: 'Many NULL values for columns belonging to other subtypes. Cannot enforce NOT NULL on subtype-specific columns without complex CHECK constraints.',
              code: `CREATE TABLE workers (
    worker_id        INT  PRIMARY KEY,
    name             VARCHAR(100) NOT NULL,
    worker_type      VARCHAR(20)  NOT NULL,  -- 'employee' or 'contractor'
    -- Employee-specific (NULL for contractors):
    salary           DECIMAL(10,2),
    hire_date        DATE,
    benefit_plan     VARCHAR(50),
    -- Contractor-specific (NULL for employees):
    hourly_rate      DECIMAL(8,2),
    contract_end_date DATE,
    agency_name      VARCHAR(100),
    
    CHECK (
        (worker_type = 'employee' AND salary IS NOT NULL AND hourly_rate IS NULL)
        OR
        (worker_type = 'contractor' AND hourly_rate IS NOT NULL AND salary IS NULL)
    )
);`,
            },
            {
              strategy: 'Strategy 2 — Table Per Subtype (Table Per Type)',
              color: 'var(--accent)',
              desc: 'Create one table for the supertype (common attributes) and one separate table for each subtype (subtype-specific attributes only). Subtypes share the same PK as the supertype.',
              pros: 'Clean schema. No NULL columns. Can enforce NOT NULL on subtype-specific attributes. Clear representation of the hierarchy.',
              cons: 'Requires JOIN to get full details of a specific subtype. Polymorphic queries ("get all workers") require UNION.',
              code: `-- Supertype table: common attributes
CREATE TABLE workers (
    worker_id   INT          PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    worker_type VARCHAR(20)  NOT NULL  -- for fast subtype identification
);

-- Employee subtype table: employee-specific attributes only
CREATE TABLE employees (
    worker_id      INT           PRIMARY KEY,  -- same PK as workers
    salary         DECIMAL(10,2) NOT NULL,
    hire_date      DATE          NOT NULL,
    benefit_plan   VARCHAR(50),
    
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id) ON DELETE CASCADE
);

-- Contractor subtype table
CREATE TABLE contractors (
    worker_id         INT           PRIMARY KEY,
    hourly_rate       DECIMAL(8,2)  NOT NULL,
    contract_end_date DATE          NOT NULL,
    agency_name       VARCHAR(100),
    
    FOREIGN KEY (worker_id) REFERENCES workers(worker_id) ON DELETE CASCADE
);

-- Get full employee record:
SELECT w.name, w.email, e.salary, e.hire_date
FROM workers w JOIN employees e ON w.worker_id = e.worker_id
WHERE w.worker_id = 1001;

-- Get all workers (polymorphic):
SELECT w.name, 'Employee' as type, e.salary::TEXT as key_field
FROM workers w JOIN employees e ON w.worker_id = e.worker_id
UNION ALL
SELECT w.name, 'Contractor', c.hourly_rate::TEXT
FROM workers w JOIN contractors c ON w.worker_id = c.worker_id;`,
            },
            {
              strategy: 'Strategy 3 — Table Per Concrete Type',
              color: '#f97316',
              desc: 'Create a separate, fully independent table for each subtype — repeating the supertype attributes in each subtype table. No supertype table exists.',
              pros: 'No JOINs to get complete subtype data. Each subtype table is completely self-contained.',
              cons: 'Supertype attributes are duplicated across tables. Polymorphic queries require UNION. Changes to supertype attributes must be replicated across all subtype tables.',
              code: `-- No workers table — each subtype is fully self-contained
CREATE TABLE employees (
    employee_id  INT          PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,  -- repeated from supertype
    email        VARCHAR(150) UNIQUE NOT NULL,  -- repeated
    salary       DECIMAL(10,2) NOT NULL,
    hire_date    DATE NOT NULL,
    benefit_plan VARCHAR(50)
);

CREATE TABLE contractors (
    contractor_id     INT          PRIMARY KEY,
    name              VARCHAR(100) NOT NULL,  -- same column, different table
    email             VARCHAR(150) UNIQUE NOT NULL,
    hourly_rate       DECIMAL(8,2) NOT NULL,
    contract_end_date DATE NOT NULL,
    agency_name       VARCHAR(100)
);
-- Simple for individual subtype queries. 
-- Messy for cross-subtype operations.`,
            },
          ].map((item) => (
            <div key={item.strategy} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>{item.strategy}</div>
              <Para>{item.desc}</Para>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✓ Pros</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.pros}</div>
                </div>
                <div style={{ background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✕ Cons</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.cons}</div>
                </div>
              </div>
              <CodeBox>{item.code}</CodeBox>
            </div>
          ))}
        </div>

        <SubTitle>Aggregation — Relationships Involving Relationships</SubTitle>

        <Para>
          <strong style={{ color: 'var(--text)' }}>Aggregation</strong> addresses a specific
          limitation of the basic ER model: you cannot directly have a relationship
          between an entity type and a relationship type. But some real-world scenarios
          require exactly this. Aggregation treats a relationship type and the entity types
          it connects as a higher-level abstract entity — allowing another relationship
          to connect to this aggregated unit.
        </Para>

        <CodeBox label="Aggregation — when you need to relate to a relationship">
{`// Scenario: Track which MANAGER approved which EMPLOYEE-PROJECT ASSIGNMENT
//
// We have:
//   EMPLOYEE "works on" PROJECT  (a relationship)
//   MANAGER "approves" ???
//
// We want to say: a MANAGER approves a specific EMPLOYEE-PROJECT assignment
// But we can't directly have MANAGER relating to the "works on" relationship.
//
// Solution: Treat the EMPLOYEE-WORKS_ON-PROJECT aggregate as one abstract entity
// Then: MANAGER "approves" [EMPLOYEE-WORKS_ON-PROJECT]

-- In the relational schema, aggregation becomes:
CREATE TABLE employee_project_assignments (
    employee_id     INT  NOT NULL,
    project_id      INT  NOT NULL,
    start_date      DATE NOT NULL,
    hours_per_week  DECIMAL(4,1),
    
    PRIMARY KEY (employee_id, project_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (project_id)  REFERENCES projects(project_id)
);

-- The "approval" relationship connects a MANAGER to an ASSIGNMENT:
CREATE TABLE assignment_approvals (
    employee_id   INT   NOT NULL,
    project_id    INT   NOT NULL,
    manager_id    INT   NOT NULL,
    approved_date DATE  NOT NULL,
    approval_note TEXT,
    
    PRIMARY KEY (employee_id, project_id),  -- one approval per assignment
    FOREIGN KEY (employee_id, project_id)
        REFERENCES employee_project_assignments(employee_id, project_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);
-- The composite FK (employee_id, project_id) points to the relationship table
-- This is the relational implementation of aggregation`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 7 — ER TO RELATIONAL MAPPING
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — The Translation" />
        <SectionTitle>Complete ER-to-Relational Mapping — Every Rule with Examples</SectionTitle>

        <Para>
          Once an ER diagram is complete and validated, converting it to a relational schema
          follows a systematic set of mapping rules. These rules are algorithmic — given a
          correct ER diagram, the relational schema can be derived mechanically. Understanding
          these rules deeply is what separates engineers who can design databases from those
          who just write SQL.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              rule: 'Rule 1',
              title: 'Strong Entity Type → Table',
              color: '#0078d4',
              desc: 'For each strong entity type E, create a relation R. Include all simple attributes of E as columns of R. For composite attributes, include only the sub-attributes (not the composite attribute itself). Choose the key attribute as the primary key.',
              code: `-- CUSTOMER entity: customer_id (key), name, email, city, date_of_birth, is_active
CREATE TABLE customers (
    customer_id  VARCHAR(10)   PRIMARY KEY,  -- key attribute → PK
    name         VARCHAR(100)  NOT NULL,     -- simple attribute
    email        VARCHAR(150)  UNIQUE,       -- simple attribute, alternate key
    city         VARCHAR(100),              -- simple attribute
    date_of_birth DATE,                     -- simple attribute
    is_active    BOOLEAN       DEFAULT true -- simple attribute
    -- Note: age is DERIVED from date_of_birth → NOT stored as column
    -- Note: if name was composite (first, last) → first_name, last_name columns (not full_name)
);`,
            },
            {
              rule: 'Rule 2',
              title: 'Weak Entity Type → Table with Composite PK',
              color: 'var(--accent)',
              desc: 'For each weak entity type W with identifying entity E, create a relation R. Include all attributes of W. Add the primary key of E as a foreign key. The primary key of R is the combination of E\'s PK + W\'s partial key. Add ON DELETE CASCADE — if the owner is deleted, the weak entity instances must also be deleted.',
              code: `-- ORDER_ITEM (weak) depends on ORDER (strong)
-- ORDER_ITEM's partial key: line_number
-- ORDER_ITEM's full PK: (order_id, line_number)

CREATE TABLE order_items (
    order_id    VARCHAR(15)   NOT NULL,      -- FK to identifying entity (ORDER)
    line_number INT           NOT NULL,      -- partial key (discriminator)
    product_id  VARCHAR(20)   NOT NULL,
    quantity    INT           NOT NULL CHECK (quantity > 0),
    unit_price  DECIMAL(10,2) NOT NULL,
    
    PRIMARY KEY (order_id, line_number),    -- composite PK = owner PK + partial key
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
    -- CASCADE: deleting an order must delete all its items (dependency)
);`,
            },
            {
              rule: 'Rule 3',
              title: '1:1 Binary Relationship → Foreign Key or Merged Table',
              color: '#f97316',
              desc: 'For a 1:1 relationship between S and T, you have three options: (a) add FK in S pointing to T, (b) add FK in T pointing to S, (c) merge S and T into one table. For optional relationships, put the FK on the optional side (to avoid nulls). For mandatory on both sides, merging is often best.',
              code: `-- EMPLOYEE "has" PARKING_SPOT (optional on both sides)
-- Put FK on PARKING_SPOT (parking spots are optional assignments)

CREATE TABLE parking_spots (
    spot_id     VARCHAR(10)  PRIMARY KEY,
    floor       INT,
    spot_number INT,
    employee_id INT          UNIQUE,  -- UNIQUE enforces 1:1 max
    -- NULL allowed: a spot may be unassigned
    
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    ON DELETE SET NULL  -- if employee leaves, spot becomes unassigned (not deleted)
);

-- COUNTRY "has" CAPITAL (mandatory on both sides — merge makes sense)
CREATE TABLE countries (
    country_id    INT          PRIMARY KEY,
    country_name  VARCHAR(100) UNIQUE NOT NULL,
    capital_city  VARCHAR(100) UNIQUE NOT NULL,  -- merged 1:1 into same table
    continent     VARCHAR(50),
    population    BIGINT
);`,
            },
            {
              rule: 'Rule 4',
              title: '1:N Binary Relationship → FK on the N Side',
              color: '#8b5cf6',
              desc: 'For a 1:N relationship between S (one side) and T (many side), add the primary key of S as a foreign key in the table for T. If the relationship has attributes, also add those as columns in T\'s table.',
              code: `-- DEPARTMENT (1) "employs" EMPLOYEE (N)
-- FK goes in EMPLOYEE table (N side), referencing DEPARTMENT table

ALTER TABLE employees
    ADD COLUMN dept_id INT NOT NULL,
    ADD CONSTRAINT fk_dept
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id);

-- If the relationship has attributes (e.g., date_joined_dept):
ALTER TABLE employees
    ADD COLUMN dept_id       INT  NOT NULL,
    ADD COLUMN dept_join_date DATE,  -- relationship attribute stored on N side
    ADD CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departments(dept_id);`,
            },
            {
              rule: 'Rule 5',
              title: 'M:N Binary Relationship → New Junction Table',
              color: '#facc15',
              desc: 'For a M:N relationship R between S and T, create a new junction table J. Include the PKs of both S and T as FKs in J. The combination forms J\'s PK. Include any relationship attributes as columns in J.',
              code: `-- STUDENT (M) "enrolled in" COURSE (N)
-- Relationship attributes: enrolled_date, grade

CREATE TABLE enrollments (
    student_id    INT         NOT NULL,  -- FK to STUDENT
    course_id     VARCHAR(10) NOT NULL,  -- FK to COURSE
    -- Relationship attributes:
    enrolled_date DATE        NOT NULL DEFAULT CURRENT_DATE,
    grade         CHAR(2),
    
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)   ON DELETE RESTRICT
);`,
            },
            {
              rule: 'Rule 6',
              title: 'Multi-valued Attribute → New Table',
              color: '#e879f9',
              desc: 'For each multi-valued attribute A of entity E, create a new table T. T includes A as a column and the PK of E as a FK. The PK of T is the combination of A + E\'s PK.',
              code: `-- EMPLOYEE has multi-valued attribute: previous_degrees

CREATE TABLE employee_degrees (
    employee_id  INT          NOT NULL,
    degree_name  VARCHAR(200) NOT NULL,  -- multi-valued attribute
    institution  VARCHAR(200),
    year_awarded INT,
    
    PRIMARY KEY (employee_id, degree_name),  -- PK = FK + multi-valued attr
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- PRODUCT has multi-valued attribute: tags/categories
CREATE TABLE product_tags (
    product_id   VARCHAR(20)  NOT NULL,
    tag          VARCHAR(100) NOT NULL,
    
    PRIMARY KEY (product_id, tag),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);`,
            },
            {
              rule: 'Rule 7',
              title: 'Ternary Relationship → Junction Table with Three FKs',
              color: '#0078d4',
              desc: 'For a ternary (or higher-degree) relationship R among entities A, B, and C, create a junction table T. Include the PKs of A, B, and C as FKs in T. The combination of all three typically forms the PK.',
              code: `-- SUPPLIER "supplies" PART "to" PROJECT
-- A ternary relationship: which supplier supplies which part to which project

CREATE TABLE supply_contracts (
    supplier_id  INT  NOT NULL,
    part_id      INT  NOT NULL,
    project_id   INT  NOT NULL,
    -- Relationship attributes:
    quantity     INT  NOT NULL,
    unit_cost    DECIMAL(10,2),
    delivery_date DATE,
    
    PRIMARY KEY (supplier_id, part_id, project_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    FOREIGN KEY (part_id)     REFERENCES parts(part_id),
    FOREIGN KEY (project_id)  REFERENCES projects(project_id)
);`,
            },
          ].map((item) => (
            <div key={item.rule} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '22px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 5, padding: '3px 8px', letterSpacing: '.1em', textTransform: 'uppercase' }}>{item.rule}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.title}</span>
                </div>
                <Para>{item.desc}</Para>
                <CodeBox>{item.code}</CodeBox>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 8 — COMPLETE WORKED EXAMPLE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Full Worked Example" />
        <SectionTitle>Complete Worked Example — Designing a Hospital Database</SectionTitle>

        <Para>
          The best way to consolidate ER modelling is to work through a complete, realistic
          example from requirements to final SQL schema. We will design a hospital database
          management system — a domain complex enough to showcase every ER concept but
          familiar enough to evaluate our design decisions intuitively.
        </Para>

        <SubTitle>Step 1 — Define the Miniworld and Requirements</SubTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Requirements Document — Hospital DBMS</div>
          {[
            'The hospital has multiple wards. Each ward has a name, wing, floor number, and capacity (number of beds).',
            'The hospital employs doctors. Each doctor has a name, specialisation, phone number, and may have multiple qualifications (degrees).',
            'Patients are admitted to the hospital. A patient has a name, date of birth, blood group, emergency contact name, and emergency contact phone.',
            'A patient is admitted to exactly one ward at a time. A ward can have many patients admitted simultaneously (up to capacity).',
            'A doctor can treat many patients. A patient can be treated by many doctors (primary + consulting). The treatment relationship records the date treatment began.',
            'The hospital stocks medications. Each medication has a name, manufacturer, unit cost, and quantity in stock.',
            'Doctors prescribe medications to patients. A prescription records the medication, the prescribing doctor, the patient, the dosage, frequency, and start/end dates.',
            'The hospital has a record of all room/bed assignments — which patient was in which bed/ward for which date range.',
          ].map((req, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.08)', borderRadius: 4, padding: '2px 7px', flexShrink: 0 }}>R{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 13, color: 'var(--text2)',  lineHeight: 1.7 }}>{req}</span>
            </div>
          ))}
        </div>

        <SubTitle>Step 2 — Identify Entities, Attributes, and Relationships</SubTitle>

        <CodeBox label="ER analysis — entities, attributes, and relationships identified">
{`ENTITY TYPES IDENTIFIED:
  WARD           — Strong entity. Key: ward_id
  DOCTOR         — Strong entity. Key: doctor_id. Multi-valued: qualifications
  PATIENT        — Strong entity. Key: patient_id
  MEDICATION     — Strong entity. Key: medication_id
  BED_ASSIGNMENT — Weak entity. Owner: WARD + PATIENT. Partial key: admission_date

ATTRIBUTES:
  WARD:       ward_id(key), ward_name, wing, floor_number, capacity
  DOCTOR:     doctor_id(key), full_name, specialisation, phone, {qualifications}(multi-valued)
  PATIENT:    patient_id(key), full_name, date_of_birth, age(derived), blood_group,
              emergency_contact_name, emergency_contact_phone
              // Note: emergency contact is composite → separate columns
  MEDICATION: medication_id(key), med_name, manufacturer, unit_cost, stock_quantity

RELATIONSHIP TYPES:
  ADMITTED_TO:  PATIENT (N) ↔ WARD (1)
                → 1:N. One ward has many admitted patients.
                → Each patient is in at most one ward.
                → Relationship attribute: admission_date, expected_discharge_date
  
  TREATS:       DOCTOR (M) ↔ PATIENT (N)
                → M:N. Many doctors treat each patient, each doctor treats many patients.
                → Relationship attribute: treatment_start_date
  
  PRESCRIBED:   DOCTOR (M) ↔ PATIENT (N) through MEDICATION (connected three-way)
                → This is a TERNARY relationship involving DOCTOR, PATIENT, MEDICATION
                → Relationship attributes: dosage, frequency, start_date, end_date`}
        </CodeBox>

        <SubTitle>Step 3 — Apply Mapping Rules → Complete SQL Schema</SubTitle>

        <CodeBox label="Final relational schema — derived from ER diagram">
{`-- ─────────────────────────────────────────────
-- Rule 1: Strong entity types → tables
-- ─────────────────────────────────────────────

CREATE TABLE wards (
    ward_id       SERIAL        PRIMARY KEY,
    ward_name     VARCHAR(100)  UNIQUE NOT NULL,
    wing          VARCHAR(10)   NOT NULL,  -- 'A', 'B', 'C', 'North', 'South'
    floor_number  INT           NOT NULL,
    capacity      INT           NOT NULL CHECK (capacity > 0)
);

CREATE TABLE doctors (
    doctor_id      SERIAL        PRIMARY KEY,
    full_name      VARCHAR(150)  NOT NULL,
    specialisation VARCHAR(100)  NOT NULL,
    phone          VARCHAR(20)   UNIQUE NOT NULL
    -- qualifications is multi-valued → separate table (Rule 6)
    -- age is derived → not stored, computed from date_of_birth if relevant
);

CREATE TABLE patients (
    patient_id              SERIAL       PRIMARY KEY,
    full_name               VARCHAR(150) NOT NULL,
    date_of_birth           DATE         NOT NULL,
    -- age is derived: EXTRACT(YEAR FROM AGE(CURRENT_DATE, date_of_birth))
    blood_group             CHAR(3)      CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
    -- emergency_contact is composite: stored as separate columns
    emergency_contact_name  VARCHAR(150),
    emergency_contact_phone VARCHAR(20)
);

CREATE TABLE medications (
    medication_id  SERIAL         PRIMARY KEY,
    med_name       VARCHAR(200)   NOT NULL,
    manufacturer   VARCHAR(150),
    unit_cost      DECIMAL(10,2)  NOT NULL CHECK (unit_cost >= 0),
    stock_quantity INT            NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0)
);

-- ─────────────────────────────────────────────
-- Rule 6: Multi-valued attribute → separate table
-- ─────────────────────────────────────────────

CREATE TABLE doctor_qualifications (
    doctor_id    INT          NOT NULL,
    degree       VARCHAR(100) NOT NULL,  -- multi-valued attribute
    institution  VARCHAR(200),
    year_awarded INT,
    
    PRIMARY KEY (doctor_id, degree),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Rule 4: 1:N relationship (WARD → PATIENT admission)
-- FK goes in PATIENT table (N side) + relationship attributes
-- ─────────────────────────────────────────────

-- Current ward assignment stored directly in patients table
-- (a patient is in ONE ward at a time)
ALTER TABLE patients
    ADD COLUMN current_ward_id        INT,    -- NULL if not currently admitted
    ADD COLUMN admission_date         DATE,
    ADD COLUMN expected_discharge     DATE,
    ADD CONSTRAINT fk_ward
        FOREIGN KEY (current_ward_id) REFERENCES wards(ward_id);

-- ─────────────────────────────────────────────
-- Rule 2: Weak entity (BED_ASSIGNMENT) for historical records
-- Owner: WARD + PATIENT. Partial key: admission_date
-- ─────────────────────────────────────────────

CREATE TABLE bed_assignments (
    patient_id    INT   NOT NULL,
    ward_id       INT   NOT NULL,
    admission_date DATE  NOT NULL,  -- partial key (discriminator)
    discharge_date DATE,            -- NULL if still admitted
    bed_number    INT,
    
    PRIMARY KEY (patient_id, ward_id, admission_date),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (ward_id)    REFERENCES wards(ward_id)       ON DELETE RESTRICT
);

-- ─────────────────────────────────────────────
-- Rule 5: M:N relationship (DOCTOR TREATS PATIENT)
-- Junction table with relationship attribute
-- ─────────────────────────────────────────────

CREATE TABLE treatments (
    doctor_id            INT  NOT NULL,
    patient_id           INT  NOT NULL,
    treatment_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    treatment_end_date   DATE,           -- NULL if ongoing
    is_primary_doctor    BOOLEAN DEFAULT false,
    notes                TEXT,
    
    PRIMARY KEY (doctor_id, patient_id),
    -- Note: if same doctor-patient pair can have multiple treatment episodes,
    -- add treatment_start_date to the PK:
    -- PRIMARY KEY (doctor_id, patient_id, treatment_start_date)
    
    FOREIGN KEY (doctor_id)  REFERENCES doctors(doctor_id)   ON DELETE RESTRICT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Rule 7: Ternary relationship (DOCTOR prescribes MEDICATION to PATIENT)
-- Junction table with THREE foreign keys + relationship attributes
-- ─────────────────────────────────────────────

CREATE TABLE prescriptions (
    prescription_id  SERIAL        PRIMARY KEY,  -- surrogate PK for this complex table
    doctor_id        INT           NOT NULL,
    patient_id       INT           NOT NULL,
    medication_id    INT           NOT NULL,
    -- Relationship attributes:
    dosage           VARCHAR(100)  NOT NULL,     -- "500mg", "10ml"
    frequency        VARCHAR(100)  NOT NULL,     -- "twice daily", "every 8 hours"
    start_date       DATE          NOT NULL DEFAULT CURRENT_DATE,
    end_date         DATE,                       -- NULL if ongoing/indefinite
    instructions     TEXT,
    
    FOREIGN KEY (doctor_id)    REFERENCES doctors(doctor_id)       ON DELETE RESTRICT,
    FOREIGN KEY (patient_id)   REFERENCES patients(patient_id)     ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES medications(medication_id) ON DELETE RESTRICT,
    
    -- A doctor cannot prescribe the same medication to the same patient twice
    -- on the same start date (use surrogate PK + this constraint):
    UNIQUE (doctor_id, patient_id, medication_id, start_date)
);`}
        </CodeBox>

        <SubTitle>Step 4 — Validate the Schema Against Requirements</SubTitle>

        <CodeBox label="Validation queries — every requirement answered">
{`-- R1: "Which ward has the most patients currently admitted?"
SELECT w.ward_name, w.wing, w.capacity,
       COUNT(p.patient_id) AS current_patients,
       w.capacity - COUNT(p.patient_id) AS available_beds
FROM wards w
LEFT JOIN patients p ON w.ward_id = p.current_ward_id
GROUP BY w.ward_id, w.ward_name, w.wing, w.capacity
ORDER BY current_patients DESC;

-- R2: "What are Dr. Sharma's qualifications?"
SELECT d.full_name, dq.degree, dq.institution, dq.year_awarded
FROM doctors d
JOIN doctor_qualifications dq ON d.doctor_id = dq.doctor_id
WHERE d.full_name = 'Dr. Sharma';

-- R4: "Which patients are currently admitted to Ward 3A?"
SELECT p.full_name, p.blood_group, p.admission_date, p.expected_discharge
FROM patients p
JOIN wards w ON p.current_ward_id = w.ward_id
WHERE w.ward_name = '3A'
ORDER BY p.admission_date;

-- R5: "Which doctors are treating patient P-1001, and when did they start?"
SELECT d.full_name, d.specialisation, t.treatment_start_date, t.is_primary_doctor
FROM treatments t
JOIN doctors d ON t.doctor_id = d.doctor_id
WHERE t.patient_id = 1001
ORDER BY t.is_primary_doctor DESC, t.treatment_start_date;

-- R8: "Full prescription history for patient P-1001"
SELECT d.full_name AS prescribed_by, m.med_name, pr.dosage,
       pr.frequency, pr.start_date, pr.end_date,
       CASE WHEN pr.end_date IS NULL THEN 'Active' ELSE 'Completed' END AS status
FROM prescriptions pr
JOIN doctors d      ON pr.doctor_id = d.doctor_id
JOIN medications m  ON pr.medication_id = m.medication_id
WHERE pr.patient_id = 1001
ORDER BY pr.start_date DESC;`}
        </CodeBox>

        <Callout type="tip">
          Notice how every requirement maps directly to a table or join in the schema.
          This one-to-one correspondence between requirements and queryable data is the
          sign of a correctly designed ER model. If a business question cannot be answered
          by the schema, the ER model missed an entity, attribute, or relationship.
          Always validate your schema against the original requirements before implementation.
        </Callout>
      </section>

      {/* ========================================
          PART 9 — COMMON MISTAKES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — The Mistakes Everyone Makes" />
        <SectionTitle>Common ER Design Mistakes — And How to Fix Them</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              mistake: 'Modelling a relationship as an entity',
              severity: 'High',
              color: '#ff4757',
              wrong: 'Creating an ENROLLMENT entity when it should be a M:N relationship between STUDENT and COURSE.',
              why: 'Enrollment has no independent existence — it exists only as a connection between a student and a course. Making it an entity leads to confusion about its identity and lifecycle.',
              fix: 'Ask: "Does this thing exist independently of the two entities it connects?" If no — it\'s a relationship, not an entity. If it has its own attributes (grade, enrollment_date) — make it a M:N relationship with attributes (implemented as a junction table with those columns).',
            },
            {
              mistake: 'Getting cardinality wrong',
              severity: 'Critical',
              color: '#ff4757',
              wrong: 'Modelling CUSTOMER-ORDER as M:N when it is clearly 1:N. Or modelling EMPLOYEE-PROJECT as 1:N when an employee can work on multiple projects.',
              why: 'Wrong cardinality leads to wrong table structure. A 1:N modelled as M:N creates an unnecessary junction table. A M:N modelled as 1:N makes it impossible to represent the real data.',
              fix: 'For every relationship, ask both questions: "Can ONE instance of A relate to MANY instances of B?" AND "Can ONE instance of B relate to MANY instances of A?" Only if both are yes is it M:N.',
            },
            {
              mistake: 'Storing derived attributes as columns without maintenance',
              severity: 'Medium',
              color: '#f97316',
              wrong: 'Storing age as a column in the database instead of computing it from date_of_birth. The age column goes stale immediately — it is only correct on the day it was last updated.',
              why: 'Derived attributes have no independent truth — their truth derives entirely from the source attributes. Storing them requires a mechanism to keep them in sync; without that mechanism, they become incorrect.',
              fix: 'Either compute dynamically (SELECT EXTRACT(YEAR FROM AGE(NOW(), date_of_birth)) AS age) or store with a trigger that maintains it automatically. Never store without a sync mechanism.',
            },
            {
              mistake: 'Multi-valued attributes in a single column',
              severity: 'High',
              color: '#ff4757',
              wrong: 'Storing phone_numbers as "98765-43210, 87654-32109" in a TEXT column.',
              why: 'Violates 1NF. Cannot index by individual phone number. Update anomaly guaranteed. Cannot add metadata (is this mobile/home/work?) per number.',
              fix: 'Always create a separate table for multi-valued attributes: customer_phones(customer_id FK, phone_number, phone_type). Primary key: (customer_id, phone_number).',
            },
            {
              mistake: 'Missing participation constraints',
              severity: 'Medium',
              color: '#facc15',
              wrong: 'Forgetting that orders MUST have a customer — allowing customer_id to be NULL in the orders table.',
              why: 'An order without a customer is a business nonsense. NULL allows it. The database should be the last line of defense against this kind of data quality failure.',
              fix: 'Explicitly decide participation for every relationship side. Total participation → NOT NULL on FK. Partial participation → nullable FK. Document the decision in your ER diagram.',
            },
            {
              mistake: 'Confusing weak entities with strong entities that have foreign keys',
              severity: 'Low (conceptual)',
              color: '#8b5cf6',
              wrong: 'Calling the orders table a "weak entity" because it has a customer_id foreign key.',
              why: 'Every entity in a relational schema has foreign keys — that is how 1:N and M:N relationships are implemented. Foreign keys do not make an entity weak. Weakness is about identity, not connectivity.',
              fix: 'An entity is weak if and only if its primary key requires a foreign key component to be unique. Order has its own order_id — it is strong. OrderItem has no unique identity without the parent order_id — it is weak.',
            },
            {
              mistake: 'Over-normalising the ER model',
              severity: 'Medium',
              color: '#f97316',
              wrong: 'Creating a separate CITY entity and a COUNTRY entity and a STATE entity and linking CUSTOMER to CITY to STATE to COUNTRY — when the only query ever run is "customers from San Francisco".',
              why: 'Over-engineering the model increases join complexity without benefiting the queries that the system actually needs to answer. Every extra entity is an extra join in every query.',
              fix: 'Design the ER model to serve the miniworld\'s actual requirements. If city is always just a filter string and never a first-class object with its own lifecycle, store it as a simple VARCHAR column, not as a linked entity.',
            },
          ].map((item) => (
            <div key={item.mistake} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>{item.mistake}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}25`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Severity: {item.severity}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
                <div style={{ background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✕ The Mistake</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.wrong}</div>
                </div>
                <div style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>⚠ Why It's Wrong</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.why}</div>
                </div>
                <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>✓ The Fix</div>
                  <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{item.fix}</div>
                </div>
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
        <SectionTitle>The Schema Design Interview — Design a Database for Uber Eats</SectionTitle>

        <Para>
          The most common DBMS task in a product company interview is the schema design question:
          "Design the database for [familiar product]." These are evaluated on your ability to
          identify the right entities, define appropriate relationships, choose correct cardinalities,
          and justify your decisions. Here is a complete walkthrough of how a senior engineer
          approaches this question.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Interview Question — Design the Uber Eats Database
          </div>

          <Para>
            <strong style={{ color: 'var(--text)' }}>Interviewer:</strong> "Design the core database schema for a food delivery platform like Uber Eats. You have 20 minutes."
          </Para>

          <Para>
            <strong style={{ color: 'var(--text)' }}>Correct approach — think aloud, structure your answer:</strong>
          </Para>

          <CodeBox label="Step 1 — Identify entities by listing the nouns in the domain">
{`Core entities I can immediately identify:
  USER          — customers ordering food
  RESTAURANT    — businesses listed on the platform
  MENU_ITEM     — individual dishes/products restaurants sell
  ORDER         — a user's food order to a restaurant
  ORDER_ITEM    — individual dishes within an order (weak entity of ORDER)
  DELIVERY_AGENT — person delivering the order
  ADDRESS       — delivery addresses (users can have multiple)
  REVIEW        — user reviews of restaurants or delivery

Extended entities (depends on scope):
  CATEGORY      — cuisine types (Indian, Chinese, Italian)
  COUPON        — promotional discount codes
  PAYMENT       — payment transaction details`}
          </CodeBox>

          <CodeBox label="Step 2 — Define relationships and cardinalities">
{`USER → ADDRESS:           1:N  (one user has many saved addresses)
USER → ORDER:             1:N  (one user places many orders)
RESTAURANT → MENU_ITEM:   1:N  (one restaurant has many menu items)
ORDER → RESTAURANT:       N:1  (many orders to one restaurant per order)
ORDER → ORDER_ITEM:       1:N  (one order has many order items — weak entity!)
ORDER_ITEM → MENU_ITEM:   N:1  (many order items reference same menu item)
ORDER → DELIVERY_AGENT:   N:1  (many orders delivered by agents over time)
USER → RESTAURANT (REVIEW): M:N (a user can review many restaurants, a restaurant has many reviews)
MENU_ITEM → CATEGORY:     M:N  (a dish can belong to multiple categories: Biryani is Indian AND Rice)`}
          </CodeBox>

          <CodeBox label="Step 3 — Final SQL schema">
{`CREATE TABLE users (
    user_id      SERIAL        PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    phone        VARCHAR(20)   UNIQUE NOT NULL,
    email        VARCHAR(150)  UNIQUE NOT NULL,
    created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    address_id   SERIAL        PRIMARY KEY,
    user_id      INT           NOT NULL,       -- FK on N side (1:N)
    label        VARCHAR(50)   DEFAULT 'Home', -- Home, Work, Other
    street       VARCHAR(200)  NOT NULL,
    city         VARCHAR(100)  NOT NULL,
    zip_code      CHAR(6)       NOT NULL,
    latitude     DECIMAL(10,8),
    longitude    DECIMAL(11,8),
    is_default   BOOLEAN       DEFAULT false,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE restaurants (
    restaurant_id  SERIAL         PRIMARY KEY,
    name           VARCHAR(200)   NOT NULL,
    phone          VARCHAR(20),
    address        TEXT           NOT NULL,
    city           VARCHAR(100)   NOT NULL,
    latitude       DECIMAL(10,8),
    longitude      DECIMAL(11,8),
    avg_rating     DECIMAL(3,2)   DEFAULT 0,  -- derived, maintained by trigger
    is_open        BOOLEAN        DEFAULT true,
    opens_at       TIME,
    closes_at      TIME
);

CREATE TABLE menu_items (
    item_id       SERIAL          PRIMARY KEY,
    restaurant_id INT             NOT NULL,    -- FK on N side (1:N)
    name          VARCHAR(200)    NOT NULL,
    description   TEXT,
    price         DECIMAL(10,2)   NOT NULL CHECK (price >= 0),
    is_veg        BOOLEAN         NOT NULL DEFAULT false,
    is_available  BOOLEAN         DEFAULT true,
    
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

CREATE TABLE delivery_agents (
    agent_id   SERIAL        PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    phone      VARCHAR(20)   UNIQUE NOT NULL,
    vehicle    VARCHAR(50),  -- 'bicycle', 'scooter', 'motorcycle'
    is_active  BOOLEAN       DEFAULT true
);

CREATE TABLE orders (
    order_id          SERIAL         PRIMARY KEY,
    user_id           INT            NOT NULL,
    restaurant_id     INT            NOT NULL,
    delivery_agent_id INT,           -- assigned after order accepted; NULL initially
    delivery_address_id INT          NOT NULL,
    status            VARCHAR(30)    DEFAULT 'pending',
    -- pending → confirmed → preparing → picked_up → delivered | cancelled
    placed_at         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    estimated_delivery TIMESTAMP,
    delivered_at      TIMESTAMP,
    subtotal          DECIMAL(10,2)  NOT NULL,  -- sum of items
    delivery_fee      DECIMAL(8,2)   DEFAULT 30,
    discount          DECIMAL(8,2)   DEFAULT 0,
    total             DECIMAL(10,2)  NOT NULL,
    payment_method    VARCHAR(30),   -- 'UPI', 'card', 'cash', 'wallet'
    payment_status    VARCHAR(20)    DEFAULT 'pending',
    
    FOREIGN KEY (user_id)             REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id)       REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (delivery_agent_id)   REFERENCES delivery_agents(agent_id),
    FOREIGN KEY (delivery_address_id) REFERENCES addresses(address_id)
);

-- ORDER_ITEM is a WEAK ENTITY (depends on ORDER for identity)
CREATE TABLE order_items (
    order_id    INT             NOT NULL,  -- FK to owner (ORDER)
    line_no     INT             NOT NULL,  -- partial key
    item_id     INT             NOT NULL,
    item_name   VARCHAR(200)    NOT NULL,  -- snapshot at time of order (menu may change)
    unit_price  DECIMAL(10,2)   NOT NULL,  -- price at time of order (not current price)
    quantity    INT             NOT NULL CHECK (quantity > 0),
    special_instructions TEXT,
    
    PRIMARY KEY (order_id, line_no),       -- composite PK = owner PK + partial key
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id)  REFERENCES menu_items(item_id)
);

-- M:N relationship: USER reviews RESTAURANT
CREATE TABLE reviews (
    review_id     SERIAL        PRIMARY KEY,
    user_id       INT           NOT NULL,
    restaurant_id INT           NOT NULL,
    order_id      INT           UNIQUE,   -- one review per order
    rating        INT           NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment       TEXT,
    created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE (user_id, restaurant_id, order_id),
    FOREIGN KEY (user_id)       REFERENCES users(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (order_id)      REFERENCES orders(order_id)
);`}
          </CodeBox>

          <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.15)', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>What Makes This Answer Excellent</div>
            {[
              'Correctly identified ORDER_ITEM as a weak entity (partial key: line_no, full PK: order_id + line_no)',
              'Stored item_name and unit_price as snapshots in order_items — because menu prices change, but a historical order should reflect the price at the time of purchase',
              'Used delivery_address_id FK rather than inline address fields — users can reorder to the same address, and if they update their address, historical orders still show the correct delivery location',
              'Noticed that reviews are constrained per order (UNIQUE on order_id) — prevents a user from reviewing the same order twice',
              'avg_rating on restaurants is a derived attribute — should be maintained by a trigger on the reviews table, not manually updated',
            ].map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'The ER model is a conceptual design tool — it models the real world before touching SQL. It consists of three building blocks: entities (things), attributes (properties), and relationships (connections).',
        'Strong entities exist independently and have their own primary key. Weak entities depend on an owner (identifying) entity for their identity. A weak entity\'s PK = owner\'s PK + partial key (discriminator).',
        'Attributes have five types: simple (atomic, one column), composite (store sub-components as separate columns if queried independently), multi-valued (always a separate table), derived (compute dynamically or store with a trigger), and key (the unique identifier).',
        'Cardinality is the most critical design decision: 1:1 (FK in either table or merge), 1:N (FK always on the many side), M:N (always requires a junction table with composite PK). Getting cardinality wrong creates schemas that cannot represent real data.',
        'Participation constraints define minimum participation: total participation (every instance must participate) → NOT NULL constraint. Partial participation (participation is optional) → nullable FK.',
        'Extended ER: Generalisation (bottom-up — extract common attributes into supertype), Specialisation (top-down — define subtypes with specific attributes). Implemented as single table (nullable columns), table per type (JOIN required), or table per concrete type (duplication).',
        'Aggregation allows a relationship to involve another relationship type — implemented as a junction table with a composite FK pointing to another junction table.',
        'ER-to-relational mapping follows 7 deterministic rules. The rules are algorithmic: strong entity → table, weak entity → table with composite PK, M:N → junction table, multi-valued → separate table. No guesswork required.',
        'Design validation: every business requirement should map to a queryable combination of tables. If a question cannot be answered without changing the schema, the ER model is incomplete.',
        'In schema design interviews: start by identifying entities (nouns), then define cardinalities (ask both directions), then identify relationship attributes, then apply mapping rules. A structured answer demonstrates DBMS maturity far more than jumping straight to CREATE TABLE.',
      ]} />

    </LearnLayout>
  )
}