import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function TestingWithVitest() {
  return (
    <LearnLayout
      title="Testing JavaScript with Vitest"
      description="Write focused unit tests with Vitest, structure cases, isolate dependencies, mock network calls, and interpret coverage."
      section="JavaScript & TypeScript — Lesson 13"
      readTime="35 min"
    >
      <Part n={1} label="Why tests" title="Tests Turn Expectations into Repeatable Checks">
        <P>
          A test is executable evidence that code behaves as intended for a chosen set of inputs. Tests do not prove that a
          program has no defects, but they make important behaviour easier to change without relying on memory or repeating
          every manual check. They are most useful when they describe observable behaviour rather than the private details of
          how a function happens to be implemented today.
        </P>
        <P>
          Vitest is a JavaScript test runner designed to work naturally with Vite-based projects, while also supporting other
          configurations. It provides test declarations, assertions, mocks, and coverage integration. Before adding a tool,
          check whether your repository already has a test runner and follow its established setup.
        </P>
        <Table
          head={['Test level', 'What it exercises', 'Example']}
          rows={[
            ['Unit', 'One function or small module in isolation', 'Does parseAmount reject a non-positive amount?'],
            ['Integration', 'Several components connected across a boundary', 'Does the repository load and save expenses together?'],
            ['End-to-end', 'A user flow through a running application', 'Can a learner add an expense and see it in the list?'],
          ]}
          caption="Use the smallest test level that gives confidence in the behaviour being changed."
        />
        <Callout type="tip">
          Good tests are readable specifications. A teammate should understand the expected behaviour from the test name and
          assertions without reverse-engineering the implementation.
        </Callout>
      </Part>

      <Part n={2} label="First test" title="Arrange, Act, Assert">
        <P>
          A clear test has three ideas: arrange the inputs, act by calling the code, and assert on the result. Import the
          function and Vitest helpers, then name the scenario. Keep each test focused enough that a failure points toward one
          behaviour. In a TypeScript project, keep the test file and source file in the project setup Vitest already uses.
        </P>
        <Code lang="javascript" file="amount.test.js" code={`import { describe, expect, it } from 'vitest'
import { parseAmount } from './amount.js'

describe('parseAmount', () => {
  it('converts a positive numeric input', () => {
    const result = parseAmount('42.50')
    expect(result).toBe(42.5)
  })

  it('rejects a blank input', () => {
    expect(() => parseAmount('')).toThrow('positive number')
  })
})`} />
        <P>
          Assertions such as <code>toBe</code>, <code>toEqual</code>, and <code>toThrow</code> express different kinds of
          expectations. Use strict equality for primitives and structural equality for objects or arrays. Prefer checking
          public outcomes over checking that a helper was called a particular number of times unless that interaction is
          itself important to the contract.
        </P>
        <Callout type="example">
          An expense calculator should be tested for the total it returns, not for whether it used <code>reduce</code>. The
          implementation can later change to a loop without changing what users rely on.
        </Callout>
      </Part>

      <Part n={3} label="Test cases" title="Cover Boundaries and Decisions, Not Just Lines">
        <P>
          Start from the rules the feature promises. For a numeric amount, that means a valid positive value, blank input,
          zero, negative values, and a value that cannot be represented as a finite number. One example per rule is usually
          more valuable than many nearly identical examples. Table-driven tests make related cases concise while preserving
          readable names.
        </P>
        <Code lang="javascript" file="amount.test.js" code={`import { describe, expect, it } from 'vitest'
import { parseAmount } from './amount.js'

describe('parseAmount boundaries', () => {
  it.each([
    ['', 'blank'],
    ['0', 'zero'],
    ['-3', 'negative'],
    ['not-money', 'non-numeric'],
  ])('rejects %s (%s)', (input) => {
    expect(() => parseAmount(input)).toThrow()
  })
})`} />
        <P>
          Do not copy every implementation branch into a test just to raise a counter. Think about decisions a user can
          observe: validation messages, saved state, response handling, or accessible feedback. Include a regression test when
          a bug has a small, reproducible example so the same failure is less likely to return.
        </P>
      </Part>

      <Part n={4} label="Async code" title="Wait for Promises and Assert Their Outcomes">
        <P>
          A test that starts an asynchronous operation but does not return or await it can finish before the assertion runs.
          Mark the test callback <code>async</code> and await the function under test. For a rejection, assert that the promise
          rejects with an expected error. This makes Vitest know when the behavior has completed.
        </P>
        <Code lang="javascript" file="courses.test.js" code={`import { expect, it, vi } from 'vitest'
import { loadCourses } from './courses.js'

it('returns parsed courses after a successful response', async () => {
  const fetchCourses = vi.fn().mockResolvedValue([
    { id: 'js', title: 'JavaScript' },
  ])

  await expect(loadCourses(fetchCourses)).resolves.toEqual([
    { id: 'js', title: 'JavaScript' },
  ])
})

it('reports a rejected request', async () => {
  const fetchCourses = vi.fn().mockRejectedValue(new Error('offline'))
  await expect(loadCourses(fetchCourses)).rejects.toThrow('offline')
})`} />
        <P>
          Injecting a dependency such as <code>fetchCourses</code> makes the core logic easy to test without replacing a
          global. For code that calls the browser directly, mock the narrow boundary or use an integration test with a
          controlled network response. Restore mocks between cases when they change shared state.
        </P>
        <Callout type="warning">
          A test that passes only because it runs after another test is unreliable. Reset mocks and isolate mutable state so
          each test can run alone and in a different order.
        </Callout>
      </Part>

      <Part n={5} label="Mock boundaries" title="Mock External Work, Not the Logic You Want to Test">
        <P>
          A mock replaces a dependency with predictable behaviour. Use it for an API, clock, or storage boundary when the
          real dependency would make a unit test slow or nondeterministic. Keep the validation and decision-making code real;
          otherwise the test may only prove that your mock behaves as expected.
        </P>
        <Code lang="javascript" file="expense-service.test.js" code={`import { beforeEach, expect, it, vi } from 'vitest'
import { saveExpense } from './expense-service.js'

beforeEach(() => {
  vi.restoreAllMocks()
})

it('persists a valid expense through the storage boundary', () => {
  const storage = { save: vi.fn() }
  const expense = { id: 'e-1', amount: 125, category: 'travel' }

  saveExpense(storage, expense)

  expect(storage.save).toHaveBeenCalledWith(expense)
})`} />
        <P>
          The test checks the service contract at a boundary. If the requirement is that a real item survives serialization,
          add a focused integration test for that behavior rather than asserting many internal calls. Avoid excessive mocking:
          a fully mocked application can pass even when its parts cannot work together.
        </P>
        <Table
          head={['Dependency', 'Useful test approach', 'Watch out for']}
          rows={[
            ['Clock', 'Inject a date or use controlled fake timers', 'Tests depending on the machine time zone or current day'],
            ['Network', 'Inject a client or mock a specific response', 'Unrealistic mocks that do not match the real response shape'],
            ['Storage', 'Use a small fake for a unit test; real adapter for integration', 'Tests sharing state between cases'],
            ['Random values', 'Inject a deterministic generator', 'Assertions tied to accidental random output'],
          ]}
        />
      </Part>

      <Part n={6} label="Organize the suite" title="Make the Test Command Predictable">
        <P>
          Keep test files near their related source or in a consistent test directory. Use one naming convention, group related
          scenarios, and make sure the project test command is documented in its existing package scripts. A test suite should
          run without a developer needing to remember hidden setup steps. Do not add a competing runner to a project that has
          already standardized on one.
        </P>
        <Code lang="javascript" file="vitest.config.js" code={`import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
    clearMocks: true,
  },
})`} />
        <P>
          Choose the environment that matches the tests. Pure functions and Node modules can run in a Node environment;
          browser-specific code may need a DOM test environment already configured by the application. Keep configuration
          aligned with the actual project rather than copying options without checking their purpose.
        </P>
        <Steps items={[
          'Run the project test command once before editing and confirm how tests are discovered.',
          'Write one focused test for the expected behaviour and run that test during development.',
          'Run the full relevant suite after the change to catch interactions and shared-state mistakes.',
          'Review the failure output and fix the cause instead of weakening a meaningful assertion.',
        ]} />
      </Part>

      <Part n={7} label="Coverage and CI" title="Coverage Is a Map, Not a Quality Score">
        <P>
          Coverage reports which code ran during tests. Line coverage shows executed lines; branch coverage can expose an
          untested decision path. High coverage does not guarantee useful assertions: a test can execute a line and never check
          its result. Use reports to find risky untested behavior, then decide whether a meaningful test is warranted.
        </P>
        <P>
          In continuous integration, run the same deterministic test command used locally. A failing test should make the
          change visible before it reaches users. Keep tests independent of secrets, local machine files, and production
          services. If a test needs an external service, isolate it or provision a controlled test environment deliberately.
        </P>
        <Callout type="tip">
          Fix flaky tests rather than rerunning them until they pass. Flakiness erodes trust and can hide a real regression in
          a busy team.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Testing Mistakes">
        <Mistakes items={[
          { mistake: 'Asserting implementation details instead of outcomes', cause: 'A harmless refactor breaks the test even though behaviour is unchanged.', fix: 'Assert the public return value, state, or user-visible behaviour.' },
          { mistake: 'Forgetting to await an asynchronous assertion', cause: 'The runner finishes before the promise settles.', fix: 'Return or await every promise involved in the test.' },
          { mistake: 'Mocking every dependency', cause: 'The test no longer verifies that real parts work together.', fix: 'Mock external boundaries and keep the behavior under test real.' },
          { mistake: 'Treating coverage percentage as proof of quality', cause: 'Executed code may have no meaningful assertion.', fix: 'Review requirements and branch behavior, then add valuable assertions.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Test a Reliable Expense Total">
        <Practice
          title="Build a small suite that protects real rules"
          tasks={[
            'Create a pure totalExpenses function and test an empty list, one expense, and several expenses.',
            'Add validation tests for blank, zero, negative, and non-finite amounts.',
            'Test an async loader for both a successful response and a rejected network dependency.',
            'Mock only the storage boundary and assert the stored domain value, not private helper calls.',
            'Run the focused tests and then the full suite; inspect branch coverage for an untested decision.',
          ]}
          hint="Name tests as behaviour statements, so a failing report tells you which expectation changed."
        />
      </Part>

      <KeyTakeaways items={[
        'Tests are executable expectations that support safe change; they do not prove the absence of all defects.',
        'Use Arrange, Act, Assert and test observable behaviour rather than implementation details.',
        'Cover important boundary values and decisions, and await asynchronous work.',
        'Mock external or nondeterministic boundaries while keeping the logic under test real.',
        'Use coverage to discover gaps, not as a substitute for meaningful assertions.',
        'Keep tests isolated, deterministic, and runnable through the same command in local development and CI.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/javascript-project-interview-prep"
        label="Lesson 14 · JavaScript Project and Interview Prep"
        text="You can now protect individual behaviours with tests. Next, bring JavaScript, TypeScript, project structure, and testing together in a typed expense tracker, then practice explaining your decisions in interviews."
      />
    </LearnLayout>
  )
}
