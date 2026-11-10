import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const C = '#7b61ff'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function StandardLibraryToolkit() {
  return (
    <LearnLayout title="The Standard Library Toolkit — pathlib, collections, itertools, subprocess" description="Go beyond imports: navigate files safely, choose the right collection, compose iterators lazily, and run external programs with controlled inputs and errors." section="Python — Lesson 19" readTime="50 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Build on the Standard Library" />
        <SectionTitle>Useful Tools Are Already Installed with Python</SectionTitle>
        <Para>Python ships with a broad standard library. Before adding a dependency, check whether a well-supported module already handles the task. This lesson deepens four everyday tools: <code>pathlib</code> for paths, <code>collections</code> for specialized containers, <code>itertools</code> for lazy iteration, and <code>subprocess</code> for launching external programs.</Para>
        <Para>You have already opened files and used modules and virtual environments. Here the goal is not to memorize every function; it is to recognize the shape of the problem, select an appropriate tool, and understand its safety and resource behavior.</Para>
        <Callout type="tip">A good script remains portable: build paths from a known directory, stream large inputs when possible, and treat external process output and exit status as data that must be checked.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — pathlib" />
        <SectionTitle>Compose Paths Instead of Concatenating Strings</SectionTitle>
        <Para><code>Path</code> models a filesystem path with operations such as joining, checking, reading, and writing. The <code>/</code> operator joins path components using the platform's path rules. A relative path is interpreted from the process working directory, so production code often anchors it to a known location rather than assuming how the script was launched.</Para>
        <CodeBox label="Anchor data relative to the script">{`from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent
DATA_DIR = PROJECT_DIR / "data"
input_file = DATA_DIR / "orders.csv"

if not input_file.is_file():
    raise FileNotFoundError(f"Expected input file: {input_file}")

for path in sorted(DATA_DIR.glob("*.csv")):
    print(path.name, path.stat().st_size)`}</CodeBox>
        <Para><code>resolve()</code> produces an absolute path, and <code>parent</code> navigates to its containing directory. For generated output, make the parent directory explicitly with <code>mkdir(parents=True, exist_ok=True)</code>. Avoid deriving a path from untrusted input without checking where the resolved path ends up.</Para>
        <CodeBox label="Create an output directory and write text">{`output_dir = PROJECT_DIR / "output" / "daily"
output_dir.mkdir(parents=True, exist_ok=True)
report = output_dir / "summary.txt"
report.write_text("processed 24 orders\\n", encoding="utf-8")

text = report.read_text(encoding="utf-8")
print(text)`}</CodeBox>
        <Callout type="warning">A filename supplied by a user can contain path components. If a program accepts one, validate the resolved destination against the intended base directory; joining paths alone does not enforce containment.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — collections" />
        <SectionTitle>Use a Container That Matches the Operation</SectionTitle>
        <Para>The built-in list and dictionary cover many cases, but <code>collections</code> adds containers for common patterns. <code>Counter</code> counts hashable values, <code>defaultdict</code> initializes missing values, and <code>deque</code> supports efficient appends and pops at both ends. Choose based on the operations you need, not on novelty.</Para>
        <CodeBox label="Count event types and group IDs">{`from collections import Counter, defaultdict, deque

events = ["placed", "delivered", "placed", "cancelled", "placed"]
counts = Counter(events)
print(counts.most_common(2))

orders_by_city: dict[str, list[str]] = defaultdict(list)
orders_by_city["Hyderabad"].append("ORD-1")
orders_by_city["Visakhapatnam"].append("ORD-2")

recent_ids = deque(["ORD-5", "ORD-6"], maxlen=3)
recent_ids.append("ORD-7")
print(list(recent_ids))`}</CodeBox>
        <Para>A bounded deque discards items from the opposite end as new items arrive, making it useful for a rolling window or recent-event buffer. Do not use it as durable storage: when older entries fall off, they are gone.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — itertools" />
        <SectionTitle>Compose Lazy Iterators Without Unnecessary Lists</SectionTitle>
        <Para><code>itertools</code> provides building blocks for efficient iteration. Many return iterators, so they generate values on demand rather than materializing an entire result. This matters when processing a large input, but remember that an iterator is usually consumed once.</Para>
        <CodeBox label="Chain sources, take a sample, form combinations">{`from itertools import chain, combinations, islice

morning = ["ORD-1", "ORD-2"]
evening = ["ORD-3", "ORD-4"]
all_orders = chain(morning, evening)
first_three = list(islice(all_orders, 3))
print(first_three)

pairs = combinations(["Asha", "Ravi", "Meera"], 2)
print(list(pairs))`}</CodeBox>
        <Para><code>itertools.groupby</code> groups adjacent equal keys, not every matching value in an arbitrary unsorted sequence. Sort by the same key first if you need all records for a category together.</Para>
        <CodeBox label="Sort before using groupby">{`from itertools import groupby

rows = [
    {"city": "Hyderabad", "order": "ORD-1"},
    {"city": "Chennai", "order": "ORD-2"},
    {"city": "Hyderabad", "order": "ORD-3"},
]
rows.sort(key=lambda row: row["city"])
for city, group in groupby(rows, key=lambda row: row["city"]):
    print(city, [row["order"] for row in group])`}</CodeBox>
        <Callout type="info">Do not convert every iterator to a list automatically. Materialize only when you need repeated traversal, indexing, or a concrete collection and the size is reasonable.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — subprocess" />
        <SectionTitle>Run Programs with an Explicit Contract</SectionTitle>
        <Para><code>subprocess.run()</code> starts another process and waits for it. Pass an argument list, set a timeout, and decide how to handle a non-zero exit code. With <code>check=True</code>, Python raises <code>CalledProcessError</code> if the command fails. Capture output when the parent program needs to inspect it.</Para>
        <CodeBox label="Call a known executable with separate arguments">{`import subprocess

result = subprocess.run(
    ["python", "--version"],
    check=True,
    capture_output=True,
    text=True,
    timeout=10,
)
print(result.stdout or result.stderr)`}</CodeBox>
        <Para>For a known script, prefer a list of arguments and the current interpreter path from <code>sys.executable</code>. Do not build a shell command by interpolating user-controlled strings. If you have a command-specific reason to use a shell, treat it as a security-sensitive design decision and validate inputs carefully.</Para>
        <CodeBox label="Run this project with its active interpreter">{`import subprocess
import sys

result = subprocess.run(
    [sys.executable, "scripts/reconcile.py", "--date", "2026-11-09"],
    check=False,
    capture_output=True,
    text=True,
    timeout=30,
)
if result.returncode != 0:
    print("Reconciliation failed:", result.stderr)
else:
    print(result.stdout)`}</CodeBox>
        <Callout type="warning">A timeout does not make an unsafe command safe. Avoid <code>shell=True</code> for ordinary calls; use an argument sequence, restrict what executable can run, and never assume external output is trustworthy.</Callout>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Choosing the Tool" />
        <SectionTitle>A Small Decision Table</SectionTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, color: 'var(--text)' }}><thead><tr>{['Task', 'Tool', 'Remember'].map(x => <th key={x} style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[['Join, inspect, or search filesystem paths', 'pathlib.Path', 'Anchor relative paths deliberately'], ['Count values / group by a key / keep recent items', 'Counter / defaultdict / deque', 'Know whether missing keys mutate the container'], ['Combine or sample a stream lazily', 'itertools', 'Iterators are one-pass unless recreated'], ['Launch a child program', 'subprocess.run', 'Pass args, check status, add a timeout']].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>These modules fit together in a batch workflow: discover input files with <code>pathlib</code>, stream rows, count or group with <code>collections</code>, combine records with <code>itertools</code>, then optionally call a separate, controlled executable. Keep each transformation small enough to test independently.</Para>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Mistakes" />
        <SectionTitle>Small Convenience Features Have Real Semantics</SectionTitle>
        <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li><strong>Assuming a relative path starts beside the script:</strong> it starts from the process working directory unless anchored. Build from <code>__file__</code> or configured paths.</li>
          <li><strong>Using a mutable dictionary default:</strong> <code>defaultdict(list)</code> creates a list on missing-key access. Use a normal dict when missing reads should not mutate.</li>
          <li><strong>Using groupby on unsorted records:</strong> only adjacent keys are grouped. Sort by the same key first or use a different aggregation strategy.</li>
          <li><strong>Forgetting iterators are consumed:</strong> create a fresh iterator when traversing again; materialize intentionally if reuse is required.</li>
          <li><strong>Ignoring a subprocess failure or hanging process:</strong> inspect the return code, use <code>check=True</code> when exceptions are appropriate, and set a timeout.</li>
        </ul>
      </section>
      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Practice: Build a Safe Batch Summary</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
          <li>Use <code>pathlib</code> to find CSV files in a configured input directory and write a report into a created output directory.</li>
          <li>Count delivery states with <code>Counter</code> and group order IDs by city with <code>defaultdict(list)</code>.</li>
          <li>Use <code>islice</code> to inspect only the first few rows of a large iterator without reading the whole file.</li>
          <li>Group sorted records by city with <code>groupby</code>; then intentionally remove the sort and explain the changed output.</li>
          <li>Run a harmless child command with <code>subprocess.run</code>, capture its output, and demonstrate how a timeout or nonzero status is handled.</li>
        </ol>
        <Para><strong>Review question:</strong> which parts need to remain lazy, which results should be persisted, and what should happen when an expected input file is missing?</Para>
      </section>
      <KeyTakeaways items={[
        'pathlib.Path makes path composition portable, but relative paths still depend on the process working directory.',
        'Counter, defaultdict, and deque each encode a useful collection pattern; choose based on required operations.',
        'itertools composes lazy, often one-pass iterators; do not materialize large sequences without a reason.',
        'groupby groups adjacent keys, so sort by the grouping key first when aggregating arbitrary records.',
        'Use subprocess.run with an argument list, an explicit status policy, captured output when needed, and a timeout.',
        'The standard library can remove dependencies, but it does not remove the need for careful input, path, and failure handling.'
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 20 begins object-oriented Python with classes and instances.</p>
        <a href="/learn/python/classes-objects" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 20 → Classes and Objects — The Basics</a>
      </div>
    </LearnLayout>
  )
}
