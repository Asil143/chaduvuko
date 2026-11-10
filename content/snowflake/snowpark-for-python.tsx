import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowparkForPython() {
  return (
    <LearnLayout
      title="Snowpark for Python"
      description="Build Snowflake data transformations in Python with Snowpark DataFrames, understand lazy execution, write results safely, and choose between notebooks, jobs, UDFs, and stored procedures."
      section="Snowflake — Lesson 18"
      readTime="40 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Snowpark for Python', href: '/learn/snowflake/snowpark-for-python' },
      ]}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Where Snowpark fits" />
        <SectionTitle>Write Python Transformations That Execute in Snowflake</SectionTitle>
        <Para><strong>Prerequisites:</strong> basic SQL, Python, Snowflake tables, and roles. <strong>Learning objective:</strong> build and persist a Snowpark transformation while explaining lazy execution, safe writes, and operational tradeoffs.</Para>
        <Para>
          Snowpark is Snowflake's developer API for working with data using familiar language constructs while
          Snowflake performs the computation. Snowpark for Python lets a data engineer build a DataFrame
          transformation in Python, compose filters and projections, and have the work compiled and executed
          by Snowflake rather than downloading a large table into a local Python process. The data still lives
          in Snowflake, and the warehouse still supplies compute for the query.
        </Para>
        <Para>
          This is not a replacement for learning SQL or an excuse to move every transformation into Python.
          SQL remains excellent for relational transformations and dbt remains a strong choice for versioned,
          testable SQL models. Snowpark is useful when Python libraries, reusable functions, procedural logic,
          or a Python-native developer workflow materially help. Start with the simplest tool that makes the
          transformation clear and operable.
        </Para>
        <HighlightBox><Para><strong>Mental model:</strong> Snowpark's DataFrame API describes a query plan. Transformations such as filter, select, and group_by build that plan; actions such as show, collect, or writing a table cause work to run. The DataFrame is not automatically a local pandas object.</Para></HighlightBox>
        <Callout title="The warehouse still matters">Snowpark code does not make compute free. A DataFrame action can scan many micro-partitions and consume warehouse resources. Apply selective filters early, inspect query history and profiles, and use an appropriately sized warehouse.</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — A safe session" />
        <SectionTitle>Connect Without Putting Credentials in Source</SectionTitle>
        <Para>
          A Snowpark Python Session holds the connection context used to submit work. In a deployed workload,
          prefer the platform's supported identity and secret-management mechanism. For a local script, read
          connection settings from environment variables or a protected profile; never commit passwords, private
          keys, or account secrets. The role and warehouse should have only the privileges and resources needed
          by the job.
        </Para>
        <CodeBox label="Python — create a local development session">{`import os
from snowflake.snowpark import Session

connection_parameters = {
    "account": os.environ["SNOWFLAKE_ACCOUNT"],
    "user": os.environ["SNOWFLAKE_USER"],
    "password": os.environ["SNOWFLAKE_PASSWORD"],
    "role": os.environ["SNOWFLAKE_ROLE"],
    "warehouse": os.environ["SNOWFLAKE_WAREHOUSE"],
    "database": os.environ["SNOWFLAKE_DATABASE"],
    "schema": os.environ["SNOWFLAKE_SCHEMA"],
}

session = Session.builder.configs(connection_parameters).create()
try:
    print(session.sql("SELECT CURRENT_WAREHOUSE()").collect())
finally:
    session.close()`}</CodeBox>
        <Para>
          This is a local-script pattern, not a universal authentication recipe. Workloads running inside
          Snowflake and managed orchestration environments have their own supported session and identity
          patterns. Configure those according to the current Snowpark and platform documentation rather than
          copying local password authentication into production.
        </Para>
        <Table headers={['Question', 'Why it matters', 'Good practice']} rows={[
          ['Which role?', 'The session can read and write only what its active role permits.', 'Use a dedicated least-privilege role.'],
          ['Which warehouse?', 'Every action submits work that consumes warehouse compute.', 'Choose a workload-specific warehouse and monitor it.'],
          ['Which environment?', 'Dev and production objects must not be mixed accidentally.', 'Use separate targets and explicit database/schema configuration.'],
          ['How are secrets handled?', 'Source code and notebooks are easily copied or shared.', 'Use protected environment configuration or managed secrets.'],
        ]} />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — DataFrames and lazy plans" />
        <SectionTitle>Transform Data Without Collecting It to Your Laptop</SectionTitle>
        <Para>
          A Snowpark DataFrame is a relational plan. Read a Snowflake table, filter it to paid orders, select
          the columns needed downstream, and aggregate revenue by customer. These transformations can be
          composed before execution. Calling collect on a large result transfers rows to the client and can
          exhaust client memory; for large outputs, persist results in Snowflake and inspect only a small sample.
        </Para>
        <CodeBox label="Python — compose a customer revenue query">{`from snowflake.snowpark.functions import col, sum as sf_sum

orders = session.table("RAW.ORDERS")
paid_orders = (
    orders
    .filter(col("STATUS") == "PAID")
    .select("CUSTOMER_ID", "ORDER_ID", "TOTAL_AMOUNT")
)
revenue_by_customer = (
    paid_orders
    .group_by("CUSTOMER_ID")
    .agg(sf_sum(col("TOTAL_AMOUNT")).alias("REVENUE"))
)

# Small preview: an action that executes the plan.
revenue_by_customer.sort(col("REVENUE").desc()).show(10)`}</CodeBox>
        <Para>
          The DataFrame API protects identifiers and composes expressions more safely than building SQL by
          concatenating user-provided strings. It does not remove the need to understand SQL semantics: null
          handling, numeric precision, grouping behavior, collation, and time zones still affect results.
          Inspect generated query history when performance or correctness is surprising.
        </Para>
        <Callout title="Transformations versus actions" color="#29b5e8">
          Operations such as select, filter, join, and group_by generally build a plan. Actions such as show,
          collect, count, and save_as_table execute work. Learn which calls trigger execution so a loop does not
          accidentally submit a new warehouse query for every row.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Join, validate, and persist" />
        <SectionTitle>Build a Repeatable Pipeline, Not a Notebook-Only Result</SectionTitle>
        <Para>
          Suppose an analytics team needs a customer-level paid-order summary. Join the aggregate to a customer
          dimension, keep only the fields needed by downstream users, and materialize an intermediate result.
          Overwrite is convenient for a controlled staging table, but it is not a general production upsert
          strategy. For incremental work, land a deterministic batch in staging and use a reviewed MERGE keyed
          by the business identifier and update watermark.
        </Para>
        <CodeBox label="Python — join a dimension and persist a staging result">{`customers = session.table("CORE.CUSTOMERS").select(
    "CUSTOMER_ID", "REGION", "IS_ACTIVE"
)

customer_summary = (
    revenue_by_customer
    .join(customers, on="CUSTOMER_ID", how="left")
    .select(
        col("CUSTOMER_ID"),
        col("REGION"),
        col("IS_ACTIVE"),
        col("REVENUE"),
    )
)

# A bounded development output. In production, write a controlled batch
# to a staging object, validate it, then MERGE into the durable target.
customer_summary.write.mode("overwrite").save_as_table(
    "ANALYTICS.WORK.STG_CUSTOMER_REVENUE"
)`}</CodeBox>
        <Table headers={['Pattern', 'Use it for', 'Watch out for']} rows={[
          ['Transient DataFrame plan', 'Composing a query in a task or application.', 'An action still consumes warehouse resources.'],
          ['Staging table', 'Inspecting and validating one bounded batch.', 'Set ownership, retention, and cleanup expectations.'],
          ['MERGE into target', 'Idempotent updates based on a business key.', 'Deduplicate source rows before MERGE.'],
          ['collect to Python', 'Small control results or bounded previews.', 'Never collect an unbounded analytics dataset.'],
        ]} />
        <Callout title="Make reruns safe">
          A pipeline should define what happens when the same input batch is processed twice. Use a stable key,
          deterministic source selection, and a tested MERGE or replaceable staging boundary. Appending the same
          customer totals on every retry silently doubles the result.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Python beyond DataFrames" />
        <SectionTitle>Use UDFs and Stored Procedures for the Right Kind of Logic</SectionTitle>
        <Para>
          Snowpark can also package Python logic as user-defined functions (UDFs) or stored procedures that
          execute in Snowflake's supported runtime. A UDF is a function applied to values in a query; a stored
          procedure is a callable unit that can orchestrate multiple statements or steps. They are useful when
          SQL expressions are awkward or when a Python library is needed, but introduce packaging, dependency,
          runtime-version, permissions, and observability concerns.
        </Para>
        <Para>
          Keep relational operations in DataFrame expressions where possible so Snowflake can optimize them.
          Avoid a Python UDF for logic expressible as a simple SQL expression unless measurement demonstrates
          a reason. Do not assume a package available on a developer laptop exists in the Snowflake runtime;
          verify supported packages and runtime versions before designing around them.
        </Para>
        <CodeBox label="SQL — call a registered Snowpark stored procedure">{`-- The procedure name and signature depend on your deployment.
-- Keep the handler, packages, runtime, and grants under version control.
CALL ANALYTICS.OPS.REBUILD_CUSTOMER_SUMMARY('2026-11-08');`}</CodeBox>
        <Para>
          Deploy procedures through reviewed migrations or CI, grant execute privileges to a narrowly scoped
          role, and record the input range and run identifier. For a long-running job, surface failures and
          metrics to the same operational monitoring used by the rest of the data platform.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Test, profile, and operate" />
        <SectionTitle>Correctness Includes Query Plans, Permissions, and Cost</SectionTitle>
        <Para>
          A trustworthy Snowpark pipeline validates its inputs and outputs. Test null and duplicate business
          keys, unexpected status values, zero-row batches, numeric boundaries, and late-arriving records. Use
          small fixtures for transformation logic and an isolated Snowflake environment for integration tests.
          Compare the output schema and row counts with the expected contract before promoting a change.
        </Para>
        <Para>
          When performance is poor, inspect the executed query and query profile: scans, joins, skew, spill,
          pruning, and warehouse queue time. A Python API is not inherently faster than SQL. Push selective
          filters early, avoid repeatedly materializing intermediate plans, and test with representative data
          volume. Keep expensive exploratory actions out of production schedules.
        </Para>
        <SubTitle>Common Mistakes</SubTitle>
        <BulletList items={[
          'Calling collect on an unbounded DataFrame and exhausting client memory; write large results to Snowflake instead.',
          'Appending the same batch on retries and silently double-counting; use deterministic staging and an idempotent MERGE.',
          'Assuming Python code is automatically faster or cheaper than SQL; inspect the executed query and warehouse usage.',
          'Using a local password-based connection pattern in production without checking the platform-supported identity flow.',
        ]} />
        <BulletList items={[
          'Pin the Snowpark package and runtime in the project environment; verify supported server-side packages before deployment.',
          'Use a non-production schema for tests and never let a unit test overwrite a durable target table.',
          'Track query IDs, batch boundaries, source freshness, and output row counts for each run.',
          'Review role grants and warehouse selection whenever a procedure or job is promoted.',
        ]} />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Practice and key takeaways" />
        <SubTitle>Practice: Create a Customer Revenue Pipeline</SubTitle>
        <Para>Use synthetic order and customer rows. Keep this exercise in a development database and make the result reproducible.</Para>
        <BulletList items={[
          'Build a Snowpark DataFrame that filters paid orders and computes revenue per customer.',
          'Join a customer table and explain how your code handles missing customer records.',
          'Write a bounded staging table, inspect its schema and sample rows, and then define a safe MERGE key.',
          'Add checks for duplicate order IDs, null customer IDs, negative totals, and an empty input batch.',
          'Compare the Snowpark plan with an equivalent SQL query using query history and profile evidence.',
        ]} />
        <KeyTakeaways items={[
          'Snowpark Python describes work that Snowflake executes; it is not the same as loading all data into local Python.',
          'DataFrame transformations compose a plan; actions trigger execution and warehouse usage.',
          'Collect only bounded results, and persist large outputs in Snowflake.',
          'Choose SQL, dbt, Snowpark, UDFs, and stored procedures based on the problem and operational tradeoffs.',
          'Safe pipelines need idempotent writes, least-privilege roles, tests, and query monitoring.',
        ]} />
      </section>
    </LearnLayout>
  )
}
