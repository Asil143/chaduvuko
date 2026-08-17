import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Text Elements & Semantic Structure | Chaduvuko',
  description:
    'Headings, paragraphs, and the semantic tags — header, nav, main, section, article, aside, footer — that give a page real meaning.',
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

export default function TextSemanticStructure() {
  return (
    <LearnLayout
      title="Text Elements & Semantic Structure"
      description="Headings, paragraphs, and the semantic tags — header, nav, main, section, article, aside, footer — that give a page real meaning."
      section="HTML & CSS — Module 03"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Heading Hierarchy" />
        <SectionTitle>h1 Through h6 — A Hierarchy, Not a Font-Size Picker</SectionTitle>

        <Para>
          HTML gives you six heading levels, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>,
          ranked from most to least important. Browsers apply default styling that makes{' '}
          <code>&lt;h1&gt;</code> the largest and boldest and <code>&lt;h6&gt;</code> the smallest — but
          treating headings as a font-size shortcut is exactly the mistake this section exists to correct.
          Their real job is expressing the logical <strong>outline</strong> of a document, the way chapter
          titles and subheadings work in a book&apos;s table of contents.
        </Para>

        <CodeBox label="A correctly nested heading hierarchy">{`<h1>Trailhead Boots</h1>

<h2>Waterproof Hiking Collection</h2>
  <h3>Men's Styles</h3>
  <h3>Women's Styles</h3>

<h2>Trail Running Collection</h2>
  <h3>Lightweight Models</h3>
  <h3>All-Terrain Models</h3>`}</CodeBox>

        <Para>
          Read purely as structure, with all styling stripped away, this tells you exactly how the page is
          organized: one top-level topic, two major sections beneath it, and two subsections under each.
          A screen-reader user can navigate a page exactly this way — jumping heading to heading, skipping
          straight to "Women&apos;s Styles" without reading everything in between — which is precisely why
          this hierarchy is not a cosmetic detail.
        </Para>

        <SubTitle>Never skip a level</SubTitle>

        <Para>
          The hierarchy should descend one level at a time. Jumping from <code>&lt;h2&gt;</code> straight
          to <code>&lt;h4&gt;</code> because the smaller heading&apos;s default font size "looked right" is
          a genuinely common mistake, and it breaks the logical outline even though the page still renders
          without any visible problem.
        </Para>

        <CodeBox label="Wrong — skips h3 entirely, purely because h4's default size looked better">{`<h2>Trail Running Collection</h2>
<h4>Lightweight Models</h4>   <!-- should be h3 -->`}</CodeBox>

        <Callout type="warning">
          <strong>Never choose a heading level for its default font size.</strong> If{' '}
          <code>&lt;h3&gt;</code> renders bigger than you want, that is a CSS problem — override its
          <code>font-size</code> in your stylesheet (covered in the CSS Foundations phase). Do not solve a
          visual problem by breaking the document&apos;s logical structure; the two are entirely separate
          concerns, and conflating them is exactly the div-soup-adjacent mistake this whole module is
          steering you away from.
        </Callout>

        <SubTitle>One h1 per page — the convention, and its real nuance</SubTitle>

        <Para>
          The long-standing convention is exactly one <code>&lt;h1&gt;</code> per page, representing that
          page&apos;s single main topic — the same way a book chapter has one title, not several competing
          for the top spot. Since HTML5, the specification technically permits multiple{' '}
          <code>&lt;h1&gt;</code> elements when each is scoped inside its own{' '}
          <code>&lt;article&gt;</code> or <code>&lt;section&gt;</code> (each effectively starting a fresh
          sub-outline) — but in practice, essentially every accessibility guideline, SEO best-practice
          document, and real production codebase you will encounter still treats a single page-level{' '}
          <code>&lt;h1&gt;</code> as the expected, unambiguous norm. Deviating from it is a decision worth
          being deliberate about, not a default.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — p vs div" />
        <SectionTitle>&lt;p&gt; vs &lt;div&gt; — Text Content vs a Generic Container</SectionTitle>

        <Para>
          <code>&lt;p&gt;</code> marks up a <strong>paragraph</strong> — a block of actual, readable
          prose. <code>&lt;div&gt;</code> is a generic, meaning-free container that exists purely to group
          other elements for styling or scripting purposes. Confusing the two — most often, wrapping
          running text in a <code>&lt;div&gt;</code> instead of a <code>&lt;p&gt;</code> — is one of the
          most common structural mistakes in beginner HTML.
        </Para>

        <CodeBox label="p for actual text content; div for structural/visual grouping">{`<div class="product-card">
  <h3>Trail Runner GTX</h3>
  <p>A lightweight trail shoe with a Gore-Tex membrane for wet-weather
  traction on technical terrain.</p>
  <p>Available in three colorways, starting at $139.</p>
</div>

<!-- div groups the whole card for styling — it carries no meaning of
     its own. Each block of actual prose is a <p>, not another <div>. -->`}</CodeBox>

        <Para>
          The practical difference is not just philosophical. Screen readers announce{' '}
          <code>&lt;p&gt;</code> elements as paragraphs and let users jump between them; browsers apply
          sensible default spacing (margin) around paragraphs that a plain <code>&lt;div&gt;</code> does
          not get; and search engines weight text inside meaningful content tags differently than text
          inside a generic container with no semantic role at all.
        </Para>

        <Callout type="tip">
          A quick test: if you are writing a sentence or a block of prose someone would actually read
          top-to-bottom, it almost certainly belongs in a <code>&lt;p&gt;</code>. If you are grouping other
          elements together purely to apply a shared style or layout to them as a unit, <code>&lt;div&gt;</code>{' '}
          is the correct, honest choice — using it does not mean you did something wrong, it means you
          correctly identified that the group itself carries no specific meaning beyond "these belong
          together visually."
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Div Soup" />
        <SectionTitle>&quot;Div Soup&quot; — What It Actually Looks Like, and Why It's a Problem</SectionTitle>

        <Para>
          "Div soup" is the industry nickname for a page built almost entirely out of generic{' '}
          <code>&lt;div&gt;</code> elements, with classes doing all the work of describing what everything
          is — <code>class=&quot;header&quot;</code>, <code>class=&quot;nav&quot;</code>,{' '}
          <code>class=&quot;main-content&quot;</code> — instead of using the HTML elements that already
          exist specifically to express those roles.
        </Para>

        <CodeBox label="Div soup — visually correct, structurally meaningless">{`<div class="header">
  <div class="logo">Trailhead Boots</div>
  <div class="nav">
    <div class="nav-item">Shop</div>
    <div class="nav-item">About</div>
  </div>
</div>
<div class="main-content">
  <div class="article">
    <div class="article-title">New Arrivals</div>
    <div class="article-body">...</div>
  </div>
</div>
<div class="footer">© 2026 Trailhead Boots</div>`}</CodeBox>

        <Para>
          Styled with the right CSS, this can look absolutely identical to a well-structured page — the
          problem is entirely invisible to a sighted user clicking through it casually. It becomes very
          visible to anyone, or anything, not relying on vision or CSS to understand the page: a screen
          reader has no landmarks to announce or jump between, a search engine has no signal for which
          block is the real navigation versus the real content, and a browser&apos;s reader mode has
          nothing reliable to extract. Part 05 covers the specific elements that fix this exact pattern.
        </Para>

        <Callout type="warning">
          Div soup is not a beginner-only mistake — it shows up constantly in real production codebases,
          usually because a component was built quickly under deadline pressure with styling as the only
          concern, and semantic correctness was never revisited afterward. Recognizing it in someone
          else&apos;s code (or your own, from six months ago) is a genuinely common and valuable code
          review skill.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Document Outline" />
        <SectionTitle>The Document Outline — What a Machine Understands About Your Page's Shape</SectionTitle>

        <Para>
          The <strong>document outline</strong> is the logical, tree-shaped summary of a page&apos;s
          content that headings and semantic elements together produce — conceptually similar to a table
          of contents generated automatically from the structure itself, without anyone writing it by
          hand. It is what a screen reader&apos;s "jump to heading" navigation is built from, what browser
          reading-mode extraction relies on, and what search engines use to understand which part of a
          page is the actual article versus surrounding chrome like navigation and footer content.
        </Para>

        <CodeBox label="Markup and the outline it implies">{`<header>...</header>
<nav>...</nav>
<main>
  <h1>Trail Running Shoes</h1>
  <section>
    <h2>Men's Collection</h2>
    <article>
      <h3>Trail Runner GTX</h3>
    </article>
  </section>
  <section>
    <h2>Women's Collection</h2>
  </section>
</main>
<footer>...</footer>

/* Implied outline:
   Trail Running Shoes
     └── Men's Collection
           └── Trail Runner GTX
     └── Women's Collection      */`}</CodeBox>

        <Para>
          This is precisely why heading levels and semantic elements matter together rather than
          separately — a correct heading hierarchy inside a page built entirely from unlabeled{' '}
          <code>&lt;div&gt;</code>s still leaves assistive tools unable to tell where the actual main
          content starts, and correct semantic landmarks with a broken or skipped heading order still
          leave the internal structure of the content unclear. Both are needed for the outline to actually
          mean something.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Semantic Landmark Elements" />
        <SectionTitle>header, nav, main, footer — The Elements That Fix Div Soup</SectionTitle>

        <Para>
          HTML5 introduced a set of elements specifically to replace the{' '}
          <code>class=&quot;header&quot;</code>-style pattern with real, machine-recognizable structure.
          These are called <strong>landmark elements</strong>, because assistive technology treats them as
          navigable landmarks a user can jump directly to.
        </Para>

        <CodeBox label="The core landmarks, used correctly">{`<body>
  <header>
    <h1>Trailhead Boots</h1>
    <nav>
      <ul>
        <li><a href="/shop">Shop</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <!-- the ONE primary content area of the page -->
    <h2>New Arrivals</h2>
    ...
  </main>

  <footer>
    <p>&copy; 2026 Trailhead Boots</p>
  </footer>
</body>`}</CodeBox>

        <Para>
          A few rules worth being precise about: <code>&lt;main&gt;</code> should appear{' '}
          <strong>exactly once</strong> per page, wrapping the primary content unique to that specific
          page — not the navigation, not the footer, not anything repeated across every page of the site.{' '}
          <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code> can each appear more than once,
          since they can also be scoped to an individual <code>&lt;article&gt;</code> or{' '}
          <code>&lt;section&gt;</code> (a blog post&apos;s own byline-and-date header, for example), not
          only at the page level. <code>&lt;nav&gt;</code> should wrap a genuine navigation block — a
          primary menu, a breadcrumb trail, a pagination control — not every single group of links on the
          page; a handful of related links inside an article&apos;s body does not need to be wrapped in{' '}
          <code>&lt;nav&gt;</code>.
        </Para>

        <Callout type="tip">
          A fast way to check whether landmarks are being used correctly on a real, live page: open
          DevTools&apos; Accessibility tree (or Firefox&apos;s dedicated Accessibility panel) and look at
          the landmark regions it reports. If it reports a sensible list — banner (header), navigation,
          main, contentinfo (footer) — the semantics are doing their job. If it reports nothing but generic
          groups, that page is very likely built from div soup.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — section, article, aside" />
        <SectionTitle>section vs article vs aside — And When a Plain div Is Still Correct</SectionTitle>

        <Para>
          These three elements are the ones beginners mix up most often, because they can look nearly
          interchangeable in a quick glance at rendered output. Each has a specific, distinct meaning.
        </Para>

        <CodeBox label="The distinction, defined precisely">{`<article>  →  Content that would make complete sense on its own, removed
              from the page entirely — a blog post, a news story, a single
              product listing, a forum comment. Ask: "could this be
              syndicated/republished elsewhere and still make full sense?"

<section>  →  A thematic grouping of content, WITH ITS OWN HEADING, that is
              part of a larger whole — a chapter-like grouping. Ask: "does
              this have its own heading, and is it one distinct part of a
              bigger document?"

<aside>    →  Content related to, but not essential to, the main content
              around it — a sidebar, a pull quote, a "related articles"
              box. Ask: "could a reader skip this entirely without losing
              the main point?"`}</CodeBox>

        <CodeBox label="All three used correctly together on one page">{`<main>
  <article>
    <h2>Why Waterproofing Ratings Matter</h2>
    <p>A 20,000mm rating means...</p>

    <section>
      <h3>How Ratings Are Measured</h3>
      <p>...</p>
    </section>

    <section>
      <h3>Comparing Common Ratings</h3>
      <p>...</p>
    </section>
  </article>

  <aside>
    <h3>Related Reading</h3>
    <ul>
      <li><a href="/blog/gore-tex-explained">Gore-Tex, Explained</a></li>
    </ul>
  </aside>
</main>`}</CodeBox>

        <SubTitle>The section rule people miss most: it needs its own heading</SubTitle>

        <Para>
          A very common mistake is reaching for <code>&lt;section&gt;</code> purely as "a bigger div,"
          without giving it a heading of its own. If a grouping of content has no heading identifying it
          as its own distinct thematic unit, it is not a <code>&lt;section&gt;</code> — it is very likely
          just a <code>&lt;div&gt;</code>, and that is the correct, honest choice in that situation.
        </Para>

        <CodeBox label="Wrong — a section with no heading of its own">{`<section class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
</section>
<!-- No heading identifies this as its own thematic unit — plain div
     is the honest choice here, not section. -->`}</CodeBox>

        <Callout type="warning">
          <strong>&lt;div&gt; is not a mistake to eliminate everywhere.</strong> Not every grouping of
          content is a meaningful semantic unit — a purely visual wrapper used to apply a CSS Grid layout
          to a set of cards, with no shared heading or thematic identity of its own, is exactly what{' '}
          <code>&lt;div&gt;</code> is for. Reaching for <code>&lt;section&gt;</code> everywhere "to be more
          semantic" without a heading inside each one is its own kind of mistake — it adds structure the
          document outline does not actually have.
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
        <SectionTitle>An Accessibility Audit Fails a Chicago News Site's Homepage</SectionTitle>

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
            Scenario — Local news publisher, Chicago · Accessibility audit
          </div>

          <Para>
            A Chicago-based local news site commissions a third-party accessibility audit ahead of a legal
            compliance deadline. The homepage looks completely normal — a masthead, a navigation bar, a
            grid of story cards, a footer — and passes every visual review the internal team ran. The audit
            comes back with a failing score anyway, flagged specifically for "no identifiable landmark
            regions" and "heading structure does not reflect page content."
          </Para>

          <SubSubTitle>What the audit tool actually found</SubSubTitle>

          <Para>
            The page was built entirely from <code>&lt;div&gt;</code> elements with CSS classes doing all
            the labeling — <code>class=&quot;header&quot;</code>, <code>class=&quot;nav&quot;</code>,{' '}
            <code>class=&quot;story-headline&quot;</code> — with the actual headline text inside{' '}
            <code>&lt;div&gt;</code> tags styled to look exactly like headings, rather than real{' '}
            <code>&lt;h2&gt;</code> or <code>&lt;h3&gt;</code> elements. Sighted users scanning the page
            visually never noticed a problem, since the CSS made everything look correct. A screen reader,
            which relies entirely on real elements rather than class names, announced the entire homepage
            as one undifferentiated block of unlabeled text with zero navigable landmarks or headings.
          </Para>

          <CodeBox label="What was actually shipped">{`<div class="header">
  <div class="masthead">Chicago Daily</div>
  <div class="nav">
    <div class="nav-link">Local</div>
    <div class="nav-link">Politics</div>
  </div>
</div>
<div class="story-card">
  <div class="story-headline">City Council Approves Budget</div>
  <div class="story-summary">...</div>
</div>`}</CodeBox>

          <CodeBox label="The remediation the audit required">{`<header>
  <h1>Chicago Daily</h1>
  <nav>
    <ul>
      <li><a href="/local">Local</a></li>
      <li><a href="/politics">Politics</a></li>
    </ul>
  </nav>
</header>
<main>
  <article class="story-card">
    <h2>City Council Approves Budget</h2>
    <p class="story-summary">...</p>
  </article>
</main>`}</CodeBox>

          <Para>
            The visual design did not change at all — the CSS classes stayed exactly the same, still
            controlling every pixel of appearance. Only the underlying elements changed, from generic{' '}
            <code>&lt;div&gt;</code>s to the correct semantic and heading elements each block actually
            represented. The remediation passed re-audit, and — a detail the team had not anticipated —
            organic search rankings for individual story pages measurably improved in the following weeks,
            since search engines now had real heading and article structure to index instead of an
            undifferentiated wall of divs.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Semantic Structure</SectionTitle>

        {[
          {
            wrong: '"Heading levels are just about font size — pick whichever one looks right"',
            right: 'Heading levels express the logical outline of the page, consumed directly by screen readers and search engines. If a heading\'s default size is wrong for your design, override it with CSS — never pick a heading level purely to get a certain size.',
          },
          {
            wrong: '"section is just a more modern name for div"',
            right: 'section specifically means a thematic grouping WITH its own heading, as one part of a larger document. A grouping with no heading of its own — a purely visual wrapper for a CSS layout, for instance — is correctly a div, not a section.',
          },
          {
            wrong: '"If it looks correct visually, the semantics don\'t really matter"',
            right: 'CSS can make a div-soup page look pixel-identical to a properly structured one. The difference is entirely invisible to sighted users clicking through casually, and entirely visible to screen readers, search engines, and any tool that reads structure rather than rendered pixels.',
          },
          {
            wrong: '"Every group of links needs to be wrapped in nav"',
            right: 'nav is meant for genuine navigation blocks — a primary menu, breadcrumbs, pagination. A handful of related links inside an article\'s body content does not need, and generally should not have, a nav wrapper.',
          },
          {
            wrong: '"main can be used more than once if a page has multiple important sections"',
            right: 'main should appear exactly once per page, wrapping the content unique to that specific page. Multiple prominent sections belong inside a single main as separate section or article children, not as multiple separate main elements.',
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
        <SectionTitle>6 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between section and article, and how would you decide between them?',
            a: 'article is for content that would make full sense on its own if extracted and republished elsewhere — a blog post, a news story, a single product card. section is a thematic grouping WITH its own heading that forms one part of a larger document, but does not necessarily stand alone. A useful test: could this content be pulled out and syndicated on its own and still make complete sense? If yes, article. If it only makes sense as one labeled part of a bigger whole, section.',
          },
          {
            q: 'Why is a heading hierarchy that skips levels (h2 straight to h4) considered a real problem, not just a style nitpick?',
            a: 'Screen reader users frequently navigate a page by heading level, jumping directly between headings of a given rank. A skipped level breaks that navigation model and misrepresents the page\'s actual logical structure — it also confuses tools and browser extensions that generate an automatic table of contents from the heading hierarchy. It should be treated as a structural bug, not a visual preference.',
          },
          {
            q: 'What is "div soup," and why can it be invisible during normal manual testing?',
            a: 'Div soup is a page built almost entirely from generic div elements, with CSS classes doing all the labeling instead of using HTML\'s actual semantic and landmark elements. Because CSS can style a div to look identical to a properly semantic element, the page can look completely correct to anyone testing it visually. The problem only becomes visible to tools that read the underlying elements rather than rendered pixels — screen readers, search engine crawlers, and accessibility audit tools.',
          },
          {
            q: 'Should main ever appear more than once on a page? What about header and footer?',
            a: 'main should appear exactly once, wrapping the content unique to that specific page. header and footer, by contrast, can legitimately appear more than once, since they can be scoped to an individual article or section (e.g. a blog post\'s own byline header) in addition to, or instead of, the page-level header and footer.',
          },
          {
            q: 'What is the document outline, and what two things does it depend on together?',
            a: 'The document outline is the logical, tree-shaped structure of a page implied by its headings and semantic landmark elements together — it is what screen-reader heading navigation, browser reading modes, and search engines use to understand a page\'s shape. It depends on both pieces together: a correct heading hierarchy inside unlabeled divs still leaves landmarks undiscoverable, and correct landmarks with a broken heading order still leave the content within them unclear.',
          },
          {
            q: 'Give an example of when using a plain div is still the semantically correct choice, even in an otherwise well-structured page.',
            a: 'A purely visual grouping — for example, a wrapper div applying a CSS Grid layout to a set of already-semantic card elements — that has no heading of its own and represents no distinct thematic unit of content. Reaching for section in that situation, without a heading, adds structure the document does not actually have; div is the honest, correct element for a grouping that exists solely for styling or layout purposes.',
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
        <SectionTitle>Semantic Structure Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Choosing a heading level for its default font size instead of its logical position',
            a: 'This breaks the document outline while looking fine visually. Fix the size with CSS instead — h3 { font-size: ... } — and choose the heading level based purely on where it sits in the page\'s logical structure.',
          },
          {
            q: 'Wrapping every block of text in a div instead of a p',
            a: 'Actual paragraphs of prose should be <p>, not <div>. This affects screen-reader navigation, default spacing, and how search engines and readability tools identify real body text on the page.',
          },
          {
            q: 'Using section as a generic wrapper with no heading inside it',
            a: 'section specifically means a thematic unit with its own heading. A grouping with no heading of its own is a div — using section without a heading adds structure to the outline that does not actually exist.',
          },
          {
            q: 'Wrapping every small cluster of links in nav',
            a: 'nav is meant for genuine navigation — primary menus, breadcrumbs, pagination. A few related links inside an article body do not need a nav wrapper; a plain list, or even just inline links, is the correct choice there.',
          },
          {
            q: 'Using multiple main elements on a single page',
            a: 'main should appear exactly once, holding the page-specific primary content. Multiple prominent content blocks should be separate section or article elements nested inside that single main, not multiple main elements side by side.',
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
        <SectionTitle>Errors and Audit Warnings You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `Lighthouse / axe: "Heading levels should only increase by one"`,
            cause: 'A heading skips one or more levels, most often h2 straight to h4, usually because a smaller heading\'s default font size looked more appropriate for the design than the correct next level.',
            fix: 'Use the correct next heading level for the document\'s logical structure, and adjust its visual size independently with CSS if the default doesn\'t match the design.',
          },
          {
            error: `Lighthouse / axe: "Document should have one main landmark"`,
            cause: 'The page either has no <main> element at all, or has more than one — both violate the expectation that main wraps exactly one primary content region per page.',
            fix: 'Add a single <main> wrapping the page-specific content, distinct from header, nav, and footer. If multiple main elements exist, consolidate the real content into exactly one and convert the others to section or article.',
          },
          {
            error: `Screen reader announces the whole page as one undifferentiated block with no landmarks`,
            cause: 'The page is built from div soup — generic div elements with CSS classes standing in for header, nav, main, and footer instead of the real semantic elements.',
            fix: 'Replace class-labeled div wrappers with the actual semantic elements they represent — header, nav, main, footer — as covered in Part 05.',
          },
          {
            error: `Lighthouse: "Heading elements are not in a sequentially-descending order"`,
            cause: 'Same root cause as the heading-skip warning above, but can also occur from headings appearing visually out of their logical DOM order, or from a component being reused at different nesting depths without adjusting its heading level.',
            fix: 'Trace the actual heading sequence in DOM order (not visual order) and correct any level that breaks the one-step-at-a-time descent.',
          },
          {
            error: `A browser reading-mode / "reader view" feature fails to extract the article, or extracts the wrong content`,
            cause: 'Reader-mode extraction relies on finding an <article> (or a clearly identifiable main content region) — a page built entirely from unlabeled divs gives it nothing reliable to identify as the actual article content.',
            fix: 'Wrap the primary readable content in a real <article> element inside <main>, keeping navigation, sidebars, and footer content outside of it.',
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
        'Heading levels (h1-h6) express the logical outline of a page, not a font-size shortcut — never pick a level for its default size; style it with CSS instead.',
        'Never skip a heading level. Convention is exactly one h1 per page, representing the page\'s single main topic.',
        'Use <p> for actual readable prose, <div> for a generic, meaning-free grouping used purely for styling or layout.',
        '"Div soup" — a page built entirely from generic divs with CSS classes standing in for real structure — can look pixel-identical to well-structured HTML while being invisible or broken to screen readers, search engines, and reading-mode tools.',
        'The landmark elements (header, nav, main, footer) replace class-labeled divs with real, machine-recognizable structure. main appears exactly once per page; header and footer can be scoped to individual articles/sections too.',
        'article is content that makes full sense standalone; section is a thematic grouping WITH its own heading, forming part of a larger whole; aside is related-but-skippable content. A grouping with no heading of its own is correctly a plain div, not a section.',
        'The document outline — built from headings and landmarks together — is what screen readers, reading-mode extraction, and search engines actually use to understand a page\'s shape.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 04 covers the anchor tag in full — every href value type, the security implications of{' '}
          target=&quot;_blank&quot;, linking to a specific point within a page, and building a real,
          semantic navigation menu.
        </p>
        <Link href="/learn/html-css/links-navigation" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 04 → Links and Navigation
        </Link>
      </div>
    </LearnLayout>
  )
}
