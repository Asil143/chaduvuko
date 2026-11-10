import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function TypescriptEssentials() {
  return (
    <LearnLayout
      title="TypeScript Essentials"
      description="Add types to JavaScript: primitives, objects, unions, generics, narrowing, and typing API responses, plus a strict tsconfig."
      section="JavaScript & TypeScript — Lesson 12"
      readTime="45 min"
    >
      <Part n={1} label="Types and objects" title="Describe Values and Structured Data">
        <P>
          TypeScript is JavaScript with a static type system. The compiler checks many mistakes before code runs, then
          transforms TypeScript syntax into JavaScript for the target environment. Types help editors explain available
          properties, help reviewers understand a function's contract, and make refactoring safer. They do not replace
          tests or runtime validation.
        </P>
        <P>
          TypeScript types are erased during compilation. A declaration such as <code>const age: number</code> does not
          validate data delivered by an API at runtime. Keep that boundary in mind: types describe what your program intends
          to work with, while runtime checks establish whether untrusted values actually meet that description.
        </P>
        <Code lang="typescript" code={`const learnerName: string = 'Ananya'
const completedLessons: number = 4
const isEnrolled: boolean = true

function greet(name: string): string {
  return 'Hello, ' + name
}

console.log(greet(learnerName), completedLessons, isEnrolled)`} />
        <Callout type="tip">
          Let TypeScript infer straightforward local types. Add explicit annotations where they clarify an API boundary,
          function contract, or public data structure instead of repeating obvious information everywhere.
        </Callout>
        <P>
          The primitive types include <code>string</code>, <code>number</code>, and <code>boolean</code>. Arrays can be
          written as <code>number[]</code> or <code>Array&lt;number&gt;</code>. Function parameter and return types turn
          assumptions into checks that your editor can explain.
        </P>

        <P>
          An object type describes its properties and their types. A type alias is a name for a type expression. Mark a
          property optional with <code>?</code> when it can be absent, and include <code>null</code> in a union when the value
          may explicitly be null. Optional and nullable are related but not identical concepts.
        </P>
        <Code lang="typescript" code={`type Learner = {
  id: string
  name: string
  city?: string
  mentorId: string | null
}

const learner: Learner = {
  id: 'learner-104',
  name: 'Ananya',
  mentorId: null,
}`} />
        <P>
          Use an interface to describe an object shape when that style fits the project. Interfaces can be extended to
          express compatible shapes. Type aliases can describe objects too, and they also name unions and other type
          expressions. Most teams choose conventions for readability rather than claiming one construct is always better.
        </P>
        <Code lang="typescript" code={`interface CourseSummary {
  id: string
  title: string
  lessonCount: number
}

interface FeaturedCourse extends CourseSummary {
  featured: true
}

const featured: FeaturedCourse = {
  id: 'javascript',
  title: 'JavaScript & TypeScript',
  lessonCount: 6,
  featured: true,
}`} />
        <Table
          head={['Type form', 'Example', 'Best for']}
          rows={[
            ['Primitive', 'name: string', 'A single value with a known basic type'],
            ['Optional field', 'city?: string', 'A property that may be absent'],
            ['Nullable union', 'mentorId: string | null', 'A property that is present but may hold null'],
            ['Interface', 'interface Course { ... }', 'An object contract that may be extended'],
            ['Type alias', 'type Status = ...', 'Naming object shapes, unions, and other type expressions'],
          ]}
          caption="Choose syntax that communicates the data contract"
        />
        <Callout type="info">
          A TypeScript type is not a security or validation check on JSON received over HTTP. Check external values at
          runtime before using them as a CourseSummary.
        </Callout>
      </Part>

      <Part n={2} label="Unions" title="Model a Value That Can Have Several Valid Forms">
        <P>
          A union type uses <code>|</code> to allow one of several types. For a state field, a union of string literals
          prevents misspelled values and documents the known states. For a network response, a discriminated union can make
          success and failure cases explicit to every caller.
        </P>
        <Code lang="typescript" code={`type LoadState = 'idle' | 'loading' | 'success' | 'error'

function describeState(state: LoadState): string {
  if (state === 'loading') return 'Loading courses…'
  if (state === 'success') return 'Courses loaded.'
  if (state === 'error') return 'Could not load courses.'
  return 'Ready to load courses.'
}`} />
        <P>
          A discriminated union gives each variant a shared literal property, often called a discriminant. Checking that
          property narrows the available fields in each branch. This is safer than a loose object with many unrelated
          optional properties, where combinations that should never happen are still representable.
        </P>
        <Code lang="typescript" code={`type Result<T> =
  | { ok: true; value: T }
  | { ok: false; message: string }

function showResult(result: Result<string>): string {
  if (result.ok) {
    return result.value
  }
  return 'Error: ' + result.message
}`} />
        <P>
          The check of <code>result.ok</code> narrows the type. In the first branch, TypeScript knows that <code>value</code>
          exists; in the other, it knows to use <code>message</code>. A type that makes invalid combinations difficult to
          express reduces defensive code and clarifies the flow.
        </P>
        <Callout type="example">
          A save operation might return <code>{'{ ok: true, savedAt: ... }'}</code> or
          <code>{'{ ok: false, message: ... }'}</code>. The caller must handle both outcomes rather than assuming success.
        </Callout>
      </Part>

      <Part n={3} label="Narrowing" title="Prove a Value's Type Before Using It">
        <P>
          Narrowing is TypeScript's process of refining a broad type after a check. Use <code>typeof</code> for primitives,
          equality checks for literal values, and <code>in</code> to check for a property. Control-flow branches tell the
          compiler which possibilities remain. Prefer these runtime checks over type assertions when data is uncertain.
        </P>
        <Code lang="typescript" code={`function formatId(value: string | number): string {
  if (typeof value === 'number') {
    return 'ID-' + value.toString()
  }
  return value.trim()
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}`} />
        <P>
          Catch variables are best treated as <code>unknown</code>: an exception can be any value, not necessarily an
          <code>Error</code>. Check it before reading properties. Similarly, <code>unknown</code> is a safer starting point
          than <code>any</code> for values whose shape you have not established.
        </P>
        <P>
          A type assertion such as <code>value as CourseSummary</code> tells the compiler to trust you. It does not convert
          or validate the value. Assertions are appropriate only when you have already established the fact by another
          reliable mechanism; otherwise they can hide the exact bug types are supposed to help find.
        </P>
        <Code lang="typescript" code={`function getTitle(value: unknown): string {
  if (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string'
  ) {
    return value.title
  }
  return 'Untitled course'
}`} />
        <Callout type="warning">
          Do not use <code>as any</code> to silence a type error as a routine fix. Understand the mismatch, validate
          untrusted values, and model the intended data contract accurately.
        </Callout>
      </Part>

      <Part n={4} label="Generics" title="Write Reusable Code That Preserves Its Type">
        <P>
          A generic is a type parameter: a placeholder for a type supplied by the caller. Generics let reusable functions
          preserve the relationship between input and output types. Without them, a helper may have to return
          <code>any</code>, losing the very information the caller needs.
        </P>
        <Code lang="typescript" code={`function firstItem<T>(items: T[]): T | undefined {
  return items[0]
}

const firstCourse = firstItem([
  { id: 'javascript', title: 'JavaScript' },
])

// firstCourse is a course object or undefined
console.log(firstCourse?.title)`} />
        <P>
          The type parameter <code>T</code> is inferred from the array argument. The result is the same item type, or
          <code>undefined</code> for an empty array. That return type encourages the caller to handle the empty case rather
          than pretending an item must exist.
        </P>
        <P>
          Generics are especially useful for reusable containers such as a result type or a function that unwraps a value.
          Add constraints only when the implementation needs a capability from the type, and keep the generic API simpler
          than the problem it solves.
        </P>
        <Code lang="typescript" code={`function getProperty<T, K extends keyof T>(item: T, key: K): T[K] {
  return item[key]
}

const course = { id: 'javascript', title: 'JavaScript', lessonCount: 6 }
const title = getProperty(course, 'title')
// title is inferred as string`} />
        <P>
          Here, <code>K extends keyof T</code> restricts the key to a real property name on the input. The return type
          <code>T[K]</code> corresponds to that selected property. This is more precise than accepting any string and
          returning an untyped value.
        </P>
      </Part>

      <Part n={5} label="Typing functions" title="Describe Parameters, Results, and Callbacks">
        <P>
          Add parameter types where the expected input matters and return types where they help communicate a public
          contract. TypeScript can infer many return types from an implementation. For a callback, specify its parameter
          shape so the compiler can check both the callback and its caller.
        </P>
        <Code lang="typescript" code={`interface Expense {
  id: string
  description: string
  amountPaise: number
}

function totalPaise(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amountPaise, 0)
}

function findExpense(
  expenses: Expense[],
  matches: (expense: Expense) => boolean,
): Expense | undefined {
  return expenses.find(matches)
}`} />
        <P>
          The example stores money as integer paise to avoid using a floating-point decimal as the internal amount. A real
          product still needs consistent rounding, currency, and server-side validation rules. Types make the chosen model
          visible, but they do not prove that the number is a valid amount or that an API sent it correctly.
        </P>
        <P>
          Avoid annotating every variable if inference is already clear. However, exported functions and shared models deserve
          readable contracts, especially when they are used across feature boundaries. The best type is the one that captures
          the intended contract without obscuring it in unnecessary complexity.
        </P>
        <Callout type="tip">
          If an error appears far from the source, type the boundary where data enters the function. A precise input contract
          often makes the compiler point to the actual mismatch sooner.
        </Callout>
      </Part>

      <Part n={6} label="API boundaries" title="Validate JSON Before Calling It a Typed Object">
        <P>
          <code>response.json()</code> returns data from the network. A cast does not inspect that data. Treat it as
          <code>unknown</code> and check the structure you need before using it. For larger schemas, teams often use a
          dedicated runtime validation library; for a small example, a focused type guard demonstrates the principle.
        </P>
        <Code lang="typescript" code={`interface CourseSummary {
  id: string
  title: string
}

function isCourseSummary(value: unknown): value is CourseSummary {
  if (typeof value !== 'object' || value === null) return false
  if (!('id' in value) || !('title' in value)) return false
  return typeof value.id === 'string' && typeof value.title === 'string'
}

async function fetchCourse(url: string): Promise<CourseSummary> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Course request failed')

  const data: unknown = await response.json()
  if (!isCourseSummary(data)) {
    throw new Error('Course response has an unexpected shape')
  }
  return data
}`} />
        <P>
          The return type <code>value is CourseSummary</code> is a type predicate. It tells TypeScript that when the
          function returns true, the checked value satisfies the declared shape. Keep predicates honest: every required
          field must be checked, and additional domain constraints may need validation too.
        </P>
        <Steps items={[
          'Check the HTTP response status before treating the call as successful.',
          'Keep the parsed JSON typed as unknown at the trust boundary.',
          'Validate each field your feature relies on.',
          'Return or store the value only after validation succeeds.',
          'Handle validation failures as a visible error, not as empty success data.',
        ]} />
        <Callout type="warning">
          Static types are not a substitute for server validation. A browser client can be modified by a user, so the server
          must enforce authorization and data-integrity rules independently.
        </Callout>
      </Part>

      <Part n={7} label="Strictness" title="Let the Compiler Find Ambiguous Assumptions">
        <P>
          A strict TypeScript configuration enables checks that expose missing assumptions early. The exact options belong
          to your project, and generated templates may evolve, but starting with strict checking helps keep null and implicit
          type behaviour visible. Keep compiler settings consistent across development and continuous integration.
        </P>
        <Code lang="typescript" file="tsconfig.json (excerpt)" code={`{
  "compilerOptions": {
    "strict": true,
    "noEmit": true
  }
}`} />
        <P>
          With strict null checks, code must account for values that may be null or undefined. For example,
          <code>array.find()</code> may return undefined, so the caller should handle the not-found case. This is not
          unnecessary ceremony; it forces the UI to decide what happens when the expected record is absent.
        </P>
        <Code lang="typescript" code={`const courses = [{ id: 'javascript', title: 'JavaScript' }]
const course = courses.find((item) => item.id === 'missing')

if (course) {
  console.log(course.title)
} else {
  console.log('Course was not found')
}`} />
        <P>
          If a type error appears after enabling strict settings, avoid disabling checks globally as a quick fix. Identify
          whether the value is truly optional, whether a boundary needs validation, or whether the type is too broad. Fix the
          model and make the possible states explicit.
        </P>
        <Callout type="info">
          TypeScript catches classes of mistakes before execution, but automated tests still verify behaviour and user
          expectations. Use both tools for different kinds of confidence.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using any for every response', cause: 'It disables useful checking and lets invalid properties flow through the code.', fix: 'Start external data as unknown and narrow or validate it.' },
          { mistake: 'Assuming an assertion validates JSON', cause: 'A cast changes what the compiler believes but does not inspect runtime values.', fix: 'Write a type guard or use a runtime schema validator at the API boundary.' },
          { mistake: 'Making every object field optional', cause: 'The type permits incomplete states the application does not actually support.', fix: 'Model required fields accurately and use unions for distinct states.' },
          { mistake: 'Ignoring null and undefined errors', cause: 'The value may genuinely be absent at runtime.', fix: 'Narrow the value and decide what the application should do when it is missing.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Type a Course Progress Feature">
        <Practice
          title="Build accurate contracts from input to API result"
          tasks={[
            'Define Course and Learner interfaces with required, optional, and nullable fields used intentionally.',
            'Create a string-literal union for loading, success, and error states, then handle each branch.',
            'Write a generic firstItem helper that safely returns undefined for an empty array.',
            'Write a type guard for an unknown course payload and use it after fetch and JSON parsing.',
            'Catch an unknown error and narrow it with instanceof Error before reading its message.',
            'Enable strict checking in a small TypeScript project and fix a missing-value error without using any.',
          ]}
          hint="Ask which values are trusted and which are not. TypeScript describes internal contracts; runtime checks establish external ones."
        />
      </Part>

      <KeyTakeaways items={[
        'TypeScript checks JavaScript code before runtime and emits JavaScript; annotations do not perform runtime validation.',
        'Use primitives, object shapes, optional properties, and nullable unions to model the data you actually have.',
        'Interfaces and type aliases both describe useful contracts; aliases can also represent unions.',
        'Discriminated unions and control-flow narrowing make valid branches explicit.',
        'Generics preserve the relationship between inputs and outputs in reusable helpers.',
        'Treat network JSON and caught errors as unknown until runtime checks establish what they are.',
        'Strict settings, tests, and server-side validation each provide a different layer of confidence.',
      ]} />

      <Bullets items={[
        <span key="next-course">Continue with <a href="/learn/full-stack-ai/react-fundamentals">React Fundamentals</a> in Full-Stack Development with AI.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/testing-with-vitest"
        label="Lesson 13 · Testing JavaScript with Vitest"
        text="Write unit tests with Vitest, structure test cases, mock modules and network calls, measure coverage and run tests in CI."
      />
    </LearnLayout>
  )
}
