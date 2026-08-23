import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Encapsulation and Magic/Dunder Methods — Python | Chaduvuko',
  description:
    "Python's convention-based privacy, and the dunder methods that make your objects behave like built-in types.",
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

export default function EncapsulationDunderMethods() {
  return (
    <LearnLayout
      title="Encapsulation and Magic/Dunder Methods"
      description="Python's convention-based privacy, and the dunder methods that make your objects behave like built-in types."
      section="Python — Module 22"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Python Has No Real Private" />
        <SectionTitle>Underscore Conventions, Not Enforced Privacy</SectionTitle>

        <Para>
          Languages like Java or C++ have a <code>private</code> keyword the compiler actively enforces.
          Python has no such thing — instead it uses <strong>naming conventions</strong> that every
          Python developer is expected to respect, backed by one small piece of real language behaviour
          for the double-underscore case.
        </Para>

        <CodeBox label="The three levels, by convention">{`class Account:
    def __init__(self, balance):
        self.balance = balance        # public — freely accessed from outside
        self._pin = "1234"            # "protected" — a hint: internal use, please don't touch
        self.__secret_key = "xyz789"  # "private" — name-mangled, harder to access accidentally

acc = Account(500)
print(acc.balance)     # 500 — totally fine, it's public
print(acc._pin)        # "1234" — WORKS. Python does not stop you. It's a convention, not a lock.
print(acc.__secret_key)  # AttributeError! (see Part 02 — this one actually does something)`}</CodeBox>

        <Para>
          A single leading underscore (<code>_pin</code>) is a pure convention meaning "this is an
          internal implementation detail — you can access it, but you are opting out of any stability
          guarantee if you do." Nothing in the language prevents access; it is a signal to other
          engineers reading the code, identical in spirit to a comment that says "don't touch this."
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Name Mangling" />
        <SectionTitle>What the Double Underscore Actually Does</SectionTitle>

        <Para>
          A double leading underscore (<code>__secret_key</code>) is the one case where Python does
          something real: it <strong>renames</strong> the attribute internally to{' '}
          <code>_ClassName__attribute</code> — a mechanism called <em>name mangling</em>. This is not
          designed as a privacy mechanism at all; it exists to prevent accidental name collisions in
          subclasses, but it has the side effect of making the attribute genuinely awkward to reach from
          outside.
        </Para>

        <CodeBox label="What's actually happening under the hood">{`class Account:
    def __init__(self):
        self.__secret_key = "xyz789"

acc = Account()
print(acc.__dict__)
# {'_Account__secret_key': 'xyz789'}  <- the REAL attribute name, mangled

print(acc.__secret_key)          # AttributeError — this name doesn't exist
print(acc._Account__secret_key)  # "xyz789" — still fully accessible if you know the mangled name`}</CodeBox>

        <Callout type="warning">
          <strong>Name mangling is not security — it is collision avoidance.</strong> Anyone who knows
          the mangled name (<code>_ClassName__attr</code>) can still read or write it directly. Never
          use double underscores expecting to hide sensitive data (like real secrets or credentials) from
          a determined caller — that is not what the mechanism is for. Use it when you specifically want
          to avoid a subclass accidentally overwriting a base class's internal attribute of the same
          name.
        </Callout>

        <Para>
          In practice, most real Python code uses a single underscore for "internal, please don't touch"
          and reserves double underscores for the narrower collision-avoidance case, or skips them
          entirely in favour of clear naming and documentation.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — __str__ and __repr__" />
        <SectionTitle>Controlling How an Object Prints</SectionTitle>

        <Para>
          By default, printing a custom object gives you something genuinely unhelpful:{' '}
          <code>{`<__main__.Product object at 0x7f8a1c0a5d90>`}</code>. Two dunder methods let you
          control this — and they answer two different questions.
        </Para>

        <CodeBox label="Without either method — the unhelpful default">{`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

p = Product("Keyboard", 79.99)
print(p)     # <__main__.Product object at 0x7f8a1c0a5d90>`}</CodeBox>

        <CodeBox label="__str__ — a readable, user-facing description">{`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} (\${self.price:.2f})"

p = Product("Keyboard", 79.99)
print(p)          # Keyboard ($79.99)  <- calls __str__
print(f"{p}")     # Keyboard ($79.99)  <- f-strings also call __str__`}</CodeBox>

        <CodeBox label="__repr__ — an unambiguous, developer-facing description">{`class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price!r})"

p = Product("Keyboard", 79.99)
p                 # Product(name='Keyboard', price=79.99)   <- shown at the REPL / in a debugger
repr(p)           # "Product(name='Keyboard', price=79.99)"  <- Python switches to double quotes here, since the string itself contains a single quote
print([p])        # [Product(name='Keyboard', price=79.99)] <- lists print elements' repr, not str!`}</CodeBox>

        <Para>
          The rule of thumb every experienced Python engineer follows: <code>__repr__</code> should
          ideally be valid Python code that could recreate the object — useful for debugging and logging
          — while <code>__str__</code> is for a human-readable display. If you define only one, define{' '}
          <code>__repr__</code>: Python automatically falls back to it for <code>__str__</code> if{' '}
          <code>__str__</code> is missing, but not the other way around.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — __eq__ and __hash__" />
        <SectionTitle>Defining What "Equal" Means for Your Own Objects</SectionTitle>

        <Para>
          By default, <code>==</code> on two custom objects checks <strong>identity</strong> — are they
          literally the same object in memory — exactly like <code>is</code>. That is very often not what
          you want when comparing two objects that represent the same logical value.
        </Para>

        <CodeBox label="The default — identity comparison, probably not what you want">{`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)     # False! Different objects in memory, even though the data is identical`}</CodeBox>

        <CodeBox label="Defining __eq__ — comparing by value">{`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)     # True — now comparing by value`}</CodeBox>

        <Callout type="warning">
          <strong>Defining <code>__eq__</code> silently disables the default <code>__hash__</code>,
          making instances unhashable.</strong> If you rely on putting instances of the class in a{' '}
          <code>set</code> or using them as dict keys, you must also define <code>__hash__</code>{' '}
          explicitly — and it must be consistent with <code>__eq__</code>: two objects that compare equal{' '}
          <strong>must</strong> produce the same hash. Violating this contract causes objects to
          mysteriously "vanish" from sets or dicts, since the hash is used to locate the bucket before{' '}
          <code>__eq__</code> is even consulted.
        </Callout>

        <CodeBox label="Adding a consistent __hash__">{`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))   # same inputs -> same hash, matching __eq__'s logic

points = {Point(1, 2), Point(1, 2)}
print(len(points))     # 1 — correctly recognised as the same logical value`}</CodeBox>

        <Para>
          A closely related trap: mutable objects generally should <strong>not</strong> define{' '}
          <code>__hash__</code> at all (or should raise from it), because if an object's hash can change
          after it is placed in a set or used as a dict key, it becomes unfindable in its own bucket —
          the set/dict's internal structure assumes an object's hash never changes while it lives inside
          it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Ordering and Arithmetic Dunders" />
        <SectionTitle>__lt__, total_ordering, and Operator Overloading</SectionTitle>

        <Para>
          The same pattern extends to ordering (<code>&lt;</code>, <code>&lt;=</code>, etc.) and
          arithmetic (<code>+</code>, <code>-</code>, etc.) — each operator has a corresponding dunder
          method Python calls behind the scenes.
        </Para>

        <CodeBox label="__lt__ enables sorting your own objects">{`class Employee:
    def __init__(self, name, salary):
        self.name, self.salary = name, salary

    def __lt__(self, other):
        return self.salary < other.salary

    def __repr__(self):
        return f"Employee({self.name!r}, {self.salary})"

team = [Employee("Cara", 95000), Employee("Ben", 82000)]
print(sorted(team))
# [Employee('Ben', 82000), Employee('Cara', 95000)]  -- sorted() uses __lt__ automatically`}</CodeBox>

        <CodeBox label="functools.total_ordering — deriving the rest from just __eq__ and __lt__">{`from functools import total_ordering

@total_ordering
class Employee:
    def __init__(self, name, salary):
        self.name, self.salary = name, salary

    def __eq__(self, other):
        return self.salary == other.salary

    def __lt__(self, other):
        return self.salary < other.salary

# total_ordering fills in __le__, __gt__, __ge__ automatically from just these two`}</CodeBox>

        <CodeBox label="Operator overloading with __add__">{`class Money:
    def __init__(self, cents):
        self.cents = cents

    def __add__(self, other):
        return Money(self.cents + other.cents)

    def __repr__(self):
        return f"\${self.cents / 100:.2f}"

total = Money(500) + Money(250)
print(total)     # $7.50 — the + operator now works on Money objects directly`}</CodeBox>

        <SubTitle>__len__ and __getitem__ — acting like a built-in collection</SubTitle>

        <CodeBox label="Making a custom class support len() and indexing">{`class Playlist:
    def __init__(self, songs):
        self._songs = songs

    def __len__(self):
        return len(self._songs)

    def __getitem__(self, index):
        return self._songs[index]

pl = Playlist(["Intro", "Solo", "Outro"])
print(len(pl))       # 3           -- len() calls __len__
print(pl[1])         # "Solo"      -- indexing calls __getitem__
for song in pl:      # __getitem__ alone is even enough to make an object iterable!
    print(song)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Vanishing-Duplicates Bug at a Denver Logistics Company</SectionTitle>

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
            Scenario — Logistics company, Denver · Production bug report
          </div>

          <Para>
            A team defines a <code>Shipment</code> class with a hand-written <code>__eq__</code>{' '}
            (comparing by tracking number) but never gets around to adding <code>__hash__</code>. Their
            code works fine for months — until someone starts collecting shipments into a{' '}
            <code>set()</code> to de-duplicate a batch import, and duplicate shipments start silently
            slipping through instead of being removed.
          </Para>

          <CodeBox label="The bug">{`class Shipment:
    def __init__(self, tracking_number):
        self.tracking_number = tracking_number

    def __eq__(self, other):
        return self.tracking_number == other.tracking_number

    # No __hash__ defined!

s1 = Shipment("TRK001")
s2 = Shipment("TRK001")
print(s1 == s2)           # True — looks correct

unique = {s1, s2}
print(len(unique))        # 2, NOT 1! Duplicates were not removed.`}</CodeBox>

          <SubSubTitle>Why this happens</SubSubTitle>

          <Para>
            Defining <code>__eq__</code> without <code>__hash__</code> does not raise an error — it
            silently falls back to <strong>identity-based hashing</strong> (the default from{' '}
            <code>object</code>), which is completely inconsistent with the value-based{' '}
            <code>__eq__</code> just written. The set uses the (identity) hash to decide which bucket to
            check first, finds no collision because <code>s1</code> and <code>s2</code> hash differently,
            and never even calls <code>__eq__</code> to compare them.
          </Para>

          <CodeBox label="The fix">{`class Shipment:
    def __init__(self, tracking_number):
        self.tracking_number = tracking_number

    def __eq__(self, other):
        return self.tracking_number == other.tracking_number

    def __hash__(self):
        return hash(self.tracking_number)   # consistent with __eq__

unique = {Shipment("TRK001"), Shipment("TRK001")}
print(len(unique))        # 1 — correct now`}</CodeBox>

          <Para>
            The lesson the team took away: <strong>__eq__ and __hash__ are a matched pair</strong> — if
            you override one for value comparison, you almost always need to override the other, and the
            bug they produce when mismatched is exactly this kind of silent, hard-to-notice data
            corruption rather than a loud crash.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Encapsulation and Dunders</SectionTitle>

        {[
          {
            wrong: '"A double underscore (__attr) makes an attribute truly private, like in Java"',
            right: 'It triggers name mangling (renaming to _ClassName__attr), which prevents ACCIDENTAL access and subclass collisions — but anyone who knows the mangled name can still read or write it directly. It is not an enforced access-control mechanism.',
          },
          {
            wrong: '"str() and repr() do basically the same thing, so it doesn\'t matter which you define"',
            right: 'They answer different questions — __str__ is for a human-readable display (what print() shows), __repr__ is for an unambiguous, debugging-oriented representation (what the REPL and lists of objects show). If you define only one, define __repr__, since Python falls back to it for __str__ automatically.',
          },
          {
            wrong: '"If I define __eq__, equality and hashing will just work correctly together"',
            right: 'Defining __eq__ SILENTLY disables the inherited default __hash__, making instances unhashable unless you also define __hash__ yourself — and it must be consistent with __eq__, or objects will "vanish" from sets and dicts in exactly the way shown in the Real World example above.',
          },
          {
            wrong: '"Operator overloading (__add__, etc.) is a rarely-used, advanced-only feature"',
            right: 'It is genuinely common in everyday Python — libraries like pandas, NumPy, and datetime all rely on it heavily (e.g. date2 - date1 returning a timedelta). It becomes a real tool, not just trivia, the moment you write a class that represents a value with natural arithmetic, like money or a vector.',
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

      {/* ── Part 08 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is name mangling, and what problem does it actually solve?',
            a: 'A double-leading-underscore attribute (__attr) is renamed internally to _ClassName__attr. It is designed to prevent naming collisions between a base class\'s internal attributes and a subclass\'s own attributes of the same name — not as a privacy/security mechanism, since the mangled name is still fully accessible if you know it.',
          },
          {
            q: 'What is the difference between __str__ and __repr__?',
            a: '__str__ produces a human-readable description, used by print() and f-strings. __repr__ produces an unambiguous, ideally code-like description, used by the REPL, debuggers, and containers like lists when displaying their elements. Defining only __repr__ is a safe default since Python falls back to it for __str__ automatically.',
          },
          {
            q: 'Why does defining __eq__ without __hash__ cause objects to behave incorrectly in sets and dicts?',
            a: 'Defining __eq__ silently removes the inherited default __hash__, making the class unhashable, UNLESS __hash__ is explicitly defined too — and it must be consistent with __eq__ (equal objects must hash equally). If it is inconsistent, objects can be placed in the wrong hash bucket and effectively "disappear" from lookups, since __eq__ is only checked within a bucket the hash already pointed to.',
          },
          {
            q: 'What does functools.total_ordering do?',
            a: 'Given a class that defines __eq__ and just one other comparison method (commonly __lt__), it automatically fills in the remaining comparison methods (__le__, __gt__, __ge__) so you don\'t have to hand-write all four/five yourself.',
          },
          {
            q: 'What is the minimum needed to make a custom object support both len() and iteration?',
            a: 'Implementing __len__ supports len(obj). Implementing __getitem__ (accepting integer indices starting from 0, and raising IndexError once exhausted) is actually enough on its own to make an object iterable in a for loop, even without a dedicated __iter__ method — Python falls back to repeatedly calling __getitem__ with increasing indices.',
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
        <SectionTitle>Encapsulation & Dunder Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Defining __eq__ and expecting the object to still be hashable',
            a: 'It silently becomes unhashable (or inconsistently hashable) unless __hash__ is explicitly defined alongside it — see the Real World example above for exactly how this bites in production.',
          },
          {
            q: 'Assuming __attr (double underscore) is a security mechanism',
            a: 'It is collision-avoidance via name mangling, not privacy enforcement. The mangled name (_ClassName__attr) is still fully readable and writable from outside the class.',
          },
          {
            q: 'Forgetting the isinstance() check inside __eq__',
            a: 'Comparing self.x == other.x without first checking that "other" is even the right type raises an AttributeError the moment someone compares your object to something unrelated, like None or an int, instead of cleanly returning False (via NotImplemented, which Python then falls back on correctly).',
          },
          {
            q: 'Defining __repr__ using str() interpolation instead of !r for the fields',
            a: 'Interpolating with plain str() produces something like Product(Keyboard) — ambiguous, not valid Python. Using !r (Product(name={self.name!r})) produces a quoted, code-like value instead — unambiguous and closer to code that could recreate the object, which is the whole point of __repr__.',
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
        <SectionTitle>Errors You Will Hit With Encapsulation & Dunders — And Exactly Why</SectionTitle>

        {[
          {
            error: `AttributeError: 'Product' object has no attribute '__secret_key'`,
            cause: 'Attempting to access a name-mangled double-underscore attribute directly from outside the class using its original, un-mangled name.',
            fix: 'Access it through the class\'s own methods, or if you genuinely need external access, use the mangled name obj._ClassName__attr (a strong sign the attribute should not have been double-underscored in the first place).',
          },
          {
            error: `TypeError: unhashable type: 'Shipment'`,
            cause: 'A class defines __eq__ without also defining __hash__, so Python sets __hash__ to None automatically, making instances unusable as set elements or dict keys.',
            fix: 'Add a __hash__ method that is consistent with __eq__ — typically hash()ing the same fields __eq__ compares.',
          },
          {
            error: `TypeError: '<' not supported between instances of 'Employee' and 'Employee'`,
            cause: 'Calling sorted() or using < on objects of a class that has not defined __lt__.',
            fix: 'Define __lt__ (and consider @functools.total_ordering to get the rest of the comparison operators for free).',
          },
          {
            error: `AttributeError: 'NoneType' object has no attribute 'tracking_number'`,
            cause: "A hand-written __eq__ directly accessed other.tracking_number without checking that 'other' is actually a Shipment instance first — comparing to None or an unrelated type crashes instead of returning False.",
            fix: 'Add an isinstance(other, Shipment) check at the top of __eq__, returning NotImplemented (not False directly) when it fails — this lets Python correctly fall back to the other object\'s own comparison logic if it has any.',
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
        'Python has no enforced private keyword — a single underscore (_attr) is a pure convention; a double underscore (__attr) triggers name mangling for collision avoidance, not true privacy.',
        '__str__ controls print()/f-string output for humans; __repr__ controls the debugging/REPL representation and is what a list of objects displays. Define __repr__ if you only pick one.',
        'Defining __eq__ silently disables the default __hash__ — define __hash__ too, consistent with __eq__, or instances become unhashable or behave incorrectly in sets/dicts.',
        '__lt__ (optionally combined with @functools.total_ordering) enables sorted() and comparison operators on custom objects.',
        'Operator dunders like __add__ let custom objects use natural arithmetic syntax — genuinely common in real libraries (pandas, NumPy, datetime), not just an academic exercise.',
        '__len__ and __getitem__ let a custom object support len() and indexing; __getitem__ alone is even enough to make an object iterable in a for loop.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 23 covers @classmethod, @staticmethod, and @property — three decorators every real
          Python class eventually reaches for, and exactly when each one is the right tool.
        </p>
        <Link href="/learn/python/class-static-methods-properties" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 23 → Class Methods, Static Methods and Properties
        </Link>
      </div>
    </LearnLayout>
  )
}
