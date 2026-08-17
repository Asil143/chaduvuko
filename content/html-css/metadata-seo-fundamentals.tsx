import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Metadata & SEO Fundamentals — HTML & CSS | Chaduvuko',
  description:
    'meta tags, Open Graph, the viewport meta tag, and favicons — the head content that determines how your page is discovered and shared.',
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

export default function MetadataSeoFundamentals() {
  return (
    <LearnLayout
      title="Metadata & SEO Fundamentals"
      description="meta tags, Open Graph, the viewport meta tag, and favicons — the head content that determines how your page is discovered and shared."
      section="HTML & CSS — Module 13"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why the head Matters" />
        <SectionTitle>The head Element Is Where Discoverability Lives</SectionTitle>

        <Para>
          Everything a visitor sees renders inside <code>&lt;body&gt;</code>. But before a browser ever
          paints a single pixel of that body, it reads through <code>&lt;head&gt;</code> — and so does
          every search engine crawler, every social platform&apos;s link-preview bot, and every browser
          tab. The head is metadata about the page, not content of the page. Get it wrong and the page
          can still render perfectly for a human visitor while being nearly invisible to Google, or
          showing up as a blank grey box when someone pastes your link into Slack or iMessage.
        </Para>

        <Para>
          This module covers the specific head content that most directly controls how your page is{' '}
          <em>found</em> and <em>shared</em>: character encoding and viewport declarations, the meta
          description search engines quote in results, Open Graph tags that power social link previews,
          favicons, the title tag&apos;s outsized SEO weight, and a first look at canonical links. None of
          this affects what a visitor sees on the page itself — all of it affects whether they ever get
          there.
        </Para>

        <CodeBox label="The general shape of a well-formed head">{`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Riverside Pottery Studio — Handmade Ceramics in Austin, TX</title>
  <meta name="description" content="Small-batch handmade pottery and wheel-throwing classes in East Austin. Studio visits by appointment, online shop ships nationwide.">
  <link rel="canonical" href="https://riversidepotteryaustin.com/">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="/icon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:title" content="Riverside Pottery Studio">
  <meta property="og:description" content="Handmade ceramics and wheel-throwing classes in East Austin.">
  <meta property="og:image" content="https://riversidepotteryaustin.com/og-cover.jpg">
  <meta property="og:type" content="website">
</head>`}</CodeBox>

        <Callout type="info">
          None of these tags are visible on the rendered page. If you delete every line above except{' '}
          <code>&lt;title&gt;</code>, the page still looks identical in the browser window — but it
          becomes far harder to find, ranks worse, and looks broken when shared. The head is invisible
          infrastructure, which is exactly why it is so easy to neglect.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — charset and viewport" />
        <SectionTitle>The Two meta Tags Every Page Needs Before Anything Else</SectionTitle>

        <Para>
          You met <code>&lt;meta charset="UTF-8"&gt;</code> briefly back in the Document Structure
          module — it belongs here too because it is, strictly speaking, metadata about the document, and
          it is worth re-grounding exactly why it must be the very first thing inside{' '}
          <code>&lt;head&gt;</code>.
        </Para>

        <CodeBox label="charset must come first">{`<head>
  <meta charset="UTF-8">
  <!-- everything else follows -->
</head>`}</CodeBox>

        <Para>
          Browsers read a fixed number of bytes from the start of a document before deciding how to
          interpret the rest of the byte stream as characters. If <code>charset</code> appears after
          other content that includes a non-ASCII character — an accented letter, a curly quote, an
          emoji — the browser may have already guessed the wrong encoding for that earlier content and
          rendered it as garbled text (the classic "mojibake" you've likely seen as strings like{' '}
          <code>â€™</code> where an apostrophe should be). Declaring <code>UTF-8</code> first, before any
          other head content, removes the guessing entirely.
        </Para>

        <SubTitle>The viewport meta tag — required for any page that should work on a phone</SubTitle>

        <Para>
          Without a viewport declaration, mobile browsers render the page at a fixed desktop-width
          "virtual viewport" — typically 980px — and then shrink the entire rendered page down to fit the
          phone&apos;s actual screen. The page technically loads, but every line of text is
          microscopic, and the user has to pinch-zoom to read anything. This single tag turns that off.
        </Para>

        <CodeBox label="The viewport meta tag">{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}</CodeBox>

        <Para>
          <code>width=device-width</code> tells the browser to set the viewport width to the actual
          device screen width, rather than the 980px desktop default. <code>initial-scale=1.0</code>{' '}
          sets the initial zoom level to 100% — no pre-applied shrinking. Together, these two directives
          are what let your CSS media queries (covered in depth in the CSS Layout phase of this track)
          actually respond to real device widths instead of a fictional 980px canvas.
        </Para>

        <Callout type="warning">
          <strong>Do not add <code>maximum-scale=1.0, user-scalable=no</code> to disable pinch-zoom.</strong>{' '}
          It was common advice years ago to "lock" the viewport this way, but it is now a well-documented
          accessibility failure — it prevents low-vision users from zooming in to read your content at
          all, and WCAG explicitly calls this out as a violation. Ship <code>width=device-width,
          initial-scale=1.0</code> and stop there.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — title and meta description" />
        <SectionTitle>title and meta description — What Actually Shows Up in Google</SectionTitle>

        <Para>
          These two tags are the ones most directly responsible for how your page looks in search
          results — the blue clickable headline and the grey summary text underneath it.
        </Para>

        <CodeBox label="The two SEO-critical tags">{`<title>Riverside Pottery Studio — Handmade Ceramics in Austin, TX</title>
<meta name="description" content="Small-batch handmade pottery and wheel-throwing classes in East Austin. Studio visits by appointment, online shop ships nationwide.">`}</CodeBox>

        <Para>
          <code>&lt;title&gt;</code> is, by a wide margin, the single most heavily weighted on-page SEO
          signal available to you. Search engines use it both to understand what the page is about and
          as the literal blue link text shown in results. It also becomes the browser tab label and the
          default text when someone bookmarks the page. Good titles are specific, front-load the most
          important keyword, and stay under roughly 60 characters — longer titles get truncated with an
          ellipsis in Google&apos;s results, which looks unpolished and can cut off the exact phrase a
          user was searching for.
        </Para>

        <CodeBox label="Weak title vs. specific title">{`<!-- Weak — generic, no location, no differentiation from thousands of other "Home" pages -->
<title>Home</title>

<!-- Specific — states what the business is, what it does, and where -->
<title>Riverside Pottery Studio — Handmade Ceramics in Austin, TX</title>`}</CodeBox>

        <Para>
          <code>meta description</code> is different in an important way: it has essentially{' '}
          <strong>zero</strong> direct effect on search ranking. Google has confirmed this repeatedly.
          What it does control is the summary snippet shown under your title in search results — and
          that snippet is what drives whether a person actually clicks your result over the nine others
          on the page. A vague or missing description means Google will auto-generate a snippet by
          pulling text from your page body, which is often an awkward, out-of-context sentence fragment.
          Aim for roughly 150–160 characters — a genuine, compelling one or two sentences, not a list of
          keywords crammed together.
        </Para>

        <Callout type="tip">
          <strong>Every page needs its own unique title and description.</strong> A common early mistake
          is copy-pasting the same <code>&lt;title&gt;</code> across every page of a multi-page site.
          Search engines treat this as a signal the pages are low-value duplicates of each other, and it
          actively hurts every page&apos;s individual ranking. Each page&apos;s title should describe{' '}
          <em>that specific page</em>, not the site as a whole.
        </Callout>

        <SubTitle>Keyword stuffing — an old technique that now actively backfires</SubTitle>

        <Para>
          Search engines in the early 2000s were relatively naive about keyword matching, which led to a
          now-notorious practice of cramming a title or description with repeated keyword variations.
          Modern search engines penalize this outright.
        </Para>

        <CodeBox label="Keyword stuffing — actively penalized today, not just unhelpful">{`<!-- Do not do this -->
<title>Pottery Austin Pottery Classes Austin Pottery Studio Handmade Pottery Austin TX</title>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Open Graph Tags" />
        <SectionTitle>Open Graph — Controlling How Your Link Looks When Shared</SectionTitle>

        <Para>
          Paste a link into iMessage, Slack, X, LinkedIn, or Facebook and you get a rich preview card — a
          headline, a short description, and usually an image. That card is not generated from your page
          content by guesswork; it is built almost entirely from a set of meta tags called{' '}
          <strong>Open Graph</strong> tags, originally created by Facebook and now a de facto standard
          every major platform reads.
        </Para>

        <CodeBox label="The four Open Graph tags nearly every page should have">{`<meta property="og:title" content="Riverside Pottery Studio">
<meta property="og:description" content="Handmade ceramics and wheel-throwing classes in East Austin. Studio visits by appointment.">
<meta property="og:image" content="https://riversidepotteryaustin.com/og-cover.jpg">
<meta property="og:type" content="website">`}</CodeBox>

        <Para>
          Notice these use <code>property</code>, not <code>name</code> — a genuinely easy detail to get
          wrong, since every other meta tag in this module uses <code>name</code>. Open Graph tags are
          technically part of a separate metadata protocol (RDFa) that Facebook adopted, and{' '}
          <code>property</code> is the attribute that protocol expects. Using <code>name="og:title"</code>{' '}
          instead of <code>property="og:title"</code> is a mistake that will not raise any visible error
          — the tag simply gets silently ignored by every platform that reads Open Graph data.
        </Para>

        <SubTitle>og:image — the tag most worth getting right</SubTitle>

        <Para>
          A missing or broken <code>og:image</code> is the single most common reason a shared link looks
          unfinished — most platforms will still show a card, but with a generic grey placeholder instead
          of your actual image, which reads as broken or untrustworthy to whoever receives the link.
        </Para>

        <CodeBox label="og:image requirements that actually matter in practice">{`<meta property="og:image" content="https://riversidepotteryaustin.com/og-cover.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">`}</CodeBox>

        <Para>
          Three practical rules for <code>og:image</code>: the URL must be <strong>absolute</strong>{' '}
          (starting with <code>https://</code>), not a relative path — most crawlers will not resolve a
          relative image path against your domain the way a browser does. The image should be roughly a
          1200×630 aspect ratio, which is the size nearly every platform crops to. And it must be
          publicly reachable without authentication — a crawler cannot log in to fetch an image sitting
          behind your app&apos;s auth wall.
        </Para>

        <SubTitle>Twitter/X Card tags — a small, optional addition</SubTitle>

        <Para>
          X (formerly Twitter) historically used its own separate tag namespace before largely falling
          back to reading Open Graph tags as well. Adding these two is low-effort and gives you an extra
          layer of control over how the card renders there specifically.
        </Para>

        <CodeBox label="Twitter Card tags — layered on top of Open Graph, not a replacement for it">{`<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Riverside Pottery Studio">
<meta name="twitter:description" content="Handmade ceramics and wheel-throwing classes in East Austin.">
<meta name="twitter:image" content="https://riversidepotteryaustin.com/og-cover.jpg">`}</CodeBox>

        <Callout type="tip">
          <strong>Test with a real validator, not just eyeballing the tags.</strong> Facebook&apos;s
          Sharing Debugger and LinkedIn&apos;s Post Inspector both let you paste a URL and see exactly
          what card they will render, including catching stale cached previews — platforms cache Open
          Graph data aggressively, so a fixed <code>og:image</code> often will not show up in a real
          share until you force a re-scrape through one of these tools.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Favicons" />
        <SectionTitle>Favicons — More Formats Than You&apos;d Expect, for Good Reason</SectionTitle>

        <Para>
          A favicon is the small icon shown in a browser tab, bookmark list, and (on mobile) as the
          home-screen icon when a user "adds to home screen." A single <code>favicon.ico</code> file used
          to be enough, but modern devices expect several sizes and formats, each serving a different
          surface.
        </Para>

        <CodeBox label="A modern, complete favicon setup">{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</CodeBox>

        <Para>
          Each line covers a different situation. <code>favicon.ico</code> is the long-standing fallback
          that essentially every browser will find automatically even with zero <code>&lt;link&gt;</code>{' '}
          tags at all, simply by requesting <code>/favicon.ico</code> from the site root — but relying on
          that alone means missing every modern surface below. The SVG variant scales cleanly to any
          size and is increasingly the preferred modern format, since one file replaces several PNG
          sizes. The 32×32 and 16×16 PNGs cover browser tabs and bookmark bars at their traditional
          pixel sizes on displays that do not support SVG favicons. <code>apple-touch-icon</code> is
          specifically what iOS uses when a user adds the page to their home screen — without it, iOS
          falls back to taking an ugly auto-generated screenshot of the page as the icon instead.
        </Para>

        <SubTitle>The web manifest — PWA-adjacent, but relevant here</SubTitle>

        <Para>
          <code>site.webmanifest</code> is a small JSON file that (among other things used for
          full Progressive Web App behavior, out of scope for this module) declares additional icon
          sizes Android uses for home-screen shortcuts and splash screens.
        </Para>

        <CodeBox label="A minimal site.webmanifest">{`{
  "name": "Riverside Pottery Studio",
  "short_name": "Riverside Pottery",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#7b61ff",
  "background_color": "#ffffff",
  "display": "standalone"
}`}</CodeBox>

        <Callout type="info">
          You do not need to hand-generate every one of these sizes yourself. Tools like{' '}
          <code>realfavicongenerator.net</code> take a single source image and output the entire set —
          every PNG size, the ICO, the manifest, and the exact <code>&lt;link&gt;</code> tags to paste
          into your head — in one pass. Most real projects use a generator rather than exporting each
          size manually.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Canonical Links" />
        <SectionTitle>The Canonical Link — A Brief, Necessary Preview</SectionTitle>

        <Para>
          It is common for the same content to be reachable at more than one URL — with and without a
          trailing slash, with tracking query parameters appended, or via both <code>http</code> and{' '}
          <code>https</code> during a migration. Search engines treat each distinct URL as a potentially
          separate page unless told otherwise, which can split ranking signals across duplicates instead
          of consolidating them onto one authoritative page.
        </Para>

        <CodeBox label="A canonical link tag">{`<link rel="canonical" href="https://riversidepotteryaustin.com/classes">`}</CodeBox>

        <Para>
          This single line tells search engines: "no matter which URL variant a crawler found this
          content at, treat this exact URL as the single authoritative version, and consolidate ranking
          credit there." It is especially important for pages reachable through multiple query-string
          combinations — a product page reachable as both{' '}
          <code>/shop/mug?ref=newsletter</code> and plain <code>/shop/mug</code> should canonicalize to
          the plain URL, so search engines don&apos;t treat the tracked link as a separate, competing
          page.
        </Para>

        <Callout type="info">
          Canonical URLs get their own full treatment later in the track, alongside broader technical SEO
          topics like structured data and sitemaps. For now, the rule to internalize is simple: every
          indexable page should have exactly one <code>&lt;link rel="canonical"&gt;</code> pointing at
          its own preferred, absolute URL — including pages that are already at their canonical URL,
          which should self-reference.
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
        <SectionTitle>A Marketing Launch at a Denver DTC Furniture Startup Goes Sideways</SectionTitle>

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
            Scenario — DTC furniture startup, Denver · Product launch day
          </div>

          <Para>
            A Denver-based direct-to-consumer furniture company builds a landing page for a new sofa
            line and schedules a coordinated Instagram, email, and paid-social push for launch morning.
            The front-end engineer ships the page a day early, QAs it in a browser, and confirms it looks
            correct. Nobody opens DevTools to check the <code>&lt;head&gt;</code> — the marketing team
            assumes that's covered, the engineer assumes marketing will flag anything missing.
          </Para>

          <SubSubTitle>What goes wrong at 9am on launch day</SubSubTitle>

          <Para>
            The paid social ads go live first. Every single ad preview and every organic Instagram Story
            link sticker shows the same thing: a grey placeholder box where the sofa photo should be, and
            the fallback text "riversidefurnitureco.com" instead of the product name. The marketing lead
            pastes the URL into Slack to double check — same grey box there too. By the time someone
            traces it to a missing <code>og:image</code> tag, roughly 40 minutes of paid spend has run
            against ads showing a broken-looking preview card, and several hundred organic story views
            already saw the same thing with no way to fix what already rendered on a viewer&apos;s phone.
          </Para>

          <CodeBox label="What was actually in the page's head">{`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aurora Sofa — Riverside Furniture Co.</title>
  <meta name="description" content="The Aurora sofa. Modular, machine-washable covers, ships flat-packed.">
  <!-- no og:title, no og:description, no og:image at all -->
</head>`}</CodeBox>

          <SubSubTitle>The fix, and the process change that followed</SubSubTitle>

          <Para>
            The immediate fix is a two-line deploy — adding <code>og:title</code>,{' '}
            <code>og:description</code>, and an absolute <code>og:image</code> URL pointing at a properly
            sized 1200×630 product photo. But the fix arrives too late to matter for the ads that already
            ran and the story views already spent. The team&apos;s actual takeaway is procedural: every
            landing page destined for a paid or social push now gets pasted into Facebook&apos;s Sharing
            Debugger as a required step in the pre-launch checklist, specifically because a page can look
            completely correct in a normal browser tab while being entirely unshareable — the browser
            never renders Open Graph tags, so nothing about visually QA-ing the page would ever have
            caught this.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Metadata and SEO</SectionTitle>

        {[
          {
            wrong: '"meta description affects how high a page ranks in search results"',
            right: 'Google has repeatedly confirmed meta description is not a ranking factor. What it does control is the snippet text shown under your title in results, which drives click-through rate — a page can rank #1 with a poor description and still get fewer clicks than a #3 result with a compelling one.',
          },
          {
            wrong: '"Open Graph tags use name=, just like every other meta tag"',
            right: 'Open Graph tags use property=, not name= — a leftover from the RDFa metadata protocol Facebook built them on. Writing name="og:title" is a silent failure: no error is thrown, the tag is simply ignored by every platform reading Open Graph data.',
          },
          {
            wrong: '"One favicon.ico file in the site root is all a modern site needs"',
            right: 'A root favicon.ico is a fallback every browser will find automatically, but it does not cover Apple touch icons for iOS home-screen shortcuts, Android manifest icons, or crisp rendering on high-density displays. A complete setup includes several sizes and formats, each serving a different surface.',
          },
          {
            wrong: '"Keyword-stuffing the title tag with variations of your main keyword helps ranking"',
            right: 'This was a viable tactic on early-2000s search engines and is now actively penalized. Modern search algorithms treat repetitive, unnatural keyword repetition as a spam signal. A specific, naturally written, human-readable title outperforms a keyword list.',
          },
          {
            wrong: '"Fixing og:image and re-deploying immediately fixes a broken social preview"',
            right: 'Platforms cache Open Graph data aggressively per-URL. A fixed tag often will not show up in a real share until the platform is forced to re-scrape the page — usually through a tool like Facebook\'s Sharing Debugger or LinkedIn\'s Post Inspector, not just by waiting.',
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
            q: 'Why must the charset meta tag appear as early as possible in the head?',
            a: 'Browsers read a limited number of bytes from the start of a document before deciding how to decode the rest of the character stream. If non-ASCII characters (accented letters, curly quotes, emoji) appear before the charset declaration, the browser may already have guessed the wrong encoding and rendered that earlier content as garbled "mojibake" text. Declaring UTF-8 as the very first thing in the head removes the ambiguity entirely.',
          },
          {
            q: 'Does the meta description tag affect search ranking? What does it actually control?',
            a: 'No — Google has confirmed it is not a ranking signal. It controls the snippet text displayed under the title in search results, which directly affects click-through rate. A well-written description can meaningfully increase clicks on a page that already ranks well, but it will not move the page higher in results.',
          },
          {
            q: 'What attribute do Open Graph tags use, and why is it different from other meta tags?',
            a: 'property, not name. Open Graph is built on the RDFa metadata protocol rather than the standard HTML meta tag convention, and platforms reading Open Graph data specifically look for the property attribute. Using name="og:title" instead of property="og:title" fails silently — no error, the tag is just ignored.',
          },
          {
            q: 'Why does a shared link sometimes show a stale preview image even after you\'ve fixed og:image and redeployed?',
            a: 'Social platforms cache scraped Open Graph data per URL, often for a long period. The fix is live on your server, but the platform is still serving its cached snapshot of the old tags. Forcing a re-scrape — through Facebook\'s Sharing Debugger, LinkedIn\'s Post Inspector, or a similar tool — is usually required to see the update reflected in a real share.',
          },
          {
            q: 'What problem does a canonical link tag solve?',
            a: 'It tells search engines which URL is the single authoritative version of a page when the same content is reachable at multiple URLs — with or without a trailing slash, with different query parameters, across an http/https migration, and so on. Without it, ranking signals for genuinely identical content can be split across what search engines treat as separate, competing pages.',
          },
          {
            q: 'Why do modern sites ship several favicon sizes and formats instead of a single favicon.ico?',
            a: 'Different surfaces read different files: browser tabs typically use small PNGs or an SVG, iOS home-screen shortcuts specifically look for apple-touch-icon, and Android reads icon sizes declared in the web manifest for home-screen shortcuts and splash screens. favicon.ico alone is a universal fallback but leaves those modern surfaces either missing an icon or falling back to an unattractive auto-generated one.',
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
        <SectionTitle>Metadata Mistakes Teams Make Constantly</SectionTitle>

        <SubSubTitle>Mistake: using a relative path for og:image</SubSubTitle>
        <CodeBox label="Broken — most crawlers will not resolve this against your domain">{`<meta property="og:image" content="/images/og-cover.jpg">`}</CodeBox>
        <CodeBox label="Fixed — always an absolute URL">{`<meta property="og:image" content="https://riversidepotteryaustin.com/images/og-cover.jpg">`}</CodeBox>

        <SubSubTitle>Mistake: the same title tag copy-pasted across every page</SubSubTitle>
        <CodeBox label="Broken — every page on the site looks like this">{`<title>Riverside Furniture Co.</title>`}</CodeBox>
        <CodeBox label="Fixed — each page's title describes that specific page">{`<title>Aurora Sofa — Modular, Machine-Washable — Riverside Furniture Co.</title>
<title>Shipping & Returns — Riverside Furniture Co.</title>
<title>About Us — Riverside Furniture Co.</title>`}</CodeBox>

        <SubSubTitle>Mistake: locking the viewport to block pinch-zoom</SubSubTitle>
        <CodeBox label="Broken — an accessibility failure, not a feature">{`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`}</CodeBox>
        <CodeBox label="Fixed — let users zoom">{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}</CodeBox>

        <SubSubTitle>Mistake: using name= instead of property= for Open Graph tags</SubSubTitle>
        <CodeBox label="Broken — silently ignored by every platform, no error thrown">{`<meta name="og:title" content="Aurora Sofa">`}</CodeBox>
        <CodeBox label="Fixed">{`<meta property="og:title" content="Aurora Sofa">`}</CodeBox>

        <SubSubTitle>Mistake: forgetting apple-touch-icon</SubSubTitle>
        <CodeBox label="Broken — iOS falls back to an ugly auto-generated page screenshot as the home-screen icon">{`<link rel="icon" href="/favicon.ico">`}</CodeBox>
        <CodeBox label="Fixed — iOS gets a real, designed icon">{`<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}</CodeBox>
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Bugs This Topic Produces — And Exactly Why</SectionTitle>

        {[
          {
            error: `Social share shows a grey placeholder box instead of your image`,
            cause: 'og:image is missing entirely, uses a relative path instead of an absolute URL, points at an image behind an authentication wall, or the image failed to load when the platform last scraped the page.',
            fix: 'Confirm the tag exists, uses a full https:// URL, is publicly reachable with no login required, and re-scrape the URL through Facebook\'s Sharing Debugger or LinkedIn\'s Post Inspector after fixing it — the cached preview will not update on its own.',
          },
          {
            error: `Garbled characters like â€™ or Ã© appearing in rendered text`,
            cause: 'A character-encoding mismatch — either the charset meta tag is missing, placed too late in the head (after other content already forced an encoding guess), or does not match the actual encoding the file was saved in.',
            fix: 'Declare <meta charset="UTF-8"> as the very first line inside <head>, and confirm your text editor / build pipeline is actually saving files as UTF-8, not a different encoding like Windows-1252.',
          },
          {
            error: `Page text is tiny and requires pinch-zooming to read on a phone`,
            cause: 'The viewport meta tag is missing entirely, so the mobile browser renders the page at its default desktop-width virtual viewport (commonly 980px) and shrinks the whole thing to fit the screen.',
            fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> to the head.',
          },
          {
            error: `Google Search Console reports "Duplicate, Google chose different canonical than user"`,
            cause: 'The same content is reachable at multiple URLs (with/without trailing slash, different query parameters, http vs https) with no canonical tag telling search engines which one is authoritative, so Google picked one on its own — possibly not the one you intended.',
            fix: 'Add a <link rel="canonical" href="..."> pointing at your preferred absolute URL on every indexable page, including self-referencing canonicals on pages already at their preferred URL.',
          },
          {
            error: `iOS home-screen icon shows an ugly auto-cropped screenshot of the page instead of your logo`,
            cause: 'No apple-touch-icon link tag is present, so iOS falls back to generating its own icon from a screenshot of the rendered page.',
            fix: 'Add <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"> pointing at a real 180×180 PNG.',
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
        'meta charset must be the very first line inside <head> — declaring it late risks the browser already having guessed the wrong encoding for earlier content.',
        'The viewport meta tag (width=device-width, initial-scale=1.0) is required for a page to render at real device widths on mobile instead of a shrunk-down 980px desktop layout. Never disable pinch-zoom.',
        'The <title> tag is the single most heavily weighted on-page SEO signal; meta description does not affect ranking but directly drives click-through rate from search results.',
        'Every page should have its own unique, specific title and description — duplicated titles across pages read as low-value duplicate content to search engines.',
        'Open Graph tags use property=, not name= — using name= fails silently with no error, and the tag is simply ignored by every platform.',
        'og:image must be an absolute URL, publicly reachable without authentication, and ideally sized around 1200×630 — a broken or missing one is the most common cause of an unshareable-looking link.',
        'Social platforms cache Open Graph data aggressively; a fix will not show up in a real share until forced through a re-scrape tool like Facebook\'s Sharing Debugger.',
        'A modern favicon setup needs more than one file: an .ico fallback, PNGs for standard browser display, apple-touch-icon for iOS home screens, and manifest icons for Android.',
        'A canonical link tag tells search engines which URL is authoritative when the same content is reachable at multiple URLs, consolidating ranking signals onto one page.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 14 covers HTML entities and special characters — why & and &lt; need escaping in text
          content, the entities you will actually use day to day, and exactly what breaks when you forget.
        </p>
        <Link href="/learn/html-css/html-entities-special-characters" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 14 → HTML Entities & Special Characters
        </Link>
      </div>
    </LearnLayout>
  )
}
