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

export default function VariablesAndEnvironments() {
  return (
    <LearnLayout
      title="Variables and Environments"
      description="The dev/staging/prod pattern, the target context variable, vars in dbt_project.yml versus --vars on the CLI, var() defaults, env_var() for secrets, the real difference between vars and env_var, and custom per-environment schema naming."
      section="dbt — Module 14"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Variables and Environments', href: '/learn/dbt/variables-and-environments' },
      ]}
      prev={{ title: 'Snapshots: Type 2 Slowly Changing Dimensions', href: '/learn/dbt/snapshots' }}
      next={{ title: 'Hooks and Operations', href: '/learn/dbt/hooks-and-operations' }}
    >
      {/* ── Part 01 — Why environments exist ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem Environments Solve" />
        <SectionTitle>The Same Code Must Run Safely in More Than One Place</SectionTitle>

        <Para>
          Every real dbt project eventually needs to run in more than one place: a developer iterating on
          their laptop, a continuous integration job validating a pull request, and a scheduled production
          job that stakeholders actually depend on for real numbers. All three of these need to run
          essentially the same dbt project code — the same models, the same tests, the same macros — but
          they absolutely cannot all point at the same database, schema, or warehouse. A developer testing a
          risky change to a core model should never be able to accidentally overwrite the production
          <code>fct_orders</code> table that a live dashboard queries every morning.
        </Para>

        <Para>
          The standard pattern for solving this is a small set of named environments — conventionally
          <code>dev</code>, <code>staging</code> (sometimes called <code>ci</code>), and <code>prod</code> —
          each pointing at a different database, schema, or warehouse, while running the exact same project
          code. The project itself does not need a different copy per environment. What changes between
          environments is <em>where</em> that code's output lands, and in some cases, small pieces of
          behavior that legitimately need to differ by environment — a lower row limit while iterating in
          dev, for instance.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The rule this whole module supports:</strong> never test against production data by
            accident. A developer should be free to run <code>dbt run</code> repeatedly while iterating on a
            model, drop and rebuild tables, and even get something badly wrong, without any risk of touching
            what a real stakeholder is looking at in a live dashboard. Environments are the mechanism that
            makes this true by construction, rather than by discipline or convention alone.
          </Para>
        </HighlightBox>

        <Para>
          dbt implements this environment pattern through <strong>profiles</strong> and <strong>targets</strong>.
          A <code>profiles.yml</code> file (kept outside the dbt project itself, usually in
          <code>~/.dbt/profiles.yml</code> locally, or configured directly in dbt Cloud) defines one or more
          named targets under a profile — each target specifying its own database connection details:
          account, warehouse, database, schema, and credentials. Which target is active for a given
          invocation of dbt is what actually determines whether you are running against dev, staging, or
          prod — the project's SQL files themselves never hardcode any of this.
        </Para>

        <CodeBox label="~/.dbt/profiles.yml — one profile, three targets">
{`freshmart:
  target: dev
  outputs:

    dev:
      type: snowflake
      account: freshmart_account
      user: "{{ env_var('DBT_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer
      database: analytics_dev
      warehouse: dev_wh
      schema: dbt_jsmith
      threads: 4

    staging:
      type: snowflake
      account: freshmart_account
      user: "{{ env_var('DBT_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer
      database: analytics_staging
      warehouse: ci_wh
      schema: dbt_ci
      threads: 8

    prod:
      type: snowflake
      account: freshmart_account
      user: "{{ env_var('DBT_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer
      database: analytics_prod
      warehouse: prod_wh
      schema: analytics
      threads: 16`}
        </CodeBox>

        <Para>
          Every field that differs between these three targets — the database, the warehouse, the schema,
          even the thread count for parallelism — is exactly the kind of thing that should never be
          hardcoded inside a model's SQL. A model file that says <code>select * from analytics_prod.raw.orders</code>
          has broken this entire pattern, because now that model can only ever run against production,
          regardless of which target is actually active. dbt's <code>source()</code> and <code>ref()</code>
          functions exist precisely so a model never needs to know which database or schema it is running
          against — that decision is made entirely by which target is active, external to the model's SQL.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — target context variable ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The target Variable" />
        <SectionTitle>target.name: Letting Model Logic Know Which Environment Is Running</SectionTitle>

        <Para>
          Most of the time, a model should not need to know or care which target is active — that is the
          whole point of using <code>ref()</code> and <code>source()</code> instead of hardcoded table names.
          But there are legitimate cases where a model or macro's behavior genuinely needs to branch based on
          environment, and dbt exposes this through a built-in Jinja context variable called
          <code>target</code>, with <code>target.name</code> giving you the name of the currently active
          target as a plain string — <code>'dev'</code>, <code>'staging'</code>, or <code>'prod'</code>,
          matching whatever the target is actually named in <code>profiles.yml</code>.
        </Para>

        <SubTitle>The classic use case: limiting data volume in dev for faster iteration</SubTitle>

        <Para>
          A common and genuinely useful pattern is limiting how much data a model processes while a developer
          is iterating locally, since running a full historical transformation over years of production data
          on every save-and-rerun cycle is slow and usually unnecessary for checking whether the SQL logic
          itself is correct.
        </Para>

        <CodeBox label="models/staging/stg_orders.sql — a dev-only row limit">
{`select
    order_id,
    customer_id,
    order_status,
    order_total,
    ordered_at
from {{ source('app_db', 'orders') }}

{% if target.name == 'dev' %}
  -- Only look at the last 3 days of data while iterating locally --
  -- keeps local runs fast without changing the model's logic at all
  where ordered_at >= dateadd('day', -3, current_timestamp())
{% endif %}`}
        </CodeBox>

        <Para>
          Notice precisely what this does and does not do: it does not change what the model computes for
          staging or prod at all — the <code>{'{% if %}'}</code> block is entirely absent from the compiled
          SQL in those environments, and the model runs over the full source data exactly as it would without
          this conditional. Only in <code>dev</code> does the extra <code>WHERE</code> clause get compiled
          in, cutting the volume down dramatically for a faster local development loop.
        </Para>

        <Table
          headers={['target attribute', 'What it gives you']}
          rows={[
            ['target.name', 'The active target\'s name as a string — \'dev\', \'staging\', \'prod\', or whatever your profiles.yml calls it.'],
            ['target.schema', 'The schema configured for the active target — useful for macros that need to reference the schema dynamically rather than hardcoding it.'],
            ['target.database', 'The database configured for the active target.'],
            ['target.type', 'The adapter type of the active target — \'snowflake\', \'bigquery\', \'postgres\', and so on — occasionally useful for a macro that needs to branch on warehouse-specific SQL syntax.'],
          ]}
        />

        <Callout title="target branches on environment identity, not on arbitrary configuration" color={K}>
          <code>target.name</code> tells you which named target is running — a proxy for "which environment
          is this." It is not a general-purpose configuration mechanism for arbitrary values you want to pass
          into a run; that job belongs to <code>vars</code>, covered next in Part 03. Reach for
          <code>target.name</code> specifically when the thing that needs to change really is "which
          environment am I in," not "what value did someone pass in for this run."
        </Callout>

        <SubTitle>A second common pattern: environment-specific materialization</SubTitle>

        <Para>
          Some teams also use <code>target.name</code> to make a model materialize as a lightweight view in
          dev (fast to create, cheap to throw away and recreate) but as a full table in prod (where query
          performance for downstream consumers matters more than build speed).
        </Para>

        <CodeBox label="Conditionally choosing a materialization by environment">
{`{{
    config(
        materialized = 'table' if target.name == 'prod' else 'view'
    )
}}

select
    customer_id,
    sum(order_total) as lifetime_value
from {{ ref('fct_orders') }}
group by 1`}
        </CodeBox>

        <Para>
          This keeps local development fast — a view compiles nearly instantly and always reflects the latest
          upstream logic without a rebuild — while ensuring the version stakeholders actually query in
          production gets the query-performance benefits of a materialized table.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — vars in dbt_project.yml and --vars ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Project and Run-Level Variables" />
        <SectionTitle>vars: in dbt_project.yml, and --vars on the Command Line</SectionTitle>

        <Para>
          Where <code>target.name</code> is specifically about environment identity, dbt <code>vars</code>
          are a general-purpose mechanism for passing configuration values into models and macros — values
          that are not secrets, and are not tied to which environment is running, but that still need to be
          configurable without editing SQL. A project-level default is set in <code>dbt_project.yml</code>
          under a top-level <code>vars:</code> key, and any individual invocation of dbt can override that
          default for just that one run using the <code>--vars</code> command-line flag.
        </Para>

        <CodeBox label="dbt_project.yml — project-level defaults">
{`name: 'freshmart'
version: '1.0.0'
config-version: 2

vars:
  start_date: '2020-01-01'
  payment_methods: ['credit_card', 'paypal', 'gift_card', 'bank_transfer']
  enable_new_discount_logic: false`}
        </CodeBox>

        <Para>
          Inside a model or macro, these values are read with the <code>var()</code> Jinja function, which
          takes the variable's name and, critically, an optional second argument giving a default value to
          fall back on if the variable is not set anywhere at all — not in <code>dbt_project.yml</code>, and
          not overridden via <code>--vars</code>.
        </Para>

        <CodeBox label="Reading a var with a safe default">
{`select
    order_id,
    customer_id,
    order_total,
    ordered_at
from {{ ref('stg_orders') }}
where ordered_at >= '{{ var("start_date", "2000-01-01") }}'`}
        </CodeBox>

        <Para>
          Overriding <code>start_date</code> for one specific run, without touching
          <code>dbt_project.yml</code> at all, is done with <code>--vars</code> on the command line, passed
          as an inline YAML dictionary:
        </Para>

        <CodeBox label="Overriding a var for a single invocation">
{`dbt run --select stg_orders --vars '{"start_date": "2024-06-01"}'`}
        </CodeBox>

        <Para>
          This is genuinely useful for a one-off backfill or a targeted re-run without permanently changing
          the project's default behavior for every other invocation — the override in <code>--vars</code>
          only applies to that specific command, and the next ordinary <code>dbt run</code> falls back to
          whatever <code>dbt_project.yml</code> declares.
        </Para>

        <Table
          headers={['Precedence (highest wins)', 'Source']}
          rows={[
            ['1. --vars on the CLI', 'Applies only to that one invocation of dbt; overrides everything else for that run.'],
            ['2. vars: in dbt_project.yml', 'The project-wide default, used whenever --vars does not override it.'],
            ['3. The default argument to var()', 'Only used if the variable is not set in either of the above — the last-resort fallback.'],
          ]}
        />

        <SubTitle>Why the default argument to var() matters more than it looks</SubTitle>

        <Para>
          Calling <code>var(&quot;start_date&quot;)</code> with no second argument at all will raise a
          compilation error the moment <code>start_date</code> is not defined anywhere — which is exactly the
          right behavior for a variable that a model genuinely cannot run correctly without. But for anything
          where a sensible fallback exists, providing a default is what keeps a model safe to run in a
          context where nobody thought to set that variable at all — a new CI job that doesn't know about
          every var a mature project has accumulated, or a teammate running a model locally for the first
          time without a fully populated <code>dbt_project.yml</code> in front of them.
        </Para>

        <CodeBox label="A boolean feature-flag var, with a safe default">
{`{% if var('enable_new_discount_logic', false) %}
  -- new promotional discount stacking rules
  case
    when d.discount_type = 'stacked' then d.discount_amount * 1.1
    else d.discount_amount
  end as final_discount_amount
{% else %}
  d.discount_amount as final_discount_amount
{% endif %}`}
        </CodeBox>

        <Para>
          Defaulting <code>enable_new_discount_logic</code> to <code>false</code> means any invocation of dbt
          that doesn't explicitly opt in — an unrelated CI job, an old scheduled run definition nobody has
          updated yet — gets the safe, existing behavior rather than accidentally picking up unfinished new
          logic simply because nobody remembered to set the flag for that particular run.
        </Para>

        <Callout title="vars are for project configuration, not secrets" color={K}>
          A <code>vars:</code> value lives in <code>dbt_project.yml</code>, which is ordinary, committed
          source code — visible to anyone with repository access, and to anyone browsing the project's git
          history. Never put a password, API key, or any other credential in a <code>vars:</code> block. That
          is exactly the job Part 04's <code>env_var()</code> exists for.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — env_var() ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — env_var() for Secrets and Infrastructure" />
        <SectionTitle>env_var(): Reading Real Operating-System Environment Variables</SectionTitle>

        <Para>
          <code>env_var()</code> is a completely different mechanism from <code>var()</code>, even though the
          names look similar. <code>env_var()</code> reads an actual operating-system-level environment
          variable — something set outside of dbt entirely, by your shell, your CI system's secrets manager,
          or your orchestration tool — rather than anything declared inside the dbt project's own YAML files.
          This makes it the correct tool for exactly one job: getting secrets and infrastructure-specific
          values into dbt without ever committing them to source control.
        </Para>

        <CodeBox label="profiles.yml — using env_var() to keep credentials out of the file entirely">
{`freshmart:
  target: prod
  outputs:
    prod:
      type: snowflake
      account: freshmart_account
      user: "{{ env_var('DBT_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role: transformer
      database: analytics_prod
      warehouse: prod_wh
      schema: analytics
      threads: 16`}
        </CodeBox>

        <Para>
          Nowhere in this file is an actual password. <code>{"{{ env_var('SNOWFLAKE_PASSWORD') }}"}</code>
          tells dbt to look up an environment variable literally named <code>SNOWFLAKE_PASSWORD</code> at run
          time, wherever dbt happens to be running — a developer's own shell (where they've exported it in
          their own local environment, never committed anywhere), or a CI system's secrets store injected as
          an environment variable just for that job's execution. The actual secret value never touches the
          dbt project's files at all, and <code>profiles.yml</code> stays safe to keep in version control (or
          is itself excluded from the repository entirely, which many teams also do as an extra layer of
          caution).
        </Para>

        <CodeBox label="Setting the environment variable before running dbt, locally">
{`export DBT_USER=jsmith
export SNOWFLAKE_PASSWORD=a-real-secret-value-never-committed

dbt run --target prod`}
        </CodeBox>

        <Para>
          <code>env_var()</code> also accepts an optional default value as a second argument, exactly like
          <code>var()</code> does — but reaching for a default here deserves more caution than it does with
          project <code>vars</code>. A default for a genuine secret like a password almost never makes sense
          (there is no safe fallback for a missing credential), whereas a default for a non-secret,
          infrastructure-level setting — a warehouse size, a target concurrency limit — can be perfectly
          reasonable.
        </Para>

        <CodeBox label="env_var() with a sensible non-secret default">
{`{{ env_var('SNOWFLAKE_WAREHOUSE_SIZE', 'X-SMALL') }}`}
        </CodeBox>

        <Callout title="If dbt Cloud or your CI runner errors that an env var is undefined, that is the point" color={K}>
          Unlike <code>var()</code> with no default, an undefined <code>env_var()</code> call with no default
          raising a hard, immediate error is a feature, not friction — for a secret or credential, failing
          loudly and immediately is dramatically preferable to silently falling back to some placeholder value
          and connecting to the wrong warehouse, or failing with a much more confusing downstream error.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — vars vs env_var, the real difference ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — vars vs env_var(), the Real Difference" />
        <SectionTitle>Two Mechanisms That Look Similar and Solve Different Problems</SectionTitle>

        <Para>
          Beginners very commonly conflate <code>vars</code> and <code>env_var()</code> because both are ways
          of getting an external value into a dbt run, and both have a similar-looking function-call syntax
          in Jinja. The actual distinction is about where the value lives and what kind of value it should
          ever be used for, and getting this wrong has real consequences — usually a secret ending up
          somewhere it should never be.
        </Para>

        <Table
          headers={['', 'vars / var()', 'env_var()']}
          rows={[
            ['Where the value is defined', 'Inside the dbt project itself — dbt_project.yml, or a --vars flag passed to the dbt command.', 'Outside the dbt project entirely — the operating system\'s environment, set by a shell, CI secrets manager, or orchestrator.'],
            ['Is it visible in version control?', 'Yes, by design — vars: in dbt_project.yml is committed source code, meant to be readable by anyone with repo access.', 'No — the actual value never appears in any file dbt reads from the repository; only the variable\'s name appears.'],
            ['What it should be used for', 'Project-level configuration: date ranges, feature flags, thresholds, lists of accepted values — anything that is fine for a teammate to read directly in the codebase.', 'Secrets and infrastructure specifics: passwords, API keys, account identifiers, anything that must never be committed.'],
            ['Overriding for one run', '--vars \'{"key": "value"}\' on the CLI, scoped to that single invocation.', 'Exporting the variable in the shell (or your CI job\'s secret injection) before invoking dbt — dbt itself has no CLI flag for this.'],
            ['Typical location it\'s used', 'Inside models, macros, and tests — anywhere ordinary project logic needs a configurable value.', 'Almost exclusively inside profiles.yml, and occasionally inside a macro that genuinely needs an infrastructure value like a warehouse name.'],
          ]}
        />

        <Callout title="A one-line test you can apply to any value" color={K}>
          Ask: &quot;would I be comfortable with every engineer on this project seeing this value directly in
          a pull request diff?&quot; If yes, it belongs in <code>vars</code>. If no — if it is a credential, a
          key, or anything that grants access to something — it belongs behind <code>env_var()</code>, full
          stop, with no exceptions made for convenience.
        </Callout>

        <Para>
          A subtler distinction worth internalizing: <code>vars</code> are dbt-native and dbt-aware — dbt
          itself resolves precedence between <code>dbt_project.yml</code> and <code>--vars</code>, and
          <code>var()</code> is a first-class part of the Jinja context dbt provides. <code>env_var()</code>,
          by contrast, is dbt's bridge out to something entirely outside of dbt's own configuration system —
          the operating system's process environment, which dbt neither controls nor validates beyond simply
          reading it. This is exactly why <code>env_var()</code> is the right (and really the only correct)
          tool for anything that must be managed by infrastructure and secrets tooling rather than by the dbt
          project's own configuration files.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — custom schema generation ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Per-Environment Schema Naming" />
        <SectionTitle>generate_schema_name: Sending Dev Runs to Per-Developer Schemas</SectionTitle>

        <Para>
          By default, when a model does not set an explicit <code>schema</code> config, dbt builds it into
          whatever schema is configured on the active target in <code>profiles.yml</code>. This is fine for
          prod, where everything landing cleanly in one shared, well-known schema is exactly what you want.
          It becomes a problem in dev the moment more than one developer is working against the same
          database: if every developer's target schema is the same, one developer's in-progress, possibly
          broken model can silently collide with — or overwrite — another developer's tables of the exact
          same name.
        </Para>

        <Para>
          The standard fix is a <strong>custom schema</strong> config on a model combined with overriding
          dbt's built-in <code>generate_schema_name</code> macro — the macro dbt actually calls, for every
          single model, to compute the schema it should build into. Overriding it project-wide lets you route
          dev runs into a per-developer schema (commonly named after the developer, like
          <code>dbt_jsmith</code>) while prod runs land in the clean, shared target schema with no suffix at
          all.
        </Para>

        <CodeBox label="macros/generate_schema_name.sql — the standard override pattern">
{`{% macro generate_schema_name(custom_schema_name, node) -%}

    {%- set default_schema = target.schema -%}

    {%- if target.name == 'prod' -%}

        {#- In prod, ignore any custom schema config entirely and always
            build into the clean target schema -#}
        {{ default_schema }}

    {%- else -%}

        {#- In dev and staging, build into a schema unique to this developer
            or run, so nobody's in-progress work collides with anyone else's -#}
        {{ default_schema }}_{{ target.name }}

    {%- endif -%}

{%- endmacro %}`}
        </CodeBox>

        <Para>
          With <code>target.schema</code> set to <code>dbt_jsmith</code> in one developer's own
          <code>dev</code> target (as configured back in Part 01's <code>profiles.yml</code>), and this
          override in place, that developer's models land in <code>dbt_jsmith_dev</code> — clearly separated
          from a teammate's own <code>dbt_asharma_dev</code> schema, and both entirely separate from
          <code>analytics</code>, the clean prod schema every dashboard actually queries.
        </Para>

        <Table
          headers={['Environment', 'target.schema (from profiles.yml)', 'Actual schema built into']}
          rows={[
            ['jsmith\'s dev', 'dbt_jsmith', 'dbt_jsmith_dev'],
            ['asharma\'s dev', 'dbt_asharma', 'dbt_asharma_dev'],
            ['staging / CI', 'dbt_ci', 'dbt_ci_staging'],
            ['prod', 'analytics', 'analytics (unchanged — prod branch skips the suffix entirely)'],
          ]}
        />

        <Para>
          This connects directly to the schema configuration options a model itself can set, covered in the
          materializations module — a model's own <code>schema:</code> config (via <code>custom_schema_name</code>
          in the macro above) can still request a specific sub-schema for organizational reasons, and this
          macro decides how that request is actually honored differently per environment, rather than
          replacing model-level schema configuration entirely.
        </Para>

        <Callout title="Why not just give every developer their own separate database instead?" color={K}>
          Some teams do exactly that, and it works too — a fully separate database per developer is an even
          stronger isolation boundary than a per-developer schema within one shared dev database. The schema
          approach in this Part is the more common middle ground because it is cheaper to provision (schemas,
          unlike full databases, are usually free and instant to create in most warehouses) while still fully
          preventing the table-name collisions that are the actual problem being solved.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Putting it together ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Complete Worked Example" />
        <SectionTitle>The Same Codebase, Three Environments, What Actually Differs at Each Layer</SectionTitle>

        <Para>
          Bringing every mechanism in this module together: here is exactly what changes, and what stays
          identical, as the same dbt project runs across dev, CI, and prod for a fictional grocery-delivery
          company's order pipeline.
        </Para>

        <CodeBox label="dbt_project.yml — shared across every environment, never changes per environment">
{`name: 'freshmart'
version: '1.0.0'
config-version: 2

vars:
  start_date: '2020-01-01'
  payment_methods: ['credit_card', 'paypal', 'gift_card', 'bank_transfer']
  enable_new_discount_logic: false`}
        </CodeBox>

        <CodeBox label="models/staging/stg_orders.sql — one file, behaves differently only via target.name and var()">
{`select
    order_id,
    customer_id,
    order_status,
    order_total,
    ordered_at
from {{ source('app_db', 'orders') }}
where ordered_at >= '{{ var("start_date") }}'

{% if target.name == 'dev' %}
  and ordered_at >= dateadd('day', -3, current_timestamp())
{% endif %}`}
        </CodeBox>

        <Table
          headers={['Layer', 'dev', 'CI / staging', 'prod']}
          rows={[
            ['Which database/schema (Part 01, profiles.yml)', 'analytics_dev, schema dbt_jsmith', 'analytics_staging, schema dbt_ci', 'analytics_prod, schema analytics'],
            ['Row volume processed (Part 02, target.name)', 'Last 3 days only — fast local iteration', 'Full history — CI must validate against realistic volume', 'Full history — the real production dataset'],
            ['start_date used (Part 03, var())', '2020-01-01, unless a developer overrides via --vars for a specific test', '2020-01-01 — CI never overrides project defaults', '2020-01-01 — the trusted, unmodified project default'],
            ['Credentials (Part 04, env_var())', 'Developer\'s own exported SNOWFLAKE_PASSWORD, never committed', 'Injected by the CI system\'s secrets manager as a job-scoped env var', 'Injected by the orchestrator\'s secrets manager, a different credential than dev/CI use'],
            ['Actual schema built into (Part 06, generate_schema_name)', 'dbt_jsmith_dev — isolated per developer', 'dbt_ci_staging — isolated from any individual developer\'s work', 'analytics — the clean, shared schema every dashboard queries'],
            ['Feature flag (Part 03, enable_new_discount_logic)', 'Overridable per-run via --vars while testing new logic', 'False by default — CI validates existing behavior unless a PR explicitly overrides it', 'False — new logic only ships to prod once explicitly flipped after validation'],
          ]}
        />

        <Para>
          What is worth noticing across this whole table: not one line of any model's SQL had to change to
          get this behavior across three environments. Every difference is driven entirely by which target is
          active (<code>target.name</code>, <code>target.schema</code>), which variables are set at the
          project or CLI level (<code>var()</code>), and which secrets are present in the surrounding process
          environment (<code>env_var()</code>) — exactly the separation of concerns this module set out to
          build. A developer can run this exact codebase locally, break things repeatedly, and never once put
          production data or credentials at risk.
        </Para>

        <Callout title="This is what 'the same code, safely, everywhere' actually looks like in practice" color={K}>
          None of these mechanisms individually is complicated. What makes the pattern work is using each one
          for exactly the job it is meant for — target.name for environment identity, vars for project
          configuration, env_var() for secrets — rather than reaching for whichever one happens to be
          familiar and stretching it to cover a job it was not designed for.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — dbt Cloud environment variables ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — dbt Cloud Environment Variables" />
        <SectionTitle>How env_var() Maps Onto dbt Cloud's Environments and Jobs UI</SectionTitle>

        <Para>
          Everything in Part 04 assumed <code>env_var()</code> reads a value set some external way — a
          shell export, a CI secrets manager. Teams running on dbt Cloud instead of self-hosted orchestration
          get a purpose-built version of exactly that mechanism: an <strong>Environment Variables</strong>
          panel in the dbt Cloud project settings, where a variable's name and value are entered directly in
          the UI, then read inside the project with the exact same <code>{"{{ env_var('...') }}"}</code>
          call covered in Part 04. Nothing about how a model or <code>profiles.yml</code> reads the value
          changes — what changes is where the value is set and who can see it.
        </Para>

        <Table
          headers={['Aspect', 'dbt Cloud environment variable']}
          rows={[
            ['Where it is set', 'Project Settings → Environment Variables in the dbt Cloud UI, not a shell or a CI YAML file.'],
            ['Scoping', 'Set once per environment (Development, Staging, Production) — dbt Cloud automatically resolves the correct value for whichever environment a given job is running in.'],
            ['Read inside the project', "Identical to any other env_var() call — env_var('SNOWFLAKE_ACCOUNT') looks exactly the same whether it came from dbt Cloud's UI or a self-hosted CI secret."],
            ['Visibility', "A variable's value is never shown in job logs or the compiled SQL preview once it is designated as a secret — see the naming convention below."],
          ]}
        />

        <Para>
          The one dbt-Cloud-specific convention worth knowing: prefixing a variable's name with
          <code>DBT_ENV_SECRET_</code> tells dbt Cloud to treat its value as sensitive — it is redacted from
          run logs and from any compiled SQL shown in the UI, even in contexts where compiled SQL is normally
          visible for debugging. A variable without that prefix is still only settable by someone with
          project-admin access, but its value is not specially redacted from logs, so it is the wrong place
          for an actual credential.
        </Para>

        <CodeBox label="Referencing a dbt Cloud environment variable from profiles.yml-equivalent connection config">
{`-- dbt Cloud manages the underlying profiles.yml equivalent for you when
-- you connect a warehouse through its UI, but a var referenced in project
-- code (e.g. inside a macro building a connection string, or a seed
-- config) uses the identical syntax as any other env_var() call:

{{ env_var('DBT_ENV_SECRET_SNOWFLAKE_PASSWORD') }}

-- Set in dbt Cloud's Project Settings → Environment Variables, scoped to
-- the Production environment specifically -- a Development-environment
-- job reading the same variable name gets whatever value was set for
-- Development instead, without any change to the project's own code.`}
        </CodeBox>

        <Para>
          This gives dbt Cloud projects the same dev/staging/prod separation this whole module has been
          building toward, but configured through a UI instead of separate <code>profiles.yml</code> targets
          and shell exports — the same <code>target.name</code>-driven branching in Part 02 and the same
          <code>env_var()</code> secret-handling discipline in Part 04 still apply underneath; only the
          mechanism for actually setting the values differs.
        </Para>

        <Callout title="A default value set in the UI still behaves like var()'s default argument" color={K}>
          dbt Cloud lets a project-level environment variable carry a default value alongside its
          per-environment overrides. This mirrors the same principle from Part 03's <code>var()</code>
          default: a sensible fallback keeps a job from failing outright if a specific environment forgot to
          set an override, while a genuine secret should still have no meaningful default at all, exactly as
          Part 04 argues for <code>env_var()</code> generally.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Slim CI ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Slim CI with --defer and --state" />
        <SectionTitle>Building Only What Changed: Comparing a PR's Models Against Production State</SectionTitle>

        <Para>
          Every mechanism so far in this module (targets, <code>vars</code>, <code>env_var()</code>,
          per-developer schemas) answers "how do dev, CI, and prod stay safely separate." This Part answers a
          related but distinct question that only comes up once a project has grown large: a CI job that
          rebuilds the <em>entire</em> project on every pull request, to validate even a one-line change to a
          single model, becomes slow and expensive in direct proportion to how big the project has gotten —
          exactly the same problem incremental models solve for a single table, but here the "table" is the
          whole CI run.
        </Para>

        <Para>
          <strong>Slim CI</strong> is the standard fix: instead of building every model from scratch in CI,
          dbt is told which models actually changed in this pull request, builds only those (plus whatever
          depends on them), and for everything else it silently reads straight from the equivalent object
          already sitting in the production schema — without rebuilding it, and without it ever leaving
          production. Two flags make this possible together: <code>--state</code>, which points dbt at a
          previous <code>manifest.json</code> (typically production's) to diff the current project against,
          and <code>--defer</code>, which tells dbt that any upstream model this PR does <em>not</em> rebuild
          should resolve its <code>{'{{ ref() }}'}</code> calls against that deferred manifest's already-built
          relations instead of failing because the CI schema never built them.
        </Para>

        <CodeBox label="A slim CI invocation — the actual command most teams run">
{`# 1. Pull production's manifest.json down as the comparison baseline
#    (dbt Cloud does this automatically for you; self-hosted CI needs an
#    explicit step to fetch the artifact from the last successful prod run)

dbt build \\
  --select state:modified+ \\
  --defer \\
  --state ./prod-manifest`}
        </CodeBox>

        <Para>
          Reading this command piece by piece: <code>state:modified+</code> is a selector meaning "every
          model whose compiled SQL, config, or referenced macros differ from the version recorded in
          <code>./prod-manifest</code>, plus everything downstream of those models" (the trailing
          <code>+</code> is the same graph operator used elsewhere in dbt's selector syntax). <code>--defer</code>
          tells dbt that any model <em>not</em> selected — meaning it is identical to production and does not
          need rebuilding — should have its <code>ref()</code> calls resolved against production's actual
          built relation from <code>--state</code>'s manifest, rather than an object that was never built in
          this CI run's own temporary schema at all.
        </Para>

        <Table
          headers={['Without slim CI', 'With slim CI (state:modified+ and --defer)']}
          rows={[
            ['A 400-model project rebuilds all 400 models in every PR\'s CI job.', 'Only the 3 models actually changed by this PR, plus their downstream dependents, get rebuilt.'],
            ['CI run time scales with total project size, regardless of PR size.', 'CI run time scales with how much a given PR actually touched — a one-line fix stays fast even in a huge project.'],
            ['Unchanged models still get rebuilt from source data in a throwaway CI schema.', 'Unchanged models are read directly from production\'s already-built, already-validated relation via --defer.'],
            ['A large project makes CI progressively slower and more expensive as it grows.', 'CI cost tracks PR size, not project size — the same asymmetry incremental models exploit for individual tables, applied to an entire CI run.'],
          ]}
        />

        <Para>
          This connects directly back to <code>target.name</code>-based branching from Part 02: a CI job
          using slim CI typically still runs against its own isolated <code>staging</code>/<code>ci</code>
          target and schema for the models it does rebuild — <code>--defer</code> only changes how
          <em>unselected</em> models are resolved, it does not mean CI writes into production. The two
          mechanisms compose: environment separation keeps CI's own writes isolated, while slim CI keeps CI
          from having to redundantly rebuild everything production already has correctly built.
        </Para>

        <Callout title="--defer reads production, it never writes to it" color={K}>
          A common early worry is that <code>--defer</code> somehow lets a CI job touch production data.
          It does not — deferral is strictly read-only: an unselected model's <code>ref()</code> resolves to
          production's relation purely so a selected, changed model further downstream in the same CI run has
          something real to join against. CI still only ever writes into its own isolated CI schema, exactly
          as Part 01 and Part 06 describe.
        </Callout>

        <Para>
          The one thing that makes slim CI actually work is having a trustworthy <code>manifest.json</code>
          to diff against in the first place — which is why dbt Cloud automatically stores the manifest from
          every successful production run specifically so the next CI job can compare against it, and why a
          self-hosted setup needs its own equivalent step (uploading the prod manifest as a build artifact
          after every successful production deploy, then downloading it at the start of the next CI job) for
          <code>--state</code> to have anything meaningful to point at.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — Profile resolution ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — How dbt Actually Finds and Resolves a Profile" />
        <SectionTitle>--profile, --target, and --profiles-dir: the Full Resolution Order</SectionTitle>

        <Para>
          Every earlier Part in this module assumed a single, obvious answer to "which target is active" —
          usually whatever <code>target:</code> defaults to in <code>profiles.yml</code>, per Part 01. In
          practice, several different flags and files can all influence that answer at once, and a project
          with more than one profile, or a CI system invoking dbt with explicit overrides, needs the actual
          resolution order to reason about which target a given invocation will use.
        </Para>

        <Table
          headers={['Precedence (highest wins)', 'What it sets', 'Typical source']}
          rows={[
            ['1. --target flag on the CLI', 'Overrides which target inside the active profile is used for this one invocation only.', 'dbt run --target prod, passed explicitly by a CI job or a developer doing a one-off prod-targeted check.'],
            ['2. target: in profiles.yml', "The profile's own declared default target, used when nothing above overrides it.", "The freshmart profile in Part 01's profiles.yml declaring target: dev as its default."],
            ['(No native env-var override)', "dbt-core has no built-in DBT_TARGET variable — an env var can only select a target if profiles.yml itself is written to read one via env_var(), e.g. target: \"{{ env_var('DBT_TARGET', 'dev') }}\".", 'A deliberate profiles.yml pattern, not automatic dbt behavior.'],
          ]}
        />

        <Para>
          A closely related but separate question is which <em>profile</em> (as opposed to which target
          within a profile) is active at all — relevant the moment more than one dbt project, or more than
          one named profile, exists on the same machine or in the same CI environment.
        </Para>

        <CodeBox label="dbt_project.yml declares which profile a project expects to use">
{`name: 'freshmart'
version: '1.0.0'
config-version: 2

profile: 'freshmart'   # must match a top-level key in profiles.yml

vars:
  start_date: '2020-01-01'`}
        </CodeBox>

        <Para>
          <code>profile: 'freshmart'</code> in <code>dbt_project.yml</code> tells dbt which top-level key to
          look up inside <code>profiles.yml</code> — the same <code>profiles.yml</code> shape shown back in
          Part 01, where <code>freshmart:</code> was the top-level key holding the <code>dev</code>,
          <code>staging</code>, and <code>prod</code> targets. This matters distinctly from
          <code>target</code>: <code>profile</code> selects <em>which company/project's whole set of
          targets</em> to use, while <code>target</code> selects <em>which one of that set's targets</em> is
          active. A monorepo running two separate dbt projects, or a consultant working across multiple
          clients' projects on one laptop, needs both dimensions resolved correctly and independently.
        </Para>

        <CodeBox label="--profile overrides dbt_project.yml's own profile: declaration, exactly like --target does for targets">
{`# Normally resolves via dbt_project.yml's profile: 'freshmart' declaration:
dbt run

# Explicitly override which profile's targets to use for this invocation,
# without editing dbt_project.yml -- useful when testing a project against
# a differently-named profile temporarily:
dbt run --profile freshmart_sandbox --target dev`}
        </CodeBox>

        <Para>
          Finally, <code>profiles.yml</code> itself has to be found somewhere on disk, and that location is
          resolved independently of both <code>profile</code> and <code>target</code>. By default dbt looks
          in <code>~/.dbt/profiles.yml</code>, but <code>--profiles-dir</code> (or the
          <code>DBT_PROFILES_DIR</code> environment variable) can point it anywhere else entirely — common in
          CI, where a job may write a freshly generated <code>profiles.yml</code> into a temporary,
          job-scoped directory rather than relying on a persistent home directory that might not even exist
          in an ephemeral container.
        </Para>

        <CodeBox label="A CI job assembling its own profiles.yml at a custom path, entirely from secrets">
{`mkdir -p /tmp/dbt_ci_profile

cat <<EOF > /tmp/dbt_ci_profile/profiles.yml
freshmart:
  target: staging
  outputs:
    staging:
      type: snowflake
      account: freshmart_account
      user: "\${SNOWFLAKE_CI_USER}"
      password: "\${SNOWFLAKE_CI_PASSWORD}"
      role: transformer
      database: analytics_staging
      warehouse: ci_wh
      schema: dbt_ci
      threads: 8
EOF

dbt run --profiles-dir /tmp/dbt_ci_profile`}
        </CodeBox>

        <Para>
          Assembling <code>profiles.yml</code> at run time from CI secrets like this, rather than committing
          any version of it to the repository at all, is a common pattern precisely because it keeps every
          connection detail — including ones that are not exactly "secret" but are still environment-specific,
          like <code>warehouse</code> or <code>schema</code> — entirely out of version control, generated
          fresh for each job from whatever the CI system's own secret store already holds.
        </Para>

        <Table
          headers={['Flag / setting', 'Controls', 'Where it typically comes from']}
          rows={[
            ['profile: in dbt_project.yml, or --profile', 'Which top-level profiles.yml entry (which company/project\'s full target set) is used.', 'Committed in dbt_project.yml for the normal case; --profile only for a deliberate one-off override.'],
['target: in profiles.yml, or --target', 'Which named target within the active profile (dev/staging/prod) is used.', 'profiles.yml default for local dev; --target explicitly passed by CI and deploy jobs.'],
            ['--profiles-dir or DBT_PROFILES_DIR', 'Which directory on disk dbt looks in for profiles.yml at all.', '~/.dbt/ by default for a developer; an ephemeral, job-scoped path in most CI systems.'],
          ]}
        />

        <Callout title="dbt debug shows you exactly what actually resolved, for any invocation" color={K}>
          Rather than reasoning through this precedence chain by hand for a confusing invocation, <code>dbt
          debug</code> prints the fully resolved profile, target, and connection details dbt actually settled
          on — which profiles.yml file it read, which profile and target it selected, and whether the
          resulting connection succeeds. It is the fastest way to confirm a suspicion like "is this CI job
          actually running against staging or did it silently fall back to something else."
        </Callout>

        <SubTitle>A worked resolution trace, end to end</SubTitle>

        <Para>
          Putting the whole chain together for one concrete invocation makes the precedence order concrete
          rather than abstract. Suppose a CI job runs the following, in a container that has no
          <code>~/.dbt/profiles.yml</code> at all, and whose generated <code>profiles.yml</code> declares
          <code>{`target: "{{ env_var('DBT_TARGET', 'dev') }}"`}</code> instead of a hardcoded target name:
        </Para>

        <CodeBox label="One invocation, fully resolved step by step">
{`DBT_TARGET=staging dbt run --profiles-dir /tmp/dbt_ci_profile

# Step 1 -- which profiles.yml does dbt read at all?
#   --profiles-dir was passed explicitly -> /tmp/dbt_ci_profile/profiles.yml
#   (the default ~/.dbt/profiles.yml is never even considered)
#
# Step 2 -- which profile (top-level key) inside that file?
#   No --profile flag was passed, so dbt falls back to dbt_project.yml's
#   own profile: 'freshmart' declaration
#
# Step 3 -- which target inside that profile?
#   No --target flag was passed. dbt itself has no built-in DBT_TARGET
#   variable, but THIS profiles.yml was deliberately written with
#   target: "{{ env_var('DBT_TARGET', 'dev') }}" -- so dbt resolves that
#   Jinja expression, reads DBT_TARGET=staging from the environment, and
#   the profile's own target: setting evaluates to 'staging'
#
# Resolved: profiles.yml at /tmp/dbt_ci_profile, profile 'freshmart',
# target 'staging' -- because this project chose to wire target: through
# env_var(), not because dbt reads DBT_TARGET automatically.`}
        </CodeBox>

        <Para>
          Every one of these three questions — which file, which profile, which target — is resolved
          completely independently of the other two, which is exactly why a confusing "why did this run
          against the wrong environment" incident is worth tracing through all three separately with
          <code>dbt debug</code> rather than assuming any one setting alone explains the outcome.
        </Para>

        <Callout title="Multiple profiles in one repository is a real, if less common, pattern" color="#38bdf8">
          A monorepo housing more than one dbt project — or a single project deliberately supporting more
          than one named profile for different purposes (e.g. a lightweight sandbox profile for local
          experimentation, distinct from the main team profile) — leans on exactly this same
          <code>profile:</code>/<code>--profile</code> distinction. Nothing about targets, vars, or
          env_var() changes in that setup; only which top-level profiles.yml entry supplies the target set
          in the first place.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Variables and Environments</SectionTitle>

        {[
          {
            wrong: '"vars and env_var() are basically interchangeable ways to pass a value into dbt"',
            right: 'They resolve values from completely different places and are meant for different kinds of value. vars are defined inside the dbt project itself (dbt_project.yml, or --vars) and are visible in version control — appropriate for project configuration. env_var() reads an actual operating-system environment variable set outside the project entirely, and is the only correct place for secrets and credentials (Part 03, Part 04, Part 05).',
          },
          {
            wrong: '"A password can go in vars: in dbt_project.yml as long as the repo is private"',
            right: 'A private repository is not a secrets manager — anyone with any level of repo access, including CI logs, forks, or a future access grant, would see it, and it stays permanently in git history even if removed later. Credentials belong exclusively behind env_var(), read from a real secrets manager or CI-injected environment variable, never committed as plain YAML (Part 04, Part 05).',
          },
          {
            wrong: '"target.name is just another variable, similar to var()"',
            right: 'target.name specifically identifies which named environment (profiles.yml target) is currently active — it is not a general configuration mechanism. Reach for target.name when logic genuinely needs to branch on environment identity; reach for var() when you need a configurable project value unrelated to which environment is running (Part 02, Part 03).',
          },
          {
            wrong: '"Every developer sharing the same dev database and schema is fine as long as they communicate"',
            right: 'Relying on communication to avoid table-name collisions does not scale and fails silently the moment it does not happen — one developer\'s broken in-progress model can overwrite another\'s tables of the same name. The generate_schema_name override in Part 06 solves this structurally, routing each developer into their own schema automatically, with no coordination required.',
          },
          {
            wrong: '"var() should always be called without a default, so missing configuration fails loudly"',
            right: 'That is the right call only for a variable a model truly cannot run correctly without. For anything with a sensible fallback, omitting the default just means any run that doesn\'t happen to set that variable — a new CI job, a teammate\'s first local run — breaks unnecessarily. Providing a default via var(\'name\', default) is what keeps a project resilient to incomplete configuration in exactly the contexts where that matters most (Part 03).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At HubSpot:</strong> a new data engineer's first pull request accidentally hardcodes a
            reference to <code>analytics_prod.raw.contacts</code> directly inside a model, instead of using
            <code>source()</code>. It works fine on their laptop because their personal credentials happen to
            have read access to prod for an unrelated reason, and nobody notices in code review at a glance.
            The fix, once caught, is not just removing the hardcoded reference — it is confirming the model
            uses <code>source()</code> and <code>ref()</code> exclusively, so which database it actually reads
            from is controlled entirely by the active target, per Part 01, and cannot silently point at
            production again regardless of whose local credentials happen to be configured.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At Klaviyo:</strong> the platform team is investigating why full local model runs take
            over twenty minutes for engineers actively iterating on transformation logic, even for a change
            confined to one small model. Following the pattern in Part 02, they add a <code>target.name == 'dev'</code>
            row-volume limit to the heaviest upstream staging models, cutting typical local dev-loop time from
            twenty minutes to under thirty seconds, with zero change to what staging or prod actually compute
            — the limit is compiled out entirely outside of dev.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At Ramp:</strong> a security review flags that <code>profiles.yml</code>, committed years
            earlier when the project was small, still contains a Snowflake password in plain text for the
            prod target — nobody had gotten around to migrating it. The fix follows Part 04 exactly:
            replacing the hardcoded password with <code>{"{{ env_var('SNOWFLAKE_PASSWORD') }}"}</code>,
            rotating the actual credential (since the old one must be assumed compromised the moment it was
            ever committed), and configuring the CI system's secrets manager to inject the new value as a
            job-scoped environment variable — with the added benefit that the credential can now be rotated
            going forward without touching a single file in the repository.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Explain the actual difference between dbt vars and env_var(), and how you would decide which one to use for a given value.',
            a: `Per Part 03, Part 04, and Part 05, vars are defined inside the dbt project itself — a project-level default in dbt_project.yml, optionally overridden per-invocation with --vars — and are visible in version control, since dbt_project.yml is ordinary committed source code. env_var() instead reads an actual operating-system environment variable, set entirely outside the dbt project by a shell, a CI secrets manager, or an orchestrator, and the actual value never appears in any file dbt reads from the repository.

The decision test I use: would I be comfortable with every engineer on the project seeing this value directly in a pull request diff? If yes — a date range, a feature flag, a list of accepted payment methods — it belongs in vars. If no — anything that is a credential or grants access to something — it belongs behind env_var(), with no exceptions made for convenience, since a private repository is not a substitute for a real secrets manager.`,
          },
          {
            q: 'How does target.name let the same model behave differently in dev versus prod, and what is a concrete example?',
            a: `target.name is a built-in Jinja context variable giving the name of whichever target is currently active, per Part 02 — 'dev', 'staging', 'prod', matching whatever profiles.yml names them. Wrapping a portion of a model's SQL in a {% if target.name == 'dev' %} block means that logic is only compiled into the final SQL when the dev target is active; it is entirely absent from the compiled SQL run against any other target.

The clearest concrete example is limiting row volume for faster local iteration — adding a WHERE clause restricting a staging model to the last few days of data only when target.name == 'dev', while staging and prod continue processing the full historical dataset exactly as they would without that conditional at all. This is a genuinely common pattern because it makes the local development loop dramatically faster without changing what production actually computes.`,
          },
          {
            q: 'Why does var() accepting a default value matter, and when would you deliberately not provide one?',
            a: `Per Part 03, var('name', default) falls back to the given default if the variable is not set anywhere — neither in dbt_project.yml's vars: block nor via a --vars override for that specific run. Providing a sensible default is what keeps a model safe to run in a context where nobody thought to set that variable — a new CI job unaware of every var a mature project has accumulated, or a teammate's first local run before they've fully configured their environment.

I would deliberately omit the default only for a variable a model genuinely cannot run correctly without — something where any fallback value would be actively wrong rather than just suboptimal. For anything with a reasonable fallback, omitting the default just means the project becomes unnecessarily fragile to incomplete configuration, breaking runs that could have proceeded safely with a sensible assumed value.`,
          },
          {
            q: 'Walk me through why a team would override the generate_schema_name macro, and what problem it actually solves.',
            a: `By default, per Part 06, a model with no explicit schema config builds into whatever schema is set on the active target. This is fine in prod, where one shared, clean schema is exactly the goal, but in dev it means every developer building against the same target schema can silently collide with, or overwrite, a teammate's tables of the same name — a structural risk, not one that better communication reliably prevents.

The standard fix overrides generate_schema_name to branch on target.name: prod ignores any custom schema config and always builds into the clean target schema, while dev and staging append something like the target name onto the default schema, routing each developer's models into their own isolated schema, such as dbt_jsmith_dev. This solves the collision problem structurally, with no coordination required between developers, and ties back to a model's own schema config from the materializations module, which this macro decides how to actually honor per environment.`,
          },
          {
            q: 'A junior engineer asks why they can\'t just hardcode --vars overrides permanently into their local profiles.yml instead of using dbt_project.yml\'s vars: block. What do you tell them?',
            a: `The core issue is scope and visibility, per Part 03 and Part 05. dbt_project.yml's vars: block is the project's shared, version-controlled default — every developer, CI job, and production run sees the same starting values unless they deliberately override them, which is exactly the behavior you want for genuine project configuration like a start_date or a feature flag.

profiles.yml, by contrast, is local, per-developer machine configuration that is typically not even committed to the repository at all — it is where connection details and credentials live, not project logic. Putting a --vars-style override permanently into an individual's profiles.yml means that override is invisible to every other developer, to CI, and to production, silently diverging that one person's local behavior from what the rest of the team and the actual pipeline run — exactly the kind of inconsistency dbt_project.yml's shared vars: block exists to prevent.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Five Mistakes That Compromise Environment Safety</SectionTitle>

        {[
          {
            title: 'Hardcoding a database or schema name directly inside a model instead of using source()/ref()',
            detail: 'Per Part 01, this permanently ties a model to one specific environment regardless of which target is actually active, defeating the entire purpose of having separate dev/staging/prod targets in profiles.yml.',
          },
          {
            title: 'Putting a credential or API key inside vars: in dbt_project.yml',
            detail: 'vars: is committed, version-controlled project configuration, visible to anyone with any level of repository access, and permanently retained in git history even after removal. Secrets belong exclusively behind env_var(), per Part 04 and Part 05.',
          },
          {
            title: 'Calling var() with no default for a value that has a perfectly reasonable fallback',
            detail: 'This makes a project needlessly fragile to incomplete configuration — a new CI job or a teammate\'s first local run breaks entirely rather than proceeding safely with a sensible assumed value, per Part 03.',
          },
          {
            title: 'Letting every developer build into the same dev schema with no per-developer isolation',
            detail: 'Without a generate_schema_name override routing each developer\'s runs into their own schema, one developer\'s broken in-progress model can silently overwrite a teammate\'s tables of the same name — a structural problem, not one solved reliably by communication alone (Part 06).',
          },
          {
            title: 'Confusing target.name (environment identity) with var() (general project configuration)',
            detail: 'Using target.name to smuggle in arbitrary configuration values, or using a var to try to detect which environment is running, both work against the grain of what each mechanism is actually for and produce logic that is harder to reason about than using the right tool for the job (Part 02, Part 03, Part 05).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.detail}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Variable and Environment Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Compilation Error: Required var \'start_date\' not found in config',
            cause: 'A model called var(\'start_date\') with no default argument, and start_date is not set in either dbt_project.yml\'s vars: block or a --vars override for this invocation.',
            fix: 'Either add start_date to dbt_project.yml\'s vars: block with a sensible project-wide default, per Part 03, or — if this run genuinely needs a one-off value — pass it explicitly with dbt run --vars \'{"start_date": "..."}\'.',
          },
          {
            error: 'Env var required but not provided: \'SNOWFLAKE_PASSWORD\'',
            cause: 'profiles.yml calls env_var(\'SNOWFLAKE_PASSWORD\') with no default, and that environment variable is not currently set in the shell or CI job actually invoking dbt.',
            fix: 'Export the environment variable before running dbt (export SNOWFLAKE_PASSWORD=...) locally, or confirm the CI/orchestration system\'s secrets manager is actually configured to inject that specific variable name for this job, per Part 04.',
          },
          {
            error: 'A model built into the wrong schema than expected — for example, a developer\'s work landing in the shared prod schema',
            cause: 'Either the generate_schema_name override from Part 06 is missing or has a bug in its target.name branching logic, or the developer\'s own profiles.yml target is misconfigured and pointing at the prod database/schema instead of their intended dev target.',
            fix: 'Confirm which target is actually active for the run (dbt debug shows the resolved connection details), and separately review the generate_schema_name macro\'s logic against the table in Part 06 to confirm it produces the expected schema name for that target.name.',
          },
          {
            error: 'A feature that was only meant to be tested in dev unexpectedly ran in a scheduled production job',
            cause: 'A var-based feature flag like enable_new_discount_logic was flipped to true directly in dbt_project.yml\'s vars: block — which applies to every environment identically — rather than being scoped to a specific run via --vars during testing.',
            fix: 'Remember that dbt_project.yml\'s vars: block is a single, shared default across all environments unless something environment-specific overrides it; use --vars scoped to a specific dev or CI invocation while testing, and only change the committed project-wide default once the feature has been validated and is ready for every environment.',
          },
          {
            error: 'A model runs correctly locally but fails or behaves differently the moment it runs in CI',
            cause: 'Almost always a hidden dependency on something present in the developer\'s local environment but not replicated in CI — an environment variable set in a personal shell profile and never added to the CI system\'s secrets configuration, or a var override habitually passed via --vars locally that CI\'s scheduled invocation does not include.',
            fix: 'Audit every env_var() and var() call the model (and anything it depends on) actually makes, and confirm each one is either given a safe default or explicitly configured in the CI environment — do not assume something present on a developer\'s machine is present everywhere dbt might run.',
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
          'The dev/staging/prod pattern runs the exact same dbt project code against different targets in profiles.yml — different databases, schemas, and warehouses — so a developer can never accidentally overwrite production data.',
          'target.name (and target.schema, target.database, target.type) lets model or macro logic branch on which environment is currently running — the classic use is limiting row volume in dev for a faster local development loop.',
          'vars: in dbt_project.yml sets project-wide default values read via var(\'name\', default) in models and macros; --vars on the CLI overrides those defaults for one specific invocation without touching the committed project defaults.',
          'env_var() reads an actual operating-system environment variable, entirely outside the dbt project\'s own files — the only correct mechanism for secrets and credentials, most commonly used inside profiles.yml.',
          'The real difference between vars and env_var() is where the value lives and what it should hold: vars are committed, dbt-native project configuration; env_var() is dbt\'s bridge out to infrastructure-managed secrets that must never be committed.',
          'Overriding generate_schema_name lets dev and staging runs land in isolated, per-developer schemas (like dbt_jsmith_dev) while prod always builds into one clean, shared schema — solving developer collisions structurally rather than by relying on communication.',
        ]}
      />
    </LearnLayout>
  )
}
