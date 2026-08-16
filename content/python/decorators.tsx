import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Decorators — Writing and Using Them — Python | Chaduvuko',
  description:
    'Functions that wrap functions. How decorators actually work, and writing your own from scratch.',
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

export default function Decorators() {
  return (
    <LearnLayout
      title="Decorators — Writing and Using Them"
      description="Functions that wrap functions. How decorators actually work, and writing your own from scratch."
      section="Python — Module 29"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Functions Are Objects" />
        <SectionTitle>The Foundation Decorators Are Built On</SectionTitle>

        <Para>
          You already know functions can be passed as arguments and returned from other functions — this
          was covered when Functions were introduced, and used again with <code>map</code>/<code>filter</code>{' '}
          in the functional-tools module. A decorator is nothing more exotic than a function that takes a
          function as input and returns a new function as output.
        </Para>

        <CodeBox label="A decorator is just a function returning a function">{`def loud(func):
    def wrapper():
        print("About to call the function...")
        func()
        print("...function finished.")
    return wrapper

def greet():
    print("Hello!")

greet = loud(greet)   # manually "decorating" greet by reassigning it
greet()
# About to call the function...
# Hello!
# ...function finished.`}</CodeBox>

        <Para>
          Every ingredient of a decorator is already visible here: <code>loud</code> takes a function,
          defines a new inner function (<code>wrapper</code>) that calls the original and adds behaviour
          around it, and returns that wrapper. The <code>@</code> syntax you are about to see is purely
          syntax sugar for exactly the reassignment on the line above.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The @ Syntax" />
        <SectionTitle>@decorator Is Sugar for func = decorator(func)</SectionTitle>

        <CodeBox label="The @ syntax, unwrapped">{`def loud(func):
    def wrapper():
        print("About to call the function...")
        func()
        print("...function finished.")
    return wrapper

@loud
def greet():
    print("Hello!")

# The line above is EXACTLY equivalent to:
#     def greet():
#         print("Hello!")
#     greet = loud(greet)

greet()   # identical output to Part 01`}</CodeBox>

        <Callout type="tip">
          <strong>Read <code>@decorator</code> as "replace the function immediately below with{' '}
          <code>decorator(that function)</code>."</strong> Once you can mentally unwrap the{' '}
          <code>@</code> syntax into the plain reassignment it really is, decorators stop looking like
          magic — they are ordinary function calls, just applied at definition time instead of call time.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Handling Arguments and Return Values" />
        <SectionTitle>A Real Decorator Must Forward Everything</SectionTitle>

        <Para>
          The <code>loud</code> example above only works on functions that take no arguments and return
          nothing — useless for real code. A proper decorator uses <code>*args</code> and{' '}
          <code>**kwargs</code> (covered in the previous module) so it can wrap <em>any</em> function
          signature, and it must explicitly return whatever the wrapped function returns.
        </Para>

        <CodeBox label="A decorator that works on any function">{`def loud(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result       # critical — forget this and every decorated function silently returns None
    return wrapper

@loud
def add(a, b):
    return a + b

total = add(3, 4)
# Calling add with args=(3, 4), kwargs={}
# add returned 7
print(total)   # 7 — the real return value made it through`}</CodeBox>

        <Callout type="warning">
          <strong>Forgetting <code>return result</code> inside the wrapper is the single most common
          decorator bug.</strong> The decorated function still "runs" and appears to work — but every
          call site that relies on its return value silently receives <code>None</code> instead, often
          not noticed until much later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — functools.wraps" />
        <SectionTitle>The Metadata a Naive Decorator Silently Destroys</SectionTitle>

        <Para>
          Once a function is decorated, it is literally <em>replaced</em> by the wrapper — which means
          things like <code>func.__name__</code> and <code>func.__doc__</code> now report the{' '}
          <em>wrapper's</em> identity, not the original function's, unless you fix it.
        </Para>

        <CodeBox label="The metadata-loss problem">{`def loud(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@loud
def add(a, b):
    """Add two numbers together."""
    return a + b

print(add.__name__)   # "wrapper" — WRONG! Should be "add"
print(add.__doc__)    # None — WRONG! The real docstring is lost`}</CodeBox>

        <CodeBox label="functools.wraps — the fix">{`from functools import wraps

def loud(func):
    @wraps(func)              # copies __name__, __doc__, and more from func onto wrapper
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@loud
def add(a, b):
    """Add two numbers together."""
    return a + b

print(add.__name__)   # "add" — correct
print(add.__doc__)    # "Add two numbers together." — correct`}</CodeBox>

        <Callout type="tip">
          <strong><code>@wraps(func)</code> should be considered mandatory on every decorator you
          write</strong> — without it, debugging tools, documentation generators, and anything that
          introspects a function's identity (including some testing frameworks) see the wrapper's
          generic identity instead of the real function's, which becomes a genuinely confusing
          debugging experience once a codebase has several decorators stacked or applied broadly.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Decorators That Take Arguments" />
        <SectionTitle>Decorator Factories — One More Layer of Nesting</SectionTitle>

        <Para>
          Sometimes you want to configure a decorator itself — <code>@retry(times=3)</code> instead of
          just <code>@retry</code>. This requires a <strong>decorator factory</strong>: a function that
          takes the configuration arguments and returns the actual decorator, which then returns the
          wrapper. Three levels of nested functions in total.
        </Para>

        <CodeBox label="A decorator factory — three nested layers">{`from functools import wraps
import time

def retry(times):                          # layer 1: takes the CONFIGURATION
    def decorator(func):                    # layer 2: takes the FUNCTION
        @wraps(func)
        def wrapper(*args, **kwargs):       # layer 3: runs on each CALL
            last_error = None
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except ConnectionError as e:
                    last_error = e
                    print(f"Attempt {attempt} failed, retrying...")
                    time.sleep(1)
            raise last_error
        return wrapper
    return decorator

@retry(times=3)
def fetch_data():
    ...`}</CodeBox>

        <Para>
          Unwrapped, <code>@retry(times=3)</code> above <code>def fetch_data():</code> means:{' '}
          <code>fetch_data = retry(3)(fetch_data)</code> — first <code>retry(3)</code> runs and returns
          the actual <code>decorator</code> function, and <em>that</em> is what gets applied to{' '}
          <code>fetch_data</code>. This is the same nesting pattern used by closures (the very next
          module), and understanding closures makes this pattern click far faster.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Stacking Decorators" />
        <SectionTitle>Multiple Decorators — Order Matters, Both Ways</SectionTitle>

        <CodeBox label="Stacked decorators">{`@decorator_a
@decorator_b
def my_function():
    ...

# Equivalent to:
# my_function = decorator_a(decorator_b(my_function))`}</CodeBox>

        <Para>
          Two directions of "order" both matter, and they are opposites of each other.{' '}
          <strong>Application order</strong> (which decorator wraps which) works bottom-up:{' '}
          <code>decorator_b</code> wraps the original function first, then <code>decorator_a</code>{' '}
          wraps the already-wrapped result. <strong>Execution order</strong> (what actually runs when you
          call the function) works top-down: <code>decorator_a</code>'s wrapper code runs first (since
          it is the outermost layer), which then calls into <code>decorator_b</code>'s wrapper, which
          finally calls the real function.
        </Para>

        <CodeBox label="Seeing both orders in one example">{`from functools import wraps

def announce(label):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            print(f"[{label}] entering")
            result = func(*args, **kwargs)
            print(f"[{label}] exiting")
            return result
        return wrapper
    return decorator

@announce("OUTER")
@announce("INNER")
def task():
    print("  doing the actual work")

task()
# [OUTER] entering
# [INNER] entering
#   doing the actual work
# [INNER] exiting
# [OUTER] exiting`}</CodeBox>

        <Para>
          Notice OUTER starts first and finishes last — exactly like nested parentheses, the outermost
          call is the first thing you "enter" and the last thing you "exit."
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Adding Caching to a Slow Endpoint at a Miami Travel-Tech Company</SectionTitle>

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
            Scenario — Travel-tech company, Miami · Performance incident
          </div>

          <Para>
            A function that looks up flight-route metadata from a slow internal database is called
            repeatedly with the same handful of popular routes, hundreds of times a minute, each call
            taking 200ms. An engineer reaches for Python's built-in <code>functools.lru_cache</code>{' '}
            decorator rather than hand-rolling a caching layer.
          </Para>

          <CodeBox label="Before — every call hits the slow database">{`def get_route_info(origin, destination):
    return slow_database_lookup(origin, destination)   # ~200ms every time`}</CodeBox>

          <CodeBox label="After — one decorator, dramatic effect">{`from functools import lru_cache

@lru_cache(maxsize=256)
def get_route_info(origin, destination):
    return slow_database_lookup(origin, destination)

get_route_info("JFK", "LAX")   # ~200ms — cache miss, runs the real lookup
get_route_info("JFK", "LAX")   # ~0ms  — cache hit, returns the stored result instantly`}</CodeBox>

          <SubSubTitle>Why this is exactly the kind of thing decorators are for</SubSubTitle>

          <Para>
            The caching logic — checking whether this exact combination of arguments was seen before,
            storing results, evicting the oldest entries once <code>maxsize</code> is reached — is
            completely generic and has nothing to do with flight routes specifically.{' '}
            <code>lru_cache</code> is itself just a decorator, written using exactly the pattern covered
            in this module, and applying it required changing precisely one line, with zero changes to{' '}
            <code>get_route_info</code>'s own logic. This is the real payoff of decorators: cross-cutting
            behaviour (caching, logging, timing, retries, access control) added without touching the
            function's actual implementation at all.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Decorators</SectionTitle>

        {[
          {
            wrong: '"Decorators are an advanced, rarely-used Python feature"',
            right: 'You almost certainly use them constantly without thinking of them as advanced — @property, @staticmethod, @classmethod (already covered), and functools.lru_cache are all decorators. They are a core, everyday part of idiomatic Python, not an obscure corner.',
          },
          {
            wrong: '"@wraps(func) is just a nice-to-have, not something that matters much"',
            right: 'Skipping it silently corrupts the decorated function\'s __name__, __doc__, and other metadata to the wrapper\'s generic identity — which breaks debugging tools, documentation generation, and anything that introspects the function, in ways that can be genuinely confusing to track down later.',
          },
          {
            wrong: '"The order you stack decorators in doesn\'t really matter"',
            right: "It matters a great deal — application is bottom-up, execution is top-down (outermost enters first, exits last), and reordering decorators that interact (e.g. a caching decorator above vs below a logging decorator) can change what actually gets cached or logged.",
          },
          {
            wrong: '"A decorator can only wrap a function that takes no arguments, or a fixed signature"',
            right: 'A properly written decorator using *args and **kwargs in its wrapper works on ANY function signature — the whole point of *args/**kwargs (covered in the previous module) is enabling exactly this kind of fully generic forwarding.',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is a decorator, in the simplest possible terms?',
            a: 'A function that takes a function as input and returns a new function (usually a wrapper that adds behaviour before/after/around calling the original) as output. @decorator above a function definition is syntax sugar for func = decorator(func).',
          },
          {
            q: 'Why is functools.wraps important, and what does it actually do?',
            a: 'Without it, a decorated function\'s __name__, __doc__, and related metadata report the wrapper\'s generic identity instead of the original function\'s, breaking debugging tools and introspection. @wraps(func), applied to the inner wrapper function, copies that metadata from the original function onto the wrapper.',
          },
          {
            q: 'How do you write a decorator that accepts its own arguments, like @retry(times=3)?',
            a: 'You need three levels of nested functions: an outer function that takes the configuration argument(s) and returns the actual decorator; the decorator, which takes the function and returns the wrapper; and the wrapper, which runs on each call. @retry(times=3) unwraps to fetch_data = retry(3)(fetch_data).',
          },
          {
            q: 'If two decorators are stacked on the same function, what determines execution order?',
            a: 'Application is bottom-up (the closest decorator to the function wraps it first), but execution at call time is top-down — the outermost decorator\'s wrapper code runs first, then calls into the next one down, and so on until the real function runs, then unwinds back out in reverse.',
          },
          {
            q: 'What is the most common bug when writing a decorator from scratch, and how do you avoid it?',
            a: 'Forgetting to return the wrapped function\'s result inside the wrapper — the decorated function still appears to run correctly, but every caller relying on its return value silently gets None instead. Always end the wrapper with "return func(*args, **kwargs)" or capture the result and return it explicitly after any extra logic.',
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
        <SectionTitle>Decorator Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting to return the wrapper function from the decorator',
            a: 'def decorator(func): def wrapper(): ... — without "return wrapper" at the end of decorator, the decorated name becomes None, since a function with no explicit return implicitly returns None.',
          },
          {
            q: 'Forgetting *args, **kwargs on the wrapper',
            a: 'def wrapper(): only works on zero-argument functions — decorating any function that takes arguments raises a TypeError the moment it is called with them. Always write def wrapper(*args, **kwargs): unless you specifically need a fixed signature.',
          },
          {
            q: 'Calling the decorator factory but forgetting the parentheses',
            a: '@retry (without parentheses) passes the function itself as the "times" argument to retry, which is not what was intended — decorator FACTORIES always need to be called, even with no real arguments: @retry() at minimum.',
          },
          {
            q: 'Putting logic in the outer decorator function instead of the inner wrapper',
            a: 'Code written directly inside "def decorator(func):" (not inside "def wrapper(...):") runs exactly ONCE, at decoration time — not on every call. Logic that should run on every call to the decorated function must live inside the innermost wrapper.',
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
        <SectionTitle>Errors You Will Hit With Decorators — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: 'NoneType' object is not callable`,
            cause: 'A decorator function did not return its inner wrapper — the decorated name became None, and later code tried to call it like a function.',
            fix: 'Add "return wrapper" at the end of the decorator function.',
          },
          {
            error: `TypeError: wrapper() takes 0 positional arguments but 2 were given`,
            cause: 'The wrapper function was defined without *args, **kwargs, so it cannot accept the arguments the decorated function is actually being called with.',
            fix: 'Change the wrapper\'s signature to def wrapper(*args, **kwargs): and forward them with func(*args, **kwargs).',
          },
          {
            error: `TypeError: retry() missing 1 required positional argument: 'func'`,
            cause: 'A decorator factory was applied without calling it — @retry instead of @retry(times=3) — so the function being decorated was passed directly as the factory\'s first (configuration) argument instead of being decorated properly.',
            fix: 'Always call a decorator factory, even with default/no arguments: @retry() at minimum.',
          },
          {
            error: `AttributeError: 'function' object has no attribute '__wrapped__'`,
            cause: 'Code (often a testing or introspection tool) expected functools.wraps to have been used, exposing the original function via __wrapped__, but the decorator was written without @wraps.',
            fix: 'Add @wraps(func) to the wrapper definition inside every decorator you write.',
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
        'A decorator is a function that takes a function and returns a new (usually wrapping) function. @decorator is sugar for func = decorator(func).',
        'A wrapper should accept *args, **kwargs to support any function signature, and must explicitly return the original function\'s result — the most common decorator bug is forgetting that return.',
        'functools.wraps(func) on the inner wrapper preserves __name__, __doc__, and other metadata — treat it as mandatory on every decorator you write.',
        'A decorator that takes its own arguments (@retry(times=3)) needs three levels of nesting: a factory, the decorator, and the wrapper.',
        'Stacked decorators apply bottom-up but execute top-down at call time — the outermost decorator enters first and exits last.',
        'functools.lru_cache, @property, @staticmethod, and @classmethod are all decorators you likely already use — decorators are an everyday Python tool, not an obscure advanced feature.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 30 covers context managers and the with statement — what with is actually doing under
          the hood, and building your own for resource management.
        </p>
        <Link href="/learn/python/context-managers" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 30 → Context Managers and the with Statement
        </Link>
      </div>
    </LearnLayout>
  )
}
