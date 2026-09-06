import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Pipeline Orchestration — Airflow, DAGs, Scheduling, Dependency Management — Data Engineering | Chaduvuko',
  description:
    'What orchestration actually does, Airflow architecture and DAG design, scheduling patterns, dependency management, backfills, Sensors, task groups, and when to use Prefect or Dagster instead.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function PipelineOrchestrationModule() {
  return (
    <LearnLayout
      title="Pipeline Orchestration — Airflow, DAGs, Scheduling, and Dependency Management"
      description="What orchestration actually does, Airflow architecture, DAG design, scheduling, backfills, Sensors, and when to use alternatives."
      section="Data Engineering — Module 28"
      readTime="70 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — What Orchestration Actually Is ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Orchestration Actually Does" />
        <SectionTitle>Orchestration Is Not Scheduling — It Is Coordination</SectionTitle>

        <Para>
          A common misconception is that an orchestrator is just a fancy cron job.
          Cron runs a script at a time. An orchestrator does far more: it manages
          dependencies between tasks, retries failed tasks with the right policy,
          records the history of every run, provides visibility into current
          execution state, handles backfills when pipelines are deployed late,
          routes failures to the right alert channels, and scales workers to handle
          parallel execution across dozens of simultaneous pipeline runs.
        </Para>

        <Para>
          The distinction matters because the question &ldquo;why do I need Airflow when
          I have cron?&rdquo; has a precise answer: cron tells you when to run. Airflow
          tells you what to run, in what order, on what conditions, with what
          resource limits, and what to do when it fails. This module builds up
          FreshCart&rsquo;s actual morning DAG — the pipeline that turns raw orders
          into Gold-layer revenue tables every night — one Airflow concept at a time.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            What an orchestrator provides that cron does not
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { name: 'Dependency management', desc: 'Task B only runs after Task A succeeds. Cross-DAG dependencies. Sensor-based triggers.' },
              { name: 'Retry intelligence', desc: 'Per-task retry count, delay, exponential backoff, dead lettering on exhaustion.' },
              { name: 'Execution history', desc: 'Full run history, task logs, duration trends, SLA reports.' },
              { name: 'Backfill', desc: 'Run pipelines for historical date ranges automatically when deployed late.' },
              { name: 'Parallelism control', desc: 'Limit concurrency per pool, per DAG, per task. Prevent resource exhaustion.' },
              { name: 'Visibility', desc: 'Graph view, Gantt chart, task duration — see the state of the entire platform at a glance.' },
              { name: 'Dynamic task generation', desc: 'Generate tasks at runtime based on data (dynamic task mapping).' },
              { name: 'Alerts', desc: 'SLA misses, task failures, success callbacks — all wired to Slack, PagerDuty, email.' },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.08em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Airflow Architecture ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Airflow Architecture" />
        <SectionTitle>Airflow Architecture — How It Actually Works Inside</SectionTitle>

        <Para>
          Apache Airflow is the dominant orchestration tool for data engineering.
          Understanding its internal architecture — not just how to write DAGs —
          lets you tune it, scale it, and diagnose failures that are architectural
          rather than code bugs.
        </Para>

        <SubSubTitle>Five components, one job each</SubSubTitle>

        <CodeBox label="Airflow architecture — every component and what it does">{`WEBSERVER
  • Flask app serving the UI — graph view, Gantt chart, task logs, run history
  • Reads state from the metadata database (does not execute tasks)

SCHEDULER
  • The brain — runs continuously, parses DAG files every heartbeat (30s default)
  • Creates DagRuns when schedule intervals trigger, queues eligible tasks
  • Airflow 2.x supports multiple scheduler instances for HA

EXECUTOR
  • Receives queued task instances from the scheduler and runs them
  • SequentialExecutor: one task at a time, dev/testing only
  • LocalExecutor:      subprocesses on the scheduler machine, small teams
  • CeleryExecutor:     distributes to workers via Redis/RabbitMQ, horizontal scale
  • KubernetesExecutor: one pod per task, fully isolated, scales to zero — most common in 2026

METADATA DATABASE (PostgreSQL or MySQL)
  • Stores all state: DAG definitions, DagRuns, TaskInstances, XCom, pools
  • Source of truth — if the DB is down, Airflow stops

WORKERS
  • Actually execute the task code, write logs, report success/failure back to the DB`}</CodeBox>

        <Output>{`Task execution, start to finish:
1. Scheduler parses DAG file → creates DagRun at schedule time
2. Scheduler evaluates dependencies → marks eligible tasks QUEUED
3. Scheduler sends the TaskInstance to the Executor
4. Executor assigns the task to a Worker
5. Worker runs the task code, writes logs, reports SUCCESS/FAILURE to metadata DB
6. Scheduler sees SUCCESS → queues downstream tasks
7. UI reads state from metadata DB → task shows green`}</Output>

        <SubSubTitle>Logical date vs execution time — the most confusing concept in Airflow</SubSubTitle>

        <Para>
          The <code>logical_date</code> (called <code>execution_date</code> before
          Airflow 2.2) is <strong>not</strong> when the DAG run executes — it is the
          start of the data interval the run is responsible for. Airflow always runs
          one interval behind, because it waits for the interval to fully close
          before processing it.
        </Para>

        <CodeBox label="What logical_date actually means">{`# DAG schedule: '0 6 * * *' (daily at 06:00 UTC)
# The run that executes at 2026-03-17 06:00 UTC has:
#   logical_date:       2026-03-16 06:00:00 UTC
#   data_interval_start: 2026-03-16 06:00:00 UTC
#   data_interval_end:   2026-03-17 06:00:00 UTC
# → at 06:00 on the 17th, all of the 16th's data is complete and safe to process

def process_orders(**context):
    run_date_wrong = datetime.now().strftime('%Y-%m-%d')                 # NOT reproducible on backfill
    run_date_right = context['data_interval_start'].strftime('%Y-%m-%d') # reproducible on backfill

# Jinja templates for the same value:
# {{ ds }}                  → '2026-03-16'
# {{ ds_nodash }}           → '20260316'
# {{ data_interval_start }} → '2026-03-16T06:00:00+00:00'`}</CodeBox>

        <Output>{`# Backfilling 2026-02-15 with the WRONG version:
run_date_wrong → today's actual date, no matter what's being backfilled — broken

# Backfilling 2026-02-15 with the RIGHT version:
run_date_right → '2026-02-14'  (logical_date for the Feb 15 run is Feb 14) — correct`}</Output>

        <TryThis>
          A DAG is scheduled <code>&apos;0 2 * * *&apos;</code> and today is March 18. Work
          out, on paper, the <code>logical_date</code> and <code>data_interval_end</code> of
          the run that just fired — then check your answer against the pattern above.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 03 — DAG Design Patterns ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — DAG Design Patterns" />
        <SectionTitle>DAG Design — Building FreshCart&rsquo;s Morning Pipeline</SectionTitle>

        <Para>
          A DAG file is Python code — which means it can be a beautifully simple
          dependency declaration or a 600-line mess of business logic embedded
          directly in the DAG. The rule: DAG files are configuration, not logic.
          All business logic lives in the pipeline package; the DAG wires tasks
          together and sets schedules, retries, and dependencies.
        </Para>

        <SubSubTitle>DAG-level configuration</SubSubTitle>

        <CodeBox label="dags/freshcart_morning_pipeline.py — default_args and the DAG shell">{`from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python   import PythonOperator
from airflow.operators.bash     import BashOperator
from airflow.operators.empty    import EmptyOperator
from airflow.utils.task_group   import TaskGroup
from airflow.models             import Variable

default_args = {
    'owner': 'data-team', 'depends_on_past': False,
    'retries': 2, 'retry_delay': timedelta(minutes=3),
    'retry_exponential_backoff': True,
    'execution_timeout': timedelta(minutes=30),
    'email_on_failure': True, 'email': ['data-team@freshcart.com'],
}

with DAG(
    dag_id          = 'freshcart_morning_pipeline',
    default_args    = default_args,
    description     = 'FreshCart daily data platform — Bronze → Silver → Gold',
    schedule        = '0 2 * * *',    # 02:00 UTC daily
    start_date      = datetime(2026, 1, 1),
    catchup         = False,          # do not backfill on deploy
    max_active_runs = 1,              # no concurrent runs
    tags            = ['daily', 'production', 'silver', 'gold'],
) as dag:
    start = EmptyOperator(task_id='start')
    end   = EmptyOperator(task_id='end')`}</CodeBox>

        <SubSubTitle>Extraction — a parallel task group</SubSubTitle>

        <CodeBox label="dags/freshcart_morning_pipeline.py — extracting from four sources at once">{`with TaskGroup('extract', tooltip='Extract from all source systems') as extract_group:

    def make_extract_task(source: str, pool_slots: int = 1):
        """Factory for extraction tasks — avoids repetition."""
        def extract_fn(**context):
            from pipelines.extract import run_extraction
            run_date = context['data_interval_start'].strftime('%Y-%m-%d')
            run_extraction(source=source, run_date=run_date)

        return PythonOperator(
            task_id=f'extract_{source}', python_callable=extract_fn,
            pool='source_db_pool', pool_slots=pool_slots,
            sla=timedelta(minutes=15),
        )

    extract_orders     = make_extract_task('orders')
    extract_customers  = make_extract_task('customers')
    extract_payments   = make_extract_task('payments')
    extract_deliveries = make_extract_task('deliveries')
    # these four run in PARALLEL — no dependency between them within the group`}</CodeBox>

        <SubSubTitle>Transformation — dbt Silver, then dbt Gold</SubSubTitle>

        <CodeBox label="dags/freshcart_morning_pipeline.py — the dbt layers, run after extraction completes">{`dbt_silver = BashOperator(
    task_id='dbt_silver',
    bash_command=(
        'dbt run --target prod --select staging.* silver.* '
        '--vars \\'{"run_date": "{{ ds }}"}\\' '
        '&& dbt test --target prod --select staging.* silver.*'
    ),
    env={'DBT_PROFILES_DIR': '/etc/dbt', 'SNOWFLAKE_ACCOUNT': Variable.get('snowflake_account')},
    execution_timeout=timedelta(minutes=45), sla=timedelta(minutes=40),
)

dbt_gold = BashOperator(
    task_id='dbt_gold',
    bash_command=(
        'dbt run --target prod --select gold.* --vars \\'{"run_date": "{{ ds }}"}\\' '
        '&& dbt test --target prod --select gold.*'
    ),
    env={'DBT_PROFILES_DIR': '/etc/dbt'},
    execution_timeout=timedelta(minutes=20), sla=timedelta(minutes=15),
)`}</CodeBox>

        <SubSubTitle>Quality checks and the finance notification</SubSubTitle>

        <CodeBox label="dags/freshcart_morning_pipeline.py — final two tasks, wired with XCom">{`def run_quality_checks(**context):
    from pipelines.quality import check_all_gold_tables
    run_date = context['data_interval_start'].strftime('%Y-%m-%d')
    result   = check_all_gold_tables(run_date=run_date)
    if result.has_anomalies:
        raise ValueError(f'Quality checks failed: {result.summary}')
    context['ti'].xcom_push(key='quality_result', value=result.to_dict())

quality_checks = PythonOperator(task_id='quality_checks', python_callable=run_quality_checks,
                                 execution_timeout=timedelta(minutes=5))

def notify_finance(**context):
    from pipelines.notifications import send_daily_summary
    run_date       = context['data_interval_start'].strftime('%Y-%m-%d')
    quality_result = context['ti'].xcom_pull(task_ids='quality_checks', key='quality_result')
    send_daily_summary(run_date=run_date, quality=quality_result)

notify = PythonOperator(task_id='notify_finance', python_callable=notify_finance)

# ── the whole graph in one line ───────────────────────────────────────────────
start >> extract_group >> dbt_silver >> dbt_gold >> quality_checks >> notify >> end`}</CodeBox>

        <Output>{`Graph view — freshcart_morning_pipeline, 2026-03-17 02:00 run
start → [extract_orders, extract_customers, extract_payments, extract_deliveries]
      → dbt_silver → dbt_gold → quality_checks → notify_finance → end
Total duration: 38 min 12 s   Status: success`}</Output>

        <SubSubTitle>Pools — controlling resource consumption</SubSubTitle>

        <Para>
          Without pools, 20 tasks all connecting to the same source replica
          simultaneously exhaust its connection limit — some fail, others slow
          down. A pool caps concurrent usage of one shared resource without
          limiting overall task parallelism.
        </Para>

        <CodeBox label="Assigning tasks to pools">{`# airflow pools set source_db_pool 5 "Max 5 concurrent source DB connections"
# airflow pools set snowflake_pool  8 "Max 8 concurrent Snowflake queries"
# airflow pools set api_pool        3 "Max 3 concurrent API calls"

extract_orders = PythonOperator(
    task_id='extract_orders', python_callable=extract_orders_fn,
    pool='source_db_pool', pool_slots=1,   # heavy tasks can consume 2+ slots
)

# A REAL POOL STRATEGY FOR A MEDIUM PLATFORM:
# source_db_pool: 5   snowflake_pool: 8   api_pool: 3   dbt_pool: 2   default_pool: 16`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Scheduling Patterns ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Scheduling Patterns" />
        <SectionTitle>Scheduling — Cron, Datasets, and Waiting on External Conditions</SectionTitle>

        <Para>
          Airflow supports three scheduling styles: cron-based (fixed time),
          dataset-driven (run when upstream data changes), and manual
          (human- or system-triggered). Knowing all three — and when each is
          appropriate — is the foundation of a well-designed strategy.
        </Para>

        <SubSubTitle>Cron-based scheduling — the baseline</SubSubTitle>

        <CodeBox label="Cron schedules and catchup/backfill defaults">{`schedule = '0 2 * * *'     # daily at 02:00 UTC
schedule = '*/15 * * * *'  # every 15 minutes
schedule = '@daily'        # Airflow shorthand for '0 0 * * *'
schedule = None            # manual trigger only

# ALWAYS use UTC for schedules — a schedule that silently shifts 30 minutes
# with another country's DST change is very hard to debug.

# catchup=True (default in some versions): a DAG paused 3 days creates
#   3 DagRuns for the missed intervals on resume — useful for date-range
#   pipelines, dangerous for high-frequency ones (hundreds of runs).
# catchup=False: only the latest interval runs on resume — set this
#   explicitly on production DAGs, never rely on the default.

with DAG(catchup=False, max_active_runs=1, ...): ...`}</CodeBox>

        <SubSubTitle>Dataset-driven scheduling — Airflow 2.4+</SubSubTitle>

        <Para>
          Dataset scheduling replaces complex <code>ExternalTaskSensor</code> polling
          with a declarative dependency: a consumer DAG waits for the datasets
          its upstream producers declare, with no time-based polling at all.
        </Para>

        <CodeBox label="Declaring producers and consumers of the same logical dataset">{`from airflow import Dataset

ORDERS_SILVER    = Dataset('snowflake://freshcart/silver/orders')
CUSTOMERS_SILVER = Dataset('snowflake://freshcart/silver/customers')
PAYMENTS_SILVER  = Dataset('snowflake://freshcart/silver/payments')

# Producer DAG: declares which dataset a task produces
with DAG('orders_silver_pipeline', schedule='0 2 * * *') as dag:
    load_orders = PythonOperator(task_id='load_orders', python_callable=run_orders_pipeline,
                                  outlets=[ORDERS_SILVER])

# Consumer DAG: triggers when ALL three listed datasets have been updated
with DAG(dag_id='gold_daily_revenue', schedule=[ORDERS_SILVER, CUSTOMERS_SILVER, PAYMENTS_SILVER]) as dag:
    build_gold = PythonOperator(task_id='build_gold_revenue', python_callable=run_gold_pipeline)`}</CodeBox>

        <Callout type="tip">
          Use dataset scheduling when Gold genuinely depends on several Silver
          pipelines finishing and you want that dependency visible in the DAG
          definition itself. Skip it for very high-frequency pipelines (too much
          dataset-update overhead) or conditional logic like &ldquo;only trigger if
          more than 10,000 rows loaded&rdquo; — that still needs a Sensor or a custom check.
        </Callout>

        <SubSubTitle>Sensors — waiting for a file, another DAG, or a custom condition</SubSubTitle>

        <CodeBox label="S3KeySensor and ExternalTaskSensor — always mode='reschedule'">{`from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor
from airflow.sensors.external_task import ExternalTaskSensor

wait_for_vendor_file = S3KeySensor(
    task_id='wait_for_shipfast_weekly_file',
    bucket_key='s3://freshcart-landing/shipfast/weekly_deliveries_{{ ds_nodash }}.csv',
    poke_interval=300, timeout=7200,
    mode='reschedule',   # releases the worker slot between polls — never 'poke'
    soft_fail=True,      # SKIPPED (not FAILED) on timeout — DAG continues
)

wait_for_upstream = ExternalTaskSensor(
    task_id='wait_for_orders_silver', external_dag_id='orders_silver_pipeline',
    external_task_id='load_orders', allowed_states=['success'],
    mode='reschedule', poke_interval=60, timeout=3600,
)`}</CodeBox>

        <CodeBox label="PythonSensor — waiting on any custom condition">{`def check_source_row_count(**context) -> bool:
    """Return True once source has >= 1000 rows for today's date."""
    run_date = context['data_interval_start'].strftime('%Y-%m-%d')
    count    = get_source_row_count(run_date)
    if count >= 1000:
        return True
    print(f'Source has {count} rows — waiting for at least 1000')
    return False

wait_for_data = PythonSensor(
    task_id='wait_for_source_data', python_callable=check_source_row_count,
    poke_interval=180, timeout=7200, mode='reschedule',
)`}</CodeBox>

        <Output>{`Task log — wait_for_source_data, poll 4 of ~24:
Source has 640 rows — waiting for at least 1000
[reschedule] releasing worker slot, will check again in 180s
...
Source has 1120 rows — condition met, proceeding`}</Output>

        <TryThis>
          Find a sensor you&apos;d write for your own project — waiting on a file, an
          API becoming healthy, a row count threshold. Would <code>mode=&apos;poke&apos;</code> or{' '}
          <code>mode=&apos;reschedule&apos;</code> be correct for it, and why does the
          expected wait time change your answer?
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — Backfills and Reruns ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Backfills and Reruns" />
        <SectionTitle>Backfills — Processing Historical Data Correctly</SectionTitle>

        <Para>
          A backfill runs a pipeline for historical date ranges — either because
          it was just deployed and needs to process existing data, or because
          historical runs failed and need re-execution. Backfills are a routine,
          first-class operation, not an emergency procedure.
        </Para>

        <SubSubTitle>Running a backfill from the CLI</SubSubTitle>

        <CodeBox label="airflow dags backfill — date range, single date, and dry run">{`airflow dags backfill --dag-id freshcart_morning_pipeline \\
    --start-date 2026-01-01 --end-date 2026-03-16 \\
    --max-active-runs 3     # run 3 days in parallel

airflow dags backfill --dag-id freshcart_morning_pipeline \\
    --start-date 2026-03-15 --end-date 2026-03-15   # single date

airflow dags backfill --dag-id freshcart_morning_pipeline \\
    --start-date 2026-01-01 --end-date 2026-03-16 --dry-run   # shows what would run`}</CodeBox>

        <Output>{`Backfill: freshcart_morning_pipeline, 2026-01-01 → 2026-03-16 (75 days)
Running with max_active_runs=3: 25 batches
[1/25] 2026-01-01 ... 2026-01-03: RUNNING
[2/25] 2026-01-04 ... 2026-01-06: RUNNING
...
Backfill complete: 75 succeeded, 0 failed`}</Output>

        <SubSubTitle>Clearing tasks and triggering manual runs</SubSubTitle>

        <CodeBox label="Clearing a task for rerun, and passing custom config">{`# Clear a specific task and everything downstream of it — re-runs on next heartbeat
airflow tasks clear --dag-id freshcart_morning_pipeline \\
    --task-id dbt_gold --start-date 2026-03-17 --downstream

# Manual trigger with custom configuration:
airflow dags trigger --dag-id freshcart_morning_pipeline \\
    --conf '{"run_date": "2026-03-17", "force_full_reload": true}'

# Reading the conf in the DAG:
def run_fn(**context):
    conf         = context['dag_run'].conf or {}
    run_date     = conf.get('run_date', context['ds'])
    force_reload = conf.get('force_full_reload', False)`}</CodeBox>

        <SubSubTitle>What a pipeline must do to support backfills correctly</SubSubTitle>

        <CodeBox label="The four design requirements">{`1. IDEMPOTENCY IS ESSENTIAL
   Backfills re-run pipelines for dates that may already be processed.
   A non-idempotent pipeline (plain INSERT) creates duplicates. Use upserts.

2. BACKFILL RATE
   90 days at max_active_runs=3, 10 min/run → 30 batches × 10 min = 5 hours.
   Plan backfills during low-traffic hours.

3. DEPENDENCY ORDERING
   Backfills respect task dependencies WITHIN a DAG, not ACROSS DAGs.
   If Gold depends on Silver, backfill Silver first, then Gold.

4. SOURCE AVAILABILITY
   Historical data must still exist in the source — a CDC pipeline
   backfilling 90 days needs 90 days of WAL, or a separate bulk extract.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Dynamic Task Mapping ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Dynamic Task Mapping" />
        <SectionTitle>Dynamic Task Mapping — Generating Tasks at Runtime</SectionTitle>

        <Para>
          Dynamic task mapping (Airflow 2.3+) generates one task per entity at
          runtime — instead of hardcoding a task per store, FreshCart reads the
          active store list from the database and gets one independent task
          instance per store, each with its own logs, retries, and status.
        </Para>

        <SubSubTitle>Mapping over a runtime-fetched list</SubSubTitle>

        <CodeBox label="process_all_stores — one task instance per active store">{`from airflow.decorators import task, dag

@dag(dag_id='process_all_stores', schedule='0 6 * * *', start_date=datetime(2026, 1, 1))
def process_all_stores_dag():

    @task
    def get_active_stores() -> list[str]:
        conn = get_db_connection()
        rows = conn.execute("SELECT store_id FROM reference.stores WHERE is_active = TRUE").fetchall()
        return [row[0] for row in rows]   # ['ST001', ..., 'ST010']

    @task
    def process_store_data(store_id: str, **context) -> dict:
        run_date = context['ds']
        result   = run_store_pipeline(store_id=store_id, run_date=run_date)
        return {'store_id': store_id, 'rows_written': result.rows_written}

    @task
    def aggregate_results(store_results: list[dict]) -> None:
        total = sum(r['rows_written'] for r in store_results)
        print(f'All stores complete: {len(store_results)} stores, {total} total rows')

    stores        = get_active_stores()
    store_results = process_store_data.expand(store_id=stores)   # one task per store, in parallel
    aggregate_results(store_results)

dag = process_all_stores_dag()`}</CodeBox>

        <Output>{`Graph view: process_all_stores, 2026-03-17
get_active_stores → process_store_data[0..9] (parallel, per store) → aggregate_results
All stores complete: 10 stores, 812,400 total rows`}</Output>

        <SubSubTitle>Mapping over multiple parameters at once</SubSubTitle>

        <CodeBox label="expand_kwargs — one task per parameter combination">{`@task
def process_store_category(store_id: str, category: str) -> dict:
    return run_pipeline(store_id=store_id, category=category)

combinations = [
    {'store_id': 'ST001', 'category': 'grocery'},
    {'store_id': 'ST001', 'category': 'beverages'},
    {'store_id': 'ST002', 'category': 'grocery'},
]
results = process_store_category.expand_kwargs(combinations)   # 3 task instances`}</CodeBox>

        <Callout type="warning">
          Use dynamic task mapping for N entities where each needs independent
          retries and its own log — not a loop inside one task (single retry,
          single log, hard to debug). Avoid it above roughly 1,000 mapped tasks
          per run — that many task instances measurably slows the scheduler.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — XCom and Task Communication ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — XCom" />
        <SectionTitle>XCom — Passing Data Between Tasks</SectionTitle>

        <Para>
          XCom (cross-communication) lets tasks pass small pieces of data to
          downstream tasks. The emphasis is on <em>small</em> — XCom lives in the
          metadata database and is for run statistics, status flags, and file
          paths, never for DataFrames or large result sets.
        </Para>

        <SubSubTitle>Push and pull — the manual API</SubSubTitle>

        <CodeBox label="Pushing metrics, pulling them downstream">{`def extraction_task(**context):
    result = run_extraction(run_date=context['ds'])
    context['ti'].xcom_push(key='rows_extracted', value=result.rows_extracted)
    context['ti'].xcom_push(key='rows_rejected',  value=result.rows_rejected)
    # Keep XCom values small — Airflow's own guidance is roughly tens of KB as a
    # practical ceiling. The actual backend-enforced limit is much larger and varies
    # (MySQL ~64 KB, PostgreSQL ~1 GB, SQLite ~2 GB) — don't rely on hitting it

def quality_check_task(**context):
    ti = context['ti']
    rows_extracted = ti.xcom_pull(task_ids='extract_orders', key='rows_extracted')
    rows_rejected  = ti.xcom_pull(task_ids='extract_orders', key='rows_rejected')
    if rows_extracted == 0:
        raise ValueError('No rows extracted — possible source outage')

    rejection_rate = rows_rejected / rows_extracted
    if rejection_rate > 0.05:
        raise ValueError(f'Rejection rate {rejection_rate:.1%} exceeds 5% threshold')`}</CodeBox>

        <SubSubTitle>The TaskFlow API — return values are XCom automatically</SubSubTitle>

        <CodeBox label="@task return values flow into the next task without manual push/pull">{`from airflow.decorators import task

@task
def extract_orders(run_date: str) -> dict:
    result = run_extraction(run_date=run_date)
    return {'rows_extracted': result.rows_extracted, 'rows_rejected': result.rows_rejected}

@task
def quality_check(extraction_result: dict) -> None:
    if extraction_result['rows_extracted'] == 0:
        raise ValueError('No rows extracted')

# In the DAG:
result = extract_orders(run_date='{{ ds }}')
quality_check(result)   # result is passed as XCom automatically`}</CodeBox>

        <SubSubTitle>The one XCom anti-pattern that actually breaks Airflow</SubSubTitle>

        <CodeBox label="Never push large data — push a reference to it instead">{`# BAD — passing 500 MB through the metadata database
@task
def load_data_bad(**context):
    df = pd.read_csv('s3://bucket/orders.csv')
    context['ti'].xcom_push(key='dataframe', value=df.to_dict())   # bloats/slows the metadata DB

# GOOD — write the data, push only the path
@task
def load_data_good(**context):
    df = pd.read_csv('s3://bucket/orders.csv')
    output_path = f's3://bucket/tmp/run-{context["run_id"]}/orders.parquet'
    df.to_parquet(output_path)
    context['ti'].xcom_push(key='output_path', value=output_path)`}</CodeBox>

        <Output>{`load_data_bad pushes a serialized DataFrame (hundreds of MB) into a single
metadata-database row — depending on the backend this either fails outright
or succeeds while bloating the metadata DB and slowing every task that reads
XCom. load_data_good pushes a ~60-byte S3 path instead — that's the actual
fix, regardless of which backend enforces which size limit.`}</Output>
      </section>

      <Divider />

      {/* ── Part 08 — Orchestration Tools Comparison ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Orchestration Tool Landscape" />
        <SectionTitle>Airflow vs Prefect vs Dagster — Choosing the Right Tool</SectionTitle>

        <Para>
          Airflow is dominant but not the only option. Prefect and Dagster have
          both gained significant adoption in the past three years, each addressing
          specific pain points of Airflow. Understanding the trade-offs helps you
          both choose the right tool and speak intelligently about the ecosystem
          in interviews.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Airflow', color: '#00add4' },
            { label: 'Prefect', color: '#7b61ff' },
            { label: 'Dagster', color: '#f97316' },
          ]}
          keys={['dim', 'airflow', 'prefect', 'dagster']}
          rows={[
            { dim: 'Market share', airflow: 'Dominant — used everywhere', prefect: 'Growing — popular for Python-native teams', dagster: 'Growing — popular for software-engineering-focused teams' },
            { dim: 'Core concept', airflow: 'DAG of tasks with dependencies and schedule', prefect: 'Flow of tasks — more Pythonic, less configuration', dagster: 'Software-defined assets — data as first-class objects' },
            { dim: 'Local development', airflow: 'Complex — needs metadata DB, scheduler, webserver', prefect: 'Simple — runs locally with no infrastructure', dagster: 'Simple — runs locally, good DX' },
            { dim: 'Dynamic workflows', airflow: 'Dynamic Task Mapping (2.3+) — improved but still complex', prefect: 'Native — Python loops and conditions work naturally', dagster: 'Native — partitions and dynamic jobs built-in' },
            { dim: 'Data lineage', airflow: 'Limited — tasks know nothing about data assets', prefect: 'Limited — similar to Airflow', dagster: 'First-class — assets track upstream/downstream data' },
            { dim: 'Testing', airflow: 'Hard — requires Airflow infrastructure to test DAGs', prefect: 'Easy — flows are regular Python functions', dagster: 'Easy — well-designed for unit testing' },
            { dim: 'When to choose', airflow: 'Large teams, complex multi-team platforms, broad ecosystem', prefect: 'Python-native teams, simpler pipelines, easier local dev', dagster: 'Teams that want strong data asset lineage, modern DX' },
          ]}
        />

        <Callout type="tip">
          <strong>For interview purposes</strong> and for most data engineering
          roles in 2026: know Airflow deeply. It is the tool you will encounter
          at most companies. Know Prefect and Dagster conceptually — enough to
          discuss trade-offs and express a considered opinion.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Orchestration</SectionTitle>

        {[
          {
            wrong: '"logical_date is just a fancy name for when the DAG happened to run"',
            right: 'It is specifically the start of the data interval being processed, deliberately one interval behind real time — Part 02\'s example run at 06:00 on the 17th has a logical_date of the 16th. Using datetime.now() instead of context[\'data_interval_start\'] is the single most common bug that silently breaks backfills.',
          },
          {
            wrong: '"Sensors are the correct tool for any cross-DAG dependency"',
            right: 'A Sensor polls repeatedly and, in mode=\'poke\', holds a worker slot the entire time — Part 04\'s comparison with Dataset scheduling (Airflow 2.4+) shows an event-driven alternative with zero polling overhead for the common case of "wait for another DAG\'s output." Sensors remain the right tool for conditions Airflow doesn\'t control, like a vendor SFTP drop.',
          },
          {
            wrong: '"catchup=True is a safe default because Airflow will just handle whatever backlog exists"',
            right: 'Airflow does handle it — by creating one DagRun per missed interval simultaneously. For a 15-minute DAG paused two weeks, that\'s 1,344 DagRuns competing for scheduler and worker resources at once, exactly the failure mode in this module\'s Error Library. catchup=False plus a deliberate, rate-limited CLI backfill is the production-safe pattern.',
          },
          {
            wrong: '"XCom is fine for passing a DataFrame between tasks since Airflow handles serialization"',
            right: 'XCom is a row in the metadata database, not a general message bus — Part 07\'s anti-pattern example shows why: a serialized DataFrame pushed through XCom bloats that row and slows every task that reads it, and depending on the backend can exceed it outright. Airflow\'s own guidance is to keep XCom values to roughly tens of KB, nowhere near a multi-hundred-MB DataFrame. Write the data to S3 and pass the path; that\'s the entire fix.',
          },
          {
            wrong: '"Dynamic task mapping and a for loop inside one PythonOperator are basically the same thing"',
            right: 'A for loop inside one task gives you one combined log, one retry for all N entities together, and a single failure that hides which entity actually failed. Part 06\'s .expand() creates N independent task instances with independent logs and independent retries — the difference matters the moment store #7 out of 10 fails and #1-6 shouldn\'t have to re-run.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 10 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Debugging a DAG That Runs Slower Every Week</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — FreshCart · Morning pipeline getting slower every week
          </div>

          <Para>
            The SLA for the morning pipeline is 10:30 PM ET (previous day). It used
            to complete by 10:10 PM ET. Over the last four weeks it has been
            completing later: 10:14, 10:21, 10:28, and this week it missed the SLA
            at 10:34 PM ET. No code was changed. You are asked to investigate.
          </Para>

          <CodeBox label="Step 1-2 — isolating which task is actually slow">{`-- Historical run durations from the Airflow metadata DB:
SELECT DATE(execution_date) run_date, ROUND(duration / 60.0, 1) total_minutes
FROM dag_run WHERE dag_id = 'freshcart_morning_pipeline' AND state = 'success'
  AND execution_date > NOW() - INTERVAL '30 days'
ORDER BY execution_date DESC;
-- 2026-03-17: 64 min ← SLA BREACH   2026-03-10: 51 min   2026-02-24: 38 min ← was fine
-- total duration grew 68% in 3 weeks — something is scaling linearly

-- Break duration down by task:
SELECT task_id, DATE(execution_date) run_date, ROUND(duration / 60.0, 1) minutes
FROM task_instance WHERE dag_id = 'freshcart_morning_pipeline' AND state = 'success'
  AND task_id IN ('extract_orders', 'dbt_silver', 'dbt_gold');
-- extract_orders: 8 → 8 → 8 → 8 min   (stable)
-- dbt_silver:    12 → 15 → 18 → 22 min ← growing linearly
-- dbt_gold:       4 → 4 → 4 → 4 min   (stable)`}</CodeBox>

          <CodeBox label="Step 3-5 — finding the model, then the actual query pattern">{`# dbt_silver's own log shows which model inside it is slow:
# Model staging.stg_orders completed in 42s
# Model silver.orders completed in 1280s   ← THIS ONE

-- Source table growth:
SELECT DATE(created_at) date, COUNT(*) daily_new_orders FROM raw.orders
GROUP BY 1 ORDER BY 1 DESC LIMIT 30;
-- FreshCart is growing: 48k/day → 52k → 56k → 60k

-- silver.orders model SQL:
-- SUM(order_amount) OVER (PARTITION BY store_id, month ORDER BY created_at)
-- This window function reads ALL historical orders on every run —
-- as the table grows, the model gets slower even though only today's rows are new.`}</CodeBox>

          <Output>{`Fix: materialise the monthly running total as a separate Gold model.
  silver.orders:              just cleans and validates (fast — only new rows)
  gold.monthly_store_revenue: the full window-function aggregate (slow, but runs once, persisted)

After fix:
2026-03-18  freshcart_morning_pipeline  2340s  39 min  ← back to baseline`}</Output>

          <Para>
            The investigation used Airflow&rsquo;s metadata database to isolate the
            slow task, dbt logs to isolate the slow model, and SQL analysis to
            understand the growth pattern. The fix was architectural — moving
            the expensive computation from an incremental Silver model (runs
            daily on all data) to a Gold model (runs once, result persisted).
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a DAG in Airflow and how does it differ from a simple cron job?',
            a: `A DAG (Directed Acyclic Graph) in Airflow is a Python object that defines a workflow: a set of tasks and the dependencies between them. "Directed" means dependencies have direction (A must run before B). "Acyclic" means there are no circular dependencies (B cannot depend on A while A depends on B). The DAG tells Airflow what to run, in what order, when to schedule it, how to handle failures, and what retry policy to apply.

The difference from cron is substantial. Cron runs a script at a time and does nothing else. It does not know whether the script succeeded or failed (unless you build that logging yourself). It does not retry on failure. It does not manage dependencies between multiple scripts. It does not provide any visibility into running or historical executions. If you need to run B after A succeeds, you must manage that yourself in the shell scripts.

Airflow's DAG gives you dependency management (B only runs after A succeeds, even if A takes varying amounts of time), retry intelligence (B retries twice with 3-minute delays if it fails), execution history (every run is recorded with duration, status, and logs), parallelism control (never run more than 5 tasks concurrently on the source database pool), SLA monitoring (alert if the whole DAG doesn't complete within 2 hours), and backfill (re-run the workflow for historical dates without manual intervention).

For a single pipeline that runs once a night with no dependencies on anything else, cron is sufficient. For ten pipelines with interdependencies, shared resource limits, and a shared SLA, Airflow is the appropriate tool.`,
          },
          {
            q: 'Q2. What is the Airflow execution date and why does it confuse people?',
            a: `The execution date (called logical_date in Airflow 2.2+) is the start of the data interval that the DAG run is processing — not the time at which the DAG actually ran. This confuses people because the word "execution" implies when the run happened, but it actually refers to what time period of data the run is responsible for.

For a daily DAG scheduled at 06:00 UTC: the run that executes at 2026-03-17 06:00 UTC has a logical_date of 2026-03-16 06:00 UTC. The run that processes March 17 data actually runs on March 18. Airflow always runs one interval behind because it waits for the interval to complete before processing it. At 06:00 March 17, all of March 16's data is available and settled. This is correct behaviour for data engineering pipelines — you process complete periods, not partial ones.

The practical implication: if you use the logical_date or {{ ds }} template in your pipeline code, a backfill for 2026-02-15 will correctly process February 14 data. If you instead call datetime.now() inside the task function, a backfill will incorrectly process today's data regardless of the date being backfilled. This breaks historical reprocessing entirely.

The rule is: always use context['data_interval_start'] (or {{ ds }} in templates) as the date for data extraction, never datetime.now(). This makes every pipeline run deterministic and backfill-correct.`,
          },
          {
            q: 'Q3. What are Airflow pools and when would you use them?',
            a: `Airflow pools are named buckets with a fixed number of slots. Tasks assigned to a pool consume slots from that pool. When the pool is full (all slots occupied by running tasks), additional tasks wait in the queue until a slot becomes available. Pools limit concurrent resource usage at the task level, independently of Airflow's overall parallelism settings.

The problem pools solve: Airflow's global parallelism setting limits the total number of concurrent tasks across all DAGs, but it does not limit concurrent usage of a specific shared resource. If you have 50 tasks across 10 DAGs that all need to query the same PostgreSQL read replica, running 50 simultaneous queries will exhaust the connection pool and cause all 50 to fail. You want to limit concurrent access to 5 connections without limiting everything else.

The solution: create a source_db_pool with 5 slots and assign all source extraction tasks to it. No more than 5 extraction tasks will run simultaneously, protecting the database connection pool. Other tasks that do not use the pool run freely up to the global parallelism limit.

Typical pools in a medium data platform: source_db_pool (5 slots) to limit concurrent source database connections, snowflake_pool (8 slots) to limit concurrent Snowflake warehouse queries and control compute cost, api_pool (3 slots) to stay within rate limits for external APIs, and dbt_pool (2 slots) to prevent multiple memory-intensive dbt runs from running simultaneously and causing OOM failures.

Pools are created in the Airflow UI under Admin → Pools or via the CLI: airflow pools set pool_name 5 "Description". They are stored in the metadata database and apply globally across all DAGs.`,
          },
          {
            q: 'Q4. How does Airflow handle backfills? What must a pipeline do to support backfills correctly?',
            a: `Airflow backfills are triggered via the CLI command airflow dags backfill with a date range. The scheduler creates DagRun objects for each date in the range (one per schedule interval) and processes them, respecting task dependencies within each run. Multiple date runs can execute in parallel up to the max_active_runs limit.

For backfills to produce correct results, the pipeline must satisfy two requirements.

First, idempotency. Backfills re-run pipelines for dates that may have already been successfully processed. If the pipeline uses plain INSERT, the backfill doubles the data. If it uses upsert semantics (ON CONFLICT DO UPDATE), the backfill updates existing rows to their correct values and inserts any that were previously missing — producing the same final result whether the date was processed once or ten times.

Second, date-parameterisation. The pipeline must use the Airflow execution context to determine which data to process, not datetime.now(). In the task function: run_date = context['data_interval_start'].strftime('%Y-%m-%d'). This ensures that a backfill for 2026-02-15 processes the February 14 data interval (because logical_date for the Feb 15 run is Feb 14), not today's data. A pipeline that calls datetime.now() processes current data regardless of the backfill date, making backfills produce incorrect results.

Additional practical considerations: set catchup=False on production DAGs to prevent accidental automatic backfills when a DAG is unpaused. Use max_active_runs=3 or less during manual backfills to prevent overwhelming the source system. Backfill downstream DAGs only after upstream DAGs have completed — cross-DAG dependencies are not automatically respected by the backfill command.`,
          },
          {
            q: 'Q5. Compare Airflow Sensors to Dataset scheduling. When would you use each?',
            a: `Both Sensors and Dataset scheduling solve the problem of making one pipeline wait for another to complete, but they work differently and are appropriate for different situations.

A Sensor is a task that polls a condition at a fixed interval and does not allow downstream tasks to proceed until the condition is true. ExternalTaskSensor polls the Airflow metadata database to check whether a specific task in another DAG has completed. S3KeySensor polls S3 for a specific file key. FileSensor checks the filesystem. Sensors are flexible and can check any condition you can express in Python, but they require ongoing polling (worker slot usage with mode='poke', or periodic re-scheduling with mode='reschedule'), and they couple DAGs implicitly through runtime polling rather than explicit dependency declaration.

Dataset scheduling (Airflow 2.4+) makes cross-DAG dependencies declarative. Producer DAGs declare which datasets their tasks produce (outlets=[Dataset('s3://bucket/table')]). Consumer DAGs declare which datasets they need (schedule=[Dataset('s3://bucket/table')]). Airflow automatically triggers the consumer DAG when all its required datasets have been updated by producer DAGs. There is no polling — the trigger is event-driven.

Use Dataset scheduling when: you are on Airflow 2.4+, the dependency is simply "run after another DAG produces data," the dependency can be expressed as a logical data asset name, and you want the dependency to be visible in the Airflow UI's dataset graph. This is cleaner and less resource-intensive than sensors for straightforward DAG-to-DAG dependencies.

Use Sensors when: you need to check an external condition that is not controlled by Airflow (a vendor dropping a file on SFTP, a source system becoming ready), the condition requires custom logic that cannot be expressed as a dataset update, you need a timeout and soft-fail behaviour, or you are on Airflow < 2.4. Always use mode='reschedule' for sensors that may wait more than a few minutes — never mode='poke', which holds a worker slot continuously.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
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
            q: 'Writing all the extraction, transformation, and notification logic directly inside the DAG file',
            a: 'The DAG file gets re-parsed by the scheduler every heartbeat (30s default) — heavy imports or slow top-level code in the DAG file slows down every DAG the scheduler manages, not just this one. Part 03\'s pattern keeps the DAG file to task wiring and imports the actual logic (pipelines.extract, pipelines.quality) inside each task function.',
          },
          {
            q: 'Leaving a Sensor on the default mode="poke" because it "works fine in testing"',
            a: 'It works fine with one sensor. This module\'s Error Library entry — 100 sensors stuck "running," workers busy, nothing processing — is exactly what happens once several poke sensors exist at once, because each one permanently occupies a worker slot for its entire wait. mode="reschedule" costs nothing and prevents this entirely.',
          },
          {
            q: 'Assuming catchup=False means old data will never be processed',
            a: 'catchup=False only disables automatic backfill on unpause — it says nothing about whether historical data can be processed. Part 05\'s CLI backfill (airflow dags backfill --start-date ... --end-date ...) works regardless of the catchup setting; the two are independent controls, not the same thing.',
          },
          {
            q: 'Testing a DAG only by triggering it manually in the Airflow UI',
            a: 'A manual trigger doesn\'t exercise scheduled-run behavior (logical_date, data_interval_start) the way a real scheduled run does, so a bug that only shows up through the logical_date calculation — like Part 02\'s datetime.now() mistake — passes a manual test and fails in production. Test with the actual context values a scheduled run would produce.',
          },
          {
            q: 'Adding a new task to a DAG and assuming it just works without checking pool assignment',
            a: 'A new extraction task that isn\'t assigned to source_db_pool competes for connections outside the pool\'s limit, defeating the entire point of Part 03\'s pool strategy. Every task that touches a shared, rate-limited resource needs an explicit pool assignment — it\'s not inherited automatically from similar tasks nearby.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
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
            error: `Airflow scheduler fails to parse DAG file — ERROR: No module named 'pipeline.extract' — DAG disappears from the UI`,
            cause: 'The DAG file imports from a pipeline package that is not installed in the Airflow scheduler\'s Python environment, or the package is installed but on a different Python path than the one the scheduler uses. When the scheduler cannot parse a DAG file, it marks that DAG as broken and it disappears from the UI. No DAG runs are created until the import error is fixed.',
            fix: 'Install the pipeline package in the Airflow scheduler\'s environment: pip install -e /path/to/pipeline or add it to requirements.txt and redeploy. Verify: airflow dags list-import-errors shows the exact import error. For KubernetesExecutor: ensure the Docker image used by the scheduler contains the pipeline package. Test the import manually: python -c "from pipeline.extract import run_extraction" in the scheduler container. Add a CI check that runs this import test on every PR to catch import errors before deployment.',
          },
          {
            error: `All Sensor tasks stuck in 'running' state for hours — Airflow UI shows 100 running tasks, workers are busy but no data is being processed`,
            cause: 'Sensors are configured with mode="poke" (the default). Each poke sensor holds an Airflow worker slot for its entire waiting period. With 100 sensors each waiting for a file, 100 worker slots are consumed by tasks that are just sleeping. No slots remain for actual data processing tasks. The sensors are "running" in the sense that they occupy a slot, but they are just sleeping between polls.',
            fix: 'Change all sensors to mode="reschedule": the sensor releases its worker slot between polls and reschedules itself. This allows worker slots to be used by real processing tasks between sensor polls. Update every sensor: FileSensor(..., mode="reschedule"), S3KeySensor(..., mode="reschedule"), ExternalTaskSensor(..., mode="reschedule"). As a rule, any sensor that might wait more than 30 seconds should use mode="reschedule". After the fix, sensors use zero worker slots between polls.',
          },
          {
            error: `Backfill creates duplicate data — the same rows appear twice in silver.orders after running airflow dags backfill for 30 days`,
            cause: 'The pipeline uses plain INSERT without ON CONFLICT handling. The 30 days of data were already loaded by the original scheduled runs. The backfill re-ran the pipeline for each of those 30 days and inserted all rows again. No unique constraint on order_id means no conflict was detected — all rows were inserted a second time.',
            fix: 'The pipeline must be idempotent before backfills can be run safely. Fix the INSERT to use ON CONFLICT (order_id) DO UPDATE. Add a UNIQUE constraint on order_id. After these changes, a backfill for already-processed dates will upsert rows to their correct current values rather than creating duplicates. For the immediate cleanup: DELETE FROM silver.orders WHERE ctid NOT IN (SELECT MIN(ctid) FROM silver.orders GROUP BY order_id). Test idempotency before the next backfill: run the pipeline for one date twice and verify the row count is unchanged.',
          },
          {
            error: `DAG catchup=True creates hundreds of DagRuns when unpaused after a 2-week vacation — scheduler overwhelmed, other DAGs delayed`,
            cause: 'The DAG has catchup=True (or relies on the default, which is True in some Airflow versions). When the DAG is unpaused after being paused for 14 days, Airflow immediately creates DagRuns for every missed schedule interval — for a DAG running every 15 minutes, this is 14 × 24 × 4 = 1,344 DagRuns. The scheduler and workers are overwhelmed creating and processing 1,344 concurrent runs, starving other DAGs of resources.',
            fix: 'Set catchup=False on all production DAGs unless backfill behavior is explicitly needed: DAG(catchup=False, ...). If the 14 days of backlogged data genuinely needs to be processed, do it deliberately with a rate-limited backfill: airflow dags backfill --max-active-runs 3 --start-date ... --end-date ..., which processes 3 days at a time rather than all 1,344 simultaneously. Going forward: audit all DAGs for catchup settings during deployment review.',
          },
          {
            error: `A task pushing a large object to XCom — a serialized pandas DataFrame, a big list of dicts, a large query result set — either fails outright or silently bloats the metadata database and slows every task that reads XCom`,
            cause: 'XCom is stored as a row in the Airflow metadata database, not a general-purpose message bus. The size limit that actually gets enforced is backend-dependent — roughly 64 KB on MySQL, about 1 GB on PostgreSQL, about 2 GB on SQLite — so whether a large push fails outright or just succeeds while bloating the metadata DB depends on which backend is running underneath. Airflow\'s own guidance is to treat XCom as being for values in the tens of KB, well below any of those limits, precisely because a DataFrame-sized value causes real problems (DB bloat, slow reads, memory pressure on the scheduler/webserver) long before it hits a hard wall.',
            fix: 'Never pass large data through XCom, regardless of what your specific backend would technically allow. Pass a reference instead: write the large data to S3 or a database, then push the path or identifier to XCom: xcom_push(key="output_path", value="s3://bucket/tmp/run-abc123/result.parquet"). Downstream tasks read the path from XCom and load the data themselves. If you have a legitimate need for larger XCom values, configure a custom XCom backend (AIRFLOW__CORE__XCOM_BACKEND) that stores the payload in S3 and keeps only a reference in the metadata database.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'An orchestrator is not a fancy cron job. Cron tells you when to run. Airflow tells you what to run, in what order, on what conditions, with what resource limits, with what retry policy, and what to do when it fails. For multiple interdependent pipelines with shared resources and SLAs, an orchestrator is necessary.',
        'Airflow has five components: Webserver (UI, reads from metadata DB), Scheduler (creates DagRuns, queues tasks, continuously runs), Executor (dispatches tasks to workers), Metadata Database (single source of truth — PostgreSQL), Workers (actually run task code). The scheduler and workers must both be able to read DAG files.',
        'The Airflow logical_date (execution_date) is the start of the data interval being processed, not when the run actually executed. A daily DAG at 06:00 UTC on March 17 has a logical_date of March 16 — it processes March 16 data. Always use context["data_interval_start"] in pipeline code, never datetime.now(). This makes every pipeline correctly backfillable.',
        'Always set catchup=False on production DAGs unless backfill is explicitly needed. catchup=True can create hundreds or thousands of DagRuns when a DAG is unpaused after a pause. Use max_active_runs=1 to prevent concurrent runs of the same DAG.',
        'Pools limit concurrent resource usage per resource type. Create pools for: source database connections (limit 5), Snowflake warehouse queries (limit 8), external API calls (limit 3). Assign tasks to pools with pool="pool_name". Without pools, parallel tasks can exhaust shared resources and all fail together.',
        'Sensors must use mode="reschedule" for any wait longer than a few seconds. mode="poke" holds a worker slot continuously — 100 poke sensors = 100 workers blocked sleeping. mode="reschedule" releases the slot between polls. This is one of the most common Airflow performance mistakes in production.',
        'Dataset scheduling (Airflow 2.4+) is the modern way to express cross-DAG dependencies declaratively. Producer tasks declare outlets=[Dataset("s3://bucket/table")]. Consumer DAGs declare schedule=[Dataset(...)]. Airflow triggers the consumer when producers update the dataset. Prefer this over ExternalTaskSensor for data-driven dependencies.',
        'Dynamic task mapping generates tasks at runtime from a list. @task.process_store.expand(store_id=stores) creates one task instance per store with independent logs, retries, and status. Use for processing N entities in parallel when N is data-driven. Avoid for N > 1,000 (scheduler performance impact).',
        'XCom is for small values only — Airflow\'s guidance is roughly tens of KB as a practical ceiling, well below the actual backend-enforced limit (which varies: ~64 KB on MySQL, ~1 GB on PostgreSQL, ~2 GB on SQLite). Use it for run IDs, row counts, file paths, status flags — never DataFrames, query results, or large JSON. Push an S3 path and have the downstream task load the data from that path. Monitor the xcom table size for high-frequency pipelines.',
        'Airflow is dominant and must be known deeply. Prefect is Pythonic and easier for local development. Dagster is asset-centric and has strong data lineage — aligns well with the dbt+ELT pattern. For interviews: know Airflow thoroughly, know Prefect/Dagster conceptually, have an opinion on trade-offs.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 29 covers data lake architecture — how to design zones that stay useful for years, the raw and processed zone patterns, and the five anti-patterns that turn a data lake into an unmaintainable swamp.
        </p>
        <Link href="/learn/data-engineering/data-lake-architecture" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 29 → Data Lake Architecture — Design, Zones and Anti-Patterns
        </Link>
      </div>
    </LearnLayout>
  )
}
