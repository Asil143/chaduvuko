import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Async Python — asyncio, async/await | Chaduvuko',
  description:
    'What asynchronous programming actually solves, coroutines and the event loop explained properly, asyncio.gather, a concurrent-API-calls worked example, and honest guidance on when it is worth the complexity.',
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

export default function AsyncPython() {
  return (
    <LearnLayout
      title="Async Python — asyncio, async/await"
      description="What async solves, coroutines and the event loop explained properly, asyncio.gather, a concurrent-API-calls worked example, and honest guidance on complexity."
      section="Python — Module 35"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Async Actually Solves" />
        <SectionTitle>A Third Way to Handle I/O-Bound Work</SectionTitle>

        <Para>
          Module 34 ended with a decision framework and a deliberate loose thread: for I/O-bound work,
          it recommended "threading, or <code>asyncio</code>," without fully explaining the second
          option. This module closes that gap. Asynchronous programming solves the exact same category
          of problem threading solves — making productive use of time your program would otherwise spend
          idly waiting on I/O — but with a fundamentally different mechanism, and, for large numbers of
          concurrent operations, real advantages over threading.
        </Para>

        <Para>
          Recall from Module 34 that each OS thread carries real overhead — memory for its own stack,
          and cost for the operating system to schedule and switch between threads. Fine for a handful of
          concurrent threads; expensive if you genuinely need thousands of concurrent I/O operations, as
          a high-traffic web server or a service polling hundreds of external APIs might. Asynchronous
          programming achieves concurrency <em>within a single thread</em>, using far lighter-weight units
          called coroutines instead of OS threads — which is exactly why it scales to far larger numbers
          of concurrent operations than threading comfortably can.
        </Para>

        <CodeBox label="The one-line framing to hold onto for this entire module">{`Threading:  concurrency via multiple OS threads, each with real overhead.
Asyncio:    concurrency via many lightweight coroutines, cooperating on ONE thread.

Both exist to solve the same problem — productive waiting during I/O —
using genuinely different mechanisms with different trade-offs.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Coroutines" />
        <SectionTitle>async def and await — Functions That Can Pause</SectionTitle>

        <Para>
          A <strong>coroutine</strong> is a special kind of function, defined with <code>async def</code>
          instead of plain <code>def</code>, that can be <strong>paused</strong> at specific points and
          resumed later — without blocking the rest of the program while it waits. Calling a coroutine
          function does not run its body immediately the way calling a normal function does; it returns a
          coroutine <em>object</em>, which needs to actually be run by something else (covered in Part
          03).
        </Para>

        <CodeBox label="A coroutine function — defined, but not yet running">{`import asyncio

async def greet(name):
    print(f"Hello, {name}")
    await asyncio.sleep(1)     # pauses THIS coroutine for 1 second, without blocking others
    print(f"Goodbye, {name}")

result = greet("Maria")
print(type(result))
# <class 'coroutine'> — calling greet("Maria") did NOT run the function body yet.
# It just created a coroutine object describing the work to be done.`}</CodeBox>

        <Para>
          The <code>await</code> keyword is where a coroutine can genuinely pause — it can only appear
          inside a function defined with <code>async def</code>, and it marks a point where the current
          coroutine says, in effect, "I am waiting on something; let something else run while I wait."{' '}
          <code>asyncio.sleep()</code> above is the async equivalent of <code>time.sleep()</code>, but
          crucially it does not block the entire program the way <code>time.sleep()</code> does — it only
          pauses the one coroutine that called it, freeing everything else to keep running during that
          wait.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Event Loop" />
        <SectionTitle>What Actually Schedules and Runs All These Coroutines</SectionTitle>

        <Para>
          Coroutine objects do nothing by themselves — something has to actually run them, deciding
          which coroutine gets to execute at any given moment and switching between them at their{' '}
          <code>await</code> points. That something is the <strong>event loop</strong>, the core engine
          behind <code>asyncio</code>. Understanding it properly, not just treating it as magic, matters
          for reasoning correctly about async code.
        </Para>

        <Para>
          The event loop implements a model called <strong>cooperative multitasking</strong>. This is a
          genuinely important contrast with threading, which uses <em>preemptive</em> multitasking — the
          operating system can interrupt a thread at essentially any point and switch to another one,
          whether that thread is ready to be interrupted or not. In cooperative multitasking, a coroutine
          keeps running uninterrupted until it <em>voluntarily</em> yields control, which only happens at
          an <code>await</code> point. Nothing else can force a coroutine to pause mid-execution — it
          decides for itself, at each <code>await</code>, whether to hand control back to the event loop.
        </Para>

        <CodeBox label="The event loop's job, in plain terms">{`1. Maintain a set of coroutines that are ready to run, or currently waiting on
   something (a timer, a network response, a file read).
2. Run a ready coroutine until it hits an "await" and voluntarily pauses.
3. While that coroutine is waiting (e.g. waiting on network I/O), run
   whichever OTHER coroutine is ready, if any.
4. When the thing being awaited completes, mark that coroutine as ready again.
5. Repeat, continuously, until there is no more work to do.`}</CodeBox>

        <Para>
          This explains precisely why the "one thread avoids blocking" concurrency in Part 01 works:
          there genuinely is only one thread doing the actual executing, at any given instant — but
          because coroutines voluntarily step aside at each <code>await</code>, the single thread never
          sits fully idle waiting on one operation while other work could be progressing. It is a very
          similar underlying idea to the GIL-released-during-I/O behavior from Module 34, but achieved
          deliberately and explicitly through <code>await</code> points, rather than as a side effect of
          the interpreter's memory-management locking.
        </Para>

        <CodeBox label="Running an async program — asyncio.run()">{`import asyncio

async def main():
    print("Starting")
    await asyncio.sleep(1)
    print("Done")

asyncio.run(main())
# asyncio.run() creates a fresh event loop, runs the given coroutine to
# completion, and cleans up the event loop afterward — this is the standard
# entry point for a Python script that uses asyncio.`}</CodeBox>

        <Callout type="tip">
          <code>asyncio.run()</code> is meant to be called exactly once, at the top level of your
          program, as the single entry point into the async world — not called repeatedly, and not
          called from inside another coroutine. Everything that needs to run concurrently should be
          reached through <code>await</code> and <code>asyncio.gather()</code> (Part 04), starting from
          that one top-level call.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Running Multiple Coroutines Concurrently" />
        <SectionTitle>asyncio.gather() — The Whole Point of Doing Any of This</SectionTitle>

        <Para>
          A single <code>await</code> on its own does not give you concurrency — it just pauses the
          current coroutine until the awaited thing finishes, similar in spirit to a regular blocking
          call, just without blocking other coroutines that might be running elsewhere. Real concurrency
          comes from starting <strong>several</strong> coroutines and letting the event loop interleave
          their waiting periods. <code>asyncio.gather()</code> is the standard way to do exactly that.
        </Para>

        <CodeBox label="Sequential awaits — no concurrency benefit at all">{`import asyncio
import time

async def fetch_data(name, seconds):
    print(f"Starting {name}")
    await asyncio.sleep(seconds)
    print(f"Finished {name}")
    return f"{name} result"

async def main():
    start = time.time()
    a = await fetch_data("A", 2)
    b = await fetch_data("B", 2)
    c = await fetch_data("C", 2)
    print(f"Total: {time.time() - start:.1f}s")   # ~6 seconds — these ran one after another!

asyncio.run(main())`}</CodeBox>

        <CodeBox label="Concurrent with asyncio.gather() — the actual point of async">{`import asyncio
import time

async def fetch_data(name, seconds):
    print(f"Starting {name}")
    await asyncio.sleep(seconds)
    print(f"Finished {name}")
    return f"{name} result"

async def main():
    start = time.time()
    results = await asyncio.gather(
        fetch_data("A", 2),
        fetch_data("B", 2),
        fetch_data("C", 2),
    )
    print(f"Total: {time.time() - start:.1f}s")   # ~2 seconds — all three ran concurrently!
    print(results)   # ['A result', 'B result', 'C result'] — in the order passed to gather

asyncio.run(main())`}</CodeBox>

        <Para>
          Notice the crucial difference: sequentially <code>await</code>-ing three coroutines, one after
          another, gets you correct code but no speed benefit — each <code>await</code> fully completes
          before the next one even starts. <code>asyncio.gather()</code> starts all three coroutines and
          lets the event loop interleave their waiting periods, so the total time is roughly the{' '}
          <em>longest</em> individual wait, not the <em>sum</em> of all of them. This is the entire value
          proposition of async programming in one comparison.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Worked Example" />
        <SectionTitle>Fetching From Multiple APIs Concurrently</SectionTitle>

        <Para>
          Here is a realistic worked example: a fictional US travel-booking aggregator needs to query
          three different airline partner APIs for flight prices on the same route, and combine the
          results for the user. This is precisely the kind of I/O-bound, "wait on several independent
          network calls" workload async programming is built for.
        </Para>

        <CodeBox label="The synchronous version — genuinely slow, for comparison">{`import time

def get_prices_sync(airline, delay):
    print(f"Querying {airline}...")
    time.sleep(delay)   # standing in for a real network call to the airline's API
    return {"airline": airline, "price": 210 + delay * 10}

def get_all_prices_sync():
    start = time.time()
    results = [
        get_prices_sync("SkyWest Air", 1.5),
        get_prices_sync("Continental Express", 2.0),
        get_prices_sync("Rocky Mountain Airways", 1.2),
    ]
    print(f"Sequential total: {time.time() - start:.1f}s")   # ~4.7 seconds
    return results

get_all_prices_sync()`}</CodeBox>

        <CodeBox label="The async version — all three queries run concurrently">{`import asyncio
import time

async def get_prices_async(airline, delay):
    print(f"Querying {airline}...")
    await asyncio.sleep(delay)   # standing in for a real "async" network call
    return {"airline": airline, "price": 210 + delay * 10}

async def get_all_prices_async():
    start = time.time()
    results = await asyncio.gather(
        get_prices_async("SkyWest Air", 1.5),
        get_prices_async("Continental Express", 2.0),
        get_prices_async("Rocky Mountain Airways", 1.2),
    )
    print(f"Concurrent total: {time.time() - start:.1f}s")   # ~2.0 seconds — the SLOWEST call, not the sum
    return sorted(results, key=lambda r: r["price"])

asyncio.run(get_all_prices_async())`}</CodeBox>

        <Para>
          On a real route with real airline partner APIs (each typically responding in a few hundred
          milliseconds to a couple of seconds), the difference between querying three, five, or ten
          partners sequentially versus concurrently is the difference between a booking search that feels
          sluggish and one that feels instant — exactly the kind of user-facing improvement that makes
          async worth adopting for genuinely I/O-heavy features like this one.
        </Para>

        <Para>
          A production version would use a real async HTTP client — the popular third-party library{' '}
          <code>httpx</code> supports async requests directly, and Module 37's <code>requests</code>{' '}
          library (synchronous by design) is not usable inside a coroutine without blocking the whole
          event loop, exactly the mistake covered next.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Common Mistakes That Break Async Code" />
        <SectionTitle>The Three Mistakes That Catch Almost Everyone New to asyncio</SectionTitle>

        <SubTitle>Forgetting await</SubTitle>

        <Para>
          Calling a coroutine function without <code>await</code>-ing it does not raise an error
          immediately — it just creates a coroutine object and does nothing with it, which is a
          genuinely confusing silent failure.
        </Para>

        <CodeBox label="The silent bug — a coroutine that never actually runs">{`async def save_to_database(record):
    await asyncio.sleep(0.1)
    print(f"Saved {record}")

async def main():
    save_to_database("order-123")   # BUG: missing "await" — this does NOTHING
    print("Done")

asyncio.run(main())
# Output:
# Done
# (nothing was ever saved — save_to_database's body never actually ran)
#
# Python DOES warn about this: "RuntimeWarning: coroutine 'save_to_database'
# was never awaited" — always pay attention to that specific warning.`}</CodeBox>

        <SubTitle>Mixing blocking and async code</SubTitle>

        <Para>
          Calling a genuinely blocking, synchronous function from inside a coroutine — without{' '}
          <code>await</code>, because a normal blocking function has no <code>await</code> to give — does
          not pause just that one coroutine. It blocks the <strong>entire event loop</strong>, on the
          single thread everything is running on, stalling every other coroutine that was supposed to be
          making progress during that wait.
        </Para>

        <CodeBox label="Calling a blocking function stalls the WHOLE event loop, not just one coroutine">{`import time
import asyncio

async def bad_fetch():
    print("Starting bad_fetch")
    time.sleep(3)          # BLOCKING call — freezes the entire event loop for 3 seconds
    print("Finished bad_fetch")

async def good_task():
    print("good_task running")

async def main():
    await asyncio.gather(bad_fetch(), good_task())
    # good_task does NOT get a chance to interleave — bad_fetch's time.sleep(3)
    # blocks the single thread outright, so nothing else can run during those 3 seconds,
    # completely defeating the purpose of using asyncio.gather() in the first place

asyncio.run(main())`}</CodeBox>

        <Callout type="warning">
          <strong>This is the single most damaging async mistake in practice.</strong> A single blocking
          call buried inside a coroutine — a synchronous database driver, a synchronous{' '}
          <code>requests.get()</code> call, or even CPU-heavy pure computation — silently stalls
          everything else in the program for its entire duration, since there is only one thread. The fix
          is either using a genuinely async-native library for that operation (an async database driver,{' '}
          <code>httpx</code> instead of <code>requests</code>), or running the blocking call in a separate
          thread via <code>asyncio.to_thread()</code> so it does not block the event loop itself.
        </Callout>

        <SubTitle>Not using asyncio.gather() and losing the concurrency benefit entirely</SubTitle>

        <Para>
          Covered fully in Part 04 — sequential <code>await</code> calls are valid code, they simply
          provide none of the speed benefit async programming exists to offer. This is less a "bug" than
          a missed opportunity, but it is common enough, especially when refactoring existing sequential
          code to be "async," to include here explicitly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Is Async Worth the Complexity?" />
        <SectionTitle>An Honest Answer, Not a Universal Recommendation</SectionTitle>

        <Para>
          Async programming is a genuinely powerful tool, and it is also genuinely more complex to
          reason about correctly than synchronous code — the event loop, coroutine vs regular functions,
          the blocking-call trap from Part 06, and libraries that need async-native versions to work
          correctly, are all real additional cognitive overhead. It is worth being direct about when that
          overhead is worth paying.
        </Para>

        <CodeBox label="When async genuinely pays off">{`- Handling a LARGE number of concurrent I/O-bound operations (many simultaneous
  network requests, a web server handling thousands of concurrent connections)
- Building on a framework that is already async-native (FastAPI, for example,
  which you may encounter building APIs professionally)
- I/O-bound work where thread overhead specifically becomes the bottleneck`}</CodeBox>

        <CodeBox label="When simple synchronous code is honestly fine">{`- A script that makes a handful of sequential API calls, run occasionally,
  where a few extra seconds of total runtime genuinely does not matter
- CPU-bound work — async provides NO benefit here, same underlying reason
  threading doesn't (Module 34) — reach for multiprocessing instead
- Small internal tools and one-off scripts, where the added complexity of
  getting async code correct is not worth the modest speed gain`}</CodeBox>

        <Para>
          A genuinely useful gut check: if you are reaching for async because a specific, measured
          performance problem exists — a batch job that is too slow because it makes many sequential API
          calls, or a server that needs to handle far more concurrent connections than threading
          comfortably supports — it is very likely worth the complexity. If you are reaching for it
          because it feels like the "modern" or "advanced" way to write Python, that instinct alone is
          not a strong enough reason, and plain synchronous code, or the simpler threading approach from
          Module 34, is very often the better engineering decision.
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
        <SectionTitle>A Portland Travel Startup&apos;s Frozen Search Page</SectionTitle>

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
            Scenario — Travel-booking startup, Portland · Production incident
          </div>

          <Para>
            A travel aggregator — similar in spirit to the worked example in Part 05 — rewrites its
            flight search endpoint to use <code>asyncio</code>, querying six airline partner APIs
            concurrently instead of one after another. In staging, response times drop from roughly 9
            seconds to just over 2, exactly the improvement the team expected. In production, under real
            traffic, the endpoint occasionally freezes entirely for several seconds at a time — not just
            for the user who triggered the slow request, but for every concurrent user hitting the search
            endpoint at that moment.
          </Para>

          <SubSubTitle>What the investigation finds</SubSubTitle>

          <Para>
            One of the six airline integrations — added later, by a different engineer, under time
            pressure — used the team's existing, familiar synchronous HTTP client instead of the
            async-native one the other five integrations used, exactly the blocking-call-inside-a-
            coroutine mistake from Part 06. That one partner's occasional slow responses (their API had
            inconsistent latency, sometimes taking 4-5 seconds) were blocking Python's single event-loop
            thread outright — freezing every other request being handled by the server at that moment,
            not just the one waiting on that specific partner.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team replaces the synchronous call with an async-native HTTP client for that integration,
            matching the other five, and adds a code-review checklist item specifically for this class of
            bug going forward: any new I/O call added inside an <code>async def</code> function must be
            verified as genuinely async-native, not a synchronous call that merely happens to work without
            raising an error. As covered in Part 06, a blocking call inside a coroutine does not fail
            loudly — it just silently stalls the entire event loop for its duration, which is exactly what
            made this bug hard to spot in code review before it reached production traffic.
          </Para>

          <Para>
            The broader lesson the team draws is directly tied to Part 07: async bought them a genuine,
            measured win — but it also introduced an entirely new failure mode that plain synchronous
            code simply does not have. Adopting async was the right call given their real concurrency
            needs, but it came with an ongoing cost in vigilance that a smaller, lower-traffic feature
            would not have justified.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Async Python</SectionTitle>

        {[
          {
            wrong: '"async/await makes code run on multiple threads or cores automatically"',
            right: 'Asyncio achieves concurrency on a SINGLE thread, through coroutines voluntarily pausing at await points — no additional threads or CPU cores are involved. This is precisely why a blocking call inside a coroutine is so damaging: there is no other thread to fall back on while it blocks.',
          },
          {
            wrong: '"Adding await in front of a function call is what makes code concurrent"',
            right: 'A single await on its own just pauses the current coroutine until that one thing finishes — no different in effect from a blocking call, from the perspective of that one coroutine. Real concurrency requires running MULTIPLE coroutines together, typically via asyncio.gather(), so the event loop can interleave their waiting periods.',
          },
          {
            wrong: '"Async is strictly faster than synchronous code"',
            right: 'Async provides essentially no benefit for CPU-bound work — the same fundamental reason threading does not, from Module 34. It specifically speeds up I/O-bound work by overlapping waiting periods across multiple coroutines. For a program that is already fast or does little I/O, adding asyncio adds complexity without a meaningful speed benefit.',
          },
          {
            wrong: '"Any library works fine inside an async function, since Python doesn\'t care"',
            right: 'A genuinely synchronous, blocking library call inside a coroutine blocks the entire single-threaded event loop for its duration — stalling every other coroutine, not just the one that made the call. Only libraries built specifically to be async-native (or blocking calls explicitly offloaded via asyncio.to_thread()) are safe to use inside a coroutine without this risk.',
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
            q: 'What is a coroutine, and how is it different from a regular function?',
            a: 'A coroutine is defined with async def, and calling it does not immediately run its body — it returns a coroutine object describing the work to be done, which must be run by an event loop (typically via await or asyncio.run()). Unlike a regular function, a coroutine can be paused at await points and resumed later, allowing other coroutines to run during that pause without blocking the whole program.',
          },
          {
            q: 'Explain the event loop and cooperative multitasking, in your own words.',
            a: 'The event loop is the engine that runs coroutines, deciding which one executes at any given moment. It uses cooperative multitasking: a coroutine runs uninterrupted until it voluntarily pauses at an await point, handing control back to the event loop, which can then run another ready coroutine. This differs from threading\'s preemptive multitasking, where the operating system can interrupt a thread at any point regardless of whether it is ready.',
          },
          {
            q: 'Why does asyncio.gather() provide a concurrency benefit that a sequence of separate await calls does not?',
            a: 'Awaiting coroutines one after another, sequentially, means each one fully completes before the next begins — no overlap in their waiting periods, so total time is the SUM of each wait. asyncio.gather() starts all the given coroutines together and lets the event loop interleave their waiting periods, so total time is closer to the LONGEST individual wait rather than the sum of all of them.',
          },
          {
            q: 'What happens if you call a genuinely blocking, synchronous function from inside a coroutine?',
            a: 'It blocks the entire event loop — since asyncio concurrency runs on a single thread, a blocking call has no other thread to fall back on, and it stalls every other coroutine that was supposed to be making progress during that time, not just the one that made the blocking call. This is one of the most damaging and common real async bugs; the fix is using an async-native version of that operation, or offloading it to a separate thread with asyncio.to_thread().',
          },
          {
            q: 'When is async programming NOT worth the added complexity?',
            a: 'For CPU-bound work (async offers no benefit, the same underlying reason as threading and the GIL), for scripts making only a handful of sequential I/O calls where the total time difference is negligible, and for small internal tools where correctness risk from async-specific bugs (like the blocking-call trap) outweighs the modest speed gain. Async is worth it specifically when there is a measured, real need to handle a large number of concurrent I/O-bound operations.',
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
        <SectionTitle>Async Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting await when calling a coroutine',
            a: 'Calling save_to_database("order-123") without await creates a coroutine object and does nothing with it — the body never runs. Python raises a RuntimeWarning: coroutine was never awaited, which is worth taking seriously every time it appears.',
          },
          {
            q: 'Using time.sleep() instead of asyncio.sleep() inside a coroutine',
            a: 'time.sleep() is a genuinely blocking call — it freezes the entire event loop for its duration, exactly the Part 06 mistake. asyncio.sleep() is the async-native equivalent, and pauses only the current coroutine.',
          },
          {
            q: 'Sequentially awaiting coroutines instead of using asyncio.gather()',
            a: 'result_a = await task_a(); result_b = await task_b() runs one after another with no concurrency benefit at all. Use asyncio.gather(task_a(), task_b()) to actually run them concurrently.',
          },
          {
            q: 'Calling asyncio.run() more than once, or from inside another coroutine',
            a: 'asyncio.run() is meant to be the single top-level entry point into async code, called once per program. Calling it again while an event loop is already running raises a RuntimeError.',
          },
          {
            q: 'Assuming a third-party library "just works" inside async code without checking',
            a: 'Not every library has an async-native version. Using a synchronous library (like the standard requests library) inside a coroutine blocks the entire event loop, exactly as shown in the Real World example — confirm a library is genuinely async-native before using it inside async def functions.',
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
        <SectionTitle>Errors You Will Hit With asyncio — And Exactly Why</SectionTitle>

        {[
          {
            error: `RuntimeWarning: coroutine 'fetch_data' was never awaited`,
            cause: 'A coroutine function was called without await (or without being passed to asyncio.gather() / asyncio.create_task()), so the coroutine object was created but its body never actually ran.',
            fix: 'Add await in front of the call, or pass the coroutine to asyncio.gather() if it should run concurrently with other coroutines.',
          },
          {
            error: `SyntaxError: 'await' outside function`,
            cause: 'await was used outside of a function defined with async def — for example, directly at the top level of a script, or inside a plain (non-async) function.',
            fix: 'await can only appear inside an async def function. Wrap the code in an async function and run it with asyncio.run().',
          },
          {
            error: `RuntimeError: asyncio.run() cannot be called from a running event loop`,
            cause: 'asyncio.run() was called again while an event loop was already active — commonly from calling it inside a coroutine, or calling it twice in an environment (like some notebook environments) that already has a running event loop.',
            fix: 'Call asyncio.run() exactly once, at the true top level of the program. If already inside a coroutine, use await directly instead of asyncio.run().',
          },
          {
            error: `A program using asyncio.gather() takes just as long as sequential code`,
            cause: 'One of the coroutines passed to gather() is internally making a blocking (non-async) call, which stalls the entire event loop for its duration — silently eliminating the concurrency benefit for everything else too.',
            fix: 'Audit every I/O call inside each coroutine and confirm it uses a genuinely async-native library or asyncio.sleep(), not a synchronous equivalent like time.sleep() or the standard requests library.',
          },
          {
            error: `A program hangs and never completes`,
            cause: 'A coroutine is awaiting something that never resolves — commonly a bug in custom async code that never actually completes its underlying operation, or a deadlock between coroutines waiting on each other.',
            fix: 'Add explicit timeouts using asyncio.wait_for() around operations that should not be allowed to wait indefinitely, and add logging around long-running awaits to identify which one is actually stuck.',
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
        'Asyncio achieves concurrency on a single thread using lightweight coroutines instead of OS threads — scaling better than threading for large numbers of concurrent I/O-bound operations.',
        'A coroutine (async def) does not run when called — it returns a coroutine object that must be run via await, asyncio.gather(), or asyncio.run().',
        'The event loop uses cooperative multitasking — a coroutine runs uninterrupted until it voluntarily pauses at an await point, unlike threading\'s OS-driven preemptive switching.',
        'A single await does not create concurrency by itself — it just pauses one coroutine. Real concurrency requires running multiple coroutines together, typically via asyncio.gather().',
        'asyncio.run() is the standard, single top-level entry point for running async code — call it once, at the top of the program.',
        'The most damaging real async bug: calling a genuinely blocking (synchronous) function inside a coroutine stalls the ENTIRE single-threaded event loop, not just that one coroutine.',
        'Async provides no benefit for CPU-bound work, same underlying reason as threading — it specifically speeds up I/O-bound work by overlapping waiting periods.',
        'Async is worth its complexity for large numbers of concurrent I/O operations or async-native frameworks; plain synchronous code is often the better choice for smaller scripts and CPU-bound work.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 36 covers type hints and static typing with mypy — annotating your code so tooling can
          catch bugs before runtime, without giving up any of Python&apos;s dynamic flexibility.
        </p>
        <Link href="/learn/python/type-hints-mypy" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 36 → Type Hints and Static Typing with mypy
        </Link>
      </div>
    </LearnLayout>
  )
}
