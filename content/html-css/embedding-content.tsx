import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Embedding Content — iframe, embed, object — HTML & CSS | Chaduvuko',
  description:
    'Embedding external content safely — iframe, embed, object, and the security considerations every embed introduces.',
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

export default function EmbeddingContent() {
  return (
    <LearnLayout
      title="Embedding Content — iframe, embed, object"
      description="Embedding external content safely — iframe, embed, object, and the security considerations every embed introduces."
      section="HTML & CSS — Module 12"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — iframe" />
        <SectionTitle>A Complete Browsing Context, Embedded Inside Your Page</SectionTitle>

        <Para>
          An <code>&lt;iframe&gt;</code> embeds an entirely separate HTML document — with its own DOM,
          its own window object, its own navigation history — inside a rectangle on your page. This is
          how embedded YouTube videos, Google Maps, and payment widgets from a different domain all
          actually work.
        </Para>

        <CodeBox label="A basic iframe embed">{`<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
  title="Video player"
  allowfullscreen
></iframe>`}</CodeBox>

        <Callout type="tip">
          <strong>Always set a title attribute on an iframe.</strong> Screen readers announce it to
          identify what the embedded content actually is — without it, an iframe is announced simply as
          an unlabeled frame, giving a screen reader user no idea what they're about to enter.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The sandbox Attribute" />
        <SectionTitle>Restricting What Embedded Content Is Allowed to Do</SectionTitle>

        <Para>
          By default, an iframe's embedded document can run scripts, submit forms, open popups, and
          navigate the top-level page — all the same capabilities as a normal page. The{' '}
          <code>sandbox</code> attribute strips these capabilities away by default, then lets you
          re-enable only the specific ones you actually need.
        </Para>

        <CodeBox label="A locked-down embed — no capabilities re-enabled">{`<iframe src="https://example.com/widget" sandbox></iframe>
<!-- Scripts, forms, popups, top-navigation — all disabled -->`}</CodeBox>

        <CodeBox label="Re-enabling only what's needed">{`<iframe
  src="https://example.com/widget"
  sandbox="allow-scripts allow-same-origin"
></iframe>
<!-- Scripts can run, but forms still can't submit and it still can't
     navigate the parent page -->`}</CodeBox>

        <Callout type="warning">
          <strong>allow-scripts combined with allow-same-origin together effectively cancels the
          sandbox's core protection</strong> for same-origin content — a script running with both can
          simply remove its own sandbox attribute via the parent DOM. Only combine these two together
          when the embedded content is content you fully trust; for genuinely untrusted third-party
          content, avoid pairing them.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — embed and object" />
        <SectionTitle>The Older, Narrower Embedding Elements</SectionTitle>

        <CodeBox label="embed and object — for browser plugins and specific file types">{`<embed src="document.pdf" type="application/pdf" width="600" height="400">

<object data="document.pdf" type="application/pdf" width="600" height="400">
  <p>Your browser can't display this PDF. <a href="document.pdf">Download it instead</a>.</p>
</object>`}</CodeBox>

        <Para>
          Both elements predate the modern web and were originally designed for browser plugins (Flash,
          Java applets) that no longer exist in any current browser. <code>object</code> is generally
          preferred over <code>embed</code> today specifically because it supports genuine fallback
          content between its opening and closing tags — <code>embed</code> is a void element with no
          fallback mechanism at all. For most modern embedding needs (video, maps, third-party widgets),
          <code>iframe</code> is the correct default choice; reach for <code>object</code> mainly for
          directly embedding a file type like a PDF.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Cross-Origin Restrictions" />
        <SectionTitle>What an Embedded Page Cannot See or Do</SectionTitle>

        <Para>
          When an iframe's <code>src</code> points to a different origin (a different domain, protocol,
          or port) than the parent page, the browser's <strong>same-origin policy</strong> blocks the
          parent page and the iframe from directly reading each other's content or JavaScript state —
          neither can inspect the other's DOM or variables, by design.
        </Para>

        <CodeBox label="Cross-origin access is blocked by the browser, not by the embedded site's choice">{`// In the parent page's JavaScript, trying to read a cross-origin iframe's content:
const frame = document.querySelector('iframe')
console.log(frame.contentDocument)
// SecurityError: Blocked a frame with origin "https://yoursite.com" from
// accessing a cross-origin frame.`}</CodeBox>

        <Para>
          This is a foundational browser security boundary, not a bug or a limitation you can work
          around from the parent page's side — controlled cross-origin communication between a page and
          an embedded iframe is only possible through the explicit, opt-in{' '}
          <code>window.postMessage()</code> API, a JavaScript topic outside the scope of this
          HTML-focused track.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Clickjacking" />
        <SectionTitle>The Attack sandbox and Framing Policy Exist to Prevent</SectionTitle>

        <Para>
          <strong>Clickjacking</strong> is an attack where a malicious page embeds a legitimate page (a
          bank's transfer-money button, for example) inside an invisible iframe, positioned exactly over
          a button the attacker wants the victim to click on the visible page — the victim believes
          they're clicking the attacker's harmless-looking button, but they're actually clicking the
          real, invisible button underneath.
        </Para>

        <CodeBox label="Conceptually, what a clickjacking page looks like">{`<style>
  iframe { opacity: 0.01; position: absolute; top: 100px; left: 200px; z-index: 10; }
</style>
<button>Click here to win a prize!</button>
<iframe src="https://real-bank.com/transfer-funds"></iframe>
<!-- The invisible iframe's real "Confirm Transfer" button sits exactly
     on top of the fake "win a prize" button -->`}</CodeBox>

        <Para>
          This is defended against primarily on the <em>embedded</em> page's side, not the embedding
          page's — a site that should never be framed by another origin sends the{' '}
          <code>X-Frame-Options</code> HTTP header or a <code>frame-ancestors</code> Content-Security-Policy
          directive, telling browsers to refuse to render it inside any iframe at all.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Third-Party Widget That Broke Layout, at a Portland Real Estate Startup</SectionTitle>

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
            Scenario — Real estate startup, Portland · Embedded map widget
          </div>

          <Para>
            A property-listing page embeds a third-party interactive map widget via an iframe with a
            fixed <code>height="400"</code>. On listings with a longer address or extra map controls,
            the widget's actual content overflows the fixed height, getting clipped at the bottom with
            no way for the user to scroll and see it.
          </Para>

          <CodeBox label="The fixed-height embed, and why it silently breaks">{`<iframe src="https://maps.example.com/embed?address=..." width="100%" height="400"></iframe>
<!-- The iframe's OWN internal content can be taller than 400px on some
     addresses — the parent page has no way to know or automatically adjust,
     since it cannot read the cross-origin iframe's actual content height -->`}</CodeBox>

          <SubSubTitle>Why the parent page couldn't just "fix" it directly</SubSubTitle>

          <Para>
            Because the map widget is cross-origin, the parent page's JavaScript cannot inspect the
            iframe's actual rendered content height at all — the same-origin policy from Part 04 blocks
            it. The eventual fix required the widget provider's own opt-in solution: the third party's
            embed script used <code>postMessage</code> to report its real content height to the parent
            page, which then resized the iframe accordingly. The team's own framing: "you cannot just
            reach into a cross-origin iframe and measure it — the embed has to cooperate, or you're
            stuck with whatever fixed size you guessed."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Embedding Content</SectionTitle>

        {[
          {
            wrong: '"An iframe with the sandbox attribute is always completely safe to embed untrusted content in"',
            right: 'sandbox restricts a real, meaningful set of capabilities, but combining allow-scripts with allow-same-origin can effectively cancel its protection for same-origin content. Genuinely untrusted third-party content still needs careful, specific sandbox flag choices, not just the bare attribute.',
          },
          {
            wrong: '"A parent page can read and modify a cross-origin iframe\'s content with JavaScript, same as any other element"',
            right: 'The browser\'s same-origin policy blocks this by design — a parent page cannot inspect a cross-origin iframe\'s DOM or JavaScript state at all, only controlled, opt-in communication via postMessage is possible.',
          },
          {
            wrong: '"embed and object are outdated elements nobody should ever use anymore"',
            right: 'They remain the correct choice for directly embedding a specific file type like a PDF, where object additionally offers real fallback content for browsers that cannot render it — iframe is the right default for embedding another full page/widget, not a blanket replacement for every embedding need.',
          },
          {
            wrong: '"Clickjacking is prevented by the embedding page choosing not to hide the iframe"',
            right: 'The real defense is on the EMBEDDED page\'s side — sending an X-Frame-Options header or a frame-ancestors CSP directive that tells browsers to refuse to render it in any iframe at all, regardless of what the embedding page tries to do visually.',
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
              ✕ {item.wrong}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 08 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>4 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What does the sandbox attribute on an iframe actually do?',
            a: 'It restricts a broad default set of capabilities the embedded document would otherwise have — running scripts, submitting forms, opening popups, navigating the top-level page — and re-enables only specific ones you explicitly list (e.g. sandbox="allow-scripts"). It defaults to the most restrictive state when present with no value at all.',
          },
          {
            q: 'Why can\'t a page\'s JavaScript read the content of a cross-origin iframe?',
            a: 'The browser\'s same-origin policy blocks it by design, as a foundational security boundary — a script from one origin cannot inspect the DOM or JavaScript state of a document from a different origin. Communication requires the explicit, opt-in postMessage API instead.',
          },
          {
            q: 'What is clickjacking, and how is it actually prevented?',
            a: 'An attack where a malicious page overlays an invisible iframe of a legitimate page over a fake button, tricking a user into clicking the real, hidden button underneath. It is primarily prevented on the embedded page\'s side, via an X-Frame-Options header or frame-ancestors CSP directive telling browsers to refuse to render it inside any iframe.',
          },
          {
            q: 'When would you choose object over iframe for embedding content?',
            a: 'When directly embedding a specific file type, like a PDF — object additionally supports real fallback content between its tags for browsers that cannot render the embedded type, which iframe does not offer in the same way. For embedding another full page or third-party widget, iframe is the standard modern choice.',
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
        <SectionTitle>Embedding Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Omitting the title attribute on an iframe',
            a: 'Leaves the embedded content unlabeled for screen reader users, who have no way to know what the frame actually contains before entering it.',
          },
          {
            q: 'Using a fixed pixel height for an iframe embedding content of variable, unpredictable length',
            a: 'Content that grows taller than the fixed height gets silently clipped, with no scrollbar and no way for the user to see what\'s cut off — exactly the bug shown in the Real World example.',
          },
          {
            q: 'Combining allow-scripts and allow-same-origin in a sandbox for genuinely untrusted content',
            a: 'This pairing can effectively let embedded content remove its own sandbox restrictions — only combine them for content you fully trust.',
          },
          {
            q: 'Assuming any embed is automatically safe just because sandbox is present with no flags',
            a: 'A bare sandbox attribute is genuinely restrictive, but many real embeds need at least allow-scripts to function at all — understand exactly which flags you\'re re-enabling and why, rather than copy-pasting a working sandbox string from elsewhere.',
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
        <SectionTitle>Issues You Will Hit Embedding Content — And Exactly Why</SectionTitle>

        {[
          {
            error: `Refused to display 'https://example.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.`,
            cause: 'The embedded page explicitly told browsers, via a response header, to refuse being rendered inside an iframe from a different origin — a deliberate anti-clickjacking measure on the embedded site\'s part.',
            fix: 'You cannot override this from the embedding page — the embedded site would need to change its own header policy, which you likely don\'t control if it\'s a third-party site.',
          },
          {
            error: `SecurityError: Blocked a frame with origin "..." from accessing a cross-origin frame.`,
            cause: 'JavaScript on the parent page attempted to directly read a cross-origin iframe\'s contentDocument or contentWindow, which the same-origin policy blocks entirely.',
            fix: 'Use window.postMessage() for controlled, opt-in cross-origin communication instead of direct DOM access.',
          },
          {
            error: `An iframe renders completely blank with no visible error in the page itself`,
            cause: 'Often a silent X-Frame-Options/CSP block (check the browser console, not the page), an incorrect src URL, or the embedded resource itself failing to load.',
            fix: 'Check the browser DevTools console and Network tab for the actual underlying error — the iframe itself gives no visual indication of why it failed.',
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
        'An iframe embeds a genuinely separate HTML document with its own DOM and window — always give it a descriptive title for screen readers.',
        'sandbox strips capabilities by default and re-enables only what you explicitly list; combining allow-scripts with allow-same-origin can cancel its protection for same-origin content.',
        'embed and object predate the modern web (built for now-extinct plugins) — object remains the right choice for directly embedding a file type like a PDF, with real fallback content support.',
        'The same-origin policy blocks a parent page from reading a cross-origin iframe\'s content or state at all — only opt-in postMessage communication is possible.',
        'Clickjacking is defended against primarily on the EMBEDDED page\'s side (X-Frame-Options / frame-ancestors CSP), not by anything the embedding page does.',
        'A fixed pixel height on an iframe embedding variable-length content will silently clip overflow, since the parent page cannot measure a cross-origin iframe\'s real content height.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 13 covers metadata and SEO fundamentals — meta tags, Open Graph, favicons, and the head
          content that determines how your page is discovered and shared.
        </p>
        <Link href="/learn/html-css/metadata-seo-fundamentals" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 13 → Metadata & SEO Fundamentals
        </Link>
      </div>
    </LearnLayout>
  )
}
