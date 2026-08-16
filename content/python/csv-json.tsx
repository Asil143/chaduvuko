import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Working with CSV and JSON — Python | Chaduvuko',
  description:
    'The csv and json modules in depth — DictReader/DictWriter, quoting and delimiter edge cases, JSON type mapping, nested data, and a full worked pipeline.',
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

export default function CsvJson() {
  return (
    <LearnLayout
      title="Working with CSV and JSON"
      description="The csv and json modules in depth — DictReader/DictWriter, quoting and delimiter edge cases, JSON type mapping, nested data, and a full worked pipeline."
      section="Python — Module 16"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Not Just Split on Commas" />
        <SectionTitle>CSV Looks Simple Until It Isn&apos;t</SectionTitle>

        <Para>
          A CSV (comma-separated values) file looks simple enough that a first instinct is often to
          parse it by hand — read each line, call <code>.split(",")</code>, and move on. This works for
          the simplest possible files and breaks the moment real-world data shows up.
        </Para>

        <CodeBox label="The naive approach — and exactly where it breaks">{`line = "Acme Inc,\\"Springfield, IL\\",1200.50"
fields = line.split(",")

print(fields)
# ['Acme Inc', '"Springfield', ' IL"', '1200.50']
# WRONG — four fields instead of three. The comma INSIDE "Springfield, IL"
# was treated as a field separator, because .split(",") has no concept
# of quoting at all.`}</CodeBox>

        <Para>
          Real CSV data routinely contains commas inside a field (an address, a company name with a
          comma, free-text notes), and sometimes even newlines inside a quoted field (a multi-line
          comment exported from a form). A correct CSV parser has to understand quoting rules — which
          is exactly why Python ships a dedicated <code>csv</code> module rather than expecting you to
          reimplement this logic yourself.
        </Para>

        <Callout type="warning">
          <strong>Never parse CSV with .split(",") in real code.</strong> It is a completely reasonable
          first instinct, and it will work in a demo — and then corrupt data the first time a comma or
          newline shows up inside a field, often silently, since a wrong number of fields doesn&apos;t
          always raise an obvious error. Use the <code>csv</code> module, covered next, every time.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — csv.reader and csv.writer" />
        <SectionTitle>The Low-Level Interface — Rows as Lists</SectionTitle>

        <Para>
          The <code>csv</code> module&apos;s most basic tools, <code>csv.reader</code> and{' '}
          <code>csv.writer</code>, wrap a file object and handle the quoting rules correctly, giving you
          each row as a plain Python list of strings.
        </Para>

        <CodeBox label="Reading a CSV with csv.reader">{`import csv

with open("orders.csv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)          # the first row — usually column names
    for row in reader:
        print(row)                 # each row is a list, e.g. ['1001', 'Acme Inc', '1200.50']

# header -> ['order_id', 'customer', 'total']`}</CodeBox>

        <Callout type="warning">
          <strong>Always pass newline=&quot;&quot; when opening a file for csv.reader or csv.writer.</strong>{' '}
          This is not optional and not a style choice — the csv module needs to control newline
          translation itself to correctly handle quoted fields that contain embedded newlines. Without
          it, on some platforms, rows can be silently split incorrectly. This is one of the most common
          and least obvious mistakes when working with the csv module — the Python documentation calls
          this out explicitly, and it is worth internalising as a fixed habit.
        </Callout>

        <CodeBox label="Writing a CSV with csv.writer">{`import csv

rows = [
    ["order_id", "customer", "total"],
    ["1001", "Acme Inc", "1200.50"],
    ["1002", "Springfield Widgets", "89.99"],
]

with open("export.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)     # writes every row, correctly quoting where needed
    # or writer.writerow(row) for a single row at a time`}</CodeBox>

        <Para>
          Notice that <code>csv.writer</code> handles quoting automatically — if a field you pass
          contains a comma or a newline, it wraps that field in quotes for you in the output, exactly
          reversing the problem shown in Part 01.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — DictReader and DictWriter" />
        <SectionTitle>The Preferred, Idiomatic Interface — Rows as Dictionaries</SectionTitle>

        <Para>
          <code>csv.reader</code> gives you each row as a list — which means accessing a specific column
          requires remembering its numeric position (<code>row[2]</code> for the total, say), a fragile
          approach that breaks silently if the column order ever changes. <code>csv.DictReader</code>{' '}
          fixes this by using the header row to key each row into a dictionary instead.
        </Para>

        <CodeBox label="DictReader — access columns by name, not position">{`import csv

with open("orders.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["customer"], row["total"])
        # row is a dict: {'order_id': '1001', 'customer': 'Acme Inc', 'total': '1200.50'}

# The header row is consumed automatically — DictReader uses it to build
# each row's keys, and you never see it as a separate "data" row.`}</CodeBox>

        <Callout type="tip">
          <strong>Default to DictReader and DictWriter over the plain reader/writer.</strong> Accessing{' '}
          <code>row[&quot;customer&quot;]</code> is self-documenting and survives a reordered or extended
          set of columns without breaking, while <code>row[1]</code> silently returns the wrong value
          the moment a column is inserted anywhere before it. Every value from <code>DictReader</code>{' '}
          is still a string, exactly as with plain <code>csv.reader</code> — CSV has no concept of types
          at all, covered further in Part 06.
        </Callout>

        <CodeBox label="DictWriter — writing rows from dictionaries">{`import csv

rows = [
    {"order_id": "1001", "customer": "Acme Inc", "total": "1200.50"},
    {"order_id": "1002", "customer": "Springfield Widgets", "total": "89.99"},
]

with open("export.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["order_id", "customer", "total"])
    writer.writeheader()        # DictWriter does NOT write the header automatically —
                                 # you must call this explicitly, exactly once
    writer.writerows(rows)`}</CodeBox>

        <Para>
          <code>DictWriter</code> requires <code>fieldnames</code> up front — the exact list and order
          of columns to write — since a Python dict doesn&apos;t inherently guarantee the column order
          you want in the output file. Every dict you write must contain exactly those keys, or{' '}
          <code>DictWriter</code> raises a <code>ValueError</code> rather than silently dropping or
          misplacing data.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Quoting, Delimiters, and Edge Cases" />
        <SectionTitle>What the csv Module Handles For You — and What You Configure</SectionTitle>

        <Para>
          "CSV" is not one rigidly standardised format — real files vary in their delimiter, their quote
          character, and how they escape a quote character that appears inside a quoted field. The{' '}
          <code>csv</code> module exposes all of this as configuration rather than assuming one fixed
          convention.
        </Para>

        <CodeBox label="Embedded commas and newlines — handled correctly by default">{`import csv

with open("customers.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "address", "notes"])
    writer.writerow(["Acme Inc", "123 Main St, Springfield, IL", "Called twice;\\nfollow up Friday"])

# The resulting file correctly quotes both problem fields:
# name,address,notes
# Acme Inc,"123 Main St, Springfield, IL","Called twice;
# follow up Friday"
#
# Reading it back with csv.reader correctly reconstructs both fields as
# SINGLE values, embedded comma and embedded newline intact.`}</CodeBox>

        <SubTitle>Custom delimiters — tab-separated values and beyond</SubTitle>

        <Para>
          Not every "comma-separated" export actually uses a comma — tab-separated files (often{' '}
          <code>.tsv</code>) and semicolon-delimited exports (common from European locales, where a
          comma is the decimal separator) are both common in real data. The <code>csv</code> module
          handles either with a single argument.
        </Para>

        <CodeBox label="Reading a tab-separated file">{`import csv

with open("export.tsv", newline="", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter="\\t")
    for row in reader:
        print(row)`}</CodeBox>

        <SubTitle>Dialects — bundling a set of formatting rules together</SubTitle>

        <Para>
          When several arguments need to travel together consistently (delimiter, quote character, line
          terminator), the module lets you register a named <strong>dialect</strong> once and reuse it,
          rather than repeating the same keyword arguments at every call site.
        </Para>

        <CodeBox label="A registered dialect — useful when a specific export format is used repeatedly">{`import csv

csv.register_dialect("pipe_delimited", delimiter="|", quotechar='"')

with open("legacy_export.txt", newline="", encoding="utf-8") as f:
    reader = csv.reader(f, dialect="pipe_delimited")
    for row in reader:
        print(row)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The json Module" />
        <SectionTitle>json.load, json.loads, json.dump, json.dumps</SectionTitle>

        <Para>
          JSON (JavaScript Object Notation) is the dominant format for structured data exchanged between
          services — API responses, configuration files, and message payloads are overwhelmingly JSON.
          Python&apos;s built-in <code>json</code> module converts between JSON text and native Python
          objects (dicts, lists, strings, numbers, booleans, and <code>None</code>) in both directions.
        </Para>

        <Para>
          The module has four core functions, and the naming pattern is worth memorising: the ones
          ending in <strong>s</strong> work with strings already in memory; the ones without it work
          directly with an open file object.
        </Para>

        <CodeBox label="The four functions, and what each expects">{`json.loads(text)      # parse a JSON STRING already in memory -> Python object
json.load(file_obj)   # parse JSON directly FROM AN OPEN FILE -> Python object

json.dumps(obj)        # serialize a Python object -> a JSON STRING
json.dump(obj, file_obj)  # serialize a Python object directly INTO AN OPEN FILE`}</CodeBox>

        <CodeBox label="Reading a JSON file">{`import json

with open("config.json", encoding="utf-8") as f:
    config = json.load(f)

print(config["database"]["host"])   # a nested dict, accessed like any Python dict`}</CodeBox>

        <CodeBox label="Writing a JSON file">{`import json

settings = {"theme": "dark", "notifications": True, "max_retries": 3}

with open("settings.json", "w", encoding="utf-8") as f:
    json.dump(settings, f)`}</CodeBox>

        <CodeBox label="Working with JSON already in memory as a string">{`import json

response_text = '{"status": "ok", "count": 3}'
data = json.loads(response_text)      # note the trailing "s" — parsing a string
print(data["count"])                    # 3, an actual Python int

payload = json.dumps({"user": "maria", "active": True})
print(payload)                          # '{"user": "maria", "active": true}' — a str`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — JSON Types vs Python Types" />
        <SectionTitle>The Mapping — and Where It Genuinely Doesn&apos;t Line Up</SectionTitle>

        <Para>
          JSON has its own small set of types, and the <code>json</code> module maps each one to the
          closest matching Python type automatically. Most of the mapping is exactly what you would
          expect.
        </Para>

        <CodeBox label="The standard mapping">{`JSON            Python (after json.load / json.loads)
------          ------
object          dict
array           list
string          str
number (int)    int
number (float)  float
true / false    bool (True / False)
null            None`}</CodeBox>

        <Para>
          The reverse direction (<code>json.dump</code> / <code>json.dumps</code>) maps Python types
          back to JSON using the same table — but a few Python types have <strong>no</strong> direct
          JSON equivalent, and this is where real bugs show up.
        </Para>

        <SubTitle>tuple — silently becomes a JSON array</SubTitle>

        <CodeBox label="Tuples are NOT preserved as a distinct type">{`import json

data = {"point": (3, 4)}   # a tuple
text = json.dumps(data)
print(text)                # '{"point": [3, 4]}' — now a JSON array

restored = json.loads(text)
print(restored["point"])   # [3, 4] — a LIST, not a tuple. The tuple is gone for good.`}</CodeBox>

        <SubTitle>set — has no JSON equivalent at all, and raises an error</SubTitle>

        <CodeBox label="Sets cannot be serialized without extra work">{`import json

data = {"tags": {"python", "backend", "api"}}   # a set
json.dumps(data)
# TypeError: Object of type set is not JSON serializable

# A set must be explicitly converted to a list first if it needs to round-trip:
data = {"tags": list({"python", "backend", "api"})}
json.dumps(data)   # works — but the result, once read back, is a list, not a set`}</CodeBox>

        <SubTitle>Float precision — the same imprecision from Module 02, now serialized</SubTitle>

        <Para>
          JSON numbers are text in the file, parsed into Python <code>float</code> objects on load —
          which means the exact same IEEE 754 floating-point imprecision covered in the Variables & Data
          Types module carries straight through. A value serialized as <code>19.1</code> and read back
          can come back as something like <code>19.099999999999998</code>, for the same underlying
          reason <code>0.1 + 0.2</code> doesn&apos;t equal <code>0.3</code> exactly.
        </Para>

        <Callout type="warning">
          <strong>Never round-trip money or other exact-decimal values through plain JSON floats.</strong>{' '}
          The standard, real-world fix is to serialize money as a <strong>string</strong> in the JSON
          (<code>&quot;19.99&quot;</code>) and convert it to <code>decimal.Decimal</code> explicitly on
          the Python side after loading — exactly the same underlying lesson from the Variables & Data
          Types module, now showing up again at the JSON boundary.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Nested JSON" />
        <SectionTitle>Working With Real, Deeply Nested JSON</SectionTitle>

        <Para>
          Real-world JSON is rarely flat — API responses commonly nest dicts inside dicts, lists of
          dicts, and dicts containing lists, exactly the shapes covered in the Nested Data Structures
          module. <code>json.load</code> reconstructs the full nested structure automatically; the work
          is in navigating it correctly afterward.
        </Para>

        <CodeBox label="A realistic nested API-style response">{`import json

response_text = '''
{
  "customer": {
    "name": "Acme Inc",
    "contacts": [
      {"type": "billing", "email": "billing@acme.com"},
      {"type": "support", "email": "support@acme.com"}
    ]
  },
  "orders": [
    {"id": 1001, "total": 1200.50, "items": ["widget", "gadget"]},
    {"id": 1002, "total": 89.99, "items": ["gizmo"]}
  ]
}
'''

data = json.loads(response_text)

print(data["customer"]["name"])                    # "Acme Inc"
print(data["customer"]["contacts"][0]["email"])     # "billing@acme.com"
print(data["orders"][1]["items"])                    # ["gizmo"]

order_total = sum(order["total"] for order in data["orders"])
print(order_total)                                     # 1290.49`}</CodeBox>

        <Callout type="tip">
          <strong>Use .get() defensively when a key might be missing.</strong> Real-world API responses
          frequently omit optional fields entirely rather than sending them as <code>null</code>.{' '}
          <code>data.get(&quot;discount&quot;, 0)</code> returns a safe default instead of raising a{' '}
          <code>KeyError</code>, exactly the same <code>.get()</code> pattern from the Dictionaries
          module, now applied specifically to parsed JSON.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — A Worked Pipeline" />
        <SectionTitle>Pretty-Printing, and a Full CSV-to-JSON Transformation</SectionTitle>

        <Para>
          <code>json.dumps()</code> and <code>json.dump()</code> both accept an <code>indent</code>{' '}
          argument that formats the output with readable line breaks and indentation — genuinely useful
          any time a human, not just another program, needs to read the output.
        </Para>

        <CodeBox label="indent= for human-readable output">{`import json

data = {"customer": "Acme Inc", "total": 1200.50, "items": ["widget", "gadget"]}

print(json.dumps(data))
# {"customer": "Acme Inc", "total": 1200.5, "items": ["widget", "gadget"]}   — one line

print(json.dumps(data, indent=2))
# {
#   "customer": "Acme Inc",
#   "total": 1200.5,
#   "items": [
#     "widget",
#     "gadget"
#   ]
# }`}</CodeBox>

        <Para>
          Now a complete, realistic example: reading a CSV of individual order line items and writing
          out a JSON summary grouped by customer — combining everything from this module, including{' '}
          <code>DictReader</code>, nested structure-building, and <code>Decimal</code>-aware totals.
        </Para>

        <CodeBox label="orders.csv, the source data">{`order_id,customer,item,quantity,unit_price
1001,Acme Inc,widget,4,12.50
1001,Acme Inc,gadget,1,45.00
1002,Springfield Widgets,gizmo,2,9.99
1003,Acme Inc,widget,10,12.50`}</CodeBox>

        <CodeBox label="The full transformation — CSV in, grouped JSON summary out">{`import csv
import json
from decimal import Decimal
from collections import defaultdict

summary = defaultdict(lambda: {"order_count": set(), "total": Decimal("0")})

with open("orders.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        customer = row["customer"]
        line_total = Decimal(row["unit_price"]) * int(row["quantity"])

        summary[customer]["order_count"].add(row["order_id"])
        summary[customer]["total"] += line_total

# Convert to a plain, JSON-serializable structure —
# note the explicit conversions: set -> len(), Decimal -> str()
output = {
    customer: {
        "order_count": len(stats["order_count"]),
        "total": str(stats["total"]),   # serialize money as a STRING, not a float — Part 06
    }
    for customer, stats in summary.items()
}

with open("customer_summary.json", "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2)

# customer_summary.json:
# {
#   "Acme Inc": {
#     "order_count": 2,
#     "total": "182.50"
#   },
#   "Springfield Widgets": {
#     "order_count": 1,
#     "total": "19.98"
#   }
# }`}</CodeBox>

        <Para>
          Every design decision in that pipeline traces back to earlier parts of this module:{' '}
          <code>DictReader</code> for column-name access (Part 03), <code>Decimal</code> instead of{' '}
          <code>float</code> for money, and explicitly converting the set and the <code>Decimal</code>{' '}
          to JSON-safe types before serializing (Part 06), rather than letting <code>json.dump</code>{' '}
          fail — or worse, silently misrepresent the data.
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
        <SectionTitle>The Invoice Export That Broke Accounting — Austin, TX</SectionTitle>

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
            Scenario — B2B invoicing SaaS, Austin · Support escalation
          </div>

          <Para>
            An invoicing platform exports a nightly CSV of billing records for a client&apos;s accounting
            software to import. A support ticket comes in: several rows are importing with the wrong
            data entirely — an address ends up in the "amount" column, and totals downstream are off by
            thousands of dollars.
          </Para>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            The export code had been written by hand, joining fields with <code>",".join(fields)</code>{' '}
            rather than using <code>csv.writer</code>. One client&apos;s billing address happened to
            contain a comma — <code>&quot;400 Congress Ave, Suite 200&quot;</code> — and, with no
            quoting logic at all, that single field split into two columns on import, shifting every
            field after it one position to the right for that row.
          </Para>

          <CodeBox label="The hand-rolled export — no quoting, works fine until a comma shows up in real data">{`# Before — looks reasonable, has no concept of quoting
def export_row(record):
    fields = [record.id, record.customer, record.address, str(record.amount)]
    return ",".join(fields) + "\\n"

# record.address = "400 Congress Ave, Suite 200"
# -> "1001,Acme Inc,400 Congress Ave, Suite 200,1200.50\\n"
# Five comma-separated values where the importer expects exactly four —
# every downstream column shifts by one.`}</CodeBox>

          <CodeBox label="The fix — csv.writer, which quotes automatically">{`import csv

def export_rows(records, f):
    writer = csv.writer(f)
    writer.writerow(["id", "customer", "address", "amount"])
    for record in records:
        writer.writerow([record.id, record.customer, record.address, record.amount])

# record.address containing a comma is now automatically wrapped in quotes:
# 1001,Acme Inc,"400 Congress Ave, Suite 200",1200.50
# — exactly one field, correctly reconstructed by any real CSV reader.`}</CodeBox>

          <Para>
            The bug had shipped for months without being noticed, because most customer addresses
            didn&apos;t happen to contain a comma — exactly the trap described in Part 01. It only
            surfaced with a specific client&apos;s specific address format, and by then several weeks of
            exports needed to be manually re-processed. The team&apos;s follow-up wasn&apos;t just the
            fix above; it was a rule, now enforced in code review, that no file export is written with
            manual string joining — every CSV export goes through the <code>csv</code> module, no
            exceptions.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSV and JSON</SectionTitle>

        {[
          {
            wrong: '"CSV is simple enough to just split on commas by hand"',
            right: 'It works only until a field contains a comma or a newline, which real-world data does routinely — addresses, free-text notes, company names. Both the Real World example above and Part 01 show this failing silently, not with an obvious crash. Always use the csv module.',
          },
          {
            wrong: '"json.loads and json.load are basically the same function"',
            right: 'They accept fundamentally different inputs: loads parses a JSON string already in memory, load reads directly from an open file object. Confusing them raises a clear error quickly (passing a file object to loads(), for example), but it is worth remembering the naming convention — the "s" versions work with strings — rather than guessing each time.',
          },
          {
            wrong: '"Any Python object can be serialized to JSON with json.dumps()"',
            right: 'Only dicts, lists, strings, numbers, booleans, and None serialize directly. Sets raise a TypeError outright; tuples silently become JSON arrays and lose their tuple identity on the way back. Custom class instances also raise a TypeError unless you provide a custom encoder — something covered as you go further with the json module in practice.',
          },
          {
            wrong: '"Every value read from a CSV or JSON file already has the right Python type"',
            right: 'CSV has no type system at all — every single value from csv.reader or DictReader is a str, including numbers, and must be explicitly converted with int() or float() (or Decimal() for money). JSON does map numbers to int/float automatically, but those floats carry the same precision issues as any other Python float, and money should still be handled as a string and converted to Decimal explicitly.',
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
            q: 'Why should you use the csv module instead of splitting each line on commas manually?',
            a: 'Real CSV data often contains commas or newlines inside a single field (an address, free text), which requires quoting to represent correctly. A naive .split(",") has no concept of quoting and will silently misparse such rows, shifting fields — often without an obvious error, which makes it a dangerous class of bug. The csv module implements correct quoting and unquoting on both read and write.',
          },
          {
            q: 'What is the practical difference between csv.reader and csv.DictReader?',
            a: 'csv.reader returns each row as a plain list, requiring you to access fields by numeric position, which breaks silently if column order changes. csv.DictReader uses the header row to key each row into a dictionary, letting you access fields by name (row["customer"]), which is self-documenting and resilient to reordered or added columns. DictReader is the preferred, idiomatic choice for most real code.',
          },
          {
            q: 'Which Python types round-trip cleanly through JSON, and which do not?',
            a: 'dict, list, str, int, float, bool, and None all map cleanly to and from JSON\'s object, array, string, number, boolean, and null. tuple serializes to a JSON array but comes back as a list, not a tuple — the distinction is lost. set has no JSON equivalent at all and raises a TypeError unless explicitly converted to a list first.',
          },
          {
            q: 'Why is it risky to store monetary values as plain floats in JSON?',
            a: 'JSON numbers are parsed into Python float objects, which inherit the same IEEE 754 floating-point imprecision covered in the Variables & Data Types module — a value can come back slightly different from what was written. The standard fix is to serialize money as a string in the JSON and explicitly convert it to decimal.Decimal after loading, rather than relying on the float round-trip to be exact.',
          },
          {
            q: 'What does the indent argument to json.dumps() / json.dump() do, and when would you use it?',
            a: 'It formats the output JSON with line breaks and the specified number of spaces of indentation per nesting level, producing human-readable output instead of a single dense line. It\'s useful for configuration files, debug output, or any JSON a human is expected to read directly — for machine-to-machine payloads where size matters, the default compact output is usually preferred instead.',
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
        <SectionTitle>CSV and JSON Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting newline="" when opening a file for csv.reader or csv.writer',
            a: 'The csv module needs to manage newline translation itself to correctly handle quoted fields containing embedded newlines. Omitting newline="" can cause incorrect row splitting on some platforms — always include it, on both read and write.',
          },
          {
            q: 'Assuming numeric-looking CSV values are already numbers',
            a: 'Every value from csv.reader or DictReader is a plain str, including things that look like numbers. row["total"] + 1 raises a TypeError. Convert explicitly with int(), float(), or Decimal() before doing arithmetic.',
          },
          {
            q: 'Forgetting DictWriter.writeheader()',
            a: 'Unlike writing plain rows, DictWriter does not write the header row automatically — you must call .writeheader() once, before writing any data rows, or the output file will have no column names at all.',
          },
          {
            q: 'Trying to json.dumps() a set or a custom object directly',
            a: 'Both raise TypeError: Object of type X is not JSON serializable. Convert a set to a list explicitly before serializing; custom class instances need a custom encoder or must be converted to a plain dict first.',
          },
          {
            q: 'Not handling missing keys when reading real-world JSON',
            a: 'API responses frequently omit optional fields rather than sending null. data["discount"] raises a KeyError the moment that field is absent from even one record. Use data.get("discount", 0) to supply a safe default instead.',
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
        <SectionTitle>Errors You Will Hit With CSV and JSON — And Exactly Why</SectionTitle>

        {[
          {
            error: `_csv.Error: field larger than field limit (131072)`,
            cause: 'A single CSV field exceeds the csv module\'s default maximum field size — usually caused by malformed quoting somewhere earlier in the file causing the parser to treat many rows as one enormous field.',
            fix: 'First check whether the file is actually malformed (an unescaped quote character breaking the quoting). If the data is genuinely correct and just has a very large field, raise the limit explicitly with csv.field_size_limit(new_limit).',
          },
          {
            error: `ValueError: dict contains fields not in fieldnames: 'notes'`,
            cause: 'DictWriter.writerow() (or writerows()) was called with a dict that contains a key not listed in the fieldnames passed to DictWriter — a mismatch between the data and the declared column set.',
            fix: 'Add the missing field to the fieldnames list if it should be included, or remove/rename the unexpected key from the row dict before writing, depending on which one is actually correct.',
          },
          {
            error: `json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)`,
            cause: 'json.loads() (or json.load()) was called on an empty string, or on text that isn\'t valid JSON at all — commonly, calling it on an API\'s error response, or on a file that was truncated before it was fully written.',
            fix: 'Print or inspect the raw text before parsing it to confirm it is genuinely JSON. If it can legitimately be empty, check for that case explicitly before calling json.loads().',
          },
          {
            error: `TypeError: Object of type set is not JSON serializable`,
            cause: 'json.dumps() or json.dump() was called on a structure containing a set somewhere inside it — sets have no JSON equivalent, as covered in Part 06.',
            fix: 'Convert the set to a list explicitly before serializing: list(my_set). Be aware the result will come back as a list, not a set, if the JSON is read again later.',
          },
          {
            error: `KeyError: 'discount'`,
            cause: 'Accessing a dict key from parsed JSON (or a DictReader row) that doesn\'t exist in that particular record — commonly an optional field that some records include and others omit entirely.',
            fix: 'Use .get("discount", default_value) instead of direct key access when a field might legitimately be missing, rather than assuming every record has an identical shape.',
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
        'Never parse CSV with .split(",") by hand — embedded commas and newlines inside quoted fields will silently misparse. Use the csv module every time.',
        'Always open files for csv.reader/csv.writer with newline="" — the csv module needs to manage newline handling itself for quoting to work correctly.',
        'Prefer csv.DictReader and csv.DictWriter over the plain reader/writer — accessing columns by name is self-documenting and resilient to column reordering.',
        'Every CSV value is a string, with no exceptions — convert explicitly with int(), float(), or Decimal() before doing arithmetic.',
        'json.loads/json.dumps work with strings already in memory; json.load/json.dump work directly with an open file object.',
        'Most Python types map cleanly to and from JSON — but tuples silently become lists, and sets raise a TypeError and must be converted to a list explicitly first.',
        'JSON floats carry the same IEEE 754 precision issues as any Python float — serialize money as a string and convert to decimal.Decimal explicitly, never round-trip it as a raw float.',
        'Use .get("key", default) rather than direct key access when parsing real-world JSON, since optional fields are frequently omitted rather than sent as null.',
        'indent=2 (or similar) on json.dumps()/json.dump() produces human-readable output — omit it for compact machine-to-machine payloads.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 17 covers exception handling in full — try/except/else/finally, the exception
          hierarchy, custom exceptions, and how to make programs fail safely instead of silently, which
          matters immediately for the file and data parsing work covered in this module.
        </p>
        <Link href="/learn/python/exception-handling" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 17 → Exception Handling
        </Link>
      </div>
    </LearnLayout>
  )
}
