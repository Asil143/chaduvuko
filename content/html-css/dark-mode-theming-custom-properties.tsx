import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Dark Mode and Theming with Custom Properties — HTML & CSS | Chaduvuko',
  description: 'Build accessible light and dark themes with semantic CSS tokens, system preferences, and a user-controlled toggle.',
}

const C = '#4285f4'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const SubTitle = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12 }}>{children}</h3>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function DarkModeThemingCustomProperties() {
  return (
    <LearnLayout title="Dark Mode and Theming with Custom Properties" description="Build accessible light and dark themes with semantic CSS tokens, system preferences, and a user-controlled toggle." section="HTML & CSS — Lesson 31" readTime="35 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Prerequisites and Objective" />
        <SectionTitle>One Theme Model, Many Components</SectionTitle>
        <Para>Prerequisites: selectors, the cascade, color values, and CSS custom properties from the previous lesson. The objective is to make a small page follow a visitor&apos;s operating-system color preference, allow an explicit override, and keep every component styled through the same semantic tokens.</Para>
        <Para>A theme is not just swapping a black background for a white one. It includes text, borders, surfaces, focus rings, form controls, shadows, and sometimes illustrations. A design token gives each role a stable name; a theme changes the token values, not the component rules.</Para>
        <Callout type="tip">Start by inventorying the colors and surfaces in your page. If a component uses hard-coded colors everywhere, define the tokens first; otherwise dark mode turns into a fragile search-and-replace exercise.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Semantic Color Tokens" />
        <SectionTitle>Name Colors by Their Job, Not Their Appearance</SectionTitle>
        <Para><code>--ink</code> and <code>--paper</code> are descriptive, but names such as <code>--text</code>, <code>--surface</code>, and <code>--border</code> communicate how a value is used. That makes a theme change readable and avoids assumptions that every background is the same color.</Para>
        <CodeBox label="A compact token set for a learning dashboard">{`:root {
  color-scheme: light;
  --page: #f8fafc;
  --surface: #ffffff;
  --text: #172033;
  --muted-text: #475569;
  --border: #cbd5e1;
  --accent: #1457c5;
}

body {
  background: var(--page);
  color: var(--text);
}

.course-card {
  background: var(--surface);
  border: 1px solid var(--border);
}

.course-card__summary {
  color: var(--muted-text);
}

.course-card a {
  color: var(--accent);
}`}</CodeBox>
        <Para>Every component consumes a role, not a particular theme. A dashboard card, progress panel, and navigation bar can all use <code>--surface</code> while the token is changed centrally. Keep an eye on contrast when choosing the two palettes: a color pair that looks distinct is not automatically readable for small text.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Follow the System Preference" />
        <SectionTitle>Let the Browser Choose When There Is No Saved Override</SectionTitle>
        <Para>The <code>prefers-color-scheme</code> media feature exposes the visitor&apos;s system preference. Use it as the default rather than guessing. The <code>:root:not([data-theme])</code> selector is important: it ensures the operating-system rule only applies while the page has no explicit theme attribute.</Para>
        <CodeBox label="Base light theme and system dark preference">{`:root {
  color-scheme: light;
  --page: #f8fafc;
  --surface: #ffffff;
  --text: #172033;
  --muted-text: #475569;
  --border: #cbd5e1;
  --accent: #1457c5;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --page: #111827;
    --surface: #1f2937;
    --text: #f8fafc;
    --muted-text: #cbd5e1;
    --border: #475569;
    --accent: #93c5fd;
  }
}`}</CodeBox>
        <Para>The <code>color-scheme</code> property also tells the browser which native control palette to use for elements such as form controls. It does not theme your custom components; those still need to use the tokens.</Para>
        <Callout type="info">Keep the media query as a preference, not as the only way to switch themes. A visitor may choose a bright workspace at night or need a specific contrast setting regardless of their device setting.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Explicit Theme Overrides" />
        <SectionTitle>Give a Visitor&apos;s Choice Higher Priority</SectionTitle>
        <Para>Explicit attributes on the root element override the automatic palette. Put the declarations after the default values so the intent is easy to find, and keep the same token names in each block.</Para>
        <CodeBox label="Manual themes override the media preference">{`[data-theme="light"] {
  color-scheme: light;
  --page: #f8fafc;
  --surface: #ffffff;
  --text: #172033;
  --muted-text: #475569;
  --border: #cbd5e1;
  --accent: #1457c5;
}

[data-theme="dark"] {
  color-scheme: dark;
  --page: #111827;
  --surface: #1f2937;
  --text: #f8fafc;
  --muted-text: #cbd5e1;
  --border: #475569;
  --accent: #93c5fd;
}

:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}`}</CodeBox>
        <Para>Because the rules apply to the root element and its descendants inherit custom properties, component CSS stays unchanged. Test focus indicators and error states in both palettes too; theme tokens must not make interaction or status harder to perceive.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — An Accessible Theme Toggle" />
        <SectionTitle>Change State Without Rebuilding the Page</SectionTitle>
        <Para>Use a real button so keyboard users can operate it without extra event handling. The page can use a stable accessible name and <code>aria-pressed</code> to expose whether dark mode is active. The script below restores only recognized values and leaves the system preference alone when there is no saved choice.</Para>
        <CodeBox label="Markup for an operable toggle">{`<button id="theme-toggle" type="button" aria-pressed="false">
  Dark theme
</button>`}</CodeBox>
        <CodeBox label="Apply a saved choice and persist future toggles">{`const root = document.documentElement;
const button = document.querySelector('#theme-toggle');

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('theme');
} catch {
  // Storage may be unavailable; system preference still works.
}

if (savedTheme === 'light' || savedTheme === 'dark') {
  root.dataset.theme = savedTheme;
}

function isDarkTheme() {
  if (root.dataset.theme === 'dark') return true;
  if (root.dataset.theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function updateButton() {
  const isDark = isDarkTheme();
  button.setAttribute('aria-pressed', String(isDark));
}

updateButton();
button.addEventListener('click', () => {
  const nextTheme = isDarkTheme() ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  try {
    localStorage.setItem('theme', nextTheme);
  } catch {
    // The current page still changes even if it cannot be saved.
  }
  updateButton();
});`}</CodeBox>
        <Para>In production code, guard the query if this script can load on pages without the button. If the saved choice must apply before first paint, initialize it in a small script before the page&apos;s styles are painted, and account for your content-security policy. Do not store sensitive data in web storage; a theme preference is low-risk state, not an authentication mechanism.</Para>
        <Callout type="warning">Do not set <code>data-theme=&quot;light&quot;</code> in the HTML unconditionally: doing so prevents the system dark-mode rule from applying before JavaScript runs. Leave the attribute absent unless a saved or user-selected override exists.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Verify Contrast and Theme Behavior" />
        <SectionTitle>Review the Palette as a Set of Interface States</SectionTitle>
        <SubTitle>Review the whole interface, not just its page background</SubTitle>
        <Para>A theme passes only when the whole interface remains usable. Check body text, muted copy, links, keyboard focus, disabled controls, validation messages, charts, and images with transparent backgrounds. Use browser DevTools to inspect computed custom properties and emulate the preferred-color-scheme media setting.</Para>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: 'var(--text)' }}><caption style={{ textAlign: 'left', color: 'var(--muted)', marginBottom: 10 }}>A practical theme review matrix</caption><thead><tr>{['Check', 'What to verify', 'Common issue'].map(item => <th key={item} scope="col" style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{item}</th>)}</tr></thead><tbody>{[
          ['Text contrast', 'Body and small text remain legible on each surface.', 'Muted text becomes too faint in dark mode.'],
          ['Interactive states', 'Focus, hover, pressed, and disabled states are distinguishable.', 'Focus ring reuses a low-contrast surface color.'],
          ['Native controls', 'Inputs and menus follow the intended color scheme.', 'Custom background conflicts with native control colors.'],
          ['Preference behavior', 'System setting applies until a visitor chooses an override.', 'A hard-coded attribute masks the media query.'],
        ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>Do not use color as the only way to communicate meaning. A success message should also say that it succeeded, and an error should have text and an appropriate semantic relationship to its field. Dark mode does not fix a missing label or an inaccessible component.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Mistakes" />
        <SectionTitle>Theme Bugs That Hide Until Someone Uses the Page</SectionTitle>
        {[
          ['Hard-coding a color inside one component', 'A single component can remain white in dark mode while its neighbors change.', 'Route all reusable colors through semantic tokens and search for remaining literal colors in component CSS.'],
          ['Applying the system preference after an explicit choice', 'The media query can overwrite the visitor choice if it uses an equally broad selector or later conflicting declarations.', 'Scope automatic values to :root:not([data-theme]) and define explicit attribute themes separately.'],
          ['Treating color-scheme as a complete theme system', 'It influences browser-provided controls but does not recolor your own backgrounds, text, or borders.', 'Use custom properties for authored UI and set color-scheme for native controls.'],
          ['Saving every click without validating the stored value', 'Old or malformed storage values can create an unsupported theme state.', 'Accept only the known values light and dark, and retain the CSS system preference as the fallback.'],
        ].map(([mistake, cause, fix]) => <div key={mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}><strong style={{ color: 'var(--text)' }}>{mistake}</strong><p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Why it fails: {cause}</p><p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>Better approach: {fix}</p></div>)}
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Build a Theme That Survives Real Use</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 24 }}>
          <li>Take a page you have already built and replace repeated foreground, surface, border, and accent colors with semantic custom properties.</li>
          <li>Add a system dark preference that applies only when there is no manual theme override.</li>
          <li>Build a keyboard-operable toggle and test it with storage disabled or unavailable.</li>
          <li>Check focus, validation, disabled, and muted states in both palettes. Record any contrast issue and correct the token, not just one component.</li>
          <li>Reload under both operating-system preferences, then choose a theme manually and confirm that the explicit choice persists.</li>
        </ol>
        <Callout type="example">A useful review question: if you changed the palette tomorrow, would you edit two theme token blocks or hunt through every component? The first answer signals that the theme boundary is doing its job.</Callout>
      </section>

      <KeyTakeaways items={[
        'Semantic custom properties let components consume roles such as --surface and --text rather than hard-coded palette colors.',
        'Use prefers-color-scheme as the default and scope it so an explicit theme choice takes precedence.',
        'The color-scheme property helps native controls; custom interface elements still need token-driven styles.',
        'A real button plus an exposed pressed state makes a theme toggle understandable and keyboard-operable.',
        'Treat web storage as optional: validate values, handle unavailable storage, and do not store sensitive data there.',
        'Review contrast, focus, forms, and status messages in both themes; dark mode is an accessibility and design concern, not a color filter.',
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <Para>Next, return to motion: use transitions to make state changes feel smooth without sacrificing performance or accessibility.</Para>
        <Link href="/learn/html-css/css-transitions" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 32 → CSS Transitions</Link>
      </div>
    </LearnLayout>
  )
}
