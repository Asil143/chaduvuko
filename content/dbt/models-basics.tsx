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

export default function ModelsBasics() {
  return (
    <LearnLayout
      title="Models: SELECT Statements as the Building Block"
      description="What a dbt model actually is, how filenames become object names, why the default materialization is a view, the config() Jinja block, staging/intermediate/marts organization, and a full worked staging model example."
      section="dbt — Module 04"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Models: SELECT Statements as the Building Block', href: '/learn/dbt/models-basics' },
      ]}
      prev={{ title: 'Setting Up a dbt Project', href: '/learn/dbt/project-setup' }}
      next={{ title: 'Sources, ref(), and the Dependency Graph', href: '/learn/dbt/sources-and-ref' }}
    >
      {/* ── Part 01 — What a model literally is ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Core Idea" />
        <SectionTitle>A dbt Model Is One File Containing One SELECT Statement</SectionTitle>

        <Para>
          Strip away everything dbt does around scheduling, testing, and
          documentation, and the core primitive is almost anticlimactically
          simple: a model is a single <code>.sql</code> file, living
          somewhere under your project's <code>models/</code> directory,
          containing exactly one <code>SELECT</code> statement. That's it.
          No <code>CREATE TABLE</code>, no <code>CREATE VIEW</code>, no
          <code>DROP</code>, no DDL of any kind. You write the query that
          describes the transformation you want, and dbt handles everything
          about turning that query into an actual object in your warehouse.
        </Para>

        <CodeBox label="a complete, valid dbt model — the entire file">
{`-- models/staging/stg_orders.sql
select
    order_id,
    customer_id,
    order_status,
    order_placed_at
from raw.orders`}
        </CodeBox>

        <Para>
          That five-line file is a fully functional dbt model. When you run
          <code>dbt run</code>, dbt reads this file, wraps your
          <code>SELECT</code> statement in whatever DDL is appropriate —
          typically something like <code>CREATE OR REPLACE VIEW
          dbt_asil.stg_orders AS (select ... )</code> — and executes that
          wrapped statement against your warehouse. You never write the
          wrapping DDL yourself. You are only ever responsible for the
          <code>SELECT</code>.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Why this constraint is a feature, not a limitation:</strong>
            {' '}by restricting every model to "just a SELECT," dbt can treat
            every model uniformly — it can reason about what tables and
            other models a given <code>SELECT</code> statement depends on,
            build a dependency graph automatically, decide the correct
            order to run everything in, and swap the wrapping DDL between a
            view, a table, or something more advanced without you ever
            touching the model file itself. None of that would be possible
            if models were allowed to contain arbitrary, hand-written DDL.
          </Para>
        </HighlightBox>

        <Para>
          This is a genuinely different mental model from writing raw SQL
          scripts. In a plain SQL script you'd write
          <code>CREATE OR REPLACE TABLE analytics.orders AS SELECT ...</code>
          yourself, decide the object's exact name yourself, and run scripts
          in whatever order you remembered was correct. A dbt model removes
          all three of those manual steps — the naming, the DDL, and the
          run order — and replaces them with configuration and file
          location, which is what the rest of this module covers.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Filename becomes object name ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Naming Is Configuration" />
        <SectionTitle>The Filename Becomes the Object Name — There Is No Separate Naming Step</SectionTitle>

        <Para>
          A model has no explicit "name this object X" setting you fill in
          by default. The filename itself — minus the <code>.sql</code>
          extension — is the name dbt gives the resulting view or table in
          your warehouse. A file called <code>stg_orders.sql</code> becomes
          an object named <code>stg_orders</code>. There is no separate
          naming step to forget, and also no way to give a model a display
          name that differs from its filename without an explicit
          <code>alias</code> config override.
        </Para>

        <CodeBox label="filename → object name, directly">
{`models/staging/stg_orders.sql        →  stg_orders   (view, by default)
models/staging/stg_customers.sql     →  stg_customers
models/marts/fct_orders.sql          →  fct_orders
models/marts/dim_customers.sql       →  dim_customers`}
        </CodeBox>

        <Para>
          This has a real practical consequence: renaming a model file
          renames the object dbt creates. If you rename
          <code>stg_orders.sql</code> to <code>stg_orders_v2.sql</code>,
          dbt will build a brand-new object called <code>stg_orders_v2</code>
          the next time it runs — it does not rename the old
          <code>stg_orders</code> object in place, and the old object is
          left behind in your warehouse until something explicitly drops
          it. Renaming a model file is therefore not a purely cosmetic
          change; it is effectively creating a new table and orphaning the
          old one.
        </Para>

        <Table
          headers={['File path', 'Resulting object name (default)', 'Note']}
          rows={[
            ['models/staging/stg_orders.sql', 'stg_orders', 'Folder name (staging) is not part of the object name by default'],
            ['models/marts/finance/fct_revenue.sql', 'fct_revenue', 'Nested subfolders still just contribute config scoping, not naming, by default'],
            ['models/staging/stg_orders.sql renamed to stg_orders_clean.sql', 'stg_orders_clean (new object)', 'The old stg_orders object is not renamed — it is orphaned unless manually dropped'],
          ]}
        />

        <Callout title="Because naming is filename-based, naming conventions matter enormously" color={K}>
          Since there is no separate naming field to double-check, a
          consistent file naming convention (like the <code>stg_</code>,
          <code>int_</code>, <code>fct_</code>, <code>dim_</code> prefixes
          used throughout this track) is what keeps a project's warehouse
          objects self-describing at a glance. A model named
          <code>orders2_final_v3.sql</code> is a naming problem you will
          regret, because that exact string is what shows up in every
          downstream tool querying the warehouse directly — not just inside
          dbt.
        </Callout>

        <Para>
          It is possible to override the default filename-based name using
          an <code>alias</code> config, if you genuinely need the warehouse
          object name to differ from the model's filename (a common reason:
          migrating an existing table's name without renaming the model
          file that many other models already <code>ref()</code> against).
          But this is the exception, not the default behavior, and should be
          used deliberately rather than as a routine habit.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — Default materialization: view ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Default Materialization" />
        <SectionTitle>An Unconfigured Model Compiles to a View — Not a Table</SectionTitle>

        <Para>
          This is one of the most important defaults to know cold, because
          it silently shapes both cost and behavior if you're not aware of
          it: a bare dbt model, with no <code>config()</code> block at all,
          materializes as a <strong>view</strong>. Not a table. A view.
        </Para>

        <CodeBox label="the same stg_orders.sql from part 01, with no config at all">
{`select
    order_id,
    customer_id,
    order_status,
    order_placed_at
from raw.orders`}
        </CodeBox>

        <Para>
          Running <code>dbt run</code> against this exact file compiles to
          something close to this behind the scenes:
        </Para>

        <CodeBox label="what dbt actually executes against the warehouse, for a view materialization">
{`create or replace view dbt_asil.stg_orders as (
    select
        order_id,
        customer_id,
        order_status,
        order_placed_at
    from raw.orders
);`}
        </CodeBox>

        <Para>
          A view stores no data of its own — it's a saved query definition
          that the warehouse re-executes against the underlying
          <code>raw.orders</code> table every single time something queries
          <code>stg_orders</code>. This has real consequences: a view is
          cheap to create (no data is copied anywhere) and always reflects
          the current state of its source data with zero staleness, but
          every query against it re-runs the full underlying transformation,
          which gets expensive if the transformation is complex or the
          underlying table is large and the view gets queried frequently.
        </Para>

        <Table
          headers={['Materialization', 'What gets created', 'Data freshness', 'Query cost']}
          rows={[
            ['view (the default)', 'A saved query definition — no data stored', 'Always current — recomputed on every query', 'Recomputes the full transformation on every downstream query'],
            ['table', 'A physical copy of the query result, rebuilt entirely on every dbt run', 'Current as of the last dbt run, not necessarily "now"', 'Cheap to query — reads pre-computed data with no recomputation'],
            ['incremental', 'A physical table that is appended to or merged into, not fully rebuilt each run', 'Current as of the last run, updated incrementally rather than fully', 'Cheap to query, and cheaper to build than a full table rebuild on large datasets'],
            ['ephemeral', 'Nothing at all in the warehouse — inlined as a CTE into whatever references it', 'N/A — it has no independent existence', 'No cost on its own; its cost is absorbed into whatever model references it'],
          ]}
        />

        <Callout title="A silent, expensive default at the wrong layer" color="#ef4444">
          The view default is deliberately safe for staging models — they
          are typically thin, one-to-one cleanups of a source table, so
          re-executing them per query is cheap. The mistake people make is
          leaving a heavy, multi-join, aggregation-filled mart model as an
          unconfigured view — every dashboard query hitting it recomputes
          the entire expensive join and aggregation from scratch, every
          single time. That specific case is exactly what
          <code>materialized: table</code> exists to fix, which Part 04
          covers.
        </Callout>

        <Para>
          Materialization is not a property of the SQL itself — the exact
          same <code>SELECT</code> statement can be materialized as a view
          today and a table tomorrow with no change to the query at all,
          purely by changing configuration. This is the direct payoff of
          Part 01's "models are just a SELECT" constraint: because dbt owns
          the wrapping DDL, it can swap that DDL out entirely based on
          config, without you touching your transformation logic.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — the config() block ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Per-Model Configuration" />
        <SectionTitle>The config() Block — Per-Model Settings, Inline With the SQL</SectionTitle>

        <Para>
          Module 03 showed how <code>dbt_project.yml</code> sets default
          materializations per directory. But sometimes one specific model
          needs to override that default — a single heavy mart model that
          should be a table even though its sibling models default to
          views, for instance. The <code>{'{{ config(...) }}'}</code> Jinja
          block, placed at the very top of a model file, is how you do that
          — and whatever it sets always wins over the directory-level
          default in <code>dbt_project.yml</code>.
        </Para>

        <CodeBox label="overriding materialization for one specific model">
{`-- models/marts/fct_orders.sql
{{
  config(
    materialized='table',
    tags=['finance', 'daily']
  )
}}

select
    o.order_id,
    o.customer_id,
    c.customer_name,
    o.order_status,
    o.order_total_cents,
    o.order_placed_at
from {{ ref('stg_orders') }} o
left join {{ ref('stg_customers') }} c
    on o.customer_id = c.customer_id`}
        </CodeBox>

        <Para>
          Everything inside <code>config()</code> is Jinja, evaluated at
          compile time, before the query is ever sent to the warehouse. The
          <code>materialized</code> key is the one you'll use constantly;
          <code>tags</code> is useful for selectively running subsets of
          your project later (<code>dbt run --select
          tag:finance</code>), and there are many other config keys —
          <code>unique_key</code> for incremental models,
          <code>schema</code> to override where a specific model lands,
          <code>enabled</code> to disable a model without deleting the file
          — that later modules in this track cover as they become relevant.
        </Para>

        <Table
          headers={['Config precedence (highest wins)', 'Set where', 'Scope']}
          rows={[
            ['config() block inside the model file', 'Top of an individual .sql file', 'That one model only'],
            ['models: block in dbt_project.yml', 'Project-level YAML, per directory path', 'Every model under that directory path, unless overridden'],
            ['dbt\'s built-in default', 'Not configurable — dbt\'s own fallback', 'Applies only if nothing above sets a value'],
          ]}
        />

        <Callout title="Config precedence, in one sentence" color={K}>
          The more specific setting always wins: a model's own
          <code>config()</code> block overrides its directory's default in
          <code>dbt_project.yml</code>, which itself overrides dbt's
          built-in fallback (view, for materialization). You almost never
          need to set config in more than one place for the same model —
          if you find yourself doing that, it's usually a sign the
          project-level default is fighting the model-level override rather
          than complementing it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — folder organization at a beginner level ────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Organizing Models" />
        <SectionTitle>staging, intermediate, and marts — A First Look</SectionTitle>

        <Para>
          Once a project has more than a handful of models, dropping them
          all flat into <code>models/</code> stops working — you lose any
          sense of which models are raw cleanup versus final, dashboard-
          ready output. The convention nearly every dbt project converges
          on, in some form, is three layers: <code>staging</code>,
          <code>intermediate</code>, and <code>marts</code>. This module
          introduces the idea at a beginner level; a later module in this
          track, on project structure, goes much deeper into naming
          conventions, cross-layer rules, and when to add more layers than
          just these three.
        </Para>

        <Table
          headers={['Layer', 'Job', 'Typical prefix', 'Materialization default']}
          rows={[
            ['staging', 'One-to-one cleanup of a single raw source table — renaming columns, fixing types, light filtering. No joins across sources.', 'stg_', 'view'],
            ['intermediate', 'Combines multiple staging models together — joins, intermediate aggregations — as a building block for a mart, not meant to be queried directly by end users.', 'int_', 'view or ephemeral'],
            ['marts', 'Final, business-facing models — the tables dashboards and analysts actually query.', 'fct_ / dim_', 'table'],
          ]}
        />

        <CodeBox label="folder layout for a small but real project">
{`models/
├── staging/
│   ├── stg_orders.sql
│   └── stg_customers.sql
├── intermediate/
│   └── int_orders_with_customer_region.sql
└── marts/
    ├── fct_orders.sql
    └── dim_customers.sql`}
        </CodeBox>

        <Para>
          The rough flow of data through these layers is: raw source
          tables get cleaned up individually in <code>staging</code>, those
          staging models get combined and enriched in
          <code>intermediate</code>, and the result gets shaped into final,
          business-facing tables in <code>marts</code>. Not every project
          needs an intermediate layer for every mart — a simple mart that
          only needs one or two staging models joined together often skips
          straight from staging to marts. The layer exists for when that
          join logic itself gets complex enough to deserve its own named,
          testable model rather than being buried inside a much larger mart
          query.
        </Para>

        <Callout title="This is a preview, not the full picture" color="#22c55e">
          Naming conventions within each layer, exactly when to introduce an
          intermediate model versus joining directly in a mart, and how
          teams structure marts around specific business domains are all
          covered in much more depth later in this track's dedicated
          project-structure module. For now, the important thing to
          internalize is the direction of data flow — staging cleans,
          intermediate combines, marts finalize — not the exhaustive rule
          set.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — what makes a good model ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Model Quality" />
        <SectionTitle>What Makes a Good Model — One Clear Transformation Step</SectionTitle>

        <Para>
          Because dbt places no technical limit on how complex a single
          model's <code>SELECT</code> statement can be, it is entirely
          possible to write one enormous model that reads from six raw
          source tables, joins them all together, computes a dozen
          aggregations, and applies business logic — all in one file. dbt
          will run it without complaint. It is also almost always a
          mistake.
        </Para>

        <Para>
          A good model does one clear transformation step — cleaning one
          source, joining a small number of closely related staging models,
          or computing one well-defined business aggregation — rather than
          trying to be the entire pipeline in a single file. The reason
          this matters goes beyond readability, though that matters too:
        </Para>

        <BulletList
          items={[
            'Testability — a small, single-purpose model is easy to write a meaningful test against (are order totals always non-negative?). A model doing six things at once makes it unclear which of those six things a failing test is even about.',
            'Reusability — a staging model cleaning one raw table can be ref()\'d by many downstream models. A giant do-everything query that mixes cleanup and final business logic in one step usually can\'t be reused by anything else, so similar logic gets duplicated elsewhere instead.',
            'Debuggability — when something in a giant model is wrong, you have to mentally untangle which of its many joins or aggregations produced the bad row. A chain of small, named models lets you query each intermediate step directly to find exactly where the data went wrong.',
            'Compile and query performance — a warehouse optimizer generally handles a chain of smaller, well-defined views and tables more predictably than one enormous, deeply nested query trying to do everything at once.',
          ]}
        />

        <CodeBox label="one do-everything model — hard to test, debug, or reuse">
{`-- DO NOT model your project this way
select
    o.order_id,
    c.customer_name,
    c.customer_region,
    p.product_name,
    sum(oi.quantity * oi.unit_price_cents) as line_total_cents,
    case when c.customer_region = 'US' then 'domestic' else 'international' end as shipping_class,
    rank() over (partition by c.customer_region order by sum(oi.quantity * oi.unit_price_cents) desc) as region_rank
from raw.orders o
join raw.customers c on o.customer_id = c.customer_id
join raw.order_items oi on o.order_id = oi.order_id
join raw.products p on oi.product_id = p.product_id
where o.order_status != 'cancelled'
group by 1, 2, 3, 4, 6`}
        </CodeBox>

        <CodeBox label="the same logic, split into small, named, single-purpose models">
{`-- models/staging/stg_orders.sql — clean one raw source, nothing else
select order_id, customer_id, order_status
from raw.orders
where order_status != 'cancelled'

-- models/staging/stg_order_items.sql — clean one raw source, nothing else
select order_id, product_id, quantity, unit_price_cents
from raw.order_items

-- models/intermediate/int_orders_with_line_totals.sql — one clear join + aggregation step
select
    o.order_id,
    o.customer_id,
    sum(oi.quantity * oi.unit_price_cents) as line_total_cents
from {{ ref('stg_orders') }} o
join {{ ref('stg_order_items') }} oi on o.order_id = oi.order_id
group by 1, 2

-- models/marts/fct_orders.sql — final business-facing shape
select
    i.order_id,
    c.customer_name,
    c.customer_region,
    i.line_total_cents,
    case when c.customer_region = 'US' then 'domestic' else 'international' end as shipping_class
from {{ ref('int_orders_with_line_totals') }} i
join {{ ref('stg_customers') }} c on i.customer_id = c.customer_id`}
        </CodeBox>

        <Para>
          Each of the four smaller models in that second version can be
          tested independently, reused by other downstream models, and
          debugged in isolation — if <code>fct_orders</code> shows a wrong
          <code>line_total_cents</code>, you can query
          <code>int_orders_with_line_totals</code> directly to check
          whether the problem is in the join/aggregation step or further
          downstream, instead of untangling one 20-line query end to end.
        </Para>

        <Callout title="A useful rule of thumb" color={K}>
          If you struggle to describe what a model does in one short
          sentence without using the word "and" more than once, it's
          probably doing more than one transformation step and is a good
          candidate to split. "Cleans the raw orders table" is one step.
          "Cleans the raw orders table and joins it to customers and
          computes shipping class" is three.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — worked example: a real staging model ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Full Worked Example" />
        <SectionTitle>Building stg_orders.sql From a Real Raw Table</SectionTitle>

        <Para>
          Here is a complete, realistic staging model, built step by step,
          showing the kind of light cleanup staging models typically do:
          renaming cryptic columns, casting types explicitly, and filtering
          out rows that shouldn't exist in a clean dataset — without adding
          any business logic or joins, which belong in later layers per
          Part 05.
        </Para>

        <Para>
          Imagine the raw, unmodified source table looks like this — messy
          column names, an inconsistent status field, and a couple of
          test rows accidentally left in from a QA process:
        </Para>

        <CodeBox label="raw.orders — the untouched raw table">
{`order_id | cust_id | ord_status | ord_ts               | is_test_row
---------|---------|------------|----------------------|------------
1001     | 501     | COMPLETE   | 2026-08-01 14:22:03  | false
1002     | 502     | complete   | 2026-08-01 15:03:41  | false
1003     | 501     | CANCELLED  | 2026-08-02 09:11:57  | false
1004     | 999     | complete   | 2026-08-02 10:00:00  | true
1005     | 503     | pending    | 2026-08-03 08:45:12  | false`}
        </CodeBox>

        <Para>
          A staging model built on top of this should rename the cryptic
          columns to something self-explanatory, normalize the
          inconsistent casing on <code>ord_status</code>, cast the
          timestamp to an explicit type, and filter out the QA test rows —
          all cleanup, no business logic yet.
        </Para>

        <CodeBox label="models/staging/stg_orders.sql — the finished model">
{`{{ config(materialized='view') }}

with source as (

    select * from {{ source('freshcart', 'orders') }}

),

renamed as (

    select
        order_id,
        cust_id                          as customer_id,
        lower(ord_status)                as order_status,
        cast(ord_ts as timestamp)         as order_placed_at

    from source
    where is_test_row = false

)

select * from renamed`}
        </CodeBox>

        <Para>
          Two things in that file are worth flagging even though they
          aren't this module's main focus. First, the
          <code>{'{{ config(materialized=\'view\') }}'}</code> line is
          actually redundant here — Part 03 established that view is
          already the default, so this line is included only to make the
          materialization explicit and self-documenting, not because it
          changes anything. Second, the
          <code>{'{{ source(\'freshcart\', \'orders\') }}'}</code> function
          call is how this model actually points at the raw
          <code>raw.orders</code> table, rather than hardcoding a schema
          and table name directly.
        </Para>

        <Callout title="source() gets its own full module next" color={K}>
          You need just enough of <code>source()</code> to read this
          example: it's a Jinja function that resolves to a raw table dbt
          knows about, declared elsewhere in a YAML file, rather than a
          transformation dbt built itself. Module 05 — Sources, ref(), and
          the Dependency Graph — is where <code>source()</code>,
          <code>ref()</code>, and how dbt builds its dependency graph from
          both of them get the full, proper treatment. Everything you need
          to understand this staging model is already above; the deeper
          mechanics are next.
        </Callout>

        <Para>
          Running <code>dbt run --select stg_orders</code> against this
          file compiles it and executes it against the warehouse:
        </Para>

        <CodeBox label="dbt run --select stg_orders">
{`$ dbt run --select stg_orders

Running with dbt=1.8.3
Found 12 models, 8 tests, 1 source, 0 exposures, 0 metrics

Concurrency: 4 threads (target='dev')

1 of 1 START sql view model dbt_asil.stg_orders .......... [RUN]
1 of 1 OK created sql view model dbt_asil.stg_orders ..... [SUCCESS 1 in 1.11s]

Finished running 1 view model in 0 hours 0 minutes and 1.34 seconds (1.34s).

Completed successfully

Done. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1`}
        </CodeBox>

        <Para>
          Querying the resulting view confirms the cleanup worked — casing
          normalized, columns renamed, the QA test row filtered out:
        </Para>

        <Output>
{`order_id | customer_id | order_status | order_placed_at
---------|-------------|--------------|--------------------
1001     | 501         | complete     | 2026-08-01 14:22:03
1002     | 502         | complete     | 2026-08-01 15:03:41
1003     | 501         | cancelled    | 2026-08-02 09:11:57
1005     | 503         | pending      | 2026-08-03 08:45:12

(4 rows — order_id 1004 was correctly excluded as a test row)`}
        </Output>

        <Para>
          Every downstream model in this project — the intermediate join in
          Part 06's example, the final <code>fct_orders</code> mart — now
          builds on top of this clean, renamed, correctly-typed
          <code>stg_orders</code> view instead of ever touching
          <code>raw.orders</code> directly. That single-responsibility
          staging layer is what makes the rest of the project's models
          simpler to write and easier to trust.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — compiling vs running ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Compile vs Run" />
        <SectionTitle>dbt compile — Seeing Exactly What Your Model Turns Into</SectionTitle>

        <Para>
          Everything in this module so far has described what a model file
          looks like before dbt touches it — the Jinja, the
          <code>ref()</code> and <code>source()</code> calls, the
          <code>config()</code> block. It's worth seeing the other side:
          the plain SQL dbt actually produces after resolving all of that,
          because that compiled SQL is what genuinely executes against your
          warehouse, and reading it is often the fastest way to understand
          why a model is behaving unexpectedly.
        </Para>

        <Para>
          <code>dbt compile</code> resolves every model's Jinja — every
          <code>ref()</code>, every <code>source()</code>, every macro call
          — into plain SQL, and writes the result to files under
          <code>target/compiled/</code>, without executing anything against
          the warehouse at all. <code>dbt run</code> does that same
          compilation step internally and then actually executes the
          result. Compiling without running is how you check your work
          before spending any warehouse compute on it.
        </Para>

        <CodeBox label="the stg_orders.sql source file from part 07, once more">
{`{{ config(materialized='view') }}

with source as (
    select * from {{ source('freshcart', 'orders') }}
),
renamed as (
    select
        order_id,
        cust_id                          as customer_id,
        lower(ord_status)                as order_status,
        cast(ord_ts as timestamp)         as order_placed_at
    from source
    where is_test_row = false
)
select * from renamed`}
        </CodeBox>

        <CodeBox label="target/compiled/freshcart_analytics/models/staging/stg_orders.sql — after dbt compile">
{`with source as (
    select * from FRESHCART_DEV.raw.orders
),
renamed as (
    select
        order_id,
        cust_id                          as customer_id,
        lower(ord_status)                as order_status,
        cast(ord_ts as timestamp)         as order_placed_at
    from source
    where is_test_row = false
)
select * from renamed`}
        </CodeBox>

        <Para>
          The <code>{'{{ config(...) }}'}</code> block disappears entirely
          in the compiled output — it was only ever an instruction to dbt
          about how to wrap the query, not part of the query itself. The
          <code>{'{{ source(\'freshcart\', \'orders\') }}'}</code> call
          resolves to a fully qualified table reference,
          <code>FRESHCART_DEV.raw.orders</code>, using whichever database
          the active profile target points at. This is exactly why the
          same model file can be run against <code>dev</code> or
          <code>prod</code> (Module 03, Part 08) and correctly resolve to
          each environment's own database without a single line of the
          model changing.
        </Para>

        <Table
          headers={['Command', 'Resolves Jinja?', 'Executes against warehouse?', 'When to use']}
          rows={[
            ['dbt compile', 'Yes — writes resolved SQL to target/compiled/', 'No', 'Debugging what a ref()/source()/macro actually resolves to, without spending warehouse compute'],
            ['dbt run', 'Yes, then executes the result', 'Yes — creates or replaces the actual view/table', 'Building models for real'],
            ['dbt show --select stg_orders', 'Yes, then executes and previews a small sample of rows', 'Yes, but limited to a preview, not a full materialization', 'Sanity-checking a model\'s output while iterating, without a full build'],
          ]}
        />

        <Callout title="Reading compiled SQL is a core debugging skill" color={K}>
          When a model behaves unexpectedly — pulling from the wrong
          schema, joining against a table you didn't expect — the fastest
          way to find out why is almost always to open the corresponding
          file under <code>target/compiled/</code> and read the actual SQL
          dbt is sending to the warehouse, rather than staring at the
          Jinja-templated source file trying to mentally resolve every
          <code>ref()</code> and variable yourself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — a quick look at ephemeral models ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — A Fourth Materialization, Briefly" />
        <SectionTitle>Ephemeral Models — When a Model Shouldn't Exist in the Warehouse at All</SectionTitle>

        <Para>
          Part 03's table compared view, table, incremental, and one more
          option worth a closer look here: <code>ephemeral</code>. An
          ephemeral model is the odd one out — it is the only
          materialization that creates nothing at all in your warehouse.
          Instead, dbt inlines its compiled SQL as a Common Table
          Expression (CTE) directly into every model that references it.
        </Para>

        <CodeBox label="an ephemeral model — thin, single-use, not worth its own object">
{`-- models/staging/stg_order_statuses_normalized.sql
{{ config(materialized='ephemeral') }}

select
    order_id,
    lower(trim(ord_status)) as order_status
from {{ source('freshcart', 'orders') }}`}
        </CodeBox>

        <Para>
          When another model references this one with
          <code>{'{{ ref(\'stg_order_statuses_normalized\') }}'}</code>,
          dbt does not generate a query that selects from a real database
          object named <code>stg_order_statuses_normalized</code> — because
          no such object ever gets created. Instead it inlines the
          ephemeral model's own compiled SQL as a CTE at the top of
          whatever model referenced it.
        </Para>

        <CodeBox label="how a referencing model compiles when its dependency is ephemeral">
{`-- models/marts/fct_orders.sql, referencing the ephemeral model above
select
    order_id,
    order_status
from {{ ref('stg_order_statuses_normalized') }}
where order_status != 'cancelled'

-- compiles to (note: no real stg_order_statuses_normalized object exists):
with __dbt__cte__stg_order_statuses_normalized as (
    select
        order_id,
        lower(trim(ord_status)) as order_status
    from FRESHCART_DEV.raw.orders
)
select
    order_id,
    order_status
from __dbt__cte__stg_order_statuses_normalized
where order_status != 'cancelled'`}
        </CodeBox>

        <Table
          headers={['Materialization', 'Creates a warehouse object?', 'Good fit']}
          rows={[
            ['view', 'Yes — a saved query, no stored data', 'Cheap, always-current staging models queried infrequently or lightly'],
            ['table', 'Yes — a physical, stored copy of the result', 'Expensive or frequently-queried models, especially marts'],
            ['ephemeral', 'No — inlined as a CTE wherever referenced', 'A thin, single-purpose cleanup step used by exactly one or two downstream models, not worth cluttering the schema with its own object'],
          ]}
        />

        <Callout title="Ephemeral trades warehouse clutter for compile complexity" color={K}>
          Ephemeral models keep your warehouse's schema browser free of
          tiny, intermediate-only objects nobody queries directly. The
          trade-off is that you cannot query an ephemeral model on its own
          from a SQL client to debug it — since it never exists as a real
          object — and if many models reference the same ephemeral model,
          its logic gets recompiled as a duplicate CTE inside every one of
          them, rather than computed once and reused, which can matter for
          performance if that shared logic is heavier than a light rename
          or filter.
        </Callout>

        <Para>
          A reasonable rule of thumb: reach for <code>ephemeral</code> when
          a transformation step is genuinely thin (a rename, a light
          filter, a single case expression) and used by only one or two
          downstream models — exactly the kind of step that doesn't feel
          like it deserves its own permanent object in the warehouse. Once
          a model is referenced by many downstream models or does anything
          computationally heavier, <code>view</code> or <code>table</code>
          are almost always the better choice, since they compute the
          result once rather than recompiling it into every referencing
          query.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — checking your own model against a checklist ────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — A Pre-Commit Checklist" />
        <SectionTitle>Before You Commit a New Model, Check These Five Things</SectionTitle>

        <Para>
          Everything in this module compresses into a short, practical
          checklist worth running through on every new model before
          opening a pull request, especially while the conventions are
          still new. None of these take more than a minute to verify, and
          together they catch the majority of first-pass mistakes covered
          across the earlier Parts.
        </Para>

        <CodeBox label="a five-point pre-commit checklist for a new model">
{`1. Does the filename match what the object should be called?
   (Part 02 — there is no separate naming step; the filename IS the name)

2. Is the materialization appropriate, or did I leave an expensive
   model on the unconfigured view default?
   (Part 03 — check whether this model is cheap enough to leave
   unconfigured, or genuinely needs an explicit config() override)

3. Does this model do exactly one clear transformation step?
   (Part 06 — if the description needs "and" more than once,
   it's probably two models pretending to be one)

4. Is it in the right layer — staging, intermediate, or marts?
   (Part 05 — staging cleans one source; intermediate joins;
   marts finalize. A join inside a staging model is a signal
   something is misplaced)

5. Did I run dbt compile to check the actual SQL before running
   the full model against the warehouse?
   (Part 08 — catches a broken ref()/source() or Jinja typo for free,
   before spending any real warehouse compute on it)`}
        </CodeBox>

        <Para>
          None of these checks require deep dbt expertise — they're
          mechanical, and that's the point. A staging model with a join in
          it, a mart left as an unconfigured view, a filename that doesn't
          match its intended object name — all five are easy to catch in a
          thirty-second self-review, and all five are exactly the kind of
          mistake that's much more expensive to unwind once several other
          models have started <code>ref()</code>-ing the broken one.
        </Para>

        <Callout title="Small, mechanical checks compound" color={K}>
          A team that consistently applies this five-point checklist ends
          up with a project where every model's name, layer, and
          materialization are predictable at a glance — which matters more
          as a project grows past the size where any one person can hold
          the whole thing in their head. This is the practical foundation
          the next module builds on directly: understanding exactly how
          <code>ref()</code> and <code>source()</code> wire these
          well-organized models together into a dependency graph.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Models</SectionTitle>
        {[
          {
            wrong: '"A dbt model file needs to contain CREATE TABLE or CREATE VIEW"',
            right: 'Part 01 is explicit that a model is only ever a SELECT statement — dbt itself generates and owns all the wrapping DDL. Writing your own CREATE statement inside a model file is not how dbt models work and will produce a compilation error.',
          },
          {
            wrong: '"An unconfigured model defaults to a table, since that\'s more useful"',
            right: 'Part 03 covers the actual default directly: a bare model with no config compiles to a view, not a table. Table materialization has to be explicitly configured, either per model or per directory in dbt_project.yml.',
          },
          {
            wrong: '"You can name a model anything in its config() block, independent of the filename"',
            right: 'Part 02 shows that the filename is the object name by default — there is no separate naming field. An alias config can override this, but that\'s an intentional exception for specific cases, not the normal way models get named.',
          },
          {
            wrong: '"Folder names like staging/ or marts/ automatically apply materialization defaults with zero configuration"',
            right: 'Part 05 introduces the staging/intermediate/marts convention, but per Part 03 and Part 04, those materialization defaults only take effect because someone configured them under the models: block in dbt_project.yml, matching each folder path — the folder name itself carries no automatic behavior.',
          },
          {
            wrong: '"A bigger, more complete model that does everything in one query is more efficient than several small ones"',
            right: 'Part 06 argues the opposite in practice: splitting a transformation into small, single-purpose models improves testability, reusability, and debuggability, and a warehouse\'s query optimizer generally handles a chain of well-defined smaller models more predictably than one deeply nested giant query.',
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
            <strong>At Faire:</strong> a new analytics engineer notices a
            dashboard's load time keeps creeping up as the underlying
            orders table grows. Digging in, they find the mart model behind
            it has no <code>config()</code> block at all — per Part 03, it's
            been silently materializing as a view this whole time, meaning
            every dashboard refresh recomputes several joins and an
            aggregation against a now much larger raw table from scratch.
            Adding <code>{'{{ config(materialized=\'table\') }}'}</code> to the
            top of the file and re-running fixes the load time immediately,
            with zero changes to the actual query logic.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Brex:</strong> a reviewer rejects a pull request
            adding a new mart model, pointing out that the 90-line query
            joins six raw tables directly and computes both a customer
            segmentation and a monthly revenue rollup in one step. Per
            Part 06, they ask the author to split it into a couple of
            staging models, an intermediate join, and a final mart — not
            for style reasons, but because the segmentation logic needs to
            be reused by a second, unrelated mart the following sprint, and
            a giant single-file model can't be reused without copy-pasting
            the whole query.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In an interview:</strong> "What happens if you rename a
            model file in dbt?" The strong answer, from Part 02, is not
            just "the file changes" — it's that dbt has no concept of an
            object rename at all. Since the object name is derived directly
            from the filename, renaming the file causes dbt to create a
            brand-new object under the new name on the next run, while the
            old object — built under the old filename — is left behind in
            the warehouse until something explicitly drops it.
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
            q: 'Q1. What is a dbt model, mechanically, and what does dbt actually do with the file when you run dbt run?',
            a: `Per Part 01, a model is a single .sql file under models/ containing exactly one SELECT statement — no DDL of any kind. When dbt run executes, dbt compiles that file (resolving any Jinja, including config() blocks, ref(), and source() calls per Part 04 and Part 07), wraps the resulting SQL in the appropriate DDL for its configured materialization — a CREATE OR REPLACE VIEW by default, per Part 03 — and executes that wrapped statement against the warehouse.

The important detail is that you never write the wrapping DDL yourself, and dbt derives the object's name directly from the filename, per Part 02. This is what lets the same model file be materialized as a view today and a table tomorrow with a one-line config change and zero edits to the actual transformation logic.`,
          },
          {
            q: 'Q2. Why does dbt default to view materialization instead of table, and when would you deliberately override that?',
            a: `Per Part 03, view is the safest default because most models — especially thin staging models — are cheap to recompute on every query, and a view guarantees the result always reflects the current state of the underlying data with no additional storage or refresh-scheduling concerns.

I'd override it to materialized='table' for models that are either expensive to compute (multiple joins, heavy aggregations) or queried very frequently by downstream tools like a BI dashboard, where recomputing the full transformation on every single query becomes a real cost. Part 03's warning is exactly this case: an unconfigured, expensive mart model silently inherits the view default and ends up recomputing itself needlessly on every dashboard refresh, which is usually the actual root cause when someone reports a dbt-backed dashboard slowing down as source data grows.`,
          },
          {
            q: 'Q3. Explain config precedence: if a model\'s directory sets materialized=view in dbt_project.yml but the model file itself has {{ config(materialized=\'table\') }}, what wins?',
            a: `Per Part 04, the model-level config() block always wins over the directory-level default in dbt_project.yml, which in turn wins over dbt's own built-in fallback. So in that specific scenario, the model builds as a table, not a view — the more specific setting always overrides the more general one.

This precedence is what lets a directory-level default serve as a sensible baseline (say, all staging models default to view) while still allowing individual exceptions (one specific staging model that happens to be unusually expensive and deserves table materialization) without having to restructure the whole directory's configuration just for one model.`,
          },
          {
            q: 'Q4. Walk me through why you would split a large query into staging, intermediate, and marts models instead of writing one big query.',
            a: `Part 06 lays out the concrete reasons, and Part 05 gives them a home in the layer structure. Splitting improves testability — a schema test on a single-purpose staging model has an unambiguous target, whereas a test failure on a giant do-everything query doesn't tell you which of its many joins or aggregations is actually wrong. It improves reusability, since a clean staging model or a well-defined intermediate join can be ref()'d by more than one downstream mart, whereas a single giant query's logic can't be reused without copy-pasting it. And it improves debuggability, since you can query each intermediate model directly to isolate exactly where bad data enters the pipeline, rather than untangling one large nested query end to end.

Concretely, per Part 05's convention, I'd clean each raw source individually in staging, combine related staging models in intermediate when the join logic itself is complex enough to deserve its own name, and shape the final business-facing output in marts.`,
          },
          {
            q: 'Q5. What is the {{ config(...) }} block, and give two examples of settings you\'d put there beyond materialization.',
            a: `Per Part 04, config() is a Jinja block at the top of a model file that sets per-model configuration, evaluated at compile time before any SQL reaches the warehouse — it's the most specific, highest-precedence place to configure a single model, overriding whatever default the model's directory sets in dbt_project.yml.

Beyond materialized, common examples include tags — a list of labels used to selectively run subsets of a project later, like dbt run --select tag:finance — and schema, which overrides where a specific model's object gets created relative to the profile's default schema. Later modules add more advanced examples specific to incremental models, like unique_key, once that materialization is covered in depth.`,
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
        <SectionTitle>The Modeling Mistakes That Cost the Most Later</SectionTitle>
        {[
          {
            q: 'Leaving an expensive mart model unconfigured, assuming dbt will "figure out" it should be a table',
            a: 'Per Part 03, dbt has no such logic — an unconfigured model is always a view, regardless of how expensive its query is or how often it gets queried. Expensive, frequently-queried models need an explicit materialized=\'table\' config.',
          },
          {
            q: 'Renaming a model file to "clean up" naming and assuming the old warehouse object updates automatically',
            a: 'Per Part 02, renaming a file creates a new object under the new name on the next run and leaves the old object behind untouched. A rename needs a deliberate cleanup step (or an alias config) if you actually need the warehouse-side name to change without duplicating the object.',
          },
          {
            q: 'Writing one enormous model that joins many raw tables and computes several unrelated pieces of business logic at once',
            a: 'Part 06 covers why this hurts testability, reusability, and debuggability all at once — split it into staging, intermediate, and marts layers per Part 05 instead, even if it means more files.',
          },
          {
            q: 'Putting business logic or cross-source joins inside a staging model',
            a: 'Per Part 05, staging models should do one-to-one cleanup of a single raw source only — renaming, type casting, light filtering. Joins across sources and business logic belong in intermediate or marts models, so staging stays reusable as a clean foundation for many different downstream models.',
          },
          {
            q: 'Setting materialized=\'table\' on every single model "to be safe"',
            a: 'This defeats the actual purpose of the staging layer per Part 03 and Part 05 — thin staging models are meant to be cheap, always-current views. Materializing every staging model as a table adds unnecessary storage and full-rebuild time on every run for models that didn\'t need it.',
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
            error: `dbt run fails to compile stg_orders.sql with "Compilation Error - syntax error near 'CREATE'"`,
            cause: 'The model file itself contains a hand-written CREATE TABLE or CREATE VIEW statement, which conflicts with the DDL dbt automatically wraps around the SELECT statement — per Part 01, dbt owns the DDL entirely and expects only a bare SELECT in the file.',
            fix: 'Remove any CREATE, DROP, or other DDL statements from the model file, leaving only the SELECT statement itself. Let dbt\'s materialization config (Part 03 and Part 04) control what DDL gets generated.',
          },
          {
            error: `A downstream model queries fct_orders and sees stale or missing data even though dbt run completed successfully`,
            cause: 'fct_orders is materialized as a view (per Part 03\'s default) but is built on a heavy, slow-to-compute join — every query against it recomputes from scratch rather than reading a pre-built table, and if the underlying source data changed between dbt run and the downstream query, the view simply reflects that immediately, which can look like "staleness" going the wrong direction if someone was expecting snapshot-like behavior.',
            fix: 'If the intent was a fixed, point-in-time snapshot of the data as of the last dbt run rather than always-current data, materialize it as table instead of leaving it as an unconfigured view, per Part 04\'s config() example.',
          },
          {
            error: `Two models in the project both create an object named stg_orders, and dbt run fails with a naming conflict`,
            cause: 'Per Part 02, the object name comes directly from the filename — if two files across different folders are both literally named stg_orders.sql, and no alias or custom schema disambiguates them, dbt sees two models trying to build the same object name in the same schema.',
            fix: 'Rename one of the files to something more specific, or use the alias config on one of them if the filename genuinely needs to stay as-is for other reasons (like matching an existing convention referenced elsewhere).',
          },
          {
            error: `A newly added column in stg_orders.sql doesn't show up when querying the view in the warehouse, even after a successful dbt run`,
            cause: 'Some warehouses cache a view\'s column definitions and don\'t always immediately reflect an added column through certain client tools\' metadata caches, or the querying tool itself is using a stale cached schema rather than actually re-describing the view.',
            fix: 'Re-run the query using a fresh session or explicitly re-describe the view/object in your query tool. If the column is truly missing from the compiled SQL itself, check the compiled output under target/compiled/ to confirm the column actually made it into the final SELECT dbt generated.',
          },
          {
            error: `A model fails with "Compilation Error - 'source' is undefined" when it should exist`,
            cause: 'The source() call in the model references a source name or table name that was never declared in a sources: YAML file, or there\'s a typo in one of the two arguments — the source project name or the specific table name.',
            fix: 'Check the sources: YAML block for the exact source name and table name being referenced. Module 05 covers declaring and using source() in full; for now, confirm the two string arguments to source() exactly match what\'s declared in the YAML.',
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
          'A dbt model is a single .sql file under models/ containing exactly one SELECT statement — dbt owns all the wrapping DDL, so no model file should ever contain CREATE, DROP, or other DDL of its own.',
          'The filename, minus the .sql extension, is the object name dbt creates by default — there is no separate naming step, and renaming a model file creates a new object rather than renaming the old one.',
          'An unconfigured model materializes as a view by default, not a table — a genuinely important default, since leaving an expensive, frequently-queried mart model unconfigured means every downstream query recomputes it from scratch.',
          'The {{ config(...) }} Jinja block at the top of a model sets per-model configuration and always overrides directory-level defaults set in dbt_project.yml.',
          'The staging / intermediate / marts convention organizes models by role — staging cleans one raw source at a time, intermediate combines staging models, marts produce the final business-facing shape — and a later module goes deeper on the exact rules.',
          'A good model does one clear transformation step; splitting a large, do-everything query into small, named, single-purpose models improves testability, reusability, and debuggability, even though dbt places no technical limit on model complexity.',
        ]}
      />
    </LearnLayout>
  )
}
