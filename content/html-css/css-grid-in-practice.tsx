import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Grid in Practice — Real Layouts — HTML & CSS | Chaduvuko',
  description:
    'Real page layouts built with Grid — holy grail layouts, image galleries, and dashboards that would be painful with Flexbox alone.',
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

export default function CssGridInPractice() {
  return (
    <LearnLayout
      title="CSS Grid in Practice — Real Layouts"
      description="Real page layouts built with Grid — holy grail layouts, image galleries, and dashboards that would be painful with Flexbox alone."
      section="HTML & CSS — Module 26"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Planning a Layout Before Writing Any CSS" />
        <SectionTitle>Start From the Wireframe, Not the Properties</SectionTitle>

        <Para>
          The previous module covered every individual Grid property in isolation. Real layouts are
          never built by reaching for properties one at a time — they start with a rough wireframe of
          named regions, and the CSS follows directly from that drawing. This module builds three real,
          complete layouts end to end: a classic holy grail page shell, a responsive image gallery, and
          a dashboard combining several Grid techniques at once. Each one starts the same way — sketch
          the regions first, then let <code>grid-template-areas</code> (from the previous module's Part
          04) turn that sketch directly into CSS.
        </Para>

        <CodeBox label="The habit worth building before touching any Grid property">{`/*
  header  header
  sidebar main
  sidebar footer
*/
/* Write the wireframe as a comment FIRST. The grid-template-areas
   declaration you end up writing will look almost identical to it. */`}</CodeBox>

        <Para>
          This matters more than it might sound like it should. Engineers who reach straight for{' '}
          <code>grid-column</code>/<code>grid-row</code> line numbers on a full-page layout tend to
          produce CSS that works but is genuinely hard for the next person to read — a page shell built
          from named areas reads like documentation of itself, months later, without needing comments at
          all.
        </Para>

        <Callout type="info">
          Every layout in this module uses real, complete HTML alongside the CSS — not fragments. Copy
          either example directly into a blank HTML file with a linked stylesheet and it will render
          exactly as described.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Holy Grail Layout" />
        <SectionTitle>Header, Sidebar, Main Content, Footer — In About 12 Lines</SectionTitle>

        <Para>
          The "holy grail" layout is a long-standing name in CSS for a specific, extremely common page
          shape: a full-width header, a full-width footer, and a middle row split into a fixed-width
          sidebar and a flexible main content area. It earned the name because, before Grid existed, it
          was genuinely difficult to build correctly with floats or early Flexbox — getting the sidebar
          and main content to reliably match heights while the footer stayed pinned below both required
          real workarounds. With Grid, it stops being a "holy grail" and becomes a small, boring amount
          of CSS.
        </Para>

        <CodeBox label="The complete HTML">{`<body>
  <header class="site-header">Site Header</header>
  <nav class="sidebar">Sidebar Nav</nav>
  <main class="content">Main Content</main>
  <footer class="site-footer">Footer</footer>
</body>`}</CodeBox>

        <CodeBox label="The complete CSS — the entire layout">{`body {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
  margin: 0;
}

.site-header { grid-area: header;  }
.sidebar     { grid-area: sidebar; }
.content     { grid-area: content; }
.site-footer { grid-area: footer;  }`}</CodeBox>

        <Para>
          Three details worth calling out explicitly. First, <code>min-height: 100vh</code> on the grid
          container is what pins the footer to the bottom of the viewport even when the content is
          short — without it, the grid would only be as tall as its content, and a short page would show
          the footer sitting immediately below a nearly-empty content area rather than at the true
          bottom of the screen. Second, the header and footer rows both use <code>auto</code>, meaning
          they size to their own content's height rather than a hardcoded pixel value — genuinely
          important if either region's content (a banner, a multi-line footer) can vary. Third, the
          middle row is <code>1fr</code>, which is what makes it absorb all remaining vertical space and
          push the footer down, exactly like the fr behaviour from the previous module's Part 02, just
          applied to the row axis instead of columns.
        </Para>

        <Callout type="tip">
          Notice that <code>sidebar</code> and <code>content</code> automatically match heights — this
          was one of the genuinely hard parts of the pre-Grid version of this layout. Because both
          regions occupy the same grid row, they share that row's height by definition; there is no
          separate "equal height columns" technique needed, unlike with floats.
        </Callout>

        <SubTitle>Making the holy grail responsive</SubTitle>

        <Para>
          On narrow screens, a fixed 240px sidebar next to main content is rarely the right layout — the
          standard mobile pattern collapses the sidebar to a full-width row above the content instead.
          Because the entire layout lives in one <code>grid-template-areas</code> declaration, the
          responsive version is just a second declaration of the same property inside a media query —
          no restructuring of the HTML, and no separate mobile-specific markup.
        </Para>

        <CodeBox label="Collapsing to a single column below 768px">{`@media (max-width: 768px) {
  body {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "content"
      "footer";
  }
}
/* Same HTML, same grid-area assignments on each element — only the
   CONTAINER's track definitions and area drawing changed. */`}</CodeBox>

        <Para>
          This is the single biggest practical advantage <code>grid-template-areas</code> has for
          responsive work specifically: reordering, or entirely reshaping, a layout at a breakpoint
          rarely requires touching the HTML or the individual items' rules at all — only the container's
          area drawing changes. Media queries are covered in full depth in the module right after the
          next one in this track.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — A Responsive Image Gallery" />
        <SectionTitle>auto-fill / auto-fit + minmax() — A Gallery That Wraps Itself</SectionTitle>

        <Para>
          The previous module introduced <code>repeat(auto-fill, minmax(min, 1fr))</code> as the pattern
          for a self-wrapping grid. Here it gets built out into a genuinely complete, real image
          gallery — square thumbnails, consistent gaps, and correct wrapping behaviour at any viewport
          width, without a single media query.
        </Para>

        <CodeBox label="The complete HTML">{`<div class="gallery">
  <figure class="gallery-item"><img src="/photos/01.jpg" alt="Sunset over the harbor"></figure>
  <figure class="gallery-item"><img src="/photos/02.jpg" alt="Downtown skyline at dusk"></figure>
  <figure class="gallery-item"><img src="/photos/03.jpg" alt="Mountain trail in autumn"></figure>
  <!-- ...as many more <figure> items as the gallery actually has -->
</div>`}</CodeBox>

        <CodeBox label="The complete CSS">{`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}

.gallery-item {
  margin: 0;
  aspect-ratio: 1 / 1;   /* forces a perfect square, regardless of the image's real dimensions */
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;     /* fills the square without distorting the image's aspect ratio */
  display: block;
}`}</CodeBox>

        <Para>
          <code>aspect-ratio</code> combined with <code>object-fit: cover</code> is what makes every
          thumbnail a uniform square even though the source photos have completely different original
          dimensions — the image is cropped to fill the square, never stretched. This pairing is
          extremely common in real gallery and card-grid UIs, not specific to Grid, but it is worth
          calling out here because it is what makes the example actually look like a gallery rather than
          a grid of mismatched rectangles.
        </Para>

        <SubTitle>auto-fill vs auto-fit — the difference that only shows up with too few items</SubTitle>

        <Para>
          Both keywords fit as many <code>minmax()</code>-sized columns as will comfortably fit the
          container's width, and both wrap to a new row automatically as the container narrows. They are
          identical in almost every practical case — the difference only becomes visible when the number
          of actual items is smaller than the number of columns that would fit.
        </Para>

        <CodeBox label="auto-fill — empty tracks are preserved">{`.gallery {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
/* Say the container is wide enough for 5 columns, but there are only 3 items.
   auto-fill still RESERVES 5 column tracks — the 2 empty ones just render
   as blank space, and the 3 real items stay pinned to 1fr each, NOT
   stretching to fill the row. */`}</CodeBox>

        <CodeBox label="auto-fit — empty tracks collapse to zero">{`.gallery {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
/* Same scenario — 3 items, room for 5 columns.
   auto-fit COLLAPSES the 2 empty tracks to 0 width, and the 1fr on the
   remaining 3 items means they stretch to fill the freed-up space. */`}</CodeBox>

        <Callout type="warning">
          For a photo gallery or card grid where items should visually fill the row even when there
          aren't quite enough of them, <code>auto-fit</code> is almost always the correct choice —
          <code>auto-fill</code>'s reserved-but-empty tracks tend to look like a layout bug (uneven,
          oddly left-aligned content) rather than an intentional design. Reach for{' '}
          <code>auto-fill</code> specifically when you want items to stay a fixed size and NOT stretch,
          even with room to spare — a strip of fixed-size thumbnail previews is a reasonable case for
          that.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — A Real Dashboard Layout" />
        <SectionTitle>Combining Named Areas, Nested Grids, and Irregular Spans</SectionTitle>

        <Para>
          A dashboard is a genuinely good test of whether Grid has actually clicked, because it usually
          needs several techniques from the previous module working together at once: a page-level shell
          (named areas, exactly like Part 02), a widget area with cards of genuinely different sizes
          (line-based spanning), and individual widgets that are themselves grids or flex containers
          internally (nested layout contexts).
        </Para>

        <CodeBox label="The dashboard HTML">{`<body class="dashboard">
  <header class="db-header">Analytics Dashboard</header>
  <nav class="db-nav">Nav</nav>
  <main class="db-widgets">
    <section class="widget widget-large">Revenue Trend</section>
    <section class="widget">Active Users</section>
    <section class="widget">Conversion Rate</section>
    <section class="widget widget-wide">Top Referral Sources</section>
    <section class="widget">Server Uptime</section>
  </main>
</body>`}</CodeBox>

        <CodeBox label="The page shell — named areas, exactly like the holy grail layout">{`.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "nav    widgets";
  min-height: 100vh;
}

.db-header  { grid-area: header;  }
.db-nav     { grid-area: nav;     }
.db-widgets { grid-area: widgets; }`}</CodeBox>

        <CodeBox label="The widget area — its own nested grid, with irregular spans">{`.db-widgets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  gap: 20px;
  padding: 20px;
}

.widget-large {
  grid-column: span 2;
  grid-row: span 2;      /* a 2x2 "featured" widget among the standard 1x1 ones */
}

.widget-wide {
  grid-column: span 2;   /* wide but not tall — spans 2 columns, standard 1 row */
}

.widget {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
}`}</CodeBox>

        <Para>
          <code>.db-widgets</code> is both a grid item (of the outer page shell) and a grid container (of
          the widgets inside it) — nesting grids like this is completely normal and is exactly how real
          dashboards are structured, rather than trying to express the entire page as one flat grid.
          Each widget's span (<code>span 2</code>, <code>span 2 / span 2</code>) is set individually,
          which is precisely the line-based placement technique from the previous module's Part 05,
          applied here to build a genuinely irregular, magazine-style grid rather than a uniform table of
          equal cells.
        </Para>

        <SubTitle>What each individual widget does internally has nothing to do with Grid</SubTitle>

        <Para>
          A single widget's own internal layout — say, a metric card with a label at the top, a large
          number in the middle, and a small trend indicator pinned to the bottom-right — is a completely
          separate layout decision from how the widget is placed on the page. This is a genuinely
          important idea that the next module in this track is built entirely around: it is extremely
          common, and correct, to use Grid for the page-level and widget-grid structure shown here, while
          using Flexbox for what happens <em>inside</em> each individual widget.
        </Para>

        <CodeBox label="A peek at what's coming — Flexbox INSIDE a Grid-placed widget">{`.widget-large {
  grid-column: span 2;
  grid-row: span 2;
  display: flex;             /* the widget's OWN internal layout is Flexbox, not Grid */
  flex-direction: column;
  justify-content: space-between;
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Debugging a Real Layout Visually" />
        <SectionTitle>The Browser DevTools Grid Inspector</SectionTitle>

        <Para>
          Every layout in this module is genuinely difficult to get pixel-perfect on the first attempt
          purely by reading CSS — real Grid debugging happens visually, in the browser. Chrome, Firefox,
          and Safari all ship a dedicated Grid inspector that overlays line numbers, track sizes, and
          named areas directly on the rendered page.
        </Para>

        <CodeBox label="Turning it on in Chrome DevTools">{`1. Open DevTools (Cmd+Option+I on Mac, F12 on Windows/Linux)
2. Select the Elements panel
3. Find an element with display: grid applied
4. Click the small "grid" badge next to it in the Elements tree
   — this toggles a colored overlay directly on the page showing
   every line number, track boundary, and (if used) named area label`}</CodeBox>

        <Para>
          Firefox's implementation is widely considered the most complete of the three — its Grid
          inspector panel includes a toggle specifically for displaying{' '}
          <code>grid-template-areas</code> names directly on the overlay, and an option to extend grid
          lines infinitely across the full page, which makes it dramatically easier to see whether two
          separate grid containers happen to align.
        </Para>

        <Callout type="tip">
          When a layout looks subtly wrong — an item in the wrong cell, an implicit row a different
          height than expected — turning on the Grid overlay first, before touching the CSS, answers the
          question "is this a track-sizing problem or a placement problem" in seconds, rather than
          guessing from reading the stylesheet alone.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Real Estate Listings Gallery at an Austin Proptech Startup</SectionTitle>

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
            Scenario — Real estate proptech startup, Austin · Listings page redesign
          </div>

          <Para>
            A front-end engineer at an Austin proptech startup is asked to rebuild the property listings
            grid. The old version used <code>display: inline-block</code> cards with a manually
            calculated <code>width: 32%</code> and margin gaps between them, hardcoded for exactly three
            columns — and it silently broke on smaller laptop screens, wrapping mid-row and leaving an
            ugly gap where the third card should have been, because 3×32% plus two sets of margin no
            longer fit.
          </Para>

          <CodeBox label="The old listings grid">{`.listings {
  display: block;
}
.listing-card {
  display: inline-block;
  width: 32%;
  margin-right: 2%;
  margin-bottom: 24px;
  vertical-align: top;
}
.listing-card:nth-child(3n) {
  margin-right: 0;  /* manually zeroing margin every 3rd card */
}
/* Hardcoded for exactly 3 columns. Breaks the moment the viewport
   is too narrow for 3 cards but not narrow enough to trigger a
   redesign — a genuinely common, easy-to-miss dead zone. */`}</CodeBox>

          <SubSubTitle>The rebuild</SubSubTitle>

          <Para>
            The engineer replaces it with exactly the gallery pattern from Part 03 of this module —{' '}
            <code>auto-fit</code> and <code>minmax()</code> — with the minimum column width tuned to the
            actual listing card's comfortable minimum size rather than an arbitrary percentage.
          </Para>

          <CodeBox label="The rebuilt listings grid">{`.listings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
/* No hardcoded column count, no manual margin math, no :nth-child
   exceptions. The number of columns is now a NATURAL CONSEQUENCE
   of the viewport width and the card's minimum comfortable size —
   not a number chosen once and forgotten. */`}</CodeBox>

          <Para>
            On a wide desktop monitor it renders four columns; on a laptop, three; on a tablet, two — all
            without a single media query, and without the dead-zone gap the old percentage-based version
            produced. When the design team later asks for a slightly wider card to fit a new "verified
            listing" badge, the fix is changing one number — <code>280px</code> to <code>320px</code> —
            with the column count adjusting itself automatically at every screen size, instead of
            re-deriving a new percentage and a new <code>:nth-child</code> rule by hand.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Real-World Grid Layouts</SectionTitle>

        {[
          {
            wrong: '"A holy grail layout needs min-height: 100vh on the FOOTER to stay at the bottom"',
            right: 'The min-height belongs on the GRID CONTAINER (the page shell), not the footer. It is the container filling the full viewport height, with its middle row set to 1fr, that pushes the footer down — the footer itself just needs its row to be auto-sized to its own content.',
          },
          {
            wrong: '"auto-fill and auto-fit are basically the same thing and it doesn\'t matter which you pick"',
            right: 'They behave identically when there are enough items to fill every possible column — the difference only appears with fewer items than would fill a row. auto-fill leaves the extra tracks empty but reserved; auto-fit collapses them to zero and lets the real items stretch to fill the space. Picking the wrong one produces a gallery that looks oddly left-aligned instead of filling its row.',
          },
          {
            wrong: '"A dashboard-style layout with irregularly sized cards needs a completely different technique than a simple page shell"',
            right: 'It is the same grid-template-areas and line-based placement techniques from the previous module, just nested — a page-level shell built from named areas, containing a widget area that is itself a separate grid using span for irregular card sizes.',
          },
          {
            wrong: '"Once you\'re using Grid for a layout, every part of it — down to a single card\'s internals — should also be Grid"',
            right: 'Using Grid for page-level structure and Flexbox for the internal layout of an individual component (like a card with a label, a value, and a trend indicator) inside a grid cell is extremely common and often the more natural fit — this exact combination is the entire subject of the next module.',
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

      {/* ── Part 08 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Walk through how you would build a classic header/sidebar/content/footer layout with CSS Grid.',
            a: 'Set display: grid on the page container, define grid-template-columns for a fixed sidebar width plus a flexible 1fr content column, define grid-template-rows as auto 1fr auto so the header and footer size to their content while the middle row absorbs remaining space, and draw the layout with grid-template-areas. Set min-height: 100vh on the container so the footer stays pinned to the bottom of the viewport even on short pages, and assign each element its grid-area.',
          },
          {
            q: 'Why is grid-template-areas particularly well suited to making a layout responsive?',
            a: 'Reshaping a layout at a breakpoint — for example, collapsing a sidebar to a full-width row above the content on mobile — only requires redeclaring grid-template-columns and grid-template-areas on the container inside a media query. The HTML and each element\'s individual grid-area assignment never need to change, since the area names stay the same; only where the container draws them does.',
          },
          {
            q: 'How would you build a photo gallery that automatically adjusts its column count to the viewport width, without media queries?',
            a: 'grid-template-columns: repeat(auto-fit, minmax(minWidth, 1fr)) on the gallery container. It fits as many columns of at least minWidth as will comfortably fit the current container width, and auto-fit collapses any leftover empty tracks so the real items stretch to fill the row — no explicit breakpoints are needed because the column count is a natural consequence of available width divided by the minimum card size.',
          },
          {
            q: 'How would you build a dashboard where one widget needs to be visually larger than the others in the same grid?',
            a: 'Define the widget grid with a fixed column count and grid-auto-rows for consistent row height, then give the larger widget grid-column: span 2 and/or grid-row: span 2 to make it occupy a 2x1, 1x2, or 2x2 area among the otherwise uniform 1x1 cells — this is the line-based placement span keyword applied to build an intentionally irregular grid.',
          },
          {
            q: 'Is it correct to use Grid for a component\'s internal layout as well as the page structure around it, or should you pick one system for the whole page?',
            a: 'It is correct, and extremely common, to mix them: Grid for page-level and section-level structure (since that is genuinely two-dimensional — rows and columns of distinct regions), and Flexbox for the internal layout of individual components placed inside those grid cells, where content is typically laid out along a single axis. Nesting a Flexbox container inside a Grid item is completely normal.',
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
        <SectionTitle>Real-Layout Grid Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            broken: `body {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}
/* min-height never set — body only grows as tall as its content */`,
            fixed: `body {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
  margin: 0;
}`,
            note: 'Without min-height: 100vh on the grid container, a short page leaves the footer sitting immediately below the content instead of pinned to the bottom of the viewport — the classic "sticky footer" behaviour requires the container to actually fill the screen height.',
          },
          {
            broken: `.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* hardcoded column count */
}
/* Looks fine on the design mockup's screen size, breaks (either
   too cramped or with awkward empty space) at every other width */`,
            fixed: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}`,
            note: 'A hardcoded column count only looks correct at the specific viewport width it was designed against. auto-fit with minmax() makes the column count a natural consequence of available space, correct at every width without a single media query.',
          },
          {
            broken: `.widget-large {
  grid-column: span 2;
  grid-row: span 2;
}
/* grid-auto-rows never set on the container — implicit rows size
   to their content, so the "2x2" widget doesn't actually look
   twice as tall as a normal widget */`,
            fixed: `.db-widgets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;  /* every implicit row is a fixed, predictable height */
}
.widget-large {
  grid-column: span 2;
  grid-row: span 2;       /* now genuinely spans 2 real 160px rows */
}`,
            note: 'span 2 on grid-row only means something visually consistent if the rows it is spanning actually have a defined height — without grid-auto-rows, implicit rows size to content, and a "2-row" span can end up barely taller than a 1-row widget.',
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
        <SectionTitle>Errors and Rendering Bugs You Will Hit Building Real Layouts — And Exactly Why</SectionTitle>

        {[
          {
            error: `A "sticky" footer sits in the middle of a short page instead of at the bottom`,
            cause: 'The grid container has no min-height: 100vh (or equivalent), so the container — and therefore the grid — is only as tall as its actual content, leaving no leftover space for the 1fr middle row to absorb and push the footer down.',
            fix: 'Add min-height: 100vh to the grid container (usually body or a top-level wrapper), and remove any default margin on body that could add unwanted scroll space.',
          },
          {
            error: `An image gallery leaves a large, uneven empty gap on the right side of the last row`,
            cause: 'grid-template-columns uses auto-fill instead of auto-fit with too few items to fill a complete row — auto-fill reserves the extra empty tracks rather than collapsing them, so the real items do not stretch to fill the available width.',
            fix: 'Switch to repeat(auto-fit, minmax(min, 1fr)) if the intent is for existing items to fill the row when there aren\'t enough to complete it — this is the correct default for most photo/card galleries.',
          },
          {
            error: `A dashboard widget with grid-column: span 2 renders at half the expected width`,
            cause: 'The number of explicit columns defined on the container is smaller than assumed — span 2 in a 2-column grid takes up the ENTIRE row, not half of it, which can look identical to a bug depending on the design.',
            fix: 'Confirm the actual column count set in grid-template-columns on the container matches what the span values assume — use the browser\'s Grid inspector (Part 05) to see the real track boundaries directly on the page.',
          },
          {
            error: `object-fit: cover appears to have no effect on a gallery image`,
            cause: 'The img element has no explicit width and height (or an aspect-ratio) set on it — object-fit only controls HOW an image fills its box; it does nothing if the box itself is still sized to the image\'s natural dimensions.',
            fix: 'Set width: 100%; height: 100% on the image (with the sizing coming from a parent that has a fixed size or aspect-ratio), so there is an actual box for object-fit: cover to fill and crop within.',
          },
          {
            error: `A nested grid (a widget area inside a page shell) doesn\'t line up with the outer grid\'s columns`,
            cause: 'Two separate display: grid containers, nested inside one another, define their own independent tracks by default — there is no automatic alignment between an outer grid\'s columns and an inner grid\'s columns unless explicitly designed to match.',
            fix: 'Either explicitly match the track definitions between the two grids, or use CSS subgrid (grid-template-columns: subgrid on the inner grid) so it inherits the outer grid\'s track sizing directly — subgrid has strong modern browser support but is worth checking against your project\'s specific browser support requirements before relying on it.',
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
        'Sketch a layout as named regions before writing CSS — grid-template-areas turns that sketch directly into working code, and the CSS ends up reading like documentation of the wireframe.',
        'The holy grail layout (header/sidebar/content/footer) needs min-height: 100vh on the grid container and a 1fr middle row to keep the footer pinned to the bottom of short pages.',
        'grid-template-areas makes responsive reshaping cheap — a media query redeclaring the container\'s columns and area drawing can restructure the entire page without touching the HTML or any individual element\'s rules.',
        'repeat(auto-fit, minmax(min, 1fr)) is the standard pattern for a self-wrapping gallery or card grid — auto-fit collapses empty tracks so existing items stretch to fill the row; auto-fill preserves them as reserved-but-empty.',
        'A dashboard combines named-area page structure with line-based span placement for irregularly sized widgets — and it is completely normal for those widgets to nest their own grid or flex layout internally.',
        'Grid for page/section structure and Flexbox for a component\'s internal layout is a standard, correct combination — not a compromise, and the exact subject of the next module.',
        'The browser DevTools Grid inspector (Chrome, Firefox, Safari all have one) overlays real line numbers, track sizes, and area names directly on the page — it is the fastest way to debug a layout that looks subtly wrong.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Grid and Flexbox now both fully in hand — the next module builds the actual decision framework
          for choosing between them, and shows the pattern this module previewed: using both together in
          the same page.
        </p>
        <Link href="/learn/html-css/flexbox-vs-grid" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next Module → Flexbox vs Grid — When to Use Each
        </Link>
      </div>
    </LearnLayout>
  )
}
