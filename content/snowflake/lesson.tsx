import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'
import { SNOWFLAKE_MODULE_BY_SLUG, SNOWFLAKE_MODULES } from '@/data/snowflake-curriculum'

type SnowflakeDeepLesson = {
  plain: string
  businessProblem: string
  mentalModel: string
  coreIdeas: string[]
  workflow: string[]
  commands: string
  tableRows: string[][]
  mistakes: string[]
  productionNotes: string[]
  interview: string
  project: string
  takeaways: string[]
}

const lessons: Record<string, SnowflakeDeepLesson> = {
  'roles-security-basics': {
    plain: 'Snowflake security starts with roles. Users do not usually receive privileges directly. A user receives one or more roles, roles receive privileges on objects, and the active role decides what the user can do in a session.',
    businessProblem: 'Without role design, teams either block useful work or grant too much access. Analysts cannot query what they need, engineers use ACCOUNTADMIN for normal work, service accounts become mystery superusers, and sensitive data leaks through accidental grants.',
    mentalModel: 'Think of Snowflake as an office building. Users are people, roles are badges, warehouses are work rooms, databases and schemas are floors and rooms, and grants decide which badge opens which door.',
    coreIdeas: [
      'RBAC means role-based access control: privileges belong to roles, not personalities.',
      'Ownership is powerful because the owning role can manage grants and object changes.',
      'A role hierarchy lets senior roles inherit privileges from lower roles.',
      'Future grants apply permissions to objects created later, reducing manual cleanup.',
      'Least privilege means each role receives only the permissions needed for its job.',
    ],
    workflow: [
      'Create functional roles such as RAW_LOADER, TRANSFORMER, ANALYST, and BI_READER.',
      'Grant warehouse usage separately from table access; both are required to query data.',
      'Grant database and schema USAGE before granting SELECT on tables or views.',
      'Use future grants for stable schemas where new tables should be readable by the same role.',
      'Reserve ACCOUNTADMIN and SECURITYADMIN for administrative work, not day-to-day querying.',
    ],
    commands: `USE ROLE SECURITYADMIN;

CREATE ROLE ANALYST_READER;
CREATE ROLE TRANSFORMER;

GRANT USAGE ON WAREHOUSE WH_BI_S TO ROLE ANALYST_READER;
GRANT USAGE ON DATABASE ANALYTICS TO ROLE ANALYST_READER;
GRANT USAGE ON SCHEMA ANALYTICS.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON ALL TABLES IN SCHEMA ANALYTICS.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON FUTURE TABLES IN SCHEMA ANALYTICS.GOLD TO ROLE ANALYST_READER;

GRANT ROLE ANALYST_READER TO USER MAYA;`,
    tableRows: [
      ['USAGE', 'Allows an object to be referenced.', 'Needed on warehouses, databases, and schemas before deeper privileges matter.'],
      ['SELECT', 'Allows reading table or view rows.', 'Give to analytics consumers on curated schemas, not raw sensitive schemas by default.'],
      ['OWNERSHIP', 'Controls object management and grant delegation.', 'Keep tightly controlled; transferring ownership changes who can manage the object.'],
      ['CREATE TABLE', 'Allows creating tables in a schema.', 'Useful for transformation roles, risky for broad analyst roles.'],
      ['MONITOR', 'Allows viewing some metadata and usage.', 'Useful for operations roles without granting data access.'],
    ],
    mistakes: [
      'Granting privileges directly to users, which becomes impossible to audit at scale.',
      'Using ACCOUNTADMIN for loading jobs, dashboards, notebooks, or dbt runs.',
      'Granting SELECT on raw PII tables when a masked curated view would satisfy the use case.',
      'Forgetting warehouse USAGE, then thinking table grants are broken.',
      'Granting future privileges in the wrong schema and assuming they apply everywhere.',
    ],
    productionNotes: [
      'Separate human roles from service roles; a dbt role and an analyst role should not be the same identity.',
      'Review grants periodically with SHOW GRANTS and ACCOUNT_USAGE views.',
      'Use naming conventions that make ownership obvious: ROLE_RAW_LOADER, ROLE_DBT_TRANSFORMER, ROLE_FINANCE_READER.',
      'Treat role design as architecture, not admin paperwork, because it defines your data boundary.',
    ],
    interview: 'A strong answer says Snowflake uses RBAC. To query a table, a role needs warehouse USAGE, database USAGE, schema USAGE, and object-level SELECT. Production designs avoid direct user grants, use role hierarchy carefully, reserve admin roles, and combine RBAC with masking, row access policies, and audited service accounts.',
    project: 'Design roles for an orders warehouse: RAW_LOADER can load raw files, DBT_TRANSFORMER can read RAW and write SILVER/GOLD, FINANCE_READER can read finance marts, SUPPORT_READER can read masked customer views, and SECURITYADMIN manages grants.',
    takeaways: [
      'Snowflake permissions are role-centered.',
      'Warehouse access and data access are separate.',
      'Least privilege is a design habit, not a slogan.',
      'Future grants prevent privilege drift for new objects.',
      'Admin roles should not run normal analytics jobs.',
    ],
  },
  'semi-structured-data': {
    plain: 'Snowflake can store JSON, arrays, and nested objects in VARIANT columns. You can load messy API payloads first, then extract stable fields later with SQL.',
    businessProblem: 'Real data rarely arrives as perfect tables. APIs send nested JSON, event systems send flexible payloads, and partners change optional fields. If your warehouse cannot handle semi-structured data, every small schema surprise becomes a failed pipeline.',
    mentalModel: 'VARIANT is a flexible box. You can put JSON inside the box, inspect keys, cast values into normal columns, and flatten arrays when one input record contains many child records.',
    coreIdeas: [
      'VARIANT stores semi-structured values such as JSON objects, arrays, strings, numbers, and booleans.',
      'Colon notation reads fields from objects, such as payload:customer:id.',
      'Use casts to turn VARIANT values into typed SQL columns.',
      'LATERAL FLATTEN expands arrays into rows.',
      'Raw VARIANT is useful, but curated tables should expose typed columns for most users.',
    ],
    workflow: [
      'Load raw JSON into a landing table with a VARIANT payload and load timestamp.',
      'Profile which keys exist and which ones are optional.',
      'Create a typed silver table or view with important fields cast to SQL types.',
      'Flatten nested arrays such as line_items into child tables.',
      'Add tests for required keys, valid types, and unexpected nulls.',
    ],
    commands: `CREATE OR REPLACE TABLE RAW.API_EVENTS (
  payload VARIANT,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

SELECT
  payload:event_id::STRING AS event_id,
  payload:customer:id::STRING AS customer_id,
  payload:total::NUMBER(12,2) AS total_usd,
  loaded_at
FROM RAW.API_EVENTS;

SELECT
  payload:order_id::STRING AS order_id,
  item.value:sku::STRING AS sku,
  item.value:quantity::NUMBER AS quantity
FROM RAW.API_EVENTS,
LATERAL FLATTEN(input => payload:line_items) item;`,
    tableRows: [
      ['VARIANT', 'Flexible column for JSON-like values.', 'Use for raw ingestion and fields that change often.'],
      ['OBJECT', 'Key-value structure.', 'Represents JSON objects such as customer or address.'],
      ['ARRAY', 'Ordered list of values.', 'Flatten when each item needs its own row.'],
      ['FLATTEN', 'Table function that expands arrays/objects.', 'Critical for nested line items, events, and attributes.'],
      ['Cast', 'Converts flexible values into SQL types.', 'Needed for reliable joins, metrics, and BI tools.'],
    ],
    mistakes: [
      'Leaving every downstream user to parse raw JSON repeatedly.',
      'Casting without checking missing keys, bad dates, or unexpected data types.',
      'Flattening arrays without preserving the parent record key.',
      'Using SELECT * on wide VARIANT-heavy tables for dashboards.',
      'Assuming JSON field names are stable just because today’s sample has them.',
    ],
    productionNotes: [
      'Keep raw payloads for replay, but model typed curated tables for analytics.',
      'Document JSON contracts with examples and owner names.',
      'Monitor null rates after casts; schema drift often appears as sudden nulls.',
      'Use TRY_TO_* functions when dirty input should be captured instead of failing the whole query.',
    ],
    interview: 'Explain that Snowflake supports semi-structured data through VARIANT, OBJECT, and ARRAY. Raw JSON can be loaded first, then accessed using path notation and converted into typed columns. Arrays are expanded with LATERAL FLATTEN. Good designs keep raw payloads but publish typed curated tables for users.',
    project: 'Load order API JSON with customer, shipping address, promotions, and line_items. Build ORDERS_SILVER with typed order fields and ORDER_ITEMS_SILVER by flattening line_items. Add rejected-record handling for missing order_id or invalid totals.',
    takeaways: [
      'VARIANT lets Snowflake ingest flexible JSON safely.',
      'Curated analytics should not depend on raw JSON parsing forever.',
      'LATERAL FLATTEN turns nested arrays into rows.',
      'Casting and validation are where raw data becomes trustworthy.',
      'Schema drift must be monitored, not wished away.',
    ],
  },
  'elt-medallion': {
    plain: 'ELT means load data first, then transform it inside Snowflake. Medallion architecture organizes this into Raw, Silver, and Gold layers so data becomes cleaner and more business-ready as it moves forward.',
    businessProblem: 'Without layers, warehouses become a pile of half-clean tables. Analysts do not know which table to trust, engineers duplicate logic, and executives see different revenue numbers depending on which dashboard they open.',
    mentalModel: 'Raw is the shipping dock, Silver is the cleaning and standardization room, and Gold is the polished shelf where business teams pick approved products.',
    coreIdeas: [
      'Raw stores source-shaped data with minimal changes.',
      'Silver standardizes types, names, deduplication, and basic quality.',
      'Gold contains business-ready marts, metrics, and dimensions.',
      'ELT uses warehouse compute for transformations after loading.',
      'dbt is commonly used to organize SQL models, tests, and documentation.',
    ],
    workflow: [
      'Land source data into RAW with load metadata.',
      'Create SILVER models that clean names, types, duplicates, and keys.',
      'Create GOLD marts for business domains such as finance, product, and support.',
      'Add tests for uniqueness, not-null columns, referential integrity, and accepted values.',
      'Publish only documented GOLD objects to broad BI roles.',
    ],
    commands: `CREATE SCHEMA RAW;
CREATE SCHEMA SILVER;
CREATE SCHEMA GOLD;

CREATE OR REPLACE TABLE SILVER.ORDERS AS
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2) AS total_usd,
  source_file,
  loaded_at
FROM RAW.ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY loaded_at DESC
) = 1;

CREATE OR REPLACE TABLE GOLD.DAILY_REVENUE AS
SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
FROM SILVER.ORDERS
GROUP BY 1;`,
    tableRows: [
      ['Raw', 'Source-shaped, replayable landing data.', 'Debugging, recovery, lineage, and backfills.'],
      ['Silver', 'Cleaned and standardized records.', 'Reliable joins and reusable transformations.'],
      ['Gold', 'Business-ready facts, dimensions, and marts.', 'Dashboards, metrics, data products, and executive reporting.'],
      ['Tests', 'Checks for data promises.', 'Prevents silent trust erosion.'],
      ['Docs', 'Human-readable meaning and ownership.', 'Helps teams reuse instead of reinventing tables.'],
    ],
    mistakes: [
      'Letting analysts build dashboards directly on raw source tables.',
      'Putting business metrics in five different dashboards instead of one governed Gold model.',
      'Dropping raw history too early and losing replay capability.',
      'Treating dbt as only a SQL runner instead of a modeling, testing, and documentation system.',
      'Mixing ingestion cleanup, business rules, and presentation logic in one giant query.',
    ],
    productionNotes: [
      'Use schemas and role grants to make the layer boundary visible.',
      'Keep transformation code versioned in Git and deployed through CI/CD.',
      'Measure freshness for important Gold tables and alert when SLAs are missed.',
      'Give each Gold mart an owner who can explain metric definitions.',
    ],
    interview: 'Say ELT loads first and transforms inside the warehouse. A medallion design separates Raw, Silver, and Gold so source history is preserved, cleaning is reusable, and business metrics are published from trusted marts. Mention tests, ownership, lineage, and CI/CD because mature ELT is an engineering system, not just SQL files.',
    project: 'Build an orders medallion pipeline with RAW.ORDERS, RAW.CUSTOMERS, SILVER cleaned/deduped tables, GOLD.DAILY_REVENUE, GOLD.CUSTOMER_LTV, and tests for order_id uniqueness and nonnegative revenue.',
    takeaways: [
      'ELT is load first, transform later.',
      'Raw, Silver, and Gold separate trust levels.',
      'Gold is where business definitions should become consistent.',
      'Tests and docs are part of the warehouse, not extras.',
      'Layer boundaries make data systems easier to operate.',
    ],
  },
  'merge-idempotency': {
    plain: 'MERGE lets Snowflake insert new rows and update existing rows in one statement. Idempotency means a pipeline can run again without corrupting data or double-counting results.',
    businessProblem: 'Pipelines fail, rerun, receive duplicate files, and replay old events. If your loads are not idempotent, a harmless retry can inflate revenue, overwrite good records with stale data, or create duplicate customers.',
    mentalModel: 'MERGE is a careful receptionist: if the customer already has a file, update it; if not, create a new file. Idempotency means checking in the same visitor twice does not create two identities.',
    coreIdeas: [
      'MERGE compares a source dataset to a target table using a match condition.',
      'WHEN MATCHED handles updates or deletes for existing records.',
      'WHEN NOT MATCHED handles inserts for new records.',
      'Deduplicate staging data before merging.',
      'Use watermarks and load IDs to track what has been processed.',
    ],
    workflow: [
      'Load incoming data into a staging table.',
      'Validate and deduplicate staging rows by business key.',
      'MERGE staging into the target table using a stable key.',
      'Record load metadata: file name, batch id, row counts, and timestamps.',
      'Make reruns safe by avoiding blind appends for mutable entities.',
    ],
    commands: `CREATE OR REPLACE TEMP TABLE STG_ORDERS_DEDUPED AS
SELECT *
FROM STG_ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC, loaded_at DESC
) = 1;

MERGE INTO SILVER.ORDERS tgt
USING STG_ORDERS_DEDUPED src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (
  order_id, customer_id, status, total_usd, updated_at
) VALUES (
  src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at
);`,
    tableRows: [
      ['Business key', 'Stable identifier such as order_id.', 'Controls matching; a bad key creates duplicates or overwrites.'],
      ['Staging table', 'Temporary/load table before target merge.', 'Lets you validate before touching trusted data.'],
      ['Watermark', 'Last processed timestamp or sequence.', 'Prevents missing or endlessly rereading data.'],
      ['Load audit', 'Metadata about each run.', 'Makes incidents debuggable.'],
      ['Idempotency', 'Safe repeatability.', 'Required for retries and backfills.'],
    ],
    mistakes: [
      'Merging with a non-unique source dataset, causing duplicate-match errors or unpredictable logic.',
      'Using ingestion timestamp as the business key.',
      'Blindly updating target rows with older source records.',
      'Not auditing row counts, so silent partial loads go unnoticed.',
      'Confusing exactly-once marketing language with end-to-end idempotent design.',
    ],
    productionNotes: [
      'Create a load control table with batch_id, source_file, started_at, finished_at, inserted_count, updated_count, and status.',
      'Test rerunning the same file twice; the target row count should not change incorrectly.',
      'Use streams/tasks or orchestration carefully when multiple merges can touch the same target.',
      'Prefer deterministic tie-breakers when deduplicating source records.',
    ],
    interview: 'Define MERGE as conditional insert/update/delete based on matching source and target rows. Then explain idempotency: rerunning the same batch should produce the same final state. Mention staging, dedupe, stable keys, watermarks, load audit tables, and guarding against older records overwriting newer records.',
    project: 'Create a customer dimension that receives daily snapshots. Stage the snapshot, dedupe by customer_id, MERGE changed rows, insert new customers, and log the batch. Then rerun the same file to prove the pipeline is safe.',
    takeaways: [
      'MERGE is the main Snowflake pattern for upserts.',
      'Idempotency protects pipelines from retries and duplicate input.',
      'Deduplicate staging data before merging.',
      'Do not overwrite newer target data with stale source data.',
      'Audit tables turn pipeline behavior into evidence.',
    ],
  },
  'time-travel-cloning': {
    plain: 'Time Travel lets you query or restore earlier versions of data. Zero-copy cloning creates fast logical copies of databases, schemas, or tables without duplicating all storage immediately.',
    businessProblem: 'People drop tables, bad deployments overwrite data, analysts need safe sandboxes, and engineers need reproducible test environments. Without recovery and cloning, teams either move slowly or lose data.',
    mentalModel: 'Time Travel is an undo window. Zero-copy clone is a transparent copy that points to the same pages until changes diverge.',
    coreIdeas: [
      'Time Travel retention controls how far back you can query or restore objects.',
      'UNDROP can recover recently dropped objects inside retention.',
      'AT and BEFORE let you query historical table state.',
      'Zero-copy clones are fast because unchanged data is shared.',
      'Fail-safe is Snowflake-managed disaster recovery, not a user query feature.',
    ],
    workflow: [
      'Set retention based on business recovery needs and edition limits.',
      'Use historical queries to investigate when data changed.',
      'Clone production-like data into dev or QA without full physical copy upfront.',
      'Restore bad tables by cloning a known-good historical version.',
      'Drop old clones when they are no longer needed to avoid governance and storage surprises.',
    ],
    commands: `-- Query table as it looked one hour ago
SELECT *
FROM PROD.GOLD.DAILY_REVENUE
AT (OFFSET => -3600);

-- Clone a database for safe testing
CREATE DATABASE QA_CLONE
CLONE PROD;

-- Recover a dropped table inside retention
UNDROP TABLE PROD.GOLD.DAILY_REVENUE;

-- Restore a known-good version into a repair table
CREATE TABLE PROD.GOLD.DAILY_REVENUE_RESTORE
CLONE PROD.GOLD.DAILY_REVENUE
AT (TIMESTAMP => '2026-09-10 08:00:00'::TIMESTAMP_NTZ);`,
    tableRows: [
      ['Time Travel', 'User-accessible historical data window.', 'Accidental changes, debugging, point-in-time restore.'],
      ['UNDROP', 'Recover dropped objects.', 'Fast recovery if still inside retention.'],
      ['Clone', 'Logical copy sharing unchanged data.', 'Dev, QA, backfills, and incident recovery.'],
      ['Fail-safe', 'Snowflake-managed recovery period.', 'Not for normal user querying.'],
      ['Retention', 'How long history remains available.', 'A cost, recovery, and compliance decision.'],
    ],
    mistakes: [
      'Assuming Time Travel is an infinite backup.',
      'Creating clones of sensitive production data without applying access rules.',
      'Leaving temporary clones around for months.',
      'Confusing Fail-safe with a self-service restore feature.',
      'Restoring data without understanding which downstream tables were built from the bad version.',
    ],
    productionNotes: [
      'Document standard restore playbooks before an incident happens.',
      'Use clones for testing migrations and dbt changes against production-shaped data.',
      'Tag clones or name them with owners and expiry dates.',
      'Remember that changing cloned data can create additional storage as objects diverge.',
    ],
    interview: 'Explain that Time Travel provides historical access within retention for queries, clones, and undrop. Zero-copy cloning creates fast logical copies by sharing unchanged data. They are powerful for recovery and dev/test, but not replacements for governance, backups, or sensitive-data controls.',
    project: 'Simulate a bad DELETE in a development database. Query the table before the delete, clone the historical version, compare row counts, restore the missing rows, and write the incident runbook.',
    takeaways: [
      'Time Travel is Snowflake’s self-service historical window.',
      'Zero-copy cloning is fast because unchanged storage is shared.',
      'Retention is both a recovery and cost decision.',
      'Clones must follow security and lifecycle rules.',
      'Recovery plans should be practiced before production incidents.',
    ],
  },
  'snowpipe': {
    plain: 'Snowpipe loads files continuously from stages into Snowflake tables. It is useful when data arrives throughout the day and batch loading every few hours is too slow.',
    businessProblem: 'Teams often need fresh dashboards and near-real-time operational analytics. Manually running COPY every hour is fragile; one missed schedule can leave executives looking at stale data.',
    mentalModel: 'Snowpipe is an automatic receiving dock. Files arrive in cloud storage, notifications tell Snowflake, and Snowpipe loads them into a table without you starting a warehouse manually for each load.',
    coreIdeas: [
      'Snowpipe loads file-based data from stages into tables.',
      'Auto-ingest uses cloud notifications to trigger loads.',
      'Snowpipe is continuous loading, not streaming row-by-row processing.',
      'COPY history and pipe status are central debugging tools.',
      'Bad file formats or schema drift still require operational handling.',
    ],
    workflow: [
      'Create a target table and file format.',
      'Create an external stage pointing to cloud storage.',
      'Create a pipe with COPY INTO.',
      'Configure cloud notifications for auto-ingest.',
      'Monitor load history, rejected rows, freshness, and pipe errors.',
    ],
    commands: `CREATE FILE FORMAT JSON_EVENTS
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE STAGE ORDERS_STAGE
  URL = 's3://example-orders/events/'
  FILE_FORMAT = JSON_EVENTS;

CREATE OR REPLACE TABLE RAW.ORDER_EVENTS (
  payload VARIANT,
  source_file STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE PIPE ORDER_EVENTS_PIPE
  AUTO_INGEST = TRUE
AS
COPY INTO RAW.ORDER_EVENTS (payload, source_file)
FROM (
  SELECT $1, METADATA$FILENAME
  FROM @ORDERS_STAGE
);`,
    tableRows: [
      ['COPY INTO', 'Bulk load command.', 'Foundation of Snowpipe load logic.'],
      ['Pipe', 'Snowflake object containing load definition.', 'Owns the continuous load process.'],
      ['Auto-ingest', 'Cloud notification integration.', 'Loads new files without manual scheduling.'],
      ['Load history', 'Record of loaded files and errors.', 'First stop for debugging freshness issues.'],
      ['Validation', 'Checking files before/after load.', 'Prevents bad data from silently landing.'],
    ],
    mistakes: [
      'Calling Snowpipe real-time streaming; it is file-based continuous loading.',
      'Forgetting notification setup and wondering why new files do not load.',
      'Not storing source file metadata, making duplicates and bad files hard to debug.',
      'Using tiny files at high volume, which can increase overhead.',
      'Assuming Snowpipe transforms data; it loads data, while modeling still happens afterward.',
    ],
    productionNotes: [
      'Monitor freshness SLAs for critical pipes.',
      'Define a replay plan for missed notifications or pipe pauses.',
      'Keep raw load tables append-only where possible.',
      'Use external tables or Snowpipe Streaming only when the file-load model is not a fit.',
    ],
    interview: 'Snowpipe is Snowflake continuous file ingestion. A pipe wraps COPY INTO logic and can use cloud notifications for auto-ingest. It is good for frequent file arrivals, but it still needs file formats, stages, error monitoring, freshness checks, and downstream ELT.',
    project: 'Build an auto-ingest order-events pipe from S3 or Azure Blob into RAW.ORDER_EVENTS, capture METADATA$FILENAME, then create a freshness dashboard using load history.',
    takeaways: [
      'Snowpipe automates frequent file loading.',
      'It is continuous file ingestion, not generic event streaming.',
      'Stages, file formats, pipes, and notifications work together.',
      'Operational monitoring is required for freshness and errors.',
      'Loaded raw data still needs transformation and quality checks.',
    ],
  },
  'streams-and-tasks': {
    plain: 'Streams track table changes and tasks run scheduled SQL. Together they let you build incremental pipelines inside Snowflake.',
    businessProblem: 'Rebuilding every table from scratch wastes compute and delays dashboards. Incremental pipelines process only what changed, but they need reliable change tracking and scheduling.',
    mentalModel: 'A stream is a bookmark over table changes. A task is an alarm clock that wakes up and runs SQL. Together: wake up, read the changes, write the next table, move the bookmark.',
    coreIdeas: [
      'Streams capture change metadata for inserts, updates, and deletes on a source table.',
      'Tasks run SQL on a schedule or after another task completes.',
      'Task graphs chain multiple dependent steps.',
      'Streams are consumed when used in DML such as INSERT or MERGE.',
      'Staleness happens if changes are not consumed within retention.',
    ],
    workflow: [
      'Create a source table and a stream on it.',
      'Write a MERGE that reads changed rows from the stream.',
      'Create a task to run the MERGE on a schedule.',
      'Chain downstream tasks for Silver and Gold transformations.',
      'Monitor task history, failures, lag, and stream staleness.',
    ],
    commands: `CREATE STREAM ORDERS_STREAM
  ON TABLE RAW.ORDERS;

CREATE TASK MERGE_ORDERS_TASK
  WAREHOUSE = WH_TRANSFORM_M
  SCHEDULE = '5 MINUTE'
AS
MERGE INTO SILVER.ORDERS tgt
USING ORDERS_STREAM src
  ON tgt.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET status = src.status, updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, status, updated_at)
VALUES (src.order_id, src.status, src.updated_at);

ALTER TASK MERGE_ORDERS_TASK RESUME;`,
    tableRows: [
      ['Stream', 'Change tracking object.', 'Incremental reads without scanning full source.'],
      ['Task', 'Scheduled SQL execution.', 'Native orchestration for Snowflake SQL.'],
      ['Task graph', 'Dependency chain of tasks.', 'Multi-step pipelines.'],
      ['Staleness', 'Stream history no longer usable.', 'A production risk if tasks fail too long.'],
      ['MERGE', 'Upsert changes into target.', 'Common stream consumption pattern.'],
    ],
    mistakes: [
      'Assuming a stream stores a separate copy of all changed data forever.',
      'Forgetting to resume a task after creating it.',
      'Building task graphs without alerting on failure.',
      'Consuming a stream accidentally in a test DML statement.',
      'Ignoring delete handling from change metadata.',
    ],
    productionNotes: [
      'Use task history views for monitoring and alerting.',
      'Keep tasks small and composable instead of one giant SQL script.',
      'Document whether each incremental model handles deletes.',
      'Have a full-refresh fallback for corrupted incremental state.',
    ],
    interview: 'Streams track changes and tasks schedule SQL. A common pattern is stream plus MERGE plus task. Mention that streams are consumed by DML, can become stale, and need monitoring. Tasks can form graphs, but production still needs alerting and recovery procedures.',
    project: 'Build RAW to SILVER incremental orders with a stream and task, then a second task that updates GOLD.DAILY_REVENUE after the first task succeeds.',
    takeaways: [
      'Streams and tasks enable native incremental ELT.',
      'Streams track changes; tasks run scheduled SQL.',
      'MERGE is the common bridge between a stream and target table.',
      'Monitoring matters because streams can become stale.',
      'Incremental pipelines still need full-refresh recovery plans.',
    ],
  },
  'dynamic-tables': {
    plain: 'Dynamic tables let you declare the result you want and let Snowflake refresh it toward a target freshness. They simplify some incremental pipelines that used to require streams and tasks.',
    businessProblem: 'Many teams want fresh derived tables but do not want to hand-write every incremental merge. Dynamic tables reduce orchestration code for common transformation chains.',
    mentalModel: 'A dynamic table is like a maintained query result with a freshness promise. You define SELECT logic and target lag; Snowflake manages refresh work.',
    coreIdeas: [
      'Dynamic tables are defined by SELECT statements.',
      'TARGET_LAG describes acceptable freshness delay.',
      'Refresh mode may be incremental or full depending on query support.',
      'They can build pipelines of dependent dynamic tables.',
      'They are not a magic replacement for every stream/task or dbt workflow.',
    ],
    workflow: [
      'Define a dynamic table from raw or silver sources.',
      'Choose warehouse and target lag.',
      'Check whether refresh is incremental or full.',
      'Chain downstream dynamic tables for curated outputs.',
      'Monitor refresh history, lag, and cost.',
    ],
    commands: `CREATE OR REPLACE DYNAMIC TABLE SILVER.ORDERS_DT
  TARGET_LAG = '10 minutes'
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT
  order_id,
  customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2) AS total_usd
FROM RAW.ORDERS
WHERE order_id IS NOT NULL;

CREATE OR REPLACE DYNAMIC TABLE GOLD.DAILY_REVENUE_DT
  TARGET_LAG = DOWNSTREAM
  WAREHOUSE = WH_TRANSFORM_M
AS
SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
FROM SILVER.ORDERS_DT
GROUP BY 1;`,
    tableRows: [
      ['Target lag', 'Freshness goal.', 'Controls how current the dynamic table should be.'],
      ['Refresh', 'Snowflake maintenance work.', 'Can cost credits and must be monitored.'],
      ['Incremental mode', 'Refresh only changes where possible.', 'Efficient but not available for every query shape.'],
      ['Full mode', 'Recompute result.', 'Simpler but can be expensive for large data.'],
      ['DOWNSTREAM', 'Refresh driven by dependent objects.', 'Useful in pipelines.'],
    ],
    mistakes: [
      'Assuming every dynamic table refreshes incrementally.',
      'Setting extremely aggressive target lag without business need.',
      'Ignoring refresh cost because orchestration code disappeared.',
      'Using dynamic tables when a simple view or batch table would be enough.',
      'Forgetting that bad source data still creates bad derived data.',
    ],
    productionNotes: [
      'Check refresh history after deployment, not just CREATE success.',
      'Use dynamic tables for declarative transformations where their limitations fit.',
      'Keep semantic business tests around dynamic table outputs.',
      'Compare with dbt, materialized views, streams/tasks, and plain tables before standardizing.',
    ],
    interview: 'Dynamic tables are declarative Snowflake-managed tables built from SELECT statements and refreshed to a target lag. They can reduce manual streams/tasks code, but engineers must understand refresh mode, cost, limitations, and monitoring.',
    project: 'Create a dynamic table pipeline from RAW.ORDERS to SILVER.ORDERS_DT to GOLD.DAILY_REVENUE_DT. Compare refresh history and query cost against a task-based MERGE pipeline.',
    takeaways: [
      'Dynamic tables declare what data should look like, not every refresh step.',
      'Target lag is a freshness and cost decision.',
      'Incremental refresh is powerful but not universal.',
      'They simplify some ELT pipelines, not all pipelines.',
      'Refresh monitoring is mandatory.',
    ],
  },
  'performance-tuning': {
    plain: 'Snowflake performance tuning means reducing unnecessary scanned data, choosing the right warehouse, modeling tables well, and reading query profiles instead of guessing.',
    businessProblem: 'Slow queries hurt dashboards, pipelines, and trust. But blindly making warehouses bigger wastes money. Good tuning finds whether the problem is scan volume, joins, spills, concurrency, or poor SQL.',
    mentalModel: 'Performance is a pipeline: query text enters, optimizer plans, micro-partitions are pruned, warehouse compute executes, data may spill, results return. Tune the actual bottleneck.',
    coreIdeas: [
      'Micro-partition pruning reduces data scanned.',
      'Warehouse size affects compute available to a query.',
      'Multi-cluster warehouses help concurrency, not single-query scan design.',
      'Query Profile shows where time and bytes are spent.',
      'Clustering and search optimization are specialized tools, not default fixes.',
    ],
    workflow: [
      'Open Query Profile for the slow query.',
      'Check bytes scanned, partitions scanned, spills, joins, and queueing.',
      'Rewrite filters and joins before resizing warehouses.',
      'Consider clustering only when pruning is poor on large stable tables.',
      'Measure before and after with the same workload and realistic cache state.',
    ],
    commands: `-- Pruning-friendly date range
SELECT customer_id, SUM(total_usd)
FROM GOLD.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-10-01'
GROUP BY customer_id;

-- Inspect clustering quality for very large tables when relevant
SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.ORDERS', '(order_date)');

-- Avoid wrapping the filtered column when possible
-- WHERE DATE(order_ts) = '2026-09-01' can reduce pruning quality.`,
    tableRows: [
      ['Bytes scanned', 'How much data query reads.', 'High scan often means filters/modeling need work.'],
      ['Partitions scanned', 'How many micro-partitions are touched.', 'Shows pruning quality.'],
      ['Spill', 'Intermediate data moved to disk/remote storage.', 'May need SQL changes or more warehouse memory.'],
      ['Queueing', 'Query waited for compute.', 'Concurrency or warehouse sizing issue.'],
      ['Query Profile', 'Execution breakdown.', 'The evidence for tuning decisions.'],
    ],
    mistakes: [
      'Increasing warehouse size before reading Query Profile.',
      'Using SELECT * in BI queries over wide tables.',
      'Wrapping date columns in functions that reduce pruning.',
      'Clustering small tables that do not need clustering.',
      'Benchmarking only with warm cache and declaring victory.',
    ],
    productionNotes: [
      'Tune top recurring expensive queries first, not one-off experiments.',
      'Use separate warehouses so ad hoc exploration does not slow production dashboards.',
      'For search-like point lookups, evaluate Search Optimization Service carefully.',
      'Track performance and cost together; faster can still be wasteful.',
    ],
    interview: 'A senior Snowflake tuning answer starts with Query Profile, bytes scanned, pruning, joins, spill, warehouse size, and concurrency. Mention that Snowflake has no normal B-tree indexing pattern for most workloads; micro-partitions, clustering, result cache, and warehouse compute shape performance.',
    project: 'Take a slow dashboard query, record bytes scanned and duration, rewrite filters and selected columns, test on XS/S/M warehouses, and document the cheapest setting that meets the SLA.',
    takeaways: [
      'Tune from Query Profile evidence.',
      'Reduce scanned data before buying more compute.',
      'Warehouse size and multi-cluster solve different problems.',
      'Clustering is useful only for specific large-table access patterns.',
      'Performance and cost must be optimized together.',
    ],
  },
  'cost-optimization': {
    plain: 'Snowflake cost is mostly credits for compute plus storage and cloud services. Cost optimization means aligning warehouse runtime and size with actual business value.',
    businessProblem: 'Snowflake can become expensive quietly. Warehouses left running, oversized transformations, dashboard refresh storms, and duplicate pipelines can burn thousands before anyone notices.',
    mentalModel: 'Credits are electricity. Warehouses are machines. Auto-suspend turns machines off, warehouse size controls how much electricity they use while running, and query design decides how long the machines work.',
    coreIdeas: [
      'Virtual warehouses consume credits while running.',
      'Auto-suspend and auto-resume are first-line cost controls.',
      'Resource monitors can alert or suspend when credit thresholds are hit.',
      'Query history and warehouse metering reveal cost drivers.',
      'Chargeback/showback creates accountability by team or workload.',
    ],
    workflow: [
      'Inventory warehouses, owners, sizes, and auto-suspend settings.',
      'Review warehouse metering history for top credit consumers.',
      'Find long-running, repeated, and queued queries.',
      'Right-size warehouses and split noisy workloads.',
      'Add resource monitors, budgets, tags, and review cadence.',
    ],
    commands: `CREATE RESOURCE MONITOR BI_MONITOR
  WITH CREDIT_QUOTA = 500
  FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATELY
  TRIGGERS
    ON 75 PERCENT DO NOTIFY
    ON 95 PERCENT DO SUSPEND;

ALTER WAREHOUSE WH_BI_S SET
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;

SELECT warehouse_name, SUM(credits_used) AS credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD(day, -30, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY credits DESC;`,
    tableRows: [
      ['Credits', 'Compute billing unit.', 'Primary cost driver for active warehouses.'],
      ['Auto-suspend', 'Stops inactive compute.', 'Prevents idle spend.'],
      ['Resource monitor', 'Quota/alert control.', 'Guardrail against runaway spend.'],
      ['Warehouse history', 'Usage over time.', 'Identifies expensive workloads.'],
      ['Query attribution', 'Who/what ran expensive SQL.', 'Turns cost into accountability.'],
    ],
    mistakes: [
      'Setting auto-suspend to hours for ad hoc warehouses.',
      'Running every workload on a large warehouse because it “feels safer.”',
      'Ignoring BI tools that refresh many dashboards automatically.',
      'Optimizing storage pennies while compute dollars burn.',
      'Having no owner for shared warehouses.',
    ],
    productionNotes: [
      'Tag warehouses by team, environment, and purpose.',
      'Use separate warehouses for load, transform, BI, and experiments when it improves accountability.',
      'Create weekly cost review reports from ACCOUNT_USAGE.',
      'Budget in workload terms: dashboard freshness, pipeline SLA, and analyst concurrency.',
    ],
    interview: 'Cost optimization starts with warehouse runtime, size, auto-suspend, query efficiency, and workload isolation. Mention resource monitors, metering history, query history, tags, and showback. Good answers tie cost to SLA: spend where freshness and performance matter, reduce waste elsewhere.',
    project: 'Build a Snowflake cost dashboard showing credits by warehouse, top users, longest queries, idle warehouses, and resource monitor alerts. Propose three savings actions and expected tradeoffs.',
    takeaways: [
      'Compute credits dominate many Snowflake bills.',
      'Auto-suspend is a basic but powerful control.',
      'Cost needs owners and visibility.',
      'Resource monitors provide guardrails.',
      'Optimize cost against business SLA, not just lower numbers.',
    ],
  },
  'advanced-security-governance': {
    plain: 'Advanced governance controls who can see sensitive values, which rows they can access, how objects are tagged, and how access is audited.',
    businessProblem: 'A warehouse often contains customer PII, finance data, employee data, and product telemetry. Basic grants are not always enough because different users may need the same table with different visibility.',
    mentalModel: 'RBAC controls the door to the room. Masking policies blur sensitive fields. Row access policies decide which rows appear. Tags and audit views tell you what exists and who touched it.',
    coreIdeas: [
      'Masking policies hide or transform sensitive column values based on role.',
      'Row access policies filter rows dynamically.',
      'Tags classify objects for governance, ownership, and cost.',
      'Access history helps audit who used which objects.',
      'Governance should protect data while still enabling legitimate work.',
    ],
    workflow: [
      'Classify sensitive data such as email, SSN, phone, payment, and health fields.',
      'Apply tags to important databases, schemas, tables, and columns.',
      'Use masking policies for column-level protection.',
      'Use row access policies for region, tenant, or department boundaries.',
      'Audit usage through ACCOUNT_USAGE views and review exceptions.',
    ],
    commands: `CREATE MASKING POLICY EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_FULL_ACCESS') THEN val
    ELSE REGEXP_REPLACE(val, '(^.).*(@.*$)', '\\\\1***\\\\2')
  END;

ALTER TABLE GOLD.CUSTOMERS
  MODIFY COLUMN email SET MASKING POLICY EMAIL_MASK;

CREATE ROW ACCESS POLICY REGION_POLICY AS (region STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'GLOBAL_ANALYST'
  OR region = CURRENT_ROLE();

ALTER TABLE GOLD.SALES
  ADD ROW ACCESS POLICY REGION_POLICY ON (region);`,
    tableRows: [
      ['Masking policy', 'Column-level dynamic protection.', 'Hide sensitive values by role.'],
      ['Row access policy', 'Row-level dynamic filter.', 'Tenant, region, or department isolation.'],
      ['Tag', 'Metadata label.', 'Classification, ownership, lineage, and cost.'],
      ['Access history', 'Usage audit trail.', 'Compliance and investigation.'],
      ['Classification', 'Identify sensitive data.', 'Foundation before applying controls.'],
    ],
    mistakes: [
      'Assuming table SELECT grants alone satisfy privacy requirements.',
      'Masking data in one table but exposing the same value in another view.',
      'Applying policies without testing BI and dbt service roles.',
      'Creating governance rules with no documented owner.',
      'Ignoring access history until an audit starts.',
    ],
    productionNotes: [
      'Prefer governed views or marts for broad consumption.',
      'Test policies with representative roles, not only ACCOUNTADMIN.',
      'Version-control policy definitions where possible.',
      'Combine technical controls with data contracts and steward ownership.',
    ],
    interview: 'Advanced Snowflake governance includes RBAC, masking policies, row access policies, tags, classification, and access history. Explain that grants decide object access, masking controls sensitive columns, row policies filter records, and audit views prove usage.',
    project: 'Secure a customer mart so finance sees full emails, support sees masked emails, regional managers see only their region, and auditors can review access history.',
    takeaways: [
      'RBAC is necessary but not always sufficient.',
      'Masking policies protect sensitive columns.',
      'Row access policies filter records dynamically.',
      'Tags and access history make governance auditable.',
      'Governance must be tested with real roles and workflows.',
    ],
  },
  'data-sharing-marketplace': {
    plain: 'Snowflake data sharing lets one account provide live governed data to another account without copying files back and forth. Marketplace builds on this for discoverable data products.',
    businessProblem: 'Companies constantly exchange data with customers, partners, vendors, and internal business units. File exports create stale copies, security risk, and operational overhead.',
    mentalModel: 'Secure sharing is like giving someone a window into selected tables instead of emailing them a spreadsheet. You control the window; they query current data from their account.',
    coreIdeas: [
      'Secure shares expose selected databases, schemas, tables, or views to consumers.',
      'Consumers query shared data without owning a physical copy.',
      'Reader accounts can serve consumers without their own Snowflake account.',
      'Listings package shares for discovery and governed distribution.',
      'Clean rooms support privacy-preserving collaboration patterns.',
    ],
    workflow: [
      'Create curated provider views that expose only intended data.',
      'Create a share and grant usage/select on approved objects.',
      'Add consumer accounts or publish a listing.',
      'Monitor usage and maintain data contracts.',
      'Use clean room patterns when both parties need controls over sensitive joins.',
    ],
    commands: `CREATE SHARE CUSTOMER_USAGE_SHARE;

GRANT USAGE ON DATABASE ANALYTICS TO SHARE CUSTOMER_USAGE_SHARE;
GRANT USAGE ON SCHEMA ANALYTICS.SHARING TO SHARE CUSTOMER_USAGE_SHARE;
GRANT SELECT ON VIEW ANALYTICS.SHARING.CUSTOMER_DAILY_USAGE
  TO SHARE CUSTOMER_USAGE_SHARE;

ALTER SHARE CUSTOMER_USAGE_SHARE
  ADD ACCOUNTS = XY12345;

-- Consumer side:
CREATE DATABASE PROVIDER_USAGE
  FROM SHARE PROVIDER_ACCOUNT.CUSTOMER_USAGE_SHARE;`,
    tableRows: [
      ['Share', 'Provider object for granting data access.', 'Controlled data distribution.'],
      ['Consumer', 'Account using shared data.', 'Queries current provider data.'],
      ['Reader account', 'Provider-managed consumer account.', 'Useful when customer lacks Snowflake.'],
      ['Listing', 'Marketplace/discoverable package.', 'Commercial or internal data products.'],
      ['Clean room', 'Governed collaboration environment.', 'Privacy-preserving joint analysis.'],
    ],
    mistakes: [
      'Sharing raw tables instead of stable curated views.',
      'Forgetting that object names and schemas become part of a data product contract.',
      'Exposing sensitive columns because internal grants were copied blindly.',
      'Not monitoring whether consumers still use a share.',
      'Treating sharing as a one-time setup instead of a product lifecycle.',
    ],
    productionNotes: [
      'Publish data dictionaries and freshness expectations with shared datasets.',
      'Use secure views when business logic or filtering must be controlled.',
      'Create provider-side monitoring for share usage and failures.',
      'Review legal/compliance requirements before cross-organization data sharing.',
    ],
    interview: 'Snowflake secure data sharing lets providers expose selected data to consumers without file copies. Consumers query live shared data. Strong answers mention curated views, reader accounts, Marketplace listings, clean rooms, governance, contracts, and auditing.',
    project: 'Create a customer-facing share for daily usage metrics. Expose only aggregated data through a secure view, document freshness, add a consumer account, and build a usage-monitor query.',
    takeaways: [
      'Data sharing reduces stale file-copy workflows.',
      'Share curated, governed objects, not accidental raw tables.',
      'Consumers can query shared data live.',
      'Marketplace and clean rooms extend sharing into data products.',
      'A shared dataset needs ownership, documentation, and monitoring.',
    ],
  },
  'snowflake-with-dbt': {
    plain: 'dbt helps teams manage Snowflake transformations as version-controlled SQL models with tests, documentation, environments, and deployment workflows.',
    businessProblem: 'As SQL logic grows, copy-pasted scripts become risky. Teams need reviews, tests, lineage, reusable models, and clear promotion from dev to prod.',
    mentalModel: 'Snowflake runs the SQL. dbt organizes the factory: model files, dependency graph, tests, docs, macros, environments, and CI/CD.',
    coreIdeas: [
      'Sources describe raw inputs and freshness expectations.',
      'Models are SELECT statements materialized as views, tables, incremental tables, or ephemeral logic.',
      'Tests enforce assumptions such as unique, not_null, relationships, and accepted_values.',
      'Snapshots track slowly changing dimensions.',
      'Environments separate development, CI, staging, and production targets.',
    ],
    workflow: [
      'Define sources for raw Snowflake tables.',
      'Create staging models that standardize names and types.',
      'Create intermediate and mart models for business logic.',
      'Add tests and documentation beside models.',
      'Run dbt in CI before deploying production transformations.',
    ],
    commands: `-- models/staging/stg_orders.sql
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  total_usd::NUMBER(12,2) AS total_usd
FROM {{ source('raw', 'orders') }}

-- models/marts/fct_daily_revenue.sql
SELECT
  DATE(order_ts) AS order_date,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('stg_orders') }}
GROUP BY 1

-- schema.yml
models:
  - name: stg_orders
    columns:
      - name: order_id
        tests: [not_null, unique]`,
    tableRows: [
      ['source()', 'Raw input reference.', 'Documents ingestion boundaries and freshness.'],
      ['ref()', 'Model dependency reference.', 'Builds lineage and correct run order.'],
      ['Test', 'Data assertion.', 'Stops broken assumptions from silently shipping.'],
      ['Materialization', 'How model is built.', 'View/table/incremental decisions affect cost and performance.'],
      ['Snapshot', 'Historical change capture.', 'Useful for slowly changing dimensions.'],
    ],
    mistakes: [
      'Writing every model as a table and increasing storage/compute without reason.',
      'Having no tests on primary business keys.',
      'Letting analysts edit production SQL directly in Snowflake outside Git.',
      'Mixing staging cleanup and business metrics in one model.',
      'Running dbt with a role that has far more privileges than needed.',
    ],
    productionNotes: [
      'Use separate schemas for dev users to avoid collisions.',
      'Use CI to run changed models and tests before merge.',
      'Treat exposures and docs as part of the product for BI users.',
      'Tune incremental models carefully; wrong unique keys can corrupt facts.',
    ],
    interview: 'dbt with Snowflake brings software engineering practice to warehouse SQL: version control, DAG, refs, sources, tests, docs, macros, snapshots, and deployment. Snowflake executes the SQL while dbt manages transformation structure.',
    project: 'Build a dbt project with raw orders/customers sources, staging models, fct_orders, dim_customers, fct_daily_revenue, tests, docs, and a CI command that blocks merges on failed tests.',
    takeaways: [
      'dbt organizes Snowflake SQL into a tested DAG.',
      'Sources and refs make lineage explicit.',
      'Tests protect business trust.',
      'Materialization choice affects cost and speed.',
      'Production dbt needs roles, environments, and CI/CD.',
    ],
  },
  'production-operations': {
    plain: 'Snowflake operations means monitoring query health, load freshness, task failures, cost, access, and business SLAs so the warehouse behaves reliably every day.',
    businessProblem: 'A warehouse can compile, query, and still fail the business. Dashboards can be stale, tasks can silently fail, costs can spike, and access can drift. Operations turns Snowflake into a reliable platform.',
    mentalModel: 'Think of Snowflake like an airport. Queries are flights, warehouses are runways, tasks are schedules, loads are cargo arrivals, and operations watches delays, failures, capacity, and safety rules.',
    coreIdeas: [
      'ACCOUNT_USAGE exposes historical metadata for monitoring.',
      'QUERY_HISTORY helps debug slow, failed, and expensive queries.',
      'TASK_HISTORY and COPY_HISTORY reveal pipeline health.',
      'SLAs should be business-facing: freshness, availability, accuracy, and cost.',
      'Runbooks explain what to check and what actions are safe during incidents.',
    ],
    workflow: [
      'Define critical tables and dashboard freshness expectations.',
      'Create monitoring queries for load, task, query, and warehouse history.',
      'Alert on failures, missing loads, stale tables, and runaway spend.',
      'Write runbooks for common incidents such as pipe failure, task failure, and cost spike.',
      'Review recurring issues and remove root causes.',
    ],
    commands: `SELECT query_id, user_name, warehouse_name, execution_status, total_elapsed_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(hour, -6, CURRENT_TIMESTAMP())
  AND execution_status = 'FAIL'
ORDER BY start_time DESC;

SELECT name, state, completed_time, error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  SCHEDULED_TIME_RANGE_START => DATEADD(day, -1, CURRENT_TIMESTAMP())
))
ORDER BY completed_time DESC;

SELECT table_name, MAX(loaded_at) AS latest_load
FROM RAW.LOAD_AUDIT
GROUP BY 1;`,
    tableRows: [
      ['Query history', 'SQL execution metadata.', 'Failures, slow queries, expensive users.'],
      ['Warehouse metering', 'Credit usage over time.', 'Cost trends and spikes.'],
      ['Task history', 'Scheduled job runs.', 'Pipeline failures and delays.'],
      ['Copy history', 'Load results.', 'Missing or rejected files.'],
      ['Runbook', 'Incident procedure.', 'Faster, safer response.'],
    ],
    mistakes: [
      'Only monitoring whether Snowflake is up, not whether data is fresh and correct.',
      'Letting failed tasks sit unnoticed until a stakeholder complains.',
      'Resetting or rerunning pipelines without recording current state.',
      'Having no owner for critical tables.',
      'Treating cost spikes as finance problems instead of engineering incidents.',
    ],
    productionNotes: [
      'Every important table needs an owner and freshness SLA.',
      'Alert fatigue is real; alert on user impact and strong leading indicators.',
      'Keep operational dashboards inside Snowflake or a BI tool the team actually checks.',
      'After incidents, update tests, monitors, and runbooks.',
    ],
    interview: 'Production Snowflake operations cover query history, warehouse metering, task history, copy/load history, freshness SLAs, alerts, runbooks, and incident response. A mature answer talks about data reliability, not just database uptime.',
    project: 'Build an operations dashboard with failed queries, failed tasks, stale tables, top credit warehouses, long-running queries, and load audit freshness. Write runbooks for three alerts.',
    takeaways: [
      'Operations means business reliability, not just platform availability.',
      'ACCOUNT_USAGE and INFORMATION_SCHEMA are core tools.',
      'Freshness, cost, failures, and access all need monitoring.',
      'Runbooks make incident response repeatable.',
      'Ownership turns alerts into action.',
    ],
  },
  'snowflake-project': {
    plain: 'An end-to-end Snowflake project combines ingestion, raw storage, cleaning, modeling, security, optimization, monitoring, and documentation into one production-style analytics platform.',
    businessProblem: 'Reading isolated features is not enough. Real jobs ask you to build a full flow: data arrives, gets loaded, becomes trusted tables, powers dashboards, stays secure, and can be operated when things break.',
    mentalModel: 'This project is a mini company warehouse. You will build the loading dock, cleaning line, product shelves, security desk, cost meter, and operations dashboard.',
    coreIdeas: [
      'Start with clear business questions and source contracts.',
      'Build Raw, Silver, and Gold schemas.',
      'Use COPY/Snowpipe for loading and MERGE for idempotent updates.',
      'Protect sensitive fields with roles and masking.',
      'Monitor freshness, errors, query cost, and data quality.',
    ],
    workflow: [
      'Create roles, warehouses, databases, and schemas.',
      'Load order, customer, and product data into RAW with metadata.',
      'Build SILVER cleaned tables with dedupe and type conversion.',
      'Build GOLD marts: daily revenue, customer LTV, product sales.',
      'Add governance, tests, performance checks, and operations dashboards.',
    ],
    commands: `CREATE DATABASE RETAIL_ANALYTICS;
CREATE SCHEMA RETAIL_ANALYTICS.RAW;
CREATE SCHEMA RETAIL_ANALYTICS.SILVER;
CREATE SCHEMA RETAIL_ANALYTICS.GOLD;

-- Gold mart example
CREATE OR REPLACE TABLE RETAIL_ANALYTICS.GOLD.DAILY_REVENUE AS
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd,
  AVG(total_usd) AS avg_order_value
FROM RETAIL_ANALYTICS.SILVER.ORDERS
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

-- Quality check
SELECT order_date, revenue_usd
FROM RETAIL_ANALYTICS.GOLD.DAILY_REVENUE
WHERE revenue_usd < 0;`,
    tableRows: [
      ['Ingest', 'Bring files/events into Raw.', 'Creates replayable foundation.'],
      ['Clean', 'Type, dedupe, standardize.', 'Makes joins and metrics reliable.'],
      ['Model', 'Facts, dimensions, marts.', 'Turns data into business answers.'],
      ['Secure', 'Roles, masking, row policies.', 'Protects sensitive data.'],
      ['Operate', 'Monitor freshness/cost/errors.', 'Keeps trust after launch.'],
    ],
    mistakes: [
      'Building dashboards before defining trusted Gold metrics.',
      'Skipping load audit and then being unable to debug missing data.',
      'Using one admin role for every step.',
      'Ignoring duplicate orders and late-arriving updates.',
      'Treating the project as finished before monitoring and docs exist.',
    ],
    productionNotes: [
      'Create a README with architecture, table ownership, refresh schedule, and recovery steps.',
      'Use realistic failure tests: duplicate files, bad JSON, missing fields, and delayed loads.',
      'Add cost review queries before the project is considered production-ready.',
      'Document what each Gold metric means and what it excludes.',
    ],
    interview: 'For a Snowflake project answer, walk from requirements to architecture: sources, ingestion, Raw/Silver/Gold, MERGE/idempotency, roles/masking, performance, cost, monitoring, and stakeholder-facing marts. The complete story matters more than any single SQL statement.',
    project: 'Build the full retail analytics platform with orders, customers, products, daily revenue, customer LTV, product performance, secure support views, cost dashboard, and freshness alerts.',
    takeaways: [
      'A Snowflake project is an end-to-end data product.',
      'Raw/Silver/Gold turns messy input into trusted output.',
      'Security and monitoring are part of the project, not later chores.',
      'Idempotency and quality checks protect reruns.',
      'Documentation makes the platform usable by others.',
    ],
  },
  'interview-system-design': {
    plain: 'Snowflake interviews test whether you can explain the platform, design reliable analytics systems, write practical SQL, reason about cost, and handle production tradeoffs.',
    businessProblem: 'Hiring teams do not just need someone who can run SELECT statements. They need someone who can design a warehouse that stays correct, secure, fast, and affordable as data and teams grow.',
    mentalModel: 'Interview answers are architecture reviews. Start with requirements, draw the data flow, name tradeoffs, handle failure, and explain how you would prove the design works.',
    coreIdeas: [
      'Clarify workload: batch, continuous, dashboard, ad hoc, ML, sharing, or operational analytics.',
      'Separate storage, compute, and governance decisions.',
      'Discuss Raw/Silver/Gold, ingestion, idempotency, and data quality.',
      'Explain performance and cost with Query Profile, warehouse sizing, and pruning.',
      'Always include security, monitoring, and recovery.',
    ],
    workflow: [
      'Ask about data volume, freshness, users, compliance, and SLA.',
      'Sketch sources, ingestion, stages, Snowflake schemas, transformations, and consumers.',
      'Choose warehouses and roles by workload.',
      'Describe failure modes: bad files, duplicate loads, stale dashboards, cost spikes.',
      'Close with monitoring, testing, documentation, and rollout plan.',
    ],
    commands: `Interview skeleton:
1. Requirements:
   volume, latency, retention, users, compliance, cost target
2. Architecture:
   sources -> stages/Snowpipe/COPY -> RAW -> SILVER -> GOLD -> BI/dbt/share
3. Reliability:
   idempotent MERGE, load audit, tests, replay, Time Travel
4. Performance/cost:
   pruning, warehouse sizing, auto-suspend, query profile, monitors
5. Security:
   RBAC, masking, row policies, access history
6. Operations:
   freshness alerts, task history, runbooks, owner per table`,
    tableRows: [
      ['Beginner question', 'What is Snowflake?', 'OLAP cloud warehouse, separated storage/compute.'],
      ['SQL question', 'How do you dedupe orders?', 'Window function plus QUALIFY.'],
      ['Pipeline question', 'How do you load files safely?', 'Stage, file format, COPY/Snowpipe, audit, validation.'],
      ['System design question', 'Design retail analytics.', 'Sources, medallion, marts, security, cost, monitoring.'],
      ['Incident question', 'Dashboard is stale.', 'Check load history, task history, query failures, freshness audit.'],
    ],
    mistakes: [
      'Answering with buzzwords instead of tradeoffs.',
      'Saying “scale warehouse bigger” for every performance issue.',
      'Forgetting security and cost in system design answers.',
      'Not explaining idempotency, duplicates, or late-arriving data.',
      'Treating Snowflake like an OLTP database in serving designs.',
    ],
    productionNotes: [
      'Practice explaining Snowflake to both technical and non-technical audiences.',
      'Memorize a few strong SQL patterns: QUALIFY dedupe, MERGE upsert, COPY load, role grants.',
      'Use business language: freshness, trust, privacy, cost, recovery.',
      'A senior answer includes what you would measure after launch.',
    ],
    interview: 'A strong final answer: Snowflake is a managed analytical platform with separated storage/compute. I would design ingestion into Raw, clean into Silver, publish Gold marts, secure with RBAC/masking/row policies, optimize with pruning and warehouse sizing, control cost with auto-suspend/resource monitors, and operate with freshness, query, task, and load monitoring.',
    project: 'Prepare a mock interview packet: explain Snowflake in two minutes, solve three SQL exercises, design an orders analytics warehouse, debug a stale dashboard, and propose cost reductions from query history.',
    takeaways: [
      'Snowflake interviews are about systems, not just syntax.',
      'Start every design with requirements.',
      'Include reliability, security, performance, cost, and operations.',
      'Use concrete SQL patterns to prove practical skill.',
      'Senior answers explain tradeoffs and failure behavior.',
    ],
  },
}

