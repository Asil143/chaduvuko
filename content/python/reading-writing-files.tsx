import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Reading & Writing Files — Python | Chaduvuko',
  description:
    'open(), file modes, the with statement, reading strategies for files of any size, encoding, and pathlib — the portable, modern way to work with paths.',
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

export default function ReadingWritingFiles() {
  return (
    <LearnLayout
      title="Reading & Writing Files"
      description="open(), file modes, the with statement, reading strategies for files of any size, encoding, and pathlib — the modern, portable way to work with paths."
      section="Python — Module 15"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Opening a File" />
        <SectionTitle>open() and the Anatomy of a File Mode</SectionTitle>

        <Para>
          Every interaction with a file on disk starts with the built-in <code>open()</code> function.
          It takes a path and, optionally, a <strong>mode</strong> that tells Python what you intend to
          do with the file — read it, overwrite it, add to it, or something else — and returns a{' '}
          <strong>file object</strong> that you then read from or write through.
        </Para>

        <CodeBox label="The most basic form">{`f = open("notes.txt")
contents = f.read()
f.close()

print(contents)`}</CodeBox>

        <Para>
          That example works, but it has a real problem this module will fix in the next Part. First,
          the modes. Every mode is a one- or two-character string, and getting the wrong one is one of
          the most common ways beginners accidentally destroy data they meant to keep.
        </Para>

        <CodeBox label="The core file modes">{`"r"   # read (default) — file must already exist, or FileNotFoundError is raised
"w"   # write — creates the file if it doesn't exist,
      # and COMPLETELY ERASES the existing contents if it does
"a"   # append — creates the file if it doesn't exist,
      # writes are added to the END of the existing contents
"x"   # exclusive creation — creates the file, but FAILS with FileExistsError
      # if the file already exists (useful for "never overwrite" safety)`}</CodeBox>

        <Callout type="warning">
          <strong>&quot;w&quot; mode erases the file the instant you open it</strong> — not when you
          first write to it. <code>open("report.txt", "w")</code> truncates <code>report.txt</code> to
          zero bytes immediately, even if an exception happens before you write a single character.
          This is the single most common way developers lose data during file work: opening an existing
          file in <code>"w"</code> mode "just to check something," and wiping it out in the process.
        </Callout>

        <SubTitle>The text/binary suffix — t and b</SubTitle>

        <Para>
          Each mode above can optionally take a second character: <code>t</code> for text (the default,
          if you omit it) or <code>b</code> for binary. <code>"r"</code> is shorthand for{' '}
          <code>"rt"</code>; <code>"rb"</code> reads raw bytes instead of decoded text. Part 06 below
          covers exactly when you need binary mode — for now, know that the suffix exists and that mixing
          it up (reading an image in text mode, for example) is a fast way to get a confusing error.
        </Para>

        <CodeBox label="Mode combinations you'll actually use">{`open("data.txt", "r")     # read text            (most common)
open("data.txt", "w")     # write text, truncating
open("data.txt", "a")     # append text
open("photo.jpg", "rb")   # read binary
open("photo.jpg", "wb")   # write binary`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The with Statement" />
        <SectionTitle>with open(...) — Why Manual close() Is a Real Liability</SectionTitle>

        <Para>
          Every file you open holds a real operating-system resource — a file descriptor — that must be
          released with <code>.close()</code> when you are done. The manual version from Part 01 looks
          fine until something goes wrong between <code>open()</code> and <code>close()</code>.
        </Para>

        <CodeBox label="The problem with manual close()">{`f = open("report.txt", "w")
f.write(generate_report())   # if this raises an exception...
f.close()                    # ...this line never runs. The file is left open.`}</CodeBox>

        <Para>
          A single leaked file handle is harmless. Thousands of them, accumulating over the life of a
          long-running process — a web server, a data pipeline that runs for hours — will eventually
          exhaust the operating system&apos;s limit on open file descriptors and start raising{' '}
          <code>OSError: Too many open files</code>, usually far away from the code that actually caused
          it, which makes it a genuinely painful bug to trace.
        </Para>

        <Para>
          Python&apos;s fix is the <code>with</code> statement, using files as a <strong>context
          manager</strong>. It guarantees the file is closed when the block ends — whether it ends
          normally or because an exception was raised partway through.
        </Para>

        <CodeBox label="with open(...) as f: — the idiomatic pattern">{`with open("report.txt", "w") as f:
    f.write(generate_report())

# f.close() has already been called automatically here,
# even if generate_report() raised an exception`}</CodeBox>

        <Callout type="tip">
          <strong>Always use with open(...) for files.</strong> This is not a stylistic preference — it
          is the expected, idiomatic pattern in essentially every professional Python codebase, and code
          review will flag manual <code>open()</code>/<code>close()</code> pairs almost every time. The
          general mechanism behind <code>with</code> — a <strong>context manager</strong>, built on two
          special methods called <code>__enter__</code> and <code>__exit__</code> — is covered in full
          depth in the Context Managers module later in this track; files are simply the first, and most
          common, context manager you will use.
        </Callout>

        <SubTitle>Opening multiple files in one with statement</SubTitle>

        <Para>
          You can open more than one file in a single <code>with</code> statement, separated by commas —
          genuinely useful for a common pattern like reading from one file and writing a transformed
          version to another.
        </Para>

        <CodeBox label="Reading from one file, writing to another, in one block">{`with open("input.txt") as src, open("output.txt", "w") as dst:
    for line in src:
        dst.write(line.upper())

# both files are guaranteed closed here, even if the loop raises partway through`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Reading Strategies" />
        <SectionTitle>read(), readline(), readlines() — and Why Iteration Beats All Three</SectionTitle>

        <Para>
          A file object gives you several different ways to pull data out of it, and they are not
          interchangeable — each has a real trade-off, and picking the wrong one on a large file is a
          common cause of a script that "works fine locally" and then runs out of memory in production.
        </Para>

        <CodeBox label="The four ways to read a file">{`with open("log.txt") as f:
    whole_thing = f.read()        # one giant string — the ENTIRE file, all at once

with open("log.txt") as f:
    one_line = f.readline()       # a single line, including its trailing "\\n"

with open("log.txt") as f:
    all_lines = f.readlines()     # a list of every line — the whole file, as a list

with open("log.txt") as f:
    for line in f:                # iterate the file object directly, one line at a time
        process(line)`}</CodeBox>

        <Para>
          <code>.read()</code> and <code>.readlines()</code> both load the <strong>entire file into
          memory</strong> before you can do anything with it — <code>.read()</code> as one string,{' '}
          <code>.readlines()</code> as a list of strings. For a 4KB config file, that is completely fine.
          For a 40GB server log, it will exhaust available memory and crash the process before a single
          line has been processed.
        </Para>

        <Para>
          Iterating the file object directly (<code>for line in f:</code>) reads <strong>one line at a
          time</strong>, on demand, and never holds more than the current line in memory regardless of
          how large the file is. This is the preferred pattern for anything that might be large, and it
          is genuinely no more verbose than the alternatives — there is rarely a good reason to reach for{' '}
          <code>.readlines()</code> over direct iteration.
        </Para>

        <Callout type="tip">
          <strong>Default to direct iteration.</strong> <code>for line in f:</code> is memory-safe
          regardless of file size, reads naturally, and is what you will see in essentially all
          production Python code that processes files line by line. Reach for <code>.read()</code> only
          when you genuinely need the whole file as one string (e.g. passing it to{' '}
          <code>json.loads()</code>, covered in the next module) — and only when you are confident the
          file is small enough for that to be safe.
        </Callout>

        <SubTitle>Every line keeps its trailing newline</SubTitle>

        <Para>
          Whichever method you use, each line you get back includes its trailing <code>"\n"</code>{' '}
          character (except possibly the very last line, if the file doesn&apos;t end with one). This
          trips up almost everyone the first time — printing a line you read from a file produces an
          extra blank line, because <code>print()</code> already adds its own newline.
        </Para>

        <CodeBox label="Strip the newline explicitly when you don't want it">{`with open("names.txt") as f:
    for line in f:
        name = line.strip()   # removes the trailing "\\n" (and any surrounding whitespace)
        print(f"Hello, {name}")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Writing and Appending" />
        <SectionTitle>write(), writelines(), and the Append Mode</SectionTitle>

        <Para>
          Writing mirrors reading: <code>.write()</code> takes a single string, and{' '}
          <code>.writelines()</code> takes an iterable of strings, writing each one in sequence.
        </Para>

        <CodeBox label="Writing text to a file">{`lines = ["First line\\n", "Second line\\n", "Third line\\n"]

with open("output.txt", "w") as f:
    f.writelines(lines)

# equivalent, written manually:
with open("output.txt", "w") as f:
    for line in lines:
        f.write(line)`}</CodeBox>

        <Callout type="warning">
          <strong>writelines() does not add newlines for you.</strong> Despite the name, it behaves like
          calling <code>.write()</code> in a loop — if your strings don&apos;t already end in{' '}
          <code>"\n"</code>, they will be written back-to-back with no separation at all. This is a
          genuinely common source of confusion, since the name suggests it works line by line the way{' '}
          <code>print()</code> does with a list.
        </Callout>

        <SubTitle>&quot;w&quot; truncates, &quot;a&quot; appends — pick deliberately</SubTitle>

        <Para>
          The distinction from Part 01 matters most here. Opening a log file in <code>"w"</code> mode
          every time your program runs will silently discard every previous run&apos;s log the moment it
          starts — a genuinely common, genuinely damaging mistake for exactly the kind of file you least
          want to lose.
        </Para>

        <CodeBox label="Append mode — the correct choice for a growing log file">{`import datetime

def log_event(message):
    with open("app.log", "a", encoding="utf-8") as f:
        timestamp = datetime.datetime.now().isoformat()
        f.write(f"{timestamp} — {message}\\n")

log_event("Server started")
log_event("Received request from 10.0.0.4")
# Both lines accumulate in app.log across every call — nothing is overwritten.`}</CodeBox>

        <Para>
          A useful mental rule: if the file is meant to represent a single, current snapshot (a
          generated report, a rewritten config), use <code>"w"</code>. If the file is meant to
          accumulate a history over time (a log, an audit trail), use <code>"a"</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Encoding" />
        <SectionTitle>Always Pass encoding=&quot;utf-8&quot; Explicitly</SectionTitle>

        <Para>
          You met encoding in depth in the Strings module — the process of converting Python&apos;s
          internal Unicode text into raw bytes (and back). File I/O is exactly where that lesson stops
          being theoretical. Every text-mode <code>open()</code> call performs an encode or decode step
          behind the scenes, and if you don&apos;t say which encoding to use, Python falls back to
          whatever the operating system considers its default.
        </Para>

        <CodeBox label="The version that works — until it doesn't">{`# No encoding specified — relies on the OS default
with open("customers.csv") as f:
    data = f.read()

# On the developer's Mac, this default happens to be UTF-8. Fine, locally.
# On a Windows machine — or certain Linux server configurations — the
# default can be something else entirely, and a name like "José" or "Renée"
# in the file will raise a UnicodeDecodeError, or worse, decode SILENTLY WRONG.`}</CodeBox>

        <CodeBox label="The fix — say exactly what encoding you mean, every time">{`with open("customers.csv", encoding="utf-8") as f:
    data = f.read()

with open("report.txt", "w", encoding="utf-8") as f:
    f.write(report_text)`}</CodeBox>

        <Callout type="warning">
          <strong>This is not a defensive habit — it is a correctness requirement.</strong> Exactly as
          covered in the Strings module&apos;s Real World example, code that omits{' '}
          <code>encoding=&quot;utf-8&quot;</code> tends to pass every test on the author&apos;s own
          machine and then fail — or worse, silently corrupt data — the moment it runs somewhere with a
          different default. Treat a missing <code>encoding</code> argument on <code>open()</code> as a
          bug, not an oversight, every single time you see one in review.
        </Callout>

        <Para>
          One exception: binary mode (<code>"rb"</code>, <code>"wb"</code>) never takes an{' '}
          <code>encoding</code> argument — there is no text decoding step involved at all, since you are
          reading and writing raw bytes directly. Passing <code>encoding=</code> alongside a binary mode
          raises a <code>ValueError</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Binary Mode" />
        <SectionTitle>When You Actually Need &quot;rb&quot; and &quot;wb&quot;</SectionTitle>

        <Para>
          Text mode is right for anything meant to be read as human-readable characters — <code>.txt</code>,{' '}
          <code>.csv</code>, <code>.json</code>, source code. Binary mode is for files whose content is
          not text at all: images, PDFs, compiled executables, audio, or any format with its own internal
          byte-level structure that Python should not try to interpret as characters.
        </Para>

        <CodeBox label="Copying an image — binary mode, no encoding involved">{`with open("photo.jpg", "rb") as src:
    image_bytes = src.read()

with open("photo_copy.jpg", "wb") as dst:
    dst.write(image_bytes)

print(type(image_bytes))   # <class 'bytes'> — not str`}</CodeBox>

        <Para>
          Notice the type: reading in binary mode returns a <code>bytes</code> object, not a{' '}
          <code>str</code>. This is the same <code>bytes</code> type from the Strings module — raw byte
          values with no assumption of what characters, if any, they represent. Trying to open a JPEG in
          text mode will either raise a <code>UnicodeDecodeError</code> almost immediately (since most of
          its bytes are not valid UTF-8) or, worse, silently corrupt the file if it happens not to error.
        </Para>

        <Callout type="info">
          A simple rule of thumb: if you would open the file in a plain text editor and expect to read
          it, use text mode. If you would open it in a specialised application (an image viewer, a media
          player, a PDF reader), use binary mode. When genuinely unsure, binary mode is the safer default
          — you can always decode bytes to text deliberately later, but you cannot safely reconstruct
          binary data that text mode has already mangled.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — pathlib" />
        <SectionTitle>pathlib.Path — The Modern, Portable Way to Work With Paths</SectionTitle>

        <Para>
          Every example so far has passed a plain string to <code>open()</code>, and that is completely
          valid Python. But real projects juggle a lot of path logic — joining directories, checking
          extensions, building paths that need to work identically on Windows, macOS, and Linux — and
          hand-building those with string concatenation is fragile.
        </Para>

        <CodeBox label="The fragile, string-based way">{`folder = "data"
filename = "report.csv"
path = folder + "/" + filename   # breaks on Windows, which uses backslashes`}</CodeBox>

        <Para>
          The standard-library <code>pathlib</code> module, and its central <code>Path</code> class,
          fixes this by representing a filesystem path as a proper object rather than a plain string —
          and it is genuinely the modern, idiomatic way to work with paths in Python, not just an
          alternative worth knowing about.
        </Para>

        <CodeBox label="Building paths with pathlib">{`from pathlib import Path

folder = Path("data")
path = folder / "report.csv"     # the / operator joins path segments — reads naturally,
                                  # and produces the correct separator for the current OS

print(path)          # data/report.csv   (on macOS/Linux)
                      # data\\report.csv   (on Windows) — same code, correct on both`}</CodeBox>

        <SubTitle>The Path attributes and methods you'll use constantly</SubTitle>

        <CodeBox label="Inspecting a path without touching the filesystem">{`from pathlib import Path

p = Path("data/reports/q3_summary.csv")

print(p.name)      # "q3_summary.csv"      — the final component
print(p.stem)      # "q3_summary"          — filename without the extension
print(p.suffix)    # ".csv"                — just the extension
print(p.parent)    # "data/reports"        — the containing directory
print(p.parts)     # ("data", "reports", "q3_summary.csv")`}</CodeBox>

        <SubTitle>Path objects work directly with open() — and have their own shortcuts</SubTitle>

        <CodeBox label="Path objects are drop-in compatible with open(), plus convenience methods">{`from pathlib import Path

p = Path("notes.txt")

# Path objects work directly wherever a path string would:
with open(p, encoding="utf-8") as f:
    contents = f.read()

# Or skip open() entirely for simple cases:
contents = p.read_text(encoding="utf-8")
p.write_text("New contents\\n", encoding="utf-8")`}</CodeBox>

        <Callout type="tip">
          <strong>Prefer pathlib.Path over raw strings for any new code that touches the filesystem.</strong>{' '}
          It reads more clearly, handles cross-platform separators correctly without you thinking about
          it, and bundles path inspection directly onto the object instead of requiring separate{' '}
          <code>os.path</code> function calls. You will still see plain string paths in older code and
          in simple scripts — both are valid — but <code>pathlib</code> is what modern, professional
          Python code reaches for by default.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Existence Checks and Directories" />
        <SectionTitle>Checking Whether a File Exists, and Creating Directories Safely</SectionTitle>

        <Para>
          Before reading a file, it is often necessary to check whether it exists at all — attempting to
          open a nonexistent file in read mode raises <code>FileNotFoundError</code>, which you either
          need to guard against or handle explicitly.
        </Para>

        <CodeBox label="Checking existence with pathlib">{`from pathlib import Path

config = Path("config.json")

if config.exists():
    settings = config.read_text(encoding="utf-8")
else:
    settings = "{}"   # fall back to an empty config

print(config.is_file())    # True if it exists AND is a regular file (not a directory)
print(config.is_dir())     # True if it exists AND is a directory`}</CodeBox>

        <SubTitle>Creating directories — and doing it without race conditions</SubTitle>

        <Para>
          Writing to <code>reports/2026/august/summary.csv</code> fails with{' '}
          <code>FileNotFoundError</code> if the <code>reports/2026/august/</code> directory chain
          doesn&apos;t already exist — <code>open()</code> never creates intermediate directories for
          you. <code>Path.mkdir()</code> handles this, with two keyword arguments worth knowing well.
        </Para>

        <CodeBox label="mkdir() with the two arguments that matter">{`from pathlib import Path

output_dir = Path("reports/2026/august")

output_dir.mkdir(parents=True, exist_ok=True)
# parents=True   — create any missing intermediate directories (reports/, reports/2026/)
#                  instead of raising FileNotFoundError if they don't exist yet
# exist_ok=True  — don't raise FileExistsError if the directory is already there;
#                  just treat it as success either way

(output_dir / "summary.csv").write_text("date,total\\n", encoding="utf-8")`}</CodeBox>

        <Callout type="warning">
          <strong>Checking existence first, then acting, is not perfectly safe.</strong> Between an{' '}
          <code>if path.exists():</code> check and the code that acts on it, another process could
          theoretically create, delete, or modify that exact path — a narrow window, but a real one in
          concurrent or multi-process systems. For directory creation, <code>exist_ok=True</code> avoids
          the problem entirely by making "already exists" a non-error outcome rather than something you
          check for beforehand. For files you must not overwrite, the <code>&quot;x&quot;</code> mode
          from Part 01 is the safer tool — it fails atomically if the file already exists, rather than
          leaving a gap between checking and acting.
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
        <SectionTitle>The Nightly Export Job That Quietly Erased Itself — Denver, CO</SectionTitle>

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
            Scenario — Property management platform, Denver · On-call incident
          </div>

          <Para>
            A property management platform runs a nightly job that appends the day&apos;s completed
            maintenance tickets to a running export file, <code>ticket_history.csv</code>, which a
            downstream analytics team pulls into a dashboard every morning. One Tuesday, the analytics
            team reports the dashboard shows only a single day of data — six months of ticket history
            has vanished.
          </Para>

          <SubSubTitle>What the on-call engineer finds</SubSubTitle>

          <Para>
            A recent refactor had touched the export function. The original code opened the file in{' '}
            <code>&quot;a&quot;</code> mode, as it always had. During cleanup, someone had renamed a
            nearby variable and, in the process, accidentally changed the mode string too — a one-
            character edit, <code>&quot;a&quot;</code> to <code>&quot;w&quot;</code>, that nobody caught
            in review because the surrounding logic looked identical.
          </Para>

          <CodeBox label="The one-character change that erased six months of history">{`def export_tickets(tickets):
    with open("ticket_history.csv", "w", encoding="utf-8") as f:   # was "a"
        for ticket in tickets:
            f.write(f"{ticket.id},{ticket.status},{ticket.closed_at}\\n")

# Every night this ran, it truncated the file to zero bytes first (Part 01),
# then wrote only THAT NIGHT's tickets — silently discarding everything before it.`}</CodeBox>

          <SubSubTitle>Why it went unnoticed for so long</SubSubTitle>

          <Para>
            The job never raised an exception. <code>&quot;w&quot; mode</code> is completely legal, the
            write succeeded every single night, and the file existed with valid data in it — just one
            day&apos;s worth instead of the accumulating history everyone assumed was there. Nothing
            about the failure looked like a failure. This is exactly the danger flagged in Part 01 and
            Part 04: <code>&quot;w&quot;</code> versus <code>&quot;a&quot;</code> is a silent,
            successful-looking choice with two completely different outcomes.
          </Para>

          <Para>
            The team&apos;s fix was two-fold: restore <code>&quot;a&quot;</code> mode, and add a
            regression test asserting the exported file&apos;s line count only ever grows between runs —
            turning a silent data-loss bug into a loud, immediate test failure the next time it happens.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About File I/O</SectionTitle>

        {[
          {
            wrong: '"Calling .close() manually is just as safe as using with"',
            right: 'It is only as safe as the code between open() and close() being guaranteed never to raise an exception — which almost no real code can promise. with guarantees the file is closed even when an exception occurs partway through, which manual close() cannot, since the exception skips straight past it.',
          },
          {
            wrong: '"readlines() is the normal way to process a file line by line"',
            right: 'readlines() loads the ENTIRE file into memory as a list before you process a single line. Direct iteration (for line in f:) reads one line at a time and uses a constant, small amount of memory regardless of file size — the preferred pattern for anything that might be large, and no more verbose to write.',
          },
          {
            wrong: '"Not specifying an encoding just uses UTF-8 by default anyway"',
            right: 'Python uses the operating system\'s default encoding when none is specified, which varies by platform and even by machine configuration. It is not guaranteed to be UTF-8. Always pass encoding="utf-8" explicitly, exactly as covered in the Strings module.',
          },
          {
            wrong: '"pathlib is just a nicer-looking alternative to string paths — functionally the same"',
            right: 'Beyond readability, pathlib handles cross-platform path separators correctly without any extra code, and bundles inspection (.name, .suffix, .parent) and filesystem operations (.exists(), .mkdir(), .read_text()) directly onto the path object — a meaningful, not just cosmetic, upgrade over manual string concatenation with os.path functions.',
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
            q: 'Why is with open(...) as f: preferred over calling open() and close() manually?',
            a: 'with uses the file object as a context manager, guaranteeing that .close() is called when the block exits — whether it exits normally or because an exception was raised inside it. Manual open()/close() pairs leave the file open if any exception occurs between the two calls, which in a long-running process can eventually exhaust the operating system\'s limit on open file descriptors.',
          },
          {
            q: 'What is the difference between "w" and "a" mode, and why does that difference matter?',
            a: '"w" truncates the file to zero bytes the instant it is opened, discarding any existing content, and then writes fresh data. "a" opens the file (creating it if needed) and adds new writes to the end of whatever is already there. Confusing the two is a common, high-impact bug: opening a file that should accumulate a history — like a log — in "w" mode silently discards everything written in previous runs.',
          },
          {
            q: 'Why is iterating a file object directly (for line in f:) usually preferred over f.readlines()?',
            a: 'readlines() reads the entire file into memory at once, as a list of every line. Direct iteration reads and yields one line at a time, using a small, constant amount of memory no matter how large the file is. For anything that might be large — logs, exports, datasets — direct iteration avoids a memory blowup that readlines() would risk.',
          },
          {
            q: 'Why should you always pass encoding="utf-8" explicitly to open()?',
            a: 'Without an explicit encoding, Python falls back to the operating system\'s default text encoding, which is not guaranteed to be UTF-8 and can differ between a developer\'s machine and a production server. Code that omits it can pass every test locally and then fail — or silently produce corrupted text — the moment it runs in a different environment. Passing encoding="utf-8" explicitly removes that dependency entirely.',
          },
          {
            q: 'What does Path.mkdir(parents=True, exist_ok=True) do, and why are both arguments usually needed together?',
            a: 'parents=True creates any missing intermediate directories in the path, instead of raising FileNotFoundError if a parent directory doesn\'t exist yet. exist_ok=True prevents FileExistsError if the target directory is already there, treating that as success rather than an error. Together, they make directory creation idempotent — safe to call every time, regardless of whether the directory chain already exists in whole, in part, or not at all.',
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
        <SectionTitle>File I/O Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Opening a file in "w" mode when "a" was intended',
            a: 'As shown in the Real World example above, this silently truncates existing content on every run. If a file is meant to accumulate data over time, use "a" — and consider adding a test that catches unexpected shrinkage.',
          },
          {
            q: 'Forgetting that lines read from a file include a trailing "\\n"',
            a: 'Printing a line read from a file often produces an unexpected extra blank line, since print() adds its own newline on top of the one already in the string. Call .strip() (or .rstrip("\\n")) on lines you don\'t want the trailing newline on.',
          },
          {
            q: 'Using .readlines() or .read() on files that might be very large',
            a: 'Both load the entire file into memory before you can process anything. For files of unknown or potentially large size, iterate the file object directly instead — it processes one line at a time with constant memory use.',
          },
          {
            q: 'Building paths with string concatenation instead of pathlib',
            a: '"folder" + "/" + "file.txt" produces the wrong separator on Windows and is fragile in general. Use Path("folder") / "file.txt" instead — it produces the correct separator for whatever operating system the code runs on.',
          },
          {
            q: 'Assuming a directory exists before writing into it',
            a: 'open("reports/2026/summary.csv", "w") raises FileNotFoundError if the reports/2026/ directory chain doesn\'t already exist — open() never creates missing directories. Call Path(...).mkdir(parents=True, exist_ok=True) first.',
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
        <SectionTitle>Errors You Will Hit With File I/O — And Exactly Why</SectionTitle>

        {[
          {
            error: `FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'`,
            cause: 'Attempting to open a file in read mode ("r", the default) that does not exist at the given path — either a typo in the path, a wrong working directory, or the file genuinely hasn\'t been created yet.',
            fix: 'Double-check the path, and consider whether it should be relative to the script\'s own location (Path(__file__).parent / "data.csv") rather than whatever directory the script happens to be run from. Use path.exists() to check before opening if a missing file is a normal, expected case.',
          },
          {
            error: `PermissionError: [Errno 13] Permission denied: '/etc/config.yaml'`,
            cause: 'The current user does not have the required operating-system permission to read or write the target file — commonly a protected system path, or a file owned by a different user.',
            fix: 'Write to a location the current user actually has permission for (commonly the current working directory, or a directory created specifically for the program\'s output), or run with the necessary permissions if the target location is genuinely correct.',
          },
          {
            error: `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte`,
            cause: 'Opening a binary file (like an image) in text mode, or opening a text file that is actually encoded in something other than UTF-8, without specifying the correct encoding.',
            fix: 'If the file is genuinely binary, open it with "rb" instead of "r". If it\'s text in a non-UTF-8 encoding, pass the correct encoding explicitly: open(path, encoding="latin-1"), for example.',
          },
          {
            error: `FileExistsError: [Errno 17] File exists: 'output.csv'`,
            cause: 'Opening a file with mode "x" (exclusive creation) when a file already exists at that path — "x" is designed to fail exactly in this situation, as a safety mechanism against accidental overwrites.',
            fix: 'If overwriting is intended, use "w" instead. If it genuinely should not be overwritten, catch the FileExistsError and choose a different filename, or prompt before proceeding.',
          },
          {
            error: `ValueError: binary mode doesn't take an encoding argument`,
            cause: 'Passing encoding="utf-8" (or any encoding) alongside a binary mode like "rb" or "wb". Binary mode reads and writes raw bytes with no text decoding step, so an encoding argument has nothing to apply to.',
            fix: 'Remove the encoding argument for binary-mode opens, or switch to text mode ("r"/"w") if you actually want decoded text and should be specifying an encoding.',
          },
          {
            error: `OSError: [Errno 24] Too many open files`,
            cause: 'A long-running process has opened many files without closing them — almost always caused by using open() without with, so files stay open until the process eventually runs out of available file descriptors.',
            fix: 'Audit every open() call and ensure each one uses a with statement (or explicit try/finally) so files are guaranteed to close, even on the paths where an exception occurs.',
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
        'open() takes a mode: "r" (read, default), "w" (write, truncates existing content), "a" (append), "x" (exclusive create). Add "b" for binary.',
        '"w" mode erases the file the instant it is opened — not when you first write. Confusing "w" with "a" is one of the most damaging file bugs in real production code.',
        'Always use with open(...) as f: — it guarantees the file is closed even if an exception is raised inside the block. Manual close() does not.',
        'Iterate a file object directly (for line in f:) rather than using .readlines() — it processes one line at a time with constant memory use, regardless of file size.',
        'Every line read from a file keeps its trailing "\\n" — call .strip() if you don\'t want it.',
        'Always pass encoding="utf-8" explicitly to open() for text files — the operating system default is not guaranteed to be UTF-8, and this is a common cause of code that works locally and fails in production.',
        'Binary mode ("rb"/"wb") reads and writes raw bytes and never takes an encoding argument — use it for images, PDFs, and other non-text formats.',
        'Prefer pathlib.Path over raw string paths — the / operator joins paths correctly across operating systems, and Path bundles both inspection (.name, .suffix, .parent) and filesystem operations (.exists(), .mkdir(), .read_text()) directly on the object.',
        'Path("dir").mkdir(parents=True, exist_ok=True) safely creates a full directory chain, and is safe to call whether or not any part of it already exists.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 16 builds directly on everything in this module — the csv and json modules for reading
          and writing the two formats every real Python script eventually touches, including the gotchas
          that break real data pipelines.
        </p>
        <Link href="/learn/python/csv-json" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 16 → Working with CSV and JSON
        </Link>
      </div>
    </LearnLayout>
  )
}
