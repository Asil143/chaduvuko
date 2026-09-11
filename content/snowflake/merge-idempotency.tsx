import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function MergeIdempotency() {
  return (
    <LearnLayout
      title="MERGE, Upserts, and Idempotent Pipelines"
      description="MERGE syntax, staging tables, deduplication, watermarks, reruns, load audit tables, late-arriving data, deletes, and idempotent Snowflake pipeline design."
      section="Snowflake — Module 08"
      readTime="75 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'MERGE, Upserts, and Idempotent Pipelines', href: '/learn/snowflake/merge-idempotency' },
      ]}
      prev={{ title: 'ELT and Medallion Architecture in Snowflake', href: '/learn/snowflake/elt-medallion' }}
      next={{ title: 'Time Travel, Fail-safe, and Zero-Copy Cloning', href: '/learn/snowflake/time-travel-cloning' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The real problem" />
        <SectionTitle>Pipelines Fail, Retry, and Receive Duplicate Data</SectionTitle>
        <Para>
          Real pipelines are not clean one-time events. Files arrive twice. Jobs fail halfway through.
          Source systems resend yesterday's data. A backfill overlaps with a daily load. Network issues
          trigger retries. A producer sends an older version of an order after a newer version has already
          arrived. If your Snowflake pipeline cannot handle reruns safely, a normal retry can create duplicate
          revenue, stale customer records, or broken dashboards.
        </Para>
        <Para>
          MERGE is Snowflake's main SQL tool for upserts: update existing rows, insert new rows, and sometimes
          delete rows in one statement. Idempotency is the design property that makes reruns safe. If the same
          input is processed twice, the final trusted table should still be correct.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> MERGE decides what to do when source rows match or do
            not match target rows. Idempotency means doing the same pipeline step again does not damage the
            final state.
          </Para>
        </HighlightBox>
        <Callout title="Everyday analogy">
          Imagine a hotel front desk. If a guest already has a reservation, update the arrival time. If not,
          create a reservation. If the booking system sends the same reservation twice, do not create two rooms.
          That is the spirit of idempotent upsert design.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — MERGE basics" />
        <SectionTitle>The MERGE Statement Has a Source, Target, Match Rule, and Actions</SectionTitle>
        <Para>
          A MERGE compares a source dataset to a target table. The ON clause decides whether a source row
          matches a target row. WHEN MATCHED handles existing rows. WHEN NOT MATCHED handles new rows. That
          sounds simple, but production correctness depends on the match key, deduplication, update conditions,
          and delete handling.
        </Para>
        <CodeBox label="Basic Snowflake MERGE">{`MERGE INTO SILVER.ORDERS tgt
USING STG_ORDERS src
  ON tgt.order_id = src.order_id
WHEN MATCHED THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (
  order_id, customer_id, status, total_usd, updated_at
) VALUES (
  src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at
);`}
        </CodeBox>
        <Table
          headers={['MERGE part', 'Meaning', 'Production question']}
          rows={[
            ['Target', 'Trusted table being changed.', 'Is this Silver/Gold table safe to update directly?'],
            ['Source', 'Incoming staged data.', 'Has it been deduped and validated?'],
            ['ON clause', 'Match condition.', 'Is this a stable business key?'],
            ['WHEN MATCHED', 'Action for existing rows.', 'Should every match update, or only newer records?'],
            ['WHEN NOT MATCHED', 'Action for new rows.', 'Are required fields present and typed correctly?'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Upsert mental model" />
        <SectionTitle>Upsert Means Update Existing Records and Insert New Records</SectionTitle>
        <Para>
          An upsert is an update plus insert. It is common for entities whose state can change: customers,
          orders, subscriptions, products, accounts, shipments, and support tickets. Event tables are often
          append-only, but entity tables often need upsert behavior.
        </Para>
        <Table
          headers={['Data shape', 'Example', 'Usually append or merge?', 'Reason']}
          rows={[
            ['Immutable event', 'OrderCreated event.', 'Append, then dedupe by event_id if needed.', 'The event is a fact that happened.'],
            ['Mutable entity', 'Order current status.', 'MERGE.', 'The same order can move from pending to shipped.'],
            ['Daily snapshot', 'Customer record snapshot.', 'MERGE latest version or build history.', 'One customer appears every day.'],
            ['Slowly changing dimension', 'Customer segment history.', 'MERGE plus history strategy.', 'Need current value and sometimes old values.'],
            ['Metric aggregate', 'Daily revenue.', 'Rebuild or MERGE by date/key.', 'Depends on source corrections and volume.'],
          ]}
        />
        <CodeBox label="Before and after example">{`Target before:
  O-1 completed 100.00 updated_at 10:00
  O-2 pending    50.00 updated_at 10:05

Source batch:
  O-2 shipped    50.00 updated_at 11:00
  O-3 completed  25.00 updated_at 11:10

Target after MERGE:
  O-1 completed 100.00 updated_at 10:00
  O-2 shipped    50.00 updated_at 11:00
  O-3 completed  25.00 updated_at 11:10`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Stable keys" />
        <SectionTitle>The Match Key Decides Whether MERGE Is Correct</SectionTitle>
        <Para>
          The ON clause is the heart of MERGE. If the key is wrong, the target becomes wrong. A business key
          should identify the real-world entity you are updating: order_id for orders, customer_id for
          customers, subscription_id for subscriptions, product_id for products. A technical load timestamp is
          usually not a business key.
        </Para>
        <Table
          headers={['Key candidate', 'Good for matching?', 'Why']}
          rows={[
            ['order_id', 'Yes for one current row per order.', 'Stable identity for the order entity.'],
            ['customer_id', 'Yes for one current row per customer.', 'Stable identity for customer profile.'],
            ['event_id', 'Yes for deduping event records.', 'Stable identity for an emitted event.'],
            ['loaded_at', 'No.', 'Changes every load and creates duplicates.'],
            ['source_file', 'No by itself.', 'Identifies a file, not a business entity.'],
            ['email', 'Usually risky.', 'Can change, be reused, or differ by casing/format.'],
          ]}
        />
        <Callout title="Senior habit">
          Ask what one row in the target means. One row per order? Match on order_id. One row per customer?
          Match on customer_id. One row per customer per day? Match on customer_id plus date. The grain tells
          you the key.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Deduplicate staging first" />
        <SectionTitle>Never MERGE a Source With Duplicate Keys</SectionTitle>
        <Para>
          Before merging, make sure the source dataset has at most one row per target key. If the source has
          two rows for the same order_id, which one should update the target? Snowflake can error when a
          merge encounters duplicate source matches, and even when SQL allows a pattern, your business logic
          becomes unclear.
        </Para>
        <CodeBox label="Deduplicate staging rows before MERGE">{`CREATE OR REPLACE TEMP TABLE STG_ORDERS_DEDUPED AS
SELECT *
FROM STG_ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC, loaded_at DESC, source_file DESC
) = 1;

SELECT order_id, COUNT(*) AS row_count
FROM STG_ORDERS_DEDUPED
GROUP BY order_id
HAVING COUNT(*) > 1;`}
        </CodeBox>
        <Table
          headers={['Tie-breaker', 'Meaning', 'When to use']}
          rows={[
            ['updated_at DESC', 'Prefer newest source business update.', 'Mutable entities with update timestamps.'],
            ['sequence_number DESC', 'Prefer highest source ordering number.', 'CDC or event streams with monotonic sequence.'],
            ['loaded_at DESC', 'Prefer latest warehouse arrival.', 'Only when source has no better update indicator.'],
            ['source_priority', 'Prefer trusted source over backup source.', 'Multi-source entity stitching.'],
          ]}
        />
        <Callout title="Bad dedupe is worse than no dedupe" color="#ef4444">
          If you choose an arbitrary row with no deterministic ordering, reruns can pick different winners.
          That breaks idempotency because the same input can produce different final states.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Do not overwrite newer data with older data" />
        <SectionTitle>Condition Updates With Source Freshness</SectionTitle>
        <Para>
          A common bug is updating the target whenever a key matches, even if the incoming source row is older
          than the target row. Late-arriving data is normal. If yesterday's stale version arrives after today's
          corrected version, a careless MERGE can move the table backward.
        </Para>
        <CodeBox label="Update only when source is newer">{`MERGE INTO SILVER.ORDERS tgt
USING STG_ORDERS_DEDUPED src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at,
  last_seen_batch_id = src.batch_id
WHEN NOT MATCHED THEN INSERT (
  order_id, customer_id, status, total_usd, updated_at, last_seen_batch_id
) VALUES (
  src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at, src.batch_id
);`}
        </CodeBox>
        <Table
          headers={['Situation', 'Without update condition', 'With update condition']}
          rows={[
            ['Late stale row arrives.', 'Target is overwritten with old status.', 'Old row is ignored.'],
            ['Correction arrives with newer timestamp.', 'Target updates, usually OK.', 'Target updates deliberately.'],
            ['Source timestamp missing.', 'Could overwrite unpredictably.', 'Fails quality check or uses fallback rule.'],
            ['Clock skew between systems.', 'Freshness rule can be wrong.', 'Use source sequence/version if available.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Idempotency" />
        <SectionTitle>Idempotency Means Safe Reruns</SectionTitle>
        <Para>
          A pipeline step is idempotent if running it one time or many times produces the same final trusted
          state for the same input. Idempotency is essential because retries and backfills are not rare. They
          are normal operations.
        </Para>
        <Table
          headers={['Pipeline design', 'Idempotent?', 'Why']}
          rows={[
            ['Blind INSERT every row into Silver.', 'Usually no.', 'Rerun duplicates rows.'],
            ['INSERT events with unique event_id check.', 'Can be.', 'Duplicate events are rejected or deduped.'],
            ['MERGE by stable key after staging dedupe.', 'Yes when designed correctly.', 'Same key updates/inserts to same final state.'],
            ['CREATE OR REPLACE TABLE from deterministic query.', 'Often yes.', 'Full rebuild produces same output from same inputs.'],
            ['Delete target partition then reload partition.', 'Can be.', 'Safe if partition boundaries and source completeness are correct.'],
          ]}
        />
        <CodeBox label="Rerun safety test">{`-- Run the same MERGE twice, then compare counts and checksums.
SELECT COUNT(*) AS row_count
FROM SILVER.ORDERS;

SELECT
  COUNT(*) AS row_count,
  SUM(HASH(order_id, customer_id, status, total_usd, updated_at)) AS content_hash
FROM SILVER.ORDERS;

-- After rerun, these should remain stable unless the source input changed.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Load audit table" />
        <SectionTitle>Audit Every Batch So Incidents Are Debuggable</SectionTitle>
        <Para>
          A MERGE without audit metadata is hard to support. When a stakeholder asks why yesterday's revenue
          changed, you need to know which batch ran, which files it processed, how many rows were staged,
          inserted, updated, rejected, or ignored, and whether the job completed.
        </Para>
        <CodeBox label="Load audit table">{`CREATE OR REPLACE TABLE OPS.LOAD_AUDIT (
  batch_id STRING,
  pipeline_name STRING,
  target_table STRING,
  started_at TIMESTAMP_NTZ,
  finished_at TIMESTAMP_NTZ,
  status STRING,
  staged_rows NUMBER,
  inserted_rows NUMBER,
  updated_rows NUMBER,
  rejected_rows NUMBER,
  notes STRING
);

INSERT INTO OPS.LOAD_AUDIT (
  batch_id, pipeline_name, target_table, started_at, status, staged_rows
) VALUES (
  'batch_2026_09_11_001',
  'orders_silver_merge',
  'SILVER.ORDERS',
  CURRENT_TIMESTAMP(),
  'RUNNING',
  (SELECT COUNT(*) FROM STG_ORDERS)
);`}
        </CodeBox>
        <Table
          headers={['Audit field', 'Why it matters']}
          rows={[
            ['batch_id', 'Connects staging, target, logs, and orchestrator run.'],
            ['pipeline_name', 'Identifies which code path ran.'],
            ['target_table', 'Shows what was changed.'],
            ['started_at / finished_at', 'Supports SLA and duration debugging.'],
            ['row counts', 'Catches partial loads and unexpected volume changes.'],
            ['status', 'Separates running, success, failed, and rolled-back runs.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Getting MERGE counts" />
        <SectionTitle>Track Inserted and Updated Rows</SectionTitle>
        <Para>
          Snowflake's query history can show rows inserted and updated for DML statements. In orchestrated
          pipelines, teams often capture row counts from query metadata or compute expected counts before and
          after a merge. The exact implementation can depend on your orchestration tool, but the principle is
          fixed: do not run blind.
        </Para>
        <CodeBox label="Count before and after">{`-- Before merge
SELECT COUNT(*) AS target_rows_before FROM SILVER.ORDERS;
SELECT COUNT(*) AS staged_rows FROM STG_ORDERS_DEDUPED;
SELECT COUNT(*) AS expected_inserts
FROM STG_ORDERS_DEDUPED src
LEFT JOIN SILVER.ORDERS tgt
  ON src.order_id = tgt.order_id
WHERE tgt.order_id IS NULL;

SELECT COUNT(*) AS expected_updates
FROM STG_ORDERS_DEDUPED src
JOIN SILVER.ORDERS tgt
  ON src.order_id = tgt.order_id
WHERE src.updated_at > tgt.updated_at;`}
        </CodeBox>
        <Callout title="Why expected counts matter">
          If a normal daily batch updates 1,000 orders and today it updates 4 million, you want the pipeline
          to notice before downstream Gold metrics are published.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Watermarks" />
        <SectionTitle>Watermarks Decide What Input to Process Next</SectionTitle>
        <Para>
          A watermark tracks how far a pipeline has processed. It might be a source updated_at timestamp, an
          ingestion timestamp, a file date, an event sequence, or a CDC offset. Watermarks reduce work, but
          they can also cause data loss if designed carelessly.
        </Para>
        <Table
          headers={['Watermark type', 'Example', 'Good for', 'Risk']}
          rows={[
            ['Source updated_at', 'orders.updated_at.', 'Mutable records with reliable source timestamps.', 'Clock skew or late corrections.'],
            ['Ingestion loaded_at', 'warehouse loaded_at.', 'Processing what arrived in Snowflake.', 'Does not represent source business time.'],
            ['File path/date', 's3://.../dt=2026-09-11.', 'Batch file partitioning.', 'Late files in old partitions.'],
            ['Sequence number', 'CDC log sequence.', 'Ordered change streams.', 'Requires source connector guarantees.'],
            ['Batch id', 'orchestrator run id.', 'Operational grouping.', 'Not enough by itself for source completeness.'],
          ]}
        />
        <CodeBox label="Watermark control table">{`CREATE OR REPLACE TABLE OPS.PIPELINE_WATERMARKS (
  pipeline_name STRING PRIMARY KEY,
  watermark_value STRING,
  updated_at TIMESTAMP_NTZ
);

-- Example: process with a lookback window to catch late updates.
SELECT *
FROM RAW.ORDERS
WHERE TRY_TO_TIMESTAMP_NTZ(updated_at) >= DATEADD(
  hour,
  -2,
  (SELECT watermark_value::TIMESTAMP_NTZ
   FROM OPS.PIPELINE_WATERMARKS
   WHERE pipeline_name = 'orders_silver_merge')
);`}
        </CodeBox>
        <Callout title="Use lookback windows carefully">
          A lookback window intentionally rereads some recent data to catch late arrivals. It only works if
          the downstream merge is idempotent; otherwise the reread creates duplicates.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Deletes" />
        <SectionTitle>Deletes Need an Explicit Strategy</SectionTitle>
        <Para>
          Source systems delete records or mark records inactive. Warehouses must decide what that means.
          Should the row disappear from Silver? Should it remain with is_deleted = true? Should Gold metrics
          exclude it? There is no universal answer. There must be an explicit answer.
        </Para>
        <CodeBox label="Soft-delete MERGE pattern">{`MERGE INTO SILVER.CUSTOMERS tgt
USING STG_CUSTOMERS_DEDUPED src
  ON tgt.customer_id = src.customer_id
WHEN MATCHED AND src.operation = 'DELETE' THEN UPDATE SET
  is_deleted = TRUE,
  deleted_at = src.updated_at,
  updated_at = src.updated_at
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  email = src.email,
  segment = src.segment,
  is_deleted = FALSE,
  updated_at = src.updated_at
WHEN NOT MATCHED AND src.operation <> 'DELETE' THEN INSERT (
  customer_id, email, segment, is_deleted, updated_at
) VALUES (
  src.customer_id, src.email, src.segment, FALSE, src.updated_at
);`}
        </CodeBox>
        <Table
          headers={['Delete strategy', 'What it does', 'Use when']}
          rows={[
            ['Hard delete', 'Remove row from target.', 'Legal or strict mirror requirements, with caution.'],
            ['Soft delete', 'Keep row and mark deleted.', 'Analytics needs history and auditability.'],
            ['Status field', 'Treat cancelled/inactive as state.', 'Business entity still exists but no longer active.'],
            ['History table', 'Record delete as an event/version.', 'Auditable change history is required.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Late-arriving data" />
        <SectionTitle>Late-Arriving Data Can Change Old Metrics</SectionTitle>
        <Para>
          Late-arriving data is data that belongs to an earlier business period but arrives later. For example,
          a payment correction for last week arrives today. If Gold revenue is already published, should last
          week's number change? Usually yes, but stakeholders need to understand that the metric is corrected.
        </Para>
        <CodeBox label="Find late-arriving orders">{`SELECT
  order_id,
  order_ts,
  loaded_at,
  DATEDIFF('hour', order_ts, loaded_at) AS hours_late
FROM SILVER.ORDERS
WHERE loaded_at > DATEADD(hour, 24, order_ts)
ORDER BY hours_late DESC;`}
        </CodeBox>
        <BulletList
          items={[
            'Define whether dashboards show current truth or closed-period truth.',
            'Keep loaded_at and business timestamps so lateness is measurable.',
            'Use backfill windows for Gold aggregates affected by late data.',
            'Communicate metric restatements to business owners.',
            'Do not assume daily batch time equals business event time.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Partition delete and reload" />
        <SectionTitle>Sometimes Delete-and-Reload Is Simpler Than MERGE</SectionTitle>
        <Para>
          MERGE is not always the best answer. For some partitioned aggregates or daily snapshots, it can be
          simpler and safer to delete the affected date range and reload it from a trusted source query. This
          is idempotent if the date boundary is correct and the source contains complete data for that range.
        </Para>
        <CodeBox label="Delete and reload affected dates">{`BEGIN;

DELETE FROM GOLD.DAILY_REVENUE
WHERE order_date BETWEEN '2026-09-01' AND '2026-09-07';

INSERT INTO GOLD.DAILY_REVENUE (order_date, order_count, revenue_usd)
SELECT
  DATE(order_ts) AS order_date,
  COUNT(*) AS order_count,
  SUM(total_usd) AS revenue_usd
FROM SILVER.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-09-08'
  AND status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

COMMIT;`}
        </CodeBox>
        <Table
          headers={['Pattern', 'Strength', 'Weakness']}
          rows={[
            ['MERGE row changes', 'Efficient for mutable entity tables.', 'Requires correct keys and update rules.'],
            ['Delete/reload partition', 'Simple for date aggregates and complete windows.', 'Dangerous if source window is incomplete.'],
            ['Full refresh', 'Easiest to reason about.', 'Can be expensive or slow at scale.'],
            ['Append with dedupe view', 'Keeps raw history.', 'Queries may become more complex.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Transactions" />
        <SectionTitle>Use Transactions for Multi-Step Changes</SectionTitle>
        <Para>
          When a pipeline performs several related DML statements, use a transaction so the target does not
          get stuck in a half-updated state. Snowflake supports transactions for DML. This matters for
          delete-and-reload, audit table updates, and multi-table publish steps.
        </Para>
        <CodeBox label="Transaction with audit update">{`BEGIN;

UPDATE OPS.LOAD_AUDIT
SET status = 'RUNNING', started_at = CURRENT_TIMESTAMP()
WHERE batch_id = 'batch_2026_09_11_001';

MERGE INTO SILVER.ORDERS tgt
USING STG_ORDERS_DEDUPED src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED THEN INSERT (order_id, status, total_usd, updated_at)
VALUES (src.order_id, src.status, src.total_usd, src.updated_at);

UPDATE OPS.LOAD_AUDIT
SET status = 'SUCCESS', finished_at = CURRENT_TIMESTAMP()
WHERE batch_id = 'batch_2026_09_11_001';

COMMIT;`}
        </CodeBox>
        <Callout title="Failure behavior">
          If a multi-step pipeline fails, the recovery plan should say whether to roll back, rerun the same
          batch, restore with Time Travel, or delete/reload an affected range. Do not invent the plan during
          the incident.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Streams and MERGE" />
        <SectionTitle>Streams Often Feed MERGE Statements</SectionTitle>
        <Para>
          Snowflake streams track changes on a table. A common pattern is to use a stream as the source of a
          MERGE into a downstream table. This can make incremental pipelines cleaner, but the same rules still
          apply: stable keys, delete handling, audit, monitoring, and recovery.
        </Para>
        <CodeBox label="Stream to MERGE pattern">{`CREATE OR REPLACE STREAM RAW_ORDERS_STREAM
  ON TABLE RAW.ORDERS;

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
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at
WHEN NOT MATCHED AND src.METADATA$ACTION <> 'DELETE' THEN INSERT (
  order_id, status, total_usd, updated_at, is_deleted
) VALUES (
  src.order_id, src.status, src.total_usd, src.updated_at, FALSE
);`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Important:</strong> streams are consumed by DML operations. Test stream-based pipelines
            carefully so a development query does not accidentally advance production change tracking.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Testing MERGE pipelines" />
        <SectionTitle>Test the Failure Cases, Not Only the Happy Path</SectionTitle>
        <Para>
          A MERGE pipeline is not production-ready because it works for one clean batch. It is production-ready
          when it handles duplicates, reruns, stale updates, deletes, late arrivals, empty batches, and bad
          values in predictable ways.
        </Para>
        <Table
          headers={['Test case', 'Input', 'Expected result']}
          rows={[
            ['New row', 'Order O-10 not in target.', 'Inserted once.'],
            ['Existing newer update', 'O-10 with updated_at greater than target.', 'Target updated.'],
            ['Existing stale update', 'O-10 with updated_at less than target.', 'Target unchanged.'],
            ['Duplicate source key', 'Two O-10 rows in staging.', 'Dedupe picks deterministic winner before MERGE.'],
            ['Delete signal', 'O-10 operation DELETE.', 'Soft delete or approved hard delete.'],
            ['Rerun same batch', 'Identical staging processed again.', 'No duplicate rows and same content hash.'],
            ['Empty batch', 'No staged rows.', 'Pipeline succeeds with zero changes or exits cleanly.'],
          ]}
        />
        <CodeBox label="Duplicate-key guard">{`SELECT order_id, COUNT(*) AS row_count
FROM STG_ORDERS_DEDUPED
GROUP BY order_id
HAVING COUNT(*) > 1;

-- This query should return zero rows before MERGE.
-- If it returns rows, fail the pipeline before touching the target.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Troubleshooting" />
        <SectionTitle>MERGE Troubleshooting Playbook</SectionTitle>
        <Para>
          When a MERGE pipeline produces wrong data, do not start by rewriting SQL randomly. Work backward
          from the target to staging, audit, source files, and business rules. Most incidents fall into a few
          categories: wrong key, duplicate source, stale update, missing filter, broken cast, or incomplete
          source window.
        </Para>
        <Table
          headers={['Symptom', 'Likely cause', 'Check first']}
          rows={[
            ['Duplicate rows in target.', 'Append used instead of merge, or target grain misunderstood.', 'Target uniqueness query by business key.'],
            ['Old status reappeared.', 'Stale update overwrote newer target.', 'Compare src.updated_at and tgt.updated_at.'],
            ['Revenue doubled.', 'Rerun appended or merge key omitted date/grain.', 'Batch audit and target grain.'],
            ['Expected updates missing.', 'Watermark skipped late records.', 'Watermark table and source updated_at distribution.'],
            ['MERGE errors on duplicate row.', 'Source has multiple rows per target key.', 'Staging duplicate-key check.'],
            ['Deletes not reflected.', 'Delete operation ignored.', 'Source operation flags and delete strategy.'],
          ]}
        />
        <CodeBox label="Debug target history with Time Travel">{`-- Compare current target to one hour ago.
SELECT COUNT(*) AS current_rows
FROM SILVER.ORDERS;

SELECT COUNT(*) AS rows_one_hour_ago
FROM SILVER.ORDERS AT (OFFSET => -3600);

-- Inspect rows changed by a suspicious batch if you store batch metadata.
SELECT *
FROM SILVER.ORDERS
WHERE last_seen_batch_id = 'batch_2026_09_11_001';`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — Anti-patterns" />
        <SectionTitle>MERGE Anti-Patterns That Corrupt Warehouses</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Using loaded_at as the merge key.',
              'Merging raw staging data without deduplicating by target grain.',
              'Updating target rows with older source records.',
              'Ignoring delete signals from CDC or source snapshots.',
              'Relying on a watermark without a lookback plan for late arrivals.',
              'Running blind with no load audit table or row counts.',
              'Assuming reruns are safe without actually testing the same batch twice.',
              'Using one MERGE statement with unclear business logic for many unrelated target grains.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build an Idempotent Orders MERGE</SectionTitle>
        <Para>
          This lab gives you a practical interview-ready example. You will create a target table, stage rows
          with duplicates and stale updates, dedupe staging, merge safely, and prove that rerunning the merge
          does not change the final state.
        </Para>
        <CodeBox label="Lab setup">{`CREATE OR REPLACE DATABASE MERGE_LAB;
CREATE OR REPLACE SCHEMA MERGE_LAB.SILVER;
CREATE OR REPLACE TEMP TABLE STG_ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ,
  loaded_at TIMESTAMP_NTZ,
  batch_id STRING
);

CREATE OR REPLACE TABLE MERGE_LAB.SILVER.ORDERS (
  order_id STRING,
  customer_id STRING,
  status STRING,
  total_usd NUMBER(12,2),
  updated_at TIMESTAMP_NTZ,
  last_seen_batch_id STRING
);

INSERT INTO MERGE_LAB.SILVER.ORDERS VALUES
  ('O-1', 'C-1', 'completed', 100.00, '2026-09-01 10:00:00', 'initial'),
  ('O-2', 'C-2', 'pending', 50.00, '2026-09-01 10:05:00', 'initial');

INSERT INTO STG_ORDERS VALUES
  ('O-2', 'C-2', 'shipped', 50.00, '2026-09-01 11:00:00', CURRENT_TIMESTAMP(), 'batch_1'),
  ('O-2', 'C-2', 'pending', 50.00, '2026-09-01 10:30:00', CURRENT_TIMESTAMP(), 'batch_1'),
  ('O-3', 'C-3', 'completed', 25.00, '2026-09-01 11:10:00', CURRENT_TIMESTAMP(), 'batch_1');`}
        </CodeBox>
        <CodeBox label="Lab merge">{`CREATE OR REPLACE TEMP TABLE STG_ORDERS_DEDUPED AS
SELECT *
FROM STG_ORDERS
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY order_id
  ORDER BY updated_at DESC, loaded_at DESC
) = 1;

MERGE INTO MERGE_LAB.SILVER.ORDERS tgt
USING STG_ORDERS_DEDUPED src
  ON tgt.order_id = src.order_id
WHEN MATCHED AND src.updated_at > tgt.updated_at THEN UPDATE SET
  customer_id = src.customer_id,
  status = src.status,
  total_usd = src.total_usd,
  updated_at = src.updated_at,
  last_seen_batch_id = src.batch_id
WHEN NOT MATCHED THEN INSERT (
  order_id, customer_id, status, total_usd, updated_at, last_seen_batch_id
) VALUES (
  src.order_id, src.customer_id, src.status, src.total_usd, src.updated_at, src.batch_id
);

SELECT * FROM MERGE_LAB.SILVER.ORDERS ORDER BY order_id;`}
        </CodeBox>
        <SubTitle>Lab checks</SubTitle>
        <BulletList
          items={[
            'Why did O-2 become shipped and not stay pending?',
            'Why did O-2 not create a duplicate row?',
            'What happens when you run the same MERGE again?',
            'How would you modify the lab to handle deletes?',
            'Which row counts would you write to OPS.LOAD_AUDIT?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 20 — Interview answer" />
        <SectionTitle>How to Explain MERGE and Idempotency in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: MERGE lets Snowflake update existing rows and insert new rows
          based on a match condition. The match condition must reflect the target grain, such as one row per
          order_id. Before merging, I deduplicate staging data so there is at most one source row per target
          key. I usually update only when the source record is newer than the target record, and I explicitly
          handle deletes if the source can delete records. For idempotency, rerunning the same batch should
          not create duplicates or change the target incorrectly. I would track batch metadata in a load audit
          table, use watermarks carefully with lookback windows, test reruns, and monitor row counts so
          pipeline incidents are debuggable.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What does MERGE do in Snowflake?',
            'How do you choose the ON clause?',
            'Why should staging data be deduplicated before MERGE?',
            'How do you prevent stale source rows from overwriting newer target rows?',
            'What does idempotency mean in a data pipeline?',
            'How would you test that a MERGE pipeline is rerunnable?',
            'How should deletes and late-arriving data be handled?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'MERGE is Snowflake’s core pattern for upserts.',
          'The ON clause must match the target grain.',
          'Deduplicate staging data before merging.',
          'Use update conditions to avoid overwriting newer data with stale rows.',
          'Idempotent pipelines can rerun safely without duplicates or corruption.',
          'Watermarks, load audit tables, delete handling, and row-count checks make MERGE production-ready.',
          'Test duplicates, stale updates, deletes, reruns, empty batches, and late-arriving records before trusting the pipeline.',
        ]}
      />
    </LearnLayout>
  )
}
