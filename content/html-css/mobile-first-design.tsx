import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Mobile-First Design Principles — HTML & CSS | Chaduvuko',
  description:
    'Why designing for the smallest screen first produces better layouts, and how to structure your CSS to make it painless — min-width media queries, the viewport meta tag in depth, and touch target sizing.',
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

export default function MobileFirstDesign() {
  return (
    <LearnLayout
      title="Mobile-First Design Principles"
      description="Why designing for the smallest screen first produces better layouts, and how to structure your CSS to make it painless."
      section="HTML & CSS — Module 29"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Shift in Thinking" />
        <SectionTitle>Mobile-First — Designing for the Smallest Screen, Then Growing Up</SectionTitle>

        <Para>
          Mobile-first design means writing your <strong>base</strong> CSS — the styles that apply with
          no media query at all — for the smallest, most constrained screen you support, and then adding
          rules that enhance the layout as more screen space becomes available. It is the opposite
          instinct from how most people first learn to build a page: designing on a wide desktop monitor
          and then trying to squeeze that design down until it survives on a phone.
        </Para>

        <Para>
          This is not just a trend or a stylistic preference — it reflects how the web is actually used.
          The majority of page loads across the web today happen on phones, not desktops, and search
          engines like Google have used mobile-friendliness as a ranking signal for years (mobile-first
          indexing crawls and ranks your site primarily using its mobile version, not its desktop one).
          Designing mobile-first is designing for your actual, largest audience first — and treating the
          desktop layout as the enhancement, not the other way around.
        </Para>

        <CodeBox label="The mobile-first mental model">{`/* Base styles — apply to EVERY screen, phone included, no media query needed */
.card {
  display: block;
  padding: 16px;
  font-size: 16px;
}

/* Enhancement — ONLY applies once the screen is wide enough to benefit */
@media (min-width: 768px) {
  .card {
    display: flex;
    padding: 24px;
  }
}`}</CodeBox>

        <Para>
          Every browser, on every device, always applies the base styles. Media queries only ever{' '}
          <em>add</em> rules on top, once the viewport crosses a threshold you decide is worth
          designing for. A phone never has to download, parse, or override desktop-oriented rules it was
          never going to use — it just gets the base styles and stops there.
        </Para>

        <Callout type="info">
          "Mobile-first" describes the order you write your CSS in, not necessarily the order you design
          mockups in. Many design teams still sketch a desktop concept first for stakeholder buy-in — the
          discipline that matters here is specifically about which rules go in your base CSS versus
          inside a media query, and that discipline should be mobile-first regardless of how the visual
          design process happened to start.
        </Callout>

        <SubTitle>Why this used to be backwards</SubTitle>

        <Para>
          Responsive design predates widespread mobile-first thinking. Early responsive sites were
          frequently desktop-first: build the full desktop layout, then bolt on{' '}
          <code>max-width</code> media queries to squash it down for smaller screens. That approach
          survives in a lot of older, still-live CSS, and it is worth understanding why it fell out of
          favor — covered directly in Part 04, once you have seen the mobile-first alternative in full.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Viewport Meta Tag, In Depth" />
        <SectionTitle>The Tag That Makes Responsive CSS Possible At All</SectionTitle>

        <Para>
          Before any media query can work correctly on a phone, one line has to exist in your page&apos;s{' '}
          <code>&lt;head&gt;</code>. Without it, mobile browsers render your page at a fake desktop width
          — historically 980px — and then shrink the entire rendered result down to fit the physical
          screen, exactly like looking at a full desktop page through a zoomed-out camera. Every media
          query you write would then measure against that fake 980px width, not the phone&apos;s real
          screen, and your carefully designed mobile layout would simply never activate.
        </Para>

        <CodeBox label="The viewport meta tag">{`<meta name="viewport" content="width=device-width, initial-scale=1">`}</CodeBox>

        <Para>
          Each part of the <code>content</code> attribute has a specific job, and it is worth
          understanding both rather than treating the line as boilerplate to paste and forget.
        </Para>

        <SubTitle><code>width=device-width</code></SubTitle>

        <Para>
          This tells the browser: set the viewport&apos;s width equal to the device&apos;s actual screen
          width in CSS pixels, not some fixed desktop-sized default. This is the part that makes{' '}
          <code>min-width</code> and <code>max-width</code> media queries measure against a real,
          meaningful number — on a 390px-wide phone screen, the viewport becomes 390px, and a{' '}
          <code>(min-width: 768px)</code> media query correctly stays inactive.
        </Para>

        <SubTitle><code>initial-scale=1</code></SubTitle>

        <Para>
          This sets the initial zoom level to 1:1 — one CSS pixel equals one viewport pixel, with no
          zooming applied when the page first loads. Without it, some mobile browsers apply their own
          default zoom heuristics, which can subtly shift how your layout first appears before the user
          interacts with it at all.
        </Para>

        <CodeBox label="A viewport tag that intentionally blocks zooming — generally a bad idea">{`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`}</CodeBox>

        <Callout type="warning">
          <strong>Do not disable pinch-to-zoom.</strong> Adding <code>maximum-scale=1</code> and{' '}
          <code>user-scalable=no</code> is a genuine, well-documented accessibility failure — it blocks
          low-vision users from zooming in to read your content, and it violates WCAG 2.1 Success
          Criterion 1.4.4 (Resize Text). Modern mobile browsers actually ignore these two properties
          specifically for this reason, but do not rely on that override — never write them intentionally
          in new code.
        </Callout>

        <Para>
          One more detail worth knowing: the viewport meta tag controls the <em>layout</em> viewport used
          for CSS media queries — it has nothing to do with actual device pixel density (a topic covered
          separately, under responsive images, elsewhere in this track). A phone can report a 390px CSS
          viewport width while its physical screen has three times that many actual pixels; the browser
          handles that scaling separately and your CSS never needs to think about it directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — min-width Media Queries" />
        <SectionTitle>Progressive Enhancement — Adding Rules as the Screen Grows</SectionTitle>

        <Para>
          A mobile-first stylesheet is built almost entirely from <code>min-width</code> media queries.
          Each one asks the same question: "once the viewport is <em>at least</em> this wide, add these
          extra rules on top of the base styles." Nothing is ever removed or overridden back down for
          smaller screens — the cascade only ever adds capability as space becomes available.
        </Para>

        <CodeBox label="A full example — one component, three breakpoints">{`/* Base — every screen gets this, phone included */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet and up — more horizontal space, so introduce columns */
@media (min-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Desktop and up — enough space for a denser grid */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}`}</CodeBox>

        <Para>
          Read this top to bottom and it tells a story: one column on a phone, two columns once there is
          room, four columns once there is plenty of room. Because later rules build on top of the base
          rather than fighting it, you can read any single breakpoint in isolation and understand exactly
          what changes — you never have to mentally subtract a desktop rule to figure out what a phone
          actually sees.
        </Para>

        <SubTitle>Common, content-driven breakpoint values</SubTitle>

        <Para>
          There is no single "correct" set of breakpoints — the right value is wherever <em>your</em>{' '}
          content actually starts to look cramped or start to have room to breathe, not a number copied
          from a specific device&apos;s screen width. That said, a small set of values covers the vast
          majority of real layouts and is worth knowing as a starting vocabulary.
        </Para>

        <CodeBox label="A common, content-based breakpoint scale">{`/* No query — phones, small screens (base styles) */

@media (min-width: 480px)  { /* large phones, landscape phones */ }
@media (min-width: 768px)  { /* tablets */ }
@media (min-width: 1024px) { /* small laptops, most desktops */ }
@media (min-width: 1280px) { /* large desktops */ }
@media (min-width: 1536px) { /* very large / high-resolution monitors */ }`}</CodeBox>

        <Callout type="tip">
          Pick breakpoints by resizing your <em>actual</em> content in the browser and noting where it
          starts to look wrong — not from a list of "standard device widths." Devices change every year;
          your content&apos;s natural line length, image aspect ratios, and component sizing do not. This
          is sometimes summarized as "content dictates breakpoints, not devices."
        </Callout>

        <SubTitle>Nesting min-width queries inside a single rule</SubTitle>

        <Para>
          It is entirely normal, and often clearer, to write every breakpoint for one property directly
          underneath its base declaration rather than grouping all the mobile rules in one block and all
          the tablet rules in another. This keeps every rule for a given selector physically close
          together in the file, which matters a great deal once a stylesheet has dozens of components.
        </Para>

        <CodeBox label="Co-locating a component's breakpoints">{`.hero-heading {
  font-size: 28px;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-heading { font-size: 40px; }
}

@media (min-width: 1024px) {
  .hero-heading { font-size: 56px; }
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Mobile-First vs Desktop-First" />
        <SectionTitle>The Same Component, Built Both Ways</SectionTitle>

        <Para>
          The clearest way to see why mobile-first tends to win is to build the identical component both
          ways and compare what each approach actually produces. Desktop-first starts from the full,
          richest layout and uses <code>max-width</code> queries to strip things down as the screen
          shrinks.
        </Para>

        <CodeBox label="Desktop-first — start big, subtract for small screens">{`/* Base — assumes a wide desktop screen with no query at all */
.nav {
  display: flex;
  gap: 32px;
  padding: 24px 48px;
}

.nav__link {
  font-size: 16px;
}

/* Now claw it back down for tablets */
@media (max-width: 1024px) {
  .nav {
    gap: 20px;
    padding: 16px 24px;
  }
}

/* And claw it back down again for phones */
@media (max-width: 600px) {
  .nav {
    flex-direction: column;
    padding: 12px 16px;
  }
  .nav__link {
    font-size: 14px;
  }
}`}</CodeBox>

        <CodeBox label="Mobile-first — the equivalent component, built the other direction">{`/* Base — the phone layout, no query needed */
.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
}

.nav__link {
  font-size: 14px;
}

/* Enhance once there is room */
@media (min-width: 600px) {
  .nav {
    flex-direction: row;
    gap: 20px;
    padding: 16px 24px;
  }
  .nav__link {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .nav {
    gap: 32px;
    padding: 24px 48px;
  }
}`}</CodeBox>

        <Para>
          Both render identically at every screen width — but the amount of CSS a phone actually has to
          apply is dramatically different. In the desktop-first version, a phone loads the full desktop
          base styles, then a tablet override, then a phone override — three overlapping layers of rules
          fighting each other, with the browser resolving cascade order and specificity to figure out
          what finally wins. In the mobile-first version, a phone applies exactly one small block of base
          rules and nothing else. Nothing was overridden; nothing had to be undone.
        </Para>

        <Callout type="warning">
          Desktop-first CSS very commonly needs properties explicitly reset back to their default inside
          smaller-screen queries — things like <code>max-width: 1024px { '{' } flex-wrap: wrap; { '}' }</code>{' '}
          existing purely to cancel out a desktop rule the phone never needed in the first place. Every
          one of those resets is dead weight that mobile-first CSS simply never accumulates, because the
          phone rule was the base rule all along.
        </Callout>

        <SubTitle>Why this compounds badly on real, large stylesheets</SubTitle>

        <Para>
          On a single small component the difference above is minor. Across an entire production
          codebase with hundreds of components, desktop-first CSS accumulates layers of override rules
          fighting each other, increasing specificity wars, and forcing every phone visitor — the
          majority of your traffic — to download and resolve rules it never actually uses. Mobile-first
          CSS tends to stay leaner specifically because there is nothing to override; you are only ever
          adding.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Touch Target Sizing" />
        <SectionTitle>How Big Does a Tappable Element Actually Need to Be?</SectionTitle>

        <Para>
          A mouse cursor is a single precise pixel. A human fingertip is not — the average adult
          fingertip covers roughly 45-57 CSS pixels on a typical phone screen, and touching a target
          smaller than that means the user is relying on luck, not precision, to hit it. Designing for
          mobile-first means designing every interactive element — buttons, links, form controls, icon
          buttons — with the fingertip, not the cursor, as the baseline input device.
        </Para>

        <CodeBox label="The widely cited touch target minimums">{`/* Apple's Human Interface Guidelines: minimum 44×44pt tappable area */
/* Google's Material Design guidelines:  minimum 48×48dp tappable area */
/* WCAG 2.1 Success Criterion 2.5.5 (Target Size):  minimum 44×44 CSS px */

/* In practice, 44px is the safe cross-platform floor to design against */`}</CodeBox>

        <Para>
          The critical detail: this is the size of the tappable <em>area</em>, not necessarily the size
          of the visible icon or text inside it. A 20px trash-can icon can still have a full 44px tappable
          area around it using padding — the visual design does not have to look bulky just because the
          hit target underneath it is generous.
        </Para>

        <CodeBox label="A visually small icon with a properly sized tap target">{`.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
}

.icon-button svg {
  width: 20px;   /* the icon itself stays visually compact */
  height: 20px;
}`}</CodeBox>

        <Callout type="tip">
          If a design genuinely cannot afford 44px of visual space (a dense toolbar, for example), use{' '}
          <code>padding</code> or a pseudo-element to extend the invisible hit area beyond the visible
          element&apos;s boundaries, rather than shrinking the actual clickable box. A common pattern is
          an absolutely positioned <code>::before</code> pseudo-element sized to at least 44×44px,
          centered over a visually smaller icon.
        </Callout>

        <SubTitle>Spacing between targets matters as much as size</SubTitle>

        <Para>
          A row of correctly sized 44px buttons placed directly against each other with zero gap is still
          a poor mobile experience — fingertips are imprecise in every direction, and adjacent targets
          with no breathing room between them cause frequent mis-taps on the wrong control. A minimum gap
          of around 8px between adjacent tappable elements is a reasonable rule of thumb on top of correct
          individual sizing.
        </Para>

        <CodeBox label="Correctly sized targets, correctly spaced">{`.toolbar {
  display: flex;
  gap: 8px;      /* prevents mis-taps between adjacent buttons */
}

.toolbar button {
  min-width: 44px;
  min-height: 44px;
}`}</CodeBox>

        <Para>
          This same reasoning is also why mobile-first navigation so often collapses into a full-width,
          vertically stacked list rather than a dense horizontal row of tiny links — a stacked layout
          gives every item both the minimum size and the minimum spacing a thumb needs, something a
          cramped horizontal desktop nav bar, shrunk down as-is, rarely manages to do.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Why Mobile-First Produces Leaner CSS" />
        <SectionTitle>The Cumulative Effect on a Real Codebase</SectionTitle>

        <Para>
          Beyond the single-component comparison in Part 04, mobile-first has structural effects on an
          entire stylesheet over the lifetime of a real project that are worth calling out directly,
          because they are the actual reasons engineering teams standardize on it rather than treating it
          as a preference.
        </Para>

        <SubTitle>1. Specificity wars shrink</SubTitle>

        <Para>
          Desktop-first CSS frequently needs increasingly specific selectors, or even{' '}
          <code>!important</code>, to force a smaller-screen override to win against an earlier
          desktop-oriented rule that was never designed to be beaten. Mobile-first rarely needs this,
          because there is nothing earlier in the cascade to fight against — the base rule was already
          the simplest possible version, and every later media query is purely additive.
        </Para>

        <SubTitle>2. Payload for the majority of users shrinks</SubTitle>

        <Para>
          Since the majority of page loads on the modern web are mobile, and browsers parse the entire
          stylesheet regardless of which media queries actually apply, a mobile-first stylesheet is
          structured so its most-used code path (the base styles) is also its smallest and simplest. A
          bloated desktop-first base means every mobile visitor's browser is parsing rules that will
          almost immediately be overridden and never rendered.
        </Para>

        <SubTitle>3. New features default to the constrained case</SubTitle>

        <Para>
          When a new component is built mobile-first, an engineer is forced to solve the hardest
          constraint (small screen, touch input, slower connection) up front, and treat anything extra as
          a genuine enhancement. Built desktop-first, it is extremely easy to ship a feature that works
          beautifully on a laptop and was simply never tested against a 375px screen at all, because
          nothing in the workflow forced that constraint to be considered first.
        </Para>

        <CodeBox label="A concrete illustration — a 'View all filters' button, built each way">{`/* Desktop-first instinct: it fits fine on a wide screen, ship it */
.filters-panel {
  display: flex;
  gap: 16px;
}
/* ...three weeks later, a bug report: unusable on a phone, wraps into a mess */


/* Mobile-first instinct: does this even fit on a phone at all? */
.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
@media (min-width: 768px) {
  .filters-panel {
    flex-direction: row;
    gap: 16px;
  }
}
/* The phone case was never an afterthought — it was the design constraint from line one */`}</CodeBox>

        <Callout type="info">
          None of this means desktop-first CSS is impossible to write well, or that every desktop-first
          codebase is a mess — plenty of older, carefully maintained sites prove otherwise. The point is
          that mobile-first removes an entire category of override-fighting and forgotten-constraint bugs
          by construction, rather than requiring discipline to avoid them.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Fluid Base Styles Before Reaching for a Breakpoint" />
        <SectionTitle>Not Everything Needs a Media Query At All</SectionTitle>

        <Para>
          A genuinely mobile-first stylesheet reaches for a hard breakpoint only once fluid, relative
          sizing has stopped being enough — not as the first tool for every sizing decision. Relative
          units and modern CSS functions can absorb a surprising amount of screen-size variation before a
          discrete <code>min-width</code> jump is actually needed.
        </Para>

        <CodeBox label="Fluid sizing that needs zero media queries">{`.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 48px);   /* scales smoothly between screen sizes */
}

