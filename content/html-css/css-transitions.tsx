import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Transitions — HTML & CSS | Chaduvuko',
  description:
    'transition-property, duration, timing-function, and delay in depth — which properties animate cheaply versus expensively, and a real worked example showing the performance difference concretely.',
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

export default function CssTransitions() {
  return (
    <LearnLayout
      title="CSS Transitions"
      description="Smooth, performant state changes — transition-property, timing functions, and the properties that animate cheaply vs expensively."
      section="HTML & CSS — Module 31"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — transition-property and transition-duration" />
        <SectionTitle>Making a State Change Happen Gradually Instead of Instantly</SectionTitle>

        <Para>
          Without a transition, any CSS property change — a hover state flipping a background color, a
          class toggle changing an element&apos;s opacity — happens instantly, in a single frame. A CSS
          transition tells the browser to interpolate smoothly between the old value and the new value
          over a specified duration, instead of snapping directly to the end state.
        </Para>

        <CodeBox label="A button with no transition — the color change is instant">{`.button {
  background: #4285f4;
}

.button:hover {
  background: #2f5fc4;   /* snaps immediately on hover, no animation at all */
}`}</CodeBox>

        <CodeBox label="The same button, with a transition added">{`.button {
  background: #4285f4;
  transition-property: background;
  transition-duration: 200ms;
}

.button:hover {
  background: #2f5fc4;   /* now fades smoothly over 200ms instead of snapping */
}`}</CodeBox>

        <Para>
          <code>transition-property</code> names which CSS property (or properties) should animate when
          they change. <code>transition-duration</code> sets how long that animation takes. Both are
          declared on the element&apos;s <strong>base</strong> state, not on the <code>:hover</code> (or
          other) state that triggers the change — the transition is a standing instruction that applies
          whenever the property&apos;s value changes for any reason, not just specifically on hover.
        </Para>

        <Callout type="info">
          A transition fires whenever the computed value of the watched property changes — through a{' '}
          <code>:hover</code>, <code>:focus</code>, or <code>:active</code> pseudo-class, a class toggled
          by JavaScript, a media query boundary being crossed, or even a custom property (Module 30)
          being updated at runtime. It is not exclusively a hover effect, even though hover is the most
          common example used to teach it.
        </Callout>

        <SubTitle>Transitioning multiple properties at once</SubTitle>

        <Para>
          <code>transition-property</code> accepts a comma-separated list, or the keyword{' '}
          <code>all</code>, to watch every animatable property on the element at once.
        </Para>

        <CodeBox label="Multiple explicit properties vs the all keyword">{`/* Explicit — animates exactly these two properties */
.card {
  transition-property: transform, box-shadow;
  transition-duration: 200ms;
}

/* all — animates every property that changes, whatever it is */
.card {
  transition-property: all;
  transition-duration: 200ms;
}`}</CodeBox>

        <Callout type="warning">
          <strong>transition-property: all is convenient but imprecise.</strong> It transitions every
          single property that changes, including ones you may not have intended to animate at all — a{' '}
          <code>display</code> or <code>grid-template-columns</code> change picked up incidentally by a
          later rule can produce a visually broken or unexpectedly slow transition. Listing properties
          explicitly is more verbose but keeps the animation&apos;s scope intentional and predictable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — transition-timing-function" />
        <SectionTitle>Easing — Controlling How the Animation Feels, Not Just How Long It Takes</SectionTitle>

        <Para>
          <code>transition-duration</code> controls how long an animation takes; it says nothing about
          the <em>rate</em> it moves at during that time. <code>transition-timing-function</code>{' '}
          controls that rate — whether the motion starts slow and speeds up, starts fast and eases out, or
          moves at a perfectly constant speed throughout. This single property is responsible for a huge
          amount of how "polished" or "cheap" an interface feels, independent of everything else about it.
        </Para>

        <CodeBox label="The built-in timing function keywords">{`.el { transition-timing-function: linear; }       /* constant speed, no easing at all */
.el { transition-timing-function: ease; }          /* the default — slow start, fast middle, slow end */
.el { transition-timing-function: ease-in; }        /* slow start, then accelerates — never eases out */
.el { transition-timing-function: ease-out; }       /* starts fast, decelerates into the end state */
.el { transition-timing-function: ease-in-out; }    /* slow start AND slow end, faster in the middle */`}</CodeBox>

        <Para>
          <code>linear</code> almost always feels mechanical and slightly wrong for UI motion — real
          physical objects do not start and stop moving instantaneously, they accelerate and decelerate.{' '}
          <code>ease-out</code> is generally the most natural choice for anything entering or appearing
          on screen (it arrives with some initial speed and settles gently), while <code>ease-in</code>{' '}
          suits things leaving the screen (they build up speed as they exit).
        </Para>

        <SubTitle>cubic-bezier() — full manual control over the curve</SubTitle>

        <Para>
          Every keyword above is actually shorthand for a specific <code>cubic-bezier()</code> curve
          under the hood. Writing <code>cubic-bezier()</code> directly gives full control over the exact
          shape of the easing curve, defined by two control points.
        </Para>

        <CodeBox label="A custom easing curve — a common 'snappy' UI curve">{`.button {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  /* A curve that slightly overshoots past 100% before settling back —
     produces a subtle bounce-like snap, popular in modern UI micro-interactions. */
}`}</CodeBox>

        <Callout type="tip">
          You rarely need to hand-write a <code>cubic-bezier()</code> curve from scratch. Browser DevTools
          (Chrome and Firefox both) include a visual curve editor directly in the Styles panel when you
          click a <code>cubic-bezier()</code> value, and easing-curve reference sites like easings.net
          provide named, pre-tuned curves for common feelings — "snappy," "gentle," "bouncy" — that you can
          copy directly into your CSS.
        </Callout>

        <SubTitle><code>steps()</code> — discrete, non-smooth motion</SubTitle>

        <Para>
          A less common but genuinely useful timing function, <code>steps(n)</code> divides the
          transition into <code>n</code> discrete jumps instead of a continuous curve — used for effects
          like a sprite-sheet animation or a deliberately mechanical, "ticking" motion rather than a
          smooth glide.
        </Para>

        <CodeBox label="steps() — jumping between discrete positions">{`.loading-dots {
  transition: background-position 800ms steps(4);
  /* Jumps through 4 distinct positions rather than sliding smoothly between them */
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — transition-delay and the Shorthand" />
        <SectionTitle>Delaying the Start, and Writing All Four Properties at Once</SectionTitle>

        <Para>
          <code>transition-delay</code> adds a pause before the transition begins, after the property
          change has already happened. It is used less often than duration or timing-function, but has
          real, specific uses — most commonly staggering multiple elements so they do not all animate in
          perfect, slightly artificial-looking unison.
        </Para>

        <CodeBox label="Staggering a list of items with increasing delays">{`.list-item {
  opacity: 0;
  transition: opacity 300ms ease-out;
}

.list-item.is-visible {
  opacity: 1;
}

.list-item:nth-child(1) { transition-delay: 0ms; }
.list-item:nth-child(2) { transition-delay: 60ms; }
.list-item:nth-child(3) { transition-delay: 120ms; }
.list-item:nth-child(4) { transition-delay: 180ms; }
/* Each item fades in slightly after the one before it — a common
   "cascading reveal" pattern for lists and cards entering the viewport. */`}</CodeBox>

        <SubTitle>The transition shorthand</SubTitle>

        <Para>
          In real, everyday CSS, all four longhand properties are almost always combined into the single{' '}
          <code>transition</code> shorthand, in a fixed order: property, duration, timing-function, delay.
        </Para>

        <CodeBox label="Longhand vs shorthand — identical result">{`/* Longhand — four separate declarations */
.card {
  transition-property: transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  transition-delay: 0ms;
}

/* Shorthand — one line, same result */
.card {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}`}</CodeBox>

        <Para>
          Notice the shorthand needs the full <code>property duration timing-function</code> group
          repeated per property when they need different durations or curves — there is no way to
          "share" a single duration across a comma-separated shorthand list where each property genuinely
          needs its own timing. If every property shares the same duration and timing function, listing
          them together under <code>transition-property</code> is cleaner, as shown in Part 01.
        </Para>

        <CodeBox label="Different properties genuinely needing different timings">{`.dropdown {
  transition: opacity 150ms ease-out, transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Opacity fades quickly and linearly-ish; the transform gets a longer,
     slightly bouncy curve — two independently tuned animations on one element. */
}`}</CodeBox>

        <Callout type="warning">
          The order inside each shorthand group matters for parsing: the first time-value encountered is
          always treated as <code>duration</code>, and the second (if present) as <code>delay</code>.{' '}
          <code>transition: transform 200ms 100ms ease-out;</code> is genuinely valid and means a 200ms
          duration with a 100ms delay — but writing the numbers in the wrong intended order is a real,
          easy-to-make mistake that silently produces the wrong timing rather than an error.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — What the Browser Actually Does When a Property Changes" />
        <SectionTitle>Layout, Paint, and Composite — The Three Stages a Property Change Can Trigger</SectionTitle>

        <Para>
          Not every animatable CSS property costs the same amount of work for the browser to update on
          every single frame of a transition. To understand why, it helps to know the three broad stages
          a browser goes through whenever something on the page visually changes.
        </Para>

        <CodeBox label="The three stages, in order">{`1. LAYOUT (also called "reflow")
   Recalculates the geometry — size and position — of the changed element
   AND potentially every element affected by that change (siblings, parents,
   anything whose position depends on it).

2. PAINT
   Fills in the actual pixels — colors, shadows, borders, text — for
   every element whose visual appearance changed, onto one or more layers.

3. COMPOSITE
   Combines all the already-painted layers together on the GPU and
   displays the final result on screen.`}</CodeBox>

        <Para>
          A property change can trigger all three stages, just paint and composite, or — the cheapest
          case — composite alone. The fewer stages a change requires, the less work the browser (and
          critically, the main thread, which is also busy running your JavaScript) has to redo on every
          single frame of an animation, typically 60 times per second for a smooth 60fps transition.
        </Para>

        <SubTitle>Properties that trigger layout — the expensive path</SubTitle>

        <CodeBox label="Layout-triggering properties — animate these and every frame recalculates geometry">{`width, height
top, left, right, bottom   (when positioned)
margin, padding
font-size
border-width`}</CodeBox>

        <Para>
          Changing any of these forces the browser to recompute the geometry of the changed element and
          potentially cascade that recalculation to surrounding elements too — a sibling that sits below
          an element growing in <code>height</code> has to be re-measured and repositioned on every single
          frame, not just once.
        </Para>

        <SubTitle>Properties that skip layout AND paint — the cheap path</SubTitle>

        <CodeBox label="transform and opacity — composite-only, GPU-accelerated">{`transform   (translate, scale, rotate, skew)
opacity`}</CodeBox>

        <Para>
          <code>transform</code> and <code>opacity</code> are the two properties modern browsers can
          animate using only the composite stage, entirely on the GPU, without touching layout or paint at
          all. The browser paints the element&apos;s pixels onto its own layer once, and every subsequent
          animation frame is purely a GPU operation — repositioning, scaling, or fading an
          already-painted layer — which is dramatically cheaper than repainting or re-laying-out the page
          on every frame.
        </Para>

        <Callout type="tip">
          <strong>The practical rule:</strong> whenever a movement, scale, or fade effect can be expressed
          with <code>transform</code> and <code>opacity</code> instead of <code>top</code>/<code>left</code>{' '}
          or <code>width</code>/<code>height</code>, prefer the transform/opacity version — it is the
          single highest-leverage performance decision in everyday CSS animation work.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Same Hover Effect, Built Both Ways" />
        <SectionTitle>A Concrete Comparison — Sliding a Card on Hover</SectionTitle>

        <Para>
          The difference between the expensive and cheap paths is easiest to see by building the exact
          same visual effect twice — a card that lifts slightly and shifts upward when hovered — once
          using layout-triggering properties, and once using only <code>transform</code>.
        </Para>

        <CodeBox label="The expensive version — animating top and box-shadow's spread directly">{`.card {
  position: relative;
  top: 0;
  transition: top 200ms ease-out, box-shadow 200ms ease-out;
}

.card:hover {
  top: -6px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
/* Every single frame of this 200ms transition forces a layout
   recalculation, because "top" is a positioned offset that affects
   the element's geometry — the browser has to re-measure and
   potentially reposition surrounding content on every frame. */`}</CodeBox>

        <CodeBox label="The cheap version — the identical visual result, using transform">{`.card {
  transform: translateY(0);
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
/* translateY moves the element on the GPU compositor layer alone —
   no layout recalculation on any frame. Visually pixel-identical
   to the "top" version above. */`}</CodeBox>

        <Para>
          Both produce the exact same on-screen motion — a 6px upward shift with a growing shadow. The
          difference is entirely in what the browser has to redo, 60 times a second, to render it. On a
          single card on a simple page, this difference may be invisible to the eye. On a real production
          page with dozens of animating cards, list items, or a heavy, complex DOM around the animating
          element, the layout-triggering version measurably drops frames and starts to visibly stutter,
          while the transform version keeps running smoothly, because it never leaves the GPU compositor
          at all.
        </Para>

        <Callout type="warning">
          <strong>box-shadow itself is not composite-only</strong> — animating it still requires a repaint
          on every frame, since the shadow&apos;s pixels genuinely have to be redrawn as it grows. It is,
          however, considerably cheaper than a layout-triggering change, since paint alone is faster than
          layout followed by paint. For the smoothest possible result, some production interfaces fake a
          growing shadow using a second, absolutely positioned pseudo-element whose <code>opacity</code>{' '}
          transitions instead — trading a small amount of markup complexity for a fully composite-only
          animation.
        </Callout>

        <SubTitle>How to check this yourself, in DevTools</SubTitle>

        <Para>
          Chrome DevTools&apos; Performance panel, or the dedicated "Rendering" tab&apos;s "Paint
          flashing" and "Layer borders" overlays, make this difference directly visible — layout-triggered
          animations show up as repeated purple "Layout" blocks in a recorded performance trace, and
          repainted regions flash green under Paint Flashing on every frame. A <code>transform</code>-only
          animation shows almost none of either, confirming it is staying entirely on the compositor.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Transitioning on Class Toggles and JavaScript-Driven State" />
        <SectionTitle>Transitions Are Not Only for :hover</SectionTitle>

        <Para>
          Everything covered so far has used <code>:hover</code> as the trigger, since it is the simplest
          way to demonstrate a transition — but a transition fires from any change to the watched
          property&apos;s computed value, including one driven entirely by JavaScript toggling a class.
        </Para>

        <CodeBox label="A modal that transitions in when a class is added">{`.modal {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
  transition: opacity 200ms ease-out, transform 200ms ease-out;
  pointer-events: none;
}

.modal.is-open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}`}</CodeBox>

        <CodeBox label="Toggling the class from JavaScript">{`const modal = document.querySelector('.modal')
const openButton = document.querySelector('#open-modal')

openButton.addEventListener('click', () => {
  modal.classList.add('is-open')
})`}</CodeBox>

        <Para>
          The CSS has no idea a button was clicked — it only knows <code>opacity</code> and{' '}
          <code>transform</code> changed value, and animates that change exactly the way it would for a
          hover state. This separation — JavaScript only ever toggles a class or a data attribute, and CSS
          owns every detail of how that state change actually looks — is the standard, maintainable
          pattern for JavaScript-driven UI animation, keeping animation timing and easing entirely inside
          CSS rather than duplicated into JavaScript.
        </Para>

        <SubTitle>The transitionend event</SubTitle>

        <Para>
          JavaScript can listen for the exact moment a CSS transition finishes, which matters when
          something needs to happen only after the animation completes — removing an element from the DOM
          after it has fully faded out, for example, rather than yanking it away mid-animation.
        </Para>

        <CodeBox label="Removing an element only after its exit transition finishes">{`const toast = document.querySelector('.toast')

function dismissToast() {
  toast.classList.add('is-leaving')   // triggers the CSS transition

  toast.addEventListener('transitionend', () => {
    toast.remove()   // only runs once the fade-out has actually finished
  }, { once: true })
}`}</CodeBox>

        <Callout type="warning">
          <code>transitionend</code> fires once <em>per animated property</em>, not once per element — if
          both <code>opacity</code> and <code>transform</code> are transitioning together, the handler can
          run twice for the same visual animation. Check <code>event.propertyName</code> inside the
          handler if you need to act on the completion of one specific property rather than the first one
          that happens to finish.
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
        <SectionTitle>A Janky Product Grid at a Chicago E-Commerce Company</SectionTitle>

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
            Scenario — E-commerce, Chicago · Performance bug triage
          </div>

          <Para>
            A Chicago-based e-commerce company ships a product grid where each card scales up slightly on
            hover to draw attention. It looks smooth in isolated design review with three sample products,
            and ships. Once live, customer support starts receiving complaints of the grid feeling
            "laggy" and "stuttery" specifically on the category pages showing 40+ products at once — never
            on the pages with only a handful.
          </Para>

          <CodeBox label="The original hover effect, as shipped">{`.product-card {
  width: 240px;
  transition: width 180ms ease-out, height 180ms ease-out;
}

.product-card:hover {
  width: 252px;
  height: calc(100% + 12px);
  z-index: 2;
}`}</CodeBox>

          <SubSubTitle>What the front-end engineer finds using DevTools' Performance panel</SubSubTitle>

          <Para>
            Recording a hover interaction on the live category page shows a wall of purple "Layout"
            entries on every single frame of the 180ms transition — exactly the layout-triggering pattern
            from Part 04. Because <code>width</code> and <code>height</code> are geometry properties, every
            frame forces the browser to recompute the size of the hovered card <em>and</em> re-measure
            where every other card in the grid should sit relative to it, since a CSS grid or flex layout
            has to account for a sibling changing size. With 40+ cards on the page, that layout
            recalculation is genuinely expensive per frame — and directly explains why the effect felt
            fine with 3 sample cards but stutters visibly with a full real grid.
          </Para>

          <CodeBox label="The fix — the identical visual result via transform, with a fixed z-index instead of a size change">{`.product-card {
  transition: transform 180ms ease-out, box-shadow 180ms ease-out;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  z-index: 2;
}
/* scale() achieves the same "grows slightly" effect purely on the
   compositor — no width/height change, so no layout recalculation,
   and no effect on any sibling card's position at all. */`}</CodeBox>

          <Para>
            After the fix, the Performance panel recording for the same interaction shows no layout
            entries at all during the hover transition — only composite operations. The grid feels
            identically smooth whether it shows 3 products or 300, because the cost of the animation no
            longer scales with how many sibling elements are on the page at all. This exact
            diagnosis — an animation that "worked in the design mockup" but stutters specifically once
            real page density is involved — is one of the most common front-end performance investigations
            in production e-commerce and content-heavy interfaces.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Transitions</SectionTitle>

        {[
          {
            wrong: '"transition: all is simpler and basically the same as listing properties explicitly"',
            right: 'all also animates properties you never intended to animate at all, including ones changed incidentally by an unrelated rule elsewhere — this can produce visually broken or surprisingly slow transitions that are hard to trace back to their cause. Listing properties explicitly is more verbose but keeps the animation\'s scope predictable and intentional.',
          },
          {
            wrong: '"Since transform and opacity are \'GPU-accelerated,\' you can animate as many elements as you want with no performance cost"',
            right: 'Composite-only animation is dramatically cheaper than layout-triggering animation, but it is not free — each animating element still needs to be promoted to its own GPU layer, and an excessive number of simultaneously animating layers has its own memory and compositing cost. It is a large improvement, not a limitless one.',
          },
          {
            wrong: '"A transition and a CSS animation (@keyframes) are basically interchangeable — pick whichever"',
            right: 'A transition only ever describes the path between exactly two states — a start and an end — triggered by a property change. It has no concept of multiple intermediate steps, looping, or running without an external trigger. Genuinely multi-step or self-running motion needs @keyframes, covered in the next module.',
          },
          {
            wrong: '"transitionend fires exactly once per element, right when its animation visually finishes"',
            right: 'It fires once per transitioning property on that element, not once per element overall — an element transitioning both opacity and transform can fire the event twice for what looks like a single animation. Check event.propertyName if the handler needs to run only once, for a specific property.',
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
            q: 'Explain the three stages a browser goes through when a visual property changes, and why they matter for animation performance.',
            a: 'Layout (recalculating the size/position of the changed element and anything affected by it), Paint (redrawing the actual pixels for anything whose appearance changed), and Composite (combining already-painted layers on the GPU and displaying the result). A property change can require all three, just the last two, or composite alone — the fewer stages required, the less work the browser redoes on every single animation frame, which is the difference between a smooth 60fps transition and a visibly stuttering one.',
          },
          {
            q: 'Why are transform and opacity specifically called out as "cheap" to animate compared to properties like width, height, top, or left?',
            a: 'transform and opacity can be animated entirely at the composite stage, on the GPU, without triggering layout or paint at all — the browser paints the element to its own layer once, and every subsequent frame is purely a GPU repositioning/scaling/fading operation on that already-painted layer. width, height, top, and left are geometry properties, so animating them forces a full layout recalculation on every single frame, which can also cascade to recalculating the position of sibling and parent elements.',
          },
          {
            q: 'Walk through how you would rewrite a hover effect that changes an element\'s width to instead use transform, and why that matters for a page with many similar elements.',
            a: 'Replace an explicit width/height change with an equivalent transform: scale() — for example, width: 252px on a 240px-wide card can become transform: scale(1.05) for a visually near-identical growth effect. This matters disproportionately as the number of similar elements on the page grows, because a layout-triggering animation forces every sibling in the same layout context to be re-measured on every frame, so its cost scales with page density; a transform-based version stays purely on the compositor and its cost stays flat regardless of how many other elements are on the page.',
          },
          {
            q: 'What is the difference between transition-duration and transition-timing-function, and why does swapping ease for linear usually make UI motion feel worse?',
            a: 'transition-duration controls how long the animation takes in total; transition-timing-function controls the rate of change during that time — whether it accelerates, decelerates, or moves at a constant speed. linear moves at a perfectly constant rate throughout, which reads as mechanical, since real physical motion accelerates and decelerates rather than starting and stopping instantly. ease (the default) and ease-out generally read as more natural for UI motion because they mimic that acceleration/deceleration.',
          },
          {
            q: 'How would you diagnose whether a specific CSS transition is causing a layout recalculation on every frame, using browser DevTools?',
            a: 'Record the interaction in Chrome DevTools\' Performance panel and look for repeated purple "Layout" (or "Recalculate Style" / "Layout") entries occurring once per animation frame during the transition\'s duration — their presence indicates the animated property is layout-triggering. The Rendering tab\'s "Paint flashing" overlay is a faster, if less precise, visual check: regions that flash green on every frame are being repainted, which layout-triggering and paint-triggering properties both cause, while a purely composite-only animation (transform/opacity) shows almost no flashing at all.',
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
        <SectionTitle>Transition Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            q: 'Declaring the transition on the :hover rule instead of the base rule',
            a: 'transition: background 200ms; written only inside .button:hover applies the transition timing to the moment you hover in, but the moment you hover OUT (back to the base state, where no transition is declared) snaps instantly instead of fading. Declare the transition on the base selector so it governs the change in both directions.',
          },
          {
            q: 'Animating box-shadow\'s spread/blur directly on hover-heavy elements at scale',
            a: 'box-shadow requires a repaint on every frame since its pixels genuinely change shape — cheap for a single element, but adds up across dozens of simultaneously animating cards. Consider a second, absolutely positioned pseudo-element whose opacity transitions instead, keeping the effect on the composite-only path.',
          },
          {
            q: 'Using transition: all as a default habit rather than a deliberate choice',
            a: 'It silently animates any property that happens to change for any reason, including ones from an unrelated rule elsewhere in the cascade, producing unpredictable animations that are hard to trace. List the specific properties you actually intend to animate.',
          },
          {
            q: 'Forgetting that transitioning height: auto does not work as expected',
            a: 'CSS cannot interpolate between a fixed height and the keyword auto — animating to/from auto snaps instantly instead of transitioning smoothly, since auto is not a specific numeric value the browser can tween toward. Common workarounds include transitioning max-height to a generous fixed value, or using the newer grid-template-rows: 0fr → 1fr technique.',
          },
          {
            q: 'Assuming a very short transition-duration (like 50ms) always feels "snappier"',
            a: 'Extremely short durations can read as an instant, jarring flicker rather than a perceptible animation, especially combined with ease-in-out curves that spend proportionally more time easing than moving. Most UI micro-interactions land comfortably between 150ms and 300ms — long enough to register as motion, short enough to not feel sluggish.',
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
        <SectionTitle>Rendering Bugs CSS Transitions Produce — And Exactly Why</SectionTitle>

        {[
          {
            error: `A property change happens instantly with no animation, despite a transition being declared`,
            cause: 'The transition is declared only on the triggering pseudo-class (e.g. :hover) rather than the base state, so it only governs one direction of the change — or transition-property does not actually list the property that changed (a typo, or the wrong property name entirely).',
            fix: 'Move the transition declaration to the element\'s base selector so it governs the change in both directions, and double-check transition-property names the exact property being changed (or is set to all).',
          },
          {
            error: `An animation visibly stutters or drops frames, especially with many elements on screen`,
            cause: 'The transitioning property triggers a layout recalculation (width, height, top, left, margin, etc.), forcing the browser to re-measure geometry on every single animation frame — a cost that increases with the number of surrounding elements affected by the layout change.',
            fix: 'Rewrite the effect using transform and/or opacity wherever visually possible — a scale() or translate() can replace most width/height/position-based effects with an identical visual result at a fraction of the per-frame cost.',
          },
          {
            error: `Transitioning to/from height: auto snaps instantly instead of animating smoothly`,
            cause: 'CSS cannot interpolate a numeric transition between a fixed pixel height and the auto keyword, since auto has no single resolved value to tween toward until layout has already happened.',
            fix: 'Transition max-height to a fixed value comfortably larger than the content\'s expected height instead of height: auto, or use the newer grid-template-rows: 0fr to 1fr technique on a single-row grid wrapper, which does support smooth interpolation.',
          },
          {
            error: `A JavaScript callback attached to transitionend fires twice for what looks like one animation`,
            cause: 'transitionend fires once per CSS property that finishes transitioning on that element, not once per element — an element with both opacity and transform transitioning fires the event twice.',
            fix: 'Check event.propertyName inside the handler and only act on the specific property you care about, or use { once: true } combined with a propertyName check rather than assuming a single firing.',
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
        'transition-property, transition-duration, transition-timing-function, and transition-delay (or the transition shorthand) tell the browser to interpolate smoothly between an old and new value, instead of snapping instantly.',
        'Declare the transition on the base selector, not the pseudo-class that triggers it, so it governs the change in both directions.',
        'transition-timing-function controls the feel of the motion (acceleration/deceleration), independent of transition-duration, which only controls total time — ease-out generally suits things entering, ease-in suits things leaving.',
        'A browser update goes through up to three stages: Layout, Paint, and Composite. transform and opacity can be animated on the composite stage alone, entirely on the GPU — the cheapest possible path.',
        'width, height, top, left, margin, and padding all trigger a full layout recalculation on every animation frame, and that cost scales with how many surrounding elements are affected — a common cause of animations that stutter only on real, dense pages.',
        'The same visual effect (a card growing, shifting, or lifting on hover) can almost always be re-expressed using transform: scale()/translate() instead of width/height/top/left, with an identical look and a fraction of the per-frame cost.',
        'Transitions fire from any change to a watched property\'s value, including a class toggled by JavaScript — not only :hover — making CSS the source of truth for animation timing while JavaScript only toggles state.',
        'transitionend fires once per transitioning property, not once per element — check event.propertyName when a handler must run for one specific property.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Transitions only ever describe a path between two states. The next module covers @keyframes and
          the animation property — genuine multi-step, self-running, and looping motion, for effects a
          transition simply cannot express.
        </p>
        <Link href="/learn/html-css/css-animations-keyframes" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Next → CSS Animations &amp; Keyframes
        </Link>
      </div>
    </LearnLayout>
  )
}
