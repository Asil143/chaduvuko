import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ErrorHandlingDebugging() {
  return (
    <LearnLayout
      title="Error Handling and Debugging in the Browser"
      description="Use try/catch and custom errors, handle asynchronous failures, read stack traces, and debug with browser DevTools."
      section="JavaScript & TypeScript — Lesson 08"
      readTime="35 min"
    >
      <Part n={1} label="Why failures matter" title="An Error Is Information, Not a Surprise">
        <P>
          A user clicks Pay, the browser sends a request, and the connection drops. Or a saved value is malformed, a required
          element is missing, or a function receives an unexpected input. These are normal failure conditions, not reasons to
          hide the problem or leave the interface stuck. Good error handling makes failures visible to the right audience and
          gives the application a safe next step.
        </P>
        <P>
          JavaScript errors have a name, a message, and usually a stack trace showing where the error was created and how the
          code reached it. Read the first useful application frame in that trace; do not assume the last line in a minified
          bundle is the cause. During development, preserve details. In the UI, show a clear, non-technical explanation and a
          recovery action where one exists.
        </P>
        <Table
          head={['Failure category', 'Example', 'First response']}
          rows={[
            ['Programmer error', 'Reading a property from undefined', 'Reproduce, inspect inputs and fix the faulty assumption'],
            ['Invalid user input', 'An amount is blank or not positive', 'Validate at the boundary and explain how to correct it'],
            ['Expected operational failure', 'Network is unavailable or a record is missing', 'Handle it explicitly and offer retry or a useful alternative'],
            ['Unexpected external data', 'A response is not valid JSON', 'Check the response shape before using it'],
          ]}
          caption="Classifying the failure helps decide whether to recover, report, or fix code."
        />
        <Callout type="info">
          An error message is not a user interface. Keep diagnostic detail for developers and logs; present users with the
          information they need to continue without exposing stack traces, internal paths, or private data.
        </Callout>
      </Part>

      <Part n={2} label="Throwing and catching" title="Catch Only Where You Can Make a Decision">
        <P>
          A thrown value interrupts the current synchronous path until a matching <code>catch</code> handles it. JavaScript
          code should throw <code>Error</code> objects rather than strings: errors include a useful stack trace and can carry a
          descriptive name. Use <code>try</code> / <code>catch</code> around work that is expected to fail, then recover,
          translate the error, or rethrow it. A catch that merely logs and returns a fake success makes later bugs harder to find.
        </P>
        <Code lang="javascript" file="amount.js" code={`function parseAmount(rawValue) {
  const amount = Number(rawValue)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new TypeError('Amount must be a positive number')
  }
  return amount
}

try {
  const amount = parseAmount('')
  console.log('Amount:', amount)
} catch (error) {
  if (error instanceof Error) {
    console.error('Could not parse amount:', error.message)
  }
}`} />
        <P>
          The example checks the parsed number, not just whether the string is non-empty: <code>Number('')</code> is zero.
          Validate at the boundary where untrusted input enters your program, and keep the validation rule close to the domain
          it protects. Avoid a broad catch around unrelated code because it obscures which operation actually failed.
        </P>
        <Callout type="tip">
          Catch an error only when you can add context, recover, or convert it into a result the caller understands. Otherwise,
          let it propagate to a layer that can make that decision.
        </Callout>
      </Part>

      <Part n={3} label="Domain errors" title="Give Expected Failures a Clear Meaning">
        <P>
          A domain-specific error tells callers what went wrong without making them inspect fragile message text. Extend
          <code> Error</code>, set the class name, and keep sensitive values out of the message. Callers can then distinguish a
          missing expense from an unexpected programming defect and decide whether to show a not-found state or report a bug.
        </P>
        <Code lang="javascript" file="errors.js" code={`class ExpenseNotFoundError extends Error {
  constructor(expenseId) {
    super('Expense was not found')
    this.name = 'ExpenseNotFoundError'
    this.expenseId = expenseId
  }
}

function findExpense(expenses, id) {
  const expense = expenses.find((item) => item.id === id)
  if (!expense) {
    throw new ExpenseNotFoundError(id)
  }
  return expense
}

try {
  const expense = findExpense([], 'exp-42')
  console.log(expense.description)
} catch (error) {
  if (error instanceof ExpenseNotFoundError) {
    console.info('Show the not-found state for:', error.expenseId)
  } else {
    throw error
  }
}`} />
        <P>
          Do not turn every possible problem into a custom class. A few stable error types at meaningful boundaries are easier
          to maintain than a large hierarchy. If you wrap a lower-level error, preserve it as a cause when your runtime and
          project conventions support it; the original failure is often essential for debugging.
        </P>
      </Part>

      <Part n={4} label="Async failures" title="Handle Rejected Promises at the Await Point">
        <P>
          A synchronous <code>try</code> / <code>catch</code> does not catch a promise rejection unless that promise is awaited
          inside the <code>try</code>. A function marked <code>async</code> returns a promise; rejected work becomes a rejected
          promise too. Put the request and its parsing in the protected block, check HTTP status explicitly, and let the caller
          decide how the screen should recover.
        </P>
        <Code lang="javascript" file="courses.js" code={`async function loadCourses() {
  const response = await fetch('/api/courses')
  if (!response.ok) {
    throw new Error('Course request failed with status ' + response.status)
  }
  return response.json()
}

async function showCourses() {
  try {
    const courses = await loadCourses()
    renderCourses(courses)
  } catch (error) {
    console.error('Could not load courses:', error)
    showMessage('Courses could not be loaded. Check your connection and try again.')
  }
}`} />
        <P>
          This handles fetch rejection and non-success HTTP responses; <code>fetch</code> does not reject just because a server
          returned a 404 or 500. In a real component, also represent loading and error state so a failed refresh does not leave
          a spinner running forever. Do not retry every failure automatically: a malformed request will not improve by repeating it.
        </P>
        <Callout type="warning">
          Every promise needs an owner for rejection handling. An un-awaited request launched from a click handler can become
          an unhandled rejection. Await it in an async handler or attach a deliberate rejection handler.
        </Callout>
      </Part>

      <Part n={5} label="Debugging workflow" title="Reproduce, Inspect, Change One Thing">
        <P>
          A disciplined debugging loop is faster than random edits. Record what you expected, what happened, and the smallest
          set of steps that reproduces it. Then inspect inputs and state at the first incorrect point. A breakpoint pauses
          execution so you can examine local variables, call stack, and the next statement without adding temporary logs everywhere.
        </P>
        <Table
          head={['DevTools area', 'Use it to answer', 'Useful habit']}
          rows={[
            ['Console', 'What error or unexpected value appeared?', 'Read the complete stack and inspect the first app-owned frame'],
            ['Sources / debugger', 'What values led to this branch?', 'Pause on an exception or set a breakpoint before the bad state'],
            ['Network', 'Did the request leave, and what came back?', 'Inspect URL, method, status, timing, and response body'],
            ['Elements', 'Does the rendered DOM match expected state?', 'Inspect the live page rather than guessing from source'],
          ]}
        />
        <P>
          In the Sources panel, add a breakpoint on the line that uses a suspicious value. Step over a line to run it, step
          into a function to inspect its implementation, or resume to the next pause. Conditional breakpoints are useful when
          a problem appears only for one record. Remove exploratory breakpoints after fixing the issue.
        </P>
        <Steps items={[
          'Reproduce the issue with a short, repeatable sequence and note the expected result.',
          'Read the first meaningful console error and inspect its stack trace.',
          'Set a breakpoint before the first incorrect state; inspect values and the call stack.',
          'Change one cause, repeat the same steps, and verify nearby behaviour still works.',
        ]} />
      </Part>

      <Part n={6} label="Network and browser state" title="Trace the Boundary Between Your Code and the Web">
        <P>
          When an API-driven page fails, look at the Network panel before rewriting the fetch call. A request may be blocked,
          sent to the wrong URL, rejected by the server, or answered with data your code did not expect. Status, headers,
          response body, and timing distinguish these cases. Avoid copying authorization headers or personal response data into
          public bug reports.
        </P>
        <Code lang="javascript" file="safe-json.js" code={`async function readJson(response) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new TypeError('Expected a JSON response')
  }

  const data = await response.json()
  if (data === null || typeof data !== 'object') {
    throw new TypeError('Response data has an unexpected shape')
  }
  return data
}`} />
        <P>
          Validate only what your feature actually depends on. A check that confirms an object exists does not prove that every
          expected property is valid; validate required fields before using them. For local browser bugs, try a clean reload,
          preserve logs across navigation when needed, and compare the failing state with a known-good state.
        </P>
        <Callout type="example">
          If an order history shows an empty list, the Network response can tell you whether the account truly has no orders or
          whether the server sent an error body that the UI mistakenly treated as a list.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Error-Handling Mistakes">
        <Mistakes items={[
          { mistake: 'Catching an error and returning an empty success value', cause: 'The caller cannot distinguish failure from a valid empty result.', fix: 'Return an explicit error state, rethrow, or recover with a clearly documented fallback.' },
          { mistake: 'Using a synchronous catch around an un-awaited promise', cause: 'The rejection happens after the try block has finished.', fix: 'Await the promise inside try or attach a rejection handler at the call site.' },
          { mistake: 'Showing stack traces to end users', cause: 'Developer diagnostics can expose internal details and confuse users.', fix: 'Log diagnostic context safely; show a concise message and next action.' },
          { mistake: 'Retrying every request automatically', cause: 'Input, authorization, and validation failures are usually not transient.', fix: 'Retry only failures known to be transient, with a bounded policy and user-visible status.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Debug a Course Search Screen">
        <Practice
          title="Make failure states reproducible and recoverable"
          tasks={[
            'Write a parseAmount function that rejects blank, non-finite, zero, and negative values with a useful error.',
            'Add a CourseNotFoundError and show a distinct not-found state without swallowing unexpected errors.',
            'Update a fetch-based loader to check response.ok and handle invalid JSON separately from network failure.',
            'Use a breakpoint to inspect a deliberately incorrect search result; write down which value first became wrong.',
            'Use DevTools Network to simulate or inspect a failed request, then verify the retry action clears the error state.',
          ]}
          hint="Keep validation at the input boundary, and keep developer diagnostics separate from the learner-facing message."
        />
      </Part>

      <KeyTakeaways items={[
        'Treat failures as normal cases; classify them before choosing how to recover.',
        'Throw Error objects with useful names and messages, and catch only where you can make a decision.',
        'Await asynchronous work inside try/catch; fetch requires an explicit response.ok check.',
        'Use breakpoints, the call stack, and Network details to find the first incorrect state.',
        'Show users a safe, useful message while preserving diagnostic information for development.',
        'Avoid silent fallbacks and unbounded retries that make failures look like success.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/async-javascript-fetch"
        label="Lesson 09 · Async JavaScript — Promises, async/await and fetch"
        text="You can now reason about failures in the browser. Next, learn how promises and the event loop coordinate asynchronous work, then build reliable fetch flows with loading and error states."
      />
    </LearnLayout>
  )
}
