import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Generators and yield — Python | Chaduvuko',
  description:
    'How yield actually pauses and resumes a function, generator expressions, memory-efficient lazy evaluation, yield from, and when you genuinely still need a list.',
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

export default function GeneratorsYield() {
  return (
    <LearnLayout
      title="Generators and yield"
      description="How yield actually pauses and resumes a function, generator expressions, memory-efficient lazy evaluation, and yield from."
      section="Python — Module 28"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Generator Function Is" />
        <SectionTitle>A Function With yield Does Not Return a Value — It Returns a Generator</SectionTitle>

        <Para>
          Module 27 ended with a promise: everything you built by hand with{' '}
          <code>DateRangeIterator</code> — a class implementing <code>__iter__</code> and{' '}
          <code>__next__</code>, tracking its own state between calls — Python can give you almost for
          free, with a single keyword. That keyword is <code>yield</code>.
        </Para>

        <Para>
          A <strong>generator function</strong> is any function whose body contains at least one{' '}
          <code>yield</code> statement. Calling it does <strong>not</strong> run the function body at
          all — it immediately returns a <strong>generator object</strong>, which is a real, genuine
          iterator, automatically satisfying the entire iterator protocol from Module 27 without you
          writing a single <code>__next__</code> method.
        </Para>

        <CodeBox label="Calling a generator function does not run its body">{`def count_up_to(limit):
    print("Starting the count!")
    n = 1
    while n <= limit:
        yield n
        n += 1

gen = count_up_to(3)
print(gen)   # <generator object count_up_to at 0x...> — no "Starting the count!" printed yet!
print(type(gen))   # <class 'generator'>`}</CodeBox>

        <Para>
          Nothing inside <code>count_up_to</code> has executed yet — not even the{' '}
          <code>print("Starting the count!")</code> on the very first line. Calling a generator
          function only creates the generator object; the body starts running only once you begin
          pulling values from it, which is the entire subject of Part 02.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — How yield Pauses and Resumes" />
        <SectionTitle>The Mechanism That Trips Up Almost Everyone at First</SectionTitle>

        <Para>
          Here is the part that takes real effort to internalize, because nothing else in Python
          behaves quite like it. When you call <code>next()</code> on a generator, the function body
          starts running from the top — and runs until it hits a <code>yield</code> statement. At that
          exact point, execution <strong>pauses</strong>, the yielded value is handed back to whoever
          called <code>next()</code>, and — critically — every local variable and the exact line the
          function was on are <strong>frozen in place</strong>, preserved completely. The next call to{' '}
          <code>next()</code> does not restart the function; it <strong>resumes</strong> execution
          exactly where it left off, right after that <code>yield</code>.
        </Para>

        <CodeBox label="Watching the pause-and-resume mechanism directly">{`gen = count_up_to(3)

print(next(gen))
# Starting the count!     <- the function body finally starts running
# 1                        <- runs until "yield n" with n=1, then PAUSES here

print(next(gen))
# 2                        <- RESUMES right after "yield", runs "n += 1", loops, hits yield again

print(next(gen))
# 3                        <- same thing again

print(next(gen))
# StopIteration            <- the while loop condition is now False, function falls off the end`}</CodeBox>

        <Para>
          This is fundamentally different from a normal function call, where every call starts fresh
          from line one with no memory of any previous call. A generator function&apos;s local state —
          every variable, its current position in a loop, everything — survives between calls to{' '}
          <code>next()</code>, held in suspended animation. This is, under the hood, exactly how the
          Python interpreter implements <code>__next__</code> for you automatically: it is genuinely
          running your function&apos;s bytecode, pausing it mid-execution, and resuming it later,
          something ordinary function calls simply cannot do.
        </Para>

        <Callout type="tip">
          <strong>A useful mental model:</strong> think of <code>yield</code> as a return statement that
          leaves a bookmark. It hands back a value like <code>return</code> does, but instead of the
          function ending and forgetting everything, it bookmarks the exact spot, and the next{' '}
          <code>next()</code> call picks the bookmark back up and keeps going as if nothing happened in
          between.
        </Callout>

        <Para>
          Once the function body reaches its natural end — falls off the bottom, or hits an explicit{' '}
          <code>return</code> with no value — the generator raises <code>StopIteration</code>, exactly
          like any other exhausted iterator from Module 27. A <code>return</code> statement inside a
          generator does not send back a normal return value the way it would in a regular function; it
          simply ends the generator.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Generator Expressions" />
        <SectionTitle>The Lazy Cousin of the List Comprehension</SectionTitle>

        <Para>
          Module 12 covered list comprehensions in depth: <code>[x**2 for x in range(10)]</code>{' '}
          builds the entire list immediately, in memory, all at once. A <strong>generator
          expression</strong> uses nearly identical syntax — parentheses instead of square brackets —
          but produces values lazily, one at a time, exactly like a generator function does.
        </Para>

        <CodeBox label="List comprehension vs generator expression — syntax and behaviour">{`squares_list = [x**2 for x in range(1_000_000)]     # built ENTIRELY, right now, in memory
squares_gen  = (x**2 for x in range(1_000_000))     # produces nothing yet — lazy

print(type(squares_list))   # <class 'list'>
print(type(squares_gen))    # <class 'generator'>

print(next(squares_gen))    # 0   — the FIRST value, computed only now
print(next(squares_gen))    # 1
print(next(squares_gen))    # 4`}</CodeBox>

        <Para>
          Every rule from Module 27 about iterators applies directly: a generator expression is a
          single-pass iterator, exhausted after one full loop, and cannot be rewound or reused. It also
          supports every comprehension feature you already know — an <code>if</code> filter clause,
          nested loops, and multiple <code>for</code> clauses — the syntax carries over completely.
        </Para>

        <CodeBox label="A filtered generator expression — same syntax as a list comprehension">{`# Only even squares, computed lazily
even_squares = (x**2 for x in range(20) if x % 2 == 0)
print(list(even_squares))   # [0, 4, 16, 36, 64, 100, 144, 196, 256, 324]`}</CodeBox>

        <Callout type="info">
          <strong>A genuinely useful shortcut:</strong> a generator expression passed as the{' '}
          <strong>sole</strong> argument to a function does not need its own parentheses —{' '}
          <code>sum(x**2 for x in range(10))</code> works directly, without writing{' '}
          <code>sum((x**2 for x in range(10)))</code>. This is extremely common in real code with{' '}
          <code>sum()</code>, <code>any()</code>, <code>all()</code>, <code>max()</code>, and{' '}
          <code>min()</code>, since none of them need the intermediate values stored anywhere — they
          consume the generator one value at a time as they go.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Memory Efficiency" />
        <SectionTitle>Why This Actually Matters — A Concrete Memory Comparison</SectionTitle>

        <Para>
          This is not an abstract, academic distinction. Imagine processing a 4 GB production log file,
          extracting every line that contains the string <code>&quot;ERROR&quot;</code>. A list
          comprehension approach loads the <strong>entire</strong> file into memory before you can even
          start looking at the first error line. A generator processes the file <strong>one line at a
          time</strong>, holding only the current line in memory, no matter how large the file is.
        </Para>

        <CodeBox label="The list comprehension approach — loads everything, all at once">{`def get_error_lines_list(filepath):
    with open(filepath) as f:
        return [line for line in f if "ERROR" in line]
        # Every single line of the file is read AND kept in memory before this
        # function even returns — for a 4 GB file, that is roughly 4 GB of RAM.`}</CodeBox>

        <CodeBox label="The generator approach — one line in memory at a time, regardless of file size">{`def get_error_lines_gen(filepath):
    with open(filepath) as f:
        for line in f:
            if "ERROR" in line:
                yield line
        # At any given moment, only the current line exists in memory.
        # A 4 GB file and a 4 MB file consume roughly the SAME peak memory here.

for error_line in get_error_lines_gen("app.log"):
    process(error_line)   # each line is handled and then can be garbage collected`}</CodeBox>

        <Para>
          The trade-off is real, not free: the generator version is typically slightly slower for
          <em> small</em> inputs, because of the pause/resume overhead on every single value, and it
          cannot be indexed, sliced, or looped over twice. But for anything genuinely large — log
          files, database result sets, API pagination, huge CSVs — the memory savings are not a minor
          optimization; they are frequently the difference between a script that runs and a script that
          gets killed by the operating system for exhausting available memory.
        </Para>

        <Callout type="warning">
          <strong>A generator does not make a slow operation fast.</strong> It changes <em>when</em>{' '}
          work happens (spread out, one item at a time) and how much memory is held at once — it does
          not reduce the total amount of computation. If you need every value processed regardless, a
          generator and a list will eventually do the same total work; the generator just never needs
          to hold all the results at once.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — yield from" />
        <SectionTitle>Delegating to a Sub-Generator</SectionTitle>

        <Para>
          <code>yield from</code> hands off iteration to another iterable or generator entirely,
          yielding every value it produces in turn — without writing a manual{' '}
          <code>for ... yield</code> loop around it. It is syntactic sugar, but genuinely useful sugar
          that shows up constantly once generators start composing with each other.
        </Para>

        <CodeBox label="Without yield from — a manual loop">{`def chain_manual(*iterables):
    for iterable in iterables:
        for item in iterable:
            yield item

list(chain_manual([1, 2], "ab", (True, False)))
# [1, 2, 'a', 'b', True, False]`}</CodeBox>

        <CodeBox label="With yield from — the same behaviour, more directly">{`def chain_delegated(*iterables):
    for iterable in iterables:
        yield from iterable

list(chain_delegated([1, 2], "ab", (True, False)))
# [1, 2, 'a', 'b', True, False] — identical result`}</CodeBox>

        <Para>
          This is genuinely more than a shorthand for a nested loop once you have generators calling
          other generators — a common shape when a large task is naturally broken into smaller
          sub-tasks, each expressed as its own generator function.
        </Para>

        <CodeBox label="A generator delegating to sub-generators, each handling one piece of work">{`def read_section(name, rows):
    for row in rows:
        yield f"[{name}] {row}"

def read_full_report():
    yield from read_section("summary", ["total: 1200", "errors: 3"])
    yield from read_section("details", ["row A", "row B"])

for line in read_full_report():
    print(line)
# [summary] total: 1200
# [summary] errors: 3
# [details] row A
# [details] row B`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Worked Example" />
        <SectionTitle>Lazily Reading a Huge CSV File</SectionTitle>

        <Para>
          Modules 15 and 16 covered reading files and working with CSV data. Here is where generators
          make that combination genuinely production-grade: a function that reads a large CSV file and
          yields one parsed row at a time, using the <code>csv</code> module, never holding the whole
          file&apos;s rows in memory at once.
        </Para>

        <CodeBox label="A lazy CSV row reader, filtering and transforming as it goes">{`import csv

def read_high_value_orders(filepath, minimum_total):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            total = float(row["total"])
            if total >= minimum_total:
                yield {
                    "order_id": row["order_id"],
                    "customer": row["customer"],
                    "total": total,
                }

# Nothing is read from disk until you actually start pulling values:
for order in read_high_value_orders("orders_2026.csv", minimum_total=500):
    send_to_fulfillment_priority_queue(order)
    # Each row is read from disk, parsed, filtered, and processed — one at a time.
    # A 10-million-row CSV and a 10-row CSV use roughly the same peak memory here.`}</CodeBox>

        <Para>
          Notice that this reads exactly like a normal function using a normal <code>for</code> loop —
          the laziness is invisible at the call site, entirely a consequence of the single{' '}
          <code>yield</code> keyword inside. This is a genuinely important property of generators: the
          calling code does not need to know or care whether it is looping over a list or a generator —
          the <code>for order in ...</code> syntax is identical either way, exactly because generators
          fully satisfy the iterator protocol from Module 27.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — When You Actually Need a List" />
        <SectionTitle>Generators Are Not Always the Right Tool</SectionTitle>

        <Para>
          Reaching for a generator by default, everywhere, is its own mistake. A list is the right
          choice whenever you genuinely need any of the things a single-pass iterator cannot give you:
        </Para>

        <CodeBox label="Things that require a list (or another concrete collection), not a generator">{`data_gen = (x for x in range(10))

len(data_gen)          # TypeError — generators have no length; there is no way to
                        # know how many items remain without consuming them

data_gen[3]              # TypeError — generators cannot be indexed or sliced;
                          # there is no random access, only "the next value"

for x in data_gen: ...   # first pass — fully consumes it
for x in data_gen: ...   # second pass — produces NOTHING; already exhausted`}</CodeBox>

        <Para>
          If you need to know how many items there are before processing them, need to access items
          out of order, or need to loop over the same data more than once, materialize it into a list
          (or another concrete collection) up front. The honest rule of thumb: use a generator when
          data is large, processed once, and processed in order — use a list when you need to inspect,
          index, measure, or revisit it.
        </Para>

        <Callout type="tip">
          A common, genuinely good middle ground: write the core logic as a generator, and let the
          caller decide whether they need a list. <code>results = list(my_generator_function(...))</code>{' '}
          converts lazily-produced values into a concrete, reusable list exactly when needed — without
          forcing the generator function itself to choose eagerness for every caller, including the
          ones who only needed to loop once.
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
        <SectionTitle>The Out-of-Memory Kill at a Raleigh Healthcare Data Company</SectionTitle>

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
            Scenario — Healthcare data company, Raleigh · Production outage
          </div>

          <Para>
            A Raleigh-based healthcare data company runs a nightly job that processes appointment logs
            from every clinic location, looking for scheduling anomalies. It had worked fine for a
            year, running against a few hundred thousand rows a night. After onboarding several new
            hospital systems at once, the nightly job started failing — the container running it was
            being killed by the cloud provider&apos;s out-of-memory monitor partway through.
          </Para>

          <CodeBox label="The original job — worked fine until the data grew">{`def load_appointments(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        return [row for row in reader]   # the ENTIRE file, all at once, in memory

def find_anomalies(filepath):
    appointments = load_appointments(filepath)   # 40M+ rows, now — several GB
    return [a for a in appointments if is_suspicious(a)]`}</CodeBox>

          <SubSubTitle>Why it broke, and why it took a week to diagnose</SubSubTitle>

          <Para>
            The bug was invisible in code review — nothing about <code>load_appointments</code> looks
            wrong; it is a completely ordinary list comprehension, exactly the pattern taught in Module
            12. The problem only exists at scale: once the combined appointment logs crossed several
            gigabytes, holding the entire parsed list in memory — on top of the second list comprehension
            building a filtered copy — exceeded the container&apos;s memory limit before the job could
            finish.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team rewrote <code>load_appointments</code> as a generator function, exactly following
            Part 06&apos;s pattern, and changed <code>find_anomalies</code> to consume it lazily instead
            of materializing a full list at either stage.
          </Para>

          <CodeBox label="The fix — generators end to end, one appointment in memory at a time">{`def load_appointments(filepath):
    with open(filepath, newline="") as f:
        reader = csv.DictReader(f)
        yield from reader   # yield from Part 05 — delegates row by row

def find_anomalies(filepath):
    for appointment in load_appointments(filepath):
        if is_suspicious(appointment):
            yield appointment   # still lazy — the CALLER decides whether to
                                  # materialize this into a list or stream it further`}</CodeBox>

          <Para>
            Peak memory usage dropped from several gigabytes to a few megabytes, and the job&apos;s
            runtime barely changed — the total amount of work was identical, exactly as the Callout in
            Part 04 explains. The only thing that changed was <em>when</em> each row&apos;s memory was
            allocated and released, which is precisely the trade-off this module is built around.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Generators</SectionTitle>

        {[
          {
            wrong: '"Calling a generator function runs its code immediately, just like a normal function"',
            right: 'Calling a generator function only CREATES a generator object — none of the function body runs until you start pulling values from it with next() or a for loop, as demonstrated in Part 01, where even the first print() statement is deferred.',
          },
          {
            wrong: '"Generators are always faster than building a list"',
            right: 'Generators do not reduce total computation — they change WHEN work happens and how much memory is held at once, not how much work there is overall, as covered directly in Part 04. For small inputs, the pause/resume mechanism actually adds a small amount of overhead compared to a plain list comprehension.',
          },
          {
            wrong: '"A generator, once created, can be looped over as many times as a list can"',
            right: 'A generator is a single-pass iterator, exactly like the iterators from Module 27 — once exhausted, looping over it again produces nothing, silently, with no error. If you need multiple passes, convert it to a list once with list(my_generator) and reuse the resulting list.',
          },
          {
            wrong: '"yield and return do basically the same thing inside a function"',
            right: 'return ends a function immediately and hands back a single value, forgetting all local state. yield pauses the function, hands back one value, and PRESERVES every local variable so execution can resume from that exact point on the next call — a fundamentally different mechanism, not just different syntax for the same idea.',
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
            q: 'What is a generator function, and what does calling one actually return?',
            a: 'A generator function is any function containing at least one yield statement. Calling it does not run the function body — it immediately returns a generator object, a genuine iterator satisfying the full iterator protocol (__iter__ and __next__) automatically, without the function author writing either method by hand.',
          },
          {
            q: 'Explain exactly what happens when yield is reached during execution.',
            a: 'Execution pauses at that exact line, the yielded value is handed back to whoever called next(), and every local variable plus the current execution position are preserved. The next call to next() does not restart the function — it resumes execution immediately after the yield statement, continuing with all local state intact, until the next yield, a return, or the function naturally ends (either of which raises StopIteration).',
          },
          {
            q: 'Why are generators more memory-efficient than building a list for large datasets, and what is the actual trade-off?',
            a: 'A list comprehension builds and holds every result in memory at once. A generator produces one value at a time, only holding the current item\'s state in memory, regardless of how large the overall dataset is. The trade-off is that generators cannot be indexed, sliced, measured with len(), or looped over more than once — and for small datasets, the pause/resume mechanism can be marginally slower than simply building a list upfront.',
          },
          {
            q: 'What is the difference between a generator expression and a list comprehension?',
            a: 'They use nearly identical syntax — parentheses instead of square brackets — and support the same for/if clauses. A list comprehension evaluates eagerly, building the full list immediately. A generator expression evaluates lazily, producing each value only when requested via next() or iteration, and like any generator, is exhausted after a single pass.',
          },
          {
            q: 'What does yield from do, and why would you use it instead of a manual nested for loop?',
            a: 'yield from delegates iteration to another iterable or generator, yielding every value it produces in turn, without writing an explicit "for item in iterable: yield item" loop. It is especially useful when generators compose — a larger generator function delegating to several smaller sub-generators, each handling one piece of a larger task, as shown with read_full_report() delegating to read_section() in Part 05.',
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
        <SectionTitle>Generator Mistakes That Cause Genuinely Confusing Bugs</SectionTitle>

        {[
          {
            q: 'Trying to call len() or index into a generator',
            a: 'Both raise TypeError — a generator has no way to know its total length without consuming itself, and has no random access to arbitrary positions. If you need either capability, convert it to a list first with list(my_generator).',
          },
          {
            q: 'Reusing a generator object after it has already been fully consumed',
            a: 'Silently produces nothing on the second pass, exactly like any exhausted iterator from Module 27 — no error is raised. If you need to loop over the same data twice, call the generator FUNCTION again to get a fresh generator object, or materialize the results into a list once.',
          },
          {
            q: 'Expecting print() statements or side effects inside a generator to run immediately when it is defined or called',
            a: 'Nothing in a generator function\'s body executes until you start pulling values from it, as shown in Part 01 — a common source of confusion when debugging code that appears to "do nothing" until a for loop or next() call actually consumes it.',
          },
          {
            q: 'Mixing up when a generator expression needs its own parentheses',
            a: 'sum(x for x in range(10)) works without extra parentheses because the generator expression is the SOLE argument. But list(x for x in range(10), other_arg) needs its own explicit parentheses once there is more than one argument: list((x for x in range(10)), other_arg).',
          },
          {
            q: 'Using return with a value inside a generator function, expecting it to work like a normal function return',
            a: 'A generator\'s return statement (with or without a value) simply ends the generator, raising StopIteration — it does NOT hand the value back through next() or a for loop the way a return does in a normal function. Values in a generator can only be surfaced through yield.',
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
        <SectionTitle>Errors You Will Hit With Generators — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: object of type 'generator' has no len()`,
            cause: 'len() was called on a generator object — generators have no concept of a fixed length, since they may produce values lazily, computed on demand, without ever knowing the total count in advance.',
            fix: 'Convert to a list first if you need a count: count = len(list(my_generator())). Better yet, if you only need the count, use sum(1 for _ in my_generator()) to avoid holding every value in memory at once.',
          },
          {
            error: `TypeError: 'generator' object is not subscriptable`,
            cause: 'An attempt to index or slice a generator directly, e.g. my_gen[0] — generators support only sequential access via next(), never random access by position.',
            fix: 'Convert to a list first if indexing is genuinely needed: items = list(my_generator()); items[0]. If only the first value is needed, next(my_generator()) avoids materializing the rest.',
          },
          {
            error: `RuntimeError: generator raised StopIteration`,
            cause: 'A StopIteration exception was raised (often accidentally, from a nested next() call without a default) and allowed to propagate out of a generator function\'s body — Python 3.7+ deliberately converts this into a RuntimeError, because letting a real StopIteration escape a generator would silently and incorrectly end an enclosing loop.',
            fix: 'Never let a bare StopIteration escape a generator function\'s body. If calling next() manually inside a generator, always supply a default value: next(inner_iterator, default_value).',
          },
          {
            error: `ValueError: I/O operation on closed file`,
            cause: 'A generator that reads a file lazily (Part 06 style) was only partially consumed, and the "with open(...) as f:" block it lives inside was allowed to close the file before iteration resumed — this happens if the file handle is opened outside the generator instead of inside it.',
            fix: 'Open the file INSIDE the generator function itself, using "with", exactly as shown in Part 06\'s CSV example, so the file stays open for the generator\'s entire lifetime, not just until the enclosing function returns.',
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
        'A generator function contains at least one yield statement. Calling it does not run the body — it immediately returns a generator object, a fully-formed iterator, with no __next__ method written by hand.',
        'yield pauses execution at that exact line, hands back a value, and preserves every local variable — the next next() call resumes right after the yield, not from the top of the function.',
        'A generator expression is the lazy cousin of a list comprehension — same syntax with parentheses instead of brackets, producing values on demand instead of building the full result immediately.',
        'Generators trade a small per-value overhead for dramatically lower peak memory use — the right tool for large datasets processed once, in order, exactly as shown in the Raleigh healthcare example.',
        'A generator does not reduce total computation — it changes WHEN work happens and how much is held in memory at once, not how much work exists overall.',
        'yield from delegates iteration to another iterable or generator, yielding every value it produces — genuinely useful once generators compose, calling other generators for sub-tasks.',
        'A generator is a single-pass iterator: no len(), no indexing, no slicing, and no second pass once exhausted. Convert to a list with list(...) when you need any of those capabilities.',
        'return inside a generator ends it (raising StopIteration) rather than handing back a value through next() — values can only be surfaced through yield.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 29 builds decorators from first principles — functions that take a function and return
          a function — starting from the same "functions as objects" idea that made generators and
          wrapper functions possible in this module and the last.
        </p>
        <Link href="/learn/python/decorators" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 29 → Decorators — Writing and Using Them
        </Link>
      </div>
    </LearnLayout>
  )
}
