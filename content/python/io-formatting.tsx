import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Input/Output & f-string Formatting — Python | Chaduvuko',
  description:
    'input() mechanics, reading multiple values from one line, and print() in real depth — sep, end, file, and flush — plus stdout vs stderr and print-based debugging.',
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

export default function IOFormatting() {
  return (
    <LearnLayout
      title="Input/Output & f-string Formatting"
      description="input() mechanics, reading multiple values from one line, and print() in real depth — sep, end, file, and flush — plus stdout vs stderr and print-based debugging."
      section="Python — Module 10"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — input() Mechanics" />
        <SectionTitle>input() — Always a String, No Exceptions</SectionTitle>

        <Para>
          <code>input()</code> pauses your program, waits for the user to type something and press
          Enter, and returns whatever they typed. You have used it in passing since the Variables
          module, but it is worth being precise about exactly what it does and does not do, since the
          single most common mistake with <code>input()</code> stems from a wrong assumption about its
          return type.
        </Para>

        <CodeBox label="input() always returns a str — no exceptions, regardless of what was typed">{`age = input("Enter your age: ")
# User types: 25

print(type(age))    # <class 'str'>
print(age)              # "25"     — the STRING "25", not the integer 25
print(age + 1)             # TypeError: can only concatenate str (not "int") to str`}</CodeBox>

        <Para>
          This is not a special case or a quirk — it is the entire, consistent contract of{' '}
          <code>input()</code>: whatever the user types, no matter how number-like it looks, comes back
          as a string. If your program needs a number, you must convert it explicitly, exactly as
          covered in the Variables &amp; Data Types module.
        </Para>

        <CodeBox label="The standard conversion pattern">{`age = int(input("Enter your age: "))       # convert immediately, at the point of input
price = float(input("Enter the price: "))

print(age + 1)      # 26 — now this works, because age is actually an int`}</CodeBox>

        <Callout type="warning">
          <strong>Converting immediately, at the point of input, is the right habit to build now.</strong>{' '}
          Delaying the conversion — storing the raw string and converting it several lines later — makes
          it far too easy to forget entirely, and the resulting <code>TypeError</code> can surface far
          from where the actual mistake was made, making it harder to trace back.
        </Callout>

        <SubTitle>The prompt argument — and why it matters more than it looks</SubTitle>

        <Para>
          The string passed to <code>input()</code> is displayed to the user before the program waits
          for their response — this is not just a convenience, it is the only signal the user gets that
          the program is waiting on them at all. <code>input()</code> with no prompt argument still works
          and still waits, but silently, which reads to a user as a frozen or crashed program.
        </Para>

        <CodeBox label="Always give input() a clear prompt">{`# Confusing — the program appears to hang with no explanation
name = input()

# Clear — the user immediately understands what's expected
name = input("Enter your name: ")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Reading Multiple Values From One Line" />
        <SectionTitle>split() and Unpacking — Reading Several Values in a Single input()</SectionTitle>

        <Para>
          Prompting separately for every individual value is tedious for both the programmer and the
          user. A very common real pattern — especially in command-line tools and coding exercises — is
          reading several space-separated values from a single line of input, then splitting and
          unpacking them in one step.
        </Para>

        <CodeBox label="Reading two values from one line">{`# User types: Maria 28
name, age = input("Enter your name and age: ").split()

print(name)     # Maria     — a string
print(age)         # "28"      — still a string! split() does not know these should be numbers`}</CodeBox>

        <Para>
          <code>.split()</code> with no arguments splits on any amount of whitespace and discards it —
          the same string method you already met in depth in the Strings module. The result is a list of
          strings, which is then unpacked directly into <code>name</code> and <code>age</code> using the
          same tuple/list unpacking mechanics from the Tuples and Sets module. As always, the number of
          names on the left must match the number of items produced by <code>.split()</code>, or Python
          raises a <code>ValueError</code>.
        </Para>

        <CodeBox label="Converting each split value to the right type">{`# User types: 4 7
a, b = input("Enter two numbers: ").split()
a, b = int(a), int(b)          # convert both after splitting
print(a + b)                     # actually adds them numerically now

# Or, more compactly, with map() — a preview of the functional tools
# module (26) you'll meet properly later in this track:
a, b = map(int, input("Enter two numbers: ").split())
print(a + b)`}</CodeBox>

        <Callout type="tip">
          <code>.split(",")</code> splits on a specific separator instead of whitespace — useful for
          reading comma-separated input directly, e.g. <code>input().split(&quot;,&quot;)</code> for a
          line like <code>&quot;apple,banana,cherry&quot;</code>. This is exactly the same{' '}
          <code>.split()</code> behaviour from the Strings module, just applied to text that came from a
          user instead of a hardcoded string.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — f-strings, Briefly Revisited" />
        <SectionTitle>f-strings Were Already Covered In Depth — Here Is the One-Paragraph Recap</SectionTitle>

        <Para>
          The Strings module covered f-strings thoroughly — embedding expressions directly inside a
          string with <code>f&quot;...{'{'}expression{'}'}...&quot;</code>, format specs for decimal
          places, padding, thousands separators, and percentages, and the debugging shorthand{' '}
          <code>f&quot;{'{'}value=&#125;&quot;</code>. This module deliberately does not repeat any of
          that ground — if any of it sounds unfamiliar, it is worth a quick trip back to Parts 05 and 06
          of the Strings module before continuing. What this module adds instead is everything{' '}
          <em>around</em> formatting — actually getting values in via <code>input()</code>, and actually
          getting formatted output onto the screen (or somewhere else entirely) correctly via{' '}
          <code>print()</code>, which is the real subject of the rest of this module.
        </Para>

        <CodeBox label="A one-line reminder of what f-strings already cover, in full, back in the Strings module">{`name = "Maria"
price = 19.999

print(f"Hello, {name}! Total: \${price:.2f}")
# Hello, Maria! Total: $20.00`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — print()'s sep and end" />
        <SectionTitle>print() in Real Depth — sep and end</SectionTitle>

        <Para>
          Most tutorials only ever show <code>print()</code> called with a single string, which hides
          two genuinely useful keyword arguments almost every working Python engineer relies on
          regularly: <code>sep</code> and <code>end</code>.
        </Para>

        <SubTitle>sep — what goes between multiple arguments</SubTitle>

        <Para>
          <code>print()</code> can take any number of arguments, and by default joins them with a single
          space. <code>sep</code> overrides that joining character entirely.
        </Para>

        <CodeBox label="sep — controlling what separates printed values">{`print("2026", "08", "15")                # 2026 08 15         — default sep is a single space
print("2026", "08", "15", sep="-")           # 2026-08-15          — a real date format, built directly
print("a", "b", "c", sep="")                    # abc                    — no separator at all
print("a", "b", "c", sep="\\n")                     # a
                                                       # b
                                                       # c
                                                       # sep can be ANY string, including a newline`}</CodeBox>

        <SubTitle>end — what goes after the entire print call</SubTitle>

        <Para>
          By default, <code>print()</code> appends a newline character after everything it prints — this
          is why consecutive <code>print()</code> calls appear on separate lines. <code>end</code>{' '}
          overrides that trailing character, which is exactly how the Loops module&apos;s nested-loop grid
          example printed multiple values on a single row.
        </Para>

        <CodeBox label="end — controlling what comes after the printed value">{`print("Loading", end="")
print(".", end="")
print(".", end="")
print(".", end="\\n")
# Loading...
# (all four calls landed on ONE line, because none of the first three
#  appended the default newline — only the last one did, explicitly)

for i in range(5):
    print(i, end=" ")
# 0 1 2 3 4    — printed on a single line, space-separated, no trailing newline mid-loop`}</CodeBox>

        <Callout type="tip">
          A genuinely common real use of <code>end=&quot;&quot;</code>: a progress indicator that updates
          in place on one line instead of scrolling the terminal with a new line per update — combined
          with <code>&quot;\r&quot;</code> (carriage return, moving the cursor back to the start of the
          current line) as the <code>end</code> value, a loop can overwrite the same line repeatedly to
          show live progress.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — print()'s file Argument" />
        <SectionTitle>Printing to stderr Instead of stdout — And Why the Distinction Matters</SectionTitle>

        <Para>
          Every running program has two separate output streams available to it by default:{' '}
          <strong>stdout</strong> (standard output) for normal program output, and{' '}
          <strong>stderr</strong> (standard error) for error messages and diagnostics. By default,{' '}
          <code>print()</code> writes to <code>stdout</code>. The <code>file</code> keyword argument lets
          you redirect a specific <code>print()</code> call to <code>stderr</code> instead.
        </Para>

        <CodeBox label="Printing to stderr">{`import sys

print("Processing started")                          # goes to stdout — normal output
print("Warning: config file not found", file=sys.stderr)   # goes to stderr — diagnostic output`}</CodeBox>

        <Para>
          On the surface, both lines appear identically in a typical terminal — the distinction only
          becomes visible, and useful, once output is redirected, which is extremely common in real
          production usage. A command-line tool&apos;s normal output might be redirected into a file for
          later processing, while its errors still need to reach the terminal (or a separate logging
          system) immediately, regardless of where the normal output is going.
        </Para>

        <CodeBox label="Why the separation matters, at the command line">{`# Running a script and redirecting only its normal output to a file:
# python my_script.py > output.txt
#
# If the script printed everything with plain print() (stdout),
# error messages would ALSO be silently redirected into output.txt,
# where nobody watching the terminal would ever see them.
#
# If errors were printed with print(..., file=sys.stderr) instead,
# they still appear in the terminal immediately, even though
# normal output is being captured into the file.`}</CodeBox>

        <Callout type="warning">
          This is not a purely academic distinction — real production tooling (log aggregators,
          monitoring systems, shell pipelines) frequently treats <code>stdout</code> and{' '}
          <code>stderr</code> completely differently, sometimes routing them to entirely separate
          destinations. A script that prints its actual errors to <code>stdout</code> can cause them to
          be silently missed by tooling that is only watching <code>stderr</code> for problems.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — print()'s flush Argument" />
        <SectionTitle>flush — When Output Needs to Appear Immediately, Not Whenever Python Gets Around to It</SectionTitle>

        <Para>
          Output is not always written to the screen (or a file) the instant <code>print()</code> is
          called. For performance reasons, Python (and the underlying operating system) often{' '}
          <strong>buffers</strong> output — collecting it up and writing it out in a batch, rather than
          one line at a time — since writing to a terminal or file repeatedly, in small pieces, is slower
          than writing larger chunks at once.
        </Para>

        <CodeBox label="Normally invisible — but real">{`import time

for i in range(5):
    print(f"Step {i}")
    time.sleep(1)

# In some environments (piped output, certain terminals, some logging setups),
# all five lines can appear at once after the full 5 seconds — not one per second
# as you'd expect — because the output was buffered rather than written immediately.`}</CodeBox>

        <Para>
          <code>flush=True</code> forces <code>print()</code> to write its output immediately, bypassing
          the buffer, rather than waiting for the buffer to fill up or the program to exit.
        </Para>

        <CodeBox label="flush=True — forcing immediate output">{`import time

for i in range(5):
    print(f"Step {i}", flush=True)
    time.sleep(1)

# Now each line is guaranteed to appear the moment it's printed,
# not held back in a buffer.`}</CodeBox>

        <Callout type="tip">
          <code>flush=True</code> matters most in exactly two situations: a long-running process whose
          output is being piped into another program or a log file in real time (where a human or
          monitoring tool is watching live), and a progress indicator using{' '}
          <code>end=&quot;\r&quot;</code> from Part 04, which needs every update to actually reach the
          screen immediately to look like real-time progress rather than a frozen line that jumps at the
          very end.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — print()-Based Debugging" />
        <SectionTitle>print() Debugging — Genuinely Useful, and Genuinely Limited</SectionTitle>

        <Para>
          Sprinkling <code>print()</code> calls through code to see what a variable actually contains at
          a given point is, honestly, how most engineers debug small problems — including experienced
          ones. It is fast, requires no setup, and works everywhere Python runs. It is worth using well,
          and worth being honest about where it stops being enough.
        </Para>

        <CodeBox label="Debugging with print() — reasonably done">{`def calculate_total(items):
    print(f"DEBUG: items = {items}")     # label your debug prints — you WILL have several at once
    subtotal = sum(item["price"] for item in items)
    print(f"DEBUG: subtotal = {subtotal}")
    tax = subtotal * 0.08
    total = subtotal + tax
    print(f"DEBUG: total = {total}")
    return total`}</CodeBox>

        <Callout type="tip">
          Always label debug prints with something like <code>&quot;DEBUG:&quot;</code> or the variable
          name itself, and remember the f-string debugging shorthand from the Strings module —{' '}
          <code>f&quot;{'{'}subtotal=&#125;&quot;</code> prints both the name and the value in one go,
          saving you from typing the label manually and reducing the chance of accidentally mislabeling
          a value while debugging quickly.
        </Callout>

        <SubTitle>Where print() debugging genuinely runs out of road</SubTitle>

        <Para>
          It has real, structural limits. It requires editing the source code and re-running the program
          for every new question you want answered. It clutters real code if forgotten and left in
          (worse, if it accidentally ships to production). It cannot pause execution and let you inspect
          the full program state interactively, and it becomes genuinely unmanageable in a large codebase
          or a bug that only reproduces intermittently, where adding and removing print statements
          repeatedly across many files is slow and error-prone.
        </Para>

        <Para>
          This is exactly the gap that a real debugger fills — a tool that lets you pause a running
          program at an exact line, inspect every variable in scope at that moment, and step through
          execution one line at a time, without editing the source code at all. Python&apos;s built-in
          debugger and how to use it properly — including in a real IDE — is covered fully in the
          dedicated Debugging module later in this track. For now, <code>print()</code> is a completely
          legitimate first tool, not a beginner&apos;s crutch to feel embarrassed about — just one with a
          ceiling worth knowing about in advance.
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
        <SectionTitle>A Raleigh Logistics Company&apos;s Monitoring Dashboard Goes Silent During an Actual Outage</SectionTitle>

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
            Scenario — Freight logistics company, Raleigh · Monitoring gap during an incident
          </div>

          <Para>
            A Raleigh freight-logistics company runs a Python script on a warehouse scanning station that
            continuously prints status updates as packages are processed — normal scans as ordinary
            output, problems (a barcode that fails to scan, a package routed to the wrong bay) as error
            output that a separate monitoring tool is supposed to catch and alert the floor supervisor
            about immediately. One afternoon, a barcode scanner starts silently misreading labels for
            nearly twenty minutes, misrouting dozens of packages — and the monitoring tool never fires a
            single alert.
          </Para>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            Every message in the script — routine scans and genuine errors alike — was being written with
            plain <code>print()</code>, all going to <code>stdout</code>. The monitoring tool, reasonably
            configured to watch only <code>stderr</code> for problems (exactly the setup described in
            Part 05), never saw a single one of the misrouting errors, because none of them were ever
            actually written to <code>stderr</code> in the first place — they were indistinguishable, at
            the stream level, from routine scan confirmations.
          </Para>

          <CodeBox label="The original script — everything on one stream">{`print(f"Scanned package {package_id}: OK")
print(f"ERROR: package {package_id} failed barcode validation")   # still just stdout!`}</CodeBox>

          <SubSubTitle>The fix, and the second problem it uncovered</SubSubTitle>

          <CodeBox label="The fix — errors actually routed to stderr">{`import sys

print(f"Scanned package {package_id}: OK")
print(f"ERROR: package {package_id} failed barcode validation", file=sys.stderr, flush=True)`}</CodeBox>

          <Para>
            Fixing the stream split by itself was not quite enough — the team also discovered the
            script&apos;s output was buffered, meaning even the correctly-routed <code>stderr</code>{' '}
            messages could sit unflushed for a noticeable delay under load before actually reaching the
            monitoring tool, exactly the buffering behaviour from Part 06. Adding <code>flush=True</code>{' '}
            to the error path guaranteed every failure reached the monitoring tool the instant it
            happened, not whenever Python&apos;s output buffer happened to empty on its own.
          </Para>

          <Para>
            Two small keyword arguments — <code>file=sys.stderr</code> and <code>flush=True</code> — were
            the entire fix. It is a genuine, real-world reminder that the "trivial" arguments to a
            function as familiar as <code>print()</code> are exactly the kind of detail that separates
            code that merely works during a demo from code that is actually observable and trustworthy
            once it is running unattended in production.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Input and Output</SectionTitle>

        {[
          {
            wrong: '"input() automatically figures out if the user typed a number and returns the right type"',
            right: 'input() always returns a str, with zero exceptions, no matter what the user typed. If a number is needed, it must be converted explicitly with int() or float() — this is one of the most common early Python bugs.',
          },
          {
            wrong: '"print() writing to stdout vs stderr doesn\'t really matter — they both just show up in the terminal"',
            right: 'They look identical in a plain terminal, which is exactly what makes the distinction easy to dismiss — but they behave completely differently once output is redirected or piped, which is extremely common in real production tooling. Monitoring systems and log pipelines frequently treat the two streams entirely separately.',
          },
          {
            wrong: '"print() always writes to the screen the instant it\'s called"',
            right: 'Output is often buffered — collected and written out in batches for performance — so a print() call is not guaranteed to appear immediately. flush=True forces immediate output when that timing genuinely matters, such as live progress indicators or real-time log monitoring.',
          },
          {
            wrong: '"print() debugging is something you graduate out of once you\'re experienced"',
            right: 'Experienced engineers use it constantly for small, quick questions — it is fast and requires no setup. What changes with experience is recognising its limits: it needs a source-code edit and a re-run for every new question, and it does not scale to large codebases or intermittent bugs, which is exactly where a real debugger (covered in a dedicated later module) becomes worth the setup cost.',
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
            q: 'What type does input() always return, and why does this matter?',
            a: 'input() always returns a str, regardless of what the user typed — even if they typed a number, it comes back as text. This matters because using that value in arithmetic without converting it first (e.g. age + 1 where age = input(...)) raises a TypeError. The value must be explicitly converted with int() or float() before use as a number.',
          },
          {
            q: 'What do the sep and end keyword arguments of print() control?',
            a: 'sep controls what string is inserted between multiple arguments passed to a single print() call (the default is a single space). end controls what is written after the entire call finishes (the default is a newline, "\\n"), which is why print() calls normally appear on separate lines — setting end="" or end=" " keeps subsequent output on the same line.',
          },
          {
            q: 'What is the difference between stdout and stderr, and how do you print to stderr?',
            a: 'stdout is the standard stream for normal program output; stderr is the standard stream for error and diagnostic messages. print() writes to stdout by default. Passing file=sys.stderr redirects a specific print() call to stderr instead. The distinction matters once output is redirected or piped — tools commonly treat the two streams very differently, for example capturing stdout to a file while still surfacing stderr messages immediately.',
          },
          {
            q: 'What does flush=True do in a print() call, and when is it actually needed?',
            a: 'Output is often buffered for performance, meaning a print() call is not guaranteed to appear immediately. flush=True forces the output to be written right away, bypassing the buffer. It matters specifically for long-running processes whose output is being watched or piped in real time, and for progress indicators that repeatedly overwrite a single line — both cases where a delay would defeat the purpose.',
          },
          {
            q: 'What are the real limitations of print()-based debugging?',
            a: 'It requires editing the source code and re-running the program to check any new value, it can clutter or accidentally ship in real code if left in, and it cannot pause execution to let you interactively inspect the full program state at a point in time. It does not scale well to large codebases or bugs that only reproduce intermittently. A real debugger addresses these gaps by letting you pause execution at an exact line and inspect everything in scope without modifying the source.',
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
        <SectionTitle>Input/Output Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Trying to do arithmetic on input() without converting it first',
            a: 'age = input("Age: "); age + 1 raises TypeError, because age is a string. Convert immediately at the point of input: age = int(input("Age: ")).',
          },
          {
            q: 'Calling input() with no prompt text',
            a: 'A bare input() with no argument still works, but the program appears to silently hang, with no indication it is waiting for the user. Always pass a clear prompt string.',
          },
          {
            q: 'Assuming .split() on user input produces the right number of items every time',
            a: 'a, b = input().split() raises ValueError if the user does not type exactly two space-separated values. Real input from real users is unreliable — production code needs to validate this rather than assume it, a topic covered fully once you reach Exception Handling.',
          },
          {
            q: 'Sending real error messages to stdout instead of stderr',
            a: 'As shown in the Real World example above, this can cause monitoring or logging tools that are only watching stderr to miss genuine problems entirely, even though the messages are technically being printed somewhere.',
          },
          {
            q: 'Leaving debug print() calls in code that ships to production',
            a: 'Forgotten debug prints clutter real output, can leak sensitive data into logs, and are a common source of noisy, confusing production logs. Label debug prints clearly while working, and remove them (or switch to a real logging setup) before shipping.',
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
        <SectionTitle>Errors You Will Hit With Input and Output — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: can only concatenate str (not "int") to str`,
            cause: 'Adding an int directly to the raw string returned by input(), without converting it first — for example "Age: " + input(...) or input(...) + 1.',
            fix: 'Convert the input to the right type immediately: int(input(...)). If building a message, use an f-string instead of manual concatenation.',
          },
          {
            error: `ValueError: invalid literal for int() with base 10: 'twenty-five'`,
            cause: 'Calling int() on a string that does not represent a valid whole number — commonly, real user input that does not match what the program expected.',
            fix: 'Validate or handle this properly with a try/except block (covered fully in the Exception Handling module) rather than assuming users will always type a valid number.',
          },
          {
            error: `ValueError: too many values to unpack (expected 2)`,
            cause: 'Splitting a line of input and unpacking it into a fixed number of names, when the user typed more (or fewer) space-separated values than expected.',
            fix: 'Validate the number of values before unpacking, or use extended unpacking (first, *rest = input().split()) if a variable number of values is genuinely expected.',
          },
          {
            error: `NameError: name 'sys' is not defined`,
            cause: 'Using sys.stderr in a print() call without importing the sys module first.',
            fix: 'Add "import sys" at the top of the file before using sys.stderr or sys.stdout.',
          },
          {
            error: `EOFError: EOF when reading a line`,
            cause: 'input() was called but there was no more input available to read — commonly happens when a script expecting interactive input is run in an automated environment (like a CI pipeline) with no terminal attached to provide it.',
            fix: 'Ensure the environment the script runs in can actually supply input interactively, or redesign the script to accept input another way (command-line arguments, a config file) when it needs to run unattended.',
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
        'input() always returns a str, with no exceptions — convert immediately with int() or float() at the point of input if a number is needed.',
        '.split() on the result of input(), combined with unpacking, is the standard way to read several values from one line: name, age = input().split().',
        'f-string format specs were covered in full in the Strings module — this module deliberately did not repeat that ground, only briefly recapped it.',
        'print()\'s sep controls what goes between multiple arguments (default: a space); end controls what follows the whole call (default: a newline).',
        'print() writes to stdout by default; file=sys.stderr redirects it to the error stream — a distinction that matters once output is redirected or piped, common in real production tooling.',
        'Output is often buffered for performance; flush=True forces it to appear immediately, which matters for live-updating output and real-time monitoring.',
        'print()-based debugging is a legitimate, fast first tool — its real limits (no interactive state inspection, needing a re-run for every new question) are exactly what a proper debugger, covered later in this track, solves.',
        'This is the last module of Phase 1 (Python Foundations) — Phase 2 (Core Data Structures & Logic) begins with dictionaries next.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          Phase 1 complete — Phase 2 starts next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          That completes Phase 1 — Python Foundations. Module 11 opens Phase 2 (Core Data Structures &amp;
          Logic) with dictionaries — the most-used data structure in real Python code — covering
          key-value storage, iteration patterns, and performance characteristics.
        </p>
        <Link href="/learn/python/dictionaries" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 11 → Dictionaries
        </Link>
      </div>
    </LearnLayout>
  )
}
