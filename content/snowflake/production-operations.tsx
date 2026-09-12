import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function ProductionOperations() {
  return (
    <LearnLayout
      title="Production Operations and Monitoring"
      description="ACCOUNT_USAGE views, INFORMATION_SCHEMA latency tradeoffs, native alerting, operational dashboards, incident response, runbooks, and freshness/latency SLOs for a Snowflake platform."
      section="Snowflake — Module 18"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Production Operations and Monitoring', href: '/learn/snowflake/production-operations' },
      ]}
      prev={{ title: 'Snowflake with dbt', href: '/learn/snowflake/snowflake-with-dbt' }}
      next={{ title: 'End-to-End Snowflake Project', href: '/learn/snowflake/snowflake-project' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Operations Is What Happens After the Pipeline "Works"</SectionTitle>
        <Para>
          Every earlier module in this track was about building something: loading data, transforming it,
          securing it, tuning it. Production operations is about a different question: how do you know, at
          3 AM on a Tuesday, whether all of that is still working? A pipeline that ran correctly once is not
          the same thing as a pipeline that is reliable. Reliability requires visibility into what happened,
          alerting when something goes wrong, a documented way to respond, and agreed targets for what "on
          time" and "correct" actually mean.
        </Para>
        <Para>
          Snowflake gives you the raw material for all of this inside the account itself. You do not need an
          external observability platform to get started: account-level metadata views record query
          execution, task runs, load results, logins, and credit consumption. Operations is the discipline of
          turning that metadata into dashboards, alerts, and runbooks that a team can actually operate against.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> production operations means monitoring what Snowflake
            actually did (not just whether it is reachable), alerting on business-meaningful failures, and
            having a written plan for what to do when something breaks.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — ACCOUNT_USAGE, the operational source of truth" />
        <SectionTitle>SNOWFLAKE.ACCOUNT_USAGE Holds the History You Need</SectionTitle>
        <Para>
          The <code>SNOWFLAKE</code> shared database exposes an <code>ACCOUNT_USAGE</code> schema with views
          covering nearly everything that happens in the account. These are the views you build dashboards
          and alerts on top of, because they hold history far beyond what a single session can see.
        </Para>
        <Table
          headers={['View', 'What it tracks', 'Typical operational use']}
          rows={[
            ['QUERY_HISTORY', 'Every query executed in the account: text, user, warehouse, status, duration, bytes scanned, spillage.', 'Find failed, slow, or expensive queries; debug a specific incident by query_id.'],
            ['TASK_HISTORY', 'Every scheduled task run: state, scheduled time, completed time, error code/message, graph run id.', 'Detect failed or skipped task runs; measure task graph latency.'],
            ['COPY_HISTORY', 'Every COPY INTO load: file name, status, rows loaded, rows parsed, error records.', 'Detect failed or partially-rejected loads from a stage or pipe.'],
            ['LOGIN_HISTORY', 'Every login attempt: user, client, IP, success/failure, error code.', 'Security monitoring, failed-login spikes, unexpected client or location.'],
            ['WAREHOUSE_METERING_HISTORY', 'Credits consumed per warehouse per hour, split into compute and cloud services.', 'Cost trend analysis, spend spikes, warehouse right-sizing.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The latency tradeoff you must know" />
        <SectionTitle>ACCOUNT_USAGE Is Not Real Time — INFORMATION_SCHEMA Is</SectionTitle>
        <Para>
          This is one of the most important operational facts in Snowflake, and it catches people off guard
          in production. <code>ACCOUNT_USAGE</code> views are backed by internal metadata pipelines that are
          <strong> not instantaneous</strong>. Depending on the view, data can take anywhere from roughly 45
          minutes up to about 3 hours to appear. If you alert on <code>ACCOUNT_USAGE.TASK_HISTORY</code>{' '}
          expecting to catch a failed task within a minute, you will not: the failure may not be visible in
          the view for a while.
        </Para>
        <Para>
          The near-real-time alternative is the <code>INFORMATION_SCHEMA</code> table functions, such as{' '}
          <code>INFORMATION_SCHEMA.TASK_HISTORY()</code> and <code>INFORMATION_SCHEMA.QUERY_HISTORY()</code>.
          These reflect activity almost immediately, but trade that freshness for a short retention window —
          typically 7 to 14 days depending on the function — versus the much longer history retained in{' '}
          <code>ACCOUNT_USAGE</code> (often a year or more for many views).
        </Para>
        <Table
          headers={['Property', 'ACCOUNT_USAGE.*', 'INFORMATION_SCHEMA.*() table functions']}
          rows={[
            ['Latency', 'Up to ~45 minutes to 3 hours behind real time.', 'Near real time (seconds to low minutes).'],
            ['Retention', 'Long — often a year or more.', 'Short — typically 7 to 14 days.'],
            ['Scope', 'Account-wide, cross-database.', 'Often requires being in the right database/session context or explicit function args.'],
            ['Best for', 'Trend dashboards, historical audits, cost analysis.', 'Real-time incident triage, "is it running right now" checks.'],
          ]}
        />
        <Callout title="The operational rule that follows from this" color="#ef4444">
          Use <code>INFORMATION_SCHEMA</code> functions for the alert that needs to fire quickly — a task
          that just failed, a load that just rejected rows. Use <code>ACCOUNT_USAGE</code> views for anything
          that looks backward over days or weeks: cost trend, historical failure rate, monthly SLA reporting.
          Mixing them up either delays your alerts by hours or silently loses history past two weeks.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Native alerting with CREATE ALERT" />
        <SectionTitle>CREATE ALERT Runs a Condition on a Schedule and Fires an Action</SectionTitle>
        <Para>
          Snowflake has a native alerting object: <code>CREATE ALERT</code>. An alert bundles three things —
          a warehouse to run on, a schedule, a condition query, and an action to take when the condition
          query returns at least one row. The action is usually a <code>CALL SYSTEM$SEND_EMAIL(...)</code> or
          a call to a stored procedure that writes to an incident table or calls an external webhook via an
          external function.
        </Para>
        <CodeBox label="A task-failure alert using INFORMATION_SCHEMA for freshness">{`CREATE OR REPLACE ALERT OPS.TASK_FAILURE_ALERT
  WAREHOUSE = WH_OPS_XS
  SCHEDULE = '5 MINUTE'
  IF (
    EXISTS (
      SELECT 1
      FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
        SCHEDULED_TIME_RANGE_START => DATEADD('minute', -30, CURRENT_TIMESTAMP())
      ))
      WHERE state = 'FAILED'
    )
  )
  THEN
    CALL SYSTEM$SEND_EMAIL(
      'ops_notification_integration',
      'data-oncall@company.com',
      'Snowflake task failure detected',
      'A task failed in the last 30 minutes. Check TASK_HISTORY for details.'
    );

ALTER ALERT OPS.TASK_FAILURE_ALERT RESUME;`}
        </CodeBox>
        <Callout title="Alerts start suspended, same as tasks">
          Creating an alert does not activate it. Like tasks, alerts are created suspended and must be
          resumed with <code>ALTER ALERT ... RESUME</code>. This is a common reason "the alert never fired" —
          it was never running.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Freshness and cost alerts" />
        <SectionTitle>Alert on Data Freshness and Credit Burn, Not Just SQL Errors</SectionTitle>
        <Para>
          A task can succeed and still leave the business with stale or wrong data. The most useful alerts
          check the actual state of the data, not just whether the last SQL statement returned an error.
        </Para>
        <CodeBox label="Freshness and cost alert conditions">{`-- Freshness: Gold table has not advanced in 2 hours
CREATE OR REPLACE ALERT OPS.GOLD_FRESHNESS_ALERT
  WAREHOUSE = WH_OPS_XS
  SCHEDULE = '15 MINUTE'
  IF (
    EXISTS (
      SELECT 1
      FROM (
        SELECT MAX(order_date) AS latest_order_date
        FROM GOLD.DAILY_REVENUE
      )
      WHERE latest_order_date < DATEADD('hour', -2, CURRENT_TIMESTAMP())
    )
  )
  THEN
    CALL OPS.NOTIFY_ONCALL('GOLD.DAILY_REVENUE freshness SLO breached');

-- Cost: warehouse burned more than 50 credits in the last hour
CREATE OR REPLACE ALERT OPS.CREDIT_BURN_ALERT
  WAREHOUSE = WH_OPS_XS
  SCHEDULE = '60 MINUTE'
  IF (
    EXISTS (
      SELECT warehouse_name, SUM(credits_used) AS credits_last_hour
      FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
      WHERE start_time >= DATEADD('hour', -1, CURRENT_TIMESTAMP())
      GROUP BY warehouse_name
      HAVING SUM(credits_used) > 50
    )
  )
  THEN
    CALL OPS.NOTIFY_ONCALL('Warehouse credit burn exceeded threshold');`}
        </CodeBox>
        <Callout title="ACCOUNT_USAGE latency applies to alerts too">
          The credit-burn alert above uses <code>WAREHOUSE_METERING_HISTORY</code>, which is an{' '}
          <code>ACCOUNT_USAGE</code> view. Because of its latency, this alert reacts to spend from up to a
          few hours ago, not the last five minutes. That is acceptable for a cost guardrail, but it would be
          the wrong choice for an alert that needs to catch a runaway query while it is still running.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Building an operational dashboard" />
        <SectionTitle>Four Panels Cover Most of What On-Call Needs</SectionTitle>
        <Para>
          You do not need a large observability platform to get useful visibility. A dashboard with four
          panels, built directly on <code>ACCOUNT_USAGE</code> views, covers the majority of day-to-day
          operational questions: is anything failing, is anything late, is anything slow, and is anything
          expensive.
        </Para>
        <CodeBox label="Query success rate by warehouse (last 24h)">{`SELECT
  warehouse_name,
  COUNT(*) AS total_queries,
  SUM(IFF(execution_status = 'FAIL', 1, 0)) AS failed_queries,
  ROUND(100.0 * SUM(IFF(execution_status = 'SUCCESS', 1, 0)) / COUNT(*), 2) AS success_rate_pct
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD('day', -1, CURRENT_TIMESTAMP())
GROUP BY warehouse_name
ORDER BY success_rate_pct ASC;`}
        </CodeBox>
        <CodeBox label="Task failure rate (last 7 days)">{`SELECT
  name AS task_name,
  COUNT(*) AS total_runs,
  SUM(IFF(state = 'FAILED', 1, 0)) AS failed_runs,
  ROUND(100.0 * SUM(IFF(state = 'FAILED', 1, 0)) / COUNT(*), 2) AS failure_rate_pct
FROM SNOWFLAKE.ACCOUNT_USAGE.TASK_HISTORY
WHERE scheduled_time >= DATEADD('day', -7, CURRENT_TIMESTAMP())
GROUP BY name
ORDER BY failure_rate_pct DESC;`}
        </CodeBox>
        <CodeBox label="Data freshness per Gold table">{`SELECT 'GOLD.DAILY_REVENUE' AS table_name, MAX(order_date) AS latest_data,
  DATEDIFF('hour', MAX(order_date), CURRENT_TIMESTAMP()) AS hours_behind
FROM GOLD.DAILY_REVENUE
UNION ALL
SELECT 'GOLD.CUSTOMER_LTV', MAX(updated_at),
  DATEDIFF('hour', MAX(updated_at), CURRENT_TIMESTAMP())
FROM GOLD.CUSTOMER_LTV;`}
        </CodeBox>
        <CodeBox label="Credit burn trend by warehouse (last 30 days)">{`SELECT
  DATE_TRUNC('day', start_time) AS usage_date,
  warehouse_name,
  SUM(credits_used) AS credits_used
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD('day', -30, CURRENT_TIMESTAMP())
GROUP BY 1, 2
ORDER BY 1 DESC, credits_used DESC;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Incident: failed COPY INTO load" />
        <SectionTitle>Incident Response — A COPY INTO Load Failed or Rejected Rows</SectionTitle>
        <Para>
          A failed or partial load is one of the most common production incidents. The file arrived, but
          some or all of its rows did not make it into the target table. The first job is to find out which
          files and which rows, without guessing.
        </Para>
        <CodeBox label="Triage a failed load">{`-- Recent load status for a stage
SELECT
  file_name,
  status,
  row_count,
  row_parsed,
  error_count,
  first_error_message,
  last_load_time
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'RAW.ORDERS',
  START_TIME => DATEADD('hour', -6, CURRENT_TIMESTAMP())
))
ORDER BY last_load_time DESC;`}
        </CodeBox>
        <BulletList
          items={[
            'Identify exact file(s) and error_count from COPY_HISTORY — do not assume it is "the whole load".',
            'Read first_error_message; most failures are a schema mismatch, bad delimiter, or malformed JSON row.',
            'Re-run COPY INTO with VALIDATION_MODE = RETURN_ERRORS to see every rejected row without loading anything.',
            'Fix the file or the file format, then reload with COPY INTO — Snowflake will not double-load a file it already loaded successfully unless FORCE = TRUE is set.',
            'If the pipe is a Snowpipe, check PIPE_STATUS and pipe error notifications, not just COPY_HISTORY.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Incident: stuck or failed task in a graph" />
        <SectionTitle>Incident Response — A Task Graph Is Stuck or a Downstream Task Never Ran</SectionTitle>
        <Para>
          In a task graph, a downstream task depending on <code>AFTER parent_task</code> will simply never
          run if the parent fails or if the parent's <code>WHEN SYSTEM$STREAM_HAS_DATA(...)</code> condition
          evaluated false. From the outside this looks identical to "nothing happened," so the debugging path
          has to walk the graph, not just check the last task.
        </Para>
        <CodeBox label="Walk a task graph after an incident report">{`-- Root cause: check every task in the graph, not just the one that "didn't run"
SELECT name, state, scheduled_time, completed_time, error_message, graph_run_group_id
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  SCHEDULED_TIME_RANGE_START => DATEADD('hour', -12, CURRENT_TIMESTAMP())
))
ORDER BY scheduled_time DESC;

-- Confirm current suspend/resume state of every task in the graph
SHOW TASKS IN SCHEMA OPS;`}
        </CodeBox>
        <Table
          headers={['Symptom', 'Likely cause', 'Fix']}
          rows={[
            ['Downstream task never appears in history.', 'Parent task suspended or failed before it.', 'Check parent state; RESUME and fix parent first.'],
            ['Task shows SKIPPED.', 'WHEN condition evaluated false (e.g. no stream data).', 'Usually correct behavior — confirm upstream actually produced changes.'],
            ['Task runs but graph run never completes.', 'A middle task in a fan-in is still suspended.', 'SHOW TASKS across the whole schema, not just the ones you remember.'],
            ['Task fails every run with the same error.', 'A schema drift or a stale object reference in the SQL body.', 'Fix the task body SQL and manually EXECUTE TASK to validate before resuming schedule.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Incident: slow or spilling query" />
        <SectionTitle>Incident Response — A Query Times Out or Spills to Disk</SectionTitle>
        <Para>
          A query that used to run fine can suddenly slow down as data grows, or fail intermittently under
          concurrency. <code>QUERY_HISTORY</code> tracks the signals that explain why: bytes scanned, bytes
          spilled to local or remote storage, and queuing time waiting for warehouse capacity.
        </Para>
        <CodeBox label="Diagnose a slow query from history">{`SELECT
  query_id,
  warehouse_name,
  warehouse_size,
  total_elapsed_time / 1000 AS elapsed_seconds,
  bytes_scanned,
  bytes_spilled_to_local_storage,
  bytes_spilled_to_remote_storage,
  queued_provisioning_time,
  queued_overload_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE query_id = '01b2c3d4-...';`}
        </CodeBox>
        <Table
          headers={['Signal', 'What it means', 'Common fix']}
          rows={[
            ['bytes_spilled_to_remote_storage > 0', 'Warehouse ran out of memory and local disk; spilled to remote storage — the slowest tier.', 'Increase warehouse size, or reduce data volume with better filtering/clustering.'],
            ['queued_overload_time high', 'Warehouse was saturated with concurrent queries.', 'Add a multi-cluster warehouse or route the workload to a dedicated warehouse.'],
            ['bytes_scanned very high relative to result size', 'Query is scanning far more data than it needs.', 'Add filters on a clustered column, or review whether a clustering key is needed.'],
            ['Consistent timeout at same runtime', 'STATEMENT_TIMEOUT_IN_SECONDS or similar limit being hit.', 'Confirm the limit is intentional; optimize the query rather than only raising the timeout.'],
          ]}
        />
        <Callout title="Use Query Profile before changing warehouse size">
          Bumping warehouse size fixes some slow queries but not all of them — a query with a bad join order
          or a missing filter will just do the same wasteful work faster and more expensively. Check Query
          Profile for the actual bottleneck before reaching for a bigger warehouse.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Incident: masking policy blocking legitimate access" />
        <SectionTitle>Incident Response — A Masking Policy Is Blocking Access It Should Allow</SectionTitle>
        <Para>
          A masking policy that is too broad, or a role hierarchy change that removed a grant, can suddenly
          mask data for a user who legitimately needs it. This shows up as "the report used to show emails,
          now it shows asterisks" rather than as a hard error, which makes it easy to miss until a business
          user reports it.
        </Para>
        <CodeBox label="Diagnose a masking policy incident">{`-- Confirm which policy is attached to the column
SELECT *
FROM TABLE(INFORMATION_SCHEMA.POLICY_REFERENCES(
  REF_ENTITY_NAME => 'SILVER.CUSTOMERS', REF_ENTITY_DOMAIN => 'TABLE'
));

-- Confirm the affected user's current role and whether that role
-- is included in the policy's unmasking condition
SELECT CURRENT_ROLE();
SHOW GRANTS TO USER affected_user;

-- Inspect the policy body itself
SELECT policy_name, policy_body
FROM TABLE(INFORMATION_SCHEMA.POLICY_REFERENCES(REF_ENTITY_NAME => 'SILVER.CUSTOMERS', REF_ENTITY_DOMAIN => 'TABLE'));`}
        </CodeBox>
        <BulletList
          items={[
            'Confirm the user is querying with the role you expect — a session using the wrong role is the single most common cause.',
            'Check whether the masking policy condition references a role that was recently renamed or restructured.',
            'Never "fix" this by loosening the policy account-wide; grant the specific role the specific exception the policy already supports.',
            'Document the resolution — masking incidents often reveal a role hierarchy gap that will recur elsewhere.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Runbook structure" />
        <SectionTitle>A Runbook Turns "Someone Who Knows" Into "Anyone On-Call"</SectionTitle>
        <Para>
          A runbook is a short, specific document written before an incident, not during one. Its purpose is
          to let whoever is on call — not necessarily the person who built the pipeline — respond
          effectively. A good Snowflake runbook entry follows a consistent shape.
        </Para>
        <Table
          headers={['Runbook section', 'What it contains']}
          rows={[
            ['Alert name and trigger condition', 'The exact alert, its schedule, and what it means when it fires.'],
            ['Business impact', 'What breaks for whom if this is not fixed — a dashboard is stale, a report is wrong, a downstream job will fail.'],
            ['First diagnostic queries', 'Copy-pasteable SQL against QUERY_HISTORY / TASK_HISTORY / COPY_HISTORY to confirm scope.'],
            ['Safe remediation steps', 'What is safe to do without further approval (resume a task, reload a file) vs. what needs a second person (Time Travel restore, policy change).'],
            ['Escalation path', 'Who to page if the on-call engineer cannot resolve it within an agreed window.'],
            ['Postmortem trigger', 'What severity/duration requires a written postmortem afterward.'],
          ]}
        />
        <CodeBox label="Example runbook entry (condensed)">{`ALERT: OPS.GOLD_FRESHNESS_ALERT
TRIGGER: GOLD.DAILY_REVENUE has not advanced in 2+ hours.
IMPACT: Executive revenue dashboard shows stale data; finance daily close blocked.

STEP 1 — Confirm scope:
  SELECT MAX(order_date) FROM GOLD.DAILY_REVENUE;
  SELECT * FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(...)) WHERE name = 'BUILD_GOLD_REVENUE';

STEP 2 — If task failed: read error_message, fix root cause, EXECUTE TASK BUILD_GOLD_REVENUE manually.
STEP 3 — If task suspended: ALTER TASK BUILD_GOLD_REVENUE RESUME; then EXECUTE TASK to backfill immediately.
STEP 4 — If upstream stream is stale: escalate — do not attempt stream recreation without a second engineer.

ESCALATE TO: data-platform-lead if unresolved after 30 minutes.
POSTMORTEM REQUIRED IF: freshness breach exceeded 4 hours or recurred twice in 7 days.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Freshness SLOs by table tier" />
        <SectionTitle>Not Every Table Needs the Same Freshness Target</SectionTitle>
        <Para>
          Defining an SLO (service level objective) per table tier keeps alerting proportionate. A finance
          revenue mart that feeds an executive dashboard needs a tight freshness target. An internal
          exploratory table used for ad hoc analysis does not, and alerting on it as if it did just creates
          noise the team learns to ignore.
        </Para>
        <Table
          headers={['Tier', 'Example table', 'Freshness SLO', 'Alert response time']}
          rows={[
            ['Tier 1 — business critical', 'GOLD.DAILY_REVENUE, GOLD.SHIPPING_SLA', '< 1 hour behind source.', 'Page on-call immediately.'],
            ['Tier 2 — operational', 'SILVER.ORDERS, SILVER.CUSTOMERS', '< 4 hours behind source.', 'Ticket + business-hours response.'],
            ['Tier 3 — analytical/exploratory', 'SANDBOX.* tables, ad hoc marts', 'Best effort, no formal SLO.', 'No paging; reviewed weekly if at all.'],
          ]}
        />
        <Callout title="Write the tier down, not just the number">
          The number alone ("1 hour") is not enough — teams need to know which tables are Tier 1 so they do
          not accidentally build a new executive dashboard on a Tier 3 table with no freshness guarantee at
          all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Latency SLOs per workload" />
        <SectionTitle>Query Latency SLOs Should Be Set Per Workload, Not Per Account</SectionTitle>
        <Para>
          "Snowflake should be fast" is not an SLO. Different workloads have entirely different acceptable
          latencies: an interactive BI dashboard needs sub-second to low-second response, while a nightly
          batch transformation can reasonably take twenty minutes. Setting one latency target for the whole
          account either over-promises on batch or over-invests in BI.
        </Para>
        <Table
          headers={['Workload', 'Latency SLO', 'How it is enforced']}
          rows={[
            ['Interactive BI dashboard', 'p95 query time < 3 seconds.', 'Dedicated warehouse, materialized/aggregated Gold tables, result caching.'],
            ['Ad hoc analyst query', 'p95 query time < 30 seconds.', 'Right-sized warehouse, clustering on large fact tables.'],
            ['Incremental ELT task (stream+task)', 'Task completes within its scheduled interval.', 'TASK_HISTORY monitoring, SYSTEM$STREAM_HAS_DATA gating.'],
            ['Nightly batch model build', 'Completes before the business day starts.', 'Task graph dependency ordering, resource monitor headroom.'],
          ]}
        />
        <CodeBox label="Measuring p95 latency per warehouse">{`SELECT
  warehouse_name,
  APPROX_PERCENTILE(total_elapsed_time, 0.95) / 1000 AS p95_seconds
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD('day', -7, CURRENT_TIMESTAMP())
  AND warehouse_name = 'WH_BI_S'
GROUP BY warehouse_name;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Worked incident postmortem" />
        <SectionTitle>A Full Incident, Start to Finish: The Task Graph That Stopped for Six Hours</SectionTitle>
        <Para>
          The earlier incident-response Parts each cover one symptom in isolation. Real incidents rarely stay
          that tidy — they usually start as a vague complaint and only resolve into a root cause after a few
          wrong turns. Walking through one complete incident end to end, the way it actually happened, is more
          useful than any single diagnostic query on its own.
        </Para>
        <SubTitle>Detection</SubTitle>
        <Para>
          At 9:14 AM, a finance analyst messages that the executive revenue dashboard is showing yesterday's
          numbers. Nobody had paged on-call — <code>OPS.GOLD_FRESHNESS_ALERT</code> from Part 05 should have
          caught this, but it had not fired. That absence turned out to be the first real clue, not a lucky
          break: an alert that should have fired and did not usually means the alert itself is broken, not
          that everything is fine.
        </Para>
        <CodeBox label="Step 1 — confirm the business complaint against the data">{`SELECT MAX(order_date) AS latest_data, CURRENT_TIMESTAMP() AS checked_at
FROM GOLD.DAILY_REVENUE;

-- Result: latest_data was 2026-08-13 15:00, roughly 18 hours behind. Confirmed real.`}
        </CodeBox>
        <SubTitle>Diagnosis</SubTitle>
        <Para>
          With the staleness confirmed, the next step is walking the task graph, exactly as in Part 08 —
          checking every task in the chain rather than assuming the last one in the chain is the problem.
        </Para>
        <CodeBox label="Step 2 — walk the whole graph">{`SELECT name, state, scheduled_time, completed_time, error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  SCHEDULED_TIME_RANGE_START => DATEADD('hour', -24, CURRENT_TIMESTAMP())
))
ORDER BY scheduled_time DESC;

