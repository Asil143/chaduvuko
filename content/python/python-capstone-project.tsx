import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const C = '#ff4757'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function PythonCapstoneProject() {
  return (
    <LearnLayout title="Python Capstone Project" description="Build, test, and package a small delivery-order tracker that brings together domain models, SQLite persistence, a CLI, and production-minded error handling." section="Python — Lesson 49" readTime="75 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Brief" />
        <SectionTitle>Build a Delivery Order Tracker You Can Actually Run</SectionTitle>
        <Para>In this capstone you will create a small command-line application for a local delivery team. Staff can add an order, list saved orders, and move an order through a controlled lifecycle. Data must survive a restart, invalid transitions must fail clearly, and tests must run without touching a real user database.</Para>
        <Para>The project intentionally uses Python&apos;s standard library: <code>dataclasses</code> for the domain record, <code>Enum</code> for status values, <code>sqlite3</code> for persistence, <code>argparse</code> for the command-line interface, and <code>unittest</code> for automated tests. The focus is integration and clean boundaries, not adding a framework.</Para>
        <Callout type="info"><strong>Prerequisites:</strong> functions, classes and dataclasses (Lesson 26), exceptions, modules, command-line basics (Lesson 47), and SQLite transactions (Lesson 40). Do the project in a virtual environment and keep the database file out of source control.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Requirements and Boundaries" />
        <SectionTitle>Write Down What Done Means</SectionTitle>
        <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li>Create orders with a customer name and positive amount in paise.</li>
          <li>Persist each order with a unique ID, current status, and creation timestamp.</li>
          <li>List all orders or filter by a known status.</li>
          <li>Allow only explicit lifecycle transitions: placed → confirmed or cancelled; confirmed → in_transit or cancelled; in_transit → delivered.</li>
          <li>Report a missing order and an illegal transition as useful errors; never silently change the record.</li>
          <li>Provide automated tests for normal behavior, validation, persistence, and invalid transitions.</li>
        </ul>
        <Para>Keep three responsibilities distinct. The domain layer owns status rules. The storage layer owns SQL and transactions. The CLI parses human input and formats output. This boundary makes it possible to test a transition without starting a terminal or opening a database.</Para>
        <CodeBox label="A small project layout">{`delivery-tracker/
├── delivery_tracker.py   # domain, storage, CLI for this small first version
├── test_delivery_tracker.py
├── .gitignore
└── README.md`}</CodeBox>
        <Para>For a larger application, split this into a package with separate domain, repository, and CLI modules. Starting with one easy-to-run file keeps the first version reviewable; clear functions make a later split straightforward.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Domain Model" />
        <SectionTitle>Make Invalid State Changes Explicit</SectionTitle>
        <Para>Start with a data class and enum. Store the amount as integer paise so arithmetic does not depend on binary floating-point rounding. Use an allow-list of transitions and raise a domain error when a requested move is not legal.</Para>
        <CodeBox label="delivery_tracker.py — domain">{`from dataclasses import dataclass
from enum import Enum

class Status(str, Enum):
    PLACED = "placed"
    CONFIRMED = "confirmed"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

@dataclass(frozen=True)
class Order:
    id: int
    customer: str
    total_paise: int
    status: Status
    created_at: str

ALLOWED_TRANSITIONS = {
    Status.PLACED: {Status.CONFIRMED, Status.CANCELLED},
    Status.CONFIRMED: {Status.IN_TRANSIT, Status.CANCELLED},
    Status.IN_TRANSIT: {Status.DELIVERED},
    Status.DELIVERED: set(),
    Status.CANCELLED: set(),
}

class OrderNotFoundError(LookupError):
    pass

class InvalidTransitionError(ValueError):
    pass

def require_transition(current: Status, target: Status) -> None:
    if target not in ALLOWED_TRANSITIONS[current]:
        raise InvalidTransitionError(
            f"Cannot move an order from {current.value} to {target.value}"
        )`}</CodeBox>
        <Para>The domain function does not know SQLite or command-line arguments. That is deliberate: later we can test it with ordinary values. A frozen dataclass prevents callers from accidentally reassigning fields; it does not recursively freeze nested objects, but this record contains immutable values.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — SQLite Repository" />
        <SectionTitle>Persist with Parameters and Transaction Scope</SectionTitle>
        <Para>Next add database helpers. Each operation opens and closes its own connection, which keeps this small CLI&apos;s resource lifetime obvious. The schema includes constraints so basic data rules are enforced even if another code path writes to the database. Queries bind values rather than interpolating them into SQL.</Para>
        <CodeBox label="delivery_tracker.py — storage">{`import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path


def connect(db_path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    return connection


def initialize(db_path: Path) -> None:
    with closing(connect(db_path)) as connection:
        with connection:
            connection.execute("""
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY,
                    customer TEXT NOT NULL CHECK (length(customer) > 0),
                    total_paise INTEGER NOT NULL CHECK (total_paise > 0),
                    status TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
            """)


def add_order(db_path: Path, customer: str, total_paise: int) -> Order:
    customer = customer.strip()
    if not customer:
        raise ValueError("Customer name cannot be empty")
    if total_paise <= 0:
        raise ValueError("Amount in paise must be positive")
    created_at = datetime.now(timezone.utc).isoformat()
    with closing(connect(db_path)) as connection:
        with connection:
            cursor = connection.execute(
                "INSERT INTO orders (customer, total_paise, status, created_at) "
                "VALUES (?, ?, ?, ?)",
                (customer, total_paise, Status.PLACED.value, created_at),
            )
            order_id = cursor.lastrowid
            if order_id is None:
                raise RuntimeError("SQLite did not return the new order ID")
    return Order(order_id, customer, total_paise, Status.PLACED, created_at)


def list_orders(db_path: Path, status: Status | None = None) -> list[Order]:
    query = "SELECT id, customer, total_paise, status, created_at FROM orders"
    parameters: tuple[str, ...] = ()
    if status is not None:
        query += " WHERE status = ?"
        parameters = (status.value,)
    query += " ORDER BY id"
    with closing(connect(db_path)) as connection:
        rows = connection.execute(query, parameters).fetchall()
    return [
        Order(row["id"], row["customer"], row["total_paise"],
              Status(row["status"]), row["created_at"])
        for row in rows
    ]


def transition_order(db_path: Path, order_id: int, target: Status) -> Order:
    with closing(connect(db_path)) as connection:
        with connection:
            row = connection.execute(
                "SELECT id, customer, total_paise, status, created_at "
                "FROM orders WHERE id = ?", (order_id,),
            ).fetchone()
            if row is None:
                raise OrderNotFoundError(f"Order {order_id} does not exist")
            current = Status(row["status"])
            require_transition(current, target)
            connection.execute(
                "UPDATE orders SET status = ? WHERE id = ?",
                (target.value, order_id),
            )
    return Order(row["id"], row["customer"], row["total_paise"],
                 target, row["created_at"])`}</CodeBox>
        <Callout type="warning">The query appends a fixed SQL fragment chosen by the program and binds the status value. Do not append a user-provided column or SQL expression directly. If sorting or filtering by dynamic fields is added, map public choices to known SQL identifiers.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Command-Line Interface" />
        <SectionTitle>Make the Application Useful from a Terminal</SectionTitle>
        <Para>Use <code>argparse</code> to define clear subcommands and let it generate help text. The database path is configurable, so tests and developers can use separate files. Parse state names against the enum rather than accepting arbitrary values.</Para>
        <CodeBox label="delivery_tracker.py — CLI and entry point">{`import argparse
import sys


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Track delivery orders")
    parser.add_argument("--db", type=Path, default=Path("orders.sqlite3"))
    commands = parser.add_subparsers(dest="command", required=True)

    add = commands.add_parser("add", help="create an order")
    add.add_argument("customer")
    add.add_argument("total_paise", type=int)

    show = commands.add_parser("list", help="list orders")
    show.add_argument("--status", choices=[s.value for s in Status])

    move = commands.add_parser("transition", help="change order status")
    move.add_argument("order_id", type=int)
    move.add_argument("status", choices=[s.value for s in Status])
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        initialize(args.db)
        if args.command == "add":
            order = add_order(args.db, args.customer, args.total_paise)
            print(f"Created order {order.id} for {order.customer}")
        elif args.command == "list":
            status = Status(args.status) if args.status else None
            for order in list_orders(args.db, status):
                print(f"{order.id} | {order.customer} | "
                      f"{order.total_paise} paise | {order.status.value}")
        elif args.command == "transition":
            order = transition_order(args.db, args.order_id, Status(args.status))
            print(f"Order {order.id} is now {order.status.value}")
        return 0
    except (ValueError, OrderNotFoundError, sqlite3.Error) as error:
        print(f"error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())`}</CodeBox>
        <Para>The code initializes the schema before each operation and returns a meaningful process exit status. Test the commands manually in a disposable directory:</Para>
        <CodeBox label="Run the application">{`python delivery_tracker.py --db demo.sqlite3 add Asha 129900
python delivery_tracker.py --db demo.sqlite3 list
python delivery_tracker.py --db demo.sqlite3 transition 1 confirmed
python delivery_tracker.py --db demo.sqlite3 list --status confirmed`}</CodeBox>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Tests" />
        <SectionTitle>Test Behavior Without Reusing a Real Database</SectionTitle>
        <Para>Tests should create isolated data and clean it up automatically. This example creates a uniquely named database beside the test and removes it in teardown. Cover both the successful path and the failure contract, and check persisted results through the same public functions a user would call.</Para>
        <CodeBox label="test_delivery_tracker.py">{`import unittest
from pathlib import Path
from uuid import uuid4

from delivery_tracker import (
    InvalidTransitionError, OrderNotFoundError, Status,
    add_order, initialize, list_orders, transition_order,
)

class DeliveryTrackerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.db_path = Path(f"test-orders-{uuid4().hex}.sqlite3")
        initialize(self.db_path)

    def tearDown(self) -> None:
        if self.db_path.exists():
            self.db_path.unlink()

    def test_create_and_list_order(self) -> None:
        created = add_order(self.db_path, "Asha", 129900)
        saved = list_orders(self.db_path)
        self.assertEqual(len(saved), 1)
        self.assertEqual(saved[0].id, created.id)
        self.assertEqual(saved[0].status, Status.PLACED)

    def test_reject_non_positive_amount(self) -> None:
        with self.assertRaises(ValueError):
            add_order(self.db_path, "Asha", 0)

    def test_allowed_transition_persists(self) -> None:
        order = add_order(self.db_path, "Ravi", 50000)
        moved = transition_order(self.db_path, order.id, Status.CONFIRMED)
        self.assertEqual(moved.status, Status.CONFIRMED)
        self.assertEqual(list_orders(self.db_path)[0].status, Status.CONFIRMED)

    def test_reject_terminal_transition(self) -> None:
        order = add_order(self.db_path, "Meera", 70000)
        transition_order(self.db_path, order.id, Status.CANCELLED)
        with self.assertRaises(InvalidTransitionError):
            transition_order(self.db_path, order.id, Status.CONFIRMED)

    def test_missing_order_is_clear(self) -> None:
        with self.assertRaises(OrderNotFoundError):
            transition_order(self.db_path, 999, Status.CONFIRMED)

if __name__ == "__main__":
    unittest.main()`}</CodeBox>
        <CodeBox label="Run the test suite">{`python -m unittest -v`}</CodeBox>
        <Callout type="tip">Add a test for invalid customer names and CLI argument parsing. If you extract transition rules into their own function, test that function directly with no database setup.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Production Readiness" />
        <SectionTitle>Make the Demo Responsible Before Calling It Production</SectionTitle>
        <Para>This is a learning project, not a production order platform. Before real customer data is involved, decide how you will authenticate staff, authorize each action, validate user input, back up and restore data, protect personal information, and monitor failures. A local SQLite file does not provide a multi-user access-control system.</Para>
        <Para>For distribution, keep the application in a version-controlled repository, document supported Python environments, add a <code>.gitignore</code> entry for database files and virtual environments, and package a console command through project metadata once the code is split into an importable package. For deployment to a server, move configuration out of source, plan database migrations, test restore procedures, and choose a database suited to the concurrency and availability requirements.</Para>
        <CodeBox label="Useful .gitignore entries">{`.venv/
__pycache__/
*.py[cod]
*.sqlite3
orders.sqlite3`}</CodeBox>
        <Callout type="warning">Never commit a real database containing customer information. A local demo database can still contain personal data; use synthetic records in examples and tests.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Review Rubric" />
        <SectionTitle>Evaluate the Result Like an Engineer</SectionTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'var(--text)' }}><thead><tr>{['Area', 'Ready when…', 'Evidence'].map(x => <th key={x} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[['Domain rules', 'Illegal status changes cannot be persisted', 'A focused transition test'], ['Data integrity', 'SQL values are bound and schema constraints are present', 'Review INSERT/UPDATE and failure tests'], ['Resource handling', 'Connections close and transactions roll back on error', 'Context-managed code paths'], ['Usability', 'Help, validation messages, and exit status are clear', 'Try invalid CLI inputs'], ['Maintainability', 'Domain, storage, and CLI responsibilities are separable', 'Functions can be tested independently'], ['Operations', 'Database location, backup, migration, and privacy limits are documented', 'README checklist and safe sample data']].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>Ask someone else to run the setup from a clean checkout. If they need undocumented steps, or if tests depend on your local data, the project is not yet reproducible.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Extensions and Practice" />
        <SectionTitle>Make the Next Iteration Deliberate</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li>Split the file into a <code>domain</code>, <code>repository</code>, and <code>cli</code> package without changing behavior.</li>
          <li>Add an order event-history table and write each allowed transition and its audit event in one transaction.</li>
          <li>Add a CSV export using the standard library, and write output atomically so an interrupted export does not leave a partial report.</li>
          <li>Add Pydantic validation at a future HTTP boundary while keeping the core domain rules independent of the web framework.</li>
          <li>Use SQLAlchemy instead of sqlite3 and compare readability, query behavior, and migration requirements.</li>
        </ol>
        <Para><strong>Submission checklist:</strong> source code, tests passing from a clean checkout, sample CLI commands, no committed database or secrets, and a short design note describing trade-offs.</Para>
      </section>
      <KeyTakeaways items={[
        'A useful capstone begins with explicit requirements and separates domain decisions from persistence and user interaction.',
        'Dataclasses and enums make the order model and status vocabulary explicit; transition rules remain application logic.',
        'SQLite plus parameterized queries provides durable storage while preserving control over SQL and transactions.',
        'A small argparse CLI can return clear output and meaningful exit codes without a web framework.',
        'Isolated tests should prove persistence, validation, legal transitions, and failure behavior.',
        'A learning project needs documented limits: authentication, privacy, migrations, backup, and deployment are real production work.'
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 50 synthesizes the track&apos;s core concepts into interview questions, patterns, and trade-offs.</p>
        <a href="/learn/python/python-interview-prep" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 50 → Python Interview Prep — Common Questions and Patterns</a>
      </div>
    </LearnLayout>
  )
}
