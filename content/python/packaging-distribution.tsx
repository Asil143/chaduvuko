import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Packaging and Distributing Python Projects | Chaduvuko',
  description:
    'Project structure, pyproject.toml as the modern standard, building wheels and sdists, semantic versioning, and publishing a real package to PyPI.',
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

export default function PackagingDistribution() {
  return (
    <LearnLayout
      title="Packaging and Distributing Python Projects"
      description="Project structure, pyproject.toml as the modern standard, building wheels and sdists, semantic versioning, and publishing a real package to PyPI."
      section="Python — Module 41"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Application vs Library" />
        <SectionTitle>The Distinction That Shapes Every Decision in This Module</SectionTitle>

        <Para>
          Before touching any packaging tool, it is worth being precise about what you are actually
          building, because the answer changes almost every decision that follows. An{' '}
          <strong>application</strong> is something you run — a script, a web service, a CLI tool someone
          executes directly. A <strong>library</strong> is something other code imports and calls —{' '}
          <code>requests</code>, <code>pandas</code>, or a small internal utility your team shares across
          several projects. You have been building applications throughout most of this track. This
          module is fundamentally about the second case: turning code into something installable and
          reusable, not just runnable.
        </Para>

        <CodeBox label="The practical difference this creates">{`APPLICATION                         LIBRARY
- Has a specific entry point         - Exposes an importable API
  (e.g. "python app.py")               (e.g. "import mylib; mylib.do_thing()")
- Dependencies are usually pinned    - Dependencies are usually version RANGES
  to exact versions for reproducibility  (so it doesn't conflict with whatever
                                          else is installed alongside it)
- Rarely published to PyPI            - Often published to PyPI, or at least
                                         installed via a private index/Git URL`}</CodeBox>

        <Para>
          The reason this matters here: everything from Part 02 onward — <code>pyproject.toml</code>,
          building wheels, publishing to PyPI — exists specifically to support the library case, or an
          application specifically meant to be installed as a reusable command (which Module 44,
          immediately after this one, builds end to end). If you are only ever going to run{' '}
          <code>python app.py</code> yourself, you genuinely do not need most of this module. The moment
          someone else needs to <code>pip install</code> your code, or you need to reuse it across
          multiple projects without copy-pasting files, packaging becomes the right tool.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Project Structure" />
        <SectionTitle>The src/ Layout vs the Flat Layout</SectionTitle>

        <Para>
          There are two common ways to lay out a Python package&apos;s files on disk, and the debate
          between them shows up in nearly every real-world project&apos;s README or contributing guide.
        </Para>

        <CodeBox label="Flat layout — the package sits right next to your project files">{`my-project/
├── pyproject.toml
├── README.md
├── mypackage/
│   ├── __init__.py
│   ├── core.py
│   └── utils.py
└── tests/
    └── test_core.py`}</CodeBox>

        <CodeBox label="src/ layout — the package lives inside a src/ directory">{`my-project/
├── pyproject.toml
├── README.md
├── src/
│   └── mypackage/
│       ├── __init__.py
│       ├── core.py
│       └── utils.py
└── tests/
    └── test_core.py`}</CodeBox>

        <Para>
          The flat layout is simpler to look at and slightly more common in small scripts and tutorials.
          The <code>src/</code> layout is what most modern, professionally maintained Python packages
          actually use, for one specific, genuinely important reason: it prevents your tests from
          accidentally importing the local, uninstalled source code instead of the actually-installed
          package. With a flat layout, running tests from the project root can silently succeed by
          importing <code>mypackage</code> directly off disk — even if the package was never correctly
          installed at all, or has a broken <code>pyproject.toml</code>. With the <code>src/</code>{' '}
          layout, that accidental import is impossible, because <code>mypackage</code> is not on Python&apos;s
          import path unless it was actually installed properly — forcing your tests to exercise the real,
          installed package the same way a user would encounter it.
        </Para>

        <Callout type="tip">
          For a small personal project, the flat layout is perfectly fine and you should not feel obligated
          to over-engineer it. The moment you are publishing something other people will <code>pip
          install</code>, or working on a team, the <code>src/</code> layout&apos;s "forces correctness"
          property is worth the very small amount of extra directory nesting it costs.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — pyproject.toml" />
        <SectionTitle>The Modern Standard — Superseding setup.py</SectionTitle>

        <Para>
          For most of Python&apos;s history, packaging a project meant writing a{' '}
          <code>setup.py</code> file — a genuine Python script, executed at build and install time, that
          called a function named <code>setup()</code> with a large pile of keyword arguments describing
          the package. It worked, but it had a real design flaw: because it was executable code, tools
          could not safely inspect a package&apos;s metadata (its name, version, dependencies) without
          actually running arbitrary Python — a real security and reliability concern.
        </Para>

        <Para>
          <code>pyproject.toml</code> is the modern replacement, standardized across the Python packaging
          ecosystem (formalized in <code>PEP 518</code> and later <code>PEP 621</code>). It is a plain,
          static TOML configuration file — no code execution required to read it — that every modern
          Python packaging tool (pip, build, Poetry, Hatch, and others) understands out of the box.
        </Para>

        <CodeBox label="A complete, realistic pyproject.toml">{`[build-system]
requires = ["setuptools>=68.0"]
build-backend = "setuptools.build_meta"

[project]
name = "orderkit"
version = "0.3.1"
description = "Utilities for parsing and validating e-commerce order data"
readme = "README.md"
requires-python = ">=3.10"
license = { text = "MIT" }
authors = [
    { name = "Your Name", email = "you@example.com" }
]
dependencies = [
    "requests>=2.31,<3.0",
    "python-dateutil>=2.8",
]

[project.optional-dependencies]
dev = ["pytest>=7.0", "black>=24.0", "ruff>=0.4"]

[project.urls]
Homepage = "https://github.com/yourname/orderkit"`}</CodeBox>

        <Para>
          Three distinct concerns live in this one file, each worth naming explicitly. The{' '}
          <code>[build-system]</code> table tells installers which tool actually knows how to build this
          project into a distributable package (here, <code>setuptools</code>) — this section is read
          before anything else, even before your project&apos;s own code is touched. The{' '}
          <code>[project]</code> table is metadata: name, version, description, and crucially,{' '}
          <strong>dependencies</strong> — every third-party package this project needs to run, with version
          constraints, replacing what used to live in a separate <code>requirements.txt</code> for a
          library&apos;s own declared dependencies (Module 18 covered <code>requirements.txt</code> for
          pinning an application&apos;s exact environment — this is the equivalent concept for a
          publishable library&apos;s stated, flexible requirements). <code>[project.optional-dependencies]</code>{' '}
          declares extra dependency groups, like packages only needed for running tests, that are not
          installed by default.
        </Para>

        <Callout type="info">
          You do not need to memorize this file&apos;s exact syntax. What matters for real work: knowing
          it exists as the modern standard, knowing roughly what belongs in it (metadata, dependencies,
          the build backend), and knowing that a project without one cannot be built or published with
          modern tooling at all.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Building a Package" />
        <SectionTitle>python -m build — What Actually Gets Produced</SectionTitle>

        <Para>
          With a valid <code>pyproject.toml</code> in place, building your project into a distributable
          package is a single command, using the standard <code>build</code> tool (installed with{' '}
          <code>pip install build</code>).
        </Para>

        <CodeBox label="Building a package from the project root">{`pip install build
python -m build

# Produces a new dist/ directory:
dist/
├── orderkit-0.3.1-py3-none-any.whl
└── orderkit-0.3.1.tar.gz`}</CodeBox>

        <Para>
          Two files come out, and they serve genuinely different purposes.
        </Para>

        <CodeBox label="wheel (.whl) vs sdist (.tar.gz)">{`WHEEL (.whl)
  A pre-built, ready-to-install package. Files are already laid out
  exactly how they'll be installed — pip just unpacks it directly.
  Fast to install. The format most users end up installing.

SDIST (.tar.gz)
  A "source distribution" — the raw source files plus enough metadata
  to build a wheel from them. Slower to install (pip has to build a
  wheel from it first), but necessary as a fallback for platforms or
  package configurations a pre-built wheel wasn't produced for.`}</CodeBox>

        <Para>
          In practice, when you run <code>pip install orderkit</code>, pip prefers to download and install
          the wheel directly if one compatible with your system is available — it is faster and requires
          no build step on the installing machine at all. The sdist exists as the complete, buildable
          source, and as the fallback when no matching pre-built wheel exists (common for packages that
          include compiled code for a specific operating system and Python version).
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Versioning" />
        <SectionTitle>Semantic Versioning — MAJOR.MINOR.PATCH</SectionTitle>

        <Para>
          The version number you put in <code>pyproject.toml</code> is not just a label — for a published
          package, other projects&apos; dependency constraints (like <code>requests&gt;=2.31,&lt;3.0</code>{' '}
          from Part 03) rely on it meaning something consistent. The near-universal convention across the
          Python ecosystem, and most of the software industry, is <strong>semantic versioning</strong>{' '}
          (semver): three numbers, <code>MAJOR.MINOR.PATCH</code>, each incremented for a specific reason.
        </Para>

        <CodeBox label="What each number actually promises">{`MAJOR — incremented for a BREAKING change.
        Code written against the old major version may stop working.
        1.4.2 -> 2.0.0

MINOR — incremented for a new, backward-COMPATIBLE feature.
        Existing code keeps working; new functionality is added.
        1.4.2 -> 1.5.0

PATCH — incremented for a backward-compatible BUG FIX.
        No new features, no breaking changes — just a fix.
        1.4.2 -> 1.4.3`}</CodeBox>

        <Para>
          This is what makes a constraint like <code>requests&gt;=2.31,&lt;3.0</code> meaningful rather
          than arbitrary: it is trusting that <code>requests</code>&apos; maintainers will only increment
          the major version (to <code>3.0</code>) when they genuinely break backward compatibility, so
          anything within the <code>2.x</code> range is presumed safe to use without re-testing everything.
          A package that bumps its major version for a trivial change, or ships a breaking change as a
          minor version, violates the entire premise other projects are relying on when they set version
          constraints — which is exactly why teams treat semver discipline as a real commitment, not a
          formality.
        </Para>

        <Callout type="tip">
          A version below <code>1.0.0</code> (e.g. <code>0.3.1</code>, as used in Part 03&apos;s example)
          is a widely understood signal in itself: "this API may still change in breaking ways even on a
          minor version bump — use with the understanding that it&apos;s not yet stable." Publishing your
          first real version as <code>0.1.0</code> rather than <code>1.0.0</code> is a normal, honest way
          to communicate that.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Publishing to PyPI" />
        <SectionTitle>twine upload — And Why You Test on TestPyPI First</SectionTitle>

        <Para>
          PyPI (the Python Package Index) is the official public registry that <code>pip install</code>{' '}
          downloads from by default. Publishing your own package there makes it installable by anyone,
          anywhere, with a single <code>pip install yourpackage</code>. The standard tool for uploading a
          built package is <code>twine</code>.
        </Para>

        <CodeBox label="Publishing — the real command">{`pip install twine
twine upload dist/*

# Prompts for a PyPI username (or __token__) and an API token,
# then uploads both the wheel and sdist from Part 04.`}</CodeBox>

        <Callout type="warning">
          <strong>PyPI package names are global and permanent.</strong> Once a name is taken, it is taken —
          and critically, PyPI does not allow re-uploading a given version number even if you delete it. A
          typo in your first real upload, or a broken package published to a name you wanted, cannot be
          undone by simply deleting and re-publishing under the same version. This is exactly why testing
          before a real publish matters far more here than in most other development workflows.
        </Callout>

        <Para>
          <strong>TestPyPI</strong> is a completely separate, parallel instance of PyPI that exists
          specifically for practicing the publish process without consequences — same tooling, same
          commands, a throwaway environment.
        </Para>

        <CodeBox label="Testing the full publish flow safely on TestPyPI first">{`twine upload --repository testpypi dist/*

# Then install FROM TestPyPI to confirm it actually installs and imports correctly:
pip install --index-url https://test.pypi.org/simple/ orderkit`}</CodeBox>

        <Para>
          The professional habit worth internalizing: build, upload to TestPyPI, install from TestPyPI
          into a clean virtual environment, and confirm the package actually imports and works as expected —
          only then repeat the same <code>twine upload</code> command against the real PyPI. This single
          extra round-trip catches an enormous fraction of packaging mistakes (a missing dependency, a file
          that didn&apos;t get included, a broken import path) before they become a permanent, undeletable
          entry on the real index.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Entry Points" />
        <SectionTitle>Turning a Package Into a Real, Installed Command</SectionTitle>

        <Para>
          Everything so far makes a package <em>importable</em> — <code>import orderkit</code>. A
          different, extremely useful capability is making part of a package runnable directly from the
          terminal as its own command, the way <code>pip</code>, <code>black</code>, or <code>pytest</code>{' '}
          themselves work — you do not write <code>python -m black</code> every time; you just type{' '}
          <code>black</code>. This is configured with an <strong>entry point</strong> in{' '}
          <code>pyproject.toml</code>.
        </Para>

        <CodeBox label="Declaring a CLI entry point">{`[project.scripts]
orderkit = "orderkit.cli:main"

# This says: after installing this package, create a command called
# "orderkit" that, when run, calls the function "main" inside
# the module "orderkit.cli".`}</CodeBox>

        <CodeBox label="The function it points at — orderkit/cli.py">{`def main():
    print("orderkit CLI running")
    # real argument parsing goes here — covered in full in Module 44`}</CodeBox>

        <Para>
          After installing this package (<code>pip install .</code> during development, or{' '}
          <code>pip install orderkit</code> once published), a genuine new command called{' '}
          <code>orderkit</code> becomes available directly in the shell — no <code>python</code> prefix,
          no remembering which file to run. This is exactly the mechanism Module 44, immediately after
          this one, relies on to turn a complete CLI tool built with <code>argparse</code> into something
          installed and runnable as a real, first-class command rather than a script someone has to locate
          and invoke manually.
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
        <SectionTitle>Four Copy-Pasted Files at a Raleigh Insurance-Tech Company</SectionTitle>

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
            Scenario — Insurance-tech company, Raleigh · Internal tooling
          </div>

          <Para>
            An engineer at a mid-sized insurance-tech company writes a small internal module for
            validating policy-number formats — a handful of regex checks and normalization functions. It
            proves genuinely useful, and within two months, four different teams have simply copy-pasted{' '}
            <code>validate_policy.py</code> into their own projects, because that was faster than figuring
            out how to properly share it.
          </Para>

          <SubSubTitle>The problem this creates, six weeks later</SubSubTitle>

          <Para>
            A bug is found in the normalization logic — it mishandles policy numbers from one specific
            legacy system, silently stripping a leading zero. The fix is trivial, one line. But it now has
            to be manually applied and re-tested in four separate, silently diverging copies of the same
            file, in four different repositories, because nothing ties them together as a single shared
            source of truth. Two of the four copies had already been locally modified in small,
            undocumented ways since being copy-pasted, so the "same" fix does not even apply cleanly to
            all four.
          </Para>

          <SubSubTitle>The fix — an actual internal package</SubSubTitle>

          <Para>
            The team packages <code>validate_policy.py</code> properly: a real <code>src/</code> layout
            (Part 02), a <code>pyproject.toml</code> declaring its own version starting at{' '}
            <code>0.1.0</code> (Part 05), and — since this is an internal tool, not something meant for
            the public — published to the company&apos;s private package index rather than the public
            PyPI, using the exact same <code>twine upload</code> workflow from Part 06 pointed at a
            different, internal repository URL instead of the public one. Every team that depends on it
            now runs <code>pip install policy-validator&gt;=1.0,&lt;2.0</code> in their own{' '}
            <code>pyproject.toml</code>, and a single fix, released as <code>1.0.1</code> under the
            semver discipline from Part 05, reaches every consuming team the next time they update their
            dependencies — one change, one place, instead of four manual patches applied by hand.
          </Para>

          <Para>
            This is quite possibly the single most common real-world reason packaging becomes necessary
            inside a company that never intends to publish anything to the public PyPI at all: the moment
            code is genuinely reused across more than one project, copy-pasting it stops being free, and a
            proper package with a real version number becomes the cheaper option.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Packaging</SectionTitle>

        {[
          {
            wrong: '"Packaging is only relevant if you\'re publishing something to the public PyPI"',
            right: 'As the Real World example above shows, packaging is frequently used for purely internal code, published to a private index or simply installed directly from a Git URL, specifically to avoid copy-pasting shared code across multiple projects. The public PyPI is one destination, not the whole point.',
          },
          {
            wrong: '"setup.py and pyproject.toml are basically interchangeable — just older vs newer syntax for the same thing"',
            right: 'The real distinction is that pyproject.toml is static, declarative configuration that tools can read without executing any code, while setup.py is an executable Python script. That difference is precisely why the ecosystem moved toward pyproject.toml as the standard — safer and more reliably inspectable by tooling.',
          },
          {
            wrong: '"A wheel and an sdist are just two different compression formats for the same thing"',
            right: 'A wheel is pre-built and ready to install directly — no build step needed on the installing machine. An sdist is the source, requiring a build step to turn into an installable form. pip prefers the wheel when a compatible one is available specifically because it is faster and needs no local build tools.',
          },
          {
            wrong: '"You should always publish version 1.0.0 for your first real release, to look serious"',
            right: 'Starting below 1.0.0 (like 0.1.0) is a normal, honest, widely understood signal that the API may still change in breaking ways even on a minor bump. Publishing 1.0.0 prematurely creates a false promise of stability that semantic versioning depends on other developers being able to trust.',
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
            q: 'What is pyproject.toml, and what does it replace?',
            a: 'It\'s the modern, standardized configuration file for a Python package\'s build system, metadata, and dependencies — a static TOML file that tools can read without executing any code. It replaces the older setup.py, which was an executable Python script, meaning tools historically had to run arbitrary code just to inspect a package\'s metadata, a real reliability and security concern the static format solves.',
          },
          {
            q: 'What is the difference between a wheel and an sdist?',
            a: 'A wheel (.whl) is a pre-built, ready-to-install package — files are already laid out exactly as they will be installed, so pip can install it quickly with no build step. An sdist (.tar.gz) is a source distribution — the raw source plus metadata needed to build a wheel from it, slower to install since it requires a local build step, and used as a fallback when no compatible pre-built wheel is available.',
          },
          {
            q: 'Explain semantic versioning and why other projects\' dependency constraints rely on it.',
            a: 'Semantic versioning uses MAJOR.MINOR.PATCH, where MAJOR increments for a breaking change, MINOR for a backward-compatible new feature, and PATCH for a backward-compatible bug fix. Other projects\' dependency constraints, like requests>=2.31,<3.0, are only meaningful if the maintainer honors this convention — the constraint is trusting that nothing within the 2.x range will break existing code, which only holds if breaking changes are reserved specifically for major version bumps.',
          },
          {
            q: 'Why should you test a package on TestPyPI before publishing to the real PyPI?',
            a: 'PyPI package names are global and permanent, and critically, a given version number cannot be re-uploaded even after deletion — a broken or mistaken upload cannot simply be replaced under the same version. TestPyPI is a separate, parallel instance that lets you practice the entire build-upload-install flow safely, catching packaging mistakes like missing dependencies or broken imports before they become a permanent, undeletable entry on the real index.',
          },
          {
            q: 'What is an entry point in pyproject.toml, and what problem does it solve?',
            a: 'An entry point, declared under [project.scripts], turns a function inside your package into a real, standalone command available directly in the shell after installation — the same mechanism that makes commands like pytest or black runnable directly instead of needing "python -m" and a full file path. It\'s what makes a package\'s CLI feel like a first-class installed tool rather than a script someone has to locate and invoke manually.',
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
        <SectionTitle>Packaging Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting to increment the version number before re-publishing',
            a: 'PyPI (and TestPyPI) rejects a re-upload of a version number that already exists — even to fix a typo. Bump the version in pyproject.toml before every new upload, following semver from Part 05.',
          },
          {
            q: 'Publishing to the real PyPI as a first test, instead of TestPyPI',
            a: 'As covered in Part 06, a bad first upload cannot be cleanly undone. Always run the full build-upload-install cycle against TestPyPI first and confirm it actually works before touching the real index.',
          },
          {
            q: 'Pinning dependencies too tightly in a published library',
            a: 'A library declaring "requests==2.31.0" (an exact pin) instead of "requests>=2.31,<3.0" (a range) can create dependency conflicts for anyone using your library alongside any other package that needs a different exact version. Exact pins belong in an application\'s deployment environment, not a published library\'s stated requirements.',
          },
          {
            q: 'Not including a README or license, and being surprised the PyPI page looks broken',
            a: 'The readme field in pyproject.toml controls what actually renders as your package\'s description page on PyPI. Skipping it (or pointing it at a missing file) leaves that page blank for anyone considering installing your package.',
          },
          {
            q: 'Choosing a package name that\'s already taken without checking first',
            a: 'PyPI names are first-come, global, and cannot be reused even by a completely unrelated project once claimed. Check availability (search pypi.org, or use "pip install <name>" to see if it already resolves to something) before committing to a name in pyproject.toml.',
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
        <SectionTitle>Packaging Errors You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `HTTPError: 400 Bad Request — File already exists`,
            cause: 'You tried to upload a version number that already exists on PyPI or TestPyPI — uploads are permanent and cannot overwrite an existing version, even one you own.',
            fix: 'Bump the version number in pyproject.toml (following semver, Part 05) and rebuild before uploading again.',
          },
          {
            error: `ModuleNotFoundError after "pip install ." during local development`,
            cause: 'Most commonly, a mismatch between the package name declared in pyproject.toml and the actual directory/module name on disk, or a src/ layout project installed without the correct package-discovery configuration.',
            fix: 'Confirm the [project] name and the actual folder structure agree, and for a src/ layout, ensure your build backend is configured to look inside src/ (setuptools does this automatically when package-dir = {"" = "src"} is set, or automatically in modern versions when it detects the layout).',
          },
          {
            error: `error: Multiple top-level packages discovered in a flat-layout project`,
            cause: 'setuptools found more than one directory that looks like a package (e.g. both your actual package AND a tests/ or docs/ folder with an __init__.py) and doesn\'t know which one to build.',
            fix: 'Either explicitly list which packages to include in pyproject.toml, or switch to the src/ layout from Part 02, which avoids this ambiguity entirely by isolating the real package under src/.',
          },
          {
            error: `twine.exceptions.InvalidDistribution: Invalid distribution metadata`,
            cause: 'A required field is missing or malformed in pyproject.toml — commonly an invalid version string, or a dependency specifier with incorrect syntax.',
            fix: 'Run "python -m build" locally and read its output carefully — build failures usually name the exact malformed field. Fix it in pyproject.toml and rebuild before uploading.',
          },
          {
            error: `The installed CLI command from [project.scripts] isn\'t found in the shell (command not found)`,
            cause: 'Either the package was installed inside a virtual environment that isn\'t currently activated, or the entry point function/module path in pyproject.toml doesn\'t match the real code.',
            fix: 'Confirm the correct virtual environment is activated, and double-check the "module:function" path in [project.scripts] exactly matches where the function actually lives.',
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
        'Applications are run; libraries are imported and reused. Most of this module targets the reuse case — the moment code is shared across more than one project.',
        'The src/ layout prevents tests from accidentally importing an uninstalled local copy instead of the real installed package — the reason most professionally maintained packages use it.',
        'pyproject.toml is the modern, static, standardized replacement for setup.py — declaring the build system, metadata, and dependencies without requiring any code execution to read it.',
        'python -m build produces two artifacts: a wheel (pre-built, fast to install) and an sdist (source, built on install, used as a fallback).',
        'Semantic versioning (MAJOR.MINOR.PATCH) is a real commitment other projects rely on when setting dependency constraints — MAJOR for breaking changes, MINOR for new features, PATCH for fixes.',
        'twine upload publishes to PyPI. Uploads are permanent and cannot be overwritten — always test the full flow on TestPyPI first.',
        'Entry points (declared in [project.scripts]) turn a package into a real, installed shell command — the mechanism behind tools like pytest and black working without a "python -m" prefix.',
        'Packaging is just as commonly used for purely internal, private code as for public PyPI publishing — the underlying problem is always the same: stop copy-pasting shared code.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 42 covers performance — measuring before optimizing, profiling with cProfile, and the
          practical Big O traps that show up constantly in real Python code.
        </p>
        <Link href="/learn/python/performance-profiling" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 42 → Python Performance — Profiling and Optimisation
        </Link>
      </div>
    </LearnLayout>
  )
}
