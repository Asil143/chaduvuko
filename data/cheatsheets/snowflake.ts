import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const snowflakeCheatSheet: TrackCheatSheet = {
  track: 'snowflake',
  title: 'Snowflake',
  trackHref: '/learn/snowflake',
  accent: '#29b5e8',
  blurb: 'Warehouses, COPY, Time Travel, tasks, and access control — the Snowflake SQL from the track on one page. Bookmark it.',
  sections: [
    {
      title: 'Warehouses',
      entries: [
        { label: 'Create one', code: `CREATE WAREHOUSE analytics_wh\n  WAREHOUSE_SIZE = 'XSMALL'\n  AUTO_SUSPEND = 60\n  AUTO_RESUME = TRUE\n  INITIALLY_SUSPENDED = TRUE;\n-- storage is separate from this compute\n-- a repeated query can hit result cache without resuming the warehouse` },
        { label: 'Resize and scale out', code: `ALTER WAREHOUSE analytics_wh SET WAREHOUSE_SIZE = 'SMALL';\n\nALTER WAREHOUSE load_wh SET\n  MIN_CLUSTER_COUNT = 1\n  MAX_CLUSTER_COUNT = 3\n  SCALING_POLICY = 'STANDARD';\n-- STANDARD adds a cluster quickly; ECONOMY waits to save credits\n-- a bigger size speeds one query; more clusters take more concurrent queries` },
        { label: 'Use and suspend', code: `USE WAREHOUSE analytics_wh;\nALTER WAREHOUSE analytics_wh SUSPEND;\n-- auto-suspend stops credit use about a minute after the last query` },
      ],
    },
    {
      title: 'Databases and schemas',
      entries: [
        { label: 'Database, schema, tables', code: `CREATE DATABASE analytics;\nCREATE SCHEMA analytics.raw;\nCREATE SCHEMA analytics.gold;\n\nCREATE TABLE analytics.raw.orders (\n  order_id NUMBER,\n  customer_id NUMBER,\n  amount NUMBER(12, 2),\n  ordered_at TIMESTAMP_NTZ,\n  updated_at TIMESTAMP_NTZ\n);\nCREATE TABLE analytics.gold.orders LIKE analytics.raw.orders;\n\nCREATE TABLE analytics.gold.customers (\n  customer_id NUMBER,\n  email STRING,\n  region STRING\n);` },
        { label: 'Medallion schemas', code: `CREATE SCHEMA analytics.raw;     -- landed files, lightly typed\nCREATE SCHEMA analytics.silver;  -- cleaned and deduped\nCREATE SCHEMA analytics.gold;    -- marts people query\n-- ELT loads raw first, then transforms inside Snowflake` },
        { label: 'Names', code: `USE DATABASE analytics;\nUSE SCHEMA gold;\nSELECT order_id FROM analytics.gold.orders;\n-- unquoted names are stored uppercase\n-- a three-part name still works after USE SCHEMA changes` },
      ],
    },
    {
      title: 'Access control',
      entries: [
        { label: 'Role and user', code: `CREATE ROLE analyst;\nCREATE ROLE loader;\nCREATE USER avery\n  DEFAULT_ROLE = analyst\n  DEFAULT_WAREHOUSE = analytics_wh\n  DEFAULT_NAMESPACE = analytics.gold;\nGRANT ROLE analyst TO USER avery;\n-- set the password or key pair outside this script\n-- grant roles to users, and privileges to roles` },
        { label: 'Least privilege', code: `GRANT USAGE ON WAREHOUSE analytics_wh TO ROLE analyst;\nGRANT USAGE ON DATABASE analytics TO ROLE analyst;\nGRANT USAGE ON SCHEMA analytics.gold TO ROLE analyst;\nGRANT SELECT ON ALL TABLES IN SCHEMA analytics.gold TO ROLE analyst;\n-- USAGE on the warehouse, database, and schema is required before SELECT\n-- loader can insert into raw; analyst cannot` },
        { label: 'Future grants', code: `GRANT SELECT ON FUTURE TABLES IN SCHEMA analytics.gold TO ROLE analyst;\nGRANT INSERT, SELECT ON FUTURE TABLES IN SCHEMA analytics.raw TO ROLE loader;\n-- ALL covers tables that already exist\n-- FUTURE covers tables created later` },
        { label: 'Ownership', code: `GRANT OWNERSHIP ON TABLE analytics.raw.orders TO ROLE loader\n  COPY CURRENT GRANTS;\n-- the owner can alter and drop\n-- COPY CURRENT GRANTS keeps the privileges already given out` },
      ],
    },
    {
      title: 'Stages and COPY',
      entries: [
        { label: 'File format', code: `CREATE FILE FORMAT analytics.raw.csv_ff\n  TYPE = CSV\n  FIELD_OPTIONALLY_ENCLOSED_BY = '"'\n  SKIP_HEADER = 1\n  NULL_IF = ('', 'NULL')\n  EMPTY_FIELD_AS_NULL = TRUE;` },
        { label: 'Internal and external stage', code: `CREATE STAGE analytics.raw.orders_stage\n  FILE_FORMAT = analytics.raw.csv_ff;\n\nPUT file://orders.csv @analytics.raw.orders_stage AUTO_COMPRESS = TRUE;\n\nCREATE STAGE analytics.raw.orders_s3\n  URL = 's3://example-bucket/orders/'\n  STORAGE_INTEGRATION = orders_int\n  FILE_FORMAT = analytics.raw.csv_ff;\n-- PUT feeds an internal stage; an external stage points at cloud files` },
        { label: 'COPY INTO', code: `COPY INTO analytics.raw.orders (order_id, customer_id, amount, ordered_at)\nFROM (\n  SELECT $1, $2, $3, $4::TIMESTAMP_NTZ\n  FROM @analytics.raw.orders_stage\n)\nFILE_FORMAT = (FORMAT_NAME = analytics.raw.csv_ff)\nON_ERROR = 'ABORT_STATEMENT';\n-- $1 is the first file column; SKIP_HEADER already dropped the header\n-- ON_ERROR = CONTINUE keeps the good rows and records the rest` },
        { label: 'Validate and history', code: `COPY INTO analytics.raw.orders (order_id, customer_id, amount, ordered_at)\nFROM (\n  SELECT $1, $2, $3, $4::TIMESTAMP_NTZ\n  FROM @analytics.raw.orders_stage\n)\nFILE_FORMAT = (FORMAT_NAME = analytics.raw.csv_ff)\nVALIDATION_MODE = 'RETURN_ERRORS';\n\nSELECT file_name, status, row_count, row_parsed, first_error_message\nFROM information_schema.load_history\nWHERE table_name = 'ORDERS'\nORDER BY last_load_time DESC;\n-- VALIDATION_MODE loads nothing; it only returns errors` },
      ],
    },
    {
      title: 'Semi-structured data',
      entries: [
        { label: 'Load JSON', code: `CREATE FILE FORMAT analytics.raw.json_ff TYPE = JSON;\nCREATE TABLE analytics.raw.events (raw VARIANT);\n\nCOPY INTO analytics.raw.events (raw)\nFROM (SELECT $1 FROM @analytics.raw.orders_stage)\nFILE_FORMAT = (FORMAT_NAME = analytics.raw.json_ff);` },
        { label: 'Read a path', code: `SELECT\n  raw:order_id::NUMBER AS order_id,\n  raw:customer.name::STRING AS customer_name,\n  raw:items[0].sku::STRING AS first_sku\nFROM analytics.raw.events;\n-- a missing path is NULL, not an error` },
        { label: 'Flatten an array', code: `SELECT\n  e.raw:order_id::NUMBER AS order_id,\n  item.value:sku::STRING AS sku,\n  item.value:qty::NUMBER AS qty\nFROM analytics.raw.events e,\nLATERAL FLATTEN(input => e.raw:items) item;` },
      ],
    },
    {
      title: 'MERGE and idempotency',
      entries: [
        { label: 'Upsert', code: `MERGE INTO analytics.gold.orders t\nUSING analytics.silver.orders_staged s\n  ON t.order_id = s.order_id\nWHEN MATCHED AND s.updated_at >= t.updated_at THEN UPDATE SET\n  amount = s.amount,\n  updated_at = s.updated_at\nWHEN NOT MATCHED THEN INSERT (order_id, customer_id, amount, ordered_at, updated_at)\n  VALUES (s.order_id, s.customer_id, s.amount, s.ordered_at, s.updated_at);\n-- running the same batch again should not insert a second row` },
        { label: 'Dedupe the source', code: `SELECT *\nFROM analytics.silver.orders_staged\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY order_id ORDER BY updated_at DESC\n) = 1;\n-- use this as the MERGE source when one batch repeats a key` },
        { label: 'Watermark', code: `SELECT *\nFROM analytics.raw.orders\nWHERE updated_at > (\n  SELECT COALESCE(MAX(updated_at), '1970-01-01'::TIMESTAMP_NTZ)\n  FROM analytics.gold.orders\n);\n-- a row older than the watermark is skipped\n-- a stream on the raw table still sees it` },
      ],
    },
    {
      title: 'Time Travel and cloning',
      entries: [
        { label: 'Query the past', code: `SELECT * FROM analytics.gold.orders AT (OFFSET => -900);\nSELECT * FROM analytics.gold.orders\n  AT (TIMESTAMP => DATEADD(minute, -30, CURRENT_TIMESTAMP()));\nSELECT * FROM analytics.gold.orders BEFORE (STATEMENT => '<query_id>');\n-- OFFSET is seconds ago; paste a real query id into BEFORE` },
        { label: 'Restore', code: `CREATE TABLE analytics.gold.orders_restore\n  CLONE analytics.gold.orders AT (OFFSET => -900);\n\nALTER TABLE analytics.gold.orders SWAP WITH analytics.gold.orders_restore;\n\nUNDROP TABLE analytics.gold.orders;\n-- UNDROP works only inside the Time Travel window\n-- Fail-safe is a further 7 days on permanent tables, and you cannot query it` },
        { label: 'Retention', code: `ALTER TABLE analytics.gold.orders SET DATA_RETENTION_TIME_IN_DAYS = 1;\n\nCREATE TRANSIENT TABLE analytics.raw.orders_landing (\n  order_id NUMBER,\n  raw VARIANT\n);\n-- transient tables skip Fail-safe\n-- a longer retention keeps more history and more storage` },
        { label: 'Zero-copy clone', code: `CREATE DATABASE analytics_dev CLONE analytics;\n-- storage is shared until a row changes\n-- grants on the database itself are not copied; check access before use` },
      ],
    },
    {
      title: 'Streams and tasks',
      entries: [
        { label: 'Stream', code: `CREATE OR REPLACE STREAM analytics.raw.orders_stream\n  ON TABLE analytics.raw.orders\n  APPEND_ONLY = TRUE;\n\nSELECT order_id, customer_id, amount, ordered_at, updated_at\nFROM analytics.raw.orders_stream;\n-- rows since the stream was last consumed by DML\n-- APPEND_ONLY is inserts; a standard stream also shows updates and deletes` },
        { label: 'Task consumes the stream', code: `CREATE OR REPLACE TASK analytics.raw.merge_orders\n  WAREHOUSE = analytics_wh\n  SCHEDULE = '5 MINUTE'\n  WHEN SYSTEM$STREAM_HAS_DATA('analytics.raw.orders_stream')\nAS\n  MERGE INTO analytics.gold.orders t\n  USING (\n    SELECT order_id, customer_id, amount, ordered_at, updated_at\n    FROM analytics.raw.orders_stream\n  ) s\n    ON t.order_id = s.order_id\n  WHEN MATCHED THEN UPDATE SET\n    amount = s.amount,\n    updated_at = s.updated_at\n  WHEN NOT MATCHED THEN INSERT (order_id, customer_id, amount, ordered_at, updated_at)\n    VALUES (s.order_id, s.customer_id, s.amount, s.ordered_at, s.updated_at);\n-- a successful DML that reads the stream advances its offset\n-- WHEN skips the warehouse when the stream is empty` },
        { label: 'Task graph', code: `CREATE OR REPLACE TASK analytics.gold.build_daily\n  WAREHOUSE = analytics_wh\n  AFTER analytics.raw.merge_orders\nAS\n  CREATE OR REPLACE TABLE analytics.gold.daily_sales AS\n  SELECT ordered_at::DATE AS order_date, SUM(amount) AS revenue\n  FROM analytics.gold.orders\n  GROUP BY 1;\n\nALTER TASK analytics.gold.build_daily RESUME;\nALTER TASK analytics.raw.merge_orders RESUME;\n-- the child has AFTER, not its own schedule\n-- resume the child, then the root` },
        { label: 'Serverless task', code: `CREATE OR REPLACE TASK analytics.raw.merge_orders_serverless\n  USER_TASK_MANAGED_INITIAL_WAREHOUSE_SIZE = 'XSMALL'\n  SCHEDULE = '5 MINUTE'\n  WHEN SYSTEM$STREAM_HAS_DATA('analytics.raw.orders_stream')\nAS\n  MERGE INTO analytics.gold.orders t\n  USING (\n    SELECT order_id, customer_id, amount, ordered_at, updated_at\n    FROM analytics.raw.orders_stream\n  ) s\n    ON t.order_id = s.order_id\n  WHEN NOT MATCHED THEN INSERT (order_id, customer_id, amount, ordered_at, updated_at)\n    VALUES (s.order_id, s.customer_id, s.amount, s.ordered_at, s.updated_at);\n-- no WAREHOUSE clause; Snowflake sizes the compute\n-- an append-only stream is inserts, so NOT MATCHED is the path that fires` },
      ],
    },
    {
      title: 'Snowpipe and dynamic tables',
      entries: [
        { label: 'Pipe', code: `CREATE OR REPLACE PIPE analytics.raw.orders_pipe\n  AUTO_INGEST = TRUE\nAS\n  COPY INTO analytics.raw.orders (order_id, customer_id, amount, ordered_at)\n  FROM (\n    SELECT $1, $2, $3, $4::TIMESTAMP_NTZ\n    FROM @analytics.raw.orders_s3\n  )\n  FILE_FORMAT = (FORMAT_NAME = analytics.raw.csv_ff);\n-- a cloud notification wakes the pipe for new files\n-- a large nightly drop is often a scheduled COPY or a task instead` },
        { label: 'Load what is already there', code: `ALTER PIPE analytics.raw.orders_pipe REFRESH;\n\nSELECT SYSTEM$PIPE_STATUS('analytics.raw.orders_pipe');\n-- REFRESH copies files already sitting in the stage\n-- read pendingFileCount and the last error before calling the pipe healthy` },
        { label: 'Dynamic table', code: `CREATE OR REPLACE DYNAMIC TABLE analytics.gold.daily_orders\n  TARGET_LAG = '15 minutes'\n  WAREHOUSE = analytics_wh\n  REFRESH_MODE = AUTO\nAS\n  SELECT ordered_at::DATE AS order_date, SUM(amount) AS revenue\n  FROM analytics.gold.orders\n  GROUP BY 1;\n-- you declare the SELECT and a lag; Snowflake refreshes it\n-- AUTO, INCREMENTAL, or FULL; a task graph is the manual version` },
      ],
    },
    {
      title: 'Cost and governance',
      entries: [
        { label: 'See the credits', code: `ALTER WAREHOUSE analytics_wh SET\n  AUTO_SUSPEND = 60\n  STATEMENT_TIMEOUT_IN_SECONDS = 1800;\n\nSELECT warehouse_name, SUM(credits_used) AS credits\nFROM snowflake.account_usage.warehouse_metering_history\nWHERE start_time > DATEADD(day, -7, CURRENT_TIMESTAMP())\nGROUP BY 1\nORDER BY 2 DESC;\n-- account_usage can lag by about an hour` },
        { label: 'Resource monitor', code: `CREATE RESOURCE MONITOR analytics_budget\n  WITH CREDIT_QUOTA = 100\n  FREQUENCY = MONTHLY\n  START_TIMESTAMP = IMMEDIATELY\n  TRIGGERS\n    ON 80 PERCENT DO NOTIFY\n    ON 100 PERCENT DO SUSPEND\n    ON 110 PERCENT DO SUSPEND_IMMEDIATE;\n\nALTER WAREHOUSE analytics_wh SET RESOURCE_MONITOR = analytics_budget;` },
        { label: 'Masking policy', code: `CREATE OR REPLACE MASKING POLICY analytics.gold.mask_email AS (val STRING)\n  RETURNS STRING ->\n    CASE\n      WHEN IS_ROLE_IN_SESSION('PII_ADMIN') THEN val\n      ELSE '***'\n    END;\n\nALTER TABLE analytics.gold.customers MODIFY COLUMN email\n  SET MASKING POLICY analytics.gold.mask_email;\n\nCREATE TAG analytics.gold.pii ALLOWED_VALUES 'email', 'name';\nALTER TABLE analytics.gold.customers MODIFY COLUMN email\n  SET TAG analytics.gold.pii = 'email';` },
        { label: 'Row access', code: `CREATE OR REPLACE ROW ACCESS POLICY analytics.gold.region_policy\n  AS (region STRING) RETURNS BOOLEAN ->\n    IS_ROLE_IN_SESSION('ANALYST_ALL') OR region = 'IN';\n\nALTER TABLE analytics.gold.customers\n  ADD ROW ACCESS POLICY analytics.gold.region_policy ON (region);\n\nSELECT query_id, query_start_time\nFROM snowflake.account_usage.access_history\nWHERE query_start_time > DATEADD(day, -1, CURRENT_TIMESTAMP());\n-- a masking policy hides a value; a row policy hides rows` },
      ],
    },
  ],
  projects: [
    { title: 'Analytics warehouse', level: 'Beginner', build: 'Create an X-Small warehouse that auto-suspends, with raw and gold schemas and an orders table. Add an analyst role that can select from gold, including tables created later, and nothing in raw.', skills: ['warehouses', 'schemas', 'roles', 'future grants'] },
    { title: 'CSV load', level: 'Beginner', build: 'Define a CSV file format, PUT a file into an internal stage, and COPY into orders. Run validation first, then check load history for rows loaded versus rows parsed.', skills: ['stages', 'file formats', 'COPY INTO', 'load history'] },
    { title: 'JSON orders merge', level: 'Intermediate', build: 'Land order JSON as VARIANT, flatten the line-item array, and MERGE a deduped set into a current orders table on order_id. Run the MERGE twice and show that the grain does not double.', skills: ['VARIANT', 'FLATTEN', 'MERGE', 'idempotency'] },
    { title: 'Stream and task pipeline', level: 'Intermediate', build: 'Put an append-only stream on raw orders and a task that MERGEs it into gold every five minutes, skipping empty runs. Add a child task for a daily revenue rollup and resume the child before the root.', skills: ['streams', 'tasks', 'task graph', 'incremental'] },
    { title: 'Safe dev copy', level: 'Advanced', build: 'Clone analytics into a dev database and restore a bad update with a clone at an offset. Mask customer email for everyone except PII_ADMIN, and cap the dev warehouse with a resource monitor.', skills: ['clone', 'Time Travel', 'masking', 'resource monitors'] },
  ],
}
