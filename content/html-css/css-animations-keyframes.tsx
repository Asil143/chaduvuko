import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Animations & Keyframes — HTML & CSS | Chaduvuko',
  description:
    '@keyframes and the animation property in full — building genuinely custom motion beyond simple hover transitions.',
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

export default function CssAnimationsKeyframes() {
  return (
    <LearnLayout
      title="CSS Animations & Keyframes"
      description="@keyframes and the animation property in full — building genuinely custom motion beyond simple hover transitions."
      section="HTML & CSS — Module 32"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Transitions vs Animations" />
        <SectionTitle>When Two States Aren't Enough</SectionTitle>

        <Para>
          The Transitions module covered smooth movement between exactly two states — a resting state
          and a triggered state (like <code>:hover</code>). A <strong>CSS animation</strong>, defined
          with <code>@keyframes</code>, removes that two-state limit entirely: it can define any number
          of intermediate steps, run automatically without needing a trigger like hover or a class
          toggle, and loop indefinitely.
        </Para>

        <CodeBox label="Something a transition genuinely cannot do — a continuous loading spinner">{`@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
/* No hover, no class toggle, no trigger of any kind — this runs
   continuously the instant the element exists in the DOM */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — @keyframes Syntax" />
        <SectionTitle>Defining the Steps of the Motion</SectionTitle>

        <CodeBox label="from/to — the two-keyframe shorthand">{`@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}`}</CodeBox>

        <CodeBox label="Percentage keyframes — for any number of intermediate steps">{`@keyframes pulse {
  0%   { transform: scale(1);   opacity: 1;   }
  50%  { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1);   opacity: 1;   }
}`}</CodeBox>

        <Para>
          <code>from</code>/<code>to</code> are exactly equivalent to <code>0%</code>/<code>100%</code>{' '}
          — the percentage form is required the moment you need any intermediate step beyond just a
          start and end point, as the pulse example above shows.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The animation Property" />
        <SectionTitle>Every Sub-Property, Explained</SectionTitle>

        <CodeBox label="The full set of animation properties">{`.element {
  animation-name: pulse;                 /* which @keyframes block to use */
  animation-duration: 2s;                /* one full cycle's length */
  animation-timing-function: ease-in-out; /* the pacing curve within one cycle */
  animation-iteration-count: infinite;    /* or a specific number like 3 */
  animation-direction: alternate;         /* normal / reverse / alternate / alternate-reverse */
  animation-delay: 0.5s;                  /* wait before starting */
  animation-fill-mode: forwards;          /* what state to hold before/after running */
}

/* The shorthand — same six values, one line */
.element {
  animation: pulse 2s ease-in-out infinite alternate 0.5s forwards;
}`}</CodeBox>

        <Para>
          <code>animation-direction: alternate</code> is what makes the pulse example above breathe in
          and out smoothly rather than snapping back to the start at the end of every cycle — it reverses
          the keyframe playback on every other iteration instead of always playing forward from 0% to
          100%.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — animation-fill-mode" />
        <SectionTitle>The Property That Confuses Almost Everyone Once</SectionTitle>

        <Para>
          By default, an element snaps back to its original, pre-animation styles the instant the
          animation finishes (or before it starts, during any <code>animation-delay</code>) —{' '}
          <code>animation-fill-mode</code> controls whether the animation's first or last keyframe state
          is instead held onto outside its active running time.
        </Para>

        <CodeBox label="Without fill-mode — the element snaps back after finishing">{`@keyframes slide-in {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

.card {
  animation: slide-in 0.5s ease-out;
  /* After 0.5s, the element reverts to whatever transform it had
     BEFORE the animation — often back to no transform at all,
     undoing the slide-in visually the instant it "finishes" */
}`}</CodeBox>

        <CodeBox label="With fill-mode: forwards — the final keyframe state is kept">{`.card {
  animation: slide-in 0.5s ease-out forwards;
  /* The element stays at transform: translateX(0) permanently
     after the animation completes, exactly as intended */
}`}</CodeBox>

        <Callout type="warning">
          <strong>Forgetting animation-fill-mode: forwards on a one-shot "reveal" animation is one of
          the single most common real CSS animation bugs.</strong> The animation visually appears to run
          then instantly undo itself, because without <code>forwards</code>, the browser reverts every
          animated property back to its pre-animation value the moment the animation ends.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — When to Reach for Keyframes vs a Transition" />
        <SectionTitle>A Clear Decision, Not a Style Preference</SectionTitle>

        <CodeBox label="Transition — two states, triggered by something">{`.button {
  transition: background-color 0.2s;
}
.button:hover {
  background-color: #4285f4;
}`}</CodeBox>

        <CodeBox label="Keyframes — needs multiple steps, or runs without a trigger">{`@keyframes attention-shake {
  0%, 100% { transform: translateX(0); }
  25%      { transform: translateX(-6px); }
  75%      { transform: translateX(6px); }
}
.error-field {
  animation: attention-shake 0.4s ease-in-out;
}`}</CodeBox>

        <Para>
          The decision is genuinely mechanical: if the motion is a simple change between exactly two
          states and something (hover, a class change) triggers it, a transition is simpler and
          sufficient. The moment you need more than two states, need the motion to loop, or need it to
          run automatically without an external trigger, only <code>@keyframes</code> can do it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Performance, Revisited" />
        <SectionTitle>The Same Cheap-vs-Expensive Rule Still Applies</SectionTitle>

        <Para>
          Everything from the Transitions module about which properties animate cheaply (
          <code>transform</code>, <code>opacity</code> — GPU-accelerated, no layout recalculation) versus
          expensively (<code>width</code>, <code>height</code>, <code>top</code>/<code>left</code> —
          trigger layout reflow on every single frame) applies identically inside{' '}
          <code>@keyframes</code>. An animation looping indefinitely on an expensive property is a much
          more serious, sustained performance cost than a one-off transition, since it runs continuously
          rather than just once.
        </Para>

        <CodeBox label="Expensive — animating left continuously">{`@keyframes slide-loop {
  from { left: 0; }
  to   { left: 100px; }
}
/* Every single frame recalculates layout for this element AND
   potentially its siblings — running "infinite" makes this cost ongoing */`}</CodeBox>

        <CodeBox label="Cheap — the same visual result, via transform">{`@keyframes slide-loop {
  from { transform: translateX(0); }
  to   { transform: translateX(100px); }
}
/* GPU-composited, no layout recalculation on any frame */`}</CodeBox>
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
        <SectionTitle>A "Broken" Toast Notification, at a Nashville Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Nashville · UI animation bug
          </div>

          <Para>
            A "payment successful" toast notification is built with a slide-in-and-fade-in animation.
            QA reports that the toast appears to flash on screen instantly for a single frame, then
            vanish, before its animation has even visually started.
          </Para>

          <CodeBox label="The animation as originally written">{`@keyframes toast-in {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}

.toast {
  animation: toast-in 0.3s ease-out;
}`}</CodeBox>

          <SubSubTitle>What was actually happening</SubSubTitle>

          <Para>
            Without <code>animation-fill-mode: forwards</code>, the browser reverted the toast's{' '}
            <code>transform</code> and <code>opacity</code> back to their pre-animation CSS values the
            instant the 0.3-second animation completed — and since the element's base (non-animated)
            styles had <code>opacity: 1</code> and no transform at all, the toast briefly animated in,
            then immediately snapped to a DIFFERENT, also-fully-visible state, reading as a confusing
            flicker rather than a clean, held final position. Adding{' '}
            <code>forwards</code> to the animation shorthand fixed it entirely — the engineer's own
            note afterward: "the animation was working correctly the whole time. It just had nowhere to
            land."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Animations</SectionTitle>

        {[
          {
            wrong: '"transitions and @keyframes animations are just two different syntaxes for the same capability"',
            right: 'A transition only interpolates between exactly two states and needs an external trigger (hover, a class change). @keyframes supports any number of intermediate steps and can run automatically, looping indefinitely, with no trigger at all — a transition genuinely cannot do either of those things.',
          },
          {
            wrong: '"An animation automatically stays at its final visual state once it finishes"',
            right: 'By default, the element snaps back to its pre-animation styles the instant the animation ends — animation-fill-mode: forwards is required to hold the final keyframe state, exactly the bug shown in the Real World example.',
          },
          {
            wrong: '"animation-direction: alternate reverses the CSS PROPERTY VALUES, not just the timing"',
            right: 'It reverses the PLAYBACK direction of the same keyframes on alternating iterations (0%→100% then 100%→0%) — it does not change what the keyframes themselves declare, just which direction through them each cycle runs.',
          },
          {
            wrong: '"Since keyframe animations often run continuously, their performance cost doesn\'t matter as much as a one-off transition\'s"',
            right: 'The opposite is true — an animation set to infinite runs its cost on every single frame for as long as the element exists, making the cheap-vs-expensive property distinction (transform/opacity vs width/height/top/left) MORE consequential for animations than for a one-time transition, not less.',
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
              ✕ {item.wrong}
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
            q: 'When would you reach for @keyframes instead of a simple transition?',
            a: 'When the motion needs more than two states (multiple intermediate keyframe steps), needs to run automatically without an external trigger like hover or a class toggle, or needs to loop — a transition can only interpolate between exactly two states and always needs a trigger.',
          },
          {
            q: 'What does animation-fill-mode: forwards do, and why is it so commonly needed?',
            a: 'It holds the animation\'s final keyframe state permanently after the animation completes, instead of the default behaviour of reverting to the element\'s pre-animation styles. It\'s commonly needed for any "reveal" or "enter" animation meant to leave the element in its animated-in state rather than snapping back.',
          },
          {
            q: 'What does animation-direction: alternate actually change?',
            a: 'It reverses the PLAYBACK direction of the keyframes on every other iteration (forward, then backward, then forward again) rather than always restarting from 0% — producing a smooth back-and-forth motion instead of an abrupt reset at the end of every cycle.',
          },
          {
            q: 'Why does an infinitely-looping animation on the width property cost more than the same visual effect done via transform?',
            a: 'width is a layout-affecting property — animating it triggers a layout recalculation on every single frame, for as long as the animation runs. transform is GPU-composited and does not trigger layout at all, making it dramatically cheaper, especially for an animation set to run continuously.',
          },
          {
            q: 'What is the difference between the from/to and percentage-based @keyframes syntax?',
            a: 'from/to are exactly equivalent to 0%/100% — a shorthand for a simple two-point animation with no intermediate steps. Percentage syntax is required the moment an animation needs any number of intermediate keyframe steps beyond just a start and end point.',
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
        <SectionTitle>Animation Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting animation-fill-mode: forwards on a one-shot reveal animation',
            a: 'The animation appears to run and then instantly undo itself, since the element reverts to its pre-animation styles the moment the animation completes — exactly the flickering toast bug from the Real World example.',
          },
          {
            q: 'Animating width/height/top/left in a looping @keyframes block',
            a: 'Every frame of an infinitely-running animation on a layout-affecting property triggers a full layout recalculation — a real, ongoing performance cost. Use transform for the equivalent visual movement instead.',
          },
          {
            q: 'Using @keyframes for a simple two-state hover effect',
            a: 'A plain transition is simpler and sufficient whenever the motion is genuinely just two states triggered by something — reaching for the more complex @keyframes tool adds unnecessary complexity for no real benefit.',
          },
          {
            q: 'Setting animation-iteration-count: infinite without considering the ongoing performance and battery cost',
            a: 'A continuously running animation, especially on mobile, has a real ongoing cost — reserve infinite loops for cases where the continuous motion is genuinely necessary (a loading spinner), not decorative flourishes.',
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
        <SectionTitle>Issues You Will Hit With CSS Animations — And Exactly Why</SectionTitle>

        {[
          {
            error: `An animation appears to run once and then immediately snap back to its original state`,
            cause: 'animation-fill-mode was left at its default value, so the browser reverts every animated property back to its pre-animation value the instant the animation completes.',
            fix: 'Add forwards to the animation shorthand (or set animation-fill-mode: forwards explicitly) to hold the final keyframe state.',
          },
          {
            error: `An @keyframes animation never runs at all, with no console error`,
            cause: 'A typo in the animation-name (or the shorthand animation property) that does not exactly match the name declared in the @keyframes rule — CSS silently ignores a reference to a keyframes block that does not exist, with no error of any kind.',
            fix: 'Double-check the animation name matches exactly (case-sensitive) between the @keyframes declaration and the animation property referencing it.',
          },
          {
            error: `An animation runs noticeably choppy/janky, especially on mobile`,
            cause: 'The animated property (commonly width, height, top, left, or margin) triggers layout recalculation on every single frame — a real, measurable performance cost that compounds when the animation runs continuously.',
            fix: 'Rewrite the animation to use transform and/or opacity for the equivalent visual effect wherever geometrically possible — both are GPU-composited and avoid layout recalculation entirely.',
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
        '@keyframes defines any number of steps and can run automatically without a trigger, looping indefinitely — capabilities a two-state transition simply does not have.',
        'The animation shorthand combines name, duration, timing-function, iteration-count, direction, delay, and fill-mode in one line.',
        'animation-fill-mode: forwards is required to hold an animation\'s final state — without it, the element reverts to its pre-animation styles the instant the animation completes, a genuinely common source of flickering UI bugs.',
        'animation-direction: alternate reverses keyframe playback on alternating cycles, producing smooth back-and-forth motion instead of an abrupt reset.',
        'Choose a plain transition for a simple, triggered two-state change; reach for @keyframes only once you need more steps, looping, or automatic playback.',
        'The cheap-vs-expensive property distinction from Transitions applies with MORE consequence to animations, since a looping animation pays its cost on every frame for as long as it runs.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 33 covers CSS transforms in 2D and 3D — translate, rotate, scale, skew, and building real
          perspective-based depth.
        </p>
        <Link href="/learn/html-css/css-transforms" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 33 → CSS Transforms (2D and 3D)
        </Link>
      </div>
    </LearnLayout>
  )
}
