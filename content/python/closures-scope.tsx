import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Closures and Scope — The LEGB Rule — Python | Chaduvuko',
  description:
    'How Python resolves variable names, what a closure actually captures, and the scoping bugs that confuse everyone once.',
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

export default function ClosuresScope() {
  return (
    <LearnLayout
      title="Closures and Scope — The LEGB Rule"
      description="How Python resolves variable names, what a closure actually captures, and the scoping bugs that confuse everyone once."
      section="Python — Module 31"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The LEGB Rule" />
        <SectionTitle>Four Places Python Looks for a Name, In Order</SectionTitle>

        <Para>
          Every time Python encounters a variable name, it searches for it in a fixed order across four
          scopes, stopping at the first match — this search order is commonly remembered by the acronym{' '}
          <strong>LEGB</strong>.
        </Para>

        <CodeBox label="LEGB, in search order">{`# L — Local:     names assigned inside the current function
# E — Enclosing:  names in any enclosing function (for nested functions)
# G — Global:     names assigned at the top level of the module
# B — Built-in:   names Python provides automatically (len, print, str, ...)

x = "global x"

def outer():
    x = "enclosing x"

    def inner():
        x = "local x"
        print(x)          # "local x" — found immediately in Local scope, search stops there

    inner()
    print(x)               # "enclosing x" — Local scope for outer() has its own x

print(x)                    # "global x"`}</CodeBox>

        <Para>
          If <code>inner()</code> did not assign its own <code>x</code>, Python would continue searching
          outward — checking Enclosing, then Global, then finally Built-in — raising a{' '}
          <code>NameError</code> only if none of the four scopes contain the name at all.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — What a Closure Actually Is" />
        <SectionTitle>A Function That Remembers Its Enclosing Scope</SectionTitle>

        <Para>
          A <strong>closure</strong> is what happens when an inner function references a variable from
          its enclosing function, and that inner function is then returned or passed elsewhere —
          Python keeps the enclosing variable alive and accessible, bound to that specific inner
          function, even after the outer function has already finished running.
        </Para>

        <CodeBox label="A closure in action">{`def make_multiplier(factor):
    def multiply(n):
        return n * factor      # "factor" is captured from the enclosing scope
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))    # 10 — remembers factor=2, even though make_multiplier already returned
print(triple(5))    # 15 — a COMPLETELY separate captured factor=3`}</CodeBox>

        <Para>
          This should look immediately familiar — it is exactly the mechanism decorators are built on
          (the previous module), and it is why <code>double</code> and <code>triple</code> behave
          completely independently despite both being created by the same <code>make_multiplier</code>{' '}
          function: each call to <code>make_multiplier</code> creates a fresh, separate{' '}
          <code>factor</code> variable, and each returned <code>multiply</code> function closes over its
          own copy.
        </Para>

        <SubTitle>Inspecting what a closure actually captured</SubTitle>

        <CodeBox label="Closures are inspectable">{`print(double.__closure__[0].cell_contents)   # 2
print(triple.__closure__[0].cell_contents)   # 3`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Captured by Reference, Not by Value" />
        <SectionTitle>The Classic Loop-Variable-Closure Bug</SectionTitle>

        <Para>
          A closure captures a <strong>reference</strong> to the enclosing variable, not a frozen
          snapshot of its value at the time the inner function was created. This produces one of the
          most common, genuinely surprising bugs in intermediate Python code.
        </Para>

        <CodeBox label="The bug — every closure ends up sharing the SAME final value of i">{`functions = []
for i in range(3):
    functions.append(lambda: i)

print([f() for f in functions])
# [2, 2, 2]  <- probably not what you expected!
# All three lambdas share the SAME "i" variable, which is 2 by the time
# any of them are actually called, since the loop has already finished`}</CodeBox>

        <Para>
          This is the exact same underlying mechanism as the comprehension-scoping behaviour touched on
          in the Comprehensions module, and it is a genuinely common source of confusion — the mental
          model "the lambda captured whatever <code>i</code> was at that moment in the loop" is simply
          wrong; it captured the <em>variable itself</em>, and that variable keeps changing until the
          loop ends.
        </Para>

        <CodeBox label="The fix — force capture of the CURRENT value via a default argument">{`functions = []
for i in range(3):
    functions.append(lambda i=i: i)   # i=i: default arguments are evaluated immediately, at DEFINITION time

print([f() for f in functions])
# [0, 1, 2]  <- correct now`}</CodeBox>

        <Callout type="tip">
          <strong>Default argument values are evaluated once, at function-definition time</strong> — not
          at call time. This is precisely why <code>lambda i=i: i</code> works: it evaluates the
          current, this-iteration's <code>i</code> immediately and stores it as the default, completely
          independent of whatever <code>i</code> becomes on later iterations. This same default-argument
          timing is also the root cause of the classic mutable-default-argument trap covered back in the
          Constructors module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — nonlocal" />
        <SectionTitle>Modifying (Not Just Reading) an Enclosing Variable</SectionTitle>

        <Para>
          Reading an enclosing variable from a nested function works automatically, as shown throughout
          this module. <strong>Assigning</strong> to one does not — by default, any assignment inside a
          function creates a brand-new local variable, shadowing the enclosing one entirely, rather than
          modifying it.
        </Para>

        <CodeBox label="Assignment creates a NEW local variable by default">{`def make_counter():
    count = 0

    def increment():
        count = count + 1   # UnboundLocalError!
        return count

    return increment

counter = make_counter()
counter()
# UnboundLocalError: cannot access local variable 'count' where it is not associated with a value`}</CodeBox>

        <Para>
          Python sees the assignment <code>count = count + 1</code> inside <code>increment</code> and
          decides, at compile time, that <code>count</code> is a local variable of{' '}
          <code>increment</code> — which means the read on the right-hand side ({' '}
          <code>count + 1</code>) is now reading that not-yet-assigned local variable, not the enclosing
          one, raising the error before the assignment even happens.
        </Para>

        <CodeBox label="nonlocal — explicitly tells Python to modify the ENCLOSING variable">{`def make_counter():
    count = 0

    def increment():
        nonlocal count       # "count" here refers to the enclosing scope's variable
        count = count + 1
        return count

    return increment

counter = make_counter()
print(counter())   # 1
print(counter())   # 2 — the enclosing "count" genuinely persists and increments across calls`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — global" />
        <SectionTitle>The Module-Level Equivalent, and Why It Is Usually a Smell</SectionTitle>

        <CodeBox label="global — the same idea, one level further out">{`counter = 0

def increment():
    global counter
    counter += 1

increment()
increment()
print(counter)   # 2`}</CodeBox>

        <Callout type="warning">
          <strong>Reaching for <code>global</code> to let a function mutate module-level state is
          usually a design smell, not just a syntax detail.</strong> It makes a function's behaviour
          depend on hidden external state and makes that same function's side effects invisible to
          anyone reading a call site — <code>increment()</code> gives no hint that it silently changes a
          module-level variable. Passing state explicitly as arguments and return values, or using a
          class to hold state (Object-Oriented Python phase) that methods explicitly operate on, is
          almost always the more maintainable design.
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
        <SectionTitle>A Broken Batch of Button Handlers at a Detroit Robotics Startup</SectionTitle>

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
            Scenario — Robotics startup, Detroit · Dashboard UI bug
          </div>

          <Para>
            An engineer builds a control panel that dynamically creates one callback function per
            actuator, in a loop, each meant to send that actuator's specific ID when triggered. Every
            single button ends up controlling the <em>last</em> actuator in the list, no matter which
            one is actually pressed.
          </Para>

          <CodeBox label="The bug — the classic loop-closure trap, in a realistic setting">{`callbacks = {}
for actuator_id in actuator_ids:      # e.g. [101, 102, 103]
    callbacks[actuator_id] = lambda: send_command(actuator_id)

# Later, when any button is pressed:
callbacks[101]()   # sends command for 103! Every callback shares the SAME actuator_id variable`}</CodeBox>

          <CodeBox label="The fix — force each callback to capture its own value">{`callbacks = {}
for actuator_id in actuator_ids:
    callbacks[actuator_id] = lambda aid=actuator_id: send_command(aid)

callbacks[101]()   # correctly sends command for 101 now`}</CodeBox>

          <SubSubTitle>Why this specific bug is so common in real production code</SubSubTitle>

          <Para>
            It shows up constantly in any code that builds a batch of similar callbacks in a loop — UI
            event handlers, per-item processing functions queued for later execution, or handler
            dictionaries exactly like this one. The bug is especially dangerous because it produces{' '}
            <strong>no error at all</strong> — the code runs, every button appears to work, and it is
            only the specific behaviour (always controlling the wrong actuator) that reveals something
            is wrong, often much later than the line that actually caused it.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Closures and Scope</SectionTitle>

        {[
          {
            wrong: '"A closure captures the VALUE a variable had at the time the inner function was created"',
            right: 'It captures a REFERENCE to the variable itself, not a snapshot of its value — which is exactly why the loop-variable-closure bug happens. All closures created inside the same loop iteration share the same underlying variable, which keeps changing until the loop ends.',
          },
          {
            wrong: '"You can freely reassign an enclosing variable from a nested function without any special keyword"',
            right: 'Any assignment inside a function creates a new LOCAL variable by default, shadowing the enclosing one — attempting to both read and reassign an enclosing variable without nonlocal raises UnboundLocalError, since Python decides at compile time that the name is local to that function.',
          },
          {
            wrong: '"global and nonlocal do the same thing"',
            right: 'nonlocal reaches into the nearest ENCLOSING function scope (for nested functions); global reaches all the way to the module-level scope, skipping any enclosing function scopes entirely. They are not interchangeable, and nonlocal has no effect at module level.',
          },
          {
            wrong: '"LEGB scoping means Python checks the function you\'re currently in, then jumps straight to global"',
            right: 'For NESTED functions, there is a distinct Enclosing scope checked in between Local and Global — every level of function nesting the current function sits inside is checked, in order, before Global is ever consulted.',
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
            q: 'What does LEGB stand for, and what problem does it solve?',
            a: 'Local, Enclosing, Global, Built-in — the fixed order Python searches when resolving a variable name, stopping at the first scope where the name is found. It explains exactly which variable a given name refers to whenever multiple scopes could plausibly define the same name.',
          },
          {
            q: 'What is a closure, and why does the returned inner function keep working after the outer function has already returned?',
            a: 'A closure is an inner function that references a variable from its enclosing scope, and Python keeps that enclosing variable alive (attached to the inner function itself, inspectable via __closure__) for as long as the inner function exists — even after the outer function\'s own execution has finished.',
          },
          {
            q: 'Explain the classic "closures created in a loop all return the same value" bug, and how to fix it.',
            a: 'Closures capture a reference to the loop variable, not its value at each iteration — since all closures share the same underlying variable, and that variable holds its FINAL value by the time any closure is actually called, they all appear to return the same (last) value. Fixed by capturing the current value explicitly via a default argument, e.g. lambda i=i: i, since default argument values are evaluated immediately at definition time.',
          },
          {
            q: 'Why does assigning to an enclosing variable inside a nested function raise UnboundLocalError without nonlocal?',
            a: 'Any assignment anywhere inside a function makes Python treat that name as local to that function throughout its entire body, at compile time — so a line like "count = count + 1" makes the READ on the right-hand side refer to the not-yet-assigned local "count", not the enclosing one, raising the error before assignment even happens.',
          },
          {
            q: 'What is the difference between nonlocal and global?',
            a: 'nonlocal binds a name to the nearest ENCLOSING function scope (skipping the module/global scope entirely) — it only makes sense inside nested functions. global binds a name directly to the module-level scope, regardless of any function nesting in between. Using global to mutate module state from inside a function is generally considered a design smell, since it hides side effects from anyone reading the call site.',
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
        <SectionTitle>Closure & Scope Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Creating several closures in a loop, expecting each to capture that iteration\'s value',
            a: 'All of them share the same underlying loop variable, and its final value is what every closure sees once actually called — the exact bug shown in the Real World example above. Force per-iteration capture with a default argument.',
          },
          {
            q: 'Reassigning an enclosing variable inside a nested function without nonlocal',
            a: 'Raises UnboundLocalError, since the assignment silently makes Python treat the name as local throughout the whole nested function — including on the line reading its "current" value before ever assigning it.',
          },
          {
            q: 'Reaching for global as a first instinct for sharing state between functions',
            a: 'It works, but it makes side effects invisible at the call site and couples functions to hidden module-level state. Passing values as arguments/return values, or grouping related state and behaviour into a class, is almost always more maintainable.',
          },
          {
            q: 'Assuming a closure "copies" the captured variable rather than referencing it',
            a: 'It references the same underlying variable object — mutating that variable from any closure that shares it (or from the enclosing function itself, after the closure was created) is visible to every closure that captured it.',
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
        <SectionTitle>Errors You Will Hit With Closures & Scope — And Exactly Why</SectionTitle>

        {[
          {
            error: `UnboundLocalError: cannot access local variable 'count' where it is not associated with a value`,
            cause: 'A nested function assigns to a name that also exists in an enclosing scope, without declaring nonlocal — Python treats the name as local to the whole function body, so reading it before the local assignment line fails.',
            fix: 'Add "nonlocal count" (or "global count" at module level) at the top of the function before assigning to it, if the intent is really to modify the enclosing/global variable.',
          },
          {
            error: `NameError: name 'x' is not defined`,
            cause: 'The name genuinely does not exist in any of the four LEGB scopes checked — Local, Enclosing, Global, or Built-in.',
            fix: 'Check for a typo, or confirm the variable is actually assigned somewhere before this point in a scope that is actually reachable from here.',
          },
          {
            error: `SyntaxError: no binding for nonlocal 'count' found`,
            cause: 'nonlocal was used in a function with no enclosing function scope at all (e.g. directly at module level, or in a function that is not nested inside another function defining that name).',
            fix: 'Use "global" instead if the intended target is module-level, or confirm the function is actually nested inside the function that defines the variable.',
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
        'LEGB (Local, Enclosing, Global, Built-in) is the fixed order Python searches to resolve a variable name, stopping at the first match.',
        'A closure is a nested function that references a variable from its enclosing scope — that variable stays alive and attached to the function even after the outer function has returned.',
        'Closures capture a REFERENCE to the enclosing variable, not a snapshot of its value — closures created in a loop all share the same variable, which is why they often surprise beginners by all reflecting the loop\'s FINAL value.',
        'Force per-iteration capture with a default argument (lambda i=i: i), since default argument values are evaluated once, immediately, at function-definition time.',
        'Assigning to an enclosing variable inside a nested function requires nonlocal (or global for module-level) — without it, the assignment silently creates a new local variable, and reading it beforehand raises UnboundLocalError.',
        'global is usually a design smell for sharing state — it hides side effects from anyone reading the call site. Prefer explicit arguments/return values, or a class holding the state.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 32 begins the Advanced Python phase with regular expressions — pattern matching for
          text, and the syntax that looks intimidating but follows a small set of real rules.
        </p>
        <Link href="/learn/python/regular-expressions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 32 → Regular Expressions with re
        </Link>
      </div>
    </LearnLayout>
  )
}
