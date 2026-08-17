import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Building a Complete Responsive Website — HTML & CSS | Chaduvuko',
  description:
    'The capstone project — a full, real, responsive website built end-to-end using everything from this entire track.',
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

export default function BuildingAResponsiveWebsite() {
  return (
    <LearnLayout
      title="Building a Complete Responsive Website"
      description="The capstone project — a full, real, responsive website built end-to-end using everything from this entire track."
      section="HTML & CSS — Module 40 (Capstone Project)"
      readTime="60 min"
      updatedAt="August 2026"
    >

      {/* ── Intro ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Major Capstone" />
        <SectionTitle>Every Technique From This Entire Track, in One Real Build</SectionTitle>
        <Para>
          This module builds a complete, real, responsive marketing site for a fictional studio
          (Ridgeline Design Co.) end to end — a hero section, a navigation bar that collapses on mobile,
          a responsive content grid, and a footer. Every technique used is one already covered somewhere
          earlier in this 42-module track; this module's job is showing how they compose into one
          genuinely working page, not teaching anything new.
        </Para>
      </section>

      <Divider />

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The HTML Structure" />
        <SectionTitle>Semantic Structure First, Styling Second</SectionTitle>

        <CodeBox label="The full page skeleton — Phase 1 semantics">{`<body>
  <header class="site-header">
    <a href="/" class="logo">Ridgeline Design Co.</a>
    <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">☰</button>
    <nav class="main-nav">
      <ul>
        <li><a href="#work">Work</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero"> ... </section>
    <section id="work" class="project-grid"> ... </section>
    <section id="services" class="services"> ... </section>
    <section id="contact" class="contact"> ... </section>
  </main>

  <footer class="site-footer"> ... </footer>
</body>`}</CodeBox>

        <Para>
          The document is planned as landmarks first — <code>header</code>/<code>nav</code>/
          <code>main</code>/<code>section</code>/<code>footer</code> — exactly the Phase 1 semantic
          structure approach, before a single CSS rule exists.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Mobile-First Base Styles" />
        <SectionTitle>Starting From the Smallest Screen, Per the Mobile-First Module</SectionTitle>

        <CodeBox label="Base styles — written for mobile first, no media query yet">{`:root {
  --color-ink: #1a1a1a;
  --color-accent: #ff4757;
  --spacing-unit: 8px;
  --max-width: 1200px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  color: var(--color-ink);
  line-height: 1.6;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--spacing-unit) * 2);
}

.main-nav {
  display: none;  /* hidden by default on mobile — revealed by menu-toggle */
}

.main-nav.is-open {
  display: block;
}`}</CodeBox>

        <Para>
          This uses the custom properties from that module for a real, working design token system
          (<code>--color-accent</code>, <code>--spacing-unit</code>), and follows{' '}
          <code>box-sizing: border-box</code> from the Box Model module as the very first rule in the
          reset — the base every later measurement assumes.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Hero Section, With Flexbox" />
        <SectionTitle>Centering and Layout From the Flexbox Modules</SectionTitle>

        <CodeBox label="The hero — Flexbox centering, fluid typography with clamp()">{`.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: calc(var(--spacing-unit) * 8) calc(var(--spacing-unit) * 3);
}

.hero h1 {
  font-size: clamp(28px, 6vw, 56px);
  max-width: 20ch;
}

.hero p {
  font-size: clamp(16px, 2.5vw, 20px);
  max-width: 60ch;
  color: #666;
  margin-top: var(--spacing-unit);
}`}</CodeBox>

        <Para>
          <code>clamp()</code> from the Responsive Design module handles the heading and paragraph's
          font size scaling smoothly across every viewport width, with no discrete breakpoint jump
          needed just for typography.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Project Grid, With CSS Grid" />
        <SectionTitle>A Genuinely Responsive Grid With No Media Query at All</SectionTitle>

        <CodeBox label="auto-fill + minmax — the Grid module's real-layouts technique">{`.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  padding: calc(var(--spacing-unit) * 6) calc(var(--spacing-unit) * 3);
  max-width: var(--max-width);
  margin: 0 auto;
}

