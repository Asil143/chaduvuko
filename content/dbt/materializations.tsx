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

export default function Materializations() {
  return (
    <LearnLayout
      title="Materializations: View, Table, Incremental, Ephemeral"
      description="What a materialization actually is, how view/table/ephemeral/incremental compile to different warehouse DDL, how to set materializations per model or per directory, and a decision framework for picking the right one."
      section="dbt — Module 06"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Materializations: View, Table, Incremental, Ephemeral', href: '/learn/dbt/materializations' },
      ]}
      prev={{ title: 'Sources, ref(), and the Dependency Graph', href: '/learn/dbt/sources-and-ref' }}
      next={{ title: 'Incremental Models in Depth', href: '/learn/dbt/incremental-models' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a materialization is" />
        <SectionTitle>A Model Is a SELECT; a Materialization Decides What It Becomes</SectionTitle>
        <Para>
          The previous module established that a dbt model file contains a single SELECT statement — no
          `CREATE TABLE`, no `INSERT`, just a query describing what the data should look like. But a SELECT
          statement, on its own, is not persisted anywhere. It runs, returns rows, and those rows evaporate
          the moment the query finishes, exactly like running a SELECT in a SQL client and never doing
          anything with the result set.
        </Para>
        <Para>
          A <strong>materialization</strong> is the strategy dbt uses to persist that SELECT's result as an
          actual object in the warehouse — something that continues to exist after the run finishes, that
          other queries and other dbt models can read from. It is the answer to the question "when dbt runs
          this model, what does it actually build?" The same SELECT statement can become a view, a table, an
          inlined fragment of another query, or an incrementally-updated table, entirely depending on one
          config value — the underlying business logic in the SELECT does not have to change at all.
        </Para>
        <HighlightBox>
          <Para>
            <strong>The mental model to hold onto:</strong> a materialization is not a property of the data.
            It is a property of how dbt chooses to build and store the result of a query. The exact same
            `SELECT customer_id, COUNT(*) FROM orders GROUP BY 1` can be materialized as a view (recomputed
            every time someone queries it), a table (computed once per dbt run, then just read), or an
            ephemeral fragment (never its own object at all, folded into whatever references it). Choosing
            between them is a cost-and-freshness trade-off, covered in full in Part 08, not a correctness
            decision — every materialization produces the same logical result, just built and stored
            differently.
          </Para>
        </HighlightBox>
        <Para>
          There are four materializations covered in this module: <code>view</code>, <code>table</code>,
          <code>ephemeral</code>, and <code>incremental</code>. Every dbt project uses a mix of all four,
          because different models have genuinely different usage patterns — a lightly-transformed staging
          model queried only by one or two downstream models has a completely different ideal materialization
          than a hundred-million-row fact table hit by a dashboard refreshing every five minutes.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — view" />
        <SectionTitle>view — Cheap to Build, Recomputed Every Time It Is Queried</SectionTitle>
        <Para>
          <code>view</code> is dbt's default materialization — if a model has no explicit materialization
          configured anywhere, this is what it gets. A view materialization compiles the model's SELECT
          statement into a <code>CREATE OR REPLACE VIEW ... AS (your select)</code> statement and runs that
          against the warehouse. Crucially, a view stores no data of its own. It stores only the query
          definition. Every time anything queries the view — a downstream dbt model, a BI dashboard, an
          analyst's ad hoc SELECT — the warehouse re-executes the underlying SELECT from scratch, against
          whatever the underlying tables currently contain.
        </Para>
        <CodeBox label="A model with an explicit view materialization">
{`-- models/staging/stg_customers.sql
{{ config(materialized='view') }}

SELECT
  customer_id::varchar AS customer_id,
  LOWER(TRIM(email))   AS email,
  signup_ts::timestamp AS signup_ts,
  country_code
FROM {{ source('raw', 'customers') }}
WHERE customer_id IS NOT NULL`}
        </CodeBox>
        <CodeBox label="Roughly what dbt runs against the warehouse for a view">
{`CREATE OR REPLACE VIEW dev_asil.stg_customers AS (
  SELECT
    customer_id::varchar AS customer_id,
    LOWER(TRIM(email))   AS email,
    signup_ts::timestamp AS signup_ts,
    country_code
  FROM analytics.raw.customers
  WHERE customer_id IS NOT NULL
);`}
        </CodeBox>
        <Para>
          Because a view stores no data, running <code>dbt run</code> against a view-materialized model is
          fast — it is just re-defining the view, not recomputing or rewriting any actual rows. The cost is
          pushed entirely onto whoever queries the view afterward: every single read against
          <code>stg_customers</code> re-runs that SELECT against the raw source table, every time, with no
          caching of the result between queries. For a lightly-transformed staging model that a handful of
          downstream models read from occasionally, this trade-off is exactly right — the transformation
          logic is trivial to recompute, and there is no benefit to paying storage and rebuild cost for a
          precomputed copy nobody is hammering with queries.
        </Para>
        <Callout title="A view is cheap to build, not necessarily cheap to query" color={K}>
          Don't confuse "view materializations are fast to run" with "views are always fast to use." If a
          model's underlying SELECT is genuinely expensive — heavy joins, window functions, aggregations over
          a huge raw table — a view materialization means every single downstream query pays that full cost
          again, every time. A view is the right choice when the transformation itself is cheap or rarely
          queried directly, not simply because <code>dbt run</code> finishes faster.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — table" />
        <SectionTitle>table — Rebuilt Every Run, Fast to Query Afterward</SectionTitle>
        <Para>
          A <code>table</code> materialization compiles the model into a
          <code>CREATE OR REPLACE TABLE ... AS (your select)</code> statement. Unlike a view, this actually
          executes the SELECT once, at build time, and writes the resulting rows to disk as a physical table.
          Every subsequent query against that table reads the already-computed rows directly — no
          recomputation, no re-running the underlying joins and aggregations.
        </Para>
        <CodeBox label="A model with an explicit table materialization">
{`-- models/marts/finance/fct_orders.sql
{{ config(materialized='table') }}

SELECT
  o.order_id,
  o.customer_id,
  o.order_ts,
  o.status,
  o.total_usd,
  c.country_code,
  c.signup_ts
FROM {{ ref('stg_orders') }} o
LEFT JOIN {{ ref('stg_customers') }} c
  ON o.customer_id = c.customer_id
WHERE o.status != 'test_order'`}
        </CodeBox>
        <CodeBox label="Roughly what dbt runs against the warehouse for a table">
{`CREATE OR REPLACE TABLE dev_asil.fct_orders AS (
  SELECT
    o.order_id,
    o.customer_id,
    o.order_ts,
    o.status,
    o.total_usd,
    c.country_code,
    c.signup_ts
  FROM dev_asil.stg_orders o
  LEFT JOIN dev_asil.stg_customers c
    ON o.customer_id = c.customer_id
  WHERE o.status != 'test_order'
);`}
        </CodeBox>
        <Para>
          The cost shows up on the build side instead of the query side. Every <code>dbt run</code> that
          touches this model fully rebuilds the entire table from scratch — every row, every time, regardless
          of how many rows actually changed since the last run. For a model with a few thousand rows this is
          irrelevant; for a model with hundreds of millions of rows and an expensive join, a full rebuild on
          every scheduled run can become the single most expensive step in the entire pipeline, both in
          compute cost and in wall-clock runtime.
        </Para>
        <Table
          headers={['Dimension', 'view', 'table']}
          rows={[
            ['What CREATE statement runs', 'CREATE OR REPLACE VIEW', 'CREATE OR REPLACE TABLE ... AS SELECT'],
            ['When the SELECT executes', 'Every time the view is queried', 'Once per dbt run, at build time'],
            ['Storage used', 'Effectively none — just the query definition', 'Full storage for every row of the result'],
            ['dbt run cost', 'Cheap — just redefining the view', 'Full recompute of the entire result set every run'],
            ['Downstream query cost', 'Full underlying query cost, paid on every read', 'Just reading precomputed rows — fast'],
          ]}
        />
        <Para>
          This is the fundamental trade-off between the two most common materializations: <code>view</code>
          pays its cost on every read; <code>table</code> pays its cost once per build and stays cheap to
          read afterward. Neither is universally better — the right choice depends entirely on how often a
          model is queried relative to how often it is rebuilt, which Part 08's decision framework covers
          directly.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — ephemeral" />
        <SectionTitle>ephemeral — Not a Database Object At All, Just an Inlined CTE</SectionTitle>
        <Para>
          <code>ephemeral</code> is the materialization most beginners find counterintuitive, because it does
          not create anything in the warehouse whatsoever — not a view, not a table, nothing queryable on its
          own. An ephemeral model's SELECT statement is instead inlined as a Common Table Expression (CTE)
          directly into the compiled SQL of every model that references it through <code>ref()</code>. It
          exists purely at compile time, as a piece of reusable SQL text that dbt splices into whatever reads
          from it.
        </Para>
        <CodeBox label="An ephemeral model and the model that references it">
{`-- models/staging/int_valid_orders.sql
{{ config(materialized='ephemeral') }}

SELECT *
FROM {{ ref('stg_orders') }}
WHERE order_id IS NOT NULL
  AND total_usd > 0

-- models/marts/finance/fct_orders.sql
SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM {{ ref('int_valid_orders') }}
WHERE status != 'test_order'`}
        </CodeBox>
        <CodeBox label="What fct_orders actually compiles to — int_valid_orders inlined as a CTE">
{`WITH int_valid_orders AS (
  SELECT *
  FROM dev_asil.stg_orders
  WHERE order_id IS NOT NULL
    AND total_usd > 0
)

SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM int_valid_orders
WHERE status != 'test_order'`}
        </CodeBox>
        <Para>
          Notice there is no <code>dev_asil.int_valid_orders</code> object anywhere in the warehouse after
          this runs — it never existed as its own table or view. It exists only as the <code>WITH</code>
          clause inside <code>fct_orders</code>'s compiled query. You cannot query
          <code>int_valid_orders</code> directly from a BI tool or an ad hoc SELECT, because as far as the
          warehouse is concerned, it was never built as anything.
        </Para>
        <Para>
          This makes ephemeral models genuinely useful for one specific case: small, reusable pieces of logic
          — a filter, a light transformation, a bit of deduplication — that exist purely to keep a downstream
          model's SQL readable and DRY, and that are only ever consumed by one or two downstream models. Since
          nothing is persisted, there is zero storage cost and zero separate build step for it.
        </Para>
        <Callout title="Ephemeral models get expensive fast when reused by many models" color={K}>
          The inlining happens independently, at compile time, for every single model that references an
          ephemeral model. If five different downstream models all call
          <code>{'{{'} ref('int_valid_orders') {'}}'}</code>, that CTE's underlying SELECT gets recompiled and
          re-executed five separate times — once inside each of those five models' compiled queries — instead
          of being computed once and read five times, which is exactly what a view or table would give you.
          An ephemeral model reused widely is strictly worse than a view: same "recomputed every time" cost
          profile as a view, but multiplied across every downstream consumer's own execution, with no single
          object anyone can query directly to inspect it in isolation for debugging.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — incremental, introduced" />
        <SectionTitle>incremental — Full Build Once, Then Only New or Changed Rows</SectionTitle>
        <Para>
          <code>incremental</code> is the materialization built specifically for large, growing tables where a
          full rebuild on every run is wasteful or simply too slow to finish inside a scheduling window. The
          next module goes deep into the mechanics, strategies, and failure modes of incremental models in
          full — this section gives you a correct working understanding of what it does conceptually, enough
          to reason about when to reach for it.
        </Para>
        <Para>
          On the very first run — or any run using <code>--full-refresh</code> — an incremental model behaves
          exactly like a table materialization: it runs the full SELECT against the full underlying data and
          builds the complete table from scratch. On every subsequent normal run, instead of rebuilding
          everything, it processes only the rows that are new or changed since the last run and merges or
          inserts just those rows into the existing table, leaving everything already built untouched.
        </Para>
        <CodeBox label="A minimal incremental model">
{`-- models/marts/finance/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id'
  )
}}

SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd,
  updated_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`}
        </CodeBox>
        <Para>
          The <code>is_incremental()</code> check is what makes one file behave two different ways. It
          evaluates to <code>false</code> on the first run (there is no existing table to compare against
          yet, and <code>{'{{'} this {'}}'}</code> — a reference to the model's own resulting table — doesn't
          exist), so the <code>WHERE</code> clause is skipped entirely and every row is processed. On every
          later run, it evaluates to <code>true</code>, so the filter kicks in and only rows newer than
          whatever is already in the table get processed — dramatically less data scanned and written on a
          table that might otherwise be rebuilt in full every single run.
        </Para>
        <Callout title="This is a working understanding, not the full picture" color={K}>
          What incremental strategy to use (merge versus append versus delete+insert), how <code>unique_key</code>
          actually gets used during a merge, what happens when a late-arriving row shows up after its
          window has already been processed, and how to safely handle schema changes on an incremental table
          are all covered in full depth in the next module. Treat this section as "incremental models exist
          and roughly do this" — enough to place it correctly in the decision framework below, not the
          complete mechanics.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Setting materialization per model" />
        <SectionTitle>{'{{ config(materialized=...) }}'} — Setting It on One Model</SectionTitle>
        <Para>
          The most granular way to set a materialization is the <code>config()</code> macro at the top of a
          single model's SQL file. Every example so far in this module has used this form. It overrides
          whatever the default or folder-level setting would otherwise be, for that one model only.
        </Para>
        <CodeBox label="Per-model config() — overriding whatever the default would be">
{`-- models/marts/finance/daily_revenue.sql
{{ config(materialized='table') }}

SELECT
  DATE(order_ts) AS order_date,
  COUNT(*)       AS order_count,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('fct_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1`}
        </CodeBox>
        <Para>
          This is the right tool when one specific model needs to differ from the rest of its directory —
          most of your marts might default to <code>table</code>, but one particular mart that's rarely
          queried and cheap to compute might be better off as a <code>view</code>, and setting it explicitly
          here overrides the folder default without disturbing every other model around it.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Setting materialization for whole directories" />
        <SectionTitle>dbt_project.yml — Setting It for Whole Directories at Once</SectionTitle>
        <Para>
          Repeating <code>{'{{'} config(materialized='view') {'}}'}</code> at the top of every single staging
          model, and <code>{'{{'} config(materialized='table') {'}}'}</code> at the top of every single mart,
          works but does not scale — it is easy to forget on a new model, and there is no single place to see
          or change the project's overall convention. `dbt_project.yml` lets you set a default materialization
          per folder path, applied to every model under it unless that specific model overrides it with its
          own <code>config()</code> call.
        </Para>
        <CodeBox label="dbt_project.yml — folder-level materialization defaults">
{`name: 'my_dbt_project'
version: '1.0.0'
profile: 'my_dbt_project'

model-paths: ['models']

models:
  my_dbt_project:
    staging:
      +materialized: view
    intermediate:
      +materialized: ephemeral
    marts:
      +materialized: table
      finance:
        +materialized: table
      large_facts:
        +materialized: incremental`}
        </CodeBox>
        <Para>
          The <code>+</code> prefix on <code>materialized</code> is dbt's config syntax for a setting applied
          to every model in that folder and its subfolders. This configuration says: everything under
          <code>models/staging/</code> defaults to a view, everything under <code>models/intermediate/</code>
          defaults to ephemeral, and everything under <code>models/marts/</code> defaults to a table — except
          anything specifically under <code>models/marts/large_facts/</code>, which defaults to incremental
          instead, since that subfolder-level setting is more specific and wins over the broader
          <code>marts</code> default above it.
        </Para>
        <Table
          headers={['Where it is set', 'Scope', 'When to use it']}
          rows={[
            ['{{ config(materialized=...) }} in a model file', 'That one model only.', 'A single model needs to differ from its folder\'s convention.'],
            ['+materialized under a path in dbt_project.yml', 'Every model under that folder path (and subfolders, unless overridden).', 'Setting a sensible team-wide default so nobody has to remember to set it per model.'],
          ]}
        />
        <Para>
          When both are set, the per-model <code>config()</code> always wins over the folder-level default —
          this is what lets a folder default to <code>table</code> while one specific model inside it is
          deliberately set to <code>view</code> without changing the convention for everything else in that
          folder.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — The decision framework" />
        <SectionTitle>Choosing the Right Materialization for a Model's Actual Usage Pattern</SectionTitle>
        <Para>
          There is no single "best" materialization — the right choice depends entirely on how a specific
          model is actually used: how often it's queried, how expensive its underlying logic is, how large
          the underlying data is, and how many other models depend on it. The following framework is the one
          that shows up, in some form, in almost every real dbt project.
        </Para>
        <Table
          headers={['Model type', 'Usual materialization', 'Why']}
          rows={[
            ['Staging models (light cleaning, one raw table each)', 'view', 'Logic is cheap to recompute, and staging models are usually consumed by only a few downstream models — paying storage and rebuild cost for a precomputed copy rarely earns its keep.'],
            ['Marts queried directly by BI tools / dashboards', 'table', 'Dashboards may re-query the same mart dozens or hundreds of times a day; precomputing once per scheduled run and serving fast reads afterward is far cheaper than recomputing the full logic on every dashboard refresh.'],
            ['Small, reusable logic snippets used by one or two models', 'ephemeral', 'No standalone object is needed, avoiding storage and a separate build step, as long as reuse stays narrow enough that inlining the same CTE two or three times is still cheap overall.'],
            ['Large, append-heavy fact tables (events, orders, logs)', 'incremental', 'A full rebuild of a hundred-million-row table on every run is slow and expensive; processing only new/changed rows keeps runtime and compute proportional to what actually changed.'],
          ]}
        />
        <SubTitle>The questions worth asking before setting a materialization</SubTitle>
        <BulletList
          items={[
            'How many things read from this model? A handful of downstream models favors view or ephemeral; many downstream models or many BI queries favors table.',
            'How expensive is the underlying SELECT? A trivial cast-and-rename favors view; heavy joins or aggregations favor table so that cost is paid once, not on every read.',
            'How large is the underlying data, and is it append-heavy or fully mutable? A huge, mostly-append table is exactly what incremental exists for; a small or fully-rewritten-each-run table gains little from incremental\'s added complexity.',
            'Is this logic reused by more than one or two downstream models? If so, avoid ephemeral — the recompute-on-every-reference cost compounds with every additional consumer.',
            'Does anything need to query this object directly and inspect it in isolation for debugging? If yes, it cannot be ephemeral, since ephemeral models never exist as anything queryable on their own.',
          ]}
        />
        <Callout title="Start conservative, promote based on evidence, not habit" color={K}>
          A common and reasonable default: start every new staging model as a view and every new mart as a
          table, then promote a specific model to something else only once you've actually observed a real
          cost — a mart's full rebuild taking too long, a view being queried heavily enough that recomputing
          it every time is measurably expensive, a fact table's incremental logic clearly earning back the
          added complexity. Materializing everything as a table "to be safe" inflates storage and compute for
          models that never needed it; materializing everything as incremental "for performance" adds
          unnecessary complexity and unique-key risk to models that would have been perfectly fine as a plain
          table.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — A worked example across a whole layer" />
        <SectionTitle>Applying the Framework to a Real Three-Layer Project</SectionTitle>
        <Para>
          Bringing the whole module together: a realistic small slice of a project, with each model's
          materialization chosen deliberately based on its actual usage pattern rather than by default habit.
        </Para>
        <CodeBox label="dbt_project.yml — the folder-level defaults for this project">
{`models:
  my_dbt_project:
    staging:
      +materialized: view
    marts:
      finance:
        +materialized: table
      events:
        +materialized: incremental`}
        </CodeBox>
        <CodeBox label="models/staging/stg_orders.sql — view (inherits the folder default, no override needed)">
{`SELECT
  order_id::varchar AS order_id,
  customer_id::varchar AS customer_id,
  order_ts::timestamp AS order_ts,
  LOWER(status) AS status,
  total_usd::numeric(12,2) AS total_usd,
  updated_at
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL`}
        </CodeBox>
        <CodeBox label="models/marts/finance/fct_orders.sql — table (inherits marts/finance default)">
{`SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM {{ ref('stg_orders') }}
WHERE status != 'test_order'`}
        </CodeBox>
        <CodeBox label="models/marts/events/page_views.sql — incremental (inherits marts/events default)">
{`{{ config(unique_key='event_id') }}

SELECT
  event_id,
  customer_id,
  page_url,
  event_ts,
  updated_at
FROM {{ ref('stg_page_view_events') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`}
        </CodeBox>
        <CodeBox label="models/marts/product/customer_lookup.sql — a deliberate per-model override">
{`{{ config(materialized='view') }}

-- Overrides the marts default of table: this is a thin passthrough
-- of stg_customers used by exactly one downstream model, and rebuilding
-- it as a table on every run buys nothing.
SELECT customer_id, email, country_code
FROM {{ ref('stg_customers') }}`}
        </CodeBox>
        <Para>
          Every model here got a materialization chosen for a reason grounded in Part 08's framework: staging
          stays a view because it's cheap and lightly consumed; the finance mart is a table because BI tools
          hit it repeatedly; the events mart is incremental because <code>page_views</code> is exactly the
          large, append-heavy table incremental exists for; and one specific product mart deliberately
          overrides its folder's table default back to a view, because in this one case the folder-level
          default doesn't actually fit that particular model's real usage pattern.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Changing materializations safely" />
        <SectionTitle>Switching a Model's Materialization Later — And Why --full-refresh Matters</SectionTitle>
        <Para>
          Materializations are not fixed for a model's lifetime. It is completely normal, and expected, to
          start a model as a view and later promote it to a table or incremental once its real usage pattern
          justifies the change, exactly as Part 08's callout recommends. But changing the `materialized`
          config value alone is not always enough on its own — understanding what dbt actually does when a
          model's materialization changes between runs avoids a class of confusing, silent problems.
        </Para>
        <Para>
          When a model's config changes from `view` to `table`, the next `dbt run` correctly detects this and
          runs the appropriate `CREATE OR REPLACE TABLE` in place of the old view — dbt handles a view-to-table
          promotion cleanly on its own, dropping the old view object and replacing it with a table under the
          same name. The situation that needs care is the reverse direction, and especially anything involving
          `incremental`.
        </Para>
        <CodeBox label="Switching a model to incremental for the first time">
{`-- Yesterday: models/marts/events/page_views.sql
{{ config(materialized='table') }}

SELECT event_id, customer_id, page_url, event_ts, updated_at
FROM {{ ref('stg_page_view_events') }}

-- Today: switched to incremental
{{ config(materialized='incremental', unique_key='event_id') }}

SELECT event_id, customer_id, page_url, event_ts, updated_at
FROM {{ ref('stg_page_view_events') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`}
        </CodeBox>
        <Para>
          The first `dbt run` after this change matters more than it looks. Because a table named
          `page_views` already exists from yesterday's `table` materialization, dbt's incremental logic can
          get confused about whether that existing object was actually built using the incremental strategy it
          now expects — the safe move any time a model's materialization changes to or from `incremental`, or
          any time the underlying schema of an incremental model changes, is to force a complete rebuild with
          the `--full-refresh` flag.
        </Para>
        <CodeBox label="Forcing a full rebuild after a materialization or schema change">
{`dbt run --select page_views --full-refresh`}
        </CodeBox>
        <Para>
          <code>--full-refresh</code> tells dbt to ignore whatever already exists under that name, drop it,
          and rebuild the model completely from scratch — for an incremental model specifically, this means
          <code>is_incremental()</code> evaluates to <code>false</code> for that one run regardless of whether
          a table already exists, exactly as it would on a genuinely first-ever run. This is the same
          mechanism covered in Part 05; the difference here is recognizing when you need to trigger it
          deliberately, rather than relying on it only firing automatically on a project's very first run.
        </Para>
        <Table
          headers={['Change made', 'Safe to run normally?', 'When --full-refresh is needed']}
          rows={[
            ['view -> table', 'Yes — dbt drops the view and creates the table cleanly.', 'Not required, though harmless if run anyway.'],
            ['table -> incremental', 'Risky without it.', 'Recommended on the first run after this change, so the model rebuilds cleanly under the new strategy.'],
            ['Adding/removing a column on an incremental model', 'No — a plain run may fail or silently produce a schema mismatch.', 'Required — the existing table\'s columns no longer match what the model now selects.'],
            ['Changing unique_key on an incremental model', 'No — old rows were deduplicated under the previous key logic.', 'Required — otherwise the merge behavior is inconsistent between old and new rows.'],
          ]}
        />
        <Callout title="A silent schema mismatch is worse than an error" color={K}>
          The riskiest case is not the run that fails loudly — it's the one that succeeds but produces subtly
          wrong data, such as an incremental model that keeps merging new rows against a unique_key definition
          that no longer matches how older rows were deduplicated. Any time a model's materialization changes,
          or an incremental model's unique_key or column set changes, treat --full-refresh as the default move
          rather than something to reach for only after something looks wrong.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — dbt run vs dbt build" />
        <SectionTitle>dbt run Builds Models; dbt build Builds Models, Tests, Snapshots, and Seeds Together</SectionTitle>
        <Para>
          Every example in this module has shown models being built with `dbt run`. It's worth being precise
          about what that command actually does relative to its more complete sibling, `dbt build`, because
          the difference affects how quickly a broken materialization surfaces.
        </Para>
        <Para>
          `dbt run` executes models — and only models — in dependency order, applying whatever materialization
          each one is configured with. It does not run tests. This means a model can build successfully with
          `dbt run`, showing green in the logs, while quietly violating a `unique` or `not_null` test attached
          to it — the test simply never ran. `dbt build` runs models, tests, snapshots, and seeds together in
          one dependency-ordered pass, and critically, it can stop a downstream model from building at all if
          an upstream test fails.
        </Para>
        <CodeBox label="The practical difference on a project with a failing test">
{`dbt run
# stg_orders builds successfully
# fct_orders builds successfully, using stg_orders' data as-is
# no tests ran -- a duplicate order_id in stg_orders goes unnoticed

dbt build
# stg_orders builds
# not_null/unique tests on stg_orders run immediately after
# a failing unique test on stg_orders.order_id can block fct_orders
#   from building on top of known-bad data, depending on how the
#   project's test severity and stop-on-failure behavior is configured`}
        </CodeBox>
        <Para>
          This matters directly for materializations because an expensive `table` or `incremental` rebuild is
          exactly the kind of work you don't want to repeat on top of bad upstream data. A pipeline built
          around `dbt build` rather than `dbt run` catches a broken assumption at the cheapest possible point
          — right after the model that introduced it — instead of letting every downstream table or
          incremental model rebuild on top of it first and only discovering the problem once someone notices a
          number looks wrong.
        </Para>
        <Table
          headers={['Command', 'What it runs', 'When tests run relative to models']}
          rows={[
            ['dbt run', 'Models only, in dependency order.', 'Never — tests are a completely separate command (dbt test).'],
            ['dbt test', 'Tests only, against whatever models already exist.', 'Standalone — assumes models were already built by a prior dbt run.'],
            ['dbt build', 'Models, tests, snapshots, and seeds together, in dependency order.', 'Immediately after each model builds, before its downstream dependents run.'],
          ]}
        />
        <Callout title="Prefer dbt build for anything scheduled" color={K}>
          `dbt run` plus a separate `dbt test` afterward can look equivalent to `dbt build` on the surface, but
          it isn't: that separate `dbt test` step runs only after every model in the project has already
          finished building, including every downstream table and incremental model that may have already
          rebuilt on top of bad data from an untested upstream model. dbt build&apos;s interleaved order is what
          actually prevents that from happening.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Custom materializations and config precedence in depth" />
        <SectionTitle>Where the Four Built-In Materializations Actually Come From, and How Config Layers Resolve</SectionTitle>
        <Para>
          It's worth knowing that <code>view</code>, <code>table</code>, <code>ephemeral</code>, and
          <code>incremental</code> are not hardcoded special cases inside dbt's engine — they are themselves
          written in dbt's own macro language, as reusable Jinja/SQL templates that ship with dbt and its
          adapters. This is why different warehouse adapters (Snowflake, BigQuery, Postgres, Redshift) can
          each compile a <code>table</code> materialization slightly differently under the hood — a Snowflake
          adapter's table materialization macro knows to emit Snowflake-flavored DDL, while a BigQuery
          adapter's emits BigQuery-flavored DDL, even though both are configured identically from the model's
          point of view with <code>materialized='table'</code>.
        </Para>
        <Para>
          This also means teams with a genuinely unusual persistence need can define their own custom
          materialization as a macro, though this is uncommon and should be a late resort — reached for only
          once the four built-in materializations covered in this module have been confirmed not to fit,
          since a custom materialization means maintaining warehouse-specific DDL logic yourselves instead of
          relying on dbt's well-tested built-in implementations.
        </Para>
        <SubTitle>How multiple config sources resolve into one final materialization</SubTitle>
        <Para>
          Parts 06 and 07 showed materialization set two ways — inline in a model's <code>config()</code> call,
          and as a folder default in <code>dbt_project.yml</code>. When more than one of these could apply to
          the same model, dbt resolves them using a fixed precedence, most specific wins:
        </Para>
        <CodeBox label="Config precedence, most specific first">
{`1. {{ config(materialized=...) }} inside the model's own .sql file       <- wins
2. A schema.yml config block for that specific model
3. The most specific matching folder path in dbt_project.yml
   (models.my_project.marts.finance beats models.my_project.marts)
4. A less specific folder path in dbt_project.yml
   (models.my_project.marts beats models.my_project)
5. dbt's own built-in default (view)                                       <- loses`}
        </CodeBox>
        <Para>
          The practical value of understanding this precedence is debugging a model that seems to be
          materializing differently than expected. If a model under <code>marts/finance/</code> is building as
          a view when the team's convention says marts should be tables, the first thing to check is whether
          that specific model has its own <code>config(materialized='view')</code> call overriding the folder
          default — a common source of "why is this one model different" confusion that a quick file-open
          resolves immediately, once you know the override exists and is expected to win.
        </Para>
        <Table
          headers={['Config source', 'Specificity', 'Wins against']}
          rows={[
            ['config() in the model .sql file', 'Most specific — applies to exactly one model.', 'Everything else.'],
            ['dbt_project.yml, deepest matching folder path', 'Specific to one subfolder and everything under it.', 'Any shallower folder path in the same file.'],
            ['dbt_project.yml, shallow/root folder path', 'Broad project-wide or top-level-folder default.', 'Only dbt\'s built-in view default.'],
            ['dbt\'s built-in default (view)', 'Least specific — applies only when nothing else is configured.', 'Nothing — this is the fallback of last resort.'],
          ]}
        />
        <Callout title="A missing config is not an error — it silently falls through to view" color={K}>
          A model with no config() call at all and no matching dbt_project.yml entry does not fail to build —
          it silently materializes as a view, dbt's built-in default. This is a common source of "why is this
          brand-new model a view when everything else in its folder is a table" confusion: usually the answer
          is simply that the new model was added to a folder whose dbt_project.yml entry doesn't actually
          cover it, often because of a typo in the folder path or a new subfolder that wasn't added to the
          config.
        </Callout>
      </section>

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Materializations</SectionTitle>
        {[
          {
            wrong: '"Table materializations are always better because they\'re faster to query"',
            right: 'Part 03 and Part 08 both make the actual trade-off explicit: a table is fast to query because it pays its cost once, up front, on every rebuild — for a huge model rebuilt frequently and queried rarely, that upfront cost can be far worse than a view\'s pay-per-query cost. "Faster to query" is not the same as "cheaper overall."',
          },
          {
            wrong: '"An ephemeral model is basically a free view — no downside to using it everywhere"',
            right: "Part 04's callout is direct about this: ephemeral models are inlined as a fresh CTE inside every single model that references them. Reused by five downstream models, that SELECT is recomputed five separate times at execution — strictly worse than a view in that scenario, since a view is at least one single named object, and ephemeral is not queryable in isolation for debugging at all.",
          },
          {
            wrong: '"Incremental models only process new rows, so they\'re always faster and should be the default for big tables"',
            right: 'Part 05 is careful to describe incremental as a first-run-full-build, then-partial-build pattern — not a magic performance switch. It genuinely helps for large, append-heavy tables, but it adds real complexity (a correct unique_key, a correct filter condition) that a plain table materialization does not need; reaching for it as a default "for big tables" without that complexity being earned is exactly the anti-pattern Part 08\'s callout warns against.',
          },
          {
            wrong: '"Setting +materialized in dbt_project.yml locks every model in that folder to that materialization"',
            right: "Part 07 explains the actual precedence: a folder-level +materialized setting is only a default. Any individual model can override it with its own {{ config(materialized=...) }} call, exactly as shown in Part 09's customer_lookup.sql example, which deliberately overrides its folder's table default back to a view.",
          },
          {
            wrong: '"Materialization is about correctness — some materializations produce more accurate results than others"',
            right: "Part 01's framing is the correction here: every materialization of the same SELECT statement produces the identical logical result. The choice is purely about cost, freshness timing, and storage — never about whether the output rows are correct, since the underlying SELECT is unchanged across all four materializations.",
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Observing materialization cost in practice" />
        <SectionTitle>Measuring the Trade-Off Instead of Guessing at It</SectionTitle>
        <Para>
          Every recommendation in Part 08's decision framework is a starting heuristic, not a substitute for
          actually measuring what a specific model costs under its current materialization. Most dbt runs log
          per-model timing, and most warehouses expose query history that can be joined back to dbt's own
          run metadata — together, these are what turn "this table feels slow to rebuild" into a specific,
          actionable number.
        </Para>
        <CodeBox label="dbt's own run summary — per-model timing at a glance">
{`dbt run --select marts.finance`}
        </CodeBox>
        <Output>{`15:02:01  Running with dbt=1.8.0
15:02:02  1 of 3 START sql table model prod.fct_orders .................. [RUN]
15:02:44  1 of 3 OK created sql table model prod.fct_orders ............. [SUCCESS 1 in 42.11s]
15:02:44  2 of 3 START sql table model prod.daily_revenue ............... [RUN]
15:02:46  2 of 3 OK created sql table model prod.daily_revenue .......... [SUCCESS 1 in 1.83s]
15:02:46  3 of 3 START sql view model prod.customer_lookup .............. [RUN]
15:02:46  3 of 3 OK created sql view model prod.customer_lookup ......... [SUCCESS 1 in 0.09s]
15:02:46
15:02:46  Completed successfully`}
        </Output>
        <Para>
          A 42-second rebuild for <code>fct_orders</code> against a 1.83-second rebuild for
          <code>daily_revenue</code> built directly on top of it is exactly the kind of signal Part 08's
          framework is meant to be checked against with real numbers — if <code>fct_orders</code> keeps
          growing and that 42 seconds becomes 20 minutes as the underlying order volume grows month over
          month, that is the concrete trigger for evaluating an incremental conversion, not a vague sense
          that "this table feels big now."
        </Para>
        <Para>
          On the query side, most warehouses (Snowflake's <code>QUERY_HISTORY</code>, BigQuery's
          <code>INFORMATION_SCHEMA.JOBS</code>, Redshift's system tables) can be filtered to the queries a
          view's downstream readers actually issue, which is the other half of the trade-off Part 02 and Part
          03 describe — a view's cost shows up spread across every downstream reader's query time, not in the
          dbt run log at all, so checking dbt's run timing alone would make a heavily-queried view look free
          when it is actually the more expensive choice in aggregate.
        </Para>
        <Table
          headers={['Where to look', 'What it tells you', 'Which materialization decision it informs']}
          rows={[
            ['dbt run log timing (per model)', 'How expensive a table or incremental rebuild is per run.', 'Whether a table\'s rebuild cost justifies converting it to incremental.'],
            ['Warehouse query history, filtered to a view\'s downstream readers', 'How often and how expensively a view is actually being queried in aggregate.', 'Whether a heavily-hit view should be promoted to a table.'],
            ['Storage cost per object (warehouse-specific storage metrics)', 'How much a table or incremental model is costing to simply exist on disk.', 'Whether a rarely-queried table would be cheaper overall as a view.'],
          ]}
        />
        <Callout title="A view that looks cheap in dbt's logs can be the most expensive object in the project" color={K}>
          Because a view's compute cost never appears in a dbt run log at all — dbt only redefines the view,
          it never executes the underlying SELECT during the run — it is easy to overlook a view that is
          quietly the single most expensive query pattern in the entire warehouse, simply because a
          dashboard queries it constantly. Measuring materialization cost means checking both sides: dbt's own
          run timing for build-time cost, and the warehouse's query history for read-time cost.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Peloton:</strong> a workout-events mart, materialized as a plain table, has grown to
            hundreds of millions of rows and now takes 40 minutes to fully rebuild on every scheduled run,
            most of which is spent recomputing rows from months ago that never change. Following Part 05 and
            Part 08, an engineer converts it to incremental with a <code>updated_at</code>-based filter — the
            nightly run drops from 40 minutes to under 3, since only the last day's worth of new workout
            events actually needs processing on a normal run.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Chime:</strong> a new analyst notices a "helper" model buried in the intermediate
            layer, materialized as ephemeral, that turns out to be referenced by eleven different downstream
            marts. Following Part 04's callout, the team realizes that filter logic is being recomputed
            eleven separate times on every run instead of once. Switching it to a view (it's cheap logic, just
            widely reused) cuts meaningful redundant compute out of the nightly build with a one-line config
            change.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Grubhub:</strong> a finance dashboard querying a daily-revenue mart directly as a view
            starts timing out during peak reporting hours, because dozens of finance team members are all
            triggering the same expensive aggregation query simultaneously. Per Part 02's callout and Part 08's
            framework, the team switches it to a table rebuilt once after the nightly batch load finishes —
            the dashboard now reads precomputed rows instantly, and the expensive aggregation runs exactly
            once per day instead of once per dashboard refresh.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Explain what a materialization is in dbt, and why the same model file can produce different warehouse objects.',
            a: `A materialization, per Part 01, is the strategy dbt uses to persist a model's SELECT statement as an actual object in the warehouse — it answers "what does this model actually become when dbt runs it," completely separately from what the SELECT statement itself says. The underlying business logic never changes across materializations; only how dbt builds and stores that logic's result changes.

Concretely, the same SELECT can compile to a CREATE OR REPLACE VIEW (view), a CREATE OR REPLACE TABLE ... AS SELECT (table), get inlined as a CTE into whatever references it with no standalone object created at all (ephemeral), or get built in full once and then only partially rebuilt on later runs (incremental), covered in Parts 02 through 05. The choice is set via config(materialized=...) on the model or a folder-level default in dbt_project.yml, per Part 06 and Part 07.

The reason this separation matters is that it lets a team change the cost/freshness trade-off of a model — say, promoting a staging model from a view to a table because it turned out to be queried far more than expected — without touching a single line of the actual transformation logic.`,
          },
          {
            q: 'Q2. What SQL does dbt actually run for a view materialization versus a table materialization, and what does that difference mean operationally?',
            a: `Per Part 02 and Part 03, a view compiles to CREATE OR REPLACE VIEW ... AS (the select) — no data is written, only the query definition is stored, so dbt run is fast for a view but every downstream query against it re-executes the full underlying SELECT from scratch. A table compiles to CREATE OR REPLACE TABLE ... AS (the select) — the SELECT actually executes once at build time and the resulting rows are physically written to disk, so dbt run pays the full compute cost of that build, but every subsequent query just reads precomputed rows without re-running any of the underlying logic.

Operationally, this means a view's cost is paid repeatedly by whoever queries it, proportional to how often that happens, while a table's cost is paid once per dbt run regardless of how many times it's queried afterward. A model queried constantly by a BI tool is much better off as a table for exactly this reason — you'd rather pay the compute cost once overnight than on every dashboard refresh during business hours.

I'd also flag that "table is more expensive to run" and "table is more expensive overall" are not the same claim — for a model queried heavily, a table is usually cheaper in total compute than a view, even though the individual dbt run costs more than a view's would.`,
          },
          {
            q: 'Q3. What actually happens to an ephemeral model at compile time, and when does using ephemeral become a bad decision?',
            a: `Per Part 04, an ephemeral model never becomes a standalone database object at all — no view, no table, nothing queryable on its own. Instead, its SELECT statement is inlined as a CTE directly into the compiled SQL of every model that references it via ref(). It only exists at compile time, as reusable SQL text spliced into whatever consumes it.

This becomes a bad decision once that ephemeral model is referenced by more than one or two downstream models. Since the CTE is inlined and recompiled independently inside each referencing model's own compiled query, being referenced by, say, eight different downstream models means that same underlying SELECT gets executed eight separate times across the project's build, instead of once. At that point it's strictly worse than a view — same recompute-every-time cost profile as a view, but multiplied across every consumer, with the added downside that you can't query it directly in isolation to debug it, since it was never built as its own object.

The right time to reach for ephemeral is narrow: small, cheap, genuinely reusable logic — a filter, a light rename — consumed by exactly one or two models, purely to keep those models' SQL readable without paying for a standalone object nobody else needs.`,
          },
          {
            q: 'Q4. How does an incremental model know whether to do a full build or a partial build, and what happens if you skip the is_incremental() check entirely?',
            a: `Per Part 05, dbt determines this through the is_incremental() Jinja macro, which evaluates to false on the very first run of the model (or any run using --full-refresh) — there is no existing table for {{ this }} to reference yet, so the model builds in full, behaving exactly like a table materialization for that one run. On every subsequent normal run, is_incremental() evaluates to true, and whatever SQL is wrapped in that conditional — typically a WHERE clause filtering to rows newer than what's already been built — actually takes effect.

If you configure a model as materialized='incremental' but never write an is_incremental() check at all, the model has no logic telling it to filter anything on later runs — depending on the exact incremental strategy configured, this commonly means every run reprocesses the entire underlying source every time, which defeats the entire performance purpose of choosing incremental in the first place, while still carrying incremental's added complexity around unique_key and merge behavior for no benefit.

This is exactly why is_incremental() isn't optional boilerplate — it's the mechanism that gives a single model file two different behaviors depending on whether a built table already exists to compare against.`,
          },
          {
            q: 'Q5. You inherit a dbt project where every single model, staging through marts, is materialized as a table. What would you actually change, and how would you decide?',
            a: `I wouldn't change anything purely on principle — per Part 08, the goal is matching materialization to actual usage pattern, not chasing a "correct" ratio of views to tables. I'd start by looking at each model's real usage: how many things read from it, how expensive its underlying SELECT is, and how large and how mutable the underlying data is.

Staging models that are only read by one or two downstream models and do cheap, light transformations are strong candidates to become views, per Part 02 — there's no real benefit to paying full rebuild cost every run for logic that's trivial to recompute on demand. Any small, narrowly-reused helper logic buried in an intermediate layer is a candidate for ephemeral, per Part 04, as long as I confirm it really is only used by one or two models and not silently reused more widely than it looks.

Separately, I'd look for any large, append-heavy fact or event tables among the marts — those are the strongest candidates for incremental, per Part 05, since a full table rebuild on something with hundreds of millions of rows is usually the single most expensive and slowest step in the whole pipeline, and is very likely the actual pain point that led to this project being audited in the first place. I'd leave marts that are genuinely hit hard by BI tools as tables, since that's usually already the right choice for that usage pattern — the goal is targeted change based on evidence, not converting everything away from table just because it's currently uniform.`,
          },
          {
            q: 'Q6. What actually happens when you change a model from table to incremental, and what could go wrong if you just change the config and run it normally?',
            a: `Per Part 10, dbt detects the config change and switches which macro it uses to build the model, but the table object that already exists on disk from the previous table materialization doesn't disappear on its own — it's still sitting there under the same name. On the next normal run, depending on the adapter and incremental strategy configured, dbt may attempt to treat that existing table as if it were already a valid incremental target and apply a merge or insert against it, even though it was never built with the unique_key or column expectations the new incremental config assumes.

The safe move, which Part 10 covers directly, is running that first post-change build with --full-refresh, which tells dbt to drop whatever exists under that name and rebuild completely from scratch under the new incremental logic — for that one run, is_incremental() evaluates to false exactly as it would on a genuinely first-ever build, and the model ends up in a clean, correctly-initialized state before any partial incremental runs happen on top of it.

Skipping --full-refresh here is exactly the kind of mistake that doesn't fail loudly — the run can succeed, and the resulting data can still be subtly wrong, because rows written under the old table materialization's assumptions get merged against using unique_key logic they were never built with. I'd treat any materialization change to or from incremental as requiring a deliberate --full-refresh, not something to find out is needed after a downstream number looks off.`,
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
            q: 'Materializing every model as a table "to be safe," regardless of how it\'s actually used',
            a: "Part 08's callout is the direct reference: this inflates storage and compute for models that never needed it — a lightly-queried staging model gains nothing from a full rebuild every run. Start staging models as views and marts as tables, then promote deliberately based on observed cost, not habit.",
          },
          {
            q: 'Reusing an ephemeral model across many downstream models without noticing the recompute multiplies',
            a: "Part 04's callout covers exactly this trap: an ephemeral model referenced by many downstream models gets its underlying SELECT recompiled and re-executed independently inside each one. Check how many models actually call ref() on an ephemeral model before assuming it's still the cheap choice it was when only one model used it.",
          },
          {
            q: 'Reaching for incremental as a default performance switch instead of a considered choice',
            a: "Part 05 and the myths section both flag this: incremental adds real complexity — a correct unique_key, a correct filter condition — that isn't automatically worth it for every big-looking table. Reserve it for models where a full rebuild is genuinely too slow or too expensive, not as an automatic upgrade from table.",
          },
          {
            q: 'Forgetting that a per-model config() always overrides a folder-level dbt_project.yml default',
            a: "Part 07 is explicit about the precedence: a folder-level +materialized setting is only a default, and any individual model's own config(materialized=...) call wins over it. Assuming a folder's setting is absolute can lead to confusion when a specific model behaves differently from its siblings for a documented reason.",
          },
          {
            q: 'Materializing a model as ephemeral because it needs to be debugged or inspected directly',
            a: "Part 04 makes clear that ephemeral models never exist as anything queryable in the warehouse — there is no standalone object to run an ad hoc SELECT against. If a model needs to be inspectable on its own for debugging or validation, it cannot be ephemeral; use a view at minimum.",
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
            error: `Compilation Error: 'this' is undefined, referenced inside an is_incremental() block`,
            cause: "The is_incremental() macro itself is defined for any model, but {{ this }} — a reference to the model's own resulting table — only resolves meaningfully once that table actually exists. This usually surfaces when is_incremental() is somehow evaluating true on what is effectively a first build, or when {{ this }} is used outside of a model context where it doesn't apply.",
            fix: "Confirm the model is actually configured as materialized='incremental' and that the {{ this }} reference sits inside an {% if is_incremental() %} block, exactly as shown in Part 05 and Part 09 — {{ this }} should only ever be referenced in code paths that only run once the table is known to already exist.",
          },
          {
            error: `A dashboard querying a mart directly reports wildly inconsistent numbers on refresh, sometimes different values seconds apart`,
            cause: 'The mart is materialized as a view built on top of frequently-changing source tables, and the dashboard is refreshing during a window where an upstream load or another dbt run is actively modifying the underlying data — because a view recomputes on every query, per Part 02, two queries seconds apart can legitimately see two different underlying states.',
            fix: 'If the dashboard needs a stable, consistent snapshot rather than always-fresh live numbers, materialize the mart as a table instead, per Part 03 and Part 08 — a table only changes when dbt explicitly rebuilds it, giving every query between rebuilds an identical, stable result.',
          },
          {
            error: `Build time for the full dbt project has grown from 10 minutes to over an hour with no code changes, only data growth`,
            cause: "One or more table-materialized models have grown large enough that a full rebuild-from-scratch on every run, which a table materialization always does per Part 03, now dominates total build time — this is a symptom of data volume growth outrunning the chosen materialization, not a bug in any specific model's logic.",
            fix: 'Identify the largest, most frequently-rebuilt table models (dbt run --select --profile or run timing logs will show which models take longest) and evaluate them against Part 08\'s framework for conversion to incremental, specifically ones that are large, growing, and mostly append-only.',
          },
          {
            error: `Two different downstream models produce subtly different results even though both reference the same ephemeral model`,
            cause: "This usually means the ephemeral model's SELECT itself references something non-deterministic (a CURRENT_TIMESTAMP(), a source table still being loaded) and, per Part 04, that SELECT is independently recompiled and re-executed inside each downstream model's own compiled query — so the two downstream models can genuinely evaluate that non-deterministic logic at two different moments in the same build.",
            fix: "Either remove non-deterministic expressions from the ephemeral model's SELECT, or convert it to a table so the value is computed exactly once and both downstream models read the identical precomputed result.",
          },
          {
            error: `Database Error: incompatible types in UNION / INSERT — column "total_usd" is of type numeric but expression is of type character varying`,
            cause: "An incremental model's underlying source changed the type of a column it selects (a source system migrated total_usd from a string field to a proper numeric type, for example), but the model's existing table on disk still has the old column type baked into it from when it was first built, and an incremental run only inserts/merges new rows rather than redefining the table's schema.",
            fix: "Run the model with --full-refresh so the table is dropped and rebuilt from scratch under the new column types, per Part 10's guidance on when a full rebuild is required rather than optional. A plain incremental run cannot fix a column type mismatch on its own, since it never reissues the table's original CREATE statement.",
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
          'A materialization is the strategy dbt uses to persist a model\'s SELECT as a warehouse object — the same underlying logic can become a view, table, ephemeral fragment, or incremental table with no change to the SELECT itself.',
          'view compiles to CREATE OR REPLACE VIEW — cheap to build, but the underlying query is recomputed on every single downstream read.',
          'table compiles to CREATE OR REPLACE TABLE ... AS SELECT — a full rebuild every run, but fast to query afterward since rows are precomputed.',
          'ephemeral is never its own database object — it is inlined as a CTE into every model that references it, which is efficient for narrow reuse and expensive when reused widely, since each reference recomputes it independently.',
          'incremental behaves like a table on the first run, then processes only new or changed rows on subsequent runs, guarded by the is_incremental() macro — full mechanics covered in the next module.',
          'Materialization is set per model with {{ config(materialized=...) }} or per directory with +materialized in dbt_project.yml, with the per-model setting always winning when both are present.',
          'Choosing the right materialization is a cost-and-usage decision, not a correctness decision: staging models usually default to views, BI-facing marts to tables, narrow shared snippets to ephemeral, and large append-heavy fact tables to incremental.',
        ]}
      />
    </LearnLayout>
  )
}
