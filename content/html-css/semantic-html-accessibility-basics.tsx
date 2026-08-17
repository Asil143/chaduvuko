import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Semantic HTML & Accessibility Basics | Chaduvuko',
  description:
    'Why semantic tags matter beyond convenience, basic ARIA roles and aria-label, how to write alt text that actually helps, and why "div soup" fails real users, not just SEO.',
}

const C = '#00e676'

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

export default function SemanticHtmlAccessibilityBasics() {
  return (
    <LearnLayout
      title="Semantic HTML & Accessibility Basics"
      description="Why semantics matter beyond styling — ARIA basics, accessible forms, and how screen readers and search engines actually read your page."
      section="HTML & CSS — Module 10"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Beyond Convenience" />
        <SectionTitle>Why Semantic Tags Matter — For More Than Just Tidy Code</SectionTitle>

        <Para>
          By this point in the track you have already used <code>{'<header>'}</code>,{' '}
          <code>{'<nav>'}</code>, <code>{'<main>'}</code>, <code>{'<section>'}</code>,{' '}
          <code>{'<article>'}</code>, <code>{'<aside>'}</code>, and <code>{'<footer>'}</code> —
          semantic tags that describe what a piece of content <em>is</em>, not just how it should look.
          It is tempting to think of the difference between these and a generic{' '}
          <code>{'<div>'}</code> as purely stylistic — after all, a <code>{'<nav>'}</code> and a{' '}
          <code>{'<div class="nav">'}</code> can be made to look pixel-identical with CSS. This module
          is about the part of the story that has nothing to do with appearance at all: semantic tags
          are read directly by software other than a rendering engine — screen readers, browser
          extensions, search engine crawlers, and browser built-in features like Reader Mode — and each
          of those depends on the tag actually being correct, not merely styled to look correct.
        </Para>

        <CodeBox label="Visually identical, structurally very different">{`<!-- Version A — looks fine, means nothing to assistive technology -->
<div class="nav">
  <div class="nav-item"><a href="/">Home</a></div>
  <div class="nav-item"><a href="/about">About</a></div>
</div>

<!-- Version B — identical appearance with the right CSS, but this
     is machine-readable structure, not just visual grouping -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`}</CodeBox>

        <Para>
          Both versions render identically once styled. The difference only becomes visible the moment
          something other than a sighted user with a mouse tries to use the page — which, across a
          real, large user base, is a meaningfully large fraction of visitors, and is also legally
          significant in many jurisdictions (covered further in Part 07).
        </Para>

        <Callout type="info">
          A useful mental model for the rest of this module: CSS controls how a page{' '}
          <em>looks</em>. Semantic HTML controls what a page <em>is</em>, structurally, independent of
          any stylesheet. A page with all CSS removed should still make structural sense when read
          top to bottom — that is precisely the experience a screen reader user, and a search engine
          crawler, actually has.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Landmark Navigation" />
        <SectionTitle>How Screen Readers Actually Use Landmark Navigation</SectionTitle>

        <Para>
          Semantic elements like <code>{'<header>'}</code>, <code>{'<nav>'}</code>,{' '}
          <code>{'<main>'}</code>, <code>{'<aside>'}</code>, and <code>{'<footer>'}</code> are called{' '}
          <strong>landmarks</strong> in accessibility terminology. Screen readers (VoiceOver on macOS/iOS,
          NVDA and JAWS on Windows, TalkBack on Android) build a navigable list of every landmark on the
          page, and expose a dedicated keyboard shortcut that lets a user jump directly between them —
          without needing to listen to every single line of content in between.
        </Para>

        <CodeBox label="What a screen reader's landmark list looks like for a well-structured page">{`<header>...</header>       →  Landmark: "banner"
<nav>...</nav>             →  Landmark: "navigation"
<main>                     →  Landmark: "main"
  <article>...</article>   →  Landmark: "article"
  <aside>...</aside>       →  Landmark: "complementary"
</main>
<footer>...</footer>       →  Landmark: "content info"

<!-- A VoiceOver or NVDA user can press a single key combination to
     jump straight from "banner" to "main", skipping the entire
     navigation menu — every single time, on every page that uses this
     structure, without the site author writing a single line of extra code. -->`}</CodeBox>

        <Para>
          This is precisely the accessibility equivalent of a sighted user visually scanning a page and
          immediately recognizing "that block at the top is the header, that block down there is the
          footer" without reading every word — landmarks give a non-visual user the exact same fast,
          skippable structure, but only if the underlying tags are the correct semantic ones rather than
          generic <code>{'<div>'}</code>s.
        </Para>

        <SubTitle>The &quot;skip to main content&quot; link — landmark navigation&apos;s visible cousin</SubTitle>

        <Para>
          A related, very common pattern is a "Skip to main content" link placed as the very first
          focusable element on the page, visually hidden until it receives keyboard focus. This exists
          for keyboard-only users (not necessarily screen reader users — someone using a keyboard due to
          a motor impairment, or simply preference, benefits from this too) who would otherwise need to
          tab through an entire navigation menu on every single page before reaching the actual content.
        </Para>

        <CodeBox label="A skip link, hidden until focused">{`<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>...</header>
  <nav>...</nav>
  <main id="main-content">
    ...
  </main>
</body>

<style>
  .skip-link {
    position: absolute;
    top: -40px;      /* off-screen by default */
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px 16px;
    z-index: 100;
  }
  .skip-link:focus {
    top: 0;           /* snaps into view the instant it receives keyboard focus */
  }
</style>`}</CodeBox>

        <Para>
          A <code>{'<main>'}</code> landmark with an <code>id</code> serves as this link&apos;s target,
          which is one more reason a page should have exactly one <code>{'<main>'}</code> — multiple
          instances confuse both this pattern and the landmark-jumping behavior described above.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — ARIA Roles" />
        <SectionTitle>Basic ARIA Roles — For When Semantic HTML Alone Isn&apos;t Enough</SectionTitle>

        <Para>
          ARIA (Accessible Rich Internet Applications) is a set of attributes that add accessibility
          information HTML cannot express on its own — most often needed for custom interactive widgets
          that have no native HTML equivalent, like a tab panel, a modal dialog, or a custom dropdown
          built from <code>{'<div>'}</code>s and JavaScript rather than a native{' '}
          <code>{'<select>'}</code>. The single most important rule of ARIA, stated in the official
          spec itself, is worth internalizing before anything else:
        </Para>

        <Callout type="warning">
          <strong>The First Rule of ARIA: if a native HTML element or attribute already has the
          semantics and behavior you need, use it instead of re-purposing an element and adding ARIA to
          make it accessible.</strong> A <code>{'<button>'}</code> is already keyboard-focusable, already
          announces itself as "button" to a screen reader, and already responds to Enter and Space —
          none of that has to be reconstructed with ARIA. ARIA should be reached for only when no native
          element covers the pattern you need, not as a default habit.
        </Callout>

        <CodeBox label="role — overriding what an element is announced as">{`<!-- A custom-built tab interface, made of divs, needs explicit roles
     since <div> carries no semantic meaning of its own -->
<div role="tablist">
  <div role="tab" aria-selected="true">Overview</div>
  <div role="tab" aria-selected="false">Reviews</div>
  <div role="tab" aria-selected="false">Shipping</div>
</div>
<div role="tabpanel">
  Overview content goes here...
</div>`}</CodeBox>

        <Para>
          Common roles you will genuinely see in production codebases include <code>role="alert"</code>{' '}
          (for content that should be announced immediately, like a form validation error),{' '}
          <code>role="dialog"</code> (for a modal), and <code>role="button"</code> — the last of which
          is almost always a code smell, since it usually means a <code>{'<div>'}</code> or{' '}
          <code>{'<span>'}</code> is being made to behave like a button with JavaScript, when a real{' '}
          <code>{'<button>'}</code> would have needed no role at all.
        </Para>

        <CodeBox label="An alert region for validation errors">{`<div role="alert" id="form-error">
  Please enter a valid email address.
</div>

<!-- role="alert" causes screen readers to announce this text
     IMMEDIATELY when it appears in the DOM, without the user
     needing to navigate to it manually — appropriate specifically
     for urgent, time-sensitive messages like this one. -->`}</CodeBox>

        <Callout type="tip">
          Many implicit ARIA roles already exist on native HTML elements without you writing anything —{' '}
          <code>{'<nav>'}</code> already has an implicit role of <code>navigation</code>,{' '}
          <code>{'<button>'}</code> already has an implicit role of <code>button</code>. Explicit{' '}
          <code>role</code> attributes exist to cover the gap where no native element fits, not to
          duplicate what semantic HTML already provides for free.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — aria-label and Friends" />
        <SectionTitle>aria-label, aria-labelledby, and aria-describedby</SectionTitle>

        <Para>
          <code>aria-label</code> provides an accessible name for an element directly, as a string,
          overriding whatever text content the element would otherwise be announced with. It is most
          commonly needed on icon-only buttons — a trash-can icon with no visible text has nothing for a
          screen reader to announce unless something explicitly supplies a name.
        </Para>

        <CodeBox label="aria-label on an icon-only button">{`<!-- Without aria-label, a screen reader announces this as
     just "button" — completely unhelpful -->
<button>
  <svg><!-- trash can icon --></svg>
</button>

<!-- With aria-label, it announces as "Delete item, button" -->
<button aria-label="Delete item">
  <svg><!-- trash can icon --></svg>
</button>`}</CodeBox>

        <SubTitle>aria-labelledby — pointing to existing visible text instead of duplicating it</SubTitle>

        <Para>
          When the accessible name should come from text that is already visible elsewhere on the page,{' '}
          <code>aria-labelledby</code> references that element&apos;s <code>id</code> rather than
          repeating the string — useful because it keeps a single source of truth; if the visible text
          changes, the accessible name updates automatically along with it.
        </Para>

        <CodeBox label="aria-labelledby referencing an existing heading">{`<h2 id="billing-heading">Billing Information</h2>
<section aria-labelledby="billing-heading">
  <!-- This section is announced as "Billing Information" without
       repeating that string anywhere in an aria-label -->
  ...
</section>`}</CodeBox>

        <SubTitle>aria-describedby — supplementary description, not a replacement name</SubTitle>

        <Para>
          <code>aria-describedby</code> is subtly different — it adds extra descriptive text{' '}
          <em>after</em> an element&apos;s accessible name is announced, rather than replacing that
          name. It is the standard pattern for connecting a form field to its own helper text or error
          message.
        </Para>

        <CodeBox label="Connecting a password field to its requirements">{`<label for="password">Password</label>
<input type="password" id="password" aria-describedby="password-hint">
<p id="password-hint">Must be at least 12 characters, with one number.</p>

<!-- A screen reader announces: "Password, edit text, protected.
     Must be at least 12 characters, with one number." -->`}</CodeBox>

        <Callout type="info">
          None of these three attributes change anything visually — that is precisely the point.
          They exist entirely for the accessibility tree, the parallel structure browsers build
          specifically for screen readers and other assistive technology, invisible to sighted users but
          exactly what a screen reader actually reads from.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Writing Good Alt Text" />
        <SectionTitle>Alt Text — What Actually Makes It Good or Bad</SectionTitle>

        <Para>
          You met the <code>alt</code> attribute in the Images and Media module as a required attribute
          on every <code>{'<img>'}</code>. This module goes further: not every non-empty string is
          good alt text, and the difference between good and bad alt text is entirely about whether it
          conveys the same <em>information or purpose</em> the image conveys to a sighted user — not
          about literally describing every visual detail.
        </Para>

        <CodeBox label="Bad alt text — several distinct failure modes">{`<!-- Failure 1: describes pixels, not purpose -->
<img src="chart.png" alt="a blue and orange bar chart">

<!-- Failure 2: redundant filler that adds no information -->
<img src="ceo.jpg" alt="image of the CEO">

<!-- Failure 3: keyword-stuffed for SEO, unreadable as a sentence -->
<img src="shoes.jpg" alt="running shoes sneakers athletic shoes buy shoes online cheap shoes">

<!-- Failure 4: empty when the image is actually meaningful content -->
<img src="warning-icon.png" alt="">`}</CodeBox>

        <CodeBox label="The same four images, with genuinely good alt text">{`<!-- Fix 1: describes what the chart actually communicates -->
<img src="chart.png" alt="Quarterly revenue grew 34% from Q1 to Q4 2025">

<!-- Fix 2: no filler — a screen reader already announces "image" itself -->
<img src="ceo.jpg" alt="Maria Chen, CEO of Norwell Robotics">

<!-- Fix 3: reads as a natural sentence, describing the actual product -->
<img src="shoes.jpg" alt="Men's blue running shoes with reflective trim">

<!-- Fix 4: a meaningful icon gets meaningful alt text, not an empty string -->
<img src="warning-icon.png" alt="Warning: this action cannot be undone">`}</CodeBox>

        <Para>
          Fix 2 demonstrates a rule worth calling out explicitly: never begin alt text with phrases like{' '}
          "image of" or "picture of." Screen readers already announce that the element is an image before
          reading the alt text itself, so prefixing it produces an announcement like "image, image of the
          CEO" — redundant, and a real, common mistake even among people who genuinely intend to write
          good alt text.
        </Para>

        <SubTitle>When alt=&quot;&quot; is actually the correct choice — purely decorative images</SubTitle>

        <Para>
          Failure 4 above was wrong specifically because that icon was meaningful. A genuinely{' '}
          decorative image — a background flourish, a repeated visual divider that adds no information —
          should have <code>alt=""</code> (present, but empty) so a screen reader skips it entirely
          rather than interrupting the page&apos;s content with a description of something that carries
          no meaning. An empty <code>alt</code> is a deliberate, correct signal, not a shortcut or an
          oversight, and it is meaningfully different from omitting the <code>alt</code> attribute
          altogether — which some screen readers instead read aloud as the full image filename.
        </Para>

        <Callout type="tip">
          <strong>A genuinely reliable test for alt text quality:</strong> read it aloud, on its own, with
          no image visible. If it sounds like a natural sentence a person would actually say to describe
          what that image means in context, it is probably good. If it sounds like a list of keywords, or
          a caption that only makes sense alongside the picture itself, it needs a rewrite.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Accessible Forms Recap" />
        <SectionTitle>Accessible Forms — Tying Back to the Forms Modules</SectionTitle>

        <Para>
          The previous two modules covered form controls in depth without dwelling on accessibility
          specifically — this section closes that loop, connecting patterns you have already learned
          back to exactly why they matter for a non-sighted or keyboard-only user.
        </Para>

        <CodeBox label="The single most important accessible-forms rule — every input needs a real, connected label">{`<!-- Inaccessible — placeholder is not a label, and disappears once typing starts -->
<input type="email" placeholder="Email address">

<!-- Accessible — a real <label>, connected via matching for/id -->
<label for="email">Email address</label>
<input type="email" id="email">`}</CodeBox>

        <Para>
          A screen reader announces a properly connected label the instant a user tabs into the field —
          "Email address, edit text." A placeholder-only input, once the user starts typing, leaves a
          screen reader user with genuinely no way to recall what the field was even for, since the
          placeholder text itself is never announced as a label at all in most screen readers, and
          disappears visually the moment there is real input.
        </Para>

        <Para>
          The <code>{'<fieldset>'}</code>/<code>{'<legend>'}</code> pattern from the previous module is
          itself an accessibility feature, not just visual grouping — recall from Part 02 of that module
          that a screen reader announces the legend before every control nested inside, giving a user
          navigating a long form the same "which section am I in" context a sighted user gets for free
          from the visual box around the group. And the <code>aria-describedby</code> pattern from Part 04
          of this module is precisely how you should connect a field to helper text or a validation
          error message — an error message that only appears in red text next to a field, with no{' '}
          <code>aria-describedby</code> connecting it, is entirely invisible to a screen reader user who
          has no way to know it exists.
        </Para>

        <CodeBox label="A validation error, properly connected for screen readers too">{`<label for="email">Email address</label>
<input type="email" id="email" aria-describedby="email-error" aria-invalid="true">
<p id="email-error" role="alert">Please enter a valid email address.</p>`}</CodeBox>

        <Para>
          <code>aria-invalid="true"</code> additionally flags the field itself as currently failing
          validation, and <code>role="alert"</code> (from Part 03) ensures the error text is announced
          immediately rather than requiring the user to navigate to it manually.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Why Div Soup Fails Real Users" />
        <SectionTitle>&quot;Div Soup&quot; — Why It Fails Real Users, Not Just SEO</SectionTitle>

        <Para>
          "Div soup" is the (somewhat derisive) term for markup built almost entirely out of{' '}
          <code>{'<div>'}</code> and <code>{'<span>'}</code>, with classes doing all the work that
          semantic tags should be doing. Most discussion of this problem focuses on search engine
          optimization — and it is true that search engines weight semantic structure when ranking
          pages — but that framing badly undersells the actual harm, which is to real people using real
          assistive technology, right now, regardless of how a page ranks in search results.
        </Para>

        <CodeBox label="Div soup — every failure from this module, compounded in one snippet">{`<div class="header">
  <div class="logo">Acme Co</div>
  <div class="nav">
    <div class="nav-item" onclick="location.href='/'">Home</div>
    <div class="nav-item" onclick="location.href='/pricing'">Pricing</div>
  </div>
</div>
<div class="main">
  <div class="title">Welcome</div>
  <div class="button" onclick="submitForm()">Submit</div>
</div>`}</CodeBox>

        <Para>
          Walk through what a screen reader user actually experiences with this markup, point by point.
          There is no <code>{'<header>'}</code>, <code>{'<nav>'}</code>, or <code>{'<main>'}</code>{' '}
          landmark, so the "jump between sections" navigation from Part 02 has nothing to jump to — the
          entire page is one undifferentiated block of content that must be read start to finish. Every{' '}
          <code>{'<div class="nav-item">'}</code> is announced as plain, unremarkable text, not as a
          link — because it is not a link; it is a div with an <code>onclick</code> handler, which is
          entirely invisible to keyboard navigation and to a screen reader&apos;s "list all the links on
          this page" feature. The <code>{'<div class="title">'}</code> is not a heading, so it does not
          appear in the "jump between headings" navigation either, even though visually it clearly reads
          as one. And the <code>{'<div class="button">'}</code> is not keyboard-focusable at all by
          default, meaning a keyboard-only user — again, not necessarily a screen reader user — cannot
          Tab to it or activate it with Enter or Space, full stop.
        </Para>

        <CodeBox label="The same page, structurally correct — nothing about the visual design has to change">{`<header>
  <div class="logo">Acme Co</div>
  <nav>
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
  </nav>
</header>
<main>
  <h1>Welcome</h1>
  <button type="submit">Submit</button>
</main>`}</CodeBox>

        <Callout type="warning">
          <strong>Every one of these failures is entirely invisible in a normal visual review of the
          page.</strong> A designer, a product manager, and most manual QA testers looking at div soup
          rendered in a browser will see a perfectly normal-looking header, navigation, and button — the
          CSS makes all of it look correct. The failures only surface when the page is actually used with
          a keyboard alone, or with a screen reader, or audited with a tool like Lighthouse or axe — which
          is exactly why this class of bug survives so often into production: it passes every visual
          check while failing every real usage from the users it fails.
        </Callout>

        <Para>
          A further, less obvious cost: div soup with no semantic structure also produces a genuinely
          worse experience for Reader Mode (in Safari, Firefox, and Chrome), for browser translation
          features, and for any tool — including AI-driven ones — that tries to programmatically extract
          the "real" content of a page from its markup. Semantic structure is, in a real sense, an API
          your HTML exposes to every piece of software that isn&apos;t a human looking at rendered
          pixels.
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
        <SectionTitle>An Accessibility Audit at an Austin Healthcare Startup</SectionTitle>

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
            Scenario — Healthcare startup, Austin · Pre-launch accessibility audit
          </div>

          <Para>
            A patient-portal startup is weeks from launch when a legal requirement surfaces: as a
            healthcare provider, the product must meet WCAG 2.1 AA accessibility standards, both because
            it is the right thing to do and because non-compliance carries real legal exposure under the
            ADA for a company handling patient data. An external accessibility auditor is brought in to
            review the appointment-booking flow before launch.
          </Para>

          <CodeBox label="A fragment of the flagged appointment-booking page">{`<div class="page">
  <div class="topbar">
    <div class="logo">MedLink</div>
    <div class="menu-item" onclick="goTo('/appointments')">Appointments</div>
    <div class="menu-item" onclick="goTo('/messages')">Messages</div>
  </div>
  <div class="content">
    <div class="page-title">Book an Appointment</div>
    <div class="field">
      <input type="text" placeholder="Reason for visit">
    </div>
    <img src="doctor-photo.jpg">
    <div class="submit-btn" onclick="bookAppointment()">Confirm Booking</div>
  </div>
</div>`}</CodeBox>

          <SubSubTitle>The audit's findings</SubSubTitle>

          <Para>
            The auditor&apos;s report reads almost like a checklist against this exact module. No
            landmarks (Part 02) — a screen reader user has no way to jump past the top bar to the
            actual booking content. Navigation built from <code>div.menu-item</code> with{' '}
            <code>onclick</code> instead of real <code>{'<a>'}</code> tags (Part 07) — completely
            unreachable by keyboard, and invisible to a screen reader&apos;s link list. A placeholder
            standing in for a real <code>{'<label>'}</code> on the reason-for-visit field (Part 06) —
            the field&apos;s purpose disappears the instant a patient starts typing. A missing{' '}
            <code>alt</code> attribute entirely on the doctor&apos;s photo, not even an empty one (Part
            05) — most screen readers fall back to reading the raw filename,{' '}
            <code>doctor-photo.jpg</code>, aloud to the patient. And a <code>div.submit-btn</code>{' '}
            standing in for a real <code>{'<button>'}</code>, unreachable by keyboard entirely — meaning
            a keyboard-only user cannot complete a booking at all.
          </Para>

          <CodeBox label="The rewritten fragment">{`<div class="page">
  <header>
    <div class="logo">MedLink</div>
    <nav>
      <a href="/appointments">Appointments</a>
      <a href="/messages">Messages</a>
    </nav>
  </header>
  <main>
    <h1>Book an Appointment</h1>
    <div class="field">
      <label for="reason">Reason for visit</label>
      <input type="text" id="reason" placeholder="e.g. Annual checkup">
    </div>
    <img src="doctor-photo.jpg" alt="Dr. Elena Ruiz, Family Medicine">
    <button type="submit">Confirm Booking</button>
  </main>
</div>`}</CodeBox>

          <Para>
            None of these fixes changed a single pixel of the rendered page — the CSS classes and visual
            design were untouched. The team ships on schedule, the audit is cleared, and the engineering
            lead adds an automated axe-core accessibility scan to the CI pipeline specifically so this
            exact class of issue is caught on every future pull request, not only at a pre-launch audit.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Accessibility</SectionTitle>

        {[
          {
            wrong: '"Accessibility is mainly about screen reader users, a small fraction of visitors"',
            right: 'Accessibility benefits keyboard-only users, users with motor impairments who cannot use a mouse precisely, users with low vision using browser zoom, and users with situational limitations (a broken arm, a bright-sunlight screen, a noisy environment where captions replace audio) — a genuinely broad and common set of real usage patterns, not a narrow edge case.',
          },
          {
            wrong: '"You can bolt accessibility onto a div-soup page later with enough ARIA attributes"',
            right: 'ARIA can patch some gaps, but it cannot restore native keyboard behavior (Tab focus, Enter/Space activation) to a div — that has to be either the correct native element or a substantial amount of extra JavaScript reimplementing behavior the browser already gives you for free with the right tag. The First Rule of ARIA exists precisely because native elements are almost always the more complete, less error-prone solution.',
          },
          {
            wrong: "\"an empty alt attribute means an image is missing accessibility information — it should always have real descriptive text\"",
            right: 'An empty alt is the CORRECT choice for genuinely decorative images — it tells a screen reader to skip the image entirely rather than interrupt the content with a description of something meaningless. It only becomes a bug when applied to an image that actually carries information, like an icon or a meaningful photo.',
          },
          {
            wrong: '"Accessibility fixes generally require changing how a page looks"',
            right: 'Nearly every fix in this module — swapping a div for a nav, a button, or an h1, connecting a label with for/id, adding aria-label to an icon button — changes the underlying markup while leaving the rendered, styled appearance completely untouched, exactly as shown in the Real World example above.',
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
            q: 'What is a landmark, and why does it matter for screen reader users specifically?',
            a: 'A landmark is a semantic region like header, nav, main, aside, or footer that a screen reader exposes in a dedicated navigable list, letting a user jump directly between major page regions with a keyboard shortcut instead of listening through every line of content in between. It gives non-visual users the same fast structural overview a sighted user gets for free by visually scanning the page layout.',
          },
          {
            q: 'What is the First Rule of ARIA, and why does it matter?',
            a: 'If a native HTML element already provides the semantics and behavior you need, use it instead of reconstructing that behavior on a generic element with ARIA attributes. Native elements come with correct keyboard behavior, focus handling, and screen reader announcements built in for free; recreating all of that manually with ARIA and JavaScript is more work and far more error-prone than simply using the right tag.',
          },
          {
            q: 'What is the functional difference between aria-label, aria-labelledby, and aria-describedby?',
            a: 'aria-label directly supplies an accessible name as a string. aria-labelledby supplies that name by referencing another element\'s id, useful when the name text is already visible on the page and should not be duplicated. aria-describedby is different in kind, not just mechanism — it adds supplementary description AFTER the accessible name is announced, rather than replacing the name, and is the standard way to connect a form field to helper text or an error message.',
          },
          {
            q: 'Why is a placeholder not an acceptable substitute for a real <label> on a form input?',
            a: 'A placeholder disappears visually the moment a user starts typing, so there is no persistent visual reminder of the field\'s purpose. More critically for accessibility, most screen readers do not announce placeholder text as a label at all when a user tabs into the field, meaning the field\'s purpose can be entirely unclear. A real <label> connected via matching for/id attributes is announced every time the field receives focus and remains visible regardless of the field\'s content.',
          },
          {
            q: 'What makes alt text good versus bad, beyond simply being present?',
            a: 'Good alt text conveys the same information or purpose the image conveys to a sighted user, phrased as a natural sentence, without prefixes like "image of" (redundant, since screen readers already announce the element as an image) and without keyword stuffing for SEO. For genuinely decorative images that carry no information, an empty alt="" is correct — it causes the image to be skipped entirely rather than announced with a meaningless description.',
          },
          {
            q: 'Why is div soup considered an accessibility problem and not just an SEO or code-quality problem?',
            a: 'Search engine ranking is one real cost, but the more direct harm is to actual users of assistive technology, right now: no landmarks means no jump-navigation, div-based "links" and "buttons" with onclick handlers are unreachable by keyboard and invisible to a screen reader\'s link/button list, and div-based "headings" do not appear in heading navigation. These failures are invisible in a normal sighted visual review since CSS can make a div look identical to the correct semantic element, which is exactly why they survive into production so often.',
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
        <SectionTitle>Accessibility Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using placeholder as the only label on a form field',
            a: 'Broken: <input type="email" placeholder="Email">. Fixed: <label for="email">Email</label><input type="email" id="email" placeholder="you@example.com"> — a real label plus an optional placeholder for a formatting hint, not a replacement for the label.',
          },
          {
            q: 'Building interactive controls out of div or span with onclick',
            a: 'Broken: <div class="btn" onclick="save()">Save</div> — invisible to keyboard navigation and screen reader button lists. Fixed: <button type="button" onclick="save()">Save</button> — free keyboard focus, Enter/Space activation, and correct screen reader announcement.',
          },
          {
            q: 'Writing alt text that describes pixels instead of meaning, or omitting alt entirely',
            a: 'Broken: <img src="q4-revenue.png"> (no alt at all — many screen readers fall back to reading the filename). Fixed: <img src="q4-revenue.png" alt="Q4 revenue grew 34% year over year">.',
          },
          {
            q: 'Reaching for ARIA before checking whether a native element already solves the problem',
            a: 'Broken: <div role="button" tabindex="0" onclick="submit()">Submit</div> — technically improves on a bare div, but still requires manually wiring up keyboard activation, which is easy to get subtly wrong (e.g. forgetting Space, not just Enter). Fixed: <button type="submit">Submit</button> — all of that behavior is already built in.',
          },
          {
            q: 'Skipping heading levels or using headings purely for visual size rather than structure',
            a: 'Broken: an h1 followed directly by an h4 because "it was the right visual size," with no h2 or h3 in between — this breaks the heading-based navigation screen reader users rely on. Fixed: use heading levels for genuine document structure (h1 → h2 → h3 in order) and control visual size with CSS font-size instead of picking a heading level for its default appearance.',
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
        <SectionTitle>Errors and Audit Failures You Will Hit With Accessibility</SectionTitle>

        {[
          {
            error: `Lighthouse / axe: "Form elements must have labels"`,
            cause: 'An input has no associated <label>, no aria-label, and no aria-labelledby — a placeholder alone does not satisfy this check, since automated auditors correctly treat it as insufficient.',
            fix: 'Add a real <label> connected via matching for/id attributes, or aria-label if a visible label is genuinely not appropriate for the design.',
          },
          {
            error: `Lighthouse / axe: "Images must have alternate text"`,
            cause: 'An <img> element has no alt attribute at all. This is different from having an empty alt="" — a missing attribute entirely fails this specific check, while an intentionally empty one for a decorative image passes it.',
            fix: 'Add an alt attribute to every image — a real description for meaningful images, or alt="" for purely decorative ones.',
          },
          {
            error: `Lighthouse / axe: "Buttons must have discernible text"`,
            cause: 'A <button> contains only an icon (an SVG or icon font glyph) with no text content and no aria-label, leaving it with no accessible name at all for a screen reader to announce.',
            fix: 'Add aria-label="..." describing the button\'s action, or include visually-hidden text inside the button for the same purpose.',
          },
          {
            error: `Lighthouse / axe: "Heading levels should only increase by one"`,
            cause: 'A heading skips a level, e.g. an h1 followed directly by an h3 with no h2 — usually caused by choosing heading tags based on their default visual size rather than genuine document structure.',
            fix: 'Reorder headings to increase by exactly one level at a time, and use CSS to control visual appearance independent of the semantic heading level chosen.',
          },
          {
            error: `Screen reader announces a raw filename instead of a description`,
            cause: 'An image is missing its alt attribute entirely (not merely empty) — several screen readers fall back to reading the src filename aloud as a last resort, which is rarely meaningful to the user.',
            fix: 'Add a real, descriptive alt attribute — this failure mode is a strong signal that the alt attribute is missing outright, not just empty.',
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
        'Semantic tags are read by more than a rendering engine — screen readers, browser extensions, search crawlers, and Reader Mode all depend on the tag being genuinely correct, not merely styled to look correct.',
        'Landmark elements (header, nav, main, aside, footer) let screen reader users jump directly between page regions with a keyboard shortcut, exactly like a sighted user visually scanning a layout.',
        'The First Rule of ARIA: use a native HTML element with the behavior you need before reaching for role and other ARIA attributes to recreate that behavior manually.',
        'aria-label supplies an accessible name directly; aria-labelledby points to existing visible text for that name; aria-describedby adds supplementary description after the name, commonly used for form hints and errors.',
        'Good alt text conveys meaning or purpose, phrased as a natural sentence, without "image of" prefixes. alt="" is the correct, deliberate choice for purely decorative images — it is not a mistake.',
        'A placeholder is never a substitute for a real, connected <label> — it disappears once typing starts and is not reliably announced as a label at all by most screen readers.',
        'Div soup fails real keyboard-only and screen-reader users directly, not just search rankings — unreachable "links" and "buttons," missing landmarks, and missing heading structure are all invisible in a normal sighted visual review.',
        'Nearly every accessibility fix changes only the underlying markup, not the rendered visual design — accessibility and visual design are largely independent axes, not a tradeoff against each other.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 11 opens Phase 2 of the HTML track with a survey of HTML5&apos;s browser-facing APIs —
          custom data-* attributes and the JavaScript dataset property that reads them, the
          contenteditable attribute, and the native drag-and-drop API.
        </p>
        <Link href="/learn/html-css/html5-apis-overview" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 11 → HTML5 APIs Overview
        </Link>
      </div>
    </LearnLayout>
  )
}