-- Result: ROOT_PROCESS_RAW ran fine every 15 minutes all night.
-- MERGE_SILVER_ORDERS shows state = SKIPPED for every run since roughly 3 AM.
-- BUILD_GOLD_REVENUE never appears at all after 3 AM, because it depends on MERGE_SILVER_ORDERS.`}
        </CodeBox>
        <Para>
          <code>SKIPPED</code> means the task's <code>WHEN</code> condition evaluated false —
          <code> WHEN SYSTEM$STREAM_HAS_DATA('RAW_ORDERS_STREAM')</code> was returning false, so the merge
          never ran, and the downstream Gold task correctly never triggered after it. That points upstream,
          to why the stream stopped showing data at 3 AM even though raw orders were clearly still arriving.
        </Para>
        <CodeBox label="Step 3 — find why the stream had nothing to report">{`-- Confirm raw data was actually still arriving
SELECT COUNT(*) FROM RAW.ORDERS WHERE updated_at >= '2026-08-13 03:00';
-- Result: 4,200 rows. Raw data was fine — the stream should have seen these.

-- Check for a schema change around the same time
SELECT * FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY(
  RESULT_LIMIT => 100
))
WHERE query_text ILIKE '%ALTER TABLE RAW.ORDERS%'
   OR query_text ILIKE '%CREATE OR REPLACE TABLE RAW.ORDERS%'
