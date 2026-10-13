import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dbtCheatSheet: TrackCheatSheet = {
  track: 'dbt',
  title: 'dbt',
  trackHref: '/learn/dbt',
  accent: '#ff6b4a',
  blurb: 'Models, tests, incremental tables, snapshots, and environments — the dbt patterns from the track on one page. Bookmark it.',
  sections: [
    {
      title: 'Models',
      entries: [
        { label: 'A model is a SELECT', code: `-- models/staging/stg_orders.sql\nselect\n  id as order_id,\n  customer_id,\n  amount,\n  ordered_at\nfrom {{ source('app', 'orders') }}` },
        { label: 'Layer names', code: `models/staging/        stg_<source>__<entity>   one source, light renames\nmodels/intermediate/  int_<entity>             joins and business rules\nmodels/marts/         fct_ and dim_            one row per business grain\n# staging stays close to the source; marts are what people query` },
        { label: 'Run and compile', code: `dbt run --select stg_orders+\ndbt compile\n# + is this model and everything downstream\n# compiled SQL lands in target/; the warehouse only sees that SQL\n# dbt Core runs locally; dbt Cloud runs the same project in a job` },
      ],
    },
    {
      title: 'ref and source',
      entries: [
        { label: 'Declare the source', code: `version: 2\n\nsources:\n  - name: app\n    database: raw\n    schema: public\n    tables:\n      - name: orders\n      - name: customers` },
        { label: 'ref builds the DAG', code: `-- models/marts/fct_orders.sql\nselect order_id, customer_id, amount\nfrom {{ ref('stg_orders') }}\nwhere amount > 0\n# source() and ref() are the edges; parents run first\n# do not hard-code schema.table` },
        { label: 'Freshness', code: `sources:\n  - name: app\n    freshness:\n      warn_after: {count: 12, period: hour}\n      error_after: {count: 24, period: hour}\n    loaded_at_field: updated_at\n    tables:\n      - name: orders\n# dbt source freshness` },
      ],
    },
    {
      title: 'Materializations',
      entries: [
        { label: 'Which one', code: `view         the query runs on every read\ntable        stored rows; full rebuild each run\nincremental  stored rows; only new or changed keys\nephemeral    no relation; inlined as a CTE` },
        { label: 'Set it on the model', code: `{{ config(materialized='view') }}\n\nselect * from {{ ref('stg_orders') }}\n# a staging model is usually a view; a mart is usually a table` },
        { label: 'Folder defaults', code: `# dbt_project.yml\nmodels:\n  analytics:\n    staging:\n      +materialized: view\n    marts:\n      +materialized: table` },
        { label: 'Ephemeral', code: `{{ config(materialized='ephemeral') }}\n\nselect * from {{ ref('stg_orders') }} where amount > 0\n# downstream ref() inlines this SELECT; nothing is created` },
      ],
    },
    {
      title: 'Incremental models',
      entries: [
        { label: 'Merge new rows', code: `{{ config(\n    materialized='incremental',\n    unique_key='order_id',\n    incremental_strategy='merge'\n) }}\n\nselect * from {{ ref('stg_orders') }}\n{% if is_incremental() %}\nwhere updated_at > (select coalesce(max(updated_at), '1970-01-01') from {{ this }})\n{% endif %}` },
        { label: 'Strategies', code: `merge          update on unique_key, insert the rest\ndelete+insert  delete matching keys, then insert\nappend         insert only; duplicates are your problem\n# the first run builds the full table; later runs enter is_incremental()` },
        { label: 'Full refresh', code: `dbt run --full-refresh --select fct_orders\n# use this when the logic changes, not on every schedule\n# a row older than max(updated_at) is missed until the filter is wider` },
      ],
    },
    {
      title: 'Tests',
      entries: [
        { label: 'Generic tests', code: `version: 2\n\nmodels:\n  - name: stg_orders\n    columns:\n      - name: order_id\n        tests: [unique, not_null]\n      - name: status\n        tests:\n          - accepted_values:\n              values: ['placed', 'paid', 'cancelled']` },
        { label: 'Relationships', code: `- name: customer_id\n  tests:\n    - relationships:\n        to: ref('stg_customers')\n        field: customer_id\n# zero rows means pass; dbt build --select stg_orders runs the model and the tests` },
        { label: 'Singular test', code: `-- tests/assert_positive_amounts.sql\nselect order_id\nfrom {{ ref('stg_orders') }}\nwhere amount < 0\n# any returned row fails the test` },
        { label: 'Severity', code: `tests:\n  - not_null:\n      config:\n        severity: error\n  - unique:\n      config:\n        severity: warn\n# warn lets the job continue; error stops it\n# test keys in staging and business rules closer to marts` },
      ],
    },
    {
      title: 'Documentation',
      entries: [
        { label: 'Descriptions', code: `version: 2\n\nmodels:\n  - name: fct_orders\n    description: One row per order.\n    columns:\n      - name: amount\n        description: "{{ doc('order_amount') }}"` },
        { label: 'Doc block', code: `-- models/docs.md\n{% docs order_amount %}\nOrder total in major currency units, after discounts.\n{% enddocs %}` },
        { label: 'Docs site', code: `dbt docs generate\ndbt docs serve\n# the site shows descriptions and the DAG\n# write the description when you add the column` },
      ],
    },
    {
      title: 'Jinja and macros',
      entries: [
        { label: 'if and var', code: `select\n  order_id,\n  {% if var('include_tax', false) %}\n  tax_amount,\n  {% endif %}\n  amount\nfrom {{ ref('stg_orders') }}\nwhere ordered_at >= '{{ var("start_date") }}'` },
        { label: 'Macro', code: `-- macros/cents_to_dollars.sql\n{% macro cents_to_dollars(column_name) %}\n  ({{ column_name }} / 100.0)\n{% endmacro %}\n\nselect {{ cents_to_dollars('amount_cents') }} as amount\nfrom {{ ref('stg_payments') }}` },
        { label: 'Loop', code: `{% set statuses = ['placed', 'paid'] %}\nselect * from {{ ref('stg_orders') }}\nwhere status in (\n  {% for status in statuses %}\n    '{{ status }}'{% if not loop.last %},{% endif %}\n  {% endfor %}\n)\n# stop when the SQL is harder to read than a plain query` },
      ],
    },
    {
      title: 'Packages and seeds',
      entries: [
        { label: 'Install dbt_utils', code: `# packages.yml\npackages:\n  - package: dbt-labs/dbt_utils\n    version: [">=1.1.0", "<2.0.0"]\n# dbt deps` },
        { label: 'Surrogate key and test', code: `{{ dbt_utils.generate_surrogate_key(['order_id', 'line_id']) }} as order_line_sk\n\n# schema.yml\ntests:\n  - dbt_utils.unique_combination_of_columns:\n      combination_of_columns: [order_id, line_id]` },
        { label: 'Seed a CSV', code: `# seeds/country_codes.csv\ncountry_code,country_name\nIN,India\nUS,United States\n# dbt seed loads a table you can ref('country_codes')\n# seeds are for small reference data, not a fact table` },
      ],
    },
    {
      title: 'Snapshots',
      entries: [
        { label: 'Timestamp strategy', code: `{% snapshot customers_snapshot %}\n{{ config(\n    target_schema='snapshots',\n    unique_key='customer_id',\n    strategy='timestamp',\n    updated_at='updated_at'\n) }}\nselect * from {{ source('app', 'customers') }}\n{% endsnapshot %}\n# dbt snapshot` },
        { label: 'Check strategy', code: `{{ config(\n    strategy='check',\n    unique_key='customer_id',\n    check_cols=['email', 'status']\n) }}\n# use check when there is no reliable updated_at\n# dbt closes the old row and inserts a new one when a checked column changes` },
        { label: 'Current row', code: `select *\nfrom {{ ref('customers_snapshot') }}\nwhere dbt_valid_to is null\n# dbt_valid_from and dbt_valid_to bound each version\n# dbt_scd_id identifies the version; this is SCD type 2` },
      ],
    },
    {
      title: 'Environments',
      entries: [
        { label: 'Dev and prod targets', code: `# profiles.yml — dbt Core reads this; dbt Cloud stores the connection on the job\nanalytics:\n  target: dev\n  outputs:\n    dev:\n      type: snowflake\n      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"\n      user: "{{ env_var('SNOWFLAKE_USER') }}"\n      private_key_path: "{{ env_var('SNOWFLAKE_KEY_PATH') }}"\n      role: transformer\n      database: analytics_dev\n      warehouse: dev_wh\n      schema: "dbt_{{ env_var('DBT_USER') }}"\n      threads: 4\n    prod:\n      type: snowflake\n      account: "{{ env_var('SNOWFLAKE_ACCOUNT') }}"\n      user: "{{ env_var('SNOWFLAKE_USER') }}"\n      private_key_path: "{{ env_var('SNOWFLAKE_KEY_PATH') }}"\n      role: transformer\n      database: analytics\n      warehouse: transform_wh\n      schema: marts\n      threads: 8` },
        { label: 'vars', code: `# dbt_project.yml\nvars:\n  start_date: "2024-01-01"\n# one run\ndbt run --vars '{start_date: 2024-06-01}'` },
        { label: 'Branch on target', code: `{% if target.name == 'dev' %}\n  {{ config(materialized='view') }}\n{% else %}\n  {{ config(materialized='table') }}\n{% endif %}\n# dbt run --target prod` },
        { label: 'Hooks and slim CI', code: `{{ config(post_hook="grant select on {{ this }} to role analyst") }}\n\n# dbt_project.yml\non-run-end:\n  - "grant usage on schema analytics.marts to role analyst"\n\ndbt build --select state:modified+ --defer --state ./prod-artifacts\n# --defer reuses unchanged prod relations instead of rebuilding them in CI` },
      ],
    },
  ],
  projects: [
    { title: 'Staging orders', level: 'Beginner', build: 'Declare an app.orders source, build stg_orders with source(), and add unique and not_null tests on order_id. Run dbt build and fix one failing row.', skills: ['sources', 'models', 'tests'] },
    { title: 'Documented orders mart', level: 'Beginner', build: 'Add fct_orders on top of staging with ref(), column descriptions, and a doc block for amount. Generate the docs site and check the DAG runs source, then staging, then the mart.', skills: ['ref', 'docs', 'DAG'] },
    { title: 'Incremental orders', level: 'Intermediate', build: 'Change fct_orders to an incremental merge on order_id and filter with is_incremental(). Rehearse a --full-refresh and say which rows a normal rerun will touch.', skills: ['incremental', 'merge', 'unique_key'] },
    { title: 'Customer history', level: 'Intermediate', build: 'Snapshot customers with a timestamp strategy so email changes keep history, and load a country CSV as a seed. Join both from a mart and select the current row where dbt_valid_to is null.', skills: ['snapshots', 'SCD2', 'seeds'] },
    { title: 'Layered prod project', level: 'Advanced', build: 'Split staging, intermediate, and marts, install dbt_utils, and point dev and prod at different databases with env_var. Run a slim CI build that selects state:modified+ and defers to prod artifacts.', skills: ['layering', 'packages', 'environments', 'CI'] },
  ],
}
