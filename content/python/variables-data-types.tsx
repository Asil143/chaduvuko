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
      readTime="40 min"
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
          memory as an <strong>object</strong>, and a variable is simply a <strong>name that points
          at that object</strong>.
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
          <strong>Why backup changed:</strong> <code>backup = scores</code> did not copy the list —
          it made <code>backup</code> point at the exact same object in memory as <code>scores</code>.
          Both names refer to one list, so a change through either name is visible through both. This
          becomes critical once you learn about mutable vs immutable types later in this module, and
          again when you learn proper copying techniques in the Lists module.
        </Callout>

        <SubTitle>Naming rules and conventions</SubTitle>

        <Para>
          A variable name must start with a letter or underscore, can contain letters, numbers, and
          underscores, and is case-sensitive (<code>age</code> and <code>Age</code> are different
          names). By convention, Python variable names use <code>snake_case</code> — lowercase words
          separated by underscores, like <code>total_price</code> — not <code>camelCase</code>. This
          is not enforced by the language, but every professional Python codebase follows it, and
          you will cover this and the rest of the PEP 8 style guide in depth in the Best Practices
          module later in this track.
        </Para>
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
          exact same object — the correct check for a unique singleton like <code>None</code> —
          while <code>==</code> checks value equality, which can occasionally be overridden by custom
          objects and technically does the wrong kind of comparison here.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Dynamic Typing" />
        <SectionTitle>Dynamic Typing — What It Actually Means</SectionTitle>

        <Para>
          In a statically-typed language like Java or C, you declare a variable&apos;s type up front,
          and it can never hold a value of a different type: <code>int age = 25;</code> means
          <code> age</code> can only ever hold integers. Python is <strong>dynamically typed</strong>:
          you never declare a type, and the same name can be reassigned to point at a completely
          different type of object at any time.
        </Para>

        <CodeBox label="The same name, different types over time">{`x = 25          # x points at an int
x = "twenty-five"  # now x points at a str — completely legal
x = [1, 2, 3]    # now x points at a list — also completely legal`}</CodeBox>

        <Para>
          This is not the variable "changing type" — there is no such thing in Python. Each line
          creates a new object and simply re-points the name <code>x</code> at it. The old object
          (if nothing else refers to it) becomes eligible for automatic memory cleanup, handled by
          Python&apos;s garbage collector — not something you manage manually.
        </Para>

        <Callout type="info">
          <strong>The trade-off:</strong> Dynamic typing makes Python fast to write and flexible, but
          it means type-related bugs that a compiler would catch instantly in Java or C only show up
          when that specific line of code actually runs — sometimes in production, on a code path
          your tests never exercised. This is exactly the problem the Type Hints module later in
          this track addresses, without giving up any of Python&apos;s flexibility.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Type Conversion" />
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
          <strong>The bool("False") trap:</strong> <code>bool("False")</code> evaluates to{' '}
          <code>True</code>. This surprises almost everyone the first time. <code>bool()</code> on a
          string only checks whether the string is empty or not — it has no idea the text inside
          says "False". If you are parsing a text value that is meant to represent a boolean (common
          when reading environment variables or config files), compare the string directly instead:
          <code> value.lower() == "true"</code>.
        </Callout>

        <SubTitle>Conversions that fail</SubTitle>

        <Para>
          Not every conversion is possible. Converting text that does not represent a valid number
          raises an exception rather than silently producing a wrong answer — a deliberate design
          choice that surfaces bad data immediately instead of letting it corrupt your program
          quietly.
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

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }}>
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
            a: 'For mutable types like lists (covered in depth later in this track), b = a does not copy — both names point at the same object. This is not a bug in Python; it is a fundamental part of how names and objects work, and it is worth re-reading Part 01 above until it feels natural.',
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
        'Python is dynamically typed — the same name can be reassigned to a completely different type at any time. No type declarations, no compile-time type checking.',
        'None represents the deliberate absence of a value. Always check for it with "is None", never "== None".',
        'Type conversion functions — int(), float(), str(), bool() — let you cast between types explicitly. Python never converts types for you silently.',
        'bool("any non-empty string") is always True — even bool("False") — because bool() only checks emptiness, not content.',
        'Invalid conversions raise a ValueError immediately rather than failing silently. This is deliberate — bad data should surface loudly, not corrupt your program quietly.',
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
