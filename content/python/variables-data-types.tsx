import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Variables, Data Types & Type Conversion — Python | Chaduvuko',
  description:
    'Every value in Python is an object. Variables, the core data types, how dynamic typing actually works, and how to convert between types without introducing silent bugs.',
}

const C = '#00e676'

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

export default function VariablesDataTypes() {
  return (
    <LearnLayout
      title="Variables, Data Types & Type Conversion"
      description="Every value in Python is an object. Variables, the core data types, dynamic typing, and how to convert safely between them."
      section="Python — Module 02"
      readTime="60 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Variable Actually Is" />
        <SectionTitle>Variables Are Names, Not Boxes</SectionTitle>

        <Para>
          Most beginner explanations describe a variable as a labelled box that stores a value. In
          Python, that mental model is wrong in a way that will cause real confusion later. A more
          accurate picture: every value you create (a number, a string, a list) lives somewhere in
          memory as an <strong>object</strong>, and a variable is simply a <strong>name that points at
          that object</strong>. This is sometimes called a "name binding."
        </Para>

        <CodeBox label="A variable is a label, not a container">{`age = 25
name = "Maria"

# "age" does not contain the number 25 inside it.
# "age" is a name that points at an integer object whose value is 25.`}</CodeBox>

        <Para>
          This distinction matters the moment you assign one variable to another:
        </Para>

        <CodeBox label="Two names, one object">{`scores = [90, 85, 77]
backup = scores        # backup now points at the SAME list object as scores

scores.append(100)
print(backup)          # [90, 85, 77, 100] — backup changed too!`}</CodeBox>

        <Callout type="warning">
          <strong>Why backup changed:</strong> <code>backup = scores</code> did not copy the list — it
          made <code>backup</code> point at the exact same object in memory as <code>scores</code>.
          Both names refer to one list, so a change through either name is visible through both. This
          becomes critical once you learn about mutable vs immutable types later in this module, and
          again when you learn proper copying techniques in the Lists module.
        </Callout>

        <SubTitle>Naming rules and conventions</SubTitle>

        <Para>
          A variable name must start with a letter or underscore, can contain letters, numbers, and
          underscores, and is case-sensitive (<code>age</code> and <code>Age</code> are different
          names). Names cannot be one of Python&apos;s reserved keywords (<code>if</code>,{' '}
          <code>class</code>, <code>for</code>, and about 35 others). By convention, Python variable
          names use <code>snake_case</code> — lowercase words separated by underscores, like{' '}
          <code>total_price</code> — not <code>camelCase</code>. This is not enforced by the language,
          but every professional Python codebase follows it, and you will cover this and the rest of
          the PEP 8 style guide in depth in the Best Practices module later in this track.
        </Para>

        <CodeBox label="Valid vs invalid names">{`user_name = "ok"      # valid
_private = "ok"        # valid — leading underscore is a convention for internal use
age2 = 25               # valid — numbers allowed after the first character
2age = 25                # SyntaxError — cannot start with a digit
user-name = "no"          # SyntaxError — hyphens are the subtraction operator, not allowed
class = "no"                # SyntaxError — "class" is a reserved keyword`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Core Data Types" />
        <SectionTitle>Every Value Has a Type</SectionTitle>

        <Para>
          Python has several built-in types you will use constantly. These five form the foundation
          for everything else in this track:
        </Para>

        <CodeBox label="The core built-in types">{`age = 25                  # int    — whole numbers, positive or negative
price = 19.99              # float  — decimal numbers
name = "Maria"              # str    — text, in single or double quotes
is_active = True            # bool   — True or False (capitalised — this is not JavaScript)
middle_name = None          # NoneType — represents "no value" / absence of a value`}</CodeBox>

        <Para>
          You can check any value&apos;s type with the built-in <code>type()</code> function — genuinely
          useful while learning, and something you will still reach for occasionally as a working
          engineer when debugging unexpected behaviour.
        </Para>

        <CodeBox label="Checking types">{`print(type(age))         # <class 'int'>
print(type(price))       # <class 'float'>
print(type(name))        # <class 'str'>
print(type(is_active))   # <class 'bool'>
print(type(middle_name)) # <class 'NoneType'>`}</CodeBox>

        <SubTitle>None is not zero, not False, not an empty string</SubTitle>

        <Para>
          <code>None</code> is Python&apos;s way of representing the deliberate absence of a value — it
          is its own distinct type with exactly one possible value. A function that does not
          explicitly return anything returns <code>None</code> automatically. You will use{' '}
          <code>None</code> constantly as a default placeholder for "not set yet" — for example, a
          user&apos;s optional middle name, or a search result that found nothing.
        </Para>

        <Callout type="tip">
          <strong>Checking for None correctly:</strong> Always use <code>if value is None:</code>,
          never <code>if value == None:</code>. <code>is</code> checks that two names point at the
          exact same object — the correct check for a unique singleton like <code>None</code> — while{' '}
          <code>==</code> checks value equality, which can occasionally be overridden by custom objects
          and technically does the wrong kind of comparison here.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Numeric Types in Depth" />
        <SectionTitle>Integers and Floats Behave Differently Than You Might Expect</SectionTitle>

        <SubTitle>Python integers have unlimited precision</SubTitle>

        <Para>
          In many languages, integers are stored in a fixed number of bits (commonly 32 or 64), which
          means they overflow — wrap around or error — past a certain size. Python&apos;s{' '}
          <code>int</code> type has no fixed size limit; it automatically grows to accommodate
          arbitrarily large numbers, limited only by available memory.
        </Para>

        <CodeBox label="Python integers never overflow">{`big_number = 2 ** 100
print(big_number)
# 1267650600228229401496703205376
# A 64-bit integer in most other languages would have overflowed long before this.`}</CodeBox>

        <SubTitle>Floats are not perfectly precise — and this is not a Python bug</SubTitle>

        <Para>
          Python&apos;s <code>float</code> type uses the IEEE 754 double-precision standard, the same
          binary floating-point representation used by nearly every mainstream programming language.
          Binary floating point cannot represent every decimal fraction exactly, for the same reason
          that <code>1/3</code> cannot be written as a finite decimal in base 10.
        </Para>

        <CodeBox label="A famous, completely normal floating-point result">{`print(0.1 + 0.2)
# 0.30000000000000004 — not exactly 0.3

print(0.1 + 0.2 == 0.3)
# False`}</CodeBox>

        <Callout type="warning">
          <strong>This happens in every mainstream language</strong> that uses IEEE 754 floats — Java,
          JavaScript, C, and Go all produce the exact same result for <code>0.1 + 0.2</code>. It is not
          a Python defect. The practical consequence: never compare floats with <code>==</code>{' '}
          directly, and never use <code>float</code> to represent money. For financial calculations,
          use Python&apos;s <code>decimal.Decimal</code> type instead, which represents decimal numbers
          exactly. You will see this exact problem — and its correct fix — again when you reach data
          engineering and financial data topics elsewhere on this site.
        </Callout>

        <CodeBox label="The correct way to compare floats, and the correct type for money">{`# Comparing floats safely — check they're "close enough" instead of exactly equal
import math
math.isclose(0.1 + 0.2, 0.3)   # True

# Representing money correctly
from decimal import Decimal
price = Decimal("19.99")        # pass a STRING, not a float, to avoid inheriting float's imprecision
tax = Decimal("1.60")
print(price + tax)                # Decimal('21.59') — exact`}</CodeBox>

        <SubTitle>Complex numbers exist too</SubTitle>

        <Para>
          Python has a built-in <code>complex</code> type for complex numbers (<code>3 + 4j</code>),
          used in scientific and engineering computation. You are unlikely to need it in typical
          application development, but it is worth knowing it exists as a genuine built-in type,
          not a library add-on.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Mutability" />
        <SectionTitle>Mutable vs Immutable — The Distinction That Explains Half of Python&apos;s Behaviour</SectionTitle>

        <Para>
          Every Python object is either <strong>mutable</strong> (its internal state can change after
          creation) or <strong>immutable</strong> (once created, it can never be changed — any
          "modification" actually creates a brand new object). This single distinction explains a huge
          amount of behaviour that otherwise looks inconsistent.
        </Para>

        <CodeBox label="Immutable types vs mutable types">{`IMMUTABLE:  int, float, bool, str, tuple, frozenset, NoneType
MUTABLE:    list, dict, set, and custom objects (by default)`}</CodeBox>

        <CodeBox label="Immutability in action — numbers">{`x = 5
y = x
x = x + 1

print(x)   # 6
print(y)   # 5 — unaffected, because x + 1 created a brand NEW integer object,
           # and only x was re-pointed at it. y still points at the original 5.`}</CodeBox>

        <CodeBox label="Mutability in action — lists">{`a = [1, 2, 3]
b = a
a.append(4)

print(a)   # [1, 2, 3, 4]
print(b)   # [1, 2, 3, 4] — b changed too, because a and b point at the SAME mutable object`}</CodeBox>

        <Para>
          Notice the difference is not about <code>=</code> behaving differently — assignment always
          just points a name at an object, consistently, in every case. The difference is entirely
          about whether the underlying object itself can be changed in place once created. Numbers and
          strings cannot; lists, dicts, and sets can.
        </Para>

        <Callout type="tip">
          <strong>Why this design exists:</strong> Immutability makes objects safe to share freely
          throughout a program — nothing can silently corrupt an integer or string that other parts of
          your code depend on. It also makes immutable objects usable as dictionary keys and set
          members (which require a stable, unchanging value), something you will rely on constantly
          once you reach the Dictionaries module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Object Identity and Memory" />
        <SectionTitle>id(), Object Identity, and CPython&apos;s Small-Integer Cache</SectionTitle>

        <Para>
          Every object in Python has a unique identity — effectively its memory address — which you
          can inspect with the built-in <code>id()</code> function. Two names with the same{' '}
          <code>id()</code> are, by definition, the exact same object.
        </Para>

        <CodeBox label="id() reveals object identity">{`a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(id(a) == id(b))   # True  — same object (this is exactly what "a is b" checks)
print(id(a) == id(c))   # False — different objects, even with identical contents
print(a == c)             # True  — equal VALUE, different objects`}</CodeBox>

        <SubTitle>A well-known CPython quirk: small integer caching</SubTitle>

        <Para>
          As a memory optimisation, CPython pre-creates and reuses integer objects for the range -5 to
          256, since small integers are used extremely often. This is an implementation detail, not a
          guaranteed language feature — but it explains a genuinely confusing observation beginners
          run into when experimenting with <code>is</code>.
        </Para>

        <CodeBox label="Why this matters — and why you should never rely on it">{`a = 100
b = 100
print(a is b)     # True — CPython reused the same cached object for both, coincidentally

x = 1000
y = 1000
print(x is y)      # False — 1000 is outside the small-int cache range;
                      # these are two separate objects that happen to hold equal values`}</CodeBox>

        <Callout type="warning">
          This is exactly why Part 04 of the Operators module told you to use <code>==</code> for value
          comparison and reserve <code>is</code> for identity checks. Relying on small-integer caching
          to make <code>is</code> "work" for numbers produces code that appears correct in testing and
          then fails unpredictably in production once the values involved happen to fall outside the
          cached range.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Dynamic Typing" />
        <SectionTitle>Dynamic Typing — What It Actually Means</SectionTitle>

        <Para>
          In a statically-typed language like Java or C, you declare a variable&apos;s type up front,
          and it can never hold a value of a different type: <code>int age = 25;</code> means{' '}
          <code>age</code> can only ever hold integers. Python is <strong>dynamically typed</strong>:
          you never declare a type, and the same name can be reassigned to point at a completely
          different type of object at any time.
        </Para>

        <CodeBox label="The same name, different types over time">{`x = 25          # x points at an int
x = "twenty-five"  # now x points at a str — completely legal
x = [1, 2, 3]    # now x points at a list — also completely legal`}</CodeBox>

        <Para>
          This is not the variable "changing type" — there is no such thing in Python. Each line
          creates a new object and simply re-points the name <code>x</code> at it. The old object (if
          nothing else refers to it) becomes eligible for automatic memory cleanup, handled by
          Python&apos;s garbage collector — not something you manage manually.
        </Para>

        <Callout type="info">
          <strong>The trade-off:</strong> Dynamic typing makes Python fast to write and flexible, but it
          means type-related bugs that a compiler would catch instantly in Java or C only show up when
          that specific line of code actually runs — sometimes in production, on a code path your
          tests never exercised. This is exactly the problem the Type Hints module later in this track
          addresses, without giving up any of Python&apos;s flexibility.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Type Conversion" />
        <SectionTitle>Converting Between Types Safely</SectionTitle>

        <Para>
          Data rarely arrives in the exact type you need. User input from <code>input()</code> is
          always a string, even if the user typed a number. Data read from a file or an API is
          frequently text that represents numbers. Converting between types — called{' '}
          <strong>type casting</strong> — is something you will do constantly.
        </Para>

        <CodeBox label="The conversion functions">{`int("42")        # 42        (str -> int)
float("19.99")   # 19.99     (str -> float)
str(42)          # "42"      (int -> str)
bool(0)          # False     (0 is falsy)
bool(1)          # True      (any nonzero number is truthy)
bool("")         # False     (empty string is falsy)
bool("no")       # True      (any non-empty string is truthy — even the string "False"!)`}</CodeBox>

        <Callout type="warning">
          <strong>The bool(&quot;False&quot;) trap:</strong> <code>bool(&quot;False&quot;)</code>{' '}
          evaluates to <code>True</code>. This surprises almost everyone the first time.{' '}
          <code>bool()</code> on a string only checks whether the string is empty or not — it has no
          idea the text inside says "False". If you are parsing a text value that is meant to represent
          a boolean (common when reading environment variables or config files), compare the string
          directly instead: <code>value.lower() == &quot;true&quot;</code>.
        </Callout>

        <SubTitle>Conversions that fail</SubTitle>

        <Para>
          Not every conversion is possible. Converting text that does not represent a valid number
          raises an exception rather than silently producing a wrong answer — a deliberate design
          choice that surfaces bad data immediately instead of letting it corrupt your program quietly.
        </Para>

        <CodeBox label="A conversion that fails loudly, not silently">{`int("hello")
# ValueError: invalid literal for int() with base 10: 'hello'

int("42.5")
# ValueError: invalid literal for int() with base 10: '42.5'
# int() cannot parse a decimal point directly —
# convert to float first, then to int, if truncation is intended:
int(float("42.5"))   # 42`}</CodeBox>

        <Para>
          You will learn to handle these failures properly — instead of letting them crash your
          program — in the Exception Handling module later in this track.
        </Para>
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
        <SectionTitle>A Chicago Fintech&apos;s $0.03 Bug That Took Two Days to Find</SectionTitle>

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
            Scenario — Payments startup, Chicago · Production incident
          </div>

          <Para>
            A payments startup&apos;s nightly reconciliation job compares the sum of all transaction
            amounts recorded in their database against the total reported by their payment processor.
            One morning, the job fails: the two totals differ by $0.03 out of $2.4 million processed
            that day. Not a huge amount — but reconciliation is required to match exactly, and the
            on-call engineer is paged.
          </Para>

          <SubSubTitle>What the investigation finds</SubSubTitle>

          <Para>
            The transaction amounts were stored and summed as Python <code>float</code> values.
            Summing hundreds of thousands of individually tiny floating-point rounding errors — each
            one invisible on its own — had accumulated into a $0.03 discrepancy by the end of the day.
            No single line of code was "wrong." Every individual calculation looked correct in
            isolation. The bug only became visible at scale, after enough additions compounded the
            imprecision.
          </Para>

          <SubSubTitle>The fix, and why it mattered</SubSubTitle>

          <Para>
            The team migrated all monetary values from <code>float</code> to{' '}
            <code>decimal.Decimal</code>, exactly as described in Part 03 above. Decimal arithmetic
            is slightly slower than float arithmetic, but for financial calculations correctness is
            not negotiable — a payments company that cannot reconcile its own numbers exactly has a
            business-critical problem, not just an engineering inconvenience.
          </Para>

          <Para>
            This is precisely why this module spent real time on floating-point imprecision instead of
            treating it as a footnote. It is one of the most common real production bugs that traces
            directly back to a fundamental data type decision made on day one of a project.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Variables and Types</SectionTitle>

        {[
          {
            wrong: '"A variable stores its value directly, like a box"',
            right: 'A variable is a name pointing at an object elsewhere in memory. This is why assigning one variable to another can make two names share one mutable object — a box metaphor cannot explain that behaviour, but the "name pointing at an object" model explains it immediately.',
          },
          {
            wrong: '"0.1 + 0.2 not equalling exactly 0.3 is a Python bug"',
            right: 'It is standard IEEE 754 double-precision floating-point behaviour, shared by virtually every mainstream language. It is not unique to Python, and it is not a bug — it is an inherent property of representing decimal fractions in binary.',
          },
          {
            wrong: '"is and == are basically interchangeable for simple values"',
            right: 'They coincidentally give the same answer for small cached integers, which is exactly what makes this misconception dangerous — the code appears to work until a value falls outside CPython\'s small-integer cache range, and then it silently breaks.',
          },
          {
            wrong: '"Since Python is dynamically typed, types don\'t really matter that much"',
            right: 'Types matter just as much as in any language — the difference is WHEN mistakes are caught. A statically-typed language catches many type errors before the program ever runs; Python catches them only when the offending line actually executes, which can be in production, on a rarely-used code path. Dynamic typing trades earlier detection for flexibility — it does not remove the need to think about types carefully.',
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
            q: 'Explain the difference between mutable and immutable types in Python, with examples.',
            a: 'Mutable objects can be changed in place after creation — lists, dicts, and sets are the core examples. Immutable objects can never be changed once created; any operation that looks like a modification (like string.upper() or a += on an int) actually creates and returns a brand new object. int, float, str, bool, and tuple are all immutable. This distinction explains why assigning a mutable object to a second variable name lets changes through either name affect both, while the same pattern with an immutable object does not.',
          },
          {
            q: 'Why is 0.1 + 0.2 not exactly equal to 0.3 in Python?',
            a: 'Python floats use IEEE 754 double-precision binary floating point, which cannot represent most decimal fractions exactly — the same reason 1/3 has no finite decimal representation in base 10. This is standard behaviour across nearly all mainstream languages, not a Python-specific bug. The correct fix for comparing floats is math.isclose() rather than ==, and the correct type for money or any value requiring exact decimal precision is decimal.Decimal.',
          },
          {
            q: 'What is the difference between == and is in Python?',
            a: '== compares value equality — whether two objects have equal contents. is compares identity — whether two names point at the literal same object in memory. Use == for almost all comparisons. Reserve is specifically for comparing against None, True, or False, or for deliberately checking whether two names refer to the same object.',
          },
          {
            q: 'What does it mean that Python is dynamically typed?',
            a: 'Variable names are not bound to a fixed type — the same name can be reassigned to point at a value of a completely different type at any point in the program, with no declaration required. This differs from statically-typed languages like Java, where a variable\'s type is fixed at declaration and enforced by the compiler before the program ever runs.',
          },
          {
            q: 'Why does bool("False") evaluate to True?',
            a: 'bool() applied to a string only checks whether the string is empty or non-empty — it does not parse or interpret the string\'s content. Since "False" is a non-empty string, it is truthy, regardless of what the text says. To correctly parse a string that represents a boolean value, compare it explicitly, e.g. value.lower() == "true".',
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
        <SectionTitle>Type Mistakes That Look Like Something Else</SectionTitle>

        {[
          {
            q: 'Trying to concatenate a string and a number directly',
            a: '"Age: " + 25 raises TypeError: can only concatenate str (not "int") to str. Python will not silently convert 25 to a string for you. Fix it with str(25), or better, use an f-string: f"Age: {25}" — covered in depth in the Strings module.',
          },
          {
            q: 'Assuming input() returns a number',
            a: 'age = input("Age: ") always returns a str, even if the user types "25". age + 1 raises a TypeError. You must explicitly convert: age = int(input("Age: ")).',
          },
          {
            q: 'Using == to check for None',
            a: 'if value == None: works in most cases but is the wrong tool — it uses value equality instead of identity. The correct, idiomatic form is if value is None:, and most linters will flag == None as a style violation.',
          },
          {
            q: 'Assuming assignment copies a value',
            a: 'For mutable types like lists, b = a does not copy — both names point at the same object. This is not a bug in Python; it is a fundamental part of how names and objects work, and it is worth re-reading Part 01 above until it feels natural.',
          },
          {
            q: 'Using float for money',
            a: 'As shown in the Real World example above, summing many float values accumulates rounding error that becomes visible at scale. Use decimal.Decimal, constructed from strings (Decimal("19.99")), not from float values, which would already have inherited the imprecision.',
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

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'A variable is a name that points at an object in memory — not a box that stores a value. Understanding this now prevents real confusion later.',
        'The five foundational types: int, float, str, bool, and NoneType. Check any value\'s type with type().',
        'Python integers have unlimited precision and never overflow. Floats use IEEE 754 double precision and cannot represent every decimal fraction exactly — never use float for money; use decimal.Decimal instead.',
        'Every object is mutable or immutable. Immutable: int, float, bool, str, tuple. Mutable: list, dict, set. This distinction explains why some assignments "share" changes and others don\'t.',
        'id() reveals object identity. CPython caches small integers (-5 to 256) as an implementation detail — never rely on this for correctness.',
        'Python is dynamically typed — the same name can be reassigned to a completely different type at any time. No type declarations, no compile-time type checking.',
        'None represents the deliberate absence of a value. Always check for it with "is None", never "== None".',
        'Type conversion functions — int(), float(), str(), bool() — let you cast between types explicitly. Invalid conversions raise a ValueError immediately rather than failing silently.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 03 covers every operator Python has — arithmetic, comparison, and logical — and the
          precedence rules that cause real, hard-to-spot bugs when ignored.
        </p>
        <Link href="/learn/python/operators" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 03 → Operators
        </Link>
      </div>
    </LearnLayout>
  )
}