.project-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}`}</CodeBox>

        <Para>
          <code>repeat(auto-fill, minmax(260px, 1fr))</code> — directly from the CSS Grid in Practice
          module — reflows the number of columns automatically as the viewport changes, with zero
          media queries needed for this specific grid at all. The hover lift on{' '}
          <code>.project-card</code> uses <code>transform</code>, not <code>top</code>/<code>margin</code>,
          following the cheap-vs-expensive property guidance from the Transitions module.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Mobile Nav Toggle Breakpoint" />
        <SectionTitle>Where a Media Query Genuinely Is Needed</SectionTitle>

        <CodeBox label="The one place this build genuinely needs a breakpoint">{`@media (min-width: 768px) {
  .menu-toggle {
    display: none;   /* the hamburger button only exists below this width */
  }

  .main-nav {
    display: block;   /* the nav is simply always visible on wider screens */
  }

  .main-nav ul {
    display: flex;
    gap: calc(var(--spacing-unit) * 3);
    list-style: none;
  }
}`}</CodeBox>

        <Para>
          This is the Flexbox vs Grid module's decision framework applied for real: the overall page
          uses Grid for its two-dimensional project layout, Flexbox for the one-dimensional horizontal
          nav-link row — each reached for specifically where it fits, not out of habit. The 768px value
          itself was chosen the way the Responsive Design module recommends: by resizing this specific
          nav bar's actual content and finding where it starts to feel cramped as a horizontal row, not
          copied from a framework default.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Contact Form and Accessibility Pass" />
        <SectionTitle>Bringing Back Phase 1's Forms, Styled</SectionTitle>

        <CodeBox label="A real contact form, correctly labeled, with a visible focus state">{`<section id="contact" class="contact">
  <h2>Get in Touch</h2>
  <form action="/submit-contact" method="POST">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>

    <button type="submit">Send</button>
  </form>
