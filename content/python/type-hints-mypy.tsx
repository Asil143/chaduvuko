import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Type Hints and Static Typing with mypy — Python | Chaduvuko',
  description:
    'Adding types to Python without losing what makes it Python — annotations, generics, and catching bugs before runtime.',
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

export default function TypeHintsMypy() {
  return (
    <LearnLayout
      title="Type Hints and Static Typing with mypy"
      description="Adding types to Python without losing what makes it Python — annotations, generics, and catching bugs before runtime."
      section="Python — Module 36"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Type Hints Change Nothing at Runtime" />
        <SectionTitle>Python Is Still Fully Dynamically Typed</SectionTitle>

        <Para>
          Type hints are exactly what the name says — hints. Python's interpreter reads them, stores
          them, and then does <strong>nothing further with them at runtime</strong>. Adding type hints to
          a function does not make Python check argument types when it is called, and does not change
          how the code executes in any way.
        </Para>

        <CodeBox label="Type hints are not enforced at runtime">{`def add(a: int, b: int) -> int:
    return a + b

print(add(3, 4))         # 7 — works, as expected
print(add("3", "4"))     # "34" — ALSO runs fine! Python never checked the types at all`}</CodeBox>

        <Callout type="warning">
          <strong>This surprises almost everyone coming from a statically-typed language.</strong>{' '}
          Type hints are purely documentation and tooling input — real enforcement requires running a
          separate static type checker (like <code>mypy</code>, covered in this module) as a{' '}
          <em>development-time</em> step, completely separate from actually running the program.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Basic Annotations" />
        <SectionTitle>Annotating Variables, Parameters, and Return Values</SectionTitle>

        <CodeBox label="The basic annotation syntax">{`name: str = "Asha"
age: int = 30
price: float = 19.99
is_active: bool = True

def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

def log_event(message: str) -> None:      # -> None means "returns nothing meaningful"
    print(message)`}</CodeBox>

        <Para>
          The value these annotations provide is entirely about tooling and readability, not runtime
          behaviour: your editor can now warn you immediately if you pass the wrong type, autocomplete
          becomes far more accurate (since the editor knows exactly what a variable's type is), and
          anyone reading the function signature knows what it expects without reading the implementation.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Optional and Union" />
        <SectionTitle>Expressing "Could Also Be None" or "One of Several Types"</SectionTitle>

        <CodeBox label="Optional — a value that might be None">{`from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    # Optional[str] means "either a str, or None"
    if user_id in database:
        return database[user_id]
    return None`}</CodeBox>

        <CodeBox label="Union — a value that could be one of several specific types">{`from typing import Union

def parse_id(raw: Union[str, int]) -> int:
    return int(raw)`}</CodeBox>

        <CodeBox label="Python 3.10+ — the | syntax replaces both Optional and Union">{`def find_user(user_id: int) -> str | None:      # same meaning as Optional[str]
    ...

def parse_id(raw: str | int) -> int:             # same meaning as Union[str, int]
    return int(raw)`}</CodeBox>

        <Para>
          The <code>|</code> syntax (added in Python 3.10) is now the preferred, more concise way to
          write these — <code>Optional</code> and <code>Union</code> from the <code>typing</code> module
          still work identically and remain common in codebases that need to support older Python
          versions, but new code targeting 3.10+ generally uses <code>|</code> directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Generics" />
        <SectionTitle>Annotating What's Inside a Collection</SectionTitle>

        <CodeBox label="Generic collection types">{`def get_names(users: list[dict[str, str]]) -> list[str]:
    return [u["name"] for u in users]

def word_counts(text: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts

def unique_ids(ids: list[int]) -> set[int]:
    return set(ids)`}</CodeBox>

        <Para>
          Modern Python (3.9+) lets you use the built-in collection types directly as generics —{' '}
          <code>list[int]</code>, <code>dict[str, int]</code> — rather than the older, more verbose{' '}
          <code>typing.List[int]</code>/<code>typing.Dict[str, int]</code> forms required on earlier
          versions. The built-in forms are now the standard, idiomatic choice for any project not
          specifically constrained to pre-3.9 Python.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structural Typing With Protocol" />
        <SectionTitle>Typing Without Requiring Inheritance</SectionTitle>

        <Para>
          The Abstract Base Classes module covered enforcing a contract through explicit inheritance.{' '}
          <code>typing.Protocol</code> offers a different approach — describing a required{' '}
          <em>shape</em> (which methods/attributes must exist) without requiring any class to explicitly
          inherit from it at all. Any object satisfies a <code>Protocol</code> just by having the right
          methods, structurally — much closer to duck typing, but checkable ahead of time by a type
          checker.
        </Para>

        <CodeBox label="A Protocol — no inheritance required to satisfy it">{`from typing import Protocol

class Quacks(Protocol):
    def quack(self) -> str:
        ...

class RealDuck:
    def quack(self) -> str:
        return "Quack!"

class ToyDuck:
    def quack(self) -> str:
        return "Squeak-quack"

def make_it_quack(duck: Quacks) -> str:
    return duck.quack()

make_it_quack(RealDuck())   # type-checks fine — RealDuck was never declared to inherit from Quacks
make_it_quack(ToyDuck())    # ALSO type-checks fine — it just needs a matching quack() method`}</CodeBox>

        <Para>
          This is genuinely valuable when you want the safety of static type checking on code that is
          intentionally written in Python's duck-typed style — libraries you do not control (and cannot
          add inheritance to) can still satisfy a <code>Protocol</code>, as long as they happen to have
          the right method shape.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Running mypy" />
        <SectionTitle>Actually Checking the Types You've Annotated</SectionTitle>

        <CodeBox label="Installing and running mypy">{`pip install mypy
mypy your_script.py`}</CodeBox>

        <CodeBox label="mypy catching a real bug before the code ever runs">{`def calculate_total(prices: list[float]) -> float:
    return sum(prices)

calculate_total(["19.99", "29.99"])   # a list of STRINGS, not floats

# Running mypy on this file reports, without ever executing the code:
# error: Argument 1 to "calculate_total" has incompatible type "list[str]";
#        expected "list[float]"`}</CodeBox>

        <Para>
          This is the entire point of static typing in Python: the bug above — passing a list of strings
          where floats were expected — would not raise any error at runtime here (Python would happily{' '}
          <code>sum()</code> a list of numeric-looking strings incorrectly, or crash somewhere
          downstream depending on what happens next), but <code>mypy</code> catches it{' '}
          <strong>before the program is ever run</strong>, typically wired into CI so a type error blocks
          a pull request the same way a failing test would.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Gradual Typing Strategy" />
        <SectionTitle>Adopting Type Hints on an Existing, Untyped Codebase</SectionTitle>

        <Para>
          Almost no real codebase gets type-annotated all at once — Python's typing system is designed
          to be adopted <strong>gradually</strong>, and mypy fully supports a codebase that is only
          partially annotated.
        </Para>

        <CodeBox label="mypy treats unannotated code as implicitly 'Any' — meaning 'skip checking here'">{`def legacy_function(x, y):     # no annotations at all
    return x + y                # mypy does not check this function's internals by default

def new_function(x: int, y: int) -> int:   # fully annotated
    return x + y                             # mypy DOES check this one`}</CodeBox>

        <Para>
          A pragmatic, genuinely common real-world strategy: start by annotating new code and any
          function currently being touched for other reasons (a natural side effect of a normal PR, not
          a dedicated typing effort), enable mypy in CI in a lenient/permissive mode so it does not block
          on the large amount of still-untyped legacy code, then gradually tighten mypy's strictness
          settings (module by module, or file by file) as coverage grows over time — rather than
          attempting a single enormous, risky PR that annotates the entire codebase at once.
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
        <SectionTitle>Catching a Payments Bug in CI, Not in Production, at a Nashville Fintech Company</SectionTitle>

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
            Scenario — Fintech company, Nashville · CI type-check gate
          </div>

          <Para>
            An engineer refactors a function's return type from returning cents as an <code>int</code>{' '}
            to returning dollars as a <code>float</code>, correctly updating the type hint. A different
            call site elsewhere in the payments module, untouched by this PR, still treats the return
            value as integer cents and multiplies it directly into a database write.
          </Para>

          <CodeBox label="The change and the now-inconsistent call site">{`def get_transaction_amount(txn_id: str) -> float:   # changed from -> int
    ...
    return amount_in_dollars

# Elsewhere, in a completely different file, untouched by this PR:
def record_fee(txn_id: str) -> None:
    amount = get_transaction_amount(txn_id)
    fee_cents = amount * 100          # was correct when amount was already cents; now double-converts`}</CodeBox>

          <SubSubTitle>What actually happened</SubSubTitle>

          <Para>
            mypy, running in CI on every pull request, immediately flagged that{' '}
            <code>record_fee</code>'s usage was inconsistent with the type system's understanding of the
            surrounding code once the annotation propagated — specifically catching that a value now
            documented as dollars was still being treated with cents-oriented logic elsewhere. The PR
            was blocked in review, not caught by a customer noticing an incorrect fee days later. The
            team's own retrospective note: "a type checker doesn't understand business logic, but it
            absolutely understands when two pieces of code disagree about what a value represents — and
            that disagreement is exactly what caused this bug."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Type Hints</SectionTitle>

        {[
          {
            wrong: '"Adding type hints makes Python check types at runtime, like a statically typed language"',
            right: 'Type hints are completely ignored by the Python interpreter at runtime — calling add("3", "4") on a function annotated as add(a: int, b: int) runs without any error. Enforcement only happens if you separately run a static checker like mypy as a development-time step.',
          },
          {
            wrong: '"You have to fully type-annotate a codebase before type hints provide any value"',
            right: 'mypy is explicitly designed for gradual adoption — unannotated functions are simply not checked (treated as implicitly Any), so you can annotate incrementally, starting with new code, without needing a single large all-at-once migration.',
          },
          {
            wrong: '"typing.Protocol is basically the same thing as an abstract base class"',
            right: 'An ABC requires explicit inheritance to satisfy its contract; a Protocol is satisfied purely structurally — any object with the right method shape works, with no inheritance relationship required at all, much closer to duck typing but checkable statically.',
          },
          {
            wrong: '"list[int] and typing.List[int] mean genuinely different things"',
            right: 'They mean the same thing — list[int] (using the built-in type directly as a generic) became valid syntax in Python 3.9+ and is now the preferred, more concise form. typing.List[int] is the older form, still supported for compatibility with earlier Python versions.',
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
            q: 'Do type hints affect how Python code actually runs?',
            a: 'No — they are purely metadata, ignored by the interpreter at runtime. A function can be called with arguments of the wrong annotated type and will run without error. Real enforcement requires a separate static type checker like mypy, run as a development-time step distinct from executing the program.',
          },
          {
            q: 'What is the difference between Optional[str] and str | None?',
            a: 'They mean exactly the same thing — both express "either a str, or None". str | None (Python 3.10+) is the newer, more concise syntax; Optional[str] from the typing module is the older form still used for compatibility with earlier Python versions.',
          },
          {
            q: 'How does typing.Protocol differ from an abstract base class for defining a contract?',
            a: 'An ABC requires explicit inheritance — a class must subclass it and implement its abstract methods. A Protocol is satisfied structurally, purely by having methods/attributes of the right shape, with no inheritance relationship required — closer to duck typing, but still checkable by a static type checker ahead of runtime.',
          },
          {
            q: 'Why is mypy usually run as a CI step rather than something enforced at runtime?',
            a: 'It performs STATIC analysis — reading the code and its type annotations to find inconsistencies without ever executing it, which is exactly why it can catch bugs (like the dollars-vs-cents mismatch in the Real World example) before the code path is ever exercised by a test or a real user, rather than waiting for it to fail at runtime.',
          },
          {
            q: 'How would you adopt type hints on a large, currently untyped codebase without a risky big-bang migration?',
            a: 'Gradually — annotate new code and functions already being touched for other reasons, run mypy in CI in a lenient/permissive mode so it doesn\'t block on the large amount of still-untyped legacy code, and tighten strictness module by module as coverage grows, rather than attempting to annotate everything in one enormous PR.',
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
        <SectionTitle>Type Hint Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Believing a type-annotated function is now protected from being called with the wrong type',
            a: 'Type hints alone provide zero runtime protection — the function still runs normally with mismatched argument types unless you separately run mypy (or add explicit runtime validation, which is a different, additional mechanism entirely).',
          },
          {
            q: 'Using typing.List, typing.Dict on modern Python instead of the built-in generics',
            a: 'Not wrong, but unnecessarily verbose on Python 3.9+ — list[int] and dict[str, int] work directly as generics and are the preferred modern style, reserving the typing module forms mainly for codebases targeting older Python versions.',
          },
          {
            q: 'Forgetting -> None on a function that returns nothing meaningful',
            a: 'A function with no explicit return annotation is left unannotated for its return type by mypy\'s inference, which is usually fine, but omitting -> None on a function that genuinely never returns a meaningful value loses useful, cheap documentation and can hide a mistake where a caller wrongly tries to use its return value.',
          },
          {
            q: 'Annotating a mutable default argument\'s type without addressing the actual mutable-default bug',
            a: 'def add_item(items: list[str] = []) -> ... is still the classic mutable-default-argument trap covered in the Constructors module — the type annotation documents the type correctly but does nothing to fix the underlying shared-default bug. Use items: list[str] | None = None and create a new list inside the function body instead.',
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
        <SectionTitle>Errors You Will Hit With Type Hints & mypy — And Exactly Why</SectionTitle>

        {[
          {
            error: `error: Argument 1 to "calculate_total" has incompatible type "list[str]"; expected "list[float]"`,
            cause: 'mypy statically detected that a call site passes a value whose annotated/inferred type does not match the function\'s declared parameter type.',
            fix: 'Either fix the call site to pass the correct type, or, if the function genuinely should accept both, widen its parameter type (e.g. to a Union) to reflect reality.',
          },
          {
            error: `error: Function is missing a return type annotation`,
            cause: 'This appears specifically when mypy is run in a "strict" mode requiring every function to be fully annotated, and one is not.',
            fix: 'Add the missing -> ReturnType annotation, or relax mypy\'s strictness setting if the codebase is still in a gradual-adoption phase.',
          },
          {
            error: `error: Incompatible return value type (got "int", expected "str")`,
            cause: 'A function\'s actual return statement(s) do not match its declared -> annotation.',
            fix: 'Fix either the return statement or the annotation, whichever one is actually wrong.',
          },
          {
            error: `TypeError: 'type' object is not subscriptable`,
            cause: 'Using the built-in generic syntax (list[int], dict[str, int]) on a Python version older than 3.9, where this syntax is not supported at all — this is a genuine RUNTIME error, unlike most type-hint issues.',
            fix: 'Upgrade to Python 3.9+, or use "from __future__ import annotations" (which defers annotation evaluation) on 3.7+, or fall back to typing.List/typing.Dict on older versions.',
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
        'Type hints are ignored by the Python interpreter at runtime — they change nothing about how code actually executes.',
        'Real enforcement comes from a separate static type checker, mypy being the standard choice, typically run in CI to catch mismatches before code is ever executed.',
        'str | None (3.10+) and Optional[str] mean the same thing; list[int] (3.9+) and typing.List[int] mean the same thing — the built-in/pipe forms are the modern preferred style.',
        'typing.Protocol enables structural typing — satisfying a contract by shape alone, with no inheritance required, unlike an abstract base class.',
        'mypy supports gradual adoption — unannotated code is simply not checked, so a codebase can be typed incrementally rather than all at once.',
        'A type checker catches inconsistencies BETWEEN pieces of code about what a value represents — exactly the class of bug shown in the Real World example, caught in CI instead of production.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 37 covers working with real-world APIs in Python — the requests library, authentication,
          and the timeout mistake that causes production incidents.
        </p>
        <Link href="/learn/python/working-with-apis-python" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 37 → Working with APIs in Python
        </Link>
      </div>
    </LearnLayout>
  )
}
