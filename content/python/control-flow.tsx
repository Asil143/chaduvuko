import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Control Flow — if / elif / else — Python | Chaduvuko',
  description:
    'How Python actually evaluates truthiness, every form of conditional logic, structural pattern matching, and the readability patterns senior engineers actually use.',
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

export default function ControlFlow() {
  return (
    <LearnLayout
      title="Control Flow — if / elif / else"
      description="How Python evaluates truthiness, every form of conditional logic, structural pattern matching, and real readability patterns."
      section="Python — Module 05"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Basics" />
        <SectionTitle>if, elif, else — And Why Indentation Is Not Optional</SectionTitle>

        <Para>
          Python uses indentation, not curly braces, to define which lines of code belong inside a
          conditional block. This is not a stylistic preference — it is the syntax. The standard,
          near-universal convention is <strong>4 spaces</strong> per indentation level (never tabs, and
          never mixed tabs and spaces — Python will refuse to run code that mixes them within the same
          block).
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
          <strong>first</strong> one that is true — every later condition is skipped entirely, even if
          it would also have been true. <code>elif</code> is Python&apos;s spelling of "else if" —
          there is no separate <code>else if</code> keyword pair, and you can chain as many{' '}
          <code>elif</code> blocks as you need. <code>else</code> is always optional; a program with
          only <code>if</code> and no <code>else</code> is completely valid, it simply does nothing
          when the condition is false.
        </Para>

        <Callout type="warning">
          <strong>Indentation must be consistent within a block.</strong> Mixing 2 spaces on one line
          and 4 on the next inside the same block raises an <code>IndentationError</code>. Configure
          your editor to insert spaces (not a literal tab character) when you press Tab — VS Code with
          the Python extension does this correctly by default.
        </Callout>

        <SubTitle>Single-line if statements</SubTitle>

        <Para>
          Python permits writing a simple <code>if</code> body on the same line, without an indented
          block — legal, but generally discouraged for anything beyond the most trivial single
          statement, since it becomes hard to read and hard to extend if a second statement needs
          adding later.
        </Para>

        <CodeBox label="Legal, but not recommended for real code">{`if age >= 18: print("Adult")

# Preferred, even for one line — clearer, and trivially extensible:
if age >= 18:
    print("Adult")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Truthy and Falsy Values" />
        <SectionTitle>What Python Actually Evaluates as True or False</SectionTitle>

        <Para>
          An <code>if</code> condition does not need to be a literal <code>True</code>/
          <code>False</code> — Python evaluates <strong>any</strong> value for truthiness. Every value
          is considered truthy <strong>except</strong> a specific, well-defined set of falsy values.
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
          <strong>Idiomatic Python favours truthiness checks over explicit comparisons.</strong> Write{' '}
          <code>if items:</code> rather than <code>if len(items) &gt; 0:</code>, and{' '}
          <code>if name:</code> rather than <code>if name != &quot;&quot;:</code>. This is not just
          shorter — it is the style every experienced Python reviewer expects, and linters like{' '}
          <code>pylint</code> will flag the more verbose form.
        </Callout>

        <SubTitle>How custom objects define their own truthiness</SubTitle>

        <Para>
          You will not need this until the Object-Oriented Python phase of this track, but it is worth
          knowing now that truthiness is not hardcoded for every type — a custom class can define its
          own truthiness rules by implementing a special method called <code>__bool__</code>. This is
          exactly how <code>if items:</code> works for a list: Python calls the list&apos;s internal
          truthiness logic, which reports "falsy" for an empty list and "truthy" for a non-empty one.
        </Para>
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

        <Para>
          The conditional expression is genuinely idiomatic when used inside another expression, not
          just for simple standalone assignment — for example, inside an f-string or as a function
          argument, where a full if/else block cannot syntactically appear at all.
        </Para>

        <CodeBox label="Where conditional expressions genuinely earn their place">{`count = 3
print(f"You have {count} item{'s' if count != 1 else ''}")
# "You have 3 items" — correctly pluralised in a single line

result = max(0, value if value > 0 else 0)  # inside a function call argument`}</CodeBox>

        <Callout type="warning">
          <strong>Do not chain more than one conditional expression on a single line.</strong>{' '}
          <code>x = &quot;A&quot; if a else &quot;B&quot; if b else &quot;C&quot;</code> technically
          works, but it is genuinely hard to read at a glance and is a common target of code review
          feedback. If you need more than one branch, write a full{' '}
          <code>if</code>/<code>elif</code>/<code>else</code> block instead — clarity beats brevity
          here.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Nested Conditions and Readability" />
        <SectionTitle>Guard Clauses — Avoiding the Arrow of Doom</SectionTitle>

        <Para>
          Deeply nested <code>if</code> statements are one of the most common readability problems in
          beginner code — sometimes called the "arrow of doom" because the code visually drifts
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
          throughout professional Python codebases, and you will see this exact restructuring requested
          constantly in real code reviews. Handle the exceptional/failure cases first and exit early;
          keep the main logic unindented and easy to scan.
        </Callout>

        <SubTitle>Combining conditions to reduce nesting</SubTitle>

        <Para>
          Not every nested <code>if</code> needs a guard-clause rewrite — sometimes the cleanest fix is
          simply combining conditions with <code>and</code>, which you already met in the Operators
          module.
        </Para>

        <CodeBox label="Combining conditions instead of nesting">{`# Nested — unnecessary, since both checks lead to the same single outcome
if age >= 18:
    if has_id:
        print("Entry allowed")

# Flat — identical behaviour, easier to read
if age >= 18 and has_id:
    print("Entry allowed")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structural Pattern Matching" />
        <SectionTitle>match / case — Python&apos;s Modern Switch Statement</SectionTitle>

        <Para>
          Introduced in Python 3.10, <code>match</code>/<code>case</code> gives Python a form of switch
          statement — but significantly more powerful, since it can match on structure and type, not
          just simple equality.
        </Para>

        <CodeBox label="Basic match/case — matching literal values">{`def describe_status(code):
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

        <SubTitle>Structural matching — where match/case genuinely goes beyond a switch statement</SubTitle>

        <Para>
          The real power of <code>match</code> is matching against the <em>shape</em> of data, not just
          a single value — genuinely something a traditional switch statement cannot do.
        </Para>

        <CodeBox label="Matching the structure of a dict — a shape a switch statement cannot express">{`def handle_event(event):
    match event:
        case {"type": "click", "x": x, "y": y}:
            return f"Click at ({x}, {y})"
        case {"type": "keypress", "key": key}:
            return f"Key pressed: {key}"
        case {"type": type_name}:
            return f"Unhandled event type: {type_name}"
        case _:
            return "Not a recognised event"

handle_event({"type": "click", "x": 10, "y": 20})
# "Click at (10, 20)" — x and y are extracted from the dict automatically`}</CodeBox>

        <CodeBox label="Matching the structure of a tuple, with a guard condition">{`def classify_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (x, 0):
            return f"On the x-axis at {x}"
        case (0, y):
            return f"On the y-axis at {y}"
        case (x, y) if x == y:
            return "On the diagonal"
        case (x, y):
            return f"Point at ({x}, {y})"

classify_point((3, 3))    # "On the diagonal" — the "if" after a case is a guard condition`}</CodeBox>

        <Callout type="info">
          You will use plain <code>if</code>/<code>elif</code>/<code>else</code> far more often than{' '}
          <code>match</code>/<code>case</code> in everyday code — it genuinely shines for a specific
          case: matching against several discrete, known values, or unpacking structured data like a
          dict or tuple shape, which you will use for real once you reach the Object-Oriented Python
          and Advanced Python phases of this track, particularly when working with API responses and
          parsed data.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — assert" />
        <SectionTitle>assert — Sanity-Checking Assumptions During Development</SectionTitle>

        <Para>
          <code>assert</code> checks that a condition is true, and raises an{' '}
          <code>AssertionError</code> immediately if it is not. It is a control-flow-adjacent tool used
          to catch programming mistakes early, not to validate user input or handle expected failure
          cases (that is what the Exception Handling module, later in this track, is for).
        </Para>

        <CodeBox label="assert in practice">{`def calculate_discount(price, percent):
    assert 0 <= percent <= 100, f"Invalid discount percent: {percent}"
    return price * (1 - percent / 100)

calculate_discount(100, 20)     # 80.0 — fine
calculate_discount(100, 150)    # AssertionError: Invalid discount percent: 150`}</CodeBox>

        <Callout type="warning">
          <strong>assert is not a substitute for proper error handling.</strong> Python can be run with
          optimisations that strip out every <code>assert</code> statement entirely (the{' '}
          <code>-O</code> flag) — meaning code that relies on <code>assert</code> to enforce a real
          business rule can silently stop checking anything at all in that mode. Use{' '}
          <code>assert</code> for catching your own programming mistakes during development (an
          "impossible" state that should never happen if the code is correct) — never for validating
          data that comes from users, files, or external APIs, which will be covered properly with
          exceptions later in this track.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — pass" />
        <SectionTitle>pass — The Explicit &quot;Do Nothing&quot; Statement</SectionTitle>

        <Para>
          Python&apos;s indentation-based syntax requires every block to have at least one statement
          inside it — an <code>if</code>, <code>for</code>, <code>def</code>, or <code>class</code>{' '}
          with a genuinely empty body is a <code>SyntaxError</code>. <code>pass</code> is a statement
          that does precisely nothing, existing solely to satisfy this requirement.
        </Para>

        <CodeBox label="pass as a placeholder">{`def function_to_implement_later():
    pass   # a stub — the function exists and is callable, but does nothing yet

if condition:
    pass    # deliberately no action for this case
else:
    do_something()`}</CodeBox>

        <Para>
          This comes up constantly during early development — sketching out the shape of a program
          (which functions and classes will exist) before filling in their real logic, and needing
          something syntactically valid to write in the meantime.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Code Review at a Boston Logistics Startup</SectionTitle>

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
            Scenario — Logistics startup, Boston · Pull request review
          </div>

          <Para>
            A new engineer submits a function that determines a shipment&apos;s status message based on
            its delivery state — a genuinely reasonable first attempt at the logic.
          </Para>

          <CodeBox label="The original submission">{`def get_status_message(shipment):
    if shipment is not None:
        if shipment.is_delivered == True:
            if shipment.signature_received == True:
                message = "Delivered and signed for"
            else:
                if shipment.left_at_door == True:
                    message = "Delivered — left at door"
                else:
                    message = "Delivered"
        else:
            message = "In transit"
    else:
        message = "Shipment not found"
    return message`}</CodeBox>

          <SubSubTitle>What the reviewer flags</SubSubTitle>

          <Para>
            Three separate issues, each directly traceable to earlier parts of this module: the deep
            nesting is a textbook case for guard clauses (Part 04); every <code>== True</code>{' '}
            comparison should simply be the condition itself, since <code>shipment.is_delivered</code>{' '}
            is already a boolean (a truthiness-check idiom, Part 02); and the logic can be flattened
            entirely into ordered <code>elif</code> branches, since these are genuinely mutually
            exclusive outcomes, not independent nested decisions.
          </Para>

          <CodeBox label="The revised version">{`def get_status_message(shipment):
    if shipment is None:
        return "Shipment not found"
    if not shipment.is_delivered:
        return "In transit"
    if shipment.signature_received:
        return "Delivered and signed for"
    if shipment.left_at_door:
        return "Delivered — left at door"
    return "Delivered"`}</CodeBox>

          <Para>
            Same behaviour, eight lines shorter, and every branch is readable in isolation without
            mentally tracking four levels of nested indentation. This exact transformation — flatten
            nested conditionals, drop redundant <code>== True</code> comparisons, use guard clauses for
            early exits — is quite possibly the single most common category of feedback given in real
            Python code review for engineers early in their career.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Control Flow</SectionTitle>

        {[
          {
            wrong: '"match/case is just Python\'s version of switch from other languages"',
            right: 'It can do everything a switch statement does, but its real strength is structural matching — pulling apart the shape of a dict or tuple as part of the match itself, something a traditional switch statement has no equivalent for.',
          },
          {
            wrong: '"assert is a good way to validate user input"',
            right: 'assert statements can be globally stripped out when Python runs with the -O optimisation flag, meaning any validation logic living inside an assert can silently vanish. Use assert only for catching your own programming mistakes during development; use proper exception handling (covered later in this track) for anything involving real user or external data.',
          },
          {
            wrong: '"Nested if statements are just how you express complex logic"',
            right: 'Deep nesting is very often a readability problem with a straightforward fix — guard clauses, combining conditions with and, or flattening mutually-exclusive branches into if/elif/else, exactly as shown in the code review example above.',
          },
          {
            wrong: '"if x == True: is clearer than if x: because it\'s more explicit"',
            right: 'It is considered less idiomatic, not more explicit — x is already a boolean, so comparing it to True adds a redundant step for the reader, and every Python style guide and linter flags it. if x: is the expected, idiomatic form.',
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
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is a guard clause, and why is it preferred over deeply nested conditionals?',
            a: 'A guard clause handles failure/exceptional conditions first with an early return, rather than nesting the "happy path" logic inside multiple levels of if statements. It keeps the main logic at a single indentation level, making it far easier to read and reason about — a deeply nested structure requires holding every enclosing condition in your head to understand any inner line, while guard clauses let each check be read and dismissed independently.',
          },
          {
            q: 'List the values that Python considers falsy.',
            a: 'False, None, 0, 0.0, the empty string "", and empty collections: [], {}, (), and set(). Every other value — including "0" as a string, and any non-empty collection — is truthy.',
          },
          {
            q: 'What does match/case offer beyond what a chain of if/elif/else can do?',
            a: 'Structural pattern matching — the ability to match against the SHAPE of data, not just a single value, extracting variables from a dict or tuple as part of the match itself (e.g. case {"type": "click", "x": x, "y": y}:). A chain of if/elif/else can express equivalent logic, but requires manually accessing and validating the structure inside each branch rather than expressing it declaratively in the pattern itself.',
          },
          {
            q: 'Why is assert not a safe way to validate data from an external source, like user input or an API response?',
            a: 'Python can run with the -O (optimize) flag, which strips out every assert statement in the program entirely. Any check written as an assert can therefore silently disappear depending on how the program is run — which is fine for catching your own logic errors during development, but unacceptable for validating data whose correctness the program actually depends on. Real input validation should use explicit if checks and raised exceptions instead.',
          },
          {
            q: 'What is the purpose of the pass statement?',
            a: 'It is a no-op — a statement that does nothing, used to satisfy Python\'s requirement that every indented block contain at least one statement. It is most commonly used as a placeholder in a function, class, or conditional branch that has not been implemented yet, or where a branch is intentionally meant to do nothing.',
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
            a: 'This works but is not idiomatic and is flagged by every Python linter. Write if x: or if not x: instead — as shown in the code review example, this is one of the most common pieces of real-world feedback given to engineers early in their careers.',
          },
          {
            q: 'Not realising elif conditions are only checked if all prior ones were False',
            a: 'A common bug: writing several independent if statements when elif was intended, causing multiple blocks to run when only one should. If the conditions are meant to be mutually exclusive alternatives, use elif — not a sequence of separate if statements.',
          },
          {
            q: 'Using assert to validate data from users or external sources',
            a: 'As covered in Part 06, assert statements can be stripped out entirely when Python runs with the -O flag. Never rely on assert for anything the correctness of your program actually depends on in production.',
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
        <SectionTitle>Errors You Will Hit With Control Flow — And Exactly Why</SectionTitle>

        {[
          {
            error: `IndentationError: expected an indented block after 'if' statement on line 3`,
            cause: 'An if, elif, else, for, while, def, or class line ends with a colon but the following line is not indented — Python requires at least one indented statement to follow.',
            fix: 'Indent the line(s) that should belong to that block. If the block is genuinely meant to do nothing, use "pass" as a placeholder rather than leaving it empty.',
          },
          {
            error: `IndentationError: unindent does not match any outer indentation level`,
            cause: 'Mixed use of tabs and spaces, or an inconsistent number of spaces, within the same logical block — Python cannot determine which enclosing block the line is meant to belong to.',
            fix: 'Configure your editor to insert spaces (not tab characters) for indentation, and use "Convert Indentation to Spaces" if a file already has mixed tabs/spaces. VS Code with the Python extension handles this correctly by default.',
          },
          {
            error: `AssertionError`,
            cause: 'An assert statement\'s condition evaluated to False. By design, this is meant to happen only when your own code reaches a state you believed was impossible.',
            fix: 'Read the assertion message (if one was provided) and the surrounding logic — this signals a genuine bug in your program\'s assumptions, not something to silence or catch. Fix the underlying logic error rather than removing the assertion.',
          },
          {
            error: `SyntaxError: invalid syntax (on a match/case block)`,
            cause: 'match/case requires Python 3.10 or newer. Running match/case syntax on an older Python version produces a SyntaxError, since the interpreter does not recognise the keywords at all.',
            fix: 'Confirm your Python version with python3 --version. If you are on an older version, either upgrade or rewrite the logic as if/elif/else, which works on every Python 3 version.',
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
        'Python uses indentation (4 spaces, by convention) to define blocks — not braces. Every if/elif/else/for/while/def/class line ends with a colon.',
        'Only the first matching elif/else branch runs — Python stops checking as soon as one condition is true.',
        'Every value has a truthiness. Falsy values are exactly: False, None, 0, 0.0, "", [], {}, (), and set(). Everything else is truthy.',
        'Idiomatic Python favours truthiness checks (if items:) over explicit comparisons (if len(items) > 0: or if x == True:).',
        'Guard clauses (handling failure cases first with early returns) are the standard professional pattern for avoiding deeply nested conditionals — one of the most common real code review requests.',
        'match/case (Python 3.10+) is a more powerful switch-statement alternative, capable of structurally matching the shape of dicts and tuples, not just comparing single values.',
        'assert checks your own assumptions during development and can be globally stripped out with the -O flag — never use it to validate external or user-provided data.',
        'pass is a no-op statement used as a placeholder wherever Python\'s syntax requires a non-empty indented block.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 06 (Loops) and the rest of the Python Foundations phase are being written now and will
          go live soon. In the meantime, browse the full 46-module curriculum below.
        </p>
        <Link href="/learn/python" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          ← Back to the Python track
        </Link>
      </div>
    </LearnLayout>
  )
}