const fallbackLesson = (title: string): SnowflakeDeepLesson => ({
  plain: `${title} is a core Snowflake topic that connects platform behavior, SQL design, data reliability, security, cost, and production operations.`,
  businessProblem: 'The business problem is trust. A warehouse is only useful when data arrives on time, definitions are consistent, sensitive information is protected, and teams can explain how the system behaves when something fails.',
  mentalModel: 'Think of Snowflake as a managed analytical platform: storage holds data, warehouses provide compute, SQL transforms information, roles protect access, and monitoring proves that the system is healthy.',
  coreIdeas: [
    'Start with the business question before choosing a Snowflake feature.',
    'Use Raw, Silver, and Gold layers to separate landing, cleaning, and business-ready output.',
    'Keep security, cost, performance, and operations in the design from the beginning.',
    'Use SQL examples and query history to validate behavior instead of relying on assumptions.',
    'Document ownership, freshness, and failure handling for every important table.',
  ],
  workflow: [
    'Define the users, SLA, data sources, volume, and sensitivity.',
    'Create the right objects: roles, warehouses, databases, schemas, tables, stages, or policies.',
    'Implement the SQL with explicit keys, types, tests, and audit metadata.',
    'Measure behavior through query history, load history, task history, and cost views.',
    'Write the runbook: how to retry, backfill, recover, and explain the output.',
  ],
  commands: `-- Universal Snowflake production checklist
SHOW WAREHOUSES;
SHOW GRANTS TO ROLE ANALYST_READER;

SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -1, CURRENT_TIMESTAMP())
ORDER BY start_time DESC;

SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();`,
  tableRows: [
    ['Design', 'What are we trying to make true?', 'Prevents feature-first architecture.'],
    ['SQL', 'How is the data produced?', 'Makes logic reviewable.'],
    ['Security', 'Who can see what?', 'Protects users and the company.'],
    ['Cost', 'What compute does this consume?', 'Keeps the platform sustainable.'],
    ['Operations', 'How do we know it works tomorrow?', 'Turns a demo into production.'],
  ],
  mistakes: [
    'Skipping requirements and jumping directly into Snowflake syntax.',
    'Using ACCOUNTADMIN for normal work.',
    'Leaving important tables without owners, tests, or freshness checks.',
    'Optimizing performance without checking Query Profile.',
    'Publishing dashboards before agreeing on metric definitions.',
  ],
  productionNotes: [
    'Every production object should have a purpose, owner, and lifecycle.',
    'Every important pipeline should be rerunnable.',
    'Every sensitive dataset should have a documented access pattern.',
    'Every recurring cost should map to a workload someone cares about.',
  ],
  interview: `Explain ${title} by connecting the feature to requirements, SQL behavior, failure modes, cost, security, and monitoring. That is the difference between tool familiarity and production Snowflake skill.`,
  project: `Apply ${title} to an orders analytics warehouse and document the design choices, SQL, tests, monitoring, and recovery steps.`,
  takeaways: [
    'Snowflake knowledge is strongest when tied to production behavior.',
    'SQL, security, cost, and operations belong in the same design conversation.',
    'Use evidence from Snowflake metadata views to debug and optimize.',
    'A good warehouse is understandable, rerunnable, governed, and monitored.',
    'Depth comes from explaining the why, not only listing features.',
  ],
})

