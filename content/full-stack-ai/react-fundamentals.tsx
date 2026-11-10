import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ReactFundamentals() {
  return (
    <LearnLayout title="React Fundamentals — Components, Props and JSX" description="Think in components, write JSX, pass props, render lists with keys, and compose a page from small pieces." section="Full-Stack Development with AI — Lesson 01" readTime="40 min">
      <Part n={1} label="Mental model" title="Describe the UI, Do Not Manually Rebuild It">
        <P>React is a JavaScript library for describing user interfaces. You write a function that receives data and returns a tree of elements; React compares that description with the previous one and updates the browser DOM where needed. Instead of asking the browser to find an element and change its text after every event, you express what the screen should look like for the current data.</P>
        <P>We will build a small study planner for Indian students preparing for semester exams or competitive tests. A learner sees a greeting, a list of study tasks, and a progress summary. The data changes over time, but the page is assembled from reusable pieces: a page shell, a task row, and a progress card.</P>
        <Table head={['Idea', 'Meaning', 'Study-planner example']} rows={[
          ['Component', 'A reusable function that returns UI', 'StudyTask renders one task row'],
          ['Props', 'Read-only input passed by a parent', 'A task title and due date'],
          ['JSX', 'JavaScript syntax for describing elements', 'A heading plus a list'],
          ['Composition', 'Building a larger UI from smaller components', 'PlannerPage uses ProgressCard and StudyTask'],
        ]} />
        <Callout type="info">A component should be a useful unit of UI, not automatically one component per HTML tag. Start with a clear responsibility and split when reuse or readability improves.</Callout>
      </Part>
      <Part n={2} label="JSX" title="JSX Is a JavaScript Expression">
        <P>JSX resembles HTML but is compiled into JavaScript calls. It lets markup and logic live near one another while still following JavaScript rules. Use <code>className</code> for CSS classes, close every tag, and wrap sibling elements in one parent or a fragment. Insert an expression with braces; an expression produces a value, while a statement such as an <code>if</code> block does not fit directly inside JSX.</P>
        <Code lang="tsx" file="StudyHeader.tsx" code={`type StudyHeaderProps = { studentName: string; exam: string }\n\nexport function StudyHeader({ studentName, exam }: StudyHeaderProps) {\n  const firstName = studentName.trim().split(" ")[0] || "Learner"\n  return (\n    <header className="page-header">\n      <p>Good evening, {firstName}</p>\n      <h1>{exam} study plan</h1>\n      <p>Small, consistent sessions add up.</p>\n    </header>\n  )\n}`} />
        <P>Braces let you insert a variable or an expression, such as a function call or conditional expression. Keep computation readable: derive a short display value before the return rather than nesting several operations into an unreadable line.</P>
      </Part>
      <Part n={3} label="Components" title="Make Components Small and Composable">
        <P>A component is a normal JavaScript function whose name begins with a capital letter and whose result is renderable UI. Capitalization tells JSX that <code>StudyHeader</code> is a component, while <code>header</code> is a browser element. Put reusable components in separate files when the project grows; for an early exercise, a few components in one file makes the composition visible.</P>
        <Code lang="tsx" file="StudyPlanner.tsx" code={`type Task = { id: string; title: string; subject: string; minutes: number }\n\ntype TaskRowProps = { task: Task }\n\nfunction TaskRow({ task }: TaskRowProps) {\n  return (\n    <li className="task-row">\n      <div><strong>{task.title}</strong><span>{task.subject}</span></div>\n      <span>{task.minutes} min</span>\n    </li>\n  )\n}\n\nfunction TaskList({ tasks }: { tasks: Task[] }) {\n  if (tasks.length === 0) return <p>No sessions yet. Add one to get started.</p>\n  return <ul>{tasks.map((task) => <TaskRow key={task.id} task={task} />)}</ul>\n}\n\nexport function StudyPlanner() {\n  const tasks: Task[] = [\n    { id: "math-1", title: "Revise matrices", subject: "Mathematics", minutes: 45 },\n    { id: "cs-1", title: "Practise SQL joins", subject: "Computer science", minutes: 30 },\n  ]\n  return <main><h1>This week</h1><TaskList tasks={tasks} /></main>\n}`} />
        <P>The list component owns the list presentation, while each row owns one task presentation. This is composition: the parent passes the data down and the child decides how to render its part. A child should not reach into a parent component's local variables or mutate the parent's data.</P>
        <Callout type="tip">If a component is hard to name, mixes unrelated concerns, or is repeated in several places, that is a useful signal to reconsider its boundaries.</Callout>
      </Part>
      <Part n={4} label="Props" title="Pass Explicit Inputs Through Props">
        <P>Props are the interface between a parent and a child. They make dependencies visible and allow the same component to work for many values. With TypeScript, define the expected shape so a missing title or a misspelled field becomes an editor or compiler warning rather than a subtle visual bug.</P>
        <Code lang="tsx" file="ProgressCard.tsx" code={`type ProgressCardProps = {\n  completedSessions: number\n  plannedSessions: number\n  studentName: string\n}\n\nexport function ProgressCard({\n  completedSessions, plannedSessions, studentName,\n}: ProgressCardProps) {\n  const percent = plannedSessions === 0\n    ? 0\n    : Math.round((completedSessions / plannedSessions) * 100)\n\n  return (\n    <section aria-label="Weekly progress">\n      <h2>{studentName}'s progress</h2>\n      <p>{completedSessions} of {plannedSessions} sessions complete</p>\n      <progress value={percent} max={100}>{percent}%</progress>\n    </section>\n  )\n}`} />
        <P>Notice that progress is derived from the two input numbers. Do not store both the source values and a percentage that can be calculated from them; duplicate state can drift out of sync. Props are read-only by convention: if a child needs a change, it asks the parent through a callback, which we will use in the next lesson.</P>
      </Part>
      <Part n={5} label="Lists" title="Render Data Collections with Stable Keys">
        <P>Use JavaScript's <code>map</code> to transform an array into elements. React needs a stable key on each repeated item so it can match the same task between renders. A database identifier or a persistent ID is best. Array indexes are unsafe when items can be reordered, inserted, or deleted because React may associate a row's old state with a different task.</P>
        <Code lang="tsx" file="TaskList.tsx" code={`type Task = { id: string; title: string; subject: string }\n\nexport function TaskList({ tasks }: { tasks: Task[] }) {\n  if (tasks.length === 0) {\n    return <p>Your plan is empty. Add a short study session.</p>\n  }\n\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <li key={task.id}>\n          <strong>{task.title}</strong>\n          <span> — {task.subject}</span>\n        </li>\n      ))}\n    </ul>\n  )\n}`} />
        <P>Keys are special instructions for React and are not passed as ordinary props. If the row needs the ID for a button handler, pass <code>taskId=&#123;task.id&#125;</code> separately. Always plan for the empty state: a blank area does not tell a student whether the app is loading, broken, or simply has no sessions.</P>
        <Callout type="example">For a student in Hyderabad with no plan created yet, show a clear empty-state message and an action to add the first session; do not show a fabricated sample task as if it were saved data.</Callout>
      </Part>
      <Part n={6} label="Project structure" title="Compose the First Planner Screen">
        <P>Start with static, believable data and focus on the component tree. Once it is readable, you can add interactions and connect it to a server. Keep one source of truth for each piece of data, give components semantic HTML, and use actual headings, lists, and buttons so keyboard and assistive-technology users can understand the page.</P>
        <Steps items={[
          'Create a page shell that owns the student name and the current week title.',
          'Create a ProgressCard with counts passed as props.',
          'Create a TaskList that handles both populated and empty arrays.',
          'Create a TaskRow that presents one task without knowing where it came from.',
          'Render the page and check the browser console for missing-key warnings.',
        ]} />
        <P>Components should be deterministic for the same props. Avoid reading from the browser, fetching data, or changing global variables during render. Those concerns belong in effects, event handlers, or server-side data access, which later lessons introduce.</P>
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using a lowercase component name', cause: 'JSX treats lowercase names as native HTML elements.', fix: 'Use PascalCase, such as StudyTask, for your own components.' },
          { mistake: 'Using array position as a key for editable rows', cause: 'Reordering changes which record an index refers to.', fix: 'Use a stable ID from the task or create one when the task is created.' },
          { mistake: 'Mutating a prop or shared array', cause: 'React cannot reliably detect the intended change and other consumers see surprises.', fix: 'Treat props as immutable and send changes to the owner through callbacks.' },
          { mistake: 'Returning several adjacent JSX roots', cause: 'A component must return one tree root.', fix: 'Wrap siblings in a semantic element or a fragment.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Build a Read-Only Study Plan">
        <Practice title="A planner screen that is ready to become interactive" tasks={[
          'Create a StudyHeader that accepts a student name and exam name as typed props.',
          'Define a Task type and render three study sessions with stable IDs and keys.',
          'Create a reusable ProgressCard and derive its percentage from completed and planned counts.',
          'Show a helpful empty state when the task array is empty.',
          'Inspect the screen at a narrow viewport and make long subject names wrap without breaking the layout.',
        ]} hint="Keep this version static. The next lesson adds controlled form state and completion actions." />
      </Part>
      <KeyTakeaways items={[
        'A React component describes UI as a function of its inputs.',
        'JSX is JavaScript syntax with rules: one root, closed tags, className, and braces for expressions.',
        'Props define explicit, read-only inputs and can be typed with TypeScript.',
        'Compose a page from components with clear responsibilities.',
        'Map arrays to elements with stable keys and deliberate empty states.',
        'Derive display values instead of storing duplicate data that can become inconsistent.',
      ]} />
      <Bullets items={[<span key="reference">Prerequisite: <a href="/learn/javascript">JavaScript &amp; TypeScript</a>. Consult the official React documentation for JSX, components, and rendering lists.</span>]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/react-state-effects" label="Lesson 02 · React State, Effects and Data Fetching" text="Give the planner controlled forms, completion buttons, and reliable loading states with React state and effects." />
    </LearnLayout>
  )
}
