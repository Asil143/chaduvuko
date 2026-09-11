import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function StreamsAndTasks() {
  return (
    <LearnLayout
      title="Streams and Tasks"
      description="Change tracking, scheduled SQL, task graphs, incremental ELT, stream consumption, staleness, serverless tasks, monitoring, and production recovery patterns."
      section="Snowflake — Module 11"
      readTime="80 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Streams and Tasks', href: '/learn/snowflake/streams-and-tasks' },
      ]}
      prev={{ title: 'Snowpipe and Continuous Loading', href: '/learn/snowflake/snowpipe' }}
      next={{ title: 'Dynamic Tables', href: '/learn/snowflake/dynamic-tables' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Streams Track Changes; Tasks Run SQL on a Schedule</SectionTitle>
        <Para>
          Streams and tasks are Snowflake's native building blocks for incremental ELT. A stream tracks changes
          that happen to a table. A task runs SQL automatically on a schedule or after another task completes.
          Together, they let you build pipelines that process only new or changed data instead of rebuilding
          every table from scratch.
        </Para>
        <Para>
          The most common pattern is: raw table receives new rows, a stream tracks those new rows, a task wakes
          up, a MERGE consumes the stream, and the cleaned target table updates. This is powerful, but it also
          introduces operational responsibilities: streams can become stale, tasks can fail, and incremental
          logic must be idempotent.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> a stream is a change bookmark; a task is an automated
            SQL runner. A pipeline uses the bookmark to process changes on a schedule.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`RAW.ORDERS receives rows
      |
      v
RAW_ORDERS_STREAM tracks changes
      |
      v
MERGE_ORDERS_TASK runs every 5 minutes
      |
      v
SILVER.ORDERS updates incrementally
      |
      v
GOLD tasks update business marts`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why not rebuild everything?" />
        <SectionTitle>Incremental ELT Saves Time and Compute</SectionTitle>
        <Para>
          Full refresh is simple. For small tables, it may be the best choice. But as data grows, rebuilding
          every row every few minutes becomes slow and expensive. Incremental processing focuses on what
          changed. Streams and tasks give Snowflake-native support for that pattern.
        </Para>
        <Table
          headers={['Approach', 'How it works', 'Best for', 'Risk']}
          rows={[
            ['Full refresh', 'Rebuild whole table each run.', 'Small tables or simple daily models.', 'Wastes compute as data grows.'],
            ['Append only', 'Insert new rows based on watermark.', 'Immutable event data.', 'Duplicates if rerun logic is weak.'],
            ['Stream + task + MERGE', 'Track changes and merge into target.', 'Mutable incremental tables.', 'Stream staleness and bad merge logic.'],
            ['Dynamic table', 'Snowflake manages refresh from SELECT.', 'Declarative pipelines that fit limitations.', 'Refresh behavior/cost misunderstood.'],
          ]}
        />
        <Callout title="Do not overcomplicate small data">
          If a table has 10,000 rows and refreshes once per day, a full rebuild may be clearer and cheaper
          than an incremental stream/task design. Use streams and tasks when incremental complexity pays for
          itself.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Stream basics" />
        <SectionTitle>A Stream Records Change Metadata for a Table</SectionTitle>
        <Para>
          A stream does not simply store a second full copy of the source table. It tracks change information
          so a query can see rows inserted, updated, or deleted since the stream's current offset. When you
          consume the stream in DML, such as INSERT or MERGE, the stream advances.
        </Para>
        <CodeBox label="Create and inspect a stream">{`CREATE OR REPLACE TABLE RAW.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ
);

CREATE OR REPLACE STREAM RAW_ORDERS_STREAM
  ON TABLE RAW.ORDERS;

INSERT INTO RAW.ORDERS VALUES
  ('O-1', 'C-1', 'completed', 100.00, CURRENT_TIMESTAMP());

SELECT
  order_id,
  status,
  METADATA$ACTION,
  METADATA$ISUPDATE,
  METADATA$ROW_ID
FROM RAW_ORDERS_STREAM;`}
        </CodeBox>
        <Table
          headers={['Metadata column', 'Meaning', 'Why it matters']}
          rows={[
            ['METADATA$ACTION', 'INSERT or DELETE style change action.', 'Helps handle deletes and updates.'],
            ['METADATA$ISUPDATE', 'Whether change is part of an update.', 'Distinguishes updates from simple inserts/deletes.'],
            ['METADATA$ROW_ID', 'Stable row identifier for change tracking.', 'Useful for advanced debugging.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Consuming streams" />
        <SectionTitle>Streams Advance When Consumed by DML</SectionTitle>
        <Para>
          This is one of the most important details. Selecting from a stream lets you inspect changes, but DML
          statements such as INSERT, MERGE, or CREATE TABLE AS SELECT can consume the stream and advance it.
          If you accidentally consume a production stream during testing, the real pipeline may miss changes.
        </Para>
        <CodeBox label="Consume a stream into an audit table">{`CREATE OR REPLACE TABLE OPS.ORDER_CHANGE_AUDIT (
  order_id STRING,
  action STRING,
  is_update BOOLEAN,
  consumed_at TIMESTAMP_NTZ
);

INSERT INTO OPS.ORDER_CHANGE_AUDIT
SELECT
  order_id,
  METADATA$ACTION,
  METADATA$ISUPDATE,
  CURRENT_TIMESTAMP()
FROM RAW_ORDERS_STREAM;

-- After this DML commit, the stream offset advances.`}
        </CodeBox>
        <Callout title="Safe debugging habit" color="#ef4444">
          Do not run experimental INSERT AS SELECT or MERGE statements against a production stream. If you
          need to inspect, use SELECT carefully. For testing, create a separate stream on a cloned/test table.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Stream to MERGE" />
        <SectionTitle>The Most Common Pattern Is Stream Plus MERGE</SectionTitle>
        <Para>
          For mutable entities, a task can merge stream changes into a Silver table. This combines the
          incremental nature of streams with the upsert safety of MERGE. The merge still needs deduplication,
          stable keys, update freshness rules, and delete handling.
        </Para>
        <CodeBox label="Stream MERGE into Silver">{`CREATE OR REPLACE TABLE SILVER.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ,
  is_deleted BOOLEAN DEFAULT FALSE
);

MERGE INTO SILVER.ORDERS tgt
USING (
  SELECT *
  FROM RAW_ORDERS_STREAM
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id
    ORDER BY updated_at DESC
  ) = 1
) src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.METADATA$ACTION = 'DELETE' THEN UPDATE SET
  is_deleted = TRUE,
  updated_at = CURRENT_TIMESTAMP()
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at,
  is_deleted = FALSE
WHEN NOT MATCHED AND src.METADATA$ACTION <> 'DELETE' THEN INSERT (
  order_id, customer_id, status, total_usd, updated_at, is_deleted
) VALUES (
  src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at, FALSE
);`}
        </CodeBox>
        <Table
          headers={['Design choice', 'Why it matters']}
          rows={[
            ['Deduping stream input.', 'A target key may appear more than once in the change window.'],
            ['Update condition.', 'Prevents stale changes from overwriting newer target data.'],
            ['Delete handling.', 'Keeps target behavior explicit when source deletes rows.'],
            ['Idempotent target logic.', 'Protects replay and recovery operations.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Task basics" />
        <SectionTitle>Tasks Run SQL Automatically</SectionTitle>
        <Para>
          A task is a Snowflake object that runs SQL on a schedule or as part of a dependency graph. A task
          can run with a specified warehouse, or in serverless task mode depending on configuration and use
          case. Tasks are useful for running incremental merges, refreshing marts, updating audit tables, or
          calling stored procedures.
        </Para>
        <CodeBox label="Scheduled task">{`CREATE OR REPLACE TASK MERGE_ORDERS_TASK
  WAREHOUSE = WH_TRANSFORM_M
  SCHEDULE = '5 MINUTE'
AS
MERGE INTO SILVER.ORDERS tgt
USING (
  SELECT *
  FROM RAW_ORDERS_STREAM
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY order_id
    ORDER BY updated_at DESC
  ) = 1
) src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, total_usd, updated_at)
VALUES (src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at);

ALTER TASK MERGE_ORDERS_TASK RESUME;`}
        </CodeBox>
        <Callout title="Tasks start suspended">
          Creating a task is not always enough. Make sure the task is resumed when you intend it to run, and
          suspended when you are changing or debugging the pipeline.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Task schedules" />
        <SectionTitle>Schedule Tasks Based on Freshness Needs</SectionTitle>
        <Para>
          A task schedule should match the business freshness requirement and the cost of running the SQL.
          Running a heavy merge every minute is wasteful if the dashboard only needs hourly updates. Running
          a critical support queue once per day is too slow if agents need current data.
        </Para>
        <Table
          headers={['Schedule style', 'Example', 'Use when']}
          rows={[
            ['Fixed interval', "SCHEDULE = '5 MINUTE'.", 'Simple recurring pipelines.'],
            ['Cron schedule', 'USING CRON ...', 'Business-time schedules such as daily at 7 AM.'],
            ['After dependency', 'AFTER parent_task.', 'Task graph where downstream waits for upstream.'],
            ['Triggered by stream data check', 'WHEN SYSTEM$STREAM_HAS_DATA(...).', 'Avoid running when no stream changes exist.'],
          ]}
        />
        <CodeBox label="Run only when stream has data">{`CREATE OR REPLACE TASK MERGE_ORDERS_TASK
  WAREHOUSE = WH_TRANSFORM_M
  SCHEDULE = '5 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('RAW_ORDERS_STREAM')
AS
MERGE INTO SILVER.ORDERS tgt
USING RAW_ORDERS_STREAM src
  ON tgt.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET status = src.status, updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, total_usd, updated_at)
VALUES (src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at);`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Task graphs" />
        <SectionTitle>Task Graphs Chain Work in the Correct Order</SectionTitle>
        <Para>
          Many pipelines have dependencies. Load Raw first, then update Silver, then update Gold, then write
          freshness audit records. Task graphs let child tasks run after parent tasks succeed. This gives
          Snowflake a native orchestration pattern for SQL workflows.
        </Para>
        <CodeBox label="Task graph example">{`CREATE OR REPLACE TASK ROOT_PROCESS_RAW
  WAREHOUSE = WH_TRANSFORM_M
  SCHEDULE = '15 MINUTE'
AS
CALL OPS.PROCESS_RAW_BATCH();

CREATE OR REPLACE TASK MERGE_SILVER_ORDERS
  WAREHOUSE = WH_TRANSFORM_M
  AFTER ROOT_PROCESS_RAW
AS
CALL OPS.MERGE_SILVER_ORDERS();

CREATE OR REPLACE TASK BUILD_GOLD_REVENUE
  WAREHOUSE = WH_TRANSFORM_M
  AFTER MERGE_SILVER_ORDERS
AS
CREATE OR REPLACE TABLE GOLD.DAILY_REVENUE AS
SELECT DATE(order_ts) AS order_date, SUM(total_usd) AS revenue_usd
FROM SILVER.ORDERS
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

ALTER TASK ROOT_PROCESS_RAW RESUME;
ALTER TASK MERGE_SILVER_ORDERS RESUME;
ALTER TASK BUILD_GOLD_REVENUE RESUME;`}
        </CodeBox>
        <Table
          headers={['Graph shape', 'Good for', 'Risk']}
          rows={[
            ['Linear chain', 'Raw -> Silver -> Gold.', 'Easy to understand but can become slow.'],
            ['Fan-out', 'One Silver model feeds multiple Gold marts.', 'One upstream failure blocks many outputs.'],
            ['Fan-in', 'Gold waits for several upstream models.', 'Need clear dependency completion semantics.'],
            ['Stored procedure tasks', 'Multi-step logic in one call.', 'Logic can become hidden and hard to test.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Serverless vs warehouse tasks" />
        <SectionTitle>Tasks Need Compute: User-Managed or Serverless</SectionTitle>
        <Para>
          A task can use a named warehouse, which gives you explicit control over size, cost, and workload
          isolation. Snowflake also supports serverless task execution for eligible task patterns, where
          Snowflake manages compute sizing. The right choice depends on predictability, governance, and cost
          preferences.
        </Para>
        <Table
          headers={['Compute style', 'Benefit', 'Tradeoff']}
          rows={[
            ['Named warehouse', 'Explicit size, ownership, cost attribution, workload isolation.', 'You manage sizing and auto-suspend behavior.'],
            ['Serverless task', 'Snowflake manages compute for task runs.', 'Need to understand billing, limits, and operational visibility.'],
            ['Dedicated transform warehouse', 'Predictable transformations isolated from BI.', 'Can be wasteful if schedule is too frequent.'],
            ['Shared warehouse', 'Simple early setup.', 'Contention between pipelines and user queries.'],
          ]}
        />
        <Callout title="Production default">
          For learning, a named XS or S warehouse is easiest to reason about. In production, decide based on
          workload, cost attribution, platform standards, and operational requirements.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Stream staleness" />
        <SectionTitle>Streams Can Become Stale If Changes Are Not Consumed</SectionTitle>
        <Para>
          Streams depend on change information retained for the source table. If the stream is not consumed
          for too long, it can become stale. A stale stream cannot provide the needed change history, and the
          pipeline may require a full refresh or manual repair. This is one of the most important production
          risks of stream-based designs.
        </Para>
        <CodeBox label="Inspect stream status">{`SHOW STREAMS LIKE 'RAW_ORDERS_STREAM';

-- A common operational habit:
-- alert if a stream has not been consumed recently,
-- if task failures keep repeating,
-- or if the source retention window is close to being exceeded.`}
        </CodeBox>
        <Table
          headers={['Staleness cause', 'Impact', 'Recovery']}
          rows={[
            ['Task disabled too long.', 'Stream history expires.', 'Full refresh target or recreate stream after reconciliation.'],
            ['Repeated task failures.', 'Changes accumulate until retention risk.', 'Fix task, process backlog, monitor lag.'],
            ['Source table recreated unexpectedly.', 'Stream may no longer track expected object.', 'Recreate stream and rebuild downstream target.'],
            ['No monitoring.', 'Issue discovered after business reports stale data.', 'Add task and freshness alerts.'],
          ]}
        />
        <Callout title="Design for recovery">
          Any stream-based pipeline should have a full-refresh or backfill procedure. Incremental state will
          eventually fail somewhere; production design includes a way back.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Append-only streams" />
        <SectionTitle>Append-Only Streams Are Useful for Insert-Only Workloads</SectionTitle>
        <Para>
          Some source tables only receive inserts. For insert-only workloads, append-only stream behavior can
          be simpler and more efficient because you do not need update/delete semantics. This fits event
          tables, immutable logs, and raw landing tables where changes should not be updated in place.
        </Para>
        <CodeBox label="Append-only stream">{`CREATE OR REPLACE STREAM RAW_EVENTS_APPEND_STREAM
  ON TABLE RAW.EVENTS
  APPEND_ONLY = TRUE;

INSERT INTO SILVER.EVENTS_DEDUPED
SELECT
  event_id,
  event_type,
  occurred_at,
  payload,
  loaded_at
FROM RAW_EVENTS_APPEND_STREAM
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY event_id
  ORDER BY loaded_at DESC
) = 1;`}
        </CodeBox>
        <Table
          headers={['Use append-only when', 'Do not use it when']}
          rows={[
            ['Raw events are inserted and never updated/deleted.', 'Source updates or deletes records.'],
            ['You dedupe downstream by event_id.', 'You need to capture before/after update behavior.'],
            ['The table is an immutable landing log.', 'The table mirrors a mutable entity state.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Multi-table pipelines" />
        <SectionTitle>Build Incremental Pipelines One Boundary at a Time</SectionTitle>
        <Para>
          A common mistake is building a huge task that processes every table and every downstream mart.
          Better production designs keep boundaries clear: one task processes orders, another processes
          customers, another builds revenue after the required Silver models are complete.
        </Para>
        <CodeBox label="Boundary-oriented graph">{`RAW_ORDERS_STREAM      -> TASK_MERGE_SILVER_ORDERS
RAW_CUSTOMERS_STREAM   -> TASK_MERGE_SILVER_CUSTOMERS

TASK_MERGE_SILVER_ORDERS
TASK_MERGE_SILVER_CUSTOMERS
      -> TASK_BUILD_GOLD_CUSTOMER_REVENUE

TASK_BUILD_GOLD_CUSTOMER_REVENUE
      -> TASK_WRITE_FRESHNESS_AUDIT`}
        </CodeBox>
        <BulletList
          items={[
            'Keep each task small enough to debug.',
            'Name tasks after the object they update.',
            'Write audit records for important task outputs.',
            'Avoid hiding many unrelated transformations in one stored procedure.',
            'Make dependencies reflect data needs, not just convenience.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Monitoring tasks" />
        <SectionTitle>Task History Is Your First Debugging Tool</SectionTitle>
        <Para>
          A task pipeline must be monitored. It is not enough that the task exists. You need to know whether
          it ran, whether it succeeded, how long it took, what error occurred, and whether downstream data is
          fresh.
        </Para>
        <CodeBox label="Task monitoring queries">{`SELECT
  name,
  state,
  scheduled_time,
  completed_time,
  error_code,
  error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  SCHEDULED_TIME_RANGE_START => DATEADD(day, -1, CURRENT_TIMESTAMP())
))
ORDER BY scheduled_time DESC;

-- Freshness check after task graph
SELECT
  MAX(order_date) AS latest_order_date,
  DATEDIFF('hour', MAX(order_date), CURRENT_DATE()) AS hours_behind
FROM GOLD.DAILY_REVENUE;`}
        </CodeBox>
        <Table
          headers={['Signal', 'Healthy', 'Unhealthy']}
          rows={[
            ['Task state', 'Resumed when intended.', 'Suspended accidentally.'],
            ['Task history', 'Recent successful runs.', 'Repeated failures or skipped runs.'],
            ['Duration', 'Stable runtime.', 'Runtime spike or timeout.'],
            ['Freshness', 'Gold output inside SLA.', 'No fresh data despite successful task.'],
            ['Rows changed', 'Expected range.', 'Zero rows or huge unexpected changes.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Alerting" />
        <SectionTitle>Alert on Business Impact, Not Just SQL Failure</SectionTitle>
        <Para>
          A task can succeed and still produce bad business results. For example, a Gold revenue task might
          run successfully but output zero rows because upstream data was missing. Alerting should include
          task failures, but also freshness, volume, and quality checks.
        </Para>
        <CodeBox label="Quality alert query examples">{`-- Stale Gold table
SELECT 'GOLD.DAILY_REVENUE is stale' AS alert
WHERE (
  SELECT MAX(order_date)
  FROM GOLD.DAILY_REVENUE
) < CURRENT_DATE() - 1;

-- Suspicious zero revenue
SELECT 'Revenue is zero for latest day' AS alert
WHERE EXISTS (
  SELECT 1
  FROM GOLD.DAILY_REVENUE
  WHERE order_date = CURRENT_DATE() - 1
    AND revenue_usd = 0
);`}
        </CodeBox>
        <Callout title="Alert quality">
          A good alert has an owner, a runbook, and a clear user impact. An alert nobody acts on is just noise.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Recovery patterns" />
        <SectionTitle>Know How to Recover When Incremental State Breaks</SectionTitle>
        <Para>
          Stream/task pipelines can fail in ways that require more than rerunning the last SQL statement.
          The stream may become stale. A merge may write incorrect values. A task may be suspended for days.
          Recovery plans should be written before production incidents.
        </Para>
        <Table
          headers={['Failure', 'Recovery option', 'Tradeoff']}
          rows={[
            ['Task failed once.', 'Fix issue and resume/rerun task.', 'Simple if stream is still valid.'],
            ['Task failed for days.', 'Process backlog or full refresh target.', 'Need staleness and retention checks.'],
            ['Bad merge changed target.', 'Time Travel restore or targeted repair.', 'Must avoid undoing legitimate later changes.'],
            ['Stream stale.', 'Recreate stream and rebuild downstream table.', 'More compute but restores correctness.'],
            ['Wrong dependency graph.', 'Suspend tasks, fix graph, backfill affected outputs.', 'Requires careful communication.'],
          ]}
        />
        <CodeBox label="Full-refresh fallback pattern">{`-- Rebuild target from source of truth when stream state is unusable.
CREATE OR REPLACE TABLE SILVER.ORDERS AS
SELECT
  order_id,
  customer_id,
  status,
  total_usd,
  updated_at
FROM RAW.ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC
) = 1;

-- Recreate stream after target/source reconciliation if needed.
CREATE OR REPLACE STREAM RAW_ORDERS_STREAM ON TABLE RAW.ORDERS;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Cost and performance" />
        <SectionTitle>Small Frequent Tasks Can Waste Compute</SectionTitle>
        <Para>
          Incremental pipelines are not automatically cheap. A task that wakes up every minute, starts a
          warehouse, finds no data, and shuts down can waste money. A merge that scans too much target data
          can become expensive. Use stream data checks, appropriate schedules, clustering where justified, and
          workload-specific warehouses.
        </Para>
        <BulletList
          items={[
            'Use WHEN SYSTEM$STREAM_HAS_DATA when a task should run only with changes.',
            'Choose a schedule based on freshness requirements, not excitement.',
            'Use Query Profile to inspect heavy MERGE statements.',
            'Avoid one shared warehouse where BI and tasks fight each other.',
            'Track task runtimes and warehouse credits over time.',
          ]}
        />
        <CodeBox label="Task cost investigation">{`SELECT
  warehouse_name,
  COUNT(*) AS query_count,
  SUM(total_elapsed_time) / 1000 AS total_seconds
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
  AND query_text ILIKE '%MERGE INTO SILVER.ORDERS%'
GROUP BY warehouse_name
ORDER BY total_seconds DESC;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Anti-patterns" />
        <SectionTitle>Streams and Tasks Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Creating streams and tasks for tiny tables where full refresh would be clearer.',
              'Forgetting to resume tasks and wondering why data is stale.',
              'Leaving failed tasks unnoticed until a business user complains.',
              'Testing DML against a production stream and accidentally consuming it.',
              'Ignoring stream staleness risk.',
              'Running tasks every minute with no data-change check.',
              'Using one huge task for unrelated transformations.',
              'Building incremental logic with no full-refresh recovery path.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Stream Raw Orders Into Silver</SectionTitle>
        <Para>
          This lab gives you the core pattern: create a raw table, create a stream, insert changes, create a
          merge task, run it, and inspect the target.
        </Para>
        <CodeBox label="Lab setup">{`CREATE OR REPLACE DATABASE STREAM_TASK_LAB;
CREATE OR REPLACE SCHEMA STREAM_TASK_LAB.RAW;
CREATE OR REPLACE SCHEMA STREAM_TASK_LAB.SILVER;

CREATE OR REPLACE TABLE STREAM_TASK_LAB.RAW.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ
);

CREATE OR REPLACE STREAM STREAM_TASK_LAB.RAW.ORDERS_STREAM
  ON TABLE STREAM_TASK_LAB.RAW.ORDERS;

CREATE OR REPLACE TABLE STREAM_TASK_LAB.SILVER.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ
);

INSERT INTO STREAM_TASK_LAB.RAW.ORDERS VALUES
  ('O-1', 'C-1', 'completed', 100.00, CURRENT_TIMESTAMP()),
  ('O-2', 'C-2', 'pending', 50.00, CURRENT_TIMESTAMP());`}
        </CodeBox>
        <CodeBox label="Lab merge and task">{`MERGE INTO STREAM_TASK_LAB.SILVER.ORDERS tgt
USING STREAM_TASK_LAB.RAW.ORDERS_STREAM src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, total_usd, updated_at)
VALUES (src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at);

SELECT * FROM STREAM_TASK_LAB.SILVER.ORDERS ORDER BY order_id;

-- In production, wrap the MERGE in a task and monitor TASK_HISTORY.`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'What rows appear in the stream before the MERGE?',
            'What rows appear in the stream after the MERGE consumes it?',
            'How would you handle an update to O-2?',
            'How would you detect the task stopped running?',
            'What full-refresh query would rebuild SILVER.ORDERS if stream state broke?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Interview answer" />
        <SectionTitle>How to Explain Streams and Tasks in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake streams track changes on a table, including metadata
          about inserts, deletes, and updates. Tasks run SQL on a schedule or as part of a dependency graph.
          Together they are commonly used for incremental ELT, such as merging new raw records into Silver
          and then building Gold marts. I would design the MERGE to be idempotent, dedupe stream input, handle
          deletes, monitor task history and table freshness, use stream data checks to avoid unnecessary runs,
          and keep a full-refresh recovery path in case a stream becomes stale or incremental state breaks.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What does a Snowflake stream track?',
            'When does a stream advance?',
            'What is a Snowflake task?',
            'How do task graphs work?',
            'What does stream staleness mean?',
            'How would you monitor a stream/task pipeline?',
            'How would you recover if stream state became unusable?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Streams track table changes; tasks run SQL automatically.',
          'Streams are commonly consumed by MERGE statements for incremental ELT.',
          'DML consumption advances a stream, so production streams must be handled carefully.',
          'Task graphs model dependencies between transformation steps.',
          'Stream staleness and task failures are real production risks.',
          'Monitoring must include task history, freshness, row counts, and business-quality checks.',
          'Every incremental stream/task design needs a full-refresh or backfill recovery path.',
        ]}
      />
    </LearnLayout>
  )
}