export function SnowflakeLesson({ slug }: { slug: string }) {
  const module = SNOWFLAKE_MODULE_BY_SLUG[slug]
  if (!module) return null

  const lesson = lessons[slug] ?? fallbackLesson(module.title)
  const prev = SNOWFLAKE_MODULES.find(item => item.id === module.id - 1)
  const next = SNOWFLAKE_MODULES.find(item => item.id === module.id + 1)

  return (
    <LearnLayout
      title={module.title}
      description={module.description}
      section={`Snowflake — Module ${String(module.id).padStart(2, '0')}`}
      readTime={module.readTime}
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: module.title, href: `/learn/snowflake/${module.slug}` },
      ]}
      prev={prev ? { title: prev.title, href: `/learn/snowflake/${prev.slug}` } : undefined}
      next={next ? { title: next.title, href: `/learn/snowflake/${next.slug}` } : undefined}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Plain-English foundation" />
        <SectionTitle>{module.title} From Scratch</SectionTitle>
        <Para>{lesson.plain}</Para>
        <HighlightBox>
          <Para><strong>Why this matters:</strong> {lesson.businessProblem}</Para>
        </HighlightBox>
        <Callout title="Mental model">{lesson.mentalModel}</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Core concepts" />
        <SectionTitle>The Concepts You Must Own</SectionTitle>
        <BulletList items={lesson.coreIdeas} />
        <Table headers={['Concept', 'Meaning', 'Why it matters']} rows={lesson.tableRows} />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — How the work actually flows" />
        <SectionTitle>Step-by-Step Workflow</SectionTitle>
        <BulletList items={lesson.workflow} />
        <CodeBox label={`${module.title} example`}>{lesson.commands}</CodeBox>
        <Para>
          Do not read the example as magic syntax to memorize. Read it as a production habit:
          name the objects clearly, make assumptions visible, preserve enough metadata to debug later,
          and keep the business promise attached to the SQL.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Mistakes and debugging" />
        <SectionTitle>Common Mistakes That Break Snowflake Projects</SectionTitle>
        <Callout title="Watch these carefully" color="#ef4444">
          <BulletList items={lesson.mistakes} />
        </Callout>
        <SubTitle>How to debug this topic</SubTitle>
        <Para>
          Start by asking what promise failed: freshness, correctness, access, speed, or cost.
          Then inspect the Snowflake evidence: query history, warehouse metering, task history,
          copy history, grants, row counts, and sample records. Good Snowflake debugging is not
          guessing. It is reading the platform metadata until the failure has a shape.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Production depth" />
        <SectionTitle>Production Notes</SectionTitle>
        <BulletList items={lesson.productionNotes} />
        <HighlightBox>
          <Para>
            <strong>Production standard:</strong> A Snowflake design is not complete when the query returns rows.
            It is complete when the team knows who owns it, how fresh it should be, how access is controlled,
            what it costs, how to detect failure, and how to recover safely.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Interview and project readiness" />
        <SectionTitle>Explain It Like a Professional</SectionTitle>
        <Para>{lesson.interview}</Para>
        <SubTitle>Mini project</SubTitle>
        <Para>{lesson.project}</Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            `How would you explain ${module.title} to a non-technical manager?`,
            `Which Snowflake objects, roles, or SQL statements does this topic use?`,
            'What can fail in production and which metadata view would you inspect first?',
            'What is the cost or security risk if this is implemented carelessly?',
            'How would you test that the result is correct and rerunnable?',
          ]}
        />
      </section>

      <KeyTakeaways items={lesson.takeaways} />
    </LearnLayout>
  )
}
