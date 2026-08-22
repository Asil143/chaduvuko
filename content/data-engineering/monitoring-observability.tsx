import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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

export default function MonitoringObservabilityModule() {
  return (
    <LearnLayout
      title="Monitoring and Observability for Data Pipelines"
      description="SLAs, alerting tiers, pipeline health dashboards, structured logging, metric collection, DLQ monitoring, and building an on-call culture for data teams."
      section="Data Engineering — Module 37"
      readTime="70 min"
      updatedAt="August 2026"
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
          questions you did not think to ask when you built the monitoring. This
          module builds both, around FreshCart&rsquo;s Silver orders pipeline.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The three signals of observability — metrics, logs, and traces
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { signal: 'Metrics', color: '#00e676', def: 'Numeric measurements aggregated over time. Row counts, latency percentiles, error rates, queue depths. Low cardinality, high frequency.', tools: 'Prometheus, Datadog, CloudWatch, Grafana', pipeline_use: 'Rows processed per second. Pipeline duration. DLQ depth. Warehouse credit usage.' },
              { signal: 'Logs', color: '#7b61ff', def: 'Discrete events with context. Structured JSON logs that record what happened, when, and with what parameters. High cardinality, queryable.', tools: 'CloudWatch Logs, Elasticsearch/Kibana, Datadog Logs, Loki', pipeline_use: 'Every pipeline run start/end. Validation failures with row details. Retry attempts. DLQ entries.' },
              { signal: 'Traces', color: '#f97316', def: 'End-to-end request paths across services. A trace shows how a specific data event flowed from source through all transformation stages to the Gold table.', tools: 'Jaeger, Zipkin, AWS X-Ray, Datadog APM', pipeline_use: 'Tracing a single order from Kafka event through Bronze → Silver → Gold. Identifying which stage added the most latency.' },
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

        <TryThis>
          A dashboard shows &ldquo;silver_orders: FAILED.&rdquo; That&rsquo;s monitoring. Now name
          three questions only logs or traces could answer about WHY it failed —
          before reading Part 03.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — SLAs and SLOs ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — SLAs, SLOs, and SLIs" />
        <SectionTitle>SLAs, SLOs, and SLIs — The Language of Production Commitments</SectionTitle>

        <Para>
          SLA, SLO, and SLI are terms borrowed from software reliability
          engineering. Using them correctly transforms vague agreements (&ldquo;the
          pipeline should be fast&rdquo;) into measurable, enforceable contracts.
        </Para>

        <CodeBox label="SLI, SLO, SLA — definitions and FreshCart examples">{`SLI (measured):    pipeline completion time, data freshness, error rate, DLQ rate
SLO (internal target): "Silver orders completes within 90 min of scheduled start"
                        "Gold daily_revenue is no older than 2 hours"
                        "Error rate < 1% over any 7-day rolling window"
SLA (external promise): "Finance dashboards have yesterday's data by 08:00 ET"
                         "Any data correction is available within 4 hours"

ERROR BUDGET: SLO "99% of runs complete within 90 min", 6-hourly pipeline:
  Monthly runs: 30 × 4 = 120.  Allowed misses: 120 × 1% ≈ 1.2 runs/month.
  When the budget is exhausted: stop new features, focus on reliability.

Pipeline                SLI                 SLO             SLA
silver_orders_daily     completion_time      < 60 min        —
gold_daily_revenue      data_freshness       < 2h            data by 08:00 ET
ml_feature_store        completion_time      < 30 min        complete by 06:00 ET`}</CodeBox>

        <SubSubTitle>Tracking SLOs in a real table</SubSubTitle>

        <CodeBox label="monitoring.pipeline_slo_tracking">{`CREATE TABLE monitoring.pipeline_slo_tracking (
    run_id UUID NOT NULL, pipeline_name VARCHAR(100) NOT NULL,
    scheduled_start TIMESTAMPTZ NOT NULL, actual_start TIMESTAMPTZ, actual_end TIMESTAMPTZ,
    slo_target_min INT NOT NULL, actual_duration_min DECIMAL(8,2), met_slo BOOLEAN,
    sla_deadline TIMESTAMPTZ, met_sla BOOLEAN, status VARCHAR(20) NOT NULL,
    rows_processed BIGINT, rows_rejected BIGINT, recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}</CodeBox>

        <CodeBox label="The two queries every SLO review actually runs">{`-- Daily SLO report
SELECT pipeline_name, COUNT(*) total_runs,
    ROUND(SUM(CASE WHEN met_slo THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100, 1) slo_met_pct,
    ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY actual_duration_min), 1) p95_duration_min
FROM monitoring.pipeline_slo_tracking
WHERE scheduled_start >= CURRENT_DATE - 30 GROUP BY pipeline_name ORDER BY slo_met_pct ASC;

-- SLA breach history (the ones that matter most)
SELECT pipeline_name, scheduled_start, sla_deadline, actual_end - sla_deadline breach_duration
FROM monitoring.pipeline_slo_tracking
WHERE met_sla = FALSE AND sla_deadline IS NOT NULL AND scheduled_start >= CURRENT_DATE - 30
ORDER BY scheduled_start DESC;`}</CodeBox>

        <Output>{`pipeline_name       total_runs  slo_met_pct  p95_duration_min
silver_orders_daily 30          96.7         64.2
gold_daily_revenue  30          100.0        18.5   ← healthiest pipeline this month
ml_feature_store    30          83.3         41.8   ← worth investigating`}</Output>

        <Callout type="tip">
          Set SLOs stricter than SLAs. If the SLA is &ldquo;data by 08:00 ET,&rdquo; set the
          SLO as &ldquo;completes within 90 minutes of the 06:00 start&rdquo; — done by 07:30.
          Alerting is calibrated to the SLO, giving you time to react before the
          SLA — the business promise — is ever actually breached.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Structured Logging ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Structured Logging" />
        <SectionTitle>Structured Logging — The Foundation of Observable Pipelines</SectionTitle>

        <Para>
          Unstructured log messages like &ldquo;Pipeline completed&rdquo; are useless for
          diagnosis. Structured JSON logs with consistent fields are queryable,
          aggregatable, and searchable.
        </Para>

        <SubSubTitle>A small logger class, used everywhere</SubSubTitle>

        <CodeBox label="PipelineLogger — one class, consistent JSON fields">{`import json, logging
from datetime import datetime, timezone
from typing import Any

class PipelineLogger:
    def __init__(self, pipeline_name: str, run_id: str):
        self.pipeline_name, self.run_id = pipeline_name, run_id

    def _emit(self, level: str, event: str, **kwargs: Any) -> None:
        entry = {'timestamp': datetime.now(timezone.utc).isoformat(), 'level': level,
                 'event': event, 'pipeline': self.pipeline_name, 'run_id': self.run_id, **kwargs}
        print(json.dumps(entry), flush=True)   # stdout → log aggregator

    def info(self, event: str, **kwargs):    self._emit('INFO', event, **kwargs)
    def warning(self, event: str, **kwargs): self._emit('WARNING', event, **kwargs)
    def error(self, event: str, **kwargs):   self._emit('ERROR', event, **kwargs)`}</CodeBox>

        <SubSubTitle>Using it through a real pipeline run</SubSubTitle>

        <CodeBox label="run_silver_pipeline() — one log call per meaningful event">{`def run_silver_pipeline(run_date: str) -> dict:
    run_id = str(uuid4())
    log = PipelineLogger('silver_orders', run_id)
    log.info('pipeline_started', run_date=run_date, trigger='scheduled')

    try:
        rows = extract_from_bronze(run_date)
        log.info('extract_complete', stage='extract', rows_extracted=len(rows), source='bronze.orders')

        valid, rejected = validate_rows(rows)
        if rejected:
            log.warning('validation_rejections', stage='validate', rejected_count=len(rejected),
                        rejection_rate=round(len(rejected) / len(rows), 4))
            write_to_dlq(rejected, run_id)

        rows_written = load_to_silver(valid, run_date)
        log.info('load_complete', stage='load', rows_written=rows_written, target='silver.orders')
        log.info('pipeline_complete', status='success', rows_written=rows_written)
        return {'status': 'success', 'rows_written': rows_written}

    except Exception as exc:
        log.error('pipeline_failed', error_type=type(exc).__name__, error_message=str(exc))
        raise`}</CodeBox>

        <Output>{`{"timestamp": "2026-03-17T06:14:32.847Z", "level": "INFO", "event": "extract_complete",
 "pipeline": "silver_orders", "run_id": "d7c7a7b8-...", "stage": "extract",
 "rows_extracted": 48234, "source": "bronze.orders"}

-- CloudWatch Insights: runs with > 5% rejection rate, last 7 days
fields @timestamp, pipeline, run_id, rejection_rate
| filter event = "pipeline_complete" and rejection_rate > 0.05
| sort @timestamp desc | limit 20`}</Output>

        <SubSubTitle>Correlation IDs — threading one identifier through every system</SubSubTitle>

        <Para>
          Without a shared identifier, a data quality incident spanning Bronze,
          Silver, Gold, and Airflow means manually correlating four separate,
          separately-timestamped logs. Propagating one correlation ID through
          every stage turns that into a single query.
        </Para>

        <CodeBox label="Generating the ID once, in Airflow, and reusing it everywhere">{`from uuid import uuid4

def generate_run_context(**context):
    """Generate correlation ID and push to XCom for all downstream tasks."""
    context['ti'].xcom_push(key='correlation_id', value=str(uuid4()))

def run_bronze_extraction(**context):
    correlation_id = context['ti'].xcom_pull(task_ids='generate_run_context', key='correlation_id')
    log = PipelineLogger('bronze_orders', run_id=correlation_id)
    log.info('extraction_started', stage='bronze')

def run_silver_transform(**context):
    correlation_id = context['ti'].xcom_pull(task_ids='generate_run_context', key='correlation_id')
    log = PipelineLogger('silver_orders', run_id=correlation_id)
    log.info('transform_started', stage='silver')   # same correlation_id — linkable to Bronze`}</CodeBox>

        <Output>{`-- search ONE id, see the whole run across Bronze → Silver → Gold:
fields @timestamp, event, stage, rows_extracted, rows_rejected, error_message
| filter run_id = "d7c7a7b8-3e1a-4a2c-9b4d-..."
| sort @timestamp asc
-- incident investigation: minutes, not hours of cross-log searching`}</Output>
      </section>

      <Divider />

      {/* ── Part 04 — Alerting Tiers ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Alerting Tiers" />
        <SectionTitle>Alerting Tiers — What Gets Paged at 2 AM vs What Waits Until Morning</SectionTitle>

        <Para>
          Alert fatigue is the most dangerous failure mode of a monitoring
          system. When every minor warning pages the on-call engineer, they stop
          responding — the one real incident then goes undetected for hours.
        </Para>

        <CompareTable
          headers={[{ label: 'Priority' }, { label: 'Definition', color: '#ff4757' }, { label: 'Response', color: '#f97316' }, { label: 'Channel', color: '#4285f4' }]}
          keys={['priority', 'def', 'response', 'channel']}
          rows={[
            { priority: 'P1 — Critical', def: 'SLA breach imminent or occurring. Business impact now.', response: 'Page on-call immediately, any hour. Ack within 5 min.', channel: 'PagerDuty + SMS + #incidents' },
            { priority: 'P2 — High', def: 'SLA at risk but not breached. Pipeline degraded.', response: 'Respond within 1 hour, business hours.', channel: '#data-alerts + email' },
            { priority: 'P3 — Medium', def: 'Known issue with workaround. Data quality warning.', response: 'Next working day acceptable.', channel: '#data-warnings' },
            { priority: 'P4 — Low', def: 'Informational. Metric trending in the wrong direction.', response: 'Reviewed weekly.', channel: 'Email digest / dashboard' },
          ]}
        />

        <SubSubTitle>What separates an actionable alert from noise</SubSubTitle>

        <CodeBox label="Bad alert vs good alert, same failure">{`BAD:  Title: silver_orders FAILED
      Body:  Pipeline silver_orders failed at 06:14:32.
      → engineer at 2 AM has no idea what to do next

GOOD: Title: [P2] silver_orders — FAILED — 2026-03-17 06:14 ET
      Failed at: validation stage (step 2 of 4)
      Error:     48,234 rows rejected — unrecognised status 'scheduled'
      Impact:    Gold daily_revenue build blocked. Finance dashboard will be stale.
      SLA:       Gold must be ready by 08:00 ET (1h 45m remaining)
      DLQ:       48,234 rows → pipeline/dlq_reprocess.py
      Runbook:   https://runbooks.freshcart.internal/silver-orders-failure`}</CodeBox>

        <CodeBox label="format_alert_message() — generating the good version automatically">{`def format_alert_message(pipeline: str, run_date: str, stage: str, error: str,
                          impact: str, sla_time: str | None, run_id: str, runbook_url: str) -> str:
    time_to_sla = compute_time_to_sla(sla_time) if sla_time else None
    return f"""
Pipeline:  {pipeline}
Failed at: {stage}
Error:     {error}
Impact:    {impact}
{f"SLA:    {sla_time} ({time_to_sla} remaining)" if sla_time else ""}
Run ID:    {run_id}
Runbook:   {runbook_url}
""".strip()`}</CodeBox>

        <CodeBox label="Wiring it to Airflow's on_failure_callback, routed by priority">{`def on_failure_callback(context):
    dag_id, task_id = context['dag'].dag_id, context['task_instance'].task_id
    priority = determine_alert_priority(dag_id, task_id, context)
    message = format_alert_message(
        pipeline=f'{dag_id}.{task_id}', run_date=context['ds'], stage=task_id,
        error=str(context.get('exception', 'unknown error')),
        impact=get_downstream_impact(dag_id, task_id), sla_time=get_sla_for_pipeline(dag_id),
        run_id=context['run_id'], runbook_url=f'https://runbooks.freshcart.internal/{dag_id}',
    )
    if priority == 'P1':
        send_pagerduty_alert(message, severity='critical')
        send_slack_alert('#incidents', message)
    elif priority == 'P2':
        send_slack_alert('#data-alerts', message)
    else:
        send_slack_alert('#data-warnings', message)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Pipeline Health Dashboard ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Pipeline Health Dashboard" />
        <SectionTitle>Pipeline Health Dashboard — The Operational View</SectionTitle>

        <Para>
          A pipeline health dashboard answers &ldquo;is everything okay?&rdquo; without
          checking six different tools. Effective dashboards show current
          status, trend, and SLO performance — not raw metrics to interpret.
        </Para>

        <CodeBox label="monitoring.pipeline_runs — feeds every dashboard panel">{`CREATE TABLE monitoring.pipeline_runs (
    run_id UUID NOT NULL PRIMARY KEY, pipeline_name VARCHAR(100) NOT NULL, dag_id VARCHAR(100),
    run_date DATE NOT NULL, scheduled_at TIMESTAMPTZ NOT NULL, started_at TIMESTAMPTZ, completed_at TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL,   -- running/success/failed/skipped
    rows_extracted BIGINT, rows_rejected BIGINT, rows_written BIGINT, duration_sec DECIMAL(10,2),
    slo_target_sec INT, met_slo BOOLEAN, sla_deadline TIMESTAMPTZ, met_sla BOOLEAN, error_message TEXT
);`}</CodeBox>

        <CodeBox label="The 'is everything okay?' panel">{`WITH latest_runs AS (
    SELECT DISTINCT ON (pipeline_name) pipeline_name, status, completed_at, met_sla, error_message
    FROM monitoring.pipeline_runs WHERE run_date = CURRENT_DATE
    ORDER BY pipeline_name, started_at DESC
)
SELECT pipeline_name,
    CASE WHEN status = 'success' AND met_sla THEN '✅ OK'
         WHEN status = 'success' AND NOT COALESCE(met_sla, TRUE) THEN '⚠️ SLA MISSED'
         WHEN status = 'running' THEN '🔄 RUNNING'
         WHEN status = 'failed' THEN '🔴 FAILED' ELSE '⏳ PENDING' END AS health_indicator,
    error_message
FROM latest_runs ORDER BY CASE status WHEN 'failed' THEN 0 WHEN 'running' THEN 1 ELSE 2 END;`}</CodeBox>

        <Output>{`pipeline_name          health_indicator   error_message
silver_orders_daily    🔴 FAILED          accepted_values: status 'scheduled' not in list
gold_daily_revenue     ✅ OK              (null)
ml_feature_store       ✅ OK              (null)`}</Output>

        <CodeBox label="7-day SLO trend and the unresolved-issues backlog">{`SELECT run_date, pipeline_name, COUNT(*) runs,
    ROUND(SUM(CASE WHEN met_slo THEN 1 ELSE 0 END)::NUMERIC / NULLIF(COUNT(*), 0) * 100, 1) slo_pct
FROM monitoring.pipeline_runs
WHERE run_date >= CURRENT_DATE - 7 AND status IN ('success', 'failed')
GROUP BY 1, 2 ORDER BY 1 DESC, 2;

SELECT pipeline_name, run_date, status, error_message,
    EXTRACT(EPOCH FROM (NOW() - started_at)) / 3600 hours_since_start
FROM monitoring.pipeline_runs
WHERE status IN ('failed', 'running') AND run_date >= CURRENT_DATE - 2
ORDER BY started_at;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — DLQ Monitoring ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Dead Letter Queue Monitoring" />
        <SectionTitle>DLQ Monitoring — Tracking Rejected Records Across the Platform</SectionTitle>

        <Para>
          A DLQ that is never monitored is worse than no DLQ — it creates the
          illusion that quality is good because the bad records are silently
          quarantined. DLQ monitoring tracks accumulation rate, rejection
          reasons, and the age of unresolved records.
        </Para>

        <SubSubTitle>The accumulation monitor — run after every pipeline</SubSubTitle>

        <CodeBox label="Pending records per pipeline, and the depth-plus-age alert">{`SELECT pipeline_name, error_type, COUNT(*) pending_count,
    EXTRACT(EPOCH FROM (NOW() - MIN(arrived_at))) / 3600 hours_pending
FROM pipeline.dead_letter_queue WHERE status = 'pending'
GROUP BY pipeline_name, error_type ORDER BY pending_count DESC;

-- alert: same error type, > 1000 pending, older than 2 hours
SELECT pipeline_name, error_type, COUNT(*) depth
FROM pipeline.dead_letter_queue
WHERE status = 'pending' AND arrived_at < NOW() - INTERVAL '2 hours'
GROUP BY pipeline_name, error_type HAVING COUNT(*) > 1000 ORDER BY depth DESC;`}</CodeBox>

        <Output>{`pipeline_name    error_type              depth
silver_orders    accepted_values_status  48234   ← the exact incident from this
                                                    module's Real World section`}</Output>

        <SubSubTitle>Reprocessing, once the root cause is fixed</SubSubTitle>

        <CodeBox label="reprocess_dlq() — dry-run first, always">{`def reprocess_dlq(pipeline_name: str, error_type: str, run_date: str, dry_run: bool = False) -> dict:
    records = fetch_pending_dlq_records(pipeline_name=pipeline_name, error_type=error_type, run_date=run_date)
    if not records:
        return {'status': 'no_records', 'count': 0}
    if dry_run:
        return {'status': 'dry_run', 'would_reprocess': len(records)}

    processed, failed = 0, 0
    for record in records:
        try:
            result = reprocess_single_record(record, pipeline_name)
            mark_dlq_resolved(record['dlq_id'], note=f'Reprocessed successfully. Row: {result}')
            processed += 1
        except Exception as exc:
            mark_dlq_failed(record['dlq_id'], note=str(exc))
            failed += 1
    return {'status': 'complete', 'processed': processed, 'failed': failed}`}</CodeBox>

        <SubSubTitle>Alerting on growth, not just a static threshold</SubSubTitle>

        <CodeBox label="check_dlq_health() — an Airflow task after every Silver run">{`def check_dlq_health(**context):
    stats = query_dlq_stats(pipeline_name='silver_orders', run_date=context['ds'])
    if stats.pending_records > 10_000:
        raise ValueError(f"DLQ depth critical: {stats.pending_records} pending. "
                          f"Top error: {stats.top_error_type} ({stats.top_error_count} records).")
    elif stats.pending_records > 1_000:
        send_slack_warning(f"DLQ depth elevated: {stats.pending_records} pending. "
                            f"Top error: {stats.top_error_type}.")`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Metric Collection and Grafana ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Metrics and Dashboards" />
        <SectionTitle>Metrics Collection — What to Measure and How to Expose It</SectionTitle>

        <Para>
          Metrics are numeric time-series measurements — cheaper to store and
          query than logs, and what alerting on thresholds and trends is built on.
        </Para>

        <CodeBox label="The three metric types every pipeline should emit">{`COUNTER (always increasing):   pipeline.runs.total{status="success"}
                                pipeline.rows.rejected{pipeline="silver_orders"}
GAUGE (current value):         pipeline.dlq.depth{pipeline="silver_orders"}
                                pipeline.data_freshness_sec{table="silver.orders"}
HISTOGRAM (distribution):      pipeline.run_duration_seconds{pipeline="silver_orders"}`}</CodeBox>

        <CodeBox label="Emitting to Datadog via statsd">{`from datadog import DogStatsd
statsd = DogStatsd(host='localhost', port=8125)

def emit_pipeline_metrics(pipeline_name: str, status: str, duration_sec: float,
                           rows_extracted: int, rows_rejected: int) -> None:
    tags = [f'pipeline:{pipeline_name}']
    statsd.increment('pipeline.runs.total', tags=tags + [f'status:{status}'])
    statsd.histogram('pipeline.run_duration_seconds', duration_sec, tags=tags)
    if rows_extracted > 0:
        statsd.gauge('pipeline.rejection_rate', rows_rejected / rows_extracted, tags=tags)`}</CodeBox>

        <CodeBox label="Emitting to CloudWatch">{`import boto3
cloudwatch = boto3.client('cloudwatch')

def emit_to_cloudwatch(pipeline_name: str, rows_rejected: int, run_date: str) -> None:
    cloudwatch.put_metric_data(
        Namespace='FreshCart/DataPipelines',
        MetricData=[{'MetricName': 'RowsRejected',
                      'Dimensions': [{'Name': 'PipelineName', 'Value': pipeline_name}],
                      'Value': rows_rejected, 'Unit': 'Count'}],
    )
    # Alarm rule: RowsRejected > 10000 for ANY pipeline, 1 evaluation period`}</CodeBox>

        <Output>{`GRAFANA DASHBOARD PANELS:
1. Pipeline status grid (colored tile per pipeline)   5. DLQ depth (time series)
2. SLO compliance (30-day trend line)                 6. Warehouse credit usage
3. Daily row counts (stacked bar)                     7. Error rate vs SLO line
4. Run duration P95 vs SLO target                     8. Recent failures (table + log links)`}</Output>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Monitoring and Observability</SectionTitle>

        {[
          {
            wrong: '"Monitoring and observability are the same thing, just different names for dashboards"',
            right: 'Part 01 draws the real line: monitoring answers questions you anticipated (is it running, did it finish), observability answers questions you didn\'t think to ask in advance. A dashboard full of green checkmarks is monitoring; being able to trace one specific bad order through Bronze → Silver → Gold via a correlation ID (Part 03) is observability.',
          },
          {
            wrong: '"More alerts means better coverage, so err on the side of alerting more"',
            right: 'This is precisely the alert-fatigue failure this module\'s Error Library and Real World section both document — 47 pages from one root cause, or a false-positive SLA alert firing daily. Part 04\'s tiered model exists to route the RIGHT alerts to the right urgency, not to maximize alert volume.',
          },
          {
            wrong: '"A pipeline health dashboard showing all green means the platform is actually healthy"',
            right: 'This module\'s Error Library has a real case where every pipeline showed "OK" while a Gold table had been stale for 6 hours — the freshness check was reading the wrong timestamp column. A dashboard is only as trustworthy as the queries and columns feeding it; verify what a green checkmark is actually measuring before trusting it.',
          },
          {
            wrong: '"SLOs and SLAs are basically interchangeable terms for \'how fast it should be\'"',
            right: 'Part 02 is specific about why they\'re not: an SLO is an internal engineering target with an error budget the team controls; an SLA is an external promise with business consequences the team does NOT get to unilaterally adjust. Setting SLOs stricter than SLAs is a deliberate buffer, not a coincidence of naming.',
          },
          {
            wrong: '"DLQ monitoring is done once the alert threshold is configured"',
            right: 'This module\'s Error Library shows a DLQ that grew by 25,000 records a day for 90 days, reaching 2.3 million, because the threshold only checked DAILY additions, never total pending depth. A one-time threshold configuration is the beginning of DLQ monitoring, not the end of it — Part 06\'s alerting checks the cumulative depth specifically to avoid this.',
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
        <SectionTitle>Building an On-Call Rotation — The Data Team&rsquo;s First Production Incident Response</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Building a data on-call process from scratch
          </div>

          <Para>
            The data engineering team has grown to 8 people, serving finance,
            operations, and product. The pipeline occasionally fails at night or
            on weekends and nobody finds out until Monday. The team needs a
            sustainable on-call process that doesn&rsquo;t burn engineers out.
          </Para>

          <SubSubTitle>Runbooks — so the on-call engineer isn&rsquo;t starting from zero</SubSubTitle>

          <CodeBox label="silver_orders runbook — excerpted">{`## silver_orders Runbook
Runs daily at 06:00 ET. SLA: complete by 07:30 ET. Owner: data-platform@freshcart.com

**Failure 1: accepted_values test fails for 'status' column**
Cause: Orders team added a new status value.
Fix:
  1. python dlq_reprocess.py --dry-run --pipeline silver_orders --date {DATE}
  2. Add new status to VALID_STATUSES in pipeline/validate.py
  3. dbt run -s silver_orders && dbt test -s silver_orders
  4. python dlq_reprocess.py --pipeline silver_orders --date {DATE}
Time to fix: 30 minutes.

**Failure 2: source freshness check fails (Bronze > 6 hours old)**
Fix: Check silver_ingestion Airflow DAG, trigger a manual run.
Escalate to: Marcus if ingestion issue persists > 2 hours.`}</CodeBox>

          <SubSubTitle>Rotation, and the guardrails that prevent burnout</SubSubTitle>

          <CodeBox label="8-person rotation and its non-negotiable limits">{`Week-long rotation, PagerDuty schedule: each engineer on-call once every 8 weeks.
Responsibilities: P1 within 5 min (any hour), P2 within 1 hour (business hours),
                  post-mortem for any P1 or repeated P2.

GUARDRAILS:
  Max 2 P1 pages per night — otherwise the process itself is broken.
  P3/P4 pages that wake someone → the threshold is wrong, fix it, don't just endure it.
  On-call engineer has zero feature work that week (protection time).`}</CodeBox>

          <SubSubTitle>A real post-mortem, and the calibration loop that follows it</SubSubTitle>

          <CodeBox label="Blameless post-mortem — system analysis, not blame">{`## Incident: silver_orders missed SLA — 2026-03-17
Duration: 06:00–09:15 ET (SLA breached at 07:30). Severity: P1.

Timeline:
  06:14 — pipeline failed: accepted_values error on status='scheduled'
  06:15 — P2 alert fired (should have escalated to P1 sooner)
  07:32 — on-call acknowledged after SLA breach escalation
  08:12 — fix deployed, DLQ reprocessed → 09:15 Gold rebuilt

Root cause: orders team deployed a new status enum without notifying data team.
Action items:
  [ ] Add data contract CI check for enum changes (owner: Emily, by 2026-03-31)
  [ ] Escalate silver_orders failures to P1 if SLA is within 1 hour`}</CodeBox>

          <Output>{`Monthly alert calibration review:
Target: 1-2 P1/P2 alerts per on-call week.
20+ alerts/week  → alert fatigue, raise thresholds.
0 alerts for 4 weeks, but incidents found later → too quiet, lower thresholds.
False positive rate (alerts needing no action / total alerts): target < 20%.`}</Output>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
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

An SLA (Service Level Agreement) is the contractual commitment to an external consumer — what the business promises. "Finance dashboards will have yesterday's data available by 08:00 ET" is an SLA. SLAs are external commitments with business consequences if breached — an unhappy finance team, escalation to leadership, trust damage.

The distinction matters because SLOs and SLAs serve different purposes. The SLO is an engineering target with an error budget — when the error budget is exhausted, the team stops feature work and focuses on reliability. The SLA is a business contract — breaching it has external consequences that are not within the team's direct control to manage by adjusting thresholds.

A good practice: set SLOs stricter than SLAs. If the SLA is "data available by 08:00 ET," set the SLO as "pipeline completes within 90 minutes of 06:00 start" — completing by 07:30. This creates a buffer so that a normal pipeline delay still meets the SLA even if the SLO is missed. Monitoring and alerting are calibrated to the SLO, not the SLA — you alert when the SLO is at risk, giving time to respond before the SLA is breached.`,
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Configuring Airflow SLA at the DAG level instead of the task level',
            a: 'DAG-level SLA is measured from the DAG\'s epoch start_date, not from each run\'s scheduled time — after 30 days of a daily pipeline, the elapsed time from start_date already exceeds any reasonable SLA, so it fires on every single run. This exact bug is in the Error Library below; the fix is setting sla on individual task operators.',
          },
          {
            q: 'Pointing a freshness check at whichever timestamp column happens to exist',
            a: 'A loaded_at column that dbt only updates on rows that actually changed will show yesterday\'s timestamp on a quiet day with no new orders — making a perfectly fine table look stale. Use a column like freshness_checked_at that updates on every run regardless of whether any row changed.',
          },
          {
            q: 'Treating print() statements as logging because they show up in the console during local development',
            a: 'print() output has no structure, no consistent fields, and often isn\'t even captured as parseable JSON by the log aggregator in production — Part 03\'s PipelineLogger exists because "it worked when I ran it locally" is not the same as "it\'s queryable when an incident happens at 2 AM."',
          },
          {
            q: 'Building a DLQ alert that only checks the day\'s new additions',
            a: 'This module\'s Error Library documents a DLQ that reached 2.3 million records over 90 days because the alert only fired on daily growth exceeding a threshold, never on cumulative depth. Always alert on total pending count, not just the delta since yesterday.',
          },
          {
            q: 'Writing runbook steps as vague investigation prompts instead of exact commands',
            a: '"Investigate the error" tells an on-call engineer nothing they didn\'t already know from the alert. Part 09\'s runbook excerpt works because every step is copy-pasteable — an exact command, an exact file, an exact re-run instruction — which is what actually gets an unfamiliar engineer through an incident at 2 AM.',
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
        'SLI is the measured metric (pipeline duration). SLO is the internal target (complete within 60 minutes). SLA is the external promise to the business (data available by 08:00 ET). Set SLOs stricter than SLAs to create a buffer. Alert on SLO breach risk, not SLA breach — this gives response time before the business is affected.',
        'Tiered alerting prevents alert fatigue. P1 (SLA breach imminent) → PagerDuty page, any hour. P2 (pipeline degraded, SLA at risk) → Slack #data-alerts, 1-hour response. P3 (slow but will complete, quality warning) → Slack #data-warnings. P4 (informational) → weekly digest. Target: 1-2 P1/P2 pages per on-call week.',
        'Good alert messages are actionable. Include: what failed, why (the actual error), what the impact is, how long until SLA breach, the run ID, and a link to the runbook. An alert that says "pipeline FAILED" is not actionable. An alert with specific error context and resolution steps reduces MTTR from hours to minutes.',
        'Structured logging means emitting JSON with consistent field names, not free-text strings. Every log entry includes: timestamp, level, event name, pipeline, run_id, stage, and relevant context. This makes logs queryable in CloudWatch Insights, Datadog, or Elasticsearch. Average extraction duration over 30 days becomes a single SQL-like query, not manual regex parsing.',
        'Correlation IDs (run_id) are generated at the Airflow DAG level and propagated to every task via XCom. Every log entry from Bronze extraction through Silver transformation through Gold build shares the same run_id. Incident investigation: search for the run_id in the log aggregator, see the complete execution history in order. Without correlation IDs, cross-system investigation takes hours.',
        'DLQ monitoring must track total pending depth, not just daily additions. A DLQ that grows by 25,000 records per day never triggers a 100,000-record threshold in a single day but reaches 2.3 million records in 90 days. Alert on total pending depth. Add age-based alerts: records pending for > 7 days need human attention. Records pending for > 30 days with no reprocessable path need an expiry decision.',
        'Runbooks are documented resolution procedures for known failure modes. A runbook should contain: pipeline description, SLA deadline, step-by-step fixes for common failure modes (specific commands, not vague instructions), escalation contacts, and links to logs/dashboards. Runbooks are the investment that makes on-call sustainable — the on-call engineer should resolve most incidents from the runbook without calling the author.',
        'Pipeline health dashboards show current status, SLO trend, and recent failures. Key panels: pipeline status grid (each pipeline as colored status tile), 30-day SLO compliance trend, daily row counts (extracted/written/rejected), P95 duration vs SLO target, DLQ depth time series, and recent failure table with log links. The goal: "is everything okay?" answered in 10 seconds.',
        'On-call for data teams is sustainable with the right infrastructure: runbooks for every pipeline, tiered alerting with low false positive rates, a weekly rotation (8 engineers = on-call once every 8 weeks), protection time (on-call engineer has no feature work that week), and post-mortems for every P1 that improve runbooks and reduce future incident rates.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 38 covers data governance — data catalogues, column-level lineage, data classification, and role-based access control — the four pillars every mature data platform must have in place.
        </p>
        <Link href="/learn/data-engineering/data-governance" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 38 → Data Governance — Catalogues, Lineage and Access Control
        </Link>
      </div>
    </LearnLayout>
  )
}
