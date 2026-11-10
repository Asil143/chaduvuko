import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DeployingFullStackApps() {
  return (
    <LearnLayout title="Deploying a Full-Stack App" description="Environment variables, managed databases, builds, preview deployments, domains, and post-deploy checks on common platforms." section="Full-Stack Development with AI — Lesson 13" readTime="35 min">
      <Part n={1} label="Deployment model" title="Know Which Pieces Run Where">
        <P>A full-stack app can run its Next.js interface and server routes on a platform such as Vercel, while a Node and Express API may run on a long-lived application platform such as Render. PostgreSQL can run as a managed database on a provider that handles backups and operations. These are examples, not endorsements or requirements: compare regional availability, operational needs, pricing, support, and data-handling obligations before choosing.</P>
        <P>Draw the request path before deploying: a student's browser requests the web app, the web server reads or writes the database, and a server-only AI route calls the model provider. Each service needs a network path, a secure configuration, observability, and an owner. Avoid exposing a database directly to a public browser.</P>
        <Table head={['Component', 'Typical responsibility', 'Configuration to protect']} rows={[
          ['Web frontend / Next.js', 'Pages, server rendering, route handlers', 'Auth secrets, provider key, database URL'],
          ['Express API', 'REST services and business rules', 'Session secret, database URL, allowed origin'],
          ['Managed PostgreSQL', 'Durable application records', 'Database credentials and network access'],
          ['Model provider', 'AI generation service', 'Provider API key and usage controls'],
        ]} />
        <Callout type="info">Choose the smallest architecture that meets your needs. Two app services may be appropriate when Next.js and Express have distinct responsibilities, but each extra service adds deployment, networking, monitoring, and failure modes.</Callout>
      </Part>
      <Part n={2} label="Environments" title="Separate Local, Preview and Production Settings">
        <P>Keep configuration separate by environment. Local development may use a local database, previews should use isolated test data, and production should use its own database and provider credentials. Environment variables configure services without embedding deployment-specific values into the source. Store secrets in the platform's secret manager, limit who can read them, and rotate credentials if exposure is suspected.</P>
        <Code lang="bash" file=".env.example" code={`DATABASE_URL=postgresql://user:password@localhost:5432/study_planner\nSESSION_SECRET=replace-with-a-long-random-secret\nAPP_ORIGIN=http://localhost:3000\nOPENAI_API_KEY=add-a-server-side-provider-key\nLLM_MODEL=select-a-model-configured-for-your-account\n`} />
        <P>This example file documents required variable names and placeholder values only. Keep real local files out of version control. Do not put secret values in variables intended to be exposed to the browser. Preview and production environments should not accidentally share a production database or a developer's personal API key.</P>
        <Callout type="warning">Environment variables are not automatically secret just because they are variables. A framework can inline public-prefixed variables into client assets; consult its current configuration rules and verify the built output.</Callout>
      </Part>
      <Part n={3} label="Prepare the app" title="Make Builds and Startup Behavior Predictable">
        <P>Before deploying, make sure the application builds from a clean checkout, reads required configuration at startup, and has a clear start command. Pin dependencies through the package manifest and lockfile, run checks in continuous integration, and ensure the runtime listens on the host and port expected by the platform. Keep build-time and run-time secrets distinct where the platform supports that separation.</P>
        <Code lang="bash" file="release-checks.sh" code={`# Run the checks used by this repository before release\nnpm ci\nnpx tsc --noEmit\nnpm run lint\nnpm run build\n\n# Confirm the app responds to its health endpoint after startup\ncurl -i "$APP_URL/health"`} />
        <P>Use the actual scripts available in your repository; this sequence is illustrative and does not imply every project has a lint script or health endpoint. A health check should report whether the process can serve requests and, if it checks dependencies, distinguish readiness from liveness so a temporary database interruption does not trigger a restart loop.</P>
      </Part>
      <Part n={4} label="Database deployment" title="Provision PostgreSQL and Apply Migrations Safely">
        <P>Create a managed PostgreSQL instance in a region appropriate to your users and operational constraints. Configure network access and credentials narrowly, enable backups, and understand how to restore a backup before you need one. Verify connection limits and pooling behavior, especially if your app creates many short-lived server instances.</P>
        <P>Apply reviewed migrations as part of a controlled release, then deploy code compatible with the new schema. For changes that cannot be applied atomically while old and new code run together, use an expand-and-contract sequence: add compatible structures first, migrate data, switch code, and remove old structures in a later release.</P>
        <Steps items={[
          'Create isolated development, preview, and production database targets.',
          'Store each environment’s connection string in its secret manager.',
          'Review migration SQL and run it against a representative non-production database.',
          'Back up production and define a rollback or forward-fix plan before a risky change.',
          'Deploy, verify migration completion, then check an authenticated read and write path.',
        ]} />
        <Callout type="tip">A successful web build does not prove the database schema is current or reachable. Include migration status and a safe database connectivity check in release verification.</Callout>
      </Part>
      <Part n={5} label="Deploy and preview" title="Use Preview Deployments Without Production Data">
        <P>A preview deployment lets a team review an isolated change before it reaches production. Give it its own environment settings and test records. Do not use production student data in previews unless a documented, approved process permits it and protects the data. Review authentication callbacks, allowed origins, and any provider webhook URLs for each environment.</P>
        <P>Vercel is commonly used for Next.js deployments, and Render can host web services and related application components. Deployment workflows and platform features change, so follow current provider documentation for build commands, runtime settings, custom domains, and network configuration. A successful platform deploy is not the same as a product acceptance test.</P>
        <Code lang="bash" file="deployment-smoke-test.sh" code={`# Use non-sensitive test data in a preview environment\ncurl -i "$APP_URL/health"\ncurl -i "$APP_URL/api/plans"\n\n# Confirm a rejected request does not disclose private records\ncurl -i "$APP_URL/api/plans/unknown-test-id"`} />
        <P>Smoke tests should confirm expected status codes, safe headers, and basic dependencies without printing secrets. A protected endpoint should reject unauthenticated access; a test that expects private data should use an explicitly provisioned test account.</P>
      </Part>
      <Part n={6} label="Operate" title="Observe Errors, Latency and Resource Use">
        <P>Production work continues after launch. Capture structured logs with a request or trace identifier, timestamp, severity, route, and safe context. Do not log passwords, cookies, authorization headers, full prompts, or sensitive database rows. Track request error rates, latency, database connection pressure, migration outcomes, and model usage. Set alerts that lead to an actionable response rather than generating noise.</P>
        <P>Have a rollback plan for the application and a separate recovery plan for data. Backups are useful only if restore has been tested. For model calls, log safe usage and latency metadata, enforce provider budgets and per-user limits, and retain enough identifiers to investigate failures without retaining unnecessary prompt content.</P>
        <Table head={['Signal', 'What it can reveal', 'First response']} rows={[
          ['HTTP error rate', 'A broken route or upstream dependency', 'Check deploy version and correlated request IDs'],
          ['Request latency', 'Slow database, provider, or overloaded runtime', 'Trace the slow dependency and compare by route'],
          ['Database connections', 'Pooling or concurrency pressure', 'Review instance count and connection strategy'],
          ['AI usage and failures', 'Unexpected spend or provider instability', 'Check limits, model configuration, and provider status'],
        ]} />
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using one database and key for every environment', cause: 'Preview tests can alter real records or spend production quota.', fix: 'Separate settings, credentials, and data for local, preview, and production.' },
          { mistake: 'Committing a real .env file', cause: 'Secrets persist in repository history and can be copied by others.', fix: 'Commit a placeholder example, ignore real files, and rotate any exposed credential.' },
          { mistake: 'Deploying code before its schema is compatible', cause: 'Old and new app instances can fail while a migration is incomplete.', fix: 'Plan compatible migrations and coordinate release ordering.' },
          { mistake: 'Assuming deploy success proves the app works', cause: 'The app can still lack secrets, database access, auth callbacks, or valid domains.', fix: 'Run smoke tests and review logs and health signals after release.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Ship the Study Planner with a Safe Release Checklist">
        <Practice title="A repeatable production deployment" tasks={[
          'Choose a hosting layout for Next.js, any separate Express API, managed PostgreSQL, and the model provider.',
          'Create an environment-variable inventory and separate local, preview, and production values.',
          'Prepare a reviewed database migration and document backup and restore checks.',
          'Add a health endpoint and smoke tests for public, authenticated, and rejected requests.',
          'Configure structured logs and alerts for errors, latency, database pressure, and model usage without recording secrets.',
          'Write a short rollback procedure and identify who responds to a failed deployment.',
        ]} hint="Use current Vercel, Render, and database-provider documentation for platform-specific setup. Do not run deployment commands against production while experimenting." />
      </Part>
      <KeyTakeaways items={[
        'Map the web, API, database, and AI-provider request path before choosing hosting.',
        'Separate local, preview, and production secrets and data.',
        'Review migrations and database recovery plans as part of deployment, not as an afterthought.',
        'Use preview deployments with isolated test data and environment-specific callbacks.',
        'Verify the live app with smoke tests after each release.',
        'Monitor errors, latency, database capacity, and AI usage while keeping sensitive data out of logs.',
      ]} />
      <Bullets items={[<span key="reference">Use the current official Vercel, Render, PostgreSQL, and managed database documentation for provider-specific deployment and networking steps.</span>]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/full-stack-capstone"
        label="Lesson 14 · Full-Stack Capstone — AI-Powered SaaS App"
        text="Plan and build a small SaaS app with authentication, a database, an AI feature, tests and deployment, and present it as a portfolio project." />
    </LearnLayout>
  )
}
