import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#ff6b4a'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function ProjectSetup() {
  return (
    <LearnLayout
      title="Setting Up a dbt Project"
      description="dbt Core vs dbt Cloud, the required project files, the standard folder structure, installing the right adapter, the essential CLI commands, and a full walkthrough of dbt init through your first successful dbt run."
      section="dbt — Module 03"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Setting Up a dbt Project', href: '/learn/dbt/project-setup' },
      ]}
      prev={{ title: 'How dbt Works: Compile, Run, and the DAG', href: '/learn/dbt/how-dbt-works' }}
      next={{ title: 'Models: SELECT Statements as the Building Block', href: '/learn/dbt/models-basics' }}
    >
      {/* ── Part 01 — dbt Core vs dbt Cloud ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Two Ways to Run dbt" />
        <SectionTitle>dbt Core vs dbt Cloud — Same Language, Different Runtime</SectionTitle>

        <Para>
          Before touching a single file, you need to decide where dbt actually
          runs. dbt is a transformation tool, not a database — it compiles
          SQL and Jinja into plain SQL and sends it to your warehouse to
          execute. But the thing doing that compiling and sending has to live
          somewhere, and dbt gives you two genuinely different options:
          dbt Core and dbt Cloud. They share the same modeling language and
          the same project files, so nothing you learn in one is wasted if
          you switch to the other later.
        </Para>

        <Para>
          <strong>dbt Core</strong> is the open-source command-line tool. You
          install it yourself (typically via <code>pip</code>), you run it
          from your own machine or your own CI/CD system, and you are
          responsible for scheduling it — cron, Airflow, GitHub Actions,
          Dagster, whatever your team already uses to run jobs on a
          schedule. There is no hosted UI. Everything happens through the
          <code>dbt</code> CLI and whatever code editor you already use.
        </Para>

        <Para>
          <strong>dbt Cloud</strong> is a managed product built on top of
          dbt Core. It gives you a browser-based IDE for writing and testing
          models, a built-in job scheduler so you don't need a separate
          orchestration tool just to run dbt, hosted documentation, and a
          metadata API for other tools to query your project's state. Under
          the hood, dbt Cloud is still running the same dbt Core engine —
          it is not a different modeling language, it is a different place
          for that engine to execute and a set of operational conveniences
          wrapped around it.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The honest trade-off:</strong> dbt Core costs nothing
            beyond the compute you already pay your warehouse for, but you
            own the scheduling, the CI setup, and the documentation hosting
            yourself. dbt Cloud costs a subscription (with a free developer
            tier for small teams), and in exchange it removes the "how do we
            run this on a schedule and let non-engineers browse the docs"
            problem entirely. Neither one makes your models compile faster
            or your warehouse cheaper — that work is identical either way.
          </Para>
        </HighlightBox>

        <Table
          headers={['Capability', 'dbt Core', 'dbt Cloud']}
          rows={[
            ['Cost', 'Free — open source', 'Free tier for one developer; paid plans beyond that'],
            ['Where it runs', 'Your machine, your CI runner, your orchestrator', 'dbt Labs\' hosted infrastructure'],
            ['Scheduling jobs', 'You wire this up yourself (cron, Airflow, GitHub Actions, etc.)', 'Built-in scheduler — configure a job in the UI, done'],
            ['IDE', 'None — use VS Code or any editor locally', 'Browser-based IDE with a SQL preview pane'],
            ['Docs hosting', 'You run `dbt docs generate` and host the static site yourself', 'Hosted automatically after each job run'],
            ['Underlying engine', 'dbt Core', 'dbt Core, running inside dbt Cloud\'s infrastructure'],
            ['Typical fit', 'Teams that already have CI/CD and orchestration in place', 'Teams that want to skip building that tooling themselves'],
          ]}
        />

        <Callout title="This module teaches dbt Core" color={K}>
          Every command and file in this module works identically whether
          you eventually run it via dbt Core on your laptop, in a GitHub
          Actions job, or inside dbt Cloud's IDE — dbt Cloud runs the exact
          same <code>dbt_project.yml</code>, the exact same models, and the
          exact same CLI commands under the hood. Learning dbt Core first
          means you understand the mechanics that dbt Cloud is quietly
          doing for you, rather than only knowing which buttons to click.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Installing dbt Core ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Installation and Adapters" />
        <SectionTitle>Installing dbt Core — One Package Per Warehouse</SectionTitle>

        <Para>
          dbt does not ship with support for every warehouse baked into one
          giant package. Instead, it uses an adapter pattern: a small,
          warehouse-specific package translates dbt's general instructions
          into the SQL dialect and connection protocol that specific
          warehouse understands. You install <code>dbt-core</code> plus
          exactly one adapter package for the warehouse you actually use.
        </Para>

        <CodeBox label="installing dbt core with the snowflake adapter">
{`# Create an isolated Python environment first — dbt has its own
# dependency versions and you don't want them colliding with other
# Python projects on the same machine
python3 -m venv dbt-env
source dbt-env/bin/activate        # on Windows: dbt-env\\Scripts\\activate

# Install dbt-core AND the adapter for your warehouse together.
# Installing the adapter automatically pulls in dbt-core as a dependency —
# you do not need to install dbt-core separately.
pip install dbt-snowflake

# Verify the install and see which adapter dbt picked up
dbt --version`}
        </CodeBox>

        <Output>
{`Core:
  - installed: 1.8.3
  - latest:    1.8.3 - up to date!

Plugins:
  - snowflake: 1.8.2 - up to date!`}
        </Output>

        <Para>
          If your warehouse is different, the package name changes but the
          pattern doesn't. This is the single most common first mistake
          people make when installing dbt — they run <code>pip install
          dbt-core</code> alone, get a working CLI, and then get a confusing
          error the moment they try to connect to a warehouse, because no
          adapter was ever installed to talk to it.
        </Para>

        <Table
          headers={['Warehouse', 'Package to install', 'Notes']}
          rows={[
            ['Snowflake', 'pip install dbt-snowflake', 'Most common adapter in production teams; supports key-pair and password auth'],
            ['BigQuery', 'pip install dbt-bigquery', 'Uses a service account JSON key or OAuth for authentication'],
            ['Redshift', 'pip install dbt-redshift', 'Built on the Postgres adapter under the hood; shares much of its behavior'],
            ['Postgres', 'pip install dbt-postgres', 'Common for local development and smaller production setups'],
            ['Databricks', 'pip install dbt-databricks', 'Connects via a SQL warehouse or all-purpose cluster'],
            ['DuckDB', 'pip install dbt-duckdb', 'Popular for local, file-based experimentation — no server required'],
          ]}
        />

        <Callout title="Pin your versions" color="#22c55e">
          Add <code>dbt-snowflake==1.8.2</code> (or whichever adapter and
          version you use) to a <code>requirements.txt</code> file rather
          than installing loosely. dbt ships new minor versions fairly
          often, and an unpinned CI environment installing a newer dbt
          version than what your team develops against locally is a classic
          source of "it works on my machine but fails in CI" bugs.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — The required project files ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — dbt_project.yml" />
        <SectionTitle>dbt_project.yml — The File That Makes a Folder a dbt Project</SectionTitle>

        <Para>
          A dbt project is, at minimum, a folder containing one specific
          file: <code>dbt_project.yml</code>, sitting at the project's root.
          This file is how dbt recognizes "this directory is a dbt project"
          — when you run any <code>dbt</code> command, dbt walks upward from
          your current directory looking for this file to figure out where
          the project root is. It defines the project's name, which dbt
          version it expects, where to look for models and other resources,
          and default configuration that applies across the whole project
          unless a more specific config overrides it.
        </Para>

        <CodeBox label="dbt_project.yml — a real, minimal starting project">
{`name: 'freshcart_analytics'
version: '1.0.0'
config-version: 2

# Which adapter-specific profile (from profiles.yml) this project uses
profile: 'freshcart'

# Where dbt looks for each type of resource, relative to the project root
model-paths: ['models']
seed-paths: ['seeds']
test-paths: ['tests']
macro-paths: ['macros']
snapshot-paths: ['snapshots']
analysis-paths: ['analyses']

# Directories dbt is allowed to delete when you run \`dbt clean\`
clean-targets:
  - 'target'
  - 'dbt_packages'

# Default materialization settings, applied per directory inside models/
# These are defaults — any individual model can override them with its
# own config({...}) block, which always wins over what's set here.
models:
  freshcart_analytics:
    staging:
      +materialized: view
    marts:
      +materialized: table
      finance:
        +materialized: table
        +tags: ['finance']`}
        </CodeBox>

        <Para>
          Two fields deserve extra attention because they trip people up
          constantly. <code>name</code> is your project's internal
          identifier — it is also the top-level key you use inside the
          <code>models:</code> block to scope configuration to this project
          (notice <code>freshcart_analytics</code> appears both at the top
          and nested under <code>models:</code> — that is not a coincidence,
          it has to match). <code>profile</code> is the name dbt looks up
          inside your separate <code>profiles.yml</code> file to find actual
          connection credentials — it is a pointer, not the credentials
          themselves.
        </Para>

        <Para>
          The <code>models:</code> block is where per-directory
          materialization defaults live. Here, anything under
          <code>models/staging/</code> defaults to a <code>view</code>, and
          anything under <code>models/marts/</code> defaults to a
          <code>table</code>, with a further override for
          <code>models/marts/finance/</code> that also tags those models.
          The <code>+</code> prefix on each config key is dbt's YAML
          convention for "this is a config setting being applied to
          everything at and below this path," not a literal part of the
          setting's name.
        </Para>

        <Callout title="One dbt_project.yml per project — always at the root" color={K}>
          You do not create <code>dbt_project.yml</code> by hand very often
          in practice — <code>dbt init</code> (Part 08) generates a starting
          one for you. But knowing what every field means matters the
          moment you need to change where models are stored, adjust a
          default materialization, or debug why dbt is picking up files
          from a directory you didn't expect.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — profiles.yml ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — profiles.yml" />
        <SectionTitle>profiles.yml — Credentials Live Outside the Project, On Purpose</SectionTitle>

        <Para>
          <code>dbt_project.yml</code> defines what your project looks
          like. It never contains a password, an account name, or a
          warehouse identifier. Those live in a completely separate file
          called <code>profiles.yml</code>, and critically, that file lives
          <strong> outside</strong> your project directory entirely — by
          default at <code>~/.dbt/profiles.yml</code>, in your home
          directory. This separation is deliberate: your dbt project gets
          committed to git and shared with your team, but your personal
          warehouse credentials should never end up in version control.
        </Para>

        <CodeBox label="~/.dbt/profiles.yml — a real snowflake profile with dev and prod targets">
{`freshcart:                              # matches \`profile: 'freshcart'\` in dbt_project.yml
  target: dev                           # which target below is used by default

  outputs:
    dev:
      type: snowflake
      account: fc12345.us-east-1
      user: asil_dev
      password: "{{ env_var('DBT_SNOWFLAKE_PASSWORD') }}"
      role: TRANSFORMER_DEV
      database: FRESHCART_DEV
      warehouse: TRANSFORMING_XS
      schema: dbt_asil                  # each developer gets their own schema
      threads: 4

    prod:
      type: snowflake
      account: fc12345.us-east-1
      user: svc_dbt_prod
      private_key_path: "{{ env_var('DBT_SNOWFLAKE_KEY_PATH') }}"
      role: TRANSFORMER_PROD
      database: FRESHCART_PROD
      warehouse: TRANSFORMING_L
      schema: analytics
      threads: 8`}
        </CodeBox>

        <Para>
          Notice the two targets, <code>dev</code> and <code>prod</code>,
          authenticate differently. The <code>dev</code> target uses a
          password pulled from an environment variable via
          <code>env_var()</code> — never hardcoded in the file itself, even
          though the file lives outside git's reach anyway; defense in
          depth matters. The <code>prod</code> target uses a private key
          file instead of a password, which is the more common pattern for
          a service account that runs scheduled production jobs rather than
          a human logging in interactively. Snowflake supports both, and
          which one you choose is a security and operations decision, not a
          dbt one.
        </Para>

        <Para>
          The <code>schema</code> field is worth calling out specifically:
          giving each developer their own schema (<code>dbt_asil</code>,
          <code>dbt_maria</code>, and so on) via the <code>dev</code> target
          means everyone can run <code>dbt run</code> against their own
          isolated copy of the models without stepping on each other's
          tables, while <code>prod</code> writes to the single shared
          <code>analytics</code> schema that actual dashboards query
          against.
        </Para>

        <Table
          headers={['Field', 'Purpose']}
          rows={[
            ['type', 'Which adapter to use for this profile — must match an installed adapter package'],
            ['account', 'Snowflake account identifier (region-specific, found in your Snowflake URL)'],
            ['user', 'The Snowflake username or service account dbt connects as'],
            ['password / private_key_path', 'One or the other, never both — how this user authenticates'],
            ['role', 'The Snowflake role dbt assumes, which determines what it is permitted to read/write'],
            ['database', 'The Snowflake database dbt writes objects into by default'],
            ['warehouse', 'The compute warehouse (the thing that costs money per second it runs) used to execute queries'],
            ['schema', 'The default schema dbt writes models into, absent per-model overrides'],
            ['threads', 'How many models dbt runs concurrently — higher means faster runs, bounded by warehouse concurrency limits'],
          ]}
        />

        <Callout title="Never commit profiles.yml" color="#ef4444">
          Because <code>profiles.yml</code> lives outside the project
          directory by default, it is naturally excluded from your project's
          git repository. If you ever see credentials hardcoded inside a
          file under version control — even a `.gitignore`'d one, since
          mistakes happen — treat it as a security incident, rotate the
          credential, and move the value to an environment variable
          referenced through <code>env_var()</code> instead.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — Standard folder structure ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Project Layout" />
        <SectionTitle>The Standard Folder Structure dbt Expects</SectionTitle>

        <Para>
          A dbt project has a small number of top-level directories, each
          with one clear job. You don't have to use all of them from day
          one, but every serious dbt project eventually does, and knowing
          what belongs where prevents a project from turning into a folder
          of miscellaneous SQL files with no organizing logic.
        </Para>

        <CodeBox label="a real dbt project's folder structure">
{`freshcart_analytics/
├── dbt_project.yml
├── packages.yml                  # third-party dbt packages this project depends on
├── models/                       # SELECT statements — the transformations themselves
│   ├── staging/
│   │   └── stg_orders.sql
│   ├── intermediate/
│   │   └── int_orders_joined.sql
│   └── marts/
│       └── fct_orders.sql
├── tests/                        # custom, singular data tests (not schema tests)
│   └── assert_positive_order_totals.sql
├── macros/                       # reusable Jinja functions, callable from any model
│   └── cents_to_dollars.sql
├── seeds/                        # small, static CSV files dbt loads as tables
│   └── country_codes.csv
├── snapshots/                    # slowly changing dimension history-tracking
│   └── snapshot_customers.sql
├── analyses/                     # ad-hoc SQL that dbt compiles but never runs
│   └── revenue_by_region_adhoc.sql
└── target/                       # dbt's generated output — never hand-edited, never committed`}
        </CodeBox>

        <Table
          headers={['Directory', 'What lives here', 'Executed by dbt run?']}
          rows={[
            ['models/', 'SELECT statements that become views or tables in your warehouse', 'Yes'],
            ['tests/', 'Custom singular SQL tests — a query that should return zero rows if everything is correct', 'No — run by `dbt test`'],
            ['macros/', 'Reusable Jinja/SQL functions callable from any model, using {% macro %}', 'Never directly — only when referenced from a model'],
            ['seeds/', 'Small, rarely-changing CSV files (lookup tables, mappings) dbt loads into the warehouse as tables', 'No — loaded by `dbt seed`'],
            ['snapshots/', 'Configuration for tracking how a mutable source table changes over time (type-2 SCD)', 'No — run by `dbt snapshot`'],
            ['analyses/', 'SQL you want dbt to compile (so it can use ref()/source()) but never actually run as a model', 'No — only compiled by `dbt compile`, never materialized'],
            ['target/', 'Compiled SQL, run artifacts, and manifest files dbt generates on every invocation', 'N/A — generated output, not source'],
          ]}
        />

        <Para>
          The distinction between <code>analyses/</code> and
          <code>models/</code> is one people frequently miss: a file in
          <code>analyses/</code> gets the full benefit of Jinja compilation
          — you can use <code>ref()</code>, <code>source()</code>, and
          macros inside it — but dbt never creates a table or view from it.
          It exists purely so you can write and version-control one-off
          exploratory or reporting queries using the same building blocks
          as your real models, without those queries becoming part of your
          actual DAG.
        </Para>

        <Callout title="target/ and dbt_packages/ do not belong in git" color={K}>
          Add both to your <code>.gitignore</code> immediately in a new
          project. <code>target/</code> is regenerated every time you run
          any dbt command, and <code>dbt_packages/</code> (created by
          <code>dbt deps</code>, covered in Part 06) is regenerated from
          <code>packages.yml</code> — committing either just bloats your
          repository with files nobody should ever hand-edit or diff.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Essential CLI commands ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Beyond dbt run" />
        <SectionTitle>The CLI Commands You Need Before You Ever Model Anything</SectionTitle>

        <Para>
          Most dbt tutorials jump straight to <code>dbt run</code>. But
          before you ever get a model to run successfully, a handful of
          other commands do the actual diagnostic and setup work — and
          you'll return to them constantly throughout the life of a real
          project, not just on day one.
        </Para>

        <SubTitle>dbt debug — is the connection even working?</SubTitle>

        <Para>
          <code>dbt debug</code> is the very first command to run in any
          new or unfamiliar project. It does not touch your models at all.
          It checks that <code>dbt_project.yml</code> is valid, that a
          matching profile exists in <code>profiles.yml</code>, and — most
          importantly — that dbt can actually open a connection to your
          warehouse using those credentials.
        </Para>

        <CodeBox label="dbt debug — output for a working connection">
{`$ dbt debug

dbt version: 1.8.3
python version: 3.11.6
python path: /Users/asil/dbt-env/bin/python3
os info: macOS-14.5-arm64

Using profiles.yml file at /Users/asil/.dbt/profiles.yml
Using dbt_project.yml file at /Users/asil/freshcart_analytics/dbt_project.yml

Configuration:
  profiles.yml file [OK found and valid]
  dbt_project.yml file [OK found and valid]

Required dependencies:
 - git [OK found]

Connection:
  account: fc12345.us-east-1
  user: asil_dev
  database: FRESHCART_DEV
  warehouse: TRANSFORMING_XS
  role: TRANSFORMER_DEV
  schema: dbt_asil
  Connection test: [OK connection ok]

All checks passed!`}
        </CodeBox>

        <Para>
          When a check fails, <code>dbt debug</code> tells you exactly
          which one — an invalid account identifier, a wrong password, a
          role that doesn't have USAGE on the target warehouse — instead of
          you discovering the same problem twenty minutes later as a cryptic
          error buried inside a full model run. Run it any time a new
          teammate sets up the project locally, any time credentials
          rotate, or any time a CI job starts failing for no obvious reason.
        </Para>

        <SubTitle>dbt deps — installing package dependencies</SubTitle>

        <Para>
          Many dbt projects depend on community packages — most commonly
          <code>dbt_utils</code> for generic helper macros. Package
          dependencies are declared in a separate <code>packages.yml</code>
          file at the project root, and <code>dbt deps</code> downloads them
          into the <code>dbt_packages/</code> directory.
        </Para>

        <CodeBox label="packages.yml and dbt deps">
{`# packages.yml — at the project root, alongside dbt_project.yml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]`}
        </CodeBox>

        <CodeBox label="running dbt deps">
{`$ dbt deps

Installing dbt-labs/dbt_utils
  Installed from version 1.1.1
  Up to date!

Installed 1 package(s) in 0.87s`}
        </CodeBox>

        <Callout title="Run dbt deps before dbt run on a fresh clone" color="#22c55e">
          <code>dbt_packages/</code> is gitignored (Part 05), so a teammate
          cloning the repository for the first time — or a fresh CI runner —
          has no packages installed at all. Any model referencing
          <code>dbt_utils.*</code> will fail with a "package not found"
          error until <code>dbt deps</code> has been run at least once.
        </Callout>

        <SubTitle>dbt build — run, test, seed, and snapshot together, in DAG order</SubTitle>

        <Para>
          <code>dbt run</code> only runs models. It does not run your tests,
          load your seeds, or apply your snapshots. In a real deployment you
          almost always want all four to happen together, and in the
          correct dependency order — a seed a model depends on loaded
          before that model runs, and tests for a model run immediately
          after that specific model builds, rather than only at the very
          end. <code>dbt build</code> does exactly this: it runs seeds,
          snapshots, models, and tests as one unified DAG.
        </Para>

        <CodeBox label="dbt run vs dbt build">
{`# Only runs models — seeds, snapshots, and tests are untouched
dbt run

# Runs seeds, snapshots, models, AND tests, interleaved by DAG dependency —
# a test on stg_orders runs right after stg_orders builds, not after
# the entire project finishes
dbt build`}
        </CodeBox>

        <Para>
          The practical benefit of <code>dbt build</code>'s interleaving is
          fail-fast behavior: if a test on an early staging model fails,
          <code>dbt build</code> stops that model's downstream dependents
          from building on top of bad data, rather than running your entire
          project first and only discovering the problem in a separate test
          pass at the very end. Most production dbt jobs use
          <code>dbt build</code>, not <code>dbt run</code>, for exactly this
          reason.
        </Para>

        <SubTitle>dbt clean — clearing generated and downloaded artifacts</SubTitle>

        <Para>
          <code>dbt clean</code> deletes the directories listed under
          <code>clean-targets</code> in <code>dbt_project.yml</code> —
          typically <code>target/</code> and <code>dbt_packages/</code>.
          It's a blunt reset button: useful when a stale compiled artifact
          or a corrupted package install is causing confusing behavior, and
          you want to force everything to regenerate from scratch on the
          next command.
        </Para>

        <Table
          headers={['Command', 'What it does', 'When to reach for it']}
          rows={[
            ['dbt debug', 'Validates project files and tests the warehouse connection — touches no models', 'First command in any new or unfamiliar project'],
            ['dbt deps', 'Downloads packages declared in packages.yml into dbt_packages/', 'After cloning a project, or after editing packages.yml'],
            ['dbt run', 'Executes models only, in dependency order', 'Quick iteration while actively developing models'],
            ['dbt test', 'Executes schema and singular tests only', 'Verifying data quality assumptions after models exist'],
            ['dbt build', 'Executes seeds, snapshots, models, and tests together, interleaved by DAG order', 'Scheduled production jobs — the command most teams actually automate'],
            ['dbt clean', 'Deletes target/ and dbt_packages/ (or whatever clean-targets lists)', 'Stale artifacts or corrupted package installs causing confusing errors'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 07 — dbt init and the first run ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — First Successful Run" />
        <SectionTitle>A Full Walkthrough — dbt init to Your First Successful dbt run</SectionTitle>

        <Para>
          Everything so far has been individual pieces. Here is the whole
          sequence, start to finish, for standing up a brand-new dbt
          project against a real Snowflake warehouse and getting a model to
          actually build.
        </Para>

        <CodeBox label="step 1 — dbt init generates the project skeleton">
{`$ dbt init freshcart_analytics

Running with dbt=1.8.3

Which database would you like to use?
[1] snowflake

Enter a number: 1

account (https://<this_value>.snowflakecomputing.com): fc12345.us-east-1
user (dev username): asil_dev
[1] password
[2] keypair
[3] sso
Desired authentication type option (enter a number): 1
password (dev password): ********
role (dev role): TRANSFORMER_DEV
warehouse (dev warehouse): TRANSFORMING_XS
database (dev database): FRESHCART_DEV
schema (dev schema): dbt_asil
threads (1 or more): 4

Profile freshcart_analytics written to /Users/asil/.dbt/profiles.yml
using target's profile_template.yml and your supplied values. Run 'dbt
debug' to validate the connection.

Your new dbt project "freshcart_analytics" was created!`}
        </CodeBox>

        <Para>
          <code>dbt init</code> does two things at once: it generates the
          standard project skeleton (Part 05's folder structure, plus a
          starter <code>dbt_project.yml</code>) in a new directory named
          after your project, and it interactively prompts for connection
          details, writing the result to <code>~/.dbt/profiles.yml</code>
          for you — you never have to hand-write your first
          <code>profiles.yml</code> from Part 04's template, though you will
          often go back and add a second target (like <code>prod</code>)
          by hand afterward.
        </Para>

        <CodeBox label="step 2 — move into the project and verify the connection">
{`$ cd freshcart_analytics
$ dbt debug

Connection test: [OK connection ok]
All checks passed!`}
        </CodeBox>

        <CodeBox label="step 3 — dbt init ships with one example model — run it">
{`$ dbt run

Running with dbt=1.8.3
Found 2 models, 0 tests, 0 sources, 0 exposures, 0 metrics

Concurrency: 4 threads (target='dev')

1 of 2 START sql view model dbt_asil.my_first_dbt_model ... [RUN]
1 of 2 OK created sql view model dbt_asil.my_first_dbt_model ... [SUCCESS 1 in 1.24s]
2 of 2 START sql view model dbt_asil.my_second_dbt_model .. [RUN]
2 of 2 OK created sql view model dbt_asil.my_second_dbt_model .. [SUCCESS 1 in 0.98s]

Finished running 2 view models in 0 hours 0 minutes and 3.41 seconds (3.41s).

Completed successfully

Done. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2`}
        </CodeBox>

        <Para>
          That first <code>dbt run</code> is the moment everything from
          Parts 01 through 06 comes together: dbt reads
          <code>dbt_project.yml</code> to find your models directory, reads
          <code>profiles.yml</code> to know which warehouse and schema to
          write to, compiles the two example <code>.sql</code> files dbt
          init generated for you into real <code>CREATE VIEW</code>
          statements, and executes them against
          <code>FRESHCART_DEV.dbt_asil</code>. If this succeeds, your
          environment is fully wired up and you are ready to delete the
          example models and start writing real ones — which is exactly
          where Module 04 picks up.
        </Para>

        <Callout title="If dbt run fails here, it's almost always Part 04" color={K}>
          A failure on this very first run is rarely a modeling problem —
          there's no real modeling happening yet. It's almost always a
          <code>profiles.yml</code> issue: wrong account identifier, a role
          without USAGE on the warehouse or database, or a schema the role
          isn't permitted to create objects in. Re-run <code>dbt debug</code>
          first; it will usually isolate the exact broken field faster than
          reading the full <code>dbt run</code> stack trace will.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Choosing between local dev, CI, and prod targets ───── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Targets in Practice" />
        <SectionTitle>Switching Between dev, CI, and prod Without Editing Files</SectionTitle>

        <Para>
          A profile can define any number of named targets — Part 04's
          example had <code>dev</code> and <code>prod</code>, but real
          projects often add a third, such as <code>ci</code>, pointing at a
          disposable schema used only by automated pull-request checks. You
          switch between them with the <code>--target</code> flag rather
          than editing <code>profiles.yml</code> every time.
        </Para>

        <CodeBox label="running against different targets from the same profile">
{`# Uses whichever target is listed as the default (target: dev) in profiles.yml
dbt run

# Explicitly overrides which target to use for this invocation only
dbt run --target prod

# In CI, environment variables typically supply a ci-specific target
dbt build --target ci`}
        </CodeBox>

        <Para>
          This is why <code>profiles.yml</code>'s structure — one profile
          name, many named targets underneath it — matters so much in
          practice: your models, tests, and macros never reference
          <code>dev</code> or <code>prod</code> directly. They just say
          <code>ref('stg_orders')</code>, and dbt resolves that to whichever
          database and schema the active target points at. The exact same
          project, unmodified, safely builds into a developer's personal
          sandbox, a CI throwaway schema, or the shared production schema,
          purely based on which target is active when the command runs.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — env vars and CI ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Environment Variables in CI" />
        <SectionTitle>Running dbt in CI Without a Human Ever Typing a Password</SectionTitle>

        <Para>
          Part 04's <code>profiles.yml</code> examples used
          <code>{'{{ env_var(\'DBT_SNOWFLAKE_PASSWORD\') }}'}</code> rather
          than a literal password string. That pattern is what makes it
          possible to run dbt inside an automated pipeline at all — a CI
          runner has no interactive human to type a password into a
          prompt, and it should not have a plaintext credential sitting in
          a file it checks out from git. Environment variables are the
          bridge between "a secret CI needs" and "a value dbt can read."
        </Para>

        <CodeBox label="a CI-friendly profiles.yml, generated once and reused everywhere">
{`freshcart:
  target: "{{ env_var('DBT_TARGET', 'dev') }}"
  outputs:
    dev:
      type: snowflake
      account: "{{ env_var('DBT_SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('DBT_SNOWFLAKE_USER') }}"
      password: "{{ env_var('DBT_SNOWFLAKE_PASSWORD') }}"
      role: "{{ env_var('DBT_SNOWFLAKE_ROLE') }}"
      database: "{{ env_var('DBT_SNOWFLAKE_DATABASE') }}"
      warehouse: "{{ env_var('DBT_SNOWFLAKE_WAREHOUSE') }}"
      schema: "{{ env_var('DBT_SNOWFLAKE_SCHEMA') }}"
      threads: 4`}
        </CodeBox>

        <Para>
          Notice this file itself contains zero secrets — every sensitive
          value is a reference to an environment variable that must exist
          wherever dbt runs. A developer's laptop sets these in a local
          shell profile or a <code>.env</code> file that is itself
          gitignored; a CI runner sets them as encrypted repository
          secrets that get injected into the job's environment right before
          the job runs, and never appear in logs.
        </Para>

        <CodeBox label="a github actions job setting those env vars from encrypted secrets">
{`# .github/workflows/dbt_ci.yml
name: dbt CI

on: pull_request

jobs:
  dbt-build:
    runs-on: ubuntu-latest
    env:
      DBT_TARGET: ci
      DBT_SNOWFLAKE_ACCOUNT: \${{ secrets.SNOWFLAKE_ACCOUNT }}
      DBT_SNOWFLAKE_USER: \${{ secrets.SNOWFLAKE_CI_USER }}
      DBT_SNOWFLAKE_PASSWORD: \${{ secrets.SNOWFLAKE_CI_PASSWORD }}
      DBT_SNOWFLAKE_ROLE: TRANSFORMER_CI
      DBT_SNOWFLAKE_DATABASE: FRESHCART_CI
      DBT_SNOWFLAKE_WAREHOUSE: TRANSFORMING_XS
      DBT_SNOWFLAKE_SCHEMA: ci_pr_\${{ github.event.pull_request.number }}
    steps:
      - uses: actions/checkout@v4
      - run: pip install dbt-snowflake==1.8.2
      - run: dbt deps
      - run: dbt build`}
        </CodeBox>

        <Para>
          One detail worth calling out: the schema is set to
          <code>ci_pr_&#123;pull request number&#125;</code>, giving every
          open pull request its own disposable schema to build into. This
          means two pull requests running CI at the same time never
          collide by writing to the same tables, and cleaning up old CI
          schemas becomes a simple, periodic job rather than a source of
          data corruption between concurrent runs.
        </Para>

        <Table
          headers={['Where dbt runs', 'How env vars typically get set', 'Secret storage']}
          rows={[
            ['Local developer machine', 'A shell profile (.zshrc, .bashrc) or a gitignored .env file loaded before running dbt', 'The developer\'s own machine, never shared'],
            ['GitHub Actions', 'Repository or environment secrets, injected as job-level env vars', 'GitHub\'s encrypted secrets store'],
            ['Airflow', 'A connection or variable configured in Airflow\'s own secrets backend, exported as env vars for the task', 'Airflow\'s configured secrets backend (often a cloud secrets manager)'],
            ['dbt Cloud', 'Environment variables configured directly in the dbt Cloud project settings UI', 'dbt Cloud\'s own encrypted storage — profiles.yml itself isn\'t used at all in dbt Cloud'],
          ]}
        />

        <Callout title="Never echo an env var containing a secret" color="#ef4444">
          A surprisingly common way secrets leak into CI logs is a debug
          step that prints environment variables to help troubleshoot a
          failing job — <code>echo $DBT_SNOWFLAKE_PASSWORD</code> or
          similar. CI logs are frequently visible to more people than the
          secret itself should be. If you need to confirm a variable is
          set, check its length or a redacted prefix, never its full value.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — packages.yml vs dependencies across projects ───────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Verifying a Project Is Healthy" />
        <SectionTitle>A Pre-Flight Checklist for a New or Inherited dbt Project</SectionTitle>

        <Para>
          Between the pieces covered so far — installation, project files,
          folder structure, credentials, and the CLI — it's easy to miss a
          step when either standing up a brand-new project or picking up
          an existing one you didn't build. Here is the order that catches
          the most common setup problems fastest, each step building on
          exactly what earlier Parts of this module covered.
        </Para>

        <CodeBox label="a practical pre-flight sequence for any dbt project">
{`# 1. Confirm the right adapter is installed for this warehouse (Part 02)
dbt --version
# check the "Plugins" section actually lists the expected adapter,
# e.g. snowflake, not just "Core" with no plugin listed

# 2. Confirm dbt_project.yml and profiles.yml agree, and the
#    connection genuinely works (Part 03, Part 04, Part 06)
dbt debug

# 3. Install any declared package dependencies (Part 06)
dbt deps

# 4. Compile without touching the warehouse, to catch Jinja/ref errors
#    early and cheaply, before spending any real compute (Part 06)
dbt compile

# 5. Only now, run the full project for real
dbt build`}
        </CodeBox>

        <Para>
          The reason to insert <code>dbt compile</code> before the first
          real <code>dbt build</code>, rather than jumping straight to it,
          is cost and diagnostic clarity: a Jinja typo, a missing
          <code>ref()</code> target, or a broken macro call shows up
          immediately in a fast, free compile step, rather than only
          surfacing after a slow, potentially expensive
          <code>dbt build</code> has already started executing SQL against
          real warehouse compute.
        </Para>

        <Table
          headers={['Symptom on an inherited project', 'Likely cause', 'Where the answer is']}
          rows={[
            ['dbt --version shows Core installed but no adapter plugin', 'Only dbt-core was installed, without a matching adapter package', 'Part 02'],
            ['dbt debug fails on "could not find profile"', 'The profile: value in dbt_project.yml doesn\'t match any top-level key in profiles.yml', 'Part 03 and Part 04'],
            ['A model references dbt_utils and fails to compile', 'dbt deps was never run, so dbt_packages/ is empty', 'Part 06'],
            ['dbt build fails immediately with a Jinja syntax error', 'Would have been caught for free by dbt compile first', 'Part 06 and this Part'],
            ['Local dbt run succeeds but CI fails on the same commit', 'CI environment is missing an expected environment variable, or is pointed at a different, misconfigured target', 'Part 09'],
          ]}
        />

        <Callout title="This checklist scales down, not just up" color={K}>
          Even on a project you built yourself, running this same sequence
          after a long break, after a dbt version upgrade, or right before
          a demo is a fast way to catch a broken environment before it
          becomes an embarrassing surprise — each step is cheap, and
          together they touch every file and setting introduced across this
          entire module.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Setting Up a dbt Project</SectionTitle>
        {[
          {
            wrong: '"dbt Cloud and dbt Core are different tools that model data differently"',
            right: 'Part 01 covers this directly — dbt Cloud runs the exact same dbt Core engine under the hood. The difference is entirely operational: who hosts the scheduler, the IDE, and the docs site, not how models compile or run.',
          },
          {
            wrong: '"profiles.yml should live inside the project folder next to dbt_project.yml"',
            right: 'Part 04 is explicit that profiles.yml lives outside the project by design, typically at ~/.dbt/profiles.yml, specifically so credentials never end up committed to a git repository shared with a team.',
          },
          {
            wrong: '"pip install dbt-core is enough to connect to any warehouse"',
            right: 'Part 02 shows the adapter pattern — dbt-core alone has no warehouse driver at all. You need the specific adapter package (dbt-snowflake, dbt-bigquery, etc.) for whichever warehouse you actually use.',
          },
          {
            wrong: '"dbt run is the command you should schedule in production"',
            right: 'Part 06 explains why most production jobs use dbt build instead — it runs seeds, snapshots, models, and tests together in correct DAG order, catching data quality failures before they cascade downstream, which dbt run alone does not do.',
          },
          {
            wrong: '"dbt_packages/ and target/ should be committed so teammates don\'t have to regenerate them"',
            right: 'Part 05 and Part 06 together explain why the opposite is true: both are fully regenerated by dbt deps and any dbt command respectively, and committing them just adds noise and staleness risk to version control.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World story ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Warby Parker:</strong> a new analytics engineer joins
            and clones the team's dbt repository. Their first
            <code>dbt run</code> fails immediately with a role permission
            error. Following Part 06's guidance, they run <code>dbt
            debug</code> first, which isolates the problem in seconds: their
            individually-provisioned Snowflake role has USAGE on the
            warehouse but not on the target database yet, because the
            account provisioning ticket hadn't fully propagated. A five
            minute wait and a re-run of <code>dbt debug</code> confirms the
            fix — no time wasted staring at a much longer, more confusing
            <code>dbt run</code> stack trace.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At JetBlue:</strong> the data platform team is deciding
            whether to adopt dbt Cloud or keep everything in dbt Core running
            through their existing Airflow deployment. Using Part 01's
            framing, they realize the actual open question isn't about
            model quality at all — both options run identical dbt Core
            under the hood. The real decision is whether they want to keep
            maintaining Airflow DAGs and a self-hosted docs site, or pay for
            dbt Cloud's built-in scheduler and hosted documentation instead.
            Because they already have a mature Airflow setup with alerting
            wired in, they stick with dbt Core.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In an interview:</strong> "Walk me through what happens
            when someone runs dbt init." The strong answer, drawing on
            Part 07, is not just "it creates some folders" — it's that
            dbt init does two distinct things: it scaffolds the standard
            project directory structure defined implicitly by dbt's
            conventions (Part 05), and it separately, interactively writes
            connection credentials into profiles.yml outside the project
            entirely (Part 04) — two different files, two different
            concerns, generated by one command for convenience.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ───────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the practical difference between dbt Core and dbt Cloud, and how would you decide between them for a new team?',
            a: `Per Part 01, they run the identical dbt Core engine underneath — the difference is entirely operational. dbt Core is the open-source CLI you install and run yourself, and you're responsible for scheduling it (Airflow, cron, GitHub Actions) and hosting your own documentation site. dbt Cloud wraps that same engine with a managed IDE, a built-in job scheduler, and automatically hosted docs, in exchange for a subscription cost.

I'd decide based on what the team already has, not on model quality — both options produce identical compiled SQL and identical warehouse behavior. If a team already has mature CI/CD and orchestration (Airflow, Dagster) with good alerting, dbt Core often adds no real friction and avoids a new subscription. If a team has no orchestration story yet and doesn't want to build one just to run scheduled transformations, dbt Cloud removes that problem entirely.`,
          },
          {
            q: 'Q2. Why does profiles.yml live outside the project directory, and what problem would happen if it didn\'t?',
            a: `Part 04 covers this directly. dbt_project.yml is meant to be committed to git and shared across the whole team — it defines project structure and default configuration with nothing sensitive in it. profiles.yml contains actual warehouse credentials: passwords, private key paths, account identifiers, roles. If it lived inside the project directory, it would either need to be committed (leaking credentials into git history, readable by anyone with repo access, including in old commits even after rotation) or carefully gitignored, which is fragile — one missed .gitignore entry and credentials are in a public or shared repository.

Keeping it entirely outside the project, by default at ~/.dbt/profiles.yml, removes that risk structurally rather than relying on someone remembering to gitignore it correctly every time. It also lets each developer have their own local profile with their own individual credentials and schema, without any of that being project-shared state at all.`,
          },
          {
            q: 'Q3. A new hire\'s dbt run fails on their very first attempt with a project they just cloned. What\'s your triage process?',
            a: `First, per Part 06, I'd have them run dbt debug before looking at the dbt run error at all — it isolates whether the problem is project file validity, profile validity, or the actual warehouse connection, in about two seconds, rather than parsing a potentially much longer and more confusing dbt run stack trace.

Second, per Part 06 as well, I'd check whether dbt deps has been run — if the project depends on packages like dbt_utils and dbt_packages/ was never populated (which it won't be on a fresh clone, since it's gitignored per Part 05), any model referencing those packages fails immediately with a clear "package not found" message.

Third, if dbt debug passes and dependencies are installed, the remaining likely cause per Part 07 is a permissions problem — the role in their profiles.yml target lacking USAGE on the warehouse, database, or schema, which is extremely common for a newly provisioned account whose permissions haven't fully propagated yet.`,
          },
          {
            q: 'Q4. Why do most production dbt jobs run dbt build instead of dbt run?',
            a: `Part 06 is the reference here. dbt run only executes models — it does not load seeds, apply snapshots, or run tests. In a real deployment you typically want all four of those things to happen together, and dbt build does that in one command, in correct DAG order, rather than requiring four separately-scheduled steps.

The more important benefit is the interleaving itself, not just convenience: dbt build runs a model's tests immediately after that specific model finishes building, and stops that model's downstream dependents from building on top of data that just failed a test. dbt run followed by a separate dbt test at the end would let the whole project build first, including models built on already-bad upstream data, before you ever find out something failed — dbt build catches it earlier and prevents that cascade.`,
          },
          {
            q: 'Q5. Explain the adapter pattern in dbt and why you need to know your warehouse before you pip install anything.',
            a: `Per Part 02, dbt-core itself has zero warehouse-specific connection logic built in — no Snowflake driver, no BigQuery client, nothing. Each warehouse is supported through a separate, warehouse-specific adapter package (dbt-snowflake, dbt-bigquery, dbt-redshift, dbt-postgres, and so on), and installing that adapter package pulls in dbt-core as a dependency automatically.

This means the very first decision on a new project is which warehouse you're targeting, because that determines which single pip install command you run — pip install dbt-core by itself gets you a working CLI that can parse dbt_project.yml and profiles.yml, but it has no way to actually execute SQL against any real database until the matching adapter is installed alongside it.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ──────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Setup Mistakes That Waste the Most Time</SectionTitle>
        {[
          {
            q: 'Running pip install dbt-core instead of installing the adapter package',
            a: 'Part 02 covers this — dbt-core alone has no warehouse driver at all. Install the adapter package for your specific warehouse (dbt-snowflake, dbt-bigquery, etc.), which pulls in dbt-core automatically as a dependency.',
          },
          {
            q: 'Hardcoding a password directly inside profiles.yml instead of using env_var()',
            a: 'Even though profiles.yml lives outside the git repository by default per Part 04, hardcoding secrets is still a bad habit — it means the credential is exposed to anything else with filesystem access, and it breaks the moment that file needs to be shared or backed up for any reason. Reference secrets through env_var() instead.',
          },
          {
            q: 'Skipping dbt debug and reading the dbt run stack trace to diagnose a connection issue',
            a: 'Part 06 and Part 07 both point at dbt debug as the fastest diagnostic — it isolates exactly which layer failed (project file validity, profile validity, or the live connection itself) far faster than parsing a full model-run error.',
          },
          {
            q: 'Forgetting to run dbt deps after cloning a project that uses packages like dbt_utils',
            a: 'Part 05 explains why this happens: dbt_packages/ is correctly gitignored, so it simply does not exist on a fresh clone until dbt deps is run once to populate it.',
          },
          {
            q: 'Scheduling dbt run in production instead of dbt build',
            a: 'Part 06\'s comparison table is the reference — dbt run skips seeds, snapshots, and tests entirely, and without dbt build\'s DAG-interleaved test execution, a broken upstream model can silently propagate bad data to everything downstream of it before anyone notices.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `Running any dbt command fails with "Runtime Error - Could not find profile named 'freshcart'"`,
            cause: 'The profile field inside dbt_project.yml does not match the top-level key of any profile defined in profiles.yml — often because profiles.yml was hand-edited or copied from another project and the name was never updated to match.',
            fix: 'Open both files side by side and confirm the profile: value in dbt_project.yml exactly matches a top-level key in profiles.yml, per Part 03 and Part 04. Names must match exactly, including case.',
          },
          {
            error: `dbt run fails with "Database Error - Object 'FRESHCART_DEV.DBT_ASIL.STG_ORDERS' does not exist or not authorized"`,
            cause: 'The connecting role does not have sufficient privileges on the target database or schema — commonly a newly provisioned role that has USAGE on the warehouse but not CREATE privileges on the schema dbt is trying to write into, per Part 04\'s profile fields.',
            fix: 'Run dbt debug first to confirm the connection itself succeeds (per Part 06) — if it does, the issue is almost always a missing grant. Ask whoever manages Snowflake roles to grant CREATE TABLE/VIEW on the target schema to the role in question.',
          },
          {
            error: `A model referencing {{ dbt_utils.generate_surrogate_key(...) }} fails with "Compilation Error - 'dbt_utils' is undefined"`,
            cause: 'The dbt_utils package is declared in packages.yml but was never actually installed — this is the standard state of a project immediately after a fresh git clone, since dbt_packages/ is gitignored per Part 05.',
            fix: 'Run dbt deps once to populate dbt_packages/ from packages.yml, per Part 06, then re-run the model. This is the single most common first-time setup error on any project using community packages.',
          },
          {
            error: `dbt init hangs or fails partway through the interactive prompts when run inside a CI pipeline`,
            cause: 'dbt init is an interactive command by design — it expects a human typing answers into a terminal. CI runners have no interactive terminal attached, so the prompts have nothing to read input from.',
            fix: 'Never run dbt init in CI. CI environments should have a pre-written profiles.yml (or environment-variable-driven equivalent) already in place; dbt init is strictly a one-time, local, human-run setup step, per Part 07.',
          },
          {
            error: `dbt build stops partway through with "PASS=6 WARN=0 ERROR=1 SKIP=3 TOTAL=10" and several models never ran`,
            cause: 'One model\'s test failed, and every downstream model that depends on it (directly or transitively through ref()) was correctly skipped rather than built on top of data that just failed a quality check — this is dbt build\'s DAG-aware fail-fast behavior from Part 06 working as intended, not a bug.',
            fix: 'Look at the specific ERROR line to find which test failed and on which model, fix the underlying data or model logic, and re-run dbt build — the skipped models will build normally once the upstream failure is resolved.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'dbt Core and dbt Cloud run the identical underlying engine — the difference is entirely operational: who hosts the scheduler, the IDE, and the documentation site, not how models compile or execute.',
          'dbt_project.yml lives at the project root and defines structure and default materializations; profiles.yml lives outside the project entirely (typically ~/.dbt/profiles.yml) and holds actual warehouse credentials, kept separate so secrets never enter version control.',
          'dbt uses an adapter pattern — one package per warehouse (dbt-snowflake, dbt-bigquery, dbt-redshift, etc.) — and installing the adapter automatically installs dbt-core as a dependency.',
          'dbt debug should be the first command run in any new or unfamiliar project; it validates project files and the live warehouse connection without touching a single model.',
          'dbt build, not dbt run, is what most production jobs actually schedule — it runs seeds, snapshots, models, and tests together in DAG order, stopping bad data from cascading downstream when a test fails partway through.',
          'dbt init scaffolds the standard folder structure and interactively writes your first profiles.yml, but it is a one-time, human-run local setup step — never run it inside CI.',
        ]}
      />
    </LearnLayout>
  )
}
