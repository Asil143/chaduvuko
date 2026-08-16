import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'List, Dict and Set Comprehensions — Python | Chaduvuko',
  description:
    'The Pythonic way to build collections — list, dict, and set comprehensions, nested comprehensions, generator expressions, and when a plain loop is genuinely the better choice.',
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

export default function Comprehensions() {
  return (
    <LearnLayout
      title="List, Dict and Set Comprehensions"
      description="The Pythonic way to build collections — list, dict, and set comprehensions, nested comprehensions, generator expressions, and when a plain loop is better."
      section="Python — Module 12"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Comprehension Actually Is" />
        <SectionTitle>A Comprehension Is a For-Loop, Compressed</SectionTitle>

        <Para>
          A comprehension is not a new concept — it is a compact syntax for a pattern you already know
          extremely well from Module 06: build an empty collection, loop over something, and add a
          transformed value to that collection on every iteration. Comprehensions exist because this
          exact pattern is so common that Python gives it its own dedicated syntax, one that reads, once
          you are fluent in it, almost like a sentence: "give me x, for every x in this collection."
        </Para>

        <CodeBox label="The pattern you already know, from Module 06">{`numbers = [1, 2, 3, 4, 5]

squares = []
for n in numbers:
    squares.append(n ** 2)

print(squares)   # [1, 4, 9, 16, 25]`}</CodeBox>

        <CodeBox label="The exact same result, as a list comprehension">{`numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers]

print(squares)   # [1, 4, 9, 16, 25]`}</CodeBox>

        <Para>
          Read the comprehension left to right: <code>[</code> starts a new list, <code>n ** 2</code> is
          the expression computed for every element, <code>for n in numbers</code> is exactly the same
          loop header you would write in a full for-loop, and <code>]</code> closes the list. Every
          comprehension in this module follows this same skeleton — an expression, followed by a{' '}
          <code>for</code> clause, optionally followed by an <code>if</code> clause — just wrapped in
          different brackets depending on what kind of collection you want back.
        </Para>

        <Callout type="tip">
          <strong>The mental translation that always works:</strong> take the full for-loop version, and
          read the comprehension as "the append expression, then the for-loop header, in that order."{' '}
          <code>[n ** 2 for n in numbers]</code> is <code>append(n ** 2)</code> followed by{' '}
          <code>for n in numbers</code>, with the wrapping brackets telling you what container you end
          up with. This translation works for every comprehension you will meet in this module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Filtering With if" />
        <SectionTitle>Conditional Comprehensions — Filtering While You Build</SectionTitle>

        <Para>
          Adding an <code>if</code> clause after the <code>for</code> filters which elements make it
          into the result at all — elements that fail the condition are simply skipped, exactly like an{' '}
          <code>if</code> guard inside a for-loop body that only calls <code>append()</code> conditionally.
        </Para>

        <CodeBox label="The full for-loop version">{`numbers = range(1, 21)

evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)

print(evens)   # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]`}</CodeBox>

        <CodeBox label="As a filtering comprehension">{`numbers = range(1, 21)
evens = [n for n in numbers if n % 2 == 0]

print(evens)   # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]`}</CodeBox>

        <Para>
          This filtering <code>if</code> comes <em>after</em> the <code>for</code> clause and has no{' '}
          <code>else</code> — it only decides whether an element is included, not what value it
          contributes. That is a genuinely different job from the conditional expression in Part 03,
          and mixing the two up is one of the most common early comprehension mistakes.
        </Para>

        <CodeBox label="Multiple conditions and chained filters">{`words = ["apple", "kiwi", "banana", "fig", "cherry"]

# Filter on more than one condition
long_a_words = [w for w in words if len(w) > 4 if w.startswith("a")]
# Equivalent to combining with "and":
long_a_words = [w for w in words if len(w) > 4 and w.startswith("a")]
print(long_a_words)   # ['apple']`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Ternary-Inside-Comprehension Pattern" />
        <SectionTitle>Transforming AND Filtering — Not the Same Thing as Filtering Alone</SectionTitle>

        <Para>
          Sometimes you do not want to drop elements that fail a condition — you want to keep every
          element, but compute a <em>different value</em> depending on the condition. That calls for
          the conditional expression (the ternary from Module 05), placed in the expression position at
          the very start of the comprehension, <em>before</em> the <code>for</code> clause.
        </Para>

        <CodeBox label="Filtering (if after for) vs transforming (ternary before for)">{`numbers = [1, 2, 3, 4, 5]

# FILTERING — result may be shorter than the input
evens_only = [n for n in numbers if n % 2 == 0]
print(evens_only)   # [2, 4] — odd numbers are dropped entirely

# TRANSFORMING — result is always the same length as the input
labeled = ["even" if n % 2 == 0 else "odd" for n in numbers]
print(labeled)   # ['odd', 'even', 'odd', 'even', 'odd']`}</CodeBox>

        <Para>
          The position of the <code>if</code> is what changes the meaning entirely. An{' '}
          <code>if</code> <em>after</em> the <code>for</code> clause has no matching <code>else</code>{' '}
          and filters. A ternary <code>x if condition else y</code> <em>before</em> the{' '}
          <code>for</code> clause always has an <code>else</code> and transforms every element without
          dropping any. This is one of the syntax rules worth memorising deliberately, because reading
          it quickly at a glance is genuinely easy to get backwards.
        </Para>

        <CodeBox label="You can combine both — transform AND filter in one comprehension">{`numbers = range(1, 11)

# Keep only even numbers, and double the ones over 5
result = [n * 2 if n > 5 else n for n in numbers if n % 2 == 0]
print(result)   # [2, 4, 12, 16, 20]
# n=2,4 pass the filter and are unchanged (<=5); n=6,8,10 pass the filter and are doubled`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Dict Comprehensions" />
        <SectionTitle>Building a Dict in One Expression</SectionTitle>

        <Para>
          A dict comprehension follows the exact same shape as a list comprehension, but uses curly
          braces and produces a <code>key: value</code> pair on each iteration instead of a single value.
        </Para>

        <CodeBox label="The full loop version">{`names = ["Alice", "Bob", "Carla"]

name_lengths = {}
for name in names:
    name_lengths[name] = len(name)

print(name_lengths)   # {"Alice": 5, "Bob": 3, "Carla": 5}`}</CodeBox>

        <CodeBox label="As a dict comprehension">{`names = ["Alice", "Bob", "Carla"]
name_lengths = {name: len(name) for name in names}

print(name_lengths)   # {"Alice": 5, "Bob": 3, "Carla": 5}`}</CodeBox>

        <Para>
          Dict comprehensions are genuinely useful for two things you will do constantly: inverting a
          dict (swapping keys and values), and building a dict from two related lists or from an
          existing dict&apos;s <code>.items()</code>, filtered or transformed along the way — this is
          exactly the pattern from Module 11&apos;s dict methods, expressed more compactly.
        </Para>

        <CodeBox label="Inverting a dict, and filtering while building one">{`prices = {"apple": 1.50, "banana": 0.75, "kiwi": 2.20}

# Invert keys and values
price_to_fruit = {price: fruit for fruit, price in prices.items()}

# Build a new dict containing only items above a threshold
expensive = {fruit: price for fruit, price in prices.items() if price > 1.00}
print(expensive)   # {"apple": 1.5, "kiwi": 2.2}`}</CodeBox>

        <Callout type="warning">
          Inverting a dict only produces a correct, lossless result if the original values are unique
          <strong> and hashable</strong> (the hashability rule from Module 11 — a dict&apos;s values
          become the inverted dict&apos;s keys, so they inherit the same restriction). If two fruits
          shared the same price, inverting would silently lose one of them — whichever key came last in
          iteration order would win.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Set Comprehensions" />
        <SectionTitle>Building a Set — Automatic Deduplication, For Free</SectionTitle>

        <Para>
          A set comprehension uses curly braces like a dict comprehension, but without the{' '}
          <code>key: value</code> pairing — just a single expression per element, exactly like a list
          comprehension. The result automatically deduplicates, inheriting every set property from
          Module 09.
        </Para>

        <CodeBox label="Set comprehension — deduplicating while transforming">{`words = ["Apple", "apple", "BANANA", "banana", "Kiwi"]

unique_lowercase = {w.lower() for w in words}
print(unique_lowercase)   # {'apple', 'banana', 'kiwi'} — order not guaranteed, duplicates gone`}</CodeBox>

        <Para>
          This is a genuinely common real pattern: normalising a batch of user-submitted or scraped
          text values (mixed casing, near-duplicates) down to a clean set of unique values in a single
          line, instead of writing a loop with a manual "have I seen this before" check.
        </Para>

        <CodeBox label="Without a comprehension — the manual version">{`unique_lowercase = set()
for w in words:
    unique_lowercase.add(w.lower())
# Correct, but three lines and a mutation step for something the comprehension expresses directly.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Nested Comprehensions" />
        <SectionTitle>Nested Comprehensions — And Their Readability Limits</SectionTitle>

        <Para>
          A comprehension can contain more than one <code>for</code> clause, which lets you flatten
          nested structures or compute a cartesian product in a single expression. The clauses read left
          to right in the same order you would nest the equivalent for-loops.
        </Para>

        <CodeBox label="Flattening a list of lists — a genuinely common, genuinely readable case">{`matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

flat = [n for row in matrix for n in row]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Equivalent nested loop, for comparison:
flat = []
for row in matrix:
    for n in row:
        flat.append(n)`}</CodeBox>

        <CodeBox label="A cartesian product — every combination of two lists">{`sizes = ["S", "M", "L"]
colors = ["red", "blue"]

combos = [(size, color) for size in sizes for color in colors]
print(combos)
# [('S', 'red'), ('S', 'blue'), ('M', 'red'), ('M', 'blue'), ('L', 'red'), ('L', 'blue')]`}</CodeBox>

        <SubTitle>A genuinely nested comprehension — a comprehension inside a comprehension</SubTitle>

        <Para>
          Distinct from multiple <code>for</code> clauses in one comprehension, you can also nest one
          comprehension entirely inside another — used, for example, to transform every row of a matrix
          while keeping its row structure, rather than flattening it.
        </Para>

        <CodeBox label="Transposing a matrix — comprehension inside a comprehension">{`matrix = [[1, 2, 3], [4, 5, 6]]

# Double every value, but keep the row/column shape (not flattened)
doubled = [[n * 2 for n in row] for row in matrix]
print(doubled)   # [[2, 4, 6], [8, 10, 12]]

# A real transpose (swap rows and columns)
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(transposed)   # [[1, 4], [2, 5], [3, 6]]`}</CodeBox>

        <Callout type="warning">
          <strong>This is genuinely close to the readability ceiling.</strong> The transpose example
          above requires the reader to track two independent loop variables (<code>row</code> and{' '}
          <code>i</code>) and their interaction across two nesting levels, entirely inside one dense
          expression. It is correct, idiomatic Python — but three levels of nested comprehension, or a
          comprehension combining nesting <em>and</em> a ternary <em>and</em> a filter, is where most
          experienced reviewers will ask you to rewrite it as a plain loop. Part 07 covers this
          trade-off directly.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — When Comprehensions Hurt Readability" />
        <SectionTitle>The Most Skipped, Most Important Lesson in This Module</SectionTitle>

        <Para>
          Comprehensions are celebrated as "the Pythonic way" so often that it is easy to walk away
          thinking more comprehension usage is automatically better code. It is not. A comprehension is
          a readability tool, and like any tool, it stops helping once it is doing too much at once. The
          honest rule senior engineers actually apply: if you cannot read a comprehension and understand
          its full behaviour in a single glance, it should be a loop instead.
        </Para>

        <CodeBox label="Where a comprehension has clearly gone too far">{`# Technically valid. Genuinely hard to read at a glance.
result = [
    {"id": u["id"], "active_orders": [o for o in orders if o["user_id"] == u["id"] and o["status"] == "open"]}
    for u in users if u["is_active"] and u.get("region") == "west"
]`}</CodeBox>

        <CodeBox label="The same logic, as a loop — slower to write, faster to read">{`result = []
for u in users:
    if not u["is_active"] or u.get("region") != "west":
        continue
    active_orders = [
        o for o in orders
        if o["user_id"] == u["id"] and o["status"] == "open"
    ]
    result.append({"id": u["id"], "active_orders": active_orders})`}</CodeBox>

        <Para>
          Notice the loop version is not "worse Python" — it uses a smaller, perfectly reasonable
          comprehension for the inner <code>active_orders</code> list, and a guard clause (Module 05)
          for the filtering, rather than cramming every condition into one nested expression. This is
          the real skill: knowing when a comprehension is the clean, idiomatic choice for a piece of
          logic, and switching to a loop the moment a comprehension would need a second sentence to
          explain.
        </Para>

        <Callout type="tip">
          <strong>A practical heuristic:</strong> one <code>for</code> clause and, at most, one{' '}
          <code>if</code> — comprehension, without a second thought. Two <code>for</code> clauses used
          to flatten a simple structure — still fine, still idiomatic. Anything beyond that (nested
          comprehensions containing their own filters, a ternary combined with a filter, or a
          comprehension that needs a code comment to explain what it is doing) — write it as a loop.
          Readability, not brevity, is what "Pythonic" actually means here.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Generator Expressions" />
        <SectionTitle>Generator Expressions — The Lazy Cousin of the List Comprehension</SectionTitle>

        <Para>
          Swap a list comprehension&apos;s square brackets for parentheses, and you get a{' '}
          <strong>generator expression</strong> — syntactically almost identical, but behaviourally very
          different. A list comprehension builds the <em>entire</em> list in memory immediately. A
          generator expression builds nothing up front; it produces values one at a time, lazily, only
          as something asks for the next one.
        </Para>

        <CodeBox label="List comprehension vs generator expression — syntax difference">{`squares_list = [n ** 2 for n in range(1_000_000)]     # built entirely, right now, in memory
squares_gen  = (n ** 2 for n in range(1_000_000))       # nothing computed yet — just a plan

print(type(squares_list))   # <class 'list'>
print(type(squares_gen))    # <class 'generator'>`}</CodeBox>

        <Para>
          For a million elements, <code>squares_list</code> genuinely allocates memory for a million
          integers immediately. <code>squares_gen</code> allocates almost nothing — it is a small object
          that knows <em>how</em> to produce the next value on demand, and produces exactly one value at
          a time as something consumes it, such as a <code>for</code> loop or a function like{' '}
          <code>sum()</code>.
        </Para>

        <CodeBox label="A genuinely common, genuinely idiomatic use — feeding a function that just needs to iterate once">{`transactions = [120.50, 45.00, 300.25, 15.75]

# No need to build an intermediate list just to sum it —
# sum() consumes the generator expression one value at a time
total_over_50 = sum(t for t in transactions if t > 50)
print(total_over_50)   # 420.75

# Parentheses are optional when the generator expression is a function's only argument
total_over_50 = sum((t for t in transactions if t > 50))   # identical, just more parentheses`}</CodeBox>

        <Para>
          This module is only a brief introduction — generator expressions are one specific, narrow
          application of the much larger idea of <strong>generators</strong>, built with the{' '}
          <code>yield</code> keyword, which you will cover in full depth in Module 28. For now, the
          practical rule is simple: if you are about to build a list purely to immediately loop over it
          once and discard it (like feeding it straight into <code>sum()</code>, <code>max()</code>, or{' '}
          <code>any()</code>), a generator expression does the same job without the wasted memory
          allocation.
        </Para>
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
        <SectionTitle>A Code Review at an Austin Analytics Company</SectionTitle>

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
            Scenario — Analytics company, Austin · Pull request review
          </div>

          <Para>
            An engineer at an Austin marketing-analytics company submits a function that builds a
            summary report from a batch of ad campaign events — for each active campaign, it needs a
            list of high-value click events attached.
          </Para>

          <CodeBox label="The original submission">{`def build_report(campaigns, events):
    report = [
        {
            "campaign": c["name"],
            "high_value_clicks": [e for e in events if e["campaign_id"] == c["id"] and e["type"] == "click" and e["value"] > 10 and c["active"]]
        }
        for c in campaigns
    ]
    return report`}</CodeBox>

          <SubSubTitle>What the reviewer flags</SubSubTitle>

          <Para>
            Two issues, both traceable directly to earlier parts of this module. First, this crosses
            the readability ceiling described in Part 07 — a single line packs a nested comprehension,
            four separate <code>and</code>-chained conditions, and a dict literal, all inside one
            expression the reviewer has to read twice to trust. Second, and more seriously, it is
            functionally slow: for every campaign, it re-scans the <em>entire</em> events list from
            scratch, exactly the repeated-linear-scan performance trap from Module 11&apos;s Real World
            example — with 500 campaigns and 200,000 events, that is 100 million comparisons for a
            report that should take a fraction of a second.
          </Para>

          <CodeBox label="The revised version — grouped once, then a clean comprehension per campaign">{`from collections import defaultdict

def build_report(campaigns, events):
    high_value_clicks_by_campaign = defaultdict(list)
    for e in events:
        if e["type"] == "click" and e["value"] > 10:
            high_value_clicks_by_campaign[e["campaign_id"]].append(e)

    return [
        {"campaign": c["name"], "high_value_clicks": high_value_clicks_by_campaign[c["id"]]}
        for c in campaigns
        if c["active"]
    ]`}</CodeBox>

          <Para>
            The events are grouped once, up front, using the exact <code>defaultdict</code> pattern
            from Module 11. The final comprehension is now a single <code>for</code> with a single{' '}
            <code>if</code> — well inside the readability heuristic from Part 07 — and does a fast O(1)
            dict lookup per campaign instead of an O(n) scan. Same output, dramatically faster, and
            readable at a glance. The lesson the reviewer leaves in the comment: "a comprehension
            should never contain a full second filtering pass over an unrelated list — group first,
            comprehend second."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Comprehensions</SectionTitle>

        {[
          {
            wrong: '"Comprehensions are always faster than a for-loop, so use them everywhere"',
            right: 'Comprehensions are often somewhat faster than an equivalent for-loop with explicit .append() calls, due to internal optimisations — but the difference is rarely the deciding factor, and a badly-nested comprehension over the wrong data structure (as in the Real World example above) can be catastrophically slower than a well-structured loop. Readability, not raw speed, should be the primary reason you reach for one.',
          },
          {
            wrong: '"More comprehension usage is automatically more Pythonic code"',
            right: 'Pythonic means readable and idiomatic, not maximally compressed. A comprehension packed with nested loops, multiple conditions, and a ternary is technically valid but is exactly the kind of code real reviewers push back on. A well-placed plain loop is often the more Pythonic choice.',
          },
          {
            wrong: '"[x if cond else y for ...] and [x for ... if cond] are basically interchangeable"',
            right: 'They do different jobs. The ternary form (if/else before the for) transforms every element and always returns a result the same length as the input. The filtering form (if after the for, no else) can drop elements and may return a shorter result. Mixing them up is a real source of bugs, not just a style issue.',
          },
          {
            wrong: '"A generator expression and a list comprehension always give you the same thing, just written differently"',
            right: 'They behave fundamentally differently, not just syntactically. A list comprehension builds the full result immediately in memory. A generator expression produces values lazily, one at a time, and can only be iterated through once — after that, it is exhausted and produces nothing further, unlike a list, which can be iterated repeatedly.',
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
            q: 'What is the general form of a list comprehension, and how does it map to a for-loop?',
            a: '[expression for item in iterable if condition] — it creates an empty list, loops over the iterable, optionally skips items that fail the condition, and appends the expression\'s result for every item that remains. It is the exact same behaviour as writing result = []; for item in iterable: if condition: result.append(expression) — just compressed into a single expression.',
          },
          {
            q: 'What is the difference between a filtering if and a ternary if/else inside a comprehension?',
            a: 'A filtering if comes after the for clause and has no else — it decides whether an element is included at all, so the result can be shorter than the input. A ternary if/else comes before the for clause, in the expression position — it decides what value each element becomes, but every element is kept, so the result is always the same length as the input.',
          },
          {
            q: 'How would you flatten a list of lists using a comprehension?',
            a: 'With two for clauses in one comprehension: [n for row in matrix for n in row]. The clauses read left to right in the same order as writing the equivalent nested for-loops — the outer loop (over rows) comes first, the inner loop (over elements within a row) comes second.',
          },
          {
            q: 'What is the difference between a list comprehension and a generator expression?',
            a: 'A list comprehension, written with square brackets, builds the entire result in memory immediately. A generator expression, written with parentheses, produces values lazily one at a time as something consumes them, and can only be iterated through once before it is exhausted. Generator expressions are the better choice when a result will be consumed exactly once — such as passed straight into sum(), max(), or any() — since they avoid allocating memory for an intermediate list that is never fully needed at once.',
          },
          {
            q: 'When would you choose a plain for-loop over a comprehension, even though a comprehension is possible?',
            a: 'When the comprehension would need more than one for clause combined with a filter, or a ternary combined with a filter, or generally when it takes more than a single glance to understand what it produces. Comprehensions are a readability tool; once one becomes dense enough to need re-reading, a loop with named intermediate variables and guard clauses communicates the same logic more clearly, even though it is a few lines longer.',
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
        <SectionTitle>Comprehension Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Confusing the filtering if with the ternary if/else',
            a: 'Writing [x if cond for x in items] is a SyntaxError — a ternary always requires an else. If you meant to filter, drop the else and move if after the for: [x for x in items if cond].',
          },
          {
            q: 'Using a comprehension purely for its side effects',
            a: '[print(x) for x in items] technically works, building a throwaway list of Nones just to trigger print() as a side effect. This is not idiomatic and confuses readers, who expect a comprehension\'s result to actually be used. Write a plain for loop when the goal is a side effect, not a collection.',
          },
          {
            q: 'Reusing the loop variable name from an outer scope',
            a: 'x = 5; squares = [x for x in range(5)] — inside the comprehension, x is a completely separate variable scoped to the comprehension itself (this changed in Python 3; in Python 2 it leaked into the enclosing scope). The outer x is untouched, but reusing the same name is still confusing to read and worth avoiding.',
          },
          {
            q: 'Iterating a generator expression twice, expecting it to work like a list',
            a: 'gen = (x for x in range(5)); list(gen); list(gen) — the second call returns [] silently, not an error. A generator is exhausted after one full iteration. If you need to iterate more than once, use a list comprehension, or call list() on the generator once and reuse that list.',
          },
          {
            q: 'Nesting comprehensions past the point anyone can read them at a glance',
            a: 'As shown in the Real World example, this is functionally correct but a real code-review liability. Extract the inner logic into a named variable, a helper function, or a grouped lookup built beforehand — do not try to fit every transformation into one expression.',
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
        <SectionTitle>Errors You Will Hit With Comprehensions — And Exactly Why</SectionTitle>

        {[
          {
            error: `SyntaxError: invalid syntax (on "[x if cond for x in items]")`,
            cause: 'Writing a conditional expression (ternary) inside a comprehension without the required "else" branch.',
            fix: 'If you meant to transform every element conditionally, add an else: [x if cond else default_value for x in items]. If you meant to filter, remove the ternary entirely and move the if after the for clause instead.',
          },
          {
            error: `NameError: name 'x' is not defined (outside the comprehension)`,
            cause: 'Trying to access the comprehension\'s loop variable after the comprehension has finished, expecting it to leak into the surrounding scope the way a for-loop\'s variable does.',
            fix: 'Comprehensions have their own scope in Python 3 — the loop variable does not exist outside them. If you need the last value, assign the comprehension\'s result to a variable and inspect that instead.',
          },
          {
            error: `TypeError: 'generator' object is not subscriptable`,
            cause: 'Trying to index into a generator expression with [0] or a slice, as if it were a list.',
            fix: 'Generators do not support indexing — they only support being iterated once, in order. Wrap it in list(...) first if you need indexing or repeated iteration: list(x for x in items)[0].',
          },
          {
            error: `KeyError inside a dict comprehension built from .items()`,
            cause: 'Filtering or transforming a dict comprehension based on a key that does not exist on every source dict in the iterable being looped over.',
            fix: 'Use .get(key, default) inside the comprehension\'s expression instead of [key], exactly as covered in Module 11 — {d.get("id", None): d for d in records} rather than {d["id"]: d for d in records} if "id" is not guaranteed to be present.',
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
        'A comprehension is a compact for-loop: [expression for item in iterable if condition] builds, filters, and transforms in one line.',
        'A filtering "if" comes after the for clause and has no else — it can shorten the result. A ternary "if/else" comes before the for clause, in the expression — it transforms every element without dropping any.',
        'Dict comprehensions ({k: v for ...}) and set comprehensions ({x for ...}) follow the same shape as list comprehensions, just with different brackets and, for dicts, a key:value pair per iteration.',
        'Multiple for clauses in one comprehension flatten nested structures; a comprehension nested inside another comprehension preserves structure (e.g. transposing a matrix).',
        'Generator expressions — (x for x in iterable) — produce values lazily one at a time and can only be iterated once, unlike a list comprehension which builds the full result immediately in memory.',
        'Readability, not brevity, is the actual goal. Once a comprehension needs more than one for clause plus a filter, or mixes a ternary with a filter, rewrite it as a plain loop.',
        'Never re-scan an unrelated collection inside a comprehension\'s condition — group data once with a dict or defaultdict first, then write a simple, single-pass comprehension over the grouped result.',
        'A generator expression is exhausted after one full iteration — attempting to iterate it a second time silently produces nothing, not an error.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 13 puts dictionaries and comprehensions to work on the shape of data you will actually
          meet in the real world — lists of dicts, dicts of lists, and the deeply nested JSON structures
          that come back from every real API.
        </p>
        <Link href="/learn/python/nested-data-structures" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 13 → Nested Data Structures
        </Link>
      </div>
    </LearnLayout>
  )
}
