import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Flexbox in Practice — Real Layouts — HTML & CSS | Chaduvuko',
  description:
    'Building real, common UI patterns with Flexbox — a responsive navbar, an equal-height card grid, the centering reflex, a sticky footer layout, and the gap property for spacing between flex items.',
}

const C = '#facc15'

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

export default function FlexboxInPractice() {
  return (
    <LearnLayout
      title="Flexbox in Practice — Real Layouts"
      description="Building real, common UI patterns with Flexbox — a responsive navbar, an equal-height card grid, the centering reflex, a sticky footer layout, and the gap property."
      section="HTML & CSS — Module 24"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — gap" />
        <SectionTitle>gap — Spacing Between Flex Items, Without Margin Hacks</SectionTitle>

        <Para>
          Before <code>gap</code> was supported on flex containers, spacing items apart required margin
          tricks on individual items, almost always combined with an awkward{' '}
          <code>:not(:last-child)</code> selector (or similar) to avoid an unwanted extra margin on the
          final item. <code>gap</code> replaces all of that with a single declaration on the container
          itself.
        </Para>

        <CodeBox label="gap on a flex container — one declaration, no margin hacks">{`.toolbar {
  display: flex;
  gap: 16px;   /* 16px of space between EVERY adjacent item — never on the outer edges */
}

/* Different horizontal vs vertical spacing (matters once flex-wrap creates multiple rows) */
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 16px;   /* row-gap: 24px, column-gap: 16px */
}`}</CodeBox>

        <Para>
          The critical detail that makes <code>gap</code> genuinely better than margin-based spacing:
          it only ever inserts space <strong>between</strong> items, never on the outer edges of the
          container — there is no equivalent of the old "last item has an unwanted trailing margin"
          problem to work around, because <code>gap</code> was designed around exactly that pain point.
        </Para>

        <Callout type="tip">
          <code>gap</code> works identically on Grid containers too (covered in the CSS Grid modules
          later in this track) — it is not a Flexbox-only property, though it originated in Grid and was
          later added to Flexbox. Browser support for <code>gap</code> on flex containers specifically is
          universal in every browser this track targets, so there is no longer a real reason to reach for
          margin-based spacing hacks in new Flexbox code.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Centering Reflex" />
        <SectionTitle>justify-content + align-items — The Single-Container Centering Reflex</SectionTitle>

        <Para>
          Centering a single element — both horizontally and vertically, inside its parent — was
          genuinely painful before Flexbox: margin math, absolute positioning combined with negative
          margins or transforms, or table-cell display hacks were all common workarounds. Flexbox reduces
          the entire problem to two declarations on the parent.
        </Para>

        <CodeBox label="The centering reflex — three lines, works for anything">{`.centered-wrapper {
  display: flex;
  justify-content: center;   /* centers along the main axis (horizontal, by default) */
  align-items: center;         /* centers along the cross axis (vertical, by default) */
}

<!-- Works identically whether the child is text, a button, an image,
     or an entire card — and works even when the child's size is
     completely unknown ahead of time, which the old margin-based
     "margin: 0 auto" trick could never do for vertical centering. -->
<div class="centered-wrapper" style="height: 100vh;">
  <div class="login-card">...</div>
</div>`}</CodeBox>

        <Para>
          This exact three-declaration pattern is so common in real interfaces — modals, loading
          spinners, empty states, login screens, "no results found" messages — that it is worth
          committing to memory as a single reflex rather than deriving it from first principles each
          time: <code>display: flex</code>, <code>justify-content: center</code>,{' '}
          <code>align-items: center</code>.
        </Para>

        <Callout type="warning">
          This reflex centers the child within whatever box the parent already occupies —{' '}
          <strong>it does not create height on its own.</strong> A common follow-up mistake: applying
          this to a parent with no defined height (and no content forcing one), then being confused why
          vertical centering "does not work." The parent needs an actual height — explicit (like{' '}
          <code>height: 100vh</code> for full-viewport centering) or inherited from its own layout
          context — before <code>align-items: center</code> has any vertical room to work with.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Responsive Navbar" />
        <SectionTitle>Building a Responsive Navbar</SectionTitle>

        <Para>
          A standard navbar — logo on the left, nav links in the middle or right, all vertically centered
          on one row — is one of the most universal real-world Flexbox layouts, and combines several
          properties from the previous module in one practical structure.
        </Para>

        <CodeBox label="A complete navbar: logo, centered nav links, right-aligned actions">{`<nav class="navbar">
  <a class="navbar-logo" href="/">Chaduvuko</a>
  <ul class="navbar-links">
    <li><a href="/learn">Learn</a></li>
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/about">About</a></li>
  </ul>
  <div class="navbar-actions">
    <a class="btn-ghost" href="/login">Log in</a>
    <a class="btn-primary" href="/signup">Sign up</a>
  </div>
</nav>

.navbar {
  display: flex;
  align-items: center;         /* vertically centers logo, links, and actions on the row */
  justify-content: space-between; /* pushes logo, links, and actions apart across the row */
  padding: 16px 32px;
  gap: 24px;
}

.navbar-links {
  display: flex;         /* the <ul> becomes its OWN flex container */
  align-items: center;
  gap: 32px;
  list-style: none;        /* remove default bullet styling */
}

.navbar-actions {
  display: flex;         /* a third, independent flex container */
  align-items: center;
  gap: 12px;
}`}</CodeBox>

        <Para>
          A detail worth calling out explicitly: this navbar uses <strong>three separate flex
          containers</strong>, nested — the outer <code>.navbar</code>, plus <code>.navbar-links</code>{' '}
          and <code>.navbar-actions</code> each independently. Flex containers do not interfere with each
          other across nesting boundaries; <code>.navbar-links</code>&apos;s <code>gap</code> and{' '}
          <code>align-items</code> only affect its own direct children (the <code>li</code> elements),
          completely independent of the outer navbar&apos;s own flex settings.
        </Para>

        <SubTitle>Making the navbar collapse responsively</SubTitle>

        <CodeBox label="Hiding nav links below a breakpoint — mobile-first collapse">{`@media (max-width: 768px) {
  .navbar-links {
    display: none;   /* hidden below 768px — a real mobile navbar would
                         swap this for a hamburger-triggered menu instead,
                         covered fully in the Responsive Design module */
  }
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Equal-Height Card Grid" />
        <SectionTitle>Building an Equal-Height Card Grid</SectionTitle>

        <Para>
          A row of cards where each card&apos;s content (title, description, button) is a different
          length is a genuinely common real layout — and getting every card to be the same height, with
          each card&apos;s "action" button pinned to the same bottom position regardless of how much text
          sits above it, is a two-layer Flexbox problem: the row of cards, and the internal structure of
          each individual card.
        </Para>

        <CodeBox label="The row — equal-height cards via align-items: stretch, the default">{`.card-row {
  display: flex;
  gap: 24px;
  align-items: stretch;  /* this is ALREADY the default, written here for clarity —
                             every card stretches to match the tallest sibling's height */
}

.card {
  flex: 1;   /* equal width per Module 23's flex: 1 vs flex: 1 1 auto distinction */
  padding: 24px;
  border-radius: 12px;
  background: white;
}`}</CodeBox>

        <Para>
          <code>align-items: stretch</code> — the default cross-axis behavior — is doing all of the
          height-matching work here, with zero extra CSS. Every flex item in a row container
          automatically stretches to the tallest sibling&apos;s height unless the item has an explicit{' '}
          <code>height</code> or <code>align-self</code> overriding it. This single default behavior is
          the entire reason equal-height card layouts became trivial once Flexbox arrived — the
          pre-Flexbox equivalent required either JavaScript measuring the tallest card and setting heights
          manually, or a display: table-cell hack.
        </Para>

        <SubTitle>Pinning each card&apos;s button to the bottom, regardless of content length</SubTitle>

        <CodeBox label="Making each card ITSELF a flex column, so its button sticks to the bottom">{`.card {
  flex: 1;
  display: flex;              /* the card is now ALSO its own flex container */
  flex-direction: column;      /* stacking title, description, button vertically */
  padding: 24px;
}

.card-description {
  flex-grow: 1;   /* absorbs all leftover vertical space inside the card,
                     pushing whatever comes after it all the way down */
}

.card-button {
  /* naturally ends up flush against the bottom of the card, because
     .card-description above it has already claimed every pixel of
     leftover space */
}`}</CodeBox>

        <Para>
          This is the exact same "one flex-grow: 1 spacer absorbs the leftover space" idea from the
          toolbar pattern in the previous module — applied here to a <code>column</code>-direction
          container instead of a <code>row</code>, so the leftover space being absorbed is vertical
          instead of horizontal. Recognizing this as the same underlying pattern, rather than a separate
          trick to memorize, is exactly the kind of transfer that makes Flexbox click.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Sticky Footer" />
        <SectionTitle>The Sticky Footer Layout — Pinning a Footer to the Bottom of Short Pages</SectionTitle>

        <Para>
          "Sticky footer" here means something specific and often misunderstood: a footer that sits at
          the very bottom of the <strong>viewport</strong> on pages with too little content to naturally
          reach that far — but scrolls normally and appears right after the content on pages long enough
          to fill the screen on their own. It is not <code>position: sticky</code> (that CSS property
          solves a different problem, covered in the Display &amp; Positioning module) — it is a full-page
          Flexbox structure.
        </Para>

        <CodeBox label="The three-part structure every sticky footer layout needs">{`<body>
  <header class="site-header">...</header>
  <main class="site-main">...</main>
  <footer class="site-footer">...</footer>
</body>

html, body {
  height: 100%;   /* required — body must be able to inherit full viewport height */
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;   /* header, main, footer stacked vertically */
  min-height: 100vh;          /* the whole page is AT LEAST one full viewport tall */
}

.site-main {
  flex-grow: 1;   /* absorbs all leftover vertical space — pushes the footer
                     down to the bottom edge on short pages, without pinning
                     the footer in place on TALL pages, which is exactly
                     the behavior position: fixed could never give you */
}`}</CodeBox>

        <Para>
          The key detail: <code>min-height: 100vh</code> on the body, not a fixed{' '}
          <code>height: 100vh</code>. Using a fixed height would clip or misbehave on pages whose content
          genuinely needs to be taller than one viewport — <code>min-height</code> guarantees the layout
          is <em>at least</em> one full screen tall (so the footer never floats mid-page on short content)
          while still allowing the page to grow taller than the viewport when content demands it, with{' '}
          <code>.site-main</code>&apos;s <code>flex-grow: 1</code> absorbing exactly however much extra
          space exists in either case.
        </Para>

        <Callout type="tip">
          This is precisely the same underlying mechanism as the card-grid button-pinning pattern in Part
          04 — a single <code>flex-grow: 1</code> element absorbing all the leftover space in a{' '}
          <code>flex-direction: column</code> container, pushing whatever comes after it to the very
          bottom. Once you have internalized this one idea, you have effectively solved three separate-
          looking real-world layout problems (toolbar spacer, card button pinning, sticky footer) with the
          exact same tool.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — A Real Product Card Component" />
        <SectionTitle>Combining Everything — A Complete Product Card Component</SectionTitle>

        <Para>
          Real UI components rarely use Flexbox in isolation from other layout tools — this product card
          combines a Flexbox row for the badge/price header, <code>align-self</code> (a per-item override
          of the container&apos;s <code>align-items</code>) for a single mis-aligned element, and the
          column-stacking + <code>flex-grow</code> button-pinning pattern from Part 04, all in one
          realistic component.
        </Para>

        <CodeBox label="A full product card — every technique from this module in one place">{`<div class="product-card">
  <img class="product-image" src="/sneaker.jpg" alt="Running shoe" />
  <div class="product-body">
    <div class="product-header">
      <span class="product-badge">New</span>
      <span class="product-price">$89</span>
    </div>
    <h3 class="product-title">Trail Runner Pro</h3>
    <p class="product-description">
      Lightweight trail running shoe with reinforced toe cap and grip sole.
    </p>
    <button class="product-cta">Add to Cart</button>
  </div>
</div>

.product-card {
  display: flex;
  flex-direction: column;
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.product-body {
  display: flex;
  flex-direction: column;
  flex: 1;         /* the body fills whatever height the card ends up being,
                       inside a row of equal-height cards elsewhere on the page */
  padding: 20px;
  gap: 8px;
}

.product-header {
  display: flex;
  justify-content: space-between;   /* badge left, price right */
  align-items: center;
}

.product-description {
  flex-grow: 1;   /* same pattern as Part 04 — pushes the button to the bottom */
  color: #64748b;
}

.product-badge {
  align-self: flex-start;   /* overrides the row's own align-items just for
                                this one item, in case the price text wraps
                                to two lines and grows taller than the badge */
}`}</CodeBox>

        <Callout type="info">
          <code>align-self</code> is worth knowing specifically because it is the escape hatch for the
          "every item in this row should align one way, except this one" situation — it accepts the exact
          same values as <code>align-items</code> (<code>flex-start</code>, <code>flex-end</code>,{' '}
          <code>center</code>, <code>stretch</code>, <code>baseline</code>), but applies to a single flex
          item rather than the whole container.
        </Callout>
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
        <SectionTitle>A Two-Line Footer Bug at a Portland Nonprofit&apos;s Donation Page</SectionTitle>

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
            Scenario — Nonprofit organization, Portland · Layout QA
          </div>

          <Para>
            A volunteer web developer builds a short "Thank You" confirmation page shown after a donation
            completes — a few lines of text, a receipt number, and a "Return to homepage" link. Design QA
            immediately flags it: on desktop, the footer floats awkwardly in the vertical middle of the
            page, with a large empty gray gap below it, instead of sitting at the bottom of the screen the
            way every other page on the site does.
          </Para>

          <CodeBox label="The original CSS — looks reasonable, but is missing one piece">{`body {
  display: flex;
  flex-direction: column;
  /* min-height is MISSING entirely */
}

.site-main {
  flex-grow: 1;
}

.site-footer {
  padding: 24px;
  background: #f1f5f9;
}`}</CodeBox>

          <SubSubTitle>What the developer finds</SubSubTitle>

          <Para>
            Without a <code>min-height</code> declared on <code>body</code>, the flex container is only
            as tall as its content actually needs — for this short thank-you page, that is far less than
            a full viewport. <code>.site-main</code>&apos;s <code>flex-grow: 1</code> is absorbing 100%
            of the leftover space correctly, but there is almost no leftover space to absorb in the first
            place, because the container itself never grew to fill the screen. The footer ends up sitting
            directly beneath the short amount of content, with the browser&apos;s own background showing
            through as a large blank gap below everything.
          </Para>

          <CodeBox label="The fix — the one property that was missing">{`body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;   /* the fix — guarantees the flex container is AT LEAST
                           one full viewport tall, giving .site-main real
                           leftover space to absorb on short pages */
  margin: 0;
}`}</CodeBox>

          <Para>
            The footer now sits flush against the bottom of the viewport on short pages like this one,
            while longer pages elsewhere on the site (which already had enough content to exceed one
            viewport height) continue to render exactly as they did before — <code>min-height</code>{' '}
            never constrains a page that is already taller than the viewport. This is a genuinely common
            first-attempt mistake with the sticky footer pattern: every other piece is correct, and the
            layout still breaks because one property, easy to forget, was never set.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Flexbox in Real Layouts</SectionTitle>

        {[
          {
            wrong: '"A sticky footer just means using position: sticky on the footer element"',
            right: 'position: sticky solves a scroll-pinning problem for an element that stays visible as its own container scrolls — a completely different problem. The classic "sticky footer" UI pattern (footer at the bottom of short pages, normal flow on long pages) is built with a flex-direction: column body, min-height: 100vh, and flex-grow: 1 on the main content area — no position property involved at all.',
          },
          {
            wrong: '"gap works just like adding margin to every flex item"',
            right: 'gap only ever inserts space BETWEEN adjacent items, never on the container\'s outer edges — unlike margin-based spacing, which requires an extra selector (like :not(:last-child)) to avoid an unwanted trailing margin on the final item. gap was specifically designed to eliminate that workaround.',
          },
          {
            wrong: '"justify-content: center + align-items: center will vertically center content even if the parent has no defined height"',
            right: 'Flexbox centers a child within whatever space the parent already occupies — it does not create height out of nothing. A parent with no explicit height (and no content or context forcing one) has no vertical room for align-items: center to work with, and the child ends up appearing not centered, or barely shifted at all.',
          },
          {
            wrong: '"Equal-height cards require setting an explicit height on every card"',
            right: 'align-items: stretch is the DEFAULT cross-axis behavior for flex items in a row — every item without an explicit height or align-self override already stretches to match the tallest sibling automatically, with zero extra CSS needed.',
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
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Walk through how you would build a sticky footer layout (footer pinned to the bottom of short pages, normal flow on long pages) using Flexbox.',
            a: 'Make the body a flex container with flex-direction: column and min-height: 100vh, so the page is guaranteed to be at least one full viewport tall. Give the main content area flex-grow: 1, so it absorbs all leftover vertical space — on a short page, this pushes the footer down to the bottom of the viewport; on a page whose content already exceeds one viewport, min-height simply stops constraining anything and the layout scrolls normally with the footer appearing right after the content. This is unrelated to position: sticky, which solves a different, scroll-triggered pinning problem.',
          },
          {
            q: 'How does gap differ from using margin to space out flex items, and why is that difference meaningful in practice?',
            a: 'gap only inserts space between adjacent items — never on the container\'s outer edges — so there is no equivalent of the classic "last item has an unwanted trailing margin" problem that margin-based spacing requires an extra selector (like :not(:last-child)) to work around. It is also a single declaration on the container rather than a rule that has to be applied (and excluded) per item.',
          },
          {
            q: 'Explain why align-items: stretch makes equal-height cards work with no explicit height set on any card.',
            a: 'stretch is the default value of align-items, and it makes every flex item in a row expand across the cross axis to match the tallest sibling\'s height, unless that item has its own explicit height or an align-self override. Since it is already the default the moment display: flex is applied, a row of cards with no explicit height automatically ends up equal-height with zero additional CSS.',
          },
          {
            q: 'How would you pin a "Add to Cart" button to the bottom of a card, so it lines up across a row of cards even when their description text is different lengths?',
            a: 'Make the card itself a flex-direction: column container, and give the element directly above the button (typically the description) flex-grow: 1. That element absorbs all of the leftover vertical space inside the card, which pushes everything after it — the button — flush against the bottom, regardless of how much or how little text the description contains.',
          },
          {
            q: 'What does align-self do, and when would you reach for it instead of changing the container\'s align-items?',
            a: 'align-self overrides the container\'s align-items value for a single flex item, accepting the same values (flex-start, flex-end, center, stretch, baseline). It is the right tool when every item in a row should align one way except one specific item — for example, a badge that should sit at flex-start while every other item in the row uses the container\'s default center alignment — without having to restructure the container or wrap the exception in an extra nested element.',
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
        <SectionTitle>Real-Layout Flexbox Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Building a sticky footer without min-height: 100vh on the body',
            a: 'Broken: the footer floats in the middle of short pages with a large blank gap below it, because the flex container never grew to fill the viewport in the first place, leaving flex-grow: 1 nothing meaningful to absorb. Fixed: add min-height: 100vh (not a fixed height: 100vh, which would clip genuinely long content) to the body.',
          },
          {
            q: 'Trying to center content vertically inside a parent with no height',
            a: 'Broken: display: flex; align-items: center; on a parent that has no explicit height and no content forcing one produces no visible centering, since there is no extra vertical space to center within. Fixed: give the parent an explicit height (or min-height) — flexbox centers content within existing space, it does not create space out of nothing.',
          },
          {
            q: 'Using old margin-based spacing hacks instead of gap',
            a: 'Broken: applying margin-right: 16px to every nav link and then needing a separate :last-child rule to remove the trailing margin on the final one. Fixed: replace all of it with gap: 16px on the flex container — it never adds space on the outer edges in the first place.',
          },
          {
            q: 'Forgetting that a card must be its own flex column for the flex-grow spacer trick to pin a button to the bottom',
            a: 'Broken: applying flex-grow: 1 to a card\'s description text while the card itself is not flex-direction: column has no visible effect, because flex-grow only does anything inside a flex container, and this only works along that container\'s main axis. Fixed: make the card itself display: flex; flex-direction: column; first, then apply flex-grow: 1 to the description element specifically.',
          },
          {
            q: 'Nesting flex containers and expecting inner gap/align-items to affect the outer row, or vice versa',
            a: 'Broken: assuming a gap or align-items value set on an outer navbar container will also apply inside a nested .navbar-links flex container. Fixed: each flex container\'s properties only apply to its own direct children — a nested flex container needs its own gap, align-items, and other properties declared independently.',
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
            error: `A footer intended to stick to the bottom of the page floats mid-screen on pages with little content, with visible empty space below it`,
            cause: 'The flex-direction: column body has no min-height: 100vh, so the flex container is only as tall as its content — flex-grow: 1 on the main content area has no meaningful leftover space to absorb.',
            fix: 'Add min-height: 100vh (never a fixed height: 100vh, which clips genuinely long pages) to the body alongside display: flex; flex-direction: column;.',
          },
          {
            error: `align-items: center appears to do nothing — content stays pinned to the top of its container`,
            cause: 'The flex container has no defined height (or min-height), so there is no extra cross-axis space for align-items to distribute the content within.',
            fix: 'Give the flex container an explicit height, min-height, or a layout context (like being a sticky-footer body with min-height: 100vh) that actually produces leftover vertical space.',
          },
          {
            error: `Cards in a row render at visibly different heights, despite align-items: stretch being expected by default`,
            cause: 'Most commonly, one card (or several) has an explicit height set directly, which overrides the stretch behavior for that specific item — or the row container is not display: flex at all, e.g. it is display: grid or the default block, where align-items: stretch has no equivalent effect.',
            fix: 'Remove any explicit height set directly on individual cards, and confirm the row container is genuinely display: flex with align-items left at its default (or explicitly set to stretch).',
          },
          {
            error: `A button meant to sit at the bottom of a card sits directly under the description text instead, with extra empty space below it`,
            cause: 'flex-grow: 1 was applied to the description element, but the card itself is not a flex-direction: column container — flex-grow only has an effect inside a flex container, along that container\'s main axis.',
            fix: 'Make the card display: flex; flex-direction: column; so its main axis is vertical, then flex-grow: 1 on the description correctly absorbs the leftover vertical space and pushes the button to the bottom.',
          },
          {
            error: `gap adds visible space in unexpected places, or seems to have no effect on an older browser`,
            cause: 'gap on a display: flex container (as opposed to display: grid) requires a reasonably modern browser — in extremely old browser versions (long past this track\'s supported baseline) gap on flex containers was unsupported and silently ignored.',
            fix: 'For this track\'s supported browser baseline, gap on flex containers works universally and this is rarely the actual cause — double-check first whether the "unexpected space" is actually padding on individual items rather than the container\'s gap.',
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
        'gap adds space only BETWEEN flex items, never on the container\'s outer edges — it replaces old margin-based spacing hacks and the extra selectors they required.',
        'The centering reflex — display: flex; justify-content: center; align-items: center; — centers a child within whatever space the parent already occupies. It does not create height; the parent needs a real height or min-height first.',
        'A responsive navbar is commonly built from several independent, nested flex containers — logo/links/actions as one outer row, plus separate inner flex containers for the links and actions groups.',
        'Equal-height cards need zero extra CSS beyond display: flex — align-items: stretch is already the default cross-axis behavior for flex items in a row.',
        'Pinning a button to the bottom of a card (or a footer to the bottom of a page) both use the same technique: a flex-direction: column container with flex-grow: 1 on the element that should absorb all leftover vertical space.',
        'A sticky footer layout needs min-height: 100vh on the body — without it, flex-grow: 1 on the main content has no leftover space to absorb on short pages, and the footer floats mid-screen.',
        'align-self overrides align-items for a single flex item — the right tool when one item in a row needs different cross-axis alignment than the rest.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 25 introduces CSS Grid — true two-dimensional layout, grid-template-columns/rows, grid
          areas, the fr unit, and the mental model that makes Grid click once Flexbox&apos;s one-
          dimensional limits start to show.
        </p>
        <Link href="/learn/html-css/css-grid-complete-guide" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 25 → CSS Grid — The Complete Guide
        </Link>
      </div>
    </LearnLayout>
  )
}
