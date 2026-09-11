import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SetupAndSqlBasics() {
  return (
    <LearnLayout
      title="Setup and SQL Basics"
      description="Create warehouses, databases, schemas, tables, roles, and run the Snowflake SQL every beginner needs."
      section="Snowflake — Module 03"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Setup and SQL Basics', href: '/learn/snowflake/setup-and-sql-basics' },
      ]}
      prev={{ title: 'Snowflake Architecture', href: '/learn/snowflake/architecture' }}
      next={{ title: 'Loading Data with Stages and COPY INTO', href: '/learn/snowflake/loading-data' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — First working environment" />
        <SectionTitle>Create the Objects You Need Before Writing Queries</SectionTitle>
        <Para>
          A Snowflake beginner needs five objects to start: a role, a warehouse, a database, a schema, and a
          table. The role controls what you are allowed to do. The warehouse supplies compute. The database
          and schema organize objects. The table stores rows.
        </Para>
        <CodeBox label="Starter setup">{`USE ROLE SYSADMIN;

CREATE WAREHOUSE IF NOT EXISTS WH_LEARN_XS
  WAREHOUSE_SIZE = XSMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

CREATE DATABASE IF NOT EXISTS LEARN_SNOWFLAKE;
CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.RAW;
CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.SILVER;
CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.GOLD;

USE WAREHOUSE WH_LEARN_XS;
USE DATABASE LEARN_SNOWFLAKE;
USE SCHEMA RAW;`}
        </CodeBox>
        <Callout title="Cost safety">
          For learning, use an X-Small warehouse with auto-suspend. Do not leave a warehouse running because
          Snowflake compute billing is tied to warehouse runtime and size.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Table basics" />
        <SectionTitle>Create Tables and Query Real Rows</SectionTitle>
        <CodeBox label="Create and populate a table">{`CREATE OR REPLACE TABLE RAW.ORDERS (
  order_id      STRING,
  customer_id   STRING,
  order_ts      TIMESTAMP_NTZ,
  status        STRING,
  order_amount  NUMBER(10,2),
  updated_at    TIMESTAMP_NTZ
);

INSERT INTO RAW.ORDERS VALUES
  ('O-1001', 'C-10', '2026-09-01 10:15:00', 'PLACED',    129.99, CURRENT_TIMESTAMP()),
  ('O-1002', 'C-11', '2026-09-01 11:20:00', 'PLACED',     59.50, CURRENT_TIMESTAMP()),
  ('O-1003', 'C-10', '2026-09-02 09:05:00', 'CANCELLED',  35.00, CURRENT_TIMESTAMP()),
  ('O-1004', 'C-12', '2026-09-02 12:30:00', 'PLACED',    210.00, CURRENT_TIMESTAMP());

SELECT * FROM RAW.ORDERS;`}
        </CodeBox>
        <Table
          headers={['Type', 'Meaning', 'Common use']}
          rows={[
            ['STRING', 'Text data.', 'IDs, names, status values.'],
            ['NUMBER(10,2)', 'Fixed precision numeric.', 'Money-like amounts.'],
            ['TIMESTAMP_NTZ', 'Timestamp without timezone.', 'Event times when timezone is handled separately.'],
            ['BOOLEAN', 'True/false.', 'Flags.'],
            ['VARIANT', 'Semi-structured data.', 'JSON payloads and nested events.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Analytical SQL" />
        <SectionTitle>Group, Filter, Window, and QUALIFY</SectionTitle>
        <Para>
          Snowflake SQL feels familiar if you know PostgreSQL or standard SQL, but some features are
          especially useful for analytics. <code>QUALIFY</code> is one of the most important: it lets you
          filter on window functions without wrapping the query in another CTE.
        </Para>
        <CodeBox label="Aggregate revenue">{`SELECT
  DATE_TRUNC('day', order_ts)::DATE AS order_date,
  COUNT(*) AS order_count,
  SUM(order_amount) AS gross_revenue
FROM RAW.ORDERS
WHERE status = 'PLACED'
GROUP BY 1
ORDER BY order_date;`}
        </CodeBox>
        <CodeBox label="Deduplicate with QUALIFY">{`-- Keep the latest row per order_id.
SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  order_amount,
  updated_at
FROM RAW.ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC
) = 1;`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Why QUALIFY matters:</strong> In PostgreSQL you usually need a CTE or subquery before
            filtering on <code>ROW_NUMBER()</code>. Snowflake's <code>QUALIFY</code> makes common
            deduplication and top-N patterns shorter and easier to read.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Schemas as layers" />
        <SectionTitle>Use Schemas to Organize Raw, Silver, and Gold</SectionTitle>
        <Para>
          A schema is not only a technical namespace. In analytics engineering, schemas often represent
          trust levels. Raw tables are close to source data. Silver tables are cleaned and deduplicated.
          Gold tables are business-facing marts and aggregates.
        </Para>
        <CodeBox label="Layered tables">{`CREATE OR REPLACE TABLE SILVER.ORDERS AS
SELECT
  order_id,
  customer_id,
  order_ts,
  status,
  order_amount,
  updated_at
FROM RAW.ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC
) = 1;

CREATE OR REPLACE TABLE GOLD.DAILY_REVENUE AS
SELECT
  DATE_TRUNC('day', order_ts)::DATE AS order_date,
  COUNT(*) AS placed_orders,
  SUM(order_amount) AS gross_revenue
FROM SILVER.ORDERS
WHERE status = 'PLACED'
GROUP BY 1;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Beginner mistakes" />
        <SectionTitle>Common Setup and SQL Mistakes</SectionTitle>
        <BulletList
          items={[
            'Running queries without setting the intended warehouse, database, schema, and role.',
            'Leaving learning warehouses running instead of using auto-suspend.',
            'Using SELECT * in production models where column contracts should be explicit.',
            'Assuming primary key declarations enforce uniqueness like PostgreSQL.',
            'Putting raw, cleaned, and business-facing tables in one messy schema.',
            'Using TIMESTAMP types without a team convention for timezone handling.',
          ]}
        />
        <Callout title="Production habit" color="#ef4444">
          At the top of scripts, be explicit about role, warehouse, database, and schema. Invisible session
          context is convenient until a query writes to the wrong environment.
        </Callout>
      </section>

      <KeyTakeaways
        items={[
          'A beginner Snowflake environment needs a role, warehouse, database, schema, and tables.',
          'Warehouses are compute and should use auto-suspend for cost control.',
          'QUALIFY is a Snowflake-friendly way to filter window function results.',
          'Raw, Silver, and Gold schemas organize trust levels and business readiness.',
          'Session context matters: always know your current role, warehouse, database, and schema.',
        ]}
      />
    </LearnLayout>
  )
}
