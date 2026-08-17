import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML Best Practices & Validation | Chaduvuko',
  description:
    'The W3C validator, void elements, self-closing tag myths, and the conventions that separate clean markup from markup that merely renders.',
}

const C = '#7b61ff'

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

export default function HtmlBestPracticesValidation() {
  return (
    <LearnLayout
      title="HTML Best Practices & Validation"
      description="The W3C validator, void elements, self-closing tag myths, and the conventions that separate clean markup from markup that merely renders."
      section="HTML & CSS — Module 15"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Renders vs. Valid" />
        <SectionTitle>&quot;It Renders Fine&quot; Is Not the Same as &quot;It&apos;s Correct&quot;</SectionTitle>

        <Para>
          Browsers are extraordinarily forgiving. An unclosed <code>&lt;li&gt;</code>, a duplicated{' '}
          <code>id</code>, a <code>&lt;p&gt;</code> nested inside another <code>&lt;p&gt;</code> — every
          major browser will silently repair markup like this on the fly and render <em>something</em>{' '}
          on screen, usually without a single console warning. This leniency is a genuine strength of the
          web platform (a page from 1998 with sloppy markup still renders today), but it has a real cost:
          it means "the page looks right in my browser" is a much weaker signal of correct markup than
          most beginners assume.
        </Para>

        <CodeBox label="Browsers silently repair this — but it is not valid HTML">{`<ul>
  <li>Apples
  <li>Bananas
  <li>Cherries
</ul>
<!-- Missing </li> closing tags on every item. Every major browser will
     still render three list items correctly. That doesn't make this valid markup. -->`}</CodeBox>

        <Para>
          Invalid markup does not just risk looking wrong — it risks behaving inconsistently. The browser
          is running an error-recovery algorithm to guess what you meant, and different error-recovery
          paths can produce a different DOM structure than you intended, which then breaks CSS selectors
          that assumed a particular nesting, or JavaScript that queries the DOM expecting a particular
          shape. Screen readers and search engine crawlers, which have far less browser-grade error
          recovery to lean on, are hit even harder by markup that merely "happens to render."
        </Para>

        <Callout type="info">
          This module is about closing that gap — writing HTML that is not just visually correct in
          today&apos;s Chrome, but structurally correct according to the HTML specification itself, which
          is what keeps it reliable across browsers, screen readers, crawlers, and whatever renders the
          web five years from now.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The W3C Markup Validator" />
        <SectionTitle>The W3C Markup Validator — How to Actually Use It</SectionTitle>

        <Para>
          The W3C (World Wide Web Consortium) — the standards body that maintains the HTML
          specification — runs a free public tool at <code>validator.w3.org</code> that checks a page&apos;s
          markup against the actual HTML specification and reports every structural violation it finds, by
          line and column number.
        </Para>

        <SubTitle>The three ways to submit markup to it</SubTitle>

        <CodeBox label="1. Validate by URL — the page must already be publicly reachable">{`https://validator.w3.org/nu/?doc=https://riversidepotteryaustin.com/`}</CodeBox>

        <CodeBox label="2. Validate by file upload — for a local .html file not yet deployed">{`https://validator.w3.org/nu/#file
(select a local .html file directly from your machine)`}</CodeBox>

        <CodeBox label="3. Validate by direct input — paste raw markup straight into a textarea">{`https://validator.w3.org/nu/#textarea
(paste your <html>...</html> source directly, useful for quickly checking
a fragment or a page still running only on localhost)`}</CodeBox>

        <Para>
          Direct input is the one most useful during active development, since your page is usually
          running on <code>localhost</code> and not yet publicly reachable by URL. Validate-by-URL is
          what you reach for once a page is deployed, particularly worth doing right before a launch, or
          periodically against a production site as part of routine maintenance.
        </Para>

        <SubTitle>Reading the output</SubTitle>

        <Para>
          The validator returns a list of findings, each tagged as an <strong>Error</strong> (a genuine
          specification violation — the markup is invalid) or a <strong>Warning</strong> (not invalid,
          but a signal something might be a mistake, like using an obsolete attribute). Each finding
          includes the exact line and column, and a plain-English description of the rule violated.
        </Para>

        <CodeBox label="An example validator finding">{`Error: Duplicate ID "hero-title".
From line 42, column 3; to line 42, column 34

Error: End tag "li" seen, but there were open elements.
From line 18, column 1; to line 18, column 5`}</CodeBox>

        <Callout type="tip">
          <strong>Fix errors top to bottom, then re-run the validator — one structural error frequently
          causes several cascading findings below it.</strong> An unclosed tag near the top of a document
          can shift the validator&apos;s understanding of everything nested after it, producing a wall of
          findings that mostly disappear once that single root cause is fixed. Don&apos;t panic at a long
          error list — fix the first genuine structural error, then re-validate before working through the
          rest.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Void Elements" />
        <SectionTitle>Void Elements — Tags That Never Have a Closing Tag, By Design</SectionTitle>

        <Para>
          Most HTML elements wrap content and therefore need both an opening and closing tag:{' '}
          <code>&lt;p&gt;...&lt;/p&gt;</code>, <code>&lt;div&gt;...&lt;/div&gt;</code>. A specific, fixed
          set of elements are defined by the HTML specification as <strong>void elements</strong> — they
          can never have content or children, so the specification simply does not define a closing tag
          for them at all. Writing one is not merely unnecessary, it is not valid HTML.
        </Para>

        <CodeBox label="The complete list of void elements">{`<area>   <base>    <br>     <col>    <embed>
<hr>     <img>     <input>  <link>   <meta>
<param>  <source>  <track>  <wbr>`}</CodeBox>

        <CodeBox label="Void elements in real markup — no closing tag exists">{`<img src="pottery.jpg" alt="Hand-thrown ceramic bowl">
<br>
<input type="email" name="email">
<hr>
<link rel="stylesheet" href="styles.css">
<meta charset="UTF-8">`}</CodeBox>

        <Para>
          You have already been using several of these throughout this track — <code>&lt;img&gt;</code>,{' '}
          <code>&lt;br&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;meta&gt;</code>, and{' '}
          <code>&lt;link&gt;</code> chief among them. The reason none of them have ever needed a closing
          tag is exactly this: the specification defines them as void, full stop, not as a stylistic
          choice you or your team gets to make.
        </Para>

        <SubTitle>The XHTML-style trailing slash — a convention, not a requirement</SubTitle>

        <Para>
          You will very commonly see void elements written with a trailing slash before the closing
          angle bracket: <code>&lt;br /&gt;</code>, <code>&lt;img ... /&gt;</code>. This convention comes
          from XHTML (an earlier, stricter XML-based flavor of HTML that required every element to be
          explicitly closed, including void ones, since XML syntax does not have the concept of a void
          element at all). In HTML5, this trailing slash is <strong>entirely optional and has zero
          effect</strong> — the HTML5 parser treats <code>&lt;br&gt;</code> and{' '}
          <code>&lt;br /&gt;</code> as functionally, semantically identical.
        </Para>

        <CodeBox label="Both lines are equally valid, equally correct HTML5 — the slash changes nothing">{`<br>
<br />

<img src="photo.jpg" alt="A description">
<img src="photo.jpg" alt="A description" />`}</CodeBox>

        <Callout type="warning">
          <strong>Do not confuse "stylistic convention" with "meaningless typo target."</strong> The
          trailing slash is optional, but it must still be placed correctly if you choose to use it — a
          slash appearing anywhere except immediately before the closing <code>&gt;</code> is a genuine
          syntax error, not a stylistic variant. Most teams pick one convention (with or without the
          slash) and apply it consistently via a linter/formatter, purely for visual consistency across a
          codebase — not because HTML5 requires either form.
        </Callout>

        <SubTitle>Why you never need to write &lt;br&gt;&lt;/br&gt; or &lt;img&gt;&lt;/img&gt;</SubTitle>

        <CodeBox label="Invalid — void elements cannot have a separate closing tag">{`<br></br>
<img src="photo.jpg" alt="A description"></img>`}</CodeBox>

        <Para>
          These will typically still render without visibly breaking anything in a browser (leniency,
          again) — but they are invalid markup that the validator will flag, and the stray closing tags
          can, in specific edge cases, confuse the parser about where a genuinely different element is
          meant to start or end.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Attribute Quoting Conventions" />
        <SectionTitle>Attribute Quoting — What HTML5 Technically Allows vs. What You Should Write</SectionTitle>

        <Para>
          HTML5&apos;s specification is more permissive about attribute quoting than most developers
          realize — but permissive does not mean recommended, and this is a good example of where "valid"
          and "good practice" genuinely diverge.
        </Para>

        <CodeBox label="Three forms HTML5 technically permits">{`<input type="text" name="email">     <!-- double-quoted — the standard convention -->
<input type='text' name='email'>     <!-- single-quoted — also valid -->
<input type=text name=email>         <!-- entirely unquoted — ALSO technically valid, for simple values -->`}</CodeBox>

        <Para>
          Unquoted attribute values are legal in HTML5 as long as the value contains none of a specific
          set of characters (spaces, quotes, <code>=</code>, <code>&lt;</code>, <code>&gt;</code>, or a
          backtick). In practice, this makes unquoted attributes a trap rather than a convenience — a
          value that is safely unquoted today can silently become invalid, or worse, silently break in a
          confusing way, the moment someone appends a value containing a space.
        </Para>

        <CodeBox label="Why unquoted attributes are dangerous in practice, not just unconventional">{`<!-- Works today -->
<div class=hero>

<!-- Someone adds a second class later, without adding quotes -->
<div class=hero featured>
<!-- This is NOT "class=hero featured" as one value — "featured" is parsed as
     an entirely separate, invalid boolean attribute. The class is silently just "hero". -->`}</CodeBox>

        <Callout type="tip">
          <strong>Always quote attribute values, with no exceptions, even for single-word values that
          would technically be legal unquoted.</strong> Double quotes are the overwhelmingly dominant
          convention in real codebases, style guides (including Google&apos;s and Airbnb&apos;s HTML
          style guides), and every major formatter (Prettier defaults to double quotes for HTML
          attributes). Pick double quotes and apply them consistently — the specification&apos;s
          permissiveness here is not an invitation to actually use it.
        </Callout>

        <SubTitle>Lowercase tags and attributes — also a convention, also worth following exactly</SubTitle>

        <Para>
          HTML is case-insensitive for tag and attribute names — <code>&lt;DIV&gt;</code>,{' '}
          <code>&lt;Div&gt;</code>, and <code>&lt;div&gt;</code> are all parsed identically by every
          browser. Lowercase is, again, purely convention rather than a hard requirement — but it is an
          extremely strong, near-universal one, inherited directly from XHTML&apos;s stricter rules
          (which genuinely did require lowercase) and preserved as best practice even after HTML5 relaxed
          the requirement.
        </Para>

        <CodeBox label="Both are valid HTML5 — only one is the accepted convention">{`<DIV CLASS="hero">          <!-- valid, but will draw comments in any real code review -->
<div class="hero">          <!-- the universal convention -->`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Common Validator-Caught Mistakes" />
        <SectionTitle>The Mistakes the Validator Catches That Browsers Silently Ignore</SectionTitle>

        <SubTitle>Unclosed tags</SubTitle>

        <CodeBox label="Invalid — missing closing tags">{`<div class="card">
  <h3>Product Name</h3>
  <p>Description text goes here
</div>
<!-- The <p> is never closed. The browser guesses where it should end
     (usually right before the </div>), but that guess isn't guaranteed
     to match what you intended, especially in more deeply nested markup. -->`}</CodeBox>

        <SubTitle>Duplicate IDs</SubTitle>

        <Para>
          An <code>id</code> must be unique within a document — this is not a stylistic guideline, it is
          a hard rule of the specification, because so much of the platform assumes it: <code>
          document.getElementById()</code> is defined to return only the first match, a{' '}
          <code>&lt;label for="..."&gt;</code> pointing at a duplicated ID becomes ambiguous about which
          field it labels for a screen reader, and a same-page anchor link (<code>#section</code>)
          becomes ambiguous about which element it should scroll to.
        </Para>

        <CodeBox label="Invalid — the same id used twice">{`<section id="pricing">
  <h2>Pricing</h2>
</section>

<section id="pricing">   <!-- duplicate — invalid, and genuinely ambiguous -->
  <h2>Pricing Details</h2>
</section>`}</CodeBox>

        <SubTitle>Invalid nesting</SubTitle>

        <Para>
          A small number of elements have specification-defined restrictions on what they can legally
          contain — most famously, a <code>&lt;p&gt;</code> cannot contain any other block-level element,
          including another <code>&lt;p&gt;</code>, a <code>&lt;div&gt;</code>, or a list.
        </Para>

        <CodeBox label="Invalid nesting — a block element inside a p">{`<p>
  Check out our latest arrivals:
  <div class="product-card">...</div>
</p>
<!-- Invalid. The browser will actually auto-close the <p> right before the <div>
     starts, and the </p> at the end becomes a stray, meaningless closing tag —
     producing a genuinely different DOM structure than what the markup visually suggests. -->`}</CodeBox>

        <CodeBox label="Fixed — use a div (or article/section) as the wrapper instead of p">{`<div>
  <p>Check out our latest arrivals:</p>
  <div class="product-card">...</div>
</div>`}</CodeBox>

        <SubTitle>Interactive elements nested inside other interactive elements</SubTitle>

        <CodeBox label="Invalid — a button cannot contain a link, or vice versa">{`<a href="/product/42">
  View details
  <button>Add to cart</button>
</a>
<!-- Invalid. Nesting interactive controls inside each other is explicitly
     disallowed by the spec, and produces genuinely broken, ambiguous
     keyboard/click behavior — which control should activate on a click? -->`}</CodeBox>

        <CodeBox label="Fixed — two separate, sibling interactive elements">{`<div class="product-row">
  <a href="/product/42">View details</a>
  <button>Add to cart</button>
</div>`}</CodeBox>

        <SubTitle>Missing alt attributes and empty required attributes</SubTitle>

        <CodeBox label="A validator warning, not an error — but worth fixing every time">{`<img src="pottery-bowl.jpg">
<!-- Warning: An "img" element must have an "alt" attribute, except under
     certain conditions. For most content images, alt is a hard requirement
     for accessibility even where the validator only issues a warning. -->`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Why This Actually Matters" />
        <SectionTitle>What Valid Markup Buys You, Concretely</SectionTitle>

        <Para>
          It is fair to ask, given how forgiving browsers are, whether validation is worth the effort at
          all. Four concrete, non-theoretical answers.
        </Para>

        <SubTitle>1. Consistent cross-browser and cross-tool rendering</SubTitle>

        <Para>
          Different browsers implement slightly different error-recovery heuristics for malformed markup.
          Valid markup sidesteps error recovery entirely — there is exactly one correct way to parse it,
          so every conforming parser (every browser, every screen reader, every crawler) produces the
          same DOM.
        </Para>

        <SubTitle>2. Accessibility</SubTitle>

        <Para>
          Screen readers rely on a correctly structured DOM to build their accessibility tree — invalid
          nesting, duplicate IDs breaking <code>label</code>/<code>for</code> associations, and missing{' '}
          <code>alt</code> text all directly degrade the experience for a user relying on assistive
          technology, in ways a sighted developer testing only visually will never notice.
        </Para>

        <SubTitle>3. SEO</SubTitle>

        <Para>
          Search engine crawlers parse HTML with tooling that is generally less forgiving than a full
          browser engine. Structurally broken markup can cause a crawler to misjudge your page&apos;s
          actual content structure, header hierarchy, or which text belongs to which section — all
          signals search engines use to understand and rank a page.
        </Para>

        <SubTitle>4. Maintainability for the next engineer</SubTitle>

        <Para>
          Valid, consistently formatted markup is dramatically easier for another engineer (or future
          you) to read, extend, and safely restructure. Markup that only "happens to render correctly" in
          today&apos;s browser is markup nobody can safely touch with full confidence.
        </Para>

        <Callout type="info">
          Realistically, most production teams do not run every single page through the W3C validator on
          every commit. What is common — and worth adopting as a habit from day one — is running it
          against any new page template before launch, and periodically against production as a health
          check. Catching structural issues in the validator during development is dramatically cheaper
          than discovering them later as a hard-to-reproduce cross-browser bug or an accessibility
          complaint.
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
        <SectionTitle>A Duplicate ID Silently Breaks Analytics at a Nashville Ticketing Startup</SectionTitle>

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
            Scenario — Live event ticketing startup, Nashville · A/B test analysis
          </div>

          <Para>
            A Nashville-based concert ticketing platform runs an A/B test on its checkout page, comparing
            two "Buy Now" button placements. Both variants are rendered by a shared checkout template — a
            newer variant was built by copy-pasting the older variant&apos;s markup and modifying it,
            rather than starting from a clean component.
          </Para>

          <CodeBox label="What the copy-paste left behind">{`<!-- Variant A's button -->
<button id="buy-now-btn" class="btn-primary" data-track="checkout-cta">Buy Now</button>

<!-- ...further down the same page, in a leftover "recently viewed" module
     that was never removed from the copy-pasted template -->
<button id="buy-now-btn" class="btn-secondary" data-track="related-cta">View Similar</button>`}</CodeBox>

          <SubSubTitle>What the data team notices three weeks in</SubSubTitle>

          <Para>
            The click-tracking script listens for clicks using{' '}
            <code>document.getElementById('buy-now-btn').addEventListener(...)</code>. Per the
            specification, <code>getElementById</code> is only guaranteed to return the{' '}
            <em>first</em> matching element in the document — so every click tracker attached this way
            was silently bound only to the leftover "View Similar" button, not the actual checkout CTA,
            on every page load where the duplicate happened to appear before the real button in the DOM
            order. The A/B test&apos;s conversion numbers for the button-placement experiment were
            measuring clicks on the wrong element entirely, for three weeks, with nobody noticing because
            both buttons still visually worked fine — this is purely a case of{' '}
            <code>id</code> uniqueness, a rule browsers do not enforce, silently breaking behavior that
            depended on that guarantee.
          </Para>

          <SubSubTitle>The fix and the process change</SubSubTitle>

          <Para>
            The immediate fix is trivial — rename the duplicate ID, or better, remove the dead leftover
            markup entirely. The team&apos;s actual takeaway is that running the checkout template through
            the W3C validator — which would have flagged the duplicate ID in seconds — becomes a required
            step in their PR checklist for any change touching a shared page template, specifically
            because this exact bug class (silent, no console error, no visual symptom, purely a
            first-match-wins JavaScript behavior quietly pointing at the wrong element) is genuinely hard
            to catch through manual QA or visual review alone.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Validation and Markup Rules</SectionTitle>

        {[
          {
            wrong: '"If the page looks right in Chrome, the markup is fine"',
            right: 'Browsers run an error-recovery algorithm that silently repairs invalid markup, producing a rendered page without any visible symptom of the underlying structural problem. Rendering correctly is not the same guarantee as being spec-valid, and invalid markup can behave inconsistently across browsers, break DOM-dependent JavaScript, or degrade accessibility in ways a sighted visual check will never surface.',
          },
          {
            wrong: '"HTML5 requires the XHTML-style trailing slash on void elements, like <br />"',
            right: 'It does not. HTML5 makes the trailing slash entirely optional and functionally meaningless — <br> and <br /> are parsed identically. It survives purely as a stylistic convention some teams still choose, inherited from XHTML, which genuinely did require it.',
          },
          {
            wrong: '"Unquoted attribute values like class=hero are a shortcut worth using since they\'re technically legal"',
            right: 'They are legal in narrow cases, but fragile — a later edit that adds a space-containing value (like a second class name) silently breaks the attribute without a syntax error, since the parser interprets the space as ending the unquoted value. Always quote attribute values regardless of what the value contains.',
          },
          {
            wrong: '"Duplicate IDs are a minor style nitpick, not a real bug"',
            right: 'id uniqueness is a hard specification requirement that real platform behavior depends on — document.getElementById() only returns the first match, label/for associations become ambiguous, and same-page anchor links can target the wrong element. Duplicate IDs are a common source of silent, hard-to-diagnose bugs specifically because browsers never raise a visible error for them.',
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
            q: 'What is a void element, and why doesn\'t it have a closing tag?',
            a: 'A void element is one the HTML specification defines as never able to contain content or children — img, br, hr, input, meta, link, and a fixed handful of others. Because they structurally cannot have content, the specification does not define a closing tag for them at all; writing one (like <br></br>) is not valid HTML, even though browsers will typically still render it without visible breakage.',
          },
          {
            q: 'Is the trailing slash on a void element, like <img ... />, required in HTML5?',
            a: 'No. It is a purely optional, stylistic convention carried over from XHTML, where it genuinely was required because XML syntax has no concept of a void element. In HTML5, <img ...> and <img ... /> are parsed identically — the slash has zero functional effect.',
          },
          {
            q: 'Why does duplicate id usage cause real bugs, not just fail validation?',
            a: 'Multiple platform features assume id uniqueness by specification: document.getElementById() is defined to return only the first matching element, a <label for="..."> pointing at a duplicated id becomes ambiguous for assistive technology, and a same-page anchor link targeting that id becomes ambiguous about which element it should scroll to. Because browsers never raise a visible error for the duplication itself, these bugs tend to surface as confusing, hard-to-diagnose behavior rather than an obvious failure.',
          },
          {
            q: 'What are the three ways to submit markup to the W3C Markup Validator, and when would you use each?',
            a: 'By URL, for a page that is already publicly deployed — useful for a pre-launch or periodic production check. By file upload, for a local HTML file not yet deployed anywhere. By direct text input, pasting raw markup into a textarea — the most useful option during active development, since a page running on localhost isn\'t reachable by URL.',
          },
          {
            q: 'Why is unquoted attribute syntax (like <input type=text>) discouraged even though it\'s technically valid HTML5?',
            a: 'It is legal only when the value contains none of a specific set of characters, including spaces. This makes it fragile rather than convenient: a value that is safely unquoted today can silently break — with no syntax error — the moment someone appends a space-containing value, such as adding a second class name to an unquoted class attribute. Consistently quoting every attribute value removes this entire class of fragile-by-default markup.',
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
        <SectionTitle>Validation Mistakes Teams Make Constantly</SectionTitle>

        <SubSubTitle>Mistake: writing a closing tag on a void element</SubSubTitle>
        <CodeBox label="Invalid">{`<input type="email" name="email"></input>`}</CodeBox>
        <CodeBox label="Fixed">{`<input type="email" name="email">`}</CodeBox>

        <SubSubTitle>Mistake: reusing an id across multiple elements</SubSubTitle>
        <CodeBox label="Invalid — two elements sharing the same id">{`<h3 id="card-title">Handmade Mug</h3>
...
<h3 id="card-title">Ceramic Bowl</h3>`}</CodeBox>
        <CodeBox label="Fixed — unique ids, or drop the id and style/select by class instead">{`<h3 id="card-title-mug">Handmade Mug</h3>
...
<h3 id="card-title-bowl">Ceramic Bowl</h3>`}</CodeBox>

        <SubSubTitle>Mistake: nesting a block-level element inside a p</SubSubTitle>
        <CodeBox label="Invalid — the browser silently auto-closes the p early, changing your DOM structure">{`<p>
  Our studio hours:
  <ul>
    <li>Tue–Fri: 10am–6pm</li>
  </ul>
</p>`}</CodeBox>
        <CodeBox label="Fixed">{`<div>
  <p>Our studio hours:</p>
  <ul>
    <li>Tue–Fri: 10am–6pm</li>
  </ul>
</div>`}</CodeBox>

        <SubSubTitle>Mistake: leaving list items unclosed</SubSubTitle>
        <CodeBox label="Invalid — relies entirely on browser error recovery">{`<ul>
  <li>Wheel-thrown mugs
  <li>Hand-built bowls
</ul>`}</CodeBox>
        <CodeBox label="Fixed">{`<ul>
  <li>Wheel-thrown mugs</li>
  <li>Hand-built bowls</li>
</ul>`}</CodeBox>

        <SubSubTitle>Mistake: nesting an interactive element inside another interactive element</SubSubTitle>
        <CodeBox label="Invalid — a checkbox input inside a label wrapping a link is fine, but a button inside a link is not">{`<a href="/cart">
  <button>Remove item</button>
</a>`}</CodeBox>
        <CodeBox label="Fixed — separate, sibling controls">{`<div class="cart-item">
  <a href="/cart">View cart</a>
  <button>Remove item</button>
</div>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Findings the Validator Reports — And Exactly Why</SectionTitle>

        {[
          {
            error: `Error: Duplicate ID "hero-title"`,
            cause: 'The same id attribute value is used on more than one element in the document. The specification requires ids to be unique within a page — browsers do not enforce this at parse time, so it renders without any visible symptom.',
            fix: 'Rename one of the duplicated ids to something unique, or replace the id with a class if the styling/selection does not actually require a unique identifier.',
          },
          {
            error: `Error: End tag "li" seen, but there were open elements`,
            cause: 'A closing tag was encountered while a different, unrelated element earlier in the document was still open (unclosed) — most often caused by forgetting a closing tag on a previous sibling element.',
            fix: 'Find and close the actually-unclosed element mentioned in the surrounding context. Fixing the true root cause frequently resolves several cascading findings below it in the same validator report.',
          },
          {
            error: `Error: Element "p" not allowed as child of element "p" in this context`,
            cause: 'A block-level element (a nested <p>, a <div>, a <ul>, etc.) was placed inside a <p>, which the specification explicitly disallows since a paragraph can only contain inline-level content.',
            fix: 'Replace the outer <p> with a <div> (or a more semantically appropriate wrapper like <section>), and keep any genuine paragraph text in its own separate <p>.',
          },
          {
            error: `Warning: An "img" element must have an "alt" attribute`,
            cause: 'An <img> tag has no alt attribute at all. This is flagged as a warning rather than a hard error because a small number of specific, spec-defined cases legitimately omit it — but for ordinary content images, this is effectively a hard accessibility requirement.',
            fix: 'Add a descriptive alt attribute for any image conveying real content; use alt="" (empty, but present) specifically for purely decorative images that add no informational value.',
          },
          {
            error: `Error: Bad value "text " for attribute "type" on element "input": Trailing whitespace`,
            cause: 'An unquoted (or improperly quoted) attribute value picked up unintended trailing whitespace or was split by a space the parser interpreted as ending the value early — a direct consequence of the unquoted-attribute fragility covered in Part 04.',
            fix: 'Quote every attribute value consistently with double quotes, and remove any accidental extra whitespace inside the value itself.',
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
        'Browsers silently repair invalid markup and render it anyway — "renders correctly" is not the same guarantee as "valid HTML," and error-recovery behavior can vary across browsers.',
        'The W3C Markup Validator (validator.w3.org) checks markup by URL, file upload, or direct text input, and reports Errors (spec violations) and Warnings (likely mistakes) by exact line and column.',
        'Void elements (img, br, hr, input, meta, link, and a fixed handful of others) never have a closing tag, by specification — they structurally cannot contain content.',
        'The XHTML-style trailing slash on void elements (<br />) is entirely optional in HTML5 and has zero functional effect — it survives purely as a stylistic convention.',
        'Always quote attribute values with double quotes. Unquoted values are technically legal in narrow cases but fragile, silently breaking the moment a space-containing value is introduced.',
        'Lowercase tag and attribute names are convention, not a hard HTML5 requirement — but an extremely strong, near-universal one worth following exactly.',
        'Duplicate ids are a hard specification violation with real behavioral consequences: getElementById() only returns the first match, and label/for associations and anchor links become ambiguous.',
        'Invalid nesting (a block element inside a p, an interactive element inside another interactive element) causes the browser to silently restructure your DOM via error recovery, which can differ from what the markup visually implies.',
        'Valid markup matters concretely for cross-browser consistency, accessibility, SEO crawlability, and long-term maintainability — not just for passing a validator report.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 16 is the capstone of the HTML Deep Dive phase — a full, real one-page site built end to
          end, pulling together structure, semantics, media, forms, metadata, entities, and everything
          covered in this module into one complete, valid page.
        </p>
        <Link href="/learn/html-css/building-a-complete-static-page" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 16 → Building a Complete Static Page
        </Link>
      </div>
    </LearnLayout>
  )
}
