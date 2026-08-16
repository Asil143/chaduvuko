import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Lambda Functions and Functional Tools — Python | Chaduvuko',
  description:
    'Lambda syntax and its real constraint, when a lambda genuinely earns its place, map/filter/reduce in depth, and why comprehensions usually win over functional chains.',
}

const C = '#facc15'

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

export default function LambdaMapFilterReduce() {
  return (
    <LearnLayout
      title="Lambda Functions and Functional Tools"
      description="Lambda syntax and its real constraint, when it genuinely earns its place, map/filter/reduce in depth, and why comprehensions usually win."
      section="Python — Module 26"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Lambda Syntax" />
        <SectionTitle>lambda — An Anonymous Function, and Its One Real Constraint</SectionTitle>

        <Para>
          A <code>lambda</code> is a function without a name, defined inline as a single expression. The
          syntax is deliberately minimal: <code>lambda parameters: expression</code>. There is no{' '}
          <code>def</code>, no function name, no explicit <code>return</code> — the expression&apos;s
          result <em>is</em> the return value, automatically.
        </Para>

        <CodeBox label="A lambda side by side with the equivalent def">{`square = lambda x: x ** 2
square(5)   # 25

# Exactly equivalent to:
def square(x):
    return x ** 2`}</CodeBox>

        <Para>
          A lambda can take any number of arguments — including <code>*args</code>,{' '}
          <code>**kwargs</code>, and default values, exactly like a normal function from Module 25 —
          but its body must be a <strong>single expression</strong>. This is not a stylistic
          limitation; it is enforced by Python&apos;s grammar. A lambda cannot contain statements:
          no <code>if</code>/<code>else</code> as separate lines, no <code>for</code> loops, no{' '}
          <code>while</code> loops, no assignment statements, and no multiple lines of logic.
        </Para>

        <CodeBox label="What a lambda CAN and CANNOT contain">{`# Legal — a conditional EXPRESSION (the ternary from Module 05), not a statement
classify = lambda age: "adult" if age >= 18 else "minor"

# Illegal — a for loop is a statement, not an expression
# broken = lambda items: for item in items: print(item)   # SyntaxError

# Illegal — assignment is a statement
# broken = lambda x: y = x + 1   # SyntaxError

# Multiple arguments, and a default value, both work fine
add = lambda a, b=10: a + b
add(5)       # 15
add(5, 20)   # 25`}</CodeBox>

        <Callout type="info">
          <strong>A lambda is genuinely a function object, not a special syntax trick.</strong>{' '}
          <code>type(square)</code> returns <code>&lt;class &apos;function&apos;&gt;</code> — the exact
          same type a <code>def</code>-defined function has. You can call it, pass it around, store it
          in a data structure, and check its <code>__name__</code> attribute (which will literally be
          the string <code>&apos;&lt;lambda&gt;&apos;</code>, since it has no real name — a genuine
          debugging annoyance you should be aware of).
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — When to Actually Use One" />
        <SectionTitle>An Honest Take — Lambdas Are Not as Discouraged as Some Style Guides Claim</SectionTitle>

        <Para>
          A lot of Python style advice treats lambdas as something to avoid almost entirely. That is an
          overcorrection. The real, practical rule is simpler: a lambda is a good choice when it is{' '}
          <strong>short, genuinely throwaway, and used exactly once at the point it is defined</strong> —
          most commonly as an argument to another function that expects a callable, like{' '}
          <code>sorted()</code>&apos;s <code>key</code> parameter.
        </Para>

        <CodeBox label="A lambda earning its place — short, throwaway, used once">{`users = [{"name": "Sam", "age": 34}, {"name": "Ari", "age": 22}]

# The lambda here is genuinely clearer than the alternative — it says exactly
# and only what's needed, right where it's needed, with zero extra ceremony.
users.sort(key=lambda u: u["age"])`}</CodeBox>

        <Para>
          A <strong>named function</strong> is clearly the better choice once any of these are true:
          the logic needs a docstring or a comment to explain it, it is reused in more than one place,
          it needs a meaningful name for its own sake (a name is documentation), or it would require
          more than one genuine logical step to express — at which point you are fighting the
          single-expression constraint rather than benefiting from lambda&apos;s brevity.
        </Para>

        <CodeBox label="A case where the lambda actively hurts readability">{`# Technically legal, genuinely hard to read at a glance:
process = lambda orders: [o for o in orders if o["status"] == "paid" and o["total"] > 100]

# The named version documents itself and is trivially testable in isolation:
def high_value_paid_orders(orders):
    """Orders that are paid and worth more than $100."""
    return [o for o in orders if o["status"] == "paid" and o["total"] > 100]`}</CodeBox>

        <Callout type="tip">
          <strong>A practical rule of thumb that holds up well in real code review:</strong> if you find
          yourself wanting to name a lambda by assigning it to a variable —{' '}
          <code>calculate_tax = lambda price: price * 0.08</code> — that is usually a sign you should
          just write <code>def calculate_tax(price): return price * 0.08</code> instead. Lambdas are
          for the specific case where the function genuinely does not need or deserve a name of its own,
          because it exists only to be handed, inline, to something else.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — map()" />
        <SectionTitle>map() — Applying a Function to Every Item</SectionTitle>

        <Para>
          <code>map(function, iterable)</code> applies <code>function</code> to every item in{' '}
          <code>iterable</code> and returns a <strong>map object</strong> — a lazy iterator, not a list.
          You will meet the deeper mechanics of lazy iteration in the next two modules; for now, the
          practical consequence is simply that you usually need to wrap it in <code>list()</code> to see
          or use its results directly.
        </Para>

        <CodeBox label="map() with a lambda">{`prices = [19.99, 5.50, 42.00]
with_tax = list(map(lambda p: round(p * 1.08, 2), prices))
print(with_tax)   # [21.59, 5.94, 45.36]`}</CodeBox>

        <CodeBox label="map() with a named function — reads just as well here">{`def add_tax(price):
    return round(price * 1.08, 2)

with_tax = list(map(add_tax, prices))   # identical result`}</CodeBox>

        <Para>
          <code>map()</code> can also take multiple iterables at once, applying the function
          positionally across all of them in parallel and stopping at the shortest one — a genuinely
          useful, less-known capability.
        </Para>

        <CodeBox label="map() over two iterables at once">{`names = ["Alice", "Bo", "Chen"]
scores = [92, 78, 85]

combined = list(map(lambda n, s: f"{n}: {s}", names, scores))
print(combined)   # ['Alice: 92', 'Bo: 78', 'Chen: 85']`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — filter()" />
        <SectionTitle>filter() — Keeping Only the Items That Pass a Test</SectionTitle>

        <Para>
          <code>filter(function, iterable)</code> keeps only the items from <code>iterable</code> for
          which <code>function</code> returns a truthy value, and — like <code>map()</code> — returns a
          lazy filter object, not a list.
        </Para>

        <CodeBox label="filter() with a lambda">{`ages = [15, 22, 8, 34, 19, 12]
adults = list(filter(lambda age: age >= 18, ages))
print(adults)   # [22, 34, 19]`}</CodeBox>

        <Para>
          Passing <code>None</code> as the function to <code>filter()</code> is a special, real case
          worth knowing: it filters out every falsy value from the iterable directly, using the same
          truthiness rules from Module 05.
        </Para>

        <CodeBox label="filter(None, ...) — dropping every falsy value">{`raw = [0, "hello", "", None, 42, False, "data", []]
clean = list(filter(None, raw))
print(clean)   # ['hello', 42, 'data']`}</CodeBox>

        <Callout type="warning">
          <strong>filter() and map() are both lazy — they don&apos;t run until you consume them.</strong>{' '}
          Writing <code>{`filter(lambda age: age >= 18, ages)`}</code> alone, without wrapping it in{' '}
          <code>list()</code>, a <code>for</code> loop, or another consuming operation, produces nothing
          visible at all — just a filter object sitting unevaluated. This exact behaviour, and why it
          exists, is the entire subject of the next two modules on iterators and generators.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — functools.reduce()" />
        <SectionTitle>reduce() — Why It Left the Builtins</SectionTitle>

        <Para>
          <code>reduce(function, iterable)</code> repeatedly applies a two-argument function to the
          running result and the next item, collapsing an entire iterable down to a single value.
          Unlike <code>map()</code> and <code>filter()</code>, it is not a builtin in Python 3 — it
          lives in the <code>functools</code> module and must be imported explicitly.
        </Para>

        <CodeBox label="reduce() in action">{`from functools import reduce

numbers = [3, 7, 2, 9, 4]
total = reduce(lambda acc, x: acc + x, numbers)
print(total)   # 25

# What reduce() is actually doing, step by step:
# acc=3, x=7  -> acc=10
# acc=10, x=2 -> acc=12
# acc=12, x=9 -> acc=21
# acc=21, x=4 -> acc=25`}</CodeBox>

        <Para>
          Guido van Rossum, Python&apos;s creator, explicitly moved <code>reduce()</code> out of the
          builtins between Python 2 and Python 3, arguing publicly that most uses of{' '}
          <code>reduce()</code> are less readable than an explicit <code>for</code> loop that
          accumulates a result, and that Python already has dedicated builtins — <code>sum()</code>,{' '}
          <code>max()</code>, <code>min()</code>, <code>any()</code>, <code>all()</code> — for the
          overwhelmingly common reduction cases. Demoting it to an explicit <code>functools</code>{' '}
          import was a deliberate nudge toward those clearer alternatives for the common cases, while
          keeping the general tool available for the genuinely general case.
        </Para>

        <CodeBox label="Most 'reduce' problems already have a clearer dedicated builtin">{`numbers = [3, 7, 2, 9, 4]

# Don't reach for reduce() for these — the builtin says exactly what it does:
sum(numbers)    # 25
max(numbers)    # 9
min(numbers)    # 2

# An explicit accumulator loop is often clearer than reduce() too, for anything
# with real branching logic inside the accumulation step:
total = 0
for n in numbers:
    if n % 2 == 0:
        total += n
print(total)   # 6  (2 + 4)`}</CodeBox>

        <Para>
          <code>reduce()</code> still earns its place for genuinely general folding operations that
          don&apos;t map onto <code>sum()</code>/<code>max()</code>/<code>min()</code> — for example,
          composing a chain of functions together, or merging a list of dicts into one, where the
          "combine two things into one" logic really is the whole point and a loop would just spell out
          the same idea more verbosely.
        </Para>

        <CodeBox label="A case where reduce() is genuinely the clearest tool">{`from functools import reduce

configs = [{"timeout": 30}, {"retries": 3}, {"timeout": 60, "debug": True}]
merged = reduce(lambda acc, d: {**acc, **d}, configs, {})
print(merged)   # {'timeout': 60, 'retries': 3, 'debug': True} — later dicts win on conflicts`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Functional Chains vs Comprehensions" />
        <SectionTitle>Which One Is More Idiomatic Python? Usually, the Comprehension</SectionTitle>

        <Para>
          Python supports the functional style — <code>map()</code>/<code>filter()</code>/{' '}
          <code>reduce()</code> — but its own core design leans toward comprehensions (Module 12) for the
          exact same jobs <code>map()</code> and <code>filter()</code> do. This is not an accident:
          comprehensions read left to right in the same order the operation actually happens, while
          chained <code>map()</code>/<code>filter()</code> calls read inside-out, which is measurably
          harder to parse once more than one step is involved.
        </Para>

        <CodeBox label="The exact same result, two ways — compare how each reads">{`prices = [19.99, 5.50, 42.00, 8.25]

# Functional chain — read from the middle outward: filter first, THEN map,
# but written map-first, filter-innermost. You have to un-nest it mentally.
result_functional = list(map(lambda p: round(p * 1.08, 2),
                              filter(lambda p: p > 10, prices)))

# Comprehension — reads in the actual order of execution: filter first (the "if"),
# then transform (the expression before "for")
result_comprehension = [round(p * 1.08, 2) for p in prices if p > 10]

print(result_functional == result_comprehension)   # True — same result`}</CodeBox>

        <Para>
          The comprehension also avoids two lambdas entirely, avoids the nested nesting of one call
          inside another, and — because it does not need to wrap the result in <code>list()</code>{' '}
          separately — is simply shorter. This is why comprehensions are considered the more idiomatic,
          "Pythonic" choice for straightforward transform-and-filter operations, and why most Python
          style guides (including the официальный <code>PEP 8</code>) gently steer toward them.
        </Para>

        <Callout type="tip">
          <strong>The functional style is not wrong — it is simply less common in idiomatic Python.</strong>{' '}
          If you come from JavaScript, Java streams, or Scala, reaching for chained{' '}
          <code>map()</code>/<code>filter()</code> calls will feel natural, and it produces perfectly
          correct code. But a Python code reviewer will very often suggest rewriting a{' '}
          <code>map()</code>/<code>filter()</code> chain as a comprehension — not because it is broken,
          but because it is the less idiomatic of two equally correct options in this specific language.
        </Callout>

        <SubTitle>Where map()/filter() genuinely still pull their weight</SubTitle>

        <Para>
          Comprehensions do not make <code>map()</code> and <code>filter()</code> obsolete. When the
          transforming or filtering function already exists, is named, and is reused elsewhere,{' '}
          <code>map(existing_function, items)</code> is often more concise than{' '}
          <code>[existing_function(x) for x in items]</code>, with no meaningful readability cost either
          way — this comes down to genuine team/personal style preference rather than a hard rule.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — sorted() with key=lambda" />
        <SectionTitle>Multi-Key Sorting — Where lambda Genuinely Shines</SectionTitle>

        <Para>
          <code>sorted(iterable, key=..., reverse=...)</code> is quite possibly the single most common
          real place a lambda appears in professional Python code. The <code>key</code> function is
          called once per item and its <em>return value</em> is what gets compared to determine order —
          the original items themselves are never compared directly.
        </Para>

        <CodeBox label="Sorting by a single key">{`employees = [
    {"name": "Dana", "salary": 95000},
    {"name": "Wes", "salary": 110000},
    {"name": "Yuki", "salary": 88000},
]

by_salary = sorted(employees, key=lambda e: e["salary"], reverse=True)
# Highest paid first: Wes, Dana, Yuki`}</CodeBox>

        <Para>
          For sorting by more than one field — "sort by department, and within each department, by
          salary descending" — the <code>key</code> function returns a <strong>tuple</strong>. Python
          compares tuples element by element, exactly the way it compares any other tuple (as covered in
          Module 09), which is precisely what makes multi-key sorting work with a single{' '}
          <code>key</code> function.
        </Para>

        <CodeBox label="Multi-key sorting with a tuple return value">{`employees = [
    {"name": "Dana", "dept": "Eng", "salary": 95000},
    {"name": "Wes", "dept": "Sales", "salary": 110000},
    {"name": "Yuki", "dept": "Eng", "salary": 130000},
    {"name": "Priya", "dept": "Eng", "salary": 95000},
]

# Sort by department (A-Z), then salary within each department (high to low).
# Negating the salary flips ONLY that field's order, while dept stays ascending —
# a genuinely useful trick when reverse=True would flip every field, not just one.
ranked = sorted(employees, key=lambda e: (e["dept"], -e["salary"]))
for e in ranked:
    print(e["dept"], e["salary"], e["name"])
# Eng   130000  Yuki
# Eng   95000   Dana
# Eng   95000   Priya
# Sales 110000  Wes`}</CodeBox>

        <Para>
          Note that the negation trick (<code>-e["salary"]</code>) only works cleanly for numeric
          fields. For mixing an ascending string field with a descending string field, the standard
          approach is calling <code>sorted()</code> twice, relying on the fact that Python&apos;s{' '}
          <code>sorted()</code> is <strong>stable</strong> — it never reorders elements that compare
          equal — so sorting by the secondary key first, then the primary key, produces the correct
          combined order.
        </Para>

        <CodeBox label="Stable sort trick for mixed ascending/descending string fields">{`# Sort by dept ascending, name descending WITHIN each dept — sort by the
# secondary key first (name, reverse), then the primary key (dept, stable):
step1 = sorted(employees, key=lambda e: e["name"], reverse=True)
final = sorted(step1, key=lambda e: e["dept"])`}</CodeBox>
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
        <SectionTitle>A KeyError During a Live Demo at an Austin Marketing Analytics Startup</SectionTitle>

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
            Scenario — Marketing analytics startup, Austin · Live client demo
          </div>

          <Para>
            An Austin-based startup is demoing a campaign leaderboard that ranks marketing campaigns by
            engagement score, highest first — a straightforward <code>sorted()</code> call with a
            lambda key, exactly as shown in Part 07.
          </Para>

          <CodeBox label="The code powering the leaderboard">{`ranked = sorted(campaigns, key=lambda c: c["engagement_score"], reverse=True)`}</CodeBox>

          <SubSubTitle>What goes wrong, live, in front of the client</SubSubTitle>

          <Para>
            Mid-demo, the call raises <code>KeyError: 'engagement_score'</code>. One campaign in the
            list — a newly created one that had not finished its first analytics sync yet — simply did
            not have that key in its dict at all. The lambda has no way to express "handle the missing
            case" inline; it is a single expression, and <code>c["engagement_score"]</code> either
            succeeds or raises immediately, exactly as covered in Part 01&apos;s constraint on what a
            lambda can and cannot contain.
          </Para>

          <SubSubTitle>The fix, and the lesson</SubSubTitle>

          <Para>
            The on-call engineer swaps <code>c["engagement_score"]</code> for{' '}
            <code>c.get("engagement_score", 0)</code> — a one-word change, still entirely legal inside a
            lambda because <code>.get()</code> with a default is still a single expression, not a
            statement.
          </Para>

          <CodeBox label="The fix — still a lambda, now defensive">{`ranked = sorted(campaigns, key=lambda c: c.get("engagement_score", 0), reverse=True)
# Campaigns missing the key now sort to the bottom instead of crashing the whole call.`}</CodeBox>

          <Para>
            The deeper lesson, discussed afterward in the team&apos;s retro, ties directly back to Part
            02: a lambda&apos;s single-expression constraint is not just a syntax quirk — it means a
            lambda genuinely cannot contain a try/except, so any lambda that touches dict keys, list
            indices, or anything else that can fail should default to the "safe" accessor ({' '}
            <code>.get()</code> over <code>[]</code>) as a matter of habit, precisely because there is
            no way to catch an exception inside the lambda itself. If the logic needs real error
            handling, that is exactly the signal from Part 02 that it has outgrown being a lambda and
            should become a named function instead.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Lambdas and Functional Tools</SectionTitle>

        {[
          {
            wrong: '"Lambdas are faster than regular functions because they\'re shorter"',
            right: 'There is no meaningful performance difference — a lambda and a def-defined function compile to the same kind of function object and are called through the same mechanism. The choice between them is entirely about readability and reuse, never about speed.',
          },
          {
            wrong: '"Real Python code avoids lambdas entirely — they\'re a code smell"',
            right: 'This overcorrects on genuinely reasonable advice. Lambdas used as short, throwaway, single-use arguments (like a sorted() key) are completely idiomatic and extremely common in real production code. The actual guidance is narrower: don\'t assign a lambda to a variable as a substitute for a proper named function, and don\'t reach for one when the logic needs more than a single expression.',
          },
          {
            wrong: '"map() and filter() are always faster than a list comprehension"',
            right: 'Their performance is close enough in practice that it should never be the deciding factor for typical code — comprehensions are frequently just as fast or faster once you account for map()\'s per-call function-call overhead. Choose based on readability, per Part 06 — not on an assumed, and often incorrect, performance edge.',
          },
          {
            wrong: '"reduce() was removed from Python 3"',
            right: 'It was not removed — it was moved out of the builtins and into functools, requiring an explicit "from functools import reduce". The reasoning, per Part 05, was that most everyday reduction tasks already have a clearer dedicated tool (sum(), max(), min(), or a plain loop), and demoting reduce() nudges code toward those more readable options for the common cases.',
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
            q: 'What is a lambda function, and what is its one hard syntactic constraint?',
            a: 'A lambda is an anonymous, inline function defined with the syntax "lambda parameters: expression". Its hard constraint is that the body must be a single expression — it cannot contain statements like for loops, while loops, multi-line logic, try/except, or assignment statements. The expression\'s value is returned automatically, with no explicit "return" keyword.',
          },
          {
            q: 'When would you choose a lambda over a regular def function, and when is a named function clearly better?',
            a: 'A lambda earns its place when it is short, genuinely single-use, and passed directly as an argument to something like sorted(), map(), or filter() — the logic doesn\'t need its own name or documentation. A named function is better once the logic is reused in more than one place, needs a docstring to explain intent, requires more than one genuine step, or needs a meaningful name for readability. A useful signal: if you want to assign a lambda to a variable to give it a name, that is usually a sign it should be a def function instead.',
          },
          {
            q: 'What do map() and filter() actually return, and what is the practical consequence of that?',
            a: 'Both return lazy iterator objects (a map object and a filter object respectively), not lists — nothing is computed until the result is consumed, e.g. by wrapping it in list(), iterating it with a for loop, or passing it to another function that consumes iterables. Forgetting this and expecting a list directly is a common source of confusion for beginners.',
          },
          {
            q: 'Why was reduce() moved out of Python\'s builtins and into functools for Python 3?',
            a: 'Python\'s creator argued that most real uses of reduce() are less readable than an explicit accumulator loop, and that the most common reduction cases already have clearer dedicated builtins — sum(), max(), min(), any(), all(). Moving reduce() to an explicit functools import was a deliberate nudge toward those clearer tools for common cases, while keeping the general-purpose fold operation available for genuinely general cases, like merging a list of dicts.',
          },
          {
            q: 'How do you sort a list of dicts by multiple keys — for example, department ascending, then salary descending — using sorted()?',
            a: 'Pass a key function that returns a tuple: sorted(employees, key=lambda e: (e["dept"], -e["salary"])). Python compares tuples element by element, so this sorts by department first, and within equal departments, by salary. Negating a numeric field flips its order independently of the rest of the tuple. For non-numeric fields with mixed sort directions, rely on sorted()\'s stability and sort by the secondary key first, then the primary key, in two separate passes.',
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
        <SectionTitle>Lambda and Functional-Tool Mistakes Worth Knowing Up Front</SectionTitle>

        {[
          {
            q: 'Writing a lambda that tries to span multiple statements with semicolons',
            a: 'lambda x: print(x); return x is not valid — a lambda cannot contain a return statement or multiple statements chained with semicolons at all. If the logic needs more than one expression\'s worth of work, it needs to be a def function instead.',
          },
          {
            q: 'Forgetting that map()/filter() results can only be consumed once',
            a: 'results = map(str.upper, names); list(results); list(results) — the second list() call returns an empty list. This is the exact same "iterator exhaustion" behaviour covered in depth in the next module (Iterators and Iterables) — map and filter objects are iterators, not reusable collections.',
          },
          {
            q: 'Using a lambda inside a loop and accidentally capturing the loop variable by reference',
            a: 'This is a genuinely famous Python gotcha covered in full in Module 31 (Closures and Scope) — a lambda defined inside a loop, referencing the loop variable, captures the variable itself, not its value at definition time. Every lambda created in the loop ends up seeing the loop variable\'s FINAL value once the loop finishes.',
          },
          {
            q: 'Assuming filter(function, iterable) removes items where the function returns True',
            a: 'It is the opposite — filter() KEEPS items where the function returns a truthy value, and discards the rest. A common source of confusion when first learning it, especially if coming from a language where a similarly-named function works the other way.',
          },
          {
            q: 'Reaching for functools.reduce() when sum(), max(), or min() would say the same thing more clearly',
            a: 'reduce(lambda a, b: a + b, numbers) is functionally correct but strictly less readable than sum(numbers). Reserve reduce() for genuinely general folding operations that don\'t map onto one of the dedicated builtins, as discussed in Part 05.',
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
        <SectionTitle>Errors You Will Hit With Lambdas and Functional Tools — And Exactly Why</SectionTitle>

        {[
          {
            error: `SyntaxError: invalid syntax (on a lambda containing a statement)`,
            cause: 'The lambda body attempted to contain something that is a statement, not an expression — a for loop, an if with no else as a full statement, an assignment, or a return keyword.',
            fix: 'Rewrite the logic as a single expression (e.g. a ternary conditional expression instead of if/else statements), or convert the lambda into a proper "def" function if it genuinely needs multiple steps.',
          },
          {
            error: `NameError: name '<lambda>' is not defined`,
            cause: 'Usually appears in a traceback rather than being raised directly — it is Python reporting an error INSIDE an anonymous lambda, and since it has no real name, the traceback shows "<lambda>" as its identifier, which can make the source of the error hard to locate at a glance.',
            fix: 'Read the surrounding line numbers in the traceback carefully — the actual bug is inside the lambda\'s expression. If this keeps happening, it is a sign the lambda has outgrown its usefulness and should become a named function for easier debugging.',
          },
          {
            error: `TypeError: '<' not supported between instances of 'dict' and 'dict'`,
            cause: 'Calling sorted() (or min()/max()) on a list of dicts WITHOUT a key= function — Python has no default way to compare two dicts for ordering.',
            fix: 'Always supply key= when sorting complex objects like dicts, e.g. sorted(items, key=lambda d: d["field"]), telling Python exactly which value to compare.',
          },
          {
            error: `KeyError: 'engagement_score'`,
            cause: 'A lambda used as a sort key (or in map()/filter()) accessed a dict key with [] that did not exist on every item — exactly the production bug described in the Real World example above.',
            fix: 'Use .get("key", default) instead of ["key"] inside the lambda whenever the key is not guaranteed to exist on every item.',
          },
          {
            error: `TypeError: reduce() of empty sequence with no initial value`,
            cause: 'functools.reduce() was called on an empty iterable without providing a third argument (an initial/starting value) — with nothing to combine, and no starting point given, reduce() has no valid result to return.',
            fix: 'Always pass an explicit initial value as reduce()\'s third argument when the iterable might be empty, e.g. reduce(lambda a, b: a + b, numbers, 0).',
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
        'A lambda is an anonymous function whose body must be a single expression — no statements, no loops, no assignments, no explicit return keyword.',
        'Lambdas earn their place when short, throwaway, and used exactly once — most commonly as a sorted()/map()/filter() argument. If you want to name one, write a def function instead.',
        'map() and filter() both return lazy iterators, not lists — they must be consumed (e.g. wrapped in list()) to produce visible results, and can only be consumed once.',
        'functools.reduce() was moved out of the builtins in Python 3 because most reduction tasks already have a clearer dedicated tool: sum(), max(), min(), or a plain accumulator loop.',
        'Comprehensions are generally more idiomatic than chained map()/filter() calls for straightforward transform-and-filter jobs — they read in execution order, while functional chains read inside-out.',
        'sorted(items, key=lambda x: (...)) with a tuple return value is the standard way to sort by multiple keys at once — Python compares tuples element by element.',
        'A lambda cannot contain error handling — always use .get() with a default over [] indexing inside a lambda that touches a dict key that might not exist.',
        'There is no meaningful performance difference between a lambda and a def function, or between map()/filter() and an equivalent comprehension — choose based on readability, not assumed speed.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 27 goes underneath the for loop itself — the iterable and iterator protocols, what
          Python is actually doing on every pass, and how to build your own iterator class from scratch.
        </p>
        <Link href="/learn/python/iterators-iterables" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 27 → Iterators and Iterables
        </Link>
      </div>
    </LearnLayout>
  )
}
