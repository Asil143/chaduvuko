import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function JavascriptFundamentals() {
  return (
    <LearnLayout
      title="JavaScript Fundamentals — Values, Variables and Control Flow"
      description="How JavaScript runs in the browser and Node.js, let and const, types and coercion, operators, conditionals, and loops."
      section="JavaScript & TypeScript — Lesson 01"
      readTime="40 min"
    >
      <Part n={1} label="Starting point" title="JavaScript Gives a Page Behaviour">
        <P>
          HTML describes content, CSS describes its appearance, and JavaScript describes behaviour. A product listing can be
          marked up as HTML and styled with CSS; JavaScript can respond when a learner filters courses, checks a form, or adds
          an item to a basket. Browsers run JavaScript directly. Node.js also runs JavaScript outside the browser, which lets
          teams write command-line tools and server applications with the same language.
        </P>
        <P>
          A JavaScript engine reads source code, evaluates expressions, and executes statements. You can experiment in a
          browser developer console or a Node.js REPL. The same basic language rules apply in both places, but browser features
          such as <code>document</code> are not available in Node.js. Do not confuse the language with its host environment.
        </P>
        <Callout type="tip">
          You should know basic HTML and CSS before this track. A script can select and change an element only if that element
          exists in the page; the prerequisite course explains how that page is written.
        </Callout>
        <P>
          Start with a value and an expression. An expression produces a value; a statement performs an action such as storing
          a value or choosing which code to run.
        </P>
        <Code lang="javascript" code={`const course = 'JavaScript & TypeScript'
const lessonNumber = 1
const welcome = 'Welcome to ' + course

console.log(welcome)
console.log(lessonNumber + 1)`} />
        <P>
          <code>console.log</code> is a built-in function that prints information to a developer console. It is useful while
          learning and debugging, but production applications usually send useful diagnostics through an intentional logging
          system rather than leaving temporary messages everywhere.
        </P>
      </Part>

      <Part n={2} label="Variables" title="Use const by Default, and let When Reassignment Is Required">
        <P>
          A variable is a named reference to a value. Declare it with <code>const</code> when you will not assign a different
          value to that name. Choose <code>let</code> when a later step must reassign it. Avoid <code>var</code> in new code:
          its older function-scoped behaviour is less predictable than block-scoped <code>let</code> and <code>const</code>.
        </P>
        <Code lang="javascript" code={`const platformName = 'Chaduvuko'
let completedLessons = 0

completedLessons = completedLessons + 1
console.log(platformName, completedLessons)`} />
        <P>
          <code>const</code> prevents reassignment of the variable, not mutation of an object it refers to. This distinction
          matters: a constant object can still have a property changed. Prefer to create updated copies when application state
          should be treated as immutable; it makes changes easier to reason about and test.
        </P>
        <Code lang="javascript" code={`const learner = { name: 'Asha', city: 'Visakhapatnam' }
learner.city = 'Vijayawada'       // property changes; the binding is still the same

// learner = { name: 'Asha' }    // TypeError: cannot reassign a const binding`} />
        <Callout type="info">
          Declare variables close to where they are used, choose names that explain intent, and keep a variable's meaning
          stable. A name that first means rupees and later means paise is a source of subtle mistakes.
        </Callout>
        <P>
          JavaScript distinguishes uppercase and lowercase letters. <code>total</code> and <code>Total</code> are different
          names. Use descriptive lower camel case for variables and functions, and use consistent naming within a project.
        </P>
      </Part>

      <Part n={3} label="Values" title="Understand Types Before Doing Work with Them">
        <P>
          JavaScript has primitive values such as strings, numbers, booleans, <code>undefined</code>, <code>null</code>, and
          symbols. Objects—including arrays and functions—are reference values. A value's type influences what operations make
          sense. For example, adding two numbers performs arithmetic, while adding strings joins text.
        </P>
        <Table
          head={['Value', 'Example', 'Notes']}
          rows={[
            ['String', "'JavaScript'", 'Text; quote style is a team convention'],
            ['Number', '42 or 19.5', 'One number type includes whole and fractional values'],
            ['Boolean', 'true or false', 'Useful for decisions and flags'],
            ['Undefined', 'let result', 'A declared binding without an assigned value'],
            ['Null', 'const selected = null', 'An intentional absence of a value'],
            ['Object / array', "{ city: 'Guntur' } / [1, 2]", 'Structured collections of related data'],
          ]}
          caption="Common JavaScript values"
        />
        <P>
          A declaration without an initial value starts as <code>undefined</code>. Use <code>null</code> when your program
          deliberately represents an empty or not-yet-selected value. JavaScript has a historical quirk: <code>typeof null</code>
          returns <code>object</code>. Check for null directly with <code>value === null</code>.
        </P>
        <Code lang="javascript" code={`const studentName = 'Ravi'
const credits = 3
const isEnrolled = true
let selectedMentor
const selectedTrack = null

console.log(typeof studentName)  // 'string'
console.log(typeof credits)      // 'number'
console.log(typeof isEnrolled)   // 'boolean'
console.log(selectedMentor)      // undefined
console.log(selectedTrack === null) // true`} />
        <P>
          Be careful with automatic type conversion, called coercion. In loose expressions JavaScript may convert a string to a
          number or combine values in surprising ways. For example, <code>'5' + 1</code> becomes <code>'51'</code>, while
          <code>'5' - 1</code> becomes <code>4</code>. Prefer explicit conversion and strict equality so the intention is
          visible to the next reader.
        </P>
        <Code lang="javascript" code={`const rawCount = '5'
const count = Number(rawCount)

if (Number.isNaN(count)) {
  console.log('Enter a valid number')
} else {
  console.log(count + 1) // 6
}

console.log(5 === '5') // false`} />
      </Part>

      <Part n={4} label="Operators" title="Combine Values Without Hiding Your Intent">
        <P>
          Arithmetic operators include <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and remainder
          <code>%</code>. Comparison operators such as <code>&gt;</code>, <code>&lt;=</code>, and <code>===</code> produce
          booleans. Logical operators combine boolean conditions. Parentheses make a complex expression easier to read and
          remove uncertainty about which operation runs first.
        </P>
        <Code lang="javascript" code={`const priceRupees = 499
const quantity = 2
const subtotal = priceRupees * quantity
const hasCoupon = true
const eligibleForDiscount = subtotal >= 500 && hasCoupon
const total = eligibleForDiscount ? subtotal - 50 : subtotal

console.log({ subtotal, eligibleForDiscount, total })`} />
        <P>
          The conditional (ternary) operator is useful for a small choice that returns one of two values. Use an
          <code>if</code> statement when branches require multiple steps. Avoid deeply nested ternaries; simple, named
          intermediate values are easier to debug.
        </P>
        <Callout type="warning">
          JavaScript numbers use floating-point representation. For an introductory UI example this is fine, but a real payment
          system must use a carefully designed money representation (commonly integer paise or a decimal arithmetic library)
          and authoritative server-side calculations. Never trust a browser-supplied amount to settle a payment.
        </Callout>
        <P>
          Falsy values include <code>false</code>, <code>0</code>, an empty string, <code>null</code>, and
          <code>undefined</code>. A truthy check is concise, but can accidentally treat a meaningful zero as missing. Use an
          explicit comparison when zero is valid data.
        </P>
        <Code lang="javascript" code={`const seatsAvailable = 0

if (seatsAvailable > 0) {
  console.log('Seats are available')
} else {
  console.log('The class is full')
}`} />
      </Part>

      <Part n={5} label="Decisions" title="Use Conditions to Describe Business Rules">
        <P>
          An <code>if</code> / <code>else if</code> / <code>else</code> chain runs the first matching branch. Write the most
          specific or most restrictive case first when order matters. A <code>switch</code> can make a fixed set of possible
          values clear; remember to return or break from each case so execution does not fall through unintentionally.
        </P>
        <Code lang="javascript" code={`const score = 82
let result

if (score >= 90) {
  result = 'Excellent'
} else if (score >= 70) {
  result = 'Ready for the next module'
} else if (score >= 0) {
  result = 'Review the practice and try again'
} else {
  result = 'Score must not be negative'
}

console.log(result)`} />
        <P>
          Validate input at boundaries. A value read from a form, URL, or API should not be assumed valid just because it has
          the expected shape in your local test. Check its type, range, and allowed values before using it.
        </P>
        <Steps items={[
          'Identify the input and what values are valid.',
          'Convert text to the type you need explicitly.',
          'Reject invalid values before applying business rules.',
          'Handle each valid branch and provide a useful fallback.',
        ]} />
        <Callout type="example">
          A course signup can check whether a learner has an active account, whether the course is open, and whether a seat is
          available. Those checks belong to different layers in a real app; the browser can improve feedback, but the server
          still makes the final decision.
        </Callout>
      </Part>

      <Part n={6} label="Repetition" title="Choose a Loop That Matches the Job">
        <P>
          A <code>for</code> loop is helpful when you need an index or a known range. A <code>while</code> loop repeats while a
          condition stays true, so make sure its body can eventually change that condition. For processing each item in a
          collection, <code>for...of</code> is often the clearest option. Avoid modifying a loop counter in several places.
        </P>
        <Code lang="javascript" code={`const lessonNames = ['Values', 'Functions', 'The DOM']

for (const lessonName of lessonNames) {
  console.log('Next up:', lessonName)
}

let attemptsRemaining = 3
while (attemptsRemaining > 0) {
  console.log('Attempts left:', attemptsRemaining)
  attemptsRemaining -= 1
}`} />
        <P>
          Loops are not only for printing. They can total values, build a lookup, or validate each record. Later you will learn
          array methods such as <code>map</code> and <code>filter</code>, which express common transformations declaratively.
          First, understand the basic repeated operation and its stopping condition.
        </P>
        <Code lang="javascript" code={`const lessonMinutes = [12, 18, 15]
let totalMinutes = 0

for (const minutes of lessonMinutes) {
  totalMinutes += minutes
}

console.log('Total:', totalMinutes)`} />
        <P>
          For large or untrusted collections, also consider the amount of work and memory your code uses. Avoid accidental
          infinite loops, and do not assume every API response contains a small, well-formed list.
        </P>
      </Part>

      <Part n={7} label="Debugging" title="Make Errors Useful Instead of Mysterious">
        <P>
          Read the first error message and its line number, inspect nearby values, and reduce the problem to a small example.
          The browser console and Node.js both show runtime errors. A syntax error prevents parsing; a runtime error occurs
          while the program runs; a logic error runs successfully but gives the wrong result. The fix depends on which kind
          you have.
        </P>
        <Code lang="javascript" code={`const rawPrice = 'not-a-price'
const price = Number(rawPrice)

if (Number.isNaN(price)) {
  console.error('Price input is not a number:', rawPrice)
} else {
  console.log(price * 2)
}`} />
        <P>
          Temporary logs are fine while learning. Before shipping, remove noisy debug output and avoid logging passwords,
          payment details, access tokens, or other sensitive values. In a shared team, formatters and linters help catch
          inconsistent code before it becomes a runtime problem.
        </P>
        <Callout type="tip">
          Try changing one thing at a time. If you change the input, the condition, and the output together, you will not know
          which change solved the bug.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using var in a new example', cause: 'Its function scope and redeclaration rules differ from modern block-scoped declarations.', fix: 'Use const for stable bindings and let when reassignment is needed.' },
          { mistake: 'Comparing with == by habit', cause: 'Loose equality converts values and can make unrelated types compare equal.', fix: 'Prefer === and convert input explicitly when conversion is intentional.' },
          { mistake: 'Treating zero as missing', cause: 'A truthiness check considers 0 falsy even when it is a valid count or amount.', fix: 'Compare explicitly, such as seatsAvailable > 0 or value !== null.' },
          { mistake: 'Adding a numeric string without converting it', cause: 'The + operator also concatenates strings, so "5" + 1 becomes "51".', fix: 'Convert at the input boundary with Number and validate using Number.isNaN.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Model a Course Signup Decision">
        <Practice
          title="Write small rules and verify their edge cases"
          tasks={[
            'Declare a learner name, course title, and completed lesson count with const; use let for a value you deliberately update.',
            'Convert a form-like string such as "4" to a number, then reject an empty or invalid value.',
            'Write an if / else chain that classifies a practice score into three useful feedback messages.',
            'Loop through an array of lesson durations and calculate the total time.',
            'Test your logic with zero, a negative number, and an unexpected string; explain the output in each case.',
          ]}
          hint="Keep input validation separate from the rule that decides the learner's next step."
        />
      </Part>

      <KeyTakeaways items={[
        'JavaScript runs in browsers and Node.js; host APIs differ even though the language is shared.',
        'Use const by default and let only when a binding must be reassigned; avoid var in modern code.',
        'Know whether a value is a string, number, boolean, null, undefined, or object before using it.',
        'Use strict equality and explicit conversions to avoid surprising coercion.',
        'Conditions express decisions, and loops repeat work until a clear stopping condition is met.',
        'Validate input and keep browser-side checks separate from authoritative server-side rules.',
      ]} />

      <Bullets items={[
        <span key="prerequisite">Prerequisite: <a href="/learn/html-css">HTML &amp; CSS</a>.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/functions-objects-arrays"
        label="Lesson 02 · Functions, Objects and Arrays"
        text="You can express values and control flow. Next, package behaviour into reusable functions and model related data with objects and arrays."
      />
    </LearnLayout>
  )
}
