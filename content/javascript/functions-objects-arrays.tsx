import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function FunctionsObjectsArrays() {
  return (
    <LearnLayout
      title="Functions, Objects and Arrays"
      description="Function declarations and arrow functions, scope and closures, objects, destructuring, spread, and the array methods you will use daily."
      section="JavaScript & TypeScript — Lesson 02"
      readTime="45 min"
    >
      <Part n={1} label="Why functions" title="Give a Useful Operation a Name">
        <P>
          A function packages a task behind a name. Instead of repeating the same calculation in several places, define it
          once, pass the values it needs, and return a result. A function declaration is available throughout its enclosing
          scope, which makes it convenient for named operations and introductory examples.
        </P>
        <Code lang="javascript" code={`function calculateSubtotal(priceRupees, quantity) {
  return priceRupees * quantity
}

const subtotal = calculateSubtotal(250, 3)
console.log(subtotal) // 750`} />
        <P>
          Parameters are the names in the definition; arguments are the values passed in. A function that returns a value
          lets its caller decide what to do next. A function that only logs output is harder to reuse in a test, a UI, or a
          different workflow. Keep input and output clear, and avoid functions that secretly depend on changing global state.
        </P>
        <Callout type="tip">
          Name functions with verbs such as <code>calculateSubtotal</code>, <code>formatPrice</code>, or
          <code>findLearner</code>. A good name communicates intent without requiring a comment to explain every call.
        </Callout>
        <P>
          Functions can have default parameters. Defaults are used when an argument is omitted or is explicitly
          <code>undefined</code>, not when it is <code>null</code>. Validate inputs at boundaries, especially when values come
          from users or external services.
        </P>
        <Code lang="javascript" code={`function greet(name = 'learner') {
  return 'Hello, ' + name
}

console.log(greet())          // Hello, learner
console.log(greet('Meera'))   // Hello, Meera`} />
      </Part>

      <Part n={2} label="Arrow functions" title="Choose a Function Form That Reads Clearly">
        <P>
          Arrow functions are a concise function expression, often used for callbacks and small operations. They use
          <code>=&gt;</code> between parameters and a body. When the body is one expression, braces and <code>return</code>
          can be omitted. Add braces for multiple statements or when you want the function body to be especially explicit.
        </P>
        <Code lang="javascript" code={`const formatLearner = (name) => 'Learner: ' + name
const addTaxEstimate = (amount, rate) => {
  const tax = amount * rate
  return amount + tax
}

console.log(formatLearner('Meera'))
console.log(addTaxEstimate(100, 0.18))`} />
        <P>
          A key difference: arrow functions do not create their own <code>this</code>. They inherit it from the surrounding
          context. This makes them useful for callbacks that need the enclosing value, but object methods often use method
          syntax. Do not mechanically replace every function with an arrow; select the form that best communicates the role.
        </P>
        <Table
          head={['Form', 'Example', 'Typical use']}
          rows={[
            ['Declaration', 'function total(items) { ... }', 'Named reusable operation; supports hoisting within scope'],
            ['Arrow expression', 'const double = value =&gt; value * 2', 'Callback or concise function value'],
            ['Object method', 'const cart = { add(item) { ... } }', 'Behaviour associated with an object'],
          ]}
          caption="Function forms you will see in modern JavaScript"
        />
        <Callout type="info">
          An arrow function with an object literal needs parentheses around the object so JavaScript parses it as an expression:
          <code>{'const makePoint = (x, y) => ({ x, y })'}</code>.
        </Callout>
      </Part>

      <Part n={3} label="Scope" title="Understand Where Names Can Be Used">
        <P>
          Scope determines where a variable name is visible. A block is the code inside braces. Variables declared with
          <code>let</code> and <code>const</code> are block-scoped: code outside the block cannot use them. Prefer the narrowest
          useful scope, which limits accidental coupling and makes code easier to follow.
        </P>
        <Code lang="javascript" code={`const course = 'JavaScript'

function describeCourse() {
  const level = 'Foundations'
  return course + ' — ' + level
}

console.log(describeCourse())
// level is not available here`} />
        <P>
          A closure happens when a function retains access to variables from the scope where it was created, even after that
          outer function has returned. This is a normal language feature, not a special syntax. Closures support private state,
          callbacks, and functions configured with values.
        </P>
        <Code lang="javascript" code={`function createCounter() {
  let count = 0
  return function increment() {
    count += 1
    return count
  }
}

const nextCount = createCounter()
console.log(nextCount()) // 1
console.log(nextCount()) // 2`} />
        <P>
          The returned function still has access to its own <code>count</code>. A second call to <code>createCounter()</code>
          would create an independent count. Use closures intentionally: if a long-lived callback captures a large object, that
          object may remain reachable longer than expected.
        </P>
        <Callout type="example">
          A formatter can close over a currency code or locale once, then return a reusable function for formatting several
          amounts. Keep configuration separate from the individual values being formatted.
        </Callout>
      </Part>

      <Part n={4} label="Objects" title="Represent a Related Record with an Object">
        <P>
          Objects group related properties under one value. A learner record can hold an ID, a name, and a list of enrolled
          courses. Use dot notation when the property name is known in your code; bracket notation accepts a dynamic property
          name. Choose stable identifiers for records rather than relying on their position in an array.
        </P>
        <Code lang="javascript" code={`const learner = {
  id: 'learner-104',
  name: 'Sana',
  city: 'Hyderabad',
  completedLessons: 4,
}

console.log(learner.name)
console.log(learner['city'])

const propertyToRead = 'completedLessons'
console.log(learner[propertyToRead])`} />
        <P>
          Object property shorthand avoids repeating a variable name when the property and variable are the same. Destructuring
          pulls selected properties into local variables. It can make a function signature clearer, but do not destructure so
          much that the source of a value becomes hard to find.
        </P>
        <Code lang="javascript" code={`const name = 'Sana'
const city = 'Hyderabad'
const profile = { name, city }

const { name: learnerName, completedLessons = 0 } = {
  name: 'Sana',
}
console.log(learnerName, completedLessons)`} />
        <P>
          Object values can contain nested objects or arrays. When reading optional nested data from an API, use optional
          chaining only when absence is expected, and supply a sensible fallback where the UI needs one. Do not use optional
          chaining to hide a broken data contract that should instead be validated.
        </P>
        <Code lang="javascript" code={`const enrollment = { learner: { name: 'Sana' } }
const displayName = enrollment.learner?.name ?? 'Unknown learner'
console.log(displayName)`} />
      </Part>

      <Part n={5} label="Arrays" title="Store Ordered Collections and Transform Them">
        <P>
          An array stores an ordered sequence. Indexes start at zero, and <code>length</code> reports the number of items.
          Use <code>for...of</code> when you need to process every value with statements. Daily application code often uses
          array methods to describe a transformation, which can avoid manual index bookkeeping.
        </P>
        <Code lang="javascript" code={`const modules = ['Fundamentals', 'Objects', 'DOM']
console.log(modules[0])       // Fundamentals
console.log(modules.length)   // 3

for (const moduleName of modules) {
  console.log('Module:', moduleName)
}`} />
        <P>
          <code>map</code> returns a new array with one transformed value for each input item. <code>filter</code> returns a
          new array containing only items that satisfy a test. Neither method changes the original array when your callback
          simply returns a value; keeping transformations pure makes behaviour easier to predict.
        </P>
        <Code lang="javascript" code={`const lessons = [
  { title: 'Values', minutes: 12, complete: true },
  { title: 'Functions', minutes: 18, complete: false },
  { title: 'Arrays', minutes: 15, complete: true },
]

const titles = lessons.map((lesson) => lesson.title)
const completed = lessons.filter((lesson) => lesson.complete)
console.log(titles)
console.log(completed)`} />
        <P>
          <code>reduce</code> combines an array into one result, such as a total. Pass an initial accumulator value so empty
          arrays are handled safely and the result type is predictable. For simple transformations, prefer <code>map</code>
          or <code>filter</code>; an overly clever reduce callback is difficult to maintain.
        </P>
        <Code lang="javascript" code={`const totalMinutes = lessons.reduce(
  (total, lesson) => total + lesson.minutes,
  0,
)
console.log(totalMinutes) // 45`} />
        <Callout type="warning">
          <code>sort()</code> mutates its array, and its default ordering is string-based. When numeric ordering matters, provide
          a comparator and sort a copy if the original order is meaningful: <code>[...scores].sort((a, b) =&gt; a - b)</code>.
        </Callout>
      </Part>

      <Part n={6} label="Copying" title="Use Spread and Destructuring for Clear Updates">
        <P>
          The spread syntax (<code>...</code>) expands an iterable into values or copies enumerable object properties. It is
          useful for making a shallow copy and adding or overriding fields. A shallow copy does not recursively copy nested
          objects; references inside the copy still point to the same nested values.
        </P>
        <Code lang="javascript" code={`const originalTags = ['beginner', 'web']
const tagsForCourse = [...originalTags, 'javascript']

const learner = { name: 'Sana', city: 'Hyderabad' }
const updatedLearner = { ...learner, city: 'Pune' }

console.log(tagsForCourse)
console.log(updatedLearner)
console.log(learner.city) // Hyderabad`} />
        <P>
          Array destructuring is convenient for positions; object destructuring is convenient for named fields. Rest syntax
          collects remaining values. Use it when the group has a clear meaning, not just to shorten a line.
        </P>
        <Code lang="javascript" code={`const coordinates = [17.4, 78.5, 'Hyderabad']
const [latitude, longitude, city] = coordinates

const { name, ...publicDetails } = {
  name: 'Sana',
  email: 'sana@example.test',
  city: 'Pune',
}
console.log(latitude, longitude, city)
console.log(publicDetails)`} />
        <P>
          Updating an array immutably often means building a new array with spread, <code>map</code>, or
          <code>filter</code>. This avoids surprising other code that holds the old reference. In a user interface, predictable
          references make change detection and testing easier.
        </P>
        <Code lang="javascript" code={`const lessons = ['Values', 'Functions']
const withDom = [...lessons, 'The DOM']
const withoutValues = lessons.filter((title) => title !== 'Values')

console.log(withDom)
console.log(withoutValues)
console.log(lessons) // unchanged`} />
      </Part>

      <Part n={7} label="Classes" title="Recognise Class Syntax, but Keep the Model Simple">
        <P>
          Classes provide syntax for constructing objects with related data and methods. They may be useful when several
          instances share the same behaviour. JavaScript classes use prototypes under the hood; you do not need to start every
          data model as a class. A plain object and functions are often simpler for application records.
        </P>
        <Code lang="javascript" code={`class Course {
  constructor(title, lessonCount) {
    this.title = title
    this.lessonCount = lessonCount
  }

  summary() {
    return this.title + ' has ' + this.lessonCount + ' lessons'
  }
}

const course = new Course('JavaScript', 6)
console.log(course.summary())`} />
        <P>
          The constructor initializes an instance. Methods describe behaviour that belongs with instances. Consider whether a
          class adds real clarity: a standalone <code>formatCourse(course)</code> function may be easier to test than creating
          a class hierarchy for a few records.
        </P>
        <Callout type="tip">
          Prefer composition and small functions over deep inheritance trees. The goal is understandable behaviour, not using
          every language feature in each project.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Forgetting return in a multi-line arrow function', cause: 'Braces create a function body where a return statement is required.', fix: 'Write return explicitly, or use a single expression without braces.' },
          { mistake: 'Mutating an array while iterating over it', cause: 'Removing an item shifts later indexes and can skip values.', fix: 'Use filter to build a new array, or iterate carefully over a copy.' },
          { mistake: 'Assuming spread makes a deep copy', cause: 'Nested objects are copied by reference in a shallow spread.', fix: 'Copy nested values intentionally or use an appropriate data-model strategy.' },
          { mistake: 'Using reduce for every array operation', cause: 'A compressed accumulator can hide whether you are filtering, mapping, or totaling.', fix: 'Choose map, filter, or a loop when it explains the task more directly.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Small Course Catalogue Model">
        <Practice
          title="Transform course data using functions and arrays"
          tasks={[
            'Write a function that accepts a price in rupees and quantity and returns a subtotal.',
            'Represent three lessons as objects with title, minutes, and complete fields.',
            'Use map to get lesson titles and filter to find incomplete lessons.',
            'Use reduce with an initial value to calculate the total lesson minutes.',
            'Create a learner object, destructure its name, then create an updated copy with spread without changing the original.',
            'Write a class with a constructor and one method, then describe one reason a plain object might be enough instead.',
          ]}
          hint="Keep each transformation readable, and test it with an empty array as well as a non-empty one."
        />
      </Part>

      <KeyTakeaways items={[
        'Functions name reusable operations; parameters carry inputs and return values make results easy to reuse.',
        'Arrow functions are concise callbacks and inherit this; method syntax is often clearer for object methods.',
        'Lexical scope limits where bindings are visible, while closures retain access to their creation scope.',
        'Objects represent named fields; arrays represent ordered collections.',
        'Destructuring extracts values, and spread makes shallow copies with clear updates.',
        'map transforms, filter selects, and reduce combines; provide an initial reduce value.',
        'Classes are useful syntax for shared instance behaviour, but simple objects and functions often suffice.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/dom-and-events"
        label="Lesson 03 · The DOM and Events"
        text="You can now shape data and write reusable logic. Next, connect that logic to page elements, events, and forms to build an interactive expense tracker."
      />
    </LearnLayout>
  )
}
