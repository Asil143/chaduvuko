import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is CSS? Syntax, Selectors & the Cascade — HTML & CSS | Chaduvuko',
  description:
    'How CSS actually applies styles to a page — rule syntax, the three ways to attach CSS, the cascade, and inheritance. The mental model everything else in CSS builds on.',
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

export default function WhatIsCss() {
  return (
    <LearnLayout
      title="What is CSS? Syntax, Selectors & the Cascade"
      description="How CSS actually applies styles — selectors, the cascade, inheritance, and the mental model everything else in CSS builds on."
      section="HTML & CSS — Module 17"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What CSS Actually Is" />
        <SectionTitle>CSS Is a Rule Language, Not a Programming Language</SectionTitle>

        <Para>
          HTML gives a page structure and meaning — a heading, a paragraph, a list. CSS (Cascading Style
          Sheets) is the language that decides how that structure actually looks: colors, spacing, fonts,
          layout, and every visual decision on the page. The two are deliberately separate. The same HTML
          document can look completely different under a different stylesheet, and that separation — content
          in one place, presentation in another — is the entire design philosophy CSS is built around.
        </Para>

        <Para>
          Every CSS rule has exactly the same two-part shape: a <strong>selector</strong>, which says
          which elements the rule applies to, followed by a <strong>declaration block</strong> wrapped in
          curly braces, containing one or more <code>property: value;</code> pairs.
        </Para>

        <CodeBox label="The anatomy of a CSS rule">{`selector {
  property: value;
  property: value;
}

/* A concrete example */
p {
  color: #1a1a1a;
  font-size: 16px;
  line-height: 1.6;
}`}</CodeBox>

        <Para>
          Reading that rule aloud: "select every <code>p</code> element, and set its text color to
          <code>#1a1a1a</code>, its font size to 16 pixels, and its line height to 1.6." Every declaration
          ends with a semicolon — technically the semicolon on the very last declaration in a block is
          optional, but omitting it is a common source of bugs the moment you add a new declaration
          underneath it and forget to add one to the line above, so treat it as required.
        </Para>

        <Callout type="tip">
          CSS is <strong>declarative</strong>, not procedural. You never write "loop through every
          paragraph and change its color" — you write a rule that describes a target and a result, and the
          browser figures out which elements match and applies the styling itself, continuously, for the
          entire lifetime of the page.
        </Callout>

        <SubTitle>Comments in CSS</SubTitle>

        <Para>
          CSS comments use <code>/* ... */</code> — there is no single-line <code>//</code> comment syntax
          in plain CSS (Sass, covered later in this track, does add one, but it is not valid in a
          <code>.css</code> file loaded directly by the browser).
        </Para>

        <CodeBox label="CSS comments">{`/* This is a comment. It can span
   multiple lines. */

p {
  color: red; /* inline comments work too */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Attaching CSS to HTML" />
        <SectionTitle>Three Ways to Attach CSS — and Why One of Them Wins</SectionTitle>

        <Para>
          There are exactly three mechanisms for getting CSS onto an HTML page. All three are valid, all
          three actually work, and real production codebases almost universally settle on one of them for
          the bulk of their styling.
        </Para>

        <SubTitle>1. External stylesheet — a separate .css file, linked in</SubTitle>

        <CodeBox label="index.html + styles.css">{`<!-- in the <head> of your HTML document -->
<link rel="stylesheet" href="styles.css">`}</CodeBox>

        <CodeBox label="styles.css — a completely separate file">{`body {
  font-family: system-ui, sans-serif;
  margin: 0;
}

h1 {
  color: #f97316;
}`}</CodeBox>

        <SubTitle>2. Internal (embedded) stylesheet — a &lt;style&gt; block in the document head</SubTitle>

        <CodeBox label="Styling inside the HTML document itself">{`<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
    }
    h1 {
      color: #f97316;
    }
  </style>
</head>`}</CodeBox>

        <SubTitle>3. Inline styles — a style attribute directly on an element</SubTitle>

        <CodeBox label="Styling one specific element, directly">{`<h1 style="color: #f97316; font-size: 32px;">Welcome</h1>`}</CodeBox>

        <Para>
          Every real production project reaches for the <strong>external stylesheet</strong> as the
          default, and for good reason: it is cached by the browser separately from the HTML (so a repeat
          visit to any page on the site does not re-download the CSS), it can be shared across every page
          on a site instead of duplicated inside each one, and it keeps structure and presentation cleanly
          separated so a designer or front-end engineer can change the entire look of a site without
          touching a single HTML file.
        </Para>

        <Callout type="warning">
          <strong>Inline styles win the cascade almost every time — which is exactly why they cause
          problems.</strong> As you will see in Part 04, an inline <code>style</code> attribute has a
          specificity so high it overrides nearly every external and internal rule automatically, which
          makes inline styles very difficult to override later without resorting to <code>!important</code>.
          Reach for inline styles only for one-off, dynamically computed values (a chart bar&apos;s width
          set by JavaScript, for instance) — never as your default styling method.
        </Callout>

        <SubTitle>Why not just use a &lt;style&gt; block everywhere?</SubTitle>

        <Para>
          An internal stylesheet is genuinely useful for small demos, single-file examples, and quick
          prototypes — you are looking at exactly that pattern in every code example on this page&apos;s
          learning platform. But it does not scale: it cannot be cached independently, it cannot be shared
          across multiple HTML pages without copy-pasting it into every single one, and a real multi-page
          site with an internal stylesheet per page quickly turns into dozens of near-duplicate style
          blocks that drift out of sync with each other.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Selector Basics" />
        <SectionTitle>Selecting Elements — The Basic Vocabulary</SectionTitle>

        <Para>
          Selectors determine which elements a rule targets. This module covers the fundamentals needed to
          read and write everyday CSS; the full combinator and pseudo-class/pseudo-element vocabulary, plus
          the complete specificity calculation, gets a dedicated deep dive later in this phase.
        </Para>

        <CodeBox label="The four selector types you will use constantly">{`/* Type (element) selector — targets every <p> on the page */
p {
  color: #333;
}

/* Class selector — targets every element with class="highlight" */
.highlight {
  background: yellow;
}

/* ID selector — targets the ONE element with id="site-header" */
#site-header {
  position: sticky;
}

/* Universal selector — targets literally every element */
* {
  box-sizing: border-box;
}`}</CodeBox>

        <Para>
          Classes are reusable — the same class name can be applied to as many elements as you like, and a
          single element can carry multiple classes separated by spaces. IDs are meant to be unique — one
          per page — and while browsers will not stop you from reusing an ID, doing so is invalid HTML and
          breaks anything on the page that relies on IDs being unique, including <code>document.getElementById</code>{' '}
          in JavaScript.
        </Para>

        <CodeBox label="Multiple classes on one element">{`<button class="btn btn-primary btn-large">Submit</button>`}</CodeBox>

        <CodeBox label="Grouping selectors — apply the same rule to several selectors at once">{`h1, h2, h3 {
  font-family: 'Georgia', serif;
  margin-top: 0;
}

/* Equivalent to writing three separate rules with identical bodies */`}</CodeBox>

        <Callout type="info">
          The overwhelming majority of real-world CSS is written with <strong>class</strong> selectors, not
          IDs or the universal selector. Class-based styling is reusable, predictable, and — as you will
          see in Part 05 — has a specificity level that is easy to reason about and override intentionally,
          which is exactly why naming systems like BEM (covered later in this track) are built entirely
          around classes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Cascade: Source Order" />
        <SectionTitle>The "C" in CSS — Later Rules Win Ties</SectionTitle>

        <Para>
          The cascade is the algorithm the browser runs to decide which declaration actually wins when
          multiple rules target the same property on the same element. There are three forces that feed
          into it, in increasing order of power: <strong>source order</strong>, <strong>specificity</strong>,
          and <strong>importance</strong>. This part covers source order — the simplest of the three, and
          the one you already have an intuition for.
        </Para>

        <CodeBox label="When two rules have equal specificity, the one written LAST wins">{`p {
  color: blue;
}

p {
  color: red;
}

/* Every <p> renders red. Same selector, same specificity — the browser
   simply applies rules in the order they appear, and later ones overwrite
   earlier ones for any property they both set. */`}</CodeBox>

        <Para>
          This is exactly why the order your stylesheets — and the rules within them — are loaded in
          matters. A common real bug: linking a third-party CSS library <em>after</em> your own stylesheet,
          which lets the library&apos;s styles silently override your own for any selector of matching
          specificity.
        </Para>

        <CodeBox label="Stylesheet load order matters">{`<!-- Loaded first -->
<link rel="stylesheet" href="my-styles.css">
<!-- Loaded second — anything of equal specificity here wins -->
<link rel="stylesheet" href="third-party-library.css">`}</CodeBox>

        <Callout type="warning">
          Source order is the <strong>weakest</strong> of the three cascade forces — it only decides ties.
          A more specific selector written first will still beat a less specific selector written after
          it. Source order matters only when specificity is genuinely equal, which is why relying on "just
          put my override at the bottom of the file" eventually breaks once someone else&apos;s equally- or
          more-specific rule gets added later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Cascade: Specificity" />
        <SectionTitle>Specificity — A Preview of the Full Story</SectionTitle>

        <Para>
          Specificity is a score the browser calculates for every selector, based on what kinds of
          selectors it is built from. When two rules with different specificity conflict, the
          higher-specificity rule wins — regardless of source order, even if the lower-specificity rule was
          written later in the file. The complete numeric calculation, worked through with real examples,
          is the entire subject of the CSS Selectors Deep Dive module immediately after this one — for now,
          the concept to internalise is the rough hierarchy.
        </Para>

        <CodeBox label="Specificity, roughly low to high">{`/* Lowest — element/type selectors and pseudo-elements */
p { color: black; }

/* Medium — class, attribute, and pseudo-class selectors */
.text { color: blue; }

/* High — ID selectors */
#intro { color: green; }

/* Highest of all (short of !important) — inline styles */
/* <p style="color: purple;"> */`}</CodeBox>

        <CodeBox label="A class beats an element selector, regardless of order">{`p {
  color: blue;
}

.text {
  color: red;
}

/* <p class="text">Hello</p> renders RED — .text is a class selector,
   which is more specific than the plain element selector "p", even
   though "p" happens to be written second. */`}</CodeBox>

        <Para>
          This is the single most common source of "why isn&apos;t my CSS applying?" confusion for anyone
          new to the language — a rule that looks like it should apply, sitting later in the file, gets
          silently beaten by an earlier rule with a more specific selector. Once specificity is understood
          precisely (next module in this phase), that confusion mostly disappears.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Cascade: Importance" />
        <SectionTitle>!important — The Cascade&apos;s Escape Hatch, and Why to Avoid It</SectionTitle>

        <Para>
          <code>!important</code> is a modifier you can append to any declaration to make it override
          <em>everything</em> else targeting that property on that element — regardless of specificity or
          source order. It sits at the very top of the cascade&apos;s power hierarchy: importance beats
          specificity, and specificity beats source order.
        </Para>

        <CodeBox label="!important overrides even a higher-specificity rule">{`#intro {
  color: green;
}

