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

export default function IncrementalModels() {
  return (
    <LearnLayout
      title="Incremental Models in Depth"
      description="Why incremental models exist, how is_incremental() actually works, the append / delete+insert / merge strategies, unique_key, full-refresh recovery, and the classic bug where incremental and full-refresh runs silently diverge."
      section="dbt — Module 07"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Incremental Models in Depth', href: '/learn/dbt/incremental-models' },
      ]}
      prev={{ title: 'Materializations: View, Table, Incremental, Ephemeral', href: '/learn/dbt/materializations' }}
      next={{ title: 'Testing: Generic and Singular Tests', href: '/learn/dbt/testing-basics' }}
    >
      {/* ── Part 01 — The Problem ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem Incremental Models Solve" />
        <SectionTitle>Why Rebuilding a Multi-Billion-Row Table Every Run Is Unacceptable</SectionTitle>

        <Para>
          A table materialization rebuilds a model completely, every single time <code>dbt run</code>
          executes. dbt drops (or renames out) the existing table, runs the model's full <code>SELECT</code>
          statement from scratch, and writes the entire result set back as a brand-new table. For a small
          dimension table with ten thousand rows, this is trivial — it finishes in under a second and nobody
          notices. For a fact table tracking every order, page view, or sensor reading a company has ever
          recorded, this stops being trivial extremely quickly.
        </Para>

        <Para>
          Picture <code>fct_orders</code> at a mid-size e-commerce company with three years of history: two
          billion rows. The model's <code>SELECT</code> joins orders to customers, products, promotions, and
          shipping — a non-trivial amount of compute per row. Rebuilt as a full table on every hourly run,
          this query scans and reprocesses all two billion rows every single hour, even though only the last
          hour's few thousand new and updated orders actually need to be reflected. The warehouse bill for
          this pattern grows in direct proportion to how much history accumulates — the query gets slower and
          more expensive every single day, forever, for no benefit, because the vast majority of those two
          billion rows have not changed since the previous run and did not need to be touched at all.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The core insight incremental models are built on:</strong> most fact tables are
            append-mostly and time-ordered. New rows arrive constantly; existing rows rarely change once
            they're a few days old. If a model can identify only the rows that are new or recently changed
            since its last run, it can process a few thousand rows instead of a few billion — while still
            ending up in the same eventual state as if it had rebuilt from scratch.
          </Para>
        </HighlightBox>

        <Para>
          An incremental model materialization does exactly this. On the first run (or a full-refresh), it
          behaves like a table materialization — it builds the entire table from the model's <code>SELECT</code>.
          On every subsequent run, it runs a different, narrower query: process only the rows that are new
          since the last run, and merge them into the existing table rather than rebuilding it. The existing
          two billion rows sit untouched on disk. Only the new slice is computed and written.
        </Para>

        <Table
          headers={['Materialization', 'What happens on every run', 'Cost as history grows']}
          rows={[
            ['table', 'Drops and fully rebuilds the entire table from the model SELECT.', 'Grows without bound — every run reprocesses all historical rows again.'],
            ['view', 'No storage at all; the SELECT runs at query time against the underlying tables.', 'Cost is paid by whoever queries it, every time, not by dbt at build time.'],
            ['incremental', 'Rebuilds fully only on the first run or a full-refresh; every other run processes only new/changed rows and merges them in.', 'Roughly constant — proportional to how much data changed since the last run, not to total history.'],
          ]}
        />

        <Callout title="This is an optimization, not a different result" color={K}>
          Done correctly, an incremental model and the equivalent table model should produce identical final
          data — incremental is purely a performance and cost strategy for how that data gets there. The
          moment incremental and full-refresh start producing genuinely different rows, something in the
          model's logic is broken. Part 06 covers exactly how that divergence happens and how to guard
          against it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Basic Setup ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Basic Configuration" />
        <SectionTitle>Turning a Model Incremental: the config Block</SectionTitle>

        <Para>
          Making a model incremental starts with one line in its <code>config()</code> call. Everything else
          — the actual incremental filtering logic — is added on top of this base configuration using Jinja,
          covered in Part 03.
        </Para>

        <CodeBox label="models/marts/fct_page_views.sql — minimal incremental config">
{`{{
  config(
    materialized='incremental'
  )
}}

select
    event_id,
    user_id,
    page_url,
    event_time,
    session_id
from {{ ref('stg_page_views') }}`}
        </CodeBox>

        <Para>
          As written, this model works, but it is not actually doing anything smarter than a table
          materialization yet — on every run, dbt still has no idea which rows are "new," so without an
          <code>is_incremental()</code> block (Part 03), the raw SQL is identical on every run, and dbt falls
          back to appending the entire result of that SELECT again, duplicating every row that was already
          there. The config only tells dbt <em>how to materialize</em> the model — it does not, by itself,
          filter anything. The filtering logic has to be written explicitly, which is the entire point of
          Part 03.
        </Para>

        <Table
          headers={['Config key', 'Purpose', 'Typical value']}
          rows={[
            ['materialized', 'Declares the model as incremental instead of table/view/ephemeral.', "'incremental'"],
            ['unique_key', 'Identifies "the same row" across runs, required for update-in-place strategies.', "'order_id' or a list of columns for a composite key"],
            ['incremental_strategy', 'Which mechanism dbt uses to merge new data into the existing table.', "'merge', 'delete+insert', or 'append'"],
            ['on_schema_change', 'What to do if new columns appear in the model SELECT that aren\'t in the existing table.', "'append_new_columns' or 'sync_all_columns'"],
          ]}
        />

        <Para>
          Every one of these lives inside the same <code>config()</code> call. A fully specified incremental
          model — the shape you will write in almost every real project — combines all four:
        </Para>

        <CodeBox label="A fully specified incremental config">
{`{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge',
    on_schema_change='append_new_columns'
  )
}}`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — is_incremental() ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — is_incremental() — The Core Mechanic" />
        <SectionTitle>The is_incremental() Jinja Block Is the Entire Idea</SectionTitle>

        <Para>
          Everything about incremental models comes down to one piece of Jinja: <code>{'{% if is_incremental() %}'}</code>.
          The code inside this block only runs on an incremental run — not on the very first run (when the
          table doesn't exist yet) and not on a full-refresh (when dbt is deliberately rebuilding from
          scratch). On those two runs, dbt needs the full, unfiltered SELECT to populate the entire table.
          On every other run, dbt needs the narrow, filtered SELECT that only picks up new rows. One SQL
          file has to express both, and <code>is_incremental()</code> is the switch between them.
        </Para>

        <CodeBox label="models/marts/fct_page_views.sql — with the is_incremental() filter">
{`{{
  config(
    materialized='incremental',
    unique_key='event_id'
  )
}}

select
    event_id,
    user_id,
    page_url,
    event_time,
    session_id
from {{ ref('stg_page_views') }}

{% if is_incremental() %}

  -- this filter only applies on an incremental run:
  where event_time > (select max(event_time) from {{ this }})

{% endif %}`}
        </CodeBox>

        <Para>
          <code>{'{{ this }}'}</code> is a special Jinja variable that refers to the model's own current
          database relation — for this model, the actual <code>fct_page_views</code> table that already
          exists from the previous run. The subquery <code>select max(event_time) from {'{{ this }}'}</code>
          asks the existing table "what is the newest event you already contain?" and the outer
          <code>where</code> clause then asks the source, <code>stg_page_views</code>, for only rows newer
          than that. This is the entire mechanism: look at what you already have, then pull only what's newer.
        </Para>

        <Table
          headers={['Run type', 'is_incremental() evaluates to', 'What actually executes']}
          rows={[
            ['First-ever run (table does not exist)', 'false', 'The full, unfiltered SELECT — every row from stg_page_views, building the table from scratch.'],
            ['dbt run --full-refresh', 'false', 'Same as above — full rebuild, regardless of what the table already contains.'],
            ['A normal incremental run, table already exists', 'true', 'The filtered SELECT — only rows with event_time newer than the table\'s current max.'],
          ]}
        />

        <Para>
          Internally, <code>is_incremental()</code> returns <code>true</code> only when all three of these
          hold at once: the model is configured as <code>materialized='incremental'</code>; the target
          relation already exists in the warehouse; and dbt is not running with <code>--full-refresh</code>.
          Any one of those being false collapses it back to a full build. This is why a brand-new incremental
          model's very first <code>dbt run</code> always does a full historical load — there's nothing in
          <code>{'{{ this }}'}</code> yet for the filter to compare against, so dbt correctly skips the
          <code>{'{% if %}'}</code> block entirely rather than erroring on a table that doesn't exist.
        </Para>

        <Callout title="Everything outside the if-block still runs every time" color={K}>
          Only the code physically inside <code>{'{% if is_incremental() %}'}{'{% endif %}'}</code> is
          conditional. The <code>select</code>, the joins, the column list — all of that runs on every run
          regardless. The <code>is_incremental()</code> block almost always wraps just a <code>where</code>
          clause narrowing which rows from the source get scanned, not a separate query.
        </Callout>

        <SubTitle>Inspecting exactly what dbt compiled, for either branch</SubTitle>

        <Para>
          Because <code>is_incremental()</code> changes what SQL actually runs depending on the run type,
          it is easy to be unsure which branch a given run actually took. <code>dbt compile</code> resolves
          all Jinja, including <code>is_incremental()</code>, and writes the resulting plain SQL to the
          <code>target/compiled/</code> directory — a direct way to confirm, before ever running the model,
          exactly which version of the query a given invocation will execute.
        </Para>

        <CodeBox label="Confirming which branch compiles, without running anything">
{`dbt compile --select fct_page_views
# then inspect the generated file, e.g.:
cat target/compiled/my_project/models/marts/fct_page_views.sql

# On a normal run against an existing table, the WHERE clause from
# inside is_incremental() will be present in the compiled output.
# Run with --full-refresh and recompile, and that WHERE clause
# disappears entirely from the compiled SQL — direct proof of
# which branch is_incremental() actually took for that invocation.`}
        </CodeBox>

        <Para>
          This is the single most reliable way to debug a suspected divergence between incremental and
          full-refresh behavior (Part 06) — rather than reasoning about what the Jinja <em>should</em> do,
          compile both variants and diff the actual generated SQL directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — unique_key ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — unique_key" />
        <SectionTitle>unique_key: Telling dbt What "The Same Row" Means</SectionTitle>

        <Para>
          <code>event_time &gt; max(event_time)</code> is enough for pure append-only data — a page view
          event is immutable once it happens; it is never edited after the fact. But a large share of real
          fact tables are not pure append-only. An order can be placed, then have its status updated to
          "shipped" a day later, then "delivered" three days after that — the same <code>order_id</code>
          reappearing in the source with an updated <code>updated_at</code> timestamp and different column
          values each time. Here, simply appending every new-looking row produces three separate rows for
          one order instead of one row reflecting its current state.
        </Para>

        <Para>
          <code>unique_key</code> tells dbt which column (or combination of columns) identifies "the same
          logical row" across runs, so that when a row with a matching key shows up again, dbt can update the
          existing row in place instead of blindly inserting a duplicate.
        </Para>

        <CodeBox label="unique_key with a single column">
{`{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
  )
}}

select
    order_id,
    customer_id,
    order_status,
    total_amount,
    updated_at
from {{ ref('stg_orders') }}

{% if is_incremental() %}
  where updated_at > (select max(updated_at) from {{ this }})
{% endif %}`}
        </CodeBox>

        <Para>
          <code>unique_key</code> can also be a list, for models where no single column is unique on its
          own — a common case in event or line-item level fact tables where the natural key is composite.
        </Para>

        <CodeBox label="unique_key as a composite key">
{`{{
  config(
    materialized='incremental',
    unique_key=['order_id', 'line_item_id'],
    incremental_strategy='merge'
  )
}}`}
        </CodeBox>

        <Callout title="unique_key without a matching strategy does nothing useful" color={K}>
          Setting <code>unique_key</code> only matters if the incremental strategy actually uses it to find
          and update matching rows — <code>merge</code> and <code>delete+insert</code> both do; plain
          <code>append</code> ignores it entirely and inserts every row from the filtered SELECT regardless
          of whether its key already exists in the table. Part 05 covers exactly how each strategy uses (or
          doesn't use) <code>unique_key</code>.
        </Callout>

        <SubTitle>Picking the wrong unique_key — a subtler failure than picking none at all</SubTitle>

        <Para>
          A <code>unique_key</code> that is not actually unique in the source data is a quieter failure
          mode than omitting one entirely. If two rows in a single incremental batch share the same
          <code>unique_key</code> value — for example, two updates to the same order arriving within the
          same run because the source system emitted both a status-change event and a totals-recalculation
          event for it — a <code>merge</code> statement's behavior when the same key appears twice in the
          source side of the join is warehouse-dependent: some engines error outright, others silently
          apply one of the two updates and discard the other, non-deterministically. Either outcome is worse
          than an obvious failure, because the second is silent.
        </Para>

        <CodeBox label="Deduplicating within a batch before the merge sees it">
{`with orders as (

    select
        order_id,
        customer_id,
        order_status,
        updated_at,
        row_number() over (
            partition by order_id
            order by updated_at desc
        ) as row_num
    from {{ ref('stg_orders') }}

    {% if is_incremental() %}
    where updated_at > (select max(updated_at) from {{ this }})
    {% endif %}

)

select
    order_id, customer_id, order_status, updated_at
from orders
where row_num = 1   -- keep only the newest version of each order_id
                    -- within THIS batch, before it ever reaches the MERGE`}
        </CodeBox>

        <Para>
          This pattern — a <code>row_number()</code> window function partitioned by the intended
          <code>unique_key</code>, keeping only the newest row per key — is the standard defense against a
          batch containing more than one update for the same key, and is worth adding by default to any
          incremental model where the source could plausibly emit more than one event per key in a single
          incremental window.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Strategies ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Incremental Strategies" />
        <SectionTitle>append, delete+insert, and merge — Three Different Mechanics</SectionTitle>

        <Para>
          <code>incremental_strategy</code> controls the actual SQL dbt generates to combine the new,
          filtered rows with the existing table. The three you will use in practice behave very differently,
          and picking the wrong one for a given model's update pattern produces either duplicate rows or
          silently-stale data.
        </Para>

        <SubTitle>append — insert only, no updates, ever</SubTitle>

        <Para>
          <code>append</code> is the simplest possible strategy: dbt runs the filtered <code>is_incremental()</code>
          SELECT and inserts every row it returns straight into the existing table. It never checks whether
          a row with a matching key already exists, and it never updates or deletes anything. It is the
          fastest and cheapest strategy by a wide margin, because it is a single, unconditional
          <code>INSERT INTO ... SELECT</code> with no matching or scanning of the existing table required.
        </Para>

        <CodeBox label="append — what dbt actually runs">
{`insert into analytics.fct_page_views
select
    event_id, user_id, page_url, event_time, session_id
from analytics_staging.stg_page_views
where event_time > (select max(event_time) from analytics.fct_page_views)`}
        </CodeBox>

        <Para>
          The catch: <code>append</code> cannot handle late-arriving updates to existing rows. If the same
          <code>event_id</code> is somehow re-emitted by the source with a corrected value, <code>append</code>
          inserts it as a second row rather than replacing the first — it has no concept of "the same row"
          because it never looks at <code>unique_key</code> at all. <code>append</code> is the right choice
          only for genuinely immutable, append-only event data: page views, clickstream events, IoT sensor
          readings — data that is written once and never edited again.
        </Para>

        <SubTitle>delete+insert — delete matching keys, then insert the new batch</SubTitle>

        <Para>
          <code>delete+insert</code> runs in two explicit steps: first, delete every row in the existing
          table whose <code>unique_key</code> matches a key present in the new, filtered batch; second,
          insert the entire new batch. Net effect: any row whose key reappears gets replaced wholesale by
          its newest version, and any row with a genuinely new key is added. This is a common default on
          Snowflake and BigQuery, where it is often implemented efficiently using a temporary table holding
          the new batch.
        </Para>

        <CodeBox label="delete+insert — what dbt actually runs, in two steps">
{`-- Step 1: delete existing rows whose key appears in the new batch
delete from analytics.fct_orders
where order_id in (
    select order_id from analytics_staging.stg_orders__dbt_tmp
)

-- Step 2: insert the entire new/updated batch
insert into analytics.fct_orders
select * from analytics_staging.stg_orders__dbt_tmp`}
        </CodeBox>

        <Para>
          Because this runs as two separate statements, a failure between them (a killed session, a warehouse
          timeout) can leave the table in a transiently inconsistent state — rows deleted but not yet
          reinserted — unless the warehouse wraps both steps in a single transaction, which Snowflake and
          BigQuery both do for this exact reason. Even so, <code>delete+insert</code> is inherently a
          two-statement operation and therefore slightly more overhead than a single native <code>MERGE</code>.
        </Para>

        <SubTitle>merge — one native MERGE statement, insert-or-update in a single operation</SubTitle>

        <Para>
          <code>merge</code> generates a single native SQL <code>MERGE</code> statement: for every row in the
          new batch, if a row with a matching <code>unique_key</code> already exists in the target table,
          update it in place; otherwise, insert it as a new row. This is the most warehouse-native mechanism
          available on platforms that support <code>MERGE</code> natively — Snowflake, BigQuery, Databricks,
          and Redshift all do — and it is typically the preferred and default choice on Snowflake
          specifically, where <code>MERGE</code> is a well-optimized, single-statement operation.
        </Para>

        <CodeBox label="merge — the native MERGE statement dbt generates">
{`merge into analytics.fct_orders as target
using analytics_staging.stg_orders__dbt_tmp as source
on target.order_id = source.order_id

when matched then update set
    customer_id   = source.customer_id,
    order_status  = source.order_status,
    total_amount  = source.total_amount,
    updated_at    = source.updated_at

when not matched then insert (
    order_id, customer_id, order_status, total_amount, updated_at
) values (
    source.order_id, source.customer_id, source.order_status,
    source.total_amount, source.updated_at
)`}
        </CodeBox>

        <Para>
          Because it is one atomic statement rather than two, <code>merge</code> avoids the transient
          inconsistency window of <code>delete+insert</code> and is generally the fastest option when the
          warehouse's query optimizer can push the join efficiently — which is essentially always true on
          modern cloud warehouses at the row volumes incremental models are built for.
        </Para>

        <Table
          headers={['Strategy', 'Handles updates to existing keys?', 'Statements run', 'Best for']}
          rows={[
            ['append', 'No — always inserts, never checks existing keys.', '1 (INSERT)', 'Pure immutable event streams: page views, clickstream, sensor logs.'],
            ['delete+insert', 'Yes — deletes matching keys, then reinserts the whole batch.', '2 (DELETE, then INSERT)', 'Warehouses without efficient native MERGE, or when a full row replace is simpler to reason about.'],
            ['merge', 'Yes — a single statement inserts new keys and updates matching keys.', '1 (MERGE)', 'Snowflake, BigQuery, Databricks — the default choice for any fact table with mutable rows.'],
          ]}
        />

        <Callout title="incremental_strategy defaults vary by adapter" color={K}>
          If <code>incremental_strategy</code> is left unset, dbt picks a sensible default per warehouse
          adapter — <code>merge</code> on adapters that support it well, <code>append</code> on some
          others. Do not rely on the default silently being correct for a model with mutable rows — set
          <code>incremental_strategy</code> explicitly whenever <code>unique_key</code> is also set, so the
          two configs are never accidentally mismatched.
        </Callout>

        <SubTitle>A decision framework — walking through the actual choice</SubTitle>

        <Para>
          In practice, picking a strategy comes down to answering two questions about the model's source
          data, in order. First: can a row that has already landed ever be changed or corrected later? If
          the honest answer is no — the data is genuinely append-only, like an immutable event log — then
          <code>append</code> is correct, and adding <code>unique_key</code> or a fancier strategy only adds
          overhead for no benefit. If the answer is yes, move to the second question: does the target
          warehouse support an efficient native <code>MERGE</code> statement? Snowflake, BigQuery, Databricks,
          and Redshift all do, which makes <code>merge</code> the right default. On an adapter where
          <code>MERGE</code> is poorly optimized or unsupported, <code>delete+insert</code> is the fallback
          that still correctly handles updates to existing rows.
        </Para>

        <CodeBox label="The decision, as a short flowchart in comment form">
{`Can an existing row's data ever be corrected or updated after it first lands?
│
├── No (genuinely immutable events) ──────────────► incremental_strategy='append'
│
└── Yes (rows can be corrected/updated) ──► Does the warehouse support native MERGE well?
                                              │
                                              ├── Yes (Snowflake, BigQuery, Databricks) ──► incremental_strategy='merge'
                                              │
                                              └── No / unsure ─────────────────────────────► incremental_strategy='delete+insert'`}
        </CodeBox>

        <Para>
          A common real mistake is answering the first question wrong by assumption rather than by checking
          the actual source system. "Orders never change once placed" sounds true until a refund, a status
          correction, or a support-tooling backfill script proves otherwise months later — exactly the
          pattern in this module's Real World section. When in doubt, default to <code>merge</code> with a
          <code>unique_key</code> set; the cost of an unnecessary key check on genuinely immutable data is
          small, while the cost of silently accumulating duplicate rows under <code>append</code> on data
          that turned out to be mutable is a real, compounding data quality bug.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Full Refresh & Divergence ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Full Refresh and the Divergence Bug" />
        <SectionTitle>dbt run --full-refresh, and the Classic Bug Class It Exists to Fix</SectionTitle>

        <Para>
          <code>dbt run --full-refresh</code> (or <code>dbt build --full-refresh</code>) forces dbt to drop
          and completely rebuild an incremental model from scratch — running the full, unfiltered SELECT as
          if the model had never existed before, exactly as it would on its very first run. Every reason to
          reach for it comes down to the same underlying need: the incrementally-built table and the
          full-rebuild-from-scratch table have stopped agreeing, and a full-refresh is how you force them
          back into agreement.
        </Para>

        <Table
          headers={['When to run --full-refresh', 'Why']}
          rows={[
            ['The incremental logic itself changed', 'A new column was added, a join was fixed, a filter condition changed — the existing table reflects the OLD logic and needs to be rebuilt under the new logic to be consistent.'],
            ['unique_key changed', 'Existing rows were merged under the old key definition; changing the key without a full-refresh leaves the table in a mixed, inconsistent state.'],
            ['A backfill is needed', 'Historical source data was corrected or newly loaded further back than the model\'s incremental filter would ever look — the filtered is_incremental() SELECT will never reach it on its own.'],
            ['The incremental filter is suspected to have drifted from full-refresh behavior', 'See the divergence bug below — this is the recovery path once you\'ve confirmed a mismatch.'],
          ]}
        />

        <SubTitle>The divergence bug: incremental runs and full-refresh runs producing different results</SubTitle>

        <Para>
          This is the single most consequential bug class in incremental model design, and it is subtle
          precisely because both code paths "work" individually — the bug is that they silently disagree with
          each other. It happens when the <code>WHERE</code> clause inside the <code>is_incremental()</code>
          block does not exactly match the implicit scope of the full, unfiltered SELECT that runs outside it.
        </Para>

        <CodeBox label="The bug — an incremental filter narrower than the full SELECT's actual scope">
{`select
    order_id,
    customer_id,
    order_status,
    total_amount,
    updated_at
from {{ ref('stg_orders') }}
where order_status != 'cancelled'   -- ← this filter applies on EVERY run

{% if is_incremental() %}
  and updated_at > (select max(updated_at) from {{ this }})
{% endif %}

-- Looks fine. But now: what happens to an order that WAS 'cancelled'
-- at the time it first landed (correctly excluded), and later gets its
-- status corrected back to a valid, non-cancelled state?
--
-- On the FULL-REFRESH path: the current stg_orders row for that order
-- is scanned fresh, its order_status is now valid, and it IS included.
--
-- On the INCREMENTAL path: the filter only looks at updated_at > max(updated_at).
-- If that order's updated_at was NOT bumped when its status changed
-- (a common upstream mistake), the incremental run never sees it at all —
-- it silently stays missing from the table.
--
-- Result: dbt run keeps the order missing forever.
--         dbt run --full-refresh brings it back.
-- Two runs of the "same" model produce two different tables.`}
        </CodeBox>

        <Para>
          The fix is not a clever trick — it is discipline: the condition that decides which rows are
          eligible to appear in the model at all (here, <code>order_status != 'cancelled'</code>) must be
          evaluated consistently regardless of which path runs, and the incremental filter's job is only to
          narrow <em>which rows to re-scan for changes</em>, never to silently redefine <em>which rows are
          eligible to exist in the model</em>. In practice this usually means either filtering on a column
          that reliably updates whenever anything relevant about the row changes, or widening the incremental
          window to re-scan slightly more than the strict minimum, trading a little extra compute for
          correctness.
        </Para>

        <Callout title="When in doubt, widen the incremental window, don't narrow it" color="#ef4444">
          A slightly too-wide <code>is_incremental()</code> filter costs a little extra compute — it
          re-processes a few rows that didn't actually need it. A too-narrow filter silently drops or
          permanently stales real rows with no error, no warning, and no signal that anything is wrong until
          someone notices the numbers don't match a full-refresh. Given that asymmetry, err toward re-scanning
          slightly more than the theoretical minimum.
        </Callout>

        <Para>
          A useful habit for catching this class of bug before it reaches production: periodically run
          <code>dbt run --full-refresh</code> against a model in a staging environment and diff its row count
          and key aggregates against the incrementally-built production table. If they ever disagree, the
          incremental filter has drifted from the full-refresh scope, and that is the signal to go looking
          for exactly the kind of hidden extra <code>WHERE</code> condition shown above.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Worked Example ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked Example" />
        <SectionTitle>A Real Incremental Fact Table: fct_orders End to End</SectionTitle>

        <Para>
          Bringing every piece together: a real <code>fct_orders</code> model using <code>unique_key</code>,
          the <code>merge</code> strategy, and an incremental filter on <code>updated_at</code> — the shape
          this exact model takes in the large majority of production dbt projects.
        </Para>

        <CodeBox label="models/marts/fct_orders.sql — full worked example">
{`{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge',
    on_schema_change='append_new_columns'
  )
}}

with orders as (

    select
        order_id,
        customer_id,
        order_placed_at,
        order_status,
        updated_at
    from {{ ref('stg_orders') }}

    {% if is_incremental() %}
    where updated_at > (select max(updated_at) from {{ this }})
    {% endif %}

),

order_items as (

    select
        order_id,
        sum(line_item_amount) as items_subtotal,
        count(*) as line_item_count
    from {{ ref('stg_order_items') }}
    group by 1

),

final as (

    select
        orders.order_id,
        orders.customer_id,
        orders.order_placed_at,
        orders.order_status,
        orders.updated_at,
        order_items.items_subtotal,
        order_items.line_item_count
    from orders
    left join order_items
        on orders.order_id = order_items.order_id

)

select * from final`}
        </CodeBox>

        <Para>
          Trace what happens on each kind of run. On the very first <code>dbt run</code>, the target table
          <code>fct_orders</code> does not exist, so <code>is_incremental()</code> is false, the
          <code>where</code> clause is skipped entirely, and every historical order is processed and inserted
          — a full build, identical to what a table materialization would do. On every subsequent
          <code>dbt run</code>, the table exists, <code>is_incremental()</code> is true, and the query only
          pulls orders whose <code>updated_at</code> is newer than the newest one already in
          <code>fct_orders</code> — typically a few thousand rows instead of the full historical volume. The
          <code>merge</code> strategy then updates any order whose status changed (shipped, delivered,
          refunded) in place, and inserts any genuinely new order as a new row.
        </Para>

        <Para>
          Notice that <code>updated_at</code> is chosen deliberately, not <code>order_placed_at</code>. A
          filter on <code>order_placed_at</code> would only ever catch brand-new orders — it would never
          re-scan an existing order whose status later changed, because that order's <code>placed_at</code>
          value never changes even though the row itself does. This is exactly the divergence trap from Part
          06: the incremental filter column must track "this row changed," not "this row was created."
        </Para>

        <CodeBox label="Backfilling three months of corrected history without touching the rest">
{`# A backfill is a full-refresh scoped, in practice, by first fixing upstream
# data and then forcing a rebuild — dbt itself has no partial-range refresh
# built into the base incremental materialization, so the standard pattern is:

dbt run --select fct_orders --full-refresh

# For very large tables where a full rebuild is too expensive just to fix
# 3 months of data, some teams instead add a manual backfill script that
# runs the model's SQL with an explicit date range substituted in place of
# is_incremental()'s filter, and MERGEs just that range back in.`}
        </CodeBox>

        <Para>
          The compute difference between the two paths is the entire reason incremental models exist in
          the first place, and it is worth making concrete with real numbers for this exact model.
        </Para>

        <Table
          headers={['Run type', 'Rows scanned', 'Approximate cost driver']}
          rows={[
            ['First-ever run / --full-refresh on 2 years of history', '~2,000,000,000 rows', 'Full join of orders, order_items across the entire historical volume — the expensive path, run rarely.'],
            ['A normal hourly incremental run', '~4,000–8,000 rows', 'Only orders with updated_at newer than the current max — a few thousand rows regardless of how much total history exists.'],
            ['A 3-month targeted backfill (manual date-range script)', '~180,000,000 rows', 'Bounded to the affected date range only, far cheaper than a full 2-year rebuild but still far more than a routine hourly run.'],
          ]}
        />

        <Para>
          This is the practical payoff in one table: routine runs stay cheap and roughly constant no matter
          how much history accumulates, while the expensive full-scan path is reserved for the rare
          occasions — first build, a logic change, a backfill — where it is genuinely unavoidable.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — Operational Concerns ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Operational Concerns" />
        <SectionTitle>Schema Changes, Late-Arriving Data, and Monitoring an Incremental Model</SectionTitle>

        <SubTitle>on_schema_change — what happens when the model's columns change</SubTitle>

        <Para>
          Unlike a table materialization, which simply drops and recreates the table with whatever columns
          the current SELECT produces, an incremental model's existing table already has a fixed schema from
          a previous run. If the model's SQL is edited to add a new column, dbt needs to decide what to do
          about the mismatch between the existing table's schema and the new SELECT's schema.
        </Para>

        <Table
          headers={['on_schema_change value', 'Behavior']}
          rows={[
            ["'ignore' (default)", 'New columns in the SELECT are silently dropped when merging into the existing table — the mismatch is not resolved automatically.'],
            ["'append_new_columns'", 'New columns found in the SELECT are added to the existing table (as nullable, backfilled with NULL for old rows); removed columns are left alone.'],
            ["'sync_all_columns'", 'The existing table\'s columns are fully reconciled to match the current SELECT — new columns added, removed columns dropped.'],
            ["'fail'", 'The run errors out immediately if a schema mismatch is detected, forcing a deliberate, explicit full-refresh instead of an automatic reconciliation.'],
          ]}
        />

        <Para>
          <code>append_new_columns</code> is the most common real-world choice — it lets a model evolve
          incrementally without a mandatory full-refresh on every schema change, while <code>sync_all_columns</code>
          is used when keeping the table strictly matched to the model definition matters more than
          preserving old, now-unused columns.
        </Para>

        <CodeBox label="A schema change in practice — adding a discount_amount column">
{`-- Before: fct_orders has order_id, customer_id, total_amount, updated_at
-- Model SQL is edited to add a new column:

select
    order_id,
    customer_id,
    total_amount,
    discount_amount,   -- newly added
    updated_at
from {{ ref('stg_orders') }}

{% if is_incremental() %}
  where updated_at > (select max(updated_at) from {{ this }})
{% endif %}

-- With on_schema_change='append_new_columns':
-- dbt ALTERs the existing fct_orders table to add discount_amount
-- (as a nullable column), backfilling NULL for every row that already
-- existed, then proceeds with the normal incremental merge for new rows.
-- Old rows show NULL for discount_amount until they happen to be
-- re-processed by a future incremental run — they are NOT retroactively
-- backfilled with a real value automatically.`}
        </CodeBox>

        <Callout title="append_new_columns does not backfill historical values" color={K}>
          Adding a column with <code>append_new_columns</code> only changes the schema going forward —
          every row that existed before the change shows <code>NULL</code> for the new column, not some
          computed historical value. If the new column genuinely needs a correct value for old rows too,
          that requires a deliberate <code>--full-refresh</code>, not just the schema-change mechanism.
        </Callout>

        <SubTitle>Late-arriving data — the limit of any incremental filter</SubTitle>

        <Para>
          Every incremental filter makes an assumption: that the source system won't hand you a row whose
          <code>event_time</code> or <code>updated_at</code> is older than the window the filter already
          scanned past. Late-arriving data breaks that assumption — a mobile client that buffers events
          offline and syncs them three days later will produce a row with an <code>event_time</code> from
          three days ago, arriving in the source table today. A naive <code>where event_time &gt; max(event_time)</code>
          filter never catches it, because by the time it lands, the incremental window has already moved
          past that timestamp.
        </Para>

        <CodeBox label="A lookback window guards against modest late-arrival">
{`{% if is_incremental() %}
  where event_time > (
    select dateadd('hour', -3, max(event_time)) from {{ this }}
  )
{% endif %}

-- Re-scans a 3-hour overlap on every run, trading a small amount of
-- extra compute for tolerance to events that arrive a few hours late.
-- Combined with unique_key + merge, re-scanning the overlap safely
-- updates any row that already exists rather than duplicating it.`}
        </CodeBox>

        <SubTitle>Monitoring — the signal that an incremental model is unhealthy</SubTitle>

        <Para>
          The single most useful health check for an incremental model in production is comparing its
          incrementally-built row count and key aggregates (sums, counts) against a periodic full-refresh
          run in a non-production environment, exactly as described in Part 06. A second useful signal is
          simply tracking how many rows each incremental run actually processes over time — a sudden jump
          from a few thousand rows per run to several million is usually a sign that the source's
          <code>updated_at</code> column stopped updating reliably somewhere upstream, silently forcing the
          filter to re-scan far more history than intended.
        </Para>

        <Callout title="Ephemeral and incremental do not mix" color={K}>
          An incremental model cannot be built <code>ref()</code>'d from an ephemeral model in the same way a
          table can — because <code>{'{{ this }}'}</code> in the <code>is_incremental()</code> block needs a
          real, persisted relation to query <code>max()</code> against. Keep upstream sources for an
          incremental model as views or tables, not ephemeral CTEs.
        </Callout>

        <SubTitle>An audit query pattern for ongoing confidence, without a full-refresh every time</SubTitle>

        <Para>
          Running a full <code>--full-refresh</code> diff is the most thorough check, but it is also the
          most expensive — it means paying the full rebuild cost just to validate correctness. A cheaper,
          lightweight check that catches a large share of real divergence bugs without a full rebuild is an
          audit query comparing row counts and a business-critical aggregate between the incremental
          table and its immediate upstream source, scoped to a recent window.
        </Para>

        <CodeBox label="A lightweight audit query — no full-refresh required">
{`-- Run this periodically (e.g. as a dbt test, or a scheduled check) against
-- the last 7 days of data, comparing the incremental model to its source:

with source_side as (
    select count(*) as source_row_count
    from {{ ref('stg_orders') }}
    where updated_at > current_date - interval '7 days'
),

fact_side as (
    select count(*) as fact_row_count
    from {{ ref('fct_orders') }}
    where updated_at > current_date - interval '7 days'
)

select
    source_side.source_row_count,
    fact_side.fact_row_count,
    source_side.source_row_count - fact_side.fact_row_count as row_count_diff
from source_side, fact_side
where source_side.source_row_count != fact_side.fact_row_count`}
        </CodeBox>

        <Para>
          A nonzero <code>row_count_diff</code> for a recent window is an early warning sign worth
          investigating well before it grows large enough for a stakeholder to notice in a dashboard. This
          kind of audit query can itself be wired up as a dbt singular test — exactly the pattern covered in
          the next module in this track — turning an ad hoc sanity check into an automatically enforced
          assertion that runs on every <code>dbt build</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Incremental Models</SectionTitle>

        {[
          {
            wrong: '"Incremental models are just a faster way to build tables — pick incremental for every large model automatically"',
            right: 'Incremental adds real complexity: a unique_key to maintain, a strategy to choose, and an is_incremental() filter that can silently drift from full-refresh behavior. It is worth that complexity for genuinely large, append-mostly fact tables — not for every table above some row count. A 5-million-row dimension table that rebuilds in 20 seconds gains little from the added complexity.',
          },
          {
            wrong: '"unique_key alone deduplicates rows, regardless of which incremental_strategy is set"',
            right: 'unique_key is only acted on by strategies that use it — merge and delete+insert both check it before deciding to update-in-place versus insert. The append strategy ignores unique_key entirely and will happily insert duplicate rows with the same key if the filtered SELECT returns them more than once.',
          },
          {
            wrong: '"dbt run --full-refresh is a destructive last resort, and needing it means something is broken"',
            right: 'Full-refresh is a normal, expected recovery path — needed after a deliberate unique_key change, an intentional backfill, or a fixed incremental filter. It only signals something is broken when it is needed to fix a silent divergence between incremental and full-refresh output, not simply because it was run.',
          },
          {
            wrong: '"The is_incremental() filter only affects performance, never correctness"',
            right: 'A too-narrow is_incremental() filter (Part 06) silently drops or permanently stales real rows with no error message. This is a correctness bug, not a performance one — the model produces different final data on an incremental run than on a full-refresh, and nothing in dbt\'s output tells you that happened.',
          },
          {
            wrong: '"merge is always strictly better than delete+insert — there\'s no reason to ever choose delete+insert"',
            right: 'merge is usually preferred where the warehouse supports it well, but delete+insert remains useful when the update logic genuinely needs a full row replace rather than a column-by-column update, or on adapters where a native MERGE is not well optimized or not supported at all.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: FONT_MONO }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Three Incremental Model Incidents, Three Different Warehouses</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Instacart — grocery delivery, order fact table
          </div>
          <Para>
            An analytics engineer at Instacart owns <code>fct_deliveries</code>, an incremental model on
            <code>updated_at</code> with a <code>merge</code> strategy. A dashboard used by regional
            operations managers starts showing delivery counts that are consistently a few hundred lower
            than the number of deliveries support tickets reference for the same day. The engineer runs
            <code>dbt run --full-refresh</code> against a clone of the model in a scratch schema and diffs
            row counts against production: the full-refresh version has more rows for the affected day.
          </Para>
          <Para>
            The cause: a subset of delivery records get corrected hours after creation by a support-tooling
            backfill job that updates <code>delivery_status</code> directly in the source table via a bulk
            SQL script — a script that, unlike the normal application write path, does not touch
            <code>updated_at</code>. Those corrected rows never re-enter the incremental filter's window.
            The fix is not in the dbt model at all — it is a one-line addition to the support-tooling script
            to set <code>updated_at = now()</code> on every row it touches, restoring the assumption the
            incremental filter depends on.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Toast — restaurant point-of-sale, transaction events
          </div>
          <Para>
            An engineering team at Toast builds <code>fct_pos_transactions</code> using <code>append</code>
            as the incremental strategy, reasoning that a completed transaction never changes once recorded.
            This holds for months, until a card-network chargeback reversal process starts writing a
            corrected transaction row with the same <code>transaction_id</code> but an updated
            <code>amount</code>, to reflect a partial refund applied after settlement.
          </Para>
          <Para>
            With <code>append</code>, the corrected row is simply inserted alongside the original — the
            table now has two rows sharing one <code>transaction_id</code>, and every downstream revenue
            aggregation silently double-counts the original amount. The team switches the strategy to
            <code>merge</code> with <code>unique_key='transaction_id'</code>, and the fix requires a
            <code>--full-refresh</code> to first collapse the existing duplicate pairs before the merge logic
            can maintain correctness going forward — <code>merge</code> only prevents new duplicates, it does
            not retroactively fix ones an earlier <code>append</code> strategy already created.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Samsara — IoT vehicle telemetry, sensor readings
          </div>
          <Para>
            Samsara ingests GPS and engine telemetry from vehicle hardware that occasionally loses network
            connectivity and buffers readings on-device, uploading them in a burst once reconnected — sometimes
            several hours after the reading's actual timestamp. The original <code>fct_vehicle_telemetry</code>
            model filters strictly on <code>reading_time &gt; max(reading_time)</code>, with no lookback
            window, on the (reasonable-sounding) assumption that telemetry is pure append-only.
          </Para>
          <Para>
            Vehicles that go through connectivity gaps — parking garages, rural routes — have their buffered
            readings silently excluded from every future incremental run, because by the time they arrive,
            the filter's window has already moved past their timestamps. The fix is the lookback-window
            pattern from Part 08: the filter is widened to
            <code>reading_time &gt; dateadd('hour', -6, max(reading_time))</code>, re-scanning a 6-hour
            overlap on every run and relying on <code>unique_key</code> plus <code>merge</code> to safely
            absorb the reprocessed readings without duplicating the ones already correctly captured the
            first time.
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
            q: 'Walk me through exactly what happens, mechanically, on the first dbt run of a brand-new incremental model versus every run after that.',
            a: 'On the first run, the target relation doesn\'t exist yet, so is_incremental() evaluates to false — the code inside that Jinja block is skipped entirely, and the model\'s full, unfiltered SELECT runs and gets written as a new table, identical to what a table materialization would produce (Part 03). On every subsequent run, the relation exists and dbt is not in --full-refresh mode, so is_incremental() is true, the WHERE clause inside the block is included, and only the narrower set of rows it matches gets computed and merged into the existing table using whichever incremental_strategy is configured (Part 05). The first run always does the expensive full pass exactly once; every run after that is meant to be cheap.',
          },
          {
            q: 'What is unique_key for, and what breaks if you set it without also setting an appropriate incremental_strategy?',
            a: 'unique_key tells dbt which column (or columns) identify "the same logical row" across runs, which matters whenever a row can be updated after it first appears — an order changing status, a corrected sensor reading. It only has an effect if the incremental_strategy actually consults it: merge and delete+insert both use it to update matching rows in place; append ignores it completely and will insert a second row with the same key if the filtered SELECT ever returns a row whose key already exists in the table (Part 04 and Part 05). Setting unique_key with strategy=append silently accomplishes nothing — the config exists, but nothing in append\'s logic ever reads it.',
          },
          {
            q: 'Explain the difference between delete+insert and merge, and when you would deliberately choose delete+insert over merge.',
            a: 'delete+insert runs as two explicit statements: delete every existing row whose unique_key matches a key in the new batch, then insert the entire new batch. merge does the same net effect in one native SQL MERGE statement — update matching rows in place, insert new ones — in a single atomic operation (Part 05). merge is generally preferable where the warehouse supports it well, since it avoids the transient inconsistency window between the delete and insert steps and is typically faster. delete+insert is still the right choice on adapters where native MERGE isn\'t well supported or optimized, or when the update logic genuinely needs a full row replace rather than dbt\'s generated column-by-column MERGE update clause.',
          },
          {
            q: 'Describe the specific bug where an incremental model and its full-refresh produce different results, and how you\'d design against it.',
            a: 'This happens when a condition that determines which rows are eligible to appear in the model at all gets applied inconsistently between the two code paths — usually because a WHERE clause outside the is_incremental() block interacts badly with a filter column, like updated_at, that doesn\'t reliably update whenever a row\'s other relevant fields change (Part 06). A row that becomes newly eligible after some upstream correction gets picked up correctly on a full rebuild (which re-scans everything fresh) but never gets picked up incrementally (because the filter never revisits it). The design defense is to make sure the incremental filter\'s column genuinely tracks "this row changed" for every kind of change that matters, to prefer widening the incremental window over narrowing it when in doubt, and to periodically diff a full-refresh run against production to catch drift before it\'s discovered by a stakeholder noticing wrong numbers.',
          },
          {
            q: 'When would you reach for dbt run --full-refresh in a real project, and is it ever a sign something is wrong?',
            a: 'Full-refresh is the normal recovery path any time the existing incrementally-built table needs to be reconciled against a change in the model\'s own logic: a changed unique_key, a materially changed SELECT, or an intentional backfill of corrected historical data that the incremental filter\'s window would never reach on its own (Part 06). None of those signal a problem by themselves — they\'re expected parts of evolving a model over time. It only signals something is actually wrong when a full-refresh is needed specifically to fix a silent divergence between what the incremental path has been producing and what a from-scratch rebuild produces for the same underlying data, since that means the is_incremental() logic has been quietly wrong for however long it\'s been running.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Five Mistakes Engineers Make Building Their First Incremental Models</SectionTitle>

        {[
          {
            title: 'Filtering on a "created" timestamp instead of an "updated" one',
            detail: 'Filtering is_incremental() on order_placed_at instead of updated_at means the model never re-scans a row after it first appears — any status change, correction, or late enrichment to an existing order is permanently invisible to future incremental runs, even though the row itself changed.',
          },
          {
            title: 'Setting unique_key without checking what incremental_strategy actually does with it',
            detail: 'unique_key is inert under the append strategy — it does nothing to prevent duplicate rows with the same key. Engineers often set it out of habit, assume it deduplicates, and are surprised months later when duplicates show up because append never consulted it.',
          },
          {
            title: 'Never validating an incremental model against a full-refresh',
            detail: 'Without periodically diffing an incrementally-built table against a from-scratch full-refresh, divergence bugs (Part 06) can run silently for months — nothing errors, nothing looks obviously wrong, the numbers are just quietly incomplete or stale.',
          },
          {
            title: 'No lookback window on a source with any late-arriving data',
            detail: 'A strict WHERE column > max(column) filter with zero overlap silently drops any row that arrives after its own timestamp has already scrolled out of the incremental window — common with offline-capable clients, buffered IoT devices, and any multi-step ETL pipeline with variable latency between steps.',
          },
          {
            title: 'Treating --full-refresh as something to avoid running, ever',
            detail: 'Some teams become so averse to the cost of a full-refresh that they avoid running one even to validate correctness, which removes the single most reliable tool for catching a divergence bug before a stakeholder does. A full-refresh in a scratch schema costs compute; an unnoticed months-long data quality bug costs trust.',
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
        <SectionTitle>Incremental Model Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Database Error: column "order_status" does not exist in the target relation',
            cause: 'The model SQL was edited to add a new column, but on_schema_change is left at its default of \'ignore\' (or was never set), so dbt does not reconcile the mismatch between the existing table\'s schema and the current SELECT\'s columns.',
            fix: 'Set on_schema_change=\'append_new_columns\' (to add the new column non-destructively) or run --full-refresh to rebuild the table under the new schema from scratch.',
          },
          {
            error: 'Duplicate rows appearing for the same unique_key after switching from append to merge',
            cause: 'merge only prevents NEW duplicates going forward — it does not retroactively deduplicate rows that an earlier append-strategy run already inserted as duplicates before the switch.',
            fix: 'Run --full-refresh after changing incremental_strategy to merge, so the table is rebuilt cleanly under the new merge logic rather than inheriting old duplicates.',
          },
          {
            error: 'Row counts silently lower on the incrementally-built table than an equivalent full-refresh, with no error raised',
            cause: 'The classic divergence bug (Part 06) — a WHERE condition outside the is_incremental() block interacts with a filter column that does not reliably update whenever a relevant field on the row changes, so some eligible rows are never re-scanned incrementally.',
            fix: 'Audit every filter condition that applies outside the is_incremental() block for consistency with the incremental filter column, and widen the incremental window (a lookback buffer) if the filter column\'s update behavior can\'t be fixed upstream.',
          },
          {
            error: 'Compilation Error: is_incremental() macro used outside of an incremental model context',
            cause: 'is_incremental() was called in a model that is not configured with materialized=\'incremental\' — the macro depends on incremental-specific state (whether the target relation exists, whether --full-refresh was passed) that only exists for incremental models.',
            fix: 'Confirm the model\'s config() block actually sets materialized=\'incremental\'; a table, view, or ephemeral model has no legitimate use for is_incremental() at all.',
          },
          {
            error: 'A --full-refresh run takes hours and times out the warehouse session, for a model that used to build in minutes',
            cause: 'The model has simply accumulated enough historical volume that a full, unfiltered rebuild is now genuinely expensive — the exact problem incremental models exist to avoid on every run, but which a full-refresh always pays in full by design.',
            fix: 'Increase the warehouse session/statement timeout for full-refresh runs specifically, or scope a full-refresh to run against a partitioned subset of history when the underlying table supports it, rather than the entire history at once.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
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

      <KeyTakeaways items={[
        'Incremental models exist to avoid reprocessing an entire multi-billion-row table on every run — they behave like a table materialization on the first run, and process only new/changed rows on every run after that.',
        'The is_incremental() Jinja block is the entire mechanic: code inside it runs only on incremental runs, typically wrapping a WHERE filter comparing the source against {{ this }}, the model\'s own existing relation.',
        'unique_key tells dbt what "the same row" means across runs, but it only matters to strategies that check it — merge and delete+insert do, append does not.',
        'append is fastest but insert-only; delete+insert deletes-then-inserts matching keys in two statements; merge does both in one native, atomic statement and is typically the default choice on Snowflake.',
        'dbt run --full-refresh rebuilds an incremental model completely — needed after a unique_key or logic change, a deliberate backfill, or to recover from a silent incremental/full-refresh divergence.',
        'The classic bug class is a WHERE condition or filter column that behaves inconsistently between the full SELECT and the is_incremental() filter, causing the two code paths to silently produce different final tables — guard against it by making the filter column track every relevant kind of row change, and periodically diffing against a full-refresh.',
      ]} />
    </LearnLayout>
  )
}
