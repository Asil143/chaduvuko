import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Transforms (2D and 3D) — HTML & CSS | Chaduvuko',
  description:
    'translate, rotate, scale, skew, and 3D transforms with perspective — how modern interfaces move without touching layout.',
}

const C = '#4285f4'

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

export default function CssTransforms() {
  return (
    <LearnLayout
      title="CSS Transforms (2D and 3D)"
      description="translate, rotate, scale, skew, and 3D transforms with perspective — how modern interfaces move without touching layout."
      section="HTML & CSS — Module 33"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The transform Property" />
        <SectionTitle>transform — Moving, Rotating, and Resizing Without Touching Layout</SectionTitle>

        <Para>
          <code>transform</code> is a single CSS property that lets you translate (move), rotate, scale
          (resize), and skew an element — and, critically, it does all of this in a way that never
          affects the position or size of any other element on the page. This is the property&apos;s
          entire reason for existing: it operates on the element&apos;s already-computed box, as a
          purely visual overlay, rather than asking the browser to recalculate where anything belongs.
        </Para>

        <CodeBox label="The four core 2D transform functions">{`.box {
  transform: translateX(40px);   /* move right 40px */
  transform: translateY(-20px);  /* move up 20px */
  transform: rotate(15deg);      /* rotate clockwise 15 degrees */
  transform: scale(1.2);         /* grow to 120% of original size */
  transform: skewX(10deg);       /* slant along the x-axis */
}`}</CodeBox>

        <Para>
          Every one of these values describes a change relative to the element&apos;s own box — not to
          the page, not to its parent&apos;s content flow. An element moved 200px to the right with{' '}
          <code>translateX(200px)</code> still occupies its <em>original</em> space as far as every
          other element on the page is concerned; siblings do not shift to fill the gap, and nothing
          reflows around the new visual position. You will come back to exactly why that matters for
          performance in Part 07 of this module.
        </Para>

        <Callout type="info">
          You can combine multiple transform functions in a single declaration by space-separating them
          — <code>{`transform: translateX(20px) rotate(10deg) scale(1.1);`}</code> applies all three at
          once, in the order written. Order matters: transforms compose left to right, so{' '}
          <code>translate</code> then <code>rotate</code> produces a different result than{' '}
          <code>rotate</code> then <code>translate</code>, because each function operates on the
          coordinate space already modified by the ones before it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — translate()" />
        <SectionTitle>translate() — Moving an Element on the X and Y Axes</SectionTitle>

        <Para>
          <code>translate()</code> shifts an element from its normal position. It accepts one or two
          values — a single value moves along the x-axis only, while two values move along x and then y.
          Dedicated <code>translateX()</code> and <code>translateY()</code> functions exist for when you
          only need to move along one axis and want that intent to be explicit in the code.
        </Para>

        <CodeBox label="translate() forms">{`.a { transform: translate(50px);        }  /* 50px right, 0px down */
.b { transform: translate(50px, 20px);   }  /* 50px right, 20px down */
.c { transform: translateX(-30px);       }  /* 30px left */
.d { transform: translateY(100%);        }  /* down by 100% of the element's OWN height */`}</CodeBox>

        <Para>
          Percentage values in <code>translate</code> are resolved against the element&apos;s{' '}
          <strong>own</strong> box dimensions, not its parent&apos;s — this is different from how
          percentages behave almost everywhere else in CSS (width, padding, and top/left all resolve
          against the containing block). This detail unlocks a genuinely important pattern: perfectly
          centering an element of unknown size.
        </Para>

        <CodeBox label="Centering an element of unknown size with translate()">{`.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  /* top/left: 50% positions the TOP-LEFT CORNER at the center of the parent */
  transform: translate(-50%, -50%);
  /* translate(-50%, -50%) then shifts the box back by HALF ITS OWN WIDTH/HEIGHT,
     which centers it exactly — even if you never knew its size in advance */
}`}</CodeBox>

        <Para>
          Before Flexbox and Grid made centering trivial with <code>justify-content</code> and{' '}
          <code>align-items</code>, this <code>top: 50%; left: 50%; transform: translate(-50%, -50%);</code>{' '}
          trick was the standard way to center an absolutely positioned element without knowing its
          dimensions up front, and it still shows up constantly in real production code — particularly
          for modals, tooltips, and dropdown menus layered with <code>position: absolute</code> or{' '}
          <code>position: fixed</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — rotate(), scale(), skew()" />
        <SectionTitle>rotate(), scale(), and skew() — The Rest of the 2D Toolkit</SectionTitle>

        <Para>
          <code>rotate()</code> turns an element around a fixed point (by default, its exact center),
          measured in degrees — positive values rotate clockwise, negative values counter-clockwise.
        </Para>

        <CodeBox label="rotate()">{`.card:hover {
  transform: rotate(3deg);   /* a subtle tilt on hover, common on card UIs */
}

.spinner {
  transform: rotate(180deg); /* a half-turn, often paired with a transition or animation */
}`}</CodeBox>

        <Para>
          <code>scale()</code> resizes an element by a multiplier, not a fixed pixel amount — 1 means
          "no change," values above 1 grow the element, and values between 0 and 1 shrink it. A single
          value scales both axes equally; two values scale x and y independently.
        </Para>

        <CodeBox label="scale()">{`.button:hover { transform: scale(1.05); }   /* grow to 105% on hover — a very common micro-interaction */
.thumbnail:hover { transform: scale(1.15); } /* a stronger "zoom in" effect on image hover */
.dismissed { transform: scale(0);            /* shrink to nothing — often paired with opacity: 0 */ }
.stretched { transform: scale(2, 0.5);       /* double the width, halve the height */ }`}</CodeBox>

        <Para>
          <code>skew()</code> slants an element along one or both axes, distorting its rectangular shape
          into a parallelogram. It is used far less often than the other three in production UI, but it
          shows up in decorative section dividers, ticket-stub shapes, and some brand-heavy marketing
          pages.
        </Para>

        <CodeBox label="skew()">{`.ribbon {
  transform: skewX(-15deg);   /* slants the box along the x-axis */
}

.diagonal-divider {
  transform: skewY(-3deg);    /* a subtle diagonal section break, common in landing pages */
}`}</CodeBox>

        <Callout type="warning">
          Skewing a box distorts everything inside it too, including text — a skewed container full of
          text becomes genuinely harder to read, and browsers do not "un-skew" child content
          automatically. The common real-world pattern is to skew an empty decorative background
          element, then apply a matching but inverse skew (or no skew at all, with careful positioning)
          to a separate text layer sitting on top of it, so the readable content stays upright.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — transform-origin" />
        <SectionTitle>transform-origin — Changing the Point Everything Pivots Around</SectionTitle>

        <Para>
          Every transform function operates relative to a pivot point — by default, the exact center of
          the element (<code>50% 50%</code>). <code>transform-origin</code> lets you move that pivot
          point anywhere, which changes the visual result of <code>rotate()</code> and <code>scale()</code>{' '}
          dramatically, even though the transform function itself is unchanged.
        </Para>

        <CodeBox label="transform-origin changes what rotate() actually does">{`.default-rotate {
  transform: rotate(45deg);
  /* pivots around the CENTER by default — the box spins in place */
}

.corner-rotate {
  transform-origin: top left;
  transform: rotate(45deg);
  /* pivots around the TOP-LEFT CORNER instead — the box swings out and away,
     like a door hinged at that corner */
}

.custom-point {
  transform-origin: 20px 80%;
  transform: rotate(45deg);
  /* pivots around a specific point: 20px from the left, 80% down from the top */
}`}</CodeBox>

        <Para>
          <code>transform-origin</code> accepts keywords (<code>top</code>, <code>bottom</code>,{' '}
          <code>left</code>, <code>right</code>, <code>center</code>), percentages, or length values, and
          can take one, two, or (for 3D transforms, covered in Part 05) three values for x, y, and z. A
          common real use case: a hinged "flip open" card effect, where the pivot needs to sit at one
          edge rather than the center for the flip to look physically plausible.
        </Para>

        <CodeBox label="A hinge-style flip, pivoting from the left edge">{`.panel {
  transform-origin: left center;
  transition: transform 0.3s ease;
}

.panel.open {
  transform: rotateY(0deg);
}

.panel.closed {
  transform: rotateY(-90deg);
  /* with the origin at the left edge, this reads as the panel swinging shut
     like a physical door, hinged on its left side — not spinning around its center */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — 3D Transforms" />
        <SectionTitle>rotateX, rotateY, rotateZ, translateZ — Adding a Third Dimension</SectionTitle>

        <Para>
          Every transform covered so far operates on a flat, two-dimensional plane — the x and y axes of
          the screen. CSS also defines a set of 3D transform functions that introduce a third axis, z,
          which points directly out of (and into) the screen toward the viewer.
        </Para>

        <CodeBox label="The 3D rotation functions">{`.a { transform: rotateX(45deg); }  /* tips the TOP edge toward or away from you — like nodding "yes" */
.b { transform: rotateY(45deg); }  /* turns the LEFT/RIGHT edge toward or away from you — like shaking "no" */
.c { transform: rotateZ(45deg); }  /* identical to plain rotate() — spins flat, around the z-axis */
.d { transform: translateZ(50px); }  /* moves the element TOWARD the viewer, out of the screen */`}</CodeBox>

        <Para>
          <code>rotateZ()</code> is worth calling out specifically: it produces the exact same visual
          result as the 2D <code>rotate()</code> function, because rotating "around the z-axis" is
          precisely what a flat, on-screen rotation already is. <code>rotate()</code> is simply shorthand
          for <code>rotateZ()</code>. <code>rotateX()</code> and <code>rotateY()</code>, by contrast, tip
          the element into the third dimension — and by themselves, without the properties in Part 06,
          they render as a flat squash rather than a convincing 3D tilt, because the browser has no
          concept yet of how far away the "camera" is.
        </Para>

        <CodeBox label="A single combined transform statement">{`.card {
  transform: rotateY(25deg) translateZ(30px) scale(1.05);
  /* multiple 2D and 3D functions can be combined in one transform declaration,
     applied in the order written, exactly like the 2D-only examples earlier */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — perspective" />
        <SectionTitle>perspective and perspective-origin — Giving 3D Transforms Actual Depth</SectionTitle>

        <Para>
          A screen is fundamentally flat, so for <code>rotateX()</code> and <code>rotateY()</code> to
          look like they are genuinely tilting into three-dimensional space rather than just squashing
          flat, the browser needs to know how far away the imaginary viewer is standing. That distance is
          what the <code>perspective</code> property controls.
        </Para>

        <CodeBox label="perspective as a property on the PARENT element">{`.scene {
  perspective: 800px;
  /* 800px = the distance from the viewer to the z=0 plane.
     Smaller values (e.g. 300px) = closer viewer = more extreme, dramatic 3D distortion.
     Larger values (e.g. 2000px) = farther viewer = subtler, more realistic 3D depth. */
}

.card {
  transform: rotateY(35deg);
  /* NOW this genuinely looks like a card tilting away in 3D space,
     because .scene (its parent) established a perspective for it to tilt within */
}`}</CodeBox>

        <Para>
          <code>perspective</code> is set on the <strong>parent</strong> of the element being
          transformed, not on the transformed element itself — it establishes a 3D viewing context that
          every 3D-transformed child shares, which matters for scenes with multiple elements that need to
          look like they belong in the same consistent 3D space (a classic card-flip, for instance, where
          the front and back faces both need to obey the same perspective).
        </Para>

        <CodeBox label="perspective() as a function INSIDE transform — the alternative, per-element form">{`.card {
  transform: perspective(800px) rotateY(35deg);
  /* applies perspective to just THIS element's transform, rather than the parent.
     Equivalent result for a single element, but does not share a consistent
     3D space with sibling elements the way the parent-property form does. */
}`}</CodeBox>

        <Para>
          <code>perspective-origin</code> works alongside <code>perspective</code> the same way{' '}
          <code>transform-origin</code> works alongside <code>transform</code> — it moves the vanishing
          point (where the viewer is imagined to be looking from) away from the default center, which
          changes how the 3D depth appears to skew across the scene.
        </Para>

        <CodeBox label="A complete 3D flip-card built from perspective, transform-style, and rotateY">{`<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">Front</div>
    <div class="flip-card-back">Back</div>
  </div>
</div>`}</CodeBox>

        <CodeBox label="The CSS for the flip card">{`.flip-card {
  perspective: 1000px;   /* establishes the 3D scene on the outer wrapper */
}

.flip-card-inner {
  position: relative;
  transform-style: preserve-3d;   /* children keep their own 3D positions, instead of being flattened */
  transition: transform 0.6s;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;    /* hides a face when it has rotated to face away from the viewer */
}

.flip-card-back {
  transform: rotateY(180deg);     /* pre-rotated 180deg, so it faces the viewer once the parent flips */
}`}</CodeBox>

        <Callout type="tip">
          <code>transform-style: preserve-3d</code> and <code>backface-visibility: hidden</code> are the
          two properties that consistently trip people up the first time they build a 3D flip effect —
          without <code>preserve-3d</code>, the browser flattens child elements back into 2D and the
          effect silently stops looking three-dimensional; without <code>backface-visibility: hidden</code>,
          both faces of the card stay visible at once, showing through each other during the flip.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Why Transforms Are Cheap" />
        <SectionTitle>Why transform Never Triggers Layout — The Same Idea From the Transitions Module</SectionTitle>

        <Para>
          The CSS Transitions module (Module 31) introduced the idea that some CSS properties are cheap
          to animate and others are expensive, because of what the browser has to redo every time the
          property&apos;s value changes across a frame. This module is the concrete payoff of that idea:{' '}
          <code>transform</code> is, alongside <code>opacity</code>, one of the two properties every
          performance-conscious front-end engineer reaches for first, precisely because animating it
          never triggers layout.
        </Para>

        <Para>
          Recall the three stages a browser runs through to put pixels on screen: <strong>layout</strong>{' '}
          (compute the size and position of every box on the page), <strong>paint</strong> (fill in
          pixels — color, text, shadows, borders — for each box), and <strong>composite</strong> (combine
          the painted layers into the final image shown on screen). Changing a property like{' '}
          <code>width</code>, <code>top</code>, or <code>margin-left</code> forces the browser back to
          the very first stage — it does not know the new size or position of the box without
          recalculating layout for that element and, in many cases, everything around it too.
        </Para>

        <CodeBox label="An expensive way to move a box — forces layout on every frame">{`.box {
  position: relative;
  left: 0;
  transition: left 0.3s ease;
}
.box:hover {
  left: 200px;
  /* changing "left" changes the box's computed POSITION — the browser must
     re-run layout to know where this box (and potentially its siblings) now sit */
}`}</CodeBox>

        <CodeBox label="The cheap equivalent — never touches layout">{`.box {
  transform: translateX(0);
  transition: transform 0.3s ease;
}
.box:hover {
  transform: translateX(200px);
  /* the box's LAYOUT POSITION never changes — as far as layout is concerned,
     this box never moved. The GPU simply composites the already-painted box
     at a shifted position on screen, skipping layout and paint entirely */
}`}</CodeBox>

        <Para>
          Because <code>transform</code> (and <code>opacity</code>) operate purely at the composite
          stage, the browser can hand the actual animation work off to the GPU, which is built
          specifically for exactly this kind of "take an already-rendered layer and move/scale/fade it"
          operation. That is why <code>transform</code>-based animations stay smooth even on lower-end
          devices, while animating <code>width</code>, <code>top</code>, or <code>margin</code> can visibly
          stutter — the CPU is redoing layout and paint on every single frame, sixty times a second, for
          the entire duration of the animation.
        </Para>

        <Callout type="warning">
          This is precisely why the Transitions module recommended sticking to <code>transform</code> and{' '}
          <code>opacity</code> for anything that needs to animate smoothly, and treating properties like{' '}
          <code>width</code>, <code>height</code>, <code>top</code>/<code>left</code>, and{' '}
          <code>margin</code> as "expensive" animation targets to avoid where a transform-based
          alternative exists. Scaling a box with <code>transform: scale()</code> instead of animating its{' '}
          <code>width</code>/<code>height</code>, and moving a box with{' '}
          <code>transform: translate()</code> instead of animating <code>top</code>/<code>left</code>,
          are the two substitutions that come up constantly in real performance-focused code review.
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
        <SectionTitle>A Janky Product Carousel at an Austin E-Commerce Startup</SectionTitle>

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
            Scenario — E-commerce startup, Austin · Performance bug triage
          </div>

          <Para>
            An engineer at an Austin-based e-commerce company ships a product image carousel for the
            homepage — a row of cards that slides horizontally when the user clicks the arrow buttons.
            On the engineer&apos;s own high-end laptop, it looks smooth. Within a day of shipping, support
            tickets start coming in describing the carousel as "jumpy" and "laggy," almost exclusively
            from users on mid-range Android phones.
          </Para>

          <CodeBox label="The original implementation">{`.carousel-track {
  position: relative;
  left: 0;
  transition: left 0.4s ease;
}

.carousel-track.slide-1 { left: -320px;  }
.carousel-track.slide-2 { left: -640px;  }
.carousel-track.slide-3 { left: -960px;  }`}</CodeBox>

          <SubSubTitle>What the engineer finds in Chrome DevTools</SubSubTitle>

          <Para>
            Opening the Performance panel and recording a slide transition shows a wall of purple
            (layout) and green (paint) bars on every single frame of the animation, and the frame rate
            drops well below 60fps on throttled mid-tier hardware. The cause is exactly the pattern from
            Part 07: animating <code>left</code> forces the browser to recompute layout for the entire
            carousel track — and, because the track contains several image cards, the paint work for
            each of them — on every frame of a 400ms transition, sixty times a second.
          </Para>

          <CodeBox label="The fix — swap left for transform: translateX()">{`.carousel-track {
  transform: translateX(0);
  transition: transform 0.4s ease;
  will-change: transform;
}

.carousel-track.slide-1 { transform: translateX(-320px); }
.carousel-track.slide-2 { transform: translateX(-640px); }
.carousel-track.slide-3 { transform: translateX(-960px); }`}</CodeBox>

          <Para>
            With the change deployed, the same DevTools recording shows almost entirely teal (composite)
            bars — layout and paint barely appear at all, because the browser now just hands the already
            painted track layer to the GPU and slides it. The carousel holds a steady 60fps on the same
            throttled test device that previously dropped to the low teens. Nothing about the visual
            design changed — the entire fix was recognising that <code>left</code> was the wrong property
            to animate, and <code>transform: translateX()</code> was the cheap equivalent that
            accomplishes the identical visual movement.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Transforms</SectionTitle>

        {[
          {
            wrong: '"transform: translate() moves an element the same way changing top/left does"',
            right: 'Visually, the end result can look identical, but mechanically they are completely different. translate() never changes the element\'s position in the layout — other elements never move to accommodate it, and it never triggers a layout recalculation. Changing top/left genuinely repositions the box within layout, which is why it is far more expensive to animate.',
          },
          {
            wrong: '"rotateX() and rotateY() automatically look three-dimensional"',
            right: 'By themselves, without a perspective value set on a parent (or a perspective() function inline in the transform), rotateX() and rotateY() just squash the element flat — the browser has no concept of viewing distance to make the rotation look like it has real depth.',
          },
          {
            wrong: '"transform-origin only matters for rotate()"',
            right: 'It affects every transform function that has a meaningful pivot point, including scale() (an element scaled from a corner grows in a completely different direction than one scaled from its center) and skew(). It is not rotate-specific.',
          },
          {
            wrong: '"Since transform doesn\'t affect layout, it can\'t cause any performance problems at all"',
            right: 'Transforms are cheap relative to properties like width or top, but they are not entirely free — 3D transforms and large numbers of simultaneously transformed elements still consume GPU memory and compositing time, and can strain lower-end devices if overused. "Cheap" is relative to the layout-triggering alternative, not literally free.',
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
            q: 'Why does animating transform perform better than animating top/left or width/height?',
            a: 'transform (along with opacity) can be handled entirely at the compositing stage of rendering — the browser does not need to recompute layout or repaint the element\'s pixels, it just takes the already-rendered layer and moves/scales/rotates it, work the GPU is purpose-built for. Properties like top, left, width, and margin change the element\'s actual geometry, which forces the browser back through layout (and often paint) on every animation frame, which is comparatively expensive and can drop frame rate on less powerful devices.',
          },
          {
            q: 'What does transform-origin control, and what is its default value?',
            a: 'It sets the pivot point that transform functions like rotate() and scale() operate around. The default is 50% 50% — the exact center of the element. Changing it (for example to top left) changes how a rotation or scale visually behaves, even though the transform function itself is unchanged — e.g. a rotate(45deg) with transform-origin: top left swings the box like a door hinged at that corner, instead of spinning it in place.',
          },
          {
            q: 'Why do rotateX() and rotateY() often look flat unless you also set perspective?',
            a: 'A screen has no inherent depth — for a 3D rotation to look like it is genuinely tilting away from the viewer rather than squashing flat, the browser needs a defined viewing distance, which is what perspective supplies. perspective is typically set on the parent of the 3D-transformed element (establishing a shared 3D viewing context for all its children), or inline as a perspective() function within the transform itself for a single element.',
          },
          {
            q: 'What is the difference between rotate() and rotateZ()?',
            a: 'They produce identical results. rotate() is shorthand specifically for a rotation around the z-axis, which is exactly what a flat, on-screen 2D rotation already is — rotateZ() is the explicit 3D-function spelling of the same operation, typically used when it appears alongside other 3D functions like rotateX()/rotateY() for clarity.',
          },
          {
            q: 'How would you center an element with an unknown width and height using transform?',
            a: 'Position it with position: absolute (or fixed), set top: 50%; left: 50%; to place its top-left corner at the center of its containing block, then apply transform: translate(-50%, -50%). Because translate() percentages resolve against the element\'s OWN dimensions rather than its parent\'s, this shifts the box back by exactly half its own width and height, centering it precisely without ever needing to know its size in advance.',
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
        <SectionTitle>Transform Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            broken: `.tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  /* forgot the transform entirely */
}`,
            fixed: `.tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top/left: 50% alone only aligns the TOP-LEFT CORNER to the center —
     without the translate, the box is centered incorrectly, shifted
     down and to the right by half its own size */
}`,
          },
          {
            broken: `.card {
  transform: translateX(20px);
  transform: rotate(10deg);
  /* the SECOND transform declaration silently overwrites the first —
     only rotate(10deg) applies; the translateX is gone */
}`,
            fixed: `.card {
  transform: translateX(20px) rotate(10deg);
  /* multiple transform functions must be combined in ONE declaration,
     space-separated — transform is not additive across separate rules
     the way some other properties are */
}`,
          },
          {
            broken: `.panel {
  transform: rotateY(60deg);
  /* set directly on the element, with no perspective anywhere —
     renders as a flat horizontal squash, not a 3D tilt */
}`,
            fixed: `.scene {
  perspective: 800px;
}
.panel {
  transform: rotateY(60deg);
  /* now a genuine 3D tilt, because .scene (the parent) established
     a viewing distance for the rotation to happen within */
}`,
          },
          {
            broken: `.box:hover {
  width: 220px;
  height: 220px;
  transition: width 0.3s, height 0.3s;
  /* animating width/height forces layout recalculation on every frame */
}`,
            fixed: `.box:hover {
  transform: scale(1.1);
  transition: transform 0.3s;
  /* achieves a nearly identical visual "grow" effect at compositor
     cost instead of layout cost */
}`,
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--red)',
              marginBottom: 6, fontFamily: 'var(--font-mono)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Broken</div>
            <CodeBox>{item.broken}</CodeBox>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--accent)',
              marginBottom: 6, fontFamily: 'var(--font-mono)',
              letterSpacing: '.08em', textTransform: 'uppercase',
            }}>Fixed</div>
            <CodeBox>{item.fixed}</CodeBox>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Transforms — And Exactly Why</SectionTitle>

        {[
          {
            error: `An element with transform: rotate() or scale() unexpectedly clips its own contents, or a child's box-shadow gets cut off`,
            cause: 'Applying a transform to an element creates a new "containing block" for any descendant using position: fixed or position: absolute, and it also establishes a new stacking context — combined with overflow: hidden on an ancestor, transformed content can end up clipped in ways that were not happening before the transform was added.',
            fix: 'Check whether overflow: hidden is set on the transformed element or one of its ancestors, and whether any descendant relies on position: fixed expecting to escape to the viewport — a transformed ancestor will trap it instead. Move the transform to a wrapper element that does not need to contain fixed-position children, if that behavior is required.',
          },
          {
            error: `A 3D rotateY() transform renders as a flat squash instead of a visible 3D tilt`,
            cause: 'No perspective value is set anywhere in the element\'s ancestor chain (or inline via the perspective() function), so the browser has no viewing-distance information and cannot render genuine depth for the rotation.',
            fix: 'Add perspective: <value>px to the transformed element\'s direct parent (typical values range from 400px for a dramatic effect to 1500-2000px for a subtle one), or prepend perspective(800px) inside the transform declaration itself.',
          },
          {
            error: `Both faces of a "flip card" show through each other simultaneously during the flip animation`,
            cause: 'backface-visibility: hidden was not set on the front and back face elements, so the browser continues rendering a face even after it has rotated to point away from the viewer.',
            fix: 'Add backface-visibility: hidden to both the front and back face elements, and ensure the parent container has transform-style: preserve-3d so the 3D positioning of the faces is preserved rather than flattened.',
          },
          {
            error: `Console/DevTools: no explicit error, but a CSS transition on transform appears to "snap" instead of animating smoothly`,
            cause: 'Two separate transform declarations were written on the same selector (or across a class and an inline style with different specificity), and the later one silently overrides the earlier one entirely rather than merging — transform is not additive across rules.',
            fix: 'Combine every transform function needed for that state into a single space-separated transform declaration, e.g. transform: translateX(20px) rotate(10deg) scale(1.1);, rather than writing separate transform lines.',
          },
          {
            error: `A transformed element with hover-triggered scale() causes surrounding elements to flicker or "jump" when the mouse crosses its edge`,
            cause: 'Scaling an element grows its visually rendered box past its original layout boundary without changing its actual layout size, so the enlarged visual edge can re-trigger :hover on a sibling or itself in a way that causes rapid, flickering re-triggers right at the boundary.',
            fix: 'Apply the hover state (and its scale transform) to a wrapping element sized to accommodate the largest scaled state, or use a slightly smaller scale value, or add a small transition-delay to prevent rapid re-triggering right at the edge.',
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
        'transform moves, rotates, scales, and skews an element purely visually — it never affects the layout position or size of any other element on the page.',
        'translate() percentages resolve against the element\'s own dimensions, not its parent\'s — the basis of the classic top: 50%; left: 50%; transform: translate(-50%, -50%); centering trick.',
        'transform-origin sets the pivot point (default: center) that rotate() and scale() operate around — changing it changes the visual result of those functions dramatically.',
        'rotateX/rotateY/rotateZ add a third axis; rotateZ() is identical to plain rotate(). rotateX/rotateY need a perspective value somewhere in the ancestor chain to render with real visible depth.',
        'perspective is normally set on the parent of the transformed element, establishing a shared 3D viewing context; perspective() as a function inside transform applies it to a single element only.',
        'transform never triggers layout — the same cheap-vs-expensive-properties principle from the Transitions module (Module 31). Combined with opacity, it is the standard choice for smooth, GPU-composited animation.',
        'Combine multiple transform functions into a single space-separated declaration — writing separate transform rules causes the later one to silently overwrite the earlier one entirely.',
        'Building a real 3D flip effect requires transform-style: preserve-3d on the parent and backface-visibility: hidden on each face, not perspective and rotateY alone.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 34 covers the newest selectors that changed how CSS is written — :has() as the
          long-awaited native parent selector, :is()/:where() for simplifying repetitive selector lists,
          and container queries for genuinely component-based responsive design.
        </p>
        <Link href="/learn/html-css/modern-css-selectors" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 34 → Modern Selectors — :has, :is, :where, Container Queries
        </Link>
      </div>
    </LearnLayout>
  )
}
