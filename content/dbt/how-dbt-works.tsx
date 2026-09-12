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

const MythCard = ({ wrong, right }: { wrong: string; right: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 18 }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
      <span style={{ color: '#ff4757', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>✕</span>
      <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>{wrong}</span>
    </div>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 8, padding: '12px 16px' }}>
      <span style={{ color: '#00e676', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>✓</span>
      <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>{right}</span>
    </div>
  </div>
)

const MYTHS = [
  {
    wrong: '"dbt run and dbt compile do the same thing, compile is just a dry-run flag."',
    right: 'dbt compile only resolves Jinja and writes the resulting SQL to target/compiled/ — nothing is executed against the warehouse. dbt run does that same compilation step AND then actually executes the SQL. They are genuinely different operations, not two names for one thing — see Part 02.',
  },
  {
    wrong: '"The DAG is just a diagram dbt draws for you, it doesn\'t actually affect anything at runtime."',
    right: 'The DAG is the actual execution plan. dbt builds it from resolved ref()/source() calls and uses it to compute a topological sort that determines the real order models are run in — it is not decorative, it is the mechanism. See Part 03 and Part 04.',
  },
  {
    wrong: '"dbt schedules itself — you just set it up once and it runs automatically."',
    right: 'dbt Core has no built-in scheduler at all; something else (cron, Airflow, a CI job, or dbt Cloud\'s scheduler specifically) has to trigger dbt run on a schedule. dbt itself only executes when invoked. See Part 05.',
  },
  {
    wrong: '"ref() is just a stylistic way to write a table name, equivalent to hardcoding the schema.table."',
    right: 'ref() is what makes the whole dependency graph possible. Hardcoding a schema.table name gives dbt no way to know one model depends on another, so it cannot guarantee run order or environment-correct table names. See Part 01 and Part 03.',
  },
  {
    wrong: '"dbt run executes all your models in one single database transaction, all-or-nothing."',
    right: 'Each model is typically its own separate CREATE TABLE AS SELECT / CREATE VIEW AS statement, run independently in dependency order. If model 5 of 10 fails, models 1-4 already succeeded and remain built; dbt does not roll back the whole run. See Part 01 and Part 06.',
  },
]

const INTERVIEW_QA = [
  {
    q: 'Walk me through exactly what happens when you run `dbt run`.',
    a: (
      <>
        <Para>
          As Part 01 covers step by step, dbt first reads every <code>.sql</code> file in the project's{' '}
          <code>models/</code> directory along with the project's YAML configuration. For each model, it
          resolves any Jinja templating — most importantly <code>ref()</code> calls (references to other
          models) and <code>source()</code> calls (references to raw tables) — into the fully-qualified,
          environment-correct table names those functions point to, producing plain SQL.
        </Para>
        <Para>
          From those resolved references, dbt builds a dependency graph — the DAG, covered in Part 03 — where
          each model is a node and each <code>ref()</code>/<code>source()</code> call is a directed edge.
          It then performs a topological sort on that graph to compute a valid execution order: every model
          only appears after everything it depends on. Finally, dbt executes each compiled SQL statement
          against the warehouse in that order, typically as a <code>CREATE TABLE AS SELECT</code> or{' '}
          <code>CREATE OR REPLACE VIEW AS</code>, depending on how the model is materialized.
        </Para>
      </>
    ),
  },
  {
    q: 'What is the difference between `dbt compile` and `dbt run`, and when would you use compile on its own?',
    a: (
      <>
        <Para>
          <code>dbt compile</code> performs only the first half of what <code>dbt run</code> does: it
          resolves Jinja templating and <code>ref()</code>/<code>source()</code> calls into plain SQL and
          writes the result to files under <code>target/compiled/</code>, but it never sends any of that SQL
          to the warehouse. Nothing is created, updated, or queried. <code>dbt run</code> does that same
          compilation step and then actually executes the compiled SQL against the warehouse.
        </Para>
        <Para>
          As Part 02 explains, this makes <code>dbt compile</code> a debugging tool: if you're not sure
          exactly what SQL your Jinja is generating — say, a macro isn't producing the join condition you
          expect — you run <code>dbt compile</code>, open the corresponding file in{' '}
          <code>target/compiled/</code>, and read the literal SQL that would have been run, without touching
          the warehouse or waiting on a real execution.
        </Para>
      </>
    ),
  },
  {
    q: 'Explain the DAG in dbt — what are the nodes, what are the edges, and what guarantee does it give you?',
    a: (
      <>
        <Para>
          As covered in Part 03, the DAG's nodes are the objects dbt manages: models, sources, seeds (static
          CSV data loaded by dbt), and snapshots (point-in-time captures of slowly changing data). Its edges
          are the dependencies declared through <code>ref()</code> calls (model-to-model) and{' '}
          <code>source()</code> calls (model-to-raw-source). The graph is acyclic by construction — dbt will
          raise a compilation error if you accidentally create a circular dependency, because a cycle would
          make a valid execution order impossible to compute.
        </Para>
        <Para>
          The guarantee the DAG gives you, enforced through the topological sort described in Part 04, is
          that a model will never be run until every model and source it depends on has already completed
          successfully. This is what lets you build a three-layer pipeline — staging models on top of raw
          sources, then intermediate or mart models on top of staging — and trust that dbt will never try to
          build the mart model before its staging dependencies exist.
        </Para>
      </>
    ),
  },
  {
    q: 'If dbt doesn\'t schedule itself, how does it actually run on a recurring basis in production?',
    a: (
      <>
        <Para>
          dbt Core, run from the command line, only does anything the moment you invoke it — it has no
          concept of "run this every day at 6am" built into the tool itself. As Part 05 covers, something
          external has to trigger it on that schedule. Common options are a cron job on a server that shells
          out to <code>dbt run</code>, an Airflow DAG with a task that triggers a dbt run (often via a
          dedicated operator), a scheduled CI/CD pipeline (a GitHub Actions workflow on a cron trigger, for
          instance), or dbt Cloud's own built-in job scheduler, which is one of the main things you're paying
          for when you use dbt Cloud instead of self-managing dbt Core's scheduling yourself.
        </Para>
        <Para>
          This is also why "orchestration" and "transformation" are treated as separate concerns in a modern
          data stack: dbt's job is only to correctly transform data once triggered, in the right dependency
          order; deciding when and how often that trigger fires is a scheduler's job, sitting one layer above
          dbt.
        </Para>
      </>
    ),
  },
  {
    q: 'What is the difference between an incremental model and a regular table model, and when would you reach for one over the other?',
    a: (
      <>
        <Para>
          As Part 06 covers, a table materialization fully recomputes its entire result set from the SELECT
          statement on every single run, discarding and rebuilding the table from scratch. An incremental
          model instead only fully rebuilds on its very first run; on every subsequent run, it computes a much
          narrower query — typically filtered to only new or changed rows — and merges just those rows into
          the table that already exists, using the special <code>is_incremental()</code> Jinja check and a{' '}
          <code>&#123;&#123; this &#125;&#125;</code> reference back to the model's own current state.
        </Para>
        <Para>
          The trade-off is complexity versus cost: a table materialization is simpler to reason about — the
          model's output is always exactly what the SELECT would produce, in full, right now — while an
          incremental model requires more careful logic (choosing a correct incremental filter, handling late-
          arriving or updated historical rows) in exchange for dramatically lower compute cost on very large
          fact tables where reprocessing the full history on every run would be prohibitively slow or
          expensive. In an interview, the strongest answer names both the mechanism and the trade-off,
          rather than treating "incremental" as simply the fast option to always prefer.
        </Para>
      </>
    ),
  },
  {
    q: 'Trace a three-model chain — a raw source, a staging model, and a mart model — through compilation and execution.',
    a: (
      <>
        <Para>
          As worked through in detail in Part 07: a raw <code>orders</code> table lands via ingestion into a{' '}
          <code>raw</code> schema; it is declared in dbt as a <code>source()</code>, not a model, because dbt
          did not create it. A staging model, <code>stg_orders</code>, contains{' '}
          <code>select ... from &#123;&#123; source('freshcart_raw', 'orders') &#125;&#125;</code>, doing
          light cleaning — renaming columns, casting types, filtering out soft-deleted rows. A mart model,{' '}
          <code>fct_daily_revenue</code>, contains{' '}
          <code>select ... from &#123;&#123; ref('stg_orders') &#125;&#125; group by ...</code>, aggregating
          the cleaned staging data into a business-ready table.
        </Para>
        <Para>
          At compile time, dbt resolves the <code>source()</code> call in <code>stg_orders</code> into the
          literal <code>raw.freshcart_raw.orders</code> table reference, and resolves the <code>ref()</code>{' '}
          call in <code>fct_daily_revenue</code> into the literal, environment-correct name of the{' '}
          <code>stg_orders</code> table or view. The DAG built from those two edges guarantees{' '}
          <code>stg_orders</code> is fully built before <code>fct_daily_revenue</code> even starts, and at
          runtime dbt executes the compiled <code>CREATE VIEW stg_orders AS ...</code> first, then the
          compiled <code>CREATE TABLE fct_daily_revenue AS ...</code> second.
        </Para>
      </>
    ),
  },
]

const MISTAKES = [
  {
    title: 'Hardcoding schema.table names instead of using ref() and source()',
    body: 'Writing `select * from raw.freshcart_raw.orders` directly inside a model, instead of `select * from {{ source(\'freshcart_raw\', \'orders\') }}`, breaks dbt\'s ability to build an accurate dependency graph and means the hardcoded name will silently be wrong in a different environment (dev vs prod schemas). See Part 01 and Part 03.',
  },
  {
    title: 'Assuming dbt compile actually changes anything in the warehouse',
    body: 'Running dbt compile to "test" a model and then being surprised nothing changed in the warehouse — it is not supposed to. Compile only resolves Jinja and writes plain SQL to target/compiled/; you need dbt run to actually execute anything. See Part 02.',
  },
  {
    title: 'Expecting dbt to detect and run only downstream models automatically after a change, with no selector',
    body: 'By default, `dbt run` with no arguments runs every model in the project, not just ones affected by your recent edit. Beginners are sometimes surprised a `dbt run` after touching one file takes as long as a full run. Selecting a subset (covered alongside DAG mechanics in Part 04) requires an explicit --select flag with the right graph operator (e.g. `+model_name` to include everything upstream of it).',
  },
  {
    title: 'Creating an accidental circular dependency between two models',
    body: 'Model A references model B with ref(), and model B also references model A with ref(). This makes a valid execution order impossible to compute, and dbt raises a compilation error refusing to build the DAG rather than guessing. See Part 03.',
  },
  {
    title: 'Believing a scheduled Airflow DAG or cron job IS "dbt\'s scheduler"',
    body: 'Conflating the orchestration layer (whatever triggers dbt on a schedule) with dbt itself. dbt Core has no concept of a schedule; the trigger is always external, whether that\'s Airflow, cron, CI, or dbt Cloud\'s own scheduler. See Part 05.',
  },
  {
    title: 'Treating an incremental model\'s filter logic as a minor detail rather than the core of its correctness',
    body: 'Copying an incremental model\'s is_incremental() filter from another project without checking whether late-arriving or updated rows in your own data need a lookback window. Getting this filter wrong doesn\'t cause a visible error — it silently and permanently drops rows that never get reprocessed. See Part 06.',
  },
]

const ERRORS = [
  {
    title: '`Compilation Error: Found a cycle: model.freshcart.model_a --> model.freshcart.model_b --> model.freshcart.model_a`',
    body: 'This means two (or more) models reference each other through ref(), directly or via a longer chain, making a valid topological sort impossible. Fix it by restructuring the logic so the dependency only flows one direction — usually one of the two models has logic that actually belongs upstream of the other, not alongside it.',
  },
  {
    title: '`Database Error: Relation "STG_ORDERS" does not exist` on a model that clearly ran earlier in the same dbt run',
    body: 'This usually means the earlier model was materialized as a view in a schema the current model\'s connection cannot see, or an intermittent warehouse replication delay between the CREATE and the subsequent SELECT (more common on some warehouses under specific isolation settings). Confirm the model actually succeeded in dbt\'s run output before assuming it is a dependency-ordering bug.',
  },
  {
    title: '`dbt run` completes successfully but a downstream model still shows stale data',
    body: 'If the downstream model is materialized as a table (not a view) and something skipped a dependency\'s rebuild — for example you ran `dbt run --select stg_orders` and forgot the downstream model also needed rebuilding — the table simply was not touched this run. Check exactly which models were selected in the run\'s output list against what you expected.',
  },
  {
    title: '`Compilation Error: \'source\' is undefined` inside a model',
    body: 'This is a Jinja/templating error, not a database error — it happens when {{ source(...) }} is called somewhere dbt\'s Jinja context does not have that function available, most often because of a syntax mistake elsewhere in the file (an unclosed {% %} block above it) that breaks how the rest of the file is parsed. Check the file for a stray or missing Jinja tag before the failing line.',
  },
  {
    title: 'A scheduled dbt Cloud job or CI job simply never triggers on the expected day/time',
    body: 'This is almost never a dbt bug — it is a scheduler configuration issue (timezone mismatch in a cron expression, an Airflow DAG that is paused, a dbt Cloud job schedule left disabled after being edited). Since dbt itself has no concept of a schedule (Part 05), any "it didn\'t run when expected" issue lives entirely in whatever triggers it, not in dbt\'s own logic.',
  },
  {
    title: '`Database Error: Duplicate row detected during DML operation` on an incremental model\'s merge step',
    body: 'This happens when the unique_key configured for an incremental model does not actually uniquely identify rows in the incoming data — the underlying MERGE statement dbt generates cannot decide which incoming row should update which existing row when more than one incoming row shares the same key. Check that the chosen unique_key genuinely has no duplicates in the source data, per run.',
  },
]

export default function HowDbtWorks() {
  return (
    <LearnLayout
      title="How dbt Works: Compile, Run, and the DAG"
      description="The real mechanics of dbt run: Jinja compilation, ref()/source() resolution, the dependency graph and topological sort, the difference between compiling and running, what dbt deliberately does not do, and a full worked example tracing a three-model chain."
      section="dbt — Module 02"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'How dbt Works: Compile, Run, and the DAG', href: '/learn/dbt/how-dbt-works' },
      ]}
      prev={{ title: 'What is dbt?', href: '/learn/dbt/what-is-dbt' }}
      next={{ title: 'Setting Up a dbt Project', href: '/learn/dbt/project-setup' }}
    >
      {/* Part 01 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Happens When You Run dbt run" />
        <SectionTitle>What Actually Happens When You Type `dbt run`</SectionTitle>
        <Para>
          Module 01 described dbt at the conceptual level: a tool that turns SQL models into tables and
          views. This module opens the hood. Understanding the exact sequence of steps behind{' '}
          <code>dbt run</code> is what lets you debug a failing run by reasoning about the mechanism instead
          of guessing.
        </Para>
        <Para>
          When you run <code>dbt run</code>, four distinct phases happen in order. First, dbt reads your
          project: every <code>.sql</code> file under <code>models/</code>, every YAML configuration file, and
          the project's <code>dbt_project.yml</code>. Second, it compiles each model — resolving Jinja
          templating, most importantly <code>ref()</code> and <code>source()</code> calls, into plain,
          warehouse-executable SQL. Third, it builds a dependency graph (the DAG) from the resolved references
          discovered during compilation, and computes a valid execution order via a topological sort. Fourth,
          it executes each model's compiled SQL against the warehouse, in that computed order, typically as a{' '}
          <code>CREATE TABLE AS SELECT</code> or <code>CREATE OR REPLACE VIEW AS</code> statement depending on
          the model's configured materialization.
        </Para>
        <HighlightBox>
          <Para><strong>Beginner model:</strong> dbt run just "runs my SQL files."</Para>
          <Para>
            <strong>Production model:</strong> dbt run parses the whole project, resolves every model's
            Jinja into plain SQL, builds a dependency graph from those resolved references, sorts that graph
            into a safe execution order, and only then sends each model's compiled SQL to the warehouse — one
            statement at a time, in dependency order, not all at once and not in file order.
          </Para>
        </HighlightBox>
        <CodeBox label="the four phases of dbt run, in order">
{`1. READ    — parse every .sql file and every YAML config in the project
2. COMPILE — resolve Jinja (ref(), source(), macros) into plain SQL per model
3. GRAPH   — build the DAG from resolved dependencies, topologically sort it
4. EXECUTE — run each model's compiled SQL against the warehouse, in that order
             (CREATE TABLE AS SELECT / CREATE OR REPLACE VIEW AS, per model)`}
        </CodeBox>
        <Para>
          Each model is, in almost all cases, executed as its own independent statement — not wrapped
          together with every other model in one giant all-or-nothing database transaction. If model 5 of 10
          fails, dbt reports that failure, models 1 through 4 remain built in the warehouse exactly as they
          were left, and (depending on flags) dbt may skip or continue to models that don't depend on the
          failed one. There is no automatic rollback of the whole run.
        </Para>
        <Callout title="Why the phases are separated" color={K}>
          Splitting compile from execute is not an implementation detail — it's what makes{' '}
          <code>dbt compile</code> possible as its own useful command, covered in Part 02, and it's what lets
          dbt validate the entire dependency graph for correctness (catching a circular reference, for
          example) before it ever sends a single query to your warehouse.
        </Callout>
        <SubTitle>A real console run, annotated phase by phase</SubTitle>
        <Para>
          It helps to see the four phases reflected in dbt's actual terminal output, rather than only as an
          abstract list. Here is a realistic <code>dbt run</code> against a small FreshCart project with the
          phase boundaries called out.
        </Para>
        <Output>{`$ dbt run
Running with dbt=1.8.0
Registered adapter: snowflake=1.8.0

# ── phases 1 & 2: read + compile happen here, before any output ──
Found 6 models, 14 tests, 2 sources, 0 exposures, 0 metrics

# ── phase 3: DAG built, topological sort computed (silent, internal) ──

# ── phase 4: execution, in dependency order ──
1 of 6 START sql view model staging.stg_orders ................ [RUN]
1 of 6 OK created sql view model staging.stg_orders ........... [CREATE VIEW in 0.52s]
2 of 6 START sql view model staging.stg_customers .............. [RUN]
2 of 6 OK created sql view model staging.stg_customers ......... [CREATE VIEW in 0.48s]
3 of 6 START sql view model staging.stg_payments ................ [RUN]
3 of 6 OK created sql view model staging.stg_payments ........... [CREATE VIEW in 0.51s]
4 of 6 START sql table model marts.fct_daily_revenue ............ [RUN]
4 of 6 OK created sql table model marts.fct_daily_revenue ....... [CREATE TABLE in 1.91s]
5 of 6 START sql table model marts.dim_customers ................ [RUN]
5 of 6 OK created sql table model marts.dim_customers ........... [CREATE TABLE in 1.22s]
6 of 6 START sql table model marts.fct_payment_summary ........... [RUN]
6 of 6 OK created sql table model marts.fct_payment_summary ...... [CREATE TABLE in 0.97s]

Finished running 6 view models, 3 table models in 0 hours 0 minutes and 5.61 seconds.

Completed successfully

Done. PASS=6 WARN=0 ERROR=0 SKIP=0 TOTAL=6`}</Output>
        <Para>
          Notice the three staging models (1-3) all run before any of the three downstream mart models (4-6)
          — exactly the ordering the DAG and topological sort from Parts 03 and 04 guarantee — even though
          nothing in this output visibly says "now building the dependency graph." That work happened silently
          during phases 2 and 3, before a single line of the execution output above was printed.
        </Para>
      </section>

      <Divider />

      {/* Part 02 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Compile vs Run" />
        <SectionTitle>Compiling vs Running — Two Genuinely Different Operations</SectionTitle>
        <Para>
          <code>dbt compile</code> and <code>dbt run</code> are not two names for the same thing, and mixing
          them up is one of the most common early misunderstandings. <code>dbt compile</code> performs only
          the read-and-compile phases from Part 01: it resolves every model's Jinja templating into plain SQL
          and writes the resulting SQL to disk, under a directory called <code>target/compiled/</code>,
          mirroring your project's folder structure. Nothing is sent to the warehouse. No table or view is
          created, updated, or even queried.
        </Para>
        <Para>
          <code>dbt run</code> performs that same compile step and then continues into the graph-building and
          execute phases — it actually sends each compiled statement to the warehouse and creates or updates
          real tables and views. In other words, every <code>dbt run</code> does a full compile internally;{' '}
          <code>dbt compile</code> is simply a way to stop right after that step, on purpose, without touching
          the warehouse at all.
        </Para>
        <CodeBox label="the source model with Jinja — models/marts/fct_daily_revenue.sql">
{`select
    order_date,
    sum(amount_usd) as total_revenue_usd,
    count(distinct order_id) as order_count
from {{ ref('stg_orders') }}
where order_status = 'completed'
group by order_date`}
        </CodeBox>
        <CodeBox label="what dbt compile writes to target/compiled/marts/fct_daily_revenue.sql">
{`select
    order_date,
    sum(amount_usd) as total_revenue_usd,
    count(distinct order_id) as order_count
from "analytics"."dbt_prod"."stg_orders"
where order_status = 'completed'
group by order_date`}
        </CodeBox>
        <Para>
          Notice the <code>&#123;&#123; ref('stg_orders') &#125;&#125;</code> call has been replaced with the
          fully-qualified, environment-correct table name — in this case a production schema called{' '}
          <code>dbt_prod</code>. In a developer's own sandbox environment, compiling that same file would
          resolve <code>ref('stg_orders')</code> to that developer's own personal schema instead, which is
          exactly the environment-portability benefit of never hardcoding table names, covered again in Part
          03.
        </Para>
        <Table
          headers={['', 'dbt compile', 'dbt run']}
          rows={[
            ['Resolves Jinja / ref() / source()', 'Yes', 'Yes'],
            ['Writes plain SQL to target/compiled/', 'Yes', 'Yes (as a side effect of running)'],
            ['Executes SQL against the warehouse', 'No', 'Yes'],
            ['Creates/updates tables or views', 'No', 'Yes'],
            ['Safe to run repeatedly with no side effects', 'Yes — read-only against the warehouse', 'No — it changes warehouse state each time'],
            ['Typical use', 'Debugging generated SQL, previewing what would run', 'Actually building your models'],
          ]}
        />
        <SubTitle>Why dbt compile is a genuinely useful debugging tool</SubTitle>
        <Para>
          When a model's Jinja is complex — a macro generating a dynamic column list, a{' '}
          <code>&#123;% for %&#125;</code> loop building repetitive CASE statements, several layers of nested
          macros — it can be difficult to predict exactly what final SQL will be produced just by reading the
          template. Running <code>dbt compile</code> and opening the corresponding file under{' '}
          <code>target/compiled/</code> shows you the literal, final SQL that would be executed, with zero
          risk to the warehouse, before you commit to actually running it.
        </Para>
        <Callout title="A habit worth building" color={K}>
          Whenever a model's behavior surprises you and Jinja is involved, reach for{' '}
          <code>dbt compile</code> before assuming the bug is in your business logic. A large share of
          "the model produced the wrong numbers" issues turn out to be "the Jinja produced different SQL than
          I thought it would," and compiling shows you the truth directly.
        </Callout>
        <SubTitle>A worked example: a macro that compiles differently than expected</SubTitle>
        <Para>
          Suppose a model uses a macro to generate a list of columns to sum, and the resulting numbers look
          wrong. Rather than guessing at the macro's logic, compiling the model shows exactly what SQL it
          actually produced.
        </Para>
        <CodeBox label="models/marts/fct_regional_totals.sql (the source, with a macro call)">
{`select
    region,
    {{ dbt_utils.star(from=ref('stg_orders'), except=['order_id', 'region']) }}
from {{ ref('stg_orders') }}
group by region`}
        </CodeBox>
        <CodeBox label="target/compiled/.../fct_regional_totals.sql (after dbt compile)">
{`select
    region,
    customer_id,
    order_status,
    order_placed_at,
    amount_usd
from "analytics_staging"."stg_orders"
group by region`}
        </CodeBox>
        <Para>
          Reading the compiled output immediately reveals the actual bug: the macro expanded into a plain
          column list, not a set of aggregations, so grouping by <code>region</code> alongside ungrouped
          columns like <code>customer_id</code> is what the warehouse is actually being asked to do — which is
          invalid in a strict SQL dialect and silently picks an arbitrary value per group in a lenient one.
          Nothing about reading the original Jinja-templated model would have made this obvious; the compiled
          SQL made it obvious in seconds.
        </Para>
      </section>

      <Divider />

      {/* Part 03 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — ref(), source(), and the DAG" />
        <SectionTitle>ref(), source(), and How the DAG Gets Built</SectionTitle>
        <Para>
          The DAG (directed acyclic graph) is dbt's internal map of every dependency in your project. Its
          nodes are the objects dbt manages — models, sources, seeds (static reference data loaded from CSV
          files), and snapshots (point-in-time captures of slowly changing records). Its edges are the
          dependencies declared through two Jinja functions: <code>ref()</code>, which points at another
          model, and <code>source()</code>, which points at a raw table dbt did not create.
        </Para>
        <SubTitle>ref() — referencing another model</SubTitle>
        <Para>
          Writing <code>&#123;&#123; ref('stg_orders') &#125;&#125;</code> inside a model tells dbt two
          things at once: at compile time, resolve this into the fully-qualified name of the{' '}
          <code>stg_orders</code> model in the current environment (a developer's personal schema, a CI
          schema, or production, depending on where dbt is being invoked from); and register a dependency
          edge in the DAG — this model cannot run until <code>stg_orders</code> has run successfully.
        </Para>
        <SubTitle>source() — referencing raw, un-dbt-managed data</SubTitle>
        <Para>
          <code>source()</code> serves the same dependency-tracking purpose as <code>ref()</code>, but for
          tables dbt itself never created — the raw tables landed by an ingestion tool. Sources are declared
          once in a YAML file naming the raw database, schema, and table, and referenced from models with{' '}
          <code>&#123;&#123; source('freshcart_raw', 'orders') &#125;&#125;</code>. This still creates a node
          and an edge in the DAG — a source node has no upstream dependencies of its own within dbt, but
          anything referencing it via <code>source()</code> correctly depends on it.
        </Para>
        <CodeBox label="declaring a source — models/staging/sources.yml">
{`sources:
  - name: freshcart_raw
    database: raw
    schema: freshcart_raw
    tables:
      - name: orders
      - name: customers
      - name: payments`}
        </CodeBox>
        <CodeBox label="the DAG, drawn conceptually, for a small project">
{`sources:
  freshcart_raw.orders  ──┐
  freshcart_raw.customers ┼──> stg_orders ──┐
                          │                  │
                          └──> stg_customers ┼──> fct_daily_revenue
                                              │
                          freshcart_raw.payments ──> stg_payments ──┘

Edges point in the direction of "depends on".
fct_daily_revenue cannot run until stg_orders, stg_customers,
and stg_payments have all run successfully.
stg_orders cannot run until freshcart_raw.orders (a source, not
a model dbt built) exists in the warehouse.`}
        </CodeBox>
        <Para>
          Because both <code>ref()</code> and <code>source()</code> are resolved and recorded during
          compilation — the same phase Part 02 covered — the DAG dbt builds is always derived directly from
          the actual code, not from a diagram someone drew by hand and forgot to update. Add a new{' '}
          <code>ref()</code> call to a model, and the DAG updates itself the next time dbt compiles, with no
          separate step required.
        </Para>
        <Callout title="Circular dependencies are caught, not silently ignored" color="#ff4757">
          If model A contains <code>ref('model_b')</code> and model B contains <code>ref('model_a')</code>,
          directly or through a longer chain, dbt detects the cycle while building the graph and raises a
          compilation error rather than guessing at an order or running one of them with stale data. A valid
          topological sort — covered next in Part 04 — is only possible on a graph with no cycles.
        </Callout>
      </section>

      <Divider />

      {/* Part 04 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Topological Sort and Execution Order" />
        <SectionTitle>Topological Sort — How dbt Decides What Runs First</SectionTitle>
        <Para>
          Once the DAG is built, dbt needs to convert it into a single, valid, linear execution order — a
          list of models to run one after another (or, where safe, in parallel) such that every model appears
          after everything it depends on. The algorithm that produces this ordering from a dependency graph is
          called a topological sort, and it is a well-known technique from graph theory, not something dbt
          invented — the same kind of algorithm underlies build tools like Make resolving compilation order
          for source files.
        </Para>
        <Para>
          A topological sort is only possible on a directed acyclic graph — a graph with no cycles, which is
          exactly what Part 03's circular-dependency check guarantees dbt always has before it gets to this
          step. Intuitively, the algorithm repeatedly picks any node that has no remaining unsatisfied
          dependencies, places it next in the execution order, and removes it from consideration, continuing
          until every node has been placed.
        </Para>
        <CodeBox label="a worked topological sort, using the DAG from Part 03">
{`Nodes and their dependencies:
  stg_orders          depends on: freshcart_raw.orders (source)
  stg_customers        depends on: freshcart_raw.customers (source)
  stg_payments         depends on: freshcart_raw.payments (source)
  fct_daily_revenue    depends on: stg_orders, stg_customers, stg_payments

Step 1: sources have no dbt-managed dependencies -> considered "ready" immediately
Step 2: stg_orders, stg_customers, stg_payments each depend only on a
        source -> all three become ready as soon as their source exists
Step 3: fct_daily_revenue depends on all three staging models -> only
        becomes ready once ALL THREE have completed successfully

One valid execution order dbt might compute:
  1. stg_orders
  2. stg_customers
  3. stg_payments
  4. fct_daily_revenue

Because stg_orders, stg_customers, and stg_payments share no
dependency on each other, dbt can also run them concurrently
(bounded by the --threads setting) rather than strictly sequentially --
the topological sort guarantees a valid ORDER, not that everything
must run one at a time.`}
        </CodeBox>
        <Para>
          That last point matters in practice: dbt's <code>--threads</code> configuration controls how many
          models it will attempt to run concurrently. The topological sort tells dbt which models are safe to
          run at the same time (because neither depends on the other) versus which must wait — it does not
          force everything into a single-file queue.
        </Para>
        <Table
          headers={['Concept', 'What it means in dbt']}
          rows={[
            ['Node', 'A model, source, seed, or snapshot'],
            ['Edge', 'A dependency, created by a ref() or source() call'],
            ['Acyclic', 'No model can (directly or indirectly) depend on itself — dbt errors out if it detects one'],
            ['Topological sort', 'The algorithm that converts the graph into a valid run order'],
            ['--threads', 'How many independent models dbt will execute concurrently within that valid order'],
          ]}
        />
        <Callout title="Selecting a subset of the DAG" color={K}>
          Beyond running everything, dbt lets you target a slice of the graph with the <code>--select</code>{' '}
          flag and graph operators — <code>--select stg_orders+</code> runs <code>stg_orders</code> and
          everything downstream of it; <code>--select +fct_daily_revenue</code> runs{' '}
          <code>fct_daily_revenue</code> and everything upstream it depends on. These operators are only
          meaningful because the DAG already exists as real, computed structure — they are graph traversals,
          not string matching on file names.
        </Callout>
        <SubTitle>What happens when one model in the middle fails</SubTitle>
        <Para>
          The topological sort computes a valid order assuming every model succeeds. In practice, a model
          partway through a run sometimes fails — a warehouse timeout, a syntax error introduced by a bad
          merge, a test-adjacent constraint violation. Understanding exactly what dbt does next is important
          for reasoning about a partially-completed run.
        </Para>
        <CodeBox label="a run where a middle model fails">
{`1 of 4 OK created sql view model staging.stg_orders ......... [CREATE VIEW in 0.51s]
2 of 4 OK created sql view model staging.stg_customers ........ [CREATE VIEW in 0.44s]
3 of 4 ERROR creating sql table model marts.fct_daily_revenue .. [ERROR in 0.88s]
4 of 4 SKIP relation marts.fct_customer_ltv ..................... [SKIPPED]

Completed with 1 error and 1 skip:

Database Error in model fct_daily_revenue (models/marts/fct_daily_revenue.sql)
  Numeric value 'N/A' is not recognized

Done. PASS=2 WARN=0 ERROR=1 SKIP=1 TOTAL=4`}
        </CodeBox>
        <Para>
          <code>stg_orders</code> and <code>stg_customers</code> already succeeded and remain built in the
          warehouse exactly as created — nothing rolls those back. <code>fct_daily_revenue</code> failed, and
          because <code>fct_customer_ltv</code> depends on it (directly through <code>ref()</code>), dbt marks
          it as <strong>SKIPPED</strong> rather than attempting to run it against a dependency that didn't
          successfully build — this is the topological sort's ordering guarantee actively protecting you from
          building on top of a known-bad result, not a separate feature bolted on.
        </Para>
      </section>

      <Divider />

      {/* Part 05 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — What dbt Does Not Do" />
        <SectionTitle>What dbt Deliberately Does Not Do</SectionTitle>
        <Para>
          Module 01 established that dbt does not extract or load data. This module adds two more boundaries
          that matter specifically for understanding how dbt "runs" in a real production environment:
          scheduling and orchestration.
        </Para>
        <SubTitle>dbt does not schedule itself</SubTitle>
        <Para>
          dbt Core has no built-in concept of "run this every morning at 6 AM." It is a command-line tool that
          does work only at the moment it is invoked — <code>dbt run</code> executes once and then the
          process exits. Getting dbt to run on a recurring schedule requires something external to trigger
          it: a cron job on a server, a scheduled task in a CI/CD system, an Airflow DAG with a task that
          shells out to (or uses a dedicated operator to call) dbt, or dbt Cloud's own hosted job scheduler —
          which is one of the concrete things you are paying for when you choose dbt Cloud over self-managing
          dbt Core.
        </Para>
        <CodeBox label="three common ways dbt gets triggered on a schedule">
{`# 1. A simple cron entry on a server with dbt Core installed
0 6 * * * cd /opt/freshcart_dbt && dbt run >> /var/log/dbt_run.log 2>&1

# 2. An Airflow task (conceptually — exact operator syntax varies)
dbt_run_task = BashOperator(
    task_id="run_dbt_models",
    bash_command="cd /opt/freshcart_dbt && dbt run",
)
# scheduled via the surrounding Airflow DAG's schedule_interval

# 3. dbt Cloud's built-in scheduler — configured entirely in the UI,
#    no external cron or Airflow needed; dbt Cloud runs its own
#    hosted dbt Core execution on the schedule you configure`}
        </CodeBox>
        <SubTitle>dbt does not orchestrate cross-tool workflows</SubTitle>
        <Para>
          A related, broader boundary: dbt only orchestrates the models within its own project — it has no
          native concept of "wait for the Fivetran sync to finish before running" or "trigger a Looker cache
          refresh after this run completes." Coordinating dbt with the tools around it (ingestion finishing,
          downstream BI refreshing) is exactly the kind of cross-tool sequencing a dedicated orchestrator like
          Airflow is built for — dbt is typically one task (or a handful of tasks) inside a larger Airflow DAG
          that also has tasks for triggering ingestion and downstream refreshes.
        </Para>
        <Table
          headers={['Responsibility', 'Owned by dbt?', 'Actually owned by']}
          rows={[
            ['Deciding execution order within a dbt project', 'Yes', 'dbt\'s own DAG and topological sort'],
            ['Triggering dbt to run on a schedule', 'No', 'cron, Airflow, CI/CD, or dbt Cloud\'s scheduler'],
            ['Waiting for an upstream ingestion sync to finish first', 'No', 'An orchestrator (e.g. Airflow) coordinating dbt alongside other tools'],
            ['Refreshing a BI tool\'s cache after a dbt run', 'No', 'The BI tool\'s own scheduler, or an orchestrator task after the dbt task'],
          ]}
        />
        <Callout title="Why this separation is intentional, not a missing feature" color={K}>
          Keeping scheduling and cross-tool orchestration out of dbt's own scope keeps dbt focused and
          composable — it works the same way whether it's triggered by a bare cron job on someone's laptop or
          as one task in a large Airflow DAG coordinating a dozen tools. Bolting a scheduler into dbt itself
          would mean reimplementing (and maintaining parity with) what dedicated orchestration tools already do
          well.
        </Callout>
      </section>

      <Divider />

      {/* Part 06 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Materializations: What Actually Gets Created" />
        <SectionTitle>Materializations — Table, View, and What SQL They Actually Produce</SectionTitle>
        <Para>
          When Part 01 said dbt sends each model to the warehouse as a{' '}
          <code>CREATE TABLE AS SELECT</code> or <code>CREATE OR REPLACE VIEW AS</code>, the specific choice
          between those (and a couple of other options) is controlled by a model's materialization — a
          per-model configuration setting. Understanding materializations is what makes the abstract "dbt runs
          your SELECT" description concrete: it explains exactly what object ends up in your warehouse and
          what SQL dbt generates to produce it.
        </Para>
        <Table
          headers={['Materialization', 'What dbt generates', 'When it fits']}
          rows={[
            ['view (often the default)', 'CREATE OR REPLACE VIEW ... AS &lt;your SELECT&gt;', 'Lightweight models, staging layers — no storage cost, always reflects current underlying data, but re-runs the SELECT on every query against it'],
            ['table', 'CREATE TABLE ... AS SELECT (often via a temp/swap pattern to avoid downtime)', 'Expensive-to-compute or frequently-queried models, like large mart tables — storage cost, but fast reads'],
            ['incremental', 'INSERT/MERGE of only new or changed rows into an existing table, instead of rebuilding it fully', 'Very large fact tables where a full rebuild every run is too slow or expensive'],
            ['ephemeral', 'Not created in the warehouse at all — inlined as a CTE into whatever model references it', 'Small, reusable pieces of logic that don\'t need their own physical object'],
          ]}
        />
        <CodeBox label="configuring a model's materialization">
{`-- models/marts/fct_daily_revenue.sql
{{ config(materialized='table') }}

select
    order_date,
    sum(amount_usd) as total_revenue_usd
from {{ ref('stg_orders') }}
group by order_date`}
        </CodeBox>
        <Para>
          This is the last piece connecting compilation back to real warehouse objects: dbt resolves the{' '}
          <code>ref()</code> call as before, wraps the resulting SELECT in whatever DDL the configured
          materialization calls for, and that wrapped statement is exactly what gets executed in the fourth
          phase from Part 01.
        </Para>
        <SubTitle>Incremental models — a closer look, since they work differently from the rest</SubTitle>
        <Para>
          Table and view materializations rebuild the entire result from scratch on every run — fine for
          moderate data volumes, but wasteful once a fact table holds hundreds of millions of rows and only a
          small slice of it changes between runs. An incremental model instead runs its full SELECT only on
          the first build; on every subsequent run, it runs a much narrower query that only processes new or
          changed rows, then merges or inserts just those rows into the existing table.
        </Para>
        <CodeBox label="an incremental model — models/marts/fct_events.sql">
{`{{
  config(
    materialized='incremental',
    unique_key='event_id'
  )
}}

select
    event_id,
    user_id,
    event_type,
    event_at
from {{ ref('stg_events') }}

{% if is_incremental() %}
  where event_at > (select max(event_at) from {{ this }})
{% endif %}`}
        </CodeBox>
        <Para>
          The <code>&#123;% if is_incremental() %&#125;</code> block is itself Jinja, resolved at compile
          time exactly like <code>ref()</code> and <code>source()</code> — on the very first run (when the
          target table doesn't exist yet), <code>is_incremental()</code> evaluates to false and the whole
          history is selected; on every later run, it evaluates to true and the extra{' '}
          <code>where</code> clause limits the query to rows newer than whatever is already in the table,
          referenced via the special <code>&#123;&#123; this &#125;&#125;</code> variable pointing back at the
          model's own existing output.
        </Para>
        <Table
          headers={['Materialization', 'What changes on a re-run']}
          rows={[
            ['view', 'Nothing is stored — the SELECT re-runs live every time the view is queried'],
            ['table', 'Entire result set is fully recomputed and replaces the existing table'],
            ['incremental', 'Only new/changed rows (per the is_incremental() logic) are computed and merged into the existing table'],
          ]}
        />
      </section>

      <Divider />

      {/* Part 07 — worked example */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked Example" />
        <SectionTitle>A Complete Worked Example: Source → Staging → Mart</SectionTitle>
        <Para>
          Bringing every piece from this module together, here is a full three-model chain traced through
          compilation and execution, start to finish, for FreshCart's orders pipeline.
        </Para>
        <SubTitle>Step 1 — the raw source, already landed by ingestion</SubTitle>
        <Para>
          Fivetran has already landed a raw <code>orders</code> table into{' '}
          <code>raw.freshcart_raw.orders</code>, entirely outside of dbt's involvement, on its own schedule.
          This table has messy, application-native column names and includes soft-deleted test orders that
          should never reach analytics.
        </Para>
        <CodeBox label="declaring the source — models/staging/sources.yml">
{`sources:
  - name: freshcart_raw
    database: raw
    schema: freshcart_raw
    tables:
      - name: orders`}
        </CodeBox>
        <SubTitle>Step 2 — the staging model, cleaning the raw data</SubTitle>
        <CodeBox label="models/staging/stg_orders.sql">
{`select
    ord_id                              as order_id,
    cust_id                             as customer_id,
    ord_stat                            as order_status,
    cast(ord_placed_ts as timestamp)    as order_placed_at,
    amt_cents / 100.0                   as amount_usd
from {{ source('freshcart_raw', 'orders') }}
where is_deleted = false`}
        </CodeBox>
        <SubTitle>Step 3 — the mart model, aggregating for the business</SubTitle>
        <CodeBox label="models/marts/fct_daily_revenue.sql">
{`{{ config(materialized='table') }}

select
    date_trunc('day', order_placed_at) as order_date,
    sum(amount_usd)                    as total_revenue_usd,
    count(distinct order_id)           as order_count
from {{ ref('stg_orders') }}
where order_status = 'completed'
group by 1`}
        </CodeBox>
        <SubTitle>Step 4 — compilation</SubTitle>
        <Para>
          Running <code>dbt compile</code> (or the compile phase inside <code>dbt run</code>) resolves the{' '}
          <code>source()</code> call in <code>stg_orders</code> into the literal raw table name, and resolves
          the <code>ref()</code> call in <code>fct_daily_revenue</code> into the environment-correct name of
          the <code>stg_orders</code> object — here, assume it materializes as a view in a schema called{' '}
          <code>analytics_staging</code>.
        </Para>
        <CodeBox label="target/compiled/.../stg_orders.sql">
{`select
    ord_id                              as order_id,
    cust_id                             as customer_id,
    ord_stat                            as order_status,
    cast(ord_placed_ts as timestamp)    as order_placed_at,
    amt_cents / 100.0                   as amount_usd
from "raw"."freshcart_raw"."orders"
where is_deleted = false`}
        </CodeBox>
        <CodeBox label="target/compiled/.../fct_daily_revenue.sql">
{`select
    date_trunc('day', order_placed_at) as order_date,
    sum(amount_usd)                    as total_revenue_usd,
    count(distinct order_id)           as order_count
from "analytics_staging"."stg_orders"
where order_status = 'completed'
group by 1`}
        </CodeBox>
        <SubTitle>Step 5 — DAG and execution order</SubTitle>
        <Para>
          From these two resolved references, dbt's DAG records: <code>stg_orders</code> depends on the{' '}
          <code>freshcart_raw.orders</code> source; <code>fct_daily_revenue</code> depends on{' '}
          <code>stg_orders</code>. The topological sort from Part 04 produces the only valid order:{' '}
          <code>stg_orders</code> first, <code>fct_daily_revenue</code> second.
        </Para>
        <SubTitle>Step 6 — execution against the warehouse</SubTitle>
        <Output>{`$ dbt run --select stg_orders fct_daily_revenue
Running with dbt=1.8.0

1 of 2 START sql view model analytics_staging.stg_orders ..... [RUN]
1 of 2 OK created sql view model analytics_staging.stg_orders  [CREATE VIEW in 0.61s]
2 of 2 START sql table model analytics.fct_daily_revenue ...... [RUN]
2 of 2 OK created sql table model analytics.fct_daily_revenue  [CREATE TABLE in 1.84s]

Completed successfully

Done. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2`}</Output>
        <Para>
          Notice the output confirms the exact order the DAG required — <code>stg_orders</code> completed
          before <code>fct_daily_revenue</code> even started — and shows each model's actual materialization
          (view, then table) matching the configuration from Part 06. This is the entire mechanism from Parts
          01 through 06, applied to one concrete, realistic pipeline.
        </Para>
        <SubTitle>What would change if a fourth model joined the chain</SubTitle>
        <Para>
          Suppose a fourth model, <code>fct_customer_ltv</code>, is added, referencing both{' '}
          <code>fct_daily_revenue</code> and a new <code>stg_customers</code> staging model. Nothing about how
          <code>stg_orders</code> or <code>fct_daily_revenue</code> is written needs to change — the DAG
          simply grows a new node and new edges the moment <code>fct_customer_ltv</code>'s <code>ref()</code>{' '}
          calls are compiled, and the topological sort recomputes a valid order that places{' '}
          <code>fct_customer_ltv</code> after both of its dependencies. Adding a new model is a purely
          additive operation on the dependency graph — it never requires manually re-sequencing models that
          already exist, which is exactly the scalability property the DAG is built to provide.
        </Para>
      </section>

      <Divider />

      {/* Misconceptions */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Common Misconceptions About How dbt Works</SectionTitle>
        <Para>
          Five beliefs that trip people up once they move past "what dbt is" and start reasoning about its
          actual mechanics.
        </Para>
        {MYTHS.map(m => <MythCard key={m.wrong} wrong={m.wrong} right={m.right} />)}
      </section>

      <Divider />

      {/* Real world story */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real-World Stories" />
        <SectionTitle>Why This Actually Matters — Three Real Scenarios</SectionTitle>
        <HighlightBox>
          <Para><strong>At Airbnb:</strong></Para>
          <Para>
            An analytics engineer on a listings-quality team makes a change to a shared staging model and,
            before merging, wants to see exactly what SQL will be generated for the several downstream mart
            models that reference it — without touching the warehouse and without waiting for a full{' '}
            <code>dbt run</code> against a large project. Running <code>dbt compile --select stg_listings+</code>{' '}
            and reading the generated files under <code>target/compiled/</code> lets them verify the join
            logic resolved correctly in seconds, entirely safely, before ever executing anything for real.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>At JetBlue:</strong></Para>
          <Para>
            A data platform team debugging a nightly pipeline failure sees that a downstream flight-delay mart
            model failed with a "relation does not exist" error. Because they understand the DAG and
            topological sort, they immediately check whether the specific staging model it depends on
            actually succeeded earlier in the same run, rather than assuming the mart model's own SQL is
            broken — and they find the real cause: a --select flag in that night's CI job had accidentally
            excluded the staging model from the run entirely.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>At Faire:</strong></Para>
          <Para>
            A team migrating a large events table to an incremental materialization to cut nightly run time
            discovers, a few weeks later, that a small number of late-arriving events — records that show up
            in the source system a day or two after their actual event timestamp — are being permanently
            missed, because the incremental filter only looked forward from the last processed timestamp and
            never re-checked a trailing window. Understanding exactly how the <code>is_incremental()</code>{' '}
            logic and the <code>&#123;&#123; this &#125;&#125;</code> reference work, as covered in Part 06,
            is what let the team diagnose this precisely as a filter-logic problem and fix it by widening the
            incremental window with a small lookback buffer, rather than reverting to a full table rebuild
            out of caution.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>In a system design / analytics-engineering interview:</strong></Para>
          <Para>
            A candidate is asked what would happen if dbt tried to run a mart model before its staging
            dependency finished successfully. A weak answer says "dbt handles that automatically" without
            explaining how. A strong answer explains the actual mechanism — the DAG built from resolved{' '}
            <code>ref()</code> calls, the topological sort computed from that graph, and the guarantee that a
            model is never scheduled for execution until every node it depends on has completed — which is
            precisely the depth covered in Part 03 and Part 04.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* Interview Prep */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>Interview Questions You Should Be Able to Answer</SectionTitle>
        {INTERVIEW_QA.map((item, i) => (
          <div key={item.q} style={{ marginBottom: 34 }}>
            <SubTitle>{i + 1}. {item.q}</SubTitle>
            {item.a}
          </div>
        ))}
      </section>

      <Divider />

      {/* Common Mistakes */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Common Mistakes Beginners Make</SectionTitle>
        {MISTAKES.map(m => (
          <div key={m.title} style={{ marginBottom: 22 }}>
            <SubTitle>{m.title}</SubTitle>
            <Para>{m.body}</Para>
          </div>
        ))}
      </section>

      <Divider />

      {/* Error Library */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You'll Actually Hit</SectionTitle>
        {ERRORS.map(e => (
          <div key={e.title} style={{ marginBottom: 22 }}>
            <CodeBox label="error">{e.title}</CodeBox>
            <Para>{e.body}</Para>
          </div>
        ))}
      </section>

      <Divider />

      {/* Part 08 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Debugging a Failed Run, End to End" />
        <SectionTitle>Putting It Together: Debugging a Real Failed Run</SectionTitle>
        <Para>
          As a final worked example, here is how the mechanics from this entire module come together when
          diagnosing a real production failure, rather than each covered in isolation.
        </Para>
        <Para>
          A nightly <code>dbt run</code>, triggered by an Airflow task (Part 05), fails partway through with
          an error on <code>fct_daily_revenue</code>. The on-call analytics engineer's first move, using the
          reasoning from Part 07's SKIP behavior, is to check whether the failure is in{' '}
          <code>fct_daily_revenue</code> itself or in one of its upstream dependencies that silently failed
          first — the run output (Part 01) shows exactly which models passed, failed, and were skipped, so this
          takes seconds, not guesswork.
        </Para>
        <CodeBox label="the relevant slice of the failed run's output">
{`3 of 6 OK created sql view model staging.stg_orders ......... [CREATE VIEW in 0.49s]
4 of 6 ERROR creating sql table model marts.fct_daily_revenue .. [ERROR in 0.71s]

Database Error in model fct_daily_revenue (models/marts/fct_daily_revenue.sql)
  Numeric value 'N/A' is not recognized`}
        </CodeBox>
        <Para>
          <code>stg_orders</code> succeeded, so the problem is specifically in{' '}
          <code>fct_daily_revenue</code>'s own logic or the data it's reading — not a missing dependency. The
          next move, following the habit from Part 02, is <code>dbt compile --select fct_daily_revenue</code>{' '}
          to see the exact SQL that was sent to the warehouse, since the raw error message alone doesn't say
          which column or expression produced the bad numeric value.
        </Para>
        <CodeBox label="target/compiled/.../fct_daily_revenue.sql, after compiling to inspect it">
{`select
    order_date,
    sum(amount_usd) as total_revenue_usd,
    count(distinct order_id) as order_count
from "analytics_staging"."stg_orders"
where order_status = 'completed'
group by 1`}
        </CodeBox>
        <Para>
          The compiled SQL looks correct on its face — the bug must be in the underlying data, specifically in{' '}
          <code>amount_usd</code>, which is supposed to always be numeric. Tracing back to{' '}
          <code>stg_orders</code>'s own logic (Part 07's worked example) reveals the actual root cause: a
          recent, unannounced change in the raw source system started sending the literal string{' '}
          <code>"N/A"</code> in the amount field for a small number of orders instead of leaving it null, and
          the staging model's cast wasn't defensive against that case.
        </Para>
        <Callout title="What made this diagnosable in minutes, not hours" color={K}>
          Every piece of this diagnosis relied on a mechanic covered earlier in this module: the run output
          showing exactly which model failed and which succeeded (Part 01), the SKIP behavior confirming no
          upstream dependency silently failed first (Part 04), and <code>dbt compile</code> revealing the
          literal SQL actually sent to the warehouse (Part 02) rather than requiring the engineer to guess at
          what the Jinja produced. None of this required special tooling beyond dbt itself.
        </Callout>
        <Para>
          The permanent fix, once the root cause is understood, is to make <code>stg_orders</code>'s cast
          defensive — for example, using a <code>try_cast</code> or an explicit{' '}
          <code>case when amount_cents ~ '^[0-9]+$' then ... else null end</code> pattern depending on the
          warehouse's SQL dialect — combined with adding a <code>not_null</code> or custom test on the
          resulting column so that any future recurrence of malformed source data fails loudly at the staging
          layer, immediately, rather than surfacing three models downstream as a cryptic numeric error with no
          obvious connection to its actual cause.
        </Para>
      </section>

      <KeyTakeaways
        items={[
          '`dbt run` reads the project, compiles Jinja/ref()/source() into plain SQL, builds a DAG from those resolved dependencies, topologically sorts it, then executes each model against the warehouse in that order.',
          '`dbt compile` performs only the read-and-compile step and writes the resolved SQL to target/compiled/ without touching the warehouse — an essential, side-effect-free debugging tool for anything involving Jinja.',
          'The DAG\'s nodes are models, sources, seeds, and snapshots; its edges are ref()/source() calls — and it guarantees a model never runs until everything it depends on has run successfully.',
          'dbt has no built-in scheduler and does not orchestrate other tools — something external (cron, Airflow, CI, or dbt Cloud\'s scheduler) must trigger it, and a separate orchestrator coordinates it alongside ingestion and BI tools.',
          'A model\'s materialization (view, table, incremental, ephemeral) determines exactly what DDL/DML dbt generates and executes for it.',
          'Tracing a real source → staging → mart chain end to end shows every mechanic in this module working together: source() and ref() resolution, DAG construction, topological sort, and materialization-driven execution.',
        ]}
      />
    </LearnLayout>
  )
}
