import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowflakeWithDbt() {
  return (
    <LearnLayout
      title="Snowflake with dbt"
      description="dbt project structure, sources, models and materializations, tests, snapshots, incremental strategies with Snowflake MERGE, environments, and CI/CD for dbt on Snowflake."
      section="Snowflake — Module 17"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Snowflake with dbt', href: '/learn/snowflake/snowflake-with-dbt' },
      ]}
      prev={{ title: 'Data Sharing and Marketplace', href: '/learn/snowflake/data-sharing-marketplace' }}
      next={{ title: 'Production Operations and Monitoring', href: '/learn/snowflake/production-operations' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Where dbt fits" />
        <SectionTitle>Snowflake Runs the SQL; dbt Organizes the Factory</SectionTitle>
        <Para>
          The medallion architecture module introduced Raw, Silver, and Gold as a way to organize
          transformations inside Snowflake, and showed dbt-style SQL as an illustration of the pattern. This
          module goes deep on the tool itself. dbt (data build tool) does not run your data anywhere — Snowflake
          still executes every statement. What dbt provides is structure around that SQL: version-controlled
          model files, an automatically inferred dependency graph, built-in and custom tests, generated
          documentation, environment-aware connection profiles, and a CLI (or dbt Cloud) that turns "run this
          pile of SQL scripts in the right order" into a repeatable, reviewable engineering workflow.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> a dbt model is a SELECT statement saved as a `.sql` file.
            dbt compiles it, figures out its dependencies from other models it references, and runs
            `CREATE TABLE`/`CREATE VIEW`/`MERGE` statements against Snowflake to materialize it — you write
            SELECTs, dbt handles the DDL and the ordering.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`Your Snowflake account
  RAW schema          <- loaded by Snowpipe/COPY/connectors (outside dbt)
  SILVER schema        <- built by dbt staging models
  GOLD schema           <- built by dbt mart models

Your dbt project (version controlled in Git)
  models/staging/*.sql        -> compiles to SILVER views/tables
  models/marts/*.sql          -> compiles to GOLD views/tables
  schema.yml                  -> tests + documentation attached to models
  dbt_project.yml             -> project-wide config
  profiles.yml                -> which Snowflake warehouse/database/role each run uses`}
        </CodeBox>
        <Callout title="dbt is often the tool that actually implements medallion architecture">
          The medallion architecture module described Bronze/Silver/Gold (there called Raw/Silver/Gold) as a
          conceptual layering. In most real Snowflake projects, dbt is the tool that physically builds that
          layering: staging models are the Silver layer, mart models are the Gold layer, and the dbt DAG is the
          literal, executable version of the "Raw flows into Silver flows into Gold" diagram from that module.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Project structure" />
        <SectionTitle>A dbt Project Is a Directory of SQL, YAML, and Config</SectionTitle>
        <Para>
          Every dbt project follows a similar shape. `dbt_project.yml` declares project-wide settings — the
          project name, default materialization per directory, variables. `models/` holds your SQL files,
          typically organized into `staging/` (one model per raw source, light cleaning), `intermediate/`
          (reusable business logic that isn't meant to be queried directly by BI tools), and `marts/`
          (business-ready Gold-layer outputs). `profiles.yml`, usually kept outside the Git repo for security,
          holds the actual Snowflake connection details per environment.
        </Para>
        <CodeBox label="Typical project layout">{`my_dbt_project/
  dbt_project.yml
  models/
    staging/
      sources.yml
      stg_orders.sql
      stg_customers.sql
    intermediate/
      int_orders_enriched.sql
    marts/
      finance/
        fct_orders.sql
        daily_revenue.sql
      product/
        dim_customers.sql
  snapshots/
    customers_snapshot.sql
  tests/
    assert_positive_revenue.sql
  macros/
    cents_to_dollars.sql
  seeds/
    country_codes.csv`}
        </CodeBox>
        <CodeBox label="dbt_project.yml">{`name: 'my_dbt_project'
version: '1.0.0'
profile: 'my_dbt_project'

model-paths: ['models']
snapshot-paths: ['snapshots']
seed-paths: ['seeds']

models:
  my_dbt_project:
    staging:
      +materialized: view
      +schema: silver
    marts:
      +materialized: table
      +schema: gold`}
        </CodeBox>
        <CodeBox label="profiles.yml — Snowflake connection details">{`my_dbt_project:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: xy12345.us-east-1
      user: DBT_DEV_USER
      password: "{{ env_var('DBT_PASSWORD') }}"
      role: DBT_TRANSFORMER
      database: ANALYTICS_DEV
      warehouse: WH_TRANSFORM_XS
      schema: DBT_DEV_ASIL
      threads: 4
    prod:
      type: snowflake
      account: xy12345.us-east-1
      user: DBT_PROD_SERVICE_USER
      password: "{{ env_var('DBT_PASSWORD') }}"
      role: DBT_TRANSFORMER_PROD
      database: ANALYTICS
      warehouse: WH_TRANSFORM_M
      schema: DBT_PROD
      threads: 8`}
        </CodeBox>
        <Table
          headers={['File', 'Purpose']}
          rows={[
            ['dbt_project.yml', 'Project-wide config: name, default materializations, folder-level settings.'],
            ['profiles.yml', 'Snowflake connection details per environment/target — account, warehouse, role, database.'],
            ['sources.yml', 'Declares raw tables dbt can reference with source() and their freshness expectations.'],
            ['schema.yml (per model folder)', 'Attaches tests and documentation to specific models and columns.'],
            ['models/*.sql', 'The actual SELECT statements that become views/tables/incremental tables.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Sources" />
        <SectionTitle>source() Declares and Documents Your Raw Inputs</SectionTitle>
        <Para>
          A dbt source is a declared reference to a raw table that dbt itself did not create — typically
          something loaded by Snowpipe, a COPY INTO job, or a Fivetran/Airbyte-style connector, landing in a
          RAW schema exactly as described in the medallion architecture module. Declaring sources in
          `sources.yml` rather than hardcoding schema.table names throughout your SQL gives you two things:
          a single place to change the underlying location if it moves, and dbt-native freshness checks.
        </Para>
        <CodeBox label="models/staging/sources.yml">{`version: 2

sources:
  - name: raw
    database: ANALYTICS
    schema: RAW
    tables:
      - name: orders
        loaded_at_field: loaded_at
        freshness:
          warn_after: {count: 12, period: hour}
          error_after: {count: 24, period: hour}
      - name: customers
        loaded_at_field: loaded_at
        freshness:
          warn_after: {count: 24, period: hour}`}
        </CodeBox>
        <CodeBox label="Referencing a source from a model">{`-- models/staging/stg_orders.sql
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status) AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd,
  loaded_at
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL`}
        </CodeBox>
        <Table
          headers={['Command', 'What it checks']}
          rows={[
            ['dbt source freshness', 'Compares CURRENT_TIMESTAMP() against loaded_at_field for each declared source table, flags warn/error thresholds.'],
            ['dbt run --select stg_orders', 'Rebuilds only the stg_orders model and its dependencies as configured.'],
            ['dbt test --select source:raw', 'Runs any tests attached to source tables (e.g. not_null on a key column).'],
          ]}
        />
        <Callout title="source() versus a hardcoded table name">
          Writing `FROM ANALYTICS.RAW.ORDERS` directly works, but it means dbt has no idea that model depends
          on a raw table — it can't include it in freshness checks or lineage graphs. `{'{{'} source('raw', 'orders') {'}}'}` makes that dependency explicit and machine-readable.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Models and ref()" />
        <SectionTitle>Models Are SELECTs; ref() Builds the Dependency Graph</SectionTitle>
        <Para>
          A model is a `.sql` file containing a single SELECT statement — no `CREATE TABLE`, no `INSERT`, just
          the query. dbt wraps it in the appropriate DDL/DML based on the model's configured materialization.
          When one model's SQL references another model with `{'{{'} ref('model_name') {'}}'}` instead of
          hardcoding its schema.table name, dbt can build the full dependency graph (the DAG) automatically —
          it knows `fct_orders` must run after `stg_orders`, without you writing any orchestration logic.
        </Para>
        <CodeBox label="ref() chains models together">{`-- models/staging/stg_orders.sql (compiles to SILVER.STG_ORDERS)
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status) AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL

-- models/marts/finance/daily_revenue.sql (compiles to GOLD.DAILY_REVENUE)
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('stg_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1`}
        </CodeBox>
        <Para>
          Because `daily_revenue.sql` never writes the literal string `SILVER.STG_ORDERS`, dbt is free to
          compile that reference to whatever schema `stg_orders` actually lives in for the current target —
          `DBT_DEV_ASIL.STG_ORDERS` in dev, `DBT_PROD.STG_ORDERS` in prod. This is the mechanism that makes
          environments (Part 09) work at all.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Materializations" />
        <SectionTitle>View, Table, or Incremental — dbt Picks the DDL For You</SectionTitle>
        <Para>
          A model's materialization controls what SQL dbt actually runs against Snowflake. A `view`
          materialization compiles the model into `CREATE OR REPLACE VIEW ... AS (your select)` — cheap to
          create, recomputed on every query. A `table` materialization compiles into
          `CREATE OR REPLACE TABLE ... AS (your select)` — a full rebuild every run, but fast to query
          afterward. An `incremental` materialization is the interesting one: on the first run it behaves like
          a table, but on subsequent runs it processes only new/changed rows instead of rebuilding everything.
        </Para>
        <Table
          headers={['Materialization', 'Compiles to', 'Use when', 'Avoid when']}
          rows={[
            ['view', 'CREATE OR REPLACE VIEW', 'Logic is light, or the model is a thin staging layer few queries hit directly.', 'Many downstream queries re-run expensive logic repeatedly.'],
            ['table', 'CREATE OR REPLACE TABLE ... AS SELECT', 'Output is reused often and a full rebuild is affordable.', 'Source data is large and mostly unchanged run to run.'],
            ['incremental', 'INSERT/MERGE of only new or changed rows (config-dependent)', 'Large, append-heavy or slowly-changing fact tables.', 'The unique key or "what changed" logic is unclear.'],
            ['ephemeral', 'Inlined as a CTE into whatever references it — never its own table/view', 'Small reusable snippets only ever used by one or two downstream models.', 'The logic is expensive or reused by many models (gets recomputed every time).'],
          ]}
        />
        <CodeBox label="Setting materialization per model">{`-- models/marts/finance/fct_orders.sql
{{ config(materialized='table') }}

SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  total_usd
FROM {{ ref('stg_orders') }}`}
        </CodeBox>
        <Callout title="Do not make everything a table out of habit">
          The same principle from the medallion architecture module applies here: materializing every model as
          a table increases storage and compute without always earning it. Start staging models as views;
          promote a model to table or incremental only once you've observed it's expensive or heavily reused.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Incremental models in depth" />
        <SectionTitle>is_incremental() and Snowflake's Native MERGE</SectionTitle>
        <Para>
          An incremental model's SQL needs to behave differently depending on whether it's the very first run
          (build the whole table) or a subsequent run (process only what's new). dbt provides the
          `is_incremental()` macro specifically for this: it evaluates to `false` on the first run or a full
          `--full-refresh`, and `true` on every normal subsequent run, letting you write one model file that
          branches its own filter logic.
        </Para>
        <CodeBox label="is_incremental() pattern">{`-- models/marts/finance/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
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
  -- only true on runs after the first: filter to rows newer than what's already in the target
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}`}
        </CodeBox>
        <Para>
          The `incremental_strategy='merge'` config is what pairs this pattern directly with Snowflake's native
          MERGE, covered in depth in the merge-idempotency module. Under the hood, dbt compiles the incremental
          run into roughly the same shape of `MERGE INTO target USING (new rows) ON unique_key ... WHEN
          MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT` statement you'd hand-write yourself — dbt is
          just generating that MERGE for you from the `unique_key` and the compiled SELECT.
        </Para>
        <CodeBox label="Roughly what dbt compiles the merge strategy into">{`MERGE INTO GOLD.FCT_ORDERS AS target
USING (
  SELECT order_id, customer_id, order_ts, status, total_usd, updated_at
  FROM SILVER.STG_ORDERS
  WHERE updated_at > (SELECT MAX(updated_at) FROM GOLD.FCT_ORDERS)
) AS src
ON target.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, order_ts, status, total_usd, updated_at)
VALUES (src.order_id, src.customer_id, src.order_ts, src.status, src.total_usd, src.updated_at);`}
        </CodeBox>
        <Table
          headers={['Incremental strategy', 'Behavior on Snowflake', 'Use when']}
          rows={[
            ['merge', 'Compiles to a native Snowflake MERGE keyed on unique_key.', 'Mutable source rows — the default and most common choice on Snowflake.'],
            ['append', 'Compiles to a plain INSERT of new rows, no update/dedupe.', 'Strictly insert-only event/log data with no updates.'],
            ['delete+insert', 'Deletes matching rows in target, then inserts new/changed set.', 'Reprocessing full partitions/batches rather than row-by-row updates.'],
          ]}
        />
        <Callout title="Why this pairs naturally with Snowflake">
          Snowflake's MERGE is a first-class, well-optimized statement — this is exactly the operation the
          merge-idempotency module covers for idempotent, dedupe-safe pipelines. dbt's `merge` incremental strategy
          isn't inventing new behavior on Snowflake; it's generating the same idiomatic MERGE pattern you'd
          write by hand, just parameterized from your model's `unique_key` and `is_incremental()` filter.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Tests" />
        <SectionTitle>Generic Tests Enforce Assumptions on Every Run</SectionTitle>
        <Para>
          dbt ships four built-in generic tests you attach to columns declaratively in YAML: `unique`,
          `not_null`, `accepted_values`, and `relationships`. Each compiles to a SELECT that should return zero
          rows; if it returns any rows, the test fails and `dbt build`/`dbt test` reports the failure with the
          offending rows discoverable. This is the same discipline the medallion architecture module described
          as "tests are part of the architecture" — dbt just gives you a standard, declarative way to define
          them instead of hand-writing ad hoc SELECT checks every time.
        </Para>
        <CodeBox label="models/marts/finance/schema.yml — generic tests">{`version: 2

models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: status
        tests:
          - accepted_values:
              values: ['completed', 'cancelled', 'refunded', 'fraud']
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id`}
        </CodeBox>
        <CodeBox label="A custom SQL test — tests/assert_positive_revenue.sql">{`-- Custom (singular) test: any file under tests/ that returns rows is a failure.
SELECT order_id, total_usd
FROM {{ ref('fct_orders') }}
WHERE total_usd < 0`}
        </CodeBox>
        <Table
          headers={['Test type', 'Example', 'Compiles to']}
          rows={[
            ['unique', 'order_id is unique in fct_orders.', 'GROUP BY with HAVING COUNT(*) > 1.'],
            ['not_null', 'customer_id is never null.', 'SELECT ... WHERE customer_id IS NULL.'],
            ['accepted_values', 'status is one of a known set.', 'SELECT ... WHERE status NOT IN (...).'],
            ['relationships', 'Every fct_orders.customer_id exists in dim_customers.', 'LEFT JOIN with WHERE parent.customer_id IS NULL.'],
            ['custom SQL test', 'Anything you can express as "these rows are bad."', 'Runs the file\'s SELECT as-is; any returned rows fail the test.'],
          ]}
        />
        <Callout title="Tests belong on primary keys, always">
          At minimum, every mart's primary key should have `unique` and `not_null` tests. This is the single
          highest-leverage testing habit in a dbt project — it catches the most common and most damaging class
          of bug (a broken join silently multiplying rows) before it ever reaches a dashboard.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Snapshots" />
        <SectionTitle>Snapshots Track Slowly Changing Dimensions Over Time</SectionTitle>
        <Para>
          A regular dbt model always represents the current state of its source — run it again and old values
          are simply overwritten. A snapshot is different: it's dbt's mechanism for capturing a Type 2 slowly
          changing dimension, meaning it preserves history of how a row's values changed over time, each with
          a valid-from and valid-to timestamp, rather than just the latest value.
        </Para>
        <CodeBox label="snapshots/customers_snapshot.sql">{`{% snapshot customers_snapshot %}

{{
  config(
    target_schema='snapshots',
    unique_key='customer_id',
    strategy='timestamp',
    updated_at='updated_at'
  )
}}

SELECT
  customer_id,
  email,
  segment,
  updated_at
FROM {{ source('raw', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>
        <Para>
          Running `dbt snapshot` compares the current source rows against what the snapshot table already
          holds. When a tracked customer's `segment` changes, the snapshot closes out the old row (stamping a
          `dbt_valid_to`) and inserts a new row with `dbt_valid_from` set to now — exactly the Type 2 SCD
          pattern used in traditional dimensional modeling.
        </Para>
        <Table
          headers={['Mechanism', 'What it tracks', 'Trigger', 'Where the history lives']}
          rows={[
            ['dbt snapshot', 'Row-level history of column value changes over time (SCD Type 2).', 'Manually or scheduled runs of `dbt snapshot`.', 'A dedicated snapshot table with dbt_valid_from/dbt_valid_to columns.'],
            ['Snowflake stream', 'Row-level change events (insert/update/delete) since the stream was last consumed.', 'Any DML against the source table.', 'Not stored long-term — consumed by a task/MERGE and then the offset advances.'],
          ]}
        />
        <Callout title="Snapshots and streams are conceptually related, not interchangeable">
          Both are about noticing that something changed. A Snowflake stream (covered in the streams-and-tasks
          module) is a short-lived change bookmark meant to be consumed quickly by a pipeline step. A dbt
          snapshot is the opposite in spirit — it's meant to accumulate and keep permanent history of a
          dimension's changes over months or years. Don't reach for a snapshot to solve an incremental-loading
          problem, and don't reach for a stream to build a historical SCD table.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Environments" />
        <SectionTitle>dev, staging, and prod Targets Point at Different Warehouses</SectionTitle>
        <Para>
          `profiles.yml` (shown in Part 02) defines multiple targets — typically `dev`, sometimes `staging`,
          and `prod` — each with its own Snowflake account credentials, role, database, and warehouse. Because
          every model references its dependencies through `ref()`/`source()` rather than hardcoded schema
          names, the exact same SQL compiles differently per target: a developer running `dbt run --target dev`
          builds into their own personal dev schema on a small XS warehouse, while the production job runs
          `dbt run --target prod` and builds into the shared prod database on a right-sized warehouse.
        </Para>
        <Table
          headers={['Target', 'Typical database', 'Typical warehouse', 'Who runs it']}
          rows={[
            ['dev', 'ANALYTICS_DEV, schema scoped per developer.', 'Small (XS) — cheap, isolated experimentation.', 'Individual developers, local dbt runs.'],
            ['staging / CI', 'A CI-scoped database, often built and torn down per PR.', 'Small, shared, short-lived.', 'CI pipeline on every pull request.'],
            ['prod', 'ANALYTICS (the real Gold layer BI tools query).', 'Right-sized for full-project runtime.', 'A scheduled job or orchestrator — never a person by hand.'],
          ]}
        />
        <Callout title="Never point dev at the prod database">
          The entire point of environments is that a developer iterating on a model, potentially running
          `dbt run --full-refresh` repeatedly, should never be able to touch what BI dashboards and executives
          are actually querying. If `profiles.yml`'s dev target and prod target ever point at the same
          database, that safety boundary is gone.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — CI/CD for dbt" />
        <SectionTitle>dbt build Belongs in a Pipeline, Not Just a Laptop</SectionTitle>
        <Para>
          `dbt build` runs models, tests, snapshots, and seeds together in dependency order, stopping downstream
          work on a failed test where configured to. Wiring this into CI means every pull request that changes
          a model gets built and tested against a scoped Snowflake schema before it can merge — the same
          "block on failed tests" discipline the medallion architecture module described as part of the
          architecture itself, now automated.
        </Para>
        <CodeBox label="Example CI step (GitHub Actions style)">{`# .github/workflows/dbt-ci.yml (excerpt)
- name: Run dbt build against CI schema
  run: |
    dbt deps
    dbt build --target ci --select state:modified+ --state ./prod-manifest
  env:
    DBT_PASSWORD: \${{ secrets.DBT_CI_PASSWORD }}`}
        </CodeBox>
        <Para>
          The `--select state:modified+` pattern is worth calling out: rather than rebuilding the entire
          project on every PR, dbt can compare against a previous "state" (a saved manifest, often from the
          last successful prod run) and select only the models that changed plus everything downstream of
          them. This keeps CI fast and keeps compute cost proportional to the size of the actual change.
        </Para>
        <Table
          headers={['Approach', 'What it is', 'Tradeoff']}
          rows={[
            ['dbt Core, self-hosted CI', 'You run `dbt` via GitHub Actions/GitLab CI/Airflow on your own compute.', 'Full control and no extra cost, but you own the orchestration and scheduling.'],
            ['dbt Cloud', 'A hosted service that runs jobs, hosts docs, and manages scheduling/CI for you.', 'Less infrastructure to maintain, but it\'s a separate paid product with its own environment.'],
          ]}
        />
        <Callout title="Both compile to the same Snowflake SQL">
          dbt Core and dbt Cloud run the identical underlying dbt project and produce the identical compiled
          SQL against Snowflake. The choice between them is about who hosts the scheduler, the docs site, and
          the CI runners — not about what SQL ultimately executes in your warehouse.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — dbt and medallion architecture together" />
        <SectionTitle>Staging Models Are Your Silver Layer; Marts Are Your Gold Layer</SectionTitle>
        <Para>
          Bringing this full circle to the medallion architecture module: in a real dbt-on-Snowflake project,
          the layers aren't just a conceptual diagram, they're literal folders and schema configs. Raw stays
          exactly as that module described it — loaded outside dbt, referenced only through `source()`.
          `models/staging/` models, materialized as views or lightly-typed tables into a SILVER-configured
          schema, are the Silver layer: typed, deduped, standardized, still close to source shape.
          `models/marts/` models, materialized as tables (or incremental tables for large fact tables) into a
          GOLD-configured schema, are the Gold layer: business-ready facts, dimensions, and marts with tests
          and documented owners.
        </Para>
        <CodeBox label="The mapping, made explicit">{`Medallion concept (elt-medallion module)     dbt implementation (this module)
-------------------------------------------  -------------------------------------------
RAW schema, loaded outside the warehouse      source() declarations in sources.yml
SILVER: typed, deduped, standardized          models/staging/*.sql -> view/table materialization
GOLD: business-ready facts/dims/marts         models/marts/**/*.sql -> table/incremental materialization
"Tests are part of the architecture"          schema.yml generic tests + custom SQL tests
"Every Gold table needs an owner"             model owners documented via meta/docs in schema.yml
"Lineage explains where a number came from"   dbt-generated DAG (dbt docs generate) from ref()/source()`}
        </CodeBox>
        <Para>
          This is why teams that already understand medallion architecture tend to pick up dbt quickly: dbt
          didn't invent a new mental model, it gave the existing one version control, automatic dependency
          ordering, tests-as-code, and a generated lineage graph you don't have to draw by hand.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Anti-patterns" />
        <SectionTitle>Common dbt-on-Snowflake Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Materializing every model as a table out of habit, inflating storage and compute for no benefit.',
              'Writing hardcoded schema.table references instead of ref()/source(), which breaks environment isolation and lineage.',
              'Having no unique/not_null tests on primary keys — the highest-leverage tests in the whole project.',
              'Choosing incremental materialization without a real, well-defined unique_key, silently corrupting the merge.',
              'Letting analysts hand-edit compiled tables directly in Snowflake outside of Git and dbt.',
              'Running dbt with a role that has far more privileges than the transformation actually needs.',
              'Confusing a dbt snapshot with an incremental-loading mechanism — they solve different problems.',
              'Skipping CI and running dbt only from someone\'s laptop before merging to prod.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build a Small Staging-to-Mart dbt Flow</SectionTitle>
        <Para>
          This lab is the minimum practical dbt project on Snowflake: a source, a staging model, a mart model
          with an incremental merge strategy, and tests wired to the primary key.
        </Para>
        <CodeBox label="Lab: sources.yml and stg_orders.sql">{`# models/staging/sources.yml
version: 2
sources:
  - name: raw
    database: DBT_LAB
    schema: RAW
    tables:
      - name: orders
        loaded_at_field: loaded_at

-- models/staging/stg_orders.sql
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status) AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd,
  loaded_at AS updated_at
FROM {{ source('raw', 'orders') }}
WHERE order_id IS NOT NULL`}
        </CodeBox>
        <CodeBox label="Lab: incremental mart and schema.yml tests">{`-- models/marts/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
  )
}}

SELECT order_id, customer_id, order_ts, status, total_usd, updated_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}

# models/marts/schema.yml
version: 2
models:
  - name: fct_orders
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: status
        tests:
          - accepted_values:
              values: ['completed', 'cancelled', 'refunded', 'fraud']`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'On the very first dbt run, what does is_incremental() evaluate to, and what SQL does dbt run as a result?',
            'On the second run, after one new order lands in RAW.ORDERS, what does the compiled MERGE statement look for?',
            'What would happen to fct_orders if unique_key were left off the config?',
            'Which test would catch a status value like "returned" that nobody expected?',
            'How would you rerun this lab against a --target prod that points at a different Snowflake database and warehouse?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Interview answer" />
        <SectionTitle>How to Explain dbt on Snowflake in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: dbt lets a team manage Snowflake transformations as
          version-controlled SQL models instead of ad hoc scripts. Sources declare raw inputs with source() and
          freshness checks; models are plain SELECT statements that reference each other with ref(), which lets
          dbt build the dependency graph automatically and compile the right materialization — view, table, or
          incremental — into Snowflake DDL/DML. For large mutable fact tables I'd use an incremental model with
          the merge strategy, which compiles into a native Snowflake MERGE keyed on a unique_key, guarded by
          is_incremental() so the first run does a full build and later runs process only new or changed rows.
          Generic tests like unique, not_null, accepted_values, and relationships enforce assumptions on every
          run, and snapshots give Type 2 slowly changing dimension history when I need to track how a row
          changed over time — a different problem from what a Snowflake stream solves. Environments in
          profiles.yml point dev, CI, and prod at different Snowflake databases and warehouses so the same
          compiled SQL never touches production by accident, and CI runs dbt build on every pull request so
          broken models or failed tests never reach the Gold layer. In practice, dbt's staging models are the
          Silver layer and its mart models are the Gold layer — it's the tool that actually implements
          medallion architecture in most real Snowflake projects.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is the difference between source() and ref(), and why does that difference matter for the dependency graph?',
            'What SQL does a table materialization compile to? A view? An incremental model with the merge strategy?',
            'What does is_incremental() evaluate to on the first run versus later runs?',
            'How is a dbt snapshot different from a Snowflake stream, given both are about detecting change?',
            'Name the four generic dbt tests and what each one checks.',
            'Why should profiles.yml keep dev, staging/CI, and prod pointed at different databases and warehouses?',
            'How do dbt\'s staging and mart models map onto the Raw/Silver/Gold layers from the medallion architecture module?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'dbt organizes Snowflake SQL into version-controlled models, tests, docs, and environments — Snowflake still executes every statement.',
          'source() declares raw inputs with freshness checks; ref() builds the model dependency graph automatically.',
          'Materialization (view/table/incremental/ephemeral) controls what DDL/DML dbt compiles a model into.',
          'Incremental models with the merge strategy compile into Snowflake\'s native MERGE, guarded by is_incremental().',
          'Generic tests (unique, not_null, accepted_values, relationships) plus custom SQL tests enforce data assumptions on every run.',
          'Snapshots track Type 2 slowly changing dimension history — conceptually related to but distinct from Snowflake streams.',
          'Environments in profiles.yml keep dev/CI/prod pointed at different databases and warehouses; CI runs dbt build before merge.',
          'dbt\'s staging models are usually the practical implementation of the Silver layer, and mart models of the Gold layer, from medallion architecture.',
        ]}
      />
    </LearnLayout>
  )
}
