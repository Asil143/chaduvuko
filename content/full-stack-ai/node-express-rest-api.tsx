import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function NodeExpressRestApi() {
  return (
    <LearnLayout title="Building a REST API with Node.js and Express" description="Routes, middleware, validation, status codes, and error handling for a JSON API, tested with curl." section="Full-Stack Development with AI — Lesson 06" readTime="40 min">
      <Part n={1} label="API contract" title="Model Resources Before Writing Routes">
        <P>A REST-style API exposes resources through URLs and uses HTTP methods to describe operations. For the study planner, a plan is a resource and study sessions belong to a plan. The browser sends JSON; the server checks the request, applies business rules, and returns JSON with an HTTP status that explains the result.</P>
        <P>Keep endpoints predictable. Use plural nouns for collections, path parameters for a specific resource, and query parameters for filtering or pagination. The server—not the route name—must enforce identity and ownership. In this lesson the API accepts a student ID as a teaching placeholder; the authentication lesson replaces that untrusted input with the verified session identity.</P>
        <Table head={['Request', 'Meaning', 'Typical result']} rows={[
          ['GET /api/plans', 'List the caller’s plans', '200 with a plans array'],
          ['GET /api/plans/:id', 'Read one authorized plan', '200 or 404'],
          ['POST /api/plans', 'Create a plan from validated JSON', '201 with the new plan'],
          ['PATCH /api/plans/:id', 'Change selected plan fields', '200 with updated data'],
          ['DELETE /api/plans/:id', 'Remove an authorized plan', '204 with no body'],
        ]} />
        <Callout type="info">HTTP status codes are part of your API contract. A JSON error with status 200 is still a successful HTTP response to many clients and monitoring tools.</Callout>
      </Part>
      <Part n={2} label="Express setup" title="Create an Express App with Middleware">
        <P>Express is a Node.js web framework built around middleware and routes. Middleware receives a request, response, and a function that continues the chain. JSON parsing is middleware, as are request logging, authentication, and error handling. Register middleware in a deliberate order: parsers and common middleware first, routes next, and the error handler last.</P>
        <Code lang="typescript" file="src/app.ts" code={`import express from "express"\nimport { plansRouter } from "./routes/plans.js"\nimport { errorHandler } from "./middleware/error-handler.js"\n\nconst app = express()\napp.use(express.json({ limit: "32kb" }))\n\napp.get("/health", (_request, response) => {\n  response.status(200).json({ status: "ok" })\n})\napp.use("/api/plans", plansRouter)\napp.use(errorHandler)\n\nexport { app }\n`} />
        <P>The parser limit is a defensive boundary against unexpectedly large JSON bodies; choose an appropriate limit for the application. A production entry point should also configure a trusted proxy only when the hosting platform requires it, and should not trust arbitrary forwarded headers.</P>
      </Part>
      <Part n={3} label="Routes" title="Keep Route Handlers Focused">
        <P>A route should parse the request, validate its input, call an application function, and translate its result into an HTTP response. Business logic and database access are easier to test when they are not buried in a long callback. Avoid sending internal exception messages to clients because they may reveal implementation details.</P>
        <Code lang="typescript" file="src/routes/plans.ts" code={`import { Router } from "express"\nimport { z } from "zod"\nimport { asyncHandler } from "../utils/async-handler.js"\nimport { createPlan, listPlans } from "../services/plans.js"\n\nconst router = Router()\nconst createPlanSchema = z.object({\n  title: z.string().trim().min(2).max(100),\n  examDate: z.string().date().optional(),\n})\n\nrouter.get("/", asyncHandler(async (_request, response) => {\n  const plans = await listPlans()\n  response.status(200).json({ plans })\n}))\n\nrouter.post("/", asyncHandler(async (request, response) => {\n  const input = createPlanSchema.parse(request.body)\n  const plan = await createPlan(input)\n  response.status(201).json({ plan })\n}))\n\nexport { router as plansRouter }\n`} />
        <P>The schema defines the external input contract and trims a title before it enters application code. Parsing can throw a Zod validation error; the shared error handler will map it to a client response. In the actual app, the service should receive an authenticated user ID and ensure created plans belong to that user.</P>
      </Part>
      <Part n={4} label="Validation" title="Treat Every Request as Untrusted">
        <P>Browsers, scripts, and other services can send malformed input regardless of what your form permits. Validate body, path, and query values at the server boundary. Check required fields, length, format, and allowed enum values; then validate domain rules, such as whether an exam date is sensible for the learner. A schema library gives one explicit definition that can be reused by route tests.</P>
        <Code lang="typescript" file="src/routes/sessions.ts" code={`import { z } from "zod"\n\nexport const createSessionSchema = z.object({\n  title: z.string().trim().min(2).max(120),\n  subject: z.string().trim().min(1).max(60),\n  plannedMinutes: z.number().int().min(5).max(240),\n  scheduledFor: z.string().datetime().optional(),\n})\n\nexport type CreateSessionInput = z.infer<typeof createSessionSchema>\n\nexport function parseCreateSession(body: unknown): CreateSessionInput {\n  return createSessionSchema.parse(body)\n}`} />
        <P>Notice the input type is inferred from the same runtime schema. TypeScript types disappear at runtime, so declaring a body type alone does not validate JSON received over HTTP. Limit request size, avoid accepting fields that can set roles or ownership, and map validation errors to a clear but non-sensitive response.</P>
        <Callout type="warning">Do not spread the request body directly into a database create call. An unexpected field such as <code>studentId</code> or <code>role</code> must not become writable merely because the client supplied it.</Callout>
      </Part>
      <Part n={5} label="Errors" title="Centralise Errors in One Middleware">
        <P>Without a shared error path, one route returns a string, another leaks a stack trace, and a third forgets to end the response. Define an application error with an HTTP status and a safe message, then use error middleware to map known errors and log unknown ones. In Express, error-handling middleware has four parameters and should be registered after the routes.</P>
        <Code lang="typescript" file="src/middleware/error-handler.ts" code={`import type { ErrorRequestHandler } from "express"\nimport { ZodError } from "zod"\n\nexport class HttpError extends Error {\n  constructor(public status: number, message: string) {\n    super(message)\n    this.name = "HttpError"\n  }\n}\n\nexport const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {\n  if (error instanceof ZodError) {\n    response.status(400).json({ error: "Invalid request", issues: error.issues })\n    return\n  }\n  if (error instanceof HttpError) {\n    response.status(error.status).json({ error: error.message })\n    return\n  }\n  console.error("Unhandled API error", error)\n  response.status(500).json({ error: "Something went wrong" })\n}\n`} />
        <P>For asynchronous route handlers, make sure rejected promises are forwarded to Express's error pipeline. A small wrapper is one option; a router-specific async mechanism is another. Confirm the behavior for the Express version and typings in your project rather than assuming thrown asynchronous errors are automatically handled in every setup.</P>
        <Code lang="typescript" file="src/utils/async-handler.ts" code={`import type { Request, Response, NextFunction, RequestHandler } from "express"\n\ntype AsyncRoute = (request: Request, response: Response, next: NextFunction) => Promise<unknown>\n\nexport function asyncHandler(handler: AsyncRoute): RequestHandler {\n  return (request, response, next) => {\n    Promise.resolve(handler(request, response, next)).catch(next)\n  }\n}`} />
      </Part>
      <Part n={6} label="Test the contract" title="Exercise the API from the Client's Point of View">
        <P>Test routes through HTTP, not only by calling helper functions. A request tool such as curl helps verify the URL, headers, body, status, and response together. Keep examples local and use test data; never paste real credentials or a student's private information into shared terminal history.</P>
        <Code lang="bash" file="requests.sh" code={`curl -i http://localhost:3000/health\n\ncurl -i -X POST http://localhost:3000/api/plans \\\n  -H "Content-Type: application/json" \\\n  -d '{"title":"Midterm revision"}'\n\ncurl -i -X POST http://localhost:3000/api/plans \\\n  -H "Content-Type: application/json" \\\n  -d '{"title":""}'`} />
        <Steps items={[
          'Check a valid create request returns 201 and a stable JSON shape.',
          'Send invalid JSON, a missing title, and an overly long title; expect a client error.',
          'Request a missing plan and verify the intended not-found response.',
          'Cause a controlled service failure and verify the response is safe while server logs retain context.',
          'Repeat tests after changing middleware order or schema rules.',
        ]} />
        <Callout type="example">A generic error such as &quot;Something went wrong&quot; is safer for unexpected failures. A request ID in logs helps the developer find the corresponding exception without exposing a stack trace in the browser.</Callout>
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Trusting the client-side form as validation', cause: 'Anyone can call the API directly with a different payload.', fix: 'Parse and validate every request on the server.' },
          { mistake: 'Returning 200 for a failed operation', cause: 'Clients and monitoring treat the HTTP request as successful.', fix: 'Use an appropriate 4xx or 5xx status and a stable error body.' },
          { mistake: 'Putting database queries and policy in route callbacks', cause: 'Handlers become hard to test and reuse.', fix: 'Separate validation, service logic, and persistence responsibilities.' },
          { mistake: 'Leaking raw exception messages', cause: 'Errors can reveal SQL, infrastructure, paths, or secrets.', fix: 'Map expected errors safely and log unexpected errors on the server.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Create a Validated Planner API">
        <Practice title="A small HTTP contract with safe failure behavior" tasks={[
          'Implement GET /api/plans and POST /api/plans with a clear JSON response shape.',
          'Define Zod schemas for creating a plan and a study session, including sensible length limits.',
          'Add shared error middleware for validation, expected application errors, and unknown failures.',
          'Write curl requests for success, bad input, missing resources, and a server failure.',
          'Refactor the POST route so the service receives only validated fields and a trusted user identity seam.',
        ]} hint="The authentication and persistence lessons will replace in-memory or placeholder services; keep the API contract independent of storage." />
      </Part>
      <KeyTakeaways items={[
        'HTTP methods, URLs, status codes, and response shapes form an API contract.',
        'Express middleware order determines how requests and errors flow.',
        'Validate body, path, and query data at runtime with a schema.',
        'Separate routes from application logic and persistence.',
        'Centralize expected error mapping and keep unexpected details out of responses.',
        'Test the API over HTTP with valid and invalid requests.',
      ]} />
      <Bullets items={[<span key="reference">Use the official Express and Zod documentation for current setup and API details. Keep exact dependency versions in the repository manifest and lockfile.</span>]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/postgres-with-an-orm"
        label="Lesson 07 · PostgreSQL with an ORM — Prisma"
        text="Replace placeholder service functions with relational tables, migrations, and typed database queries." />
    </LearnLayout>
  )
}
