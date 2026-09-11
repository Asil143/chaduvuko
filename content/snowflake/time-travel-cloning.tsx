import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function TimeTravelCloning() {
  return (
    <LearnLayout
      title="Time Travel, Fail-safe, and Zero-Copy Cloning"
      description="Recover dropped or changed data, query historical table state, clone databases and schemas, understand retention, Fail-safe, clone storage, governance, and incident recovery."
      section="Snowflake — Module 09"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Time Travel, Fail-safe, and Zero-Copy Cloning', href: '/learn/snowflake/time-travel-cloning' },
      ]}
      prev={{ title: 'MERGE, Upserts, and Idempotent Pipelines', href: '/learn/snowflake/merge-idempotency' }}
      next={{ title: 'Snowpipe and Continuous Loading', href: '/learn/snowflake/snowpipe' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The big idea" />
        <SectionTitle>Snowflake Gives You an Undo Window and Fast Clones</SectionTitle>
        <Para>
          Mistakes happen in warehouses. Someone drops a table. A bad MERGE overwrites current customer
          records with stale data. A dbt deployment changes a metric. A dashboard starts showing zero revenue.
          In older systems, recovery might require restoring backups into a separate server and manually
          copying data back. Snowflake gives you two extremely useful tools: Time Travel and zero-copy cloning.
        </Para>
        <Para>
          Time Travel lets you query or restore data from an earlier point inside a configured retention
          window. Zero-copy cloning lets you create fast logical copies of databases, schemas, and tables
          without physically duplicating all data at clone time. Together they make debugging, recovery,
          backfills, dev/test environments, and risky migrations much easier.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> Time Travel is Snowflake's self-service history window.
            Zero-copy cloning is a fast copy that shares unchanged data until the clone or original changes.
          </Para>
        </HighlightBox>
        <Callout title="Everyday analogy">
          Time Travel is like a document version history. Zero-copy clone is like duplicating a project folder
          instantly by referencing the same files until one copy changes. You get speed and safety, but you
          still need rules about who can see the copy and when to delete it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Time Travel basics" />
        <SectionTitle>Time Travel Lets You Query Historical Data</SectionTitle>
        <Para>
          Time Travel works for supported Snowflake objects such as tables, schemas, and databases. You can
          query a table as it existed before a timestamp, before a statement, or at an offset relative to now.
          This is useful for investigation before you restore anything.
        </Para>
        <CodeBox label="Query historical table state">{`-- Query the table as it looked one hour ago.
SELECT *
FROM RETAIL.GOLD.DAILY_REVENUE
AT (OFFSET => -3600);

-- Query the table before a known timestamp.
SELECT *
FROM RETAIL.GOLD.DAILY_REVENUE
BEFORE (TIMESTAMP => '2026-09-11 08:00:00'::TIMESTAMP_NTZ);

-- Query before a specific statement id.
SELECT *
FROM RETAIL.GOLD.DAILY_REVENUE
BEFORE (STATEMENT => '01b71944-0001-9c72-0000-000000000123');`}
        </CodeBox>
        <Table
          headers={['Time Travel selector', 'What it means', 'When to use']}
          rows={[
            ['AT OFFSET', 'A relative number of seconds from now.', 'Quick investigation such as one hour ago.'],
            ['AT TIMESTAMP', 'State at a specific time.', 'Incident known by clock time.'],
            ['BEFORE TIMESTAMP', 'State immediately before a time.', 'Undo a change that happened around then.'],
            ['BEFORE STATEMENT', 'State before a specific query.', 'Precise recovery after identifying bad query id.'],
          ]}
        />
        <Callout title="Investigate before restore">
          Do not immediately overwrite production during an incident. First query historical state, compare
          row counts and sample records, identify the bad statement or time window, and write down what you
          will restore.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Retention" />
        <SectionTitle>Retention Controls How Far Back Time Travel Can Go</SectionTitle>
        <Para>
          Time Travel is not infinite. Objects have a data retention period. The allowed range depends on
          object type, account edition, and configuration. If the retention window is one day, you cannot
          self-service query a version from last month through Time Travel. Retention is a recovery, cost,
          and compliance decision.
        </Para>
        <CodeBox label="Set and inspect retention">{`-- Set retention on a table.
ALTER TABLE RETAIL.GOLD.DAILY_REVENUE
  SET DATA_RETENTION_TIME_IN_DAYS = 7;

-- Set retention at schema level for objects created there.
ALTER SCHEMA RETAIL.GOLD
  SET DATA_RETENTION_TIME_IN_DAYS = 7;

-- Inspect retention-related table metadata.
SHOW TABLES LIKE 'DAILY_REVENUE' IN SCHEMA RETAIL.GOLD;`}
        </CodeBox>
        <Table
          headers={['Retention choice', 'Benefit', 'Tradeoff']}
          rows={[
            ['Short retention', 'Lower historical storage exposure/cost.', 'Less time to recover mistakes.'],
            ['Longer retention', 'More time for debugging and recovery.', 'May increase storage and governance responsibility.'],
            ['Critical Gold tables', 'Usually deserve deliberate retention.', 'Needs owner and recovery policy.'],
            ['Scratch/dev tables', 'Often shorter retention.', 'Do not rely on them for recovery.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Design question:</strong> if a bad transformation is discovered three days later, can you
            still recover the affected table? If the answer matters to the business, set retention deliberately.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — UNDROP" />
        <SectionTitle>UNDROP Recovers Recently Dropped Objects</SectionTitle>
        <Para>
          If a table, schema, or database is dropped and still inside the Time Travel retention period,
          Snowflake can often recover it with UNDROP. This is one of the most comforting Snowflake features
          for beginners, but do not treat it as permission to be careless. You still need to know what was
          dropped, when, and what downstream work was affected.
        </Para>
        <CodeBox label="Recover dropped objects">{`DROP TABLE RETAIL.GOLD.DAILY_REVENUE;

-- If still inside retention:
UNDROP TABLE RETAIL.GOLD.DAILY_REVENUE;

-- Schema and database recovery are also supported when eligible.
UNDROP SCHEMA RETAIL.GOLD;
UNDROP DATABASE RETAIL;`}
        </CodeBox>
        <Table
          headers={['Dropped object', 'Recovery command', 'After recovery check']}
          rows={[
            ['Table', 'UNDROP TABLE db.schema.table.', 'Row count, grants, downstream dependencies.'],
            ['Schema', 'UNDROP SCHEMA db.schema.', 'Objects restored, ownership, grants, tasks/views.'],
            ['Database', 'UNDROP DATABASE db.', 'Critical objects, grants, integrations, downstream jobs.'],
          ]}
        />
        <Callout title="Incident habit">
          After UNDROP, verify. Do not assume the business is fixed because the object name reappeared.
          Check row counts, sample records, grants, dashboards, and dependent tasks.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Restoring changed data" />
        <SectionTitle>Recover From a Bad UPDATE, DELETE, or MERGE</SectionTitle>
        <Para>
          UNDROP helps when the object was dropped. But many incidents change an existing table instead of
          dropping it. A bad MERGE might overwrite statuses. A DELETE might remove a date range. A full-refresh
          job might publish wrong values. Time Travel lets you create a restore table from a historical version
          and repair carefully.
        </Para>
        <CodeBox label="Create a restore table from historical state">{`-- Create a safe restore copy first.
CREATE OR REPLACE TABLE RETAIL.RECOVERY.DAILY_REVENUE_BEFORE_INCIDENT
CLONE RETAIL.GOLD.DAILY_REVENUE
BEFORE (TIMESTAMP => '2026-09-11 08:00:00'::TIMESTAMP_NTZ);

-- Compare current and historical versions.
SELECT
  'current' AS version,
  COUNT(*) AS rows,
  SUM(gross_revenue_usd) AS revenue
FROM RETAIL.GOLD.DAILY_REVENUE
UNION ALL
SELECT
  'before_incident' AS version,
  COUNT(*) AS rows,
  SUM(gross_revenue_usd) AS revenue
FROM RETAIL.RECOVERY.DAILY_REVENUE_BEFORE_INCIDENT;`}
        </CodeBox>
        <CodeBox label="Repair an affected date range">{`BEGIN;

DELETE FROM RETAIL.GOLD.DAILY_REVENUE
WHERE order_date BETWEEN '2026-09-01' AND '2026-09-10';

INSERT INTO RETAIL.GOLD.DAILY_REVENUE
SELECT *
FROM RETAIL.RECOVERY.DAILY_REVENUE_BEFORE_INCIDENT
WHERE order_date BETWEEN '2026-09-01' AND '2026-09-10';

COMMIT;`}
        </CodeBox>
        <Callout title="Prefer targeted repair">
          Restoring an entire table may undo legitimate changes that happened after the incident. If only a
          date range or subset was affected, repair that subset after comparing versions.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Finding the bad query" />
        <SectionTitle>Query History Helps Identify the Incident Point</SectionTitle>
        <Para>
          Time Travel is most powerful when you know the bad statement or the time window. Query history helps
          you find DML statements that changed important tables. During incidents, you are usually looking for
          DELETE, UPDATE, MERGE, INSERT OVERWRITE-style logic, CREATE OR REPLACE, or deployment jobs around the
          time the metric changed.
        </Para>
        <CodeBox label="Find suspicious changes">{`SELECT
  query_id,
  user_name,
  role_name,
  warehouse_name,
  start_time,
  execution_status,
  query_text
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -1, CURRENT_TIMESTAMP())
  AND (
    query_text ILIKE '%RETAIL.GOLD.DAILY_REVENUE%'
    OR query_text ILIKE '%MERGE INTO%DAILY_REVENUE%'
    OR query_text ILIKE '%DELETE FROM%DAILY_REVENUE%'
  )
ORDER BY start_time DESC;`}
        </CodeBox>
        <Table
          headers={['Clue', 'What it suggests', 'Next step']}
          rows={[
            ['CREATE OR REPLACE TABLE', 'Full rebuild replaced target.', 'Compare historical and current table.'],
            ['DELETE without narrow WHERE', 'Rows may have been removed broadly.', 'Use Time Travel count by date/key.'],
            ['MERGE from new staging table', 'Upsert logic may be wrong.', 'Inspect source duplicate keys and update conditions.'],
            ['Unexpected role/user', 'Manual or unauthorized change.', 'Review access and incident process.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Zero-copy cloning" />
        <SectionTitle>Zero-Copy Cloning Creates Fast Logical Copies</SectionTitle>
        <Para>
          A Snowflake clone initially shares storage with the source object. Creating a clone of a large
          database can be fast because Snowflake does not physically copy every unchanged micro-partition at
          creation time. As the original or clone changes, Snowflake tracks divergence.
        </Para>
        <CodeBox label="Clone tables, schemas, and databases">{`-- Clone one table.
CREATE TABLE QA.DAILY_REVENUE_CLONE
CLONE RETAIL.GOLD.DAILY_REVENUE;

-- Clone a schema.
CREATE SCHEMA RETAIL_QA.GOLD
CLONE RETAIL.GOLD;

-- Clone a full database for testing.
CREATE DATABASE RETAIL_DEV_CLONE
CLONE RETAIL;`}
        </CodeBox>
        <Table
          headers={['Clone level', 'Good for', 'Risk']}
          rows={[
            ['Table clone', 'Testing one migration or repair.', 'May miss dependencies in views/tasks.'],
            ['Schema clone', 'Testing a domain layer such as Gold.', 'Can expose more data than needed.'],
            ['Database clone', 'Production-like QA environment.', 'Governance, storage divergence, and lifecycle must be managed.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Key idea:</strong> zero-copy does not mean zero responsibility. Clones can expose sensitive
            data, accumulate storage as they diverge, and confuse users if naming and lifecycle are sloppy.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Historical clones" />
        <SectionTitle>You Can Clone From a Point in Time</SectionTitle>
        <Para>
          Cloning from Time Travel is useful for incident response and reproducible debugging. You can create
          a clone of a table, schema, or database as it existed before a bad deployment, then compare it to the
          current version or use it as the source for repair.
        </Para>
        <CodeBox label="Historical clone examples">{`-- Clone a table before a bad statement.
CREATE TABLE RECOVERY.ORDERS_BEFORE_BAD_MERGE
CLONE SILVER.ORDERS
BEFORE (STATEMENT => '01b71944-0001-9c72-0000-000000000123');

-- Clone a database as of a timestamp for investigation.
CREATE DATABASE RETAIL_INCIDENT_REVIEW
CLONE RETAIL
AT (TIMESTAMP => '2026-09-11 07:59:00'::TIMESTAMP_NTZ);

-- Compare current versus historical clone.
SELECT status, COUNT(*)
FROM SILVER.ORDERS
GROUP BY status
UNION ALL
SELECT status, COUNT(*)
FROM RECOVERY.ORDERS_BEFORE_BAD_MERGE
GROUP BY status;`}
        </CodeBox>
        <Callout title="Use clones as evidence">
          During an incident, a historical clone lets you inspect and compare without continuing to query a
          moving production target. That makes recovery safer and easier to explain.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Dev and QA environments" />
        <SectionTitle>Clones Make Production-Like Testing Practical</SectionTitle>
        <Para>
          A common clone use case is testing changes against production-shaped data without manually copying
          terabytes. For example, before changing a dbt model or applying a schema migration, create a QA clone,
          run the change there, compare outputs, and only then deploy to production.
        </Para>
        <CodeBox label="QA clone workflow">{`-- 1. Clone production database.
CREATE OR REPLACE DATABASE RETAIL_QA
CLONE RETAIL_PROD;

-- 2. Run migration or dbt build against RETAIL_QA.
-- dbt build --target qa --select modified_models+

-- 3. Compare key metrics.
SELECT 'prod' AS env, COUNT(*) AS rows
FROM RETAIL_PROD.GOLD.DAILY_REVENUE
UNION ALL
SELECT 'qa' AS env, COUNT(*) AS rows
FROM RETAIL_QA.GOLD.DAILY_REVENUE;

-- 4. Drop QA clone when done.
DROP DATABASE RETAIL_QA;`}
        </CodeBox>
        <Table
          headers={['QA clone benefit', 'What it prevents']}
          rows={[
            ['Production-shaped testing.', 'Deploying SQL that only works on tiny fake data.'],
            ['Fast environment setup.', 'Slow manual restore/copy workflows.'],
            ['Safe destructive testing.', 'Dropping or rewriting production objects during tests.'],
            ['Metric comparison.', 'Silent semantic changes in Gold outputs.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Governance for clones" />
        <SectionTitle>Clones Must Follow Data Security Rules</SectionTitle>
        <Para>
          Cloning production data can create a security problem if the clone is easier to access than the
          original. If production contains PII, payment metadata, customer contracts, or employee data, a clone
          contains that too unless masking, row policies, or access rules prevent exposure.
        </Para>
        <Table
          headers={['Clone risk', 'Example', 'Control']}
          rows={[
            ['Sensitive data exposure', 'Dev clone includes customer emails.', 'Limit clone grants; use masking policies or sanitized clones.'],
            ['Forgotten clone', 'Incident database remains for months.', 'Use owner/expiry naming and scheduled cleanup.'],
            ['Wrong warehouse cost', 'QA tests run on expensive prod warehouse.', 'Separate QA warehouses and resource monitors.'],
            ['Confusing environment', 'Analyst queries QA clone thinking it is prod.', 'Clear names, comments, tags, and restricted roles.'],
          ]}
        />
        <CodeBox label="Clone naming and tagging pattern">{`CREATE DATABASE RETAIL_QA_20260911_MIGRATION_TEST
CLONE RETAIL_PROD;

COMMENT ON DATABASE RETAIL_QA_20260911_MIGRATION_TEST IS
  'Owner: analytics-engineering. Purpose: migration test. Drop after 2026-09-18.';

-- If your governance uses tags, attach owner/purpose/expiry tags consistently.`}
        </CodeBox>
        <Callout title="Security rule">
          Treat a clone of sensitive production data as sensitive production data until you have proven
          otherwise.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Storage implications" />
        <SectionTitle>Zero-Copy Clones Are Fast, But Changes Can Add Storage</SectionTitle>
        <Para>
          A zero-copy clone initially shares unchanged data with its source. That is why clone creation is
          fast. But as rows are changed, deleted, inserted, or rebuilt in either the source or clone, Snowflake
          must preserve the data needed for each version. Long-lived, heavily modified clones can add storage
          cost and governance complexity.
        </Para>
        <Table
          headers={['Scenario', 'Storage implication', 'Guidance']}
          rows={[
            ['Create clone and only query it.', 'Minimal additional data storage initially.', 'Good for read-only testing and investigation.'],
            ['Run heavy UPDATE/DELETE in clone.', 'Clone diverges and adds storage.', 'Drop clone after experiment.'],
            ['Source changes after clone.', 'Historical shared data may need retention.', 'Understand lifecycle and retention.'],
            ['Many long-lived clones.', 'Costs and access surface can grow.', 'Track owners, purpose, and expiry.'],
          ]}
        />
        <CodeBox label="Find old clones by naming convention">{`SHOW DATABASES LIKE '%CLONE%';

-- If you track clone metadata in a table:
SELECT clone_name, owner, purpose, expires_on
FROM OPS.CLONE_REGISTRY
WHERE expires_on < CURRENT_DATE();`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Fail-safe" />
        <SectionTitle>Fail-safe Is Not the Same as Time Travel</SectionTitle>
        <Para>
          Fail-safe is a Snowflake-managed data recovery mechanism intended for extreme recovery scenarios
          after Time Travel is no longer available. It is not a normal user-facing query feature. You cannot
          casually run SELECT against Fail-safe history the way you can with Time Travel.
        </Para>
        <Table
          headers={['Feature', 'Who uses it', 'Purpose', 'Beginner misunderstanding']}
          rows={[
            ['Time Travel', 'You and your team.', 'Self-service query, clone, and restore inside retention.', 'Thinking it lasts forever.'],
            ['UNDROP', 'You and your team.', 'Recover dropped objects inside retention.', 'Assuming it fixes changed data automatically.'],
            ['Zero-copy clone', 'You and your team.', 'Fast logical copy for recovery/testing.', 'Thinking it has no governance or storage implications.'],
            ['Fail-safe', 'Snowflake-managed recovery process.', 'Disaster recovery after Time Travel.', 'Thinking it is a normal backup browser.'],
          ]}
        />
        <Callout title="Simple rule">
          Design your normal recovery around Time Travel, clones, backups/exports where required, and tested
          runbooks. Do not make Fail-safe your operational restore plan.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Incident recovery runbook" />
        <SectionTitle>A Practical Recovery Runbook</SectionTitle>
        <Para>
          Recovery should be calm and evidence-driven. A bad data incident is stressful; a runbook prevents
          random heroics. The steps below work for many Snowflake table incidents.
        </Para>
        <CodeBox label="Runbook: bad Gold table after deployment">{`1. Freeze downstream damage.
   - Pause scheduled task or deployment job if it keeps rewriting the table.
   - Notify affected dashboard/data owners.

2. Identify incident window.
   - Query SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY.
   - Find statement id, user, role, warehouse, and query text.

3. Compare current and historical data.
   - Query table BEFORE bad statement.
   - Compare row counts, sums, min/max dates, and sample keys.

4. Create recovery clone/table.
   - CREATE TABLE RECOVERY.X CLONE PROD.X BEFORE (STATEMENT => '...');

5. Repair deliberately.
   - Restore entire table only if safe.
   - Prefer affected date/key range if legitimate later changes exist.

6. Validate.
   - Run quality checks and dashboard reconciliation.

7. Resume jobs.
   - Restart tasks/orchestration.

8. Prevent recurrence.
   - Add tests, access controls, code review, or deployment guardrails.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Blue-green style releases" />
        <SectionTitle>Clones Can Support Safer Releases</SectionTitle>
        <Para>
          For risky warehouse changes, you can build and validate a new version before switching consumers.
          This is not exactly the same as application blue-green deployment, but the idea is similar: prepare
          a safe copy, test it, compare metrics, then promote intentionally.
        </Para>
        <CodeBox label="Safe release pattern">{`-- Clone current production.
CREATE DATABASE RETAIL_RELEASE_TEST CLONE RETAIL_PROD;

-- Apply model changes in RETAIL_RELEASE_TEST.
-- Run tests, compare metrics, inspect query performance.

-- If output is approved, deploy through normal pipeline to prod.
-- Avoid manually swapping random objects without lineage and approval.

DROP DATABASE RETAIL_RELEASE_TEST;`}
        </CodeBox>
        <BulletList
          items={[
            'Use clones to test migrations against realistic data volume.',
            'Compare row counts and important metrics before production deployment.',
            'Measure query performance, not only correctness.',
            'Keep promotion steps version-controlled and reviewed.',
            'Drop release clones after the release window closes.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Backfills" />
        <SectionTitle>Clones Make Backfills Safer</SectionTitle>
        <Para>
          A backfill recomputes historical data. Backfills can be dangerous because they touch large old
          ranges that stakeholders may already trust. A clone lets you test the backfill first, compare output,
          and estimate cost before changing production.
        </Para>
        <CodeBox label="Backfill rehearsal">{`CREATE DATABASE RETAIL_BACKFILL_TEST CLONE RETAIL_PROD;

-- Rebuild historical Gold revenue in clone.
DELETE FROM RETAIL_BACKFILL_TEST.GOLD.DAILY_REVENUE
WHERE order_date BETWEEN '2026-01-01' AND '2026-06-30';

INSERT INTO RETAIL_BACKFILL_TEST.GOLD.DAILY_REVENUE
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS gross_revenue_usd
FROM RETAIL_BACKFILL_TEST.SILVER.ORDERS
WHERE order_ts >= '2026-01-01'
  AND order_ts <  '2026-07-01'
  AND status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

-- Compare clone to production before deciding whether to backfill prod.`}
        </CodeBox>
        <Table
          headers={['Backfill risk', 'Clone-based mitigation']}
          rows={[
            ['Unexpected metric changes.', 'Compare old and new results before publishing.'],
            ['High compute cost.', 'Measure query runtime and warehouse size in clone.'],
            ['Broken downstream assumptions.', 'Run BI/dbt tests against clone.'],
            ['Rollback uncertainty.', 'Keep production unchanged until backfill plan is approved.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Privileges" />
        <SectionTitle>Who Should Be Allowed to Time Travel and Clone?</SectionTitle>
        <Para>
          Time Travel and cloning are powerful. The exact privilege requirements depend on object type and
          action, but the design principle is clear: not every analyst should clone production databases, and
          not every service role should restore objects. Clone and recovery privileges should be part of your
          role model.
        </Para>
        <Table
          headers={['Action', 'Good role', 'Risk if too broad']}
          rows={[
            ['Query historical data.', 'Analytics engineer or incident responder for approved objects.', 'Users bypass current masking/access assumptions.'],
            ['Clone production table.', 'Data engineering or analytics engineering owner role.', 'Sensitive data copied into weakly governed spaces.'],
            ['Clone production database.', 'Platform/admin controlled workflow.', 'Huge access and storage surface.'],
            ['UNDROP production object.', 'Object owner or controlled admin role.', 'Restoring wrong object or conflicting with current state.'],
            ['Drop clone.', 'Clone owner/platform role.', 'Old sensitive clones remain forever.'],
          ]}
        />
        <Callout title="Access model">
          Create a recovery/operator role with documented procedures instead of letting every power user
          improvise clones and restores.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Mistakes" />
        <SectionTitle>Common Mistakes With Time Travel and Cloning</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Assuming Time Travel is an infinite backup.',
              'Discovering after an incident that retention was too short.',
              'Restoring an entire table when only one date range was affected.',
              'Creating production clones with sensitive data and broad dev access.',
              'Leaving incident and QA clones alive indefinitely.',
              'Thinking zero-copy clone means zero storage cost forever.',
              'Relying on Fail-safe as a normal user-operated restore plan.',
              'Testing recovery only during the emergency.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Break and Restore a Table</SectionTitle>
        <Para>
          This lab makes Time Travel concrete. You will create a table, accidentally delete rows, query the
          historical version, clone the previous state, and repair the table.
        </Para>
        <CodeBox label="Lab setup and mistake">{`CREATE OR REPLACE DATABASE TIME_TRAVEL_LAB;
CREATE OR REPLACE SCHEMA TIME_TRAVEL_LAB.GOLD;
CREATE OR REPLACE SCHEMA TIME_TRAVEL_LAB.RECOVERY;

CREATE OR REPLACE TABLE TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE (
  order_date DATE,
  revenue_usd NUMBER(12,2)
);

INSERT INTO TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE VALUES
  ('2026-09-01', 1000.00),
  ('2026-09-02', 1250.00),
  ('2026-09-03', 900.00);

-- Record this query id in the UI/history, then make a mistake:
DELETE FROM TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE
WHERE order_date >= '2026-09-02';`}
        </CodeBox>
        <CodeBox label="Lab recovery">{`-- Investigate one minute ago.
SELECT *
FROM TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE
AT (OFFSET => -60);

-- Create a restore copy from history.
CREATE OR REPLACE TABLE TIME_TRAVEL_LAB.RECOVERY.DAILY_REVENUE_RESTORE
CLONE TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE
AT (OFFSET => -60);

-- Repair missing rows.
INSERT INTO TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE
SELECT *
FROM TIME_TRAVEL_LAB.RECOVERY.DAILY_REVENUE_RESTORE
WHERE order_date >= '2026-09-02';

SELECT * FROM TIME_TRAVEL_LAB.GOLD.DAILY_REVENUE ORDER BY order_date;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'Why did we create a recovery copy instead of immediately overwriting the table?',
            'What would change if legitimate new rows were inserted after the bad DELETE?',
            'How would you find the exact bad query id?',
            'Who should be allowed to perform this restore in production?',
            'What test or access control could prevent this mistake next time?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Interview answer" />
        <SectionTitle>How to Explain Time Travel and Cloning in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake Time Travel lets users query, clone, or restore data as
          it existed earlier within the configured retention period. It helps recover from dropped objects,
          bad deletes, bad merges, and deployment mistakes. Zero-copy cloning creates fast logical copies of
          tables, schemas, or databases by sharing unchanged storage initially, which is useful for QA,
          backfills, incident investigation, and dev environments. Fail-safe is different: it is a
          Snowflake-managed recovery mechanism, not a normal self-service query feature. In production, I
          would set retention deliberately, restrict clone privileges, tag clones with owner and expiry,
          monitor old clones, and practice restore runbooks before incidents.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is Time Travel in Snowflake?',
            'How is Fail-safe different from Time Travel?',
            'What does zero-copy cloning mean?',
            'How would you recover from a bad DELETE?',
            'Why can production clones create security risk?',
            'How can clones help with QA, migrations, and backfills?',
            'What should a recovery runbook include?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Time Travel is Snowflake’s self-service historical recovery window.',
          'Retention controls how far back you can query, clone, or restore.',
          'UNDROP helps recover recently dropped objects inside retention.',
          'Zero-copy clones are fast because unchanged data is shared initially.',
          'Clones are powerful for QA, incidents, migrations, and backfills, but require governance.',
          'Fail-safe is not a normal user-operated restore feature.',
          'Production recovery needs practiced runbooks, access controls, validation, and cleanup.',
        ]}
      />
    </LearnLayout>
  )
}
