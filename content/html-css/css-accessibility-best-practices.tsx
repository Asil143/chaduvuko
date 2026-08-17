import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Accessibility Best Practices — HTML & CSS | Chaduvuko',
  description:
    'Focus states, color contrast, prefers-reduced-motion, and the CSS-level decisions that make or break real accessibility.',
}

const C = '#ff4757'

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

export default function CssAccessibilityBestPractices() {
  return (
    <LearnLayout
      title="CSS Accessibility Best Practices"
      description="Focus states, color contrast, prefers-reduced-motion, and the CSS-level decisions that make or break real accessibility."
      section="HTML & CSS — Module 38"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Accessibility Is Not Only an HTML Job" />
        <SectionTitle>How CSS Alone Can Make a Perfectly Semantic Page Unusable</SectionTitle>

        <Para>
          Semantic HTML & Accessibility Basics, earlier in this track, covered the structural side of
          accessibility — landmark elements, ARIA basics, accessible form labeling. All of that can be
          done correctly and a page can still be unusable for real people, because CSS controls the
          <em> visual and interactive presentation</em> layered on top of that structure, and presentation
          is where a huge share of accessibility either succeeds or quietly fails. A button can be
          perfectly labeled for a screen reader and still be invisible to a keyboard user who has no idea
          it is currently focused. Text can sit inside flawless semantic markup and still be unreadable to
          someone with low vision if its color contrast is too low. An animation can respect every ARIA
          attribute in the book and still trigger real physical symptoms in a user with a vestibular
          disorder if it ignores their stated motion preference.
        </Para>

        <Para>
          This module covers four specific, concrete CSS-level responsibilities: focus states, color
          contrast, motion preferences, and touch-aware hover design. Each one is something a design or
          engineering team can get quietly, invisibly wrong while shipping a page that looks completely
          fine to the person who built it — because the person who built it was not the person the mistake
          actually affects.
        </Para>

        <Callout type="info">
          None of what follows requires assistive technology to verify — every check in this module can
          be done with nothing but your keyboard, DevTools, and (for contrast) a browser extension or
          online tool. That is deliberate: these are baseline checks every front-end engineer should be
          able to run themselves, not specialist audits that only an accessibility team can perform.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Focus States" />
        <SectionTitle>Never Remove outline Without Replacing It With Something Equally Visible</SectionTitle>

        <Para>
          Every browser ships a default focus ring — that blue (or, in some browsers, a platform-specific
          color) outline that appears around a link, button, or form field when it receives keyboard
          focus, typically via the Tab key. It is the single most important visual signal a keyboard-only
          user has: without it, there is no way to know which element on the page is about to receive the
          next keystroke or Enter press.
        </Para>

        <CodeBox label="The single most damaging line of CSS an accessibility audit finds">{`/* Removes the browser's default focus indicator, and replaces it with NOTHING */
*:focus {
  outline: none;
}`}</CodeBox>

        <Para>
          This rule, or some variant of it, is written constantly — almost always to "fix" a focus ring
          that a designer found visually distracting on a mouse click, not realizing it also erases the
          only visual cue a keyboard user has for every interactive element on the entire page. A mouse
          user never notices the rule is even there, because they never trigger <code>:focus</code>{' '}
          through clicking in the way a keyboard user triggers it through tabbing — which is exactly why
          this mistake survives so many rounds of visual review before anyone catches it.
        </Para>

        <Callout type="warning">
          <strong>Removing outline is not itself the sin — removing it without a replacement is.</strong>{' '}
          If the default focus ring genuinely clashes with your design, replace it with an equally or more
          visible custom style. Deleting it and shipping nothing in its place is a baseline WCAG failure
          (2.4.7 Focus Visible), not a stylistic judgment call.
        </Callout>

        <SubTitle>:focus-visible — showing the ring only when it is actually useful</SubTitle>

        <Para>
          A legitimate complaint behind the "remove the outline" instinct: a mouse click on a button does
          trigger <code>:focus</code> in most browsers, and some designers find that ring visually noisy
          for a pointer interaction that already has its own visual click feedback. The real fix for this
          is <code>:focus-visible</code> — a pseudo-class that matches only when the browser's own
          heuristic decides the focus indicator is actually needed, which in practice means keyboard
          navigation, and largely excludes a plain mouse click.
        </Para>

        <CodeBox label="focus-visible — a ring for keyboard users, none of the mouse-click noise">{`button:focus {
  outline: none; /* remove the default, unconditional ring */
}

button:focus-visible {
  outline: 3px solid #2f6feb;
  outline-offset: 2px;
}`}</CodeBox>

        <Para>
          This is the one legitimate pattern for touching the default outline: pair a{' '}
          <code>:focus</code> removal with an equally strong <code>:focus-visible</code> replacement,
          never remove <code>:focus</code> and stop there.
        </Para>

        <SubTitle>Designing a custom focus style that is actually visible</SubTitle>

        <Para>
          A custom focus indicator has to clear a real, testable bar, not just "have some kind of style
          change." WCAG's Focus Appearance guidance (2.4.11, AAA, but treated as good practice broadly)
          effectively expects the indicator to have sufficient size and sufficient contrast against both
          the element and its background.
        </Para>

        <CodeBox label="A robust custom focus style — offset outline plus a subtle shadow for extra contrast">{`.btn:focus-visible {
  outline: 3px solid #2f6feb;
  outline-offset: 3px;
  border-radius: 6px;
  box-shadow: 0 0 0 6px rgba(47, 111, 235, 0.25);
}`}</CodeBox>

        <Para>
          <code>outline-offset</code> pushes the ring outward from the element's edge rather than hugging
          it directly — this is a small but genuinely important detail, since a ring that sits flush
          against a button's border can be hard to distinguish from the border itself, especially at low
          contrast. Outline (unlike <code>border</code>) never affects layout, since it is drawn outside
          the box without reflowing anything around it — one more reason it is the right tool for this,
          rather than reaching for a border change on focus.
        </Para>

        <Callout type="tip">
          A focus style built purely from a background-color change is a common, insufficient substitute.
          Someone with low vision or color blindness may not reliably perceive a subtle color shift the
          way a sighted designer testing on a calibrated monitor does. An outline, ring, or shape change
          is a more robust signal than color alone — which is also exactly the same principle behind the
          "never convey information through color alone" rule covered in Part 03.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Color Contrast" />
        <SectionTitle>WCAG Contrast Ratios — AA vs AAA, and How to Actually Check Them</SectionTitle>

        <Para>
          WCAG defines color contrast as a mathematical ratio between a foreground color's relative
          luminance and its background's relative luminance, expressed as a number from 1:1 (identical —
          effectively invisible text) up to 21:1 (pure black on pure white, the maximum possible). The
          specification sets minimum ratios for text to be considered legible for people with low vision,
          and it sets different thresholds depending on the compliance level and the text's size.
        </Para>

        <CodeBox label="WCAG contrast minimums — the numbers to actually memorize">{`Level AA (the practical, legally-referenced standard most teams target):
  Normal text                4.5:1 minimum
  Large text (18pt+/14pt+ bold)  3:1 minimum
  UI components & graphics       3:1 minimum (borders, icons, form field outlines)

Level AAA (a stricter standard, not required for general compliance):
  Normal text                7:1 minimum
  Large text                 4.5:1 minimum`}</CodeBox>

        <Para>
          "Large text" has a precise legal definition, not a vibe: 18pt (24px) or larger regular weight,
          or 14pt (roughly 18.66px) or larger if it is bold. Below that, normal text's stricter 4.5:1
          threshold applies — which is why a large, bold hero headline can often get away with a lighter
          gray than the body copy underneath it, and still pass.
        </Para>

        <SubTitle>Checking contrast for real, not by eye</SubTitle>

        <Para>
          Contrast ratio is not something to eyeball — two colors that look "close enough" on one monitor
          can fail outright on another, and the human eye is genuinely bad at judging contrast accurately
          in isolation. Every real workflow uses a tool.
        </Para>

        <CodeBox label="Where to actually check contrast">{`1. Chrome/Edge DevTools — inspect any element, open the color picker on its
   "color" value in the Styles panel. It shows the computed contrast ratio
   against the background directly, with a pass/fail badge for AA and AAA.

2. WebAIM Contrast Checker (webaim.org/resources/contrastchecker) — paste
   a foreground and background hex value, get the exact ratio and pass/fail
   grid for both text sizes and both compliance levels.

3. Browser extensions (axe DevTools, WAVE) — scan an entire live page and
   flag every element that fails contrast automatically, without checking
   colors one at a time by hand.`}</CodeBox>

        <CodeBox label="A failing combination, and a fix that keeps the same design intent">{`/* Fails AA for normal text — roughly 2.85:1 against white */
.subtext {
  color: #999999;
  background: #ffffff;
}

/* Passes AA (4.54:1) — same intent (a muted, secondary gray), corrected value */
.subtext {
  color: #767676;
  background: #ffffff;
}`}</CodeBox>

        <Callout type="warning">
          <strong>Light gray text on a white card is the single most common contrast failure on real
          production sites.</strong> It is an extremely common design instinct — muted gray for secondary
          text, timestamps, placeholder copy — and it very often lands well below 4.5:1 without anyone
          checking. Run every gray-on-white or gray-on-light-surface pairing through a contrast checker
          before shipping it, not just the primary body text color.
        </Callout>

        <SubTitle>Contrast applies to more than body text</SubTitle>

        <Para>
          The 3:1 "UI components & graphics" threshold from the table above is frequently missed entirely,
          because teams check body text contrast and stop there. It covers things like a form field's
          border against its background, an icon conveying meaning on its own, and a focus ring's contrast
          against both the element and the page — the exact focus-style requirement from Part 02.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — prefers-reduced-motion" />
        <SectionTitle>Respecting Motion Preferences — Not Everyone Wants Your Animation</SectionTitle>

        <Para>
          The CSS Transitions and CSS Animations & Keyframes modules covered how to build motion. This is
          the missing piece those modules deliberately left for here: some users experience genuine,
          physical discomfort from motion on screen — dizziness, nausea, or migraine symptoms triggered by
          parallax scrolling, large sweeping transitions, or auto-playing animation, a condition broadly
          referred to as vestibular sensitivity. Operating systems expose a system-level setting for this
          (macOS: Reduce Motion, Windows: Show animations in Windows, Android/iOS equivalents), and CSS
          can read that exact setting through a media query.
        </Para>

        <CodeBox label="prefers-reduced-motion — the media query">{`@media (prefers-reduced-motion: reduce) {
  /* Styles here apply only when the user's OS-level setting requests less motion */
}

@media (prefers-reduced-motion: no-preference) {
  /* Styles here apply only when the user has NOT requested reduced motion —
     rarely needed; usually the default (unguarded) styles already cover this case */
}`}</CodeBox>

        <Para>
          The standard, robust pattern is not to write every animation twice — it is to write your normal
          animations as the default, then use the media query to strip or shorten motion specifically for
          users who asked for less of it. This also means the query is additive protection, not a
          separate parallel design system to maintain.
        </Para>

        <CodeBox label="A hero entrance animation, respecting reduced motion">{`.hero-title {
  animation: slide-up-fade 0.6s ease-out;
}

@keyframes slide-up-fade {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-title {
    animation: none;
  }
}`}</CodeBox>

        <Para>
          A near-universal, low-effort baseline pattern many production codebases apply globally, rather
          than animation-by-animation: shorten essentially every transition and animation duration to
          something imperceptibly close to instant, for every user who has requested reduced motion, in
          one sweeping rule.
        </Para>

        <CodeBox label="A global reduced-motion safety net">{`@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}</CodeBox>

        <Callout type="tip">
          <code>0.01ms</code> rather than <code>0</code> is a deliberate, well-known trick — some browsers
          and some JavaScript animation libraries treat a genuinely zero-length animation as if it never
          ran at all, skipping any <code>animationend</code>/<code>transitionend</code> event that other
          code might be listening for to trigger a next step. A near-zero duration still fires those
          events almost immediately, without producing any perceptible motion.
        </Callout>

        <Para>
          This matters beyond decorative flourishes. <code>scroll-behavior: auto</code> in the snippet
          above specifically overrides <code>scroll-behavior: smooth</code>, since smooth-scrolling
          itself is a motion effect that can trigger the same discomfort as a keyframe animation — a
          detail commonly missed even by teams who otherwise handle <code>prefers-reduced-motion</code>{' '}
          correctly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Hover on Touch Devices" />
        <SectionTitle>Accessible Hover — Designing for Devices That Have No True Hover State</SectionTitle>

        <Para>
          A touchscreen has no cursor hovering above the surface before a tap lands — there is no
          equivalent of a mouse resting over an element without clicking it. Any interaction or piece of
          information that only appears on <code>:hover</code> is, on a touch device, either unreachable
          entirely or only reachable through an inconsistent, browser-dependent workaround (some mobile
          browsers fire a synthetic hover state on first tap, requiring a second tap to actually activate
          the element — a confusing, undocumented behavior that varies across devices).
        </Para>

        <CodeBox label="A tooltip that is completely unreachable on touch devices">{`.info-icon .tooltip {
  display: none;
}

.info-icon:hover .tooltip {
  display: block;
}

/* On a touchscreen, there is no hover — the tooltip's content, whatever
   it explains, is simply never available to that user at all. */`}</CodeBox>

        <Para>
          The fix depends on what the hover interaction was actually doing. Two genuinely different
          categories, requiring two different fixes:
        </Para>

        <CodeBox label="Category 1 — hover as pure visual polish (safe to leave hover-only)">{`.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}
/* A subtle lift on hover, purely decorative, with no unique information
   or functionality gated behind it. Fine to leave as hover-only — nothing
   is lost on a touch device beyond an animation that never had a touch
   equivalent to begin with. */`}</CodeBox>

        <CodeBox label="Category 2 — hover gating real content or functionality (must be reachable another way)">{`/* Bad: the ONLY way to see this content is a mouse hover */
.info-icon:hover .tooltip { display: block; }

/* Fixed: reachable by keyboard focus AND touch tap, not just mouse hover */
.info-icon:hover .tooltip,
.info-icon:focus-within .tooltip,
.info-icon[aria-expanded="true"] .tooltip {
  display: block;
}`}</CodeBox>

        <Para>
          <code>:focus-within</code> covers keyboard users tabbing to the icon (or a child of it).{' '}
          <code>aria-expanded</code> toggled by a small amount of JavaScript on tap/click covers touch
          users and mouse users who click rather than hover — the underlying pattern is: never let a
          single input method be the <em>only</em> way to reach real content.
        </Para>

        <SubTitle>The pointer and hover media features — detecting the actual input capability</SubTitle>

        <Para>
          CSS can query the device's actual pointing capability directly, rather than guessing from
          viewport width (a phone in landscape and a small laptop window can have the same width, but
          wildly different input capabilities).
        </Para>

        <CodeBox label="Targeting styles at devices that genuinely support fine hover">{`/* Only applies hover-triggered styles on devices with a real mouse-like
   pointer — most touchscreens report (hover: none) and this block is
   skipped entirely for them, avoiding "sticky hover" states that get
   stuck active after a tap on touch devices. */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-4px);
  }
}`}</CodeBox>

        <Callout type="info">
          <strong>&quot;Sticky hover&quot; is the specific bug this media query fixes.</strong> On many
          touch devices, tapping an element does trigger its <code>:hover</code> style — and that style
          then stays visually stuck active until the user taps somewhere else entirely, because there is
          no mouse to move away and naturally clear it. Wrapping hover-only visual effects in{' '}
          <code>@media (hover: hover) and (pointer: fine)</code> prevents them from ever triggering on a
          touch device in the first place, sidestepping the stuck-state bug entirely.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — A Combined Accessible Component" />
        <SectionTitle>Putting Focus, Contrast, Motion, and Touch Together in One Real Component</SectionTitle>

        <Para>
          Each rule so far has been shown in isolation. A real component — here, a dropdown-style "more
          info" button — needs all four working together, since none of them are optional add-ons layered
          on afterward; they are baseline requirements the component has to meet from the start.
        </Para>

        <CodeBox label="A single accessible interactive component, combining every technique in this module">{`<button class="info-btn" aria-expanded="false" aria-controls="shipping-info">
  Shipping details
