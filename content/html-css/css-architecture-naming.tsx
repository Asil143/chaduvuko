import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CSS Architecture & Naming Conventions — HTML & CSS | Chaduvuko',
  description:
    'BEM and other naming systems, organizing large stylesheets, and the patterns that keep CSS maintainable as a project grows.',
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

export default function CssArchitectureNaming() {
  return (
    <LearnLayout
      title="CSS Architecture & Naming Conventions"
      description="BEM and other naming systems, organizing large stylesheets, and the patterns that keep CSS maintainable as a project grows."
      section="HTML & CSS — Module 35"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Naming Matters at Scale" />
        <SectionTitle>The Problem That Only Shows Up Once a Project Grows</SectionTitle>

        <Para>
          A single-page project with 200 lines of CSS does not need a naming convention — you can see
          every rule at once, and any class name that is reasonably descriptive works fine. That stops
          being true almost immediately once a project grows past a handful of files, several
          contributors, and hundreds of components. Two specific problems appear, and they compound each
          other: <strong>name collisions</strong> (two unrelated components both reach for{' '}
          <code>.title</code>, <code>.header</code>, or <code>.active</code>, and one silently overrides
          the other) and <strong>unclear ownership</strong> (looking at <code>.item</code> in a stylesheet
          gives no information about which component it belongs to, whether it is safe to change, or what
          else on the page might break if you touch it).
        </Para>

        <CodeBox label="A collision that is easy to introduce and hard to trace">{`/* components/UserCard.css */
.title { font-size: 18px; font-weight: 700; }

/* components/ProductCard.css, added six months later by a different engineer */
.title { font-size: 14px; color: var(--muted); }

/* Both files load on the same page. Whichever loads LAST wins — for BOTH
   components — and neither engineer necessarily knows the other's .title
   rule even exists. */`}</CodeBox>

        <Para>
          Naming conventions exist to solve exactly this class of problem, systematically, before it
          happens — not by being clever, but by making every class name self-describing enough that a
          collision becomes structurally difficult to create by accident, and by making it obvious at a
          glance which component and state a given class belongs to.
        </Para>

        <Callout type="info">
          This module focuses on <strong>BEM</strong> (Block, Element, Modifier), by a meaningful margin
          the most widely adopted naming convention in real production CSS today, along with the broader
          architectural habits — stylesheet organization, specificity discipline — that any naming system
          needs to be paired with to actually deliver on its promise.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — BEM: The Core Idea" />
        <SectionTitle>Block, Element, Modifier — The Three Concepts BEM Is Built On</SectionTitle>

        <Para>
          BEM organizes every class name around three concepts, applied consistently across an entire
          codebase. A <strong>Block</strong> is a standalone, reusable component — something that makes
          sense on its own, like a card, a form, or a navigation menu. An <strong>Element</strong> is a
          part of a block that has no meaning outside of it — a card&apos;s title, a form&apos;s submit
          button, a menu&apos;s individual item. A <strong>Modifier</strong> is a flag that changes a
          block or element&apos;s appearance or behavior — a card that is <code>featured</code>, a button
          that is <code>disabled</code>, a menu item that is <code>active</code>.
        </Para>

        <CodeBox label="The BEM naming pattern">{`.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }

/* Two underscores connect a block to its element.
   Two hyphens connect a block (or element) to its modifier.
   This is a strict, memorable convention — not a loose guideline. */`}</CodeBox>

        <Para>
          The double-underscore and double-hyphen separators are deliberate — they need to be visually
          distinct enough from a normal single hyphen used inside an ordinary multi-word name (like{' '}
          <code>card-wrapper</code>) that a reader can immediately tell, just from the punctuation alone,
          whether they are looking at a block, an element within a block, or a modifier on either one.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — A Full Worked Example" />
        <SectionTitle>Building a Product Card in BEM, Start to Finish</SectionTitle>

        <Para>
          The clearest way to actually absorb BEM is watching it applied to one real component from
          start to finish. Here is a product card with an image, a title, a price, a "sale" state, and an
          add-to-cart button — first the markup, then the full BEM-named stylesheet for it.
        </Para>

        <CodeBox label="The HTML — BEM class names describe structure directly in the markup">{`<div class="product-card product-card--sale">
  <img class="product-card__image" src="/sneaker.jpg" alt="Running sneaker, coral colorway">
  <div class="product-card__body">
    <h3 class="product-card__title">Trail Runner Pro</h3>
    <p class="product-card__price product-card__price--discounted">
      <span class="product-card__price-original">$129</span>
      <span class="product-card__price-current">$89</span>
    </p>
    <button class="product-card__button product-card__button--disabled" disabled>
      Sold Out
    </button>
  </div>
</div>`}</CodeBox>

        <CodeBox label="The CSS — every selector is a single class, never more than one level deep">{`.product-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.product-card--sale {
  border-color: #d32f2f;
}

.product-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.product-card__body {
  padding: 16px;
}

.product-card__title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.product-card__price {
  font-size: 14px;
}

.product-card__price-original {
  text-decoration: line-through;
  color: var(--muted);
  margin-right: 8px;
}

.product-card__price-current {
  color: #d32f2f;
  font-weight: 700;
}

.product-card__button {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  background: var(--accent);
}

.product-card__button--disabled {
  background: var(--muted);
  cursor: not-allowed;
}`}</CodeBox>

        <Para>
          Notice what is genuinely different here compared to writing this the "obvious" way: every
          single selector is exactly one class, with zero nesting and zero reliance on parent-child
          relationships in the CSS itself (like <code>.product-card .title</code>). The relationship
          between the card and its title is expressed entirely in the <em>name</em> —{' '}
          <code>product-card__title</code> — not in the selector&apos;s structure. This is the specific
          design choice that makes BEM classes safe to reuse: a <code>.product-card__title</code> rule
          only ever matches an element explicitly given that exact class, regardless of where it happens
          to sit in the DOM.
        </Para>

        <Callout type="tip">
          BEM deliberately avoids nested elements within elements in its naming — you will essentially
          never see <code>block__element__subelement</code>. If a piece of markup feels like it needs to
          go two levels deep, that is usually a sign it deserves to be its own block (a{' '}
          <code>.price-tag</code> block, in the example above, rather than{' '}
          <code>product-card__price__current</code>), which keeps every block&apos;s internal structure
          flat and independently reusable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Why Flat, Single-Class Selectors Matter" />
        <SectionTitle>The Specificity Payoff — Comparing BEM Against the "Obvious" Nested Approach</SectionTitle>

        <Para>
          It is worth being explicit about exactly what BEM&apos;s flat, single-class approach buys you,
          because the alternative genuinely looks more natural to someone who has not been burned by it
          yet.
        </Para>

        <CodeBox label="The instinctive way to write this without BEM — nested descendant selectors">{`.product-card .title { font-size: 16px; }
.product-card .price { font-size: 14px; }
.product-card .price.discounted { color: #d32f2f; }
.product-card .button.disabled { background: var(--muted); }`}</CodeBox>

        <Para>
          This looks reasonable in isolation, but it silently creates two compounding problems as the
          project grows. First, every rule&apos;s specificity is now higher than a single class (two
          classes: 0,0,2,0 for <code>.price.discounted</code>), which makes these rules progressively
          harder to override later without reaching for even more specific selectors or{' '}
          <code>!important</code> — exactly the specificity escalation problem covered in the Selectors
          Deep Dive module (Module 20). Second, and just as damaging: <code>.title</code>,{' '}
          <code>.price</code>, and <code>.button</code> are now generic enough that they are highly likely
          to collide with an unrelated component reusing the same short, common name, exactly like the{' '}
          <code>.title</code> collision shown in Part 01.
        </Para>

        <CodeBox label="The BEM version avoids both problems simultaneously">{`.product-card__title { font-size: 16px; }
.product-card__price { font-size: 14px; }
.product-card__price--discounted { color: #d32f2f; }
.product-card__button--disabled { background: var(--muted); }

/* Every selector is ONE class — specificity 0,0,1,0, flat and consistent
   across the entire codebase. And "product-card__title" is specific
   enough as a NAME that it will essentially never collide with an
   unrelated component's class, without needing extra selector nesting
   to disambiguate it. */`}</CodeBox>

        <Para>
          This is the core insight BEM is built around: instead of using selector nesting (multiple
          combined classes, or descendant combinators) to make a rule specific enough to be safe, BEM
          makes the <em>class name itself</em> specific enough that a single, flat class selector is all
          you ever need. The disambiguation work moves from the selector&apos;s structure into the
          name&apos;s vocabulary.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Avoiding Over-Specific Selectors and !important" />
        <SectionTitle>The Two Habits That Undo Everything a Naming Convention Buys You</SectionTitle>

        <Para>
          A consistent naming convention only pays off if it is paired with actual specificity discipline
          — otherwise the same old problems creep back in through a different door. Two habits do more
          damage to a large CSS codebase&apos;s maintainability than almost anything else: chaining
          selectors more specific than necessary, and reaching for <code>!important</code> to force a
          rule to win instead of addressing why it was losing in the first place.
        </Para>

        <CodeBox label="Over-specific selectors — solving a problem that shouldn't exist">{`/* Written because ".button" alone wasn't winning against some
   other rule elsewhere in the stylesheet */
div.product-card .body .button.primary { background: blue; }

/* Six months later, someone needs to override THIS — and the only
   way to beat 0,0,3,2 without !important is to write something
   even MORE specific, and the arms race continues indefinitely */`}</CodeBox>

        <CodeBox label="!important — the escape hatch that breaks the entire cascade for everyone after you">{`.button {
  background: blue !important;
}

/* Now NOTHING can override this normally — not a more specific
   selector, not a later rule, nothing except another !important
   with source-order priority. Every future engineer who needs to
   change this button's color in one specific context is forced
   to either add their own !important (compounding the problem)
   or resort to inline styles with an even higher priority. */`}</CodeBox>

        <Para>
          Both of these are almost always symptomatic fixes for a root cause that a naming convention is
          specifically designed to prevent: a selector losing to something it should never have been
          competing against in the first place, because two unrelated rules ended up targeting
          overlapping, poorly-scoped class names. With BEM, the honest fix is very rarely "make this
          selector more specific" — it is almost always "give this specific case its own modifier class,"
          which keeps specificity flat and the intent explicit in the name itself.
        </Para>

        <CodeBox label="The BEM-consistent fix — a modifier, not a specificity escalation">{`.product-card__button {
  background: var(--accent);
}

.product-card__button--primary {
  background: blue;
  /* Same specificity as any other single class — no nesting,
     no !important, and the name documents exactly what this
     variant IS, rather than where it happens to sit in the DOM */
}`}</CodeBox>

        <Callout type="warning">
          <code>!important</code> is not banned outright in every real codebase — it occasionally has a
          legitimate, narrow use overriding a third-party library&apos;s inline styles you cannot
          otherwise touch. But inside your own project&apos;s own stylesheets, reaching for it is very
          often a sign that the actual problem — usually an overly generic class name, or a rule that was
          allowed to be more specific than it needed to be — was never actually fixed, just papered over.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Organizing Stylesheets Into Partials" />
        <SectionTitle>Splitting One Giant Stylesheet Into Files That Mirror the Naming Structure</SectionTitle>

        <Para>
          A naming convention solves the "what do I call this class" problem; file organization solves
          the equally real "where do I even find this rule" problem. A single, several-thousand-line{' '}
          <code>styles.css</code> file is one of the most common sources of friction on a growing project
          — finding anything requires searching by class name and hoping you guessed the right term, and
          two engineers editing different components in the same giant file constantly produce merge
          conflicts even when their actual changes never overlap logically.
        </Para>

        <CodeBox label="A typical partial-based structure, organized around BEM blocks">{`styles/
  base/
    _reset.css
    _typography.css
    _variables.css
  components/
    _product-card.css
    _nav-menu.css
    _button.css
    _form-field.css
  layout/
    _header.css
    _footer.css
    _grid.css
  pages/
    _checkout.css
    _product-listing.css
  main.css          /* imports everything else, in a deliberate order */`}</CodeBox>

        <CodeBox label="main.css — the single entry point that assembles every partial">{`@import "base/variables";
@import "base/reset";
@import "base/typography";

@import "layout/grid";
@import "layout/header";
@import "layout/footer";

@import "components/button";
@import "components/nav-menu";
@import "components/form-field";
@import "components/product-card";

@import "pages/product-listing";
@import "pages/checkout";`}</CodeBox>

        <Para>
          The leading underscore on each partial filename (<code>_product-card.css</code>) is a
          convention borrowed directly from Sass — covered in full in the next module — signaling "this
          file is a partial, meant to be imported, not compiled or linked on its own." The organizing
          principle worth internalizing here: <strong>one file per BEM block</strong>. Because every rule
          for a given block already shares the same class-name prefix, the file boundary and the naming
          boundary reinforce each other — finding every rule that affects{' '}
          <code>.product-card</code> means opening exactly one file, every time, with no searching
          required.
        </Para>

        <Callout type="tip">
          Import order genuinely matters in plain CSS, since later rules with equal specificity win — the
          ordering shown above (variables and resets first, then layout, then components, then
          page-specific overrides last) follows the same "general to specific" progression that keeps the
          cascade predictable, rather than fighting it.
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
        <SectionTitle>A CSS Rewrite at a Chicago Media Company&apos;s Subscriber Portal</SectionTitle>

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
            Scenario — Media company, Chicago · Legacy CSS cleanup
          </div>

          <Para>
            A Chicago-based media company&apos;s subscriber account portal had grown, over four years and
            a rotating cast of engineers, into an 11,000-line <code>styles.css</code> file with no
            organizing convention at all — plain, short class names like <code>.title</code>,{' '}
            <code>.active</code>, and <code>.disabled</code> reused across dozens of unrelated components,
            layered with 340 separate <code>!important</code> declarations accumulated one emergency fix
            at a time.
          </Para>

          <SubSubTitle>What the audit found</SubSubTitle>

          <Para>
            A new front-end lead is asked to fix a styling bug on the billing page: changing a
            button&apos;s color there was inexplicably also changing an unrelated button&apos;s color on
            the account settings page. Tracing it back, both buttons shared the plain class{' '}
            <code>.btn-active</code>, defined once with a specificity fight already baked in via nested
            selectors, and a well-meaning previous fix had added <code>!important</code> to force the
            billing page&apos;s version to win — silently making it impossible for the settings page to
            ever look different without its own, higher-priority override.
          </Para>

          <CodeBox label="What the codebase actually looked like">{`/* billing.css */
.panel .btn-active { background: green !important; }

/* settings.css, loaded on a different page but sharing the SAME
   plain class name coincidentally */
.settings-panel .btn-active { background: blue; }
/* This rule can never win — the !important above outranks it
   regardless of specificity or source order, even though the
   two rules are meant to style two completely unrelated buttons */`}</CodeBox>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            Rather than patching the immediate bug with yet another <code>!important</code>, the team
            adopted BEM going forward and began migrating components one at a time as they were touched
            for other reasons — a pragmatic, incremental approach rather than a risky big-bang rewrite of
            11,000 lines at once.
          </Para>

          <CodeBox label="The BEM-renamed versions — each button now unambiguously scoped to its own block">{`/* components/_billing-panel.css */
.billing-panel__button--active { background: green; }

/* components/_settings-panel.css */
.settings-panel__button--active { background: blue; }
/* Zero specificity fight, zero !important needed — the two rules
   were never actually competing in the first place, once each
   button's class name unambiguously named which component owns it */`}</CodeBox>

          <Para>
            Eighteen months into the incremental migration, the team had eliminated the majority of the{' '}
            <code>!important</code> declarations simply as a side effect of components no longer needing
            them once their class names stopped colliding, and new engineers consistently reported that
            finding and safely modifying a component&apos;s styles took a fraction of the time it used
            to. Nothing about this required exotic tooling — it was purely the naming discipline plus the
            file-per-block organization from Part 06, applied consistently over time.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About CSS Architecture</SectionTitle>

        {[
          {
            wrong: '"BEM class names are ugly and verbose for no real reason"',
            right: 'The length is the entire point, not an accident — a name like product-card__button--disabled is deliberately specific enough to make an accidental collision with an unrelated component structurally unlikely, without needing extra selector nesting or added specificity to disambiguate it.',
          },
          {
            wrong: '"!important is fine to use whenever a rule isn\'t winning like you expect"',
            right: '!important almost always treats a symptom rather than the cause — usually an overly generic class name or a selector that was allowed to be more specific than necessary. It also makes the SPECIFIC declaration it\'s on nearly impossible for anyone downstream to override normally, which tends to force the next engineer into their own !important, compounding the problem.',
          },
          {
            wrong: '"A naming convention is a stylistic preference, similar to tabs vs. spaces"',
            right: 'It has a direct, measurable effect on specificity and collision risk at scale, not just aesthetics — a flat, single-class BEM selector has fundamentally lower and more consistent specificity than nested nested descendant selectors, which is exactly the mechanism that keeps overrides predictable as a project grows.',
          },
          {
            wrong: '"BEM only makes sense for large teams, not solo or small projects"',
            right: 'The habits it enforces — flat selectors, self-describing names, one file per component — cost almost nothing to apply on a small project and pay off immediately the moment that project grows, which it very often does. Adopting the convention from day one is cheaper than retrofitting it later, exactly as shown in the Real World example above.',
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
            q: 'Explain the Block, Element, Modifier structure in BEM, with an example of each.',
            a: 'A Block is a standalone, reusable component (.product-card). An Element is a part of a block with no independent meaning outside it, connected with a double underscore (.product-card__title). A Modifier is a flag that changes a block or element\'s appearance or state, connected with a double hyphen (.product-card--sale, or .product-card__button--disabled). The separators are visually distinct on purpose, so a reader can tell at a glance which of the three they are looking at.',
          },
          {
            q: 'Why does BEM avoid nested descendant selectors like .card .title, favoring single flat classes like .card__title instead?',
            a: 'A nested descendant selector has higher, less consistent specificity, and depends on DOM structure rather than an explicit name to establish the relationship between a component and its part. A flat single-class selector keeps specificity uniform (one class = one level, everywhere), and moves the disambiguation work into the class NAME itself, which makes accidental collisions between unrelated components structurally much harder to create.',
          },
          {
            q: 'Why is !important considered harmful in a team codebase, even though it solves the immediate problem of a rule not winning?',
            a: 'It does not just win the current declaration — it makes that declaration nearly impossible for any future rule to override through normal means (only another !important, with source order deciding ties among those), which tends to force whoever needs to override it next into adding their own !important, compounding the problem across the codebase over time. It is almost always a symptom of an underlying naming or specificity problem that was never actually fixed.',
          },
          {
            q: 'How would you organize the CSS for a medium-to-large project into files, and why?',
            a: 'Split into partials organized by role — base/reset and variables first, then layout, then one file per component (ideally one file per BEM block), then page-specific overrides last — assembled through a single entry point that imports them in a deliberate general-to-specific order. This keeps import order aligned with cascade priority, and because each file maps to one BEM block, finding every rule affecting a component means opening exactly one file rather than searching a monolithic stylesheet.',
          },
          {
            q: 'A teammate proposes writing `.sidebar .card.featured .price` to fix a styling bug. What would you push back on, and what would you suggest instead?',
            a: 'That selector is four levels deep with a compound class, giving it high, inconsistent specificity that will be hard to override later and signals a genuine naming/scoping problem rather than a one-off exception. The BEM-consistent fix is almost always giving the specific case its own modifier class scoped to its actual block — e.g. .card__price--featured — which keeps specificity flat (a single class) and makes the intent explicit in the name rather than in fragile DOM-dependent nesting.',
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
        <SectionTitle>Architecture Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            broken: `.card__title__text {
  /* an element nested inside an element — not valid BEM */
  font-weight: 700;
}`,
            fixed: `.card__title {
  /* if "title" needs internal parts of its own, it usually
     deserves to be promoted to its own block instead */
  font-weight: 700;
}`,
          },
          {
            broken: `.nav-item.active {
  /* a bare, generic modifier class with no block prefix at all —
     ".active" alone WILL eventually collide with an unrelated component */
  color: blue;
}`,
            fixed: `.nav-item--active {
  /* the modifier is scoped to its block by name, not just by
     accidentally being written near it in the same file */
  color: blue;
}`,
          },
          {
            broken: `.header nav ul li a.current {
  /* five levels deep, mixing tag selectors and one class —
     high specificity, and fragile if the markup structure ever changes */
  font-weight: 700;
}`,
            fixed: `.main-nav__link--current {
  /* one flat class, independent of markup structure entirely —
     still works even if the underlying HTML tags change */
  font-weight: 700;
}`,
          },
          {
            broken: `.button {
  background: blue !important;
  /* forced to win against SOMETHING — but now every future
     override needs its own !important too */
}`,
            fixed: `.button--primary {
  background: blue;
  /* give the specific case its own modifier instead of forcing
     a generic class to behave differently via !important */
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
        <SectionTitle>Real Bugs This Topic Produces — And Exactly Why</SectionTitle>

        {[
          {
            error: `A component's styling changes unexpectedly after an unrelated file elsewhere in the project is edited`,
            cause: 'Two components share a short, generic class name (like .title or .active) with no block-scoping prefix, so a change intended for one component\'s styles silently also matches the other, wherever it happens to be loaded on the same page.',
            fix: 'Rename both classes to be block-scoped and self-describing — e.g. .product-card__title and .user-profile__title — so the two rules can never accidentally match each other\'s markup again.',
          },
          {
            error: `A style change requires adding !important just to take effect, even though the selector looks reasonable`,
            cause: 'An earlier rule targeting the same element already has higher specificity (often from unnecessary nesting or a compound selector), or an earlier !important is already in place, and the cascade is now being fought rather than worked with.',
            fix: 'Trace back to the earlier, higher-specificity rule using DevTools\' computed styles panel (it lists every competing rule and shows which one is winning and why) and address the ROOT rule\'s specificity — flatten it to a single class, or scope it correctly — rather than adding another layer of !important on top.',
          },
          {
            error: `Merge conflicts in the CSS file for nearly every pull request, even between engineers working on unrelated features`,
            cause: 'All of the project\'s CSS lives in one large, unsegmented file, so any two changes anywhere in the stylesheet are statistically likely to land near each other in the file and produce a git conflict, even when the underlying changes have nothing to do with each other.',
            fix: 'Split the stylesheet into partials organized one file per component/block, as covered in Part 06 — conflicts become far less frequent once two unrelated components\' styles physically live in two different files.',
          },
          {
            error: `A class appears to do nothing when applied, with no error in the console`,
            cause: 'CSS specificity conflicts never produce console errors or warnings — an overridden rule fails completely silently, which is exactly why over-specific, hard-to-trace selectors are so much more dangerous in CSS than a typo would be in a language that actually throws exceptions.',
            fix: 'Use the browser DevTools Elements panel\'s computed/styles view on the affected element — it shows every matching rule in specificity order, with overridden rules visibly struck through, making the winning rule (and why it won) immediately visible.',
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
        'BEM organizes class names around Block (a standalone component), Element (a part of a block, connected with __), and Modifier (a variant flag, connected with --).',
        'BEM selectors stay flat — a single class, never a chain of nested descendant selectors — which keeps specificity uniform and low across the entire codebase.',
        'The disambiguation work that nested selectors used to handle is moved into the class NAME itself, which is exactly what makes accidental collisions between unrelated components structurally unlikely.',
        'Over-specific selectors and !important both treat symptoms, not causes — the honest fix for a losing rule is almost always giving the specific case its own properly-scoped modifier class.',
        '!important makes its own declaration nearly impossible to override normally, which tends to force the next engineer who needs to change it into adding their own !important, compounding the problem over time.',
        'Organize stylesheets as partials, ideally one file per BEM block, assembled through a single entry point in a deliberate general-to-specific import order — this reduces both search time and merge conflicts.',
        'CSS specificity conflicts fail completely silently, with no console error — the browser DevTools computed/styles panel is the tool for seeing exactly which rule won and why.',
        'Adopting a naming convention costs very little on a small project and compounds in value as that project grows — retrofitting it onto an already-large, unconventioned codebase is far more expensive, as shown in the Real World example.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 36 covers Sass — the preprocessor that came before native CSS variables, with real
          $variables, nesting, mixins, and why many production codebases still reach for it today.
        </p>
        <Link href="/learn/html-css/intro-to-sass" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 36 → Intro to Sass — Variables, Nesting, Mixins
        </Link>
      </div>
    </LearnLayout>
  )
}
