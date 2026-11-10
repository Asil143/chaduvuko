import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'

export const metadata: Metadata = {
  title: 'Apache Airflow — DAGs, Scheduling and Retries | Data Engineering | Chaduvuko',
  description: 'Design reliable Apache Airflow workflows with DAGs, operators, schedules, catchup, retries, idempotency, XCom, and sensors.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
)

export default function AirflowOrchestrationModule() {
  return (
    <LearnLayout title="Apache Airflow — DAGs, Scheduling and Retries" description="Design reliable Airflow workflows with explicit dependencies, schedules, retries, sensors, and safe task interfaces." section="Data Engineering — Lesson 52" readTime="40 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Orchestration and DAGs" />
        <SectionTitle>Airflow Coordinates Work; It Is Not the Data Engine</SectionTitle>
        <Para>Apache Airflow is a platform for authoring, scheduling, and observing workflows. A DAG, or directed acyclic graph, describes tasks and dependencies: a task can start after its required upstream tasks satisfy the configured conditions, and the graph contains no dependency cycle. An operator or task function defines a unit of work. Airflow decides when a task instance is eligible to run and records its state; the task may call a warehouse, launch a Spark application, or communicate with a service that performs the actual data processing.</Para>
        <Para>That boundary matters. Airflow workers should not become a hidden data lake, nor should a scheduler process perform a multi-hour transformation by pulling a huge result into memory. Submit compute to an appropriate execution environment and pass small references between tasks. Keep DAG files declarative and fast to parse; avoid network calls, expensive discovery, and mutable business logic at module import time.</Para>
        <Para>Consider a fictional Andhra Pradesh retail settlement workflow. It waits for the source's daily manifest, validates the incoming interval, launches a distributed transformation, checks totals, publishes a curated table, and notifies a dashboard owner. Each edge represents a genuine prerequisite. If notification is optional, it should not be confused with the publication condition. A DAG's green state is meaningful only when task success corresponds to the data contract consumers rely on.</Para>
        <Callout label="Think in task contracts" type="info">For every task, define its inputs, output or side effect, retry safety, timeout, resource needs, owner, and success criteria. A task marked successful should mean that its promised operation completed—not merely that a process returned zero.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — DAGs, Operators, and Dependencies" />
        <SectionTitle>Make the Graph Match the Data's Real Prerequisites</SectionTitle>
        <Para>Airflow operators and task functions wrap work so it can be scheduled, retried, logged, and observed. A Python task can perform a short control operation; a provider operator can submit work to an external service. Exact operator names, arguments, providers, and imports depend on the Airflow distribution and installed provider packages, so confirm examples against the deployed environment rather than assuming a provider is present.</Para>
        <Para>Dependencies can be expressed with task relationships, often using the bitshift operators in Python-style DAG definitions. Parallel tasks should be parallel only when they are independent and their shared systems can handle the load. A task group can organize a graph, but grouping is not a transaction boundary. Explicitly model branching and optional work, and review trigger behavior so a skipped or failed branch does not accidentally cause publication.</Para>
        <CodeBox label="Illustrative TaskFlow-style DAG structure">{`from datetime import datetime
from airflow.decorators import dag, task

@dag(
    dag_id="daily_settlement",
    start_date=datetime(2026, 1, 1),
    schedule="0 6 * * *",
    catchup=False,
    tags=["settlement"],
)
def daily_settlement():
    @task
    def validate_manifest(data_interval_start=None, data_interval_end=None):
        # Validate the expected input for this explicit interval.
        return {"interval_start": str(data_interval_start),
                "interval_end": str(data_interval_end)}

    @task
    def submit_transform(manifest):
        # Submit work to the chosen compute platform and return a run reference.
        return {"compute_run_id": "replace-with-real-run-id"}

    @task
    def verify_and_publish(run):
        # Check output counts/totals before a controlled publish step.
        return {"published": True, "run_id": run["compute_run_id"]}

    verify_and_publish(submit_transform(validate_manifest()))

daily_settlement()`}</CodeBox>
        <Para>The code illustrates shape, not a complete deployment recipe. The date shown is an example start boundary, not a claim about a product default or an appropriate production date. A schedule expression and a timetable determine run behavior together with the configured start boundary and Airflow's data-interval model. A DAG must be tested with the exact installed Airflow and provider packages, and real connections should be configured outside source control.</Para>
        <Para>Prefer explicit dependencies to hidden ordering through shared files or timing assumptions. A validator should check actual source completeness, not just wait until a customary arrival time. A successful upstream extraction can still have an empty, partial, duplicated, or late dataset. Pass a manifest or durable output location and validate its promised properties downstream.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Scheduling, Data Intervals, and Catchup" />
        <SectionTitle>Separate the Time a Run Starts from the Data It Processes</SectionTitle>
        <Para>A scheduled DAG run is associated with a logical run and, for timetable-driven schedules, a data interval whose exact interpretation depends on the timetable and trigger type. A run's start time is not necessarily the period represented by its input. A daily workflow that starts in the morning may process the previous business day, subject to the source contract. Use the run's explicit interval context rather than the worker's wall clock so a historical run can reproduce the intended window.</Para>
        <Para>Use half-open intervals such as <code>[start, end)</code> when the source supports them. Adjacent intervals then meet at a boundary without both including the same instant. Convert timezone boundaries deliberately and write down whether “business day” means India Standard Time, UTC, an exchange calendar, or another definition. Daylight-saving transitions and local cut-off times can complicate schedules outside India; never infer a data interval from a formatted date alone.</Para>
        <Para>Catchup controls whether missed scheduled intervals are created for a DAG when scheduling resumes, according to the DAG's configuration and Airflow behavior. Setting <code>catchup=False</code> can be appropriate for a pipeline that only wants future intervals, while historical corrections may need deliberate backfill. Do not equate catchup with a correction strategy: a backfill needs bounded intervals, source retention, resource limits, isolation from live writes, and safe publication. Decide how late-arriving or revised data is handled independently.</Para>
        <Para>Prevent uncontrolled overlap when the source, destination, or compute system has limited capacity. Concurrency limits and pools can constrain work, but they do not make a non-idempotent task safe. A historical repair that writes the same date as a live run needs a shared coordination policy, staging, validation, and an authorized publish rule. Ensure a retry does not overwrite a newer successful result with stale output.</Para>
        <Callout label="Backfill checklist" type="tip">Specify exact start/end intervals, source snapshot or manifest, code revision, maximum parallel runs, connection limits, destination scope, conflict policy, and output validation. Test one interval before scheduling a large repair.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Retries, Timeouts, and Idempotency" />
        <SectionTitle>A Retry Repeats Code after an Uncertain Outcome</SectionTitle>
        <Para>A task can fail before doing any work, during a side effect, or after the side effect succeeds but before Airflow records success. A worker can lose its connection at exactly the wrong point. Therefore a retry may execute code whose prior attempt partially or fully completed. Design tasks to be idempotent for a declared interval or operation key: repeating the task should leave one correct result rather than duplicate rows, send duplicate payments, or publish a stale version.</Para>
        <Para>For a data write, a common pattern is to write interval-scoped output to staging, validate it, and publish via a transaction or version-aware commit. Use a unique operation identifier, a manifest, or an upsert/merge key where appropriate. Protect source systems with rate limits and connection pools. A retry policy should include bounded attempts and a delay/backoff appropriate to the failure class. Retrying invalid input or a permission error without remediation creates noise; transient network issues may be retryable. Add timeouts and alerting so a hung task does not remain invisible.</Para>
        <Para>Task-level retries are not the same as rerunning a complete DAG interval, clearing tasks manually, or backfilling. Recovery choices should account for upstream and downstream side effects. Keep task logs and a durable run record sufficient to answer which interval and input version were processed, but do not log secrets or full personal datasets. For high-impact writes, add reconciliation and an explicit compensation or repair process.</Para>
        <CodeBox label="Design the operation around a stable interval key">{`operation_key = "settlement:2026-11-08"
staging_path = f"staging/{operation_key}/attempt={attempt_number}"

# 1. Read the immutable input manifest for the intended interval.
# 2. Write an isolated attempt output; do not expose partial files.
# 3. Check schema, uniqueness, row counts, and financial reconciliation.
# 4. Publish only if the expected source/code version is still authorized.
# 5. Record the published version and make a repeated call a safe no-op
#    or a controlled replacement of that same interval.`}</CodeBox>
        <Para>The identifiers and path are illustrative. Do not use the attempt number as the business result key; it distinguishes temporary writes, while the stable operation key identifies the intended data interval. Whether replacement, merge, or append is correct depends on source corrections and output grain. Explicitly handle two concurrent attempts, a retry after publication, and a correction arriving after the original interval closed.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — XCom and Task Boundaries" />
        <SectionTitle>Pass References, Not DataFrames</SectionTitle>
        <Para>XCom is Airflow's mechanism for passing small values between tasks, such as a run identifier, row count, status, or object-storage path. It is not a general-purpose data transport for large query results, DataFrames, or files. Large payloads increase metadata-store and serialization pressure and make task retries and inspection fragile. Persist bulk data in the appropriate durable system and pass a stable reference with its interval and schema context.</Para>
        <Para>Keep task boundaries meaningful. One giant Python task hides progress and makes selective retries difficult. The opposite extreme—hundreds of tiny tasks—can overload scheduler and metadata systems and make the graph hard to operate. Separate steps when they have distinct resource needs, retry semantics, or observable outputs. Use a clear contract for every handoff and validate that the downstream task consumes the expected version.</Para>
        <Para>Airflow can offer automatic return-value handling in some task APIs, but avoid relying on implicit behavior without checking the installed version and configuration. Store no passwords, access tokens, customer records, or payment details in XCom. Treat metadata storage as sensitive and follow the platform's access, retention, and audit controls.</Para>
        <CodeBox label="Small XCom-style metadata, large data stays external">{`@task
def submit_transform(interval_start, interval_end):
    run_id = launch_spark_job(interval_start, interval_end)
    return {
        "run_id": run_id,
        "output_uri": "s3a://curated/settlement/date=2026-11-08/",
        "interval_end": interval_end,
    }

@task
def validate_output(metadata):
    # Read the referenced durable output and validate its manifest.
    return check_manifest(metadata["output_uri"], metadata["run_id"])`}</CodeBox>
        <Para>Production metadata should identify a real, access-controlled destination and output version; the example path is fictional. A bare path may be insufficient if it can be overwritten, so include a manifest, table snapshot, run identifier, or other immutable reference. Keep credentials and signed URLs out of durable task metadata.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Sensors, Deferrable Waiting, and Operations" />
        <SectionTitle>Wait for Events without Wasting Worker Capacity</SectionTitle>
        <Para>A sensor waits for a condition such as a file manifest, a table partition, or an upstream run. A naive polling task can hold a worker slot while it waits. Airflow offers different sensor modes and deferrable patterns depending on the sensor, provider, and deployment. Use the supported option that releases or avoids occupying ordinary worker capacity during long waits, and confirm whether the triggerer or other component is available in your environment.</Para>
        <Para>Set a timeout and define what happens when the source never arrives. A sensor should check the precise expected interval and manifest, not just detect any file in a directory. Poll at a sensible cadence, apply a deadline, and alert the owning team. For event-driven sources, consider whether an event notification or dataset/asset mechanism is supported and more appropriate, but verify the behavior for the installed platform rather than treating a feature name as universally available.</Para>
        <Para>Operational readiness includes DAG parsing and import tests, task-level unit tests, integration tests against representative connections, alert ownership, runbook instructions, capacity planning, and a safe deployment process. Monitor schedule delay, duration, retry rate, skipped tasks, sensor age, data freshness, and downstream reconciliation. A scheduler's task success is an orchestration signal, not proof that the data is correct.</Para>
        <Para>Keep dependency packages and provider versions under a controlled deployment process. A DAG that parses on a developer laptop may not parse on workers if imports differ. Avoid expensive work at import time, keep configuration external, and test the DAG graph for expected task IDs and edges. For a platform migration, validate scheduling and data intervals as well as operator compatibility.</Para>
      </section>

      <DEWorkshop title="Topologically order an interval-aware workflow" objective="Model a dependency graph as an acyclic task plan and identify which operations may run only after input validation and transformation complete." prerequisites="Directed graphs, task dependencies, explicit data intervals, and the principle that retries may repeat side effects.">
        <p>This dependency runner uses only Python's standard library. It is a conceptual DAG simulation, not Airflow code; it demonstrates that an independent notification step need not block the core output, while publication must wait for validation.</p>
        <WorkshopCode language="python" expectedOutput={"run=validate_manifest,extract,transform,verify,publish,notify\npublish_after=verify\ninterval=[2026-11-08T00:00+05:30,2026-11-09T00:00+05:30)"}>{`dependencies = {
    "validate_manifest": [],
    "extract": ["validate_manifest"],
    "transform": ["extract"],
    "verify": ["transform"],
    "publish": ["verify"],
    "notify": ["publish"],
}

completed = set()
order = []
while len(completed) < len(dependencies):
    ready = [task for task in dependencies
             if task not in completed
             and all(parent in completed for parent in dependencies[task])]
    if not ready:
        raise ValueError("cycle or unresolved dependency")
    task = ready[0]
    completed.add(task)
    order.append(task)

print("run=" + ",".join(order))
print("publish_after=" + dependencies["publish"][0])
print("interval=[2026-11-08T00:00+05:30,2026-11-09T00:00+05:30)")`}</WorkshopCode>
        <p>The dependency graph makes a safe ordering visible, but it does not implement retries, scheduling, task state persistence, or Airflow's trigger rules. The interval string is an explicitly chosen fictional India-local business interval, not a universal schedule interpretation.</p>
        <h3>Practice: decide whether the retry is safe</h3>
        <p>A task writes a daily output successfully, then loses its worker before reporting success. The retry begins, and a late correction for yesterday is also arriving. What should the task and publish step do?</p>
        <WorkshopAnswer>
          <p>Use an idempotent, interval-scoped operation with an immutable input manifest or source snapshot, isolated attempt output, and a validated publish step. On retry, determine whether the exact same input and code version are already published; do not append duplicate rows or silently overwrite a newer authorized correction. A correction should follow a defined replacement or merge policy and have its own lineage and validation.</p>
          <p>Pass a small run or output reference through XCom, not the output rows. Record the selected interval, source and code identifiers, attempt status, reconciliation results, and published version. If the task cannot prove that the prior write committed correctly, re-read and validate durable state before deciding whether to reuse, replace, or fail for operator review.</p>
        </WorkshopAnswer>
        <p>References: <a href="https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html">Airflow DAGs</a>, <a href="https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dag-run.html">DAG runs and data intervals</a>, and <a href="https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html">XComs</a>. Consult documentation matching the installed release and providers.</p>
      </DEWorkshop>

      <KeyTakeaways items={[
        'A DAG describes task dependencies; Airflow orchestrates the work, while a compute engine usually processes the bulk data.',
        'Use operators or tasks with clear inputs, outputs, side effects, resource needs, and success conditions.',
        'A run start time and a data interval are different concepts; derive boundaries from the configured timetable and run context.',
        'Catchup and backfill are deliberate operational choices that require bounds, capacity controls, source retention, and safe publication.',
        'Retries repeat code after uncertain outcomes, so side effects need interval-scoped idempotency and reconciliation.',
        'Use XCom for small metadata and references; keep large data and secrets in appropriate external systems.',
        'Sensors need an explicit condition, timeout, alert, and worker-efficient waiting strategy supported by the deployment.',
        'Validate Airflow APIs, providers, and configuration against the installed environment; no sample syntax is a substitute for deployment tests.',
      ]} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 53 explores Delta Lake and Apache Iceberg: how table metadata supports transactional writes, history, schema change, merges, and maintenance.</p>
        <Link href="/learn/data-engineering/delta-iceberg-table-formats" style={{ background: '#14b8a6', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 53 → Delta Lake and Apache Iceberg Table Formats</Link>
      </div>
    </LearnLayout>
  )
}
