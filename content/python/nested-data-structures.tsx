import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Nested Data Structures — Python | Chaduvuko',
  description:
    'Lists of dicts, dicts of lists, and the real-world JSON-shaped data you will actually work with — safe access patterns, flattening, sorting, and aggregation.',
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

export default function NestedDataStructures() {
  return (
    <LearnLayout
      title="Nested Data Structures"
      description="Lists of dicts, dicts of lists, and the real-world JSON-shaped data you will actually work with — safe access, flattening, sorting, and aggregation."
      section="Python — Module 13"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why This Module Exists" />
        <SectionTitle>Real Data Is Never Flat</SectionTitle>

        <Para>
          Every module so far in Phase 2 has treated lists and dicts mostly in isolation — a list of
          numbers, a dict of a single employee&apos;s fields. Real data almost never looks like that.
          Open the response from any REST API, read a JSON config file, or inspect a database query
          result loaded into Python, and you will find lists containing dicts, dicts containing lists,
          and several levels of that nested inside each other. This module does not introduce any new
          syntax — it is entirely about combining what Module 11 (dicts) and Module 12
          (comprehensions) already taught you to work confidently with the shapes data actually
          arrives in.
        </Para>

        <CodeBox label="A shape you will see constantly — a list of dicts">{`employees = [
    {"name": "Priya Nair", "department": "Engineering", "salary": 118000},
    {"name": "Wei Zhang", "department": "Engineering", "salary": 121000},
    {"name": "Alex Torres", "department": "Sales", "salary": 95000},
]

# This is exactly what a database query, or a JSON API response, typically looks like`}</CodeBox>

        <CodeBox label="The inverse shape — a dict of lists">{`employees_by_department = {
    "Engineering": ["Priya Nair", "Wei Zhang"],
    "Sales": ["Alex Torres"],
}

# The exact output shape you'd get from grouping the list above by department —
# using the defaultdict pattern from Module 11`}</CodeBox>

        <Para>
          These two shapes — a list of dicts, and a dict of lists — cover the overwhelming majority of
          real-world structured data you will handle in Python. Learning to move confidently between
          them, and to safely reach into them several levels deep, is one of the most immediately
          useful practical skills in this entire track.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Safe Access Patterns" />
        <SectionTitle>The KeyError / IndexError Risk of Naive Chained Access</SectionTitle>

        <Para>
          The moment you nest a few levels deep, a single naive chain of <code>[]</code> lookups
          becomes fragile — any missing key or short list anywhere along the chain raises an exception
          and crashes the whole operation, even if the rest of the structure is perfectly fine.
        </Para>

        <CodeBox label="Naive chained access — one missing field breaks everything">{`user = {
    "name": "Maria Gomez",
    "address": {
        "city": "Portland",
        "state": "OR",
    },
}

print(user["address"]["zip"])
# KeyError: 'zip' — this key was simply never provided for this user`}</CodeBox>

        <Para>
          Recall <code>.get()</code> from Module 11 — the same tool applies here, chained the same way
          the brackets were chained, just swapping <code>[]</code> for <code>.get()</code> at each
          level that might be missing.
        </Para>

        <CodeBox label="Safe chained access with .get()">{`zip_code = user.get("address", {}).get("zip", "unknown")
print(zip_code)   # "unknown" — no crash

# Read this right to left in terms of what it protects against:
# .get("zip", "unknown")     -> if "zip" is missing, use "unknown"
# .get("address", {})        -> if "address" itself is missing, fall back to an empty dict,
#                                so the next .get() has something safe to call itself on`}</CodeBox>

        <Callout type="warning">
          <strong>The fallback default at each intermediate step must itself support the next
          call.</strong> <code>.get(&quot;address&quot;, {})</code> defaults to an empty dict — not{' '}
          <code>None</code> — specifically because the next <code>.get()</code> in the chain needs
          something dict-like to call. <code>user.get(&quot;address&quot;).get(&quot;zip&quot;)</code>{' '}
          without that intermediate default still crashes with{' '}
          <code>AttributeError: &apos;NoneType&apos; object has no attribute &apos;get&apos;</code>{' '}
          the moment <code>&quot;address&quot;</code> is missing, since <code>.get()</code> on a
          missing key returns <code>None</code> by default, and <code>None</code> has no{' '}
          <code>.get()</code> method of its own.
        </Callout>

        <SubTitle>Indexing into nested lists carries the same risk</SubTitle>

        <Para>
          The list equivalent of a missing dict key is a list that is shorter than expected — indexing
          past its end raises <code>IndexError</code> rather than returning a default, since lists have
          no built-in <code>.get()</code>-style method.
        </Para>

        <CodeBox label="Guarding list access manually">{`order = {"items": [{"sku": "A1"}, {"sku": "B2"}]}

# Naive — crashes if "items" has fewer than 3 entries
third_item = order["items"][2]   # IndexError

# Guarded
items = order.get("items", [])
third_item = items[2] if len(items) > 2 else None`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — A Realistic Worked Example" />
        <SectionTitle>Modeling US E-Commerce Orders — Nested Customer Info and Line Items</SectionTitle>

        <Para>
          This is the shape of data you will meet constantly in real work — a list of orders, each with
          nested customer details and a nested list of line items. Every technique in this module gets
          exercised against this one structure, so it is worth reading closely.
        </Para>

        <CodeBox label="The dataset — a list of orders, each order nested several levels deep">{`orders = [
    {
        "order_id": "ORD-1001",
        "customer": {"name": "Maria Gomez", "city": "Portland", "state": "OR"},
        "items": [
            {"sku": "MUG-01", "qty": 2, "price": 12.00},
            {"sku": "SHIRT-04", "qty": 1, "price": 28.00},
        ],
    },
    {
        "order_id": "ORD-1002",
        "customer": {"name": "James Reilly", "city": "Boston", "state": "MA"},
        "items": [
            {"sku": "MUG-01", "qty": 1, "price": 12.00},
        ],
    },
    {
        "order_id": "ORD-1003",
        "customer": {"name": "Maria Gomez", "city": "Portland", "state": "OR"},
        "items": [
            {"sku": "HAT-02", "qty": 3, "price": 18.00},
            {"sku": "MUG-01", "qty": 1, "price": 12.00},
        ],
    },
]`}</CodeBox>

        <Para>
          Every order has exactly the shape you would get back from a real order-management API:
          top-level fields, a nested <code>customer</code> dict, and a nested <code>items</code> list
          of dicts. Nothing about this is contrived — this is genuinely what e-commerce, billing, and
          logistics data looks like in production.
        </Para>

        <CodeBox label="Computing each order's total — combining a comprehension with a nested field">{`for order in orders:
    total = sum(item["qty"] * item["price"] for item in order["items"])
    print(f"{order['order_id']}: \${total:.2f}")

# ORD-1001: $52.00
# ORD-1002: $12.00
# ORD-1003: $66.00`}</CodeBox>

        <Para>
          This line does real work in a single expression: <code>sum(...)</code> consumes a generator
          expression (Module 12, Part 08) that reaches into each item&apos;s nested{' '}
          <code>qty</code> and <code>price</code> fields, multiplies them, and totals the result — no
          intermediate list ever gets built, since the total is the only thing needed.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Sorting Lists of Dicts" />
        <SectionTitle>sorted() with key= and operator.itemgetter</SectionTitle>

        <Para>
          Sorting a plain list of numbers or strings just works — <code>sorted(numbers)</code>. Sorting
          a list of dicts requires telling Python <em>which field</em> to sort by, since there is no
          single obvious ordering for a dict. The <code>key=</code> argument takes a function that,
          given one element, returns the value to sort by.
        </Para>

        <CodeBox label="Sorting orders by total value, using a lambda as the key">{`def order_total(order):
    return sum(item["qty"] * item["price"] for item in order["items"])

orders_by_total = sorted(orders, key=order_total, reverse=True)

for o in orders_by_total:
    print(o["order_id"], order_total(o))
# ORD-1003 66.0
# ORD-1001 52.0
# ORD-1002 12.0`}</CodeBox>

        <Para>
          For the common, simpler case of sorting by a single existing dict key rather than a computed
          value, <code>operator.itemgetter</code> is the idiomatic, slightly faster alternative to a
          lambda — it exists specifically for this purpose and is worth knowing, since you will see it
          in real codebases and interview answers.
        </Para>

        <CodeBox label="operator.itemgetter — the idiomatic shortcut for sorting by a dict key">{`from operator import itemgetter

customers_flat = [o["customer"] for o in orders]
by_city = sorted(customers_flat, key=itemgetter("city"))

for c in by_city:
    print(c["city"], c["name"])
# Boston James Reilly
# Portland Maria Gomez
# Portland Maria Gomez

# Equivalent lambda, for comparison:
by_city = sorted(customers_flat, key=lambda c: c["city"])`}</CodeBox>

        <Callout type="tip">
          <code>itemgetter</code> can also take multiple field names for a multi-level sort:{' '}
          <code>itemgetter(&quot;state&quot;, &quot;city&quot;)</code> sorts by state first, then by
          city within each state — exactly like an ORDER BY with multiple columns in SQL. This is the
          version worth reaching for once a sort needs more than one key.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Aggregating Over Nested Structures" />
        <SectionTitle>Sums, Counts, and Grouping — Combining Module 11 and Module 12</SectionTitle>

        <Para>
          Aggregation — computing totals, counts, or groups from a list of nested records — is the
          single most common thing you will actually do with data shaped like the orders list above.
          It combines exactly two tools you already have: <code>defaultdict</code> from Module 11 to
          group, and a comprehension or generator expression from Module 12 to compute.
        </Para>

        <CodeBox label="Grouping order totals by customer">{`from collections import defaultdict

totals_by_customer = defaultdict(float)

for order in orders:
    name = order["customer"]["name"]
    order_total = sum(item["qty"] * item["price"] for item in order["items"])
    totals_by_customer[name] += order_total

print(dict(totals_by_customer))
# {"Maria Gomez": 118.0, "James Reilly": 12.0}
# Maria Gomez's two orders (ORD-1001 and ORD-1003) were automatically combined`}</CodeBox>

        <CodeBox label="Counting how many units of each SKU were sold, across every order">{`unit_counts = defaultdict(int)

for order in orders:
    for item in order["items"]:
        unit_counts[item["sku"]] += item["qty"]

print(dict(unit_counts))
# {"MUG-01": 4, "SHIRT-04": 1, "HAT-02": 3}`}</CodeBox>

        <CodeBox label="Grouping full order objects by state — the dict-of-lists shape from Part 01">{`orders_by_state = defaultdict(list)

for order in orders:
    state = order["customer"]["state"]
    orders_by_state[state].append(order["order_id"])

print(dict(orders_by_state))
# {"OR": ["ORD-1001", "ORD-1003"], "MA": ["ORD-1002"]}`}</CodeBox>

        <Para>
          Notice the pattern repeating across all three examples: pick the right <code>defaultdict</code>{' '}
          factory for what you are accumulating (<code>float</code> for a running total,{' '}
          <code>int</code> for a count, <code>list</code> for a group of items), loop once over the
          nested structure, and update the accumulator. This single pattern covers the vast majority of
          real reporting and analytics code you will write with Python before ever reaching pandas
          (Module 43), which exists largely to make exactly this kind of aggregation more concise at
          much larger scale.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Flattening Nested Structures" />
        <SectionTitle>Turning Nested Data Into a Flat List — For Reports, CSVs, and Tables</SectionTitle>

        <Para>
          Nested data is efficient to store and easy to build incrementally, but reports, spreadsheets,
          and CSV files (Module 16) want <strong>flat</strong> rows — one row per record, no nesting.
          Flattening means walking the nested structure once and emitting one flat dict per "leaf" you
          actually care about.
        </Para>

        <CodeBox label="Flattening orders into one flat row per line item">{`flat_rows = []

for order in orders:
    for item in order["items"]:
        flat_rows.append({
            "order_id": order["order_id"],
            "customer_name": order["customer"]["name"],
            "customer_city": order["customer"]["city"],
            "sku": item["sku"],
            "qty": item["qty"],
            "price": item["price"],
        })

for row in flat_rows[:2]:
    print(row)
# {'order_id': 'ORD-1001', 'customer_name': 'Maria Gomez', 'customer_city': 'Portland', 'sku': 'MUG-01', 'qty': 2, 'price': 12.0}
# {'order_id': 'ORD-1001', 'customer_name': 'Maria Gomez', 'customer_city': 'Portland', 'sku': 'SHIRT-04', 'qty': 1, 'price': 28.0}`}</CodeBox>

        <Para>
          Notice this is a genuine one-to-many expansion: three orders with a total of five line items
          between them become five flat rows, one per item, with the order- and customer-level fields
          repeated on each row. This exact shape — repeating parent fields across every child record —
          is precisely what a CSV export or a SQL join naturally produces, and it is the reason CSV and
          JSON so often need conversion in both directions.
        </Para>

        <CodeBox label="As a nested comprehension — the compact version, from Module 12's Part 06">{`flat_rows = [
    {
        "order_id": order["order_id"],
        "customer_name": order["customer"]["name"],
        "sku": item["sku"],
        "qty": item["qty"],
    }
    for order in orders
    for item in order["items"]
]
# Same two-for-clause flattening pattern from Module 12 — genuinely readable here,
# since there's exactly one level of nesting and no additional filter or ternary.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Deep Nesting and Where to Draw the Line" />
        <SectionTitle>When a Dict of Dicts of Lists of Dicts Is Too Much</SectionTitle>

        <Para>
          Nothing in Python stops you from nesting dicts and lists five or six levels deep — a dict of
          customers, each with a list of orders, each with a nested dict of items, each with a nested
          dict of discounts... it is technically valid, and you will occasionally receive data shaped
          exactly like this from a third-party API you do not control. The question this module wants
          you to ask is: once you receive data this deep, should <em>your own code</em> keep working
          with it in that exact shape?
        </Para>

        <CodeBox label="A realistic, genuinely deep structure — the kind a real API sometimes hands you">{`response = {
    "data": {
        "customers": [
            {
                "id": 501,
                "orders": [
                    {"id": "ORD-1001", "items": [{"sku": "MUG-01", "discounts": [{"code": "WELCOME10"}]}]}
                ],
            }
        ]
    }
}

# Reaching six levels deep for one value is technically possible...
first_discount_code = response["data"]["customers"][0]["orders"][0]["items"][0]["discounts"][0]["code"]
# ...but it is fragile, unreadable, and will be the first thing to break the next time the API
# response shape changes even slightly.`}</CodeBox>

        <Para>
          The practical fix is the same one this whole module has been building toward: extract what
          you need into a <strong>flatter, purpose-built structure</strong> as early as possible — right
          where the data enters your program — rather than threading deep chained access through the
          rest of your codebase. Write one function that walks the nested API response once and returns
          a clean, flat list of the records your program actually needs; let every other function in
          your codebase work only with that flat, predictable shape.
        </Para>

        <CodeBox label="Normalize once, at the boundary — everything downstream stays simple">{`def extract_discount_codes(api_response):
    codes = []
    for customer in api_response.get("data", {}).get("customers", []):
        for order in customer.get("orders", []):
            for item in order.get("items", []):
                for discount in item.get("discounts", []):
                    codes.append(discount.get("code"))
    return codes

# Every other function in the codebase now just works with a flat list of strings —
# no other function needs to know the original response was six levels deep.`}</CodeBox>

        <Callout type="tip">
          This is a genuinely important professional habit, not just a stylistic preference: the code
          that talks directly to a messy external structure (an API response, a legacy database export)
          should be small, isolated, and defensive (using <code>.get()</code> at every level, as shown
          above) — and everything else in your program should work with the clean, flat shape that
          function produces. When the external API changes its shape, you have exactly one function to
          fix, not every place in the codebase that happened to reach into the nested structure directly.
        </Callout>
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
        <SectionTitle>A Minneapolis Retailer&apos;s Broken Nightly Report</SectionTitle>

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
            Scenario — Retail company, Minneapolis · Production incident
          </div>

          <Para>
            A Minneapolis retailer&apos;s nightly job pulls order data from a fulfillment partner&apos;s
            API and emails a summary of revenue by state to the operations team every morning. It has
            run reliably for months. One Tuesday, the job crashes at 3 a.m. and no report goes out.
          </Para>

          <CodeBox label="The line that crashed">{`revenue_by_state = defaultdict(float)
for order in api_orders:
    state = order["customer"]["state"]
    total = sum(item["qty"] * item["price"] for item in order["items"])
    revenue_by_state[state] += total

# KeyError: 'state'`}</CodeBox>

          <SubSubTitle>What the investigation finds</SubSubTitle>

          <Para>
            The fulfillment partner had shipped a change the day before: for a small number of orders
            placed through a new in-store kiosk, the <code>customer</code> object omitted{' '}
            <code>state</code> entirely when the customer checked out as a guest without providing a
            full address. Every order in the historical test data happened to include{' '}
            <code>state</code>, so the naive <code>order[&quot;customer&quot;][&quot;state&quot;]</code>{' '}
            chain — exactly the fragile pattern from Part 02 — had simply never been exercised against a
            missing field until that one guest order came through in production.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The engineer rewrites the access using the safe <code>.get()</code> chaining pattern from
            Part 02, with an explicit fallback bucket for orders missing location data — so the report
            still runs completely, and the missing-data orders become visible as a line item instead of
            a silent crash.
          </Para>

          <CodeBox label="The fix — safe access, with an explicit fallback bucket">{`revenue_by_state = defaultdict(float)
for order in api_orders:
    state = order.get("customer", {}).get("state", "UNKNOWN")
    total = sum(item["qty"] * item["price"] for item in order["items"])
    revenue_by_state[state] += total

# "UNKNOWN" now shows up as its own line in the report — visible and actionable,
# instead of crashing the entire job over a handful of orders.`}</CodeBox>

          <Para>
            The team also adds the normalize-at-the-boundary pattern from Part 07: a single{' '}
            <code>parse_order()</code> function that walks the raw API response once, fills in explicit
            defaults for every optional field, and hands the rest of the pipeline a clean, predictable
            structure — so the next time the partner&apos;s API shape shifts slightly, exactly one
            function needs to change, not every report that touches order data.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Nested Data</SectionTitle>

        {[
          {
            wrong: '"If the data worked fine in testing, chained [] access is safe enough for production"',
            right: 'Test data is very often more complete and consistent than real-world data. As the Real World example shows, a field that is always present in every historical test record can still be missing from a small fraction of real production records — and a naive [] chain crashes the entire job the first time that happens, rather than degrading gracefully.',
          },
          {
            wrong: '"Deeply nested data should be worked with in its original nested shape throughout the codebase"',
            right: 'The professional pattern is the opposite: normalize messy or deeply nested external data into a clean, flat shape in one isolated place, as early as possible, and let the rest of the codebase depend only on that flat shape. This limits how much code needs to change when the external structure shifts.',
          },
          {
            wrong: '"sorted() sorts a list of dicts by some obvious default order"',
            right: 'There is no default ordering for a dict — sorted() on a list of dicts without a key= argument raises a TypeError, since Python has no way to know which field to compare. You must always supply key= (a function or operator.itemgetter) telling it exactly which field to sort by.',
          },
          {
            wrong: '"Flattening nested data just means removing the nesting — it\'s a lossless, mechanical step"',
            right: 'Flattening a one-to-many structure (like orders containing multiple items) genuinely expands the row count — each nested child becomes its own row, with the parent\'s fields repeated on every row. It is not a 1:1 transformation, and code downstream that assumes "one row per order" after flattening will double-count anything with more than one item.',
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
            q: 'Given a list of dicts, how would you safely access a deeply nested field that might not exist?',
            a: 'Chain .get() calls instead of [] at every level that might be missing, and make sure each intermediate default is a container that supports the next .get() call — typically an empty dict {}. For example: user.get("address", {}).get("zip", "unknown"). Chaining plain [] would raise a KeyError the moment any key in the chain is missing; naive .get() without an intermediate default risks an AttributeError on None instead.',
          },
          {
            q: 'How do you sort a list of dicts by a specific field?',
            a: 'Use sorted() with a key= argument — either a lambda (sorted(records, key=lambda r: r["field"])) or, more idiomatically for a straightforward field lookup, operator.itemgetter (sorted(records, key=itemgetter("field"))). itemgetter also accepts multiple field names for a multi-level sort, similar to an SQL ORDER BY with several columns.',
          },
          {
            q: 'How would you group a list of records by a field and sum another field within each group?',
            a: 'Use collections.defaultdict with float or int as the factory, loop over the records once, and accumulate into the defaultdict keyed by the grouping field: totals = defaultdict(float); for r in records: totals[r["category"]] += r["amount"]. This is the standard pattern for aggregation before reaching for a heavier tool like pandas.',
          },
          {
            q: 'What does "flattening" nested data mean, and why does row count often change?',
            a: 'Flattening converts a nested structure (like a list of orders, each containing a nested list of line items) into a flat list with one row per leaf record, repeating the parent\'s fields on each row. Because a single parent can contain multiple children, flattening is a genuine one-to-many expansion — the flat row count typically exceeds the number of top-level records, not equal to it.',
          },
          {
            q: 'Why is it a good practice to normalize deeply nested external data into a flat structure at the boundary of your program, rather than working with the nested shape everywhere?',
            a: 'It isolates the fragile, defensive access code (chained .get() calls, handling missing fields) into one place. Everything downstream can then rely on a clean, predictable, flat structure. When the external data source changes its shape — which real APIs do — only that one boundary function needs updating, rather than every place in the codebase that reached directly into the nested structure.',
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
        <SectionTitle>Nested Data Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Chaining [] several levels deep against data of uncertain shape',
            a: 'This works flawlessly right up until one record somewhere is missing a field, at which point the entire operation crashes with a KeyError or IndexError. Chain .get() with sensible intermediate defaults instead, whenever the data did not come from a source you fully control.',
          },
          {
            q: 'Forgetting that sorted() needs a key= for a list of dicts',
            a: 'sorted(records) on a list of dicts raises a TypeError: \'<\' not supported between instances of \'dict\' and \'dict\' — Python has no default way to compare two dicts for ordering. Always supply key=.',
          },
          {
            q: 'Assuming a flattened list has the same number of rows as the original nested list',
            a: 'As covered in the Misconceptions section, flattening a one-to-many nested structure expands the row count. Code that assumes len(flattened) == len(original) will silently miscount whenever any record has more than one nested child.',
          },
          {
            q: 'Mutating a nested dict or list shared between two variables',
            a: 'Just like the shallow-copy issue from Module 11, nested mutable structures are easy to accidentally share and mutate through more than one reference. If you need a fully independent nested copy, use copy.deepcopy() rather than a plain .copy() or list()/dict() wrap, which only copies the top level.',
          },
          {
            q: 'Threading deep chained access through many different functions across the codebase',
            a: 'Every function that reaches order["customer"]["address"]["state"] directly is a function that breaks the next time that API changes shape. Normalize the structure once, near where the data enters your program, and pass the clean, flat result to everything downstream.',
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
        <SectionTitle>Errors You Will Hit With Nested Data — And Exactly Why</SectionTitle>

        {[
          {
            error: `KeyError: 'state'`,
            cause: 'Chained [] access hit a dict, somewhere in a nested structure, that was missing an expected key on this particular record — exactly the Real World scenario above.',
            fix: 'Chain .get() with intermediate defaults instead of []: order.get("customer", {}).get("state", "UNKNOWN"). Never assume every record in real data has every field that appeared in your test data.',
          },
          {
            error: `AttributeError: 'NoneType' object has no attribute 'get'`,
            cause: 'A .get() call\'s intermediate default was omitted (or was None), so the next .get() in the chain was called on None once the first key was missing.',
            fix: 'Always supply an empty-container default ({} for a dict, [] for a list) at every intermediate .get() step in a chain, not just at the final one.',
          },
          {
            error: `IndexError: list index out of range`,
            cause: 'Indexing into a nested list at a position it does not actually have — for example, assuming every order has at least 3 items when some have only 1.',
            fix: 'Check len() before indexing, or use a comprehension/loop to iterate the list rather than assuming a fixed number of positions exist.',
          },
          {
            error: `TypeError: '<' not supported between instances of 'dict' and 'dict'`,
            cause: 'Calling sorted() (or max()/min()) on a list of dicts without a key= argument — Python has no built-in way to compare two dicts for ordering.',
            fix: 'Always pass key= — a lambda or operator.itemgetter naming exactly which field to sort or compare by.',
          },
          {
            error: `TypeError: 'int' object is not subscriptable (or similar, mid-chain)`,
            cause: 'A chained access assumed a nested value was a dict or list at some level, but that record actually had a plain value (or None) there instead — a genuine shape inconsistency in the source data.',
            fix: 'Validate or normalize the data shape at the boundary (Part 07) rather than assuming every record is perfectly uniform; log or skip records that do not match the expected shape instead of letting the whole job crash.',
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
        'Two shapes cover most real-world data: a list of dicts (rows of records) and a dict of lists (records grouped by key). Learn to move confidently between them.',
        'Chain .get() with sensible intermediate defaults ({} for a dict, [] for a list) instead of chaining [] — real data is rarely as complete as your test data.',
        'sorted() needs an explicit key= for a list of dicts — a lambda or, idiomatically, operator.itemgetter for sorting directly by one or more existing fields.',
        'Aggregation (sums, counts, grouping) over nested data combines collections.defaultdict from Module 11 with a comprehension or generator expression from Module 12.',
        'Flattening a one-to-many nested structure (like orders containing multiple items) genuinely expands the row count — it is not a lossless, row-preserving transformation.',
        'Normalize deeply nested or messy external data into a clean, flat shape in one isolated place near where it enters your program — do not thread deep chained access through the rest of the codebase.',
        'A missing field that never appeared in test data can still appear in production. Defensive access (.get() with defaults) is not paranoia — it is standard practice for any data you do not fully control.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 14 goes back to strings — building directly on Module 04&apos;s foundations — to cover
          parsing messy real-world text, cleaning and normalising it, and the formatting tools that
          matter once you are producing output, not just consuming it.
        </p>
        <Link href="/learn/python/string-manipulation-deep-dive" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 14 → String Manipulation Deep Dive
        </Link>
      </div>
    </LearnLayout>
  )
}
