import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Control Flow — if / elif / else — Python | Chaduvuko',
  description:
    'How Python actually evaluates truthiness, every form of conditional logic, and the readability patterns senior engineers actually use.',
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

export default function ControlFlow() {
  return (
    <LearnLayout
      title="Control Flow — if / elif / else"
      description="How Python evaluates truthiness, every form of conditional logic, and real readability patterns."
      section="Python — Module 05"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Basics" />
        <SectionTitle>if, elif, else — And Why Indentation Is Not Optional</SectionTitle>

        <Para>
          Python uses indentation, not curly braces, to define which lines of code belong inside a
          conditional block. This is not a stylistic preference — it is the syntax. The standard,
          near-universal convention is <strong>4 spaces</strong> per indentation level (never tabs,
          and never mixed tabs and spaces — Python will refuse to run code that mixes them).
        </Para>

        <CodeBox label="Basic if / elif / else">{`age = 20

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# Output: Adult`}</CodeBox>

        <Para>
          Python evaluates the conditions top to bottom and runs the block under the{' '}
          <strong>first</strong> one that is true — every later condition is skipped entirely, even
          if it would also have been true. <code>elif</code> is Python&apos;s spelling of "else if" —
          there is no separate <code>else if</code> keyword pair, and you can chain as many{' '}
          <code>elif</code> blocks as you need.
        </Para>

        <Callout type="warning">
          <strong>Indentation must be consistent within a block.</strong> Mixing 2 spaces on one
          line and 4 on the next inside the same block raises an{' '}
          <code>IndentationError</code>. Configure your editor to insert spaces (not a literal tab
          character) when you press Tab — VS Code with the Python extension does this correctly by
          default.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Truthy and Falsy Values" />
        <SectionTitle>What Python Actually Evaluates as True or False</SectionTitle>

        <Para>
          An <code>if</code> condition does not need to be a literal <code>True</code>/
          <code>False</code> — Python evaluates <strong>any</strong> value for truthiness. Every
          value is considered truthy <strong>except</strong> a specific, well-defined set of falsy
          values.
        </Para>

        <CodeBox label="The complete list of falsy values in Python">{`False
None
0            # the integer zero
0.0          # the float zero
""           # an empty string
[]           # an empty list
{}           # an empty dict
()           # an empty tuple
set()        # an empty set

# Everything else is truthy — including "0" (a non-empty string!), [0], and -1`}</CodeBox>

        <CodeBox label="This is why you can write conditions like this">{`items = []

if items:
    print(f"You have {len(items)} items")
else:
    print("Your list is empty")

# Equivalent to, but more idiomatic than:
if len(items) > 0:
    ...`}</CodeBox>

        <Callout type="tip">
          <strong>Idiomatic Python favours truthiness checks over explicit comparisons.</strong>{' '}
          Write <code>if items:</code> rather than <code>if len(items) &gt; 0:</code>, and{' '}
          <code>if name:</code> rather than <code>if name != &quot;&quot;:</code>. This is not just
          shorter — it is the style every experienced Python reviewer expects, and linters like{' '}
          <code>pylint</code> will flag the more verbose form.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Conditional Expressions" />
        <SectionTitle>The Ternary Expression — if/else in a Single Line</SectionTitle>

        <Para>
          Python&apos;s conditional expression (sometimes called a ternary) lets you choose between two
          values in a single expression, useful when assigning a value based on a condition without
          writing a full multi-line if/else block.
        </Para>

        <CodeBox label="Conditional expression syntax">{`age = 20
status = "Adult" if age >= 18 else "Minor"

# Equivalent to the longer form:
if age >= 18:
    status = "Adult"
else:
    status = "Minor"`}</CodeBox>

        <Callout type="warning">
          <strong>Do not chain more than one conditional expression on a single line.</strong>{' '}
          <code>x = "A" if a else "B" if b else "C"</code> technically works, but it is genuinely hard
          to read at a glance and is a common target of code review feedback. If you need more than
          one branch, write a full <code>if</code>/<code>elif</code>/<code>else</code> block instead
          — clarity beats brevity here.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Nested Conditions and Readability" />
        <SectionTitle>Guard Clauses — Avoiding the Arrow of Doom</SectionTitle>

        <Para>
          Deeply nested <code>if</code> statements are one of the most common readability problems
          in beginner code — sometimes called the "arrow of doom" because the code visually drifts
          rightward with every nested level.
        </Para>

        <CodeBox label="Deeply nested — hard to follow">{`def process_order(order):
    if order is not None:
        if order.is_paid:
            if order.items:
                if order.shipping_address:
                    return "Ready to ship"
                else:
                    return "Missing shipping address"
            else:
                return "No items in order"
        else:
            return "Payment required"
    else:
        return "No order provided"`}</CodeBox>

        <Para>
          A <strong>guard clause</strong> restructures this by handling the failure conditions first
          and returning early, so the "happy path" is not nested inside four levels of indentation.
        </Para>

        <CodeBox label="Guard clauses — flat and easy to follow">{`def process_order(order):
    if order is None:
        return "No order provided"
    if not order.is_paid:
        return "Payment required"
    if not order.items:
        return "No items in order"
    if not order.shipping_address:
        return "Missing shipping address"

    return "Ready to ship"`}</CodeBox>

        <Callout type="tip">
          This is not just a stylistic preference — guard clauses are the standard pattern used
          throughout professional Python codebases, and you will see this exact restructuring
          requested constantly in real code reviews. Handle the exceptional/failure cases first and
          exit early; keep the main logic unindented and easy to scan.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structural Pattern Matching" />
        <SectionTitle>match / case — Python&apos;s Modern Switch Statement</SectionTitle>

        <Para>
          Introduced in Python 3.10, <code>match</code>/<code>case</code> gives Python a form of
          switch statement — but significantly more powerful, since it can match on structure and
          type, not just simple equality.
        </Para>

        <CodeBox label="Basic match/case">{`def describe_status(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500 | 502 | 503:
            return "Server Error"
        case _:
            return "Unknown status"

describe_status(404)   # "Not Found"
describe_status(502)   # "Server Error" — the | matches multiple values in one case
describe_status(999)   # "Unknown status" — the _ is a wildcard, matching anything`}</CodeBox>

        <Callout type="info">
          You will use plain <code>if</code>/<code>elif</code>/<code>else</code> far more often than{' '}
          <code>match</code>/<code>case</code> in everyday code — it genuinely shines for a specific
          case: matching against several discrete, known values or unpacking structured data (like a
          dict shape or a tuple), which you will see used in real projects once you reach the
          Object-Oriented Python and Advanced Python phases of this track.
        </Callout>
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Control Flow Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the colon at the end of an if/elif/else line',
            a: 'if age >= 18 without a trailing colon raises a SyntaxError. The colon is what tells Python an indented block follows — it is required on every if, elif, else, for, while, def, and class line.',
          },
          {
            q: 'Using = instead of == inside a condition',
            a: 'if age = 18: is a SyntaxError in Python (unlike some other languages, where accidental assignment inside a condition silently compiles and causes a logic bug). Python protects you here — but it is still worth typing == deliberately rather than relying on the error message to catch it.',
          },
          {
            q: 'Writing if x == True: or if x == False:',
            a: 'This works but is not idiomatic and is flagged by every Python linter. Write if x: or if not x: instead — comparing directly to True/False is both slower and considered a beginner tell in code review.',
          },
          {
                q: 'Not realising elif conditions are only checked if all prior ones were False',
            a: 'A common bug: writing several independent if statements when elif was intended, causing multiple blocks to run when only one should. If the conditions are meant to be mutually exclusive alternatives, use elif — not a sequence of separate if statements.',
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
        'Python uses indentation (4 spaces, by convention) to define blocks — not braces. Every if/elif/else/for/while/def/class line ends with a colon.',
        'Only the first matching elif/else branch runs — Python stops checking as soon as one condition is true.',
        'Every value has a truthiness. Falsy values are exactly: False, None, 0, 0.0, "", [], {}, (), and set(). Everything else is truthy.',
        'Idiomatic Python favours truthiness checks (if items:) over explicit comparisons (if len(items) > 0:).',
        'The conditional expression (x if condition else y) is useful for simple single-line choices — avoid chaining more than one on a single line.',
        'Guard clauses (handling failure cases first with early returns) are the standard professional pattern for avoiding deeply nested conditionals.',
        'match/case (Python 3.10+) is a more powerful switch-statement alternative, best suited to matching several discrete values or structured data.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 06 (Loops) and the rest of the Python Foundations phase are being written now and
          will go live soon. In the meantime, browse the full 46-module curriculum below.
        </p>
        <Link href="/learn/python" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          ← Back to the Python track
        </Link>
      </div>
    </LearnLayout>
  )
}
