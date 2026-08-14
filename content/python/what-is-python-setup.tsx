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

// ── Page ────────────────────────────────────────────────────────────────────

export default function WhatIsPythonSetup() {
  return (
    <LearnLayout
      title="What is Python? Setup & Your First Program"
      description="Why Python is the most in-demand language in the US job market, how it actually runs, and getting a real environment set up."
      section="Python — Module 01"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Python" />
        <SectionTitle>Why Python Is Worth Your Time</SectionTitle>

        <Para>
          Python was created in 1991 by Guido van Rossum, a Dutch programmer who wanted a language
          that was easier to read than C and more practical than the academic languages of the time.
          The name has nothing to do with snakes — van Rossum was reading scripts from the British
          comedy group Monty Python&apos;s Flying Circus while designing it. Over three decades later,
          Python is the most-used language on GitHub, the top requested language on US job boards
          for data, backend, ML, and automation roles, and the first language taught at most American
          universities, including MIT&apos;s introductory computer science course. That combination —
          genuinely beginner-friendly, and genuinely used in production at massive scale — is rare.
          Most beginner-friendly languages stay beginner languages. Python did not.
        </Para>

        <Para>
          Instagram serves over 2 billion users on a backend written largely in Python — and
          famously runs one of the largest deployments of the Django web framework in the world.
          Spotify uses Python extensively for backend services and its recommendation data
          infrastructure. Dropbox&apos;s core sync engine was originally written in Python, and Dropbox
          has employed Guido van Rossum himself. Netflix uses Python for internal tooling,
          chaos-engineering automation, and large parts of its data pipeline stack. NASA&apos;s Jet
          Propulsion Laboratory uses Python for mission-critical scientific computing, including
          software involved in Mars rover operations. This is not a beginner toy — it is a language
          that scales from a five-line script to systems running at global scale.
        </Para>

        <Callout type="info">
          <strong>Why Python became the default choice:</strong> It reads close to plain English, has
          a massive standard library included with every installation, and has the largest
          third-party package ecosystem of any language — PyPI (the Python Package Index) hosts over
          500,000 packages. Whatever problem you have — web servers, data analysis, machine learning,
          automation, scientific computing, scripting — there is almost certainly a mature,
          battle-tested Python library for it already, maintained by people who have already solved
          the hard parts.
        </Callout>

        <SubTitle>What you can actually build with it</SubTitle>

        <Para>
          By the end of this track you will be able to write backend services, automate real
          workflows, process and analyse data, build command-line tools, and understand the language
          deeply enough that frameworks like Django, FastAPI, and pandas stop feeling like magic and
          start feeling like Python you already understand, wrapped in a convenient package. Python is
          also the default entry point into data engineering, machine learning, and AI — every track
          on this site that touches data assumes this foundation, and the Python for Data Engineering
          lesson inside the Data Engineering track builds directly on everything you learn here.
        </Para>

        <SubTitle>Where Python is a poor fit</SubTitle>

        <Para>
          Honesty matters more than hype. Python is not the right choice for every problem, and
          knowing where it struggles is part of using it well. It is a poor fit for mobile app
          development (Swift/Kotlin dominate there), for building a low-latency game engine (C++
          dominates there), and for CPU-bound number-crunching written in pure Python without
          specialised libraries — Python itself is meaningfully slower than compiled languages for
          raw computation. In practice, this last weakness is rarely a real blocker: libraries like
          NumPy and pandas (which you will meet later in this track) do their heavy lifting in
          C underneath, so Python code calling them runs at near-C speed while you write ordinary
          Python.
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
          execute it. Once compiled, you distribute the resulting binary; the source code is not
          needed to run it. Python is <strong>interpreted</strong>: there is no separate build step
          where you hand your program to a compiler ahead of time. Instead, a program called the
          Python interpreter reads your source code and executes it as the program runs.
        </Para>

        <Para>
          The standard, official Python interpreter is called <strong>CPython</strong> — written in
          C, and what you get when you install Python from python.org. When you run a script, CPython
          does not execute your raw text character by character. It first compiles your source code
          into an intermediate form called <strong>bytecode</strong> — a lower-level, platform-
          independent set of instructions, not the same as machine code — and then runs that bytecode
          on the Python Virtual Machine (PVM), a program that reads bytecode instructions one at a
          time and carries them out.
        </Para>

        <CodeBox label="What actually happens when you run: python3 script.py">{`1. CPython reads script.py (your source code, plain text)
2. CPython compiles it into bytecode (an intermediate, lower-level form)
3. The bytecode is cached in a __pycache__ folder as a .pyc file
4. The Python Virtual Machine executes the bytecode, instruction by instruction
5. Your program's output appears`}</CodeBox>

        <Para>
          This is why you will occasionally see a <code>__pycache__</code> folder appear next to your
          scripts — that is Python caching compiled bytecode so it does not have to recompile
          unchanged files every time you run them. You never need to touch this folder or the{' '}
          <code>.pyc</code> files inside it, and it is standard practice to add{' '}
          <code>__pycache__/</code> to a project&apos;s <code>.gitignore</code> file.
        </Para>

        <SubTitle>CPython is not the only implementation</SubTitle>

        <Para>
          "Python" is a language specification; CPython is the reference implementation almost
          everyone uses. Other implementations exist for specific purposes: <strong>PyPy</strong>{' '}
          uses just-in-time (JIT) compilation to run pure-Python code significantly faster than
          CPython for certain workloads; <strong>Jython</strong> runs Python on the Java Virtual
          Machine; <strong>IronPython</strong> targets the .NET runtime. Unless you have a specific,
          identified performance problem, CPython is the correct choice, and it is what this entire
          track assumes.
        </Para>

        <Callout type="tip">
          <strong>Why this matters in practice:</strong> Because Python compiles and runs your code on
          the fly rather than ahead of time, it can execute code dynamically — evaluate strings as
          code, redefine functions at runtime, and give you fast iteration without a separate build
          step. The trade-off is raw execution speed: Python is generally slower than compiled
          languages for CPU-heavy work, which is exactly why performance-critical libraries (like
          NumPy) are written with C underneath and simply expose a Python interface on top — you get
          Python&apos;s ergonomics with C&apos;s speed for the parts that need it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Python's Versions" />
        <SectionTitle>Python 2 vs Python 3 — A Brief, Important History</SectionTitle>

        <Para>
          You will occasionally encounter references to "Python 2" in older tutorials, Stack Overflow
          answers, and legacy codebases. It is worth understanding why this matters. Python 2 was
          released in 2000. Python 3, released in 2008, intentionally broke backward compatibility to
          fix long-standing design flaws — most notably how it handled text versus raw bytes, a
          distinction that matters enormously once you work with real-world data containing non-English
          characters, emoji, or binary files.
        </Para>

        <Para>
          The two versions coexisted for an unusually long time because migrating large codebases was
          expensive. Python 2 officially reached end-of-life on January 1, 2020 — it no longer
          receives security patches, and no serious project should be started in it. Every version of
          Python this track uses is Python 3. When you see <code>python3</code> and{' '}
          <code>pip3</code> used explicitly throughout this track instead of the shorter{' '}
          <code>python</code>/<code>pip</code>, this history is exactly why.
        </Para>

        <SubTitle>How Python is versioned</SubTitle>

        <Para>
          Python follows a <code>major.minor.patch</code> versioning scheme — for example, Python
          3.12.4 means major version 3, minor version 12, patch 4. A new minor version ships roughly
          once a year, typically adding new language features (like the <code>match</code>/
          <code>case</code> statement added in 3.10, which you will use in the Control Flow module).
          Patch releases are bug fixes and security updates only. For learning and for new projects,
          always use the latest stable minor version available.
        </Para>

        <Callout type="info">
          <strong>Managing multiple Python versions:</strong> As you work on more projects, you will
          eventually need different Python versions installed side by side — one legacy project
          pinned to 3.9, a new one using 3.12&apos;s latest features. Tools like <code>pyenv</code>{' '}
          (macOS/Linux) exist specifically for this — they let you install multiple Python versions
          and switch between them per project. You will not need this on day one, but it is worth
          knowing the tool&apos;s name exists before you hit the problem it solves.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Installing Python" />
        <SectionTitle>Setting Up a Real Python Environment</SectionTitle>

        <Para>
          Download Python from the official source: <strong>python.org/downloads</strong>. Avoid
          installing it from random third-party sites. On macOS and Linux, a version of Python may
          already be present for system use — operating system components sometimes depend on it. Do
          not rely on that system copy for your own projects, and never uninstall it; install your
          own, current version alongside it instead.
        </Para>

        <SubTitle>Verifying your installation</SubTitle>

        <CodeBox label="Terminal">{`python3 --version
# Python 3.12.4

pip3 --version
# pip 24.0 from ... (python 3.12)`}</CodeBox>

        <Callout type="warning">
          <strong>python vs python3:</strong> On macOS and most Linux distributions, the command{' '}
          <code>python</code> either does not exist or still points at the legacy Python 2. Use{' '}
          <code>python3</code> and <code>pip3</code> explicitly until you have deliberately configured
          your environment otherwise. On Windows, the official installer sets up <code>python</code>{' '}
          to point at Python 3 correctly — but always run <code>python --version</code> after
          installing to confirm which version you actually got, and check the box labelled
          "Add python.exe to PATH" during installation, or none of your commands will work from the
          terminal afterward.
        </Callout>

        <SubTitle>What PATH actually is, and why installers ask about it</SubTitle>

        <Para>
          When you type <code>python3</code> in a terminal, your operating system needs to know
          exactly which program to run and where it lives on disk. <strong>PATH</strong> is an
          environment variable — a list of folder locations the operating system searches, in order,
          whenever you type a command name instead of a full file path. Installing Python "adds it to
          PATH" by placing the Python executable in one of these folders (or by adding Python&apos;s
          install folder to the list). If this step is skipped or fails, typing <code>python3</code>{' '}
          produces a "command not found" error even though Python is correctly installed on the
          machine — the shell simply does not know where to look.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Virtual Environments" />
        <SectionTitle>Virtual Environments — Why &quot;Just pip install&quot; Is a Mistake</SectionTitle>

        <Para>
          Every Python project you build will depend on third-party packages. If you install every
          package globally (system-wide), you eventually run into version conflicts: Project A needs{' '}
          <code>requests==2.28</code> and Project B needs <code>requests==2.31</code>, but your system
          only has one global copy of each package installed at a time — installing one for Project B
          silently breaks Project A.
        </Para>

        <Para>
          A <strong>virtual environment</strong> solves this by creating an isolated, self-contained
          Python installation for a single project — its own interpreter and its own set of installed
          packages, completely separate from your system Python and from every other project&apos;s
          environment. This is not optional at the professional level: every real Python project you
          will ever work on uses one, and every job you take will assume you already know this.
        </Para>

        <CodeBox label="Creating and using a virtual environment">{`# Create a virtual environment named "venv" in the current folder
python3 -m venv venv

# Activate it — macOS / Linux
source venv/bin/activate

# Activate it — Windows (Command Prompt)
venv\\Scripts\\activate.bat

# Activate it — Windows (PowerShell)
venv\\Scripts\\Activate.ps1

# Your terminal prompt now shows (venv) — you are inside the isolated environment
(venv) $ pip install requests

# Confirm you're using the environment's interpreter, not the system one
(venv) $ which python3     # macOS/Linux
(venv) $ where python       # Windows

# Deactivate when you're done
(venv) $ deactivate`}</CodeBox>

        <Callout type="info">
          <strong>What "activating" actually does:</strong> It temporarily changes your shell&apos;s{' '}
          <code>PATH</code> so that typing <code>python</code> and <code>pip</code> point at the
          copies inside <code>venv/</code> instead of your system-wide installation. Nothing is copied
          or moved — you are just pointing your terminal session at a different, isolated interpreter
          until you deactivate it or close the terminal window.
        </Callout>

        <Para>
          Every project should have its own virtual environment, created inside that project&apos;s own
          folder, and the <code>venv/</code> folder itself should never be committed to version
          control — add it to <code>.gitignore</code> immediately. It is regenerated from a{' '}
          <code>requirements.txt</code> file, which you will build properly in the Modules &amp;
          Packages lesson later in this track.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Package Management" />
        <SectionTitle>pip and PyPI — Installing Code Other People Wrote</SectionTitle>

        <Para>
          <strong>pip</strong> ("pip installs packages", a recursive acronym) is Python&apos;s standard
          package manager, bundled with every modern Python installation. It downloads and installs
          packages from <strong>PyPI</strong> (the Python Package Index, pronounced "pie-pee-eye") —
          the central public repository where the Python community publishes open-source packages.
        </Para>

        <CodeBox label="Common pip commands">{`pip install requests              # install the latest version of a package
pip install requests==2.31.0      # install an exact, specific version
pip install "requests>=2.28"      # install a version at least this new
pip install --upgrade requests    # upgrade an already-installed package
pip uninstall requests            # remove a package
pip list                          # show everything installed in the current environment
pip show requests                 # show details about one installed package`}</CodeBox>

        <Para>
          When you install a package, pip also installs that package&apos;s own dependencies
          automatically — <code>requests</code>, for example, depends on smaller packages like{' '}
          <code>urllib3</code> and <code>certifi</code>, and pip resolves and installs all of them
          without you needing to know they exist. This dependency resolution is also where version
          conflicts between packages can surface — another reason virtual environments matter so much.
        </Para>

        <Callout type="tip">
          <strong>Always pin your versions for real projects.</strong> <code>pip install requests</code>{' '}
          with no version installs whatever the newest release happens to be today — which could
          introduce a breaking change six months from now when someone else sets up the project fresh.
          Professional projects record exact versions (typically in <code>requirements.txt</code> or a
          modern <code>pyproject.toml</code>) so that every machine running the project uses identical
          package versions. You will build this properly in the Modules &amp; Packages module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Your First Program" />
        <SectionTitle>Writing and Running Your First Script</SectionTitle>

        <Para>
          Create a file named <code>hello.py</code> — the <code>.py</code> extension is how Python
          (and your editor) identifies a file as Python source code.
        </Para>

        <CodeBox label="hello.py">{`print("Hello, World!")
print("Learning Python on Chaduvuko.")`}</CodeBox>

        <Para>Run it from your terminal, in the same folder as the file:</Para>

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
          <strong>script mode</strong>. Python also has an <strong>interactive mode</strong> (the REPL
          — Read-Eval-Print Loop), which you get by typing <code>python3</code> alone with no
          filename. It lets you type one line of Python at a time and see the result immediately —
          extremely useful for quickly testing a small piece of logic, but not how real programs are
          built or run.
        </Para>

        <CodeBox label="Interactive mode (REPL)">{`$ python3
Python 3.12.4 (main, ...)
>>> print("testing something quickly")
testing something quickly
>>> 7 * 6
42
>>> exit()`}</CodeBox>

        <SubTitle>Comments and the shebang line</SubTitle>

        <Para>
          Anything after a <code>#</code> on a line is a comment — ignored entirely by the
          interpreter, meant only for humans reading the code. On macOS and Linux, scripts intended
          to be run directly (like <code>./hello.py</code> rather than <code>python3 hello.py</code>)
          conventionally start with a <strong>shebang line</strong>:
        </Para>

        <CodeBox label="Shebang line — first line of a directly-executable script">{`#!/usr/bin/env python3
print("Hello, World!")`}</CodeBox>

        <Para>
          This tells the operating system which interpreter to use when the file itself is executed
          as a program (after marking it executable with <code>chmod +x hello.py</code>). You will not
          need this for most of this track, where you will run scripts explicitly with{' '}
          <code>python3 filename.py</code>, but you will see it at the top of real-world Python
          scripts constantly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Choosing Your Tools" />
        <SectionTitle>Editors, IDEs, and Notebooks — What Professionals Actually Use</SectionTitle>

        <Para>
          <strong>Visual Studio Code</strong> (free) with the official Python extension is the
          standard choice for most developers and what this track assumes you are using. It gives you
          syntax highlighting, autocomplete, inline error detection, and an integrated debugger with
          no paid upgrade required.
        </Para>

        <SubTitle>The alternatives, and when they make sense</SubTitle>

        <Para>
          <strong>PyCharm</strong> (JetBrains) is a full IDE built specifically for Python, with
          deeper built-in refactoring tools and project management features than VS Code&apos;s
          general-purpose extension model provides. It has a genuinely useful free Community edition.
          It is a strong choice once you are working on larger, multi-file projects, but has a steeper
          learning curve for a first setup than most beginners need.
        </Para>

        <Para>
          <strong>Jupyter Notebooks</strong> run Python in cells you execute individually and see
          output from immediately, interleaved with formatted text and charts — the standard tool for
          data science and exploratory analysis, and something you will use extensively once you
          reach the Data Science and Machine Learning tracks on this site. Notebooks are excellent for
          exploring data and prototyping quickly, but are a poor fit for building reusable, tested,
          production software — real applications are built as plain <code>.py</code> files, which is
          the skill this track focuses on first.
        </Para>

        <Callout type="tip">
          Set up VS Code with the Python extension before continuing to the next module. Open the{' '}
          <code>hello.py</code> file you just created, run it with the green "Run" arrow in the
          top-right corner (or the keyboard shortcut it shows), and confirm the output appears in the
          integrated terminal panel at the bottom. This is the workflow you will use for the rest of
          this track.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Day One at a Denver Startup — Setting Up to Actually Ship Code</SectionTitle>

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
            Scenario — E-commerce startup, Denver · Day 1 as a junior backend developer
          </div>

          <Para>
            You join a small e-commerce company as a junior backend developer. Your onboarding
            document says: "Clone the repo, set up your environment, and open a small pull request
            fixing the bug in issue #482 by end of week." Nobody sits with you to explain each step —
            this is assumed knowledge.
          </Para>

          <SubSubTitle>What actually happens</SubSubTitle>

          <Para>
            You clone the repository and find a <code>requirements.txt</code> file with 34 packages
            listed, pinned to exact versions. You create a virtual environment (
            <code>python3 -m venv venv</code>), activate it, and run{' '}
            <code>pip install -r requirements.txt</code> — installing all 34 dependencies at the
            exact versions the rest of the team is using, not whatever happens to be newest today. You
            confirm your Python version matches what the project expects by checking a{' '}
            <code>.python-version</code> file in the repo root, which tells you the team is on Python
            3.12.
          </Para>

          <SubSubTitle>Why every step from this module mattered</SubSubTitle>

          <Para>
            If you had skipped the virtual environment and installed packages globally, you would
            have silently broken compatibility with a different project already on your machine using
            a different version of the same library. If you had not verified your Python version
            matched the project&apos;s, you might have hit a syntax error from a language feature the
            project uses that your older Python does not support — a confusing failure that looks
            like a bug in the code itself. If you had not understood PATH, a "command not found" error
            on your very first command would have looked like a broken installation rather than a
            five-second fix.
          </Para>

          <Para>
            None of this is advanced. All of it is assumed. This is exactly why this module exists
            before any real Python syntax — the setup fundamentals are the difference between
            spending your first day writing code and spending your first day stuck on tooling.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions That Slow Beginners Down</SectionTitle>

        {[
          {
            wrong: '"I only need one Python installation on my whole computer"',
            right: 'You will eventually work on multiple projects requiring different package versions, and occasionally different Python versions. Virtual environments (and later, tools like pyenv) exist precisely because "one global Python for everything" does not scale past your first real project.',
          },
          {
            wrong: '"pip install X just works, I don\'t need to think about versions"',
            right: 'It works right up until two projects need incompatible versions of the same package, or until a package publishes a breaking change and your "always install latest" habit pulls it in silently. Professional projects pin exact versions for exactly this reason.',
          },
          {
            wrong: '"The REPL and running a script are the same thing"',
            right: 'The REPL is for quick, disposable experiments — nothing you type there is saved anywhere. Real programs are written in .py files and run as scripts. Confusing the two leads to "I wrote something that worked, then it vanished" moments.',
          },
          {
            wrong: '"Jupyter notebooks are how you build real Python applications"',
            right: 'Notebooks are outstanding for exploring data and prototyping — genuinely the right tool for that job, and you will use them constantly once you reach the Data Science track. But production applications are built and tested as ordinary .py files, which is deliberately what this entire foundations track teaches first.',
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
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        <Callout type="tip">
          These questions come up specifically to check whether a candidate understands Python at a
          level beyond "I can write a for loop" — foundational knowledge that separates someone who
          has memorised syntax from someone who understands the tool they are using.
        </Callout>

        {[
          {
            q: 'Is Python interpreted or compiled?',
            a: 'Python is interpreted — but more precisely, CPython (the standard implementation) compiles source code to an intermediate bytecode form first, then executes that bytecode on the Python Virtual Machine. This is different from ahead-of-time compiled languages like C, which compile directly to native machine code before execution, and produce a standalone binary that no longer needs the source. Python always needs an interpreter present to run.',
          },
          {
            q: 'What is the difference between a list and a virtual environment — wait, what IS a virtual environment, and why does it matter?',
            a: 'A virtual environment is an isolated, self-contained Python installation for a single project — its own interpreter and its own installed packages, separate from the system Python and from every other project\'s environment. It matters because different projects often need different, sometimes incompatible, versions of the same package. Without isolation, installing a package for one project can silently break a different project relying on an older version of that same package.',
          },
          {
            q: 'What is PyPI, and what is the relationship between pip and PyPI?',
            a: 'PyPI (Python Package Index) is the central public repository where the Python community publishes open-source packages. pip is the command-line tool that downloads and installs packages FROM PyPI (or other configured sources). They are not the same thing — PyPI is the repository (like a warehouse); pip is the tool that fetches from it (like a delivery service).',
          },
          {
            q: 'Why did Python 2 to Python 3 take so long, and why does it still come up?',
            a: 'Python 3 (2008) intentionally broke backward compatibility to fix core design issues, most significantly how text and raw bytes were handled — a distinction that matters enormously for real-world data with non-English characters or binary content. Because the change was not backward-compatible, large codebases took years to migrate, and both versions were maintained in parallel for over a decade. Python 2 reached official end-of-life on January 1, 2020. It still comes up because some legacy enterprise codebases have not fully migrated, and interviewers sometimes check that a candidate knows to never start new work in Python 2.',
          },
          {
            q: 'What happens, step by step, when you run "python3 script.py"?',
            a: 'CPython reads the source file, compiles it into bytecode (an intermediate, platform-independent instruction format — not machine code), optionally caches that bytecode in a __pycache__ folder for faster reuse next time, and then the Python Virtual Machine executes the bytecode instruction by instruction, producing the program\'s output.',
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
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
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
          {
            q: 'Assuming pip install installs into the environment you think it does',
            a: 'If you have multiple Python installations, "pip" without a version suffix can silently point at the wrong one. Use "python3 -m pip install X" instead of bare "pip install X" — this guarantees the package installs for the exact python3 interpreter you are about to run your code with.',
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
            cause: 'macOS (and most Linux distros) do not alias "python" to Python 3 by default — only "python3" is guaranteed to exist. This is not a broken installation; it is expected behavior.',
            fix: 'Use python3 instead of python for every command in this lesson and throughout this track, until you explicitly configure an alias.',
          },
          {
            error: `ModuleNotFoundError: No module named 'requests'`,
            cause: 'The package is not installed in the Python environment currently active — either you forgot to activate your virtual environment, or you never ran pip install for it in this environment, or you installed it into a different Python installation than the one currently running.',
            fix: 'Confirm (venv) is shown in your terminal prompt, then run pip install requests. If it still fails, run "which python3" (macOS/Linux) or "where python" (Windows) to confirm you are using the interpreter you think you are, and use "python3 -m pip install requests" to guarantee the install target matches.',
          },
          {
            error: `SyntaxError: invalid syntax`,
            cause: 'Almost always a typo — a missing colon after an if/for/def line, mismatched quotes, or a missing closing parenthesis. Python reports the error on or near the line where it got confused, which is sometimes one line AFTER the real mistake.',
            fix: 'Read the line above the one reported, not just the line itself. Check for a missing colon, unclosed bracket, or unmatched quote first — these cause the overwhelming majority of SyntaxErrors for beginners.',
          },
          {
            error: `PermissionError: [Errno 13] Permission denied`,
            cause: 'Attempting to pip install a package into a system-protected location, usually because you ran pip install without an active virtual environment on a machine with a locked-down system Python.',
            fix: 'This is almost always solved by activating a virtual environment first — never fix it by running pip with sudo, which can corrupt your system Python installation and cause much harder-to-diagnose problems later.',
          },
          {
            error: `'python3' is not recognized as an internal or external command (Windows)`,
            cause: 'Python was installed without checking "Add python.exe to PATH" during setup, so Windows has no idea where to find the python3 executable when you type the command.',
            fix: 'Re-run the Python installer, choose "Modify", and ensure the "Add python.exe to PATH" checkbox is checked. Alternatively, on Windows the launcher command "py" is often registered even when PATH setup was skipped — try "py --version" as a diagnostic.',
          },
          {
            error: `error: externally-managed-environment`,
            cause: 'A newer protection in some Linux distributions and Homebrew-installed Python that blocks "pip install" from modifying the system-wide Python installation directly, to prevent accidentally breaking OS-level tools that depend on specific package versions.',
            fix: 'This is not a bug — it is the correct behavior working as intended. It is telling you to use a virtual environment, exactly as this module recommends. Create and activate one with python3 -m venv venv, and the error disappears because you are no longer touching the protected system installation.',
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
        'Python is interpreted, not compiled — CPython compiles your source to bytecode and runs it on the Python Virtual Machine, with no separate ahead-of-time build step.',
        'Always use Python 3. Python 2 reached end-of-life in January 2020 and has no security support — never start new work in it.',
        'Install Python from the official python.org source. Use python3/pip3 explicitly on macOS and Linux to avoid ambiguity with legacy Python 2.',
        'PATH is the list of folders your OS searches for a command by name. A skipped "Add to PATH" step during install is the #1 cause of "command not found" errors.',
        'A virtual environment is a self-contained, isolated Python installation per project. Every real project uses one — this is not optional at the professional level.',
        'pip installs packages from PyPI. Pin exact versions for real projects — "just install whatever is newest" silently breaks reproducibility.',
        'Never commit a venv/ folder to Git. It is regenerated from requirements.txt on any machine.',
        '.py is the file extension for Python source code. Script mode (running a file) is how real programs run; the interactive REPL is for quick, disposable testing.',
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
