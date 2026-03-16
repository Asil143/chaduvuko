import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'ER Model — Entity Relationship Diagrams | DBMS | Chaduvuko',
  description:
    'Design a database visually before writing a single line of SQL. Entities, attributes, relationships, cardinality, weak entities — explained from scratch with real examples.',
}

export default function ERModel() {
  return (
    <LearnLayout
      title="Entity-Relationship (ER) Model"
      description="Design your database on paper before touching a keyboard. The ER model is your architectural blueprint — get this right and everything else follows naturally."
      section="DBMS"
      readTime="35–40 min"
      updatedAt="March 2026"
    >

      {/* ── SECTION 1 — WHAT IS ER MODEL ── */}
      <section style={{ marginBottom: 60 }}>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Imagine you're hired to build the database for a new food delivery app — think Zomato from scratch.
          Before you open a terminal, before you write a single line of SQL, someone needs to answer:
          what data exists, how does it all connect, and what rules must always be true?
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          That's exactly what the <strong style={{ color: 'var(--text)' }}>Entity-Relationship (ER) model</strong> is for.
          It's a visual blueprint — a diagram you draw to map out the entire structure of a database
          before any table is created. Like an architect's floor plan before a building is constructed.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          The ER model was proposed by <strong style={{ color: 'var(--text)' }}>Peter Chen in 1976</strong> and
          it's still the standard way to design relational databases today — in universities, in companies,
          and in every system design interview you'll face.
        </p>
        <Callout type="info">
          The ER model gives you three building blocks to describe any system:
          <strong> Entities</strong> (the things), <strong>Attributes</strong> (properties of those things),
          and <strong>Relationships</strong> (how things connect to each other). Everything in database
          design maps to one of these three.
        </Callout>
      </section>

      {/* ── SECTION 2 — ENTITIES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Entities — The "Things" in Your System
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          An <strong style={{ color: 'var(--text)' }}>entity</strong> is any real-world thing that
          exists independently and about which we want to store data. Think of it as a noun —
          a person, place, object, or concept.
        </p>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          For a Zomato-like system, the entities would be: <strong style={{ color: 'var(--text)' }}>Customer</strong>,
          <strong style={{ color: 'var(--text)' }}> Restaurant</strong>,
          <strong style={{ color: 'var(--text)' }}> MenuItem</strong>,
          <strong style={{ color: 'var(--text)' }}> Order</strong>,
          <strong style={{ color: 'var(--text)' }}> DeliveryAgent</strong>.
          Each of these is a distinct thing the system needs to track.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { entity: 'Customer', examples: 'Rahul, Priya, Arjun', color: '#0078d4' },
            { entity: 'Restaurant', examples: 'Biryani House, Pizza Stop', color: 'var(--accent)' },
            { entity: 'MenuItem', examples: 'Chicken Biryani, Veg Pizza', color: '#f97316' },
            { entity: 'Order', examples: 'ORD-001, ORD-002', color: '#8b5cf6' },
            { entity: 'DeliveryAgent', examples: 'Ravi, Kumar, Suresh', color: '#facc15' },
          ].map((item) => (
            <div key={item.entity} style={{ background: 'var(--surface)', border: `1px solid var(--border)`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.entity}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>e.g. {item.examples}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>
          Strong Entity vs Weak Entity
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Strong Entity</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
              Can exist on its own. Has its own unique identifier (primary key).
            </p>
            <div style={{ fontSize: 13, color: 'var(--text)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontFamily: 'var(--font-mono)' }}>
              Customer — exists independently.<br />
              customer_id = C001 (unique)
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#f97316', marginBottom: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Weak Entity</div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontFamily: 'Inter, sans-serif', marginBottom: 10 }}>
              Cannot exist without a parent strong entity. Identified only through its owner.
            </p>
            <div style={{ fontSize: 13, color: 'var(--text)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontFamily: 'var(--font-mono)' }}>
              OrderItem — cannot exist<br />
              without an Order parent.
            </div>
          </div>
        </div>
        <Callout type="warning">
          The most common mistake beginners make: forgetting that a weak entity has a
          <strong> partial key</strong> (called a discriminator), not a full primary key.
          An OrderItem might be identified by its line number (1, 2, 3) — but that line number
          only makes sense within a specific order. Line 1 of Order ORD-001 is different
          from Line 1 of Order ORD-002.
        </Callout>
      </section>

      {/* ── SECTION 3 — ATTRIBUTES ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Attributes — Properties of Entities
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          An <strong style={{ color: 'var(--text)' }}>attribute</strong> is a property or characteristic
          of an entity. A Customer entity has attributes: name, phone, email, city. A Restaurant has:
          name, address, cuisine_type, rating. Attributes become the columns in your tables.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              type: 'Simple Attribute', color: '#0078d4',
              desc: 'Cannot be broken down further. Stored as a single value.',
              example: 'customer_id = "C001", age = 25, price = 280',
            },
            {
              type: 'Composite Attribute', color: 'var(--accent)',
              desc: 'Can be broken into smaller sub-attributes that are meaningful on their own.',
              example: 'full_name → (first_name, last_name) | address → (street, city, pincode)',
            },
            {
              type: 'Multi-valued Attribute', color: '#f97316',
              desc: 'Can hold multiple values for a single entity instance.',
              example: 'phone_numbers = ["98765-43210", "87654-32109"] — a customer with two phones',
            },
            {
              type: 'Derived Attribute', color: '#8b5cf6',
              desc: 'Can be calculated from other attributes. Not stored — computed on demand.',
              example: 'age can be derived from date_of_birth. total_price from (qty × unit_price)',
            },
            {
              type: 'Key Attribute', color: '#facc15',
              desc: 'Uniquely identifies each entity instance. Becomes the Primary Key.',
              example: 'customer_id, order_id, restaurant_id — each uniquely identifies one row',
            },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.type}</div>
              <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px' }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — RELATIONSHIPS ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Relationships — How Entities Connect
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          A <strong style={{ color: 'var(--text)' }}>relationship</strong> describes how two or more
          entities are associated. Relationships also have their own attributes — for example,
          the relationship between Customer and Restaurant through an Order has attributes
          like order_date, total_amount, status.
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', marginBottom: 16, fontFamily: 'Syne, sans-serif' }}>Cardinality — The Most Important Concept in Relationships</h3>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          Cardinality tells you <strong style={{ color: 'var(--text)' }}>how many instances of one entity can be related to how many instances of another</strong>.
          This directly decides how tables are structured.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              type: 'One-to-One (1:1)', color: '#0078d4',
              desc: 'One instance of Entity A is related to exactly one instance of Entity B.',
              example: 'One Person has one Passport. One Employee has one Employee Profile.',
              howToStore: 'Add a foreign key in either table, or merge into one table.',
            },
            {
              type: 'One-to-Many (1:N)', color: 'var(--accent)',
              desc: 'One instance of Entity A can relate to many instances of Entity B. But each B relates to only one A.',
              example: 'One Customer can place many Orders. But each Order belongs to exactly one Customer.',
              howToStore: 'Add foreign key in the "many" side table. orders.customer_id references customers.',
            },
            {
              type: 'Many-to-Many (M:N)', color: '#f97316',
              desc: 'One instance of A can relate to many of B, AND one instance of B can relate to many of A.',
              example: 'One Student can enroll in many Courses. One Course can have many Students.',
              howToStore: 'Create a junction/bridge table: student_courses(student_id, course_id).',
            },
          ].map((item) => (
            <div key={item.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ height: 3, background: item.color }} />
              <div style={{ padding: '20px 24px' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>{item.type}</div>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                <div style={{ fontSize: 13, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ color: 'var(--text2)' }}>Example:</strong> {item.example}
                </div>
                <div style={{ fontSize: 13, color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '8px 12px', fontFamily: 'var(--font-mono)' }}>
                  → How to store: {item.howToStore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5 — ER TO TABLE ── */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>
          Converting an ER Diagram to Tables — Step by Step
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          An ER diagram is the plan. Tables are the implementation. Here are the exact rules for
          the conversion — follow these and you'll never design a table wrong.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { rule: 'Rule 1', title: 'Each strong entity → one table', detail: 'Every attribute becomes a column. The key attribute becomes the primary key.', code: 'Customer(customer_id PK, name, phone, city)' },
            { rule: 'Rule 2', title: 'Each weak entity → one table', detail: 'Include all its attributes PLUS the primary key of its owner entity as a foreign key. Primary key = (owner FK + partial key).', code: 'OrderItem(order_id FK, line_no, item_name, qty, price)\nPK = (order_id, line_no)' },
            { rule: 'Rule 3', title: '1:1 relationship → merge or foreign key', detail: 'Either merge both into one table, or add the primary key of one as a foreign key in the other.', code: 'employee(emp_id PK, name, profile_id FK)' },
            { rule: 'Rule 4', title: '1:N relationship → foreign key on the "many" side', detail: "Add the primary key of the 'one' entity as a foreign key in the 'many' entity's table.", code: 'order(order_id PK, customer_id FK, date, total)' },
            { rule: 'Rule 5', title: 'M:N relationship → new junction table', detail: 'Create a new table with the primary keys of both entities as foreign keys. The combination becomes the primary key.', code: 'student_course(student_id FK, course_id FK)\nPK = (student_id, course_id)' },
            { rule: 'Rule 6', title: 'Multi-valued attribute → new table', detail: 'Multi-valued attributes cannot fit in one column. Create a separate table linked back to the parent.', code: 'customer_phones(customer_id FK, phone_number)\nPK = (customer_id, phone_number)' },
          ].map((item, i) => (
            <div key={item.rule} style={{ display: 'flex', gap: 18, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', flexShrink: 0, marginTop: 2 }}>{item.rule}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'Syne, sans-serif' }}>{item.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>{item.detail}</div>
                <div style={{ fontSize: 12, color: 'var(--accent)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontFamily: 'var(--font-mono)', whiteSpace: 'pre' }}>{item.code}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT THIS LOOKS LIKE AT WORK ── */}
      <section style={{ marginBottom: 60 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>WhatsApp Groups — Modelled as an ER Diagram</h2>
        <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
          You use WhatsApp every day. Let's model it. Entities: <strong style={{ color: 'var(--text)' }}>User</strong>, <strong style={{ color: 'var(--text)' }}>Group</strong>, <strong style={{ color: 'var(--text)' }}>Message</strong>, <strong style={{ color: 'var(--text)' }}>Media</strong>.
        </p>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2, color: 'var(--text2)', marginBottom: 20 }}>
          <div style={{ color: 'var(--muted)', marginBottom: 6 }}>// Entities → Tables</div>
          <div><span style={{ color: 'var(--accent)' }}>User</span><span style={{ color: 'var(--muted)' }}>(user_id, name, phone, last_seen)</span></div>
          <div><span style={{ color: '#0078d4' }}>Group</span><span style={{ color: 'var(--muted)' }}>(group_id, name, created_at, created_by→User)</span></div>
          <div><span style={{ color: '#f97316' }}>Message</span><span style={{ color: 'var(--muted)' }}>(msg_id, content, sent_at, sender→User, group→Group)</span></div>
          <div style={{ marginTop: 8, color: 'var(--muted)' }}>// M:N → Junction table (User ↔ Group)</div>
          <div><span style={{ color: '#8b5cf6' }}>group_members</span><span style={{ color: 'var(--muted)' }}>(user_id→User, group_id→Group, joined_at, role)</span></div>
        </div>
        <Callout type="tip">
          In real-world database design interviews, you'll be asked to design schemas exactly like
          this — "Design the database for WhatsApp" or "Design the database for Uber". Start with
          entities, then relationships, then cardinality, then convert to tables. This exact sequence
          is what interviewers look for.
        </Callout>
      </section>

      <KeyTakeaways items={[
        'An ER diagram is the visual blueprint of a database — drawn before any SQL is written. Three building blocks: Entities, Attributes, Relationships.',
        'Strong entities exist independently with their own primary key. Weak entities depend on a parent entity and have a partial key.',
        'Attributes have 5 types: simple, composite, multi-valued, derived, and key. Multi-valued attributes always need a separate table.',
        'Cardinality (1:1, 1:N, M:N) directly determines table structure. M:N always requires a junction table.',
        'Converting ER to tables follows 6 rules. The most important: FK goes on the "many" side for 1:N, and M:N always becomes a new table.',
        'In interviews, always start with ER design before writing SQL. It shows you think structurally, not just syntactically.',
      ]} />

    </LearnLayout>
  )
}