import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AsyncJavascriptFetch() {
  return (
    <LearnLayout
      title="Async JavaScript — Promises, async/await and fetch"
      description="The event loop, callbacks, promises, async/await, calling APIs with fetch, and handling errors and loading states."
      section="JavaScript & TypeScript — Lesson 04"
      readTime="40 min"
    >
      <Part n={1} label="Why async" title="Waiting for a Network Response Is Not Instant">
        <P>
          A browser must remain responsive while work is pending. A network request, timer, or file operation may take much
          longer than a simple calculation. JavaScript starts that work and continues processing other events rather than
          blocking the page until the result is ready. This is asynchronous programming.
        </P>
        <P>
          The event loop coordinates synchronous code with queued callbacks and promise reactions. It does not mean every task
          runs simultaneously on another JavaScript thread. The important practical lesson is that the order of output can
          differ from the order in which work was started.
        </P>
        <Code lang="javascript" code={`console.log('First: start')
setTimeout(() => console.log('Third: timer callback'), 0)
console.log('Second: current code finishes')`} />
        <Callout type="example">
          If a learning dashboard requests course data, it can show a loading message immediately. Once the network responds,
          it renders the courses; if the request fails, it can offer a retry. The learner should not see a frozen page while
          waiting.
        </Callout>
        <P>
          A callback is a function passed to another operation so it can be called later. Callbacks are useful, but chaining
          many nested callbacks can obscure the sequence and error handling. Promises provide a standard representation of an
          operation that may succeed or fail later.
        </P>
      </Part>

      <Part n={2} label="Promises" title="A Promise Represents a Future Result">
        <P>
          A promise starts pending, then settles as fulfilled with a value or rejected with a reason. <code>.then()</code>
          handles success, <code>.catch()</code> handles rejection, and <code>.finally()</code> runs cleanup regardless of
          outcome. Each <code>.then()</code> returns another promise, so returning a promise from a handler keeps the chain
          connected.
        </P>
        <Code lang="javascript" code={`function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Finished waiting'), milliseconds)
  })
}

wait(300).then((message) => {
  console.log(message)
}).catch((error) => {
  console.error('Wait failed:', error)
}).finally(() => {
  console.log('Cleanup runs either way')
})`} />
        <P>
          A common promise-chain bug is forgetting to return a request from a handler. The next step then receives
          <code>undefined</code> instead of waiting for the request. Return the promise you want the chain to await.
        </P>
        <Code lang="javascript" code={`getCourse()
  .then((course) => {
    return getLessons(course.id) // return keeps this request in the chain
  })
  .then((lessons) => {
    console.log(lessons)
  })
  .catch((error) => {
    console.error('Could not load course data:', error)
  })`} />
        <Callout type="tip">
          Attach error handling at the level where you can provide a useful recovery. A catch that only logs an error and
          continues with invalid data can conceal the real problem.
        </Callout>
      </Part>

      <Part n={3} label="async and await" title="Write Asynchronous Sequences in a Straight Line">
        <P>
          An <code>async</code> function always returns a promise. Inside it, <code>await</code> pauses that function until a
          promise settles; it does not block the entire browser. The syntax makes ordered steps easier to read, especially
          when later work depends on earlier results.
        </P>
        <Code lang="javascript" code={`function loadCourseSummary() {
  return Promise.resolve({ title: 'JavaScript', lessonCount: 6 })
}

async function showSummary() {
  const course = await loadCourseSummary()
  console.log(course.title, course.lessonCount)
}

showSummary().catch((error) => console.error(error))`} />
        <P>
          Use <code>try</code> / <code>catch</code> around awaited operations that can reject. Handle the failure close to the
          UI state it affects, or rethrow it when a higher layer can make a better decision. A function should not silently
          pretend a failed request succeeded.
        </P>
        <Code lang="javascript" code={`async function loadProfile() {
  try {
    const profile = await getProfile()
    return profile
  } catch (error) {
    console.error('Profile request failed')
    throw error
  }
}`} />
        <P>
          Independent requests can run together. Use <code>Promise.all()</code> when all results are required; if one rejects,
          the combined promise rejects. If each result should be handled separately, consider <code>Promise.allSettled()</code>
          and make the partial-success behaviour explicit.
        </P>
        <Code lang="javascript" code={`async function loadDashboard() {
  const [courses, announcements] = await Promise.all([
    getCourses(),
    getAnnouncements(),
  ])
  return { courses, announcements }
}`} />
      </Part>

      <Part n={4} label="HTTP and fetch" title="Send a Request and Check the Response">
        <P>
          The browser's <code>fetch()</code> function sends an HTTP request and resolves to a <code>Response</code> when a
          response arrives. That does not mean the request succeeded: HTTP error statuses such as not found or server error
          still produce a response. Check <code>response.ok</code> before parsing a success payload.
        </P>
        <Table
          head={['Step', 'What to do', 'Why it matters']}
          rows={[
            ['Request', 'Call fetch with a URL and options as needed', 'Method, headers, and body describe the request'],
            ['Status', 'Check response.ok or response.status', 'fetch does not reject for ordinary HTTP error statuses'],
            ['Body', 'Await response.json() or another body reader', 'Reading the response body is asynchronous too'],
            ['UI', 'Render data or an error state', 'Users need feedback for every outcome'],
          ]}
          caption="A reliable fetch flow"
        />
        <Code lang="javascript" code={`async function fetchCourses() {
  const response = await fetch('/api/courses')
  if (!response.ok) {
    throw new Error('Courses request failed with status ' + response.status)
  }
  return response.json()
}

fetchCourses()
  .then((courses) => console.log(courses))
  .catch((error) => console.error(error.message))`} />
        <P>
          Parsing JSON can also fail if the server response is not valid JSON. The content type and API contract should be
          understood rather than guessed. When sending JSON, set a JSON content type and serialize an object with
          <code>JSON.stringify()</code>. Do not send secrets from browser code: anything delivered to a browser can be
          inspected by its user.
        </P>
        <Callout type="warning">
          A successful HTTP status does not guarantee that the payload contains the fields your UI expects. Validate data
          received from an external API before treating it as a trusted application record.
        </Callout>
      </Part>

      <Part n={5} label="A complete request" title="Show Loading, Success, Empty, and Error States">
        <P>
          A page that fetches a list should describe its current state. Clear stale errors before starting, show progress, and
          always stop the loading indicator in a <code>finally</code> block. Distinguish an empty result from a failed
          request; those are different situations and need different messages.
        </P>
        <Code lang="javascript" code={`const statusMessage = document.querySelector('#course-status')
const courseList = document.querySelector('#course-list')

async function renderCourses() {
  statusMessage.textContent = 'Loading courses…'
  courseList.replaceChildren()

  try {
    const response = await fetch('/api/courses')
    if (!response.ok) {
      throw new Error('Request failed (' + response.status + ')')
    }

    const courses = await response.json()
    if (!Array.isArray(courses)) {
      throw new Error('Unexpected response format')
    }
    if (courses.length === 0) {
      statusMessage.textContent = 'No courses are available yet.'
      return
    }

    for (const course of courses) {
      const item = document.createElement('li')
      item.textContent = course.title
      courseList.append(item)
    }
    statusMessage.textContent = 'Courses loaded.'
  } catch (error) {
    statusMessage.textContent = 'Could not load courses. Try again.'
    console.error(error)
  }
}`} />
        <P>
          The example checks that the top-level result is an array, but a real client should also validate each required
          course field. It renders titles with <code>textContent</code> so API text is not parsed as HTML. The catch shows a
          friendly message while logging enough detail for a developer to investigate.
        </P>
        <Steps items={[
          'Set loading feedback and clear or preserve old data intentionally.',
          'Await fetch and check the HTTP status.',
          'Parse the body and validate its shape.',
          'Render success or empty content using safe DOM APIs.',
          'Handle errors and use finally for shared cleanup when needed.',
        ]} />
        <Callout type="info">
          Consider whether to keep old results visible during refresh. It can reduce flicker, but mark them as stale or
          refreshing so users know a new request is in progress.
        </Callout>
      </Part>

      <Part n={6} label="Requests with data" title="Send JSON with the Correct Method and Headers">
        <P>
          To create a record, use the method expected by the API, provide a request body, and set a content type. The exact
          endpoints and validation rules come from that service's documentation; do not assume every server uses the same
          route. This example demonstrates the browser mechanics with a generic course progress endpoint.
        </P>
        <Code lang="javascript" code={`async function saveProgress(courseId, completedLessonIds) {
  const response = await fetch('/api/course-progress', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ courseId, completedLessonIds }),
  })

  if (!response.ok) {
    throw new Error('Progress could not be saved')
  }
  return response.json()
}

saveProgress('javascript', ['javascript-fundamentals'])
  .then((result) => console.log('Saved', result))
  .catch((error) => console.error(error.message))`} />
        <P>
          Browser requests may also need authentication, cross-origin configuration, or CSRF protection depending on the
          application. Those are server and deployment design concerns, not a reason to put private credentials in client
          code. Check the API contract and security model before sending personal data.
        </P>
        <Callout type="tip">
          Keep the request layer small: one function can own the endpoint, method, and response checks. Components can then
          focus on user interaction instead of repeating transport details everywhere.
        </Callout>
      </Part>

      <Part n={7} label="Timeouts and cancellation" title="Stop Work That Is No Longer Needed">
        <P>
          A search can become outdated while a user types a newer query. <code>AbortController</code> lets code cancel a
          fetch that is no longer useful. Cancellation is not the same as a normal server error; it is often an expected
          outcome when a user navigates away or replaces a request.
        </P>
        <Code lang="javascript" code={`let activeController

async function searchCourses(query) {
  activeController?.abort()
  activeController = new AbortController()
  const signal = activeController.signal

  try {
    const response = await fetch(
      '/api/courses?search=' + encodeURIComponent(query),
      { signal },
    )
    if (!response.ok) throw new Error('Search failed')
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') return null
    throw error
  }
}`} />
        <P>
          Debouncing can reduce how often a search request starts while a person is typing. Aborting an old request prevents
          wasted work and stale results from winning a race. If the operation has important side effects, cancellation in
          the browser does not guarantee the server did not already process it.
        </P>
        <P>
          A timeout can be implemented with an abort signal where supported by your target runtime, or with a controller and
          timer. Always clear timers when a request finishes. Avoid writing a homemade retry loop before you know which
          failures are transient and whether repeating the operation is safe.
        </P>
        <Callout type="warning">
          Retrying a read request is often safe but still needs a limit and backoff. Retrying a create or payment request can
          duplicate work unless the API provides an idempotency strategy. Do not retry every failure indiscriminately.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming fetch rejects on a 404 or 500', cause: 'fetch usually resolves with a Response for HTTP error statuses.', fix: 'Check response.ok or status and throw an error for unsuccessful responses.' },
          { mistake: 'Forgetting to await response.json()', cause: 'Reading and parsing the response body returns a promise.', fix: 'Await the body reader and handle parsing failures as part of the request flow.' },
          { mistake: 'Showing a blank page while waiting', cause: 'The request has no visible loading state and gives no completion feedback.', fix: 'Represent loading, success, empty, and error states explicitly.' },
          { mistake: 'Using returned text as HTML', cause: 'A response may contain untrusted content that can execute as markup.', fix: 'Validate the payload and render text with textContent or a safe component.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Course Search Request">
        <Practice
          title="Load a remote list and keep the interface honest"
          tasks={[
            'Write a Promise-based helper and then rewrite its caller using async and await.',
            'Fetch a course list and handle a non-OK response before parsing JSON.',
            'Add loading, empty, error, and success messages to a small page.',
            'Validate that the response is an array and that each course has a string title before rendering.',
            'Send a JSON progress update with the appropriate method and content type.',
            'Cancel an outdated search when a newer query starts; distinguish abort from a genuine failure.',
          ]}
          hint="Use a live status message and textContent for rendered titles; do not infer success from the absence of an exception."
        />
      </Part>

      <KeyTakeaways items={[
        'Asynchronous work lets the browser remain responsive while timers or network requests are pending.',
        'A promise represents a future fulfillment or rejection; return promises to keep chains connected.',
        'async functions return promises, and await makes their steps easier to read without blocking the page.',
        'fetch does not reject just because an HTTP status is unsuccessful; check response.ok.',
        'Reading JSON is asynchronous, and external response data should be validated before use.',
        'Give users explicit loading, success, empty, and error states, and use safe DOM rendering.',
        'Abort obsolete requests and retry only when the operation and failure make retry safe.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/modules-npm-tooling"
        label="Lesson 05 · Modules, npm and Build Tooling"
        text="You can fetch and handle remote data. Next, split code into modules and use npm and Vite to organize an application."
      />
    </LearnLayout>
  )
}
