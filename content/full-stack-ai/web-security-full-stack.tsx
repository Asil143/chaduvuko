import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function WebSecurityFullStack() {
  return (
    <LearnLayout title="Web Security for Full-Stack Developers — XSS, CSRF and CORS" description="Prevent cross-site scripting, cross-site request forgery and injection, configure CORS and security headers, and handle secrets safely." section="Full-Stack Development with AI — Lesson 09" readTime="40 min">
      <Part n={1} label="Think in trust boundaries" title="Security Is About Who Can Trust Which Data">
        <P>A full-stack app moves information through a browser, a server, and a database. Each boundary changes what the application can safely assume. A browser can be modified by its user, an HTTP request can be constructed without your interface, and data already stored may contain old or unexpected values. Treat external input as untrusted until the server has validated it and checked that the caller may perform the requested action.</P>
        <P>We will use a study planner to discuss common web risks: cross-site scripting (XSS), cross-site request forgery (CSRF), injection, unsafe cross-origin access, exposed secrets, and missing authorization. The goal is not to memorise acronyms; it is to identify where data came from, what it can influence, and which control belongs at that boundary.</P>
        <Table head={['Risk', 'Boundary to examine', 'Defensive habit']} rows={[
          ['XSS', 'Untrusted text rendered as HTML or script-capable content', 'Use safe text rendering and sanitise only when rich HTML is a product requirement.'],
          ['CSRF', 'A browser sends an authenticated state-changing request', 'Use appropriate cookie settings and a deliberate CSRF defence.'],
          ['Injection', 'Input is composed into a query or command', 'Use parameterized interfaces and constrained input.'],
          ['Authorization failure', 'A signed-in user requests another user’s record', 'Check ownership and permissions on every server operation.'],
          ['Secret exposure', 'Private credentials cross into browser-delivered code', 'Keep secrets in server configuration and restrict their access.'],
        ]} />
        <Callout type="info">Authentication answers &quot;who is making this request?&quot; Authorization answers &quot;may this identity do this action to this resource?&quot; A secure route generally needs both.</Callout>
      </Part>

      <Part n={2} label="Cross-site scripting" title="Render User Content as Text, Not Executable Markup">
        <P>React renders ordinary string values as text, which avoids treating that string as HTML. Risk increases when an app asks the browser to interpret untrusted content as markup, embeds data in an unsafe context, or uses an unsafe library. Avoid <code>dangerouslySetInnerHTML</code> for user content. If rich text is essential, use a well-maintained HTML sanitizer with an explicit allowlist and review its behavior for the exact output context.</P>
        <P>Encoding is context-specific. A value safe as visible text is not automatically safe inside a URL, a script block, CSS, or an HTML attribute. Prefer framework APIs that preserve the intended context, validate URL schemes when accepting links, and avoid constructing executable code from user input.</P>
        <Code lang="tsx" file="components/SessionNote.tsx" code={`type SessionNoteProps = { author: string; note: string; profileUrl: string }

export function SessionNote({ author, note, profileUrl }: SessionNoteProps) {
  const safeProfileUrl = profileUrl.startsWith("/students/") ? profileUrl : "/students"

  return (
    <article>
      <a href={safeProfileUrl}>{author}</a>
      <p>{note}</p>
    </article>
  )
}`} />
        <P>The note is rendered as text rather than injected markup. The URL check is intentionally narrow; a real application should parse and validate destinations according to its routing and link policy, not assume a string prefix is a universal URL security check.</P>
        <Callout type="warning">Do not remove framework escaping to make user content &quot;render correctly&quot;. If the product requires formatted text, define the allowed markup and sanitise it before rendering.</Callout>
      </Part>

      <Part n={3} label="Injection" title="Keep Data Separate from Query Structure">
        <P>SQL injection occurs when untrusted input is combined with query syntax. Parameterized queries preserve the distinction between the query and its values. An ORM usually provides parameterized operations for ordinary queries, but raw-query escape hatches still need careful review. The same principle applies to shell commands, template engines, and other interpreters: do not build executable syntax by concatenating input.</P>
        <Code lang="typescript" file="server/sessions.ts" code={`type SessionRow = { id: string; title: string; studentId: string }

type Query = {
  query<T>(sql: string, values: readonly unknown[]): Promise<{ rows: T[] }>
}

export async function findSessionsForStudent(db: Query, studentId: string): Promise<SessionRow[]> {
  const result = await db.query<SessionRow>(
    "SELECT id, title, student_id AS \\\"studentId\\\" FROM study_sessions WHERE student_id = $1",
    [studentId],
  )
  return result.rows
}`} />
        <P>The placeholder syntax depends on the database driver; follow that driver's parameter API rather than copying the marker from an unrelated library. This example also scopes the query by a server-provided student identity. A safely parameterized query can still disclose data if the authorization condition is missing.</P>
        <Callout type="tip">Validation and parameterization solve different problems. Validation checks whether a value is acceptable; parameterization prevents that value from becoming query syntax.</Callout>
      </Part>

      <Part n={4} label="Request forgery" title="Protect Cookie-Authenticated State Changes">
        <P>Browsers automatically attach matching cookies to requests. CSRF takes advantage of that behavior to make a signed-in browser send an unwanted state-changing request. Use secure session-cookie attributes such as <code>HttpOnly</code>, <code>Secure</code> on HTTPS, and an appropriate <code>SameSite</code> policy. These attributes are useful controls, but cookie policy alone is not a complete CSRF design for every application and deployment.</P>
        <P>For cookie-authenticated mutations, follow the framework's CSRF protections or implement a well-reviewed token strategy, verify the expected origin where appropriate, and avoid state changes through GET. CORS is not a CSRF defence: it controls whether browser scripts can read certain cross-origin responses, not whether every cross-site request can be sent.</P>
        <Steps items={[
          'Identify which endpoints accept browser credentials automatically.',
          'Keep read-only requests free of side effects and use explicit mutation methods.',
          'Use secure cookie attributes and the framework’s recommended CSRF mechanism.',
          'Check origin or referer signals as an additional defence when appropriate to the deployment.',
          'Test the actual browser and proxy setup; security depends on the whole request path.',
        ]} />
        <Callout type="example">A student clicking a malicious link should not silently change the email address on their account. Require a deliberate authenticated mutation protected by the application’s CSRF strategy.</Callout>
      </Part>

      <Part n={5} label="Cross-origin access" title="Configure CORS for Known Browser Clients">
        <P>Cross-Origin Resource Sharing (CORS) is a browser mechanism that governs whether JavaScript from one origin may access a response from another origin. It is not authentication, authorization, a firewall, or a general block on all cross-site requests. A server should authorize each request independently of its CORS headers.</P>
        <P>When an API needs credentialed browser access, list the specific trusted origins and methods that are actually needed. Do not combine credentialed access with a wildcard origin. Keep development and production origin configuration separate, and remember that non-browser clients are not constrained by browser CORS enforcement.</P>
        <Code lang="typescript" file="server/cors.ts" code={`const allowedOrigins = new Set([
  "https://app.example.com",
  "https://preview.example.com",
])

type CorsDecision = { allowOrigin?: string; allowCredentials: boolean }

export function corsDecision(requestOrigin: string | null): CorsDecision {
  if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
    return { allowCredentials: false }
  }

  return { allowOrigin: requestOrigin, allowCredentials: true }
}

export function applyCorsHeaders(headers: Headers, decision: CorsDecision) {
  if (decision.allowOrigin) {
    headers.set("Access-Control-Allow-Origin", decision.allowOrigin)
    headers.set("Access-Control-Allow-Credentials", "true")
    headers.append("Vary", "Origin")
  }
  return headers
}`} />
        <P>This small helper illustrates origin allow-listing; a real server must also answer preflight requests with the required methods and headers and must use its framework's response lifecycle correctly. The example origins are placeholders, not configuration values to copy into a real deployment.</P>
      </Part>

      <Part n={6} label="Headers and secrets" title="Reduce Exposure with Safe Defaults">
        <P>Security headers can reduce the impact of some mistakes. A Content Security Policy (CSP) can restrict resource sources and script execution; other headers can prevent content-type guessing or control framing. Start from the framework's current documentation and the resources your application actually needs. An overly broad policy gives little protection, while a policy copied blindly can break the product.</P>
        <P>Secrets such as database credentials, signing keys, and third-party API tokens belong in server-side environment configuration or a managed secret store. A variable exposed with a public-client prefix, a value imported into a client component, or a key included in a browser bundle is no longer secret. Restrict permissions, rotate credentials after suspected exposure, and avoid logging them.</P>
        <Code lang="typescript" file="next.config.ts" code={`import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ]
  },
}

export default nextConfig`} />
        <P>These headers are an illustrative baseline, not a complete security policy. Choose framing behavior based on whether your app must be embedded, and configure CSP using the framework guidance for your rendering and inline-script needs. Avoid inventing a one-size-fits-all policy.</P>
        <Callout type="warning">Never commit a real key to the repository, even in a private project. If a credential is exposed, revoke or rotate it and investigate logs and access rather than merely deleting the visible line.</Callout>
      </Part>

      <Part n={7} label="Authorization and review" title="Check the Caller for Every Resource Operation">
        <P>Requiring a signed-in user does not prove that the user owns the requested record. Every read, update, and delete must establish the relationship between the authenticated identity and the resource. Apply ownership filters in the database query where practical, and return a response that does not reveal another user's private record.</P>
        <P>Security review is a repeating engineering activity. Review dependencies and configuration, keep sensitive operations observable without recording secrets, and test that invalid or unauthorized requests fail closed. Consider abuse limits for expensive or sensitive endpoints and ensure errors reveal enough for the legitimate user without exposing stack traces or credentials.</P>
        <Table head={['Check', 'Question', 'Example for a planner']} rows={[
          ['Authentication', 'Is the caller identity verified?', 'Does the request have a valid session?'],
          ['Authorization', 'Can this identity access this record?', 'Does the session belong to this student?'],
          ['Validation', 'Is the submitted shape acceptable?', 'Does the title satisfy the schema?'],
          ['Data integrity', 'Will stored relationships remain valid?', 'Does the referenced subject exist?'],
          ['Abuse controls', 'Can an endpoint be used excessively?', 'Is expensive report generation bounded?'],
        ]} />
      </Part>

      <Part n={8} label="Common pitfalls" title="Avoid Security Theater">
        <Mistakes items={[
          { mistake: 'Assuming CORS authenticates API callers', cause: 'CORS is a browser response-access policy, not an identity check.', fix: 'Authenticate and authorize every API request on the server.' },
          { mistake: 'Trusting a hidden field or route ID as ownership proof', cause: 'A caller can change any value sent by the browser.', fix: 'Derive identity from the server session and check resource ownership.' },
          { mistake: 'Putting a secret in a public environment variable', cause: 'Public client configuration is shipped to the browser.', fix: 'Keep credentials in server-only configuration and inspect built output when unsure.' },
          { mistake: 'Concatenating user input into SQL or HTML', cause: 'Input can be interpreted as executable syntax.', fix: 'Use parameterized queries and safe text rendering; sanitise only necessary rich content.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Review a Study Planner's Security Boundaries">
        <Practice title="Harden a session update route and document its trust boundaries" tasks={[
          'Trace a session note from request body to storage and back to the page; identify every point where it is interpreted.',
          'Replace any raw SQL string composition with the database driver’s parameter interface.',
          'Require an authenticated identity and make an update query match both the session ID and its owner ID.',
          'List the exact trusted origins needed by the browser app and explain why CORS does not replace authorization or CSRF protection.',
          'Move a test credential out of source, configure safe response headers, and write down a rotation step for accidental exposure.',
        ]} hint="Use harmless local test data. The goal is to verify defensive behavior and authorization boundaries, not to attack a real system." />
      </Part>

      <KeyTakeaways items={[
        'Treat browser input and stored user content as untrusted at every server boundary.',
        'Render text safely, parameterize database values, and validate inputs for the domain.',
        'Authentication identifies a caller; authorization must check access to each resource.',
        'Protect cookie-authenticated mutations with an appropriate CSRF strategy; CORS is not that strategy.',
        'Allow-list required browser origins and keep server authorization independent of CORS.',
        'Keep credentials out of browser bundles and repositories; rotate them if exposed.',
        'Security headers help reduce risk but must fit the actual app and deployment.',
      ]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/testing-full-stack" label="Lesson 10 · Testing a Full-Stack App — Unit, API and Playwright E2E" text="Turn security and product requirements into automated tests across components, API routes, and browser workflows." />
    </LearnLayout>
  )
}
