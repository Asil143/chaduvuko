import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function ScopeClosuresThis() {
  return (
    <LearnLayout
      title="Scope, Closures and this"
      description="Block and function scope, hoisting, closures in practice, and how this is decided in methods, callbacks, arrow functions and classes."
      section="JavaScript & TypeScript — Lesson 03"
      readTime="40 min"
    >
      <Part n={1} label="Where names live" title="Scope Controls Which Code Can See a Variable">
        <P>
          Scope is the set of places where a name can be accessed. JavaScript looks for a name in the current scope first, then
          walks outward through enclosing scopes. This lexical lookup follows where functions and blocks are written, not which
          function happened to call them. Keeping variables in the narrowest useful scope reduces accidental coupling.
        </P>
        <Code lang="javascript" code={`const course = 'JavaScript'

function describeCourse() {
  const level = 'Foundations'
  if (level) {
    const topic = 'scope'
    console.log(course, level, topic)
  }
  // topic is not visible here
}

describeCourse()
// level is not visible here either`} />
        <P>
          <code>let</code> and <code>const</code> are block-scoped. A block is commonly the code inside braces in a function,
          conditional, loop, or standalone block. <code>const</code> prevents reassignment of the binding; it does not freeze
          an object stored in that binding. Prefer <code>const</code> by default, then use <code>let</code> when reassignment
          is part of the design.
        </P>
        <Callout type="tip">
          If a value is only used inside one function, declare it there. Smaller scope makes it easier to understand state and
          prevents unrelated code from silently depending on it.
        </Callout>
      </Part>

      <Part n={2} label="Before execution" title="Hoisting Does Not Mean Every Name Is Ready">
        <P>
          JavaScript processes declarations before running a scope, but different declarations behave differently. Function
          declarations can be called before their written position. A <code>var</code> binding is available throughout its
          function scope and starts as <code>undefined</code>. <code>let</code> and <code>const</code> are also registered for
          their block, but cannot be read before their declaration is evaluated; that interval is the temporal dead zone.
        </P>
        <Code lang="javascript" code={`console.log(readLabel())

function readLabel() {
  return 'Ready'
}

console.log(status) // undefined
var status = 'loaded'

// A let or const read before its declaration throws a ReferenceError.
// Keep declarations before their first use instead of relying on hoisting.`} />
        <Table
          head={['Declaration', 'Scope', 'Before declaration runs']}
          rows={[
            ['function declaration', 'Enclosing scope', 'Callable in that scope'],
            ['var', 'Function (or global) scope', 'Binding exists with value undefined'],
            ['let', 'Block scope', 'In temporal dead zone; reading throws'],
            ['const', 'Block scope', 'In temporal dead zone; reading throws'],
          ]}
          caption="Practical declaration behaviour"
        />
        <P>
          Avoid using <code>var</code> in new code: its function scope and redeclaration rules can make loop and conditional
          behavior surprising. Understanding it still helps when reading older scripts. Modern code is clearer when a binding
          is declared close to its first use.
        </P>
      </Part>

      <Part n={3} label="Functions remember" title="A Closure Keeps Access to Its Lexical Environment">
        <P>
          A closure is a function together with access to the variables in the lexical environment where it was created. When
          an outer function returns an inner function, the inner function can still use those variables. Each call to the
          outer function creates a separate environment, which makes closures useful for independent state.
        </P>
        <Code lang="javascript" code={`function createCounter(startAt = 0) {
  let count = startAt

  return function increment() {
    count += 1
    return count
  }
}

const firstCounter = createCounter()
const secondCounter = createCounter(10)
console.log(firstCounter()) // 1
console.log(firstCounter()) // 2
console.log(secondCounter()) // 11`} />
        <P>
          The <code>count</code> variable cannot be accessed directly outside the returned function, but the closure can read
          and update it. This is encapsulation, not encryption: the value is still part of the running program. Closures also
          power event handlers, timers, and callbacks that need the values surrounding their creation.
        </P>
        <Callout type="example">
          A delivery-fee calculator can close over a chosen service zone and return a function that prices many orders in that
          zone. Keep stable configuration in the closure and pass each changing order as an argument.
        </Callout>
      </Part>

      <Part n={4} label="A function's receiver" title="For Ordinary Functions, this Comes from the Call Site">
        <P>
          The value of <code>this</code> is not determined by the function's name or where it is declared. For an ordinary
          function, inspect how it is called. Calling a method as <code>object.method()</code> gives that call the object as
          its receiver. Saving the method and calling it alone loses that receiver. In strict mode, a plain function call has
          <code> undefined</code> for <code>this</code>; do not depend on global-object behavior.
        </P>
        <Code lang="javascript" code={`const learner = {
  name: 'Anika',
  introduce() {
    return 'Hi, I am ' + this.name
  },
}

console.log(learner.introduce())
const introduce = learner.introduce
console.log(introduce()) // this is not learner`} />
        <P>
          The second call does not preserve the object relationship. If an operation needs a specific receiver, keep calling it
          as a method or create a bound function. This rule matters in callbacks because passing <code>learner.introduce</code>
          passes the function value, not a promise that it will later be called through <code>learner</code>.
        </P>
        <Table
          head={['Call form', 'How to reason about this']}
          rows={[
            ['object.method()', 'The object before the dot is the receiver'],
            ['method() as a plain call', 'No receiver is supplied; strict mode gives undefined'],
            ['method.call(value)', 'The first argument supplies the receiver'],
            ['boundMethod()', 'The receiver is fixed when bind() creates the function'],
            ['arrow()', 'Uses this from its surrounding lexical scope'],
          ]}
        />
      </Part>

      <Part n={5} label="Choose a binding" title="Use call, apply or bind When You Need a Receiver">
        <P>
          <code>call</code> invokes a function immediately with a chosen receiver and separate arguments. <code>apply</code>
          does the same with arguments in an array-like list. <code>bind</code> returns a new function with its receiver
          fixed; it does not run the function at bind time. These tools are useful for legacy APIs and callbacks, though a
          small wrapper function is often easiest to read.
        </P>
        <Code lang="javascript" code={`function formatBalance(currency) {
  return currency + ' ' + this.balance.toFixed(2)
}

const wallet = { balance: 1250 }
console.log(formatBalance.call(wallet, '₹'))
console.log(formatBalance.apply(wallet, ['₹']))

const showWalletBalance = formatBalance.bind(wallet, '₹')
console.log(showWalletBalance())`} />
        <P>
          Arrow functions are different: they do not have their own <code>this</code>, and <code>call</code>,
          <code> apply</code>, or <code>bind</code> cannot replace their lexical value. Use an arrow when you want a callback
          to keep the surrounding receiver. Use method syntax for object behavior that should receive the object at call time.
        </P>
        <Code lang="javascript" code={`const dashboard = {
  name: 'Learner dashboard',
  scheduleGreeting() {
    setTimeout(() => {
      console.log('Welcome to ' + this.name)
    }, 0)
  },
}

dashboard.scheduleGreeting()`} />
        <Callout type="info">
          A class method is still an ordinary function with a receiver. Passing an unbound instance method as a callback can
          lose its instance. Bind it deliberately or use a wrapper callback.
        </Callout>
      </Part>

      <Part n={6} label="Debugging mental model" title="Trace the Binding and the Call Separately">
        <P>
          When a value is unexpectedly undefined, ask two separate questions: which declaration supplies the name, and where
          was the function called? For a closure, follow the lexical scopes outward. For <code>this</code>, inspect the call
          expression rather than the function body. Breakpoints and small logging statements can show both without changing
          the design.
        </P>
        <Code lang="javascript" code={`function makeGreeter(greeting) {
  return function greet(name) {
    return greeting + ', ' + name
  }
}

const sayHello = makeGreeter('Hello')
const sayKiaOra = makeGreeter('Kia ora')
console.log(sayHello('Ravi'))
console.log(sayKiaOra('Ravi'))`} />
        <P>
          Each returned function refers to its own <code>greeting</code>. If a callback behaves differently from a direct
          method call, inspect whether the callback is invoked with the original receiver. These are separate mechanisms:
          lexical scope resolves names; the call site supplies <code>this</code> for ordinary functions.
        </P>
        <Bullets items={[
          'Find the declaration that a name resolves to, starting from the innermost scope.',
          'Check whether a let or const is being read before its declaration executes.',
          'For ordinary functions, inspect the exact expression that calls the function.',
          'For an arrow, look outward to the surrounding this rather than searching for a receiver at the call site.',
        ]} />
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Reading a let or const before its declaration', cause: 'The binding exists but remains in the temporal dead zone until its declaration runs.', fix: 'Move initialization before use and keep declarations near their first use.' },
          { mistake: 'Expecting a returned function to lose its outer variables', cause: 'Closures retain access to their lexical environment after the outer call returns.', fix: 'Use closures intentionally for private state and avoid capturing unnecessary long-lived objects.' },
          { mistake: 'Passing an object method directly as a callback', cause: 'The callback is invoked as a plain function, so its original receiver is not automatically preserved.', fix: 'Pass a wrapper such as () => object.method(), or bind the method when creating the callback.' },
          { mistake: 'Using an arrow as a method that needs its own receiver', cause: 'An arrow inherits this from where it was created and cannot receive a replacement this.', fix: 'Use method syntax for receiver-based object behavior; use arrows for lexical callbacks.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build a Small Configurable Study Helper">
        <Practice
          title="Closures and this in everyday code"
          tasks={[
            'Write createCounter(startAt) with next(), current(), and reset(value) functions that share private count state.',
            'Create a formatter factory that closes over a currency symbol and formats several rupee amounts.',
            'Create an object with a method that returns a formatted message using this, then save and call the method separately to observe the difference.',
            'Fix the detached call with bind and with a wrapper arrow; explain how the two solutions differ.',
            'Write one ordinary callback and one arrow callback inside an object method. Predict and then log each this value.',
          ]}
          hint="Use a fresh object and small console.log checks. Keep scope lookup separate from reasoning about the call-site receiver."
        />
      </Part>

      <KeyTakeaways items={[
        'Scope determines where a variable name can be used; let and const are block-scoped.',
        'Function declarations, var, and let/const have different hoisting behavior; prefer declarations before use.',
        'A closure retains access to its lexical environment and can keep independent private state.',
        'For ordinary functions, this depends on how the function is called, not simply where it was written.',
        'call and apply invoke with a chosen receiver; bind creates a function with a fixed receiver.',
        'Arrow functions inherit this lexically and are useful for callbacks that need the surrounding receiver.',
      ]} />

      <H3>Next</H3>
      <NextLesson href="/learn/javascript/array-methods-in-depth" label="Lesson 04 · Array Methods in Depth — map, filter, reduce, sort" text="Transform collections with the array methods you will use in everyday applications." />
    </LearnLayout>
  )
}