p {
  color: red !important;
}

/* <p id="intro">Hello</p> renders RED. Normally the ID selector (#intro)
   would win on specificity alone — but !important short-circuits the
   entire specificity comparison for this one declaration. */`}</CodeBox>

        <Callout type="warning">
          <strong>!important is almost always a symptom, not a solution.</strong> It typically shows up
          when a developer is fighting an earlier rule they either do not understand or cannot cleanly
          override, and reaches for the biggest possible hammer instead of fixing the actual specificity
          conflict. The problem compounds: once one <code>!important</code> exists, overriding
          <em>it</em> later requires either an even more specific selector combined with another
          <code>!important</code>, or removing the original entirely — a real maintenance trap that grows
          worse the more a codebase relies on it.
        </Callout>

        <Para>
          There are a small number of legitimate uses — most commonly overriding inline styles you cannot
          control (some third-party widgets set styles inline via JavaScript) or a narrowly scoped utility
          class explicitly designed to always win (a <code>{`.hidden { display: none !important; }`}</code>{' '}
          utility, for example, that must never be silently overridden by component-specific styles). As a
          rule of thumb: if you find yourself reaching for <code>!important</code> to win an argument with
          your own earlier CSS, the real fix is almost always to lower the specificity of the earlier rule
          or restructure the selectors, not to escalate.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Inheritance" />
        <SectionTitle>Inheritance — Which Properties Pass Down the Tree, and Which Don&apos;t</SectionTitle>

        <Para>
          Separately from the cascade, CSS has an inheritance mechanism: certain properties, if left
          unset on a child element, automatically take the computed value of their parent. This is not
          universal — it is a specific, well-defined set of properties, chosen because it matches how
          real design actually works: you generally want text-related properties to flow down a whole
          document from one place, but you very much do <em>not</em> want a parent&apos;s border or margin
          to automatically apply to every element nested inside it.
        </Para>

        <CodeBox label="Text-related properties inherit by default">{`body {
  color: #222;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

/* Every <p>, <span>, <li>, <a>, etc. nested inside <body> automatically
   takes this color, font-family, font-size, and line-height — UNLESS
   something more specific overrides it further down the tree. */`}</CodeBox>

        <Para>
          The commonly inherited properties are almost entirely typography- and text-related:{' '}
          <code>color</code>, <code>font-family</code>, <code>font-size</code>, <code>font-weight</code>,{' '}
          <code>line-height</code>, <code>text-align</code>, <code>letter-spacing</code>, and{' '}
          <code>visibility</code>, among a handful of others. Setting these once, high up in the document
          (commonly on <code>body</code> or <code>html</code>), is the standard way to establish a page&apos;s
          baseline typography without repeating it on every single element.
        </Para>

        <CodeBox label="Box-model properties do NOT inherit">{`.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 16px;
}

