import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function NodejsFundamentals() {
  return (
    <LearnLayout
      title="Node.js Fundamentals — Runtime, File System and Modules"
      description="Run JavaScript outside the browser, understand Node.js modules and filesystem APIs, read environment variables, and build a small CLI."
      section="JavaScript & TypeScript — Lesson 11"
      readTime="40 min"
    >
      <Part n={1} label="The runtime" title="JavaScript Outside the Browser">
        <P>
          JavaScript is the language; Node.js is a runtime that executes JavaScript outside a web page. Node provides APIs for
          files, paths, processes, streams, and networking that browsers do not expose in the same way. A Node program can
          serve an API, automate a task, or power a command-line tool. The language fundamentals are shared, but available
          globals and security boundaries differ by runtime.
        </P>
        <P>
          Node runs JavaScript on its event loop and can delegate certain I/O operations to the operating system or runtime.
          That lets one process handle many waiting operations without blocking on each one. CPU-heavy synchronous work can
          still block the event loop, so keep request handlers and command-line progress responsive.
        </P>
        <Table
          head={['Environment', 'Typical APIs', 'Important boundary']}
          rows={[
            ['Browser', 'DOM, window, fetch, localStorage', 'Runs in a page sandbox; no direct access to arbitrary local files'],
            ['Node.js', 'process, fs, path, streams', 'Can access server resources; validate input and protect secrets'],
            ['Shared JavaScript', 'Objects, functions, promises, modules', 'Confirm that the specific API exists in the runtime you target'],
          ]}
          caption="The same JavaScript syntax does not imply the same runtime capabilities."
        />
        <Callout type="info">
          Node.js is not a browser with the UI removed. It has a different set of global objects and application responsibilities.
        </Callout>
      </Part>

      <Part n={2} label="Run a program" title="Start with a Small Script">
        <P>
          Create a JavaScript file and run it using the Node executable available in your development environment. The
          <code> process</code> global describes the current process, including its arguments, working directory, and
          environment. Remember that a process can be started from different directories, so a relative path is not always
          relative to the script itself.
        </P>
        <Code lang="javascript" file="hello.js" code={`console.log('Hello from Node.js')
console.log('Current working directory:', process.cwd())
console.log('Arguments:', process.argv.slice(2))`} />
        <P>
          <code>process.argv</code> includes the executable and script entries before arguments supplied by the user; slicing
          from index two gives the CLI arguments for this simple example. For a tool with flags, help text, and validation,
          use a deliberate argument parser rather than interpreting ambiguous strings ad hoc.
        </P>
        <Code lang="javascript" file="greet.js" code={`const name = process.argv[2]

if (!name) {
  console.error('Usage: node greet.js <name>')
  process.exitCode = 1
} else {
  console.log('Hello, ' + name + '!')
}`} />
        <Callout type="tip">
          Prefer setting <code>process.exitCode</code> for a simple failure result. Calling <code>process.exit()</code>
          immediately can interrupt pending output or cleanup work.
        </Callout>
      </Part>

      <Part n={3} label="Modules" title="Choose and Understand a Module System">
        <P>
          Modules divide a program into files with explicit imports and exports. Node supports ECMAScript modules, commonly
          called ESM, and the older CommonJS format. A project should choose a format and remain consistent; package settings
          affect how Node interprets files. Do not copy an import example into a project without checking its module setup.
        </P>
        <Code lang="javascript" file="math.js — ESM" code={`export function add(left, right) {
  return left + right
}`} />
        <Code lang="javascript" file="app.js — ESM" code={`import { add } from './math.js'

console.log(add(4, 5))`} />
        <P>
          CommonJS uses <code>require</code> and <code>module.exports</code>. Existing projects may use it, but new code should
          follow the module format already configured by that project. Mixing formats carelessly can create confusing import
          behaviour, particularly around default exports and file extensions.
        </P>
        <Code lang="javascript" file="legacy-module.cjs" code={`function add(left, right) {
  return left + right
}

module.exports = { add }`} />
        <Table
          head={['Question', 'ES modules', 'CommonJS']}
          rows={[
            ['Export syntax', 'export / export default', 'module.exports / exports'],
            ['Import syntax', 'import ... from ...', 'require(...)'],
            ['Typical clue', 'Project package configuration and .mjs files', '.cjs files or existing require-based code'],
          ]}
        />
      </Part>

      <Part n={4} label="Paths and files" title="Build Paths and Read Files Safely">
        <P>
          The <code>path</code> module handles platform-specific separators and path joining. Avoid manually concatenating
          directory strings: a slash that works on one operating system may not be the expected separator on another. Decide
          whether your path should be based on the process working directory or the script/module location.
        </P>
        <Code lang="javascript" file="read-config.js" code={`import { readFile } from 'node:fs/promises'
import path from 'node:path'

async function readConfig() {
  const filePath = path.join(process.cwd(), 'config.json')
  const contents = await readFile(filePath, 'utf8')
  return JSON.parse(contents)
}

readConfig()
  .then((config) => console.log(config))
  .catch((error) => {
    console.error('Could not read config:', error.message)
    process.exitCode = 1
  })`} />
        <P>
          This uses promise-based file I/O so the event loop is not synchronously blocked while waiting for the file. Parsing
          JSON can still throw for malformed content, and reading can fail because a file is missing or permissions differ.
          Handle those cases at the boundary where a useful message can be shown. Do not assume a file exists because it did
          on your laptop.
        </P>
        <Callout type="warning">
          A filename supplied by a user is untrusted input. Normalize and constrain it to an intended directory before using
          it to read or write files; do not let an arbitrary path become a server-side file access operation.
        </Callout>
      </Part>

      <Part n={5} label="Environment configuration" title="Keep Configuration and Secrets Out of Source">
        <P>
          Environment variables let the same program use different settings in development, testing, and deployment. Node
          exposes them through <code>process.env</code>, where values are strings and may be absent. Validate required values
          once near application startup and fail with a clear message instead of allowing an undefined value to fail much later.
        </P>
        <Code lang="javascript" file="config.js" code={`function requiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error('Missing required environment variable: ' + name)
  }
  return value
}

const config = {
  port: Number(process.env.PORT || 3000),
  serviceUrl: requiredEnv('SERVICE_URL'),
}

export { config }`} />
        <P>
          The example uses a default for a non-secret local port and requires a service URL. Validate numeric settings too if
          their exact range matters. A secret such as an API key should come from the deployment environment or a local
          untracked configuration file managed according to the project policy. Never print secrets into logs, commit them,
          or expose server environment variables to browser code.
        </P>
        <Callout type="example">
          A campus events tool can use one service URL in a developer environment and another in its hosted environment while
          keeping the source code unchanged. The environment is configuration, not a reason to hard-code credentials.
        </Callout>
      </Part>

      <Part n={6} label="Build a CLI" title="Turn a Small Script into a Useful Tool">
        <P>
          A CLI should make its contract clear: what input it accepts, what it writes, how it reports errors, and what exit
          status it returns. This example reads a text file and counts non-empty lines. It validates argument presence,
          resolves a path from the current directory, and catches file errors at the program boundary.
        </P>
        <Code lang="javascript" file="count-lines.js" code={`import { readFile } from 'node:fs/promises'
import path from 'node:path'

async function main() {
  const filename = process.argv[2]
  if (!filename) {
    throw new Error('Usage: node count-lines.js <file>')
  }

  const filePath = path.resolve(process.cwd(), filename)
  const contents = await readFile(filePath, 'utf8')
  const count = contents.split(/\\r?\\n/).filter((line) => line.trim().length > 0).length
  console.log('Non-empty lines:', count)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})`} />
        <P>
          The tool is intentionally small, but the boundary is explicit. For a shared utility, add tests around argument
          parsing, file contents, and missing-file behaviour. Separate the reusable counting function from direct process I/O
          so it can be tested without launching a separate process for every case.
        </P>
        <Steps items={[
          'Extract the line-counting operation into a pure function that accepts text.',
          'Keep argument parsing and file reading in a thin main function.',
          'Test empty input, blank lines, and mixed line endings.',
          'Document what the exit code means and avoid printing private file contents.',
        ]} />
      </Part>

      <Part n={7} label="Pitfalls" title="Common Node.js Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming a relative file path starts beside the script', cause: 'Relative paths are commonly resolved from the process working directory.', fix: 'Choose the base intentionally and use the path module to construct it.' },
          { mistake: 'Mixing ESM and CommonJS syntax without checking project settings', cause: 'Node interprets files according to module configuration and file conventions.', fix: 'Follow the existing project format and verify imports with a minimal run.' },
          { mistake: 'Blocking the event loop with synchronous I/O in a server path', cause: 'Other JavaScript callbacks wait while synchronous work finishes.', fix: 'Use asynchronous APIs for routine I/O in applications that serve concurrent work.' },
          { mistake: 'Putting credentials in source or console output', cause: 'Source and logs are easily copied, committed, or exposed.', fix: 'Read secrets from protected environment configuration and redact diagnostics.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Create a Course-Notes CLI">
        <Practice
          title="Read a file, summarize it, and fail clearly"
          tasks={[
            'Write a pure function that counts non-empty lines in a string and verify it against empty and multiline inputs.',
            'Build a CLI entry point that accepts a filename, reads UTF-8 text asynchronously, and prints the count.',
            'Handle a missing argument and a missing file with a helpful message and non-zero process exit code.',
            'Move a required service URL into an environment variable and validate it once at startup.',
            'Run the same small module in the module format used by your project; explain how you confirmed the configuration.',
          ]}
          hint="Keep the pure counting function separate from process.argv and filesystem access so each layer is easy to test."
        />
      </Part>

      <KeyTakeaways items={[
        'Node.js runs JavaScript outside the browser and provides its own process, filesystem, and path APIs.',
        'Keep ESM and CommonJS usage consistent with the project configuration.',
        'Use path utilities and async filesystem APIs for portable, responsive programs.',
        'Treat process arguments, file paths, and file contents as inputs that require validation.',
        'Read deployment-specific settings from the environment, validate required values, and protect secrets.',
        'Design a CLI with a clear contract, useful errors, and deliberate exit status.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/typescript-essentials"
        label="Lesson 12 · TypeScript Essentials"
        text="You have a working mental model for JavaScript in Node. Next, add static types to model inputs and results more clearly, narrow unknown data, and make invalid states harder to represent."
      />
    </LearnLayout>
  )
}
