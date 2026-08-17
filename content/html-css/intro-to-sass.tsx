import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Intro to Sass — Variables, Nesting, Mixins — HTML & CSS | Chaduvuko',
  description:
    'The CSS preprocessor that came before CSS variables — nesting, mixins, and why many real codebases still use it today.',
}

const C = '#4285f4'

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

export default function IntroToSass() {
  return (
    <LearnLayout
      title="Intro to Sass — Variables, Nesting, Mixins"
      description="The CSS preprocessor that came before CSS variables — nesting, mixins, and why many real codebases still use it today."
      section="HTML & CSS — Module 36"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Preprocessor Actually Is" />
        <SectionTitle>Sass Compiles to Plain CSS — Nothing More, Nothing Less</SectionTitle>

        <Para>
          Sass (Syntactically Awesome StyleSheets) is a <strong>preprocessor</strong> — you write files
          in Sass's own extended syntax (<code>.scss</code>), and a build step compiles them into plain,
          ordinary CSS that ships to the browser. The browser itself has no idea Sass was ever involved;
          it only ever receives standard CSS.
        </Para>

        <CodeBox label="A tiny Sass file...">{`$primary-color: #4285f4;

.button {
  background: $primary-color;
  padding: 12px 20px;
}`}</CodeBox>

        <CodeBox label="...compiles to exactly this plain CSS">{`.button {
  background: #4285f4;
  padding: 12px 20px;
}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — $variables vs CSS Custom Properties" />
        <SectionTitle>Compile-Time vs Runtime — the Real Distinction</SectionTitle>

        <Para>
          The Custom Properties module covered native <code>--variable</code>/<code>var()</code> CSS
          variables in depth. Sass's <code>$variable</code> syntax looks similar but works completely
          differently under the hood — the difference is genuinely important, not cosmetic.
        </Para>

        <CodeBox label="Sass $variables — resolved at BUILD time, before the browser ever sees them">{`$spacing-unit: 8px;

.card {
  padding: $spacing-unit * 2;  // compiles to a fixed "padding: 16px;" — done, forever
}`}</CodeBox>

        <CodeBox label="CSS custom properties — resolved at RUNTIME, live in the browser">{`:root {
  --spacing-unit: 8px;
}
.card {
  padding: calc(var(--spacing-unit) * 2);
  /* Still "padding: 16px" visually — but the browser can genuinely
     recompute this if --spacing-unit changes later via JavaScript
     or a media query, with zero rebuild step involved */
}`}</CodeBox>

        <Callout type="tip">
          <strong>This is the entire practical decision between the two.</strong> A Sass variable is
          baked into the compiled CSS permanently at build time — it cannot respond to anything that
          happens in the browser afterward (a media query, a JS-driven theme toggle, a user preference).
          A CSS custom property genuinely lives in the browser and can be read, overridden, and reacted
          to at runtime. Many real projects use both together: Sass variables for values that truly never
          change after build (a fixed color palette used only inside Sass logic), custom properties for
          anything that needs to respond to runtime conditions (a dark-mode toggle, for example).
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Nesting" />
        <SectionTitle>Writing Selectors That Mirror Your HTML Structure</SectionTitle>

        <CodeBox label="Plain CSS — repeating the parent selector on every rule">{`.card { padding: 16px; }
.card .title { font-weight: 700; }
.card .title:hover { color: #4285f4; }
.card .footer { border-top: 1px solid #ddd; }`}</CodeBox>

        <CodeBox label="The same rules, nested in Sass">{`.card {
  padding: 16px;

  .title {
    font-weight: 700;

    &:hover {
      color: #4285f4;
    }
  }

  .footer {
    border-top: 1px solid #ddd;
  }
}`}</CodeBox>

        <Para>
          The <code>&amp;</code> symbol refers to the immediate parent selector — <code>&amp;:hover</code>{' '}
          compiles to <code>.title:hover</code>, not a new descendant selector. Nesting genuinely mirrors
          the visual/structural relationship in your HTML, which can make a stylesheet easier to navigate.
        </Para>

        <Callout type="warning">
          <strong>Over-nesting is a real, common problem, not just a style preference.</strong> Nesting
          five or six levels deep produces extremely long, extremely high-specificity compiled selectors
          — genuinely hard to override later, and directly working against the CSS Architecture module's
          advice to keep specificity low and predictable. A common guideline: avoid nesting more than
          2-3 levels deep in real production Sass.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Mixins" />
        <SectionTitle>Reusable Blocks of Styles, With Parameters</SectionTitle>

        <Para>
          A <strong>mixin</strong> is a named, reusable block of CSS declarations — optionally accepting
          arguments — that gets pasted inline wherever it's included, similar in spirit to a function.
        </Para>

        <CodeBox label="Defining and using a mixin">{`@mixin flex-center($direction: row) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: $direction;
}

.hero {
  @include flex-center;
}

.sidebar {
  @include flex-center($direction: column);
}`}</CodeBox>

        <CodeBox label="What both compile to — completely ordinary CSS">{`.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}`}</CodeBox>

        <Para>
          The <code>$direction: row</code> default parameter value means <code>@include flex-center;</code>{' '}
          with no arguments still works, falling back to <code>row</code> — exactly the same default-parameter
          idea that shows up in most programming languages.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Partials and @use" />
        <SectionTitle>Splitting a Large Stylesheet Into Organized Files</SectionTitle>

        <CodeBox label="Splitting variables/mixins into their own files, then combining them">{`// _variables.scss
$primary-color: #4285f4;
$spacing-unit: 8px;

// _mixins.scss
@mixin flex-center { display: flex; align-items: center; justify-content: center; }

// main.scss
@use 'variables' as v;
@use 'mixins' as m;

.card {
  padding: v.$spacing-unit * 2;
  @include m.flex-center;
}`}</CodeBox>

        <Para>
          Files prefixed with an underscore (<code>_variables.scss</code>) are <strong>partials</strong>{' '}
          — they are never compiled to their own separate CSS output file, only ever pulled into another
          file via <code>@use</code>. This is directly the same organizational instinct as the CSS
          Architecture module's advice on splitting large stylesheets into logical files.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Why Sass Still Matters Despite Native CSS Variables" />
        <SectionTitle>Compile-Time Logic Native CSS Still Cannot Do</SectionTitle>

        <Para>
          Native CSS has genuinely closed much of the historical gap Sass filled — custom properties
          cover many of the old variable use cases, and nesting itself is now landing natively in CSS in
          modern browsers. What native CSS still cannot do, and what keeps Sass relevant in many real
          production codebases: mixins with real parameterized logic, <code>@if</code>/<code>@each</code>{' '}
          control-flow directives for generating repetitive CSS programmatically, and mathematical
          operations resolved entirely at build time with zero runtime cost.
        </Para>

        <CodeBox label="Something only a preprocessor can do — generating a whole utility class set with a loop">{`@each $size in (4, 8, 12, 16, 24, 32) {
  .p-#{$size} { padding: #{$size}px; }
}
// Generates six complete, separate CSS rules — .p-4, .p-8, .p-12, etc. —
// from six lines of Sass, with no runtime cost or JavaScript involved`}</CodeBox>

        <Para>
          The <code>#{'{$size}'}</code> syntax above is Sass's <strong>interpolation</strong> — it drops
          a variable's value directly into a selector name or property value at compile time, something
          plain CSS custom properties cannot do at all (a custom property can only be used as a value,
          never spliced into a selector or property name itself).
        </Para>
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
        <SectionTitle>A Utility Class System Generated in 20 Lines, at a Chicago Design Agency</SectionTitle>

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
            Scenario — Design agency, Chicago · Design system build
          </div>

          <Para>
            A team building a shared design system needs a full spacing utility class set — margin and
            padding classes for every direction (top/right/bottom/left/all) across a defined spacing
            scale. Written by hand in plain CSS, that's dozens of nearly-identical rules to maintain.
          </Para>

          <CodeBox label="The entire spacing utility system, generated with Sass loops">{`$spacing-scale: (0, 4, 8, 12, 16, 24, 32, 48, 64);
$directions: (t: top, r: right, b: bottom, l: left);

@each $size in $spacing-scale {
  .p-#{$size} { padding: #{$size}px; }
  .m-#{$size} { margin: #{$size}px; }

  @each $short, $full in $directions {
    .p#{$short}-#{$size} { padding-#{$full}: #{$size}px; }
    .m#{$short}-#{$size} { margin-#{$full}: #{$size}px; }
  }
}`}</CodeBox>

          <SubSubTitle>What this actually saved</SubSubTitle>

          <Para>
            Roughly 90 individual CSS rules get generated from these 12 lines of Sass — and changing the
            spacing scale later (adding a new value, removing one) is a single-line edit to{' '}
            <code>$spacing-scale</code> rather than manually adding or removing dozens of hand-written
            rules. The team's own note: "this is exactly the kind of repetitive, mechanical generation
            work that a preprocessor is genuinely still better at than native CSS today."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Sass</SectionTitle>

        {[
          {
            wrong: '"Sass $variables and CSS custom properties are basically interchangeable"',
            right: 'Sass variables are resolved at BUILD time and baked permanently into the compiled CSS — they cannot respond to anything happening in the browser afterward. CSS custom properties are resolved at RUNTIME and can be read/overridden live, by JavaScript or a media query, with no rebuild needed.',
          },
          {
            wrong: '"Now that CSS has native nesting and custom properties, there is no real reason to still use Sass"',
            right: 'Native CSS has closed much of the historical gap, but mixins with real parameterized logic, @each/@if control-flow directives for generating repetitive rules programmatically, and build-time interpolation into selector names are still things only a preprocessor does.',
          },
          {
            wrong: '"Nesting selectors as deeply as the HTML structure allows is always good practice"',
            right: 'Deep nesting compiles to very long, very high-specificity selectors that become genuinely hard to override later — a common guideline is to avoid nesting more than 2-3 levels deep in real production Sass.',
          },
          {
            wrong: '"A Sass partial file (starting with an underscore) compiles to its own separate CSS file, just like a regular .scss file"',
            right: 'A partial is NEVER compiled to its own output file — it exists purely to be pulled into another file via @use, which is exactly what marks it as a partial in the first place.',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is a CSS preprocessor, and what does Sass actually produce?',
            a: 'A preprocessor is a build-time tool that compiles an extended syntax into plain, standard CSS — the browser never sees or understands Sass itself, only the compiled CSS output. Sass adds variables, nesting, mixins, and control-flow directives on top of ordinary CSS syntax.',
          },
          {
            q: 'What is the fundamental difference between a Sass $variable and a native CSS custom property?',
            a: 'A Sass variable is resolved entirely at build/compile time and baked permanently into the output CSS — it has no existence at all once compiled. A CSS custom property genuinely exists in the browser at runtime and can be read, overridden, or reacted to after the page has loaded, without any rebuild.',
          },
          {
            q: 'What does the & symbol mean inside a nested Sass rule?',
            a: 'It refers to the immediate parent selector at that nesting level — &:hover inside a .title { } block compiles to .title:hover, not a new descendant selector.',
          },
          {
            q: 'What is a Sass mixin, and how is it different from a function in a general-purpose programming language?',
            a: 'A mixin is a named, reusable block of CSS declarations, optionally parameterized, that gets included (pasted inline) wherever @include references it. It is conceptually similar to a function, but its "return value" is always a block of CSS declarations, not an arbitrary computed value.',
          },
          {
            q: 'Given that CSS now has native custom properties and nesting, why do many real production codebases still use Sass?',
            a: 'For capabilities native CSS still lacks — mixins with real parameterized logic, @each/@if control-flow for programmatically generating repetitive rules (like a full spacing utility class system from a handful of lines), and compile-time interpolation into selector names, none of which native CSS custom properties can replicate.',
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
        <SectionTitle>Sass Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Nesting selectors as deeply as the visual HTML hierarchy allows',
            a: 'Produces extremely long, extremely high-specificity compiled selectors that are genuinely difficult to override later — keep nesting to roughly 2-3 levels in real production code.',
          },
          {
            q: 'Using a Sass variable for a value that genuinely needs to change at runtime',
            a: 'A Sass variable is permanently baked into the compiled CSS — it cannot respond to a dark-mode toggle, a media query interaction, or anything else happening live in the browser. Use a CSS custom property for anything that needs runtime responsiveness.',
          },
          {
            q: 'Forgetting the underscore prefix on a partial file meant only to be imported elsewhere',
            a: 'Without the underscore, the file compiles to its own separate, likely unwanted, standalone CSS output file in addition to being pulled into whatever imports it.',
          },
          {
            q: 'Reaching for a complex @each/@if loop when a simple, explicit rule would be clearer',
            a: 'Generative Sass logic genuinely shines for large, repetitive rule sets (like a full spacing scale) — for a handful of one-off rules, plain explicit CSS is often more readable than an unnecessarily clever loop.',
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
        <SectionTitle>Issues You Will Hit With Sass — And Exactly Why</SectionTitle>

        {[
          {
            error: `Error: Undefined variable.`,
            cause: 'A $variable is referenced before it is declared, or declared in a different partial that was never actually @use\'d into the current file.',
            fix: 'Confirm the variable is declared before use, and that the file declaring it is properly imported via @use at the top of the file that references it.',
          },
          {
            error: `Error: Mixin doesn't exist.`,
            cause: 'A typo in the mixin name at the @include call site, or the file defining the @mixin was never @use\'d into the current file.',
            fix: 'Double check the exact mixin name spelling, and confirm the defining partial is imported.',
          },
          {
            error: `The compiled CSS output is nothing like what was expected, with deeply nested, oddly-specific selectors`,
            cause: 'Over-nesting in the Sass source — each level of nesting compiles into an increasingly long, increasingly specific combined selector.',
            fix: 'Flatten the nesting to 2-3 levels at most, using & only where it genuinely mirrors a real structural relationship (like a pseudo-class or a BEM modifier).',
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
        'Sass compiles to plain CSS at build time — the browser never sees Sass syntax directly, only the compiled output.',
        'The real distinction from CSS custom properties: Sass $variables are resolved at BUILD time and baked in permanently; custom properties are resolved at RUNTIME and can respond to live browser conditions.',
        'Nesting mirrors your HTML structure but compiles to increasingly specific selectors as depth increases — keep it to roughly 2-3 levels in production code.',
        'Mixins (@mixin/@include) are reusable, optionally parameterized blocks of CSS declarations, pasted inline wherever included.',
        'Partial files (prefixed with an underscore) are never compiled to their own standalone output — they exist only to be pulled into another file via @use.',
        'Sass remains genuinely useful today for what native CSS still cannot do: parameterized mixin logic, @each/@if-driven generation of repetitive rules, and compile-time interpolation into selector names.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Phase 6 begins here — Production &amp; Career Readiness, starting with responsive images and the
          performance techniques every real production page needs.
        </p>
        <Link href="/learn/html-css/responsive-images-performance" style={{ background: '#ff4757', color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 37 → Responsive Images &amp; Performance
        </Link>
      </div>
    </LearnLayout>
  )
}