ORDER BY start_time DESC;

-- Result: a 2:57 AM deploy ran "CREATE OR REPLACE TABLE RAW.ORDERS ..." to add a new column,
-- instead of ALTER TABLE ... ADD COLUMN.`}
        </CodeBox>
        <Callout title="The actual root cause" color="#ef4444">
          <code>CREATE OR REPLACE TABLE</code> creates a brand-new table object, even though the name is
          identical to the old one. Any stream defined on the old table object silently stops tracking it —
          Snowflake does not retarget an existing stream to a same-named replacement table. From that moment
          on, <code>RAW_ORDERS_STREAM</code> was pointed at a table that no longer received the inserts,
          which is exactly why <code>SYSTEM$STREAM_HAS_DATA</code> kept returning false: from the stream's
          point of view, nothing was happening.
        </Callout>
        <SubTitle>Remediation</SubTitle>
        <Para>
          The fix has two parts: recreate the stream against the current table so it starts tracking real
          data again, and rebuild <code>SILVER.ORDERS</code> from source to cover the six-hour gap the stream
          could never have seen in the first place.
        </Para>
        <CodeBox label="Step 4 — recreate the stream and backfill the gap">{`-- Recreate the stream on the current RAW.ORDERS object
CREATE OR REPLACE STREAM RAW_ORDERS_STREAM ON TABLE RAW.ORDERS;

