import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SetupAndSqlBasics() {
  return (
    <LearnLayout
      title="Setup and SQL Basics"
      description="The Snowflake object hierarchy, warehouses vs databases, creating warehouses/databases/schemas/tables, core DML, session context, and first-day gotchas."
      section="Snowflake — Module 03"
      readTime="85 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Setup and SQL Basics', href: '/learn/snowflake/setup-and-sql-basics' },
      ]}
      prev={{ title: 'Snowflake Architecture', href: '/learn/snowflake/architecture' }}
      next={{ title: 'Roles and Security Basics', href: '/learn/snowflake/roles-security-basics' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The object hierarchy" />
        <SectionTitle>Account, Database, Schema, Table — and Warehouses Off to the Side</SectionTitle>
        <Para>
          Every object you create in Snowflake lives inside a strict containment hierarchy: an account holds
          databases, a database holds schemas, and a schema holds tables, views, stages, file formats, streams,
          tasks, and most other objects. This is close to what you'd expect from PostgreSQL or SQL Server, where
          a database contains schemas and schemas contain tables.
        </Para>
        <Para>
          What trips up beginners is that <strong>warehouses are not part of this hierarchy at all.</strong> A
          warehouse is a separate, account-level compute resource. It does not belong to a database or a schema,
          and it does not "contain" anything. It is simply the compute engine that executes your SQL. You pick a
          warehouse to run a query, independent of which database or schema you are querying. This separation of
          storage (the account/database/schema/table hierarchy) from compute (warehouses) is the single most
          important architectural idea to internalize before writing your first query.
        </Para>
        <CodeBox label="The hierarchy, drawn out">{`ACCOUNT
  │
  ├── DATABASE  (e.g. LEARN_SNOWFLAKE)
  │     │
  │     ├── SCHEMA  (e.g. RAW)
  │     │     ├── TABLE
  │     │     ├── VIEW
  │     │     ├── STAGE
  │     │     ├── FILE FORMAT
  │     │     ├── STREAM
  │     │     └── TASK
  │     │
  │     └── SCHEMA  (e.g. SILVER, GOLD, ...)
  │
  └── DATABASE  (more databases...)

WAREHOUSE  (e.g. WH_LEARN_XS)  <- lives beside the hierarchy above,
                                   not inside it. Pure compute.`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> the database/schema/table tree is where your data
            <em> lives</em>. A warehouse is what you <em>rent</em> to go get it, transform it, or write more of
            it. You can point the same warehouse at ten different databases, and you can query the same database
            with ten different warehouses. They are independent choices.
          </Para>
        </HighlightBox>
        <Table
          headers={['Object', 'What it holds', 'Analogy']}
          rows={[
            ['Account', 'All databases and all warehouses for your organization.', 'The whole building.'],
            ['Database', 'A set of related schemas.', 'A floor in the building.'],
            ['Schema', 'A set of related tables/views/stages/etc.', 'A room on that floor.'],
            ['Table', 'Rows of data.', 'A filing cabinet in the room.'],
            ['Warehouse', 'Compute that runs your SQL against any of the above.', 'A crew of movers you hire by the hour.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Creating a warehouse" />
        <SectionTitle>CREATE WAREHOUSE and the Options That Actually Matter</SectionTitle>
        <Para>
          A warehouse is created once and then reused across sessions and queries. The options you set at
          creation time control how much it costs to run and how forgiving it is when idle.
        </Para>
        <CodeBox label="Create a warehouse with real options">{`CREATE WAREHOUSE IF NOT EXISTS WH_LEARN_XS
  WAREHOUSE_SIZE      = XSMALL
  AUTO_SUSPEND        = 60
  AUTO_RESUME         = TRUE
  INITIALLY_SUSPENDED = TRUE
  COMMENT             = 'Small warehouse for learning and light exploration';`}
        </CodeBox>
        <Table
          headers={['Option', 'What it controls', 'Beginner default']}
          rows={[
            ['WAREHOUSE_SIZE', 'Number of servers in the compute cluster (XSMALL, SMALL, MEDIUM, LARGE, ...). Bigger sizes cost more credits per second but run individual queries faster.', 'XSMALL for learning; size up only when a query is genuinely slow.'],
            ['AUTO_SUSPEND', 'Seconds of inactivity before Snowflake automatically suspends (stops billing) the warehouse.', '60 seconds. Short suspend windows keep idle costs near zero.'],
            ['AUTO_RESUME', 'Whether the warehouse automatically starts again the next time a query needs it.', 'TRUE. Otherwise every query fails until someone manually resumes it.'],
            ['INITIALLY_SUSPENDED', 'Whether the warehouse starts in a suspended (not running) state right after creation.', 'TRUE. No reason to pay for compute before you run your first query.'],
          ]}
        />
        <Callout title="Cost safety">
          Snowflake bills warehouse compute by the second while a warehouse is running, based on its size. A
          warehouse left running with a long or disabled auto-suspend is the single most common way beginners
          rack up unexpected Snowflake bills. Always set <code>AUTO_SUSPEND</code> explicitly rather than trusting
          defaults.
        </Callout>
        <Para>
          You can change any of these settings later with <code>ALTER WAREHOUSE</code>, and you can manually
          suspend or resume:
        </Para>
        <CodeBox label="Alter and manually control a warehouse">{`ALTER WAREHOUSE WH_LEARN_XS SET WAREHOUSE_SIZE = SMALL;
ALTER WAREHOUSE WH_LEARN_XS SUSPEND;
ALTER WAREHOUSE WH_LEARN_XS RESUME;

SHOW WAREHOUSES LIKE 'WH_LEARN_XS';`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Creating databases and schemas" />
        <SectionTitle>CREATE DATABASE and CREATE SCHEMA</SectionTitle>
        <Para>
          Databases and schemas are cheap and fast to create — they are metadata, not compute, so they don't
          need a running warehouse. A common beginner pattern is to create one learning database with a few
          schemas that represent stages of data trustworthiness: raw, cleaned, and business-ready.
        </Para>
        <CodeBox label="Database and schema setup">{`CREATE DATABASE IF NOT EXISTS LEARN_SNOWFLAKE
  COMMENT = 'Sandbox database for learning Snowflake SQL';

CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.RAW;
CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.SILVER;
CREATE SCHEMA IF NOT EXISTS LEARN_SNOWFLAKE.GOLD;

SHOW SCHEMAS IN DATABASE LEARN_SNOWFLAKE;`}
        </CodeBox>
        <Para>
          Note the naming pattern: <code>DATABASE.SCHEMA.TABLE</code> is the fully qualified name of any table.
          You'll see this three-part naming constantly — in queries, in COPY INTO statements, and in error
          messages when Snowflake can't find an object because your session context points somewhere else.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Roles, just enough to get moving" />
        <SectionTitle>USE ROLE: Enough to Run These Commands</SectionTitle>
        <Para>
          Every action in Snowflake runs under a role, and the role determines what you are permitted to do.
          <code>SYSADMIN</code> is the conventional role for creating warehouses, databases, and schemas in a
          learning environment or as an account owner setting things up. <code>ACCOUNTADMIN</code> has the
          broadest privileges and is reserved for account-level administration, not day-to-day object creation.
        </Para>
        <CodeBox label="Set your role before creating objects">{`USE ROLE SYSADMIN;

CREATE WAREHOUSE IF NOT EXISTS WH_LEARN_XS
  WAREHOUSE_SIZE = XSMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;`}
        </CodeBox>
        <Callout title="This is not the whole roles story">
          This module only covers enough about roles to run <code>CREATE WAREHOUSE</code>,
          <code>CREATE DATABASE</code>, and basic DML. Grants, custom roles, the role hierarchy, and
          least-privilege design are covered in full in the dedicated roles and security basics module later in
          this track. Don't try to learn access control from this page.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Session context: USE WAREHOUSE/DATABASE/SCHEMA/ROLE" />
        <SectionTitle>Every Session Has Implicit Context — Set It Explicitly</SectionTitle>
        <Para>
          A Snowflake session tracks four pieces of context at all times: current role, current warehouse,
          current database, and current schema. Any query you run without a fully qualified name resolves
          against that context. If the context is wrong — or unset — your query either fails or, worse, runs
          successfully against the wrong objects.
        </Para>
        <CodeBox label="Set full session context">{`USE ROLE SYSADMIN;
USE WAREHOUSE WH_LEARN_XS;
USE DATABASE LEARN_SNOWFLAKE;
USE SCHEMA RAW;

-- Now this resolves to LEARN_SNOWFLAKE.RAW.ORDERS
SELECT * FROM ORDERS;

-- Check current context at any time:
SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();`}
        </CodeBox>
        <Table
          headers={['Context', 'Set with', 'What breaks if unset or wrong']}
          rows={[
            ['Role', 'USE ROLE ...', "'Insufficient privileges' errors, or objects that exist but you can't see them."],
            ['Warehouse', 'USE WAREHOUSE ...', "'No active warehouse' error — queries that need compute simply refuse to run."],
            ['Database', 'USE DATABASE ...', 'Unqualified table names resolve to the wrong database, or fail to resolve at all.'],
            ['Schema', 'USE SCHEMA ...', 'Same table name in a different schema gets queried by mistake.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Mental model:</strong> think of session context as four sticky notes on your monitor — role,
            warehouse, database, schema. Every unqualified SQL statement reads those sticky notes first. Scripts
            that don't set them explicitly are relying on whatever context happened to be left over from your
            last session, which is a common source of "it worked yesterday" bugs.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Creating tables with real Snowflake types" />
        <SectionTitle>CREATE OR REPLACE TABLE and Snowflake's Data Types</SectionTitle>
        <Para>
          Snowflake's type system covers the same ground as most SQL databases, with a few names worth
          learning precisely because they differ from Postgres or MySQL conventions.
        </Para>
        <CodeBox label="Create a table with common types">{`CREATE OR REPLACE TABLE RAW.ORDERS (
  order_id      STRING,
  customer_id   STRING,
  order_ts      TIMESTAMP_NTZ,
  placed_at_utc TIMESTAMP_TZ,
  status        STRING,
  order_amount  NUMBER(10,2),
  is_test_order BOOLEAN DEFAULT FALSE,
  updated_at    TIMESTAMP_NTZ
);`}
        </CodeBox>
        <Table
          headers={['Type', 'Meaning', 'Notes']}
          rows={[
            ['NUMBER(precision, scale)', 'Exact fixed-point numeric.', 'NUMBER(10,2) is a common shape for money — 10 total digits, 2 after the decimal.'],
            ['STRING / VARCHAR', 'Variable-length text.', 'Snowflake treats STRING and VARCHAR as the same type; there is no meaningful length penalty for over-sizing.'],
            ['TIMESTAMP_NTZ', 'Timestamp with no timezone attached ("naive" / wall-clock time).', 'Good default when your whole pipeline agrees on one timezone, usually UTC, by convention.'],
            ['TIMESTAMP_TZ', 'Timestamp with an explicit timezone offset stored per value.', 'Use when values arrive from multiple timezones and you need the offset preserved.'],
            ['BOOLEAN', 'True/false/null.', 'Straightforward — no surprises here.'],
            ['VARIANT', 'Semi-structured data (JSON-like) stored natively.', "Only a brief mention here — VARIANT gets a full module later covering JSON parsing, dot notation, and FLATTEN."],
          ]}
        />
        <Callout title="Don't over-invest in VARIANT yet">
          You will see <code>VARIANT</code> columns in later modules when loading JSON. For this module, just
          recognize the type exists and holds semi-structured data — the deep dive on querying it comes with the
          semi-structured data module.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Basic DML: INSERT" />
        <SectionTitle>INSERT Rows the Standard SQL Way</SectionTitle>
        <Para>
          Snowflake's DML is close to standard ANSI SQL, so if you know PostgreSQL or MySQL, most of this will
          feel immediately familiar.
        </Para>
        <CodeBox label="Insert literal rows">{`INSERT INTO RAW.ORDERS (order_id, customer_id, order_ts, placed_at_utc, status, order_amount, updated_at) VALUES
  ('O-1001', 'C-10', '2026-09-01 10:15:00', '2026-09-01 10:15:00 +00:00', 'PLACED',    129.99, CURRENT_TIMESTAMP()),
  ('O-1002', 'C-11', '2026-09-01 11:20:00', '2026-09-01 11:20:00 +00:00', 'PLACED',     59.50, CURRENT_TIMESTAMP()),
  ('O-1003', 'C-10', '2026-09-02 09:05:00', '2026-09-02 09:05:00 +00:00', 'CANCELLED',  35.00, CURRENT_TIMESTAMP()),
  ('O-1004', 'C-12', '2026-09-02 12:30:00', '2026-09-02 12:30:00 +00:00', 'PLACED',    210.00, CURRENT_TIMESTAMP());`}
        </CodeBox>
        <Para>
          You can also insert from a SELECT, which is the standard way to populate one table from another —
          you'll see this constantly when building Raw → Silver → Gold layers:
        </Para>
        <CodeBox label="Insert from a SELECT">{`CREATE OR REPLACE TABLE RAW.ORDERS_BACKUP LIKE RAW.ORDERS;

INSERT INTO RAW.ORDERS_BACKUP
SELECT * FROM RAW.ORDERS
WHERE status = 'PLACED';`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Basic DML: SELECT" />
        <SectionTitle>SELECT, WHERE, GROUP BY, and QUALIFY</SectionTitle>
        <Para>
          Standard SELECT clauses behave as expected. One feature is especially worth learning early because it
          is distinctly Snowflake-friendly: <code>QUALIFY</code>, which filters on the result of a window
          function without needing a wrapping CTE or subquery.
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
        <CodeBox label="Deduplicate with QUALIFY">{`-- Keep only the latest row per order_id.
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
            <strong>Why QUALIFY matters:</strong> in PostgreSQL or MySQL you typically wrap a
            <code>ROW_NUMBER()</code> query in a CTE or subquery just so you can filter on it in an outer
            <code>WHERE</code>. Snowflake's <code>QUALIFY</code> clause filters directly on window function
            results in the same query — shorter, and the intent ("keep exactly one row per group") reads more
            clearly.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Basic DML: UPDATE and DELETE" />
        <SectionTitle>UPDATE and DELETE Work as You'd Expect</SectionTitle>
        <CodeBox label="Update and delete">{`UPDATE RAW.ORDERS
SET status = 'REFUNDED', updated_at = CURRENT_TIMESTAMP()
WHERE order_id = 'O-1003';

DELETE FROM RAW.ORDERS
WHERE status = 'CANCELLED'
  AND order_ts < DATEADD(day, -90, CURRENT_DATE());`}
        </CodeBox>
        <Callout title="Snowflake does not enforce PRIMARY KEY uniqueness">
          You can declare <code>PRIMARY KEY</code> and <code>UNIQUE</code> constraints in Snowflake, and they are
          useful as documentation and for some query optimizations, but Snowflake does <strong>not</strong>{' '}
          enforce them by default the way PostgreSQL does. An <code>INSERT</code> that violates a declared
          primary key will succeed and create duplicate rows. If you need real uniqueness guarantees, enforce
          them in your load logic (dedupe with <code>QUALIFY</code>, or use <code>MERGE</code>) — don't rely on
          the constraint alone.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Schemas as trust layers" />
        <SectionTitle>Use Schemas to Organize Raw, Silver, and Gold</SectionTitle>
        <Para>
          A schema is not only a technical namespace. In analytics engineering, schemas often represent trust
          levels. Raw tables stay close to source data. Silver tables are cleaned and deduplicated. Gold tables
          are business-facing marts and aggregates that dashboards and stakeholders query directly.
        </Para>
        <Table
          headers={['Layer', 'What lives there', 'Who queries it directly']}
          rows={[
            ['Raw', 'Source-shaped data, minimal transformation, may contain duplicates or bad rows.', 'Data engineers debugging ingestion issues.'],
            ['Silver', 'Cleaned, deduplicated, typed, joined to reference data.', 'Analytics engineers building models; rarely end users.'],
            ['Gold', 'Business-defined aggregates and marts with agreed-upon definitions.', 'Dashboards, BI tools, business stakeholders.'],
          ]}
        />
        <Para>
          This is a convention, not a Snowflake-enforced feature — nothing stops you from naming schemas
          differently or skipping the pattern for a small project. But it scales well: it gives every table an
          implicit answer to "how much do I trust this data," and it keeps in-progress cleanup work from leaking
          into dashboards people rely on.
        </Para>
        <CodeBox label="Layered tables across schemas">{`CREATE OR REPLACE TABLE SILVER.ORDERS AS
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
        <SectionTag text="// Part 11 — ALTER, DROP, and cloning tables" />
        <SectionTitle>Changing Tables Safely: ALTER, DROP, and Zero-Copy Cloning</SectionTitle>
        <Para>
          Beyond CREATE OR REPLACE, you'll frequently need to change a table's shape without losing its data, or
          make a throwaway copy to test something risky. Snowflake's <code>ALTER TABLE</code> covers the first
          case, and its zero-copy <code>CLONE</code> feature covers the second — cheaply, because a clone shares
          the underlying storage with its source until either side changes data.
        </Para>
        <CodeBox label="Adding and modifying columns without losing data">{`ALTER TABLE RAW.ORDERS ADD COLUMN channel STRING DEFAULT 'web';

ALTER TABLE RAW.ORDERS RENAME COLUMN channel TO sales_channel;

ALTER TABLE RAW.ORDERS ALTER COLUMN order_amount SET DATA TYPE NUMBER(12,2);

ALTER TABLE RAW.ORDERS DROP COLUMN is_test_order;`}
        </CodeBox>
        <CodeBox label="Zero-copy clone for safe experimentation">{`-- Instant, storage-cheap copy - safe to experiment on:
CREATE OR REPLACE TABLE RAW.ORDERS_EXPERIMENT
  CLONE RAW.ORDERS;

-- Try something destructive against the clone, not the real table:
DELETE FROM RAW.ORDERS_EXPERIMENT WHERE status = 'CANCELLED';

-- Drop the clone when you're done - no impact on RAW.ORDERS:
DROP TABLE IF EXISTS RAW.ORDERS_EXPERIMENT;`}
        </CodeBox>
        <Callout title="CREATE OR REPLACE vs ALTER TABLE">
          <code>CREATE OR REPLACE TABLE</code> fully drops and recreates the object — every row, every grant, and
          every dependent view or stream reference is gone and rebuilt from scratch. Use <code>ALTER TABLE</code>{' '}
          when you want to change shape while keeping existing data and grants intact. Reach for{' '}
          <code>CREATE OR REPLACE</code> only when you genuinely want a clean slate.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Multi-statement transactions" />
        <SectionTitle>Snowflake Auto-Commits by Default — Use Explicit Transactions When Steps Must Stay Together</SectionTitle>
        <Para>
          By default, each DML statement in Snowflake commits immediately once it completes. That's fine for a
          single INSERT or UPDATE, but if you need several statements to succeed or fail together — for example,
          moving money between two rows, or updating a table and an audit log in lockstep — wrap them in an
          explicit transaction.
        </Para>
        <CodeBox label="Explicit transaction">{`BEGIN;

UPDATE RAW.ORDERS
SET status = 'REFUNDED'
WHERE order_id = 'O-1004';

INSERT INTO RAW.ORDER_AUDIT (order_id, action, actioned_at)
VALUES ('O-1004', 'REFUND', CURRENT_TIMESTAMP());

COMMIT;

-- If anything looked wrong before COMMIT, you could instead run:
-- ROLLBACK;`}
        </CodeBox>
        <Para>
          Transactions matter less for simple analytical SELECTs and more once you start writing pipelines that
          touch multiple tables per logical unit of work — you'll see this pattern again when stored procedures
          and multi-step MERGE pipelines come up later in the track.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12b — SHOW, DESCRIBE, and self-discovery" />
        <SectionTitle>Finding Your Way Around With SHOW and DESCRIBE</SectionTitle>
        <Para>
          Before you memorize an environment's layout, you need commands that let Snowflake tell you what
          exists. <code>SHOW</code> lists objects of a given kind, and <code>DESCRIBE</code> (or its shorthand{' '}
          <code>DESC</code>) reveals the structure of one specific object. These are the commands you'll run
          constantly while debugging "why can't I find this table" issues.
        </Para>
        <CodeBox label="Discovering what exists">{`SHOW DATABASES;
SHOW SCHEMAS IN DATABASE LEARN_SNOWFLAKE;
SHOW TABLES IN SCHEMA LEARN_SNOWFLAKE.RAW;
SHOW WAREHOUSES;

DESCRIBE TABLE LEARN_SNOWFLAKE.RAW.ORDERS;

-- Also useful: query the account-wide metadata views directly
SELECT table_catalog, table_schema, table_name, row_count, bytes
FROM LEARN_SNOWFLAKE.INFORMATION_SCHEMA.TABLES
WHERE table_schema = 'RAW';`}
        </CodeBox>
        <Table
          headers={['Command', 'Answers']}
          rows={[
            ['SHOW DATABASES / SCHEMAS / TABLES / WAREHOUSES', '"What objects of this kind exist, and where?"'],
            ['DESCRIBE TABLE <name>', '"What columns does this table have, and what are their types?"'],
            ['INFORMATION_SCHEMA.TABLES', '"Give me this as a queryable result set I can filter, join, or script against."'],
          ]}
        />
        <Callout title="Cheap habit, real payoff">
          Running a quick SHOW or DESCRIBE before writing a query against an unfamiliar table takes seconds and
          avoids guessing column names — especially useful combined with Part 14's case-sensitivity rules, since
          DESCRIBE shows you exactly how each column name is actually stored.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Ways to run this SQL" />
        <SectionTitle>Snowsight, SnowSQL, and Connectors</SectionTitle>
        <Para>
          None of the SQL above changes depending on how you connect — Snowflake exposes the same SQL surface
          regardless of client. What changes is convenience, scriptability, and where the work fits in your
          workflow.
        </Para>
        <Table
          headers={['Tool', 'What it is', 'Best for']}
          rows={[
            ['Snowsight', "Snowflake's built-in browser-based web UI.", 'Exploration, ad-hoc queries, dashboards, worksheet history, reviewing query profiles visually.'],
            ['SnowSQL', 'A command-line client (CLI) you install locally.', 'Scripting, automation, uploading local files to stages with PUT, CI/CD pipelines.'],
            ['Connectors / drivers', 'Python connector, JDBC, ODBC, Node driver, etc.', 'Application code, orchestration tools (Airflow, dbt), BI tools, custom pipelines.'],
          ]}
        />
        <Para>
          As a beginner, Snowsight is the fastest way to run everything in this module. You'll reach for SnowSQL
          specifically once you need to <code>PUT</code> local files onto an internal stage — covered in the next
          module on loading data.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Identifier case-sensitivity" />
        <SectionTitle>Unquoted Identifiers Are Uppercased — The #1 Beginner Confusion</SectionTitle>
        <Para>
          This single rule causes more first-week confusion than anything else in Snowflake SQL. When you write
          an identifier — a table name, column name, database name — without double quotes, Snowflake
          automatically uppercases it before storing or matching it. Quoted identifiers are stored exactly as
          written and become case-sensitive.
        </Para>
        <CodeBox label="Unquoted vs quoted identifiers">{`-- These three statements all create/reference the SAME object,
-- because unquoted identifiers are folded to uppercase:
CREATE TABLE raw.orders (id STRING);
CREATE TABLE RAW.ORDERS (id STRING);   -- same object as above
CREATE TABLE Raw.Orders (id STRING);   -- same object as above

-- Quoting freezes the exact case and makes it case-sensitive:
CREATE TABLE "raw"."my_special_table" (id STRING);

-- This will FAIL to find the table above unless you quote it exactly:
SELECT * FROM raw.my_special_table;      -- looks for RAW.MY_SPECIAL_TABLE, not found

-- This works, because it matches the quoted case exactly:
SELECT * FROM "raw"."my_special_table";`}
        </CodeBox>
        <Table
          headers={['Style', 'Example', 'Behavior']}
          rows={[
            ['Unquoted', 'orders, Orders, ORDERS', 'All fold to ORDERS. Case-insensitive to write, but stored/compared as uppercase.'],
            ['Quoted', '"orders"', 'Stored and matched exactly as "orders" (lowercase). Must be quoted identically every time it is referenced.'],
          ]}
        />
        <Callout title="Practical rule" color="#ef4444">
          Avoid quoted lowercase identifiers unless you have a specific reason (e.g. matching an external
          system's exact casing). Stick to unquoted identifiers everywhere, write them in whatever case is
          readable to you, and let Snowflake fold them to uppercase consistently. Mixing quoted and unquoted
          styles for the same objects is one of the most common sources of "table not found" errors for
          newcomers.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Other first-day gotchas" />
        <SectionTitle>Common Setup and SQL Mistakes</SectionTitle>
        <BulletList
          items={[
            'Running a query with no warehouse selected — Snowflake returns "No active warehouse selected" instead of silently picking one for you.',
            'Leaving learning warehouses running instead of relying on AUTO_SUSPEND.',
            'Using SELECT * in production models where explicit column lists protect you from upstream schema drift.',
            'Assuming PRIMARY KEY declarations enforce uniqueness the way PostgreSQL does — they do not, by default.',
            'Putting raw, cleaned, and business-facing tables in one messy schema instead of separating by trust layer.',
            'Using TIMESTAMP_NTZ without a team convention for which timezone "naive" values represent.',
            'Mixing quoted and unquoted identifiers for the same object and getting inconsistent case-sensitivity.',
            'Forgetting that CREATE OR REPLACE TABLE fully drops and recreates the table, losing all existing rows and grants.',
          ]}
        />
        <Callout title="Production habit">
          At the top of every script or session, be explicit about role, warehouse, database, and schema.
          Invisible, inherited session context is convenient right up until a script runs against the wrong
          environment.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Stand Up a Full Environment From Scratch</SectionTitle>
        <Para>
          This lab walks through everything in this module in order: role, warehouse, database, schemas,
          a table, DML, and a check of session context.
        </Para>
        <CodeBox label="Lab: full setup">{`USE ROLE SYSADMIN;

CREATE WAREHOUSE IF NOT EXISTS WH_SETUP_LAB_XS
  WAREHOUSE_SIZE = XSMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

CREATE DATABASE IF NOT EXISTS SETUP_LAB;
CREATE SCHEMA IF NOT EXISTS SETUP_LAB.RAW;
CREATE SCHEMA IF NOT EXISTS SETUP_LAB.SILVER;

USE WAREHOUSE WH_SETUP_LAB_XS;
USE DATABASE SETUP_LAB;
USE SCHEMA RAW;

CREATE OR REPLACE TABLE CUSTOMERS (
  customer_id STRING,
  full_name   STRING,
  signup_ts   TIMESTAMP_NTZ,
  is_active   BOOLEAN DEFAULT TRUE
);

INSERT INTO CUSTOMERS VALUES
  ('C-1', 'Sarah Bennett', '2026-01-05 09:00:00', TRUE),
  ('C-2', 'Marcus Reed', '2026-02-11 14:30:00', TRUE),
  ('C-3', 'Old Account', '2024-06-01 08:00:00', FALSE);`}
        </CodeBox>
        <CodeBox label="Lab: query, update, verify context">{`SELECT customer_id, full_name
FROM CUSTOMERS
WHERE is_active = TRUE
ORDER BY signup_ts;

UPDATE CUSTOMERS
SET is_active = FALSE
WHERE customer_id = 'C-2';

SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE(), CURRENT_SCHEMA();`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'If you ran the CREATE TABLE statement before running USE SCHEMA RAW, where would the table land?',
            'What would SELECT * FROM Customers (unquoted, mixed case) return, and why?',
            'What happens if you run a SELECT against SETUP_LAB.RAW.CUSTOMERS before ever running USE WAREHOUSE?',
            'How would you rewrite the CUSTOMERS table creation so full_name is quoted as "Full_Name" — and what would querying it look like afterward?',
            'Why does CREATE OR REPLACE TABLE risk data loss compared to ALTER TABLE ADD COLUMN?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Interview answer" />
        <SectionTitle>How to Explain Snowflake Setup and SQL Basics in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake separates storage from compute. Data lives in a strict
          account → database → schema → table hierarchy, while warehouses are independent, account-level compute
          resources you attach to a session — they don't belong to any database or schema. To get started I'd
          set session context explicitly with USE ROLE, USE WAREHOUSE, USE DATABASE, and USE SCHEMA rather than
          relying on inherited defaults, because unqualified queries resolve against that context and wrong
          context is a common source of bugs. Snowflake's DML — INSERT, SELECT, UPDATE, DELETE — is close to
          standard ANSI SQL, with QUALIFY as a notably Snowflake-friendly way to filter window function results
          without a wrapping CTE. One of the most common beginner mistakes is identifier case-sensitivity:
          unquoted identifiers are folded to uppercase automatically, while quoted identifiers are stored exactly
          as written and become case-sensitive, which causes confusing "object not found" errors until you
          internalize the rule. I'd also set AUTO_SUSPEND and AUTO_RESUME on every warehouse to avoid paying for
          idle compute.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'Where do warehouses sit relative to the database/schema/table hierarchy?',
            'What does AUTO_SUSPEND control, and why does it matter for cost?',
            'What are the four pieces of session context, and how do you set them?',
            'What does QUALIFY do that a plain WHERE clause cannot?',
            'Does Snowflake enforce PRIMARY KEY uniqueness by default?',
            'What happens to an identifier\'s case if you don\'t quote it?',
            'What is the difference between TIMESTAMP_NTZ and TIMESTAMP_TZ?',
            'What are the three main ways to run SQL against Snowflake, and when would you use each?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake\'s hierarchy is account → database → schema → table; warehouses are separate, account-level compute that sits outside that tree.',
          'CREATE WAREHOUSE options that matter most for cost are WAREHOUSE_SIZE, AUTO_SUSPEND, AUTO_RESUME, and INITIALLY_SUSPENDED.',
          'A session tracks four pieces of context — role, warehouse, database, schema — and unqualified SQL resolves against them.',
          'Snowflake DML (INSERT/SELECT/UPDATE/DELETE) is close to ANSI SQL; QUALIFY is the standout Snowflake-friendly extension for filtering window functions.',
          'Snowflake does not enforce PRIMARY KEY/UNIQUE constraints by default — dedupe logic is your responsibility.',
          'Unquoted identifiers are automatically uppercased; quoted identifiers are stored and matched exactly as written and become case-sensitive — this is the most common first-week gotcha.',
          'Snowsight, SnowSQL, and connectors/drivers all expose the same SQL surface — they differ in workflow fit, not in what SQL you can run.',
          'Raw, Silver, and Gold schemas are a common, useful convention for organizing data by trust level, not just by topic.',
        ]}
      />
    </LearnLayout>
  )
}
