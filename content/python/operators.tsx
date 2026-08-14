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

export default function Operators() {
  return (
    <LearnLayout
      title="Operators — Arithmetic, Comparison, Logical"
      description="Every operator Python has, what it does under the hood, and the precedence rules that cause real bugs."
      section="Python — Module 03"
      readTime="50 min"
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
          <code>10 / 2</code> is <code>5.0</code>, not <code>5</code>. This trips up anyone coming from
          a language where integer division on two integers returns an integer. If you need an integer
          result, use floor division (<code>//</code>) or wrap the result in <code>int()</code> — but
          understand that <code>int()</code> truncates toward zero while <code>//</code> always rounds
          toward negative infinity, and these give different answers for negative numbers.
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
          matters more than it seems: modulo is used constantly for tasks like determining if a number
          is even (<code>n % 2 == 0</code>), wrapping an index around an array (
          <code>i % len(arr)</code>), and bucketing values into a fixed number of groups.
        </Para>

        <SubTitle>Exponentiation and roots</SubTitle>

        <Para>
          <code>**</code> also accepts fractional exponents, giving you roots without a separate
          function — <code>16 ** 0.5</code> computes the square root. For anything beyond simple cases,
          the <code>math</code> module (covered briefly here, and used constantly throughout this
          track) provides dedicated, more precise functions.
        </Para>

        <CodeBox label="Exponentiation for roots, and the math module">{`16 ** 0.5      # 4.0 — square root, via exponentiation
27 ** (1/3)     # 3.0 — cube root

import math
math.sqrt(16)    # 4.0 — dedicated, slightly more precise for edge cases
math.pow(2, 10)   # 1024.0 — like **, but always returns a float`}</CodeBox>
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

        <SubTitle>Comparing different types</SubTitle>

        <Para>
          Comparing objects of genuinely incompatible types with <code>&lt;</code>/<code>&gt;</code>{' '}
          raises a <code>TypeError</code> in Python 3 (this is a real change from Python 2, which
          allowed nonsensical cross-type comparisons and silently produced arbitrary results).{' '}
          <code>==</code>/<code>!=</code> are more forgiving — comparing a string to a number with{' '}
          <code>==</code> simply returns <code>False</code> rather than raising an error, since they
          can never be equal.
        </Para>

        <CodeBox label="Type mismatches: == is forgiving, ordering operators are not">{`"5" == 5        # False — different types, simply not equal, no error
"5" > 5          # TypeError: '>' not supported between instances of 'str' and 'int'`}</CodeBox>
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
          Python stops evaluating an <code>and</code>/<code>or</code> expression as soon as the overall
          result is already determined — it does not evaluate the right-hand side unless it actually
          needs to. This is not just an optimisation detail; it is a pattern used deliberately in real
          code.
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
          first falsy value it finds, or the last value if all are truthy. <code>or</code> returns the
          first truthy value it finds, or the last value if all are falsy. This is exploited
          deliberately for default-value patterns: <code>name = user_input or &quot;Anonymous&quot;</code>{' '}
          assigns <code>&quot;Anonymous&quot;</code> only if <code>user_input</code> is falsy (empty,
          None, zero, etc.).
        </Callout>

        <CodeBox label="What and/or actually return — not always a bool">{`0 or "default"        # "default" — 0 is falsy, so "or" moves on and returns the next value
"" or "default"        # "default" — same reasoning, empty string is falsy
5 and 10                 # 10 — both truthy, "and" returns the LAST value it evaluated
0 and 10                  # 0 — short-circuits immediately, never even looks at 10`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Membership and Identity Operators" />
        <SectionTitle>in, not in, is, is not</SectionTitle>

        <Para>
          Python has two operators dedicated to checking membership in a collection, and two dedicated
          to checking object identity — both read almost like plain English.
        </Para>

        <CodeBox label="Membership operators — in / not in">{`fruits = ["apple", "banana", "cherry"]

"banana" in fruits          # True
"grape" in fruits            # False
"grape" not in fruits         # True

# Also works on strings (substring check) and dicts (checks KEYS, not values):
"an" in "banana"                # True
{"a": 1, "b": 2}
"a" in {"a": 1, "b": 2}          # True — checks keys`}</CodeBox>

        <Para>
          You already met <code>is</code> and <code>is not</code> briefly in the previous module — the
          identity operators, checking whether two names point at the exact same object rather than
          merely equal values. They matter enough to restate here in the context of operators
          specifically: reserve them for <code>None</code>/<code>True</code>/<code>False</code> checks,
          and use <code>==</code>/<code>!=</code> for ordinary value comparisons.
        </Para>

        <Callout type="tip">
          <strong>in on a list is O(n); in on a set or dict is O(1).</strong> Checking membership in a
          list requires Python to potentially scan every element. Checking membership in a set or
          dict&apos;s keys uses hashing and is essentially instant regardless of size. If you are
          checking membership repeatedly against a large collection, converting it to a set first is a
          real, measurable performance improvement — a pattern you will use often once you reach the
          Sets module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Assignment Operators" />
        <SectionTitle>Compound Assignment Operators</SectionTitle>

        <CodeBox label="Compound assignment operators">{`count = 0
count += 1     # same as: count = count + 1   →  1
count -= 1     # same as: count = count - 1   →  0
count *= 5     # same as: count = count * 5   →  0
total = 10
total //= 3    # same as: total = total // 3  →  3
total **= 2     # same as: total = total ** 2  →  9`}</CodeBox>

        <Para>
          Every arithmetic and bitwise operator in Python has a compound-assignment form. These are
          purely a convenience for the common pattern of "update this variable based on its current
          value" — they do not behave differently from the expanded form for immutable types like
          numbers, but for mutable types like lists, some compound operators do modify the object in
          place rather than creating a new one, which becomes relevant once you reach the Lists module.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Bitwise Operators" />
        <SectionTitle>Bitwise Operators — Working Directly With Bits</SectionTitle>

        <Para>
          Bitwise operators manipulate the individual binary bits of integers directly. They come up
          far less often in everyday application code than arithmetic or logical operators, but they
          are genuinely used for flags, permission systems, low-level networking code, and
          performance-sensitive numeric work — and they appear often enough in technical interviews
          that skipping them entirely would leave a real gap.
        </Para>

        <CodeBox label="The six bitwise operators">{`5 & 3        # 1   AND  — bits set in BOTH operands   (0101 & 0011 = 0001)
5 | 3        # 7   OR   — bits set in EITHER operand   (0101 | 0011 = 0111)
5 ^ 3        # 6   XOR  — bits set in EXACTLY ONE      (0101 ^ 0011 = 0110)
~5           # -6  NOT  — flips every bit (equivalent to -(x + 1))
5 << 1       # 10  Left shift  — shift bits left, equivalent to multiplying by 2
5 >> 1       # 2   Right shift — shift bits right, equivalent to floor-dividing by 2`}</CodeBox>

        <Callout type="info">
          <strong>A genuinely common real use:</strong> representing a set of independent on/off flags
          efficiently as a single integer, using distinct bit positions — a pattern that shows up in
          low-level systems programming and in Unix file permissions (which you may already have
          encountered as numbers like <code>755</code>). For everyday application code, you are far
          more likely to reach for a plain boolean, a set, or an Enum (covered in the Object-Oriented
          Python phase of this track) than raw bitwise flags — but recognising this syntax immediately
          when you encounter it is a real, expected skill.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Operator Precedence" />
        <SectionTitle>Precedence — The Order Python Actually Evaluates In</SectionTitle>

        <Para>
          Just like mathematics has an order of operations (PEMDAS), Python has a defined precedence
          for every operator. From highest to lowest priority among what you have learned so far:
        </Para>

        <CodeBox label="Precedence, highest to lowest">{`1. **                     (exponentiation)
2. ~ +x -x                (bitwise NOT, unary plus/minus)
3. * / // %               (multiplication, division, floor division, modulo)
4. + -                     (addition, subtraction)
5. << >>                    (bitwise shifts)
6. &                         (bitwise AND)
7. ^                          (bitwise XOR)
8. |                           (bitwise OR)
9. == != < > <= <= in not in is is not   (comparisons, membership, identity)
10. not                        (logical not)
11. and                         (logical and)
12. or                            (logical or)`}</CodeBox>

        <CodeBox label="A precedence bug that looks correct at a glance">{`# Intention: "is the discount valid for either a member or someone spending over $100?"
is_valid = is_member or total_spent > 100 and has_coupon

# What this ACTUALLY evaluates as, because "and" binds tighter than "or":
is_valid = is_member or (total_spent > 100 and has_coupon)

# If that is not the intended logic, parentheses are required to force it:
is_valid = (is_member or total_spent > 100) and has_coupon`}</CodeBox>

        <Callout type="tip">
          <strong>The professional rule of thumb:</strong> whenever an expression mixes multiple
          different operator categories — especially <code>and</code>/<code>or</code>, or arithmetic
          mixed with bitwise operators — add explicit parentheses even where they are not strictly
          required. It costs nothing, and it removes any ambiguity for the next person reading the
          code — who is very often you, six months later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — The Walrus Operator" />
        <SectionTitle>:= — Assignment Inside an Expression</SectionTitle>

        <Para>
          Introduced in Python 3.8, the walrus operator lets you assign a value to a name{' '}
          <em>as part of</em> a larger expression, instead of requiring a separate statement first. It
          is most useful for avoiding a value being computed twice.
        </Para>

        <CodeBox label="Without the walrus operator — computed twice, or an extra line">{`import random
n = random.randint(1, 10)
if n > 5:
    print(f"{n} is greater than 5")`}</CodeBox>

        <CodeBox label="With the walrus operator — assignment inside the condition">{`import random
if (n := random.randint(1, 10)) > 5:
    print(f"{n} is greater than 5")`}</CodeBox>

        <Para>
          It is also common inside <code>while</code> loops that read data in chunks — a pattern you
          will use for real in the Reading &amp; Writing Files module:
        </Para>

        <CodeBox label="A realistic use — reading a file in fixed-size chunks">{`with open("large_file.txt") as f:
    while (chunk := f.read(1024)):
        process(chunk)
# Without the walrus operator, this needs an extra line to assign
# "chunk" before the while condition can check it.`}</CodeBox>

        <Callout type="info">
          You will not use the walrus operator constantly, but it is common enough in real code that
          you should recognise it immediately when you see it rather than be confused by the
          unfamiliar syntax.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>An Austin Ride-Share Startup&apos;s Pricing Bug</SectionTitle>

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
            Scenario — Ride-share startup, Austin · Code review
          </div>

          <Para>
            An engineer writes a rule for surge pricing eligibility: apply surge pricing if demand is
            high AND it is a weekend, OR if it is a major holiday (holidays always get surge pricing
            regardless of demand).
          </Para>

          <CodeBox label="The code submitted for review">{`apply_surge = is_high_demand and is_weekend or is_holiday`}</CodeBox>

          <SubSubTitle>What the reviewer catches</SubSubTitle>

          <Para>
            Because <code>and</code> binds tighter than <code>or</code>, this line is actually
            evaluated as <code>(is_high_demand and is_weekend) or is_holiday</code> — which happens to
            be exactly the intended logic in this specific case. The reviewer flags it anyway, not
            because it is wrong, but because nothing in the line itself tells the next reader that this
            was verified intentionally rather than accidentally correct.
          </Para>

          <CodeBox label="The revised version — same logic, unambiguous to read">{`apply_surge = (is_high_demand and is_weekend) or is_holiday`}</CodeBox>

          <Para>
            The parentheses do not change behaviour at all — Python would evaluate both versions
            identically. What changes is whether the next engineer reading this file (quite possibly
            months later, quite possibly during an incident at 2am) has to mentally re-derive Python&apos;s
            precedence rules to trust the logic, or can simply read it. This is precisely the kind of
            change that gets requested constantly in real code review, and precisely why Part 07&apos;s
            "always parenthesise mixed and/or" rule of thumb is not a stylistic nicety — it is a
            practice that prevents real, dangerous ambiguity in business-critical logic like pricing.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Operators</SectionTitle>

        {[
          {
            wrong: '"and and or always return True or False"',
            right: 'They return one of their actual operands, not necessarily a boolean. or returns the first truthy value (or the last value, if none are truthy); and returns the first falsy value (or the last value, if all are truthy). This is used deliberately for default-value patterns like "value = user_input or default".',
          },
          {
            wrong: '"is and == are interchangeable for checking equality"',
            right: 'is checks identity (the same object in memory); == checks value equality. They coincidentally agree for small cached integers, which is exactly what makes this misconception dangerous — see Module 02\'s deep dive on CPython\'s small-integer cache.',
          },
          {
            wrong: '"Parentheses around and/or are just extra characters that don\'t change anything"',
            right: 'They don\'t change Python\'s evaluation in cases where the expression already unambiguously matches operator precedence — but as the Real World example above shows, they change whether the NEXT PERSON reading the code has to re-derive precedence rules to trust the logic. Treat them as documentation, not just syntax.',
          },
          {
            wrong: '"Bitwise operators are only relevant for embedded/systems programming"',
            right: 'They come up in application code more than beginners expect — permission flag systems, hashing algorithms, certain performance optimisations, and they are a genuinely common interview topic used to check whether a candidate understands how integers are represented at the bit level, not just how to use them.',
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
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between / and // in Python?',
            a: '/ is true division and always returns a float, even when the result is a whole number (10 / 2 is 5.0). // is floor division — it divides and then rounds DOWN to the nearest integer (toward negative infinity, not toward zero), which matters for negative numbers: -7 // 2 is -4, not -3.',
          },
          {
            q: 'Explain short-circuit evaluation and give a real example of why it matters.',
            a: 'Python stops evaluating an and/or expression as soon as the overall result is determined, without evaluating the remaining operands. This matters practically as a safety pattern: "if user is not None and user.name == \'Maria\':" never evaluates user.name unless user is already confirmed not to be None, preventing an AttributeError that would otherwise crash the program.',
          },
          {
            q: 'What does the expression "5 or 10" evaluate to, and why?',
            a: '5. The or operator returns the first truthy operand it encounters — 5 is truthy, so evaluation stops there and 5 is returned, without even looking at 10. and/or do not always return True/False; they return one of their actual operands.',
          },
          {
            q: 'Why does Python allow chained comparisons like "18 <= age <= 65", and what is happening under the hood?',
            a: 'It is genuine syntax sugar for "18 <= age and age <= 65", evaluated with the same short-circuiting behaviour — if the first comparison is False, the second is never evaluated. It reads more naturally and matches standard mathematical notation for ranges.',
          },
          {
            q: 'A colleague writes: is_eligible = has_id and age >= 18 or is_admin. What could go wrong, and how would you fix it?',
            a: 'Because "and" binds tighter than "or", this evaluates as (has_id and age >= 18) or is_admin. If that IS the intended logic, it happens to be correct — but it is genuinely ambiguous to a reader without recalling precedence rules from memory. The fix is not a behaviour change but a clarity change: add explicit parentheses, (has_id and age >= 18) or is_admin, so the intent is unambiguous without requiring the reader to derive it.',
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
            a: 'As shown in Part 07 and the Real World example, "and" silently binds tighter than "or". This produces a program that runs without error but makes the wrong decision — the most dangerous kind of bug because nothing crashes to alert you.',
          },
          {
            q: 'Using is to compare numbers or strings',
            a: 'a is b for two variables holding the value 5 might return True due to CPython\'s internal small-integer caching — but the exact same code with the value 1000 returns False. Never rely on this; use == for value comparison.',
          },
          {
            q: 'Confusing bitwise & / | with logical and / or',
            a: 'x & y is a bitwise AND on the binary representation of integers, not a logical AND on truthiness. Using & where and was intended (or vice versa) is a classic, hard-to-spot bug because both are valid syntax that just silently produce a different — and usually wrong — result.',
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
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit With Operators — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: unsupported operand type(s) for +: 'int' and 'str'`,
            cause: 'Attempting to add or otherwise combine two incompatible types directly, most commonly a number and a string — Python will not silently convert one for you.',
            fix: 'Convert explicitly: str(number) + text, or better, build the combined value with an f-string, covered in depth in the Strings module.',
          },
          {
            error: `TypeError: '>' not supported between instances of 'str' and 'int'`,
            cause: 'Using an ordering comparison (<, >, <=, >=) between genuinely incompatible types. Python 3 deliberately raises an error here rather than guessing, unlike Python 2, which allowed this and produced arbitrary, meaningless results.',
            fix: 'Convert both sides to the same type before comparing — e.g. int(user_input) > 5 rather than user_input > 5 where user_input is a string.',
          },
          {
            error: `ZeroDivisionError: division by zero`,
            cause: 'Attempting / or // with a divisor of exactly zero. Unlike some languages that produce infinity or NaN silently, Python raises an exception immediately.',
            fix: 'Check the divisor before dividing, or handle the exception with try/except — covered in full in the Exception Handling module later in this track.',
          },
          {
            error: `SyntaxError: invalid syntax (when using := outside parentheses in certain contexts)`,
            cause: 'The walrus operator has specific syntactic rules about where it can appear — it generally needs to be wrapped in parentheses when used as part of a larger expression rather than as a standalone statement.',
            fix: 'Wrap the walrus assignment in parentheses: if (n := get_value()) > 5: rather than if n := get_value() > 5: (which also has a DIFFERENT precedence problem — := binds looser than comparisons, so that line would try to assign the result of "get_value() > 5" to n, not get_value() itself).',
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
        '/ always returns a float, even when the division is exact. Use // for floor division when you need an integer result — it rounds toward negative infinity, not toward zero.',
        'Python 3 raises a TypeError for incompatible ordering comparisons (str > int) instead of silently guessing, unlike Python 2.',
        'in/not in check membership; is/is not check identity. Membership checks are O(1) on sets and dicts but O(n) on lists — convert to a set for repeated membership checks on large collections.',
        'and/or short-circuit and return one of their actual operands, not necessarily True/False — used deliberately for default-value patterns.',
        'Bitwise operators (&, |, ^, ~, <<, >>) operate on the binary representation of integers — distinct from the logical and/or/not operators, and a common source of hard-to-spot bugs when confused with them.',
        'and binds tighter than or. Always parenthesise mixed and/or expressions explicitly, even when not strictly required — it documents intent for the next reader.',
        'The walrus operator (:=) assigns a value as part of a larger expression — most common inside while loops reading data in chunks, and in comprehensions.',
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
