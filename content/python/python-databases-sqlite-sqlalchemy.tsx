import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const C = '#4285f4'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function PythonDatabasesSqliteSqlalchemy() {
  return (
    <LearnLayout title="Python and Databases — sqlite3 and SQLAlchemy" description="Persist application data with SQLite, parameterize SQL safely, and use SQLAlchemy models and sessions without hiding the underlying database concepts." section="Python — Lesson 40" readTime="55 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Persistence" />
        <SectionTitle>Move from In-Memory Objects to Durable Records</SectionTitle>
        <Para>Lists and dictionaries disappear when a process exits. A database stores structured records, lets you query them, and supports transactions so related changes can succeed or fail together. We will use SQLite, a file-based relational database included with Python, to learn SQL and transactions with the built-in <code>sqlite3</code> module; then we will express the same concepts with SQLAlchemy.</Para>
        <Para>Know basic SQL concepts: tables, rows, columns, primary keys, and parameterized queries. We use a delivery order example with an integer identifier, customer name, amount in paise, and state. A relational database schema—not a Python annotation—enforces constraints that need to survive across every application path.</Para>
        <Callout type="info">SQLite is excellent for local tools, prototypes, tests, and single-node applications with a suitable write pattern. A database server may be a better fit for concurrent, multi-instance production services. Choose from operational requirements, not fashion.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — sqlite3" />
        <SectionTitle>Connect, Create a Schema, and Query with Parameters</SectionTitle>
        <Para>The built-in module avoids an external dependency. A connection manages database access; a cursor executes SQL. Use placeholders for values instead of inserting data into the SQL string. Placeholders protect values from being interpreted as SQL and keep query logic separate from data.</Para>
        <CodeBox label="Create a small orders table">{`import sqlite3
from pathlib import Path

DB_PATH = Path("orders.sqlite3")

with sqlite3.connect(DB_PATH) as connection:
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            customer TEXT NOT NULL,
            total_paise INTEGER NOT NULL CHECK (total_paise > 0),
            status TEXT NOT NULL
        )
    """)
    connection.commit()`}</CodeBox>
        <Para>The connection context manager commits a successful transaction and rolls back when an exception escapes the block; it does not close the connection itself. For short-lived scripts, a <code>with sqlite3.connect(...)</code> block still needs an explicit close or a helper that manages connection lifetime.</Para>
        <CodeBox label="Insert and retrieve rows with placeholders">{`import sqlite3

with sqlite3.connect("orders.sqlite3") as connection:
    cursor = connection.execute(
        "INSERT INTO orders (customer, total_paise, status) VALUES (?, ?, ?)",
        ("Asha", 129900, "placed"),
    )
    order_id = cursor.lastrowid

    row = connection.execute(
        "SELECT id, customer, total_paise, status FROM orders WHERE id = ?",
        (order_id,),
    ).fetchone()
    print(row)`}</CodeBox>
        <Callout type="warning">Never assemble SQL with f-strings or string concatenation for values: <code>{"f\"... WHERE customer = '{name}'\""}</code> is both fragile and unsafe. Use the database driver&apos;s parameter placeholders. Placeholders bind values, not table or column names; dynamic identifiers need a strict allow-list.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Rows and Transactions" />
        <SectionTitle>Return Readable Rows and Group Related Writes</SectionTitle>
        <Para>By default, SQLite rows are tuples in column order. Set <code>row_factory</code> to <code>sqlite3.Row</code> when name-based lookup improves readability. A transaction makes a set of related writes atomic: either all changes commit, or none do.</Para>
        <CodeBox label="Named column lookup and a transaction">{`import sqlite3

with sqlite3.connect("orders.sqlite3") as connection:
    connection.row_factory = sqlite3.Row
    with connection:
        connection.execute(
            "UPDATE orders SET status = ? WHERE id = ?",
            ("confirmed", 1),
        )
        connection.execute(
            "INSERT INTO order_events (order_id, event) VALUES (?, ?)",
            (1, "confirmed"),
        )
    row = connection.execute(
        "SELECT id, customer, status FROM orders WHERE id = ?", (1,)
    ).fetchone()
    if row is not None:
        print(row["customer"], row["status"])`}</CodeBox>
        <Para>In real code, handle expected constraint or operational errors at an appropriate boundary and make sure a failed operation does not leave a partially updated domain state. Avoid swallowing every exception. Keep connection lifetime predictable; do not share one SQLite connection casually across threads.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — SQLAlchemy" />
        <SectionTitle>Use a Higher-Level Mapping Without Forgetting SQL</SectionTitle>
        <Para>SQLAlchemy is an external library: install it in the active virtual environment with <code>pip install sqlalchemy</code>. Its ORM maps Python classes to tables and tracks changes through a session. The SQLAlchemy 2 style uses a declarative base, typed mapped attributes, and <code>select()</code>. The ORM is not a replacement for schema design, transactions, indexes, or understanding generated queries.</Para>
        <CodeBox label="Declare a model with SQLAlchemy 2 style">{`from sqlalchemy import Integer, String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    customer: Mapped[str] = mapped_column(String(120), nullable=False)
    total_paise: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)

engine = create_engine("sqlite:///orders_orm.sqlite3")
Base.metadata.create_all(engine)`}</CodeBox>
        <Para><code>create_all()</code> creates missing tables for a simple example; it is not a migration system. Once a schema is in use, use explicit versioned migrations so changes can be reviewed and safely applied to existing data.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Sessions and Queries" />
        <SectionTitle>Keep the Session Short and the Transaction Clear</SectionTitle>
        <Para>A SQLAlchemy <code>Session</code> is a unit-of-work and identity map, not a global connection. It tracks object changes, emits SQL when needed, and coordinates a transaction. Use a context manager so the session closes reliably; commit intentionally, and roll back if a transaction fails.</Para>
        <CodeBox label="Create, commit, and query">{`from sqlalchemy import select
from sqlalchemy.orm import Session

with Session(engine) as session:
    with session.begin():
        order = Order(
            customer="Asha",
            total_paise=129900,
            status="placed",
        )
        session.add(order)

with Session(engine) as session:
    statement = select(Order).where(Order.status == "placed")
    orders = session.scalars(statement).all()
    for order in orders:
        print(order.id, order.customer, order.total_paise)`}</CodeBox>
        <Para>ORM expressions still become SQL. For complex reports, bulk operations, or database-specific features, inspect generated statements and consider an explicit SQL query. Be deliberate about loading related objects to avoid issuing an unexpected query for every row.</Para>
        <Callout type="tip">At the service boundary, define who owns the session and transaction. A helper that commits unexpectedly can make a larger operation impossible to roll back as one unit.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Choosing a Layer" />
        <SectionTitle>Use the Simplest Abstraction That Fits</SectionTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'var(--text)' }}><thead><tr>{['Approach', 'Useful when', 'Trade-off'].map(x => <th key={x} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[['sqlite3', 'Small script, simple schema, learning SQL, precise control', 'You write SQL and map rows yourself'], ['SQLAlchemy Core', 'Parameterized SQL composition and portable SQL expression', 'Requires learning its expression API'], ['SQLAlchemy ORM', 'Domain objects, relationships, and unit-of-work changes', 'Must understand sessions, query behavior, and migrations']].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>In production, also decide how the database file or server is configured, who owns migrations, how backups and restores are tested, what data should be indexed, and how credentials are managed. Keep secrets out of source control. For server databases, connection pooling and deployment topology become important operational concerns.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Mistakes" />
        <SectionTitle>Database Bugs Often Hide at Boundaries</SectionTitle>
        <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li><strong>Interpolating values into SQL:</strong> SQL can be malformed or manipulated. Bind values with the driver&apos;s placeholders.</li>
          <li><strong>Forgetting transaction behavior:</strong> unrelated commits can leave partial state. Group related writes and roll back on failure.</li>
          <li><strong>Assuming ORM means no SQL knowledge:</strong> generated queries still have performance and correctness consequences. Inspect them when behavior surprises you.</li>
          <li><strong>Treating create_all as migrations:</strong> it does not manage safe evolution of an existing schema. Use versioned migrations for changes.</li>
          <li><strong>Keeping sessions globally forever:</strong> stale state and transaction leaks result. Scope sessions to a request or unit of work.</li>
          <li><strong>Using SQLite for every workload:</strong> concurrency, scaling, and operational needs may require a server database. Test the production-shaped workload.</li>
        </ul>
        <Callout type="example">If confirming an order also writes an audit event, perform both writes in one transaction. If the event insert fails, do not leave the order marked confirmed without its required audit record.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Practice: Persist a Small Order Lifecycle</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li>Write a <code>sqlite3</code> table with a primary key, required customer, positive amount constraint, and status.</li>
          <li>Insert and retrieve a record with placeholders. Try a value containing an apostrophe to confirm it is treated as data.</li>
          <li>Write a transaction that changes status and inserts an event; deliberately trigger a constraint error and confirm rollback.</li>
          <li>Map the table with SQLAlchemy typed declarations and select all orders in a chosen status.</li>
          <li>Add tests for an invalid amount, a missing order, and a failed multi-write transaction using a temporary or in-memory database.</li>
        </ol>
        <Para><strong>Think through:</strong> which parts are enforced by schema constraints, which are domain rules, and which belong to input validation or authorization?</Para>
      </section>
      <KeyTakeaways items={[
        'A relational schema expresses durable constraints; Python type annotations alone do not protect stored records.',
        'sqlite3 is built in and makes SQL explicit; bind every value through placeholders rather than string interpolation.',
        'Transactions group related writes atomically, and failures should leave data in a known state.',
        'SQLAlchemy 2 style maps typed Python classes and uses short-lived sessions to coordinate unit-of-work changes.',
        'ORMs still generate SQL; understand queries, indexes, constraints, and relationship loading.',
        'create_all is not a schema migration strategy; plan versioned migrations and backups for deployed data.',
        'Choose SQLite, Core, or ORM based on workload and team needs, not abstraction for its own sake.'
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 41 turns these concepts into tests that catch regressions before they reach a user.</p>
        <a href="/learn/python/unit-testing-pytest" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 41 → Unit Testing with pytest</a>
      </div>
    </LearnLayout>
  )
}
