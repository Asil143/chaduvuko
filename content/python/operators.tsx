import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Operators — Arithmetic, Comparison, Logical — Python | Chaduvuko',
  description:
    'Every operator Python has, what each one actually does under the hood, and the precedence rules that cause real, hard-to-spot bugs when ignored.',
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

export default function Operators() {
  return (
    <LearnLayout
      title="Operators — Arithmetic, Comparison, Logical"
      description="Every operator Python has, what it does under the hood, and the precedence rules that cause real bugs."
      section="Python — Module 03"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Arithmetic Operators" />
        <SectionTitle>The Seven Arithmetic Operators</SectionTitle>

        <Para>
          Python has seven arithmetic operators. Two of them — floor division and modulo — do not
          exist in most beginners&apos; prior experience and are worth learning properly the first time.
        </Para>

        <CodeBox label="All seven, with real output">{`10 + 3      # 13   addition
10 - 3      # 7    subtraction
10 * 3      # 30   multiplication
10 / 3      # 3.3333333333333335   true division — ALWAYS returns a float
10 // 3     # 3    floor division — divides, then rounds DOWN to the nearest integer
10 % 3      # 1    modulo — the REMAINDER after floor division
10 ** 3     # 1000 exponentiation — 10 to the power of 3`}</CodeBox>

        <Callout type="warning">
          <strong>/ always returns a float, even when the numbers divide evenly:</strong>{' '}
          <code>10 / 2</code> is <code>5.0</code>, not <code>5</code>. This trips up anyone coming
          from a language where integer division on two integers returns an integer. If you need an
          integer result, use floor division (<code>//</code>) or wrap the result in{' '}
          <code>int()</code> — but understand that <code>int()</code> truncates toward zero while{' '}
          <code>//</code> always rounds toward negative infinity, and these give different answers
          for negative numbers.
        </Callout>

        <SubTitle>Floor division and modulo with negative numbers</SubTitle>

        <Para>
          This is where floor division surprises people who assume it behaves like truncation:
        </Para>

        <CodeBox label="Floor division rounds toward negative infinity, not toward zero">{`7 // 2      # 3    (straightforward)
-7 // 2     # -4   NOT -3 — floor division rounds DOWN (toward -infinity)
7 % 2       # 1
-7 % 2      # 1    NOT -1 — Python's modulo result always matches the SIGN of the divisor`}</CodeBox>

        <Para>
          The identity <code>a == (a // b) * b + (a % b)</code> always holds true in Python — that
          consistency is exactly why the modulo of a negative number behaves this way. This detail
          matters more than it seems: modulo is used constantly for tasks like determining if a
          number is even (<code>n % 2 == 0</code>), wrapping an index around an array
          (<code>i % len(arr)</code>), and bucketing values into a fixed number of groups.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Comparison Operators" />
        <SectionTitle>Comparing Values</SectionTitle>

        <CodeBox label="The six comparison operators — every one returns a bool">{`5 == 5      # True   — equal to
5 != 3      # True   — not equal to
5 > 3       # True   — greater than
5 < 3       # False  — less than
5 >= 5      # True   — greater than or equal to
5 <= 4      # False  — less than or equal to`}</CodeBox>

        <SubTitle>Chained comparisons — a genuine Python convenience</SubTitle>

        <Para>
          Python allows you to chain comparisons in a way that reads naturally and matches
          mathematical notation — something most other languages do not support directly.
        </Para>

        <CodeBox label="Chained comparisons">{`age = 25

# Instead of writing this:
if age >= 18 and age <= 65:
    print("Working age")

# Python lets you write this — and it means exactly the same thing:
if 18 <= age <= 65:
    print("Working age")`}</CodeBox>

        <Callout type="tip">
          Chained comparisons are genuinely idiomatic Python, not a party trick — you will see{' '}
          <code>0 &lt;= i &lt; len(items)</code> and similar patterns throughout real production
          codebases. Use them whenever they make a range check more readable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Logical Operators" />
        <SectionTitle>and, or, not — and Short-Circuit Evaluation</SectionTitle>

        <Para>
          Python spells its logical operators as English words — <code>and</code>, <code>or</code>,
          and <code>not</code> — rather than symbols like <code>&amp;&amp;</code> and <code>||</code>.
        </Para>

        <CodeBox label="Logical operators">{`age = 25
has_license = True

age >= 18 and has_license    # True  — both must be true
age >= 18 or has_license      # True  — at least one must be true
not has_license                 # False — flips the boolean`}</CodeBox>

        <SubTitle>Short-circuit evaluation</SubTitle>

        <Para>
          Python stops evaluating an <code>and</code>/<code>or</code> expression as soon as the
          overall result is already determined — it does not evaluate the right-hand side unless it
          actually needs to. This is not just an optimisation detail; it is a pattern used
          deliberately in real code.
        </Para>

        <CodeBox label="Short-circuiting protects against errors">{`user = None

# This would crash if user is None, because None has no .name attribute:
# if user.name == "Maria":

# This is safe — short-circuiting means user.name is never evaluated
# once "user is not None" has already determined the result is False:
if user is not None and user.name == "Maria":
    print("Found Maria")`}</CodeBox>

        <Callout type="info">
          <strong>and/or don&apos;t always return True or False:</strong> <code>and</code> returns the
          first falsy value it finds, or the last value if all are truthy. <code>or</code> returns
          the first truthy value it finds, or the last value if all are falsy. This is exploited
          deliberately for default-value patterns: <code>name = user_input or "Anonymous"</code>{' '}
          assigns <code>"Anonymous"</code> only if <code>user_input</code> is falsy (empty, None,
          zero, etc.).
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Assignment Operators & Identity" />
        <SectionTitle>Compound Assignment, and == vs is</SectionTitle>

        <CodeBox label="Compound assignment operators">{`count = 0
count += 1     # same as: count = count + 1   →  1
count -= 1     # same as: count = count - 1   →  0
count *= 5     # same as: count = count * 5   →  0
total = 10
total //= 3    # same as: total = total // 3  →  3`}</CodeBox>

        <Para>
          You have already seen <code>is</code> briefly in the previous module for checking{' '}
          <code>None</code>. The full distinction matters enough to state clearly:{' '}
          <code>==</code> checks whether two values are <strong>equal</strong>;{' '}
          <code>is</code> checks whether two names point at the <strong>exact same object</strong> in
          memory.
        </Para>

        <CodeBox label="== checks equality, is checks identity">{`a = [1, 2, 3]
b = [1, 2, 3]
c = a

a == b   # True  — same contents, so they are considered equal
a is b   # False — two separate list objects in memory, even with identical contents
a is c   # True  — c points at the exact same object as a`}</CodeBox>

        <Callout type="warning">
          Use <code>==</code> for comparing values (the overwhelming majority of comparisons you will
          write) and reserve <code>is</code> specifically for identity checks — comparing against{' '}
          <code>None</code>, <code>True</code>, or <code>False</code>, or checking whether two names
          refer to the literal same object. Using <code>is</code> to compare numbers or strings can
          appear to work by coincidence (small integers and short strings are sometimes cached and
          reused internally by CPython) and then fail unpredictably for larger values — a well-known
          source of confusing bugs.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Operator Precedence" />
        <SectionTitle>Precedence — The Order Python Actually Evaluates In</SectionTitle>

        <Para>
          Just like mathematics has an order of operations (PEMDAS), Python has a defined precedence
          for every operator. From highest to lowest priority among what you have learned so far:
        </Para>

        <CodeBox label="Precedence, highest to lowest">{`1. **              (exponentiation)
2. * / // %       (multiplication, division, floor division, modulo)
3. + -             (addition, subtraction)
4. == != < > <= >= (comparisons)
5. not             (logical not)
6. and             (logical and)
7. or              (logical or)`}</CodeBox>

        <CodeBox label="A precedence bug that looks correct at a glance">{`# Intention: "is the discount valid for either a member or someone spending over $100?"
is_valid = is_member or total_spent > 100 and has_coupon

# What this ACTUALLY evaluates as, because "and" binds tighter than "or":
is_valid = is_member or (total_spent > 100 and has_coupon)

# If that is not the intended logic, parentheses are required to force it:
is_valid = (is_member or total_spent > 100) and has_coupon`}</CodeBox>

        <Callout type="tip">
          <strong>The professional rule of thumb:</strong> whenever an expression mixes{' '}
          <code>and</code> and <code>or</code>, add explicit parentheses even where they are not
          strictly required. It costs nothing, and it removes any ambiguity for the next person
          reading the code — who is very often you, six months later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Walrus Operator" />
        <SectionTitle>:= — Assignment Inside an Expression</SectionTitle>

        <Para>
          Introduced in Python 3.8, the walrus operator lets you assign a value to a name{' '}
          <em>as part of</em> a larger expression, instead of requiring a separate statement first.
          It is most useful for avoiding a value being computed twice.
        </Para>

        <CodeBox label="Without the walrus operator — computed twice, or an extra line">{`import random
n = random.randint(1, 10)
if n > 5:
    print(f"{n} is greater than 5")`}</CodeBox>

        <CodeBox label="With the walrus operator — assignment inside the condition">{`import random
if (n := random.randint(1, 10)) > 5:
    print(f"{n} is greater than 5")`}</CodeBox>

        <Callout type="info">
          You will not use the walrus operator constantly, but it is common enough in real code
          (especially inside <code>while</code> loops reading data in chunks, and comprehensions) that
          you should recognise it immediately when you see it rather than be confused by the unfamiliar
          syntax.
        </Callout>
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Operator Mistakes That Produce a Wrong Answer, Not an Error</SectionTitle>

        {[
          {
            q: 'Using / when // was intended, or vice versa',
            a: 'average = total / count when count and total are both meant to produce a whole "items per page" value silently produces a float where an integer was expected — no error, just a subtly wrong number that can cause an off-by-one bug three lines later.',
          },
          {
            q: 'Chaining "and"/"or" without parentheses and getting the wrong logic',
            a: 'As shown in Part 05, "and" silently binds tighter than "or". This produces a program that runs without error but makes the wrong decision — the most dangerous kind of bug because nothing crashes to alert you.',
          },
          {
            q: 'Using is to compare numbers or strings',
            a: 'a is b for two variables holding the value 5 might return True due to CPython\'s internal small-integer caching (typically -5 to 256) — but the exact same code with the value 1000 returns False. Never rely on this; use == for value comparison.',
          },
          {
            q: 'Forgetting that comparison chains short-circuit left to right',
            a: 'In "x < y < z", if x < y is False, Python does not evaluate y < z at all — the whole expression is immediately False. This is usually what you want, but it means y < z is never evaluated in that case, which matters if that check has a side effect (it should not — but it is worth knowing).',
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
        '/ always returns a float, even when the division is exact. Use // for floor division when you need an integer result.',
        'Floor division and modulo round toward negative infinity, not toward zero — this changes the answer for negative numbers.',
        'Python allows natural chained comparisons like 18 <= age <= 65 — genuinely idiomatic, not a trick.',
        'and and or short-circuit: the right-hand side is only evaluated if needed. This is used deliberately to guard against errors and to provide default values.',
        '== compares values; is compares identity (the exact same object in memory). Use == for almost everything; reserve is for None/True/False checks.',
        'and binds tighter than or. Always parenthesise mixed and/or expressions explicitly, even when not strictly required.',
        'The walrus operator (:=) assigns a value as part of a larger expression — most common inside while loops and comprehensions.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 04 is a deep dive into strings — indexing, slicing, the methods you will use
          constantly, and f-strings done properly.
        </p>
        <Link href="/learn/python/strings" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 04 → Strings
        </Link>
      </div>
    </LearnLayout>
  )
}
