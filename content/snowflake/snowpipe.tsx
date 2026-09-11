import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function Snowpipe() {
  return (
    <LearnLayout
      title="Snowpipe and Continuous Loading"
      description="Snowpipe architecture, stages, file formats, pipes, auto-ingest, cloud notifications, error handling, monitoring, replay, file sizing, cost, and production loading patterns."
      section="Snowflake — Module 10"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Snowpipe and Continuous Loading', href: '/learn/snowflake/snowpipe' },
      ]}
      prev={{ title: 'Time Travel, Fail-safe, and Zero-Copy Cloning', href: '/learn/snowflake/time-travel-cloning' }}
      next={{ title: 'Streams and Tasks', href: '/learn/snowflake/streams-and-tasks' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Snowpipe is" />
        <SectionTitle>Snowpipe Loads Files Continuously Into Snowflake</SectionTitle>
        <Para>
          Snowpipe is Snowflake's continuous file loading service. It watches for new files in a stage,
          runs a COPY INTO statement defined inside a pipe, and loads the data into a table. It is commonly
          used when files land throughout the day and waiting for a once-a-day batch is too slow.
        </Para>
        <Para>
          Snowpipe is not the same thing as row-by-row streaming. It still loads files. A source application,
          connector, or cloud service writes files to cloud storage, and Snowpipe loads those files into
          Snowflake. The files may arrive frequently, even every few seconds or minutes, but the unit of work
          is still a file.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> Snowpipe is an automated receiving dock for data files.
            When new files arrive, Snowflake can load them without you manually scheduling COPY commands.
          </Para>
        </HighlightBox>
        <CodeBox label="Snowpipe mental model">{`Cloud storage
  s3://company-orders/events/
      |
      | new files arrive
      v
Cloud notification
  S3 event / Azure Event Grid / GCS notification
      |
      v
Snowpipe
  pipe object with COPY INTO definition
      |
      v
RAW table
  raw events + metadata
      |
      v
ELT models
  Silver and Gold`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — When to use Snowpipe" />
        <SectionTitle>Use Snowpipe When Files Arrive Frequently and Freshness Matters</SectionTitle>
        <Para>
          Snowpipe is useful when you need data loaded continuously without managing a warehouse schedule for
          every small file arrival. It fits log files, partner drops, application exports, event files,
          IoT-style file batches, and CDC files produced by external tools.
        </Para>
        <Table
          headers={['Use case', 'Snowpipe fit?', 'Why']}
          rows={[
            ['Hourly partner CSV files.', 'Good.', 'Automates loading as files arrive.'],
            ['Application writes JSON event files every few minutes.', 'Good.', 'Near-continuous file ingestion.'],
            ['One huge monthly finance file.', 'Usually normal COPY is enough.', 'A scheduled batch may be simpler.'],
            ['Sub-second app request path.', 'No.', 'Snowpipe is file ingestion, not low-latency serving.'],
            ['Kafka topic row-by-row processing.', 'Maybe not.', 'Consider Kafka connector, Snowpipe Streaming, or stream processor depending on need.'],
          ]}
        />
        <Callout title="Simple decision">
          Use Snowpipe when the source naturally lands files and you want those files loaded soon after arrival.
          Do not use it just because "streaming" sounds modern.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Core objects" />
        <SectionTitle>Snowpipe Uses Tables, File Formats, Stages, and Pipes</SectionTitle>
        <Para>
          A Snowpipe setup is not one object. You need a target table, a file format, a stage, and a pipe.
          In auto-ingest mode, you also need cloud notification integration. Each piece has a separate job.
        </Para>
        <Table
          headers={['Object', 'Purpose', 'Example']}
          rows={[
            ['Target table', 'Where rows land.', 'RAW.ORDER_EVENTS.'],
            ['File format', 'How Snowflake parses files.', 'CSV, JSON, PARQUET options.'],
            ['Stage', 'Where files are stored.', 'Internal stage or S3/Azure/GCS external stage.'],
            ['Pipe', 'COPY INTO definition that Snowpipe runs.', 'ORDER_EVENTS_PIPE.'],
            ['Notification', 'Tells Snowpipe new files arrived.', 'S3 event, Azure Event Grid, GCS Pub/Sub.'],
          ]}
        />
        <CodeBox label="Minimal JSON Snowpipe objects">{`CREATE OR REPLACE TABLE RAW.ORDER_EVENTS (
  payload VARIANT,
  source_file STRING,
  source_row_number NUMBER,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE FILE FORMAT JSON_EVENTS_FORMAT
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE OR REPLACE STAGE ORDER_EVENTS_STAGE
  URL = 's3://company-orders/events/'
  FILE_FORMAT = JSON_EVENTS_FORMAT;

CREATE OR REPLACE PIPE ORDER_EVENTS_PIPE
AS
COPY INTO RAW.ORDER_EVENTS (payload, source_file, source_row_number)
FROM (
  SELECT $1, METADATA$FILENAME, METADATA$FILE_ROW_NUMBER
  FROM @ORDER_EVENTS_STAGE
);`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Auto-ingest" />
        <SectionTitle>Auto-Ingest Uses Cloud Notifications</SectionTitle>
        <Para>
          Without auto-ingest, Snowpipe can still be triggered through Snowflake mechanisms or REST API calls.
          With auto-ingest, cloud storage notifications tell Snowflake when new files arrive. The setup differs
          by cloud provider, but the concept is the same: file arrives, event fires, pipe receives notification,
          Snowflake loads the file.
        </Para>
        <CodeBox label="Pipe with auto-ingest">{`CREATE OR REPLACE PIPE ORDER_EVENTS_PIPE
  AUTO_INGEST = TRUE
AS
COPY INTO RAW.ORDER_EVENTS (payload, source_file, source_row_number)
FROM (
  SELECT $1, METADATA$FILENAME, METADATA$FILE_ROW_NUMBER
  FROM @ORDER_EVENTS_STAGE
);`}
        </CodeBox>
        <Table
          headers={['Cloud', 'Typical notification service', 'What to verify']}
          rows={[
            ['AWS', 'S3 event notification through SNS/SQS-style integration.', 'Bucket path, permissions, notification channel, stage URL.'],
            ['Azure', 'Event Grid integration.', 'Storage account events, queue/integration permissions.'],
            ['Google Cloud', 'Pub/Sub notification.', 'Topic/subscription permissions and stage path.'],
          ]}
        />
        <Callout title="Most common auto-ingest bug">
          The pipe SQL is correct, but cloud notifications are not reaching Snowflake. Always debug both sides:
          Snowflake pipe status and cloud notification configuration.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — CSV loading" />
        <SectionTitle>CSV Snowpipe Needs Careful File Format Options</SectionTitle>
        <Para>
          CSV looks simple until quotes, commas, headers, nulls, dates, and bad rows appear. A production CSV
          Snowpipe should define its file format explicitly and load metadata that helps debugging.
        </Para>
        <CodeBox label="CSV file format and pipe">{`CREATE OR REPLACE TABLE RAW.ORDERS_CSV (
  order_id STRING,
  customer_id STRING,
  order_ts STRING,
  total_usd STRING,
  source_file STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE FILE FORMAT ORDERS_CSV_FORMAT
  TYPE = CSV
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('', 'NULL', 'null')
  TRIM_SPACE = TRUE;

CREATE OR REPLACE STAGE ORDERS_CSV_STAGE
  URL = 's3://company-orders/csv/'
  FILE_FORMAT = ORDERS_CSV_FORMAT;

CREATE OR REPLACE PIPE ORDERS_CSV_PIPE
AS
COPY INTO RAW.ORDERS_CSV (
  order_id, customer_id, order_ts, total_usd, source_file
)
FROM (
  SELECT $1, $2, $3, $4, METADATA$FILENAME
  FROM @ORDERS_CSV_STAGE
);`}
        </CodeBox>
        <Table
          headers={['CSV issue', 'File format option', 'Why']}
          rows={[
            ['Header row.', 'SKIP_HEADER.', 'Prevents header text loading as data.'],
            ['Commas inside quoted text.', 'FIELD_OPTIONALLY_ENCLOSED_BY.', 'Parses quoted fields safely.'],
            ['Blank nulls.', 'NULL_IF.', 'Avoids treating empty strings as meaningful values.'],
            ['Extra spaces.', 'TRIM_SPACE.', 'Reduces avoidable cleanup.'],
            ['Bad dates/numbers.', 'Load as string, cast in Silver.', 'Keeps Raw faithful and errors measurable.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Parquet loading" />
        <SectionTitle>Columnar Files Such as Parquet Are Often Better for Data Lakes</SectionTitle>
        <Para>
          Parquet is a columnar file format common in data lakes. It carries schema information and can be
          efficient for analytics workflows. Snowpipe can load Parquet files too. Many lake-to-warehouse
          pipelines use Parquet when data is produced by Spark, Flink, Glue, Databricks, or other big data
          tools.
        </Para>
        <CodeBox label="Parquet loading pattern">{`CREATE OR REPLACE FILE FORMAT PARQUET_FORMAT
  TYPE = PARQUET;

CREATE OR REPLACE STAGE ORDERS_PARQUET_STAGE
  URL = 's3://company-orders/parquet/'
  FILE_FORMAT = PARQUET_FORMAT;

CREATE OR REPLACE TABLE RAW.ORDERS_PARQUET (
  payload VARIANT,
  source_file STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE PIPE ORDERS_PARQUET_PIPE
AS
COPY INTO RAW.ORDERS_PARQUET (payload, source_file)
FROM (
  SELECT $1, METADATA$FILENAME
  FROM @ORDERS_PARQUET_STAGE
);`}
        </CodeBox>
        <Callout title="Model after load">
          Even with Parquet, Raw is still not your final model. Create typed Silver tables with explicit
          business keys, timestamps, and quality checks.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — File sizing" />
        <SectionTitle>File Size and File Count Affect Snowpipe Efficiency</SectionTitle>
        <Para>
          Tiny files create overhead. Huge files can delay availability and make retries more painful.
          Snowpipe works best when upstream systems create reasonably sized files at a steady cadence. The
          perfect size depends on workload, cloud, format, and freshness needs, but the design principle is
          stable: avoid millions of tiny files if you can batch them.
        </Para>
        <Table
          headers={['Pattern', 'Effect', 'Guidance']}
          rows={[
            ['Many tiny files every second.', 'High metadata and load overhead.', 'Buffer upstream into larger files when possible.'],
            ['One huge daily file.', 'Slow freshness and painful retry.', 'Split into time/source partitions.'],
            ['Moderate files every few minutes.', 'Often a good Snowpipe fit.', 'Monitor freshness and cost.'],
            ['Compressed files.', 'Less storage/network.', 'Use supported compression and test load speed.'],
          ]}
        />
        <CodeBox label="Upstream file layout example">{`Better layout:
  s3://company-orders/events/dt=2026-09-11/hour=08/orders_0001.json.gz
  s3://company-orders/events/dt=2026-09-11/hour=08/orders_0002.json.gz
  s3://company-orders/events/dt=2026-09-11/hour=09/orders_0001.json.gz

Weaker layout:
  s3://company-orders/events/event_1.json
  s3://company-orders/events/event_2.json
  s3://company-orders/events/event_3.json
  ... millions of tiny files`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Error handling" />
        <SectionTitle>Decide What Happens When Rows Are Bad</SectionTitle>
        <Para>
          Loading errors are not just technical noise. They decide whether data arrives late, partially, or
          incorrectly. A production Snowpipe should have a clear stance: should a bad file stop the load,
          should valid rows continue, where are rejected rows tracked, and who gets alerted?
        </Para>
        <CodeBox label="Validate files before loading">{`COPY INTO RAW.ORDER_EVENTS (payload, source_file)
FROM (
  SELECT $1, METADATA$FILENAME
  FROM @ORDER_EVENTS_STAGE
)
VALIDATION_MODE = RETURN_ERRORS;`}
        </CodeBox>
        <Table
          headers={['Error strategy', 'Behavior', 'Use when']}
          rows={[
            ['Fail fast', 'Stop when errors appear.', 'Strict feeds where partial data is dangerous.'],
            ['Continue with audit', 'Load good rows and record failures.', 'Large feeds where a few bad rows should not block all data.'],
            ['Quarantine bad files', 'Move or mark bad inputs.', 'Partner feeds or source systems that need correction.'],
            ['Load raw then validate', 'Preserve payload, flag bad fields later.', 'Semi-structured and evolving sources.'],
          ]}
        />
        <Callout title="Do not ignore errors">
          ON_ERROR = CONTINUE without monitoring is a silent data quality bug. If you continue past errors,
          count them and alert when they exceed the expected threshold.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Monitoring" />
        <SectionTitle>Monitor Pipe Status, Load History, and Freshness</SectionTitle>
        <Para>
          Snowpipe is production infrastructure. It needs monitoring. The three most important questions are:
          is the pipe healthy, are files loading successfully, and is the target table fresh enough for the
          business?
        </Para>
        <CodeBox label="Snowpipe monitoring queries">{`-- Check pipe status.
SELECT SYSTEM$PIPE_STATUS('ORDER_EVENTS_PIPE');

-- Inspect load history for recent files.
SELECT *
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'RAW.ORDER_EVENTS',
  START_TIME => DATEADD(hour, -6, CURRENT_TIMESTAMP())
))
ORDER BY LAST_LOAD_TIME DESC;

-- Table freshness from loaded_at metadata.
SELECT
  MAX(loaded_at) AS latest_loaded_at,
  DATEDIFF('minute', MAX(loaded_at), CURRENT_TIMESTAMP()) AS minutes_since_latest_load
FROM RAW.ORDER_EVENTS;`}
        </CodeBox>
        <Table
          headers={['Signal', 'Healthy example', 'Bad example']}
          rows={[
            ['Pipe status', 'Running with recent notifications.', 'Paused, stale, or notification errors.'],
            ['Copy history', 'Recent files loaded successfully.', 'Repeated load errors or no recent files.'],
            ['Freshness', 'Latest loaded_at within SLA.', 'No rows for hours when files should arrive.'],
            ['Volume', 'Expected rows per hour.', 'Sudden zero rows or 10x spike.'],
            ['Rejected rows', 'Near zero or expected threshold.', 'Growing rejects from schema drift.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Replay and backfill" />
        <SectionTitle>Have a Replay Plan for Missed or Bad Loads</SectionTitle>
        <Para>
          A pipe can miss notifications, be paused, or load bad data that needs repair. A mature pipeline has
          a replay plan. That usually means the raw files remain available in cloud storage, the target table
          stores source_file metadata, and the team knows how to refresh the pipe or run COPY manually for an
          affected path.
        </Para>
        <CodeBox label="Replay options">{`-- Refresh a pipe so Snowpipe scans a stage path for files.
ALTER PIPE ORDER_EVENTS_PIPE REFRESH;

-- Refresh a specific prefix when needed.
ALTER PIPE ORDER_EVENTS_PIPE REFRESH PREFIX = 'dt=2026-09-11/hour=08/';

-- Manual COPY for a backfill or repair path.
COPY INTO RAW.ORDER_EVENTS (payload, source_file, source_row_number)
FROM (
  SELECT $1, METADATA$FILENAME, METADATA$FILE_ROW_NUMBER
  FROM @ORDER_EVENTS_STAGE/dt=2026-09-11/hour=08/
);`}
        </CodeBox>
        <Callout title="Replay requires idempotency">
          If replaying files inserts duplicate raw rows and downstream models cannot dedupe them, replay will
          fix freshness but break correctness. Store event IDs, file names, row numbers, and batch metadata.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Duplicate files and load tracking" />
        <SectionTitle>Snowpipe Tracks Loaded Files, But You Still Need Data-Level Dedupe</SectionTitle>
        <Para>
          Snowflake tracks file load metadata to avoid reloading the same file in normal cases. But real
          pipelines can still duplicate data: the same records may arrive in a new file name, a producer may
          resend a batch, or a backfill may overlap with normal daily files. File-level tracking is not the
          same as business-level deduplication.
        </Para>
        <CodeBox label="Detect duplicate source events">{`SELECT
  payload:event_id::STRING AS event_id,
  COUNT(*) AS row_count,
  ARRAY_AGG(DISTINCT source_file) AS files
FROM RAW.ORDER_EVENTS
GROUP BY event_id
HAVING COUNT(*) > 1
ORDER BY row_count DESC;`}
        </CodeBox>
        <Table
          headers={['Duplicate type', 'Example', 'Fix']}
          rows={[
            ['Same file loaded twice.', 'Manual force load or copied file path.', 'Use load history and avoid unsafe force reloads.'],
            ['Same records in new file.', 'Producer resent batch_123 as batch_124.', 'Dedupe by event_id or business key.'],
            ['Backfill overlap.', 'Historical files include already processed dates.', 'Idempotent downstream MERGE.'],
            ['No event id.', 'Cannot identify duplicates reliably.', 'Create hash or demand source contract improvement.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Security" />
        <SectionTitle>Snowpipe Needs Cloud and Snowflake Permissions</SectionTitle>
        <Para>
          Snowpipe sits between cloud storage and Snowflake, so security has two sides. Snowflake roles need
          privileges on pipes, stages, file formats, and target tables. Cloud identities need permission to
          read the storage path and receive notifications. Over-broad access creates risk; under-granted access
          creates mysterious load failures.
        </Para>
        <Table
          headers={['Boundary', 'What to control', 'Common mistake']}
          rows={[
            ['Cloud storage', 'Read access to exact bucket/container/path.', 'Granting access to the entire data lake.'],
            ['Notifications', 'Event permission to the correct pipe integration.', 'Events configured for wrong prefix.'],
            ['Snowflake stage', 'USAGE/read on stage and integration.', 'Stage points to path role cannot access.'],
            ['Target table', 'INSERT privileges for loading role.', 'Pipe owner cannot write target.'],
            ['Raw schema', 'Restrict broad analyst reads.', 'Raw payloads expose PII.'],
          ]}
        />
        <CodeBox label="Snowflake-side privilege sketch">{`CREATE ROLE ORDER_EVENTS_LOADER;

GRANT USAGE ON DATABASE RETAIL TO ROLE ORDER_EVENTS_LOADER;
GRANT USAGE ON SCHEMA RETAIL.RAW TO ROLE ORDER_EVENTS_LOADER;
GRANT INSERT ON TABLE RETAIL.RAW.ORDER_EVENTS TO ROLE ORDER_EVENTS_LOADER;
GRANT USAGE ON STAGE RETAIL.RAW.ORDER_EVENTS_STAGE TO ROLE ORDER_EVENTS_LOADER;

-- Pipe ownership and operation should be controlled by a platform/loading role,
-- not by random analyst roles.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Cost" />
        <SectionTitle>Snowpipe Cost Comes From Serverless Loading Work</SectionTitle>
        <Para>
          Snowpipe uses Snowflake-managed compute for loading rather than your manually selected virtual
          warehouse. That is convenient, but it is not free. File count, frequency, volume, error patterns,
          and replay behavior all affect cost. Bad upstream file design can make Snowpipe more expensive than
          it needs to be.
        </Para>
        <BulletList
          items={[
            'Avoid extreme tiny-file patterns when upstream batching is possible.',
            'Monitor load frequency and row volume by source.',
            'Keep replay controlled; repeated backfills can create cost and duplicate risk.',
            'Compare Snowpipe with scheduled COPY for low-frequency batch loads.',
            'Connect load cost to freshness requirements: do you really need continuous load for this feed?',
          ]}
        />
        <CodeBox label="Cost investigation starting point">{`-- Pair load history with freshness and volume checks.
SELECT
  DATE_TRUNC('hour', loaded_at) AS load_hour,
  COUNT(*) AS rows_loaded,
  COUNT(DISTINCT source_file) AS files_loaded
FROM RAW.ORDER_EVENTS
WHERE loaded_at >= DATEADD(day, -7, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY 1 DESC;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Snowpipe vs alternatives" />
        <SectionTitle>Snowpipe Is Not Always the Right Loading Tool</SectionTitle>
        <Para>
          Snowflake has multiple ingestion patterns. Snowpipe is a strong option, but not always the best one.
          Scheduled COPY, external tables, Kafka connectors, Snowpipe Streaming, and managed ETL tools can
          all be valid depending on latency, source type, file shape, volume, cost, and operational ownership.
        </Para>
        <Table
          headers={['Pattern', 'Best for', 'Not ideal for']}
          rows={[
            ['Scheduled COPY', 'Predictable batch files.', 'Frequent low-latency loads.'],
            ['Snowpipe', 'Continuous file loading.', 'True row-level sub-second streaming.'],
            ['Snowpipe Streaming', 'Lower-latency streaming-style ingestion through supported clients/connectors.', 'Simple batch file loads.'],
            ['External tables', 'Querying files in place for lake-style access.', 'Heavy curated warehouse modeling by itself.'],
            ['Kafka connector', 'Kafka topic to Snowflake integration.', 'Sources that do not use Kafka or connector stack.'],
            ['ETL/ELT tool', 'Managed connectors and transformations.', 'Highly custom ingestion requiring low-level control.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Anti-patterns" />
        <SectionTitle>Snowpipe Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Calling Snowpipe real-time streaming and promising sub-second application behavior.',
              'Creating millions of tiny files because upstream batching was ignored.',
              'Using ON_ERROR = CONTINUE with no rejected-row monitoring.',
              'Loading raw files without source_file or loaded_at metadata.',
              'Assuming file-level load tracking removes the need for event-level dedupe.',
              'Granting broad raw table access even though raw payloads contain PII.',
              'Never testing replay until a notification outage occurs.',
              'Letting pipe ownership sit with a personal user or temporary role.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Troubleshooting" />
        <SectionTitle>Snowpipe Troubleshooting Playbook</SectionTitle>
        <Para>
          When Snowpipe data is stale, move layer by layer. Did the file arrive? Did the cloud notification
          fire? Did Snowflake receive it? Did COPY fail? Did rows land but fail downstream quality checks?
        </Para>
        <Table
          headers={['Symptom', 'Likely cause', 'First checks']}
          rows={[
            ['No new rows.', 'No files, broken notification, paused pipe.', 'Cloud storage path, SYSTEM$PIPE_STATUS, COPY_HISTORY.'],
            ['Files in storage but not loaded.', 'Notification prefix or integration issue.', 'Cloud event config and pipe status.'],
            ['Load errors.', 'Bad file format or schema drift.', 'COPY_HISTORY error details and validation mode.'],
            ['Rows loaded but dashboard stale.', 'Downstream ELT task failed.', 'Task history, Silver/Gold freshness.'],
            ['Duplicate metrics.', 'Duplicate records in new file names.', 'event_id duplicate query and downstream merge logic.'],
          ]}
        />
        <CodeBox label="Debug checklist">{`1. List files in the stage path.
2. Check SYSTEM$PIPE_STATUS.
3. Check INFORMATION_SCHEMA.COPY_HISTORY.
4. Validate a sample file manually with VALIDATION_MODE.
5. Query RAW table by source_file and loaded_at.
6. Check downstream Silver/Gold tasks and freshness.
7. Replay only after confirming idempotent downstream behavior.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build a Local Snowpipe-Style Load</SectionTitle>
        <Para>
          Full auto-ingest requires cloud notification setup, but you can learn the Snowpipe structure with
          an internal stage and manual file upload. This lab teaches the table, file format, stage, pipe, and
          load metadata pattern.
        </Para>
        <CodeBox label="Lab setup">{`CREATE OR REPLACE DATABASE SNOWPIPE_LAB;
CREATE OR REPLACE SCHEMA SNOWPIPE_LAB.RAW;

CREATE OR REPLACE TABLE SNOWPIPE_LAB.RAW.ORDER_EVENTS (
  payload VARIANT,
  source_file STRING,
  source_row_number NUMBER,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE FILE FORMAT SNOWPIPE_LAB.RAW.JSON_EVENTS_FORMAT
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE OR REPLACE STAGE SNOWPIPE_LAB.RAW.ORDER_EVENTS_STAGE
  FILE_FORMAT = SNOWPIPE_LAB.RAW.JSON_EVENTS_FORMAT;

-- Upload local files with SnowSQL or another client:
-- PUT file:///path/to/order_events.json @SNOWPIPE_LAB.RAW.ORDER_EVENTS_STAGE;`}
        </CodeBox>
        <CodeBox label="Lab load and inspect">{`COPY INTO SNOWPIPE_LAB.RAW.ORDER_EVENTS (
  payload, source_file, source_row_number
)
FROM (
  SELECT $1, METADATA$FILENAME, METADATA$FILE_ROW_NUMBER
  FROM @SNOWPIPE_LAB.RAW.ORDER_EVENTS_STAGE
);

SELECT
  payload:event_id::STRING AS event_id,
  payload:order:order_id::STRING AS order_id,
  source_file,
  loaded_at
FROM SNOWPIPE_LAB.RAW.ORDER_EVENTS
ORDER BY loaded_at DESC;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'What object tells Snowflake how to parse the file?',
            'What object points to the file location?',
            'Why do we store source_file and source_row_number?',
            'How would auto-ingest change this lab?',
            'What downstream Silver model would you create from payload?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Production design example" />
        <SectionTitle>Design Continuous Order Event Loading</SectionTitle>
        <Para>
          A realistic production design ties Snowpipe to Raw/Silver/Gold. Snowpipe loads raw files. A stream
          or task processes new raw rows. A Silver model dedupes and types records. Gold tables aggregate for
          dashboards. Monitoring watches every step.
        </Para>
        <CodeBox label="Production flow">{`1. Application writes compressed JSON files:
   s3://company-orders/events/dt=YYYY-MM-DD/hour=HH/orders_*.json.gz

2. S3 notification triggers ORDER_EVENTS_PIPE.

3. Snowpipe loads into RAW.ORDER_EVENTS:
   payload, source_file, source_row_number, loaded_at

4. Task processes raw rows into SILVER.ORDERS and SILVER.ORDER_ITEMS:
   cast fields, flatten arrays, dedupe event_id/order_id

5. Gold models publish:
   GOLD.DAILY_REVENUE
   GOLD.PRODUCT_SALES
   GOLD.CUSTOMER_LTV

6. Monitoring checks:
   pipe status
   copy history errors
   raw freshness
   duplicate event ids
   downstream task failures
   dashboard freshness`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Interview answer" />
        <SectionTitle>How to Explain Snowpipe in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowpipe is Snowflake's continuous file ingestion service. It uses
          a pipe object that contains a COPY INTO statement. Files land in a stage, and with auto-ingest, cloud
          notifications tell Snowflake to load new files. It is excellent for frequently arriving files, but it
          is not generic row-by-row streaming. In production, I would define file formats explicitly, store
          source file metadata, monitor pipe status and copy history, handle errors deliberately, plan replay,
          dedupe at the data level, protect raw data with roles, and choose file sizes that balance freshness
          and overhead.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is Snowpipe and how is it different from COPY INTO?',
            'What objects are needed for a Snowpipe load?',
            'What does auto-ingest require?',
            'Why is Snowpipe not the same as true streaming?',
            'How do you monitor Snowpipe health?',
            'How do you replay missed files safely?',
            'What file-size and duplicate-data issues matter in production?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowpipe automates continuous file loading into Snowflake.',
          'A production pipe uses a target table, file format, stage, pipe, and usually cloud notifications.',
          'Snowpipe is file-based continuous loading, not a low-latency application streaming engine.',
          'Metadata such as source_file, source_row_number, and loaded_at makes loads debuggable.',
          'Monitoring pipe status, copy history, freshness, errors, and volume is mandatory.',
          'Replay and duplicate handling require idempotent downstream design.',
          'Choose Snowpipe when frequent file ingestion fits the business freshness requirement.',
        ]}
      />
    </LearnLayout>
  )
}
