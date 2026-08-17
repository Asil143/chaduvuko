import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Cross-Browser Compatibility & Debugging — HTML & CSS | Chaduvuko',
  description:
    'Vendor prefixes, feature detection, DevTools workflows, and debugging the CSS bug that only shows up in one browser.',
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

export default function CrossBrowserCompatibilityDebugging() {
  return (
    <LearnLayout
      title="Cross-Browser Compatibility & Debugging"
      description="Vendor prefixes, feature detection, DevTools workflows, and debugging the CSS bug that only shows up in one browser."
      section="HTML & CSS — Module 39"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Browsers Disagree At All" />
        <SectionTitle>Four Rendering Engines, One Specification, Constant Small Differences</SectionTitle>

        <Para>
          Every browser you support is built on one of a small number of rendering engines: Chrome, Edge,
          Opera, and most Android browsers run on Blink; Safari (desktop and iOS) runs on WebKit; Firefox
          runs on Gecko. All three engines implement the same published CSS and HTML specifications, but
          "implement the same spec" does not mean "produce identical output." Specs leave some behavior
          genuinely unspecified or implementation-defined, engines ship new features on different
          timelines, and — very commonly — a feature ships in one engine experimentally, under a vendor
          prefix, before the spec that defines its final unprefixed behavior has even stabilized.
        </Para>

        <Para>
          None of this means cross-browser CSS is unpredictable chaos — the overwhelming majority of
          modern CSS renders identically everywhere. It means a specific, learnable set of situations
          reliably produce differences: brand-new features, complex layout edge cases, anything touching
          scrollbars/forms/native OS widgets (which each browser skins with its own platform styling), and
          — historically the single biggest source of real bugs — Safari, which has consistently trailed
          Chrome and Firefox on when it ships newer CSS features, and has its own set of quirks around
          flexbox, position: sticky, and viewport units that show up in real production code constantly.
        </Para>

        <Callout type="info">
          This module is not a list of "browser X is broken, browser Y is broken" trivia to memorize — it
          is a set of tools and a workflow (feature detection, DevTools, a systematic debugging process)
          that lets you diagnose a compatibility problem you have never seen before, on a browser
          combination nobody wrote a blog post about. That workflow is the actual skill; specific quirks
          change every year.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Vendor Prefixes" />
        <SectionTitle>-webkit- and -moz- — What They Were For, and Why You Rarely Type Them Now</SectionTitle>

        <Para>
          A vendor prefix marks a CSS property or value as an experimental, engine-specific implementation
          of a feature that had not yet been finalized in the spec — a signal of "this works, but the
          exact syntax or behavior might still change before it becomes standard." Each engine has its own
          prefix.
        </Para>

        <CodeBox label="The vendor prefixes you will actually encounter">{`-webkit-   Blink (Chrome/Edge/Opera) and WebKit (Safari) — by far the
           most commonly still-needed prefix in real code today
-moz-      Firefox (Gecko)
-ms-       Old Internet Explorer / early Edge (Legacy) — essentially
           irrelevant for any site not explicitly supporting IE11`}</CodeBox>

        <CodeBox label="A property that historically needed multiple prefixes">{`.gradient-text {
  background: linear-gradient(90deg, #ff4757, #7b61ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* background-clip: text is still, as of today, only reliably supported
   in Safari with the -webkit- prefix present — one of a small number
   of genuinely still-necessary hand-written prefixes. */`}</CodeBox>

        <Para>
          The historical peak of prefix usage was roughly 2010–2015, when properties like{' '}
          <code>border-radius</code>, <code>box-shadow</code>, <code>transform</code>, and{' '}
          <code>flexbox</code> itself all required prefixed versions across multiple browsers
          simultaneously, and real production CSS was genuinely cluttered with four or five variants of
          every rule. Nearly all of that has since been finalized into standard, unprefixed CSS as the
          specs stabilized — which is precisely why you rarely see hand-written prefixes in modern
          codebases, and why writing them by hand today is largely considered an anti-pattern rather than
          due diligence.
        </Para>

        <Callout type="warning">
          <strong>Prefixed properties can silently go stale.</strong> A prefixed rule copied from an old
          Stack Overflow answer or an outdated boilerplate can linger in a codebase for years after the
          engine in question stopped needing it, adding dead weight and, worse, sometimes actively
          conflicting with the modern unprefixed behavior if the two are ever both present with different
          values. Treat any hand-written prefix you encounter in existing code as something to verify, not
          assume is still required.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Autoprefixer" />
        <SectionTitle>How Modern Workflows Actually Handle Prefixes — You Mostly Don&apos;t</SectionTitle>

        <Para>
          Autoprefixer is a build-tool plugin (most commonly run through PostCSS, and built directly into
          nearly every modern framework's CSS pipeline — Next.js's built-in CSS support included) that
          reads your plain, unprefixed CSS and automatically injects exactly the prefixed variants your
          target browsers actually still need, based on real, continuously updated browser usage and
          support data.
        </Para>

        <CodeBox label="What you write">{`.card {
  display: flex;
  user-select: none;
  backdrop-filter: blur(8px);
}`}</CodeBox>

        <CodeBox label="What Autoprefixer outputs, based on your configured browser support target">{`.card {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
}`}</CodeBox>

        <Para>
          Which prefixes get added is controlled by a <code>browserslist</code> configuration — typically
          a line in <code>package.json</code> or a dedicated <code>.browserslistrc</code> file, expressed
          as human-readable queries like <code>&quot;&gt; 0.5%&quot;</code> (browsers with more than 0.5%
          global usage share) or <code>&quot;last 2 versions&quot;</code>. This is also the same
          configuration many other tools in a modern build pipeline (Babel, ESLint's browser-target
          rules) read from, so it is usually a single source of truth for "what does 'supported' mean for
          this project" across the whole toolchain, not a CSS-only setting.
        </Para>

        <CodeBox label="A typical browserslist config, in package.json">{`{
  "browserslist": [
    "> 0.5%",
    "last 2 versions",
    "not dead"
  ]
}`}</CodeBox>

        <Callout type="tip">
          <strong>The practical rule for a modern project: write plain, unprefixed CSS, and let the build
          tool handle prefixing.</strong> Hand-writing prefixes is really only still relevant for very
          new, genuinely experimental properties that ship in one engine before their spec has stabilized
          enough for Autoprefixer's data to have caught up — check caniuse.com for the specific property
          in question if you are unsure whether it needs one today.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Feature Detection" />
        <SectionTitle>@supports — Detecting What a Browser Can Actually Do, in CSS Itself</SectionTitle>

        <Para>
          <code>@supports</code> is a CSS at-rule that tests whether the current browser understands a
          given property/value pair, and only applies the styles inside its block if the test passes. It
          is CSS's own feature-detection mechanism — the equivalent, entirely inside CSS, of checking
          whether a JavaScript API exists before calling it.
        </Para>

        <CodeBox label="Basic @supports usage">{`@supports (backdrop-filter: blur(8px)) {
  .modal-overlay {
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.4);
  }
}

@supports not (backdrop-filter: blur(8px)) {
  .modal-overlay {
    background: rgba(0, 0, 0, 0.75); /* darker solid fallback, no blur */
  }
}`}</CodeBox>

        <Para>
          The condition inside the parentheses must be a real, complete property/value declaration — not
          just a bare property name — because the test is genuinely "can this browser parse and apply
          this exact declaration," not merely "has this browser ever heard of this property."
        </Para>

        <CodeBox label="Combining conditions with and, or, and not">{`@supports (display: grid) and (gap: 1rem) {
  .layout { display: grid; gap: 1rem; }
}

@supports (display: grid) or (display: flex) {
  /* applies if EITHER is supported — a genuinely rare need in 2026,
     since grid and flex are both now universal, but the syntax matters
     for newer properties still rolling out */
}`}</CodeBox>

        <Para>
          The most common real pattern is exactly the first example above: define a solid, safe fallback
          as your normal, unguarded CSS, then use <code>@supports</code> to layer a progressive
          enhancement on top for browsers that can render it — never the other way around, since a browser
          that does not understand <code>@supports</code> itself (vanishingly rare today, but worth
          stating precisely) simply ignores the whole block, which needs to be a safe outcome, not a
          broken one.
        </Para>

        <Callout type="info">
          A closely related, JavaScript-side tool worth knowing exists even in a CSS-focused module:{' '}
          <code>CSS.supports(property, value)</code> runs the exact same check from JavaScript, useful
          when the enhancement needs to conditionally apply a class or run different logic rather than
          just different styles.
        </Callout>

        <SubTitle>@supports vs a browserslist/Autoprefixer target — two different jobs</SubTitle>

        <Para>
          It is worth being precise about the difference, since both sound like "handling browser
          differences": Autoprefixer adjusts <em>syntax</em> for features your target browsers already
          support, in a prefixed form. <code>@supports</code> handles features some target browsers do{' '}
          <em>not</em> support at all yet, letting you ship a real fallback rather than a broken or
          missing style. They solve adjacent but distinct problems and are commonly used together in the
          same stylesheet.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — DevTools: Computed Styles" />
        <SectionTitle>The Computed Styles Panel — What the Browser Actually Decided, Not What You Wrote</SectionTitle>

        <Para>
          The CSS Selectors Deep Dive module covered specificity and the cascade in theory. The Computed
          panel in Chrome/Edge/Firefox DevTools (select an element in the Elements/Inspector panel, then
          open the "Computed" tab next to "Styles") is where you verify what actually happened in
          practice — it shows the single final value the browser resolved for every CSS property on that
          element, after every rule, every override, and every inherited value has already been resolved,
          not the list of rules that were written targeting it.
        </Para>

        <CodeBox label="Why this matters — a cascade you cannot debug by reading source alone">{`.card { color: #333; }
.card.featured { color: var(--brand-color); }
.dark-theme .card { color: #eee; }

<div class="card featured"> <!-- inside a .dark-theme ancestor -->

/* Which color actually applies? Reading the CSS source requires manually
   working out specificity and source order across three separate rules.
   The Computed panel just tells you the final answer directly. */`}</CodeBox>

        <Para>
          Two features of the Computed panel matter beyond just the final value. First, most browsers let
          you click the small arrow next to a computed value to expand it and see exactly which rule (with
          its file and line number) won, and which competing rules were overridden — this is the fastest
          way to answer "why isn't my CSS applying" without manually recomputing specificity by hand.
          Second, a checkbox (commonly labeled "Show all") toggles between only the properties explicitly
          set somewhere in your CSS versus every single computed property the element has, including ones
          that came from the browser's own default stylesheet — genuinely useful when a cross-browser
          difference turns out to be a differing default value (form elements are the most common
          offender here) rather than anything in your own CSS at all.
        </Para>

        <Callout type="tip">
          <strong>When a bug looks identical in two browsers' Elements panels but renders differently,
          check Computed, not Styles.</strong> The Styles panel shows your source rules; two browsers can
          agree on which rules apply and still compute a different final value for something like a
          default line-height, a default form control padding, or a font metric — differences that only
          surface in the Computed panel's actual resolved numbers.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — DevTools: The Box Model" />
        <SectionTitle>The Box Model Inspector — Seeing Content, Padding, Border, and Margin as Real Numbers</SectionTitle>

        <Para>
          The Box Model module introduced content, padding, border, and margin conceptually.
          DevTools' box model diagram — found at the bottom of the Computed panel (Chrome/Edge) or as its
          own dedicated panel (Firefox) — renders that exact structure with the real, live pixel values
          for the currently selected element, as four nested, color-coded rectangles you can read directly
          off the diagram.
        </Para>

        <CodeBox label="Reading the box model diagram">{`┌─────────────── margin (orange) ───────────────┐
│  ┌───────────── border (yellow) ─────────────┐  │
│  │  ┌─────────── padding (green) ───────────┐  │  │
│  │  │                                         │  │  │
│  │  │         content (blue) — the            │  │  │
│  │  │         element's actual width/height   │  │  │
│  │  │                                         │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘

Each ring shows its real resolved pixel value directly on the diagram —
click any number to edit it live and see the layout update instantly.`}</CodeBox>

        <Para>
          This is the single fastest way to diagnose the most common category of cross-browser layout bug:
          an element that is a genuinely different size in two browsers, where the difference is not
          obvious from reading the CSS source. It is very often caused by <code>box-sizing</code>{' '}
          resolving differently than expected (a component authored assuming{' '}
          <code>border-box</code> sitting inside a reset that only applies{' '}
          <code>content-box</code> in one context), or by a browser's own default form-control padding —
          both show up immediately as a numeric discrepancy on the diagram, without needing to guess.
        </Para>

        <SubTitle>A concrete debugging move — comparing the same element across two browsers</SubTitle>

        <CodeBox label="A practical workflow for a 'element is a different size in Safari' bug">{`1. Open the same page in both browsers, DevTools open in each.
2. Select the exact same element in both Elements/Inspector panels.
3. Screenshot (or just note down) the box model numbers side by side.
4. The first ring that differs between the two screenshots tells you
   exactly which layer of the box model the bug lives in — content
   width, padding, border, or margin — narrowing the search from
   "the whole component" to one specific CSS property immediately.`}</CodeBox>

        <Callout type="info">
          The box model diagram also directly exposes <strong>margin collapsing</strong> — when two
          adjacent vertical margins combine into a single margin rather than adding together, a real CSS
          behavior (not a bug) that trips up cross-browser debugging constantly, since it can look like
          "this browser is applying less margin than I wrote" when in fact every browser is collapsing the
          margins identically and correctly.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Systematic Debugging Workflow" />
        <SectionTitle>A Repeatable Process for &quot;It Only Breaks in One Browser&quot;</SectionTitle>

        <Para>
          Every cross-browser bug eventually gets easier to diagnose once you stop treating it as
          mysterious and start working through the same ordered checklist every time.
        </Para>

        <CodeBox label="The workflow, in order">{`1. REPRODUCE — Confirm the exact browser, version, and OS. "Safari" alone
   is not enough; desktop Safari and iOS Safari have real, separate quirks.

2. ISOLATE — Strip the page down to the smallest markup/CSS that still
   reproduces the bug. A bug that survives being cut down to 10 lines is
   vastly easier to reason about than one still buried in a full page.

3. CHECK CANIUSE — Search the specific property/value on caniuse.com.
   A huge share of "browser bugs" are simply a feature the browser
   genuinely does not support yet, not a rendering defect.

4. COMPARE COMPUTED VALUES — Use the Computed panel (Part 05) side by
   side across browsers to find exactly which property's resolved value
   actually differs.

5. COMPARE BOX MODEL NUMBERS — If it is a sizing/layout issue, use the
   box model diagram (Part 06) to find which layer (content/padding/
   border/margin) diverges.

6. SEARCH FOR A KNOWN QUIRK — Once you know the specific property and
   the specific browser, a targeted search ("safari flexbox min-height
   bug", "safari position sticky table") very often turns up a
   well-documented, named issue with a known workaround.

7. FIX WITH THE NARROWEST TOOL — @supports for a genuine feature gap,
   a small CSS override scoped as tightly as possible for a rendering
   quirk — never a broad browser-sniffing hack that could silently
   break on a future browser version.`}</CodeBox>

        <Callout type="warning">
          <strong>Resist reaching for browser/user-agent sniffing as a fix.</strong> User-agent strings are
          notoriously unreliable (many browsers deliberately misreport parts of theirs for compatibility
          reasons), and a sniffing-based fix silently stops working the moment the affected browser ships
          an update that changes its behavior — <code>@supports</code> and targeted, well-commented CSS
          overrides are almost always the more durable fix.
        </Callout>
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
        <SectionTitle>&quot;It Only Breaks in Safari&quot; — A Real Investigation at a Seattle SaaS Company</SectionTitle>

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
            Scenario — B2B SaaS company, Seattle · Customer-reported bug
          </div>

          <Para>
            A support ticket comes in for a Seattle-based project-management SaaS product: a customer's
            sidebar navigation, meant to stretch to fill the full height of the browser window with a
            sticky footer pinned to its bottom, instead collapses to a tiny sliver — just tall enough for
            its content, with the sticky footer floating awkwardly in the middle of the page. Every
            engineer on the team who tries to reproduce it, on Chrome, cannot see anything wrong at all.
            The customer is on Safari.
          </Para>

          <SubSubTitle>Step 1-2 — Reproduce and isolate</SubSubTitle>

          <Para>
            An engineer opens the app in Safari for the first time in months and reproduces it
            immediately. Following the workflow, they strip the sidebar down to a minimal isolated test
            case outside the full app — a flex column meant to grow to fill its parent's height.
          </Para>

          <CodeBox label="The isolated reproduction">{`<div class="app-shell"> <!-- height: 100vh -->
  <aside class="sidebar">
    <nav class="sidebar-nav">...</nav>
    <div class="sidebar-footer">Upgrade plan</div>
  </aside>
  <main class="content">...</main>
</div>`}</CodeBox>

          <CodeBox label="The CSS driving the layout">{`.app-shell {
  display: flex;
  height: 100vh;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
}`}</CodeBox>

          <Para>
            In Chrome, <code>.sidebar</code> correctly stretches to the full height of{' '}
            <code>.app-shell</code>, because it is a flex item inside a flex container with no explicit
            height of its own — flex items default to stretching to fill the cross-axis size of their
            container. In Safari, the same markup renders the sidebar collapsed to its content height
            instead.
          </Para>

          <SubSubTitle>Step 3-5 — caniuse, Computed panel, box model</SubSubTitle>

          <Para>
            <code>flex</code> and <code>display: flex</code> both show universal support on caniuse — this
            is not a missing-feature problem. Comparing the Computed panel for <code>.sidebar</code> side
            by side, the engineer finds the actual divergence: in Chrome, the computed <code>height</code>{' '}
            is <code>720px</code> (matching the viewport). In Safari, it is <code>412px</code> — exactly
            the height of the nav content alone. The box model diagram confirms the same story visually:
            the content ring in Safari stops exactly where the nav's own content ends, with no stretch
            applied at all.
          </Para>

          <SubSubTitle>Step 6 — a known quirk</SubSubTitle>

          <Para>
            A targeted search for "safari flex column height not stretching" turns up a well-documented,
            long-standing WebKit quirk: a flex container with <code>flex-direction: column</code> does not
            reliably stretch to fill a percentage-based or viewport-based ancestor height in the way
            Chrome and Firefox do, unless every element in the chain between the flex container and the
            sized ancestor has an explicit height (or <code>min-height: 0</code>) set — a default-sizing
            edge case Safari has handled differently from other engines for years, specifically around
            nested flex columns and implicit min-height.
          </Para>

          <SubSubTitle>Step 7 — the fix</SubSubTitle>

          <CodeBox label="The fix — an explicit min-height: 0 breaking the collapse">{`.sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  min-height: 0; /* Safari-specific: without this, a nested flex column
                    can refuse to stretch to fill its flex-parent's height,
                    defaulting instead to its content's own height. */
}`}</CodeBox>

          <Para>
            The sidebar renders correctly in Safari immediately, with no visible change in Chrome or
            Firefox at all — <code>min-height: 0</code> is already each engine's initial value for the
            property, so the rule is a genuine no-op everywhere except the one engine with the quirk it is
            targeting. The fix ships with a comment explaining exactly why it exists, so the next engineer
            who encounters it does not delete it as apparently-dead CSS during a future cleanup.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Cross-Browser Compatibility</SectionTitle>

        {[
          {
            wrong: '"Modern CSS doesn\'t need vendor prefixes anymore, full stop"',
            right: 'The vast majority of CSS shipped in the last decade no longer needs hand-written prefixes, but a small set of genuinely newer or Safari-specific properties (like background-clip: text) still do, as of today. The accurate rule is "let Autoprefixer handle it based on your browserslist target," not "prefixes are extinct."',
          },
          {
            wrong: '"If it works in Chrome, it works everywhere — Chrome has the largest market share"',
            right: 'Chrome\'s market share does not make it a reliable proxy for spec compliance. Safari in particular has a real, documented history of lagging on newer features and having its own layout-engine-specific quirks (as in the flex-column stretching example above) that Chrome never exhibits at all.',
          },
          {
            wrong: '"@supports and browserslist/Autoprefixer solve the same problem, just at different layers"',
            right: 'They solve genuinely different problems. Autoprefixer adjusts syntax for features your target browsers DO support, in prefixed form. @supports provides a real fallback for features some target browsers do NOT support at all. Confusing the two leads to reaching for the wrong tool.',
          },
          {
            wrong: '"User-agent sniffing is a reasonable way to apply a browser-specific fix"',
            right: 'User-agent strings are unreliable by design — many browsers deliberately misreport parts of theirs for legacy compatibility — and a sniffing-based fix silently breaks the moment the targeted browser changes its UA string or ships an update. @supports and targeted, well-commented CSS overrides degrade far more gracefully.',
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
            q: 'What is a vendor prefix, and why does modern tooling mostly eliminate the need to write them by hand?',
            a: 'A vendor prefix (-webkit-, -moz-, -ms-) marks an engine-specific, experimental implementation of a CSS feature before its spec finalized. Autoprefixer, run as part of the CSS build pipeline and configured via a browserslist target, reads plain unprefixed CSS and automatically injects exactly the prefixed variants still needed for the project\'s actual supported browsers, based on continuously updated real usage data — removing the need to track which properties need which prefixes by hand.',
          },
          {
            q: 'What does @supports actually test, and how is it different from Autoprefixer\'s job?',
            a: '@supports tests whether the current browser can parse and apply a specific property/value declaration, letting you branch CSS based on real feature support — commonly used to provide a safe fallback for browsers lacking a feature entirely. Autoprefixer, by contrast, assumes the feature IS supported by your target browsers and only adjusts its syntax (adding prefixes) for that support to actually kick in. One handles missing support; the other handles differing syntax for present support.',
          },
          {
            q: 'A component computes to a different height in Chrome vs Safari, with identical HTML and CSS. Walk through how you would debug it.',
            a: 'Reproduce and confirm the exact browser/OS. Isolate the minimal markup/CSS that still reproduces the difference. Check caniuse for the relevant properties to rule out a plain missing-feature gap. Compare the Computed panel for the element in both browsers to find exactly which resolved property value diverges. If it is a sizing issue specifically, compare the box model diagram in both browsers to see which layer — content, padding, border, or margin — actually differs. Then search for a known engine-specific quirk once the specific property and browser are identified, and apply the narrowest possible targeted fix.',
          },
          {
            q: 'What does the Computed panel in DevTools show that the Styles panel does not?',
            a: 'The Styles panel lists the CSS rules written that target an element, in source order, showing which are struck through as overridden. The Computed panel shows the single final resolved value for every property after the entire cascade — specificity, source order, and inheritance — has already been applied, including properties never explicitly set in your own CSS (browser defaults). It is the fastest way to confirm what the browser actually decided, rather than manually recomputing the cascade yourself.',
          },
          {
            q: 'Why is user-agent sniffing generally considered a poor way to handle a browser-specific bug, compared to @supports or a targeted CSS override?',
            a: 'User-agent strings are unreliable — many browsers deliberately misreport parts of their own UA string for legacy compatibility with sniffing-based sites, and the string itself can change between versions. A fix gated on matching a specific UA string can silently stop applying (or start applying somewhere it shouldn\'t) the moment a browser updates, with no clear signal that it broke. @supports tests real feature capability directly, and a narrowly scoped, well-commented CSS override degrades far more predictably as browsers evolve.',
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
        <SectionTitle>Cross-Browser Mistakes Made Constantly, Even by Experienced Teams</SectionTitle>

        {[
          {
            q: 'Hand-writing vendor prefixes for properties that no longer need them',
            a: 'This adds dead weight to a stylesheet and, occasionally, active conflicts if the prefixed and unprefixed rules ever diverge in value. Let Autoprefixer, configured with an accurate browserslist target, decide what actually still needs a prefix.',
          },
          {
            q: 'Only ever testing in Chrome during development',
            a: 'Chrome\'s market share does not make it representative of every rendering engine\'s behavior — Safari in particular has real, documented quirks Chrome never exhibits. A genuine cross-browser pass (or at minimum, a Safari check before shipping anything layout-heavy) catches these before a customer does.',
          },
          {
            q: 'Reaching for user-agent sniffing as the first fix for a browser-specific bug',
            a: 'UA strings are unreliable and change over time; a sniffing-based fix is fragile in a way @supports and targeted CSS overrides are not. Reserve UA-based logic for genuinely unavoidable cases, and prefer feature detection everywhere else.',
          },
          {
            q: 'Debugging a rendering difference by staring at CSS source instead of the Computed panel',
            a: 'Manually recomputing specificity and the cascade by eye is slow and error-prone, especially across nested selectors and inherited values. The Computed panel gives you the browser\'s own final answer directly, in seconds.',
          },
          {
            q: 'Deleting an unfamiliar-looking CSS rule (like a stray min-height: 0) during a cleanup pass without checking why it exists',
            a: 'A rule that looks like a no-op in the browser you are testing in can be silently load-bearing in another engine — exactly the Safari flex-column fix in this module\'s Real World example. Leave a comment on any browser-specific fix explaining what it targets, and check history/comments before removing anything that looks unexplained.',
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
        <SectionTitle>Real Rendering Bugs and DevTools Signals This Topic Actually Produces</SectionTitle>

        {[
          {
            error: `A layout that renders correctly in Chrome/Firefox but visibly breaks only in Safari, with no console error at all`,
            cause: 'CSS rendering differences almost never throw a JavaScript-visible error — the browser silently applies its own interpretation of ambiguous or engine-specific behavior, most commonly around flexbox sizing, position: sticky inside certain containers, or viewport units (100vh) accounting for mobile browser chrome differently.',
            fix: 'Follow the systematic debugging workflow from Part 07: isolate the minimal reproduction, compare Computed panel values across browsers, and search for the specific named quirk once the exact divergent property is identified.',
          },
          {
            error: `A property or value appears struck through, greyed out, in the DevTools Styles panel`,
            cause: 'The browser parsed the CSS rule successfully but does not recognize that specific property or value as valid — commonly a typo, an unsupported value for that property in this engine, or a property that genuinely does not exist yet in this browser.',
            fix: 'Check the property/value pair on caniuse.com to confirm real support status in the browser showing the strike-through, and add an @supports fallback if the feature is not yet universally available across your target browsers.',
          },
          {
            error: `caniuse.com shows a feature as "Partial support" with a note, rather than a clean checkmark`,
            cause: 'The browser implements the feature but with some caveat — often missing a specific value, a performance limitation, or a slightly different default behavior than the spec describes.',
            fix: 'Read the specific partial-support note on caniuse for that browser before shipping — it usually describes exactly the edge case that will bite you, letting you address it proactively instead of via a bug report.',
          },
          {
            error: `A Lighthouse or PostCSS build warning about outdated or unnecessary vendor prefixes`,
            cause: 'A hand-written prefixed rule remains in the CSS for a property that no longer needs it for any browser in the project\'s actual browserslist target.',
            fix: 'Remove the manual prefix and let Autoprefixer regenerate only what is actually still required, based on the current browserslist configuration.',
          },
          {
            error: `An element\'s computed height/width is 0 or unexpectedly collapsed in only one browser, despite explicit CSS sizing rules`,
            cause: 'Very often a nested-flexbox or nested-grid sizing edge case — a child element failing to inherit or stretch to an ancestor\'s height in one engine due to a missing explicit height/min-height somewhere in the chain, exactly as in this module\'s Real World Safari example.',
            fix: 'Compare the box model diagram for the element across browsers to confirm which ring collapses, then add the missing explicit height or min-height: 0 at the specific level in the chain where the browsers diverge — commented, so the fix is not mistaken for dead code later.',
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
        'Browsers run different rendering engines (Blink, WebKit, Gecko) implementing the same specs on different timelines, with some behavior genuinely implementation-defined — differences are learnable, not random.',
        'Hand-writing vendor prefixes is largely obsolete for modern CSS — Autoprefixer, driven by a browserslist configuration, injects exactly the prefixes your actual target browsers still need.',
        '@supports tests real feature support and lets you ship a genuine fallback for browsers lacking a feature — a different job from Autoprefixer, which only adjusts syntax for features already supported.',
        'The Computed panel shows the browser\'s final resolved value for every property after the full cascade — the fastest way to see what actually happened, rather than re-deriving specificity by reading source.',
        'The box model diagram shows real, live pixel values for content/padding/border/margin — comparing it across two browsers instantly narrows a sizing bug to a specific layer.',
        'A systematic debugging workflow (reproduce, isolate, check caniuse, compare computed values, compare box model, search for a known quirk, fix narrowly) turns "mysterious browser bug" into a repeatable process.',
        'Safari has a real, documented history of specific flexbox/sticky/viewport-unit quirks — checking Safari specifically before shipping layout-heavy work is worth the time, not paranoia.',
        'Avoid user-agent sniffing as a fix — it is unreliable and fragile across browser updates. Prefer feature detection (@supports) and narrowly scoped, well-commented overrides.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 40 is the capstone of the entire track — building a complete, real, responsive website
          end to end, combining Flexbox and Grid layout, responsive images, animations, accessibility, and
          mobile-first breakpoints into one genuine multi-section build.
        </p>
        <Link href="/learn/html-css/building-a-responsive-website" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 40 → Building a Complete Responsive Website
        </Link>
      </div>
    </LearnLayout>
  )
}
