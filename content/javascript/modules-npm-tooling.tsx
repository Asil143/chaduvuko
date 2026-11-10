import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ModulesNpmTooling() {
  return (
    <LearnLayout
      title="Modules, npm and Build Tooling"
      description="ES modules, package.json and npm scripts, dependencies and lockfiles, Vite, and linting and formatting with ESLint and Prettier."
      section="JavaScript & TypeScript — Lesson 05"
      readTime="30 min"
    >
      <Part n={1} label="Why structure matters" title="A Project Grows Beyond One Script">
        <P>
          A few lines can live in one script, but a real interface soon has separate concerns: reading data, validating form
          input, rendering a view, and making network requests. Keeping all of that in one file makes ownership unclear and
          makes changes risky. Modules let a file expose a small public interface and keep its implementation details local.
        </P>
        <P>
          Modern JavaScript modules use <code>import</code> and <code>export</code>. Each module has its own scope, so a
          top-level variable in one file does not automatically become a global in another. This isolation makes modules
          easier to test and reuse.
        </P>
        <Callout type="tip">
          Split files by responsibility, not by arbitrary line count. A tiny application does not need dozens of modules; a
          growing feature benefits when parsing, state, and rendering have clear boundaries.
        </Callout>
        <P>
          Browsers support native modules through <code>&lt;script type="module"&gt;</code>. Build tools such as Vite add a
          convenient development server and prepare assets for production. We will first learn the module syntax, then see
          where tooling fits.
        </P>
      </Part>

      <Part n={2} label="Exports" title="Choose Named or Default Exports Intentionally">
        <P>
          A named export gives an item an explicit exported name. Importers use braces and the same name (or an explicit
          alias). A module can expose several named helpers. A default export represents the main value from a module and
          can be imported under a chosen local name. Prefer a consistent style in each project.
        </P>
        <Code lang="javascript" file="money.js" code={`export function formatRupees(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export const DEFAULT_CATEGORY = 'Other'`} />
        <Code lang="javascript" file="expense-view.js" code={`import { DEFAULT_CATEGORY, formatRupees } from './money.js'

export function expenseLabel(expense) {
  const category = expense.category || DEFAULT_CATEGORY
  return expense.description + ' · ' + category + ' · ' + formatRupees(expense.amount)
}`} />
        <P>
          Relative imports such as <code>./money.js</code> refer to files near the current module. The exact extension and
          resolution rules depend on the environment and toolchain. Browser-native modules typically use explicit paths;
          bundlers can provide additional resolution behaviour based on configuration.
        </P>
        <Code lang="javascript" file="main.js" code={`import { expenseLabel } from './expense-view.js'

const expense = { description: 'Bus fare', category: 'Travel', amount: 35 }
console.log(expenseLabel(expense))`} />
        <Callout type="info">
          Avoid circular dependencies: if module A imports B while B imports A, initialization order becomes harder to
          reason about. Move shared values into a small third module or change the responsibilities when a cycle appears.
        </Callout>
      </Part>

      <Part n={3} label="Browser modules" title="Load the Entry Point as a Module">
        <P>
          A browser module is loaded with a module script. Modules are deferred automatically until HTML parsing is complete,
          and they use strict mode. The script below starts a small page from its entry file. Native module loading works well
          for simple demos, while a development server is needed to provide a smooth local workflow and production packaging.
        </P>
        <Code lang="html" code={`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Expense tracker</title>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`} />
        <P>
          Browser security restrictions can prevent modules from loading from some local file URLs. Serve the project over a
          local development server instead. In a Vite project, the HTML entry and imported source files are served as part
          of the application workflow.
        </P>
        <Steps items={[
          'Choose one entry module, often named main.js or src/main.js.',
          'Import the modules it needs using clear relative paths.',
          'Export only the functions or values other files need.',
          'Keep browser-only operations near the UI layer and reusable logic independent where practical.',
        ]} />
        <P>
          A clean entry point is not a requirement to have only one file; it is a place where application startup is visible.
          Keep initialization predictable and avoid side effects that start merely because a helper module was imported.
        </P>
      </Part>

      <Part n={4} label="npm and packages" title="Use npm to Describe and Install Project Dependencies">
        <P>
          npm is a package manager distributed with Node.js. A package is reusable project code with metadata. The
          <code>package.json</code> file describes the project, scripts, and dependency ranges. A lockfile records a resolved
          dependency tree so installs can be more repeatable. Commit the lockfile for an application and use the package
          manager chosen by the team consistently.
        </P>
        <Code lang="bash" code={`npm init -y
npm install --save-dev vite`} />
        <P>
          The first command creates a starter manifest; the second adds Vite as a development dependency. A development
          dependency is needed to work on and build the project, while runtime dependencies are packaged or required by the
          application itself. Review dependencies before adding them: every package is code your project chooses to trust.
        </P>
        <Code lang="javascript" file="package.json (scripts excerpt)" code={`{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "the range written by npm install"
  }
}`} />
        <P>
          Treat the manifest as JSON: keys and string values use double quotes, and comments are not allowed. The actual
          dependency range should be generated by npm for the chosen installation, not copied from an unrelated tutorial.
          The lockfile captures the exact tree used by an install. Do not edit that generated file by hand.
        </P>
        <Table
          head={['File or folder', 'Purpose', 'Team practice']}
          rows={[
            ['package.json', 'Project metadata, scripts and declared dependencies', 'Review intentional manifest changes'],
            ['package-lock.json', 'Resolved npm dependency tree', 'Commit it for a reproducible application install'],
            ['node_modules/', 'Installed package contents', 'Do not commit; recreate from the manifest and lockfile'],
            ['src/', 'Application source modules', 'Organize by feature or clear responsibility'],
          ]}
          caption="The files around a typical JavaScript project"
        />
        <Callout type="warning">
          Do not casually delete or regenerate a lockfile in a team project. That can change many transitive dependency
          versions and create a much larger review than the manifest edit suggests.
        </Callout>
      </Part>

      <Part n={5} label="Run Vite" title="Create a Local Development Loop">
        <P>
          Vite serves source modules during development and builds optimized assets for production. Its starter command opens
          an interactive prompt; choose a vanilla JavaScript template when following this lesson. The exact prompt may change,
          so follow the currently displayed choices instead of relying on an outdated numbered selection.
        </P>
        <Code lang="bash" code={`npm create vite@latest my-expense-app
cd my-expense-app
npm install
npm run dev`} />
        <P>
          The development command prints a local URL. Open that URL in a browser and keep the terminal running while you work.
          When files change, Vite updates the development page. The build script creates production assets, and the preview
          script can serve the built output locally for a final check. Neither command replaces testing in the actual hosting
          environment.
        </P>
        <Code lang="bash" code={`npm run build
npm run preview`} />
        <P>
          Scripts are project commands, so they make the team's workflow discoverable. A new teammate can inspect
          <code>package.json</code> rather than guessing how to start or build the application. Keep scripts focused and
          document any extra setup that is not obvious.
        </P>
        <Callout type="example">
          A real feature branch might run the dev server for quick feedback, run lint and tests before review, then create a
          production build in continuous integration. Each step catches a different class of problem.
        </Callout>
      </Part>

      <Part n={6} label="Toolchain" title="Know What a Build Tool Does—and Does Not Do">
        <P>
          A bundler follows imports, processes supported assets, and emits files that can be served to a browser. It may
          transform newer syntax for configured targets, but it does not automatically make every browser API available in
          every environment. Be clear about which runtime features your application uses and which transformations your
          project's configuration provides.
        </P>
        <P>
          Vite's fast development experience is not a substitute for checking the production build. Development and production
          have different serving and optimization behaviour. Build regularly, test the output, and configure the hosting
          platform to serve the generated assets and route requests appropriately.
        </P>
        <Steps items={[
          'Install the project dependencies from the manifest and lockfile.',
          'Start the development server and verify the feature in a browser.',
          'Run the project checks, such as tests and linting, when they are configured.',
          'Create a production build and inspect the output for missing assets or configuration.',
          'Deploy through a reviewed pipeline rather than uploading local node_modules.',
        ]} />
        <P>
          Linters report patterns that are likely to be errors or inconsistent with a project's rules. Formatters make style
          consistent. They are separate tools with different jobs. Add them when a project needs them, follow the shared
          configuration, and avoid spending time debating formatting that can be automated.
        </P>
        <Callout type="tip">
          A lockfile makes dependency resolution more reproducible, but it is not a security guarantee. Keep dependencies
          maintained, review updates, and use the repository's standard checks before release.
        </Callout>
      </Part>

      <Part n={7} label="Maintainability" title="Keep Package Boundaries and Secrets Clear">
        <P>
          Every package adds code, updates, and potential risk. Before adding one, check whether the platform already provides
          the capability, whether the package is maintained, and whether its API fits the need. Pinning and updating policies
          should follow the team's release process rather than an arbitrary copy-paste convention.
        </P>
        <P>
          Front-end source and built assets are visible to users. Environment values embedded in browser output are not
          secrets. Do not put database passwords, private API keys, or signing credentials in client-side environment
          variables. Secrets belong in a trusted server or deployment secret store, with the smallest required access.
        </P>
        <P>
          Keep imports explicit and avoid a single giant utility module that exports everything. A module should have a
          focused responsibility, dependencies should generally flow in one direction, and application entry points should
          be easy to locate. These conventions matter more as multiple contributors work in parallel.
        </P>
        <Callout type="warning">
          A bundler can make code easier to ship, but it cannot hide credentials from the browser. If a browser needs a private
          service, call your own server and have that server protect the credential.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using import syntax without a module environment', cause: 'The browser script was not loaded as a module or the project toolchain is not configured for modules.', fix: 'Use type="module" in a native browser entry or follow the Vite entry and scripts.' },
          { mistake: 'Forgetting that imports need valid paths', cause: 'A typo or mismatched file extension breaks module resolution.', fix: 'Check the relative path and follow the runtime or bundler resolution rules.' },
          { mistake: 'Committing node_modules', cause: 'It contains generated installed packages and can be large and platform-specific.', fix: 'Use the manifest and lockfile to recreate dependencies; keep node_modules ignored.' },
          { mistake: 'Putting a secret in front-end configuration', cause: 'Bundled browser code and requests can be inspected by users.', fix: 'Keep private credentials on a trusted server and expose only a safe application endpoint.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Split the Expense Tracker into Modules">
        <Practice
          title="Create a small, repeatable JavaScript project"
          tasks={[
            'Create a Vite vanilla JavaScript project and inspect its generated manifest and source entry.',
            'Move rupee formatting into a module that exports a named formatRupees function.',
            'Create a second module that imports the formatter and renders one sample expense.',
            'Add or review dev, build, and preview scripts; run the production build and inspect the result.',
            'Explain why the lockfile is committed while node_modules is not.',
            'Identify a value that would be unsafe to place in browser-visible configuration and describe a server-side alternative.',
          ]}
          hint="Start with a small dependency graph: an entry module imports feature code, which imports a focused formatter."
        />
      </Part>

      <KeyTakeaways items={[
        'ES modules use import and export, create file-local scope, and make dependencies explicit.',
        'Choose named exports for clearly named APIs and use a consistent default-export convention where appropriate.',
        'package.json declares project scripts and dependency ranges; the lockfile records a resolved dependency tree.',
        'Use npm scripts to make development and build workflows discoverable.',
        'Vite provides a development server and production build, but development success does not replace build checks.',
        'Do not commit node_modules or put private secrets in browser-visible code.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/javascript/typescript-essentials"
        label="Lesson 06 · TypeScript Essentials"
        text="Your code is organized and buildable. In the final lesson, add static types that document data shapes and catch mistakes before runtime."
      />
    </LearnLayout>
  )
}
