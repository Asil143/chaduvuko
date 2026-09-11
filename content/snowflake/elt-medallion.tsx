import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function EltMedallion() {
  return (
    <LearnLayout
      title="ELT and Medallion Architecture in Snowflake"
      description="Raw, Silver, Gold, ELT, dbt-style modeling, tests, lineage, ownership, marts, and production transformation patterns in Snowflake."
      section="Snowflake — Module 07"
      readTime="80 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'ELT and Medallion Architecture', href: '/learn/snowflake/elt-medallion' },
      ]}
      prev={{ title: 'Semi-Structured Data: VARIANT, JSON, FLATTEN', href: '/learn/snowflake/semi-structured-data' }}
      next={{ title: 'MERGE, Upserts, and Idempotent Pipelines', href: '/learn/snowflake/merge-idempotency' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The big picture" />
        <SectionTitle>ELT Means Load First, Transform Inside Snowflake</SectionTitle>
        <Para>
          ELT stands for Extract, Load, Transform. Data is extracted from source systems, loaded into the
          warehouse, and transformed after it lands. This is different from older ETL patterns where data is
          heavily transformed before it enters the warehouse. Snowflake is built for ELT because it can store
          raw data cheaply, scale compute separately, and run large SQL transformations inside the platform.
        </Para>
        <Para>
          Medallion architecture is a practical way to organize ELT. It separates your warehouse into layers:
          Raw, Silver, and Gold. Raw keeps source-shaped data. Silver cleans and standardizes it. Gold turns it
          into business-ready facts, dimensions, and marts. The names matter less than the discipline: each
          layer has a different trust level and purpose.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> Raw is what arrived, Silver is what we trust as cleaned
            data, and Gold is what the business should use for decisions.
          </Para>
        </HighlightBox>
        <CodeBox label="ELT mental model">{`Sources
  application databases
  SaaS tools
  JSON files
  event streams
  partner exports
      |
      v
RAW schema
  source-shaped, replayable, lightly touched
      |
      v
SILVER schema
  typed, cleaned, deduped, standardized
      |
      v
GOLD schema
  facts, dimensions, marts, dashboards, data products`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why layering exists" />
        <SectionTitle>Layering Prevents Warehouse Chaos</SectionTitle>
        <Para>
          Without layers, every team creates its own "clean" table. Finance has one revenue query. Product has
          another. Marketing has a third. Nobody knows which table is official. When a number is wrong, the
          team spends hours tracing copied SQL through dashboards and scratch schemas. Medallion architecture
          gives the warehouse a path from messy input to trusted output.
        </Para>
        <Table
          headers={['Layer', 'Trust level', 'Who uses it', 'Main question']}
          rows={[
            ['Raw', 'Low trust, high fidelity.', 'Data engineers and platform/debugging users.', 'What exactly arrived from the source?'],
            ['Silver', 'Medium/high technical trust.', 'Analytics engineers, data engineers, advanced analysts.', 'What are the clean reusable entities?'],
            ['Gold', 'Business trust.', 'BI users, analysts, executives, downstream data products.', 'What should the business use for decisions?'],
          ]}
        />
        <Callout title="Important distinction">
          Raw data is valuable because it is faithful to the source. Gold data is valuable because it is
          interpreted. Do not force one layer to do both jobs.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Raw layer" />
        <SectionTitle>Raw Stores Source-Shaped Data With Load Metadata</SectionTitle>
        <Para>
          The Raw layer should preserve what arrived from the source with minimal transformation. You may add
          technical metadata such as source file, loaded_at, batch_id, record hash, or connector timestamp.
          You should avoid heavy business logic here. Raw is your evidence layer. If a downstream model breaks,
          Raw lets you replay and investigate.
        </Para>
        <CodeBox label="Raw orders table">{`CREATE SCHEMA IF NOT EXISTS RETAIL.RAW;

CREATE OR REPLACE TABLE RETAIL.RAW.ORDERS (
  order_id STRING,
  customer_id STRING,
  order_ts STRING,
  status STRING,
  total_usd STRING,
  source_file STRING,
  source_row_number NUMBER,
  loaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
  batch_id STRING
);`}
        </CodeBox>
        <Table
          headers={['Raw design choice', 'Good practice', 'Bad practice']}
          rows={[
            ['Shape', 'Keep close to source shape.', 'Rename and reinterpret every field immediately.'],
            ['Metadata', 'Capture file, row, load timestamp, batch id.', 'Load rows with no lineage.'],
            ['Access', 'Restrict to engineers and approved power users.', 'Grant broad analyst access to sensitive raw payloads.'],
            ['Retention', 'Keep enough history for replay and audit.', 'Drop raw after making first dashboard.'],
            ['Quality', 'Check load completeness and required keys.', 'Assume loaded means correct.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Silver layer" />
        <SectionTitle>Silver Turns Source Data Into Reliable Entities</SectionTitle>
        <Para>
          Silver is where technical cleaning happens. Types become real types. Names become consistent.
          Duplicate source records are resolved. Required keys are checked. Timestamps are normalized.
          Deleted records and late updates are handled. Silver should still be close to real-world entities:
          orders, customers, products, payments, shipments, tickets, sessions.
        </Para>
        <CodeBox label="Silver orders with typing and dedupe">{`CREATE SCHEMA IF NOT EXISTS RETAIL.SILVER;

CREATE OR REPLACE TABLE RETAIL.SILVER.ORDERS AS
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status)::STRING AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd,
  source_file,
  source_row_number,
  loaded_at,
  batch_id
FROM RETAIL.RAW.ORDERS
WHERE order_id IS NOT NULL
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY loaded_at DESC, source_file DESC, source_row_number DESC
) = 1;`}
        </CodeBox>
        <BulletList
          items={[
            'Cast important fields into stable Snowflake types.',
            'Standardize names such as customer_id instead of CustomerID, custId, and CUSTOMER_ID in different tables.',
            'Deduplicate using a deterministic business rule.',
            'Keep source metadata so Silver records remain traceable.',
            'Do not bury final business metrics here; save those for Gold.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Gold layer" />
        <SectionTitle>Gold Publishes Business-Ready Marts</SectionTitle>
        <Para>
          Gold is for business consumption. It contains facts, dimensions, aggregates, and marts designed for
          specific decision-making workflows. A finance mart might define recognized revenue. A product mart
          might define active users. A support mart might define first-response time. Gold should have clear
          definitions, owners, tests, and access controls.
        </Para>
        <CodeBox label="Gold daily revenue mart">{`CREATE SCHEMA IF NOT EXISTS RETAIL.GOLD;

CREATE OR REPLACE TABLE RETAIL.GOLD.DAILY_REVENUE AS
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  COUNT(DISTINCT customer_id) AS customer_count,
  SUM(total_usd) AS gross_revenue_usd,
  AVG(total_usd) AS avg_order_value_usd
FROM RETAIL.SILVER.ORDERS
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1;`}
        </CodeBox>
        <Table
          headers={['Gold object', 'Purpose', 'Typical consumer']}
          rows={[
            ['FCT_ORDERS', 'Transaction-level order facts.', 'Analytics engineers and BI semantic layers.'],
            ['DIM_CUSTOMERS', 'Customer attributes and lifecycle state.', 'Marketing, support, product analytics.'],
            ['DAILY_REVENUE', 'Executive revenue reporting.', 'Finance dashboards and leadership.'],
            ['PRODUCT_SALES_MART', 'Product-level sales and units.', 'Merchandising, inventory, product teams.'],
          ]}
        />
        <Callout title="Gold is a contract">
          When people build dashboards and executive reports on Gold, changing definitions becomes a product
          decision. Document changes and communicate them like you would an API change.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Facts and dimensions" />
        <SectionTitle>Gold Often Uses Facts and Dimensions</SectionTitle>
        <Para>
          A fact table records measurable events: orders, payments, shipments, page views, support tickets.
          A dimension table describes entities: customers, products, stores, dates, sales reps. This pattern
          makes analytics easier because metrics and descriptive attributes are separated but joinable.
        </Para>
        <Table
          headers={['Table type', 'Contains', 'Example columns', 'Mistake to avoid']}
          rows={[
            ['Fact', 'Events and measures.', 'order_id, customer_id, order_date, revenue_usd.', 'Putting every customer attribute into every order row.'],
            ['Dimension', 'Entity description.', 'customer_id, signup_date, segment, region.', 'Changing dimensions without history when history matters.'],
            ['Aggregate mart', 'Pre-computed summary.', 'order_date, revenue_usd, order_count.', 'Losing the definition of filters and exclusions.'],
            ['Bridge table', 'Many-to-many relationships.', 'customer_id, segment_id.', 'Forcing complex relationships into one comma-separated field.'],
          ]}
        />
        <CodeBox label="Fact and dimension example">{`CREATE OR REPLACE TABLE RETAIL.GOLD.DIM_CUSTOMERS AS
SELECT
  customer_id,
  MIN(order_ts) AS first_order_ts,
  MAX(order_ts) AS latest_order_ts,
  COUNT(*) AS lifetime_orders,
  SUM(total_usd) AS lifetime_revenue_usd
FROM RETAIL.SILVER.ORDERS
GROUP BY customer_id;

CREATE OR REPLACE TABLE RETAIL.GOLD.FCT_ORDERS AS
SELECT
  order_id,
  customer_id,
  DATE(order_ts) AS order_date,
  status,
  total_usd
FROM RETAIL.SILVER.ORDERS;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — dbt style" />
        <SectionTitle>dbt Fits Naturally With Medallion Modeling</SectionTitle>
        <Para>
          You can build medallion layers with plain SQL, tasks, stored procedures, or orchestration tools.
          Many Snowflake teams use dbt because it organizes SQL transformations as version-controlled models
          with dependencies, tests, documentation, and environment-aware deployments.
        </Para>
        <CodeBox label="dbt-style model layout">{`models/
  staging/
    sources.yml
    stg_orders.sql
    stg_customers.sql
  intermediate/
    int_orders_enriched.sql
    int_customer_first_order.sql
  marts/
    finance/
      fct_orders.sql
      daily_revenue.sql
    product/
      product_sales_mart.sql`}
        </CodeBox>
        <CodeBox label="dbt-style SQL">{`-- models/staging/stg_orders.sql
SELECT
  order_id::STRING AS order_id,
  customer_id::STRING AS customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status) AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd
FROM {{ source('raw', 'orders') }}

-- models/marts/finance/daily_revenue.sql
SELECT
  DATE(order_ts) AS order_date,
  SUM(total_usd) AS revenue_usd
FROM {{ ref('stg_orders') }}
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1`}
        </CodeBox>
        <Table
          headers={['dbt concept', 'Snowflake meaning', 'Why it matters']}
          rows={[
            ['source()', 'A declared raw input table.', 'Documents source ownership and freshness.'],
            ['ref()', 'A dependency on another model.', 'Builds lineage and correct execution order.'],
            ['materialization', 'View, table, incremental, ephemeral.', 'Controls cost, speed, and storage.'],
            ['test', 'Data assertion.', 'Stops broken assumptions from reaching Gold.'],
            ['docs', 'Human-readable model description.', 'Makes tables reusable by other teams.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Materialization choices" />
        <SectionTitle>View, Table, or Incremental Model?</SectionTitle>
        <Para>
          Not every transformation should become a physical table. Not every transformation should stay a
          view. Materialization is a tradeoff between freshness, cost, query speed, storage, and complexity.
          In Snowflake, this decision directly affects compute usage and user experience.
        </Para>
        <Table
          headers={['Materialization', 'What it does', 'Use when', 'Avoid when']}
          rows={[
            ['View', 'Stores SQL, computes on query.', 'Logic is light or data is small.', 'Many dashboards repeatedly run expensive logic.'],
            ['Table', 'Stores computed result.', 'Output is reused often and rebuild is affordable.', 'Data changes constantly and full rebuild is too costly.'],
            ['Incremental table', 'Processes only new/changed data.', 'Large tables with append/update patterns.', 'Unique keys and change logic are unclear.'],
            ['Ephemeral/dbt CTE', 'Inlines logic into downstream SQL.', 'Small helper transformations.', 'Used repeatedly in many heavy downstream models.'],
            ['Dynamic table', 'Snowflake-managed refresh to target lag.', 'Declarative pipeline fits limitations.', 'Refresh cost/behavior is not understood.'],
          ]}
        />
        <Callout title="Do not table everything">
          Making every model a table can hide bad SQL by precomputing it, but it can also increase storage,
          compute, and maintenance. Choose materialization because of workload behavior, not habit.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Tests" />
        <SectionTitle>Tests Are Part of the Architecture</SectionTitle>
        <Para>
          A medallion pipeline without tests is just a sequence of SQL statements. Tests define the promises
          each layer makes. Raw tests ask whether data arrived. Silver tests ask whether entities are valid.
          Gold tests ask whether metrics are trustworthy.
        </Para>
        <CodeBox label="Snowflake quality tests">{`-- Silver: order_id should be unique and non-null.
SELECT order_id, COUNT(*) AS row_count
FROM RETAIL.SILVER.ORDERS
GROUP BY order_id
HAVING order_id IS NULL OR COUNT(*) > 1;

-- Silver: totals should be valid.
SELECT *
FROM RETAIL.SILVER.ORDERS
WHERE total_usd IS NULL OR total_usd < 0;

-- Gold: revenue should reconcile with Silver for the same business rule.
WITH silver_revenue AS (
  SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
  FROM RETAIL.SILVER.ORDERS
  WHERE status NOT IN ('cancelled', 'fraud')
  GROUP BY 1
)
SELECT g.order_date, g.gross_revenue_usd, s.revenue_usd
FROM RETAIL.GOLD.DAILY_REVENUE g
JOIN silver_revenue s USING (order_date)
WHERE ABS(g.gross_revenue_usd - s.revenue_usd) > 0.01;`}
        </CodeBox>
        <Table
          headers={['Test type', 'Example', 'Layer']}
          rows={[
            ['Not null', 'order_id is not null.', 'Silver and Gold.'],
            ['Unique', 'one row per order_id.', 'Silver entity tables.'],
            ['Accepted values', 'status in completed/cancelled/fraud/refunded.', 'Silver.'],
            ['Relationship', 'order.customer_id exists in customers.', 'Silver/Gold.'],
            ['Reconciliation', 'Gold revenue equals approved Silver logic.', 'Gold.'],
            ['Freshness', 'latest load less than expected delay.', 'Raw/Gold.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Lineage" />
        <SectionTitle>Lineage Explains Where a Number Came From</SectionTitle>
        <Para>
          Lineage is the chain from source to final output. When someone asks why revenue changed, lineage
          tells you which raw files, Silver models, Gold marts, SQL definitions, and dashboard filters were
          involved. Without lineage, every metric dispute becomes a search party.
        </Para>
        <CodeBox label="Manual lineage example">{`GOLD.DAILY_REVENUE
  depends on SILVER.ORDERS
    depends on RAW.ORDERS
      loaded from @ORDERS_STAGE
        copied from s3://company-orders/prod/orders/YYYY/MM/DD/

Definition:
  revenue includes orders where status NOT IN ('cancelled', 'fraud')
  revenue uses total_usd after source-system discount calculation
  order_date is DATE(order_ts) in UTC`}
        </CodeBox>
        <BulletList
          items={[
            'Every Gold metric should point back to its source tables and business rule.',
            'dbt ref/source graphs help automate lineage for SQL models.',
            'Load metadata connects modeled rows to source files or batches.',
            'Query history and access history provide operational lineage during incidents.',
            'Lineage should be understandable to humans, not only tools.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Ownership" />
        <SectionTitle>Every Gold Table Needs an Owner</SectionTitle>
        <Para>
          A table without an owner becomes a rumor. Someone uses it, nobody knows if it is correct, and
          nobody feels responsible when it breaks. Ownership is not just a Snowflake OWNERSHIP privilege.
          It is a product responsibility: definition, quality, access, cost, freshness, and communication.
        </Para>
        <Table
          headers={['Object', 'Technical owner', 'Business owner', 'Why both matter']}
          rows={[
            ['RAW.ORDERS', 'Data platform / ingestion team.', 'Source application owner.', 'Engineering owns load reliability; source owner owns meaning.'],
            ['SILVER.ORDERS', 'Analytics engineering.', 'Operations or commerce domain owner.', 'Cleaning logic needs both SQL and domain context.'],
            ['GOLD.DAILY_REVENUE', 'Analytics engineering.', 'Finance.', 'Metric definitions affect executive decisions.'],
            ['GOLD.PRODUCT_SALES_MART', 'Analytics engineering.', 'Product or merchandising.', 'Product hierarchy and exclusions need business approval.'],
          ]}
        />
        <CodeBox label="Ownership metadata pattern">{`-- Example documentation fields to keep in dbt docs, a catalog, or a metadata table:
object_name: RETAIL.GOLD.DAILY_REVENUE
technical_owner: analytics-engineering@company.com
business_owner: finance-analytics@company.com
freshness_sla: available by 7:00 AM America/New_York
grain: one row per order_date
primary_consumers: executive revenue dashboard, finance monthly close
definition: excludes cancelled and fraud orders`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Freshness and SLAs" />
        <SectionTitle>Freshness Is a Business Promise</SectionTitle>
        <Para>
          A table can be perfectly modeled and still useless if it arrives too late. Freshness should be
          stated in business terms: the executive dashboard must be ready by 7:00 AM Eastern, customer support
          metrics must update every 15 minutes, finance close tables must be final by the third business day.
        </Para>
        <CodeBox label="Freshness audit table">{`CREATE OR REPLACE TABLE OPS.DATASET_FRESHNESS (
  dataset_name STRING,
  expected_by STRING,
  latest_data_ts TIMESTAMP_NTZ,
  checked_at TIMESTAMP_NTZ,
  status STRING
);

INSERT INTO OPS.DATASET_FRESHNESS
SELECT
  'RETAIL.GOLD.DAILY_REVENUE',
  '07:00 America/New_York',
  MAX(order_date)::TIMESTAMP_NTZ,
  CURRENT_TIMESTAMP(),
  CASE
    WHEN MAX(order_date) >= CURRENT_DATE() - 1 THEN 'OK'
    ELSE 'STALE'
  END
FROM RETAIL.GOLD.DAILY_REVENUE;`}
        </CodeBox>
        <Table
          headers={['SLA type', 'Example', 'How to monitor']}
          rows={[
            ['Freshness', 'Daily revenue ready by 7 AM ET.', 'Max business date or loaded_at.'],
            ['Completeness', 'All store files arrived.', 'Expected files versus loaded files.'],
            ['Accuracy', 'Revenue reconciles with payments.', 'Reconciliation tests.'],
            ['Availability', 'BI queries complete within target.', 'Query history and dashboard health.'],
            ['Cost', 'Pipeline stays under monthly budget.', 'Warehouse metering and resource monitors.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Incremental vs full refresh" />
        <SectionTitle>Not Every Model Should Rebuild From Scratch</SectionTitle>
        <Para>
          Full refresh is simple: rebuild the whole target table. Incremental processing is efficient: process
          only new or changed records. The right choice depends on data volume, source behavior, correction
          patterns, and how expensive the transformation is.
        </Para>
        <Table
          headers={['Strategy', 'Best for', 'Risk', 'Snowflake pattern']}
          rows={[
            ['Full refresh', 'Small tables, dimensions, simple marts.', 'Expensive when data grows.', 'CREATE OR REPLACE TABLE AS SELECT.'],
            ['Append incremental', 'Immutable events.', 'Duplicates if retries are not handled.', 'INSERT new records using watermark.'],
            ['MERGE incremental', 'Mutable entities such as orders/customers.', 'Wrong key corrupts target.', 'MERGE staging into Silver/Gold.'],
            ['Streams/tasks', 'Native change processing.', 'Stream staleness and task failures.', 'STREAM + TASK + MERGE.'],
            ['Dynamic tables', 'Declarative refresh use cases.', 'Refresh mode/cost misunderstood.', 'CREATE DYNAMIC TABLE.'],
          ]}
        />
        <Callout title="Module connection">
          The next module, MERGE and idempotency, goes deep on incremental design. For medallion architecture,
          remember the principle: Raw should allow replay, Silver should be reliable, and Gold should be
          rebuildable or repairable.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Security boundaries" />
        <SectionTitle>Use Layers as Access Boundaries</SectionTitle>
        <Para>
          Medallion layers are not only logical modeling layers. They are also useful security boundaries.
          Raw often contains sensitive fields and source-system mess. Silver may still have detailed customer
          data. Gold should expose approved, governed, documented outputs to broad users.
        </Para>
        <CodeBox label="Layered grants">{`-- Broad users get Gold, not Raw.
GRANT USAGE ON DATABASE RETAIL TO ROLE ANALYST_READER;
GRANT USAGE ON SCHEMA RETAIL.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON ALL TABLES IN SCHEMA RETAIL.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON FUTURE TABLES IN SCHEMA RETAIL.GOLD TO ROLE ANALYST_READER;

-- Transformation role gets Raw and modeled schemas.
GRANT USAGE ON SCHEMA RETAIL.RAW TO ROLE DBT_TRANSFORMER;
GRANT SELECT ON ALL TABLES IN SCHEMA RETAIL.RAW TO ROLE DBT_TRANSFORMER;
GRANT USAGE, CREATE TABLE, CREATE VIEW ON SCHEMA RETAIL.SILVER TO ROLE DBT_TRANSFORMER;
GRANT USAGE, CREATE TABLE, CREATE VIEW ON SCHEMA RETAIL.GOLD TO ROLE DBT_TRANSFORMER;`}
        </CodeBox>
        <Table
          headers={['Layer', 'Access posture', 'Reason']}
          rows={[
            ['Raw', 'Restricted.', 'May contain PII, duplicates, dirty records, and source-only context.'],
            ['Silver', 'Moderately restricted.', 'Useful to builders, but still detailed and not always business-approved.'],
            ['Gold', 'Broadest approved access.', 'Designed for consumption, documentation, and governed metrics.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Performance and cost" />
        <SectionTitle>Medallion Design Affects Performance and Cost</SectionTitle>
        <Para>
          Layering can save money or waste money depending on how it is implemented. If every model rebuilds
          every row every hour, cost explodes. If every dashboard repeats expensive raw parsing, cost explodes.
          Good medallion design precomputes stable business outputs, avoids repeated heavy work, and uses
          warehouses sized for the workload.
        </Para>
        <BulletList
          items={[
            'Use Raw for storage and replay, not for every dashboard query.',
            'Use Silver to avoid repeating type casts, dedupe logic, and JSON parsing.',
            'Use Gold to avoid repeating business metric logic in every dashboard.',
            'Use separate warehouses for load, transform, BI, and ad hoc workloads when needed.',
            'Use Query Profile and warehouse metering to find repeated expensive transformations.',
          ]}
        />
        <CodeBox label="Cost smell query">{`SELECT
  warehouse_name,
  user_name,
  query_text,
  total_elapsed_time / 1000 AS seconds_elapsed,
  bytes_scanned
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
  AND query_text ILIKE '%RAW.%'
  AND bytes_scanned > 1000000000
ORDER BY bytes_scanned DESC
LIMIT 20;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Anti-patterns" />
        <SectionTitle>Common Medallion Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Letting dashboards query Raw because Gold is not ready.',
              'Calling a schema Silver even though it has no tests, dedupe, or typing.',
              'Creating five different Gold revenue tables with conflicting definitions.',
              'Dropping Raw too early and losing replay/debugging ability.',
              'Using one giant SQL model that jumps directly from raw source to executive metric.',
              'Giving every analyst access to every layer.',
              'Treating dbt tests as optional because the SQL compiled successfully.',
              'Having no owners for Gold metrics used by leadership.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — End-to-end lab" />
        <SectionTitle>Hands-On Lab: Build Orders Raw, Silver, and Gold</SectionTitle>
        <Para>
          This lab is the minimum practical medallion project. You will create a raw table, clean it into
          Silver, publish a Gold mart, and write checks that prove the pipeline is usable.
        </Para>
        <CodeBox label="Lab: create sample raw data">{`CREATE OR REPLACE DATABASE MEDALLION_LAB;
CREATE OR REPLACE SCHEMA MEDALLION_LAB.RAW;
CREATE OR REPLACE SCHEMA MEDALLION_LAB.SILVER;
CREATE OR REPLACE SCHEMA MEDALLION_LAB.GOLD;

CREATE OR REPLACE TABLE MEDALLION_LAB.RAW.ORDERS (
  order_id STRING,
  customer_id STRING,
  order_ts STRING,
  status STRING,
  total_usd STRING,
  loaded_at TIMESTAMP_NTZ
);

INSERT INTO MEDALLION_LAB.RAW.ORDERS VALUES
  ('O-1', 'C-1', '2026-09-01 10:00:00', 'completed', '100.00', CURRENT_TIMESTAMP()),
  ('O-2', 'C-2', '2026-09-01 11:00:00', 'cancelled', '50.00', CURRENT_TIMESTAMP()),
  ('O-1', 'C-1', '2026-09-01 10:05:00', 'completed', '100.00', DATEADD(minute, 1, CURRENT_TIMESTAMP())),
  ('O-3', 'C-1', 'bad timestamp', 'completed', '25.00', CURRENT_TIMESTAMP());`}
        </CodeBox>
        <CodeBox label="Lab: Silver and Gold">{`CREATE OR REPLACE TABLE MEDALLION_LAB.SILVER.ORDERS AS
SELECT
  order_id,
  customer_id,
  TRY_TO_TIMESTAMP_NTZ(order_ts) AS order_ts,
  LOWER(status) AS status,
  TRY_TO_NUMBER(total_usd, 12, 2) AS total_usd,
  loaded_at
FROM MEDALLION_LAB.RAW.ORDERS
WHERE order_id IS NOT NULL
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY loaded_at DESC
) = 1;

CREATE OR REPLACE TABLE MEDALLION_LAB.GOLD.DAILY_REVENUE AS
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM MEDALLION_LAB.SILVER.ORDERS
WHERE status = 'completed'
  AND order_ts IS NOT NULL
GROUP BY 1;`}
        </CodeBox>
        <SubTitle>Lab checks</SubTitle>
        <BulletList
          items={[
            'Why does O-1 appear only once in Silver?',
            'Why does O-3 not contribute to Daily Revenue?',
            'Which query would catch the bad timestamp?',
            'Should analysts query RAW.ORDERS or GOLD.DAILY_REVENUE?',
            'What metadata would you add before making this production?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Interview answer" />
        <SectionTitle>How to Explain ELT and Medallion Architecture in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: In Snowflake, I prefer ELT because the warehouse can store raw
          source data and scale compute for transformations. I organize data into Raw, Silver, and Gold.
          Raw preserves source-shaped data with load metadata for replay. Silver standardizes types, names,
          deduplicates records, and creates reliable entities. Gold publishes business-ready marts, facts,
          dimensions, and metrics with clear owners and tests. I would use dbt or a similar workflow to manage
          SQL dependencies, tests, documentation, CI/CD, and environments. I would also include security
          boundaries, freshness monitoring, cost controls, and a backfill plan.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is the difference between ETL and ELT?',
            'What belongs in Raw, Silver, and Gold?',
            'Why should dashboards avoid querying Raw tables?',
            'How do dbt refs, sources, tests, and docs support medallion architecture?',
            'When would you choose a view versus a table versus an incremental model?',
            'How would you monitor freshness and quality for a Gold table?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'ELT loads data first and transforms it inside Snowflake.',
          'Raw preserves source-shaped data and load metadata.',
          'Silver creates clean, typed, deduped, reusable entities.',
          'Gold publishes business-ready facts, dimensions, marts, and metrics.',
          'Tests, documentation, lineage, ownership, and freshness are part of the architecture.',
          'Layering also supports security, performance, cost control, and incident recovery.',
        ]}
      />
    </LearnLayout>
  )
}
