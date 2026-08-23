import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Constructors, Instance vs Class Attributes — Python | Chaduvuko',
  description:
    'Constructor validation and defaults, the critical difference between instance and class attributes, the mutable-default-class-attribute trap, attribute lookup order, and __dict__.',
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

export default function ConstructorsAttributes() {
  return (
    <LearnLayout
      title="Constructors, Instance vs Class Attributes"
      description="Constructor validation and defaults, the critical difference between instance and class attributes, the mutable-default-class-attribute trap, attribute lookup order, and __dict__."
      section="Python — Module 20"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Constructors, Revisited" />
        <SectionTitle>__init__ With Default Values and Real Validation</SectionTitle>

        <Para>
          Module 19 introduced <code>__init__</code> as the method that sets up an object&apos;s
          starting state. In real code, a constructor rarely just assigns parameters straight through —
          it usually needs to supply sensible defaults for optional data, and reject clearly invalid
          input before the object is ever allowed to exist in a broken state.
        </Para>

        <CodeBox label="Default parameter values in a constructor — exactly like a regular function">{`class Employee:
    def __init__(self, name, salary, department="Unassigned"):
        self.name = name
        self.salary = salary
        self.department = department

alice = Employee("Alice", 95000)
bob = Employee("Bob", 88000, "Engineering")

print(alice.department)   # "Unassigned"
print(bob.department)      # "Engineering"`}</CodeBox>

        <Para>
          Default parameter values in <code>__init__</code> follow the exact same rules covered in the
          Functions module — they are evaluated once, and mutable defaults are dangerous for reasons
          that will matter enormously in Part 03 below, once the discussion shifts from parameter
          defaults to class attribute defaults.
        </Para>

        <SubTitle>Validating input inside the constructor</SubTitle>

        <Para>
          Because <code>__init__</code> is the one guaranteed gatekeeper every instance passes through
          on the way into existence, it is the natural place to reject data that would leave the object
          in an invalid state. Raising an exception from inside <code>__init__</code> is completely
          normal — it simply means the object is never created at all.
        </Para>

        <CodeBox label="Validating inside __init__ — the object refuses to be created if invalid">{`class Employee:
    def __init__(self, name, salary, department="Unassigned"):
        if salary < 0:
            raise ValueError(f"Salary cannot be negative: {salary}")
        if not name.strip():
            raise ValueError("Employee name cannot be empty")

        self.name = name
        self.salary = salary
        self.department = department

Employee("", 50000)
# ValueError: Employee name cannot be empty
# Note: no Employee object was ever created — the exception happens before self.name is even set`}</CodeBox>

        <Callout type="tip">
          Validating inside <code>__init__</code> means invalid objects simply cannot exist in your
          program — every piece of code that later receives an <code>Employee</code> instance can trust
          that its <code>salary</code> is non-negative and its <code>name</code> is non-empty, without
          re-checking. This is a small, concrete example of an "invariant," the same concept introduced
          in Module 19&apos;s discussion of when a class earns its complexity.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Instance vs Class Attributes" />
        <SectionTitle>The Critical Distinction: Where Does the Data Actually Live?</SectionTitle>

        <Para>
          Every attribute you have seen so far — set with <code>self.attribute = value</code> — is an{' '}
          <strong>instance attribute</strong>: it lives on the individual object, and every instance
          gets its own separate copy. Python also supports <strong>class attributes</strong>: values
          assigned directly inside the class body, not inside a method, that are <strong>shared by
          every instance of the class</strong> until an individual instance overrides them.
        </Para>

        <CodeBox label="A class attribute, shared by every instance">{`class Employee:
    company_name = "Northwind Traders"   # CLASS attribute — one copy, shared by all instances

    def __init__(self, name, salary):
        self.name = name                  # INSTANCE attribute — separate copy per instance
        self.salary = salary              # INSTANCE attribute — separate copy per instance

alice = Employee("Alice", 95000)
bob = Employee("Bob", 88000)

print(alice.company_name)   # "Northwind Traders"
print(bob.company_name)      # "Northwind Traders" — the SAME string object, shared`}</CodeBox>

        <Para>
          Class attributes are genuinely useful for data that really is the same across every instance
          — a company name shared by every <code>Employee</code>, a species name shared by every dog in
          Module 19&apos;s example, or a constant like a tax rate. The moment you assign to that
          attribute through a specific instance, though, something subtle happens that trips up almost
          every engineer the first time they encounter it.
        </Para>

        <CodeBox label="Assigning through an instance creates a NEW instance attribute — it does not change the class attribute">{`alice.company_name = "Acme Corp"   # this does NOT change the shared class attribute

print(alice.company_name)    # "Acme Corp" — alice now has her own instance attribute
print(bob.company_name)       # "Northwind Traders" — completely unaffected
print(Employee.company_name)  # "Northwind Traders" — the class attribute itself never changed`}</CodeBox>

        <Para>
          <code>alice.company_name = "Acme Corp"</code> does not reach into the class and modify the
          shared value — it creates a brand new instance attribute on <code>alice</code> specifically,
          which simply shadows the class attribute of the same name whenever you access it through{' '}
          <code>alice</code>. The class attribute itself, and every other instance that has not been
          individually overridden, is completely untouched.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Mutable Default Trap" />
        <SectionTitle>The Single Most Famous Gotcha in Python OOP</SectionTitle>

        <Para>
          Everything in Part 02 was relatively harmless when the shared class attribute was an
          immutable value like a string. It becomes a genuine, production-breaking bug the moment the
          class attribute is a <strong>mutable</strong> object — most commonly a list or a dict —
          because mutating it does not create a new instance attribute the way reassigning it does.
          Mutating reaches into the one shared object directly, and every instance sees the change.
        </Para>

        <CodeBox label="The broken version — a genuinely famous Python mistake">{`class ShoppingCart:
    items = []   # LOOKS like a fresh empty list per cart. It is NOT.

    def __init__(self, owner):
        self.owner = owner

    def add_item(self, item):
        self.items.append(item)   # .append() MUTATES the shared list — it doesn't reassign it


alice_cart = ShoppingCart("Alice")
bob_cart = ShoppingCart("Bob")

alice_cart.add_item("Laptop")

print(alice_cart.items)   # ['Laptop']
print(bob_cart.items)      # ['Laptop'] — Bob's cart has Alice's laptop in it! Same shared list.`}</CodeBox>

        <Para>
          This is the exact same underlying trap as the mutable default argument gotcha from the
          Functions module, wearing a different costume. <code>items = []</code> at the class level
          runs <strong>exactly once</strong>, when the class itself is defined — not once per instance.
          Every <code>ShoppingCart</code> object that does not explicitly get its own{' '}
          <code>self.items</code> is reading and mutating that single, shared list. Because{' '}
          <code>self.items.append(...)</code> mutates the object in place rather than reassigning{' '}
          <code>self.items</code> to something new, Part 02&apos;s "assigning through an instance
          creates a new instance attribute" escape hatch never kicks in — there is no reassignment
          happening at all, just mutation of the one object every instance is still pointing at.
        </Para>

        <SubTitle>The fix — always create mutable attributes inside __init__</SubTitle>

        <CodeBox label="The fix — one fresh list per instance, created inside __init__">{`class ShoppingCart:
    def __init__(self, owner):
        self.owner = owner
        self.items = []   # created fresh, INSIDE __init__ — a genuinely new list for every instance

    def add_item(self, item):
        self.items.append(item)


alice_cart = ShoppingCart("Alice")
bob_cart = ShoppingCart("Bob")

alice_cart.add_item("Laptop")

print(alice_cart.items)   # ['Laptop']
print(bob_cart.items)      # [] — correctly empty, independent of alice's cart`}</CodeBox>

        <Callout type="warning">
          <strong>The rule to memorize:</strong> Never assign a mutable value (a list, dict, set, or any
          custom mutable object) as a class attribute if you intend for each instance to have its own
          independent copy. Create mutable instance state inside <code>__init__</code>, assigned to{' '}
          <code>self</code>, every time. Class attributes should be reserved for values that are
          genuinely, deliberately meant to be shared and identical across every instance — or for
          immutable defaults, which are safe precisely because mutating them is impossible; any change
          necessarily creates a new object and a new instance attribute instead.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Attribute Lookup Order" />
        <SectionTitle>How Python Actually Finds x.attribute</SectionTitle>

        <Para>
          Understanding why the mutable default trap happens — and why Part 02&apos;s "shadowing"
          behavior works the way it does — requires knowing the actual lookup rule Python follows when
          you write <code>instance.attribute</code>. Python checks the <strong>instance&apos;s own
          attributes first</strong>. Only if the instance does not have that attribute does it fall back
          to checking the <strong>class</strong> (and, once inheritance is introduced in Module 21, the
          class&apos;s parent classes, in a defined order).
        </Para>

        <CodeBox label="The lookup order, made visible">{`class Employee:
    company_name = "Northwind Traders"

    def __init__(self, name):
        self.name = name

alice = Employee("Alice")

print(alice.company_name)
# 1. Python checks: does the "alice" INSTANCE have an attribute called company_name? No.
# 2. Python falls back to the EMPLOYEE CLASS: does it have company_name? Yes -> "Northwind Traders"

alice.company_name = "Acme Corp"
print(alice.company_name)
# 1. Python checks: does the "alice" INSTANCE have company_name now? YES (just created it)
# 2. Found on the instance -> stops looking -> "Acme Corp". The class is never even consulted.`}</CodeBox>

        <Para>
          This is exactly why mutating a shared mutable class attribute (Part 03) is dangerous, but
          reassigning a class attribute through an instance (Part 02) is safe: <code>.append()</code>{' '}
          changes the one object the class attribute points to, which every instance still falls back to
          finding via the class. A direct <code>=</code> assignment through an instance, on the other
          hand, creates a brand new instance attribute that the lookup order finds <em>first</em>,
          before it ever needs to fall back to the class at all.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — __dict__" />
        <SectionTitle>__dict__ — Seeing an Object&apos;s Instance Attributes Directly</SectionTitle>

        <Para>
          Every ordinary Python object stores its instance attributes internally in a dictionary,
          accessible directly as <code>__dict__</code>. This is genuinely useful for debugging — a
          quick way to see exactly what state an object is actually holding, without needing to know
          every attribute name in advance.
        </Para>

        <CodeBox label="__dict__ reveals an object's instance attributes">{`class Employee:
    company_name = "Northwind Traders"

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

alice = Employee("Alice", 95000)

print(alice.__dict__)
# {'name': 'Alice', 'salary': 95000}
# Notice company_name is NOT here — it lives on the class, not the instance.

print(Employee.__dict__.keys())
# includes 'company_name', '__init__', and other class-level machinery`}</CodeBox>

        <Para>
          This makes the instance-vs-class distinction completely concrete: <code>alice.__dict__</code>{' '}
          only ever contains what was actually set on <code>alice</code> specifically — proof that{' '}
          <code>company_name</code> genuinely lives elsewhere, on the class, until an instance
          assignment creates its own copy.
        </Para>

        <SubTitle>Deleting attributes with del</SubTitle>

        <Para>
          Just as you can add an instance attribute at any time, you can remove one with{' '}
          <code>del</code>. This removes the attribute from the instance&apos;s own{' '}
          <code>__dict__</code> — if a class attribute of the same name exists, attribute lookup falls
          straight back to it, exactly as described in Part 04.
        </Para>

        <CodeBox label="del removes an instance attribute; the class attribute reappears through lookup">{`alice.company_name = "Acme Corp"    # creates an instance attribute, shadowing the class one
print(alice.company_name)              # "Acme Corp"

del alice.company_name                   # removes ONLY the instance attribute
print(alice.company_name)                 # "Northwind Traders" — falls back to the class attribute

del alice.salary
print(alice.salary)
# AttributeError: 'Employee' object has no attribute 'salary'
# salary has no class-level fallback, so deleting the instance attribute leaves nothing to find`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — When to Genuinely Use Class Attributes" />
        <SectionTitle>Legitimate Uses — Constants, Counters, and Configuration</SectionTitle>

        <Para>
          None of this means class attributes are a mistake to avoid — they are the right tool for
          several genuinely common, safe patterns, as long as you keep Part 03&apos;s rule in mind:
          fine for immutable values, fine for data deliberately meant to be shared, dangerous for
          per-instance mutable state.
        </Para>

        <CodeBox label="Legitimate class attribute patterns">{`class TaxCalculator:
    TAX_RATE = 0.0825   # a genuine constant, shared and immutable — perfectly safe

    def __init__(self, subtotal):
        self.subtotal = subtotal

    def total(self):
        return self.subtotal * (1 + TaxCalculator.TAX_RATE)


class User:
    _next_id = 1000   # a shared counter, deliberately meant to be tracked across ALL instances

    def __init__(self, name):
        self.name = name
        self.id = User._next_id
        User._next_id += 1   # this REBINDS the class attribute itself, not through an instance

alice = User("Alice")
bob = User("Bob")
print(alice.id, bob.id)   # 1000 1001 — a working shared auto-incrementing ID`}</CodeBox>

        <Para>
          Notice the counter example rebinds <code>User._next_id</code> explicitly through the class
          name, not through <code>self</code> — writing <code>self._next_id += 1</code> instead would
          fall into exactly the Part 02 trap: it would read the shared value once (via fallback lookup)
          but then create a new, separate instance attribute on that one object instead of actually
          incrementing the shared counter for everyone. Updating a genuinely shared class attribute
          correctly means updating it through the class name, not through an instance.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>An Austin Ed-Tech Startup&apos;s Quiz Bug — Every Student Shared One Answer List</SectionTitle>

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
            Scenario — Ed-tech startup, Austin · Production incident
          </div>

          <Para>
            An ed-tech startup building an online quiz platform shipped a <code>QuizAttempt</code> class
            representing one student&apos;s attempt at one quiz. A few days after launch, support
            tickets started arriving: students reported seeing <em>other students&apos; answers</em>{' '}
            already filled in when they opened a brand new quiz attempt.
          </Para>

          <CodeBox label="The buggy class, shipped to production">{`class QuizAttempt:
    answers = []   # intended: "every attempt starts with an empty answers list"

    def __init__(self, student_id, quiz_id):
        self.student_id = student_id
        self.quiz_id = quiz_id

    def submit_answer(self, question_id, answer):
        self.answers.append({"question_id": question_id, "answer": answer})`}</CodeBox>

          <SubSubTitle>What the on-call engineer found</SubSubTitle>

          <Para>
            Exactly the Part 03 trap. <code>answers = []</code> at the class level created one list,
            once, when the class was first loaded — every single <code>QuizAttempt</code> instance,
            for every student, for every quiz, was reading and appending to that same shared list. A
            student halfway through a quiz was seeing every other student&apos;s in-progress answers,
            appended in whatever order the calls happened to arrive across the whole platform.
          </Para>

          <SubSubTitle>The fix, and why it survived code review the first time</SubSubTitle>

          <Para>
            The original pull request had actually passed review — the reviewer skimmed{' '}
            <code>answers = []</code> and read it as "each attempt gets an empty list," which is exactly
            the intuitive but wrong reading Part 03 warns about. The fix was a one-line move: relocating{' '}
            <code>self.answers = []</code> inside <code>__init__</code>, exactly as shown in Part 03&apos;s
            corrected <code>ShoppingCart</code>. The team also added a lightweight lint rule flagging any
            mutable literal (<code>[]</code>, <code>{}</code>, <code>set()</code>) assigned directly in a
            class body outside a method, specifically to catch this pattern automatically before it could
            reach production again.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Attributes</SectionTitle>

        {[
          {
            wrong: '"Assigning a value in the class body, like items = [], gives every instance its own list"',
            right: 'It creates exactly one list, shared by every instance until an instance explicitly reassigns (not mutates) that attribute. Mutating it with .append() changes the one shared object for everyone, which is exactly the trap covered in Part 03. Mutable per-instance state belongs inside __init__, assigned to self.',
          },
          {
            wrong: '"self.company_name = "Acme" changes the shared class attribute for every instance"',
            right: 'It does the opposite — it creates a brand new instance attribute on that one object, which shadows the class attribute only for that instance. Every other instance, and the class attribute itself, is completely unaffected, exactly as shown in Part 02.',
          },
          {
            wrong: '"Class attributes and instance attributes are basically interchangeable — it\'s just a style choice"',
            right: 'They behave fundamentally differently for mutable values. Immutable class attributes (strings, numbers, tuples) are safe to share because any \"change\" through an instance actually creates a new instance attribute instead. Mutable class attributes (lists, dicts, sets) are genuinely shared and mutating them from one instance affects every instance — a real, common source of production bugs, not a stylistic detail.',
          },
          {
            wrong: '"__dict__ shows all of an object\'s attributes, including inherited class attributes"',
            right: 'obj.__dict__ shows only the attributes actually stored on that specific instance. Class attributes live in the class\'s own __dict__ (Employee.__dict__), and are only reached through fallback attribute lookup, as covered in Part 04 — they never appear in an instance\'s own __dict__ unless that instance has explicitly been assigned its own copy.',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between an instance attribute and a class attribute?',
            a: 'An instance attribute is set with self.attribute = value, typically inside __init__, and every instance has its own separate copy. A class attribute is assigned directly in the class body, outside any method, and is shared by every instance until a specific instance is given its own attribute of the same name, which shadows the class attribute for that instance only.',
          },
          {
            q: 'Explain the mutable class attribute trap and how to fix it.',
            a: 'If a class attribute is a mutable object like a list (items = [] in the class body), every instance shares that exact same list. Calling .append() on it through any instance mutates the one shared object, so the change is visible through every other instance too — since mutation, unlike reassignment, does not create a new instance attribute. The fix is to create the mutable attribute inside __init__ instead (self.items = []), which genuinely gives every instance its own independent object.',
          },
          {
            q: 'What is the attribute lookup order in Python when you access obj.attribute?',
            a: 'Python checks the instance\'s own __dict__ first. If the attribute is not found there, it falls back to the class (and, with inheritance, up the class\'s method resolution order). The first match found wins, and Python stops looking — which is exactly why creating an instance attribute of the same name as a class attribute shadows it, since the instance is checked first.',
          },
          {
            q: 'What does __dict__ show for an object, and what does it not show?',
            a: '__dict__ on an instance shows only the attributes actually stored on that instance — the ones set via self.attribute = value on that particular object. It does not include class attributes, which live in the class\'s own __dict__ and are only found via fallback attribute lookup, not stored directly on each instance.',
          },
          {
            q: 'When is it appropriate to use a class attribute rather than an instance attribute?',
            a: 'When the value is genuinely meant to be identical and shared across every instance — a true constant like a tax rate, or deliberately shared mutable state like an auto-incrementing ID counter, updated explicitly through the class name (ClassName.counter += 1) rather than through self. For any state that should be independent per instance, especially if it is mutable, it belongs inside __init__ as an instance attribute instead.',
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
        <SectionTitle>Attribute Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Declaring a mutable default as a class attribute, expecting each instance to get its own copy',
            a: 'items = [] in the class body creates exactly one shared list. As covered in Part 03, this is the single most famous OOP gotcha in Python — always initialize mutable instance state inside __init__ with self.attribute = [].',
          },
          {
            q: 'Trying to update a shared class attribute through self, expecting it to update for everyone',
            a: 'self.counter += 1 reads the class attribute via fallback lookup once, then creates a brand new instance attribute — it does not increment the shared value. To genuinely update a shared class attribute, reference it through the class name explicitly: ClassName.counter += 1.',
          },
          {
            q: 'Not validating constructor input, letting invalid objects come into existence',
            a: 'Skipping validation in __init__ means invalid state (a negative salary, an empty required name) can silently exist anywhere in the program. Validate and raise inside __init__ so the object simply cannot be created in a broken state.',
          },
          {
            q: 'Assuming __dict__ includes class attributes',
            a: 'instance.__dict__ only shows what has actually been set on that specific instance. A class attribute that has never been individually overridden will not appear there — check ClassName.__dict__ (or just access it via the instance, relying on attribute lookup) to see it.',
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
        <SectionTitle>Errors You Will Hit With Constructors and Attributes — And Exactly Why</SectionTitle>

        {[
          {
            error: `AttributeError: 'Employee' object has no attribute 'salary'`,
            cause: 'The instance attribute was deleted with del, or was never set in the first place because __init__ has a code path (before an early raise, or a conditional) that skips assigning it.',
            fix: 'Make sure every attribute the object will ever need is assigned unconditionally inside __init__, ideally near the top, before any validation logic that might raise.',
          },
          {
            error: `ValueError: Salary cannot be negative: -5000`,
            cause: 'This is a deliberate, custom validation error raised from inside __init__ — the object was never created because the input failed a business rule check.',
            fix: 'This is working as intended. Fix the calling code to pass valid data, or catch and handle the exception explicitly if invalid input is an expected possibility at that call site.',
          },
          {
            error: `A bug where mutating one object\\u2019s list attribute silently affects unrelated objects`,
            cause: 'The attribute being mutated is actually a class attribute (a mutable default declared directly in the class body), shared by every instance, rather than an instance attribute created fresh inside __init__.',
            fix: 'Move the mutable attribute\\u2019s creation inside __init__, assigned via self.attribute = [] (or {} / set()), so each instance gets its own independent object.',
          },
          {
            error: `TypeError: unsupported operand type(s) for +=: 'int' and 'NoneType'`,
            cause: 'A class attribute intended as a shared counter or accumulator was never initialized, or was set to None by mistake, before code tries to increment it.',
            fix: 'Give the class attribute an explicit starting numeric value (e.g. _next_id = 1000) at the point it is declared in the class body, not left implicit or set later.',
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
        'Validate input inside __init__ and raise on invalid data — it is the one guaranteed gatekeeper every instance passes through, so invalid objects simply cannot come into existence.',
        'Instance attributes (self.attribute) live on each object separately. Class attributes (assigned in the class body) are shared by every instance until an instance is given its own attribute of the same name.',
        'Assigning through an instance (alice.x = value) creates a new instance attribute — it never modifies the shared class attribute.',
        'Mutating a shared mutable class attribute (like .append() on a class-level list) DOES affect every instance, because no reassignment happens — this is the single most famous OOP gotcha in Python.',
        'Always create mutable instance state inside __init__ with self.attribute = [] (or {} / set()), never as a mutable class attribute, unless the sharing is genuinely intentional.',
        'Attribute lookup checks the instance first, then falls back to the class — this is exactly why shadowing and the mutable default trap behave the way they do.',
        'obj.__dict__ shows only what is actually stored on that instance; class attributes live separately in the class\'s own __dict__.',
        'del obj.attribute removes an instance attribute; if a class attribute of the same name exists, lookup falls back to it automatically afterward.',
        'To genuinely update a shared class attribute (like an auto-incrementing counter), reference it through the class name explicitly, not through self.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 21 builds one class on top of another — inheritance, method overriding, polymorphism,
          and the real, practical difference between "is-a" and "has-a" relationships in your code.
        </p>
        <Link href="/learn/python/inheritance-polymorphism" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 21 → Inheritance and Polymorphism
        </Link>
      </div>
    </LearnLayout>
  )
}