-- Backfill the window the broken stream could never have captured
MERGE INTO SILVER.ORDERS tgt
USING (
  SELECT * FROM RAW.ORDERS
  WHERE updated_at >= '2026-08-13 02:57'
  QUALIFY ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) = 1
) src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  status = src.status, total_usd = src.total_usd, updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, customer_id, status, total_usd, updated_at)
VALUES (src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at);

-- Manually run the rest of the graph to catch Gold back up
EXECUTE TASK BUILD_GOLD_REVENUE;`}
        </CodeBox>
        <SubTitle>Follow-up: preventing a repeat</SubTitle>
        <Para>
          The postmortem produced two concrete changes, not just a note that "we should be more careful."
          First, the deploy tooling was changed so any DDL against a table with an active stream requires
          <code> ALTER TABLE</code>, not <code>CREATE OR REPLACE TABLE</code> — a review-time check, since
          Snowflake itself will not stop you from replacing a streamed table. Second, and more importantly,
          a second alert was added specifically to catch this failure mode directly, rather than trusting the
          existing freshness alert to eventually notice.
        </Para>
        <CodeBox label="New alert: a task repeatedly skipped is itself an anomaly">{`CREATE OR REPLACE ALERT OPS.TASK_REPEATEDLY_SKIPPED_ALERT
  WAREHOUSE = WH_OPS_XS
  SCHEDULE = '30 MINUTE'
  IF (
    EXISTS (
      SELECT name
      FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
        SCHEDULED_TIME_RANGE_START => DATEADD('hour', -3, CURRENT_TIMESTAMP())
      ))
      WHERE name = 'MERGE_SILVER_ORDERS'
      GROUP BY name
      HAVING COUNT(*) = SUM(IFF(state = 'SKIPPED', 1, 0))
    )
  )
  THEN
    CALL OPS.NOTIFY_ONCALL('MERGE_SILVER_ORDERS has been SKIPPED on every run for 3+ hours — check RAW_ORDERS_STREAM.');

