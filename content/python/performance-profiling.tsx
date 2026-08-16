import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Python Performance — Profiling and Optimisation — Python | Chaduvuko',
  description:
    'Finding real bottlenecks before optimising anything — profiling tools and the optimisations that actually matter.',
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

export default function PerformanceProfiling() {
  return (
    <LearnLayout
      title="Python Performance — Profiling and Optimisation"
      description="Finding real bottlenecks before optimising anything — profiling tools and the optimisations that actually matter."
      section="Python — Module 42"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Measure First, Always" />
        <SectionTitle>The Single Rule That Matters More Than Any Optimisation Trick</SectionTitle>

        <Para>
          "Premature optimisation is the root of all evil" is one of the most quoted lines in software
          engineering, and it holds up: engineers routinely guess wrong about where a program's time is
          actually going, spend hours optimising a function that accounts for 2% of runtime, and leave
          the real bottleneck — often somewhere unremarkable-looking — completely untouched. The entire
          discipline of performance work starts with one rule: <strong>measure before you optimise
          anything</strong>.
        </Para>

        <Callout type="warning">
          <strong>Never optimise based on intuition alone.</strong> A profiler routinely reveals that the
          slow part of a program is not the nested loop everyone assumed, but a single innocuous-looking
          line — a repeated database call inside a loop, a list-membership check that quietly became
          O(n²), a logging call that serializes a huge object on every request. Guessing wastes engineer
          time and often makes the code more complex without making it any faster.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — cProfile" />
        <SectionTitle>Python's Built-In Profiler</SectionTitle>

        <Para>
          <code>cProfile</code> is part of the standard library — no installation required — and reports
          exactly how much time was spent in every function call across an entire program run.
        </Para>

        <CodeBox label="Profiling a script from the command line">{`python -m cProfile -s cumulative my_script.py`}</CodeBox>

        <CodeBox label="Profiling a specific function from within code">{`import cProfile

def process_all_records(records):
    return [transform(r) for r in records]

cProfile.run("process_all_records(records)")`}</CodeBox>

        <CodeBox label="Reading the output">{`         1000004 function calls in 2.145 seconds

   Ordered by: cumulative time

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.012    0.012    2.145    2.145 script.py:4(process_all_records)
   500000    1.203    0.000    1.980    0.000 script.py:8(is_duplicate)
   500000    0.777    0.000    0.777    0.000 {method 'append' of 'list' objects}
        1    0.153    0.153    0.153    0.153 script.py:2(load_records)`}</CodeBox>

        <Para>
          Two columns matter most. <code>tottime</code> is time spent inside that function{' '}
          <strong>alone</strong>, excluding time spent in functions it calls — this is what tells you
          where the actual work is happening. <code>cumtime</code> is <strong>cumulative</strong> time,
          including everything called from within that function — useful for seeing which top-level call
          chain is expensive overall, even if the time is really being spent several calls deeper.
          Sorting by <code>cumulative</code> (as in the command above) surfaces the functions worth
          investigating first.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Big-O Intuition, Applied to Real Code" />
        <SectionTitle>Recognising an Accidental O(n²) Before It Becomes a Production Problem</SectionTitle>

        <Para>
          A profiler tells you <em>where</em> time is going; understanding algorithmic complexity tells
          you <em>why</em> a specific piece of code is disproportionately slow, and whether that slowness
          will get catastrophically worse as data grows — not just annoyingly slower.
        </Para>

        <CodeBox label="A deduplication function that looks reasonable">{`def is_duplicate(record, seen):
    return record["id"] in seen           # membership check on a LIST

def deduplicate(records):
    seen = []
    result = []
    for record in records:
        if not is_duplicate(record, seen):
            result.append(record)
            seen.append(record["id"])
    return result`}</CodeBox>

        <Para>
          <code>x in a_list</code> scans the list from the start until it finds a match or reaches the
          end — an O(n) operation on its own. Called once, that is fine. Called once{' '}
          <em>per record, inside a loop over every record</em>, with <code>seen</code> growing by one
          each iteration, the total cost becomes O(n²): for 500,000 records, roughly 500,000 × (up to
          500,000) comparisons in the worst case — exactly the kind of function{' '}
          <code>cProfile</code> would flag with a suspiciously large <code>tottime</code> for what looks
          like a trivial one-line check.
        </Para>

        <CodeBox label="The fix — a set instead of a list">{`def deduplicate(records):
    seen = set()          # membership check is O(1) on average, not O(n)
    result = []
    for record in records:
        if record["id"] not in seen:
            result.append(record)
            seen.add(record["id"])
    return result

# Same logic, same result — O(n) overall instead of O(n²).
# On 500,000 records, this is the difference between roughly 5 seconds and
# a genuinely unusable multi-minute runtime.`}</CodeBox>

        <Callout type="tip">
          <strong>The specific fix above — a <code>set</code> instead of a <code>list</code> for
          membership checks — is one of the single most common, highest-leverage optimisations in real
          Python code.</strong> Any time you see <code>x in some_list</code> inside a loop, ask whether{' '}
          <code>some_list</code> could become a <code>set</code> (or <code>dict</code> keys, when values
          are also needed) instead — the fix is usually a one-line change with a dramatic effect at
          scale.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — timeit for Micro-Benchmarks" />
        <SectionTitle>Comparing Two Small Alternatives Precisely</SectionTitle>

        <Para>
          <code>cProfile</code> is the right tool for finding where time goes across a whole program.{' '}
          <code>timeit</code> is the right tool for a much narrower question: "which of these two small
          snippets is actually faster?" — it runs a snippet many times and reports precise, averaged
          timing, avoiding the noise a single manual timing run would have.
        </Para>

        <CodeBox label="Comparing string concatenation approaches">{`import timeit

def concat_with_plus():
    result = ""
    for i in range(1000):
        result += str(i)
    return result

def concat_with_join():
    return "".join(str(i) for i in range(1000))

print(timeit.timeit(concat_with_plus, number=1000))    # e.g. 0.412 seconds total
print(timeit.timeit(concat_with_join, number=1000))     # e.g. 0.187 seconds total — clearly faster`}</CodeBox>

        <Para>
          This confirms a well-known Python performance fact directly: repeated <code>+=</code> string
          concatenation in a loop creates a new string object on every iteration (strings are immutable,
          covered back in the Strings module), while <code>"".join(...)</code> builds the result once —{' '}
          <code>timeit</code> is how you verify a claim like this empirically rather than trusting it as
          folklore.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — A Decision Framework" />
        <SectionTitle>Data Structure, Algorithm, Caching, or Leave It Alone</SectionTitle>

        <Para>
          Once a real bottleneck is identified (via profiling, never guessing), there are only a handful
          of genuinely different categories of fix — recognising which one applies avoids wasted effort
          on the wrong kind of change.
        </Para>

        <CodeBox label="A practical decision order">{`1. Wrong data structure?
   -> list membership checks in a loop, linear search for something a dict/set
      would find in O(1) — usually the highest-leverage, lowest-risk fix.

2. Wrong algorithm?
   -> nested loops that could be restructured (e.g. sorting once instead of
      repeatedly scanning), redundant repeated work that could be computed once.

3. Repeated expensive work with the same inputs?
   -> functools.lru_cache (covered in the Decorators module) or a manual cache,
      IF the function is pure (same input always -> same output) and called
      repeatedly with overlapping inputs.

4. Genuinely CPU-bound work at the limits of what pure Python can do?
   -> reach for NumPy/pandas (next module) for vectorised numeric work, or
      multiprocessing (covered earlier in this phase) for true parallelism.

5. Is it actually a problem worth fixing at all?
   -> a function that runs once at startup taking 200ms extra is very often
      not worth any engineering time, no matter how "inefficient" it looks.`}</CodeBox>

        <Callout type="tip">
          <strong>Step 5 is not a throwaway line.</strong> A genuinely common mistake among engineers new
          to performance work is optimising code that does not matter — a script run once a day, a
          function contributing 0.01% of total request time — while the actual user-facing slowness
          remains unaddressed. Profiling data, not intuition or a general sense that code "looks slow,"
          should be what decides where optimisation effort goes.
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
        <SectionTitle>A Nightly Batch Job That Grew From 5 Minutes to 3 Hours, at a Phoenix Retail Analytics Company</SectionTitle>

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
            Scenario — Retail analytics company, Phoenix · Performance escalation
          </div>

          <Para>
            A nightly job deduplicating that day's transaction records ran in 5 minutes when it was
            written, against a modest dataset. A year of organic business growth later, it takes over 3
            hours and increasingly threatens to miss its overnight processing window entirely. Two
            engineers separately assume, without profiling, that the database write step must be the
            bottleneck and spend a day investigating batch-write tuning with no meaningful improvement.
          </Para>

          <CodeBox label="What cProfile actually revealed, once someone finally ran it">{`   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
   2000000    847.2    0.000   847.2    0.000 dedupe.py:12(is_duplicate)
        1      0.4      0.4     3.1      3.1 dedupe.py:31(write_to_database)`}</CodeBox>

          <SubSubTitle>The actual bottleneck, and why it had been invisible for a year</SubSubTitle>

          <Para>
            <code>is_duplicate</code> — a small, unremarkable-looking helper checking membership against
            a plain Python list — accounted for over 99% of total runtime, not the database write step
            everyone had assumed. The bug had existed since the code was first written; it was simply
            invisible when the dataset was small enough that O(n²) still finished in seconds. As the
            business grew and transaction volume grew with it, the same unchanged code silently crossed
            from "fine" to "the single largest operational risk in the nightly pipeline," with no code
            change ever having introduced the regression — only data volume did.
          </Para>

          <CodeBox label="The fix — switching the membership check to a set, exactly as in Part 03">{`seen = set()   # was: seen = []
# ...
if record["id"] not in seen:   # now O(1) instead of O(n)`}</CodeBox>

          <Para>
            The job's runtime dropped from over 3 hours back to under 2 minutes — faster than its
            original 5-minute runtime a year earlier, since the fixed version now scales linearly instead
            of quadratically. The team's retrospective conclusion: "an hour with a profiler would have
            found this on day one of the slowdown; a full day of tuning the wrong subsystem found
            nothing, because nobody had actually measured where the time was going."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Performance Work</SectionTitle>

        {[
          {
            wrong: '"An experienced engineer can usually guess where the bottleneck is without profiling"',
            right: 'Even experienced engineers guess wrong regularly — as shown in the Real World example above, two engineers independently assumed the database write was the problem and spent a full day on the wrong subsystem. Profiling data beats intuition consistently enough that skipping it is considered a real mistake, not a shortcut.',
          },
          {
            wrong: '"Big-O complexity is mostly academic and rarely matters in real production code"',
            right: 'An accidental O(n²) in unremarkable-looking code (like a list membership check inside a loop) is one of the most common real production performance bugs, and it gets dramatically worse — not just linearly worse — as data volume grows, exactly as the Real World example demonstrates.',
          },
          {
            wrong: '"tottime and cumtime in a cProfile report mean basically the same thing"',
            right: 'tottime is time spent inside that function alone, excluding calls it makes to other functions — it tells you where actual work is happening. cumtime includes everything called from within it, useful for seeing which top-level call is expensive overall even if the real cost is several calls deeper.',
          },
          {
            wrong: '"Caching a function with @lru_cache is always safe to add for a performance win"',
            right: 'It is only correct for a PURE function — one where the same inputs always produce the same output, with no side effects. Caching a function that depends on changing external state (the current time, a database that might be updated) can return stale, incorrect results.',
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
            q: 'What is the single most important rule in performance optimisation work?',
            a: 'Measure before optimising anything — use a profiler to find the actual bottleneck rather than guessing. Engineers routinely guess wrong about where time is going, and optimising the wrong part wastes effort while leaving the real problem untouched.',
          },
          {
            q: 'What is the difference between tottime and cumtime in a cProfile report?',
            a: 'tottime is time spent inside that specific function alone, excluding any functions it calls — it identifies where actual work happens. cumtime is cumulative, including time spent in everything that function calls, useful for identifying which overall call chain is expensive even if the real cost is nested several calls deep.',
          },
          {
            q: 'Why does checking membership with "x in a_list" inside a loop often become a serious performance problem at scale?',
            a: 'A single "in" check on a list is O(n). Repeated once per item in a loop over n items (with the list growing alongside it, as in a deduplication pattern) makes the total cost O(n²) — quadratic growth means the runtime does not just get proportionally slower as data grows, it gets DISPROPORTIONATELY slower, which is exactly why a function that was fine on a small dataset can become the dominant bottleneck once data volume grows.',
          },
          {
            q: 'What is the fix for an O(n²) list-membership pattern, and why does it work?',
            a: 'Replace the list with a set (or dict, if values are also needed) — membership checks against a set are O(1) on average, using hashing rather than a linear scan, so the overall loop becomes O(n) instead of O(n²). This is one of the highest-leverage, lowest-risk optimisations in real Python code.',
          },
          {
            q: 'When is it appropriate to skip optimising code, even if a profiler shows it is technically inefficient?',
            a: 'When the actual absolute cost does not matter for the use case — a function contributing a negligible fraction of total runtime, or code that runs rarely (e.g. once at startup) where a fraction of a second has no real user-facing impact. Optimisation effort should be driven by actual measured impact, not by code merely looking inefficient.',
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
        <SectionTitle>Performance Work Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Optimising based on intuition instead of profiler data',
            a: 'Leads to spending real engineering time on code that was never the actual bottleneck, exactly as shown by the two engineers in the Real World example who tuned database writes while the real cost was a list membership check.',
          },
          {
            q: 'Using timeit to measure something that should be profiled with cProfile instead',
            a: 'timeit is for comparing small, isolated snippets precisely — it is the wrong tool for finding which function, among many, is responsible for a whole program\'s slowness. Use cProfile for that broader question.',
          },
          {
            q: 'Adding @lru_cache to a function with side effects or non-deterministic output',
            a: 'Caching assumes the same inputs always produce the same output — applying it to a function that reads changing external state (current time, a mutable database) can silently return stale, incorrect results instead of a performance win.',
          },
          {
            q: 'Rewriting an algorithm for performance before confirming it is actually the bottleneck',
            a: 'A more "clever" or complex algorithm is not automatically faster in practice, and adds real maintenance cost — always confirm via profiling that the rewrite target is genuinely where time is going before investing effort in restructuring it.',
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
        <SectionTitle>Issues You Will Hit With Profiling & Performance — And Exactly Why</SectionTitle>

        {[
          {
            error: `A profiled run takes noticeably longer than the unprofiled program`,
            cause: 'cProfile itself adds measurement overhead to every function call — this is expected and normal, and does not indicate a real additional bug; the RELATIVE proportions between functions in the report are what matter, not the absolute profiled runtime.',
            fix: 'Compare functions\' relative tottime/cumtime to each other within the same profiled run, not the profiled run\'s total time to the unprofiled program\'s total time.',
          },
          {
            error: `The profiler shows time concentrated in a built-in function like {method \\'append\\' of \\'list\\' objects}`,
            cause: 'The reported time is genuinely being spent inside that many calls to a built-in operation — often because it is being called an enormous number of times, not because any single call is slow.',
            fix: 'Look at ncalls for that line — an unexpectedly huge call count is usually the real signal, pointing to a loop structure worth reconsidering rather than the built-in operation itself.',
          },
          {
            error: `Two runs of the same code report meaningfully different timings with timeit`,
            cause: 'Background system load, CPU frequency scaling, or other processes running on the same machine can introduce noise into wall-clock timing measurements.',
            fix: 'Increase the "number" argument to run more iterations, and prefer the built-in "min" of multiple timeit.repeat() runs over a single timeit.timeit() call for a more stable result.',
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
        'Always measure before optimising — a profiler finds the real bottleneck; intuition frequently guesses wrong, wasting effort on code that was never the actual problem.',
        'cProfile reports tottime (time in a function alone) and cumtime (including everything it calls) — sort by cumulative to find the most expensive call chains first.',
        'A membership check (x in a_list) inside a loop over a growing list is a classic accidental O(n²) — switching to a set makes it O(1) per check, one of the highest-leverage fixes in real Python code.',
        'timeit is for precise micro-benchmarks comparing small alternatives; cProfile is for finding where time goes across a whole program — they answer different questions.',
        '@functools.lru_cache is a fast, safe win only for pure functions (same input always produces the same output) — never for functions with side effects or dependence on changing external state.',
        'Not every "inefficient-looking" piece of code is worth optimising — let measured, real-world impact decide where performance effort actually goes.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 43 introduces NumPy and pandas — the bridge from core Python into real data work, and
          why vectorised operations exist at all.
        </p>
        <Link href="/learn/python/numpy-pandas-intro" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 43 → Intro to NumPy and pandas
        </Link>
      </div>
    </LearnLayout>
  )
}
