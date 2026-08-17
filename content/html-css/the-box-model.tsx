import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'The Box Model — Margin, Border, Padding, Content — HTML & CSS | Chaduvuko',
  description:
    'Every element on the page is a box. Content, padding, border, and margin in order, box-sizing: content-box vs border-box, margin collapsing, and inline vs block box behavior.',
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

export default function TheBoxModel() {
  return (
    <LearnLayout
      title="The Box Model — Margin, Border, Padding, Content"
      description="Every element on the page is a box. Understanding the box model precisely is what makes every later layout concept make sense."
      section="HTML & CSS — Module 18"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Four Layers" />
        <SectionTitle>Every Element Is a Rectangular Box, Built From Four Layers</SectionTitle>

        <Para>
          No matter how an element looks on the page — text, an image, a button, an entire layout section —
          the browser renders it as a rectangular box, built from exactly four concentric layers, always in
          the same order, from the inside out: <strong>content</strong>, <strong>padding</strong>,{' '}
          <strong>border</strong>, and <strong>margin</strong>. Understanding this stack precisely is the
          single most load-bearing piece of CSS knowledge in the entire language — nearly every layout bug
          you will ever debug eventually traces back to a misunderstanding of one of these four layers.
        </Para>

        <CodeBox label="The four layers, from the inside out">{`.card {
  width: 300px;          /* the CONTENT box */
  padding: 20px;          /* space INSIDE the border, around the content */
  border: 2px solid #333; /* a visible line around the padding */
  margin: 16px;            /* space OUTSIDE the border, pushing other elements away */
}`}</CodeBox>

        <Para>
          <strong>Content</strong> is the innermost box — the actual text, image, or nested elements. Its
          size is controlled by <code>width</code> and <code>height</code>. <strong>Padding</strong> is
          transparent space between the content and the border — it is still considered "inside" the
          element, and it takes on the element&apos;s background color. <strong>Border</strong> is a visible
          (or invisible, if unset) line drawn around the padding. <strong>Margin</strong> is transparent
          space entirely outside the border — it is not part of the element at all, and its only job is to
          push neighboring elements away.
        </Para>

        <Callout type="tip">
          Chrome and Firefox DevTools both show this exact stack visually in the Elements/Inspector panel&apos;s
          "Box Model" diagram — four nested, color-coded rectangles labeled content, padding, border, and
          margin, each with its computed pixel values. Getting comfortable reading that diagram is one of
          the fastest ways to debug any spacing issue.
        </Callout>

        <SubTitle>Background color covers content AND padding, never margin</SubTitle>

        <Para>
          A detail that trips up beginners constantly: setting <code>background</code> on an element fills
          the content box <em>and</em> the padding — the colored area extends all the way out to the border.
          Margin is always transparent, by definition, since it exists entirely outside the element&apos;s own
          box.
        </Para>

        <CodeBox label="Background fills content + padding, not margin">{`.badge {
  background: #f97316;
  padding: 8px 16px;
  margin: 12px;
}

/* The orange background extends through the padding right up to the
   border edge. The 12px margin around the badge stays fully transparent
   — you are seeing through to whatever is behind the badge there. */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — box-sizing" />
        <SectionTitle>box-sizing: content-box vs border-box — The Property That Changes What width Means</SectionTitle>

        <Para>
          Here is the detail that causes the most confusion in the entire box model: by default,{' '}
          <code>width</code> and <code>height</code> only control the size of the <strong>content</strong>{' '}
          box. Padding and border are added <em>on top of</em> that width, making the element&apos;s actual
          rendered size larger than the width you set.
        </Para>

        <CodeBox label="The default: box-sizing: content-box">{`.box {
  box-sizing: content-box;  /* this is the default, even if never written */
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}

/* Actual rendered width = 300 (content) + 20 + 20 (left+right padding)
                          + 5 + 5 (left+right border)
                          = 350px, not 300px`}</CodeBox>

        <Para>
          This is rarely what anyone actually wants — you set a width expecting the element to be exactly
          that wide, and instead it grows past it the moment you add padding or a border. The fix is a
          different value for <code>box-sizing</code>, which changes what <code>width</code> actually
          measures.
        </Para>

        <CodeBox label="border-box — width includes padding and border">{`.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
}

/* Actual rendered width = exactly 300px.
   Padding and border are now carved OUT of the 300px, not added on top.
   The content area shrinks to make room for them instead. */`}</CodeBox>

        <SubTitle>Why nearly every real stylesheet resets to border-box globally</SubTitle>

        <Para>
          Because <code>content-box</code>&apos;s "width doesn&apos;t mean width" behavior is confusing and
          rarely useful, the near-universal convention in real production CSS is a single reset rule at the
          very top of the stylesheet that switches every element to <code>border-box</code> — a pattern you
          will see at the top of essentially every professional codebase, CSS framework, and starter
          template.
        </Para>

        <CodeBox label="The universal box-sizing reset">{`*, *::before, *::after {
  box-sizing: border-box;
}

/* From this point on, every width/height you set anywhere in the
   stylesheet means the TOTAL rendered size — padding and border are
   automatically absorbed into it, not added on top. */`}</CodeBox>

        <Callout type="warning">
          <strong>content-box is still the browser default, even in 2026</strong> — CSS never changed its
          own default for backward-compatibility reasons, which is exactly why the reset rule above shows
          up everywhere. If you inherit a project without this reset and are debugging why an element is
          wider than the width you set, check <code>box-sizing</code> first — it is very often the actual
          cause.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Shorthand and Per-Side Values" />
        <SectionTitle>Setting Padding, Border, and Margin Per Side</SectionTitle>

        <Para>
          Padding and margin both accept a shorthand that can set one, two, three, or four values at once —
          the number of values changes what each one means, and misremembering the order is a common source
          of "why is my spacing lopsided" bugs.
        </Para>

        <CodeBox label="The four shorthand patterns">{`padding: 20px;                    /* all four sides */
padding: 20px 40px;                /* top+bottom, left+right */
padding: 20px 40px 10px;           /* top, left+right, bottom */
padding: 20px 40px 10px 5px;       /* top, right, bottom, left — CLOCKWISE from top */`}</CodeBox>

        <Para>
          The four-value form always goes clockwise starting from the top: <strong>top, right, bottom,
          left</strong>. This is worth memorizing precisely rather than guessing, since getting the order
          wrong produces a layout that is subtly, confusingly asymmetric rather than obviously broken.
        </Para>

        <CodeBox label="Per-side longhand properties — margin shown, border and padding follow the same pattern">{`.box {
  margin-top: 20px;
  margin-right: 40px;
  margin-bottom: 10px;
  margin-left: 5px;
}

/* Equivalent to: margin: 20px 40px 10px 5px; */`}</CodeBox>

        <SubTitle>Border&apos;s shorthand bundles three different properties, not four sides</SubTitle>

        <Para>
          Border&apos;s shorthand works differently — a single <code>border</code> declaration sets{' '}
          <code>border-width</code>, <code>border-style</code>, and <code>border-color</code> together, and
          each of those can independently be set per side.
        </Para>

        <CodeBox label="border shorthand and its per-side longhand equivalent">{`border: 2px solid #333;
/* equivalent to:
   border-width: 2px;
   border-style: solid;
   border-color: #333;
*/

/* Per-side border — only a left accent border, nothing else */
.callout {
  border-left: 4px solid #f97316;
}`}</CodeBox>

        <Callout type="info">
          <code>border-style</code> is required for a border to render at all — omitting it (writing only{' '}
          <code>border-width</code> and <code>border-color</code>) produces no visible border, since the
          default style is <code>none</code>. This is a genuinely common early mistake: setting a width and
          color and being confused why nothing appears.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Margin Collapsing" />
        <SectionTitle>Margin Collapsing — When 20px + 20px Becomes 20px, Not 40px</SectionTitle>

        <Para>
          This is the single most surprising piece of default CSS behavior for anyone learning the box
          model, and it catches experienced engineers off guard too, not just beginners. In certain
          situations, the <strong>vertical</strong> margins of two elements do not add together — they{' '}
          <em>collapse</em> into a single margin equal to the larger of the two, not the sum.
        </Para>

        <CodeBox label="Two sibling paragraphs — margins collapse, they don't stack">{`p {
  margin-top: 20px;
  margin-bottom: 20px;
}`}</CodeBox>

        <CodeBox label="What you might expect vs what actually happens">{`<p>First paragraph.</p>
<p>Second paragraph.</p>

/* You might expect 40px between them: 20px (first's margin-bottom)
   + 20px (second's margin-top).

   What actually happens: the two margins COLLAPSE into a single 20px
   gap — the LARGER of the two touching margins, not their sum. */`}</CodeBox>

        <Para>
          The rule applies specifically to <strong>adjacent vertical margins</strong> — a bottom margin
          touching a following sibling&apos;s top margin. Horizontal margins never collapse, and margins
          separated by padding, a border, or actual content in between do not collapse either, because they
          are no longer directly touching.
        </Para>

        <CodeBox label="Margins of DIFFERENT sizes collapse to the LARGER value">{`.a { margin-bottom: 30px; }
.b { margin-top: 10px; }

/* Gap between .a and .b is 30px — the larger of the two — not 40px,
   and not 10px. This is what "collapse" specifically means:
   max(30, 10), not addition. */`}</CodeBox>

        <SubTitle>Parent-child margin collapsing — an even more surprising case</SubTitle>

        <Para>
          Margins can also collapse between a parent and its <strong>first or last child</strong>, if
          nothing separates them — no border, no padding, no content on that side of the parent. The
          child&apos;s margin effectively "escapes" the parent entirely.
        </Para>

        <CodeBox label="A child's top margin collapsing through its parent">{`<div class="parent">
  <p class="child">Hello</p>
</div>`}</CodeBox>

        <CodeBox label="Without a boundary, the child's margin pushes the PARENT down">{`.parent {
  background: lightblue;   /* no border, no padding */
}
.child {
  margin-top: 40px;
}

/* You might expect 40px of blue space at the TOP of .parent, then the
   text starting. Instead, the entire .parent box gets pushed down 40px
   — the child's margin "escaped" through the parent, because nothing
   (no border/padding) was there to contain it. */`}</CodeBox>

        <Callout type="warning">
          <strong>The fix for unwanted parent-child collapsing is to give the parent a boundary.</strong>{' '}
          Adding any padding, a border (even <code>1px solid transparent</code>), or setting{' '}
          <code>overflow: hidden</code> or <code>display: flow-root</code> on the parent stops the
          collapse — any of these creates a real containing boundary the child&apos;s margin cannot pass
          through.
        </Callout>

        <CodeBox label="Fixed — padding gives the parent a boundary">{`.parent {
  background: lightblue;
  padding-top: 1px;   /* even 1px is enough to block the collapse */
}

/* Now the child's 40px top margin stays fully INSIDE .parent, as
   originally expected. */`}</CodeBox>

        <Para>
          Margin collapsing does not apply to Flexbox or Grid children, only to normal ("block") document
          flow — one of many reasons modern layouts built with Flexbox or Grid (covered later in this
          track) sidestep this particular surprise entirely.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Inline vs Block Box Behavior" />
        <SectionTitle>Inline Elements Play by Different Box-Model Rules</SectionTitle>

        <Para>
          Not every element applies the box model identically — <code>display: inline</code> elements (like{' '}
          <code>&lt;span&gt;</code> and <code>&lt;a&gt;</code> by default) ignore several box-model
          properties that block-level elements respect fully.
        </Para>

        <CodeBox label="width and height are ignored on inline elements">{`span {
  width: 300px;
  height: 100px;
  background: yellow;
}

/* Both width and height are silently ignored on an inline element.
   Its size is determined entirely by its content — the text inside it
   — and nothing else. This is one of the most common "why isn't my
   CSS working" moments for beginners. */`}</CodeBox>

        <CodeBox label="Vertical margin is also ignored on inline elements">{`span {
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 10px;    /* this ONE still works */
}

/* margin-top and margin-bottom have no visual effect on an inline
   element — they do not push surrounding lines apart. Horizontal
   margin (left/right) DOES work normally on inline elements. */`}</CodeBox>

        <Para>
          Vertical padding and border technically still render visually on inline elements — you will see
          a colored background or a border line — but they do not affect the surrounding block layout the
          way they would on a block element; they can visually overlap the line above or below rather than
          pushing it away.
        </Para>

        <Callout type="tip">
          <strong>The practical fix, when an inline element genuinely needs a real width/height/vertical
          margin, is <code>display: inline-block</code>.</strong> It keeps the element flowing inline with
          surrounding text (unlike <code>display: block</code>, which forces it onto its own line) while
          restoring full support for width, height, and vertical margin — the best of both behaviors. This
          gets its own full treatment, alongside <code>position</code>, in the Display &amp; Positioning
          module later in this phase.
        </Callout>

        <SubTitle>Block-level elements, by contrast, respect every box-model property fully</SubTitle>

        <CodeBox label="A block element honors width, height, and every margin direction">{`div {
  display: block;   /* the default for <div> */
  width: 300px;
  height: 100px;
  margin: 20px;
}

/* Every value here applies exactly as written — the element is exactly
   300x100px, plus a full 20px margin in every direction. */`}</CodeBox>
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
        <SectionTitle>A Broken Checkout Layout at an Austin Meal-Kit Delivery Startup</SectionTitle>

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
            Scenario — Meal-kit delivery startup, Austin · Checkout page bug
          </div>

          <Para>
            An engineer at an Austin-based meal-kit delivery startup builds a three-column price-summary
            row for the checkout page — each column meant to be exactly one-third of a 900px container,
            with padding and a border for visual separation.
          </Para>

          <CodeBox label="The original CSS">{`.summary-row {
  width: 900px;
}

.summary-col {
  width: 300px;
  padding: 16px;
  border: 1px solid #ddd;
  float: left;
}`}</CodeBox>

          <Para>
            In the browser, the third column wraps onto its own line below the first two, breaking the
            layout entirely — despite <code>300px × 3 = 900px</code>, which should fit exactly inside a
            900px container.
          </Para>

          <SubSubTitle>What DevTools' box model diagram shows</SubSubTitle>

          <Para>
            Hovering each column in DevTools reveals the real rendered width is not 300px at all — it is{' '}
            <code>300 + 16 + 16 (padding) + 1 + 1 (border) = 334px</code>. Three columns at 334px each is
            1,002px — 102px wider than the 900px container, which is exactly why the third one wraps. This
            is <code>box-sizing: content-box</code> (the browser default, Part 02) doing precisely what it
            is specified to do: padding and border added on top of the declared width, not absorbed into
            it.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="Adding the standard border-box reset">{`*, *::before, *::after {
  box-sizing: border-box;
}

/* No other CSS needs to change. Every .summary-col is now genuinely
   300px total, padding and border included — three of them fit
   exactly inside the 900px .summary-row, as originally intended. */`}</CodeBox>

          <Para>
            The team adds the reset globally, at the very top of the site&apos;s main stylesheet, so every
            future component benefits automatically rather than requiring this exact debugging session
            again on the next multi-column layout. This is precisely why the border-box reset from Part 02
            is close to universal in real production CSS — it removes an entire, extremely common category
            of layout bug before it can happen.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About the Box Model</SectionTitle>

        {[
          {
            wrong: '"Setting width: 300px always makes an element exactly 300px wide"',
            right: 'Only under box-sizing: border-box. Under the browser default, content-box, padding and border are added ON TOP of the declared width, making the actual rendered size larger — exactly the bug in the Real World example above.',
          },
          {
            wrong: '"Vertical margins between two elements always add together"',
            right: 'They collapse into a single margin equal to the LARGER of the two, not the sum — a 20px bottom margin touching a 20px top margin produces a 20px gap, not 40px. This applies specifically to adjacent vertical margins in normal document flow, not horizontal margins, and not Flexbox/Grid children.',
          },
          {
            wrong: '"A parent element always fully contains its children\'s margins"',
            right: 'Without a border, padding, or other boundary, a child\'s top or bottom margin can collapse straight through an otherwise-empty parent, visually pushing the parent itself rather than staying contained inside it. Adding any padding or border to the parent stops this.',
          },
          {
            wrong: '"width and height work the same on every element, regardless of display type"',
            right: 'Inline elements (display: inline, the default for <span> and <a>) ignore width, height, and vertical margin entirely — their size is determined purely by their content. inline-block restores support for all three while keeping the element flowing inline with surrounding text.',
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
            q: 'Explain the difference between box-sizing: content-box and border-box, and why nearly every real project resets to border-box.',
            a: 'Under content-box (the browser default), width and height set only the content area\'s size — padding and border are added on top, making the total rendered size larger than the declared width. Under border-box, width and height represent the TOTAL rendered size, with padding and border absorbed into it rather than added on top. Nearly every production codebase applies a global *, *::before, *::after { box-sizing: border-box; } reset because border-box\'s sizing behavior is far more predictable and matches what most engineers intuitively expect width to mean.',
          },
          {
            q: 'What is margin collapsing, and under what specific conditions does it happen?',
            a: 'When two adjacent vertical margins meet in normal document flow — a bottom margin touching a following sibling\'s top margin, or a child\'s margin touching its parent\'s edge with no border/padding/content between them — they collapse into a single margin equal to the LARGER of the two, rather than summing. It only applies to vertical margins in normal block flow; horizontal margins never collapse, and Flexbox/Grid children are unaffected.',
          },
          {
            q: 'How would you stop an unwanted parent-child margin collapse?',
            a: 'Give the parent any boundary that prevents the child\'s margin from passing through it — adding padding (even 1px) or a border to that side of the parent, or setting overflow: hidden, or using display: flow-root on the parent, which was specifically designed to establish a clean block-formatting-context boundary for exactly this purpose.',
          },
          {
            q: 'Why does setting width and height on a <span> have no visible effect by default?',
            a: 'A <span> is display: inline by default, and inline elements ignore width, height, and vertical (top/bottom) margin entirely — their box is sized purely by their content. Changing display to inline-block (or block) restores support for all three while, in inline-block\'s case, keeping the element flowing inline with surrounding text rather than forcing a line break.',
          },
          {
            q: 'Walk through, in order, the four layers of the CSS box model, from the inside out.',
            a: 'Content (the actual text/image/nested elements, sized by width/height), then padding (transparent space inside the border, which shares the element\'s background color), then border (a visible or invisible line around the padding), then margin (transparent space entirely outside the border, used only to push neighboring elements away and which is never filled by background color).',
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
        <SectionTitle>Box Model Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the box-sizing: border-box reset on a new project',
            a: 'Widths silently grow larger than expected the moment padding or a border is added, exactly as shown in the Real World example. Add the *, *::before, *::after { box-sizing: border-box; } reset at the very top of every new project\'s stylesheet, before writing any other rules.',
          },
          {
            q: 'Setting border-width and border-color but forgetting border-style',
            a: 'Border-style defaults to none, so no visible border renders at all without it, regardless of width or color. Use the border shorthand, or explicitly set border-style: solid (or another style) alongside the width and color.',
          },
          {
            q: 'Expecting vertical margins between siblings to add up',
            a: 'They collapse to the larger of the two values, not the sum, as covered fully in Part 04. If a fixed, predictable gap is needed regardless of collapsing, consider Flexbox with a gap property (covered later in this track), which is immune to margin collapsing entirely.',
          },
          {
            q: 'Setting a fixed height/width on an inline element and being confused it has no effect',
            a: 'Inline elements (span, a, and similar, by default) ignore width, height, and vertical margin entirely. Switch to display: inline-block or display: block if the element genuinely needs its own box dimensions.',
          },
          {
            q: 'Not noticing a child\'s margin has "escaped" through an empty parent',
            a: 'An unexpected gap appearing above a container, rather than inside it, is very often parent-child margin collapsing rather than a margin actually being applied to the parent itself. Add padding or a border to the parent to contain it, as shown in Part 04.',
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
            error: `An element's rendered width is visibly wider than the width declared in CSS`,
            cause: 'box-sizing: content-box (the browser default) adds padding and border on top of the declared width instead of absorbing them into it.',
            fix: 'Apply *, *::before, *::as { box-sizing: border-box; } — or set box-sizing: border-box on the specific element — so width represents the total rendered size.',
          },
          {
            error: `A multi-column row wraps onto a second line even though the columns' widths appear to add up correctly`,
            cause: 'Same root cause as above, at a layout scale — each column\'s true rendered width (including padding/border under content-box) exceeds its declared width, so the total exceeds the container and the last column overflows onto a new line.',
            fix: 'Add the border-box reset. Re-check the math with DevTools\' box model diagram, which always shows the real, final rendered size for each layer.',
          },
          {
            error: `An unexpected gap appears above a container element, rather than inside its top edge`,
            cause: 'Parent-child margin collapsing — a first child\'s top margin passed through an empty parent with no padding/border/content to contain it, visually pushing the parent down instead of creating space inside it.',
            fix: 'Give the parent a boundary: any top padding, a top border, overflow: hidden, or display: flow-root on the parent.',
          },
          {
            error: `Setting a background color on an element that appears to have no size at all`,
            cause: 'The element is display: inline with no text content, or has width/height set on an inline element where those properties are silently ignored.',
            fix: 'Confirm the element\'s display value in DevTools. Switch to inline-block or block if a fixed box size independent of content is genuinely required.',
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
        'Every element is a box built from four concentric layers, always in the same order: content, padding, border, margin.',
        'Padding and border take on the element\'s background color; margin never does — it is always transparent, pure spacing outside the box.',
        'box-sizing: content-box (the default) adds padding and border ON TOP of width/height; box-sizing: border-box absorbs them into it instead. Nearly every real project resets globally to border-box.',
        'Vertical margins between adjacent elements collapse to the LARGER value, not the sum — this applies to sibling-to-sibling and parent-to-first/last-child margins in normal document flow.',
        'Give a parent padding, a border, overflow: hidden, or display: flow-root to stop a child\'s margin from collapsing through it.',
        'Inline elements ignore width, height, and vertical margin entirely — use inline-block (or block) when an inline-flowing element needs real box dimensions.',
        'border-style must be set (directly or via the border shorthand) or no border renders at all, regardless of border-width and border-color.',
        'The padding/margin/border shorthand accepts 1-4 values; the 4-value form always goes clockwise from the top: top, right, bottom, left.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 19 covers colors, units, and typography — every unit type you will type in a real
          stylesheet, every color format, font stacks, and the fundamentals of font-weight and line-height.
        </p>
        <Link href="/learn/html-css/colors-units-typography" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 19 → Colors, Units & Typography
        </Link>
      </div>
    </LearnLayout>
  )
}