ALTER ALERT OPS.TASK_REPEATEDLY_SKIPPED_ALERT RESUME;`}
        </CodeBox>
        <Table
          headers={['Postmortem element', 'This incident']}
          rows={[
            ['Detection', 'Business complaint arrived first; the intended freshness alert never fired.'],
            ['Diagnosis', 'Walked the full task graph, found SKIPPED, traced it to a stream silently orphaned by CREATE OR REPLACE TABLE.'],
            ['Remediation', 'Recreated the stream on the current table object; backfilled the six-hour gap with a targeted MERGE; ran the graph manually to catch up Gold.'],
            ['Prevention', 'Deploy-time check against CREATE OR REPLACE on streamed tables, plus a new alert that catches a task stuck in SKIPPED regardless of whether the freshness alert also fires.'],
          ]}
        />
        <Callout title="Why this incident is worth studying">
          The failure never produced a single SQL error anywhere in the graph. Every task ran "successfully"
          from Snowflake's point of view — <code>SKIPPED</code> is not a failure state. This is exactly the
          gap Part 14's anti-pattern list warns about: treating "no errors" as "the platform is healthy" would
          have left this running for days.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Anti-patterns" />
        <SectionTitle>Production Operations Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Alerting on ACCOUNT_USAGE views and expecting sub-minute detection — the latency makes this impossible.',
              'Building critical real-time alerts on INFORMATION_SCHEMA functions without accounting for the 7-14 day retention when doing trend analysis.',
              'Leaving alerts in the default suspended state after CREATE ALERT.',
              'Alerting on every task failure with no tiering — this trains the on-call rotation to ignore pages.',
              'Treating warehouse uptime as the definition of "the platform is healthy" instead of data freshness and correctness.',
              'Writing a runbook that only the original author can follow.',
              'Setting one latency SLO for the whole account instead of per workload.',
              'Fixing a masking-policy incident by loosening the policy broadly instead of granting the specific missing exception.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build a Mini Operations Dashboard and Alert</SectionTitle>
        <Para>
          This lab has you query real account metadata and create one alert, using both an{' '}
          <code>ACCOUNT_USAGE</code> view (for a trend panel) and an <code>INFORMATION_SCHEMA</code> function
          (for a near-real-time check), so you can feel the latency/retention difference directly.
        </Para>
        <CodeBox label="Step 1 — trend panel from ACCOUNT_USAGE">{`SELECT
  DATE_TRUNC('day', start_time) AS usage_date,
  COUNT(*) AS query_count,
  SUM(IFF(execution_status = 'FAIL', 1, 0)) AS failed_count
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD('day', -14, CURRENT_TIMESTAMP())
GROUP BY 1
ORDER BY 1 DESC;`}
        </CodeBox>
        <CodeBox label="Step 2 — near-real-time check from INFORMATION_SCHEMA">{`SELECT query_id, execution_status, error_message, start_time
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY(
  RESULT_LIMIT => 25
))
WHERE execution_status = 'FAIL'
ORDER BY start_time DESC;`}
        </CodeBox>
        <CodeBox label="Step 3 — create and resume a lab alert">{`CREATE OR REPLACE ALERT OPS_LAB.RECENT_FAILURE_ALERT
  WAREHOUSE = WH_OPS_XS
  SCHEDULE = '5 MINUTE'
  IF (
    EXISTS (
      SELECT 1
      FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY(RESULT_LIMIT => 25))
      WHERE execution_status = 'FAIL'
    )
  )
  THEN
    INSERT INTO OPS_LAB.INCIDENT_LOG (detected_at, note)
    VALUES (CURRENT_TIMESTAMP(), 'Query failure detected by lab alert');