.hero-heading {
  font-size: clamp(1.75rem, 1.2rem + 2vw, 3.5rem);   /* fluid type, no breakpoint jump */
}`}</CodeBox>

        <Para>
          <code>clamp(minimum, preferred, maximum)</code> lets a value grow smoothly with the viewport
          between a floor and a ceiling, instead of staying flat until a breakpoint suddenly snaps it to a
          new fixed value. This genuinely reduces how many media queries a stylesheet needs — fewer
          breakpoints means fewer places for base and override rules to drift out of sync as the design
          evolves.
        </Para>

        <Para>
          Reach for a real <code>min-width</code> breakpoint specifically when the layout needs to change{' '}
          <em>structurally</em> — a single column becoming a multi-column grid, a stacked nav becoming a
          horizontal one, a hidden panel becoming permanently visible. Reach for <code>clamp()</code>,
          percentages, and relative units when the change is purely a matter of degree — a heading getting
          bigger, padding getting roomier — with no structural shift involved.
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
        <SectionTitle>A Checkout Redesign at an Austin D2C Retailer</SectionTitle>

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
            Scenario — D2C retail, Austin · Checkout conversion investigation
          </div>

          <Para>
            An Austin-based direct-to-consumer retailer notices that mobile checkout completion is
            significantly lower than desktop, despite mobile driving over 70% of traffic. The existing
            checkout page was originally built for desktop and later retrofitted with{' '}
            <code>max-width</code> queries to "make it responsive" — the exact desktop-first pattern from
            Part 04.
          </Para>

          <CodeBox label="The existing, desktop-first checkout CSS">{`.checkout-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.checkout-actions button {
  padding: 10px 20px;
  font-size: 14px;
}

