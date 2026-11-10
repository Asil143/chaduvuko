import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ReactStateEffects() {
  return (
    <LearnLayout title="React State, Effects and Data Fetching" description="useState, controlled forms, lifting state up, useEffect done right, and fetching data with loading and error states." section="Full-Stack Development with AI — Lesson 02" readTime="40 min">
      <Part n={1} label="State" title="State Is Data That Changes the Screen">
        <P>The previous lesson rendered a fixed study plan. Real users need to mark a session complete, add a revision task, or load a saved plan. State is component-owned data that can change over time. When you update state using its setter, React renders again using the new value. A local variable does not do that: changing a normal variable is invisible to React.</P>
        <P>Use state for values that change in response to user actions or external data. For a study planner, that might be the task list, the text being typed into a form, or a request status. Avoid creating state for values that can be calculated from existing state, such as the number of completed tasks.</P>
        <Table head={['Value', 'State?', 'Reason']} rows={[
          ['Current task array', 'Yes', 'Users can add or complete tasks'],
          ['New-task input text', 'Yes', 'It changes on each keystroke'],
          ['Number of completed tasks', 'Usually no', 'Calculate it from the task array'],
          ['A static page heading', 'No', 'It does not change during interaction'],
        ]} />
        <Callout type="info">Calling a state setter schedules a render. It does not synchronously rewrite the variable in the current function call; treat each render as a snapshot.</Callout>
      </Part>
      <Part n={2} label="useState" title="Update State Without Mutating It">
        <P><code>useState</code> returns the current value and a setter. For a value derived from its previous value, use the functional setter form. Arrays and objects should be replaced with new values rather than edited in place, so React receives a new reference and the update is easy to reason about.</P>
        <Code lang="tsx" file="TaskBoard.tsx" code={`import { useState } from "react"\n\ntype Task = { id: string; title: string; completed: boolean }\n\nexport function TaskBoard() {\n  const [tasks, setTasks] = useState<Task[]>([\n    { id: "sql-1", title: "Practise joins", completed: false },\n    { id: "math-1", title: "Review probability", completed: false },\n  ])\n\n  function toggleTask(taskId: string) {\n    setTasks((current) => current.map((task) =>\n      task.id === taskId ? { ...task, completed: !task.completed } : task\n    ))\n  }\n\n  return (\n    <ul>\n      {tasks.map((task) => (\n        <li key={task.id}>\n          <label>\n            <input type="checkbox" checked={task.completed}\n              onChange={() => toggleTask(task.id)} />\n            {task.title}\n          </label>\n        </li>\n      ))}\n    </ul>\n  )\n}`} />
        <P>Updating one task creates a new array and a new object for that task. Other task objects are reused because their contents did not change. The checkbox is controlled: its checked value comes from state, and the change handler requests a state update.</P>
      </Part>
      <Part n={3} label="Forms" title="Use Controlled Inputs for Planner Data">
        <P>A controlled input gets its value from React state and reports edits through an event handler. That keeps validation and displayed values aligned. A form should also work with the keyboard: use a real <code>form</code>, a labelled input, and handle its submit event rather than making a clickable text element.</P>
        <Code lang="tsx" file="AddTaskForm.tsx" code={`import { FormEvent, useState } from "react"\n\ntype TaskDraft = { title: string; subject: string }\n\nexport function AddTaskForm({ onAdd }: { onAdd: (draft: TaskDraft) => void }) {\n  const [title, setTitle] = useState("")\n  const [subject, setSubject] = useState("")\n  const canSubmit = title.trim().length > 0 && subject.trim().length > 0\n\n  function submit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault()\n    if (!canSubmit) return\n    onAdd({ title: title.trim(), subject: subject.trim() })\n    setTitle("")\n    setSubject("")\n  }\n\n  return (\n    <form onSubmit={submit}>\n      <label>Session title <input value={title}\n        onChange={(event) => setTitle(event.target.value)} /></label>\n      <label>Subject <input value={subject}\n        onChange={(event) => setSubject(event.target.value)} /></label>\n      <button type="submit" disabled={!canSubmit}>Add session</button>\n    </form>\n  )\n}`} />
        <P>In a larger form, display validation feedback next to the relevant field and explain how to fix it. Client-side checks improve the experience but are not a security boundary: the server must validate the submitted data too.</P>
        <Callout type="tip">A parent should own the task array while the form owns the unfinished draft. That separation gives each piece of state one clear owner.</Callout>
      </Part>
      <Part n={4} label="Lifting state" title="Put Shared State at the Nearest Common Parent">
        <P>If the task list, progress card, and form all need the same tasks, move that state to the closest component that contains all three. Pass values down as props and pass event callbacks down for requested changes. This is called lifting state up. It avoids keeping separate copies of the same plan in each child.</P>
        <Code lang="tsx" file="PlannerPage.tsx" code={`import { useState } from "react"\n\ntype Task = { id: string; title: string; completed: boolean }\n\nexport function PlannerPage() {\n  const [tasks, setTasks] = useState<Task[]>([])\n  const completed = tasks.filter((task) => task.completed).length\n\n  function addTask(title: string) {\n    setTasks((current) => [...current, {\n      id: crypto.randomUUID(), title, completed: false,\n    }])\n  }\n\n  return (\n    <main>\n      <ProgressCard planned={tasks.length} completed={completed} />\n      <AddTaskForm onAdd={(draft) => addTask(draft.title)} />\n      <TaskList tasks={tasks} />\n    </main>\n  )\n}`} />
        <P>Here <code>completed</code> is derived during render, not stored separately. In production, choose an ID strategy that is supported in the environment where the code runs, and do not assume a browser-only API exists in server code.</P>
      </Part>
      <Part n={5} label="Effects" title="Use Effects to Synchronise with External Systems">
        <P>An effect runs after React has committed a render and is for synchronising with something outside React: a network request, browser event listener, timer, or third-party widget. It is not a general place to put every calculation. If a value can be derived from props and state during render, calculate it there instead.</P>
        <P>The dependency list describes the reactive values the effect reads. Omitting a dependency can leave the effect using stale values; adding an unstable object created during render can make it repeat too often. Effects that subscribe or start work should clean up when dependencies change or the component unmounts.</P>
        <Code lang="tsx" file="useStudyPlan.ts" code={`import { useEffect, useState } from "react"\n\ntype Plan = { id: string; title: string }[]\ntype Result = { plan: Plan | null; loading: boolean; error: string | null }\n\nexport function useStudyPlan(studentId: string): Result {\n  const [result, setResult] = useState<Result>({\n    plan: null, loading: true, error: null,\n  })\n\n  useEffect(() => {\n    const controller = new AbortController()\n    setResult({ plan: null, loading: true, error: null })\n\n    fetch("/api/study-plans/" + encodeURIComponent(studentId), {\n      signal: controller.signal,\n    })\n      .then(async (response) => {\n        if (!response.ok) throw new Error("Could not load the plan")\n        return response.json() as Promise<Plan>\n      })\n      .then((plan) => setResult({ plan, loading: false, error: null }))\n      .catch((error: unknown) => {\n        if (error instanceof Error && error.name === "AbortError") return\n        setResult({ plan: null, loading: false, error: "Please try again." })\n      })\n\n    return () => controller.abort()\n  }, [studentId])\n\n  return result\n}`} />
        <P>This simple pattern includes loading, success, and error states and cancels an obsolete request if the learner changes. Framework data-fetching tools often handle caching and race conditions more completely; the next lesson shows the server-first approach in Next.js.</P>
        <Callout type="warning">An effect can run more than once in development to help reveal unsafe side effects. Write effects so setup and cleanup are safe to repeat; do not suppress a warning by hiding a missing dependency.</Callout>
      </Part>
      <Part n={6} label="Request states" title="Make Loading, Empty, Error and Success Visible">
        <P>A blank panel during a request is ambiguous. Explicitly model what the user sees while the plan loads, when it has no sessions, when a request fails, and when data is available. Avoid flashing old results under a new student's name: clear or label data when the request key changes.</P>
        <Steps items={[
          'Start a request when its input key changes.',
          'Show a pending message or skeleton, with an accessible status announcement.',
          'Check response.ok because fetch resolves even for many HTTP error statuses.',
          'Parse and validate the response before trusting the data shape.',
          'Show a concise recovery action on failure and preserve details in safe server logs.',
        ]} />
        <P>For a real planner, request cancellation is only one part of correctness. Also consider stale responses, cache policy, authentication, and what happens if a student submits twice. Keep network error messages useful without exposing internal stack traces.</P>
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Mutating a state array with push', cause: 'The reference does not change and existing renders may be reused.', fix: 'Create a replacement with map, filter, or spread syntax.' },
          { mistake: 'Putting derived counts in separate state', cause: 'The count can fall out of sync when the source list changes.', fix: 'Calculate the count from the task list during rendering.' },
          { mistake: 'Using an effect to copy props into state', cause: 'It creates two sources of truth and an extra render.', fix: 'Render from the prop directly unless the user is editing a deliberate local draft.' },
          { mistake: 'Ignoring loading, failure, or cleanup', cause: 'Users see ambiguous screens and outdated responses can overwrite newer ones.', fix: 'Model request states and abort or otherwise guard obsolete work.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Turn the Plan into a Useful Interaction">
        <Practice title="A stateful weekly planner" tasks={[
          'Add a controlled form for a title, subject, and planned minutes with clear field labels.',
          'Lift the task array to the page and let the form request additions through a callback.',
          'Add a completion checkbox and derive the completed-session count from the array.',
          'Load a plan from an endpoint and display loading, empty, error, and success states.',
          'Change the selected student while a request is pending and verify an older result cannot replace the newer plan.',
        ]} hint="Use immutable updates and check response.ok. Keep server-side validation in the API even after adding client-side feedback." />
      </Part>
      <KeyTakeaways items={[
        'State holds values that change the UI; update it with setters to request a render.',
        'Replace arrays and objects rather than mutating them.',
        'Controlled forms keep input state, validation, and UI in sync.',
        'Lift shared state to the nearest common parent and pass callbacks downward.',
        'Use effects for external synchronization, with complete dependencies and cleanup.',
        'Represent loading, empty, error, and success states explicitly.',
      ]} />
      <Bullets items={[<span key="reference">Use React's official documentation for state, effects, and forms. Next.js server rendering can simplify data loading for many page requests.</span>]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/styling-react-tailwind"
        label="Lesson 03 · Styling React Apps — Tailwind and Component Libraries"
        text="Style components with Tailwind CSS, build responsive layouts, use an accessible component library, and keep styles consistent." />
    </LearnLayout>
  )
}
