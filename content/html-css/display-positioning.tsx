import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Display & Positioning — HTML & CSS | Chaduvuko',
  description:
    'display: block/inline/inline-block differences in actual rendered behavior, position: static/relative/absolute/fixed/sticky and precisely how each containing block is determined, z-index, and what genuinely creates a stacking context.',
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

export default function DisplayPositioning() {
  return (
    <LearnLayout
      title="Display & Positioning"
      description="display: block/inline/inline-block in real rendered behavior, position: static/relative/absolute/fixed/sticky and how each containing block is determined, and what genuinely creates a stacking context."
      section="HTML & CSS — Module 21"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — display: block" />
        <SectionTitle>display: block — Full-Width Boxes That Stack Vertically</SectionTitle>

        <Para>
          Every HTML element has a default <code>display</code> value baked into the browser&apos;s
          built-in stylesheet — not something you have to set yourself unless you want to change it.{' '}
          <code>div</code>, <code>p</code>, <code>h1</code>-<code>h6</code>, <code>section</code>,{' '}
          <code>article</code>, <code>ul</code>, <code>li</code>, and <code>form</code> are all{' '}
          <code>display: block</code> by default. A block-level box has three defining behaviors that
          every other display value is defined in contrast to.
        </Para>

        <CodeBox label="What block actually does">{`.box {
  display: block; /* the default for div, p, section, etc. */
}

/*
1. Takes up the full available width of its parent, regardless of content size
2. Always starts on a new line — forces a line break before AND after itself
3. Respects width, height, margin, and padding on all four sides in full
*/`}</CodeBox>

        <CodeBox label="Two block-level divs, side by side in the HTML, stacked in the render">{`<div style="background: #fecaca;">First box</div>
<div style="background: #bbf7d0;">Second box</div>

<!--
Even though these are written on adjacent lines with no line break between
them, they render as two full-width bars, one directly under the other.
Block elements ignore how much horizontal room their content actually needs
and claim the entire row for themselves.
-->`}</CodeBox>

        <Para>
          This is the single most important thing to internalize about <code>block</code>: width is not
          determined by content, it is determined by the parent. A <code>div</code> containing the single
          word "Hi" still stretches edge-to-edge across its container unless you explicitly constrain its{' '}
          <code>width</code>. This surprises almost everyone the first time they try to put a border
          around some inline text and watch it stretch across the whole page.
        </Para>

        <Callout type="info">
          Setting an explicit <code>width</code> on a block element does not change its block-level
          behavior — it still starts on its own line and forces the next element onto a new line. Width
          only constrains how far the box extends; it does not make the element share a line with its
          siblings. That requires a different display value entirely, covered next.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — display: inline" />
        <SectionTitle>display: inline — Flows With Text, Ignores Box Dimensions</SectionTitle>

        <Para>
          <code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>, and <code>img</code>{' '}
          (with a caveat covered below) default to <code>display: inline</code>. An inline element is,
          in almost every way, the opposite of block: it takes up only as much horizontal space as its
          content needs, sits in the normal flow of text rather than forcing a line break, and — this is
          the part that trips people up — it largely ignores <code>width</code>, <code>height</code>, and
          vertical <code>margin</code>/<code>padding</code>.
        </Para>

        <CodeBox label="An inline element silently ignoring width, height, and vertical spacing">{`.tag {
  display: inline;
  width: 200px;      /* has NO effect — inline boxes size to their content */
  height: 100px;      /* has NO effect */
  margin-top: 40px;    /* has NO effect on layout — does not push siblings away */
  margin-bottom: 40px;  /* has NO effect */
  padding: 20px;         /* renders visually (background/border extend),
                            but does NOT push surrounding line boxes apart —
                            it can visually overlap the line above/below */
}`}</CodeBox>

        <Para>
          The reason is baked into how inline layout works: inline boxes are placed along a line, and the
          height of that line is determined by the tallest inline content actually needed to display the
          text (roughly, the line-height). A <code>height: 100px</code> declaration on an inline{' '}
          <code>span</code> genuinely has no effect on how much vertical room the element occupies in the
          page — the browser is not calculating a box in the way it does for block elements, it is placing
          a fragment of content into a line of text.
        </Para>

        <CodeBox label="Horizontal margin and padding DO work on inline elements">{`.tag {
  display: inline;
  margin-left: 8px;    /* works — pushes the next inline content sideways */
  padding: 4px 10px;  /* works horizontally; vertically it may visually
                         overlap without changing the line's height */
}`}</CodeBox>

        <Callout type="warning">
          <strong>This is the exact bug behind "why isn&apos;t my width/height working?"</strong> — one of
          the most frequently asked CSS questions from beginners. The element in question is almost always
          still <code>display: inline</code> (a <code>span</code> or an <code>a</code> tag left at its
          default). The fix is not a CSS bug workaround — it is switching the element to{' '}
          <code>inline-block</code> or <code>block</code>, covered next.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — display: inline-block" />
        <SectionTitle>display: inline-block — The Best of Both, With One Gotcha</SectionTitle>

        <Para>
          <code>inline-block</code> exists precisely to solve the problem from Part 02: it sits inline
          with surrounding content (no forced line break before or after), but it fully respects{' '}
          <code>width</code>, <code>height</code>, and margin/padding on every side, exactly like a block
          element would.
        </Para>

        <CodeBox label="inline-block in practice — a row of equally-sized, clickable nav buttons">{`.nav-button {
  display: inline-block;
  width: 120px;
  height: 44px;
  padding: 10px 16px;
  margin: 0 4px;
  text-align: center;
  background: #1e293b;
  color: white;
  border-radius: 6px;
}

<!-- HTML -->
<a class="nav-button" href="/home">Home</a>
<a class="nav-button" href="/pricing">Pricing</a>
<a class="nav-button" href="/about">About</a>

<!--
All three sit on the same line (inline behavior), each is exactly
120x44px with real spacing between them (block-level sizing). This
exact pattern was, before Flexbox existed, THE standard way to build
a horizontal row of equal-sized clickable elements.
-->`}</CodeBox>

        <SubTitle>The whitespace gap — inline-block&apos;s one famous gotcha</SubTitle>

        <Para>
          Because <code>inline-block</code> elements participate in inline/text layout, the whitespace
          (literal newlines and spaces) between them <em>in your HTML source</em> is rendered as a real
          gap — typically around 4px, matching the default font&apos;s space-character width. Three{' '}
          <code>inline-block</code> boxes written on separate lines in your markup will have visible gaps
          between them that <code>margin: 0</code> alone will not remove.
        </Para>

        <CodeBox label="The whitespace gap, and the three common fixes">{`<!-- Produces a ~4px gap between each button, from the newlines/indentation -->
<div>
  <a class="nav-button">Home</a>
  <a class="nav-button">Pricing</a>
  <a class="nav-button">About</a>
</div>

<!-- Fix 1: remove the whitespace by writing tags with no gap between them -->
<div><a class="nav-button">Home</a><a class="nav-button">Pricing</a><a class="nav-button">About</a></div>

<!-- Fix 2: set font-size: 0 on the parent, reset it on the children -->
.nav-wrapper { font-size: 0; }
.nav-button { font-size: 16px; }

<!-- Fix 3 (the real modern answer): don't use inline-block for this at all —
     use display: flex on the parent, which has no whitespace-gap issue
     and is covered in full starting in Module 23 -->`}</CodeBox>

        <Callout type="tip">
          In real production code today, Flexbox has almost entirely replaced{' '}
          <code>inline-block</code> for building rows of equal-sized elements — it does not have the
          whitespace-gap problem, and gives far more control over spacing and alignment. Knowing{' '}
          <code>inline-block</code> and its gotcha is still valuable: you will encounter it constantly in
          existing/legacy codebases, and it remains the right tool for a few specific cases, like wrapping
          a background/border around a short run of inline text without breaking the surrounding
          paragraph flow.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — position: static and relative" />
        <SectionTitle>position: static and relative — The Foundation Before Absolute Makes Sense</SectionTitle>

        <Para>
          <code>position: static</code> is the default value for every element — "static" means the
          element sits exactly where normal document flow places it, and the <code>top</code>,{' '}
          <code>right</code>, <code>bottom</code>, <code>left</code>, and <code>z-index</code> properties
          have <strong>zero effect</strong> on a statically positioned element. This surprises beginners
          constantly: setting <code>top: 20px</code> on an element does nothing at all until you also set
          a non-static <code>position</code>.
        </Para>

        <CodeBox label="top/left do nothing without a non-static position">{`.box {
  position: static; /* the default — you rarely write this explicitly */
  top: 50px;    /* completely ignored */
  left: 50px;    /* completely ignored */
}`}</CodeBox>

        <Para>
          <code>position: relative</code> is where offsets start actually working — but in a way that
          surprises people the first time: a relatively positioned element is still laid out in normal
          flow first (it still takes up its original space, and siblings are positioned as if it were
          static), and <em>then</em> shifted visually by the given offset from where it would otherwise
          have been. It does not affect the layout of any other element.
        </Para>

        <CodeBox label="position: relative — shifted visually, but its original space is preserved">{`.box-a { background: pink; }
.box-b {
  position: relative;
  top: 20px;
  left: 30px;
  background: lightblue;
}
.box-c { background: lightgreen; }

<!--
box-b visually shifts 20px down and 30px right from where it would
normally sit. box-c does NOT move up to fill the gap — box-b's
original position in the flow is still reserved, exactly as if it
had never moved. This is the key difference from position: absolute.
-->`}</CodeBox>

        <Para>
          <code>relative</code> is rarely used for the visual shift on its own in modern layouts — its
          real, dominant purpose in real-world CSS is something else entirely, covered in the next part:
          establishing a positioning anchor for an absolutely positioned child.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — position: absolute and the containing block" />
        <SectionTitle>position: absolute — Precisely How Its Containing Block Is Determined</SectionTitle>

        <Para>
          <code>position: absolute</code> removes an element from normal document flow entirely —
          surrounding elements behave exactly as if it were not there at all, closing the gap it would
          otherwise have occupied. It is then positioned using <code>top</code>/<code>right</code>/
          <code>bottom</code>/<code>left</code> relative to its <strong>containing block</strong> — and
          getting this containing block right is the single most important skill for using{' '}
          <code>absolute</code> correctly.
        </Para>

        <Callout type="warning">
          <strong>The exact rule:</strong> an absolutely positioned element&apos;s containing block is the
          nearest ancestor whose <code>position</code> is anything other than <code>static</code> — that
          is, the nearest ancestor with <code>relative</code>, <code>absolute</code>, <code>fixed</code>,
          or <code>sticky</code>. If <strong>no</strong> ancestor has a non-static position, the
          containing block falls all the way back to the <code>&lt;html&gt;</code> element — the
          initial containing block — which is why an absolutely positioned element with no positioned
          ancestor appears to be positioned relative to the entire page/viewport.
        </Callout>

        <CodeBox label="No positioned ancestor — absolute falls back to the page">{`<div class="card">
  <span class="badge">New</span>
</div>

.card { padding: 20px; background: #f1f5f9; }
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
}

/*
.card is position: static (the default) — it does NOT establish a
containing block. So .badge's "top: 10px; right: 10px" is measured
against the <html> element, not against .card. The badge ends up
pinned to the top-right corner of the ENTIRE PAGE, not the card —
almost never the intended result.
*/`}</CodeBox>

        <CodeBox label="The fix — position: relative on the intended ancestor">{`.card {
  position: relative;  /* the ONLY change needed */
  padding: 20px;
  background: #f1f5f9;
}
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
}

/*
Now .card has a non-static position, so it becomes .badge's containing
block. "top: 10px; right: 10px" is now measured from .card's own
padding-relative corner, so the badge sits correctly inside the card.
This exact pattern — position: relative on a parent purely to give an
absolutely positioned child a local containing block, with no visual
shift applied to the parent itself — is by far the most common reason
you will ever write position: relative in real CSS.
*/`}</CodeBox>

        <SubTitle>The containing block search skips past static ancestors entirely</SubTitle>

        <Para>
          The search for a containing block walks straight up the ancestor chain and stops at the{' '}
          <em>first</em> non-static ancestor found — it does not stop at the nearest parent regardless of
          position, and it does not stop at the first block-level container. A deeply nested{' '}
          <code>span</code> five levels down, inside a chain where only the outermost wrapper is{' '}
          <code>position: relative</code>, will use that outermost wrapper as its containing block,
          skipping every static element in between.
        </Para>

        <CodeBox label="The search skips every static ancestor in between">{`<div class="outer">           <!-- position: relative -->
  <div class="middle">          <!-- position: static (default) -->
    <div class="inner">           <!-- position: static (default) -->
      <span class="tooltip">Hi</span> <!-- position: absolute -->
    </div>
  </div>
</div>

/*
.tooltip's containing block is .outer — not .middle, not .inner —
because those two are static and get skipped entirely in the search.
*/`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — position: fixed and sticky" />
        <SectionTitle>position: fixed and sticky — Viewport-Relative and Hybrid Positioning</SectionTitle>

        <Para>
          <code>position: fixed</code> works almost identically to <code>absolute</code> — removed from
          flow, positioned via offsets — with one crucial difference: its containing block is normally the{' '}
          <strong>viewport itself</strong>, not any ancestor element, which means it stays glued to the
          same spot on screen even as the page scrolls.
        </Para>

        <CodeBox label="A fixed header that stays pinned during scroll">{`.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: white;
  z-index: 100;
}

/* IMPORTANT: since .site-header is removed from flow, the content below
   it will scroll up UNDER it unless you add matching top padding/margin
   to the next element (or the body) equal to the header's height. */
body { padding-top: 64px; }`}</CodeBox>

        <Callout type="warning">
          <strong>One frequently-missed exception:</strong> if any ancestor of a{' '}
          <code>position: fixed</code> element has a CSS <code>transform</code>,{' '}
          <code>filter</code>, <code>perspective</code>, or <code>will-change: transform</code>{' '}
          property set, that ancestor becomes the fixed element&apos;s containing block instead of the
          viewport — the &quot;fixed&quot; element then scrolls along with that ancestor, breaking the
          effect. This is a genuinely common source of "why is my fixed header scrolling away" bugs,
          usually caused by an animation library or a CSS transform applied somewhere up the tree for an
          unrelated reason.
        </Callout>

        <SubTitle>position: sticky — flows normally, then locks in place</SubTitle>

        <Para>
          <code>position: sticky</code> is a hybrid: the element behaves like{' '}
          <code>position: relative</code> (stays in normal flow, taking up its original space) until the
          page scrolls to the point where it would cross the threshold you specify — at which point it
          "sticks" and behaves like <code>position: fixed</code> relative to its nearest scrolling
          ancestor, until its parent container scrolls out of view entirely, at which point it unsticks
          again.
        </Para>

        <CodeBox label="A sticky section heading that pins to the top while its section is in view">{`.section-heading {
  position: sticky;
  top: 0; /* required — sticky needs at least one offset to know its threshold */
  background: white;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

<!--
As the user scrolls, .section-heading scrolls normally until it
reaches the top of the viewport (top: 0), then sticks there. Once
its parent .section scrolls fully past, it scrolls away with it —
it does NOT stay pinned across sibling sections.
-->`}</CodeBox>

        <Callout type="tip">
          <code>position: sticky</code> requires an explicit <code>top</code> (or{' '}
          <code>bottom</code>/<code>left</code>/<code>right</code>) value to work at all — without one,
          the browser has no threshold to stick at, and the element behaves exactly like{' '}
          <code>relative</code>. A second, very common gotcha: sticky silently stops working if{' '}
          <em>any</em> ancestor has <code>overflow: hidden</code>, <code>overflow: auto</code>, or{' '}
          <code>overflow: scroll</code> — the sticky element can only stick within the boundaries of the
          nearest ancestor that establishes a scrolling context, and a clipped overflow container breaks
          that.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — z-index and Stacking Contexts" />
        <SectionTitle>z-index — What Genuinely Creates a Stacking Context</SectionTitle>

        <Para>
          <code>z-index</code> controls which element renders on top when two positioned elements
          overlap — but only among elements that share the <strong>same stacking context</strong>. This
          is the part almost every tutorial oversimplifies: <code>z-index</code> does not simply compare
          numbers globally across the whole page. A misunderstanding here is the root cause of the
          extremely common bug "I set z-index: 9999 and it still renders behind this other element."
        </Para>

        <Callout type="warning">
          <strong>The misconception to unlearn immediately:</strong> setting a{' '}
          <code>z-index</code> value does <em>not</em>, by itself, create a new stacking context — it
          only has an effect at all on an element with a <em>non-static</em> position (
          <code>relative</code>, <code>absolute</code>, <code>fixed</code>, or <code>sticky</code>). A{' '}
          <code>z-index</code> on a <code>position: static</code> element is silently ignored entirely.
        </Callout>

        <SubTitle>The real, complete list of what creates a new stacking context</SubTitle>

        <Para>
          A new stacking context is created by any of the following — this list is considerably longer
          than most people expect, and several entries create one without any explicit{' '}
          <code>z-index</code> at all:
        </Para>

        <CodeBox label="Properties/situations that create a new stacking context">{`/* Positioned + z-index other than auto */
.a { position: relative; z-index: 1; }
.b { position: absolute; z-index: 0; }
.c { position: fixed; z-index: 1; }
.d { position: sticky; z-index: 1; }

/* opacity less than 1 — even with position: static */
.e { opacity: 0.99; }

/* transform, filter, perspective — any value other than none */
.f { transform: translateZ(0); }
.g { filter: blur(0px); }

/* will-change, if it names a property that would itself create one */
.h { will-change: transform; }

/* isolation — exists SPECIFICALLY to create a stacking context deliberately */
.i { isolation: isolate; }

/* mix-blend-mode other than normal */
.j { mix-blend-mode: multiply; }

/* the root element <html> always is one, implicitly */`}</CodeBox>

        <Para>
          The consequence that matters in practice: once an element creates a new stacking context, every
          descendant&apos;s <code>z-index</code> is compared <strong>only against its siblings inside
          that same context</strong> — it can never climb "above" an element outside the context,
          regardless of how large its <code>z-index</code> number is. A child with{' '}
          <code>z-index: 999999</code> is still trapped entirely underneath a sibling of its stacking
          context&apos;s root, if that root itself has a lower <code>z-index</code> than some other
          element on the page.
        </Para>

        <CodeBox label="A z-index: 999999 that still renders BEHIND another element — the classic trap">{`<div class="modal-wrapper">      <!-- position: relative; z-index: 1 -->
  <div class="modal">                <!-- position: absolute; z-index: 999999 -->
    Modal content
  </div>
</div>

<div class="dropdown">           <!-- position: relative; z-index: 2 -->
  Dropdown menu
</div>

/*
.modal has an enormous z-index, but it is trapped INSIDE the stacking
context created by .modal-wrapper (z-index: 1). .dropdown, at the top
level with z-index: 2, beats the entire .modal-wrapper context outright
— so .dropdown renders on top of .modal, no matter how high .modal's
own z-index climbs. The fix is not a bigger number; it is raising
.modal-wrapper's z-index above .dropdown's, or restructuring so .modal
is not nested inside a lower-stacked context at all (e.g. rendering it
via a portal at the document root, a common React/Next.js pattern).
*/`}</CodeBox>

        <Callout type="tip">
          This is why real production codebases almost always define a small, explicit z-index scale (for
          example: base content at 0, sticky headers at 100, dropdowns at 200, modals/overlays at 300,
          toasts at 400) rather than letting individual components pick arbitrary large numbers. The scale
          does not fix stacking-context traps by itself, but it prevents the "just make it bigger" spiral
          that makes the real bug harder to spot.
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
        <SectionTitle>A Modal That Renders Behind the Navbar at a Seattle Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Seattle · Production bug report
          </div>

          <Para>
            A support ticket comes in: on the payments dashboard, clicking "Confirm Transfer" opens a
            confirmation modal — but the modal renders <em>underneath</em> the sticky top navbar, cutting
            off its top third and making the confirm button unreachable on smaller screens. The engineer
            assigned the bug pulls up the CSS and immediately bumps the modal&apos;s <code>z-index</code>{' '}
            from <code>50</code> to <code>9999</code>. It does not fix anything.
          </Para>

          <CodeBox label="The dashboard's structure, simplified">{`.dashboard-shell {
  position: relative;
}

.top-navbar {
  position: sticky;
  top: 0;
  z-index: 50;
}

.transaction-panel {
  position: relative;
  z-index: 10;
  transform: translateZ(0); /* added months earlier for a scroll-performance fix */
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999; /* bumped by the engineer — still renders behind the navbar */
}`}</CodeBox>

          <SubSubTitle>What the engineer finds after actually reading the DOM tree</SubSubTitle>

          <Para>
            The modal component is not rendered at the document root — it is rendered directly inside{' '}
            <code>.transaction-panel</code>, in the exact spot in the React tree where the "Confirm
            Transfer" button lives, rather than through a portal. And{' '}
            <code>.transaction-panel</code> has <code>transform: translateZ(0)</code>, added months
            earlier by a different engineer chasing an unrelated scroll-jank fix — exactly the kind of
            property from Part 07&apos;s list that creates a stacking context <em>without anyone
            intending it to</em>. The modal&apos;s <code>z-index: 9999</code> is real, but it is trapped
            entirely inside <code>.transaction-panel</code>&apos;s stacking context, which itself only
            has <code>z-index: 10</code> — comfortably below the navbar&apos;s <code>50</code>.
          </Para>

          <CodeBox label="The fix — render the modal at the document root, not bump the number">{`// Instead of rendering <Modal /> inline inside TransactionPanel's JSX,
// render it through a portal attached to document.body:

import { createPortal } from 'react-dom'

function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">{children}</div>,
    document.body
  )
}

/*
Now .modal-overlay is a direct child of <body> in the actual DOM,
completely outside .transaction-panel's stacking context. Its
z-index: 9999 is now compared against .top-navbar's z-index: 50 at
the SAME level, and 9999 correctly wins.
*/`}</CodeBox>

          <Para>
            The team also adds a short comment above every <code>transform</code>,{' '}
            <code>filter</code>, and <code>will-change</code> declaration in the codebase noting that it
            creates a stacking context — a small process change, but it turns "invisible side effect" into
            "documented and searchable" the next time someone chases a similar bug.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Display and Positioning</SectionTitle>

        {[
          {
            wrong: '"Setting z-index on any element controls its stacking order globally"',
            right: 'z-index only has any effect on a positioned element (non-static), and it is only ever compared against siblings within the same stacking context. Several CSS properties besides z-index create a new stacking context — opacity below 1, transform, filter, and will-change among them — silently trapping a high z-index child underneath a sibling of a lower-stacked ancestor.',
          },
          {
            wrong: '"position: absolute always positions relative to the immediate parent"',
            right: 'It positions relative to the nearest ANCESTOR with a non-static position — which may be several levels up, or may be missing entirely, in which case it falls back to the <html> element. An absolute element inside a static parent inside a relative grandparent uses the grandparent, not the parent.',
          },
          {
            wrong: '"inline-block behaves exactly like block, just without the line break"',
            right: 'It shares block\'s respect for width/height/margin/padding, but it still participates in inline/text-flow layout — including the well-known whitespace-gap bug caused by literal newlines between elements in the HTML source, something block elements never exhibit.',
          },
          {
            wrong: '"position: sticky is basically the same as position: fixed"',
            right: 'sticky behaves like relative (staying in normal flow, reserving its own space) until a scroll threshold is crossed, then behaves like fixed until its parent container scrolls out of view — at which point it unsticks. fixed is permanently removed from flow and stays pinned to the viewport (or a transformed ancestor) the entire time.',
          },
          {
            wrong: '"display: none and visibility: hidden do the same thing, just with different names"',
            right: 'display: none removes the element from layout entirely — it takes up no space, as if it were never in the document, and is invisible to screen readers. visibility: hidden keeps the element\'s space fully reserved in the layout — invisible, but everything around it still lays out exactly as if it were still there.',
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
        <SectionTitle>6 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What exactly determines the containing block of a position: absolute element?',
            a: 'The nearest ancestor whose position is anything other than static — relative, absolute, fixed, or sticky. The search walks up the ancestor chain and skips every static ancestor along the way. If no ancestor is positioned, it falls back to the initial containing block, effectively the <html> element, which is why an unconstrained absolute element appears to position itself against the whole page.',
          },
          {
            q: 'Why does setting a large z-index sometimes fail to bring an element to the front?',
            a: 'Because z-index is only compared among siblings within the same stacking context, and several CSS properties create a new stacking context implicitly — not just position + z-index, but also opacity below 1, transform, filter, and will-change, among others. If an ancestor with a lower z-index (or no explicit z-index at all) creates its own stacking context, nothing inside it can ever render above a sibling of that ancestor, no matter how high its own z-index is set.',
          },
          {
            q: 'What is the practical difference between position: relative and position: static, given that relative with no top/left/etc. looks visually identical to static?',
            a: 'Visually, yes, they look the same with no offsets applied. The real difference is that position: relative establishes a containing block for any absolutely positioned descendants, while static does not. This is why position: relative is so often applied to a parent purely to anchor an absolute child — not for any visual shift of the relative element itself.',
          },
          {
            q: 'Why does a span with an explicit width and height not visually change size?',
            a: 'A span defaults to display: inline, and inline elements ignore width, height, and vertical margin/padding entirely — their size is determined by their content and the line box they sit in. Switching the span to display: inline-block (or block) makes width/height apply as expected while inline-block additionally preserves inline flow for horizontal placement.',
          },
          {
            q: 'Explain the difference between position: fixed and position: sticky in terms of what "contains" them.',
            a: 'fixed is positioned relative to the viewport by default (or the nearest ancestor with a transform/filter/perspective/will-change, an important and often-missed exception) and stays pinned there through scrolling. sticky starts in normal flow, behaving like relative, and only switches to fixed-like behavior once the page scrolls past its defined offset threshold — and it unsticks again once its parent container scrolls out of view, which fixed never does.',
          },
          {
            q: 'Why might position: sticky silently stop working, even though the CSS looks correct?',
            a: 'Two common causes: no explicit top/bottom/left/right offset was given, which sticky requires to know its threshold — without one it behaves like plain relative. Or an ancestor has overflow set to hidden, auto, or scroll, which restricts the scrolling context sticky needs to detect the threshold within, breaking the effect even though the sticky element\'s own CSS is unchanged.',
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
        <SectionTitle>Display & Positioning Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Setting top/left on a static-positioned element and expecting it to move',
            a: 'top/right/bottom/left have zero effect unless position is set to something other than static first. Broken: .box { top: 20px; }. Fixed: .box { position: relative; top: 20px; }.',
          },
          {
            q: 'Using position: absolute without a positioned ancestor, then being confused why the element jumps to the page corner',
            a: 'Without a non-static ancestor, absolute falls back to the <html> element as its containing block. Broken: .badge sits inside a static .card and lands in the corner of the whole viewport. Fixed: add position: relative to .card so it becomes the containing block.',
          },
          {
            q: 'Trying to fix a z-index problem by making the number bigger and bigger',
            a: 'If the element is trapped inside a lower-stacked ancestor\'s stacking context, no z-index value will escape it. Broken: bumping z-index from 999 to 999999 on the trapped child. Fixed: raise the z-index of the ANCESTOR that creates the stacking context, or restructure so the element renders outside that ancestor (e.g. a portal).',
          },
          {
            q: 'Forgetting that a position: fixed header covers the content below it',
            a: 'Since fixed removes the element from flow, nothing reserves space for it. Broken: a fixed header with no compensating spacing, so the page\'s first heading renders half-hidden underneath it. Fixed: add padding-top or margin-top to the body/next element equal to the header\'s height.',
          },
          {
            q: 'Assuming inline-block eliminates the need to worry about layout at all',
            a: 'Broken: three inline-block nav items written on separate indented lines in the HTML render with unwanted gaps between them from the whitespace. Fixed: either remove the whitespace between the tags, set font-size: 0 on the parent, or — the modern answer — use display: flex on the parent instead, which has no such gap issue.',
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
            error: `An absolutely positioned element renders in the top-right corner of the entire page, not inside its intended card`,
            cause: 'No ancestor of the absolutely positioned element has a non-static position, so the search for a containing block falls all the way back to the <html> element — the initial containing block.',
            fix: 'Add position: relative to the direct parent (or the specific ancestor) you want the element positioned against. This is almost always the fix, and requires no other CSS change.',
          },
          {
            error: `A high z-index element still renders behind a lower z-index element elsewhere on the page`,
            cause: 'The high-z-index element is nested inside an ancestor that creates its own stacking context (via position + z-index, opacity below 1, transform, filter, or will-change), and that ancestor itself has a lower stacking order than the element it is losing to.',
            fix: 'Identify which ancestor is creating the unintended stacking context (check for transform/filter/opacity/will-change, not just z-index), and either raise that ancestor\'s z-index or render the element outside that ancestor entirely, e.g. via a portal.',
          },
          {
            error: `A span/a/strong with width and height set in CSS shows no visible size change in DevTools`,
            cause: 'The element is still display: inline (its default), which ignores width, height, and vertical margin/padding entirely — only horizontal spacing and content-based sizing apply to inline elements.',
            fix: 'Change display to inline-block (to keep inline flow behavior) or block (if a full line break is also wanted).',
          },
          {
            error: `position: sticky element scrolls normally and never sticks, despite top: 0 being set`,
            cause: 'An ancestor between the sticky element and the scrolling container has overflow set to hidden, auto, or scroll — this clips the scrolling context sticky depends on to detect its threshold.',
            fix: 'Remove or adjust the overflow property on the intervening ancestor, or restructure the DOM so no clipped container sits between the sticky element and its intended scroll boundary.',
          },
          {
            error: `A position: fixed element scrolls away with the page instead of staying pinned`,
            cause: 'An ancestor of the fixed element has a transform, filter, perspective, or will-change: transform property set — any of these makes that ancestor the fixed element\'s containing block instead of the viewport.',
            fix: 'Search ancestors for transform/filter/perspective/will-change and remove or relocate it, or move the fixed element outside that ancestor in the DOM (commonly via a portal to document.body).',
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
        'display: block takes full available width and forces line breaks; display: inline sizes to content, flows with text, and ignores width/height/vertical margin & padding entirely.',
        'display: inline-block combines inline flow placement with full block-level sizing — its one famous gotcha is the whitespace gap caused by literal newlines between elements in the HTML source.',
        'position: static (the default) ignores top/right/bottom/left/z-index completely. Any of relative/absolute/fixed/sticky is required before offsets do anything.',
        'An absolutely positioned element\'s containing block is the NEAREST ancestor with a non-static position, skipping every static ancestor in between — falling back to the <html> element if none exists.',
        'position: relative is most often used not for its own visual shift, but purely to give an absolutely positioned descendant a local containing block.',
        'position: fixed anchors to the viewport by default — but a transform, filter, perspective, or will-change on any ancestor silently changes its containing block instead.',
        'position: sticky requires an explicit offset (e.g. top: 0) to work, and silently breaks if any ancestor has overflow: hidden/auto/scroll.',
        'z-index only compares elements within the SAME stacking context, and many properties besides z-index create a new one — opacity below 1, transform, filter, will-change, isolation, and mix-blend-mode among them. A trapped child can never out-stack an element outside its ancestor\'s context, regardless of its own z-index value.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 22 moves from structure to visual polish — background properties and the shorthand,
          linear and radial gradients, border-radius (including elliptical corners), and stacking multiple
          box-shadows for real depth.
        </p>
        <Link href="/learn/html-css/backgrounds-borders" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 22 → Backgrounds & Borders
        </Link>
      </div>
    </LearnLayout>
  )
}
