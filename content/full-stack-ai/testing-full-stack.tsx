import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function TestingFullStack() {
  return (
    <LearnLayout title="Testing a Full-Stack App — Unit, API and Playwright E2E" description="Test components, API routes and database code, write end-to-end tests with Playwright, and run the suite in CI." section="Full-Stack Development with AI — Lesson 10" readTime="40 min">
      <Part n={1} label="A safety net" title="Test the Behavior People and Systems Depend On">
        <P>A full-stack app can look correct while a form silently drops data, an API returns the wrong status, or a database query leaks another student's record. Tests make important behavior repeatable: a later change can be checked against the contract the team intended to preserve. They do not prove that software is free of defects; they give evidence about the cases you have chosen to exercise.</P>
        <P>Our examples use a study planner and TypeScript test files. The exact test runner and versions depend on the repository, so use the project's installed tooling and conventions. We will move from fast focused tests to API and browser tests, then discuss data isolation and CI.</P>
        <Table head={['Test level', 'What it exercises', 'Typical feedback']} rows={[
          ['Unit', 'A pure function or small component behavior.', 'Fast and focused; pinpoints a rule or state transition.'],
          ['Integration / API', 'A route with parsing, auth, and persistence boundaries.', 'Checks request and response behavior across connected modules.'],
          ['End-to-end', 'A real browser journey through the running app.', 'Confirms important user flows still work together.'],
          ['Contract / database', 'Queries and constraints against a controlled database.', 'Catches schema, mapping, and persistence assumptions.'],
        ]} />
        <Callout type="info">Choose a test level for the risk, not for a coverage number. A concise unit test is excellent for a pure rule; it cannot prove the browser can complete the entire sign-in journey.</Callout>
      </Part>

      <Part n={2} label="Testable logic" title="Separate Pure Rules from Framework Plumbing">
        <P>A function that depends only on its arguments is straightforward to test: pass a value and assert the result. Keeping such domain rules out of route handlers and UI event code reduces setup and makes failures easier to explain. For example, a planner can calculate how many sessions are complete from a list of session records.</P>
        <Code lang="typescript" file="lib/progress.ts" code={`export type SessionProgress = { completed: boolean }

export function completionRate(sessions: SessionProgress[]): number {
  if (sessions.length === 0) return 0
  const complete = sessions.filter((session) => session.completed).length
  return complete / sessions.length
}`} />
        <Code lang="typescript" file="lib/progress.test.ts" code={`import { describe, expect, it } from "vitest"
import { completionRate } from "./progress"

describe("completionRate", () => {
  it("returns zero when there are no sessions", () => {
    expect(completionRate([])).toBe(0)
  })

  it("calculates progress from completed sessions", () => {
    expect(completionRate([
      { completed: true },
      { completed: false },
      { completed: true },
    ])).toBeCloseTo(2 / 3)
  })
})`} />
        <P>The examples use Vitest's familiar describe/it/expect shape; adapt imports and setup to the runner already present in your project. Cover boundaries such as an empty list and a mixed list, rather than writing several tests that all exercise the same ordinary case.</P>
      </Part>

      <Part n={3} label="Component behavior" title="Assert What a Learner Can Observe">
        <P>Component tests are most valuable when they focus on user-visible behavior: a labelled field exists, a submit action shows an error, or a successful action updates the page. Testing every implementation detail—internal state variable names or exact component nesting—makes tests brittle when the interface is refactored without changing its behavior.</P>
        <P>React Testing Library encourages queries by role and accessible name. This is useful beyond testing: if a control is difficult to find by its accessible name, a person using assistive technology may also have difficulty discovering it. Keep test setup aligned with your app's providers and use a realistic user interaction helper if the project already includes one.</P>
        <Code lang="tsx" file="components/SessionForm.test.tsx" code={`import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { CreateSessionForm } from "./CreateSessionForm"

describe("CreateSessionForm", () => {
  it("shows a field message when the title is too short", async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn().mockResolvedValue(undefined)
    render(<CreateSessionForm onCreate={onCreate} />)

    await user.type(screen.getByLabelText("Session title"), "AI")
    await user.type(screen.getByLabelText("Subject"), "Machine learning")
    await user.type(screen.getByLabelText("Due date"), "2026-12-10")
    await user.click(screen.getByRole("button", { name: "Create session" }))

    expect(await screen.findByText("Use at least 3 characters")).toBeTruthy()
    expect(onCreate).not.toHaveBeenCalled()
  })
})`} />
        <P>Use assertions supported by your runner and DOM matcher setup. Keep the test data valid except for the one value under test; otherwise a different field may be the reason submission was rejected.</P>
        <Callout type="tip">Use an accessible role or label in a test when it matches how a person finds the control. Prefer a test ID only when there is no meaningful user-facing query.</Callout>
      </Part>

      <Part n={4} label="API contracts" title="Exercise Status Codes, Validation, and Ownership">
        <P>An API test sends a request through a route and observes its public behavior. Include cases for invalid input, unauthenticated access, successful creation, and an attempt to cross an ownership boundary. Mock an external service when the test is about your route's handling; use a controlled test database when the query and persistence behavior itself is what you need to verify.</P>
        <Code lang="typescript" file="app/api/sessions/route.test.ts" code={`import { beforeEach, describe, expect, it, vi } from "vitest"
import { POST } from "./route"
import { requireStudent } from "@/lib/auth"
import { insertSession } from "@/lib/sessions"

vi.mock("@/lib/auth", () => ({ requireStudent: vi.fn() }))
vi.mock("@/lib/sessions", () => ({ insertSession: vi.fn() }))

const mockedRequireStudent = vi.mocked(requireStudent)
const mockedInsertSession = vi.mocked(insertSession)

describe("POST /api/sessions", () => {
  beforeEach(() => vi.clearAllMocks())

  it("rejects a request without a signed-in student", async () => {
    mockedRequireStudent.mockResolvedValue(null)
    const request = new Request("http://localhost/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Review SQL", subject: "Databases", dueDate: "2026-12-10" }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
    expect(mockedInsertSession).not.toHaveBeenCalled()
  })
})`} />
        <P>Module mocking is runner-specific and may require additional setup in a real Next.js project. The design intent is the important part: a missing identity cannot reach persistence, and a response's status and body form the route contract. Add a successful case that verifies the authenticated student ID—not a client-supplied ID—is passed to the data layer.</P>
        <Callout type="warning">Do not mock the database in every test. Mocking is useful to isolate route behavior, but at least some integration coverage should exercise real query and schema behavior against a controlled database.</Callout>
      </Part>

      <Part n={5} label="Database confidence" title="Use Isolated Data and Clean Up Reliably">
        <P>Database tests catch differences between an ORM model, a migration, and actual database behavior. Run them against a dedicated test database, never a developer's personal database or production data. Give each test an isolated dataset, use transactions or a predictable cleanup strategy where suitable, and avoid relying on execution order.</P>
        <P>Test important invariants such as a foreign key or uniqueness rule, and verify that a query scopes data to the expected owner. A mock can confirm that a function was called with an argument; it cannot prove that the SQL schema accepts the row or that the query returns the right records.</P>
        <Steps items={[
          'Create a dedicated database configuration for tests.',
          'Apply the same schema migrations that the application uses.',
          'Insert only the fixtures needed for the current case.',
          'Assert persisted values and access boundaries through the data layer.',
          'Roll back or clean up even when an assertion fails.',
        ]} />
      </Part>

      <Part n={6} label="Browser journey" title="Use Playwright for a Small Number of Critical Flows">
        <P>End-to-end tests run in a real browser and verify that the application connects UI, routing, server behavior, and persistence. They are slower and can fail for reasons outside the feature, so reserve them for journeys that matter: sign in, create a study session, and see it in the planner. Prefer role-based locators and wait for an observable result instead of arbitrary sleeps.</P>
        <Code lang="typescript" file="tests/session-creation.spec.ts" code={`import { expect, test } from "@playwright/test"

test("a learner can create a study session", async ({ page }) => {
  await page.goto("/sign-in")
  await page.getByLabel("Email").fill(process.env.E2E_STUDENT_EMAIL ?? "")
  await page.getByLabel("Password").fill(process.env.E2E_STUDENT_PASSWORD ?? "")
  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page.getByRole("heading", { name: "Study planner" })).toBeVisible()
  await page.getByRole("link", { name: "Create a session" }).click()
  await page.getByLabel("Session title").fill("Revise database indexes")
  await page.getByLabel("Subject").fill("Databases")
  await page.getByLabel("Due date").fill("2026-12-10")
  await page.getByRole("button", { name: "Create session" }).click()

  await expect(page.getByText("Revise database indexes")).toBeVisible()
})`} />
        <P>Use a dedicated test account and a disposable or resettable environment. Do not place production credentials in a test job. A stable locator and a visible result are preferable to a timeout guessed from one developer's network speed.</P>
        <Callout type="example">A local test can cover the form's inline error quickly; the browser flow can verify one successful creation end to end. Testing both at every layer is often slower without adding much confidence.</Callout>
      </Part>

      <Part n={7} label="Reliable suites" title="Make Failures Diagnostic and Repeatable">
        <P>Tests should produce actionable failures. Name a test after the behavior it protects, keep setup small, use deterministic fixtures, and ensure cleanup runs even if a test fails. Avoid test order dependencies, uncontrolled calls to live services, and assertions that depend on the current time without a controlled clock.</P>
        <P>In continuous integration, run formatting or lint checks and the selected test suites on the changes that can affect them. Keep browser tests isolated and collect useful failure artifacts according to your team's privacy rules. A flaky test should be investigated and fixed, not repeatedly rerun until it happens to pass.</P>
        <Table head={['Symptom', 'Likely source', 'Improvement']} rows={[
          ['Passes alone, fails in suite', 'Shared state, order dependence, or incomplete cleanup.', 'Isolate fixtures and reset mocks or database rows.'],
          ['Fails only on CI', 'Different environment, timing assumption, or missing configuration.', 'Make dependencies explicit and wait for observable conditions.'],
          ['Many failures after UI refactor', 'Assertions depend on structure rather than behavior.', 'Query by role/name and assert user-visible outcomes.'],
          ['Slow feedback', 'Too many expensive browser tests or external calls.', 'Move pure rules to unit tests and reserve E2E for critical paths.'],
        ]} />
      </Part>

      <Part n={8} label="Common pitfalls" title="Test the Contract, Not the Implementation Accident">
        <Mistakes items={[
          { mistake: 'Testing only the happy path', cause: 'Invalid, unauthenticated, and unauthorized requests can still break safety.', fix: 'Add boundary cases for validation, access, and persistence failures.' },
          { mistake: 'Mocking every dependency in every test', cause: 'Mocks can agree with each other while the real integration is broken.', fix: 'Keep focused unit tests and add controlled integration coverage.' },
          { mistake: 'Using brittle selectors and arbitrary sleeps', cause: 'Internal markup changes and machine timing vary.', fix: 'Use accessible locators and wait for the behavior to become observable.' },
          { mistake: 'Running tests with real user or production data', cause: 'Tests can expose or mutate sensitive records.', fix: 'Use a dedicated isolated environment and synthetic fixtures.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Test Pyramid for Session Creation">
        <Practice title="Protect one complete create-session journey at the right levels" tasks={[
          'Write a unit test for a pure progress calculation, including an empty input and a mixed set of sessions.',
          'Test the form by role and label: invalid title shows a helpful message and does not call the submit handler.',
          'Test the API route for unauthenticated and invalid-body cases, then verify ownership comes from the signed-in user.',
          'Add a database integration case that creates and retrieves a session without touching non-test data.',
          'Write one Playwright flow that signs in with a dedicated test identity, creates a session, and observes it in the planner.',
          'Run the suite twice and investigate any order-dependent or timing-sensitive failure.',
        ]} hint="Keep fast tests numerous enough to cover rules, and use only a few browser journeys for the highest-value user flows." />
      </Part>

      <KeyTakeaways items={[
        'Tests provide evidence for selected behaviors; they do not prove a system has no defects.',
        'Use unit tests for pure rules, integration tests for connected boundaries, and browser tests for critical journeys.',
        'Assert what a learner can observe and prefer accessible roles and labels over implementation details.',
        'Exercise invalid input, authentication, and ownership boundaries—not just successful requests.',
        'Mocks isolate behavior but cannot prove a real database query or migration works.',
        'Use deterministic fixtures and a dedicated test environment with reliable cleanup.',
        'Fix flaky assumptions rather than relying on retries or arbitrary delays.',
      ]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/adding-ai-features" label="Lesson 11 · Adding an AI Feature — Streaming Chat in a Web App" text="Apply the same server-side validation, access control, and testing habits to an AI-powered feature." />
    </LearnLayout>
  )
}
