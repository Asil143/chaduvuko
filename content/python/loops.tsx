import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Loops — for / while, break / continue — Python | Chaduvuko',
  description:
    'Every form of iteration in Python: for loops over every kind of iterable, range() in depth, while loops, break/continue, the loop else clause, nested loops, enumerate(), and zip().',
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

export default function Loops() {
  return (
    <LearnLayout
      title="Loops — for / while, break / continue"
      description="Every form of iteration in Python — for loops, range(), while loops, break/continue, the loop else clause, nested loops, enumerate(), and zip()."
      section="Python — Module 06"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The for Loop" />
        <SectionTitle>for Loops — Iterating Over Anything Python Can Walk Through</SectionTitle>

        <Para>
          A <code>for</code> loop in Python is fundamentally different from the "count from 0 to N"
          for-loop you may have seen in C, Java, or JavaScript. Python&apos;s <code>for</code> loop is
          built around a single idea: it walks through an <strong>iterable</strong> — anything Python
          knows how to hand out values from, one at a time — and runs its body once per value. There is
          no separate counter variable to initialise, no condition to check, and no increment step to
          remember. You simply say "for each thing in this collection, do this."
        </Para>

        <CodeBox label="for loops over a string">{`for letter in "Python":
    print(letter)

# P
# y
# t
# h
# o
# n
# A string is iterable — each character is handed out in order, one at a time.`}</CodeBox>

        <Para>
          This works identically over a <code>range()</code> (covered in depth in Part 02) and over a{' '}
          <code>list</code> — you have not formally met lists yet (that is the entire subject of the
          next module), but you have already seen enough of them to follow a loop over one.
        </Para>

        <CodeBox label="for loops over a range and a list">{`for i in range(5):
    print(i)
# 0  1  2  3  4

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry`}</CodeBox>

        <Para>
          The important mental shift, if you are coming from a language with C-style for loops: Python
          does not ask "how many times should this run, and what index am I on?" It asks "what
          collection am I walking through, and what is the current item?" Every iterable in Python — a
          string, a range, a list, a dict, a set, a file opened for reading, and dozens of built-in
          functions that produce values lazily — plugs into exactly this same <code>for x in ...:</code>{' '}
          syntax. You are learning one mechanism that will keep working, unmodified, as your data
          structures get richer through the rest of this track.
        </Para>

        <Callout type="info">
          Lists, dicts, and sets each get a full dedicated module shortly (Modules 08, 09, and 11). For
          now, treat them the way this module does — as "a collection of values a for loop can walk
          through" — and focus entirely on how the loop itself behaves. The specific data structures
          will fill in fast once the loop mechanics underneath them are second nature.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — range() in Depth" />
        <SectionTitle>range() — All Three Forms, and the Off-By-One Mistakes That Come With Them</SectionTitle>

        <Para>
          <code>range()</code> generates a sequence of integers, and it is by far the most common way to
          write a "run this N times" loop in Python. It comes in three forms depending on how many
          arguments you give it, and each form has a specific, easy-to-misremember rule about which
          numbers it includes.
        </Para>

        <CodeBox label="The three forms of range()">{`range(5)          # 0, 1, 2, 3, 4          — stop only: starts at 0, stops BEFORE 5
range(2, 8)       # 2, 3, 4, 5, 6, 7        — start, stop: starts at 2, stops BEFORE 8
range(0, 10, 2)   # 0, 2, 4, 6, 8           — start, stop, step: counts by 2, stops BEFORE 10`}</CodeBox>

        <Para>
          The single rule to memorise: <code>range()</code> always <strong>excludes</strong> its stop
          value. <code>range(5)</code> produces five numbers — 0 through 4 — never 5. This trips up
          nearly every beginner at least once, usually while trying to loop "from 1 to 10 inclusive" and
          getting nine numbers instead of ten, or getting an index one past the end of a collection.
        </Para>

        <CodeBox label="The classic off-by-one mistakes">{`# Wanting the numbers 1 through 10, inclusive
for i in range(1, 10):     # WRONG — this gives 1 through 9
    print(i)

for i in range(1, 11):     # RIGHT — stop must be one past the last value you want
    print(i)

# Wanting to loop over every index of a 5-item list
items = ["a", "b", "c", "d", "e"]
for i in range(len(items)):     # RIGHT — len(items) is 5, so this gives 0..4, exactly the valid indices
    print(items[i])

for i in range(len(items) - 1):  # WRONG — silently skips the last item`}</CodeBox>

        <Callout type="warning">
          <strong>The fix for the off-by-one bug is almost always the same:</strong> when you want{' '}
          <code>N</code> to be included, the stop argument must be <code>N + 1</code>. When you want
          every valid index of a collection of length <code>N</code>, the stop argument is exactly{' '}
          <code>N</code> (since indices run from 0 to N-1) — do not subtract 1 a second time, that is
          the mistake shown above.
        </Callout>

        <SubTitle>range() with a negative step — counting downward</SubTitle>

        <Para>
          A negative step counts backwards. The same stop-is-excluded rule still applies, which means
          counting down to (and including) 1 requires a stop of 0, not 1.
        </Para>

        <CodeBox label="Counting down">{`for i in range(10, 0, -1):
    print(i)
# 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
# Stop is 0, not 1 — because 0 is excluded, and we want 1 to be the last value printed.`}</CodeBox>

        <Para>
          One more property worth knowing: <code>range()</code> does not build a full list of numbers in
          memory up front — it is a lazy sequence that computes each value only as the loop asks for it.{' '}
          <code>range(10_000_000)</code> takes essentially no memory to create, unlike building an actual
          list of ten million integers. This matters more once you reach the Performance and Generators
          modules later in this track, but it is worth knowing now that <code>range()</code> is cheap
          regardless of how large the range is.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The while Loop" />
        <SectionTitle>while Loops — Repeating Until a Condition Becomes False</SectionTitle>

        <Para>
          Where <code>for</code> is built around "walk through this collection," <code>while</code> is
          built around "keep repeating as long as this condition is true." Use <code>while</code> when
          you do not know in advance how many iterations you need — waiting for user input to satisfy
          some rule, retrying a network request until it succeeds, or processing a queue until it is
          empty are all situations where a fixed count does not make sense, but a condition does.
        </Para>

        <CodeBox label="A basic while loop">{`count = 0
while count < 5:
    print(count)
    count += 1

# 0  1  2  3  4
# The loop checks "count < 5" BEFORE every iteration, including the first.
# Once count reaches 5, the condition is false and the loop stops.`}</CodeBox>

        <SubTitle>The infinite loop danger — and why it is entirely your responsibility</SubTitle>

        <Para>
          Unlike a <code>for</code> loop, which automatically terminates once its iterable is exhausted,
          a <code>while</code> loop has no built-in stopping point at all. If the condition never
          becomes false, the loop runs forever — this is called an infinite loop, and it is one of the
          single most common bugs written by engineers of every experience level, not just beginners.
        </Para>

        <CodeBox label="An accidental infinite loop">{`count = 0
while count < 5:
    print(count)
    # forgot to increment count!

# This never stops. count is always 0, so "count < 5" is always True.
# In a real terminal, this would hang the program until you interrupt it (Ctrl+C).`}</CodeBox>

        <Callout type="warning">
          <strong>Every while loop needs a visible reason it will eventually stop.</strong> Before you
          write the loop body, ask: what changes on every iteration that eventually makes this condition
          false? If you cannot answer that in one sentence, you are about to write an infinite loop.
          This is exactly the kind of bug that survives local testing (where you get bored and hit
          Ctrl+C) and then hangs a production process, silently consuming CPU and never returning a
          response, until someone notices.
        </Callout>

        <SubTitle>while True: — an intentional infinite loop with an internal exit</SubTitle>

        <Para>
          Sometimes an infinite loop is exactly what you want — deliberately, with an explicit{' '}
          <code>break</code> somewhere inside it to exit. This pattern is extremely common for things
          like a command-line menu that keeps prompting the user until they choose "quit."
        </Para>

        <CodeBox label="A deliberate infinite loop, with a clear exit condition">{`while True:
    command = input("Enter a command (or 'quit'): ")
    if command == "quit":
        break
    print(f"Running: {command}")

print("Goodbye!")`}</CodeBox>

        <Para>
          This is not the same mistake as the accidental infinite loop above — the difference is that{' '}
          <code>break</code> gives the loop an explicit, readable exit path. A reviewer can look at{' '}
          <code>while True:</code> immediately followed by an <code>if ...: break</code> and understand
          exactly how the loop ends, which is the entire point.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — break and continue" />
        <SectionTitle>break and continue — Changing a Loop&apos;s Path Mid-Iteration</SectionTitle>

        <Para>
          <code>break</code> and <code>continue</code> both work inside <code>for</code> and{' '}
          <code>while</code> loops, and both let you change the loop&apos;s normal flow without a wall of
          extra conditionals wrapping the entire loop body.
        </Para>

        <CodeBox label="break — exit the loop entirely, immediately">{`numbers = [4, 8, 15, 16, 23, 42]

for n in numbers:
    if n == 16:
        print("Found 16, stopping search")
        break
    print(f"Checking {n}...")

# Checking 4...
# Checking 8...
# Checking 15...
# Found 16, stopping search
# Note: 23 and 42 are never even looked at — break exits the loop completely.`}</CodeBox>

        <CodeBox label="continue — skip the rest of THIS iteration, move to the next one">{`numbers = [1, 2, 3, 4, 5, 6, 7, 8]

for n in numbers:
    if n % 2 != 0:
        continue          # skip odd numbers — jump straight to the next iteration
    print(n)

# 2  4  6  8
# continue does not exit the loop — it only skips the remaining lines
# in the CURRENT pass, then moves on to the next item as normal.`}</CodeBox>

        <Para>
          The distinction is easy to state but worth being precise about: <code>break</code> ends the
          loop — no more iterations happen, and execution continues on the line right after the loop.{' '}
          <code>continue</code> ends only the <em>current</em> iteration — the loop keeps going with the
          next item, exactly as if you had wrapped the rest of the loop body in an{' '}
          <code>if</code> that skipped it.
        </Para>

        <Callout type="tip">
          <strong>continue is frequently a cleaner alternative to nested ifs.</strong> Compare{' '}
          <code>for x in items: if is_valid(x): process(x)</code> against{' '}
          <code>for x in items: if not is_valid(x): continue \\n process(x)</code>. The second form is a
          guard clause applied to a loop body — the exact same readability idea from the Control Flow
          module, just inside a loop instead of a function.
        </Callout>

        <Para>
          Both <code>break</code> and <code>continue</code> work identically inside <code>while</code>{' '}
          loops — there is nothing special about their behaviour with <code>for</code> specifically. In
          a nested loop (Part 06), both only affect the innermost loop they are written inside — a
          detail that matters more than it might first appear.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The else Clause on Loops" />
        <SectionTitle>The Loop else Clause — Python&apos;s Most Skipped-Over Feature</SectionTitle>

        <Para>
          This is a genuinely obscure corner of Python that most tutorials skip entirely, and most
          working engineers have never used — but it solves a real, specific problem cleanly enough that
          it is worth understanding properly rather than avoiding out of unfamiliarity. Both{' '}
          <code>for</code> and <code>while</code> loops can have an <code>else</code> clause attached.
          The rule that governs it is precise and, once you see it once, easy to remember:{' '}
          <strong>the else block runs if the loop finished normally — that is, if it was never stopped
          early by a break.</strong>
        </Para>

        <CodeBox label="The rule in its simplest form">{`for x in range(5):
    print(x)
else:
    print("Loop completed without a break")

# 0 1 2 3 4
# Loop completed without a break
# The else ran because the loop reached the end on its own.`}</CodeBox>

        <CodeBox label="The same loop, but this time with a break">{`for x in range(5):
    if x == 3:
        break
    print(x)
else:
    print("Loop completed without a break")

# 0
# 1
# 2
# (nothing else prints — the else is SKIPPED because break fired)`}</CodeBox>

        <Para>
          The problem this solves: searching for something in a loop, and needing to know whether the
          search succeeded or ran out of items to check. Without the loop <code>else</code>, this
          normally requires a separate flag variable set before the loop and checked after it.
        </Para>

        <CodeBox label="The problem, solved WITHOUT the loop else — an extra flag variable">{`numbers = [4, 8, 15, 16, 23, 42]
target = 99
found = False

for n in numbers:
    if n == target:
        found = True
        break

if not found:
    print(f"{target} was not in the list")`}</CodeBox>

        <CodeBox label="The same problem, solved WITH the loop else — no flag variable needed">{`numbers = [4, 8, 15, 16, 23, 42]
target = 99

for n in numbers:
    if n == target:
        print(f"Found {target}")
        break
else:
    print(f"{target} was not in the list")

# The "else" here effectively means: "if the for loop never broke, run this."
# It reads almost like "for...else" is asking "did we NOT find it?"`}</CodeBox>

        <Callout type="info">
          A genuinely useful way to remember the rule, borrowed from the Python community: think of it as{' '}
          <strong>&quot;else — no break.&quot;</strong> The else block is the code that runs precisely
          when the loop did <em>not</em> hit a break. It has nothing to do with the loop&apos;s condition
          being false in the ordinary sense — a plain <code>for</code> loop with no <code>break</code> at
          all will always run its <code>else</code>, every single time, once it finishes.
        </Callout>

        <Para>
          Most experienced Python engineers still avoid this feature in real code — not because it is
          broken, but because so few readers recognise it on sight that it tends to slow a reviewer down
          rather than help them. Knowing it exists and reading it correctly when you encounter it in
          someone else&apos;s code is genuinely valuable; reaching for it as your default pattern is a
          judgment call you will develop over time.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Nested Loops" />
        <SectionTitle>Nested Loops — And Why Their Performance Cost Compounds</SectionTitle>

        <Para>
          A loop can contain another loop inside its body — this is called nesting, and it is the
          standard way to work through two-dimensional data, like a grid, a table, or every possible
          pair of items from two separate collections.
        </Para>

        <CodeBox label="A nested loop over a grid">{`for row in range(3):
    for col in range(3):
        print(f"({row}, {col})", end="  ")
    print()   # newline after each row

# (0, 0)  (0, 1)  (0, 2)
# (1, 0)  (1, 1)  (1, 2)
# (2, 0)  (2, 1)  (2, 2)`}</CodeBox>

        <Para>
          The inner loop runs to completion for <strong>every single</strong> iteration of the outer
          loop — this is the detail that matters for performance. A 3×3 nested loop runs the inner
          body 9 times total (3 outer iterations × 3 inner iterations each). This multiplies, not adds:
          a nested loop over two lists of 1,000 items each does not run 2,000 times — it runs 1,000,000
          times.
        </Para>

        <CodeBox label="Why nested loops over large collections get slow fast">{`list_a = list(range(1000))
list_b = list(range(1000))

count = 0
for a in list_a:
    for b in list_b:
        count += 1

print(count)   # 1,000,000 — not 2,000
# This is what engineers mean by "O(n squared)" — covered properly
# in the Operators module's discussion of algorithmic complexity, and
# again in depth once you reach the Algorithms phase of this track.`}</CodeBox>

        <Callout type="warning">
          <strong>A nested loop is the most common source of a program that works fine in testing and
          then becomes unbearably slow in production.</strong> Testing with 10-item sample lists, a
          nested loop runs 100 times — instant. The same code against 50,000 real records runs 2.5
          billion times. Before writing a nested loop over real data, it is worth asking whether a
          dictionary lookup (covered in Module 11) or a set membership check (covered in the next
          module) could replace the inner loop entirely — both are dramatically faster for exactly this
          kind of "does this exist in the other collection" question.
        </Callout>

        <SubTitle>break only exits the innermost loop</SubTitle>

        <Para>
          A detail that catches people off guard the first time: <code>break</code> inside a nested loop
          only stops the loop it is directly written inside — the loop or loops surrounding it keep
          running normally.
        </Para>

        <CodeBox label="break only escapes one level">{`for row in range(3):
    for col in range(3):
        if col == 1:
            break     # only exits the INNER loop
        print(f"({row}, {col})")

# (0, 0)
# (1, 0)
# (2, 0)
# The outer loop still ran all 3 times — break never touched it.`}</CodeBox>

        <Para>
          There is no built-in "break out of both loops at once" keyword in Python. The standard fix is
          to pull the nested loops into a function and use <code>return</code> to exit both levels at
          once, or to set a flag variable that the outer loop checks after the inner loop finishes.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — enumerate()" />
        <SectionTitle>enumerate() — Getting the Index and the Value Together</SectionTitle>

        <Para>
          A very common early-Python mistake is reaching for <code>range(len(items))</code> whenever
          both the index and the value are needed inside a loop. It works, but it is not the idiomatic
          way to write it, and it is noticeably less readable.
        </Para>

        <CodeBox label="The non-idiomatic way">{`fruits = ["apple", "banana", "cherry"]

for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# 0: apple
# 1: banana
# 2: cherry
# Works — but "i" is only ever used to re-index back into "fruits". That's the smell.`}</CodeBox>

        <CodeBox label="The idiomatic way — enumerate()">{`fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# 0: apple
# 1: banana
# 2: cherry
# Identical output, but "fruit" is handed to you directly — no manual re-indexing.`}</CodeBox>

        <Para>
          <code>enumerate()</code> wraps any iterable and hands back pairs of <code>(index, value)</code>{' '}
          on each pass, which you unpack directly into two loop variables. It is a small change, but it
          is exactly the kind of idiom a Python code reviewer expects to see, and{' '}
          <code>range(len(...))</code> used purely to fetch an index is one of the most common review
          comments given to engineers new to the language.
        </Para>

        <CodeBox label="enumerate() with a custom starting number">{`for i, fruit in enumerate(fruits, start=1):
    print(f"{i}: {fruit}")

# 1: apple
# 2: banana
# 3: cherry
# Useful for human-facing output — numbering a printed list starting at 1, not 0.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — zip()" />
        <SectionTitle>zip() — Looping Over Multiple Collections in Parallel</SectionTitle>

        <Para>
          <code>zip()</code> takes two or more iterables and walks through them together, handing back
          one item from each on every pass — the loop equivalent of lining up two lists side by side and
          reading across both at once.
        </Para>

        <CodeBox label="zip() pairs items positionally">{`names = ["Maria", "Jordan", "Priya"]
scores = [92, 85, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Maria: 92
# Jordan: 85
# Priya: 78`}</CodeBox>

        <Para>
          Without <code>zip()</code>, the same result requires manually indexing into both lists using a
          shared index from <code>range()</code> — noticeably clumsier, and a step further from what the
          code is actually trying to express.
        </Para>

        <CodeBox label="The manual version zip() replaces">{`for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")
# Same result, but two separate lookups per iteration instead of one direct unpack.`}</CodeBox>

        <SubTitle>zip() stops at the shortest iterable — silently</SubTitle>

        <Para>
          If the collections passed to <code>zip()</code> are different lengths, it stops as soon as the{' '}
          <strong>shortest</strong> one runs out — it does not raise an error, and it does not warn you.
          Extra items in the longer collection are simply never visited.
        </Para>

        <CodeBox label="A silent, easy-to-miss data loss bug">{`names = ["Maria", "Jordan", "Priya", "Sam"]
scores = [92, 85, 78]   # one shorter than "names" — maybe Sam's score is still pending

for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Maria: 92
# Jordan: 85
# Priya: 78
# Sam is silently dropped — no error, no warning. This is exactly the kind of bug
# that looks fine in a demo with matched-length test data and then loses real
# records once the two lists genuinely diverge in production.`}</CodeBox>

        <Callout type="warning">
          If mismatched lengths should be treated as a bug rather than something to silently tolerate,
          Python&apos;s <code>itertools.zip_longest()</code> is the safer choice — it continues through
          the longest iterable and fills in a placeholder (<code>None</code> by default) for any
          collection that ran out early, making the mismatch visible instead of quietly hiding it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Denver Ski-Resort Booking Platform&apos;s Nightly Job Goes From 40 Minutes to 4 Seconds</SectionTitle>

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
            Scenario — Travel booking startup, Denver · Batch job performance
          </div>

          <Para>
            A Denver-based ski-resort booking platform runs a nightly job that cross-references every
            newly created reservation against a list of resorts currently flagged for maintenance
            closures, to automatically send affected customers a rebooking notice. Early on, with a
            handful of resorts and a few hundred daily reservations, the job ran in under a second. Two
            seasons later, with thousands of daily reservations and hundreds of resorts on the platform,
            the same nightly job is taking 40 minutes and regularly runs past its scheduled window.
          </Para>

          <SubSubTitle>What the on-call engineer finds</SubSubTitle>

          <Para>
            The job&apos;s core logic is a nested loop, written when the data was tiny and never
            revisited: for every reservation, loop over the entire list of flagged resorts checking for
            a match. Exactly the pattern from Part 06 — two collections that started small enough that
            the nested loop&apos;s cost was invisible, and grew until the multiplication caught up with
            the team. With 5,000 reservations and 300 flagged resorts, that is 1.5 million comparisons
            every night, and climbing every season.
          </Para>

          <CodeBox label="The original nightly job">{`flagged_resort_ids = get_flagged_resorts()   # returns a list

for reservation in get_new_reservations():
    for resort_id in flagged_resort_ids:
        if reservation.resort_id == resort_id:
            send_rebooking_notice(reservation)
            break`}</CodeBox>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The engineer converts <code>flagged_resort_ids</code> from a list to a <code>set</code> —
            covered in full in the next module, but the relevant idea is simple enough to use here
            already: checking whether a value exists in a set is dramatically faster than scanning
            through a list, because a set does not need to check every item one by one. The nested loop
            collapses into a single loop with a fast membership check.
          </Para>

          <CodeBox label="The fix — one loop, a set for fast lookups">{`flagged_resort_ids = set(get_flagged_resorts())   # a set, not a list

for reservation in get_new_reservations():
    if reservation.resort_id in flagged_resort_ids:
        send_rebooking_notice(reservation)`}</CodeBox>

          <Para>
            The nightly job drops from 40 minutes to about 4 seconds. Nothing about the business logic
            changed — the fix was entirely about recognising a nested loop that had quietly become an{' '}
            <em>O(n × m)</em> operation over data that had grown past the point where that mattered, and
            replacing the inner loop with a lookup that does not scale the same way. This exact
            diagnosis — "why did the nightly job suddenly get slow" turning out to be a nested loop over
            data that grew — is one of the most common performance investigations in real backend
            engineering.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Loops</SectionTitle>

        {[
          {
            wrong: '"range(len(items)) is the normal way to loop with an index"',
            right: 'It works, but enumerate(items) is the idiomatic form and is what experienced Python reviewers expect to see. range(len(...)) is a strong signal that a loop was ported from a language with C-style for loops rather than written with Python\'s iteration model in mind.',
          },
          {
            wrong: '"The else on a for loop runs if the loop condition becomes false, like an if/else"',
            right: 'It has nothing to do with a condition becoming false. It runs specifically when the loop completes WITHOUT hitting a break. A loop with no break at all will always run its else — every time — regardless of what the loop actually iterated over.',
          },
          {
            wrong: '"break exits every loop it\'s nested inside, not just the current one"',
            right: 'break only exits the innermost loop directly containing it. Outer loops keep running normally. Escaping multiple nested loops at once requires a different technique, such as moving the loops into a function and using return.',
          },
          {
            wrong: '"zip() raises an error if the lists you pass it are different lengths"',
            right: 'It does not — it silently stops as soon as the shortest iterable is exhausted, with no warning, quietly dropping any extra items from the longer ones. If mismatched lengths should be a visible bug rather than silent data loss, use itertools.zip_longest() instead.',
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
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between break and continue?',
            a: 'break exits the loop immediately — no further iterations run, and execution resumes on the line after the loop. continue skips only the remainder of the current iteration and moves on to the next one, leaving the loop itself running. In a nested loop, both only affect the innermost loop they are written inside.',
          },
          {
            q: 'When does the else clause on a for or while loop execute?',
            a: 'It runs when the loop completes normally — that is, when it finishes without ever hitting a break. A common way to remember it: "else — no break." It is most useful for search loops, where you need to distinguish between "found it and stopped early" and "checked everything and found nothing," without a separate flag variable.',
          },
          {
            q: 'Why is enumerate(items) preferred over range(len(items)) when you need both index and value?',
            a: 'enumerate() hands back the index and the value together on each iteration, without a separate re-indexing step back into the collection. range(len(items)) only gives you an index, forcing an extra items[i] lookup inside the loop body. enumerate() is shorter, avoids a redundant lookup, and is the form experienced Python reviewers expect.',
          },
          {
            q: 'What happens if you call zip() on two lists of different lengths?',
            a: 'zip() stops as soon as the shorter of the two iterables is exhausted — it does not raise an error or warning, and any extra items in the longer iterable are silently never visited. If mismatched lengths should be treated as an error condition rather than silently tolerated, use itertools.zip_longest(), which continues through the longest iterable and fills a placeholder for any exhausted ones.',
          },
          {
            q: 'Why can nested loops become a serious performance problem as data grows?',
            a: 'The inner loop runs to completion for every single iteration of the outer loop, so the total number of iterations is the PRODUCT of the two lengths, not their sum — a nested loop over two 1,000-item collections runs one million times, not two thousand. This is commonly called O(n squared) behaviour. As real data grows, this can turn a job that ran instantly in testing into one that takes minutes or hours in production; replacing the inner loop with a set or dict lookup is the standard fix.',
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
        <SectionTitle>Loop Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting that range(N) stops before N, not at N',
            a: 'range(5) produces 0 through 4 — never 5. When you need N included, the stop argument must be N + 1. This is the single most common off-by-one bug in early Python code.',
          },
          {
            q: 'Writing a while loop with no clear way for the condition to become false',
            a: 'Before writing the loop body, identify exactly what changes on each pass that will eventually make the condition False. If you cannot state it in one sentence, you are likely about to write an infinite loop.',
          },
          {
            q: 'Modifying a list while looping over it directly',
            a: 'Removing or adding items to a list while iterating over that same list with a for loop causes items to be skipped or visited twice, because the loop is tracking a position that shifts underneath it as the list changes size. Loop over a copy (for x in original_list[:]:) or build a new list instead, as covered fully in the Lists module.',
          },
          {
            q: 'Assuming break exits every level of a nested loop',
            a: 'It only exits the loop it is directly written inside. Escaping multiple nested loops at once requires restructuring — commonly moving the loops into a function and using return, or setting and checking a flag variable.',
          },
          {
            q: 'Using a nested loop to check membership instead of a set',
            a: 'A nested loop that checks "does this item exist in the other collection" scales as O(n × m) and gets slow fast as both collections grow. Converting the collection being checked against into a set (covered in Part 07 of the Real World example, and fully in the next module) turns that into a single fast lookup per item.',
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
        <SectionTitle>Errors You Will Hit With Loops — And Exactly Why</SectionTitle>

        {[
          {
            error: `IndexError: list index out of range`,
            cause: 'A loop attempts to access an index that does not exist — most commonly because range() was given the wrong stop value, or because a list was modified (shrunk) while a loop was still iterating over indices computed before the change.',
            fix: 'Double-check your range() bounds against the collection\'s actual length, and prefer iterating directly over items (for item in items:) instead of manually indexing wherever the index itself is not actually needed.',
          },
          {
            error: `TypeError: 'int' object is not iterable`,
            cause: 'Writing "for x in 5:" instead of "for x in range(5):" — a plain integer cannot be iterated over directly; only range() (or another iterable) can.',
            fix: 'Wrap the integer in range() if you meant to loop that many times, or double-check that the variable actually holds an iterable, not a raw number.',
          },
          {
            error: `KeyboardInterrupt (after the program hangs indefinitely)`,
            cause: 'An infinite loop — most often a while loop whose condition never becomes False, caused by forgetting to update the variable the condition depends on inside the loop body.',
            fix: 'Read through the loop body and confirm something changes, on every iteration, that moves the condition toward becoming False. Add a hard safety limit (a counter with a maximum) while debugging if you are not yet sure where the logic is wrong.',
          },
          {
            error: `RuntimeError: dictionary changed size during iteration (or similar, for sets)`,
            cause: 'Adding or removing items from a dict or set while a for loop is actively iterating over it — Python detects the structure changed mid-iteration and refuses to continue, since it cannot guarantee correct behaviour.',
            fix: 'Iterate over a copy — for key in list(my_dict.keys()): — if you need to modify the original during the loop, or build a new collection instead of mutating the one you are iterating over.',
          },
          {
            error: `SyntaxError: invalid syntax (on a for/while line missing a colon)`,
            cause: 'A for or while line ends without a trailing colon, exactly like the same mistake with if statements covered in the Control Flow module.',
            fix: 'Add the colon at the end of the for or while line — it is what tells Python an indented block follows.',
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
        'A for loop walks through any iterable — a string, range, list, or anything else Python can iterate — one value at a time. It is not a counting loop the way for loops are in C-style languages.',
        'range() always excludes its stop value. range(5) gives 0-4, not 0-5. When N should be included, the stop argument is N + 1.',
        'while loops repeat as long as a condition is true, and have no automatic stopping point — you are entirely responsible for ensuring the condition eventually becomes False.',
        'break exits a loop immediately; continue skips only the rest of the current iteration. Both only affect the innermost loop they are written inside.',
        'The else clause on a for/while loop runs when the loop finishes WITHOUT hitting a break — remember it as "else, no break." It removes the need for a separate found/not-found flag variable.',
        'Nested loops multiply their iteration counts (n × m, not n + m). This is the single most common cause of code that is fast in testing and slow in production once real data volume arrives.',
        'enumerate(items) is the idiomatic way to get index and value together — prefer it over range(len(items)).',
        'zip() pairs up multiple iterables and silently stops at the shortest one — use itertools.zip_longest() when mismatched lengths should be visible rather than silently tolerated.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 07 covers functions — how to stop repeating yourself, parameters and default arguments
          (including a classic gotcha that catches even experienced engineers), return values, and the
          basics of variable scope.
        </p>
        <Link href="/learn/python/functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 07 → Functions — Defining, Parameters, Return Values
        </Link>
      </div>
    </LearnLayout>
  )
}
