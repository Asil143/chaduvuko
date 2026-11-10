import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function FullStackInterviewPrep() {
  return (
    <LearnLayout
      title="Full-Stack Interview Prep"
      description="React, Node.js, databases, web security and system design questions from full-stack interviews, with model answers and a take-home checklist."
      section="Full-Stack Development with AI — Lesson 15"
      readTime="45 min"
    >
      <Part n={1} label="Frontend fundamentals" title="Explain the React and JavaScript Decisions">
        <P>
          Interview answers should connect a concept to a user-visible consequence. Give a clear definition, state the trade-off,
          and use a small example from a project you actually understand. If you have not used a tool in production, say so and
          explain how you would validate it rather than implying experience you do not have.
        </P>
        <Table head={['Question type', 'Strong answer pattern']} rows={[
          ['Concept', 'Define it, give a concrete example, name the boundary or trade-off'],
          ['Debugging', 'Reproduce, inspect evidence, isolate the cause, verify a fix and regression test'],
          ['Design', 'Clarify constraints, sketch components and data flow, compare options, discuss failure modes'],
          ['Experience', 'Describe your own contribution, decision, result, and what you learned'],
        ]} />

        <H3>1. What is the difference between props and state in React?</H3>
        <P><strong>Model answer:</strong> Props are inputs a component receives from its parent; state is data the component owns and updates over time. Both can affect rendering. I keep state at the lowest common owner that needs to coordinate it, and derive values when they can be calculated from existing props or state instead of storing duplicate copies.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Correctly distinguishes ownership from rendering.', 'Understands lifting state and avoiding duplicated, inconsistent values.']} />

        <H3>2. Why does React need keys when rendering a list?</H3>
        <P><strong>Model answer:</strong> A key gives React a stable identity for each sibling so it can match items between renders. I use a persistent record ID, not an array index when items can be inserted, removed, or reordered. A key is used by React for reconciliation; it is not automatically passed as a normal component prop.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Explains identity and reconciliation rather than merely silencing a warning.', 'Knows why unstable keys can move local component state to the wrong row.']} />

        <H3>3. When should you use an effect, and when should you avoid one?</H3>
        <P><strong>Model answer:</strong> An effect synchronizes a component with something outside React, such as a browser event, timer, or subscription. I do not use one just to calculate a value from props or to handle a button click; those belong in render-time derivation or the event handler. Effects should declare their reactive dependencies and clean up subscriptions or timers.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Recognizes effects as synchronization, not a general-purpose workflow tool.', 'Mentions dependency correctness, cleanup, and avoiding stale closures.']} />

        <H3>4. How do you update one item in React state without mutating the array?</H3>
        <P><strong>Model answer:</strong> Return a new array and a new object for the changed item. A functional state update uses the most recent prior value, which is safer when updates are queued.</P>
        <Code lang="tsx" file="TaskList.tsx" code={`type Task = { id: string; done: boolean }

function markDone(tasks: Task[], taskId: string): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, done: true } : task,
  )
}

setTasks((current) => markDone(current, taskId))`} />
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Preserves immutability and uses stable IDs.', 'Can explain why updating from the previous state avoids a stale snapshot.']} />
      </Part>

      <Part n={2} label="Rendering and web platform" title="Connect Framework Choices to the Browser">
        <H3>5. What does a Next.js server component change?</H3>
        <P><strong>Model answer:</strong> A server component can render on the server and keep server-only work, such as database access, out of the browser bundle. It is useful for data-oriented UI that does not need browser state or event handlers. Client components are needed for interactive state and browser APIs. I choose the boundary deliberately and pass only the data the client needs.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Understands server versus client responsibilities and serialization boundaries.', 'Does not assume server components remove the need for authorization or input validation.']} />

        <H3>6. How do you handle loading, empty, error, and success states?</H3>
        <P><strong>Model answer:</strong> I model the request lifecycle explicitly rather than rendering a blank panel. The UI should explain what is happening, provide a recovery action when possible, and preserve the user&apos;s input after a failed submission. I also distinguish an empty successful result from a failed request and ensure status feedback is accessible to keyboard and screen-reader users.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Covers more than the happy path and explains retry behavior.', 'Mentions accessible status and preserving user work.']} />

        <H3>7. How do you prevent unnecessary client-side data fetching?</H3>
        <P><strong>Model answer:</strong> I first decide whether the data belongs in the initial server render, a client interaction, or a cache. Data needed to show the page can often be fetched on the server; data that changes after user interaction may need client state and revalidation. I avoid duplicate requests from multiple components by sharing a clear data boundary, and I verify behavior with network and performance tools instead of guessing.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Can explain freshness, caching, and where a request should run.', 'Considers loading behavior, duplicate work, and user-specific data isolation.']} />
      </Part>

      <Part n={3} label="APIs and Node.js" title="Design Predictable Server Boundaries">
        <H3>8. What makes an HTTP endpoint idempotent?</H3>
        <P><strong>Model answer:</strong> Repeating an idempotent operation has the same intended effect as performing it once. A PUT that replaces a known resource is commonly designed that way; a POST that creates a new payment or job may not be. For retryable creates, I use an idempotency key and persist the outcome so a network retry does not repeat the business action.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Distinguishes HTTP method convention from actual application behavior.', 'Connects retries to duplicate side effects and durable idempotency records.']} />

        <H3>9. Where should request validation happen?</H3>
        <P><strong>Model answer:</strong> Validate at the server boundary even if the browser also validates for usability. Define an explicit schema for the allowed fields, types, and limits; reject unknown or malformed input; and return a useful client error without leaking internal details. Validate authorization separately: a structurally valid request may still target a resource the caller cannot access.</P>
        <Code lang="typescript" file="src/routes/plans.ts" code={`import { z } from "zod"

const createPlan = z.object({
  topic: z.string().trim().min(2).max(200),
  minutes: z.number().int().min(10).max(240),
})

app.post("/api/plans", async (request, response) => {
  const parsed = createPlan.safeParse(request.body)
  if (!parsed.success) {
    response.status(400).json({ error: "Check the topic and duration." })
    return
  }
  const user = await requireSignedInUser(request)
  const plan = await plans.create(user.id, parsed.data)
  response.status(201).json({ id: plan.id, topic: plan.topic })
})`} />
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Separates validation, authentication, and resource authorization.', 'Returns appropriate status codes and a minimal response shape.']} />

        <H3>10. How should an API handle errors?</H3>
        <P><strong>Model answer:</strong> I classify expected client errors, authentication or authorization failures, missing resources, and unexpected server failures. The response gives the client a stable, safe message and a correlation ID where useful; detailed diagnostics belong in protected logs. I do not return stack traces, database errors, secrets, or provider payloads to an untrusted caller.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Predictable response contract and correct distinction between client and server failures.', 'Safe observability that helps investigate without exposing private data.']} />

        <H3>11. How do you handle long-running work in a Node.js service?</H3>
        <P><strong>Model answer:</strong> I avoid blocking the event loop with CPU-heavy synchronous work. For a task that can outlast an HTTP request, I usually persist a job, enqueue it, and return a job ID; a worker performs the work and records progress or failure. The client can poll or subscribe to status updates, while the database remains the source of truth.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Recognizes event-loop blocking and request timeout limits.', 'Covers persistence, retries, deduplication, and observable job states.']} />
      </Part>

      <Part n={4} label="Data and security" title="Protect Records and Make Database Work Predictable">
        <H3>12. How do you prevent SQL injection?</H3>
        <P><strong>Model answer:</strong> Use parameterized queries or a query builder that binds values separately from SQL text. Never concatenate untrusted input into a query. An ORM helps with common queries but does not make unsafe raw-query construction safe, and authorization still needs to scope records to the current user.</P>
        <Code lang="typescript" file="src/repositories/plans.ts" code={`const result = await pool.query(
  "SELECT id, topic FROM study_plans WHERE id = $1 AND user_id = $2",
  [planId, userId],
)

return result.rows[0] ?? null`} />
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Uses bound parameters and understands that query construction remains a risk.', 'Includes owner scope in the data access path.']} />

        <H3>13. When would you use a database transaction?</H3>
        <P><strong>Model answer:</strong> A transaction groups related database operations that must succeed or fail together. If I create a plan and its initial study sessions, I would use a transaction when partial creation would leave invalid product state. I keep transactions short, understand isolation and conflicts, and do not hold one open while waiting on a slow external API call.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Identifies an invariant that must remain true.', 'Understands rollback and avoids extending locks across network calls.']} />

        <H3>14. What causes an N+1 query problem?</H3>
        <P><strong>Model answer:</strong> The application first queries a list of records, then runs another query for each record to load related data. With many rows, query count grows with the list size. I inspect query logs or traces, then use an appropriate join, eager load, or batched query while selecting only needed fields and checking the resulting query plan.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Explains how query count grows and how to observe the issue.', 'Chooses a batch strategy without blindly loading every relation.']} />

        <H3>15. Sessions or JWTs: how would you choose?</H3>
        <P><strong>Model answer:</strong> For a browser app, an opaque server-side session in a secure cookie is often straightforward to revoke and inspect. A signed JWT can be useful across services, but its claims are readable unless encrypted and revocation requires deliberate expiry or rotation design. I choose based on client types, service boundaries, revocation needs, and operational capability rather than calling one universally safer.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Understands the trade-offs and distinguishes signing from encryption.', 'Mentions secure cookie attributes, expiry, rotation, and authorization checks.']} />
      </Part>

      <Part n={5} label="Quality and design" title="Reason About Tests, Live Updates and Growth">
        <H3>16. What belongs in unit, integration, and end-to-end tests?</H3>
        <P><strong>Model answer:</strong> Unit tests cover isolated business rules and edge cases. Integration tests exercise boundaries such as a route with a test database or authentication service. End-to-end tests verify a small number of critical user journeys in a browser. I keep each test deterministic, assert observable behavior, and avoid using a live model provider in the routine test suite.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Chooses a test level based on the risk and boundary.', 'Balances fast isolated checks with a few realistic end-to-end journeys.']} />

        <H3>17. When would you use SSE instead of WebSockets?</H3>
        <P><strong>Model answer:</strong> SSE is simpler when the server sends updates and the browser sends commands using normal HTTP requests. It uses a long-lived HTTP response and the browser EventSource client can reconnect. WebSockets make sense when both sides need frequent, low-latency messages over one persistent connection. Either design still needs authentication, authorization, reconnection recovery, and a shared fan-out strategy when multiple server instances are involved.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Matches transport to direction and interaction needs.', 'Does not confuse an open connection with durable delivery or permission.']} />

        <H3>18. How would you make a slow page faster?</H3>
        <P><strong>Model answer:</strong> First measure where the delay comes from: server work, database queries, network transfer, JavaScript execution, or rendering. Then prioritize the largest user-visible bottleneck. Depending on evidence, I might reduce over-fetching, add an index, cache safe shared data, split client code, or defer non-critical content. I re-measure and check that freshness, accessibility, and user-specific isolation remain correct.</P>
        <P><strong>What interviewers look for</strong></P>
        <Bullets items={['Starts with a measurable baseline instead of guessing.', 'Chooses an intervention tied to the bottleneck and verifies its effect.']} />
      </Part>

      <Part n={6} label="Interviewing" title="Structure a System-Design Answer">
        <P>
          For a design prompt, do not jump directly to a technology list. Clarify who uses the feature, the core action, expected
          traffic shape, latency and availability needs, privacy constraints, and what can be deferred. Sketch the browser,
          API, database, background worker, and external services; then trace one read and one write through them. Explain how
          you would recover from a database outage, provider timeout, duplicate request, or disconnected client.
        </P>
        <Callout type="example">
          For a live order tracker, begin with durable order state and authorized customer/merchant access. Add SSE for
          one-way status updates if polling is not sufficient. If the event is missed, fetch the current order snapshot;
          add a shared broker only when multiple app instances need to fan out messages.
        </Callout>
        <P>
          Be specific about what you built yourself. A concise answer with a known trade-off is stronger than claiming a
          company-scale system you have not operated. If a detail is uncertain, make the assumption explicit and explain
          how you would verify it.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Interview and Take-Home Mistakes">
        <Mistakes items={[
          { mistake: 'Listing tools without describing a decision', cause: 'A technology name does not show how you reasoned about the problem.', fix: 'Explain the constraint, alternatives, trade-off, and evidence behind your choice.' },
          { mistake: 'Claiming production experience you cannot defend', cause: 'Follow-up questions expose gaps and damage trust.', fix: 'Describe your actual contribution accurately and separate hands-on use from study.' },
          { mistake: 'Ignoring loading, errors, authorization, and empty states', cause: 'A happy-path-only solution is incomplete for real users.', fix: 'Include boundary and recovery states in your design and test plan.' },
          { mistake: 'Overengineering a small take-home task', cause: 'Extra abstractions increase unfinished work and obscure the requested behavior.', fix: 'Deliver the smallest complete solution, document trade-offs, and identify next steps.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Rehearse with Your Own Capstone">
        <Practice
          title="A 30-minute mock interview and take-home review"
          tasks={[
            'Explain one React state decision and one effect from your capstone in under two minutes each.',
            'Trace an authenticated create request from browser input through validation, database write, and response.',
            'Show how your app prevents one user from reading another user’s record; identify the test that proves it.',
            'Sketch the architecture for a live status feature and explain when you would choose SSE, WebSockets, or polling.',
            'Review your repository as a take-home: setup steps, migration, tests, accessible states, safe configuration, and known limitations.',
          ]}
          hint="Answer in a repeatable structure: context, decision, trade-off, result, and what you would improve next."
        />
      </Part>

      <KeyTakeaways items={[
        'Explain concepts through a concrete example, a trade-off, and an observable consequence.',
        'Treat validation, authentication, authorization, and data ownership as separate server-side responsibilities.',
        'Use stable identity, immutable React updates, and effects only to synchronize external systems.',
        'Protect data with parameterized queries, short transactions, and tests for ownership boundaries.',
        'Measure performance and choose a fix based on the bottleneck rather than guessing.',
        'Use a concise, truthful system-design narrative that covers failure, recovery, and scope.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai"
        label="Next course · Generative AI &amp; LLM Engineering"
        text="Continue from full-stack AI features into model APIs, retrieval, evaluation, and production LLM engineering."
      />
    </LearnLayout>
  )
}
