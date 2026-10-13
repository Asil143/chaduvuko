import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dbtCheatSheet: TrackCheatSheet = {
  track: 'dbt',
  title: 'dbt',
  trackHref: '/learn/dbt',
  accent: '#ff6b4a',
  blurb: 'Models, ref and source, tests, docs, materializations, incremental models, snapshots, and Jinja — the dbt patterns from the track on one page.',
  sections: [
    {
      title: 'Project',
      entries: [
        { label: 'Run', code: `dbt run            # build models\ndbt test           # run tests\ndbt build          # run, then test, in DAG order\ndbt docs generate && dbt docs serve` },
        { label: 'A model is a select', code: `-- models/staging/stg_orders.sql\nselect\n  id as order_id,\n  customer_id,\n  amount\nfrom {{ source('app', 'orders') }}` },
        { label: 'ref and source', code: `{{ ref('stg_orders') }}     -- another model\n{{ source('app', 'orders') }} -- a declared source\n# dbt builds the DAG from these` },
      ],
    },
    {
      title: 'Materializations',
      entries: [
        { label: 'Pick one', code: `{{ config(materialized='view') }}\n{{ config(materialized='table') }}\n{{ config(materialized='incremental') }}\n{{ config(materialized='ephemeral') }}` },
        { label: 'Incremental', code: `{{ config(materialized='incremental', unique_key='order_id') }}\nselect * from {{ ref('stg_orders') }}\n{% if is_incremental() %}\nwhere updated_at > (select max(updated_at) from {{ this }})\n{% endif %}` },
        { label: 'Full refresh', code: `dbt run --full-refresh --select stg_orders\n# rebuilds an incremental model from scratch` },
      ],
    },
    {
      title: 'Tests and docs',
      entries: [
        { label: 'Generic tests', code: `models:\n  - name: stg_orders\n    columns:\n      - name: order_id\n        tests: [unique, not_null]\n      - name: customer_id\n        tests:\n          - relationships:\n              to: ref('stg_customers')\n              field: customer_id` },
        { label: 'Singular test', code: `-- tests/no_negative_amounts.sql\nselect *\nfrom {{ ref('stg_orders') }}\nwhere amount < 0\n-- rows returned = test failed` },
        { label: 'Describe', code: `models:\n  - name: stg_orders\n    description: One row per order, typed and renamed.\n    columns:\n      - name: order_id\n        description: Primary key from the app.` },
      ],
    },
    {
      title: 'Jinja',
      entries: [
        { label: 'Variable', code: `{% set days = var('lookback_days', 3) %}\nwhere updated_at >= current_date - {{ days }}` },
        { label: 'Macro', code: `{% macro cents_to_dollars(column) %}\n  ({{ column }} / 100.0)\n{% endmacro %}\n\nselect {{ cents_to_dollars('amount_cents') }} as amount` },
        { label: 'Loop', code: `{% for col in ['city', 'country'] %}\n  {{ col }}{{ "," if not loop.last }}\n{% endfor %}` },
      ],
    },
    {
      title: 'Seeds, snapshots, packages',
      entries: [
        { label: 'Seed', code: `# seeds/country_codes.csv then\ndbt seed\nselect * from {{ ref('country_codes') }}` },
        { label: 'Snapshot', code: `{% snapshot orders_snapshot %}\n{{ config(\n  target_schema='snapshots',\n  unique_key='order_id',\n  strategy='timestamp',\n  updated_at='updated_at'\n) }}\nselect * from {{ source('app', 'orders') }}\n{% endsnapshot %}` },
        { label: 'Package', code: `# packages.yml\npackages:\n  - package: dbt-labs/dbt_utils\n    version: 1.1.1\n# dbt deps, then {{ dbt_utils.star(from=ref('stg_orders')) }}` },
      ],
    },
    {
      title: 'Environments and structure',
      entries: [
        { label: 'Target', code: `dbt run --target prod\n# profiles.yml holds dev and prod outputs\n# var and env_var change with the target` },
        { label: 'Layers', code: `models/\n  staging/     # one source, renamed\n  intermediate/ # joins, not for dashboards\n  marts/        # the tables people query` },
        { label: 'Select', code: `dbt build --select stg_orders+\n# this model and everything downstream\ndbt build --select +dim_customer\n# this model and everything it needs` },
      ],
    },
  ],
  projects: [
    { title: 'Staging model', level: 'Beginner', build: 'One source YAML and one staging model that renames and casts a raw orders table. unique and not_null on the primary key.', skills: ['sources', 'models', 'tests'] },
    { title: 'A mart on top', level: 'Beginner', build: 'A mart that refs the staging model and sums revenue by day. dbt docs shows the arrow from source to mart.', skills: ['ref', 'DAG', 'docs'] },
    { title: 'Incremental orders', level: 'Intermediate', build: 'An incremental model on updated_at. Run it twice and show the second run reads only new rows. Then full-refresh once.', skills: ['incremental', 'unique_key', 'full-refresh'] },
    { title: 'Snapshot a dimension', level: 'Intermediate', build: 'Snapshot a customers table with a timestamp strategy. Change a city, run the snapshot again, and query the two versions.', skills: ['snapshots', 'SCD', 'updated_at'] },
    { title: 'CI on a pull request', level: 'Advanced', build: 'A check that runs dbt build --select state:modified+ against a dev target when a model file changes. A failing test blocks the merge.', skills: ['CI', 'tests', 'selection'] },
  ],
}
