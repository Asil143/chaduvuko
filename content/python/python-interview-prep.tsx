import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Python Interview Prep — Common Questions and Patterns — Python | Chaduvuko',
  description:
    'The Python questions that come up in real technical interviews, answered at senior-engineer depth.',
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

const QA = ({ q, a }: { q: string; a: string }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 20,
  }}>
    <div style={{
      fontSize: 14, fontWeight: 800, color: 'var(--text)',
      marginBottom: 14, lineHeight: 1.4,
    }}>
      {q}
    </div>
    <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
      {a}
    </div>
  </div>
)

export default function PythonInterviewPrep() {
  return (
    <LearnLayout
      title="Python Interview Prep — Common Questions and Patterns"
      description="The Python questions that come up in real technical interviews, answered at senior-engineer depth."
      section="Python — Module 46 (Capstone)"
      readTime="60 min"
      updatedAt="August 2026"
    >

      {/* ── Intro ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Final Module" />
        <SectionTitle>Everything From This Track, Interview-Ready</SectionTitle>
        <Para>
          This module is different from the other 45 — instead of teaching one new topic in depth, it
          pulls together the gotchas, patterns, and trade-offs from across the entire curriculum into
          the format an actual technical interview uses: real questions, answered completely, organised
          by theme. If a question below references something unfamiliar, the module it was originally
          covered in is named — this is meant to be a review and synthesis, not a first introduction.
        </Para>
      </section>

      <Divider />

      {/* ── Part A — Core Language & Data Structures ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Core Language & Data Structures" />
        <SectionTitle>The Fundamentals Every Interview Assumes You Know Cold</SectionTitle>

        <QA
          q="What is the difference between is and ==?"
          a="== compares VALUE equality (calls __eq__); is compares IDENTITY — whether two names refer to the literal same object in memory. a == b can be True while a is b is False for two separately-created objects holding equal data. Python caches small integers (-5 to 256) and interned strings, which is why 'a is b' can appear True for small ints even without explicit interning — never rely on this caching behaviour; always use == for value comparison and 'is' only for identity checks (most commonly 'is None')."
        />
        <QA
          q="What is the mutable default argument trap, and why does it happen?"
          a="def add_item(item, items=[]): reuses the SAME list object across every call that doesn't explicitly pass items, because default argument values are evaluated exactly once, at function-definition time, not on each call — mutating that shared default in one call leaks into every subsequent call. The fix: use items=None as the default, and create a new list inside the function body when it is None. Covered in depth in the Constructors module, and referenced again in the Closures module since it stems from the same 'defaults evaluated once at definition time' mechanism."
        />
        <QA
          q="What's the difference between a shallow copy and a deep copy?"
          a="A shallow copy (list(original) or original.copy()) creates a new outer container, but any nested mutable objects inside it are still shared references with the original — mutating a nested list inside a shallow copy also mutates the original's nested list. A deep copy (copy.deepcopy()) recursively copies every nested object too, so the copy is fully independent. Reach for deepcopy specifically when the data has nested mutable structures and full independence is required."
        />
        <QA
          q="Why can't you use a list as a dictionary key, but you can use a tuple?"
          a="Dictionary keys must be hashable, and hashability requires the object to be immutable (or at least to have a stable hash for its entire lifetime) — a list is mutable, so Python disallows it as a key entirely (TypeError: unhashable type). A tuple is immutable, so it is hashable, as long as every element it contains is ALSO hashable (a tuple containing a list is itself unhashable)."
        />
        <QA
          q="What is the time complexity of checking membership (x in y) for a list versus a set?"
          a="O(n) for a list — Python scans from the start until it finds a match or exhausts the list. O(1) on average for a set or dict, since both use hashing to locate the value directly rather than scanning. This distinction is the single highest-leverage performance fix covered in the Performance module — swapping a list for a set in a membership-heavy loop turns an accidental O(n²) into O(n)."
        />
        <QA
          q="What is the difference between a list comprehension and a generator expression, and when would you choose one over the other?"
          a="[x for x in items] builds the entire list in memory immediately. (x for x in items), with parentheses instead of brackets, produces a generator that yields values lazily, one at a time. Choose the comprehension when you need to index into the result, iterate it more than once, or need its length — choose the generator expression when you only need to iterate once and the input could be large, to avoid holding the whole thing in memory at once."
        />
        <QA
          q="What does *args and **kwargs actually do, and how are they different from each other?"
          a="*args collects any extra POSITIONAL arguments into a tuple; **kwargs collects any extra KEYWORD arguments into a dict. Both let a function accept a flexible, unknown-in-advance number of arguments — commonly used for generic wrapper functions (like decorators) that need to forward whatever they were called with to another function, regardless of that function's specific signature."
        />
      </section>

      <Divider />

      {/* ── Part B — Object-Oriented Python ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Object-Oriented Python" />
        <SectionTitle>Classes, Inheritance, and Encapsulation</SectionTitle>

        <QA
          q="What does super() actually do, and why is it preferred over calling the parent class directly?"
          a="super() returns a proxy object that delegates method calls to the next class in the Method Resolution Order (MRO), not necessarily the immediate parent. It correctly supports cooperative multiple inheritance — calling ParentClass.method(self) directly hardcodes a specific class and can skip other classes in a diamond-shaped inheritance hierarchy, while super() respects the full MRO chain regardless of how deep or complex it is."
        />
        <QA
          q="What is the difference between __str__ and __repr__?"
          a="__str__ produces a human-readable description (what print() and f-strings show); __repr__ produces an unambiguous, ideally code-like representation (what the REPL, debuggers, and containers like lists show for their elements). If only one is defined, define __repr__ — Python falls back to it for __str__ automatically, but not the reverse."
        />
        <QA
          q="Why does defining __eq__ without __hash__ cause an object to behave incorrectly in a set?"
          a="Defining __eq__ silently makes the class unhashable by default (Python sets __hash__ to None), UNLESS __hash__ is also explicitly defined — and it must be consistent with __eq__ (equal objects must produce equal hashes), or objects can effectively 'disappear' from sets and dicts, since the hash determines which bucket is checked before __eq__ is ever consulted."
        />
        <QA
          q="What is the difference between an abstract base class and simply raising NotImplementedError in a base method?"
          a="raise NotImplementedError only fails when the specific unimplemented method is actually CALLED — an incomplete subclass can still be instantiated and passed around freely until that line runs. An ABC (abc.ABC + @abstractmethod) fails immediately at INSTANTIATION time if any abstract method is missing, catching the mistake far earlier — often in tests or CI, rather than in production."
        />
        <QA
          q="What is the difference between @classmethod, @staticmethod, and a regular instance method?"
          a="An instance method receives self (the specific object) as its first argument. A classmethod receives cls (the class itself) — commonly used for alternate constructors that correctly respect subclasses. A staticmethod receives neither — it is effectively a plain function namespaced under the class purely for organisation, with no access to instance or class state at all."
        />
        <QA
          q="How does Python resolve which method actually runs when a class inherits from multiple parents with the same method name?"
          a="Via the Method Resolution Order (MRO), computed using the C3 linearisation algorithm — visible by calling ClassName.__mro__ or ClassName.mro(). It produces a single, consistent, left-to-right, depth-first (but de-duplicated) ordering of all ancestor classes, and Python calls the first matching method it finds walking that order. super() respects this same MRO rather than jumping straight to a specific hardcoded parent."
        />
      </section>

      <Divider />

      {/* ── Part C — Functional & Advanced Python ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Functional & Advanced Python" />
        <SectionTitle>Decorators, Generators, Closures, and Scope</SectionTitle>

        <QA
          q="What is a generator, and why use one instead of returning a list?"
          a="A generator (written with yield, or as a generator expression) produces values lazily, one at a time, on demand — never holding the entire sequence in memory at once. For a large or even infinite sequence, this is the difference between constant memory usage and potentially exhausting available memory building a full list upfront. The trade-off: a generator can only be iterated once; a list can be iterated repeatedly and indexed directly."
        />
        <QA
          q="Explain the classic 'closures created in a loop all return the same value' bug."
          a="Closures capture a REFERENCE to the enclosing variable, not a snapshot of its value at each iteration — so several closures created inside the same loop all share the SAME underlying loop variable, which holds its FINAL value by the time any closure is actually called. Fixed by forcing per-iteration capture via a default argument (lambda i=i: i), since default argument values are evaluated immediately at definition time."
        />
        <QA
          q="What does functools.wraps do, and why does it matter?"
          a="Applied to the inner wrapper function inside a decorator, it copies the original function's __name__, __doc__, and other metadata onto the wrapper. Without it, a decorated function's identity (as seen by debuggers, documentation tools, and introspection) silently becomes the wrapper's generic identity instead of the real function's — a subtle but genuinely disruptive loss for tooling."
        />
        <QA
          q="What is the GIL, and how does it affect the choice between threading and multiprocessing?"
          a="The Global Interpreter Lock ensures only one thread executes Python bytecode at a time within a single process, meaning threading does NOT achieve true CPU parallelism for CPU-bound work in standard CPython. Threading is still valuable for I/O-bound work (waiting on network/disk, where the GIL is released during the wait); genuine CPU-bound parallelism requires multiprocessing, which uses separate processes with their own independent GIL and memory space."
        />
        <QA
          q="What is a context manager, and what problem does the with statement solve that a manual try/finally does not?"
          a="A context manager (implementing __enter__/__exit__) guarantees cleanup code runs no matter how a block exits — including via an exception. A manual try/finally solves the same problem, but requires every call site to correctly re-implement the pairing by hand; a reusable context manager centralises correct cleanup in one place, so every caller gets it right automatically with a single 'with' line."
        />
        <QA
          q="What is the difference between synchronous, threaded, and asyncio-based concurrency in Python, at a high level?"
          a="Synchronous code does one thing at a time, blocking on each I/O operation. Threading runs multiple threads that the OS can interleave, useful for I/O-bound work despite the GIL, since it releases during I/O waits. asyncio runs a single thread with a cooperative event loop — coroutines explicitly yield control at await points, giving high-throughput I/O-bound concurrency without the overhead or synchronisation complexity of OS threads, but requiring async-aware libraries throughout the call chain to actually benefit."
        />
      </section>

      <Divider />

      {/* ── Part D — Production & Testing ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Production, Testing & Typing" />
        <SectionTitle>What Separates Working Code From Production-Ready Code</SectionTitle>

        <QA
          q="Do Python type hints affect runtime behaviour?"
          a="No — they are ignored entirely by the interpreter at runtime. A type-annotated function can still be called with mismatched argument types and will run without error. Real enforcement requires a separate static type checker (mypy) run as a development-time/CI step, distinct from actually executing the program."
        />
        <QA
          q="Why should you generally avoid a bare except: clause?"
          a="A bare except: catches EVERY exception, including ones you almost certainly did not intend to swallow — KeyboardInterrupt, SystemExit, and genuine bugs like a NameError from a typo — silently hiding problems that should have been visible. Catch the SPECIFIC exception type(s) you actually expect and know how to handle."
        />
        <QA
          q="What is the difference between mocking a dependency and using the real one in a test?"
          a="Mocking replaces a slow, external, or non-deterministic dependency (an API call, a database, the current time) with a controlled fake for the duration of a test, making the test fast, deterministic, and isolated to the logic actually being verified. Using the real dependency makes tests slower and can introduce flakiness unrelated to the code under test — but over-mocking can leave a test that passes even when the real logic is broken, so the actual logic under test should stay real."
        />
        <QA
          q="Why is 'with open(file) as f:' preferred over manually calling f.close()?"
          a="The with statement (backed by the file object's __enter__/__exit__ methods) guarantees the file is closed no matter how the block exits — normal completion, an early return, or an exception. A manual f.close() call placed after the code that uses the file is simply never reached if an exception occurs first, leaking the file handle."
        />
        <QA
          q="What is the difference between logging and using print() for diagnostics in production code?"
          a="print() always writes to stdout with no way to filter by severity, no timestamps or structured context by default, and no way to redirect output without changing the code. The logging module supports severity levels (DEBUG/INFO/WARNING/ERROR/CRITICAL) that can be filtered per-environment, multiple configurable handlers (console, file, external log aggregation), and structured, consistent formatting — the standard, expected approach for anything beyond a quick throwaway script."
        />
      </section>

      <Divider />

      {/* ── Part E — Coding Patterns ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Hands-On Coding Patterns" />
        <SectionTitle>Three Classic Problems, Worked Through Completely</SectionTitle>

        <Para>
          Beyond conceptual questions, most technical interviews include at least one live coding
          problem. These three are among the most commonly seen — not because the exact problems repeat,
          but because the underlying patterns (hash-map lookups, in-place traversal, simple loop logic)
          generalise to a huge fraction of what actually gets asked.
        </Para>

        <SubTitle>1. Two Sum — the canonical hash-map pattern</SubTitle>
        <Para>
          Given a list of numbers and a target, return the indices of the two numbers that add up to the
          target. The naive approach checks every pair — O(n²). The optimal approach uses a dict to turn
          the "have I seen the complement before?" question into an O(1) lookup.
        </Para>
        <CodeBox label="The optimal O(n) solution">{`def two_sum(nums, target):
    seen = {}   # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None   # no valid pair found

two_sum([2, 7, 11, 15], 9)   # [0, 1] — nums[0] + nums[1] == 2 + 7 == 9`}</CodeBox>
        <Para>
          The key insight worth saying out loud in an interview: this is a single pass, building the
          dict as you go, checking each number's complement against numbers <em>already seen</em> before
          adding the current number — checking before inserting avoids matching a number with itself.
        </Para>

        <SubTitle>2. Reverse a String In Place — the two-pointer pattern</SubTitle>
        <Para>
          Given a mutable sequence, reverse it without allocating a second full copy. The two-pointer
          technique swaps from both ends toward the middle.
        </Para>
        <CodeBox label="In-place reversal with two pointers">{`def reverse_in_place(chars):
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return chars

reverse_in_place(list("hello"))   # ['o', 'l', 'l', 'e', 'h']`}</CodeBox>
        <Para>
          Worth noting explicitly: this only works in place on a <strong>mutable</strong> sequence like a
          list — Python's actual <code>str</code> type is immutable, so "reversing a string in place" in
          real Python code is normally just <code>text[::-1]</code>, and this exercise exists specifically
          to demonstrate the two-pointer technique on a mutable structure, a pattern that generalises far
          beyond strings (checking palindromes, partitioning arrays, and more).
        </Para>

        <SubTitle>3. FizzBuzz, With the Twist Interviewers Actually Care About</SubTitle>
        <Para>
          The most famous (and most maligned) interview question is rarely about the logic itself —
          it's a filter for whether a candidate can translate simple, precise rules into correct code
          under mild pressure, and increasingly, interviewers extend it with a follow-up to see how a
          candidate generalises a solution.
        </Para>
        <CodeBox label="Standard FizzBuzz">{`def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`}</CodeBox>
        <CodeBox label="The generalised follow-up — an arbitrary set of divisor/word rules">{`def fizzbuzz_generalised(n, rules):
    # rules: a list of (divisor, word) tuples, e.g. [(3, "Fizz"), (5, "Buzz")]
    result = []
    for i in range(1, n + 1):
        word = "".join(w for d, w in rules if i % d == 0)
        result.append(word or str(i))
    return result

fizzbuzz_generalised(20, [(3, "Fizz"), (5, "Buzz"), (7, "Bazz")])`}</CodeBox>
        <Para>
          The generalised version demonstrates something the basic version cannot: recognising that the
          original problem's hardcoded 3/5/15 logic is really a special case of "check divisibility
          against an arbitrary list of rules, in order" — exactly the kind of abstraction interviewers
          are listening for, without over-engineering a problem that did not ask for it.
        </Para>

        <SubTitle>4. Valid Parentheses — the stack pattern</SubTitle>
        <Para>
          Given a string of brackets, determine whether every opening bracket has a matching closing
          bracket in the correct order. This is the canonical example of the <strong>stack</strong>{' '}
          pattern — appearing constantly in problems involving nested or matched structures (parsing,
          balanced expressions, undo/redo history).
        </Para>
        <CodeBox label="The stack-based solution">{`def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for char in s:
        if char in pairs.values():          # an opening bracket — push it
            stack.append(char)
        elif char in pairs:                  # a closing bracket — must match the top of the stack
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack   # True only if every opening bracket was eventually matched and closed

is_valid("({[]})")   # True
is_valid("({[})")    # False — the "[" is closed by "}" out of order
is_valid("(")         # False — nothing left to match it, stack is non-empty at the end`}</CodeBox>
        <Para>
          A Python <code>list</code>, used with only <code>.append()</code> and <code>.pop()</code>{' '}
          (both O(1) at the end of a list), is the idiomatic way to implement a stack — there is no need
          for a dedicated stack class. The pattern to recognise going forward: any problem involving
          "does this nested/matched structure resolve correctly" is very often a stack in disguise.
        </Para>
      </section>

      <Divider />

      {/* ── Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>An Interview Loop at a Series B Startup in Austin</SectionTitle>

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
            Scenario — Series B startup, Austin · Backend engineer interview loop
          </div>

          <Para>
            A candidate is given a variant of the Two Sum problem, but the interviewer is far more
            interested in what happens after the first working solution than the solution itself. The
            candidate writes the O(n²) brute-force version first, gets it correct, and then the
            interviewer asks: "can you do better than O(n²)?"
          </Para>

          <Para>
            The candidate talks through the trade-off out loud — a hash map trades additional space
            (O(n) extra memory for the dict) for reduced time complexity (O(n) instead of O(n²)) — then
            implements the optimised version cleanly, explaining the "check the complement before
            inserting the current number" detail without being prompted. They then proactively mention a
            genuine edge case: what should happen if no valid pair exists at all, and confirm with the
            interviewer what the function should return in that case before finalizing the code.
          </Para>

          <SubSubTitle>What the interviewer was actually evaluating</SubSubTitle>

          <Para>
            The hiring debrief afterward focused almost entirely on the trade-off discussion and the
            unprompted edge-case question — not on whether the candidate "knew" Two Sum, which is
            widely practiced and not itself a meaningful signal. The panel's own words: "anyone can
            memorise this exact problem. What we cannot fake is watching someone reason about a
            trade-off out loud and catch an edge case before we have to point it out." This is precisely
            why every Q&A section throughout this entire curriculum has consistently emphasised the{' '}
            <em>why</em> behind an answer, not just the correct final answer alone.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions About Technical Interviews" />
        <SectionTitle>Four Misconceptions About How Interviews Are Actually Graded</SectionTitle>

        {[
          {
            wrong: '"The interviewer is mainly grading whether you get the exact optimal solution immediately"',
            right: 'Most interviewers weight the reasoning process — how you approach an unfamiliar problem, whether you consider trade-offs out loud, whether you test your own solution against edge cases — at least as heavily as the final code. A candidate who talks through a brute-force solution first, then improves it, often reads better than one who silently produces an optimal solution with no visible reasoning.',
          },
          {
            wrong: '"Asking clarifying questions before coding makes you look less prepared"',
            right: 'The opposite is generally true — jumping straight into code on an ambiguous problem (unclear input constraints, unclear expected behaviour on edge cases like empty input) is a common red flag, since real engineering work constantly requires clarifying ambiguous requirements before building anything.',
          },
          {
            wrong: '"Interviews mainly test whether you have memorised specific algorithms and data structures"',
            right: 'They mostly test whether you can APPLY a small set of recurring patterns (hash-map lookups, two pointers, basic recursion) to an unfamiliar problem, and whether you can reason clearly about correctness and trade-offs — not whether you have memorised a large catalogue of named algorithms.',
          },
          {
            wrong: '"A single interview question with a wrong final answer means an automatic rejection"',
            right: 'A candidate who reasons well, catches their own mistake, and iterates toward a correct or nearly-correct solution is frequently rated more highly than one who silently produces a "correct" answer with no visible thought process — the process is usually the actual signal being measured, not just the destination.',
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

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Interviews reward reasoning out loud — trade-offs, edge cases, and iteration toward a better solution — at least as much as a single correct final answer.',
        'A small set of recurring patterns (hash-map lookups for O(1) membership/complement checks, two pointers for in-place traversal, careful loop/condition logic) covers a large fraction of real coding interview questions.',
        'The conceptual gotchas that come up constantly — mutable defaults, shallow vs deep copy, is vs ==, the GIL, __eq__/__hash__ consistency — are exactly the ones this curriculum flagged individually across earlier modules, because they are also genuinely common real production bugs, not just interview trivia.',
        'Clarifying ambiguous requirements before coding, and testing your own solution against edge cases unprompted, are consistently rated positively — they mirror real engineering practice, not just interview performance.',
        'Type hints, testing, and clean code practices (covered in the Production & Career Readiness phase) come up constantly in interviews for any role beyond the most junior level — interviewers care whether you write production-quality code, not just code that solves the immediate problem.',
      ]} />

      <Divider />

      {/* ── Completion ── */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${C}18, transparent)`,
          border: `1px solid ${C}44`, borderRadius: 14, padding: '32px 36px',
        }}>
          <p style={{
            fontSize: 10, color: C, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)', fontWeight: 800, margin: '0 0 12px',
          }}>
            🎉 Track Complete — All 46 Modules
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1px',
            color: 'var(--text)', marginBottom: 16, fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>
            You've completed the full Python track — foundations to advanced.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 24 }}>
            From your first <code>print()</code> statement through control flow, data structures,
            object-oriented design, functional patterns, concurrency, typing, testing, and now interview
            readiness — that is the complete arc of what a working professional Python engineer actually
            needs. Revisit any module as a reference whenever a real project calls for it; that is
            exactly what this track is for, not just a one-time read-through.
          </p>
          <Link href="/learn/python" style={{ background: C, color: '#fff', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
            ← Back to the Python track overview
          </Link>
        </div>
      </section>
    </LearnLayout>
  )
}
