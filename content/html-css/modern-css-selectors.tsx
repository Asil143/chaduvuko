import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Modern Selectors — :has, :is, :where, Container Queries — HTML & CSS | Chaduvuko',
  description:
    'The newest selectors that changed how CSS is written — the parent selector finally arrives, plus container queries for truly component-based responsive design.',
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

export default function ModernCssSelectors() {
  return (
    <LearnLayout
      title="Modern Selectors — :has, :is, :where, Container Queries"
      description="The newest selectors that changed how CSS is written — the parent selector finally arrives, plus container queries for truly component-based responsive design."
      section="HTML & CSS — Module 34"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — :has()" />
        <SectionTitle>:has() — The Parent Selector CSS Never Had, Until Now</SectionTitle>

        <Para>
          For as long as CSS has existed, selectors could only describe an element by looking at itself
          or its ancestors — never by looking at its own descendants and reacting to what is found there.
          You could style a <code>&lt;div&gt;</code> because it was inside a <code>.card</code>, but you
          could never style the <code>.card</code> itself based on what happened to be sitting inside it.
          This missing capability was informally called "the parent selector problem," and it was one of
          the most frequently requested CSS features for over a decade. <code>:has()</code> finally solves
          it.
        </Para>

        <CodeBox label=":has() styles an element based on what it CONTAINS">{`/* Style a .card differently, but ONLY if it contains an <img> */
.card:has(img) {
  border: 2px solid var(--accent);
}

/* Style a form field wrapper differently if the input inside is invalid */
.field:has(input:invalid) {
  border-color: red;
}

/* Style a .field differently if it has a CHECKED checkbox inside it */
.field:has(input[type="checkbox"]:checked) {
  background: #eefbea;
}`}</CodeBox>

        <Para>
          Read <code>:has()</code> as "an element that has, somewhere inside it, something matching this
          selector." The argument to <code>:has()</code> can be any valid selector — a tag name, a class,
          an attribute selector, a pseudo-class like <code>:checked</code> or <code>:invalid</code>, or a
          combination of several, exactly as complex as any selector you would write elsewhere.
        </Para>

        <SubTitle>The practical use case that comes up constantly: styling a label from its input&apos;s state</SubTitle>

        <Para>
          One of the single most common real-world uses of <code>:has()</code> is styling a form
          field&apos;s label (or its entire wrapper) based on the validation state of the input living
          next to it — something that previously required JavaScript, because CSS could style the input
          itself with <code>:invalid</code>, but had no way to reach "upward and sideways" to the label.
        </Para>

        <CodeBox label="Live validation styling with zero JavaScript">{`<div class="form-field">
  <label for="email">Email address</label>
  <input type="email" id="email" required>
  <span class="error-text">Please enter a valid email</span>
</div>`}</CodeBox>

        <CodeBox label="The CSS — :has() reaches into the field and reacts to the input's state">{`.form-field .error-text {
  display: none;
}

/* Show the error text and highlight the label ONLY when the input
   inside this field is both invalid AND has already been interacted with */
.form-field:has(input:invalid:not(:placeholder-shown)) label {
  color: #d32f2f;
}

.form-field:has(input:invalid:not(:placeholder-shown)) .error-text {
  display: block;
  color: #d32f2f;
}

.form-field:has(input:valid) label {
  color: #2e7d32;
}`}</CodeBox>

        <Para>
          <code>:not(:placeholder-shown)</code> is the standard trick for avoiding a "wrong from the
          moment the page loads" error message on an empty required field — it only counts as a match
          once the placeholder is no longer showing, meaning the user has actually typed something.
          Before <code>:has()</code>, this entire interaction required a JavaScript event listener
          watching the input and manually toggling a class on the label; now it is three CSS rules with
          no script involved at all.
        </Para>

        <Callout type="tip">
          <code>:has()</code> also unlocks conditional layout that used to require extra wrapper divs or
          JavaScript class toggling — for example, <code>{`.grid:has(> :nth-child(5))`}</code> can apply a
          different grid layout only when a container has five or more direct children, letting your CSS
          react to how much content actually ended up there.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — :is()" />
        <SectionTitle>:is() — Collapsing Repetitive Selector Lists</SectionTitle>

        <Para>
          <code>:is()</code> takes a list of selectors and matches any element that matches at least one
          of them — its entire purpose is letting you write a shared "trunk" of a selector once, instead
          of repeating it across several nearly-identical rules.
        </Para>

        <CodeBox label="Without :is() — the same trailing selector repeated four times">{`header nav a:hover,
main nav a:hover,
footer nav a:hover,
aside nav a:hover {
  color: var(--accent);
}`}</CodeBox>

        <CodeBox label="With :is() — the varying part is factored into one place">{`:is(header, main, footer, aside) nav a:hover {
  color: var(--accent);
}`}</CodeBox>

        <Para>
          This is not just shorter — it is genuinely easier to maintain, because adding a fifth context
          (say, a <code>.sidebar</code>) is a one-word edit inside the parentheses, rather than an
          entirely new duplicated selector line that has to be kept in sync with the other four by hand.
        </Para>

        <CodeBox label=":is() can appear anywhere in a selector, not just at the start">{`/* Match any heading (h1 through h4) that is the first child of ANY of
   these three container types */
:is(article, section, aside) > :is(h1, h2, h3, h4):first-child {
  margin-top: 0;
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — :where()" />
        <SectionTitle>:where() — Identical Matching, Zero Specificity</SectionTitle>

        <Para>
          <code>:where()</code> matches exactly the same elements as <code>:is()</code> given the same
          arguments — the only difference between them is specificity, and that difference is the entire
          reason both exist rather than just one.
        </Para>

        <CodeBox label="The one and only difference between :is() and :where()">{`/* :is() takes the specificity of its MOST SPECIFIC argument */
:is(#sidebar, .card, p) { color: blue; }
/* This selector's specificity is that of #sidebar — an ID — even though
   .card and p are also valid matches. The whole rule inherits the HIGHEST
   specificity among its arguments. */

/* :where() ALWAYS has zero specificity, no matter what's inside it */
:where(#sidebar, .card, p) { color: blue; }
/* This selector has ZERO specificity — literally 0,0,0,0 — regardless of
   the fact that #sidebar is an ID. It is as if the selector wasn't
   specific at all. */`}</CodeBox>

        <Para>
          This matters enormously for anyone building a reusable component library or a base stylesheet
          meant to be easily overridden. Base styles written with <code>:where()</code> are trivially easy
          for a consumer of the library to override with a single, low-specificity class — because the
          library&apos;s own selector contributes nothing to the specificity fight at all.
        </Para>

        <CodeBox label="A design-system base style, easily overridable because it uses :where()">{`/* Design system base file */
:where(.btn) {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
}

/* Consumer's page — this single class easily wins, because the
   base rule above contributes ZERO specificity */
.btn { padding: 8px 14px; }`}</CodeBox>

        <CodeBox label="The same base style written with :is() instead — much harder to override">{`:is(.btn) {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
}
/* :is(.btn) has the specificity of a single class — .10px value — so a
   plain .btn override rule written later still wins here (same specificity,
   later rule in source order wins), but the moment the base file wraps
   ANYTHING more specific in :is(), overriding gets meaningfully harder
   than it would be with :where(), which is why component libraries default
   to :where() for anything meant to be a customizable base style. */`}</CodeBox>

        <Callout type="info">
          A simple rule for choosing between them: reach for <code>:where()</code> whenever you are
          writing base or reset styles meant to be easy for someone else (or future-you) to override
          later. Reach for <code>:is()</code> when you specifically want the selector&apos;s specificity
          to matter and compete normally with the rest of your cascade, exactly like any ordinary
          selector would.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Container Queries: The Concept" />
        <SectionTitle>Why Media Queries Were Never Enough for Real Components</SectionTitle>

        <Para>
          A media query answers exactly one question: how big is the <strong>viewport</strong>? That is
          useful for page-level layout decisions — should the page use a single column or three — but it
          breaks down the moment you build genuinely reusable components, because a component&apos;s
          available width is very often not the same as the viewport&apos;s width. A card component might
          render at full viewport width in one place and inside a narrow 240px sidebar in another — a
          media query has no way to tell those two situations apart, because both happen on the exact
          same viewport size.
        </Para>

        <CodeBox label="The problem media queries cannot solve">{`/* This media query fires based on the VIEWPORT — but the same .card
   component might be rendered in a wide main column OR a narrow sidebar
   at the exact same viewport width. Media queries cannot tell them apart. */
@media (min-width: 700px) {
  .card { display: flex; }
}`}</CodeBox>

        <Para>
          Container queries invert the question entirely: instead of asking "how wide is the viewport,"
          they ask "how wide is the space THIS component has actually been given by its own container?"
          That is a fundamentally more useful question for a component meant to be dropped into different
          layout contexts across a real site.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Container Queries: The Syntax" />
        <SectionTitle>container-type and @container — Setting Up and Using a Query Container</SectionTitle>

        <Para>
          Using a container query is a two-step process. First, you mark an element as a "query
          container" using the <code>container-type</code> property — this opts that element in to
          having its size tracked. Second, you write an <code>@container</code> rule that targets
          descendants of that container, based on the container&apos;s size rather than the viewport&apos;s.
        </Para>

        <CodeBox label="Step 1 — mark the container">{`.card-wrapper {
  container-type: inline-size;
  /* "inline-size" means: track the container's width (in a standard
     left-to-right, top-to-bottom writing mode). This is by far the
     most common value — container queries are almost always about width. */
  container-name: card;
  /* optional — names the container so @container rules can target it
     specifically, useful when containers are nested */
}`}</CodeBox>

        <CodeBox label="Step 2 — query the container's size">{`@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
  .card-image {
    width: 40%;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}`}</CodeBox>

        <Para>
          Every rule inside the <code>@container</code> block applies based on <strong>that container&apos;s</strong>{' '}
          measured width — completely independent of the browser viewport. The exact same{' '}
          <code>.card</code> component, with this CSS, lays out horizontally when its container happens
          to be wide (a main content column) and stacks vertically when its container happens to be
          narrow (a sidebar widget) — on the identical viewport width, at the identical moment, in the
          identical page.
        </Para>

        <CodeBox label="The shorthand form of container-type + container-name">{`.card-wrapper {
  container: card / inline-size;
  /* shorthand: <container-name> / <container-type> */
}`}</CodeBox>

        <Callout type="warning">
          An element cannot query its own size — <code>container-type</code> must be set on an{' '}
          <strong>ancestor</strong> of whatever you are trying to style with <code>@container</code>, not
          on the element itself. This trips up almost everyone the first time: setting{' '}
          <code>container-type: inline-size</code> directly on <code>.card</code> and then writing{' '}
          <code>@container (min-width: 400px) &#123; .card &#123; ... &#125; &#125;</code> simply does not
          work, because a container query rule always targets descendants of the container, never the
          container itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Container Query Units" />
        <SectionTitle>cqw, cqh, cqi, cqb — Sizing Relative to the Container, Not the Viewport</SectionTitle>

        <Para>
          Alongside <code>@container</code> rules, CSS also introduced a set of length units that
          resolve against the query container&apos;s dimensions, the same way <code>vw</code> and{' '}
          <code>vh</code> resolve against the viewport&apos;s dimensions. These let you size things
          proportionally to the component&apos;s own available space, without needing an{' '}
          <code>@container</code> block at all for simple proportional scaling.
        </Para>

        <CodeBox label="Container query units">{`.card-title {
  font-size: 8cqi;
  /* 8% of the query container's INLINE size (its width, in a standard
     writing mode) — the title scales up and down smoothly as the
     card's own container gets wider or narrower */
}

/* cqw  = 1% of the container's width
   cqh  = 1% of the container's height
   cqi  = 1% of the container's inline size (usually == cqw)
   cqb  = 1% of the container's block size (usually == cqh) */`}</CodeBox>

        <Para>
          These units require an ancestor with <code>container-type</code> set, exactly like{' '}
          <code>@container</code> rules do — without one, they fall back to behaving like the equivalent
          viewport unit in most browsers, which can silently produce the wrong sizing if you forget the
          container setup and only notice once the component is dropped into a genuinely narrow spot.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Shared Product Card Component at a Seattle Retail Platform</SectionTitle>

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
            Scenario — Retail platform, Seattle · Shared component library
          </div>

          <Para>
            A Seattle-based retail platform&apos;s design system team maintains a single{' '}
            <code>ProductCard</code> component used in three very different places: a wide three-column
            grid on the main shop page, a narrow single-column "recently viewed" rail in the sidebar, and
            a compact horizontal strip inside the checkout page&apos;s order summary. All three placements
            can appear on the exact same page, at the exact same viewport width.
          </Para>

          <CodeBox label="The old approach — a media query, plus a manual layout prop threaded through React">{`/* This can only react to the viewport, so engineers added a
   "compact" boolean prop, manually passed down from every parent
   that happened to know it was rendering the card in a narrow spot */
.product-card.compact {
  flex-direction: row;
}
.product-card {
  flex-direction: column;
}`}</CodeBox>

          <Para>
            Every new placement of <code>ProductCard</code> required someone to remember to pass the
            right layout prop by hand, based on knowledge of where the component happened to be getting
            rendered — knowledge that lived in the parent component, not the card itself. It broke twice
            in one quarter: once when the sidebar was widened during a redesign and nobody updated the
            prop, and once when a new "similar items" placement was added and the engineer simply forgot
            the prop existed.
          </Para>

          <SubSubTitle>The fix — the card decides its own layout, based on its own container</SubSubTitle>

          <CodeBox label="The container-query version — no prop, no parent knowledge required">{`.product-card-slot {
  container-type: inline-size;
  container-name: product-card;
}

.product-card {
  display: flex;
  flex-direction: column;
}

@container product-card (min-width: 320px) {
  .product-card {
    flex-direction: row;
  }
  .product-card-image {
    width: 45%;
  }
}`}</CodeBox>

          <Para>
            The <code>ProductCard</code> component itself now has zero knowledge of where it is being
            rendered — it simply measures the space its own wrapper was actually given and lays itself
            out accordingly. Dropping it into a new, narrower placement — the exact scenario that broke
            twice before — now just works automatically, with no prop to remember and no parent-side
            configuration to keep in sync. This is precisely the shift container queries represent:
            component-level responsiveness that travels with the component, instead of page-level
            responsiveness that has to be manually re-derived every time the component moves.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Modern Selectors</SectionTitle>

        {[
          {
            wrong: '":has() is just a fancy way to select a specific descendant"',
            right: ':has() selects the ANCESTOR based on what\'s inside it — the opposite direction from every other combinator in CSS. .card:has(img) selects the .card, not the img. This is precisely why it was called "the parent selector" — nothing else in CSS lets a selector\'s matched element depend on its own descendants.',
          },
          {
            wrong: '":is() and :where() are interchangeable — pick whichever one you remember"',
            right: 'They match identically, but :is() takes the specificity of its highest-specificity argument while :where() always contributes zero specificity. Using the wrong one can make a rule impossible to override later (with :is()) or unexpectedly easy to override (with :where()) — the choice is a deliberate specificity decision, not a stylistic preference.',
          },
          {
            wrong: '"Container queries replace media queries entirely"',
            right: 'They solve different problems and are commonly used together in the same project. Media queries remain the right tool for page-level, viewport-driven layout decisions (like switching a whole page from one column to three); container queries are for a component that needs to respond to the space IT was actually given, independent of the viewport.',
          },
          {
            wrong: '"You can set container-type directly on the element you want to style with @container"',
            right: 'An element cannot query its own size — container-type must be set on an ANCESTOR of whatever the @container rule targets. Setting it on the same element as the styled selector inside @container silently fails to work.',
          },
          {
            wrong: '":has() can only check for direct children"',
            right: ':has() matches any DESCENDANT by default, at any depth, exactly like a normal descendant combinator — .card:has(img) matches even if the img is nested several levels deep inside the card. Restricting it to direct children requires the child combinator explicitly, as in .card:has(> img).',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>6 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What problem does :has() solve that CSS could never solve before?',
            a: 'It is the first native CSS selector that can style an element based on its DESCENDANTS rather than only itself or its ancestors — informally "the parent selector." Before :has(), styling a container differently depending on what happened to be inside it (e.g. highlighting a form field wrapper because the input inside is invalid, or a card because it contains an image) required JavaScript to toggle a class manually.',
          },
          {
            q: 'What is the exact difference between :is() and :where(), given they match the same elements?',
            a: ':is() takes on the specificity of its single highest-specificity argument — so :is(#id, .class) has the specificity of an ID selector. :where() always has zero specificity, regardless of what is inside it, even an ID. This matters for how easy a rule is to override later: :where()-based rules are trivial to override with a single low-specificity class, which is why component libraries and CSS resets favor it for base styles.',
          },
          {
            q: 'Why can\'t a component author reliably use a media query to make a reusable card component responsive to its own placement?',
            a: 'A media query only knows the viewport\'s width — it cannot distinguish between the same component rendered in a wide main column versus a narrow sidebar at the identical viewport size, because both situations produce the same media query result. Container queries solve this by measuring the actual width the component\'s own container was given, independent of the viewport.',
          },
          {
            q: 'What two steps are required to use a container query, and what is the most common mistake made when setting one up?',
            a: 'First, mark an ancestor element with container-type (typically inline-size) to opt it into being measured. Second, write an @container rule targeting descendants of that container. The most common mistake is setting container-type on the same element being styled inside the @container rule — a container cannot query its own size, only descendants of a container can be targeted.',
          },
          {
            q: 'Give a concrete real-world use case for :has() beyond a toy example.',
            a: 'Styling a form field\'s label and error text based on the live validation state of the input inside it — e.g. .form-field:has(input:invalid:not(:placeholder-shown)) label turns the label red once the user has typed something invalid, with zero JavaScript. Another common one: styling a card component differently depending on whether it happens to contain an image, e.g. .card:has(img).',
          },
          {
            q: 'What are container query units (cqw, cqh, cqi, cqb), and how do they differ from vw/vh?',
            a: 'They are length units that resolve as a percentage of a query container\'s size instead of the viewport\'s size — cqi and cqw are typically the container\'s width, cqb and cqh its height. They require an ancestor with container-type set, exactly like @container rules, and let something like font-size scale proportionally to a component\'s own available space rather than the page\'s overall viewport.',
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
        <SectionTitle>Modern Selector Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            broken: `.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    /* fails silently — .card can't query its OWN container */
    flex-direction: row;
  }
}`,
            fixed: `.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    /* .card is a DESCENDANT of the query container, .card-wrapper */
    flex-direction: row;
  }
}`,
          },
          {
            broken: `/* Meant as a low-specificity, easily overridable base rule */
:is(.btn-base) {
  padding: 10px 16px;
}
/* A later ".btn" rule with equal specificity may lose in source-order
   ties, and the intent to make this trivially overridable is lost */`,
            fixed: `:where(.btn-base) {
  padding: 10px 16px;
  /* :where() contributes ZERO specificity — any later rule matching
     .btn-base, even a single plain class, wins automatically */
}`,
          },
          {
            broken: `.field:has(input:invalid) label {
  color: red;
  /* fires immediately on page load for an empty required field,
     before the user has typed anything at all */
}`,
            fixed: `.field:has(input:invalid:not(:placeholder-shown)) label {
  color: red;
  /* :not(:placeholder-shown) excludes the untouched, empty state —
     only matches once the user has actually typed something invalid */
}`,
          },
          {
            broken: `@container (min-width: 400px) {
  .card { flex-direction: row; }
}
/* No container-name given anywhere — works, but in a page with
   several nested containers this rule can silently match the
   WRONG ancestor container */`,
            fixed: `.card-wrapper {
  container: card-slot / inline-size;
}

@container card-slot (min-width: 400px) {
  .card { flex-direction: row; }
  /* naming the container removes any ambiguity about which
     ancestor's size this rule is actually responding to */
}`,
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--red)',
              marginBottom: 6, fontFamily: 'var(--font-mono)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Broken</div>
            <CodeBox>{item.broken}</CodeBox>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--accent)',
              marginBottom: 6, fontFamily: 'var(--font-mono)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Fixed</div>
            <CodeBox>{item.fixed}</CodeBox>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Modern Selectors — And Exactly Why</SectionTitle>

        {[
          {
            error: `A rule using :has(), :is(), or a container query has no effect at all, and DevTools shows the declaration crossed out or the whole rule missing from computed styles`,
            cause: 'The browser (or a specific version of it) does not support the feature. :has() reached broad cross-browser support noticeably later than :is()/:where(), and container queries later still — a stylesheet targeting older browser versions can silently fail to apply these rules with no console warning at all, since invalid/unsupported selectors are simply ignored by the CSS parser.',
            fix: 'Check current browser support before relying on these features for anything critical, and provide a reasonable fallback layout that still looks acceptable without them, since unsupported selectors do not error — they are just silently skipped, and a page relying entirely on :has() with no fallback can look visually broken in an unsupported browser with no error trail to follow.',
          },
          {
            error: `@container rule never fires, and the container-queried element never changes layout`,
            cause: 'container-type was set on the wrong element — usually the same element being styled inside the @container block, rather than one of its ancestors. A container query rule always targets descendants of the container that has container-type set.',
            fix: 'Move container-type: inline-size to a wrapping ancestor element, one level (or more) up from the element you are actually trying to style inside the @container rule.',
          },
          {
            error: `Container query units (cqw/cqi/etc.) resolve as if they were the equivalent viewport unit, producing unexpectedly large or small sizes`,
            cause: 'No ancestor has container-type set, so there is no query container context for the unit to resolve against — most browsers fall back to viewport-relative sizing in this situation rather than erroring.',
            fix: 'Confirm an ancestor element has container-type: inline-size (or size) set, and that the element using the cq* unit is actually a descendant of it.',
          },
          {
            error: `A :where()-based base style is unexpectedly overridden by a browser's own default user-agent stylesheet`,
            cause: ':where() intentionally contributes zero specificity, which means it can lose not just to your own later rules (by design) but occasionally to unexpected sources of specificity as well, if the base rule was relied on to "win" against something it was never actually competing against fairly.',
            fix: 'This is rarely a bug in the :where() rule itself — check whether a CSS reset or normalize stylesheet is loaded before your base styles, and confirm source order, since :where() rules depend entirely on winning through specificity being genuinely zero, not through any special override behavior.',
          },
          {
            error: `A :has() selector containing a pseudo-class like :focus-within inside it behaves inconsistently across browsers`,
            cause: ':has() combined with certain dynamic pseudo-classes (like :focus-within, :hover) inside its argument is a newer, more specific combination than plain :has(), and had uneven rollout timing across browser engines even after basic :has() support landed.',
            fix: 'Test the specific combination directly in each target browser rather than assuming baseline :has() support implies every nested pseudo-class combination inside it behaves identically — verify on caniuse.com or directly test in the browsers your users actually use.',
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
        ':has() is CSS\'s native "parent selector" — it styles an element based on what it CONTAINS, the opposite direction from every other combinator, enabling things like validation-state-driven label styling with zero JavaScript.',
        ':is() and :where() match identically given the same arguments — the only difference is specificity. :is() takes its highest-specificity argument; :where() is always zero specificity.',
        'Use :where() for base/reset styles meant to be trivially overridable later; use :is() when the selector\'s specificity should genuinely compete in the normal cascade.',
        'Media queries respond to the viewport; container queries respond to the actual space a component\'s own container was given — the two solve different problems and are commonly used together.',
        'A container query requires container-type set on an ANCESTOR of the styled element — an element cannot query its own size.',
        'Container query units (cqw, cqh, cqi, cqb) size relative to the query container, the same way vw/vh size relative to the viewport — useful for proportional scaling without a full @container block.',
        ':has() matches descendants at any depth by default, not just direct children — use the child combinator (:has(> img)) to restrict it.',
        'None of these features error when unsupported — they are silently skipped by older browsers, so always verify current support and provide a reasonable fallback for anything critical.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 35 covers CSS architecture and naming conventions — BEM with a full worked example, why
          naming systems matter once a project grows past a handful of files, and avoiding the
          overly-specific selectors and !important overuse that make stylesheets painful to maintain.
        </p>
        <Link href="/learn/html-css/css-architecture-naming" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 35 → CSS Architecture &amp; Naming Conventions
        </Link>
      </div>
    </LearnLayout>
  )
}
