import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Python Best Practices — PEP 8, Clean Code — Python | Chaduvuko',
  description:
    'The conventions that separate readable, maintainable Python from code that works but nobody wants to touch.',
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

export default function PythonBestPractices() {
  return (
    <LearnLayout
      title="Python Best Practices — PEP 8, Clean Code"
      description="The conventions that separate readable, maintainable Python from code that works but nobody wants to touch."
      section="Python — Module 45"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What PEP 8 Actually Is" />
        <SectionTitle>A Style Guide, Not a Language Rule</SectionTitle>

        <Para>
          PEP 8 is Python's official style guide — a document, not a language feature. Code that
          violates every PEP 8 rule still runs perfectly fine; the value of PEP 8 is entirely social and
          practical: it means any two Python developers, from different companies, different countries,
          who have never met, can read each other's code without a mental translation step, because
          formatting conventions are shared rather than personal.
        </Para>

        <CodeBox label="A quick example of what PEP 8 actually governs">{`# PEP 8 compliant
def calculate_total(price, tax_rate):
    return price * (1 + tax_rate)


# Not PEP 8 compliant — still runs identically, just harder for anyone else to read
def calculateTotal(price,tax_rate):
        return price*(1+tax_rate)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Naming Conventions" />
        <SectionTitle>snake_case, PascalCase, and SCREAMING_SNAKE_CASE</SectionTitle>

        <CodeBox label="The four naming conventions and where each applies">{`# snake_case — functions, variables, methods, modules
def calculate_total(price, tax_rate):
    user_name = "Asha"

# PascalCase — classes
class PaymentProcessor:
    ...

# SCREAMING_SNAKE_CASE — constants (values that never change)
MAX_RETRIES = 3
DEFAULT_TIMEOUT_SECONDS = 30

# _leading_underscore — internal/non-public (covered fully in the Encapsulation module)
class Account:
    def __init__(self):
        self._internal_cache = {}`}</CodeBox>

        <Para>
          These are not arbitrary — <code>camelCase</code> for functions and{' '}
          <code>snake_case</code> for classes would technically run without any error, but it would
          instantly signal "this code was written by someone unfamiliar with Python conventions" to any
          experienced reviewer, in the same way unusual punctuation stands out in prose even when the
          sentence is grammatically valid.
        </Para>

        <Callout type="tip">
          <strong>Names should describe what a value IS or what a function DOES, not how it is
          implemented.</strong> <code>user_list</code> is weaker than <code>users</code> (the type is
          usually obvious from context or a type hint); <code>calculate_and_return_total</code> is
          weaker than just <code>calculate_total</code> (every function "returns" something — the word
          adds nothing). Favour names a reader can understand without opening the function body.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Layout Conventions" />
        <SectionTitle>Line Length, Whitespace, and Blank Lines</SectionTitle>

        <CodeBox label="Core layout rules">{`# 4 spaces per indentation level (never tabs) — covered back in Control Flow
if condition:
    do_something()

# Max line length: 79 characters (many teams relax this to 99-120 in practice,
# but PEP 8's own recommendation is 79 — check your project's actual configured limit)

# Two blank lines between top-level function/class definitions
def first_function():
    ...


def second_function():
    ...


class MyClass:
    ...

# One blank line between methods inside a class
class Account:
    def deposit(self, amount):
        ...

    def withdraw(self, amount):
        ...`}</CodeBox>

        <CodeBox label="Whitespace around operators">{`# Preferred
total = price * quantity
result = (a + b) * (c - d)

# Avoid
total=price*quantity
result = ( a+b ) * ( c-d )`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Import Ordering" />
        <SectionTitle>Three Groups, in a Consistent Order</SectionTitle>

        <CodeBox label="The conventional import grouping">{`# 1. Standard library imports
import json
import os
from datetime import datetime

# 2. Third-party imports
import requests
import pandas as pd

# 3. Local/project imports
from myapp.models import User
from myapp.utils import format_currency`}</CodeBox>

        <Para>
          Each group is conventionally separated by a blank line, and alphabetised within the group.
          Tools like <code>isort</code> automate this entirely — running it as part of a project's
          formatting pipeline means nobody has to manually maintain import ordering by hand.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Docstrings" />
        <SectionTitle>Documenting What a Function Does, Not How</SectionTitle>

        <CodeBox label="A properly documented function">{`def calculate_discount(price, percent):
    """Apply a percentage discount to a price.

    Args:
        price: The original price, in dollars.
        percent: The discount percentage, from 0 to 100.

    Returns:
        The discounted price, rounded to 2 decimal places.

    Raises:
        ValueError: If percent is outside the 0-100 range.
    """
    if not 0 <= percent <= 100:
        raise ValueError(f"Invalid discount percent: {percent}")
    return round(price * (1 - percent / 100), 2)`}</CodeBox>

        <Para>
          A docstring documents the function's <strong>contract</strong> — what it expects, what it
          returns, what can go wrong — not its internal implementation, which the code itself already
          shows. Several docstring formats exist (Google-style, shown above; NumPy-style; reST) — the
          specific format matters far less than a team picking one and staying consistent, since tools
          that auto-generate documentation from docstrings expect one recognisable format throughout a
          codebase.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Zen of Python" />
        <SectionTitle>import this — A Real Design Philosophy, Not Just a Joke</SectionTitle>

        <CodeBox label="Running it yourself">{`>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
...`}</CodeBox>

        <Para>
          It reads like a novelty at first, but several of its lines map directly onto concrete patterns
          already covered throughout this track: "Explicit is better than implicit" is exactly why{' '}
          <code>from module import *</code> is discouraged (the Modules module) — it hides where names
          actually come from. "Flat is better than nested" is precisely the guard-clause pattern from
          Control Flow, restructuring deeply nested conditionals into flat, early-return logic. "There
          should be one — and preferably only one — obvious way to do it" is why idiomatic Python
          conventions (like preferring <code>if items:</code> over{' '}
          <code>if len(items) &gt; 0:</code>) matter beyond personal taste — consistency across a
          codebase and across the whole language community is itself valuable.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Code Smells and When to Break the Rules" />
        <SectionTitle>Style Guides Are Guidelines, Not Laws</SectionTitle>

        <CodeBox label="A few common code smells worth recognising">{`# Smell: a function doing too many unrelated things
def process_order(order):
    validate(order)
    charge_card(order)
    send_email(order)
    update_inventory(order)
    log_analytics(order)
# Better: split into smaller, focused functions — each independently
# testable and each with a name describing exactly one responsibility

# Smell: "magic numbers" with no explanation
if attempts > 3:
    lock_account()
# Better: name the constant, and its meaning becomes self-documenting
MAX_LOGIN_ATTEMPTS = 3
if attempts > MAX_LOGIN_ATTEMPTS:
    lock_account()`}</CodeBox>

        <Callout type="tip">
          <strong>PEP 8 itself explicitly says consistency within a project sometimes beats blind
          adherence to the guide.</strong> If an existing codebase consistently uses a different
          convention (a different max line length, a different docstring style), matching the
          surrounding code is usually more valuable than introducing a one-off "more correct" style that
          now makes that one function inconsistent with everything around it. The goal is readability
          and consistency, not rule-following for its own sake.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Automating It" />
        <SectionTitle>Linters and Formatters — Tools, Not Memorisation</SectionTitle>

        <CodeBox label="The standard modern toolchain">{`pip install black ruff

black your_project/       # auto-formats code to a consistent style — no debate needed
ruff check your_project/  # lints for style issues, unused imports, common bugs, and more`}</CodeBox>

        <Para>
          <strong>black</strong> is an "opinionated" formatter — it makes formatting decisions for you
          (line breaks, quote style, spacing) with almost no configuration, specifically to end
          bikeshedding over formatting preferences within a team. <strong>ruff</strong> is a fast linter
          that catches style violations, unused imports, and a range of likely bugs, and has largely
          replaced older tools like <code>flake8</code> and <code>pylint</code> in new projects due to
          its speed. Most real teams wire both into CI, so style consistency is enforced automatically
          rather than relying on every engineer memorising every rule.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Code Review Slowed by Style Debates, at a Kansas City Startup</SectionTitle>

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
            Scenario — Startup, Kansas City · Engineering process retrospective
          </div>

          <Para>
            A small team notices that a large fraction of their pull request review comments are about
            formatting — spacing, line length, whether a string should use single or double quotes —
            rather than actual logic, correctness, or design. Reviewers spend real time on comments that
            add no value to the software itself, and authors get frustrated re-litigating style
            preferences that are ultimately arbitrary.
          </Para>

          <CodeBox label="What changed">{`# Added to CI, blocking merge on failure:
black --check .
ruff check .

# Added to pre-commit hooks, so formatting issues never even reach a PR:
pip install pre-commit
pre-commit install`}</CodeBox>

          <SubSubTitle>The actual effect on the team's process</SubSubTitle>

          <Para>
            Style-related review comments dropped to nearly zero within two weeks — not because
            engineers suddenly became more careful, but because <code>black</code> and{' '}
            <code>ruff</code> now caught and auto-fixed nearly everything before a human reviewer ever
            saw the code. Code review time genuinely shifted toward the things that actually needed a
            human's judgement — architecture, edge cases, whether the logic was correct — which the team
            considered the single highest-leverage process change they made that quarter.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Python Style</SectionTitle>

        {[
          {
            wrong: '"PEP 8 is enforced by the Python interpreter"',
            right: "It is purely a style guide — a document, not a language rule. Code violating every PEP 8 convention still runs perfectly. Enforcement, where it happens, comes from separate tools like black and ruff, typically wired into CI, not from Python itself.",
          },
          {
            wrong: '"Following PEP 8 strictly is always more important than matching an existing codebase\'s conventions"',
            right: 'PEP 8 itself explicitly notes that project-level consistency can outweigh strict adherence — introducing a "more correct" but different style into one function of an otherwise consistent codebase usually reduces overall readability rather than improving it.',
          },
          {
            wrong: '"A docstring should explain HOW a function works internally"',
            right: 'A docstring documents the CONTRACT — what it expects as input, what it returns, what can go wrong — the code itself already shows how it works internally to anyone who reads the function body; restating that in the docstring is redundant and drifts out of sync as the implementation changes.',
          },
          {
            wrong: '"Using a linter/formatter means you don\'t need to understand PEP 8 at all"',
            right: 'Automated tools handle mechanical formatting reliably, but naming quality, docstring content, avoiding overly long functions, and genuine code smells still require human judgement — the tools remove the tedious, mechanical part of style, not the design thinking behind good code.',
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

      {/* ── Part 11 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is PEP 8, and is it enforced by the Python language itself?',
            a: "PEP 8 is Python's official style guide, covering naming conventions, layout, whitespace, and more. It is not enforced by the interpreter at all — code that violates it runs identically. Its value is social/practical: shared conventions let any Python developer read unfamiliar code without a mental translation step.",
          },
          {
            q: 'What naming convention does Python use for classes vs functions/variables?',
            a: 'Classes use PascalCase (PaymentProcessor); functions, variables, and methods use snake_case (calculate_total, user_name); constants use SCREAMING_SNAKE_CASE (MAX_RETRIES). Mixing these conventions still runs fine but immediately signals unfamiliarity with Python idioms to an experienced reader.',
          },
          {
            q: 'What should a well-written docstring document, and what should it generally avoid?',
            a: "A function's contract — what arguments it expects, what it returns, and what exceptions it can raise — not its internal implementation details, which the code body itself already shows and which would drift out of sync as the implementation changes over time.",
          },
          {
            q: 'What is the difference between what a tool like black does versus what ruff does?',
            a: 'black is an opinionated auto-formatter — it rewrites code to a consistent style (spacing, line breaks, quote style) with minimal configuration, ending team debates over formatting preferences. ruff is a fast linter that flags style violations, unused imports, and likely bugs, without necessarily rewriting the code itself.',
          },
          {
            q: 'Does PEP 8 require strict, unconditional adherence in every situation?',
            a: 'No — PEP 8 itself notes that consistency within a project can outweigh strict adherence to the guide. Matching an existing codebase\'s established conventions, even where they differ slightly from PEP 8\'s letter, is often more valuable for overall readability than introducing a one-off "more correct" style that breaks consistency with the surrounding code.',
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
        <SectionTitle>Style Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Mixing naming conventions within the same codebase',
            a: 'A function named calculateTotal alongside others named calculate_discount reads as inconsistent and unfamiliar to any experienced Python reader — pick snake_case for functions/variables and stay consistent throughout.',
          },
          {
            q: 'Writing a docstring that just restates the function name in sentence form',
            a: '"""Calculates the total.""" on a function called calculate_total() adds nothing a reader did not already know from the name alone — a useful docstring explains parameters, return value, and possible exceptions, not just a rephrasing of the name.',
          },
          {
            q: 'Manually formatting code instead of running a formatter',
            a: 'Hand-aligning spacing or manually wrapping long lines is time-consuming and inconsistent between engineers — running black (or an equivalent) automatically produces consistent formatting in a fraction of a second, with zero manual effort.',
          },
          {
            q: 'Using unexplained "magic numbers" or "magic strings" scattered through the code',
            a: 'if status == 3: gives no hint what 3 means without checking elsewhere; a named constant (STATUS_SHIPPED = 3) makes the same check self-documenting at the point it is used.',
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
        <SectionTitle>Issues You Will Hit With Style Tooling — And Exactly Why</SectionTitle>

        {[
          {
            error: `would reformat your_file.py (black --check reports this and exits non-zero)`,
            cause: 'The file does not match the formatting black would apply — common in CI when a "check" mode run is used specifically to block merges on unformatted code.',
            fix: 'Run "black your_file.py" (without --check) locally to apply the formatting, then commit the result.',
          },
          {
            error: `F401 'os' imported but unused`,
            cause: 'A ruff/flake8-style linter detected an import that is never actually referenced anywhere in the file.',
            fix: 'Remove the unused import, or use it if it was meant to be used — leaving unused imports around is itself a minor but real code-quality issue linters exist partly to catch.',
          },
          {
            error: `E501 line too long (105 > 88 characters)`,
            cause: "A line exceeds the project's configured maximum line length.",
            fix: 'Break the line across multiple lines (parentheses allow implicit line continuation in Python), or adjust the project\'s configured line-length limit if the team has deliberately chosen a different value than the tool\'s default.',
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
        'PEP 8 is a style guide, not a language rule — it exists so any Python developer can read unfamiliar code without a mental translation step, not because the interpreter requires it.',
        'snake_case for functions/variables/modules, PascalCase for classes, SCREAMING_SNAKE_CASE for constants — mixing conventions signals unfamiliarity even though the code still runs.',
        'A docstring documents a function\'s contract (inputs, output, possible exceptions) — not its internal implementation, which the code body already shows.',
        'The Zen of Python (import this) maps onto concrete patterns already covered in this track — explicit imports, flat guard-clause logic, one obvious idiomatic way to do things.',
        'PEP 8 explicitly allows project-level consistency to outweigh strict adherence — matching an existing codebase\'s established style is often more valuable than a technically "more correct" but inconsistent change.',
        'Tools like black (formatting) and ruff (linting) automate the mechanical parts of style, freeing code review to focus on logic, design, and correctness — genuinely shown to shift review time toward higher-value feedback.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          The final module of this track — Python Interview Prep — synthesises everything covered across
          all 46 modules into a focused set of real interview questions and coding patterns.
        </p>
        <Link href="/learn/python/python-interview-prep" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 46 → Python Interview Prep
        </Link>
      </div>
    </LearnLayout>
  )
}
