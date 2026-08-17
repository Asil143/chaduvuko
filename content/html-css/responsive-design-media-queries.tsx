import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Responsive Design & Media Queries — HTML & CSS | Chaduvuko',
  description:
    'Building layouts that adapt to any screen — media query syntax, common breakpoints, and testing responsively for real.',
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

export default function ResponsiveDesignMediaQueries() {
  return (
    <LearnLayout
      title="Responsive Design & Media Queries"
      description="Building layouts that adapt to any screen — media query syntax, common breakpoints, and testing responsively for real."
      section="HTML & CSS — Module 28"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Media Query Actually Is" />
        <SectionTitle>A Conditional Block of CSS, Based on the Viewport</SectionTitle>

        <Para>
          A <strong>media query</strong> wraps a block of CSS rules in a condition — most commonly the
          browser's current viewport width — so those rules only apply when the condition is true. This
          is the core mechanism behind every layout that visibly rearranges itself when you resize a
          browser window or rotate a phone.
        </Para>

        <CodeBox label="The basic syntax">{`.sidebar {
  display: none;   /* hidden by default, on small screens */
}

@media (min-width: 768px) {
  .sidebar {
    display: block;   /* shown once the viewport is at least 768px wide */
  }
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — min-width vs max-width" />
        <SectionTitle>Two Genuinely Different Strategies, Not Interchangeable Syntax</SectionTitle>

        <Para>
          <code>min-width</code> queries apply their rules once the viewport reaches AT LEAST that
          width — the natural building block for a mobile-first approach (covered in full in the next
          module), where base styles target small screens and each query progressively adds more as
          space becomes available. <code>max-width</code> queries apply once the viewport is AT MOST
          that width — the natural building block for a desktop-first approach, starting from a full
          layout and stripping things away as space shrinks.
        </Para>

        <CodeBox label="The same responsive behaviour, built two structurally different ways">{`/* Mobile-first: base styles are for small screens, min-width ADDS complexity */
.nav { display: block; }               /* stacked links, small screens */
@media (min-width: 768px) {
  .nav { display: flex; }               /* horizontal nav, larger screens */
}

/* Desktop-first: base styles are for large screens, max-width REMOVES/overrides */
.nav { display: flex; }                 /* horizontal nav, default */
@media (max-width: 767px) {
  .nav { display: block; }              /* stacked links, small screens */
}`}</CodeBox>

        <Callout type="warning">
          <strong>Mixing both strategies in the same stylesheet is a common, genuinely confusing
          mistake.</strong> A codebase with some rules written min-width-first and others
          max-width-first forces every future reader to mentally track two different mental models at
          once — pick one strategy (mobile-first with min-width is the modern convention, covered next
          module) and stay consistent throughout a project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Common Breakpoints" />
        <SectionTitle>Why There Is No Single Universal Breakpoint Standard</SectionTitle>

        <CodeBox label="Widely-used conventional breakpoint values">{`/* These are common CONVENTIONS, not a spec or hard rule */
@media (min-width: 480px)  { /* larger phones */ }
@media (min-width: 768px)  { /* tablets */ }
@media (min-width: 1024px) { /* small laptops */ }
@media (min-width: 1280px) { /* desktops */ }`}</CodeBox>

        <Para>
          These numbers are popular defaults from major CSS frameworks, not values mandated by any
          specification — device screen sizes are genuinely too varied for any fixed set of breakpoints
          to be universally correct. The actually correct approach: pick breakpoints based on where{' '}
          <em>your specific layout</em> starts to look cramped or awkward, resizing your own browser
          window slowly and watching for the point content actually needs to rearrange — not by
          copying a framework's defaults and assuming they fit your content.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Combining Conditions" />
        <SectionTitle>and, or, and Feature Queries</SectionTitle>

        <CodeBox label="Combining multiple conditions in one query">{`/* AND — both conditions must be true */
@media (min-width: 768px) and (max-width: 1023px) {
  /* applies ONLY in this specific tablet-width range */
}

/* Comma-separated list acts as OR */
@media (max-width: 600px), (orientation: landscape) {
  /* applies if EITHER condition is true */
}

/* Combining a size condition with a feature query */
@media (min-width: 768px) and (hover: hover) {
  /* only on wider screens that ALSO support real hover
     (excludes touch-only tablets pretending to be desktop-width) */
}`}</CodeBox>

        <Para>
          <code>hover: hover</code> and <code>pointer: fine</code> are genuinely useful feature queries
          beyond simple width — they detect whether the device has a real mouse-like pointer and true
          hover capability, letting you avoid hover-dependent interactions on a touch device regardless
          of its screen width.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Responsive Units Recap" />
        <SectionTitle>Building on the Colors, Units & Typography Module</SectionTitle>

        <Para>
          Media queries decide WHEN styles change; relative units (covered in full in the Colors, Units
          &amp; Typography module) decide how naturally a layout flexes BETWEEN those breakpoints.
          Combining both is what produces a layout that feels smooth rather than snapping abruptly.
        </Para>

        <CodeBox label="Relative units doing real work between breakpoints">{`.container {
  width: 90%;              /* percentage — scales continuously with the viewport */
  max-width: 1200px;       /* caps growth on very large screens */
  padding: clamp(16px, 4vw, 48px);  /* scales smoothly between a min and max */
}`}</CodeBox>

        <Para>
          <code>clamp(min, preferred, max)</code> is a genuinely powerful modern tool here — it lets a
          value scale fluidly with the viewport (the <code>vw</code> unit in the middle argument) while
          guaranteeing it never goes below the minimum or above the maximum, often eliminating the need
          for a media query entirely for values like padding or font-size that just need to scale
          smoothly rather than change abruptly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Testing Responsively for Real" />
        <SectionTitle>DevTools' Device Toolbar, and Its Real Limits</SectionTitle>

        <Para>
          Every modern browser's DevTools includes a device toolbar that simulates common device
          viewport sizes — genuinely useful for rapid iteration, but it simulates the viewport{' '}
          <em>dimensions</em>, not the real device's rendering engine, touch behavior, or actual
          performance characteristics.
        </Para>

        <Callout type="tip">
          <strong>DevTools device simulation is a fast first check, never the final one.</strong> A
          layout that looks correct in Chrome's simulated iPhone view can still behave differently on a
          genuine iPhone Safari — real hardware testing (or at minimum testing in each browser's actual
          engine, not just Chrome's simulator) remains necessary before shipping anything that matters.
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
        <SectionTitle>A Layout That Broke Specifically at 820px, at a Minneapolis Retail Startup</SectionTitle>

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
            Scenario — Retail startup, Minneapolis · Responsive layout bug
          </div>

          <Para>
            A product page's layout, built entirely around a framework's default 768px breakpoint, looks
            correct at every device size tested during development. A support ticket reports the layout
            "looking broken" — text overlapping the product image — specifically on an iPad in landscape
            orientation.
          </Para>

          <CodeBox label="The gap between the tested viewport and the real device's actual viewport">{`/* The team's breakpoint, copied from a framework default */
@media (min-width: 768px) {
  .product-layout { display: flex; }
}

/* An iPad in landscape orientation reports a viewport width of 1024px —
   comfortably past 768px, so the flex layout DOES activate — but the
   product description text at that specific width was long enough that
   the two flex columns didn't have enough combined space, causing overlap */`}</CodeBox>

          <SubSubTitle>What the fix actually required</SubSubTitle>

          <Para>
            The bug wasn't really about the breakpoint being wrong in the abstract — it was that the
            breakpoint had been chosen from a generic framework default rather than by testing this
            specific layout's actual content at a range of real widths. The team's fix: resize the
            browser slowly through the full range and identify the exact width where THIS layout, with
            THIS content, starts to look cramped — landing on a genuinely different, content-driven
            breakpoint than the framework's default. Their retrospective note: "768px works great for
            someone else's layout. It doesn't mean anything for ours until we actually test ours."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Responsive Design</SectionTitle>

        {[
          {
            wrong: '"There is one correct, universal set of breakpoint values every site should use"',
            right: 'Common breakpoint numbers (480/768/1024/1280px) are popular framework conventions, not a specification requirement — the genuinely correct breakpoints for a specific layout are wherever ITS content actually starts to look cramped, found by testing, not by copying a default.',
          },
          {
            wrong: '"min-width and max-width media queries are just two syntaxes for the same thing"',
            right: 'They represent two different underlying strategies — min-width naturally supports building mobile-first (adding complexity as space grows), max-width naturally supports desktop-first (removing/overriding as space shrinks). Mixing both freely in the same project creates a genuinely confusing, inconsistent codebase.',
          },
          {
            wrong: '"Testing in a browser\'s DevTools device simulator is equivalent to testing on the real device"',
            right: 'The simulator matches viewport DIMENSIONS but not the real rendering engine, actual touch behaviour, or real performance — a layout that looks correct in a Chrome-simulated iPhone view can still render differently on genuine iPhone Safari.',
          },
          {
            wrong: '"A media query is the only tool for building a layout that adapts to screen size"',
            right: 'Relative units (%, clamp(), fluid typography) let values scale continuously between breakpoints, often reducing how many discrete media query breakpoints a layout actually needs — the two techniques work together, not as alternatives to choose between.',
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
              ✕ {item.wrong}
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
            q: 'What is the structural difference between a min-width and a max-width media query strategy?',
            a: 'min-width queries apply once the viewport is AT LEAST that wide, naturally supporting a mobile-first approach where base styles target small screens and complexity is progressively added. max-width queries apply once the viewport is AT MOST that wide, naturally supporting a desktop-first approach where a full layout is progressively stripped down. They are not interchangeable syntax for the same strategy.',
          },
          {
            q: 'Why is there no single "correct" set of breakpoint values every project should use?',
            a: 'Device screen sizes vary too widely for any fixed set of breakpoints to universally fit every layout\'s content. Common numbers like 768px are popular framework conventions, not a specification — the correct breakpoints for a specific layout are found by testing where THAT layout\'s content actually starts to look cramped.',
          },
          {
            q: 'What does the clamp() CSS function do, and why is it useful for responsive design?',
            a: 'clamp(min, preferred, max) lets a value scale fluidly with the viewport (via the preferred argument, often using vw) while guaranteeing it never drops below the minimum or exceeds the maximum — often eliminating the need for a media query breakpoint for values like padding or font-size that just need to scale smoothly.',
          },
          {
            q: 'What is the difference between testing responsiveness in DevTools\' device simulator versus on a real device?',
            a: 'The simulator accurately reproduces the target viewport\'s dimensions, but not the real browser rendering engine, actual touch input behaviour, or genuine device performance — a layout can look correct in a simulated view and still render or behave differently on real hardware, so simulator testing is a fast first check, not a final one.',
          },
          {
            q: 'What does a feature query like (hover: hover) let you detect that a width-based media query cannot?',
            a: 'It detects whether the device genuinely supports true hover interaction (a real mouse-like pointer), independent of screen width — letting you avoid hover-dependent UI patterns specifically on touch devices, even ones with a wide screen that would otherwise pass a min-width check.',
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
        <SectionTitle>Responsive Design Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Copying a framework\'s default breakpoints without testing your own actual content',
            a: 'A generic breakpoint value works for whatever content it was designed around — it provides no guarantee your specific layout won\'t break at some other width, exactly as shown in the Real World example above.',
          },
          {
            q: 'Mixing min-width and max-width queries inconsistently within the same project',
            a: 'Forces every future reader to track two different mental models of "when do these rules apply" simultaneously — pick one strategy (mobile-first, min-width) and stay consistent throughout.',
          },
          {
            q: 'Only testing in DevTools\' device simulator and never on real hardware',
            a: 'The simulator matches viewport size but not the real rendering engine or touch behaviour — a layout can pass simulator testing and still break on genuine device hardware.',
          },
          {
            q: 'Reaching for a media query breakpoint where a relative unit (%, clamp()) would scale more naturally',
            a: 'A value that genuinely just needs to grow smoothly with the viewport (like padding or font-size) often doesn\'t need a discrete breakpoint jump at all — clamp() can eliminate the abrupt snap a media query introduces.',
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
        <SectionTitle>Issues You Will Hit With Media Queries — And Exactly Why</SectionTitle>

        {[
          {
            error: `A media query's styles never seem to apply, even at the right viewport width`,
            cause: 'Most commonly a missing viewport meta tag in the document head — without it, mobile browsers render the page at a wide default virtual viewport (often 980px) regardless of the physical screen size, so narrow-width media queries never actually trigger.',
            fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> to the document head — this tells the browser to use the real device width as the viewport.',
          },
          {
            error: `Two overlapping media query ranges both apply at the same width, and the later one in the stylesheet wins unexpectedly`,
            cause: 'Two @media blocks with ranges that overlap (e.g. one min-width: 768px and another max-width: 900px both matching at 800px) both have their rules apply — normal CSS cascade/source-order rules decide which wins, which can be surprising if the overlap wasn\'t intentional.',
            fix: 'Use non-overlapping ranges (min-width combined with a matching max-width on the boundary) or restructure to a single progressive min-width-only strategy to avoid ambiguous overlaps.',
          },
          {
            error: `A layout looks correct at every tested width but breaks at some in-between value`,
            cause: 'Breakpoints were chosen at a few round numbers without testing the full continuous range between them — content can become cramped or overflow at widths nobody explicitly checked.',
            fix: 'Slowly drag-resize the browser window through the entire range rather than only testing a fixed list of preset device widths.',
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
        'A media query wraps a block of CSS in a condition — most commonly viewport width — so it only applies when true.',
        'min-width and max-width represent two different strategies (mobile-first vs desktop-first), not interchangeable syntax — pick one and stay consistent throughout a project.',
        'Common breakpoint numbers (768px, 1024px, etc.) are popular conventions, not a specification — the correct breakpoints for a layout are found by testing that layout\'s own content, not by copying a default.',
        'Feature queries like (hover: hover) and (pointer: fine) detect real interaction capability, independent of screen width.',
        'clamp() lets a value scale fluidly between a minimum and maximum, often eliminating the need for a discrete breakpoint on values like padding or font-size.',
        'DevTools\' device simulator is a fast first responsive check, matching viewport dimensions only — real device/browser testing remains necessary before shipping.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 29 covers mobile-first design principles — why designing for the smallest screen first
          tends to produce leaner, more maintainable CSS.
        </p>
        <Link href="/learn/html-css/mobile-first-design" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 29 → Mobile-First Design Principles
        </Link>
      </div>
    </LearnLayout>
  )
}
