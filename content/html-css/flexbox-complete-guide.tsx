import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Flexbox — The Complete Guide — HTML & CSS | Chaduvuko',
  description:
    'flex-direction and the main-axis vs cross-axis mental model, justify-content, align-items, align-content, flex-wrap, and flex-grow/flex-shrink/flex-basis explained with worked numeric examples.',
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

export default function FlexboxCompleteGuide() {
  return (
    <LearnLayout
      title="Flexbox — The Complete Guide"
      description="flex-direction and the main-axis vs cross-axis mental model, justify-content, align-items, align-content, flex-wrap, and flex-grow/flex-shrink/flex-basis worked through with real numeric examples."
      section="HTML & CSS — Module 23"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Mental Model" />
        <SectionTitle>The Main Axis and Cross Axis — The Single Most Important Idea in Flexbox</SectionTitle>

        <Para>
          Everything in Flexbox — every property covered in this module — only makes sense once one idea
          is genuinely internalized: turning an element into a flex container creates{' '}
          <strong>two axes</strong>, and every alignment property in Flexbox refers to one of those two
          axes, never to literal "horizontal" or "vertical." Get this backwards and every Flexbox property
          will feel like it is behaving randomly; get it right and the entire spec becomes predictable.
        </Para>

        <CodeBox label="Turning any element into a flex container">{`.container {
  display: flex;
  /* every direct child of .container is now a "flex item" */
}`}</CodeBox>

        <Para>
          The <strong>main axis</strong> is the direction items are laid out along — controlled entirely
          by <code>flex-direction</code> (Part 02). The <strong>cross axis</strong> is always exactly
          perpendicular to the main axis. This is the entire trick: <code>flex-direction</code> does not
          just change which way items flow, it <em>redefines what "main" and "cross" mean</em> for every
          other Flexbox property in the container.
        </Para>

        <CodeBox label="The same two properties, meaning completely different things depending on flex-direction">{`.row {
  display: flex;
  flex-direction: row;         /* main axis = horizontal, cross axis = vertical */
  justify-content: center;      /* centers items HORIZONTALLY */
  align-items: center;           /* centers items VERTICALLY */
}

.column {
  display: flex;
  flex-direction: column;      /* main axis = vertical, cross axis = horizontal */
  justify-content: center;      /* centers items VERTICALLY — same property, different axis! */
  align-items: center;           /* centers items HORIZONTALLY — same property, different axis! */
}`}</CodeBox>

        <Callout type="warning">
          <strong>This is the exact source of "I swapped justify-content and align-items and it fixed
          my layout" confusion.</strong> Neither property is ever really "horizontal" or "vertical" — one
          is always the main-axis property (<code>justify-content</code>) and one is always the cross-axis
          property (<code>align-items</code>/<code>align-content</code>). Once <code>flex-direction</code>{' '}
          changes, which physical direction each property affects flips with it. Memorize the rule as
          "justify = along the main axis, align = across the cross axis" rather than "justify = horizontal,
          align = vertical," and the confusion disappears permanently.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — flex-direction" />
        <SectionTitle>flex-direction — Choosing the Main Axis</SectionTitle>

        <CodeBox label="All four values">{`.a { flex-direction: row; }            /* default — main axis left to right */
.b { flex-direction: row-reverse; }     /* main axis right to left */
.c { flex-direction: column; }          /* main axis top to bottom */
.d { flex-direction: column-reverse; }  /* main axis bottom to top */`}</CodeBox>

        <Para>
          <code>row</code> is the default — if you never set <code>flex-direction</code>, a flex container
          lays its children out left-to-right (in a left-to-right language), with the main axis
          horizontal. The reverse variants flip the <em>order</em> items appear in visually, without
          changing their order in the actual HTML/DOM — an important distinction for accessibility, since
          screen readers and keyboard tab order still follow DOM order, not the visual reversed order.
        </Para>

        <CodeBox label="row-reverse — visual order flips, DOM order and tab order do not">{`<div style="display: flex; flex-direction: row-reverse;">
  <button>First</button>
  <button>Second</button>
  <button>Third</button>
</div>

<!--
Visually renders: Third, Second, First
But Tab still moves focus First -> Second -> Third, because keyboard
navigation follows DOM order, not visual/painted order. A sighted
mouse user and a keyboard user can experience a genuinely different,
inconsistent sequence — this is a real accessibility consideration,
not a theoretical one.
-->`}</CodeBox>

        <Callout type="tip">
          Because of that exact keyboard-order mismatch, <code>row-reverse</code> and{' '}
          <code>column-reverse</code> are used far more cautiously in production interfaces than{' '}
          <code>row</code>/<code>column</code> — reach for them for purely decorative reordering, and
          verify with an actual keyboard (not just visually) whenever the reversed content is interactive.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — justify-content" />
        <SectionTitle>justify-content — Distributing Space Along the Main Axis</SectionTitle>

        <Para>
          <code>justify-content</code> controls how extra space is distributed <strong>along the main
          axis</strong>, once the flex items themselves have already taken up whatever room they need.
          It only has a visible effect when the items do not already fill the container completely.
        </Para>

        <CodeBox label="All six common values, with flex-direction: row">{`.a { justify-content: flex-start; }     /* default — items packed at the start */
.b { justify-content: flex-end; }       /* items packed at the end */
.c { justify-content: center; }          /* items packed in the middle, equal space each side */
.d { justify-content: space-between; }    /* first item at start, last at end, EQUAL gaps between (none at the outer edges) */
.e { justify-content: space-around; }      /* equal space AROUND each item — edge gaps are HALF the between-item gaps */
.f { justify-content: space-evenly; }       /* every gap — including the two outer edges — is exactly equal */`}</CodeBox>

        <Para>
          The distinction between <code>space-between</code>, <code>space-around</code>, and{' '}
          <code>space-evenly</code> is a genuinely common point of confusion worth being precise about:
          with three items in a container, <code>space-between</code> creates two gaps (only between
          items, none at the edges); <code>space-around</code> creates four gaps, but the two edge gaps
          are each half the size of the two between-item gaps; <code>space-evenly</code> creates four
          gaps that are all exactly equal, including the edges.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — align-items and align-content" />
        <SectionTitle>align-items and align-content — Two Different Cross-Axis Properties</SectionTitle>

        <Para>
          <code>align-items</code> controls how items are positioned <strong>across the cross axis
          within a single line</strong> — the direct cross-axis equivalent of{' '}
          <code>justify-content</code>, but for one row (or column) of items.
        </Para>

        <CodeBox label="align-items — the common values, with flex-direction: row">{`.a { align-items: stretch; }       /* default — items stretch to fill the container's cross-axis size */
.b { align-items: flex-start; }     /* items align to the top of the cross axis */
.c { align-items: flex-end; }        /* items align to the bottom */
.d { align-items: center; }           /* items centered vertically */
.e { align-items: baseline; }          /* items aligned by their text baseline — useful when items have different font sizes */`}</CodeBox>

        <Callout type="info">
          <code>align-items: stretch</code> is the <strong>default</strong>, and it genuinely surprises
          people the first time — flex items with no explicit height, inside a row-direction flex
          container, automatically stretch to match the tallest sibling&apos;s height unless{' '}
          <code>align-items</code> is set to something else. This is precisely the mechanism behind the
          "equal-height cards" pattern covered fully in the next module, and it happens with zero extra
          CSS beyond <code>display: flex</code> itself.
        </Callout>

        <SubTitle>align-content — only relevant once items wrap onto multiple lines</SubTitle>

        <Para>
          <code>align-content</code> is easy to confuse with <code>align-items</code>, but it solves a
          different problem: it controls how <strong>entire lines</strong> of wrapped flex items are
          distributed across the cross axis relative to each other — it has <em>zero</em> visible effect
          with a single line of items (the overwhelmingly common case, e.g. <code>flex-wrap: nowrap</code>,
          the default). It only does anything once <code>flex-wrap: wrap</code> (Part 05) produces
          multiple lines and there is extra space in the cross-axis direction to distribute between them.
        </Para>

        <CodeBox label="align-content — takes effect only with multiple wrapped lines">{`.gallery {
  display: flex;
  flex-wrap: wrap;
  height: 600px;            /* taller than the wrapped content needs, so there IS extra cross-axis space */
  align-content: space-between;  /* spreads the WRAPPED LINES apart from each other */
  /* align-items still controls alignment WITHIN each individual line */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — flex-wrap" />
        <SectionTitle>flex-wrap — Allowing Items to Flow Onto New Lines</SectionTitle>

        <Para>
          By default, every flex item is forced onto a single line (<code>flex-wrap: nowrap</code>),
          shrinking to fit if necessary (governed by <code>flex-shrink</code>, Part 07) rather than ever
          wrapping. <code>flex-wrap: wrap</code> allows items to flow onto additional lines once they no
          longer fit on the current one.
        </Para>

        <CodeBox label="nowrap (default) vs wrap">{`.a {
  display: flex;
  flex-wrap: nowrap;   /* default — items squeeze/shrink to stay on one line, however cramped */
}

.b {
  display: flex;
  flex-wrap: wrap;   /* items that no longer fit flow onto a new line instead of shrinking indefinitely */
}

.c {
  display: flex;
  flex-wrap: wrap-reverse;   /* wraps, but new lines stack ABOVE the first line instead of below */
}`}</CodeBox>

        <Callout type="warning">
          <strong>flex-wrap: nowrap is exactly why flex items sometimes shrink to an uncomfortably
          narrow, unreadable width instead of wrapping onto a new line as you might expect.</strong>{' '}
          With the default nowrap, items keep shrinking (per their flex-shrink value) to remain on one
          row no matter how narrow the container gets — this is very often not what a responsive layout
          actually wants, and explicitly adding flex-wrap: wrap is one of the single most common fixes
          applied when a Flexbox row breaks on narrow/mobile viewports.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — flex-grow" />
        <SectionTitle>flex-grow — Distributing Extra Space, Worked Numerically</SectionTitle>

        <Para>
          <code>flex-grow</code> controls how leftover space along the main axis is distributed once every
          item has already taken its base size. Its default is <code>0</code> — meaning by default, extra
          space is <em>not</em> distributed to items at all, it simply sits unused (governed by{' '}
          <code>justify-content</code> instead). The number is not a percentage or a pixel value — it is a{' '}
          <strong>ratio</strong>, and understanding it requires actually doing the arithmetic once.
        </Para>

        <CodeBox label="Three items, three different flex-grow values — the exact math">{`.container {
  display: flex;
  width: 900px;
}
.item-a { flex-grow: 1; width: 100px; }  /* base width before growing */
.item-b { flex-grow: 2; width: 100px; }
.item-c { flex-grow: 1; width: 100px; }

/*
Total base width used: 100 + 100 + 100 = 300px
Leftover space to distribute: 900 - 300 = 600px

The three flex-grow values (1, 2, 1) sum to 4 "shares."
Each share of the leftover 600px is worth: 600 / 4 = 150px

item-a gets 1 share:  100px + (1 × 150px) = 250px final width
item-b gets 2 shares: 100px + (2 × 150px) = 400px final width
item-c gets 1 share:  100px + (1 × 150px) = 250px final width

Final check: 250 + 400 + 250 = 900px — exactly fills the container.
item-b ends up exactly TWICE as wide as item-a and item-c combined
relative to their growth, because its flex-grow ratio is exactly double.
*/`}</CodeBox>

        <Para>
          The takeaway that matters: <code>flex-grow</code> values are only meaningful{' '}
          <strong>relative to each other</strong>, not as absolute numbers. <code>flex-grow: 1</code> on
          every item produces identical results to <code>flex-grow: 100</code> on every item — what
          matters is each item&apos;s share of the <em>total</em> across all items in that container, not
          the specific numbers chosen.
        </Para>

        <CodeBox label="The common 'one item fills remaining space, others stay fixed' pattern">{`.toolbar {
  display: flex;
}
.toolbar-title { flex-grow: 0; }   /* stays exactly its natural size */
.toolbar-spacer { flex-grow: 1; }   /* absorbs 100% of the leftover space — pushes the next item to the far end */
.toolbar-actions { flex-grow: 0; }  /* stays exactly its natural size */

/* This exact three-item pattern — a fixed title, an invisible flex-grow: 1
   spacer <div>, and fixed trailing action buttons — is one of the single
   most common real-world Flexbox layouts, used constantly for toolbars,
   headers, and any "stuff on the left, stuff pinned to the right" row. */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — flex-shrink" />
        <SectionTitle>flex-shrink — The Same Ratio Logic, Running in Reverse</SectionTitle>

        <Para>
          <code>flex-shrink</code> is the mirror image of <code>flex-grow</code>: instead of distributing
          extra space, it distributes a <strong>deficit</strong> — how much each item gives up when the
          container is too narrow to fit every item at its base size. Its default is <code>1</code>{' '}
          (unlike <code>flex-grow</code>&apos;s default of <code>0</code>) — meaning, by default, every
          flex item is willing to shrink.
        </Para>

        <CodeBox label="Three items, base widths that overflow the container — the exact shrink math">{`.container {
  display: flex;
  width: 500px;
}
.item-a { flex-shrink: 1; width: 300px; }
.item-b { flex-shrink: 1; width: 300px; }
.item-c { flex-shrink: 1; width: 300px; }

/*
Total base width: 300 + 300 + 300 = 900px
Container is only 500px — an overflow of 400px that must be removed.

With EQUAL flex-shrink values (1, 1, 1) and equal base widths, the
400px deficit is split evenly: each item shrinks by 400 / 3 ≈ 133px

item-a: 300 - 133 = 167px
item-b: 300 - 133 = 167px
item-c: 300 - 133 = 167px  (rounding — actual browser math is more precise)
*/`}</CodeBox>

        <Callout type="warning">
          <strong>The real flex-shrink formula also factors in each item&apos;s base size, not just its
          shrink value</strong> — the browser weighs shrink ratio BY base size (flex-shrink × flex-basis),
          so a larger item with the same flex-shrink value gives up proportionally more absolute pixels
          than a smaller one. The simplified equal-base-size example above is accurate specifically
          because all three items share the same 300px base width; with differing base widths, the exact
          split is not simply the shrink ratio alone. The practical takeaway that matters day to day:{' '}
          <code>flex-shrink: 0</code> on a specific item (commonly an icon or a fixed-width sidebar)
          prevents it from ever shrinking below its base size, letting only the other, shrink-enabled
          items absorb the deficit.
        </Callout>

        <CodeBox label="flex-shrink: 0 protecting a fixed-width sidebar from shrinking">{`.layout {
  display: flex;
}
.sidebar {
  flex-shrink: 0;      /* never shrinks below its own width, no matter how narrow the container gets */
  width: 240px;
}
.main-content {
  flex-shrink: 1;       /* absorbs all of the shrinking */
  flex-grow: 1;           /* also expands to fill any leftover space */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — flex-basis and the flex Shorthand" />
        <SectionTitle>flex-basis — The Starting Size Before Grow/Shrink Are Applied</SectionTitle>

        <Para>
          <code>flex-basis</code> sets an item&apos;s starting main-axis size <strong>before</strong>{' '}
          <code>flex-grow</code> or <code>flex-shrink</code> are applied — conceptually, "what width
          would this item be if grow/shrink math had not run yet." Its default value is <code>auto</code>,
          which falls back to the item&apos;s own <code>width</code> (in a row container) or content size
          if no width is set at all.
        </Para>

        <CodeBox label="The three properties combined via the flex shorthand — the form used almost everywhere in real code">{`.item {
  flex: 1 1 200px;
  /* flex-grow: 1   — willing to grow to fill space
     flex-shrink: 1 — willing to shrink (this is also the default)
     flex-basis: 200px — starting size before grow/shrink math runs */
}

/* The three most common shorthand patterns you will actually see: */
.equal-width-item { flex: 1; }          /* shorthand for flex: 1 1 0% — items split space perfectly equally, ignoring their content's natural size entirely */
.fixed-size-item   { flex: 0 0 200px; }  /* never grows, never shrinks, always exactly 200px regardless of container size */
.natural-then-grow { flex: 1 1 auto; }    /* starts at its natural content size, then grows/shrinks from there */`}</CodeBox>

        <Callout type="tip">
          <strong>flex: 1 (shorthand for flex: 1 1 0%) is subtly different from flex: 1 1 auto</strong>,
          and the difference matters constantly in real layouts. With a <code>flex-basis</code> of{' '}
          <code>0%</code>, the item&apos;s own content size is entirely ignored as a starting point —
          every item with <code>flex: 1</code> ends up genuinely equal-width, regardless of how much text
          each one contains. With <code>flex: 1 1 auto</code>, each item starts from its own natural
          content width and then grows from there — items with more content can end up visibly wider than
          items with less, even though all of them share the same <code>flex-grow: 1</code>. Reach for{' '}
          <code>flex: 1</code> specifically when items must be perfectly equal regardless of content.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Pricing Table Bug at a Chicago SaaS Company</SectionTitle>

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
            Scenario — B2B SaaS company, Chicago · Marketing page bug
          </div>

          <Para>
            The marketing team ships a three-tier pricing table — Starter, Pro, Enterprise — as a
            horizontal row of cards. The "Pro" plan name is short. The "Enterprise" plan card, added a
            week later, needs an extra line of description text explaining custom SSO and dedicated
            support. As soon as it ships, the cards visibly stop matching widths: the Enterprise card is
            noticeably narrower than the other two, even though all three share the same CSS class.
          </Para>

          <CodeBox label="The original pricing table CSS">{`.pricing-row {
  display: flex;
  gap: 24px;
}
.pricing-card {
  flex: 1 1 auto;   /* the culprit */
  padding: 32px;
  border-radius: 12px;
  background: white;
}`}</CodeBox>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            Exactly the distinction from Part 08&apos;s callout: <code>flex: 1 1 auto</code> starts each
            card&apos;s width from its own natural content size before growing — and the Enterprise
            card&apos;s extra sentence of description text gives it a larger natural content width than
            Starter or Pro. All three cards share the same <code>flex-grow: 1</code>, so they grow by
            equal <em>amounts</em> of extra space from there, but that equal amount is added on top of
            different starting sizes, so the final widths never converge to equal.
          </Para>

          <CodeBox label="The fix — a one-value change">{`.pricing-card {
  flex: 1;   /* shorthand for flex: 1 1 0% — ignores each card's own content
                width as a starting point entirely, so all three grow from
                an identical zero baseline and end up genuinely equal-width */
  padding: 32px;
  border-radius: 12px;
  background: white;
}`}</CodeBox>

          <Para>
            The cards become pixel-identical in width regardless of how much copy any individual plan
            needs, and the fix survives the inevitable next update where a fourth "Team" tier gets added
            with yet another different amount of text. This exact <code>flex: 1</code> vs{' '}
            <code>flex: 1 1 auto</code> distinction is one of the most common real Flexbox debugging
            sessions — "these should be equal width and they are not, despite identical CSS classes."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Flexbox</SectionTitle>

        {[
          {
            wrong: '"justify-content always controls horizontal alignment and align-items always controls vertical alignment"',
            right: 'Both properties are relative to the flex container\'s axes, not to literal screen directions. justify-content always aligns along the MAIN axis and align-items always aligns across the CROSS axis — which of those is horizontal versus vertical depends entirely on flex-direction. With flex-direction: column, justify-content controls vertical positioning and align-items controls horizontal positioning — the exact reverse of the row default.',
          },
          {
            wrong: '"flex-grow: 2 means an item will be twice as wide as the container"',
            right: 'flex-grow values are ratios relative only to the OTHER items\' flex-grow values in the same container, applied only to the leftover space after every item\'s base size is accounted for — not to the container\'s total width. An item with flex-grow: 2 gets twice as much of the leftover space as a sibling with flex-grow: 1, not twice the container\'s total width.',
          },
          {
            wrong: '"flex: 1 and flex: 1 1 auto are basically the same thing"',
            right: 'flex: 1 is shorthand for flex: 1 1 0%, which ignores each item\'s own content size as a starting point, producing genuinely equal widths regardless of content. flex: 1 1 auto starts each item from its own natural content width before growing, which means items with different amounts of content can end up different final widths even with identical flex-grow values — exactly the pricing-card bug in the Real World example above.',
          },
          {
            wrong: '"align-content and align-items do the same thing"',
            right: 'align-items positions items across the cross axis WITHIN a single line, and works regardless of whether items wrap. align-content positions entire WRAPPED LINES relative to each other across the cross axis, and has zero visible effect unless flex-wrap: wrap is set and there are actually multiple lines with extra cross-axis space to distribute.',
          },
          {
            wrong: '"Flexbox items automatically wrap onto a new line when they run out of horizontal room"',
            right: 'The default is flex-wrap: nowrap, meaning items instead shrink (per flex-shrink, default 1) to stay on a single line, however cramped — they do NOT wrap automatically. flex-wrap: wrap must be explicitly set for items to flow onto new lines instead of squeezing.',
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

      {/* ── Part 11 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>6 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Explain the main axis and cross axis, and why understanding them is the key to the rest of Flexbox.',
            a: 'The main axis is the direction flex items are laid out along, set by flex-direction; the cross axis is always exactly perpendicular to it. Every Flexbox alignment property is defined relative to one of these two axes rather than to literal horizontal/vertical — justify-content always works along the main axis, align-items/align-content always work across the cross axis. Since flex-direction can flip which physical direction is "main," the same properties end up controlling different visual directions depending on flex-direction — which is the root of most Flexbox confusion until this mental model clicks.',
          },
          {
            q: 'Walk through exactly how three flex items with flex-grow values of 1, 2, and 1 split up 300px of leftover space in their container.',
            a: 'The three flex-grow values sum to 4 total "shares." Each share is worth 300 / 4 = 75px. The item with flex-grow: 1 gets 1 share (75px extra each), and the item with flex-grow: 2 gets 2 shares (150px extra) — so it ends up with exactly twice as much added width as either of its siblings. flex-grow only distributes the leftover space after each item\'s base size (flex-basis) is already accounted for — it is not a percentage of the container\'s total width.',
          },
          {
            q: 'What is the difference between flex: 1 and flex: 1 1 auto, and when does the difference actually show up visually?',
            a: 'flex: 1 is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0%, meaning every item starts from a zero baseline before growing, so items with equal flex-grow end up genuinely equal width regardless of content. flex: 1 1 auto keeps flex-basis: auto, so each item starts from its own natural content size and grows from there — items with more content can end up visibly wider than items with less, even with identical flex-grow. The difference shows up specifically whenever items have unequal natural content sizes, like cards or buttons with varying text lengths.',
          },
          {
            q: 'Why might a row of flex items shrink to an uncomfortably narrow width on a small screen instead of wrapping onto multiple lines?',
            a: 'flex-wrap defaults to nowrap, so items are forced to shrink (per each item\'s flex-shrink, default 1) to remain on a single line rather than wrapping automatically. This is a common cause of cramped, overflowing, or unreadable rows on narrow viewports, and the standard fix is explicitly adding flex-wrap: wrap so items flow onto new lines once they no longer fit, instead of continuing to shrink indefinitely.',
          },
          {
            q: 'When does align-content have any visible effect, and how does it differ from align-items?',
            a: 'align-content only has a visible effect when flex-wrap: wrap (or wrap-reverse) is set AND the flex items actually wrap onto multiple lines, with extra space left over in the cross-axis direction — it controls how those wrapped lines are distributed relative to each other. align-items, by contrast, controls alignment across the cross axis within a single line and applies regardless of wrapping. With only one line of items (the common nowrap default), align-content has no visible effect at all.',
          },
          {
            q: 'Describe a real Flexbox layout you would build using flex-grow: 0 on some items and flex-grow: 1 on exactly one item.',
            a: 'A toolbar or header row: a fixed-width logo/title on the left (flex-grow: 0, stays its natural size), an invisible spacer div in the middle with flex-grow: 1 that absorbs all of the leftover horizontal space, and fixed-width action buttons on the right (flex-grow: 0). Because the spacer is the only item willing to grow, it consumes 100% of the leftover space, which has the visual effect of pushing the right-hand buttons all the way to the far edge of the container — one of the most common real-world uses of flex-grow.',
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
        <SectionTitle>Flexbox Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Expecting items to wrap onto a new line automatically',
            a: 'Broken: a row of items squeezes into an uncomfortably narrow width on small screens instead of wrapping, because flex-wrap defaults to nowrap. Fixed: add flex-wrap: wrap; explicitly whenever items should flow onto new lines instead of shrinking indefinitely.',
          },
          {
            q: 'Using flex: 1 1 auto and being confused why equally-styled items end up different widths',
            a: 'Broken: three cards with identical flex: 1 1 auto CSS but different amounts of text end up visibly different widths, because auto lets each item\'s own content size act as its starting point. Fixed: use flex: 1 (shorthand for flex: 1 1 0%) whenever items should be genuinely equal-width regardless of their content.',
          },
          {
            q: 'Setting justify-content to try to control cross-axis alignment',
            a: 'Broken: setting justify-content: center on a flex-direction: row container expecting it to vertically center items — it only affects the main (horizontal) axis in a row container. Fixed: use align-items: center for cross-axis (vertical, in a row) alignment; justify-content only ever affects the main axis.',
          },
          {
            q: 'Assuming align-content will do something with a single line of items',
            a: 'Broken: setting align-content: space-between on a container with flex-wrap: nowrap (or wrap with content that never actually wraps) and seeing zero visible change. Fixed: align-content only affects multiple WRAPPED lines — for single-line alignment across the cross axis, align-items is the correct property.',
          },
          {
            q: 'Forgetting that flex-shrink: 0 is needed to protect a fixed-width element from shrinking',
            a: 'Broken: a fixed-width 240px sidebar (with the flex-shrink default of 1) visibly shrinks below its intended width whenever the container gets tight, since every item shrinks by default. Fixed: add flex-shrink: 0; to the sidebar so only the remaining, shrink-enabled items absorb any space deficit.',
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
            error: `Flex items that should be equal width render with visibly different widths, despite sharing the same CSS class`,
            cause: 'The items use flex: 1 1 auto (or separately declared flex-basis: auto), which lets each item\'s own content size act as its starting width before flex-grow is applied — items with more content end up wider even with identical flex-grow values.',
            fix: 'Use flex: 1 (equivalent to flex: 1 1 0%) whenever items must be genuinely equal-width regardless of their individual content.',
          },
          {
            error: `A flex row overflows its container horizontally on narrow screens instead of wrapping`,
            cause: 'flex-wrap defaults to nowrap — items shrink (per flex-shrink) to try to stay on one line rather than wrapping, and if their combined minimum content size still exceeds the container, they overflow instead.',
            fix: 'Add flex-wrap: wrap; so items flow onto additional lines once they no longer fit on the current one.',
          },
          {
            error: `A fixed-width sidebar or icon visibly shrinks smaller than its declared width`,
            cause: 'flex-shrink defaults to 1, meaning every flex item is willing to shrink below its base size whenever the container is too narrow to fit everything at full size.',
            fix: 'Set flex-shrink: 0; on the element that must never shrink below its intended size, so the deficit is absorbed entirely by the remaining, shrink-enabled siblings.',
          },
          {
            error: `justify-content: center (or align-items: center) appears to do nothing at all`,
            cause: 'Most commonly, justify-content is being used to try to control the CROSS axis (or align-items to control the MAIN axis) — the properties are swapped relative to the container\'s current flex-direction.',
            fix: 'Confirm the container\'s flex-direction first: with row, justify-content is horizontal and align-items is vertical; with column, this is exactly reversed.',
          },
          {
            error: `align-content: space-between (or any align-content value) produces no visible change`,
            cause: 'align-content only affects multiple WRAPPED lines of flex items with extra cross-axis space to distribute — it has zero effect with a single line, which is the outcome with the default flex-wrap: nowrap, or with wrap set but not enough items to actually create a second line.',
            fix: 'Confirm flex-wrap: wrap is set and that items genuinely wrap onto more than one line; for single-line cross-axis alignment, use align-items instead.',
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
        'display: flex creates a main axis and a cross axis. flex-direction chooses which physical direction is the main axis — every other Flexbox property is defined relative to these two axes, not to literal horizontal/vertical.',
        'justify-content distributes space along the MAIN axis; align-items aligns items across the CROSS axis within one line; align-content distributes multiple WRAPPED LINES across the cross axis and does nothing with a single line.',
        'flex-grow distributes leftover space as a RATIO relative to sibling flex-grow values, only after each item\'s base size is accounted for — it is not a percentage of the container.',
        'flex-shrink (default 1) lets items shrink below their base size when the container is too tight; flex-shrink: 0 protects a specific item (like a sidebar or icon) from ever shrinking.',
        'flex-basis sets an item\'s starting size before grow/shrink math runs — flex: 1 (basis 0%) ignores content size entirely for genuinely equal widths; flex: 1 1 auto starts from each item\'s own natural content size instead.',
        'flex-wrap defaults to nowrap — items shrink to stay on one line rather than wrapping automatically. flex-wrap: wrap must be set explicitly for items to flow onto new lines.',
        'row-reverse and column-reverse only flip the VISUAL order — DOM order and keyboard tab order stay unchanged, a real accessibility consideration for interactive content.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 24 takes every property from this module and applies it to real UI patterns — a
          responsive navbar, an equal-height card grid, the single-container centering reflex, a sticky
          footer layout, and the gap property.
        </p>
        <Link href="/learn/html-css/flexbox-in-practice" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 24 → Flexbox in Practice — Real Layouts
        </Link>
      </div>
    </LearnLayout>
  )
}