/* An element nested inside .card does NOT automatically get a border,
   padding, or margin of its own. Each element's box-model properties
   default to zero/none unless explicitly set on THAT element. */`}</CodeBox>

        <Para>
          <code>border</code>, <code>margin</code>, <code>padding</code>, <code>width</code>,{' '}
          <code>height</code>, <code>background</code>, and <code>display</code> are all non-inherited —
          which makes sense once you think about what inheriting them would mean: every nested element
          inside a bordered card would grow its own identical border, compounding visually the deeper the
          nesting went. Non-inheritance is what keeps layout-affecting properties predictable and scoped to
          the exact element they are set on.
        </Para>

        <SubTitle>Forcing inheritance with the inherit keyword</SubTitle>

        <Para>
          Any property — even one that does not inherit by default — can be forced to take its parent&apos;s
          value using the special <code>inherit</code> keyword as its value.
        </Para>

        <CodeBox label="Forcing a normally non-inherited property to inherit">{`.card {
  border: 1px solid #ccc;
}

.card .nested-box {
  border: inherit;   /* explicitly copies the parent's border value */
}`}</CodeBox>

        <Callout type="tip">
          Two related keywords are worth knowing alongside <code>inherit</code>:{' '}
          <code>initial</code> resets a property to its specification-defined default value (ignoring both
          the cascade and inheritance entirely), and <code>unset</code> acts like <code>inherit</code> for
          naturally-inheriting properties and like <code>initial</code> for everything else. All three are
          used far less often than plain values, but they show up regularly when deliberately undoing a
          style set higher up the cascade.
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
        <SectionTitle>A CSS Bug at a Portland Furniture E-Commerce Startup</SectionTitle>

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
            Scenario — Furniture e-commerce startup, Portland · Product page styling bug
          </div>

          <Para>
            A front-end engineer at a Portland-based furniture e-commerce site is asked to make the "Add to
            Cart" button&apos;s text red on the checkout page only, to match a limited-time sale banner.
            They add a new rule to the bottom of the site&apos;s global stylesheet, confident that appending
            it at the end means it will win.
          </Para>

          <CodeBox label="The change — added to the bottom of global.css">{`.btn {
  color: red;
}`}</CodeBox>

          <Para>
            The button stays exactly the same color it always was. The engineer checks that the file
            deployed correctly, hard-refreshes, clears cache — the rule is definitely loading, and it is
            definitely positioned after every other style rule in the file. It still does not apply.
          </Para>

          <SubSubTitle>What DevTools reveals</SubSubTitle>

          <Para>
            Opening the Elements panel and inspecting the button shows the real cause immediately: an
            earlier rule, defined with a much more specific selector, is winning the cascade — with a
            strikethrough visible on the newly added <code>.btn { }</code> rule showing exactly which
            declaration beat it.
          </Para>

          <CodeBox label="The rule that was actually winning, defined earlier in the same file">{`#checkout-page .cart-controls .btn {
  color: #1a1a1a;
}`}</CodeBox>

          <Para>
            This is a direct, real-world instance of Part 05: an ID selector combined with two class
            selectors produces a specificity score far higher than a single class selector, and no amount
            of appending the new rule further down the file can change that — source order (Part 04) only
            breaks ties, and this was never a tie.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="Matching or exceeding the existing rule's specificity">{`#checkout-page .cart-controls .btn {
  color: red;
}

