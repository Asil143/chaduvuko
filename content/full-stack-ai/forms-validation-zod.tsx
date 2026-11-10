import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function FormsValidationZod() {
  return (
    <LearnLayout title="Forms and Validation — React Hook Form and Zod" description="Build forms with React Hook Form, validate with shared Zod schemas on client and server, and show helpful errors." section="Full-Stack Development with AI — Lesson 04" readTime="35 min">
      <Part n={1} label="A trustworthy form" title="Collect Valid Data Without Making Users Guess">
        <P>A form is a contract between a person and your application. A learner might create a study session with a title, subject, and due date. The interface should explain what information is needed, show exactly which value needs attention, and preserve the user's work when a correction is required. A red border with no explanation is not helpful validation.</P>
        <P>React Hook Form manages field state and submission with limited re-rendering. Zod describes the shape and rules of data in executable TypeScript. Together they let a client display quick feedback while the server independently checks untrusted input before using it. We will build a small session form; use the app's existing versions of these packages rather than copying an install command with guessed version numbers.</P>
        <Table head={['Layer', 'What it can do', 'What it cannot guarantee']} rows={[
          ['Browser validation', 'Give immediate feedback and prevent common mistakes.', 'It can be bypassed by a custom client or direct request.'],
          ['Shared schema', 'Keep the expected data shape and rules in one place.', 'It does not prove that a user may perform an action.'],
          ['Server validation', 'Reject malformed input at the trust boundary.', 'It does not replace authorization or database constraints.'],
          ['Database constraints', 'Protect stored data against invalid relationships or duplicates.', 'They cannot explain every correction in the UI.'],
        ]} />
        <Callout type="info">Client validation is a user-experience feature, not a security boundary. Treat every request body as untrusted even when the same schema also ran in the browser.</Callout>
      </Part>

      <Part n={2} label="Define the contract" title="Use a Schema to Describe Accepted Input">
        <P>Start from the data the server is willing to accept, not from whatever fields happen to be on screen. A schema can trim surrounding whitespace, enforce a useful title length, and constrain a date string to the expected representation. Infer the TypeScript input type from that schema so the interface and the validation contract do not drift independently.</P>
        <P>Validation answers whether a value has an acceptable shape. Business rules such as "this session belongs to the signed-in student" require authenticated context and a database check; the request body cannot authorize itself by including a student ID.</P>
        <Code lang="typescript" file="lib/session-schema.ts" code={`import { z } from "zod"

export const createSessionSchema = z.object({
  title: z.string().trim().min(3, "Use at least 3 characters").max(100, "Keep the title under 100 characters"),
  subject: z.string().trim().min(1, "Choose a subject").max(60, "Keep the subject under 60 characters"),
  dueDate: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "Use a valid date"),
})

export type CreateSessionInput = z.infer<typeof createSessionSchema>`} />
        <P>The regular expression checks a date's text format, not whether that calendar date exists. If impossible dates must be rejected, add a dedicated calendar-date check. Make the rule match the product's needs and use the same schema on the server.</P>
        <Callout type="tip">For forms that transform input, distinguish the raw form values from the parsed output type. Zod schemas can coerce or transform values, so the input and output types may not be identical.</Callout>
      </Part>

      <Part n={3} label="React Hook Form" title="Connect Fields and Surface Validation Messages">
        <P>Register each input with React Hook Form, pass a Zod resolver, and use the form state for errors and submission status. Keep visible labels associated with controls. Field-level messages should explain the correction and be programmatically connected to the input so assistive technology can discover them.</P>
        <Code lang="tsx" file="components/CreateSessionForm.tsx" code={`"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSessionSchema, type CreateSessionInput } from "@/lib/session-schema"

type Props = { onCreate: (input: CreateSessionInput) => Promise<void> }

export function CreateSessionForm({ onCreate }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: { title: "", subject: "", dueDate: "" },
  })

  return (
    <form onSubmit={handleSubmit(onCreate)} noValidate>
      <label htmlFor="title">Session title</label>
      <input id="title" {...register("title")} aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? "title-error" : undefined} />
      {errors.title && <p id="title-error" role="alert">{errors.title.message}</p>}

      <label htmlFor="subject">Subject</label>
      <input id="subject" {...register("subject")} aria-invalid={Boolean(errors.subject)}
        aria-describedby={errors.subject ? "subject-error" : undefined} />
      {errors.subject && <p id="subject-error" role="alert">{errors.subject.message}</p>}

      <label htmlFor="dueDate">Due date</label>
      <input id="dueDate" type="date" {...register("dueDate")} aria-invalid={Boolean(errors.dueDate)}
        aria-describedby={errors.dueDate ? "dueDate-error" : undefined} />
      {errors.dueDate && <p id="dueDate-error" role="alert">{errors.dueDate.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Create session"}
      </button>
    </form>
  )
}`} />
        <P>The form component owns the interaction; its parent provides the create operation. Showing a pending state prevents accidental duplicate clicks, but the server must still handle duplicate requests safely if duplicate creation would be harmful.</P>
      </Part>

      <Part n={4} label="Useful feedback" title="Make Errors Specific, Recoverable, and Accessible">
        <P>Validate at a sensible time. Showing a required-field error before a learner has had a chance to fill anything can feel noisy. A common pattern is to validate on submit first and update errors as the person corrects the form. Confirm the chosen resolver and validation mode with the installed library API in your project.</P>
        <P>For a server response containing multiple field errors, map only known fields to their matching controls. Keep a general message for failures that cannot be attributed to one field. Do not render raw exception messages from a server or database as user-facing copy; they may expose internal details and are rarely actionable.</P>
        <Steps items={[
          'Give each control a visible, persistent label.',
          'Explain a field error in plain language and identify the affected field.',
          'Associate the message with the control using aria-describedby and reflect invalid state.',
          'Keep values in place when validation fails so the learner can correct them.',
          'Provide a form-level message when the server cannot complete the operation.',
        ]} />
        <Callout type="warning">Do not rely only on a browser tooltip, colour change, or placeholder to explain an error. Those cues can be missed, disappear, or be unavailable to assistive technology.</Callout>
      </Part>

      <Part n={5} label="Validate again on the server" title="Parse the Request Before Calling the Data Layer">
        <P>A client can alter JavaScript or send an HTTP request without using your form. Parse the submitted body at the server boundary, return a safe and predictable response for invalid input, then derive the owner from the authenticated session. The following route-handler example keeps the persistence function behind a typed boundary; replace the placeholder with your app's server-only data-access code.</P>
        <Code lang="typescript" file="app/api/sessions/route.ts" code={`import { NextResponse } from "next/server"
import { createSessionSchema } from "@/lib/session-schema"
import { requireStudent } from "@/lib/auth"
import { insertSession } from "@/lib/sessions"

export async function POST(request: Request) {
  const student = await requireStudent()
  if (!student) {
    return NextResponse.json({ error: "Sign in to create a session" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 })
  }

  const parsed = createSessionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form fields" }, { status: 400 })
  }

  const session = await insertSession({ ...parsed.data, studentId: student.id })
  return NextResponse.json({ session }, { status: 201 })
}`} />
        <P>The code authenticates before writing and takes ownership from the verified server-side identity, not from a submitted <code>studentId</code>. A production handler also needs deliberate error handling around persistence, authorization checks for updates, and any request-size or rate controls appropriate to the endpoint.</P>
        <Callout type="example">If a client submits a forged subject ID for a private class, a valid schema only proves the ID is a string. The server must check whether that subject is available to this student before storing it.</Callout>
      </Part>

      <Part n={6} label="Beyond the schema" title="Validation Is One Part of Data Integrity">
        <P>Different layers protect different invariants. A Zod schema can reject an empty title; application logic can confirm that a chosen subject belongs to the signed-in learner; a database constraint can prevent invalid references from being stored. Keep each rule at the layer that has the required information and can enforce it reliably.</P>
        <Table head={['Rule', 'Best place to enforce', 'Reason']} rows={[
          ['Title is not blank', 'Shared schema', 'The same simple constraint can guide both UI and server parsing.'],
          ['Student can edit this session', 'Authenticated server logic', 'The server knows the verified principal and requested record.'],
          ['Referenced student exists', 'Database foreign key', 'The database can enforce referential integrity for every writer.'],
          ['No duplicate booking for the same slot', 'Domain logic plus database constraint', 'Concurrent requests can race, so a database invariant is important.'],
        ]} />
        <P>For dates, money, and identifiers, be explicit about representation. An HTML date input submits a string; a currency input may use decimal text; neither should be casually treated as a floating-point amount or localised display value. Parse and validate according to the domain before persisting.</P>
      </Part>

      <Part n={7} label="Common pitfalls" title="Keep the Client, Schema, and Server in Sync">
        <Mistakes items={[
          { mistake: 'Trusting client-side validation as protection', cause: 'Requests can be sent without using the page at all.', fix: 'Parse and validate the request body on every server write.' },
          { mistake: 'Accepting an owner ID from the form', cause: 'A caller can change the ID to target another learner’s data.', fix: 'Derive ownership from the authenticated server-side identity.' },
          { mistake: 'Showing an error with no correction guidance', cause: 'The learner cannot tell what value or action is expected.', fix: 'Write a concise message next to the named field and preserve entered values.' },
          { mistake: 'Using a schema as a substitute for authorization', cause: 'A value can be valid in shape but unavailable to this user.', fix: 'Check permissions and resource ownership in trusted server logic.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build a Safe Session-Creation Flow">
        <Practice title="Create, validate, and submit one study session" tasks={[
          'Define a Zod schema for a title, subject, and due date, then infer a TypeScript input type.',
          'Build a labelled React Hook Form component with field-level messages and a pending submit state.',
          'Add a server handler that treats the JSON body as unknown, parses it, and returns a safe 400 response on invalid input.',
          'Require an authenticated student and assign record ownership from the server identity, never from a browser-supplied owner ID.',
          'Test a valid submission, a blank title, malformed JSON, and a request without a signed-in user.',
        ]} hint="Keep schema, UI, and route code in their appropriate modules. The route should import the schema but should not trust that the browser already ran it." />
      </Part>

      <KeyTakeaways items={[
        'React Hook Form manages field interaction; Zod describes and parses the accepted data shape.',
        'A shared schema can improve consistency, but server validation remains mandatory.',
        'Accessible forms need visible labels, specific errors, and clear links between fields and messages.',
        'Authentication identifies the caller; authorization decides what that caller may change.',
        'Never trust a submitted owner ID when the server can derive ownership from verified identity.',
        'Use application rules and database constraints for invariants that schemas alone cannot enforce.',
      ]} />
      <H3>Next</H3>
      <NextLesson href="/learn/full-stack-ai/nextjs-app-router" label="Lesson 05 · Next.js — Routing, Server Components and Forms" text="Place data loading and mutations in the right part of a Next.js app, and connect forms to server-side behavior." />
    </LearnLayout>
  )
}
