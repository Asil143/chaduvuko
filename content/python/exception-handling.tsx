import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Exception Handling — Python | Chaduvuko',
  description:
    'try/except/else/finally in full, catching specific exceptions, the exception hierarchy, raising and chaining exceptions, and writing your own exception classes.',
}

const C = '#7b61ff'

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

export default function ExceptionHandling() {
  return (
    <LearnLayout
      title="Exception Handling"
      description="try/except/else/finally in full, catching specific exceptions, the exception hierarchy, raising and chaining exceptions, and writing your own exception classes."
      section="Python — Module 17"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — try and except" />
        <SectionTitle>What Happens Without Exception Handling — and How try/except Fixes It</SectionTitle>

        <Para>
          By default, when Python hits a runtime error — dividing by zero, accessing a missing
          dictionary key, converting text that isn&apos;t a valid number — it raises an{' '}
          <strong>exception</strong>, and unless something catches it, the program stops immediately and
          prints a traceback. For a script that processes many independent items, one bad item shouldn&apos;t
          be allowed to bring down the whole run.
        </Para>

        <CodeBox label="An unhandled exception stops the entire program">{`amounts = ["120.50", "89.99", "not-a-number", "45.00"]

total = 0
for amount in amounts:
    total += float(amount)   # crashes on the third item

print(total)   # never reached — the program already terminated
# ValueError: could not convert string to float: 'not-a-number'`}</CodeBox>

        <Para>
          <code>try</code>/<code>except</code> lets you catch an exception where it happens and decide
          what to do next, instead of letting it propagate all the way up and kill the program.
        </Para>

        <CodeBox label="Catching the exception, and continuing">{`amounts = ["120.50", "89.99", "not-a-number", "45.00"]

total = 0
skipped = 0
for amount in amounts:
    try:
        total += float(amount)
    except ValueError:
        skipped += 1
        print(f"Skipping invalid amount: {amount!r}")

print(f"Total: {total}, skipped: {skipped}")
# Skipping invalid amount: 'not-a-number'
# Total: 255.49, skipped: 1`}</CodeBox>

        <Para>
          The code inside <code>try:</code> runs normally until (and unless) an exception occurs. The
          moment one is raised, Python immediately jumps to the matching <code>except</code> block — any
          remaining lines in the <code>try</code> block are skipped entirely, not just the line that
          failed.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — else and finally" />
        <SectionTitle>The Four Clauses — What Each One Is Actually For</SectionTitle>

        <Para>
          Most tutorials stop at <code>try</code>/<code>except</code> and skip the other two clauses
          entirely — but <code>else</code> and <code>finally</code> both solve real, specific problems,
          and knowing when to reach for each one is what separates tutorial-level exception handling from
          the way experienced engineers actually write it.
        </Para>

        <CodeBox label="All four clauses, and when each one runs">{`try:
    result = risky_operation()
except SomeError:
    # runs ONLY if the try block raised SomeError
    handle_the_error()
else:
    # runs ONLY if the try block completed with NO exception at all
    use_the_result(result)
finally:
    # ALWAYS runs — whether an exception occurred, was caught, wasn't caught,
    # or the try block succeeded cleanly. Even if the except block itself
    # raises a new exception, finally still runs before it propagates.
    cleanup()`}</CodeBox>

        <SubTitle>else — code that should run only when nothing went wrong</SubTitle>

        <Para>
          It is tempting to just put the "success" code at the end of the <code>try</code> block
          instead of using <code>else</code> — but that quietly changes what gets caught. Code inside{' '}
          <code>try</code> is protected by the <code>except</code> clauses below it; code inside{' '}
          <code>else</code> is not. This distinction matters the moment the "success" code can itself
          raise the same kind of exception you were trying to catch.
        </Para>

        <CodeBox label="Why else matters — avoiding accidentally catching the wrong thing">{`# Without else — a bug hiding in plain sight
try:
    data = json.loads(text)
    process(data)          # if process() ALSO raises a ValueError, it gets
except ValueError:          # incorrectly caught here too, as if parsing had failed
    print("Invalid JSON")

# With else — only json.loads() failures are caught;
# any error from process() propagates normally, as it should
try:
    data = json.loads(text)
except ValueError:
    print("Invalid JSON")
else:
    process(data)`}</CodeBox>

        <SubTitle>finally — guaranteed cleanup, no matter what happens</SubTitle>

        <Para>
          <code>finally</code> runs unconditionally — this is precisely the mechanism that makes{' '}
          <code>with open(...)</code>, from the Reading &amp; Writing Files module, work: internally, a
          context manager&apos;s cleanup step is guaranteed using logic equivalent to a{' '}
          <code>finally</code> block, which is exactly why the file gets closed even when an exception
          is raised partway through.
        </Para>

        <CodeBox label="finally guarantees cleanup runs, even when an exception is re-raised">{`def process_file(path):
    f = open(path)
    try:
        return risky_parse(f)
    finally:
        f.close()   # runs whether risky_parse() succeeds, raises, or anything in between

# This is conceptually what "with open(path) as f:" does for you automatically —
# which is exactly why "with" is still preferred over writing this by hand.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Specific vs Bare except" />
        <SectionTitle>Catching Specific Exceptions vs the Bare except: Anti-Pattern</SectionTitle>

        <Para>
          <code>except:</code> with no exception type at all will catch <strong>everything</strong> —
          not just the error you were expecting, but genuine programming mistakes, typos, and even the
          exceptions Python uses internally to implement <code>Ctrl+C</code> and program exit. This is
          one of the most consequential anti-patterns in exception handling, and it is worth
          understanding exactly why.
        </Para>

        <CodeBox label="The bare except: anti-pattern — and what it silently swallows">{`try:
    process_order(order)
except:
    print("Something went wrong")

# This catches EVERYTHING, including:
# - a genuine bug like a typo: proces_order(order)  (NameError)
# - passing the wrong type entirely: order.total()  (TypeError, if total is not callable)
# - Ctrl+C during a long-running operation (KeyboardInterrupt)
# - the process being asked to exit cleanly (SystemExit)
#
# All of these get reduced to the same unhelpful message,
# and the ORIGINAL bug is now invisible.`}</CodeBox>

        <CodeBox label="The fix — catch exactly the exception types you expect and can handle">{`try:
    process_order(order)
except (ValueError, KeyError) as e:
    print(f"Order data was invalid: {e}")
    log_error(order, e)

# A genuine bug (NameError, TypeError from your own code) is NOT caught here —
# it propagates normally, with a full traceback, so it gets noticed and fixed
# instead of silently disappearing behind a generic error message.`}</CodeBox>

        <Callout type="warning">
          <strong>Bare except: is a real code review red flag, not a style nitpick.</strong> It converts
          every possible failure — including bugs that have nothing to do with the operation you were
          actually trying to protect — into the same generic outcome, making real bugs far harder to
          find. Catch the specific exception types you genuinely expect and know how to handle. If you
          truly need to catch "anything," write <code>except Exception:</code> instead of bare{' '}
          <code>except:</code> — covered next, in Part 04 — which at least excludes the small set of
          system-level exceptions that should almost never be intercepted.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Exception Hierarchy" />
        <SectionTitle>Exception, ValueError, KeyError, and How They Relate</SectionTitle>

        <Para>
          Every exception in Python is a class, and exception classes form an inheritance hierarchy — a
          concept you will cover formally in the Object-Oriented Python phase, but the practical
          implication matters right now: catching a parent class also catches every one of its
          subclasses.
        </Para>

        <CodeBox label="A simplified slice of the real hierarchy">{`BaseException
 ├── SystemExit
 ├── KeyboardInterrupt
 └── Exception                 # the class almost everything you catch inherits from
      ├── ValueError            # right type, invalid value — e.g. int("hello")
      ├── TypeError              # operation on the wrong type entirely
      ├── KeyError                # dict key that doesn't exist
      ├── IndexError                # list/sequence index out of range
      ├── AttributeError             # accessing an attribute/method that doesn't exist
      ├── FileNotFoundError            # a subclass of OSError — file doesn't exist
      └── ZeroDivisionError              # division or modulo by zero`}</CodeBox>

        <CodeBox label="Catching a parent class catches every subclass beneath it">{`try:
    value = int(user_input)
except Exception:
    # catches ValueError, TypeError, and literally any other Exception subclass —
    # broader than you usually want, but still excludes BaseException's other branches
    print("Something went wrong parsing input")`}</CodeBox>

        <SubTitle>Why you almost never catch BaseException directly</SubTitle>

        <Para>
          <code>Exception</code> is itself a subclass of <code>BaseException</code> — but{' '}
          <code>BaseException</code> also covers <code>KeyboardInterrupt</code> (raised when a user
          presses <code>Ctrl+C</code>) and <code>SystemExit</code> (raised by <code>sys.exit()</code>).
          Catching <code>BaseException</code> directly means your program can no longer be interrupted or
          exited cleanly through the normal mechanisms — a genuinely dangerous thing to do by accident,
          and virtually never what you actually want. Catch <code>Exception</code>, or a specific
          subclass of it — not <code>BaseException</code>.
        </Para>

        <Callout type="tip">
          <strong>Order matters when catching multiple exception types in separate blocks.</strong>{' '}
          Python checks <code>except</code> clauses top to bottom and uses the first one that matches. If
          you list a parent class (like <code>Exception</code>) before a more specific subclass (like{' '}
          <code>ValueError</code>) in separate <code>except</code> blocks, the specific one will never be
          reached — it&apos;s already caught by the broader one above it. List more specific exception
          types first.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Raising Exceptions" />
        <SectionTitle>raise — Signaling That Something Is Wrong, Deliberately</SectionTitle>

        <Para>
          Exceptions aren&apos;t only something that happens to you from built-in operations — you can,
          and often should, raise them yourself, the moment your own code detects that something is
          invalid, rather than letting bad data propagate further and fail confusingly somewhere else.
        </Para>

        <CodeBox label="Raising a built-in exception with a clear message">{`def set_discount(percent):
    if not 0 <= percent <= 100:
        raise ValueError(f"Discount must be between 0 and 100, got {percent}")
    return percent

set_discount(150)
# ValueError: Discount must be between 0 and 100, got 150`}</CodeBox>

        <Para>
          This is the real-world counterpart to the <code>assert</code> statement from the Control Flow
          module. <code>assert</code> is for catching your own programming mistakes during development,
          and can be globally stripped out. <code>raise</code> with a specific, meaningful exception type
          is how you validate data that genuinely matters at runtime — user input, function arguments,
          data read from a file or an API — and it is never optimized away.
        </Para>

        <SubTitle>Choose the exception type that best describes the problem</SubTitle>

        <Para>
          Raising the right built-in exception type — rather than always reaching for a generic{' '}
          <code>Exception</code> — lets callers catch precisely the failure category they care about,
          exactly as covered in Part 04.
        </Para>

        <CodeBox label="Picking a meaningful exception type">{`def get_user(user_id):
    if not isinstance(user_id, int):
        raise TypeError(f"user_id must be an int, got {type(user_id).__name__}")
    user = database.lookup(user_id)
    if user is None:
        raise KeyError(f"No user found with id {user_id}")
    return user`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Re-raising and Chaining" />
        <SectionTitle>Bare raise, and raise ... from ... for Exception Chaining</SectionTitle>

        <Para>
          Sometimes you need to catch an exception — to log it, clean something up, or add context — and
          then let it continue propagating rather than swallowing it. A bare <code>raise</code> with no
          argument, used inside an <code>except</code> block, re-raises the <strong>exact same
          exception</strong> that was just caught, including its original traceback.
        </Para>

        <CodeBox label="Re-raising after logging, without losing the original error">{`def process_payment(order):
    try:
        charge_card(order)
    except PaymentError as e:
        log_error(f"Payment failed for order {order.id}: {e}")
        raise   # re-raises the SAME PaymentError — the caller still sees it,
                # and still gets the full original traceback`}</CodeBox>

        <SubTitle>raise ... from ... — deliberately chaining a new exception to its cause</SubTitle>

        <Para>
          Sometimes the right move isn&apos;t to re-raise the same exception, but to raise a{' '}
          <strong>different, more meaningful</strong> one in its place — while still preserving the
          original as context. <code>raise NewError(...) from original_error</code> does exactly this,
          and Python&apos;s traceback shows both, clearly labeled, rather than losing the original cause.
        </Para>

        <CodeBox label="Wrapping a low-level exception in a more meaningful one">{`def load_config(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"Config file {path} contains invalid JSON") from e

# The resulting traceback shows both exceptions:
#   json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
#
#   The above exception was the direct cause of the following exception:
#
#   ValueError: Config file settings.json contains invalid JSON`}</CodeBox>

        <Callout type="tip">
          <strong>Prefer raise ... from ... over silently catching and re-raising a plain new exception.</strong>{' '}
          Without <code>from</code>, Python still shows both exceptions in the traceback (labeled
          "during handling of the above exception, another exception occurred"), but{' '}
          <code>from</code> makes the causal relationship explicit and intentional, which is clearer for
          whoever reads the traceback later — usually you, at 2am, debugging a production incident.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Custom Exceptions" />
        <SectionTitle>Writing Your Own Exception Classes — A Banking Example</SectionTitle>

        <Para>
          Built-in exceptions like <code>ValueError</code> are genuinely useful, but they describe{' '}
          <em>generic</em> problems — an invalid value, of some kind, for some reason. A custom exception
          class lets you describe a failure in terms specific to your own program&apos;s domain, which
          makes both the raising code and the catching code more expressive.
        </Para>

        <CodeBox label="Defining a custom exception — as simple as it looks">{`class InsufficientFundsError(Exception):
    """Raised when a withdrawal would take an account below zero."""
    pass

class Account:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(
                f"Cannot withdraw \${amount:.2f} — balance is only \${self.balance:.2f}"
            )
        self.balance -= amount
        return self.balance`}</CodeBox>

        <Para>
          A custom exception is just a class that inherits from <code>Exception</code> (directly or
          indirectly) — often with no additional code at all, since it primarily exists to give the
          error a distinct, catchable identity. The full mechanics of class definitions and inheritance
          are covered properly in the upcoming Object-Oriented Python phase; what matters here is that
          this pattern is genuinely this simple to use today.
        </Para>

        <CodeBox label="Catching a custom exception specifically">{`account = Account(balance=100)

try:
    account.withdraw(250)
except InsufficientFundsError as e:
    print(f"Transaction declined: {e}")
    notify_customer(account, reason="insufficient_funds")

# Transaction declined: Cannot withdraw $250.00 — balance is only $100.00`}</CodeBox>

        <SubTitle>Attaching extra data to a custom exception</SubTitle>

        <Para>
          A custom exception can carry more than just a message — genuinely useful when the code
          catching it needs structured details, not just human-readable text, to decide what to do next.
        </Para>

        <CodeBox label="A richer custom exception, carrying structured data">{`class InsufficientFundsError(Exception):
    def __init__(self, requested, available):
        self.requested = requested
        self.available = available
        super().__init__(
            f"Cannot withdraw \${requested:.2f} — balance is only \${available:.2f}"
        )

try:
    account.withdraw(250)
except InsufficientFundsError as e:
    shortfall = e.requested - e.available
    print(f"Short by \${shortfall:.2f}")   # the caller can react to the SPECIFIC numbers,
                                              # not just parse the error message as text`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Exception Safety and with" />
        <SectionTitle>How the with Statement Relates to Exception Handling</SectionTitle>

        <Para>
          The Reading &amp; Writing Files module introduced <code>with open(...) as f:</code> and
          promised this connection would be made explicit here: a context manager&apos;s guarantee — that
          cleanup always runs, exception or not — is built on exactly the same mechanism as{' '}
          <code>finally</code>, covered in Part 02 above.
        </Para>

        <CodeBox label="What with open(...) is roughly equivalent to, under the hood">{`# This:
with open("data.txt") as f:
    process(f)

# Behaves equivalently to this, written by hand:
f = open("data.txt")
try:
    process(f)
finally:
    f.close()

# In both versions, f.close() runs whether process() succeeds,
# raises an exception, or does anything in between.`}</CodeBox>

        <Para>
          This is precisely why <code>with</code> is the preferred pattern for anything that needs
          guaranteed cleanup — not just files, but database connections, network sockets, and locks in
          concurrent code, all of which follow the same "acquire, use, guarantee release" shape. The full
          mechanics of building your own context manager — the <code>__enter__</code> and{' '}
          <code>__exit__</code> methods that make this work — are covered in depth in the Context
          Managers module later in this track; the important idea for now is that <code>with</code> is
          not a separate feature from exception handling, it is <em>built on</em> exception handling.
        </Para>

        <Callout type="info">
          A context manager&apos;s <code>__exit__</code> method is called with details about any
          exception that occurred inside the <code>with</code> block — including the option to suppress
          it entirely, rather than letting it propagate. This is exactly how <code>contextlib.suppress()</code>{' '}
          works, a small standard-library helper for cleanly ignoring a specific, expected exception
          type, which you will meet properly in the Context Managers module.
        </Callout>
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
        <SectionTitle>The Bare except: That Hid a Real Bug for Three Weeks — Minneapolis, MN</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(123,97,255,0.1)', border: '1px solid rgba(123,97,255,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Healthcare scheduling platform, Minneapolis · Postmortem
          </div>

          <Para>
            A scheduling platform&apos;s nightly job sends appointment reminder emails to patients. For
            three weeks, a growing number of patients silently stopped receiving reminders — no alerts
            fired, no errors appeared in any dashboard, because the job itself reported success every
            single night.
          </Para>

          <SubSubTitle>What the postmortem finds</SubSubTitle>

          <CodeBox label="The code responsible — innocent-looking, and exactly the anti-pattern from Part 03">{`def send_reminders(appointments):
    sent = 0
    for appt in appointments:
        try:
            send_email(appt.patient_email, build_reminder(appt))
            sent += 1
        except:
            pass   # "just skip anything that fails, don't crash the whole job"
    return sent`}</CodeBox>

          <Para>
            The <code>except:</code> was added months earlier, deliberately, to stop one specific
            transient issue — an occasional email-provider timeout — from crashing the entire nightly
            batch over a single patient. It worked, in the narrow sense that the job never crashed again.
            But it also caught everything else that could possibly go wrong inside the loop, forever,
            with no distinction.
          </Para>

          <Para>
            The real bug: a recent change to <code>build_reminder()</code> introduced a{' '}
            <code>KeyError</code> for a small subset of appointments missing a newly-added field. That
            exception was real, genuinely worth investigating — and the bare <code>except:</code> quietly
            absorbed it every night, indistinguishable from the harmless timeout it was originally written
            for.
          </Para>

          <CodeBox label="The fix — catch specifically what you expect, and count what you skip">{`def send_reminders(appointments):
    sent, failed = 0, 0
    for appt in appointments:
        try:
            send_email(appt.patient_email, build_reminder(appt))
            sent += 1
        except EmailTimeoutError as e:
            failed += 1
            log_error(f"Timed out sending to {appt.patient_email}: {e}")
        # anything else — a KeyError from build_reminder(), a bug, anything unexpected —
        # is no longer caught here at all, and will surface immediately and loudly

    if failed:
        alert_oncall(f"{failed} reminder(s) failed to send")
    return sent`}</CodeBox>

          <Para>
            This is the precise cost of the bare <code>except:</code> anti-pattern described in Part 03:
            it doesn&apos;t just risk hiding bugs in the abstract, it genuinely did — for three weeks, in
            a system where a missed reminder has a real, direct impact on patients. The team&apos;s
            follow-up added a lint rule that flags bare <code>except:</code> and <code>except Exception:</code>{' '}
            without a specific reason comment, enforced in CI going forward.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Exception Handling</SectionTitle>

        {[
          {
            wrong: '"except: (bare, with no exception type) is a good way to make code more robust"',
            right: 'It makes code appear more robust while actually hiding real bugs, including ones unrelated to the failure you meant to handle — exactly what happened in the Real World example above. Catch specific exception types you genuinely expect, so unrelated bugs still surface loudly.',
          },
          {
            wrong: '"The code after try: that should only run on success can just go at the end of the try block"',
            right: 'Putting it inside try means it is also protected by the except clauses below — if that "success" code happens to raise the same kind of exception you were catching, it gets misattributed as if the original operation had failed. else runs only after the try block completes with no exception, and is not covered by the except clauses at all.',
          },
          {
            wrong: '"assert and raise are basically interchangeable ways to signal an error"',
            right: 'assert statements can be globally stripped out with Python\'s -O flag and are meant only for catching your own programming mistakes during development. raise with a specific exception type is never optimized away and is the correct tool for validating real runtime data — user input, function arguments, external data — exactly as covered in the Control Flow module\'s treatment of assert.',
          },
          {
            wrong: '"A custom exception class needs a lot of code to be useful"',
            right: 'A custom exception can be a class with a single line — class InsufficientFundsError(Exception): pass — and it is already useful, because it gives that specific failure a distinct, catchable identity. Adding structured attributes (as shown in Part 07) is a genuine enhancement, but not a requirement for a custom exception to be worth defining.',
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
            q: 'Explain the difference between the else and finally clauses on a try statement.',
            a: 'else runs only if the try block completes with no exception at all, and — unlike code placed directly inside try — it is not protected by the except clauses above it, so an exception raised inside else propagates normally rather than being caught. finally runs unconditionally, whether the try block succeeded, raised a caught exception, raised an uncaught one, or even if the except block itself raises a new exception. finally is the right place for guaranteed cleanup; else is the right place for code that should only run after confirmed success.',
          },
          {
            q: 'Why is a bare except: considered an anti-pattern, and what should you do instead?',
            a: 'A bare except: catches every exception, including genuine programming bugs (typos, wrong types) and system-level exceptions like KeyboardInterrupt and SystemExit — reducing all of them to the same generic outcome and making real bugs much harder to notice and diagnose. Catch specific exception types you actually expect and know how to handle; if you truly need a catch-all, use except Exception: instead, which at least excludes BaseException\'s system-level branches.',
          },
          {
            q: 'What is the difference between a bare raise inside an except block and raise NewError(...) from original_error?',
            a: 'A bare raise re-raises the exact same exception that was just caught, preserving its original traceback — used when you want to log or react to an error but still let the original propagate unchanged. raise ... from ... raises a DIFFERENT, more meaningful exception while explicitly preserving the original as its documented cause, which both appear in the resulting traceback — used when the original exception is too low-level or generic for the caller to usefully act on.',
          },
          {
            q: 'How does the with statement relate to exception handling?',
            a: 'A context manager\'s guarantee that cleanup code always runs — regardless of whether an exception occurs inside the with block — is built on the same underlying mechanism as a finally clause. with open(path) as f: is conceptually equivalent to opening the file in a try block and closing it in a finally block by hand; with statement is simply the idiomatic, less error-prone way to express that pattern.',
          },
          {
            q: 'Walk through writing and using a custom exception class for a specific business rule.',
            a: 'Define a class inheriting from Exception (e.g. class InsufficientFundsError(Exception): pass), optionally overriding __init__ to accept and store structured details relevant to the failure (like the requested and available amounts). Raise it with raise InsufficientFundsError(...) at the point in your code where the business rule is violated, and catch it specifically with except InsufficientFundsError as e: wherever the caller needs to react to that particular failure — giving both the raising and catching code a clear, self-documenting vocabulary instead of relying on a generic ValueError and a parsed error message.',
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
        <SectionTitle>Exception Handling Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using a bare except: (or except Exception:) to silence errors instead of fixing them',
            a: 'As shown in the Real World example above, this can hide genuine, unrelated bugs indefinitely, since it catches everything without distinction. Catch only the specific exception types you expect, and let anything else surface loudly.',
          },
          {
            q: 'Putting "success" logic inside try instead of else',
            a: 'Code placed inside try is protected by every except clause below it. If that code happens to raise the same exception type you were catching for a completely different reason, it gets misattributed. Move code that should only run after guaranteed success into an else clause.',
          },
          {
            q: 'Catching an exception and doing nothing with it (except: pass)',
            a: 'This is the most severe form of the bare-except problem — the failure is not logged, not counted, not surfaced anywhere. At minimum, log the exception; ideally, only catch it if you have a genuine, specific recovery action to take.',
          },
          {
            q: 'Listing a broad exception type before a more specific one in separate except blocks',
            a: 'except Exception: listed before except ValueError: means the ValueError block is unreachable — the broader clause above it already matches first. List more specific exception types before broader ones.',
          },
          {
            q: 'Using exceptions for routine, expected control flow instead of genuine error conditions',
            a: 'Wrapping every dictionary access in try/except KeyError: when .get() would do the job more clearly is a common overuse. Reserve exceptions for genuinely exceptional situations — reach for a direct .get() with a default first, when that\'s all you need.',
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
        <SectionTitle>Errors You Will Hit With Exception Handling — And Exactly Why</SectionTitle>

        {[
          {
            error: `SyntaxError: default 'except:' must be last`,
            cause: 'A bare except: clause was written before another, more specific except clause in the same try statement. Python requires the catch-all to come last, since clauses are checked in order and a bare except: would otherwise make every clause after it unreachable.',
            fix: 'Reorder the except clauses so specific exception types come first, and any bare except: (which, per Part 03, you should generally avoid entirely) comes last.',
          },
          {
            error: `TypeError: catching classes that do not inherit from BaseException is not allowed`,
            cause: 'An except clause references something that is not actually an exception class — commonly a typo, or accidentally passing a variable holding a non-exception value instead of an exception type.',
            fix: 'Confirm the class listed in except is a real exception class (built-in or a custom one inheriting from Exception), and check for a simple naming typo.',
          },
          {
            error: `RuntimeError: No active exception to re-raise`,
            cause: 'A bare raise statement (no argument) was used outside of an except block\'s handling context — there is no "current" exception for it to re-raise.',
            fix: 'Use a bare raise only inside an except block, to re-raise the exception that block just caught. If you need to raise a new exception from other code, raise a specific exception with an argument instead: raise ValueError("...").',
          },
          {
            error: `AttributeError: 'InsufficientFundsError' object has no attribute 'requested'`,
            cause: 'A custom exception\'s __init__ was overridden but forgot to actually store the extra data as instance attributes (self.requested = requested) before or after calling super().__init__().',
            fix: 'In a custom exception\'s __init__, explicitly assign every attribute you want callers to access later (self.requested = requested), and still call super().__init__(message) so the exception\'s printed message works correctly too.',
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
        'try/except lets you catch a runtime error where it happens instead of letting it crash the whole program.',
        'else runs only when the try block completes with no exception at all, and is NOT protected by the except clauses above it — the correct place for "success only" code.',
        'finally always runs — exception or not, caught or not — and is the mechanism guaranteed cleanup (like with open()) is built on.',
        'Never use a bare except: — it catches genuine bugs alongside the failure you meant to handle, and can hide serious problems for a long time, exactly as shown in the Real World example.',
        'Exception classes form a hierarchy — catching a parent class (like Exception) also catches every subclass beneath it. List more specific exception types before broader ones.',
        'Never catch BaseException directly — it includes KeyboardInterrupt and SystemExit, which should almost never be intercepted.',
        'raise with a specific exception type is the correct way to validate real runtime data — unlike assert, it is never stripped out by Python\'s optimization flag.',
        'A bare raise inside an except block re-raises the same exception; raise NewError(...) from original re-raises a different, more meaningful exception while preserving the original as its documented cause.',
        'Custom exception classes — even a one-line class inheriting from Exception — give a specific failure a distinct, catchable identity, and can carry structured data beyond just a message.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 18 covers how real Python projects are actually structured — the import system in full,
          how packages work, the if __name__ == &quot;__main__&quot; idiom, and building a proper
          requirements.txt.
        </p>
        <Link href="/learn/python/modules-packages-venv" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 18 → Modules, Packages &amp; Virtual Environments
        </Link>
      </div>
    </LearnLayout>
  )
}
