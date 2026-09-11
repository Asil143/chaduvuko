import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function LoadingData() {
  return (
    <LearnLayout
      title="Loading Data with Stages and COPY INTO"
      description="Internal stages, external stages, file formats, COPY INTO, validation, rejected rows, load history, and production ingestion patterns."
      section="Snowflake — Module 05"
      readTime="75 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Loading Data', href: '/learn/snowflake/loading-data' },
      ]}
      prev={{ title: 'Setup and SQL Basics', href: '/learn/snowflake/setup-and-sql-basics' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Loading model" />
        <SectionTitle>Snowflake Loads Files Through Stages, File Formats, and COPY INTO</SectionTitle>
        <Para>
          Most Snowflake ingestion begins with files. A source system writes CSV, JSON, Parquet, or Avro to
          cloud storage. Snowflake reads those files through a stage. A file format tells Snowflake how to
          parse the files. <code>COPY INTO</code> loads the parsed data into a table.
        </Para>
        <Table
          headers={['Object', 'Purpose', 'Example']}
          rows={[
            ['Stage', 'Location where Snowflake reads files.', '@RAW.ORDERS_STAGE'],
            ['File format', 'Parsing rules for CSV/JSON/Parquet/etc.', 'CSV_WITH_HEADER'],
            ['Target table', 'Table that receives loaded rows.', 'RAW.ORDERS'],
            ['COPY INTO', 'Command that loads files into the target table.', 'COPY INTO RAW.ORDERS FROM @stage'],
          ]}
        />
        <CodeBox label="Ingestion mental model">{`S3 / ADLS / GCS / internal stage
        │
        ▼
Snowflake stage + file format
        │
        ▼
COPY INTO RAW table
        │
        ▼
Silver cleanup and Gold marts`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — CSV loading" />
        <SectionTitle>Load CSV Data Correctly</SectionTitle>
        <Para>
          CSV looks simple but causes many production bugs: embedded commas, quoted strings, blank values,
          header rows, inconsistent column counts, and weird encodings. A file format makes those rules
          explicit.
        </Para>
        <CodeBox label="CSV file format and table">{`CREATE OR REPLACE FILE FORMAT RAW.CSV_WITH_HEADER
  TYPE = CSV
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('', 'NULL', 'null')
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE;

CREATE OR REPLACE TABLE RAW.ORDERS_LOAD (
  order_id      STRING,
  customer_id   STRING,
  order_ts      TIMESTAMP_NTZ,
  status        STRING,
  order_amount  NUMBER(10,2),
  updated_at    TIMESTAMP_NTZ
);`}
        </CodeBox>
        <CodeBox label="Internal stage and copy">{`CREATE OR REPLACE STAGE RAW.ORDERS_STAGE
  FILE_FORMAT = RAW.CSV_WITH_HEADER;

-- Files can be uploaded to internal stages with SnowSQL PUT,
-- or you can use an external stage over S3/ADLS/GCS in production.

COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = RAW.CSV_WITH_HEADER
ON_ERROR = 'ABORT_STATEMENT';`}
        </CodeBox>
        <Callout title="Strict first, tolerant later">
          Use strict loading while building a pipeline. If you later choose to continue on errors, add
          reject capture, alerting, and reconciliation. Silent skipped rows are worse than a loud failed job.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Validation" />
        <SectionTitle>Validate Before You Load</SectionTitle>
        <Para>
          Snowflake lets you validate files before loading. This is useful when debugging new feeds or
          checking a partner file before it pollutes Raw tables. Validation catches parsing and conversion
          problems early.
        </Para>
        <CodeBox label="Validation mode">{`COPY INTO RAW.ORDERS_LOAD
FROM @RAW.ORDERS_STAGE
FILE_FORMAT = RAW.CSV_WITH_HEADER
VALIDATION_MODE = RETURN_ERRORS;`}
        </CodeBox>
        <Table
          headers={['ON_ERROR option', 'Behavior', 'Risk']}
          rows={[
            ['ABORT_STATEMENT', 'Fail the whole load on error.', 'Strict and safe, but one bad row blocks the batch.'],
            ['CONTINUE', 'Load good rows and skip bad rows.', 'Can hide data loss without monitoring.'],
            ['SKIP_FILE', 'Skip files with errors.', 'Can lose an entire file if alerting is weak.'],
            ['VALIDATION_MODE', 'Check files without loading.', 'Great for debugging and preflight checks.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — External stages" />
        <SectionTitle>External Stages Connect Snowflake to Cloud Storage</SectionTitle>
        <Para>
          Production data usually lands in S3, Azure Blob/ADLS, or Google Cloud Storage. An external stage
          points Snowflake at that location. Real external stages require cloud IAM/storage integration
          setup. The exact syntax differs by cloud, but the design principle is the same: Snowflake receives
          scoped permission to read a specific storage location.
        </Para>
        <CodeBox label="S3-style external stage sketch">{`-- Example shape only. Real production setup also needs
-- a storage integration / IAM role configuration.

CREATE OR REPLACE STAGE RAW.S3_ORDERS_STAGE
  URL = 's3://company-data-prod/orders/'
  FILE_FORMAT = RAW.CSV_WITH_HEADER;

LIST @RAW.S3_ORDERS_STAGE;

COPY INTO RAW.ORDERS_LOAD
FROM @RAW.S3_ORDERS_STAGE
PATTERN = '.*orders_2026_09_.*[.]csv'
ON_ERROR = 'ABORT_STATEMENT';`}
        </CodeBox>
        <Callout title="Security rule" color="#ef4444">
          External stages should use least privilege. Do not give Snowflake broad bucket access when it
          only needs one prefix. Treat cloud storage permissions as production database permissions.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Load history and operations" />
        <SectionTitle>Know What Loaded, What Failed, and Why</SectionTitle>
        <Para>
          A load command that says "success" is not enough for production. You need to know which files
          loaded, how many rows loaded, how long it took, whether rows were skipped, and whether the same
          file was loaded twice or ignored because Snowflake already saw it.
        </Para>
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
        <BulletList
          items={[
            'Alert when files fail to load.',
            'Alert when expected files do not arrive by a deadline.',
            'Reconcile source row counts with loaded row counts.',
            'Store batch IDs or file names when you need auditability.',
            'Avoid blindly reloading files without understanding Snowflake load metadata.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Production mistakes" />
        <SectionTitle>Loading Mistakes That Break Trust</SectionTitle>
        <Table
          headers={['Mistake', 'Why it hurts', 'Better design']}
          rows={[
            ['CONTINUE with no alerting', 'Bad rows disappear silently.', 'Capture rejects and alert owners.'],
            ['No raw file archive', 'You cannot replay or audit bad loads.', 'Keep immutable raw files in cloud storage.'],
            ['No row-count reconciliation', 'Partial loads look successful.', 'Compare source counts, parsed rows, loaded rows, and target counts.'],
            ['Broad cloud permissions', 'A warehouse compromise can expose unrelated files.', 'Use scoped storage integrations and least privilege.'],
            ['Loading straight to Gold', 'Source mess leaks into business dashboards.', 'Land Raw first, then clean into Silver and model into Gold.'],
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake loads files through stages, file formats, and COPY INTO.',
          'CSV loading needs explicit parsing rules; do not trust defaults blindly.',
          'Validation mode helps catch file problems before loading.',
          'External stages should use tightly scoped cloud permissions.',
          'Production loading needs load history, row-count reconciliation, and alerting.',
        ]}
      />
    </LearnLayout>
  )
}
