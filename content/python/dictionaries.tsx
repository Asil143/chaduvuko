import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Dictionaries — Python | Chaduvuko',
  description:
    'Key-value storage, the most-used data structure in real Python code — every method, iteration patterns, insertion ordering, merging, defaultdict, and why lookups are O(1).',
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

export default function Dictionaries() {
  return (
    <LearnLayout
      title="Dictionaries"
      description="Key-value storage, the most-used data structure in real Python code — every method, iteration patterns, insertion ordering, merging, and defaultdict."
      section="Python — Module 11"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Welcome to Phase 2" />
        <SectionTitle>Dictionaries — The Data Structure You Will Use the Most</SectionTitle>

        <Para>
          This module opens <strong>Phase 2: Core Data Structures &amp; Logic</strong>. Phase 1 gave
          you the foundations — variables, types, operators, strings, control flow, loops, functions,
          lists, tuples and sets, and I/O formatting. Everything in Phase 2 builds directly on that:
          dictionaries rely on the mutability and hashability concepts from Module 02, comprehensions
          in the next module are a compact rewrite of the loops you learned in Module 06, and nested
          data structures a few modules from now are just dicts and lists containing more dicts and
          lists. Nothing here is new mechanics — it is the same mechanics, combined into shapes that
          look like real production data.
        </Para>

        <Para>
          If you had to guess which single data structure appears most often in real Python
          codebases, the honest answer is the dictionary. JSON — the format nearly every web API
          speaks — maps directly onto Python dicts. Configuration files, database query results,
          function keyword arguments, cached values, request payloads, environment variables: all of
          it eventually becomes a dict in your running program. Lists are for "a bunch of things in
          order." Dictionaries are for "a value, looked up by a name" — and once you start noticing
          it, almost everything you model in a real application is a lookup by name.
        </Para>

        <CodeBox label="A dictionary — key/value pairs">{`employee = {
    "name": "Priya Nair",
    "role": "Backend Engineer",
    "salary": 118000,
    "remote": True,
}

print(employee["name"])   # "Priya Nair"
print(employee["salary"]) # 118000`}</CodeBox>

        <Para>
          Each entry is a <strong>key: value</strong> pair. Keys are how you look values up — like an
          index, except instead of a position (<code>0</code>, <code>1</code>, <code>2</code>...) you
          use a meaningful name. Values can be anything: a string, a number, a list, even another
          dict. Keys are far more restricted, and that restriction is the subject of Part 02.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Creating Dictionaries" />
        <SectionTitle>Three Ways to Build a Dict — And Why Keys Must Be Hashable</SectionTitle>

        <Para>
          The curly-brace literal from Part 01 is the most common way to create a dict, but it is not
          the only one. The <code>dict()</code> constructor and <code>dict.fromkeys()</code> both come
          up in real code, each suited to a different situation.
        </Para>

        <CodeBox label="dict() constructor — from keyword arguments">{`employee = dict(name="Priya Nair", role="Backend Engineer", salary=118000)
# Identical to the literal form, but the keys are written as bare identifiers,
# not quoted strings — convenient when every key is a valid Python name.

# dict() also accepts a list of (key, value) tuple pairs:
pairs = [("a", 1), ("b", 2), ("c", 3)]
d = dict(pairs)   # {"a": 1, "b": 2, "c": 3}`}</CodeBox>

        <CodeBox label="dict.fromkeys() — same default value for every key">{`# Initialise a dict where every key starts with the same value —
# genuinely common for counters and "seen" trackers
inventory_counts = dict.fromkeys(["apples", "bananas", "cherries"], 0)
print(inventory_counts)
# {"apples": 0, "bananas": 0, "cherries": 0}`}</CodeBox>

        <Callout type="warning">
          <strong>dict.fromkeys() shares one mutable default across every key.</strong> If the default
          value is mutable (like a list), every key ends up pointing at the <em>same</em> list object —
          exactly the shared-reference trap from Module 02&apos;s mutability discussion. Mutating one
          key&apos;s "list" mutates all of them. Use a dict comprehension instead when the default needs
          to be a fresh mutable object per key: <code>{`{k: [] for k in keys}`}</code>.
        </Callout>

        <SubTitle>Why keys must be hashable</SubTitle>

        <Para>
          A dict is not a list dressed up with names — internally, it is a <strong>hash table</strong>.
          When you do <code>employee["salary"]</code>, Python does not scan every key looking for a
          match. It runs <code>"salary"</code> through a hash function, uses the result to jump almost
          directly to the right storage slot, and confirms the key matches. This is the entire reason
          dict lookups are so fast — and it is also why dict keys have a hard restriction: a key must
          be <strong>hashable</strong>, meaning its hash value can never change over its lifetime.
        </Para>

        <Para>
          Recall from Module 02 that every object is either mutable or immutable. Mutable objects —
          lists, dicts, sets — cannot be hashed at all, because their contents (and therefore their
          hash) could change after being used as a key, silently corrupting the hash table. This is
          the exact same rule you met in Module 09 when learning why sets can only contain immutable
          elements: sets and dict keys are built on the same underlying hash-table mechanism.
        </Para>

        <CodeBox label="Hashable keys work. Mutable keys raise TypeError.">{`valid = {
    "user_id": 42,        # str key — hashable
    (1, 2): "point",       # tuple key — hashable, since (1, 2) is itself immutable
    True: "yes",             # bool key — hashable
}

invalid = {
    [1, 2]: "point"          # TypeError: unhashable type: 'list'
}`}</CodeBox>

        <Para>
          Tuples deserve a special mention here: a tuple is hashable <em>only if every element inside
          it is also hashable</em>. <code>(1, 2)</code> is a fine dict key. <code>(1, [2, 3])</code> is
          not, because it contains a list. This trips people up the first time they try to use a
          coordinate pair or composite key built from a mix of value types.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Accessing Values" />
        <SectionTitle>[] vs .get() — The Difference That Prevents Crashes</SectionTitle>

        <Para>
          Square-bracket access (<code>employee["salary"]</code>) raises a <code>KeyError</code> the
          instant the key does not exist. That is fine when you are certain the key is present — but
          real-world data is rarely that certain, especially data coming from an external API or a
          user-supplied form where a field might simply be missing.
        </Para>

        <CodeBox label="[] raises. .get() doesn't.">{`employee = {"name": "Priya Nair", "role": "Backend Engineer"}

print(employee["salary"])
# KeyError: 'salary'

print(employee.get("salary"))
# None — no crash, just a graceful "not found"

print(employee.get("salary", 0))
# 0 — .get()'s second argument is the default returned when the key is missing`}</CodeBox>

        <Callout type="tip">
          <strong>Default to <code>.get()</code> for any key whose presence you are not 100% certain
          of.</strong> Reserve <code>[]</code> for cases where a missing key genuinely indicates a bug
          in your program and you <em>want</em> the loud failure. This mirrors the guard-clause
          philosophy from Module 05 — decide deliberately whether a missing value is an expected case
          to handle gracefully, or a real error that should surface immediately.
        </Callout>

        <SubTitle>The membership check — the in operator</SubTitle>

        <Para>
          To check whether a key exists without retrieving its value, use <code>in</code> — the same
          membership operator from Module 03&apos;s operators module, applied to a dict&apos;s keys.
        </Para>

        <CodeBox label="in checks keys, not values, by default">{`employee = {"name": "Priya Nair", "role": "Backend Engineer"}

print("name" in employee)     # True  — checks keys
print("Priya Nair" in employee)  # False — the VALUE "Priya Nair" is not a key

# To check values, be explicit:
print("Priya Nair" in employee.values())   # True`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Core Methods" />
        <SectionTitle>Every Method You Will Actually Reach For</SectionTitle>

        <Para>
          A dictionary has a small set of methods, and unlike lists (which have dozens of situational
          methods), you will use nearly all of a dict&apos;s methods regularly. It is worth learning
          all of them properly rather than picking them up piecemeal.
        </Para>

        <CodeBox label=".keys(), .values(), .items() — the three views">{`employee = {"name": "Priya Nair", "role": "Backend Engineer", "salary": 118000}

print(employee.keys())    # dict_keys(['name', 'role', 'salary'])
print(employee.values())  # dict_values(['Priya Nair', 'Backend Engineer', 118000])
print(employee.items())   # dict_items([('name', 'Priya Nair'), ('role', 'Backend Engineer'), ('salary', 118000)])`}</CodeBox>

        <Para>
          These three are not lists — they are "view" objects, which stay live if the underlying dict
          changes later (rare to rely on directly, but worth knowing so <code>type(employee.keys())</code>{' '}
          not saying <code>list</code> doesn&apos;t surprise you). Wrap any of them in <code>list()</code>{' '}
          if you specifically need a real list.
        </Para>

        <CodeBox label=".update() — merge another dict's entries in, in place">{`employee = {"name": "Priya Nair", "role": "Backend Engineer"}
employee.update({"role": "Senior Backend Engineer", "salary": 135000})

print(employee)
# {"name": "Priya Nair", "role": "Senior Backend Engineer", "salary": 135000}
# "role" was overwritten (it already existed); "salary" was added (it didn't).`}</CodeBox>

        <CodeBox label=".pop() and .popitem() — remove and return">{`employee = {"name": "Priya Nair", "role": "Backend Engineer", "salary": 118000}

salary = employee.pop("salary")     # removes "salary", returns 118000
print(employee)                     # {"name": "Priya Nair", "role": "Backend Engineer"}

missing = employee.pop("bonus", 0)  # key doesn't exist — returns the default, no crash
print(missing)                      # 0

last = employee.popitem()           # removes and returns the LAST inserted (key, value) pair
print(last)                         # ("role", "Backend Engineer")`}</CodeBox>

        <CodeBox label=".setdefault() — get, or insert-then-get, in one call">{`counts = {}

# Without setdefault — the awkward way to "get or initialise"
if "apples" not in counts:
    counts["apples"] = 0
counts["apples"] += 1

# With setdefault — same result, one line
counts.setdefault("apples", 0)
counts["apples"] += 1

print(counts)   # {"apples": 2}`}</CodeBox>

        <Para>
          <code>.setdefault(key, default)</code> returns the value for <code>key</code> if it exists;
          if it does not, it inserts <code>key</code> with <code>default</code> and then returns that
          default. It is a genuinely useful shortcut for building up grouped data — you will use it
          heavily once you reach the grouping patterns in Module 13 — though for the single most common
          case (grouping into lists), <code>collections.defaultdict</code> in Part 07 is usually the
          cleaner tool.
        </Para>

        <CodeBox label="Other methods worth knowing">{`employee = {"name": "Priya Nair", "role": "Backend Engineer"}

copy = employee.copy()     # a shallow copy — a new dict, same top-level keys/values
employee.clear()           # empties the dict in place — {}
print(len(copy))           # 2 — len() works on dicts too, counting key/value pairs`}</CodeBox>

        <Callout type="warning">
          <strong>.copy() is shallow.</strong> If a value inside the dict is itself mutable (a nested
          list or dict), the copy shares that nested object with the original — mutating it through
          either dict affects both. This is exactly the shared-reference issue from Module 02, one
          level deeper. For a true independent copy of nested data, use <code>copy.deepcopy()</code>{' '}
          from the standard library&apos;s <code>copy</code> module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Iteration" />
        <SectionTitle>Iterating a Dict — And Why .items() Is the Idiomatic Default</SectionTitle>

        <Para>
          Looping over a dict directly iterates its <strong>keys</strong> — this surprises people
          coming from languages where iterating a map-like structure gives you entries by default.
        </Para>

        <CodeBox label="Looping directly — keys only">{`employee = {"name": "Priya Nair", "role": "Backend Engineer", "salary": 118000}

for key in employee:
    print(key)
# name
# role
# salary`}</CodeBox>

        <Para>
          To get the value too, you could look it up inside the loop — but that means a second hash
          lookup on every iteration, purely to fetch something Python already had on hand a moment
          earlier. The idiomatic, and faster, approach is unpacking <code>.items()</code> directly into
          two loop variables.
        </Para>

        <CodeBox label="The idiomatic pattern — for k, v in d.items():">{`# Works, but does a redundant lookup on every iteration
for key in employee:
    print(key, employee[key])

# Idiomatic — unpacks (key, value) tuples directly, no extra lookup
for key, value in employee.items():
    print(key, value)`}</CodeBox>

        <Para>
          If you genuinely only need the values and never the keys, iterate <code>.values()</code>{' '}
          directly rather than <code>.items()</code> and discarding the key — it says exactly what you
          mean, and it is the pattern a reviewer will expect to see.
        </Para>

        <CodeBox label="Only need values? Say so.">{`total_salary = sum(employee_dict["salary"] for employee_dict in team_members)

# If team_members were itself a dict of employee -> salary:
salaries = {"Priya": 118000, "Wei": 121000, "Alex": 109000}
total = sum(salaries.values())
print(total)   # 348000`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Ordering" />
        <SectionTitle>Dict Ordering — Insertion Order Since Python 3.7</SectionTitle>

        <Para>
          Since Python 3.7, dictionaries officially preserve <strong>insertion order</strong> — keys
          come back out in the same order you put them in, guaranteed by the language specification,
          not just as an implementation detail. If this seems unremarkable to you, it is worth knowing
          why it genuinely surprised experienced Python engineers when it landed.
        </Para>

        <Para>
          Before 3.7 (and unofficially even in 3.6, where CPython&apos;s implementation happened to
          preserve order but the language spec did not guarantee it), dicts were explicitly{' '}
          <strong>unordered</strong>. Iterating the same dict twice could — in principle — give you
          keys in a different sequence, because the internal hash table made no promises about
          iteration order. Anyone who had written Python before 3.7 was trained to never rely on dict
          order for anything, and to reach for <code>collections.OrderedDict</code> whenever order
          genuinely mattered.
        </Para>

        <CodeBox label="Order is guaranteed — and it's insertion order, not sorted order">{`d = {}
d["z"] = 1
d["a"] = 2
d["m"] = 3

print(list(d.keys()))
# ['z', 'a', 'm'] — exactly insertion order, NOT alphabetical`}</CodeBox>

        <Callout type="info">
          <code>collections.OrderedDict</code> still exists and is still used in modern code, but only
          for a few specific reasons now: it supports <code>.move_to_end()</code>, its equality check
          considers order (two regular dicts with the same pairs in different order are still equal;
          two OrderedDicts are not), and some codebases keep it for explicitness. For everyday code,
          a plain <code>dict</code> is order-preserving and is what you should reach for by default.
        </Callout>

        <Para>
          One consequence worth internalising: since regular dicts preserve insertion order, they can
          now do double duty as an ordered "seen items" tracker or a simple ordered set-like structure
          in situations where you need uniqueness <em>and</em> order — something a plain <code>set</code>{' '}
          (from Module 09) cannot give you, since sets make no ordering promises at all.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Nesting and Merging" />
        <SectionTitle>Nested Dicts, Merging With | and **, and collections.defaultdict</SectionTitle>

        <Para>
          Dict values can be anything, including other dicts — this is how real hierarchical data
          (a user profile with a nested address, a config file with nested sections) gets represented
          in Python. Module 13 goes much deeper into working with nested shapes; here is the basic
          mechanics.
        </Para>

        <CodeBox label="A nested dict">{`user = {
    "name": "Priya Nair",
    "address": {
        "city": "Denver",
        "state": "CO",
        "zip": "80202",
    },
}

print(user["address"]["city"])   # "Denver"`}</CodeBox>

        <SubTitle>Merging dicts — three ways, two of them modern</SubTitle>

        <CodeBox label="The | merge operator (Python 3.9+) — the cleanest modern option">{`defaults = {"timeout": 30, "retries": 3}
overrides = {"retries": 5, "verbose": True}

config = defaults | overrides
print(config)
# {"timeout": 30, "retries": 5, "verbose": True}
# Keys in "overrides" win when both dicts share a key. Neither original dict is modified.`}</CodeBox>

        <CodeBox label="** unpacking — merges inside a fresh literal">{`config = {**defaults, **overrides}
# Identical result to the | operator above — this pattern predates | (added in 3.5)
# and you will still see it constantly in real codebases.`}</CodeBox>

        <CodeBox label=".update() — merges in place, mutating the original">{`defaults.update(overrides)
# defaults is now itself changed to include overrides' keys.
# Use this specifically when mutating in place is what you want;
# use | or ** when you want a new dict and to leave both originals untouched.`}</CodeBox>

        <SubTitle>collections.defaultdict — eliminating "check, then initialise"</SubTitle>

        <Para>
          A recurring pattern: building up a dict where each key maps to a growing list or running
          count, and you constantly need to check "does this key exist yet?" before you can safely
          append or increment. <code>collections.defaultdict</code> removes that check entirely by
          supplying an automatic default for any key that does not yet exist.
        </Para>

        <CodeBox label="Without defaultdict — the setdefault dance">{`orders_by_customer = {}
for customer, order in raw_orders:
    orders_by_customer.setdefault(customer, []).append(order)`}</CodeBox>

        <CodeBox label="With defaultdict — the intent is obvious">{`from collections import defaultdict

orders_by_customer = defaultdict(list)
for customer, order in raw_orders:
    orders_by_customer[customer].append(order)
# Accessing a missing key auto-creates it using the factory (list, here) — no setdefault needed.

word_counts = defaultdict(int)
for word in ["a", "b", "a", "c", "a"]:
    word_counts[word] += 1
print(dict(word_counts))   # {"a": 3, "b": 1, "c": 1}`}</CodeBox>

        <Callout type="tip">
          <code>defaultdict</code> takes a <strong>factory function</strong> — something callable with
          no arguments that produces the default. <code>list</code>, <code>int</code>, <code>set</code>,
          and <code>dict</code> are the most common choices (<code>int()</code> returns <code>0</code>,
          which is why it works for counting). Print a <code>defaultdict</code> and you will see it
          reported as <code>defaultdict(&lt;class &apos;list&apos;&gt;, {`{...}`})</code> — wrap it in{' '}
          <code>dict(...)</code> first if you want plain dict output.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Performance" />
        <SectionTitle>Why Dict Lookups Are O(1) — And When That Actually Matters</SectionTitle>

        <Para>
          Looking a key up in a dict — <code>employee["salary"]</code> — takes roughly the same amount
          of time whether the dict has 5 entries or 5 million. This is described as <strong>O(1)</strong>{' '}
          ("constant time") lookup, and it is the single biggest practical reason to reach for a dict
          instead of a list when what you actually need is "find the thing matching this key."
        </Para>

        <CodeBox label="The difference this makes in practice">{`user_ids = [101, 205, 309, ...]  # a list of 100,000 IDs
if 88214 in user_ids:
    ...
# O(n) — in the worst case, Python checks every single element in order

user_id_set = {101, 205, 309, ...}   # or a dict keyed by ID
if 88214 in user_id_set:
    ...
# O(1) — a single hash computation and slot lookup, regardless of size`}</CodeBox>

        <Para>
          Recall Part 03&apos;s hash-table explanation: a dict does not search — it computes a key&apos;s
          hash, jumps to the corresponding storage slot, and confirms a match. Checking membership in a
          list, by contrast, means walking the list from the start until a match is found or the list
          runs out — the classic <strong>O(n)</strong> ("linear time") pattern, where the cost grows in
          direct proportion to how many items there are.
        </Para>

        <Callout type="warning">
          <strong>This is a genuinely common real-world performance bug.</strong> Code that does{' '}
          <code>if some_id in a_big_list:</code> inside a loop looks completely correct and passes
          testing on small sample data — then becomes painfully slow in production once the list grows
          to tens of thousands of entries, because the check silently became O(n) work repeated inside
          another loop, turning an intended O(n) algorithm into an accidental O(n²) one. If you find
          yourself repeatedly checking "is this value in this collection," and the collection does not
          need to preserve duplicates or a meaningful order, a <code>set</code> or a <code>dict</code>{' '}
          almost always beats a <code>list</code> at any real scale.
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
        <SectionTitle>A Denver Ride-Share Startup&apos;s Slow Endpoint</SectionTitle>

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
            Scenario — Ride-share startup, Denver · Backend performance investigation
          </div>

          <Para>
            An engineer at a Denver ride-share startup owns an endpoint that, for each active driver,
            checks whether that driver has an open support ticket, and attaches a flag to the response
            if so. Support tickets are fetched once per request as a list of ticket dicts from a
            separate service.
          </Para>

          <CodeBox label="The original implementation">{`def annotate_drivers(drivers, tickets):
    for driver in drivers:
        driver["has_open_ticket"] = any(
            t["driver_id"] == driver["id"] and t["status"] == "open"
            for t in tickets
        )
    return drivers`}</CodeBox>

          <Para>
            On the local dev database — a few dozen drivers, a handful of tickets — this endpoint
            responds instantly. In production, with 4,000 active drivers and 1,200 open tickets across
            the metro area, the same endpoint takes over six seconds, well past the mobile app&apos;s
            timeout, and drivers start seeing blank screens during their shift.
          </Para>

          <SubSubTitle>What the profiler shows</SubSubTitle>

          <Para>
            For every one of 4,000 drivers, the code scans the entire tickets list looking for a match
            — exactly the O(n) membership scan from Part 08, repeated inside a loop over drivers. That
            is 4,000 × 1,200 = 4.8 million comparisons for what should be a handful of real lookups.
            The fix follows directly from Part 07&apos;s <code>defaultdict</code> pattern: pre-group the
            tickets by driver ID once, up front, turning every driver&apos;s check into a single O(1)
            dict lookup.
          </Para>

          <CodeBox label="The fix — group once, then look up in O(1)">{`from collections import defaultdict

def annotate_drivers(drivers, tickets):
    open_tickets_by_driver = defaultdict(bool)
    for t in tickets:
        if t["status"] == "open":
            open_tickets_by_driver[t["driver_id"]] = True

    for driver in drivers:
        driver["has_open_ticket"] = open_tickets_by_driver[driver["id"]]

    return drivers`}</CodeBox>

          <Para>
            The endpoint drops from six seconds to under 40 milliseconds. Nothing about the business
            logic changed — the fix is purely about matching the data structure to the access pattern:
            build the lookup dict once (Part 07), then do O(1) lookups (Part 08) instead of repeated
            O(n) scans. This exact shape of bug — a linear scan hidden inside a loop, quietly turning
            into quadratic behaviour — is one of the most common real performance issues in production
            Python, and dictionaries are almost always the fix.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Dictionaries</SectionTitle>

        {[
          {
            wrong: '"Dicts are unordered — you can\'t rely on the order you get back"',
            right: 'This was true before Python 3.7. Since 3.7, insertion order is a language guarantee, not an implementation detail — iterating a dict returns keys in the exact order they were first inserted, every time.',
          },
          {
            wrong: '"employee[\\"salary\\"] and employee.get(\\"salary\\") do the same thing"',
            right: 'They behave identically only when the key exists. When it does not, [] raises a KeyError and crashes the program, while .get() returns None (or a supplied default) gracefully. Which one you want depends entirely on whether a missing key is an expected case or a real bug.',
          },
          {
            wrong: '"Any value can be a dict key, as long as it\'s not a dict itself"',
            right: 'The actual rule is narrower and more specific: a key must be hashable, meaning immutable all the way down. Lists cannot be keys. A tuple can be a key only if every element inside that tuple is also hashable — a tuple containing a list still cannot be used as a key.',
          },
          {
            wrong: '"Checking if a value exists in a big list is basically the same speed as checking a dict or set"',
            right: 'It is not close at scale. List membership checks are O(n) — the time grows with the list\'s size. Dict and set membership checks are O(1) via hashing — the time stays roughly constant regardless of size. This difference is invisible on small test data and can become a severe production bottleneck, exactly as in the Real World example above.',
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
            q: 'Why are dict lookups O(1), and what does that actually mean in practice?',
            a: 'A dict is implemented as a hash table. Looking up a key computes a hash of that key and uses it to jump nearly directly to the storage slot holding the value, instead of scanning entries one by one. That means lookup time stays roughly constant regardless of how many entries the dict holds — 10 entries or 10 million cost about the same. In practice, this makes dicts (and sets) the right structure any time you need fast membership checks or lookups by key, instead of a list, which requires an O(n) linear scan.',
          },
          {
            q: 'What makes a value valid as a dict key?',
            a: 'It must be hashable, which in practice means immutable: strings, numbers, booleans, and tuples (as long as every element inside the tuple is also hashable) all work. Lists, dicts, and sets cannot be used as keys because they are mutable — their contents, and therefore their hash, could change after being stored, which would silently corrupt the hash table.',
          },
          {
            q: 'What is the difference between dict[key] and dict.get(key)?',
            a: 'dict[key] raises a KeyError immediately if the key is missing. dict.get(key) returns None by default, or an explicit second-argument default, without raising anything. Use [] when a missing key represents a genuine bug you want to surface loudly; use .get() when a missing key is an expected, recoverable case.',
          },
          {
            q: 'Is dict order guaranteed in Python? Since when?',
            a: 'Yes — as a language guarantee since Python 3.7, dictionaries preserve insertion order: keys come back in the exact order they were first added. Before 3.7, dict order was unspecified (even though CPython 3.6 happened to preserve it as an implementation detail, it wasn\'t guaranteed by the spec until 3.7).',
          },
          {
            q: 'What does collections.defaultdict solve, and how does it work?',
            a: 'It eliminates the repetitive "check if key exists, initialise if not" pattern when building up grouped or counted data. You construct it with a factory function (like list, int, or set); accessing any key that does not yet exist automatically creates it using that factory\'s default, rather than raising a KeyError. For example, defaultdict(list) lets you call .append() on any key immediately, even the first time that key is touched.',
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
        <SectionTitle>Dictionary Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using [] to access a key that might not exist',
            a: 'This crashes the entire program with a KeyError the moment the key is missing, instead of handling the "not found" case gracefully. Use .get() with a sensible default whenever a key\'s presence is not guaranteed.',
          },
          {
            q: 'Modifying a dict while iterating over it directly',
            a: 'for key in d: ... del d[key] raises a RuntimeError: dictionary changed size during iteration. If you need to remove entries while looping, iterate over a copy of the keys instead: for key in list(d.keys()):.',
          },
          {
            q: 'Assuming .copy() gives you a fully independent copy',
            a: 'It is a shallow copy — nested mutable values (a nested list or dict) are still shared between the original and the copy. Use copy.deepcopy() if the dict contains nested mutable data and you need full independence.',
          },
          {
            q: 'Iterating .items() when you only need keys or only need values',
            a: 'for k, v in d.items(): followed by never touching v works, but says the wrong thing to a reader. If you only need keys, loop over the dict directly (or d.keys()); if you only need values, loop over d.values().',
          },
          {
            q: 'Trying to use a list as a dict key',
            a: 'TypeError: unhashable type: \'list\'. If you need a composite key from multiple values, use a tuple instead — tuples are hashable as long as every element inside them is hashable too.',
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
        <SectionTitle>Errors You Will Hit With Dictionaries — And Exactly Why</SectionTitle>

        {[
          {
            error: `KeyError: 'salary'`,
            cause: 'Accessing a dict with [] using a key that does not exist in it.',
            fix: 'Use .get("salary") (optionally with a default) if a missing key is an expected, recoverable case. Use [] only when a missing key genuinely represents a bug you want to surface immediately.',
          },
          {
            error: `TypeError: unhashable type: 'list'`,
            cause: 'Attempting to use a list — a mutable type — as a dict key, or as an element inside a set.',
            fix: 'Use a tuple instead of a list wherever you need a fixed, hashable sequence as a key: {(1, 2): "value"} works; {[1, 2]: "value"} never can.',
          },
          {
            error: `RuntimeError: dictionary changed size during iteration`,
            cause: 'Adding or removing keys from a dict while a for loop is actively iterating over it.',
            fix: 'Iterate over a snapshot of the keys instead: for key in list(d.keys()):, which lets you freely modify the original dict inside the loop body.',
          },
          {
            error: `TypeError: update() takes at most 1 positional argument`,
            cause: 'Calling .update() with multiple separate positional dicts, e.g. d.update(a, b), which is not valid syntax.',
            fix: 'Merge multiple dicts first with the | operator or ** unpacking (e.g. merged = a | b), then call .update(merged) — or call .update() once per dict.',
          },
          {
            error: `AttributeError: 'dict' object has no attribute 'append'`,
            cause: 'Trying to call a list method directly on a dict — usually the result of a naming mix-up, or forgetting that a defaultdict\'s VALUES have the method, not the defaultdict itself.',
            fix: 'If you meant to append to a list stored inside the dict, access that value first: d[key].append(item). With defaultdict(list), this works even the first time a key is touched.',
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
        'A dict stores key/value pairs. Keys must be hashable — immutable all the way down — which is why lists can never be keys but tuples of hashable values can.',
        'Use .get(key, default) when a missing key is expected and recoverable; use [] only when a missing key should crash loudly as a real bug.',
        'The idiomatic iteration pattern is "for k, v in d.items():" — it avoids a redundant second lookup compared to indexing inside the loop.',
        'Since Python 3.7, dicts guarantee insertion order as part of the language spec, not just as an implementation detail.',
        'Merge dicts with | (Python 3.9+) or ** unpacking for a new merged dict; use .update() when mutating an existing dict in place is what you want.',
        'collections.defaultdict eliminates manual "check, then initialise" logic — accessing a missing key auto-creates it using a factory function like list or int.',
        'Dict (and set) lookups are O(1) via hashing; list membership checks are O(n). Repeated "in a_list" checks inside a loop are a classic source of accidental O(n²) production slowdowns.',
        '.copy() is a shallow copy — nested mutable values are still shared with the original. Use copy.deepcopy() for full independence.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 12 takes the loops that build lists and dicts one entry at a time and shows you the
          compact, Pythonic way to write the same logic — comprehensions — including exactly when they
          make code clearer and when they make it worse.
        </p>
        <Link href="/learn/python/comprehensions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 12 → List, Dict and Set Comprehensions
        </Link>
      </div>
    </LearnLayout>
  )
}
