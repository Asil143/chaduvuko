import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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
const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)
const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
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
      section="Data Engineering — Module 36"
      readTime="75 min"
      updatedAt="August 2026"
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
          builds that whole stack around FreshCart&rsquo;s orders pipeline.
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

        <SubSubTitle>Where a problem is caught determines how much it costs</SubSubTitle>

        <CodeBox label="The cost of late quality detection — why layer matters">{`SOURCE SYSTEM (before ingestion):
  Cost: reject the record, log to DLQ, notify source team
  Recovery time: minutes

BRONZE LAYER (after landing):
  Cost: record in DLQ, Bronze intact, Silver/Gold unaffected
  Recovery time: hours (after source team fixes and resends)

SILVER LAYER (after transformation):
  Cost: dbt run fails, Silver not updated, Gold build blocked
  Recovery time: hours to a day

GOLD LAYER (after aggregation):
  Cost: Gold table has wrong data, dashboards show wrong metrics
  Recovery time: 1-3 days (investigation + fix + rebuild)

ANALYST DASHBOARD (after analyst queries):
  Cost: analyst escalates, business decisions already made on wrong data
  Recovery time: unknown, trust damage lasting weeks

THE RULE: every layer a quality issue traverses multiplies its cost by 10×.`}</CodeBox>

        <TryThis>
          Pick a table you work with and name, honestly, which layer would catch
          a bad value in it today — source contract, Bronze schema check, a dbt
          test, or an analyst noticing the dashboard looks wrong. That answer is
          your current cost multiplier.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — dbt Tests ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — dbt Tests" />
        <SectionTitle>dbt Tests — The Standard Quality Layer for the Transformation Pipeline</SectionTitle>

        <Para>
          dbt tests are the most widely used data quality mechanism for ELT
          platforms in 2026. They run after every dbt build, catching quality
          issues before Gold tables are consumed.
        </Para>

        <SubSubTitle>The four generic tests, on FreshCart&rsquo;s orders model</SubSubTitle>

        <CodeBox label="models/silver/_schema.yml — not_null, unique, accepted_values, relationships">{`models:
  - name: silver_orders
    columns:
      - name: order_id
        tests:
          - not_null           # catches missing PKs
          - unique              # catches duplicates at the grain

      - name: customer_id
        tests:
          - not_null
          - relationships:      # referential integrity to parent table
              to: ref('silver_customers')
              field: customer_id
              severity: warn    # warn not error: some orders arrive before customers

      - name: status
        tests:
          - not_null
          - accepted_values:    # domain validation
              values: ['placed', 'confirmed', 'preparing', 'ready',
                       'picked_up', 'delivering', 'delivered', 'cancelled']

      - name: order_amount
        tests:
          - not_null
          - dbt_utils.accepted_range: {min_value: 0, max_value: 500000}`}</CodeBox>

        <SubSubTitle>Table-level tests, and checking Bronze freshness</SubSubTitle>

        <CodeBox label="Row-count reconciliation and source freshness thresholds">{`models:
  - name: silver_customers
    tests:
      - dbt_utils.equal_rowcount: {compare_model: ref('stg_customers')}
      - dbt_utils.recency: {datepart: hour, field: updated_at, interval: 25}

sources:
  - name: bronze
    database: freshcart_prod
    tables:
      - name: orders
        freshness:
          warn_after:  {count: 25, period: hour}
          error_after: {count: 49, period: hour}
        loaded_at_field: _bronze_date`}</CodeBox>

        <Output>{`$ dbt test --select silver_orders
1 of 4 PASS not_null_silver_orders_order_id
2 of 4 PASS unique_silver_orders_order_id
3 of 4 WARN relationships_silver_orders_customer_id__customer_id__ref_silver_customers_
4 of 4 PASS accepted_values_silver_orders_status
Done. PASS=3 WARN=1 ERROR=0`}</Output>

        <SubSubTitle>Custom tests for business rules dbt&rsquo;s generic tests can&rsquo;t express</SubSubTitle>

        <CodeBox label="A singular test — fails when it returns any rows">{`-- tests/assert_no_negative_amounts.sql
-- Passes when this query returns ZERO rows.
SELECT order_id, order_amount
FROM {{ ref('silver_orders') }}
WHERE order_amount < 0;`}</CodeBox>

        <CodeBox label="An inline expression test — one condition, checked per row">{`columns:
  - name: delivered_at
    tests:
      - dbt_utils.expression_is_true:
          expression: "delivered_at >= created_at OR delivered_at IS NULL"

  - name: order_amount
    tests:
      - dbt_utils.expression_is_true:
          expression: "order_amount >= discount_amount"`}</CodeBox>

        <CodeBox label="A custom generic test — reusable across any two tables">{`{% test assert_column_sum_equals(model, column_name, compare_model, compare_column) %}
WITH model_sum   AS (SELECT SUM({{ column_name }}) AS total FROM {{ model }}),
     compare_sum AS (SELECT SUM({{ compare_column }}) AS total FROM {{ compare_model }})
SELECT m.total AS model_total, c.total AS compare_total, ABS(m.total - c.total) AS difference
FROM model_sum m, compare_sum c
WHERE ABS(m.total - c.total) > 0.01
{% endtest %}

# Usage:
# - name: order_amount
#   tests:
#     - assert_column_sum_equals: {compare_model: ref('silver_payments'), compare_column: payment_amount}`}</CodeBox>

        <Output>{`$ dbt test -s silver_orders --store-failures
FAIL assert_no_negative_amounts (3 rows)
# creates dbt_test__audit.assert_no_negative_amounts — query it directly:
SELECT * FROM dbt_test__audit.assert_no_negative_amounts;`}</Output>

        <SubSubTitle>Testing strategy by layer</SubSubTitle>

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
            { layer: 'Staging (stg_)', what: 'not_null on PK, accepted_values on categoricals', severity: 'error on PK, warn on domain checks', blocks: 'Yes — stale staging blocks Silver' },
            { layer: 'Silver', what: 'Uniqueness on PK, not_null, relationships, value ranges, freshness', severity: 'error on PK+nulls, warn on relationships', blocks: 'Yes — bad Silver blocks Gold' },
            { layer: 'Gold', what: 'Row count anomaly, sum reconciliation to Silver, metric ranges', severity: 'error on reconciliation, warn on anomalies', blocks: 'Yes — bad Gold blocks dashboard load' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — Anomaly Detection ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Anomaly Detection" />
        <SectionTitle>Anomaly Detection — Catching What Rule-Based Tests Miss</SectionTitle>

        <Para>
          Rule-based tests catch known violations. Anomaly detection catches
          unknown violations — a Silver table suddenly receiving 90% fewer rows
          than yesterday, a metric that was never negative suddenly going
          negative. No rule was written for these because nobody anticipated them.
        </Para>

        <SubSubTitle>Row count anomaly — comparing today to a rolling average</SubSubTitle>

        <CodeBox label="models/monitoring/mon_row_count_check.sql">{`WITH daily_counts AS (
    SELECT DATE(ingested_at) load_date, COUNT(*) row_count
    FROM silver.orders WHERE ingested_at >= CURRENT_DATE - 30
    GROUP BY 1
),
stats AS (
    SELECT load_date, row_count,
        AVG(row_count) OVER (ORDER BY load_date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING) rolling_7d_avg
    FROM daily_counts
)
SELECT load_date, row_count, ROUND(rolling_7d_avg, 0) expected_avg,
    CASE WHEN ABS(row_count - rolling_7d_avg) / NULLIF(rolling_7d_avg, 0) > 0.5 THEN 'CRITICAL'
         WHEN ABS(row_count - rolling_7d_avg) / NULLIF(rolling_7d_avg, 0) > 0.3 THEN 'WARNING'
         ELSE 'OK' END AS status
FROM stats WHERE load_date = CURRENT_DATE;`}</CodeBox>

        <Output>{`load_date    row_count  expected_avg  status
2026-03-17   4,820      48,200        CRITICAL
# Monday's orders table has 10% of its expected volume — alert fires
# before any analyst opens a dashboard`}</Output>

        <SubSubTitle>Z-score anomaly on a numeric metric</SubSubTitle>

        <CodeBox label="detect_metric_anomaly() — flagging values far from the historical mean">{`import statistics

def detect_metric_anomaly(metric_name: str, today_value: float,
                           historical_values: list[float], z_threshold: float = 3.0) -> dict:
    if len(historical_values) < 7:
        return {'status': 'insufficient_history', 'z_score': None}
    mean, stdev = statistics.mean(historical_values), statistics.stdev(historical_values)
    if stdev == 0:
        return {'status': 'no_variance', 'z_score': 0}
    z_score = abs(today_value - mean) / stdev
    return {'metric': metric_name, 'today_value': today_value, 'mean': round(mean, 2),
            'z_score': round(z_score, 2), 'status': 'ANOMALY' if z_score > z_threshold else 'OK'}

result = detect_metric_anomaly('daily_revenue', query_gold_revenue(date='2026-03-17'),
                                query_gold_revenue(last_n_days=30))
if result['status'] == 'ANOMALY':
    send_alert(f"Revenue anomaly: z_score={result['z_score']}, today={result['today_value']}")`}</CodeBox>

        <Output>{`>>> detect_metric_anomaly('daily_revenue', 812000.0, [420000]*30)
{'metric': 'daily_revenue', 'today_value': 812000.0, 'mean': 420000.0, 'z_score': 4.1, 'status': 'ANOMALY'}`}</Output>

        <SubSubTitle>dbt source freshness, and automated tracking with Elementary</SubSubTitle>

        <CodeBox label="Freshness thresholds, and a package that learns normal ranges automatically">{`sources:
  - name: bronze
    tables:
      - name: orders
        loaded_at_field: ingested_at
        freshness:
          warn_after:  {count: 2, period: hour}
          error_after: {count: 6, period: hour}

# dbt source freshness — run as an Airflow task, fail the DAG if stale

# Elementary (pip install elementary-data) auto-tracks, per model:
# row count, null % per column, distinct value count — all per time period,
# and alerts on deviation with no rules written by hand.`}</CodeBox>

        <TryThis>
          FreshCart&rsquo;s Saturday order volume is always lower than a weekday&rsquo;s. Would
          a plain 7-day rolling average correctly flag a broken Saturday pipeline,
          or would it also flag every normal Saturday as anomalous? Check your
          answer against the Error Library at the end of this module.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 04 — Great Expectations and Soda ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Great Expectations and Soda" />
        <SectionTitle>Great Expectations and Soda — Pipeline-Native Quality Frameworks</SectionTitle>

        <Para>
          dbt tests run after transformation. Great Expectations and Soda can run
          anywhere in the pipeline — on a raw vendor file before it&rsquo;s even
          ingested, which is exactly where FreshCart validates incoming delivery
          files before they touch Bronze.
        </Para>

        <SubSubTitle>Great Expectations — validating a file before it&rsquo;s ingested</SubSubTitle>

        <CodeBox label="validate_vendor_file() — quarantine on failure, never load bad data">{`import great_expectations as gx
from great_expectations.core.batch import RuntimeBatchRequest
from pathlib import Path
import pandas as pd

context = gx.get_context()

def validate_vendor_file(file_path: str, pipeline_run_id: str) -> bool:
    """Validate a vendor CSV against an expectation suite. Quarantines on failure."""
    df = pd.read_csv(file_path)
    batch_request = RuntimeBatchRequest(
        datasource_name='pandas_datasource', data_connector_name='runtime_data_connector',
        data_asset_name='vendor_deliveries', runtime_parameters={'batch_data': df},
        batch_identifiers={'run_id': pipeline_run_id},
    )
    result = context.run_checkpoint(
        checkpoint_name='vendor_deliveries_checkpoint',
        validations=[{'batch_request': batch_request, 'expectation_suite_name': 'vendor_deliveries.critical'}],
    )
    if not result.success:
        quarantine_path = Path('/data/quarantine') / Path(file_path).name
        Path(file_path).rename(quarantine_path)
        send_alert(f'Vendor file failed validation: {file_path}. Quarantined at: {quarantine_path}.')
        return False
    return True`}</CodeBox>

        <CodeBox label="The expectation suite itself — one line per rule">{`# suite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(column="delivery_id"))
# suite.add_expectation(gx.expectations.ExpectColumnValuesToBeUnique(column="delivery_id"))
# suite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(
#     column="delivery_fee", min_value=0, max_value=5000, mostly=0.99))
# suite.add_expectation(gx.expectations.ExpectTableRowCountToBeBetween(min_value=1000, max_value=500000))`}</CodeBox>

        <Output>{`INFO Validating vendor file: shipfast_weekly_2026-03-17.csv
FAIL ExpectColumnValuesToBeBetween(delivery_fee): 3.2% of values exceed max_value=5000
WARNING Vendor file failed validation — quarantined at /data/quarantine/shipfast_weekly_2026-03-17.csv`}</Output>

        <SubSubTitle>Soda — SQL-native checks, straight against the warehouse</SubSubTitle>

        <CodeBox label="checks/silver_orders.yml">{`checks for silver_orders:
  - row_count > 10000:
      name: Minimum row count — pipeline produced data
  - missing_count(order_id) = 0:
      name: No missing order IDs
  - duplicate_count(order_id) = 0:
      name: No duplicate order IDs
  - invalid_count(status) = 0:
      name: All statuses are valid
      valid values: [placed, confirmed, preparing, ready, picked_up, delivering, delivered, cancelled]
  - min(order_amount) >= 0:
      name: No negative order amounts
  - freshness(updated_at) < 2h:
      name: Data is less than 2 hours old`}</CodeBox>

        <CodeBox label="Wiring Soda into the DAG as a quality gate between Silver and Gold">{`def run_soda_checks(**context):
    from soda.scan import Scan
    scan = Scan()
    scan.set_data_source_name('freshcart_snowflake')
    scan.add_sodacl_yaml_files(path='checks/silver_orders.yml')
    scan.execute()
    if scan.has_error_logs():
        raise ValueError(f'Soda checks failed: {scan.get_error_count()} errors.')

quality_check_task = PythonOperator(task_id='soda_silver_orders', python_callable=run_soda_checks)
dbt_silver_task >> quality_check_task >> dbt_gold_task   # Gold only runs if checks pass`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Data Contracts ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Data Contracts" />
        <SectionTitle>Data Contracts — Quality Agreements With Source Teams</SectionTitle>

        <Para>
          A data contract is a formal, versioned agreement between a data
          producer (the team that owns a source system) and a data consumer
          (data engineering) defining what data will be provided, in what
          format, with what quality guarantees. It moves quality responsibility
          to the source — enforced at ingestion, not discovered in Gold hours later.
        </Para>

        <SubSubTitle>The contract itself</SubSubTitle>

        <CodeBox label="contracts/orders_api_v2.yml">{`id: orders_api_v2
version: 2.3.1
owner: orders-team@freshcart.com
consumer: data-engineering@freshcart.com

sla:
  schedule: "every 15 minutes"
  latency_sla: "data available within 5 minutes of order event"

schema:
  fields:
    - name: order_id
      type: integer
      required: true
      unique: true
    - name: order_amount
      type: decimal(10, 2)
      required: true
      constraints: {min: 0, max: 500000}
    - name: status
      type: string
      required: true
      allowed_values: [placed, confirmed, preparing, ready, picked_up, delivering, delivered, cancelled]

quality:
  completeness: ["order_id is never null", "row_count is within ±20% of 7-day rolling average"]
  timeliness: ["data delivered within 5 minutes of event"]
  schema_changes:
    breaking_change_notice: "30 days minimum before any breaking change"
    additive_change_notice: "7 days minimum before adding new fields"`}</CodeBox>

        <SubSubTitle>Enforcing it against real data</SubSubTitle>

        <CodeBox label="validate_against_contract() — turns the YAML into actual checks">{`from dataclasses import dataclass
from typing import Any
import yaml

@dataclass
class ContractViolation:
    field: str
    constraint: str
    actual_value: Any
    severity: str

def validate_against_contract(df, contract_path: str) -> list[ContractViolation]:
    """Returns list of violations. Empty list = contract satisfied."""
    with open(contract_path) as f:
        contract = yaml.safe_load(f)
    violations = []

    for field_spec in contract['schema']['fields']:
        name = field_spec['name']
        if field_spec.get('required') and name not in df.columns:
            violations.append(ContractViolation(name, 'required_field_missing', None, 'error'))
            continue
        if field_spec.get('required'):
            nulls = df[name].isna().sum()
            if nulls > 0:
                violations.append(ContractViolation(name, 'not_null', nulls, 'error'))
        if 'allowed_values' in field_spec:
            invalid = df[name].dropna()[~df[name].dropna().isin(field_spec['allowed_values'])]
            if len(invalid) > 0:
                violations.append(ContractViolation(name, 'allowed_values', invalid.unique().tolist()[:5], 'error'))

    return violations`}</CodeBox>

        <Output>{`>>> validate_against_contract(bronze_orders_df, 'contracts/orders_api_v2.yml')
[ContractViolation(field='status', constraint='allowed_values',
                    actual_value=['scheduled'], severity='error')]
# exactly the violation from this module's Real World section below`}</Output>

        <SubSubTitle>Detecting breaking changes before they ship</SubSubTitle>

        <Para>
          Contracts live in Git as versioned files, so a breaking-change
          detector can run in CI on every PR that touches one — before the
          source team&rsquo;s change ever reaches production.
        </Para>

        <CodeBox label="is_breaking_change() — comparing two contract versions">{`def is_breaking_change(old_schema: dict, new_schema: dict) -> list[str]:
    breaking = []
    old_fields = {f['name']: f for f in old_schema['schema']['fields']}
    new_fields = {f['name']: f for f in new_schema['schema']['fields']}

    for name in old_fields:
        if name not in new_fields:
            breaking.append(f"Field '{name}' removed — consumers may break")

    for name, spec in new_fields.items():
        if name not in old_fields and spec.get('required'):
            breaking.append(f"New required field '{name}' added — existing data invalid")

    for name in old_fields:
        if name in new_fields and old_fields[name]['type'] != new_fields[name]['type']:
            breaking.append(f"Field '{name}' type changed: {old_fields[name]['type']} → {new_fields[name]['type']}")

    for name in old_fields:
        old_allowed = set(old_fields.get(name, {}).get('allowed_values', []))
        new_allowed = set(new_fields.get(name, {}).get('allowed_values', []))
        if old_allowed and new_allowed and not new_allowed.issuperset(old_allowed):
            breaking.append(f"Field '{name}': allowed values {old_allowed - new_allowed} removed")

    return breaking`}</CodeBox>

        <Output>{`$ python validate_contract_backwards_compatible.py --old v2.2.0.yml --new v2.3.0.yml
Field 'status': breaking change NOT detected (new value 'scheduled' only ADDS an option)
✓ Additive change — requires 7-day notice, not 30. PR may proceed.
# had this check existed, it's exactly what should have caught the enum
# addition described in this module's Real World section`}</Output>
      </section>

      <Divider />

      {/* ── Part 06 — Quality Monitoring Dashboard ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Monitoring and Alerting" />
        <SectionTitle>Quality Monitoring — The Operational Layer</SectionTitle>

        <Para>
          Tests and contracts catch specific known problems. Quality monitoring
          gives the ongoing operational picture — which tables are healthy,
          which pipelines meet their SLAs, and whether quality is trending
          better or worse over time.
        </Para>

        <SubSubTitle>One table records every check result, from every tool</SubSubTitle>

        <CodeBox label="monitoring.data_quality_results — dbt, Soda, and custom checks all write here">{`CREATE TABLE monitoring.data_quality_results (
    check_id      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    run_id        UUID NOT NULL,
    table_name    VARCHAR(200) NOT NULL,
    check_name    VARCHAR(200) NOT NULL,
    check_type    VARCHAR(50)  NOT NULL,   -- 'dbt_test', 'soda', 'custom', 'anomaly'
    status        VARCHAR(10)  NOT NULL,   -- 'pass', 'fail', 'warn'
    failure_count BIGINT,
    failure_rate  DECIMAL(6,4),
    message       TEXT,
    checked_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_dq_status_date ON monitoring.data_quality_results (status, checked_at)
    WHERE status IN ('fail', 'warn');`}</CodeBox>

        <SubSubTitle>The three queries that turn raw checks into an operational picture</SubSubTitle>

        <CodeBox label="Daily scorecard, week-over-week trend, and today's failures">{`-- Daily pass rate per table
SELECT table_name, DATE(checked_at) check_date,
    ROUND(SUM(CASE WHEN status='pass' THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100, 1) pass_rate_pct
FROM monitoring.data_quality_results
WHERE checked_at >= CURRENT_DATE - 30 GROUP BY 1, 2 ORDER BY 2 DESC;

-- Is quality improving or degrading week over week?
WITH weekly AS (
    SELECT DATE_TRUNC('week', checked_at) week_start, table_name,
           SUM(CASE WHEN status='fail' THEN 1 ELSE 0 END) failures
    FROM monitoring.data_quality_results WHERE checked_at >= CURRENT_DATE - 90 GROUP BY 1, 2
)
SELECT week_start, table_name, failures,
    failures - LAG(failures) OVER (PARTITION BY table_name ORDER BY week_start) week_over_week_change
FROM weekly ORDER BY week_start DESC;

-- Tables failing right now, worst first
SELECT table_name, check_name, failure_rate, message
FROM monitoring.data_quality_results
WHERE DATE(checked_at) = CURRENT_DATE AND status = 'fail' AND severity = 'error'
ORDER BY failure_rate DESC;`}</CodeBox>

        <Output>{`table_name       check_date   pass_rate_pct
silver_orders    2026-03-17   97.1
silver_customers 2026-03-17   100.0
silver_payments  2026-03-17   84.3   ← worth a look`}</Output>
      </section>

      <Divider />

      {/* ── Part 07 — Building the Quality Pipeline ──────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Building the Quality Pipeline" />
        <SectionTitle>Putting It Together — The Quality-First Pipeline Architecture</SectionTitle>

        <Para>
          A quality-first pipeline integrates tests at every stage, with a
          quality gate between each layer that blocks downstream work on
          failure — the goal is to make a quality failure visible before
          analysts are affected, not after.
        </Para>

        <SubSubTitle>Bronze and Silver gates</SubSubTitle>

        <CodeBox label="dags/freshcart_morning_pipeline.py — extract, then two Silver-side gates">{`with DAG('freshcart_morning_pipeline', ...) as dag:

    extract_orders = PythonOperator(task_id='extract_orders', python_callable=run_extraction)

    bronze_quality = BashOperator(
        task_id='bronze_quality_check',
        bash_command='dbt source freshness --select source:bronze.orders',
    )

    dbt_silver = BashOperator(task_id='dbt_silver',
        bash_command='dbt run --select staging.* silver.* --vars \\'{"run_date": "{{ ds }}"}\\'')

    silver_tests = BashOperator(task_id='silver_quality_tests',
        bash_command='dbt test --select silver.* --store-failures')`}</CodeBox>

        <SubSubTitle>A Soda gate, then Gold</SubSubTitle>

        <CodeBox label="Anomaly check on Silver, then the Gold build and its own tests">{`def soda_silver_check(**context):
    from soda.scan import Scan
    scan = Scan()
    scan.set_data_source_name('freshcart_snowflake')
    scan.add_sodacl_yaml_files(path='checks/silver_orders.yml')
    scan.execute()
    write_soda_results_to_monitoring(scan, context['run_id'])
    if scan.has_error_logs():
        raise ValueError('Soda anomaly check failed for Silver orders')

silver_anomaly = PythonOperator(task_id='silver_anomaly_check', python_callable=soda_silver_check)
dbt_gold  = BashOperator(task_id='dbt_gold', bash_command='dbt run --select gold.*')
gold_tests = BashOperator(task_id='gold_quality_tests', bash_command='dbt test --select gold.*')`}</CodeBox>

        <SubSubTitle>Reporting, and the full dependency graph</SubSubTitle>

        <CodeBox label="A quality summary posted to Slack, whether the run passed or not">{`def post_pipeline_quality_report(**context):
    result = query_quality_results(date=context['ds'])
    send_slack_message(channel='#data-quality',
        text=f'Pipeline quality: {result.pass_rate}% checks passed. {result.total_failures} failures.')

quality_report = PythonOperator(task_id='quality_report', python_callable=post_pipeline_quality_report,
                                 trigger_rule='all_done')   # runs whether upstream passed or failed

(extract_orders >> bronze_quality >> dbt_silver >> silver_tests
 >> silver_anomaly >> dbt_gold >> gold_tests >> quality_report)`}</CodeBox>

        <Output>{`Graph view — freshcart_morning_pipeline
extract_orders → bronze_quality → dbt_silver → silver_tests → silver_anomaly
              → dbt_gold → gold_tests → quality_report
Slack: "Pipeline quality: 97.1% checks passed. 3 failures."`}</Output>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Data Quality</SectionTitle>

        {[
          {
            wrong: '"dbt tests and anomaly detection cover the same ground, so one is enough"',
            right: 'They catch fundamentally different failure classes — Part 02\'s tests are deterministic checks against rules someone already anticipated (not_null, accepted_values), while Part 03\'s anomaly detection catches deviations nobody wrote a rule for. This module\'s Real World scenario is exactly a case a rule DID catch (accepted_values) three days late — the Z-score anomaly on row count would have caught it the same evening.',
          },
          {
            wrong: '"A data contract is just documentation of the schema — it doesn\'t actually prevent anything"',
            right: 'A contract only has teeth when it\'s enforced in CI on the PRODUCER\'s side, not just read by the consumer — Part 05\'s is_breaking_change() function is meant to run in the source team\'s own pipeline, blocking a breaking deploy before it ships. A contract nobody\'s CI checks is exactly documentation, which is precisely the gap the Real World incident exposes.',
          },
          {
            wrong: '"Testing your expectation suite isn\'t necessary — the checks are obviously correct"',
            right: 'An expectation suite is code, and code has bugs — this module\'s Error Library has a real example where ExpectTableRowCountToBeBetween(min_value=0, ...) let a completely empty file pass validation because zero technically satisfies "at least 0 rows." Test the test suite itself against edge cases before trusting it in production.',
          },
          {
            wrong: '"More quality checks is always better, regardless of where you put them"',
            right: 'Part 01\'s 10× cost-per-layer rule means the SAME check is worth roughly ten times more at Bronze than at Gold — prioritize catching problems as early as possible rather than adding redundant checks deep in the pipeline where the damage from a bad value has already propagated.',
          },
          {
            wrong: '"A rolling 7-day average is a safe, generic default for row-count anomaly detection"',
            right: 'It silently assumes no weekly seasonality — this module\'s Error Library documents exactly the failure mode where a business with lower weekend volume gets false CRITICAL alerts every single Monday, because the rolling average is diluted by two quiet days. Compare like days (Monday vs the last 4 Mondays) when the metric has a weekly pattern.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Source System Silently Changes an Enum — Catching It at the Contract Boundary</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Orders team adds new order status without notice
          </div>

          <Para>
            The orders application team added a new status value — &ldquo;scheduled&rdquo;
            — for a new pre-order feature, deployed Friday evening without
            notifying data engineering. By Monday morning — the first day
            alone — 12,847 orders with <code>status=&apos;scheduled&apos;</code> were
            rejected from Silver by the <code>accepted_values</code> test and
            sitting in the DLQ. Nobody caught it over the weekend, so the
            pipeline kept running on its normal schedule and kept rejecting the
            same status on every subsequent run. The finance dashboard showed
            no pre-order revenue the entire time. An analyst finally noticed Tuesday
            — by then, 47 failed runs had accumulated since Friday, and the DLQ
            held nearly 600,000 rejected rows total.
          </Para>

          <CodeBox label="Diagnosis — from the monitoring table to the actual impact">{`-- STEP 1: check Silver dbt test failures since Friday
SELECT run_id, check_name, failure_count, message FROM monitoring.data_quality_results
WHERE table_name = 'silver_orders' AND status = 'fail' AND checked_at >= '2026-03-14';
-- 47 runs, all: accepted_values_silver_orders_status  "Values not in set: ['scheduled']"
-- ~600,000 rows total rejected across the 47 runs

-- STEP 2: confirm the root cause
SELECT DISTINCT status FROM bronze.orders WHERE _bronze_date >= '2026-03-14';
-- placed, confirmed, delivering, delivered, cancelled, scheduled ← new

-- STEP 3: quantify impact
SELECT SUM(order_amount) FROM bronze.orders WHERE status = 'scheduled';
-- $4.82 million unloaded to Silver/Gold`}</CodeBox>

          <CodeBox label="Fix and reprocess">{`# a) Update VALID_STATUSES in pipeline/validate.py to include 'scheduled'
# b) Update dbt schema.yml accepted_values to include 'scheduled'
# c) Bump the data contract version: contracts/orders_api_v2.yml
$ python dlq_reprocess.py --pipeline orders_incremental --start-date 2026-03-14 --force-reload`}</CodeBox>

          <Output>{`DLQ reprocessing complete: attempted=598234 reprocessed=598234 failed=0

SELECT COUNT(*) FROM silver.orders WHERE status = 'scheduled';
-- 598,234 ← all reprocessed correctly`}</Output>

          <Para>
            Total impact: data missing from Silver/Gold for 2 days 14 hours, a
            $4.82 million revenue gap in dashboards for 67 hours. The incident
            was caught by dbt&rsquo;s <code>accepted_values</code> test exactly as
            designed — the failure was in process, not tooling: no data
            contract enforcement meant the orders team had no way to know their
            enum change would break the downstream pipeline. Going forward, the
            contract now requires 30-day notice for enum changes, a CI check
            blocks unreviewed <code>allowed_values</code> additions, and
            Elementary was added for automated anomaly detection — the Z-score
            check would have caught this Friday evening, not Tuesday.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Writing a row-count or NULL check but never testing the check itself against an empty or malformed input',
            a: 'This module\'s Error Library has a real ExpectTableRowCountToBeBetween(min_value=0, ...) that let a completely empty file pass, because zero technically satisfies "at least zero rows." A quality check is code and needs its own test cases — an empty file, an all-null file, a file with one row — before it can be trusted.',
          },
          {
            q: 'Setting every dbt test to severity: error without considering whether that\'s actually correct',
            a: 'A relationships test between orders and customers set to error will fail the entire build the moment one order legitimately arrives before its customer record — Part 02\'s example deliberately uses severity: warn for exactly this case. Reserve error for primary keys and constraints that should truly never be violated.',
          },
          {
            q: 'Building a data contract and never actually enforcing it in the producer\'s CI',
            a: 'A contract that only the consumer reads is documentation, not enforcement — see this module\'s Misconceptions. Part 05\'s is_breaking_change() only prevents incidents like the Real World scenario if it runs as a required CI check in the SOURCE team\'s own pipeline, blocking their merge, not just informing data engineering after the fact.',
          },
          {
            q: 'Treating anomaly detection alerts with the same urgency as dbt test failures',
            a: 'An anomaly is a statistical deviation, not a confirmed violation — a real but unusual spike in orders (a flash sale) will trip a Z-score check without being a data problem at all. Anomaly alerts deserve investigation, not automatic pipeline aborts the way a failed not_null test does.',
          },
          {
            q: 'Adding quality checks only at Gold because "that\'s what the dashboards read from"',
            a: 'Part 01\'s 10× cost rule means the same check catches the same problem far cheaper at Bronze or Silver than at Gold — by the time bad data reaches Gold, it has already been transformed, aggregated, and in this module\'s Real World case, sat unnoticed for days. Push checks as far upstream as the data allows.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
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


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 37 covers data observability — pipeline metrics, structured logging, anomaly detection, and the alerting design that ensures you know about data problems before your stakeholders do.
        </p>
        <Link href="/learn/data-engineering/monitoring-observability" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 37 → Data Observability — Metrics, Logging and Anomaly Detection
        </Link>
      </div>
    </LearnLayout>
  )
}