import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Strings — Creation, Indexing, Slicing, Methods — Python | Chaduvuko',
  description:
    'Strings are the data type you will touch the most in Python. Indexing, slicing, the methods that matter, and f-strings done right.',
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

export default function Strings() {
  return (
    <LearnLayout
      title="Strings — Creation, Indexing, Slicing, Methods"
      description="Indexing, slicing, the string methods that matter, and f-strings done right."
      section="Python — Module 04"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Creating Strings" />
        <SectionTitle>Strings Are Immutable Sequences of Characters</SectionTitle>

        <Para>
          A string is a sequence of characters. Python treats single and double quotes identically —
          <code> &apos;hello&apos;</code> and <code>&quot;hello&quot;</code> create the exact same
          object. The convention most style guides recommend is to pick one and use it consistently
          (double quotes are slightly more common), and to use the other quote type only when your
          text itself contains one.
        </Para>

        <CodeBox label="Creating strings">{`name = "Maria"
quote = 'She said "hello" to me'    # double quotes inside single quotes — no escaping needed
apostrophe = "It's a nice day"       # single quote inside double quotes — no escaping needed

# Triple-quoted strings span multiple lines
bio = """Maria is a software engineer
based in Austin, Texas.
She specialises in backend systems."""`}</CodeBox>

        <Callout type="info">
          <strong>Strings are immutable.</strong> Once created, a string object can never be changed
          in place — every string method that appears to "modify" a string (like{' '}
          <code>.upper()</code>) actually returns a brand new string object, leaving the original
          untouched. This is a deliberate design choice that makes strings safe to share across a
          program without fear of one part of the code silently corrupting a value another part
          depends on.
        </Callout>

        <CodeBox label="Immutability in action">{`name = "maria"
name.upper()
print(name)          # "maria" — UNCHANGED. .upper() returned a new string, and we discarded it.

name = name.upper()  # you must reassign to keep the result
print(name)          # "MARIA"

name[0] = "M"
# TypeError: 'str' object does not support item assignment — strings cannot be edited in place`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Indexing and Slicing" />
        <SectionTitle>Accessing Characters and Substrings</SectionTitle>

        <Para>
          Every character in a string has a position, called an <strong>index</strong>, starting at{' '}
          <code>0</code> for the first character. Python also supports negative indices, counting
          backward from the end.
        </Para>

        <CodeBox label="Indexing">{`word = "Python"
#        P  y  t  h  o  n
#        0  1  2  3  4  5
#       -6 -5 -4 -3 -2 -1

word[0]     # "P"   — first character
word[5]     # "n"   — last character
word[-1]    # "n"   — last character, the easier way
word[-6]    # "P"   — first character, counting from the end
word[10]    # IndexError: string index out of range`}</CodeBox>

        <SubTitle>Slicing — extracting a substring</SubTitle>

        <Para>
          Slicing uses the syntax <code>[start:stop:step]</code> to extract a range of characters.
          The <code>stop</code> index is always <strong>excluded</strong> — this is the single most
          important rule to internalise about Python slicing.
        </Para>

        <CodeBox label="Slicing">{`word = "Python"

word[0:3]     # "Pyt"   — indices 0, 1, 2 (index 3 is EXCLUDED)
word[2:]      # "thon"  — from index 2 to the end
word[:3]      # "Pyt"   — from the start up to (not including) index 3
word[:]       # "Python" — the whole string (a full copy)
word[-3:]     # "hon"   — the last three characters
word[::2]     # "Pto"   — every second character, from the start
word[::-1]    # "nohtyP" — the entire string, reversed`}</CodeBox>

        <Callout type="tip">
          <strong>word[::-1] is the idiomatic way to reverse a string in Python.</strong> There is no
          separate <code>.reverse()</code> method for strings (strings are immutable, so it would
          have to return a new string anyway) — the step of <code>-1</code> on a full slice is the
          standard, expected pattern every Python developer recognises instantly.
        </Callout>

        <Para>
          Slicing never raises an <code>IndexError</code>, even with out-of-range values — it simply
          clamps to whatever is available. This is different from direct indexing, which does raise
          an error for an out-of-range index.
        </Para>

        <CodeBox label="Slicing is forgiving; indexing is not">{`word = "Python"
word[2:100]   # "thon" — no error, just returns what's available
word[100]     # IndexError: string index out of range`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — String Methods You Will Actually Use" />
        <SectionTitle>The Methods Every Python Developer Uses Constantly</SectionTitle>

        <CodeBox label="Case and whitespace">{`"  hello world  ".strip()     # "hello world"    — remove leading/trailing whitespace
"Hello".upper()                # "HELLO"
"Hello".lower()                 # "hello"
"hello world".title()            # "Hello World"   — capitalise each word
"hello".capitalize()              # "Hello"          — capitalise only the first character`}</CodeBox>

        <CodeBox label="Searching and testing">{`"hello world".find("world")      # 6    — index where it starts, or -1 if not found
"hello world".index("world")     # 6    — same, but raises ValueError if not found
"hello world".startswith("hello") # True
"hello world".endswith(".com")    # False
"world" in "hello world"           # True — the "in" operator for substring checks
"hello".isdigit()                   # False
"12345".isdigit()                   # True
"hello".isalpha()                    # True`}</CodeBox>

        <CodeBox label="Splitting and joining">{`"a,b,c".split(",")              # ['a', 'b', 'c']
"hello world foo".split()        # ['hello', 'world', 'foo']  — splits on any whitespace by default
",".join(["a", "b", "c"])         # "a,b,c"
" ".join(["hello", "world"])       # "hello world"`}</CodeBox>

        <Callout type="warning">
          <strong>find() vs index():</strong> <code>.find()</code> returns <code>-1</code> when the
          substring is not found; <code>.index()</code> raises a <code>ValueError</code>. A common
          bug is treating a <code>-1</code> result from <code>.find()</code> as truthy in a
          conditional — <code>if word.find("x"):</code> is almost always wrong, because{' '}
          <code>-1</code> is truthy in Python. Always compare explicitly:{' '}
          <code>if word.find(&quot;x&quot;) != -1:</code>, or better, just use{' '}
          <code>if &quot;x&quot; in word:</code> when you only need to know whether it exists.
        </Callout>

        <CodeBox label="Replacing">{`"hello world".replace("world", "Python")   # "hello Python"
"aaa".replace("a", "b", 2)                    # "bba" — the count argument limits how many replacements`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — f-strings" />
        <SectionTitle>f-strings — Modern String Formatting</SectionTitle>

        <Para>
          An f-string (formatted string literal) lets you embed expressions directly inside a string
          by prefixing it with <code>f</code> and wrapping expressions in curly braces. This is the
          modern, idiomatic way to build strings from variables in Python — introduced in Python 3.6
          and now the default choice over the older <code>.format()</code> method and{' '}
          <code>%</code>-formatting.
        </Para>

        <CodeBox label="Basic f-strings">{`name = "Maria"
age = 25
print(f"{name} is {age} years old.")     # "Maria is 25 years old."
print(f"Next year, {name} will be {age + 1}.")  # expressions work directly inside {}`}</CodeBox>

        <SubTitle>Format specifications</SubTitle>

        <Para>
          After a colon inside the braces, you can control exactly how a value is formatted —
          decimal places, thousands separators, padding, and alignment.
        </Para>

        <CodeBox label="Format specs">{`price = 1234.5678

f"{price:.2f}"      # "1234.57"     — round to 2 decimal places
f"{price:,.2f}"      # "1,234.57"    — thousands separator + 2 decimal places
f"{price:10.2f}"      # "   1234.57"  — right-aligned in a field 10 characters wide
f"{price:<10.2f}"      # "1234.57   " — left-aligned in a field 10 characters wide
f"{42:05d}"              # "00042"       — zero-padded to 5 digits
f"{0.856:.1%}"            # "85.6%"       — format as a percentage`}</CodeBox>

        <Callout type="tip">
          <strong>The self-documenting debug shortcut:</strong> Since Python 3.8, adding{' '}
          <code>=</code> after a variable inside an f-string prints both the variable name and its
          value — extremely useful for quick debugging: <code>f&quot;&#123;price=&#125;&quot;</code>{' '}
          produces <code>&quot;price=1234.5678&quot;</code> without you having to type the variable
          name twice.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Concatenation, Escapes, and Raw Strings" />
        <SectionTitle>Building Strings the Right Way</SectionTitle>

        <Para>
          You can join strings with <code>+</code>, but this is not the right tool when combining
          many pieces in a loop.
        </Para>

        <CodeBox label="Why + in a loop is a performance mistake">{`# Slow — creates a brand new string object on every single iteration,
# because strings are immutable and += must build a new string each time:
result = ""
for word in ["a", "b", "c", "d"]:
    result += word + " "

# Fast — join() builds the final string once, from a list, in one pass:
result = " ".join(["a", "b", "c", "d"])`}</CodeBox>

        <Para>
          For a handful of strings this difference is invisible. Building a string from thousands of
          pieces in a loop with <code>+=</code> is a genuine, measurable performance problem —{' '}
          <code>.join()</code> is the correct idiom, and interviewers specifically test for knowing
          this.
        </Para>

        <SubTitle>Escape characters and raw strings</SubTitle>

        <CodeBox label="Common escape sequences">{`"Line one\\nLine two"      # \\n — newline
"Column1\\tColumn2"         # \\t — tab
"She said \\"hi\\""            # \\" — an escaped double quote inside a double-quoted string
"C:\\\\Users\\\\Maria"           # \\\\ — a single literal backslash`}</CodeBox>

        <Para>
          A <strong>raw string</strong> — prefixed with <code>r</code> — tells Python to treat
          backslashes as literal characters, not escape sequences. This is almost always used for
          file paths on Windows and for regular expression patterns (covered in depth in the Regular
          Expressions module later in this track).
        </Para>

        <CodeBox label="Raw strings">{`path = r"C:\\Users\\Maria\\Documents"   # readable — no need to double every backslash
pattern = r"\\d+"                          # a regex pattern meaning "one or more digits"`}</CodeBox>
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>String Mistakes That Show Up Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting that string methods return a new string instead of modifying in place',
            a: 'name.strip() on its own line does nothing useful — the result is discarded. You must write name = name.strip() to actually keep the cleaned-up value.',
          },
          {
            q: 'Off-by-one errors from forgetting the slice stop index is exclusive',
            a: 'word[0:3] on "Python" gives "Pyt" (3 characters), not "Pyth" (4 characters) — a very common source of one-character-off bugs when extracting fixed-width substrings.',
          },
          {
            q: 'Using + to build a string inside a loop over many items',
            a: 'As shown above, this is O(n²) behaviour because each += allocates an entirely new string. Use "".join(list_of_pieces) instead — it is both faster and more idiomatic.',
          },
          {
            q: 'Treating .find() result as a boolean instead of comparing to -1',
            a: 'if text.find("x"): is buggy because .find() returning 0 (found at the very start) is falsy-adjacent in intent but numerically truthy in Python, while -1 (not found) is ALSO truthy. Always compare explicitly, or use the "in" operator when you only need a yes/no answer.',
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
        'Strings are immutable — every method that appears to modify a string actually returns a new one. You must reassign to keep the result.',
        'Indexing accesses a single character (0-based, negative indices count from the end). Slicing extracts a range with [start:stop:step] — stop is always excluded.',
        'word[::-1] is the idiomatic way to reverse a string in Python.',
        'f-strings are the modern standard for building strings from variables, with rich format specs for decimals, padding, thousands separators, and percentages.',
        'Use "".join(list) to build a string from many pieces — never += in a loop, which is a real, measurable performance problem at scale.',
        'Raw strings (r"...") treat backslashes literally — essential for Windows file paths and regular expressions.',
        '.find() returns -1 when not found (never raises); .index() raises ValueError when not found. Prefer the "in" operator for a simple yes/no check.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 05 covers control flow — how Python evaluates truthiness, every form of conditional
          logic, and the readability patterns senior engineers actually use.
        </p>
        <Link href="/learn/python/control-flow" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 05 → Control Flow
        </Link>
      </div>
    </LearnLayout>
  )
}
