import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Deploying a Static Site — GitHub Pages, Netlify, Vercel | HTML & CSS',
  description: 'Publish an HTML and CSS project, verify the live result, and understand static hosting on GitHub Pages, Netlify, and Vercel.',
}

const C = '#ff4757'
const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const SubTitle = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12 }}>{children}</h3>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, label }: { children: string; label?: string }) => <div style={{ marginBottom: 24 }}>{label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}<pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

export default function DeployingAStaticSite() {
  return (
    <LearnLayout title="Deploying a Static Site — GitHub Pages, Netlify, Vercel" description="Publish an HTML and CSS project, verify the live result, and understand static hosting on GitHub Pages, Netlify, and Vercel." section="HTML & CSS — Lesson 43" readTime="40 min">
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Prerequisites and Objective" />
        <SectionTitle>Move a Finished Project From Your Computer to a Public URL</SectionTitle>
        <Para>Prerequisites: a working HTML and CSS site, relative paths, Git basics, and responsive testing. This lesson takes a static project from a local folder to a public host, compares GitHub Pages, Netlify, and Vercel at a high level, and gives you a checklist for verifying the deployed result.</Para>
        <Para>A static site is made of files that can be served directly: HTML, CSS, JavaScript, images, fonts, and other assets. A host stores those files and serves them over HTTPS. Static hosting does not run your own server-side application code, so a contact form, account system, or database needs a separate service or backend.</Para>
        <Callout type="tip">Deploy a small site early. A public URL reveals path mistakes, missing files, mobile issues, and differences between your local machine and a real web server.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Prepare the Site" />
        <SectionTitle>Make the Published Directory Deliberate</SectionTitle>
        <Para>For a plain HTML project, decide which folder contains the files the host should publish. A simple project might keep the entry page at the root and static assets in named directories:</Para>
        <CodeBox label="A small static-site structure">{`study-site/
  index.html
  about.html
  styles/
    site.css
  images/
    classroom.webp
  scripts/
    menu.js`}</CodeBox>
        <Para>Use clear file names, check every link, and remove local-only paths such as a file from your Downloads folder. If a browser can load <code>index.html</code> locally but not through a local web server, fix the path before deployment.</Para>
        <CodeBox label="Prefer paths relative to the project root">{`<!-- index.html -->
<link rel="stylesheet" href="./styles/site.css">
<img src="./images/classroom.webp" alt="Learners working together">
<a href="./about.html">About the project</a>`}</CodeBox>
        <Para>Relative paths are especially useful for project sites that may live beneath a repository-name path. A path beginning with <code>/</code> is resolved from the domain root and can point somewhere different when the site is hosted below a prefix. Test the final base path for the host you choose.</Para>
        <CodeBox label="A small stylesheet that applies to the published page">{`:root {
  color-scheme: light;
  font-family: system-ui, sans-serif;
  color: #172033;
  background: #f8fafc;
}

body {
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

a:focus-visible {
  outline: 3px solid #1457c5;
  outline-offset: 3px;
}`}</CodeBox>
        <Callout type="warning">A static host serves only the output you publish. If your form points to a route that has no server or form handler, it will not magically send an email or save a response.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Commit a Known-Good Version" />
        <SectionTitle>Keep the Deployment Source Reviewable</SectionTitle>
        <Para>Put the site in a Git repository, inspect what will be published, and commit a working version. Do not include editor caches, local credentials, or unrelated files. HTML and CSS are public once deployed, so never put passwords, API secrets, private data, or keys in a source file.</Para>
        <CodeBox label="Review and commit the static project">{`git status

git add index.html about.html styles/ images/ scripts/
git diff --cached --stat
git commit -m "Prepare responsive study site for deployment"
git push`}</CodeBox>
        <Para>Commands depend on your repository setup and branch. The important habit is to review the staged changes before publishing. Open the repository on its hosting provider and confirm the expected files and recent commit are present.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Choose a Static Host" />
        <SectionTitle>Pick Based on Workflow, Not Brand Hype</SectionTitle>
        <Para>All three options can publish static files, but their setup and workflow differ. Settings and product capabilities can change, so use each provider&apos;s current documentation for exact steps, limits, and UI labels.</Para>
        <SubTitle>Compare the workflows at a high level</SubTitle>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, color: 'var(--text)' }}><caption style={{ textAlign: 'left', color: 'var(--muted)', marginBottom: 10 }}>A high-level comparison for a small HTML and CSS project</caption><thead><tr>{['Host', 'Common workflow', 'Watch for'].map(item => <th key={item} scope="col" style={{ textAlign: 'left', padding: 12, borderBottom: '1px solid var(--border)' }}>{item}</th>)}</tr></thead><tbody>{[
          ['GitHub Pages', 'Publish static files from a repository using the project’s Pages settings or supported workflow.', 'A repository project site can be served below a path prefix; root-relative asset links may need adjustment.'],
          ['Netlify', 'Connect a repository or upload a static output folder; changes can trigger preview and production deployments.', 'Set the correct publish directory, and use a form handler or backend if the site needs submissions.'],
          ['Vercel', 'Connect a repository and deploy its static output; branch changes commonly get preview deployments.', 'Confirm the project root and build/output settings match a plain static project or its framework.'],
        ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 12, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
        <Para>For plain files, the build step may simply be absent and the published directory may be the project root. For a toolchain that generates a separate output folder, publish that generated output instead. Do not invent a build command: use the command already defined by the project and verify its output folder locally.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Deploy and Inspect" />
        <SectionTitle>Connect the Repository, Set the Output, Publish</SectionTitle>
        <Para>The exact interface varies, but the deployment decision is the same: select the repository, choose its production branch, identify the project root, and specify a build command and publish directory only when the project needs them. Save the settings and wait for the provider to report a successful deployment.</Para>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 24 }}>
          <li>Connect the intended repository and branch, checking that the provider is authorized to read it.</li>
          <li>Choose the directory that contains the deployable files. For a plain root-level HTML site, this is usually the folder with <code>index.html</code>.</li>
          <li>Use the project&apos;s actual build command if one exists; otherwise do not add a build step that the site does not need.</li>
          <li>Wait for the deployment to finish, open the assigned public URL, and verify that the expected version is live.</li>
          <li>Make a tiny, reversible content edit, commit it, and confirm the host deploys the new version from the chosen branch.</li>
        </ol>
        <CodeBox label="The browser should be able to request the deployed files">{`GET /index.html
GET /styles/site.css
GET /images/classroom.webp

# Check the browser Network panel for:
# - successful document and asset responses
# - the expected content type for CSS and images
# - no asset request accidentally sent to the wrong path`}</CodeBox>
        <Para>If the deployment fails, read its build or publish log and identify the first actionable error. Check whether the provider is building the right folder, whether the entry page exists in the output, and whether a locally required file was excluded from Git.</Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Verify the Live Site" />
        <SectionTitle>Test the Public Result, Not Only the Build Status</SectionTitle>
        <Para>A green deployment indicator confirms a publish process completed; it does not prove that every URL, image, layout, or interaction works. Test the public site in a fresh browser session and on a narrow viewport. Open nested pages directly, not only by clicking from the home page.</Para>
        <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 24 }}>
          <li>Check the home page, nested pages, CSS, images, fonts, and navigation links.</li>
          <li>Reload a nested URL and confirm the host serves the intended file instead of an unexpected not-found page.</li>
          <li>Resize the viewport, test keyboard navigation, and verify visible focus and readable contrast.</li>
          <li>Inspect the browser console and Network panel for failed requests or unexpected errors.</li>
          <li>Check the page title, metadata, spelling, and any forms or contact links that appear to promise an action.</li>
          <li>Confirm HTTPS and the intended public URL before sharing it.</li>
        </ul>
        <Para>Static hosts may cache files, and browsers may retain cached assets too. When a recent change appears missing, first confirm the deployment points to the expected commit, then check the response and cache behavior before making duplicate edits.</Para>
        <Callout type="info">A static HTML form needs a real handler to process submissions. Clearly explain what happens to a visitor&apos;s information and avoid collecting personal data that the project does not need.</Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common Deployment Mistakes" />
        <SectionTitle>Find the Boundary Between Local and Published</SectionTitle>
        {[
          ['Publishing the project root instead of the generated output', 'The host can deploy successfully while serving a folder that does not contain the built entry page.', 'Build locally if required, inspect the output directory, and configure the host to publish that exact output.'],
          ['Using a root-relative asset path on a project site', 'The browser requests the file from the domain root rather than under the repository site prefix.', 'Use paths appropriate to the deployment base path and test the public URL, not only local root hosting.'],
          ['Assuming a successful deploy means every page works', 'A host can serve index.html while a nested link, image, or stylesheet still returns a missing-file response.', 'Open direct nested URLs and inspect the Network panel for all critical assets.'],
          ['Publishing secrets or relying on a static page for backend work', 'Source files are visible to visitors, and static hosting cannot run an arbitrary server-side form or database operation.', 'Remove credentials from the repository and connect any required backend or form service deliberately.'],
        ].map(([mistake, cause, fix]) => <div key={mistake} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}><strong style={{ color: 'var(--text)' }}>{mistake}</strong><p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Why it fails: {cause}</p><p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>Better approach: {fix}</p></div>)}
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice" />
        <SectionTitle>Ship a Small Site and Verify It Like a Visitor</SectionTitle>
        <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 24 }}>
          <li>Prepare a two-page static site with an image, stylesheet, accessible navigation, and a clear page title.</li>
          <li>Commit the files and inspect the staged change list for local-only files or credentials before pushing.</li>
          <li>Deploy to one of the listed hosts, recording the repository, branch, project root, build step, and publish directory you chose.</li>
          <li>Test the live home page, a nested page opened directly, and every asset at both desktop and mobile widths.</li>
          <li>Make one intentional content change, publish it, and confirm the public URL reflects the expected commit.</li>
        </ol>
        <Callout type="example">For your final check, ask a classmate to open the link on a phone and navigate without instructions. Their first failed request or confusing interaction is a useful production bug report.</Callout>
      </section>

      <KeyTakeaways items={[
        'A static host serves published files; it does not automatically run a server, database, or form handler.',
        'Choose the correct project root, build command, and output directory for the files the host should serve.',
        'Relative paths and a host-specific base path determine whether assets work under a repository prefix.',
        'Git review keeps deployment source deliberate, and public files must never contain secrets.',
        'A successful build is not a full QA result: test nested routes, images, CSS, keyboard use, responsive layouts, and browser errors.',
        'Check current provider documentation for exact configuration because product settings and workflows can change.',
      ]} />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <Para>Now bring the track together in a complete responsive website: plan the structure, implement the layout, and test the finished experience.</Para>
        <Link href="/learn/html-css/building-a-responsive-website" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 44 → Building a Complete Responsive Website</Link>
      </div>
    </LearnLayout>
  )
}
