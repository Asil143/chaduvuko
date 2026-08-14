import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Strings — Creation, Indexing, Slicing, Methods — Python | Chaduvuko',
  description:
    'Strings are the data type you will touch the most in Python. Indexing, slicing, the methods that matter, Unicode, and f-strings done right.',
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

export default function Strings() {
  return (
    <LearnLayout
      title="Strings — Creation, Indexing, Slicing, Methods"
      description="Indexing, slicing, the string methods that matter, Unicode, and f-strings done right."
      section="Python — Module 04"
      readTime="65 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Creating Strings" />
        <SectionTitle>Strings Are Immutable Sequences of Characters</SectionTitle>

        <Para>
          A string is a sequence of characters. Python treats single and double quotes identically —{' '}
          <code>&apos;hello&apos;</code> and <code>&quot;hello&quot;</code> create the exact same
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
          <strong>Strings are immutable.</strong> Once created, a string object can never be changed in
          place — every string method that appears to "modify" a string (like <code>.upper()</code>)
          actually returns a brand new string object, leaving the original untouched. This is a
          deliberate design choice that makes strings safe to share across a program without fear of
          one part of the code silently corrupting a value another part depends on — the same
          immutability concept introduced for numbers back in Module 02.
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
          Slicing uses the syntax <code>[start:stop:step]</code> to extract a range of characters. The{' '}
          <code>stop</code> index is always <strong>excluded</strong> — this is the single most
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
          separate <code>.reverse()</code> method for strings (strings are immutable, so it would have
          to return a new string anyway) — the step of <code>-1</code> on a full slice is the standard,
          expected pattern every Python developer recognises instantly.
        </Callout>

        <Para>
          Slicing never raises an <code>IndexError</code>, even with out-of-range values — it simply
          clamps to whatever is available. This is different from direct indexing, which does raise an
          error for an out-of-range index.
        </Para>

        <CodeBox label="Slicing is forgiving; indexing is not">{`word = "Python"
word[2:100]   # "thon" — no error, just returns what's available
word[100]     # IndexError: string index out of range`}</CodeBox>

        <SubTitle>len() and why it matters for slicing</SubTitle>

        <Para>
          <code>len()</code> returns the number of characters in a string — the count of Unicode code
          points, specifically, a distinction that becomes relevant in Part 06 of this module. It is
          the tool you will use constantly alongside indexing and slicing to work with the end of a
          string relative to its actual length.
        </Para>

        <CodeBox label="len() in practice">{`word = "Python"
len(word)              # 6
word[len(word) - 1]     # "n" — the last character, the long way
word[-1]                  # "n" — the same thing, idiomatically`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Case, Whitespace, and Searching" />
        <SectionTitle>The Methods Every Python Developer Uses Constantly</SectionTitle>

        <CodeBox label="Case and whitespace">{`"  hello world  ".strip()     # "hello world"    — remove leading/trailing whitespace
"  hello  ".lstrip()           # "hello  "         — remove leading whitespace only
"  hello  ".rstrip()            # "  hello"          — remove trailing whitespace only
"Hello".upper()                  # "HELLO"
"Hello".lower()                   # "hello"
"hello world".title()              # "Hello World"   — capitalise each word
"hello".capitalize()                # "Hello"          — capitalise only the first character
"Hello World".swapcase()             # "hELLO wORLD"    — flip every character's case`}</CodeBox>

        <SubTitle>Searching and testing</SubTitle>

        <CodeBox label="Searching">{`"hello world".find("world")      # 6    — index where it starts, or -1 if not found
"hello world".index("world")     # 6    — same, but raises ValueError if not found
"hello world".rfind("o")          # 7    — like find(), but searches from the RIGHT
"hello world".count("o")           # 2    — how many times a substring appears
"hello world".startswith("hello")   # True
"hello world".endswith(".com")       # False
"world" in "hello world"               # True — the "in" operator for substring checks`}</CodeBox>

        <CodeBox label="Character classification methods">{`"hello".isdigit()      # False
"12345".isdigit()       # True
"hello".isalpha()        # True
"hello123".isalnum()      # True  — letters AND digits, no other characters
"   ".isspace()            # True
"Hello World".istitle()     # True — every word starts with a capital`}</CodeBox>

        <Callout type="warning">
          <strong>find() vs index():</strong> <code>.find()</code> returns <code>-1</code> when the
          substring is not found; <code>.index()</code> raises a <code>ValueError</code>. A common bug
          is treating a <code>-1</code> result from <code>.find()</code> as truthy in a conditional —{' '}
          <code>if word.find(&quot;x&quot;):</code> is almost always wrong, because <code>-1</code> is
          truthy in Python. Always compare explicitly: <code>if word.find(&quot;x&quot;) != -1:</code>
          , or better, just use <code>if &quot;x&quot; in word:</code> when you only need to know
          whether it exists.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Splitting, Joining, and Replacing" />
        <SectionTitle>Transforming Strings Into and Out Of Other Structures</SectionTitle>

        <CodeBox label="Splitting and joining">{`"a,b,c".split(",")              # ['a', 'b', 'c']
"hello world foo".split()        # ['hello', 'world', 'foo']  — splits on any whitespace by default
"a,b,,c".split(",")                # ['a', 'b', '', 'c']       — empty strings are kept
"a.b.c".split(".", 1)               # ['a', 'b.c']              — maxsplit limits how many splits happen
",".join(["a", "b", "c"])             # "a,b,c"
" ".join(["hello", "world"])           # "hello world"
"".join(["h", "e", "l", "l", "o"])      # "hello" — joining with an empty separator concatenates directly`}</CodeBox>

        <CodeBox label="Replacing and line splitting">{`"hello world".replace("world", "Python")   # "hello Python"
"aaa".replace("a", "b", 2)                    # "bba" — the count argument limits how many replacements
"line1\\nline2\\nline3".splitlines()            # ['line1', 'line2', 'line3']`}</CodeBox>

        <Para>
          <code>.split()</code> and <code>.join()</code> are inverses of each other, and this
          round-trip pattern — split a string into pieces, transform them, join them back together —
          is one of the most common real-world string operations you will write, from parsing CSV-like
          text to building formatted log lines.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — f-strings" />
        <SectionTitle>f-strings — Modern String Formatting</SectionTitle>

        <Para>
          An f-string (formatted string literal) lets you embed expressions directly inside a string by
          prefixing it with <code>f</code> and wrapping expressions in curly braces. This is the
          modern, idiomatic way to build strings from variables in Python — introduced in Python 3.6
          and now the default choice.
        </Para>

        <CodeBox label="Basic f-strings">{`name = "Maria"
age = 25
print(f"{name} is {age} years old.")     # "Maria is 25 years old."
print(f"Next year, {name} will be {age + 1}.")  # expressions work directly inside {}
print(f"{name.upper()} works here.")       # method calls work too`}</CodeBox>

        <SubTitle>Format specifications</SubTitle>

        <Para>
          After a colon inside the braces, you can control exactly how a value is formatted — decimal
          places, thousands separators, padding, and alignment.
        </Para>

        <CodeBox label="Format specs">{`price = 1234.5678

f"{price:.2f}"      # "1234.57"     — round to 2 decimal places
f"{price:,.2f}"      # "1,234.57"    — thousands separator + 2 decimal places
f"{price:10.2f}"      # "   1234.57"  — right-aligned in a field 10 characters wide
f"{price:<10.2f}"      # "1234.57   " — left-aligned in a field 10 characters wide
f"{price:^12.2f}"        # "  1234.57   " — centre-aligned in a field 12 characters wide
f"{42:05d}"                # "00042"       — zero-padded to 5 digits
f"{0.856:.1%}"               # "85.6%"       — format as a percentage
f"{255:x}"                     # "ff"          — format as hexadecimal
f"{255:b}"                      # "11111111"    — format as binary`}</CodeBox>

        <Callout type="tip">
          <strong>The self-documenting debug shortcut:</strong> Since Python 3.8, adding <code>=</code>{' '}
          after a variable inside an f-string prints both the variable name and its value — extremely
          useful for quick debugging: <code>f&quot;&#123;price=&#125;&quot;</code> produces{' '}
          <code>&quot;price=1234.5678&quot;</code> without you having to type the variable name twice.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Older Formatting Styles" />
        <SectionTitle>.format() and %-formatting — Recognising Legacy Code</SectionTitle>

        <Para>
          f-strings did not exist before Python 3.6. Two older formatting styles remain extremely
          common in existing codebases, and you need to recognise both immediately even though you
          should write new code with f-strings.
        </Para>

        <CodeBox label="str.format() — the pre-f-string standard, still widely used">{`"{} is {} years old".format(name, age)          # positional
"{n} is {a} years old".format(n=name, a=age)      # named
"{0} is {1}, {0} again".format(name, age)          # indices can repeat`}</CodeBox>

        <CodeBox label="%-formatting — the oldest style, inherited from C's printf">{`"%s is %d years old" % (name, age)`}</CodeBox>

        <Callout type="info">
          <strong>Why this matters even though you won&apos;t write it:</strong> You will encounter{' '}
          <code>.format()</code> constantly in codebases more than a few years old, in Stack Overflow
          answers from before 2016, and occasionally in logging configuration (Python&apos;s{' '}
          <code>logging</code> module, covered later in this track, still uses %-style formatting
          internally for historical reasons). Being unable to read it would slow you down in any real
          codebase.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Unicode and Encoding" />
        <SectionTitle>What a String Actually Is Under the Hood</SectionTitle>

        <Para>
          In Python 3 (unlike Python 2), every <code>str</code> is a sequence of{' '}
          <strong>Unicode code points</strong> — abstract characters, not raw bytes. This is a
          deliberate, important design decision: it means <code>"café"</code> and{' '}
          <code>"日本語"</code> are both just ordinary strings, handled identically to plain ASCII text,
          with no special handling required from you.
        </Para>

        <Para>
          Bytes only enter the picture when a string needs to be written to disk, sent over a network,
          or read from either — at that point, it must be converted to a specific byte representation,
          called an <strong>encoding</strong>. <strong>UTF-8</strong> is the dominant, correct default
          choice for virtually all modern text — it can represent every Unicode character, and it is
          backward-compatible with plain ASCII.
        </Para>

        <CodeBox label="Encoding (str -> bytes) and decoding (bytes -> str)">{`text = "café"
encoded = text.encode("utf-8")
print(encoded)                # b'caf\\xc3\\xa9' — the bytes object representing "café" in UTF-8

decoded = encoded.decode("utf-8")
print(decoded)                  # "café" — back to a normal string
print(decoded == text)           # True`}</CodeBox>

        <Callout type="warning">
          <strong>The most common real-world encoding bug:</strong> decoding bytes with the wrong
          encoding produces either garbled text or a crash, not a helpful warning. A file saved in
          Windows-1252 (a common legacy Windows encoding) and read assuming UTF-8 will fail or produce
          corrupted characters. Always know — or explicitly specify — the encoding of any file or data
          you are reading, especially when working with data from external sources, older systems, or
          non-English text.
        </Callout>

        <SubTitle>len() counts code points, not always what you visually see</SubTitle>

        <Para>
          For the overwhelming majority of text you will work with, <code>len()</code> matches what you
          would intuitively count. But some visual characters (particularly certain emoji and combined
          accent characters) are actually composed of multiple Unicode code points, which means{' '}
          <code>len()</code> can occasionally return a number larger than the number of "characters"
          you would count by eye. This is an edge case worth knowing exists, not something you need to
          handle specially in typical application code.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Concatenation Performance, Escapes, and Raw Strings" />
        <SectionTitle>Building Strings the Right Way</SectionTitle>

        <Para>
          You can join strings with <code>+</code>, but this is not the right tool when combining many
          pieces in a loop.
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
          pieces in a loop with <code>+=</code> is a genuine, measurable performance problem — because
          each <code>+=</code> must allocate an entirely new string and copy the old contents into it,
          making the total work grow roughly with the square of the number of pieces, not linearly.{' '}
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
          backslashes as literal characters, not escape sequences. This is almost always used for file
          paths on Windows and for regular expression patterns (covered in depth in the Regular
          Expressions module later in this track).
        </Para>

        <CodeBox label="Raw strings">{`path = r"C:\\Users\\Maria\\Documents"   # readable — no need to double every backslash
pattern = r"\\d+"                          # a regex pattern meaning "one or more digits"`}</CodeBox>
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
        <SectionTitle>A San Francisco Retailer&apos;s Customer Import Breaks on Real Names</SectionTitle>

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
            Scenario — E-commerce retailer, San Francisco · Production incident
          </div>

          <Para>
            An engineer builds a customer-import script that reads a CSV file of new sign-ups and loads
            them into the database. It works perfectly in testing with sample data like "John Smith"
            and "Jane Doe." In production, the import crashes on a real customer named{' '}
            <code>José García</code>.
          </Para>

          <SubSubTitle>What the investigation finds</SubSubTitle>

          <Para>
            The script opened the file with <code>open("customers.csv")</code> — no encoding specified.
            On the engineer&apos;s development machine (macOS), the default encoding happens to be UTF-8,
            so it worked in every test. The production server runs a different default locale, and the
            same code, run there, tries to decode the file&apos;s UTF-8 bytes using a different assumed
            encoding, producing a <code>UnicodeDecodeError</code> the moment it hits the accented
            character in "José."
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="The one-line fix that prevents this entire category of bug">{`# Before — relies on the operating system's default encoding, which varies by machine:
with open("customers.csv") as f:
    ...

# After — explicit, and correct on every machine, every time:
with open("customers.csv", encoding="utf-8") as f:
    ...`}</CodeBox>

          <Para>
            This exact bug — code that works flawlessly in development and fails in production because
            of an unstated encoding assumption — is common enough that it has a name among experienced
            engineers: "works on my machine." Real-world names, addresses, and product descriptions
            contain non-ASCII characters constantly. This is exactly why Part 07 of this module treated
            Unicode and encoding as a first-class topic rather than a footnote — it is one of the most
            common real production bugs in text-processing code, and it is entirely preventable by
            always specifying an encoding explicitly.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Strings</SectionTitle>

        {[
          {
            wrong: '"String methods like .strip() and .upper() modify the string in place"',
            right: 'Strings are immutable — every method returns a NEW string. name.strip() on its own line does nothing useful; you must reassign: name = name.strip().',
          },
          {
            wrong: '"Text is text — encoding is only a concern for non-English languages"',
            right: 'Encoding is relevant for EVERY string the moment it needs to become bytes (written to a file, sent over a network) or come FROM bytes (read from a file, received from a network) — even pure ASCII English text has an encoding, it just happens to look identical across the most common ones. The bug only becomes visible once real-world data with accented characters, emoji, or other non-ASCII content appears — exactly as shown in the Real World example above.',
          },
          {
            wrong: '"+ is the normal way to build up a string from many pieces"',
            right: '+= in a loop is a real, measurable performance problem at scale, because each concatenation must allocate an entirely new string. .join() is the correct, idiomatic tool for combining many pieces.',
          },
          {
            wrong: '"len(some_string) always equals what I would count by eye"',
            right: 'For the vast majority of text this is true, but some visual characters are composed of multiple Unicode code points internally, so len() can occasionally exceed the visual character count. This is a genuine edge case, not something to worry about for typical application text.',
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
            q: 'Why is string concatenation with += inefficient in a loop, and what should you use instead?',
            a: 'Strings are immutable, so each += must allocate a brand new string object and copy the previous contents into it. Repeating this n times in a loop makes the total work grow roughly with n squared, not n. "".join(list_of_pieces) builds the final string in a single pass and is the correct, idiomatic tool for combining many string pieces.',
          },
          {
            q: 'What is the difference between .find() and .index()?',
            a: 'Both search for a substring and return its starting index. .find() returns -1 if the substring is not found. .index() raises a ValueError if not found. Neither should have its return value treated as a plain boolean — -1 is truthy in Python, so "if word.find(x):" is a common, subtle bug.',
          },
          {
            q: 'Explain the relationship between str, bytes, and encoding in Python 3.',
            a: 'A str is a sequence of Unicode code points — abstract characters, with no inherent byte representation. bytes is a sequence of raw byte values. Converting from str to bytes is called encoding (text.encode("utf-8")); converting from bytes to str is called decoding (data.decode("utf-8")). UTF-8 is the standard, correct default choice for nearly all text. This is a deliberate change from Python 2, where str and bytes were conflated, causing constant encoding bugs.',
          },
          {
            q: 'What does the slice expression word[::-1] do, and why does it work?',
            a: 'It reverses the string. The slice syntax is [start:stop:step] — omitting start and stop means "the whole string," and a step of -1 means "walk backward one character at a time," which produces the string in reverse order. It is the standard, idiomatic way to reverse a string in Python.',
          },
          {
            q: 'A colleague\'s code works in development but throws a UnicodeDecodeError in production when reading a file. What is the most likely cause, and how would you fix it?',
            a: 'The code almost certainly calls open() without an explicit encoding argument, relying on the operating system\'s default encoding — which can differ between the developer\'s machine and the production server. The fix is to always specify the encoding explicitly: open(path, encoding="utf-8"), removing the dependency on whatever the runtime environment happens to default to.',
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
            a: 'As shown above, this is a real performance problem because each += allocates an entirely new string. Use "".join(list_of_pieces) instead — it is both faster and more idiomatic.',
          },
          {
            q: 'Treating .find() result as a boolean instead of comparing to -1',
            a: 'if text.find("x"): is buggy because -1 (not found) is truthy in Python, just like any other nonzero number. Always compare explicitly, or use the "in" operator when you only need a yes/no answer.',
          },
          {
            q: 'Opening files without specifying an encoding',
            a: 'As shown in the Real World example, relying on the operating system\'s default encoding produces code that works on your machine and fails elsewhere. Always pass encoding="utf-8" explicitly when opening text files.',
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
        <SectionTitle>Errors You Will Hit Working With Strings — And Exactly Why</SectionTitle>

        {[
          {
            error: `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe2 in position 47: invalid continuation byte`,
            cause: 'A file saved in a non-UTF-8 encoding (commonly Latin-1, Windows-1252, or UTF-16) is being read with the default UTF-8 decoder. The byte 0xe2 is a valid start byte in UTF-8 but the bytes that follow it do not form a valid UTF-8 sequence — because they are not UTF-8 at all.',
            fix: 'Open the file with the correct encoding: open("file.csv", encoding="latin-1"). If you do not know the encoding, the chardet or charset-normalizer library can detect it. Long term, standardise on UTF-8 at data ingestion and reject files that are not UTF-8.',
          },
          {
            error: `TypeError: 'str' object does not support item assignment`,
            cause: 'Attempting to change a single character in a string directly, like name[0] = "M". Strings are immutable — no in-place character assignment is possible.',
            fix: 'Build a new string instead: name = "M" + name[1:], or convert to a list of characters, modify it, and rejoin: "".join(list(name)).',
          },
          {
            error: `TypeError: can only concatenate str (not "int") to str`,
            cause: 'Attempting to combine a string and a non-string value with +, most commonly a number, without converting it first.',
            fix: 'Convert explicitly with str(), or use an f-string, which handles the conversion automatically: f"Age: {age}".',
          },
          {
            error: `IndexError: string index out of range`,
            cause: 'Direct indexing (not slicing) with a position beyond the string\'s length. Unlike slicing, which clamps silently, direct indexing raises an error immediately.',
            fix: 'Check len(text) before indexing near the boundary, or use slicing (which never raises this error) if graceful handling of a too-short string is acceptable for the use case.',
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
        'Strings are immutable — every method that appears to modify a string actually returns a new one. You must reassign to keep the result.',
        'Indexing accesses a single character (0-based, negative indices count from the end). Slicing extracts a range with [start:stop:step] — stop is always excluded, and slicing never raises IndexError.',
        'word[::-1] is the idiomatic way to reverse a string in Python.',
        'f-strings are the modern standard for building strings from variables, with rich format specs for decimals, padding, thousands separators, and percentages. .format() and %-formatting are older styles you must still be able to read.',
        'Python 3 strings are Unicode code points, not bytes. Encoding converts str -> bytes; decoding converts bytes -> str. Always specify UTF-8 explicitly when opening files — relying on the OS default is a real, common production bug.',
        'Use "".join(list) to build a string from many pieces — never += in a loop, which is a real, measurable performance problem.',
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
