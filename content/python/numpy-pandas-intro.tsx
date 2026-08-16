import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Intro to NumPy and pandas — Python | Chaduvuko',
  description:
    'The bridge from core Python into data work — arrays, DataFrames, and why these libraries exist at all.',
}

const C = '#ff4757'

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

export default function NumpyPandasIntro() {
  return (
    <LearnLayout
      title="Intro to NumPy and pandas"
      description="The bridge from core Python into data work — arrays, DataFrames, and why these libraries exist at all."
      section="Python — Module 43"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Plain Python Loops Aren't Enough" />
        <SectionTitle>The Problem NumPy Exists to Solve</SectionTitle>

        <Para>
          A plain Python list can hold numbers, but every arithmetic operation on it requires an explicit
          loop — and each iteration carries real overhead, since Python objects (even a simple integer)
          are far heavier than the raw numeric values a lower-level language works with directly.
        </Para>

        <CodeBox label="Plain Python — multiplying every element by 2">{`numbers = list(range(1_000_000))
doubled = [n * 2 for n in numbers]      # a full Python-level loop, one iteration at a time`}</CodeBox>

        <CodeBox label="NumPy — the same operation, vectorised">{`import numpy as np

numbers = np.arange(1_000_000)
doubled = numbers * 2                    # no explicit loop — operates on the WHOLE array at once`}</CodeBox>

        <Para>
          The NumPy version is not just shorter — it is typically <strong>10-100x faster</strong> for
          numeric work at this scale. The reason is structural: a NumPy array stores its numbers as a
          single contiguous block of raw memory (much closer to how C or Java store an array of numbers)
          rather than as a list of individually boxed Python objects, and operations like{' '}
          <code>* 2</code> run as a single, highly optimised loop written in C — this is called{' '}
          <strong>vectorisation</strong>, and it is the entire reason NumPy exists.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — NumPy Arrays" />
        <SectionTitle>The ndarray — NumPy's Core Data Structure</SectionTitle>

        <CodeBox label="Creating and inspecting arrays">{`import numpy as np

a = np.array([1, 2, 3, 4, 5])
print(a)             # [1 2 3 4 5]
print(a.shape)        # (5,) — a 1-dimensional array of 5 elements
print(a.dtype)         # int64 — every element shares ONE data type, unlike a Python list

matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(matrix.shape)   # (2, 3) — 2 rows, 3 columns`}</CodeBox>

        <Para>
          The single most important structural difference from a Python list: every element of a NumPy
          array shares exactly one <code>dtype</code> — you cannot freely mix an <code>int</code> and a{' '}
          <code>str</code> in the same array the way a Python list allows. This uniformity is precisely
          what makes the contiguous-memory, vectorised-operation model possible in the first place.
        </Para>

        <CodeBox label="Elementwise operations, no loop needed">{`prices = np.array([19.99, 29.99, 9.99, 49.99])

with_tax = prices * 1.08            # every element multiplied at once
print(with_tax)                      # [21.5892 32.3892 10.7892 53.9892]

print(prices[prices > 20])           # [29.99 49.99] — boolean indexing: filter by a condition, no loop`}</CodeBox>

        <SubTitle>Broadcasting — operating on arrays of different shapes</SubTitle>

        <Para>
          <strong>Broadcasting</strong> is the rule set NumPy uses to apply an operation between arrays
          of different shapes without requiring you to manually resize either one — in the example
          above, the single number <code>1.08</code> is automatically "stretched" to apply to every
          element of the <code>prices</code> array. Broadcasting extends to combining full arrays of
          compatible shapes too, and is genuinely central to writing idiomatic, loop-free NumPy code.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — pandas DataFrames" />
        <SectionTitle>Rows, Columns, and Labels — Built on Top of NumPy</SectionTitle>

        <Para>
          NumPy arrays are excellent for pure numeric data, but real-world data is usually{' '}
          <strong>tabular</strong> — rows and named columns, often with mixed types (text, numbers,
          dates) in the same table. <strong>pandas</strong> is built on top of NumPy specifically to
          handle this shape of data, centred on two core structures: <code>Series</code> (a single
          labelled column of data) and <code>DataFrame</code> (a full table — a collection of aligned{' '}
          <code>Series</code>).
        </Para>

        <CodeBox label="Creating a DataFrame">{`import pandas as pd

df = pd.DataFrame({
    "name": ["Keyboard", "Mouse", "Monitor"],
    "price": [79.99, 24.99, 249.99],
    "in_stock": [True, True, False],
})

print(df)
#        name   price  in_stock
# 0  Keyboard   79.99      True
# 1     Mouse   24.99      True
# 2   Monitor  249.99     False`}</CodeBox>

        <CodeBox label="Selecting, filtering, and computing">{`print(df["price"])              # a single column, as a Series
print(df[df["in_stock"]])       # rows where in_stock is True — boolean filtering, same idea as NumPy
print(df["price"].mean())       # 118.32333... — built-in aggregate methods
print(df["price"].sum())        # 354.97

df["price_with_tax"] = df["price"] * 1.08   # adding a new computed column, vectorised, no loop`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Reading Real Data" />
        <SectionTitle>pandas vs the csv Module for Real Files</SectionTitle>

        <Para>
          The CSV and JSON module covered earlier in this track handles files with plain Python data
          structures — lists of dicts. For genuinely tabular analysis work — filtering, aggregating,
          joining, computing statistics across thousands or millions of rows — pandas is usually the
          better tool, since it was purpose-built for exactly this.
        </Para>

        <CodeBox label="Reading a CSV — pandas vs the csv module">{`import csv
import pandas as pd

# The csv module — you get a list of dicts, and write your own loops for everything
with open("sales.csv") as f:
    rows = list(csv.DictReader(f))
total = sum(float(row["amount"]) for row in rows)

# pandas — one line to load, built-in vectorised aggregation
df = pd.read_csv("sales.csv")
total = df["amount"].sum()`}</CodeBox>

        <Para>
          The <code>csv</code> module remains the right choice for simple row-by-row processing,
          especially in a script with no other pandas dependency — pulling in pandas for a five-line
          script that reads one small file is unnecessary weight. pandas earns its place once the work
          genuinely involves analysis: grouping, joining multiple sources, computing statistics, or
          handling data too large to comfortably reason about with manual loops.
        </Para>

        <SubTitle>Grouping and aggregating — a genuinely common real task</SubTitle>

        <CodeBox label="groupby — the pandas equivalent of a SQL GROUP BY">{`df = pd.DataFrame({
    "category": ["electronics", "electronics", "office", "office"],
    "amount": [79.99, 249.99, 4.99, 12.99],
})

print(df.groupby("category")["amount"].sum())
# category
# electronics    329.98
# office          17.98`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Common Gotchas" />
        <SectionTitle>Two Warnings Every pandas Beginner Eventually Hits</SectionTitle>

        <Para>
          <strong>SettingWithCopyWarning</strong> is pandas' most infamous warning, and it confuses
          nearly everyone the first time they see it — it appears when pandas cannot tell for certain
          whether you are modifying the original DataFrame or a temporary copy of a slice of it.
        </Para>

        <CodeBox label="The warning in action">{`electronics = df[df["category"] == "electronics"]
electronics["amount"] = electronics["amount"] * 1.1
# SettingWithCopyWarning: A value is trying to be set on a copy of a slice from a DataFrame`}</CodeBox>

        <CodeBox label="The fix — be explicit about intent with .loc or .copy()">{`# If you intend to modify the ORIGINAL df:
df.loc[df["category"] == "electronics", "amount"] *= 1.1

# If you intend to work on an independent COPY:
electronics = df[df["category"] == "electronics"].copy()
electronics["amount"] = electronics["amount"] * 1.1   # no warning — pandas knows this is intentional`}</CodeBox>

        <Callout type="warning">
          <strong>"Chained indexing" — writing two square-bracket lookups back to back, like{' '}
          <code>df[condition]["column"] = value</code> — is the root cause of most{' '}
          SettingWithCopyWarning cases.</strong> Whether the first bracket returns a view or a copy of
          the original data is not always guaranteed, which is exactly why the warning exists. Use a
          single <code>.loc[row_condition, "column"]</code> call instead whenever you intend to modify
          the original DataFrame.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Replacing a 40-Minute Report Script With a 3-Second One, at a San Diego Marketing Analytics Company</SectionTitle>

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
            Scenario — Marketing analytics company, San Diego · Reporting pipeline
          </div>

          <Para>
            A weekly campaign-performance report reads a 2-million-row CSV using the standard{' '}
            <code>csv</code> module, computing per-campaign totals and averages with hand-written{' '}
            Python loops and dictionaries. The script takes 40 minutes to run, and every new metric
            requested by the marketing team means writing another manual loop.
          </Para>

          <CodeBox label="The original approach — manual loops over 2 million rows">{`totals = {}
counts = {}
with open("campaign_data.csv") as f:
    for row in csv.DictReader(f):
        campaign = row["campaign_id"]
        totals[campaign] = totals.get(campaign, 0) + float(row["spend"])
        counts[campaign] = counts.get(campaign, 0) + 1
averages = {c: totals[c] / counts[c] for c in totals}`}</CodeBox>

          <CodeBox label="Rewritten with pandas">{`df = pd.read_csv("campaign_data.csv")
summary = df.groupby("campaign_id")["spend"].agg(["sum", "mean", "count"])`}</CodeBox>

          <SubSubTitle>Why the difference was dramatic, not just stylistic</SubSubTitle>

          <Para>
            The pandas version runs in roughly 3 seconds instead of 40 minutes — the vectorised{' '}
            <code>groupby</code>/<code>agg</code> operations are implemented in optimised C code
            operating on contiguous memory, exactly as described in Part 01, instead of 2 million
            individual Python-level dictionary lookups and updates. Just as significantly for the team's
            day-to-day work, adding a new requested metric became a one-line change to the{' '}
            <code>.agg([...])</code> call instead of writing and testing an entirely new manual
            accumulation loop.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About NumPy and pandas</SectionTitle>

        {[
          {
            wrong: '"NumPy arrays are basically just faster Python lists"',
            right: 'The performance difference comes from a genuinely different underlying structure — a contiguous block of uniformly-typed raw memory, versus a list of individually boxed Python objects — which is what makes true vectorised, loop-free operations possible in the first place, not just a speed tweak on the same underlying model.',
          },
          {
            wrong: '"You should always reach for pandas instead of the csv module for anything involving a CSV file"',
            right: 'For simple row-by-row processing in a small script, the standard library csv module is lighter weight and perfectly sufficient. pandas earns its place specifically for genuine analysis work — grouping, aggregating, joining, or data large enough that manual loops become slow or unwieldy.',
          },
          {
            wrong: '"SettingWithCopyWarning means your code definitely has a bug"',
            right: 'It means pandas cannot be CERTAIN whether you are modifying the original data or an unintended copy — it is often a false alarm, but common enough as a real bug that it should never be ignored without understanding why it fired. Using .loc[...] for intentional modification, or .copy() for an intentional independent copy, resolves the ambiguity either way.',
          },
          {
            wrong: '"Vectorisation just means pandas/NumPy code runs on multiple CPU cores in parallel"',
            right: 'It means the operation runs as a single, tight, optimised loop written in C over contiguous memory — not necessarily multiple cores at all. That is a different, additional concept (parallelism, covered earlier in this track with multiprocessing) that some NumPy/pandas operations can ALSO take advantage of, but vectorisation itself is about avoiding slow Python-level looping, not about parallel cores specifically.',
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

      {/* ── Part 08 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Why is a NumPy array typically much faster than a Python list for numeric operations?',
            a: 'A NumPy array stores its elements as a contiguous block of uniformly-typed raw memory, and operations run as a single optimised loop implemented in C — versus a Python list, whose elements are individually boxed Python objects requiring a Python-level loop with real per-iteration overhead for equivalent operations. This is called vectorisation.',
          },
          {
            q: 'What is the relationship between pandas and NumPy?',
            a: 'pandas is built on top of NumPy, adding labelled rows/columns and support for tabular, often mixed-type data (Series for a single column, DataFrame for a full table) — NumPy alone is best suited to purely numeric array data without labels or mixed types.',
          },
          {
            q: 'When would you choose the standard library csv module over pandas for reading a CSV file?',
            a: 'For simple, small-scale row-by-row processing where pulling in pandas as a dependency is unnecessary weight — pandas is the better choice once the work involves genuine analysis (grouping, aggregating, joining) or data volumes where manual loops become slow.',
          },
          {
            q: 'What causes a SettingWithCopyWarning, and how do you resolve it?',
            a: 'It fires when pandas cannot determine with certainty whether an assignment is modifying the original DataFrame or an unintended temporary copy of a slice — commonly from "chained indexing" (df[condition]["col"] = value). Use .loc[row_condition, "col"] = value for an intentional modification of the original, or .copy() to work on an explicit, intentional independent copy.',
          },
          {
            q: 'What does "broadcasting" mean in NumPy?',
            a: 'The set of rules NumPy uses to apply an operation between arrays of different (but compatible) shapes without manually resizing either one — for example, multiplying an entire array by a single scalar number automatically applies that scalar to every element, without writing an explicit loop.',
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
        <SectionTitle>NumPy & pandas Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Writing a manual Python for loop over a NumPy array or pandas Series/column',
            a: 'This throws away the entire performance benefit of vectorisation — nearly any elementwise operation you would write as a manual loop has a vectorised equivalent (arithmetic operators, boolean filtering, built-in aggregate methods like .sum()/.mean()).',
          },
          {
            q: 'Using chained indexing (two square-bracket lookups back to back) and ignoring the resulting warning',
            a: 'This is the classic trigger for SettingWithCopyWarning, and the assignment may silently fail to modify the original DataFrame at all. Use a single .loc[condition, column] call instead.',
          },
          {
            q: 'Assuming every column in a DataFrame loaded from a CSV has the type you expect',
            a: 'pandas infers types automatically from the file, and a column intended as numeric can silently load as text (object dtype) if even one row contains a non-numeric value (like a stray "N/A"). Check df.dtypes after loading, especially for columns you plan to do arithmetic on.',
          },
          {
            q: 'Mixing types in what should be a purely numeric NumPy array',
            a: 'np.array([1, 2, "3"]) silently upcasts every element to a string dtype, since a NumPy array requires one shared dtype — subsequent arithmetic then fails or behaves unexpectedly. Validate/clean the input data before constructing the array if its numeric-ness is not guaranteed.',
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
        <SectionTitle>Errors You Will Hit With NumPy & pandas — And Exactly Why</SectionTitle>

        {[
          {
            error: `SettingWithCopyWarning: A value is trying to be set on a copy of a slice from a DataFrame`,
            cause: 'An assignment used chained indexing, and pandas cannot guarantee whether it modified the original DataFrame or a temporary copy.',
            fix: 'Use .loc[row_condition, "column"] = value for an intended modification of the original, or .copy() when an independent copy is actually intended.',
          },
          {
            error: `ValueError: operands could not be broadcast together with shapes (3,) (4,)`,
            cause: 'Two NumPy arrays with incompatible shapes were combined in an operation — broadcasting rules only allow certain shape combinations, and (3,) and (4,) are not among them.',
            fix: 'Confirm both arrays are meant to be the same length, or reshape one so its dimensions are actually broadcast-compatible with the other.',
          },
          {
            error: `KeyError: 'price'`,
            cause: 'Attempting to access a DataFrame column name that does not exist — often due to a typo, unexpected whitespace in the actual column header, or different capitalisation than expected.',
            fix: 'Print df.columns to see the exact column names as pandas actually parsed them from the source file.',
          },
          {
            error: `TypeError: can only concatenate str (not "int") to str`,
            cause: 'A column that was expected to be numeric was loaded as text (object dtype) because at least one row contained a non-numeric value, and an arithmetic operation was then attempted on it.',
            fix: 'Use pd.to_numeric(df["column"], errors="coerce") to convert it properly, turning any genuinely non-numeric values into NaN rather than crashing.',
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
        'NumPy arrays store uniformly-typed data in contiguous memory, enabling vectorised operations (a single optimised C loop) that are typically 10-100x faster than an equivalent Python-level loop.',
        'pandas is built on top of NumPy, adding labelled rows/columns and mixed-type tabular data support via Series (one column) and DataFrame (a full table).',
        'Prefer the standard library csv module for small, simple row-by-row scripts; reach for pandas once real analysis — grouping, aggregating, joining — or larger data volumes are involved.',
        'groupby()/.agg() is pandas\' equivalent of a SQL GROUP BY — computing per-group aggregates without writing manual accumulation loops.',
        'SettingWithCopyWarning signals ambiguity about whether an assignment targets the original data or a copy — resolve it with .loc[...] for an intentional original-data edit, or .copy() for an intentional independent copy.',
        'Vectorisation means avoiding slow Python-level looping via optimised C operations on contiguous memory — a distinct concept from multi-core parallelism, even though some operations can also benefit from both.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 44 puts everything from this phase together in a full, real project — building a
          complete command-line tool from scratch with argparse.
        </p>
        <Link href="/learn/python/building-a-cli-tool" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 44 → Building a CLI Tool
        </Link>
      </div>
    </LearnLayout>
  )
}
