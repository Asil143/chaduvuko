import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DockerCompose() {
  return (
    <LearnLayout
      title="Docker Compose for Multi-Service Apps"
      description="Run an API, database, and cache together with Compose: services, networks, volumes, health checks, and environment files."
      section="DevOps & Cloud Infrastructure — Lesson 05"
      readTime="30 min"
    >
      <Part n={1} label="A local system, not a single process" title="Describe Services Together">
        <P>
          A backend feature often needs more than an API process. A delivery-status service might need a PostgreSQL database
          for durable orders and Redis for short-lived cache or coordination. Docker Compose reads a YAML file describing
          services, networks, volumes, and configuration, then manages the local application as a group. It provides a
          repeatable development environment; it is not automatically a production orchestrator or a replacement for a
          production backup and security plan.
        </P>
        <P>
          Each service is created from an image or a build context. Compose creates a private network by default so service
          names can be used as DNS names between containers. In the example, the API can connect to PostgreSQL at host
          <code> db</code> and Redis at host <code>cache</code>; those names are not generally reachable from the developer's
          laptop. Only the API's port is published to the host. The database and cache remain internal unless an explicit
          port mapping is added for local tools.
        </P>
        <Table
          head={['Compose concept', 'Role in the example', 'What it does not guarantee']}
          rows={[
            ['Service', 'API, PostgreSQL, or Redis container definition', 'Application-level correctness'],
            ['Network', 'Private service-to-service name resolution', 'Protection from a compromised host'],
            ['Volume', 'Persistent database files across container replacement', 'A backup or disaster recovery plan'],
            ['Health check', 'Reports whether a configured command succeeds', 'That every business operation works'],
          ]}
        />
        <Callout type="info">
          Compose is excellent for local integration and demos. Production environments may use managed databases, a
          container platform, or another deployment system with separately managed secrets, availability, and backups.
        </Callout>
      </Part>

      <Part n={2} label="The YAML file" title="Wire an API, PostgreSQL, and Redis">
        <P>
          Save the following as <code>compose.yaml</code> beside the API's Dockerfile and application source. The API is
          built locally; database and cache services use their upstream images. The example uses Compose variable
          substitution for credentials and database settings, reads values from an environment file, and checks service
          health before starting the API. Review the current image documentation and pin a tested version or digest for
          shared and release environments; do not assume a floating tag is reproducible.
        </P>
        <Code lang="yaml" file="compose.yaml" code={`
services:
  app:
    build: .
    env_file:
      - .env
    environment:
      DATABASE_URL: postgresql://\${POSTGRES_USER}:\${POSTGRES_PASSWORD}@db:5432/\${POSTGRES_DB}
      REDIS_URL: redis://cache:6379/0
    ports:
      - "127.0.0.1:8000:8000"
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=3)"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  db:
    image: postgres:latest
    env_file:
      - .env
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \\"$\${POSTGRES_USER}\\" -d \\"$\${POSTGRES_DB}\\""]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s

  cache:
    image: redis:latest
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  postgres-data:
`} />
        <P>
          The database URL uses Compose interpolation from the project-level <code>.env</code> file. The health-check command
          uses <code>$$</code> to pass a dollar sign through Compose so the container shell expands the value at runtime.
          The sample FastAPI health route does not create database or cache clients; a real API must read these URLs, use
          appropriate drivers, and define its own readiness behavior. For services that support separate user/password/database variables, passing those values separately can
          avoid embedding reserved URL characters without encoding. Check the framework's database URL parsing rules.
        </P>
        <Callout type="warning">
          Replace <code>latest</code> with a deliberate, tested version or digest before a team relies on the setup. Database
          images can change behavior across releases, and a floating tag makes repeated builds less predictable.
        </Callout>
      </Part>

      <Part n={3} label="Environment configuration" title="Keep Local Settings Out of Source Control">
        <P>
          Compose can read a project-level <code>.env</code> file for variable interpolation, and <code>env_file</code> passes
          environment values into a service container. Those are related but different uses. Add the real local file to
          <code> .gitignore</code>; provide teammates a safe template containing variable names and non-secret examples.
          Values in a file are still plain text on the machine, so protect file permissions and do not treat a checked-in
          template or an ignored file as a production secret manager.
        </P>
        <Code lang="bash" file=".env.example" code={`
POSTGRES_USER=appuser
POSTGRES_PASSWORD=replace-with-a-local-only-password
POSTGRES_DB=delivery_dev
`} />
        <Code lang="bash" file=".gitignore" code={`
.env
.env.*.local
`} />
        <P>
          Copy the example to your local <code>.env</code> and set a unique development password that is not used anywhere
          else. Avoid committing a password, token, or real customer data. In CI and production, inject sensitive values via
          the platform's secret facility with access limited to the workload that needs them. Rotate exposed values rather
          than simply deleting a line from the latest commit.
        </P>
        <Code lang="bash" code={`
cp .env.example .env
# Edit .env with a unique, local-only value before starting services.
`} />
        <Callout type="tip">
          Keep configuration names consistent across local, test, and production environments, but use separate values and
          access controls. Never copy production database credentials into a developer's Compose file.
        </Callout>
      </Part>

      <Part n={4} label="Start and inspect" title="Bring the Stack Up in a Controlled Way">
        <P>
          Before starting all services, render the Compose configuration and inspect it for accidental secrets, incorrect
          ports, or an unexpected build context. Then build and start the application. <code>up</code> creates or reuses
          services, while <code>ps</code> and <code>logs</code> help inspect state. The first database startup initializes
          its volume; later starts reuse that volume. Do not remove volumes casually if they contain data you need.
        </P>
        <Code lang="bash" code={`
docker compose config
docker compose up --build -d
docker compose ps
docker compose logs --tail 60 app db cache
curl http://localhost:8000/health
`} />
        <P>
          Service startup order and service readiness are different. Compose's <code>depends_on</code> can establish ordering;
          with a health condition, Compose waits for the dependency's health check before creating the dependent service.
          The application still needs robust connection handling because a database can become unavailable later. Health
          checks should test a meaningful readiness condition without being excessively expensive or exposing sensitive data.
        </P>
        <Steps items={[
          'Validate the rendered configuration and confirm values are local-only.',
          'Start the stack and inspect service state and logs.',
          'Wait for healthy dependencies, then verify the API endpoint.',
          'Test how the API behaves when a dependency is stopped and restored.',
        ]} />
      </Part>

      <Part n={5} label="Dependencies and health" title="A Running Container Is Not Necessarily Ready">
        <P>
          A process can exist while its service is still initializing. A database may need to create its first data directory,
          apply internal setup, and accept connections before an API can use it. A Redis process may also be running but not
          yet responding as expected. Health checks make readiness observable by executing a command inside the container.
          Compose's health-conditioned dependency helps with initial startup, but the application must still retry transient
          connection failures and report useful errors.
        </P>
        <P>
          Choose check intervals and timeouts based on service startup and impact. A check that is too strict may mark a slow
          but healthy service unhealthy; one that only checks that a process exists may miss a real outage. For the API,
          checking its HTTP health endpoint is useful only if that endpoint reflects the readiness contract you intend. Keep
          liveness (process can continue) and readiness (safe to receive work) distinct when the platform supports both.
        </P>
        <Table
          head={['Signal', 'Question', 'Example']}
          rows={[
            ['Container state', 'Is the main process running?', 'docker compose ps'],
            ['Health status', 'Did the configured check succeed?', 'Compose health check result'],
            ['Readiness', 'Can this service handle the intended work?', 'Application-level health endpoint'],
            ['Dependency recovery', 'Can the app reconnect after failure?', 'Controlled stop and restart test'],
          ]}
        />
        <Callout type="example">
          If PostgreSQL restarts during a practice run, the API should log a clear connection error and recover according to
          its retry policy. Compose startup ordering does not replace runtime resilience.
        </Callout>
      </Part>

      <Part n={6} label="Networks and persistence" title="Know Which Data Survives and Who Can Connect">
        <P>
          Compose creates a network so services can resolve one another by service name. Inside the network, the app uses
          <code> db:5432</code> and <code>cache:6379</code>; <code>localhost</code> inside the app container refers to that
          same container, not the database. Publishing a host port is only needed for a client outside the Compose network.
          The sample publishes the API on the developer's loopback interface and does not publish database or cache ports.
        </P>
        <P>
          The named <code>postgres-data</code> volume keeps database files when the database container is replaced. Removing
          containers does not necessarily remove named volumes, but <code>docker compose down -v</code> removes project
          volumes and can destroy local data. Back up state before cleanup, and test that a backup can be restored. For
          important environments, use a database service with an explicit backup, encryption, retention, and recovery plan.
        </P>
        <Code lang="bash" code={`
# Stop and remove containers and network; keep named volumes.
docker compose down

# List volumes so you understand what contains persistent state.
docker volume ls

# Inspect the database volume instead of deleting it blindly.
docker volume inspect <project>_postgres-data
`} />
        <Callout type="warning">
          Treat <code>docker compose down -v</code> as a destructive data operation. Use it only when you intentionally want
          to delete the database volume, have confirmed the target project, and do not need the stored data.
        </Callout>
      </Part>

      <Part n={7} label="Development workflow" title="Make Local Changes and Rebuild Deliberately">
        <P>
          After editing the API or Compose configuration, recreate only what needs to change and inspect the resulting
          services. A source change for an image-built service requires a rebuild; an environment or port change may require
          container recreation. Use <code>docker compose logs -f app</code> to follow logs while testing and stop following
          with <code>Ctrl+C</code> (this stops log viewing, not necessarily the service). Keep app logs on standard output and
          error so Compose can collect them.
        </P>
        <Code lang="bash" code={`
docker compose up --build -d app
docker compose ps
docker compose logs -f app
# In another terminal:
curl http://localhost:8000/health
`} />
        <P>
          Local Compose files should stay understandable to the team. Avoid hard-coding machine-specific absolute paths,
          production endpoints, or secrets. If developer-specific overrides are needed, document how to use them and keep
          private override files out of version control. Review the resolved configuration before sharing logs or config
          output, because rendered settings can contain credentials.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using localhost as the database hostname from the app container', cause: 'localhost refers to the current container, not its Compose peer.', fix: 'Connect using the Compose service name, such as db.' },
          { mistake: 'Starting the API as soon as the database container exists', cause: 'A running process may not yet accept database connections.', fix: 'Use health checks for startup and implement runtime retries in the application.' },
          { mistake: 'Assuming depends_on makes the app resilient', cause: 'It controls startup conditions, not later outages or reconnection behavior.', fix: 'Handle dependency failures in the app and test recovery.' },
          { mistake: 'Deleting volumes to fix every local problem', cause: 'The volume may contain the only copy of useful data.', fix: 'Inspect state and back up first; remove volumes only when data loss is intended.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Run and Diagnose a Three-Service Stack">
        <Practice
          title="Exercise the lifecycle, not only startup"
          tasks={[
            'Create the Compose file, local .env, and .gitignore, then inspect docker compose config before starting anything.',
            'Start the app, PostgreSQL, and Redis; inspect health and call the API endpoint from the host.',
            'Confirm the app uses db and cache as internal hostnames and that only the API port is published.',
            'Stop the database container, observe app logs, then restore it and evaluate whether the app recovers.',
            'Run docker compose down and bring the stack back up; check that the database volume still contains its data.',
            'Write a short note describing how production secrets, database backups, and service health would differ from this local setup.',
          ]}
          hint="Do not use production credentials or data. Check the resolved Compose config carefully because it may display environment values."
        />
      </Part>

      <KeyTakeaways items={[
        'Compose describes a group of related services, networks, volumes, and configuration in one file.',
        'Containers on the Compose network connect to each other by service name, not localhost.',
        'depends_on controls startup dependencies; health checks and application retries address different needs.',
        'Use environment files for local configuration, exclude private values from Git, and use a secret manager in production.',
        'A named volume persists data beyond a container but is not a backup.',
        'Review configuration, logs, health, ports, and recovery behavior throughout the lifecycle.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/cloud-compute-iam-networking"
        label="Lesson 06 · Cloud Core — Compute, IAM and VPC Networking"
        text="You can run a multi-service application locally. Next, map these ideas to cloud compute, least-privilege identity, and private network design."
      />
    </LearnLayout>
  )
}
