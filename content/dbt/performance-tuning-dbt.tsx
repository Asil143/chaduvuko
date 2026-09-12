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

export default function PerformanceTuningDbt() {
  return (
    <LearnLayout
      title="Performance and Query Optimization in dbt"
      description="Finding slow models, materialization trade-offs revisited for performance, incremental strategy tuning, warehouse-specific config passthrough like cluster_by, reducing full-refresh cost, splitting workloads across warehouse sizes, and thread parallelism — with a real before-and-after case study."
      section="dbt — Module 17"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Performance and Query Optimization in dbt', href: '/learn/dbt/performance-tuning-dbt' },
      ]}
      prev={{ title: 'Project Structure and Layering', href: '/learn/dbt/project-structure' }}
      next={{ title: 'CI/CD for dbt Projects', href: '/learn/dbt/cicd-for-dbt' }}
    >
      {/* ── Part 01 — Finding slow models ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Finding What's Actually Slow" />
        <SectionTitle>You Cannot Tune a Model You Haven't Measured</SectionTitle>

        <Para>
          Performance tuning starts with identifying which models are actually slow and actually expensive —
          not the models that feel like they should be slow, and not the model someone complained about last
          quarter. dbt gives you two independent sources of truth here, and they answer slightly different
          questions: the per-model timing dbt itself reports during a run, and the warehouse's own query
          history, which dbt makes searchable by automatically tagging every query it issues.
        </Para>

        <SubTitle>Per-model timing in dbt run output</SubTitle>

        <Para>
          Every <code>dbt run</code> or <code>dbt build</code> reports how long each individual model took to
          build, right in its console output. This is the first and cheapest place to look — no warehouse
          console, no separate query, just reading the output you already get from a normal run.
        </Para>

        <CodeBox label="dbt run --select finance --> per-model timing in the output">
{`$ dbt run --select finance

Running with dbt=1.8.3
Concurrency: 4 threads (target='prod')

1 of 6 START sql view model finance.stg_stripe__payments ... [RUN]
1 of 6 OK created sql view model finance.stg_stripe__payments  [SUCCESS 1 in 0.84s]
2 of 6 START sql table model finance.int_payments_joined ... [RUN]
2 of 6 OK created sql table model finance.int_payments_joined  [SUCCESS 1 in 4.21s]
3 of 6 START sql table model finance.fct_revenue ........... [RUN]
3 of 6 OK created sql table model finance.fct_revenue ...... [SUCCESS 1 in 187.63s]
4 of 6 START sql table model finance.fct_payments .......... [RUN]
4 of 6 OK created sql table model finance.fct_payments ..... [SUCCESS 1 in 6.02s]

Finished running 6 models in 0 hours 3 minutes and 21.44 seconds.`}
        </CodeBox>

        <Para>
          <code>fct_revenue</code> at 187 seconds against everything else finishing in single digits is an
          immediate, unambiguous signal — that one model dominates this run's total time, and it is the first
          place to look before touching anything else. This kind of output-scanning is cheap enough to make a
          habit of after every production run, not just when someone complains.
        </Para>

        <SubTitle>Warehouse query history, filtered by dbt's automatic query tags</SubTitle>

        <Para>
          dbt run output tells you how long a model took during that specific invocation, but it doesn't tell
          you about compute cost, how a model's runtime compares over time, or how it behaves under real
          production concurrency rather than a single interactive run. For that, dbt automatically attaches a
          structured comment to every query it sends — including the invocation ID, the model's name, and
          which command triggered it — which most warehouses surface directly in their query history, making
          it possible to filter and aggregate dbt's query history the same way you would any other workload.
        </Para>

        <CodeBox label="What a dbt-issued query actually looks like on the wire">
{`/* {"app": "dbt", "dbt_version": "1.8.3", "profile_name": "analytics",
     "target_name": "prod", "node_id": "model.my_project.fct_revenue"} */
create or replace table analytics.finance.fct_revenue as (
    select ...
)`}
        </CodeBox>

        <CodeBox label="Querying Snowflake's query history for dbt's most expensive models">
{`select
    regexp_substr(query_text, '"node_id": *"([^"]+)"', 1, 1, 'e') as dbt_node_id,
    count(*) as run_count,
    avg(total_elapsed_time) as avg_ms,
    sum(credits_used_cloud_services) as total_credits
from snowflake.account_usage.query_history
where query_text ilike '%"app": "dbt"%'
  and start_time > dateadd('day', -30, current_timestamp())
group by 1
order by avg_ms desc
limit 20`}
        </CodeBox>

        <Para>
          This query answers a materially different question than the console output does: not "how long did
          this model take just now," but "which models have been the most expensive, on average, over the
          last month of production runs" — the right lens for prioritizing tuning effort, since a model that
          is occasionally slow due to a one-off warehouse hiccup is a very different problem from a model that
          is reliably, consistently expensive every single day.
        </Para>

        <Table
          headers={['Signal', 'What it tells you', 'When to use it']}
          rows={[
            ['dbt run / dbt build console output', 'Per-model wall-clock time for this one specific invocation.', 'Quick, first-pass triage right after any run — free, no extra query needed.'],
            ['Warehouse query history filtered by dbt query tags', 'Aggregate cost and timing trends across many runs, plus real production concurrency effects the console output can\'t show.', 'Prioritizing which models are worth investing tuning effort in, and confirming a fix actually helped over time.'],
          ]}
        />

        <Callout title="A slow model in dbt run output and an expensive model in warehouse billing are not always the same model" color={K}>
          A model that takes 30 seconds to build once a day is not necessarily a cost problem. A model that
          takes 3 seconds to build but is queried directly by a dashboard 50,000 times a day, recomputing a
          view's logic on every single query, can be a far larger real cost — one the console output from a
          <code>dbt run</code> will never show you, because it only measures build time, not the ongoing
          query cost a view materialization pushes onto every downstream reader. This is exactly why Part 02
          revisits materialization from a performance angle rather than treating it as already settled.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Materialization trade-offs revisited ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Materialization, Revisited for Performance" />
        <SectionTitle>A View Queried Constantly by BI Is Often Better as a Table</SectionTitle>

        <Para>
          Earlier modules in this track covered view versus table as a correctness and freshness decision —
          a view is always current, a table is a point-in-time snapshot from the last run. Performance tuning
          revisits the same choice through a different lens entirely: not "which one is correct for this
          model's freshness needs," but "which one minimizes total compute spent, once you account for every
          query that will ever hit this model, not just the cost of building it."
        </Para>

        <Para>
          A view has zero build cost and recomputes its full defining query on every single downstream query.
          A table has a real build cost, paid once per <code>dbt run</code>, and then serves every downstream
          query cheaply, as a plain read of pre-computed data. Whether a view or a table wins on total cost
          depends entirely on the ratio between how often a model is rebuilt and how often it's queried
          downstream.
        </Para>

        <CodeBox label="The actual math behind the decision">
{`Let:
  B = cost to build the model's full query once
  Q = cost to read a pre-built table once (much cheaper than B, typically)
  N = number of downstream queries between rebuilds

As a VIEW:  total cost ≈ N × B     (every query re-runs the full query)
As a TABLE: total cost ≈ B + N × Q  (one build, then N cheap reads)

If a BI dashboard refreshes this model's view 200 times a day, and B
is a 20-second join+aggregation, that's ~4,000 seconds of recomputed
warehouse compute daily for a model that only actually changes once,
on the nightly dbt run. Materializing it as a table instead: one
20-second build, then 200 cheap reads of a pre-computed table.`}
        </CodeBox>

        <Para>
          This is exactly the scenario Part 01's Callout flagged: a cheap-to-build model can still be an
          expensive line item in a warehouse bill if it's queried often enough as a view. The fix is almost
          always the same one-line change — flip <code>materialized</code> from the unconfigured view default
          to <code>table</code> — but knowing to look for this pattern requires connecting query-history data
          (Part 01) to the materialization decision, rather than assuming a model's build time alone tells the
          whole cost story.
        </Para>

        <Table
          headers={['Signal from query history', 'What it suggests']}
          rows={[
            ['A view is queried hundreds or thousands of times a day, each query taking several seconds', 'A strong candidate for table materialization — the aggregate re-computation cost likely dwarfs a single daily table rebuild.'],
            ['A view is queried a handful of times a day, each query taking under a second', 'Probably fine to leave as a view — the total recomputation cost is trivial, and a view\'s always-current freshness has real value.'],
            ['A table is rebuilt every run but queried rarely, if at all, by anything downstream', 'A candidate to reconsider as a view, or even ephemeral if it\'s purely an internal step — the table\'s build cost may not be earning its keep.'],
          ]}
        />

        <Callout title="This cuts both ways — don't over-materialize either" color="#ef4444">
          The instinct after seeing one expensive view get fixed by converting it to a table is to
          materialize everything as a table defensively. That is its own performance mistake: a table that
          is rebuilt in full on every run but rarely queried is spending real warehouse compute on every
          single <code>dbt run</code> for a payoff that's rarely collected. The right default, restated:
          materialize based on the actual read-to-write ratio a model experiences, not out of caution in
          either direction.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Incremental strategy as a performance decision ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Incremental Strategy, Tuned for Performance" />
        <SectionTitle>merge, delete+insert, and append Are Also a Performance Decision, Not Just a Correctness One</SectionTitle>

        <Para>
          An earlier module in this track covered <code>incremental_strategy</code> purely as a correctness
          question: does this model's data ever get updated after it first lands, and if so, does the
          warehouse support an efficient native <code>MERGE</code>. That framing is correct, but it leaves out
          a real performance dimension worth tuning deliberately once correctness is settled: among the
          strategies that are all individually correct for a given model, they are not equally fast, and the
          gap between them widens dramatically as batch size and match-rate change.
        </Para>

        <Para>
          <code>merge</code>'s cost is driven by the size of the join between the incoming batch and the
          existing table — specifically, how efficiently the warehouse can locate matching keys. On a table
          that isn't clustered or sorted in a way that aligns with the merge key, that join can require
          scanning far more of the existing table than the incoming batch's size alone would suggest.
          <code>delete+insert</code> pays a similar cost on its delete step, plus the overhead of two separate
          statements instead of one. <code>append</code> avoids the matching cost entirely, at the cost of
          never checking for or handling duplicates — which is exactly why Part 03's correctness framing in
          the earlier module restricts it to genuinely immutable data.
        </Para>

        <Table
          headers={['Strategy', 'Dominant performance cost', 'Gets slower as...']}
          rows={[
            ['append', 'A single INSERT — no matching against the existing table at all.', 'Batch size grows, but there is no matching cost to scale with existing table size.'],
            ['delete+insert', 'A DELETE scanning for matching keys, then a separate INSERT.', 'The existing table grows, if the delete\'s key lookup isn\'t well-supported by clustering/indexing; also scales with two round trips instead of one.'],
            ['merge', 'A single MERGE\'s join between the incoming batch and the existing table.', 'The existing table grows without adequate clustering on the merge key, or the incoming batch itself grows very large relative to a typical run.'],
          ]}
        />

        <Para>
          The practical performance tuning move here is not usually switching strategies — correctness
          constraints from the earlier module still apply — but making the chosen strategy cheaper to execute,
          most commonly by ensuring the underlying table is clustered or sorted on the same column the merge
          or delete condition filters and matches on, which is exactly what Part 04's warehouse-specific
          config passthrough addresses directly.
        </Para>

        <Callout title="Batch size interacts with strategy cost non-linearly" color={K}>
          A merge processing a few thousand rows against a two-billion-row table is cheap specifically because
          the warehouse can use clustering metadata to skip scanning most of the table. The same merge
          processing several million rows in one batch — after a consumer has fallen behind, say, or after a
          wide backfill window — can become dramatically more expensive, not linearly but often
          disproportionately so, because a much larger fraction of the existing table's micro-partitions or
          blocks now need to be touched. This is one more reason a too-wide incremental lookback window (a
          concern raised in the earlier incremental models module) has a real performance cost on top of its
          correctness purpose.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Warehouse-specific config passthrough ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Warehouse-Specific Config Passthrough" />
        <SectionTitle>cluster_by and Friends — Warehouse-Native Performance Knobs, Configured Directly in dbt</SectionTitle>

        <Para>
          dbt's <code>config()</code> block isn't limited to the handful of adapter-agnostic keys covered
          elsewhere in this track — <code>materialized</code>, <code>unique_key</code>,
          <code>incremental_strategy</code>. Every adapter also exposes warehouse-native performance configs
          directly through the same <code>config()</code> block, letting a model's file be the single place
          that controls both its dbt-level behavior and its underlying physical storage layout on the
          warehouse.
        </Para>

        <Para>
          On Snowflake, the most commonly used one is <code>cluster_by</code>, which sets a clustering key on
          the resulting table — a physical hint to Snowflake about how to co-locate rows on disk so that
          queries filtering or joining on the clustered column can skip scanning irrelevant micro-partitions
          entirely, rather than scanning the whole table and filtering after the fact.
        </Para>

        <CodeBox label="models/marts/finance/fct_revenue.sql — cluster_by passed straight through config()">
{`{{
  config(
    materialized='incremental',
    unique_key='payment_id',
    incremental_strategy='merge',
    cluster_by=['revenue_date']
  )
}}

select
    payment_id,
    order_id,
    customer_id,
    amount_cents,
    revenue_date
from {{ ref('int_payments_joined_to_orders') }}

{% if is_incremental() %}
  where revenue_date > (select max(revenue_date) from {{ this }})
{% endif %}`}
        </CodeBox>

        <Para>
          This one config line means every downstream query filtering on <code>revenue_date</code> — which,
          for a revenue fact table, is nearly every query a BI dashboard runs — can prune most of the table's
          micro-partitions before scanning a single row. It's also directly relevant to Part 03's incremental
          performance point: a merge or delete+insert whose match condition is scoped by
          <code>revenue_date</code> benefits from exactly the same clustering, since the warehouse can use the
          same physical layout to narrow which micro-partitions the merge's join needs to touch.
        </Para>

        <Table
          headers={['Adapter', 'Common performance config', 'What it controls']}
          rows={[
            ['Snowflake', 'cluster_by', 'A physical clustering key — co-locates rows on disk so filters/joins on that column can skip irrelevant micro-partitions.'],
            ['BigQuery', 'partition_by / cluster_by', 'partition_by splits a table into physical date/int-range partitions that can be pruned entirely; cluster_by sorts within each partition for further pruning.'],
            ['Databricks', 'partition_by / liquid_clustering_by', 'Similar physical layout controls — partitioning and (on Databricks specifically) newer, more flexible liquid clustering.'],
            ['Redshift', 'sortkey / dist_style / dist', 'sortkey controls physical row ordering for range-restricted scans; dist_style/dist control how rows are distributed across compute nodes, directly affecting join performance.'],
          ]}
        />

        <CodeBox label="The same idea on BigQuery — partition_by plus cluster_by">
{`{{
  config(
    materialized='incremental',
    partition_by={'field': 'revenue_date', 'data_type': 'date'},
    cluster_by=['customer_id']
  )
}}

select ...`}
        </CodeBox>

        <Para>
          BigQuery's <code>partition_by</code> is a stronger guarantee than Snowflake's
          <code>cluster_by</code> — a query filtering on a partitioned column can skip entire partitions'
          worth of storage before billing for any bytes scanned at all, which on BigQuery's
          bytes-scanned pricing model translates directly into dollars saved, not just wall-clock time.
          <code>cluster_by</code> on top of that further sorts rows within each partition, helping a query
          that also filters on <code>customer_id</code> narrow further within whichever partitions it does
          scan.
        </Para>

        <Callout title="Pick the clustering key based on how the model is actually queried, not how it's built" color={K}>
          The right column for <code>cluster_by</code> or <code>partition_by</code> is whichever column
          downstream queries — dashboards, ad hoc analyst queries, the model's own incremental filter — most
          commonly filter or join on. This is not necessarily the same column the model's own
          <code>is_incremental()</code> logic filters on, though for a well-designed fact table it very often
          is, since both the incremental filter and the typical downstream query usually revolve around the
          same time or entity dimension.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — Reducing full-refresh cost ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Reducing Full-Refresh Cost" />
        <SectionTitle>A Full Rebuild Is Rare But Expensive — Make It Cheaper When It Has to Happen</SectionTitle>

        <Para>
          The earlier incremental models module covers when a full-refresh is necessary — a changed
          <code>unique_key</code>, a fixed incremental filter, a deliberate backfill. From a pure performance
          angle, the goal is different: given that a full-refresh is occasionally unavoidable, how do you make
          that specific, expensive run as cheap as possible when it does happen, since it is by construction
          the single most expensive operation any incremental model ever performs.
        </Para>

        <SubTitle>Scoping a full-refresh to only the models that actually need it</SubTitle>

        <Para>
          The most common and avoidable mistake is running <code>dbt run --full-refresh</code> against an
          entire project, or an entire tag, when only one model's logic actually changed. Every other
          incremental model in that selection gets rebuilt completely from scratch for no reason at all —
          pure wasted compute.
        </Para>

        <CodeBox label="An expensive, unscoped full-refresh vs a precisely scoped one">
{`# Expensive: rebuilds EVERY incremental model in the finance tag
# from scratch, even the 40 models whose logic didn't change at all
dbt run --full-refresh --select tag:finance

# Correct: rebuilds only the one model whose incremental logic
# actually changed
dbt run --full-refresh --select fct_revenue`}
        </CodeBox>

        <SubTitle>Using warehouse-native cloning to avoid recomputation entirely, where available</SubTitle>

        <Para>
          On warehouses that support zero-copy cloning — Snowflake's <code>CLONE</code> being the most widely
          used — a full-refresh triggered purely to reset a table's state (rather than to genuinely
          recompute every row under changed logic) can sometimes be replaced with a much cheaper clone-based
          reset, though this is a manual, warehouse-level operation outside dbt's own full-refresh mechanism
          rather than a dbt config. It's worth knowing about as an option specifically for the "I need to
          reset this table to a known good state" case, distinct from "I need to recompute every row because
          the transformation logic changed," which genuinely does require a real rebuild.
        </Para>

        <SubTitle>Splitting a full-refresh into date-bounded chunks for very large tables</SubTitle>

        <Para>
          For a table too large to comfortably full-refresh in one shot — where a single rebuild risks a
          warehouse timeout, or simply an unacceptably long maintenance window — a manual, chunked rebuild
          processes the historical range in bounded slices, trading a longer total wall-clock time for a
          bounded, predictable cost and risk per chunk, rather than one enormous all-or-nothing operation.
        </Para>

        <CodeBox label="A manual, date-chunked rebuild pattern for a very large incremental model">
{`-- Rather than one dbt run --full-refresh spanning 3 years of history
-- in a single operation, some teams add a dbt variable-driven date
-- range and invoke the model repeatedly across bounded chunks:

{% if var('backfill_start_date', none) %}
  where order_date >= '{{ var("backfill_start_date") }}'
    and order_date <  '{{ var("backfill_end_date") }}'
{% endif %}

# Then run it in bounded slices, each a manageable, independently
# resumable unit of work instead of one multi-hour operation:
dbt run --select fct_revenue --vars '{"backfill_start_date": "2023-01-01", "backfill_end_date": "2023-04-01"}'
dbt run --select fct_revenue --vars '{"backfill_start_date": "2023-04-01", "backfill_end_date": "2023-07-01"}'
# ... continuing forward in bounded quarters`}
        </CodeBox>

        <Callout title="Full-refresh cost reduction is about avoiding unnecessary work, not making necessary work faster" color={K}>
          Every technique in this Part is fundamentally about scoping: rebuild only what actually needs
          rebuilding, in chunks sized to avoid timeouts and risk, rather than reflexively reaching for the
          broadest possible <code>--full-refresh</code> invocation and accepting whatever cost that happens
          to produce.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Splitting workloads across warehouse sizes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Splitting Workloads Across Warehouse Sizes" />
        <SectionTitle>snowflake_warehouse — Routing Heavy Models to a Bigger Compute Cluster, Cheap Models to a Smaller One</SectionTitle>

        <Para>
          Most warehouses let you provision compute at different sizes — Snowflake calls them "warehouses,"
          essentially independently-sized compute clusters that can be started, stopped, and billed
          separately. A common mistake is running an entire dbt project against one single warehouse size,
          sized for whatever the heaviest model needs — which means every cheap, thin staging model pays for
          compute capacity it never actually uses, and a genuinely heavy model may still be under-provisioned
          if the single warehouse size was a compromise across very different workloads.
        </Para>

        <Para>
          dbt's <code>snowflake_warehouse</code> config lets an individual model override which Snowflake
          warehouse it runs against, right in its own <code>config()</code> block — the same mechanism used
          for materialization or clustering, applied to compute sizing instead.
        </Para>

        <CodeBox label="models/marts/finance/fct_revenue.sql — routed to a larger warehouse for its heavy join">
{`{{
  config(
    materialized='incremental',
    unique_key='payment_id',
    incremental_strategy='merge',
    cluster_by=['revenue_date'],
    snowflake_warehouse='transform_large_wh'
  )
}}

select ...`}
        </CodeBox>

        <CodeBox label="models/staging/stripe/stg_stripe__payments.sql — left on a small, cheap warehouse">
{`{{
  config(
    materialized='view',
    snowflake_warehouse='transform_small_wh'
  )
}}

select ...`}
        </CodeBox>

        <Para>
          This lets a project's compute spend track its actual workload shape: a small handful of genuinely
          heavy mart-level joins and aggregations run against a larger, more expensive-per-second warehouse
          only while they're actually running, while the much larger number of thin staging and simple
          intermediate models run against a small, cheap warehouse that suits their actual resource needs —
          rather than every model in the project being billed at whatever size the heaviest model requires.
        </Para>

        <Table
          headers={['Approach', 'Cost characteristic', 'Risk']}
          rows={[
            ['One warehouse size for the entire project', 'Simple to reason about, but sized as a compromise — either overpaying for most models, or under-provisioning the heaviest ones.', 'The heaviest models may still time out or run slowly if the compromise size leans toward "cheap."'],
            ['snowflake_warehouse config splitting workloads by weight', 'Heavy models get appropriately sized compute only while running; cheap models never pay for unused capacity.', 'More warehouses to monitor and keep appropriately auto-suspended; a mis-tagged model routed to the wrong size wastes the benefit.'],
        ]}
        />

        <Para>
          A project-level default, set once in <code>dbt_project.yml</code> under the models block for a
          whole directory (mirroring the pattern from the earlier project-structure module), is the practical
          way to apply this at scale rather than configuring every model file individually — most marts route
          to a "large" warehouse by directory default, most staging models route to a "small" one, and only
          genuinely unusual individual models need an explicit per-model override on top of that default.
        </Para>

        <CodeBox label="dbt_project.yml — warehouse sizing as a directory-level default">
{`models:
  my_project:
    staging:
      +snowflake_warehouse: transform_small_wh
    intermediate:
      +snowflake_warehouse: transform_small_wh
    marts:
      +snowflake_warehouse: transform_large_wh`}
        </CodeBox>

        <Callout title="This is the same config-precedence rule from earlier modules, applied to compute sizing" color={K}>
          A model-level <code>config()</code> override for <code>snowflake_warehouse</code> beats the
          directory-level default in <code>dbt_project.yml</code>, exactly as with materialization. This means
          a single unusually heavy staging model can still be routed to the large warehouse as a deliberate
          exception, without changing the sensible default that applies to every other staging model in the
          project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Parallelism and threads ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Parallelism" />
        <SectionTitle>--threads: Running Independent Branches of the DAG Concurrently</SectionTitle>

        <Para>
          dbt does not build models one at a time by default. The <code>--threads</code> flag (or the
          <code>threads</code> setting in a profile) controls how many models dbt attempts to build
          concurrently, and it does so with full respect for the DAG's dependency order: a model never starts
          building until every model it depends on has finished. What <code>--threads</code> actually buys you
          is running independent branches of that DAG — parts of the graph with no dependency relationship to
          each other — at the same time, rather than needlessly serializing work that has no reason to wait.
        </Para>

        <CodeBox label="A DAG with genuine parallelism opportunity">
{`stg_stripe__payments  ─┐
                        ├──> int_payments_joined_to_orders ──> fct_revenue
stg_app__orders       ──┘

stg_marketing__campaigns ─┐
                           ├──> int_orders_attributed_to_campaigns ──> fct_campaign_roi
stg_app__orders (shared) ──┘

# The finance branch (payments/orders -> revenue) and the marketing
# branch (campaigns/orders -> campaign ROI) share stg_app__orders as
# a common input, but otherwise have NO dependency relationship to
# each other. With threads > 1, dbt can build both branches'
# independent portions concurrently once their shared input is ready.`}
        </CodeBox>

        <Para>
          With <code>--threads 1</code>, dbt builds strictly one model at a time, in a single valid
          topological order — correct, but leaving any real concurrency opportunity in the DAG completely
          unused. Raising <code>--threads</code> to 4 or 8 lets dbt build up to that many models
          simultaneously, provided the DAG has that many models simultaneously eligible to run (meaning all of
          their own upstream dependencies have already finished).
        </Para>

        <CodeBox label="Setting threads in profiles.yml, and overriding it per invocation">
{`# profiles.yml
my_project:
  target: prod
  outputs:
    prod:
      type: snowflake
      threads: 8
      ...

# Or override for one specific invocation:
dbt run --threads 16`}
        </CodeBox>

        <Table
          headers={['threads value', 'Effect', 'Risk of raising it too high']}
          rows={[
            ['1', 'Fully serial — one model builds at a time, in dependency order.', 'Leaves any real DAG concurrency completely unused; slowest possible wall-clock time for a wide DAG.'],
            ['A moderate value (4-8)', 'Independent DAG branches build concurrently; a common, safe starting point for most projects.', 'Minimal, as long as the warehouse\'s compute and concurrent-query limits comfortably support this many simultaneous statements.'],
            ['A high value (16+)', 'More of the DAG\'s available concurrency gets used at once, if the DAG is wide enough to benefit.', 'Can hit warehouse-side concurrent query limits, or contend for the same underlying compute resources hard enough that individual queries actually slow down rather than speed up.'],
          ]}
        />

        <Callout title="Threads help a wide DAG far more than a narrow one" color={K}>
          A DAG that is mostly one long, linear chain — stg → int → mart, one step at a time, few if any
          branches running in parallel with each other — gets little benefit from raising
          <code>--threads</code>, because there's rarely more than one or two models eligible to build at any
          given moment regardless of how many threads are available. A wide DAG, with many independent source
          integrations each feeding their own staging/intermediate chain before eventually converging on a
          shared mart, benefits from higher thread counts much more directly, because there is genuine,
          exploitable concurrency in its shape.
        </Callout>

        <Para>
          A practical way to find the right thread count for a given project and warehouse: start at a
          moderate value like 4, watch whether the warehouse's own concurrency limits or query queueing become
          a bottleneck as you raise it, and stop increasing once total wall-clock time for a full
          <code>dbt build</code> stops improving — the point past which more threads just means more queries
          contending for the same underlying compute rather than genuinely running faster in parallel.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — Case study ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — A Before-and-After Case Study" />
        <SectionTitle>fct_revenue: From 187 Seconds and a Full-Table Scan to 9 Seconds</SectionTitle>

        <Para>
          Returning to the exact model flagged in Part 01's console output —
          <code>fct_revenue</code> taking 187 seconds against a two-billion-row underlying payments history —
          here is the specific, staged sequence of dbt-level changes that were applied, and the measured
          improvement each one produced, using the warehouse query-history technique from Part 01 to confirm
          the gains rather than assuming they worked.
        </Para>

        <SubTitle>Starting point: the model as originally written</SubTitle>

        <CodeBox label="fct_revenue.sql — before any tuning">
{`{{ config(materialized='table') }}

select
    payment_id,
    order_id,
    customer_id,
    amount_cents,
    revenue_date
from {{ ref('int_payments_joined_to_orders') }}
where counts_as_revenue`}
        </CodeBox>

        <Para>
          Three separate problems were compounding here, matched directly against Parts 02, 03, and 04 of
          this module: the model was a full <code>table</code> rebuild on every single run rather than
          incremental, meaning all two billion historical rows were recomputed from
          <code>int_payments_joined_to_orders</code> every time, regardless of how few rows had actually
          changed; there was no clustering key at all, so even the full rebuild's underlying scan of the
          intermediate model gained nothing from Snowflake's micro-partition pruning; and the model ran
          against the same shared, moderately-sized warehouse as every other model in the project, competing
          for the same compute during the nightly run's busiest window.
        </Para>

        <SubTitle>Change 1 — incremental materialization</SubTitle>

        <CodeBox label="fct_revenue.sql — after adding incremental materialization">
{`{{
  config(
    materialized='incremental',
    unique_key='payment_id',
    incremental_strategy='merge'
  )
}}

select
    payment_id,
    order_id,
    customer_id,
    amount_cents,
    revenue_date
from {{ ref('int_payments_joined_to_orders') }}
where counts_as_revenue

{% if is_incremental() %}
  where revenue_date > (select max(revenue_date) from {{ this }})
{% endif %}`}
        </CodeBox>

        <Output>{`Before: 187.63s (full table rebuild, ~2B rows scanned every run)
After incremental + merge: 41.2s (only rows since last max(revenue_date) processed)`}</Output>

        <Para>
          This alone was the single largest gain, for the reason Part 02's math predicts directly: the model
          went from recomputing its entire two-billion-row history on every run to processing only the
          handful of days' worth of new payments since the last run.
        </Para>

        <SubTitle>Change 2 — cluster_by on revenue_date</SubTitle>

        <CodeBox label="fct_revenue.sql — adding cluster_by">
{`{{
  config(
    materialized='incremental',
    unique_key='payment_id',
    incremental_strategy='merge',
    cluster_by=['revenue_date']
  )
}}
...`}
        </CodeBox>

        <Output>{`Before: 41.2s (merge scanning more micro-partitions than the incoming batch's date range needed)
After cluster_by: 18.6s (merge's match condition prunes to only the recent micro-partitions)`}</Output>

        <Para>
          The merge's join condition already filtered effectively on the new-rows side after Change 1, but
          without clustering, Snowflake still had to consider a wider set of the existing table's
          micro-partitions than the incoming batch's narrow date range actually needed — clustering on the
          same column the incremental filter and the merge both revolve around let the warehouse prune far
          more of the existing table before the merge's join even ran, exactly the mechanism described in Part
          04.
        </Para>

        <SubTitle>Change 3 — routing to a dedicated, larger warehouse for this specific run window</SubTitle>

        <CodeBox label="fct_revenue.sql — final version, with snowflake_warehouse">
{`{{
  config(
    materialized='incremental',
    unique_key='payment_id',
    incremental_strategy='merge',
    cluster_by=['revenue_date'],
    snowflake_warehouse='transform_large_wh'
  )
}}
...`}
        </CodeBox>

        <Output>{`Before: 18.6s, contending with ~40 other concurrent models on the shared warehouse during the nightly run
After dedicated warehouse: 9.1s (no contention for compute during its build window)`}</Output>

        <Para>
          The final change didn't reduce the actual amount of work the query performed — it removed
          contention. On the shared warehouse, <code>fct_revenue</code>'s merge was queued behind, and
          competing for compute slots with, dozens of other concurrently running models during the busiest
          part of the nightly <code>dbt build</code>. Moving it to its own appropriately sized warehouse,
          per Part 06, meant it no longer had to share that compute with anything else during its own build
          window.
        </Para>

        <Table
          headers={['Stage', 'Change applied', 'Runtime', 'Cumulative improvement']}
          rows={[
            ['Baseline', 'Full table rebuild, no clustering, shared warehouse', '187.6s', '—'],
            ['Change 1', 'Incremental materialization + merge strategy (Part 03)', '41.2s', '4.6x faster'],
            ['Change 2', '+ cluster_by on revenue_date (Part 04)', '18.6s', '10.1x faster'],
            ['Change 3', '+ dedicated snowflake_warehouse (Part 06)', '9.1s', '20.6x faster'],
          ]}
        />

        <Callout title="Each change was measured independently before adding the next" color="#22c55e">
          The methodology matters as much as the specific fixes: each of the three changes was applied and
          measured on its own, using the same warehouse query-history technique from Part 01, before the next
          one was layered on top. This is what makes the final 20.6x figure trustworthy rather than a vague
          "we tuned it and it got faster" claim — each individual change's contribution is isolated and
          confirmed, which also means if a future regression appears, it's straightforward to check whether
          one of these three specific mechanisms (incrementality, clustering, or warehouse contention) is the
          one that broke.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Monitoring performance over time ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Monitoring Performance Over Time" />
        <SectionTitle>A One-Time Fix Is Not a Performance Strategy — Track Regressions Before They're Incidents</SectionTitle>

        <Para>
          Every technique in this module up to now addresses fixing a model that is already known to be slow
          or expensive. The harder, longer-term problem is noticing a model that is <em>becoming</em> slow or
          expensive before it becomes a fire — a table that grows a little every day, an incremental filter
          whose match rate creeps upward, a warehouse that gets a little more contended every quarter as more
          models get added to it. Part 08's case study measured a one-time before-and-after; a mature
          performance practice measures continuously.
        </Para>

        <Para>
          The same warehouse query-history technique from Part 01 generalizes directly into a recurring check
          rather than a one-off investigation: instead of running the query once to triage a known problem,
          schedule it to run regularly and compare each model's trend over time, flagging any model whose
          average runtime or cost has grown meaningfully since the last check.
        </Para>

        <CodeBox label="A recurring trend query, comparing this week to four weeks ago">
{`with this_week as (
    select
        regexp_substr(query_text, '"node_id": *"([^"]+)"', 1, 1, 'e') as dbt_node_id,
        avg(total_elapsed_time) as avg_ms_this_week
    from snowflake.account_usage.query_history
    where query_text ilike '%"app": "dbt"%'
      and start_time > dateadd('day', -7, current_timestamp())
    group by 1
),

four_weeks_ago as (
    select
        regexp_substr(query_text, '"node_id": *"([^"]+)"', 1, 1, 'e') as dbt_node_id,
        avg(total_elapsed_time) as avg_ms_baseline
    from snowflake.account_usage.query_history
    where query_text ilike '%"app": "dbt"%'
      and start_time between dateadd('day', -35, current_timestamp())
                          and dateadd('day', -28, current_timestamp())
    group by 1
)

select
    this_week.dbt_node_id,
    four_weeks_ago.avg_ms_baseline,
    this_week.avg_ms_this_week,
    this_week.avg_ms_this_week - four_weeks_ago.avg_ms_baseline as ms_regression
from this_week
join four_weeks_ago using (dbt_node_id)
where this_week.avg_ms_this_week > four_weeks_ago.avg_ms_baseline * 1.5
order by ms_regression desc`}
        </CodeBox>

        <Para>
          A model surfaced by this query — one that has genuinely gotten 50% or more slower over four weeks
          with no obvious code change — is exactly the kind of early warning that lets a team apply Part 03's
          strategy tuning or Part 04's clustering fix proactively, on their own schedule, rather than
          discovering the same regression reactively when a nightly build finally blows through its
          maintenance window or a warehouse bill spikes unexpectedly at month's end.
        </Para>

        <Table
          headers={['Monitoring approach', 'Catches', 'Misses']}
          rows={[
            ['One-off investigation after a complaint or a missed SLA', 'The specific model someone already noticed.', 'Every other model quietly regressing that nobody has complained about yet.'],
            ['Scheduled trend comparison over the query-tag history', 'Any model whose cost or runtime is drifting upward, before it becomes visibly disruptive.', 'A brand-new model with no baseline history yet to compare against.'],
          ]}
        />

        <Callout title="Tie regression alerts back to the specific fixes this module covers" color={K}>
          A model flagged as regressing by trend monitoring isn't a mystery to start diagnosing from scratch
          — it's a prompt to walk through this module's own checklist in order: has its incremental match
          rate grown (Part 03), does it need a clustering key it doesn't have, or does an existing one need
          revisiting as the table's shape has changed (Part 04), and is it now competing for warehouse compute
          with more concurrently-running models than it used to (Part 06)? Most real regressions trace back
          to one of these three causes drifting quietly rather than to something genuinely new.
        </Callout>

        <SubTitle>Wiring a regression check into CI, rather than running it manually</SubTitle>

        <Para>
          The trend query above is useful run by hand, but its real value compounds once it's automated —
          run on a schedule, with its output posted somewhere the team actually looks, rather than depending
          on someone remembering to run it. A lightweight version of this pattern many teams adopt is a
          scheduled job, entirely separate from the dbt project itself, that runs the trend query weekly and
          posts any newly-flagged regression to a shared channel before it has a chance to compound further.
        </Para>

        <CodeBox label="A simple scheduled regression check, conceptually">
{`# Runs weekly, independent of the actual dbt build schedule
# 1. Run the trend-comparison query from above against query history
# 2. For any model exceeding the regression threshold (e.g. 1.5x),
#    post its name, the baseline, and the current average to a
#    shared alerting channel
# 3. A human triages the alert against this module's checklist:
#    incremental match rate, clustering, warehouse contention

0 9 * * 1  run_weekly_dbt_perf_regression_check.sh`}
        </CodeBox>

        <Para>
          This closes the loop between Part 01's diagnostic technique and Part 08's fix pattern: instead of
          discovering a regression only when it's severe enough to blow through a maintenance window,
          catching it early at the 1.5x threshold — well before it reaches the 20x-worse state a genuinely
          neglected model can quietly drift into — keeps each individual fix small, cheap, and easy to apply
          with confidence.
        </Para>

        <Callout title="A regression check is only as good as its threshold" color={K}>
          A threshold set too low (flagging any 5% variance) drowns the team in false-positive noise from
          ordinary day-to-day warehouse variability, and a real signal gets lost among alerts nobody trusts
          anymore. A threshold set too high (only flagging 5x or worse) misses regressions early enough to fix
          cheaply. Something in the 1.3x-2x range, tuned against a specific project's actual run-to-run
          variance, is a reasonable starting point most teams converge on after a few weeks of watching what a
          "normal" week of variation actually looks like.
        </Callout>

        <Para>
          The last piece worth stating plainly: none of Part 09's monitoring replaces the diagnostic and
          tuning techniques covered in Parts 01 through 08 — it only changes when they get applied. A team
          without any regression monitoring still has access to every fix in this module, but only ever
          discovers the need for them reactively, after a model has already become slow enough to notice
          without instrumentation. A team with monitoring wired in applies the exact same fixes, just earlier
          and cheaper, which is the entire case for treating performance tuning as an ongoing practice rather
          than a one-time cleanup project.
        </Para>

        <Para>
          Tie this back to the broader project-structure discipline from the previous module in this track,
          too: a well-layered project makes performance regressions easier to localize in the first place. A
          regression flagged against a thin, single-purpose mart is trivial to reason about — there's exactly
          one join or aggregation it could be. A regression flagged against a sprawling, do-everything model
          that never got split into staging, intermediate, and marts requires untangling which of its many
          responsibilities actually got slower, turning a five-minute diagnosis into a much longer one. Good
          structure and good performance practice reinforce each other far more than either discipline alone
          would suggest.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Performance Tuning</SectionTitle>
        {[
          {
            wrong: '"A model\'s build time in dbt run output is the whole performance story"',
            right: 'Per Part 01, build time only measures how long dbt itself took to construct or refresh a model. A cheap-to-build view queried thousands of times a day by BI tools can be a far larger real cost than a slow-to-build table that\'s queried rarely — warehouse query history, filtered by dbt\'s automatic query tags, is what surfaces that second category of cost.',
          },
          {
            wrong: '"Once a model is materialized as a table, its performance is settled — there\'s nothing more to tune"',
            right: 'Part 04 and Part 08\'s case study both show real gains available on top of the base materialization choice: warehouse-native clustering configs like cluster_by can dramatically change how much data a query or merge actually has to scan, independent of whether the model is a table or incremental.',
          },
          {
            wrong: '"merge is always the fastest incremental strategy, since it\'s a single statement"',
            right: 'Per Part 03, merge\'s cost is driven by how efficiently the warehouse can match the incoming batch against the existing table — on an unclustered table with a very large existing history, that join can be slower than expected, and clustering the merge key (Part 04) is often what actually unlocks merge\'s theoretical speed advantage.',
          },
          {
            wrong: '"Running dbt run --full-refresh on the whole project after any single model\'s logic changes is the safe, thorough choice"',
            right: 'Per Part 05, this rebuilds every other unrelated incremental model in the selection from scratch for no reason, at real, avoidable warehouse cost. Scoping a full-refresh to only the specific model whose logic actually changed is both safer to reason about and dramatically cheaper.',
          },
          {
            wrong: '"Raising --threads as high as possible always makes a dbt run finish faster"',
            right: 'Per Part 07, threads only help where the DAG has genuine, exploitable concurrency — a mostly linear DAG gains little from more threads regardless of the number chosen. Past a certain point, more threads can even slow things down by causing queries to contend for the same underlying warehouse compute rather than truly running in parallel.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>Three Companies, Three Performance Wins</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Vimeo:</strong> a data engineer notices a viewer-engagement mart's warehouse credit
            usage climbing steadily month over month, even though the model's own logic hasn't changed. Per
            Part 01, they pull the last 30 days of query history filtered by dbt's automatic query tags and
            discover the model is materialized as a view that a real-time analytics dashboard refreshes every
            few minutes around the clock — the aggregate recomputation cost of thousands of daily view
            re-executions, not any single slow build, is what's actually driving the credit growth. Switching
            it to a table, per Part 02, flattens the cost curve immediately.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Webflow:</strong> a merge-strategy incremental model handling site-publish events
            starts taking noticeably longer every quarter as historical data accumulates, even though the
            daily batch size hasn't grown. Per Part 03 and Part 04, the team traces this to the underlying
            table having no clustering key at all — as the table grew, Snowflake had to consider a steadily
            widening slice of the table's micro-partitions to resolve each merge's match condition. Adding
            <code>cluster_by</code> on the event's timestamp column restores the merge's runtime to roughly
            constant, regardless of how much total history the table now holds.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Attentive:</strong> the nightly <code>dbt build</code> for a messaging-analytics
            project routinely finishes in just under its maintenance window, with little margin if any single
            model runs slightly long. Rather than raising <code>--threads</code> further, per Part 07's
            guidance that the DAG's actual shape sets the ceiling on how much parallelism helps, an engineer
            reviews the DAG's structure and finds nearly all of the project's compute concentrated in one long
            linear chain feeding a single, dominant fact table. Splitting that dominant model's underlying
            logic into two independent, non-dependent intermediate branches — since two of its business rules
            turn out to have no actual data dependency on each other — widens the DAG enough for existing
            thread parallelism to meaningfully engage, cutting real wall-clock time without adding any more
            threads at all.
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
            q: 'Q1. How would you find the most expensive models in a large dbt project, and what is the difference between the two main signals you\'d use?',
            a: `Per Part 01, I'd use two complementary signals. First, dbt run or dbt build's own console output, which reports per-model wall-clock build time for that specific invocation — a fast, free first-pass triage that immediately flags obvious outliers like a model taking minutes when everything else takes seconds. Second, and more importantly for prioritizing real tuning effort, the warehouse's own query history, filtered using the structured comment dbt automatically attaches to every query it issues, aggregated over weeks rather than a single run.

The distinction matters because these answer different questions: build time tells you how expensive it is to construct or refresh a model, but says nothing about downstream query cost. A cheap-to-build view queried constantly by a BI dashboard can be a far larger aggregate cost than a slow-to-build table queried rarely, per Part 02 — and only the query-history signal, not the console output, would ever surface that.`,
          },
          {
            q: 'Q2. Explain, with the actual cost math, why a view queried frequently downstream is often better as a table from a performance standpoint.',
            a: `Per Part 02, a view has zero build cost but re-executes its full defining query on every downstream read; a table has a real build cost paid once per dbt run, then serves every downstream query cheaply as a plain read. The total cost as a view scales roughly as N times the build cost, where N is the number of downstream queries between rebuilds — as a table, it's roughly one build cost plus N times a much cheaper read cost.

Whether a table wins depends on the actual read-to-write ratio: a model queried hundreds of times a day by a dashboard, with an expensive underlying join or aggregation, almost always comes out cheaper as a table, since the aggregate cost of hundreds of full recomputations as a view usually dwarfs one table rebuild per run. The flip side, which I'd also flag, is that over-materializing everything as a table defensively has its own cost — a table rebuilt every run but rarely queried is spending compute on every dbt run for a benefit it rarely collects.`,
          },
          {
            q: 'Q3. What is cluster_by on Snowflake, and how does it interact with an incremental model\'s merge strategy performance?',
            a: `Per Part 04, cluster_by is a physical clustering key configured directly in a model's config() block, telling Snowflake to co-locate rows on disk so that queries filtering or joining on the clustered column can skip scanning irrelevant micro-partitions entirely, rather than scanning the whole table before filtering.

This connects directly to incremental strategy performance from Part 03: a merge statement's cost is driven by how efficiently the warehouse can match the incoming batch against the existing table on the unique key or filter condition. Without clustering aligned to that same column, the merge's join may need to consider far more of the existing table's micro-partitions than the incoming batch's actual scope requires. Clustering on the same column the incremental filter and the merge both revolve around — which Part 08's case study shows concretely — lets the warehouse prune most of the table before the merge's join even runs, which is often what actually unlocks merge's theoretical speed advantage over other incremental strategies.`,
          },
          {
            q: 'Q4. Why would you route different models to different Snowflake warehouse sizes using the snowflake_warehouse config, instead of running the whole project on one warehouse?',
            a: `Per Part 06, running an entire project against one warehouse size forces a compromise: sizing for the heaviest model overpays for every thin staging model that never needs that much compute, while sizing for the average workload risks under-provisioning the genuinely heavy mart-level joins and aggregations. The snowflake_warehouse config, set in a model's own config() block or as a directory-level default in dbt_project.yml, lets compute spend track actual workload shape — heavy models route to a larger, more expensive-per-second warehouse only while they're running, and the much larger number of cheap models run against a small warehouse sized for their actual needs.

Part 08's case study shows a second, related benefit beyond raw sizing: routing a critical model to its own dedicated warehouse also removes contention with everything else running concurrently during a shared nightly build window, which was actually the single change that mattered most in that specific case, on top of the sizing benefit itself.`,
          },
          {
            q: 'Q5. Does raising dbt\'s --threads setting always make a full dbt build finish faster? What determines whether it helps?',
            a: `No, and the reason comes down to the actual shape of the project's DAG, per Part 07. --threads controls how many models dbt attempts to build concurrently, always respecting dependency order — a model never starts until everything it depends on has finished. The performance benefit comes specifically from running independent branches of the DAG, ones with no dependency relationship to each other, at the same time.

A DAG that is mostly one long linear chain has little exploitable concurrency regardless of thread count, since there's rarely more than one or two models eligible to build simultaneously at any point. A wide DAG, with many independent source-to-mart chains that only converge later, benefits much more directly from a higher thread count, because there's genuine concurrent work available. Past a certain point, raising threads further can also backfire by causing queries to contend for the same underlying warehouse compute, actually slowing individual queries down rather than speeding up the overall build — which is why the right approach is to raise threads incrementally and watch total wall-clock time, stopping once it stops improving, rather than assuming higher is unconditionally better.`,
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
        <SectionTitle>The Performance Mistakes That Cost the Most Later</SectionTitle>
        {[
          {
            q: 'Judging a model\'s cost purely by its build time in dbt run output',
            a: 'Per Part 01, build time says nothing about downstream query cost. A cheap-to-build view hit constantly by BI tools can dwarf the cost of a slow-to-build, rarely-queried table — the warehouse\'s own query history, not console output, is what surfaces that.',
          },
          {
            q: 'Materializing every model as a table defensively, without checking its actual read frequency',
            a: 'Per Part 02, a table rebuilt every run but rarely queried spends real compute on every dbt run for a benefit that\'s rarely collected. Materialization should track the actual read-to-write ratio, not a blanket policy in either direction.',
          },
          {
            q: 'Adding clustering configs like cluster_by based on how a model is built rather than how it\'s actually queried',
            a: 'Per Part 04, the right clustering key is whichever column downstream queries and the model\'s own incremental filter most commonly use — picking an arbitrary or convenient column instead of the actually-queried one wastes the clustering investment entirely.',
          },
          {
            q: 'Running a broad, unscoped --full-refresh across an entire tag or the whole project when only one model\'s logic changed',
            a: 'Per Part 05, this rebuilds every other unrelated incremental model in that selection completely from scratch, at real and entirely avoidable warehouse cost. Scope a full-refresh to exactly the model whose logic actually changed.',
          },
          {
            q: 'Assuming more --threads always means a faster dbt build, without considering the DAG\'s actual shape',
            a: 'Per Part 07, threads only help where the DAG has genuine, independent concurrency to exploit. A mostly linear DAG gains little regardless of thread count, and pushing threads too high can cause queries to contend for the same warehouse compute, slowing things down rather than speeding them up.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Performance Problems You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: 'A model\'s dbt run time has crept up steadily over several months with no code changes at all',
            cause: 'The model is likely materialized as a full table rebuild or a poorly-configured incremental model, and its underlying historical data volume has simply grown — per Part 03 and Part 08, cost that scales with total history rather than with how much data actually changed each run is exactly the pattern incremental materialization and clustering exist to fix.',
            fix: 'Confirm the model is genuinely incremental with a correctly scoped is_incremental() filter, and check whether a clustering config on the merge/filter column (Part 04) would let the warehouse prune more of the existing table before the incremental logic runs.',
          },
          {
            error: 'Warehouse credit usage keeps climbing even though nightly dbt build times look flat in the run logs',
            cause: 'Per Part 01 and Part 02, the growth is very likely coming from downstream query volume against a view-materialized model, not from anything dbt itself is measuring in its own run output — a view\'s recomputation cost is paid by whoever queries it, not by the dbt run that built it.',
            fix: 'Pull warehouse query history filtered by dbt\'s automatic query tags AND check for direct queries against the same object from BI tools or ad hoc analyst access; a high-frequency view is the classic culprit and switching it to a table is usually the fix.',
          },
          {
            error: 'A dbt run --full-refresh on a large incremental model runs for hours and eventually times out against the warehouse',
            cause: 'The model is being fully rebuilt in one enormous operation against its entire historical volume, per Part 05 — a single full-refresh spanning years of history with no chunking has no natural checkpoint if it runs into a warehouse-side statement timeout.',
            fix: 'Split the full-refresh into bounded, date-scoped chunks using a dbt variable-driven filter (Part 05\'s pattern), processing history in manageable, independently resumable slices rather than one all-or-nothing operation.',
          },
          {
            error: 'Raising --threads from 4 to 16 made a dbt build finish slower, not faster',
            cause: 'Per Part 07, the DAG likely does not have enough independent, concurrently-eligible models to actually use 16 simultaneous threads, and the extra concurrent queries are instead contending for the same underlying warehouse compute slots, causing individual queries to slow down rather than genuinely running in parallel.',
            fix: 'Reduce --threads back toward the value where total wall-clock time was still improving, and separately consider whether the DAG\'s shape (per Part 07\'s guidance) could be widened by splitting an overly linear chain into genuinely independent branches, which would make higher thread counts actually useful.',
          },
          {
            error: 'A model routed to a smaller snowflake_warehouse via config is now the slowest model in the entire nightly run',
            cause: 'The model was mis-classified as lightweight when its underlying join or aggregation is actually heavy — per Part 06, sizing decisions need to track a model\'s actual resource needs, and a heavy model routed to an undersized warehouse will simply run slowly there instead of failing outright.',
            fix: 'Check the model\'s query profile against the warehouse\'s available compute and, if it\'s genuinely heavy, override its snowflake_warehouse config to point at the larger warehouse, or reconsider whether its logic belongs in a lighter, separately-materialized intermediate step instead.',
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
          'Performance tuning is an ongoing practice, not a one-time cleanup — scheduled trend monitoring against warehouse query history catches a model quietly regressing weeks before it becomes disruptive enough to notice on its own.',
          'Find slow or expensive models using two signals together: dbt run console output for per-invocation build time, and warehouse query history filtered by dbt\'s automatic query tags for aggregate cost across many runs, including downstream query cost console output never shows.',
          'A view queried constantly by BI tools can cost far more in aggregate than a single table rebuild — materialize based on the actual read-to-write ratio a model experiences, not a blanket policy in either direction.',
          'Incremental strategy is a performance decision, not just a correctness one — merge\'s speed depends heavily on whether the underlying table is clustered on the same column the merge condition matches against.',
          'Warehouse-native performance configs like Snowflake\'s cluster_by, BigQuery\'s partition_by, or Redshift\'s sortkey pass straight through dbt\'s config() block, letting a single model file control both its dbt behavior and its physical storage layout.',
          'Scope a full-refresh to only the model whose logic actually changed, and chunk very large historical rebuilds into bounded, date-scoped slices rather than one all-or-nothing operation.',
          'snowflake_warehouse lets heavy models run on appropriately large compute while cheap models stay on a small warehouse, and --threads only helps a DAG with genuine, independent concurrency to exploit — a case study combining incremental materialization, clustering, and dedicated compute took one model from 187.6s to 9.1s, a 20.6x improvement, each change measured independently.',
        ]}
      />
    </LearnLayout>
  )
}
