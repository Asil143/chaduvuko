import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Document Structure — DOCTYPE, html, head, body | Chaduvuko',
  description:
    'Every HTML document follows the same skeleton. What each part actually does, and the mistakes that silently break rendering.',
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

export default function DocumentStructure() {
  return (
    <LearnLayout
      title="Document Structure — DOCTYPE, html, head, body"
      description="Every HTML document follows the same skeleton. What each part actually does, and the mistakes that silently break rendering."
      section="HTML & CSS — Module 02"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Minimum Valid Document" />
        <SectionTitle>Every HTML Page Ever Written Starts From This Same Skeleton</SectionTitle>

        <Para>
          Underneath every website you have ever visited — no matter how complex the framework, how
          elaborate the design, how many megabytes of JavaScript are involved — the actual HTML document
          the browser receives follows the exact same basic skeleton. Learning this skeleton properly,
          rather than copy-pasting it without understanding each piece, is what this entire module is
          about.
        </Para>

        <CodeBox label="The minimum realistic HTML document">{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello, world</h1>
  </body>
</html>`}</CodeBox>

        <Para>
          Five pieces, each doing a distinct job: the <strong>DOCTYPE</strong> declaration on line one
          (Part 02), the <code>&lt;html&gt;</code> element wrapping everything and carrying the{' '}
          <code>lang</code> attribute (Part 03), the <code>&lt;head&gt;</code> holding metadata the browser
          needs but does not display directly (Part 04), the character encoding declaration inside it
          (Part 05), and the <code>&lt;body&gt;</code> holding everything a visitor actually sees (Part
          03). The rest of this module goes through each of these individually, in the order they matter
          most for understanding what actually breaks when one is missing or misplaced.
        </Para>

        <Callout type="info">
          None of these five pieces are optional in a document you actually intend to ship. Browsers are
          extremely forgiving and will still render a page missing several of them — which is precisely
          why the mistakes in this module are dangerous: they do not throw visible errors, they just
          quietly degrade the page in ways that are easy to miss during casual testing.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — DOCTYPE" />
        <SectionTitle>&lt;!DOCTYPE html&gt; — One Line That Decides How the Entire Page Is Interpreted</SectionTitle>

        <Para>
          <code>&lt;!DOCTYPE html&gt;</code> is not an HTML tag in the normal sense — it carries no
          attributes, has no closing tag, and does not become a node the way <code>&lt;div&gt;</code> or{' '}
          <code>&lt;p&gt;</code> do. It is an instruction to the browser, and it must be the very first
          thing in the file, before even a blank line or a comment. Its entire job is telling the browser
          which <strong>rendering mode</strong> to use for the whole document.
        </Para>

        <CodeBox label="The modern DOCTYPE — this is the only one you should ever write">{`<!DOCTYPE html>`}</CodeBox>

        <Para>
          This looks almost suspiciously simple compared to the DOCTYPEs required by older HTML
          standards (HTML 4.01 and XHTML required a long URL pointing at a formal specification document).
          HTML5 deliberately simplified it down to this exact ten-character line, and it is genuinely all
          that modern browsers need to pick <strong>standards mode</strong> — the mode where CSS box-model
          math, layout behavior, and specification-defined rendering all behave the way every reference and
          tutorial you will read assumes they behave.
        </Para>

        <SubTitle>Quirks mode — what happens without it</SubTitle>

        <Para>
          If the DOCTYPE is missing, malformed, or not the very first thing in the file, browsers fall
          back to <strong>quirks mode</strong> — a compatibility mode that deliberately reproduces bugs and
          non-standard behaviors from browsers built in the 1990s, so that extremely old websites written
          before any real standard existed would not break when opened in modern browsers. Quirks mode is
          not a slightly-different rendering mode; it changes real, load-bearing behavior.
        </Para>

        <CodeBox label="A real, concrete difference: box-sizing behavior changes in quirks mode">{`/* In standards mode, this box is exactly 200px wide, and padding/border
   are added ON TOP of that (unless box-sizing: border-box overrides it) */
.card {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
/* standards mode → rendered width = 200 + 40 + 10 = 250px
   quirks mode     → padding and border are folded INTO the 200px instead,
                      making the visible content area much narrower */`}</CodeBox>

        <Callout type="warning">
          <strong>Quirks mode is one of the most dangerous silent bugs in all of front-end work</strong>{' '}
          precisely because it never throws an error and the page still renders — it just renders with a
          different box model, different vertical margin behavior between elements, and several other
          differences you will meet properly in the CSS Foundations phase. Everything you learn later in
          this track about how CSS is supposed to behave assumes standards mode. A page missing its DOCTYPE
          can silently disagree with every CSS rule you write, and the fix — one missing line at the very
          top of the file — is trivial once you know to look for it, but genuinely confusing to diagnose
          if you don&apos;t.
        </Callout>

        <SubTitle>How to actually check which mode a page is in</SubTitle>

        <Para>
          Open DevTools, go to the Console, and type <code>document.compatMode</code>. It returns{' '}
          <code>&quot;CSS1Compat&quot;</code> for standards mode, or <code>&quot;BackCompat&quot;</code>{' '}
          for quirks mode. This is a genuinely fast, reliable way to confirm the DOCTYPE is doing its job,
          rather than assuming it is simply because the page looks fine.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — html, head, body" />
        <SectionTitle>The Required Skeleton — html, head, and body</SectionTitle>

        <Para>
          Immediately after the DOCTYPE comes exactly one <code>&lt;html&gt;</code> element, which
          contains the entire rest of the document and splits into exactly two children:{' '}
          <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code>. This structure is not a convention you
          could reasonably deviate from — it is what every browser expects, and what every other tag in
          HTML assumes exists around it.
        </Para>

        <CodeBox label="head vs body — two fundamentally different jobs">{`<head>   →  Metadata ABOUT the page. Nothing in here is displayed
             directly in the page's content area. Title, character
             encoding, linked stylesheets, favicon, SEO/social meta tags.

<body>   →  Everything a visitor actually SEES and can interact with.
             Every heading, paragraph, image, button, form, and link
             that becomes visible content lives here.`}</CodeBox>

        <Para>
          A useful rule of thumb while learning: if you can point at something on the rendered page and
          say "that&apos;s right there, in the layout," it belongs in <code>&lt;body&gt;</code>. If it
          describes the page itself, rather than being part of what the page displays — its title, which
          stylesheet to use, how search engines should describe it — it belongs in{' '}
          <code>&lt;head&gt;</code>.
        </Para>

        <SubTitle>The lang attribute — small, and easy to skip, but not cosmetic</SubTitle>

        <Para>
          The <code>&lt;html&gt;</code> tag should always carry a <code>lang</code> attribute declaring
          the page&apos;s primary language, using a standard language code.
        </Para>

        <CodeBox label="lang in practice">{`<html lang="en">     <!-- English -->
<html lang="es">     <!-- Spanish -->
<html lang="en-US">  <!-- English, United States specifically -->
<html lang="fr-CA">  <!-- French, Canada specifically -->`}</CodeBox>

        <Para>
          This is not decoration — screen readers use it to select the correct pronunciation and voice
          for the page&apos;s content, browsers use it to decide whether to offer an automatic translation
          prompt, and it feeds directly into how search engines serve results to users searching in
          different languages. A page with no <code>lang</code> attribute forces a screen reader to guess,
          and it very often guesses wrong, reading English content with a pronunciation model built for an
          entirely different language.
        </Para>

        <Callout type="tip">
          If a single page genuinely contains a block of content in a different language than the rest of
          the page — a quoted passage, a product name — you can override the language for just that block
          with <code>lang</code> on the specific element, e.g.{' '}
          <code>{`<p lang="fr">C'est la vie.</p>`}</code>, without changing the document-wide declaration on{' '}
          <code>&lt;html&gt;</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Inside head" />
        <SectionTitle>What Actually Belongs Inside &lt;head&gt;</SectionTitle>

        <Para>
          <code>&lt;head&gt;</code> is where a small, specific set of elements live — this track covers
          several of them in dedicated modules later (Metadata & SEO Fundamentals, in Phase 2), but it is
          worth seeing the common set together now, since document structure is meaningless without
          knowing what actually goes inside it.
        </Para>

        <CodeBox label="A realistic, complete head">{`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trailhead Boots — Waterproof Hiking Footwear</title>
  <meta name="description" content="Waterproof hiking boots built for
        Pacific Northwest trail conditions, from $129.">
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="icon" href="/favicon.ico">
</head>`}</CodeBox>

        <Para>
          <code>&lt;title&gt;</code> is the single most important element here for most beginners to get
          right — it is what shows in the browser tab, what shows as the clickable headline in search
          results, and what shows when someone bookmarks or shares the page. Every page should have
          exactly one, and it should describe that specific page, not just repeat the site name on every
          page of the whole site.
        </Para>

        <Callout type="warning">
          A common mistake: forgetting <code>&lt;title&gt;</code> entirely. The page still renders fine —
          nothing visibly breaks in the content area — but the browser tab shows a blank or generic label,
          search results show an unhelpful auto-generated title, and anyone sharing the link gets a broken
          preview. This is exactly the kind of "silently degrades, never errors" mistake this module keeps
          returning to.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Character Encoding" />
        <SectionTitle>&lt;meta charset=&quot;UTF-8&quot;&gt; — Why Its Position Is Not Arbitrary</SectionTitle>

        <Para>
          The charset meta tag tells the browser which character encoding the file uses — how the raw
          bytes of the file should be translated into actual text characters. <code>UTF-8</code> is the
          correct, standard choice for essentially every modern web page, since it can represent every
          character in every language, plus emoji, without needing a different encoding per language.
        </Para>

        <CodeBox label="The charset declaration">{`<meta charset="UTF-8">`}</CodeBox>

        <Para>
          The detail that trips people up is not the tag itself — it is where it has to go.{' '}
          <strong>The charset declaration must appear within the first 1024 bytes of the document</strong>,
          which in practice means it needs to be essentially the very first thing inside{' '}
          <code>&lt;head&gt;</code>, before <code>&lt;title&gt;</code> and definitely before anything
          longer like a large inline script or a long meta description.
        </Para>

        <CodeBox label="Correct — charset is the very first thing in head">{`<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  ...
</head>`}</CodeBox>

        <CodeBox label="Risky — charset comes after other content, which can push it past the byte limit">{`<head>
  <title>My Page</title>
  <meta name="description" content="A very long description that, combined
        with everything above it, could push the charset declaration past
        the 1024-byte window some browsers use before they commit to a
        best-guess encoding on their own.">
  <meta charset="UTF-8">
</head>`}</CodeBox>

        <Para>
          If a browser has to guess the encoding before it reaches the charset declaration, it uses a
          heuristic based on the page&apos;s content and your locale settings — and that guess can be
          wrong, especially for pages with non-English content. The visible symptom is <strong>mojibake</strong>{' '}
          — readable text replaced with garbled character sequences, most infamously an apostrophe or
          curly quote rendering as something like <code>â€™</code>.
        </Para>

        <Callout type="tip">
          The safe rule: <code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code> is the very first line inside{' '}
          <code>&lt;head&gt;</code>, full stop, before the DOCTYPE&apos;s ink is even dry. This single habit
          eliminates an entire category of bug before it can ever occur.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — What Breaks Without a DOCTYPE" />
        <SectionTitle>Putting It Together — Diagnosing a Missing or Broken DOCTYPE</SectionTitle>

        <Para>
          It is worth walking through the concrete, observable symptoms of a missing DOCTYPE, since "the
          page silently renders differently" is not, on its own, something you can search for or debug
          efficiently. These are the actual signs to look for.
        </Para>

        <CodeBox label="A page missing its DOCTYPE — legal HTML, triggers quirks mode">{`<html>
  <head>
    <title>Broken Layout</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="card">Content</div>
  </body>
</html>`}</CodeBox>

        <CodeBox label="Concrete, observable symptoms of quirks mode">{`- document.compatMode reports "BackCompat" instead of "CSS1Compat"
- Percentage-based heights on elements behave inconsistently
- Vertical margins between block elements collapse differently than
  the standard rules you'll learn in the Box Model module
- box-sizing math is measured differently — padding/border eat into
  the declared width instead of adding to it
- Some modern CSS selectors and properties may be ignored entirely`}</CodeBox>

        <Para>
          None of these produce a console error. That is precisely what makes this bug class dangerous —
          it is discovered by a layout looking subtly "off" in a way that resists explanation, sometimes
          only in one browser, until someone finally checks <code>document.compatMode</code> or notices
          the DOCTYPE is missing entirely.
        </Para>

        <Callout type="info">
          This is exactly the kind of foundational, easy-to-overlook detail that separates "the page mostly
          works" from professional-grade markup. Every single template, boilerplate, and framework starter
          you will ever use in real front-end work includes <code>&lt;!DOCTYPE html&gt;</code> as its
          literal first line — now you know precisely why, instead of treating it as boilerplate to
          copy-paste without understanding.
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
        <SectionTitle>A Layout Bug That Only Appeared on One Legacy Page at an Austin Marketing Agency</SectionTitle>

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
            Scenario — Digital marketing agency, Austin · Landing-page bug
          </div>

          <Para>
            An engineer at an Austin marketing agency is asked to migrate the shared CSS design system
            onto an older client landing page that has existed, mostly untouched, for three years. Every
            other page using the same stylesheet looks correct. This one page renders every card
            component noticeably narrower than it should be, and the standard box-model debugging — double
            checking width, padding, and margin values against the CSS file — turns up nothing wrong at
            all; the numbers in the stylesheet are identical to the working pages.
          </Para>

          <SubSubTitle>What finally explains it</SubSubTitle>

          <Para>
            Out of ideas, the engineer opens the console and checks <code>document.compatMode</code> on
            the broken page versus a working one — and the broken page reports{' '}
            <code>&quot;BackCompat&quot;</code>. Opening the raw HTML file confirms it: the page was
            originally built years earlier without a DOCTYPE at all, and nobody had ever needed to notice,
            because the old, simpler CSS on the page never happened to expose the box-model difference.
            The new shared design-system CSS relies on modern <code>box-sizing: border-box</code> math
            throughout — math that quirks mode does not apply consistently.
          </Para>

          <CodeBox label="The actual first line of the broken file">{`<html>
<head><title>Spring Promotion</title>...`}</CodeBox>

          <CodeBox label="The one-line fix">{`<!DOCTYPE html>
<html lang="en">
<head><title>Spring Promotion</title>...`}</CodeBox>

          <Para>
            Adding the missing DOCTYPE line fixes every card on the page instantly, with zero changes to
            the CSS file itself. The bug had been dormant in that file for three years — invisible, until
            a stylesheet that actually depended on standards-mode box-model math was applied to it. The
            lesson the whole team took away: <code>document.compatMode</code> became a standard first
            check whenever a page&apos;s layout behaves inexplicably differently from an otherwise
            identical sibling page.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Document Structure</SectionTitle>

        {[
          {
            wrong: '"DOCTYPE is just old boilerplate left over from earlier HTML versions"',
            right: 'It is a live, functional instruction that determines whether the browser uses standards mode or quirks mode for the entire page — a real, measurable difference in box-model and layout math, not a historical formality.',
          },
          {
            wrong: '"The charset meta tag can go anywhere inside head, as long as it\'s there somewhere"',
            right: 'It must appear within the first 1024 bytes of the document, which in practice means it needs to be effectively the very first thing inside head — otherwise the browser may have already committed to a guessed encoding before it gets there.',
          },
          {
            wrong: "\"lang='en' is just for search engines\"",
            right: 'Screen readers use it to select correct pronunciation, browsers use it to decide whether to offer translation, and yes, search engines use it too — it is a multi-purpose, accessibility-relevant attribute, not an SEO-only nicety.',
          },
          {
            wrong: '"If the page renders without an error, the structure must be fine"',
            right: 'Browsers are extremely forgiving parsers and will render a page missing its DOCTYPE, title, or charset declaration without ever throwing a visible error — silently degrading rendering mode, tab labels, search previews, or text encoding instead.',
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
            q: 'What is the difference between standards mode and quirks mode, and what triggers each?',
            a: 'Standards mode renders a page according to modern CSS/HTML specifications, and is triggered by a valid, correctly-placed <!DOCTYPE html> as the very first line of the document. Quirks mode is a compatibility mode that reproduces old, non-standard 1990s browser rendering behavior, and it activates when the DOCTYPE is missing, malformed, or not the first thing in the file. The difference is concrete, not cosmetic — box-model math, margin-collapsing behavior, and percentage-height handling all differ between the two modes.',
          },
          {
            q: 'Why does the position of the charset meta tag inside head matter?',
            a: 'Browsers must commit to a text encoding before or while parsing the rest of the head, and they only scan the first 1024 bytes of the document looking for a charset declaration before falling back to a guessed encoding. If other content pushes the charset tag past that window, the browser may already be using a guessed encoding, which can cause mojibake — garbled character rendering, especially for text with special characters or accents.',
          },
          {
            q: 'What is the purpose of the lang attribute on the html element, and what actually consumes it?',
            a: 'It declares the primary language of the document\'s content. Screen readers use it to select the correct pronunciation and voice model; browsers use it to decide whether to offer an automatic translation prompt; and search engines use it to serve appropriately-localized results. It can be overridden on a specific element with its own lang attribute for content in a different language than the rest of the page.',
          },
          {
            q: 'What actually belongs in head versus body, and how would you explain the distinction to someone new?',
            a: 'head contains metadata about the page — things that describe the document itself rather than appearing directly in its visible content, like title, charset, linked stylesheets, and SEO/social meta tags. body contains everything a visitor actually sees and interacts with. A simple rule: if you could point at it in the rendered page, it belongs in body; if it describes the page rather than being part of what\'s displayed, it belongs in head.',
          },
          {
            q: 'A landing page has correct, verified CSS, but a component still renders with the wrong dimensions compared to an identical page using the same stylesheet. What would you check first, based on document structure alone?',
            a: 'Whether the page is actually rendering in standards mode — checking document.compatMode in the console, or looking for a missing/malformed DOCTYPE at the very top of the file. A page stuck in quirks mode can apply the exact same CSS with different box-model math, producing dimension differences that have nothing to do with the CSS values themselves being wrong.',
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
        <SectionTitle>Document Structure Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Putting anything at all before <!DOCTYPE html>',
            a: 'Even a single blank line, an HTML comment, or stray whitespace before the DOCTYPE can cause a browser to treat the document as missing one entirely, triggering quirks mode. It must be the literal first characters in the file.',
          },
          {
            q: 'Forgetting the lang attribute on <html>',
            a: 'The page still renders fine visually, so this is easy to skip without any obvious symptom — but it degrades screen-reader pronunciation and removes a signal search engines and translation tools rely on. Add lang="en" (or the correct code) on every page as a default habit.',
          },
          {
            q: 'Writing multiple <title> or multiple <head> elements',
            a: 'HTML technically only expects one of each. Browsers will not throw a visible error, but behavior with duplicates is inconsistent and unpredictable across browsers — always exactly one head, and exactly one title inside it.',
          },
          {
            q: 'Assuming a missing charset tag is harmless because English text "looks fine" without it',
            a: 'It may look fine specifically because the guessed encoding happens to match for plain ASCII text — the moment the page includes an accented character, a curly quote, an em dash, or any non-ASCII content, the guess can be wrong and produce visible mojibake.',
          },
          {
            q: 'Placing <meta charset> after a long meta description or other head content',
            a: 'This risks pushing the charset declaration past the 1024-byte window browsers use before defaulting to a guessed encoding. Always place charset as the very first line inside head.',
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
        <SectionTitle>Errors and Symptoms You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `document.compatMode returns "BackCompat" instead of "CSS1Compat"`,
            cause: 'The page is rendering in quirks mode, almost always because the DOCTYPE is missing, malformed, or not the literal first thing in the file.',
            fix: 'Add "<!DOCTYPE html>" as the very first line of the document, with absolutely nothing — not even whitespace or a comment — before it.',
          },
          {
            error: `Garbled text like â€™ or Ã© appearing where an apostrophe or accented character should be`,
            cause: 'The classic symptom of mojibake — the browser guessed the wrong character encoding, usually because the charset meta tag is missing or placed too late in the head for the browser to find before committing to a guess.',
            fix: "Add <meta charset='UTF-8'> as the literal first line inside head, before title and any other head content.",
          },
          {
            error: `Browser tab shows a blank label or the raw file path instead of a page title`,
            cause: 'The document has no <title> element inside head, so the browser has nothing to display in the tab, bookmarks, or history.',
            fix: 'Add a descriptive, page-specific <title> inside head — never leave it out, and avoid using the exact same title across every page of a site.',
          },
          {
            error: `A screen reader mispronounces content or a browser offers to translate a page that is already in the visitor's language`,
            cause: 'The html element is missing its lang attribute, or has an incorrect one, so the browser and assistive technology cannot determine the page\'s actual language.',
            fix: 'Add an accurate lang attribute to <html> (e.g. lang="en"), and override it on individual elements containing content in a different language.',
          },
          {
            error: `Percentage-based heights or vertical spacing behave unpredictably across otherwise identical pages`,
            cause: 'One page is in quirks mode (missing DOCTYPE) while the other is in standards mode — the same CSS is measured using different box-model and margin-collapsing rules on each.',
            fix: 'Confirm both pages have a correctly placed DOCTYPE, and check document.compatMode on each to verify they match.',
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
        'Every HTML document needs the same five pieces: a DOCTYPE, an html element with lang set, a head, a body, and a correctly placed charset declaration.',
        '<!DOCTYPE html> must be the literal first line of the file — it triggers standards mode. Missing, malformed, or misplaced, it silently triggers quirks mode instead, a compatibility mode with different box-model and layout math.',
        'head holds metadata about the page (title, charset, stylesheets, SEO tags) — nothing in it displays directly in the content area. body holds everything a visitor actually sees.',
        'The lang attribute on html is not cosmetic — it affects screen-reader pronunciation, browser translation prompts, and search engine localization.',
        '<meta charset="UTF-8"> must be within the first 1024 bytes of the document — in practice, the very first line inside head — or the browser may already have guessed (and potentially gotten wrong) the text encoding.',
        'None of these mistakes throw a visible error. Browsers render broken or incomplete documents anyway, which is exactly what makes them dangerous — check document.compatMode when a layout behaves inexplicably.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 03 moves into everything that goes inside &lt;body&gt; — the heading hierarchy, paragraphs
          versus generic containers, and the semantic landmark elements that turn a page from "div soup"
          into a real, meaningful document.
        </p>
        <Link href="/learn/html-css/text-semantic-structure" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 03 → Text Elements & Semantic Structure
        </Link>
      </div>
    </LearnLayout>
  )
}
