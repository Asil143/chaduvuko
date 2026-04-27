import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Quality — Dimensions, Testing, Monitoring, and Contracts | Chaduvuko',
  description:
    'Data quality from first principles — the six dimensions, dbt tests at every layer, Great Expectations and Soda, anomaly detection, data contracts, and building quality into the pipeline rather than checking it at the end.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 150 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function DataQualityModule() {
  return (
    <LearnLayout
      title="Data Quality — Dimensions, Testing, Monitoring, and Contracts"
      description="The six dimensions of quality, dbt tests at every layer, anomaly detection, data contracts, and building quality into pipelines rather than checking at the end."
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why Data Quality Fails ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Data Quality Fails" />
        <SectionTitle>Data Quality Is an Engineering Problem, Not a Monitoring Problem</SectionTitle>

        <Para>
          The most common data quality approach is reactive: run queries on the
          warehouse after data has been loaded, discover problems, investigate,
          fix, and repeat. This approach produces a data platform where analysts
          distrust the data, engineers spend most of their time on incidents, and
          every new source integration introduces a new class of quality problems.
        </Para>

        <Para>
          The correct approach is preventive: build quality checks into every
          pipeline stage, test at every layer boundary, alert on anomalies before
          analysts hit them, and define quality contracts with source system owners
          so violations are caught at ingestion rather than at Gold. This module
          covers both — the monitoring that catches problems that slip through,
          and the engineering that prevents most problems from arising.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The six dimensions of data quality — and what each means for a pipeline
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { dim: 'Completeness', color: '#00e676', def: 'Are all expected records present? Are required fields populated?', check: 'Row count vs expected range. NOT NULL on required columns. Freshness of last update.' },
              { dim: 'Accuracy', color: '#7b61ff', def: 'Do values correctly represent the real-world state they describe?', check: 'Value range checks. Cross-system reconciliation. Business rule validation.' },
              { dim: 'Consistency', color: '#f97316', def: 'Do the same facts have the same representation across systems and time?', check: 'Referential integrity. Cross-table aggregation reconciliation. Schema consistency.' },
              { dim: 'Timeliness', color: '#4285f4', def: 'Is data available when it is expected? Are updates arriving on schedule?', check: 'Source freshness check. Pipeline SLA monitoring. Load timestamp monitoring.' },
              { dim: 'Uniqueness', color: '#ffd700', def: 'Does each real-world entity appear exactly once? No duplicates in primary keys.', check: 'Primary key uniqueness. Deduplication ratio monitoring. Surrogate key integrity.' },
              { dim: 'Validity', color: '#ff4757', def: 'Do values conform to the expected format, range, and domain rules?', check: 'Accepted values. Pattern matching. Referential integrity. Business rule constraints.' },
            ].map((item) => (
              <div key={item.dim} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderTop: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.dim}</div>
                <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.5, marginBottom: 6 }}>{item.def}</div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>{item.check}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <CodeBox label="The cost of late quality detection — why layer matters">{`WHERE QUALITY IS CAUGHT → COST OF THE PROBLEM:

  SOURCE SYSTEM (before ingestion):
    Caught by: data contract validation at source API / CDC
    Cost: reject the record, log to DLQ, notify source team
    Impact: one bad record rejected. Nothing else affected.
    Notification: warning to data engineering team
    Recovery time: minutes

  BRONZE LAYER (after landing):
    Caught by: schema validation, basic type checks
    Cost: record in DLQ, Bronze intact, Silver/Gold unaffected
    Impact: one source file rejected. Downstream pipelines not triggered.
    Notification: P3 alert to data engineering team
    Recovery time: hours (after source team fixes and resends)

  SILVER LAYER (after transformation):
    Caught by: dbt tests (not_null, unique, accepted_values, relationships)
    Cost: dbt run fails, Silver not updated, Gold build blocked
    Impact: Silver and Gold stale until fixed. Analysts see stale data.
    Notification: P2 alert. SLA at risk.
    Recovery time: hours to a day

  GOLD LAYER (after aggregation):
    Caught by: Gold model tests, row count anomaly detection
    Cost: Gold table has wrong data, dashboards show wrong metrics
    Impact: Finance, operations, product all working from wrong numbers.
    Notification: P1 alert. SLA breached.
    Recovery time: 1-3 days (investigation + fix + rebuild)

  ANALYST DASHBOARD (after analyst queries):
    Caught by: analyst noticing the numbers look wrong
    Cost: analyst escalates to manager, manager to CTO, investigation
    Impact: business decisions already made on wrong data.
    Notification: CEO-level conversation.
    Recovery time: unknown, trust damage lasting weeks

  THE RULE: every layer a quality issue traverses multiplies its cost by 10×.
  A validation check that takes 1 minute to add to a Bronze pipeline
  prevents hours of investigation when it catches a bad file at landing.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 — dbt Tests ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — dbt Tests" />
        <SectionTitle>dbt Tests — The Standard Quality Layer for the Transformation Pipeline</SectionTitle>

        <Para>
          dbt tests are the most widely used data quality mechanism for ELT
          platforms in 2026. They run after every dbt build, catching quality
          issues before Gold tables are consumed. Understanding all four test
          types, how to configure severity levels, and how to write custom
          tests is essential for any dbt-based platform.
        </Para>

        <SubTitle>The four generic dbt tests</SubTitle>

        <CodeBox label="dbt generic tests — complete schema.yml examples">{`# models/silver/_schema.yml
version: 2

models:
  - name: silver_orders
    description: "Cleaned and validated order records. Grain: one row per order."
    columns:
      - name: order_id
        description: "Primary key from source system"
        tests:
          - not_null           # ← catches missing PKs
          - unique             # ← catches duplicates at the grain
          # Severity override: make uniqueness an error, not a warning
          - unique:
              severity: error  # default is 'error'; can be 'warn'

      - name: customer_id
        tests:
          - not_null
          - relationships:     # ← referential integrity to parent table
              to: ref('silver_customers')
              field: customer_id
              severity: warn   # warn not error: some orders arrive before customers

      - name: status
        tests:
          - not_null
          - accepted_values:   # ← domain validation
              values: ['placed', 'confirmed', 'preparing', 'ready',
                       'picked_up', 'delivering', 'delivered', 'cancelled']
              quote: true

      - name: order_amount
        tests:
          - not_null
          - dbt_utils.accepted_range:  # from dbt-utils package
              min_value: 0
              max_value: 500000
              inclusive: true

      - name: order_date
        tests:
          - not_null
          - dbt_utils.not_null_proportion:  # at least 99% of rows must be non-null
              at_least: 0.99                 # use for "usually populated" columns

  - name: silver_customers
    tests:
      # Table-level tests (not column-specific):
      - dbt_utils.equal_rowcount:         # row count must match another model
          compare_model: ref('stg_customers')
      - dbt_utils.recency:                # freshness check
          datepart: hour
          field: updated_at
          interval: 25                    # must have been updated in last 25 hours
    columns:
      - name: customer_id
        tests: [not_null, unique]
      - name: tier
        tests:
          - accepted_values:
              values: ['standard', 'silver', 'gold', 'platinum']

# SOURCES (checking Bronze freshness):
sources:
  - name: bronze
    database: freshmart_prod
    schema: bronze
    tables:
      - name: orders
        freshness:
          warn_after:  {count: 25, period: hour}
          error_after: {count: 49, period: hour}
        loaded_at_field: _bronze_date
        columns:
          - name: order_id
            tests: [not_null]`}</CodeBox>

        <SubTitle>Custom generic tests — writing reusable tests for business rules</SubTitle>

        <CodeBox label="Custom dbt tests — three patterns for real business rules">{`# PATTERN 1: Custom generic test (reusable, parameterised)
# tests/generic/assert_column_sum_equals.sql
# Usage: assert that sum of column A equals sum of column B
# (reconciliation test between two related tables)

{% test assert_column_sum_equals(model, column_name, compare_model, compare_column) %}
WITH model_sum AS (
    SELECT SUM({{ column_name }}) AS total
    FROM {{ model }}
),
compare_sum AS (
    SELECT SUM({{ compare_column }}) AS total
    FROM {{ compare_model }}
)
SELECT
    m.total     AS model_total,
    c.total     AS compare_total,
    ABS(m.total - c.total) AS difference
FROM model_sum m, compare_sum c
WHERE ABS(m.total - c.total) > 0.01  -- allow for rounding
{% endtest %}

# Usage in schema.yml:
# - name: order_amount
#   tests:
#     - assert_column_sum_equals:
#         compare_model: ref('silver_payments')
#         compare_column: payment_amount


# PATTERN 2: Singular test (one-off, model-specific)
# tests/assert_no_negative_amounts.sql
-- This test passes when zero rows are returned.
-- Returns rows that FAIL the quality check.
SELECT order_id, order_amount
FROM {{ ref('silver_orders') }}
WHERE order_amount < 0;


# PATTERN 3: Expression test (inline in schema.yml)
# Checks a condition on each row — fails if any row violates it
# models/silver/_schema.yml
columns:
  - name: delivered_at
    tests:
      - dbt_utils.expression_is_true:
          expression: "delivered_at >= created_at OR delivered_at IS NULL"
          # Every row where delivered_at is set must be after created_at

  - name: order_amount
    tests:
      - dbt_utils.expression_is_true:
          expression: "order_amount >= discount_amount"
          # Discount can never exceed the order amount


# RUNNING dbt TESTS:
dbt test                              # run ALL tests
dbt test -s silver_orders             # test one model
dbt test --select silver.*            # test all silver models
dbt test -s silver_orders --store-failures  # save failing rows to a table

# STORING FAILURES FOR INVESTIGATION:
# With --store-failures: creates tables like dbt_test__audit.not_null_silver_orders_order_id
# Each table contains the rows that failed the test
# Query to investigate: SELECT * FROM dbt_test__audit.not_null_silver_orders_order_id

# TEST SEVERITY LEVELS:
# severity: error (default) — dbt exits with non-zero code, blocks downstream
# severity: warn             — test failure logged but build continues
# Use 'warn' for: expected occasional nulls, cross-table relationships
#                 where upstream may lag (orders before customers)
# Use 'error' for: primary keys, critical business constraints`}</CodeBox>

        <SubTitle>Testing strategy by layer — what to test where</SubTitle>

        <CompareTable
          headers={[
            { label: 'Layer' },
            { label: 'What to test', color: '#00e676' },
            { label: 'Severity', color: '#f97316' },
            { label: 'Blocks downstream?', color: '#7b61ff' },
          ]}
          keys={['layer', 'what', 'severity', 'blocks']}
          rows={[
            { layer: 'Source (Bronze)', what: 'Schema existence, file freshness, basic row count range', severity: 'warn for freshness, error for missing schema', blocks: 'Warn only — Bronze always loads raw' },
            { layer: 'Staging (stg_)', what: 'not_null on PK, accepted_values on categoricals, basic type validity', severity: 'error on PK, warn on domain checks', blocks: 'Yes — stale staging blocks Silver' },
            { layer: 'Silver', what: 'Uniqueness on PK, not_null on required fields, relationships to dims, value ranges, freshness', severity: 'error on PK+nulls, warn on relationships', blocks: 'Yes — bad Silver blocks Gold' },
            { layer: 'Gold', what: 'Row count vs historical average (anomaly), sum reconciliation to Silver, business metric ranges', severity: 'error on sum reconciliation, warn on anomalies', blocks: 'Yes — bad Gold blocks dashboard load' },
            { layer: 'Source freshness', what: 'loaded_at_field within expected window', severity: 'warn for 25h, error for 49h', blocks: 'No — freshness alerts only' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — Anomaly Detection ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Anomaly Detection" />
        <SectionTitle>Anomaly Detection — Catching What Rule-Based Tests Miss</SectionTitle>

        <Para>
          Static rule-based tests (not_null, accepted_values, range checks) catch
          known violations. Anomaly detection catches unknown violations — unusual
          patterns that no rule was written for. A Silver table suddenly receiving
          90% fewer rows than yesterday. A metric that was never negative suddenly
          showing negative values. An order amount column whose mean doubled.
          These are not rule violations — they are anomalies, and rule-based
          tests will not catch them.
        </Para>

        <CodeBox label="Anomaly detection — statistical approaches for pipeline monitoring">{`# APPROACH 1: Row count anomaly detection
# Compare today's row count to the rolling 7-day average
# Alert if count deviates more than 30%

-- models/monitoring/mon_row_count_check.sql
WITH daily_counts AS (
    SELECT
        DATE(ingested_at)    AS load_date,
        COUNT(*)             AS row_count
    FROM silver.orders
    WHERE ingested_at >= CURRENT_DATE - 30
    GROUP BY 1
),
stats AS (
    SELECT
        load_date,
        row_count,
        AVG(row_count) OVER (
            ORDER BY load_date
            ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
        )                    AS rolling_7d_avg,
        STDDEV(row_count) OVER (
            ORDER BY load_date
            ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING
        )                    AS rolling_7d_stddev
    FROM daily_counts
)
SELECT
    load_date,
    row_count,
    ROUND(rolling_7d_avg, 0)                      AS expected_avg,
    ROUND(ABS(row_count - rolling_7d_avg)
          / NULLIF(rolling_7d_avg, 0) * 100, 1)   AS pct_deviation,
    CASE
        WHEN ABS(row_count - rolling_7d_avg)
             / NULLIF(rolling_7d_avg, 0) > 0.5    THEN 'CRITICAL'
        WHEN ABS(row_count - rolling_7d_avg)
             / NULLIF(rolling_7d_avg, 0) > 0.3    THEN 'WARNING'
        ELSE 'OK'
    END                                            AS status
FROM stats
WHERE load_date = CURRENT_DATE;
-- Run after every pipeline load. Alert if status != 'OK'.


# APPROACH 2: Z-score based anomaly on numeric distributions
# Alert if today's metric is more than 3 standard deviations from the recent mean

def detect_metric_anomaly(
    metric_name: str,
    today_value: float,
    historical_values: list[float],
    z_threshold: float = 3.0,
) -> dict:
    import statistics
    if len(historical_values) < 7:
        return {'status': 'insufficient_history', 'z_score': None}

    mean   = statistics.mean(historical_values)
    stdev  = statistics.stdev(historical_values)

    if stdev == 0:
        return {'status': 'no_variance', 'z_score': 0}

    z_score = abs(today_value - mean) / stdev
    status  = 'ANOMALY' if z_score > z_threshold else 'OK'

    return {
        'metric':      metric_name,
        'today_value': today_value,
        'mean':        round(mean, 2),
        'stdev':       round(stdev, 2),
        'z_score':     round(z_score, 2),
        'status':      status,
    }

# Example usage after Gold model runs:
result = detect_metric_anomaly(
    metric_name       = 'daily_revenue',
    today_value       = query_gold_revenue(date='2026-03-17'),
    historical_values = query_gold_revenue(last_n_days=30),
    z_threshold       = 3.0,
)
if result['status'] == 'ANOMALY':
    send_alert(f"Revenue anomaly: z_score={result['z_score']}, "
               f"today={result['today_value']}, avg={result['mean']}")


# APPROACH 3: dbt-utils recency test — source freshness
# models/silver/_schema.yml
sources:
  - name: bronze
    tables:
      - name: orders
        loaded_at_field: ingested_at
        freshness:
          warn_after:  {count: 2, period: hour}    # warn if > 2 hours stale
          error_after: {count: 6, period: hour}    # error if > 6 hours stale

# Run: dbt source freshness
# Returns: each source table's age vs threshold
# Integrates with Airflow: run dbt source freshness as a task,
# fail the DAG if any source exceeds the error threshold.


# APPROACH 4: Elementary dbt package — automated anomaly detection
# Elementary adds automatic anomaly detection to every dbt model:
# pip install elementary-data

# In dbt_project.yml:
# models:
#   +elementary:
#     time_bucket:
#       period: day
#       count: 1

# Elementary automatically tracks for every model:
#   - row count per period
#   - null % per column per period
#   - distinct value count per column per period
# Alerts when any metric deviates beyond a configurable threshold.
# No rule writing required — learns from historical patterns.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Great Expectations and Soda ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Great Expectations and Soda" />
        <SectionTitle>Great Expectations and Soda — Pipeline-Native Quality Frameworks</SectionTitle>

        <Para>
          dbt tests run after the transformation step. Great Expectations and
          Soda can run at any point in the pipeline — on raw files before ingestion,
          on Bronze data before Silver transformation, or on API responses before
          they are written to the lake. They are particularly valuable for
          validating data quality at the source boundary, before bad data enters
          the Medallion Architecture.
        </Para>

        <SubTitle>Great Expectations — expectations suites in Python</SubTitle>

        <CodeBox label="Great Expectations — validate a file before ingestion">{`"""
Great Expectations: validate a vendor CSV file
before loading it to Bronze.
If validation fails: send file to quarantine, alert, do not load.
"""
import great_expectations as gx
from great_expectations.core.batch import RuntimeBatchRequest
from pathlib import Path
import pandas as pd

context = gx.get_context()   # loads configuration from great_expectations.yml

def validate_vendor_file(file_path: str, pipeline_run_id: str) -> bool:
    """
    Validate a vendor CSV against defined expectations.
    Returns True if all critical expectations pass.
    Quarantines file and alerts if critical expectations fail.
    """
    df = pd.read_csv(file_path)

    # Create a batch from the DataFrame
    batch_request = RuntimeBatchRequest(
        datasource_name   = "pandas_datasource",
        data_connector_name = "runtime_data_connector",
        data_asset_name   = "vendor_deliveries",
        runtime_parameters = {"batch_data": df},
        batch_identifiers  = {"run_id": pipeline_run_id},
    )

    # Run the expectation suite against the batch
    checkpoint_result = context.run_checkpoint(
        checkpoint_name = "vendor_deliveries_checkpoint",
        validations     = [{
            "batch_request":      batch_request,
            "expectation_suite_name": "vendor_deliveries.critical",
        }],
    )

    success = checkpoint_result.success

    if not success:
        # Move to quarantine, log, alert
        quarantine_path = Path('/data/quarantine') / Path(file_path).name
        Path(file_path).rename(quarantine_path)
        send_alert(
            f'Vendor file failed validation: {file_path}. '
            f'Quarantined at: {quarantine_path}. '
            f'See GE report for details.'
        )
        return False

    return True


# EXPECTATION SUITE DEFINITION (vendor_deliveries.critical):
# Created via GE CLI: great_expectations suite new

# suite.add_expectation(
#     gx.expectations.ExpectColumnValuesToNotBeNull(
#         column="delivery_id",
#         result_format="SUMMARY",
#     )
# )
# suite.add_expectation(
#     gx.expectations.ExpectColumnValuesToBeUnique(column="delivery_id")
# )
# suite.add_expectation(
#     gx.expectations.ExpectColumnValuesToBeBetween(
#         column="delivery_fee",
#         min_value=0,
#         max_value=5000,
#         mostly=0.99,    # allow 1% exceptions (outliers)
#     )
# )
# suite.add_expectation(
#     gx.expectations.ExpectColumnValuesToMatchRegex(
#         column="delivery_date",
#         regex=r"^\d{4}-\d{2}-\d{2}\$",  # YYYY-MM-DD format
#     )
# )
# suite.add_expectation(
#     gx.expectations.ExpectTableRowCountToBeBetween(
#         min_value=1000,
#         max_value=500000,
#     )
# )`}</CodeBox>

        <SubTitle>Soda — SQL-native quality checks with YAML configuration</SubTitle>

        <CodeBox label="Soda — declarative quality checks on warehouse tables">{`# Soda is YAML-based quality checking that runs SQL against your warehouse.
# Simpler than Great Expectations for SQL-native checks.
# Integrates directly with Airflow, Spark, dbt.

# SODA CHECK FILE: checks/silver_orders.yml
checks for silver_orders:

  # Completeness:
  - row_count > 10000:
      name: Minimum row count — pipeline produced data
  - missing_count(order_id) = 0:
      name: No missing order IDs
  - missing_percent(customer_id) < 0.1:
      name: Customer ID present on at least 99.9% of orders

  # Uniqueness:
  - duplicate_count(order_id) = 0:
      name: No duplicate order IDs

  # Validity:
  - invalid_count(status) = 0:
      name: All statuses are valid
      valid values: [placed, confirmed, preparing, ready,
                     picked_up, delivering, delivered, cancelled]
  - min(order_amount) >= 0:
      name: No negative order amounts
  - max(order_amount) < 500000:
      name: No suspiciously large amounts

  # Timeliness:
  - freshness(updated_at) < 2h:
      name: Data is less than 2 hours old

  # Custom SQL check:
  - failed rows:
      name: Delivered orders must have delivered_at populated
      fail query: |
        SELECT order_id FROM silver_orders
        WHERE status = 'delivered'
          AND delivered_at IS NULL

# RUN SODA CHECKS:
# soda scan -d freshmart_snowflake checks/silver_orders.yml

# AIRFLOW INTEGRATION:
from airflow.operators.python import PythonOperator

def run_soda_checks(**context):
    from soda.scan import Scan
    scan = Scan()
    scan.set_data_source_name("freshmart_snowflake")
    scan.add_configuration_yaml_file(file_path="soda_config.yml")
    scan.add_sodacl_yaml_files(path="checks/silver_orders.yml")
    scan.set_scan_definition_name("silver_orders_daily")
    scan.execute()
    if scan.has_error_logs() or scan.get_error_count() > 0:
        raise ValueError(
            f"Soda checks failed: {scan.get_error_count()} errors. "
            f"See Soda Cloud for details."
        )

quality_check_task = PythonOperator(
    task_id='soda_silver_orders',
    python_callable=run_soda_checks,
)

dbt_silver_task >> quality_check_task >> dbt_gold_task
# Quality gate between Silver and Gold: Gold only runs if checks pass`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Data Contracts ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Data Contracts" />
        <SectionTitle>Data Contracts — Quality Agreements With Source Teams</SectionTitle>

        <Para>
          A data contract is a formal, versioned agreement between a data producer
          (the team that owns a source system) and a data consumer (the data
          engineering team that ingests it) that defines what data will be provided,
          in what format, with what quality guarantees, and on what schedule. It
          is enforced at ingestion time — violations are caught at the source
          boundary rather than discovered in Gold tables hours later.
        </Para>

        <Para>
          Data contracts are the most powerful quality intervention available
          because they move quality responsibility to the source. When source
          teams know their API or data export is validated against a contract,
          they own the quality of their output rather than discovering problems
          through an angry email from the data engineering team.
        </Para>

        <CodeBox label="Data contract definition — the structure and enforcement">{`# DATA CONTRACT: orders_api_v2
# Producer: FreshCart Orders Service Team
# Consumer: Data Engineering
# Effective: 2026-01-01
# Version:   2.3.1

# contracts/orders_api_v2.yml
id:           orders_api_v2
version:      2.3.1
status:       active
owner:        orders-team@freshmart.com
consumer:     data-engineering@freshmart.com

# SLA commitments:
sla:
  schedule:   "every 15 minutes"
  latency_sla: "data available within 5 minutes of order event"
  uptime:     "99.5% monthly"

# Schema contract:
schema:
  fields:
    - name: order_id
      type: integer
      required: true
      unique: true
      description: "Unique order identifier"

    - name: customer_id
      type: integer
      required: true
      description: "Customer who placed this order"

    - name: order_amount
      type: decimal(10, 2)
      required: true
      constraints:
        min: 0
        max: 500000

    - name: status
      type: string
      required: true
      allowed_values:
        - placed
        - confirmed
        - preparing
        - ready
        - picked_up
        - delivering
        - delivered
        - cancelled

    - name: created_at
      type: timestamp_tz
      required: true

    - name: updated_at
      type: timestamp_tz
      required: true

# Quality commitments (what producer guarantees):
quality:
  completeness:
    - "order_id is never null"
    - "status is never null"
    - "row_count is within ±20% of 7-day rolling average"

  timeliness:
    - "data delivered within 5 minutes of event"
    - "no more than 0.1% late-arriving records beyond 30 minutes"

  schema_changes:
    breaking_change_notice: "30 days minimum before any breaking change"
    additive_change_notice: "7 days minimum before adding new fields"

# CONTRACT ENFORCEMENT IN PYTHON:
from dataclasses import dataclass, field
from typing import Any
import yaml

@dataclass
class ContractViolation:
    field: str
    constraint: str
    actual_value: Any
    severity: str   # 'error' | 'warning'

def validate_against_contract(
    df,
    contract_path: str,
) -> list[ContractViolation]:
    """
    Validate a DataFrame against a data contract YAML.
    Returns list of violations (empty = passes contract).
    """
    with open(contract_path) as f:
        contract = yaml.safe_load(f)

    violations = []

    for field_spec in contract['schema']['fields']:
        field_name = field_spec['name']

        # Required field check:
        if field_spec.get('required') and field_name not in df.columns:
            violations.append(ContractViolation(
                field=field_name, constraint='required_field_missing',
                actual_value=None, severity='error',
            ))
            continue

        if field_spec.get('required'):
            null_count = df[field_name].isna().sum()
            if null_count > 0:
                violations.append(ContractViolation(
                    field=field_name, constraint='not_null',
                    actual_value=null_count, severity='error',
                ))

        # Allowed values check:
        if 'allowed_values' in field_spec:
            invalid = df[field_name].dropna()[
                ~df[field_name].dropna().isin(field_spec['allowed_values'])
            ]
            if len(invalid) > 0:
                violations.append(ContractViolation(
                    field=field_name, constraint='allowed_values',
                    actual_value=invalid.unique().tolist()[:5],
                    severity='error',
                ))

        # Range constraints:
        if 'constraints' in field_spec:
            c = field_spec['constraints']
            if 'min' in c:
                below = (df[field_name] < c['min']).sum()
                if below > 0:
                    violations.append(ContractViolation(
                        field=field_name, constraint=f'min_value_{c["min"]}',
                        actual_value=below, severity='error',
                    ))

    return violations`}</CodeBox>

        <SubTitle>Schema registry for data contracts</SubTitle>

        <CodeBox label="Schema registry — version control for data contracts">{`# A schema registry is a central repository of data contract schemas.
# Producers register their schemas. Consumers validate against registered schemas.
# Breaking changes are detected before they reach production.

# CONFLUENT SCHEMA REGISTRY (for Kafka/CDC events — covered in Module 24)
# For warehouse/API contracts: use a Git-based schema registry.

# STRUCTURE: Git repository as schema registry
# contracts/
#   orders_api/
#     v1.0.0.yml   ← original schema
#     v2.0.0.yml   ← breaking change (removed a field)
#     v2.3.1.yml   ← current
#   payments_api/
#     v1.0.0.yml
#     v1.2.0.yml   ← current
#   CHANGELOG.md   ← all breaking changes documented

# CI PIPELINE CHECK: when orders_api schema changes, run validation
# .github/workflows/contract_check.yml:
# on:
#   pull_request:
#     paths:
#       - 'contracts/orders_api/**'
# jobs:
#   validate:
#     steps:
#       - run: python validate_contract_backwards_compatible.py

def is_breaking_change(old_schema: dict, new_schema: dict) -> list[str]:
    """
    Detect breaking changes between two contract versions.
    Returns list of breaking change descriptions.
    """
    breaking = []

    old_fields  = {f['name']: f for f in old_schema['schema']['fields']}
    new_fields  = {f['name']: f for f in new_schema['schema']['fields']}

    # Field removed → breaking
    for name in old_fields:
        if name not in new_fields:
            breaking.append(f"Field '{name}' removed — consumers may break")

    # Required field added → breaking (existing data has no value)
    for name, spec in new_fields.items():
        if name not in old_fields and spec.get('required'):
            breaking.append(f"New required field '{name}' added — existing data invalid")

    # Field type changed → breaking
    for name in old_fields:
        if name in new_fields:
            old_type = old_fields[name]['type']
            new_type = new_fields[name]['type']
            if old_type != new_type:
                breaking.append(f"Field '{name}' type changed: {old_type} → {new_type}")

    # Allowed values narrowed → breaking
    for name in old_fields:
        if name in new_fields:
            old_allowed = set(old_fields[name].get('allowed_values', []))
            new_allowed = set(new_fields[name].get('allowed_values', []))
            if old_allowed and new_allowed and not new_allowed.issuperset(old_allowed):
                removed = old_allowed - new_allowed
                breaking.append(f"Field '{name}': allowed values {removed} removed")

    return breaking`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Quality Monitoring Dashboard ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Monitoring and Alerting" />
        <SectionTitle>Quality Monitoring — The Operational Layer</SectionTitle>

        <Para>
          Tests and contracts catch specific known problems. Quality monitoring
          provides the ongoing operational picture — which tables are healthy,
          which pipelines are meeting their SLAs, and what the trend of quality
          issues looks like over time. This requires a monitoring schema in the
          data platform itself.
        </Para>

        <CodeBox label="Quality monitoring schema — tracking all quality checks over time">{`-- QUALITY MONITORING SCHEMA:

CREATE TABLE monitoring.data_quality_results (
    check_id         UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
    run_id           UUID         NOT NULL,       -- pipeline run ID
    pipeline_name    VARCHAR(100) NOT NULL,
    table_name       VARCHAR(200) NOT NULL,
    check_name       VARCHAR(200) NOT NULL,
    check_type       VARCHAR(50)  NOT NULL,       -- 'dbt_test', 'soda', 'custom', 'anomaly'
    dimension        VARCHAR(50),                 -- 'completeness', 'uniqueness', etc.
    status           VARCHAR(10)  NOT NULL,       -- 'pass', 'fail', 'warn'
    severity         VARCHAR(10)  NOT NULL,       -- 'error', 'warning', 'info'
    row_count        BIGINT,                      -- rows checked
    failure_count    BIGINT,                      -- rows that failed
    failure_rate     DECIMAL(6,4),               -- failure_count / row_count
    check_value      DECIMAL(20,4),               -- the actual measured value
    threshold_value  DECIMAL(20,4),               -- the expected/threshold value
    message          TEXT,                        -- human-readable explanation
    checked_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Indexes for common query patterns:
CREATE INDEX idx_dq_table_date ON monitoring.data_quality_results
    (table_name, checked_at);
CREATE INDEX idx_dq_status_date ON monitoring.data_quality_results
    (status, checked_at) WHERE status IN ('fail', 'warn');


-- DAILY QUALITY SCORECARD:
SELECT
    table_name,
    DATE(checked_at)                           AS check_date,
    COUNT(*)                                   AS total_checks,
    SUM(CASE WHEN status = 'pass' THEN 1 ELSE 0 END) AS passed,
    SUM(CASE WHEN status = 'fail' THEN 1 ELSE 0 END) AS failed,
    SUM(CASE WHEN status = 'warn' THEN 1 ELSE 0 END) AS warnings,
    ROUND(SUM(CASE WHEN status = 'pass' THEN 1 ELSE 0 END)::NUMERIC
          / COUNT(*) * 100, 1)                 AS pass_rate_pct
FROM monitoring.data_quality_results
WHERE checked_at >= CURRENT_DATE - 30
GROUP BY 1, 2
ORDER BY 2 DESC, 5 DESC;


-- QUALITY TREND (is quality improving or degrading?):
WITH weekly AS (
    SELECT
        DATE_TRUNC('week', checked_at)         AS week_start,
        table_name,
        SUM(CASE WHEN status = 'fail' THEN 1 ELSE 0 END) AS failures
    FROM monitoring.data_quality_results
    WHERE checked_at >= CURRENT_DATE - 90
    GROUP BY 1, 2
)
SELECT
    week_start,
    table_name,
    failures,
    LAG(failures) OVER (PARTITION BY table_name ORDER BY week_start)
                                               AS prev_week_failures,
    failures - LAG(failures) OVER (PARTITION BY table_name ORDER BY week_start)
                                               AS week_over_week_change
FROM weekly
ORDER BY week_start DESC, table_name;


-- ALERT QUERY: tables with > 10% failure rate today:
SELECT table_name, check_name, failure_rate, message
FROM monitoring.data_quality_results
WHERE DATE(checked_at) = CURRENT_DATE
  AND status = 'fail'
  AND severity = 'error'
ORDER BY failure_rate DESC;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — dbt Expectations and the Quality Pipeline ──────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Building the Quality Pipeline" />
        <SectionTitle>Putting It Together — The Quality-First Pipeline Architecture</SectionTitle>

        <Para>
          A quality-first pipeline integrates tests and validation at every
          stage, with results flowing into the monitoring system. The goal
          is to make quality failure visible before analysts are affected —
          not after.
        </Para>

        <CodeBox label="Quality-first pipeline architecture — Airflow DAG with quality gates">{`# QUALITY-GATED AIRFLOW DAG:
# Each pipeline stage has a quality gate that blocks downstream tasks.
# Quality results are written to monitoring.data_quality_results.

with DAG('freshmart_morning_pipeline', ...) as dag:

    # ── Stage 1: Extract → Bronze ─────────────────────────────────────────────
    extract_orders = PythonOperator(
        task_id='extract_orders',
        python_callable=run_extraction,
    )

    # Quality gate 1: validate Bronze source freshness and schema
    bronze_quality = BashOperator(
        task_id='bronze_quality_check',
        bash_command='dbt source freshness --select source:bronze.orders',
        # Fails DAG if source is stale beyond error threshold
    )

    # ── Stage 2: Bronze → Silver ──────────────────────────────────────────────
    dbt_silver = BashOperator(
        task_id='dbt_silver',
        bash_command=(
            'dbt run --select staging.* silver.* '
            '--vars \'{"run_date": "{{ ds }}"}\''
        ),
    )

    # Quality gate 2: dbt tests on Silver models
    silver_tests = BashOperator(
        task_id='silver_quality_tests',
        bash_command=(
            'dbt test --select silver.* '
            '--store-failures '      # save failing rows to audit tables
            '--vars \'{"run_date": "{{ ds }}"}\''
        ),
    )

    # Quality gate 3: Soda anomaly check on Silver
    def soda_silver_check(**context):
        from soda.scan import Scan
        scan = Scan()
        scan.set_data_source_name('freshmart_snowflake')
        scan.add_sodacl_yaml_files(path='checks/silver_orders.yml')
        scan.execute()

        # Write results to monitoring schema:
        write_soda_results_to_monitoring(scan, context['run_id'])

        if scan.has_error_logs():
            raise ValueError(f'Soda anomaly check failed for Silver orders')

    silver_anomaly = PythonOperator(
        task_id='silver_anomaly_check',
        python_callable=soda_silver_check,
    )

    # ── Stage 3: Silver → Gold ────────────────────────────────────────────────
    dbt_gold = BashOperator(
        task_id='dbt_gold',
        bash_command='dbt run --select gold.*',
    )

    # Quality gate 4: Gold reconciliation tests
    gold_tests = BashOperator(
        task_id='gold_quality_tests',
        bash_command='dbt test --select gold.*',
    )

    # ── Stage 4: Notify if quality passed ────────────────────────────────────
    def post_pipeline_quality_report(**context):
        """Send quality summary to Slack after successful pipeline."""
        result = query_quality_results(date=context['ds'])
        send_slack_message(
            channel='#data-quality',
            text=(
                f'Pipeline quality: {result.pass_rate}% checks passed. '
                f'{result.total_failures} failures. '
                f'See: https://quality.freshmart.internal/'
            ),
        )

    quality_report = PythonOperator(
        task_id='quality_report',
        python_callable=post_pipeline_quality_report,
        trigger_rule='all_done',    # runs whether upstream passed or failed
    )

    # ── Dependency graph ──────────────────────────────────────────────────────
    (extract_orders
     >> bronze_quality
     >> dbt_silver
     >> silver_tests
     >> silver_anomaly
     >> dbt_gold
     >> gold_tests
     >> quality_report)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Source System Silently Changes an Enum — Catching It at the Contract Boundary</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Orders team adds new order status without notice
          </div>

          <Para>
            The orders application team added a new status value — "scheduled"
            — for a new pre-order feature. They deployed it on Friday evening
            without notifying the data engineering team. By Monday morning,
            12,847 orders with status="scheduled" were rejected from Silver
            by the accepted_values dbt test and sitting in the DLQ. The finance
            dashboard showed no pre-order revenue. An analyst noticed on Tuesday.
          </Para>

          <CodeBox label="Incident trace and quality system response">{`-- TUESDAY 09:15 — analyst reports revenue lower than expected

-- STEP 1: Check Silver dbt test failures
SELECT run_id, check_name, failure_count, message, checked_at
FROM monitoring.data_quality_results
WHERE table_name = 'silver_orders'
  AND status = 'fail'
  AND checked_at >= '2026-03-14'   -- since Friday
ORDER BY checked_at DESC;

-- Returns:
-- run-001  accepted_values_silver_orders_status  12847  "Values not in set: ['scheduled']"  2026-03-14 18:07
-- run-002  accepted_values_silver_orders_status  14203  "Values not in set: ['scheduled']"  2026-03-14 20:07
-- ... 47 more runs, all failing on the same check

-- 12,847 to 14,203 rows rejected per run over 47 runs.
-- Total in DLQ: ~600,000 rows of pre-order data.
-- All rejected because 'scheduled' is not in VALID_STATUSES.

-- STEP 2: Verify the root cause
SELECT DISTINCT status FROM bronze.orders
WHERE _bronze_date >= '2026-03-14';
-- Returns: placed, confirmed, delivering, delivered, cancelled, scheduled ← new

SELECT COUNT(*), MIN(_bronze_date) FROM bronze.orders
WHERE status = 'scheduled';
-- Returns: 598,234 rows, first seen: 2026-03-14 17:51

-- STEP 3: Impact assessment
SELECT SUM(order_amount) AS unloaded_revenue
FROM bronze.orders
WHERE status = 'scheduled';
-- Returns: ₹4.82 million unloaded to Silver/Gold

-- STEP 4: Fix and reprocess
-- a) Update VALID_STATUSES in pipeline/validate.py to include 'scheduled'
-- b) Update dbt schema.yml accepted_values to include 'scheduled'
-- c) Update the data contract: contracts/orders_api_v2.yml version bump
-- d) Reprocess DLQ:
python dlq_reprocess.py \
    --pipeline orders_incremental \
    --start-date 2026-03-14 \
    --force-reload

-- STEP 5: Verify fix
SELECT COUNT(*) FROM silver.orders WHERE status = 'scheduled';
-- Returns: 598,234 ← all reprocessed correctly

-- TOTAL IMPACT:
-- Data missing from Silver/Gold: 2 days and 14 hours
-- Revenue gap in dashboards: ₹4.82 million for 67 hours
-- Root cause: no data contract enforcement for enum changes
-- Prevention going forward:
--   Data contract updated to require 30-day notice for enum changes
--   New CI check on contracts/orders_api_v2.yml: any new allowed_values
--   must be reviewed and approved by data engineering before deployment
--   Elementary added for automated anomaly detection on Silver row counts
--   (the Z-score anomaly would have caught this Friday evening, not Tuesday)`}</CodeBox>

          <Para>
            The incident was caught by dbt's accepted_values test — exactly as
            designed. The failure was in the process: no data contract enforcement
            meant the orders team had no way to know their enum change would break
            the downstream pipeline. The prevention is the data contract with a CI
            check that blocks source deployment if enum values are added without
            prior notification to consumers.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What are the six dimensions of data quality and how does each manifest in a data pipeline?',
            a: `The six dimensions of data quality are completeness, accuracy, consistency, timeliness, uniqueness, and validity. Each manifests as a specific class of pipeline problem.

Completeness addresses whether all expected records are present and required fields are populated. In a pipeline, this is a row count check (did we receive the expected number of orders today?) and a NOT NULL check on required fields. A Silver table with 30% fewer rows than yesterday is a completeness problem.

Accuracy addresses whether values correctly represent the real-world state they describe. This is harder to test automatically and often requires cross-system reconciliation — does the order_amount in Silver match the payment_amount in the payments system for the same order? Accuracy problems are often caused by transformation bugs.

Consistency addresses whether the same facts have the same representation across systems and time. Referential integrity is a consistency test — does every customer_id in fct_orders have a corresponding row in dim_customer? Schema consistency — do column types match across environments — is another.

Timeliness addresses whether data is available when expected. Source freshness checks (dbt source freshness) measure this. A pipeline that was supposed to load data by 6 AM but has not updated since 2 AM has a timeliness problem.

Uniqueness addresses whether each real-world entity appears exactly once. The dbt unique test on primary keys catches this. Duplicate order_ids in Silver are a uniqueness problem.

Validity addresses whether values conform to expected format, range, and domain rules. The accepted_values test catches invalid enum values. Range checks catch negative amounts. Pattern matching catches malformed identifiers. Referential integrity catches orphaned foreign keys.

In a well-designed pipeline: dbt tests cover completeness, uniqueness, and validity automatically. Anomaly detection covers completeness trends and accuracy signals. Cross-system reconciliation tests cover accuracy and consistency. Source freshness monitoring covers timeliness.`,
          },
          {
            q: 'Q2. How do you structure dbt tests across the Bronze, Silver, and Gold layers? What tests belong where?',
            a: `The testing strategy differs by layer based on what each layer guarantees and what a failure at that layer means for downstream consumers.

At the source/Bronze boundary, tests focus on schema existence and source freshness. dbt source freshness checks whether the source table's loaded_at_field is within the expected window — a warn threshold at 25 hours, an error threshold at 49 hours for a daily pipeline. Schema tests at this level verify that expected columns exist before the staging models try to reference them.

At the staging layer (stg_ models), tests enforce basic validity. not_null on the primary key catches records that cannot be meaningfully processed. accepted_values on critical categoricals catches invalid status values early, before they propagate. These tests are typically configured with severity: error so a bad staging model fails loudly and blocks Silver.

At the Silver layer, the full suite runs. not_null and unique on every primary key (error severity). Referential integrity — relationships tests — verify that foreign keys in fact tables exist in their referenced dimension tables (typically warn severity, since upstream tables may lag by one pipeline interval). Value range tests on amounts and quantities. Freshness tests to ensure Silver was updated within the expected interval. These tests block Gold if they fail.

At the Gold layer, tests focus on aggregate reconciliation. The sum of order_amount in Gold daily revenue should equal the sum from Silver for the same period and filter. Row count anomaly checks compare today's Gold row count to the 7-day rolling average. These tests catch transformation bugs that slipped through Silver tests. Gold tests are the last line of defence before analyst consumption.

The principle is: fail early, fail loudly, block downstream. A test at Silver is ten times cheaper than detecting the same problem at Gold, and a hundred times cheaper than an analyst discovering it after using the wrong data in a report.`,
          },
          {
            q: 'Q3. What is a data contract and how does it help with data quality?',
            a: `A data contract is a formal, versioned agreement between a data producer — the team that owns a source system or API — and a data consumer — the data engineering team that ingests it. It specifies what data will be provided, in what schema, with what quality guarantees, and on what schedule. It is enforced at ingestion time: data that violates the contract is rejected before it enters the pipeline.

The key insight is that data contracts move quality responsibility to the source. Without contracts, the data engineering team discovers that the orders API added a new status value when 12,000 records are rejected from Silver on a Monday morning. With contracts, the orders team's CI pipeline runs a compatibility check when they modify their data schema — the check fails if the change would violate the contract (a new required field, a removed field, a type change, a new enum value without prior approval). The source team cannot ship the breaking change without first updating the contract and giving the required notice period.

A data contract typically defines the schema with field names, types, and constraints; quality commitments such as null rates, row count ranges, and freshness guarantees; SLA commitments for delivery schedule and latency; and change management rules specifying how much notice is required for breaking versus additive changes.

Contracts are most valuable at the source boundary — before data enters Bronze. A contract violation at ingestion costs one DLQ record. The same violation discovered after it has propagated through Silver and Gold to analyst dashboards costs days of investigation and erodes trust in the platform.

In practice, contracts are YAML files in a Git repository. A CI pipeline runs a breaking-change detector when contracts are modified. Source teams must get a contract change approved by data engineering before deploying a schema change to production.`,
          },
          {
            q: 'Q4. Describe the difference between rule-based quality checks and anomaly detection. When would you use each?',
            a: `Rule-based quality checks test specific known constraints — not_null, accepted_values, minimum and maximum values, referential integrity. They are deterministic: a row either passes or fails a rule. They are excellent at catching known violation classes and have zero false positive rate for correctly specified rules.

Anomaly detection catches statistical deviations from historical norms — patterns that no rule was written for. A table receiving 90% fewer rows than its historical average. An order amount column whose median doubled. A null rate that went from 0.1% to 15% overnight. These are not rule violations — no rule says "the null rate cannot increase by 150x in one day" — but they are clearly wrong.

The two approaches are complementary. Rules catch known problem classes with precision. Anomaly detection catches unknown problem classes that emerge from source changes, infrastructure issues, or business events.

Use rule-based tests for: schema validation (primary keys, not_null, accepted_values, referential integrity), business constraints that are always true regardless of volume, and quality gates that must block downstream processing on failure. These run in dbt as part of the build pipeline.

Use anomaly detection for: monitoring metric distributions that should be relatively stable over time, detecting sudden changes in source data patterns without writing explicit rules for each, and providing early warning before a rule violation propagates. These run after data is loaded, as monitoring queries or via tools like Elementary or Monte Carlo.

The practical setup for most platforms: dbt tests for all known rules, plus row count anomaly detection (rolling average ± 30%) and null rate tracking for all Silver and Gold tables. This combination catches both the specific violations you anticipated and the surprising ones you did not.`,
          },
          {
            q: 'Q5. A data quality incident occurs: a Gold metric has been wrong for 3 days. Walk me through how you would investigate and fix it.',
            a: `This is a structured investigation that uses the monitoring infrastructure to isolate the problem layer, the pipeline to determine the cause, and the reprocessing pipeline to fix it.

The first step is to quantify the impact. How wrong is the metric, for how many days, and what decisions may have been made on wrong data? This determines urgency and whether stakeholders need to be notified immediately. Query the monitoring table to see when the quality checks for the affected Gold model last passed versus failed.

The second step is layer isolation. Query the Gold table and the Silver table with the same filter for the affected period. If Gold matches Silver: the Gold transformation logic is correct and the problem is in Silver or earlier. If Gold differs from Silver: there is a Gold transformation bug. This immediately halves the search space.

The third step is tracing through the layers. If Silver has the problem: compare Silver row counts to Bronze row counts for the affected period. A difference indicates rows being rejected in validation. Check the DLQ for the affected dates — the rejection reason will be explicit. If the Bronze and Silver counts match: the Silver transformation has a bug.

The fourth step is root cause identification. Common causes: a new enum value from the source that was rejected by accepted_values (check DLQ), a source schema change that caused a type error (check Bronze vs staging model), a dbt model bug introduced in a recent deployment (check dbt model commit history for changes in the past 3 days), or an upstream data issue in the source system.

The fifth step is fixing and reprocessing. Fix the root cause in code, then reprocess the affected date range from the earliest correct layer. If Bronze has correct data, reprocess Silver from Bronze for the 3 affected days, then rebuild Gold. If Bronze has wrong data, re-extract from source for those days. Run dbt tests after reprocessing to verify the fix. Notify stakeholders with a post-incident summary: what was wrong, why, how long, what was done, and what prevents recurrence.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `dbt test passes for months then suddenly fails on unique(order_id) with 47,293 duplicate rows — no code changed`,
            cause: 'The source system had a silent bug that caused order_id to be reassigned when orders were cancelled and re-placed. The same order_id was used for two different orders. The dbt unique test only runs after data is loaded — the duplicates were in Silver before anyone noticed. The test caught them, but after 47,293 duplicate rows already existed.',
            fix: 'Immediate: deduplicate Silver using ROW_NUMBER keeping the latest version per order_id. Long term: add an idempotency check in the Bronze pipeline that detects when the same primary key appears with different created_at timestamps (indicating key reuse). Add a uniqueness test to Bronze staging as well as Silver — catching key reuse at the earliest possible layer. File a bug report with the source team: primary key reuse is a source system bug that violates the data contract.',
          },
          {
            error: `dbt source freshness check fails with "source 'bronze.orders' is 31 hours old" — but the Bronze pipeline ran successfully 2 hours ago`,
            cause: 'The source freshness check uses loaded_at_field = \'_bronze_date\' which is a DATE type. The dbt freshness check compares this to the current TIMESTAMPTZ and finds that the DATE value \'2026-03-17\' is more than 24 hours old (it rounds to midnight). The actual pipeline runs at 06:00 daily — by 13:00 the date is already 13 hours old as a date, but the pipeline ran at 06:00 this morning.',
            fix: 'Change loaded_at_field to \'_ingested_at\' which is a TIMESTAMPTZ column tracking the exact ingestion time, not just the date. Update the freshness thresholds accordingly: warn_after: {count: 2, period: hour}, error_after: {count: 6, period: hour}. Using a DATE column for freshness checking is always incorrect for sub-daily pipelines — always use a TIMESTAMPTZ column.',
          },
          {
            error: `Great Expectations validation always passes even when the actual data is clearly wrong — validation returns success: true for files with 0 rows`,
            cause: 'The expectation suite includes ExpectTableRowCountToBeBetween(min_value=0, max_value=500000). With min_value=0, an empty file passes the row count check. No NOT NULL expectations were added — an empty DataFrame has no null values because it has no rows. The suite was configured for the happy path and never tested against edge cases.',
            fix: 'Set min_value to a realistic minimum: ExpectTableRowCountToBeBetween(min_value=1000, max_value=500000). Add ExpectTableRowCountToBeGreaterThan(value=0) as a separate explicit check. Test the expectation suite against edge cases before deploying: run it against an empty file, a file with one row, a file with all nulls. The test suite itself must be tested — otherwise it provides false confidence.',
          },
          {
            error: `dbt test accepted_values fails on Silver after source added 'refunded' status — but the test was passing for 6 months and nothing changed in dbt`,
            cause: 'The source system added a new order status value without going through the data contract change process. There is no data contract CI check that would have blocked the source team from deploying this change. The dbt accepted_values test correctly caught the violation — but it was caught in Silver after 3 days of data was in the DLQ, not at ingestion.',
            fix: 'Immediate: add \'refunded\' to the accepted_values list, reprocess DLQ records. Long term: implement the data contract enforcement described in this module. The contract for the orders API must specify allowed_values for status. The orders team\'s CI pipeline must include a contract validation check that fails if new enum values are added without a matching contract update. This moves the detection from "3 days in Silver DLQ" to "before source deployment".',
          },
          {
            error: `Row count anomaly detection fires false positives every Monday — Saturday data is always flagged as anomalous`,
            cause: 'The anomaly detection uses a rolling 7-day average that includes both weekdays and weekends. FreshCart has significantly lower order volume on Saturdays and Sundays. When Monday\'s data (high weekday volume) is compared to a rolling average that includes Saturday and Sunday data, it always appears anomalously high. The detection algorithm doesn\'t account for day-of-week seasonality.',
            fix: 'Compare to the same day of week rather than a simple rolling average. Instead of comparing Monday to the 7-day rolling mean, compare Monday to the average of the previous 4 Mondays. This corrects for weekday seasonality. More sophisticated: use a day-of-week multiplier to normalise volumes before comparing (Monday volume = total / expected_monday_fraction). Tools like Elementary handle day-of-week seasonality automatically with their ML-based anomaly detection.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Data quality is an engineering problem, not a monitoring problem. Every layer a quality issue traverses multiplies its cost by 10×. A validation check at Bronze ingestion prevents hours of investigation that the same problem causes at Gold. Build quality into every pipeline stage — not just at the end.',
        'The six dimensions: Completeness (all records present, required fields populated), Accuracy (values match real-world state), Consistency (same representation across systems), Timeliness (data available when expected), Uniqueness (no duplicate primary keys), Validity (values conform to format, range, and domain rules).',
        'dbt has four generic tests: not_null, unique, accepted_values, and relationships. These cover uniqueness, validity, and consistency. Add dbt_utils for range checks (accepted_range) and freshness (recency). Custom generic tests handle business rules. Singular tests catch model-specific conditions. Store failures with --store-failures for investigation.',
        'Testing strategy by layer: Bronze/source → freshness and schema existence (warn). Staging → PK not_null and accepted_values (error). Silver → full suite including uniqueness, relationships, ranges, freshness (error on PK, warn on relationships). Gold → aggregate reconciliation, row count anomaly (error on reconciliation).',
        'Anomaly detection catches what rule-based tests miss: unusual patterns that no rule was written for. Row count anomaly (compare to rolling 7-day average), Z-score on metric distributions (flag values > 3 standard deviations from mean), and tools like Elementary for automated per-column anomaly tracking. Combine with rule-based tests — they are complementary.',
        'Great Expectations validates data at any pipeline stage — before ingestion, after landing, before transformation. Define expectation suites in Python. Run at file landing to quarantine bad files before they enter Bronze. The critical rule: test your expectation suites against edge cases (empty files, all-null files) before trusting them in production.',
        'Soda provides YAML-based quality checks running SQL against warehouse tables. Simpler than Great Expectations for SQL-native checks. Integrates directly with Airflow as a quality gate task. Use as the quality gate between Silver and Gold — if Soda checks fail, the Gold dbt run does not start.',
        'Data contracts are formal agreements between source teams and data engineering, specifying schema, quality guarantees, SLA, and change management rules. Enforce at ingestion: reject data that violates the contract. Enforce at deployment: source team CI checks that block breaking changes without prior approval. Contracts move quality responsibility to the source.',
        'A breaking change in a data contract: removing a field, adding a required field, changing a field type, narrowing allowed_values. An additive change: adding a new optional field, adding a new allowed value with notice. Detect breaking changes programmatically in CI before source deployment reaches production.',
        'The quality monitoring schema (monitoring.data_quality_results) records every check result: table, check name, status, failure count, failure rate, timestamp. Use it for: daily quality scorecards, trend analysis (quality improving or degrading?), SLA reporting, and post-incident investigation to determine when quality first degraded.',
      ]} />

    </LearnLayout>
  )
}