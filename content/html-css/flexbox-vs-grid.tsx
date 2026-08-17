import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Flexbox vs Grid — When to Use Each — HTML & CSS | Chaduvuko',
  description:
    'The decision every layout starts with — one-dimensional vs two-dimensional thinking, and when to combine both in the same page.',
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

export default function FlexboxVsGrid() {
  return (
    <LearnLayout
      title="Flexbox vs Grid — When to Use Each"
      description="The decision every layout starts with — one-dimensional vs two-dimensional thinking, and when to combine both in the same page."
      section="HTML & CSS — Module 27"
      readTime="25 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Actual Decision Axis" />
        <SectionTitle>One-Dimensional vs Two-Dimensional — Not &quot;Old vs New&quot;</SectionTitle>

        <Para>
          The most common mistake engineers make when choosing between Flexbox and Grid is treating it
          as a question of which one is "better" or "more modern" — Grid arrived after Flexbox in the
          CSS specification timeline, which quietly leads people to assume it must be the upgrade. That
          framing is wrong, and it produces genuinely worse layouts. The real decision axis has nothing
          to do with age: it is whether the content you are laying out is fundamentally{' '}
          <strong>one-dimensional</strong> or <strong>two-dimensional</strong>.
        </Para>

        <Para>
          A one-dimensional layout is a single row or a single column of items, where you care about how
          they distribute themselves along <em>one</em> axis — and you are usually fine letting each
          item's own content determine its size. A two-dimensional layout is a genuine grid of rows{' '}
          <em>and</em> columns simultaneously, where you want content to line up against a shared set of
          both row boundaries and column boundaries at once. Flexbox was built for the first kind.
          Grid was built for the second. Neither is a strictly more powerful version of the other — they
          model different shapes of problem.
        </Para>

        <CodeBox label="The test to ask yourself before writing any layout CSS">{`Do I actually care about alignment across BOTH rows and columns
at the same time?

  NO  → it's a single row or column of items → Flexbox
  YES → items need to line up on a shared grid in two directions → Grid`}</CodeBox>

        <Callout type="info">
          A genuinely useful sanity check: if you find yourself reaching for Flexbox and then wrapping
          it in a second, nested Flexbox just to get a second axis of alignment to line up correctly
          across multiple rows, that is usually a strong signal the layout was two-dimensional all
          along, and Grid would have expressed it directly with far less nesting.
        </Callout>

        <SubTitle>Why this distinction is more useful than a feature checklist</SubTitle>

        <Para>
          Tutorials that compare Flexbox and Grid feature-by-feature (both have <code>gap</code>, both
          have alignment properties, both can wrap) tend to make the two look nearly interchangeable,
          which is exactly backwards from how the decision should actually be made in practice. The
          feature overlap is real, but it is also mostly beside the point — the decision that actually
          matters is made before any property is written, at the moment you decide what <em>shape</em>{' '}
          the content naturally is.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — When Flexbox Wins" />
        <SectionTitle>Concrete Scenarios Where Flexbox Is the Obviously Correct Choice</SectionTitle>

        <Para>
          These are not "Flexbox can technically also do this" cases — they are cases where Flexbox is
          the more natural, less code, more maintainable choice, because the content is genuinely
          one-dimensional and should size itself based on its own content rather than fixed tracks.
        </Para>

        <CodeBox label="A navbar — items along a single row, distributed with space-between">{`.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}
/* Logo on the left, nav links in the middle, a "Sign in" button on the
   right — a single row, each item sized to its own content. Building
   this with Grid would mean pre-defining column widths for content
   (a logo, a variable number of nav links) that has no natural fixed width. */`}</CodeBox>

        <CodeBox label="A button group / toolbar — items that should size to their own label">{`.toolbar {
  display: flex;
  gap: 8px;
}
.toolbar button {
  padding: 8px 16px;
  white-space: nowrap;
}
/* "Save" and "Save and Publish" naturally need different widths.
   Flexbox gives each button exactly the width its label needs — a Grid
   with a fixed column-per-button would either clip the longer label
   or waste space around the shorter one. */`}</CodeBox>

        <CodeBox label="Centering a single element — Flexbox's most common real-world use of all">{`.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
/* Perfectly centers one child both ways. Grid can do this too (place-items:
   center), and either is genuinely fine here — but centering a single item
   is about as one-dimensional a problem as CSS layout has. */`}</CodeBox>

        <Para>
          The common thread across all three: the number of items is either variable or the exact sizes
          are meant to come from the content itself, not from a predefined structure. That is the
          signature of a Flexbox problem.
        </Para>

        <SubTitle>flex-wrap — where Flexbox starts to look two-dimensional, and why it still isn&apos;t</SubTitle>

        <Para>
          <code>flex-wrap: wrap</code> lets flex items spill onto multiple lines, which can visually look
          like a grid — but it is important to understand this is still fundamentally one-dimensional
          layout logic, just repeated across several lines independently. Each wrapped line manages its
          own sizing separately; items in one row do <strong>not</strong> line up with items in the row
          above unless every row happens to contain identically-sized items by coincidence.
        </Para>

        <CodeBox label="Why wrapped Flexbox rows don't align like Grid columns do">{`.flex-wrap-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
/* Items with DIFFERENT content lengths on row 1 will size that row's
   items independently from row 2's items — there is no shared column
   grid tying "item 2 on row 1" to "item 2 on row 2." If your design
   actually needs that alignment, that need itself is the signal you
   want Grid, not wrapped Flexbox. */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — When Grid Wins" />
        <SectionTitle>Concrete Scenarios Where Grid Is the Obviously Correct Choice</SectionTitle>

        <Para>
          Grid wins precisely where the previous section's Flexbox cases stop applying: when alignment
          needs to hold across both rows and columns simultaneously, or when the layout is defined by an
          explicit structure rather than by the content's own natural size.
        </Para>

        <CodeBox label="A page shell — header, sidebar, content, footer">{`body {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
}
/* This is genuinely two-dimensional: the sidebar's height must match
   the content area's height (same row), while ALSO having an
   independent, fixed column width from it. Flexbox has no direct way
   to express "these two siblings share a row's height but not a
   column's width" without extra wrapper elements and workarounds. */`}</CodeBox>

        <CodeBox label="A card grid where cards must align in both directions">{`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
/* Every card in column 2 lines up with the LEFT EDGE of every other
   card in column 2, across every row — a genuine two-dimensional
   alignment guarantee that wrapped Flexbox does not provide. */`}</CodeBox>

        <CodeBox label="A dashboard with irregularly sized widgets">{`.widgets {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  gap: 20px;
}
.widget-featured {
  grid-column: span 2;
  grid-row: span 2;
}
/* A widget that spans 2 columns AND 2 rows, sitting flush against its
   neighbors on all sides, is a two-dimensional placement problem by
   definition — this has no clean Flexbox equivalent at all. */`}</CodeBox>

        <Para>
          The pattern across all three: something needs to line up along <em>two</em> independent axes
          at once — a shared row height combined with an independent column width, or a card grid where
          both rows and columns stay aligned, or a widget that spans real, defined space in both
          directions. That two-axis alignment requirement is the unambiguous signal for Grid.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Using Both Together" />
        <SectionTitle>Grid for the Page Shell, Flexbox for the Component Internals</SectionTitle>

        <Para>
          Real production pages very rarely pick one system exclusively — the dominant real-world pattern
          is <strong>Grid for the overall page structure, and Flexbox for the internals of individual
          components placed inside that structure.</strong> This is not a compromise or a sign of
          indecision; it is the correct application of the one-dimensional/two-dimensional distinction
          at two different scales of the same page.
        </Para>

        <CodeBox label="A complete example — Grid shell, Flexbox cards inside it">{`<div class="page">
  <header class="page-header">Site Header</header>
  <main class="product-grid">
    <article class="product-card">...</article>
    <article class="product-card">...</article>
    <article class="product-card">...</article>
  </main>
</div>`}</CodeBox>

        <CodeBox label="The CSS — two layout systems, each doing the job it's actually good at">{`.page {
  display: grid;                 /* GRID — page-level, two-dimensional structure */
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.product-grid {
  display: grid;                 /* GRID — a genuine two-dimensional card grid */
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  padding: 24px;
}

.product-card {
  display: flex;                 /* FLEXBOX — one-dimensional internal stacking */
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.product-card .price-row {
  display: flex;                 /* FLEXBOX — a single row: price on the left,
                                     an "Add to cart" button on the right */
  justify-content: space-between;
  align-items: center;
}`}</CodeBox>

        <Para>
          Notice the reasoning at each level. The outer <code>.page</code> is Grid because the header and
          main content area are a genuine two-dimensional structure. The <code>.product-grid</code> is
          Grid because cards need to align in both rows and columns as their count grows. But{' '}
          <code>.product-card</code> itself switches to Flexbox, because its internal content — an image,
          a title, a description, a price row — is a single vertical stack, one-dimensional by nature,
          where each piece should size to its own content rather than snap to a predefined track. And{' '}
          <code>.price-row</code>, nested one level deeper still, is Flexbox again for the same reason: a
          single row, two items, distributed with <code>space-between</code>.
        </Para>

        <Callout type="tip">
          <strong>A practical rule of thumb worth internalising:</strong> as you move from the outermost
          page structure down toward individual pieces of UI, layout very often naturally shifts from
          two-dimensional to one-dimensional. Page shells and card/gallery grids tend to be Grid;
          individual components, toolbars, and rows of controls tend to be Flexbox. This is a strong
          default, not an absolute law — but if a layout decision feels genuinely ambiguous, it is worth
          checking whether you are looking at page-level structure or component-level content, since
          that alone often resolves the ambiguity.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Content-Out vs Layout-In" />
        <SectionTitle>A Second Mental Model, for the Genuinely Ambiguous Cases</SectionTitle>

        <Para>
          The one-dimensional/two-dimensional test resolves most real decisions, but a smaller set of
          layouts sit genuinely on the boundary — a simple 3-column row of equal-width cards, for
          instance, could reasonably be built either way. For those cases, a second, complementary
          question helps: <strong>should the layout be driven by the content's own size ("content-out"),
          or by explicit tracks you define regardless of content ("layout-in")?</strong>
        </Para>

        <CodeBox label="Content-out — Flexbox, letting each item claim what it needs">{`.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
/* Each tag is exactly as wide as its own label. The LAYOUT is a
   consequence of the content — there is no predefined tag width
   anywhere in this CSS. */`}</CodeBox>

        <CodeBox label="Layout-in — Grid, defining the structure first, independent of content">{`.stat-tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
/* Four EQUAL columns, defined explicitly, regardless of whether one
   tile's number happens to be longer than another's. The CONTENT
   fits into a predefined structure, not the other way around. */`}</CodeBox>

        <Para>
          This framing is why <code>flex-grow</code>/<code>flex-shrink</code>/<code>flex-basis</code>{' '}
          exist as a trio in the first place — they are Flexbox's mechanism for negotiating exactly how
          much an item should be allowed to deviate from its own natural, content-driven size. Grid has
          no real equivalent negotiation, because Grid tracks are not meant to be primarily content-driven
          in the first place — <code>1fr</code>, <code>minmax()</code>, and fixed pixel tracks are all
          ways of defining the structure up front, with content simply filling whatever space that
          structure allocates.
        </Para>

        <Callout type="warning">
          Neither mental model — one-dimensional/two-dimensional, or content-out/layout-in — is meant to
          be applied mechanically without judgment. They are both heuristics for reasoning quickly about
          a decision that, in truly ambiguous cases, sometimes comes down to which one the rest of the
          codebase already uses for similar components. Consistency with existing patterns in a real
          codebase is a genuinely legitimate tiebreaker when the technical case is close.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Overlap Cases" />
        <SectionTitle>Layouts Where Either Genuinely Works — And How to Pick Anyway</SectionTitle>

        <Para>
          A small set of common layouts sit close enough to the boundary that both systems produce a
          reasonable result. Rather than treat these as a coin flip, it is worth having a specific,
          repeatable tiebreaker for each.
        </Para>

        <CodeBox label="Equal-width columns, fixed count — both are genuinely fine">{`/* Flexbox version */
.columns { display: flex; gap: 20px; }
.columns > * { flex: 1; }

/* Grid version */
.columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }`}</CodeBox>

        <Para>
          Tiebreaker: if the number of columns is genuinely fixed and will not change, either is fine —
          Grid's version arguably documents the intent ("exactly 3 equal tracks") slightly more directly.
          If there is any chance the column count needs to become responsive later (2 columns on tablet,
          1 on mobile), lean Grid now, since <code>grid-template-columns</code> is the property you would
          be redeclaring in a media query anyway — starting there avoids a rewrite from Flexbox to Grid
          later.
        </Para>

        <CodeBox label="Centering content — both are genuinely fine">{`/* Flexbox */
.center { display: flex; align-items: center; justify-content: center; }

/* Grid */
.center { display: grid; place-items: center; }`}</CodeBox>

        <Para>
          Tiebreaker: purely a matter of what is already the dominant layout system in the surrounding
          code. If the parent element is already <code>display: flex</code> for other reasons, do not
          introduce Grid just to center one child — use <code>margin: auto</code> on the child instead,
          which works inside an existing flex container without changing the container's display type at
          all.
        </Para>

        <Callout type="tip">
          When genuinely torn between the two for an ambiguous case, a fast practical check: does this
          layout need to eventually support items being placed out of source order, or spanning multiple
          tracks? If there's any realistic chance of that, start with Grid — retrofitting that behaviour
          into an existing Flexbox layout later is a real rewrite, while Grid supports it natively from
          the start.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Maintainability Over Time" />
        <SectionTitle>Why the Right Choice Up Front Saves a Real Rewrite Later</SectionTitle>

        <Para>
          The cost of picking the wrong system rarely shows up on day one — a Flexbox layout used where
          Grid belonged, or vice versa, usually still renders correctly at first. The cost shows up
          later, when a requirement changes in a direction the wrong system does not naturally support,
          and the fix becomes a genuine restructuring rather than a small edit.
        </Para>

        <CodeBox label="A Flexbox layout that starts fighting its own tool as requirements grow">{`.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.product-card {
  flex: 1 1 240px;
}
/* Works fine at first. Then a request comes in: "make the 3rd product
   in every row of 4 span 2 columns, to feature it." Flexbox has no
   direct way to say "this item spans 2 tracks and every other item
   still lines up in a shared column grid" — because there IS no
   shared column grid in Flexbox, by design. */`}</CodeBox>

        <CodeBox label="The same requirement, trivial in Grid, because it was already the right tool">{`.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}
.product-card.featured {
  grid-column: span 2;   /* one line — no restructuring needed */
}`}</CodeBox>

        <Para>
          This is not a claim that Grid should be the default for every card list "just in case" — that
          would be over-engineering against a requirement that may never arrive. It is a specific
          argument for the earlier heuristic: if a layout involves items that visually need to line up in
          a shared row-and-column structure (even if every item is currently the same size), that
          structural relationship is real today, whether or not any single item currently spans more than
          one track. Picking Grid there is choosing the tool that already matches the actual shape of the
          problem, not preemptively solving a hypothetical future one.
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
        <SectionTitle>A Layout Review at a Chicago Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Chicago · Pull request review, transaction history page
          </div>

          <Para>
            A mid-level engineer at a Chicago fintech startup submits a pull request for a new
            transaction history page: a filter toolbar at the top, and a list of transaction rows below
            it, each row showing a merchant name, date, category tag, and amount. The entire page —
            toolbar and every transaction row — is built with nested Flexbox.
          </Para>

          <CodeBox label="The original submission — nested Flexbox throughout">{`.transaction-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}
.transaction-row .merchant-info {
  display: flex;
  flex-direction: column;
}
/* Each row: merchant name + date stacked on the left (flex column),
   category tag and amount spaced out on the right. Works — until
   the reviewer opens it next to 50 real transaction rows. */`}</CodeBox>

          <SubSubTitle>What the reviewer flags</SubSubTitle>

          <Para>
            With real data, merchant names vary wildly in length — "Amazon" versus "Whole Foods Market
            #4471" — and because each row's internal Flexbox negotiates its own column split
            independently, the category tag and amount end up at a different horizontal position on
            almost every row. Nothing lines up. The reviewer's comment is exactly the distinction from
            Part 03: this is not one-dimensional content, it is a table-shaped problem — every row needs
            its merchant name, date, category, and amount to align in shared columns across{' '}
            <em>all</em> rows, which is precisely the two-axis alignment guarantee Flexbox does not
            provide and Grid does.
          </Para>

          <CodeBox label="The revised version — one grid, not fifty independent flex negotiations">{`.transaction-list {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;   /* merchant, date, category, amount */
  row-gap: 4px;
}

.transaction-row {
  display: contents;   /* each row's own elements become direct grid items,
                           so they align against the SAME shared columns */
}

.transaction-row .merchant  { grid-column: 1; }
.transaction-row .date      { grid-column: 2; }
.transaction-row .category  { grid-column: 3; }
.transaction-row .amount    { grid-column: 4; text-align: right; }`}</CodeBox>

          <Para>
            Every merchant name now sits in the exact same column across every row, regardless of length
            — the layout is defined once, by the grid, instead of negotiated independently fifty times.
            This exact category of bug — misaligned "table-like" rows built from independent Flexbox
            containers instead of one shared Grid — is one of the most common real code review findings
            on list-heavy interfaces like transaction histories, admin tables, and pricing pages.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Choosing Between Flexbox and Grid</SectionTitle>

        {[
          {
            wrong: '"Grid is newer, so it should be the default choice for any new layout"',
            right: 'Age has nothing to do with which is correct for a given layout — they solve differently-shaped problems. A navbar or a button toolbar is genuinely simpler and more maintainable as Flexbox; forcing it into Grid means predefining track sizes for content that should size itself.',
          },
          {
            wrong: '"Once flex-wrap makes items go onto multiple lines, that\'s basically the same as a Grid"',
            right: 'Wrapped Flexbox rows size independently of each other — there is no shared column structure tying an item on row 1 to the item directly below it on row 2, unless every row happens to contain identically sized content. If items genuinely need to align in a shared column grid across multiple rows, that need is itself the signal for actual Grid.',
          },
          {
            wrong: '"A real page should pick one layout system and use it everywhere for consistency"',
            right: 'The dominant real-world pattern is the opposite — Grid for page-level and grid-shaped structure, Flexbox for the internal one-dimensional layout of individual components, nested inside each other on the same page. This is standard practice, not an inconsistency to eliminate.',
          },
          {
            wrong: '"Table-like rows of data (name, date, amount, etc.) are simple enough that independent Flexbox per row is fine"',
            right: 'Independent Flexbox containers per row negotiate their own internal spacing separately, with no guarantee that columns align across rows once real, variable-length content is involved — exactly the bug shown in the code review above. Rows that need to align in shared columns should be built as one Grid, not many independent Flexbox rows.',
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
            q: 'What is the actual difference between Flexbox and Grid, in terms of the problem each was designed to solve?',
            a: 'Flexbox is a one-dimensional layout model — it distributes items along a single axis (a row or a column), and each item can size itself based on its own content. Grid is a two-dimensional layout model — it defines rows and columns simultaneously as one coordinate system, letting content align against a shared structure in both directions at once. The decision between them should be based on the actual shape of the content, not which one is newer.',
          },
          {
            q: 'Give a concrete example of a layout where Flexbox is clearly the better choice, and explain why.',
            a: 'A navbar with a logo, a variable number of nav links, and a sign-in button. It is a single row where each item should size to its own content rather than snap to predefined tracks, and the number of nav links can change without requiring the layout structure itself to change — exactly the profile of a one-dimensional, content-driven layout that Flexbox is built for.',
          },
          {
            q: 'Give a concrete example of a layout where Grid is clearly the better choice, and explain why.',
            a: 'A page shell with a header, sidebar, main content, and footer, where the sidebar and main content need to share a row\'s height while also having independent, fixed column widths. This requires alignment across two axes at once — a genuinely two-dimensional structural relationship that Flexbox has no direct way to express without extra wrapper elements.',
          },
          {
            q: 'Is it correct or a mistake to use both Flexbox and Grid on the same page?',
            a: 'It is correct, and it is the dominant real-world pattern: Grid for page-level and grid-shaped structure (page shells, card/gallery grids, dashboards), and Flexbox nested inside individual grid items for their internal, one-dimensional content layout (a card\'s image-title-description-price stack, a toolbar row). Restricting a whole page to one system usually produces more workarounds, not more consistency.',
          },
          {
            q: 'You have a list of "table-like" rows (name, date, category, amount) each built as an independent flex container. What problem does this cause, and how would you fix it?',
            a: 'Each row negotiates its internal column split independently, so with real, variable-length content, columns end up misaligned across rows — the category and amount can land in different horizontal positions row to row. The fix is to make it a single Grid with defined columns shared across all rows (commonly using display: contents on each row wrapper so its children become direct grid items), so every row aligns against the exact same column structure instead of negotiating its own.',
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
        <SectionTitle>Flexbox/Grid Decision Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            broken: `.page-shell {
  display: flex;
  flex-direction: column;
}
.body-row {
  display: flex;
}
.sidebar { width: 240px; }
.content { flex: 1; }
/* Two nested Flexbox containers, standing in for what is
   actually a simple 2-column, 3-row Grid structure */`,
            fixed: `.page-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}`,
            note: 'A page shell built from nested Flexbox containers usually means the layout was actually two-dimensional from the start — one Grid declaration replaces multiple nested flex containers and is easier to reshape at breakpoints later.',
          },
          {
            broken: `.card-grid {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 240px;   /* manually fixed width, to fake grid-like columns */
  margin: 10px;   /* margin, not gap — extra edge space around the grid */
}`,
            fixed: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}`,
            note: 'Faking a grid with fixed-width, wrapped Flexbox items and margin loses two things Grid gives natively: no unwanted edge spacing (gap, not margin), and genuine column alignment across rows rather than an accidental one.',
          },
          {
            broken: `.toolbar {
  display: grid;
  grid-template-columns: repeat(5, auto);  /* Grid, for 5 buttons that just need to sit in a row */
}`,
            fixed: `.toolbar {
  display: flex;
  gap: 8px;
}`,
            note: 'A row of buttons with no cross-row alignment requirement does not need Grid\'s two-dimensional machinery — Flexbox expresses the same one-dimensional row with less setup and no need to predefine a column count that changes whenever a button is added or removed.',
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
        <SectionTitle>Rendering Bugs From Picking the Wrong Layout System — And Exactly Why</SectionTitle>

        {[
          {
            error: `Items in a wrapped Flexbox layout don't line up in columns, even though they visually look like a grid`,
            cause: 'flex-wrap creates independent rows that each size their own items separately — there is no shared column structure across rows unless every row\'s content happens to be identically sized by coincidence.',
            fix: 'If column alignment across rows is actually required, switch the container to display: grid with defined grid-template-columns instead of relying on wrapped Flexbox to approximate a grid.',
          },
          {
            error: `A "table-like" list of rows has misaligned columns once real (variable-length) content is used, despite looking fine with placeholder/lorem-ipsum data`,
            cause: 'Each row is its own independent Flexbox container, negotiating space-between or similar spacing on its own — with real data of varying lengths, that negotiation produces a different result per row, since nothing ties one row\'s column boundaries to another\'s.',
            fix: 'Restructure as a single Grid with shared grid-template-columns across all rows (commonly using display: contents on each row wrapper), exactly as shown in the Real World example in this module.',
          },
          {
            error: `A Grid item with grid-column: span 2 unexpectedly wraps to the next row instead of sitting flush with its neighbor`,
            cause: 'There is not enough remaining space in the CURRENT row for a 2-column span to fit — Grid\'s auto-placement algorithm moves an item that does not fit to the next row rather than overflowing the current one, by default.',
            fix: 'Check the total column count against the sum of spans already placed in that row, or use grid-auto-flow: dense if backfilling earlier gaps with a later item is acceptable for the specific layout.',
          },
          {
            error: `A Flexbox item set to flex: 1 doesn\'t actually grow to fill the row`,
            cause: 'A sibling in the same flex container has a fixed width and flex-shrink: 0, or the container itself does not have enough overall space, or (a common variant) the item\'s parent is not the direct display: flex container at all, due to an extra intermediate wrapper.',
            fix: 'Confirm the item with flex: 1 is a DIRECT child of the flex container, and check whether a sibling\'s fixed width plus its own is genuinely consuming all the available space before flex-grow has anything left to distribute.',
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
        'The decision axis is one-dimensional vs two-dimensional content, not which system is newer — Flexbox and Grid solve differently-shaped problems, and neither is a strictly better version of the other.',
        'Flexbox wins when items should size to their own content along a single row or column — navbars, toolbars, button groups, and centering a single element are all one-dimensional by nature.',
        'Grid wins whenever alignment needs to hold across both rows and columns at once — page shells, card/gallery grids, and dashboards with spanning widgets all require that two-axis guarantee.',
        'flex-wrap makes Flexbox items span multiple lines, but each line still sizes independently — it is not a substitute for real Grid column alignment across rows.',
        'The dominant real-world pattern combines both on the same page: Grid for page-level and grid-shaped structure, Flexbox nested inside for individual components\' internal one-dimensional layout.',
        'A useful secondary heuristic for ambiguous cases: content-out (let items size themselves — Flexbox) vs layout-in (define the structure first, fit content into it — Grid).',
        '"Table-like" rows of data that need to align in shared columns should be built as one Grid, not as many independent Flexbox containers — independent per-row Flexbox is one of the most common real code-review findings on list-heavy interfaces.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          With both layout systems and the decision framework between them in hand, the next module
          covers how a layout actually adapts to different screen sizes — media query syntax, breakpoint
          strategy, and testing responsively for real.
        </p>
        <Link href="/learn/html-css/responsive-design-media-queries" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next Module → Responsive Design & Media Queries
        </Link>
      </div>
    </LearnLayout>
  )
}
