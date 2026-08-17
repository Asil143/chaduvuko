import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Responsive Images & Performance — HTML & CSS | Chaduvuko',
  description:
    'srcset, sizes, picture, and the image-loading techniques that keep a real page fast on real connections.',
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

export default function ResponsiveImagesPerformance() {
  return (
    <LearnLayout
      title="Responsive Images & Performance"
      description="srcset, sizes, picture, and the image-loading techniques that keep a real page fast on real connections."
      section="HTML & CSS — Module 37"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem With One Image For Everyone" />
        <SectionTitle>Why a Single Image File Is Almost Always Wrong</SectionTitle>

        <Para>
          A single <code>{`<img src="...">`}</code> points at exactly one file, and that one file has to
          serve every device that requests it — a laptop with a 1x display sitting on a fast office
          connection, a five-year-old Android phone on a throttled mobile connection, and a 3x-density
          iPhone in the same browsing session. If the image is sized and compressed for the laptop, the
          phone downloads far more data than its small screen can even display. If it is sized for the
          phone, the laptop shows a soft, upscaled image. There has never been one correct file size for
          every device — which is exactly the problem <code>srcset</code>, <code>sizes</code>, and{' '}
          <code>{`<picture>`}</code> exist to solve.
        </Para>

        <Para>
          It helps to separate two distinct problems that get conflated constantly, because the browser
          solves them with two different tools:
        </Para>

        <CodeBox label="Two different problems, two different tools">{`1. RESOLUTION SWITCHING
   Same crop, same content, different FILE SIZES for different screen
   densities and viewport widths. Tool: srcset + sizes on a single <img>.

2. ART DIRECTION
   Genuinely different CROPS or compositions for different screen sizes —
   a tight portrait crop on mobile, a wide landscape crop on desktop.
   Tool: <picture> with multiple <source> elements.`}</CodeBox>

        <Para>
          This module covers both in depth, then layers on the format question (WebP/AVIF vs JPEG/PNG)
          and the two Core Web Vitals metrics — CLS and LCP — that images are the single most common
          cause of failing.
        </Para>

        <Callout type="info">
          This module assumes you have already been through Images and Media, where <code>img</code>,{' '}
          <code>alt</code>, <code>width</code>/<code>height</code>, and a first pass at{' '}
          <code>loading=&quot;lazy&quot;</code> were covered. Everything here builds directly on that
          foundation rather than repeating it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — srcset and sizes" />
        <SectionTitle>Resolution Switching — Serving the Right File Size Automatically</SectionTitle>

        <Para>
          <code>srcset</code> gives the browser a list of candidate image files, each labeled with either
          its pixel width or its pixel density, and lets the browser — not your CSS, not JavaScript —
          choose which one to actually download, based on the real device it is running on and the real
          size the image will render at.
        </Para>

        <SubTitle>Density descriptors — the simple case</SubTitle>

        <Para>
          The simplest form of <code>srcset</code> offers the same image at 1x, 2x, and sometimes 3x
          pixel density, for a fixed display size (a logo or an icon that always renders at a known CSS
          size regardless of viewport).
        </Para>

        <CodeBox label="Density descriptors — for a fixed-size image">{`<img
  src="/logo-200.png"
  srcset="/logo-200.png 1x, /logo-400.png 2x, /logo-600.png 3x"
  alt="Chaduvuko logo"
  width="200"
  height="60"
>

<!-- A standard 1x display downloads logo-200.png.
     A Retina-class 2x display downloads logo-400.png.
     A 3x phone display downloads logo-600.png.
     The browser measures its own pixel density and picks automatically. -->`}</CodeBox>

        <SubTitle>Width descriptors — the case that actually matters for real content images</SubTitle>

        <Para>
          Density descriptors only work when the image renders at a fixed, known CSS size. Most real
          content images — a blog hero, a product photo, a card thumbnail — render at a size that changes
          with the viewport (full-width on mobile, a third of the width on desktop). For those,{' '}
          <code>srcset</code> uses <strong>width descriptors</strong> instead — labeling each candidate
          with its actual intrinsic pixel width using <code>w</code>, not a density multiplier.
        </Para>

        <CodeBox label="Width descriptors — multiple real file sizes offered">{`<img
  src="/blog/hero-800.jpg"
  srcset="
    /blog/hero-400.jpg   400w,
    /blog/hero-800.jpg   800w,
    /blog/hero-1200.jpg 1200w,
    /blog/hero-1600.jpg 1600w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 800px"
  alt="Team standup meeting around a whiteboard"
  width="1200"
  height="675"
>`}</CodeBox>

        <Para>
          Width descriptors alone are not enough — the browser also needs to know how large the image is
          actually going to be <em>rendered</em>, in CSS pixels, at the current viewport width, before it
          can pick the smallest candidate that is still large enough. That is exactly what{' '}
          <code>sizes</code> supplies.
        </Para>

        <SubTitle>sizes — telling the browser the rendered width, before it downloads anything</SubTitle>

        <Para>
          <code>sizes</code> is a comma-separated list of media conditions paired with a rendered width,
          evaluated top to bottom — the browser uses the <strong>first</strong> condition that matches the
          current viewport. The final, condition-less value is the fallback for anything that did not
          match.
        </Para>

        <CodeBox label="Reading sizes step by step">{`sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 800px"

<!-- Read as three rules, checked in order:
     1. If the viewport is 600px or narrower, this image renders at 100% of
        the viewport width (100vw) — a full-bleed mobile layout.
     2. Else, if the viewport is 1000px or narrower, it renders at 50% of
        the viewport width — a two-column tablet layout.
     3. Otherwise (desktop), it renders at a fixed 800px — the image never
        grows past 800px wide regardless of how wide the screen gets. -->`}</CodeBox>

        <Para>
          Combining these two attributes, the browser's decision process is: read <code>sizes</code> to
          work out how many CSS pixels the image will actually occupy at the current viewport width,
          multiply that by the screen's pixel density, then pick the <strong>smallest</strong>{' '}
          candidate from <code>srcset</code> that is still large enough to cover that many real pixels
          without visibly blurring. It downloads exactly one file — never all of them, and this decision
          happens before a single byte of any candidate is fetched.
        </Para>

        <Callout type="warning">
          <strong>sizes is not optional once you use width descriptors.</strong> Without it, the browser
          falls back to assuming the image renders at <code>100vw</code> — full viewport width — which is
          very often wrong, and leads to the browser downloading a candidate that is either needlessly
          large or, worse, too small and visibly soft. Every <code>srcset</code> that uses{' '}
          <code>w</code> descriptors needs a matching <code>sizes</code> attribute that actually reflects
          your real CSS layout.
        </Callout>

        <Para>
          The <code>src</code> attribute is still required alongside <code>srcset</code> — it is the
          fallback used by any browser old enough not to understand <code>srcset</code> at all, and it is
          also what a browser lazily evaluating the DOM without CSS applied falls back to. Set it to a
          reasonable mid-size candidate, never the largest file in the set.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The picture Element" />
        <SectionTitle>picture and source — True Art Direction, Not Just Resolution Switching</SectionTitle>

        <Para>
          <code>srcset</code> only ever serves <strong>the same image</strong> at different sizes — same
          crop, same composition, just more or fewer pixels. Sometimes that is not what a responsive
          layout actually needs. A wide, cinematic hero photo that looks great spanning a 1600px desktop
          viewport often becomes an unreadable sliver of background noise when it is naively squeezed down
          into a 375px-wide mobile hero — the subject shrinks to nothing. What the mobile layout actually
          needs is a <strong>different crop</strong>: tighter, portrait-oriented, centered on the subject.
          That is <strong>art direction</strong>, and it is a job <code>srcset</code> cannot do — it is
          exactly what <code>{`<picture>`}</code> exists for.
        </Para>

        <CodeBox label="picture with source — different crops for different viewports">{`<picture>
  <source media="(max-width: 600px)" srcset="/hero/hero-mobile-crop.jpg">
  <source media="(max-width: 1024px)" srcset="/hero/hero-tablet-crop.jpg">
  <img src="/hero/hero-desktop-crop.jpg" alt="Founders reviewing quarterly roadmap on a whiteboard" width="1600" height="700">
</picture>`}</CodeBox>

        <Para>
          The mechanics matter here: <code>{`<picture>`}</code> is a wrapper element with no rendering of
          its own. It contains any number of <code>{`<source>`}</code> elements followed by exactly one{' '}
          <code>{`<img>`}</code>, which is mandatory — not just as a fallback, but because{' '}
          <code>{`<img>`}</code> is what actually does the rendering, sizing, and lazy-loading. The
          browser evaluates each <code>{`<source>`}</code>'s <code>media</code> condition top to bottom
          and uses the first one that matches; if none match, it falls through to the plain{' '}
          <code>{`<img>`}</code>'s own <code>src</code>.
        </Para>

        <Callout type="warning">
          <strong>Every attribute that controls layout — alt, width, height, loading — belongs on the
          inner img, not on picture or source.</strong> <code>{`<picture>`}</code> and{' '}
          <code>{`<source>`}</code> only ever influence <em>which file</em> gets requested; the{' '}
          <code>{`<img>`}</code> is still what the browser lays out, reserves space for, and exposes to
          assistive technology.
        </Callout>

        <SubTitle>Combining art direction with resolution switching in the same picture</SubTitle>

        <Para>
          The two techniques are not mutually exclusive — a real production hero image commonly needs
          both a different crop per breakpoint <strong>and</strong> multiple resolutions within each crop.
          Each <code>{`<source>`}</code> can carry its own full <code>srcset</code>/<code>sizes</code>{' '}
          pair.
        </Para>

        <CodeBox label="Art direction AND resolution switching, combined">{`<picture>
  <source
    media="(max-width: 600px)"
    srcset="/hero/mobile-480.jpg 480w, /hero/mobile-960.jpg 960w"
    sizes="100vw"
  >
  <source
    media="(max-width: 1024px)"
    srcset="/hero/tablet-800.jpg 800w, /hero/tablet-1600.jpg 1600w"
    sizes="100vw"
  >
  <img
    src="/hero/desktop-1600.jpg"
    srcset="/hero/desktop-1600.jpg 1600w, /hero/desktop-2400.jpg 2400w"
    sizes="1600px"
    alt="Founders reviewing quarterly roadmap on a whiteboard"
    width="1600"
    height="700"
  >
</picture>`}</CodeBox>

        <Para>
          This is genuinely the most complete form the responsive-images system offers: for every
          breakpoint, the browser both selects the right crop <em>and</em> the right resolution within
          that crop, downloading exactly one file for the entire element.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Image Formats" />
        <SectionTitle>WebP and AVIF vs JPEG and PNG — Choosing (and Falling Back On) a Format</SectionTitle>

        <Para>
          File format is a second, independent axis of optimization, on top of everything{' '}
          <code>srcset</code> and <code>sizes</code> already handle. The same photograph, at the same
          pixel dimensions, can vary enormously in file size purely based on which compression format
          encoded it.
        </Para>

        <CodeBox label="Roughly, for the same visual quality">{`JPEG   — the long-standing default for photos. Lossy, widely supported everywhere.
PNG    — lossless, supports transparency. Best for graphics/icons/screenshots, not photos.
WebP   — typically 25-35% smaller than an equivalent-quality JPEG. Supported in every
          modern browser (Chrome, Firefox, Safari, Edge — all current versions).
AVIF   — typically smaller again than WebP, sometimes significantly. Newer, slightly
          less universally supported, and slower to encode.`}</CodeBox>

        <Para>
          The practical answer is almost never "pick one format and use it everywhere" — it is "offer the
          most efficient format first, and fall back gracefully for anything that cannot decode it,"
          using exactly the same <code>{`<picture>`}</code>/<code>{`<source>`}</code> mechanism from Part
          03, this time keyed off <code>type</code> instead of <code>media</code>.
        </Para>

        <CodeBox label="Format fallback chain — AVIF, then WebP, then JPEG">{`<picture>
  <source srcset="/products/sneaker.avif" type="image/avif">
  <source srcset="/products/sneaker.webp" type="image/webp">
  <img src="/products/sneaker.jpg" alt="Red and white running sneaker, side profile" width="800" height="800">
</picture>`}</CodeBox>

        <Para>
          The browser walks the <code>{`<source>`}</code> elements in order and uses the{' '}
          <strong>first</strong> one whose <code>type</code> it can actually decode — a browser that
          supports AVIF uses the first line and never even requests the WebP or JPEG files. A browser
          without AVIF support skips straight past it, tries WebP next, and so on down to the guaranteed
          universal JPEG fallback. Nothing here requires server-side browser detection or user-agent
          sniffing — the browser makes the decision itself, based on formats it actually knows how to
          decode.
        </Para>

        <Callout type="tip">
          <strong>Format and resolution switching combine in the same picture element.</strong> Each{' '}
          <code>{`<source>`}</code> can carry its own <code>type</code> AND its own{' '}
          <code>srcset</code>/<code>sizes</code> — a real production image pipeline commonly generates
          an AVIF set, a WebP set, and a JPEG set, each at several widths, all wired into one{' '}
          <code>{`<picture>`}</code>. Tools like Next.js's built-in <code>Image</code> component, or a
          CDN-based image service, generate this entire matrix automatically from a single source file —
          hand-writing it is realistic for a handful of hero images, not for every image on a large site.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — loading, fetchpriority, and decoding" />
        <SectionTitle>loading=&quot;lazy&quot; Revisited — And the Priority Attributes Around It</SectionTitle>

        <Para>
          The Images and Media module introduced <code>loading=&quot;lazy&quot;</code> as a preview. Here
          is the performance-focused version: <code>loading</code> is one of three attributes that
          control how aggressively the browser fetches and decodes an image relative to everything else
          competing for bandwidth on the page, and getting all three right — or wrong — has a direct,
          measurable effect on load performance.
        </Para>

        <CodeBox label="The three loading-related attributes">{`loading="lazy" | "eager"
  Whether the browser defers fetching until the image nears the viewport
  ("lazy") or fetches immediately regardless of position ("eager", the default).

fetchpriority="high" | "low" | "auto"
  A hint about how urgently this specific request should be scheduled
  relative to everything else the page is loading.

decoding="async" | "sync" | "auto"
  Whether decoding the image (turning compressed bytes into pixels) is
  allowed to happen off the main thread, without blocking other rendering.`}</CodeBox>

        <Para>
          The rule that matters most in practice: <strong>never lazy-load the image that appears above
          the fold</strong> — especially a hero image, which is very often also the page's Largest
          Contentful Paint element (Part 07). Lazy-loading it actively delays the single metric it is
          most likely to be judged on, because the browser now waits for a scroll-proximity check that
          will never meaningfully change anything for an image already in the initial viewport.
        </Para>

        <CodeBox label="A hero image — eager, high priority, synchronous decode">{`<img
  src="/hero/desktop-1600.jpg"
  alt="Founders reviewing quarterly roadmap on a whiteboard"
  width="1600"
  height="700"
  loading="eager"
  fetchpriority="high"
>

<!-- Everything below the fold: the opposite treatment -->
<img
  src="/blog/footer-illustration.png"
  alt="Illustration of a rocket launching"
  width="800"
  height="400"
  loading="lazy"
  fetchpriority="low"
>`}</CodeBox>

        <Callout type="warning">
          <strong>loading=&quot;lazy&quot; and fetchpriority=&quot;high&quot; are contradictory on the
          same image.</strong> Setting both tells the browser to both defer the request and treat it as
          urgent — browsers generally resolve this by not lazy-loading at all, but the underlying mistake
          is real: pick one intent per image based on whether it is visible on first paint, not both.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — CLS" />
        <SectionTitle>Cumulative Layout Shift — Images Are the Most Common Cause</SectionTitle>

        <Para>
          Cumulative Layout Shift (CLS) is one of Google's three Core Web Vitals, and it measures exactly
          one thing: how much visible content unexpectedly moves after it has already been painted to the
          screen. It is scored, not binary — every unexpected shift contributes a fraction to a running
          total for the page, based on how much of the viewport moved and how far it moved.
        </Para>

        <Para>
          The Images and Media module already introduced the mechanism: an <code>{`<img>`}</code> with no{' '}
          <code>width</code>/<code>height</code> (and no equivalent CSS <code>aspect-ratio</code>) gives
          the browser zero information about how tall it will be before the file downloads. The browser
          renders the page with no space reserved, then — the instant the image's real dimensions become
          known — shoves everything below it downward. That sudden shove is precisely what CLS measures.
        </Para>

        <CodeBox label="The CLS-causing pattern, one more time, with the fix">{`<!-- Causes layout shift: no dimensions, no reserved space -->
<img src="/blog/hero.jpg" alt="Solar panels on a hillside at sunset">

<!-- Fixed: width/height give the browser the aspect ratio immediately -->
<img
  src="/blog/hero.jpg"
  alt="Solar panels on a hillside at sunset"
  width="1200"
  height="675"
>`}</CodeBox>

        <Para>
          It is worth being precise about what <code>width</code>/<code>height</code> actually give the
          browser: not a fixed pixel size, but a <strong>ratio</strong>. Modern browsers compute an
          implicit <code>aspect-ratio</code> from the two attributes and reserve exactly that shape of
          space, then let CSS control the final rendered size on top of it — which is why{' '}
          <code>{`img { max-width: 100%; height: auto; }`}</code> and explicit{' '}
          <code>width</code>/<code>height</code> attributes work together rather than conflicting.
        </Para>

        <SubTitle>Other common CLS sources images introduce, beyond a missing width/height</SubTitle>

        <CodeBox label="Two more image-related CLS triggers">{`1. Web fonts swapping in after a font-based icon or a text label reflows
   the layout around a nearby image — not the image itself, but often
   diagnosed alongside it since both show up in the same DevTools report.

2. An ad slot or embed placeholder that has no reserved height and pops
   in above or beside an image once its content loads asynchronously.`}</CodeBox>

        <Callout type="tip">
          <strong>You do not need to guess at your CLS score — Chrome DevTools measures it directly.</strong>{' '}
          The Performance panel's Experience section flags individual layout shift events with a red bar,
          and clicking one highlights exactly which element moved and by how much. Lighthouse (built into
          DevTools, under the Lighthouse tab) reports an aggregate CLS score for the whole page load,
          scored against Google's published thresholds: under 0.1 is "good," 0.1–0.25 is "needs
          improvement," and above 0.25 is "poor."
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — LCP" />
        <SectionTitle>Largest Contentful Paint — Why the Hero Image Is Usually the Bottleneck</SectionTitle>

        <Para>
          Largest Contentful Paint (LCP) measures how long it takes the single largest visible element —
          on most real pages, this is a hero image, a large heading, or a background image — to finish
          rendering after the page starts loading. It is the Core Web Vital most directly tied to a
          user's felt sense of "is this page actually here yet," and on the overwhelming majority of
          content-heavy pages, the LCP element <em>is</em> an image.
        </Para>

        <Para>
          An unoptimized hero image drags LCP down through a predictable, stacked sequence of delays —
          each one independently fixable with a technique already covered earlier in this module.
        </Para>

        <CodeBox label="Where the delay actually comes from, stacked">{`1. Oversized file — a 4000px-wide, unresized original JPEG serving a
   1600px hero slot. Fix: srcset with correctly sized candidates (Part 02).

2. Wrong format — an uncompressed PNG for what is fundamentally a photo.
   Fix: WebP/AVIF with a JPEG fallback (Part 04).

3. Lazy-loaded above the fold — deferring the fetch of the very element
   LCP is measuring. Fix: loading="eager" + fetchpriority="high" (Part 05).

4. Discovered late — the image is only referenced inside a CSS
   background-image rule in an external stylesheet, so the browser cannot
   even start the request until the CSS has downloaded and parsed. Fix:
   use a real <img> (or <picture>) in the HTML for LCP candidates, not
   a CSS background — the browser's preload scanner can discover an
   <img>'s src while still parsing HTML, well before CSS is involved.`}</CodeBox>

        <Callout type="warning">
          <strong>A background-image hero is one of the most common, least obvious LCP mistakes.</strong>{' '}
          Because it lives in CSS rather than HTML, the browser's HTML preload scanner — the mechanism
          that starts fetching images it finds while still parsing the document — never sees it. The
          request only begins once the relevant stylesheet has downloaded and been parsed, which can add
          hundreds of milliseconds of pure delay to your LCP element for no visual reason at all.
        </Callout>

        <Para>
          Google's published LCP thresholds: under 2.5 seconds is "good," 2.5–4.0 seconds is "needs
          improvement," and above 4.0 seconds is "poor" — measured from navigation start, on real-user
          data collected across actual visits, not just a single synthetic lab test. Lighthouse gives you
          a lab-based estimate immediately; PageSpeed Insights and the Chrome UX Report show the real-user
          field data your actual visitors experienced.
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
        <SectionTitle>A Portland Furniture Retailer&apos;s LCP Goes From 6.1s to 1.8s</SectionTitle>

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
            Scenario — Furniture e-commerce, Portland · Core Web Vitals audit
          </div>

          <Para>
            An online furniture retailer in Portland notices their product listing pages have quietly
            slipped out of Google's "good" Core Web Vitals bucket, coinciding with a real, measurable drop
            in organic search traffic to those exact pages. The design team had recently shipped a
            redesigned category hero — a large, moody lifestyle photograph behind the category title —
            and nobody connected the two events until an engineer ran Lighthouse directly against a
            product listing page.
          </Para>

          <SubSubTitle>What the audit finds</SubSubTitle>

          <Para>
            The report flags an LCP of 6.1 seconds, with the hero photograph identified as the LCP element.
            Digging into the Network panel, three separate, independently diagnosable problems stack on
            top of each other:
          </Para>

          <CodeBox label="The original hero markup">{`<div class="category-hero" style="background-image: url('/hero/category-bg-original.jpg')">
  <h1>Living Room Furniture</h1>
</div>`}</CodeBox>

          <Para>
            First, the image is a single 4200×1800 JPEG straight out of the photographer's export,
            weighing 3.8MB, serving a hero slot that never renders wider than 1600px on any real device —
            the exact single-file problem from Part 01. Second, it is set as a CSS{' '}
            <code>background-image</code>, invisible to the HTML preload scanner, adding roughly 400ms of
            pure discovery delay before the request even starts, exactly the mistake called out in Part
            07. Third — and this one had been true even before the redesign — the surrounding product
            grid images have no <code>width</code>/<code>height</code> attributes at all, so every page
            load also carries a poor CLS score as the grid visibly jumps once each thumbnail's real
            dimensions resolve.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <CodeBox label="The rebuilt hero — real img, srcset, format fallback, correct priority">{`<picture class="category-hero">
  <source
    srcset="/hero/category-bg-800.avif 800w, /hero/category-bg-1600.avif 1600w"
    sizes="100vw"
    type="image/avif"
  >
  <source
    srcset="/hero/category-bg-800.webp 800w, /hero/category-bg-1600.webp 1600w"
    sizes="100vw"
    type="image/webp"
  >
  <img
    src="/hero/category-bg-1600.jpg"
    alt="Modern living room with a grey sectional sofa and warm ambient lighting"
    width="1600"
    height="500"
    loading="eager"
    fetchpriority="high"
  >
</picture>
<h1>Living Room Furniture</h1>`}</CodeBox>

          <Para>
            Alongside the hero fix, the engineer runs a bulk pass adding correct <code>width</code>/
            <code>height</code> to every product grid thumbnail, and adds <code>loading=&quot;lazy&quot;</code>{' '}
            to everything below the third row, which was previously loading eagerly for no reason. LCP
            drops from 6.1s to 1.8s — well inside Google's "good" threshold — and CLS drops from 0.34
            ("poor") to 0.02 ("good"). Organic traffic to the affected pages recovers over the following
            search index cycle. Nothing about the visual design changed at all; every fix here was purely
            about how the same images were delivered.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Responsive Images</SectionTitle>

        {[
          {
            wrong: '"srcset downloads every candidate and the browser picks the best-looking one afterward"',
            right: 'The browser evaluates sizes and its own viewport/density before requesting anything, then downloads exactly one candidate from srcset. It never fetches multiple files to compare — the decision happens ahead of any network request.',
          },
          {
            wrong: '"picture and srcset solve the same problem — picture is just the newer syntax"',
            right: 'They solve different problems. srcset is resolution switching — the same crop at different sizes. picture with source is art direction — genuinely different crops or formats per condition. Many production images legitimately need both at once.',
          },
          {
            wrong: '"WebP/AVIF need a JavaScript fallback for browsers that don\'t support them"',
            right: 'No JavaScript is involved at all. The <picture>/<source type="..."> fallback chain is resolved entirely by the browser\'s own format-decoding capability — it simply skips any <source> it cannot decode and falls through to the next one, down to the universal <img> fallback.',
          },
          {
            wrong: '"Core Web Vitals are just a Google ranking gimmick, not a real performance signal"',
            right: 'CLS and LCP measure genuinely real, user-felt problems — content jumping around unexpectedly, and how long the main visible content takes to appear. They affect search ranking specifically because they correlate with real user experience; fixing them is worth doing even ignoring SEO entirely.',
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
            q: 'What is the difference between srcset with density descriptors and srcset with width descriptors?',
            a: 'Density descriptors (1x, 2x, 3x) are for a fixed-size element — the same rendered CSS size across all viewports, just swapping which file gets used based on screen pixel density. Width descriptors (400w, 800w, ...) describe each candidate\'s real intrinsic pixel width and require a matching sizes attribute, because the browser needs to know how large the image will actually render at the current viewport before it can pick a candidate large enough to look sharp without being wasteful.',
          },
          {
            q: 'When would you reach for picture with source instead of a plain img with srcset?',
            a: 'When the responsive requirement is art direction, not just resolution — genuinely different crops or compositions per breakpoint (a tight portrait crop on mobile vs a wide landscape crop on desktop), or serving different image formats (AVIF/WebP/JPEG) with a fallback chain. srcset alone can only offer different sizes of the exact same crop.',
          },
          {
            q: 'How do width and height attributes actually prevent layout shift, given that responsive images also need to scale fluidly with CSS?',
            a: 'The two attributes give the browser an aspect ratio, not a fixed pixel size — modern browsers compute an implicit aspect-ratio from them and reserve exactly that shape of space in the layout before the file has downloaded. CSS like max-width: 100%; height: auto; then controls the actual rendered size on top of that reserved space. The attributes and the fluid CSS solve two different problems and are meant to be used together, not as alternatives.',
          },
          {
            q: 'Why might a background-image CSS hero hurt LCP more than an equivalent img element, even with identical file size and format?',
            a: 'The browser\'s HTML preload scanner discovers <img> src (and <source> srcset) attributes while still parsing the raw HTML, and can start the image request immediately. An image referenced only inside a CSS background-image rule is invisible to that scanner — the request cannot begin until the relevant stylesheet has been downloaded and parsed, adding pure discovery delay before the fetch even starts, directly hurting LCP if that image is the page\'s largest visible element.',
          },
          {
            q: 'You are told loading="lazy" was recently added to a page\'s hero image and LCP got worse. Why would that happen, and what\'s the fix?',
            a: 'loading="lazy" defers the fetch until the browser determines the image is nearing the viewport based on scroll proximity — but a hero image is already inside the initial viewport on page load, so the deferral adds pure, unnecessary delay to the single element LCP is measuring, since there is no scroll to wait for. The fix is loading="eager" (or simply omitting loading, since eager is the default) combined with fetchpriority="high" specifically for above-the-fold images; reserve loading="lazy" for images genuinely below the fold.',
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
        <SectionTitle>Responsive Image Mistakes Made Constantly, Even by Experienced Engineers</SectionTitle>

        {[
          {
            q: 'Using srcset with width descriptors but forgetting sizes entirely',
            a: 'Without sizes, the browser assumes the image renders at 100vw — often wrong — and the whole point of offering multiple width candidates is undermined by a guess the browser had no choice but to make.',
          },
          {
            q: 'Putting layout-affecting attributes on picture or source instead of the inner img',
            a: 'alt, width, height, loading, and fetchpriority only matter on the <img> — picture and source only ever influence which file gets requested. Attributes placed on the wrong element are silently ignored.',
          },
          {
            q: 'Lazy-loading the hero image because "lazy loading is always good practice"',
            a: 'loading="lazy" on an above-the-fold, likely-LCP image actively delays your Largest Contentful Paint. Reserve it for images genuinely below the initial viewport.',
          },
          {
            q: 'Offering only a single JPEG fallback with no WebP/AVIF sources at all',
            a: 'This leaves real, easy file-size savings on the table for every modern browser, which is the overwhelming majority of real traffic — the fallback chain costs nothing for browsers that do support the newer formats.',
          },
          {
            q: 'Fixing CLS on the hero image but leaving every other image on the page without width/height',
            a: 'CLS is scored across the entire page, not just the LCP element — a product grid or card list full of undimensioned images can independently tank the same score the hero fix was meant to improve.',
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
        <SectionTitle>Warnings and Rendering Bugs Responsive Images Actually Produce</SectionTitle>

        {[
          {
            error: `Image with src '/hero.jpg' has intrinsic size 4200x1800 but rendered size 1600x686`,
            cause: 'A Lighthouse/DevTools warning meaning the browser downloaded and decoded a much larger file than the space it actually occupies on the page — wasted bandwidth and decode time with zero visual benefit.',
            fix: 'Generate correctly sized candidates and wire up srcset/sizes (or a picture element) so the browser can choose a file close to its real rendered size instead of one oversized original.',
          },
          {
            error: `sizes attribute has an invalid value and was ignored`,
            cause: 'A typo or malformed media condition inside sizes — commonly a missing comma between entries, or a media query written without parentheses.',
            fix: 'Check each comma-separated entry follows the exact pattern (media-condition) width, with the final fallback entry having no condition at all.',
          },
          {
            error: `The image is missing a source with type image/webp or similar Lighthouse "Serve images in next-gen formats" flag`,
            cause: 'Only a JPEG/PNG source is offered, with no WebP or AVIF candidate, so every visiting browser downloads the larger legacy-format file even when it could have decoded a smaller modern one.',
            fix: 'Add WebP and/or AVIF <source> entries ahead of the JPEG/PNG fallback inside a <picture> element, generated from the same original image.',
          },
          {
            error: `Cumulative Layout Shift flagged in the DevTools Performance panel, image element highlighted red`,
            cause: 'An image (or a group of images, such as a product grid) has no width/height attributes or CSS aspect-ratio, so the browser reserves no space before the file loads and shifts everything below it once the real dimensions are known.',
            fix: 'Add width and height attributes (matching the real aspect ratio) to every image, or set an explicit CSS aspect-ratio on the element if the dimensions are not known ahead of time.',
          },
          {
            error: `Largest Contentful Paint element flagged as a background-image, not discoverable by preload scanner`,
            cause: 'The page\'s largest visible element is set via a CSS background-image rule rather than an <img>/<picture>, so the browser cannot begin fetching it until the relevant stylesheet has downloaded and been parsed.',
            fix: 'Replace CSS-only hero backgrounds with a real <img> (or <picture>) in the HTML wherever that image is a realistic LCP candidate, so the preload scanner can discover and prioritize it immediately.',
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
        'srcset + sizes solve resolution switching — the same crop, different file sizes, chosen automatically by the browser before any file is requested.',
        'picture + source solve art direction — genuinely different crops, compositions, or formats per condition, something srcset alone cannot express.',
        'sizes is not optional when using width descriptors (w) — without it the browser assumes 100vw, which is very often wrong for real layouts.',
        'Offer WebP/AVIF ahead of a JPEG/PNG fallback inside a picture element — the browser resolves the fallback chain natively, with no JavaScript involved.',
        'width and height (or CSS aspect-ratio) give the browser a ratio to reserve layout space with before the file loads — this is what prevents CLS, and it works alongside fluid, responsive CSS sizing rather than against it.',
        'The LCP element on most real pages is an image — usually a hero. Oversized files, wrong formats, unnecessary lazy-loading, and CSS-only background images all independently delay it.',
        'Never lazy-load an above-the-fold image, especially a likely LCP candidate — use loading="eager" and fetchpriority="high" instead, and reserve loading="lazy" for content genuinely below the fold.',
        'A CSS background-image is invisible to the browser\'s HTML preload scanner — a real img/picture in the HTML lets the browser discover and prioritize it far earlier.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 38 turns to accessibility at the CSS level — visible focus states, WCAG color contrast
          ratios, respecting <code>prefers-reduced-motion</code>, and designing hover interactions that
          still work on touch devices with no true hover state.
        </p>
        <Link href="/learn/html-css/css-accessibility-best-practices" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 38 → CSS Accessibility Best Practices
        </Link>
      </div>
    </LearnLayout>
  )
}
