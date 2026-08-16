import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Regular Expressions with re — Python | Chaduvuko',
  description:
    'What regex is actually for, when it is the wrong tool, the re module built up systematically from literal characters to capturing groups, and a real log-parsing example.',
}

const C = '#4285f4'

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

export default function RegularExpressions() {
  return (
    <LearnLayout
      title="Regular Expressions with re"
      description="What regex is actually for, when it's overkill, the re module built up systematically, and a real log-parsing example."
      section="Python — Module 32"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Welcome to Phase 5" />
        <SectionTitle>Advanced Python Starts Here</SectionTitle>

        <Para>
          This module opens <strong>Phase 5 — Advanced Python</strong>, the most demanding phase of
          this track before you move into production-readiness and career topics in Phase 6. Everything
          up to this point — variables, control flow, functions, data structures, files, exceptions,
          object-oriented Python — was about writing correct programs. Phase 5 is about writing programs
          that hold up under real-world pressure: text that does not arrive in a clean shape, time zones
          that do not line up, work that needs to happen concurrently instead of one line at a time, and
          code whose types and behaviour need to survive contact with other engineers and other systems.
          Regular expressions are the right place to start, because pattern matching in text turns out to
          be a dependency of almost everything else in this phase — log parsing, API response cleanup,
          and data validation all lean on it constantly.
        </Para>

        <Para>
          A <strong>regular expression</strong> (regex, for short) is a small, dense language for
          describing a <em>pattern</em> that text either matches or does not. Instead of writing loops and
          conditionals to inspect a string character by character, you describe the shape you are looking
          for once, and Python's <code>re</code> module does the character-by-character work for you.
          Regex shows up constantly in real engineering work: validating that a string looks like an
          email address before accepting it, pulling a request ID out of a log line, splitting a
          messy CSV field on multiple possible delimiters, or finding every URL inside a block of text.
        </Para>

        <CodeBox label="A first taste — is this a valid-looking US zip code?">{`import re

zip_code = "80202"

if re.match(r"^\\d{5}$", zip_code):
    print("Looks like a valid 5-digit zip code")
else:
    print("Not a valid zip code shape")

# "Looks like a valid 5-digit zip code"`}</CodeBox>

        <Para>
          That single pattern — <code>^\d&#123;5&#125;$</code> — says "exactly five digits, and nothing
          else." By the end of this module you will be able to read that immediately. Regex syntax looks
          intimidating in bulk, but it is built from a genuinely small set of building blocks combined
          together — this module introduces them one at a time, in order, so nothing feels like it
          appeared from nowhere.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — When Regex Is (and Isn't) the Right Tool" />
        <SectionTitle>An Honest Take Before You Learn the Syntax</SectionTitle>

        <Para>
          Before diving into syntax, it is worth being direct about something most tutorials skip:{' '}
          <strong>regex is frequently the wrong tool</strong>, reached for out of habit rather than
          necessity. You already know Module 04's string methods —{' '}
          <code>.startswith()</code>, <code>.endswith()</code>, <code>.split()</code>,{' '}
          <code>in</code> — and Module 14's string-processing techniques. For a huge share of everyday
          text checks, those are faster to write, faster to read, and faster to execute than a regex.
        </Para>

        <CodeBox label="When plain string methods are simply better">{`# Checking a prefix — regex is unnecessary here
if filename.startswith("invoice_"):      # clear
    ...
# vs
if re.match(r"^invoice_", filename):      # works, but adds no value over the line above

# Checking for a substring — same story
if "error" in log_line.lower():           # clear and fast
    ...
# vs
if re.search(r"error", log_line, re.IGNORECASE):   # heavier than it needs to be`}</CodeBox>

        <Para>
          Reach for regex specifically when the pattern you are matching has real{' '}
          <strong>structure</strong> that plain string methods cannot express — "one or more digits,
          optionally followed by a decimal point and more digits," or "a sequence of letters, then a
          dash, then exactly four digits." That is a genuinely different kind of problem than "does this
          string start with a fixed prefix," and it is exactly the kind of problem this module is about.
        </Para>

        <Callout type="tip">
          A useful rule of thumb from experienced engineers: if you can describe what you are matching
          in one plain sentence using only "starts with," "ends with," "contains," or "equals," write it
          with string methods. If your sentence needs "one or more," "any digit," "optionally," or "any
          of these characters," reach for <code>re</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Core re Functions" />
        <SectionTitle>match, search, findall, sub, split</SectionTitle>

        <Para>
          The <code>re</code> module is part of Python's standard library — no installation required.
          Five functions cover the overwhelming majority of real regex usage, and it is worth learning
          the difference between them precisely, because mixing them up is one of the most common
          regex mistakes in real code.
        </Para>

        <CodeBox label="re.match — only checks the START of the string">{`import re

re.match(r"\\d+", "42 apples")     # matches — "42" is found at position 0
re.match(r"\\d+", "I have 42 apples")  # None — the string does not START with digits`}</CodeBox>

        <CodeBox label="re.search — checks the WHOLE string for the first match, anywhere">{`re.search(r"\\d+", "I have 42 apples")   # matches — finds "42" anywhere in the string
re.search(r"\\d+", "no numbers here")     # None — no digits anywhere`}</CodeBox>

        <CodeBox label="re.findall — returns EVERY match as a list">{`re.findall(r"\\d+", "I have 42 apples and 7 oranges")
# ['42', '7'] — a plain list of strings, every match found`}</CodeBox>

        <CodeBox label="re.sub — find and replace using a pattern">{`re.sub(r"\\d+", "#", "I have 42 apples and 7 oranges")
# "I have # apples and # oranges"

# Redacting something sensitive — a real, common use
re.sub(r"\\d{3}-\\d{2}-\\d{4}", "XXX-XX-XXXX", "SSN on file: 123-45-6789")
# "SSN on file: XXX-XX-XXXX"`}</CodeBox>

        <CodeBox label="re.split — split a string on a pattern, not just a fixed character">{`re.split(r"[,;]\\s*", "apples, oranges;bananas,  grapes")
# ['apples', 'oranges', 'bananas', 'grapes']
# str.split(",") alone could not handle the mix of commas AND semicolons`}</CodeBox>

        <Para>
          Notice the recurring shape: <code>match</code> and <code>search</code> return a{' '}
          <strong>Match object</strong> (or <code>None</code> if nothing matched) — not the matched text
          directly. <code>findall</code> and <code>split</code> return plain lists. <code>sub</code>{' '}
          returns a new string. Getting the actual matched substring out of a Match object is covered in
          Part 06 below, once groups are introduced.
        </Para>

        <Callout type="warning">
          <strong>A match object is truthy, but it is not the matched text.</strong>{' '}
          <code>if re.search(r"\d+", text):</code> works because a Match object is always truthy and{' '}
          <code>None</code> is always falsy — but printing that match object directly gives you
          something like <code>&lt;re.Match object; span=(7, 9), match=&apos;42&apos;&gt;</code>, not{' '}
          <code>&quot;42&quot;</code>. You need <code>.group()</code> to extract the actual text, shown in
          Part 06.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Pattern Syntax, Built Up Systematically" />
        <SectionTitle>From Literal Characters to Character Classes</SectionTitle>

        <SubTitle>Literal characters</SubTitle>

        <Para>
          Most characters in a regex pattern simply match themselves. The pattern <code>cat</code>{' '}
          matches the literal text "cat" wherever it appears — nothing special is happening yet.
        </Para>

        <CodeBox label="Plain literal matching">{`re.search(r"cat", "concatenate")   # matches — "cat" appears inside "conCATenate"`}</CodeBox>

        <SubTitle>The dot . — any single character</SubTitle>

        <Para>
          <code>.</code> matches exactly one character of any kind (except a newline, by default).
        </Para>

        <CodeBox label="The dot matches anything, once">{`re.findall(r"c.t", "cat cot cut cят c t")
# ['cat', 'cot', 'cut', 'c t'] — "cят" is skipped, since я and т are TWO characters, not one`}</CodeBox>

        <SubTitle>Character classes [ ] — any ONE character from a set</SubTitle>

        <Para>
          Square brackets define a set of acceptable characters for one position. A hyphen inside
          brackets defines a range, and a leading <code>^</code> inside the brackets negates the set.
        </Para>

        <CodeBox label="Character classes">{`re.findall(r"[aeiou]", "hello world")   # ['e', 'o', 'o']   — any single vowel
re.findall(r"[a-z]", "Hi 123")           # ['i']              — lowercase a through z only
re.findall(r"[A-Za-z0-9]", "Hi 123!")    # ['H','i','1','2','3']  — letters and digits, not '!' or the space
re.findall(r"[^0-9]", "abc123")          # ['a','b','c']       — ^ inside [] means NOT these characters`}</CodeBox>

        <SubTitle>Shorthand classes: \d \w \s and their negations</SubTitle>

        <Para>
          Because digit, word-character, and whitespace classes are so common, <code>re</code> provides
          shorthand for them — and for their opposites.
        </Para>

        <CodeBox label="Shorthand character classes">{`\\d   any digit           — equivalent to [0-9]
\\D   any NON-digit        — equivalent to [^0-9]
\\w   any "word" character — letters, digits, and underscore, equivalent to [A-Za-z0-9_]
\\W   any NON-word character
\\s   any whitespace       — space, tab, newline
\\S   any NON-whitespace character`}</CodeBox>

        <CodeBox label="Shorthand classes in practice">{`re.findall(r"\\d", "Room 204, Suite 5B")     # ['2','0','4','5']
re.findall(r"\\w+", "user_name-42 field!")   # ['user_name', '42', 'field'] — the dash and ! break \\w+`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Quantifiers and Anchors" />
        <SectionTitle>How Many Times, and Where in the String</SectionTitle>

        <Para>
          On their own, character classes only match one character. Quantifiers say how many times the
          preceding element is allowed to repeat, and anchors pin a match to a specific position in the
          string rather than letting it appear anywhere.
        </Para>

        <CodeBox label="The quantifiers">{`*       zero or more
+       one or more
?       zero or one (optional)
{n}     exactly n times
{n,}    n or more times
{n,m}   between n and m times, inclusive`}</CodeBox>

        <CodeBox label="Quantifiers in practice">{`re.findall(r"\\d+", "room 4, hall 12, gate 007")
# ['4', '12', '007'] — \\d+ greedily grabs runs of one or more digits

re.match(r"colou?r", "color")    # matches — the 'u' is optional
re.match(r"colou?r", "colour")   # matches too

re.match(r"\\d{3}-\\d{4}", "555-1234")   # matches — exactly 3 digits, dash, exactly 4 digits
re.match(r"\\d{3}-\\d{4}", "55-1234")     # None    — only 2 digits before the dash`}</CodeBox>

        <SubTitle>Anchors — ^ and $</SubTitle>

        <Para>
          <code>^</code> anchors a match to the <strong>start</strong> of the string, and{' '}
          <code>$</code> anchors it to the <strong>end</strong>. Without anchors, a pattern is free to
          match anywhere inside the string — which is a common source of bugs when a full-string
          validation was actually intended.
        </Para>

        <CodeBox label="Why anchors matter — validating a whole string, not a substring">{`# WITHOUT anchors — this "validation" actually just checks for digits ANYWHERE
re.match(r"\\d{5}", "hello 80202 world extra text")
# matches "80202" — but re.match only pins the START, not the end,
# so trailing junk after a valid-looking prefix is silently accepted

# WITH both anchors — this genuinely validates the ENTIRE string
re.match(r"^\\d{5}$", "80202")            # matches — the whole string is exactly 5 digits
re.match(r"^\\d{5}$", "80202-extra")      # None    — correctly rejected`}</CodeBox>

        <Callout type="warning">
          <strong>re.match already anchors to the start — but never the end.</strong> A very common bug:
          assuming <code>re.match(r"\d&#123;5&#125;", value)</code> validates that{' '}
          <code>value</code> is <em>exactly</em> five digits. It does not — it only confirms the string{' '}
          <em>starts with</em> five digits, and anything can follow. Always add a trailing{' '}
          <code>$</code> when the intent is full-string validation, as shown above.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Capturing Groups" />
        <SectionTitle>Pulling Structured Pieces Out of a Match</SectionTitle>

        <Para>
          Parentheses <code>( )</code> in a pattern create a <strong>capturing group</strong> — a piece
          of the overall match that you can extract individually afterward, rather than only getting the
          full matched text back as one block. This is where regex stops being a yes/no check and
          starts being a real parsing tool.
        </Para>

        <CodeBox label="Extracting pieces with groups">{`import re

text = "Order #4471 placed on 2026-08-13"
match = re.search(r"Order #(\\d+) placed on (\\d{4}-\\d{2}-\\d{2})", text)

if match:
    print(match.group(0))   # the FULL match: "Order #4471 placed on 2026-08-13"
    print(match.group(1))   # the FIRST group: "4471"
    print(match.group(2))   # the SECOND group: "2026-08-13"`}</CodeBox>

        <SubTitle>Named groups — clearer than counting parentheses</SubTitle>

        <Para>
          Counting <code>group(1)</code>, <code>group(2)</code>, and so on becomes error-prone once a
          pattern has more than two or three groups, especially after the pattern gets edited later and
          the numbering shifts. Named groups, written{' '}
          <code>(?P&lt;name&gt;...)</code>, solve this by letting you retrieve each piece by name.
        </Para>

        <CodeBox label="Named groups">{`pattern = r"Order #(?P<order_id>\\d+) placed on (?P<order_date>\\d{4}-\\d{2}-\\d{2})"
match = re.search(pattern, text)

print(match.group("order_id"))     # "4471"
print(match.group("order_date"))   # "2026-08-13"

# .groupdict() returns everything at once, as a regular dict
print(match.groupdict())
# {'order_id': '4471', 'order_date': '2026-08-13'}`}</CodeBox>

        <Callout type="tip">
          Prefer named groups over positional groups the moment a pattern has more than two capturing
          groups, or whenever the extracted data will be used further down the code — a call site that
          reads <code>match.group(&quot;order_id&quot;)</code> is self-documenting; one that reads{' '}
          <code>match.group(3)</code> forces the reader back up to the pattern to figure out what group
          3 even is.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Greedy vs Non-Greedy Quantifiers" />
        <SectionTitle>Why * and + Grab More Than You Might Expect</SectionTitle>

        <Para>
          By default, quantifiers are <strong>greedy</strong> — they match as much text as possible
          while still allowing the overall pattern to succeed. This is a genuinely common source of
          confusing bugs the first time it bites, especially with HTML-like or delimiter-heavy text.
        </Para>

        <CodeBox label="The greedy trap">{`text = '<b>bold</b> and <i>italic</i>'

re.findall(r"<.+>", text)
# ['<b>bold</b> and <i>italic</i>']
# The greedy .+ matched from the FIRST < all the way to the LAST > —
# almost certainly not what was intended.`}</CodeBox>

        <Para>
          Adding a <code>?</code> immediately after a quantifier makes it{' '}
          <strong>non-greedy</strong> (also called "lazy") — it matches as{' '}
          <em>little</em> text as possible instead.
        </Para>

        <CodeBox label="The non-greedy fix">{`re.findall(r"<.+?>", text)
# ['<b>', '</b>', '<i>', '</i>']
# .+? stops at the FIRST > it can, giving four separate, correct matches`}</CodeBox>

        <Callout type="warning">
          Regex is genuinely a weak tool for parsing real HTML or XML — nested tags and edge cases break
          it quickly, and this example exists purely to illustrate greedy vs non-greedy matching. For
          real HTML parsing, reach for a dedicated library such as <code>BeautifulSoup</code>, not{' '}
          <code>re</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Compiling Patterns" />
        <SectionTitle>re.compile() — Reuse and Performance</SectionTitle>

        <Para>
          Every call to a module-level function like <code>re.search(pattern, text)</code> compiles{' '}
          <code>pattern</code> into an internal matching engine representation before running it. Python
          caches recently-used compiled patterns automatically, so calling the same pattern repeatedly is
          not catastrophic — but when a pattern is used many times in a loop, or the same pattern is
          reused across a codebase, compiling it once explicitly with <code>re.compile()</code> is both
          faster and clearer about intent.
        </Para>

        <CodeBox label="Compiling once, reusing many times">{`import re

ZIP_CODE = re.compile(r"^\\d{5}(-\\d{4})?$")   # optional +4 extension

candidates = ["80202", "80202-1234", "8020", "abc12"]
for c in candidates:
    if ZIP_CODE.match(c):
        print(f"{c}: valid")
    else:
        print(f"{c}: invalid")`}</CodeBox>

        <Para>
          A compiled pattern object exposes the same methods you have already used —{' '}
          <code>.match()</code>, <code>.search()</code>, <code>.findall()</code>,{' '}
          <code>.sub()</code>, <code>.split()</code> — just called directly on the compiled object
          instead of passing the pattern string to the module-level function each time.
        </Para>

        <Callout type="tip">
          A practical convention worth adopting: give compiled patterns an ALL_CAPS name at module level,
          the same way you would a constant — it signals to any reader that this regex is a fixed,
          reusable definition, not something constructed fresh on every call.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Raw Strings and Regex" />
        <SectionTitle>Why Every Pattern in This Module Starts With r&quot;...&quot;</SectionTitle>

        <Para>
          Back in Module 04, you met raw strings — <code>r&quot;...&quot;</code> — which tell Python not
          to interpret backslash escape sequences like <code>\n</code> or <code>\t</code>. Regex patterns
          use the backslash constantly for their own purposes (<code>\d</code>, <code>\w</code>,{' '}
          <code>\s</code>), and those meanings are completely unrelated to Python's own string escape
          sequences — which creates exactly the kind of collision raw strings exist to prevent.
        </Para>

        <CodeBox label="What happens without a raw string">{`# WITHOUT r-prefix — Python's OWN string escaping interferes first
pattern = "\\d+"     # Python sees \\d, does not recognize it as a known escape,
                     # and (in modern Python) leaves it as the two characters \\ and d —
                     # but this is fragile and inconsistent across escape sequences

# For example, \\s is fine, but some sequences ARE meaningful to Python itself:
"\\t"    # this is an actual TAB character to Python, not the two characters \\ and t —
         # if you meant the regex whitespace escape \\s and mistyped \\t, you'd get a
         # literal tab character in your pattern instead of what you intended

# WITH r-prefix — completely unambiguous, exactly what you typed, character for character
pattern = r"\\d+"    # r"\\d+" is guaranteed to be backslash, d, plus — nothing else`}</CodeBox>

        <Callout type="warning">
          <strong>Always write regex patterns as raw strings.</strong> It is not merely a convention —
          without the <code>r</code> prefix, certain digit/letter combinations after a backslash (like{' '}
          <code>\b</code>, which is a backspace character to Python but a word-boundary anchor in regex)
          produce silently wrong patterns instead of an error, which makes the bug genuinely hard to spot.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Worked Example" />
        <SectionTitle>Extracting Structured Data From Log Lines</SectionTitle>

        <Para>
          Here is a realistic, complete example that pulls together everything above: parsing
          semi-structured application log lines into structured data, a task that comes up in nearly
          every backend engineering role.
        </Para>

        <CodeBox label="Sample log lines">{`2026-08-13 09:14:02 ERROR [order-service] Failed to process order 4471: timeout after 30s
2026-08-13 09:14:07 INFO  [order-service] Order 4472 processed successfully
2026-08-13 09:15:33 ERROR [payment-service] Failed to process order 4473: card declined`}</CodeBox>

        <CodeBox label="Parsing every ERROR line into structured data">{`import re

LOG_PATTERN = re.compile(
    r"^(?P<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\s+"
    r"(?P<level>\\w+)\\s+"
    r"\\[(?P<service>[\\w-]+)\\]\\s+"
    r"(?P<message>.+)$"
)

log_lines = [
    "2026-08-13 09:14:02 ERROR [order-service] Failed to process order 4471: timeout after 30s",
    "2026-08-13 09:14:07 INFO  [order-service] Order 4472 processed successfully",
    "2026-08-13 09:15:33 ERROR [payment-service] Failed to process order 4473: card declined",
]

errors = []
for line in log_lines:
    match = LOG_PATTERN.match(line)
    if match and match.group("level") == "ERROR":
        order_match = re.search(r"order (\\d+)", match.group("message"))
        errors.append({
            "timestamp": match.group("timestamp"),
            "service": match.group("service"),
            "order_id": order_match.group(1) if order_match else None,
            "message": match.group("message"),
        })

for e in errors:
    print(e)

# {'timestamp': '2026-08-13 09:14:02', 'service': 'order-service', 'order_id': '4471',
#  'message': 'Failed to process order 4471: timeout after 30s'}
# {'timestamp': '2026-08-13 09:15:33', 'service': 'payment-service', 'order_id': '4473',
#  'message': 'Failed to process order 4473: card declined'}`}</CodeBox>

        <Para>
          Notice how the pattern is built from exactly the pieces this module covered, composed
          together: named groups for the fields you need to extract, <code>\d</code> and{' '}
          <code>\w</code> shorthand classes, quantifiers for repeated digits, and a nested{' '}
          <code>re.search()</code> call to pull the order ID out of the already-extracted message text —
          a genuinely common pattern, where one regex extracts a broad structure and a second, narrower
          regex digs further into one piece of it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 11 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 11 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Denver Insurance Platform&apos;s Silent Data-Quality Bug</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Insurance platform, Denver · Data quality incident
          </div>

          <Para>
            An insurance-quoting startup accepts phone numbers from a web form and needs to validate
            them before storing them, since downstream systems (SMS notifications, an agent dialer)
            assume a clean, consistent shape. An engineer writes a quick validation function under
            deadline pressure.
          </Para>

          <CodeBox label="The original validation">{`import re

def is_valid_phone(number):
    return re.match(r"\\d{3}-\\d{3}-\\d{4}", number) is not None

is_valid_phone("303-555-0192")          # True — correct
is_valid_phone("303-555-0192 ext 4")    # True — ALSO accepted, incorrectly`}</CodeBox>

          <SubSubTitle>What breaks, three weeks later</SubSubTitle>

          <Para>
            The dialer system starts throwing errors on a small but growing fraction of stored numbers.
            The root cause, once found: exactly the missing-anchor bug from Part 05.{' '}
            <code>re.match</code> only pins the pattern to the <em>start</em> of the string, never the
            end, so any input that merely <em>begins</em> with a valid-looking phone number — with
            arbitrary trailing text — was silently accepted and stored as-is.
          </Para>

          <SubSubTitle>The fix, and the second issue it uncovers</SubSubTitle>

          <Para>
            The immediate fix is exactly Part 05's lesson: add a trailing <code>$</code> anchor,{' '}
            <code>r&quot;^\d&#123;3&#125;-\d&#123;3&#125;-\d&#123;4&#125;$&quot;</code>, so the entire
            string must match, not just a prefix of it. But the fix also surfaces a second, more
            interesting question in code review: should the validator reject{' '}
            <code>(303) 555-0192</code> and <code>3035550192</code>, both of which are genuinely valid
            phone numbers in a different but common format? The team ultimately normalizes input first —
            stripping non-digit characters with <code>re.sub(r&quot;\D&quot;, &quot;&quot;, number)</code>{' '}
            — and validates the normalized 10-digit result, rather than trying to write one pattern that
            accepts every real-world formatting style directly.
          </Para>

          <Para>
            The lesson generalizes well beyond phone numbers: a regex validator that is not fully
            anchored on both ends does not fail loudly — it fails by silently accepting more than
            intended, which is exactly the kind of bug that survives testing and only shows up once
            real, messy user input reaches it in production.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 12 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 12 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Regular Expressions</SectionTitle>

        {[
          {
            wrong: '"Regex is always the fastest and most correct way to check text"',
            right: 'For prefix, suffix, and substring checks, plain string methods (str.startswith, str.endswith, in) are simpler, faster, and easier for the next reader to understand at a glance. Reach for regex specifically when the pattern has real structure — repetition, optional parts, or alternation — that string methods cannot express.',
          },
          {
            wrong: '"re.match checks the whole string, like a full validation"',
            right: 're.match only anchors the pattern to the START of the string, never the end. A pattern with no trailing $ will match a string that starts correctly but has arbitrary extra content after it — exactly the bug in the Real World example above. Use ^pattern$ for genuine full-string validation.',
          },
          {
            wrong: '"Quantifiers like + and * always match the shortest possible piece of text"',
            right: 'By default, quantifiers are greedy — they match as MUCH text as possible while still letting the pattern succeed overall, which can grab far more than intended across multiple delimiters. Add a ? after the quantifier (+? or *?) to make it non-greedy, matching as little as possible instead.',
          },
          {
            wrong: '"Regex can parse any structured text format, including HTML and XML"',
            right: 'Regex works well on flat, line-oriented, or simply-delimited text, but genuinely struggles with deeply nested structures like HTML and XML, where matching pairs of tags correctly requires more than pattern matching can express. Use a dedicated parser (like BeautifulSoup for HTML, or the built-in xml module) for those formats instead.',
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

      {/* ── Part 13 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 13 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between re.match, re.search, and re.findall?',
            a: 're.match only checks whether the pattern matches at the very START of the string, and returns a single Match object or None. re.search checks the entire string for the first occurrence of the pattern, anywhere, also returning a single Match object or None. re.findall returns every non-overlapping match in the string as a plain list of strings (or tuples, if the pattern has multiple groups), rather than a Match object.',
          },
          {
            q: 'Why should regex patterns in Python always be written as raw strings?',
            a: 'Regex uses the backslash for its own escape sequences (\\d, \\w, \\s, \\b, and more), which are unrelated to Python\'s own string escape sequences. Without the r prefix, Python\'s own string parser processes backslash sequences first — and some combinations (like \\b, a backspace character to Python but a word-boundary anchor in regex) silently produce a different pattern than intended, rather than raising an error. The r prefix guarantees the pattern is passed to re exactly as typed.',
          },
          {
            q: 'What is the difference between a greedy and a non-greedy quantifier?',
            a: 'By default, quantifiers (*, +, {n,m}) are greedy — they match as much text as possible while still allowing the overall pattern to succeed. Adding a ? immediately after the quantifier (*?, +?) makes it non-greedy (lazy), matching as little text as possible instead. This matters most when a pattern could span multiple occurrences of a delimiter, like matching content between HTML-like tags.',
          },
          {
            q: 'What is a capturing group, and how do named groups improve on plain numbered groups?',
            a: 'A capturing group, written with parentheses (...), marks a piece of the overall pattern that can be extracted individually from a Match object via .group(n), rather than only getting the full match back as one block. Named groups, written (?P<name>...), let you retrieve the same piece by a descriptive name via .group("name") instead of counting parentheses — this stays correct and readable even after the pattern is edited and the numeric positions shift.',
          },
          {
            q: 'Why compile a regex pattern with re.compile() instead of just calling re.search(pattern, text) each time?',
            a: 'Compiling once, especially for a pattern used repeatedly (inside a loop, or reused across a codebase), avoids recompiling the same pattern on every call and makes the code\'s intent clearer — a module-level compiled pattern with an ALL_CAPS name reads as a defined, reusable constant. The compiled object exposes the same methods (.match, .search, .findall, .sub, .split) called directly on it.',
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
        <SectionTitle>Regex Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the $ anchor when a pattern is meant to validate a whole string',
            a: 're.match(r"^\\d{5}", value) only confirms the string STARTS with five digits — anything can follow. Add a trailing $ for genuine full-string validation, as covered in Part 05 and the Real World example.',
          },
          {
            q: 'Forgetting the r prefix on a pattern string',
            a: 'Without it, Python\'s own string escaping can silently alter certain backslash sequences before re ever sees them. Always write patterns as raw strings: r"\\d+", not "\\d+".',
          },
          {
            q: 'Calling .group() on a match that might be None',
            a: 're.search() and re.match() return None when nothing matches. Calling .group() directly on that result raises AttributeError: \'NoneType\' object has no attribute \'group\'. Always check the result first: match = re.search(...); if match: ...',
          },
          {
            q: 'Using .findall() when the pattern has multiple groups and being surprised by the return shape',
            a: 'If a pattern has more than one capturing group, findall returns a list of TUPLES (one tuple per match, containing each group), not a flat list of full matches. Print a small example first if you are unsure what shape to expect.',
          },
          {
            q: 'Writing an overly greedy pattern and matching far more than intended',
            a: 'A pattern like r"<.+>" against text with multiple tags matches from the very first < to the very last > in the whole string. Use the non-greedy r"<.+?>" when the intent is the shortest reasonable match, as shown in Part 07.',
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
        <SectionTitle>Errors You Will Hit With Regex — And Exactly Why</SectionTitle>

        {[
          {
            error: `re.error: missing ), unterminated subpattern at position 4`,
            cause: 'An opening parenthesis in the pattern has no matching closing parenthesis — a common typo when writing or editing a capturing group.',
            fix: 'Count the parentheses in the pattern carefully, or build complex patterns incrementally, testing each addition with a quick re.search() call before adding the next piece.',
          },
          {
            error: `AttributeError: 'NoneType' object has no attribute 'group'`,
            cause: 're.search() or re.match() returned None because the pattern did not match anywhere in the string, and .group() was called on that None result directly without checking first.',
            fix: 'Always store the result and check it before calling .group(): match = re.search(pattern, text); if match: match.group(1).',
          },
          {
            error: `re.error: bad escape \\d at position 0`,
            cause: 'This specific message is rare in Python 3 (\\d is a valid, recognized escape), but similar errors appear when a pattern uses an escape sequence re does not recognize, or when a raw string was not used and Python\'s own string processing mangled the backslash sequence before re received it.',
            fix: 'Confirm the pattern is written as a raw string (r"...") and double-check the escape sequence against the standard re shorthand classes (\\d, \\w, \\s and their negations).',
          },
          {
            error: `IndexError: no such group`,
            cause: 'Calling .group(n) with a group number that does not exist in the pattern — for example, .group(2) when the pattern only has one set of parentheses.',
            fix: 'Recount the capturing groups in the pattern, or switch to named groups (?P<name>...) so retrieval does not depend on getting the numbering exactly right.',
          },
          {
            error: `A pattern "works" in testing but matches unexpected substrings in production`,
            cause: 'Almost always a missing anchor (^ and/or $) — the pattern was written to check for a shape ANYWHERE in the string, but was actually intended as full-string validation.',
            fix: 'For validation use cases specifically, anchor both ends: r"^pattern$". Test the fixed pattern against both valid input and input with unexpected trailing/leading content.',
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
        'Regex is for patterns with real structure — repetition, optional parts, alternation. For simple prefix/suffix/substring checks, plain string methods are simpler and faster.',
        're.match anchors to the START of the string only; re.search finds the first match anywhere; re.findall returns every match as a list. Know which one you actually need.',
        'Character classes ([], \\d, \\w, \\s) match one character from a set. Quantifiers (*, +, ?, {n,m}) say how many times the preceding element repeats.',
        'Anchors ^ and $ pin a match to the start and end of the string. Full-string validation requires BOTH — a missing $ is one of the most common real regex bugs.',
        'Capturing groups (...) extract pieces of a match individually via .group(n). Named groups (?P<name>...) do the same by name, and stay correct even after the pattern is edited.',
        'Quantifiers are greedy by default, matching as much as possible. Add ? after a quantifier (+?, *?) for non-greedy matching.',
        're.compile() compiles a pattern once for reuse — clearer and faster than repeatedly calling a module-level re function with the same pattern string.',
        'Always write regex patterns as raw strings (r"...") — Python\'s own string escaping can otherwise silently corrupt certain backslash sequences before re ever sees them.',
        'Regex is a weak tool for deeply nested formats like HTML and XML — use a dedicated parser for those instead.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 33 covers dates and times — the datetime module, timezone-aware datetimes, and the
          formatting codes that trip up almost everyone the first time they need them.
        </p>
        <Link href="/learn/python/dates-times" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 33 → Working with Dates and Times
        </Link>
      </div>
    </LearnLayout>
  )
}
