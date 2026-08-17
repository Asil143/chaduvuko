import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Images and Media — HTML & CSS | Chaduvuko',
  description:
    'img, alt text, figure/figcaption, audio, video, and the source element — plus lazy loading and why alt text is never optional.',
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

export default function ImagesMedia() {
  return (
    <LearnLayout
      title="Images and Media"
      description="img, alt text, figure/figcaption, audio, video, and the source element — plus lazy loading and why alt text is never optional."
      section="HTML & CSS — Module 05"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The img Element" />
        <SectionTitle>img — The Two Attributes That Are Never Optional</SectionTitle>

        <Para>
          <code>{`<img>`}</code> is a void element — it has no closing tag and no content between tags,
          because there is nothing for it to wrap. Everything it needs is expressed through attributes.
          Two of those attributes are not decoration, not best practice, not "nice to have" — they are
          the difference between an image that works and one that silently fails: <code>src</code> and{' '}
          <code>alt</code>.
        </Para>

        <CodeBox label="The minimum viable img">{`<img src="/images/dashboard-preview.png" alt="Screenshot of the analytics dashboard showing weekly revenue trends">`}</CodeBox>

        <Para>
          <code>src</code> points the browser at the image file — it follows the exact same
          relative-vs-absolute path rules you already learned for <code>href</code> in the Links and
          Navigation module. <code>alt</code> supplies a text alternative for the image: the words a
          screen reader speaks instead of the picture, the text a browser shows if the image file fails
          to load, and the content search engines actually index, since they cannot "see" pixels.
        </Para>

        <SubTitle>What happens when src points at nothing</SubTitle>

        <Para>
          If the file at <code>src</code> is missing, misspelled, or the server returns a 404, the
          browser does not simply leave a blank space. It renders a small broken-image icon in the space
          the image would have occupied, and — critically — it displays the <code>alt</code> text right
          next to that icon. An image with no <code>alt</code> attribute at all, in this failure case,
          shows nothing but a bare broken icon with zero context for the person looking at the page. This
          is the single most concrete, visible reason <code>alt</code> matters even to someone who has
          never touched a screen reader: it is the fallback content for every image request that fails,
          and image requests fail constantly, in every production application, from typo&apos;d paths to
          expired CDN links to a user on a flaky connection.
        </Para>

        <CodeBox label="A missing image, with and without alt text">{`<!-- No alt: a broken icon, and nothing else, if the file 404s -->
<img src="/images/hero-banner-v2.jpg">

<!-- With alt: the broken icon PLUS readable context -->
<img src="/images/hero-banner-v2.jpg" alt="Team collaborating around a whiteboard in a bright office">`}</CodeBox>

        <Callout type="warning">
          <strong>alt is never optional, even when you think an image is purely visual.</strong> Omitting
          it entirely is different from setting it to an empty string — omitting it is a mistake; setting
          it to <code>{`alt=""`}</code> deliberately is a correct, meaningful choice covered in Part 02.
          Screen readers announce an image with no <code>alt</code> attribute by reading out its filename
          — <code>IMG_4821_final_v3.jpg</code> spoken aloud is worse than useless, and this happens on
          real production sites constantly.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Writing alt Text That Means Something" />
        <SectionTitle>Meaningful alt vs. Decorative alt=&quot;&quot;</SectionTitle>

        <Para>
          Good <code>alt</code> text describes what the image communicates, not what the image literally
          contains. Think about what a sighted user takes away from glancing at the image, and write
          that. A product photo&apos;s job is to show the product — describe the product, not the
          photography.
        </Para>

        <CodeBox label="Weak alt text vs. alt text that actually communicates">{`<!-- Weak: describes the file, not the meaning -->
<img src="/products/sneaker-01.jpg" alt="image">
<img src="/products/sneaker-01.jpg" alt="sneaker-01.jpg">
<img src="/products/sneaker-01.jpg" alt="photo of shoe">

<!-- Meaningful: communicates what a sighted user actually sees -->
<img src="/products/sneaker-01.jpg" alt="Red and white running sneaker, side profile, laces untied">`}</CodeBox>

        <Para>
          The right length depends entirely on context. A product image on an e-commerce grid needs
          enough detail to distinguish it from the next product — color, style, a defining feature. A
          decorative background texture needs no description at all, because it carries no information.
          A chart or infographic needs <code>alt</code> text that summarizes the data trend it shows,
          since a screen reader user cannot visually scan a bar chart the way a sighted user can.
        </Para>

        <SubTitle>Decorative images — when alt=&quot;&quot; is the correct answer</SubTitle>

        <Para>
          Not every image carries meaning. A stock photo used purely as visual filler next to a heading
          that already says everything, a repeating decorative border graphic, an icon that sits right
          next to text that already states its function — these images add nothing a screen reader user
          needs to hear. For these, the correct <code>alt</code> value is an explicitly empty string,{' '}
          <code>{`alt=""`}</code>, never an omitted attribute.
        </Para>

        <CodeBox label="Decorative image — explicitly empty alt">{`<h1>Our Mission</h1>
<img src="/images/abstract-swirl-decoration.svg" alt="">
<p>We help small businesses grow through better tooling.</p>

<!-- The swirl adds nothing informational. alt="" tells screen readers
     to skip it entirely and move straight to the real content. -->`}</CodeBox>

        <Para>
          The distinction matters because a missing <code>alt</code> attribute and an empty one are
          treated completely differently by assistive technology. <code>{`alt=""`}</code> is an
          instruction: "this image is decorative, skip it silently." A missing attribute is treated as
          unlabeled content, and screen readers fall back to announcing the filename or the full image
          URL — exactly the noisy, meaningless output decorative-image handling is supposed to prevent.
        </Para>

        <CodeBox label="An icon button — the label lives on the icon, not next to it">{`<!-- The trash icon IS the button's entire meaning here — it needs real alt text -->
<button>
  <img src="/icons/trash.svg" alt="Delete item">
</button>

<!-- If visible text already labels the action, the icon is decorative -->
<button>
  <img src="/icons/trash.svg" alt="">
  Delete item
</button>`}</CodeBox>

        <Callout type="tip">
          A useful test: cover the image with your hand and read the surrounding page out loud. If
          nothing is lost, the image is decorative — use <code>{`alt=""`}</code>. If information
          disappears, write <code>alt</code> text that replaces exactly what was lost, no more and no
          less.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — width, height, and Layout Shift" />
        <SectionTitle>width and height — Reserving Space Before the Image Loads</SectionTitle>

        <Para>
          Images almost always load slower than the surrounding text — text renders from HTML the browser
          already has, while an image is a separate network request that has to complete first. If the
          browser does not know an image&apos;s dimensions ahead of time, it renders the page with zero
          space reserved for that image, then abruptly shoves everything below it downward the instant
          the image finishes downloading and its real size becomes known. This visible jump is called{' '}
          <strong>layout shift</strong>, and it is measured directly as part of Cumulative Layout Shift
          (CLS) — one of Google&apos;s Core Web Vitals, and a real, measured factor in both user
          experience and search ranking. Full Core Web Vitals coverage comes later, in the Responsive
          Images & Performance module — the piece that matters right now is the fix.
        </Para>

        <CodeBox label="No dimensions — the browser cannot reserve space">{`<img src="/blog/article-hero.jpg" alt="Rows of solar panels on a hillside at sunset">

<!-- The browser has no idea if this is 400px or 4000px tall until the file
     downloads. Everything below it jumps once the real height is known. -->`}</CodeBox>

        <CodeBox label="With width and height — space reserved immediately">{`<img
  src="/blog/article-hero.jpg"
  alt="Rows of solar panels on a hillside at sunset"
  width="1200"
  height="675"
>

<!-- The browser now knows the image's ASPECT RATIO (1200:675) before a single
     byte of the file has downloaded, and reserves exactly that much space. -->`}</CodeBox>

        <Para>
          It is a common misunderstanding that <code>width</code> and <code>height</code> here force the
          image to render at those exact pixel dimensions, breaking responsive layouts. They do not — by
          default, a browser uses the ratio between the two attributes to compute an aspect ratio, then
          lets CSS control the actual rendered size. A responsive image styled with{' '}
          <code>{`img { max-width: 100%; height: auto; }`}</code> (a rule you will use on nearly every
          image in a real project, covered fully once you reach CSS) still scales fluidly — the{' '}
          <code>width</code>/<code>height</code> attributes only supply the ratio the browser reserves
          space with, they do not lock the final rendered size.
        </Para>

        <Callout type="warning">
          <strong>Always set width and height, even on a fully responsive image.</strong> The two
          attributes and fluid CSS are not in conflict — they solve two different problems. The
          attributes stop layout shift before the CSS engine even runs; the CSS controls the final
          responsive size. Skipping the attributes because "the image is responsive anyway" is one of the
          most common, measurable performance mistakes on real production sites.
        </Callout>

        <Para>
          The values you put in <code>width</code> and <code>height</code> should match the image&apos;s
          actual intrinsic aspect ratio (its real pixel dimensions, or a proportional value like{' '}
          1200×675 for a 16:9 image) — not the size you want it to display at. If the ratio is wrong, the
          reserved space itself will be the wrong shape, and you will get a smaller, different kind of
          layout shift once the real image settles into place.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — figure and figcaption" />
        <SectionTitle>figure and figcaption — Grouping Media With Its Caption</SectionTitle>

        <Para>
          <code>{`<figure>`}</code> groups a piece of self-contained content — most often an image, but
          also a code sample, a chart, or a quoted block — together with an optional caption, using{' '}
          <code>{`<figcaption>`}</code>. "Self-contained" is the key idea: the content inside a{' '}
          <code>{`<figure>`}</code> should make sense on its own, referenced from the main text but not
          required to sit in one exact spot within it — like a figure in a printed textbook, which a
          reader can look at before or after the paragraph that mentions it.
        </Para>

        <CodeBox label="A basic figure with a caption">{`<figure>
  <img src="/charts/revenue-q3.png" alt="Bar chart showing Q3 revenue up 34% over Q2">
  <figcaption>Figure 1 — Quarterly revenue, Q1–Q3 2026</figcaption>
</figure>`}</CodeBox>

        <Para>
          The relationship between the two elements is strict in one direction only:{' '}
          <code>{`<figcaption>`}</code> must be a direct child of <code>{`<figure>`}</code> to be
          meaningful (it can be the first or last child, but it has no standing outside a{' '}
          <code>{`<figure>`}</code>), while a <code>{`<figure>`}</code> does not require a caption at
          all — grouping the content alone is already valid and useful.
        </Para>

        <CodeBox label="figure without a caption — still valid, still useful for grouping">{`<figure>
  <img src="/team/photo.jpg" alt="The founding team at the company's first office in 2019">
</figure>`}</CodeBox>

        <SubTitle>figure is not only for images</SubTitle>

        <Para>
          A genuinely common mistake is treating <code>{`<figure>`}</code> as an image-only wrapper.
          Anything that is self-contained and referenceable belongs — a block of example code with a
          caption explaining it, a pull-quote, an embedded video, even a data table.
        </Para>

        <CodeBox label="figure wrapping a code sample, not an image">{`<figure>
  <pre><code>const total = items.reduce((sum, item) => sum + item.price, 0);</code></pre>
  <figcaption>Summing an array of item prices with reduce()</figcaption>
</figure>`}</CodeBox>

        <Callout type="info">
          Reach for <code>{`<figure>`}</code> when a caption belongs <em>to the media</em>, not to the
          surrounding page. A plain paragraph directly below an image is not a caption in any semantic
          sense — <code>{`<figcaption>`}</code> is what makes that relationship explicit to a screen
          reader, which will announce it as the caption for the specific figure it belongs to.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — audio" />
        <SectionTitle>audio — Native Sound Playback, With Format Fallbacks</SectionTitle>

        <Para>
          <code>{`<audio>`}</code> plays sound directly in the browser, with no JavaScript required for
          basic playback. On its own it renders nothing visible or audible — the <code>controls</code>{' '}
          attribute is what tells the browser to draw its built-in play/pause/volume UI.
        </Para>

        <CodeBox label="A basic audio player">{`<audio controls>
  <source src="/podcast/episode-42.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`}</CodeBox>

        <Para>
          Not every browser supports every audio codec identically. Rather than picking one format and
          hoping, the standard pattern is to offer multiple <code>{`<source>`}</code> children, each
          pointing at a different encoded file with its own <code>type</code>. The browser tries each{' '}
          <code>{`<source>`}</code> in order and plays the first one it can actually decode, silently
          skipping any it cannot.
        </Para>

        <CodeBox label="audio with multiple format fallbacks">{`<audio controls>
  <source src="/podcast/episode-42.ogg" type="audio/ogg">
  <source src="/podcast/episode-42.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
  <a href="/podcast/episode-42.mp3">Download the audio file instead.</a>
</audio>`}</CodeBox>

        <Para>
          The plain text (and, here, the fallback download link) between the opening and closing{' '}
          <code>{`<audio>`}</code> tags only renders if the browser supports neither{' '}
          <code>{`<audio>`}</code> itself nor any of the offered sources — an increasingly rare case on
          modern browsers, but still worth including as a genuine accessibility and compatibility
          fallback rather than leaving silent, broken playback controls.
        </Para>

        <Callout type="warning">
          <strong>Browsers block audio from autoplaying with sound.</strong> An{' '}
          <code>{`<audio autoplay>`}</code> element will simply fail to start playback in most modern
          browsers unless the user has already interacted with the page, or the element is also{' '}
          <code>muted</code>. This is a deliberate browser policy, not a bug — covered in more detail in
          Part 06, since the same restriction applies to video.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — video" />
        <SectionTitle>video — controls, poster, and the Same source Fallback Pattern</SectionTitle>

        <Para>
          <code>{`<video>`}</code> works on the same underlying pattern as <code>{`<audio>`}</code> —{' '}
          <code>controls</code> for the built-in playback UI, and one or more <code>{`<source>`}</code>{' '}
          children for format fallbacks — plus a few video-specific attributes that matter for real
          production pages.
        </Para>

        <CodeBox label="A video with format fallbacks, poster image, and reserved dimensions">{`<video controls width="1280" height="720" poster="/videos/demo-thumbnail.jpg">
  <source src="/videos/product-demo.webm" type="video/webm">
  <source src="/videos/product-demo.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>`}</CodeBox>

        <Para>
          <code>poster</code> is an image shown in place of the video before playback starts — without
          it, some browsers show a blank black frame, or the very first frame of the file, which is not
          always a flattering or informative thumbnail. Just like <code>{`<img>`}</code>, a{' '}
          <code>{`<video>`}</code> should carry <code>width</code> and <code>height</code> for the exact
          same layout-shift reasons covered in Part 03 — video files are typically much larger than
          images, so the load delay (and the resulting shift, if space is not reserved) is often more
          noticeable, not less.
        </Para>

        <SubTitle>track — captions and subtitles</SubTitle>

        <Para>
          <code>{`<track>`}</code> attaches a timed text file (captions, subtitles, or descriptions) to
          a video, letting a viewer enable captions through the browser&apos;s native controls. It is a
          void element, placed inside <code>{`<video>`}</code> alongside the <code>{`<source>`}</code>{' '}
          elements.
        </Para>

        <CodeBox label="Adding captions with track">{`<video controls width="1280" height="720">
  <source src="/videos/product-demo.mp4" type="video/mp4">
  <track src="/videos/product-demo.en.vtt" kind="captions" srclang="en" label="English">
</video>`}</CodeBox>

        <Callout type="warning">
          <strong>Autoplay with sound is blocked by every major browser.</strong> A{' '}
          <code>{`<video autoplay>`}</code> tag alone will not play — browsers require the video to also
          be <code>muted</code> for autoplay to be allowed at all, a policy introduced specifically to
          stop sites from blasting sound at users the instant a page loads. The reliable autoplay pattern
          is <code>{`<video autoplay muted loop playsinline>`}</code> — and even then, some browsers and
          some user settings (like reduced-data or reduced-motion preferences) may still block it, so
          autoplaying video should never be the only way critical content reaches a user.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — loading=&quot;lazy&quot;" />
        <SectionTitle>loading=&quot;lazy&quot; — A Brief Preview of Deferred Image Loading</SectionTitle>

        <Para>
          The <code>loading</code> attribute tells the browser when to actually fetch an image&apos;s
          file. Setting it to <code>{`loading="lazy"`}</code> defers loading any image that is not yet
          near the visible viewport — the browser only fetches it once the user scrolls close enough that
          it is about to become visible, instead of downloading every image on the page immediately,
          whether the user ever scrolls that far or not.
        </Para>

        <CodeBox label="Deferring an offscreen image">{`<img
  src="/blog/footer-illustration.png"
  alt="Illustration of a rocket launching, decorative footer graphic"
  width="800"
  height="400"
  loading="lazy"
>`}</CodeBox>

        <Para>
          On a long page — a blog post with a dozen images, or a product listing with a hundred thumbnails
          — this can meaningfully cut how much data loads immediately, and how long the page takes to
          become interactive. It is a single attribute, native to the browser, requiring no JavaScript
          library at all.
        </Para>

        <Callout type="info">
          This module covers <code>loading=&quot;lazy&quot;</code> only as a preview — the full picture
          of responsive, performant images (including <code>srcset</code>, <code>sizes</code>, and the{' '}
          <code>{`<picture>`}</code> element for serving different image files to different screens) is
          covered in complete depth in the Responsive Images & Performance module, later in this track.
          For now, the one rule worth carrying forward: never lazy-load an image that appears above the
          fold (visible without scrolling) — doing so can actually delay the page&apos;s most important
          visual content and hurt, rather than help, perceived load speed.
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
        <SectionTitle>A Lighthouse Audit at an Austin E-Commerce Startup</SectionTitle>

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
            Scenario — E-commerce startup, Austin · Pre-launch performance audit
          </div>

          <Para>
            A five-person startup building a sneaker resale marketplace is a week from launch. A
            front-end contractor runs a Lighthouse audit on the product listing page — a grid of 40
            sneaker thumbnails — as a routine pre-launch check, expecting a clean pass.
          </Para>

          <CodeBox label="A single product card from the listing page, as submitted">{`<div class="product-card">
  <img src="/products/jordan-1-chicago.jpg">
  <h3>Air Jordan 1 Retro High</h3>
  <p>$180</p>
</div>`}</CodeBox>

          <SubSubTitle>What the audit flags</SubSubTitle>

          <Para>
            Two failures, repeated across all 40 cards. First, an accessibility violation: every image
            is missing <code>alt</code> entirely — a screen reader user browsing the grid hears forty
            filenames read aloud, one after another, with zero indication of which sneaker is which.
            Second, a Cumulative Layout Shift score in the "poor" range: none of the images specify{' '}
            <code>width</code> or <code>height</code>, so as each of the 40 thumbnails finishes loading
            at a slightly different moment, the entire grid visibly reflows repeatedly while the page
            settles — exactly the failure mode from Part 03, just multiplied across every card on the
            page at once.
          </Para>

          <CodeBox label="The fix — applied to every product card">{`<div class="product-card">
  <img
    src="/products/jordan-1-chicago.jpg"
    alt="Air Jordan 1 Retro High in the Chicago colorway, red white and black"
    width="600"
    height="600"
    loading="lazy"
  >
  <h3>Air Jordan 1 Retro High</h3>
  <p>$180</p>
</div>`}</CodeBox>

          <Para>
            <code>alt</code> text is templated from each product&apos;s name and colorway — already
            structured data sitting in the database — so no manual writing is needed per product.{' '}
            <code>width</code> and <code>height</code> come from the same source, since every product
            photo is exported at a fixed 600×600 square. <code>loading=&quot;lazy&quot;</code> is added
            everywhere except the first row, which is visible without scrolling on a typical viewport and
            should load immediately. The re-run audit shows CLS drop from 0.34 (poor) to 0.02 (good), and
            the accessibility score goes from 61 to 100 — a single templated fix across a component used
            forty times on one page, and on every future page that reuses the same product card.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Images and Media</SectionTitle>

        {[
          {
            wrong: '"alt text is only for screen reader users, so it doesn\'t matter much"',
            right: 'alt text is also what renders when an image fails to load, what search engines index for image search, and what a text-only browser or a slow connection with images disabled shows in place of the picture. Screen reader users are one audience among several who depend on it.',
          },
          {
            wrong: '"Setting width and height on an image locks it to that exact pixel size and breaks responsive design"',
            right: 'By default the browser uses the two values only to compute an aspect ratio for reserving space — the actual rendered size is still controlled by CSS. A responsive rule like img { max-width: 100%; height: auto; } works perfectly alongside width/height attributes; the two solve different problems and are meant to be used together.',
          },
          {
            wrong: '"figure is just a fancier div for wrapping images"',
            right: 'figure specifically signals self-contained, referenceable content with an optional caption via figcaption — and it is not limited to images at all. Code samples, quotes, charts, and embedded video all qualify. A div wrapping an image with no caption relationship is simply a div; figure is a semantic claim about the content\'s relationship to the page.',
          },
          {
            wrong: '"Adding autoplay to a video tag makes it play automatically on every browser"',
            right: 'Modern browsers block autoplay of any video (or audio) that has sound, regardless of the autoplay attribute, unless the element is also explicitly muted. This is a deliberate, near-universal browser policy — not a bug to work around, but a constraint to design for.',
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
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Why is the alt attribute considered mandatory, and when should it be an empty string versus a full description?',
            a: 'alt provides a text alternative for an image, used by screen readers, shown when the image fails to load, and indexed by search engines. It should be a meaningful description when the image conveys information the surrounding text does not already provide — a product photo, a chart, an icon acting as the only label for a button. It should be an explicit empty string, alt="", when the image is purely decorative and removing it would lose no information — that empty value tells assistive technology to skip the image silently, which is different from omitting the attribute entirely, which causes screen readers to fall back to announcing the filename.',
          },
          {
            q: 'How do the width and height attributes on an img tag improve performance, and does setting them conflict with responsive CSS?',
            a: 'They let the browser compute the image\'s aspect ratio before the file has downloaded, so it can reserve the correct amount of space in the layout immediately — preventing Cumulative Layout Shift, where surrounding content jumps once the image\'s real size becomes known. They do not conflict with responsive design: by default the browser only uses the ratio between the two values for space reservation, while CSS rules like max-width: 100%; height: auto; still control the actual rendered size. Both should be used together.',
          },
          {
            q: 'What is the purpose of multiple source elements inside an audio or video tag?',
            a: 'Different browsers support different audio and video codecs. Listing several source elements, each with a different file and a type attribute, lets the browser try each one in order and play the first format it can actually decode, silently skipping the rest — providing format compatibility across browsers without any JavaScript or format detection logic.',
          },
          {
            q: 'When would you reach for figure and figcaption instead of a plain div and p?',
            a: 'When the content is self-contained and the caption has a genuine semantic relationship to it — a screen reader announces figcaption specifically as the caption belonging to its parent figure. figure is also not limited to images; it applies to any self-contained referenceable content, including code samples, charts, and pull-quotes. A plain div/p pairing carries no such relationship and is read by assistive technology as two unrelated blocks of content.',
          },
          {
            q: 'Why does a muted video with autoplay work in every major browser, while the same video without muted usually does not?',
            a: 'Browsers implement autoplay restrictions specifically to prevent unsolicited sound from playing the instant a page loads — a policy driven directly by user complaints and abuse in the earlier web. Muting the video removes the disruptive behavior the policy targets, so browsers permit autoplay in that specific case. The standard reliable pattern for background-style autoplay video is autoplay muted loop playsinline, and even that can still be blocked by certain browser settings, so critical content should never depend on autoplay actually firing.',
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
        <SectionTitle>Image and Media Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Omitting alt entirely instead of setting it to an empty string for decorative images',
            a: 'A missing alt attribute makes screen readers fall back to announcing the image\'s filename or full URL — the exact noise decorative-image handling is supposed to prevent. Always write alt="" explicitly for genuinely decorative images; never simply leave the attribute off.',
          },
          {
            q: 'Writing alt text that just repeats "image of" or the filename',
            a: 'alt="image of a sneaker" and alt="IMG_2891.jpg" both fail to communicate what a sighted user actually perceives. Describe the meaningful content — color, subject, context — the same way you would describe it out loud to someone who cannot see the screen.',
          },
          {
            q: 'Shipping every image without width and height attributes',
            a: 'Without them, the browser cannot reserve layout space before the file downloads, causing visible content shifts as each image loads — measured directly as Cumulative Layout Shift, part of Google\'s Core Web Vitals. Set both attributes to the image\'s real aspect ratio on every img and video, even when the display size is fully controlled by responsive CSS.',
          },
          {
            q: 'Assuming a video will autoplay just because the autoplay attribute is present',
            a: 'Every major browser blocks autoplay of video (or audio) with sound unless the element is also muted. A video with autoplay but no muted attribute will simply sit paused on page load in most browsers — this is a deliberate policy, not something to debug as a bug.',
          },
          {
            q: 'Using figcaption outside of a figure, expecting it to still act like a caption',
            a: 'figcaption only carries meaning as a direct child of figure — used anywhere else, it loses the semantic caption relationship a screen reader relies on, and behaves like an unstyled, meaningless wrapper.',
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
        <SectionTitle>Errors and Warnings You Will Hit With Images and Media — And Exactly Why</SectionTitle>

        {[
          {
            error: `GET https://example.com/images/hero.jpg 404 (Not Found)`,
            cause: 'The src path is wrong — a typo, a file that was renamed or deleted, or a relative path resolved from the wrong base location. The browser still renders the img element itself; only the picture fails, leaving a broken-image icon plus whatever alt text was provided.',
            fix: 'Check the exact path in DevTools\' Network tab, confirm the file actually exists at that location on the server, and double-check relative paths against the current page\'s URL, exactly as covered in the Links and Navigation module.',
          },
          {
            error: `Lighthouse Accessibility: "Image elements do not have [alt] attributes"`,
            cause: 'A Lighthouse accessibility audit flags every img missing an alt attribute on the page — a direct, automated check for exactly the omission covered in Part 01.',
            fix: 'Add alt text to every flagged image — a meaningful description for informative images, alt="" for decorative ones. This single fix is one of the fastest, highest-impact changes to a Lighthouse accessibility score.',
          },
          {
            error: `NotSupportedError: Failed to load because no supported source was found`,
            cause: 'None of the source elements inside a video or audio tag point to a format the current browser can decode — often because only one format was provided, or every source path itself is broken.',
            fix: 'Provide at least two widely-supported formats (commonly .mp4 and .webm for video, .mp3 and .ogg for audio), confirm each source\'s path resolves correctly, and check the type attribute on each source matches the actual file format.',
          },
          {
            error: `DOMException: play() failed because the user didn't interact with the document first`,
            cause: 'A video or audio element with autoplay (and without muted) is blocked by the browser\'s autoplay policy, since it has sound and the user has not yet interacted with the page.',
            fix: 'Add the muted attribute for background-style autoplay video, or remove autoplay entirely and let the user start playback via the controls UI — never rely on unmuted autoplay actually working.',
          },
          {
            error: `Cumulative Layout Shift: 0.34 (poor) — Lighthouse Performance audit`,
            cause: 'Images or videos on the page have no width/height attributes (and no equivalent CSS aspect-ratio), so the browser cannot reserve their layout space before the files finish loading, causing visible content jumps as each one loads in.',
            fix: 'Add width and height attributes matching each media element\'s real aspect ratio, as covered in Part 03. This is frequently the single highest-leverage fix for a poor CLS score on an image-heavy page.',
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
        'src and alt are the two non-optional attributes on img — src points at the file, alt supplies a text alternative used by screen readers, search engines, and the failure-case fallback when an image cannot load.',
        'A missing alt attribute is not the same as an empty one. Omitting it causes screen readers to fall back to reading the filename; alt="" is a deliberate, correct instruction to skip a genuinely decorative image.',
        'width and height let the browser reserve layout space before an image or video downloads, preventing Cumulative Layout Shift — and they do not conflict with responsive CSS, which still controls the actual rendered size.',
        'figure groups self-contained, referenceable content (not only images — code, quotes, charts) with an optional figcaption; figcaption only carries meaning as a direct child of figure.',
        'audio and video both support multiple source children so the browser can pick the first format it can actually decode — the standard way to handle codec support differences across browsers.',
        'Autoplay with sound is blocked by every major browser. Reliable autoplay requires the muted attribute, and even then should never be the only path to critical content.',
        'loading="lazy" defers offscreen images until the user scrolls near them — never apply it to above-the-fold content, which should load immediately. Full responsive-image techniques come later, in the Responsive Images & Performance module.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 06 covers HTML lists — ul, ol, and the often-overlooked dl — including exactly when list
          order genuinely matters, correct nesting, and the mistakes that produce invalid markup.
        </p>
        <Link href="/learn/html-css/lists" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 06 → Lists — ul, ol, dl
        </Link>
      </div>
    </LearnLayout>
  )
}
