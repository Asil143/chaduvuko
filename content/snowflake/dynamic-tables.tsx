import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function DynamicTables() {
  return (
    <LearnLayout
      title="Dynamic Tables"
      description="Declarative incremental pipelines, TARGET_LAG semantics, incremental vs full refresh, dynamic table DAGs, and how dynamic tables compare to streams/tasks and materialized views."
      section="Snowflake — Module 12"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Dynamic Tables', href: '/learn/snowflake/dynamic-tables' },
      ]}
      prev={{ title: 'Streams and Tasks', href: '/learn/snowflake/streams-and-tasks' }}
      next={{ title: 'Performance Tuning', href: '/learn/snowflake/performance-tuning' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>You Declare the Result, Snowflake Figures Out the Refresh</SectionTitle>
        <Para>
          Every pipeline you have built so far with streams and tasks required you to write two things: the
          query that describes the target shape of the data, and the imperative logic that keeps it up to
          date — the stream to capture changes, the MERGE to apply them, the task to schedule the whole thing.
          A dynamic table collapses those two things into one. You write a single SELECT statement that
          describes what the table should contain, attach a freshness target, and Snowflake works out how to
          keep the table matching that SELECT over time.
        </Para>
        <Para>
          This is a genuine shift in how you think about pipeline code. With streams and tasks, you are the
          one deciding how the table changes: what gets inserted, what gets updated, how deletes propagate.
          With a dynamic table, you only describe what the table should look like right now, as if you were
          querying the source fresh every time. Snowflake's dynamic table engine compares the declared query
          plan against the current state of the target and computes the minimal set of changes needed —
          without you writing a MERGE statement at all.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> a dynamic table is a table whose contents are defined
            by a SELECT statement and kept up to date automatically by Snowflake, refreshed often enough to
            satisfy a freshness target you set called TARGET_LAG. You write the query; Snowflake writes the
            refresh plan.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`Streams + tasks (imperative)        Dynamic tables (declarative)
------------------------------      ------------------------------
you write: stream definition        you write: one SELECT
you write: MERGE logic              you write: TARGET_LAG
you write: task schedule            Snowflake writes: refresh plan
you own: dedup, delete handling     Snowflake owns: incremental diffing
you debug: MERGE bugs               you debug: query correctness only`}
        </CodeBox>
        <Para>
          Dynamic tables were built for the common case: a chain of transformations from raw data through
          cleaning and shaping to business-ready aggregates, where the logic at each stage is expressible as
          a plain SELECT. They are not a replacement for every pipeline — arbitrary procedural logic, complex
          conditional branching, and some non-deterministic operations still belong in stored procedures,
          tasks, or streams.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Basic syntax" />
        <SectionTitle>CREATE DYNAMIC TABLE Looks Like a View With a Refresh Contract</SectionTitle>
        <Para>
          The syntax is close to CREATE TABLE AS SELECT, with two extra required clauses: TARGET_LAG, which
          states the freshness promise, and WAREHOUSE, which states what compute performs the refresh. Beyond
          that, the body is ordinary SQL — joins, filters, casts, aggregations, window functions.
        </Para>
        <CodeBox label="A first dynamic table">{`CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT
  order_id,
  customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2)         AS total_usd,
  UPPER(status)                   AS status
FROM RAW.ORDERS
WHERE order_id IS NOT NULL;`}
        </CodeBox>
        <Para>
          There is no separate stream object, no separate task object, and no MERGE statement anywhere in
          this definition. Snowflake reads the SELECT, determines the underlying tables it depends on
          (RAW.ORDERS here), and automatically attaches the change-tracking machinery it needs behind the
          scenes — you never see or manage that machinery directly.
        </Para>
        <Table
          headers={['Clause', 'Meaning', 'Notes']}
          rows={[
            ['TARGET_LAG', 'Maximum acceptable staleness of the table relative to its sources.', 'Expressed as a duration, or DOWNSTREAM for chained tables.'],
            ['WAREHOUSE', 'Compute used to perform refreshes.', 'Sized independently from query-serving warehouses.'],
            ['AS SELECT ...', 'The declarative definition of the table contents.', 'Must be a query Snowflake can plan a refresh for.'],
            ['REFRESH_MODE (optional)', 'Force AUTO, INCREMENTAL, or FULL.', 'Useful to pin behavior explicitly rather than let Snowflake choose.'],
          ]}
        />
        <Callout title="A dynamic table is a real table">
          Once created, a dynamic table can be queried exactly like any other table — joined, filtered,
          granted access to. The declarative definition only controls how its contents are maintained, not
          how it behaves when you read from it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — TARGET_LAG semantics" />
        <SectionTitle>TARGET_LAG Is a Freshness Promise, Not a Schedule</SectionTitle>
        <Para>
          This is the detail people get wrong most often. TARGET_LAG = '10 minutes' does not mean "refresh
          every 10 minutes" the way a task's SCHEDULE clause does. It means "the data in this table should
          never be more than 10 minutes behind its source." Snowflake decides how often to actually run a
          refresh to keep that promise — it might refresh more often than every 10 minutes if the source
          changes rapidly and cheaply, and it schedules the work so lag rarely exceeds the target.
        </Para>
        <CodeBox label="TARGET_LAG examples">{`-- An absolute freshness target: this table should never be more than
-- 10 minutes stale relative to RAW.ORDERS.
CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS SELECT ... FROM RAW.ORDERS;

-- A chained table: let its freshness be driven by whatever the
-- downstream consumer of THIS table needs, not a fixed number here.
CREATE OR REPLACE DYNAMIC TABLE GOLD.DAILY_REVENUE_DT
  TARGET_LAG = DOWNSTREAM
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
FROM SILVER.ORDERS_DT
GROUP BY 1;`}
        </CodeBox>
        <Para>
          The tighter the target lag, the more often Snowflake must check for changes and run refreshes,
          which means more warehouse time and more credits spent. A dashboard that only needs hourly numbers
          does not need a 1-minute TARGET_LAG; setting one anyway is pure waste, exactly the same mistake as
          scheduling a task to run every minute when the business only checks the dashboard once an hour.
        </Para>
        <Table
          headers={['Target lag choice', 'Effect', 'When it fits']}
          rows={[
            ['Very tight (1-5 minutes)', 'Frequent refresh checks, higher compute cost.', 'Near-real-time operational tables few teams truly need.'],
            ['Moderate (10-60 minutes)', 'Balances freshness and cost for most analytics.', 'Standard Silver/Gold transformation layers.'],
            ['Loose (several hours / 1 day)', 'Minimal refresh overhead.', 'Reporting tables refreshed with daily cadence.'],
            ['DOWNSTREAM', 'Freshness driven by dependents, not a fixed number.', 'Intermediate tables inside a longer dynamic table chain.'],
          ]}
        />
        <Callout title="Tighter lag is a cost decision, not just a technical one" color="#ef4444">
          Before setting an aggressive TARGET_LAG, ask what business decision actually needs that freshness.
          "As fresh as possible" is not a requirement — it is a default that somebody has to pay for every
          time the refresh engine wakes up.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Incremental vs full refresh" />
        <SectionTitle>Snowflake Prefers Incremental Refresh, But Not Every Query Supports It</SectionTitle>
        <Para>
          When Snowflake can determine exactly which rows in the target need to change based on what changed
          in the source, it performs an incremental refresh — conceptually similar to the MERGE you would
          have hand-written for a stream/task pipeline, except Snowflake derives the merge logic itself from
          your SELECT. When it cannot compute that diff safely, it falls back to a full refresh: recomputing
          the entire result from scratch and replacing the table contents.
        </Para>
        <Para>
          Incremental refresh is not guaranteed for every query shape. Certain constructs prevent Snowflake
          from reasoning about which output rows a given input change affects — some non-deterministic
          functions, certain complex multi-table joins, and some aggregation or windowing patterns that don't
          have an efficient incremental formulation. In those cases the dynamic table silently (unless you
          check) runs in full-refresh mode, which still keeps the table correct but can be far more expensive
          than an equivalent hand-written incremental MERGE for large tables.
        </Para>
        <CodeBox label="Check the refresh mode Snowflake chose">{`SHOW DYNAMIC TABLES LIKE 'ORDERS_DT' IN SCHEMA SILVER;

-- The result includes a refresh_mode-related column indicating whether
-- the table is refreshing incrementally or fully. You can also inspect
-- refresh behavior over time:
SELECT
  name,
  state,
  refresh_action,
  data_timestamp,
  statistics
FROM TABLE(INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY(
  NAME => 'SILVER.ORDERS_DT'
))
ORDER BY data_timestamp DESC
LIMIT 20;`}
        </CodeBox>
        <Table
          headers={['Refresh mode', 'What happens', 'Cost profile']}
          rows={[
            ['Incremental', 'Only rows affected by source changes are recomputed and merged.', 'Scales with the size of the change, not the whole table.'],
            ['Full', 'The entire result is recomputed and the table contents replaced.', 'Scales with the size of the whole table on every refresh.'],
            ['AUTO (default)', 'Snowflake chooses per refresh based on what it can plan.', 'Can quietly become expensive if the query loses incremental eligibility.'],
          ]}
        />
        <Callout title="Pin REFRESH_MODE for predictable behavior">
          If a table absolutely must refresh incrementally for cost reasons, set REFRESH_MODE = INCREMENTAL
          explicitly rather than trusting AUTO. Snowflake will raise an error at creation time if the query
          cannot support incremental refresh at all, which surfaces the problem immediately instead of after
          a silent, expensive full refresh in production.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Why refresh falls back to full" />
        <SectionTitle>Some Query Shapes Break Incremental Diffing</SectionTitle>
        <Para>
          It helps to have intuition for why a query loses incremental eligibility. Incremental refresh works
          when Snowflake can trace a changed input row forward to a bounded, identifiable set of output rows.
          Anything that breaks that traceability forces a full recompute.
        </Para>
        <BulletList
          items={[
            'Non-deterministic functions such as CURRENT_TIMESTAMP() or RANDOM() in the SELECT — the "same" input row produces a different output every time, so there is no stable diff to compute.',
            'Certain outer joins and many-to-many joins where a single changed row on one side can affect an unbounded or hard-to-isolate set of rows on the other side.',
            'Some window functions and ordered aggregations where a single new row shifts the computed value for many other rows (e.g. running totals, dense rank across the whole partition).',
            'UNION-style combinations and some subquery patterns the optimizer cannot decompose into independently refreshable pieces.',
          ]}
        />
        <CodeBox label="A query shape more likely to force full refresh">{`-- A running total recomputes downstream rows every time a new row lands,
-- which is hard to express as a bounded incremental diff.
CREATE OR REPLACE DYNAMIC TABLE GOLD.CUSTOMER_RUNNING_TOTAL_DT
  TARGET_LAG = '30 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT
  customer_id,
  order_ts,
  SUM(total_usd) OVER (
    PARTITION BY customer_id ORDER BY order_ts
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total_usd
FROM SILVER.ORDERS_DT;`}
        </CodeBox>
        <Para>
          None of this means the query is invalid — the dynamic table will still be created and will still
          be correct. It just means you should check the refresh history for that specific table before
          assuming it is cheap, especially once the underlying table grows past a size where a full rebuild
          every refresh cycle becomes noticeable in your bill.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Chaining dynamic tables" />
        <SectionTitle>Dynamic Tables Can Depend on Other Dynamic Tables</SectionTitle>
        <Para>
          Just as task graphs chain SQL steps, dynamic tables can be layered so one dynamic table's SELECT
          reads from another dynamic table. Snowflake automatically understands this dependency and refreshes
          the DAG in the correct order — you never write an AFTER clause. This gives you something close to a
          dbt-style model DAG, but built into the warehouse engine rather than an external orchestrator.
        </Para>
        <CodeBox label="A two-hop dynamic table chain">{`-- Hop 1: raw to cleaned
CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT
  order_id,
  customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2)         AS total_usd,
  UPPER(status)                   AS status
FROM RAW.ORDERS
WHERE order_id IS NOT NULL;

-- Hop 2: cleaned to aggregated, freshness driven by hop 1
CREATE OR REPLACE DYNAMIC TABLE GOLD.DAILY_REVENUE_DT
  TARGET_LAG = DOWNSTREAM
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT
  DATE(order_ts)      AS order_date,
  COUNT(*)             AS order_count,
  SUM(total_usd)        AS revenue_usd
FROM SILVER.ORDERS_DT
WHERE status <> 'CANCELLED'
GROUP BY 1;`}
        </CodeBox>
        <Para>
          Setting TARGET_LAG = DOWNSTREAM on the upstream table in a chain is a common pattern: it tells
          Snowflake "refresh this table only as often as needed to satisfy whatever consumes it," rather than
          forcing an independent, possibly tighter freshness target on an intermediate table nobody queries
          directly. The final table in the chain — the one people actually query — is where you set a real,
          business-driven TARGET_LAG.
        </Para>
        <Callout title="A DAG, engine-native">
          The advantage over a dbt model DAG or a hand-built task graph is that there is no external
          scheduler and no separate orchestration state to keep in sync with the warehouse. The disadvantage
          is that the DAG only lives inside Snowflake — if your broader stack is dbt-orchestrated across
          multiple systems, a dynamic table chain is an island unless dbt (or another tool) is also aware of
          it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Dynamic tables vs streams+tasks vs materialized views" />
        <SectionTitle>Snowflake Has Three Overlapping Incremental Mechanisms — Know Which One to Reach For</SectionTitle>
        <Para>
          It is easy to come away thinking dynamic tables replace streams and tasks entirely, or that
          materialized views do the same job. They solve overlapping but distinct problems, and picking the
          wrong one for a given case either under-delivers or wastes money.
        </Para>
        <Table
          headers={['Mechanism', 'You write', 'Best for', 'Limitation']}
          rows={[
            ['Streams + tasks', 'Change tracking query + explicit MERGE + schedule.', 'Complex incremental logic: custom dedup rules, conditional branching, multi-step procedures, arbitrary control flow.', 'Most code to write and maintain; you own correctness of the MERGE.'],
            ['Dynamic tables', 'One SELECT + TARGET_LAG.', 'Chains of transformation SELECTs — raw to cleaned to aggregated — expressible as plain SQL.', 'Only as flexible as what Snowflake can incrementally plan; some queries force full refresh; no procedural logic.'],
            ['Materialized views', 'One SELECT over a single table, no target lag to set.', 'A single, simple, always-fresh precomputed view over one base table — typically for query acceleration, not multi-stage pipelines.', 'Narrower than dynamic tables: fewer supported query shapes, no chaining into a DAG, refresh is automatic and not tunable the same way.'],
          ]}
        />
        <Para>
          A rough decision rule: if the transformation is genuinely a SELECT — filter, join, aggregate,
          reshape — and you can tolerate Snowflake choosing full refresh in edge cases, reach for a dynamic
          table first. If the logic needs branching, external calls, complex multi-step procedures, or very
          fine control over exactly what "update" means for a row, streams and tasks are still the right
          tool. If you just want a single precomputed, always-current view over one table purely to speed up
          repeated reads, a materialized view is the lightest-weight option.
        </Para>
        <Callout title="They are not mutually exclusive">
          Real pipelines mix all three: streams/tasks might own a complex initial ingestion step with
          business-rule branching, feed a chain of dynamic tables for the bulk of the transformation logic,
          and a materialized view might sit on top of one hot table for BI acceleration.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Suspending and resuming" />
        <SectionTitle>Dynamic Tables Can Be Suspended Like Tasks</SectionTitle>
        <Para>
          A dynamic table refreshes automatically once created — there is no separate RESUME step required
          the way a brand-new task starts suspended. But you can suspend refresh explicitly, which is useful
          while debugging a definition, during a source table migration, or to stop spend on a table nobody
          is actively using.
        </Para>
        <CodeBox label="Suspend, resume, and manually refresh">{`ALTER DYNAMIC TABLE SILVER.ORDERS_DT SUSPEND;

-- Make and verify a definition change while refresh is paused
CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT order_id, customer_id, order_ts, total_usd, status
FROM RAW.ORDERS
WHERE order_id IS NOT NULL
  AND total_usd IS NOT NULL;   -- new filter added

ALTER DYNAMIC TABLE SILVER.ORDERS_DT RESUME;

-- Force an immediate refresh outside the normal cadence
ALTER DYNAMIC TABLE SILVER.ORDERS_DT REFRESH;`}
        </CodeBox>
        <Callout title="A suspended upstream table stalls the whole downstream chain" color="#ef4444">
          If an upstream dynamic table in a chain is suspended, every downstream table that depends on it
          (directly or via DOWNSTREAM lag) stops receiving fresh data too, even though those downstream
          tables show as active. Always check the full chain, not just the table you touched, when
          diagnosing unexpected staleness.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Monitoring refresh history" />
        <SectionTitle>Treat Refresh History as Mandatory, Not Optional</SectionTitle>
        <Para>
          Because there is no visible task or stream object to check the way there is in a streams/tasks
          pipeline, it is tempting to assume a dynamic table "just works" once created. It does not remove
          the need for monitoring — it relocates that monitoring into dynamic-table-specific views.
        </Para>
        <CodeBox label="Core monitoring queries">{`-- Is the table refreshing, and how far behind is it?
SELECT
  name,
  target_lag_sec,
  scheduling_state,
  latest_data_timestamp,
  DATEDIFF('second', latest_data_timestamp, CURRENT_TIMESTAMP()) AS lag_seconds
FROM TABLE(INFORMATION_SCHEMA.DYNAMIC_TABLES())
WHERE name = 'ORDERS_DT';

-- What has each recent refresh actually cost and looked like?
SELECT
  name,
  refresh_action,
  refresh_trigger,
  state,
  DATEDIFF('second', refresh_start_time, refresh_end_time) AS duration_sec,
  data_timestamp
FROM TABLE(INFORMATION_SCHEMA.DYNAMIC_TABLE_REFRESH_HISTORY(
  NAME => 'SILVER.ORDERS_DT'
))
ORDER BY data_timestamp DESC
LIMIT 50;`}
        </CodeBox>
        <Table
          headers={['Signal', 'Healthy', 'Unhealthy']}
          rows={[
            ['scheduling_state', 'ACTIVE.', 'SUSPENDED unexpectedly.'],
            ['lag_seconds', 'Within or close to TARGET_LAG.', 'Persistently exceeding TARGET_LAG.'],
            ['refresh_action', 'INCREMENTAL for tables meant to be cheap.', 'Unexpected FULL on a large table.'],
            ['duration_sec', 'Stable across refreshes.', 'Growing steadily — a sign the source or table is outgrowing its warehouse.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Cost behavior" />
        <SectionTitle>Dynamic Tables Do Not Remove Compute Cost, They Relocate It</SectionTitle>
        <Para>
          A dynamic table still runs on a warehouse and still consumes credits every time it refreshes. The
          orchestration code disappearing can create a false impression that the pipeline got cheaper. What
          actually happened is that the cost moved from "credits spent running a task's MERGE" to "credits
          spent running Snowflake's own refresh plan" — and if that plan quietly fell back to full refresh
          mode, the cost may have gone up, not down.
        </Para>
        <CodeBox label="Attribute cost to a dynamic table's warehouse">{`SELECT
  warehouse_name,
  COUNT(*)                                AS refresh_count,
  SUM(total_elapsed_time) / 1000          AS total_seconds
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE warehouse_name = 'WH_TRANSFORM_M'
  AND start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
  AND query_text ILIKE '%ORDERS_DT%'
GROUP BY warehouse_name
ORDER BY total_seconds DESC;`}
        </CodeBox>
        <BulletList
          items={[
            'Set TARGET_LAG based on what the business actually needs, the same discipline as task scheduling.',
            'Use DOWNSTREAM on intermediate tables in a chain instead of independently tight lag on each hop.',
            'Check refresh_action regularly — a table that silently switched to FULL refresh can be the single biggest line item in a transform warehouse\'s bill.',
            'Dedicate a warehouse (or warehouse size) to dynamic table refreshes so they do not contend with interactive BI queries.',
            'Suspend dynamic tables nobody queries instead of letting them refresh forever on a stale target lag.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Limitations to know before you commit" />
        <SectionTitle>Dynamic Tables Are Not a Universal Pipeline Tool</SectionTitle>
        <Para>
          Because the syntax is simple, teams sometimes try to force every transformation into a dynamic
          table, including ones that fit poorly. Knowing the boundaries up front avoids a rebuild later.
        </Para>
        <Table
          headers={['Limitation', 'Practical effect']}
          rows={[
            ['No arbitrary procedural logic.', 'Anything needing branching, loops, or external calls stays in a stored procedure and task.'],
            ['Refresh mode is not always controllable to incremental.', 'Some correct, well-written SELECTs simply cannot support incremental diffing.'],
            ['Dependencies must stay within objects Snowflake can trace.', 'External tables, some semi-structured patterns, and certain functions may restrict eligibility.'],
            ['A DAG-wide staleness issue can be hard to spot from a single table view.', 'You must check the whole chain, not just the table you are debugging.'],
          ]}
        />
        <Callout title="When a plain batch table is still the right answer">
          For a table refreshed once a day by an overnight job with no freshness pressure, a dynamic table
          with TARGET_LAG = '1 day' works, but a plain scheduled CREATE OR REPLACE TABLE AS SELECT in a task
          is just as correct and easier for a newcomer to reason about. Do not reach for dynamic tables out
          of habit when a simpler mechanism does the same job with less machinery to monitor.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Migrating from streams+tasks" />
        <SectionTitle>Converting an Existing Stream/Task Pipeline</SectionTitle>
        <Para>
          A common real-world task is evaluating whether an existing streams-and-tasks MERGE pipeline should
          become a dynamic table. The conversion is straightforward when the MERGE logic is a plain upsert
          with no special branching — which is exactly the case in most Silver-layer cleaning steps.
        </Para>
        <CodeBox label="Before: stream + task + MERGE">{`CREATE OR REPLACE STREAM RAW_ORDERS_STREAM ON TABLE RAW.ORDERS;

CREATE OR REPLACE TASK MERGE_ORDERS_TASK
  WAREHOUSE = WH_TRANSFORM_M
  SCHEDULE = '10 MINUTE'
AS
MERGE INTO SILVER.ORDERS tgt
USING RAW_ORDERS_STREAM src
  ON tgt.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET
  customer_id = src.customer_id, status = src.status, total_usd = src.total_usd
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, total_usd)
VALUES (src.order_id, src.customer_id, src.status, src.total_usd);

ALTER TASK MERGE_ORDERS_TASK RESUME;`}
        </CodeBox>
        <CodeBox label="After: one dynamic table">{`CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT order_id, customer_id, status, total_usd
FROM RAW.ORDERS;`}
        </CodeBox>
        <Para>
          Notice what disappeared: the stream object, the dedup/QUALIFY logic, the MATCHED/NOT MATCHED
          branches, and the task's schedule and resume step. What you must verify before shipping this
          conversion is that the dynamic table's chosen refresh mode is INCREMENTAL (not a silent full
          refresh) and that downstream consumers tolerate the DOWNSTREAM/target-lag semantics instead of a
          fixed schedule.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Access control and grants" />
        <SectionTitle>Dynamic Tables Follow Ordinary Grant Semantics</SectionTitle>
        <Para>
          A dynamic table is a first-class schema object, not a special construct that bypasses Snowflake's
          role-based access control. You grant SELECT on it exactly like any table, and the role that owns
          the dynamic table needs its own USAGE and SELECT grants on the underlying source objects and
          USAGE on the warehouse it refreshes with — the refresh runs as the dynamic table's owning role, not
          as whichever role happens to query it later.
        </Para>
        <CodeBox label="Granting access around a dynamic table">{`-- The role that owns/creates the dynamic table needs read access
-- to its sources and usage on its refresh warehouse.
GRANT USAGE ON DATABASE RAW_DB TO ROLE TRANSFORM_ROLE;
GRANT USAGE ON SCHEMA RAW_DB.RAW TO ROLE TRANSFORM_ROLE;
GRANT SELECT ON TABLE RAW_DB.RAW.ORDERS TO ROLE TRANSFORM_ROLE;
GRANT USAGE ON WAREHOUSE WH_TRANSFORM_M TO ROLE TRANSFORM_ROLE;

CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT order_id, customer_id, status, total_usd
FROM RAW_DB.RAW.ORDERS;

-- Consumers only need SELECT on the dynamic table itself, not on
-- any of its upstream sources.
GRANT SELECT ON TABLE SILVER.ORDERS_DT TO ROLE ANALYST_ROLE;`}
        </CodeBox>
        <Callout title="A revoked source grant breaks refresh, not just future reads">
          If the owning role's access to an upstream source table is revoked, the dynamic table's refresh
          starts failing even though nobody changed the dynamic table's own definition or grants. This is a
          common cause of a dynamic table quietly going stale after an unrelated access-control cleanup.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Testing and CI for dynamic table definitions" />
        <SectionTitle>Treat a Dynamic Table's SELECT Like Any Other Piece of Tested Logic</SectionTitle>
        <Para>
          Because the entire transformation lives in one SELECT statement, it is tempting to skip the testing
          discipline that a stored procedure or dbt model would get. That is a mistake — a bug in the SELECT
          is a bug in production data, refreshed automatically and repeatedly until someone notices. Before
          deploying a dynamic table definition, validate its logic the same way you would validate any
          transformation query.
        </Para>
        <CodeBox label="Validating logic before deploying as a dynamic table">{`-- Run the SELECT as a plain query first and inspect row counts,
-- null rates, and a few known rows before wrapping it in CREATE
-- DYNAMIC TABLE.
SELECT
  order_id, customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2) AS total_usd
FROM RAW.ORDERS
WHERE order_id IS NOT NULL;

-- Compare row counts between the candidate logic and the existing
-- production table before cutting over.
SELECT COUNT(*) FROM (
  SELECT order_id FROM RAW.ORDERS WHERE order_id IS NOT NULL
) candidate;

SELECT COUNT(*) FROM SILVER.ORDERS_DT;`}
        </CodeBox>
        <BulletList
          items={[
            'Test the SELECT in a scratch schema or CREATE TABLE AS SELECT before promoting it to CREATE DYNAMIC TABLE.',
            'Compare row counts and key aggregates against the pipeline it is replacing before cutover.',
            'Keep the old streams/tasks pipeline paused, not dropped, for a rollback window after cutover.',
            'Add the same business-rule checks (nulls, duplicate keys, referential sanity) you would run against any Silver or Gold table.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: A Two-Hop Dynamic Table Pipeline</SectionTitle>
        <Para>
          This lab builds a raw-to-cleaned-to-aggregated chain, then inspects refresh mode and lag for both
          hops — the same exercise a Snowflake engineer would run before trusting a dynamic table design in
          production.
        </Para>
        <CodeBox label="Lab setup">{`CREATE OR REPLACE DATABASE DYNAMIC_TABLE_LAB;
CREATE OR REPLACE SCHEMA DYNAMIC_TABLE_LAB.RAW;
CREATE OR REPLACE SCHEMA DYNAMIC_TABLE_LAB.SILVER;
CREATE OR REPLACE SCHEMA DYNAMIC_TABLE_LAB.GOLD;

CREATE OR REPLACE TABLE DYNAMIC_TABLE_LAB.RAW.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  order_ts TIMESTAMP_NTZ
);

INSERT INTO DYNAMIC_TABLE_LAB.RAW.ORDERS VALUES
  ('O-1', 'C-1', 'completed', 120.00, '2026-09-01 10:00:00'),
  ('O-2', 'C-2', 'pending',    45.00, '2026-09-01 11:15:00'),
  ('O-3', 'C-1', 'completed',  80.00, '2026-09-02 09:30:00');`}
        </CodeBox>
        <CodeBox label="Lab dynamic table chain">{`CREATE OR REPLACE DYNAMIC TABLE DYNAMIC_TABLE_LAB.SILVER.ORDERS_DT
  TARGET_LAG = '5 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT order_id, customer_id, UPPER(status) AS status, total_usd, order_ts
FROM DYNAMIC_TABLE_LAB.RAW.ORDERS
WHERE order_id IS NOT NULL;

CREATE OR REPLACE DYNAMIC TABLE DYNAMIC_TABLE_LAB.GOLD.DAILY_REVENUE_DT
  TARGET_LAG = DOWNSTREAM
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
FROM DYNAMIC_TABLE_LAB.SILVER.ORDERS_DT
WHERE status = 'COMPLETED'
GROUP BY 1;

-- Insert a late row and observe both tables refresh
INSERT INTO DYNAMIC_TABLE_LAB.RAW.ORDERS VALUES
  ('O-4', 'C-3', 'completed', 200.00, '2026-09-02 14:00:00');

SELECT * FROM DYNAMIC_TABLE_LAB.GOLD.DAILY_REVENUE_DT ORDER BY order_date;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'What refresh_action shows for SILVER.ORDERS_DT after the first refresh — INCREMENTAL or FULL?',
            'How long after the O-4 insert does GOLD.DAILY_REVENUE_DT reflect the new revenue?',
            'What happens to GOLD.DAILY_REVENUE_DT if SILVER.ORDERS_DT is suspended?',
            'How would you rewrite GOLD.DAILY_REVENUE_DT if it needed a running 7-day total instead of a daily sum — would that still refresh incrementally?',
            'What TARGET_LAG would you choose for GOLD.DAILY_REVENUE_DT if it fed an executive dashboard checked once every morning?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Interview answer" />
        <SectionTitle>How to Explain Dynamic Tables in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: a dynamic table lets you declare a transformation as a single
          SELECT statement plus a TARGET_LAG freshness target, and Snowflake manages the refresh — deciding
          whether it can compute an incremental diff or must fall back to a full recompute. This replaces the
          stream, task, and hand-written MERGE that the same pipeline would need under streams and tasks, for
          transformations that are expressible as plain SQL. I would still monitor refresh history and
          refresh_action explicitly, because a query that loses incremental eligibility can silently become a
          full-table rebuild on every refresh cycle. I would reach for streams and tasks instead when the
          logic needs procedural branching or very specific control over how updates and deletes are applied,
          and reach for a materialized view instead when I just need a single precomputed view over one table
          for read acceleration, not a multi-stage transformation chain.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is the difference between how you build a pipeline with dynamic tables versus streams and tasks?',
            'What does TARGET_LAG actually control?',
            'When does a dynamic table fall back to a full refresh, and why?',
            'How do you chain dynamic tables into a DAG, and what does TARGET_LAG = DOWNSTREAM do?',
            'When would you choose streams/tasks, a dynamic table, or a materialized view for a given transformation?',
            'How do you monitor a dynamic table\'s freshness and refresh cost in production?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'A dynamic table replaces a stream, a task, and a hand-written MERGE with one declarative SELECT plus a TARGET_LAG freshness target.',
          'TARGET_LAG is a freshness promise Snowflake schedules refreshes to satisfy, not a fixed run interval.',
          'Refresh mode is incremental when Snowflake can trace changes to a bounded set of output rows, and falls back to full refresh otherwise — check refresh_action, do not assume.',
          'Dynamic tables can depend on other dynamic tables, forming an engine-native DAG similar to a dbt model chain; use TARGET_LAG = DOWNSTREAM on intermediate hops.',
          'Dynamic tables, streams+tasks, and materialized views solve overlapping but distinct problems — pick based on logic complexity and query shape, not habit.',
          'Cost does not disappear with dynamic tables, it relocates into Snowflake\'s refresh plan; an unnoticed switch to full refresh can be the most expensive line item in a warehouse\'s bill.',
          'A suspended upstream dynamic table silently stalls every downstream table in its chain — check the whole DAG when debugging staleness.',
          'Dynamic tables are not a universal replacement for procedural pipelines; keep streams/tasks for branching logic and control-flow-heavy transformations.',
        ]}
      />
    </LearnLayout>
  )
}
