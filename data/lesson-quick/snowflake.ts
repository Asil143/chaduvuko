import type { LessonQuick } from '@/lib/lesson-quick'

const S = '/learn/snowflake'

// Snowflake SQL needs a Snowflake account, so it is shown as code. Plain-SQL ideas that any
// engine shares run on FreshCart instead.
export const SNOWFLAKE_QUICK: Record<string, LessonQuick> = {
  [`${S}/what-is-snowflake`]: {
    answer: 'Snowflake is a cloud data warehouse built for analytics (OLAP): large scans, joins and aggregates for dashboards and ELT, not row-by-row app transactions. Its defining idea is separating storage from compute, so each team\'s compute scales independently over one shared copy of the data.',
    points: [
      'OLTP databases (Postgres, MySQL) run apps; OLAP warehouses answer analytical questions.',
      'You pay for storage and for compute while it runs, separately.',
      'Compared with BigQuery, Redshift and Databricks mainly on pricing and operating model.',
    ],
    example: {
      label: 'An analytical (OLAP) query: scan, join, aggregate',
      lang: 'sql',
      code: `SELECT s.city, COUNT(*) AS orders, ROUND(SUM(o.total_amount), 2) AS revenue
FROM orders AS o
JOIN stores AS s ON s.store_id = o.store_id
GROUP BY s.city
ORDER BY revenue DESC
LIMIT 5;`,
    },
    check: {
      question: 'What is Snowflake mainly built for?',
      options: ['Running an app\'s checkout transactions', 'Analytical queries over large data', 'Caching sessions', 'Streaming video'],
      answer: 1,
      explanation: 'It is an OLAP warehouse: optimised for scans and aggregates, not single-row transactional updates.',
    },
  },

  [`${S}/architecture`]: {
    answer: 'Snowflake has three layers: storage (compressed, immutable micro-partitions on cloud object storage), compute (virtual warehouses, independent clusters you size and suspend) and cloud services (metadata, optimisation, security and the result cache).',
    points: [
      'Warehouses hold no data; many can read the same tables without contention.',
      'Micro-partitions are 50–500 MB uncompressed with min/max metadata per column.',
      'Results, local disk and metadata are the three caches.',
    ],
    example: {
      label: 'Separate warehouses for separate workloads',
      lang: 'sql',
      code: `CREATE WAREHOUSE etl_wh WAREHOUSE_SIZE = 'MEDIUM' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;
CREATE WAREHOUSE bi_wh  WAREHOUSE_SIZE = 'SMALL'  AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;
-- both query the same tables; neither slows the other`,
      static: true,
    },
    check: {
      question: 'What is a virtual warehouse in Snowflake?',
      options: ['A database', 'A compute cluster that runs queries', 'A storage bucket', 'A schema'],
      answer: 1,
      explanation: 'Warehouses are compute only; data lives in the shared storage layer.',
    },
  },

  [`${S}/setup-and-sql-basics`]: {
    answer: 'Snowflake objects nest as account → database → schema → table, while warehouses sit beside that tree as account-level compute. Each session has a current role, warehouse, database and schema, and unqualified names resolve against them.',
    points: [
      'Set AUTO_SUSPEND and AUTO_RESUME on every warehouse.',
      'USE ROLE, USE WAREHOUSE, USE DATABASE, USE SCHEMA set the context.',
      'A query fails without a running or resumable warehouse.',
    ],
    example: {
      label: 'Create the basics and set the session context',
      lang: 'sql',
      code: `CREATE WAREHOUSE dev_wh WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE INITIALLY_SUSPENDED = TRUE;
CREATE DATABASE freshcart;
CREATE SCHEMA freshcart.raw;

USE WAREHOUSE dev_wh;
USE SCHEMA freshcart.raw;
CREATE TABLE orders (order_id NUMBER, order_date DATE, total_amount NUMBER(10, 2));`,
      static: true,
    },
    check: {
      question: 'Where do warehouses sit in Snowflake\'s object hierarchy?',
      options: ['Inside a schema', 'Inside a database', 'At the account level, outside the database tree', 'Inside a table'],
      answer: 2,
      explanation: 'Warehouses are account-level compute, separate from the account → database → schema → table tree.',
    },
  },

  [`${S}/roles-security-basics`]: {
    answer: 'Snowflake uses role-based access control: privileges are granted to roles, and roles are granted to users or other roles. To query a table, a role needs USAGE on the warehouse, database and schema, plus SELECT on the table.',
    points: [
      'Keep ACCOUNTADMIN and SYSADMIN for administration, not daily work.',
      'Future grants cover tables created later in a schema.',
      'Give each service its own least-privilege role.',
    ],
    example: {
      label: 'Everything an analyst role needs to read one schema',
      lang: 'sql',
      code: `CREATE ROLE analyst;
GRANT USAGE ON WAREHOUSE bi_wh TO ROLE analyst;
GRANT USAGE ON DATABASE freshcart TO ROLE analyst;
GRANT USAGE ON SCHEMA freshcart.gold TO ROLE analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA freshcart.gold TO ROLE analyst;
GRANT SELECT ON FUTURE TABLES IN SCHEMA freshcart.gold TO ROLE analyst;
GRANT ROLE analyst TO USER ava;`,
      static: true,
    },
    check: {
      question: 'A role has SELECT on a table but the query fails. What is commonly missing?',
      options: ['A primary key', 'USAGE on the warehouse, database or schema', 'An index', 'A view'],
      answer: 1,
      explanation: 'Reaching the table needs USAGE on every container above it, plus a warehouse to run on.',
    },
  },

  [`${S}/loading-data`]: {
    answer: 'Snowflake loads files with three pieces: a stage (where the files are: internal, or external S3/ADLS/GCS), a file format (CSV, JSON, Parquet options) and COPY INTO, which loads the files and remembers which ones it has already loaded.',
    points: [
      'Load metadata skips files already loaded, which keeps COPY idempotent.',
      'VALIDATION_MODE previews errors without loading.',
      'Use a storage integration for external stages, not keys in SQL.',
    ],
    example: {
      label: 'Load CSV files from S3',
      lang: 'sql',
      code: `CREATE FILE FORMAT csv_fmt TYPE = CSV SKIP_HEADER = 1 FIELD_OPTIONALLY_ENCLOSED_BY = '"';
CREATE STAGE orders_stage URL = 's3://acme-landing/orders/'
  STORAGE_INTEGRATION = s3_int FILE_FORMAT = csv_fmt;

COPY INTO raw.orders FROM @orders_stage PATTERN = '.*2024-03-.*[.]csv' ON_ERROR = 'ABORT_STATEMENT';`,
      static: true,
    },
    check: {
      question: 'You run the same COPY INTO twice. What happens to files already loaded?',
      options: ['They load again as duplicates', 'They are skipped using load metadata', 'COPY fails', 'They are deleted'],
      answer: 1,
      explanation: 'Snowflake records loaded files for 64 days and skips them unless you force a reload.',
    },
  },

  [`${S}/semi-structured-data`]: {
    answer: 'Snowflake stores JSON in VARIANT columns. You read nested fields with path notation (payload:customer.city), cast them to real types with ::, and turn arrays into rows with LATERAL FLATTEN.',
    points: [
      'Cast extracted values: payload:total::NUMBER(10,2).',
      'FLATTEN gives one row per array element.',
      'Curated tables should hold typed columns, not raw VARIANT.',
    ],
    example: {
      label: 'Query nested JSON and flatten its items',
      lang: 'sql',
      code: `SELECT e.payload:order_id::NUMBER        AS order_id,
       e.payload:customer.city::STRING   AS city,
       i.value:sku::STRING               AS sku,
       i.value:qty::NUMBER               AS qty
FROM raw.order_events AS e,
     LATERAL FLATTEN(input => e.payload:items) AS i;`,
      static: true,
    },
    check: {
      question: 'What does LATERAL FLATTEN do?',
      options: ['Compresses JSON', 'Turns each element of an array into its own row', 'Removes nulls', 'Converts JSON to CSV'],
      answer: 1,
      explanation: 'FLATTEN expands an array (or object) so each element becomes a row you can select from.',
    },
  },

  [`${S}/elt-medallion`]: {
    answer: 'In Snowflake, ELT loads raw data first and transforms it inside the warehouse with SQL, organised in layers: raw keeps source-shaped data with load metadata, silver holds clean, typed, deduplicated entities, and gold holds business-ready marts.',
    points: [
      'Keep raw unchanged so you can rebuild later layers.',
      'Silver is where types, deduplication and tests apply.',
      'Gold models answer specific business questions.',
    ],
    example: {
      label: 'A silver step: typed and deduplicated',
      lang: 'sql',
      code: `SELECT order_id, customer_id, order_date, total_amount
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY order_date DESC) AS rn
  FROM orders
)
WHERE rn = 1
LIMIT 4;`,
    },
    check: {
      question: 'In which layer should deduplication happen?',
      options: ['Raw', 'Silver', 'Gold only', 'Nowhere'],
      answer: 1,
      explanation: 'Raw keeps everything as received; silver produces one clean row per entity.',
    },
  },

  [`${S}/merge-idempotency`]: {
    answer: 'MERGE upserts staged rows into a target: it updates rows that match on the key and inserts the rest. Deduplicate the staging data first and match on the target\'s grain, so the same load can run again without creating duplicates.',
    points: [
      'The ON clause must match the target\'s grain.',
      'Duplicate keys in the source make MERGE fail or behave unpredictably.',
      'Track loads in an audit table with watermarks.',
    ],
    example: {
      label: 'An idempotent upsert',
      lang: 'sql',
      code: `MERGE INTO silver.orders AS t
USING (
  SELECT * FROM staging.orders
  QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1
) AS s
ON t.order_id = s.order_id
WHEN MATCHED AND s.updated_at > t.updated_at THEN UPDATE SET status = s.status, updated_at = s.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, status, updated_at) VALUES (s.order_id, s.status, s.updated_at);`,
      static: true,
    },
    check: {
      question: 'Why deduplicate the source before a MERGE?',
      options: ['MERGE is faster on small tables', 'Several source rows matching one target row cause errors or nondeterministic updates', 'Snowflake requires sorted input', 'To save storage'],
      answer: 1,
      explanation: 'Each target row should match at most one source row; duplicates make the result ambiguous.',
    },
  },

  [`${S}/time-travel-cloning`]: {
    answer: 'Time Travel lets you query, clone or restore data as it was at an earlier time within the retention period (1 day by default, up to 90 on Enterprise). UNDROP restores dropped objects, and zero-copy cloning creates instant copies that share storage until changed. Fail-safe adds 7 days recoverable only by Snowflake support.',
    points: [
      'Use AT (OFFSET => …) or BEFORE (STATEMENT => …) to read past states.',
      'Clones cost nothing until the copy or original changes.',
      'Longer retention means more storage cost.',
    ],
    example: {
      label: 'Recover from a bad update',
      lang: 'sql',
      code: `-- what the table looked like an hour ago
SELECT COUNT(*) FROM orders AT (OFFSET => -3600);

-- restore it as a clone from before the bad statement
CREATE TABLE orders_restored CLONE orders BEFORE (STATEMENT => '01b2c3d4-0000-1234-0000-000000000abc');

UNDROP TABLE customers;`,
      static: true,
    },
    check: {
      question: 'Who can recover data during Fail-safe?',
      options: ['Any user', 'Only Snowflake support', 'ACCOUNTADMIN with UNDROP', 'Nobody'],
      answer: 1,
      explanation: 'Fail-safe is a last-resort 7-day window that only Snowflake can recover from; Time Travel is self-service.',
    },
  },

  [`${S}/snowpipe`]: {
    answer: 'Snowpipe loads files continuously as they arrive, without a running warehouse of your own: a pipe wraps a COPY INTO statement, and cloud notifications (such as S3 events) tell it when new files land. It suits a steady flow of files, not millisecond streaming.',
    points: [
      'AUTO_INGEST = TRUE uses bucket notifications.',
      'Files of roughly 100–250 MB compressed load most efficiently.',
      'Check SYSTEM$PIPE_STATUS and COPY_HISTORY for errors.',
    ],
    example: {
      label: 'An auto-ingest pipe',
      lang: 'sql',
      code: `CREATE PIPE raw.orders_pipe AUTO_INGEST = TRUE AS
  COPY INTO raw.orders
  FROM @orders_stage
  FILE_FORMAT = (FORMAT_NAME = 'csv_fmt');

SELECT SYSTEM$PIPE_STATUS('raw.orders_pipe');`,
      static: true,
    },
    check: {
      question: 'What is Snowpipe best suited for?',
      options: ['Millisecond event streaming', 'Continuously arriving files', 'Running dbt models', 'Ad-hoc analysis'],
      answer: 1,
      explanation: 'It is file-based continuous loading; for row-level low latency there is Snowpipe Streaming.',
    },
  },

  [`${S}/streams-and-tasks`]: {
    answer: 'A stream records the inserts, updates and deletes made to a table since it was last consumed; a task runs SQL on a schedule or after another task. Together they build incremental pipelines: a task MERGEs from a stream, and consuming it in DML advances the stream.',
    points: [
      'Selecting from a stream does not advance it; using it in DML does.',
      'A stream not consumed within the retention period goes stale.',
      'Tasks are created suspended; resume them.',
    ],
    example: {
      label: 'An incremental task fed by a stream',
      lang: 'sql',
      code: `CREATE STREAM raw.orders_changes ON TABLE raw.orders;

CREATE TASK load_silver_orders
  WAREHOUSE = etl_wh
  SCHEDULE = '5 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('raw.orders_changes')
AS
  MERGE INTO silver.orders t USING raw.orders_changes s ON t.order_id = s.order_id
  WHEN MATCHED THEN UPDATE SET status = s.status
  WHEN NOT MATCHED THEN INSERT (order_id, status) VALUES (s.order_id, s.status);

ALTER TASK load_silver_orders RESUME;`,
      static: true,
    },
    check: {
      question: 'What advances a stream\'s offset?',
      options: ['A SELECT from the stream', 'Using the stream in a DML statement that commits', 'Time passing', 'Creating a task'],
      answer: 1,
      explanation: 'Consumption happens in committed DML such as INSERT or MERGE; plain queries leave the stream as it was.',
    },
  },

  [`${S}/dynamic-tables`]: {
    answer: 'A dynamic table is defined by a SELECT plus a TARGET_LAG, and Snowflake keeps it refreshed to within that lag, incrementally when it can trace changes and fully otherwise. It replaces a stream, a task and a hand-written MERGE with one declaration.',
    points: [
      'TARGET_LAG is a freshness goal, not a fixed schedule.',
      'Check refresh_mode to confirm it refreshes incrementally.',
      'Dynamic tables can depend on each other to form a pipeline.',
    ],
    example: {
      label: 'A declarative daily revenue table',
      lang: 'sql',
      code: `CREATE DYNAMIC TABLE gold.daily_revenue
  TARGET_LAG = '15 minutes'
  WAREHOUSE = etl_wh
AS
SELECT order_date, store_id, SUM(total_amount) AS revenue
FROM silver.orders
WHERE order_status = 'Delivered'
GROUP BY order_date, store_id;`,
      static: true,
    },
    check: {
      question: 'What does TARGET_LAG = \'15 minutes\' promise?',
      options: ['A refresh exactly every 15 minutes', 'Data at most about 15 minutes behind its sources', 'A 15-minute query timeout', 'Retention of 15 minutes'],
      answer: 1,
      explanation: 'It is a freshness target; Snowflake schedules refreshes to meet it.',
    },
  },

  [`${S}/performance-tuning`]: {
    answer: 'Snowflake query speed comes mostly from micro-partition pruning: skipping partitions whose min/max metadata rules them out. Filter on raw columns (not wrapped in functions), read the Query Profile to find pruning loss or spilling, consider clustering keys for huge tables, and resize warehouses only after that.',
    points: [
      'DATE(col) = … hides the column from pruning; use a range on col.',
      'Spilling to disk means the warehouse is too small for that query.',
      'Check SYSTEM$CLUSTERING_INFORMATION before adding CLUSTER BY.',
    ],
    example: {
      label: 'A prunable filter vs a function on the column',
      lang: 'sql',
      code: `-- hides the column from pruning
SELECT SUM(total_amount) FROM orders WHERE DATE(order_ts) = '2024-03-15';

-- prunable range on the raw column
SELECT SUM(total_amount) FROM orders
WHERE order_ts >= '2024-03-15' AND order_ts < '2024-03-16';`,
      static: true,
    },
    check: {
      question: 'What should you check before buying a bigger warehouse for a slow query?',
      options: ['The Query Profile, for pruning and spilling', 'The number of users', 'The table\'s column count', 'Nothing; just resize'],
      answer: 0,
      explanation: 'Pruning loss and spilling have different fixes; resizing only helps some causes.',
    },
  },

  [`${S}/cost-optimization`]: {
    answer: 'Snowflake compute is billed per second (60-second minimum per resume) only while a warehouse runs, and storage separately. Control cost with short AUTO_SUSPEND, right-sized warehouses, multi-cluster only where concurrency needs it, resource monitors, and ACCOUNT_USAGE views to see where credits go.',
    points: [
      'Idle warehouses with long AUTO_SUSPEND are the most common waste.',
      'A bigger warehouse that finishes faster can cost less.',
      'Resource monitors can notify or suspend at a credit limit.',
    ],
    example: {
      label: 'Credits used per warehouse in the last 30 days',
      lang: 'sql',
      code: `SELECT warehouse_name, ROUND(SUM(credits_used), 1) AS credits
FROM snowflake.account_usage.warehouse_metering_history
WHERE start_time >= DATEADD(day, -30, CURRENT_TIMESTAMP())
GROUP BY warehouse_name
ORDER BY credits DESC;`,
      static: true,
    },
    check: {
      question: 'A warehouse runs a 10-second query and suspends. How long is it billed for?',
      options: ['10 seconds', '60 seconds', '1 hour', 'Nothing'],
      answer: 1,
      explanation: 'Each resume bills at least 60 seconds, then per second after that.',
    },
  },

  [`${S}/advanced-security-governance`]: {
    answer: 'Beyond role-based access, Snowflake protects sensitive data at query time: masking policies return a real or masked value depending on the current role, row access policies decide which rows a role sees, tags label sensitive columns, and ACCESS_HISTORY shows who read what.',
    points: [
      'RBAC decides if you reach a table; policies decide what you see in it.',
      'A masking policy is a CASE expression attached to a column.',
      'Row access policies isolate regions or tenants.',
    ],
    example: {
      label: 'Mask email for everyone except a PII role',
      lang: 'sql',
      code: `CREATE MASKING POLICY email_mask AS (val STRING) RETURNS STRING ->
  CASE WHEN CURRENT_ROLE() IN ('PII_READER') THEN val
       ELSE REGEXP_REPLACE(val, '^[^@]+', '***') END;

ALTER TABLE customers MODIFY COLUMN email SET MASKING POLICY email_mask;`,
      static: true,
    },
    check: {
      question: 'What does a row access policy return for each row?',
      options: ['A masked value', 'TRUE or FALSE: whether the row is visible', 'The row count', 'A tag'],
      answer: 1,
      explanation: 'It is a boolean per row; rows returning FALSE are filtered out for that role.',
    },
  },

  [`${S}/data-sharing-marketplace`]: {
    answer: 'Secure Data Sharing gives another Snowflake account live, read-only access to your tables without copying them: create a share, grant objects into it, and add the consumer account. The consumer pays for its own compute; the Marketplace lists shared datasets publicly.',
    points: [
      'Shared data is always current: no copies, no pipelines.',
      'Consumers without Snowflake can use a reader account you manage.',
      'Share secure views to control exactly what is exposed.',
    ],
    example: {
      label: 'Share a gold table with a partner account',
      lang: 'sql',
      code: `CREATE SHARE partner_sales;
GRANT USAGE ON DATABASE freshcart TO SHARE partner_sales;
GRANT USAGE ON SCHEMA freshcart.gold TO SHARE partner_sales;
GRANT SELECT ON TABLE freshcart.gold.daily_revenue TO SHARE partner_sales;
ALTER SHARE partner_sales ADD ACCOUNTS = partner_org.partner_acct;`,
      static: true,
    },
    check: {
      question: 'Who pays for the compute when a consumer queries shared data?',
      options: ['The provider', 'The consumer', 'Snowflake', 'Nobody'],
      answer: 1,
      explanation: 'The consumer runs queries on its own warehouses; the provider pays only for storing the data.',
    },
  },

  [`${S}/snowflake-with-dbt`]: {
    answer: 'dbt organises Snowflake transformations into version-controlled models, tests, snapshots and documentation, while Snowflake runs every statement. Incremental models compile to Snowflake MERGE, and separate targets keep dev, CI and production apart.',
    points: [
      'Use source() for raw tables and ref() between models.',
      'Incremental merge models compile to MERGE INTO.',
      'Configure Snowflake options such as cluster_by in dbt.',
    ],
    example: {
      label: 'A dbt profile pointing at Snowflake',
      lang: 'yaml',
      code: `freshcart:
  target: dev
  outputs:
    dev:
      type: snowflake
      account: acme-xy12345
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      authenticator: externalbrowser
      role: transformer
      warehouse: etl_wh
      database: analytics
      schema: dbt_ava`,
      static: true,
    },
    check: {
      question: 'What does a dbt incremental model with the merge strategy compile to on Snowflake?',
      options: ['INSERT OVERWRITE', 'MERGE INTO', 'CREATE VIEW', 'COPY INTO'],
      answer: 1,
      explanation: 'dbt generates a MERGE that updates matching rows by unique_key and inserts new ones.',
    },
  },

  [`${S}/production-operations`]: {
    answer: 'Running Snowflake in production means watching it: ACCOUNT_USAGE views give long history but lag by up to a few hours, INFORMATION_SCHEMA functions are near real time with short retention, CREATE ALERT runs scheduled checks with actions, and runbooks and freshness SLOs guide responses.',
    points: [
      'Use INFORMATION_SCHEMA for urgent alerts, ACCOUNT_USAGE for trends.',
      'Alerts, like tasks, are created suspended.',
      'Write runbooks before the incident.',
    ],
    example: {
      label: 'Alert when the orders table goes stale',
      lang: 'sql',
      code: `CREATE ALERT orders_stale
  WAREHOUSE = ops_wh
  SCHEDULE = '15 MINUTE'
  IF (EXISTS (SELECT 1 FROM silver.orders HAVING MAX(loaded_at) < DATEADD(hour, -2, CURRENT_TIMESTAMP())))
  THEN CALL SYSTEM$SEND_EMAIL('ops_email', 'oncall@acme.com', 'orders is stale', 'No load in 2 hours');

ALTER ALERT orders_stale RESUME;`,
      static: true,
    },
    check: {
      question: 'Why not drive urgent alerts from ACCOUNT_USAGE views?',
      options: ['They are expensive', 'They can lag real time by up to a few hours', 'They are deprecated', 'They only show storage'],
      answer: 1,
      explanation: 'ACCOUNT_USAGE is complete but delayed; INFORMATION_SCHEMA functions are near real time.',
    },
  },

  [`${S}/snowflake-project`]: {
    answer: 'The capstone builds a complete Snowflake platform: least-privilege roles and isolated warehouses first, then ingestion (COPY INTO or Snowpipe), JSON handling, idempotent bronze/silver/gold pipelines with streams and tasks, masking and row policies, Time Travel recovery, tuning, cost controls and monitoring.',
    points: [
      'Set up roles and warehouses before loading any data.',
      'Choose Snowpipe or batch COPY by how files arrive.',
      'Every layer must be safe to re-run.',
    ],
    example: {
      label: 'The order of the build',
      lang: 'text',
      code: `1. Roles + warehouses   loader, transformer, analyst; etl_wh, bi_wh
2. Ingestion            stage + file format + Snowpipe for orders JSON
3. Bronze → Silver      stream + task + MERGE (idempotent)
4. Gold                 dynamic table for daily revenue
5. Governance           masking on email, row policy by region
6. Operations           resource monitor, freshness alert, runbook`,
      static: true,
    },
    check: {
      question: 'What should be set up before any data is loaded?',
      options: ['Dashboards', 'Least-privilege roles and workload warehouses', 'Clustering keys', 'Data sharing'],
      answer: 1,
      explanation: 'Retrofitting access control after data and users exist is harder and riskier.',
    },
  },

  [`${S}/interview-system-design`]: {
    answer: 'Snowflake design interviews reward a repeatable process: clarify requirements, sketch the data flow, map Snowflake features to each need, and name the trade-offs and failure modes unprompted. Diagnose performance with the Query Profile before reaching for a bigger warehouse.',
    points: [
      'Separate warehouses by workload to isolate cost and contention.',
      'Pick Snowpipe, streams and tasks, or dynamic tables by latency need.',
      'Name the trade-off of each choice out loud.',
    ],
    example: {
      label: 'Mapping requirements to features',
      lang: 'text',
      code: `Files every minute from S3       → Snowpipe (auto-ingest)
Gold tables ≤ 15 min fresh       → dynamic tables, TARGET_LAG = 15 min
Analysts must not see raw emails → masking policy on email
Recover from bad deploys         → Time Travel + zero-copy clone
BI spikes at 9 a.m.              → multi-cluster bi_wh, auto-suspend 60 s`,
      static: true,
    },
    check: {
      question: 'Dashboards slow down every morning from concurrency. Which feature fits?',
      options: ['A larger single warehouse only', 'A multi-cluster warehouse that adds clusters under load', 'Time Travel', 'Data sharing'],
      answer: 1,
      explanation: 'Concurrency queuing is solved by more clusters; a larger size speeds single queries instead.',
    },
  },
}
