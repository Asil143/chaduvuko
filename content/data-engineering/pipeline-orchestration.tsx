import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
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
          The distinction matters because the question "why do I need Airflow when
          I have cron?" has a precise answer: cron tells you when to run. Airflow
          tells you what to run, in what order, on what conditions, with what
          resource limits, and what to do when it fails. For a single pipeline,
          cron is often sufficient. For ten interdependent pipelines with shared
          resources and a shared SLA, you need an orchestrator.
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
          It is used at Google, Airbnb, Lyft, Twitter, and virtually every company
          with a mature data platform. Understanding its internal architecture —
          not just how to write DAGs — lets you tune it, scale it, and diagnose
          failures that are architectural rather than code bugs.
        </Para>

        <SubTitle>Airflow components and their roles</SubTitle>

        <CodeBox label="Airflow architecture — every component and what it does">{`AIRFLOW COMPONENTS:

  WEBSERVER
  ─────────
  • Flask application serving the Airflow UI
  • Shows DAG graph, Gantt chart, task logs, run history
  • Allows manual triggers, backfill initiation, variable management
  • Reads state from the metadata database (does not execute tasks)
  • Port: 8080 (default)

  SCHEDULER
  ─────────
  • The brain of Airflow — runs continuously as a daemon
  • Parses DAG files from the DAGs folder every heartbeat (30s default)
  • Creates DagRun objects when schedule intervals trigger
  • Creates TaskInstance objects for each task in triggered DagRuns
  • Evaluates task dependencies — queues tasks whose upstream tasks succeeded
  • Sends queued tasks to the executor
  • Scales: Airflow 2.x supports multiple scheduler instances for HA

  EXECUTOR
  ────────
  • Receives task instances from the scheduler and runs them
  • Different executors for different deployment scales:

    SequentialExecutor:  runs one task at a time in the scheduler process
                         for development/testing only — not for production

    LocalExecutor:       runs tasks as subprocesses on the scheduler machine
                         single-machine production (small teams, limited scale)

    CeleryExecutor:      distributes tasks to Celery workers via a message
                         broker (Redis or RabbitMQ) — horizontal scaling
                         tasks run on separate worker machines

    KubernetesExecutor:  spins up a new Kubernetes pod per task
                         fully isolated — each task has its own container
                         scales to zero when idle — most common in 2026

  METADATA DATABASE (PostgreSQL or MySQL)
  ───────────────────────────────────────
  • Stores all Airflow state: DAG definitions, DagRuns, TaskInstances
  • Tables: dag, dag_run, task_instance, log, variable, connection, pool, xcom
  • Every task state change is a write to this database
  • This is the source of truth — if the DB is down, Airflow stops

  WORKERS (CeleryExecutor / KubernetesExecutor)
  ──────────────────────────────────────────────
  • Actually execute the task code (PythonOperator functions, BashOperator scripts)
  • Read the task definition from the metadata database
  • Write logs to S3/GCS or the Airflow log directory
  • Report task completion (success/failure) back to the metadata database

  DAG FILES DIRECTORY
  ───────────────────
  • Python files containing DAG and task definitions
  • Mounted on the scheduler and all workers (must be in sync)
  • Scheduler re-parses all DAG files every scheduler_heartbeat_sec
  • Changes to DAG files take effect within ~30 seconds without restart

DATA FLOW FOR A SINGLE TASK EXECUTION:
  1. Scheduler parses DAG file → creates DagRun at schedule time
  2. Scheduler evaluates task dependencies → marks eligible tasks QUEUED
  3. Scheduler sends queued TaskInstance to Executor
  4. Executor assigns task to a Worker
  5. Worker runs the task code (PythonOperator, BashOperator, etc.)
  6. Worker writes task log to log storage
  7. Worker reports SUCCESS or FAILURE to metadata DB
  8. Scheduler sees SUCCESS → queues downstream tasks
  9. UI reads state from metadata DB → shows task as SUCCESS (green)`}</CodeBox>

        <SubTitle>Airflow execution date vs logical date — the most confusing concept</SubTitle>

        <CodeBox label="Execution date vs logical date — what they mean and how to use them">{`# The most confusing concept in Airflow: the execution_date (now called
# logical_date in Airflow 2.2+) is NOT when the DAG run executes.
# It is the START of the data interval the run processes.

# EXAMPLE:
# DAG schedule: '0 6 * * *'  (daily at 06:00 UTC)
# DAG start_date: 2026-03-01

# The run that executes at 2026-03-17 06:00 UTC has:
#   logical_date (execution_date): 2026-03-16 06:00:00 UTC
#   data_interval_start:           2026-03-16 06:00:00 UTC
#   data_interval_end:             2026-03-17 06:00:00 UTC

# Airflow runs one interval BEHIND the current time.
# The 06:00 March 17 run processes data for the March 16 interval.
# This is by design: at 06:00 March 17, all March 16 data is complete.

# WHY THIS MATTERS FOR DATA ENGINEERING:
# If your pipeline uses the execution_date to determine which data to process:

from airflow.operators.python import PythonOperator
from datetime import datetime, timezone

def process_orders(**context):
    # WRONG: uses actual current time — not reproducible on backfill
    run_date = datetime.now().strftime('%Y-%m-%d')

    # CORRECT: uses Airflow's logical date — reproducible on backfill
    run_date = context['data_interval_start'].strftime('%Y-%m-%d')
    # On 2026-03-17 run: run_date = '2026-03-16'
    # On backfill for 2026-02-15: run_date = '2026-02-14'

task = PythonOperator(
    task_id='process_orders',
    python_callable=process_orders,
    # provide_context=True is default in Airflow 2.x
)

# TEMPLATES: Airflow provides Jinja templates for common date values
# {{ ds }}              → data_interval_start date: '2026-03-16'
# {{ ds_nodash }}       → '20260316'
# {{ data_interval_start }} → '2026-03-16T06:00:00+00:00'
# {{ data_interval_end }}   → '2026-03-17T06:00:00+00:00'
# {{ run_id }}          → 'scheduled__2026-03-17T06:00:00+00:00'
# {{ dag.dag_id }}      → 'orders_pipeline_incremental'

# Example with templates:
BashOperator(
    task_id='export_report',
    bash_command='python generate_report.py --date {{ ds }}',
    # On 2026-03-17 run: generates report for 2026-03-16
)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — DAG Design Patterns ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — DAG Design Patterns" />
        <SectionTitle>DAG Design — What Good DAGs Look Like</SectionTitle>

        <Para>
          A DAG file is Python code — which means it can be a beautifully simple
          dependency declaration or a 600-line mess of business logic, SQL queries,
          and API calls embedded directly in the DAG. The fundamental design rule
          is: DAG files are configuration, not logic. All business logic lives in
          the pipeline package. The DAG wires together tasks and sets schedules,
          retries, and dependencies.
        </Para>

        <SubTitle>The FreshCart morning DAG — a complete production example</SubTitle>

        <CodeBox label="dags/freshmart_morning_pipeline.py — complete production DAG">{`"""
FreshCart Morning Pipeline DAG
Runs daily at 02:00 UTC (07:30 IST)
Processes previous day's data across all layers

Task dependency graph:
  extract_orders ─────┬──────────────────────────────────────────────────────────┐
  extract_customers ──┤                                                           │
  extract_payments ───┤                                                           │
  extract_deliveries ─┘                                                           │
                       ↓                                                          │
                  dbt_silver ──────────────────────────────────┐                 │
                  (stg + silver models)                         ↓                 ↓
                                                         dbt_gold      quality_checks
                                                         (Gold models)      ↓
                                                                     notify_finance
"""

from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python   import PythonOperator
from airflow.operators.bash     import BashOperator
from airflow.operators.empty    import EmptyOperator
from airflow.utils.task_group   import TaskGroup
from airflow.models             import Variable

# ── DAG-level configuration ────────────────────────────────────────────────────
default_args = {
    'owner':             'data-team',
    'depends_on_past':   False,
    'retries':           2,
    'retry_delay':       timedelta(minutes=3),
    'retry_exponential_backoff': True,
    'execution_timeout': timedelta(minutes=30),
    'email_on_failure':  True,
    'email':             ['data-team@freshmart.com'],
}

with DAG(
    dag_id          = 'freshmart_morning_pipeline',
    default_args    = default_args,
    description     = 'FreshCart daily data platform — Bronze → Silver → Gold',
    schedule        = '0 2 * * *',    # 02:00 UTC daily = 07:30 IST
    start_date      = datetime(2026, 1, 1),
    catchup         = False,          # do not backfill on deploy
    max_active_runs = 1,              # no concurrent runs
    tags            = ['daily', 'production', 'silver', 'gold'],
    doc_md          = """
        ## FreshCart Morning Pipeline

        Processes the previous day's data through all layers.

        **Layers:** Bronze (raw) → Silver (cleaned) → Gold (aggregated)
        **SLA:** All Gold tables complete by 08:00 IST
        **Owner:** data-team@freshmart.com

        See: https://docs.freshmart.internal/data-platform/morning-pipeline
    """,
) as dag:

    start = EmptyOperator(task_id='start')
    end   = EmptyOperator(task_id='end')

    # ── Extraction task group (parallel) ──────────────────────────────────────
    with TaskGroup('extract', tooltip='Extract from all source systems') as extract_group:

        def make_extract_task(source: str, pool_slots: int = 1):
            """Factory for extraction tasks — avoids repetition."""
            def extract_fn(**context):
                from pipelines.extract import run_extraction
                run_date = context['data_interval_start'].strftime('%Y-%m-%d')
                run_extraction(source=source, run_date=run_date)

            return PythonOperator(
                task_id         = f'extract_\${source}',
                python_callable = extract_fn,
                pool            = 'source_db_pool',  # limit parallel DB connections
                pool_slots      = pool_slots,
                sla             = timedelta(minutes=15),
            )

        extract_orders     = make_extract_task('orders')
        extract_customers  = make_extract_task('customers')
        extract_payments   = make_extract_task('payments')
        extract_deliveries = make_extract_task('deliveries')
        # These four run in PARALLEL (no dependency between them within the group)

    # ── dbt Silver (runs after ALL extractions complete) ──────────────────────
    dbt_silver = BashOperator(
        task_id      = 'dbt_silver',
        bash_command = (
            'dbt run --target prod '
            '--select staging.* silver.* '
            '--vars \'{"run_date": "{{ ds }}"}\' '
            '&& dbt test --target prod --select staging.* silver.*'
        ),
        env = {
            'DBT_PROFILES_DIR': '/etc/dbt',
            'SNOWFLAKE_ACCOUNT': Variable.get('snowflake_account'),
        },
        execution_timeout = timedelta(minutes=45),
        sla               = timedelta(minutes=40),
    )

    # ── dbt Gold (runs after Silver) ──────────────────────────────────────────
    dbt_gold = BashOperator(
        task_id      = 'dbt_gold',
        bash_command = (
            'dbt run --target prod --select gold.* '
            '--vars \'{"run_date": "{{ ds }}"}\' '
            '&& dbt test --target prod --select gold.*'
        ),
        env              = {'DBT_PROFILES_DIR': '/etc/dbt'},
        execution_timeout = timedelta(minutes=20),
        sla              = timedelta(minutes=15),
    )

    # ── Quality checks (runs after Gold) ──────────────────────────────────────
    def run_quality_checks(**context):
        """Row count anomaly detection and freshness validation."""
        from pipelines.quality import check_all_gold_tables
        run_date = context['data_interval_start'].strftime('%Y-%m-%d')
        result   = check_all_gold_tables(run_date=run_date)
        if result.has_anomalies:
            raise ValueError(f'Quality checks failed: \${result.summary}')
        # Push results to XCom for the notification task
        context['ti'].xcom_push(key='quality_result', value=result.to_dict())

    quality_checks = PythonOperator(
        task_id         = 'quality_checks',
        python_callable = run_quality_checks,
        execution_timeout = timedelta(minutes=5),
    )

    # ── Finance notification (final step) ────────────────────────────────────
    def notify_finance(**context):
        from pipelines.notifications import send_daily_summary
        run_date       = context['data_interval_start'].strftime('%Y-%m-%d')
        quality_result = context['ti'].xcom_pull(
            task_ids='quality_checks', key='quality_result'
        )
        send_daily_summary(run_date=run_date, quality=quality_result)

    notify = PythonOperator(
        task_id         = 'notify_finance',
        python_callable = notify_finance,
    )

    # ── Dependency graph ──────────────────────────────────────────────────────
    start >> extract_group >> dbt_silver >> dbt_gold >> quality_checks >> notify >> end`}</CodeBox>

        <SubTitle>Task pools — controlling resource consumption</SubTitle>

        <CodeBox label="Airflow pools — limiting parallel resource usage">{`# POOLS: Airflow's mechanism for limiting concurrent resource usage
# without limiting task parallelism globally.

# Create pools via Airflow UI (Admin → Pools) or CLI:
# airflow pools set source_db_pool 5 "Max 5 concurrent source DB connections"
# airflow pools set snowflake_pool  8 "Max 8 concurrent Snowflake queries"
# airflow pools set api_pool        3 "Max 3 concurrent API calls to Stripe"

# PROBLEM WITHOUT POOLS:
# If 20 tasks all try to connect to the source PostgreSQL replica simultaneously,
# you exhaust the connection pool, some tasks fail, others slow down.

# SOLUTION WITH POOLS:
# Assign all source extraction tasks to 'source_db_pool' (size=5).
# Only 5 extraction tasks run at once, regardless of total task parallelism.

# In task definition:
extract_orders = PythonOperator(
    task_id    = 'extract_orders',
    python_callable = extract_orders_fn,
    pool       = 'source_db_pool',   # assign to this pool
    pool_slots = 1,                  # consumes 1 slot from the pool
    # Heavy tasks can consume 2+ slots: pool_slots=2
)

# REAL POOL STRATEGY FOR A MEDIUM DATA PLATFORM:
# source_db_pool:  5  — limit concurrent reads from prod replicas
# snowflake_pool:  8  — limit concurrent Snowflake warehouse queries
# api_pool:        3  — limit concurrent calls to rate-limited APIs
# dbt_pool:        2  — limit concurrent dbt runs (memory intensive)
# default_pool:   16  — general task concurrency

# CHECKING POOL STATUS:
# airflow pools list
# Or: SELECT * FROM airflow.slot_pool in the metadata database`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Scheduling Patterns ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Scheduling Patterns" />
        <SectionTitle>Scheduling — Cron, Timetables, and Data-Aware Scheduling</SectionTitle>

        <Para>
          Airflow supports three types of scheduling: cron-based (run on a fixed
          time schedule), dataset-driven (run when upstream data changes), and
          manual (triggered by humans or external systems). Understanding all three
          and when each is appropriate is the foundation of a well-designed
          orchestration strategy.
        </Para>

        <SubTitle>Cron-based scheduling — the baseline</SubTitle>

        <CodeBox label="Cron scheduling patterns for data pipelines">{`# STANDARD CRON SCHEDULES:
schedule = '0 2 * * *'        # Daily at 02:00 UTC
schedule = '*/15 * * * *'     # Every 15 minutes
schedule = '0 */4 * * *'      # Every 4 hours
schedule = '0 2 * * 1'        # Weekly — Mondays at 02:00 UTC
schedule = '0 2 1 * *'        # Monthly — 1st of month at 02:00

# AIRFLOW SHORTHAND:
schedule = '@daily'    # 0 0 * * *
schedule = '@hourly'   # 0 * * * *
schedule = '@weekly'   # 0 0 * * 0
schedule = None        # no schedule — only manual trigger

# TIMEZONE AWARENESS (Airflow 2.x):
from pendulum import timezone as tz
with DAG(
    dag_id   = 'orders_daily',
    schedule = '0 2 * * *',    # this is always UTC in Airflow
    # To specify IST: use pendulum timezone
    start_date = datetime(2026, 1, 1, tzinfo=tz('Asia/Kolkata')),
    # Schedule is still UTC — but start_date is IST-aware
) as dag: ...

# BEST PRACTICE: always use UTC for schedules.
# Convert to IST only in display or notification formatting.
# A pipeline that changes schedule by 30 minutes when DST changes
# in another country (which affects UTC offsets in some regions)
# is very hard to debug.


# MULTIPLE SCHEDULES FOR THE SAME DATA:
# If you need the same data processed at different frequencies for different
# consumers, create separate DAGs with different schedules:

# For the daily finance report:
with DAG(dag_id='orders_daily', schedule='0 2 * * *', ...): ...

# For the hourly operations dashboard:
with DAG(dag_id='orders_hourly', schedule='0 * * * *', ...): ...

# For the real-time fraud check:
with DAG(dag_id='orders_15min', schedule='*/15 * * * *', ...): ...


# CATCHUP AND BACKFILL:
# catchup=True (default): if DAG was paused for 3 days, Airflow will
#   create 3 DagRuns for the missed intervals on resume.
#   Useful for: pipelines that process specific date ranges
#   Dangerous for: high-frequency pipelines (creates hundreds of runs)

# catchup=False: only run the most recent interval on resume.
#   Use for: most production pipelines
#   Set explicitly — never rely on the default

with DAG(catchup=False, max_active_runs=1, ...): ...
# max_active_runs=1 prevents concurrent runs even during backfill`}</CodeBox>

        <SubTitle>Dataset-driven scheduling — Airflow 2.4+</SubTitle>

        <CodeBox label="Dataset-driven scheduling — trigger when upstream data is ready">{`# DATASET SCHEDULING: trigger a DAG when another DAG produces new data.
# Replaces complex ExternalTaskSensor patterns with declarative dependencies.

from airflow import Dataset

# Define datasets (logical names for data outputs):
ORDERS_SILVER = Dataset('snowflake://freshmart/silver/orders')
CUSTOMERS_SILVER = Dataset('snowflake://freshmart/silver/customers')
PAYMENTS_SILVER  = Dataset('snowflake://freshmart/silver/payments')

# Producer DAG: declare which datasets each task produces
with DAG('orders_silver_pipeline', schedule='0 2 * * *') as dag:
    load_orders = PythonOperator(
        task_id         = 'load_orders',
        python_callable = run_orders_pipeline,
        outlets         = [ORDERS_SILVER],   # declares: this task produces this dataset
    )

# Consumer DAG: trigger when ALL listed datasets are updated
with DAG(
    dag_id   = 'gold_daily_revenue',
    schedule = [ORDERS_SILVER, CUSTOMERS_SILVER, PAYMENTS_SILVER],
    # ^ triggers when ALL THREE datasets have been updated
) as dag:
    build_gold = PythonOperator(
        task_id         = 'build_gold_revenue',
        python_callable = run_gold_pipeline,
    )

# BENEFIT: gold_daily_revenue waits for all upstream Silver pipelines
# to complete before running — no time-based polling, no ExternalTaskSensor,
# no hardcoded schedule assumptions.

# WHEN TO USE DATASET SCHEDULING:
# ✓ Gold depends on multiple Silver pipelines completing
# ✓ Silver is event-driven (variable timing)
# ✓ You want the dependency to be explicit in the DAG definition
# ✓ Airflow 2.4+

# WHEN NOT TO USE IT:
# ✗ High-frequency pipelines (many datasets updated per hour creates overhead)
# ✗ Complex conditional logic ('only trigger if > 10,000 rows were loaded')
# ✗ Cross-environment dependencies (prod Silver triggering staging Gold)`}</CodeBox>

        <SubTitle>Sensors — waiting for external conditions</SubTitle>

        <CodeBox label="Airflow Sensors — waiting for files, databases, and external events">{`from airflow.sensors.filesystem          import FileSensor
from airflow.sensors.external_task       import ExternalTaskSensor
from airflow.sensors.python              import PythonSensor
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor

# ── S3KeySensor: wait for a file to appear on S3 ─────────────────────────────
wait_for_vendor_file = S3KeySensor(
    task_id        = 'wait_for_shipfast_weekly_file',
    bucket_key     = 's3://freshmart-landing/shipfast/weekly_deliveries_{{ ds_nodash }}.csv',
    bucket_name    = None,     # included in bucket_key
    aws_conn_id    = 'aws_default',
    poke_interval  = 300,      # check every 5 minutes
    timeout        = 7200,     # fail after 2 hours
    mode           = 'reschedule',   # release worker slot between polls (important!)
    soft_fail      = True,     # mark as SKIPPED (not FAILED) if timeout — continue DAG
)
# mode='reschedule': sensor releases its worker slot between polls.
# mode='poke' (default): holds the worker slot continuously — wastes resources.
# ALWAYS use mode='reschedule' for sensors with long wait times.


# ── ExternalTaskSensor: wait for a task in another DAG ───────────────────────
wait_for_upstream = ExternalTaskSensor(
    task_id              = 'wait_for_orders_silver',
    external_dag_id      = 'orders_silver_pipeline',
    external_task_id     = 'load_orders',       # None = wait for whole DAG
    execution_date_fn    = lambda dt: dt,        # same logical date
    allowed_states       = ['success'],
    mode                 = 'reschedule',
    poke_interval        = 60,
    timeout              = 3600,
)


# ── PythonSensor: wait for any custom condition ───────────────────────────────
def check_source_row_count(**context) -> bool:
    """Return True when source has >= 1000 rows for today's date."""
    run_date = context['data_interval_start'].strftime('%Y-%m-%d')
    count    = get_source_row_count(run_date)
    if count >= 1000:
        return True
    print(f'Source has \${count} rows — waiting for at least 1000')
    return False

wait_for_data = PythonSensor(
    task_id         = 'wait_for_source_data',
    python_callable = check_source_row_count,
    poke_interval   = 180,     # check every 3 minutes
    timeout         = 7200,    # fail after 2 hours
    mode            = 'reschedule',
)


# ── SENSOR BEST PRACTICES ────────────────────────────────────────────────────
# 1. Always use mode='reschedule' — never 'poke' for waits > 5 minutes.
#    'poke' holds a worker slot. 20 poke sensors = 20 workers blocked.
#    'reschedule' returns the slot between polls.

# 2. Set reasonable timeouts — a sensor with no timeout blocks forever.
#    Set timeout to: max_expected_wait + safety_buffer.
#    For vendor files arriving by 8 AM: timeout = 6h (from 2 AM run start).

# 3. Use soft_fail=True for optional data sources — marks SKIPPED not FAILED.
#    Allows downstream tasks to still run even if the file never arrived.
#    Use only when absence of the file is an acceptable outcome.

# 4. Use ExternalTaskSensor sparingly — it creates tight coupling between DAGs.
#    Prefer Dataset scheduling (Airflow 2.4+) for explicit data dependencies.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Backfills and Reruns ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Backfills and Reruns" />
        <SectionTitle>Backfills — Processing Historical Data Correctly</SectionTitle>

        <Para>
          A backfill is the process of running a pipeline for historical date
          ranges — either because the pipeline was just deployed and needs to
          process existing data, or because historical runs failed and need to
          be re-executed. Backfills are a first-class operation in Airflow and
          a routine part of data platform operations.
        </Para>

        <CodeBox label="Backfill patterns — CLI, API, and programmatic approaches">{`# ── AIRFLOW CLI BACKFILL ──────────────────────────────────────────────────────

# Backfill a DAG for a date range:
airflow dags backfill \
    --dag-id freshmart_morning_pipeline \
    --start-date 2026-01-01 \
    --end-date   2026-03-16 \
    --max-active-runs 3 \   # run 3 days in parallel
    --reset-dagruns           # re-run if DagRun already exists

# Backfill a single date:
airflow dags backfill \
    --dag-id freshmart_morning_pipeline \
    --start-date 2026-03-15 \
    --end-date   2026-03-15

# Dry run (shows what would run without executing):
airflow dags backfill \
    --dag-id freshmart_morning_pipeline \
    --start-date 2026-01-01 \
    --end-date   2026-03-16 \
    --dry-run

# ── IMPORTANT: catchup vs backfill ───────────────────────────────────────────
# catchup=True with DAG resuming: automatic backfill on unpause
# catchup=False: no automatic backfill — only the latest interval
# Manual backfill CLI: works regardless of catchup setting

# RECOMMENDATION:
# Set catchup=False on all production DAGs to prevent accidental
# catchup floods when a DAG is unpaused.
# Use explicit CLI backfills when historical processing is needed.


# ── CLEARING TASKS FOR RERUN ───────────────────────────────────────────────────
# Clearing a task marks it as 'none' (unexecuted) — it will re-run on the
# next scheduler heartbeat.

# Clear all tasks in a DAG run:
airflow tasks clear \
    --dag-id freshmart_morning_pipeline \
    --start-date 2026-03-17 \
    --end-date   2026-03-17

# Clear a specific task (and optionally its downstream tasks):
airflow tasks clear \
    --dag-id freshmart_morning_pipeline \
    --task-id dbt_gold \
    --start-date 2026-03-17 \
    --downstream     # also clear all tasks downstream of dbt_gold

# ── TRIGGERING A MANUAL RUN ────────────────────────────────────────────────────
# Manual trigger with custom configuration:
airflow dags trigger \
    --dag-id freshmart_morning_pipeline \
    --conf '{"run_date": "2026-03-17", "force_full_reload": true}'

# In the DAG code, read the conf:
def run_fn(**context):
    conf          = context['dag_run'].conf or {}
    run_date      = conf.get('run_date', context['ds'])
    force_reload  = conf.get('force_full_reload', False)


# ── BACKFILL DESIGN CONSIDERATIONS ────────────────────────────────────────────
# 1. IDEMPOTENCY IS ESSENTIAL:
#    Backfills re-run pipelines for dates that may have already been processed.
#    If the pipeline is not idempotent, backfills create duplicates.
#    Every pipeline must use upsert semantics.

# 2. BACKFILL RATE:
#    For a daily DAG backfilling 90 days with max_active_runs=3:
#    90 runs / 3 parallel = 30 batches
#    If each run takes 10 minutes: 30 × 10 = 300 minutes (5 hours)
#    Plan backfills during low-traffic hours — they consume significant resources.

# 3. DEPENDENCY ORDERING:
#    Backfills respect task dependencies within a DAG.
#    They do NOT respect cross-DAG dependencies automatically.
#    If Gold DAG depends on Silver DAG, backfill Silver first, then Gold.

# 4. SOURCE AVAILABILITY:
#    Historical data must be available in the source.
#    A CDC-based pipeline backfilling 90 days needs 90 days of WAL (if using CDC)
#    or a separate bulk extraction from the source database.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Dynamic Task Mapping ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Dynamic Task Mapping" />
        <SectionTitle>Dynamic Task Mapping — Generating Tasks at Runtime</SectionTitle>

        <Para>
          Dynamic task mapping (Airflow 2.3+) lets you generate tasks at runtime
          based on data — instead of hardcoding a task per store, you generate
          one task per store dynamically after reading the store list from a
          database. This is cleaner than parametrising a single task with a loop
          because each store gets its own task instance with its own logs, retries,
          and status tracking.
        </Para>

        <CodeBox label="Dynamic task mapping — generating tasks from runtime data">{`from airflow.decorators import task, dag
from datetime import datetime

# ── SIMPLE DYNAMIC MAPPING ────────────────────────────────────────────────────

@dag(
    dag_id   = 'process_all_stores',
    schedule = '0 6 * * *',
    start_date = datetime(2026, 1, 1),
)
def process_all_stores_dag():

    @task
    def get_active_stores() -> list[str]:
        """Fetch the list of active store IDs from the database."""
        conn = get_db_connection()
        rows = conn.execute(
            "SELECT store_id FROM reference.stores WHERE is_active = TRUE"
        ).fetchall()
        return [row[0] for row in rows]   # ['ST001', 'ST002', ..., 'ST010']

    @task
    def process_store_data(store_id: str, **context) -> dict:
        """Process data for one store — runs as a separate task per store."""
        run_date = context['ds']   # data_interval_start date
        result   = run_store_pipeline(store_id=store_id, run_date=run_date)
        return {'store_id': store_id, 'rows_written': result.rows_written}

    @task
    def aggregate_results(store_results: list[dict]) -> None:
        """Collect results from all store tasks and log summary."""
        total = sum(r['rows_written'] for r in store_results)
        print(f'All stores complete: \${len(store_results)} stores, \${total} total rows')

    # Dynamic mapping: process_store_data runs once per element in stores list
    stores       = get_active_stores()
    store_results = process_store_data.expand(store_id=stores)
    # Creates: process_store_data[0] for ST001
    #          process_store_data[1] for ST002
    #          ...
    #          process_store_data[9] for ST010
    # Each runs in parallel (subject to pool limits)

    aggregate_results(store_results)

dag = process_all_stores_dag()


# ── MAPPING WITH MULTIPLE PARAMETERS ──────────────────────────────────────────

@task
def process_store_category(store_id: str, category: str) -> dict:
    return run_pipeline(store_id=store_id, category=category)

# expand_kwargs: map a list of parameter dicts
combinations = [
    {'store_id': 'ST001', 'category': 'grocery'},
    {'store_id': 'ST001', 'category': 'beverages'},
    {'store_id': 'ST002', 'category': 'grocery'},
]
results = process_store_category.expand_kwargs(combinations)
# Creates 3 task instances, one per combination


# ── WHEN TO USE DYNAMIC TASK MAPPING ─────────────────────────────────────────
# ✓ Processing N entities (stores, merchants, dates) in parallel
# ✓ The entity list changes — new stores added, closed stores removed
# ✓ You want per-entity visibility in the Airflow UI (not just one big task)
# ✓ You want per-entity retries (failed store retries independently)

# ✓ Instead of: writing a loop inside a PythonOperator and processing all stores
#   in one task — single task has single retry, single log, hard to debug
# ✓ Use when: each entity has meaningful independent execution semantics

# ✗ DO NOT use for: very high fan-out (> 1000 tasks per DAG run)
#   Dynamic task mapping creates task instances in the Airflow DB
#   1000+ instances per run impacts scheduler performance`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — XCom and Task Communication ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — XCom" />
        <SectionTitle>XCom — Passing Data Between Tasks</SectionTitle>

        <Para>
          XCom (cross-communication) is Airflow's mechanism for tasks to pass
          small pieces of data to downstream tasks. The emphasis is on <em>small</em> —
          XCom is stored in the metadata database and is designed for passing
          run statistics, status flags, and configuration values, not for passing
          entire DataFrames or large datasets.
        </Para>

        <CodeBox label="XCom patterns — what to pass and what not to pass">{`# ── XCOM PUSH AND PULL ───────────────────────────────────────────────────────

def extraction_task(**context):
    """Run extraction and push metrics to XCom."""
    result = run_extraction(run_date=context['ds'])

    # Push metrics — small values only
    context['ti'].xcom_push(key='rows_extracted', value=result.rows_extracted)
    context['ti'].xcom_push(key='rows_rejected',  value=result.rows_rejected)
    context['ti'].xcom_push(key='run_id',         value=result.run_id)
    context['ti'].xcom_push(key='watermark',      value=result.watermark)
    # XCom value limit: ~48 KB default in PostgreSQL VARCHAR — keep it small

def quality_check_task(**context):
    """Use XCom values from upstream task."""
    ti = context['ti']

    # Pull from specific task:
    rows_extracted = ti.xcom_pull(task_ids='extract_orders', key='rows_extracted')
    rows_rejected  = ti.xcom_pull(task_ids='extract_orders', key='rows_rejected')

    if rows_extracted == 0:
        raise ValueError('No rows extracted — possible source outage')

    rejection_rate = rows_rejected / rows_extracted
    if rejection_rate > 0.05:
        raise ValueError(f'Rejection rate \${rejection_rate:.1%} exceeds 5%% threshold')

# ── RETURN VALUE XCOM (TaskFlow API) ─────────────────────────────────────────
from airflow.decorators import task

@task
def extract_orders(run_date: str) -> dict:
    result = run_extraction(run_date=run_date)
    # Return value is automatically pushed as XCom 'return_value'
    return {
        'rows_extracted': result.rows_extracted,
        'rows_rejected':  result.rows_rejected,
        'run_id':         result.run_id,
    }

@task
def quality_check(extraction_result: dict) -> None:
    # The dict is automatically passed from the return value XCom
    rows     = extraction_result['rows_extracted']
    rejected = extraction_result['rows_rejected']
    if rows == 0:
        raise ValueError('No rows extracted')

# In DAG:
result = extract_orders(run_date='{{ ds }}')
quality_check(result)   # result is passed as XCom automatically


# ── XCOM ANTI-PATTERNS ────────────────────────────────────────────────────────

# BAD: passing large data through XCom
@task
def load_data(**context):
    df = pd.read_csv('s3://bucket/orders.csv')   # 500 MB
    context['ti'].xcom_push(key='dataframe', value=df.to_dict())
    # XCom is stored in the metadata DB — passing 500 MB will crash Airflow

# GOOD: pass a reference, not the data
@task
def load_data(**context):
    df = pd.read_csv('s3://bucket/orders.csv')
    output_path = f's3://bucket/tmp/run-\${context["run_id"]}/orders.parquet'
    df.to_parquet(output_path)
    context['ti'].xcom_push(key='output_path', value=output_path)
    # Pass the S3 path (small string), not the data itself

# ── XCOM CLEANUP ──────────────────────────────────────────────────────────────
# XCom values are stored in the metadata DB until:
#   - The DagRun is deleted
#   - An admin runs airflow db clean
# For high-frequency pipelines: monitor the xcom table size
# SELECT task_id, COUNT(*), SUM(LENGTH(value)) FROM xcom
# GROUP BY task_id ORDER BY 3 DESC LIMIT 10;`}</CodeBox>
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
            { dim: 'DAG/Pipeline definition', airflow: 'Python with decorators, operators, DAG context manager', prefect: 'Pure Python with @flow and @task decorators', dagster: '@asset and @job decorators — assets define data, not just tasks' },
            { dim: 'Local development', airflow: 'Complex — needs metadata DB, scheduler, webserver', prefect: 'Simple — runs locally with no infrastructure', dagster: 'Simple — runs locally, good DX' },
            { dim: 'Dynamic workflows', airflow: 'Dynamic Task Mapping (2.3+) — improved but still complex', prefect: 'Native — Python loops and conditions work naturally', dagster: 'Native — partitions and dynamic jobs built-in' },
            { dim: 'Data lineage', airflow: 'Limited — tasks know nothing about data assets', prefect: 'Limited — similar to Airflow', dagster: 'First-class — assets track upstream/downstream data' },
            { dim: 'Testing', airflow: 'Hard — requires Airflow infrastructure to test DAGs', prefect: 'Easy — flows are regular Python functions', dagster: 'Easy — well-designed for unit testing' },
            { dim: 'Managed offering', airflow: 'MWAA (AWS), Cloud Composer (GCP), Astronomer', prefect: 'Prefect Cloud (fully managed)', dagster: 'Dagster Cloud (fully managed)' },
            { dim: 'When to choose', airflow: 'Large teams, complex multi-team platforms, broad ecosystem', prefect: 'Python-native teams, simpler pipelines, easier local dev', dagster: 'Teams that want strong data asset lineage, modern DX' },
          ]}
        />

        <Callout type="tip">
          <strong>For interview purposes</strong> and for most data engineering
          roles in 2026: know Airflow deeply. It is the tool you will encounter
          at most companies. Know Prefect and Dagster conceptually — enough to
          discuss trade-offs and express a considered opinion. If you are building
          a new platform from scratch, Dagster's asset-centric model is increasingly
          compelling because it aligns naturally with the ELT + dbt pattern.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
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
            The SLA for the morning pipeline is 08:00 IST. It used to complete
            by 07:40 IST. Over the last four weeks it has been completing later:
            07:44, 07:51, 07:58, and this week it missed the SLA at 08:04.
            No code was changed. You are asked to investigate.
          </Para>

          <CodeBox label="Performance investigation — finding the bottleneck">{`# Step 1: Check historical run durations in Airflow metadata DB
SELECT
    DATE(execution_date)        AS run_date,
    dag_id,
    duration                    AS total_seconds,
    ROUND(duration / 60.0, 1)   AS total_minutes
FROM dag_run
WHERE dag_id    = 'freshmart_morning_pipeline'
  AND state     = 'success'
  AND execution_date > NOW() - INTERVAL '30 days'
ORDER BY execution_date DESC;

# Shows:
# 2026-03-17  freshmart_morning_pipeline  3840s  64 min  ← SLA BREACH
# 2026-03-16  freshmart_morning_pipeline  3540s  59 min
# 2026-03-10  freshmart_morning_pipeline  3060s  51 min
# 2026-03-03  freshmart_morning_pipeline  2580s  43 min
# 2026-02-24  freshmart_morning_pipeline  2280s  38 min  ← was fine here

# Total duration grew 68% in 3 weeks. Something is scaling linearly.

# Step 2: Break down duration by task
SELECT
    task_id,
    DATE(execution_date) AS run_date,
    ROUND(duration / 60.0, 1) AS minutes
FROM task_instance
WHERE dag_id = 'freshmart_morning_pipeline'
  AND state  = 'success'
  AND task_id IN ('extract_orders', 'dbt_silver', 'dbt_gold')
  AND execution_date > NOW() - INTERVAL '30 days'
ORDER BY task_id, execution_date;

# Results:
# extract_orders: 8 min → 8 min → 8 min → 8 min  (stable — not the problem)
# dbt_silver:     12 min → 15 min → 18 min → 22 min  ← growing linearly
# dbt_gold:       4 min → 4 min → 4 min → 4 min  (stable)

# dbt_silver is the bottleneck. It's slowing down by ~3 minutes per week.

# Step 3: Check which dbt model inside dbt_silver is slow
# Look at dbt logs in the task log:
# dbt run completed in 1324s
# Model staging.stg_orders completed in 42s
# Model silver.orders completed in 1280s   ← THIS ONE

# Step 4: Check silver.orders model
# It's an incremental dbt model. Check the source table growth:
SELECT
    DATE(created_at) AS date,
    COUNT(*) AS daily_new_orders
FROM raw.orders
GROUP BY 1
ORDER BY 1 DESC
LIMIT 30;

# FreshCart is growing: 48k orders/day → 52k → 56k → 60k
# Silver.orders incremental model runs:
# WHERE source_date = '{{ ds }}'
# And then computes window functions over ALL historical orders

# The issue: window function in silver.orders reads ALL historical rows
# to compute running totals, even though only today's rows are new.

# Step 5: Check the silver.orders dbt model SQL
# Finds: a window function computing running monthly total
# SUM(order_amount) OVER (PARTITION BY store_id, month ORDER BY created_at)
# This reads ALL orders for every run — as the table grows, it gets slower.

# Fix: materialise the monthly aggregate as a separate Gold model.
# silver.orders: just cleans and validates (fast — only new rows)
# gold.monthly_store_revenue: full aggregate (slow but runs once, persisted)

# After fix:
# 2026-03-18  freshmart_morning_pipeline  2340s  39 min  ← back to baseline`}</CodeBox>

          <Para>
            The investigation used Airflow's metadata database to isolate the
            slow task, then dbt logs to isolate the slow model, then SQL analysis
            to understand the growth pattern. The fix was architectural — moving
            the expensive computation from an incremental Silver model (runs daily
            on all data) to a Gold model (runs once, result persisted). Three weeks
            of gradual SLA degradation resolved in one refactor.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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
            error: `XCom value too large error — task fails with ValueError: XCOM value exceeds maximum size (48 KB)`,
            cause: 'A task is pushing a large object to XCom — typically a list of dictionaries, a pandas DataFrame serialised as JSON, or a large query result set. XCom is stored in the Airflow metadata database and has a size limit (48 KB by default in PostgreSQL VARCHAR). Passing data larger than this limit causes the push to fail.',
            fix: 'Never pass large data through XCom. Pass references instead. Write the large data to S3 or a database, then push the path or identifier to XCom: xcom_push(key="output_path", value="s3://bucket/tmp/run-abc123/result.parquet"). Downstream tasks read the path from XCom and load the data themselves. If you need to pass larger values for legitimate reasons, configure Airflow to use an XCom backend that stores values in S3 rather than the metadata database: configure AIRFLOW__CORE__XCOM_BACKEND to use an S3-backed implementation.',
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
        'XCom is for small values only (< 48 KB) — run IDs, row counts, file paths, status flags. Never push DataFrames, query results, or large JSON to XCom. Push an S3 path and have the downstream task load the data from that path. Monitor the xcom table size for high-frequency pipelines.',
        'Airflow is dominant and must be known deeply. Prefect is Pythonic and easier for local development. Dagster is asset-centric and has strong data lineage — aligns well with the dbt+ELT pattern. For interviews: know Airflow thoroughly, know Prefect/Dagster conceptually, have an opinion on trade-offs.',
      ]} />

    </LearnLayout>
  )
}