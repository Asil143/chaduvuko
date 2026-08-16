import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Logging Best Practices — Python | Chaduvuko',
  description:
    'Why print() is not logging, the logging module in depth, log levels, handlers and formatters, structured logging, and what you should never log.',
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

export default function LoggingBestPractices() {
  return (
    <LearnLayout
      title="Logging Best Practices"
      description="Why print() is not logging, the logging module in depth, log levels, handlers and formatters, and what you should never log."
      section="Python — Module 40"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why print() Is Not Logging" />
        <SectionTitle>Four Things print() Genuinely Cannot Do</SectionTitle>

        <Para>
          It is tempting to treat logging as "print, but fancier." That framing undersells the problem
          print() actually has in a production system. print() writes text to standard output and does
          nothing else — no concept of severity, no timestamp, no way to redirect output without changing
          code, and no way to turn it off. A production service that only knows how to print() has, in
          practice, no visibility into its own behavior once it is running unattended on a server nobody
          is watching a terminal for.
        </Para>

        <CodeBox label="Four capabilities print() simply does not have">{`1. LEVELS — print() can't distinguish "this is routine info" from
   "this is a critical failure." Every print looks identical.

2. TIMESTAMPS — print("Order processed") tells you nothing about
   WHEN it happened, unless you manually format one into every call.

3. ROUTING — print() always goes to stdout. You can't send warnings
   to one file, errors to another, and info messages nowhere at all,
   without rewriting every call site.

4. VERBOSITY CONTROL — you can't turn print() calls "off" selectively.
   Either the print() line runs, or you delete/comment it out by hand.`}</CodeBox>

        <Para>
          Each of these gaps matters in a real incident. Imagine a service has been running for three
          days when a customer reports a bug that happened "sometime yesterday afternoon." With only
          print() output — assuming it was even captured anywhere — you have an undifferentiated wall of
          text with no way to filter to yesterday afternoon, no way to isolate just the errors, and no way
          to tell which messages mattered without reading every line. This is precisely the gap the{' '}
          <code>logging</code> module exists to close, and precisely why Module 39&apos;s debugging
          techniques and this module are taught back to back — one is for catching a bug while you can see
          it happen; the other is for understanding what happened after the fact, on a system you were not
          watching live.
        </Para>

        <Callout type="info">
          This does not mean print() is banned. It remains genuinely useful for quick, throwaway checks
          during active development, exactly as covered in the previous module. The distinction is about
          code that ships and runs unattended — anything intended to still be useful a week from now,
          in a file, searchable, with a timestamp and a severity, belongs in the logging module instead.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The logging Module" />
        <SectionTitle>getLogger() and the Five Standard Levels</SectionTitle>

        <Para>
          Python&apos;s built-in <code>logging</code> module is the standard tool for everything print()
          cannot do. The basic building block is a <strong>logger</strong> object, obtained with{' '}
          <code>logging.getLogger(name)</code>, which you call methods on for each severity level instead
          of always calling the same <code>print()</code>.
        </Para>

        <CodeBox label="The five standard log levels, in increasing severity">{`import logging

logger = logging.getLogger(__name__)

logger.debug("Cache lookup for key=user:4821 — miss")       # DEBUG    — fine-grained, dev-only detail
logger.info("Order #8842 processed successfully")            # INFO     — routine, expected events
logger.warning("Retrying API call — attempt 2 of 3")          # WARNING  — unexpected, but recovered
logger.error("Failed to charge card for order #8842")          # ERROR    — a real failure, needs attention
logger.critical("Database connection pool exhausted")            # CRITICAL — the system is in serious trouble`}</CodeBox>

        <Para>
          The level you choose is not a stylistic detail — it determines who sees the message and how
          urgently. <code>DEBUG</code> is for details useful only while actively developing or diagnosing
          something, and is usually silenced in production. <code>INFO</code> records normal operation —
          things that happened as expected and are worth a record of, like "user logged in" or "job
          completed." <code>WARNING</code> flags something unexpected that the program recovered from on
          its own, like a retried network call. <code>ERROR</code> means an operation genuinely failed —
          the specific thing the program was trying to do did not happen. <code>CRITICAL</code> is
          reserved for failures serious enough that the whole application, or a major part of it, may be
          unable to continue.
        </Para>

        <CodeBox label="A concrete rule of thumb for choosing a level">{`DEBUG    — "here's exactly what the code is doing, step by step"
INFO     — "this expected thing happened"
WARNING  — "something odd happened, but I recovered"
ERROR    — "this specific operation failed"
CRITICAL — "the whole system may be about to go down"`}</CodeBox>

        <SubTitle>logging.getLogger(__name__) — the standard idiom, and why it matters</SubTitle>

        <Para>
          Nearly every real Python codebase uses <code>logging.getLogger(__name__)</code> at the top of
          each module, rather than one single global logger shared everywhere. <code>__name__</code> is
          the module&apos;s own dotted path (e.g. <code>"myapp.billing.charges"</code>), so each module
          gets a logger named after itself automatically, with zero manual naming required. This matters
          because it lets you configure logging <strong>per module</strong> later — for example, silencing
          noisy debug output from a third-party library while keeping your own application&apos;s logs at
          full verbosity — something a single shared logger cannot do.
        </Para>

        <Callout type="tip">
          <strong>The root logger vs named loggers.</strong> If you never call <code>getLogger()</code>{' '}
          at all and just call <code>logging.warning(...)</code> directly, you are using the implicit{' '}
          <strong>root logger</strong> — fine for a tiny script, but it gives up the per-module control
          described above. Every real module in a real project should create its own named logger with{' '}
          <code>getLogger(__name__)</code> as the very first logging-related line.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Configuring a Logger" />
        <SectionTitle>Handlers and Formatters — Where Logs Go, and What They Look Like</SectionTitle>

        <Para>
          A logger by itself decides <em>whether</em> a message is worth recording (based on its level).
          It does not decide <em>where</em> that message ends up, or what it looks like on the page — that
          is the job of two separate objects: <strong>handlers</strong> and <strong>formatters</strong>.
        </Para>

        <CodeBox label="The three pieces working together">{`LOGGER     — decides IF a message is important enough to process at all
HANDLER    — decides WHERE a message goes (console, a file, both, a remote server...)
FORMATTER  — decides WHAT a message looks like (timestamp, level, message text...)`}</CodeBox>

        <CodeBox label="A basic, complete configuration">{`import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# A handler that writes to the console
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)   # only INFO and above reach the console

# A formatter controlling the text layout of every message
formatter = logging.Formatter(
    "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
)
console_handler.setFormatter(formatter)

logger.addHandler(console_handler)

logger.debug("This won't appear on console — below the handler's INFO level")
logger.info("Order #8842 processed successfully")
# Output: 2026-08-14 09:12:03,881 | INFO     | myapp.orders | Order #8842 processed successfully`}</CodeBox>

        <Para>
          Notice there are <em>two</em> level checks happening: the logger&apos;s own level (here,{' '}
          <code>DEBUG</code>, meaning it will consider processing everything) and the handler&apos;s level
          (here, <code>INFO</code>, meaning even though the logger considered the debug message, this
          particular handler drops anything below <code>INFO</code>). This two-level design is exactly
          what lets one logger feed multiple handlers with different verbosity — for example, everything
          at <code>DEBUG</code> and above written to a file for later investigation, while only{' '}
          <code>WARNING</code> and above appears on the console during normal operation.
        </Para>

        <CodeBox label="A quick shortcut for simple scripts — basicConfig()">{`import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
)

logging.info("Service started")
# basicConfig() sets up the root logger in one call — fine for a small script,
# but real applications configure named loggers explicitly, as shown above.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Logging to a File" />
        <SectionTitle>FileHandler and Log Rotation</SectionTitle>

        <Para>
          Console output disappears the moment a terminal closes or a process restarts. Anything you
          genuinely want to keep — for debugging an incident days later, or for an audit trail — needs to
          go to a file, using <code>logging.FileHandler</code>.
        </Para>

        <CodeBox label="Writing logs to a file, alongside the console">{`import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler("app.log")
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(logging.Formatter(
    "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
))

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)   # console stays quiet — only warnings and above
console_handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))

