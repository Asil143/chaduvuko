import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function PostgresWithAnOrm() {
  return (
    <LearnLayout title="PostgreSQL with an ORM — Prisma" description="Model tables in a schema, run migrations, query and relate records, and avoid N+1 queries." section="Full-Stack Development with AI — Lesson 07" readTime="35 min">
      <Part n={1} label="Relational model" title="Plan Data as Tables with Clear Relationships">
        <P>PostgreSQL is a relational database: data is stored in tables, rows have columns, and constraints protect important rules. A study planner can have students, plans, and sessions. One student can own multiple plans, and one plan can contain many sessions. Model those relationships explicitly rather than storing a comma-separated list inside one text column.</P>
        <P>Every row should have an identifier. Add constraints for required values and relationships, and consider which queries need indexes. A database constraint protects data even if two requests arrive at the same time or a bug bypasses the user interface.</P>
        <Table head={['Entity', 'Important fields', 'Relationship']} rows={[
          ['Student', 'id, email, createdAt', 'One student can have many plans'],
          ['StudyPlan', 'id, ownerId, title, examDate', 'Belongs to one student'],
          ['StudySession', 'id, planId, title, scheduledAt, completedAt', 'Belongs to one plan'],
        ]} />
        <Callout type="info">An ORM maps application objects to relational data, but it does not remove the need to understand SQL, constraints, transactions, indexes, or query costs.</Callout>
      </Part>
      <Part n={2} label="Prisma schema" title="Describe Models, Fields and Relations">
        <P>Prisma's schema is a declarative description of models and their database mapping. A relation field in the schema corresponds to a foreign key in the database. Keep ownership fields explicit so queries can scope records to the signed-in student. Configure the database connection through an environment variable that is not committed to source control.</P>
        <Code lang="typescript" file="prisma/schema.prisma" code={`generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Student {\n  id        String     @id @default(cuid())\n  email     String     @unique\n  createdAt DateTime   @default(now())\n  plans     StudyPlan[]\n}\n\nmodel StudyPlan {\n  id        String        @id @default(cuid())\n  ownerId   String\n  title     String\n  examDate  DateTime?\n  createdAt DateTime      @default(now())\n  owner     Student       @relation(fields: [ownerId], references: [id], onDelete: Cascade)\n  sessions  StudySession[]\n  @@index([ownerId, createdAt])\n}\n\nmodel StudySession {\n  id          String    @id @default(cuid())\n  planId      String\n  title       String\n  subject     String\n  scheduledAt DateTime?\n  completedAt DateTime?\n  plan        StudyPlan @relation(fields: [planId], references: [id], onDelete: Cascade)\n  @@index([planId, scheduledAt])\n}`} />
        <P>The unique email constraint prevents duplicate accounts, while the foreign keys ensure a plan cannot refer to a missing owner. Cascade deletion is a product decision: if deleting a student should preserve records for retention or audit, choose a different lifecycle. Think through privacy and recovery requirements before selecting cascading behavior.</P>
        <Callout type="warning">A schema edit is not itself a safe production deployment. Review the generated migration, backups, locking behavior, and whether old and new application versions can both run during rollout.</Callout>
      </Part>
      <Part n={3} label="Migrations" title="Evolve the Database with Reviewed Migrations">
        <P>A migration is a versioned database change that can be reviewed and applied consistently. In local development, create a migration after changing the schema, inspect the SQL it will run, and commit the migration files with the application. In production, apply committed migrations through the deployment process rather than editing a live database by hand.</P>
        <Code lang="bash" file="migration-workflow.sh" code={`# Create a development migration after editing schema.prisma\nnpx prisma migrate dev --name add-study-plans\n\n# Inspect the generated migration before committing it\n# Apply committed migrations in a deployment environment\nnpx prisma migrate deploy\n\n# Regenerate the client when the schema changes\nnpx prisma generate`} />
        <P>Commands shown here are common Prisma CLI workflows; use the project manifest and official docs for the exact command available in the installed Prisma version. Do not run a development migration command against production. A deployment migration should be repeatable as part of a controlled release, and the team should know how to recover from a failed migration.</P>
      </Part>
      <Part n={4} label="Queries" title="Create and Read Data Through the Generated Client">
        <P>Prisma Client provides typed query methods generated from the schema. Keep a reusable client instance in a server-only module, then call it from server code or API services. The example deliberately accepts an owner ID supplied by the caller: your application must obtain that ID from a verified authentication session, never blindly trust a request field.</P>
        <Code lang="typescript" file="src/data/plans.ts" code={`import { PrismaClient } from "@prisma/client"\n\nconst prisma = new PrismaClient()\n\nexport async function createPlan(input: {\n  ownerId: string\n  title: string\n  examDate?: Date\n}) {\n  return prisma.studyPlan.create({\n    data: {\n      ownerId: input.ownerId,\n      title: input.title,\n      examDate: input.examDate,\n    },\n    select: { id: true, title: true, examDate: true, createdAt: true },\n  })\n}\n\nexport async function listPlansForOwner(ownerId: string) {\n  return prisma.studyPlan.findMany({\n    where: { ownerId },\n    orderBy: { createdAt: "desc" },\n    select: { id: true, title: true, examDate: true },\n  })\n}`} />
        <P>Choose only the fields the caller needs. An explicit <code>select</code> reduces accidental exposure of private fields and makes the data shape clear. For a list that can grow, add pagination and a stable ordering rather than loading every plan forever.</P>
      </Part>
      <Part n={5} label="Relations" title="Load Related Sessions Deliberately">
        <P>Relations let a query include data from related tables. If the page needs each plan with its next few sessions, request that shape deliberately and select only the relevant columns. Avoid a loop that queries sessions once per plan; that N+1 pattern can turn one page request into many database round trips.</P>
        <Code lang="typescript" file="src/data/plan-details.ts" code={`export async function listPlanSummaries(ownerId: string) {\n  return prisma.studyPlan.findMany({\n    where: { ownerId },\n    orderBy: { createdAt: "desc" },\n    select: {\n      id: true,\n      title: true,\n      sessions: {\n        orderBy: { scheduledAt: "asc" },\n        take: 5,\n        select: { id: true, title: true, scheduledAt: true, completedAt: true },\n      },\n    },\n  })\n}`} />
        <P>This is one logical query request with a bounded related collection. Inspect actual query behavior and database plans when performance matters; the ORM's API shape does not guarantee a particular query strategy in every configuration. Add indexes that match frequent filters and sort orders, then verify them against real workload patterns.</P>
        <Callout type="tip">Select a focused read model for the screen rather than returning an entire database record graph. Smaller responses are easier to secure and faster to render.</Callout>
      </Part>
      <Part n={6} label="Transactions and operations" title="Protect Multi-Step Changes">
        <P>Use a transaction when several database writes must succeed or fail together. For example, creating a plan and its initial sessions should not leave a half-created plan if one session insert fails. Transactions do not automatically prevent every concurrency bug, so choose constraints and isolation behavior appropriate to the business rule.</P>
        <Code lang="typescript" file="src/data/create-plan-with-sessions.ts" code={`export async function createPlanWithSessions(input: {\n  ownerId: string\n  title: string\n  sessions: { title: string; subject: string }[]\n}) {\n  return prisma.studyPlan.create({\n    data: {\n      ownerId: input.ownerId,\n      title: input.title,\n      sessions: {\n        create: input.sessions.map((session) => ({\n          title: session.title, subject: session.subject,\n        })),\n      },\n    },\n    include: { sessions: true },\n  })\n}`} />
        <P>Nested writes are useful for closely related records. For more complex workflows, use an explicit transaction API, but keep external network calls outside a database transaction where possible: a slow AI provider call can hold locks open and exhaust connections.</P>
        <Steps items={[
          'Store connection strings in the deployment secret manager or local ignored environment file.',
          'Use a least-privilege database role for the application.',
          'Review migration SQL and test it against a representative database.',
          'Set connection pooling appropriate for serverless or long-lived runtimes.',
          'Monitor query duration, database connections, and migration outcome.',
        ]} />
      </Part>
      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Changing a production schema manually', cause: 'The application and migration history no longer describe the same database.', fix: 'Create a reviewed migration and apply it through a release process.' },
          { mistake: 'Returning all columns and relations by default', cause: 'Sensitive fields and unnecessary data can escape the server.', fix: 'Use focused select clauses and a purpose-built response shape.' },
          { mistake: 'Querying child records inside a loop', cause: 'A growing list creates many database round trips.', fix: 'Load related records in a bounded query and inspect query behavior.' },
          { mistake: 'Opening a database connection per request without limits', cause: 'Concurrent app instances can exhaust database connections.', fix: 'Use a suitable client lifecycle, pooling, and platform-specific guidance.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Persist the Planner Safely">
        <Practice title="A relational plan model with a migration" tasks={[
          'Model Student, StudyPlan, and StudySession with keys, relations, and appropriate constraints.',
          'Create and review a migration that adds plans and sessions without deleting existing data.',
          'Implement createPlan and listPlansForOwner using explicit fields and an authenticated owner ID.',
          'Load a plan with a bounded list of sessions and compare it with a per-plan query loop.',
          'Write down how the deployment will apply migrations and where database credentials will be stored.',
        ]} hint="Keep all database calls on the server. Add authorization before any query keyed by a plan ID." />
      </Part>
      <KeyTakeaways items={[
        'Model related concepts as relational tables with keys, constraints, and explicit ownership.',
        'Prisma schema describes models; migrations evolve the real database over time.',
        'Review migration SQL and use a controlled production deployment process.',
        'Use generated client queries with explicit selection and authorization-scoped filters.',
        'Bound related records and avoid N+1 query patterns.',
        'Consider pooling, backups, least privilege, and transaction scope in production.',
      ]} />
      <Bullets items={[<span key="reference">Consult the official PostgreSQL and Prisma documentation for schema, migration, and connection guidance. Database URLs are secrets and should never be committed.</span>]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/authentication-sessions-jwt"
        label="Lesson 08 · Authentication — Sessions, JWTs and OAuth"
        text="Connect student identity to database ownership with password hashing, safe cookies, and authorization checks." />
    </LearnLayout>
  )
}