</button>
<div id="shipping-info" class="info-panel" hidden>
  Orders ship within 2 business days via standard ground shipping.
</div>`}</CodeBox>

        <CodeBox label="The CSS backing it — contrast-checked colors, a real focus ring, motion-aware transitions, touch-safe hover">{`.info-btn {
  color: #1a1a1a;          /* checked: 15.3:1 against white — comfortably passes AAA */
  background: #ffffff;
  border: 1px solid #767676; /* checked: 4.54:1 — passes the 3:1 UI-component minimum */
  padding: 10px 16px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
}

/* Hover only where a real pointer supports it — no sticky-hover on touch */
@media (hover: hover) and (pointer: fine) {
  .info-btn:hover {
    background: #f2f2f2;
  }
}

/* A strong, offset focus ring — visible for keyboard users, silent for mouse clicks */
.info-btn:focus-visible {
  outline: 3px solid #2f6feb;
  outline-offset: 3px;
}

.info-panel {
  margin-top: 8px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Reduced-motion users get an instant state change, not a sliding reveal */
@media (prefers-reduced-motion: reduce) {
  .info-btn, .info-panel {
    transition-duration: 0.01ms !important;
  }
}`}</CodeBox>

        <Para>
          None of these four rules block or interfere with each other — they layer cleanly, because each
          one targets a different axis of the same component: what color communicates it, what visible
          state shows it has focus, how much it is allowed to move, and which input methods can actually
          trigger its interactive states.
        </Para>
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
        <SectionTitle>An Austin Fintech Startup Fails Its First Accessibility Audit Three Different Ways</SectionTitle>

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
            Scenario — Fintech startup, Austin · Pre-launch accessibility audit
          </div>

          <Para>
            A budgeting-app startup in Austin hires an outside accessibility auditor ahead of a public
            launch, expecting a mostly clean report — the team had already invested in semantic HTML and
            proper ARIA labeling on their forms. The audit instead comes back with three CSS-level
            findings, none of them touching HTML structure at all, all three severe enough to block launch
            under the accessibility commitment in their enterprise sales contracts.
          </Para>

          <SubSubTitle>Finding 1 — global focus removal, three years old, untouched since</SubSubTitle>

          <CodeBox label="Found in the base stylesheet, added early in the project and forgotten">{`/* Original: a global reset rule nobody revisited since it was written */
button, a, input, select {
  outline: none;
}`}</CodeBox>

          <Para>
            Nobody on the current team remembers writing it — it dates back to the project's earliest CSS
            reset, before the current engineers joined. Every interactive element on the entire product
            has been keyboard-invisible since day one, and it survived every design review because every
            reviewer used a mouse.
          </Para>

          <SubSubTitle>Finding 2 — the brand's signature muted gray fails contrast almost everywhere</SubSubTitle>

          <Para>
            The design system's secondary text color, <code>#a8a8a8</code>, used for timestamps,
            helper text under form fields, and disabled-looking-but-actually-just-secondary labels, tests
            at roughly 2.3:1 against the app's white cards — well under the 4.5:1 AA minimum, and used in
            dozens of places across the product, including directly beneath password requirements on the
            signup form.
          </Para>

          <SubSubTitle>Finding 3 — a balance-reveal animation with no reduced-motion guard</SubSubTitle>

          <Para>
            The account dashboard's headline feature — an animated counter that visually "counts up" to
            the user's real balance on every page load, with a pronounced scale-and-bounce effect — has no{' '}
            <code>prefers-reduced-motion</code> handling anywhere in its CSS. A tester on the audit team
            with a documented vestibular disorder reports genuine discomfort triggering the finding, not a
            theoretical compliance gap.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="All three findings resolved">{`/* 1. Focus — restored, using focus-visible so mouse clicks stay clean */
button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible {
  outline: 3px solid #2f6feb;
  outline-offset: 2px;
}

/* 2. Contrast — the secondary gray token corrected across the design system */
:root {
  --text-secondary: #6b6b6b; /* was #a8a8a8 — now 5.74:1 against white, passes AA */
}

/* 3. Motion — the balance counter's animation respects the OS-level preference */
@media (prefers-reduced-motion: reduce) {
  .balance-counter {
    animation: none;
  }
}`}</CodeBox>

          <Para>
            The team re-books the audit two weeks later and passes. What stands out in the retro afterward
            is not that any of the three fixes were individually hard — each was a handful of lines — but
            that all three had shipped, unnoticed, through normal design and code review, because none of
            the reviewers involved were relying on a keyboard, low vision, or a vestibular condition
            themselves. This is the recurring, structural reason CSS accessibility bugs are so common: the
            people building and reviewing a feature are very often not the people the mistake actually
            affects.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Accessibility</SectionTitle>

        {[
          {
            wrong: '"Removing the default focus outline is fine as long as the design still looks clean"',
            right: 'It is fine only if something equally visible replaces it. A design that looks clean to a mouse user because the focus ring is gone is a design that is genuinely unusable for keyboard-only users, who now have no way to see which element is about to receive input.',
          },
          {
            wrong: '"If text is readable to me, it passes contrast"',
            right: 'Contrast is a measured ratio, not a subjective readability check, and personal judgment is notoriously unreliable here — a color that reads fine on one calibrated monitor can fail outright for someone with low vision, or on a different display. Always check with a tool (DevTools, WebAIM), never by eye.',
          },
          {
            wrong: '"prefers-reduced-motion is only relevant for people who get literally nauseous from animation"',
            right: 'That is the most severe end of why it exists, but a meaningful share of users simply enable "reduce motion" system-wide because they find animation distracting or slow, without any medical reason at all. Respecting the preference benefits both groups, and costs nothing for users who never enabled it.',
          },
          {
            wrong: '"Touch devices just don\'t get hover effects, and that\'s an acceptable, unavoidable gap"',
            right: 'Purely decorative hover (a card lift, a subtle glow) is fine to skip on touch. But hover states that gate real content or functionality — a tooltip, a reveal-on-hover menu — must be reachable through focus and tap as well, using :focus-within, aria-expanded, or equivalent, or that content is simply unavailable to touch-only users.',
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
            q: 'Why is outline: none on :focus considered a serious accessibility bug rather than a stylistic choice?',
            a: 'The default focus ring is the primary — often the only — visual signal a keyboard-only user has for which element on the page will receive the next keystroke or Enter press. Removing it with nothing in its place makes every interactive element effectively invisible during keyboard navigation, even though the page looks completely normal to a mouse user, which is exactly why it is a WCAG 2.4.7 failure (Focus Visible) and not a matter of taste.',
          },
          {
            q: 'What is the difference between :focus and :focus-visible, and why would you use the latter?',
            a: ':focus matches any time an element receives focus, including a plain mouse click in most browsers. :focus-visible matches based on the browser\'s own heuristic for when a focus indicator is actually useful — in practice, largely keyboard navigation. Using :focus-visible lets you show a strong focus ring for keyboard users without also showing it on every mouse click, which is the legitimate version of removing outline: the un conditional :focus ring is replaced, not deleted.',
          },
          {
            q: 'What are the WCAG AA contrast minimums for normal text, large text, and UI components?',
            a: 'Normal text needs at least 4.5:1 against its background. Large text — 18pt/24px+ regular weight, or 14pt/~18.66px+ bold — needs at least 3:1. UI components and meaningful graphics (borders, icons, form field outlines, focus rings) also need at least 3:1. AAA raises the text thresholds further, to 7:1 for normal text and 4.5:1 for large text, but AA is the practically referenced standard for most compliance work.',
          },
          {
            q: 'How does prefers-reduced-motion work, and what is the standard pattern for applying it across a whole codebase rather than animation by animation?',
            a: 'It is a media query that reads an OS-level accessibility setting the user has already configured (macOS Reduce Motion, Windows equivalent, etc.) — @media (prefers-reduced-motion: reduce) { ... }. Rather than writing every animation twice, the common pattern is a single global rule that forces animation-duration, transition-duration, and scroll-behavior to near-instant values (using !important and a near-zero duration like 0.01ms rather than 0, since some libraries treat a literal zero-length animation as never having run) for every element, whenever that preference is set.',
          },
          {
            q: 'Why can a hover-triggered tooltip be a genuine accessibility failure, and what CSS/markup fixes it?',
            a: 'Touch devices have no true hover state — there is no equivalent of a cursor resting over an element before a tap. Content only revealed via :hover is either unreachable on touch or only reachable through inconsistent, browser-specific tap-then-tap-again behavior. The fix is making the same content reachable through :focus-within (keyboard) and a tap-toggled state such as aria-expanded set by JavaScript (touch and click), in addition to :hover, so no single input method is the only path to the content.',
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
        <SectionTitle>CSS Accessibility Mistakes Made Constantly, Even by Experienced Teams</SectionTitle>

        {[
          {
            q: 'A global *:focus { outline: none; } left over from an old CSS reset',
            a: 'It silently blinds keyboard navigation across the entire product and almost never gets caught in visual review, since reviewers testing with a mouse never trigger :focus at all. Search your codebase for outline: none directly and confirm every match has a genuine focus-visible replacement.',
          },
          {
            q: 'Choosing a muted gray for secondary/helper text without checking its contrast ratio',
            a: 'Design-system "quiet" grays are one of the most common contrast failures in production, precisely because they are chosen for visual hierarchy (making them less prominent than primary text) without ever being run through a contrast checker.',
          },
          {
            q: 'Building an eye-catching entrance or scroll animation with no prefers-reduced-motion handling at all',
            a: 'Any animation of meaningful size or duration — parallax, large transforms, auto-playing motion — needs a reduced-motion fallback. This is not an edge case to defer; it is a baseline requirement alongside the animation itself, not a follow-up ticket.',
          },
          {
            q: 'Gating real content behind :hover with no keyboard or touch equivalent',
            a: 'A tooltip, dropdown, or reveal-on-hover panel that only responds to :hover excludes keyboard and touch users from content mouse users can see. Pair :hover with :focus-within and a tap-toggleable state.',
          },
          {
            q: 'Applying hover-lift or hover-glow styles unconditionally, causing "sticky hover" on touch devices',
            a: 'Wrap purely decorative hover effects in @media (hover: hover) and (pointer: fine) so they never trigger — and never get stuck active — on a touchscreen that has no real pointer to move away and clear the state.',
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
        <SectionTitle>Warnings and Real-World Symptoms This Topic Actually Produces</SectionTitle>

        {[
          {
            error: `axe/Lighthouse: "Elements must have sufficient color contrast"`,
            cause: 'A text or UI-component color pairing falls below the WCAG AA minimum ratio for its size category — most commonly a light gray on a white or near-white background.',
            fix: 'Run the flagged pairing through a contrast checker, then darken the foreground (or lighten the background) until it clears 4.5:1 for normal text or 3:1 for large text/UI components, keeping the same general hue if brand consistency matters.',
          },
          {
            error: `axe/Lighthouse: "Interactive controls must have a visible focus indicator"`,
            cause: 'An outline: none rule (often global) removes the default focus ring with no replacement, on a button, link, or form control.',
            fix: 'Add a :focus-visible rule with a clearly visible outline or box-shadow, using outline-offset so the ring does not blend into the element\'s own border.',
          },
          {
            error: `A tooltip, dropdown, or menu item is completely untestable via keyboard during a manual audit`,
            cause: 'The content is only revealed by a CSS :hover selector, which a keyboard-only navigation pass never triggers, since there is no mouse cursor to hover with.',
            fix: 'Add :focus-within (or :focus on the trigger element itself) alongside :hover in the CSS selector that reveals the content, and ensure the trigger is a genuinely focusable element (a real button, not a styled div).',
          },
          {
            error: `A hover-triggered style visibly "stuck" active on a mobile device after a single tap, requiring a tap elsewhere to clear`,
            cause: 'A :hover rule is triggered by the tap itself on a touchscreen, and never naturally clears because there is no pointer to move away — commonly called "sticky hover."',
            fix: 'Wrap purely decorative :hover rules in @media (hover: hover) and (pointer: fine) so they only ever apply on devices with a genuine hover-capable pointer.',
          },
          {
            error: `A user report of dizziness, nausea, or discomfort tied to a specific animated section of the page`,
            cause: 'An animation or transition (auto-playing motion, a large parallax effect, a bouncing/scaling counter) has no @media (prefers-reduced-motion: reduce) guard, so it plays at full intensity for every visitor regardless of their OS-level accessibility setting.',
            fix: 'Add a reduced-motion media query — either targeted at the specific animation, or a sweeping global rule reducing all animation/transition durations near-instantly — and verify it by toggling the OS setting (or the DevTools "Emulate CSS media feature prefers-reduced-motion" option) directly.',
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
        'Never remove the default focus outline without an equally visible replacement — outline: none with nothing in its place is a baseline WCAG failure, not a stylistic choice.',
        ':focus-visible lets you show a strong focus ring for keyboard navigation while keeping mouse clicks visually clean — pair a :focus removal with a :focus-visible replacement, never remove focus styling outright.',
        'WCAG AA requires 4.5:1 contrast for normal text, 3:1 for large text (18pt+/14pt+ bold) and UI components. Always verify with a tool (DevTools, WebAIM) — never by eye.',
        'Light gray secondary/helper text on white is the single most common real-world contrast failure — check it explicitly, not just your primary body text color.',
        'prefers-reduced-motion reads a real OS-level accessibility setting. A global rule collapsing animation/transition durations to near-zero (0.01ms, not exactly 0) is the standard low-effort baseline.',
        'scroll-behavior: smooth is itself a motion effect and should be neutralized under prefers-reduced-motion alongside keyframe animations and transitions.',
        'Touch devices have no true hover state — content gated purely behind :hover is unreachable on touch. Pair :hover with :focus-within and a tap-toggled state for anything beyond purely decorative effects.',
        '@media (hover: hover) and (pointer: fine) restricts hover-only decorative styles to devices with a genuine pointer, preventing the "sticky hover" bug on touchscreens.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 39 moves from accessibility to reliability — vendor prefixes, feature detection with{' '}
          <code>@supports</code>, real DevTools debugging workflows, and a full worked investigation of a
          bug that only shows up in Safari.
        </p>
        <Link href="/learn/html-css/cross-browser-compatibility-debugging" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 39 → Cross-Browser Compatibility & Debugging
        </Link>
      </div>
    </LearnLayout>
  )
}
