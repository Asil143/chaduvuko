import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Selectors Deep Dive — HTML & CSS | Chaduvuko',
  description:
    'Combinators, pseudo-classes, pseudo-elements, and the exact numeric specificity calculation — the rules that decide which style actually wins, worked through with concrete examples.',
}

const C = '#f97316'

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

export default function CssSelectorsDeepDive() {
  return (
    <LearnLayout
      title="CSS Selectors Deep Dive"
      description="Combinators, pseudo-classes, pseudo-elements, and specificity — the rules that decide which style actually wins."
      section="HTML & CSS — Module 20"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Combinators" />
        <SectionTitle>Combinators — Selecting Elements Based on Their Relationship to Other Elements</SectionTitle>

        <Para>
          A combinator is a character placed between two selectors that describes a structural
          relationship between them in the DOM, rather than matching each side independently. There are
          four, and each targets a genuinely different relationship.
        </Para>

        <CodeBox label="The descendant combinator — a single space">{`.card p {
  color: #444;
}

/* Matches EVERY <p>, no matter how deeply nested, anywhere INSIDE an
   element with class="card" — a direct child, a grandchild, or ten
   levels deeper. The space is itself the combinator. */`}</CodeBox>

        <CodeBox label="The child combinator — >">{`.card > p {
  color: #444;
}

/* Matches ONLY <p> elements that are DIRECT children of .card —
   a <p> nested inside a <div> inside .card would NOT match, since
   it is a grandchild, not a direct child. */`}</CodeBox>

        <Para>
          The descendant combinator is by far the most commonly used — and also the easiest to accidentally
          over-match with, since it reaches arbitrarily deep. The child combinator is the precise,
          intentional alternative when a rule should only apply one level down.
        </Para>

        <CodeBox label="The adjacent sibling combinator — +">{`h2 + p {
  margin-top: 0;
}

/* Matches a <p> ONLY if it is the VERY NEXT sibling immediately
   after an <h2>, sharing the same parent. A <p> that isn't
   immediately after an <h2> — even if an <h2> appears earlier among
   its siblings — does not match. */`}</CodeBox>

        <CodeBox label="The general sibling combinator — ~">{`h2 ~ p {
  color: #666;
}

/* Matches EVERY <p> that comes anywhere AFTER an <h2> among its
   siblings, not just the immediately next one — but still only
   siblings sharing the same parent, and only ones appearing AFTER
   the <h2> in source order. */`}</CodeBox>

        <Para>
          A concrete way to keep the two sibling combinators straight: <code>+</code> matches exactly one
          element — the very next sibling — while <code>~</code> matches every qualifying sibling that
          follows, however many there are.
        </Para>

        <Callout type="tip">
          A genuinely useful real-world pattern built entirely on the adjacent sibling combinator:{' '}
          <code>{`* + * { margin-top: 1.5rem; }`}</code> inside a content container adds spacing between{' '}
          <em>any</em> two adjacent elements automatically, without needing a margin rule on every
          individual element type — commonly called the "owl selector," since <code>*</code> matches
          anything and the pattern was popularized under that name.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Pseudo-Classes" />
        <SectionTitle>Pseudo-Classes — Targeting a State or Position, Not a Tag or Class</SectionTitle>

        <Para>
          A pseudo-class, written with a single colon, selects elements based on a state or a position in
          the document that plain HTML markup does not directly express — there is no <code>class="hover"</code>{' '}
          anywhere in your HTML, yet <code>:hover</code> still works, because the browser applies it
          dynamically based on what the cursor is actually doing right now.
        </Para>

        <CodeBox label="Interaction-state pseudo-classes">{`a:hover {
  text-decoration: underline;
}

button:focus {
  outline: 2px solid #f97316;
}

input:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}`}</CodeBox>

        <Para>
          <code>:focus-visible</code> is a more modern, more precise cousin of <code>:focus</code> — it
          only applies when the browser determines the focus outline should actually be shown to the user
          (typically keyboard navigation), rather than every single time an element receives focus,
          including a mouse click. This avoids the common complaint of a visible focus ring appearing
          around a button after every click, which looks broken for a mouse user but is essential for
          keyboard users.
        </Para>

        <CodeBox label=":focus vs :focus-visible">{`button:focus {
  outline: 2px solid #f97316;   /* shows on EVERY focus, mouse click included */
}

button:focus-visible {
  outline: 2px solid #f97316;   /* shows only when the browser judges it's
                                     genuinely needed — mainly keyboard nav */
}`}</CodeBox>

        <SubTitle>Structural pseudo-classes — targeting position among siblings</SubTitle>

        <CodeBox label="first-child, last-child, and nth-child()">{`li:first-child {
  font-weight: bold;
}

li:last-child {
  border-bottom: none;
}

li:nth-child(2) {
  color: red;         /* exactly the 2nd child */
}

li:nth-child(odd) {
  background: #f7f7f7; /* every odd-positioned child: 1, 3, 5, ... */
}

li:nth-child(3n) {
  color: blue;          /* every 3rd child: 3, 6, 9, ... */
}`}</CodeBox>

        <Para>
          <code>:nth-child()</code> accepts a formula in the form <code>an + b</code>, where{' '}
          <code>n</code> starts at 0 and counts up — <code>3n</code> matches positions 3, 6, 9 (multiples
          of 3), and <code>3n + 1</code> matches 1, 4, 7 (the classic pattern for striping every third row
          starting from the first). The keywords <code>odd</code> and <code>even</code> are shorthand for
          the two most common formulas.
        </Para>

        <CodeBox label="nth-child with a real offset formula — every 3rd item, starting from the 1st">{`.grid-item:nth-child(3n + 1) {
  clear: left;   /* a classic technique for a 3-column CSS-only grid */
}

/* n = 0: 3(0)+1 = 1
   n = 1: 3(1)+1 = 4
   n = 2: 3(2)+1 = 7
   ...matches positions 1, 4, 7, 10, ... */`}</CodeBox>

        <Callout type="warning">
          <strong>:first-child and :nth-child() count ALL sibling elements, not just ones of the same
          type.</strong> <code>li:first-child</code> only matches an <code>&lt;li&gt;</code> if it is
          literally the first child of its parent — if a stray <code>&lt;span&gt;</code> or comment element
          sits before it, the <code>&lt;li&gt;</code> no longer matches, even though it might still visually
          look like "the first list item." <code>:first-of-type</code> and <code>:nth-of-type()</code> are
          the type-aware equivalents, matching position among only siblings of the same element type.
        </Callout>

        <SubTitle>:not() — negating a selector</SubTitle>

        <CodeBox label=":not() excludes elements matching its argument">{`li:not(:last-child) {
  border-bottom: 1px solid #eee;   /* a divider between every item EXCEPT the last */
}

input:not([type="checkbox"]):not([type="radio"]) {
  width: 100%;   /* every text-like input, but not checkboxes/radios */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Pseudo-Elements" />
        <SectionTitle>Pseudo-Elements — Targeting a Part of an Element, Not the Whole Thing</SectionTitle>

        <Para>
          A pseudo-element, written with a double colon (<code>::</code>) by modern convention, selects a
          specific sub-part of an element — something that does not correspond to a real, separate node in
          the HTML at all. <code>::before</code> and <code>::after</code> are by far the most commonly
          used, inserting generated content immediately inside an element, before or after its actual
          content.
        </Para>

        <CodeBox label="::before and ::after — generated content">{`.required-field::after {
  content: " *";
  color: red;
}

.quote::before {
  content: open-quote;
}
.quote::after {
  content: close-quote;
}`}</CodeBox>

        <Callout type="warning">
          <strong>::before and ::after do nothing at all without a content property</strong> — even an
          empty string, <code>{`content: "";`}</code>, is required for the pseudo-element to actually
          generate a box and render. This is a very common source of confusion: every other property on the
          rule appears correct, but nothing shows up, because <code>content</code> was left out entirely.
        </Callout>

        <CodeBox label="A frequent real use — a decorative shape with no semantic content">{`.badge::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  margin-right: 6px;
}

/* A small colored dot rendered purely with CSS, with no extra <span>
   or <div> cluttering the actual HTML markup. */`}</CodeBox>

        <SubTitle>Text-targeting pseudo-elements</SubTitle>

        <CodeBox label="::first-line and ::first-letter">{`p::first-line {
  font-weight: bold;
}

p::first-letter {
  font-size: 2.5em;
  float: left;
  line-height: 1;
  padding-right: 4px;
}

/* ::first-letter, combined with float, is the standard technique for
   a "drop cap" — the oversized first letter common in print-style
   article layouts. */`}</CodeBox>

        <CodeBox label="::placeholder and ::selection — styling browser-native UI details">{`input::placeholder {
  color: #999;
  font-style: italic;
}

::selection {
  background: #f97316;
  color: white;
}

/* ::selection styles the highlight color when a user selects text
   with their mouse — one of the few pseudo-elements that can apply
   globally, not just to one element type. */`}</CodeBox>

        <Para>
          The single-colon form (<code>:before</code>, <code>:after</code>) still works in every modern
          browser for backward compatibility — it was the original CSS2 syntax before pseudo-elements were
          given their own double-colon notation in CSS3 to distinguish them clearly from pseudo-classes.
          New code should always use the double-colon form.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Attribute Selectors" />
        <SectionTitle>Attribute Selectors — Matching Based on an HTML Attribute&apos;s Value</SectionTitle>

        <Para>
          Attribute selectors, written in square brackets, match elements based on an HTML attribute being
          present, or matching a value with a specific comparison — genuinely useful for targeting form
          inputs by type, links by their destination, or any element carrying a specific{' '}
          <code>data-*</code> attribute.
        </Para>

        <CodeBox label="The core attribute-selector forms">{`[disabled] {
  opacity: 0.5;          /* matches ANY element with a "disabled" attribute present */
}

input[type="email"] {
  border-color: blue;    /* exact value match */
}

a[href^="https://"] {
  color: green;          /* STARTS WITH — external/secure links */
}

a[href$=".pdf"] {
  padding-right: 20px;   /* ENDS WITH — links to a PDF file */
}

[class*="btn-"] {
  cursor: pointer;       /* CONTAINS — any class containing "btn-" anywhere in it */
}`}</CodeBox>

        <Para>
          <code>^=</code> (starts with), <code>$=</code> (ends with), and <code>*=</code> (contains) make
          attribute selectors genuinely powerful for targeting patterns without needing a matching class on
          every element — commonly used for automatically styling external links or file-type-specific
          download links, based purely on the <code>href</code> value already present in the markup.
        </Para>

        <Callout type="info">
          Attribute selectors sit at the same specificity level as class selectors and pseudo-classes,
          covered next — a detail that matters directly for the specificity calculation.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Specificity, Calculated" />
        <SectionTitle>The Actual Specificity Calculation — Worked Through With Real Numbers</SectionTitle>

        <Para>
          Module 17 introduced specificity conceptually. Here is the real, precise mechanism the browser
          actually runs. Every selector is scored as a tuple of four numbers, conventionally written{' '}
          <strong>(inline, ID, class, element)</strong>, counted by tallying how many of each selector type
          appear in the full selector.
        </Para>

        <CodeBox label="The four specificity tiers, and what counts toward each">{`Tier A — Inline styles           → the style="" attribute itself
Tier B — ID selectors             → #header, #nav-menu
Tier C — Classes, attributes,     → .card, [type="text"], :hover,
         and pseudo-classes         :nth-child(2), :not(...)
Tier D — Elements and             → div, p, a, ::before, ::after
         pseudo-elements`}</CodeBox>

        <Para>
          To compare two selectors, count how many of each tier they contain, then compare left to right —
          Tier A first, then B, then C, then D. Whichever selector has more at the <em>first</em> tier where
          they differ wins outright — a single point in a higher tier always beats any number of points in
          a lower tier. This is why specificity is written as a tuple, not summed into one number: 100
          class selectors combined could never out-rank one single ID selector.
        </Para>

        <CodeBox label="Example 1 — comparing two simple selectors">{`p {              /* (0, 0, 0, 1) — one element */
  color: black;
}

.intro {          /* (0, 0, 1, 0) — one class */
  color: blue;
}

/* .intro WINS for <p class="intro">, since Tier C (1) beats
   Tier D (1) — comparing left to right, C is checked before D,
   and .intro has a non-zero count there while "p" has zero. */`}</CodeBox>

        <CodeBox label="Example 2 — a compound selector, tallied piece by piece">{`.card .title.featured {
  color: orange;
}

/* Count each piece:
   .card      → 1 class  → (0, 0, 1, 0)
   .title     → 1 class  → (0, 0, 1, 0)
   .featured  → 1 class  → (0, 0, 1, 0)
   ---------------------------------
   TOTAL: (0, 0, 3, 0) — three classes, zero IDs, zero elements */`}</CodeBox>

        <CodeBox label="Example 3 — mixing element, class, and ID selectors in one chain">{`nav ul li.active a {
  color: red;
}

/* nav   → element → (0,0,0,1)
   ul    → element → (0,0,0,1)
   li    → element → (0,0,0,1)
   .active → class → (0,0,1,0)
   a     → element → (0,0,0,1)
   ------------------------------
   TOTAL: (0, 0, 1, 4) — one class, four elements */

#sidebar a {
  color: blue;
}

/* #sidebar → ID     → (0,1,0,0)
   a        → element → (0,0,0,1)
   ------------------------------
   TOTAL: (0, 1, 0, 1) — one ID, one element */

/* Comparing (0,0,1,4) vs (0,1,0,1): Tier B differs first — 0 vs 1 —
   so #sidebar a WINS, regardless of the second selector having more
   total pieces overall. Tier B is checked before Tier C, and one ID
   beats any number of classes and elements. */`}</CodeBox>

        <Callout type="tip">
          <strong>A genuinely useful mental shortcut:</strong> think of each tier as a completely separate
          column that can never "carry over" into the next — no quantity of classes ever adds up to equal
          one ID, exactly like no quantity of dollars ever converts into a different currency by just
          having enough of them. Compare column by column, left to right, and stop at the first difference.
        </Callout>

        <SubTitle>The universal selector and combinators add zero specificity</SubTitle>

        <CodeBox label="* and combinators (space, >, +, ~) contribute NOTHING to specificity">{`* {
  margin: 0;               /* (0, 0, 0, 0) — the universal selector adds zero */
}

.card > p {
  color: black;             /* (0, 0, 1, 1) — the ">" itself adds NOTHING;
                                only .card (class) and p (element) count */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Resolving Real Conflicts" />
        <SectionTitle>Putting Specificity to Work — Diagnosing a Losing Rule</SectionTitle>

        <Para>
          In practice, specificity conflicts rarely show up as a clean, isolated two-rule comparison — they
          show up as "I added this CSS and nothing changed," buried somewhere in a stylesheet with dozens of
          other rules. The systematic way to resolve it: find every rule targeting the same element and
          property, calculate each one&apos;s tuple, and compare.
        </Para>

        <CodeBox label="A realistic three-rule conflict">{`/* Rule 1 — in a base stylesheet */
button {
  background: gray;              /* (0, 0, 0, 1) */
}

/* Rule 2 — in a component stylesheet, loaded after Rule 1 */
.btn-primary {
  background: blue;               /* (0, 0, 1, 0) */
}

/* Rule 3 — in a page-specific override, loaded LAST */
#checkout-page .btn-primary {
  background: green;              /* (0, 1, 1, 0) */
}

/* Winner: Rule 3, with (0, 1, 1, 0) — the ID beats both the class-only
   selector in Rule 2 AND the element-only selector in Rule 1, and it
   would win regardless of load order, since it has genuinely higher
   specificity, not just a later position. */`}</CodeBox>

        <Para>
          If Rule 2 and Rule 3 had ended up with the exact same specificity tuple, the tie-breaker would
          fall back to source order (Module 17, Part 04) — whichever was declared later in the combined,
          final CSS would win. Specificity decides the vast majority of real conflicts; source order only
          settles the rare genuine tie.
        </Para>

        <SubTitle>How DevTools shortcuts this entire manual calculation</SubTitle>

        <Para>
          In practice, no working engineer manually tallies specificity tuples during day-to-day debugging
          — browser DevTools compute and display it automatically. Inspecting an element in Chrome or
          Firefox&apos;s Elements panel lists every matching rule in specificity order, strikes through any
          declaration that lost, and shows exactly which rule is currently winning for each property. Doing
          the calculation by hand, as in Part 05, is what builds the mental model that makes that DevTools
          output make sense at a glance — not something to redo by hand under normal working conditions.
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
        <SectionTitle>A Design-System Migration at a Seattle Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Seattle · Design-system component rollout
          </div>

          <Para>
            A Seattle-based fintech startup is rolling out a new shared <code>.btn</code> component class,
            meant to replace years of inconsistent one-off button styling scattered across older pages, each
            written by a different engineer at a different time.
          </Para>

          <CodeBox label="The new design-system component">{`.btn {
  background: #1a1a2e;
  color: white;
  padding: 0.6em 1.4em;
  border-radius: 6px;
  border: none;
}`}</CodeBox>

          <Para>
            Rolled out across the codebase, most buttons update correctly — except on the transactions
            page, where several buttons keep their old, mismatched styling despite having{' '}
            <code>class="btn"</code> applied exactly like everywhere else.
          </Para>

          <SubSubTitle>What the engineer finds with DevTools</SubSubTitle>

          <Para>
            The transactions page has legacy CSS, written years earlier, still loaded after the new design
            system stylesheet — targeting the same buttons with a much higher-specificity selector.
          </Para>

          <CodeBox label="The old, legacy rule still in the codebase">{`#transactions-table .action-row button {
  background: #444;
  border-radius: 3px;
}

/* Specificity: #transactions-table (ID) + .action-row (class)
                + button (element)
              = (0, 1, 1, 1)

   vs the new .btn component: (0, 0, 1, 0)

   Tier B differs immediately — 0 vs 1 — so the legacy rule wins
   outright, regardless of the new stylesheet loading AFTER it. */`}</CodeBox>

          <SubSubTitle>The fix — and the actual decision behind it</SubSubTitle>

          <Para>
            The team explicitly rejects reaching for a higher-specificity override or an{' '}
            <code>!important</code> on <code>.btn</code> — doing so would fix this one page while making the
            shared component permanently harder to override anywhere else it is legitimately needed, exactly
            the trap described back in Module 17&apos;s discussion of <code>!important</code>. Instead, the
            legacy ID-based selector itself gets removed as part of the migration, since it was leftover,
            page-specific styling the new shared component was always meant to fully replace.
          </Para>

          <CodeBox label="The real fix — deleting the legacy override, not out-specifying it">{`/* legacy-transactions.css — DELETED entirely */
/* #transactions-table .action-row button { ... } */

/* .btn now applies cleanly everywhere, including the transactions
   page, with no specificity war and no !important anywhere in the
   codebase. */`}</CodeBox>

          <Para>
            This is a genuinely common shape for real design-system rollout work: the technical fix (delete
            the old override) is trivial once specificity correctly diagnoses the actual cause — the harder
            part is resisting the tempting but corrosive shortcut of matching or exceeding the legacy
            selector&apos;s specificity instead of removing it, which only adds another layer to the same
            problem for the next engineer.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Selectors and Specificity</SectionTitle>

        {[
          {
            wrong: '"Ten class selectors combined are more specific than a single ID selector"',
            right: 'Specificity tiers never carry over into each other — comparison happens column by column, left to right, and a difference at a higher tier (ID) always decides the outcome regardless of how many lower-tier selectors (classes) the other side has. Ten classes are still beaten by one ID.',
          },
          {
            wrong: '"The > combinator adds to a selector\'s specificity, since it makes the selector more specific about relationships"',
            right: 'Combinators (space, >, +, ~) contribute ZERO to specificity — only the actual selectors on either side of them (elements, classes, IDs, pseudo-classes) are counted. A combinator only affects WHICH elements match, not how strongly the rule wins against a competing rule.',
          },
          {
            wrong: '":first-child selects the first element of a given type inside its parent"',
            right: ':first-child only matches if the element is literally the first child node of its parent, of ANY type — a preceding sibling of a different tag disqualifies it. :first-of-type is the version that specifically ignores sibling type and matches position among only same-type siblings.',
          },
          {
            wrong: '"::before and ::after insert real DOM elements you can select and manipulate with JavaScript like any other element"',
            right: 'They are CSS-generated content with no corresponding node in the actual DOM tree — JavaScript cannot select, query, or directly manipulate a ::before/::after pseudo-element the way it can a real element, since there genuinely is nothing there for the DOM API to find.',
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
            q: 'Calculate the specificity of #sidebar .widget.featured > p, and explain how you got there.',
            a: 'Tally each piece: #sidebar is one ID (0,1,0,0). .widget and .featured are two classes (0,0,2,0). > is a combinator and contributes nothing. p is one element (0,0,0,1). Total: (0, 1, 2, 1) — one ID, two classes, one element. This would beat any selector with zero IDs, no matter how many classes or elements it has.',
          },
          {
            q: 'What is the difference between the adjacent sibling (+) and general sibling (~) combinators?',
            a: '+ matches only the single element that comes immediately after the reference element, sharing the same parent. ~ matches every qualifying sibling that comes after the reference element, sharing the same parent — not just the immediately next one. Both require the elements to be true siblings (same parent); neither matches elements before the reference element.',
          },
          {
            q: 'Why does a ::before pseudo-element sometimes fail to render even though every other property on the rule looks correct?',
            a: 'The content property was omitted. ::before and ::after require content to be set — even an empty string, content: "" — or the browser will not generate the pseudo-element\'s box at all, regardless of any other styling declared on it.',
          },
          {
            q: 'A new CSS rule targeting a shared component class isn\'t applying, even though it was added at the very end of the stylesheet. Walk through how you would diagnose it.',
            a: 'Open DevTools, inspect the affected element, and check the Styles panel for every matching rule and which one is actually winning — it will show a strikethrough on any losing declaration. In the vast majority of cases the actual cause is a competing rule with higher specificity (commonly an ID selector, or a longer chain of classes/elements) rather than source order, since specificity is checked before source order ever comes into play.',
          },
          {
            q: 'Why do combinators and the universal selector (*) contribute zero to specificity?',
            a: 'Specificity is calculated purely from the TYPE of selectors present — IDs, classes/attributes/pseudo-classes, and elements/pseudo-elements — not from how those selectors relate structurally to each other. Combinators only determine matching (which elements a rule applies to); the universal selector is deliberately given zero weight since it is designed to be an easily-overridden baseline reset, not a targeted style.',
          },
          {
            q: 'In a real codebase, when would you choose to remove a legacy overriding rule entirely, versus writing a new rule with higher specificity to beat it?',
            a: 'Removing the legacy rule is the better long-term fix whenever it is genuinely obsolete or is meant to be fully superseded by the new styling — exactly the design-system migration scenario covered in this module\'s Real World example. Writing a higher-specificity override instead just adds another layer competing for the same property, making the NEXT change harder, and is really only appropriate when the legacy rule is still needed for something else and cannot be safely deleted.',
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
        <SectionTitle>Selector Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using ::before/::after without setting content',
            a: 'The pseudo-element simply does not render at all — no box is generated. content: "" is the minimum required, even for a purely decorative pseudo-element with no actual text.',
          },
          {
            q: 'Assuming :first-child ignores element type',
            a: ':first-child matches based on position among ALL sibling nodes, regardless of tag. If the intent is "first element of THIS type among its siblings," use :first-of-type instead — a very common source of a rule that unexpectedly does not apply to what looks like the first item of a list.',
          },
          {
            q: 'Reaching for a higher-specificity selector to fix a losing rule, instead of checking whether the competing rule should just be deleted',
            a: 'This escalates a specificity conflict into a permanent one instead of resolving it, exactly as covered in the design-system Real World example. Before increasing specificity, check whether the rule you\'re fighting is actually still needed — if it is legacy or obsolete, removing it is usually the healthier fix.',
          },
          {
            q: 'Confusing the adjacent (+) and general (~) sibling combinators',
            a: 'h2 + p only ever matches ONE element — the paragraph immediately following an h2. h2 ~ p matches every paragraph that comes after it among its siblings. Using + when the intent was "every following paragraph" silently only styles the first one.',
          },
          {
            q: 'Writing overly long, deeply nested descendant selectors out of habit',
            a: 'A selector like .page .container .sidebar .widget .title racks up unnecessary specificity and becomes brittle the moment the HTML structure changes even slightly. Prefer a single, well-named class directly on the target element wherever possible — this is the entire motivation behind naming systems like BEM, covered later in this track.',
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
        <SectionTitle>Rendering Bugs You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `A ::before or ::after rule has every property set correctly but nothing appears`,
            cause: 'The content property is missing entirely. Without it, the pseudo-element generates no box at all, regardless of any other declared styling.',
            fix: 'Add content: ""; (or the actual text/content you want) to the rule — this is required, not optional, for any ::before/::after to render.',
          },
          {
            error: `A new CSS rule, added later in the file or a later-loaded stylesheet, still doesn't apply`,
            cause: 'A competing rule elsewhere in the codebase has a higher-specificity selector, most commonly one involving an ID or a longer chain of classes — specificity is checked before source order, so a later position in the file does not override a lower-specificity rule.',
            fix: 'Inspect the element in DevTools\' Styles panel to see every matching rule ranked by specificity, with the losing declaration struck through. Either match or intentionally exceed the winning selector\'s specificity, or — often the better long-term fix — remove the legacy rule if it is meant to be fully superseded.',
          },
          {
            error: `:nth-child(3) selects an unexpected element, not the one visually appearing "3rd" on the page`,
            cause: ':nth-child() counts ALL sibling nodes in the DOM, including ones a stylesheet author might not be visually tracking — a hidden element, a stray text node, or an element of a different type still counts toward the position.',
            fix: 'Use browser DevTools to inspect the actual DOM structure and sibling order, not just the rendered visual order. If the intent is "3rd element of THIS type," use :nth-of-type() instead.',
          },
          {
            error: `A hover or focus style flickers or applies inconsistently on touch devices`,
            cause: ':hover has no true equivalent on a touch screen — some mobile browsers simulate a hover state on tap, which can behave inconsistently across devices and browsers.',
            fix: 'Do not rely on :hover alone to reveal essential functionality on a page that must work well on touch devices; pair it with a tap-friendly interaction, and test the specific behavior on real mobile browsers rather than assuming desktop hover behavior carries over.',
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
        'Combinators describe relationships: space (any descendant), > (direct child only), + (immediately next sibling only), ~ (any following sibling).',
        'Pseudo-classes (single colon) target a state or position — :hover, :focus, :nth-child() — that doesn\'t exist as an HTML attribute. Pseudo-elements (double colon) target a sub-part of an element, like ::before/::after generated content or ::first-letter.',
        '::before and ::after require a content property (even an empty string) to render at all — the single most common reason they appear to silently fail.',
        'Specificity is a four-part tuple: inline styles, then ID selectors, then classes/attributes/pseudo-classes, then elements/pseudo-elements — compared column by column, left to right, with a higher tier always beating any amount of a lower tier.',
        'Combinators and the universal selector (*) contribute zero to specificity — only the actual selector types on either side of them count.',
        ':first-child/:nth-child() count ALL sibling nodes regardless of type; :first-of-type/:nth-of-type() count only same-type siblings.',
        'When a specificity conflict is diagnosed, the healthiest long-term fix is often removing an obsolete competing rule entirely, not escalating specificity to beat it — escalating just adds another layer to the same problem.',
        'DevTools\' Styles panel calculates and ranks specificity automatically, striking through losing declarations — use it as the first diagnostic step for any "why isn\'t my CSS applying" bug.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 21 covers display and positioning — block/inline/inline-block in full, every position
          value from static through sticky, and z-index and stacking contexts explained properly.
        </p>
        <Link href="/learn/html-css/display-positioning" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 21 → Display & Positioning
        </Link>
      </div>
    </LearnLayout>
  )
}
