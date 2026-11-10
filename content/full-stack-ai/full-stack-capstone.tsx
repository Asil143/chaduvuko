import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function FullStackCapstone() {
  return (
    <LearnLayout
      title="Full-Stack Capstone — AI-Powered SaaS App"
      description="Plan and build a small SaaS app with authentication, a database, an AI feature, tests and deployment, and present it as a portfolio project."
      section="Full-Stack Development with AI — Lesson 14"
      readTime="60 min"
    >
      <Part n={1} label="The product" title="Build a Study Sprint Planner, Not a Demo Screen">
        <P>
          Your capstone is a small study-planning product for a learner preparing for a course or interview. A signed-in
          learner creates a study plan, reviews a short AI-generated outline, edits it, and tracks a few study sessions.
          The AI suggests a starting point; it does not claim to know a college syllabus, guarantee an exam result, or
          replace a teacher. The application remains useful when the model provider is unavailable.
        </P>
        <P>
          Keep the scope intentionally small. A portfolio project is strongest when its central flow works end to end and
          its trade-offs are explained, not when it has a long list of unfinished features. Use the existing React, Next.js,
          Node, PostgreSQL, authentication, testing, AI-feature, real-time, and deployment lessons as prerequisites. Begin
          by writing acceptance criteria that a reviewer can verify.
        </P>
        <Table head={['Requirement', 'Acceptance check']} rows={[
          ['Accounts and ownership', 'A signed-in learner can create and read only their own plans'],
          ['Core workflow', 'Create a plan, edit the draft, mark a session complete, and see saved state after reload'],
          ['AI assistance', 'Generate a bounded outline from a topic and available time; make the result editable'],
          ['Reliability', 'Show loading, empty, validation, provider-failure, and unauthorized states'],
          ['Release quality', 'Automated checks pass and a deployed smoke test uses non-sensitive test data'],
        ]} />
        <Callout type="tip">
          A useful MVP has one happy path and deliberate failure states. Write those states before styling; otherwise an
          attractive screen can hide missing product behavior.
        </Callout>
      </Part>

      <Part n={2} label="Architecture" title="Draw the Request Path and Data Ownership">
        <P>
          Keep the architecture familiar: a Next.js UI talks to server-side route handlers, those handlers authenticate the
          user and apply business rules, Prisma accesses PostgreSQL, and a server-only AI service calls the provider. The
          browser never receives a database credential or model API key. Use the deployed platform that fits your project;
          the design does not depend on one vendor.
        </P>
        <Steps items={[
          'Browser: plan form, editable outline, study-session list, and clear loading and error feedback.',
          'Route handler: session check, schema validation, per-user authorization, quota enforcement, and safe response shape.',
          'Service layer: plan rules and AI-provider adapter, isolated from the UI and provider SDK details.',
          'PostgreSQL: users, plans, and sessions with ownership relations and timestamps; migrations are reviewed and repeatable.',
          'Operations: environment-specific secrets, automated tests, structured safe logs, backups, and a release checklist.',
        ]} />
        <P>
          Model the records around ownership. A plan belongs to one user; a study session belongs to one plan and its owner.
          Use foreign keys and database constraints where appropriate. Every read or mutation that accepts a plan ID must
          include the authenticated user in its query or perform an equivalent ownership check before returning data.
        </P>
        <Code lang="typescript" file="src/server/study-plan-repository.ts" code={`import { prisma } from "@/src/server/prisma"

export async function listPlansForUser(userId: string) {
  return prisma.studyPlan.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, topic: true, minutes: true, outline: true, updatedAt: true },
  })
}

export async function findPlanForUser(userId: string, planId: string) {
  return prisma.studyPlan.findFirst({
    where: { id: planId, userId },
  })
}`} />
        <P>
          The example assumes a Prisma model with those fields and a shared client created once per server process. Adapt it
          to the schema you actually migrate. Selecting only fields the page needs reduces accidental exposure and makes
          the response contract easier to review.
        </P>
      </Part>

      <Part n={3} label="Build the API" title="Validate, Authorize and Persist Before Responding">
        <P>
          Define one request contract and use it at the server boundary. The client can validate for helpful feedback, but
          only server validation is a security control. Reject malformed or oversized input, require a verified session,
          enforce a server-side usage limit, and avoid accepting a user ID from the request body. Return a clear status and
          a minimal response rather than an ORM record containing internal fields.
        </P>
        <Code lang="typescript" file="app/api/study-plans/route.ts" code={`import { NextResponse } from "next/server"
import { z } from "zod"
import { requireSignedInUser } from "@/src/server/auth"
import { assertAiQuota } from "@/src/server/quotas"
import { createStudyPlan } from "@/src/server/study-plans"

const inputSchema = z.object({
  topic: z.string().trim().min(2).max(200),
  minutes: z.number().int().min(10).max(240),
})

export async function POST(request: Request) {
  const user = await requireSignedInUser()
  await assertAiQuota(user.id)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 })
  }

  const input = inputSchema.safeParse(body)
  if (!input.success) {
    return NextResponse.json({ error: "Enter a topic and a valid study duration." }, { status: 400 })
  }

  const plan = await createStudyPlan(user.id, input.data)
  return NextResponse.json({ id: plan.id, topic: plan.topic, outline: plan.outline }, { status: 201 })
}`} />
        <P>
          The authentication and quota helpers are application services, not framework magic. Ensure quota checks cannot be
          bypassed by calling the route directly. A real request handler should also handle expected provider and database
          failures, return a correlation ID for support, and avoid exposing stack traces or vendor error payloads.
        </P>
        <Callout type="warning">
          A plan identifier is not authorization. Query by both the authenticated user ID and the resource ID so changing a
          URL cannot reveal another learner&apos;s draft.
        </Callout>
      </Part>

      <Part n={4} label="Add AI carefully" title="Keep the Model Behind a Small Server-Side Adapter">
        <P>
          Give the model a narrow job: draft a time-boxed outline from a topic and a number of minutes. Send only the data
          needed for that task. Read the model name from server configuration, cap the response, and treat generated text
          as unverified. Store the draft so it survives a page refresh, but let the learner edit and reject it. Do not make
          the plan depend on a model-generated claim about a specific exam or syllabus the system has not been given.
        </P>
        <Code lang="typescript" file="src/server/outline-generator.ts" code={`import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY
const model = process.env.LLM_MODEL
if (!apiKey || !model) throw new Error("Configure the server-side AI credentials")

const client = new OpenAI({ apiKey, timeout: 20000, maxRetries: 1 })

type OutlineInput = { topic: string; minutes: number }

export async function generateOutline(input: OutlineInput): Promise<string> {
  const response = await client.responses.create({
    model,
    instructions: "You are a careful study coach. Suggest a concise, editable outline. Do not claim to know an unseen syllabus or guarantee a result.",
    input: "Suggest a study outline for " + input.topic + " in " + input.minutes + " minutes. Include checkpoints and one self-test.",
    max_output_tokens: 500,
  })

  const outline = response.output_text.trim()
  if (!outline) throw new Error("The study outline was empty")
  return outline
}`} />
        <P>
          The service reads credentials only on the server and reports a narrow application result rather than passing the
          provider SDK object through the UI. Before release, decide how you handle timeouts, rate limits, retries, token
          usage, user cancellation, provider outages, and data retention. Log safe metadata such as a request ID and outcome;
          avoid writing full prompts or private learner content to logs by default.
        </P>
      </Part>

      <Part n={5} label="Build the UI" title="Make the Draft Reviewable and the Workflow Accessible">
        <P>
          The UI should not look stuck while the route runs. Disable duplicate submissions, preserve the entered topic on an
          error, display an actionable message, and render generated content as text unless you have an explicitly safe
          Markdown renderer. Add labels to inputs, associate validation feedback with the field, and use a polite live region
          for status changes. Keep the saved outline editable so the learner remains in control.
        </P>
        <Code lang="tsx" file="app/study-plans/new/StudyPlanForm.tsx" code={`"use client"

import { FormEvent, useState } from "react"

export function StudyPlanForm() {
  const [topic, setTopic] = useState("")
  const [minutes, setMinutes] = useState(30)
  const [outline, setOutline] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setPending(true)
    try {
      const response = await fetch("/api/study-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, minutes }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Could not create the plan.")
      setOutline(result.outline)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Try again later.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="topic">Topic</label>
      <input id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} required />
      <label htmlFor="minutes">Available minutes</label>
      <input id="minutes" type="number" min={10} max={240} value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} />
      <button disabled={pending}>{pending ? "Creating…" : "Create study plan"}</button>
      <p role="status">{error}</p>
      {outline && <pre>{outline}</pre>}
    </form>
  )
}`} />
        <P>
          Extend this screen with a server-rendered plan list and a save endpoint for edited text. The create endpoint must
          persist the plan before returning success; otherwise the UI can display a draft that disappears after reload.
          For long AI responses, the earlier streaming lesson offers an alternative, but persistence and error recovery
          still matter.
        </P>
      </Part>

      <Part n={6} label="Prove it works" title="Test the User Journey and the Failure Boundaries">
        <P>
          Test behavior, not just that a page renders. Unit-test validation and pure plan rules; integration-test routes with
          a test database and controlled provider adapter; use a browser test for the main journey. Cover unauthenticated
          requests, cross-user access, malformed data, duplicate submissions, provider timeouts, and empty states. Keep
          external AI calls out of deterministic automated tests by replacing the adapter with a fake response.
        </P>
        <Code lang="typescript" file="tests/study-plan-form.spec.ts" code={`import { expect, test } from "@playwright/test"

test("shows a generated study outline", async ({ page }) => {
  await page.route("**/api/study-plans", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ id: "plan_test", outline: "Review the concept, then solve a practice problem." }),
    })
  })

  await page.goto("/study-plans/new")
  await page.getByLabel("Topic").fill("SQL joins")
  await page.getByRole("button", { name: "Create study plan" }).click()
  await expect(page.getByText("Review the concept, then solve a practice problem.")).toBeVisible()
})`} />
        <P>
          This browser test stubs the API so it is fast and repeatable; it does not prove that the database or provider
          integration works. Add integration tests for those boundaries and use test-owned data. Avoid asserting on exact
          model wording because a live model can produce different valid output between calls.
        </P>
        <Callout type="info">
          For ownership tests, create two test users and prove that user A cannot read, edit, or delete user B&apos;s plan—even
          when the request uses B&apos;s valid plan ID.
        </Callout>
      </Part>

      <Part n={7} label="Release" title="Deploy with a Repeatable Checklist and a Clear Rubric">
        <P>
          Use isolated local, preview, and production configuration. Store database and provider credentials in the
          deployment platform&apos;s secret manager, run reviewed migrations, and never use real learner data in a preview.
          After release, check a health path, a signed-in plan read and write with a test account, and the AI failure
          message. Confirm that logs, browser bundles, and error pages do not expose secrets.
        </P>
        <Table caption="Portfolio review rubric" head={['Area', 'Ready to present', 'Needs more work']} rows={[
          ['Product flow', 'A learner completes the create, edit, and review journey', 'A core action is mocked or loses data on refresh'],
          ['Data and access', 'Migrations, ownership checks, and safe error states are tested', 'IDs alone grant access or records are not persisted'],
          ['AI feature', 'Server-only credentials, bounded inputs, editable output, clear limits', 'Key in client bundle or generated text presented as verified fact'],
          ['Engineering quality', 'Readable modules, automated checks, responsive and accessible UI', 'No reproducible tests or major loading/error states'],
          ['Operations', 'Environment separation, migration/recovery notes, smoke checks', 'Manual-only release with unknown secrets or rollback plan'],
        ]} />
        <P>
          A capstone walkthrough should show the deployed product, explain one important technical decision, demonstrate one
          failure case, and point to the tests. State what is intentionally out of scope. Never present an unfinished
          feature as production-ready.
        </P>
        <Bullets items={[
          'Extension: add SSE progress updates for a long-running import, with snapshot recovery after reconnect.',
          'Extension: add a usage dashboard based on recorded token metadata while keeping private prompts out of analytics.',
          'Extension: add sharing only after designing explicit recipient permissions and revocation behavior.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Capstone Mistakes">
        <Mistakes items={[
          { mistake: 'Building many features before a complete create-to-review journey', cause: 'Scope expands faster than the product can be tested and explained.', fix: 'Finish one acceptance-tested workflow, then add an extension only when the core is reliable.' },
          { mistake: 'Calling the AI provider from the browser', cause: 'A bundled key can be copied and abused by anyone who loads the page.', fix: 'Keep credentials and provider calls in server-side code; enforce quotas there.' },
          { mistake: 'Trusting a plan ID as proof of ownership', cause: 'IDs can be copied or guessed and are not an authorization mechanism.', fix: 'Scope database reads and writes by the verified session user.' },
          { mistake: 'Testing only the happy path with a live model', cause: 'Provider output is variable and external outages make tests unreliable.', fix: 'Use a fake adapter for automated tests and separately verify provider integration.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Turn the Capstone into a Reviewable Portfolio Project">
        <Practice
          title="Build, verify and present the Study Sprint Planner"
          tasks={[
            'Write acceptance criteria for account ownership, plan creation, editing, reload persistence, and provider failure.',
            'Implement the database models and migrations, then verify every query is scoped to the signed-in user.',
            'Add a validated server route and a server-only AI adapter with configured model name, bounded input, and usage controls.',
            'Build the accessible form and saved-plan view; cover loading, validation, unauthorized, empty, and retry states.',
            'Run unit, integration, and browser tests with deterministic fixtures; deploy and complete the smoke checklist.',
            'Record a short demo that explains architecture, a trade-off, a failure case, and what you would build next.',
          ]}
          hint="Keep scope small enough to finish the complete vertical slice. Replace model calls in tests, and never use production learner data in a preview."
        />
      </Part>

      <KeyTakeaways items={[
        'A strong capstone proves one complete user journey instead of advertising a long list of unfinished features.',
        'Keep the browser, authenticated route, service layer, database, and model provider as explicit boundaries.',
        'Validate on the server, derive identity from the session, and scope every private database query by owner.',
        'Keep AI credentials server-side, constrain the task, bound usage, persist editable drafts, and describe output honestly.',
        'Use deterministic unit and browser tests plus integration tests for database, auth, and provider boundaries.',
        'A release is not complete until migrations, environment secrets, smoke checks, recovery, and a clear demo are ready.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/full-stack-interview-prep"
        label="Lesson 15 · Full-Stack Interview Prep"
        text="Practice explaining the React, API, database, security, testing, and system-design decisions behind your capstone."
      />
    </LearnLayout>
  )
}
