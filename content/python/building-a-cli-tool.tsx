import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Building a CLI Tool — Python | Chaduvuko',
  description:
    'A complete, real command-line tool built from scratch using argparse — start to finish, project-style.',
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

export default function BuildingACliTool() {
  return (
    <LearnLayout
      title="Building a CLI Tool"
      description="A complete, real command-line tool built from scratch using argparse — start to finish, project-style."
      section="Python — Module 44"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What We're Building" />
        <SectionTitle>wordstat — a Small, Real Text-Analysis CLI</SectionTitle>

        <Para>
          This module builds one complete tool end to end, rather than covering isolated snippets — a
          command-line utility called <code>wordstat</code> that reads a text file and reports word
          counts, the most frequent words, and basic statistics. It deliberately pulls together file I/O,
          the <code>collections</code> module, and — the actual focus of this module —{' '}
          <code>argparse</code>, the standard library's tool for building a real command-line interface.
        </Para>

        <CodeBox label="What the finished tool will support">{`wordstat report myfile.txt                  # basic word/line/char counts
wordstat report myfile.txt --top 5           # the 5 most common words
wordstat report myfile.txt --min-length 4    # ignore words shorter than 4 characters
wordstat --help                               # auto-generated usage help`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — argparse Basics" />
        <SectionTitle>Positional and Optional Arguments</SectionTitle>

        <Para>
          Without <code>argparse</code>, reading command-line arguments means manually parsing{' '}
          <code>sys.argv</code> — a raw list of strings with no validation, no help text, and no error
          handling. <code>argparse</code> replaces all of that with a declarative description of what
          arguments a script accepts.
        </Para>

        <CodeBox label="wordstat.py — a first, minimal version">{`import argparse

def main():
    parser = argparse.ArgumentParser(description="Analyse word statistics in a text file")
    parser.add_argument("filename", help="Path to the text file to analyse")   # positional — required
    parser.add_argument("--top", type=int, default=10, help="Show the N most common words")

    args = parser.parse_args()

    print(f"Analysing {args.filename}, showing top {args.top} words")

if __name__ == "__main__":
    main()`}</CodeBox>

        <CodeBox label="Running it">{`$ python wordstat.py notes.txt
Analysing notes.txt, showing top 10 words

$ python wordstat.py notes.txt --top 5
Analysing notes.txt, showing top 5 words

$ python wordstat.py
usage: wordstat.py [-h] [--top TOP] filename
wordstat.py: error: the following arguments are required: filename`}</CodeBox>

        <Para>
          A <strong>positional</strong> argument (<code>filename</code>) is required and identified by
          its position, not a flag. An <strong>optional</strong> argument (<code>--top</code>, note the
          leading dashes) has a default value and can be omitted — <code>type=int</code> tells{' '}
          <code>argparse</code> to convert the raw string input and automatically reject non-numeric
          input with a clear error, before your own code ever runs.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Free Help Text" />
        <SectionTitle>--help Is Generated Automatically, Not Written By Hand</SectionTitle>

        <CodeBox label="What --help produces, entirely from the add_argument() calls above">{`$ python wordstat.py --help
usage: wordstat.py [-h] [--top TOP] filename

Analyse word statistics in a text file

positional arguments:
  filename    Path to the text file to analyse

options:
  -h, --help  show this help message and exit
  --top TOP   Show the N most common words`}</CodeBox>

        <Callout type="tip">
          <strong>This is one of argparse's biggest practical wins over hand-parsing <code>sys.argv</code>.</strong>{' '}
          The <code>help=</code> string passed to each <code>add_argument()</code> call is the single
          source of truth for both validation and documentation — there is no separate help text to
          keep in sync manually, and it can never drift out of date the way a hand-written usage comment
          can.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Building the Real Logic" />
        <SectionTitle>Reading the File and Computing Statistics</SectionTitle>

        <CodeBox label="Adding the actual word-counting logic">{`import argparse
from collections import Counter

def analyse_file(filename, min_length=1):
    with open(filename, encoding="utf-8") as f:
        text = f.read()

    words = [w.strip(".,!?;:\\"'()").lower() for w in text.split()]
    words = [w for w in words if len(w) >= min_length and w]

    return {
        "line_count": text.count("\\n") + 1,
        "word_count": len(words),
        "char_count": len(text),
        "most_common": Counter(words).most_common(),
    }

def main():
    parser = argparse.ArgumentParser(description="Analyse word statistics in a text file")
    parser.add_argument("filename", help="Path to the text file to analyse")
    parser.add_argument("--top", type=int, default=10, help="Show the N most common words")
    parser.add_argument("--min-length", type=int, default=1, help="Ignore words shorter than this")

    args = parser.parse_args()

    stats = analyse_file(args.filename, min_length=args.min_length)

    print(f"Lines: {stats['line_count']}")
    print(f"Words: {stats['word_count']}")
    print(f"Characters: {stats['char_count']}")
    print(f"\\nTop {args.top} words:")
    for word, count in stats["most_common"][:args.top]:
        print(f"  {word}: {count}")

if __name__ == "__main__":
    main()`}</CodeBox>

        <Para>
          Notice <code>--min-length</code> on the command line automatically becomes{' '}
          <code>args.min_length</code> in code — <code>argparse</code> converts dashes to underscores
          automatically, since a dash is not a legal character in a Python identifier.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Subcommands" />
        <SectionTitle>Structuring a Tool With Multiple Distinct Actions</SectionTitle>

        <Para>
          A real CLI often supports several genuinely different actions — think <code>git commit</code>{' '}
          vs <code>git push</code>. <code>argparse</code> supports this through{' '}
          <strong>subparsers</strong>, each with its own independent set of arguments.
        </Para>

        <CodeBox label="Adding a second subcommand, 'wordstat count', alongside 'wordstat report'">{`def main():
    parser = argparse.ArgumentParser(description="wordstat — a small text analysis tool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    report_parser = subparsers.add_parser("report", help="Full statistics report")
    report_parser.add_argument("filename")
    report_parser.add_argument("--top", type=int, default=10)
    report_parser.add_argument("--min-length", type=int, default=1)

    count_parser = subparsers.add_parser("count", help="Just the total word count")
    count_parser.add_argument("filename")

    args = parser.parse_args()

    if args.command == "report":
        run_report(args)
    elif args.command == "count":
        stats = analyse_file(args.filename)
        print(stats["word_count"])`}</CodeBox>

        <CodeBox label="Now the tool has two distinct commands, each with its own help">{`$ python wordstat.py report notes.txt --top 5
$ python wordstat.py count notes.txt
$ python wordstat.py report --help      # help scoped to just the report subcommand`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Reading From stdin, and Exit Codes" />
        <SectionTitle>Playing Well With the Rest of the Command Line</SectionTitle>

        <Para>
          A well-behaved CLI tool should support reading from <strong>stdin</strong>, so it can be
          chained with other command-line tools using a pipe — and should return a meaningful{' '}
          <strong>exit code</strong>, so scripts calling it can detect success or failure.
        </Para>

        <CodeBox label="Supporting stdin as an alternative to a filename">{`import sys

def get_text(filename):
    if filename == "-":                # the conventional way to mean "read from stdin"
        return sys.stdin.read()
    with open(filename, encoding="utf-8") as f:
        return f.read()

# Now this works:
# cat notes.txt | python wordstat.py report -`}</CodeBox>

        <CodeBox label="Returning proper exit codes">{`def main():
    parser = argparse.ArgumentParser(...)
    args = parser.parse_args()

    try:
        stats = analyse_file(args.filename)
    except FileNotFoundError:
        print(f"Error: {args.filename} not found", file=sys.stderr)
        sys.exit(1)          # non-zero exit code signals failure to the calling shell/script

    print(f"Words: {stats['word_count']}")
    sys.exit(0)               # explicit, though 0 is also the default if the script just ends normally

if __name__ == "__main__":
    main()`}</CodeBox>

        <Callout type="tip">
          <strong>Error messages should go to <code>stderr</code>, not <code>stdout</code></strong> —{' '}
          <code>print(..., file=sys.stderr)</code> — so that a script consuming this tool's real output
          via a pipe (<code>wordstat report notes.txt | some_other_tool</code>) never accidentally
          receives error text mixed into the data it is trying to process.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Making It Installable" />
        <SectionTitle>From "a script you run with python" to a Real Command</SectionTitle>

        <Para>
          Right now, running the tool requires <code>python wordstat.py ...</code>. A properly packaged
          CLI tool (using the packaging concepts from the earlier Packaging &amp; Distribution module,
          and the project-structure conventions from the Modules &amp; Virtual Environments module) can
          be installed so it runs as a plain command: <code>wordstat report notes.txt</code>.
        </Para>

        <CodeBox label="pyproject.toml — registering an entry point">{`[project]
name = "wordstat"
version = "0.1.0"

[project.scripts]
wordstat = "wordstat.cli:main"     # package.module:function`}</CodeBox>

        <CodeBox label="Installing it locally in editable mode, and using it as a real command">{`pip install -e .

wordstat report notes.txt --top 5    # no more "python wordstat.py" needed`}</CodeBox>

        <Para>
          The <code>[project.scripts]</code> entry tells pip to generate a small executable wrapper
          during installation that calls <code>main()</code> inside <code>wordstat/cli.py</code> — this
          is exactly the mechanism behind real command-line tools you already use, like{' '}
          <code>pytest</code> or <code>black</code>, which are themselves just Python packages installed
          with an entry point defined the same way.
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
        <SectionTitle>An Internal Deploy Tool at a Salt Lake City DevOps Team</SectionTitle>

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
            Scenario — DevOps team, Salt Lake City · Internal tooling
          </div>

          <Para>
            A team's deployment process starts as a shared page of copy-pasted shell commands, each
            engineer running a slightly different variation, with several production incidents traced
            back to a step run out of order or a flag forgotten entirely. They consolidate the whole
            process into a single internal CLI tool, built exactly the way this module builds{' '}
            <code>wordstat</code>.
          </Para>

          <CodeBox label="The resulting tool's shape">{`deploytool plan --env staging          # shows what WOULD happen, changes nothing
deploytool apply --env staging          # actually deploys
deploytool apply --env prod --confirm   # --confirm required for prod, on purpose
deploytool rollback --env prod --to v1.4.2`}</CodeBox>

          <SubSubTitle>Why this mattered beyond convenience</SubSubTitle>

          <Para>
            Every deployment now runs through the exact same validated code path, with{' '}
            <code>argparse</code> itself rejecting malformed invocations before any real action happens
            — a missing <code>--env</code>, or an attempt to deploy to <code>prod</code> without the
            deliberately required <code>--confirm</code> flag, fails immediately with a clear error
            instead of half-executing a copy-pasted shell command with the wrong environment silently
            baked in. The team's own framing: "the CLI's validation IS the safety mechanism — it is not
            possible to accidentally deploy to the wrong environment anymore, because the tool simply
            won't let you."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Building CLI Tools</SectionTitle>

        {[
          {
            wrong: '"Parsing sys.argv manually is simpler than learning argparse for a small script"',
            right: 'It looks simpler for the very first few lines, but quickly loses out — argparse gives type conversion, validation, auto-generated help text, and clear error messages essentially for free, all of which have to be hand-built and hand-maintained with manual sys.argv parsing.',
          },
          {
            wrong: '"A CLI tool always needs to be installed/packaged to be considered real"',
            right: 'A single well-structured script run with "python tool.py ..." is a completely legitimate, common form for an internal or personal tool. Packaging with an entry point (Part 07) is valuable specifically when the tool needs to be run as a plain command across a team or distributed more broadly.',
          },
          {
            wrong: '"Error messages and normal output can both just use print()"',
            right: 'Regular output should go to stdout; errors should go to stderr (print(..., file=sys.stderr)) — this distinction matters the moment the tool is used in a pipe with other commands, so error text never gets mixed into data another tool is trying to process.',
          },
          {
            wrong: '"Subcommands (like git commit/git push) are unnecessary complexity for most tools"',
            right: 'They are exactly the right structure the moment a tool needs to support more than one genuinely distinct action, each with different arguments — trying to cram several unrelated behaviours behind one flat set of flags becomes confusing far faster than a small number of clearly named subcommands.',
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
            q: 'What is the difference between a positional and an optional argument in argparse?',
            a: 'A positional argument (like filename) is required and identified by its position in the command line, with no leading dashes. An optional argument (like --top) is identified by its flag name, can have a default value, and can be omitted entirely if a default is provided.',
          },
          {
            q: 'What genuinely valuable behaviour does argparse provide beyond just reading sys.argv?',
            a: 'Automatic type conversion and validation (type=int rejects non-numeric input with a clear error before your code runs), auto-generated --help text sourced directly from each add_argument() call, and clear, consistent error messages for missing or malformed arguments — none of which have to be hand-built.',
          },
          {
            q: 'When would you reach for argparse subparsers instead of a flat set of flags?',
            a: 'When a tool needs to support multiple genuinely distinct actions with their own independent sets of arguments — similar to git commit vs git push. Subparsers give each subcommand its own scoped arguments and help text, which stays clearer than trying to encode several unrelated behaviours into one flat flag set.',
          },
          {
            q: 'Why should error output go to stderr rather than stdout?',
            a: "So a script or pipe consuming the tool's real output (e.g. wordstat report file.txt | grep something) never accidentally receives error text mixed into the data stream it is processing — stdout is for the tool's actual output, stderr is for diagnostics and errors.",
          },
          {
            q: 'How does a Python CLI tool become runnable as a plain command (like "wordstat ...") instead of "python wordstat.py ..."?',
            a: 'By defining an entry point in pyproject.toml under [project.scripts], mapping a command name to a package.module:function target, then installing the package (e.g. with pip install -e . for local development) — pip generates a small executable wrapper that calls that function directly.',
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
        <SectionTitle>CLI Tool Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting that argparse converts dashes to underscores in attribute names',
            a: '--min-length on the command line becomes args.min_length in code, not args.min-length (which would not even be a legal Python identifier) — a common source of AttributeError for anyone new to argparse.',
          },
          {
            q: 'Mixing error output into stdout instead of stderr',
            a: 'Breaks any downstream pipe or script that expects the tool\'s stdout to contain only its real output — error diagnostics belong on stderr specifically so they can be separated cleanly.',
          },
          {
            q: 'Not setting required=True on add_subparsers when every invocation must pick one',
            a: 'Without it, running the tool with no subcommand at all silently does nothing (args.command is simply None) instead of showing a clear "you must choose a command" error.',
          },
          {
            q: 'Never testing the packaged, installed version of the tool, only the raw script',
            a: 'A tool that works fine as "python tool.py" can still fail once packaged and installed via its entry point, if the pyproject.toml target path is wrong — always verify "pip install -e ." followed by running the actual installed command name.',
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
        <SectionTitle>Errors You Will Hit Building CLI Tools — And Exactly Why</SectionTitle>

        {[
          {
            error: `error: the following arguments are required: filename`,
            cause: 'A required positional argument was not provided on the command line.',
            fix: 'Provide the missing argument, or run the tool with --help to see the exact expected usage.',
          },
          {
            error: `error: argument --top: invalid int value: 'five'`,
            cause: 'A value was passed to an argument declared with type=int, but it cannot be converted to an integer.',
            fix: 'Pass a genuinely numeric value, or reconsider whether the argument should actually accept a string.',
          },
          {
            error: `AttributeError: 'Namespace' object has no attribute 'min_length'`,
            cause: 'Code refers to an attribute name that does not match what argparse actually generated — often because the dash-to-underscore conversion was not accounted for, or the argument name has a typo.',
            fix: 'Double-check the exact attribute name argparse produces (dashes become underscores) by printing args or checking vars(args).',
          },
          {
            error: `PermissionError: [Errno 13] Permission denied: 'notes.txt'`,
            cause: "The file exists but the current user lacks read permission, or the path actually points to a directory rather than a file.",
            fix: 'Check the file\'s permissions and confirm the path is correct — this is a genuine environment/filesystem issue, not something argparse itself is responsible for.',
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
        'argparse turns a raw sys.argv list into validated, typed, documented arguments — positional (required, by position) and optional (flagged, with defaults).',
        '--help is generated automatically from the help= strings passed to add_argument(), staying perpetually in sync with the actual accepted arguments.',
        'Subparsers (add_subparsers()) structure a tool around multiple distinct actions, each with its own independently scoped arguments and help text.',
        'A well-behaved CLI tool reads from stdin when given "-" as a filename convention, sends errors to stderr (not stdout), and returns meaningful exit codes via sys.exit().',
        'A [project.scripts] entry in pyproject.toml (from the Packaging module) turns a Python function into a plain installable command, exactly how tools like pytest and black work.',
        'A CLI\'s argument validation can double as a genuine safety mechanism in production tooling — rejecting malformed or dangerous invocations before any real action happens.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 45 covers Python best practices — PEP 8, naming conventions, and the conventions that
          separate readable, maintainable code from code that merely works.
        </p>
        <Link href="/learn/python/python-best-practices" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 45 → Python Best Practices — PEP 8, Clean Code
        </Link>
      </div>
    </LearnLayout>
  )
}
