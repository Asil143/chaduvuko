import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DeployingLongRunningAgents() {
  return (
    <LearnLayout
      title="Deploying Long-Running Agents — Queues, Checkpoints and Cost Limits"
      description="Run agents as background jobs with queues, durable checkpoints, timeouts, budgets and resumable runs, and monitor them in production."
      section="Agentic AI & Automation — Lesson 12"
      readTime="35 min"
    >
      <Part n={1} label="Why background work" title="A Web Request Is the Wrong Place for a Long Agent Run">
        <P>
          An agent that researches a complicated support case, checks multiple sources or waits for review may run longer than an HTTP
          request should stay open. If the browser disconnects or an application process restarts, an in-memory loop can disappear or
          execute a side effect twice. Treat each run as a durable job with an identifier, a known status and an explicit recovery path.
        </P>
        <P>
          A reliable shape is: authenticate the user, validate a request, store a job record, enqueue its ID, return a status link, then
          let a worker claim the job. The worker advances through bounded steps and writes checkpoints. A status endpoint reads persisted
          progress; it does not depend on the worker process still being alive.
        </P>
        <Table
          head={['Component', 'Responsibility', 'Failure to plan for']}
          rows={[
            ['API / job creator', 'Authorise request, create a durable record and return a job ID', 'Client retries create duplicate jobs'],
            ['Queue', 'Deliver a job ID to an available worker', 'Messages may be delivered more than once or delayed'],
            ['Worker', 'Execute one bounded unit and persist progress', 'Worker can be killed at any instruction'],
            ['Checkpoint store', 'Record state needed to resume', 'State may be partial, stale or sensitive'],
            ['Status and operations UI', 'Show progress, request cancellation and expose failures', 'Status can claim success before a side effect is confirmed'],
          ]}
          caption="The queue transports work; the database is the durable source of job state."
        />
        <Callout type="info">
          Assume at-least-once job delivery. Design handlers so that receiving the same job message twice does not duplicate work or
          external side effects. A queue does not provide exactly-once business behavior by itself.
        </Callout>
      </Part>

      <Part n={2} label="Job lifecycle" title="Model States You Can Explain and Recover">
        <P>
          Keep the lifecycle small and explicit. A job might move from queued to running, then to succeeded, failed or cancelled. A retryable
          failure can return to queued with an attempt count and next-available time. Define which transitions are legal and record why a
          transition happened. Do not treat every error as retryable: a malformed request or permission failure needs correction, not a loop.
        </P>
        <Code file="schema.sql" lang="sql" code={`
CREATE TABLE agent_jobs (
    job_id TEXT PRIMARY KEY,
    tenant_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN
        ('queued', 'running', 'succeeded', 'failed', 'cancelled')),
    state_json TEXT NOT NULL,
    checkpoint INTEGER NOT NULL DEFAULT 0,
    attempts INTEGER NOT NULL DEFAULT 0,
    lease_until TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    error_code TEXT
);

CREATE INDEX agent_jobs_queue_idx
    ON agent_jobs(status, created_at);
`} />
        <P>
          This schema is an educational starting point, not a full production migration. A multi-tenant service should scope every read and
          update by tenant as well as job ID. Use your database&apos;s timestamp type, parameterized queries, retention rules and migration
          system. Never store provider secrets in job state.
        </P>
        <Callout type="warning">
          A job ID is not proof of permission. Every status, cancellation and result request must verify that the signed-in user may access
          that job. Guessable IDs and unscoped queries can disclose another customer&apos;s work.
        </Callout>
      </Part>

      <Part n={3} label="Enqueue" title="Make Job Creation Safe to Retry">
        <P>
          The client may retry a request because its connection timed out after the server committed. Use an idempotency key scoped to the
          authenticated tenant and operation. Persist the created job before acknowledging success. In systems with a separate queue and
          database, use an outbox pattern so a committed job cannot be stranded because queue publication failed.
        </P>
        <Code file="create_job.py" code={`
import json
import sqlite3
import uuid
from datetime import datetime, timezone

def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()

def create_job(db: sqlite3.Connection, tenant_id: str, payload: dict) -> str:
    job_id = str(uuid.uuid4())
    now = utc_now()
    initial_state = {"input": payload, "result": None}
    db.execute(
        "INSERT INTO agent_jobs "
        "(job_id, tenant_id, status, state_json, checkpoint, created_at, updated_at) "
        "VALUES (?, ?, 'queued', ?, 0, ?, ?)",
        (job_id, tenant_id, json.dumps(initial_state), now, now),
    )
    db.commit()
    return job_id

# Production code should persist the idempotency key and return the same job on retry.
`} />
        <P>
          The snippet shows the database record, not a complete queue publisher. In production, store the request&apos;s idempotency key with a
          uniqueness constraint and associate it with the returned job. A transactional outbox stores a publish-intent row in the same
          database transaction; a dispatcher retries publication until the queue has accepted it.
        </P>
      </Part>

      <Part n={4} label="Worker leases" title="Claim Work Atomically and Recover Abandoned Jobs">
        <P>
          Two workers must not both believe they own the same job. A short lease lets a worker claim a job until a deadline. The claim
          operation must be atomic, increment the attempt counter and commit before execution. If a worker dies, another worker can reclaim
          an expired lease. Use a queue product or database primitives appropriate to your deployment; this SQLite example demonstrates the
          invariant, not a multi-host scaling strategy.
        </P>
        <Code file="claim_job.py" code={`
import sqlite3
from datetime import datetime, timedelta, timezone

def claim_one(db: sqlite3.Connection, lease_seconds: int = 60) -> str | None:
    now = datetime.now(timezone.utc)
    lease_until = (now + timedelta(seconds=lease_seconds)).isoformat()
    now_text = now.isoformat()
    db.execute("BEGIN IMMEDIATE")
    try:
        row = db.execute(
            "SELECT job_id FROM agent_jobs "
            "WHERE status = 'queued' OR (status = 'running' AND lease_until < ?) "
            "ORDER BY created_at LIMIT 1",
            (now_text,),
        ).fetchone()
        if row is None:
            db.commit()
            return None
        job_id = row[0]
        db.execute(
            "UPDATE agent_jobs SET status = 'running', attempts = attempts + 1, "
            "lease_until = ?, updated_at = ? WHERE job_id = ?",
            (lease_until, now_text, job_id),
        )
        db.commit()
        return job_id
    except Exception:
        db.rollback()
        raise
`} />
        <P>
          For a production queue, configure visibility timeout or lease renewal and monitor jobs that repeatedly expire. Make the lease
          longer than expected individual work chunks, not necessarily the entire agent run. Periodically renew while processing. A stale
          worker should stop if it discovers it no longer owns the lease.
        </P>
      </Part>

      <Part n={5} label="Checkpoint and resume" title="Persist Small, Versioned Progress">
        <P>
          A checkpoint records the last completed logical step and the minimal state needed to continue. Write the new state and checkpoint
          number atomically. If the process crashes before commit, rerun the previous step; if it crashes after commit, resume from the next
          step. Each step must therefore tolerate replay or use an idempotency key for its external action.
        </P>
        <Code file="checkpoint.py" code={`
import json
import sqlite3
from datetime import datetime, timezone

def save_checkpoint(
    db: sqlite3.Connection, job_id: str, expected_checkpoint: int,
    next_state: dict,
) -> int:
    now = datetime.now(timezone.utc).isoformat()
    next_checkpoint = expected_checkpoint + 1
    cursor = db.execute(
        "UPDATE agent_jobs SET state_json = ?, checkpoint = ?, updated_at = ? "
        "WHERE job_id = ? AND status = 'running' AND checkpoint = ?",
        (json.dumps(next_state), next_checkpoint, now, job_id, expected_checkpoint),
    )
    if cursor.rowcount != 1:
        db.rollback()
        raise RuntimeError("Job changed or checkpoint is stale")
    db.commit()
    return next_checkpoint

# Compare-and-set prevents a stale worker from overwriting newer progress.
`} />
        <P>
          Checkpoint only what the next step needs: a validated request, completed step identifiers and references to results. Avoid saving
          full conversation history, raw browser screenshots, access tokens or payment data. Include a schema version so a deployment can
          validate or migrate older state instead of interpreting it with changed assumptions.
        </P>
        <Callout type="example">
          A delivery assistant may checkpoint &quot;order lookup completed&quot; plus a safe order reference and status. On resume, it should
          not repeat an unrelated notification or submit an action just because the model&apos;s last response was not saved.
        </Callout>
      </Part>

      <Part n={6} label="Bound execution" title="Timeouts, Budgets, Cancellation and Retry Rules">
        <P>
          Every run needs a wall-clock deadline, a maximum number of model or tool steps, and a budget appropriate to the task. Count
          actual usage returned by the provider when available; do not treat an estimate as a bill. Read model configuration from the
          environment and keep provider limits in configuration. Give each tool its own timeout. A run that exceeds its budget should stop
          cleanly with a reason visible to the user and operators.
        </P>
        <Code file="run_limits.py" code={`
from dataclasses import dataclass
import os
import time

@dataclass(frozen=True)
class RunLimits:
    max_steps: int
    deadline_seconds: int
    max_input_tokens: int
    max_output_tokens: int

def configured_limits() -> RunLimits:
    return RunLimits(
        max_steps=int(os.environ.get("AGENT_MAX_STEPS", "8")),
        deadline_seconds=int(os.environ.get("AGENT_DEADLINE_SECONDS", "180")),
        max_input_tokens=int(os.environ.get("AGENT_MAX_INPUT_TOKENS", "12000")),
        max_output_tokens=int(os.environ.get("AGENT_MAX_OUTPUT_TOKENS", "2000")),
    )

def check_budget(started_at: float, steps: int, limits: RunLimits) -> None:
    if time.monotonic() - started_at > limits.deadline_seconds:
        raise TimeoutError("Run deadline exceeded")
    if steps >= limits.max_steps:
        raise RuntimeError("Step budget exceeded")

if __name__ == "__main__":
    limits = configured_limits()
    check_budget(time.monotonic(), 0, limits)
    print("Within configured limits")
`} />
        <P>
          Retry only failures that may resolve, such as a transient provider timeout or temporary queue issue, and use bounded backoff with
          jitter. Do not retry validation errors, authorization failures or a non-idempotent side effect without first checking its status.
          Cancellation is cooperative: check for it between steps and provide a cancellation token to long-running tools where possible.
        </P>
        <Bullets items={[
          'Wall-clock deadline: stop work even if individual steps keep responding.',
          'Step and tool limits: constrain loops and repeated calls.',
          'Usage budget: track actual token or service usage where available.',
          'Retry ceiling: bound retries and route exhausted jobs for review.',
          'Cancellation: stop before beginning another expensive or irreversible step.',
        ]} />
      </Part>

      <Part n={7} label="Side effects" title="Make External Actions Idempotent">
        <P>
          A worker may crash after a downstream service accepts an action but before the worker records success. A retry cannot tell from
          memory whether the action happened. Use an idempotency key derived from the durable job and step IDs, then ask the downstream
          service for the existing result when the same key arrives again. For actions that cannot be made idempotent, insert a human
          approval and reconciliation step instead of blindly retrying.
        </P>
        <Code file="idempotency_key.py" code={`
import hashlib

def step_key(job_id: str, step_name: str) -> str:
    """Stable key for one logical side effect in one durable job."""
    value = f"agent-job:{job_id}:{step_name}".encode("utf-8")
    return hashlib.sha256(value).hexdigest()

# Pass this key to a downstream API that supports idempotent requests.
# Persist the downstream operation ID and final outcome with the checkpoint.
if __name__ == "__main__":
    print(step_key("job-demo", "create-review-request"))
`} />
        <P>
          Idempotency keys are not authorization tokens. A trusted service must still verify the tenant, caller and requested operation.
          For financial workflows, use the payment or order service&apos;s official idempotency mechanism and reconcile uncertain outcomes
          before retrying. Never let a model generate its own deduplication key.
        </P>
      </Part>

      <Part n={8} label="Operations" title="Monitor Jobs Without Logging Sensitive State">
        <P>
          Give every job a correlation ID and record structured events for creation, claim, checkpoint, tool call, retry, cancellation and
          completion. Useful metrics include queue age, run duration, attempts, failure category, checkpoint recovery rate, model usage and
          human escalation. Redact personal data from logs and restrict trace access. A user-facing status should be understandable without
          exposing internal prompts, tool credentials or other customers&apos; data.
        </P>
        <Table
          head={['Signal', 'What it reveals', 'Operational response']}
          rows={[
            ['Oldest queued-job age', 'Demand is exceeding worker capacity or publication is stuck', 'Inspect queue and worker health; scale or pause intake safely'],
            ['Expired leases / repeated attempts', 'Crashes, slow steps or lease configuration problems', 'Inspect the failing stage and route poison jobs to a dead-letter flow'],
            ['Step and provider usage', 'Runaway loops or a changed usage profile', 'Apply a per-run stop and review the prompt or tool behavior'],
            ['Cancellation and escalation rate', 'Users or policy frequently interrupt the workflow', 'Improve task design, handoff clarity or the allowed action set'],
            ['Checkpoint resume failures', 'State schema or deployment compatibility issue', 'Preserve the old state reader and migrate deliberately'],
          ]}
        />
        <P>
          Deploy schema changes with compatibility in mind. New workers may see jobs created by old workers, and a rollback may need to read
          state written by the newer version. Include a state schema version, test upgrade and rollback paths, and avoid changing the meaning
          of a persisted field in place.
        </P>
      </Part>

      <Part n={9} label="Pitfalls" title="Common Long-Running Agent Mistakes">
        <Mistakes items={[
          { mistake: 'Keeping the entire run in a web request', cause: 'Client disconnects, server timeouts or deployments can terminate the process.', fix: 'Persist a job and let a worker process bounded, resumable steps.' },
          { mistake: 'Assuming a queue delivers each message once', cause: 'Most practical queues may redeliver after visibility expiry or a worker crash.', fix: 'Use atomic claims, leases and idempotent handlers for every step.' },
          { mistake: 'Saving the whole prompt and tool history as a checkpoint', cause: 'It increases privacy exposure and can preserve stale or unsafe instructions.', fix: 'Persist minimal, typed, versioned state and references to protected records.' },
          { mistake: 'Retrying an uncertain side effect automatically', cause: 'The service may have completed the action before the worker failed.', fix: 'Use a downstream idempotency key or reconcile status before retrying.' },
        ]} />
      </Part>

      <Part n={10} label="Practice" title="Design a Resumable Support-Research Job">
        <Practice
          title="Build the job lifecycle before adding a live model"
          tasks={[
            'Create a job record with tenant scope, status, attempt count, checkpoint and schema version.',
            'Write an atomic claim function and simulate a worker that crashes after a checkpoint.',
            'Restart the worker and confirm it resumes from the last committed checkpoint without repeating completed steps.',
            'Add a wall-clock deadline, step limit, cancellation check and retryable versus permanent error categories.',
            'Use a stable idempotency key for a fake downstream review request and test duplicate delivery.',
            'Add structured events for queue delay, resume, completion and failure without logging personal data.'
          ]}
          hint="Use SQLite for a single-process learning prototype; production deployments need a durable queue and database design suited to multiple workers."
        />
      </Part>

      <KeyTakeaways items={[
        'Represent long agent runs as durable jobs rather than keeping a web request open.',
        'Treat queue delivery as at-least-once and make every step replay-safe.',
        'Use atomic claims, leases, minimal checkpoints and versioned state to resume after a crash.',
        'Bound wall-clock time, steps, tool calls and actual provider usage; support cooperative cancellation.',
        'Use downstream idempotency keys or reconciliation before retrying uncertain side effects.',
        'Monitor queue age, retries, usage, failure stages and resume behavior while protecting trace data.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/agent-capstone-support-agent"
        label="Lesson 13 · Capstone — A Tool-Using Support Agent"
        text="You have designed the queue, checkpoint and recovery boundaries. Next, combine retrieval, tools, human approval and evaluation in a complete support-agent project."
      />
    </LearnLayout>
  )
}
