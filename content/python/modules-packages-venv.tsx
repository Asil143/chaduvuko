import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Modules, Packages & Virtual Environments — Python | Chaduvuko',
  description:
    'import, pip, requirements.txt, and virtual environments — how real Python projects are actually structured.',
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

export default function ModulesPackagesVenv() {
  return (
    <LearnLayout
      title="Modules, Packages & Virtual Environments"
      description="import, pip, requirements.txt, and virtual environments — how real Python projects are actually structured."
      section="Python — Module 18"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Module Actually Is" />
        <SectionTitle>Every .py File Is a Module</SectionTitle>

        <Para>
          A <strong>module</strong> is nothing more mysterious than a single <code>.py</code> file. The
          moment you write <code>import math</code>, Python goes and finds a file called{' '}
          <code>math</code> (in this case, a built-in one written in C, but the concept is identical for
          your own files) and runs it top to bottom exactly once, then exposes everything it defined —
          functions, classes, variables — as attributes you can reach through the module name.
        </Para>

        <CodeBox label="helpers.py — a module you write yourself">{`# helpers.py
def greet(name):
    return f"Hello, {name}!"

PI_ISH = 3.14`}</CodeBox>

        <CodeBox label="main.py — importing your own module">{`# main.py, in the same folder as helpers.py
import helpers

print(helpers.greet("Asha"))   # "Hello, Asha!"
print(helpers.PI_ISH)          # 3.14`}</CodeBox>

        <Para>
          Three import forms cover almost everything you will write. <code>import helpers</code> gives
          you the whole module under its own name, so you always write <code>helpers.greet(...)</code> —
          this is the form recommended by most style guides because it is unambiguous about where{' '}
          <code>greet</code> came from when someone reads the code later.{' '}
          <code>from helpers import greet</code> pulls a specific name directly into your file's
          namespace, letting you call <code>greet(...)</code> with no prefix — convenient, but it gets
          harder to trace where a name came from once a file has a dozen such imports.{' '}
          <code>import helpers as h</code> aliases the module to a shorter name — extremely common for
          libraries with conventional aliases, like <code>import pandas as pd</code>.
        </Para>

        <Callout type="warning">
          <strong>Never write <code>from module import *</code> in real code.</strong> It dumps every
          public name from the module into your file's namespace with no indication of where any of them
          came from, and it can silently shadow names you already defined. Every linter flags it, and it
          is one of the fastest ways to make a codebase impossible to navigate.
        </Callout>

        <SubTitle>A module only runs once per program, no matter how many times it is imported</SubTitle>

        <Para>
          Python caches every module it imports in <code>sys.modules</code> the first time it is
          imported. If five different files each write <code>import helpers</code>, the{' '}
          <code>helpers.py</code> file's top-level code runs exactly once — the first import — and every
          subsequent import just hands back a reference to that same already-built module object. This
          is why placing code with side effects (like a database connection, or a <code>print()</code>{' '}
          call) at the top level of a module is a common source of subtle bugs: it only fires once, at
          first import, not once per file that imports it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Packages" />
        <SectionTitle>A Package Is a Folder of Modules</SectionTitle>

        <Para>
          A <strong>package</strong> is simply a folder containing Python files, plus (traditionally) a
          special file called <code>__init__.py</code> that marks the folder as importable. Packages let
          you organise related modules into a namespace instead of dumping every file flat into one
          directory.
        </Para>

        <CodeBox label="A small package layout">{`myapp/
    __init__.py
    database.py
    utils/
        __init__.py
        formatting.py
        validation.py`}</CodeBox>

        <CodeBox label="Importing from a nested package">{`from myapp.utils.formatting import format_currency
from myapp import database

format_currency(1999)          # "$19.99"
database.connect()`}</CodeBox>

        <Para>
          <code>__init__.py</code> can be a completely empty file — its mere presence used to be what
          told older Python versions "this folder is a package, not just a folder." Modern Python
          (3.3+) supports <em>namespace packages</em>, which work even without an{' '}
          <code>__init__.py</code>, but nearly every real project still includes one deliberately,
          because it is also the natural place to control what a package exposes — re-exporting selected
          names from its submodules so callers can write{' '}
          <code>{`from myapp import connect`}</code> instead of reaching two levels deep.
        </Para>

        <SubTitle>The module vs. package distinction, in one sentence</SubTitle>
        <Para>
          A module is a file; a package is a folder of modules (which may itself contain sub-packages,
          nested arbitrarily deep) — both are imported the same way, with dots marking each level of
          nesting.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — How Python Actually Finds an Import" />
        <SectionTitle>sys.path — The Search Order Behind Every import</SectionTitle>

        <Para>
          When you write <code>import helpers</code>, Python does not search your whole filesystem — it
          checks a specific, ordered list of locations stored in <code>sys.path</code>, and uses the
          first match it finds.
        </Para>

        <CodeBox label="Inspecting the search path">{`import sys
for p in sys.path:
    print(p)

# Typically, in this order:
# 1. The directory of the script being run (or '' for the interactive interpreter)
# 2. PYTHONPATH environment variable entries, if set
# 3. The standard library's installation directories
# 4. site-packages — where pip installs third-party packages`}</CodeBox>

        <Para>
          This ordering explains a genuinely common beginner bug: naming your own file{' '}
          <code>random.py</code> or <code>json.py</code> in the same folder as your script. Because
          "the directory of the script being run" is searched <em>first</em>, your file shadows the real
          standard-library module of the same name — any <code>import random</code> anywhere in your
          program now finds your file instead of Python's actual random module, usually producing a
          confusing <code>AttributeError</code> deep inside unrelated code.
        </Para>

        <Callout type="warning">
          <strong>Never name a file the same as a standard-library or installed package.</strong> If you
          see <code>AttributeError: module 'random' has no attribute 'randint'</code> and you are certain
          you never touched the real <code>random</code> module, check whether you have a file called{' '}
          <code>random.py</code> anywhere in your project — it is shadowing the real one.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Relative vs Absolute Imports" />
        <SectionTitle>Two Ways to Reference a Sibling Module</SectionTitle>

        <Para>
          Inside a package, you can import a sibling module either <strong>absolutely</strong> (spelling
          out the full path from the top of the package) or <strong>relatively</strong> (using dots to
          mean "relative to my own location").
        </Para>

        <CodeBox label="Absolute import — the recommended default">{`# myapp/utils/validation.py
from myapp.utils.formatting import format_currency`}</CodeBox>

        <CodeBox label="Relative import — the same thing, written relatively">{`# myapp/utils/validation.py
from .formatting import format_currency     # . = "the same package as this file"
from ..database import connect              # .. = "one level up"`}</CodeBox>

        <Para>
          PEP 8 and most real codebases prefer absolute imports for their clarity — reading{' '}
          <code>from myapp.utils.formatting import format_currency</code> tells you exactly where the
          name lives without needing to know the importing file's own location. Relative imports earn
          their keep mainly inside large packages that get renamed or moved as a unit, where absolute
          paths would need updating everywhere; for everyday project code, absolute imports are the
          safer default.
        </Para>

        <SubTitle>Relative imports only work inside a package — never in a directly-run script</SubTitle>

        <CodeBox label="A common error — running a file with relative imports directly">{`# If validation.py (which contains "from .formatting import ...") is run directly:
$ python myapp/utils/validation.py
ImportError: attempted relative import with no known parent package

# Relative imports require the file to be run as PART OF a package, e.g.:
$ python -m myapp.utils.validation`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — __name__ == '__main__'" />
        <SectionTitle>The Idiom That Separates “Importable” From “Runnable”</SectionTitle>

        <Para>
          Every Python file has a built-in variable called <code>__name__</code>. When a file is run
          directly (<code>python script.py</code>), Python sets its <code>__name__</code> to the string{' '}
          <code>"__main__"</code>. When that same file is instead imported by another file,{' '}
          <code>__name__</code> is set to the module's actual name instead. This single difference is
          what the near-universal <code>if __name__ == "__main__":</code> guard is built on.
        </Para>

        <CodeBox label="Why this guard matters">{`# analysis.py
def calculate_average(numbers):
    return sum(numbers) / len(numbers)

def run_demo():
    print(calculate_average([10, 20, 30]))

if __name__ == "__main__":
    run_demo()

# Run directly:      python analysis.py        -> prints 20.0
# Imported elsewhere: import analysis            -> nothing prints;
#                      calculate_average is available, run_demo() never fires`}</CodeBox>

        <Para>
          Without the guard, <code>run_demo()</code> would execute every time <em>anything</em> imported{' '}
          <code>analysis.py</code> — including test files, other modules that just want{' '}
          <code>calculate_average</code>, and tools that import your code to inspect it. The guard is
          what lets a single file be both a reusable module and a standalone script, cleanly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — pip and PyPI" />
        <SectionTitle>Installing Code Someone Else Already Wrote</SectionTitle>

        <Para>
          The vast majority of real Python projects depend on third-party packages — code published to{' '}
          <strong>PyPI</strong> (the Python Package Index) and installed with <code>pip</code>, Python's
          standard package manager.
        </Para>

        <CodeBox label="Core pip commands">{`pip install requests              # install the latest version
pip install requests==2.31.0      # install an exact, pinned version
pip install "requests>=2.28,<3"   # install within a version range
pip uninstall requests            # remove it
pip list                          # show everything currently installed
pip show requests                 # details about one installed package`}</CodeBox>

        <SubTitle>requirements.txt — recording exactly what your project needs</SubTitle>

        <Para>
          A <code>requirements.txt</code> file lists a project's dependencies (and usually their exact
          versions) in one place, so anyone else — a teammate, a CI server, a production deployment — can
          recreate the same environment with a single command.
        </Para>

        <CodeBox label="requirements.txt">{`requests==2.31.0
pandas==2.1.4
python-dateutil==2.8.2`}</CodeBox>

        <CodeBox label="Generating and installing from it">{`pip freeze > requirements.txt       # capture everything currently installed
pip install -r requirements.txt     # install everything a requirements.txt lists`}</CodeBox>

        <Callout type="tip">
          <strong><code>pip freeze</code> captures every package in the current environment</strong> —
          including things you never directly installed but that came along as a dependency of something
          else. Larger projects increasingly use tools like <code>pip-tools</code> or{' '}
          <code>poetry</code> to separate "what I directly depend on" from "the full resolved dependency
          tree," but plain <code>requirements.txt</code> remains extremely common and is a completely
          reasonable default for most projects.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Virtual Environments" />
        <SectionTitle>Why Every Real Project Needs Its Own Isolated Environment</SectionTitle>

        <Para>
          Without a virtual environment, <code>pip install</code> installs packages{' '}
          <strong>globally</strong> — into the one shared Python installation on your machine. That
          sounds convenient until you have two projects that need different, incompatible versions of
          the same package: Project A needs <code>django==3.2</code>, Project B needs{' '}
          <code>django==5.0</code>, and a single global installation can only hold one version at a time.
          A <strong>virtual environment</strong> (venv) is a self-contained, isolated Python installation
          per project, so each project's dependencies never collide with any other's.
        </Para>

        <CodeBox label="Creating and using a venv">{`# Create one, typically named .venv, inside your project folder
python3 -m venv .venv

# Activate it — this changes which "python" and "pip" your terminal uses
source .venv/bin/activate       # macOS / Linux
.venv\\Scripts\\activate          # Windows

# Your prompt now shows (.venv) — everything installed from here
# goes into THIS project's isolated environment, not the global one
pip install requests

# Leave the virtual environment
deactivate`}</CodeBox>

        <Callout type="warning">
          <strong>A very common beginner mistake: running <code>pip install</code> without activating
          the venv first.</strong> The package installs successfully — just into the wrong place (the
          global environment, or a completely different project's venv if one happens to still be
          active) — and the current project's script then fails with{' '}
          <code>ModuleNotFoundError</code> even though "it was just installed." Always confirm the venv
          is active (check for the <code>(.venv)</code> prefix in your terminal prompt) before installing
          anything.
        </Callout>

        <SubTitle>.venv should never be committed to version control</SubTitle>
        <Para>
          A virtual environment folder can be tens or hundreds of megabytes and is entirely
          machine-specific — it should always be listed in <code>.gitignore</code>. What gets committed
          instead is <code>requirements.txt</code>, which lets anyone recreate an equivalent environment
          from scratch with <code>python3 -m venv .venv && pip install -r requirements.txt</code>.
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
        <SectionTitle>Onboarding at a Seattle Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Seattle · New engineer, day one
          </div>

          <Para>
            A new hire clones the payments-service repository and, following old habits, runs{' '}
            <code>pip install -r requirements.txt</code> directly — no venv. It appears to work. Two
            hours later, running the test suite fails with a version conflict: the globally installed{' '}
            <code>cryptography</code> package (pulled in months ago by an unrelated personal project) is
            newer than the version this repository pins, and the two are incompatible in a way that
            produces a cryptic import error deep inside a third-party library, nothing pointing at the
            real cause.
          </Para>

          <CodeBox label="The fix a senior teammate walks them through">{`# Undo the global install's damage isn't really possible cleanly —
# start fresh with a proper isolated environment instead:
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Now "cryptography" resolves to EXACTLY the version requirements.txt
# pins, isolated from anything else ever installed on this machine`}</CodeBox>

          <SubSubTitle>Why this is standard, not optional, at every real engineering org</SubSubTitle>

          <Para>
            The senior engineer's message in the team channel afterward: "every repo gets its own venv,
            no exceptions — five extra seconds now saves an afternoon of debugging a dependency conflict
            that has nothing to do with your actual code." This is not startup-specific caution — it is
            the near-universal default across professional Python teams, exactly because the failure mode
            above is so common and so time-consuming to diagnose after the fact.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Modules and Environments</SectionTitle>

        {[
          {
            wrong: '"pip install installs a package for a specific project"',
            right: 'By default pip installs into whatever Python environment is currently active — which is the GLOBAL environment unless you have activated a venv first. pip has no inherent concept of "this project" at all; isolation is entirely something YOU set up with a venv.',
          },
          {
            wrong: '"__init__.py has to contain code for a folder to be a package"',
            right: 'It can be completely empty — its presence alone (on older Python) or even its absence (Python 3.3+ namespace packages) is enough to make a folder importable. Real projects usually put re-export code in it anyway, but it is not required.',
          },
          {
            wrong: '"Relative imports (from .module import x) are always safer than absolute ones"',
            right: 'Relative imports only work when the file is run as part of a package (e.g. with python -m), and break with an ImportError if the same file is ever run directly. Most style guides, including PEP 8, actually recommend absolute imports as the clearer default.',
          },
          {
            wrong: '"Deleting a venv folder can lose my project\'s code"',
            right: 'A venv contains ONLY installed dependencies and a Python interpreter copy — never your own project code. Deleting .venv and recreating it with pip install -r requirements.txt is always safe and is a completely standard troubleshooting step.',
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
            q: 'What is the difference between a module and a package?',
            a: 'A module is a single .py file. A package is a folder containing modules (and possibly sub-packages), traditionally marked with an __init__.py file. Both are imported with the same dotted syntax — a package import just has more dots when reaching into nested folders.',
          },
          {
            q: 'Why does a virtual environment matter — what actual problem does it solve?',
            a: 'Without one, pip install writes into a single shared global Python environment, so two projects needing different, incompatible versions of the same dependency cannot both be satisfied at once. A venv gives each project its own isolated set of installed packages, so version conflicts between unrelated projects become impossible by construction.',
          },
          {
            q: 'What does if __name__ == "__main__": actually check, and why is it useful?',
            a: 'Python sets a file\'s __name__ to "__main__" only when that file is executed directly, and to the module\'s real name when it is imported elsewhere. The guard lets a file define reusable functions/classes AND optionally run demo/CLI code — but only when run directly, never as a side effect of being imported by something else.',
          },
          {
            q: 'What is the actual search order Python uses to resolve an import?',
            a: 'sys.path, in order: the directory of the currently running script, PYTHONPATH entries if set, the standard library\'s own directories, then site-packages where pip-installed packages live. The first matching name anywhere in that ordered list wins — which is exactly why naming your own file "random.py" can silently shadow the real standard-library random module.',
          },
          {
            q: 'What is the purpose of requirements.txt, and how is it normally generated?',
            a: 'It records a project\'s dependencies (usually pinned to exact versions) in one file, so the exact same environment can be recreated elsewhere with pip install -r requirements.txt. It is commonly generated with pip freeze > requirements.txt after installing everything a project needs inside an active venv.',
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
        <SectionTitle>Module & Environment Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Installing packages without activating the venv first',
            a: 'The install "succeeds" silently into the wrong environment (usually global), and the project then fails with ModuleNotFoundError despite the package appearing to be installed. Always check for the (.venv) prompt prefix before running pip install.',
          },
          {
            q: 'Naming a personal file the same as a standard-library or third-party module',
            a: 'A file called requests.py, json.py, or random.py in your project directory shadows the real module of the same name, because the running script\'s own directory is searched first. Rename the file.',
          },
          {
            q: 'Committing the .venv folder to version control',
            a: 'It is large, entirely machine-specific, and unnecessary — everyone who clones the repo should create their own venv from requirements.txt. Add .venv/ to .gitignore.',
          },
          {
            q: 'Using a relative import in a file meant to also be run directly',
            a: 'from .helpers import x raises "ImportError: attempted relative import with no known parent package" the moment the file is executed directly rather than imported as part of a package. Use an absolute import instead if the file needs to support both.',
          },
          {
            q: 'Forgetting to update requirements.txt after installing a new package',
            a: 'pip install works fine locally but the new dependency is invisible to anyone else who installs from requirements.txt — including CI and production. Run pip freeze > requirements.txt (or manually add the line) right after installing anything new.',
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
        <SectionTitle>Errors You Will Hit With Modules & Environments — And Exactly Why</SectionTitle>

        {[
          {
            error: `ModuleNotFoundError: No module named 'requests'`,
            cause: 'The package genuinely is not installed in the currently active Python environment — either it was never installed, or it was installed into a different environment (e.g. globally, while a venv was active for the actual run).',
            fix: 'Confirm the correct venv is active, then run pip install requests. If it still fails, run "pip show requests" and "which python" to confirm you are looking at the environment you think you are.',
          },
          {
            error: `ImportError: attempted relative import with no known parent package`,
            cause: 'A file using a relative import (from .module import x) was run directly rather than as part of a package.',
            fix: 'Either run it with python -m package.module instead of python package/module.py, or switch the file to an absolute import.',
          },
          {
            error: `ModuleNotFoundError: No module named 'myapp'`,
            cause: 'Python could not find your own package on sys.path — usually because you ran a script from a different working directory than expected, so "the current directory" no longer contains myapp/.',
            fix: 'Run the script from the project\'s root directory, or install the project itself in editable mode with "pip install -e ." so it is importable from anywhere.',
          },
          {
            error: `AttributeError: module 'random' has no attribute 'randint'`,
            cause: 'A local file in the project happens to be named random.py, shadowing the real standard-library random module for every import in the program.',
            fix: 'Rename the local file to something that does not collide with a standard-library or installed package name.',
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
        'A module is a single .py file; a package is a folder of modules (traditionally marked by __init__.py). Both are imported with dotted syntax.',
        'Python resolves imports through sys.path, in order — the running script\'s own directory first, which is why naming a file the same as a standard-library module silently shadows it.',
        'Prefer absolute imports over relative ones for clarity; relative imports also break when the file is run directly instead of as part of a package.',
        'if __name__ == "__main__": lets a file be both an importable module and a standalone runnable script, without demo code firing on every import.',
        'pip installs into whichever environment is currently active — always activate a project\'s venv before installing anything.',
        'A virtual environment isolates a project\'s dependencies from every other project and the global environment, preventing version conflicts. Never commit .venv/ to version control.',
        'requirements.txt records a project\'s dependencies so the same environment can be recreated elsewhere with pip install -r requirements.txt.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 19 begins the Object-Oriented Python phase — classes, objects, and the __init__ method,
          from first principles.
        </p>
        <Link href="/learn/python/classes-objects" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 19 → Classes and Objects — The Basics
        </Link>
      </div>
    </LearnLayout>
  )
}
