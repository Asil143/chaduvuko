import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Classes and Objects — The Basics — Python | Chaduvuko',
  description:
    'What a class actually is, what an object actually is, how self really works under the hood, and when object-oriented Python genuinely earns its complexity.',
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

export default function ClassesObjects() {
  return (
    <LearnLayout
      title="Classes and Objects — The Basics"
      description="What a class actually is, what an object actually is, how self really works under the hood, and when object-oriented Python genuinely earns its complexity."
      section="Python — Module 19"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Welcome to Phase 3" />
        <SectionTitle>Object-Oriented Python Starts Here</SectionTitle>

        <Para>
          Everything in this track up to this point — variables, control flow, strings, lists, dicts,
          and especially functions in Module 07 — was building toward this phase. Object-oriented
          programming is not a separate topic bolted onto Python; it is the natural next step once you
          have functions that operate on data and you start noticing the same clusters of data and
          functions traveling together everywhere in your code. A shopping cart. A user account. A bank
          transaction. Each of those is really a bundle of related data (what it <em>has</em>) plus
          related behavior (what it can <em>do</em>). Phase 3, starting with this module, is about
          learning Python&apos;s tool for expressing that bundle explicitly: the <code>class</code>.
        </Para>

        <Para>
          You have actually been using classes this entire time without necessarily thinking of them
          that way. Every string is an instance of the built-in <code>str</code> class. Every list is
          an instance of <code>list</code>. When you call <code>"hello".upper()</code>, you are calling
          a method defined on the <code>str</code> class, and <code>"hello"</code> is the object that
          method runs against. This module pulls back the curtain on that mechanism and shows you how
          to build your own classes, from scratch, that work the exact same way.
        </Para>

        <Callout type="info">
          Six modules make up this phase: classes and objects (this one), constructors and attributes,
          inheritance and polymorphism, encapsulation and dunder methods, class/static methods and
          properties, and abstract base classes. By the end of Phase 3 you will be able to design real,
          production-shaped Python classes — not just toy examples.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Class vs Object" />
        <SectionTitle>A Class Is a Blueprint. An Object Is What Gets Built From It.</SectionTitle>

        <Para>
          The cleanest mental model: a <strong>class</strong> is a blueprint — it describes what
          something looks like and what it can do, but it is not, itself, a real thing you can use. An{' '}
          <strong>object</strong> (also called an <strong>instance</strong>) is a real, concrete thing
          built from that blueprint. A blueprint for a house is not a house you can live in — it is the
          plan. Every actual house built from that blueprint is a separate, independent instance, each
          with its own address, its own paint color, its own furniture, even though they share the same
          underlying design.
        </Para>

        <CodeBox label="A minimal class — the blueprint">{`class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"`}</CodeBox>

        <Para>
          <code>Dog</code> by itself is just a definition sitting in memory — no dog exists yet. You
          create actual dog objects by <strong>calling</strong> the class, exactly like calling a
          function:
        </Para>

        <CodeBox label="Creating objects (instances) from the class">{`rex = Dog("Rex", "German Shepherd")
bella = Dog("Bella", "Poodle")

print(rex.bark())     # Rex says Woof!
print(bella.bark())   # Bella says Woof!

print(type(rex))      # <class '__main__.Dog'>
print(isinstance(rex, Dog))   # True`}</CodeBox>

        <Para>
          <code>rex</code> and <code>bella</code> are two completely independent objects. Each has its
          own <code>name</code> and <code>breed</code>, stored separately. Changing{' '}
          <code>rex.name</code> has zero effect on <code>bella.name</code> — they just happen to have
          been built from the same blueprint. This independence is the entire point of a class: define
          the shape once, then stamp out as many independent instances as you need.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The class Keyword" />
        <SectionTitle>Anatomy of a Class Definition</SectionTitle>

        <Para>
          A class definition starts with the <code>class</code> keyword, a name (conventionally{' '}
          <code>PascalCase</code>, not <code>snake_case</code> — this is one of the few places Python
          style genuinely differs between variables/functions and classes), and a colon, followed by an
          indented block exactly like a function or an <code>if</code> statement.
        </Para>

        <CodeBox label="The pieces of a class">{`class Dog:                          # PascalCase class name
    species = "Canis familiaris"    # a class attribute (Part 02 of the next module covers this properly)

    def __init__(self, name, breed):   # the constructor — runs automatically when you create an object
        self.name = name                # an instance attribute
        self.breed = breed              # another instance attribute

    def bark(self):                     # a regular method
        return f"{self.name} says Woof!"

    def describe(self):                 # methods can call other methods through self
        return f"{self.name} is a {self.breed}. {self.bark()}"`}</CodeBox>

        <Para>
          Everything indented under <code>class Dog:</code> is part of the class body. Functions
          defined inside that body are called <strong>methods</strong> — they are functions that belong
          to the class and operate on individual instances. The naming convention matters more than it
          might seem: seeing <code>Dog</code>, <code>PaymentProcessor</code>, or{' '}
          <code>OrderValidator</code> in code immediately signals "this is a class" to any experienced
          Python reader, purely from the capitalization, before they even see a <code>class</code>{' '}
          keyword nearby.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — __init__ as the Constructor" />
        <SectionTitle>__init__ Runs Automatically Every Time You Create an Object</SectionTitle>

        <Para>
          <code>__init__</code> (pronounced "dunder init," short for double-underscore init) is a
          special method Python calls automatically the moment you create a new instance of a class. It
          is where you set up whatever state that instance needs to start its life with. It is often
          called "the constructor," though technically Python has a separate, rarely-touched method
          called <code>__new__</code> that does the actual object creation — <code>__init__</code> just
          initializes the object after it already exists. You will not need <code>__new__</code>{' '}
          for ordinary application code, and it is out of scope for this track.
        </Para>

        <CodeBox label="__init__ receives whatever arguments you pass when creating the object">{`class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

rex = Dog("Rex", "German Shepherd")
# Python does roughly this, automatically, behind the scenes:
#   1. Create a new, empty Dog object
#   2. Call Dog.__init__(that_new_object, "Rex", "German Shepherd")
#   3. Bind the name "rex" to the now-initialized object`}</CodeBox>

        <Para>
          Nothing forces you to define <code>__init__</code>. A class with no <code>__init__</code> is
          completely valid — you simply get an object with no instance attributes set up automatically.
          In practice, though, almost every real class you write will have one, because almost every
          real object needs some starting state.
        </Para>

        <Callout type="tip">
          <strong>__init__ never returns a value.</strong> It is not allowed to have a{' '}
          <code>return</code> statement with a value (Python raises a <code>TypeError</code> if you try
          to <code>return</code> anything other than <code>None</code> from it). Its entire job is to
          set up <code>self</code> — the object being created — not to produce a result the way a
          normal function does.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — self, Explained Properly" />
        <SectionTitle>Why self Is Explicit in Python — The Actual Mechanism</SectionTitle>

        <Para>
          If you have touched Java, C#, or JavaScript, you have seen <code>this</code> — a keyword
          that refers to the current object inside a method, but that appears "for free," implicitly,
          without being declared as a parameter. Python does the equivalent job with{' '}
          <code>self</code>, but with one deliberate difference: <strong>self is not magic and it is
          not a keyword</strong>. It is an ordinary parameter, written explicitly as the first parameter
          of every instance method, and Python fills it in for you automatically when you call the
          method through an object.
        </Para>

        <Para>
          Here is the actual mechanism, not just an analogy. A method defined inside a class is, under
          the hood, just a regular function stored on the class. When you write{' '}
          <code>rex.bark()</code>, Python does not magically know which dog you mean — it translates
          that call into <code>Dog.bark(rex)</code>, passing <code>rex</code> in as the first argument.
          The parameter you conventionally name <code>self</code> is simply where that first argument
          lands. You could technically name it anything — <code>self</code> is a universal convention,
          not a rule enforced by the interpreter — but every Python codebase you will ever work in uses{' '}
          <code>self</code>, and deviating from it will draw immediate code review pushback.
        </Para>

        <CodeBox label="Proving self is just the first argument, not magic">{`class Dog:
    def bark(self):
        return f"{self.name} says Woof!"

rex = Dog()
rex.name = "Rex"

rex.bark()          # "Rex says Woof!" — the usual, idiomatic way to call it
Dog.bark(rex)        # "Rex says Woof!" — IDENTICAL call, calling the function on the class directly,
                       # and passing rex in manually as the first argument`}</CodeBox>

        <Para>
          This is why <code>self</code> must be declared explicitly as a parameter in every method
          definition, even though you never pass it explicitly when calling{' '}
          <code>instance.method()</code> — Python&apos;s dot-call syntax (<code>rex.bark()</code>) is
          what quietly inserts <code>rex</code> as the first argument for you. It is genuinely just
          "the object this method was called on," made visible as an ordinary parameter instead of
          hidden behind special-case syntax the way <code>this</code> is in other languages. Once this
          clicks, a huge amount of Python&apos;s object model stops feeling like magic and starts
          feeling like straightforward function calls with one extra, automatically-supplied argument.
        </Para>

        <Callout type="warning">
          <strong>Forgetting self in a method signature is one of the most common beginner errors.</strong>{' '}
          Writing <code>def bark():</code> instead of <code>def bark(self):</code> inside a class will
          raise a <code>TypeError</code> the moment you call it as <code>rex.bark()</code>, because
          Python is still trying to pass <code>rex</code> in as an argument, but the function signature
          has no parameter to receive it. The exact error message is covered in the Error Library at
          the end of this module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Instance Attributes" />
        <SectionTitle>self.attribute — Data That Belongs to One Specific Object</SectionTitle>

        <Para>
          Any attribute you set with <code>self.something = value</code> inside a method becomes an{' '}
          <strong>instance attribute</strong> — data that lives on that one specific object, completely
          separate from every other instance of the same class. You are not limited to setting instance
          attributes inside <code>__init__</code>, though that is by far the most common and most
          readable place to do it, since it means every attribute the object will ever have is visible
          in one place, right where the object is created.
        </Para>

        <CodeBox label="Instance attributes are independent per object">{`class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
        self.tricks = []          # every dog starts with its own empty list

    def learn_trick(self, trick):
        self.tricks.append(trick)

rex = Dog("Rex", "German Shepherd")
bella = Dog("Bella", "Poodle")

rex.learn_trick("sit")
rex.learn_trick("roll over")

print(rex.tricks)      # ['sit', 'roll over']
print(bella.tricks)     # [] — completely unaffected by what happened to rex`}</CodeBox>

        <Para>
          You can also read and write instance attributes directly from outside the class, using dot
          notation on the object — <code>rex.name</code>, <code>rex.tricks</code>. Nothing in plain
          Python prevents this by default (that is exactly the subject of encapsulation, Module 22,
          later in this phase). For now, treat instance attributes as an object&apos;s own private
          notebook of facts about itself.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Calling Methods and Multiple Instances" />
        <SectionTitle>Methods Reading and Changing an Object&apos;s Own State</SectionTitle>

        <Para>
          A method is genuinely useful once it does more than just read <code>self</code> — it can{' '}
          <em>change</em> the object&apos;s state, and that change persists on the object for as long
          as it exists. This is the core value proposition of a class: bundling data with the behavior
          that knows how to change that data correctly, instead of scattering both across loose
          variables and standalone functions.
        </Para>

        <CodeBox label="A slightly more realistic example — a BankAccount">{`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError(f"Insufficient funds: balance is {self.balance}")
        self.balance -= amount

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"


alice_account = BankAccount("Alice", 500)
bob_account = BankAccount("Bob", 100)

alice_account.deposit(250)
bob_account.withdraw(50)

print(alice_account)   # BankAccount(owner='Alice', balance=750)
print(bob_account)      # BankAccount(owner='Bob', balance=50)`}</CodeBox>

        <Para>
          Notice each account genuinely manages its own balance — <code>deposit()</code> and{' '}
          <code>withdraw()</code> can never accidentally touch the wrong account, because every call is
          scoped to the specific object it was called on (<code>alice_account.deposit(...)</code> only
          ever touches <code>alice_account</code>). Creating a hundred more accounts costs nothing
          conceptually — each is independent, automatically, just by virtue of being a separate object.
          This is what "instance" really buys you: as many independent, self-consistent copies of the
          blueprint as your program needs, each safely isolated from the others.
        </Para>

        <Callout type="info">
          <code>__repr__</code> above is a small preview of dunder methods, covered properly in Module
          22. For now, just know it is why <code>print(alice_account)</code> shows a readable summary
          instead of Python&apos;s default, fairly useless{' '}
          <code>&lt;__main__.BankAccount object at 0x7f...&gt;</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Class vs Simpler Alternatives" />
        <SectionTitle>When OOP Genuinely Earns Its Complexity — An Honest Take</SectionTitle>

        <Para>
          A class is not automatically the right tool just because Python has one available. Reaching
          for a full class when a simpler structure would do is a real, common source of unnecessary
          complexity in junior engineers&apos; code — and this track will not pretend otherwise just
          because it is teaching OOP right now. It is worth being honest about when a class earns its
          keep and when it does not.
        </Para>

        <SubTitle>When a dict or namedtuple is genuinely the better choice</SubTitle>

        <Para>
          If you just need to group a few related values together with no behavior attached — no
          methods, no validation, no invariants to protect — a plain <code>dict</code> or a{' '}
          <code>collections.namedtuple</code> (or, once you reach later modules, a{' '}
          <code>dataclass</code>) is simpler, requires less boilerplate, and is exactly as readable.
        </Para>

        <CodeBox label="Overkill: a class with no real behavior">{`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)

# This is genuinely simpler and does the same job:
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)   # 3 4`}</CodeBox>

        <SubTitle>When a class genuinely earns its complexity</SubTitle>

        <Para>
          A class starts paying for itself the moment you need <strong>behavior tied to data</strong>{' '}
          (methods that operate on the object&apos;s own state, like <code>deposit()</code> above),{' '}
          <strong>invariants to protect</strong> (rules that must always hold true, like a balance that
          can never legally go negative), or <strong>multiple related pieces of state that change
          together</strong> over the object&apos;s lifetime. The <code>BankAccount</code> example above
          is a genuine case for a class: a dict version of the same thing would let any code accidentally
          set <code>account["balance"] = -500</code> directly, bypassing the validation entirely, since
          a plain dict has no way to enforce a rule about how its own values are allowed to change.
        </Para>

        <Callout type="tip">
          A useful rule of thumb: if you find yourself passing the same dict around to five different
          functions that all read and modify specific keys in it, and there are rules about how those
          keys are allowed to relate to each other, that is usually a strong signal the dict wants to
          become a class. If you are just bundling two or three unrelated read-only values with zero
          behavior, a dict, namedtuple, or dataclass is almost always the better, simpler choice.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Denver Ride-Share Startup Rewrites Its Trip-Tracking Dict</SectionTitle>

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
            Scenario — Ride-share startup, Denver · Codebase refactor
          </div>

          <Para>
            A ride-share startup&apos;s early prototype tracked every active trip as a plain dictionary
            passed between functions — <code>start_trip()</code>, <code>update_location()</code>,{' '}
            <code>end_trip()</code>, each one reaching in and reading or mutating specific keys.
          </Para>

          <CodeBox label="The original prototype — dicts everywhere">{`def start_trip(driver_id, rider_id, pickup):
    return {
        "driver_id": driver_id,
        "rider_id": rider_id,
        "pickup": pickup,
        "status": "in_progress",
        "fare": 0,
    }

def update_location(trip, new_location):
    trip["current_location"] = new_location
    trip["fare"] += 0.50   # every update tacks on distance-based fare

def end_trip(trip):
    trip["status"] = "completed"
    return trip["fare"]`}</CodeBox>

          <SubSubTitle>What went wrong as the codebase grew</SubSubTitle>

          <Para>
            Within a few months, a bug landed in production: some code path called{' '}
            <code>update_location()</code> on a trip <em>after</em> it had already been ended, silently
            adding fare to a trip that should have been closed. Nothing in a plain dict enforced that a
            completed trip could not still be modified — every function trusted every caller to behave
            correctly, and eventually one did not.
          </Para>

          <SubSubTitle>The fix — exactly what Part 08 describes</SubSubTitle>

          <Para>
            The team rewrote <code>Trip</code> as a real class. <code>update_location()</code> became a
            method that could check <code>self.status</code> before doing anything, and raise if the
            trip was already completed — an invariant a dict has no mechanism to protect, but a class
            with real methods enforces automatically, every single time, regardless of which part of
            the codebase calls it.
          </Para>

          <CodeBox label="The fix — behavior and state bundled together, with a protected invariant">{`class Trip:
    def __init__(self, driver_id, rider_id, pickup):
        self.driver_id = driver_id
        self.rider_id = rider_id
        self.pickup = pickup
        self.status = "in_progress"
        self.fare = 0

    def update_location(self, new_location):
        if self.status != "in_progress":
            raise ValueError("Cannot update location on a trip that has already ended")
        self.current_location = new_location
        self.fare += 0.50

    def end(self):
        self.status = "completed"
        return self.fare`}</CodeBox>

          <Para>
            This is exactly the "invariants to protect" case from Part 08 — the moment a rule needed
            enforcing across every call site, the dict stopped being the right tool, and the class paid
            for its extra boilerplate many times over the first time it caught a bug that would
            otherwise have shipped.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Classes and Objects</SectionTitle>

        {[
          {
            wrong: '"self is a reserved keyword in Python, like this in Java"',
            right: 'self is an ordinary parameter name, chosen purely by convention. It works because Python translates rex.bark() into Dog.bark(rex) automatically — self is simply the first parameter that receives whatever object the method was called on. You could name it anything, but every Python codebase you will work in uses self, and deviating from that convention will draw immediate code review pushback.',
          },
          {
            wrong: '"A class and an object are basically two words for the same thing"',
            right: 'A class is the blueprint/definition; an object (instance) is a concrete thing built from it. rex = Dog(\"Rex\", \"German Shepherd\") creates one object from the Dog class. You can create as many independent objects from one class as you want, each with its own separate state.',
          },
          {
            wrong: '"You should reach for a class whenever you\'re grouping related data together"',
            right: 'If there is no behavior attached and no invariants to protect, a plain dict, namedtuple, or dataclass is usually simpler and just as readable, as covered in Part 08. Classes earn their complexity when methods need to read or change an object\'s own state, or when rules must be enforced about how that state is allowed to change.',
          },
          {
            wrong: '"__init__ is the same thing as the constructor in every sense, and it creates the object"',
            right: '__init__ initializes an object that already exists — the actual creation is handled by a separate, rarely-touched method called __new__. In everyday application code you will only ever write __init__, but it is worth knowing the distinction exists, since __init__ never returns a value the way you might expect a "constructor" to.',
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

      {/* ── Part 11 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between a class and an object in Python?',
            a: 'A class is a blueprint — a definition of what data an object will hold and what behavior (methods) it will support. An object (instance) is a concrete thing created from that blueprint, with its own independent copy of whatever instance attributes the class defines. You can create many independent objects from one class; each one has separate state, even though they share the same methods.',
          },
          {
            q: 'Explain how self actually works. Why is it explicit in Python, unlike this in Java or JavaScript?',
            a: 'self is not a keyword — it is an ordinary parameter, conventionally named self, that is always the first parameter of an instance method. When you call obj.method(arg), Python translates that into Class.method(obj, arg) — it automatically supplies the object as the first argument. self is just where that argument lands. It has to be declared explicitly in the method signature precisely because Python treats it as a normal parameter passed through normal function-call machinery, rather than hiding it behind special implicit syntax.',
          },
          {
            q: 'What does __init__ do, and is it the same as a constructor?',
            a: '__init__ runs automatically right after a new object is created, and its job is to set up the object\'s initial state, typically by assigning instance attributes with self.attribute = value. It is commonly called "the constructor," though technically the actual object creation is handled by a separate, rarely-used method called __new__ — __init__ only initializes an object that already exists, and it must not return anything other than None.',
          },
          {
            q: 'What is the difference between an instance attribute and just using a local variable inside a method?',
            a: 'A local variable inside a method only exists for the duration of that single method call and disappears afterward. An instance attribute, set with self.attribute = value, is stored on the object itself and persists for the entire lifetime of that object, accessible from every other method on the same instance, and directly from outside the class via dot notation.',
          },
          {
            q: 'When would you choose a plain dict over defining a class?',
            a: 'When you are just grouping a few related, mostly read-only values with no behavior attached and no rules to enforce about how they change — a dict, namedtuple, or dataclass is simpler and requires less boilerplate. A class earns its complexity once you need methods that operate on the object\'s own state, or need to protect an invariant (a rule that must always hold true) that a plain dict has no mechanism to enforce.',
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
        <SectionTitle>Class Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting self as the first parameter of a method',
            a: 'def bark(): inside a class raises a TypeError the moment you call rex.bark(), because Python is still trying to pass rex in as an argument, but the function has no parameter to receive it. Every instance method needs self as its first parameter, even if the method never actually uses it.',
          },
          {
            q: 'Forgetting to call the class (with parentheses) when creating an object',
            a: 'rex = Dog just makes rex point at the class itself, not an instance of it. You need rex = Dog("Rex", "German Shepherd") — the parentheses are what actually trigger __init__ and produce a real object.',
          },
          {
            q: 'Setting attributes outside __init__ and being surprised they don\'t always exist',
            a: 'If an attribute is only set inside a method other than __init__ (say, learn_trick()), any object that has never had that method called on it will not have that attribute yet, and accessing it raises an AttributeError. Set every attribute the object will ever need inside __init__, even if just to a default value like None or an empty list.',
          },
          {
            q: 'Confusing Dog (the class) with rex (an instance of it) when reading errors',
            a: 'Error messages and code both refer to classes and instances by very similar-looking names. Getting comfortable reading type(rex) and isinstance(rex, Dog) early makes debugging far less confusing once inheritance is introduced in Module 21.',
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
        <SectionTitle>Errors You Will Hit With Classes — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: bark() takes 0 positional arguments but 1 was given`,
            cause: 'A method was defined without self as its first parameter (def bark():), but Python automatically passes the object in as the first argument whenever you call it as rex.bark().',
            fix: 'Add self as the first parameter of every instance method: def bark(self):.',
          },
          {
            error: `AttributeError: 'Dog' object has no attribute 'tricks'`,
            cause: 'The attribute was never set on this particular instance — most commonly because it is only assigned inside a method other than __init__, and that method has not been called yet on this object.',
            fix: 'Set every attribute the object will need inside __init__, with a sensible default if the real value is not known yet (self.tricks = []), so it always exists from the moment the object is created.',
          },
          {
            error: `TypeError: __init__() missing 1 required positional argument: 'breed'`,
            cause: 'The class was called with fewer arguments than __init__ requires — for example, Dog("Rex") when __init__(self, name, breed) requires both name and breed.',
            fix: 'Pass every required argument, or give the missing parameter a default value in __init__ (covered in depth in Module 20) if it should be optional.',
          },
          {
            error: `TypeError: 'Dog' object is not callable`,
            cause: 'An instance is being called with parentheses as if it were a function or the class itself — for example, rex() instead of rex.bark(). This usually means a method call is missing its name.',
            fix: 'Call a specific method on the instance (rex.bark()), not the instance itself, unless the class deliberately defines __call__ — an advanced dunder method outside the scope of this module.',
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
        'A class is a blueprint; an object (instance) is a concrete thing built from it. Every instance has its own independent copy of the instance attributes the class defines.',
        '__init__ runs automatically when you create an object, and is where you set up its initial state — but it never returns a value other than None.',
        'self is not magic and not a keyword — it is an ordinary parameter that Python automatically fills in with the object a method was called on. rex.bark() is really Dog.bark(rex) under the hood.',
        'Instance attributes are set with self.attribute = value, most commonly inside __init__, and persist for the object\'s whole lifetime.',
        'Multiple instances of the same class are fully independent — changing one instance\'s attributes never affects another instance, even though they share the same class and methods.',
        'A class is not always the right tool. If there is no behavior attached and no invariants to protect, a dict, namedtuple, or dataclass is simpler.',
        'Classes earn their complexity once methods need to read or change an object\'s own state, or once a rule about that state needs enforcing everywhere it is touched.',
        'By convention, class names use PascalCase, distinguishing them at a glance from snake_case variables and functions.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 20 goes deeper on __init__, and covers the single most infamous gotcha in
          object-oriented Python: what happens when a class attribute is a mutable object, shared
          silently across every instance until you know to watch for it.
        </p>
        <Link href="/learn/python/constructors-attributes" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 20 → Constructors, Instance vs Class Attributes
        </Link>
      </div>
    </LearnLayout>
  )
}
