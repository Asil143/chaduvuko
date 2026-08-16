import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Multithreading and Multiprocessing Basics — Python | Chaduvuko',
  description:
    'Concurrency vs parallelism, the Global Interpreter Lock explained honestly, threading for I/O-bound work, multiprocessing for CPU-bound work, and a clear decision framework.',
}

const C = '#4285f4'

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

export default function MultithreadingMultiprocessing() {
  return (
    <LearnLayout
      title="Multithreading and Multiprocessing Basics"
      description="Concurrency vs parallelism, the GIL explained honestly, threading for I/O-bound work, multiprocessing for CPU-bound work, and a clear decision framework."
      section="Python — Module 34"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Concurrency vs Parallelism" />
        <SectionTitle>Two Different Ideas That Get Used Interchangeably — And Shouldn&apos;t</SectionTitle>

        <Para>
          Before touching any code, this module needs one distinction to be genuinely solid, because
          almost every confusing explanation of threading and the GIL online skips it: <strong>concurrency
          </strong> and <strong>parallelism</strong> are not the same thing, even though they sound like
          synonyms.
        </Para>

        <Para>
          <strong>Concurrency</strong> is about structure — a program is concurrent if it is composed of
          multiple independent tasks that can be in progress at overlapping times, whether or not they
          are literally executing at the exact same instant. A single chef juggling four dishes,
          switching attention between them as each one needs a step done, is running concurrently — only
          one dish is actually being worked on at any given instant, but all four are "in progress"
          together. <strong>Parallelism</strong> is about execution — actual simultaneous execution,
          multiple things happening at the literal same instant. Four chefs, each fully dedicated to one
          dish, working at the same time, is parallelism.
        </Para>

        <CodeBox label="The distinction in one line">{`Concurrency:  dealing with many things at once (structure)
Parallelism:  doing many things at once (execution)

# A single-core machine can be concurrent, but never truly parallel.
# A multi-core machine can be both.`}</CodeBox>

        <Para>
          This distinction is the reason this module exists as one topic instead of two. Python's{' '}
          <code>threading</code> module gives you concurrency — genuinely useful for a specific kind of
          workload, covered in Part 03 onward — but, because of the Global Interpreter Lock covered next,
          it does not give you true parallelism for Python code itself. Python's{' '}
          <code>multiprocessing</code> module gives you real parallelism, at the cost of more overhead.
          Knowing which one you actually need starts with knowing which of these two words describes your
          actual problem.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Global Interpreter Lock" />
        <SectionTitle>The GIL — What It Actually Is, and Its One Real Consequence</SectionTitle>

        <Para>
          CPython (the standard, most widely used Python implementation — the one you get from
          python.org) has a mechanism called the <strong>Global Interpreter Lock</strong>, almost always
          shortened to "the GIL." Its job: ensure that only <strong>one thread executes Python bytecode
          at a time</strong>, even on a machine with many CPU cores, and even when a program has started
          several threads.
        </Para>

        <Para>
          The GIL exists for a genuinely reasonable engineering reason, not as an oversight. CPython
          manages memory using reference counting — every object tracks how many things currently refer
          to it, and gets cleaned up automatically once that count hits zero. Without some form of
          locking, two threads incrementing or decrementing the same object's reference count at the
          exact same instant could corrupt that count, leading to memory being freed while something
          still uses it, or never freed at all. The GIL sidesteps this entire category of bug with one
          blunt but effective rule: only one thread touches Python objects at a time, full stop.
        </Para>

        <CodeBox label="The practical consequence, stated plainly">{`# On a machine with 8 CPU cores, running 8 Python threads that are all doing
# pure CPU-bound computation (math, loops, data processing) will NOT run
# meaningfully faster than running them one after another on a single thread.
# The GIL ensures only one of those 8 threads is actually executing
# Python bytecode at any given moment — the other 7 are waiting their turn.`}</CodeBox>

        <Callout type="warning">
          <strong>This is the single most important fact in this module.</strong> Threading in Python
          does not give you parallel execution of Python code, no matter how many CPU cores the machine
          has. This surprises engineers coming from Java or C++, where threads genuinely run in parallel
          across cores by default. Understanding exactly why threading is still useful despite this — the
          subject of Part 03 — depends on having this limitation absolutely clear first.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Why Threading Still Helps" />
        <SectionTitle>The GIL Is Released During I/O — And That Changes Everything</SectionTitle>

        <Para>
          Here is the detail that makes threading genuinely worthwhile despite the GIL: the GIL is
          released whenever a thread is waiting on <strong>I/O</strong> — a network request, reading a
          file from disk, waiting on a database query, or any operation where the CPU itself is idle,
          waiting for something external to respond. While one thread is blocked waiting on I/O, the GIL
          is free, and another thread can run Python bytecode during that wait.
        </Para>

        <Para>
          This is the entire reason threading is worth learning at all in Python: for{' '}
          <strong>I/O-bound</strong> work — work that spends most of its time waiting on something
          external rather than computing — threads let your program make productive use of that waiting
          time instead of sitting idle. Downloading ten files from ten different URLs, one after another,
          spends nearly all its time waiting on network responses; running those ten downloads on ten
          threads lets nine of them wait on the network simultaneously while the tenth's response is
          being processed, dramatically cutting total wall-clock time even though only one thread
          executes Python bytecode at any given instant.
        </Para>

        <CodeBox label="I/O-bound vs CPU-bound — the distinction that decides everything in this module">{`I/O-BOUND:   most of the time is spent WAITING — network calls, file reads,
             database queries, waiting on user input. Threading helps a lot here.

CPU-BOUND:   most of the time is spent COMPUTING — number crunching, image
             processing, parsing large amounts of data in pure Python.
             Threading does NOT help here, because of the GIL — see Part 06.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The threading Module Basics" />
        <SectionTitle>Creating, Starting, and Joining Threads</SectionTitle>

        <Para>
          The standard library's <code>threading</code> module is the direct way to create and manage
          threads. The core pattern: create a <code>Thread</code> object pointing at a function to run,
          call <code>.start()</code> to begin running it concurrently, and call <code>.join()</code> to
          wait for it to finish before continuing.
        </Para>

        <CodeBox label="A basic thread — simulating an I/O wait with time.sleep">{`import threading
import time

def download_file(name, seconds):
    print(f"Starting download: {name}")
    time.sleep(seconds)   # stands in for a real network wait
    print(f"Finished download: {name}")

thread1 = threading.Thread(target=download_file, args=("report.pdf", 2))
thread2 = threading.Thread(target=download_file, args=("invoice.pdf", 2))

start = time.time()
thread1.start()
thread2.start()

thread1.join()   # wait for thread1 to finish
thread2.join()   # wait for thread2 to finish

print(f"Total time: {time.time() - start:.1f} seconds")
# Roughly 2 seconds total — NOT 4 — because both downloads happened concurrently,
# each spending its time WAITING (time.sleep releases the GIL, just like real I/O does)`}</CodeBox>

        <Para>
          Compare that to running the same two calls sequentially, with no threading at all — it would
          take roughly 4 seconds, the sum of both waits, since the second download cannot even begin
          until the first one fully completes.
        </Para>

        <CodeBox label="Managing several threads at once with a loop">{`import threading

def process_item(item):
    print(f"Processing {item}")

items = ["order-1", "order-2", "order-3", "order-4"]
threads = [threading.Thread(target=process_item, args=(item,)) for item in items]

for t in threads:
    t.start()

for t in threads:
    t.join()

print("All items processed")`}</CodeBox>

        <Callout type="tip">
          Always call <code>.join()</code> on every thread you start, unless you deliberately want it to
          keep running independently in the background (a "daemon thread," set with{' '}
          <code>thread.daemon = True</code> before starting). Forgetting to join threads is a common
          source of programs that print "done" and exit while background work is technically still in
          progress, or that hang unexpectedly because the main program is waiting on threads it never
          properly tracked.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Race Conditions and Locks" />
        <SectionTitle>When Threads Share Data, Things Can Go Wrong in New Ways</SectionTitle>

        <Para>
          A <strong>race condition</strong> happens when two or more threads read and modify the same
          shared data at overlapping times, and the final result depends on the unpredictable timing of
          which thread happened to run when — a bug that can pass every test run and then fail
          unpredictably in production under real load. Here is a genuinely broken example, deliberately
          simple, to make the mechanism visible.
        </Para>

        <CodeBox label="A broken shared counter — the classic race condition">{`import threading

counter = 0

def increment():
    global counter
    for _ in range(100_000):
        counter += 1     # this looks like ONE step, but it isn't — see below

threads = [threading.Thread(target=increment) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)
# Expected: 400,000 (4 threads × 100,000 increments each)
# Actual: some number LESS than 400,000, and it varies between runs`}</CodeBox>

        <Para>
          Why this happens: <code>counter += 1</code> is not a single atomic operation at the bytecode
          level — it is actually three separate steps: read the current value of{' '}
          <code>counter</code>, add 1 to it, and write the new value back. The GIL guarantees only one
          thread runs Python bytecode at a time, but it can still switch which thread is running{' '}
          <em>between</em> those three steps. If thread A reads <code>counter</code> as 41, then gets
          paused before writing back 42, and thread B also reads <code>counter</code> as 41 and writes
          back 42, thread A's eventual write of 42 overwrites thread B's — one of the two increments is
          silently lost.
        </Para>

        <CodeBox label="The fix — a Lock ensures the whole read-modify-write sequence is atomic">{`import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100_000):
        with lock:              # only one thread can be inside this block at a time
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)   # 400,000, reliably, every time`}</CodeBox>

        <Para>
          A <code>threading.Lock</code>, used with the <code>with</code> statement exactly as shown,
          ensures that once one thread enters the locked block, every other thread trying to enter must
          wait until the first one leaves — turning the three-step read-modify-write sequence back into
          something that behaves as a single, uninterruptible operation from the perspective of other
          threads.
        </Para>

        <Callout type="warning">
          <strong>Race conditions are notoriously hard to catch in testing.</strong> The broken counter
          example above might occasionally print the correct 400,000 by pure luck, depending on exact
          timing — which is precisely what makes race conditions dangerous in real systems: code that
          looks correct and passes casual testing can fail intermittently once it runs under real
          concurrent load in production.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The multiprocessing Module" />
        <SectionTitle>Real Parallelism for CPU-Bound Work</SectionTitle>

        <Para>
          For CPU-bound work — the kind of workload the GIL genuinely prevents threading from speeding
          up — Python's <code>multiprocessing</code> module offers a different approach entirely:
          instead of multiple threads inside one process sharing one GIL, it spins up multiple entire{' '}
          <strong>separate processes</strong>, each with its own Python interpreter and its own GIL. Since
          each process is independent, they genuinely run in parallel across multiple CPU cores.
        </Para>

        <CodeBox label="A CPU-bound task — computing a lot of squares, on purpose expensive">{`import multiprocessing
import time

def compute_heavy(n):
    return sum(i * i for i in range(n))

numbers = [10_000_000] * 4

# Sequential — one after another
start = time.time()
results = [compute_heavy(n) for n in numbers]
print(f"Sequential: {time.time() - start:.2f}s")

# Parallel — using a process pool
if __name__ == "__main__":
    start = time.time()
    with multiprocessing.Pool(processes=4) as pool:
        results = pool.map(compute_heavy, numbers)
    print(f"Parallel:   {time.time() - start:.2f}s")

# On a 4+ core machine, the parallel version is meaningfully faster —
# genuinely close to 4x for this kind of embarrassingly parallel CPU work,
# because each process runs on its own core with its own GIL.`}</CodeBox>

        <Callout type="warning">
          <strong>The <code>if __name__ == &quot;__main__&quot;:</code> guard is not optional here on
          some platforms.</strong> Creating new processes involves re-importing your script in each new
          process (particularly on Windows and when using the <code>spawn</code> start method, which is
          the default on macOS since Python 3.8). Without the guard, that re-import can trigger the
          process-creation code again inside each new process, causing infinite recursive process
          spawning. Always put multiprocessing pool/process creation code inside this guard.
        </Callout>

        <Para>
          The trade-off: separate processes do not share memory the way threads do. Passing data between
          processes involves serializing it (similar in spirit to the JSON serialization from Module 16)
          and sending it across a process boundary, which has real overhead. This is exactly why
          multiprocessing is worth its cost specifically for CPU-bound work — the parallel speedup has to
          be large enough to be worth the process-creation and data-passing overhead, which is not
          usually true for lightweight I/O-bound tasks.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Decision Framework" />
        <SectionTitle>Threading, Multiprocessing, or Async — Choosing Correctly</SectionTitle>

        <Para>
          Putting Parts 01 through 06 together into a single decision framework you can actually apply:
        </Para>

        <CodeBox label="The decision framework">{`Is the work I/O-bound (mostly WAITING on something external)?
    → threading, OR asyncio (Module 35 — often the better modern choice
      for large numbers of concurrent I/O operations)

Is the work CPU-bound (mostly COMPUTING)?
    → multiprocessing — real parallelism across cores, bypassing the GIL entirely

Is the work a mix, or genuinely small-scale?
    → Start simple, sequential code. Introduce concurrency only once you've
      actually measured that waiting time (I/O) or compute time (CPU) is a
      real bottleneck — concurrency adds real complexity and new bug categories
      (race conditions, deadlocks) that are not worth paying for prematurely.`}</CodeBox>

        <Para>
          This module deliberately mentions <code>asyncio</code> without covering it in depth — that is
          the entire subject of Module 35, immediately next in this track. The short version worth
          knowing now: for a very large number of concurrent I/O-bound operations (hundreds or thousands
          of simultaneous network requests, for example), <code>asyncio</code> generally scales better
          than one OS thread per operation, because threads have real memory and scheduling overhead that
          async coroutines mostly avoid. Threading is still the right, simpler choice for a smaller,
          fixed number of concurrent I/O tasks, or when integrating with existing threading-based
          libraries.
        </Para>

        <Callout type="tip">
          A genuinely useful gut-check before reaching for any of this: measure first. Python's{' '}
          <code>time</code> module (or the <code>cProfile</code> standard library profiler for anything
          more serious) can confirm whether a piece of code is actually I/O-bound or CPU-bound, and how
          much time it is really costing, before investing in threading or multiprocessing to speed it
          up. Concurrency bugs are hard enough to justify only introducing when there is a measured,
          real problem to solve.
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
        <SectionTitle>A Raleigh Data Team Picks the Wrong Tool, Then the Right One</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Data analytics firm, Raleigh · Performance investigation
          </div>

          <Para>
            A data analytics team builds a nightly job that processes a batch of 500,000 customer
            records: for each record, it runs a moderately expensive text-cleaning routine (pure Python
            string processing, no network calls) and writes the cleaned result to an output file. The job
            takes 40 minutes, and the team wants it faster.
          </Para>

          <SubSubTitle>The first attempt — threading, and why it barely helps</SubSubTitle>

          <Para>
            An engineer, having read that "threading speeds things up," rewrites the job to process
            records across 8 threads. The result: almost no improvement — maybe 2-3% faster, well within
            normal run-to-run variance. Confused, the team investigates and lands squarely on Part 02 of
            this module: the text-cleaning routine is <strong>CPU-bound</strong>, not I/O-bound. There is
            no waiting for the GIL to release during — it is pure computation, start to finish — so eight
            threads compete for the same single GIL and effectively run one at a time regardless of
            thread count.
          </Para>

          <SubSubTitle>The fix — multiprocessing, and the real result</SubSubTitle>

          <Para>
            The team rewrites the job using <code>multiprocessing.Pool</code>, splitting the 500,000
            records into chunks distributed across 8 worker processes on an 8-core machine, following the
            exact pattern in Part 06. The job's runtime drops from 40 minutes to roughly 6 — close to the
            theoretical 8x improvement, since text cleaning on independent records is exactly the kind of
            "embarrassingly parallel" CPU-bound workload multiprocessing is built for.
          </Para>

          <Para>
            The team's retrospective conclusion becomes a rule they now apply before reaching for either
            tool: identify whether the bottleneck is waiting or computing <em>before</em> picking
            threading or multiprocessing, not after. Threading is nearly free to try, which made it
            tempting to reach for first — but "nearly free to try" is not the same as "likely to help,"
            and the GIL means it genuinely does not help pure CPU-bound work, no matter how many threads
            you throw at it.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Threads and Processes</SectionTitle>

        {[
          {
            wrong: '"More threads always means faster Python code"',
            right: 'Only for I/O-bound work, where the GIL is released during waiting. For CPU-bound work, the GIL ensures only one thread runs Python bytecode at a time, so adding threads to a pure-computation task produces little to no speedup — exactly the mistake in the Real World example above.',
          },
          {
            wrong: '"The GIL means Python can never achieve real parallelism"',
            right: 'The GIL only limits parallelism WITHIN one process, for Python bytecode specifically. multiprocessing sidesteps it entirely by using multiple separate processes, each with its own interpreter and its own GIL, achieving genuine parallel execution across CPU cores.',
          },
          {
            wrong: '"Race conditions will show up reliably in testing if the bug is real"',
            right: 'Race conditions depend on the exact, unpredictable timing of thread scheduling. Code with a genuine race condition can pass every test run by luck and then fail intermittently under real production load — this unpredictability is exactly what makes them dangerous and hard to debug.',
          },
          {
            wrong: '"Concurrency and parallelism mean the same thing"',
            right: 'Concurrency is about structuring a program as multiple independent, overlapping tasks; parallelism is about genuinely executing multiple tasks at the same literal instant. A single-core machine can be concurrent but never parallel — this distinction, covered in Part 01, is the foundation for understanding why threading and multiprocessing behave so differently in Python.',
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
            q: 'What is the Global Interpreter Lock (GIL), and what problem does it solve?',
            a: 'The GIL is a mechanism in CPython that ensures only one thread executes Python bytecode at a time, even on multi-core machines. It exists because CPython manages memory with reference counting, and without a single lock, multiple threads updating an object\'s reference count simultaneously could corrupt it, leading to memory being freed incorrectly. The GIL trades away true multi-core parallelism for Python bytecode in exchange for memory-management safety without needing fine-grained locks everywhere.',
          },
          {
            q: 'Given the GIL, why is Python threading still useful at all?',
            a: 'The GIL is released whenever a thread is waiting on I/O — network calls, file reads, database queries. For I/O-bound work, this means one thread can run Python code while others are waiting on I/O, letting a program make productive use of otherwise-idle waiting time. Threading provides essentially no benefit for CPU-bound work, since there is no I/O wait during which the GIL is released.',
          },
          {
            q: 'What is a race condition, and how does a threading.Lock fix it?',
            a: 'A race condition occurs when multiple threads read and modify shared data at overlapping times, and the final result depends on unpredictable timing — for example, counter += 1 is actually three steps (read, add, write), and two threads interleaving those steps can silently lose an update. A Lock, used with a "with" block, ensures only one thread can execute the protected section at a time, making the read-modify-write sequence behave as a single atomic operation from other threads\' perspective.',
          },
          {
            q: 'How does multiprocessing achieve real parallelism when threading cannot?',
            a: 'multiprocessing creates entirely separate OS processes, each running its own independent Python interpreter with its own GIL, rather than multiple threads sharing one interpreter and one GIL. Since each process is independent, they can genuinely execute simultaneously across multiple CPU cores — at the cost of more overhead, since data passed between processes must be serialized across the process boundary rather than shared directly in memory.',
          },
          {
            q: 'Give the practical decision rule for choosing between threading and multiprocessing.',
            a: 'For I/O-bound work — work that spends most of its time waiting on network calls, disk reads, or similar — use threading (or asyncio for very large numbers of concurrent operations). For CPU-bound work — work that spends most of its time computing — use multiprocessing, since it genuinely bypasses the GIL by running separate processes across CPU cores. Measuring whether a bottleneck is actually I/O-bound or CPU-bound before choosing is more important than either tool individually.',
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
        <SectionTitle>Concurrency Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Reaching for threading to speed up CPU-bound work',
            a: 'As shown in the Real World example, threading provides little to no benefit for pure computation, because the GIL ensures only one thread runs Python bytecode at a time regardless of thread count. Use multiprocessing for CPU-bound work instead.',
          },
          {
            q: 'Forgetting to call .join() on threads',
            a: 'Without .join(), the main program can move on (and potentially exit) while spawned threads are still running, leading to work that silently never completes, or inconsistent behavior depending on program exit timing.',
          },
          {
            q: 'Modifying shared data from multiple threads without a lock',
            a: 'Any shared mutable state (a counter, a list, a dict) touched by more than one thread needs a Lock (or another synchronization primitive) around the read-modify-write sequence, or the program is exposed to a race condition — a bug that may not appear in casual testing.',
          },
          {
            q: 'Forgetting the if __name__ == "__main__": guard with multiprocessing',
            a: 'On platforms using the spawn start method (the default on macOS and Windows), omitting this guard around process-creation code can cause the module to be re-imported and re-executed inside each spawned process, leading to infinite recursive process creation.',
          },
          {
            q: 'Introducing threading or multiprocessing before confirming there is a real bottleneck',
            a: 'Concurrency adds real complexity and entirely new categories of bugs (race conditions, deadlocks). Measure first — with time.time() or a profiler — to confirm the code is actually I/O-bound or CPU-bound and that the bottleneck is worth the added complexity.',
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
        <SectionTitle>Errors You Will Hit With Threads and Processes — And Exactly Why</SectionTitle>

        {[
          {
            error: `RuntimeError: threads can only be started once`,
            cause: 'Calling .start() a second time on the same Thread object — a Thread instance is single-use and cannot be restarted after it has completed.',
            fix: 'Create a brand new Thread object for each run, rather than reusing an already-started (or finished) one.',
          },
          {
            error: `A program hangs indefinitely and never exits`,
            cause: 'A thread was started but never joined and is not a daemon thread, or a Lock was acquired but never released (often because an exception occurred inside a "with lock:" block that was not actually using the with statement, or a manual lock.acquire() had no matching lock.release()).',
            fix: 'Always use "with lock:" rather than manual acquire()/release() pairs, since the with statement guarantees release even if an exception occurs. Confirm every non-daemon thread is joined.',
          },
          {
            error: `A shared counter or list ends up with fewer/more items than expected`,
            cause: 'A classic race condition — multiple threads reading and writing shared data without synchronization, exactly as shown in Part 05\'s broken counter example.',
            fix: 'Wrap every read-modify-write sequence on shared data in a threading.Lock, or use a thread-safe data structure like queue.Queue for passing data between threads instead of sharing raw mutable state directly.',
          },
          {
            error: `PicklingError: Can't pickle <function ...>: it's not the same object as ...`,
            cause: 'multiprocessing needs to serialize (pickle) data and functions to send them across the process boundary, and certain objects — like a function defined inside another function, or a lambda — cannot be pickled.',
            fix: 'Define the target function at the top level of a module (not nested inside another function), and confirm arguments passed to multiprocessing.Pool.map() or Process() are themselves picklable (basic types, or simple objects without unpicklable attributes like open file handles).',
          },
          {
            error: `A multiprocessing script spawns processes endlessly on macOS/Windows`,
            cause: 'The process-creation code was not wrapped in "if __name__ == \'__main__\':", so re-importing the script inside each spawned process re-triggers the same process-creation code.',
            fix: 'Always place multiprocessing.Pool(...) / Process(...) creation and .start() calls inside an if __name__ == "__main__": guard at the top level of the script.',
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
        'Concurrency (structuring work as overlapping tasks) and parallelism (genuinely executing tasks at the same instant) are different concepts — a single core can be concurrent but never parallel.',
        'The GIL ensures only one thread executes Python bytecode at a time in CPython, which exists to keep reference-counting memory management safe without fine-grained locking everywhere.',
        'The GIL is released during I/O waits — which is exactly why threading genuinely speeds up I/O-bound work (network calls, file reads) despite not enabling true parallel computation.',
        'Threading provides little to no speedup for CPU-bound (pure computation) work, because the GIL prevents more than one thread from running Python bytecode at a time regardless of thread count.',
        'A race condition happens when threads read/modify shared data at overlapping times without synchronization — use threading.Lock (via a "with" block) to make a read-modify-write sequence atomic.',
        'multiprocessing achieves real parallelism by running separate OS processes, each with its own interpreter and GIL — the right tool for CPU-bound work, at the cost of serialization overhead for passing data between processes.',
        'Always wrap multiprocessing.Pool/Process creation in if __name__ == "__main__": to avoid runaway process spawning on platforms using the spawn start method.',
        'Decision framework: I/O-bound → threading or asyncio (Module 35). CPU-bound → multiprocessing. Measure before reaching for either — concurrency adds real complexity.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 35 covers async Python — coroutines, the event loop, and asyncio — the modern approach
          to handling large numbers of concurrent I/O-bound operations that this module referenced but
          did not fully cover.
        </p>
        <Link href="/learn/python/async-python" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 35 → Async Python — asyncio, async/await
        </Link>
      </div>
    </LearnLayout>
  )
}
