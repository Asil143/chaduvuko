import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function BrowserStorageJson() {
  return (
    <LearnLayout
      title="JSON, localStorage and Browser Storage"
      description="Serialise data with JSON, persist state in localStorage and sessionStorage, understand cookies and IndexedDB, and keep stored data safe."
      section="JavaScript & TypeScript — Lesson 07"
      readTime="30 min"
    >
      <Part n={1} label="Data beyond memory" title="Choose Storage for the Lifetime You Need">
        <P>
          A browser page's JavaScript variables disappear when the page is reloaded or closed. Browser storage can preserve
          selected data, but each mechanism has different lifetime, access, and complexity. A theme preference is a good
          candidate for simple local persistence; credentials, payment records, and authoritative account state are not.
        </P>
        <Table
          head={['Mechanism', 'Typical use', 'Important trade-off']}
          rows={[
            ['localStorage', 'Small string preferences that survive reloads', 'Synchronous, origin-scoped, readable by page scripts'],
            ['sessionStorage', 'Short-lived state for one browsing context', 'String-only and cleared when that page session ends'],
            ['Cookies', 'Small values sent with matching HTTP requests', 'Cookie attributes and server configuration matter'],
            ['IndexedDB', 'Structured, larger client-side data', 'Asynchronous API with more setup and lifecycle handling'],
          ]}
          caption="Choose the smallest storage mechanism that fits the data and threat model"
        />
        <Callout type="warning">
          Anything available to JavaScript on a page can be exposed if that page suffers a script injection flaw. Do not store
          passwords, session secrets, or sensitive personal data in localStorage as if it were a secure vault.
        </Callout>
        <P>
          Browser storage is origin-scoped: scheme, host, and port distinguish origins. A local preference is not automatically
          shared with a different subdomain or another browser. Server-side data should still be validated and authorized by
          the server on every relevant request.
        </P>
      </Part>

      <Part n={2} label="JSON format" title="Serialize Plain Data with JSON">
        <P>
          JSON is a text format for exchanging data. <code>JSON.stringify()</code> converts supported JavaScript values to
          text, and <code>JSON.parse()</code> reads JSON text back into values. JSON supports strings, numbers, booleans,
          <code> null</code>, arrays, and objects with string keys. It does not preserve functions, undefined object properties,
          prototypes, or special object types such as Date without an explicit conversion strategy.
        </P>
        <Code lang="javascript" code={`const preferences = {
  theme: 'dark',
  language: 'en',
  completedLessonIds: ['js-01', 'js-02'],
}

const jsonText = JSON.stringify(preferences)
const restored = JSON.parse(jsonText)
console.log(jsonText)
console.log(restored.completedLessonIds)`} />
        <P>
          Parsing untrusted or corrupted text can throw a <code>SyntaxError</code>. A successful parse only proves that the
          text follows JSON syntax; it does not prove that the values match the shape or rules your application expects.
          Validate data after parsing, just as you validate values received from a network.
        </P>
        <Callout type="tip">
          Treat stored browser data as external input. Users, extensions, old app versions, or partial writes can leave values
          that do not match today's expected shape.
        </Callout>
      </Part>

      <Part n={3} label="Simple persistence" title="Save and Restore a Preference Safely">
        <P>
          <code>localStorage</code> offers <code>setItem()</code>, <code>getItem()</code>, and <code>removeItem()</code> for
          string keys and values. Access can fail, for example when storage is disabled or unavailable in the current context.
          Wrap reads and writes that affect the user experience in error handling. Provide a useful default if a saved value is
          absent or invalid.
        </P>
        <Code lang="javascript" code={`const STORAGE_KEY = 'chaduvuko.preferences.v1'

function isPreferences(value) {
  return value !== null &&
    typeof value === 'object' &&
    (value.theme === 'light' || value.theme === 'dark') &&
    typeof value.language === 'string'
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === null) return { theme: 'light', language: 'en' }

    const parsed = JSON.parse(saved)
    return isPreferences(parsed) ? parsed : { theme: 'light', language: 'en' }
  } catch (error) {
    console.warn('Preferences could not be loaded:', error)
    return { theme: 'light', language: 'en' }
  }
}

function savePreferences(preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    return true
  } catch (error) {
    console.warn('Preferences could not be saved:', error)
    return false
  }
}`} />
        <P>
          The key includes a simple version marker so later code can distinguish older formats. When the data shape changes,
          validate the old shape and migrate it deliberately, or discard the old preference and use a safe default. Do not
          assume stored values will be present just because the current page saved them earlier.
        </P>
      </Part>

      <Part n={4} label="Tab and page lifetime" title="Understand localStorage, sessionStorage and Events">
        <P>
          <code>localStorage</code> generally remains available across browser restarts until cleared. <code>sessionStorage</code>
          is intended for a page session and is separated by origin and browsing context; it is useful for temporary state that
          should not become a lasting preference. Both APIs are synchronous, so avoid repeated reads and writes in a hot
          rendering path.
        </P>
        <Code lang="javascript" code={`sessionStorage.setItem('checkout.step', 'address')
const step = sessionStorage.getItem('checkout.step')
console.log(step)

// The storage event is delivered to other same-origin documents
// when storage changes; it is not fired in the document that made the change.
window.addEventListener('storage', (event) => {
  if (event.key === 'chaduvuko.preferences.v1') {
    console.log('Preferences changed in another page', event.newValue)
  }
})`} />
        <P>
          Do not use storage events as a database synchronization protocol. They notify other documents about a change, but
          simultaneous updates can still conflict, and they do not make a client-side value authoritative. For cross-device
          synchronization or important account state, use a server API with a clear conflict and authorization policy.
        </P>
        <Callout type="example">
          Persisting a theme choice can improve the next visit. Persisting the actual balance shown in a banking or UPI app
          cannot make that balance trustworthy; the server must provide the authoritative value.
        </Callout>
      </Part>

      <Part n={5} label="Cookies and structured data" title="Use Cookies or IndexedDB for Their Intended Jobs">
        <P>
          Cookies are small key-value data attached to matching HTTP requests according to their attributes. Servers commonly
          use secure, HttpOnly, and SameSite settings for session cookies; HttpOnly prevents ordinary page scripts from reading
          the cookie. Cookie security depends on correct server configuration, transport security, and application controls.
          Do not place a sensitive session token in a JavaScript-readable cookie or localStorage by default.
        </P>
        <P>
          IndexedDB is an asynchronous database API for structured client-side data, including records and indexes. It can suit
          offline-capable apps or larger caches better than synchronous Web Storage. It takes more code to manage transactions,
          schema upgrades, and failures. Consider a well-maintained abstraction if an application needs IndexedDB, and keep a
          plan for clearing stale cached data.
        </P>
        <Table
          head={['Question', 'Prefer']}
          rows={[
            ['Does a server need the value on each matching request?', 'A carefully configured cookie'],
            ['Is this a tiny, non-sensitive preference?', 'localStorage'],
            ['Should it last only during a page session?', 'sessionStorage'],
            ['Do you need async structured client-side records?', 'IndexedDB'],
          ]}
          caption="A starting point, not a substitute for a security review"
        />
        <Callout type="info">
          Storage choice follows the data's purpose and sensitivity. Cookies are not automatically safe, and client-side storage
          is not a trusted source just because the application created it.
        </Callout>
      </Part>

      <Part n={6} label="Data lifecycle" title="Version, Validate and Clear Persisted State">
        <P>
          Persisted data can outlive a deployment. Include a version in the key or value when formats may change, validate the
          parsed shape, and migrate only when you can do so reliably. If validation fails, discard the invalid value and
          continue with a documented default rather than repeatedly crashing the page.
        </P>
        <Code lang="javascript" code={`function loadCompletedLessons() {
  const key = 'chaduvuko.completed-lessons.v1'

  try {
    const saved = localStorage.getItem(key)
    if (saved === null) return []

    const value = JSON.parse(saved)
    if (!Array.isArray(value) || !value.every((id) => typeof id === 'string')) {
      localStorage.removeItem(key)
      return []
    }
    return value
  } catch (error) {
    console.warn('Saved lesson progress is unavailable:', error)
    return []
  }
}

function clearLocalProgress() {
  localStorage.removeItem('chaduvuko.completed-lessons.v1')
}`} />
        <Steps items={[
          'Decide what data truly needs to persist and how sensitive it is.',
          'Choose a storage mechanism that matches its lifetime and access needs.',
          'Use a namespaced key and explicit JSON serialization for structured values.',
          'Parse inside a failure boundary, then validate the value shape.',
          'Define a default, migration, and clear-data path for stale or invalid values.',
        ]} />
        <P>
          A clear-data action should remove only the application's own keys unless the user intentionally requests broader
          browser data removal. Keep stored values minimal and avoid retaining personal information without a product need.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Passing an object directly to localStorage.setItem', cause: 'Web Storage stores strings, so an object is coerced into an unhelpful string representation.', fix: 'Serialize supported data with JSON.stringify and parse it with JSON.parse when reading.' },
          { mistake: 'Assuming JSON.parse validates the application schema', cause: 'Valid JSON can still contain the wrong fields or value types.', fix: 'Check the parsed value shape and domain rules before using it.' },
          { mistake: 'Storing secrets or sensitive state in browser storage', cause: 'JavaScript-readable storage can be exposed by script injection and is controlled by the user.', fix: 'Keep sensitive session handling server-controlled and store only minimal, non-sensitive client preferences.' },
          { mistake: 'Assuming storage is always available and up to date', cause: 'Access can fail, old versions can leave invalid data, and multiple tabs can overwrite each other.', fix: 'Handle exceptions, validate versions, provide defaults, and use a server for authoritative synchronization.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Persist a Learner's Display Preferences">
        <Practice
          title="A safe, versioned preference store"
          tasks={[
            'Define a preference object for theme and language, then serialize and restore it with JSON.',
            'Write a validator that rejects a missing theme, an unsupported theme value, or a non-string language.',
            'Wrap localStorage reads and writes in try/catch and fall back to defaults if parsing or access fails.',
            'Add a versioned key and describe how you would migrate a previous version with a different field name.',
            'Use sessionStorage for a temporary multi-step form position and explain why it should not be a permanent preference.',
            'Write a short threat-model note explaining why login tokens, payment details, and authoritative progress are excluded.',
          ]}
          hint="Test with a missing key, malformed JSON, valid JSON with an invalid shape, and storage access that throws."
        />
      </Part>

      <KeyTakeaways items={[
        'JSON serializes supported plain data to text, but parsing does not validate the application schema.',
        'localStorage and sessionStorage are synchronous string stores with different intended lifetimes.',
        'Cookies are sent with matching requests and need deliberate security attributes and server configuration.',
        'IndexedDB is an asynchronous option for structured client-side data and requires transaction and version planning.',
        'Validate persisted data, handle access and parse errors, and provide safe defaults and a clear-data path.',
        'Never treat client-side storage as a secure vault or an authoritative source for sensitive account state.',
      ]} />

      <H3>Next</H3>
      <NextLesson href="/learn/javascript/error-handling-debugging" label="Lesson 08 · Error Handling and Debugging in the Browser" text="Make failures easier to understand with deliberate errors, browser DevTools, and resilient code." />
    </LearnLayout>
  )
}
