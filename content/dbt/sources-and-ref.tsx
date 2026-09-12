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

export default function SourcesAndRef() {
  return (
    <LearnLayout
      title="Sources, ref(), and the Dependency Graph"
      description="What a dbt source actually is, why you declare raw tables instead of hardcoding them, source freshness checks, how ref() mechanically resolves models across environments, and how dbt statically builds its DAG from ref()/source() calls."
      section="dbt — Module 05"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Sources, ref(), and the Dependency Graph', href: '/learn/dbt/sources-and-ref' },
      ]}
      prev={{ title: 'Models: SELECT Statements as the Building Block', href: '/learn/dbt/models-basics' }}
      next={{ title: 'Materializations: View, Table, Incremental, Ephemeral', href: '/learn/dbt/materializations' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a source actually is" />
        <SectionTitle>A Source Is Raw Data dbt Reads, Never Data dbt Creates</SectionTitle>
        <Para>
          The previous module showed dbt models as SELECT statements saved to `.sql` files, each one
          building on another. But every dependency chain has to start somewhere — a model's SELECT has to
          read from a table that already exists in the warehouse before dbt ever ran. That starting table is
          a <strong>source</strong>. A source is a named reference, declared in a `.yml` file, to a raw table
          that was loaded by something outside dbt entirely — a Fivetran connector, an Airbyte sync, a
          Snowpipe or COPY INTO job, a batch ETL script, an application's change-data-capture stream landing
          directly in the warehouse.
        </Para>
        <Para>
          This is the single most important distinction to internalize before writing a real dbt project:
          <strong> sources are raw tables dbt reads but does not own.</strong> dbt never runs `CREATE TABLE`
          for a source. It never runs `INSERT` into a source. It never truncates, drops, or modifies a source
          in any way. A model is something dbt builds — dbt owns the DDL, the schema, the refresh schedule,
          everything about its lifecycle. A source is something dbt merely acknowledges exists, so that it can
          be referenced safely, tracked in lineage, and checked for freshness.
        </Para>
        <HighlightBox>
          <Para>
            <strong>The confusion this module exists to prevent:</strong> new dbt users frequently assume
            declaring something in `sources.yml` somehow creates or manages that table, the same way defining
            a model creates a table or view. It does not. Declaring a source is closer to writing down an
            address — it is documentation and a machine-readable pointer to something that is already there,
            built and maintained by a completely separate system. If the underlying raw table does not
            actually exist yet, declaring it as a source changes nothing about that; dbt will simply fail with
            a "table not found" error the first time a model tries to read from it.
          </Para>
        </HighlightBox>
        <CodeBox label="models/staging/sources.yml — declaring a raw table dbt did not create">
{`version: 2

sources:
  - name: raw
    database: analytics
    schema: raw
    tables:
      - name: orders
        description: "Raw order events loaded by Fivetran from the app's Postgres database, roughly every 15 minutes."
        loaded_at_field: _fivetran_synced
      - name: customers
        description: "Raw customer records, loaded by the same Fivetran connector."
        loaded_at_field: _fivetran_synced`}
        </CodeBox>
        <Para>
          Notice what this YAML file does <em>not</em> contain: no `CREATE TABLE` statement, no column
          definitions, no partitioning strategy, nothing that would actually build `raw.orders`. It only names
          the database, schema, and table that some other system is responsible for populating. dbt's only
          job here is to remember that this table exists, under this name, so that any model referencing it
          through <code>source()</code> can be validated, documented, and tracked.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why declare sources at all" />
        <SectionTitle>Why Not Just Write FROM raw.orders Directly?</SectionTitle>
        <Para>
          A reasonable first question: if a source declaration doesn't create anything, why not skip the YAML
          entirely and just write <code>FROM raw.orders</code> directly in a model's SQL? The table exists
          either way — the query would run and return the same rows. The answer is that declaring the source
          buys you three things a hardcoded table reference cannot give you, and all three matter more as a
          project grows past a handful of models.
        </Para>
        <SubTitle>1. Lineage tracking</SubTitle>
        <Para>
          dbt builds a dependency graph (covered in full in Part 05) by statically parsing every model's
          compiled SQL for <code>ref()</code> and <code>source()</code> calls. If a model reads a raw table
          through a hardcoded string like <code>FROM analytics.raw.orders</code>, dbt has no way to know that
          model depends on that raw table at all — as far as dbt's graph is concerned, that model has no
          upstream dependency, it just materializes out of nowhere. Run <code>dbt docs generate</code> and the
          generated lineage graph will show that model floating with no incoming edge, which makes the
          generated documentation actively misleading about where the data really comes from.
        </Para>
        <SubTitle>2. Source freshness checks</SubTitle>
        <Para>
          dbt can only check whether a raw table is being refreshed on schedule if it knows that table exists
          and where its "last loaded" timestamp lives. This is the <code>dbt source freshness</code> command,
          covered in depth in Part 03 — it is only possible at all because the source was declared with a
          <code>loaded_at_field</code>. A hardcoded table reference gives dbt nothing to check against.
        </Para>
        <SubTitle>3. A single place to change the underlying location</SubTitle>
        <Para>
          Raw tables move. A company migrates from one Fivetran connector to a custom CDC pipeline landing
          data in a differently named schema. A database gets renamed during a platform migration. A team
          consolidates three raw schemas into one. If every model hardcodes <code>FROM raw.orders</code>,
          that string has to be found and changed in every single model file that touches it — easy to miss
          one, and each miss is a silent bug where half your models point at the old table and half at the
          new one. If every model instead calls <code>{'{{'} source('raw', 'orders') {'}}'}</code>, the fix is
          one line changed in one YAML file. Every model that reads through that source call picks up the new
          location automatically the next time dbt compiles.
        </Para>
        <CodeBox label="The hardcoded anti-pattern versus the source() call">
{`-- Anti-pattern: hardcoded raw table reference
SELECT order_id, customer_id, order_ts, status
FROM analytics.raw.orders          -- dbt has no idea this dependency exists
WHERE order_id IS NOT NULL

-- Correct: source() reference
SELECT order_id, customer_id, order_ts, status
FROM {{ source('raw', 'orders') }}  -- dbt tracks this in lineage and freshness
WHERE order_id IS NOT NULL`}
        </CodeBox>
        <Callout title="A hardcoded raw table reference is invisible to dbt, not just untidy" color={K}>
          It is tempting to treat <code>{'{{'} source(...) {'}}'}</code> as a stylistic nicety over
          <code>FROM raw.orders</code> — slightly more verbose, functionally identical. It is not functionally
          identical. dbt's entire dependency graph, freshness tooling, and generated documentation are built
          by statically parsing for <code>ref()</code> and <code>source()</code> calls. A hardcoded reference
          produces working SQL and a broken understanding of your own project's dependencies.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Source freshness" />
        <SectionTitle>dbt source freshness — Catching a Stalled Pipeline Before It Poisons Your Marts</SectionTitle>
        <Para>
          Upstream pipelines fail silently more often than they fail loudly. A Fivetran connector's
          credentials expire. A CDC replication slot falls behind and eventually gets dropped. A batch job
          that used to run every hour gets orphaned after an infrastructure migration and nobody notices for
          three days. In every one of these cases, the raw table does not disappear and does not error —
          it simply stops receiving new rows. Every downstream dbt model keeps running successfully,
          producing a mart that looks complete and correct, built entirely from data that is now three days
          stale. Nothing in that pipeline raises an error, because nothing is technically broken — new rows
          just aren't arriving.
        </Para>
        <Para>
          Source freshness closes this gap. When a source table is declared with a
          <code>loaded_at_field</code> — a column recording when each row was loaded, not when the business
          event happened — dbt can compare the most recent value of that field against the current time and
          decide whether the table is fresh enough to trust.
        </Para>
        <CodeBox label="sources.yml with freshness thresholds configured">
{`version: 2

sources:
  - name: raw
    database: analytics
    schema: raw
    tables:
      - name: orders
        loaded_at_field: _fivetran_synced
        freshness:
          warn_after: {count: 6, period: hour}
          error_after: {count: 24, period: hour}
      - name: customers
        loaded_at_field: _fivetran_synced
        freshness:
          warn_after: {count: 12, period: hour}
          error_after: {count: 48, period: hour}`}
        </CodeBox>
        <Para>
          Running <code>dbt source freshness</code> executes, for each declared source table, roughly the
          equivalent of <code>SELECT MAX(_fivetran_synced) FROM raw.orders</code>, then compares the age of
          that maximum timestamp against <code>warn_after</code> and <code>error_after</code>. If the newest
          row is older than <code>warn_after</code>, the check reports a warning but does not fail the run. If
          it is older than <code>error_after</code>, the check fails outright — and in a well-built pipeline,
          that failure is wired to stop the rest of the run before any mart gets rebuilt from stale data.
        </Para>
        <CodeBox label="Running the freshness check">
{`dbt source freshness`}
        </CodeBox>
        <Output>{`14:02:11  Concurrency: 4 threads (target='prod')
14:02:12  1 of 2 START freshness of raw.orders ......................... [RUN]
14:02:12  2 of 2 START freshness of raw.customers ...................... [RUN]
14:02:13  1 of 2 WARN freshness of raw.orders .......................... [WARN in 0.41s]
14:02:13  2 of 2 PASS freshness of raw.customers ....................... [PASS in 0.38s]
14:02:13
14:02:13  Done.
14:02:13  Warnings: raw.orders is 7 hours, 12 minutes past its warn_after threshold of 6 hours.`}
        </Output>
        <Para>
          The practical value here is timing. Without a freshness check, the first sign of a stalled orders
          pipeline is usually a confused Slack message from a business stakeholder asking why yesterday's
          revenue dashboard looks flat — hours or days after the actual problem started, and after several
          rebuilt marts have already baked stale data into reports people made decisions from. With a
          freshness check running on a schedule (typically right before the main <code>dbt build</code>), the
          warning shows up as soon as the raw pipeline first falls behind schedule, before a single downstream
          mart has been touched.
        </Para>
        <Table
          headers={['Setting', 'What it means', 'What crossing it does']}
          rows={[
            ['loaded_at_field', 'The column recording when a row was loaded into the warehouse — not a business timestamp like order_ts.', 'Required for any freshness check to run at all.'],
            ['warn_after', 'The maximum acceptable age of the newest row before something looks off.', 'Reports a warning; the run continues.'],
            ['error_after', 'The maximum acceptable age before the data is unusable.', 'Fails the freshness check, which can be wired to block a subsequent dbt build.'],
          ]}
        />
        <Callout title="loaded_at_field is not the same as a business timestamp" color={K}>
          A common mistake is pointing <code>loaded_at_field</code> at <code>order_ts</code> (when the order
          happened) instead of a true load timestamp (when the row arrived in the warehouse). Freshness is
          about pipeline health, not business recency — an order placed three days ago that loaded five
          minutes ago is perfectly fresh data; an order placed five minutes ago that has not loaded in three
          days is a stalled pipeline. Using the wrong field silently defeats the entire check.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — What ref() actually does" />
        <SectionTitle>ref() Resolves a Model's Fully-Qualified Name — And Adapts to Whatever Environment Is Running</SectionTitle>
        <Para>
          Where <code>source()</code> points at raw tables dbt did not build, <code>ref()</code> points at
          another dbt model — something dbt itself will build (or has already built) during this same run.
          Mechanically, <code>ref()</code> is a Jinja function. When dbt compiles a model's SQL, every
          <code>{'{{'} ref('some_model') {'}}'}</code> call is replaced with the fully-qualified database,
          schema, and table (or view) name that <code>some_model</code> will resolve to, for whichever
          environment this specific run is targeting.
        </Para>
        <Para>
          That last clause is the part that makes <code>ref()</code> more than a glorified string
          substitution. The same model file, containing the exact same <code>ref('stg_orders')</code> call,
          compiles to a completely different fully-qualified name depending on who is running it and against
          which target. A developer running <code>dbt run --target dev</code> on their own laptop gets
          <code>dev_asil.stg_orders</code>. The scheduled production job running
          <code>dbt run --target prod</code> gets <code>prod.stg_orders</code>. Nobody wrote
          environment-specific branching logic to make that happen — it falls directly out of how
          <code>ref()</code> resolves names using the active connection profile's configured schema.
        </Para>
        <CodeBox label="The same ref() call, compiling differently per target">
{`-- models/marts/daily_revenue.sql (the file, unchanged across environments)
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('stg_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1

-- compiled output when run with: dbt run --target dev
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM dev_asil.stg_orders
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1

-- compiled output when run with: dbt run --target prod
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM prod.stg_orders
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1`}
        </CodeBox>
        <Para>
          Without this, every team running dbt across dev, CI, and prod would need either separate copies of
          every model file per environment, or hand-written Jinja conditionals scattered through every model
          checking which target is active — both approaches that scale terribly and invite exactly the kind
          of silent divergence between environments that <code>ref()</code> is designed to prevent.
          <code>ref()</code> means one canonical model file works correctly, unmodified, in every environment
          the project is ever run against, including one that does not exist yet — a new CI schema stood up
          next month resolves <code>ref('stg_orders')</code> correctly without a single line of that model's
          SQL changing.
        </Para>
        <Callout title="ref() also works before the referenced model has ever been built" color={K}>
          On a brand-new project's very first run, <code>stg_orders</code> does not exist in any schema yet.
          <code>ref('stg_orders')</code> still compiles correctly, because dbt is not looking up an existing
          table when it compiles — it is computing the name that model is configured to resolve to, and
          relying on its own execution order (Part 05) to have already built it by the time this SELECT
          actually runs.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — How ref() and source() build the DAG" />
        <SectionTitle>Static Parsing: How dbt Knows Execution Order Before Running Anything</SectionTitle>
        <Para>
          A dbt project can contain hundreds of models. Before dbt runs a single one of them, it has to
          decide the order — <code>stg_orders</code> must finish before <code>fct_orders</code> starts,
          which must finish before <code>daily_revenue</code> starts. dbt figures this out without executing
          any SQL at all, through a step called parsing: before any model runs, dbt reads every model file's
          Jinja and finds every <code>ref()</code> and <code>source()</code> call inside it, without
          evaluating the SQL itself.
        </Para>
        <Para>
          Each <code>ref('model_x')</code> found inside <code>model_y</code>'s file becomes a directed edge
          in a graph: an arrow from <code>model_x</code> to <code>model_y</code>, meaning <code>model_x</code>
          must be built first. Do this across every model file in the project and the result is the DAG —
          Directed Acyclic Graph — a complete map of what depends on what, built entirely from these
          statically-discovered function calls, before a single <code>CREATE TABLE</code> or
          <code>CREATE VIEW</code> is executed against the warehouse.
        </Para>
        <CodeBox label="A worked example — three models chained by ref() and source()">
{`# models/staging/sources.yml
version: 2
sources:
  - name: raw
    database: analytics
    schema: raw
    tables:
      - name: orders
        loaded_at_field: _fivetran_synced

-- models/staging/stg_orders.sql
SELECT
  order_id,
  customer_id,
  order_ts,
  LOWER(status) AS status,
  total_usd
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL

-- models/marts/fct_orders.sql
SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM {{ ref('stg_orders') }}
WHERE status != 'test_order'

-- models/marts/daily_revenue.sql
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('fct_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1`}
        </CodeBox>
        <Para>
          Parsing this project finds one <code>source()</code> call (in <code>stg_orders</code>) and two
          <code>ref()</code> calls (in <code>fct_orders</code> and <code>daily_revenue</code>). From just
          those three function calls, dbt derives the entire execution order without being told it explicitly
          by any config file or orchestration script:
        </Para>
        <CodeBox label="The derived DAG">
{`raw.orders (source, not built by dbt)
   │
   ▼  {{ source('raw', 'orders') }}
stg_orders
   │
   ▼  {{ ref('stg_orders') }}
fct_orders
   │
   ▼  {{ ref('fct_orders') }}
daily_revenue

dbt run execution order: stg_orders -> fct_orders -> daily_revenue
(raw.orders is never "run" -- it is read, checked for freshness, never built)`}
        </CodeBox>
        <Para>
          This is exactly why the anti-pattern from Part 02 — a hardcoded <code>FROM prod.stg_orders</code>
          instead of <code>{'{{'} ref('stg_orders') {'}}'}</code> — is not a stylistic shortcut but a
          correctness bug waiting to happen. If <code>fct_orders</code> hardcodes the reference instead of
          calling <code>ref()</code>, dbt's parser finds no dependency edge between the two models at all. Run
          <code>dbt run</code> and there is no guarantee <code>stg_orders</code> finishes — or even runs —
          before <code>fct_orders</code> does; they could execute in either order, or in parallel across
          threads, and <code>fct_orders</code> could read a stale or half-built version of the table it
          silently depends on. The bug does not show up every time — it shows up intermittently, exactly the
          kind of failure that is hardest to reproduce and debug.
        </Para>
        <Callout title="dbt never inspects the warehouse to build the DAG" color={K}>
          It is worth being precise about this: dbt does not query the database's information schema to
          figure out real table dependencies, and it does not execute any SQL to determine order. The entire
          DAG comes from statically parsing the Jinja text of every model file for <code>ref()</code> and
          <code>source()</code> calls. This is exactly why those calls are the only way dbt can know about a
          dependency — there is no other mechanism it uses at all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Selecting subsets of the DAG" />
        <SectionTitle>Once dbt Has the Graph, You Can Run Slices of It</SectionTitle>
        <Para>
          The practical payoff of having a real, statically-derived DAG (rather than a project where humans
          manually order scripts) is that dbt's <code>--select</code> flag can run precise subsets of it using
          graph operators, without you ever having to reason about ordering by hand.
        </Para>
        <CodeBox label="Common --select graph operators">
{`dbt run --select stg_orders           # just this one model
dbt run --select stg_orders+          # this model and everything downstream of it
dbt run --select +fct_orders          # this model and everything upstream of it
dbt run --select stg_orders+2         # downstream, but only 2 levels deep
dbt run --select tag:finance          # every model tagged "finance" in its config
dbt build --select state:modified+    # anything changed since a saved manifest, plus its downstream`}
        </CodeBox>
        <Para>
          Every one of these operators is only possible because the DAG already exists before the run starts.
          <code>stg_orders+</code> means "walk every downstream edge from this node" — dbt can answer that
          instantly because the edges were already computed during parsing. None of this works if models
          reference each other through hardcoded table names instead of <code>ref()</code>/<code>source()</code>
          — there would be no graph to walk in the first place, just a pile of SQL files dbt has no way to
          relate to one another.
        </Para>
        <Table
          headers={['Operator', 'Meaning', 'Typical use']}
          rows={[
            ['model_name', 'Exactly this model, nothing else.', 'Iterating on a single model during development.'],
            ['model_name+', 'This model plus everything downstream.', 'Verifying a change did not break anything built on top of it.'],
            ['+model_name', 'This model plus everything upstream.', 'Rebuilding all the inputs a broken mart depends on.'],
            ['tag:some_tag', 'Every model with that tag in its config.', 'Running just one business domain, e.g. tag:finance.'],
            ['state:modified+', 'Models changed since a saved manifest, plus downstream.', 'Fast, targeted CI runs instead of rebuilding the entire project.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The full worked example" />
        <SectionTitle>A Complete Source-to-Staging-to-Mart Chain, End to End</SectionTitle>
        <Para>
          Putting everything in this module together: a full, runnable three-model chain, starting from a raw
          source table nobody at the dbt layer built, through a staging model, to a mart a BI tool would
          actually query.
        </Para>
        <SubTitle>Step 1 — declare the source</SubTitle>
        <CodeBox label="models/staging/sources.yml">
{`version: 2

sources:
  - name: raw
    database: analytics
    schema: raw
    tables:
      - name: orders
        description: "Raw order events, loaded by Fivetran roughly every 15 minutes."
        loaded_at_field: _fivetran_synced
        freshness:
          warn_after: {count: 6, period: hour}
          error_after: {count: 24, period: hour}`}
        </CodeBox>
        <SubTitle>Step 2 — build the staging model, referencing the source</SubTitle>
        <CodeBox label="models/staging/stg_orders.sql">
{`SELECT
  order_id::varchar        AS order_id,
  customer_id::varchar     AS customer_id,
  order_ts::timestamp      AS order_ts,
  LOWER(status)            AS status,
  total_usd::numeric(12,2) AS total_usd,
  _fivetran_synced         AS loaded_at
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL`}
        </CodeBox>
        <SubTitle>Step 3 — build a mart, referencing the staging model</SubTitle>
        <CodeBox label="models/marts/finance/fct_orders.sql">
{`SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM {{ ref('stg_orders') }}
WHERE status != 'test_order'`}
        </CodeBox>
        <SubTitle>Step 4 — build a second mart, referencing the first mart</SubTitle>
        <CodeBox label="models/marts/finance/daily_revenue.sql">
{`SELECT
  DATE(order_ts) AS order_date,
  COUNT(*)       AS order_count,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('fct_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1
ORDER BY 1`}
        </CodeBox>
        <Para>
          Running <code>dbt build</code> against this project executes, in order: the source freshness check
          against <code>raw.orders</code>, then <code>stg_orders</code>, then <code>fct_orders</code>, then
          <code>daily_revenue</code> — every step of that order derived purely from the
          <code>source()</code> and <code>ref()</code> calls above, with zero manual sequencing logic written
          anywhere in the project.
        </Para>
        <CodeBox label="dbt build against this project">
{`dbt build`}
        </CodeBox>
        <Output>{`14:10:02  Running with dbt=1.8.0
14:10:02  Found 3 models, 1 source, 0 tests
14:10:03  1 of 4 START freshness of raw.orders .......................... [RUN]
14:10:03  1 of 4 PASS freshness of raw.orders ........................... [PASS in 0.35s]
14:10:04  2 of 4 START sql view model dev_asil.stg_orders ............... [RUN]
14:10:04  2 of 4 OK created sql view model dev_asil.stg_orders .......... [SUCCESS 1 in 0.62s]
14:10:05  3 of 4 START sql table model dev_asil.fct_orders .............. [RUN]
14:10:06  3 of 4 OK created sql table model dev_asil.fct_orders ......... [SUCCESS 1 in 1.14s]
14:10:07  4 of 4 START sql table model dev_asil.daily_revenue ........... [RUN]
14:10:08  4 of 4 OK created sql table model dev_asil.daily_revenue ...... [SUCCESS 1 in 0.89s]
14:10:08
14:10:08  Completed successfully`}
        </Output>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Documenting sources and models" />
        <SectionTitle>schema.yml — Attaching Descriptions and Tests to the Same Nodes ref() and source() Point At</SectionTitle>
        <Para>
          Declaring a source in `sources.yml` is also where documentation and tests attach. The same
          `version: 2` YAML file that names a source table can carry a human-readable description for every
          table and column, plus generic tests like `not_null` and `unique` — all keyed to the exact same
          node that `ref()` and `source()` resolve. This matters because it means documentation is never
          disconnected from the dependency graph: the lineage graph, the freshness check, and the
          documentation site are all built from the same declared source and model definitions, not three
          separate systems that could drift out of sync with each other.
        </Para>
        <CodeBox label="sources.yml with descriptions and column-level tests attached">
{`version: 2

sources:
  - name: raw
    database: analytics
    schema: raw
    tables:
      - name: orders
        description: "Raw order events loaded by Fivetran from the app's Postgres database every 15 minutes."
        loaded_at_field: _fivetran_synced
        columns:
          - name: order_id
            description: "Primary key of the orders table in the source application."
            tests:
              - unique
              - not_null
          - name: customer_id
            description: "Foreign key to the customers table."
            tests:
              - not_null`}
        </CodeBox>
        <CodeBox label="models/staging/schema.yml — the same pattern applied to a model built by ref()">
{`version: 2

models:
  - name: stg_orders
    description: "One row per order, lightly typed and cleaned from raw.orders. No business logic applied here — see fct_orders for filtered, business-ready order data."
    columns:
      - name: order_id
        description: "Primary key, inherited from the raw source."
        tests:
          - unique
          - not_null
      - name: status
        description: "Lowercased order status, one of the values checked by fct_orders downstream."`}
        </CodeBox>
        <Para>
          Notice the description on `stg_orders` explicitly points a future reader toward `fct_orders` for
          business logic — this is a small but real habit worth building. Because `dbt docs generate` renders
          every one of these descriptions directly onto the lineage graph, a well-written description turns
          the generated docs site into an actual map of the project a new team member can read, rather than a
          bare diagram of boxes and arrows with no explanation of what each box means or why it exists.
        </Para>
        <Callout title="Documentation lives next to the dependency, not in a separate wiki" color={K}>
          Because descriptions are declared in the same YAML that names the source or model `ref()`/`source()`
          resolve, there is no separate documentation system to keep in sync. A model renamed in its `.sql`
          file, a column dropped from a source — both are changes made in the same neighborhood as their
          descriptions, which makes it far more likely (though never guaranteed) that documentation gets
          updated alongside the change that made it stale, rather than living in an external wiki nobody
          remembers to open.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Visualizing the graph" />
        <SectionTitle>dbt docs generate — Seeing the DAG You Built From ref() and source()</SectionTitle>
        <Para>
          Everything this module has covered so far — sources declared in YAML, models chained together with
          `ref()`, the DAG derived by static parsing — culminates in a single command:
          `dbt docs generate` followed by `dbt docs serve`. This builds a static documentation site with an
          interactive lineage graph, rendering every node your project's `ref()` and `source()` calls
          describe as a box, and every dependency edge as an arrow between them.
        </Para>
        <CodeBox label="Generating and serving the docs site">
{`dbt docs generate
dbt docs serve`}
        </CodeBox>
        <Output>{`14:22:01  Running with dbt=1.8.0
14:22:01  Found 3 models, 1 source, 0 tests
14:22:02  Building catalog
14:22:03  Catalog written to ./target/catalog.json
14:22:03
14:22:03  Serving docs at 0.0.0.0:8080
14:22:03  To access from a remote machine, you must specify the --host flag`}
        </Output>
        <Para>
          Opening the served site and clicking into the lineage graph shows exactly the picture this module
          built by hand in Part 05's worked example — `raw.orders` (rendered distinctly as a source, not a
          model) with an arrow into `stg_orders`, an arrow into `fct_orders`, an arrow into `daily_revenue`.
          Every arrow in that rendered graph corresponds to one `ref()` or `source()` call somewhere in the
          project's SQL files — nothing else produces an edge.
        </Para>
        <Para>
          This is also the fastest way to catch the anti-pattern from Part 02 in a real project: open the
          generated graph and look for any mart or model with no incoming edges at all, sitting disconnected
          from everything else. A model with genuinely no dependencies is rare — almost always, a
          disconnected node in the generated graph means some upstream reference in that model's SQL is
          hardcoded instead of calling `ref()`/`source()`, exactly as Part 05's callout describes.
        </Para>
        <Table
          headers={['What the docs site shows', 'Where it comes from']}
          rows={[
            ['Lineage graph (nodes and arrows)', 'Every ref() and source() call parsed from every model\'s compiled Jinja.'],
            ['Descriptions on tables and columns', 'schema.yml files, as shown in Part 08.'],
            ['Which columns exist on a model', 'The warehouse\'s information schema, captured when dbt builds the catalog.'],
            ['Whether a node is a source or a model', 'Whether it was declared under sources: in a schema.yml, or built as a model file under models/.'],
          ]}
        />
        <Callout title="The generated graph is only as accurate as your ref()/source() discipline" color={K}>
          A beautifully documented project with hardcoded table references scattered through a few models
          still produces a lineage graph with real gaps in it — `dbt docs generate` cannot show a dependency
          it was never told about through a tracked function call. Treating the generated graph as a
          correctness check on your own project's `ref()`/`source()` usage, not just a pretty diagram to show
          stakeholders, is one of the more useful habits this module can leave you with.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Multiple raw schemas and multiple sources" />
        <SectionTitle>Real Projects Have More Than One Source — Naming and Organizing Them</SectionTitle>
        <Para>
          The worked example in Part 07 used one source (`raw`) with one table (`orders`). Real projects
          almost always have several distinct raw data providers landing in different schemas or even
          different databases — a Fivetran connector syncing the application's Postgres database, a separate
          Stripe connector landing payment data, a marketing team's ad-spend data loaded by a completely
          different tool. Each of these is typically declared as its own named source, even when they live in
          the same physical database, because the `name` in a source declaration is what `source()` calls use
          to disambiguate between them.
        </Para>
        <CodeBox label="Multiple sources declared side by side">
{`version: 2

sources:
  - name: app_postgres
    database: analytics
    schema: raw_postgres
    tables:
      - name: orders
        loaded_at_field: _fivetran_synced
      - name: customers
        loaded_at_field: _fivetran_synced

  - name: stripe
    database: analytics
    schema: raw_stripe
    tables:
      - name: charges
        loaded_at_field: _fivetran_synced
        freshness:
          warn_after: {count: 2, period: hour}
          error_after: {count: 6, period: hour}
      - name: refunds
        loaded_at_field: _fivetran_synced

  - name: marketing
    database: analytics
    schema: raw_marketing
    tables:
      - name: ad_spend
        loaded_at_field: loaded_at
        freshness:
          warn_after: {count: 24, period: hour}`}
        </CodeBox>
        <Para>
          Referencing any one of these from a model is unambiguous because `source()` always takes two
          arguments — the source name, then the table name — so `{'{{'} source('stripe', 'charges') {'}}'}`
          and `{'{{'} source('app_postgres', 'customers') {'}}'}` can never be confused with each other even
          though both ultimately live in the same `analytics` database. This is also why freshness thresholds
          are set per source table rather than globally — a payment provider's data landing every few minutes
          reasonably has a much tighter `warn_after` than a marketing team's daily ad-spend export, and
          declaring them separately is what makes that distinction possible.
        </Para>
        <CodeBox label="A staging model joining two different sources">
{`-- models/staging/stg_charges.sql
SELECT
  charge_id,
  order_id,
  amount_usd,
  charge_status,
  _fivetran_synced AS loaded_at
FROM {{ source('stripe', 'charges') }}
WHERE charge_id IS NOT NULL`}
        </CodeBox>
        <Table
          headers={['Convention', 'Why teams use it']}
          rows={[
            ['One source block per raw data provider/connector', 'Freshness thresholds and descriptions naturally differ per provider, and it mirrors how the data actually gets loaded operationally.'],
            ['sources.yml colocated with the staging models that read from it', 'Keeps the declaration near its first and most direct consumer, rather than one giant file for the whole project.'],
            ['Source and table names matching the raw schema/table names exactly', 'Reduces the mental translation needed when debugging — the name in source() matches what you\'d find querying the warehouse directly.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Testing sources directly" />
        <SectionTitle>Sources Can Carry Tests Too, Not Just Models</SectionTitle>
        <Para>
          It is easy to assume tests only belong on models, since that is where most of a project's YAML
          testing lives. But the same generic tests covered in Module 08 of this track (Testing: Generic and
          Singular Tests) — `unique`, `not_null`, `accepted_values`, `relationships` — can be attached directly
          to a source's columns, as
          shown briefly in Part 08. This matters because it lets you catch a problem in the raw data itself,
          before it ever reaches a single dbt-built model.
        </Para>
        <CodeBox label="Running tests scoped to just the sources">
{`dbt test --select source:raw`}
        </CodeBox>
        <Output>{`14:31:02  Running with dbt=1.8.0
14:31:02  Found 2 models, 1 source, 3 tests
14:31:03  1 of 3 START test not_null_raw_orders_order_id ................ [RUN]
14:31:03  1 of 3 PASS not_null_raw_orders_order_id ...................... [PASS in 0.28s]
14:31:03  2 of 3 START test unique_raw_orders_order_id .................. [RUN]
14:31:04  2 of 3 PASS unique_raw_orders_order_id ......................... [PASS in 0.31s]
14:31:04  3 of 3 START test not_null_raw_orders_customer_id ............. [RUN]
14:31:04  3 of 3 FAIL 14 not_null_raw_orders_customer_id ................ [FAIL 14 in 0.29s]
14:31:04
14:31:04  Done. PASS=2 WARN=0 ERROR=0 FAIL=1 TOTAL=3`}
        </Output>
        <Para>
          That failing test — 14 rows in `raw.orders` with a null `customer_id` — is exactly the kind of
          problem you want surfaced at the source, before it silently flows through `stg_orders` into
          `fct_orders` and eventually corrupts a join or an aggregation several models downstream, where it
          would be far harder to trace back to its actual origin. Testing at the source boundary is the
          earliest and cheapest point in the whole DAG to catch a data quality problem.
        </Para>
        <Callout title="A source test failing is a different kind of problem than a model test failing" color={K}>
          When a test on a model fails, the likely cause is a bug in that model's transformation logic — you
          go look at the SQL. When a test on a source fails, the transformation logic hasn't even run yet; the
          problem is upstream, in whatever system loaded that raw data. Don't reach for the model's SQL file
          when a source test fails — go talk to whoever owns the raw pipeline instead.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Overriding freshness and selecting by source" />
        <SectionTitle>Freshness Thresholds Can Live at the Source Level or the Table Level — And --select source: Targets Both</SectionTitle>
        <Para>
          Part 03 showed `freshness` configured per table. In a project with many tables under one source
          that mostly share the same acceptable staleness, repeating the same `warn_after`/`error_after` block
          on every table is unnecessary. A `freshness` block can also be set once at the source level, and
          every table under that source inherits it unless a specific table overrides it with its own block —
          the same override precedence pattern Part 07 described for `+materialized` in `dbt_project.yml`.
        </Para>
        <CodeBox label="Source-level freshness default, overridden by one table">
{`version: 2

sources:
  - name: raw
    database: analytics
    schema: raw
    freshness:
      warn_after: {count: 24, period: hour}
      error_after: {count: 48, period: hour}
    loaded_at_field: _fivetran_synced
    tables:
      - name: orders
        # no override -- inherits the 24h/48h default above
      - name: customers
        # no override -- inherits the 24h/48h default above
      - name: payments
        freshness:
          warn_after: {count: 2, period: hour}
          error_after: {count: 6, period: hour}
        # payments overrides the default: this data needs to be much fresher`}
        </CodeBox>
        <Para>
          This mirrors exactly why the per-model/per-folder override pattern from Part 07 exists for
          materializations: set a sensible default once, and only write out the exception for the one table
          that genuinely needs different treatment, rather than repeating the common case everywhere and
          risking it silently drifting out of sync across dozens of near-identical table declarations.
        </Para>
        <Para>
          The same `--select` graph operators covered in Part 06 also understand sources directly, using the
          `source:` prefix — useful for running freshness checks or tests scoped to exactly one source rather
          than the whole project.
        </Para>
        <CodeBox label="Selecting by source name">
{`dbt source freshness --select source:raw          # only the raw source's tables
dbt source freshness --select source:stripe        # only the stripe source's tables
dbt test --select source:raw+                       # source:raw's tests, plus everything downstream`}
        </CodeBox>
        <Table
          headers={['Selector', 'What it targets']}
          rows={[
            ['source:raw', 'Every table declared under the source named raw.'],
            ['source:raw.orders', 'Just the orders table under the raw source.'],
            ['source:raw+', 'Every table under raw, plus every model downstream of them in the DAG.'],
          ]}
        />
        <Callout title="Scoped freshness checks keep CI fast" color={K}>
          On a large project with dozens of sources, running `dbt source freshness` with no selector checks
          every declared table on every CI run, even ones a given pull request never touches. Scoping the
          freshness check to just the sources relevant to what changed — using the same `state:modified+`-style
          thinking from Part 06 — keeps CI proportional to the actual change instead of paying the full cost
          of the whole project's freshness surface on every run.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Sources and ref()</SectionTitle>
        {[
          {
            wrong: '"Declaring a source in sources.yml creates or loads that table"',
            right: 'Part 01 is explicit: a source declaration is a pointer to a table some other system already built and populates. dbt never runs DDL or DML against a source. If the underlying table does not exist, declaring it as a source changes nothing — the first model that reads it will simply fail with a table-not-found error.',
          },
          {
            wrong: '"FROM raw.orders and {{ source(\'raw\', \'orders\') }} are functionally the same thing, just different syntax"',
            right: 'Part 02 covers why they are not equivalent even though both return the same rows: only the source() call is visible to dbt\'s dependency graph, its freshness tooling, and its generated documentation. A hardcoded reference produces working SQL and a broken lineage graph.',
          },
          {
            wrong: '"ref() just looks up a table that already exists in the warehouse"',
            right: 'Part 04 shows this is backwards for the common case: ref() often resolves a model before it has ever been built, computing the fully-qualified name that model is configured to resolve to for the current target, and relying on execution order to have built it in time.',
          },
          {
            wrong: '"dbt figures out execution order by checking what data actually exists in the warehouse"',
            right: 'Part 05 is direct about the actual mechanism: dbt statically parses every model\'s Jinja for ref()/source() calls before running any SQL at all. The DAG is derived from source code, never from querying the database\'s information schema.',
          },
          {
            wrong: '"Source freshness checks whether the data in a table is correct"',
            right: 'Part 03 draws this distinction carefully: freshness only checks whether new rows are arriving on schedule, using loaded_at_field, not whether the values inside those rows are valid. A table can be perfectly fresh and full of bad data, or perfectly correct and badly stale — freshness and data quality are separate concerns, checked with separate tools.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Chime:</strong> the fraud analytics team's morning dashboard shows a suspicious flat
            line in transaction volume overnight. Following Part 03, an engineer runs
            <code>dbt source freshness</code> and finds <code>raw.transactions</code> is 14 hours past its
            <code>warn_after</code> threshold — the upstream CDC connector silently stopped replicating after
            a credential rotation. The dbt models themselves ran successfully all night, producing a
            completely accurate summary of stale data. The freshness check, not a broken model, is what
            surfaces the real problem.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Robinhood:</strong> a new analytics engineer joins and finds a legacy model with
            <code>FROM prod.raw_orders</code> hardcoded instead of a source call. Following Part 02 and Part
            05, they replace it with <code>{'{{'} source('raw', 'orders') {'}}'}</code> and run
            <code>dbt docs generate</code> — the lineage graph immediately grows a new upstream edge that had
            been invisible for months, and a downstream model nobody realized also depended on that table
            shows up correctly connected for the first time.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Grubhub:</strong> a platform migration moves the raw orders table from one Snowflake
            database to another. Because every model in the project reads through
            <code>{'{{'} source('raw', 'orders') {'}}'}</code> rather than a hardcoded database name, the
            entire migration is a two-line change to <code>sources.yml</code> — updating the
            <code>database:</code> key — with zero changes needed across the dozens of models that transitively
            depend on that source through staging models and marts.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the difference between source() and ref(), and why does dbt need both?',
            a: `source() points at a raw table dbt did not build and never will build — something loaded by an external system like Fivetran or a CDC pipeline, covered in Part 01. ref() points at another dbt model, something dbt itself builds during the same run, covered in Part 04. They exist as two separate functions specifically so dbt's parser can distinguish "this is an entry point into the graph, check its freshness" from "this is an internal edge in the graph, enforce build order."

If dbt only had one generic function for both, it would lose the ability to run source-specific tooling like dbt source freshness, since it would have no way to tell which references point at externally-loaded data with a freshness contract versus which point at models it fully controls and rebuilds every run.

In practice, every model's SQL that touches a raw table calls source(), and every model that builds on another model's output calls ref() — the boundary between the two functions is exactly the boundary between "data dbt owns" and "data dbt only reads."`,
          },
          {
            q: 'Q2. Walk me through, mechanically, how dbt decides which models to run first in a project with no explicit ordering configuration.',
            a: `Per Part 05, before executing any SQL, dbt parses every model file's compiled Jinja and extracts every ref() and source() call it finds. Each ref('model_x') found inside model_y's file becomes a directed edge from model_x to model_y in a graph — meaning model_x must finish before model_y starts. Doing this across every model in the project produces the full DAG.

Once that graph exists, dbt performs what's effectively a topological sort over it to compute a valid execution order — any order where every model runs strictly after all of its upstream dependencies have finished. With multiple worker threads, independent branches of the graph run in parallel, while dependent chains run in sequence.

The critical detail is that none of this comes from inspecting the warehouse. dbt never queries the database to see what tables actually exist or what depends on what — the entire graph is derived from static analysis of ref()/source() calls in the project's source code, before a single query runs.`,
          },
          {
            q: 'Q3. A junior engineer on your team writes a new model with FROM prod.stg_orders instead of {{ ref(\'stg_orders\') }}. What specifically breaks, beyond it being "not best practice"?',
            a: `Three concrete things break, all covered in Part 02 and Part 05. First, lineage: dbt's parser finds no ref() call, so no dependency edge is added to the DAG — dbt has no idea this model depends on stg_orders at all, and dbt docs generate will show it as a disconnected node with no upstream, actively misrepresenting the project's real dependencies.

Second, and more dangerous, execution order is no longer guaranteed. Without the edge, dbt has no reason to run stg_orders before this new model — they could run in either order, or in parallel across threads. If stg_orders hasn't finished (or hasn't even started) by the time this model's query runs, it either fails outright or silently reads a stale, previously-built version of the table.

Third, environment portability breaks: prod.stg_orders is hardcoded to the prod schema specifically, so this model can never be safely run against a dev or CI target without either erroring or, worse, silently reading and writing across environment boundaries it should never touch.`,
          },
          {
            q: 'Q4. Why does the same model file compile to a different table name depending on which environment it runs in, and what mechanism makes that happen?',
            a: `This is what ref() does mechanically, from Part 04. ref() is a Jinja function evaluated at compile time, not a plain string. When dbt compiles a model's SQL, it replaces {{ ref('some_model') }} with the fully-qualified name some_model resolves to, computed from the currently active connection profile's configured database and schema for whatever target the run is using.

So a developer running dbt run --target dev gets ref('stg_orders') compiled to something like dev_asil.stg_orders, using their personal dev schema, while the scheduled production job running --target prod gets the exact same source file compiling to prod.stg_orders. No conditional Jinja logic or environment-specific branching was written by anyone — the environment-awareness is a property of how ref() resolves names using the active profile, not something baked into the model's SQL.

This is also precisely why hardcoding a schema name defeats environment portability entirely, as I'd bring up connecting back to Q3 — a hardcoded reference can only ever point at one specific environment.`,
          },
          {
            q: 'Q5. How would you diagnose a downstream mart producing quietly stale numbers, when every dbt run in the schedule is reporting success?',
            a: `The first thing I'd check, per Part 03, is dbt source freshness against the raw tables that mart transitively depends on — a run reporting "success" only means every model's SQL executed without erroring, which says nothing about whether the underlying raw data actually kept arriving on schedule. A stalled upstream connector produces exactly this symptom: every model runs cleanly against whatever rows happen to already be there, and nothing in a normal dbt run detects that new rows simply stopped showing up.

If freshness comes back clean, I'd next check the mart's actual dependency chain using dbt's lineage graph or dbt ls --select +the_mart_name, to confirm every model in that chain is really reading from the source I expect via ref()/source() and not from some hardcoded reference that's silently pointing somewhere else — the kind of bug covered in Part 02 and Q3, which produces working-looking SQL against the wrong or stale table with no error at all.

Only after ruling out both a stalled source and a broken lineage reference would I start looking at the transformation logic itself for a bug in the business rules — freshness and lineage are the cheap, mechanical checks to rule out first, since a broken model file, unlike a stalled upstream connector, at least tends to raise a visible error.`,
          },
          {
            q: 'Q6. Two different teams both need to read the same raw payments table, one through a staging model and one through an ad hoc analysis. Should the ad hoc analysis just query the raw table directly instead of going through dbt?',
            a: `Mechanically, yes, it can — a source table sitting in the warehouse per Part 01 is an ordinary queryable table or view like any other, and nothing prevents a direct SELECT against it from any tool with warehouse access. The question is whether that's a good idea, and per Part 02, I'd push back on it for anything beyond a genuinely one-off exploratory query.

Querying the raw table directly means bypassing every bit of cleaning, typing, and standardization the staging model applies — the ad hoc analysis now has to independently handle whatever the raw data's quirks are (inconsistent casing, unparsed timestamps, nulls that should be filtered), duplicating logic that already exists in stg_payments and risking a subtly different answer if that logic drifts out of sync over time. It also means dbt has no way to know this consumer exists at all, since it isn't going through ref() or source() — which doesn't matter for lineage in this specific case since it's outside dbt entirely, but does mean nobody gets warned if the raw table's freshness lapses or its schema changes, since dbt source freshness only ever gets run explicitly, not triggered by external readers.

My actual recommendation would be to have the ad hoc analysis query stg_payments instead of the raw table directly — it's already been built with the same freshness guarantees and cleaning logic the other team relies on, and if the raw table's location or shape ever changes, only sources.yml needs updating rather than every ad hoc query that bypassed dbt entirely.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>
        {[
          {
            q: 'Hardcoding raw table references instead of declaring and calling source()',
            a: 'Part 02 covers this directly: a hardcoded FROM raw.orders works, returns correct rows, and is invisible to dbt\'s dependency graph, freshness tooling, and generated documentation. Declare every raw table dbt reads as a source and reference it through source(), even when it feels like unnecessary ceremony for a "simple" table.',
          },
          {
            q: 'Setting loaded_at_field to a business timestamp instead of a true load timestamp',
            a: 'Part 03\'s callout is the reference: pointing freshness checks at order_ts instead of a column like _fivetran_synced measures business recency, not pipeline health, and silently defeats the entire purpose of the check — an old order that just loaded looks "stale" when it isn\'t, and a stalled pipeline full of old-looking-but-actually-recent-load rows can look fine when it isn\'t.',
          },
          {
            q: 'Assuming ref() performs a warehouse lookup at compile time',
            a: 'Part 04 shows the opposite is usually true: ref() very often resolves a model that has not been built yet on this run, computing the name it will resolve to and trusting execution order (derived in Part 05) to build it in time. Treating ref() as a live lookup leads to unnecessary defensive coding that has no actual effect.',
          },
          {
            q: 'Believing dbt inspects the database to determine model run order',
            a: 'Part 05 is explicit that the entire DAG comes from static parsing of ref()/source() calls in the project\'s source files, before any SQL executes. A model with a broken or missing ref() call does not get "discovered" by dbt querying the warehouse — it simply has no dependency edge, silently.',
          },
          {
            q: 'Treating a passing dbt run as proof the underlying data is fresh',
            a: 'Part 03 and Interview Prep Q5 both cover this: a run reporting success only confirms every model\'s SQL executed without erroring, which says nothing about whether new rows are actually arriving upstream on schedule. Freshness has to be checked explicitly and separately, on its own schedule, ideally before a build that depends on it.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `Compilation Error: 'raw' is undefined in macro source(). Did you mean 'raw.orders'?`,
            cause: "The model calls {{ source('raw', 'orders') }} but no sources.yml file in the project declares a source named 'raw', or it declares it under a different name than what the model is referencing.",
            fix: 'Check every sources.yml under models/ for the exact source name and table name being called. The two string arguments to source() must exactly match a declared source\'s name: and a table entry under it — a typo in either argument produces this error at compile time, before any SQL runs.',
          },
          {
            error: `Database Error: relation "analytics.raw.orders" does not exist`,
            cause: 'The source was declared correctly in sources.yml and the model compiles fine, but the actual raw table it points to has not been created yet, was renamed, or lives in a different database/schema than what was declared.',
            fix: 'Confirm with whoever owns the raw pipeline (Fivetran, a CDC job, a custom loader) that the table exists at the exact database and schema declared in sources.yml. This is not a dbt bug — it is dbt correctly reporting that a source it was told exists does not actually exist in the warehouse yet.',
          },
          {
            error: `dbt source freshness reports ERROR for raw.orders even though the dbt run itself succeeded`,
            cause: 'The freshness check and the model run are two separate operations. A model can build successfully against whatever rows already exist in a source table, completely independent of whether new rows have stopped arriving. This is the exact scenario Part 03 describes — the run "succeeding" says nothing about whether the source itself is stale.',
            fix: 'Investigate the actual upstream pipeline feeding this source — a connector, a CDC job, a scheduled load — rather than the dbt project. dbt is correctly reporting a real problem outside its own boundary; there is no dbt-side fix for a stalled upstream loader.',
          },
          {
            error: `Compilation Error: Model 'fct_orders' depends on a node named 'stg_orders' which was not found`,
            cause: "A ref('stg_orders') call points at a model name that does not exist anywhere in the project — usually because the file was renamed, deleted, or the model name inside {{ ref(...) }} has a typo relative to the actual filename.",
            fix: "dbt model names are derived from filenames (minus the .sql extension), not from any name declared inside the file. Check that the exact filename referenced in ref() exists under models/ somewhere in the project, with matching spelling and no extra path segments.",
          },
          {
            error: `A model builds successfully but dbt docs generate shows it with no upstream connections in the lineage graph`,
            cause: "The model's SQL reads from an upstream table using a hardcoded schema.table reference instead of ref() or source() — exactly the anti-pattern covered in Part 02 and Part 05. The SQL is valid and the model builds correctly; dbt simply has no way to know about a dependency it was never told about through a tracked function call.",
            fix: 'Search the model\'s SQL for any hardcoded FROM/JOIN referencing a schema and table name directly, and replace it with the appropriate ref() or source() call. The model\'s output will not change, but its position in the lineage graph and its place in the execution order will now be correct.',
          },
          {
            error: `Freshness check for a table passes even though the analytics team insists the underlying source hasn't loaded new rows in two days`,
            cause: 'The loaded_at_field configured for that source table is pointed at a business timestamp column (something like created_at or order_ts) instead of a true load timestamp — this is exactly the mistake covered in Part 03\'s callout. If the raw system loaded a two-day-old backfill batch this morning, a business-timestamp-based freshness check sees old timestamps and correctly reports them as old, while missing that the real question — did anything load recently — should be measured against when rows physically arrived, not the events they describe.',
            fix: "Confirm which column in the source table actually records the warehouse load time (often something like _fivetran_synced, loaded_at, or an equivalent CDC ingestion timestamp) and point loaded_at_field at that column specifically, never at a business-event timestamp, even when a business timestamp looks like the more 'obviously correct' choice at a glance.",
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
          'A source is a declared pointer to a raw table dbt reads but never creates, updates, or owns — the data lifecycle belongs entirely to whatever loaded it.',
          'Declaring sources instead of hardcoding raw table names buys lineage tracking, source freshness checks, and a single place to update if the raw location ever changes.',
          'dbt source freshness compares a loaded_at_field against warn_after/error_after thresholds, catching a stalled upstream pipeline while every model run still reports success.',
          'ref() is a Jinja function that resolves to another model\'s fully-qualified name, adjusted automatically for whichever environment/target is currently running — the same call compiles differently in dev versus prod with zero conditional logic written.',
          'dbt builds its entire execution order by statically parsing every model\'s ref()/source() calls before running any SQL — the DAG comes from source code, never from inspecting the warehouse.',
          'A hardcoded FROM database.schema.table instead of ref()/source() breaks lineage, breaks environment portability, and breaks the DAG itself, since dbt has no way to know that dependency exists.',
          'Graph selectors like model+, +model, and state:modified+ are only possible because the DAG already exists before a run starts, derived entirely from ref() and source() calls.',
        ]}
      />
    </LearnLayout>
  )
}
