import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Building a Complete Static Page — HTML & CSS | Chaduvuko',
  description:
    'A full project pulling structure, semantics, media, and forms together into one real, complete HTML page — start to finish.',
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

export default function BuildingACompleteStaticPage() {
  return (
    <LearnLayout
      title="Building a Complete Static Page"
      description="A full project pulling structure, semantics, media, and forms together into one real, complete HTML page — start to finish."
      section="HTML & CSS — Module 16 (Capstone)"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Intro ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Phase 2 Capstone" />
        <SectionTitle>Everything From Modules 1–15, in One Real Page</SectionTitle>
        <Para>
          This module is different from the previous 15 — instead of introducing a new topic, it builds
          one complete, real page from start to finish: a small local business landing page (a
          fictional coffee roastery), combining document structure, semantic sectioning, images,
          navigation, a contact form, and metadata into a single genuine build. Every technique used
          here was already covered in an earlier module — this is deliberately a synthesis, not new
          material, and each section below names exactly which earlier module it draws from.
        </Para>
      </section>

      <Divider />

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Planning the Page" />
        <SectionTitle>What We're Building, and Why Structure Comes First</SectionTitle>

        <Para>
          Before writing a single tag, sketch the page's actual sections: a header with navigation, a
          hero introduction, an "About" section, a "Menu" section with a list of offerings, a contact
          section with a real form, and a footer. This maps directly onto the semantic landmark elements
          from Module 3 — deciding the sections BEFORE writing markup is what keeps the result genuinely
          semantic instead of div-soup with classes bolted on afterward.
        </Para>

        <CodeBox label="The page's planned outline">{`header (site branding + nav)
main
  section (hero — page title + one-line pitch)
  section (about the roastery)
  section (the menu — a real content list)
  section (contact — a real working form)
footer (copyright + secondary links)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Document Skeleton" />
        <SectionTitle>Starting From Module 2's Foundation</SectionTitle>

        <CodeBox label="The full document shell — DOCTYPE, head, and metadata from Modules 2 and 13">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fernwood Coffee Roastery — Small-Batch, Portland OR</title>
  <meta name="description" content="Small-batch, ethically-sourced coffee roasted weekly in Portland, Oregon. Visit our roastery or order online.">
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <!-- page content goes here -->
</body>
</html>`}</CodeBox>

        <Para>
          Every piece here traces back to an earlier module: the DOCTYPE and lang attribute (Module 2),
          the charset and viewport meta tags (Modules 2 and 13), and the title/description tags that
          determine how this page appears in search results and browser tabs (Module 13).
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Header and Navigation" />
        <SectionTitle>Building From Modules 3 and 4</SectionTitle>

        <CodeBox label="A real semantic header, using landmark elements and a proper nav list">{`<header>
  <a href="/" class="logo">Fernwood Coffee Roastery</a>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#menu">Menu</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>`}</CodeBox>

        <Para>
          The <code>&lt;nav&gt;</code> landmark and the <code>&lt;ul&gt;</code> list structure inside it
          are exactly the pattern from Module 3 (semantic structure) and Module 4 (links & navigation) —
          the in-page <code>#about</code>/<code>#menu</code>/<code>#contact</code> links use the anchor
          links technique from Module 4, targeting the <code>id</code> attributes each section below
          will carry.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Hero and About Sections" />
        <SectionTitle>Text Hierarchy From Module 3, Images From Module 5</SectionTitle>

        <CodeBox label="The hero — the one-and-only h1 on the page">{`<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Small-Batch Coffee, Roasted Weekly</h1>
    <p>Ethically sourced, roasted in small batches every Tuesday in Portland, Oregon.</p>
  </section>

  <section id="about" aria-labelledby="about-heading">
    <h2 id="about-heading">About Fernwood</h2>
    <figure>
      <img src="/roastery-interior.jpg"
           alt="The Fernwood roastery's interior, with a large drum roaster and bags of green coffee beans"
           width="800" height="500" loading="lazy">
      <figcaption>Our roastery on SE Belmont Street, open for tours every Saturday.</figcaption>
    </figure>
    <p>Founded in 2019, Fernwood roasts small batches of ethically sourced beans every week...</p>
  </section>`}</CodeBox>

        <Callout type="tip">
          <strong>Notice there is exactly one h1 on the entire page</strong> — a direct application of
          the heading-hierarchy rule from Module 3. Every section below uses h2 for its own heading,
          maintaining a single, sensible document outline from top to bottom.
        </Callout>

        <Para>
          The image follows the complete pattern from Module 5: real, descriptive <code>alt</code> text
          (not decorative — this image genuinely conveys information), explicit{' '}
          <code>width</code>/<code>height</code> to prevent layout shift, wrapped in{' '}
          <code>figure</code>/<code>figcaption</code> for a captioned image, and{' '}
          <code>loading="lazy"</code> since this image sits below the initial viewport.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Menu Section" />
        <SectionTitle>A Real Content List, From Module 6</SectionTitle>

        <CodeBox label="An unordered list used for genuinely unordered content — the menu items">{`<section id="menu" aria-labelledby="menu-heading">
  <h2 id="menu-heading">This Week's Roast</h2>
  <ul>
    <li>
      <h3>Ethiopia Yirgacheffe</h3>
      <p>Bright, floral, notes of bergamot and stone fruit. Light roast.</p>
    </li>
    <li>
      <h3>Colombia Huila</h3>
      <p>Balanced, caramel sweetness, a clean finish. Medium roast.</p>
    </li>
    <li>
      <h3>Sumatra Mandheling</h3>
      <p>Full-bodied, earthy, low acidity. Dark roast.</p>
    </li>
  </ul>
</section>`}</CodeBox>

        <Para>
          <code>&lt;ul&gt;</code> is the correct choice here (rather than <code>&lt;ol&gt;</code>)
          because this week's roast list has no meaningful order — Module 6's core distinction between
          the two list types applied directly to a real decision.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Contact Form" />
        <SectionTitle>A Genuinely Accessible Form, From Modules 8, 9 and 10</SectionTitle>

        <CodeBox label="A real, working contact form">{`<section id="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Get in Touch</h2>
  <form action="/submit-contact" method="POST">
    <div>
      <label for="contact-name">Name</label>
      <input type="text" id="contact-name" name="name" required>
    </div>
    <div>
      <label for="contact-email">Email</label>
      <input type="email" id="contact-email" name="email" required>
    </div>
    <fieldset>
      <legend>What are you reaching out about?</legend>
      <label><input type="radio" name="reason" value="wholesale"> Wholesale orders</label>
      <label><input type="radio" name="reason" value="visit"> Visiting the roastery</label>
      <label><input type="radio" name="reason" value="other" checked> Something else</label>
    </fieldset>
    <div>
      <label for="contact-message">Message</label>
      <textarea id="contact-message" name="message" rows="5" required></textarea>
    </div>
    <button type="submit">Send Message</button>
  </form>
</section>`}</CodeBox>

        <Para>
          Every field is correctly labeled (Module 8), the reason-for-contact question uses a real{' '}
          <code>fieldset</code>/<code>legend</code>-grouped radio set (Module 9), and every input that
          matters for the business to receive has a <code>name</code> attribute — the single most common
          real mistake flagged in Module 8's own Real World example, deliberately avoided here.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Footer" />
        <SectionTitle>Closing Out the Page</SectionTitle>

        <CodeBox label="A simple, real footer">{`  <footer>
    <p>&copy; 2026 Fernwood Coffee Roastery. All rights reserved.</p>
    <nav aria-label="Footer navigation">
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </nav>
  </footer>
</main>`}</CodeBox>

        <Para>
          The <code>&amp;copy;</code> entity here is a direct callback to Module 14 — a literal{' '}
          <code>©</code> character can be typed directly in most editors today, but the entity form
          remains common in real production code and is always guaranteed to render correctly regardless
          of the file's declared encoding.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Validating the Result" />
        <SectionTitle>Checking the Finished Page Against Module 15</SectionTitle>

        <Para>
          With the full page assembled, running it through the W3C Markup Validator (Module 15) is the
          final step before considering it done — checking for unclosed tags, duplicate IDs (a real risk
          here, since both the header and footer navigation reuse similar list structures), and any
          invalid nesting introduced while assembling the sections.
        </Para>

        <Callout type="tip">
          <strong>A genuinely useful validation habit: check every id attribute is unique across the
          whole page.</strong> This build uses several — <code>hero-heading</code>,{' '}
          <code>about-heading</code>, <code>menu-heading</code>, <code>contact-heading</code>,{' '}
          <code>contact-name</code>, <code>contact-email</code>, <code>contact-message</code> — a quick
          scan (or the validator) confirms none collide, which matters because a duplicate ID breaks{' '}
          <code>label for</code> associations silently, exactly as covered in Module 8.
        </Callout>
      </section>

      <Divider />

      {/* ── Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Real Freelance Client Site Built From Exactly This Pattern</SectionTitle>

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
            Scenario — Freelance web developer, Austin · Small business site delivery
          </div>

          <Para>
            A freelance developer is hired to build a landing page for a local bakery — genuinely the
            same shape of project as this module's build. The client later asks why their site ranks
            reasonably well in local Google searches despite having no marketing budget at all.
          </Para>

          <SubSubTitle>What actually drove that result</SubSubTitle>

          <Para>
            The exact fundamentals from this module — a single clear h1, a real semantic document
            structure search engines can parse confidently, a proper <code>meta description</code>, and
            real descriptive alt text on every image — are themselves meaningful, genuine SEO signals,
            with zero paid marketing involved. The developer's own explanation to the client: "there's no
            trick here — this is just what a well-structured page looks like to a search engine, and
            most sites built quickly without attention to this structure never get it for free."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Four Misconceptions About Assembling a Real Page</SectionTitle>

        {[
          {
            wrong: '"A page is semantic as long as it uses SOME semantic tags somewhere"',
            right: 'A single <nav> buried in an otherwise all-div layout does not make the page semantic — semantic structure is a choice made at the PLANNING stage, section by section, not a tag sprinkled in afterward for credit.',
          },
          {
            wrong: '"Validating the finished HTML is optional if the page visually looks correct in a browser"',
            right: 'A browser silently tolerates a huge range of invalid HTML (unclosed tags, duplicate IDs) by guessing what was intended — the page can look fine while still breaking label associations or confusing assistive technology, exactly the kind of bug the validator catches that visual inspection cannot.',
          },
          {
            wrong: '"Combining every technique from earlier modules automatically produces good code if each piece was correct individually"',
            right: 'Individually correct pieces can still combine badly — a duplicate id reused between the header and footer nav lists is a real risk that only shows up when the WHOLE page is assembled, not when any single section was tested alone.',
          },
          {
            wrong: '"SEO requires separate technical work beyond just building the page well"',
            right: 'Strong fundamentals — one clear h1, real semantic structure, a proper meta description, genuine alt text — are themselves meaningful SEO signals with zero additional work, exactly as shown in the Real World example above.',
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

      {/* ── Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>4 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Why plan a page\'s sections before writing any markup?',
            a: 'Deciding the semantic sections up front (header, nav, main, the individual sections, footer) is what keeps the result genuinely meaningful HTML rather than a layout of generic divs with classes bolted on to describe what they visually look like rather than what they actually are.',
          },
          {
            q: 'Why is exactly one h1 per page a real rule, not just a style preference?',
            a: 'The h1 establishes the top of the page\'s document outline — search engines and assistive technology use heading hierarchy to understand structure, and multiple h1s (or skipped heading levels) genuinely confuse that structure rather than merely looking stylistically inconsistent.',
          },
          {
            q: 'What real risk does combining several sections built independently introduce?',
            a: 'Duplicate id attributes — each section might look correct in isolation, but ids must be unique across the WHOLE assembled page, and a collision (e.g. two sections both using an id like "heading") silently breaks any label association or anchor link relying on that id.',
          },
          {
            q: 'What concrete, no-extra-work SEO benefit comes from just building a page with strong HTML fundamentals?',
            a: 'A single clear h1, real semantic sectioning, a proper meta description, and genuine descriptive alt text on every image are themselves meaningful ranking signals search engines use to understand a page — no separate "SEO work" layer is required beyond building the page well in the first place.',
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
        <SectionTitle>Mistakes Beginners Make Assembling a Real Page</SectionTitle>

        {[
          {
            q: 'Reusing the same id across the header and footer navigation lists',
            a: 'ids must be unique across the entire document — reusing one between visually similar sections (like two nav lists) silently breaks anchor links and label associations relying on that id.',
          },
          {
            q: 'Writing markup section by section without a plan, then trying to make it semantic afterward',
            a: 'Retrofitting semantics onto an already-built div-based layout tends to produce shallow, inconsistent results — planning the semantic sections up front produces a genuinely more coherent document outline.',
          },
          {
            q: 'Skipping the final validator pass because the page "looks right" in the browser',
            a: 'Browsers silently tolerate a wide range of invalid HTML — a page can render correctly while still having structural bugs (duplicate ids, unclosed tags) that only the validator, not visual inspection, will catch.',
          },
          {
            q: 'Forgetting a name attribute on a real contact form field while assembling a full page',
            a: 'Exactly the most common real bug flagged back in the Forms module — an unnamed input renders and accepts input normally but is silently excluded from what actually gets submitted.',
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
        <SectionTitle>Issues You Will Hit Assembling a Real Page — And Exactly Why</SectionTitle>

        {[
          {
            error: `A <label for="..."> stops working after combining several sections into one page`,
            cause: 'Two separate sections, each correct on its own, happen to reuse the same id value once combined — the browser associates the label with whichever matching id appears first in the document, not necessarily the intended input.',
            fix: 'Give every id a genuinely unique value across the whole page, ideally prefixed by section (e.g. contact-name rather than just name) to avoid collisions as the page grows.',
          },
          {
            error: `Duplicate ID "..." (from the W3C Markup Validator)`,
            cause: 'Exactly the collision described above — the validator catches this even when the browser itself renders the page without any visible error.',
            fix: 'Search the full page source for every instance of the flagged id and rename all but one to something unique.',
          },
          {
            error: `A contact form silently fails to include a field in its submission, with no error shown anywhere`,
            cause: 'A missing name attribute on that specific input — easy to miss while assembling many sections quickly.',
            fix: 'Check every real input in the assembled page has both a name and a properly associated label before considering the build done.',
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

      <Divider />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'A real page starts with planning its sections BEFORE writing markup — that planning is what keeps the result genuinely semantic instead of div-soup with classes added afterward.',
        'Every technique in this build traces back to an earlier module: document structure (Module 2), semantic sectioning (Module 3), navigation (Module 4), images (Module 5), lists (Module 6), forms (Modules 8-9), entities (Module 14), and metadata (Module 13).',
        'Exactly one h1 per page, with h2/h3 used consistently for every section\'s own heading, keeps the document outline sensible from top to bottom.',
        'Every form field needs both a real associated label AND a name attribute — the single most common real-world mistake this build deliberately avoids.',
        'Validating the finished page (Module 15) — especially checking for duplicate IDs — is the correct final step before considering a real build done.',
        'Strong semantic HTML fundamentals are themselves a genuine, free SEO signal — not a separate technique layered on top afterward.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Phase 3 begins here — CSS Foundations, starting with how CSS actually applies styles: syntax,
          selectors, and the cascade.
        </p>
        <Link href="/learn/html-css/what-is-css-syntax-selectors-cascade" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 17 → What is CSS? Syntax, Selectors &amp; the Cascade
        </Link>
      </div>
    </LearnLayout>
  )
}
