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

export default function CicdForDbt() {
  return (
    <LearnLayout
      title="CI/CD for dbt Projects"
      description="Why dbt projects need continuous integration just like application code, the Slim CI pattern with state:modified+ and --defer, a real GitHub Actions workflow, dbt Cloud's built-in CI jobs versus self-hosting, and a full PR-to-production deployment flow."
      section="dbt — Module 18"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'CI/CD for dbt Projects', href: '/learn/dbt/cicd-for-dbt' },
      ]}
      prev={{ title: 'Performance and Query Optimization in dbt', href: '/learn/dbt/performance-tuning-dbt' }}
      next={{ title: 'Testing Strategy and Data Quality at Scale', href: '/learn/dbt/testing-strategy-at-scale' }}
    >
      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why dbt projects need CI" />
        <SectionTitle>A dbt Project Is Application Code, and It Deserves the Same Discipline</SectionTitle>
        <Para>
          It is easy to treat a dbt project as "just SQL" and skip the engineering rigor that a backend
          service would get by default — a pull request review, an automated test run, a deployment gate.
          That instinct is wrong, and it gets more expensive to fix the longer a team waits. A dbt project is
          a compiled, versioned, dependency-graphed piece of software that runs directly against production
          data. A broken model does not throw a stack trace in a staging environment nobody looks at — it
          silently corrupts a table that a VP's dashboard reads from tomorrow morning.
        </Para>
        <Para>
          Continuous integration for a dbt project means one specific, concrete thing: on every pull request
          that changes a model, test, or macro, an automated job builds the changed models (and only the
          changed models, plus whatever depends on them) in an isolated environment, runs their tests, and
          reports pass or fail directly on the PR before a human ever has to eyeball a diff of raw SQL and
          guess whether it compiles correctly against real data.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Without CI:</strong> a model change is reviewed as text, merged on faith, and its first
            real execution against production data happens on the next scheduled run — which is also the
            first moment anyone finds out it references a column that was renamed three weeks ago.
          </Para>
          <Para>
            <strong>With CI:</strong> the exact same change is built and tested against a fresh, isolated set
            of tables before merge. A broken <code>ref()</code>, a failing <code>not_null</code> test, or a
            SQL compilation error shows up as a red check on the PR, not as a 3am page.
          </Para>
        </HighlightBox>
        <Para>
          The cost of skipping this is not hypothetical. A single incremental model with an off-by-one
          window in its <code>is_incremental()</code> filter can silently double-count revenue for weeks
          before anyone notices a dashboard total looks slightly too high. CI does not eliminate every bug —
          nothing does — but it eliminates the entire class of bug that a fresh build against real,
          reasonably-sized data would have caught immediately.
        </Para>
        <Callout title="CI is not the same thing as tests" color={K}>
          Tests (covered in the testing-basics module) check specific assertions about data — not null,
          unique, accepted values, a custom business rule. CI is the automation that decides <em>when</em>
          those tests run, <em>what</em> gets built before they run, and <em>whether</em> a human is allowed
          to merge if they fail. A project can have excellent tests and still ship broken code constantly if
          nothing forces those tests to run before merge — that gap is exactly what this module closes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The naive approach and why it fails at scale" />
        <SectionTitle>The Obvious First Attempt: Run "dbt build" on Every PR</SectionTitle>
        <Para>
          The most obvious way to add CI to a dbt project is to run <code>dbt build</code> — building every
          single model and running every single test in the entire project — on every pull request. This
          works, and for a genuinely small project (a few dozen models), it is a perfectly reasonable place
          to start.
        </Para>
        <Para>
          It stops working as the project grows. A 300-model warehouse with several large incremental fact
          tables can take 40 minutes or more to build from scratch. A one-line change to a single staging
          model — renaming a column, fixing a typo in a comment — now triggers a 40-minute CI run that
          rebuilds 299 models that were not touched at all. Multiply that by a team merging a dozen PRs a day
          and CI becomes a bottleneck that slows down the exact process it was meant to speed up.
        </Para>
        <Table
          headers={['Approach', 'What it builds', 'Cost at 300+ models']}
          rows={[
            ['Full dbt build on every PR', 'Every model in the entire project, regardless of what changed.', 'Extremely slow, expensive warehouse compute charged on every PR, does not scale with team size.'],
            ['Slim CI (state:modified+)', 'Only models that changed, plus everything downstream of them.', 'Scales with the size of the change, not the size of the project — a one-model PR builds roughly one model.'],
          ]}
        />
        <Para>
          The fix is not a faster warehouse or a bigger CI runner — it is building less. dbt has a built-in
          mechanism for figuring out exactly which models a given change actually affects, and building only
          those. That mechanism is state comparison, and the pattern built on top of it is what the dbt
          community calls <strong>Slim CI</strong>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — manifest.json and dbt's state representation" />
        <SectionTitle>manifest.json: dbt's Compiled Picture of Your Project</SectionTitle>
        <Para>
          Every time dbt parses and compiles a project — for <code>dbt run</code>, <code>dbt build</code>,
          <code>dbt compile</code>, or any other invocation — it writes a file called{' '}
          <code>manifest.json</code> into the <code>target/</code> directory. This file is dbt's complete,
          structured representation of the project at that moment: every model, its compiled SQL, its
          resolved <code>ref()</code> and <code>source()</code> dependencies, every test, every macro, every
          column-level and model-level config, and a content hash of each file.
        </Para>
        <Para>
          The manifest is not a debugging artifact you are meant to read by hand — it is the mechanism that
          makes Slim CI possible at all. dbt can compare <em>two</em> manifests — one from a previous,
          known-good state (typically the last successful production run) and one from the current, in-review
          state — and compute a precise diff: which model definitions actually changed, which tests changed,
          which sources changed. That diff is what <code>state:modified</code> means.
        </Para>
        <CodeBox label="generating a manifest">
{`# Any dbt invocation that parses the project writes target/manifest.json
dbt compile
# or
dbt run
# or
dbt build

# The file that matters for CI:
ls target/manifest.json`}
        </CodeBox>
        <SubTitle>Where the production manifest has to live for CI to see it</SubTitle>
        <Para>
          For a CI run to compare against production state, it needs a copy of production's{' '}
          <code>manifest.json</code> available at CI time — and a CI runner is a fresh, ephemeral environment
          with no memory of any previous run. This means the production manifest has to be persisted
          somewhere the CI job can fetch it from before comparing state. The most common pattern is uploading
          the manifest to an object storage bucket (an S3 bucket, a GCS bucket, an Azure Blob container) as
          the last step of every successful scheduled production run, then downloading that same file as the
          first step of every CI run.
        </Para>
        <CodeBox label="persisting and retrieving the production manifest via S3">
{`# Last step of the scheduled PRODUCTION run (after a successful dbt build):
aws s3 cp target/manifest.json s3://my-company-dbt-artifacts/prod/manifest.json

# First step of every CI run, before comparing state:
aws s3 cp s3://my-company-dbt-artifacts/prod/manifest.json ./prod-manifest/manifest.json`}
        </CodeBox>
        <Callout title="dbt Cloud does this for you automatically" color={K}>
          If a team runs dbt Cloud rather than self-hosting, dbt Cloud already tracks the artifacts from
          every job run for you, and its built-in CI job type fetches the right production manifest
          automatically without any manual S3 upload step. Part 06 below covers this trade-off directly —
          the manifest-in-S3 pattern here is specifically what a self-hosted CI setup (GitHub Actions,
          GitLab CI, or similar) has to build itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Slim CI: state:modified+" />
        <SectionTitle>state:modified+ — Build Only What Changed, Plus Everything Downstream</SectionTitle>
        <Para>
          With a production manifest available for comparison, dbt's <code>state:</code> selector method lets
          you select models based on how they differ from that reference state. <code>state:modified</code>{' '}
          selects every model whose definition changed relative to the comparison manifest — a different
          compiled SQL body, a changed config, a changed test. The trailing <code>+</code> is dbt's graph
          operator meaning "and everything downstream of these" — every model that directly or transitively
          depends on a modified model via <code>ref()</code>.
        </Para>
        <CodeBox label="the core Slim CI command">
{`dbt build --select state:modified+ --state ./prod-manifest`}
        </CodeBox>
        <Para>
          Read literally: build every model that changed, and every model downstream of a changed model,
          compared against the manifest found in <code>./prod-manifest</code>. A PR that only edits a single
          staging model near the bottom of the DAG builds that staging model plus its downstream marts —
          typically a handful of models, not the entire 300-model project. A PR that edits a widely-referenced
          core model (a shared <code>dim_customers</code>, say) correctly builds a much larger slice of the
          DAG, because a change that far upstream genuinely could affect everything downstream of it — Slim
          CI is precise, not naively small.
        </Para>
        <Table
          headers={['Selector', 'What it means', 'When to use it']}
          rows={[
            ['state:modified', 'Only models whose own definition changed — not their downstream dependents.', 'Rare on its own; usually paired with + to also catch downstream impact.'],
            ['state:modified+', 'Modified models plus everything downstream of them.', 'The standard Slim CI selector for a pull-request build.'],
            ['state:new', 'Models that exist in the current project but not in the comparison state at all.', 'Distinguishing a genuinely new model from a modified existing one, useful in more advanced CI reporting.'],
            ['+state:modified', 'Modified models plus everything upstream that feeds them.', 'Less commonly needed for CI — upstream models did not change, so rebuilding them adds cost without validating anything new.'],
          ]}
        />
        <Callout title="This only works because dbt's DAG is explicit" color={K}>
          state:modified+ is only possible because every model's dependencies are declared through{' '}
          <code>ref()</code> and <code>source()</code> rather than hardcoded table names — exactly the DAG
          construction covered in the models-basics and sources-and-ref modules. A project with raw,
          hardcoded table references anywhere in its model SQL has holes in its dependency graph that dbt
          cannot see, and state comparison silently misses any downstream impact through that hole.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — --defer and --state together" />
        <SectionTitle>--defer: Let CI Reference Already-Built Production Tables It Did Not Rebuild</SectionTitle>
        <Para>
          Slim CI's <code>state:modified+</code> selector solves what to build. It does not, by itself, solve
          a second problem: a downstream model that was correctly excluded from this PR's build still has a{' '}
          <code>ref()</code> pointing at an upstream model — and if that upstream model was <em>also</em>{' '}
          excluded (because it did not change), the downstream model's query will fail, because the table it
          references was never created in this CI run's isolated schema at all.
        </Para>
        <Para>
          <code>--defer</code>, used together with <code>--state</code>, is exactly the fix. It tells dbt:
          "for any model this run did not build itself, resolve its <code>ref()</code> to the already-built
          production table instead of failing because it does not exist in this run's schema." Combined with{' '}
          <code>state:modified+</code>, this means a CI run builds a small, changed slice of the DAG in a
          fresh, isolated schema, while every unbuilt upstream dependency is deferred to production —
          producing correct, realistic results without rebuilding the entire warehouse.
        </Para>
        <CodeBox label="the full Slim CI command with defer">
{`dbt build \\
  --select state:modified+ \\
  --state ./prod-manifest \\
  --defer \\
  --favor-state`}
        </CodeBox>
        <Para>
          <code>--favor-state</code> (available in newer dbt versions alongside <code>--defer</code>) makes
          the deferral behavior even more predictable: it tells dbt to always prefer the production version
          of an unselected node over any same-named object that might happen to already exist in the CI
          schema, removing an edge case where a stale leftover object from a previous CI run could otherwise
          get picked up by mistake.
        </Para>
        <SubTitle>Worked example — what actually happens for a one-model PR</SubTitle>
        <CodeBox label="a concrete Slim CI run">
{`DAG: stg_orders -> int_orders_joined -> fct_orders -> rpt_revenue_daily

PR changes only stg_orders.sql (added a new column).

dbt build --select state:modified+ --state ./prod-manifest --defer

state:modified   = { stg_orders }                (its definition changed)
state:modified+  = { stg_orders, int_orders_joined, fct_orders, rpt_revenue_daily }
                   (everything downstream, since a column added upstream could
                   affect all four models' correctness)

This CI run builds all four models fresh, in an isolated CI schema.
Any OTHER model in the 300-model project that these four do not depend on
is never touched -- and if any of these four happen to depend on some
fifth, unrelated model that did NOT change, --defer resolves that ref()
straight to the real production table instead of failing.`}
        </CodeBox>
        <Callout title="Why this is safe, not just fast" color={K}>
          Deferring to production for unbuilt upstream models means CI is testing against real, current
          production data for everything it did not rebuild — which is actually a stronger validation than
          testing against synthetic or stale fixture data would be. The models actually under review get a
          completely fresh build; everything else gets tested against the real thing.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — dbt Cloud CI jobs vs. self-hosted CI" />
        <SectionTitle>Two Ways to Run This: dbt Cloud's Built-In CI Job, or Your Own Pipeline</SectionTitle>
        <Para>
          Everything in Parts 03 through 05 — comparing state, running <code>state:modified+</code>, deferring
          to production — is a set of dbt features, not a specific CI vendor's feature. You can wire it up
          yourself in GitHub Actions, GitLab CI, CircleCI, or Jenkins. Or, if the project runs on dbt Cloud,
          you can use its purpose-built CI job type, which implements this entire pattern out of the box.
        </Para>
        <Table
          headers={['Aspect', 'dbt Cloud CI job', 'Self-hosted CI (GitHub Actions, etc.)']}
          rows={[
            ['Manifest storage and retrieval', 'Handled automatically — dbt Cloud tracks every job\'s artifacts and knows which one is the production comparison state.', 'You build this yourself — typically an S3/GCS upload step after every production run, and a download step at the start of CI.'],
            ['Triggering', 'Automatically runs on every PR against a configured branch, with zero pipeline YAML to write.', 'You write and maintain the workflow file yourself (Part 07 below is a full example).'],
            ['Ephemeral schema creation', 'Automatically builds into a temporary, PR-specific schema and tears it down after.', 'You configure this via profiles.yml / environment variables, usually keyed off a CI-provided PR number.'],
            ['Status reporting on the PR', 'Native GitHub/GitLab check integration, built in.', 'You wire this up via the CI platform\'s own PR status API, usually already provided by the CI runner itself.'],
            ['Cost', 'Requires a dbt Cloud plan that includes CI jobs.', 'Only warehouse compute plus whatever your existing CI runner already costs — no separate dbt-specific fee.'],
            ['Control and portability', 'Tied to dbt Cloud\'s job model and UI.', 'Fully owned pipeline-as-code, portable across CI vendors, easier to customize with org-specific steps.'],
          ]}
        />
        <Para>
          Neither option is a strictly better engineering choice — they are the same trade-off any
          managed-versus-self-hosted decision presents. A small team already paying for dbt Cloud gets Slim
          CI essentially for free with no pipeline to maintain. A team that is already deeply invested in its
          own CI platform, or that needs fine-grained custom steps (a security scan, a custom cost-estimation
          step before build, posting to a specific Slack channel), often prefers owning the pipeline directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — a real GitHub Actions workflow" />
        <SectionTitle>A Complete, Working Slim CI Workflow in GitHub Actions</SectionTitle>
        <Para>
          Putting Parts 03 through 06 together into one working pipeline. This workflow triggers on every pull
          request, fetches the production manifest from S3, installs dbt and project dependencies, then runs
          the Slim CI build with defer, reporting pass or fail as a required check on the PR.
        </Para>
        <CodeBox label=".github/workflows/dbt_ci.yml">
{`name: dbt Slim CI

on:
  pull_request:
    paths:
      - 'models/**'
      - 'macros/**'
      - 'tests/**'
      - 'seeds/**'
      - 'dbt_project.yml'
      - 'packages.yml'

jobs:
  slim-ci:
    runs-on: ubuntu-latest
    environment: ci
    steps:
      - name: Check out the PR branch
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dbt and adapters
        run: pip install dbt-core==1.8.0 dbt-snowflake==1.8.0

      - name: Install dbt packages
        run: dbt deps

      - name: Configure AWS credentials for manifest storage
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Fetch production manifest for state comparison
        run: |
          mkdir -p prod-manifest
          aws s3 cp s3://my-company-dbt-artifacts/prod/manifest.json ./prod-manifest/manifest.json

      - name: Run Slim CI build
        env:
          DBT_SNOWFLAKE_ACCOUNT: \${{ secrets.DBT_SNOWFLAKE_ACCOUNT }}
          DBT_SNOWFLAKE_USER: \${{ secrets.DBT_SNOWFLAKE_USER }}
          DBT_SNOWFLAKE_PASSWORD: \${{ secrets.DBT_SNOWFLAKE_PASSWORD }}
          DBT_TARGET_SCHEMA: "pr_\${{ github.event.pull_request.number }}"
        run: |
          dbt build \\
            --select state:modified+ \\
            --state ./prod-manifest \\
            --defer \\
            --favor-state \\
            --target ci

      - name: Post build results summary
        if: always()
        run: cat target/run_results.json | python -m json.tool | head -n 40`}
        </CodeBox>
        <Para>
          Two details worth calling out explicitly. First, the <code>paths:</code> filter on the trigger means
          this workflow does not even start for PRs that only touch unrelated files (documentation, CI config
          for a different pipeline) — a small but real cost saving on top of Slim CI's own model-level
          selectivity. Second, the target schema name is derived from the PR number
          (<code>{'pr_${{ github.event.pull_request.number }}'}</code>), so multiple open PRs get independent,
          non-colliding schemas to build into, and a <code>ci</code> target in <code>profiles.yml</code>
          points at that dynamically-named schema rather than a fixed one.
        </Para>
        <CodeBox label="the CI target in profiles.yml, using the schema env var">
{`my_project:
  target: ci
  outputs:
    ci:
      type: snowflake
      account: "{{ env_var('DBT_SNOWFLAKE_ACCOUNT') }}"
      user: "{{ env_var('DBT_SNOWFLAKE_USER') }}"
      password: "{{ env_var('DBT_SNOWFLAKE_PASSWORD') }}"
      role: ci_role
      database: analytics
      schema: "{{ env_var('DBT_TARGET_SCHEMA') }}"
      warehouse: ci_wh
      threads: 4`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — promotion and the production deployment pipeline" />
        <SectionTitle>CI Is Not Deployment — a Separate, Scheduled Production Pipeline Ships the Change</SectionTitle>
        <Para>
          A common point of confusion: the PR-time Slim CI build described in Parts 04 through 07 does not
          ship anything to production. It validates a proposed change in an isolated, throwaway schema, and
          that schema is torn down after the PR closes, whether merged or not. Production itself is updated
          by a completely separate process — a scheduled job, decoupled from any individual PR, that runs
          after a merge to the main branch.
        </Para>
        <Table
          headers={['Pipeline', 'Triggered by', 'Builds into', 'Purpose']}
          rows={[
            ['PR-time Slim CI', 'Opening or updating a pull request', 'A temporary, PR-specific schema', 'Validate the proposed change before a human approves merging it.'],
            ['Production deployment job', 'A merge to main, or a fixed schedule (hourly, nightly)', 'The real production schema', 'Actually update the tables business users and dashboards query.'],
          ]}
        />
        <Para>
          This separation matters for a subtle reason: the production job should almost always run a full,
          unfiltered <code>dbt build</code> (or a build scoped by business logic like freshness tiers, not by
          what changed in git) — because production needs the entire warehouse to be internally consistent,
          not just the slice a particular PR touched. Slim CI's whole value proposition is speed during
          review; production's value proposition is completeness and consistency, which is the opposite
          optimization.
        </Para>
        <CodeBox label="a representative production deployment job (triggered on merge to main)">
{`name: dbt Production Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install dbt-core==1.8.0 dbt-snowflake==1.8.0
      - run: dbt deps
      - name: Full production build
        env:
          DBT_TARGET_SCHEMA: analytics
        run: dbt build --target prod
      - name: Publish manifest.json for the next CI run's state comparison
        run: |
          aws s3 cp target/manifest.json s3://my-company-dbt-artifacts/prod/manifest.json
      - name: Generate and publish dbt docs
        run: |
          dbt docs generate --target prod
          aws s3 sync target/ s3://my-company-dbt-docs/ --exclude "*" --include "*.html" --include "*.json" --include "*.js"`}
        </CodeBox>
        <Para>
          Notice the second-to-last step: publishing the freshly-built <code>manifest.json</code> back to the
          same S3 location the Slim CI workflow reads from. This closes the loop described in Part 03 — every
          successful production deploy updates the "known-good" reference state that the very next PR's CI
          run will compare itself against, so Slim CI's notion of "what changed" always means "changed since
          the last thing that actually shipped," not some stale, arbitrarily old snapshot.
        </Para>
        <Callout title="What happens if the production job itself fails" color="#ef4444">
          A failed production build should never leave partially-updated tables silently in place without an
          alert. Most teams pair the production job with immediate paging on failure, and rely on
          each model being idempotently rebuildable — rerunning <code>dbt build</code> again after fixing the
          underlying issue reproduces a correct, consistent state, rather than requiring a manual rollback of
          half-applied changes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — a worked example, PR to production" />
        <SectionTitle>A Full Worked Example: One Change, Start to Finish</SectionTitle>
        <Para>
          Tying every piece together with one concrete change moving through the whole system, end to end.
        </Para>
        <CodeBox label="the full lifecycle of one dbt model change">
{`1. An analytics engineer opens a PR adding a new column to stg_orders.sql
   and a corresponding not_null test in its schema.yml.

2. GitHub Actions triggers the Slim CI workflow (Part 07) because the PR
   touches a file under models/.

3. CI fetches the last-published production manifest.json from S3
   (published by the previous merge's production deploy job -- Part 08).

4. dbt build --select state:modified+ --state ./prod-manifest --defer runs.
   dbt detects stg_orders changed, and that int_orders_joined, fct_orders,
   and rpt_revenue_daily all depend on it transitively -- exactly four
   models get built fresh in an isolated pr_482 schema. Every other model
   in the 300-model project is skipped and deferred to production.

5. The new not_null test on stg_orders runs against the freshly built PR
   schema and passes. CI reports a green check on the PR.

6. A teammate reviews the diff, sees the green Slim CI check, approves,
   and merges to main.

7. The production deploy job (Part 08) triggers on the merge, running a
   full dbt build --target prod across the entire project.

8. On success, the job publishes the new manifest.json back to S3 --
   this becomes the comparison state for the NEXT PR's Slim CI run.

9. dbt docs are regenerated and published, so the updated column and
   test are immediately visible to anyone browsing the documentation
   site covered in the documentation module.`}
        </CodeBox>
        <Para>
          Nothing in this flow required a human to manually run dbt against production, guess which models
          were affected, or eyeball a SQL diff without seeing it actually execute. Every step is either fully
          automated or a single, informed approve-and-merge decision backed by a real build result.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — environment strategy" />
        <SectionTitle>How Many Environments Does a dbt Project Actually Need, and What Runs Where</SectionTitle>
        <Para>
          Everything covered so far assumes two environments — a PR's isolated CI schema and production —
          but most real teams settle on a three-environment model, adding a persistent staging (sometimes
          called "QA") environment between them. Understanding what each environment is actually for, rather
          than treating "more environments" as automatically safer, is itself a design decision worth being
          able to justify in an interview or an architecture review.
        </Para>
        <Table
          headers={['Environment', 'Lifetime', 'What builds into it', 'Purpose']}
          rows={[
            ['CI (per-PR)', 'Created when a PR opens, torn down when it closes.', 'Only state:modified+ selected models, per PR, deferred to production for everything else.', 'Validate one specific change before merge, at minimal cost.'],
            ['Staging / QA', 'Persistent, shared, rebuilt on every merge to a staging branch.', 'A full or near-full dbt build, on real (often production-copy) data.', 'A stable place to catch integration issues across several merged changes before they reach production — problems Slim CI\'s narrow, per-PR scope cannot see by design.'],
            ['Production', 'Persistent, the environment real dashboards and reports query.', 'A full dbt build, on a fixed schedule plus on merge to main.', 'The actual source of truth every downstream consumer relies on.'],
          ]}
        />
        <Para>
          The staging environment exists specifically to catch a class of bug Slim CI cannot: two PRs, each
          individually valid and each passing its own narrow Slim CI check, that conflict with each other only
          when both are merged — one PR renaming a column, another PR (opened before the rename merged) still
          referencing the old name. Neither PR's own CI run ever builds both changes together, because each
          Slim CI run only ever sees its own PR's diff against the last known-good production state. A shared
          staging environment, rebuilt from a full merge history rather than a single PR's diff, is what
          surfaces this kind of cross-PR conflict before it reaches production.
        </Para>
        <CodeBox label="a representative three-environment branching and deploy strategy">
{`main        -> production (scheduled + on-merge full dbt build)
staging     -> staging/QA (full dbt build on every merge to this branch)
feature/*   -> PR-specific Slim CI schema (torn down on PR close)

Typical flow:
  1. Engineer branches feature/add-ltv-metric off staging.
  2. Opens a PR back into staging -- Slim CI runs (Part 04-07).
  3. Merges into staging -- triggers a full QA build; team eyeballs the
     staging dashboards before promoting further.
  4. A separate, deliberate promotion PR merges staging into main --
     often just a fast-forward merge once QA looks correct --
     triggering the full production deploy job from Part 08.`}
        </CodeBox>
        <Callout title="Not every team needs all three tiers" color={K}>
          A small project with a handful of contributors and low merge volume can reasonably run just PR-time
          Slim CI plus production, skipping a dedicated staging tier entirely — the cross-PR-conflict risk a
          staging environment protects against scales with how many people are merging concurrently, not with
          project size alone. Adding a staging tier before it is actually needed is its own maintenance cost:
          another environment to keep credentialed, another schema to keep in sync, another thing that can
          silently drift from production's actual configuration.
        </Callout>
        <SubTitle>Keeping environment-specific configuration out of model SQL</SubTitle>
        <Para>
          None of this three-tier structure should ever require a model's SQL to branch on which environment
          it is running in. <code>target.name</code> (available in Jinja) lets a model or macro behave
          differently per environment when genuinely necessary — most commonly to sample a smaller subset of
          data outside of production, exactly the local/CI distinction Part 07 of this module's system-design
          companion module discusses — but reaching for it routinely is usually a sign a materialization or
          variable-based config would be the better tool.
        </Para>
        <CodeBox label="a narrow, justified use of target.name">
{`{{
  config(
    materialized='table'
  )
}}

SELECT *
FROM {{ source('app', 'events') }}
{% if target.name != 'prod' %}
-- keep non-production builds fast and cheap by sampling
WHERE random() < 0.05
{% endif %}`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 11 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — credentials and CI security" />
        <SectionTitle>Handling Warehouse Credentials and Secrets Safely in a CI Pipeline</SectionTitle>
        <Para>
          Every CI run in this module's examples needs live warehouse credentials to actually connect and
          build models — which means a dbt CI pipeline is also a place real production-adjacent secrets flow
          through automation triggered by, in the case of a public or externally-contributed repository, code
          a stranger wrote. Getting this wrong is not a hypothetical risk; it is one of the more common ways a
          CI pipeline becomes a security incident rather than a productivity tool.
        </Para>
        <SubTitle>A dedicated CI role, never a personal or admin credential</SubTitle>
        <Para>
          The CI pipeline should authenticate as its own dedicated warehouse role — commonly named something
          like <code>ci_role</code>, as used in this module's Part 07 example — with privileges scoped to
          exactly what CI needs: creating and dropping PR-specific schemas, reading from source tables, and
          nothing more. It should never authenticate as an individual engineer's personal credentials, and it
          should never use a broadly-privileged administrative role, because a compromised or misconfigured CI
          job then has only as much blast radius as that narrow role permits.
        </Para>
        <Table
          headers={['Credential scope', 'Risk if compromised', 'Why the narrower option is correct for CI']}
          rows={[
            ['A personal engineer credential reused for CI', 'Inherits that specific person\'s full warehouse access, and rotating it (if the engineer leaves) silently breaks CI.', 'CI\'s identity should not be tied to any one person\'s employment status or personal permission set.'],
            ['A broad admin/owner role', 'A compromised CI job could read, modify, or drop anything in the warehouse, far beyond what dbt build actually needs.', 'The role a pipeline runs as should never exceed what that pipeline\'s own job actually requires.'],
            ['A dedicated, narrowly-scoped ci_role', 'Limited to schema create/drop within a CI-designated namespace and read access to sources — a compromise here cannot reach unrelated data.', 'This is the role CI should actually run as: exactly enough privilege, no more.'],
          ]}
        />
        <SubTitle>Secrets belong in the CI platform's secret store, never in a workflow file</SubTitle>
        <Para>
          Every credential referenced in this module's GitHub Actions example — the Snowflake account, user,
          and password — is pulled from <code>secrets.*</code>, GitHub Actions' encrypted secret store, never
          hardcoded into the YAML file itself. A workflow file lives in the same git history as everything
          else in the repository, including any fork of it; a credential committed directly into that file is
          effectively public the moment the repository is, or the moment anyone with read access to the repo's
          history looks.
        </Para>
        <Callout title="A specific risk unique to CI on pull requests: fork PRs" color="#ef4444">
          Most CI platforms, including GitHub Actions, withhold repository secrets from workflow runs
          triggered by a pull request opened from a fork by default — specifically to prevent an external
          contributor's PR branch from being able to read and exfiltrate your warehouse credentials simply by
          adding a step to the workflow file that prints an environment variable. Overriding this default
          (some teams do, to let Slim CI run for external contributions) should be treated as a deliberate,
          reviewed security decision, never a default flipped for convenience without understanding the
          trade-off being made.
        </Callout>
        <SubTitle>Least-privilege schema access for the PR-specific CI schema</SubTitle>
        <Para>
          Because Part 07's CI schema naming is dynamic (derived from the PR number), the CI role's grant
          should be scoped to a pattern, not a single fixed schema — but that pattern should still be as narrow
          as practical, typically a dedicated CI-reserved database or schema prefix that has no overlap with
          where real production tables live, so that even a misconfigured or buggy CI run touching the wrong
          schema name cannot accidentally reach a production object.
        </Para>
        <CodeBox label="a representative least-privilege CI role grant, Snowflake syntax">
{`CREATE ROLE ci_role;

GRANT USAGE ON WAREHOUSE ci_wh TO ROLE ci_role;
GRANT USAGE ON DATABASE analytics TO ROLE ci_role;

-- CI may create/drop its own PR-specific schemas, scoped by a reserved prefix
GRANT CREATE SCHEMA ON DATABASE analytics TO ROLE ci_role;

-- CI may read raw source tables, needed to build from them, but cannot
-- write to or drop anything outside schemas it created itself
GRANT USAGE ON SCHEMA analytics.raw_sources TO ROLE ci_role;
GRANT SELECT ON ALL TABLES IN SCHEMA analytics.raw_sources TO ROLE ci_role;

-- Deliberately NOT granted: any privilege on the production-facing
-- analytics.marts schema itself -- CI only ever reads production data
-- via --defer's ref() resolution, at query time, never writes to it.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 12 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — testing CI itself, and rollback strategy" />
        <SectionTitle>What Happens When the Production Deploy Job Fails, and How to Roll Back Safely</SectionTitle>
        <Para>
          Everything covered through Part 11 makes a PR-time failure cheap and low-stakes — a red check, no
          merge, nothing shipped. A production deploy job failure is a different animal entirely: by the time
          it runs, the change already merged to main, and a failure there means either a build that did not
          complete (leaving some tables stale but not obviously broken) or, worse, a build that completed but
          produced silently wrong data because a test that should have caught the problem did not.
        </Para>
        <SubTitle>The three distinct production-failure shapes, and why each needs a different response</SubTitle>
        <Table
          headers={['Failure shape', 'What actually happened', 'Correct response']}
          rows={[
            ['A model fails to compile or a warehouse error occurs mid-build', 'The build stops partway through; some models rebuilt successfully, others did not run at all, leaving stale (not wrong) data for whatever did not get to.', 'Fix the underlying issue and rerun the full dbt build target=prod — idempotent rebuilding means simply running it again produces a correct end state, no manual table-by-table rollback needed.'],
            ['A test fails after the model successfully rebuilds', 'The new table is built and is live, but a not_null, unique, or business-rule test caught something wrong with the data itself.', 'This is the most urgent case — the wrong data is already live and queryable. The immediate response is reverting the merge that introduced the change (a git revert, not just fixing forward) and rerunning production from the reverted state, since the priority is getting correct data live again quickly, with root-causing done afterward.'],
            ['The build and every test pass, but a stakeholder later reports a wrong number the tests did not catch', 'A genuine test-coverage gap — the assertion that would have caught this simply did not exist.', 'Fix the underlying model AND add the missing test in the same PR, so the specific gap that let this through is closed permanently, not just patched for this one instance.'],
          ]}
        />
        <Para>
          The middle row is the one worth internalizing most deeply for an interview: a failed test after a
          successful rebuild means wrong data is already live in production, which is a fundamentally more
          urgent situation than a build that simply did not finish. Treating both failure shapes the same way
          — "something is red, go investigate calmly" — misses that one of them has customer-facing wrong
          numbers live right now and the other does not.
        </Para>
        <CodeBox label="a revert-first response to a production test failure">
{`# The moment a production test failure is confirmed to mean live wrong data:
git revert <merge-commit-sha>
git push origin main
# This retriggers the production deploy job (Part 08) automatically,
# rebuilding from the last known-good state before the problematic merge.

# Root-causing the actual bug happens AFTERWARD, in a fresh PR,
# validated by Slim CI same as any other change -- not under the
# pressure of live wrong data still being served.`}
        </CodeBox>
        <Callout title="Why idempotent rebuilds are what make any of this tractable" color={K}>
          None of the responses in the table above require manually identifying and undoing specific rows in
          specific tables. Every response is some version of "run dbt build again, from a corrected state" —
          which only works because dbt models are pure, deterministic SELECT statements over their inputs, not
          hand-written procedural mutations. A model built from stored procedures with imperative UPDATE and
          DELETE statements scattered through it, by contrast, often cannot be safely rerun from scratch at
          all — this idempotency is one of the concrete engineering benefits a stored-procedure-to-dbt
          migration (of exactly the kind this track's capstone module works through) actually buys a team,
          beyond just readability.
        </Callout>
        <SubTitle>Alerting on a production failure, not just logging it</SubTitle>
        <Para>
          A production dbt build failure that only shows up in a CI dashboard nobody is actively watching is
          barely better than no monitoring at all. The production deploy job should page or notify the owning
          team directly and immediately on any non-zero exit code — commonly by adding a final, always-run
          step that posts to a Slack channel or triggers a paging tool on failure, distinct from the routine
          success notifications a scheduled job might otherwise send quietly.
        </Para>
        <CodeBox label="adding failure alerting to the production deploy job">
{`      - name: Full production build
        id: dbt_build
        env:
          DBT_TARGET_SCHEMA: analytics
        run: dbt build --target prod

      - name: Alert on production build failure
        if: failure()
        run: |
          curl -X POST -H 'Content-type: application/json' \\
            --data '{"text":"dbt production build FAILED on main - see run logs"}' \\
            \${{ secrets.SLACK_WEBHOOK_URL }}`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 13 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — CI cost and scaling considerations" />
        <SectionTitle>What Happens to This Pipeline as the Project and Team Both Grow</SectionTitle>
        <Para>
          Everything in this module works well for a project of a few hundred models and a team merging a
          handful of PRs a day. It is worth understanding, concretely, what starts to strain as both numbers
          grow significantly, because a system-design interviewer asking about dbt CI/CD often follows up with
          exactly this kind of scaling question.
        </Para>
        <Table
          headers={['Growth dimension', 'What starts to strain', 'The mitigation']}
          rows={[
            ['Number of models in the project', 'Even Slim CI\'s per-PR cost is bounded by how far downstream a change reaches — a change to a very widely-referenced core model can still trigger a large build.', 'This is a modeling problem more than a CI problem: minimizing unnecessary fan-out from core shared models (per this track\'s project-structure module) keeps state:modified+ builds small even as total project size grows.'],
            ['Number of concurrent open PRs', 'Each open PR holds its own live CI schema and warehouse compute reservation for as long as it stays open, and a warehouse\'s concurrency limits are finite.', 'Auto-expiring stale CI schemas (tearing down a PR\'s schema after some inactivity window, not just on PR close) and a dedicated, appropriately-sized CI warehouse separate from production\'s warehouse.'],
            ['Number of engineers merging per day', 'The staging-tier cross-PR-conflict risk from Part 10 grows directly with how many independent changes are in flight at once.', 'This is exactly why Part 10\'s staging/QA tier becomes worth its added maintenance cost specifically past a certain team size, even though a smaller team can reasonably skip it.'],
            ['Warehouse compute cost of CI itself', 'Slim CI is far cheaper than a full build, but it is not free — dozens of daily PRs each building a real, if small, slice of the DAG adds up.', 'A dedicated, appropriately small CI warehouse size (not the same size provisioned for the full nightly production build) and monitoring CI compute cost as its own line item, not lumped in with production spend.'],
          ]}
        />
        <Para>
          The through-line across all four rows: none of these growing pains are fixed by abandoning Slim CI
          or CI in general — they are fixed by applying the same core principle (build only what is actually
          needed, scoped as narrowly as correctness allows) one level further, to schema lifecycle, warehouse
          sizing, and team process, rather than only to model selection.
        </Para>
      </section>

      <Divider />

      {/* ── Part 14 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — non-model changes, docs, and edge cases in CI" />
        <SectionTitle>Handling Seeds, Macro-Only Changes, and Documentation in the Same CI Pipeline</SectionTitle>
        <Para>
          Everything so far has focused on model changes, because they are the most common and highest-risk
          kind of PR. A mature CI setup also needs to correctly handle the other kinds of changes a dbt
          project sees regularly — a seed file update, a macro-only change with no model edits, and
          documentation-only edits — each of which interacts with <code>state:modified+</code> slightly
          differently than a plain model change does.
        </Para>
        <SubTitle>Seed changes — state:modified+ does cover them, but they need dbt seed first</SubTitle>
        <Para>
          A changed CSV file under <code>seeds/</code> is picked up by <code>state:modified+</code> just like
          a changed model, since seeds are nodes in the same manifest and the same DAG. The detail easy to
          miss: <code>dbt build</code> does include seeds by default, but a CI pipeline that was written
          assuming only <code>.sql</code> files ever change (for instance, a workflow trigger path filter that
          only watches <code>models/**</code>) will silently never fire at all for a seed-only PR.
        </Para>
        <CodeBox label="widening the workflow trigger to catch every node type state:modified+ can select">
{`on:
  pull_request:
    paths:
      - 'models/**'
      - 'macros/**'
      - 'tests/**'
      - 'seeds/**'      # <- easy to forget; a seed-only PR needs this to trigger CI at all
      - 'snapshots/**'  # <- same issue for snapshot-only changes
      - 'dbt_project.yml'
      - 'packages.yml'`}
        </CodeBox>
        <SubTitle>Macro-only changes — often invisible to state:modified+ in a way worth knowing explicitly</SubTitle>
        <Para>
          This is a genuinely sharp edge worth knowing cold for an interview: <code>state:modified</code>{' '}
          detects a change to a macro's own definition, but it does not automatically treat every model that
          <em>calls</em> that macro as modified, the way it does for a direct <code>ref()</code> dependency
          change. A macro is not itself a node with downstream dependents tracked the same way a model is —
          so a bug fix inside a widely-used macro can, in some dbt versions and configurations, build a
          smaller slice of the DAG than the change actually affects, silently under-testing the blast radius
          of a macro change.
        </Para>
        <Callout title="The safe default for any macro-only PR" color="#ef4444">
          Because macro impact is not always fully captured by state:modified+ alone, a project's CI
          configuration should treat any PR touching <code>macros/**</code> as deserving a wider build than
          the default selector would produce on its own — either a full <code>dbt build</code> for
          macro-only PRs specifically, or, at minimum, explicit awareness during code review of every model
          known to call the changed macro. Treating a macro change identically to an ordinary model change,
          and trusting state:modified+ alone to size the build correctly, is a real and easy-to-hit gap.
        </Callout>
        <SubTitle>Documentation-only changes — the one case genuinely safe to skip a full build for</SubTitle>
        <Para>
          A change only to a column or model <code>description:</code> field in a <code>.yml</code> schema
          file, with no test or config change alongside it, does not affect anything <code>dbt build</code>
          actually executes against the warehouse. Many teams add a lightweight, separate CI check for
          exactly this case — running only <code>dbt parse</code> (which validates that the YAML and Jinja
          are syntactically sound without touching the warehouse at all) rather than a full build, keeping a
          documentation PR's feedback loop fast without needing to reason about state selection for it at all.
        </Para>
        <CodeBox label="a lightweight docs-only validation path">
{`# For a PR whose diff touches only description: fields in schema.yml files:
dbt parse
# Validates the project compiles and every ref()/source() still resolves,
# with zero warehouse compute cost -- appropriate specifically because
# nothing in a pure documentation change can produce a wrong query result.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 15 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — CI for a project with multiple dbt Cloud/warehouse targets" />
        <SectionTitle>CI When a Single Project Deploys to More Than One Warehouse Target</SectionTitle>
        <Para>
          A less common but real variant of this problem: some organizations run the same dbt project against
          two genuinely different warehouse destinations — a common pattern during a warehouse migration (say,
          Redshift to Snowflake), or when a regulated business unit requires an entirely separate warehouse
          instance for compliance reasons. CI for this shape needs to validate a change against both targets,
          not just one, before merge.
        </Para>
        <SubTitle>Why running Slim CI twice, once per target, is usually simpler than trying to unify it</SubTitle>
        <Para>
          A tempting but usually wrong instinct is trying to build one clever CI job that somehow validates
          both targets at once. In practice, the two targets need their own separate production manifests
          (since they may have drifted independently, especially mid-migration when one target lags the
          other), their own separate credentials, and potentially their own separate schema-naming scheme.
          The simpler and more maintainable answer is running the same Slim CI logic twice, as two independent
          matrix jobs, each comparing against its own target's production state.
        </Para>
        <CodeBox label="a GitHub Actions matrix strategy running Slim CI against two targets">
{`jobs:
  slim-ci:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        target: [snowflake_prod, redshift_prod]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install dbt-core==1.8.0 dbt-snowflake==1.8.0 dbt-redshift==1.8.0
      - run: dbt deps
      - name: Fetch the manifest for THIS target specifically
        run: |
          aws s3 cp s3://my-company-dbt-artifacts/\${{ matrix.target }}/manifest.json ./prod-manifest/manifest.json
      - name: Slim CI build against this target
        run: |
          dbt build --select state:modified+ --state ./prod-manifest --defer --target \${{ matrix.target }}`}
        </CodeBox>
        <Para>
          Each matrix leg reports its own independent pass/fail status on the PR, so a change that happens to
          be correct on Snowflake but breaks on Redshift (a dialect-specific function that does not exist on
          one of the two engines, for instance) is caught before merge rather than only surfacing when the
          lagging target's next production run finally executes the change for the first time.
        </Para>
        <Callout title="This is exactly the same reasoning as the multi-team package strategy in this track's capstone module" color={K}>
          Treating each warehouse target as its own independent thing to validate against, rather than
          assuming "it compiled for one, it will compile for the other," is the same underlying discipline as
          writing genuinely portable macros with adapter dispatch for a project shared across three business
          units on three different warehouses — a change is only actually validated for a target once it has
          been built and tested against that target specifically, never inferred from a different target's
          result.
        </Callout>
        <Para>
          The multi-target case is also a useful reminder of a theme running through this entire module:
          every mechanism covered — Slim CI, --defer, the manifest-persistence loop, environment tiering,
          credential scoping — is composable with the others rather than being a single monolithic
          "dbt CI setup." A team migrating between warehouses, or serving multiple business units, can layer
          the matrix strategy above on top of everything from Parts 01 through 14 without redesigning any of
          it, because each piece solves one specific, narrow problem and none of them assume there is only
          ever one warehouse target in play.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ─────────────────────────────────────────────── */}
      <section data-toc-kind="myth" style={{ marginBottom: 64 }}>
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Six Things People Get Wrong About dbt CI/CD</SectionTitle>
        {[
          {
            m: '"CI for dbt just means running dbt test on a schedule."',
            r: 'A scheduled test run checks data quality after the fact — useful, but it is not CI. CI specifically means validating a proposed change before it merges, on the pull request itself, so a broken model never reaches main in the first place. Scheduled testing and PR-time CI solve different problems and most mature projects run both.',
          },
          {
            m: '"Slim CI means dbt runs a smaller test suite, with fewer assertions."',
            r: 'Slim CI does not reduce which tests exist or how strict they are — every test on every selected model still runs in full. What is smaller is the set of models selected for the build in the first place (state:modified+), not the rigor applied to whichever models get built.',
          },
          {
            m: '"--defer means dbt skips validating the models it defers."',
            r: 'Deferred models are not rebuilt in this CI run, but they are not skipped from the query results either -- ref() calls to them resolve to the real, already-tested production table. The models actually under review in this PR still get fully built and fully tested; deferral only concerns their unbuilt upstream dependencies.',
          },
          {
            m: '"You need dbt Cloud to do Slim CI -- it is a paid feature."',
            r: 'state:modified+, --state, and --defer are all open-source dbt-core flags, usable in any self-hosted CI pipeline for free, as Part 07\'s GitHub Actions example demonstrates directly. dbt Cloud\'s CI job is a convenience layer on top of the same underlying mechanism, not the only way to access it.',
          },
          {
            m: '"CI passing means the change is safe to merge, full stop."',
            r: 'CI passing means the models that were built compiled correctly and passed their tests against realistic data -- a strong signal, not a guarantee. It cannot catch a business-logic error that produces a plausible-looking but wrong number, or a change whose test coverage was itself incomplete. CI is a necessary gate, not a substitute for code review or well-designed tests in the first place.',
          },
          {
            m: '"A production deploy failure and a PR-time CI failure should be handled the same way -- just fix it and rerun."',
            r: 'They are not the same severity. A PR-time CI failure blocks an unmerged change from ever reaching production -- low stakes, fix at your own pace. A production deploy failure means the change already merged, and if a test failed after a successful rebuild, wrong data may already be live and queryable by real users right now, which usually calls for an immediate revert rather than a leisurely fix-forward, per this module\'s Part 12.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: K, marginBottom: 10 }}>Myth: {item.m}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.r}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-world story ─────────────────────────────────────────────── */}
      <section data-toc-kind="story" style={{ marginBottom: 64 }}>
        <SectionTag text="// From the Field" />
        <SectionTitle>How Real Teams Actually Run dbt CI/CD</SectionTitle>
        <HighlightBox>
          <SubTitle>Vimeo — cutting a 45-minute full build down to minutes with Slim CI</SubTitle>
          <Para>
            Vimeo's analytics engineering team described a familiar growing pain: as their dbt project grew
            past a few hundred models, a full-build CI check on every PR became slow enough that engineers
            started batching unrelated changes into fewer, larger PRs just to amortize the CI wait time — the
            opposite of the small, reviewable changes good engineering practice wants. Adopting Slim CI with{' '}
            <code>state:modified+</code> against a manifest persisted from the previous production run
            brought typical PR build times down from tens of minutes to a small fraction of that, because
            most PRs genuinely only touch a handful of models. The team reported it directly changed
            engineer behavior back toward smaller, more frequent, easier-to-review PRs, simply because CI
            was no longer a tax on doing that.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <SubTitle>Webflow — treating the production manifest as a first-class deployment artifact</SubTitle>
          <Para>
            Webflow's data platform team built their CI pipeline around treating <code>manifest.json</code>{' '}
            from every successful production deploy as a versioned artifact in its own right, not an
            incidental build output — uploaded to cloud storage immediately after every production run,
            exactly as this module's Part 08 describes. This let them decouple their CI tooling from any one
            CI vendor: because the state-comparison mechanism only depends on having the right manifest file
            available, they were able to migrate their pipeline between CI providers without changing any of
            the underlying Slim CI logic, only the YAML that fetches the file.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <SubTitle>Attentive — a required CI check as the actual enforcement mechanism, not a suggestion</SubTitle>
          <Para>
            Attentive's engineering team found that having a Slim CI workflow existed was not, by itself,
            enough — until the check was configured as a required status check in their branch protection
            rules, a determined engineer could and occasionally did merge a PR with a red or still-running
            CI check during a deadline crunch. Making the Slim CI check a hard merge requirement, not just an
            informational one, was the specific change that turned CI from "a thing that runs" into "a thing
            that actually prevents broken models from reaching production" — a distinction the team described
            as underrated relative to the effort of building the pipeline itself.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <SubTitle>A shared lesson across all three: the manifest is a deployment artifact, not an implementation detail</SubTitle>
          <Para>
            Across each of these three accounts, the same underlying idea recurs in slightly different words:
            once a team stops treating <code>manifest.json</code> as a throwaway build byproduct and starts
            treating it as a versioned, deliberately persisted artifact — something published on every
            successful production run and fetched deliberately at the start of every CI run — Slim CI stops
            being a fragile, occasionally-broken optimization and becomes a reliable, boring piece of
            infrastructure nobody has to think about day to day. The engineering effort worth investing here
            is almost entirely in that persistence-and-retrieval plumbing, not in the dbt command itself,
            which is a single, unchanging line once the plumbing around it is solid.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ─────────────────────────────────────────────────── */}
      <section data-toc-kind="prep" style={{ marginBottom: 64 }}>
        <SectionTag text="// Interview Prep" />
        <SectionTitle>7 Questions Interviewers Actually Ask About dbt CI/CD</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through what happens, mechanically, when a PR triggers Slim CI.',
            a: 'The CI runner checks out the PR branch, fetches a copy of the production manifest.json (from wherever it was persisted after the last successful production deploy, commonly an S3 bucket), then runs dbt build with --select state:modified+ --state <path to that manifest> --defer. dbt parses the current project, compares it against the fetched manifest, identifies which models have changed definitions and everything downstream of them, builds exactly that set into an isolated schema, and resolves any ref() to an unbuilt model by deferring to the real production table instead of failing. Test results and build success/failure report back to the PR as a status check.',
          },
          {
            q: 'Q2. Why is a full dbt build on every PR a bad default at scale, and what specifically breaks?',
            a: 'It rebuilds every model regardless of what changed, so CI cost and duration scale with total project size rather than with the size of any individual change. On a large project this makes CI runs slow enough (tens of minutes) that they become a genuine bottleneck on how often and how small a team is willing to make their PRs -- the opposite of the fast-feedback loop CI is supposed to provide. Slim CI fixes this by scaling build cost with the size of the diff instead.',
          },
          {
            q: 'Q3. What is the difference between --defer and state:modified+, and why do you need both?',
            a: 'state:modified+ decides WHAT to build -- the changed models plus their downstream dependents. --defer decides what happens to everything that selector did NOT select -- rather than failing because an unbuilt upstream table does not exist in the CI schema, dbt resolves that ref() to the already-built production table. You need both together: state:modified+ alone would leave the build failing on any ref() to an unselected upstream model, and --defer alone with no selector would just rebuild everything, since there would be nothing narrowing what gets built in the first place.',
          },
          {
            q: 'Q4. How is manifest.json involved in this, and where should it be stored for CI to use it?',
            a: 'manifest.json is dbt\'s compiled representation of the whole project -- every model\'s resolved dependencies, compiled SQL, and config -- written to the target/ directory on every dbt invocation that parses the project. State comparison (state:modified+ and --defer) needs a reference copy of this file from a known-good prior state, typically the last successful production run, and since a CI runner is a fresh, stateless environment, that file has to be persisted somewhere retrievable -- most commonly uploaded to an object storage bucket like S3 as the final step of the production deploy job, then downloaded as the first step of every CI run.',
          },
          {
            q: 'Q5. What is the difference between dbt Cloud\'s built-in CI job and a self-hosted CI pipeline, and when would you choose one over the other?',
            a: 'dbt Cloud\'s CI job type implements the entire Slim CI pattern -- manifest tracking, state comparison, ephemeral schema creation, PR status reporting -- as a managed feature with essentially no pipeline code to write, at the cost of requiring a dbt Cloud plan that includes it and being somewhat tied to dbt Cloud\'s own job model. A self-hosted pipeline (GitHub Actions, GitLab CI, and so on, as in this module\'s Part 07) requires building the manifest storage, triggering, and reporting steps yourself, but is fully portable, avoids a dbt-specific cost, and is easier to extend with organization-specific steps. Teams already committed to dbt Cloud usually take the built-in job for the reduced maintenance; teams with an existing CI platform and custom pipeline needs often prefer owning it directly.',
          },
          {
            q: 'Q6. A production dbt build fails after successfully rebuilding a table, but before a test on it runs -- is this the same severity as a test actually failing?',
            a: 'No, and the distinction matters. If the build itself failed partway through, some tables are simply stale, not wrong -- rerunning the build once the underlying issue is fixed produces a correct end state, since dbt models are idempotent. If instead the build succeeds and a test on the resulting data fails, wrong data is already live and queryable in production right now, which is the more urgent situation and usually warrants an immediate revert of the change rather than a fix-forward, exactly as this module\'s Part 12 distinguishes.',
          },
          {
            q: 'Q7. Why might state:modified+ under-select the affected models for a change to a widely-used macro?',
            a: 'state:modified detects that the macro\'s own definition changed, but a macro is not tracked as a node with the same explicit downstream-dependent relationship a model\'s ref() creates -- so models that call the changed macro are not always automatically swept into modified+ the way a model\'s direct downstream dependents are. The safe practice is treating any PR touching macros/** as deserving a wider, more conservative build rather than trusting the default selector to size it correctly on its own.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ─────────────────────────────────────────────────── */}
      <section data-toc-kind="plain" style={{ marginBottom: 64 }}>
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Six Mistakes Teams Make Rolling Out dbt CI/CD</SectionTitle>
        <BulletList
          items={[
            'Never persisting the production manifest.json anywhere retrievable, so state:modified+ has nothing valid to compare against and CI silently falls back to selecting everything, quietly turning a Slim CI setup back into a full-build setup with none of the intended speed benefit.',
            'Using hardcoded table references instead of ref()/source() somewhere in the project, creating a gap in the dependency graph that state comparison cannot see through -- a change upstream of that hardcoded reference never triggers a rebuild of what depends on it downstream.',
            'Making the CI check informational rather than a required, enforced status check in branch protection settings, which means a red or still-running check does not actually block anyone from merging under time pressure.',
            'Running the exact same full, unfiltered dbt build in both the PR-time CI job and the scheduled production job, missing the entire point of Slim CI -- the two pipelines exist to optimize for different things (review speed versus warehouse-wide consistency) and should usually not use the same selector.',
            'Forgetting to also publish the freshly generated manifest.json after every production deploy, which silently breaks the loop -- the very next PR\'s Slim CI run keeps comparing against an increasingly stale reference state instead of the most recent production truth.',
            'Assuming a macro-only change is fully covered by state:modified+ the same way a model change is, when macro impact on calling models is not always fully tracked the same way a direct ref() dependency is -- treating every macro-touching PR as deserving a wider, more conservative build closes this gap.',
          ]}
        />
      </section>

      <Divider />

      {/* ── Error Library ─────────────────────────────────────────────────── */}
      <section data-toc-kind="plain" style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Actually Hit Setting This Up</SectionTitle>
        {[
          {
            e: 'Compilation Error: Model \'X\' depends on a node named \'Y\' which was not found',
            w: 'This shows up in a Slim CI run when a model was excluded by state:modified+ (correctly -- it did not change) but --defer was not passed, or was passed without a valid --state path, so dbt has no fallback and tries to find the table in the CI schema where it was never built.',
            f: 'Add --defer --state <path to the fetched production manifest> to the build command, and confirm the manifest was actually downloaded successfully before the build step runs (a silently failed S3 download is a very common root cause of this specific error).',
          },
          {
            e: 'Database Error: Object \'ANALYTICS.PR_482.STG_ORDERS\' does not exist or not authorized',
            w: 'The CI role/user does not have privileges on the dynamically-created PR-specific schema, usually because the schema-creation grant was set up for one fixed CI schema name rather than the pattern of names Slim CI generates per PR number.',
            f: 'Grant the CI role privileges on the schema pattern used (e.g. a wildcard grant on schemas prefixed pr_, or a CREATE SCHEMA grant at the database level scoped to the CI role) rather than a single hardcoded schema name.',
          },
          {
            e: 'state:modified+ selects far more models than expected for a small change',
            w: 'This is usually not a bug -- it means the changed model sits high in the DAG and genuinely has many downstream dependents. It can also mean the comparison manifest is stale (pointing at a much older production state than intended), making dbt see many unrelated accumulated differences as "modified" all at once.',
            f: 'Confirm the fetched manifest actually corresponds to the most recent production deploy, not an old cached copy; if it does, and the selection is still large, that is correct behavior -- the fix is reconsidering whether that upstream model should have so many direct downstream dependents in the first place.',
          },
          {
            e: 'CI passes locally with dbt build --select state:modified+ but fails only in the pipeline',
            w: 'Almost always an environment difference: the local run has a manifest from a recent local dbt run being compared, while the pipeline is comparing against the real, separately-fetched production manifest -- these are not the same reference file unless deliberately kept in sync.',
            f: 'Always test locally against the exact same manifest file the CI pipeline actually fetches (download it manually for a local repro) rather than whatever manifest happens to be sitting in your local target/ directory from a previous local invocation.',
          },
          {
            e: 'Two open PRs touching overlapping models silently interfere with each other\'s CI runs',
            w: 'This happens when the CI schema naming is not actually unique per PR -- for example, a fixed schema name shared across all CI runs rather than one derived from the PR number -- so two concurrent CI builds race to create and drop the same schema.',
            f: 'Derive the CI target schema name from something guaranteed unique per PR, such as the PR number or the branch name, exactly as shown in this module\'s GitHub Actions example, so concurrent PRs never share a schema.',
          },
          {
            e: 'A production deploy succeeds and every test passes, but a stakeholder reports a wrong number hours later',
            w: 'This is not a CI failure at all -- it is a test-coverage gap. CI can only catch what a written test actually checks; a business rule nobody encoded as a singular test can pass silently while producing a plausible-looking but incorrect number.',
            f: 'Fix the underlying model AND add the specific missing test in the same PR, per this module\'s Part 12 guidance on the three distinct production-failure shapes -- treat the incident as evidence of exactly which assertion was missing, not just a one-off bug to patch.',
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 22 }}>
            <CodeBox label={`error ${i + 1}`}>{item.e}</CodeBox>
            <Para><strong>Why:</strong> {item.w}</Para>
            <Para><strong>Fix:</strong> {item.f}</Para>
          </div>
        ))}
      </section>

      <Divider />

      <KeyTakeaways items={[
        'A dbt project deserves the same CI discipline as application code — an automated build and test run on every PR, before merge, not after a scheduled production run finds the problem first.',
        'Slim CI (state:modified+ against a persisted production manifest.json) makes CI cost scale with the size of a change instead of the size of the whole project, which is the difference between CI being a fast feedback loop and CI being a bottleneck that discourages small PRs.',
        '--defer and --state work together with state:modified+ so an unbuilt upstream model still resolves correctly, to the real production table, rather than failing because it does not exist in an isolated CI schema.',
        'PR-time CI and the scheduled production deploy job are two separate pipelines solving two different problems — review-time speed versus warehouse-wide consistency — and conflating them (running the same selector in both) gives up the benefit of each.',
        'dbt Cloud\'s built-in CI job and a self-hosted GitHub Actions pipeline both implement the same underlying Slim CI mechanism; the choice between them is a managed-versus-owned trade-off, not a difference in what dbt itself can do.',
        'A production build failure and a PR-time CI failure are not the same severity — a failed test after a successful production rebuild means wrong data may already be live, which usually calls for an immediate revert rather than a leisurely fix-forward, while an unmerged PR failure carries no such urgency.',
      ]} />
    </LearnLayout>
  )
}
