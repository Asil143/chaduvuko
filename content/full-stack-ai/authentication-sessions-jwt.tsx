import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AuthenticationSessionsJwt() {
  return (
    <LearnLayout title="Authentication — Sessions, JWTs and OAuth" description="Password hashing, cookie sessions versus JWTs, OAuth sign-in, protecting routes, and the security mistakes to avoid." section="Full-Stack Development with AI — Lesson 06" readTime="40 min">
      <Part n={1} label="Identity" title="Authentication Is Not the Same as Authorization">
        <P>Authentication answers who is making a request. Authorization answers whether that person may perform a particular action on a particular resource. A student can be signed in and still have no permission to read another student's study plan. Every server-side read and write needs an ownership or role check appropriate to the action.</P>
        <P>For this planner, an authenticated identity should come from a verified session or token. It must not come from a user ID, email, or role in the request body. The browser is controlled by the user; the server decides which identity and permissions to trust.</P>
        <Table head={['Concept', 'Question', 'Planner example']} rows={[
          ['Authentication', 'Who is this request from?', 'Which student session is valid?'],
          ['Authorization', 'Can they do this?', 'Does this plan belong to that student?'],
          ['Credential', 'What proves identity?', 'Password at sign-in, then a session cookie'],
          ['Session', 'How is login remembered?', 'Server-side session record linked to a cookie'],
        ]} />
        <Callout type="warning">A hidden button or unguessable URL is not access control. Check authorization at the server boundary on every sensitive operation.</Callout>
      </Part>
      <Part n={2} label="Passwords" title="Hash Passwords with a Purpose-Built Algorithm">
        <P>Never store a plaintext password or a reversible encrypted password. Password hashing algorithms are deliberately expensive and use a salt so identical passwords do not produce the same stored hash. Use a maintained library such as bcrypt, choose its work factor using current guidance and your performance budget, and never write your own password-hashing scheme.</P>
        <Code lang="typescript" file="src/auth/passwords.ts" code={`import bcrypt from "bcrypt"\n\nconst workFactor = Number(process.env.BCRYPT_WORK_FACTOR)\nif (!Number.isInteger(workFactor) || workFactor < 10) {\n  throw new Error("Configure a valid bcrypt work factor")\n}\n\nexport async function hashPassword(password: string): Promise<string> {\n  if (password.length < 12 || password.length > 200) {\n    throw new Error("Password does not meet the length policy")\n  }\n  return bcrypt.hash(password, workFactor)\n}\n\nexport async function verifyPassword(password: string, hash: string): Promise<boolean> {\n  return bcrypt.compare(password, hash)\n}`} />
        <P>The numeric threshold shown in the example is an application policy illustration, not a universal password rule. Select a work factor based on current bcrypt guidance and benchmark it on the production class of machine. Rate-limit sign-in attempts, use generic failure messages so account existence is not revealed, and consider a password reset flow that invalidates existing sessions when appropriate.</P>
        <Callout type="tip">Use an established authentication library when possible. A few lines of hashing code do not make a complete account system; reset flows, session expiry, brute-force controls, and secure recovery also matter.</Callout>
      </Part>
      <Part n={3} label="Sessions and JWTs" title="Choose a Credential Model for the Application">
        <P>With a traditional session, the server stores session state and the browser holds a random opaque identifier in a cookie. The server can revoke that identifier by deleting or expiring the record. A JSON Web Token (JWT) is a signed token that carries claims; it can be verified without a database lookup, but revocation and key rotation require additional design. Neither approach is automatically secure or automatically stateless at the application level.</P>
        <Table head={['Trade-off', 'Server-side session', 'JWT']} rows={[
          ['Revocation', 'Straightforward by invalidating server record', 'Needs expiry, a denylist, or rotation strategy'],
          ['Server state', 'Session storage required', 'Token verification can be local'],
          ['Payload', 'Opaque ID reveals no claims', 'Claims are readable unless separately encrypted'],
          ['Good fit', 'Many browser applications', 'Defined service-to-service or distributed use cases'],
        ]} />
        <P>For a browser-first study planner, an opaque server-side session is often easier to revoke and reason about. A JWT is a signed format, not a place to store a password or secret, and signing does not encrypt its contents.</P>
      </Part>
      <Part n={4} label="Cookies" title="Protect Browser Sessions with Cookie Attributes">
        <P>Set session cookies from the server with <code>HttpOnly</code> so JavaScript cannot read them, <code>Secure</code> so they travel only over HTTPS, and an intentional <code>SameSite</code> policy. Scope the cookie narrowly and expire it appropriately. An HttpOnly cookie reduces one way to steal a credential, but it does not prevent cross-site request forgery by itself.</P>
        <Code lang="typescript" file="src/auth/session-cookie.ts" code={`import type { Response } from "express"\n\nexport function setSessionCookie(response: Response, sessionId: string) {\n  response.cookie("study_session", sessionId, {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === "production",\n    sameSite: "lax",\n    path: "/",\n    maxAge: 1000 * 60 * 60 * 24 * 7,\n  })\n}\n\nexport function clearSessionCookie(response: Response) {\n  response.clearCookie("study_session", {\n    httpOnly: true,\n    secure: process.env.NODE_ENV === "production",\n    sameSite: "lax",\n    path: "/",\n  })\n}`} />
        <P>Cookie options must match the browser and deployment topology. HTTPS is required in production. Keep the cookie value random and meaningless, store only a hash of the session identifier if the session store supports it, rotate identifiers after sign-in or privilege changes, and invalidate them on logout.</P>
        <Callout type="info">Cookie expiry is not a substitute for server-side expiry. Validate that the session is active, not expired, and not revoked each time it is used.</Callout>
      </Part>
      <Part n={5} label="CSRF" title="Understand Cross-Site Request Forgery">
        <P>Browsers automatically attach matching cookies to requests, including some requests initiated by another site. An attacker may try to trick a signed-in browser into submitting an unwanted action. SameSite cookies help, but design still needs defense in depth: avoid state changes on GET, verify origin where appropriate, use a CSRF token for relevant cross-site form flows, and require appropriate content types.</P>
        <Code lang="typescript" file="src/middleware/require-origin.ts" code={`import type { Request, Response, NextFunction } from "express"\n\nconst trustedOrigin = process.env.APP_ORIGIN\n\nexport function requireTrustedOrigin(\n  request: Request, response: Response, next: NextFunction,\n) {\n  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {\n    next()\n    return\n  }\n\n  const origin = request.get("origin")\n  if (!trustedOrigin || origin !== trustedOrigin) {\n    response.status(403).json({ error: "Request origin is not allowed" })\n    return\n  }\n  next()\n}`} />
        <P>This origin check is an illustrative layer and does not replace a carefully implemented CSRF strategy for every app architecture. OAuth callbacks, native clients, same-origin deployments, and cross-origin APIs can have different requirements. Define the allowed origins explicitly; do not reflect arbitrary Origin values into an allowlist.</P>
      </Part>
      <Part n={6} label="Protect data" title="Authenticate and Authorize Every Data Access">
        <P>A middleware can resolve a session and attach a trusted user to the request. The service must still scope database queries by that user. Checking ownership in one route but not another creates an insecure direct object reference. Use the same authorization-aware data access pattern for page rendering, APIs, exports, and background operations.</P>
        <Code lang="typescript" file="src/routes/owned-plans.ts" code={`router.get("/:planId", requireSession, asyncHandler(async (request, response) => {\n  const plan = await prisma.studyPlan.findFirst({\n    where: {\n      id: request.params.planId,\n      ownerId: request.user.id,\n    },\n    select: { id: true, title: true, examDate: true },\n  })\n\n  if (!plan) {\n    response.status(404).json({ error: "Study plan not found" })\n    return\n  }\n  response.json({ plan })\n}))`} />
        <P>Returning not found for both a missing plan and a plan owned by someone else can reduce resource enumeration. Whether to distinguish them is a product and threat-model decision. In either case, never return the record before the ownership filter has been applied.</P>
        <Steps items={[
          'Resolve the session on the server and reject unauthenticated requests.',
          'Use the trusted identity from the session, not a body field.',
          'Include ownership or permission conditions in the database query.',
          'Revoke the server-side session and clear the browser cookie at logout.',
          'Log security-relevant outcomes without logging passwords, tokens, or cookie values.',
        ]} />
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Storing a plaintext password or reversible password encryption', cause: 'A database leak exposes credentials that can be reused elsewhere.', fix: 'Use a maintained password-hashing library with a calibrated cost.' },
          { mistake: 'Putting a JWT in localStorage by default', cause: 'Any script running in the origin can read it after an XSS flaw.', fix: 'Choose a credential design deliberately; browser sessions often fit HttpOnly cookies.' },
          { mistake: 'Treating authentication as authorization', cause: 'Any signed-in student might then access another student’s records.', fix: 'Check ownership or permissions for every operation.' },
          { mistake: 'Assuming SameSite or HttpOnly solves every browser threat', cause: 'CSRF and script injection are different threat classes.', fix: 'Use layered CSRF defenses, output safety, HTTPS, and restrictive cookie settings.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Add a Safe Sign-In Boundary">
        <Practice title="A session-backed planner account" tasks={[
          'Define a password hashing and verification module using bcrypt and configuration for its work factor.',
          'Sketch sign-up, sign-in, logout, and password reset flows, including rate limits and generic error messages.',
          'Set and clear an opaque session cookie with HttpOnly, Secure in production, and an intentional SameSite policy.',
          'Protect a plan API route and scope its Prisma query by the verified session user.',
          'Write a short CSRF threat model for the app and identify where origin checks or CSRF tokens are needed.',
        ]} hint="Do not implement production authentication from this lesson alone. Prefer a maintained auth framework and test cookie behavior over HTTPS." />
      </Part>
      <KeyTakeaways items={[
        'Authentication identifies the caller; authorization decides what that caller may do.',
        'Hash passwords with a purpose-built, maintained algorithm and calibrate its cost.',
        'Sessions are revocable server-side records; JWTs are signed claims with different trade-offs.',
        'Secure cookies use deliberate HttpOnly, Secure, SameSite, path, and expiry settings.',
        'Cookie-based applications need a CSRF strategy; HttpOnly does not stop CSRF.',
        'Scope every sensitive query and mutation to the authenticated user or an explicit permission.',
      ]} />
      <Bullets items={[<span key="reference">For production, use a maintained authentication library and consult its current security guidance. Do not log passwords, authorization headers, session IDs, or tokens.</span>]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/adding-ai-features" label="Lesson 07 · Adding an AI Feature — Streaming Chat in a Web App" text="Add a study assistant with a server-only model key, a streaming route, bounded inputs, and a responsive UI." />
    </LearnLayout>
  )
}
