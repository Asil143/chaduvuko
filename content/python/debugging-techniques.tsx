import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Debugging Techniques and Tools — Python | Chaduvuko',
  description:
    'How to read a traceback like an engineer, the real limits of print debugging, pdb, VS Code\'s debugger, and a full worked debugging session from broken to fixed.',
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

export default function DebuggingTechniques() {
  return (
    <LearnLayout
      title="Debugging Techniques and Tools"
      description="Reading a traceback the right way, the real limits of print debugging, pdb, VS Code's debugger, and a full worked debugging session."
      section="Python — Module 39"
      readTime="50 min"
      updatedAt="August 2026"
    >

      <Para>
        This module opens <strong>Phase 6 — Production &amp; Career Readiness</strong>, the final phase
        of this curriculum. Everything up to this point has been about writing Python that works. Phase
        6 is about the skills that turn "it works on my machine" into a professional habit: debugging
        systematically instead of guessing, logging instead of printing, packaging instead of copy-pasting
        scripts between machines, profiling before optimizing, and eventually walking into a technical
        interview and explaining all of it clearly. Debugging comes first because it is the single most
        used skill in this entire phase — you will lean on it while learning every module that follows.
      </Para>

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Reading a Traceback" />
        <SectionTitle>Bottom to Top — Not Top to Bottom</SectionTitle>

        <Para>
          Almost every beginner reads a Python traceback the way they read everything else in
          English — top to bottom. That is exactly backwards, and it is the single biggest reason new
          engineers stare at a wall of text and freeze. A traceback is a <strong>call stack</strong>,
          printed in the order Python walked into each function to reach the line that finally failed.
          The bottom of the traceback is where the actual failure happened. Everything above it is just
          the trail of function calls that led there.
        </Para>

        <CodeBox label="A realistic traceback">{`Traceback (most recent call last):
  File "app.py", line 22, in <module>
    total = calculate_order_total(cart)
  File "app.py", line 15, in calculate_order_total
    line_total = compute_line_item(item)
  File "app.py", line 9, in compute_line_item
    return item["price"] * item["quantity"]
KeyError: 'price'`}</CodeBox>

        <Para>
          Read it from the bottom up. <code>KeyError: 'price'</code> is the actual exception — the
          program tried to access a dictionary key called <code>"price"</code> that did not exist. The
          line directly above it, <code>line 9, in compute_line_item</code>, is exactly where that lookup
          happened. Everything further up — <code>compute_line_item</code> was called from{' '}
          <code>calculate_order_total</code>, which was called from the top-level module — is context,
          useful for understanding <em>why</em> that function ran with bad data, but not where the bug
          actually lives. A beginner who reads top-down often starts investigating{' '}
          <code>calculate_order_total</code> first, when the real fix belongs three lines lower.
        </Para>

        <SubTitle>The exception type tells you the category of bug before you read anything else</SubTitle>

        <Para>
          Before reading a single line of your own code, read the exception's <em>name</em>. It is a
          direct classification of what went wrong, and recognizing the category instantly narrows your
          search. A <code>KeyError</code> means a dict lookup failed. A <code>TypeError</code> means an
          operation was applied to a value of the wrong type. An <code>IndexError</code> means a sequence
          was accessed out of bounds. An <code>AttributeError</code> means you called a method or accessed
          a field that does not exist on that object — very often because the object is unexpectedly{' '}
          <code>None</code>. Experienced engineers develop an almost reflexive mapping from exception type
          to likely cause, and building that reflex starts with deliberately reading the exception name
          first, every single time, instead of skimming straight past it to the message.
        </Para>

        <CodeBox label="Multi-frame tracebacks in bigger programs — same rule applies">{`Traceback (most recent call last):
  File "pipeline.py", line 40, in <module>
    run_pipeline()
  File "pipeline.py", line 31, in run_pipeline
    records = [transform(r) for r in load_records()]
  File "pipeline.py", line 31, in <listcomp>
    records = [transform(r) for r in load_records()]
  File "pipeline.py", line 18, in transform
    return record["id"].strip().upper()
AttributeError: 'int' object has no attribute 'strip'`}</CodeBox>

        <Para>
          Here the bottom frame is the real story: <code>record["id"]</code> returned an{' '}
          <code>int</code>, not a <code>str</code>, so calling <code>.strip()</code> on it fails. The
          fix is not in <code>run_pipeline</code> — it is either in <code>transform</code> (handle
          non-string IDs) or, more likely, upstream in whatever produced records with an integer{' '}
          <code>id</code> field when a string was expected. A long traceback is not a sign of a
          complicated bug; it is just Python being generous with context. The fix is almost always
          concentrated in the last one or two frames.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — print() Debugging and Its Real Limits" />
        <SectionTitle>print() Is a Legitimate First Tool — Until It Isn&apos;t</SectionTitle>

        <Para>
          There is a strain of advice online that treats <code>print()</code> debugging as something
          amateur engineers do and real engineers don&apos;t. That is not true. Sprinkling{' '}
          <code>print()</code> calls to check a value at a specific point is fast, requires no setup, and
          is genuinely the right tool for a huge fraction of bugs — especially small scripts and quick
          "what is actually in this variable right now" questions. You already used this technique
          constantly in the Formatting module (Module 10) when inspecting values with f-strings during
          development.
        </Para>

        <CodeBox label="print() debugging — fine for a simple, localized bug">{`def calculate_discount(price, percent):
    print(f"DEBUG: price={price!r}, percent={percent!r}")
    return price * (1 - percent / 100)`}</CodeBox>

        <Para>
          The problem is not that <code>print()</code> is wrong — it is that it stops scaling the moment
          a bug gets even slightly more complex. Four real limits show up constantly:
        </Para>

        <CodeBox label="Where print() debugging genuinely breaks down">{`1. You have to GUESS which variables matter before you run the code —
   if you guessed wrong, you edit the file and re-run, over and over.

2. It only shows you a snapshot at one instant — it can't show you
   the full call stack, or let you inspect a value that changes across
   many loop iterations without flooding your terminal.

3. You have to remember to delete every debug print before committing —
   and "print statements left in production code" is a real, common
   code review complaint.

4. It can't PAUSE the program and let you explore interactively —
   you only see exactly what you thought to print.`}</CodeBox>

        <Callout type="tip">
          A useful personal rule: reach for <code>print()</code> first, for a bug you have a strong guess
          about, in a small function. The moment you have printed three or four things and still
          don&apos;t understand what is happening — or the bug depends on how a value changes over dozens
          of loop iterations — stop guessing and reach for a real debugger instead, covered in Part 03 and
          Part 04 below.
        </Callout>

        <SubTitle>A slightly better middle ground: the logging module</SubTitle>

        <Para>
          One genuine upgrade from raw <code>print()</code> that costs almost nothing is Python&apos;s
          built-in <code>logging</code> module, which the very next module in this track covers in full
          depth. For now, it&apos;s worth knowing it exists as the natural next step once
          debug-<code>print</code>s start accumulating in a file you intend to keep.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — pdb, the Python Debugger" />
        <SectionTitle>pdb — Pausing Your Program and Looking Around</SectionTitle>

        <Para>
          <code>pdb</code> is Python&apos;s built-in interactive debugger. Instead of guessing which
          values to print ahead of time, it pauses your program at a chosen line and drops you into a
          live prompt where you can inspect any variable in scope, run arbitrary expressions, and step
          through execution one line at a time. The easiest way to trigger it is the built-in{' '}
          <code>breakpoint()</code> function, available since Python 3.7 — call it anywhere in your code
          and execution stops there.
        </Para>

        <CodeBox label="Dropping into pdb with breakpoint()">{`def calculate_discount(price, percent):
    breakpoint()          # execution pauses HERE, on this exact line
    return price * (1 - percent / 100)

calculate_discount(100, 150)`}</CodeBox>

        <CodeBox label="What you land in — the (Pdb) prompt">{`> app.py(3)calculate_discount()
-> return price * (1 - percent / 100)
(Pdb) `}</CodeBox>

        <Para>
          From that prompt, you are inside a live Python session with full access to every local
          variable. The core commands you need cover almost everything:
        </Para>

        <CodeBox label="The pdb commands you will actually use">{`n   (next)      — run the current line, stop at the next one in THIS function
s   (step)      — step INTO a function call on the current line
c   (continue)  — resume normal execution until the next breakpoint (or the end)
p   (print)     — evaluate and print any expression: p price, p percent > 100
l   (list)      — show the source code around the current line
q   (quit)      — abort the debugging session entirely
w   (where)     — show the current call stack, like a live traceback`}</CodeBox>

        <Para>
          The distinction between <code>n</code> and <code>s</code> trips people up at first: <code>n</code>{' '}
          treats a function call on the current line as a black box and just moves to the next line in
          the current function; <code>s</code> actually steps inside that function call, letting you
          watch its internals execute too. Use <code>n</code> when you trust the function being called
          and just want to keep moving; use <code>s</code> the moment you suspect the bug is inside it.
        </Para>

        <CodeBox label="pdb.set_trace() — the older, still-common form">{`import pdb

def calculate_discount(price, percent):
    pdb.set_trace()        # identical effect to breakpoint(), older API
    return price * (1 - percent / 100)`}</CodeBox>

        <Callout type="info">
          <code>breakpoint()</code> and <code>pdb.set_trace()</code> do the same thing — <code>breakpoint()</code>{' '}
          is just newer, requires no import, and is the version you will see in modern code. You will
          still run into <code>pdb.set_trace()</code> reading older codebases, so it is worth recognizing
          both.
        </Callout>

        <SubTitle>Post-mortem debugging — inspecting a crash after the fact</SubTitle>

        <Para>
          You do not always have to predict where a bug is and place a <code>breakpoint()</code> ahead of
          time. Running a script with <code>python -m pdb -c continue app.py</code> lets it run normally
          and drops you into the debugger automatically at the exact moment it crashes, with the full
          stack still available to inspect — genuinely useful for an intermittent bug you cannot easily
          reproduce on demand.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The IDE Debugger" />
        <SectionTitle>VS Code&apos;s Debugger — pdb&apos;s Power, Without the Prompt</SectionTitle>

        <Para>
          Back in Module 01, you set up VS Code with the Python extension as this track&apos;s recommended
          editor. That same extension ships a full graphical debugger built directly on top of the same
          debugging protocol <code>pdb</code> uses conceptually — but instead of typing commands at a text
          prompt, you click in the left margin next to a line number to set a <strong>breakpoint</strong>,
          then run your file with the debugger (the "Run and Debug" panel, or F5) instead of just running
          it normally.
        </Para>

        <Para>
          When execution reaches your breakpoint, the program pauses, and VS Code shows you, all at once,
          in dedicated panels: every local variable currently in scope and its live value, the full call
          stack (every function that led to this point, clickable to jump between frames), and a{' '}
          <strong>watch panel</strong> where you can type any expression and have it continuously
          re-evaluated as you step through the code — genuinely more convenient than repeatedly typing{' '}
          <code>p</code> commands in <code>pdb</code> for the same variable.
        </Para>

        <CodeBox label="A typical VS Code debugging session, described step by step">{`1. Click in the gutter to the left of a line number — a red dot appears (a breakpoint).
2. Open "Run and Debug" (or press F5). Your script runs normally until it hits that line.
3. Execution pauses. The Variables panel shows every local variable and its current value.
4. Use the debug toolbar's step controls — visually identical to pdb's n / s / c:
     Step Over  = n        Step Into = s        Continue = c
5. Add an expression to the Watch panel — e.g. "len(cart_items)" —
   and watch it update automatically as you step through the loop.
6. The Call Stack panel shows exactly which functions led here, clickable
   to inspect each frame's own local variables.`}</CodeBox>

        <Callout type="tip">
          <strong>Conditional breakpoints are the feature that separates a real debugging session from a
          painful one.</strong> Right-click a breakpoint in VS Code and you can attach a condition — for
          example, only pause when <code>item["id"] == 4821</code> — instead of stopping on every single
          iteration of a loop that runs ten thousand times. This is genuinely hard to replicate quickly
          with <code>pdb</code> alone, and it is the single biggest reason to reach for the IDE debugger
          once a bug lives inside a loop over real data.
        </Callout>

        <Para>
          Neither tool makes the other obsolete. <code>pdb</code> works anywhere Python runs — over SSH on
          a remote server with no graphical interface at all, inside a Docker container, in a CI pipeline.
          The IDE debugger is faster and more visual for local development. Most working engineers default
          to the IDE debugger day to day and fall back to <code>pdb</code> the moment they are debugging
          something running somewhere without a GUI attached.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Rubber Duck Debugging" />
        <SectionTitle>Explaining the Bug Out Loud, Line by Line</SectionTitle>

        <Para>
          Rubber duck debugging sounds like a joke the first time you hear it, and it is a genuinely
          effective technique that experienced engineers still use constantly. The method: get an object —
          traditionally a literal rubber duck, though a coworker, a pet, or an empty chair works equally
          well — and explain your code to it, out loud, line by line, as if it understands nothing and
          you need to walk it through every single decision your code makes.
        </Para>

        <Para>
          The mechanism behind why this works is not magic. Reading code silently lets your brain skim —
          it pattern-matches what it expects the code to say rather than what it actually says, especially
          in code you wrote yourself and already have a mental model of. Forcing yourself to articulate
          each line out loud, in full sentences, interrupts that autopilot. You are forced to state your
          assumptions explicitly — "and then this loop goes through each item in the cart, and for each
          one it looks up the price in the price dictionary" — and it is extremely common to catch the bug
          mid-sentence, the moment you say an assumption out loud that turns out to be false the instant
          you hear yourself say it.
        </Para>

        <Callout type="info">
          This is exactly why "explaining it to a coworker" so often resolves a bug before the coworker
          has said a single word back — the value was never really in their answer. It was in the act of
          being forced to articulate your own reasoning precisely, out loud, instead of letting it stay
          vague inside your own head. Keep this in mind before interrupting a teammate: try explaining it
          to an inanimate object first. It costs nothing and works surprisingly often.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Binary Search Debugging" />
        <SectionTitle>Cutting the Search Space in Half, Every Time</SectionTitle>

        <Para>
          When a bug lives somewhere in a large amount of code and you genuinely have no idea where to
          start, the systematic strategy is the same one you would use to find a single wrong entry in a
          sorted list: don&apos;t scan linearly from the top — cut the search space in half, repeatedly.
          Disable, comment out, or bypass roughly half of the suspect code, and check whether the bug still
          happens. If it does, the bug is in the half you kept. If it doesn&apos;t, the bug is in the half
          you removed. Repeat on the remaining half.
        </Para>

        <CodeBox label="Binary search debugging on a 200-line pipeline script">{`# You don't know which of 6 processing steps is corrupting the data.
# Instead of reading all 6 top to bottom, bisect:

def run_pipeline(records):
    records = load_and_clean(records)
    records = deduplicate(records)
    records = enrich_with_metadata(records)   # <- comment out THIS and everything below
    # records = apply_business_rules(records)
    # records = compute_aggregates(records)
    # records = export(records)
    return records

# Check the output after step 2. Correct? The bug is in step 3, 4, 5, or 6 — bisect again.
# Wrong already? The bug is in step 1 or 2 — you've eliminated 4 of 6 steps in one check.`}</CodeBox>

        <Para>
          This technique generalizes far beyond commenting out function calls. Git itself has a
          purpose-built command for exactly this idea at a larger scale: <code>git bisect</code>{' '}
          automatically checks out commits at the midpoint between a known-good and known-bad commit,
          asks you to test and mark each one good or bad, and converges on the exact commit that
          introduced a regression in <code>log₂(n)</code> steps rather than checking every commit one
          by one. If a bug appeared sometime in the last 200 commits and you have no idea which one caused
          it, <code>git bisect start</code> followed by marking a known-good and known-bad commit will
          typically find the culprit in 7 or 8 test runs instead of up to 200.
        </Para>

        <Callout type="tip">
          Binary search debugging is the right tool specifically when you have <em>no localized
          hypothesis</em> yet — a large, unfamiliar codebase, or a regression that appeared somewhere in
          weeks of commits. Once you have narrowed the bug down to a single function or a handful of
          lines, switch to <code>pdb</code> or the IDE debugger from Parts 03–04 to actually inspect what
          is happening at that specific point.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Full Worked Debugging Session" />
        <SectionTitle>Start to Finish — Debugging a Broken Discount Function</SectionTitle>

        <Para>
          Here is a realistic bug, debugged the way an engineer actually would, combining several of the
          techniques above rather than treating them as separate, disconnected tools.
        </Para>

        <CodeBox label="The broken code — a bug report says some customers are seeing negative totals">{`def apply_discounts(cart_items, discount_codes):
    total = 0
    for item in cart_items:
        price = item["price"]
        for code in discount_codes:
            if code["applies_to"] == item["category"]:
                price = price - (price * code["percent_off"] / 100)
        total += price
    return total`}</CodeBox>

        <Para>
          <strong>Step 1 — read the exception, if there is one.</strong> There isn&apos;t. This is worse
          than a crash: the function runs and returns a plausible-looking number that is simply wrong for
          some inputs. No traceback to read means Part 01&apos;s technique doesn&apos;t apply yet — this
          calls for actively inspecting values, not reading an error.
        </Para>

        <Para>
          <strong>Step 2 — form a hypothesis before touching a debugger.</strong> "Negative totals" for a
          discount function strongly suggests a discount is being applied more than once, or a percentage
          is being misread (e.g. <code>150</code> meant as a display value being used directly instead of
          being validated). Rather than guessing blindly, the engineer reaches for <code>breakpoint()</code>{' '}
          right where discounts are applied.
        </Para>

        <CodeBox label="Instrumenting the suspect line with breakpoint()">{`for item in cart_items:
    price = item["price"]
    for code in discount_codes:
        if code["applies_to"] == item["category"]:
            breakpoint()
            price = price - (price * code["percent_off"] / 100)
    total += price`}</CodeBox>

        <Para>
          <strong>Step 3 — inspect at the pause.</strong> Running the failing input and hitting{' '}
          <code>c</code> to continue through each pause, the engineer types <code>p code</code> at every
          stop. Two codes both report <code>"applies_to": "electronics"</code> for the same item — one
          intended as a one-time promo, one as a permanent category discount — and both apply to the exact
          same item in the same inner loop, stacking on top of each other with no limit.
        </Para>

        <Para>
          <strong>Step 4 — confirm the hypothesis with a targeted print, once it&apos;s cheap to check.</strong>{' '}
          With the real cause understood, a quick{' '}
          <code>{`print(f"item={item['name']!r} matched {len([c for c in discount_codes if c['applies_to'] == item['category']])} discount codes")`}</code>{' '}
          across the full cart confirms three items match more than one code — the actual bug, not just
          the case that happened to be paused on.
        </Para>

        <CodeBox label="The fix — only the largest applicable discount should apply, not every matching one">{`def apply_discounts(cart_items, discount_codes):
    total = 0
    for item in cart_items:
        price = item["price"]
        matching = [c for c in discount_codes if c["applies_to"] == item["category"]]
        if matching:
            best_discount = max(c["percent_off"] for c in matching)
            price = price - (price * best_discount / 100)
        total += price
    return total`}</CodeBox>

        <Para>
          Notice the shape of the whole session: read for an exception first (there wasn&apos;t one, so
          that step took five seconds and moved on), form a real hypothesis before touching any tool,
          use <code>breakpoint()</code> to inspect state at the exact suspect line rather than guessing
          blindly, and confirm the root cause with a broader check before writing the fix. This is the
          actual shape of professional debugging — not one technique used in isolation, but a short,
          disciplined sequence of narrowing steps.
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
        <SectionTitle>An On-Call Page at a Denver Delivery-Logistics Company</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Delivery logistics, Denver · 2 a.m. page
          </div>

          <Para>
            A route-assignment script, running as a scheduled job every night, crashes at 2 a.m. and
            pages the on-call engineer — a relatively junior hire, three months into the job, first solo
            page. Tomorrow&apos;s delivery routes will not generate unless this is fixed before dispatch
            opens at 6 a.m.
          </Para>

          <SubSubTitle>What the traceback actually says</SubSubTitle>

          <CodeBox label="The paging alert includes this traceback">{`Traceback (most recent call last):
  File "assign_routes.py", line 88, in <module>
    main()
  File "assign_routes.py", line 71, in main
    routes = build_routes(drivers, stops)
  File "assign_routes.py", line 44, in build_routes
    driver = pick_driver(available_drivers, stop.zone)
  File "assign_routes.py", line 29, in pick_driver
    return sorted(drivers, key=lambda d: d.distance_to(zone))[0]
IndexError: list index out of range`}</CodeBox>

          <Para>
            Half-asleep, the engineer&apos;s first instinct is to start reading from <code>main()</code>{' '}
            at the top of the traceback. Remembering Part 01 of this module, they force themselves to
            start at the bottom instead: <code>IndexError: list index out of range</code>, on the line{' '}
            <code>sorted(...)[0]</code>. Indexing <code>[0]</code> into an empty sorted list is the exact
            cause — <code>drivers</code> was empty when <code>pick_driver</code> ran, meaning every
            available driver had already been assigned before this particular stop was reached.
          </Para>

          <SubSubTitle>Confirming it without guessing</SubSubTitle>

          <Para>
            Rather than editing the file blindly and re-running the full nightly job (which takes eleven
            minutes end to end — an expensive guess-and-check loop at 2 a.m.), the engineer drops a{' '}
            <code>breakpoint()</code> directly above the failing line (Part 03) and re-runs just{' '}
            <code>build_routes</code> against a saved copy of last night&apos;s input data. At the pause,{' '}
            <code>p len(available_drivers)</code>, <code>p stop.zone</code>, and <code>p [d.zone for d in
            drivers]</code> confirm it in under a minute: eight drivers were hired last week for a new zone
            that the stop-assignment logic never accounted for, so every stop in that zone exhausted the
            (wrongly empty) driver pool for it.
          </Para>

          <Para>
            The fix — falling back to the nearest adjacent zone&apos;s drivers when a zone has none
            assigned yet — ships before 4 a.m., routes generate on time, and the engineer writes up the
            incident the next morning. The lesson they take from it, and repeat to the next new hire on
            their team months later, is almost word for word Part 01 of this module: read the traceback
            from the bottom, and confirm your hypothesis with a real pause-and-inspect before editing code
            at 2 a.m. under pressure.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Debugging</SectionTitle>

        {[
          {
            wrong: '"You should read a traceback from the top, since that\'s where the program started"',
            right: 'The bottom of the traceback is where the exception actually occurred. The top is simply the earliest frame in the call chain that led there. Reading bottom-up gets you to the actual failing line immediately, instead of working through layers of context you may not need at all.',
          },
          {
            wrong: '"Real engineers use a debugger, not print statements"',
            right: 'print() debugging is a legitimate, fast, zero-setup tool for small, localized bugs, and experienced engineers use it constantly. The real skill is recognizing when a bug has outgrown it — multiple guesses in, a value that changes across many iterations, or a need to explore interactively — and switching to pdb or an IDE debugger at that point.',
          },
          {
            wrong: '"pdb is an old, obsolete tool now that IDEs have built-in debuggers"',
            right: 'pdb still matters specifically because it needs nothing but a Python interpreter — it works over SSH on a remote server, inside a container with no GUI, and in restricted environments where an IDE simply cannot attach. Most engineers prefer the IDE debugger locally and reach for pdb the moment they are debugging somewhere without a graphical interface.',
          },
          {
            wrong: '"A long traceback means a complicated bug"',
            right: 'A long traceback is usually just Python being thorough about context — showing every function call that led to the failure. The actual fix is almost always concentrated in the last one or two frames at the bottom, regardless of how many frames appear above them.',
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
            q: 'Walk me through how you would debug a Python script that\'s throwing an unfamiliar exception.',
            a: 'Start by reading the traceback from the bottom up — that\'s where the actual exception occurred, with everything above it just showing the call chain that led there. Read the exception type first, since it classifies the category of bug (KeyError means a dict lookup failed, TypeError means a wrong-type operation, and so on). Form a hypothesis about the cause before touching a debugger. If the hypothesis needs confirming, drop a breakpoint() at the suspect line and inspect the actual runtime values with p, rather than guessing and re-running repeatedly.',
          },
          {
            q: 'What\'s the difference between the n (next) and s (step) commands in pdb?',
            a: 'n (next) executes the current line and stops at the next line within the current function, treating any function call on that line as a black box. s (step) actually steps INTO a function call on the current line, letting you watch that function\'s internals execute too. Use n when you trust the function being called and just want to keep moving through your own code; use s the moment you suspect the bug lives inside that call.',
          },
          {
            q: 'When would you choose print() debugging over a real debugger, and when is that the wrong call?',
            a: 'print() is the right choice for a small, localized bug where you already have a strong guess about which value is wrong — it\'s fast and needs no setup. It\'s the wrong call once you\'ve guessed wrong two or three times, the bug depends on how a value changes across many loop iterations, or you need to explore the call stack interactively — at that point a real debugger (pdb or an IDE debugger) is faster than continuing to edit and re-run the file.',
          },
          {
            q: 'Explain binary search debugging and give an example of when you\'d use it.',
            a: 'It\'s the strategy of repeatedly cutting the search space for a bug in half rather than reading linearly — disable or bypass roughly half the suspect code, check if the bug still happens, and recurse into whichever half still reproduces it. It\'s the right tool specifically when you have no localized hypothesis yet, like a bug somewhere in a large unfamiliar codebase, or a regression introduced somewhere in weeks of commits — where git bisect applies the exact same idea to find the introducing commit in log-n steps instead of checking every commit one by one.',
          },
          {
            q: 'Why does rubber duck debugging actually work?',
            a: 'Reading your own code silently lets your brain skim and pattern-match what it expects the code to say, rather than what it actually says — especially in code you wrote yourself. Forcing yourself to explain it out loud, line by line, in full sentences, interrupts that autopilot and makes you state your assumptions explicitly. It\'s extremely common to catch the actual bug mid-sentence, the moment an assumption you say out loud turns out to be false — which is also why explaining a bug to a coworker so often resolves it before they\'ve said anything back.',
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
        <SectionTitle>Debugging Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Reading the traceback top-down and investigating the wrong function',
            a: 'The top of a traceback is context, not the cause. Train yourself to jump straight to the bottom frame first, every time, before reading anything above it.',
          },
          {
            q: 'Making a change and re-running without confirming a hypothesis first',
            a: 'Editing code and hoping it fixes the bug, without ever confirming what was actually wrong, is slow and often introduces a second bug on top of the first. Confirm the cause with a print or breakpoint() before writing the fix.',
          },
          {
            q: 'Leaving debug print() statements in committed code',
            a: 'A stray "DEBUG: ..." print left in production code is a common, avoidable code review flag. Delete debug prints before committing, or better, use proper logging (next module) that can be turned on and off without editing code.',
          },
          {
            q: 'Setting a breakpoint() and then continuing past it without inspecting anything',
            a: 'Pausing at a breakpoint is only useful if you actually use the pause — type p on the variables you suspect, run l to see surrounding code, and use w to check the call stack, before hitting c to continue.',
          },
          {
            q: 'Trying to fix an intermittent bug by staring at the code instead of reproducing it',
            a: 'A bug that only happens sometimes needs to be reproduced reliably before it can be debugged effectively. Narrow down the specific input or timing condition that triggers it, or use post-mortem debugging (python -m pdb -c continue) to inspect the exact state at the moment it does happen.',
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
        <SectionTitle>Errors and Symptoms You Will Hit While Debugging — And Exactly Why</SectionTitle>

        {[
          {
            error: `bdb.BdbQuit`,
            cause: 'Raised when you type "q" (quit) inside a pdb session — this is not a real bug, it is pdb aborting the program because you asked it to stop debugging.',
            fix: 'This is expected behaviour. If you meant to resume normal execution instead of quitting, use "c" (continue) rather than "q".',
          },
          {
            error: `NameError: name 'breakpoint' is not defined`,
            cause: 'breakpoint() was added in Python 3.7. This error means you are running an older Python version.',
            fix: 'Check your version with python3 --version. On anything older than 3.7, use "import pdb; pdb.set_trace()" instead, which does the same thing.',
          },
          {
            error: `The debugger opens but every variable shows as undefined`,
            cause: 'You set a breakpoint on a line that has not executed yet — variables defined later in the function genuinely do not exist yet at that point in execution.',
            fix: 'Use "n" to step forward past the lines that create the variables you want to inspect, or move the breakpoint later in the function.',
          },
          {
            error: `VS Code says "Just My Code" is hiding a frame you need to see`,
            cause: 'By default, VS Code\'s debugger skips stepping into library/standard-library code to keep the call stack focused on your own code.',
            fix: 'Disable "Just My Code" in the debug configuration (launch.json) if you specifically need to step into a third-party library\'s internals to understand a bug.',
          },
          {
            error: `A breakpoint set in VS Code never gets hit`,
            cause: 'Common causes: the file being run is not the one you set the breakpoint in (e.g. a stale cached .pyc, or you\'re running a different entry point), or the line is inside a code path that never actually executes for the input you\'re testing.',
            fix: 'Confirm which file is actually running (check the debug console\'s displayed path), and add a temporary print() right above the breakpoint to confirm that line is reached at all.',
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
        'Read a traceback from the bottom up — that is where the actual exception occurred. Everything above it is call-chain context.',
        'The exception type (KeyError, TypeError, IndexError, AttributeError...) classifies the bug before you read a single line of your own code.',
        'print() debugging is legitimate and fast for small, localized bugs — the skill is recognizing when to switch to a real debugger.',
        'breakpoint() (or the older pdb.set_trace()) pauses execution and drops you into an interactive prompt. Core commands: n, s, c, p, l, w.',
        'VS Code\'s built-in debugger gives you the same power visually — breakpoints, a variables panel, a watch panel, and a clickable call stack — plus conditional breakpoints, which are hard to replicate quickly in plain pdb.',
        'Rubber duck debugging works by forcing you to state assumptions out loud, interrupting the autopilot skimming that happens when reading code silently.',
        'Binary search debugging (and git bisect for regressions) is the right tool when you have no localized hypothesis yet — cut the search space in half repeatedly.',
        'A real debugging session combines these tools in sequence: read the error, form a hypothesis, confirm it with a pause-and-inspect, then fix — not one technique in isolation.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 40 covers logging — why print() genuinely is not logging, the logging module, log levels,
          and configuring a logger the way real production services do it.
        </p>
        <Link href="/learn/python/logging-best-practices" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 40 → Logging Best Practices
        </Link>
      </div>
    </LearnLayout>
  )
}
