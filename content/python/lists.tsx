import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Lists — Creation, Indexing, Methods — Python | Chaduvuko',
  description:
    'The workhorse data structure of Python. Creating and slicing lists, every common list method, mutability in depth, the shallow-copy trap, and nested lists.',
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

export default function Lists() {
  return (
    <LearnLayout
      title="Lists — Creation, Indexing, Methods"
      description="The workhorse data structure of Python — creating and slicing lists, every common method, mutability in depth, the shallow-copy trap, and nested lists."
      section="Python — Module 08"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Creating and Indexing Lists" />
        <SectionTitle>Lists — An Ordered, Mutable Collection of Anything</SectionTitle>

        <Para>
          A list is Python&apos;s general-purpose ordered collection — it can hold any number of items,
          in any type, including a mix of types in the same list, and it remembers the order items were
          added in. You have already seen lists used casually in earlier modules; this module is where
          you learn every operation you will actually use on them, in depth.
        </Para>

        <CodeBox label="Creating lists">{`empty = []
numbers = [1, 2, 3, 4, 5]
names = ["Maria", "Jordan", "Priya"]
mixed = [1, "two", 3.0, True, None]     # a list can freely mix types

# list() can also build a list from any iterable
letters = list("Python")                  # ['P', 'y', 't', 'h', 'o', 'n']
evens = list(range(0, 10, 2))              # [0, 2, 4, 6, 8]`}</CodeBox>

        <SubTitle>Indexing — accessing a single item by position</SubTitle>

        <Para>
          List indexing works exactly like the string indexing you learned in the Strings module —
          zero-based, with negative indices counting from the end. This is not a coincidence: strings
          and lists are both examples of Python&apos;s <strong>sequence</strong> types, and sequences
          share a common indexing and slicing interface.
        </Para>

        <CodeBox label="Indexing a list">{`fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])     # apple    — first item
print(fruits[-1])     # date      — last item
print(fruits[2])       # cherry    — third item

fruits[1] = "blueberry"   # lists are mutable — items can be reassigned by index
print(fruits)              # ['apple', 'blueberry', 'cherry', 'date']`}</CodeBox>

        <Callout type="warning">
          <strong>The key difference from strings is right there in that last line.</strong> Strings are
          immutable — <code>my_string[0] = &quot;X&quot;</code> raises a <code>TypeError</code>. Lists are
          mutable — <code>fruits[1] = &quot;blueberry&quot;</code> works, changing the list in place. This
          single difference explains almost everything that feels different about working with lists
          versus strings, and it is the subject of Part 04 below.
        </Callout>

        <SubTitle>Slicing — extracting a sub-list</SubTitle>

        <CodeBox label="Slicing a list — [start:stop:step], stop is always excluded">{`numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])      # [2, 3, 4]         — indices 2, 3, 4 (5 excluded)
print(numbers[:3])         # [0, 1, 2]          — from the start up to (not including) 3
print(numbers[7:])          # [7, 8, 9]           — from 7 to the end
print(numbers[::2])           # [0, 2, 4, 6, 8]      — every second item
print(numbers[::-1])            # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  — the whole list, reversed

# Unlike indexing a single out-of-range item, slicing never raises an error
print(numbers[5:100])   # [5, 6, 7, 8, 9]    — just stops at the real end, no IndexError`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Adding and Removing Items" />
        <SectionTitle>append, insert, extend, remove, pop, and clear</SectionTitle>

        <Para>
          Because lists are mutable, they come with a rich set of methods for changing their contents
          in place — adding items, removing them, and rearranging them, without creating a brand new
          list each time.
        </Para>

        <CodeBox label="Adding items">{`fruits = ["apple", "banana"]

fruits.append("cherry")          # adds ONE item to the end
print(fruits)                     # ['apple', 'banana', 'cherry']

fruits.insert(1, "apricot")        # inserts at a specific index, shifting the rest right
print(fruits)                       # ['apple', 'apricot', 'banana', 'cherry']

fruits.extend(["date", "fig"])        # adds MULTIPLE items, one at a time, from another iterable
print(fruits)                          # ['apple', 'apricot', 'banana', 'cherry', 'date', 'fig']`}</CodeBox>

        <Callout type="warning">
          <strong>append() vs extend() is a genuinely common source of bugs.</strong>{' '}
          <code>fruits.append([&quot;date&quot;, &quot;fig&quot;])</code> does not add two items — it
          adds <em>one</em> item, which is itself a list, producing{' '}
          <code>[..., [&apos;date&apos;, &apos;fig&apos;]]</code>, a nested list where you probably
          wanted a flat one. Use <code>append()</code> to add exactly one item; use <code>extend()</code>{' '}
          when the argument is itself a collection whose items should be added individually.
        </Callout>

        <CodeBox label="Removing items">{`fruits = ["apple", "banana", "cherry", "banana"]

fruits.remove("banana")     # removes the FIRST matching value — not by index
print(fruits)                 # ['apple', 'cherry', 'banana']

last = fruits.pop()             # removes AND RETURNS the last item by default
print(last)                      # banana
print(fruits)                     # ['apple', 'cherry']

first = fruits.pop(0)               # pop() also accepts an explicit index
print(first)                          # apple

fruits.clear()                          # removes everything
print(fruits)                            # []`}</CodeBox>

        <Callout type="tip">
          <strong>remove() vs pop() vs del — pick the right tool.</strong>{' '}
          <code>remove(value)</code> deletes by value and raises a <code>ValueError</code> if the value
          is not present. <code>pop(index)</code> deletes by position and hands the removed item back —
          useful when you need to do something with the item you just removed, like implementing a
          stack. Python&apos;s <code>del</code> statement (<code>del fruits[0]</code>) also deletes by
          index but, unlike <code>pop()</code>, does not return the removed value.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Sorting, Searching, and Counting" />
        <SectionTitle>sort() vs sorted(), reverse(), index(), and count()</SectionTitle>

        <Para>
          Sorting is where the biggest, most consequential-to-get-wrong distinction in this entire module
          lives: <code>.sort()</code> and <code>sorted()</code> look similar and do related things, but
          behave completely differently, and mixing them up causes real bugs.
        </Para>

        <CodeBox label="sort() — sorts the list IN PLACE, returns None">{`numbers = [4, 1, 3, 2]
result = numbers.sort()

print(numbers)   # [1, 2, 3, 4]  — the ORIGINAL list was changed
print(result)      # None          — .sort() does NOT return the sorted list!`}</CodeBox>

        <CodeBox label="sorted() — returns a NEW sorted list, leaves the original untouched">{`numbers = [4, 1, 3, 2]
result = sorted(numbers)

print(numbers)   # [4, 1, 3, 2]  — UNCHANGED
print(result)      # [1, 2, 3, 4]  — a brand new, separate list`}</CodeBox>

        <Callout type="warning">
          <strong>The single most common sorting bug: writing <code>numbers = numbers.sort()</code>.</strong>{' '}
          This looks reasonable — "sort the list and store the result" — but since <code>.sort()</code>{' '}
          returns <code>None</code>, this line silently replaces <code>numbers</code> with{' '}
          <code>None</code>, destroying the data entirely. Rule to memorise: use <code>.sort()</code>{' '}
          as its own statement when you want to sort in place; use{' '}
          <code>sorted(list_name)</code> as an expression when you need a new sorted list without
          disturbing the original.
        </Callout>

        <CodeBox label="Both accept key= and reverse= for custom sorting">{`words = ["banana", "kiwi", "apple", "fig"]

sorted(words, key=len)                    # ['kiwi', 'fig', 'apple', 'banana'] — sorted by length
sorted(words, reverse=True)                 # ['kiwi', 'fig', 'banana', 'apple'] — Z to A
sorted(words, key=len, reverse=True)          # combined — longest first`}</CodeBox>

        <CodeBox label="reverse(), index(), and count()">{`numbers = [3, 1, 4, 1, 5, 9, 2, 6]

numbers.reverse()          # reverses the list IN PLACE (not alphabetical/numeric — just order)
print(numbers)                # [6, 2, 9, 5, 1, 4, 1, 3]

print(numbers.index(4))         # 4     — the INDEX of the first "4" found
print(numbers.count(1))           # 2      — how many times "1" appears in the list

# index() raises ValueError if the value isn't present at all — check with "in" first if unsure
if 100 in numbers:
    print(numbers.index(100))
else:
    print("100 is not in the list")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Mutability In Depth" />
        <SectionTitle>Mutability — The Payoff of Understanding It Properly Now</SectionTitle>

        <Para>
          The Variables &amp; Data Types module introduced mutability as an abstract distinction between
          types. Lists are where that distinction stops being abstract and starts being something you
          need to actively manage, every single day you write Python.
        </Para>

        <CodeBox label="The behaviour that catches everyone once">{`original = [1, 2, 3]
reference = original       # NOT a copy — "reference" points at the SAME list object

reference.append(4)
print(original)               # [1, 2, 3, 4]  — changed too!
print(reference)                # [1, 2, 3, 4]
print(original is reference)      # True — literally the same object in memory`}</CodeBox>

        <Para>
          This is not a special quirk of lists specifically — it is exactly the same name-binding
          behaviour from the Variables module, just now with consequences that are easy to trip over in
          real code. <code>reference = original</code> never copies anything. It creates a second name
          pointing at the exact same list object. Any mutation performed through either name is visible
          through both, because there is, underneath, only ever one list.
        </Para>

        <SubTitle>Where this bites in real functions</SubTitle>

        <Para>
          This becomes especially easy to miss when a list is passed into a function. Python passes
          objects by reference — a function that mutates a list parameter is mutating the caller&apos;s
          original list, not a private copy, because no copy was ever made.
        </Para>

        <CodeBox label="A function silently mutating its caller's list">{`def add_bonus_item(cart):
    cart.append("free_sample")     # mutates the list the CALLER passed in
    return cart

my_cart = ["shirt", "pants"]
result = add_bonus_item(my_cart)

print(my_cart)   # ['shirt', 'pants', 'free_sample']  — the original changed too, even
                    # though we only assigned the function's return value to "result"
print(result)         # ['shirt', 'pants', 'free_sample']
print(my_cart is result)   # True — same list, two names`}</CodeBox>

        <Callout type="tip">
          This is precisely the mechanism behind the mutable-default-argument trap from the Functions
          module — a default list is shared across calls for the same underlying reason a list passed as
          a normal argument is shared with its caller: no copy is made unless you explicitly ask for one.
          Part 05 below covers exactly how to ask for one.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Shallow Copy Trap" />
        <SectionTitle>list1 = list2 vs .copy() vs [:] — Three Very Different Things</SectionTitle>

        <Para>
          Given how much damage sharing a list by accident can do, it is worth being completely precise
          about the three ways you will see a "copy" written in real code — only two of them actually
          copy anything.
        </Para>

        <CodeBox label="Three approaches, only two of which actually copy">{`original = [1, 2, 3]

alias = original            # NOT a copy — same object, two names
copy1 = original.copy()       # a REAL copy — a new list with the same items
copy2 = original[:]             # ALSO a real copy — slicing the whole list

original.append(99)

print(original)   # [1, 2, 3, 99]
print(alias)          # [1, 2, 3, 99]   — changed, because it's the SAME object
print(copy1)             # [1, 2, 3]         — unaffected, genuinely independent
print(copy2)                # [1, 2, 3]         — also unaffected`}</CodeBox>

        <Para>
          <code>.copy()</code> and the full-list slice <code>[:]</code> both produce a genuinely new,
          independent list object. Either is fine and idiomatic — <code>.copy()</code> is generally
          considered slightly more readable since it says what it does directly, while{' '}
          <code>[:]</code> is older and still extremely common in real code you will read.
        </Para>

        <Callout type="warning">
          <strong>Both .copy() and [:] are &quot;shallow&quot; copies — this matters the moment the list
          contains other mutable objects.</strong> A shallow copy duplicates the outer list itself, but
          the items <em>inside</em> it are not duplicated — if an item is itself a mutable object (like
          a nested list), both the original and the copy end up holding a reference to that{' '}
          <em>same inner object</em>. Part 06 below covers exactly this problem, and its real fix.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Nested Lists and Deep Copying" />
        <SectionTitle>Nested Lists — Why a Shallow Copy Isn&apos;t Always Enough</SectionTitle>

        <Para>
          A list can contain other lists as items — commonly used to represent a grid, a matrix, or
          rows of tabular data. This is where the shallow-copy limitation from Part 05 becomes a real,
          visible bug rather than a theoretical footnote.
        </Para>

        <CodeBox label="A shallow copy does not protect nested lists">{`matrix = [[1, 2], [3, 4]]
shallow = matrix.copy()          # a real copy of the OUTER list...

shallow[0].append(99)              # ...but the INNER lists are still shared!

print(matrix)     # [[1, 2, 99], [3, 4]]   — changed, even though we only touched "shallow"!
print(shallow)       # [[1, 2, 99], [3, 4]]

print(matrix is shallow)                # False — the outer lists are genuinely different objects
print(matrix[0] is shallow[0])            # True  — but the INNER lists are still the same object`}</CodeBox>

        <Para>
          <code>.copy()</code> duplicated the outer list — a new list object was created to hold the
          references — but it copied those references, not the objects they point to. Both{' '}
          <code>matrix[0]</code> and <code>shallow[0]</code> point at the exact same inner list, so
          mutating one through either name is visible through both, for exactly the same reason two
          names pointing at the same list share mutations in Part 04.
        </Para>

        <CodeBox label="The real fix — copy.deepcopy()">{`import copy

matrix = [[1, 2], [3, 4]]
deep = copy.deepcopy(matrix)     # recursively copies EVERY nested object, not just the outer list

deep[0].append(99)

print(matrix)   # [[1, 2], [3, 4]]        — genuinely unaffected
print(deep)        # [[1, 2, 99], [3, 4]]     — only the deep copy changed`}</CodeBox>

        <Callout type="tip">
          Use <code>.copy()</code> or <code>[:]</code> whenever a list&apos;s items are all immutable
          (numbers, strings, tuples) — there is nothing a shallow copy can miss in that case, since
          there is nothing nested to share. Reach for <code>copy.deepcopy()</code> specifically when a
          list contains other mutable objects (lists, dicts) that also need to be genuinely independent
          after copying. You will meet this exact problem again, in a slightly different shape, once you
          reach the Nested Data Structures module (Module 13).
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Equality vs Identity" />
        <SectionTitle>== vs is for Lists — Equal Contents Are Not the Same Object</SectionTitle>

        <Para>
          This closes the loop on everything above with the same <code>==</code> vs <code>is</code>{' '}
          distinction from the Variables module, now made completely concrete with lists.
        </Para>

        <CodeBox label="Equal value, different objects">{`list_a = [1, 2, 3]
list_b = [1, 2, 3]
list_c = list_a

print(list_a == list_b)    # True  — equal CONTENTS, compared item by item
print(list_a is list_b)      # False — two separate objects that happen to hold equal values

print(list_a == list_c)         # True  — also equal contents
print(list_a is list_c)           # True  — AND the same object, since list_c = list_a shares it`}</CodeBox>

        <Para>
          <code>==</code> on two lists compares their contents, element by element — it answers "do
          these look the same?" <code>is</code> compares identity — it answers "are these literally the
          same object in memory?" Two independently created lists with identical contents will always be{' '}
          <code>==</code> but never <code>is</code>. The practical rule is unchanged from the Variables
          module: use <code>==</code> for essentially all comparisons; reserve <code>is</code> for
          checking against <code>None</code> or for deliberately confirming two names refer to one
          shared object — exactly the check used throughout this module to explain the copying
          behaviour above.
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
        <SectionTitle>A Minneapolis Grocery-Delivery App Overwrites Every Driver&apos;s Route With One Driver&apos;s Route</SectionTitle>

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
            Scenario — Grocery delivery startup, Minneapolis · Same-day production incident
          </div>

          <Para>
            A Minneapolis grocery-delivery startup assigns each driver a base route template — a list
            of standard stops for their zone — which the dispatch system then customises per driver by
            appending that day&apos;s specific delivery stops. One morning, every driver on the app opens
            their route and sees the exact same twenty-two stops, none of which match their own zone.
            Dispatch is flooded with confused calls within minutes of the shift starting.
          </Para>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            The dispatch code builds each driver&apos;s route by starting from a shared{' '}
            <code>base_route</code> template and appending stops directly onto it — exactly the Part 04
            problem, list assignment creating a shared reference rather than an independent copy.
          </Para>

          <CodeBox label="The dispatch code responsible">{`base_route = ["Warehouse A", "Warehouse B"]   # shared starting template

def build_driver_route(driver, todays_stops):
    route = base_route             # NOT a copy — "route" points at the shared base_route
    route.extend(todays_stops)       # mutates base_route itself, for EVERY driver
    driver.route = route
    return route

for driver in get_active_drivers():
    build_driver_route(driver, get_stops_for(driver))`}</CodeBox>

          <Para>
            Every call to <code>build_driver_route</code> appends that driver&apos;s stops onto the same
            shared <code>base_route</code> list, since <code>route = base_route</code> never copied
            anything. By the time the last driver&apos;s route was built, <code>base_route</code>{' '}
            contained every single stop from every driver processed so far — and because every driver
            object&apos;s <code>.route</code> attribute pointed at that same growing list, all of them
            ended up looking identical, and identical to whichever driver was processed last.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="The fix — an explicit copy per driver">{`base_route = ["Warehouse A", "Warehouse B"]

def build_driver_route(driver, todays_stops):
    route = base_route.copy()       # a genuinely independent list per driver
    route.extend(todays_stops)
    driver.route = route
    return route`}</CodeBox>

          <Para>
            One added method call — <code>.copy()</code> — fixes the entire incident. The lesson the
            team takes away, and the one worth internalising from this module generally: any time a
            "starting point" list is going to be built on by multiple independent callers, ask explicitly
            whether each caller needs its own copy, because Python will never make one for you silently.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Lists</SectionTitle>

        {[
          {
            wrong: '"new_list = old_list creates a copy of old_list"',
            right: 'It creates a second name pointing at the exact same list object — no copying happens at all. Mutating either name affects both. A real, independent copy requires .copy(), the full slice [:], or copy.deepcopy() for nested structures.',
          },
          {
            wrong: '"numbers.sort() returns the sorted list, so numbers = numbers.sort() is a safe way to write it"',
            right: '.sort() sorts in place and returns None. Writing numbers = numbers.sort() silently replaces the entire list with None, destroying the data. Either call numbers.sort() as its own statement, or use sorted(numbers) if you need the sorted result as a new value.',
          },
          {
            wrong: '"append() and extend() do basically the same thing"',
            right: 'append(x) adds exactly one item, even if x is itself a list — producing a nested list. extend(x) adds each item of x individually, keeping the result flat. Using append() when you meant extend() is one of the most common list bugs.',
          },
          {
            wrong: '"A .copy() of a list is always completely independent from the original"',
            right: 'Only for lists whose items are immutable. .copy() is a SHALLOW copy — if the list contains other mutable objects like nested lists, those inner objects are still shared between the original and the copy. Genuinely independent nested structures require copy.deepcopy().',
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
            q: 'What is the difference between .sort() and sorted()?',
            a: '.sort() is a list method that sorts the list in place and returns None. sorted() is a built-in function that returns a brand new sorted list, leaving the original untouched. A common bug is writing numbers = numbers.sort(), which silently replaces the list with None since .sort() does not return the sorted list.',
          },
          {
            q: 'What is the difference between .append() and .extend()?',
            a: '.append(x) adds x as a single item to the end of the list, even if x is itself a list — this produces a nested list. .extend(x) iterates over x and adds each of its items individually, keeping the result flat. Use append() to add one item; use extend() to add the contents of another iterable.',
          },
          {
            q: 'Explain what happens when you write list2 = list1, and how to make list2 an actual independent copy.',
            a: 'list2 = list1 does not copy anything — it creates a second name pointing at the exact same list object, so mutating either name affects both. To create a genuinely independent list, use list1.copy() or the full slice list1[:]. Both are shallow copies, meaning nested mutable objects (like inner lists) are still shared; for a fully independent nested structure, use copy.deepcopy().',
          },
          {
            q: 'What is a shallow copy, and when does it fail to fully protect a list from mutation?',
            a: 'A shallow copy duplicates the outer list itself, creating a new list object, but does not duplicate the objects the list\'s items refer to — it copies references, not the underlying objects. If a list contains other mutable objects, like nested lists, both the original and the shallow copy hold references to the same inner objects, so mutating a nested item through one is visible through the other. copy.deepcopy() recursively copies every nested object to avoid this.',
          },
          {
            q: 'What is the difference between remove(), pop(), and del for a list?',
            a: 'remove(value) deletes the first item that matches a given VALUE and raises ValueError if the value is not present. pop(index) deletes an item by POSITION (defaulting to the last item) and returns the removed value, which is useful for stack-like usage. del list_name[index] also deletes by position but does not return anything.',
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
        <SectionTitle>List Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Writing my_list = my_list.sort() expecting the sorted list back',
            a: '.sort() returns None. The line above silently destroys the list. Call .sort() on its own line, or use sorted(my_list) to get a new sorted list as a value.',
          },
          {
            q: 'Assuming a = b copies a list',
            a: 'It shares the same object. Use b = a.copy() (or a[:]) whenever an independent list is actually needed — and copy.deepcopy() if the list contains nested mutable objects.',
          },
          {
            q: 'Modifying a list while looping over it directly',
            a: 'Removing or inserting items into a list while a for loop is iterating over that same list causes items to be skipped or visited twice, because the loop tracks a position that shifts as the list\'s length changes underneath it. Loop over a copy (for x in my_list[:]:) or build a new list instead.',
          },
          {
            q: 'Using append() when extend() was needed',
            a: 'cart.append(new_items) where new_items is itself a list adds ONE nested list item, not several. Use cart.extend(new_items) to add each item individually.',
          },
          {
            q: 'Forgetting that list indexing out of range raises IndexError, while slicing does not',
            a: 'my_list[100] on a 5-item list raises IndexError immediately. my_list[100:200] on the same list simply returns an empty list — no error at all. This difference is easy to forget when refactoring code from indexing to slicing or back.',
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
        <SectionTitle>Errors You Will Hit With Lists — And Exactly Why</SectionTitle>

        {[
          {
            error: `IndexError: list index out of range`,
            cause: 'Accessing an index that does not exist in the list — either a typo in the index, an off-by-one mistake, or code that assumed the list had more items than it actually does.',
            fix: 'Check len(my_list) before indexing if you are not certain of its size, or use a slice instead of a single index if being out of range should return an empty result rather than raising an error.',
          },
          {
            error: `ValueError: list.remove(x): x not in list`,
            cause: 'Calling .remove() with a value that does not exist anywhere in the list.',
            fix: 'Check membership first with "if value in my_list:" before calling remove(), or wrap the call in a try/except once you reach the Exception Handling module.',
          },
          {
            error: `AttributeError: 'NoneType' object has no attribute 'append' (after my_list = my_list.sort())`,
            cause: '.sort() returns None, and the code above reassigned my_list to that None, so any further list method calls on my_list fail because None has no list methods.',
            fix: 'Remove the reassignment — call my_list.sort() as its own statement — or switch to sorted(my_list) if a new list was actually intended.',
          },
          {
            error: `TypeError: 'list' object is not callable`,
            cause: 'Using parentheses instead of square brackets when indexing — my_list(0) instead of my_list[0] — often a typo carried over from calling a function.',
            fix: 'Use square brackets for indexing and slicing a list. Parentheses are for calling functions, not accessing list items.',
          },
          {
            error: `TypeError: '<' not supported between instances of 'str' and 'int'`,
            cause: 'Calling .sort() or sorted() on a list containing mixed, non-comparable types — Python cannot decide an ordering between a string and an integer.',
            fix: 'Ensure the list contains only mutually comparable values before sorting, or provide a key= function that converts every item to a common, comparable type.',
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
        'Lists are ordered, mutable, and can hold any mix of types. Indexing and slicing work like strings — zero-based, with negative indices from the end — but items can be reassigned in place.',
        'append() adds exactly one item (even a whole list, nested); extend() adds each item of another iterable individually, keeping the result flat.',
        'sort() sorts in place and returns None; sorted() returns a new sorted list, leaving the original untouched. Never write my_list = my_list.sort().',
        'new_name = old_list never copies — both names point at the same object. Real copies require .copy(), the full slice [:], or copy.deepcopy() for nested structures.',
        '.copy() and [:] are shallow copies — nested mutable objects (like inner lists) are still shared between the original and the copy. Use copy.deepcopy() when full independence is required.',
        '== compares list contents element by element; is checks whether two names refer to the literal same object in memory.',
        'Mutating a list inside a function mutates the caller\'s original list too, since no copy is made when the list is passed in — the same mechanism behind the mutable-default-argument trap.',
        'remove() deletes by value; pop() deletes by index and returns the removed item; del deletes by index without returning anything.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 09 covers tuples and sets — immutable sequences, unpacking, hashability, and the set
          operations that make membership checks dramatically faster than scanning a list.
        </p>
        <Link href="/learn/python/tuples-sets" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 09 → Tuples and Sets
        </Link>
      </div>
    </LearnLayout>
  )
}
