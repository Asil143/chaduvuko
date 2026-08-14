import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is Python? Setup & Your First Program — Python | Chaduvuko',
  description:
    'Why Python is the most in-demand language in the US job market, how it actually runs under the hood, and getting a real development environment set up — no confusion, no skipped steps.',
}

// ── Local components ────────────────────────────────────────────────────────

const C = '#00e676'

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

// ── Page ────────────────────────────────────────────────────────────────────

export default function WhatIsPythonSetup() {
  return (
    <LearnLayout
      title="What is Python? Setup & Your First Program"
      description="Why Python is the most in-demand language in the US job market, how it actually runs, and getting a real environment set up."
      section="Python — Module 01"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Python" />
        <SectionTitle>Why Python Is Worth Your Time</SectionTitle>

        <Para>
          Python was created in 1991 by Guido van Rossum. Today it is the most-used language on
          GitHub, the top requested language on US job boards for data, backend, ML, and automation
          roles, and the first language taught at most American universities. That combination —
          beginner-friendly, and genuinely used in production at massive scale — is rare.
        </Para>

        <Para>
          Instagram serves over 2 billion users on a backend written largely in Python. Spotify uses
          it for backend services and data infrastructure. Dropbox&apos;s core sync engine was originally
          written in Python. Netflix uses it extensively for internal tooling, automation, and data
          pipelines. NASA uses it for mission-critical scientific computing. This is not a beginner
          toy — it is a language that scales from a five-line script to systems running at global scale.
        </Para>

        <Callout type="info">
          <strong>Why Python became the default choice:</strong> It reads close to plain English,
          has a massive standard library, and has the largest package ecosystem of any language
          (PyPI hosts over 500,000 packages). Whatever problem you have — web servers, data analysis,
          machine learning, automation, scripting — there is almost certainly a mature Python library
          for it already.
        </Callout>

        <SubTitle>What you can actually build with it</SubTitle>

        <Para>
          By the end of this track you will be able to write backend services, automate real
          workflows, process and analyse data, build command-line tools, and understand the
          language deeply enough that frameworks like Django, FastAPI, and pandas stop feeling
          like magic. Python is also the default entry point into data engineering, machine
          learning, and AI — every track on this site that touches data assumes this foundation.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — How Python Actually Runs" />
        <SectionTitle>Interpreter vs Compiler — What Actually Happens When You Run Python</SectionTitle>

        <Para>
          Languages like C and Rust are <strong>compiled</strong>: a compiler translates your entire
          source file into machine code — instructions the CPU can run directly — before you ever
          execute it. Python is <strong>interpreted</strong>: there is no separate build step where you
          hand your program to a compiler ahead of time. Instead, a program called the Python
          interpreter reads your source code and executes it, line by line, as the program runs.
        </Para>

        <Para>
          The standard, official Python interpreter is called <strong>CPython</strong> — written in
          C, and what you get when you install Python from python.org. When you run a script,
          CPython does not execute your raw text character by character. It first compiles your
          source code into an intermediate form called <strong>bytecode</strong> — a lower-level,
          platform-independent set of instructions — and then runs that bytecode on the Python
          Virtual Machine (PVM).
        </Para>

        <CodeBox label="What actually happens when you run: python script.py">{`1. CPython reads script.py (your source code, plain text)
2. CPython compiles it into bytecode (an intermediate, lower-level form)
3. The bytecode is cached in a __pycache__ folder as a .pyc file
4. The Python Virtual Machine executes the bytecode, line by line
5. Your program's output appears`}</CodeBox>

        <Para>
          This is why you will occasionally see a <code>__pycache__</code> folder appear next to your
          scripts — that is Python caching compiled bytecode so it does not have to recompile
          unchanged files every time you run them. You never need to touch this folder or the
          <code>.pyc</code> files inside it.
        </Para>

        <Callout type="tip">
          <strong>Why this matters in practice:</strong> Because Python compiles and runs your code
          on the fly rather than ahead of time, it can execute code dynamically — evaluate strings
          as code, redefine functions at runtime, and give you fast iteration without a separate
          build step. The trade-off is raw execution speed: Python is generally slower than compiled
          languages for CPU-heavy work, which is why performance-critical libraries (like NumPy)
          are written with C underneath and simply expose a Python interface on top.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Installing Python" />
        <SectionTitle>Setting Up a Real Python Environment</SectionTitle>

        <Para>
          Download Python from the official source: <strong>python.org/downloads</strong>. Avoid
          installing it from random third-party sites. On macOS and Linux, a version of Python may
          already be present for system use — do not rely on that system copy for your own projects.
          Install your own, current version instead.
        </Para>

        <SubTitle>Verifying your installation</SubTitle>

        <CodeBox label="Terminal">{`python3 --version
# Python 3.12.4

pip3 --version
# pip 24.0 from ... (python 3.12)`}</CodeBox>

        <Callout type="warning">
          <strong>python vs python3:</strong> On macOS and most Linux distributions, the command
          <code> python</code> either does not exist or still points at the legacy Python 2 (which
          reached end-of-life in January 2020 and should never be used for new work). Use
          <code> python3</code> and <code>pip3</code> explicitly until you have configured your
          environment otherwise. On Windows, the official installer sets up <code>python</code> to
          point at Python 3 correctly — but always run <code>python --version</code> after installing
          to confirm which version you actually got.
        </Callout>

        <SubTitle>Choosing an editor</SubTitle>

        <Para>
          <strong>Visual Studio Code</strong> (free) with the official Python extension is the
          standard choice for most developers and what this track assumes you are using. It gives
          you syntax highlighting, autocomplete, inline error detection, and an integrated debugger
          with no paid upgrade required. PyCharm is a strong alternative, especially for larger
          projects, but has a steeper learning curve for a first setup.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Virtual Environments" />
        <SectionTitle>Virtual Environments — Why "Just pip install" Is a Mistake</SectionTitle>

        <Para>
          Every Python project you build will depend on third-party packages. If you install every
          package globally (system-wide), you eventually run into version conflicts: Project A needs
          <code> requests==2.28</code> and Project B needs <code>requests==2.31</code>, but your
          system only has one global copy of each package installed at a time.
        </Para>

        <Para>
          A <strong>virtual environment</strong> solves this by creating an isolated, self-contained
          Python installation for a single project — its own interpreter and its own set of installed
          packages, completely separate from your system Python and from every other project&apos;s
          environment. This is not optional at the professional level: every real Python project you
          will ever work on uses one.
        </Para>

        <CodeBox label="Creating and using a virtual environment">{`# Create a virtual environment named "venv" in the current folder
python3 -m venv venv

# Activate it — macOS / Linux
source venv/bin/activate

# Activate it — Windows (Command Prompt)
venv\\Scripts\\activate.bat

# Your terminal prompt now shows (venv) — you are inside the isolated environment
(venv) $ pip install requests

# Deactivate when you're done
(venv) $ deactivate`}</CodeBox>

        <Callout type="info">
          <strong>What "activating" actually does:</strong> It temporarily changes your shell&apos;s
          <code> PATH</code> so that typing <code>python</code> and <code>pip</code> point at the
          copies inside <code>venv/</code> instead of your system-wide installation. Nothing is
          copied or moved — you are just pointing your terminal session at a different, isolated
          interpreter until you deactivate it.
        </Callout>

        <Para>
          Every project should have its own virtual environment, and the <code>venv/</code> folder
          itself should never be committed to version control — it is regenerated from a
          <code> requirements.txt</code> file, which you will build properly in the Modules &amp;
          Packages lesson later in this track.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Your First Program" />
        <SectionTitle>Writing and Running Your First Script</SectionTitle>

        <Para>
          Create a file named <code>hello.py</code> — the <code>.py</code> extension is how Python
          (and your editor) identifies a file as Python source code.
        </Para>

        <CodeBox label="hello.py">{`print("Hello, World!")
print("Learning Python on Chaduvuko.")`}</CodeBox>

        <Para>
          Run it from your terminal, in the same folder as the file:
        </Para>

        <CodeBox label="Terminal">{`python3 hello.py

# Output:
Hello, World!
Learning Python on Chaduvuko.`}</CodeBox>

        <Para>
          <code>print()</code> is a built-in function that writes text to the terminal — it will be
          the tool you reach for constantly, both for real program output and for checking what a
          value actually is while you are debugging.
        </Para>

        <SubTitle>Script mode vs the interactive REPL</SubTitle>

        <Para>
          What you just did — writing code in a file and running that file — is called{' '}
          <strong>script mode</strong>. Python also has an <strong>interactive mode</strong> (the
          REPL — Read-Eval-Print Loop), which you get by typing <code>python3</code> alone with no
          filename. It lets you type one line of Python at a time and see the result immediately —
          extremely useful for quickly testing a small piece of logic, but not how real programs
          are built or run.
        </Para>

        <CodeBox label="Interactive mode (REPL)">{`$ python3
Python 3.12.4 (main, ...)
>>> print("testing something quickly")
testing something quickly
>>> 7 * 6
42
>>> exit()`}</CodeBox>
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Setup Mistakes That Cost Beginners Hours</SectionTitle>

        {[
          {
            q: 'Installing packages without activating a virtual environment first',
            a: 'This installs the package globally, silently, and it will not be available to a fresh virtual environment for a different project — leading to confusing "it worked yesterday" bugs. Always check your terminal prompt for (venv) before running pip install.',
          },
          {
            q: 'Running "python" and getting Python 2, or a "command not found" error',
            a: 'On macOS/Linux, use python3 and pip3 explicitly instead of python/pip until you have set up an alias or a version manager. Never write new code targeting Python 2 — it is over five years past end-of-life and has no security support.',
          },
          {
            q: 'Committing the venv/ folder to Git',
            a: 'A virtual environment can be tens or hundreds of megabytes and is entirely machine-specific. It should always be excluded via .gitignore and regenerated from requirements.txt by anyone who clones the project.',
          },
          {
            q: 'Editing code in one folder but running python from a different one',
            a: 'File paths in your script (like open("data.csv")) are resolved relative to the folder you run the command FROM, not the folder the script file lives in. Always confirm your terminal\'s current directory with pwd (macOS/Linux) or cd with no arguments (Windows) before running a script that reads files.',
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
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit While Setting Up — And Exactly Why</SectionTitle>

        {[
          {
            error: `zsh: command not found: python`,
            cause: 'macOS (and most Linux distros) do not alias "python" to Python 3 by default — only "python3" is guaranteed to exist.',
            fix: 'Use python3 instead of python for every command in this lesson and throughout this track, until you explicitly configure an alias.',
          },
          {
            error: `ModuleNotFoundError: No module named 'requests'`,
            cause: 'The package is not installed in the Python environment currently active — either you forgot to activate your virtual environment, or you never ran pip install for it in this environment.',
            fix: 'Confirm (venv) is shown in your terminal prompt, then run pip install requests. If it still fails, run "which python3" to confirm you are using the interpreter you think you are.',
          },
          {
            error: `SyntaxError: invalid syntax`,
            cause: 'Almost always a typo — a missing colon after an if/for/def line, mismatched quotes, or a missing closing parenthesis. Python reports the error on or near the line where it got confused, which is sometimes one line AFTER the real mistake.',
            fix: 'Read the line above the one reported, not just the line itself. Check for a missing colon, unclosed bracket, or unmatched quote first — these cause the overwhelming majority of SyntaxErrors for beginners.',
          },
          {
            error: `PermissionError: [Errno 13] Permission denied`,
            cause: 'Attempting to pip install a package into a system-protected location, usually because you ran pip install without an active virtual environment on a machine with a locked-down system Python.',
            fix: 'This is almost always solved by activating a virtual environment first — never fix it by running pip with sudo, which can corrupt your system Python installation.',
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
        'Python is interpreted, not compiled — CPython compiles your source to bytecode and runs it on the Python Virtual Machine, line by line, with no separate build step.',
        'Install Python from the official python.org source. Use python3/pip3 explicitly on macOS and Linux to avoid ambiguity with legacy Python 2.',
        'A virtual environment is a self-contained, isolated Python installation per project. Every real project uses one — this is not optional at the professional level.',
        'Never commit a venv/ folder to Git. It is regenerated from requirements.txt on any machine.',
        '.py is the file extension for Python source code. Script mode (running a file) is how real programs run; the interactive REPL is for quick one-off testing.',
        'print() writes to the terminal and will be your most-used debugging tool for the rest of this track.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 02 covers variables and every core data type in Python — how dynamic typing actually
          works, and how to convert between types without introducing silent bugs.
        </p>
        <Link href="/learn/python/variables-data-types" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 02 → Variables, Data Types & Type Conversion
        </Link>
      </div>
    </LearnLayout>
  )
}
