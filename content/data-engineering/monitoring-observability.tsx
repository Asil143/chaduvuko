import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Monitoring and Observability for Data Pipelines | Chaduvuko',
  description:
    'Production monitoring for data pipelines — SLAs, alerting tiers, pipeline health dashboards, structured logging, metric collection, dead letter queue monitoring, and building an on-call culture for data teams.',
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

export default function MonitoringObservabilityModule() {
  return (
    <LearnLayout
      title="Monitoring and Observability for Data Pipelines"
      description="SLAs, alerting tiers, pipeline health dashboards, structured logging, metric collection, DLQ monitoring, and building an on-call culture for data teams."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Monitoring vs Observability ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Monitoring vs Observability" />
        <SectionTitle>Monitoring vs Observability — What the Distinction Actually Means</SectionTitle>

        <Para>
          Monitoring asks a predefined set of questions about a system: is this
          pipeline running? Did it finish on time? Are there errors? Monitoring
          works well for known failure modes — you define the metric, you define
          the threshold, and you get an alert when the threshold is crossed.
        </Para>

        <Para>
          Observability is the property of a system that makes it possible to
          answer arbitrary questions about its behaviour from the outside — even
          questions you did not think to ask when you built the monitoring. An
          observable pipeline produces rich enough logs, metrics, and traces that
          you can determine why an unusual thing happened, not just that it happened.
          Monitoring catches the fires you anticipated. Observability helps you
          understand the fires you did not.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The three signals of observability — metrics, logs, and traces
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                signal: 'Metrics',
                color: '#00e676',
                def: 'Numeric measurements aggregated over time. Row counts, latency percentiles, error rates, queue depths. Low cardinality, high frequency.',
                tools: 'Prometheus, Datadog, CloudWatch, Grafana',
                pipeline_use: 'Rows processed per second. Pipeline duration. DLQ depth. Warehouse credit usage.',
              },
              {
                signal: 'Logs',
                color: '#7b61ff',
                def: 'Discrete events with context. Structured JSON logs that record what happened, when, and with what parameters. High cardinality, queryable.',
                tools: 'CloudWatch Logs, Elasticsearch/Kibana, Datadog Logs, Loki',
                pipeline_use: 'Every pipeline run start/end. Validation failures with row details. Retry attempts. DLQ entries.',
              },
              {
                signal: 'Traces',
                color: '#f97316',
                def: 'End-to-end request paths across services. A trace shows how a specific data event flowed from source through all transformation stages to the Gold table.',
                tools: 'Jaeger, Zipkin, AWS X-Ray, Datadog APM',
                pipeline_use: 'Tracing a single order from Kafka event through Bronze → Silver → Gold. Identifying which stage added the most latency.',
              },
            ].map((item) => (
              <div key={item.signal} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>{item.signal}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>{item.def}</div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.tools}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: 6 }}>
                  Pipeline use: {item.pipeline_use}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — SLAs and SLOs ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — SLAs, SLOs, and SLIs" />
        <SectionTitle>SLAs, SLOs, and SLIs — The Language of Production Commitments</SectionTitle>

        <Para>
          SLA, SLO, and SLI are terms borrowed from software reliability
          engineering that the data engineering world has adopted because they
          provide precise language for production commitments. Using them correctly
          transforms vague agreements ("the pipeline should be fast") into
          measurable, enforceable contracts.
        </Para>

        <CodeBox label="SLI, SLO, SLA — definitions and examples for data pipelines">{`SLI: SERVICE LEVEL INDICATOR
  The actual measured metric — what you measure.
  For data pipelines:
    Pipeline completion time:     time from scheduled start to last write
    Data freshness:               age of the most recently available data
    Row count:                    number of records in the target table
    Error rate:                   fraction of pipeline runs that fail
    DLQ accumulation rate:        rejected records per run

SLO: SERVICE LEVEL OBJECTIVE
  The target value for the SLI — what you aim for.
  For data pipelines:
    "Silver orders pipeline completes within 90 minutes of scheduled start"
    "Gold daily_revenue data is no older than 2 hours at any point"
    "Pipeline error rate is < 1% over any 7-day rolling window"
    "DLQ depth does not exceed 10,000 records at any time"
  SLOs are internal commitments — what the team aims to achieve.

SLA: SERVICE LEVEL AGREEMENT
  The contractual commitment to a consumer — what you promise.
  For data pipelines:
    "Finance dashboards will have yesterday's data by 08:00 IST"
    "ML feature store updates daily by 06:00 IST"
    "Any data correction will be available within 4 hours of detection"
  SLAs are external commitments — what the business depends on.
  Breaching an SLA has consequences (business impact, escalation).

ERROR BUDGET:
  If SLO is "99% of pipeline runs complete within 90 minutes":
    Monthly runs: 30 × (24/6) = 120 runs   (6-hourly pipeline)
    Allowed failures: 120 × 1% = 1.2 runs
    Error budget: about 1 allowed SLO miss per month
  When error budget is exhausted: stop new features, focus on reliability.

FRESHMART SLO EXAMPLES:
  Pipeline                SLI                  SLO             SLA
  ──────────────────────────────────────────────────────────────────────
  silver_orders_daily     completion_time      < 60 min        —
  gold_daily_revenue      data_freshness       < 2h            data by 08:00 IST
  ml_feature_store        completion_time      < 30 min        complete by 06:00 IST
  bronze_ingestion        error_rate           < 0.1%          —
  dlq_reprocessing        completion_time      < 4h            correction within 4h`}</CodeBox>

        <SubTitle>Defining and tracking SLOs in practice</SubTitle>

        <CodeBox label="SLO tracking — measuring and reporting on pipeline SLOs">{`-- SLO TRACKING TABLE:
CREATE TABLE monitoring.pipeline_slo_tracking (
    run_id          UUID         NOT NULL,
    pipeline_name   VARCHAR(100) NOT NULL,
    scheduled_start TIMESTAMPTZ  NOT NULL,
    actual_start    TIMESTAMPTZ,
    actual_end      TIMESTAMPTZ,
    slo_target_min  INT          NOT NULL,   -- target completion time in minutes
    actual_duration_min DECIMAL(8,2),
    met_slo         BOOLEAN,
    sla_deadline    TIMESTAMPTZ,            -- NULL if no SLA for this pipeline
    met_sla         BOOLEAN,
    status          VARCHAR(20)  NOT NULL,  -- 'running', 'success', 'failed'
    rows_processed  BIGINT,
    rows_rejected   BIGINT,
    recorded_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- DAILY SLO REPORT:
SELECT
    pipeline_name,
    COUNT(*)                                       AS total_runs,
    SUM(CASE WHEN met_slo THEN 1 ELSE 0 END)      AS slo_met_count,
    ROUND(SUM(CASE WHEN met_slo THEN 1 ELSE 0 END)::NUMERIC
          / COUNT(*) * 100, 1)                     AS slo_met_pct,
    ROUND(AVG(actual_duration_min), 1)             AS avg_duration_min,
    ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP
          (ORDER BY actual_duration_min), 1)       AS p95_duration_min,
    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failures
FROM monitoring.pipeline_slo_tracking
WHERE scheduled_start >= CURRENT_DATE - 30
GROUP BY pipeline_name
ORDER BY slo_met_pct ASC;

-- SLA BREACH HISTORY (the ones that matter most):
SELECT pipeline_name, scheduled_start, sla_deadline,
       actual_end, actual_end - sla_deadline AS breach_duration
FROM monitoring.pipeline_slo_tracking
WHERE met_sla = FALSE
  AND sla_deadline IS NOT NULL
  AND scheduled_start >= CURRENT_DATE - 30
ORDER BY scheduled_start DESC;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Structured Logging ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Structured Logging" />
        <SectionTitle>Structured Logging — The Foundation of Observable Pipelines</SectionTitle>

        <Para>
          Unstructured log messages like "Pipeline completed" are useless for
          diagnosis. Structured JSON logs with consistent fields are queryable,
          aggregatable, and searchable. Every pipeline run should emit a structured
          log entry at each stage with enough context to reconstruct exactly what
          happened, to whom, and why it succeeded or failed.
        </Para>

        <CodeBox label="Structured logging — the standard for production pipelines">{`"""
Structured logging for data pipelines.
All log entries are JSON with consistent fields.
Queryable in CloudWatch Insights, Elasticsearch, Datadog.
"""
import json
import logging
import traceback
from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

class PipelineLogger:
    """
    Structured logger that emits JSON to stdout.
    Fields are consistent across all pipeline runs.
    """
    def __init__(self, pipeline_name: str, run_id: str):
        self.pipeline_name = pipeline_name
        self.run_id        = run_id
        self._logger       = logging.getLogger(pipeline_name)

    def _emit(self, level: str, event: str, **kwargs: Any) -> None:
        entry = {
            'timestamp':     datetime.now(timezone.utc).isoformat(),
            'level':         level,
            'event':         event,
            'pipeline':      self.pipeline_name,
            'run_id':        self.run_id,
            **kwargs,
        }
        print(json.dumps(entry), flush=True)   # stdout → log aggregator

    def info(self, event: str, **kwargs):
        self._emit('INFO', event, **kwargs)

    def warning(self, event: str, **kwargs):
        self._emit('WARNING', event, **kwargs)

    def error(self, event: str, **kwargs):
        self._emit('ERROR', event, **kwargs)


# USAGE IN A PIPELINE:
def run_silver_pipeline(run_date: str) -> dict:
    run_id = str(uuid4())
    log    = PipelineLogger('silver_orders', run_id)

    log.info('pipeline_started', run_date=run_date, trigger='scheduled')

    try:
        # Stage 1: Extract from Bronze
        start = datetime.now(timezone.utc)
        rows  = extract_from_bronze(run_date)
        log.info('extract_complete',
                 stage='extract',
                 rows_extracted=len(rows),
                 duration_sec=(datetime.now(timezone.utc) - start).total_seconds(),
                 source='bronze.orders',
                 run_date=run_date)

        # Stage 2: Validate
        valid, rejected = validate_rows(rows)
        if rejected:
            log.warning('validation_rejections',
                        stage='validate',
                        rejected_count=len(rejected),
                        rejection_rate=round(len(rejected) / len(rows), 4),
                        sample_errors=[r['error'] for r in rejected[:3]])
            write_to_dlq(rejected, run_id)

        # Stage 3: Transform and load
        start = datetime.now(timezone.utc)
        rows_written = load_to_silver(valid, run_date)
        log.info('load_complete',
                 stage='load',
                 rows_written=rows_written,
                 duration_sec=(datetime.now(timezone.utc) - start).total_seconds(),
                 target='silver.orders',
                 run_date=run_date)

        log.info('pipeline_complete',
                 status='success',
                 rows_extracted=len(rows),
                 rows_written=rows_written,
                 rows_rejected=len(rejected),
                 rejection_rate=round(len(rejected) / len(rows), 4))

        return {'status': 'success', 'rows_written': rows_written}

    except Exception as exc:
        log.error('pipeline_failed',
                  status='failed',
                  error_type=type(exc).__name__,
                  error_message=str(exc),
                  stacktrace=traceback.format_exc())
        raise


# WHAT THIS PRODUCES IN CLOUDWATCH / DATADOG:
# {
#   "timestamp": "2026-03-17T06:14:32.847Z",
#   "level": "INFO",
#   "event": "extract_complete",
#   "pipeline": "silver_orders",
#   "run_id": "d7c7a7b8-3e1a-...",
#   "stage": "extract",
#   "rows_extracted": 48234,
#   "duration_sec": 47.3,
#   "source": "bronze.orders",
#   "run_date": "2026-03-17"
# }

# CLOUDWATCH INSIGHTS QUERIES:
# Find all runs that had > 5% rejection rate in last 7 days:
# fields @timestamp, pipeline, run_id, rejection_rate
# | filter event = "pipeline_complete" and rejection_rate > 0.05
# | sort @timestamp desc
# | limit 20

# Average extraction duration per pipeline, last 30 days:
# stats avg(duration_sec) as avg_secs by pipeline
# | filter event = "extract_complete"
# | sort avg_secs desc`}</CodeBox>

        <SubTitle>Correlation IDs — threading context across distributed systems</SubTitle>

        <CodeBox label="Correlation IDs — linking logs across pipeline stages and services">{`# PROBLEM: a data quality incident spans 4 systems.
# Bronze extraction log: run_id=abc123
# Silver transformation log: separate log, no link back to Bronze
# Gold build log: another log, no link to Silver or Bronze
# Airflow task logs: separate from all the above
# When Silver has bad data, you cannot find which Bronze run caused it.

# SOLUTION: propagate a single correlation ID through all stages.

# 1. Airflow DAG generates the run correlation ID:
from airflow.operators.python import PythonOperator
from uuid import uuid4

def generate_run_context(**context):
    """Generate correlation ID and push to XCom for all downstream tasks."""
    correlation_id = str(uuid4())
    context['ti'].xcom_push(key='correlation_id', value=correlation_id)
    context['ti'].xcom_push(key='run_date', value=context['ds'])

generate_context = PythonOperator(
    task_id='generate_run_context',
    python_callable=generate_run_context,
)

# 2. Every downstream task pulls the correlation ID and includes it:
def run_bronze_extraction(**context):
    correlation_id = context['ti'].xcom_pull(
        task_ids='generate_run_context', key='correlation_id'
    )
    log = PipelineLogger('bronze_orders', run_id=correlation_id)
    log.info('extraction_started', stage='bronze')
    # All Bronze logs tagged with correlation_id

def run_silver_transform(**context):
    correlation_id = context['ti'].xcom_pull(
        task_ids='generate_run_context', key='correlation_id'
    )
    log = PipelineLogger('silver_orders', run_id=correlation_id)
    log.info('transform_started', stage='silver')
    # Same correlation_id — linkable to Bronze logs

# 3. In CloudWatch Insights: search for correlation_id to see the FULL run:
# fields @timestamp, event, stage, rows_extracted, rows_rejected, error_message
# | filter run_id = "d7c7a7b8-3e1a-4a2c-9b4d-..."
# | sort @timestamp asc
# Shows: every log entry from Bronze through Silver through Gold for that run.
# Incident investigation time: minutes (not hours of cross-log searching).`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Alerting Tiers ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Alerting Tiers" />
        <SectionTitle>Alerting Tiers — What Gets Paged at 2 AM vs What Waits Until Morning</SectionTitle>

        <Para>
          Alert fatigue is the most dangerous failure mode of a monitoring system.
          When every minor pipeline warning generates a PagerDuty page, engineers
          stop responding to pages because 90% of them are noise. The one real
          incident then goes undetected for hours. Tiered alerting is the answer:
          only alerts that require immediate human action at any hour are P1.
          Everything else waits for business hours.
        </Para>

        <CompareTable
          headers={[
            { label: 'Priority' },
            { label: 'Definition', color: '#ff4757' },
            { label: 'Response', color: '#f97316' },
            { label: 'Channel', color: '#4285f4' },
            { label: 'Pipeline examples', color: '#7b61ff' },
          ]}
          keys={['priority', 'def', 'response', 'channel', 'examples']}
          rows={[
            { priority: 'P1 — Critical', def: 'SLA breach imminent or occurring. Business impact now. Requires immediate action.', response: 'Page on-call immediately. Wake up if night. Acknowledge within 5 min.', channel: 'PagerDuty page + SMS + Slack #incidents', examples: 'Finance pipeline will miss 08:00 SLA. Production Gold table has wrong data. All ingestion pipelines failed.' },
            { priority: 'P2 — High', def: 'SLA at risk but not yet breached. Pipeline degraded. Data quality issue detected.', response: 'Slack alert. Respond within 1 hour during business hours.', channel: 'Slack #data-alerts + email', examples: 'Silver pipeline 30 min behind schedule. DLQ depth growing rapidly. dbt test failure blocking Gold.' },
            { priority: 'P3 — Medium', def: 'Known issue with workaround. Pipeline slow but will complete. Data quality warning.', response: 'Address during business hours. Next working day acceptable.', channel: 'Slack #data-warnings', examples: 'Pipeline running slow (P95 > SLO but P50 normal). New enum value rejected to DLQ. Source freshness warning.' },
            { priority: 'P4 — Low', def: 'Informational. Metric trending in wrong direction. Pre-emptive notice.', response: 'Reviewed weekly. No immediate action.', channel: 'Email digest / dashboard', examples: 'Row count 10% below 30-day average. DLQ has 200 records (below threshold). Cluster cost 15% above budget.' },
          ]}
        />

        <SubTitle>Writing good alert messages — the anatomy of an actionable alert</SubTitle>

        <CodeBox label="Good vs bad alert messages — what separates useful from noise">{`BAD ALERT (not actionable, missing context):
  Title:   silver_orders FAILED
  Body:    Pipeline silver_orders failed at 06:14:32.
  Action:  (none specified)
  → Engineer receives this at 2 AM. Has no idea what to do.
    Which step failed? How much data is affected? Is there a runbook?

GOOD ALERT (actionable, context-rich):
  Title:   [P2] silver_orders — FAILED — 2026-03-17 06:14 IST
  Body:
    Pipeline: silver_orders
    Run date:  2026-03-17
    Failed at: validation stage (step 2 of 4)
    Error:     48,234 rows rejected — unrecognised status 'scheduled'
               (new value added by orders team, not in allowed list)
    Impact:    Silver orders not updated. Gold daily_revenue build blocked.
               Finance dashboard will show stale data.
    SLA:       Gold must be ready by 08:00 IST (1h 45m remaining)
    DLQ:       48,234 rows in DLQ → pipeline/dlq_reprocess.py
    Run ID:    d7c7a7b8-3e1a-4a2c-9b4d-...
    Runbook:   https://runbooks.freshmart.internal/silver-orders-failure
    Logs:      https://cloudwatch/log-groups/silver-orders?runId=d7c7a7b8
  → Engineer knows exactly what happened, why, what the impact is,
    how long before SLA breach, and how to fix it.

ALERT MESSAGE TEMPLATE:
def format_alert_message(
    pipeline:   str,
    run_date:   str,
    stage:      str,
    error:      str,
    impact:     str,
    sla_time:   str | None,
    run_id:     str,
    runbook_url: str,
) -> str:
    time_to_sla = compute_time_to_sla(sla_time) if sla_time else None
    return f"""
Pipeline:  {pipeline}
Run date:  {run_date}
Failed at: {stage}
Error:     {error}
Impact:    {impact}
{f"SLA:    {sla_time} ({time_to_sla} remaining)" if sla_time else ""}
Run ID:    {run_id}
Runbook:   {runbook_url}
""".strip()


AIRFLOW CALLBACK FOR ALERTS:
def on_failure_callback(context):
    """Send tiered alert on Airflow task failure."""
    dag_id    = context['dag'].dag_id
    task_id   = context['task_instance'].task_id
    run_id    = context['run_id']
    exception = context.get('exception', 'unknown error')

    # Determine priority based on SLA proximity and task criticality:
    priority  = determine_alert_priority(dag_id, task_id, context)
    message   = format_alert_message(
        pipeline   = f'{dag_id}.{task_id}',
        run_date   = context['ds'],
        stage      = task_id,
        error      = str(exception),
        impact     = get_downstream_impact(dag_id, task_id),
        sla_time   = get_sla_for_pipeline(dag_id),
        run_id     = run_id,
        runbook_url = f'https://runbooks.freshmart.internal/{dag_id}',
    )

    if priority == 'P1':
        send_pagerduty_alert(message, severity='critical')
        send_slack_alert('#incidents', message)
    elif priority == 'P2':
        send_slack_alert('#data-alerts', message)
    else:
        send_slack_alert('#data-warnings', message)


with DAG('freshmart_morning_pipeline', on_failure_callback=on_failure_callback):
    ...`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Pipeline Health Dashboard ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Pipeline Health Dashboard" />
        <SectionTitle>Pipeline Health Dashboard — The Operational View</SectionTitle>

        <Para>
          A pipeline health dashboard gives the data team a single view of the
          entire platform's status. It answers the question every data engineer
          asks when they start work: "is everything okay?" without requiring them
          to check six different tools. The most effective dashboards show current
          status, trend over time, and SLO performance — not raw metrics that
          require interpretation.
        </Para>

        <CodeBox label="Pipeline health schema — the foundation for a Grafana or Metabase dashboard">{`-- PIPELINE RUN HISTORY TABLE (feeds all dashboard panels):
CREATE TABLE monitoring.pipeline_runs (
    run_id          UUID          NOT NULL PRIMARY KEY,
    pipeline_name   VARCHAR(100)  NOT NULL,
    dag_id          VARCHAR(100),
    run_date        DATE          NOT NULL,
    scheduled_at    TIMESTAMPTZ   NOT NULL,
    started_at      TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    status          VARCHAR(20)   NOT NULL,  -- running/success/failed/skipped
    trigger_type    VARCHAR(20),             -- scheduled/manual/sensor
    rows_extracted  BIGINT,
    rows_rejected   BIGINT,
    rows_written    BIGINT,
    duration_sec    DECIMAL(10,2),
    slo_target_sec  INT,
    met_slo         BOOLEAN,
    sla_deadline    TIMESTAMPTZ,
    met_sla         BOOLEAN,
    error_message   TEXT,
    run_metadata    JSONB
);

-- CURRENT PLATFORM STATUS (for the "is everything okay?" panel):
WITH latest_runs AS (
    SELECT DISTINCT ON (pipeline_name)
        pipeline_name, status, completed_at, met_sla, error_message
    FROM monitoring.pipeline_runs
    WHERE run_date = CURRENT_DATE
    ORDER BY pipeline_name, started_at DESC
)
SELECT
    pipeline_name,
    status,
    CASE
        WHEN status = 'success' AND met_sla THEN '✅ OK'
        WHEN status = 'success' AND NOT COALESCE(met_sla, TRUE) THEN '⚠️ SLA MISSED'
        WHEN status = 'running'  THEN '🔄 RUNNING'
        WHEN status = 'failed'   THEN '🔴 FAILED'
        ELSE '⏳ PENDING'
    END                                    AS health_indicator,
    EXTRACT(EPOCH FROM (NOW() - completed_at)) / 60 AS mins_ago,
    error_message
FROM latest_runs
ORDER BY
    CASE status WHEN 'failed' THEN 0
                WHEN 'running' THEN 1
                ELSE 2 END,
    pipeline_name;

-- 7-DAY SLO TREND (shows whether platform is getting better or worse):
SELECT
    run_date,
    pipeline_name,
    COUNT(*)                                               AS runs,
    ROUND(SUM(CASE WHEN met_slo THEN 1 ELSE 0 END)::NUMERIC
          / NULLIF(COUNT(*), 0) * 100, 1)                 AS slo_pct,
    ROUND(AVG(duration_sec) / 60, 1)                      AS avg_duration_min,
    SUM(rows_rejected)                                     AS total_rejected
FROM monitoring.pipeline_runs
WHERE run_date >= CURRENT_DATE - 7
  AND status IN ('success', 'failed')
GROUP BY 1, 2
ORDER BY 1 DESC, 2;

-- ALERTING BACKLOG (unresolved issues):
SELECT
    pipeline_name,
    run_date,
    status,
    error_message,
    started_at,
    EXTRACT(EPOCH FROM (NOW() - started_at)) / 3600  AS hours_since_start
FROM monitoring.pipeline_runs
WHERE status IN ('failed', 'running')
  AND run_date >= CURRENT_DATE - 2
ORDER BY started_at;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — DLQ Monitoring ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Dead Letter Queue Monitoring" />
        <SectionTitle>DLQ Monitoring — Tracking Rejected Records Across the Platform</SectionTitle>

        <Para>
          The dead letter queue (DLQ) is where rejected records go when they fail
          validation. A DLQ that is never monitored is worse than no DLQ — it
          creates the illusion that data quality is good because the bad records
          are silently quarantined. DLQ monitoring tracks accumulation rates,
          rejection reasons, and age of unresolved records.
        </Para>

        <CodeBox label="DLQ monitoring — tracking, alerting, and operational queries">{`-- DLQ TABLE (from Module 27 — reproduced here for monitoring context):
CREATE TABLE pipeline.dead_letter_queue (
    dlq_id         UUID          NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id         UUID          NOT NULL,
    pipeline_name  VARCHAR(100)  NOT NULL,
    source_table   VARCHAR(200),
    error_type     VARCHAR(100)  NOT NULL,
    error_message  TEXT          NOT NULL,
    raw_record     JSONB         NOT NULL,
    business_key   VARCHAR(200),            -- e.g. order_id value
    run_date       DATE          NOT NULL,
    arrived_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    status         VARCHAR(20)   NOT NULL DEFAULT 'pending',
    resolved_at    TIMESTAMPTZ,
    resolution_note TEXT
);


-- DLQ ACCUMULATION MONITOR (run after every pipeline):
SELECT
    pipeline_name,
    error_type,
    COUNT(*)                                    AS pending_count,
    MIN(arrived_at)                             AS oldest_record,
    EXTRACT(EPOCH FROM (NOW() - MIN(arrived_at))) / 3600 AS hours_pending,
    MAX(arrived_at)                             AS latest_record
FROM pipeline.dead_letter_queue
WHERE status = 'pending'
GROUP BY pipeline_name, error_type
ORDER BY pending_count DESC;

-- ALERT: DLQ depth exceeds threshold for more than 2 hours
-- (alert fires if same error type has > 1000 records pending > 2h)
SELECT pipeline_name, error_type, COUNT(*) AS depth,
       MIN(arrived_at) AS first_seen
FROM pipeline.dead_letter_queue
WHERE status = 'pending'
  AND arrived_at < NOW() - INTERVAL '2 hours'
GROUP BY pipeline_name, error_type
HAVING COUNT(*) > 1000
ORDER BY depth DESC;


-- DLQ TREND: is the problem getting better or worse?
SELECT
    DATE(arrived_at)                            AS arrival_date,
    pipeline_name,
    error_type,
    COUNT(*)                                    AS records_rejected,
    COUNT(CASE WHEN status = 'resolved' THEN 1 END) AS resolved,
    COUNT(CASE WHEN status = 'pending' THEN 1 END)  AS still_pending
FROM pipeline.dead_letter_queue
WHERE arrived_at >= CURRENT_DATE - 30
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;


-- DLQ REPROCESSING PIPELINE:
def reprocess_dlq(
    pipeline_name: str,
    error_type: str,
    run_date: str,
    dry_run: bool = False,
) -> dict:
    """
    Reprocess pending DLQ records after the underlying cause is fixed.
    dry_run=True: logs what would be reprocessed without actually doing it.
    """
    records = fetch_pending_dlq_records(
        pipeline_name=pipeline_name,
        error_type=error_type,
        run_date=run_date,
    )

    if not records:
        return {'status': 'no_records', 'count': 0}

    if dry_run:
        return {'status': 'dry_run', 'would_reprocess': len(records)}

    processed, failed = 0, 0
    for record in records:
        try:
            # Re-run the pipeline step that originally rejected this record:
            result = reprocess_single_record(record, pipeline_name)
            mark_dlq_resolved(record['dlq_id'],
                              note=f'Reprocessed successfully. Row: {result}')
            processed += 1
        except Exception as exc:
            mark_dlq_failed(record['dlq_id'], note=str(exc))
            failed += 1

    return {'status': 'complete', 'processed': processed, 'failed': failed}


# ALERTING ON DLQ GROWTH:
# In Airflow, after every Silver pipeline run:
def check_dlq_health(**context):
    """Alert if DLQ depth is growing faster than resolution rate."""
    from pipeline.monitoring import query_dlq_stats
    stats = query_dlq_stats(
        pipeline_name='silver_orders',
        run_date=context['ds'],
    )
    if stats.pending_records > 10_000:
        raise ValueError(
            f"DLQ depth critical: {stats.pending_records} pending records. "
            f"Most common error: {stats.top_error_type} "
            f"({stats.top_error_count} records). "
            f"See: https://runbooks.freshmart.internal/dlq-reprocess"
        )
    elif stats.pending_records > 1_000:
        send_slack_warning(
            f"DLQ depth elevated: {stats.pending_records} pending. "
            f"Top error: {stats.top_error_type}."
        )`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Metric Collection and Grafana ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Metrics and Dashboards" />
        <SectionTitle>Metrics Collection — What to Measure and How to Expose It</SectionTitle>

        <Para>
          Metrics are numeric time-series measurements. They are cheaper to
          store and query than logs, and they enable alerting on thresholds
          and trends. Every pipeline run should emit a small set of standard
          metrics that feed a real-time dashboard and alert rules.
        </Para>

        <CodeBox label="Pipeline metrics — what to measure and how to publish them">{`# STANDARD PIPELINE METRICS — what every pipeline should emit

COUNTER METRICS (always increasing):
  pipeline.runs.total{pipeline="silver_orders",status="success"}    # total successful runs
  pipeline.runs.total{pipeline="silver_orders",status="failed"}     # total failed runs
  pipeline.rows.extracted{pipeline="silver_orders"}                  # total rows extracted
  pipeline.rows.rejected{pipeline="silver_orders"}                   # total rows rejected
  pipeline.rows.written{pipeline="silver_orders"}                    # total rows written

GAUGE METRICS (current value, can go up or down):
  pipeline.dlq.depth{pipeline="silver_orders"}                       # current DLQ depth
  pipeline.last_run_duration_sec{pipeline="silver_orders"}           # last run duration
  pipeline.data_freshness_sec{table="silver.orders"}                 # age of last update

HISTOGRAM METRICS (distribution of values):
  pipeline.run_duration_seconds{pipeline="silver_orders"}            # duration distribution
  pipeline.rows_per_second{pipeline="silver_orders"}                 # processing throughput


# EMITTING METRICS TO DATADOG (statsd protocol):
from datadog import DogStatsd
statsd = DogStatsd(host='localhost', port=8125)

def emit_pipeline_metrics(
    pipeline_name:  str,
    status:         str,
    duration_sec:   float,
    rows_extracted: int,
    rows_rejected:  int,
    rows_written:   int,
    run_date:       str,
):
    tags = [f'pipeline:{pipeline_name}', f'run_date:{run_date}']

    # Increment run counter by status:
    statsd.increment('pipeline.runs.total', tags=tags + [f'status:{status}'])

    # Record duration as histogram (for p50, p95, p99 calculations):
    statsd.histogram('pipeline.run_duration_seconds', duration_sec, tags=tags)

    # Record row counts:
    statsd.gauge('pipeline.rows_extracted_last_run', rows_extracted, tags=tags)
    statsd.gauge('pipeline.rows_rejected_last_run',  rows_rejected,  tags=tags)
    statsd.gauge('pipeline.rows_written_last_run',   rows_written,   tags=tags)

    # Rejection rate as a derived gauge:
    if rows_extracted > 0:
        rejection_rate = rows_rejected / rows_extracted
        statsd.gauge('pipeline.rejection_rate', rejection_rate, tags=tags)


# EMITTING METRICS TO CLOUDWATCH:
import boto3
cloudwatch = boto3.client('cloudwatch')

def emit_to_cloudwatch(pipeline_name: str, rows_rejected: int, run_date: str):
    cloudwatch.put_metric_data(
        Namespace='FreshMart/DataPipelines',
        MetricData=[
            {
                'MetricName': 'RowsRejected',
                'Dimensions': [
                    {'Name': 'PipelineName', 'Value': pipeline_name},
                    {'Name': 'RunDate',      'Value': run_date},
                ],
                'Value':   rows_rejected,
                'Unit':    'Count',
            },
        ],
    )
    # Alert rule in CloudWatch:
    # ALARM when RowsRejected > 10000 for ANY pipeline for 1 evaluation period.


# GRAFANA DASHBOARD PANELS (what to display):
# Panel 1: Pipeline status grid — each pipeline as a colored status square
# Panel 2: SLO compliance rate (line chart, 30-day trend per pipeline)
# Panel 3: Daily row counts (stacked bar — extracted/written/rejected)
# Panel 4: Run duration P95 vs SLO target (over 30 days)
# Panel 5: DLQ depth (time series per pipeline)
# Panel 6: Warehouse credit usage (bar chart, daily)
# Panel 7: Error rate (line chart, threshold line at SLO)
# Panel 8: Recent failures (table — last 10 failed runs with links to logs)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Building an On-Call Rotation — The Data Team's First Production Incident Response</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshMart · Building a data on-call process from scratch
          </div>

          <Para>
            The data engineering team has grown to 8 people and the platform
            is serving finance, operations, and product teams. The pipeline
            occasionally fails at night or on weekends and nobody finds out
            until Monday morning. The team needs a sustainable on-call process
            that does not burn out engineers.
          </Para>

          <CodeBox label="Building a data on-call process — the practical components">{`COMPONENT 1: RUNBOOKS (make incidents resolvable by the on-call engineer)

  Every pipeline gets a runbook at:
  https://runbooks.freshmart.internal/{pipeline_name}

  RUNBOOK TEMPLATE:
  ## silver_orders Runbook

  ### What does this pipeline do?
  Reads Bronze orders from S3, validates and transforms to Silver.
  Runs daily at 06:00 IST. SLA: complete by 07:30 IST.
  Owned by: data-platform@freshmart.com

  ### Common failure modes and how to fix them:

  **Failure 1: accepted_values test fails for 'status' column**
  Cause: Orders team added a new status value.
  Fix:
    1. Check DLQ: python dlq_reprocess.py --dry-run --pipeline silver_orders --date {DATE}
    2. Add new status to VALID_STATUSES in pipeline/validate.py
    3. Re-run: dbt run -s silver_orders silver_orders_tests
    4. Reprocess DLQ: python dlq_reprocess.py --pipeline silver_orders --date {DATE}
    5. Confirm in Slack: silver_orders complete. DLQ cleared.
  Time to fix: 30 minutes.

  **Failure 2: source freshness check fails (Bronze > 6 hours old)**
  Cause: Bronze ingestion pipeline failed.
  Fix: Check silver_ingestion Airflow DAG. Trigger manual run.
  Escalate to: Rahul if ingestion issue persists > 2 hours.
  Time to fix: depends on upstream.

  **Failure 3: Memory error in Spark transformation**
  Fix: Re-trigger the Airflow DAG task.
  If fails again: increase spark.executor.memory in pipeline/config.py (try 12g)
  Re-trigger.
  Time to fix: 15 minutes.


COMPONENT 2: ON-CALL ROTATION

  Week-long rotation. One engineer per week.
  Rotation for 8-person team: each engineer on-call once every 8 weeks.
  Tools: PagerDuty rotation schedule.

  ON-CALL RESPONSIBILITIES:
    - Respond to P1 alerts within 5 minutes (any time)
    - Respond to P2 alerts within 1 hour (business hours)
    - Use runbook to resolve, escalate if not in runbook
    - Write post-mortem for any P1 or repeated P2
    - Monday: review previous week's incidents, improve runbooks

  ON-CALL GUARDRAILS (prevents burnout):
    - Max 2 P1 pages per night (otherwise process is broken)
    - If P3/P4 pages wake engineer: alert threshold is too low → fix it
    - On-call engineer has no feature work that week (protection time)
    - Incidents that exceed 2 hours get a P1 post-mortem


COMPONENT 3: INCIDENT POST-MORTEMS

  Template (blameless — no blame, only system analysis):

  ## Incident: silver_orders missed SLA — 2026-03-17

  **Duration:** 2026-03-17 07:42 IST to 09:15 IST (1h 33m)
  **Impact:** Finance dashboard stale from 07:30 to 09:15 (1h 45m)
  **Severity:** P1 (SLA breach)

  **Timeline:**
    06:00 — silver_orders pipeline started
    06:14 — pipeline failed: accepted_values error on status='scheduled'
    06:15 — P2 alert fired (Slack #data-alerts)
    07:30 — SLA deadline. Gold not ready. P1 escalated.
    07:32 — On-call engineer acknowledged page
    07:45 — Root cause identified: new 'scheduled' status in orders system
    08:12 — Fix deployed, DLQ reprocessed
    09:15 — Gold rebuilt. Finance dashboard updated.

  **Root cause:** Orders team deployed new status enum value without notifying
  data team or updating the data contract.

  **What went wrong:**
    1. No data contract enforcement — source can change enums without review
    2. P2 alert fired but nobody acted for 1h 16min → should have been P1

  **Action items:**
    [ ] Add data contract CI check for enum changes (owner: Priya, by 2026-03-31)
    [ ] Escalate silver_orders failures to P1 if SLA is within 1 hour
    [ ] Add 'scheduled' and future status additions to accepted_values test


COMPONENT 4: ALERT THRESHOLD CALIBRATION

  Review weekly: are alerts firing too much or too little?
  Target: on-call engineer should receive 1-2 P1/P2 alerts per week on average.
  If receiving 20+ alerts per week: alert fatigue → raise thresholds.
  If receiving 0 alerts for 4 weeks but incidents found later: too quiet → lower.

  Monthly review: look at false positive rate:
    False positive rate = (alerts that required no action / total alerts)
    Target: < 20% false positive rate.
    If > 20%: improve alert specificity.`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between monitoring and observability for a data pipeline?',
            a: `Monitoring is the practice of asking predefined questions about a system and alerting when a threshold is crossed. You define the metric, define the threshold, and get an alert when the threshold is breached. A row count check, a pipeline failure alert, and a source freshness check are all monitoring. Monitoring works well for failure modes you have anticipated.

Observability is the property of a system that allows you to answer arbitrary questions about its behaviour from the outside — even questions you did not think to ask when you built the monitoring. An observable system produces rich enough signals (logs, metrics, traces) that when something unusual happens, you can determine why it happened, which component introduced it, and how it propagated through the system.

The practical difference: monitoring tells you that the daily revenue figure is wrong. Observability tells you that the revenue figure is wrong because order_status='scheduled' was introduced in the orders system at 14:32 on Friday, 48,234 records were rejected with the accepted_values error, the DLQ has been accumulating since then, and the Silver pipeline has failed 12 consecutive times. With monitoring alone, you know something is wrong. With observability, you can diagnose it in 10 minutes instead of 2 hours.

The three signals of observability are metrics (numeric time-series measurements — row counts, durations, error rates), logs (structured JSON records of discrete events with full context — each row rejection with its error reason), and traces (end-to-end paths of specific events through the system — tracing one order through Bronze to Silver to Gold).

For data pipelines: monitoring answers "is this pipeline running on time?" Observability answers "why did this pipeline fail, exactly which records were affected, and where in the transformation chain did the problem first appear?"`,
          },
          {
            q: 'Q2. What is an SLO and how does it differ from an SLA? Why does the distinction matter?',
            a: `An SLI (Service Level Indicator) is the actual measured metric — what you measure. For a data pipeline, this might be pipeline completion time, data freshness age, or error rate.

An SLO (Service Level Objective) is the target value for that metric — what the team aims to achieve internally. "The Silver orders pipeline completes within 60 minutes of its scheduled start time" is an SLO. SLOs are internal commitments that the engineering team sets based on their technical capabilities and the business's needs. They are typically measured as a percentage of successful periods — "99% of pipeline runs complete within 60 minutes over any 30-day rolling window." The remaining 1% is the error budget.

An SLA (Service Level Agreement) is the contractual commitment to an external consumer — what the business promises. "Finance dashboards will have yesterday's data available by 08:00 IST" is an SLA. SLAs are external commitments with business consequences if breached — an unhappy finance team, escalation to leadership, trust damage.

The distinction matters because SLOs and SLAs serve different purposes. The SLO is an engineering target with an error budget — when the error budget is exhausted, the team stops feature work and focuses on reliability. The SLA is a business contract — breaching it has external consequences that are not within the team's direct control to manage by adjusting thresholds.

A good practice: set SLOs stricter than SLAs. If the SLA is "data available by 08:00 IST," set the SLO as "pipeline completes within 90 minutes of 06:00 start" — completing by 07:30. This creates a buffer so that a normal pipeline delay still meets the SLA even if the SLO is missed. Monitoring and alerting are calibrated to the SLO, not the SLA — you alert when the SLO is at risk, giving time to respond before the SLA is breached.`,
          },
          {
            q: 'Q3. How do you structure alerting for a data platform to avoid alert fatigue?',
            a: `Alert fatigue is the most dangerous failure mode of a monitoring system. When every minor warning pages the on-call engineer, they start ignoring pages. The one genuine critical incident then goes undetected for hours. The solution is tiered alerting that routes alerts to the right channel at the right urgency.

P1 (critical) alerts page the on-call engineer immediately at any hour via PagerDuty. These are incidents where the business is impacted now or a major SLA is about to be breached. The data platform should generate very few P1 alerts per week — if P1s are firing daily, the threshold is too low or the platform is too fragile.

P2 (high) alerts send a Slack message to the #data-alerts channel. These require action within an hour during business hours but do not warrant waking anyone. A pipeline running 30 minutes behind schedule, a DLQ depth growing rapidly, or a dbt test failure that blocks Gold.

P3 (medium) alerts send a message to #data-warnings. These are informational — a pipeline is slow but will complete, a source freshness warning, a row count slightly below the anomaly threshold.

P4 (low) are collected into a daily or weekly digest email. No human action expected immediately.

Beyond tiering, good alert messages are essential. A P1 that says "pipeline FAILED" is less useful than one that says "silver_orders failed at validation with 48,234 rejected rows (status='scheduled' not in allowlist), SLA deadline in 1h 45m, runbook: https://..." The message should include what happened, why, what the impact is, how long until SLA breach, and where to find the runbook.

The operational target: on-call engineers should receive 1-2 P1/P2 pages per week on average. More than that indicates either the platform is too fragile or the thresholds are too sensitive. Monitor false positive rate monthly — if more than 20% of alerts require no action, the thresholds need raising.`,
          },
          {
            q: 'Q4. What should a runbook contain for a data pipeline failure? Why are runbooks important for on-call?',
            a: `A runbook is a documented procedure for responding to a known failure mode. For data pipelines, it is the document the on-call engineer reads at 2 AM when they get paged and need to resolve an incident without fully waking up their brain.

A good runbook contains: a brief description of what the pipeline does and its business importance, the SLA deadline so the engineer knows how much time they have, the most common failure modes with step-by-step resolution instructions for each, escalation contacts if the engineer cannot resolve it within a set time, and links to relevant logs, dashboards, and related runbooks.

The step-by-step instructions are the most important part. For each failure mode, the instructions should be specific and executable — not "investigate the error" but "check DLQ with: python dlq_reprocess.py --dry-run --pipeline silver_orders --date {DATE}" and "add the new status to VALID_STATUSES in pipeline/validate.py" and "re-run with: dbt run -s silver_orders && dbt test -s silver_orders." An on-call engineer with moderate knowledge of the system should be able to resolve the most common failures without needing to call the pipeline's author.

Runbooks are important for three reasons. First, they reduce MTTR (mean time to resolution) — a common failure that takes 2 hours without a runbook takes 20 minutes with one. Second, they enable equitable on-call — any engineer can handle any pipeline failure, not just the original author. Third, they document institutional knowledge — every failure that the team investigates is an opportunity to add a runbook entry that makes the next occurrence cheaper. Runbooks must be kept current — a runbook that describes the old resolution procedure for a pipeline that was refactored is worse than no runbook.`,
          },
          {
            q: 'Q5. How do you use structured logging in a data pipeline, and why is it better than print() or unstructured logs?',
            a: `Structured logging means emitting log entries as machine-readable JSON with consistent field names, rather than human-readable free-text strings. Each log entry is a document with fields like event, pipeline, run_id, stage, rows_extracted, duration_sec, error_message — queryable by a log aggregator.

Unstructured logs like print("Processing orders...") or logger.info("Pipeline completed in 47 seconds") are only readable by humans. To answer "what was the average extraction duration for silver_orders over the last 30 days?" you would need to parse free-text log messages with regex and aggregate manually. This is brittle and slow.

Structured logs answer the same question with a log query: SELECT AVG(duration_sec) WHERE event = 'extract_complete' AND pipeline = 'silver_orders' AND timestamp >= 30 days ago. CloudWatch Logs Insights, Datadog, and Elasticsearch all support this type of query natively on JSON fields.

The consistent run_id field is particularly important. Every log entry in a pipeline run includes the same run_id, which is generated at the start of the Airflow DAG and propagated to all tasks via XCom. When investigating an incident, you search for the run_id in the log aggregator and see every log entry from every stage of that specific run in chronological order. Without correlation IDs, you would have to manually correlate logs from Airflow, the Spark job, the dbt run, and the validation step — all timestamped separately, with no shared identifier.

The practical implementation is a PipelineLogger class that wraps Python's logging module and always emits JSON to stdout. stdout is collected by the container runtime and forwarded to the log aggregator. Every log entry has: timestamp, level, event (a specific event name), pipeline, run_id, and any relevant context fields (stage, row counts, duration, error details). This small investment in logging infrastructure pays back every time an incident occurs and the cause is visible in the logs within 5 minutes rather than 2 hours.`,
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
            error: `Airflow SLA miss alert fires every day even though the pipeline completes on time — false positive rate is 100%`,
            cause: 'The SLA is configured as a timedelta from the DAG\'s start_date (the epoch of the first run), not from the scheduled execution time of each individual run. The SLA miss callback fires when the total time from start_date to the current run exceeds the timedelta. For a daily pipeline with a 2-hour SLA configured as sla=timedelta(hours=2) at the DAG level, after the pipeline has run for 30 days, the total elapsed time from start_date is 30 days — which exceeds 2 hours immediately, triggering the SLA miss on every run.',
            fix: 'Configure SLA at the task level using the sla parameter on individual task operators, not at the DAG level. Task-level SLA is measured from when the task starts executing (or becomes eligible), not from the DAG\'s epoch start_date. Alternatively, implement custom SLA monitoring in a post-pipeline task that compares actual completion time to the scheduled deadline using context[\'data_interval_end\'] and the expected SLA time.',
          },
          {
            error: `Monitoring dashboard shows all pipelines as "OK" but a Gold table has been stale for 6 hours — the freshness check is not working`,
            cause: 'The freshness check queries MAX(updated_at) from the Gold table, but the Gold table uses a loaded_at column (not updated_at) that reflects when dbt loaded the data. However, dbt is configured to run --full-refresh only on Sundays. During weekday incremental runs, it merges rows but does not update loaded_at on unchanged rows. MAX(loaded_at) shows the timestamp of the last new row inserted, but for a day with no new orders (public holiday), no rows were inserted and the MAX(loaded_at) remains from the previous day — making the table appear stale when it is actually correct.',
            fix: 'Use a separate freshness_checked_at column that is updated on every dbt run regardless of whether rows were modified: add CURRENT_TIMESTAMP() AS freshness_checked_at to the final SELECT in the Gold model. This column always reflects when the model last ran, even if no data changed. Point the freshness check at this column instead of updated_at or loaded_at.',
          },
          {
            error: `On-call engineer receives 47 PagerDuty pages in one night — all from the same root cause (source database maintenance window)`,
            cause: 'Alert routing has no deduplication or grouping. The source database went into a 4-hour maintenance window. Every pipeline that tries to read from it during that window fails. Each failure generates its own P1 page. With 47 pipelines reading from the same source, 47 separate P1 pages fired over 4 hours. The on-call engineer acknowledged the first page, identified the maintenance window, but continued receiving pages for 4 hours.',
            fix: 'Implement alert grouping: if the same root cause is likely (multiple pipelines fail with the same connection error within a short time window), group them into one alert. PagerDuty supports alert grouping rules. Also implement dependency-aware alerting: if a source system alert fires, suppress downstream pipeline alerts that depend on that source. Going forward: establish a communication channel with source system owners for maintenance windows — a 30-minute advance notice allows the data team to pause affected pipelines proactively before the maintenance window, preventing all the failure pages.',
          },
          {
            error: `Structured logs are being emitted but CloudWatch Insights queries return no results — the JSON is not being parsed`,
            cause: 'The logs are emitted as print(json.dumps(entry)) to stdout, but the CloudWatch log group is configured for unstructured text ingestion. CloudWatch automatically parses JSON logs only if the log group has the JSON log format enabled, or if the EMF (Embedded Metrics Format) or structured logging format is used. Plain print() to stdout goes to CloudWatch as a raw text string, not as parsed JSON fields. CloudWatch Insights can query it with parse @message "..." regex patterns but not with field filters like fields event.',
            fix: 'Switch from print() to the Python logging module with a CloudWatch-compatible handler that formats output as CloudWatch EMF or configure the log group to use JSON log format. For containers on ECS/Kubernetes: add the awslogs log driver configuration with "awslogs-multiline-pattern" to handle multi-line logs. For simpler setups: use structlog library with the JSON renderer, which outputs each log line as a complete JSON object on a single line, which CloudWatch parses automatically. Verify by running a test query in CloudWatch Insights after deployment: fields @timestamp, event, pipeline | limit 5.',
          },
          {
            error: `DLQ has accumulated 2.3 million records over 90 days but nobody noticed — the monitoring alert threshold was set to 100,000 records`,
            cause: 'The DLQ grew gradually over 90 days — never exceeding the 100,000-record alert threshold in a single day. Each day added 25,000 records (below the threshold). The cumulative total was never tracked. The monitoring checked daily growth, not total pending depth. After 90 days the DLQ holds 2.3 million records, most of which are stale and now represent a historical data gap.',
            fix: 'Monitor total pending DLQ depth, not just daily additions. The alert should fire when total_pending > threshold, not when daily_additions > threshold. For the accumulated backlog: triage the 2.3 million records by error type — some may be stale (the source data is gone, cannot reprocess) and should be marked as expired, others may be reprocessable. Add a weekly DLQ age report: flag any error type that has records pending for > 7 days as requiring human attention. DLQ records older than 30 days that cannot be reprocessed should have a defined expiry policy documented in the governance schema.',
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
        'Monitoring catches fires you anticipated. Observability helps you understand fires you did not. The three signals: metrics (numeric time-series — row counts, durations, error rates), logs (structured JSON events with context — every run, every rejection with its reason), traces (end-to-end paths of specific events through the system). All three together make a pipeline diagnosable.',
        'SLI is the measured metric (pipeline duration). SLO is the internal target (complete within 60 minutes). SLA is the external promise to the business (data available by 08:00 IST). Set SLOs stricter than SLAs to create a buffer. Alert on SLO breach risk, not SLA breach — this gives response time before the business is affected.',
        'Tiered alerting prevents alert fatigue. P1 (SLA breach imminent) → PagerDuty page, any hour. P2 (pipeline degraded, SLA at risk) → Slack #data-alerts, 1-hour response. P3 (slow but will complete, quality warning) → Slack #data-warnings. P4 (informational) → weekly digest. Target: 1-2 P1/P2 pages per on-call week.',
        'Good alert messages are actionable. Include: what failed, why (the actual error), what the impact is, how long until SLA breach, the run ID, and a link to the runbook. An alert that says "pipeline FAILED" is not actionable. An alert with specific error context and resolution steps reduces MTTR from hours to minutes.',
        'Structured logging means emitting JSON with consistent field names, not free-text strings. Every log entry includes: timestamp, level, event name, pipeline, run_id, stage, and relevant context. This makes logs queryable in CloudWatch Insights, Datadog, or Elasticsearch. Average extraction duration over 30 days becomes a single SQL-like query, not manual regex parsing.',
        'Correlation IDs (run_id) are generated at the Airflow DAG level and propagated to every task via XCom. Every log entry from Bronze extraction through Silver transformation through Gold build shares the same run_id. Incident investigation: search for the run_id in the log aggregator, see the complete execution history in order. Without correlation IDs, cross-system investigation takes hours.',
        'DLQ monitoring must track total pending depth, not just daily additions. A DLQ that grows by 25,000 records per day never triggers a 100,000-record threshold in a single day but reaches 2.3 million records in 90 days. Alert on total pending depth. Add age-based alerts: records pending for > 7 days need human attention. Records pending for > 30 days with no reprocessable path need an expiry decision.',
        'Runbooks are documented resolution procedures for known failure modes. A runbook should contain: pipeline description, SLA deadline, step-by-step fixes for common failure modes (specific commands, not vague instructions), escalation contacts, and links to logs/dashboards. Runbooks are the investment that makes on-call sustainable — the on-call engineer should resolve most incidents from the runbook without calling the author.',
        'Pipeline health dashboards show current status, SLO trend, and recent failures. Key panels: pipeline status grid (each pipeline as colored status tile), 30-day SLO compliance trend, daily row counts (extracted/written/rejected), P95 duration vs SLO target, DLQ depth time series, and recent failure table with log links. The goal: "is everything okay?" answered in 10 seconds.',
        'On-call for data teams is sustainable with the right infrastructure: runbooks for every pipeline, tiered alerting with low false positive rates, a weekly rotation (8 engineers = on-call once every 8 weeks), protection time (on-call engineer has no feature work that week), and post-mortems for every P1 that improve runbooks and reduce future incident rates.',
      ]} />

    </LearnLayout>
  )
}