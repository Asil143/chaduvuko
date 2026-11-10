import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ArrayMethodsInDepth() {
  return (
    <LearnLayout
      title="Array Methods in Depth — map, filter, reduce, sort"
      description="Transform real data with map, filter, reduce, find, some, every, flatMap and sort, chain them clearly, and avoid mutation bugs."
      section="JavaScript & TypeScript — Lesson 04"
      readTime="35 min"
    >
      <Part n={1} label="Transforming data" title="Think in Input Arrays and Output Arrays">
        <P>
          Applications constantly reshape collections: a learning dashboard filters completed courses, a delivery app totals
          order items, or a finance view sorts expenses. Array methods express these transformations directly. Start with a
          clear input, use each callback for one job, and assign the result a name that explains what it represents.
        </P>
        <P>
          Most methods return a new array without changing the original. Important exceptions include <code>sort()</code>,
          <code> reverse()</code>, <code>splice()</code>, and direct index assignment. Knowing which methods mutate lets you
          safely share data between components and calculations.
        </P>
        <Callout type="example">
          A UPI expense list might be filtered by category, mapped to display rows, and reduced to a total. Use sample values
          for learning; a real account balance must come from a trusted financial system, not a browser-side calculation.
        </Callout>
        <Table
          head={['Need', 'Method', 'Result']}
          rows={[
            ['Convert every item', 'map()', 'A new array with one result per input'],
            ['Keep matching items', 'filter()', 'A new array containing selected items'],
            ['Find one match', 'find()', 'The first match or undefined'],
            ['Check whether any match', 'some()', 'A boolean; stops when a match is found'],
            ['Check whether all match', 'every()', 'A boolean; stops when one fails'],
            ['Combine into one value', 'reduce()', 'A value such as a sum, object, or grouped result'],
          ]}
          caption="Choose the method by the shape of the result you need"
        />
      </Part>

      <Part n={2} label="One result per item" title="Use map to Produce a Corresponding Value">
        <P>
          <code>map()</code> calls a function for each element and returns a new array of the returned values. It keeps the
          number of positions the same, including holes in sparse arrays. Use it when each input item has a corresponding
          output. If you only need a side effect such as logging, use a loop or <code>forEach()</code> instead.
        </P>
        <Code lang="javascript" code={`const lessons = [
  { id: 'js-01', title: 'Variables', minutes: 12 },
  { id: 'js-02', title: 'Functions', minutes: 18 },
  { id: 'js-03', title: 'Arrays', minutes: 15 },
]

const lessonCards = lessons.map((lesson) => ({
  key: lesson.id,
  label: lesson.title,
  durationText: lesson.minutes + ' min',
}))

console.log(lessonCards)`} />
        <P>
          The callback receives the item, its index, and the original array. Usually the item is enough. An explicit callback
          parameter helps readers understand the transformation. Avoid returning nothing accidentally: a block-bodied arrow
          function needs an explicit <code>return</code>.
        </P>
        <Callout type="tip">
          Name the result after what it means, such as <code>lessonCards</code>, rather than a generic name like
          <code> changed</code>. Clear names make transformation pipelines easier to debug.
        </Callout>
      </Part>

      <Part n={3} label="Selecting items" title="Use filter and Find Methods for Decisions">
        <P>
          <code>filter()</code> keeps items whose callback returns a truthy value. The predicate should communicate the
          selection rule: <code>expense.amount &gt; 0</code> or <code>course.isPublished</code>. Use <code>find()</code> when
          you need only the first matching item. It returns <code>undefined</code> when there is no match, so handle that case
          before reading a property.
        </P>
        <Code lang="javascript" code={`const expenses = [
  { description: 'Bus pass', category: 'travel', amount: 450 },
  { description: 'Lunch', category: 'food', amount: 180 },
  { description: 'Metro', category: 'travel', amount: 60 },
]

const travelExpenses = expenses.filter((expense) => expense.category === 'travel')
const lunch = expenses.find((expense) => expense.description === 'Lunch')

console.log(travelExpenses.length)
console.log(lunch ? lunch.amount : 'No lunch expense found')`} />
        <P>
          <code>some()</code> and <code>every()</code> answer boolean questions and stop as soon as the answer is known. For an
          empty array, <code>some()</code> is false and <code>every()</code> is true: there is no counterexample to the
          universal claim that every element passes. That detail matters when the empty case has product meaning.
        </P>
        <Code lang="javascript" code={`const hasLargeExpense = expenses.some((expense) => expense.amount >= 1000)
const allHaveDescriptions = expenses.every((expense) => expense.description.length > 0)

console.log({ hasLargeExpense, allHaveDescriptions })`} />
      </Part>

      <Part n={4} label="Combining values" title="Reduce When the Output Is One Accumulator">
        <P>
          <code>reduce()</code> carries an accumulator through the array and returns its final value. Supply an initial value
          that matches the result you intend. A sum starts at zero; a grouped object starts as an object. Without an initial
          value, the first array item becomes the accumulator and empty input throws, so explicit initialization is usually
          safer and clearer.
        </P>
        <Code lang="javascript" code={`const cart = [
  { name: 'Notebook', price: 120, quantity: 2 },
  { name: 'Pen set', price: 85, quantity: 1 },
  { name: 'Backpack', price: 900, quantity: 1 },
]

const subtotal = cart.reduce((total, item) => {
  return total + item.price * item.quantity
}, 0)

console.log('Subtotal: ₹' + subtotal)`} />
        <P>
          <code>reduce()</code> is flexible, but flexibility can hide a simple operation. Use <code>map()</code> for a one-to-one
          conversion, <code>filter()</code> for selection, and <code>reduce()</code> when combining many items genuinely makes
          the code clearer. A named callback can help when the reducer becomes longer than a few lines.
        </P>
        <Callout type="info">
          JavaScript numbers use floating-point arithmetic. For real payment calculations, use a well-defined integer minor-unit
          or decimal strategy and validate on a trusted backend; this simple rupee example is for teaching collection methods.
        </Callout>
      </Part>

      <Part n={5} label="Flatten and order" title="Combine flatMap with Careful Sorting">
        <P>
          <code>flatMap()</code> maps each item and flattens one array level. It is useful when one record produces zero, one,
          or several results. For example, a module can produce one row per lesson, while an empty module produces none.
        </P>
        <Code lang="javascript" code={`const modules = [
  { title: 'JavaScript', lessons: ['Values', 'Functions'] },
  { title: 'Web APIs', lessons: ['DOM'] },
]

const lessonRows = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ module: module.title, lesson }))
)
console.log(lessonRows)`} />
        <P>
          <code>sort()</code> changes the array it is called on. It converts values to strings by default, which makes numeric
          sorting surprising. Provide a comparator that returns a negative number, zero, or a positive number. To preserve the
          original array, copy it first with spread, then sort the copy.
        </P>
        <Code lang="javascript" code={`const scores = [42, 7, 105, 18]
const ascendingScores = [...scores].sort((a, b) => a - b)
const descendingScores = [...scores].sort((a, b) => b - a)

const learners = [
  { name: 'Meera', progress: 82 },
  { name: 'Arjun', progress: 95 },
]
const rankedLearners = [...learners].sort((a, b) => b.progress - a.progress)

console.log(scores) // original order stays the same
console.log(ascendingScores, descendingScores, rankedLearners)`} />
        <Callout type="warning">
          A comparator must describe the ordering consistently. Returning only true or false does not give sort the numeric
          comparison it expects. For locale-aware names, use <code>localeCompare()</code> rather than assuming character codes
          match human ordering.
        </Callout>
      </Part>

      <Part n={6} label="Readable pipelines" title="Chain Transformations Without Hiding the Work">
        <P>
          Chaining methods is useful when each step is short and the result flows naturally to the next step. Break a long or
          domain-heavy chain into named intermediate arrays. This makes it possible to inspect each stage in DevTools and
          gives future readers a vocabulary for the logic.
        </P>
        <Code lang="javascript" code={`const publishedCourses = [
  { title: 'JavaScript', category: 'programming', published: true, lessons: 14 },
  { title: 'Draft: Databases', category: 'data', published: false, lessons: 8 },
  { title: 'Python', category: 'programming', published: true, lessons: 20 },
]

const programmingTitles = publishedCourses
  .filter((course) => course.published)
  .filter((course) => course.category === 'programming')
  .map((course) => course.title)

console.log(programmingTitles)`} />
        <Steps items={[
          'Write down the desired output shape before choosing methods.',
          'Use a predicate for selection and a conversion for mapping.',
          'Give reduce an explicit initial value that matches its output.',
          'Check whether any method in the pipeline mutates its input.',
          'Extract a named intermediate result when a chain becomes hard to scan.',
        ]} />
        <P>
          Array methods visit elements in order and usually create intermediate arrays when chained. For ordinary UI data this
          is often a worthwhile readability trade-off. For measured performance issues, profile realistic data before replacing
          clear transformations with a hand-written loop.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using map only to perform side effects', cause: 'map creates a new array of callback results that the code then ignores.', fix: 'Use forEach or a for...of loop when each element needs an action rather than a transformed result.' },
          { mistake: 'Forgetting to return from a block-bodied map callback', cause: 'Braces create a function body, and JavaScript does not insert a return automatically.', fix: 'Add return or use a concise expression-bodied arrow function.' },
          { mistake: 'Calling reduce without an initial value', cause: 'Empty input throws and the first element is treated as the accumulator.', fix: 'Provide an initial value that matches the final result, such as 0 for a sum.' },
          { mistake: 'Sorting the original state array', cause: 'sort mutates in place and may unexpectedly reorder data used elsewhere.', fix: 'Sort a shallow copy, for example [...items].sort(compare), and avoid mutating nested objects too.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Create a Course and Expense Summary">
        <Practice
          title="Transform a small dataset with intention"
          tasks={[
            'Create an array of course records and map it to display labels with title and lesson count.',
            'Filter to published courses with at least one lesson, then find a course by its id and handle a missing match.',
            'Use some and every to answer whether any course is unfinished and whether all course titles are present.',
            'Create expense records and reduce them to totals by category, starting with an empty object.',
            'Sort a copy of the expenses from highest to lowest amount and verify the source array was not reordered.',
            'Flatten a nested list of modules and lesson names with flatMap, then explain each pipeline stage in a sentence.',
          ]}
          hint="Use small test arrays, include an empty array, and log both the source and result whenever mutation is possible."
        />
      </Part>

      <KeyTakeaways items={[
        'map converts each array element; filter selects elements; find returns the first match or undefined.',
        'some and every answer boolean questions and short-circuit once the answer is known.',
        'reduce combines values; an explicit initial value makes empty-input behavior predictable.',
        'flatMap can map to zero or many results while flattening one level.',
        'sort mutates and sorts as strings by default; pass a comparator and sort a copy when preserving input matters.',
        'Readable named stages are often better than a long chain, and performance tuning should follow measurement.',
      ]} />

      <H3>Next</H3>
      <NextLesson href="/learn/javascript/classes-prototypes" label="Lesson 05 · Classes, Prototypes and Inheritance" text="Learn how objects delegate behavior through prototypes and how classes build on that model." />
    </LearnLayout>
  )
}