ALTER ALERT OPS_LAB.RECENT_FAILURE_ALERT RESUME;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'If you triggered a query failure right now, which of the two queries above would show it sooner?',
            'How far back could you trust ACCOUNT_USAGE.QUERY_HISTORY for a monthly failure-rate report? How about INFORMATION_SCHEMA?',
            'What would you check first if OPS_LAB.RECENT_FAILURE_ALERT never seemed to fire?',
            'What business-facing freshness tier would you assign OPS_LAB.INCIDENT_LOG itself?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Interview answer" />
        <SectionTitle>How to Explain Snowflake Operations in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake operations means monitoring the platform using
          <code>SNOWFLAKE.ACCOUNT_USAGE</code> views such as QUERY_HISTORY, TASK_HISTORY, COPY_HISTORY,
          LOGIN_HISTORY, and WAREHOUSE_METERING_HISTORY, while knowing that those views lag real time by up
          to a few hours — so time-sensitive alerts use the near-real-time <code>INFORMATION_SCHEMA</code>{' '}
          table functions instead, accepting their shorter retention window. I would build dashboards for
          query success rate, task failure rate, table freshness, and credit burn, and use{' '}
          <code>CREATE ALERT</code> for native alerting on both SQL failures and business-level checks like
          staleness or zero-row outputs. I'd tier freshness and latency SLOs by table/workload importance
          rather than applying one target account-wide, and back all of it with runbooks specific enough that
          anyone on the rotation — not just the original author — can respond.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is the latency difference between ACCOUNT_USAGE and INFORMATION_SCHEMA, and why does it matter for alerting?',
            'What does CREATE ALERT do, and what state is a new alert in by default?',
            'Name three ACCOUNT_USAGE views and what each one tracks.',
            'How would you triage a failed COPY INTO load?',
            'How would you debug a task graph where a downstream task never ran?',
            'Why should freshness and latency SLOs differ by table tier or workload?',
            'What belongs in a runbook that a Query Profile screenshot does not capture?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'ACCOUNT_USAGE views are the operational source of truth, but lag real time by roughly 45 minutes to 3 hours.',
          'INFORMATION_SCHEMA table functions are near-real-time but retain only about 7-14 days — use them for urgent alerts, not long-term trend reports.',
          'CREATE ALERT bundles a schedule, a condition query, and an action, and — like tasks — is created suspended.',
          'A useful operations dashboard covers query success rate, task failure rate, table freshness, and credit burn trend.',
          'Incident response for loads, task graphs, slow queries, and masking policies each has a distinct, learnable diagnostic path.',
          'A runbook must be specific enough for anyone on-call to follow, not just the person who built the pipeline.',
          'Freshness and latency SLOs should be tiered by business importance, not set as one account-wide number.',
          'Operational health means data freshness and correctness, not just warehouse uptime.',
        ]}
      />
    </LearnLayout>
  )
}