</section>`}</CodeBox>

        <CodeBox label="Accessible focus states — from the CSS Accessibility module">{`input:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: none;
  }
}`}</CodeBox>

        <Callout type="tip">
          <strong>Every input keeps its real, associated label from Module 8</strong> — never replaced
          with placeholder text — and the <code>prefers-reduced-motion</code> query from the
          Accessibility module disables the hover-lift transition for users who have indicated they
          prefer reduced motion at the OS level.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Final Responsive Pass" />
        <SectionTitle>Testing Across the Full Range, Not Just a Few Presets</SectionTitle>

        <Para>
          The last step, matching the Responsive Design module's own advice, is dragging the browser
          window slowly across the entire width range — not just checking a fixed list of device
          presets — watching specifically for the moments the hero text wraps awkwardly, the project
          grid's column count changes, and the nav toggle switches between its mobile and desktop
          states, confirming each transition looks intentional rather than abrupt or broken.
        </Para>

        <Callout type="warning">
          <strong>A genuinely common real gap: testing only at exact breakpoint values, never the
          space just before or after one.</strong> A layout can look perfect at exactly 768px and 767px
          individually while still having an awkward, cramped moment at 750px that neither preset check
          would ever catch — continuous resizing is what catches this class of bug.
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
        <SectionTitle>A Freelancer's First Full Client Delivery, Built From Exactly This Pattern</SectionTitle>

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
            Scenario — Freelance developer, Seattle · First paid client project
          </div>

          <Para>
            A newly freelance developer delivers a small studio's marketing site — structurally almost
            identical to this module's build — and the client comes back a week later specifically
            praising how well it "just works" on their phone, without ever having asked for mobile
            support explicitly.
          </Para>

          <SubSubTitle>What actually earned that reaction</SubSubTitle>

          <Para>
            Nothing exotic — a mobile-first base, a single well-chosen breakpoint for the nav, Grid's{' '}
            <code>auto-fill</code>/<code>minmax()</code> handling the project layout's column count
            automatically at every width, and real semantic HTML that search engines and screen readers
            alike could parse confidently. The developer's own reflection: "the client had no idea any
            of these specific techniques existed — they just experienced a site that behaved correctly
            everywhere, which is the actual point of everything in this whole track."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Four Misconceptions About Building a Real Responsive Site</SectionTitle>

        {[
          {
            wrong: '"A responsive site needs a media query for every single component"',
            right: 'auto-fill combined with minmax() made the project grid genuinely responsive with zero media queries dedicated to it — reach for a breakpoint specifically where a component actually needs a structural change, like the nav collapsing into a hamburger menu, not everywhere by default.',
          },
          {
            wrong: '"Testing at the standard preset device widths in DevTools is sufficient responsive QA"',
            right: 'A layout can look correct at 768px and 767px individually while still having a cramped, awkward moment at 750px that neither preset catches — continuous resizing across the full range is what actually catches this class of bug.',
          },
          {
            wrong: '"Choosing Grid for the whole page is simpler than mixing Grid and Flexbox"',
            right: 'This build deliberately uses Grid for the two-dimensional project layout and Flexbox for the one-dimensional nav row — using only one tool everywhere often means fighting it for the layout it is not suited to, rather than reaching for whichever one actually fits each specific piece.',
          },
          {
            wrong: '"Accessibility features like focus-visible and prefers-reduced-motion are optional polish for a real client site"',
            right: 'They cost very little to add and directly affect real users — a visible focus state and respecting a user\'s reduced-motion preference are part of a genuinely complete, professional build, not optional extras.',
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
            q: 'In this build, why is Grid used for the project layout but Flexbox for the nav bar?',
            a: 'The project layout is genuinely two-dimensional (rows and columns of cards need to align in both directions), which is exactly what Grid is built for. The nav bar is a single row of links — a one-dimensional layout problem, which is exactly what Flexbox is built for. The choice follows the Flexbox vs Grid module\'s decision framework applied to real content, not personal preference.',
          },
          {
            q: 'How does repeat(auto-fill, minmax(260px, 1fr)) make the project grid responsive without a dedicated media query?',
            a: 'auto-fill tells Grid to fit as many 260px-minimum columns as the container width allows, and 1fr lets each column grow to fill any remaining space — the browser recalculates the column count continuously as the viewport changes, with no explicit breakpoint needed for this specific layout.',
          },
          {
            q: 'Why choose a mobile-first approach for this build rather than desktop-first?',
            a: 'Base styles target the smallest screen with no media query needed at all, and a single min-width query at 768px progressively adds the desktop nav layout — this tends to produce leaner CSS overall than starting from a full desktop layout and overriding it down for smaller screens.',
          },
          {
            q: 'Why does the final testing step involve continuously resizing the browser rather than only checking fixed device presets?',
            a: 'A layout can pass every fixed preset check while still having an awkward, cramped moment at some width in between two presets that were never explicitly tested — continuous resizing is the only way to catch that class of bug before a real user encounters it.',
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
        <SectionTitle>Mistakes Beginners Make Building a Full Responsive Site</SectionTitle>

        {[
          {
            q: 'Reaching for a media query breakpoint before checking if a CSS-native technique already solves it',
            a: 'The project grid needed zero dedicated media queries thanks to auto-fill/minmax() — always check whether Grid\'s own responsive capabilities, or clamp() for fluid typography, already solve the problem before reaching for a breakpoint.',
          },
          {
            q: 'Copying a breakpoint value from a different project without testing this specific layout\'s content',
            a: 'The 768px nav breakpoint in this build was chosen by testing THIS nav bar\'s actual content at a range of widths, not copied from a framework default — a borrowed breakpoint has no guarantee of fitting different content.',
          },
          {
            q: 'Adding hover-based interactions without considering touch devices',
            a: 'A hover-only interaction (like the project card lift) needs to also work reasonably on touch devices that have no true hover state — combined with respecting prefers-reduced-motion, this keeps the interaction genuinely accessible.',
          },
          {
            q: 'Treating the responsive pass as a final step done once, rather than testing throughout the build',
            a: 'Checking responsiveness only after the whole page is built makes it harder to isolate which specific section introduced a given layout bug — testing each section\'s responsiveness as it\'s built catches problems earlier and more cheaply.',
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
        <SectionTitle>Issues You Will Hit Building a Full Responsive Site — And Exactly Why</SectionTitle>

        {[
          {
            error: `The mobile nav toggle button remains visible even on a wide desktop viewport`,
            cause: 'The @media (min-width: 768px) block that hides .menu-toggle either has a typo in the selector or was placed before a later rule that re-shows it, letting a later, more specific or later-declared rule win.',
            fix: 'Confirm the media query selector exactly matches the toggle button\'s class, and that no later CSS rule outside the media query re-overrides its display property.',
          },
          {
            error: `The project grid shows only one column even on a wide screen`,
            cause: 'A parent container has a fixed, narrow max-width or width set inline, constraining the grid\'s available space regardless of the viewport\'s actual width — auto-fill responds to the GRID CONTAINER\'s width, not the raw viewport width.',
            fix: 'Check every ancestor of .project-grid for an unintentional width constraint, using DevTools\' box model inspector to see the grid container\'s actual rendered width.',
          },
          {
            error: `Focus outlines appear on mouse clicks as well as keyboard navigation, which some designers find visually noisy`,
            cause: 'Using :focus instead of :focus-visible — :focus applies on both mouse and keyboard interaction, while :focus-visible applies specifically when the browser determines a visible focus indicator is actually needed (primarily keyboard navigation).',
            fix: 'Use :focus-visible instead of :focus for interactive elements where a focus ring is meant to serve keyboard users specifically.',
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
        'A real responsive build starts from semantic HTML structure — landmarks and sections planned before any CSS exists, exactly as Phase 1 established.',
        'Mobile-first base styles, then progressive enhancement via min-width media queries, produces leaner CSS than a desktop-first, override-heavy approach.',
        'Grid and Flexbox are used for what each is actually suited to in the same page — Grid for the two-dimensional project layout, Flexbox for the one-dimensional nav row — not chosen out of habit.',
        'auto-fill combined with minmax() can make a grid genuinely responsive with zero additional media queries for that specific layout.',
        'Every form field keeps a real associated label, and focus-visible states plus prefers-reduced-motion respect real accessibility needs, not just visual polish.',
        'Final testing means continuously resizing across the full viewport range, not just checking a handful of fixed device presets — the gaps between presets are exactly where real bugs hide.',
      ]} />

      <Divider />

      {/* ── Completion ── */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${C}18, transparent)`,
          border: `1px solid ${C}44`, borderRadius: 14, padding: '32px 36px',
        }}>
          <p style={{
            fontSize: 10, color: C, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)', fontWeight: 800, margin: '0 0 12px',
          }}>
            🏗️ The Capstone Project
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1px',
            color: 'var(--text)', marginBottom: 16, fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>
            Two modules remain — best practices, then the full interview prep synthesis.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 24 }}>
            This build pulled together structure, layout, responsiveness, and accessibility from across
            the entire track into one real, working site. Module 41 closes out with the conventions and
            common mistakes that separate maintainable CSS from a stylesheet nobody wants to touch, and
            Module 42 — the capstone — synthesizes everything into interview-ready form.
          </p>
          <Link href="/learn/html-css/css-best-practices-common-mistakes" style={{ background: C, color: '#fff', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
            Module 41 → CSS Best Practices &amp; Common Mistakes
          </Link>
        </div>
      </section>
    </LearnLayout>
  )
}
