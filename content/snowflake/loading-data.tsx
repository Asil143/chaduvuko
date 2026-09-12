import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function LoadingData() {
  return (
    <LearnLayout
      title="Loading Data with Stages and COPY INTO"
      description="Internal vs external stages, stage types, file formats, PUT, COPY INTO in depth, validation, rejected rows, load history and idempotency, and a full worked S3 load."
      section="Snowflake — Module 05"
      readTime="90 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Loading Data', href: '/learn/snowflake/loading-data' },
      ]}
      prev={{ title: 'Roles and Security Basics', href: '/learn/snowflake/roles-security-basics' }}
      next={{ title: 'Semi-Structured Data: VARIANT, JSON, FLATTEN', href: '/learn/snowflake/semi-structured-data' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Loading model" />
        <SectionTitle>Snowflake Loads Files Through Stages, File Formats, and COPY INTO</SectionTitle>
        <Para>
          Most Snowflake ingestion begins with files. A source system writes CSV, JSON, Parquet, or Avro to
          cloud storage, or you upload files directly from your laptop. Snowflake reads those files through a
          stage — a pointer to a storage location. A file format tells Snowflake how to parse the files once it
          gets there. <code>COPY INTO</code> is the command that actually loads the parsed rows into a table.
        </Para>
        <Table
          headers={['Object', 'Purpose', 'Example']}
          rows={[
            ['Stage', 'Location where Snowflake reads files from.', '@RAW.ORDERS_STAGE'],
            ['File format', 'Parsing rules for CSV/JSON/Parquet/etc.', 'CSV_WITH_HEADER'],
            ['Target table', 'Table that receives loaded rows.', 'RAW.ORDERS'],
            ['COPY INTO', 'Command that loads files into the target table.', 'COPY INTO RAW.ORDERS FROM @stage'],
          ]}
        />
        <CodeBox label="Ingestion mental model">{`Local files, S3, ADLS, or GCS
        │
        ▼
Snowflake stage (internal or external)
        │
        ▼
File format (parsing rules)
        │
        ▼
COPY INTO <table>
        │
        ▼
Raw table  ->  Silver cleanup  ->  Gold marts`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Internal vs external stages" />
        <SectionTitle>Internal Stages Are Snowflake-Managed; External Stages Point at Your Cloud Storage</SectionTitle>
        <Para>
          A stage is nothing more than a named reference to a set of files. Snowflake supports two fundamentally
          different kinds. An <strong>internal stage</strong> uses storage that Snowflake itself manages inside
          your account — you upload files to it and Snowflake handles the storage details. An{' '}
          <strong>external stage</strong> is a reference to a location you already control in Amazon S3, Azure
          Blob/ADLS, or Google Cloud Storage — Snowflake reads from (and can write to) that location using scoped
          permissions, but the files remain in your own cloud storage account.
        </Para>
        <Table
          headers={['Stage kind', 'Where files live', 'Typical use']}
          rows={[
            ['Internal', 'Snowflake-managed storage inside your account.', 'Ad-hoc uploads, small teams without existing cloud storage pipelines, PUT-based workflows.'],
            ['External', 'Your own S3 bucket / ADLS container / GCS bucket.', 'Production pipelines where files already land in cloud storage from other systems.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> internal = Snowflake's own storage closet; external = a
            labeled window into a storage closet you already own elsewhere. Either way, COPY INTO reads through
            the stage the same way — the SQL for loading barely changes based on which kind you're using.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The four stage types" />
        <SectionTitle>User Stage, Table Stage, Named Internal Stage, External Stage</SectionTitle>
        <Para>
          Beyond the internal/external split, Snowflake gives every user and every table an implicit internal
          stage automatically, plus the ability to create named stages explicitly.
        </Para>
        <Table
          headers={['Stage type', 'Reference syntax', 'Notes']}
          rows={[
            ['User stage', '@~', 'One per user, always exists, not shared between users. Good for personal one-off uploads.'],
            ['Table stage', '@%table_name', 'One per table, always exists, tied to that specific table. Convenient when a stage is only ever used to load one table.'],
            ['Named internal stage', '@my_stage', 'Explicitly created with CREATE STAGE, lives in a schema, can be shared across users/tables via grants.'],
            ['External stage', '@my_s3_stage', 'Explicitly created with CREATE STAGE plus a URL and cloud credentials/storage integration, points at S3/ADLS/GCS.'],
          ]}
        />
        <CodeBox label="Referencing each stage type">{`-- User stage
LIST @~;

-- Table stage (for RAW.ORDERS)
LIST @%ORDERS;

-- Named internal stage
CREATE OR REPLACE STAGE RAW.ORDERS_STAGE;
LIST @RAW.ORDERS_STAGE;

-- External stage (S3) - covered in depth in Part 09
LIST @RAW.S3_ORDERS_STAGE;`}
        </CodeBox>
        <Callout title="Default choice for pipelines">
          For anything beyond a quick one-off load, prefer a named stage (internal or external) over the user or
          table stage. Named stages are easier to grant access to, easier to find in SHOW STAGES, and don't
          disappear if a table gets dropped and recreated.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — File formats" />
        <SectionTitle>CREATE FILE FORMAT: Telling Snowflake How to Parse Files</SectionTitle>
        <Para>
          CSV looks simple but causes many production bugs: embedded commas, quoted strings, blank values,
          header rows, inconsistent column counts, and inconsistent null representations. A file format object
          makes every one of those parsing rules explicit and reusable across many COPY INTO statements.
        </Para>
        <CodeBox label="A real CSV file format">{`CREATE OR REPLACE FILE FORMAT RAW.CSV_WITH_HEADER
  TYPE                          = CSV
  FIELD_DELIMITER                = ','
  SKIP_HEADER                    = 1
  FIELD_OPTIONALLY_ENCLOSED_BY   = '"'
  NULL_IF                        = ('', 'NULL', 'null', '\\\\N')
  EMPTY_FIELD_AS_NULL            = TRUE
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
  COMMENT                        = 'Standard CSV format for partner order feeds';`}
        </CodeBox>
        <Table
          headers={['Option', 'What it controls', 'Common gotcha']}
          rows={[
            ['FIELD_DELIMITER', 'Character separating fields.', "Some feeds use pipe (|) or tab instead of comma — check before assuming ','."],
            ['SKIP_HEADER', 'Number of leading rows to skip.', 'Forgetting this loads the header row as a data row with garbage values.'],
            ['FIELD_OPTIONALLY_ENCLOSED_BY', 'Quote character wrapping fields that contain the delimiter.', 'Without this, a value like "Reed, Marcus" splits into two fields.'],
            ['NULL_IF', 'List of string values treated as NULL.', 'Feeds often use inconsistent null markers — empty string, "NULL", "N/A" — list them all.'],
            ['EMPTY_FIELD_AS_NULL', 'Whether an empty field (not the same as a NULL_IF match) becomes NULL.', 'Leaving this FALSE can load empty strings where you expect NULL.'],
          ]}
        />
        <Para>
          File formats aren't limited to CSV. JSON and Parquet get their own <code>TYPE</code> values with
          different relevant options — for example JSON supports <code>STRIP_OUTER_ARRAY</code> to unwrap a
          top-level array into individual records, and Parquet is self-describing so it needs far fewer options:
        </Para>
        <CodeBox label="JSON and Parquet file formats, briefly">{`CREATE OR REPLACE FILE FORMAT RAW.JSON_STANDARD
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE OR REPLACE FILE FORMAT RAW.PARQUET_STANDARD
  TYPE = PARQUET;

-- Both are covered in full depth in the semi-structured data module.
-- This module focuses on CSV, since it's the most common first load.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Uploading files with PUT" />
        <SectionTitle>PUT Moves Local Files Onto an Internal Stage</SectionTitle>
        <Para>
          <code>PUT</code> is how you get a file from your local machine onto an internal stage. It is a
          client-side command — it runs from SnowSQL or a driver that has local filesystem access, not from
          Snowsight's web worksheet, which cannot read your local disk. Once a file is staged, COPY INTO can load
          it regardless of which client issued the PUT.
        </Para>
        <CodeBox label="Uploading a local CSV with SnowSQL">{`-- Run from the SnowSQL CLI, not from a Snowsight worksheet:
PUT file:///Users/asil/data/orders_2026_09_01.csv @RAW.ORDERS_STAGE
  AUTO_COMPRESS = TRUE
  OVERWRITE = FALSE;

-- Confirm the file landed on the stage:
LIST @RAW.ORDERS_STAGE;`}
        </CodeBox>
        <Table
          headers={['PUT option', 'What it does']}
          rows={[
            ['AUTO_COMPRESS', 'Gzip-compresses the file during upload (default TRUE) — smaller storage, faster network transfer.'],
            ['OVERWRITE', 'Whether to replace a file already on the stage with the same name (default FALSE).'],
            ['PARALLEL', 'Number of parallel upload threads for large files or many files at once.'],
          ]}
        />
        <Callout title="PUT is not for external stages">
          You never PUT to an external stage — files there already live in your S3/ADLS/GCS bucket, uploaded by
          whatever system produces them (an application, an ETL job, a manual upload to the bucket itself).
          COPY INTO reads external stage files directly; there's no PUT step for external stages.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — COPY INTO in depth" />
        <SectionTitle>COPY INTO: The Command That Actually Loads Rows</SectionTitle>
        <Para>
          <code>COPY INTO</code> reads staged files through a file format and inserts the parsed rows into a
          target table. Its full syntax accepts the stage, the file format, an optional file pattern, and error
          handling behavior.
        </Para>
        <CodeBox label="Table and stage setup">{`CREATE OR REPLACE TABLE RAW.ORDERS_LOAD (
  order_id      STRING,
  customer_id   STRING,
  order_ts      TIMESTAMP_NTZ,
  status        STRING,
  order_amount  NUMBER(10,2),
  updated_at    TIMESTAMP_NTZ
);

CREATE OR REPLACE STAGE RAW.ORDERS_STAGE
  FILE_FORMAT = RAW.CSV_WITH_HEADER;`}
        </CodeBox>
        <CodeBox label="A full COPY INTO statement">{`COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
PATTERN     = '.*orders_2026_09.*[.]csv'
ON_ERROR    = 'ABORT_STATEMENT';`}
        </CodeBox>
        <Table
          headers={['Clause', 'Purpose']}
          rows={[
            ['FROM', 'The stage to read files from — internal or external.'],
            ['FILE_FORMAT', 'Named file format, or an inline format definition, describing how to parse each file.'],
            ['PATTERN', 'A regular expression restricting which staged files are considered — useful when a stage holds files for multiple tables or date ranges.'],
            ['ON_ERROR', "What to do when a row fails to parse: ABORT_STATEMENT, CONTINUE, or SKIP_FILE."],
          ]}
        />
        <CodeBox label="The three ON_ERROR behaviors">{`-- Fail the whole load if any row errors - safest default while building a pipeline
COPY INTO RAW.ORDERS_LOAD FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
ON_ERROR = 'ABORT_STATEMENT';

-- Load every good row, silently skip bad ones - needs monitoring
COPY INTO RAW.ORDERS_LOAD FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
ON_ERROR = 'CONTINUE';

-- Skip an entire file if it contains any error row - all-or-nothing per file
COPY INTO RAW.ORDERS_LOAD FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
ON_ERROR = 'SKIP_FILE';`}
        </CodeBox>
        <Callout title="Strict first, tolerant later">
          Use <code>ABORT_STATEMENT</code> while building and testing a pipeline. Only switch to{' '}
          <code>CONTINUE</code> or <code>SKIP_FILE</code> once you've added reject capture, alerting, and a
          reconciliation process — silently skipped rows are worse than a loud failed job, because nobody notices
          missing data until a stakeholder does.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Validation and rejected rows" />
        <SectionTitle>VALIDATE and VALIDATION_MODE Catch Problems Before You Commit a Load</SectionTitle>
        <Para>
          Snowflake lets you check what a COPY INTO would do without actually loading any rows. This is
          invaluable when debugging a new feed or checking a partner's file before it pollutes a Raw table.
        </Para>
        <CodeBox label="Validate before loading">{`-- Dry run: parse the files and return errors, but load nothing.
COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
VALIDATION_MODE = RETURN_ERRORS;

-- After a real load, inspect exactly which rows were rejected:
SELECT *
FROM TABLE(VALIDATE(RAW.ORDERS_LOAD, JOB_ID => '_last'));`}
        </CodeBox>
        <Table
          headers={['ON_ERROR / mode', 'Behavior', 'Risk']}
          rows={[
            ['ABORT_STATEMENT', 'Fail the whole load on the first error.', 'Strict and safe, but one bad row blocks the entire batch.'],
            ['CONTINUE', 'Load good rows and skip bad rows.', 'Can hide real data loss without monitoring and reject review.'],
            ['SKIP_FILE', 'Skip an entire file if it contains errors.', 'Can lose a whole file of otherwise-good rows if alerting is weak.'],
            ['VALIDATION_MODE = RETURN_ERRORS', 'Parse and report errors without loading anything.', 'Zero load risk — best for pre-flight checks on unfamiliar feeds.'],
          ]}
        />
        <Para>
          The <code>VALIDATE</code> table function is different from <code>VALIDATION_MODE</code>: it inspects
          the results of a load you already ran, telling you exactly which rows were rejected and why — the file
          name, line number, column name, and the parsing error message.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Load history and idempotency" />
        <SectionTitle>COPY INTO Automatically Skips Files It Has Already Loaded</SectionTitle>
        <Para>
          This is one of the most important — and most surprising — behaviors in all of Snowflake's loading
          model. By default, <code>COPY INTO</code> tracks which files it has already loaded into a given table,
          using load metadata Snowflake maintains internally for roughly 64 days. If you run the exact same
          COPY INTO statement against a stage that still contains a file you already loaded, Snowflake will{' '}
          <strong>silently skip that file</strong> rather than loading its rows a second time.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Why this matters:</strong> it makes COPY INTO naturally idempotent — rerunning a load job
            after a partial failure, or on a schedule that happens to see the same file twice, does not duplicate
            data. This is a deliberate safety feature, not a bug. But it also surprises beginners who expect a
            rerun to reload everything, and then can't figure out why "nothing happened" when they intentionally
            wanted to reload a corrected file.
          </Para>
        </HighlightBox>
        <CodeBox label="Force reload a specific file you've fixed">{`-- Without FORCE, Snowflake sees this file was already loaded and skips it:
COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
PATTERN = '.*orders_2026_09_01[.]csv';

-- To intentionally reload it (e.g. you fixed bad data upstream and re-uploaded):
COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_WITH_HEADER)
PATTERN = '.*orders_2026_09_01[.]csv'
FORCE = TRUE;`}
        </CodeBox>
        <Callout title="Rarely reach for FORCE = TRUE" color="#ef4444">
          FORCE = TRUE bypasses the exact safety mechanism that makes reruns safe. If you use it as a routine
          habit — say, in a scheduled job that always sets FORCE = TRUE "just in case" — you will silently
          duplicate rows every time a file happens to still be sitting on the stage. Reach for it only for a
          deliberate, one-off reload of a specific file you've already reasoned about, and prefer deleting/
          archiving old files from the stage over routinely forcing reloads.
        </Callout>
        <CodeBox label="Inspect load history">{`SELECT
  table_name,
  file_name,
  status,
  row_count,
  row_parsed,
  error_count,
  first_error_message,
  last_load_time
FROM INFORMATION_SCHEMA.LOAD_HISTORY
WHERE table_name = 'ORDERS_LOAD'
ORDER BY last_load_time DESC;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — External stages in depth" />
        <SectionTitle>External Stages Connect Snowflake to S3, ADLS, or GCS</SectionTitle>
        <Para>
          Production data usually lands in S3, Azure Blob/ADLS, or Google Cloud Storage before Snowflake ever
          sees it. An external stage points Snowflake at that location. Real external stages typically use a
          storage integration — a Snowflake object that holds a scoped cloud IAM role or service account, so
          credentials aren't pasted directly into SQL.
        </Para>
        <CodeBox label="Storage integration plus external stage (S3 shape)">{`-- Created once by an admin, scoped to a specific bucket/prefix:
CREATE OR REPLACE STORAGE INTEGRATION S3_ORDERS_INTEGRATION
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::123456789012:role/snowflake-orders-read'
  STORAGE_ALLOWED_LOCATIONS = ('s3://company-data-prod/orders/');

CREATE OR REPLACE STAGE RAW.S3_ORDERS_STAGE
  URL = 's3://company-data-prod/orders/'
  STORAGE_INTEGRATION = S3_ORDERS_INTEGRATION
  FILE_FORMAT = RAW.CSV_WITH_HEADER;

LIST @RAW.S3_ORDERS_STAGE;`}
        </CodeBox>
        <Callout title="Security rule" color="#ef4444">
          External stages should use least privilege. Scope the storage integration's IAM role to the specific
          bucket prefix the stage needs — never grant broad, account-wide bucket access when the stage only
          reads one folder. Treat cloud storage permissions with the same care as production database
          permissions.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Loading semi-structured JSON" />
        <SectionTitle>Loading JSON Into a VARIANT Column</SectionTitle>
        <Para>
          Not every source is tabular CSV. Event streams, API responses, and webhook payloads usually arrive as
          JSON. Snowflake handles this by loading the entire parsed JSON document into a single{' '}
          <code>VARIANT</code> column, rather than trying to map each JSON field to its own table column at load
          time. You then query into that VARIANT with dot notation or <code>FLATTEN</code> — covered fully in
          the semi-structured data module — but the load step itself is worth seeing here.
        </Para>
        <CodeBox label="Loading JSON events into a VARIANT column">{`CREATE OR REPLACE FILE FORMAT RAW.JSON_EVENTS
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE OR REPLACE TABLE RAW.EVENTS_RAW (
  raw_event    VARIANT,
  loaded_at    TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE STAGE RAW.EVENTS_STAGE
  FILE_FORMAT = RAW.JSON_EVENTS;

COPY INTO RAW.EVENTS_RAW (raw_event)
FROM @RAW.EVENTS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.JSON_EVENTS)
ON_ERROR = 'ABORT_STATEMENT';

-- A quick peek using dot notation, previewed here and covered in depth later:
SELECT
  raw_event:event_id::STRING   AS event_id,
  raw_event:event_type::STRING AS event_type,
  raw_event:occurred_at::TIMESTAMP_NTZ AS occurred_at
FROM RAW.EVENTS_RAW
LIMIT 10;`}
        </CodeBox>
        <Callout title="STRIP_OUTER_ARRAY matters">
          Many JSON exports wrap an entire batch of records in one outer array, like{' '}
          <code>{'[{...}, {...}, {...}]'}</code>. Without <code>STRIP_OUTER_ARRAY = TRUE</code>, Snowflake loads
          the whole array as a single VARIANT row instead of one row per record — a common source of "why is my
          table only one row" confusion.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Monitoring loads and sizing the warehouse" />
        <SectionTitle>COPY_HISTORY, Query Profile, and Picking a Load Warehouse Size</SectionTitle>
        <Para>
          <code>INFORMATION_SCHEMA.LOAD_HISTORY</code> is table-scoped and only covers loads into that specific
          table. For an account-wide view across many tables and stages, <code>COPY_HISTORY</code> (as a table
          function, or via <code>SNOWFLAKE.ACCOUNT_USAGE.COPY_HISTORY</code> for longer retention) is the better
          operational tool once you have more than a couple of pipelines running.
        </Para>
        <CodeBox label="Account-wide load monitoring">{`SELECT
  table_name,
  stage_location,
  file_name,
  status,
  row_count,
  error_count,
  last_load_time
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'RAW.ORDERS',
  START_TIME => DATEADD(hour, -24, CURRENT_TIMESTAMP())
))
ORDER BY last_load_time DESC;`}
        </CodeBox>
        <Para>
          Warehouse size for a load matters more than beginners expect. COPY INTO parallelizes across many files
          at once, so loading a thousand small files benefits far more from a larger warehouse (more parallel
          file-processing capacity) than loading one giant file does — a single file's parsing throughput doesn't
          scale the same way. Conversely, a handful of huge files on an XSMALL warehouse can be slow regardless
          of warehouse size, because file count, not just data volume, drives COPY INTO's parallelism.
        </Para>
        <Table
          headers={['Load shape', 'Sizing guidance']}
          rows={[
            ['Many small/medium files (hundreds to thousands)', 'Scale warehouse size up — more parallel file processing directly speeds up the load.'],
            ['A few very large files', 'Scaling up helps less; consider splitting large files upstream if load time matters.'],
            ['Small, infrequent loads', 'XSMALL is usually enough — don\'t over-provision compute for a trickle of files.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Worked example: S3 to raw table" />
        <SectionTitle>Hands-On Lab: Load a CSV of Orders From an External S3 Stage</SectionTitle>
        <Para>
          This lab walks through a realistic end-to-end load: a file format, an external stage, a target table,
          a COPY INTO with proper error handling, and a verification query.
        </Para>
        <CodeBox label="Step 1 — file format and target table">{`USE DATABASE LEARN_SNOWFLAKE;
USE SCHEMA RAW;

CREATE OR REPLACE FILE FORMAT RAW.CSV_ORDERS_FORMAT
  TYPE = CSV
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('', 'NULL', 'null')
  EMPTY_FIELD_AS_NULL = TRUE
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE;

CREATE OR REPLACE TABLE RAW.ORDERS (
  order_id      STRING,
  customer_id   STRING,
  order_ts      TIMESTAMP_NTZ,
  status        STRING,
  order_amount  NUMBER(10,2),
  updated_at    TIMESTAMP_NTZ
);`}
        </CodeBox>
        <CodeBox label="Step 2 — external stage over S3">{`CREATE OR REPLACE STAGE RAW.S3_ORDERS_STAGE
  URL = 's3://company-data-prod/orders/'
  STORAGE_INTEGRATION = S3_ORDERS_INTEGRATION
  FILE_FORMAT = RAW.CSV_ORDERS_FORMAT;

-- See what's actually sitting on the stage before loading anything:
LIST @RAW.S3_ORDERS_STAGE PATTERN = '.*2026_09.*[.]csv';`}
        </CodeBox>
        <CodeBox label="Step 3 — validate, then load">{`-- Dry run first: catch parsing problems with zero load risk.
COPY INTO RAW.ORDERS
FROM @RAW.S3_ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_ORDERS_FORMAT)
PATTERN = '.*2026_09.*[.]csv'
VALIDATION_MODE = RETURN_ERRORS;

-- Real load, strict error handling while the feed is new/unproven.
COPY INTO RAW.ORDERS
FROM @RAW.S3_ORDERS_STAGE
FILE_FORMAT = (FORMAT_NAME = RAW.CSV_ORDERS_FORMAT)
PATTERN = '.*2026_09.*[.]csv'
ON_ERROR = 'ABORT_STATEMENT';`}
        </CodeBox>
        <CodeBox label="Step 4 — verify the load">{`SELECT COUNT(*) AS row_count FROM RAW.ORDERS;

SELECT
  file_name,
  status,
  row_count,
  error_count,
  last_load_time
FROM INFORMATION_SCHEMA.LOAD_HISTORY
WHERE table_name = 'ORDERS'
ORDER BY last_load_time DESC;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'What would happen if you re-ran Step 3\'s real COPY INTO immediately, with the same files still on the stage?',
            'How would you force one specific corrected file to reload without touching the others?',
            'If ON_ERROR was CONTINUE instead of ABORT_STATEMENT, how would you find out which rows were rejected?',
            'Why does the lab run VALIDATION_MODE = RETURN_ERRORS before the real load rather than after?',
            'What would you check in LOAD_HISTORY to confirm the load was complete and not partial?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12b — Unloading data with COPY INTO <location>" />
        <SectionTitle>COPY INTO Also Works in Reverse — Unloading a Table to Files</SectionTitle>
        <Para>
          The same <code>COPY INTO</code> keyword handles the opposite direction: writing query results out to
          files on a stage. This is the mechanism behind exporting a table (or any SELECT) to CSV, JSON, or
          Parquet — useful for handing data to a downstream system that doesn't have direct Snowflake access, or
          for archiving a Gold table snapshot.
        </Para>
        <CodeBox label="Unloading a table to an internal stage">{`COPY INTO @RAW.ORDERS_STAGE/exports/orders_2026_09/
FROM (
  SELECT order_id, customer_id, order_ts, status, order_amount
  FROM RAW.ORDERS
  WHERE order_ts >= '2026-09-01'
)
FILE_FORMAT = (TYPE = CSV, COMPRESSION = GZIP, FIELD_OPTIONALLY_ENCLOSED_BY = '"')
HEADER = TRUE
OVERWRITE = TRUE;

LIST @RAW.ORDERS_STAGE/exports/orders_2026_09/;`}
        </CodeBox>
        <Table
          headers={['Direction', 'Syntax shape', 'Typical use']}
          rows={[
            ['Loading (this module\'s focus)', 'COPY INTO <table> FROM <stage>', 'Bring external files into a Snowflake table.'],
            ['Unloading', 'COPY INTO <stage location> FROM <table or query>', 'Export table/query results out to files for downstream systems or archiving.'],
          ]}
        />
        <Callout title="Unloading isn't just the reverse of loading">
          Unload file sizing, compression, and header options matter for whoever consumes the exported files
          downstream — coordinate the file format with that consumer rather than defaulting blindly. This module
          focuses on loading; treat unloading as a preview of a capability you'll use once data needs to leave
          Snowflake again.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Production mistakes" />
        <SectionTitle>Loading Mistakes That Break Trust</SectionTitle>
        <Table
          headers={['Mistake', 'Why it hurts', 'Better design']}
          rows={[
            ['CONTINUE with no alerting', 'Bad rows disappear silently, with no signal anyone will ever see.', 'Capture rejects with VALIDATE, and alert an owner when error_count > 0.'],
            ['Routine FORCE = TRUE', 'Defeats COPY INTO\'s built-in idempotency and duplicates rows on reruns.', 'Reserve FORCE for deliberate, reasoned-about reloads of specific files.'],
            ['No raw file archive', 'You cannot replay or audit bad loads after the fact.', 'Keep immutable raw files in cloud storage, separate from any "processed" prefix.'],
            ['No row-count reconciliation', 'Partial loads look successful because the command itself didn\'t error.', 'Compare source file row counts, row_parsed, and target table counts.'],
            ['Broad cloud permissions', 'A compromised warehouse or leaked credential can expose unrelated files.', 'Use scoped storage integrations and least-privilege IAM roles.'],
            ['Loading straight to Gold', 'Source mess leaks directly into business dashboards.', 'Land Raw first, clean into Silver, then model into Gold.'],
          ]}
        />
        <BulletList
          items={[
            'Alert when expected files do not arrive by a deadline, not just when a load fails.',
            'Reconcile source row counts with loaded row counts as a standing check, not a one-time verification.',
            'Store file names and load timestamps for auditability when reconciling disputes.',
            'Treat VALIDATION_MODE as a normal pre-flight step for any new or unfamiliar feed.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Interview answer" />
        <SectionTitle>How to Explain Snowflake Data Loading in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake loads files through three cooperating pieces — a stage
          that points at where the files are, a file format that describes how to parse them, and COPY INTO
          which actually inserts the parsed rows into a target table. Stages come in two flavors: internal,
          where Snowflake manages the storage, and external, which is a scoped reference to an existing S3,
          ADLS, or GCS location, usually backed by a storage integration for credential management. Within
          internal stages there's a user stage, a per-table stage, and named stages you create explicitly — I'd
          default to named stages for anything beyond a one-off. For CSV, I'd make parsing explicit with a file
          format — delimiter, header skipping, quote handling, and NULL_IF — rather than trusting defaults. For
          error handling, I'd start with ON_ERROR = ABORT_STATEMENT while a feed is new, use VALIDATION_MODE or
          the VALIDATE function to inspect problems without committing bad loads, and only relax to CONTINUE or
          SKIP_FILE once reject capture and alerting exist. The behavior I'd flag as most important, and most
          often misunderstood, is that COPY INTO automatically tracks load metadata and skips files it has
          already loaded — which makes reruns safely idempotent by default, and is why FORCE = TRUE should be a
          deliberate, rare override rather than a routine habit.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is the difference between an internal and an external stage?',
            'Name the four stage types and how you reference each one.',
            'What does a file format object actually control?',
            'What is PUT for, and why can\'t you run it from a Snowsight worksheet?',
            'What are the three ON_ERROR options for COPY INTO, and when would you pick each?',
            'How does COPY INTO avoid loading the same file twice, and when would you override that with FORCE?',
            'How would you validate a file before committing a real load?',
            'What information would you check to confirm a load was complete rather than partial?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake loads files through three cooperating objects: a stage, a file format, and COPY INTO.',
          'Internal stages use Snowflake-managed storage; external stages point at your own S3/ADLS/GCS, typically via a storage integration.',
          'The four stage types are the user stage (@~), the table stage (@%table), named internal stages, and external stages.',
          'PUT uploads local files onto an internal stage from a client with filesystem access (SnowSQL, a driver) — never from Snowsight directly.',
          'ON_ERROR controls load strictness: ABORT_STATEMENT (safest default), CONTINUE (skip bad rows), or SKIP_FILE (skip whole files).',
          'VALIDATION_MODE and the VALIDATE function let you inspect problems before, and rejected rows after, a real load — with zero or minimal load risk.',
          'COPY INTO tracks load metadata and skips files it has already loaded by default — this makes reruns idempotent; FORCE = TRUE overrides it and should be used sparingly and deliberately.',
          'Production loading needs load history review, row-count reconciliation, and alerting — a command that reports "success" is not the same as a complete, correct load.',
        ]}
      />
    </LearnLayout>
  )
}
