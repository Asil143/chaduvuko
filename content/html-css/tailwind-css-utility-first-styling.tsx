import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Tailwind CSS — Utility-First Styling — HTML & CSS | Chaduvuko',
  description: 'Compose responsive, consistent interfaces with Tailwind CSS utility classes while keeping markup readable and accessible.',
}

const C = '#4285f4'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const SubTitle = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12 }}>{children}</h3>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function TailwindCssUtilityFirstStyling() {
  return (
    <LearnLayout title="Tailwind CSS — Utility-First Styling" description="Compose responsive, consistent interfaces with Tailwind CSS utility classes while keeping markup readable and accessible." section="HTML & CSS — Lesson 38" readTime="40 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Prerequisites and Objective" />
        <SectionTitle>Style an Interface by Composing Small Decisions</SectionTitle>
        <Para>Prerequisites: HTML semantics, CSS selectors, the box model, responsive design, and the cascade. This lesson introduces Tailwind CSS as a way to express many styling decisions with small, single-purpose classes in the markup. By the end, you will build a responsive learning-resource card, understand how the utility stylesheet is produced, and know when a component or ordinary CSS is clearer.</Para>
        <Para>In conventional CSS, a class such as <code>.resource-card</code> can collect many declarations in a stylesheet. In a utility-first workflow, the markup might instead combine utilities for display, spacing, border, color, and typography. The goal is not to eliminate CSS knowledge: the utilities are a vocabulary built on the same CSS properties and layout rules you already learned.</Para>
        <Callout type="tip">Learn what the utility does, not only its name. If <code>grid</code>, <code>gap-6</code>, or <code>sm:grid-cols-2</code> is confusing, translate it back to the CSS concept before reaching for more classes.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Setup and Generated CSS" />
        <SectionTitle>Utilities Are Source Code for a Stylesheet</SectionTitle>
        <Para>Tailwind scans project files for class names and produces CSS for the utilities it finds. A project therefore needs a compatible build integration. The setup differs by Tailwind major version and framework: current projects may import Tailwind through their CSS entry point, while older projects commonly use different directives and configuration. Follow the official installation guide for the exact toolchain rather than copying a setup from another project.</Para>
        <CodeBox label="A modern Tailwind CSS entry point">{`/* src/input.css — use the setup documented for your Tailwind version */
@import "tailwindcss";`}</CodeBox>
        <Para>Your build tool processes that source stylesheet and emits browser-readable CSS. The browser does not understand Tailwind class names as special syntax; it receives ordinary CSS rules generated for the utilities your source files use. This matters when debugging: inspect the final stylesheet and computed styles just as you would with hand-written CSS.</Para>
        <Callout type="warning">Do not copy a configuration snippet without checking its version. Tailwind has changed its installation and configuration conventions between major releases, and a valid older setup can fail in a new project.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Compose a Responsive Card" />
        <SectionTitle>Build From the Smallest Viewport Up</SectionTitle>
        <Para>Start with semantic HTML and the narrow-screen layout. Then add breakpoint-prefixed utilities when the content and available space call for a different arrangement. In Tailwind, responsive variants such as <code>sm:</code> apply a utility at and above a breakpoint; they are mobile-first enhancements, not named device presets.</Para>
        <CodeBox label="A resource card grid with a responsive two-column layout">{`<main class="mx-auto max-w-5xl px-4 py-10">
  <h1 class="text-3xl font-bold text-slate-900">
    Front-end study resources
  </h1>
  <p class="mt-3 max-w-2xl text-slate-600">
    Short guides and practice projects for your next build.
  </p>

  <section
    aria-label="Featured resources"
    class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
  >
    <article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-sm font-semibold text-blue-700">Practice</p>
      <h2 class="mt-2 text-xl font-bold text-slate-900">
        Build a responsive course card
      </h2>
      <p class="mt-3 text-slate-600">
        Apply Grid, spacing, and readable type to real content.
      </p>
      <a class="mt-5 inline-flex font-semibold text-blue-700 underline"
         href="./responsive-card.html">
        Open the exercise
      </a>
    </article>
  </section>
</main>`}</CodeBox>
        <Para>The class list follows a useful reading order: layout, width, spacing, typography, color, then state or responsive variants. The exact order does not alter the cascade, but consistent grouping makes review easier. The link still needs meaningful text and a real destination; utility classes do not provide semantics.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Variants and States" />
        <SectionTitle>Express Interaction Without Hiding the State Change</SectionTitle>
        <Para>Variants apply a utility conditionally, for example on hover, keyboard focus, or at a responsive breakpoint. A variant does not create an interaction by itself; the right HTML element and visible state still matter. A link navigates, a button performs an action, and a focus ring helps keyboard users locate the current control.</Para>
        <CodeBox label="A clear focus state and hover treatment">{`<a
  href="./projects.html"
  class="inline-flex rounded-md bg-blue-700 px-4 py-2
         font-semibold text-white hover:bg-blue-800
         focus-visible:outline-2 focus-visible:outline-offset-2
         focus-visible:outline-blue-700"
>
  Browse projects
</a>`}</CodeBox>
        <Para>Class variants make state-specific styles close to the element they affect. Still verify the output in a browser: color contrast, focus visibility, target size, and reduced-motion behavior remain your responsibility. If an interaction needs JavaScript, the utility framework does not replace that logic.</Para>
        <Callout type="info">Tailwind has a dark-mode variant, but how that variant is triggered can depend on the project configuration and version. If you need a saved manual theme, define that behavior deliberately and keep it consistent with the CSS custom-property theme pattern from the previous lesson.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Reuse and Readability" />
        <SectionTitle>Choose the Right Boundary for Repeated Markup</SectionTitle>
        <Para>Repeating a few utilities across distinct elements is usually fine. When the same long class list is copied many times, consider a component in your framework or a carefully named CSS component class. A reusable component can centralize markup, accessibility behavior, and variants; a class list copied into many files cannot.</Para>
        <SubTitle>A quick boundary for choosing an abstraction</SubTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: 'var(--text)' }}><caption style={{ textAlign: 'left', color: 'var(--muted)', marginBottom: 10 }}>Deciding where a repeated style belongs</caption><thead><tr>{['Situation', 'Good first choice', 'Why'].map(item => <th key={item} scope="col" style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{item}</th>)}</tr></thead><tbody>{[
          ['One-off layout or spacing choice', 'Utility classes', 'The decision stays near the element using it.'],
          ['Repeated UI with shared behavior', 'Reusable component', 'Markup, accessibility, and styling can evolve together.'],
          ['Global element defaults or complex selector logic', 'Plain CSS', 'The stylesheet can express relationships more clearly.'],
          ['Dynamic user-provided values', 'Validated style or CSS variable', 'Do not construct class names from arbitrary input.'],
        ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>In component-based applications, class strings can become hard to maintain when they are built through unsafe string concatenation. A conditional style map with complete literal class names is more reliable because the build scanner can find each possible utility.</Para>
        <CodeBox label="Keep class candidates complete and discoverable">{`const toneClasses = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800',
  neutral: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
};

function buttonClasses(tone) {
  return 'rounded-md px-4 py-2 font-semibold ' + toneClasses[tone];
}`}</CodeBox>
        <Para>This is pseudocode for the pattern, not a complete component: add types and validate <code>tone</code> in your framework. Avoid code such as <code>&quot;bg-&quot; + color + &quot;-700&quot;</code> when the scanner cannot see the possible final class names. If values truly need to be dynamic, use a validated inline style or a CSS custom property instead.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Review the Trade-offs" />
        <SectionTitle>Utility-First Is a Workflow, Not a Universal Rule</SectionTitle>
        <Para>Tailwind can make responsive styling fast and consistent, especially when a team shares design tokens and components. Its trade-offs are real: dense markup can be difficult to scan, the build pipeline must be understood, and extending the design system requires team decisions. Plain CSS remains a good choice for global rules, complex selectors, reusable animations, and styling that reads more clearly in a stylesheet.</Para>
        <Para>Compare a class-heavy paragraph with a well-named component class; neither is automatically better. Consider whether the styling is one-off or shared, whether a component owns the behavior, and whether a teammate can recognize the design intent. Avoid introducing both utility framework and ad-hoc CSS conventions without documenting which layer owns each rule.</Para>
        <Callout type="example">For a one-off responsive resource list, utility classes may be direct and readable. For a branded callout repeated across many routes, a shared component that owns its semantic markup and variants is usually easier to change consistently.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Mistakes" />
        <SectionTitle>Keep the Build and Markup Predictable</SectionTitle>
        {[
          ['Copying setup instructions from a different major version', 'The package, stylesheet entry point, or configuration conventions may no longer match the project.', 'Check the official installation guide for the exact framework and Tailwind version already in use.'],
          ['Building utility names from fragments at runtime', 'The source scanner may not see the complete candidate class, so the generated CSS rule is absent.', 'Use complete class strings in a static mapping, or use an inline value or custom property for genuinely dynamic data.'],
          ['Putting an entire design system into one unstructured class list', 'A long list can hide repeated patterns, accessibility behavior, and the design meaning behind a component.', 'Extract repeated UI into a component or a small, documented CSS abstraction when that improves clarity.'],
          ['Assuming a utility framework makes a control accessible', 'Visual classes do not provide a label, keyboard behavior, correct semantics, or sufficient contrast.', 'Choose the correct HTML element first, then test semantics, focus, contrast, and responsive behavior.'],
        ].map(([mistake, cause, fix]) => <div key={mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}><strong style={{ color: 'var(--text)' }}>{mistake}</strong><p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Why it fails: {cause}</p><p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>Better approach: {fix}</p></div>)}
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Build a Small Interface, Then Inspect the Result</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 24 }}>
          <li>In a starter project, follow the version-matched official setup instructions and confirm that a generated stylesheet loads in the browser.</li>
          <li>Build a semantic study-resource card and a one-column list that becomes two columns when the content has room.</li>
          <li>Add a visible keyboard focus state and check the text and accent contrast against each background.</li>
          <li>Extract the repeated card into a reusable component or CSS class, then explain why that boundary is easier to maintain than copying the class list.</li>
          <li>Try a dynamically selected visual variant using a mapping of complete class strings. Confirm that each class appears in the generated output.</li>
        </ol>
        <Callout type="tip">Use browser DevTools to inspect a utility class&apos;s generated rule. Translating it back into the CSS property is a good way to reinforce both the framework and the underlying layout model.</Callout>
      </section>

      <KeyTakeaways items={[
        'Tailwind CSS is a utility-first workflow that generates ordinary CSS from class names found in project source files.',
        'Utilities express familiar CSS concepts; understanding layout, cascade, and responsive design remains essential.',
        'Responsive variants are mobile-first enhancements, and the layout should begin with the narrow-screen baseline.',
        'Build and configuration steps vary across Tailwind versions and frameworks; use the official matching setup guide.',
        'Prefer reusable components or CSS abstractions when repeated markup and behavior become clearer at that boundary.',
        'Static class mappings, semantic HTML, keyboard focus, contrast, and browser testing remain important.',
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <Para>Next, tune real images for different screens and connection conditions before moving toward deployment.</Para>
        <Link href="/learn/html-css/responsive-images-performance" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 39 → Responsive Images &amp; Performance</Link>
      </div>
    </LearnLayout>
  )
}
