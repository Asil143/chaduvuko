import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Grid — The Complete Guide — HTML & CSS | Chaduvuko',
  description:
    'Two-dimensional layout done right — grid-template-columns/rows, grid areas, and the mental model that makes Grid click.',
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

export default function CssGridCompleteGuide() {
  return (
    <LearnLayout
      title="CSS Grid — The Complete Guide"
      description="Two-dimensional layout done right — grid-template-columns/rows, grid areas, and the mental model that makes Grid click."
      section="HTML & CSS — Module 25"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Two-Dimensional Mental Model" />
        <SectionTitle>display: grid — Thinking in Rows AND Columns at Once</SectionTitle>

        <Para>
          Every layout tool you have used so far in this track — normal document flow, floats,
          Flexbox — is fundamentally <strong>one-dimensional</strong>. Flexbox lays items out along a
          single axis (a row, or a column) and lets the cross axis take care of itself, item by item.
          CSS Grid is different in one specific, load-bearing way: it lets you define rows{' '}
          <em>and</em> columns <em>at the same time</em>, as a single coordinate system, and then place
          content anywhere inside that grid — including deliberately out of source order. That is the
          entire idea Grid exists to solve. If you have ever tried to build a page layout in Flexbox and
          found yourself fighting to get a sidebar, header, and footer to all line up against a shared
          set of column and row boundaries, that fight is exactly what Grid was built to end.
        </Para>

        <CodeBox label="Turning an element into a grid container">{`.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  gap: 16px;
}`}</CodeBox>

        <Para>
          Setting <code>display: grid</code> on an element makes it a <strong>grid container</strong> —
          every direct child automatically becomes a <strong>grid item</strong>, without needing any
          property set on the children themselves (unlike Flexbox, where you at least conceptually
          think about each child's flex behaviour). <code>grid-template-columns</code> and{' '}
          <code>grid-template-rows</code> define the actual track sizes: the layout above creates three
          columns (200px, a flexible middle column, 200px) and three rows (80px, a flexible middle row,
          60px) — a skeleton that reads almost exactly like a hand-drawn wireframe.
        </Para>

        <CodeBox label="A minimal three-column layout">{`<div class="layout">
  <header>Header</header>
  <main>Main content</main>
  <aside>Sidebar</aside>
</div>`}</CodeBox>

        <Para>
          By default, grid items are placed automatically into the grid, one per cell, in source order,
          filling row by row — the same instinctive "just drop them in" behaviour you get from normal
          block flow, except now flowing across a real two-dimensional grid instead of a single
          top-to-bottom column. Explicit placement (Part 05) is what lets you break out of that
          automatic order deliberately.
        </Para>

        <Callout type="info">
          <strong>gap</strong> (formerly written as the vendor-specific <code>grid-gap</code>, which is
          now just a legacy alias) puts real space between grid tracks without adding margin to
          individual items — meaning there is no lingering space at the outer edges of the grid the way
          margin-based spacing between Flexbox items always leaves behind. You can also set{' '}
          <code>row-gap</code> and <code>column-gap</code> independently if the spacing needs differ
          between the two axes.
        </Callout>

        <SubTitle>inline-grid — the rarely-needed sibling</SubTitle>

        <Para>
          Just as Flexbox has <code>inline-flex</code>, Grid has <code>display: inline-grid</code> — the
          grid container itself behaves like an inline-level box in the surrounding layout, while
          everything inside it still lays out as a grid. This is genuinely rare in practice; the vast
          majority of real Grid usage is <code>display: grid</code> on a block-level container.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The fr Unit" />
        <SectionTitle>fr — The Unit That Only Exists for Grid</SectionTitle>

        <Para>
          <code>fr</code> stands for "fraction" — a unit that represents a share of the{' '}
          <strong>leftover space</strong> in the grid container, after every fixed-size track (pixels,
          rems, percentages) has already been subtracted. It is the single idea that makes Grid track
          sizing feel effortless once it clicks, and genuinely confusing before it does.
        </Para>

        <CodeBox label="Equal thirds — the simplest possible fr layout">{`.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
/* Three equal columns, each getting exactly one third of the available width.
   There is no leftover space to distribute unevenly — all three "shares" are 1. */`}</CodeBox>

        <CodeBox label="Mixing fixed tracks with fr — the pattern you will use constantly">{`.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  /* The sidebar is a fixed 250px, no matter the container width.
     The 1fr column gets EVERYTHING that's left over — not "the rest divided by 1",
     but literally "100% of whatever remains after 250px is subtracted." */
}`}</CodeBox>

        <Para>
          The genuinely important detail: <code>fr</code> distributes space{' '}
          <strong>proportionally among fr tracks only</strong>, after fixed tracks are already
          accounted for. <code>grid-template-columns: 1fr 2fr 1fr</code> does not mean "25%, 50%, 25% of
          the container" in the way percentages would — it means "whatever space is left after gaps and
          fixed tracks, split it 1 part : 2 parts : 1 part." The middle column ends up exactly twice as
          wide as each outer one, but the actual pixel values shift as the container resizes.
        </Para>

        <CodeBox label="Why fr beats percentage-based columns for this specific job">{`/* Percentages: technically works, but gap has to be manually subtracted
   from somewhere, or the columns overflow the container. */
.old-way {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  gap: 16px; /* this gap is NOT accounted for in the 33.33% figures — overflow risk */
}

/* fr: gap is subtracted automatically before the fr units are calculated.
   No manual math, no overflow. */
.grid-way {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}`}</CodeBox>

        <Callout type="tip">
          A genuinely common real pattern: <code>grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)</code>{' '}
          instead of a bare <code>1fr 1fr</code>. A bare <code>fr</code> track has an implicit minimum
          width based on its content (<code>min-width: auto</code>), which means a long unbreakable
          string or a wide image inside a grid item can force that track wider than its fair fr share —
          wrapping it in <code>minmax(0, 1fr)</code> overrides that implicit minimum and lets the track
          actually shrink to its fr share. This exact fix — "my grid column won't shrink even though I
          gave it 1fr" — is one of the most searched CSS Grid problems that exists.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — repeat() and minmax()" />
        <SectionTitle>repeat() and minmax() — Writing Less, Describing More</SectionTitle>

        <Para>
          Writing out <code>1fr 1fr 1fr 1fr 1fr 1fr</code> for a six-column grid works, but it does not
          scale, and it does not communicate intent. <code>repeat()</code> lets you express "N tracks of
          this size" directly.
        </Para>

        <CodeBox label="repeat() — the same six columns, expressed properly">{`.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* Identical to: 1fr 1fr 1fr 1fr 1fr 1fr */
}

.grid-mixed {
  display: grid;
  grid-template-columns: 200px repeat(3, 1fr) 100px;
  /* repeat() can appear alongside other track definitions, not just alone */
}`}</CodeBox>

        <Para>
          <code>minmax(min, max)</code> defines a track that is never smaller than its minimum and
          never larger than its maximum — genuinely flexible sizing within real, explicit bounds, rather
          than either a fixed size or unlimited growth.
        </Para>

        <CodeBox label="minmax() — a column that flexes between two real limits">{`.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column is at least 200px, but grows to share the leftover space
     equally (1fr) if the container is wide enough to give it more than 200px. */
}`}</CodeBox>

        <Para>
          Combined, <code>repeat()</code> and <code>minmax()</code> produce the single most useful line
          in all of CSS Grid — the pattern that builds a genuinely responsive grid{' '}
          <strong>with zero media queries</strong>.
        </Para>

        <CodeBox label="The auto-fill + minmax() combo — a self-wrapping responsive grid">{`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
/* Reads as: "Fit as many 220px-minimum columns as will comfortably fit,
   then let each one grow to fill any leftover space." As the viewport
   shrinks, columns wrap down automatically — no breakpoint needed. */`}</CodeBox>

        <Para>
          This deserves its own full treatment — the difference between <code>auto-fill</code> and{' '}
          <code>auto-fit</code>, and a real image gallery built on exactly this pattern, is covered in
          depth in the next module, CSS Grid in Practice. For now, the important thing to internalise is
          that <code>repeat()</code> accepts <code>auto-fill</code>/<code>auto-fit</code> as its count
          argument instead of a fixed number — that is what makes the column count itself responsive,
          not just the column widths.
        </Para>

        <Callout type="warning">
          <code>minmax(200px, 1fr)</code> is very different from <code>minmax(1fr, 200px)</code> — the
          arguments are not interchangeable. The first argument must always be the smaller bound and
          the second the larger; reversing them (a <code>fr</code> unit as the minimum, a pixel value as
          the maximum) is invalid and the browser drops the entire declaration.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — grid-template-areas" />
        <SectionTitle>grid-template-areas — Drawing Your Layout in the CSS Itself</SectionTitle>

        <Para>
          <code>grid-template-areas</code> is genuinely unlike anything else in CSS: you name regions of
          the grid, then draw the layout as an actual ASCII-art-style grid of those names directly in
          your stylesheet. It reads like a wireframe because it effectively is one.
        </Para>

        <CodeBox label="Naming and drawing a layout">{`.layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 70px 1fr 60px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
}

header  { grid-area: header;  }
main    { grid-area: main;    }
footer  { grid-area: footer;  }
aside   { grid-area: sidebar; }`}</CodeBox>

        <Para>
          Each child is assigned to a named region with <code>grid-area</code>, and the container's{' '}
          <code>grid-template-areas</code> string literally draws where each region sits — the sidebar
          spans all three rows in the example above simply because <code>"sidebar"</code> appears in
          every row of the drawing. There is no separate row/column-span property needed for this case;
          the shape of the ASCII drawing itself is the spanning logic.
        </Para>

        <Callout type="tip">
          <strong>Every row in a grid-template-areas string must have the same number of
          cells, and every named area must form a single, unbroken rectangle.</strong> You cannot draw
          an L-shape or a region with a gap in the middle — if a name appears in a non-rectangular
          arrangement, the declaration is invalid and the browser rejects the entire property. Use{' '}
          <code>.</code> (a period) for a cell that is deliberately empty — an intentional gap in the
          grid that no item occupies.
        </Callout>

        <CodeBox label="Using . for an intentionally empty cell">{`.layout {
  grid-template-columns: 220px 1fr 1fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar .      widget"
    "sidebar footer footer";
}
/* The middle cell in row 2 is deliberately empty — no item is placed there. */`}</CodeBox>

        <SubTitle>Why this earns its place over grid-column/grid-row for real page layouts</SubTitle>

        <Para>
          You could achieve an identical result with numeric line placement (Part 05) — but{' '}
          <code>grid-template-areas</code> is dramatically more readable for anyone maintaining the
          layout later, since the CSS visually mirrors the actual page structure. This is why it is the
          dominant pattern for full-page, semantically distinct layouts (header/nav/main/aside/footer),
          while numeric line placement tends to be reached for inside smaller, more repetitive
          components like card grids, where naming every cell would be excessive ceremony for little
          benefit.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Line-Based Placement" />
        <SectionTitle>grid-column / grid-row — Placing Items by Line Number</SectionTitle>

        <Para>
          Every grid has numbered <strong>grid lines</strong> — not tracks, the lines{' '}
          <em>between</em> tracks. A 3-column grid has 4 vertical grid lines (numbered 1 through 4,
          left to right); a 3-row grid has 4 horizontal grid lines. <code>grid-column</code> and{' '}
          <code>grid-row</code> place an item by specifying which lines it starts and ends at — this is
          the mechanism that lets an item span multiple tracks, or be placed somewhere other than the
          browser's automatic next-available cell.
        </Para>

        <CodeBox label="Placing and spanning items by line number">{`.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 100px);
  gap: 12px;
}

.hero {
  grid-column: 1 / 3;   /* start at line 1, end at line 3 — spans 2 columns */
  grid-row: 1 / 2;
}

.wide-banner {
  grid-column: 1 / -1;  /* -1 always means "the last line" — spans the FULL width,
                            regardless of how many columns the grid actually has */
}`}</CodeBox>

        <Para>
          <code>grid-column: 1 / 3</code> is shorthand for <code>grid-column-start: 1;</code> and{' '}
          <code>grid-column-end: 3;</code> — the same relationship <code>margin</code> has to{' '}
          <code>margin-top/right/bottom/left</code>. The end line is exclusive of nothing in particular
          — it is just "the line the item's edge touches," so an item spanning from line 1 to line 3
          covers exactly two column tracks (the space between lines 1–2 and 2–3).
        </Para>

        <CodeBox label="The span keyword — an alternative to specifying both lines">{`.card {
  grid-column: span 2;   /* "start wherever the auto-placement algorithm puts me,
                             but occupy 2 columns from there" — no explicit start line needed */
}`}</CodeBox>

        <Para>
          <code>span N</code> is genuinely the more common real-world pattern for grids where items
          still flow automatically but occasionally need to be wider — a "featured" card in an
          otherwise uniform product grid, for example — since it does not require calculating exact
          line numbers by hand, which becomes fragile the moment the column count changes.
        </Para>

        <Callout type="info">
          Negative line numbers count from the end of the explicit grid, regardless of how many tracks
          it has: <code>-1</code> is always the last line, <code>-2</code> is one before that, and so
          on. This is what makes <code>grid-column: 1 / -1</code> a genuinely robust "always span the
          full width of the grid" pattern — it works correctly even if the number of columns changes
          later, unlike hardcoding an end line number that assumes a specific column count.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Implicit vs Explicit Grid" />
        <SectionTitle>The Explicit Grid You Define, and the Implicit Grid the Browser Invents</SectionTitle>

        <Para>
          The <strong>explicit grid</strong> is exactly the tracks you defined with{' '}
          <code>grid-template-columns</code> and <code>grid-template-rows</code>. The{' '}
          <strong>implicit grid</strong> is what the browser silently creates when content needs more
          rows or columns than you explicitly defined — a detail that catches nearly every developer
          off guard the first time it happens.
        </Para>

        <CodeBox label="More items than defined rows — the implicit grid kicks in">{`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;   /* only 2 rows explicitly defined */
}
/* 9 items, 3 columns → 3 rows are needed, but only 2 were defined.
   The browser creates a 3rd row IMPLICITLY, and — critically — that
   implicit row does NOT get the 100px height from grid-template-rows.
   By default, it sizes to fit its content instead. */`}</CodeBox>

        <Para>
          This is the single most common source of "why is my last row a different height than the
          others" bugs in real Grid layouts. The fix is <code>grid-auto-rows</code> (and its column
          equivalent, <code>grid-auto-columns</code>), which sets the size for any track the browser
          creates implicitly — the counterpart to <code>grid-template-rows</code>, but for rows you did
          not explicitly name.
        </Para>

        <CodeBox label="Controlling the size of implicitly created tracks">{`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  grid-auto-rows: 100px;   /* any implicit row created beyond the two explicit
                               ones is ALSO 100px, matching the rest of the grid */
}`}</CodeBox>

        <SubTitle>grid-auto-flow — controlling how items fill the implicit grid</SubTitle>

        <Para>
          By default (<code>grid-auto-flow: row</code>), auto-placed items fill row by row, creating new
          rows as needed. Setting it to <code>column</code> flips that — items fill column by column
          instead, creating new columns as needed (which requires <code>grid-auto-columns</code> to size
          those new columns sensibly).
        </Para>

        <CodeBox label="grid-auto-flow: column — a genuinely different fill direction">{`.grid {
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-auto-flow: column;
  grid-auto-columns: 150px;
}
/* Items fill DOWN each column first, then move to the next column —
   the opposite of the default row-first behaviour. */`}</CodeBox>

        <Callout type="tip">
          <code>grid-auto-flow: dense</code> is a lesser-known modifier worth knowing: it tells the
          auto-placement algorithm to backfill earlier empty cells with later items that happen to fit,
          rather than strictly preserving source order. It is genuinely useful for masonry-style grids
          with items of mixed spans, where leaving gaps would otherwise look broken — but it comes at
          the direct cost of visual order no longer matching source (DOM) order, which can be a real
          accessibility concern for keyboard and screen-reader navigation. Use it deliberately, not by
          default.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Aligning Content Within the Grid" />
        <SectionTitle>justify-items, align-items, and Their content Counterparts</SectionTitle>

        <Para>
          Grid alignment properties split cleanly along the same two axes the rest of Grid is built on,
          and along a second distinction that trips people up at first: aligning{' '}
          <strong>items within their own cell</strong> versus aligning{' '}
          <strong>the whole grid within its container</strong>, when the grid itself is smaller than the
          container.
        </Para>

        <CodeBox label="Aligning items within their individual cells">{`.grid {
  display: grid;
  justify-items: center;  /* horizontal alignment of each item inside its own cell */
  align-items: center;    /* vertical alignment of each item inside its own cell */
}

/* Shorthand for both at once: */
.grid {
  place-items: center;   /* align-items then justify-items, in that order */
}`}</CodeBox>

        <CodeBox label="Aligning the grid itself within its container">{`.grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);  /* a grid narrower than its container */
  justify-content: center;  /* centers the WHOLE grid horizontally in the container */
  align-content: center;    /* centers the WHOLE grid vertically in the container */
}`}</CodeBox>

        <Para>
          The naming mirrors Flexbox closely on purpose — <code>justify-*</code> is always the inline
          (typically horizontal) axis and <code>align-*</code> is always the block (typically vertical)
          axis in both layout modes. The <code>-items</code> vs <code>-content</code> distinction is the
          part that is genuinely specific to Grid: <code>-items</code> properties move things{' '}
          <em>inside</em> their own cell; <code>-content</code> properties move the entire set of tracks
          <em>as a group</em> within the container, and only have a visible effect when the defined
          tracks do not already fill the container completely.
        </Para>

        <Para>
          A single item can also override the container's <code>justify-items</code>/{' '}
          <code>align-items</code> for itself specifically, using <code>justify-self</code> and{' '}
          <code>align-self</code> — exactly the same "container sets the default, an individual item can
          opt out" relationship <code>align-self</code> already has in Flexbox.
        </Para>

        <CodeBox label="One item overriding the container default">{`.grid { justify-items: start; }

.featured-card {
  justify-self: center;   /* this one item centers itself, ignoring the container's "start" */
}`}</CodeBox>
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
        <SectionTitle>A Design-System Rebuild at a Portland Analytics Company</SectionTitle>

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
            Scenario — B2B analytics SaaS, Portland · Dashboard shell rebuild
          </div>

          <Para>
            A front-end engineer at a Portland-based analytics company inherits a dashboard shell built
            years earlier from floated divs and a handful of absolutely-positioned overrides for the
            sidebar. Every time a designer requests a layout tweak — widening the sidebar, adding a
            secondary top bar for filters — the change requires touching three or four unrelated CSS
            rules, and something else regressed almost every time.
          </Para>

          <CodeBox label="The old shell, roughly reconstructed">{`.shell {
  position: relative;
}
.sidebar {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 240px;
}
.topbar {
  margin-left: 240px;
  height: 60px;
}
.content {
  margin-left: 240px;
  padding-top: 60px;
  min-height: 100vh;
}
.footer {
  margin-left: 240px;
}
/* Every region's position depends on hardcoded knowledge of every OTHER
   region's size, duplicated across four separate rules. Change the sidebar
   width once, and it has to be updated in three unrelated places. */`}</CodeBox>

          <SubSubTitle>The rebuild</SubSubTitle>

          <Para>
            The engineer replaces the entire shell with a single <code>grid-template-areas</code>{' '}
            declaration — the exact pattern from Part 04 of this module. The sidebar width now lives in{' '}
            <strong>exactly one place</strong>.
          </Para>

          <CodeBox label="The rebuilt shell">{`.shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr auto;
  grid-template-areas:
    "sidebar topbar"
    "sidebar content"
    "sidebar footer";
  min-height: 100vh;
}

.sidebar { grid-area: sidebar; }
.topbar  { grid-area: topbar;  }
.content { grid-area: content; }
.footer  { grid-area: footer;  }`}</CodeBox>

          <Para>
            Resizing the sidebar is now a single-number change to{' '}
            <code>grid-template-columns</code>, with zero risk of a stray region silently overlapping
            another — every region's boundary is defined by the grid itself, not by each region
            independently guessing the sidebar's width. When a request comes in a week later to add a
            collapsible sidebar state, the fix is a single class toggle that changes{' '}
            <code>grid-template-columns</code> from <code>240px 1fr</code> to <code>60px 1fr</code>,
            with a <code>transition</code> — no repositioning logic needed anywhere else, because
            everything downstream of the sidebar already reflows automatically off the grid definition.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Five Misconceptions About CSS Grid</SectionTitle>

        {[
          {
            wrong: '"Grid replaced Flexbox — you should just use Grid for everything now"',
            right: 'Grid and Flexbox solve different-shaped problems, not competing versions of the same problem. Flexbox is genuinely better suited to one-dimensional content (a navbar, a button row, a card\'s internal content) where items should size based on their content. Grid is built for two-dimensional layout with explicit tracks. The next two modules in this track cover exactly when to reach for each.',
          },
          {
            wrong: '"fr is just a synonym for percentage"',
            right: 'fr distributes only the LEFTOVER space, after fixed-size tracks and gaps are already subtracted — percentages divide the full container width, gap and all, which is exactly why percentage-based columns combined with gap are prone to overflow in a way fr columns are not.',
          },
          {
            wrong: '"grid-template-areas can express any layout shape you can draw"',
            right: 'Every named area must form a single unbroken rectangle. L-shapes, regions with holes, and non-rectangular arrangements are invalid and the entire declaration is silently rejected by the browser — you would need to fall back to numeric grid-column/grid-row placement for genuinely irregular shapes.',
          },
          {
            wrong: '"If I define grid-template-rows, every row in my layout will be that size"',
            right: 'grid-template-rows only sizes the EXPLICIT rows you defined. Any row the browser creates implicitly, because your content needed more rows than you declared, sizes to its content by default instead — unless you also set grid-auto-rows to control implicit track sizing, exactly the bug covered in Part 06.',
          },
          {
            wrong: '"span 2 and grid-column: 1 / 3 always do the same thing"',
            right: 'span 2 means "occupy 2 tracks starting from wherever auto-placement puts me" — it does not pin the item to specific line numbers. grid-column: 1 / 3 pins the item to an exact position regardless of where auto-placement would otherwise have put it. They only produce identical results when the item would have auto-placed at line 1 anyway.',
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
            q: 'What does the fr unit actually represent, and how is it different from a percentage?',
            a: 'fr represents a share of the leftover space in a grid container, calculated AFTER fixed-size tracks and gap are already subtracted. A percentage always divides the full container size, gap included, which is why combining percentages with gap risks overflow unless you manually account for the gap — fr handles that subtraction automatically.',
          },
          {
            q: 'Explain the difference between the explicit grid and the implicit grid.',
            a: 'The explicit grid is exactly what you defined with grid-template-columns/grid-template-rows. The implicit grid is made up of extra tracks the browser silently creates when placed content needs more rows or columns than were explicitly defined. Implicit tracks size to their content by default; grid-auto-rows and grid-auto-columns let you control that sizing instead of leaving it to content-based defaults.',
          },
          {
            q: 'Why would you choose grid-template-areas over numeric grid-column/grid-row placement?',
            a: 'grid-template-areas lets you literally draw the layout shape in the CSS, which is dramatically more readable and maintainable for a full page layout with semantically distinct regions. Numeric line placement is more appropriate for smaller, repetitive components (like a card grid with an occasional wide item) where naming every region would be more ceremony than it is worth.',
          },
          {
            q: 'What is the difference between auto-fill and auto-fit inside repeat(), and why does it matter with a small number of items?',
            a: 'Both fit as many tracks of the given minmax() size as will comfortably fit the container. auto-fill preserves empty tracks as real (collapsed but present) tracks if there are fewer items than would fill a row, which can leave visible empty space when combined with certain alignment. auto-fit collapses those empty tracks to zero width, letting the actual content tracks stretch to fill the row instead. The difference is invisible with enough items to fill every row, and very visible with too few.',
          },
          {
            q: 'What is the difference between justify-items and justify-content on a grid container?',
            a: 'justify-items controls how EACH item aligns within its own individual cell. justify-content controls how the entire set of grid tracks aligns within the container as a group, and only has a visible effect when the defined tracks do not already fill the container completely — for example, a grid of fixed-width columns inside a wider container.',
          },
          {
            q: 'Why might minmax(0, 1fr) be used instead of a bare 1fr for grid columns holding text or images?',
            a: 'A bare fr track still has an implicit minimum width equal to the size of its content (min-width: auto), so a long unbreakable string or a wide image can force that column wider than its fair fr share, breaking the intended proportions. minmax(0, 1fr) explicitly overrides that implicit minimum to zero, letting the track actually shrink down to its fr share and forcing the content to wrap or scroll within it instead.',
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
        <SectionTitle>CSS Grid Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            broken: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.item { width: 400px; } /* fighting the grid track size directly */`,
            fixed: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
/* Don't set a fixed width on a grid ITEM to control its track size —
   size the TRACK itself in grid-template-columns instead. */`,
            note: 'Setting width directly on a grid item to control its size fights the grid instead of using it — the track sizing (grid-template-columns) is the correct place to control column width, not per-item CSS.',
          },
          {
            broken: `.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
}
main { grid-area: content; } /* typo — "content" was never defined */`,
            fixed: `.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
}
main { grid-area: main; } /* matches the name used in grid-template-areas exactly */`,
            note: 'grid-area must match a name that actually appears in grid-template-areas, character for character. A mismatched name is not an error the browser reports loudly — the item simply falls back to auto-placement, silently landing somewhere unexpected.',
          },
          {
            broken: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.item {
  grid-column: 1 / 4;  /* meant to span 3 columns... */
  grid-row: 1;
}`,
            fixed: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.item {
  grid-column: 1 / 4;  /* correct — a 3-column grid has 4 lines (1,2,3,4),
                           so spanning all 3 columns really is "1 / 4" */
}`,
            note: 'This one is actually correct — it is included because it is the single most common off-by-one confusion with Grid: a grid with N columns has N+1 lines. Beginners frequently write grid-column: 1 / 3 expecting to span 3 columns, when that actually spans only 2.',
          },
          {
            broken: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);  /* no minmax() at all */
}`,
            fixed: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}`,
            note: 'repeat(auto-fill, 220px) fits as many fixed 220px columns as possible, but leaves leftover space unfilled at the end of each row instead of letting the last row of columns stretch — minmax(220px, 1fr) is what actually makes columns grow to fill the remaining space.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <CodeBox label="Before">{item.broken}</CodeBox>
            <CodeBox label="After">{item.fixed}</CodeBox>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.note}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Grid — And Exactly Why</SectionTitle>

        {[
          {
            error: `An item silently doesn't appear where grid-area says it should — no console error at all`,
            cause: 'The grid-area name on the item does not exactly match a name used in the container\'s grid-template-areas string (a typo, a casing mismatch, or a leftover name from a refactor). Grid does not raise a console error for this — the item just falls back to automatic placement.',
            fix: 'Double check the exact spelling of the name in both grid-area on the item and grid-template-areas on the container. Browser DevTools\' Grid inspector (available in Chrome, Firefox, and Safari) will visually overlay the defined areas and immediately reveal the mismatch.',
          },
          {
            error: `The entire grid-template-areas declaration appears to do nothing`,
            cause: 'One row in the ASCII-art string has a different number of cells than the others, or a named region does not form a single unbroken rectangle — both make the whole declaration invalid, and CSS drops invalid declarations entirely rather than partially applying them.',
            fix: 'Check that every quoted row has the same number of space-separated names, and that each name\'s cells form one contiguous rectangular block with no gaps or L-shapes. Use "." for intentionally empty cells rather than omitting them.',
          },
          {
            error: `A grid column refuses to shrink below its content\'s width, even though it is set to 1fr`,
            cause: 'fr tracks have an implicit minimum size of min-width: auto, meaning the track will not shrink smaller than its largest piece of unbreakable content (a long word, a wide image) — the 1fr only governs how the LEFTOVER space is divided, not the absolute floor.',
            fix: 'Set an explicit minimum with minmax(0, 1fr) instead of a bare 1fr, which overrides the implicit content-based minimum and lets the track shrink freely.',
          },
          {
            error: `The last row of a grid is a visibly different height than the rest`,
            cause: 'More items were placed than the explicitly defined grid-template-rows accounts for, so the browser created an implicit row for the overflow — and implicit rows size to their content by default, ignoring grid-template-rows entirely.',
            fix: 'Set grid-auto-rows to the same size as your explicit rows, so any implicitly created row matches the rest of the grid.',
          },
          {
            error: `Console warning: "Invalid property value" (on a minmax() declaration)`,
            cause: 'The arguments to minmax() were given in the wrong order — a maximum value first, a minimum value second (e.g. minmax(1fr, 200px)), which is not a valid range.',
            fix: 'Always put the smaller/minimum bound first: minmax(200px, 1fr), not minmax(1fr, 200px).',
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
        'CSS Grid defines rows and columns simultaneously as a single coordinate system — the defining difference from every one-dimensional layout tool you have used so far, including Flexbox.',
        'fr distributes leftover space AFTER fixed tracks and gap are subtracted — it is not a percentage, and gap does not need to be manually accounted for the way it does with percentage-based tracks.',
        'repeat(auto-fill, minmax(min, 1fr)) builds a genuinely responsive grid with zero media queries — it fits as many minimum-sized columns as comfortably fit, then lets them grow to fill any leftover space.',
        'grid-template-areas lets you literally draw your layout in CSS — every named region must form a single unbroken rectangle, and every row of the ASCII string needs the same cell count, or the whole declaration is invalid.',
        'grid-column/grid-row place items by line number, not track number — an N-column grid has N+1 lines. span N is usually the more robust choice over exact line numbers for items that should still mostly auto-place.',
        'The implicit grid is created automatically whenever content needs more tracks than you explicitly defined — those implicit tracks size to their content unless grid-auto-rows/grid-auto-columns say otherwise.',
        'justify-items/align-items (or place-items) align content WITHIN each cell; justify-content/align-content align the entire grid AS A GROUP within its container — the two only look identical when the grid exactly fills its container.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Now that the full Grid vocabulary is in place, the next module puts every piece of it to work
          on real layouts — a holy grail page shell, a responsive image gallery, and a genuinely
          non-trivial dashboard.
        </p>
        <Link href="/learn/html-css/css-grid-in-practice" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next Module → CSS Grid in Practice — Real Layouts
        </Link>
      </div>
    </LearnLayout>
  )
}