@media (max-width: 480px) {
  .checkout-actions {
    flex-direction: column-reverse;
  }
  /* button size was never revisited for touch — still 14px text,
     and padding that resolves to roughly 34px of tappable height */
}`}</CodeBox>

          <SubSubTitle>What the engineer finds during a mobile usability pass</SubSubTitle>

          <Para>
            Two separate issues, both traceable directly to designing desktop-first and patching mobile
            in afterward: the "Place Order" button&apos;s tappable height, at roughly 34px, sits well
            under the 44px minimum from Part 05 — session recordings show repeated mis-taps landing on the
            adjacent "Edit Cart" link instead. And the checkout form&apos;s input fields use{' '}
            <code>font-size: 14px</code>, which is below the 16px threshold that iOS Safari uses to decide
            whether to auto-zoom into a focused input — every tap into a field was involuntarily zooming
            the whole page, then requiring the user to manually zoom back out to keep going.
          </Para>

          <CodeBox label="The mobile-first rewrite">{`/* Base — designed for the phone first, since that's 70%+ of real traffic */
.checkout-actions {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
}

.checkout-actions button {
  min-height: 48px;      /* comfortably above the 44px floor */
  font-size: 16px;       /* prevents iOS Safari's auto-zoom-on-focus */
  padding: 12px 20px;
}

