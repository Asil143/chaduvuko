import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Tuples and Sets — Python | Chaduvuko',
  description:
    'Immutable sequences and unordered unique collections — tuple packing/unpacking, named tuples, every set operation, and when sets beat lists for membership testing.',
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

export default function TuplesSets() {
  return (
    <LearnLayout
      title="Tuples and Sets"
      description="Immutable sequences and unordered unique collections — tuple packing/unpacking, named tuples, every set operation, and when sets beat lists for membership testing."
      section="Python — Module 09"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Tuples" />
        <SectionTitle>Tuples — Ordered, Immutable Sequences</SectionTitle>

        <Para>
          A tuple is a lot like a list — ordered, indexable, allows duplicates and mixed types — with
          exactly one fundamental difference: once created, a tuple can never be changed. No{' '}
          <code>.append()</code>, no item reassignment, no <code>.sort()</code> in place. This single
          restriction, which sounds like a limitation, turns out to be exactly what makes tuples useful
          for a specific, common category of data.
        </Para>

        <CodeBox label="Creating and indexing tuples">{`point = (3, 4)
colors = ("red", "green", "blue")
single = (42,)            # a ONE-item tuple needs a trailing comma — (42) is just the int 42
empty = ()

print(point[0])       # 3        — indexing works exactly like lists
print(colors[-1])       # blue     — negative indexing too
print(colors[0:2])         # ('red', 'green')  — slicing returns a tuple, not a list`}</CodeBox>

        <Callout type="warning">
          <strong>The trailing comma for a one-item tuple is not optional.</strong>{' '}
          <code>(42)</code> is just the integer <code>42</code> wrapped in ordinary parentheses — it is{' '}
          <code>(42,)</code>, with the comma, that actually creates a tuple. This catches nearly every
          beginner at least once, and is worth testing with <code>type()</code> the first time you try
          it to see for yourself.
        </Callout>

        <CodeBox label="Immutability enforced">{`point = (3, 4)
point[0] = 5
# TypeError: 'tuple' object does not support item assignment

# Every list method that would MODIFY the tuple simply doesn't exist on it —
# no .append(), no .remove(), no .sort(). Read-only operations like .index()
# and .count() DO exist, since they don't change anything.`}</CodeBox>

        <Para>
          Technically, parentheses are not what makes a tuple — the comma is. <code>1, 2, 3</code>{' '}
          without any parentheses at all is already a tuple; the parentheses are just a readability
          convention, almost always used, and required in a few specific syntactic positions (like an
          empty tuple, or a tuple passed directly as one function argument among several).
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Packing and Unpacking" />
        <SectionTitle>Tuple Packing and Unpacking — Including the * Operator</SectionTitle>

        <Para>
          You have already used tuple unpacking, without necessarily naming it, in the Functions module
          — <code>lowest, highest = get_min_max(numbers)</code> is tuple unpacking. <strong>Packing</strong>{' '}
          is the reverse direction: combining several values into a single tuple by separating them with
          commas.
        </Para>

        <CodeBox label="Packing and unpacking">{`# Packing — multiple values combined into one tuple
point = 3, 4, 5          # packed into (3, 4, 5) — parentheses are optional here

# Unpacking — one tuple split back into multiple names
x, y, z = point
print(x, y, z)             # 3 4 5

# The classic use: swapping two variables without a temp variable
a, b = 1, 2
a, b = b, a                  # the right side is packed into a tuple, then unpacked
print(a, b)                     # 2 1`}</CodeBox>

        <Para>
          The number of names on the left must match the number of values on the right — unpacking{' '}
          <code>a, b = (1, 2, 3)</code> raises <code>ValueError: too many values to unpack</code>. This
          is where <strong>extended unpacking</strong> with a single <code>*</code> becomes genuinely
          useful — it lets one name absorb "everything else" as a list, while the rest match exactly one
          value each.
        </Para>

        <CodeBox label="Extended unpacking with *">{`first, *middle, last = [1, 2, 3, 4, 5]
print(first)     # 1
print(middle)       # [2, 3, 4]   — note: a LIST, not a tuple, even though the source was one
print(last)             # 5

first, *rest = (10, 20, 30, 40)
print(first)                # 10
print(rest)                    # [20, 30, 40]

*rest, last = (10, 20, 30, 40)
print(rest)                       # [10, 20, 30]
print(last)                          # 40`}</CodeBox>

        <Callout type="tip">
          Extended unpacking is genuinely common in real code for exactly the shape shown above — pulling
          the first item (a header row, the most recent record) or the last item off a sequence while
          keeping "everything in between" as its own collection, without manually slicing indices.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Tuple vs List" />
        <SectionTitle>When to Choose a Tuple Over a List</SectionTitle>

        <Para>
          Given that a tuple is essentially "a list that cannot change," the natural question is when
          that restriction is actually a benefit rather than an inconvenience. There are three genuinely
          distinct reasons, and a working engineer should be able to name all three, not just recite
          "tuples are immutable."
        </Para>

        <SubTitle>Reason 1 — semantic meaning: a fixed-shape record, not a growable collection</SubTitle>

        <Para>
          A tuple communicates, just by its type, that this value is a fixed-size, fixed-meaning record
          — not a collection you would ever loop over expecting a variable number of items. A GPS
          coordinate <code>(latitude, longitude)</code> is always exactly two values, in a fixed order,
          each with a specific meaning by position. Representing it as a list quietly implies "this could
          have any number of items" even though it never should.
        </Para>

        <SubTitle>Reason 2 — hashability: tuples can be dictionary keys and set members</SubTitle>

        <Para>
          This is the most practically important reason. A dict key or a set member must be hashable — a
          requirement you will meet formally in the Dictionaries module — and hashability requires
          immutability. Lists are unhashable and can never be used as dict keys; tuples (containing only
          hashable items themselves) can.
        </Para>

        <CodeBox label="Only a tuple can do this — a list would raise TypeError">{`visited_coordinates = {
    (40.7128, -74.0060): "New York",
    (34.0522, -118.2437): "Los Angeles",
}

print(visited_coordinates[(40.7128, -74.0060)])   # New York

# The list equivalent fails immediately:
# bad_dict = { [40.7128, -74.0060]: "New York" }
# TypeError: unhashable type: 'list'`}</CodeBox>

        <SubTitle>Reason 3 — a small, genuine performance edge</SubTitle>

        <Para>
          Tuples are slightly faster to create and slightly more memory-efficient than lists holding the
          same values, because Python does not need to reserve extra room for future growth the way it
          does for a list, which is designed to be appended to. For most everyday code this difference is
          not something you will notice — but at genuinely large scale, or inside a tight loop creating
          many small fixed records, it is a real and measurable advantage of choosing the type that
          actually matches your intent.
        </Para>

        <Callout type="info">
          A useful rule of thumb: if you would ever call <code>.append()</code>, <code>.remove()</code>,
          or reorder the collection, it should be a list. If the collection has a fixed number of items
          with fixed meaning by position — a coordinate, an RGB color, a database row — a tuple says
          that intent directly, and unlocks hashability as a side benefit.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Named Tuples" />
        <SectionTitle>namedtuple and typing.NamedTuple — Tuples With Field Names</SectionTitle>

        <Para>
          A plain tuple&apos;s biggest real weakness is readability — <code>point[0]</code> and{' '}
          <code>point[1]</code> tell you nothing about which value is which without checking how the
          tuple was built. A named tuple solves this directly: it behaves exactly like a regular tuple —
          immutable, indexable, unpackable — but its fields can also be accessed by name.
        </Para>

        <CodeBox label="collections.namedtuple">{`from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

p = Point(3, 4)

print(p[0])       # 3       — still works like a regular tuple by index
print(p.x)          # 3       — but also readable by name
print(p.y)            # 4

x, y = p                 # unpacking still works exactly like a regular tuple
print(f"({x}, {y})")        # (3, 4)`}</CodeBox>

        <Para>
          The more modern equivalent, <code>typing.NamedTuple</code>, does the same thing with a class-based
          syntax that also lets you attach type hints per field — you will use type hints properly in the
          dedicated Type Hints module later in this track, but the pattern is genuinely common enough in
          real code to introduce now.
        </Para>

        <CodeBox label="typing.NamedTuple — the class-based, type-hinted equivalent">{`from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float

p = Point(3, 4)
print(p.x, p.y)   # 3 4
print(p)              # Point(x=3, y=4) — a genuinely readable repr, for free`}</CodeBox>

        <Callout type="tip">
          Named tuples are a real, common pattern in production Python — used constantly for lightweight
          records returned from a function (like the <code>get_min_max()</code> example from the
          Functions module, which could return a named tuple instead of a plain one for extra clarity),
          for rows read back from a database query, and for configuration values, wherever the full
          weight of defining a class would be overkill but a plain, unlabelled tuple would be too opaque
          to read comfortably.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Sets" />
        <SectionTitle>Sets — Unordered Collections of Unique Values</SectionTitle>

        <Para>
          A set is an unordered collection with exactly one defining rule: every item in it is unique.
          Adding a value that already exists in the set has no effect at all — the set simply does not
          change. This makes sets the natural tool any time "does this contain duplicates" or "give me
          only the distinct values" is the actual problem you are solving.
        </Para>

        <CodeBox label="Creating sets and automatic deduplication">{`unique_ids = {101, 102, 103, 101, 102}
print(unique_ids)      # {101, 102, 103} — duplicates are simply gone

# set() can build a set from any iterable — a very common dedup trick
names = ["Maria", "Jordan", "Maria", "Priya", "Jordan"]
unique_names = set(names)
print(unique_names)          # {'Maria', 'Jordan', 'Priya'} — order not guaranteed

empty_set = set()               # NOTE: {} creates an empty DICT, not an empty set — use set()`}</CodeBox>

        <Callout type="warning">
          <strong>{'{}'} is an empty dict, not an empty set.</strong> This is a genuinely easy trap, since{' '}
          <code>{'{1, 2, 3}'}</code> with items inside really is a set. An empty set must be created with
          the explicit <code>set()</code> call — there is no literal syntax for it.
        </Callout>

        <CodeBox label="Adding, removing, and checking membership">{`fruits = {"apple", "banana"}

fruits.add("cherry")          # add ONE item
fruits.update(["date", "fig"])  # add MULTIPLE items from another iterable — like extend() for lists

fruits.discard("banana")        # removes if present, does nothing if not — never raises an error
fruits.remove("apple")            # removes if present, raises KeyError if NOT present

print("cherry" in fruits)           # True — membership check, covered in depth in Part 07`}</CodeBox>

        <Para>
          Because a set is unordered, it has no indexing at all — <code>my_set[0]</code> raises a{' '}
          <code>TypeError</code> immediately. There is no concept of "the first item," since a set
          makes no promise about the order its items are stored or iterated in.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Set Operations" />
        <SectionTitle>Union, Intersection, Difference, and Symmetric Difference</SectionTitle>

        <Para>
          Sets support the core mathematical set operations directly, and they map exactly onto a
          Venn diagram — genuinely useful for real problems like "which customers exist in both systems"
          or "which permissions does this role have that the other one doesn&apos;t."
        </Para>

        <CodeBox label="Two example sets, used throughout this part">{`python_devs = {"Maria", "Jordan", "Priya", "Sam"}
js_devs = {"Priya", "Sam", "Alex", "Chen"}`}</CodeBox>

        <CodeBox label="Union — everyone in EITHER set (the full combined circle)">{`python_devs | js_devs
# or: python_devs.union(js_devs)

# {'Maria', 'Jordan', 'Priya', 'Sam', 'Alex', 'Chen'}
# Every name from both sets, each appearing only once, even Priya and Sam who are in both.`}</CodeBox>

        <CodeBox label="Intersection — only people in BOTH sets (the overlapping middle)">{`python_devs & js_devs
# or: python_devs.intersection(js_devs)

# {'Priya', 'Sam'}
# Only the developers who know BOTH languages.`}</CodeBox>

        <CodeBox label="Difference — in the first set, but NOT the second (one side of the overlap, removed)">{`python_devs - js_devs
# or: python_devs.difference(js_devs)

# {'Maria', 'Jordan'}
# Python developers who do NOT also know JavaScript.
# Note: this is NOT symmetric — js_devs - python_devs gives a different result: {'Alex', 'Chen'}`}</CodeBox>

        <CodeBox label="Symmetric difference — in EXACTLY ONE set, not both (everything except the overlap)">{`python_devs ^ js_devs
# or: python_devs.symmetric_difference(js_devs)

# {'Maria', 'Jordan', 'Alex', 'Chen'}
# Everyone who knows exactly one of the two languages — Priya and Sam,
# who know both, are excluded entirely.`}</CodeBox>

        <Callout type="tip">
          A genuinely common real use of these operations: reconciling two data sources.{' '}
          <code>set(system_a_ids) - set(system_b_ids)</code> instantly answers "which records exist in A
          but are missing from B" — a question that would otherwise require a nested loop (exactly the
          O(n × m) problem from the Loops module) to answer manually.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Sets vs Lists for Membership Testing" />
        <SectionTitle>Why in Is Fast for a Set and Slow for a Large List</SectionTitle>

        <Para>
          This ties directly back to the algorithmic-complexity idea first introduced in the Operators
          module, and it is one of the most consequential performance decisions you can make in everyday
          Python: checking whether a value exists in a <strong>list</strong> requires Python to scan
          items one by one, in the worst case checking every single item — this is <strong>O(n)</strong>,
          meaning the time it takes grows in direct proportion to the list&apos;s size. Checking
          membership in a <strong>set</strong> uses hashing to jump almost directly to where the value
          would be, without scanning — this is <strong>O(1)</strong>, meaning it takes roughly the same
          time regardless of how large the set is.
        </Para>

        <CodeBox label="Same question, dramatically different cost at scale">{`blocked_ids_list = [ ... 100_000 ids ... ]
blocked_ids_set = set(blocked_ids_list)

# Both give the same correct answer:
user_id in blocked_ids_list    # O(n) — may check all 100,000 items, one by one
user_id in blocked_ids_set        # O(1) — roughly constant time, regardless of size`}</CodeBox>

        <Para>
          For a small list, the difference is genuinely irrelevant — checking 10 items one by one takes
          effectively no time either way. It becomes a real, measurable problem exactly where the Loops
          module&apos;s Denver example landed: a lookup performed repeatedly, inside another loop, against
          a collection that has grown large. Converting the collection being checked against from a list
          into a set is one of the single highest-leverage, lowest-effort performance fixes in everyday
          Python.
        </Para>

        <Callout type="warning">
          Sets require their items to be hashable, exactly like dict keys (Part 04). This means a set can
          hold numbers, strings, and tuples of hashable items — but never lists or dicts. If you need
          fast membership testing over items that are themselves lists, convert each to a tuple first.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Frozensets" />
        <SectionTitle>frozenset — An Immutable Set</SectionTitle>

        <Para>
          A <code>frozenset</code> is exactly what its name suggests: a set that cannot be modified after
          creation — no <code>.add()</code>, no <code>.remove()</code>, no <code>.update()</code>. It
          exists for precisely the same reason tuples exist alongside lists: immutability is what makes
          hashability possible, and a regular, mutable <code>set</code> cannot be used as a dict key or
          placed inside another set for the same reason a list cannot.
        </Para>

        <CodeBox label="frozenset in practice">{`permissions_a = frozenset(["read", "write"])
permissions_b = frozenset(["read", "write", "delete"])

# A frozenset can be a dict key — a regular set cannot
access_levels = {
    permissions_a: "editor",
    permissions_b: "admin",
}

print(access_levels[frozenset(["read", "write"])])   # editor

permissions_a.add("delete")
# AttributeError: 'frozenset' object has no attribute 'add'`}</CodeBox>

        <Para>
          Union, intersection, difference, and symmetric difference all work identically on frozensets —
          only the mutating operations are removed. In practice, you will reach for a regular{' '}
          <code>set</code> far more often; <code>frozenset</code> earns its place specifically when a
          set-like collection needs to be hashable — as a dict key, or as a member of another set.
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
        <SectionTitle>An Atlanta HR Platform&apos;s Nightly Access Audit Times Out Every Night</SectionTitle>

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
            Scenario — HR software company, Atlanta · Nightly batch job timeout
          </div>

          <Para>
            An Atlanta HR platform runs a nightly compliance audit that flags any employee whose account
            has access permissions they should no longer have — comparing each employee&apos;s current
            granted permissions against the permissions their current role is actually allowed. When the
            company had a few hundred employees, the job finished in seconds. Past around fifteen
            thousand employees, the job started missing its overnight window entirely, sometimes still
            running when the next business day started.
          </Para>

          <SubSubTitle>What the investigation finds</SubSubTitle>

          <Para>
            The audit checks each employee&apos;s permissions against a master list of currently
            authorized permission codes — stored and searched as a plain list, checked with{' '}
            <code>in</code> inside a loop over every employee. Exactly the O(n) membership check from
            Part 07, run once per employee, against a list that itself has grown alongside the company.
          </Para>

          <CodeBox label="The original audit job">{`authorized_codes = get_authorized_permission_codes()   # a list, ~4,000 codes

flagged = []
for employee in get_all_employees():                       # ~15,000 employees
    for code in employee.granted_permissions:
        if code not in authorized_codes:                     # O(n) scan, EVERY time
            flagged.append((employee, code))`}</CodeBox>

          <Para>
            With roughly 15,000 employees each holding a handful of permission codes, and each{' '}
            <code>in</code> check scanning up to 4,000 items in the authorized list, the job was
            performing tens of millions of individual comparisons — the same nested-loop-shaped cost
            problem from the Loops module&apos;s Denver example, just expressed through a slow membership
            check instead of a literal nested <code>for</code>.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="The fix — a set for O(1) membership checks">{`authorized_codes = set(get_authorized_permission_codes())   # a set, not a list

flagged = []
for employee in get_all_employees():
    for code in employee.granted_permissions:
        if code not in authorized_codes:                        # O(1) — fast, regardless of size
            flagged.append((employee, code))`}</CodeBox>

          <Para>
            One line changed — <code>list</code> to <code>set</code> — and the nightly job drops from
            regularly missing its window to finishing in a few seconds. As with the Denver logistics
            example in the Loops module, the underlying lesson generalises well beyond this one job: any
            time code repeatedly asks "does this value exist in that collection," and the collection is
            not trivially small, a set is very often the correct default, not a list.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Tuples and Sets</SectionTitle>

        {[
          {
            wrong: '"(42) creates a one-item tuple"',
            right: '(42) is just the integer 42 in ordinary parentheses. A one-item tuple requires a trailing comma: (42,). The comma is what actually creates a tuple — the parentheses are mostly a readability convention.',
          },
          {
            wrong: '"{} creates an empty set, the same way [] creates an empty list"',
            right: '{} creates an empty DICT. Creating an empty set requires the explicit set() call — there is no literal syntax for an empty set, which is a genuinely easy trap the first time you write it.',
          },
          {
            wrong: '"Sets are just lists that happen to remove duplicates"',
            right: 'Deduplication is a side effect, not the core feature. The real property is hashing-based O(1) membership testing, which is why sets are the right tool for repeated "does this exist" checks against large collections — not merely a dedup convenience.',
          },
          {
            wrong: '"Since sets are unordered, iterating over the same set twice can give a different order each time within one run"',
            right: 'In practice, iteration order for a given set is stable within a single run of a program (as an implementation detail of CPython), but it is NOT guaranteed by the language and should never be relied on for correctness — and it is not the same as list ordering, which is explicitly guaranteed and preserved. Never write code whose correctness depends on a set\'s iteration order.',
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
            q: 'What are the three main reasons to choose a tuple over a list?',
            a: 'First, semantic meaning — a tuple communicates a fixed-size record with position-based meaning (like a coordinate), rather than a growable collection. Second, hashability — an immutable tuple containing only hashable items can be used as a dict key or set member, while a list never can. Third, a small performance and memory edge, since Python does not need to reserve room for a tuple to grow the way it does for a list.',
          },
          {
            q: 'Why is checking membership with "in" much faster on a set than on a large list?',
            a: 'A list membership check is O(n) — Python may need to scan every item one by one in the worst case, so the time grows with the list\'s size. A set uses hashing to compute roughly where a value would be stored and check that location directly, making membership testing O(1) — roughly constant time regardless of how large the set is. This makes sets the right default any time membership is checked repeatedly against a non-trivial collection.',
          },
          {
            q: 'What is the difference between discard() and remove() on a set?',
            a: 'remove(value) raises a KeyError if the value is not present in the set. discard(value) does nothing at all if the value is not present — it never raises an error. Use discard() when the value\'s absence is a normal, expected case; use remove() when its absence should be treated as a bug.',
          },
          {
            q: 'What is a named tuple, and why would you use one over a plain tuple?',
            a: 'A named tuple (via collections.namedtuple or typing.NamedTuple) behaves exactly like a regular tuple — immutable, indexable, unpackable — but its fields can also be accessed by name (point.x instead of point[0]). It solves a plain tuple\'s biggest weakness, readability, without giving up any of a tuple\'s benefits, and is common for lightweight records returned from functions or read from a database.',
          },
          {
            q: 'What is a frozenset, and when would you need one instead of a regular set?',
            a: 'A frozenset is an immutable version of a set — no add(), remove(), or update() after creation. It exists because immutability is required for hashability, exactly like tuples versus lists: a frozenset can be used as a dict key or placed inside another set, while a regular, mutable set cannot be used in either position.',
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
        <SectionTitle>Tuple and Set Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the trailing comma on a one-item tuple',
            a: 'x = (42) makes x an int, not a tuple. x = (42,) is required — the comma, not the parentheses, is what actually creates the tuple.',
          },
          {
            q: 'Using {} expecting an empty set',
            a: '{} is an empty dict. An empty set must be created with set() explicitly — there is no empty-set literal.',
          },
          {
            q: 'Trying to index into a set',
            a: 'my_set[0] raises TypeError: \'set\' object is not subscriptable — sets are unordered and have no concept of position. Convert to a list or tuple first if positional access is genuinely needed, though needing that is often a sign a list was the right structure to begin with.',
          },
          {
            q: 'Assuming set(list_with_lists_inside) will work',
            a: 'set([[1, 2], [3, 4]]) raises TypeError: unhashable type: \'list\' — sets require every item to be hashable, and lists are not. Convert inner lists to tuples first if they need to go into a set.',
          },
          {
            q: 'Using remove() on a set when the value might not be present',
            a: 'remove() raises KeyError if the value is missing. Use discard(), which silently does nothing if the value is not present, whenever the value\'s absence is a normal, expected outcome rather than a bug.',
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
        <SectionTitle>Errors You Will Hit With Tuples and Sets — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: 'tuple' object does not support item assignment`,
            cause: 'Attempting to modify a tuple in place, e.g. point[0] = 5 — tuples are immutable, so no item can be reassigned after creation.',
            fix: 'If the value genuinely needs to change, build a new tuple, or reconsider whether the data should have been a list in the first place, since it apparently needs to be mutable.',
          },
          {
            error: `TypeError: unhashable type: 'list'`,
            cause: 'Trying to use a list as a dict key, or trying to put a list inside a set — both require every element to be hashable, and lists are mutable, so they are never hashable.',
            fix: 'Convert the list to a tuple first if its contents are meant to be fixed, e.g. my_dict[tuple(my_list)] = value.',
          },
          {
            error: `ValueError: too many values to unpack (expected 2)`,
            cause: 'Unpacking a tuple (or list) into a fixed number of names when the actual number of values does not match exactly, e.g. a, b = (1, 2, 3).',
            fix: 'Match the number of names to the number of values, or use extended unpacking with * to absorb any extra values into a list: a, *rest = (1, 2, 3).',
          },
          {
            error: `KeyError (when calling .remove() on a set)`,
            cause: 'Calling .remove(value) on a set where that value does not exist.',
            fix: 'Use .discard(value) instead if the value\'s absence is a normal case that should not raise an error, or check "if value in my_set:" first.',
          },
          {
            error: `TypeError: 'set' object is not subscriptable`,
            cause: 'Attempting to index into a set with square brackets, e.g. my_set[0] — sets are unordered and have no positional access at all.',
            fix: 'Convert to a list first (list(my_set)) if positional access is genuinely needed, or use a for loop / membership check instead, depending on what you are actually trying to accomplish.',
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
        'Tuples are ordered and indexable like lists, but immutable — no append, remove, or item reassignment. A one-item tuple requires a trailing comma: (42,).',
        'Unpacking splits a tuple into named variables; extended unpacking with * lets one name absorb "everything else" as a list, e.g. first, *rest = my_tuple.',
        'Choose a tuple over a list for fixed-shape records, when hashability (dict keys, set members) is needed, or for a small performance edge — choose a list when the collection needs to grow or be reordered.',
        'Named tuples (collections.namedtuple, typing.NamedTuple) add field-name access on top of regular tuple behaviour — genuinely common for lightweight records.',
        'Sets are unordered, unique-valued collections. {} creates an empty dict, not an empty set — use set() explicitly.',
        'Union (|), intersection (&), difference (-), and symmetric difference (^) map directly onto Venn-diagram set operations.',
        'Membership testing (in) is O(1) for a set versus O(n) for a list — converting a large, frequently-checked list into a set is one of the highest-leverage performance fixes in everyday Python.',
        'frozenset is an immutable set, needed specifically when a set-like collection must itself be hashable — as a dict key or a member of another set.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 10 wraps up the fundamentals of input and output — input() mechanics, print()&apos;s
          lesser-known keyword arguments, and print-based debugging — before Phase 2 begins with
          dictionaries.
        </p>
        <Link href="/learn/python/io-formatting" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 10 → Input/Output &amp; f-string Formatting
        </Link>
      </div>
    </LearnLayout>
  )
}
