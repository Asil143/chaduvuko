import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function StylingReactTailwind() {
  return (
    <LearnLayout title="Styling React Apps — Tailwind and Component Libraries" description="Style components with Tailwind CSS, build responsive layouts, use an accessible component library, and keep styles consistent." section="Full-Stack Development with AI — Lesson 03" readTime="35 min">
      <Part n={1} label="From structure to experience" title="Good Styling Makes the Interface Easier to Use">
        <P>React components give an interface structure; CSS gives that structure visual meaning and makes it work at different screen sizes. A useful learning dashboard should let a student identify the next session, understand progress, and use the controls without guessing. Styling is not decoration added after the product is finished: spacing, contrast, layout, and feedback all affect whether a task is understandable.</P>
        <P>This lesson uses a study planner as a running example. The techniques apply to a course catalog, an order-tracking page, or a finance dashboard. We will use Tailwind utility classes, but the important ideas—design tokens, responsive layout, semantic HTML, and reusable patterns—also apply to CSS Modules or another styling system.</P>
        <Table head={['Concern', 'Question to ask', 'Example']} rows={[
          ['Hierarchy', 'What should the learner notice first?', 'Make the next study session visually prominent.'],
          ['Consistency', 'Do related controls look and behave alike?', 'Use the same button treatment for save actions.'],
          ['Responsive layout', 'Does content reflow on a narrow screen?', 'Stack dashboard cards instead of squeezing them.'],
          ['Accessibility', 'Can people perceive and operate this UI?', 'Use labels, keyboard focus, and sufficient contrast.'],
        ]} />
        <Callout type="info">Tailwind changes how styles are expressed, not the need to understand CSS. Flexbox, grid, intrinsic sizing, and the box model still explain why a layout behaves as it does.</Callout>
      </Part>

      <Part n={2} label="Utility-first CSS" title="Compose Styles from Small, Predictable Utilities">
        <P>A utility class represents one styling decision: <code>flex</code> establishes a flex container, <code>gap-4</code> spaces its children, and <code>rounded-lg</code> rounds a corner. Combining these classes keeps the component's structure and its common presentation close together. This can make local changes quick, but a long string of unrelated utilities can still become difficult to scan.</P>
        <P>Start with semantic HTML, then add layout and appearance. A page region should use a landmark such as <code>main</code>; a collection of sessions should be a list; an action should be a real button. A class name cannot give a generic <code>div</code> the keyboard and accessibility behavior of a button.</P>
        <Code lang="tsx" file="components/StudySummary.tsx" code={`type StudySummaryProps = {
  completed: number
  planned: number
  nextSession: string
}

export function StudySummary({ completed, planned, nextSession }: StudySummaryProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">Your study plan</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
            {completed} of {planned} sessions complete
          </h2>
          <p className="mt-2 text-sm text-slate-700">Next: {nextSession}</p>
        </div>
        <a className="inline-flex min-h-11 items-center justify-center rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          href="/planner/sessions">
          View sessions
        </a>
      </div>
    </section>
  )
}`} />
        <P>The link is an anchor because it navigates. A button is for an action in the current page, such as opening a dialog or submitting a form. Give interactive controls a visible keyboard focus style; a pointer hover is not a substitute because keyboard users do not hover.</P>
      </Part>

      <Part n={3} label="Responsive layout" title="Let Content Reflow at Useful Breakpoints">
        <P>A responsive interface adapts to the available space instead of assuming every learner has a wide desktop display. Tailwind's unprefixed utilities apply at the smallest layout, while breakpoint-prefixed classes add or replace styles at wider viewport sizes. For example, <code>grid-cols-1 md:grid-cols-2</code> uses one column by default and two at the medium breakpoint defined by the project configuration.</P>
        <P>Choose breakpoints when the content needs more room, not because a device list says a particular phone is common. Let long text wrap, keep controls usable, and avoid fixed widths that cause horizontal scrolling. For a dashboard, a one-column mobile layout can become a two-column grid when cards have sufficient width.</P>
        <Code lang="tsx" file="components/PlannerDashboard.tsx" code={`type Session = { id: string; topic: string; dateLabel: string }

export function PlannerDashboard({ sessions }: { sessions: Session[] }) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <p className="text-sm font-semibold text-emerald-800">LEARN. BUILD. GROW.</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Study planner
        </h1>
      </header>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sessions.map((session) => (
          <li key={session.id} className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="break-words font-semibold text-slate-900">{session.topic}</h2>
            <p className="mt-2 text-sm text-slate-600">{session.dateLabel}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}`} />
        <Callout type="tip">Test the interface by resizing the browser and zooming the page. A layout that works at one fixed screenshot width may still fail when labels wrap, text is enlarged, or a learner opens it on a phone.</Callout>
      </Part>

      <Part n={4} label="Consistency" title="Use Design Tokens and Reusable Components">
        <P>Repeated values such as brand colours, border radii, and spacing are design tokens. Keep shared tokens in the styling configuration or CSS variables so the visual system can be adjusted centrally. Build components around repeated behavior and meaning—not merely because two elements happen to share one colour.</P>
        <P>A button component can standardise its shape, focus state, and disabled state while still allowing a clear variant. Keep the public props small and typed. If every screen has a different one-off button string, future accessibility fixes and visual updates become easy to miss.</P>
        <Code lang="tsx" file="components/Button.tsx" code={`import type { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:outline-emerald-700",
    secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:outline-slate-700",
  }

  return <button className={base + " " + variants[variant] + " " + className} {...props} />
}`} />
        <P>In a larger design system, use a class-merging utility only when you need predictable conflict resolution between caller classes and component defaults. Do not add a dependency just to join a handful of strings. Review class composition when variants grow; explicit variant maps are easier to audit than an unstructured collection of conditional fragments.</P>
      </Part>

      <Part n={5} label="Component libraries" title="Adopt Accessible Behavior, Not Just Prebuilt Looks">
        <P>A component library can speed up common interactions such as menus, dialogs, tabs, and date pickers. Before adopting one, inspect its keyboard support, screen-reader behavior, styling approach, maintenance, and how much control your team retains. Some libraries provide complete styled components; others provide accessible interaction primitives that you style yourself.</P>
        <P>Prefer a component with correct behavior over rebuilding a complex interaction from scratch. A dialog needs to manage focus, respond to Escape where appropriate, and give assistive technology a useful name. A custom-looking clickable <code>div</code> does not become an accessible dialog just because it has a border and a shadow.</P>
        <Steps items={[
          'List the interactive behaviors the screen actually needs.',
          'Check whether the library supports keyboard interaction and accessible names.',
          'Verify that its styling and server-rendering model fit the existing app.',
          'Wrap repeated library patterns in a small app-level component when that improves consistency.',
          'Test the result with a keyboard and an accessibility checker; do not treat a library as a complete audit.',
        ]} />
        <Callout type="warning">A component library reduces repeated implementation work; it does not guarantee that your labels, colour contrast, page structure, or interaction flow are accessible.</Callout>
      </Part>

      <Part n={6} label="Accessibility" title="Make Visual State and Interaction Understandable">
        <P>Use semantic headings in a logical order, associate labels with their controls, and make error or success feedback available in text. Colour alone should not communicate that a session is complete or that a field failed. Provide an icon or text label alongside colour, and check contrast for the actual foreground and background pair.</P>
        <P>Focus indicators help keyboard users track their position. Maintain them instead of removing the browser outline without an accessible replacement. For a disclosure button, expose whether the region is open with <code>aria-expanded</code> and associate it with the controlled region; for a link, write text that describes its destination.</P>
        <Code lang="tsx" file="components/SessionDisclosure.tsx" code={`import { useState } from "react"

type SessionDisclosureProps = { id: string; title: string; details: string }

export function SessionDisclosure({ id, title, details }: SessionDisclosureProps) {
  const [open, setOpen] = useState(false)
  const panelId = "session-details-" + id

  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <h2>
        <button type="button" className="flex w-full items-center justify-between text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
          <span>{title}</span>
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </h2>
      <div id={panelId} hidden={!open}>
        <p className="pt-3 text-slate-700">{details}</p>
      </div>
    </section>
  )
}`} />
        <P>Check that an ID is unique when rendering a list of disclosures. If panels contain interactive controls, consider whether hiding them should remove them from keyboard navigation; using the native <code>hidden</code> attribute does so while closed.</P>
      </Part>

      <Part n={7} label="Common pitfalls" title="Fix Styling Mistakes at Their Source">
        <Mistakes items={[
          { mistake: 'Using a clickable div instead of a button or link', cause: 'A visual style can hide missing keyboard and browser behavior.', fix: 'Choose a semantic element that matches the action, then style it.' },
          { mistake: 'Building a desktop-only fixed-width layout', cause: 'Content overflows when the viewport is narrow or text is enlarged.', fix: 'Start with a flexible mobile layout and add breakpoints when content needs them.' },
          { mistake: 'Removing the focus outline without a replacement', cause: 'Keyboard users lose the visible indication of their current control.', fix: 'Keep the outline or supply an equally visible focus-visible treatment.' },
          { mistake: 'Duplicating slightly different styles for every screen', cause: 'Small inconsistencies accumulate and fixes must be repeated.', fix: 'Extract a shared component or token where a real pattern exists.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Style a Responsive Study Dashboard">
        <Practice title="Build one accessible dashboard card and a responsive session grid" tasks={[
          'Create a semantic page with a heading, progress summary, and a list of upcoming study sessions.',
          'Use a mobile-first single-column layout, then add a wider-screen grid that keeps cards readable.',
          'Make the primary action a link if it navigates and a button if it changes the current page.',
          'Add a visible keyboard focus state and make completed or overdue status understandable without colour alone.',
          'Resize the viewport and inspect the page with keyboard navigation; write down one issue you found and fixed.',
        ]} hint="Keep example data typed and render arrays with stable IDs. Use the existing project's Tailwind setup rather than adding a second styling system." />
      </Part>

      <KeyTakeaways items={[
        'Tailwind utilities express CSS decisions; understanding layout, spacing, and responsive design still matters.',
        'Use semantic HTML before styling, and choose links for navigation and buttons for actions.',
        'Start with flexible layouts and add breakpoints when the content needs additional space.',
        'Reusable components and design tokens make consistency easier to maintain.',
        'A component library can supply interaction behavior, but the page still needs accessible names, contrast, and testing.',
        'Keep keyboard focus visible and never communicate important status only through colour.',
      ]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/forms-validation-zod" label="Lesson 04 · Forms and Validation — React Hook Form and Zod" text="Build forms with controlled inputs, a shared schema, clear field feedback, and server-side validation." />
    </LearnLayout>
  )
}
