import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function NextjsAppRouter() {
  return (
    <LearnLayout title="Next.js — Routing, Server Components and Forms" description="File-based routing, layouts, server and client components, server actions, and when to render on the server." section="Full-Stack Development with AI — Lesson 03" readTime="40 min">
      <Part n={1} label="Why a framework" title="From a React UI to a Complete Web Application">
        <P>React components describe a user interface, but a production application also needs routes, data access, server-side code, metadata, and a deployment model. Next.js combines React with a framework for these application concerns. Its App Router uses folders and files to define a route tree and encourages a server-first design: render data on the server when interactivity is not required, and add client code only where it provides value.</P>
        <P>Our study planner will have a dashboard at <code>/planner</code>, a detail page for one study plan, and a route handler for a JSON endpoint. A shared layout can provide navigation and consistent page structure. The folder hierarchy makes the URL structure visible to the team.</P>
        <Table head={['File or directory', 'Purpose', 'Planner example']} rows={[
          ['app/layout.tsx', 'Required root layout and shared document shell', 'Global styles and site shell'],
          ['app/planner/page.tsx', 'Page for a route segment', 'Study dashboard'],
          ['app/planner/[planId]/page.tsx', 'Dynamic route segment', 'One plan by identifier'],
          ['app/api/plans/route.ts', 'HTTP route handler', 'JSON endpoint for plan requests'],
          ['components/PlanActions.tsx', 'Reusable interactive UI', 'Client-side checkbox or form'],
        ]} />
        <Callout type="info">A route file is not the same as a React component imported from any folder. The App Router gives special meaning to files such as <code>page</code>, <code>layout</code>, and <code>route</code> within the <code>app</code> tree.</Callout>
      </Part>
      <Part n={2} label="Routing" title="Build URLs from the App Directory">
        <P>A <code>page</code> file makes a route accessible. Nested folders represent nested URL segments, and bracketed folders represent dynamic segments. A <code>layout</code> wraps pages below it and preserves shared UI as users navigate. Route groups can organize files without adding a URL segment, while loading and error UI can be scoped to a segment.</P>
        <Code lang="tsx" file="app/planner/[planId]/page.tsx" code={`type Plan = { id: string; title: string; subject: string }\n\nasync function getPlan(planId: string): Promise<Plan> {\n  const response = await fetch(process.env.PLANNER_API_URL + "/plans/" + planId, {\n    cache: "no-store",\n  })\n  if (!response.ok) throw new Error("Could not load study plan")\n  return response.json() as Promise<Plan>\n}\n\nexport default async function PlanPage({\n  params,\n}: { params: { planId: string } }) {\n  const plan = await getPlan(params.planId)\n  return (\n    <main>\n      <p>Study plan</p>\n      <h1>{plan.title}</h1>\n      <p>Subject: {plan.subject}</p>\n    </main>\n  )\n}`} />
        <P>This example performs a server-side request and never sends the private service URL to browser code. In a real app, validate the route identifier and authorize access before returning a student's data. Do not assume that a difficult-to-guess URL is authorization.</P>
      </Part>
      <Part n={3} label="Server and client" title="Choose the Right Component Boundary">
        <P>App Router components are server components by default. They can read server-side configuration and load data, and they send rendered output rather than the component's interactive JavaScript to the browser. A client component is needed for state, effects, event handlers, or browser APIs; mark its module with <code>use client</code>. A client boundary also pulls its imported component dependencies into the client bundle, so keep it as small as practical.</P>
        <Code lang="tsx" file="components/CompleteSessionButton.tsx" code={`"use client"\n\nimport { useState } from "react"\n\nexport function CompleteSessionButton({ sessionId }: { sessionId: string }) {\n  const [complete, setComplete] = useState(false)\n  return (\n    <button type="button" aria-pressed={complete}\n      onClick={() => setComplete((value) => !value)}>\n      {complete ? "Completed" : "Mark complete"}\n    </button>\n  )\n}`} />
        <P>Server components can render client components and pass serializable props into them. They cannot pass an arbitrary function defined on the server as an event handler. Put interactivity behind a client component, or use a server action or route handler for a server mutation.</P>
        <Callout type="tip">A useful default: fetch private data and render static structure on the server; isolate only the controls that actually need browser interaction.</Callout>
      </Part>
      <Part n={4} label="Data fetching" title="Fetch Close to the Server-Rendered Page">
        <P>Server-side data access avoids shipping credentials and database clients to the browser. Fetch in the component or in a server-only data-access function, and handle missing records, authorization, and upstream failure deliberately. Pick caching and revalidation behavior based on freshness requirements: a public course catalog can be cached longer than a student's completion state.</P>
        <P>Do not automatically add a browser effect for every request. Server rendering can return useful initial content and reduce client-side loading transitions. For an interactive filter, the client can update the URL and request a different server-rendered result or call a JSON route, depending on the product need.</P>
        <Steps items={[
          'Identify the page data and which user is allowed to see it.',
          'Load it in a server component or a server-only data-access layer.',
          'Choose cache behavior based on whether the data is public, personal, or frequently changing.',
          'Render deliberate loading and error UI for slow or failed paths.',
          'Use a client component only for the interaction that needs local state or browser events.',
        ]} />
      </Part>
      <Part n={5} label="Route handlers" title="Expose a Small JSON Endpoint">
        <P>Route handlers live in a <code>route.ts</code> file and implement HTTP methods such as GET or POST using the web Request and Response APIs. They are useful for a public JSON contract, callbacks, or a request that needs to be called by another client. Validate input, authenticate and authorize the caller, return a meaningful status, and avoid returning internal error details.</P>
        <Code lang="typescript" file="app/api/plans/route.ts" code={`import { NextResponse } from "next/server"\n\nexport async function GET(request: Request) {\n  const url = new URL(request.url)\n  const studentId = url.searchParams.get("studentId")\n  if (!studentId) {\n    return NextResponse.json({ error: "studentId is required" }, { status: 400 })\n  }\n\n  // In production: authenticate, authorize, then query the data layer.\n  const plans = await findPlansForStudent(studentId)\n  return NextResponse.json({ plans })\n}\n\nasync function findPlansForStudent(studentId: string) {\n  return [{ id: "plan-1", studentId, title: "Midterm revision" }]\n}`} />
        <P>The placeholder function makes the request flow visible, but real data must come from the persistence layer and must be scoped to the authenticated student, not a freely chosen ID supplied by the browser. A successful response should have a stable shape; consumers should not need to guess whether an error is a list or an object.</P>
        <Callout type="warning">A server component calling a route handler in the same app may add an unnecessary internal HTTP hop. When possible, share a server-only data function between the page and the handler; keep the handler for clients that need an HTTP API.</Callout>
      </Part>
      <Part n={6} label="Mutations" title="Keep Form Changes on a Trusted Server Path">
        <P>Creating a study task changes persistent data, so it is a mutation rather than a render. A server action can receive a form submission and run server-side logic; a route handler is another option when a JSON API is useful. Whichever path you choose, validate input again on the server, check the current user's permission, and return a safe result. Client validation helps usability but can be bypassed.</P>
        <Code lang="tsx" file="app/planner/actions.ts" code={`"use server"\n\nimport { revalidatePath } from "next/cache"\n\nexport async function addStudyTask(formData: FormData) {\n  const title = String(formData.get("title") ?? "").trim()\n  const subject = String(formData.get("subject") ?? "").trim()\n\n  if (title.length < 2 || title.length > 120 || !subject) {\n    return { ok: false, message: "Enter a title and subject." }\n  }\n\n  const student = await requireSignedInStudent()\n  await saveTask({ studentId: student.id, title, subject })\n  revalidatePath("/planner")\n  return { ok: true }\n}\n\nasync function requireSignedInStudent() {\n  throw new Error("Connect this action to the app's auth layer")\n}\nasync function saveTask(input: { studentId: string; title: string; subject: string }) {\n  void input\n}`} />
        <P>The two placeholder functions are intentional seams for the authentication and database lessons. Never treat a server action's obscurity as access control. Authenticate the request and verify that the user is permitted to create or edit the referenced record.</P>
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Adding use client to the entire application', cause: 'A wide client boundary increases browser JavaScript and can expose assumptions about private modules.', fix: 'Keep data access on the server and isolate small interactive components.' },
          { mistake: 'Fetching private data only after hydration', cause: 'The page can flash empty UI and unnecessarily expose a server-to-server task to the browser.', fix: 'Load initial private data on the server after checking the user.' },
          { mistake: 'Using a route parameter as proof of ownership', cause: 'A user can alter a URL or request body to select another record.', fix: 'Authorize every read and write against the authenticated identity.' },
          { mistake: 'Ignoring cache behavior', cause: 'Personal data may be stale or shared incorrectly if caching assumptions are wrong.', fix: 'Choose and test cache policy according to the data\'s privacy and freshness requirements.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Build Planner Routes with a Server-First Boundary">
        <Practice title="A dashboard, detail route and secure mutation" tasks={[
          'Create a shared root layout and a /planner page with meaningful headings and navigation.',
          'Add a dynamic plan detail route and render its data from a server-side function.',
          'Build a small client component for marking one session complete, keeping state local to that control.',
          'Add a GET route handler that validates its query and returns a consistent JSON response.',
          'Design a server-side task creation path that validates fields and checks the signed-in student\'s ownership.',
        ]} hint="Keep database and authentication functions as explicit seams until you complete the later lessons; never claim an ID parameter is authorization." />
      </Part>
      <KeyTakeaways items={[
        'The App Router maps special files in the app directory to routes, layouts, and HTTP handlers.',
        'Server components are the default; client components are for browser interaction.',
        'Keep client boundaries narrow and pass only serializable data into them.',
        'Load private data on the server after authentication and authorization.',
        'Route handlers define explicit HTTP contracts; validate requests and return useful status codes.',
        'Mutations need server-side validation, authorization, and deliberate cache revalidation.',
      ]} />
      <Bullets items={[<span key="reference">Read the official Next.js App Router guides for layouts, server and client components, data fetching, and route handlers; framework capabilities can evolve.</span>]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/node-express-rest-api" label="Lesson 04 · Building a REST API with Node.js and Express" text="Build a dedicated JSON API with routes, schemas, middleware, and predictable error responses." />
    </LearnLayout>
  )
}