/* Enhance once there is room for a horizontal layout */
@media (min-width: 768px) {
  .checkout-actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: 12px;
  }
  .checkout-actions button {
    min-height: 44px;
  }
}`}</CodeBox>

          <Para>
            After the rewrite, mobile checkout completion improves measurably, and the fix required no
            new functionality — only correcting the underlying assumption that the desktop layout, shrunk
            down, was an acceptable mobile experience. The retailer standardizes on mobile-first for every
            new page after this, specifically because the bug that motivated the investigation would have
            been structurally impossible under a mobile-first base — a 14px input font and a 34px button
            would never have been the starting point in the first place.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Mobile-First Design</SectionTitle>

        {[
          {
            wrong: '"Mobile-first just means testing your desktop design on a phone before shipping"',
            right: 'Mobile-first is about which rules live in your base CSS versus inside a min-width media query — the phone layout is the default the browser applies everywhere, and everything else is an enhancement on top of it. Testing a finished desktop design on a phone afterward is closer to the desktop-first pattern this approach exists to replace.',
          },
          {
            wrong: '"Media queries are the main tool for making a layout responsive"',
            right: 'Fluid techniques — relative units, percentages, and clamp() — should absorb most of the variation between screen sizes on their own. Reach for a hard min-width breakpoint specifically when the layout needs a structural change, not for every size adjustment, as covered in Part 07.',
          },
          {
            wrong: '"The viewport meta tag is just boilerplate — it doesn\'t really do anything"',
            right: 'Without width=device-width, mobile browsers render the page at a fake desktop-sized viewport (historically 980px) and shrink the result to fit the screen, which means every min-width and max-width media query in your stylesheet measures against the wrong number and simply never activates correctly.',
          },
          {
            wrong: '"44px touch targets are just a suggestion for polish, not something that affects real usability"',
            right: 'It is a widely cited, evidence-based minimum (Apple HIG, Google Material Design, and WCAG 2.1 SC 2.5.5 all converge close to this number) tied directly to average adult fingertip contact area. Targets smaller than this measurably increase mis-tap rates, as shown in the checkout example above.',
          },
          {
            wrong: '"Mobile-first CSS is automatically less code overall than desktop-first"',
            right: 'Not necessarily less code in total — but it avoids the specific bloat pattern of override rules that exist purely to undo an earlier desktop rule a phone never needed. The saving is in eliminated override-fighting, not in the raw byte count of every declaration.',
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
            q: 'What does "mobile-first" actually mean in terms of how you write CSS?',
            a: 'It means base styles — the rules with no media query at all — target the smallest supported screen, and min-width media queries progressively add or change rules as more viewport width becomes available. Nothing in the base styles gets overridden back down for small screens, because the base already assumed the smallest case; larger screens only ever receive additional enhancement.',
          },
          {
            q: 'Why does the viewport meta tag matter for responsive CSS to work at all?',
            a: 'Without <meta name="viewport" content="width=device-width, initial-scale=1">, mobile browsers render the page at a historical default desktop width (commonly 980px) and scale the rendered result down to fit the physical screen. Every media query would then be evaluated against that fake 980px width rather than the phone\'s real width, so breakpoints intended for phones would never actually trigger.',
          },
          {
            q: 'What is the recommended minimum touch target size, and why does it matter beyond the visible icon size?',
            a: 'Roughly 44×44 CSS pixels, converging across Apple HIG, Google Material Design, and WCAG 2.1 SC 2.5.5 — sized to match average adult fingertip contact area, not cursor precision. It refers to the tappable area, not the visible icon or label, so a visually small icon can still have a full-sized invisible hit area added via padding or a positioned pseudo-element without changing its visual footprint.',
          },
          {
            q: 'Why does mobile-first tend to produce less specificity conflict than desktop-first CSS?',
            a: 'Desktop-first CSS frequently needs increasingly specific selectors, or !important, to force a smaller-screen max-width override to beat an earlier, unrelated desktop rule. Mobile-first has nothing earlier in the cascade to fight against — the base rule is already the simplest version for the smallest screen, and every subsequent min-width query only adds capability rather than needing to cancel something out.',
          },
          {
            q: 'When should you reach for a hard min-width breakpoint versus a fluid technique like clamp()?',
            a: 'Fluid techniques (relative units, percentages, clamp()) should handle sizing that changes by degree — text getting larger, padding getting roomier — smoothly across the full range of screen widths with no media query at all. A real breakpoint is justified when the layout needs a structural change: a single column becoming a multi-column grid, or a stacked nav becoming a horizontal one. Reaching for a breakpoint for every minor size adjustment produces more media queries than the design actually needs.',
          },
          {
            q: 'Why might a form input using a 14px font size cause a usability problem specifically on iOS Safari?',
            a: 'iOS Safari automatically zooms the page in when a user focuses a text input whose computed font-size is below 16px, on the assumption that smaller text would otherwise be unreadable while typing. This causes an involuntary zoom on every field focus, which the user then has to manually zoom back out of. Setting form input font sizes to at least 16px on mobile avoids triggering this behavior.',
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
        <SectionTitle>Mobile-First Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the viewport meta tag entirely on a new page',
            a: 'Without it, every media query in the stylesheet measures against a fake desktop-width viewport instead of the phone\'s real width, so the mobile layout silently never activates. Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the head of every page template, not per-page.',
          },
          {
            q: 'Writing max-width queries "to be safe" inside an otherwise mobile-first file',
            a: 'Mixing max-width and min-width queries in the same stylesheet reintroduces exactly the override-fighting mobile-first is meant to avoid, since the cascade order between them becomes hard to reason about. Pick one direction — min-width, applied consistently — and stay in it.',
          },
          {
            q: 'Designing touch targets against a mouse cursor\'s precision, not a fingertip\'s',
            a: 'A 24px icon button with no extra padding may look fine and work fine with a mouse in a desktop browser, then generate real mis-tap complaints once tested on an actual phone. Size or pad every interactive element to at least 44px of tappable area, independent of its visual size.',
          },
          {
            q: 'Copying "standard" breakpoints from a framework without checking your own content',
            a: 'A breakpoint that works well for one component\'s content (say, a 3-word nav label) may be the wrong place for another component (a paragraph of body text) to change layout. Resize your actual content in the browser and place breakpoints where it visibly starts to look wrong, not at a fixed list of device widths.',
          },
          {
            q: 'Using pixel-perfect fixed widths on mobile base styles',
            a: 'A fixed width: 400px on a base style will overflow and cause horizontal scrolling on any phone narrower than 400px. Use width: 100% with a max-width, or relative units, for anything in the base (no media query) layer.',
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
        <SectionTitle>Rendering Bugs Mobile-First Design Runs Into — And Exactly Why</SectionTitle>

        {[
          {
            error: `Layout renders at desktop width on a real phone, all text tiny and zoomed out`,
            cause: 'The page is missing the viewport meta tag entirely, so the mobile browser falls back to rendering at its historical default desktop-sized viewport (commonly 980px) and shrinking the result to fit the screen.',
            fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> inside the <head> of the page template.',
          },
          {
            error: `Page zooms in automatically the moment a form field is tapped, on iOS Safari specifically`,
            cause: 'iOS Safari auto-zooms into any focused input whose computed font-size is below 16px, treating it as too small to type into comfortably.',
            fix: 'Set font-size: 16px (or larger) on text inputs, textareas, and selects within your mobile base styles.',
          },
          {
            error: `Horizontal scrollbar appears on mobile even though the design "looks fine" on desktop`,
            cause: 'A fixed pixel width, an un-wrapped flex row, or a wide, non-responsive element (a table or a fixed-width image, for example) is wider than the phone\'s viewport, forcing the whole page to overflow horizontally.',
            fix: 'Audit for fixed widths in the base (no-media-query) styles and replace them with max-width plus width: 100%, and ensure images have max-width: 100%; height: auto; by default.',
          },
          {
            error: `Tap events land on the wrong element, or a tap fails to register at all, only on mobile`,
            cause: 'An interactive element\'s tappable area is smaller than roughly 44×44px, or two adjacent interactive elements sit with no gap between them, so a fingertip\'s natural imprecision lands on the wrong target.',
            fix: 'Enforce a minimum 44px tappable height/width (via min-height/min-width or padding) on every interactive element, and a minimum ~8px gap between adjacent tappable elements.',
          },
          {
            error: `A component that looks correct at every "standard" breakpoint still looks broken at some in-between width`,
            cause: 'Breakpoints were chosen from a generic device-width list rather than from where the actual content starts to break, leaving a gap of real-world widths (e.g. a folded tablet, a resized browser window) that no rule was ever written to handle.',
            fix: 'Resize the browser continuously across the full range, not just at preset device widths, and add or move breakpoints to wherever the content genuinely needs a structural change — not to match a specific device.',
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
        'Mobile-first means base CSS (no media query) targets the smallest screen, and min-width queries progressively enhance the layout as more space becomes available — nothing is ever overridden back down.',
        'The viewport meta tag (width=device-width, initial-scale=1) is required for media queries to measure against a phone\'s real screen width at all — without it, mobile browsers fake a desktop-width viewport and scale the result down.',
        'Desktop-first CSS (max-width queries subtracting from a desktop base) tends to accumulate override rules that exist purely to cancel earlier desktop-only rules — a cost mobile-first structurally avoids.',
        'Touch targets need a minimum of roughly 44×44 CSS px of tappable area (not necessarily visible icon size), based on average fingertip contact area, plus adequate spacing between adjacent targets.',
        'Never disable pinch-to-zoom with maximum-scale=1 or user-scalable=no — it is a documented WCAG accessibility failure, and most modern mobile browsers ignore it anyway.',
        'Choose breakpoints from where your actual content starts to break, not from a fixed list of device widths — content dictates breakpoints, not devices.',
        'Reach for a hard min-width breakpoint when the layout needs a structural change; use fluid techniques like clamp() for changes that are purely a matter of degree.',
        'Form inputs need at least a 16px font-size on mobile to avoid iOS Safari\'s automatic zoom-on-focus behavior.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Phase 5 — Advanced CSS begins with native CSS custom properties: how to declare and scope real
          variables, use fallback values, and build a maintainable design-system foundation without a
          preprocessor.
        </p>
        <Link href="/learn/html-css/css-custom-properties" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next → CSS Custom Properties (Variables)
        </Link>
      </div>
    </LearnLayout>
  )
}
