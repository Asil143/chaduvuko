import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const C = '#f97316'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function DataclassesEnumsPydantic() {
  return (
    <LearnLayout title="Dataclasses, Enums and Pydantic Models" description="Represent structured domain data with dataclasses, make finite states explicit with enums, and validate untrusted input with Pydantic." section="Python — Lesson 26" readTime="45 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Three Different Jobs" />
        <SectionTitle>Choose the Right Shape for the Data</SectionTitle>
        <Para>As a Python program grows, plain dictionaries become hard to reason about: keys can be misspelled, the expected shape is not obvious, and every caller repeats validation. Three tools address different parts of that problem. A <code>dataclass</code> concisely represents trusted, in-process domain data. An <code>Enum</code> names a fixed set of choices such as an order state. Pydantic validates and parses data arriving from outside your program, such as JSON or an API request.</Para>
        <Para>These are not competing ways to write a class. A delivery service might use a Pydantic model at its HTTP boundary, convert validated values into a dataclass used by business logic, and use an enum for the order lifecycle. A dataclass's annotations improve editor and type-checker support, but Python does not automatically enforce them at runtime.</Para>
        <Callout type="info"><strong>Prerequisites:</strong> classes, constructors, type hints, dictionaries, and exceptions. This lesson builds on the OOP sequence through Lesson 25 and the type-hint lesson (Lesson 38).</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Dataclasses" />
        <SectionTitle>Remove Constructor Boilerplate, Keep the Domain Model</SectionTitle>
        <Para>The standard-library <code>dataclasses</code> module generates common methods from annotated fields. Use <code>@dataclass</code> when the class primarily stores data and its behavior is modest. The generated initializer accepts fields in declaration order, while the generated representation is useful for debugging.</Para>
        <CodeBox label="A compact domain object">{`from dataclasses import dataclass

@dataclass
class Delivery:
    order_id: str
    customer: str
    total_paise: int
    city: str

delivery = Delivery("ORD-1042", "Asha", 129900, "Hyderabad")
print(delivery)
print(delivery.total_paise)`}</CodeBox>
        <Para>Money is stored here in paise as an integer, not a binary floating-point amount of rupees. This avoids common rounding surprises in arithmetic. Formatting for display can convert to rupees at the boundary, while calculations keep a precise representation.</Para>
        <CodeBox label="Default values need a factory when mutable">{`from dataclasses import dataclass, field

@dataclass
class Batch:
    name: str
    order_ids: list[str] = field(default_factory=list)

morning = Batch("morning")
evening = Batch("evening")
morning.order_ids.append("ORD-1")
print(evening.order_ids)  # [] — each instance has its own list`}</CodeBox>
        <Callout type="warning">Never write <code>order_ids: list[str] = []</code> as a dataclass default. That one list would be shared by every instance. <code>default_factory</code> calls a function for each new object.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Dataclass Options" />
        <SectionTitle>Equality, Ordering, Immutability and Boundaries</SectionTitle>
        <Para>By default, dataclasses provide a useful representation and value-based equality. Two instances with the same class and equal field values compare equal. You can mark a value object as <code>frozen=True</code> when reassignment should be rejected, but frozen is shallow: a list stored in a frozen object can still be mutated. Prefer immutable field types such as tuples when deep immutability matters.</Para>
        <CodeBox label="An immutable value object">{`from dataclasses import dataclass

@dataclass(frozen=True)
class Coordinates:
    latitude: float
    longitude: float

home = Coordinates(17.385, 78.4867)
# home.latitude = 18.0  # raises dataclasses.FrozenInstanceError`}</CodeBox>
        <Para>Dataclasses do not validate field types. <code>Delivery("ORD-2", "Ravi", "cheap", "Chennai")</code> can be constructed despite the annotated integer total. Use constructors or explicit validation for internal invariants; use Pydantic when values need parsing and validation from untrusted input.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Enums" />
        <SectionTitle>Replace Unclear Strings with Named States</SectionTitle>
        <Para>A status field often starts as a string and gradually collects spelling variants such as <code>"in-transit"</code>, <code>"in_transit"</code>, and <code>"In Transit"</code>. An enum gives each valid choice one canonical name. A string enum can serialize naturally while keeping comparisons explicit.</Para>
        <CodeBox label="An order lifecycle">{`from enum import Enum

class DeliveryStatus(str, Enum):
    PLACED = "placed"
    CONFIRMED = "confirmed"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

status = DeliveryStatus.IN_TRANSIT
print(status.value)                 # in_transit
print(status == DeliveryStatus.IN_TRANSIT)  # True`}</CodeBox>
        <Para>Use enum members in business logic rather than repeatedly comparing strings. Keep transitions deliberate: an enum defines the possible values, but does not by itself enforce that a delivered order cannot move back to placed. A transition function or domain method should enforce that rule.</Para>
        <CodeBox label="Enforce transitions in one place">{`ALLOWED = {
    DeliveryStatus.PLACED: {DeliveryStatus.CONFIRMED, DeliveryStatus.CANCELLED},
    DeliveryStatus.CONFIRMED: {DeliveryStatus.IN_TRANSIT, DeliveryStatus.CANCELLED},
    DeliveryStatus.IN_TRANSIT: {DeliveryStatus.DELIVERED},
    DeliveryStatus.DELIVERED: set(),
    DeliveryStatus.CANCELLED: set(),
}

def move_to(current: DeliveryStatus, target: DeliveryStatus) -> DeliveryStatus:
    if target not in ALLOWED[current]:
        raise ValueError(f"Cannot move from {current.value} to {target.value}")
    return target`}</CodeBox>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Pydantic at the Boundary" />
        <SectionTitle>Parse External Data, Don&apos;t Trust Its Shape</SectionTitle>
        <Para>Pydantic is a third-party library, so install it in the project virtual environment with <code>pip install pydantic</code>. Its model declarations look similar to dataclasses, but Pydantic performs runtime parsing and validation. In this example, a JSON payload is untrusted until the model accepts it.</Para>
        <CodeBox label="Validated request model">{`from pydantic import BaseModel, ConfigDict, Field

class DeliveryRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    order_id: str = Field(min_length=1)
    customer: str = Field(min_length=1)
    total_paise: int = Field(gt=0)
    city: str = Field(min_length=1)

payload = {
    "order_id": "ORD-1042",
    "customer": "Asha",
    "total_paise": 129900,
    "city": "Hyderabad",
}
request = DeliveryRequest.model_validate(payload)
print(request.model_dump())`}</CodeBox>
        <Para>Validation can fail with <code>pydantic.ValidationError</code>; handle it at the boundary and return a clear client error rather than allowing invalid data into business logic. Pydantic may coerce compatible inputs according to its validation rules, so choose strictness intentionally if coercion is not appropriate for a field. The model validates data; it does not replace authorization, database constraints, or business-rule checks.</Para>
        <Callout type="tip">A clean flow is: external JSON → Pydantic request model → domain object or service call → response model. Keep transport-specific validation out of core business functions where practical.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Serialization and Model Choice" />
        <SectionTitle>Choose by Responsibility, Not Familiarity</SectionTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'var(--text)' }}><thead><tr>{['Need', 'Good fit', 'Important limit'].map(x => <th key={x} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[['Plain internal value object', 'dataclass', 'Annotations are not runtime validation'], ['Finite named set of states', 'Enum', 'Does not enforce valid state transitions'], ['Validate incoming JSON or API data', 'Pydantic model', 'Third-party dependency; define coercion policy'], ['Complex behavior and invariants', 'Regular class or domain service', 'Choose explicit logic over decorator magic']].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>Standard JSON encoding does not automatically know how to serialize every dataclass or enum. Convert deliberately: use <code>dataclasses.asdict()</code> for dataclasses, and the enum&apos;s <code>.value</code> for its wire representation. For Pydantic models, <code>model_dump()</code> returns Python data and <code>model_dump_json()</code> emits JSON text.</Para>
        <CodeBox label="Explicit conversion for a dataclass">{`from dataclasses import asdict
import json

record = Delivery("ORD-1042", "Asha", 129900, "Hyderabad")
print(json.dumps(asdict(record)))`}</CodeBox>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Mistakes" />
        <SectionTitle>Modeling Errors to Catch Early</SectionTitle>
        <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li><strong>Treating annotations as checks:</strong> dataclasses do not enforce field types. Validate external input with Pydantic or explicit code.</li>
          <li><strong>Using a mutable literal default:</strong> lists and dictionaries can be shared. Use <code>field(default_factory=...)</code>.</li>
          <li><strong>Assuming frozen means deeply immutable:</strong> nested mutable objects remain mutable. Prefer immutable members or copy defensively.</li>
          <li><strong>Using raw strings for lifecycle states:</strong> misspellings become hidden states. Use an enum and separately validate transitions.</li>
          <li><strong>Assuming Pydantic is authorization:</strong> schema validity does not prove a user may act on a record. Authorize in application logic.</li>
        </ul>
        <Callout type="example">For an order API, Pydantic can confirm <code>total_paise</code> is a positive integer and the order identifier is present. The service must still confirm the caller owns the order and that its current status allows cancellation.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Practice: Model a Small Service Domain</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li>Create a <code>@dataclass</code> for a support ticket with an identifier, title, and list of notes. Prove each new instance has its own notes list.</li>
          <li>Create an enum for ticket status and write a transition function that rejects reopening a permanently closed ticket.</li>
          <li>Write a Pydantic request model that rejects empty titles and unknown fields. Try valid, missing, and invalid input.</li>
          <li>Convert a dataclass to a JSON-compatible dictionary and serialize the enum as its stable string value.</li>
          <li>Decide which checks belong at input parsing, in the domain model, and in an authorization layer; explain why.</li>
        </ol>
        <Para><strong>Suggested check:</strong> use <code>pytest</code> to assert that invalid payloads raise <code>ValidationError</code>, illegal transitions raise <code>ValueError</code>, and valid transitions return the requested enum member.</Para>
      </section>
      <KeyTakeaways items={[
        'Dataclasses generate useful boilerplate for data-focused classes; their annotations do not perform runtime validation.',
        'Use field(default_factory=...) for mutable dataclass fields so instances do not share the same collection.',
        'Frozen dataclasses prevent field reassignment but do not recursively freeze nested values.',
        'Enums replace scattered string constants with a finite, named set of values; validate state transitions separately.',
        'Pydantic parses and validates untrusted input at runtime; it is a third-party dependency, not a substitute for authorization.',
        'Keep parsing, domain rules, persistence, and output serialization as explicit boundaries.'
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 27 moves into flexible function signatures with positional, keyword, and variadic arguments.</p>
        <a href="/learn/python/args-kwargs" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 27 → *args, **kwargs and Function Arguments Deep Dive</a>
      </div>
    </LearnLayout>
  )
}
