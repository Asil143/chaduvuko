import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Best Practices & Common Mistakes — HTML & CSS | Chaduvuko',
  description:
    'The conventions that separate maintainable CSS from a stylesheet nobody wants to touch — and the mistakes every beginner makes at least once.',
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

export default function CssBestPracticesCommonMistakes() {
  return (
    <LearnLayout
      title="CSS Best Practices & Common Mistakes"
      description="The conventions that separate maintainable CSS from a stylesheet nobody wants to touch — and the mistakes every beginner makes at least once."
      section="HTML & CSS — Module 41"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Naming & Organization, Revisited" />
        <SectionTitle>Consistent Naming Is the Cheapest Insurance Policy You Can Buy</SectionTitle>

        <Para>
          The CSS Architecture &amp; Naming Conventions module covered BEM (
          <code>block__element--modifier</code>) in depth — the block, element, and modifier
          convention that keeps class names predictable and self-documenting. This module does not
          re-teach BEM; it assumes you have it, and looks at what actually goes wrong when a team
          <em> doesn&apos;t</em> stick to a convention consistently, because that is where real
          stylesheets rot.
        </Para>

        <CodeBox label="A stylesheet with no consistent naming convention">{`.card { border-radius: 8px; }
.CardHeader { font-weight: bold; }
.card-body-text { color: #333; }
.cardFooterBtn { padding: 8px 16px; }
.is-active-card { border-color: blue; }`}</CodeBox>

        <Para>
          Nothing here is individually wrong — each rule works in isolation. The problem is that five
          different casing styles (<code>kebab-case</code>, <code>PascalCase</code>,{' '}
          <code>camelCase</code>) and five different relationship conventions are mixed in a single
          file. A new engineer joining the project cannot predict what the next class name will look
          like, cannot search-and-replace confidently, and cannot tell from the name alone whether{' '}
          <code>.is-active-card</code> is a state modifier on <code>.card</code> or an unrelated,
          independent class.
        </Para>

        <CodeBox label="The same component, consistently named with BEM">{`.card { border-radius: 8px; }
.card__header { font-weight: bold; }
.card__body { color: #333; }
.card__footer-btn { padding: 8px 16px; }
.card--active { border-color: blue; }`}</CodeBox>

        <Para>
          Every class name now tells you two things at a glance: which block it belongs to (
          <code>card</code>), and its relationship to that block (<code>__header</code> is a
          sub-part, <code>--active</code> is a state variant). This is not about BEM specifically
          being the one correct answer — it is about picking <strong>one</strong> convention and
          applying it everywhere, so the naming itself carries information instead of being noise a
          reader has to work around.
        </Para>

        <Callout type="tip">
          <strong>Consistency beats "correctness" here.</strong> A team that consistently uses a
          slightly imperfect convention will always out-scale a team using a theoretically ideal
          convention inconsistently. If you inherit a codebase with a different (but consistent)
          system already in place, match it — do not introduce a second convention alongside it.
        </Callout>

        <SubTitle>One selector, one responsibility</SubTitle>

        <Para>
          A closely related habit: avoid classes that describe more than one concern at once, like{' '}
          <code>.blue-bold-14px-header</code>. That class is unreusable the moment the design changes
          the color, and it forces you to either rename it everywhere it is used or leave a
          misleading name in place. Name classes for what the element <em>is</em> or <em>does</em>{' '}
          (<code>.card__header</code>), not for how it currently happens to look — the "how it
          looks" belongs entirely inside the rule&apos;s declarations, where it can change freely
          without touching the markup.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Eliminating Magic Numbers" />
        <SectionTitle>Building a Spacing Scale With Custom Properties</SectionTitle>

        <Para>
          A "magic number" in CSS is any hardcoded value that appears with no explanation for why{' '}
          <em>that specific number</em> was chosen — <code>margin-bottom: 13px</code>,{' '}
          <code>padding: 22px 17px</code>, <code>gap: 9px</code>. Every one of these numbers was
          probably reasonable in the exact spot it was written, tweaked in DevTools until it "looked
          right." The problem shows up later: with no system behind them, these numbers multiply
          across a codebase until nothing lines up with anything else, and nobody can tell which
          values are load-bearing versus accidental.
        </Para>

        <CodeBox label="Magic numbers scattered across a stylesheet">{`.card { padding: 18px; margin-bottom: 22px; }
.card__header { padding-bottom: 11px; }
.sidebar { padding: 16px 20px; }
.button { padding: 9px 15px; }
.modal { padding: 24px; gap: 14px; }`}</CodeBox>

        <Para>
          The CSS Custom Properties module covered <code>var()</code> and <code>--custom-property</code>{' '}
          as the mechanism — this module applies that mechanism to the single most common source of
          layout inconsistency: spacing. The fix is a <strong>spacing scale</strong> — a small, fixed
          set of spacing values, each expressed as a custom property, that every component draws
          from instead of inventing its own numbers.
        </Para>

        <CodeBox label="A spacing scale defined once, in :root">{`:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}`}</CodeBox>

        <CodeBox label="Every component now draws from the same fixed scale">{`.card { padding: var(--space-4); margin-bottom: var(--space-5); }
.card__header { padding-bottom: var(--space-3); }
.sidebar { padding: var(--space-4) var(--space-5); }
.button { padding: var(--space-2) var(--space-4); }
.modal { padding: var(--space-5); gap: var(--space-3); }`}</CodeBox>

        <Para>
          Nothing in the rendered page looks meaningfully different at first — the win is structural,
          not visual. A designer who says "let&apos;s make spacing slightly tighter across the whole
          product" is now a one-line change to the scale&apos;s values, not a search across dozens of
          files for every hardcoded number close to the one being adjusted. And because the scale is a
          small, closed set, a reviewer can immediately spot a rule that breaks from it —{' '}
          <code>padding: 13px</code> stands out as an obvious outlier next to{' '}
          <code>padding: var(--space-3)</code> in a way it never would sitting among other raw pixel
          values.
        </Para>

        <Callout type="warning">
          <strong>A spacing scale only works if it is actually closed.</strong> The moment engineers
          start reaching for raw pixel values "just this once" alongside the scale, you are back to
          the original problem, just with extra indirection. If a genuinely new spacing value is
          needed regularly, add it to the scale deliberately (as a numbered step, not an arbitrary
          number) rather than letting one-off raw values creep back in.
        </Callout>

        <SubTitle>Scales are not just for spacing</SubTitle>

        <Para>
          The same idea extends to font sizes, border-radius values, and shadow depths — any property
          where a project benefits from a small, deliberate set of choices instead of unlimited
          freedom. A type scale (<code>--text-sm</code>, <code>--text-base</code>,{' '}
          <code>--text-lg</code>, <code>--text-xl</code>...) solves the exact same "13px here, 15px
          there, nobody remembers why" problem that a spacing scale solves for margins and padding.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Specificity Wars" />
        <SectionTitle>Specificity Wars and the !important Escalation Trap</SectionTitle>

        <Para>
          The CSS Selectors Deep Dive module covered how specificity is calculated — IDs beat classes,
          classes beat elements, and <code>!important</code> overrides the calculation entirely. This
          module is about what happens on a real team over real time when specificity is not managed
          deliberately: a slow, self-inflicted arms race that ends with <code>!important</code>{' '}
          scattered through the codebase and nobody confident they can safely remove it.
        </Para>

        <CodeBox label="How the escalation actually starts — one reasonable-looking fix at a time">{`/* Week 1 — a normal class rule */
.button { background: blue; }

/* Week 3 — a new engineer needs the button red inside the sidebar,
   and reaches for a more specific selector instead of a new class */
.sidebar .button { background: red; }

/* Week 6 — someone needs it blue again inside a specific card, and the
   previous fix's specificity now has to be beaten */
.sidebar .card .button { background: blue; }

/* Week 9 — out of patience, someone reaches for !important
   to guarantee a win, regardless of what else is in the file */
.button { background: green !important; }`}</CodeBox>

        <Para>
          Each individual change was locally reasonable — every engineer was just trying to make one
          button the right color without breaking anything else they could see. But nobody was
          managing specificity as a <em>system</em>, so each fix silently raised the bar for every
          future fix. Once one rule uses <code>!important</code>, overriding it later requires either
          another <code>!important</code> (with equal specificity, the later one in source order wins)
          or an inline style — and the arms race compounds from there.
        </Para>

        <CodeBox label="The same requirement, solved without specificity escalation">{`/* One class per intended appearance, applied directly at the markup level */
.button { background: blue; }
.button--danger { background: red; }
.button--secondary { background: green; }

/* <button class="button button--danger">Delete</button>
   The correct variant is chosen by adding a class, never by
   out-specificity-ing an existing rule. */`}</CodeBox>

        <Callout type="warning">
          <strong>!important should be vanishingly rare in application code.</strong> Its only broadly
          accepted use is overriding third-party CSS you do not control and cannot otherwise beat on
          specificity — not as a routine tool for winning disagreements between your own rules. If you
          find yourself reaching for it against your own stylesheet, that is a strong signal the
          selector strategy (not the color, not the layout) is the actual problem.
        </Callout>

        <SubTitle>Flat, low-specificity selectors as the default habit</SubTitle>

        <Para>
          The sustainable version of the fix above generalizes into a habit: prefer a single class
          selector (specificity 0-1-0) for almost everything, and treat any selector that chains
          multiple classes or nests several levels deep as a smell worth questioning. BEM naming
          directly supports this — because <code>.card__header</code> is already unambiguous on its
          own, there is rarely a real need to write <code>.card .card__header</code> or anything
          deeper just to "be safe."
        </Para>

        <CodeBox label="Specificity, from lowest to highest — the ladder you are trying to stay low on">{`element               /* 0-0-1  e.g. p, div */
.class                /* 0-1-0  e.g. .card__header  — stay here for almost everything */
.class.class          /* 0-2-0  e.g. .card.card--active */
#id                   /* 1-0-0  e.g. #main-nav — avoid for styling entirely */
style="..."           /* 1-0-0-0 inline — avoid for styling entirely */
!important             /* effectively overrides the entire calculation above */`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Organizing CSS at Scale" />
        <SectionTitle>Splitting Stylesheets Without Losing Track of the Cascade</SectionTitle>

        <Para>
          A single 4,000-line <code>styles.css</code> file is unmanageable, but splitting CSS across
          files introduces its own risk: the cascade does not care about file boundaries, and a rule
          in <code>buttons.css</code> can still be silently overridden by a rule in{' '}
          <code>legacy.css</code> loaded afterward. A sustainable structure keeps files small{' '}
          <em>and</em> keeps load order predictable.
        </Para>

        <CodeBox label="A typical component-based file structure">{`styles/
  base.css        /* resets, custom property scales, global element defaults */
  layout.css      /* page-level grid/flex containers, header, footer */
  components/
    button.css
    card.css
    modal.css
    nav.css
  utilities.css   /* small, single-purpose helper classes, loaded last */`}</CodeBox>

        <Para>
          The ordering matters as much as the splitting: <code>base.css</code> first (so every later
          file can rely on the custom properties it defines), component files next in no particular
          order relative to each other (since well-scoped BEM classes should not collide), and{' '}
          <code>utilities.css</code> loaded last, since utility classes are meant to intentionally
          win over component-level styles when applied.
        </Para>

        <Callout type="tip">
          A useful test for whether a stylesheet is organized well: could a new engineer guess which
          file a given class lives in, just from its name, before searching for it? If{' '}
          <code>.card__header</code> could plausibly be in five different files, the organization is
          working against you, not for you.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Beginner Mistake Catalogue, Part 1" />
        <SectionTitle>Box Model, Selectors & Positioning Mistakes Seen Across This Entire Track</SectionTitle>

        <Para>
          The following mistakes each map back to a specific earlier module in this track — they are
          collected here because, individually, each one is easy to explain, but together they
          account for a disproportionate share of real CSS bugs reported in code review.
        </Para>

        <SubSubTitle>Forgetting box-sizing: border-box</SubSubTitle>
        <CodeBox label="The default content-box model silently breaks a fixed-width layout">{`.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
}
/* Rendered width is 300 + 20*2 + 2*2 = 344px, not 300px — padding and
   border are ADDED on top of the declared width under the default
   box-sizing: content-box, exactly as covered in the Box Model module. */`}</CodeBox>
        <Para>
          The near-universal fix, applied once globally rather than per-element, is covered fully in
          the Box Model module: <code>{`* { box-sizing: border-box; }`}</code> — width and height then
          include padding and border, matching what most engineers actually expect intuitively.
        </Para>

        <SubSubTitle>Overqualifying selectors</SubSubTitle>
        <CodeBox label="A selector far more specific than it needs to be">{`div.container ul.nav-list li.nav-item a.nav-link { color: blue; }

/* Every element type prefix is redundant once the class is already
   unique enough to identify the element — and this selector is now
   locked to that exact tag structure, breaking the moment <ul> becomes
   <nav> or <li> becomes <div> during a later refactor. */`}</CodeBox>
        <CodeBox label="The same rule, flattened to what it actually needs">{`.nav-link { color: blue; }`}</CodeBox>

        <SubSubTitle>Using position: absolute without a positioned ancestor</SubSubTitle>
        <CodeBox label="A badge element that ends up positioned relative to the entire page">{`.card { padding: 16px; }         /* no position set */
.card__badge { position: absolute; top: 8px; right: 8px; }

/* Without position: relative on .card, .card__badge positions itself
   against the nearest ANCESTOR that has one — which may be the
   <body> element, placing the badge somewhere far from the card
   entirely, exactly the Display & Positioning module's warning. */`}</CodeBox>
        <CodeBox label="Fixed — the parent becomes the positioning context">{`.card { padding: 16px; position: relative; }
.card__badge { position: absolute; top: 8px; right: 8px; }`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Beginner Mistake Catalogue, Part 2" />
        <SectionTitle>Layout, Responsive & Unit Mistakes Seen Across This Entire Track</SectionTitle>

        <SubSubTitle>Reaching for margin where gap belongs</SubSubTitle>
        <CodeBox label="Manually spacing flex/grid children with margin — and getting an extra gap at the edges">{`.row { display: flex; }
.row > * { margin-right: 16px; }
.row > *:last-child { margin-right: 0; }   /* an extra rule just to undo the last one */`}</CodeBox>
        <CodeBox label="gap handles the spacing between children directly — no edge-case rule needed">{`.row { display: flex; gap: 16px; }`}</CodeBox>
        <Para>
          Covered across both the Flexbox and Grid modules: <code>gap</code> spaces items{' '}
          <em>between</em> them only, with no extra rule needed to zero out the last item&apos;s
          trailing margin — a fix that used to require the exact <code>:last-child</code> workaround
          shown above before <code>gap</code> had broad Flexbox support.
        </Para>

        <SubSubTitle>Using px for font-size instead of rem</SubSubTitle>
        <CodeBox label="Fixed pixel font sizes ignore the user's browser font-size preference">{`body { font-size: 16px; }
h1 { font-size: 32px; }

/* A user who increases their browser's default font size for readability
   sees NO change here — px is an absolute unit, entirely disconnected
   from that preference, as covered in the Colors, Units & Typography module. */`}</CodeBox>
        <CodeBox label="rem scales with the root font-size, respecting user preferences">{`html { font-size: 100%; }   /* respects the browser/OS default, typically 16px */
h1 { font-size: 2rem; }      /* 2 * the root font-size — scales if the user changes it */`}</CodeBox>

        <SubSubTitle>Forgetting the viewport meta tag, then "fixing" it with media queries alone</SubSubTitle>
        <CodeBox label="Media queries with no viewport meta tag — mobile browsers render at desktop width and zoom out">{`<!-- missing from <head>: -->
<!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->

<style>
  @media (max-width: 600px) { .nav { display: none; } }
</style>
/* Without the viewport tag, a phone renders the page at a virtual desktop
   width (often 980px) and scales the whole thing down — the media query
   never even fires as "mobile," exactly the trap covered in the
   Responsive Design & Media Queries module. */`}</CodeBox>

        <SubSubTitle>Writing desktop-first media queries in a mobile-first project (or the reverse)</SubSubTitle>
        <CodeBox label="Mixing max-width and min-width queries inconsistently produces conflicting overrides">{`.sidebar { display: none; }
@media (min-width: 768px) { .sidebar { display: block; } }
@media (max-width: 900px) { .sidebar { display: none; } }
/* At exactly 768–900px, both queries are active — the LAST one in source
   order wins, which may not be the intended layout, and is genuinely
   hard to reason about at a glance. */`}</CodeBox>
        <Para>
          The Mobile-First Design Principles module&apos;s fix is procedural, not just technical: pick
          one direction — almost always <code>min-width</code>, mobile styles as the unprefixed
          default, each breakpoint adding rules as the screen grows — and never mix{' '}
          <code>max-width</code> queries into the same project.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Maintainability Habits" />
        <SectionTitle>Small Habits That Compound Into a Codebase People Actually Want to Touch</SectionTitle>

        <Para>
          None of the following is individually dramatic — each is a small, consistently-applied habit
          that, multiplied across a real codebase with dozens of contributors over years, is the actual
          difference between a stylesheet that stays healthy and one that gets rewritten from scratch.
        </Para>

        <SubSubTitle>Prefer shorthand only when you mean every value it sets</SubSubTitle>
        <CodeBox label="A shorthand property silently resets values a later rule needed to keep">{`.card { border: 1px solid #ccc; border-radius: 8px; }

/* Later, another rule tries to "just" change the color */
.card--highlighted { border: 2px solid gold; }
/* This silently changes border-WIDTH too (1px -> 2px), and if the
   original rule had also set border-style differently, that would be
   reset as well — shorthand always sets every value it covers, even
   the ones you didn't mean to touch. */`}</CodeBox>
        <CodeBox label="Setting only the property that actually needs to change">{`.card { border: 1px solid #ccc; border-radius: 8px; }
.card--highlighted { border-color: gold; }`}</CodeBox>

        <SubSubTitle>Comment the "why," not the "what"</SubSubTitle>
        <CodeBox label="A comment that just restates the CSS in English — no real information added">{`/* Set the display to flex */
.row { display: flex; }`}</CodeBox>
        <CodeBox label="A comment that explains a non-obvious reason — genuinely useful to a future reader">{`/* z-index 999 needed to sit above the third-party chat widget,
   which injects its own container at z-index 998 */
.modal { z-index: 999; }`}</CodeBox>

        <SubSubTitle>Delete dead CSS deliberately, don't just accumulate it</SubSubTitle>
        <Para>
          Unlike JavaScript, an unused CSS rule produces no error, no warning, and no test failure —
          it just sits in the file forever, adding to the mental load of every future reader who has
          to figure out whether it is safe to remove. Deleting a class from CSS the same day it is
          removed from the markup (not "sometime later") keeps this debt from accumulating silently.
        </Para>

        <Callout type="info">
          Browser DevTools&apos; Coverage tab (Chrome/Edge: <code>Cmd/Ctrl+Shift+P</code> →{' '}
          <code>Show Coverage</code>) will highlight CSS rules that were never applied while the page
          was loaded and interacted with — a genuinely useful periodic check on a large, long-lived
          stylesheet, though it should inform a cleanup, not replace actually understanding why a rule
          exists before deleting it.
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
        <SectionTitle>A CSS Audit at a Retail Platform in Minneapolis</SectionTitle>

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
            Scenario — E-commerce platform, Minneapolis · Front-end tech debt sprint
          </div>

          <Para>
            A mid-size e-commerce team schedules a "CSS health" sprint after a new hire spends most of
            their first two weeks just trying to safely change a product card&apos;s border radius —
            every attempt broke something else on a different page. The team pulls the full compiled
            stylesheet for review and finds <code>!important</code> on 340 separate rules, 60+ distinct
            spacing values that were never meant to be different from each other, and three different
            naming conventions layered on top of each other from three different eras of the codebase.
          </Para>

          <CodeBox label="One representative rule pulled from the audit">{`.pdp-container .product-info .price-block .price.sale-price.discounted {
  color: #d32f2f !important;
  margin-top: 13px !important;
}`}</CodeBox>

          <SubSubTitle>What the audit traces this back to</SubSubTitle>

          <Para>
            Every issue maps directly back to habits covered in this module: the deeply chained,
            overqualified selector (Part 05) meant nobody could safely write a competing rule without
            an even longer selector or an <code>!important</code> — which is exactly how the{' '}
            <code>!important</code> count reached 340 in the first place (Part 03). The{' '}
            <code>margin-top: 13px</code> is one of dozens of near-duplicate spacing values with no
            shared system behind them (Part 02). And the class itself mixes three different naming
            styles depending on which era of the product it came from (Part 01).
          </Para>

          <CodeBox label="The rewritten rule, after introducing a spacing scale and BEM">{`.price--sale {
  color: var(--color-danger);
  margin-top: var(--space-3);
}`}</CodeBox>

          <Para>
            The sprint&apos;s actual output was not a redesign — the page looks identical to a user.
            It was a systematic pass converting the highest-traffic components to a spacing scale, a
            consistent BEM naming scheme, and flat, class-only selectors with zero{' '}
            <code>!important</code> in the new rules. Three months later, the team&apos;s internal
            metric for "average time to safely ship a small CSS change" had dropped by more than half —
            not because anyone got faster at writing CSS, but because the CSS itself stopped fighting
            back.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Writing Maintainable CSS</SectionTitle>

        {[
          {
            wrong: '"!important is a normal, everyday tool for making sure a style applies"',
            right: 'It should be reserved almost exclusively for overriding third-party CSS you cannot otherwise beat on specificity. Reaching for it against your own project\'s CSS is a strong signal that the underlying selector strategy — not the specific rule — is the actual problem, and it compounds: once one rule uses it, overriding that rule later usually requires another !important, starting the exact escalation shown in Part 03.',
          },
          {
            wrong: '"Using more specific selectors (extra classes, nested elements) makes CSS more robust"',
            right: 'It usually makes CSS more FRAGILE, not more robust — an overqualified selector like div.container ul.nav-list li.nav-item is locked to that exact markup structure and breaks the moment a tag changes during a refactor. A single, well-named class is both more robust to markup changes and easier to override intentionally later.',
          },
          {
            wrong: '"A design system / spacing scale is only worth the setup cost on very large projects"',
            right: 'The setup cost is a handful of custom property declarations in one file — genuinely small even on a tiny project — while the cost of NOT having one compounds silently from day one, since every hardcoded value is a future inconsistency waiting to happen. It is one of the cheapest structural decisions you can make early.',
          },
          {
            wrong: '"BEM (or any naming convention) is just a style preference with no real technical benefit"',
            right: 'A consistent naming convention directly lowers selector specificity (since it removes the need to nest selectors for uniqueness), makes classes searchable and predictable across a codebase, and makes intent explicit in the name itself. The specific convention chosen matters far less than the fact that one is chosen and consistently followed.',
          },
          {
            wrong: '"Splitting CSS into many small files automatically makes it more maintainable"',
            right: 'Splitting files only helps if the SPLIT itself is organized around components with predictable load order — otherwise it just spreads the same specificity and cascade problems across more files, making them harder to find. File organization and selector discipline are two separate problems, and fixing only one does not fix the other.',
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
            q: 'Why is !important considered risky, and when is it actually acceptable to use?',
            a: 'It overrides normal specificity calculation entirely, and once used, overriding it again typically requires another !important (with source order deciding the winner between two of equal weight) — creating an escalating pattern that is hard to reason about and hard to undo. It is broadly considered acceptable only when overriding third-party or vendor CSS you do not control and cannot otherwise beat on specificity — not as a routine tool inside your own application styles.',
          },
          {
            q: 'How would you explain CSS specificity to someone who has never heard of it, using a concrete example?',
            a: 'Specificity is the set of rules the browser uses to decide which of several conflicting rules targeting the same element actually applies, ranked roughly as: inline styles and !important highest, then ID selectors, then classes/attributes/pseudo-classes, then element selectors lowest. Given .nav a { color: blue; } and a { color: red; }, the class-qualified selector wins and the link renders blue, regardless of which rule appears later in the file — specificity is checked before source order.',
          },
          {
            q: 'What is a "magic number" in CSS, and what is the standard fix?',
            a: 'A magic number is a hardcoded value (a pixel amount, typically) with no explanation for why that specific value was chosen, scattered ad hoc across a stylesheet — margin-bottom: 13px in one place, 17px in another, with no relationship between them. The standard fix is a design-token scale: a small, fixed set of values expressed as CSS custom properties (--space-1 through --space-8, for example) that every component draws from, so spacing stays consistent and any global adjustment becomes a one-line change.',
          },
          {
            q: 'Why does box-sizing: border-box matter, and where should it typically be applied?',
            a: 'Under the default box-sizing: content-box, padding and border are added ON TOP of a declared width/height, so a 300px-wide box with 20px padding and a 2px border actually renders at 344px. box-sizing: border-box makes width/height include padding and border instead, matching what most developers intuitively expect. It is almost always applied once, globally, via a universal selector (* { box-sizing: border-box; }) rather than per-component, so every element in the project behaves consistently.',
          },
          {
            q: 'What makes a CSS selector "overqualified," and why is that a maintainability problem rather than just a style nitpick?',
            a: 'An overqualified selector adds unnecessary type/tag prefixes or extra nesting beyond what is needed to uniquely target an element — div.container ul.nav-list li.nav-item a.nav-link when .nav-link alone would do. It is a real maintainability problem because it locks the rule to that exact markup structure (breaking silently if a <ul> becomes a <nav> during a later refactor) and it raises the selector\'s specificity unnecessarily, making it harder for a later, legitimate override to win without escalating specificity further.',
          },
          {
            q: 'If you inherited a large stylesheet with heavy specificity conflicts and constant !important use, what would your actual remediation plan look like?',
            a: 'Not a rewrite — a systematic, incremental pass: introduce a spacing/design-token scale first (lowest risk, immediate consistency win), adopt one consistent naming convention (BEM or similar) for any component touched going forward, and flatten selectors to single classes as components are naturally touched during regular feature work rather than a dedicated big-bang refactor. New !important usage gets flagged in review; existing usage gets removed opportunistically as its owning component is touched, prioritized by which components change most often, since those are where the specificity conflicts cause the most ongoing pain.',
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
        <SectionTitle>Broken CSS, Fixed — Five More Patterns Worth Recognizing on Sight</SectionTitle>

        <SubSubTitle>Relying on !important to fix a specificity fight instead of the selector</SubSubTitle>
        <CodeBox label="Broken — papers over the real problem">{`.sidebar .widget .title { font-size: 14px; }
.title { font-size: 18px !important; }`}</CodeBox>
        <CodeBox label="Fixed — resolve the actual specificity mismatch">{`.widget__title { font-size: 18px; }`}</CodeBox>

        <SubSubTitle>Hardcoding a color instead of referencing a design token</SubSubTitle>
        <CodeBox label="Broken — this exact hex value now needs to be found and changed everywhere it was copy-pasted">{`.button-primary { background: #1a73e8; }
.link { color: #1a73e8; }
.badge--info { border-color: #1a73e8; }`}</CodeBox>
        <CodeBox label="Fixed — one source of truth, defined once">{`:root { --color-primary: #1a73e8; }
.button-primary { background: var(--color-primary); }
.link { color: var(--color-primary); }
.badge--info { border-color: var(--color-primary); }`}</CodeBox>

        <SubSubTitle>Styling based on an element's position instead of a semantic class</SubSubTitle>
        <CodeBox label="Broken — inserting a new item anywhere shifts every rule below it">{`.list-item:nth-child(3) { font-weight: bold; }
/* Meant to bold "the featured item" — but that just happens to be
   the 3rd item today. Reordering the list silently moves the styling
   to the wrong item. */`}</CodeBox>
        <CodeBox label="Fixed — style what the element IS, not where it happens to sit">{`.list-item--featured { font-weight: bold; }
/* <li class="list-item list-item--featured">...</li> */`}</CodeBox>

        <SubSubTitle>Forgetting that CSS custom properties inherit and cascade like any other property</SubSubTitle>
        <CodeBox label="Broken — the override is placed somewhere it can never reach the element that needs it">{`:root { --card-bg: white; }
.dark-mode .sidebar { --card-bg: #1a1a1a; }
.card { background: var(--card-bg); }
/* If .card lives OUTSIDE .sidebar in the DOM, this override never
   applies to it — custom properties only cascade to descendants of
   whatever selector sets them. */`}</CodeBox>
        <CodeBox label="Fixed — set the override at a scope that actually contains every element that needs it">{`:root { --card-bg: white; }
.dark-mode { --card-bg: #1a1a1a; }
.card { background: var(--card-bg); }`}</CodeBox>

        <SubSubTitle>Duplicating an entire rule for one small variation</SubSubTitle>
        <CodeBox label="Broken — two rules that will inevitably drift apart over time">{`.card { padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); background: white; }
.card-compact { padding: 8px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); background: white; }`}</CodeBox>
        <CodeBox label="Fixed — share the base, override only what actually differs">{`.card { padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); background: white; }
.card--compact { padding: 8px; }`}</CodeBox>
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Warnings and Symptoms You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `Element renders at 344px when the stylesheet declared width: 300px`,
            cause: 'The default box-sizing: content-box adds padding and border on top of the declared width/height instead of including them within it, exactly the trap covered in Part 05.',
            fix: 'Apply box-sizing: border-box globally with a universal selector rule near the top of your base stylesheet, so width/height always represent the element\'s full rendered size.',
          },
          {
            error: `A style change to a shared class has no visible effect on the page`,
            cause: 'A more specific selector elsewhere in the cascade (or one loaded later with equal specificity) is winning instead — a symptom of the specificity escalation pattern from Part 03, especially common once !important is already present anywhere nearby in the cascade.',
            fix: 'Use DevTools\' Styles/Computed panel to see every competing rule and which one is actually winning (struck-through rules show what lost). Flatten the winning selector to a single class rather than adding a still-more-specific override on top.',
          },
          {
            error: `Chrome DevTools "Coverage" tab reports a large percentage of unused CSS`,
            cause: 'Dead rules accumulated over time from removed features or renamed classes that were never cleaned up in the stylesheet, exactly the debt pattern covered in Part 07.',
            fix: 'Cross-reference flagged selectors against the current markup before deleting — the Coverage tab reports what was not applied during THIS page load/interaction, which is a strong signal but not absolute proof a rule is dead everywhere in the app.',
          },
          {
            error: `A component looks correct on desktop and completely broken on an actual phone, despite matching media queries in DevTools' responsive mode`,
            cause: 'The <meta name="viewport"> tag is missing from the document head, so a real mobile browser renders the page at a virtual desktop width and zooms out — the media query breakpoints never actually trigger the way DevTools\' simulated view suggested they would.',
            fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the document <head>, and test on an actual device (or DevTools\' device toolbar with throttling) rather than only a resized desktop browser window.',
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
        'Pick one naming convention (BEM or similar) and apply it everywhere — the specific system matters less than consistency, which makes class names predictable, searchable, and self-documenting.',
        'Magic numbers (ad hoc pixel values with no shared system) are one of the biggest sources of layout drift. A spacing scale built from CSS custom properties turns "make spacing tighter everywhere" into a one-line change instead of a codebase-wide search.',
        'Specificity wars escalate quietly — each locally reasonable fix (a more specific selector, then !important) raises the bar for the next fix. Flat, single-class selectors and one class per intended appearance avoid the escalation entirely.',
        '!important should be rare, reserved mainly for overriding third-party CSS you cannot beat on specificity — not a routine tool for winning disagreements inside your own stylesheet.',
        'box-sizing: border-box, applied globally, prevents the most common box-model surprise: padding and border silently expanding an element beyond its declared width.',
        'Splitting CSS into files only helps if load order stays predictable and each file has a clear, guessable responsibility — organization and selector discipline are two separate problems.',
        'Small habits compound: minimal shorthand usage, comments that explain "why" not "what," and deleting dead CSS as soon as its markup is removed are all individually minor but collectively define whether a stylesheet stays healthy for years or gets rewritten from scratch.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          The final module in this track pulls everything together into interview-ready form —
          semantic HTML, the box model, specificity, Flexbox vs Grid, responsive design, and
          accessibility, plus fully worked hands-on layout challenges like centering a div three
          different ways and fixing a broken sticky footer.
        </p>
        <Link href="/learn/html-css/html-css-interview-prep" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 42 → HTML &amp; CSS Interview Prep — Common Questions and Patterns
        </Link>
      </div>
    </LearnLayout>
  )
}
