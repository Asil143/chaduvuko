import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Backgrounds & Borders — HTML & CSS | Chaduvuko',
  description:
    'background-color/image/position/size/repeat and the background shorthand, linear-gradient() and radial-gradient() syntax, border-radius including elliptical corners, and box-shadow with inset, multiple stacked shadows, and blur/spread radius.',
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

export default function BackgroundsBorders() {
  return (
    <LearnLayout
      title="Backgrounds & Borders"
      description="background-color/image/position/size/repeat and the background shorthand, linear-gradient() and radial-gradient() syntax, border-radius including elliptical corners, and box-shadow — inset, multiple stacked shadows, and blur/spread."
      section="HTML & CSS — Module 22"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — background-color and background-image" />
        <SectionTitle>The Two Foundational Background Layers</SectionTitle>

        <Para>
          Every element can have a <code>background-color</code>, a <code>background-image</code>, or
          both stacked together — and when both are set, the color renders <strong>behind</strong> the
          image, visible only where the image has transparent pixels or fails to load. This makes{' '}
          <code>background-color</code> a genuinely useful fallback, not just a simpler alternative.
        </Para>

        <CodeBox label="Color as a fallback for a slow or failed image load">{`.hero {
  background-color: #1e293b;  /* shows instantly, and if the image fails */
  background-image: url("/hero-banner.jpg");
}`}</CodeBox>

        <Para>
          <code>background-image</code> also accepts more than a single image — a comma-separated list of
          images (and/or gradients, covered in Part 02) stacks them in the order listed, with the{' '}
          <strong>first</strong> one on top.
        </Para>

        <CodeBox label="Stacking multiple background images">{`.card {
  background-image:
    url("/pattern-overlay.png"),
    url("/photo-base.jpg");
  /* pattern-overlay.png renders ON TOP of photo-base.jpg */
}`}</CodeBox>

        <Callout type="info">
          Unlike an <code>&lt;img&gt;</code> element, a CSS background image is not part of the
          document&apos;s content — it is purely decorative, invisible to screen readers, and never
          appears in a right-click "Save Image As" the way a real <code>&lt;img&gt;</code> would.
          Meaningful, content-carrying images (a product photo, a diagram someone needs to understand the
          page) belong in <code>&lt;img&gt;</code> with real <code>alt</code> text — reserve background
          images for purely decorative use, exactly the distinction covered in the Images and Media
          module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — background-position, size, and repeat" />
        <SectionTitle>Controlling Exactly Where and How Large a Background Renders</SectionTitle>

        <Para>
          Three properties govern a background image&apos;s placement and scale independently of the
          element&apos;s own dimensions.
        </Para>

        <CodeBox label="background-position — keyword and length/percentage forms">{`.a { background-position: center; }              /* shorthand for "center center" */
.b { background-position: top right; }             /* keyword pairs */
.c { background-position: 20px 40px; }             /* offset from top-left corner */
.d { background-position: 50% 50%; }               /* percentage of the remaining space, not the element */`}</CodeBox>

        <CodeBox label="background-size — the value every developer reaches for constantly: cover">{`.hero {
  background-size: cover;
  /* scales the image to COMPLETELY fill the element, cropping whatever
     overflows — the single most common background-size value in real
     production CSS, used for full-bleed hero sections and card photos */
}

.logo-bg {
  background-size: contain;
  /* scales the image to fit ENTIRELY inside the element, preserving
     aspect ratio, with empty space left over if the ratios don't match
     — used when nothing may ever be cropped, e.g. a logo */
}

.tile {
  background-size: 200px 100px;   /* explicit width and height */
}

.icon {
  background-size: 50% auto;      /* one explicit, one auto-scaled to preserve ratio */
}`}</CodeBox>

        <CodeBox label="background-repeat — controlling tiling">{`.default    { background-repeat: repeat; }     /* tiles in both directions — the default */
.no-repeat  { background-repeat: no-repeat; }   /* shows the image exactly once */
.repeat-x   { background-repeat: repeat-x; }    /* tiles horizontally only */
.repeat-y   { background-repeat: repeat-y; }    /* tiles vertically only */
.space      { background-repeat: space; }       /* repeats with even gaps, never cropping a tile */`}</CodeBox>

        <Callout type="warning">
          <strong>cover and contain interact with background-position in a way that surprises people:</strong>{' '}
          with <code>background-size: cover</code>, the parts of the image that get cropped are
          determined by <code>background-position</code>. A portrait photo used as a wide banner with{' '}
          <code>cover</code> and the default <code>center center</code> position will crop the top and
          bottom evenly — often cutting off a person&apos;s head. Setting{' '}
          <code>background-position: top</code> instead keeps the top of the image intact and crops from
          the bottom only. This is a real, constant styling decision, not an edge case.
        </Callout>

        <SubTitle>The background shorthand</SubTitle>

        <Para>
          All of the above (plus a couple more properties not covered here, like{' '}
          <code>background-attachment</code>) can be combined into a single{' '}
          <code>background</code> shorthand declaration. The shorthand accepts most sub-properties in a
          fairly flexible order, with one strict rule: when both <code>background-size</code> and{' '}
          <code>background-position</code> are present, size must come immediately after position,
          separated by a forward slash.
        </Para>

        <CodeBox label="The background shorthand, in real use">{`.hero {
  background: url("/banner.jpg") center / cover no-repeat #1e293b;
  /*            image              position/size  repeat    color   */
}

/* Equivalent to writing all four properties separately: */
.hero-longhand {
  background-image: url("/banner.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #1e293b;
}`}</CodeBox>

        <Callout type="warning">
          <strong>The shorthand resets every background property it does not mention</strong> back to its
          default. Writing <code>background: red;</code> after an earlier{' '}
          <code>background-image</code> declaration silently wipes out the image — the shorthand does not
          merge with previously set longhand properties, it replaces the entire set. This is a very
          common bug when a later stylesheet rule (or a component library&apos;s reset) uses the
          shorthand and unintentionally clobbers an image set elsewhere.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — linear-gradient()" />
        <SectionTitle>linear-gradient() — Direction, Color Stops, and Hard Edges</SectionTitle>

        <Para>
          A gradient is not a separate CSS property — it is a special kind of value usable anywhere a{' '}
          <code>background-image</code> (or <code>border-image</code>, or a few other image-accepting
          properties) is expected. <code>linear-gradient()</code> blends colors along a straight line.
        </Para>

        <CodeBox label="The simplest form — two colors, top to bottom by default">{`.a {
  background: linear-gradient(#3b82f6, #1e3a8a);
  /* no direction given — defaults to "to bottom" */
}`}</CodeBox>

        <CodeBox label="Direction — keywords and precise angles">{`.b { background: linear-gradient(to right, #3b82f6, #1e3a8a); }
.c { background: linear-gradient(to bottom right, #3b82f6, #1e3a8a); }  /* diagonal, corner to corner */
.d { background: linear-gradient(45deg, #3b82f6, #1e3a8a); }            /* precise angle, 0deg = to top */
.e { background: linear-gradient(135deg, #3b82f6, #1e3a8a); }`}</CodeBox>

        <Para>
          The angle system is worth memorizing precisely, since it is easy to get backwards:{' '}
          <code>0deg</code> points to the top, and angles increase <strong>clockwise</strong> from there —{' '}
          <code>90deg</code> points right, <code>180deg</code> points down, <code>270deg</code> points
          left. This is the opposite rotation direction from standard mathematical angle convention,
          which is a genuinely common source of confusion.
        </Para>

        <SubTitle>Multiple color stops, and controlling exactly where each color sits</SubTitle>

        <CodeBox label="Explicit stop positions — precise control over where each color starts">{`.rainbow {
  background: linear-gradient(
    to right,
    red 0%,
    orange 20%,
    yellow 40%,
    green 60%,
    blue 80%,
    violet 100%
  );
}

.brand-fade {
  background: linear-gradient(
    to right,
    #f97316 0%,
    #f97316 40%,   /* solid orange for the first 40% */
    transparent 100%
  );
}`}</CodeBox>

        <CodeBox label="Hard color bands — no blending, using matching stop positions">{`.stripe {
  background: linear-gradient(
    to right,
    #f97316 0%,
    #f97316 50%,
    #1e293b 50%,   /* same position as the stop above = a hard edge, not a blend */
    #1e293b 100%
  );
  /* Two colors meeting at the exact same percentage produces a sharp
     line instead of a gradual blend — used constantly for diagonal
     "ribbon" banners and hard two-tone backgrounds. */
}`}</CodeBox>

        <Callout type="tip">
          A very common real pattern: layering a semi-transparent linear-gradient over a photo (using the
          multi-background stacking from Part 01) to guarantee white text stays readable regardless of
          the photo underneath — for example{' '}
          <code>{`background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7)), url("photo.jpg");`}</code>{' '}
          darkens only the bottom portion of the photo, exactly where caption text usually sits.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — radial-gradient()" />
        <SectionTitle>radial-gradient() — Circular and Elliptical Blends</SectionTitle>

        <Para>
          <code>radial-gradient()</code> blends colors outward from a center point instead of along a
          straight line — by default forming an ellipse that stretches to match the element&apos;s own
          aspect ratio, unless told otherwise.
        </Para>

        <CodeBox label="Basic radial-gradient() — default ellipse, centered">{`.a {
  background: radial-gradient(#3b82f6, #1e3a8a);
  /* an ellipse by default, centered, sized to reach the farthest corner */
}`}</CodeBox>

        <CodeBox label="Explicit shape, size keyword, and position">{`.circle-spotlight {
  background: radial-gradient(
    circle at top left,
    rgba(255,255,255,0.3),
    transparent 60%
  );
  /* "circle" forces a true circle instead of an ellipse.
     "at top left" moves the center point away from the default center. */
}

.contained-glow {
  background: radial-gradient(
    circle closest-side,
    #facc15,
    transparent
  );
  /* closest-side stops the gradient exactly at the nearest edge,
     rather than stretching to the farthest corner (the default,
     farthest-corner) */
}`}</CodeBox>

        <Para>
          The size keywords — <code>closest-side</code>, <code>farthest-side</code>,{' '}
          <code>closest-corner</code>, <code>farthest-corner</code> (the default) — control exactly how
          far the gradient extends before reaching its final color, which matters a great deal for
          spotlight and vignette effects where the falloff distance is the entire point.
        </Para>

        <Callout type="info">
          Gradients can also be combined with the multi-background stacking from Part 01 — a{' '}
          <code>radial-gradient()</code> as a subtle spotlight layered above a <code>linear-gradient()</code>{' '}
          base is a common technique for giving an otherwise flat colored section some visual depth
          without loading any actual image file at all, which keeps the page fast.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — border-radius" />
        <SectionTitle>border-radius — Including the Slash Syntax for Elliptical Corners</SectionTitle>

        <Para>
          <code>border-radius</code> rounds an element&apos;s corners. In its simplest form, one value
          applies the same radius to all four corners; up to four values can target each corner
          independently, always in the order top-left, top-right, bottom-right, bottom-left (clockwise
          from the top-left, matching the same order used by <code>margin</code> and{' '}
          <code>padding</code> shorthand).
        </Para>

        <CodeBox label="The standard forms">{`.a { border-radius: 8px; }                          /* all four corners */
.b { border-radius: 8px 16px; }                       /* top-left+bottom-right, top-right+bottom-left */
.c { border-radius: 8px 16px 8px 16px; }               /* all four, explicit, clockwise from top-left */
.d { border-radius: 50%; }                              /* a perfect circle, IF width equals height */
.pill { border-radius: 9999px; }                          /* larger than half the element = a full pill/capsule shape */`}</CodeBox>

        <SubTitle>Elliptical corners — the slash syntax</SubTitle>

        <Para>
          A single value per corner always produces a quarter-circle corner. To make a corner an{' '}
          <em>ellipse</em> instead — a different horizontal and vertical radius on the same corner —{' '}
          <code>border-radius</code> supports a second, less commonly seen syntax: two full sets of
          values separated by a forward slash, where the first set controls each corner&apos;s horizontal
          radius and the second controls each corner&apos;s vertical radius.
        </Para>

        <CodeBox label="The slash syntax — horizontal radii / vertical radii">{`.blob {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  /*              ^ horizontal radii, one per corner (TL TR BR BL)
                                        ^ vertical radii, one per corner (TL TR BR BL) */
}

/* A simpler, common real-world case — an elliptical "speech bubble" tail
   or an asymmetric decorative blob shape behind a hero image: */
.organic-shape {
  border-radius: 63% 37% 54% 46% / 43% 37% 63% 57%;
}`}</CodeBox>

        <Para>
          Read the slash syntax as two independent lists rather than trying to reason about it corner by
          corner in one pass: everything before the slash is exactly the same four-value (or fewer)
          horizontal-radius shorthand from the simple form; everything after the slash is the equivalent
          list for vertical radius. Each corner then combines its horizontal value with its vertical
          value into one ellipse quadrant.
        </Para>

        <Callout type="tip">
          The slash syntax is genuinely rare in everyday UI work — most real interfaces use the simple
          single-value or four-corner forms for straightforward rounded rectangles and pills. It becomes
          useful specifically for organic, blob-like decorative shapes (common in marketing/landing pages)
          and for certain speech-bubble or leaf-shaped UI accents where a uniform quarter-circle corner
          would look mechanical.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — box-shadow" />
        <SectionTitle>box-shadow — Offset, Blur, Spread, Inset, and Stacking Multiple Shadows</SectionTitle>

        <Para>
          <code>box-shadow</code> accepts up to five values in order: horizontal offset, vertical offset,
          blur radius (optional), spread radius (optional), and color. Understanding exactly what blur and
          spread each do independently is the difference between guessing at shadow values and deliberately
          designing depth.
        </Para>

        <CodeBox label="The five-value anatomy of a single shadow">{`.card {
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  /*           ^    ^    ^    ^    ^
               |    |    |    |    color (with alpha for a soft edge)
               |    |    |    spread radius — grows/shrinks the shadow's SIZE
               |    |    blur radius — softens the shadow's EDGE
               |    vertical offset — positive = shadow falls downward
               horizontal offset — positive = shadow falls rightward */
}`}</CodeBox>

        <CodeBox label="Blur alone vs. spread alone — they are not interchangeable">{`.soft-edge {
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.2);
  /* blur: 20px, spread: 0 — a large, soft, feathered shadow that
     fades out gradually. The shadow's outer boundary is still roughly
     the size of the element, just blurred past that edge. */
}

.bigger-shadow {
  box-shadow: 0 4px 4px 10px rgba(0,0,0,0.2);
  /* spread: 10px, blur: 4px — the shadow's SHAPE itself grows 10px
     larger on every side before any blur is applied, then only a
     little softening is added. Produces a noticeably bigger, harder-
     edged shadow rather than a soft glow. */
}`}</CodeBox>

        <SubTitle>inset — flipping the shadow to render inside the box</SubTitle>

        <CodeBox label="inset shadow — commonly used for a pressed/recessed look">{`.input-field {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  /* the "inset" keyword flips the shadow to render INSIDE the border,
     giving the element a pressed-in, recessed appearance — extremely
     common on text inputs to visually suggest a "well" the cursor sits in */
}`}</CodeBox>

        <SubTitle>Stacking multiple shadows — comma-separated, first on top</SubTitle>

        <Para>
          Exactly like <code>background-image</code>, <code>box-shadow</code> accepts a comma-separated
          list of shadows, all rendered together. Real production design systems use this constantly to
          build convincing elevation — combining a tight, dark, low-blur shadow close to the element with
          a much larger, lighter, higher-blur shadow further out, mimicking how real shadows behave under
          both direct and ambient light.
        </Para>

        <CodeBox label="A realistic layered elevation shadow — the technique behind most 'material' card shadows">{`.elevated-card {
  box-shadow:
    0px 1px 2px 0px rgba(0, 0, 0, 0.06),   /* tight, sharp — close contact shadow */
    0px 4px 8px 0px rgba(0, 0, 0, 0.08),    /* medium spread — mid-range depth */
    0px 12px 24px 0px rgba(0, 0, 0, 0.10);   /* wide, soft — ambient falloff */
}

/* A single box-shadow with a big blur value LOOKS similar at a glance,
   but reads as noticeably flatter and less "real" than three layered,
   progressively larger and softer shadows — this stacked technique is
   exactly what design systems like Material Design and most component
   libraries use under the hood for their elevation scale. */`}</CodeBox>

        <Callout type="warning">
          <strong>box-shadow does not affect layout at all</strong> — it never changes an element&apos;s
          width, height, or how surrounding elements are positioned, since it is purely a paint effect
          drawn outside (or inside, with <code>inset</code>) the border box. A large shadow can visually
          extend well past its element&apos;s edges and get silently clipped if any ancestor has{' '}
          <code>overflow: hidden</code> — a very common and confusing bug where a shadow "disappears" on
          one or more sides with no CSS error anywhere.
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
        <SectionTitle>A Design Review at an Austin E-Commerce Startup Catches a Cropped Hero Image</SectionTitle>

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
            Scenario — E-commerce startup, Austin · Design QA review
          </div>

          <Para>
            A front-end engineer ships the new homepage hero section: a full-width banner photo of a model
            wearing the season&apos;s new jacket line, with the headline and CTA button overlaid on top.
            It looks perfect on the engineer&apos;s laptop. In design QA the next morning, a teammate on a
            wide ultrawide monitor reports the model&apos;s face is completely cropped out of frame —
            only the jacket and shoulders are visible.
          </Para>

          <CodeBox label="The original hero CSS">{`.hero {
  height: 480px;
  background-image: url("/hero-model.jpg");
  background-size: cover;
  background-position: center;  /* the default center/center */
}`}</CodeBox>

          <SubSubTitle>What is actually happening</SubSubTitle>

          <Para>
            The photo is a tall portrait shot with the model&apos;s face in the upper third. On a normal
            laptop viewport, <code>cover</code> crops a moderate amount evenly from top and bottom around
            the default centered position, and the face survives inside the crop. On a much wider
            ultrawide screen, the hero&apos;s aspect ratio becomes far more extreme — to fully cover that
            much wider box at the same 480px height, <code>cover</code> has to crop dramatically more off
            the top and bottom, and with the position still centered, the face (positioned above center in
            the source photo) is exactly what gets cut.
          </Para>

          <CodeBox label="The fix — reposition, don't just crop blindly">{`.hero {
  height: 480px;
  background-image: url("/hero-model.jpg");
  background-size: cover;
  background-position: top center;  /* anchor the crop to the top instead */
}

/* A more robust long-term fix the team adopts afterward: combine a
   readability gradient with the photo, and rely on background-position
   percentages tuned specifically to keep the subject's face in frame
   across the widest realistic viewport, verified in QA at 3440px width: */
.hero-v2 {
  height: 480px;
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45)),
    url("/hero-model.jpg") top center / cover no-repeat;
}`}</CodeBox>

          <Para>
            The team also adds a design QA checklist item specifically for any full-bleed{' '}
            <code>background-size: cover</code> photo: verify the crop at the narrowest supported width,
            the widest realistic width, and confirm <code>background-position</code> was deliberately
            chosen based on where the photo&apos;s actual subject sits — not left at the default{' '}
            <code>center</code> out of habit. This exact bug — a subject cropped out of frame on unusually
            wide or narrow viewports — is one of the most common visual QA findings for any hero-image-
            driven marketing page.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Backgrounds and Borders</SectionTitle>

        {[
          {
            wrong: '"The background shorthand just adds whichever properties you specify, leaving the rest alone"',
            right: 'The background shorthand resets every background sub-property it does not mention back to its default — it does not merge with previously set longhand values. A later background: red; will silently remove an earlier background-image, which is a genuinely common source of "why did my image disappear" bugs.',
          },
          {
            wrong: '"background-size: cover and contain do basically the same thing"',
            right: 'cover scales the image to completely FILL the element, cropping whatever overflows the box — nothing is ever left empty, but content may be cut off. contain scales the image to fit ENTIRELY inside the element without cropping anything, which can leave visible empty space if the aspect ratios do not match. Choosing the wrong one is a very common source of unexpectedly cropped or letterboxed images.',
          },
          {
            wrong: '"border-radius: 50% always makes a perfect circle"',
            right: 'It only produces a perfect circle if the element\'s width and height are equal. On a non-square box, 50% produces an ellipse matching that box\'s own proportions, not a circle — a common surprise when a "circular" avatar turns out oval because its container\'s width and height were not actually equal.',
          },
          {
            wrong: '"A bigger blur value is the only way to make a box-shadow look bigger/stronger"',
            right: 'blur radius softens the shadow\'s EDGE; spread radius grows the shadow\'s actual SIZE before any blur is applied. Increasing blur alone produces a large but very faint, feathered shadow — increasing spread produces a shadow that is genuinely larger and firmer at the edges. Real elevation shadows typically stack several shadows with different blur/spread combinations rather than relying on one large blur value.',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between background-size: cover and background-size: contain?',
            a: 'cover scales the background image to completely fill the element\'s box, cropping any part of the image that overflows — the element is always fully covered, but content near the edges of the image may be cut off. contain scales the image to fit entirely within the box without any cropping, preserving the full image, which can leave visible empty space (background-color or blank) if the box and image aspect ratios differ.',
          },
          {
            q: 'How do blur radius and spread radius differ in box-shadow, and why does that distinction matter for building convincing elevation?',
            a: 'Blur radius softens and feathers the shadow\'s edge without changing its underlying size. Spread radius expands or contracts the shadow\'s actual shape outward or inward before blur is applied — a larger spread makes the shadow genuinely bigger, not just softer. Real elevation shadows in production design systems typically stack multiple box-shadows with different offset/blur/spread combinations — a tight, sharp shadow plus a larger, softer one — because a single large blur value alone tends to look flat rather than like real, layered ambient + direct lighting.',
          },
          {
            q: 'Explain the slash syntax in border-radius and when you would actually reach for it.',
            a: 'The slash syntax lets each corner have a different horizontal AND vertical radius, producing elliptical rather than perfectly circular quarter-corners: everything before the slash is a standard up-to-four-value list of horizontal radii (one per corner, clockwise from top-left), and everything after the slash is the equivalent list of vertical radii. It is genuinely rare in typical UI work — normal rounded rectangles and pills use the simple non-slash form — and mainly shows up for organic blob shapes or speech-bubble-style decorative elements.',
          },
          {
            q: 'Why might a box-shadow appear to be cut off or invisible on one side of an element?',
            a: 'box-shadow is a purely visual paint effect that never affects layout or an element\'s box dimensions — it can extend well beyond the element\'s own edges. If any ancestor between the element and the viewport has overflow: hidden (or auto/scroll with content that triggers clipping), the portion of the shadow extending past that ancestor\'s boundary gets clipped, even though there is no error anywhere in the CSS.',
          },
          {
            q: 'What happens if you set both background-image and a later background shorthand rule targeting the same element?',
            a: 'The background shorthand resets every background sub-property it does not explicitly mention, including background-image — it does not merge with previously declared longhand properties. If the shorthand rule does not include an image value, it silently removes the earlier background-image, regardless of specificity concerns, simply because the shorthand always sets every sub-property, using defaults for the ones it omits.',
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
        <SectionTitle>Background & Border Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using the background shorthand and accidentally erasing an image set elsewhere',
            a: 'Broken: an earlier rule sets background-image: url(...), and a later, more specific rule sets background: white; intending only to change the fallback color — but wipes the image entirely. Fixed: use background-color: white; specifically when only the color should change, reserving the shorthand for when every sub-property is being set deliberately.',
          },
          {
            q: 'Forgetting background-repeat: no-repeat and getting an unwanted tiled image',
            a: 'Broken: background-image: url("/logo.png"); with no repeat property set tiles the logo across the entire element by default. Fixed: add background-repeat: no-repeat; explicitly whenever the image should render exactly once.',
          },
          {
            q: 'Assuming border-radius: 50% always creates a circle',
            a: 'Broken: an avatar image inside a non-square container (e.g. width: 100px; height: 80px;) with border-radius: 50% renders as an oval, not a circle. Fixed: explicitly constrain the element to equal width and height (or use aspect-ratio: 1 / 1) before applying border-radius: 50%.',
          },
          {
            q: 'Writing a gradient angle backwards, assuming standard counter-clockwise math convention',
            a: 'Broken: expecting linear-gradient(90deg, ...) to point up, based on standard trigonometric angle convention. Fixed: remember CSS gradient angles start at 0deg pointing to the TOP and increase CLOCKWISE — 90deg points right, not up.',
          },
          {
            q: 'Not noticing a box-shadow is being silently clipped by an ancestor',
            a: 'Broken: a card\'s box-shadow only shows on some sides, with no visible CSS error, because a parent wrapper has overflow: hidden for an unrelated reason (e.g. clipping rounded corners). Fixed: locate the ancestor with overflow: hidden and either remove it, move it further up the tree, or apply the clipping in a way that does not also clip the shadow-bearing element\'s own overflow.',
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
            error: `A background-image that was working suddenly disappears after an unrelated CSS change`,
            cause: 'A later rule (often from a more specific selector, or one loaded later in the cascade) uses the background shorthand, which resets background-image to its default (none) since the shorthand rule did not mention an image.',
            fix: 'Search for any background: ... (shorthand) rule targeting the same element with equal or higher specificity, and either add the image back into that shorthand or switch the conflicting rule to the specific longhand property it actually intends to change.',
          },
          {
            error: `An image set via background-image renders tiled/repeated across the whole element unexpectedly`,
            cause: 'background-repeat defaults to repeat, tiling the image in both directions to fill any space larger than the image\'s natural size.',
            fix: 'Add background-repeat: no-repeat; whenever the image should appear exactly once, or use background-repeat: repeat-x / repeat-y if only one axis of tiling is wanted.',
          },
          {
            error: `A "circular" avatar or icon renders as an oval instead`,
            cause: 'border-radius: 50% produces a true circle only when the element\'s width equals its height — on a non-square box it produces an ellipse matching the box\'s own aspect ratio.',
            fix: 'Set explicit equal width/height, or use aspect-ratio: 1 / 1 on the element alongside border-radius: 50%.',
          },
          {
            error: `A box-shadow (or part of it) is invisible even though the CSS declaration looks correct in DevTools`,
            cause: 'box-shadow is a paint effect that can extend beyond the element\'s own box, and an ancestor with overflow: hidden, auto, or scroll clips anything rendered past its boundary — including a descendant\'s shadow.',
            fix: 'Locate the clipping ancestor and either remove/adjust its overflow property, or restructure the DOM so the shadow-bearing element is not a descendant of the clipping container.',
          },
          {
            error: `A gradient renders in the opposite direction from what was expected`,
            cause: 'CSS gradient angles start at 0deg pointing toward the top of the element and increase clockwise — the reverse of standard counter-clockwise mathematical angle convention many developers default to assuming.',
            fix: 'Use the directional keyword form (to right, to bottom left, etc.) when precision is not critical, since it reads unambiguously — or double-check the angle against the 0deg-is-up, clockwise rule when an exact angle is required.',
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
        'background-color renders behind background-image, making it a genuinely useful fallback for slow or failed image loads — not just a simpler alternative.',
        'background-size: cover fills the box completely and crops overflow; contain fits the entire image inside the box without cropping, potentially leaving empty space. Choosing the wrong one is a common source of unexpectedly cropped or letterboxed images.',
        'The background shorthand resets every sub-property it does not mention — a later background: color; can silently wipe out an earlier background-image.',
        'linear-gradient() angles start at 0deg pointing UP and increase clockwise — 90deg points right, the reverse of standard counter-clockwise math convention.',
        'border-radius: 50% only produces a true circle on a square element — on any other box it produces an ellipse matching that box\'s own aspect ratio.',
        'The border-radius slash syntax (horizontal radii / vertical radii) enables true elliptical corners, mainly used for organic blob shapes and decorative accents.',
        'box-shadow blur radius softens the edge; spread radius grows the shadow\'s actual size. Realistic elevation is usually built by stacking several shadows with different offset/blur/spread values, not one large blur.',
        'box-shadow never affects layout and can be silently clipped by any ancestor with overflow: hidden, auto, or scroll — a shadow "disappearing" on one side with no CSS error is almost always this.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 23 opens the CSS Layout phase — Flexbox, the complete guide. The main-axis vs cross-axis
          mental model, justify-content, align-items, flex-wrap, and exactly how flex-grow/shrink/basis
          distribute space, worked through with real numeric examples.
        </p>
        <Link href="/learn/html-css/flexbox-complete-guide" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 23 → Flexbox — The Complete Guide
        </Link>
      </div>
    </LearnLayout>
  )
}
