import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Inheritance and Polymorphism — Python | Chaduvuko',
  description:
    'Single inheritance, super(), method overriding, real polymorphism, the method resolution order, isinstance vs type ==, and composition over inheritance.',
}

const C = '#f97316'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

export default function InheritancePolymorphism() {
  return (
    <LearnLayout
      title="Inheritance and Polymorphism"
      description="Single inheritance, super(), method overriding, real polymorphism, the method resolution order, isinstance vs type ==, and composition over inheritance."
      section="Python — Module 21"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Inheritance Actually Buys You" />
        <SectionTitle>Building One Class on Top of Another</SectionTitle>

        <Para>
          By the end of Module 20 you can build a self-contained class with its own attributes and
          behavior. Real systems, though, are full of things that are variations on a theme —
          different kinds of employees, different kinds of payments, different kinds of shapes — that
          share a large amount of common structure and behavior, but differ in specific, well-defined
          ways. <strong>Inheritance</strong> lets one class (a <strong>subclass</strong>, or{' '}
          <strong>child class</strong>) automatically receive all the attributes and methods of another
          class (a <strong>superclass</strong>, <strong>base class</strong>, or <strong>parent
          class</strong>), and then add or override only what actually differs.
        </Para>

        <CodeBox label="Single inheritance — the basic syntax">{`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def describe(self):
        return f"{self.name} earns \${self.salary}"


class Manager(Employee):        # Manager inherits from Employee
    pass


alice = Manager("Alice", 110000)
print(alice.describe())          # "Alice earns $110000" — inherited, unmodified, from Employee
print(isinstance(alice, Employee))  # True — a Manager IS an Employee`}</CodeBox>

        <Para>
          Even with an empty body (<code>pass</code>), <code>Manager</code> already has everything{' '}
          <code>Employee</code> has — the entire point of inheritance is not writing that behavior a
          second time. The relationship inheritance expresses is often called an{' '}
          <strong>"is-a" relationship</strong>: a Manager <em>is an</em> Employee, with some additional
          specifics. This phrase will matter directly in Part 06, when it is contrasted with a
          different, equally important relationship: "has-a."
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — super().__init__()" />
        <SectionTitle>super() — Reaching Back Into the Parent Class</SectionTitle>

        <Para>
          A subclass almost always needs its own additional data on top of what the parent already
          sets up — a <code>Manager</code> needs a list of direct reports; an <code>Employee</code>{' '}
          alone does not. This means the subclass typically needs its own <code>__init__</code>. Simply
          redefining <code>__init__</code> from scratch would mean re-writing the parent&apos;s setup
          logic all over again — exactly the duplication inheritance exists to avoid.{' '}
          <code>super()</code> gives you a handle on the parent class so you can call its methods,
          most commonly its <code>__init__</code>, and let it do its own setup first.
        </Para>

        <CodeBox label="super().__init__() — letting the parent do its own setup">{`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary


class Manager(Employee):
    def __init__(self, name, salary, direct_reports):
        super().__init__(name, salary)   # Employee.__init__ runs first, sets name and salary
        self.direct_reports = direct_reports   # Manager adds its own extra attribute

alice = Manager("Alice", 110000, ["Bob", "Carla"])
print(alice.name, alice.salary, alice.direct_reports)
# Alice 110000 ['Bob', 'Carla']`}</CodeBox>

        <Para>
          <code>super().__init__(name, salary)</code> is exactly equivalent in effect to writing{' '}
          <code>self.name = name</code> and <code>self.salary = salary</code> directly inside{' '}
          <code>Manager.__init__</code> — but written this way, if <code>Employee.__init__</code> ever
          changes (say, a validation rule is added, exactly like Module 20&apos;s salary check),{' '}
          <code>Manager</code> automatically picks up that change for free, with zero edits needed in{' '}
          <code>Manager</code> itself.
        </Para>

        <Callout type="warning">
          <strong>Almost always call super().__init__() as the first line of a subclass&apos;s
          __init__.</strong> If you skip it, the parent class&apos;s setup logic simply never runs —
          attributes the parent normally sets up will not exist on your subclass instance, leading to
          confusing <code>AttributeError</code>s later, often far away from where the actual mistake
          was made.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Method Overriding" />
        <SectionTitle>Redefining a Method to Change Its Behavior in a Subclass</SectionTitle>

        <Para>
          A subclass can redefine any method it inherits, simply by defining a method of the same name.
          This is called <strong>overriding</strong>. The subclass&apos;s version takes priority
          whenever the method is called on an instance of that subclass — the parent&apos;s original
          version is not deleted, it is just no longer what gets found first.
        </Para>

        <CodeBox label="Overriding a method entirely">{`class Employee:
    def describe(self):
        return f"{self.name} earns \${self.salary}"


class Manager(Employee):
    def __init__(self, name, salary, direct_reports):
        super().__init__(name, salary)
        self.direct_reports = direct_reports

    def describe(self):   # OVERRIDES Employee.describe entirely
        return f"{self.name} manages {len(self.direct_reports)} people and earns \${self.salary}"


alice = Manager("Alice", 110000, ["Bob", "Carla"])
print(alice.describe())
# "Alice manages 2 people and earns $110000" — the Manager version runs, not Employee's`}</CodeBox>

        <Para>
          A common, safer variant extends the parent&apos;s behavior rather than replacing it entirely
          — calling <code>super().method_name()</code> from inside the override to reuse the
          parent&apos;s logic, then adding to it, exactly the same idea as{' '}
          <code>super().__init__()</code> but applied to any method, not just the constructor.
        </Para>

        <CodeBox label="Extending, rather than replacing, the parent's behavior">{`class Manager(Employee):
    def describe(self):
        base = super().describe()          # reuse Employee's version
        return f"{base} and manages {len(self.direct_reports)} people"

alice = Manager("Alice", 110000, ["Bob", "Carla"])
print(alice.describe())
# "Alice earns $110000 and manages 2 people"`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Polymorphism, With a Real Example" />
        <SectionTitle>Same Method Name, Different Behavior Per Subclass</SectionTitle>

        <Para>
          Polymorphism ("many forms") is the ability to call the <strong>same method name</strong> on
          objects of different classes and have each one respond with its own correct, type-specific
          behavior — without the calling code needing to know or care which specific subclass it is
          actually holding. Here is a concrete, realistic example: a fictional fintech in Denver
          processing payments through several different providers, each with genuinely different
          internal logic, but a shared, uniform interface.
        </Para>

        <CodeBox label="Polymorphism — a real payment-processing example">{`class Payment:
    def __init__(self, amount):
        self.amount = amount

    def process(self):
        raise NotImplementedError("Subclasses must implement process()")


class CreditCardPayment(Payment):
    def __init__(self, amount, card_number):
        super().__init__(amount)
        self.card_number = card_number

    def process(self):
        return f"Charging \${self.amount} to card ending in {self.card_number[-4:]}"


class ACHPayment(Payment):
    def __init__(self, amount, routing_number):
        super().__init__(amount)
        self.routing_number = routing_number

    def process(self):
        return f"Initiating ACH transfer of \${self.amount} via routing {self.routing_number}"


class WalletPayment(Payment):
    def __init__(self, amount, wallet_id):
        super().__init__(amount)
        self.wallet_id = wallet_id

    def process(self):
        return f"Deducting \${self.amount} from wallet {self.wallet_id}"`}</CodeBox>

        <Para>
          The real payoff of polymorphism shows up in code that processes a batch of mixed payment
          types without ever branching on type — every object simply gets asked to{' '}
          <code>.process()</code> itself, correctly, regardless of which concrete subclass it actually
          is:
        </Para>

        <CodeBox label="Calling .process() uniformly across different subclasses — no type-checking needed">{`payments = [
    CreditCardPayment(49.99, "4111111111111111"),
    ACHPayment(1200.00, "021000021"),
    WalletPayment(15.50, "wallet_882"),
]

for payment in payments:
    print(payment.process())

# Charging $49.99 to card ending in 1111
# Initiating ACH transfer of $1200.0 via routing 021000021
# Deducting $15.5 from wallet wallet_882`}</CodeBox>

        <Para>
          This loop has no <code>if isinstance(payment, CreditCardPayment):</code> branching anywhere
          — it does not need to know or care what kind of payment it is holding. Each object already
          knows how to process itself correctly. This is genuinely the practical value polymorphism
          delivers: adding a new payment type later (say, <code>CryptoPayment</code>) means writing one
          new subclass — the loop above needs zero changes to support it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — MRO and Multiple Inheritance" />
        <SectionTitle>The Method Resolution Order — And Why Multiple Inheritance Deserves Caution</SectionTitle>

        <Para>
          Python supports <strong>multiple inheritance</strong> — a class can inherit from more than
          one parent class at once, by listing several base classes in the class definition. When
          multiple parents could each provide a method of the same name, Python needs a deterministic
          rule for deciding which one wins. That rule is called the{' '}
          <strong>Method Resolution Order</strong> (MRO), and you can inspect it directly on any class.
        </Para>

        <CodeBox label="Multiple inheritance and the MRO">{`class Flyable:
    def move(self):
        return "Flying"

class Swimmable:
    def move(self):
        return "Swimming"

class Duck(Flyable, Swimmable):   # inherits from BOTH
    pass

d = Duck()
print(d.move())          # "Flying" — Flyable is listed first, so it wins
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Flyable'>, <class 'Swimmable'>, <class 'object'>)
# This is the exact left-to-right order Python searches for a method`}</CodeBox>

        <Para>
          Python computes the MRO using an algorithm called C3 linearization, which guarantees a
          consistent, predictable order even in fairly complex inheritance hierarchies. The practical
          rule of thumb: parents listed earlier in <code>class Duck(Flyable, Swimmable):</code> take
          priority when there is a naming conflict.
        </Para>

        <Callout type="warning">
          <strong>An honest opinion:</strong> multiple inheritance is genuinely powerful, but it should
          be used sparingly in real code. As hierarchies grow, tracing exactly which parent a given
          method actually came from gets meaningfully harder, and naming collisions between unrelated
          parent classes become a real source of subtle bugs. The pattern that actually works well in
          practice is <strong>mixins</strong> — small classes that provide one specific, self-contained
          piece of reusable behavior (like a <code>SerializableMixin</code> adding a{' '}
          <code>.to_json()</code> method, or a <code>ComparableMixin</code> adding ordering methods),
          designed from the start to be combined with other classes without depending on shared state
          or stepping on each other&apos;s method names.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — isinstance() vs type() ==" />
        <SectionTitle>Checking an Object&apos;s Type the Correct Way</SectionTitle>

        <Para>
          There are two common ways to check what "kind of thing" an object is, and they behave
          differently once inheritance is in the picture. <code>isinstance(obj, Class)</code> checks
          whether <code>obj</code> is an instance of <code>Class</code> <strong>or any subclass of
          it</strong>. <code>type(obj) == Class</code> checks for an <strong>exact</strong> type match
          only, ignoring the entire inheritance hierarchy.
        </Para>

        <CodeBox label="The difference, made concrete">{`alice = Manager("Alice", 110000, ["Bob"])

print(isinstance(alice, Manager))    # True  — exact type match
print(isinstance(alice, Employee))   # True  — Manager IS an Employee, via inheritance
print(type(alice) == Manager)         # True
print(type(alice) == Employee)         # False — type() == ignores inheritance entirely, even though
                                          # a Manager genuinely is a kind of Employee`}</CodeBox>

        <Para>
          <code>isinstance()</code> is almost always the correct choice, precisely because it respects
          inheritance. A function written to accept "any Employee" should work correctly for a{' '}
          <code>Manager</code>, a <code>Contractor</code>, or any other subclass — that is the entire
          promise of the "is-a" relationship from Part 01. <code>type(obj) == Employee</code> would
          reject a perfectly valid <code>Manager</code> instance simply because it is not{' '}
          <em>exactly</em> the <code>Employee</code> class, breaking polymorphism for no good reason.
        </Para>

        <Callout type="tip">
          <code>isinstance()</code> also accepts a tuple of types, checking whether the object matches
          any of them: <code>isinstance(payment, (CreditCardPayment, ACHPayment))</code>. This is the
          idiomatic way to check "is this one of these several types," rather than chaining multiple{' '}
          <code>or</code> conditions.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Composition Over Inheritance" />
        <SectionTitle>&quot;Favor Composition Over Inheritance&quot; — What This Actually Means</SectionTitle>

        <Para>
          Inheritance models an "is-a" relationship. Many real design problems are actually a "has-a"
          relationship in disguise — and forcing a "has-a" relationship into inheritance produces
          fragile, awkward class hierarchies. <strong>Composition</strong> means building a class by
          <strong> holding an instance of another class as an attribute</strong>, rather than inheriting
          from it, and delegating to it as needed.
        </Para>

        <CodeBox label="Inheritance misused to model a has-a relationship">{`# Awkward: a Car does not genuinely "is-a" Engine — it HAS an engine.
class Engine:
    def start(self):
        return "Engine starting"

class Car(Engine):        # modeling "has-a" as inheritance — a poor fit
    def drive(self):
        return f"{self.start()} — now driving"

# This forces every Car to BE an Engine in the type system, which is semantically wrong,
# and it means Car inherits every Engine method whether or not that makes sense for a car.`}</CodeBox>

        <CodeBox label="The composition fix — a Car HAS an Engine, correctly modeled">{`class Engine:
    def start(self):
        return "Engine starting"

class Car:
    def __init__(self):
        self.engine = Engine()   # Car HOLDS an Engine — composition, not inheritance

    def drive(self):
        return f"{self.engine.start()} — now driving"

my_car = Car()
print(my_car.drive())   # "Engine starting — now driving"
print(isinstance(my_car, Engine))   # False — correctly, a Car is not an Engine`}</CodeBox>

        <Para>
          The composition version is more honest about the actual relationship, and considerably more
          flexible: swapping in an <code>ElectricEngine</code> later means changing one line inside{' '}
          <code>Car.__init__</code>, with zero changes to the type hierarchy. It also avoids a real,
          common problem with deep inheritance chains — a subclass five levels down that has silently
          inherited a dozen methods that make no sense for it, purely as a side effect of the class it
          happened to be built on top of.
        </Para>

        <Callout type="info">
          "Favor composition over inheritance" does not mean inheritance is wrong — Part 04&apos;s{' '}
          <code>Payment</code> hierarchy is a genuinely good use of inheritance, because{' '}
          <code>CreditCardPayment</code> really <em>is a</em> <code>Payment</code>, sharing real,
          meaningful structure and an intentionally uniform interface. The guidance is about defaulting
          to composition when the relationship is genuinely "has-a," and reaching for inheritance
          specifically when the relationship is genuinely "is-a" and you want that shared, substitutable
          interface — exactly the difference this module has now shown from both directions.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Chicago Fintech Adds a Fourth Payment Type in One Pull Request</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Fintech startup, Chicago · Feature launch
          </div>

          <Para>
            A fintech startup built its checkout flow exactly on the pattern from Part 04 — a{' '}
            <code>Payment</code> base class with <code>CreditCardPayment</code>, <code>ACHPayment</code>,
            and <code>WalletPayment</code> subclasses, each with their own <code>.process()</code>{' '}
            implementation. Business development closes a partnership deal requiring support for a
            fourth payment type: Buy-Now-Pay-Later installment plans.
          </Para>

          <SubSubTitle>What the engineer actually had to change</SubSubTitle>

          <Para>
            One new subclass, following the exact same shape as the other three:
          </Para>

          <CodeBox label="Adding a new payment type — zero changes to any existing code">{`class InstallmentPayment(Payment):
    def __init__(self, amount, num_installments):
        super().__init__(amount)
        self.num_installments = num_installments

    def process(self):
        per_installment = self.amount / self.num_installments
        return f"Splitting \${self.amount} into {self.num_installments} payments of \${per_installment:.2f}"`}</CodeBox>

          <Para>
            The checkout loop that calls <code>payment.process()</code> across a mixed batch of payment
            objects — the exact loop from Part 04 — required <strong>zero</strong> code changes. It had
            no branching on payment type to begin with, so a fourth type simply slotted into the existing
            polymorphic call site.
          </Para>

          <SubSubTitle>Why the isinstance() discipline mattered here too</SubSubTitle>

          <Para>
            A separate part of the codebase — the fraud-review queue — had, months earlier, been written
            with a check reading <code>if type(payment) == CreditCardPayment or type(payment) ==
            ACHPayment:</code> to decide which payments needed manual review. Because it used{' '}
            <code>type() ==</code> instead of <code>isinstance()</code>, adding{' '}
            <code>InstallmentPayment</code> silently bypassed fraud review entirely — it matched neither
            exact-type check, and the flawed code treated "not explicitly listed" as "does not need
            review." The fix, once found, was switching to{' '}
            <code>isinstance(payment, RequiresReviewMixin)</code> against a small mixin each risky
            payment type explicitly opted into — a pattern immune to this exact class of bug, since new
            subclasses have to actively declare that they need review rather than being silently excluded
            by an incomplete list of exact-type checks.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Inheritance and Polymorphism</SectionTitle>

        {[
          {
            wrong: '"super().__init__() is optional boilerplate you can skip if the subclass doesn\'t need anything from it"',
            right: 'Skipping it means the parent class\'s setup logic never runs at all — attributes the parent normally sets up simply will not exist on the subclass instance. Unless a subclass genuinely needs none of the parent\'s state, super().__init__() should be the first line of its own __init__.',
          },
          {
            wrong: '"Polymorphism means a method can return different types"',
            right: 'Polymorphism means the SAME method name can be called on objects of different classes, each responding with its own correct, type-specific behavior — as shown with .process() across four different Payment subclasses in Parts 04 and 08. It is about uniform calling code working correctly across different concrete types, not about a single method\'s return type varying.',
          },
          {
            wrong: '"type(obj) == SomeClass is basically the same as isinstance(obj, SomeClass)"',
            right: 'type() == checks for an exact type match only, completely ignoring inheritance. isinstance() also returns True for any subclass. As shown in Part 08, using type() == in place of isinstance() is a real, documented category of production bug — new subclasses get silently excluded from logic that was supposed to apply to them.',
          },
          {
            wrong: '"Multiple inheritance is a core, everyday tool in professional Python code"',
            right: 'It is supported and occasionally useful, but as covered in Part 05, it is used sparingly in practice because tracing method origins and naming collisions across multiple parents gets genuinely harder as hierarchies grow. The pattern that works well is small, focused mixins — not deep, tangled multi-parent hierarchies.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: 'var(--red)',
              marginBottom: 8, fontFamily: 'var(--font-mono)',
            }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What does super().__init__() do, and why is it usually the first line of a subclass\'s __init__?',
            a: 'It calls the parent class\'s __init__, letting it perform its own setup (typically assigning the attributes it is responsible for) before the subclass adds anything specific to itself. Calling it first ensures the parent\'s attributes exist before the subclass\'s own __init__ logic runs, and it means the subclass automatically benefits from any future changes to the parent\'s setup logic without needing to duplicate it.',
          },
          {
            q: 'Explain polymorphism with a concrete example.',
            a: 'Polymorphism is the ability to call the same method name on objects of different classes and have each respond with its own correct behavior, without the calling code needing to know which specific subclass it holds. For example, calling .process() on a list containing CreditCardPayment, ACHPayment, and WalletPayment objects runs each subclass\'s own implementation correctly, in a single uniform loop with no type-checking branches.',
          },
          {
            q: 'What is the difference between isinstance(obj, Class) and type(obj) == Class?',
            a: 'isinstance() returns True if obj is an instance of Class OR any subclass of it, respecting the inheritance hierarchy. type(obj) == Class checks for an exact type match only and ignores inheritance entirely — it returns False for a subclass instance even though that instance genuinely "is-a" Class. isinstance() is almost always the correct choice for type checks in Python.',
          },
          {
            q: 'What is the Method Resolution Order (MRO), and when does it matter?',
            a: 'The MRO is the deterministic, left-to-right order Python uses to search for a method or attribute across a class and all of its parent classes, visible via ClassName.__mro__. It matters specifically with multiple inheritance, where more than one parent could provide a method of the same name — the parent listed earliest in the class definition takes priority.',
          },
          {
            q: 'What does "favor composition over inheritance" mean, and when would you choose composition instead?',
            a: 'It means modeling a "has-a" relationship (a Car has an Engine) by holding an instance of another class as an attribute and delegating to it, rather than modeling it as inheritance (a Car "is-a" Engine), which is usually a poor semantic fit and creates a rigid, hard-to-change type hierarchy. Composition is the right choice whenever the relationship is genuinely "has-a" rather than "is-a" — inheritance remains the right tool when the relationship is genuinely "is-a" and a shared, substitutable interface (as with polymorphism) is actually needed.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Inheritance Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting to call super().__init__() in a subclass constructor',
            a: 'The parent class\'s attributes never get set up, leading to AttributeError later, often at a call site far away from the missing super() call. Make super().__init__() the first line of any subclass __init__ that needs the parent\'s state.',
          },
          {
            q: 'Using type(obj) == Class instead of isinstance() for type checks',
            a: 'As covered in Parts 06 and 08, this silently breaks for subclasses, since type() == ignores inheritance entirely. Use isinstance(), which correctly recognizes subclass instances too.',
          },
          {
            q: 'Reaching for inheritance to model a "has-a" relationship',
            a: 'A Car inheriting from Engine, purely to reuse the start() method, forces a semantically wrong "is-a" relationship into the type system. Model "has-a" relationships with composition — holding an instance of the other class as an attribute — instead.',
          },
          {
            q: 'Building deep, tangled multiple-inheritance hierarchies',
            a: 'As the number of parent classes and inheritance levels grows, tracing which parent a method actually came from, and resolving naming collisions between unrelated parents, becomes genuinely hard to reason about. Prefer small, focused mixins over deep multi-parent chains.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit With Inheritance — And Exactly Why</SectionTitle>

        {[
          {
            error: `AttributeError: 'Manager' object has no attribute 'salary'`,
            cause: 'The subclass\'s __init__ never called super().__init__(), so the parent class\'s attribute-setting logic never ran for this instance.',
            fix: 'Add super().__init__(...) as the first line of the subclass\'s __init__, passing through whatever arguments the parent\'s __init__ requires.',
          },
          {
            error: `NotImplementedError: Subclasses must implement process()`,
            cause: 'A base class method deliberately raises this to signal that subclasses are required to override it, and this specific instance is either the base class itself or a subclass that forgot to provide its own implementation.',
            fix: 'Define the method in the subclass. This is a deliberate design signal, not a bug in the base class — it exists to make a missing override loud instead of silent.',
          },
          {
            error: `TypeError: __init__() missing 1 required positional argument: 'direct_reports'`,
            cause: 'The subclass added a new required parameter to its __init__, but existing calling code is still creating instances with only the parent class\'s original arguments.',
            fix: 'Update the calling code to pass the new required argument, or give it a default value in the subclass\'s __init__ if it should be optional.',
          },
          {
            error: `TypeError: Cannot create a consistent method resolution order (MRO) for bases ...`,
            cause: 'A multiple-inheritance class definition creates a contradictory ordering requirement — most commonly from inheriting the same base class through two different, conflicting paths.',
            fix: 'Simplify the inheritance structure. This is usually a sign the hierarchy has become genuinely too tangled — consider whether composition or a simpler mixin structure would avoid the conflict entirely.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--red)', marginBottom: 12,
              background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px',
              lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Inheritance (class Subclass(Parent):) lets a class receive all of another class\'s attributes and methods, modeling a genuine "is-a" relationship.',
        'super().__init__() lets a subclass reuse the parent\'s setup logic instead of duplicating it — it should almost always be the first line of a subclass\'s own __init__.',
        'Overriding a method (defining a method of the same name in the subclass) replaces the parent\'s version; calling super().method() from inside an override lets you extend rather than fully replace it.',
        'Polymorphism means calling the same method name on objects of different classes and getting each one\'s own correct behavior — calling code never needs to branch on type.',
        'isinstance(obj, Class) respects inheritance (True for subclasses too); type(obj) == Class checks for an exact match only and silently excludes subclasses — isinstance() is almost always the right choice.',
        'The Method Resolution Order (MRO), visible via ClassName.__mro__, is the deterministic order Python searches for methods across multiple inheritance — earlier-listed parents win naming conflicts.',
        'Multiple inheritance is powerful but should be used sparingly; small, focused mixins are the pattern that works well in real codebases.',
        'Favor composition (holding another class as an attribute) over inheritance whenever the relationship is genuinely "has-a" rather than "is-a".',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 22 covers Python&apos;s convention-based privacy, and the dunder methods — __str__,
          __repr__, __eq__, __len__, and operator overloading — that let your own objects behave like
          Python&apos;s built-in types.
        </p>
        <Link href="/learn/python/encapsulation-dunder-methods" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 22 → Encapsulation and Magic/Dunder Methods
        </Link>
      </div>
    </LearnLayout>
  )
}
