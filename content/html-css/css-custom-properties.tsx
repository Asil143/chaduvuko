import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Custom Properties (Variables) — HTML & CSS | Chaduvuko',
  description:
    'Native CSS variables in depth — declaration and var() usage, global vs component-level scoping, fallback values, a real worked design-system example, and how custom properties differ fundamentally from Sass variables.',
}

const C = '#4285f4'

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

export default function CssCustomProperties() {
  return (
    <LearnLayout
      title="CSS Custom Properties (Variables)"
      description="Native CSS variables — scoping, fallbacks, and using them to build a real, maintainable design system without a preprocessor."
      section="HTML & CSS — Module 30"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Declaring and Using a Custom Property" />
        <SectionTitle>--variable-name and var() — CSS&apos;s Native Variables</SectionTitle>

        <Para>
          A CSS custom property is declared with a name that starts with two dashes, and is read back
          with the <code>var()</code> function. Unlike almost every other CSS feature, custom properties
          are not a fixed, predefined set of keywords — you invent the name yourself, exactly like naming
          a variable in any programming language.
        </Para>

        <CodeBox label="Declaring and reading a custom property">{`:root {
  --brand-color: #4285f4;
}

.button {
  background: var(--brand-color);
  border: 2px solid var(--brand-color);
}`}</CodeBox>

        <Para>
          <code>:root</code> is a selector that matches the document&apos;s root element —{' '}
          <code>&lt;html&gt;</code> — and is the conventional place to declare custom properties meant to
          be available everywhere on the page (covered fully in Part 02). Once declared, any descendant
          element can read the value back with <code>var(--brand-color)</code>, and the property behaves
          like any other CSS value wherever it is used.
        </Para>

        <Callout type="info">
          The double-dash prefix is not decoration — it is what tells the CSS parser this is a custom
          property rather than a built-in one. <code>--brand-color</code> and <code>brand-color</code>{' '}
          (no dashes) are completely different things; only the dashed form can be declared and read with{' '}
          <code>var()</code>.
        </Callout>

        <SubTitle>A custom property can hold almost any valid CSS value</SubTitle>

        <Para>
          Custom properties are not limited to colors. A custom property can hold a length, a font stack,
          a full shorthand value, a gradient, even a comma-separated list — anything that is valid CSS
          syntax can live inside one.
        </Para>

        <CodeBox label="Custom properties holding several different value types">{`:root {
  --spacing-md: 16px;
  --font-stack: 'Inter', system-ui, sans-serif;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  --transition-fast: 150ms ease-out;
}

.card {
  padding: var(--spacing-md);
  font-family: var(--font-stack);
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-fast);
}`}</CodeBox>

        <Para>
          One meaningful restriction is worth knowing early: a custom property cannot be used as a
          property <em>name</em>, a selector, or an at-rule keyword — only as a value. You cannot write{' '}
          <code>var(--property-name): red;</code> to dynamically choose which property gets set; custom
          properties substitute values, not CSS syntax structure itself.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Scoping" />
        <SectionTitle>:root for Global Tokens, Any Selector for Local Overrides</SectionTitle>

        <Para>
          Custom properties follow the normal cascade and inheritance rules of CSS — a property declared
          on an element is available to that element and every one of its descendants, exactly like{' '}
          <code>color</code> or <code>font-family</code>. This is the mechanism that makes them genuinely
          more powerful than a simple find-and-replace variable system: the <em>same</em>{' '}
          <code>var(--accent-color)</code> reference can resolve to a different actual value depending on
          where in the DOM it is read.
        </Para>

        <CodeBox label="A global default, overridden for one specific component">{`:root {
  --accent-color: #4285f4;   /* the site-wide default */
}

.promo-banner {
  --accent-color: #facc15;   /* only inside .promo-banner, this wins instead */
}

.button {
  background: var(--accent-color);
}

/* A .button anywhere on the page renders blue.
   A .button nested inside .promo-banner renders yellow — same rule, same
   var() reference, different resolved value, purely from DOM position. */`}</CodeBox>

        <Para>
          This is the core idea behind component-scoped theming: define a small set of custom properties
          at the top of a component&apos;s own selector, let every rule inside that component reference
          them, and any parent context can locally override just those specific properties without
          touching the component&apos;s CSS at all.
        </Para>

        <CodeBox label="A card component that themes itself entirely off local custom properties">{`.card {
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
  --card-text: #1a1a1a;

  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--card-text);
  border-radius: 8px;
  padding: 20px;
}

/* A dark variant needs to override exactly three values — nothing else */
.card--dark {
  --card-bg: #1e293b;
  --card-border: #334155;
  --card-text: #f1f5f9;
}`}</CodeBox>

        <Callout type="tip">
          A component whose entire visual identity is driven by a small handful of custom properties at
          the top of its own selector is trivially themeable — a variant class only needs to override
          those properties, not duplicate every rule underneath them. This pattern scales to dozens of
          variants without the CSS itself growing at all.
        </Callout>

        <SubTitle>Custom properties inherit — but they do not "leak" upward</SubTitle>

        <Para>
          A property declared inside <code>.card</code> is visible to every descendant of{' '}
          <code>.card</code>, but is completely invisible outside it — a sibling element, or the page
          background, has no access to <code>--card-bg</code> at all unless it is itself nested inside a{' '}
          <code>.card</code>. This is exactly how normal CSS inheritance already works for properties like{' '}
          <code>color</code>; custom properties simply extend that same, familiar mental model to
          author-defined values.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Fallback Values" />
        <SectionTitle>var()&apos;s Second Argument — What Happens If the Property Isn&apos;t Set</SectionTitle>

        <Para>
          <code>var()</code> accepts an optional second argument: a fallback value to use if the custom
          property it references has not been declared anywhere in scope. This makes components resilient
          to being dropped into a page that never defined the expected variables at all.
        </Para>

        <CodeBox label="var() with a fallback">{`.badge {
  background: var(--badge-color, #6b7280);
  /* If --badge-color was never declared anywhere in scope,
     the badge falls back to a sensible default gray instead of
     rendering with no background color at all. */
}`}</CodeBox>

        <Para>
          The fallback only activates when the referenced custom property is entirely{' '}
          <strong>undeclared</strong> or is invalid for the property it&apos;s used on — it is not the
          same thing as checking for an empty string or a falsy value the way a fallback works in
          JavaScript. A custom property that has been explicitly set, even to something unusual, is
          considered declared and will not trigger the fallback.
        </Para>

        <CodeBox label="A fallback chain — falling back to another var(), which itself has a fallback">{`.tooltip {
  background: var(--tooltip-bg, var(--surface-color, #333));
  /* Tries --tooltip-bg first.
     If that's undeclared, tries --surface-color.
     If THAT is also undeclared, finally falls back to #333. */
}`}</CodeBox>

        <Callout type="warning">
          <strong>An invalid value inside a custom property does not fall back the way you might expect.</strong>{' '}
          If <code>--spacing</code> is declared as the literal string <code>"not-a-length"</code> and used
          in <code>padding: var(--spacing, 16px);</code>, the fallback is <em>not</em> used, because{' '}
          <code>--spacing</code> was technically declared. Instead, <code>padding</code> becomes invalid
          for that element and falls back to its own CSS-wide initial or inherited value — a subtly
          different failure mode than a missing variable, and a real source of confusing bugs when a
          value comes from a CMS or user input.
        </Callout>

        <SubTitle>Fallbacks are especially useful for library and design-system components</SubTitle>

        <Para>
          A reusable component shipped to multiple teams or projects cannot assume every consumer has set
          up the same design tokens. Giving every custom property reference a sensible fallback means the
          component renders reasonably out of the box, and a consuming team only needs to declare the
          specific tokens they actually want to override.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — A Worked Design-System Example" />
        <SectionTitle>Building a Real, Small Design System With Custom Properties</SectionTitle>

        <Para>
          The genuine payoff of custom properties shows up once you build a real, consistent set of
          design tokens — a color palette and a spacing scale — and use them everywhere, rather than
          repeating raw hex codes and pixel values across dozens of unrelated rules.
        </Para>

        <CodeBox label="Step 1 — define the tokens once, at the root">{`:root {
  /* Color palette */
  --color-primary: #4285f4;
  --color-primary-dark: #2f5fc4;
  --color-surface: #ffffff;
  --color-surface-alt: #f8fafc;
  --color-border: #e2e8f0;
  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-danger: #dc2626;

  /* Spacing scale — a consistent multiple of a single base unit */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;

  /* Radius and shadow tokens */
  --radius-md: 8px;
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}`}</CodeBox>

        <CodeBox label="Step 2 — every component consumes tokens, never raw values">{`.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
  padding: var(--space-lg);
}

.card__title {
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.card__meta {
  color: var(--color-text-muted);
  font-size: 13px;
}

.button--primary {
  background: var(--color-primary);
  color: #fff;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
}

.button--primary:hover {
  background: var(--color-primary-dark);
}

.alert--danger {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}`}</CodeBox>

        <Para>
          Every visual decision — what "primary blue" is, how much padding a "medium" gap means, what
          radius counts as "rounded" — lives in exactly one place. Changing <code>--color-primary</code>{' '}
          from blue to a rebrand green updates every button, link, and highlighted element across the
          entire site simultaneously, with a single line changed.
        </Para>

        <CodeBox label="Step 3 — a rebrand, in one line">{`:root {
  --color-primary: #16a34a;   /* was #4285f4 — every consumer updates instantly */
}`}</CodeBox>

        <Callout type="tip">
          This is the actual definition of a "design token": a named, reusable value that represents a
          design decision, decoupled from any single place it&apos;s used. Custom properties are the
          native CSS mechanism for implementing design tokens directly in the browser, with no build step
          required to see the effect of a change.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Runtime Nature of Custom Properties" />
        <SectionTitle>Live in DevTools, Live in JavaScript, Live Across Media Queries</SectionTitle>

        <Para>
          The single most important thing that separates a CSS custom property from a preprocessor
          variable (Sass, covered fully in Part 07) is that a custom property is a genuine, live part of
          the rendered page — resolved by the browser at <strong>runtime</strong>, not compiled away
          before the browser ever sees the file. This has consequences that are worth seeing concretely.
        </Para>

        <SubTitle>1. It is inspectable and editable directly in browser DevTools</SubTitle>

        <Para>
          Opening any element in the browser&apos;s DevTools "Computed" or "Styles" panel shows every
          custom property currently in scope for that element, with its actually resolved value — and
          most browsers let you edit that value live and watch the page update instantly, with no rebuild
          step. This alone makes debugging a theming issue dramatically faster than tracing a preprocessor
          variable back through a compiled stylesheet.
        </Para>

        <SubTitle>2. JavaScript can read and write it directly</SubTitle>

        <CodeBox label="Reading and setting a custom property from JavaScript">{`// Read the current value of a custom property
const styles = getComputedStyle(document.documentElement)
const primary = styles.getPropertyValue('--color-primary').trim()

// Set it — every element referencing var(--color-primary) updates immediately
document.documentElement.style.setProperty('--color-primary', '#16a34a')`}</CodeBox>

        <Para>
          This is genuinely impossible with a Sass variable, because Sass variables do not exist anymore
          once compilation has finished — there is nothing left in the shipped CSS file for JavaScript to
          find or change. A live custom property is the mechanism behind features like a user-controlled
          accent color picker, or an interactive theme switcher that updates instantly with no page
          reload.
        </Para>

        <SubTitle>3. Its value can change per media query, without duplicating every rule</SubTitle>

        <CodeBox label="A single token that changes value under a media query — every consumer updates automatically">{`:root {
  --content-padding: 16px;
}

@media (min-width: 768px) {
  :root {
    --content-padding: 32px;
  }
}

.page-content {
  padding: var(--content-padding);
}
/* No media query needed inside .page-content itself — it just reads
   whatever --content-padding currently resolves to. */`}</CodeBox>

        <Para>
          This is a genuinely different pattern from writing a separate media query per component — the
          responsive logic lives once, at the token definition, and every rule that consumes the token
          automatically inherits the responsive behavior without repeating a single media query.
        </Para>

        <Callout type="info">
          The same mechanism is exactly how most production dark-mode implementations work: a{' '}
          <code>prefers-color-scheme</code> media query (or a manually toggled class) redefines a small
          set of color tokens at <code>:root</code>, and every component that already consumes those
          tokens re-themes itself automatically — with zero component-level code aware that dark mode
          exists at all.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — A Dark Mode Toggle, Built Entirely on Tokens" />
        <SectionTitle>Putting Runtime Scoping and Redefinition Together</SectionTitle>

        <Para>
          Combining scoping (Part 02) with the runtime redefinition idea from Part 05 produces the
          standard, production-grade pattern for a light/dark theme toggle — no JavaScript theming
          library, no duplicated component CSS, just custom properties redefined at two different scopes.
        </Para>

        <CodeBox label="Defining light and dark token sets">{`:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --text: #1a1a1a;
  --border: #e2e8f0;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #f1f5f9;
  --border: #334155;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
}`}</CodeBox>

        <CodeBox label="Toggling the theme — one attribute, zero component changes">{`const toggleButton = document.querySelector('#theme-toggle')

toggleButton.addEventListener('click', () => {
  const root = document.documentElement
  const isDark = root.getAttribute('data-theme') === 'dark'
  root.setAttribute('data-theme', isDark ? 'light' : 'dark')
})`}</CodeBox>

        <Para>
          Every component on the page — <code>.card</code>, and anything else written against{' '}
          <code>var(--surface)</code>, <code>var(--text)</code>, and <code>var(--border)</code> — re-themes
          instantly the moment the <code>data-theme</code> attribute changes, because the browser
          re-resolves every <code>var()</code> reference against the new values live. No component file
          needed to know dark mode was even a feature.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — vs Sass Variables" />
        <SectionTitle>Custom Properties vs Sass Variables — Two Genuinely Different Tools</SectionTitle>

        <Para>
          This site covers Sass properly, in full, later in this phase — this section exists only to draw
          the one distinction that matters most and that engineers coming from a Sass background
          frequently get wrong: <strong>a Sass variable and a CSS custom property solve superficially
          similar problems in fundamentally different ways.</strong>
        </Para>

        <CodeBox label="The same-looking declaration, in each system">{`/* Sass variable */
$primary-color: #4285f4;
.button { background: $primary-color; }

/* CSS custom property */
:root { --primary-color: #4285f4; }
.button { background: var(--primary-color); }`}</CodeBox>

        <Para>
          At a glance these look interchangeable. They are not, and the difference is exactly the runtime
          vs compile-time distinction from Part 05.
        </Para>

        <SubTitle>Sass variables are resolved once, at build time, and then disappear</SubTitle>

        <Para>
          A Sass compiler reads <code>$primary-color</code>, substitutes its literal value everywhere it
          is referenced, and produces plain CSS with no trace of the variable left in it at all. By the
          time a browser ever sees the file, <code>$primary-color</code> has been replaced by{' '}
          <code>#4285f4</code> as a hardcoded string, indistinguishable from a value that was always
          hardcoded.
        </Para>

        <CodeBox label="What the browser actually receives, after Sass compiles">{`/* The compiled output — the variable is completely gone */
.button {
  background: #4285f4;
}`}</CodeBox>

        <Para>
          This means a Sass variable cannot be inspected in DevTools (there is nothing left to inspect —
          just a plain color value), cannot be changed by JavaScript at runtime, and cannot resolve to a
          different value depending on where in the DOM it happens to be used — because by the time the
          page is running, the "variable" was never a real, live concept to begin with.
        </Para>

        <SubTitle>A side-by-side comparison</SubTitle>

        <CodeBox label="Feature comparison">{`                          Sass variable          CSS custom property
Resolved                 At compile time         At runtime, in the browser
Visible in DevTools       No — already gone       Yes — inspectable and editable
Changeable via JS         No                       Yes — setProperty() / getPropertyValue()
Scoped to DOM position    No — purely lexical      Yes — follows the cascade and inheritance
Works with :root theming  No native mechanism      Yes — this IS the mechanism
Needs a build step        Yes                       No`}</CodeBox>

        <Callout type="warning">
          This does not make Sass variables obsolete — they remain genuinely useful for build-time
          logic that has no runtime equivalent at all, like conditionally generating entire blocks of CSS,
          or computing values with Sass&apos;s math and control-flow functions before any CSS is even
          produced. In real, modern codebases, it is common to see both used together: Sass for
          build-time authoring convenience, and custom properties specifically for anything that needs to
          be live, themeable, or JavaScript-accessible in the browser. The full Sass module later in this
          phase covers this coexistence in more depth.
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
        <SectionTitle>A White-Label Rebrand at a Seattle SaaS Company</SectionTitle>

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
            Scenario — B2B SaaS, Seattle · White-label theming requirement
          </div>

          <Para>
            A Seattle-based project management SaaS product sells a white-label tier: enterprise
            customers can apply their own brand colors to the dashboard their employees use. The existing
            CSS, written years earlier with Sass variables compiled once at build time, hardcodes the
            company&apos;s own brand blue directly into the compiled output shipped to every customer.
          </Para>

          <CodeBox label="The original Sass-based theming attempt">{`// _variables.scss
$brand-primary: #4285f4;

// button.scss
.button--primary {
  background: $brand-primary;
}
// Compiled output ships with #4285f4 hardcoded — no runtime hook exists
// to change it per customer without recompiling and redeploying the entire
// CSS bundle for every single white-label customer.`}</CodeBox>

          <SubSubTitle>Why the Sass-only approach cannot support this feature</SubSubTitle>

          <Para>
            Supporting per-customer branding with Sass variables alone would require either maintaining a
            separate compiled stylesheet per customer (an operational nightmare that does not scale past
            a handful of accounts) or recompiling and redeploying CSS every time a customer updates their
            brand color in a settings page — completely impractical for a self-serve setting a customer
            expects to see reflected instantly.
          </Para>

          <SubSubTitle>The fix — custom properties, set once per session from the customer&apos;s saved settings</SubSubTitle>

          <CodeBox label="The rewrite — a runtime-settable token feeding every component">{`/* CSS ships with a sensible default, using the token everywhere */
:root {
  --brand-primary: #4285f4;   /* fallback until overridden */
}

.button--primary {
  background: var(--brand-primary);
}

.nav__link--active {
  border-bottom-color: var(--brand-primary);
}

.badge--primary {
  background: var(--brand-primary);
}`}</CodeBox>

          <CodeBox label="Applying the customer's brand color at page load, from their saved settings">{`async function applyCustomerBranding() {
  const settings = await fetchWorkspaceSettings()
  if (settings.brandPrimaryColor) {
    document.documentElement.style.setProperty(
      '--brand-primary',
      settings.brandPrimaryColor
    )
  }
}

applyCustomerBranding()
// Every component referencing var(--brand-primary) re-themes instantly —
// no CSS recompile, no per-customer stylesheet, no redeploy.`}</CodeBox>

          <Para>
            The same compiled CSS bundle ships to every customer unchanged; only a single custom property
            differs, set once at page load from a value stored in the customer&apos;s workspace settings.
            The engineering team keeps Sass for everything it was already good at — nesting, mixins, and
            build-time convenience — and layers custom properties in specifically for the one requirement
            Sass genuinely could not satisfy: a value that needs to change per customer, at runtime,
            without a rebuild.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Custom Properties</SectionTitle>

        {[
          {
            wrong: '"CSS custom properties and Sass variables are basically the same feature with different syntax"',
            right: 'Sass variables are resolved once at compile time and leave no trace in the shipped CSS — they cannot be inspected in DevTools, read or changed by JavaScript, or scoped by DOM position. Custom properties are live, runtime values the browser re-resolves continuously, which is what makes DOM-scoped theming and JavaScript-driven theme switching possible at all.',
          },
          {
            wrong: '"You should always declare custom properties on :root, since that\'s where they belong"',
            right: ':root is the right place for genuinely global design tokens (a color palette, a spacing scale) — but component-scoped custom properties, declared directly on a component\'s own selector, are equally valid and are what makes a single component themeable by its parent context without rewriting its CSS, as shown in Part 02.',
          },
          {
            wrong: '"var()\'s fallback value works like a JavaScript default parameter — it kicks in whenever the value is falsy or empty"',
            right: 'The fallback only activates when the referenced custom property is entirely undeclared in scope. A custom property set to an unusual or even invalid value is still considered declared, and will not trigger the fallback — instead the property using it becomes invalid outright, a genuinely different failure mode.',
          },
          {
            wrong: '"Custom properties can\'t be used for anything except colors and simple values"',
            right: 'A custom property can hold nearly any valid CSS value or value list — a full box-shadow, a font stack, a transition shorthand, even a comma-separated gradient stop list — as shown across the design-system example in Part 04.',
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
            q: 'What is the fundamental difference between a CSS custom property and a Sass variable?',
            a: 'A Sass variable is resolved entirely at build/compile time — the compiler substitutes its literal value everywhere it is referenced, and the shipped CSS contains no trace of the variable at all. A CSS custom property is a genuine runtime value the browser resolves live, on every render — which is why it can be inspected and edited in DevTools, read and written by JavaScript via getPropertyValue()/setProperty(), and resolved differently depending on where in the DOM it is referenced, none of which a Sass variable can do.',
          },
          {
            q: 'How does scoping work for a custom property, and why does that make component-level theming possible?',
            a: 'Custom properties follow ordinary CSS cascade and inheritance — a property declared on a selector is available to that element and all of its descendants, and can be overridden by a more specific descendant scope. Declaring a small set of custom properties on a component\'s own top-level selector, and having every rule inside the component reference them, means a variant class or a parent context can re-theme the entire component by overriding just those few properties, without touching or duplicating any of the component\'s actual rules.',
          },
          {
            q: 'When does the fallback value in var(--x, fallback) actually get used?',
            a: 'Only when --x has not been declared anywhere in the current scope at all. It does not trigger for an empty string, zero, or any other CSS-falsy-seeming value the way a JavaScript default parameter would — those are still considered "declared." If --x is declared but holds a value invalid for the property using it, the fallback is not used either; the property becomes invalid and falls back to its own initial or inherited value instead.',
          },
          {
            q: 'Describe a real production use case where a custom property can do something a Sass variable genuinely cannot.',
            a: 'A user-facing theme toggle (light/dark mode) or a runtime-configurable brand color (e.g. white-label SaaS branding) both require a value the page can change after it has already loaded, in response to user interaction or fetched settings — with every component using that value updating immediately. A Sass variable is gone by the time the page is running, so it cannot support either use case without recompiling and redeploying the entire stylesheet; a custom property supports both natively, through document.documentElement.style.setProperty().',
          },
          {
            q: 'How would you implement a dark mode toggle using only custom properties, with no per-component code aware that dark mode exists?',
            a: 'Define a set of semantic color tokens (--bg, --surface, --text, --border, etc.) at :root with light-mode values, and redefine the same token names inside a second selector scope — either a [data-theme="dark"] attribute selector or a prefers-color-scheme media query — with dark-mode values. Every component is written only against var(--bg), var(--text), and so on, never against a raw color. Toggling the data-theme attribute (or the OS-level color scheme) causes the browser to re-resolve every var() reference across the whole page instantly, with zero changes needed in any individual component\'s CSS.',
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
        <SectionTitle>Custom Property Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the double-dash prefix',
            a: 'Writing brand-color: #4285f4; inside :root declares nothing usable — CSS silently ignores it as an unrecognized property. Custom properties must start with two dashes: --brand-color. This is easy to miss since the parser gives no error, it simply does nothing.',
          },
          {
            q: 'Declaring the same token inside every component instead of at a shared scope',
            a: 'Repeating --spacing-md: 16px; inside every individual component selector defeats the entire point of a shared design token — a change to the spacing scale now has to be made in dozens of places instead of one. Declare shared tokens once, at :root or a shared theme scope, and let components only reference them.',
          },
          {
            q: 'Expecting var() to work as a selector or property name',
            a: 'background-var(--property-name): red; and similar constructs are not valid CSS — a custom property can only be substituted as a value, never as part of the property name, selector, or at-rule syntax itself. Choosing which property to set dynamically requires JavaScript, not var().',
          },
          {
            q: 'Assuming a custom property is available before checking where it was declared',
            a: 'A custom property declared on .sidebar is not visible to an element outside .sidebar\'s subtree, even if that element is elsewhere on the same page. Trace the DOM position of both the declaration and the var() reference — inheritance only flows downward through descendants, exactly like any other inherited CSS property.',
          },
          {
            q: 'Relying on a var() fallback to catch an invalid value, not just a missing one',
            a: 'As covered in Part 03, the fallback only fires for an undeclared property — a custom property holding an actually invalid value for its target property does not fall back, it makes the whole declaration invalid. Validate values at the source (a CMS field, a user input) rather than assuming var()\'s fallback will catch bad data.',
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
        <SectionTitle>Errors and Rendering Bugs Custom Properties Produce — And Exactly Why</SectionTitle>

        {[
          {
            error: `A rule silently has no effect — no error in the console, no visible styling applied`,
            cause: 'The custom property name has a typo, or is missing the double-dash prefix, so var() is referencing a property that was never actually declared and has no fallback — CSS treats this as invalid and simply does not apply the declaration.',
            fix: 'Check the exact spelling of both the declaration and every var() reference — CSS custom property names are case-sensitive. Add a fallback value (var(--x, sensible-default)) during development to make a missing declaration visibly obvious instead of silently absent.',
          },
          {
            error: `A property that worked at :root stops applying once nested inside another component`,
            cause: 'A more specific selector further down the DOM tree redeclared the same custom property name with a different value, and the nested element is now inheriting that closer, overriding value instead of the one from :root.',
            fix: 'Use DevTools\' "Computed" panel on the affected element to see exactly which scope is currently winning for that custom property, then either rename one of the conflicting declarations or intentionally rely on the override if it is the desired theming behavior.',
          },
          {
            error: `console.log of getPropertyValue('--x') returns an empty string even though the CSS clearly declares it`,
            cause: 'getComputedStyle() was called on the wrong element — one that is not actually a descendant of the element where --x was declared — or the property was declared inside a selector that doesn\'t currently match any rendered element on the page.',
            fix: 'Call getComputedStyle() on the specific element (or a descendant of it) where the custom property is expected to be in scope, not on an unrelated or ancestor element outside that scope.',
          },
          {
            error: `A JavaScript-set custom property doesn't visibly change anything, even though setProperty() ran without error`,
            cause: 'setProperty() was called on an element whose CSS rules do not actually reference that custom property via var() anywhere, or a more specific, later CSS rule is overriding the property directly rather than reading it from the variable at all.',
            fix: 'Confirm the CSS rule you expect to update is actually written as var(--your-property) rather than a hardcoded value, and check DevTools to see whether a more specific selector is winning the cascade regardless of the custom property\'s value.',
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
        'A custom property is declared with a double-dash prefix (--name: value;) and read back with var(--name) — the name is author-chosen, not a fixed CSS keyword.',
        'Custom properties follow the normal CSS cascade and inheritance — declare shared tokens at :root for global scope, and on a specific selector for component-level theming that a parent context can override.',
        'var() accepts an optional fallback (var(--x, fallback)) that activates only when --x is entirely undeclared in scope — not for empty, zero, or otherwise "falsy" values, and not for a declared-but-invalid value.',
        'A real design system is built by defining a color palette and spacing scale once as tokens, then having every component consume the tokens instead of repeating raw values.',
        'Custom properties are resolved at runtime in the browser — inspectable and editable in DevTools, readable/writable via JavaScript (getPropertyValue()/setProperty()), and capable of changing under a media query without duplicating rules.',
        'The light/dark theme pattern redefines a small set of semantic color tokens inside a [data-theme="dark"] scope (or a prefers-color-scheme query) — every consuming component re-themes automatically with zero component-level changes.',
        'Sass variables are resolved once at compile time and leave no trace in the shipped CSS — they cannot be inspected, changed by JavaScript, or scoped by DOM position, which is the core distinction from custom properties.',
        'Real codebases often use both: Sass for build-time authoring convenience, custom properties specifically for anything that needs to be live, themeable, or JavaScript-accessible at runtime.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          With variables in place, the next module covers CSS transitions — how to make state changes
          feel smooth, which properties animate cheaply versus expensively, and the timing functions that
          control how motion feels.
        </p>
        <Link href="/learn/html-css/css-transitions" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next → CSS Transitions
        </Link>
      </div>
    </LearnLayout>
  )
}
