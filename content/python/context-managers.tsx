import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Context Managers and the with Statement — Python | Chaduvuko',
  description:
    'What with is actually doing, and building your own context managers for resource management.',
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

export default function ContextManagers() {
  return (
    <LearnLayout
      title="Context Managers and the with Statement"
      description="What with is actually doing, and building your own context managers for resource management."
      section="Python — Module 30"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What with Is Actually For" />
        <SectionTitle>Guaranteed Cleanup, Even When Things Go Wrong</SectionTitle>

        <Para>
          You met <code>with open(...) as f:</code> back in the Reading &amp; Writing Files module, with
          a promise that it would be explained properly later — this is that module. The{' '}
          <code>with</code> statement exists to guarantee that some cleanup action (closing a file,
          releasing a lock, closing a database connection) happens no matter how the block inside exits
          — normally, via an early <code>return</code>, or because an exception was raised.
        </Para>

        <CodeBox label="The manual, error-prone equivalent">{`f = open("data.txt")
data = f.read()
process(data)     # if this raises an exception, f.close() below NEVER RUNS — file stays open
f.close()`}</CodeBox>

        <CodeBox label="with — cleanup is guaranteed regardless of how the block exits">{`with open("data.txt") as f:
    data = f.read()
    process(data)   # even if this raises, the file is still closed correctly
# f.close() has already happened automatically here`}</CodeBox>

        <Para>
          This is not a minor convenience — a leaked file handle, database connection, or lock in
          production code is a genuinely common category of real bug, and it is exactly the class of bug{' '}
          <code>with</code> makes structurally difficult to write in the first place.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Protocol Underneath" />
        <SectionTitle>__enter__ and __exit__</SectionTitle>

        <Para>
          A <code>with</code> statement works with any object that implements two dunder methods:{' '}
          <code>__enter__</code>, called at the start of the block (its return value is what{' '}
          <code>as</code> binds to), and <code>__exit__</code>, called when the block ends — no matter
          how it ends.
        </Para>

        <CodeBox label="Building a context manager from scratch">{`class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self            # this becomes the value bound by "as"

    def __exit__(self, exc_type, exc_value, traceback):
        import time
        elapsed = time.time() - self.start
        print(f"Elapsed: {elapsed:.3f}s")
        return False            # False = don't suppress any exception (see Part 03)

with Timer() as t:
    total = sum(range(10_000_000))
# Elapsed: 0.412s   <- printed automatically when the block ends`}</CodeBox>

        <Para>
          <code>__exit__</code> always receives three arguments describing any exception that occurred
          inside the block — <code>exc_type</code>, <code>exc_value</code>, and <code>traceback</code> —
          all three are <code>None</code> if the block completed normally with no exception at all.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Exception-Suppression Trap" />
        <SectionTitle>What __exit__'s Return Value Actually Controls</SectionTitle>

        <Para>
          This is the single most important and most misunderstood detail of the protocol:{' '}
          <strong>if <code>__exit__</code> returns a truthy value, Python treats the exception as
          handled and suppresses it entirely</strong> — the exception simply vanishes, as if it never
          happened, and code after the <code>with</code> block continues executing normally.
        </Para>

        <CodeBox label="A dangerous, accidental footgun">{`class BadLogger:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type is not None:
            print(f"Something went wrong: {exc_value}")
        return True    # DANGER: this SUPPRESSES the exception entirely!

with BadLogger():
    result = 10 / 0    # ZeroDivisionError happens...
print("Program continues normally")
# Something went wrong: division by zero
# Program continues normally     <- the exception was silently swallowed, "result" was NEVER assigned!`}</CodeBox>

        <Callout type="warning">
          <strong>Almost every context manager should return <code>False</code> (or nothing, which is
          the same as <code>None</code> — also falsy) from <code>__exit__</code>.</strong> Deliberately
          suppressing exceptions is a legitimate, narrow use case (for example, a context manager whose
          entire purpose is ignoring a specific known error type), but doing it accidentally — by
          returning a truthy value out of habit, or by the last statement inside{' '}
          <code>__exit__</code> happening to evaluate truthy — silently hides real bugs and is
          extremely difficult to debug later, since the program simply continues as if nothing failed.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — contextlib.contextmanager" />
        <SectionTitle>Writing a Context Manager With a Generator Instead of a Class</SectionTitle>

        <Para>
          Writing a full class with <code>__enter__</code>/<code>__exit__</code> is verbose for simple
          cases. <code>contextlib.contextmanager</code> lets you write a context manager as a single
          generator function (generators were covered in the previous phase) — everything before{' '}
          <code>yield</code> becomes <code>__enter__</code>, the yielded value becomes what{' '}
          <code>as</code> binds to, and everything after <code>yield</code> becomes{' '}
          <code>__exit__</code>.
        </Para>

        <CodeBox label="The Timer example, rewritten as a generator-based context manager">{`from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = time.time()
    try:
        yield              # the "with" block's code runs here, at the yield point
    finally:
        elapsed = time.time() - start
        print(f"Elapsed: {elapsed:.3f}s")

with timer():
    total = sum(range(10_000_000))
# Elapsed: 0.412s`}</CodeBox>

        <Callout type="tip">
          <strong>Always wrap the <code>yield</code> in a <code>try</code>/<code>finally</code>.</strong>{' '}
          If the code inside the <code>with</code> block raises an exception, that exception is raised{' '}
          <em>at the yield statement itself</em> inside your generator — without a{' '}
          <code>finally</code>, your cleanup code after <code>yield</code> would simply never run if an
          exception occurs, exactly defeating the purpose of using a context manager in the first place.
        </Callout>

        <SubTitle>A genuinely common real use — temporarily changing state and restoring it</SubTitle>

        <CodeBox label="Temporarily changing the working directory, then restoring it">{`from contextlib import contextmanager
import os

@contextmanager
def working_directory(path):
    original = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(original)     # ALWAYS restored, even if the block raises

with working_directory("/tmp"):
    print(os.getcwd())    # /tmp
print(os.getcwd())        # back to the original directory automatically`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Multiple and Nested Context Managers" />
        <SectionTitle>Combining Several Resources in One with Statement</SectionTitle>

        <CodeBox label="Multiple context managers, one statement">{`with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read().upper())
# BOTH files are guaranteed closed here, even if writing raised an exception`}</CodeBox>

        <Para>
          This comma-separated form is equivalent to nesting two separate <code>with</code> statements —
          Python enters each context manager in order, and exits them in{' '}
          <strong>reverse</strong> order once the block ends, exactly like closing nested parentheses.
        </Para>

        <CodeBox label="A real example — a database connection and a lock together">{`with db.connection() as conn, conn.lock():
    conn.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
# The lock is released first, THEN the connection is closed — reverse of entry order`}</CodeBox>
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
        <SectionTitle>A Connection Pool Exhaustion Incident at a Portland E-commerce Company</SectionTitle>

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
            Scenario — E-commerce company, Portland · Production incident
          </div>

          <Para>
            A checkout service starts returning "connection pool exhausted" errors under normal traffic.
            Investigation traces it to a function that manually acquires a database connection and
            releases it at the end — but a validation check earlier in the function occasionally raises
            an exception on malformed cart data, skipping the release call entirely.
          </Para>

          <CodeBox label="The bug — manual release, skipped on the exception path">{`def checkout(cart):
    conn = pool.acquire()
    validate_cart(cart)          # raises ValueError on malformed data — happens under real traffic
    conn.execute("INSERT INTO orders ...")
    pool.release(conn)           # NEVER REACHED if validate_cart raised — connection leaks`}</CodeBox>

          <CodeBox label="The fix — a context manager guarantees release either way">{`def checkout(cart):
    with pool.connection() as conn:     # pool.connection() is a context manager wrapping acquire/release
        validate_cart(cart)
        conn.execute("INSERT INTO orders ...")
    # conn is released here NO MATTER WHAT — including if validate_cart raised`}</CodeBox>

          <SubSubTitle>Why manual acquire/release is considered a code smell in review</SubSubTitle>

          <Para>
            Every manually paired "acquire resource / release resource" pattern has exactly this failure
            mode: any code between the two calls that can raise an exception silently skips the release.
            The connection pool itself already exposed a context-manager-based{' '}
            <code>pool.connection()</code> for precisely this reason — reviewers at this company now
            flag any manual <code>acquire()</code>/<code>release()</code> pairing on sight, since a{' '}
            <code>with</code>-based alternative almost always already exists or can be written in a few
            lines using <code>contextlib.contextmanager</code>.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Context Managers</SectionTitle>

        {[
          {
            wrong: '"with is special syntax just for files"',
            right: 'with works with ANY object implementing __enter__/__exit__ (or written via @contextmanager) — database connections, locks, temporary state changes, network sockets, and plenty of custom resource-management code all use it, not just file handles.',
          },
          {
            wrong: '"__exit__ returning True or False doesn\'t really matter, as long as cleanup ran"',
            right: 'It matters enormously — returning a truthy value SUPPRESSES any exception that occurred inside the with block entirely, silently swallowing it. Almost every context manager should return False (or nothing) unless deliberately suppressing a specific, known exception type is the actual intent.',
          },
          {
            wrong: '"A try/finally block and a with statement are basically interchangeable"',
            right: 'A with statement using a well-written context manager encapsulates the acquire/release pairing in ONE reusable place, so every call site gets correct cleanup automatically. A hand-written try/finally has to be correctly reproduced at every call site individually — easy to forget once, as shown in the Real World example above.',
          },
          {
            wrong: '"@contextmanager generators don\'t need a try/finally around the yield, since with handles cleanup"',
            right: 'Without a try/finally wrapping the yield, an exception raised inside the with block propagates out of your generator at the yield point and skips any cleanup code written after it — defeating the entire purpose. The try/finally is not optional.',
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
            q: 'What two methods does an object need to work with the with statement, and what does each do?',
            a: '__enter__, called at the start of the block, whose return value is bound by "as". __exit__, called when the block ends for any reason — normal completion, early return, or an exception — receiving the exception type/value/traceback (all None if nothing went wrong).',
          },
          {
            q: 'What does the return value of __exit__ control, and what is the safe default?',
            a: "A truthy return value from __exit__ SUPPRESSES any exception that occurred inside the with block, making it vanish silently. The safe default for almost every context manager is to return False (or nothing), letting exceptions propagate normally.",
          },
          {
            q: 'How does contextlib.contextmanager let you write a context manager without a class?',
            a: 'As a generator function decorated with @contextmanager: code before yield becomes __enter__, the yielded value becomes what "as" binds to, and code after yield (which MUST be wrapped in try/finally) becomes __exit__.',
          },
          {
            q: 'Why is a context manager generally preferred over a manual try/finally at each call site?',
            a: "It centralizes the acquire/release pairing in one reusable place, so every caller automatically gets correct cleanup with a single 'with' line, rather than requiring every call site to correctly hand-write its own try/finally — which is easy to get wrong or forget once, exactly the kind of bug that causes resource leaks in production.",
          },
          {
            q: 'What happens when multiple context managers are combined in one with statement, like "with a, b:"?',
            a: 'They are entered in the order written (a then b), and exited in REVERSE order (b then a) once the block ends — equivalent to nesting them, like closing parentheses in reverse of how they were opened.',
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
        <SectionTitle>Context Manager Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Accidentally returning a truthy value from __exit__',
            a: 'This silently suppresses ANY exception raised inside the with block — often by accident, when the last line of __exit__ happens to evaluate truthy. Explicitly "return False" (or nothing at all) unless suppression is truly intended.',
          },
          {
            q: 'Forgetting try/finally around yield in a @contextmanager generator',
            a: 'An exception inside the with block propagates at the yield point in the generator — without finally, any cleanup code written after yield is skipped entirely.',
          },
          {
            q: 'Manually pairing acquire()/release() instead of using an available context manager',
            a: 'Any exception-raising code between the acquire and release calls skips the release, leaking the resource — exactly the production bug shown in the Real World example above.',
          },
          {
            q: 'Forgetting that __enter__ must return the value meant to be bound by "as"',
            a: 'A class-based context manager whose __enter__ has no explicit return statement makes "with Resource() as r:" bind r to None, since a function with no return implicitly returns None.',
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
        <SectionTitle>Errors You Will Hit With Context Managers — And Exactly Why</SectionTitle>

        {[
          {
            error: `AttributeError: __enter__`,
            cause: 'An object used in a with statement does not implement the context manager protocol at all (no __enter__/__exit__).',
            fix: 'Confirm the object is actually meant to be used as a context manager — many types have a dedicated factory (like pool.connection()) that returns one, rather than the raw object itself.',
          },
          {
            error: `TypeError: __exit__() takes 1 positional argument but 4 were given`,
            cause: 'A hand-written __exit__ method was defined without the required (self, exc_type, exc_value, traceback) signature — Python always calls it with exactly these three exception-info arguments in addition to self.',
          },
          {
            error: `RuntimeError: generator didn't stop after throw()`,
            cause: 'A @contextmanager generator function yields more than once, or catches the exception thrown at the yield point and then yields again instead of letting the function end.',
            fix: 'A @contextmanager generator must yield exactly once — remove any additional yield statements.',
          },
          {
            error: `(No error at all — the real symptom is a silently swallowed exception)`,
            cause: '__exit__ returns a truthy value, suppressing an exception that should have propagated and been visible.',
            fix: 'Check every __exit__ implementation in the codebase and confirm it returns False (or nothing) unless suppression is a deliberate, documented design choice.',
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
            {item.fix && (
              <div>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase',
                }}>Fix: </span>
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'with guarantees cleanup code runs no matter how a block exits — normal completion, early return, or an exception — unlike manually paired acquire/release calls, which skip cleanup if an exception occurs in between.',
        'The protocol is __enter__ (runs at block start, return value bound by "as") and __exit__ (runs at block end, receiving exception info).',
        'A truthy return from __exit__ SUPPRESSES the exception entirely — almost always return False or nothing, unless deliberate suppression is the actual intent.',
        '@contextmanager lets you write a context manager as a generator: code before yield is __enter__, the yielded value is bound by "as", code after yield (wrapped in try/finally) is __exit__.',
        'Multiple context managers can be combined in one with statement, separated by commas — they enter in order and exit in reverse order.',
        'Prefer an existing or custom context manager over hand-written try/finally resource management wherever one is available — it centralizes correct cleanup in one place instead of relying on every call site getting it right.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 31 closes out the Intermediate & Functional Python phase with closures and the LEGB
          scope rule — how Python actually resolves variable names, and the scoping bugs that confuse
          everyone once.
        </p>
        <Link href="/learn/python/closures-scope" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 31 → Closures and Scope — The LEGB Rule
        </Link>
      </div>
    </LearnLayout>
  )
}