/* Same selector shape as the rule it needs to beat, added AFTER it in
   source order — now it wins fairly, on the cascade's actual rules,
   with no !important required. */`}</CodeBox>

          <Para>
            The team also flags the original overly-specific selector for cleanup — an ID plus two nested
            classes for something as simple as a button color is exactly the kind of selector that makes
            every future override this painful. This diagnosis — "my rule is later in the file but still
            loses" always tracing back to specificity, not source order — is one of the single most common
            CSS debugging sessions a front-end engineer will run, on every team, for their entire career.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Basics</SectionTitle>

        {[
          {
            wrong: '"CSS just applies rules top to bottom, so whatever is written last always wins"',
            right: 'Source order only decides ties between rules of EQUAL specificity. A more specific selector written earlier in the file still beats a less specific selector written later — as shown in the Real World example above, this is one of the most common sources of "why isn\'t my CSS applying" confusion.',
          },
          {
            wrong: '"Inline styles in the style attribute are just a normal, equally-weighted way to style an element"',
            right: 'Inline styles carry a specificity higher than any selector-based rule (short of !important), which is exactly why they are hard to override later. They should be reserved for one-off, dynamically computed values — never used as a general styling method.',
          },
          {
            wrong: '"Every CSS property inherits from its parent unless you say otherwise"',
            right: 'Only a specific, well-defined set of mostly text-related properties inherit by default (color, font-family, font-size, line-height, and similar). Box-model and layout properties like margin, padding, border, and width do NOT inherit — each element must set them explicitly.',
          },
          {
            wrong: '"!important is a normal, safe way to make sure a style applies"',
            right: 'It overrides the entire specificity system, which makes it very difficult to override later without adding another, equally forceful !important. It is a near-universal signal of an underlying specificity problem that was worked around instead of fixed, and should be used sparingly, if at all, in application code.',
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
            q: 'Explain the three forces the CSS cascade uses to resolve conflicting rules, in order of power.',
            a: 'From weakest to strongest: source order (later rules win ties between equally-specific selectors), specificity (a score based on selector type — ID beats class beats element), and importance (!important overrides both of the above entirely). A rule with higher specificity always beats a less specific one regardless of order, and !important beats everything short of another !important.',
          },
          {
            q: 'Why would you generally choose an external stylesheet over inline styles or a <style> block, in a real production codebase?',
            a: 'External stylesheets can be cached independently by the browser (so repeat page loads on the same site do not re-download the CSS), can be shared across every page on a site without duplication, and keep structure (HTML) and presentation (CSS) cleanly separated. Inline styles also carry unusually high specificity, making them hard to override, and <style> blocks cannot be shared across multiple HTML files without copy-pasting.',
          },
          {
            q: 'What is inheritance in CSS, and give two examples of properties that inherit and two that do not.',
            a: 'Inheritance means a child element automatically takes a parent\'s computed value for certain properties if the child does not set its own. Typography-related properties inherit by default — color and font-family are common examples. Box-model and layout properties do not inherit — margin and border are common examples, since automatically applying a parent\'s border to every nested descendant would compound visually with nesting depth.',
          },
          {
            q: 'A developer adds a new CSS rule at the very bottom of the stylesheet, but an earlier rule keeps winning. What is the most likely cause, and how would you diagnose it?',
            a: 'The earlier rule almost certainly has higher specificity — an ID selector, or a longer chain of combined class/attribute selectors — which beats a later, less specific rule regardless of source order. The fastest diagnosis is opening browser DevTools, inspecting the element, and looking at the Styles panel, which shows every matching rule and visually strikes through any that lost the cascade, along with the specificity of the winning one.',
          },
          {
            q: 'When, if ever, is !important an acceptable thing to use in production CSS?',
            a: 'Narrowly — most legitimately for a small set of intentional utility classes that must always win regardless of what else targets the element (a .hidden { display: none !important; } utility, for instance), or for overriding inline styles injected by third-party JavaScript that cannot otherwise be controlled. Using it to win an argument against your own earlier, equally-controllable CSS is generally a sign the actual specificity conflict should be fixed instead.',
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
        <SectionTitle>CSS Basics Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the semicolon between declarations',
            a: 'color: red font-size: 16px; without a semicolon after "red" gets parsed as one invalid declaration — the browser silently drops it and moves on, rather than raising a visible error. Always terminate every declaration with a semicolon, including the last one in a block.',
          },
          {
            q: 'Assuming a later rule always wins',
            a: 'As covered in Parts 04-05, source order only breaks ties between equally specific selectors. A rule written earlier with a more specific selector (an ID, or several chained classes) will still beat a less specific rule written later. Check specificity before assuming order is the deciding factor.',
          },
          {
            q: 'Overusing ID selectors for styling',
            a: 'IDs carry high specificity, which makes any later rule that needs to override them require an equally high or higher specificity — often escalating into !important. Prefer classes for styling; reserve IDs for JavaScript hooks and anchor-link targets.',
          },
          {
            q: 'Expecting box-model properties to inherit',
            a: 'A common early mistake is setting padding or a border on a parent container and expecting nested children to automatically pick it up. They will not — only a specific set of mostly text-related properties inherit by default, as covered in Part 07.',
          },
          {
            q: 'Reaching for !important as a first fix instead of a last resort',
            a: 'It solves the immediate symptom but makes the actual specificity conflict permanent and harder to override cleanly later. Diagnose the real specificity mismatch with DevTools first — !important should be a deliberate, rare decision, not a default habit.',
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
        <SectionTitle>Rendering Problems You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `A style rule is visible in the DevTools Styles panel with a strikethrough`,
            cause: 'The declaration lost the cascade to another rule with equal or higher specificity, or the same specificity but later source order. The strikethrough is the browser telling you exactly which declaration this one lost to.',
            fix: 'Click the winning rule shown above it in the Styles panel to see its selector and specificity. Either increase your own selector\'s specificity to match or exceed it, or restructure so the conflict does not exist in the first place.',
          },
          {
            error: `A declaration silently does nothing, with no error in the console`,
            cause: 'CSS does not raise errors for invalid or misspelled properties/values the way JavaScript does for a typo — the browser simply ignores any declaration it does not understand and moves on, with no visible warning at all.',
            fix: 'Check the DevTools Styles panel — an ignored declaration is typically shown with a small warning icon or is simply absent from the computed styles. Double-check property names and value syntax against MDN if a style appears to have no effect whatsoever.',
          },
          {
            error: `Text styling (color, font) applies where you did not explicitly set it`,
            cause: 'Inheritance — a parent element (often body or html) set a text-related property, and every nested descendant that did not set its own value picked it up automatically, exactly as described in Part 07.',
            fix: 'This is expected behaviour, not a bug — if a specific element needs to break from the inherited value, set that property explicitly on the element itself, which will override the inherited value.',
          },
          {
            error: `A style set with !important cannot be overridden by a later, more specific rule`,
            cause: 'Importance is the strongest force in the cascade — a normal rule, no matter how specific, cannot override a declaration marked !important.',
            fix: 'The only way to override an !important declaration is with another !important declaration of equal or higher specificity written later. The better long-term fix is usually removing the original !important and resolving the underlying specificity conflict properly.',
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
        'Every CSS rule has two parts: a selector (which elements) and a declaration block of property: value; pairs (what changes).',
        'CSS can be attached three ways — external stylesheet, internal <style> block, or inline style attribute — with external winning for nearly every real production project.',
        'The cascade resolves conflicts using three forces, weakest to strongest: source order, specificity, and importance (!important).',
        'Source order only breaks ties between selectors of EQUAL specificity — a more specific selector written earlier still beats a less specific one written later.',
        'Specificity is roughly: inline styles > ID selectors > class/attribute/pseudo-class selectors > element/pseudo-element selectors. The full numeric calculation is covered in the next module.',
        '!important overrides the entire specificity system and should be used sparingly — it is usually a symptom of an unresolved specificity conflict, not a real fix.',
        'Inheritance is separate from the cascade: a specific set of mostly text-related properties (color, font-family, line-height) pass down to children automatically; box-model properties (margin, padding, border) do not.',
        'Class selectors are the standard, reusable building block of real-world CSS — reserve IDs for JavaScript hooks and anchor targets, not general styling.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 18 covers the box model in full — content, padding, border, and margin, box-sizing, and the
          margin-collapsing behaviour that catches nearly every engineer off guard at least once.
        </p>
        <Link href="/learn/html-css/the-box-model" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 18 → The Box Model — Margin, Border, Padding, Content
        </Link>
      </div>
    </LearnLayout>
  )
}
