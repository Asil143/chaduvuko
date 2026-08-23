import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Links and Navigation | Chaduvuko',
  description:
    'The anchor tag in full — relative vs absolute paths, targets, anchor links within a page, and building real navigation.',
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

export default function LinksNavigation() {
  return (
    <LearnLayout
      title="Links and Navigation"
      description="The anchor tag in full — relative vs absolute paths, targets, anchor links within a page, and building real navigation."
      section="HTML & CSS — Module 04"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Anchor Tag" />
        <SectionTitle>&lt;a&gt; — The Element the Entire Web Is Built On</SectionTitle>

        <Para>
          The anchor tag, <code>&lt;a&gt;</code>, is what turns "documents" into "the web" — a network of
          pages connected to each other by clickable links. Its one required piece is the{' '}
          <code>href</code> attribute (short for "hypertext reference"), which tells the browser where the
          link should actually go.
        </Para>

        <CodeBox label="The most basic link">{`<a href="/about">About us</a>`}</CodeBox>

        <Para>
          Everything between the opening and closing <code>&lt;a&gt;</code> tags becomes clickable — that
          can be plain text, as above, but it can just as easily be an image, a heading, or an entire card
          made of several nested elements, as long as the nesting rules HTML allows are respected.
        </Para>

        <CodeBox label="A link wrapping more than plain text">{`<a href="/products/trail-runner-gtx" class="product-card">
  <img src="/img/trail-runner.jpg" alt="Trail Runner GTX hiking shoe">
  <h3>Trail Runner GTX</h3>
  <p>$139</p>
</a>`}</CodeBox>

        <Callout type="tip">
          A genuinely important habit: <strong>never build a "clickable" element out of a{' '}
          <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> with a click handler attached in
          JavaScript when a real <code>&lt;a href&gt;</code> would do the job.</strong> A real anchor gets
          keyboard focus automatically, supports "open in new tab" and "copy link address" from a right
          click, and is announced correctly by screen readers — all for free, with zero extra code. A{' '}
          <code>&lt;div&gt;</code> pretending to be a link gets none of that unless you manually rebuild
          it yourself, and most homegrown attempts to do so are incomplete.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — href Value Types" />
        <SectionTitle>Absolute, Relative, Root-Relative, and Protocol-Relative — Every href Format</SectionTitle>

        <Para>
          The value you put inside <code>href</code> can take several different forms, and each one is
          resolved by the browser differently. Getting comfortable telling them apart on sight is a
          genuinely practical skill — it is the difference between a link that correctly follows a site
          wherever it moves and one that silently breaks the moment a folder gets renamed.
        </Para>

        <CodeBox label="Absolute URL — the complete address, works from anywhere">{`<a href="https://chaduvuko.com/learn/html-css">HTML & CSS Track</a>
<!-- Full protocol + domain + path. Always points to the exact same
     place, no matter what page this link is written on. Required for
     linking to a DIFFERENT site than the one you're currently on. -->`}</CodeBox>

        <CodeBox label="Relative URL — resolved against the CURRENT page's location">{`<!-- If the current page is /learn/html-css/links-navigation -->
<a href="images-media">Next lesson</a>
<!-- Resolves to /learn/html-css/images-media — relative to the
     CURRENT folder, not the site root. -->

<a href="../python/control-flow">A page in a sibling folder</a>
<!-- ../ steps up one folder level, exactly like a file system path -->`}</CodeBox>

        <CodeBox label="Root-relative URL — resolved against the SITE root, regardless of current page">{`<a href="/learn/html-css/images-media">Next lesson</a>
<!-- The leading / means "start from the site's root domain," no
     matter which folder the current page happens to live in. This is
     the most common, and generally safest, choice for internal links
     on a real site — it does not break if the current page moves to
     a different folder later. -->`}</CodeBox>

        <CodeBox label="Protocol-relative URL — matches whatever protocol the CURRENT page used">{`<a href="//cdn.example.com/library.js">Some external resource</a>
<!-- No "https:" at all — the browser automatically uses whatever
     protocol (http or https) the current page was loaded with. Once
     common for CDN links; largely obsolete now that essentially every
     site is served over HTTPS exclusively, but you will still see it
     in older codebases and it's worth recognizing on sight. -->`}</CodeBox>

        <Para>
          For links within your own site, root-relative (<code>/path/to/page</code>) is generally the
          most reliable everyday default — it survives the current page moving to a different folder,
          unlike a plain relative link, and it does not hardcode a specific domain the way an absolute URL
          does, which matters when the same codebase runs on a local dev server, a staging environment,
          and production, each with a different domain.
        </Para>

        <Callout type="warning">
          <strong>A genuinely common bug:</strong> writing a relative link like{' '}
          <code>href=&quot;about&quot;</code> on a page whose own URL has a trailing slash difference than
          expected. Because relative URLs resolve against the current page&apos;s exact folder, a link
          that works correctly from <code>/products/</code> can resolve to entirely the wrong path from{' '}
          <code>/products</code> (no trailing slash) — the two look almost identical but resolve
          differently. Root-relative links sidestep this whole category of bug, since they never depend on
          the current page&apos;s own path at all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — target=&quot;_blank&quot;" />
        <SectionTitle>Opening Links in a New Tab — And the Security Hole It Can Quietly Open</SectionTitle>

        <Para>
          The <code>target</code> attribute controls where a link opens. <code>target=&quot;_blank&quot;</code>{' '}
          is by far the most common value you will use, opening the link in a new tab or window instead of
          navigating the current one.
        </Para>

        <CodeBox label="Opening a link in a new tab">{`<a href="https://example.com" target="_blank">External site</a>`}</CodeBox>

        <Para>
          On its own, this line has a real, well-documented security implication that is easy to miss
          entirely: the page that opens in the new tab is, by default, given a live JavaScript reference
          back to the page that opened it, through <code>window.opener</code>. A malicious destination
          page can use that reference to silently redirect the <em>original</em> tab — the one still
          showing your site — to a phishing page, all while its own new tab looks completely normal to the
          user. This is a real attack pattern with a name: <strong>tabnabbing</strong>.
        </Para>

        <CodeBox label="The fix — always pair target='_blank' with rel">{`<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External site
</a>`}</CodeBox>

        <Para>
          <code>rel=&quot;noopener&quot;</code> is the part that actually closes the hole — it prevents the
          new page from getting that <code>window.opener</code> reference back to your page at all.{' '}
          <code>noreferrer</code> goes one step further and also stops the browser from sending your
          page&apos;s URL in the <code>Referer</code> header of the request to the new page, which some
          teams prefer for privacy reasons on top of the security fix. Modern browsers have quietly started
          applying <code>noopener</code> behavior to <code>target=&quot;_blank&quot;</code> links
          automatically in some cases — but relying on that default rather than writing{' '}
          <code>rel</code> explicitly is not a safe practice to build a habit around, since it is not
          guaranteed or consistent across every browser and context.
        </Para>

        <Callout type="warning">
          <strong>Treat <code>target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;</code> as one
          inseparable unit</strong> whenever you link to a page you do not fully control — this comes up
          constantly in real code review, and is one of the most commonly flagged security issues in
          front-end pull requests specifically because it is so easy to write the <code>target</code>{' '}
          half and simply forget the <code>rel</code> half.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — In-Page Anchor Links" />
        <SectionTitle>Linking to a Specific Point Within a Page — id Targets</SectionTitle>

        <Para>
          A link can point at a specific location within a page, not just at another page entirely, by
          referencing an element&apos;s <code>id</code> attribute with a <code>#</code> prefix. This is
          exactly how "back to top" links and a table of contents that jumps to the right section both
          work.
        </Para>

        <CodeBox label="An in-page anchor link and its target">{`<nav>
  <a href="#pricing">Pricing</a>
  <a href="#faq">FAQ</a>
</nav>

...

<section id="pricing">
  <h2>Pricing</h2>
  ...
</section>

<section id="faq">
  <h2>Frequently Asked Questions</h2>
  ...
</section>`}</CodeBox>

        <Para>
          Clicking <code>&lt;a href=&quot;#pricing&quot;&gt;</code> scrolls the browser directly to the
          element whose <code>id</code> is exactly <code>pricing</code> — no JavaScript required at all,
          this is native browser behavior. You can also link to an anchor on <em>another</em> page by
          combining a path with a fragment: <code>href=&quot;/pricing#faq&quot;</code> navigates to the
          pricing page and then jumps straight to its FAQ section once loaded.
        </Para>

        <CodeBox label="A back-to-top link using a special reserved target">{`<a href="#top">Back to top</a>
<!-- "#" alone (or "#top" when an element with id="top" exists near the
     very start of the page) scrolls all the way to the top of the
     document — a very common footer pattern on long pages. -->`}</CodeBox>

        <Callout type="tip">
          <code>id</code> values must be unique within a page — exactly one element per page can carry any
          given <code>id</code>. Two elements sharing the same <code>id</code> is invalid HTML, and it
          produces genuinely unpredictable results for an anchor link targeting it (usually jumping to
          whichever one the browser happens to find first, which is not something you should rely on).
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — download, mailto, and tel" />
        <SectionTitle>download, mailto:, and tel: — Links That Do Something Other Than Navigate</SectionTitle>

        <Para>
          Not every anchor tag is meant to load another page. Three specific patterns come up constantly in
          real work.
        </Para>

        <CodeBox label="download — force a file to save instead of opening in the browser">{`<a href="/files/pricing-sheet.pdf" download>Download pricing sheet (PDF)</a>

<!-- Give it a specific suggested filename, different from the source file: -->
<a href="/files/pricing-sheet.pdf" download="Trailhead-Pricing-2026.pdf">
  Download pricing sheet
</a>`}</CodeBox>

        <Para>
          Without the <code>download</code> attribute, clicking a link to a PDF or image typically opens it
          directly in the browser tab instead of saving it — exactly the behavior you usually want for a
          normal link, but not what you want for a "download our brochure" button. The{' '}
          <code>download</code> attribute overrides that, forcing a save dialog instead.
        </Para>

        <CodeBox label="mailto: and tel: — links that open other apps entirely">{`<a href="mailto:support@trailheadboots.com">Email support</a>

<a href="mailto:support@trailheadboots.com?subject=Order%20Question&body=Hi%20team,">
  Email us about an order
</a>

<a href="tel:+15125550142">Call (512) 555-0142</a>`}</CodeBox>

        <Para>
          <code>mailto:</code> links open the visitor&apos;s default email client with the "to" field
          pre-filled, and optionally a pre-filled subject and body — note that spaces and special
          characters in those extra query parameters need URL-encoding (<code>%20</code> for a space, as
          shown above). <code>tel:</code> links trigger a phone call on devices that can place one — mobile
          phones directly, and desktop browsers that have a calling app (like FaceTime or a VOIP client)
          configured to handle it.
        </Para>

        <Callout type="info">
          Both <code>mailto:</code> and <code>tel:</code> genuinely matter for mobile users specifically —
          on a phone, tapping a phone number formatted as a real <code>tel:</code> link starts a call with
          zero extra steps, while the same number as plain, unlinked text requires the user to manually
          copy it and switch to their phone app themselves. This is a small addition with an outsized
          effect on real conversion for any business-contact page.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Building a Real Nav Menu" />
        <SectionTitle>Building a Real, Semantic Navigation Menu</SectionTitle>

        <Para>
          Putting everything in this module together: a real navigation menu is a <code>&lt;nav&gt;</code>{' '}
          landmark (from the previous module) containing a <code>&lt;ul&gt;</code> of links — not a row of
          bare <code>&lt;a&gt;</code> tags separated by spaces, and not a row of <code>&lt;div&gt;</code>s.
        </Para>

        <CodeBox label="A complete, correctly structured nav menu">{`<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/shop">Shop</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>`}</CodeBox>

        <Para>
          Wrapping each link in a list item is not just a styling convenience — a list of links is
          announced by screen readers as exactly that, "a list of 4 items," giving a user a clear sense of
          how many navigation options exist before they even start moving through them one at a time. A
          bare row of links with no list structure gives no such count. The{' '}
          <code>aria-label=&quot;Main navigation&quot;</code> attribute is worth adding whenever a page has
          more than one <code>&lt;nav&gt;</code> region (a primary menu and, separately, a footer link
          list, for instance) so that assistive technology can distinguish between them by name rather than
          announcing two unlabeled, identical-sounding "navigation" landmarks.
        </Para>

        <CodeBox label="Marking the current page in the nav — a real, common requirement">{`<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/shop">Shop</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
<!-- aria-current="page" tells assistive tech "this is the page the
     user is currently on" — commonly also targeted by CSS to visually
     highlight the active nav item, e.g. [aria-current="page"] { ... } -->`}</CodeBox>

        <Callout type="tip">
          <code>aria-current=&quot;page&quot;</code> is a genuinely underused, high-value attribute — it
          gives you a single, semantic hook that solves both the accessibility problem (announcing the
          current page to assistive tech) and the visual-styling problem (a CSS attribute selector to
          highlight the active link) at the same time, without needing a separate{' '}
          <code>class=&quot;active&quot;</code> that has to be kept in sync manually.
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
        <SectionTitle>A Security Review Flags a Partner-Links Page at a Miami Fintech Startup</SectionTitle>

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
            Scenario — Fintech startup, Miami · Pre-launch security review
          </div>

          <Para>
            Ahead of a public launch, a Miami fintech startup runs a mandatory third-party security review
            of its marketing site. The review flags a "resources" page listing links out to a dozen
            partner integrations and press mentions — every one of them opening with{' '}
            <code>target=&quot;_blank&quot;</code>, with no <code>rel</code> attribute at all.
          </Para>

          <SubSubTitle>Why this specific finding matters for a fintech company</SubSubTitle>

          <Para>
            The reviewer explains the tabnabbing risk directly: any of those dozen external destinations —
            including ones the company does not fully control, like a press article hosted on a third-party
            news site — could, in principle, use <code>window.opener</code> to silently redirect the
            original Chaduvuko-style marketing tab to a convincing fake login page while the user is
            reading the article in the newly opened tab. For a financial services company specifically,
            where the "original tab" the attacker would be redirecting is exactly the kind of page a user
            might later try to log into, this is treated as a genuine, launch-blocking risk rather than a
            minor code-quality nitpick.
          </Para>

          <CodeBox label="What was flagged, across a dozen links on the page">{`<a href="https://partner-press-site.com/article" target="_blank">
  Read the feature
</a>`}</CodeBox>

          <CodeBox label="The required fix — applied to every external target='_blank' link on the site">{`<a href="https://partner-press-site.com/article"
   target="_blank"
   rel="noopener noreferrer">
  Read the feature
</a>`}</CodeBox>

          <Para>
            The engineering team ships the fix as a global lint rule rather than a one-time manual patch —
            an ESLint rule flagging any <code>target=&quot;_blank&quot;</code> anchor missing{' '}
            <code>rel=&quot;noopener&quot;</code>, so the mistake cannot silently reappear the next time
            someone adds a new external link months later. This is exactly the kind of small, easy-to-miss
            HTML detail that a security review specifically exists to catch before launch, precisely because
            it produces zero visible symptoms during normal QA — the links all "work" perfectly fine from a
            functional testing perspective.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Links and Navigation</SectionTitle>

        {[
          {
            wrong: "\"target='_blank' is a purely cosmetic choice about tab behavior\"",
            right: "Without rel=\"noopener\" alongside it, a target=\"_blank\" link gives the destination page a live JavaScript reference back to the page that opened it — a real security issue known as tabnabbing, not a cosmetic detail.",
          },
          {
            wrong: '"Relative and root-relative links always behave the same way"',
            right: 'A plain relative link (about) resolves against the CURRENT page\'s exact folder and can silently break if that page\'s URL structure changes even slightly (a missing trailing slash, for instance). A root-relative link (/about) always resolves from the site root, regardless of the current page\'s location, making it the more robust everyday default for internal links.',
          },
          {
            wrong: '"A styled div with an onClick handler is just as good as a real anchor tag"',
            right: 'A real <a href> gets keyboard focus, right-click context menu options (open in new tab, copy link), and correct screen-reader announcement automatically. A div-based fake link gets none of that unless it is manually, and usually incompletely, rebuilt with JavaScript.',
          },
          {
            wrong: '"Phone numbers and email addresses on a page don\'t need to be actual links, showing the text is enough"',
            right: 'Plain, unlinked text forces a mobile user to manually copy the number or address and switch apps themselves. A real tel: or mailto: link starts a call or opens an email client in one tap, with a real, measurable effect on contact-page conversion.',
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
            q: 'What security risk does target="_blank" introduce on its own, and how do you fix it?',
            a: 'By default, the page opened via target="_blank" gets a live JavaScript reference back to the opening page through window.opener. A malicious destination could use that reference to silently redirect the original tab to a phishing page — an attack called tabnabbing. The fix is adding rel="noopener noreferrer" alongside target="_blank", which removes that back-reference and, with noreferrer, also suppresses the Referer header sent to the new page.',
          },
          {
            q: 'Explain the difference between a relative, root-relative, and absolute URL in an href.',
            a: 'A relative URL (about) resolves against the current page\'s own folder location, and can break if that page\'s path changes. A root-relative URL (/about) always resolves from the site\'s root domain, regardless of where the current page lives, making it robust to the current page moving. An absolute URL (https://example.com/about) is the complete address including protocol and domain, required when linking to a different site than the current one, and usable but not usually necessary for internal links.',
          },
          {
            q: 'How would you build a link that jumps to a specific section of the current page without any JavaScript?',
            a: 'Give the target element a unique id attribute, then reference it with a fragment in an anchor\'s href, e.g. <a href="#pricing"> linking to <section id="pricing">. Clicking the link scrolls the browser natively to that element with no JavaScript required. The same fragment can be combined with a path (href="/pricing#faq") to jump to an anchor on a different page after navigating there.',
          },
          {
            q: 'Why should a navigation menu be built as a nav element wrapping a ul of links, rather than a row of plain a tags?',
            a: 'nav marks the region as a real, navigable landmark for assistive technology. Wrapping the links in a ul means a screen reader announces the total count of navigation items up front, giving the user a clear sense of the menu\'s scope before moving through it — a bare row of links with no list structure provides no such count. aria-label on the nav also lets assistive tech distinguish between multiple navigation regions on the same page (a primary menu vs. a footer link list, for example).',
          },
          {
            q: 'What does the download attribute on an anchor tag do, and when would you use it over a plain link?',
            a: 'It forces the browser to save the linked file directly instead of opening it in the tab — the default behavior a browser would otherwise apply to a file type it knows how to display, like a PDF or image. It is used for explicit "download this file" actions, such as a downloadable brochure or pricing sheet, and can optionally specify a different suggested filename than the source file\'s actual name.',
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
        <SectionTitle>Link Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using target="_blank" without rel="noopener noreferrer"',
            a: 'This leaves the tabnabbing vulnerability from Part 03 open. Treat the two attributes as a single inseparable unit any time you link to a page you do not fully control.',
          },
          {
            q: 'Writing href="#" as a placeholder for a link with no real destination yet',
            a: 'href="#" navigates to the top of the current page, which can cause an unexpected scroll jump when clicked. If a link genuinely has no destination yet, use href="javascript:void(0)" only as a last resort, or better, reconsider whether the element should be a <button> instead of an <a> — buttons are the correct element for "do something" rather than "go somewhere."',
          },
          {
            q: 'Duplicating the same id value on more than one element to support multiple anchor targets',
            a: 'id values must be unique per page. Duplicate ids produce unpredictable anchor-jump behavior and invalid HTML. Use distinct ids for each target, even if they need similar names.',
          },
          {
            q: 'Building a "link" out of a styled div or span with an onClick handler',
            a: 'This loses keyboard focus, right-click options, and correct screen-reader announcement, all of which a real <a href> element gets automatically. Use a real anchor tag whenever the action is genuinely "navigate somewhere."',
          },
          {
            q: 'Forgetting to URL-encode spaces and special characters in a mailto: subject or body parameter',
            a: 'A raw space or special character in a mailto: query parameter can cause the link to fail silently in some email clients. Encode spaces as %20 and other special characters appropriately.',
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
            error: `A link that works from one page silently goes to the wrong place from another page`,
            cause: 'A relative href (like "about" instead of "/about") resolves against the CURRENT page\'s own folder path — the exact same relative link resolves to a different final destination depending on which page it appears on.',
            fix: 'Use a root-relative path (starting with /) for internal links whenever the same link or component might appear on pages living in different folders.',
          },
          {
            error: `Clicking an in-page anchor link does nothing, or scrolls to the wrong place`,
            cause: 'The href\'s fragment (the part after #) does not exactly match any element\'s id on the page — commonly a typo, a case mismatch (ids are case-sensitive), or the target element\'s id was renamed without updating the link.',
            fix: 'Confirm the id on the target element exactly matches the fragment in the href, character for character, including case.',
          },
          {
            error: `Security review / lint warning: "target='_blank' without rel='noopener'"`,
            cause: 'A link opens in a new tab without the rel attribute that prevents the new page from getting a JavaScript reference back to the opener — the tabnabbing vulnerability covered in Part 03.',
            fix: "Add rel=\"noopener noreferrer\" to every target=\"_blank\" link pointing at a destination you don't fully control.",
          },
          {
            error: `A PDF or image "download" link opens directly in the browser tab instead of saving`,
            cause: 'The anchor tag is missing the download attribute, so the browser falls back to its default behavior of displaying file types it knows how to render, like PDFs and images, directly in the tab.',
            fix: 'Add the download attribute to the anchor tag, optionally with a specific filename: download="Filename.pdf".',
          },
          {
            error: `A mailto: link opens the user's email client with a broken or empty subject/body`,
            cause: 'Spaces or special characters in the subject or body query parameters were not URL-encoded before being placed in the href.',
            fix: 'URL-encode the subject and body values — encode spaces as %20, and encode other reserved characters appropriately.',
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
        'The anchor tag (<a href>) is the foundation of the entire web — prefer it over a styled div/span with a click handler for anything that genuinely navigates somewhere, to get free keyboard focus, right-click options, and screen-reader support.',
        'Relative hrefs resolve against the CURRENT page\'s folder and can break when a page moves. Root-relative hrefs (starting with /) always resolve from the site root and are the safer everyday default for internal links.',
        'target="_blank" without rel="noopener noreferrer" leaves a real security hole (tabnabbing) — the new page can get a JavaScript reference back to the page that opened it. Treat the two attributes as inseparable.',
        'An href fragment (#some-id) scrolls natively to the element with a matching id — no JavaScript required. ids must be unique per page.',
        'download forces a file to save instead of opening in-browser; mailto: and tel: open the user\'s email client or dialer directly, which matters a lot for real mobile conversion.',
        'A real nav menu is a <nav> landmark wrapping a <ul> of links, not a bare row of <a> tags — the list structure gives assistive tech an item count, and aria-current="page" marks the active link for both accessibility and CSS styling.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 05 covers images and media in full — the img tag and why alt text is never optional,
          figure/figcaption, audio and video, the source element, and lazy loading.
        </p>
        <Link href="/learn/html-css/images-media" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 05 → Images and Media
        </Link>
      </div>
    </LearnLayout>
  )
}
