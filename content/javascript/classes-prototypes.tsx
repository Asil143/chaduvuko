import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ClassesPrototypes() {
  return (
    <LearnLayout
      title="Classes, Prototypes and Inheritance"
      description="How prototypes work, ES classes, constructors, getters and setters, private fields, inheritance and when to prefer composition."
      section="JavaScript & TypeScript — Lesson 05"
      readTime="40 min"
    >
      <Part n={1} label="Objects delegate" title="JavaScript Objects Can Share Behavior Through Prototypes">
        <P>
          An object stores properties and can delegate a property lookup to another object called its prototype. If a property
          is not found directly, JavaScript checks the prototype, then that object's prototype, continuing up the chain until
          it finds the property or reaches the end. This delegation lets many objects share methods without copying a method
          onto every instance.
        </P>
        <Code lang="javascript" code={`const vehicleBehavior = {
  describe() {
    return this.name + ' is ready'
  },
}

const scooter = Object.create(vehicleBehavior)
scooter.name = 'City scooter'
console.log(scooter.describe())
console.log(Object.getPrototypeOf(scooter) === vehicleBehavior)`} />
        <P>
          The method is owned by <code>vehicleBehavior</code>, while <code>name</code> belongs to <code>scooter</code>. During
          the method call, <code>this</code> is still the object before the dot. Most application code uses object literals and
          classes, but understanding delegation explains how shared methods and built-in APIs work.
        </P>
        <Callout type="info">
          A prototype is a delegation link, not a class declaration. JavaScript classes provide a familiar syntax on top of
          the same prototype-based behavior.
        </Callout>
      </Part>

      <Part n={2} label="Inspect the chain" title="Own Properties and Inherited Properties Are Different">
        <P>
          <code>Object.hasOwn()</code> checks whether an object itself contains a property. The <code>in</code> operator also
          checks its prototype chain. This distinction matters when enumerating data, copying records, or deciding whether a
          property is inherited behavior. Avoid creating prototypes from untrusted input or changing built-in prototypes.
        </P>
        <Code lang="javascript" code={`const sharedActions = {
  open() {
    return 'Opening ' + this.label
  },
}

const panel = Object.create(sharedActions)
panel.label = 'course panel'

console.log(Object.hasOwn(panel, 'label')) // true
console.log(Object.hasOwn(panel, 'open')) // false
console.log('open' in panel) // true
console.log(panel.open())`} />
        <P>
          Property lookup follows the chain at runtime. If a property is assigned directly to an instance, it can shadow an
          inherited property with the same name. That flexibility is powerful, but it can also make behavior harder to trace
          when objects are modified without a clear contract.
        </P>
        <Table
          head={['Question', 'Useful check', 'What it includes']}
          rows={[
            ['Does this object own the property?', 'Object.hasOwn(object, key)', 'Only direct properties'],
            ['Can this object access the property?', 'key in object', 'Direct and inherited properties'],
            ['What object is its prototype?', 'Object.getPrototypeOf(object)', 'The next link in the delegation chain'],
          ]}
        />
      </Part>

      <Part n={3} label="Class syntax" title="Use a Class to Create Similar Objects">
        <P>
          A class gives you a named pattern for constructing instances. The constructor initializes each instance; methods are
          placed on the class prototype and shared. Calling a class without <code>new</code> throws. Use classes when the
          application benefits from a clear type of object with related state and behavior, not just because a record has
          several fields.
        </P>
        <Code lang="javascript" code={`class CourseProgress {
  constructor(title, completedLessons = 0) {
    this.title = title
    this.completedLessons = completedLessons
  }

  completeLesson() {
    this.completedLessons += 1
    return this.completedLessons
  }
}

const javascript = new CourseProgress('JavaScript')
javascript.completeLesson()
console.log(javascript.title, javascript.completedLessons)
console.log(Object.hasOwn(javascript, 'completeLesson')) // false`} />
        <P>
          The instance has its own fields; the method is shared through the prototype. Class bodies run in strict mode, so a
          detached method has no implicit global receiver. If a method is passed somewhere else, preserve the receiver
          intentionally rather than assuming the class binds it automatically.
        </P>
      </Part>

      <Part n={4} label="Access and invariants" title="Getters, Setters and Private Fields">
        <P>
          A getter computes a property when it is read, and a setter can validate a value when it is assigned. Use them when
          they make an object's public interface clearer, not to disguise expensive or surprising work as a simple property
          read. Private fields use a <code>#</code> prefix and can only be accessed inside the class body. They are useful for
          enforcing an invariant but are not a replacement for validation at external boundaries.
        </P>
        <Code lang="javascript" code={`class QuizScore {
  #points = 0

  get points() {
    return this.#points
  }

  add(points) {
    if (!Number.isFinite(points) || points < 0) {
      throw new Error('Points must be a non-negative number')
    }
    this.#points += points
  }
}

const score = new QuizScore()
score.add(8)
console.log(score.points)
// score.#points is not accessible outside the class`} />
        <P>
          The example keeps the internal field private and exposes only the operations the caller needs. Returning a copy of
          mutable internal collections can also prevent callers from bypassing the class's rules. Keep the public API small so
          future changes do not break every caller.
        </P>
        <Callout type="warning">
          Private fields are enforced by the language, but client-side code is still visible to its user. Do not treat a
          browser class or private field as an authorization or security boundary.
        </Callout>
      </Part>

      <Part n={5} label="Specialization" title="Inheritance Reuses Behavior but Adds Coupling">
        <P>
          A subclass extends a base class and can add behavior. Its constructor must call <code>super()</code> before using
          <code> this</code>. Inheritance works best for a genuine "is a" relationship with a stable shared contract. A deep
          hierarchy makes changes ripple across multiple levels, so keep it shallow and prefer composition when an object can
          use a capability without being a subtype.
        </P>
        <Code lang="javascript" code={`class LearningResource {
  constructor(title) {
    this.title = title
  }

  summary() {
    return this.title
  }
}

class VideoLesson extends LearningResource {
  constructor(title, durationMinutes) {
    super(title)
    this.durationMinutes = durationMinutes
  }

  summary() {
    return super.summary() + ' (' + this.durationMinutes + ' min)'
  }
}

const lesson = new VideoLesson('Closures', 14)
console.log(lesson.summary())`} />
        <P>
          Overriding a method should preserve the expectations callers have about the base behavior. If a subclass cannot be
          used wherever the base type is expected, the relationship may be misleading. A small focused object passed into a
          larger object often makes the intended collaboration clearer.
        </P>
      </Part>

      <Part n={6} label="Composition" title="Build Objects from Capabilities When That Is Simpler">
        <P>
          Composition means combining smaller objects or functions to create a behavior, instead of creating a subclass for
          every variation. A course can receive a formatter or storage adapter as a dependency. This keeps policy separate
          from the object that uses it and makes behavior easier to replace in tests.
        </P>
        <Code lang="javascript" code={`function createCourseCard(course, formatDuration) {
  return {
    title: course.title,
    durationLabel: formatDuration(course.minutes),
  }
}

const formatMinutes = (minutes) => minutes + ' min'
const card = createCourseCard(
  { title: 'Array methods', minutes: 35 },
  formatMinutes
)
console.log(card)`} />
        <Steps items={[
          'Start with the behavior callers need, not with a hierarchy diagram.',
          'Use a class when instances share state and a stable set of operations.',
          'Use inheritance for a true subtype with a substitutable contract.',
          'Use composition when behavior is a replaceable capability or policy.',
          'Keep constructors and methods small, and test public behavior through the interface.',
        ]} />
        <P>
          Plain objects and functions are often enough. Classes are a tool, not a requirement for object-oriented design. Pick
          the simplest representation that preserves the rules the application needs.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming a method is copied onto every instance', cause: 'Class methods are shared through the prototype unless defined as instance fields.', fix: 'Use Object.hasOwn and Object.getPrototypeOf when inspecting where behavior lives.' },
          { mistake: 'Calling a class without new', cause: 'Class constructors are designed to create instances and reject ordinary function calls.', fix: 'Create instances with new or use a factory function when construction syntax is not useful.' },
          { mistake: 'Using this before super() in a subclass constructor', cause: 'A derived instance is not initialized until the base constructor runs.', fix: 'Call super() first, then set subclass fields.' },
          { mistake: 'Building a deep inheritance tree for every variation', cause: 'Each layer couples behavior and makes overrides difficult to reason about.', fix: 'Prefer shallow hierarchies or compose small capabilities as dependencies.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Model a Small Learning Catalogue">
        <Practice
          title="Use prototypes, classes and composition deliberately"
          tasks={[
            'Create two objects that delegate a shared describe method through Object.create, and check own versus inherited properties.',
            'Write a CourseProgress class with a private completed count, a getter, and a method that validates completion updates.',
            'Create a VideoLesson subclass and call an overridden summary method that uses super.',
            'Refactor one optional behavior into a function dependency passed to a factory instead of another subclass.',
            'Write tests using plain assertions for valid updates, invalid inputs, and the public output of each object.',
          ]}
          hint="Test behavior through public methods. Avoid exposing private state only to make a test pass."
        />
      </Part>

      <KeyTakeaways items={[
        'Objects delegate property lookup through a prototype chain.',
        'Object.hasOwn checks direct data; the in operator includes inherited properties.',
        'Class syntax builds instances whose methods are generally shared on the class prototype.',
        'Getters, setters, and private fields can protect a small public interface and internal invariants.',
        'Inheritance models a true subtype and must preserve the base contract.',
        'Composition is often clearer when behavior is a replaceable capability rather than an identity relationship.',
      ]} />

      <H3>Next</H3>
      <NextLesson href="/learn/javascript/dom-and-events" label="Lesson 06 · The DOM and Events" text="Connect JavaScript behavior to browser elements and respond to user interactions." />
    </LearnLayout>
  )
}
