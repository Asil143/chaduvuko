import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowflakeProject() {
  return (
    <LearnLayout
      title="End-to-End Snowflake Project"
      description="A full capstone build: raw ingestion, semi-structured JSON, idempotent Bronze/Silver/Gold pipelines, streams and tasks, masking and row access policies, time travel recovery, clustering, resource monitors, and monitoring — one orders analytics platform synthesizing the whole track."
      section="Snowflake — Module 19"
      readTime="120 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'End-to-End Snowflake Project', href: '/learn/snowflake/snowflake-project' },
      ]}
      prev={{ title: 'Production Operations and Monitoring', href: '/learn/snowflake/production-operations' }}
      next={{ title: 'Snowflake Interview and System Design', href: '/learn/snowflake/interview-system-design' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Capstone framing" />
        <SectionTitle>Eighteen Modules, One Real Build</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>Where you are:</strong> you have learned Snowflake architecture, SQL basics, roles and
            security, stages and COPY INTO, semi-structured data with VARIANT and FLATTEN, warehouses and
            performance, ELT and the medallion architecture, MERGE and idempotency, time travel and
            zero-copy cloning, Snowpipe, streams and tasks, dynamic tables, data sharing, governance with
            masking and row access policies, clustering and performance tuning, cost management, dbt on
            Snowflake, and production operations. This module is where all of that stops being separate
            topics and becomes one system.
          </Para>
          <Para>
            You will build a real, working orders analytics platform for a fictional e-commerce company —
            from raw files landing in cloud storage all the way to governed, monitored, BI-ready Gold marts —
            naming the specific module and concept behind every step as you go.
          </Para>
        </HighlightBox>
        <Callout title="How to use this module">
          Do not just read the SQL. Treat this as a build you could actually run: create the objects, load
          the sample data, break something on purpose, and use the recovery steps. The value of a capstone is
          in seeing how the pieces you learned separately actually depend on each other.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Requirements and architecture" />
        <SectionTitle>The Scenario: Orders Analytics for an E-Commerce Company</SectionTitle>
        <Para>
          The company, "Northwind Retail," receives two kinds of raw data continuously through the day: order
          header and line-item data as JSON files (one file per batch of orders, produced by the order
          service), and customer and product reference data as CSV extracts from an operational database,
          dropped nightly. Both land as files in an S3 bucket before Snowflake ever sees them.
        </Para>
        <Para>
          The business asks for three things: a daily revenue dashboard finance can trust, a customer
          lifetime-value view sales can use, and confidence that customer PII (email, phone) is never exposed
          to anyone outside of support and compliance roles. All three requirements shape the architecture
          below.
        </Para>
        <Table
          headers={['Layer', 'Contents', 'Refresh pattern', 'Concepts from earlier modules']}
          rows={[
            ['RAW', 'Untouched JSON order files, CSV customer/product extracts, full audit metadata.', 'Continuous via Snowpipe + nightly batch COPY.', 'Stages, file formats, COPY INTO, Snowpipe.'],
            ['SILVER', 'Deduplicated, typed, flattened, one-row-per-entity tables.', 'Incremental via stream + task MERGE.', 'VARIANT/FLATTEN, MERGE idempotency, streams and tasks.'],
            ['GOLD', 'Business marts: daily revenue, customer LTV, product performance.', 'Incremental refresh from Silver, streams+tasks or dynamic tables.', 'ELT/medallion architecture, dynamic tables.'],
            ['Governance layer', 'Masking policies, row access policies, RBAC roles.', 'Applied at object creation, enforced on every query.', 'Roles and security basics, governance module.'],
            ['Ops layer', 'Resource monitor, alerts, dashboards, runbooks.', 'Continuous.', 'Production operations and monitoring.'],
          ]}
        />
        <CodeBox label="Architecture at a glance">{`S3: raw orders JSON, raw customer/product CSV
        |
        v
RAW.ORDERS_JSON, RAW.CUSTOMERS_CSV, RAW.PRODUCTS_CSV   (Snowpipe + COPY INTO)
        |
        v  (streams track changes)
SILVER.ORDERS, SILVER.ORDER_LINES, SILVER.CUSTOMERS, SILVER.PRODUCTS   (MERGE, deduped)
        |
        v  (streams + tasks incremental refresh)
GOLD.DAILY_REVENUE, GOLD.CUSTOMER_LTV, GOLD.PRODUCT_PERFORMANCE
        |
        v
BI tool / analysts, governed by masking + row access policies + RBAC`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Warehouses, databases, and least-privilege roles" />
        <SectionTitle>Build Phase 1: Warehouses, Databases, Schemas, and RBAC</SectionTitle>
        <Para>
          Following the least-privilege design from the roles and security basics module, this project does
          not use one shared admin role. It creates functional roles matched to each stage of the pipeline,
          and separate warehouses so loading, transformation, and BI querying do not contend for the same
          compute.
        </Para>
        <CodeBox label="Warehouses, sized for their workload">{`CREATE WAREHOUSE IF NOT EXISTS WH_LOAD_XS
  WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;

CREATE WAREHOUSE IF NOT EXISTS WH_TRANSFORM_S
  WAREHOUSE_SIZE = 'SMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;

CREATE WAREHOUSE IF NOT EXISTS WH_BI_S
  WAREHOUSE_SIZE = 'SMALL' AUTO_SUSPEND = 300 AUTO_RESUME = TRUE;`}
        </CodeBox>
        <CodeBox label="Database and medallion schemas">{`CREATE DATABASE IF NOT EXISTS NORTHWIND_ANALYTICS;
CREATE SCHEMA IF NOT EXISTS NORTHWIND_ANALYTICS.RAW;
CREATE SCHEMA IF NOT EXISTS NORTHWIND_ANALYTICS.SILVER;
CREATE SCHEMA IF NOT EXISTS NORTHWIND_ANALYTICS.GOLD;
CREATE SCHEMA IF NOT EXISTS NORTHWIND_ANALYTICS.OPS;`}
        </CodeBox>
        <CodeBox label="Functional, least-privilege roles">{`CREATE ROLE IF NOT EXISTS RAW_LOADER;
CREATE ROLE IF NOT EXISTS TRANSFORMER;
CREATE ROLE IF NOT EXISTS ANALYST_READER;
CREATE ROLE IF NOT EXISTS SUPPORT_PII_READER;

GRANT USAGE ON WAREHOUSE WH_LOAD_XS TO ROLE RAW_LOADER;
GRANT USAGE ON WAREHOUSE WH_TRANSFORM_S TO ROLE TRANSFORMER;
GRANT USAGE ON WAREHOUSE WH_BI_S TO ROLE ANALYST_READER;

GRANT USAGE ON DATABASE NORTHWIND_ANALYTICS TO ROLE RAW_LOADER, ROLE TRANSFORMER, ROLE ANALYST_READER, ROLE SUPPORT_PII_READER;
GRANT USAGE, CREATE TABLE ON SCHEMA NORTHWIND_ANALYTICS.RAW TO ROLE RAW_LOADER;
GRANT USAGE, CREATE TABLE ON SCHEMA NORTHWIND_ANALYTICS.SILVER TO ROLE TRANSFORMER;
GRANT USAGE ON SCHEMA NORTHWIND_ANALYTICS.GOLD TO ROLE ANALYST_READER, ROLE TRANSFORMER;
GRANT SELECT ON ALL TABLES IN SCHEMA NORTHWIND_ANALYTICS.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON FUTURE TABLES IN SCHEMA NORTHWIND_ANALYTICS.GOLD TO ROLE ANALYST_READER;

GRANT ROLE RAW_LOADER TO USER SVC_LOADER;
GRANT ROLE TRANSFORMER TO USER SVC_TRANSFORM;
GRANT ROLE ANALYST_READER TO USER DASHBOARD_SVC;
GRANT ROLE SUPPORT_PII_READER TO USER SUPPORT_LEAD;`}
        </CodeBox>
        <Callout title="Why three separate warehouses, not one">
          A single shared warehouse means a heavy nightly transform can slow down a live BI dashboard, and a
          runaway analyst query can delay data loading. Separate, right-sized warehouses give predictable
          cost attribution and workload isolation — the same tradeoff table from the performance module.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Stages, file formats, raw loading" />
        <SectionTitle>Build Phase 2: Stages, File Formats, and COPY INTO for Raw Data</SectionTitle>
        <Para>
          Raw ingestion always starts the same way: define a file format that matches the source exactly, an
          external stage pointing at the S3 location, and a RAW table with a metadata column that records
          where and when each row came from — the audit trail that makes debugging a bad load possible later.
        </Para>
        <CodeBox label="File formats and external stage">{`CREATE OR REPLACE FILE FORMAT NORTHWIND_ANALYTICS.RAW.JSON_FORMAT
  TYPE = JSON
  STRIP_OUTER_ARRAY = TRUE;

CREATE OR REPLACE FILE FORMAT NORTHWIND_ANALYTICS.RAW.CSV_FORMAT
  TYPE = CSV
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  NULL_IF = ('', 'NULL')
  EMPTY_FIELD_AS_NULL = TRUE;

CREATE OR REPLACE STAGE NORTHWIND_ANALYTICS.RAW.ORDERS_STAGE
  URL = 's3://northwind-raw/orders/'
  STORAGE_INTEGRATION = northwind_s3_integration
  FILE_FORMAT = NORTHWIND_ANALYTICS.RAW.JSON_FORMAT;

CREATE OR REPLACE STAGE NORTHWIND_ANALYTICS.RAW.REFERENCE_STAGE
  URL = 's3://northwind-raw/reference/'
  STORAGE_INTEGRATION = northwind_s3_integration
  FILE_FORMAT = NORTHWIND_ANALYTICS.RAW.CSV_FORMAT;`}
        </CodeBox>
        <CodeBox label="Raw landing tables with load metadata">{`CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.RAW.ORDERS_JSON (
  raw_payload VARIANT,
  file_name STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.RAW.CUSTOMERS_CSV (
  customer_id STRING,
  full_name STRING,
  email STRING,
  phone STRING,
  region STRING,
  signup_date DATE,
  file_name STRING,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

COPY INTO NORTHWIND_ANALYTICS.RAW.ORDERS_JSON (raw_payload, file_name)
FROM (
  SELECT $1, METADATA$FILENAME
  FROM @NORTHWIND_ANALYTICS.RAW.ORDERS_STAGE
)
FILE_FORMAT = (FORMAT_NAME = NORTHWIND_ANALYTICS.RAW.JSON_FORMAT)
ON_ERROR = 'CONTINUE';

COPY INTO NORTHWIND_ANALYTICS.RAW.CUSTOMERS_CSV (customer_id, full_name, email, phone, region, signup_date, file_name)
FROM (
  SELECT $1, $2, $3, $4, $5, $6, METADATA$FILENAME
  FROM @NORTHWIND_ANALYTICS.RAW.REFERENCE_STAGE/customers/
)
FILE_FORMAT = (FORMAT_NAME = NORTHWIND_ANALYTICS.RAW.CSV_FORMAT)
ON_ERROR = 'CONTINUE';`}
        </CodeBox>
        <Callout title="ON_ERROR = 'CONTINUE' is a deliberate choice here">
          A single malformed order file should not block every other file in the batch. ON_ERROR = 'CONTINUE'
          combined with reviewing COPY_HISTORY afterward (production operations module) means one bad row
          becomes a triaged incident instead of a full pipeline outage.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Continuous loading with Snowpipe" />
        <SectionTitle>Build Phase 3: Snowpipe for Continuous Order Ingestion</SectionTitle>
        <Para>
          Order JSON files arrive throughout the day, not on a fixed schedule. Rather than polling with a
          scheduled COPY INTO task, this is exactly the case Snowpipe was built for: event-driven, near-
          continuous loading triggered by new files landing in the stage.
        </Para>
        <CodeBox label="Snowpipe for orders">{`CREATE OR REPLACE PIPE NORTHWIND_ANALYTICS.RAW.ORDERS_PIPE
  AUTO_INGEST = TRUE
AS
COPY INTO NORTHWIND_ANALYTICS.RAW.ORDERS_JSON (raw_payload, file_name)
FROM (
  SELECT $1, METADATA$FILENAME
  FROM @NORTHWIND_ANALYTICS.RAW.ORDERS_STAGE
)
FILE_FORMAT = (FORMAT_NAME = NORTHWIND_ANALYTICS.RAW.JSON_FORMAT)
ON_ERROR = 'CONTINUE';

-- The S3 event notification pointed at this pipe's notification channel
-- triggers loads automatically as files land; no polling task needed.

SELECT SYSTEM$PIPE_STATUS('NORTHWIND_ANALYTICS.RAW.ORDERS_PIPE');`}
        </CodeBox>
        <Para>
          Reference data (customers, products) does not need this — it arrives once nightly, so a scheduled
          task calling COPY INTO on a fixed interval is simpler and easier to reason about than a pipe.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Semi-structured order-line-items" />
        <SectionTitle>Build Phase 4: Flattening Order Line Items with VARIANT and FLATTEN</SectionTitle>
        <Para>
          Each order JSON payload contains a nested array of line items. RAW stores the entire payload as
          VARIANT, untouched. Silver is where that nested structure becomes proper relational rows — one row
          per order header, one row per line item — using dot notation for scalar fields and LATERAL FLATTEN
          for the nested array.
        </Para>
        <CodeBox label="Sample order JSON payload">{`{
  "order_id": "O-10021",
  "customer_id": "C-4410",
  "order_ts": "2026-09-10T14:22:00Z",
  "status": "completed",
  "line_items": [
    { "sku": "SKU-100", "qty": 2, "unit_price": 19.99 },
    { "sku": "SKU-207", "qty": 1, "unit_price": 54.50 }
  ]
}`}
        </CodeBox>
        <CodeBox label="Flatten into order headers and order lines">{`CREATE OR REPLACE VIEW NORTHWIND_ANALYTICS.RAW.ORDERS_PARSED AS
SELECT
  raw_payload:order_id::STRING AS order_id,
  raw_payload:customer_id::STRING AS customer_id,
  raw_payload:order_ts::TIMESTAMP_NTZ AS order_ts,
  raw_payload:status::STRING AS status,
  raw_payload:line_items AS line_items,
  file_name,
  loaded_at
FROM NORTHWIND_ANALYTICS.RAW.ORDERS_JSON;

CREATE OR REPLACE VIEW NORTHWIND_ANALYTICS.RAW.ORDER_LINES_PARSED AS
SELECT
  o.order_id,
  li.value:sku::STRING AS sku,
  li.value:qty::NUMBER AS qty,
  li.value:unit_price::NUMBER(12,2) AS unit_price,
  o.loaded_at
FROM NORTHWIND_ANALYTICS.RAW.ORDERS_PARSED o,
LATERAL FLATTEN(input => o.line_items) li;`}
        </CodeBox>
        <Callout title="Why views here, not tables">
          These are views, not materialized tables, because the Silver MERGE step below reads directly from
          them — there is no need to store a second copy of parsed-but-not-yet-deduplicated data.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Bronze to Silver: idempotent MERGE with dedup" />
        <SectionTitle>Build Phase 5: Idempotent Silver Pipeline with Deduplication</SectionTitle>
        <Para>
          Order files can be redelivered, and the same order can appear in more than one file if the source
          system retries. The Silver MERGE has to be idempotent: running it twice on the same input must not
          create duplicate rows or double-count revenue. This follows the MERGE idempotency module directly —
          dedupe the source with QUALIFY ROW_NUMBER() before the match, and use an update condition based on
          recency so an out-of-order replay cannot overwrite a newer record with an older one.
        </Para>
        <CodeBox label="Silver order headers, deduplicated and idempotent">{`CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.SILVER.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  order_ts TIMESTAMP_NTZ,
  updated_at TIMESTAMP_NTZ
);

MERGE INTO NORTHWIND_ANALYTICS.SILVER.ORDERS tgt
USING (
  SELECT order_id, customer_id, status, order_ts, loaded_at AS updated_at
  FROM NORTHWIND_ANALYTICS.RAW.ORDERS_PARSED
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id
    ORDER BY loaded_at DESC
  ) = 1
) src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  order_ts = src.order_ts,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, order_ts, updated_at)
VALUES (src.order_id, src.customer_id, src.status, src.order_ts, src.updated_at);`}
        </CodeBox>
        <CodeBox label="Silver order lines, deduplicated by order_id + sku">{`CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.SILVER.ORDER_LINES (
  order_id STRING,
  sku STRING,
  qty NUMBER,
  unit_price NUMBER(12,2),
  updated_at TIMESTAMP_NTZ
);

MERGE INTO NORTHWIND_ANALYTICS.SILVER.ORDER_LINES tgt
USING (
  SELECT order_id, sku, qty, unit_price, loaded_at AS updated_at
  FROM NORTHWIND_ANALYTICS.RAW.ORDER_LINES_PARSED
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id, sku
    ORDER BY loaded_at DESC
  ) = 1
) src
  ON tgt.order_id = src.order_id AND tgt.sku = src.sku
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  qty = src.qty, unit_price = src.unit_price, updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, sku, qty, unit_price, updated_at)
VALUES (src.order_id, src.sku, src.qty, src.unit_price, src.updated_at);`}
        </CodeBox>
        <Table
          headers={['Design choice', 'Why it is here']}
          rows={[
            ['QUALIFY ROW_NUMBER() dedup on source.', 'A redelivered file must not create two rows for the same order.'],
            ['updated_at recency check in WHEN MATCHED.', 'A replayed older file cannot overwrite a newer, already-merged record.'],
            ['Composite key (order_id, sku) for line items.', 'The natural grain of a line item is order + product, not order alone.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Streams and tasks for incremental Gold refresh" />
        <SectionTitle>Build Phase 6: Streams and Tasks Drive Silver-to-Gold Refresh</SectionTitle>
        <Para>
          Rebuilding GOLD.DAILY_REVENUE from scratch on every run would work, but wastes compute as the
          orders table grows. Following the streams and tasks module, a stream on SILVER.ORDERS tracks what
          changed, and a task consumes it into Gold on a schedule — gated with{' '}
          <code>WHEN SYSTEM$STREAM_HAS_DATA(...)</code> so it does not spin up a warehouse for nothing.
        </Para>
        <CodeBox label="Stream and task graph for Gold refresh">{`CREATE OR REPLACE STREAM NORTHWIND_ANALYTICS.SILVER.ORDERS_STREAM
  ON TABLE NORTHWIND_ANALYTICS.SILVER.ORDERS;

CREATE OR REPLACE TASK NORTHWIND_ANALYTICS.OPS.REFRESH_GOLD_REVENUE
  WAREHOUSE = WH_TRANSFORM_S
  SCHEDULE = '15 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('NORTHWIND_ANALYTICS.SILVER.ORDERS_STREAM')
AS
MERGE INTO NORTHWIND_ANALYTICS.GOLD.DAILY_REVENUE tgt
USING (
  SELECT
    DATE(order_ts) AS order_date,
    COUNT(DISTINCT order_id) AS order_count,
    SUM(qty * unit_price) AS revenue_usd
  FROM NORTHWIND_ANALYTICS.SILVER.ORDERS o
  JOIN NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol ON ol.order_id = o.order_id
  WHERE o.status NOT IN ('cancelled', 'fraud')
  GROUP BY 1
) src
  ON tgt.order_date = src.order_date
WHEN MATCHED THEN UPDATE SET order_count = src.order_count, revenue_usd = src.revenue_usd
WHEN NOT MATCHED THEN INSERT (order_date, order_count, revenue_usd)
VALUES (src.order_date, src.order_count, src.revenue_usd);

ALTER TASK NORTHWIND_ANALYTICS.OPS.REFRESH_GOLD_REVENUE RESUME;`}
        </CodeBox>
        <Callout title="Dynamic table alternative">
          For a simpler declarative alternative to hand-written stream+task MERGE logic, GOLD.DAILY_REVENUE
          could instead be a dynamic table with a TARGET_LAG of '15 minutes' over the same SELECT — Snowflake
          manages the incremental refresh itself. The stream+task version here is shown because it makes the
          MERGE logic and dedup rules explicit, which matters for a learning capstone.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Masking and row access policies" />
        <SectionTitle>Build Phase 7: Protect PII with Masking and Row Access Policies</SectionTitle>
        <Para>
          Customer email and phone must never be visible to a general analyst role, only to support and
          compliance. Regional sales reps should only ever see orders from their own region. Both rules are
          enforced once, at the object level, rather than trusted to every downstream query — this is the
          governance-by-default pattern from the roles and security and governance modules.
        </Para>
        <CodeBox label="Masking policy on PII columns">{`CREATE OR REPLACE MASKING POLICY NORTHWIND_ANALYTICS.SILVER.EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('SUPPORT_PII_READER', 'COMPLIANCE_ADMIN') THEN val
    ELSE REGEXP_REPLACE(val, '^.+(@.+)$', '***\\\\1')
  END;

ALTER TABLE NORTHWIND_ANALYTICS.SILVER.CUSTOMERS
  MODIFY COLUMN email SET MASKING POLICY NORTHWIND_ANALYTICS.SILVER.EMAIL_MASK;

CREATE OR REPLACE MASKING POLICY NORTHWIND_ANALYTICS.SILVER.PHONE_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('SUPPORT_PII_READER', 'COMPLIANCE_ADMIN') THEN val
    ELSE 'XXX-XXX-' || RIGHT(val, 4)
  END;

ALTER TABLE NORTHWIND_ANALYTICS.SILVER.CUSTOMERS
  MODIFY COLUMN phone SET MASKING POLICY NORTHWIND_ANALYTICS.SILVER.PHONE_MASK;`}
        </CodeBox>
        <CodeBox label="Row access policy for regional sales reps">{`CREATE OR REPLACE ROW ACCESS POLICY NORTHWIND_ANALYTICS.GOLD.REGION_POLICY
  AS (region STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() IN ('COMPLIANCE_ADMIN', 'ANALYST_READER')
  OR EXISTS (
    SELECT 1 FROM NORTHWIND_ANALYTICS.OPS.SALES_REP_REGIONS r
    WHERE r.role_name = CURRENT_ROLE() AND r.region = region
  );

ALTER TABLE NORTHWIND_ANALYTICS.GOLD.PRODUCT_PERFORMANCE
  ADD ROW ACCESS POLICY NORTHWIND_ANALYTICS.GOLD.REGION_POLICY ON (region);`}
        </CodeBox>
        <Table
          headers={['Policy', 'Protects against', 'Who bypasses it']}
          rows={[
            ['EMAIL_MASK / PHONE_MASK', 'Analysts or BI tools seeing raw customer contact info.', 'SUPPORT_PII_READER, COMPLIANCE_ADMIN.'],
            ['REGION_POLICY', 'A sales rep for one region seeing another region\'s figures.', 'COMPLIANCE_ADMIN, ANALYST_READER (sees all regions).'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Time travel recovery testing" />
        <SectionTitle>Build Phase 8: Prove Time Travel Recovery Actually Works</SectionTitle>
        <Para>
          A recovery plan you have never tested is a guess. Before this pipeline is considered production
          ready, the team runs a deliberate recovery drill: intentionally corrupt Silver data with a bad
          MERGE, then use Time Travel to inspect and restore it — the same pattern from the time travel and
          zero-copy cloning module.
        </Para>
        <CodeBox label="Recovery drill">{`-- Simulate an accidental bad update
UPDATE NORTHWIND_ANALYTICS.SILVER.ORDERS SET status = 'cancelled' WHERE 1=1;

-- Find the query_id right before the bad statement
SELECT query_id, query_text, start_time
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
WHERE query_text ILIKE '%UPDATE NORTHWIND_ANALYTICS.SILVER.ORDERS%'
ORDER BY start_time DESC
LIMIT 5;

-- Restore using Time Travel BEFORE the bad statement
CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.SILVER.ORDERS_RECOVERED AS
SELECT * FROM NORTHWIND_ANALYTICS.SILVER.ORDERS
  BEFORE (STATEMENT => '<bad_update_query_id>');

-- Validate row counts and a few known order_ids match expectations,
-- then swap the recovered table into place.
ALTER TABLE NORTHWIND_ANALYTICS.SILVER.ORDERS SWAP WITH NORTHWIND_ANALYTICS.SILVER.ORDERS_RECOVERED;`}
        </CodeBox>
        <Callout title="Zero-copy clone for safe testing">
          Rather than running this drill against the real SILVER.ORDERS, clone it first with{' '}
          <code>CREATE TABLE ORDERS_DRILL CLONE ORDERS</code> and run the corruption/recovery drill on the
          clone. Zero-copy cloning makes this nearly free in storage cost and removes any risk to production
          data during the rehearsal.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Clustering the large fact table" />
        <SectionTitle>Build Phase 9: Add a Clustering Key as Order Lines Grows</SectionTitle>
        <Para>
          SILVER.ORDER_LINES is the largest table in the platform and grows every day. Most queries against
          it filter by a date range (via the joined order) or by product SKU. As the table passes the point
          where natural clustering from insert order stops matching query patterns, a clustering key keeps
          pruning effective — straight from the performance and clustering module.
        </Para>
        <CodeBox label="Clustering key decision and application">{`-- Check current clustering health before deciding
SELECT SYSTEM$CLUSTERING_INFORMATION('NORTHWIND_ANALYTICS.SILVER.ORDER_LINES', '(order_id)');

ALTER TABLE NORTHWIND_ANALYTICS.SILVER.ORDER_LINES
  CLUSTER BY (order_id);

-- Re-check after Snowflake's automatic reclustering has run
SELECT SYSTEM$CLUSTERING_INFORMATION('NORTHWIND_ANALYTICS.SILVER.ORDER_LINES', '(order_id)');`}
        </CodeBox>
        <Callout title="Do not cluster before you need it">
          Clustering has an ongoing reclustering cost. This table earns a clustering key because it is large,
          growing continuously, and consistently filtered/joined on order_id — not because "big tables should
          be clustered" as a blanket rule.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Resource monitor and cost guardrails" />
        <SectionTitle>Build Phase 10: A Resource Monitor Caps Runaway Spend</SectionTitle>
        <Para>
          Following the cost management module, every warehouse in this project is attached to a resource
          monitor with a monthly credit quota and staged notifications, so a runaway query or a misconfigured
          task schedule cannot silently burn an unbounded amount of credit before anyone notices.
        </Para>
        <CodeBox label="Resource monitor with staged actions">{`CREATE OR REPLACE RESOURCE MONITOR NORTHWIND_MONTHLY_MONITOR
  WITH CREDIT_QUOTA = 500
  FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATE
  TRIGGERS
    ON 75 PERCENT DO NOTIFY
    ON 90 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND
    ON 110 PERCENT DO SUSPEND_IMMEDIATE;

ALTER WAREHOUSE WH_LOAD_XS SET RESOURCE_MONITOR = NORTHWIND_MONTHLY_MONITOR;
ALTER WAREHOUSE WH_TRANSFORM_S SET RESOURCE_MONITOR = NORTHWIND_MONTHLY_MONITOR;
ALTER WAREHOUSE WH_BI_S SET RESOURCE_MONITOR = NORTHWIND_MONTHLY_MONITOR;`}
        </CodeBox>
        <Table
          headers={['Threshold', 'Action', 'Why staged instead of one cutoff']}
          rows={[
            ['75%', 'Notify only.', 'Early warning while there is still time to investigate calmly.'],
            ['90%', 'Notify again.', 'Escalates urgency without breaking anything yet.'],
            ['100%', 'SUSPEND — new queries blocked, running queries finish.', 'Hard stop for new spend while avoiding aborting in-flight work.'],
            ['110%', 'SUSPEND_IMMEDIATE — running queries cancelled too.', 'Last-resort circuit breaker if 100% was somehow bypassed.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Monitoring and alerting the pipeline" />
        <SectionTitle>Build Phase 11: Monitor the Whole Pipeline End to End</SectionTitle>
        <Para>
          The final build phase wires up the production operations patterns from the previous module: task
          history monitoring, a freshness alert on the Gold layer, and a small operational dashboard so the
          on-call rotation can answer "is Northwind Retail's data platform healthy?" without guessing.
        </Para>
        <CodeBox label="Freshness alert on the revenue mart">{`CREATE OR REPLACE ALERT NORTHWIND_ANALYTICS.OPS.REVENUE_FRESHNESS_ALERT
  WAREHOUSE = WH_LOAD_XS
  SCHEDULE = '15 MINUTE'
  IF (
    EXISTS (
      SELECT 1 FROM (
        SELECT MAX(order_date) AS latest_date FROM NORTHWIND_ANALYTICS.GOLD.DAILY_REVENUE
      ) WHERE latest_date < DATEADD('hour', -2, CURRENT_TIMESTAMP())
    )
  )
  THEN
    CALL NORTHWIND_ANALYTICS.OPS.NOTIFY_ONCALL('GOLD.DAILY_REVENUE freshness SLO breached');

ALTER ALERT NORTHWIND_ANALYTICS.OPS.REVENUE_FRESHNESS_ALERT RESUME;`}
        </CodeBox>
        <CodeBox label="Pipeline health dashboard query">{`SELECT
  'task_failures_24h' AS metric,
  COUNT(*) AS value
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  SCHEDULED_TIME_RANGE_START => DATEADD('day', -1, CURRENT_TIMESTAMP())
))
WHERE state = 'FAILED'
UNION ALL
SELECT 'gold_revenue_hours_behind',
  DATEDIFF('hour', MAX(order_date), CURRENT_TIMESTAMP())
FROM NORTHWIND_ANALYTICS.GOLD.DAILY_REVENUE
UNION ALL
SELECT 'load_errors_24h',
  COUNT(*)
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'NORTHWIND_ANALYTICS.RAW.ORDERS_JSON',
  START_TIME => DATEADD('day', -1, CURRENT_TIMESTAMP())
))
WHERE error_count > 0;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Gold marts, assembled" />
        <SectionTitle>The Finished Gold Layer: Three Marts the Business Actually Uses</SectionTitle>
        <Para>
          With Silver clean and governed, Gold is where the business questions get answered directly. These
          three marts are what finance, sales, and merchandising actually query day to day.
        </Para>
        <CodeBox label="GOLD.CUSTOMER_LTV">{`CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.GOLD.CUSTOMER_LTV AS
SELECT
  c.customer_id,
  c.region,
  COUNT(DISTINCT o.order_id) AS lifetime_orders,
  SUM(ol.qty * ol.unit_price) AS lifetime_revenue_usd,
  MIN(o.order_ts) AS first_order_ts,
  MAX(o.order_ts) AS last_order_ts
FROM NORTHWIND_ANALYTICS.SILVER.CUSTOMERS c
JOIN NORTHWIND_ANALYTICS.SILVER.ORDERS o ON o.customer_id = c.customer_id
JOIN NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol ON ol.order_id = o.order_id
WHERE o.status NOT IN ('cancelled', 'fraud')
GROUP BY 1, 2;`}
        </CodeBox>
        <CodeBox label="GOLD.PRODUCT_PERFORMANCE (row-access protected)">{`CREATE OR REPLACE TABLE NORTHWIND_ANALYTICS.GOLD.PRODUCT_PERFORMANCE AS
SELECT
  ol.sku,
  c.region,
  SUM(ol.qty) AS units_sold,
  SUM(ol.qty * ol.unit_price) AS revenue_usd
FROM NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol
JOIN NORTHWIND_ANALYTICS.SILVER.ORDERS o ON o.order_id = ol.order_id
JOIN NORTHWIND_ANALYTICS.SILVER.CUSTOMERS c ON c.customer_id = o.customer_id
WHERE o.status NOT IN ('cancelled', 'fraud')
GROUP BY 1, 2;`}
        </CodeBox>
        <Para>
          GOLD.DAILY_REVENUE was already built incrementally in Part 07 via the stream+task MERGE. Together,
          these three marts are the entire business-facing surface of the platform — everything upstream
          exists to make these three tables correct, fresh, and safe to query.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Testing the pipeline before calling it done" />
        <SectionTitle>Build Phase 12: Prove Silver and Gold Are Actually Correct, Not Just Populated</SectionTitle>
        <Para>
          A pipeline that runs without erroring is not the same as a pipeline that produces correct numbers.
          Before this build is handed off, it goes through a fixed set of assertions — the same discipline
          dbt's generic tests (<code>unique</code>, <code>not_null</code>, <code>relationships</code>) encode,
          written here as plain SQL so the logic is visible even without a dbt project sitting on top of
          Snowflake. Every assertion returns zero rows when the pipeline is healthy; any row returned is a
          failed test.
        </Para>
        <CodeBox label="Uniqueness and not-null assertions on Silver">{`-- FAIL if SILVER.ORDERS has more than one row per order_id
SELECT order_id, COUNT(*) AS row_count
FROM NORTHWIND_ANALYTICS.SILVER.ORDERS
GROUP BY order_id
HAVING COUNT(*) > 1;

-- FAIL if any order is missing a customer_id or order_ts
SELECT order_id
FROM NORTHWIND_ANALYTICS.SILVER.ORDERS
WHERE customer_id IS NULL OR order_ts IS NULL;

-- FAIL if SILVER.ORDER_LINES has a null qty or a non-positive unit_price
SELECT order_id, sku
FROM NORTHWIND_ANALYTICS.SILVER.ORDER_LINES
WHERE qty IS NULL OR unit_price IS NULL OR unit_price <= 0;`}
        </CodeBox>
        <CodeBox label="Referential integrity between Silver and Gold">{`-- FAIL if an order line references an order that does not exist in SILVER.ORDERS
-- (an orphaned line item, most likely from a partial or out-of-order load)
SELECT ol.order_id
FROM NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol
LEFT JOIN NORTHWIND_ANALYTICS.SILVER.ORDERS o ON o.order_id = ol.order_id
WHERE o.order_id IS NULL;

-- FAIL if GOLD.CUSTOMER_LTV references a customer_id absent from SILVER.CUSTOMERS
SELECT ltv.customer_id
FROM NORTHWIND_ANALYTICS.GOLD.CUSTOMER_LTV ltv
LEFT JOIN NORTHWIND_ANALYTICS.SILVER.CUSTOMERS c ON c.customer_id = ltv.customer_id
WHERE c.customer_id IS NULL;

-- FAIL if GOLD.DAILY_REVENUE's total does not reconcile with a from-scratch
-- recomputation over Silver for the same date range (a drift check, not just a
-- shape check -- this is what catches a MERGE bug that produces plausible but
-- wrong numbers)
SELECT g.order_date, g.revenue_usd AS gold_revenue, s.revenue_usd AS recomputed_revenue
FROM NORTHWIND_ANALYTICS.GOLD.DAILY_REVENUE g
JOIN (
  SELECT DATE(o.order_ts) AS order_date, SUM(ol.qty * ol.unit_price) AS revenue_usd
  FROM NORTHWIND_ANALYTICS.SILVER.ORDERS o
  JOIN NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol ON ol.order_id = o.order_id
  WHERE o.status NOT IN ('cancelled', 'fraud')
  GROUP BY 1
) s ON s.order_date = g.order_date
WHERE ABS(g.revenue_usd - s.revenue_usd) > 0.01;`}
        </CodeBox>
        <Table
          headers={['Test category', 'What it catches', 'Where it runs']}
          rows={[
            ['Uniqueness (one row per key).', 'A dedup regression in the Silver MERGE — the exact bug the QUALIFY ROW_NUMBER() logic in Phase 5 exists to prevent.', 'After every Silver MERGE task run.'],
            ['Not-null on required columns.', 'A parsing bug in the FLATTEN step silently producing incomplete rows instead of failing loudly.', 'After every Silver MERGE task run.'],
            ['Referential integrity, Silver to Silver.', 'An order line landing before its parent order header, or an order that never arrived.', 'After every Silver MERGE task run.'],
            ['Referential integrity, Silver to Gold.', 'A Gold mart built from stale or partially-refreshed Silver data.', 'After every Gold refresh task run.'],
            ['Revenue reconciliation (recompute and diff).', 'A logic bug in the incremental MERGE that produces a number that looks reasonable but is wrong — row-count checks alone would miss this.', 'Nightly, as a scheduled task, since a full recompute is heavier than the incremental refresh itself.'],
          ]}
        />
        <CodeBox label="Wiring the assertions into a single pass/fail gate">{`CREATE OR REPLACE TASK NORTHWIND_ANALYTICS.OPS.RUN_PIPELINE_TESTS
  WAREHOUSE = WH_TRANSFORM_S
  AFTER NORTHWIND_ANALYTICS.OPS.REFRESH_GOLD_REVENUE
AS
CALL NORTHWIND_ANALYTICS.OPS.ASSERT_ZERO_ROWS(
  'orphaned_order_lines',
  'SELECT ol.order_id FROM NORTHWIND_ANALYTICS.SILVER.ORDER_LINES ol
   LEFT JOIN NORTHWIND_ANALYTICS.SILVER.ORDERS o ON o.order_id = ol.order_id
   WHERE o.order_id IS NULL'
);
-- ASSERT_ZERO_ROWS is a small stored procedure: run the query, and if it
-- returns any rows, insert a failure record into OPS.TEST_FAILURES and call
-- NOTIFY_ONCALL -- the same alerting path Phase 11 already wires up, so a
-- failed data-quality test surfaces exactly like a failed task or a stale mart.`}
        </CodeBox>
        <Callout title="Why this runs as a task chained after the refresh, not a separate cron job">
          Chaining <code>AFTER NORTHWIND_ANALYTICS.OPS.REFRESH_GOLD_REVENUE</code> guarantees the tests always
          run against the Gold data that was just produced, never against a stale prior run or a
          still-in-progress refresh — the same dependency-graph pattern from the streams and tasks module,
          applied to testing instead of transformation.
        </Callout>
        <Para>
          Null-rate testing deserves a specific callout beyond a flat not-null check: a column that is
          "mostly populated" can still hide a creeping regression that a strict not-null assertion misses if
          the upstream source occasionally sends a legitimate null. Tracking the null rate as a trend, not just
          a boolean pass/fail, catches that kind of slow drift before it becomes a hard failure.
        </Para>
        <CodeBox label="Null-rate trend check, not just a boolean not-null gate">{`-- Track the null rate on a column that is allowed some nulls, and alert
-- only if it drifts meaningfully from its historical baseline
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS total_rows,
  COUNT_IF(discount_code IS NULL) AS null_discount_codes,
  ROUND(COUNT_IF(discount_code IS NULL) / COUNT(*) * 100, 2) AS null_rate_pct
FROM NORTHWIND_ANALYTICS.SILVER.ORDERS
WHERE order_ts >= DATEADD('day', -30, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY 1 DESC;
-- FAIL the test if today's null_rate_pct deviates from the 30-day average
-- by more than a few standard deviations -- a sudden jump usually means an
-- upstream field rename or a broken optional-field mapping, not a business change.`}
        </CodeBox>
        <Table
          headers={['Test cadence', 'What runs at that cadence', 'Why this frequency']}
          rows={[
            ['Every Silver MERGE run (every few minutes).', 'Uniqueness, not-null, and Silver-to-Silver referential integrity.', 'These are cheap, fast checks — catching a dedup regression within minutes instead of discovering it the next morning.'],
            ['Every Gold refresh run (every 15 minutes).', 'Silver-to-Gold referential integrity.', 'Matches the Gold refresh cadence, so a mart is never left visibly out of sync with the Silver it was built from.'],
            ['Nightly.', 'Revenue reconciliation (full recompute and diff) and 30-day null-rate trend checks.', 'These are heavier queries that scan more history than the incremental pipeline touches; running them nightly balances thoroughness against compute cost.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Documentation and handoff" />
        <SectionTitle>Build Phase 13: A Runbook So the Next Person Doesn't Have to Reverse-Engineer This</SectionTitle>
        <Para>
          A pipeline only this module's author understands is a pipeline that breaks at 2 a.m. with nobody
          able to fix it. The last build phase is not code at all — it is the lightweight runbook that ties
          together every table, every refresh mechanism, and every alert built above into something an
          on-call engineer who did not build this platform can actually use.
        </Para>
        <Table
          headers={['Table', 'Refreshed by', 'Owner', 'If it looks wrong, check']}
          rows={[
            ['RAW.ORDERS_JSON', 'ORDERS_PIPE (Snowpipe, continuous).', 'Data engineering — ingestion.', 'SYSTEM$PIPE_STATUS() and COPY_HISTORY for load errors.'],
            ['RAW.CUSTOMERS_CSV / RAW.PRODUCTS_CSV', 'Nightly scheduled COPY INTO task.', 'Data engineering — ingestion.', 'TASK_HISTORY for the nightly load task; confirm the nightly S3 export actually landed.'],
            ['SILVER.ORDERS / SILVER.ORDER_LINES', 'MERGE off RAW views, run inline with load or on a short schedule.', 'Data engineering — transformation.', 'RUN_PIPELINE_TESTS results in OPS.TEST_FAILURES; QUERY_HISTORY for the MERGE statement.'],
            ['GOLD.DAILY_REVENUE', 'REFRESH_GOLD_REVENUE task, gated on ORDERS_STREAM, every 15 minutes.', 'Analytics engineering.', 'REVENUE_FRESHNESS_ALERT status; TASK_HISTORY for REFRESH_GOLD_REVENUE.'],
            ['GOLD.CUSTOMER_LTV / GOLD.PRODUCT_PERFORMANCE', 'Rebuilt on a scheduled task from Silver (currently full rebuild; candidate for incremental refresh as volume grows).', 'Analytics engineering.', 'TASK_HISTORY for the rebuild task; row counts against the prior day\'s run.'],
            ['Masking / row access policies', 'Applied once at object creation; not "refreshed."', 'Security and governance.', 'Role grants (SUPPORT_PII_READER, COMPLIANCE_ADMIN) and OPS.SALES_REP_REGIONS mapping table.'],
          ]}
        />
        <CodeBox label="A five-minute triage checklist for the on-call rotation">{`1. Is GOLD.DAILY_REVENUE stale?
   -> Check REVENUE_FRESHNESS_ALERT status and the pipeline health
      dashboard query (Phase 11) for 'gold_revenue_hours_behind'.

2. Did a data-quality test fail overnight?
   -> SELECT * FROM NORTHWIND_ANALYTICS.OPS.TEST_FAILURES
      WHERE failed_at > DATEADD('day', -1, CURRENT_TIMESTAMP());

3. Did a load fail?
   -> Check COPY_HISTORY for RAW.ORDERS_JSON and RAW.CUSTOMERS_CSV,
      and SYSTEM$PIPE_STATUS() for ORDERS_PIPE specifically.

4. Did a task stop running entirely (not just fail once)?
   -> TASK_HISTORY, filtered to state != 'SUCCEEDED', last 24-48 hours.
   -> Confirm the task is actually RESUMEd -- a task left SUSPENDED
      after a maintenance window is the single most common false alarm.

5. Still unclear?
   -> Escalate to the owning team from the table above, with the
      query_id or task name already in hand -- not just "the dashboard
      looks wrong."`}
        </CodeBox>
        <Callout title="A runbook is a build phase, not an afterthought">
          Everything in this table and checklist already exists somewhere in Phases 1 through 12 — this phase
          adds no new Snowflake objects. What it adds is the map from "something looks wrong" to "here is the
          exact object, owner, and query to check first," which is the difference between an incident that
          takes five minutes to triage and one that takes an afternoon of guessing.
        </Callout>
        <SubTitle>Freshness SLOs, stated as numbers a runbook can be checked against</SubTitle>
        <Para>
          A runbook that says "the dashboard should be fresh" gives the on-call engineer nothing to compare
          against. Every mart in this platform has an explicit, written freshness SLO, matched to how the
          business actually consumes it — the same distinction the requirements-gathering step of a
          system-design interview would draw out before proposing an architecture.
        </Para>
        <Table
          headers={['Mart', 'Freshness SLO', 'Consumer', 'What breaching the SLO means']}
          rows={[
            ['GOLD.DAILY_REVENUE', '15 minutes behind the latest merged Silver order.', 'Finance revenue dashboard, near-real-time.', 'Finance may be looking at numbers that do not yet reflect the last hour of orders.'],
            ['GOLD.CUSTOMER_LTV', '24 hours (rebuilt once daily).', 'Sales team, planning and outreach.', 'A customer\'s LTV segment used in an outreach list may be one day stale — acceptable for this use case.'],
            ['GOLD.PRODUCT_PERFORMANCE', '24 hours (rebuilt once daily).', 'Merchandising, weekly and monthly planning.', 'Not time-sensitive enough to justify incremental refresh; a daily rebuild is intentionally simple.'],
          ]}
        />
        <Para>
          Notice that only DAILY_REVENUE gets the tighter 15-minute SLO and the incremental stream+task
          treatment from Phase 6 — CUSTOMER_LTV and PRODUCT_PERFORMANCE are rebuilt from scratch daily because
          nothing in their stated business use actually needs sub-day freshness. Matching each mart's refresh
          investment to its real SLO, rather than making everything "as fresh as possible," is the same
          trade-off discipline the system-design capstone module argues for when reasoning through an
          unfamiliar interview prompt.
        </Para>
        <SubTitle>Ownership, in one line per team</SubTitle>
        <BulletList
          items={[
            'Data engineering — ingestion: owns Snowpipe, stages, file formats, and the RAW layer; first responder for load failures and pipe status.',
            'Data engineering — transformation: owns the Silver MERGE logic, streams, and the pipeline test suite; first responder for dedup or referential-integrity test failures.',
            'Analytics engineering: owns the Gold marts, their refresh schedules, and freshness SLOs; first responder for stale-dashboard reports from the business.',
            'Security and governance: owns masking policies, row access policies, and role-grant reviews; first responder for access or PII-exposure incidents.',
            'Platform/on-call rotation: owns the resource monitor thresholds and the pipeline health dashboard itself; routes an incident to the right team above rather than debugging every layer personally.',
          ]}
        />
        <Callout title="Keep the runbook next to the code, not in a separate wiki nobody updates">
          A runbook that lives only in a slide deck or a wiki page drifts out of sync with the pipeline within
          months. In practice, this table and checklist belong as comments directly in the OPS schema's task
          definitions and in the repository that manages this project's SQL, so a change to a task's schedule
          or a mart's ownership is reviewed in the same pull request that changes the runbook entry describing
          it — the same discipline dbt encourages by keeping documentation in the same project as the models
          it describes.
        </Callout>
        <Para>
          With the pipeline tested against explicit assertions and documented against explicit ownership and
          SLOs, "the pipeline is done" stops being a subjective judgment call and becomes a checklist anyone on
          the team can verify against — which is the actual bar a capstone build like this one is meant to
          clear before it would be called production-ready.
        </Para>
        <Para>
          That checklist, restated plainly: every table has a passing test suite, a named owner, a written
          freshness SLO, and a documented first-check query. A pipeline that cannot answer all four for every
          one of its tables is not finished, no matter how correct its SQL looks in isolation.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — What could go wrong" />
        <SectionTitle>Five Realistic Failure Scenarios for This Exact Pipeline</SectionTitle>
        <Table
          headers={['Scenario', 'What happens without the design decisions above', 'How this pipeline handles it']}
          rows={[
            ['An order file is redelivered by the source system.', 'A naive INSERT-only pipeline would double the order and double-count revenue.', 'The Silver MERGE dedupes by order_id with QUALIFY and checks updated_at recency, so a replay is a no-op.'],
            ['A JSON file arrives with a malformed line-items array.', 'A strict COPY INTO with ON_ERROR = ABORT_STATEMENT would fail the entire batch, blocking every other order that day.', 'ON_ERROR = CONTINUE plus COPY_HISTORY triage isolates the bad file without blocking the rest of the load.'],
            ['A bad UPDATE accidentally cancels every order in Silver.', 'With no recovery plan, the team would have to rebuild from raw files manually under time pressure.', 'Time Travel BEFORE the bad query_id restores the table; the rehearsed drill means the team already knows the exact steps.'],
            ['A support engineer\'s role grant is accidentally revoked.', 'They can no longer see customer email/phone to help a customer, and the failure looks like a bug rather than an access issue.', 'The masking policy condition is centralized on the role name, so restoring the SUPPORT_PII_READER grant is the entire fix — no code change needed.'],
            ['A scheduled task silently stops running for two days.', 'GOLD.DAILY_REVENUE goes stale and finance makes decisions on old numbers without knowing it.', 'The REVENUE_FRESHNESS_ALERT fires on staleness directly, independent of whether the task itself reported success or failure.'],
            ['A data-quality test fails but nobody is watching OPS.TEST_FAILURES.', 'Silent corruption of Gold marts persists for days because the tests ran but nobody looked.', 'RUN_PIPELINE_TESTS calls NOTIFY_ONCALL on any failure, routing test results into the same alert channel as task failures and freshness breaches.'],
            ['A new engineer inherits this pipeline with no context.', 'Hours are spent reverse-engineering which table refreshes how, before an incident can even be triaged.', 'The Phase 13 runbook maps every table to its refresh mechanism, owner, and first-check query.'],
          ]}
        />
        <Callout title="One more: the SUPPORT_PII_READER grant scenario, extended">
          A related but distinct variant of the access-drift scenario above is worth naming separately: a
          *new* engineer joins the support team and is granted SUPPORT_PII_READER on their first day, before
          they have completed compliance training. The masking policy correctly reveals unmasked PII to them
          immediately, because the policy only checks role membership, not training status. This is not a bug
          in the masking policy — RBAC and masking intentionally do not know about external processes like
          training completion — but it is a real operational gap: onboarding checklists need to grant
          PII-bearing roles only after training is confirmed, not as a default new-hire step. The pipeline's
          technical controls are only as good as the process that decides who gets which role.
        </Callout>
        <Callout title="The pattern across all seven" color="#ef4444">
          None of these failures are exotic. They are the ordinary, expected failure modes of any real data
          platform: redelivered files, bad rows, bad queries, access drift, silent staleness, unwatched test
          failures, and lost institutional knowledge. The difference between a fragile pipeline and a
          production-ready one is whether these were designed for in advance, which is exactly what modules 8
          (idempotency), 9 (time travel), 15 (governance), and 18 (operations) were teaching.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Interview answer" />
        <SectionTitle>How to Walk Through This Project in an Interview</SectionTitle>
        <Para>
          A strong answer walks end to end, naming the reason for each decision rather than just listing
          SQL: raw JSON and CSV files land in S3 and are loaded via Snowpipe (continuous) and scheduled COPY
          INTO (batch), parsed with VARIANT and LATERAL FLATTEN for nested line items, merged into Silver
          with deduplication and recency checks for idempotency, refreshed into Gold marts incrementally via
          streams and tasks, protected with masking policies on PII and row access policies for regional
          access, tested for recoverability with Time Travel, tuned with a clustering key once the fact table
          grew large enough to justify it, capped with a resource monitor, and monitored with freshness
          alerts and an operational dashboard built on ACCOUNT_USAGE and INFORMATION_SCHEMA. The story is not
          "I wrote some SQL" — it is "here is why each layer exists and what failure it prevents."
        </Para>
        <SubTitle>Questions you should be ready to answer about your own version of this build</SubTitle>
        <BulletList
          items={[
            'Why does the Silver MERGE dedupe with QUALIFY ROW_NUMBER() instead of trusting the source not to send duplicates?',
            'Why is Snowpipe used for orders but a scheduled task used for reference data?',
            'What would happen if you removed the WHEN SYSTEM$STREAM_HAS_DATA condition from the Gold refresh task?',
            'How would you prove your Time Travel recovery plan actually works before you need it in production?',
            'Why is the masking policy condition based on role name rather than hardcoded usernames?',
            'What would make you decide SILVER.ORDER_LINES needs a clustering key, versus not?',
            'If GOLD.DAILY_REVENUE went stale for three hours, which alert should have fired, and would it have used ACCOUNT_USAGE or INFORMATION_SCHEMA?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'A real Snowflake platform is not one pipeline — it is warehouses, roles, ingestion, transformation, governance, performance, cost control, and operations working together.',
          'Least-privilege roles and workload-isolated warehouses are set up before any data is loaded, not retrofitted afterward.',
          'Snowpipe fits continuously arriving files; scheduled COPY INTO fits predictable batch files — the right tool depends on arrival pattern, not habit.',
          'VARIANT and LATERAL FLATTEN turn nested JSON into clean relational rows without losing the raw payload.',
          'Idempotent MERGE design (dedup + recency checks) is what makes redelivered or replayed data safe.',
          'Streams and tasks (or dynamic tables) keep Gold marts fresh without rebuilding from scratch on every run.',
          'Masking policies and row access policies enforce PII and regional protection centrally, at the object, not per query.',
          'A recovery plan is only real once it has been rehearsed with Time Travel on a cloned table, not just designed on paper.',
          'Clustering, resource monitors, and monitoring/alerting are what keep a working pipeline reliable and affordable months after launch, not just on day one.',
        ]}
      />
    </LearnLayout>
  )
}
