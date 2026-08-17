import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML & CSS Interview Prep — Common Questions and Patterns — HTML & CSS | Chaduvuko',
  description:
    'The HTML and CSS questions that come up in real front-end interviews, answered at senior-engineer depth.',
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

const QA = ({ q, a }: { q: string; a: string }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 20,
  }}>
    <div style={{
      fontSize: 14, fontWeight: 800, color: 'var(--text)',
      marginBottom: 14, lineHeight: 1.4,
    }}>
      {q}
    </div>
    <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
      {a}
    </div>
  </div>
)

export default function HtmlCssInterviewPrep() {
  return (
    <LearnLayout
      title="HTML & CSS Interview Prep — Common Questions and Patterns"
      description="The HTML and CSS questions that come up in real front-end interviews, answered at senior-engineer depth."
      section="HTML & CSS — Module 42 (Capstone)"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Intro ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Final Module" />
        <SectionTitle>Everything From This Track, Interview-Ready</SectionTitle>
        <Para>
          This module is different from the other 41 — instead of teaching one new topic in depth, it
          pulls together the questions, patterns, and hands-on challenges from across the entire
          curriculum into the format an actual front-end interview uses: real questions, answered
          completely, organized by theme, plus the "build this" coding challenges that come up
          constantly in real interview loops. If a question below references something unfamiliar, the
          module it was originally covered in is named — this is meant to be a review and synthesis,
          not a first introduction.
        </Para>
      </section>

      <Divider />

      {/* ── Part A — Semantic HTML & Accessibility ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Semantic HTML & Accessibility" />
        <SectionTitle>Structure, Meaning, and Whether Every User Can Actually Use What You Built</SectionTitle>

        <QA
          q="Why does semantic HTML (using nav, main, article, section, aside instead of div everywhere) actually matter, beyond readability of the source?"
          a="Semantic elements carry meaning that assistive technology, browsers, and search engines all rely on — a screen reader user can jump directly to <main> or between <nav> landmarks; a div-only page offers no such navigation shortcuts at all. Semantic tags also get sensible default behavior and implicit ARIA roles for free (a <button> is focusable and keyboard-activatable without any extra code; a div styled to look like a button is not, unless you manually re-implement all of that). It is a case where doing the 'more correct' thing is also simply less work."
        />
        <QA
          q="What's the actual difference between <div> and <span>, and when would a semantic tag be preferred over both?"
          a="Both are generic containers with no inherent meaning — div is block-level, span is inline. The difference from a semantic tag isn't display behavior, it's that div/span communicate nothing about the CONTENT's role, while <article>, <nav>, <button>, <time>, etc. tell the browser, search engines, and assistive tech what the content actually is. Reach for div/span only when no semantic element genuinely fits — they are the fallback, not the default."
        />
        <QA
          q="How would you make a custom-styled clickable card component accessible, if the design calls for the entire card (not just a small link inside it) to be clickable?"
          a="Wrap the actionable content in a real <a> or <button> rather than adding a click handler to a div — this gets keyboard focus, Enter/Space activation, and correct screen-reader announcement for free. A common real pattern: make the whole card a single <a> wrapping its contents (valid HTML, since a link can contain block-level content), or use a 'stretched link' technique where a positioned pseudo-element or absolutely positioned link fills the card while the actual link text stays visually inside it."
        />
        <QA
          q="What is the accessibility tree, and how does it relate to what you write in HTML?"
          a="The accessibility tree is a parallel structure the browser builds alongside the DOM specifically for assistive technology — it strips out purely visual/structural nodes and keeps the ones that carry meaning: roles, names, states, and values. Semantic HTML and correct ARIA attributes are what shape this tree; writing <div onClick> instead of <button> produces an accessibility tree node with no role and no keyboard interaction, which is invisible or useless to a screen reader user even though it's fully visible on screen."
        />
        <QA
          q="When should you reach for an ARIA attribute instead of a native HTML element?"
          a="Only when no native element already provides the needed semantics — the first rule of ARIA use is 'no ARIA is better than bad ARIA,' and native elements come with correct behavior built in. ARIA earns its place for things HTML has no native equivalent for: a live region announcing dynamic content changes (aria-live), or supplementing a genuinely custom widget (like a combobox built from scratch) with the roles/states a native equivalent doesn't fully cover."
        />
        <QA
          q="What's the difference between visibility: hidden, display: none, and a visually-hidden-but-screen-reader-accessible pattern — and when would you use each?"
          a="display: none removes the element from layout AND the accessibility tree entirely — invisible to everyone, including screen readers. visibility: hidden removes it visually and from the accessibility tree, but it still occupies layout space. A 'visually hidden' utility class (absolute positioning, 1px clip, no display/visibility change) removes it from SIGHT only, keeping it in the accessibility tree — the standard technique for content meant for screen reader users only, like an icon-only button's descriptive label."
        />
      </section>

      <Divider />

      {/* ── Part B — Box Model, Cascade & Specificity ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Box Model, the Cascade & Specificity" />
        <SectionTitle>The Fundamentals Every Front-End Interview Assumes You Know Cold</SectionTitle>

        <QA
          q="Walk through exactly how the box model works, including the difference box-sizing makes."
          a="Every element is a box with four layers, from the inside out: content, padding, border, margin. Under the default box-sizing: content-box, the width/height you declare applies ONLY to the content box — padding and border are added on top, so a 300px-wide box with 20px padding and a 2px border renders at 344px. Under box-sizing: border-box, width/height instead include padding and border, so that same box stays exactly 300px wide with the content area shrinking to accommodate. Margin is never included in either mode — it's space outside the border, affecting layout position, not the element's own rendered size."
        />
        <QA
          q="Explain the CSS cascade — what actually determines which conflicting rule wins?"
          a="In order of precedence: importance and origin first (author !important beats everything except user-agent !important; then author normal styles; then user-agent defaults), then specificity (inline > ID > class/attribute/pseudo-class > element), then source order (later rules win ties). A common trap: people assume source order is the primary tiebreaker, but specificity is checked FIRST — a highly specific rule earlier in the file still beats a low-specificity rule declared later."
        />
        <QA
          q="How exactly is specificity calculated, and can you give an example where the 'wrong' rule wins because of it?"
          a="Specificity is commonly represented as a 4-part tuple: inline styles, ID selectors, class/attribute/pseudo-class selectors, element/pseudo-element selectors. Given #header .nav a { color: blue; } (specificity 0-1-1-1) and a { color: red; text-decoration: underline; } declared later (0-0-0-1), the FIRST rule still wins the color, despite appearing earlier — its higher specificity beats source order, a genuinely common source of 'I changed the CSS and nothing happened' confusion."
        />
        <QA
          q="What's the difference between inherited and non-inherited CSS properties, and why does that distinction matter practically?"
          a="Inherited properties (color, font-family, font-size, line-height, and most text-related properties) automatically pass down to descendant elements unless explicitly overridden. Non-inherited properties (margin, padding, border, width, display, and most box/layout properties) do NOT pass down — each element starts fresh. This matters practically because setting font-family once on body cascades everywhere for free, while a border set on a parent has zero effect on its children — a distinction that trips up people expecting CSS properties to behave uniformly."
        />
        <QA
          q="What does the universal box-sizing: border-box reset actually do, and why is it applied so broadly across real projects?"
          a="A universal selector rule (targeting every element, often paired with its ::before and ::after pseudo-elements) that switches every element's box model so declared width/height include padding and border, matching what most developers intuitively expect and making layout math dramatically more predictable — a component with padding no longer silently grows past its declared width. It is applied nearly universally in real projects specifically because content-box's default behavior causes constant, subtle layout bugs otherwise."
        />
      </section>

      <Divider />

      {/* ── Part C — Layout: Flexbox, Grid, Positioning ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Flexbox, Grid & Positioning" />
        <SectionTitle>Layout Decision-Making — The Question Every Interview Eventually Asks</SectionTitle>

        <QA
          q="How do you decide between Flexbox and Grid for a given layout?"
          a="Flexbox is one-dimensional — it excels at distributing space along a single row or column (a navbar, a button group, centering content). Grid is two-dimensional — it defines both rows and columns simultaneously, making it the right tool whenever a layout has real structure in both directions at once (a page shell with header/sidebar/main/footer, a dashboard, a card gallery with aligned rows AND columns). A useful mental test: if you find yourself trying to force a Flexbox row to also align items consistently in columns below it, that's usually the signal to switch to Grid. In practice, most real pages use both together — Grid for the page-level shell, Flexbox for the one-dimensional alignment inside individual components."
        />
        <QA
          q="Explain each value of the position property and what establishes a new positioning context."
          a="static is the default — no special positioning, position properties (top/left/etc.) have no effect. relative positions the element relative to its own normal position, WITHOUT removing it from the normal flow, and — critically — establishes a positioning context for absolutely-positioned descendants. absolute removes the element from normal flow entirely and positions it relative to its nearest ancestor with a position value other than static (falling back to the initial containing block/viewport if none exists). fixed positions relative to the viewport and stays put during scrolling. sticky behaves like relative until a scroll threshold is crossed, then behaves like fixed within its containing block's bounds."
        />
        <QA
          q="What is a stacking context, and why can z-index sometimes 'not work' even though the value looks correct?"
          a="A stacking context is a self-contained layer for z-index comparisons — z-index values only compete against SIBLINGS within the same stacking context, never across contexts. Certain CSS properties create a new stacking context implicitly (position with a z-index value, opacity less than 1, transform, filter, and several others). A very common bug: an element has z-index: 9999 but still renders behind something else, because a parent created its own stacking context with a lower effective stacking order, and no z-index value on the child can escape that parent's context to compete with elements outside it."
        />
        <QA
          q="What's the difference between align-items and justify-content in Flexbox, and how does flex-direction affect which is which?"
          a="justify-content aligns items along the MAIN axis; align-items aligns items along the CROSS axis. With the default flex-direction: row, the main axis is horizontal, so justify-content controls horizontal spacing and align-items controls vertical alignment. Switch to flex-direction: column and the axes swap — justify-content now controls VERTICAL spacing and align-items controls horizontal alignment. This axis-relative (not screen-relative) behavior is one of the most common sources of Flexbox confusion for people new to it."
        />
        <QA
          q="When would you reach for CSS Grid's grid-template-areas instead of grid-template-columns/rows with explicit line numbers?"
          a="grid-template-areas gives layout a literal, readable ASCII-art shape directly in the CSS — genuinely valuable for a page shell (header/sidebar/main/footer) where the visual structure benefits from being immediately legible in the stylesheet itself, and where that structure needs to change per breakpoint (redefining grid-template-areas inside a media query cleanly reflows the whole layout). Explicit line-number placement is more precise for finer-grained or highly dynamic grids (like a gallery with a variable number of items) where naming every area doesn't make sense."
        />
      </section>

      <Divider />

      {/* ── Part D — Responsive Design & Performance ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Responsive Design & Performance" />
        <SectionTitle>Building for Every Screen, and Keeping It Fast</SectionTitle>

        <QA
          q="What does 'mobile-first' actually mean in terms of how the CSS itself is written, not just the design process?"
          a="Mobile-first means the UNPREFIXED, default CSS rules target the smallest screen, and media queries use min-width to progressively ADD complexity as the viewport grows — the opposite of writing desktop styles as the default and using max-width queries to strip things away for small screens. Practically, this means base styles should be genuinely simple layouts (often single-column, stacked), with min-width breakpoints introducing multi-column layouts, larger typography, and additional visual elements as space allows."
        />
        <QA
          q="What's the difference between px, %, em, rem, and viewport units (vw/vh), and when does each genuinely earn its place?"
          a="px is an absolute unit, disconnected from any user font-size preference — fine for things like a 1px border, poor for font sizes. % is relative to the parent's corresponding value. em is relative to the CURRENT element's font-size (and compounds when nested, since each em references its own element's computed font-size, not a fixed root). rem is relative to the ROOT element's font-size only, avoiding the compounding problem — the standard choice for most font-size and spacing values in a real project. vw/vh are relative to the viewport itself, useful for things that should genuinely scale with screen size, like a full-bleed hero section's height."
        />
        <QA
          q="How does the srcset/sizes combination on an img tag actually improve performance, versus just using a single large image everywhere?"
          a="srcset provides the browser with several versions of the same image at different resolutions, and sizes tells the browser how large the image will actually be RENDERED at different viewport widths — the browser then downloads only the smallest image file that satisfies the actual rendered size and the device's pixel density, rather than always downloading one large image and scaling it down in the browser. On a phone, this can mean downloading a fraction of the bytes a desktop-optimized single image would require, directly improving load time and Core Web Vitals."
        />
        <QA
          q="Why are transform and opacity considered the 'cheap' properties to animate, while properties like width, height, or top/left are considered expensive?"
          a="Animating layout-affecting properties (width, height, top, left, margin) forces the browser to re-run layout (recalculating the position/size of potentially many other elements) and then repaint, on every single frame — expensive, and prone to visible jank. transform and opacity can typically be handled entirely on the GPU's compositing layer, skipping layout and paint recalculation altogether, which is why the standard advice for smooth animation is 'animate transform/opacity, not layout properties' — e.g. translate an element instead of animating its top/left position."
        />
        <QA
          q="What does prefers-reduced-motion do, and why does implementing it matter beyond just accessibility compliance?"
          a="It's a media query that reflects a user's OS-level accessibility setting requesting reduced or disabled non-essential motion, most often set by users with vestibular disorders where large animations can cause genuine physical discomfort. Wrapping decorative animations in @media (prefers-reduced-motion: no-preference) — the inverse pattern, applying motion only when NOT reduced — respects that setting without requiring any extra work from the user. It matters beyond compliance because it's a real, documented category of user harm that a small, cheap CSS change directly prevents."
        />
      </section>

      <Divider />

      {/* ── Part E — Hands-On Coding & Layout Challenges ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Hands-On Coding & Layout Challenges" />
        <SectionTitle>Four Classic Problems, Worked Through Completely</SectionTitle>

        <Para>
          Beyond conceptual questions, most front-end interviews include at least one live "build this"
          or "fix this" exercise. These four are among the most commonly seen — not because the exact
          prompts repeat verbatim, but because the underlying techniques (centering, grid-based
          composition, flex-based page shells, box-model debugging) generalize to a huge fraction of
          what actually gets asked.
        </Para>

        <SubTitle>1. Center a div — three different ways, and their trade-offs</SubTitle>
        <Para>
          A deceptively simple prompt that is really testing whether you understand several layout
          systems well enough to choose deliberately between them, not just whether you can produce
          centered content.
        </Para>
        <CodeBox label="Approach 1 — Flexbox (the most common real-world default)">{`.parent {
  display: flex;
  justify-content: center;   /* centers on the main axis */
  align-items: center;       /* centers on the cross axis */
  height: 100vh;
}
/* Works for one or many children, unknown child dimensions, and adapts
   instantly if the child's size changes. The default choice in most
   real projects for this exact problem. */`}</CodeBox>
        <CodeBox label="Approach 2 — CSS Grid (equally simple, sometimes preferred if Grid is already in use)">{`.parent {
  display: grid;
  place-items: center;   /* shorthand for align-items + justify-items, both centered */
  height: 100vh;
}
/* Marginally more concise than the Flexbox version for a SINGLE
   centered child. Less natural if you also need to distribute
   several children in a row alongside the centering. */`}</CodeBox>
        <CodeBox label="Approach 3 — Absolute positioning with transform (works without a flex/grid parent)">{`.parent { position: relative; height: 100vh; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* Useful specifically when the parent's layout mode can't change
   (it needs to stay a normal block flow for other reasons), or when
   centering an element ON TOP of other content rather than among it.
   Requires knowing this specific top/left + transform combination —
   margin: auto alone only centers horizontally in a block context. */`}</CodeBox>
        <Para>
          The trade-off worth stating out loud in an interview: Flexbox and Grid are the modern
          defaults because they don&apos;t remove the element from normal flow and adapt automatically
          to content size changes; the absolute-positioning approach is reached for specifically when
          the element needs to be centered <em>independent of</em> its siblings&apos; layout, such as a
          modal overlay centered on top of unrelated page content.
        </Para>

        <SubTitle>2. Build a responsive card grid from scratch</SubTitle>
        <Para>
          A staple layout exercise — a grid of cards that reflows its column count based on available
          width, without a fixed breakpoint list to maintain.
        </Para>
        <CodeBox label="A self-adjusting card grid — no media queries required">{`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}
/* auto-fit tells Grid to fit as many 240px+ columns as the container
   allows, and 1fr lets each column stretch to fill any remaining
   space evenly. As the viewport shrinks, columns drop one at a time
   automatically — the same rule handles a phone, a tablet, and an
   ultrawide monitor with zero explicit breakpoints. */`}</CodeBox>
        <CodeBox label="An individual card, using the box-model and spacing-scale habits from earlier modules">{`.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}`}</CodeBox>
        <Para>
          A strong follow-up an interviewer often asks: what happens with exactly one card in the grid?
          With <code>auto-fit</code>, that single card stretches to fill the full row width (since{' '}
          <code>1fr</code> claims all remaining space). If a single card should instead stay at its
          minimum size rather than stretching, swapping <code>auto-fit</code> for <code>auto-fill</code>{' '}
          changes that behavior — worth knowing the distinction exists, even if <code>auto-fit</code> is
          the more commonly desired behavior for a genuine card grid.
        </Para>

        <SubTitle>3. Fix this broken sticky footer</SubTitle>
        <Para>
          A footer that should sit at the bottom of the viewport on short pages, but scrolls up and
          leaves a gap, or overlaps content, is one of the most commonly seen "fix this" prompts.
        </Para>
        <CodeBox label="The broken version">{`body { margin: 0; }
.footer { position: absolute; bottom: 0; width: 100%; }
/* On a page with little content, the footer sits at the bottom of the
   VIEWPORT initially, but position: absolute takes it out of normal
   flow entirely — it doesn't push against the actual page content, so
   as soon as any content overlaps that same vertical space, the
   footer sits ON TOP of it instead of below it. */`}</CodeBox>
        <CodeBox label="Fixed — the Flexbox sticky-footer pattern">{`html, body { height: 100%; margin: 0; }
.page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.main-content { flex: 1; }   /* grows to fill any remaining space */
.footer { /* no special positioning needed at all */ }

/* <body><div class="page"><header>...</header>
     <main class="main-content">...</main>
     <footer class="footer">...</footer>
   </div></body> */`}</CodeBox>
        <Para>
          The mechanism: <code>flex: 1</code> on the main content area means it grows to consume any
          leftover vertical space in the flex column, pushing the footer down to the bottom of the
          viewport on short pages — but because the footer is still in normal flow (not{' '}
          <code>position: absolute</code>), it is naturally pushed further down by real content on
          longer pages instead of overlapping it. This is the same core idea covered in the Flexbox in
          Practice module, worth being able to reproduce from memory.
        </Para>

        <SubTitle>4. Explain and fix this box-sizing bug</SubTitle>
        <Para>
          A short, deliberately broken snippet — a very common warm-up exercise meant to check that box
          model fundamentals are genuinely internalized, not just memorized as a definition.
        </Para>
        <CodeBox label="The broken layout — three 33.33% columns that wrap to a second row">{`.column {
  width: 33.33%;
  padding: 0 16px;
  float: left;
  box-sizing: content-box;   /* the default, made explicit here */
}
/* Three columns at exactly 33.33% width EACH, plus 32px of padding
   added on top of every one of them (16px left + 16px right), pushes
   the total rendered width past 100% of the container — the third
   column has nowhere left to go and wraps onto a new row. */`}</CodeBox>
        <CodeBox label="Fixed — border-box makes the declared width the FULL rendered width">{`.column {
  width: 33.33%;
  padding: 0 16px;
  float: left;
  box-sizing: border-box;   /* padding is now included WITHIN the 33.33% */
}
/* Now each column's rendered width, padding included, is exactly
   33.33% of the container — three of them sum to exactly 100%,
   fitting on a single row as intended. */`}</CodeBox>
        <Para>
          Worth naming explicitly in an interview: this exact bug is precisely why{' '}
          <code>{`* { box-sizing: border-box; }`}</code> is applied so broadly as a near-universal reset
          in real projects — it eliminates this entire category of "the math doesn&apos;t add up to
          100%" layout bug by default, rather than requiring every component author to remember it
          individually.
        </Para>
      </section>

      <Divider />

      {/* ── Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Front-End Interview Loop at a Media Startup in Portland</SectionTitle>

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
            Scenario — Media/publishing startup, Portland · Front-end engineer interview loop
          </div>

          <Para>
            A candidate is asked to live-code a responsive card grid for an article listing page,
            starting from a bare HTML skeleton. They reach for CSS Grid&apos;s{' '}
            <code>{`repeat(auto-fit, minmax(240px, 1fr))`}</code> pattern immediately, get a working
            reflowing grid in under two minutes, and the interviewer moves on to the actual point of
            the exercise: "the design calls for the cards to be centered as a group when there are
            fewer than three of them, instead of stretching to fill the row. How would you handle
            that?"
          </Para>

          <Para>
            The candidate talks through two real options out loud before writing code: constraining the
            grid&apos;s max-width and centering the grid container itself with <code>margin: 0 auto</code>{' '}
            (works, but doesn&apos;t truly center individual cards when there are exactly one or two),
            versus switching the grid&apos;s <code>justify-content</code> to <code>center</code> so
            existing columns cluster in the middle rather than stretching to fill unused space. They
            implement the second option, then proactively test it by removing cards down to a single
            one in DevTools to confirm the behavior holds at every count — without being asked to.
          </Para>

          <SubSubTitle>What the interviewer was actually evaluating</SubSubTitle>

          <Para>
            The hiring debrief centered on two things: that the candidate reasoned about a genuinely
            subtle Grid behavior (how <code>auto-fit</code> and <code>justify-content</code> interact
            when column count is low) rather than guessing and iterating blindly, and that they tested
            an edge case unprompted. As the panel put it afterward: "we weren&apos;t testing whether
            they knew the exact syntax on day one — most of the syntax questions get looked up
            constantly on real teams anyway. We were testing whether they could reason clearly about
            layout behavior and verify their own work." This is exactly why every Q&amp;A in this
            module has consistently paired the mechanism with the reasoning behind it, not just a
            memorized final answer.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions About Front-End Interviews" />
        <SectionTitle>Four Misconceptions About How These Interviews Are Actually Graded</SectionTitle>

        {[
          {
            wrong: '"The interviewer mainly wants to see whether you remember exact CSS property names and syntax"',
            right: 'Most interviewers weight reasoning and trade-off awareness — WHY Flexbox versus Grid, WHY a bug is happening, WHAT you would verify before calling something done — at least as heavily as syntax recall, and many explicitly allow looking up exact property names. Being able to explain the box model or a stacking context clearly, even while double-checking a specific syntax detail, generally reads better than reciting syntax with no explanation of the underlying mechanism.',
          },
          {
            wrong: '"Since it\'s just CSS, layout questions are lower-stakes than JavaScript/algorithm questions"',
            right: 'Layout and CSS questions are frequently where real production bugs live in day-to-day front-end work — far more often than algorithmic edge cases — so many teams weight them just as heavily, specifically because they predict how a candidate will actually perform on real tickets far more directly than an algorithm question would.',
          },
          {
            wrong: '"A live layout exercise is graded purely on whether the final result looks pixel-correct"',
            right: 'The process is usually the bigger signal — whether you clarify ambiguous requirements before coding, whether you consider a responsive/accessibility angle without being prompted, and whether you verify edge cases (very few items, very long text, a very narrow viewport) yourself rather than needing the interviewer to point them out.',
          },
          {
            wrong: '"Accessibility questions are a specialized, separate track from general front-end interview questions"',
            right: 'Semantic HTML and basic accessibility (keyboard focus, correct roles, color contrast, prefers-reduced-motion) are treated as baseline front-end competence at most companies now, not a specialty — expect at least one question or live-coding decision point that touches it, even in an interview loop not explicitly labeled "accessibility."',
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

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Interviews reward reasoning out loud — why Flexbox versus Grid, why a bug is happening, what edge case needs verifying — at least as much as a single correct final answer.',
        'A small set of recurring patterns (Flexbox/Grid centering, responsive grids via auto-fit, the Flexbox sticky-footer pattern, box-sizing debugging) covers a large fraction of real front-end layout interview questions.',
        'The conceptual fundamentals that come up constantly — the box model, specificity and the cascade, stacking contexts, the difference between semantic and non-semantic markup — are exactly the ones this curriculum flagged individually across earlier modules, because they are also genuinely common real production bugs, not just interview trivia.',
        'Semantic HTML and basic accessibility are treated as baseline front-end competence, not a specialty track — expect them to surface even in interviews not explicitly framed around accessibility.',
        'Testing your own solution against edge cases (very few grid items, a very narrow viewport, long content) unprompted is consistently rated positively — it mirrors real engineering practice, not just interview performance.',
      ]} />

      <Divider />

      {/* ── Completion ── */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${C}18, transparent)`,
          border: `1px solid ${C}44`, borderRadius: 14, padding: '32px 36px',
        }}>
          <p style={{
            fontSize: 10, color: C, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)', fontWeight: 800, margin: '0 0 12px',
          }}>
            🎉 Track Complete — All 42 Modules
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1px',
            color: 'var(--text)', marginBottom: 16, fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>
            You&apos;ve completed the full HTML &amp; CSS track — foundations to advanced.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 24 }}>
            From your first <code>{`<!DOCTYPE html>`}</code> through semantic structure, forms, the box
            model, the cascade, Flexbox and Grid, responsive design, modern CSS, and now interview
            readiness — that is the complete arc of what a working front-end engineer actually needs.
            Revisit any module as a reference whenever a real project calls for it; that is exactly
            what this track is for, not just a one-time read-through.
          </p>
          <Link href="/learn/html-css" style={{ background: C, color: '#fff', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
            ← Back to the HTML & CSS track overview
          </Link>
        </div>
      </section>
    </LearnLayout>
  )
}