logger.addHandler(file_handler)
logger.addHandler(console_handler)

logger.info("Order #8842 processed")      # goes to app.log only
logger.warning("Retry attempt 2 of 3")     # goes to both app.log AND the console`}</CodeBox>

        <Para>
          A file that grows forever is its own problem — eventually it fills the disk. The standard
          solution is a <strong>rotating</strong> file handler, which automatically starts a new file
          once the current one hits a size limit (or after a time period, like daily), and deletes or
          archives the oldest ones.
        </Para>

        <CodeBox label="RotatingFileHandler — keeps at most 5 files of 10MB each">{`from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    "app.log", maxBytes=10 * 1024 * 1024, backupCount=5
)
# app.log fills up -> renamed to app.log.1, a fresh app.log starts.
# Once app.log.5 would be created, the oldest file is deleted instead.`}</CodeBox>

        <Callout type="tip">
          In real production systems, logs are frequently shipped somewhere other than a local file
          entirely — a centralized logging platform (like Datadog, Splunk, or an ELK stack) that
          aggregates logs from every running instance of a service into one searchable place. The pattern
          is the same conceptually: a handler decides where the log goes, and a local file is simply the
          simplest possible destination to start with.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structured Logging" />
        <SectionTitle>Why Plain-Text Logs Get Hard to Search at Scale</SectionTitle>

        <Para>
          Everything so far has produced plain, human-readable text lines — genuinely fine to read
          directly in a small file. It breaks down at scale. Once a service produces millions of log
          lines a day across dozens of running instances, a human is never reading most of that text
          directly — a machine is searching, filtering, and aggregating it. Plain text is awkward for a
          machine to parse reliably, because the "shape" of the useful data is embedded inside a sentence
          rather than existing as clearly labeled fields.
        </Para>

        <CodeBox label="Plain text — readable by a human, awkward to search reliably">{`2026-08-14 09:12:03 | INFO | Order #8842 processed for user 4821, total $129.50

# To find "every failed order for user 4821 over $100", a search tool has to
# parse this sentence with a fragile regex, hoping the wording never changes.`}</CodeBox>

        <CodeBox label="Structured (JSON) logging — the same event, machine-searchable">{`{"timestamp": "2026-08-14T09:12:03Z", "level": "INFO", "event": "order_processed",
 "order_id": 8842, "user_id": 4821, "total": 129.50}

# Now "every order over $100 for user 4821" is a direct field query —
# total > 100 AND user_id = 4821 — not a text-parsing guess.`}</CodeBox>

        <Para>
          Python does not have a JSON-formatting logger built directly into the standard library, but
          producing one is a small step: write a custom <code>Formatter</code> subclass that serializes
          the log record&apos;s fields as JSON instead of an f-string sentence, or reach for a small,
          widely used third-party package like <code>python-json-logger</code> that does exactly this. The
          principle to take away, even without memorizing the exact code: once a service is running at
          real production scale, logs are typically treated as structured data to be queried, not prose to
          be read top to bottom.
        </Para>

        <Callout type="info">
          You do not need structured logging for a small personal project or an early-stage script — plain
          text with a good formatter, as shown in Part 03, is genuinely sufficient. This becomes worth the
          extra setup once a team is regularly searching logs across multiple running services to answer a
          specific question, rather than reading one file top to bottom.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — What NOT to Log" />
        <SectionTitle>Logging Secrets Is a Security Incident, Not a Style Mistake</SectionTitle>

        <Para>
          It is genuinely common, and genuinely dangerous, to accidentally log sensitive data while
          debugging — printing an entire request object "just to see what&apos;s in it," which happens to
          include a password field, an API key, or a full credit card number. Once that line ships,
          the sensitive value is sitting in a log file — often one that gets copied to backups, shipped to
          a third-party logging platform, or retained for months, with far weaker access controls than
          your actual database has.
        </Para>

        <CodeBox label="A real, dangerously common mistake">{`logger.info(f"Login attempt: {request.json}")
# If request.json includes {"username": "...", "password": "hunter2"},
# that plaintext password is now permanently sitting in a log file.

logger.debug(f"Processing payment: {payment_details}")
# If payment_details includes a full card number, this is very likely
# a compliance violation (PCI-DSS) on top of being a security risk.`}</CodeBox>

        <CodeBox label="The fix — log identifiers, never the sensitive value itself">{`logger.info(f"Login attempt for username={request.json.get('username')!r}")
# No password in the log at all — just enough to investigate the attempt.

logger.debug(f"Processing payment for order_id={order_id}, "
             f"card_last4={card_number[-4:]}")
# Only the last 4 digits — enough to identify the transaction to a support
# agent, useless to an attacker who reads the log file.`}</CodeBox>

        <Para>
          A short, practical checklist worth internalizing: never log passwords, API keys, tokens, or
          secrets — full stop, not even at DEBUG level, since DEBUG logs are still logs. Never log full
          credit card numbers, social security numbers, or other regulated personal data — log an
          identifier (an order ID, a masked last-4) instead. Be careful with logging entire request or
          response objects "for convenience," since it is very easy for a sensitive field to be buried
          inside one without you noticing at the time you write the line.
        </Para>

        <Callout type="warning">
          This is not a hypothetical concern — "sensitive data accidentally captured in application logs"
          is a real, recurring category of security incident at companies of every size, precisely because
          it usually starts as an innocent debug print that nobody remembered to remove before the code
          reached production, and logs frequently outlive the awareness that they contain something they
          shouldn&apos;t.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Worked Example" />
        <SectionTitle>Configuring Logging for a Small Python Service, End to End</SectionTitle>

        <Para>
          Bringing every piece together, here is a realistic logging setup for a small service — an order
          processor — the kind of configuration you would genuinely write once near the top of a real
          project and reuse everywhere.
        </Para>

        <CodeBox label="logging_config.py — a reusable setup function">{`import logging
from logging.handlers import RotatingFileHandler

def configure_logging():
    root = logging.getLogger()
    root.setLevel(logging.DEBUG)

    file_handler = RotatingFileHandler(
        "orders.log", maxBytes=5 * 1024 * 1024, backupCount=3
    )
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter(
        "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
    ))

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter(
        "%(levelname)-8s | %(message)s"
    ))

    root.addHandler(file_handler)
    root.addHandler(console_handler)`}</CodeBox>

        <CodeBox label="orders.py — using the module-level logger idiom from Part 02">{`import logging

logger = logging.getLogger(__name__)

def process_order(order):
    logger.info(f"Processing order_id={order.id}")
    try:
        charge_card(order)
        logger.info(f"Payment succeeded for order_id={order.id}")
    except PaymentError as e:
        logger.error(f"Payment failed for order_id={order.id}: {e}")
        raise
    logger.debug(f"Order {order.id} full payload: {order.items}")`}</CodeBox>

        <CodeBox label="main.py — wiring it together">{`from logging_config import configure_logging
from orders import process_order

if __name__ == "__main__":
    configure_logging()
    process_order(load_next_order())`}</CodeBox>

        <Para>
          Everything from Parts 01 through 06 shows up in this small example: a named logger per module
          (Part 02), a file handler retaining full detail and a console handler kept quieter (Parts 03–04),
          and deliberately no sensitive fields ever passed directly into a log call (Part 06). This is the
          realistic shape of logging in a small, real Python service — not a single global{' '}
          <code>print()</code> replaced one-for-one, but a small amount of one-time setup that every module
          in the project benefits from afterward.
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
        <SectionTitle>A Silent Failure at an Austin Subscription-Box Company</SectionTitle>

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
            Scenario — Subscription box startup, Austin · Missed billing run
          </div>

          <Para>
            A subscription-box company runs a nightly script that charges every customer due for renewal
            that day. It has always used <code>print()</code> statements, redirected to a text file by the
            server&apos;s cron job (<code>python billing.py &gt;&gt; billing_output.txt</code>), and nobody
            has ever needed to look closely at that file — until a Monday when finance notices Friday
            night&apos;s revenue is roughly 15% below every other Friday that month.
          </Para>

          <SubSubTitle>What the investigation runs into immediately</SubSubTitle>

          <Para>
            The on-call engineer opens <code>billing_output.txt</code> expecting to find the answer
            quickly. Instead they find exactly what Part 01 of this module warned about: thousands of
            identical-looking lines of plain text, no timestamps (so there is no way to isolate "just
            Friday night&apos;s run" — the file is one continuous append across every night the script has
            ever run), and no severity level distinguishing a customer whose card was declined normally
            from a customer the script actually failed to process due to a bug. Every line looks the same.
          </Para>

          <SubSubTitle>What proper logging would have shown immediately</SubSubTitle>

          <Para>
            With the file re-run under a real logger — using <code>getLogger(__name__)</code>, level-aware
            output, and a timestamp on every line, exactly as shown in Part 07 — the engineer would have
            been able to grep directly for <code>ERROR</code> lines within Friday&apos;s timestamp range
            and found the actual cause in seconds: a third-party payment API had briefly returned malformed
            responses for about twenty minutes, and the billing script&apos;s exception handling silently
            skipped those customers instead of raising or clearly recording the failure. Roughly 200
            renewals were quietly never charged, and nothing distinguished those failures from the
            thousands of normal successful lines around them.
          </Para>

          <Para>
            The team spent the rest of that week replacing every <code>print()</code> in the billing system
            with structured, leveled logging (Parts 02–05), specifically so that a future incident like
            this one would be a two-minute log search instead of a two-day manual investigation through an
            undifferentiated text file. This is precisely the gap between print() and real logging that
            this module opened with — and it is a genuinely common story across companies that treat
            logging as an afterthought until a missed-revenue incident forces the issue.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Logging</SectionTitle>

        {[
          {
            wrong: '"Logging is just print() with extra steps"',
            right: 'Logging adds four capabilities print() genuinely cannot provide: severity levels, automatic timestamps, configurable routing to multiple destinations at once, and the ability to control verbosity without editing code. These are not cosmetic — they are exactly what makes a production incident searchable after the fact instead of requiring a fresh reproduction.',
          },
          {
            wrong: '"You should log everything at DEBUG level, just in case you need it later"',
            right: 'Logging everything indiscriminately produces the same searchability problem as plain print() at real volume — a wall of undifferentiated text. Choose levels deliberately (Part 02), and remember that DEBUG-level logs are still a security risk if they contain sensitive data (Part 06), regardless of whether anyone is currently reading them.',
          },
          {
            wrong: '"One global logger is simpler than a separate logger per module"',
            right: 'logging.getLogger(__name__) per module is the standard idiom specifically because it enables per-module configuration later — silencing a noisy third-party library\'s debug output while keeping your own code at full verbosity, something a single shared logger cannot express.',
          },
          {
            wrong: '"As long as I don\'t print passwords directly, my logging is secure"',
            right: 'Logging an entire request or response object "for convenience" is a very common way sensitive fields end up in a log file without the engineer noticing at the time — it is not just about avoiding an explicit logger.info(password). Be deliberate about exactly which fields get logged, never an entire object dump that might contain something sensitive.',
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
            q: 'Why shouldn\'t you just use print() statements for logging in a production application?',
            a: 'print() has no concept of severity levels, no automatic timestamps, no ability to route output to multiple destinations (console vs a file vs a remote log aggregator) without changing code at every call site, and no way to control verbosity without commenting lines out. The logging module solves all four, which is exactly what makes it possible to diagnose an incident that happened days ago instead of only being able to catch a bug while actively watching a terminal.',
          },
          {
            q: 'Explain the five standard log levels and give an example of when you\'d use each.',
            a: 'DEBUG — fine-grained detail useful only during active development, like a cache lookup result. INFO — routine, expected events worth a record of, like "order processed." WARNING — something unexpected happened but the program recovered on its own, like a retried API call. ERROR — a specific operation genuinely failed, like a failed payment charge. CRITICAL — the whole system or a major part of it may be unable to continue, like an exhausted database connection pool.',
          },
          {
            q: 'What is the difference between a logger, a handler, and a formatter?',
            a: 'The logger decides IF a message is important enough to be processed at all, based on its configured level. The handler decides WHERE a processed message goes — console, a file, a rotating file, a remote server — and each handler can have its own separate level threshold. The formatter decides WHAT the message looks like as text — the layout of the timestamp, level name, logger name, and message content.',
          },
          {
            q: 'Why is logging.getLogger(__name__) the standard idiom instead of using the root logger directly?',
            a: '__name__ gives each module a logger named after its own dotted module path automatically. This enables per-module configuration later — for example, silencing a noisy third-party library\'s DEBUG output specifically while keeping your own application code at full verbosity — which a single shared root logger cannot express, since it has no way to distinguish which module a message originated from.',
          },
          {
            q: 'What should you never log, and why?',
            a: 'Passwords, API keys, tokens, and secrets should never be logged, even at DEBUG level, since DEBUG logs are still persisted logs. Full credit card numbers and other regulated personal data should never be logged directly either — log an identifier or a masked value (like the last 4 digits) instead. This matters because log files are often copied to backups, shipped to third-party platforms, and retained far longer and with weaker access controls than the systems the sensitive data originally lived in — turning an innocent debug line into a real security or compliance incident.',
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
        <SectionTitle>Logging Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using logging.info() everywhere, regardless of actual severity',
            a: 'If every message is INFO, the level system provides no filtering value at all — you can no longer isolate just the warnings or errors when investigating an incident. Choose the level deliberately using the guide in Part 02.',
          },
          {
            q: 'Forgetting to set a level on the logger or handler at all',
            a: 'A logger\'s default level is WARNING — calling logger.info() or logger.debug() with no explicit setLevel() call will silently produce no output at all, which looks exactly like a bug in your logging setup rather than a missing configuration line.',
          },
          {
            q: 'Using string concatenation or f-strings for messages that might not even be logged',
            a: 'logger.debug(f"Processing {expensive_function()}") always evaluates expensive_function(), even when DEBUG is disabled and the message will be thrown away. The logging module supports lazy formatting — logger.debug("Processing %s", expensive_function()) — which only evaluates the argument if the message will actually be emitted.',
          },
          {
            q: 'Logging exceptions with logger.error(e) instead of logger.exception(e)',
            a: 'logger.exception() (called from inside an except block) automatically includes the full traceback in the log output — genuinely essential for debugging later. logger.error(e) only logs the exception\'s message text, discarding the traceback that would show exactly where it happened.',
          },
          {
            q: 'Not removing or reconsidering DEBUG-level logs before shipping to production',
            a: 'DEBUG logs left enabled in production can flood log storage with noise, and as covered in Part 06, can quietly contain sensitive data that a developer never meant to persist. Review what DEBUG level actually logs before it goes live, not after an incident.',
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
        <SectionTitle>Logging Problems You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `Nothing appears in the console when calling logger.debug(...) or logger.info(...)`,
            cause: 'A logger\'s default level is WARNING if never explicitly set — DEBUG and INFO messages are silently dropped before they reach any handler.',
            fix: 'Call logger.setLevel(logging.DEBUG) (or whatever level you need) explicitly, and confirm any attached handler\'s own level isn\'t set higher than the message\'s level.',
          },
          {
            error: `Every log message appears twice`,
            cause: 'A common cause is calling logging.basicConfig() AND manually adding handlers to the same logger, or adding the same handler to a logger more than once (e.g. by calling a setup function twice, such as on module reload).',
            fix: 'Check whether addHandler() is being called more than once for the same logger, and ensure any setup/configuration function only runs a single time per process.',
          },
          {
            error: `PermissionError: [Errno 13] Permission denied: 'app.log'`,
            cause: 'FileHandler tried to open a log file in a directory the running process does not have write access to — common when a script is deployed to a server with different file permissions than your local machine.',
            fix: 'Point the FileHandler at a directory the process can actually write to (often something like /var/log/<app-name>/ on a real server, configured by whoever manages deployment), or fix the directory\'s permissions.',
          },
          {
            error: `Log messages from a third-party library flood the output`,
            cause: 'Many libraries call logging.getLogger(__name__) internally too, and if your root logger is set to DEBUG, every library\'s internal debug messages get emitted alongside your own.',
            fix: 'Set that specific library\'s logger to a higher level directly: logging.getLogger("requests").setLevel(logging.WARNING), leaving your own application\'s loggers at full verbosity.',
          },
          {
            error: `A rotated log file (app.log.1, app.log.2...) never gets deleted, and disk usage keeps growing`,
            cause: 'RotatingFileHandler\'s backupCount was left at its default (0), which means unlimited backups are kept forever rather than being pruned.',
            fix: 'Set an explicit backupCount (e.g. backupCount=5) when constructing the RotatingFileHandler, as shown in Part 04.',
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
        'print() has no levels, no automatic timestamps, no configurable routing, and no way to control verbosity without editing code — logging solves all four.',
        'The five standard levels, in order: DEBUG, INFO, WARNING, ERROR, CRITICAL. Choose deliberately — logging everything at one level defeats the purpose of having levels at all.',
        'logging.getLogger(__name__) is the standard idiom — a named logger per module enables per-module verbosity control, unlike a single shared root logger.',
        'A logger decides IF a message is processed. A handler decides WHERE it goes. A formatter decides WHAT it looks like. All three are configured separately.',
        'RotatingFileHandler prevents log files from growing forever by capping size and pruning old backups automatically.',
        'Structured (JSON) logging becomes worth the setup once logs are searched by a machine at real production scale, rather than read by a human top to bottom.',
        'Never log passwords, API keys, tokens, full card numbers, or other sensitive data — even at DEBUG level. Log an identifier or masked value instead.',
        'A logger\'s default level is WARNING if never explicitly set — the most common reason a first attempt at logging.debug() or logging.info() silently produces nothing.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 41 turns a working script into a real, installable Python package — project structure,
          pyproject.toml, building wheels, and publishing to PyPI.
        </p>
        <Link href="/learn/python/packaging-distribution" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 41 → Packaging and Distributing Python Projects
        </Link>
      </div>
    </LearnLayout>
  )
}
