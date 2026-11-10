import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LowLevelDesign() {
  return (
    <LearnLayout
      title="Low-Level Design — Classes, SOLID and Design Patterns"
      description="Model a problem with classes and interfaces, apply SOLID, and use common design patterns in a parking-lot style LLD question."
      section="System Design — Lesson 11"
      readTime="45 min"
    >
      <Part n={1} label="From requirements to objects" title="Low-Level Design Is About Changeable Code">
        <P>
          High-level design asks which services, stores, and network boundaries make a system work. Low-level design (LLD)
          asks how one service expresses its rules in types, objects, and functions. An interviewer may say, &quot;Design a
          parking lot,&quot; but the useful answer is not a class diagram drawn before you understand the rules. First clarify
          the behaviors, constraints, and changes the design must support.
        </P>
        <P>
          We will use a small multi-floor parking facility. A vehicle enters, receives a ticket for a compatible space, pays
          when leaving, and releases the space. The design should allow more vehicle and payment types later. We are not
          building a distributed parking platform here; gates, persistence, and payment providers can be adapters around the
          core domain. Keeping that boundary clear makes the code easier to reason about and test.
        </P>
        <Table
          head={['Question', 'Example rule', 'Design consequence']}
          rows={[
            ['What is the core workflow?', 'Entry issues one active ticket; exit settles it.', 'Model ticket lifecycle explicitly.'],
            ['What must be compatible?', 'A motorcycle cannot use a car-only space.', 'Put compatibility in a domain rule, not the UI.'],
            ['What may change?', 'A new payment method or space type.', 'Depend on small interfaces and isolate policy.'],
            ['What must be unique?', 'One vehicle cannot occupy two spaces at once.', 'Enforce the invariant in the allocation operation.'],
          ]}
          caption="Requirements should become observable rules before they become classes."
        />
        <Callout type="tip">
          Ask about the happy path, invalid states, concurrency, and likely extensions. An interviewer learns more from
          explaining why a rule belongs in a class than from seeing a long list of design-pattern names.
        </Callout>
      </Part>

      <Part n={2} label="Find responsibilities" title="Name the Domain Before Drawing the Diagram">
        <P>
          Start with nouns and verbs in the requirements, then challenge each candidate. Lot, floor, space, vehicle, ticket,
          payment, and gate are plausible domain concepts. A receipt printer, database connection, and payment gateway are
          infrastructure details; they may need adapters, but they are not automatically core domain objects. A class earns
          its place when it owns state or behavior that must stay consistent.
        </P>
        <P>
          Give every operation a clear owner. A space can report whether a vehicle fits; a ticket can report whether it is
          still active; an allocator can choose an available compatible space; and a parking service can coordinate the
          entry workflow. Do not let a UI controller reach into a list of spaces and mutate fields directly. That spreads
          invariants across call sites, so one forgotten update can create two tickets for the same space.
        </P>
        <Code file="domain_sketch.py" code={`
from dataclasses import dataclass
from enum import Enum

class VehicleKind(Enum):
    MOTORCYCLE = "motorcycle"
    CAR = "car"
    BUS = "bus"

@dataclass(frozen=True)
class Vehicle:
    registration: str
    kind: VehicleKind

@dataclass
class ParkingSpace:
    space_id: str
    supported_kinds: frozenset[VehicleKind]
    occupied_by: str | None = None

    def can_fit(self, vehicle: Vehicle) -> bool:
        return vehicle.kind in self.supported_kinds and self.occupied_by is None

    def occupy(self, vehicle: Vehicle) -> None:
        if not self.can_fit(vehicle):
            raise ValueError("space is unavailable or incompatible")
        self.occupied_by = vehicle.registration
`} />
        <P>
          The type captures a useful distinction: <code>supported_kinds</code> is policy data, while <code>occupied_by</code>
          is current state. The guard sits beside the state mutation, so every caller receives the same protection. A real
          application would also validate registrations and persist changes transactionally, but the example keeps the
          domain rule visible.
        </P>
      </Part>

      <Part n={3} label="SOLID in practice" title="Use the Principles to Protect a Real Boundary">
        <P>
          SOLID is a set of design heuristics, not a goal of maximizing interfaces. In this example, single responsibility
          means the tariff calculator should not also allocate spaces or send payment requests. Open/closed means a new
          tariff policy should be addable without rewriting the exit workflow. Liskov substitution and interface segregation
          ask us to keep implementations honest and interfaces small. Dependency inversion means the workflow depends on
          stable abstractions, not a concrete payment SDK.
        </P>
        <Code file="billing.py" code={`
from typing import Protocol

class Tariff(Protocol):
    def amount_due(self, entry_minute: int, exit_minute: int) -> int: ...

class FlatHourlyTariff:
    def __init__(self, paise_per_hour: int) -> None:
        self.paise_per_hour = paise_per_hour

    def amount_due(self, entry_minute: int, exit_minute: int) -> int:
        elapsed = max(0, exit_minute - entry_minute)
        billed_hours = max(1, (elapsed + 59) // 60)
        return billed_hours * self.paise_per_hour

class ExitQuote:
    def __init__(self, tariff: Tariff) -> None:
        self.tariff = tariff

    def quote(self, entry_minute: int, exit_minute: int) -> int:
        return self.tariff.amount_due(entry_minute, exit_minute)

hourly = FlatHourlyTariff(paise_per_hour=3000)
print(ExitQuote(hourly).quote(10, 71))
`} />
        <P>
          This example uses integer paise rather than floating-point rupees, avoiding fractional rounding surprises in a
          payment amount. The protocol is valuable because policies can be substituted and tested independently. If the
          facility has only one stable tariff, an interface may be unnecessary; add the seam when a real variation or test
          boundary justifies it.
        </P>
        <Callout type="warning">
          SOLID does not mean one class per sentence or an interface for every class. Every abstraction has a cost: more names,
          more indirection, and more decisions for the next developer. Introduce a seam for a meaningful reason.
        </Callout>
      </Part>

      <Part n={4} label="Patterns as tools" title="Choose a Pattern Only When It Removes a Repeated Decision">
        <P>
          A strategy is useful when pricing or allocation has interchangeable algorithms. A factory can choose a payment
          adapter from validated configuration. A state machine can make a ticket's allowed transitions explicit. These
          patterns are not mandatory labels: the goal is to make variation and invalid transitions hard to hide.
        </P>
        <Table
          head={['Pattern', 'Parking-lot use', 'Avoid it when']}
          rows={[
            ['Strategy', 'Select a weekday or event tariff.', 'There is only one rule and no expected variation.'],
            ['Factory', 'Create one of several payment adapters.', 'Construction is a single direct call.'],
            ['State', 'Restrict ticket transitions to active, paid, closed.', 'A simple boolean is enough and states cannot grow.'],
            ['Repository', 'Keep persistence separate from domain rules.', 'It would only wrap an already clear, tiny data access.'],
          ]}
        />
        <Code file="ticket_state.py" code={`
from enum import Enum

class TicketStatus(Enum):
    ACTIVE = "active"
    PAID = "paid"
    CLOSED = "closed"

class Ticket:
    def __init__(self, ticket_id: str, space_id: str) -> None:
        self.ticket_id = ticket_id
        self.space_id = space_id
        self.status = TicketStatus.ACTIVE

    def mark_paid(self) -> None:
        if self.status is not TicketStatus.ACTIVE:
            raise ValueError("only an active ticket can be paid")
        self.status = TicketStatus.PAID

    def close(self) -> None:
        if self.status is not TicketStatus.PAID:
            raise ValueError("payment must be recorded before closing")
        self.status = TicketStatus.CLOSED

sample = Ticket("T-104", "F1-A08")
sample.mark_paid()
sample.close()
print(sample.status.value)
`} />
        <P>
          The state methods make a transition table executable. Production systems should also represent payment pending,
          failed, and refunded where needed. Do not add these states until the business workflow defines what they mean and
          what actions are permitted from them.
        </P>
      </Part>

      <Part n={5} label="Build the workflow" title="Coordinate Entry Without Leaking Mutations">
        <P>
          The service below coordinates a focused happy path: find a compatible space, occupy it, and create a ticket. In a
          real application, these operations must be committed atomically. Two gate requests may otherwise observe the same
          free space. A database uniqueness constraint or a lock around the allocation transaction is needed once multiple
          processes are involved; a Python list alone cannot provide that guarantee.
        </P>
        <Code file="parking_service.py" code={`
from dataclasses import dataclass
from itertools import count

@dataclass(frozen=True)
class TicketRecord:
    ticket_id: str
    vehicle: Vehicle
    space_id: str

class ParkingService:
    def __init__(self, spaces: list[ParkingSpace]) -> None:
        self.spaces = spaces
        self._ids = count(1)

    def admit(self, vehicle: Vehicle) -> TicketRecord:
        for space in self.spaces:
            if space.can_fit(vehicle):
                space.occupy(vehicle)
                ticket_id = f"T-{next(self._ids):06d}"
                return TicketRecord(ticket_id, vehicle, space.space_id)
        raise LookupError("no compatible space is available")

spaces = [ParkingSpace("F1-A08", frozenset({VehicleKind.CAR}))]
service = ParkingService(spaces)
car = Vehicle("AP-01-AB-1234", VehicleKind.CAR)
print(service.admit(car))
`} />
        <P>
          The identifiers here are adequate for a single in-memory demonstration, not a distributed production allocator.
          If several service instances generate IDs, move ID allocation to a durable, collision-safe mechanism. If admission
          must be idempotent after a client timeout, accept a request key and persist the outcome so a retry returns the
          original ticket instead of occupying another space.
        </P>
        <Steps items={[
          'Validate the vehicle and request key at the application boundary.',
          'Begin a transaction and reserve one compatible free space atomically.',
          'Create the active ticket and commit the reservation together.',
          'Return the ticket only after the transaction succeeds; otherwise report a clear conflict.',
        ]} />
      </Part>

      <Part n={6} label="Testability" title="Test Rules Through Public Behavior">
        <P>
          Unit tests should focus on invariants and decisions: incompatible vehicles are rejected, a space cannot be occupied
          twice, an active ticket can be paid, and an unpaid ticket cannot close. Inject a clock and tariff when time or
          pricing affects results; tests should not sleep or depend on the machine's current time. Integration tests then
          verify the transactional reservation and payment adapter against the chosen infrastructure.
        </P>
        <Code file="test_ticket.py" code={`
import unittest

class TicketTests(unittest.TestCase):
    def test_paid_ticket_can_close(self):
        ticket = Ticket("T-1", "F1-A08")
        ticket.mark_paid()
        ticket.close()
        self.assertEqual(ticket.status, TicketStatus.CLOSED)

    def test_active_ticket_cannot_close(self):
        ticket = Ticket("T-2", "F1-A09")
        with self.assertRaises(ValueError):
            ticket.close()

if __name__ == "__main__":
    unittest.main()
`} />
        <P>
          These tests run with Python's standard library after the Ticket types are in the same module or imported. Test
          externally visible outcomes rather than private counters: a refactor should be free to change how IDs are made while
          keeping the ticket lifecycle intact. For the allocator, add a test with two compatible spaces and assert that two
          admissions receive different spaces.
        </P>
      </Part>

      <Part n={7} label="Production boundary" title="Keep Domain Rules, Persistence, and Side Effects Distinct">
        <P>
          A production design usually has an HTTP controller that parses a request, an application service that coordinates
          use cases, domain types that enforce rules, and adapters for a database, clock, and payment provider. That is a
          useful separation, not a command to create four packages for a small exercise. Keep code together until a genuine
          boundary helps testing, ownership, or change.
        </P>
        <Bullets items={[
          'Use a database transaction or atomic conditional update to claim a free space; process-local locks do not coordinate multiple servers.',
          'Use idempotency keys for retryable admission and payment requests, and store the result with the state transition.',
          'Never mark a ticket paid only because a browser says it is; verify the payment provider result server-side.',
          'Record domain events such as TicketIssued and PaymentCaptured for audit and operational debugging.',
          'Treat privacy and retention as design requirements for registration numbers and payment references.',
        ]} />
        <Callout type="example">
          A payment callback can be delivered more than once. Give the callback handler a unique provider event ID, make its
          update idempotent, and avoid issuing a second exit authorization for the same ticket.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Low-Level Design Mistakes">
        <Mistakes items={[
          { mistake: 'Starting with a class diagram before clarifying behavior', cause: 'Names feel concrete, but hidden rules such as space compatibility are still unknown.', fix: 'Write the main use cases, invariants, and extension points first; then assign responsibilities.' },
          { mistake: 'Building one ParkingLotManager that does everything', cause: 'Allocation, billing, persistence, and payment change for different reasons.', fix: 'Split responsibilities around stable domain rules and infrastructure boundaries.' },
          { mistake: 'Using inheritance for every variation', cause: 'A deep vehicle or tariff hierarchy couples unrelated behavior and makes combinations awkward.', fix: 'Prefer composition and small policies when behavior varies independently.' },
          { mistake: 'Treating an in-memory check as concurrency control', cause: 'Two processes can both read a space as free before either writes.', fix: 'Enforce reservation atomically in durable storage and handle conflicts explicitly.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Extend the Parking Lot Without a God Object">
        <Practice
          title="Design and test one complete change"
          tasks={[
            'Add accessible spaces and define which vehicle types may use them without weakening the existing compatibility rule.',
            'Add a payment interface and two test doubles: one succeeds and one fails; define what happens to the ticket on failure.',
            'Make admission idempotent for a client-supplied request key and test that retrying returns the same ticket.',
            'Write a small state-transition table for active, payment-pending, paid, closed, and refunded states; justify each transition.',
            'Sketch the database constraint or transaction that prevents two simultaneous requests from reserving one space.',
          ]}
          hint="Start with the invariant you must preserve, then choose the smallest class or interface that owns it."
        />
        <KeyTakeaways items={[
          'Low-level design translates clarified behaviors and invariants into cohesive responsibilities.',
          'Keep domain rules close to the state they protect; coordinate multi-object workflows in an application service.',
          'Apply SOLID as a way to control change, not as a requirement to add interfaces everywhere.',
          'Use Strategy, State, Factory, or Repository only when they remove real duplication or isolate a meaningful boundary.',
          'A local data structure cannot guarantee cross-process concurrency; durable atomic operations must enforce reservations.',
          'Test public behavior and invalid transitions, and keep side effects behind adapters.',
        ]} />
      </Part>

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/design-url-shortener"
        label="Lesson 12 · Case Study — Design a URL Shortener"
        text="You can now model the internals of one service. Next, apply system-design reasoning end to end: clarify requirements, estimate scale, define the API and data model, and defend the trade-offs in a URL shortener."
      />
    </LearnLayout>
  )
}
