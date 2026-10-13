import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const snowflakeCheatSheet: TrackCheatSheet = {
  track: 'snowflake',
  title: 'Snowflake',
  trackHref: '/learn/snowflake',
  accent: '#29b5e8',
  blurb: 'Warehouses, stages, COPY, MERGE, Time Travel, streams, tasks, and access control — the Snowflake SQL from the track on one page.',
  sections: [
    {
      title: 'Account objects',
      entries: [
        { label: 'Warehouse, database, schema', code: `CREATE WAREHOUSE wh_dev\n  WAREHOUSE_SIZE = XSMALL\n  AUTO_SUSPEND = 60\n  AUTO_RESUME = TRUE;\nCREATE DATABASE analytics;\nCREATE SCHEMA analytics.raw;` },
        { label: 'Storage vs compute', code: `# storage holds micro-partitions\n# a warehouse is compute you can suspend\n# two warehouses can read the same tables` },
        { label: 'Use them', code: `USE WAREHOUSE wh_dev;\nUSE DATABASE analytics;\nUSE SCHEMA raw;` },
      ],
    },
    {
      title: 'Load',
      entries: [
        { label: 'Stage and copy', code: `CREATE STAGE stg_orders;\nPUT file://orders.csv @stg_orders;\nCOPY INTO raw.orders\nFROM @stg_orders\nFILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1);` },
        { label: 'JSON', code: `SELECT\n  raw:id::number AS order_id,\n  raw:customer.id::number AS customer_id\nFROM raw.events,\nLATERAL FLATTEN(input => raw:items);` },
        { label: 'Load history', code: `SELECT * FROM information_schema.load_history\nWHERE table_name = 'ORDERS'\nORDER BY last_load_time DESC;` },
      ],
    },
    {
      title: 'Transform',
      entries: [
        { label: 'MERGE', code: `MERGE INTO silver.orders t\nUSING staging.orders s\nON t.order_id = s.order_id\nWHEN MATCHED THEN UPDATE SET t.amount = s.amount\nWHEN NOT MATCHED THEN INSERT (order_id, amount)\n  VALUES (s.order_id, s.amount);` },
        { label: 'Dedup', code: `SELECT * FROM raw.orders\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY order_id ORDER BY updated_at DESC\n) = 1;` },
        { label: 'Layers', code: `raw     landed, little change\nsilver  typed, deduped\ngold    the table a dashboard reads` },
      ],
    },
    {
      title: 'Time Travel and clones',
      entries: [
        { label: 'Query the past', code: `SELECT * FROM orders\nAT (OFFSET => -60 * 30);  -- 30 minutes ago\n\nCREATE TABLE orders_restore CLONE orders\n  AT (TIMESTAMP => '2026-03-01 12:00:00'::timestamp_ltz);` },
        { label: 'Undrop', code: `UNDROP TABLE orders;\n# retention is DATA_RETENTION_TIME_IN_DAYS\n# fail-safe is Snowflake's, not yours to query` },
        { label: 'Zero-copy clone', code: `CREATE DATABASE dev CLONE prod;\n# new objects cost storage only when they change` },
      ],
    },
    {
      title: 'Streams, tasks, dynamic tables',
      entries: [
        { label: 'Stream', code: `CREATE STREAM orders_stream ON TABLE raw.orders;\nSELECT * FROM orders_stream;  -- changes since last consume` },
        { label: 'Task', code: `CREATE TASK nightly\n  WAREHOUSE = wh_dev\n  SCHEDULE = 'USING CRON 0 2 * * * UTC'\nAS\n  MERGE INTO silver.orders ...;\nALTER TASK nightly RESUME;` },
        { label: 'Dynamic table', code: `CREATE DYNAMIC TABLE gold.daily\n  TARGET_LAG = '1 hour'\n  WAREHOUSE = wh_dev\nAS\n  SELECT day, SUM(amount) AS revenue\n  FROM silver.orders GROUP BY day;` },
      ],
    },
    {
      title: 'Access and cost',
      entries: [
        { label: 'Role and grant', code: `CREATE ROLE analyst;\nGRANT USAGE ON WAREHOUSE wh_dev TO ROLE analyst;\nGRANT SELECT ON ALL TABLES IN SCHEMA gold TO ROLE analyst;\nGRANT ROLE analyst TO USER ada;` },
        { label: 'Masking', code: `CREATE MASKING POLICY hide_email AS (v STRING)\n  RETURNS STRING ->\n    CASE WHEN CURRENT_ROLE() = 'ADMIN'\n      THEN v ELSE '***' END;\nALTER TABLE customers\n  MODIFY COLUMN email SET MASKING POLICY hide_email;` },
        { label: 'Credits', code: `# a warehouse burns credits while it is running\nALTER WAREHOUSE wh_dev SET AUTO_SUSPEND = 60;\n# resource monitor: stop a warehouse at a credit limit` },
      ],
    },
  ],
  projects: [
    { title: 'Dev warehouse', level: 'Beginner', build: 'An X-Small warehouse that suspends after 60 seconds, a database, and a raw schema. Show it resumes on the next query.', skills: ['warehouses', 'auto-suspend', 'schemas'] },
    { title: 'COPY a CSV', level: 'Beginner', build: 'Stage a small orders file, COPY it into a table, and read load_history for the rows parsed and the rows rejected.', skills: ['stages', 'COPY INTO', 'file formats'] },
    { title: 'Silver MERGE', level: 'Intermediate', build: 'Load the same order id twice with a new amount. A MERGE keeps one row and the latest amount. Run it again and show the row count does not grow.', skills: ['MERGE', 'idempotency', 'QUALIFY'] },
    { title: 'Clone, then Time Travel', level: 'Intermediate', build: 'Clone a table, delete a row from the clone, and restore that row with Time Travel. The original table is unchanged.', skills: ['clone', 'Time Travel', 'UNDROP'] },
    { title: 'Stream and a task', level: 'Advanced', build: 'A stream on raw orders and a task that MERGEs the stream into silver every hour. Suspend the task and show the stream still holds the changes.', skills: ['streams', 'tasks', 'incremental'] },
  ],
}
