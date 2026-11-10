import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function JavascriptProjectInterviewPrep() {
  return (
    <LearnLayout
      title="JavaScript Project and Interview Prep"
      description="Design a typed, tested expense tracker from requirements through deployment, then practice core JavaScript interview questions."
      section="JavaScript & TypeScript — Lesson 14"
      readTime="50 min"
    >
      <Part n={1} label="Project design" title="Define Requirements, Architecture, and Data Contracts">
        <P>
          Build an expense tracker for a student to record spending, browse entries, and see category totals. Start with correct, testable domain rules; let the UI call those rules rather than duplicate them.
        </P>
        <Table
          head={['Requirement', 'Acceptance check', 'Out of scope for version one']}
          rows={[
            ['Add an expense', 'Description, category, date, and positive amount are required', 'Bank account integration'],
            ['List expenses', 'Newest entries appear first and each has a stable ID', 'Multi-user sharing'],
            ['Show a total', 'The total equals the sum of valid saved amounts', 'Currency conversion'],
            ['Keep data locally', 'Reloading the page preserves this browser profile data', 'Cloud synchronization and backups'],
            ['Handle bad input', 'Invalid entries are rejected with an actionable message', 'Advanced recurring budgets'],
          ]}
          caption="Explicit boundaries keep a portfolio project achievable and testable."
        />
        <Callout type="warning">
          Browser local storage is convenient for a learning project, not a secure financial record system. It is device-local,
          can be cleared, and is readable by scripts running on the same origin. Do not store credentials or sensitive payment data there.
        </Callout>
        <H3>Architecture: Separate Domain, Storage, and UI</H3>
        <P>
          Separate the domain model and validation, storage adapter, and UI. Test domain rules without a browser, and replace local storage later without rewriting calculations.
        </P>
        <Table
          head={['Module', 'Responsibility', 'Depends on']}
          rows={[
            ['expense.ts', 'Types, validation, total and sorting rules', 'Nothing external'],
            ['expense-storage.ts', 'Serialize, parse, and persist records', 'Browser storage interface'],
            ['app.ts', 'Connect form events, storage, and rendering', 'Domain and storage modules'],
            ['*.test.ts', 'Verify rules and boundary behaviours', 'Vitest and the module under test'],
          ]}
        />
        <P>
          Domain rules should not import the DOM or storage. Inject dependencies at testable boundaries, and avoid libraries that the requirements do not justify.
        </P>
        <Callout type="tip">
          In a portfolio walkthrough, explain one trade-off and its consequence. For example, local-only storage keeps the
          first version simple but does not support sync or recovery across devices.
        </Callout>
        <H3>Domain model: Make the Data Contract Visible</H3>
        <P>
          Types document the data shape but do not validate JSON or form values at runtime. Validate untrusted input before using it as an <code>Expense</code>.
        </P>
        <Code lang="typescript" file="expense.ts" code={`export type Category = 'food' | 'travel' | 'study' | 'other'

export type Expense = {
  id: string
  description: string
  amount: number
  category: Category
  date: string
}

export type ExpenseInput = {
  description: string
  amount: string
  category: string
  date: string
}

export function createExpense(input: ExpenseInput, id: string): Expense {
  const description = input.description.trim()
  const amount = Number(input.amount)
  const categories: Category[] = ['food', 'travel', 'study', 'other']

  if (description.length === 0) throw new Error('Description is required')
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('Amount must be positive')
  if (!categories.includes(input.category as Category)) throw new Error('Choose a valid category')
  if (Number.isNaN(Date.parse(input.date))) throw new Error('Choose a valid date')

  return {
    id,
    description,
    amount,
    category: input.category as Category,
    date: input.date,
  }
}`} />
        <P>
          The caller supplies the ID to keep this function deterministic. Choose a stable ID strategy and one documented date format.
        </P>
        <H3>Core behaviour: Keep Totals and Ordering Pure</H3>
        <P>
          Pure functions are easy to test and reuse. Sort a copy so this module does not mutate another layer’s list.
        </P>
        <Code lang="typescript" file="expense.ts" code={`export function totalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function newestFirst(expenses: Expense[]): Expense[] {
  return [...expenses].sort((left, right) => {
    return right.date.localeCompare(left.date)
  })
}`} />
        <P>
          For strict financial precision, use integer minor units or an appropriate decimal strategy: binary floating point approximates some decimals. State the demo’s assumptions.
        </P>
        <Callout type="example">
          If a learner adds a ₹125 travel expense and a ₹40 food expense, the displayed total should be derived from the
          validated records, not typed independently into the page.
        </Callout>
      </Part>

      <Part n={2} label="Persistence and UI" title="Handle Stored JSON as Untrusted Input">
        <P>
          Stored strings may be missing, malformed, or outdated. Parse and validate them at the storage boundary so the UI stays independent of serialization.
        </P>
        <Code lang="typescript" file="expense-storage.ts" code={`import type { Expense } from './expense'

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

const STORAGE_KEY = 'chaduvuko-expenses'

export function loadExpenses(storage: StorageLike): Expense[] {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value.filter((item): item is Expense => {
      return item !== null
        && typeof item === 'object'
        && typeof item.id === 'string'
        && typeof item.description === 'string'
        && typeof item.amount === 'number'
        && Number.isFinite(item.amount)
        && typeof item.date === 'string'
    })
  } catch {
    return []
  }
}

export function saveExpenses(storage: StorageLike, expenses: Expense[]): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}`} />
        <P>
          Decide whether corrupt data is reported or recoverable. Extend validation to category, amount, and date; render descriptions as text, never executable HTML.
        </P>
      </Part>

      <Part n={3} label="Tests and delivery" title="Verify Rules Before You Polish the Interface">
        <P>
          Test validation, totals, sorting, and malformed storage. Build a semantic, labeled form with accessible feedback, then document setup and limitations.
        </P>
        <Code lang="typescript" file="expense.test.ts" code={`import { describe, expect, it } from 'vitest'
import { createExpense, totalExpenses, type Expense } from './expense'

const sample: Expense[] = [
  { id: 'a', description: 'Bus pass', amount: 125, category: 'travel', date: '2026-10-01' },
  { id: 'b', description: 'Notebook', amount: 40, category: 'study', date: '2026-10-02' },
]

describe('expense rules', () => {
  it('rejects a zero amount', () => {
    expect(() => createExpense({
      description: 'Tea', amount: '0', category: 'food', date: '2026-10-03',
    }, 'c')).toThrow('positive')
  })

  it('sums saved amounts', () => {
    expect(totalExpenses(sample)).toBe(165)
  })
})`} />
        <Table
          head={['Area', 'Meets expectations', 'Needs more work']}
          rows={[
            ['Correctness', 'Validation and totals match written rules', 'Invalid values can reach saved state'],
            ['Architecture', 'Rules are separated from UI and storage', 'Every concern is in one event handler'],
            ['Testing', 'Boundary cases and storage failures are checked', 'Only a happy path has an assertion'],
            ['Usability', 'Fields are labeled and failures have recovery', 'Errors are visual only or unclear'],
            ['Delivery', 'Setup, limitations, and next steps are documented', 'App only runs in the author’s environment'],
          ]}
          caption="Use the rubric to review the project honestly before sharing it."
        />
        <Steps items={[
          'Run type checking and the test suite with the project configuration.',
          'Build the production bundle and resolve build-time errors before deployment.',
          'Configure environment-specific values in the hosting platform; never ship development secrets.',
          'Deploy a preview, verify add/list/total/reload flows, and check browser console and network errors.',
          'Document that data is local to the browser and list the next improvements you would prioritize.',
        ]} />
        <P>
          Follow the chosen host’s current deployment guide. Verify the build, environment configuration, and narrow-screen flows after deploy.
        </P>
      </Part>

      <Part n={4} label="Interview questions: language and execution" title="Explain JavaScript Fundamentals and Async Work">
        <P><strong>1. What is the difference between <code>let</code>, <code>const</code>, and <code>var</code>?</strong></P>
        <P><strong>Model answer:</strong> <code>let</code> and <code>const</code> are block-scoped; <code>const</code> prevents rebinding, not object mutation. <code>var</code> is function-scoped. I default to <code>const</code> and use <code>let</code> when needed.</P>
        <Bullets items={[<span key="look">What interviewers look for: scope and mutation distinction.</span>]} />
        <P><strong>2. How are <code>===</code> and <code>==</code> different?</strong></P>
        <P><strong>Model answer:</strong> <code>===</code> compares without type coercion; <code>==</code> coerces. I prefer strict equality and explicit conversions.</P>
        <Bullets items={[<span key="look">What interviewers look for: coercion and trade-offs.</span>]} />
        <P><strong>3. What is the difference between <code>null</code> and <code>undefined</code>?</strong></P>
        <P><strong>Model answer:</strong> <code>undefined</code> often means absent or unassigned; <code>null</code> is an explicit empty value. Use consistent data conventions.</P>
        <Bullets items={[<span key="look">What interviewers look for: distinction and examples.</span>]} />
        <P><strong>4. What is a closure?</strong></P>
        <P><strong>Model answer:</strong> A closure retains access to its lexical environment, even after the outer function returns; this supports callbacks and encapsulation.</P>
        <Bullets items={[<span key="look">What interviewers look for: lexical scope and use case.</span>]} />
        <H3>Functions and asynchronous execution</H3>
        <P><strong>5. How does <code>this</code> get its value in JavaScript?</strong></P>
        <P><strong>Model answer:</strong> An ordinary function’s <code>this</code> depends on its call site; an arrow captures it lexically. I inspect how a function is called.</P>
        <Bullets items={[<span key="look">What interviewers look for: call-site and arrow behavior.</span>]} />
        <P><strong>6. What does an <code>async</code> function return?</strong></P>
        <P><strong>Model answer:</strong> It always returns a promise: returned values fulfill it and thrown errors reject it. <code>await</code> pauses that function, not the runtime.</P>
        <Bullets items={[<span key="look">What interviewers look for: promise and error semantics.</span>]} />
        <P><strong>7. Does <code>fetch</code> reject when the server responds with 404?</strong></P>
        <P><strong>Model answer:</strong> No. HTTP errors still resolve to a Response, so check <code>response.ok</code>; network failures reject.</P>
        <Bullets items={[<span key="look">What interviewers look for: HTTP versus network failure.</span>]} />
        <P><strong>8. When would you use <code>Promise.all</code>?</strong></P>
        <P><strong>Model answer:</strong> Use it for independent work when all results are required; it rejects if any input rejects. Use <code>allSettled</code> to inspect outcomes separately.</P>
        <Bullets items={[<span key="look">What interviewers look for: concurrency and failure behavior.</span>]} />
      </Part>

      <Part n={5} label="Interview questions: data and engineering" title="Discuss State, Modules, and Quality">
        <P><strong>9. What is the difference between <code>map</code> and <code>forEach</code>?</strong></P>
        <P><strong>Model answer:</strong> <code>map</code> transforms into a new array; <code>forEach</code> performs side effects without returning a result array.</P>
        <Bullets items={[<span key="look">What interviewers look for: intent and return behavior.</span>]} />
        <P><strong>10. What is immutability, and why can it help?</strong></P>
        <P><strong>Model answer:</strong> Immutability creates updated values rather than changing observed state, simplifying reasoning; unnecessary copying can cost performance.</P>
        <Bullets items={[<span key="look">What interviewers look for: benefits and trade-offs.</span>]} />
        <P><strong>11. How are ES modules different from CommonJS?</strong></P>
        <P><strong>Model answer:</strong> ES modules use <code>import</code>/<code>export</code>; CommonJS uses <code>require</code>/<code>module.exports</code>. Follow the project’s configured format.</P>
        <Bullets items={[<span key="look">What interviewers look for: syntax and project configuration.</span>]} />
        <P><strong>12. Why validate data at runtime if TypeScript already checks types?</strong></P>
        <P><strong>Model answer:</strong> External JSON, forms, and storage can violate static types at runtime; validate them before use.</P>
        <Bullets items={[<span key="look">What interviewers look for: runtime validation boundaries.</span>]} />
      </Part>

      <Part n={6} label="Interview questions: design and testing" title="Show How You Make Software Reliable">
        <P><strong>13. What makes a useful unit test?</strong></P>
        <P><strong>Model answer:</strong> A useful unit test deterministically checks one observable rule, avoiding private implementation details.</P>
        <Bullets items={[<span key="look">What interviewers look for: observable behavior and isolation.</span>]} />
        <P><strong>14. What would you mock in a test?</strong></P>
        <P><strong>Model answer:</strong> Mock external boundaries when needed, but keep the logic real; use integration tests for component collaboration.</P>
        <Bullets items={[<span key="look">What interviewers look for: balanced isolation.</span>]} />
        <P><strong>15. How would you debug a report that an expense is missing?</strong></P>
        <P><strong>Model answer:</strong> Reproduce the issue, trace input through validation and storage, inspect the first incorrect state, then add a regression test.</P>
        <Bullets items={[<span key="look">What interviewers look for: evidence and regression prevention.</span>]} />
        <P><strong>16. How would you improve this project if it became multi-device?</strong></P>
        <P><strong>Model answer:</strong> Clarify sync needs, add an authorized server API and database, validate requests, and define conflict/offline behavior.</P>
        <Bullets items={[<span key="look">What interviewers look for: requirements, trust boundaries, and data ownership.</span>]} />
        <Callout type="example">
          Interview answers are strongest when you connect a concept to a specific decision from your own project, state the
          trade-off, and explain what you would change for a different requirement.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Project and Interview Mistakes">
        <Mistakes items={[
          { mistake: 'Starting with a framework before defining acceptance checks', cause: 'The project can become polished without solving a clear problem.', fix: 'Write a short brief and acceptance criteria before choosing implementation details.' },
          { mistake: 'Trusting a TypeScript type for JSON or local storage', cause: 'Types disappear at runtime and external data can be malformed.', fix: 'Validate values at every untrusted boundary before using them.' },
          { mistake: 'Using a demo project as if it were secure financial software', cause: 'Local browser storage lacks server-side controls and reliable recovery.', fix: 'State limitations clearly and never store credentials or payment secrets there.' },
          { mistake: 'Answering interview questions with definitions only', cause: 'A memorized phrase does not show applied understanding.', fix: 'Give an example, explain a trade-off, and relate it to an implementation choice.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Finish and Present Your Portfolio Project">
        <Practice
          title="Ship a small, explainable expense tracker"
          tasks={[
            'Implement the typed expense domain rules and reject invalid form inputs before persistence.',
            'Add a replaceable storage adapter that validates loaded data and handles malformed JSON intentionally.',
            'Write Vitest cases for validation boundaries, totals, sorting, and storage behavior.',
            'Build an accessible form and list, then verify adding, reloading, and error recovery in a browser.',
            'Prepare a short walkthrough: requirements, architecture, one trade-off, one bug you fixed, and the next improvement.',
          ]}
          hint="Keep the first version deliberately small. A clearly tested feature is a stronger portfolio signal than an unfinished collection of features."
        />
      </Part>

      <KeyTakeaways items={[
        'Start a project with a user problem, acceptance checks, and explicit limits.',
        'Separate domain rules, persistence, and UI so each boundary can be tested and replaced.',
        'TypeScript improves development-time clarity but does not validate runtime data.',
        'Keep calculations pure, test boundary cases, and state floating-point assumptions honestly.',
        'A good interview response combines a correct concept, an example, and a trade-off.',
        'Explain project limitations and next steps rather than presenting a learning demo as production finance software.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai"
        label="Next course · Full-Stack Development with AI"
        text="You have completed the JavaScript track. Continue into full-stack development to build React interfaces, create Node.js APIs, connect a database, test complete flows, and deploy a real application."
      />
    </LearnLayout>
  )
}
