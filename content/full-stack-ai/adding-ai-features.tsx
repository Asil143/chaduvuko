import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AddingAiFeatures() {
  return (
    <LearnLayout title="Adding an AI Feature — Streaming Chat in a Web App" description="Call an LLM from a server route, stream the answer into a React UI, keep API keys server-side, and handle limits and failures." section="Full-Stack Development with AI — Lesson 11" readTime="40 min">
      <Part n={1} label="Product decision" title="Give AI a Specific Job in the Study Planner">
        <P>An AI feature is useful when it helps a learner make progress on a concrete task. Our planner can offer a study coach that turns a student's own topic and available time into a short revision plan. It should not pretend to know the student's exam syllabus or guarantee a grade. Start with a clearly bounded task and a visible way for the learner to review the suggestion.</P>
        <P>Before adding a model call, decide what information the feature needs, what it must not receive, how the learner will evaluate the result, and what happens when the provider is unavailable. A generated answer is not verified educational content. Keep the existing planner useful without AI and never block essential study scheduling on model availability.</P>
        <Table head={['Design question', 'Study-coach decision']} rows={[
          ['User value', 'Suggest a time-boxed revision outline for one topic'],
          ['Input', 'Topic and available minutes; no unnecessary personal data'],
          ['Output', 'A draft the student can edit, not an authoritative syllabus'],
          ['Failure', 'Show an understandable error and preserve the typed request'],
          ['Cost boundary', 'Limit input size, output size, and request frequency'],
        ]} />
        <Callout type="example">A useful prompt can ask for a short plan with checkpoints and a self-test. A prompt cannot verify the correctness or completeness of a university's syllabus unless the app supplies and checks trusted syllabus material.</Callout>
      </Part>
      <Part n={2} label="Architecture" title="Keep the Provider Call on the Server">
        <P>The browser should call your application route, not the model provider directly. The server route authenticates the student, validates and bounds input, enforces limits, calls the provider, and streams a response to the browser. The provider key and selected model name stay in server environment variables. A key placed in client code or a public-prefixed variable is visible to users and can be abused.</P>
        <Code lang="bash" file=".env.local" code={`OPENAI_API_KEY=replace-with-a-secret-from-your-provider\nLLM_MODEL=choose-a-supported-model-in-your-provider-account\n`} />
        <P>Use a secret manager for deployed environments and add local secret files to the repository's ignore rules. Do not copy real keys into lessons, screenshots, logs, or support requests. Read the model name from configuration; model availability and naming change, so the application should not assume one hard-coded name.</P>
        <Callout type="warning">Never expose an API key in a browser bundle. Rotating a leaked key is urgent; removing it from the latest source file does not erase it from history or cached deployments.</Callout>
      </Part>
      <Part n={3} label="Validate input" title="Define a Narrow Request Contract">
        <P>Accept only the fields needed for this feature. Enforce reasonable length and range limits before calling the provider, and reject unexpected shapes. Authentication and per-user rate limiting should happen before spending provider tokens. Consider storing only the final study plan if the product needs history; avoid retaining raw prompts by default when they may contain personal information.</P>
        <Code lang="typescript" file="app/api/study-coach/route.ts" code={`import { z } from "zod"\n\nconst requestSchema = z.object({\n  topic: z.string().trim().min(2).max(300),\n  availableMinutes: z.number().int().min(10).max(240),\n})\n\nexport async function POST(request: Request) {\n  const user = await requireSignedInStudent()\n  await enforceCoachRateLimit(user.id)\n\n  const body: unknown = await request.json()\n  const parsed = requestSchema.safeParse(body)\n  if (!parsed.success) {\n    return Response.json({ error: "Enter a topic and available study time." }, { status: 400 })\n  }\n\n  return streamStudyPlan(parsed.data)\n}`} />
        <P>The authentication and rate-limit helpers represent application infrastructure that must be implemented and tested. A hidden button is not a rate limit; enforce limits on the server and consider both per-account and global provider budgets. Also handle malformed JSON and provider failures without returning internal details.</P>
      </Part>
      <Part n={4} label="Stream from the provider" title="Convert Model Events into a Web Response">
        <P>Streaming can show the first text before the entire response has been generated. With the OpenAI JavaScript SDK, create a streamed response using the configured model and process text-delta events. Bridge those events into a Web ReadableStream that the browser can consume. Keep output limits and a timeout appropriate to the feature.</P>
        <Code lang="typescript" file="app/api/study-coach/provider.ts" code={`import OpenAI from "openai"\n\nconst apiKey = process.env.OPENAI_API_KEY\nconst model = process.env.LLM_MODEL\nif (!apiKey || !model) throw new Error("Configure the server-side model credentials")\nconst client = new OpenAI({ apiKey })\n\ntype CoachInput = { topic: string; availableMinutes: number }\n\nexport async function streamStudyPlan(input: CoachInput): Promise<Response> {\n  const events = await client.responses.create({\n    model,\n    instructions: "You are a careful study coach for Indian students. Give a practical draft, avoid claiming knowledge of an unseen syllabus, and encourage the learner to verify course requirements.",\n    input: "Make a revision outline for " + input.topic + " in " + input.availableMinutes + " minutes. Include checkpoints and one self-test.",\n    max_output_tokens: 500,\n    stream: true,\n  })\n\n  const encoder = new TextEncoder()\n  const body = new ReadableStream<Uint8Array>({\n    async start(controller) {\n      try {\n        for await (const event of events) {\n          if (event.type === "response.output_text.delta") {\n            controller.enqueue(encoder.encode(event.delta))\n          }\n        }\n        controller.close()\n      } catch (error) {\n        console.error("Study coach stream failed", error)\n        controller.error(new Error("The study coach could not finish this request"))\n      }\n    },\n    cancel() {\n      // A client disconnect should stop forwarding work where the SDK permits it.\n    },\n  })\n\n  return new Response(body, {\n    headers: {\n      "Content-Type": "text/plain; charset=utf-8",\n      "Cache-Control": "no-cache, no-transform",\n      "X-Content-Type-Options": "nosniff",\n    },\n  })\n}`} />
        <P>The example focuses on the event-to-response bridge. Production code should connect request cancellation to provider cancellation where supported, set request timeouts, handle provider errors before streaming begins, log a correlation ID and safe usage metadata, and decide how to communicate failures after headers have been sent. Do not log full prompts by default.</P>
        <Callout type="tip">A streaming connection is still a server request with resource cost. Set concurrency and usage limits, and close work when the user cancels or navigates away.</Callout>
      </Part>
      <Part n={5} label="Stream to the UI" title="Read the Response Incrementally in React">
        <P>The client can POST the topic to the route and read the response body as a stream. Append each decoded chunk to the current answer. Handle a missing body, a non-success status, aborts, and network errors. The response is untrusted text: render it as text unless you have a safe, explicit Markdown rendering pipeline.</P>
        <Code lang="tsx" file="components/StudyCoach.tsx" code={`"use client"\n\nimport { FormEvent, useRef, useState } from "react"\n\nexport function StudyCoach() {\n  const [topic, setTopic] = useState("")\n  const [answer, setAnswer] = useState("")\n  const [busy, setBusy] = useState(false)\n  const [error, setError] = useState<string | null>(null)\n  const controllerRef = useRef<AbortController | null>(null)\n\n  async function submit(event: FormEvent<HTMLFormElement>) {\n    event.preventDefault()\n    controllerRef.current?.abort()\n    const controller = new AbortController()\n    controllerRef.current = controller\n    setBusy(true)\n    setAnswer("")\n    setError(null)\n\n    try {\n      const response = await fetch("/api/study-coach", {\n        method: "POST",\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify({ topic, availableMinutes: 45 }),\n        signal: controller.signal,\n      })\n      if (!response.ok || !response.body) throw new Error("Request failed")\n      const reader = response.body.getReader()\n      const decoder = new TextDecoder()\n      while (true) {\n        const result = await reader.read()\n        if (result.done) break\n        setAnswer((current) => current + decoder.decode(result.value, { stream: true }))\n      }\n      setAnswer((current) => current + decoder.decode())\n    } catch (cause) {\n      if (!(cause instanceof Error && cause.name === "AbortError")) {\n        setError("The study coach is unavailable. Please try again.")\n      }\n    } finally {\n      setBusy(false)\n    }\n  }\n\n  return (\n    <section>\n      <form onSubmit={submit}>\n        <label>What topic are you studying?\n          <input value={topic} maxLength={300}\n            onChange={(event) => setTopic(event.target.value)} />\n        </label>\n        <button disabled={busy || topic.trim().length < 2}>\n          {busy ? "Preparing plan…" : "Suggest a plan"}\n        </button>\n      </form>\n      {error && <p role="alert">{error}</p>}\n      <pre aria-live="polite">{answer}</pre>\n    </section>\n  )\n}`} />
        <P>For a polished application, show a cancel action, preserve the user's request after failure, and announce progress accessibly. Consider buffering text updates to avoid re-rendering on every tiny chunk. A streaming UI should not imply that partial output is verified or complete.</P>
      </Part>
      <Part n={6} label="Responsible use" title="Set Limits, Protect Privacy and Review Output">
        <P>AI features can produce inaccurate, biased, or unsuitable suggestions. State the feature's limitations near the result and give users control to edit or discard it. Avoid sending account identifiers, passwords, private notes, or unrelated planner history to a provider. If you later add retrieval from syllabus files, check access permissions before retrieval and make source context visible to the learner.</P>
        <Steps items={[
          'Authenticate the user and confirm feature access before calling the provider.',
          'Validate and cap input length, output length, time, concurrency, and per-user usage.',
          'Keep the API key and provider request on the server only.',
          'Avoid collecting or logging more personal data than the feature needs.',
          'Display generated content as a draft and provide a safe retry or fallback.',
          'Measure errors, latency, usage, and user feedback without logging secrets or raw private prompts.',
        ]} />
        <P>Do not let model output execute SQL, arbitrary code, or privileged tools. If a later feature uses tools, give each tool a narrow schema and permission check, and require human confirmation for meaningful external actions. For this lesson, the model only suggests text and the student remains in control.</P>
        <Callout type="warning">A provider's safety features are not a replacement for application authorization, privacy controls, moderation decisions, or a plan for incident response.</Callout>
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Calling the provider from a browser component', cause: 'The credential is exposed and can be used outside your product.', fix: 'Proxy the call through an authenticated server route with a secret key.' },
          { mistake: 'Allowing unlimited prompts and output', cause: 'A public endpoint can create unexpected spend and resource exhaustion.', fix: 'Validate, rate-limit, cap output, and monitor usage.' },
          { mistake: 'Treating generated text as verified facts', cause: 'Models can produce plausible but inaccurate study advice.', fix: 'Label output as a draft, let learners edit it, and verify important claims.' },
          { mistake: 'Ignoring disconnects and provider errors', cause: 'Work continues after the user leaves, or failures appear as a blank screen.', fix: 'Support cancellation, clear error states, timeouts, and safe server logs.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Build a Streaming Study Coach">
        <Practice title="A bounded AI feature in the planner" tasks={[
          'Create a server POST route that authenticates a student and validates topic and study-time input.',
          'Read the provider key and model from server environment variables and confirm neither appears in the browser bundle.',
          'Stream text deltas into a client component with loading, cancellation, and error states.',
          'Add server-side rate and output limits; record safe latency and usage metadata.',
          'Try inaccurate or irrelevant requests and improve the UI copy so suggestions are clearly drafts to review.',
        ]} hint="Keep provider calls behind a server module. Never use a public-prefixed environment variable for a secret." />
      </Part>
      <KeyTakeaways items={[
        'Begin with a bounded user problem, not an AI call looking for a use case.',
        'Keep provider keys and calls on the server; read the model name from configuration.',
        'Authenticate, validate, rate-limit, and cap requests before spending model tokens.',
        'Streaming improves perceived responsiveness but still needs cancellation and failure handling.',
        'Treat generated study advice as a draft that may be inaccurate.',
        'Minimise personal data in prompts and logs; keep users in control of actions.',
      ]} />
      <Bullets items={[<span key="reference">Check the provider's current API documentation for streaming event shapes, supported models, limits, and usage reporting; these details can change.</span>]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/real-time-websockets-sse"
        label="Lesson 12 · Real-Time Features — WebSockets and Server-Sent Events"
        text="Push live updates to users with server-sent events and WebSockets, choose between them, and scale real-time connections." />
    </LearnLayout>
  )
}
