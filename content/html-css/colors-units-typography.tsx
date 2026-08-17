import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Colors, Units & Typography — HTML & CSS | Chaduvuko',
  description:
    'Absolute vs relative units, why rem wins for font-sizing, every CSS color format, font-family stacks, web fonts, and font-weight/line-height fundamentals.',
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

export default function ColorsUnitsTypography() {
  return (
    <LearnLayout
      title="Colors, Units & Typography"
      description="px vs em vs rem vs %, every color format, font-family stacks, and web fonts — the values you will type in every single stylesheet."
      section="HTML & CSS — Module 19"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Absolute vs Relative Units" />
        <SectionTitle>Two Families of CSS Units — and Why the Distinction Matters</SectionTitle>

        <Para>
          Every length value in CSS — a width, a font size, a margin — is expressed in a unit, and CSS
          units split into two fundamentally different families. <strong>Absolute</strong> units always
          represent the same physical size, regardless of anything else on the page. <strong>Relative</strong>{' '}
          units are computed based on some other value — the parent&apos;s font size, the viewport
          dimensions, or the root element&apos;s font size — which means the same declared number can render
          at different actual sizes depending on context.
        </Para>

        <CodeBox label="An absolute unit — px — always means the same thing">{`.box {
  width: 300px;
  font-size: 16px;
}

/* 300px is always 300px, everywhere it's used, regardless of the
   parent element, the user's browser settings, or anything else. */`}</CodeBox>

        <Para>
          <code>px</code> (pixels) is the only absolute unit used in everyday CSS — the others defined by
          the specification (<code>cm</code>, <code>in</code>, <code>pt</code>, and similar) are intended
          for print stylesheets and essentially never appear in web layout code. Even <code>px</code> is
          not perfectly "absolute" in the physical sense on every device (high-density displays render CSS
          pixels using multiple physical device pixels), but for CSS&apos;s purposes it behaves as a fixed,
          predictable unit that does not scale with anything else on the page.
        </Para>

        <Callout type="info">
          The relative units you will use daily are <code>%</code>, <code>em</code>, <code>rem</code>,{' '}
          <code>vw</code>, and <code>vh</code> — each relative to a different reference, covered one at a
          time in the next two parts.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — %, vw, vh" />
        <SectionTitle>Percentage and Viewport Units</SectionTitle>

        <Para>
          <code>%</code> is relative to the corresponding dimension of the element&apos;s{' '}
          <strong>containing block</strong> — most commonly its parent. A width of <code>50%</code> means
          "half of my parent&apos;s width," and because it recomputes automatically whenever the parent&apos;s
          size changes, it is one of the oldest tools for building layouts that adapt to their container.
        </Para>

        <CodeBox label="Percentage widths are relative to the parent">{`.parent {
  width: 800px;
}

.child {
  width: 50%;   /* computes to 400px — half of the PARENT's width */
}

/* If .parent's width ever changes, .child's rendered width updates
   automatically — no CSS change required. */`}</CodeBox>

        <Para>
          <code>vw</code> and <code>vh</code> (viewport width/height) are relative to the browser
          window&apos;s viewport instead of any parent element — <code>1vw</code> is exactly 1% of the
          viewport&apos;s width, and <code>1vh</code> is exactly 1% of its height, regardless of what
          element they are applied to or how deeply nested it is.
        </Para>

        <CodeBox label="Viewport units — sized relative to the browser window itself">{`.hero {
  height: 100vh;    /* always exactly the full viewport height */
  width: 100vw;     /* always exactly the full viewport width */
}

.hero-title {
  font-size: 5vw;   /* text that scales continuously with window width —
                        common for large, responsive hero headings */
}`}</CodeBox>

        <Callout type="warning">
          <strong>vw/vh are relative to the viewport, not the parent</strong> — a very common mix-up. An
          element buried five levels deep in nested containers still computes <code>50vw</code> as half the
          entire browser window, completely ignoring the size of any of its ancestors. Reach for percentage
          units when you want sizing relative to a parent container, and viewport units specifically when
          you want sizing relative to the actual screen/window, regardless of nesting.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — em vs rem" />
        <SectionTitle>em vs rem — and Why rem Wins for Font Sizing</SectionTitle>

        <Para>
          <code>em</code> and <code>rem</code> are both relative to a font size — but relative to{' '}
          <strong>different</strong> font sizes, and that difference is exactly what makes one of them far
          more predictable to use.
        </Para>

        <CodeBox label="em is relative to the CURRENT element's own font-size (or its parent's, for font-size itself)">{`.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em;   /* 1.5 × the PARENT's font-size = 30px */
  padding: 1em;         /* 1 × the CHILD's OWN font-size (now 30px) = 30px padding */
}`}</CodeBox>

        <Para>
          Notice the two different references in that single example — for <code>font-size</code> itself,{' '}
          <code>em</code> looks at the parent&apos;s font size; for every other property (like{' '}
          <code>padding</code> above), <code>em</code> looks at the element&apos;s own, already-computed font
          size. This dual behavior is exactly what makes <code>em</code> hard to reason about in nested
          structures — the effective size compounds at every nesting level that also sets a font size in{' '}
          <code>em</code>.
        </Para>

        <CodeBox label="The classic em compounding problem">{`.list {
  font-size: 1.2em;  /* 1.2 × parent's size */
}

.list .list {          /* a nested list, inside another .list */
  font-size: 1.2em;  /* 1.2 × the ALREADY-scaled parent — compounds! */
}

/* Three levels of nested lists, each at 1.2em, does not give you
   1.2x the base size three times independently — it multiplies:
   1.2 × 1.2 × 1.2 = 1.728x the original base size, growing faster
   than most engineers expect just from reading the CSS. */`}</CodeBox>

        <Para>
          <code>rem</code> ("root em") fixes this entirely by always referencing the <strong>root</strong>{' '}
          element&apos;s (<code>&lt;html&gt;</code>) font size — never the immediate parent, no matter how
          deeply nested the element is. The default root font size in every browser is <code>16px</code>{' '}
          unless a user or a stylesheet changes it.
        </Para>

        <CodeBox label="rem is always relative to the ROOT font size — flat, not compounding">{`html {
  font-size: 16px;   /* the default, shown explicitly here */
}

.deeply .nested .element {
  font-size: 1.5rem;   /* ALWAYS 1.5 × 16px = 24px, no matter how
                            deeply nested this selector is, and no
                            matter what font-size any ancestor sets */
}`}</CodeBox>

        <Callout type="tip">
          <strong>rem is the standard choice for font-sizing in real production CSS</strong> — it is
          predictable regardless of nesting depth, and it respects a user&apos;s browser-level font-size
          preference (set in accessibility settings for readers who need larger text), because it is still
          computed relative to the root font size rather than a fixed pixel value. A stylesheet built
          entirely on <code>px</code> font sizes ignores that user preference completely; one built on{' '}
          <code>rem</code> scales with it automatically.
        </Callout>

        <SubTitle>Where em is still genuinely the right choice</SubTitle>

        <Para>
          <code>em</code> is not obsolete — it is the right tool specifically when you want a value to scale{' '}
          <em>with the element&apos;s own font size</em>, such as padding or spacing inside a button whose
          text size might vary by size variant (small/medium/large), so the padding automatically stays
          proportional without a separate override for each size.
        </Para>

        <CodeBox label="em used correctly — spacing that scales with the component's own text size">{`.btn {
  font-size: 16px;
  padding: 0.75em 1.5em;   /* scales automatically if font-size changes */
}

.btn--large {
  font-size: 20px;
  /* padding recalculates automatically: 0.75em is now 15px, not 12px —
     no separate padding override needed for the larger variant */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Color Formats" />
        <SectionTitle>Every Way to Write a Color in CSS</SectionTitle>

        <Para>
          CSS supports several distinct ways to express the same color, and real stylesheets mix them
          depending on the situation — mostly hex for fixed brand colors, and <code>rgb()</code>/<code>hsl()</code>{' '}
          when transparency or programmatic color manipulation is involved.
        </Para>

        <CodeBox label="Hex — the most common format for fixed colors">{`.box {
  color: #f97316;        /* 6-digit hex: RR GG BB, each pair 00-ff */
  background: #333;      /* 3-digit shorthand — each digit doubles: #333 = #333333 */
}`}</CodeBox>

        <CodeBox label="rgb() and rgba() — red, green, blue, and an optional alpha (transparency)">{`.box {
  color: rgb(249, 115, 22);          /* same orange as #f97316 */
  background: rgba(0, 0, 0, 0.5);    /* black at 50% opacity */
}

/* Modern CSS also allows the space-separated syntax with a slash
   for alpha, which behaves identically: */
.box {
  background: rgb(0 0 0 / 50%);
}`}</CodeBox>

        <CodeBox label="hsl() and hsla() — hue, saturation, lightness, and optional alpha">{`.box {
  color: hsl(24, 95%, 53%);            /* same orange again */
  background: hsla(24, 95%, 53%, 0.3);  /* the same orange, 30% opacity */
}

/* hsl() is often easier to reason about for programmatic color changes:
   keep hue and saturation fixed, and just adjust lightness to get a
   family of related shades — exactly how CSS-in-JS theme systems and
   design-token tools commonly generate hover/active state colors. */`}</CodeBox>

        <CodeBox label="Named colors — a fixed list of keywords the CSS spec defines">{`.box {
  color: tomato;
  background: rebeccapurple;
  border-color: transparent;
}

/* There are 147 named colors in the CSS spec. They are convenient for
   quick prototyping, but real design systems almost always use hex or
   hsl() instead, tied to actual brand color values. */`}</CodeBox>

        <SubTitle>8-digit hex — the lesser-known alpha variant</SubTitle>

        <Para>
          Hex colors also support an 8-digit form (and a 4-digit shorthand) that adds an alpha channel,
          exactly like <code>rgba()</code> — two extra hex digits (00 to ff) at the end for opacity.
        </Para>

        <CodeBox label="8-digit hex with alpha">{`.overlay {
  background: #000000cc;   /* black at roughly 80% opacity (cc = 204/255) */
}

/* Equivalent to: rgba(0, 0, 0, 0.8) */`}</CodeBox>

        <Callout type="info">
          <code>currentColor</code> is a special CSS keyword worth knowing — it always resolves to the
          element&apos;s own computed <code>color</code> value, which makes it useful for things like a
          border or an SVG fill that should always match whatever text color is currently active, including
          through hover states, without duplicating the color value in two places.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — font-family Stacks" />
        <SectionTitle>font-family — Always a Fallback List, Never a Single Font</SectionTitle>

        <Para>
          <code>font-family</code> accepts a comma-separated list, not a single value, and the browser
          walks the list left to right, using the first font it actually has available on the
          user&apos;s system. This is called a <strong>font stack</strong>, and writing one is standard
          practice — a website that specifies only a single, specific font risks that font simply not
          being installed on a visitor&apos;s device, silently falling back to the browser&apos;s default
          (often an unstyled serif font).
        </Para>

        <CodeBox label="A real-world font stack">{`body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* The browser tries 'Helvetica Neue' first. If it isn't installed,
   it tries plain Helvetica. If that also isn't available, Arial.
   sans-serif at the very end is a GENERIC family, not a specific
   font — a final guaranteed fallback every browser can resolve. */`}</CodeBox>

        <Para>
          Font names containing a space (like <code>Helvetica Neue</code>) must be quoted; single-word
          names do not strictly require quotes but are commonly quoted anyway for consistency.
        </Para>

        <SubTitle>The five generic font families</SubTitle>

        <Para>
          Every font stack should end with one of CSS&apos;s five generic families — a guaranteed,
          always-available fallback that tells the browser roughly what kind of font to substitute if
          nothing else in the list matched.
        </Para>

        <CodeBox label="The five generic families">{`sans-serif   /* clean, no decorative strokes — most UI text */
serif        /* decorative strokes at letter ends — traditional body text */
monospace    /* fixed-width — code blocks, terminal output */
cursive      /* handwriting-style */
fantasy      /* decorative, rarely used */`}</CodeBox>

        <Callout type="tip">
          <strong>System font stacks</strong> are a common modern pattern — instead of a specific named
          font, reference each operating system&apos;s own native UI font, giving every visitor a font that
          already matches their OS&apos;s look and feel, loads with zero network requests, and renders
          instantly.
        </Callout>

        <CodeBox label="A system font stack">{`body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* system-ui resolves to San Francisco on macOS/iOS, Segoe UI on
   Windows, Roboto on Android — no font file download required at all. */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Web Fonts and @font-face" />
        <SectionTitle>Loading Custom Fonts — @font-face in Brief</SectionTitle>

        <Para>
          When a design needs a specific font that is not guaranteed to be installed on visitors&apos;
          devices, the font file itself has to be shipped to the browser — either self-hosted or loaded
          from a service like Google Fonts. <code>@font-face</code> is the CSS rule that registers a custom
          font, giving it a name your <code>font-family</code> declarations can then reference like any
          other font.
        </Para>

        <CodeBox label="Registering and using a self-hosted custom font">{`@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
}`}</CodeBox>

        <Para>
          <code>font-display: swap</code> is worth calling out specifically — it tells the browser to
          render text immediately using a fallback font while the custom font file is still downloading,
          then swap it in once it arrives, rather than leaving text invisible until the font finishes
          loading (the default behavior, which can produce a jarring flash of invisible text on a slow
          connection).
        </Para>

        <CodeBox label="Loading a font from a hosted service, like Google Fonts">{`<!-- in the HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">`}</CodeBox>

        <Para>
          Hosted font services generate the <code>@font-face</code> rules automatically and serve the font
          files from their own CDN — trading a small amount of control for convenience and, often, better
          caching (many sites already share the same Google Fonts URL, so a visitor may already have the
          file cached from a completely different website).
        </Para>

        <Callout type="warning">
          Every custom web font is an extra network request and extra render-blocking risk if not handled
          carefully. A page that loads four font weights of a decorative display font for a handful of
          headings is a common, avoidable source of slow page loads — the Responsive Images &amp; Performance
          module later in this track covers font loading performance in more depth, but the rule of thumb
          for now is: load only the weights you actually use, and always set <code>font-display: swap</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — font-weight and line-height" />
        <SectionTitle>font-weight and line-height — The Two Properties Behind Every Readable Page</SectionTitle>

        <Para>
          <code>font-weight</code> controls how bold text renders. It accepts numeric values from{' '}
          <code>100</code> (thinnest) to <code>900</code> (boldest) in steps of 100, plus the keywords{' '}
          <code>normal</code> (equivalent to 400) and <code>bold</code> (equivalent to 700).
        </Para>

        <CodeBox label="font-weight values">{`p {
  font-weight: 400;    /* normal — same as font-weight: normal */
}

h1 {
  font-weight: 700;    /* bold — same as font-weight: bold */
}

.thin-heading {
  font-weight: 300;    /* light — only renders if the font FILE actually
                            includes a light weight variant */
}`}</CodeBox>

        <Callout type="warning">
          <strong>Numeric font-weight values only work if the loaded font actually has that weight
          available.</strong> Setting <code>font-weight: 300</code> when only the regular (400) and bold
          (700) weights of a font were loaded typically causes the browser to either fall back to the
          nearest available weight, or in some cases synthetically "fake" the weight by stretching the
          regular glyph outlines — which usually looks noticeably worse than a real light-weight font file.
          When using a custom web font, load the specific weights the design actually needs.
        </Callout>

        <SubTitle>line-height — vertical spacing between lines of text</SubTitle>

        <Para>
          <code>line-height</code> controls the vertical space allotted to each line of text, and it is one
          of the highest-impact properties for readability — text set too tight is hard to read across
          multiple lines, and text set too loose feels disconnected.
        </Para>

        <CodeBox label="line-height — unitless vs px vs %">{`p {
  line-height: 1.6;    /* UNITLESS — 1.6 × this element's OWN font-size.
                            This is the recommended form. */
}

p {
  line-height: 24px;   /* a FIXED pixel value — does not scale if
                            font-size changes on this element or a
                            descendant that inherits it */
}

p {
  line-height: 150%;   /* computed ONCE relative to this element's
                            font-size, then INHERITED as that fixed
                            computed value — a subtle trap covered next */
}`}</CodeBox>

        <Para>
          The unitless form is strongly preferred, and the reason is inheritance: a unitless{' '}
          <code>line-height</code> is inherited as the raw <em>ratio</em>, so each descendant recalculates
          it against its own font size. A percentage or pixel value, by contrast, is computed once on the
          element that declares it and then inherited as that fixed, already-computed value — meaning a
          nested element with a larger font-size than its parent can end up with visually cramped lines,
          because it inherited a pixel value calculated for a smaller font size.
        </Para>

        <CodeBox label="Why unitless line-height avoids a real inheritance bug">{`.parent {
  font-size: 16px;
  line-height: 150%;   /* computes to 24px, and 24px is what's INHERITED */
}

.parent .child {
  font-size: 32px;    /* larger text... */
  /* ...but still inherits a FIXED 24px line-height from the parent —
     way too tight for 32px text, and visually cramped. */
}

/* Using line-height: 1.5 (unitless) on .parent instead would let
   .child compute its OWN line-height as 1.5 × 32px = 48px — correctly
   proportional to its own, larger font size. */`}</CodeBox>
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
        <SectionTitle>An Accessibility Audit at a Chicago EdTech Startup</SectionTitle>

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
            Scenario — EdTech startup, Chicago · Third-party accessibility audit
          </div>

          <Para>
            A Chicago-based EdTech startup building a reading platform for K-12 students commissions a
            third-party accessibility audit before a school-district contract renewal. The report flags one
            issue affecting nearly every page on the site: increasing the browser&apos;s text-size setting
            (a standard low-vision accommodation, and one many school districts explicitly test for) does
            almost nothing — body text barely grows at all.
          </Para>

          <SubSubTitle>What the auditor finds in the codebase</SubSubTitle>

          <Para>
            Every font-size declaration across the site&apos;s stylesheets is written in <code>px</code>,
            hardcoded against the assumption of a 16px root font size that never actually changes when a
            user adjusts their browser&apos;s minimum or default font size setting — because pixel values
            are, by definition, absolute and do not respond to that setting at all.
          </Para>

          <CodeBox label="The original stylesheet — entirely px-based">{`body {
  font-size: 16px;
}

h1 { font-size: 32px; }
h2 { font-size: 24px; }
p  { font-size: 16px; }
.caption { font-size: 12px; }`}</CodeBox>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team converts every font-size declaration to <code>rem</code>, keeping the exact same
            visual proportions (since 16px, at the default 16px root size, is precisely 1rem), but now
            genuinely responsive to a user&apos;s font-size preference — because <code>rem</code> always
            recomputes relative to the root element&apos;s font size, which is exactly the value a
            browser&apos;s accessibility setting adjusts.
          </Para>

          <CodeBox label="The fix — identical default appearance, now genuinely accessible">{`body {
  font-size: 1rem;     /* 16px at the default root size */
}

h1 { font-size: 2rem;      }   /* 32px, same as before */
h2 { font-size: 1.5rem;    }   /* 24px, same as before */
p  { font-size: 1rem;      }   /* 16px, same as before */
.caption { font-size: 0.75rem; } /* 12px, same as before */

/* Visually IDENTICAL at default settings — but now every value scales
   correctly when a user increases their browser's font size, since
   rem always tracks the root element's font size. */`}</CodeBox>

          <Para>
            The audit also flags <code>line-height</code> values set in fixed pixels for the same reason —
            switched to unitless values so line spacing scales proportionally alongside the now-responsive
            font sizes, exactly as covered in Part 07. This is a genuinely common finding in real
            accessibility audits: a site that looks correct by every visual measure can still fail a
            legally relevant accessibility requirement purely because of a unit choice made early in the
            project, long before anyone thought to test with an adjusted browser font size.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Colors, Units, and Typography</SectionTitle>

        {[
          {
            wrong: '"em and rem are basically interchangeable — just two spellings of the same relative unit"',
            right: 'They reference different things: em is relative to the CURRENT element\'s own font-size (or its parent\'s, specifically for the font-size property), which compounds across nested elements. rem is always relative to the root <html> element\'s font-size, flat and predictable regardless of nesting depth — which is why rem is generally preferred for font-sizing.',
          },
          {
            wrong: '"px is the safest, most predictable unit, so it should be used for everything, including font sizes"',
            right: 'px font sizes ignore a user\'s browser-level font-size accessibility preference entirely, since px is a fixed, absolute unit by definition. rem, by contrast, is still predictable AND responds correctly to that setting, exactly as shown in the Real World example above.',
          },
          {
            wrong: '"vw and % behave the same way — both are just percentages of something"',
            right: 'They are relative to different references: % is relative to the element\'s containing block (usually its parent), while vw/vh are relative to the browser viewport itself, completely independent of any parent element\'s size or nesting depth.',
          },
          {
            wrong: '"line-height: 150% and line-height: 1.5 always behave identically"',
            right: 'They differ specifically once inheritance is involved: line-height: 1.5 is inherited as a raw ratio and recalculated against each descendant\'s own font-size, while line-height: 150% is computed once on the declaring element and inherited as that fixed pixel value — which can produce cramped line spacing on a descendant with a larger font-size, exactly as shown in Part 07.',
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
            q: 'Why is rem generally preferred over px or em for font-sizing in production stylesheets?',
            a: 'rem is always relative to the root <html> element\'s font-size, so it stays predictable regardless of how deeply an element is nested — unlike em, which is relative to the parent (or the element\'s own font-size for non-font-size properties) and compounds across nested levels. rem also respects a user\'s browser-level font-size accessibility setting, since that setting changes the root font-size that rem is computed against, while px is a fixed absolute unit that ignores it entirely.',
          },
          {
            q: 'Explain the em compounding problem with a concrete example.',
            a: 'If font-size is set in em on multiple nested elements, each level multiplies against its already-scaled parent rather than a fixed reference. Three levels of nesting, each set to 1.2em, produce 1.2 × 1.2 × 1.2 = 1.728x the original size — not three independent 1.2x scalings — which grows faster and less predictably than the CSS visually suggests, especially as components get reused inside other components.',
          },
          {
            q: 'What is the difference between % and vw/vh as units, and when would you choose one over the other?',
            a: '% is relative to the element\'s containing block, typically its parent — useful for sizing something proportionally within its container. vw/vh are relative to the browser viewport itself, ignoring parent size and nesting entirely — useful for things that should scale with the actual screen/window, like a full-bleed hero section (height: 100vh) or text that scales continuously with window width, independent of how deeply the element is nested in the DOM.',
          },
          {
            q: 'Why should line-height generally be set as a unitless number rather than a pixel or percentage value?',
            a: 'A unitless line-height is inherited as a raw ratio and recalculated against each descendant\'s own font-size. A pixel or percentage value is computed once on the declaring element and inherited as that fixed, already-computed size — which can produce visually cramped line spacing on any descendant that has a larger font-size than the element that set line-height, since it inherits a value calculated for a smaller font.',
          },
          {
            q: 'What is a font stack, and why does font-family always list multiple fonts instead of just one?',
            a: 'A font stack is a comma-separated fallback list — the browser tries each font in order and uses the first one actually available on the user\'s system, ending with a generic family (sans-serif, serif, monospace, etc.) as a guaranteed final fallback. Specifying only a single font risks it not being installed on a visitor\'s device, silently falling back to the browser\'s unstyled default font instead of a deliberately chosen fallback.',
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
        <SectionTitle>Colors, Units & Typography Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Hardcoding every font-size in px',
            a: 'It works visually, but ignores browser-level font-size accessibility preferences entirely, exactly as covered in the Real World example. Use rem for font-sizing throughout the project, reserving px for values that genuinely should never scale, like a 1px hairline border.',
          },
          {
            q: 'Confusing em\'s reference point for font-size vs every other property',
            a: 'For font-size specifically, em is relative to the PARENT\'s font-size. For every other property (padding, margin, width, and so on), em is relative to the element\'s OWN font-size. Mixing these up produces sizes that don\'t match what was expected.',
          },
          {
            q: 'Specifying only one font in font-family, with no fallback list',
            a: 'If that exact font isn\'t installed on the visitor\'s device and isn\'t loaded as a web font, the browser silently falls back to its own default font. Always end a font-family list with a generic family (sans-serif, serif, or monospace).',
          },
          {
            q: 'Setting a numeric font-weight the loaded font file doesn\'t actually include',
            a: 'The browser either substitutes the nearest available real weight or synthetically fakes the requested weight by stretching the glyph outlines, which usually looks noticeably worse than an authentic font file at that weight. Load only the specific weights a design actually uses, and verify they match the font-weight values used in CSS.',
          },
          {
            q: 'Forgetting font-display: swap on custom @font-face declarations',
            a: 'Without it, text using that font can remain invisible until the font file finishes downloading — a jarring flash of invisible text, especially on a slow connection. font-display: swap shows a fallback font immediately and swaps in the custom font once it loads.',
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
            error: `Text appears invisible for a moment on page load, then suddenly "pops in"`,
            cause: 'A custom web font loaded via @font-face without font-display: swap — the browser hides text using that font entirely until the font file finishes downloading (the "flash of invisible text").',
            fix: 'Add font-display: swap to the @font-face rule (or the equivalent setting in a hosted font service\'s embed code) so a fallback font renders immediately, swapped for the real font once it loads.',
          },
          {
            error: `Increasing the browser's font size setting has little to no visible effect on the page`,
            cause: 'Font sizes throughout the stylesheet are set in px, an absolute unit that does not respond to the root font-size a browser\'s accessibility setting actually changes.',
            fix: 'Convert font-size (and ideally line-height) declarations to rem, which recomputes relative to the root element\'s font-size — exactly what the browser setting adjusts.',
          },
          {
            error: `Nested text ends up much larger or smaller than expected, despite a seemingly reasonable font-size value`,
            cause: 'font-size set in em at multiple nested levels compounds against each already-scaled parent rather than a fixed reference point, exactly as covered in Part 03.',
            fix: 'Switch to rem for font-sizing, which always references the root element\'s font-size regardless of nesting depth, removing the compounding entirely.',
          },
          {
            error: `A custom font in font-family silently doesn't apply — the fallback font renders instead`,
            cause: 'The font name is misspelled, not properly quoted (common with multi-word names like Helvetica Neue), or the @font-face src url points to a font file that failed to load — check the Network tab for a 404.',
            fix: 'Double-check the exact font-family name against the @font-face declaration (or the font service\'s documented name), quote multi-word names, and confirm the font file actually loads successfully in DevTools\' Network panel.',
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
        'px is the only commonly used absolute unit; %, em, rem, vw, and vh are all relative to something else, which is exactly what makes them useful for responsive design.',
        '% is relative to the containing block (usually the parent); vw/vh are relative to the browser viewport itself, regardless of nesting depth.',
        'em is relative to the parent\'s font-size (for the font-size property) or the element\'s own font-size (for everything else), and compounds across nested elements set in em.',
        'rem is always relative to the root <html> element\'s font-size — flat, predictable regardless of nesting, and the standard choice for font-sizing in production CSS.',
        'CSS colors can be written as hex (#f97316), rgb()/rgba(), hsl()/hsla(), or named keywords — all four are equivalent ways to express the same color, with rgb()/hsl() and their 8-digit hex equivalent supporting an alpha (transparency) channel.',
        'font-family is always a fallback list ending in a generic family (sans-serif, serif, monospace) — never a single font name alone.',
        '@font-face registers a custom font file for use in font-family; always pair it with font-display: swap to avoid a flash of invisible text while it loads.',
        'Prefer a unitless line-height (e.g. 1.6) over a pixel or percentage value — it is inherited as a ratio and recalculates correctly for descendants with a different font-size.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 20 goes deep on selectors — combinators, pseudo-classes, pseudo-elements, and the exact
          numeric specificity calculation only introduced conceptually back in Module 17.
        </p>
        <Link href="/learn/html-css/css-selectors-deep-dive" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 20 → CSS Selectors Deep Dive
        </Link>
      </div>
    </LearnLayout>
  )
}
