import type { LessonQuick } from '@/lib/lesson-quick'

const T = '/learn/dbt'

// dbt project files (YAML, Jinja) are shown as code. Where a model compiles to plain SQL, the
// compiled query runs on FreshCart so the result is real.
export const DBT_QUICK: Record<string, LessonQuick> = {
  [`${T}/what-is-dbt`]: {
    answer: 'dbt (data build tool) turns version-controlled SQL SELECT statements, called models, into tables and views in your warehouse, running them in dependency order and adding tests and documentation. It is the T in ELT: it transforms data already loaded; it does not extract or load.',
    points: [
      'Ingestion tools such as Fivetran or Airbyte load the data; dbt transforms it.',
      'Models are SELECT statements; dbt writes the DDL.',
      'Code review, tests and CI apply to analytics code.',
    ],
    example: {
      label: 'A dbt model is just a SELECT (models/customer_orders.sql)',
      lang: 'sql',
      code: `SELECT customer_id,
       COUNT(*) AS orders,
       ROUND(SUM(total_amount), 2) AS lifetime_value
FROM orders              -- in dbt: {{ ref('stg_orders') }}
WHERE order_status = 'Delivered'
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 5;`,
    },
    check: {
      question: 'Which part of ELT does dbt handle?',
      options: ['Extract', 'Load', 'Transform', 'All three'],
      answer: 2,
      explanation: 'dbt works on data already in the warehouse; other tools extract and load it.',
    },
  },

  [`${T}/how-dbt-works`]: {
    answer: 'dbt run reads your project, compiles Jinja (including ref() and source()) into plain SQL, builds a directed acyclic graph (DAG) of dependencies from those references, sorts it, and runs each model in order so nothing runs before what it depends on.',
    points: [
      'dbt compile writes the resolved SQL to target/compiled without touching the warehouse.',
      'ref() calls are the DAG\'s edges.',
      'A failed model skips everything downstream of it.',
    ],
    example: {
      label: 'What ref() compiles to',
      lang: 'sql',
      code: `-- models/fct_orders.sql (what you write)
select * from {{ ref('stg_orders') }} where order_status = 'Delivered'

-- target/compiled/.../fct_orders.sql (what dbt runs)
select * from analytics.dbt_ava.stg_orders where order_status = 'Delivered'`,
      static: true,
    },
    check: {
      question: 'Which command shows the SQL dbt would run without running it?',
      options: ['dbt run', 'dbt compile', 'dbt test', 'dbt seed'],
      answer: 1,
      explanation: 'dbt compile resolves Jinja and writes plain SQL to target/compiled, with no warehouse changes.',
    },
  },

  [`${T}/project-setup`]: {
    answer: 'A dbt project needs dbt_project.yml at its root (name, paths, default configs) and a profiles.yml, usually in ~/.dbt, holding the warehouse connection. Install dbt Core with your warehouse\'s adapter (such as dbt-snowflake), run dbt init, then dbt debug to check the connection.',
    points: [
      'dbt Core and dbt Cloud run the same engine; Cloud adds hosting, an IDE and scheduling.',
      'Keep credentials in profiles.yml, out of the repository.',
      'Installing an adapter installs dbt-core too.',
    ],
    example: {
      label: 'Install, create a project, and check the connection',
      lang: 'bash',
      code: `python3 -m venv .venv && source .venv/bin/activate
pip install dbt-snowflake
dbt init freshcart
cd freshcart && dbt debug        # validates profiles.yml and the connection
dbt run`,
      static: true,
    },
    check: {
      question: 'Where do warehouse credentials belong?',
      options: ['dbt_project.yml', 'profiles.yml, outside the repository', 'A model file', 'packages.yml'],
      answer: 1,
      explanation: 'profiles.yml holds connection details and normally lives in ~/.dbt, so secrets stay out of git.',
    },
  },

  [`${T}/models-basics`]: {
    answer: 'A model is one .sql file in models/ containing a single SELECT. Its file name becomes the table or view name, and with no configuration it is built as a view. A config() block at the top changes how it is built.',
    points: [
      'Never write CREATE or DROP in a model; dbt adds the DDL.',
      'Renaming the file creates a new object rather than renaming the old one.',
      'Organise models into staging, intermediate and marts.',
    ],
    example: {
      label: 'A staging model that cleans one source table',
      lang: 'sql',
      code: `-- models/staging/stg_orders.sql  ({{ config(materialized='view') }})
SELECT order_id,
       customer_id,
       store_id,
       DATE(order_date) AS order_date,
       LOWER(order_status) AS status,
       ROUND(total_amount, 2) AS total_usd
FROM orders               -- {{ source('shop', 'orders') }}
LIMIT 4;`,
    },
    check: {
      question: 'What does an unconfigured dbt model materialise as?',
      options: ['A table', 'A view', 'An incremental table', 'Nothing'],
      answer: 1,
      explanation: 'The default materialization is view, which is cheap to build but recomputed on every read.',
    },
  },

  [`${T}/sources-and-ref`]: {
    answer: 'source() points at raw tables loaded by other tools, declared once in YAML; ref() points at other dbt models. Both resolve to the right database and schema for the current environment and give dbt the dependency graph, lineage and freshness checks.',
    points: [
      'Never hard-code raw table names in models.',
      'dbt source freshness warns when a source stops updating.',
      'ref() resolves to your dev schema in dev and production in prod.',
    ],
    example: {
      label: 'Declaring a source with a freshness check',
      lang: 'yaml',
      code: `version: 2
sources:
  - name: shop
    database: raw
    loaded_at_field: _loaded_at
    freshness:
      warn_after: {count: 12, period: hour}
      error_after: {count: 24, period: hour}
    tables:
      - name: orders
      - name: customers`,
      static: true,
    },
    check: {
      question: 'What does dbt source freshness catch?',
      options: ['Slow models', 'A raw table that stopped receiving new data', 'Failing tests', 'Schema changes'],
      answer: 1,
      explanation: 'It compares the latest loaded_at value with your thresholds, so a stalled loader is caught even when models succeed.',
    },
  },

  [`${T}/materializations`]: {
    answer: 'A materialization is how dbt persists a model: view (a saved query, recomputed on read), table (rebuilt fully each run, fast to query), incremental (only new or changed rows added each run) or ephemeral (inlined as a CTE, never built). The SELECT stays the same.',
    points: [
      'Use views for light staging, tables for heavily queried marts.',
      'Use incremental for large, append-heavy tables.',
      'Set defaults per folder in dbt_project.yml.',
    ],
    example: {
      label: 'Materializations set per folder',
      lang: 'yaml',
      code: `# dbt_project.yml
models:
  freshcart:
    staging:
      +materialized: view
    intermediate:
      +materialized: ephemeral
    marts:
      +materialized: table`,
      static: true,
    },
    check: {
      question: 'Which materialization is never built in the warehouse?',
      options: ['view', 'table', 'incremental', 'ephemeral'],
      answer: 3,
      explanation: 'Ephemeral models are inlined into the models that use them as CTEs.',
    },
  },

  [`${T}/incremental-models`]: {
    answer: 'An incremental model builds the full table on its first run and afterwards processes only new or changed rows, filtered inside an is_incremental() block against {{ this }}, the existing table. unique_key with the merge or delete+insert strategy updates changed rows instead of duplicating them.',
    points: [
      'The first run, and --full-refresh, rebuild everything.',
      'append ignores unique_key; merge and delete+insert use it.',
      'Late-arriving data needs a lookback window in the filter.',
    ],
    example: {
      label: 'An incremental model filtered against its own table',
      lang: 'sql',
      code: `{{ config(materialized='incremental', unique_key='order_id', incremental_strategy='merge') }}

select order_id, customer_id, order_status, total_amount, updated_at
from {{ ref('stg_orders') }}
{% if is_incremental() %}
  where updated_at > (select max(updated_at) from {{ this }})
{% endif %}`,
      static: true,
    },
    check: {
      question: 'What does {{ this }} refer to in an incremental model?',
      options: ['The source table', 'The model\'s own existing table in the warehouse', 'The previous model in the DAG', 'The dbt project'],
      answer: 1,
      explanation: '{{ this }} is the already-built table, which lets the filter pick only rows newer than what it holds.',
    },
  },

  [`${T}/testing-basics`]: {
    answer: 'A dbt test is a query that should return zero rows; any rows returned are failures. Generic tests (unique, not_null, accepted_values, relationships) are declared in YAML on columns, and singular tests are custom SQL files in tests/.',
    points: [
      'not_null compiles to SELECT … WHERE column IS NULL.',
      'relationships checks that every foreign key exists in the parent.',
      'dbt build runs models and their tests together.',
    ],
    example: {
      label: 'What a not_null and a unique test run, as plain SQL',
      lang: 'sql',
      code: `-- not_null on orders.customer_id
SELECT 'not_null customer_id' AS test, COUNT(*) AS failing_rows
FROM orders WHERE customer_id IS NULL
UNION ALL
-- unique on orders.order_id
SELECT 'unique order_id', COUNT(*) FROM (
  SELECT order_id FROM orders GROUP BY order_id HAVING COUNT(*) > 1
);`,
    },
    check: {
      question: 'When does a dbt test fail?',
      options: ['When its query returns zero rows', 'When its query returns any rows', 'When the model is slow', 'When the model is a view'],
      answer: 1,
      explanation: 'Each returned row is a concrete example of bad data, so any rows mean failure.',
    },
  },

  [`${T}/documentation`]: {
    answer: 'dbt documentation lives in YAML next to your tests: descriptions on models and columns, with reusable doc blocks for longer text. dbt docs generate builds a static site with the descriptions, warehouse metadata and a lineage graph of the whole DAG.',
    points: [
      'Documentation is version-controlled with the code.',
      'Doc blocks ({% docs %}) avoid repeating the same prose.',
      'Host the generated site; dbt docs serve is for local viewing.',
    ],
    example: {
      label: 'Model and column descriptions beside tests',
      lang: 'yaml',
      code: `version: 2
models:
  - name: fct_orders
    description: One row per delivered order, in USD.
    columns:
      - name: order_id
        description: Primary key from the shop database.
        tests: [unique, not_null]
      - name: total_usd
        description: "{{ doc('order_total') }}"`,
      static: true,
    },
    check: {
      question: 'Which command builds the documentation site?',
      options: ['dbt run', 'dbt docs generate', 'dbt build', 'dbt source freshness'],
      answer: 1,
      explanation: 'docs generate writes manifest.json and catalog.json, which the static docs site reads.',
    },
  },

  [`${T}/jinja-and-macros`]: {
    answer: 'Every dbt model is a Jinja template: {{ … }} inserts a value and {% … %} runs logic such as if and for. A macro is a reusable Jinja function in macros/ that generates SQL, for example converting cents to dollars the same way in every model.',
    points: [
      'ref() and source() are Jinja functions.',
      'Branch on target.name to change behaviour per environment.',
      'Check the compiled SQL when a macro misbehaves.',
    ],
    example: {
      label: 'A macro and the SQL it produces',
      lang: 'sql',
      code: `-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column) %}
  round({{ column }} / 100.0, 2)
{% endmacro %}

-- in a model
select order_id, {{ cents_to_dollars('amount_cents') }} as amount_usd from {{ ref('stg_payments') }}

-- compiles to
select order_id, round(amount_cents / 100.0, 2) as amount_usd from analytics.stg_payments`,
      static: true,
    },
    check: {
      question: 'What does {% for %} produce in the compiled SQL?',
      options: ['A SQL loop', 'Repeated SQL text, once per item', 'A stored procedure', 'Nothing'],
      answer: 1,
      explanation: 'Jinja runs before the warehouse sees the SQL; a for block repeats text in the compiled output.',
    },
  },

  [`${T}/packages`]: {
    answer: 'A dbt package is another dbt project (macros, models, tests) that you install by listing it in packages.yml and running dbt deps. dbt_utils is the most used, with macros such as generate_surrogate_key, date_spine, pivot and the unique_combination_of_columns test.',
    points: [
      'Pin versions; a loose range can install breaking changes.',
      'dbt_packages/ is generated, so keep it out of git.',
      'Read a package\'s macros before relying on them.',
    ],
    example: {
      label: 'Installing a pinned dbt_utils',
      lang: 'yaml',
      code: `# packages.yml
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<1.2.0"]

# then: dbt deps`,
      static: true,
    },
    check: {
      question: 'Why pin package versions?',
      options: ['dbt requires it', 'So dbt deps cannot silently install a breaking change', 'It speeds up runs', 'It shrinks the warehouse'],
      answer: 1,
      explanation: 'An unpinned or loose version can change the moment you reinstall, breaking a working project.',
    },
  },

  [`${T}/seeds`]: {
    answer: 'A seed is a small CSV file in seeds/ that dbt seed loads into the warehouse as a table, for static reference data such as a state-to-region mapping. Models reference it with ref() like any other model.',
    points: [
      'Seeds suit small, rarely changing, hand-maintained data.',
      'Force column types such as ZIP codes as text with column_types.',
      'Large or operational data belongs in a real source, not a seed.',
    ],
    example: {
      label: 'A seed joined in a model (the seed shown as a VALUES table)',
      lang: 'sql',
      code: `WITH state_regions(state, region) AS (     -- seeds/state_regions.csv
  VALUES ('WA', 'West'), ('OR', 'West'), ('CA', 'West'),
         ('TX', 'South'), ('IL', 'Midwest'), ('NY', 'Northeast'), ('AZ', 'West')
)
SELECT r.region, COUNT(*) AS customers
FROM customers AS c
JOIN state_regions AS r ON r.state = c.state
GROUP BY r.region
ORDER BY customers DESC;`,
    },
    check: {
      question: 'Which data fits a dbt seed?',
      options: ['Ten million daily events', 'A 50-row mapping of state codes to sales regions', 'Live inventory levels', 'Customer passwords'],
      answer: 1,
      explanation: 'Seeds are for small, static, human-curated reference data that lives in the repository.',
    },
  },

  [`${T}/snapshots`]: {
    answer: 'A snapshot records how rows in a mutable table change over time, building a Type 2 slowly changing dimension. Each run of dbt snapshot compares the source with the last known state and adds a new row version with dbt_valid_from and dbt_valid_to when something changed.',
    points: [
      'The timestamp strategy uses a reliable updated_at column.',
      'The check strategy compares chosen columns when there is no updated_at.',
      'Snapshots must run regularly, or changes between runs are missed.',
    ],
    example: {
      label: 'A snapshot of customers using the timestamp strategy',
      lang: 'sql',
      code: `{% snapshot customers_snapshot %}
{{ config(target_schema='snapshots', unique_key='customer_id',
          strategy='timestamp', updated_at='updated_at') }}

select * from {{ source('shop', 'customers') }}

{% endsnapshot %}`,
      static: true,
    },
    check: {
      question: 'What problem do snapshots solve?',
      options: ['Slow queries', 'Losing history when a source row is overwritten', 'Missing tests', 'Large CSV files'],
      answer: 1,
      explanation: 'A mutable source shows only current values; snapshots keep every version for point-in-time questions.',
    },
  },

  [`${T}/variables-and-environments`]: {
    answer: 'The same dbt project runs against different targets (dev, staging, prod) defined in profiles.yml. target.name lets code branch per environment, vars set project values that --vars can override per run, and env_var() reads secrets and settings from the environment.',
    points: [
      'Developers build into their own schemas, never production.',
      'Limit data in dev for faster runs.',
      'Use env_var() for secrets; vars for ordinary parameters.',
    ],
    example: {
      label: 'Use a smaller slice of data outside production',
      lang: 'sql',
      code: `select *
from {{ ref('stg_orders') }}
{% if target.name != 'prod' %}
where order_date >= dateadd(day, -{{ var('dev_days', 30) }}, current_date)
{% endif %}`,
      static: true,
    },
    check: {
      question: 'Which is right for a database password?',
      options: ['A var in dbt_project.yml', 'env_var(), read from the environment', 'Hard-coded in a model', 'A seed'],
      answer: 1,
      explanation: 'env_var() keeps secrets out of version-controlled files.',
    },
  },

  [`${T}/hooks-and-operations`]: {
    answer: 'Hooks run SQL automatically around builds: pre-hook and post-hook around a model, on-run-start and on-run-end around a whole invocation. The classic use is a post-hook that re-grants SELECT to a BI role after a table is rebuilt; run-operation calls a macro on demand.',
    points: [
      'Rebuilding with CREATE OR REPLACE can drop grants.',
      'Use {{ this }} in hooks instead of hard-coded names.',
      'Keep hooks small and idempotent.',
    ],
    example: {
      label: 'Re-grant access after every rebuild',
      lang: 'yaml',
      code: `# dbt_project.yml
models:
  freshcart:
    marts:
      +post-hook:
        - "grant select on {{ this }} to role reporter"`,
      static: true,
    },
    check: {
      question: 'Why is a post-hook grant common?',
      options: ['To speed up queries', 'Because rebuilding a table can remove its existing grants', 'To create indexes', 'It is required by dbt'],
      answer: 1,
      explanation: 'Many warehouses drop and recreate the object, so BI tools lose access unless grants are reapplied.',
    },
  },

  [`${T}/project-structure`]: {
    answer: 'A maintainable dbt project has three layers: staging (one model per source table, only renaming, typing and light cleaning), intermediate (joins and shared business logic) and marts (business-facing tables organised by domain, such as finance or marketing).',
    points: [
      'Staging models never join; a source change touches one file.',
      'Intermediate models keep logic in one place.',
      'Marts are organised by business domain, not by source.',
    ],
    example: {
      label: 'The standard folder layout',
      lang: 'text',
      code: `models/
  staging/shop/       stg_shop__orders.sql, stg_shop__customers.sql
  intermediate/       int_orders_with_items.sql
  marts/finance/      fct_revenue.sql
  marts/marketing/    dim_customers.sql`,
      static: true,
    },
    check: {
      question: 'Where should a join between orders and customers live?',
      options: ['In each staging model', 'In an intermediate (or mart) model', 'In a seed', 'In a source definition'],
      answer: 1,
      explanation: 'Staging cleans one source each; joins and business logic belong downstream.',
    },
  },

  [`${T}/performance-tuning-dbt`]: {
    answer: 'Tune dbt by finding the expensive models first (run timings plus warehouse query history), then choosing materializations by how often each model is read versus rebuilt, making large models incremental, adding warehouse options such as cluster_by, and avoiding needless full refreshes.',
    points: [
      'A view read constantly can cost more than a table rebuilt once.',
      'Incremental models cut run time on big tables.',
      'Watch trends; models slow down gradually.',
    ],
    example: {
      label: 'Warehouse-specific tuning through config',
      lang: 'sql',
      code: `{{ config(
    materialized='incremental',
    unique_key='order_id',
    cluster_by=['order_date'],
    snowflake_warehouse='TRANSFORM_L'
) }}
select * from {{ ref('int_orders_with_items') }}`,
      static: true,
    },
    check: {
      question: 'A view behind a busy dashboard is slow and costly. What is the usual fix?',
      options: ['Delete the dashboard', 'Materialize it as a table (or incremental)', 'Add more tests', 'Use ephemeral'],
      answer: 1,
      explanation: 'Precomputing the rows once per run is cheaper than recomputing them on every dashboard read.',
    },
  },

  [`${T}/cicd-for-dbt`]: {
    answer: 'CI for dbt builds and tests every pull request before merge. Slim CI keeps it cheap: compare against production\'s manifest.json and build only modified models and their dependents (state:modified+), deferring to production tables for everything unchanged (--defer).',
    points: [
      'CI cost should scale with the change, not the project.',
      '--defer resolves unbuilt upstream models to production.',
      'Use an isolated schema per pull request.',
    ],
    example: {
      label: 'The slim CI command',
      lang: 'bash',
      code: `dbt deps
dbt build --select state:modified+ --defer --state ./prod-artifacts \\
  --target ci`,
      static: true,
    },
    check: {
      question: 'What does --defer do in slim CI?',
      options: ['Skips all tests', 'Uses production tables for models not built in CI', 'Delays the run', 'Deploys to production'],
      answer: 1,
      explanation: 'Unchanged upstream models are not rebuilt; references to them resolve to the production objects.',
    },
  },

  [`${T}/testing-strategy-at-scale`]: {
    answer: 'At scale, testing everything equally causes alert fatigue. Tier tests by position and impact: test heavily at sources and staging, which protects everything downstream; use severity warn versus error deliberately; store failures for debugging; and treat freshness as an agreed SLA.',
    points: [
      'Source and staging tests give the most leverage.',
      'Reserve error for failures that make data untrustworthy.',
      'store_failures saves failing rows to a table.',
    ],
    example: {
      label: 'Severity and thresholds on a test',
      lang: 'yaml',
      code: `columns:
  - name: email
    tests:
      - not_null:
          config:
            severity: error
            error_if: ">100"
            warn_if: ">0"
            store_failures: true`,
      static: true,
    },
    check: {
      question: 'Where do tests protect the most downstream models at once?',
      options: ['Final marts', 'Sources and staging', 'Seeds', 'Snapshots'],
      answer: 1,
      explanation: 'Problems caught at the start of the DAG never reach any of the models built on top.',
    },
  },

  [`${T}/dbt-interview-system-design`]: {
    answer: 'dbt design interviews check whether layering, materializations, testing and migration plans follow from the requirements. Recurring answers: staging, intermediate and marts for ownership; snapshots for point-in-time history; incremental models for scale; slim CI to keep merges safe.',
    points: [
      'Tie materialization choices to read and write patterns.',
      'Place tests where they protect the most.',
      'Migrate legacy SQL incrementally, validating against the old outputs.',
    ],
    example: {
      label: 'A design outline for a revenue mart',
      lang: 'text',
      code: `sources      shop.orders, shop.payments  (freshness: warn 6h, error 12h)
staging      stg_orders, stg_payments    (views, unique + not_null keys)
intermediate int_orders_paid             (ephemeral join)
marts        fct_daily_revenue           (incremental by day, cluster_by date)
history      snap_customers              (timestamp snapshot)
CI           state:modified+ --defer; block merge on failing tests`,
      static: true,
    },
    check: {
      question: 'Analysts need "what plan was this customer on last March?" Which dbt feature fits?',
      options: ['A seed', 'A snapshot', 'An ephemeral model', 'A macro'],
      answer: 1,
      explanation: 'Snapshots keep row history with validity dates, which answers point-in-time questions.',
    },
  },
}
